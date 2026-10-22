#!/usr/bin/env node
// 一条命令走完发版：测试 → 构建 → 校验产物 → 发 npm。
//
//   NPM_TOKEN=npm_xxx npm run release              # 正式发布
//   NPM_TOKEN=npm_xxx npm run release -- --dry-run # 只跑到校验，不发布
//   npm run release -- --skip-tests                # 紧急情况下跳过测试（不建议）
//
// 说明：
//  - token 只从环境变量 NPM_TOKEN 读，脚本会把它写进临时 .npmrc（0600），退出时删掉；
//  - 发布前会确认 git 工作区干净、client.js 已随源码重建、registry 上没有同版本；
//  - 本机没装 npm CLI 时，可用 NPM_CLI=/path/to/npm-cli.js 指向它。
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync, readFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const pkg = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const skipTests = args.includes('--skip-tests');

const step = (msg) => console.log(`\n▸ ${msg}`);
const fail = (msg) => { console.error(`\n✗ ${msg}\n`); process.exit(1); };

// npm 可执行：优先环境变量 NPM_CLI（指向 npm-cli.js），否则用 PATH 里的 npm
const NPM_CLI = process.env.NPM_CLI || '';
const npmCmd = NPM_CLI ? process.execPath : 'npm';
const npmArgs = (rest) => (NPM_CLI ? [NPM_CLI, ...rest] : rest);

function run(cmd, cmdArgs, label, opts = {}) {
  const r = spawnSync(cmd, cmdArgs, { cwd: root, stdio: opts.capture ? 'pipe' : 'inherit', encoding: 'utf8' });
  if (r.error) fail(`${label} 无法执行：${r.error.message}`);
  if (r.status !== 0) fail(`${label} 失败（退出码 ${r.status}）`);
  return r.stdout ?? '';
}

function npm(rest, label, opts) {
  return run(npmCmd, npmArgs(rest), label, opts);
}

// ── 0. 版本与工作区 ──────────────────────────────────────────
step(`发版 ${pkg.name}@${pkg.version}`);
const dirty = run('git', ['status', '--porcelain'], '读取 git 状态', { capture: true }).trim();
if (dirty) {
  console.error(dirty);
  fail('git 工作区不干净：先提交或 stash，发布内容必须能从某个 commit 复现');
}
if (!/^\d+\.\d+\.\d+/.test(pkg.version)) fail(`package.json 版本号不合法：${pkg.version}`);

// ── 1. 测试 ────────────────────────────────────────────────
if (skipTests) {
  step('跳过测试（--skip-tests）');
} else {
  step('跑全部回归');
  run(process.execPath, [path.join(root, 'tools', 'test-all.mjs')], '测试');
}

// ── 2. 构建 + 产物校验 ─────────────────────────────────────
step('重建 client.js 与单文件 HTML');
run(process.execPath, [path.join(root, 'tools', 'build-client.mjs')], '构建 client.js');
run(process.execPath, [path.join(root, 'tools', 'build-html.mjs')], '构建 HTML');
step('校验构建产物与源码一致');
run('git', ['diff', '--exit-code', '--', 'client.js'], '校验 client.js（未提交的产物差异）');

// ── 3. 发布前检查 ──────────────────────────────────────────
const token = process.env.NPM_TOKEN || '';
if (!dryRun && !token) {
  fail('缺少 NPM_TOKEN：在 npm 生成 Granular Token（勾 Bypass 2FA、Read and write）后，\n  NPM_TOKEN=npm_xxx npm run release');
}

const tmpDir = mkdtempSync(path.join(os.tmpdir(), 'dsh-rel-'));
const npmrc = path.join(tmpDir, '.npmrc');
const cleanup = () => rmSync(tmpDir, { recursive: true, force: true });
process.on('exit', cleanup);

if (token) {
  writeFileSync(npmrc, `//registry.npmjs.org/:_authToken=${token}\n`, { mode: 0o600 });
  const who = npm(['whoami', '--userconfig', npmrc], '校验 npm 身份', { capture: true }).trim();
  step(`npm 身份：${who}`);
}

step(`检查 registry 是否已存在 ${pkg.version}`);
try {
  const res = await fetch(`https://registry.npmjs.org/${pkg.name}`, { headers: { accept: 'application/json' } });
  if (res.ok) {
    const meta = await res.json();
    if (meta.versions && meta.versions[pkg.version]) {
      fail(`registry 上已有 ${pkg.name}@${pkg.version}：请先在 package.json 里升版本（npm version patch）`);
    }
  }
} catch (e) {
  step(`registry 查询失败（${e.message}），继续，发布时会再校验`);
}

if (dryRun) {
  step('dry-run：跳过 npm publish');
  step('检查通过 ✅（正式发布去掉 --dry-run）');
  process.exit(0);
}

// ── 4. 发布 ────────────────────────────────────────────────
step(`发布 ${pkg.name}@${pkg.version} 到 npm`);
npm(['publish', '--access', 'public', '--ignore-scripts', '--userconfig', npmrc], 'npm publish');

// ── 5. 发布后核对 ──────────────────────────────────────────
// npm 的发布是异步的（PUT 返回 202），实测 registry 生效要 1–4 分钟，
// 所以这里对 tarball 直接轮询 HEAD，而不是用 npm view 空等。
step('等待 registry 生效（npm 异步发布，通常 1–4 分钟）');
const tarball = `https://registry.npmjs.org/${pkg.name}/-/${pkg.name}-${pkg.version}.tgz`;
let ok = false;
for (let i = 0; i < 24 && !ok; i++) {
  await new Promise((r) => setTimeout(r, 15000));
  try {
    const res = await fetch(tarball, { method: 'HEAD' });
    if (res.ok) ok = true;
  } catch { /* 网络抖动，继续等 */ }
  if (!ok && i % 4 === 3) step(`仍在处理…（已等 ${(i + 1) * 15}s）`);
}

if (!ok) {
  console.warn(`\n⚠ 已提交发布，但 6 分钟内 registry 还没出现 ${pkg.version}。`);
  console.warn('  npm 的异步流水线偶尔更久；稍后自查：npm view ' + pkg.name + ' version');
  process.exit(0);
}

const meta = await fetch(`https://registry.npmjs.org/${pkg.name}`, { headers: { accept: 'application/json' } })
  .then((r) => (r.ok ? r.json() : null))
  .catch(() => null);
console.log(`  version: ${pkg.version}`);
if (meta && meta['dist-tags']) console.log(`  dist-tags: ${JSON.stringify(meta['dist-tags'])}`);
if (meta && meta['dist-tags'] && meta['dist-tags'].latest !== pkg.version) {
  console.warn(`  ⚠ latest 目前指向 ${meta['dist-tags'].latest}，若需要可执行：npm dist-tag add ${pkg.name}@${pkg.version} latest`);
}

console.log(`\n✅ 已发布 ${pkg.name}@${pkg.version}`);
console.log('   提示：别忘了 git tag 并推送 —— git tag v' + pkg.version + ' && git push origin v' + pkg.version);
