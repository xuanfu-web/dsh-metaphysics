#!/usr/bin/env node
// 一条命令发版：桌面副本 → npm 发布（内含构建/全闸/tag/Release）→ 推 main → 读回 Pages 与 registry。
//
//   npm run ship                 # 正式发版
//   npm run ship -- --dry-run    # 只跑到 release 的校验，不发 npm、不打 tag
//   npm run ship -- --skip-tests # 紧急情况跳过测试（release 的参数透传）
//   npm run ship -- --no-desktop # 不刷新桌面副本
//
// 为什么要有它：0.84.0 的真实教训是——npm 发了、tag 推了、Release 建了，
// 但 `main` 分支还停在发版前，而 Pages 认的是 `main/docs`：站点继续显示旧版本。
// 三件都「成功」，产品却还是旧的。所以把「推 main + 读回四处证据」也写进同一条命令：
// 每一步都有唯一判据，缺一步就 red，不靠记性。
//
// 本机提权细节（都在这里自动兜底，不需要先 export）：
//   - git 不在 PATH：从 PUSHTAG_GIT / .qoder / 常见安装目录里找，找到就把目录塞进 PATH；
//   - 没有 npm.exe：用 NPM_CLI（指向 npm-cli.js）走 `node npm-cli.js …`；
//   - npm token：release.mjs 自己会从 ~/.dsh/metaphysics-autopublish.json 取。

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const PKG = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const noDesktop = args.includes('--no-desktop');
const passthrough = args.filter((a) => ['--skip-tests'].includes(a));
const version = PKG.version;
const slug = (() => {
  const url = String((PKG.repository && (PKG.repository.url || PKG.repository)) || '');
  const m = /github\.com[:/]([^/]+)\/([^/.]+)/.exec(url);
  return m ? m[1] + '/' + m[2] : '';
})();

const log = (msg) => console.log(`\n▸ ${msg}`);
const fail = (msg) => { console.error(`\n✗ ${msg}\n`); process.exit(1); };

/* ── 环境兜底 ─────────────────────────────────────────────── */
function findGit() {
  if (process.env.PUSHTAG_GIT) return process.env.PUSHTAG_GIT;
  const exe = process.platform === 'win32' ? 'git.exe' : 'git';
  const cands = [
    path.join(os.homedir(), '.qoder', 'bin', 'git', 'cmd', exe),
    path.join(os.homedir(), '.qoder', 'bin', 'git', 'bin', exe),
    path.join(process.env.ProgramFiles || 'C:\\Program Files', 'Git', 'cmd', exe),
    path.join(os.homedir(), '.dsh', 'dsh-ops', 'bash-ipc', '2617aff7612f4ce37164439d', 'cmd', exe),
  ];
  for (const p of cands) if (fs.existsSync(p)) return p;
  const probe = spawnSync('git', ['--version'], { encoding: 'utf8' });
  return probe.status === 0 ? 'git' : '';
}

function ensureEnv() {
  const git = findGit();
  if (!git) fail('找不到 git（PUSHTAG_GIT 指一个，或装 Git for Windows）');
  if (git !== 'git') {
    process.env.PUSHTAG_GIT = git;
    process.env.PATH = path.dirname(git) + path.delimiter + (process.env.PATH || '');
  }
  if (!process.env.NPM_CLI) {
    const probe = spawnSync('npm', ['--version'], { encoding: 'utf8' });
    if (probe.status !== 0) {
      const bundled = path.join(path.dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js');
      if (fs.existsSync(bundled)) process.env.NPM_CLI = bundled;
      else fail('找不到 npm：装 npm CLI，或用 NPM_CLI 指向 npm-cli.js');
    }
  }
  log(`环境：git=${git}`);
  log(`环境：npm=${process.env.NPM_CLI ? 'node ' + process.env.NPM_CLI : 'npm'}`);
}

function run(script, stepArgs, label) {
  log(label);
  const r = spawnSync(process.execPath, [path.join(root, script), ...stepArgs], {
    cwd: root,
    stdio: 'inherit',
    env: process.env,
  });
  if (r.status !== 0) fail(`${label}（${path.basename(script)}）失败：退出码 ${r.status}`);
}

/* ── 读回证据 ─────────────────────────────────────────────── */
async function verifyNpm() {
  log(`读回 registry：${PKG.name}@${version}`);
  const res = await fetch(`https://registry.npmjs.org/${PKG.name}/latest`, { headers: { accept: 'application/json' } });
  if (!res.ok) fail(`registry 读不到 latest（HTTP ${res.status}）`);
  const j = await res.json();
  if (j.version !== version) fail(`registry latest 是 ${j.version}，不是 ${version}`);
  console.log(`  ✓ npm latest = ${j.version}，tarball ${j.dist && j.dist.tarball ? '在' : '缺'}`);
}

function readConfig() {
  const file = process.env.PUSHTAG_CONFIG || path.join(os.homedir(), '.dsh', 'metaphysics-autopublish.json');
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { return null; }
}

async function ghApi(token, apiPath) {
  const res = await fetch(`https://api.github.com${apiPath}`, {
    headers: { Accept: 'application/vnd.github+json', Authorization: `token ${token}`, 'User-Agent': 'dsh-ship' },
  });
  return res.ok ? res.json() : null;
}

async function verifyGithub() {
  if (!slug) { console.log('  跳过 GitHub 读回：package.json 里读不出 repository'); return; }
  const cfg = readConfig();
  if (!cfg || !cfg.githubToken) { console.log('  跳过 GitHub 读回：没有 githubToken'); return; }

  log('读回 GitHub：tag / Release / Pages');
  const tags = spawnSync(process.env.PUSHTAG_GIT || 'git', ['ls-remote', '--tags', 'origin', `refs/tags/v${version}`], {
    cwd: root, encoding: 'utf8',
  });
  const tagOk = tags.status === 0 && String(tags.stdout || '').includes(`refs/tags/v${version}`);
  console.log(`  ${tagOk ? '✓' : '✗'} 远端 tag v${version}${tagOk ? '' : '（还没有；检查 push 是否真的成功）'}`);

  const rel = await ghApi(cfg.githubToken, `/repos/${slug}/releases/tags/v${version}`);
  console.log(`  ${rel ? '✓' : '✗'} GitHub Release v${version}${rel ? '（' + (rel.html_url || '') + '）' : '（没建出来）'}`);

  const build = await ghApi(cfg.githubToken, `/repos/${slug}/pages/builds/latest`);
  const head = spawnSync(process.env.PUSHTAG_GIT || 'git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' });
  const headSha = String(head.stdout || '').trim();
  const builtSha = String((build && build.commit) || '');
  const pagesOk = !!build && builtSha && headSha.startsWith(builtSha);
  console.log(`  ${pagesOk ? '✓' : '✗'} Pages 最近部署 ${builtSha.slice(0, 7) || '(无)'}（${(build && build.status) || '?'}）${pagesOk ? '' : ' ≠ HEAD ' + headSha.slice(0, 7) + '（main 还没推上去？）'}`);

  if (!tagOk || !rel || !pagesOk) fail('GitHub 侧读回不完整：按上面 ✗ 那几行补（tag=push-tag、Release=gh-release、Pages=push-branch）');
}

async function main() {
  console.log(`\n═══ ship ${PKG.name}@${version}${dryRun ? '（dry-run）' : ''} ═══`);
  ensureEnv();

  if (!noDesktop) run('tools/build-html.mjs', ['--desktop'], '刷新桌面副本');

  const relArgs = [...passthrough, ...(dryRun ? ['--dry-run'] : [])];
  run('tools/release.mjs', relArgs, dryRun ? '发布链路（dry-run）' : '发布链路（构建 → 全闸 → npm → tag → Release）');
  if (dryRun) { console.log('\n✓ dry-run 到此为止：没有发 npm、没有打 tag、没有推分支\n'); return; }

  run('tools/push-branch.mjs', [], '推 main（Pages 认的是 main/docs，tag 推上去不等于分支推上去）');

  await verifyNpm();
  await verifyGithub();
  console.log(`\n✓ ship 完成：${PKG.name}@${version} 的 npm / tag / Release / Pages 四处都读回了\n`);
}

main().catch((e) => fail(e && e.message ? e.message : String(e)));
