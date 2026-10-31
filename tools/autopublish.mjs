#!/usr/bin/env node
// 每 24 小时自动检查并推送 dsh-metaphysics。
//
// 行为（2026-10-31 起：只提交 + 推送，不自动发 npm）：
//   1. 对「会进 npm 包的源码/配置」做指纹（package.json、engine、src、index.js、locale、构建脚本等）；
//   2. 指纹与上次成功推送时保存的一致 → 静默退出（不打印、不提交、不推送）；
//   3. 指纹有变 → 跑七道闸 → 重建产物 → 提交并推送到 origin/main → 写回指纹。
//      版本号不动、不打 tag、不发 npm：按主题攒够后，发版时手动走 tools/release.mjs。
//
// 用法：
//   node tools/autopublish.mjs            # 自动检查/推送（定时任务用这个）
//   node tools/autopublish.mjs --dry-run  # 只报告会做什么，不改任何东西
//   node tools/autopublish.mjs --init     # 只把当前指纹记为基线，不推送
//   node tools/autopublish.mjs --force    # 忽略指纹，强制走提交推送流程
//
// 依赖：<用户目录>/.dsh/metaphysics-autopublish.json（npmToken / githubUser / githubToken），
//       指纹、锁与日志都在 .gitignore 里。
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';

const root = path.resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const DRY = args.includes('--dry-run');
const INIT = args.includes('--init');
const FORCE = args.includes('--force');

const STATE = path.join(root, '.autopublish-state.json');
const LOCK = path.join(root, '.autopublish.lock');
const LOG = path.join(root, 'tools', '.autopublish.log');
const CONFIG = process.env.AUTOPUBLISH_CONFIG
  || path.join(os.homedir(), '.dsh', 'metaphysics-autopublish.json');

const PKG = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const NAME = PKG.name;

// 这些文件/目录决定「有没有值得发布的改动」。构建产物（client.js / 命理排盘.html）不参与，
// 因为它们是上面这些源码的生成物；测试与文档单独改不触发发布。
const SOURCE_FILES = ['package.json', 'index.js', 'cordis.patch.yml', 'icon.svg'];
const SOURCE_DIRS = ['engine', 'src', 'locale'];
// 报告生成器与对拍样本会改 docs/assets 里的徽章，必须一起进发布指纹
const BUILD_FILES = [
  'tools/build-client.mjs', 'tools/build-html.mjs', 'tools/verification.mjs',
  'test/fixtures/classics.json', 'test/fixtures/qimen-20.json',
];

const log = (msg) => {
  try {
    fs.appendFileSync(LOG, `[${new Date().toISOString()}] ${msg}\n`);
  } catch (e) { /* 日志写不了不影响主流程 */ }
};

function fail(msg) {
  log('ERROR ' + msg);
  console.error(msg);
  process.exit(1);
}

function sh(cmd, cmdArgs, opts = {}) {
  const r = spawnSync(cmd, cmdArgs, {
    cwd: root,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    ...opts,
  });
  return { status: r.status, stdout: r.stdout || '', stderr: r.stderr || '', error: r.error };
}

function git(args2, opts = {}) {
  return sh(process.env.AUTOPUBLISH_GIT || findGit(), args2, opts);
}

// git 不在 PATH：找 DSH 自带的 bash-ipc 里的 git；找不到才退回 PATH 上的 git。
function findGit() {
  if (process.env.AUTOPUBLISH_GIT) return process.env.AUTOPUBLISH_GIT;
  const base = path.join(os.homedir(), '.dsh', 'dsh-ops', 'bash-ipc');
  try {
    for (const d of fs.readdirSync(base)) {
      const p = path.join(base, d, 'ucrt64', 'bin', 'git.exe');
      if (fs.existsSync(p)) return p;
    }
  } catch (e) { /* 没有就算了 */ }
  return 'git';
}

function walkFiles(dir, out = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return out; }
  for (const ent of entries) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkFiles(p, out);
    else if (ent.isFile()) out.push(p);
  }
  return out;
}

function fingerprint() {
  const files = [];
  for (const f of SOURCE_FILES) files.push(path.join(root, f));
  for (const f of BUILD_FILES) files.push(path.join(root, f));
  for (const d of SOURCE_DIRS) walkFiles(path.join(root, d), files);
  const h = createHash('sha1');
  for (const f of files.sort()) {
    if (!fs.existsSync(f)) continue;
    h.update(path.relative(root, f).replace(/\\/g, '/'));
    h.update('\0');
    h.update(fs.readFileSync(f));
    h.update('\0');
  }
  return h.digest('hex');
}

function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { return fallback; }
}

function writeJson(file, obj) {
  fs.writeFileSync(file, JSON.stringify(obj, null, 2) + '\n');
}

async function npmLatest() {
  try {
    const res = await fetch(`https://registry.npmjs.org/${NAME}?cb=${Date.now()}`);
    if (!res.ok) return null;
    const m = await res.json();
    return (m['dist-tags'] && m['dist-tags'].latest) || null;
  } catch (e) {
    return null;
  }
}

// ── git 元数据自愈：这个仓库两次丢过 HEAD/config/index，缺了就按 refs/heads/main 补回 ──
function repairGit() {
  const head = path.join(root, '.git', 'HEAD');
  const cfg = path.join(root, '.git', 'config');
  if (!fs.existsSync(path.join(root, '.git'))) return false;
  if (!fs.existsSync(head)) {
    fs.writeFileSync(head, 'ref: refs/heads/main\n');
    log('修复 .git/HEAD');
  }
  if (!fs.existsSync(cfg)) {
    fs.writeFileSync(cfg, [
      '[core]', '\trepositoryformatversion = 0', '\tfilemode = false', '\tbare = false',
      '\tlogallrefupdates = true', '\tignorecase = true',
      '[remote "origin"]', '\turl = https://github.com/xuanfu-web/dsh-metaphysics.git',
      '\tfetch = +refs/heads/*:refs/remotes/origin/*',
      '[branch "main"]', '\tremote = origin', '\tmerge = refs/heads/main',
      '[user]', '\tname = xuanfu-web', '\temail = a18905669048@gmail.com',
      '',
    ].join('\n'));
    log('修复 .git/config');
  }
  const r = git(['rev-parse', '--git-dir']);
  if (r.status !== 0) {
    git(['reset']);
    log('重建 git 索引');
  }
  return true;
}

function loadConfig() {
  const c = readJson(CONFIG, null);
  if (!c || !c.npmToken || !c.githubToken) {
    fail(`缺少自动发布配置：${CONFIG}（需要 npmToken / githubUser / githubToken）`);
  }
  return c;
}

function authArgs(cfg) {
  const b64 = Buffer.from(`${cfg.githubUser || 'xuanfu-web'}:${cfg.githubToken}`).toString('base64');
  return ['-c', 'credential.helper=', '-c', `http.https://github.com/.extraheader=Authorization: Basic ${b64}`];
}

function runStep(label, cmd, cmdArgs, opts) {
  const r = sh(cmd, cmdArgs, opts);
  if (r.status !== 0) {
    log(`步骤失败：${label}\n${r.stdout}\n${r.stderr}`);
    fail(`步骤失败：${label}`);
  }
  return r;
}

/** 推送带重试：GitHub 连接间歇性失败（甚至整段 443 被阻断），失败三次才放弃本轮 */
function pushWithRetry(args, label) {
  for (let i = 1; i <= 3; i++) {
    const r = git(args);
    if (r.status === 0) return r;
    log(`${label} 第 ${i} 次失败：\n${r.stdout}${r.stderr}`);
    if (i < 3) Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, i * 15000);
  }
  fail(`${label} 连续 3 次失败（检查 GitHub 443 是否可达；必要时改用 SSH deploy key）`);
}

function commitAndPush(cfg) {
  git(['add', '-A']);
  const msg = 'chore(autopublish): 自动构建并推送\n\n由 tools/autopublish.mjs 定时任务生成：跑七道闸、重建 client.js 与命理排盘.html 后提交推送。不发 npm、不改版本号、不打 tag——发版按主题攒够后手动走 tools/release.mjs。';
  const c = git(['-c', 'core.autocrlf=false', 'commit', '-m', msg]);
  if (c.status !== 0 && !/nothing to commit/i.test(c.stdout + c.stderr)) {
    log('git commit 失败：\n' + c.stdout + c.stderr);
    fail('git commit 失败');
  }
  // 远端在两次运行之间前进过：先 rebase 再接上（冲突就放弃本轮，下一轮重试）
  git(['fetch', 'origin', '--quiet']);
  const behind = git(['rev-list', '--count', 'HEAD..origin/main']);
  if (behind.status === 0 && Number(behind.stdout.trim()) > 0) {
    const rb = git(['pull', '--rebase', 'origin', 'main']);
    if (rb.status !== 0) {
      git(['rebase', '--abort']);
      log('rebase 失败，放弃本轮：\n' + rb.stdout + rb.stderr);
      fail('git pull --rebase 失败（下一轮重试）');
    }
  }
  pushWithRetry(authArgs(cfg).concat(['push', 'origin', 'main']), 'git push');
  log(`已推送 main（版本仍为 ${PKG.version}，未发布 npm）`);
}

async function main() {
  if (!fs.existsSync(path.join(root, '.git'))) fail('不是 git 仓库：' + root);
  repairGit();

  // 锁：两个入口（系统计划任务 / 手动）撞在一起时，后来的直接退出
  try {
    const st = fs.statSync(LOCK);
    if (Date.now() - st.mtimeMs < 2 * 3600 * 1000) {
      log('已有发布在跑，跳过本次');
      process.exit(0);
    }
  } catch (e) { /* 没锁 */ }
  fs.writeFileSync(LOCK, `${process.pid} ${new Date().toISOString()}\n`);

  const cleanup = () => { try { fs.unlinkSync(LOCK); } catch (e) { /* 已经删了 */ } };
  process.on('exit', cleanup);

  const state = readJson(STATE, null);
  const hash = fingerprint();
  if (INIT) {
    const latest = await npmLatest();
    writeJson(STATE, { hash, version: PKG.version, npmLatest: latest, at: new Date().toISOString() });
    console.log(`已记录基线：${PKG.version}（npm latest: ${latest || '未知'}）指纹 ${hash.slice(0, 12)}`);
    return;
  }
  if (!FORCE && state && state.hash === hash) {
    // 无改动：保持静默（不打印、不写日志）
    return;
  }

  const latest = await npmLatest();
  const cfg = loadConfig();

  if (DRY) {
    console.log(JSON.stringify({
      action: 'commit-push', reason: FORCE ? 'force' : '源码/配置有改动',
      version: PKG.version, npmLatest: latest, hash: hash.slice(0, 12),
    }, null, 2));
    return;
  }

  log(`检测到改动：${state ? '指纹变化 ' + (state.hash || '').slice(0, 12) + ' → ' : '首次 '}${hash.slice(0, 12)}；提交并推送（不发 npm）`);

  const gates = [
    ['build-client', ['tools/build-client.mjs']],
    ['build-html', ['tools/build-html.mjs']],
    ['check-bundle', ['tools/check-bundle.mjs']],
    ['test-all', ['tools/test-all.mjs']],
    ['check-assertions', ['tools/check-assertions.mjs']],
    ['verify-tests-can-fail', ['tools/verify-tests-can-fail.mjs']],
    ['check-html-sinks', ['tools/check-html-sinks.mjs']],
    ['check-patterns', ['tools/check-patterns.mjs']],
  ];
  for (const [label, script] of gates) {
    runStep(label, process.execPath, script);
  }

  const finalHash = fingerprint();
  commitAndPush(cfg);
  writeJson(STATE, { hash: finalHash, version: PKG.version, npmLatest: latest, at: new Date().toISOString() });
  log(`完成：已推送 main（版本 ${PKG.version} 未发 npm；npm latest ${latest || '未知'}）`);
  console.log(`已推送 main（版本 ${PKG.version}，未发 npm；npm latest ${latest || '未知'}）`);
}

main().catch((e) => {
  log('未捕获异常：' + (e && e.stack ? e.stack : String(e)));
  console.error(e && e.message ? e.message : String(e));
  process.exit(1);
});
