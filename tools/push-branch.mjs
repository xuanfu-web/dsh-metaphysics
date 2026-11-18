#!/usr/bin/env node
// 把当前 HEAD 推到远端分支（HTTPS 被阻断时自动走 SSH deploy key）。
//
//   node tools/push-branch.mjs            # 推 main
//   node tools/push-branch.mjs main       # 指定分支
//   node tools/push-branch.mjs --ssh-only # 直接走 SSH 兜底
//
// 存在的理由：tag 推上去不等于分支推上去。Pages 认的是 main/docs，
// 分支落后时 tag 有了、Release 有了、站点还是旧版本——这台机器上 HTTPS 时常被 reset，
// 所以把「重试 → SSH 兜底」这条路径独立成脚本，可以单独跑。

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pushOverSshWithKey, clearStaleBlock } from './ssh-fallback.mjs';

const root = path.resolve(import.meta.dirname, '..');
const PKG = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const args = process.argv.slice(2);
const sshOnly = args.includes('--ssh-only');
const named = args.find((a) => !a.startsWith('--'));
const branch = named || 'main';

const log = (msg) => console.log(msg);
const fail = (msg) => { console.error('\n✗ ' + msg + '\n'); process.exit(1); };

function findGit() {
  if (process.env.PUSHTAG_GIT) return process.env.PUSHTAG_GIT;
  return 'git';
}

function git(gitArgs, opts = {}) {
  return spawnSync(findGit(), gitArgs, { cwd: root, encoding: 'utf8', ...opts });
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
      'User-Agent': 'dsh-metaphysics-push-branch',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch (e) { json = null; }
  return { ok: res.ok, status: res.status, json, text };
}

async function pushOverSsh(cfg) {
  const slug = repoSlug();
  if (!slug) { log('SSH 兜底跳过：package.json 里读不出 repository'); return false; }
  return pushOverSshWithKey({
    cfg,
    slug,
    ghApi: (method, apiPath, body) => ghApi(cfg, method, apiPath, body),
    git,
    log,
    refspecs: [`refs/heads/${branch}:refs/heads/${branch}`],
    label: 'branch',
    keygenName: findSshKeygen(),
    sshEnvVar: 'PUSHTAG_SSH',
    dirPrefix: 'dsh-mp-branch-',
    keyComment: 'dsh-metaphysics-push-branch',
    keyTitle: 'push-branch',
  });
}

const HTTPS_BLOCKED = /Connection was reset|Failed to connect|Could not connect|Timeout|timed out|443|SSL|RPC failed|Recv failure/i;

async function main() {
  const head = git(['rev-parse', '--short', 'HEAD']);
  if (head.status !== 0) fail('读不到 HEAD（这不是一个 git 仓库？）');
  log(`分支：${branch} @ ${String(head.stdout).trim()}`);

  const cfg = loadConfig();
  if (!cfg || !cfg.githubToken) fail('读不到 GitHub 凭据（~/.dsh/metaphysics-autopublish.json）');

  clearStaleBlock();

  if (!sshOnly) {
    for (const [i, delay] of [[1, 8000], [2, 16000], [3, 0]]) {
      log(`▸ HTTPS 推送（第 ${i} 次）`);
      const r = git(['push', 'origin', `${branch}:${branch}`]);
      const out = `${r.stdout || ''}${r.stderr || ''}`;
      if (r.status === 0) { log(`✅ ${branch} 已推送（HTTPS）`); return; }
      if (!HTTPS_BLOCKED.test(out)) { fail(`HTTPS 推送失败且不像网络阻断：\n${out}`); }
      log('  连接被重置，重试/换 SSH');
      if (delay) await new Promise((res) => setTimeout(res, delay));
    }
  }

  const ok = await pushOverSsh(cfg);
  if (!ok) fail(`SSH 兜底也没推上去，${branch} 仍落后于本地`);
  log(`✅ ${branch} 已推送（SSH 兜底）`);
}

main().catch((e) => fail(e && e.message ? e.message : String(e)));
