#!/usr/bin/env node
// 打 tag 并推送，带着和自动发布同一套「HTTPS 不通就换 SSH deploy key」的回退。
//
// 为什么单独做一件事：release.mjs 发完 npm 会提示 `git tag v… && git push origin v…`，
// 而在这台机器上 GitHub 的 443 时常整段被阻断（push 直接 Connection reset），
// 每次发版到这一步就卡住——tag 落在本地、远端看不到，release 页面上也就没有对应 tag。
//
// 用法：
//   node tools/push-tag.mjs              # 用 package.json 的版本号，缺 tag 就建、建完推
//   node tools/push-tag.mjs v0.58.0      # 指定 tag
//   node tools/push-tag.mjs --dry-run    # 只报告会建/推哪个 tag，不动远端、不建 tag
//   node tools/push-tag.mjs --no-create  # 远端已有、只推不建
//   node tools/push-tag.mjs --ssh-only   # 跳过 HTTPS，直接走 SSH 兜底（验证兜底路径用）
//
// 凭据：<用户目录>/.dsh/metaphysics-autopublish.json（githubUser / githubToken），
//      可用 PUSHTAG_CONFIG 指向别的文件。临时私钥只活在本次运行的临时目录里，
//      推完无论成败都删 key、删私钥，不留持久凭据。

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pushOverSshWithKey, clearStaleBlock } from './ssh-fallback.mjs';

const root = path.resolve(import.meta.dirname, '..');
const PKG = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const noCreate = args.includes('--no-create');
/* 直接走 SSH 兜底，跳过三次 HTTPS 重试（每次要等 8/16 秒）。
   存在的理由：兜底路径平时只在「GitHub 443 真的被阻断」时才被走到，
   想验证它就得等网络自己坏——所以给一个能主动跑它的开关。 */
const sshOnly = args.includes('--ssh-only');
const named = args.find((a) => !a.startsWith('--'));

const log = (msg) => console.log(msg);
const fail = (msg) => { console.error('\n✗ ' + msg + '\n'); process.exit(1); };

function findGit() {
  if (process.env.PUSHTAG_GIT) return process.env.PUSHTAG_GIT;
  return 'git';
}

function git(gitArgs, opts = {}) {
  return spawnSync(findGit(), gitArgs, {
    cwd: root,
    encoding: 'utf8',
    ...opts,
  });
}

function findSshKeygen() {
  const cands = [];
  try {
    const dir = path.dirname(process.env.PUSHTAG_GIT || findGit());
    cands.push(path.join(dir, process.platform === 'win32' ? 'ssh-keygen.exe' : 'ssh-keygen'));
  } catch (e) { /* 没有就算了 */ }
  if (process.platform === 'win32') {
    cands.push(path.join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'OpenSSH', 'ssh-keygen.exe'));
  }
  for (const p of cands) {
    try { if (p && fs.existsSync(p)) return p; } catch (e) { /* 下一个 */ }
  }
  return 'ssh-keygen';
}

function loadConfig() {
  const file = process.env.PUSHTAG_CONFIG || path.join(os.homedir(), '.dsh', 'metaphysics-autopublish.json');
  if (!fs.existsSync(file)) return null;
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { return null; }
}

function repoSlug() {
  const url = String((PKG.repository && (PKG.repository.url || PKG.repository)) || '');
  const m = /github\.com[:/]([^/]+)\/([^/.]+)/.exec(url);
  return m ? { owner: m[1], repo: m[2] } : null;
}

async function ghApi(cfg, method, apiPath, body) {
  const res = await fetch(`https://api.github.com${apiPath}`, {
    method,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `token ${cfg.githubToken}`,
      'User-Agent': 'dsh-metaphysics-push-tag',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch (e) { json = null; }
  return { ok: res.ok, status: res.status, json, text };
}

/** 同一个 tag 走 HTTPS 失败后换 SSH：临时 ed25519 → 注册 deploy key → 推 → 删 key 与私钥。
 *  传输层与 ssh config 的处理都在 tools/ssh-fallback.mjs（与 autopublish 共用一份），
 *  那里写了为什么只能用 GIT_SSH、为什么非动真实 ~/.ssh/config 不可。 */
async function pushOverSsh(cfg, tag) {
  const slug = repoSlug();
  if (!slug) { log('SSH 兜底跳过：package.json 里读不出 repository'); return false; }
  return pushOverSshWithKey({
    cfg,
    slug,
    ghApi: (method, apiPath, body) => ghApi(cfg, method, apiPath, body),
    git,
    log,
    refspecs: [`refs/tags/${tag}:refs/tags/${tag}`],
    label: 'tag',
    keygenName: findSshKeygen(),
    sshEnvVar: 'PUSHTAG_SSH',
    dirPrefix: 'dsh-mp-tag-',
    keyComment: 'dsh-metaphysics-push-tag',
    keyTitle: 'push-tag',
  });
}

const HTTPS_BLOCKED = /Connection was reset|Failed to connect|Could not connect|Timeout|timed out|443|SSL|RPC failed|Recv failure/i;

async function main() {
  const tag = named || `v${PKG.version}`;
  if (!/^v\d+\.\d+\.\d+/.test(tag)) fail(`tag 名不像版本号：${tag}`);

  const has = git(['rev-parse', '--verify', '--quiet', `refs/tags/${tag}`]);
  const exists = has.status === 0;
  log(`tag：${tag}（${exists ? '本地已存在' : '本地还没有'}）`);

  if (dryRun) {
    log(`会做：${exists || noCreate ? '跳过创建' : 'git tag -a ' + tag} → 推送 refs/tags/${tag}（HTTPS 不通则走 SSH deploy key）`);
    return;
  }

  /* 上一次运行被 kill 时 finally 没跑，config 里可能留着指向已删私钥的块。
     那种块会让这台机器对 ssh.github.com 的 ssh 直接失败，先清掉。 */
  if (clearStaleBlock()) log('已清掉上次运行残留在 ssh config 里的临时 Host 块');

  if (!exists) {
    if (noCreate) fail(`本地没有 ${tag}，而你要求 --no-create`);
    const head = git(['rev-parse', '--short', 'HEAD']).stdout.trim();
    const made = git(['tag', '-a', tag, '-m', `${PKG.name} ${tag}（${head}）`]);
    if (made.status !== 0) fail(`建 tag 失败：${made.stderr || made.stdout}`);
    log(`已建 annotated tag ${tag} @ ${head}`);
  }

  if (sshOnly) {
    const cfg = loadConfig();
    if (!cfg || !cfg.githubToken) fail('--ssh-only 需要 .dsh/metaphysics-autopublish.json 里的 githubToken');
    log('按 --ssh-only 跳过 HTTPS，直接走 SSH deploy key');
    if (await pushOverSsh(cfg, tag)) return;
    fail(`tag 走 SSH 兜底没成（--ssh-only）`);
  }

  let last = null;
  for (let i = 1; i <= 3; i++) {
    const r = git(['push', 'origin', `refs/tags/${tag}:refs/tags/${tag}`]);
    if (r.status === 0) { log(`tag ${tag} 已推送（HTTPS）`); return; }
    last = r;
    log(`推送 tag 第 ${i} 次失败：\n${r.stdout || ''}${r.stderr || ''}`);
    if (i < 3) await new Promise((res) => setTimeout(res, i * 8000));
  }

  const blob = `${(last && last.stdout) || ''}${(last && last.stderr) || ''}`;
  const cfg = loadConfig();
  if (cfg && cfg.githubToken && HTTPS_BLOCKED.test(blob)) {
    log('连不上 GitHub HTTPS，自动改走 SSH deploy key 兜底');
    if (await pushOverSsh(cfg, tag)) return;
  }
  fail('tag 推送失败（HTTPS 三次不通，SSH 兜底也没成）');
}

main().catch((e) => fail(e && e.stack ? e.stack : String(e)));
