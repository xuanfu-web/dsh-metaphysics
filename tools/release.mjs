#!/usr/bin/env node
// 一条命令走完发版：测试 → 构建 → 校验产物 → 发 npm。
//
//   NPM_TOKEN=npm_xxx npm run release              # 正式发布
//   NPM_TOKEN=npm_xxx npm run release -- --dry-run # 只跑到校验，不发布
//   npm run release -- --verify-only               # 只核对 registry 上当前版本的附件
//   npm run release -- --skip-tests                # 紧急情况下跳过测试（不建议）
//
// 说明：
//  - token 只从环境变量 NPM_TOKEN 读，脚本会把它写进临时 .npmrc（0600），退出时删掉；
//  - 发布前会确认 git 工作区干净、client.js 已随源码重建、registry 上没有同版本；
//  - 发布后必须核对「tarball 能下载、shasum 与 registry 记录一致、文件数对得上」，
//    因为 npm 会先让版本条目可见、附件晚几分钟落盘（0.34.0 就撞上过这种半失败状态）；
//  - 本机没装 npm CLI 时，可用 NPM_CLI=/path/to/npm-cli.js 指向它。
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync, readFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { verifyPublish } from './verify-publish.mjs';

const root = path.resolve(import.meta.dirname, '..');
const pkg = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const skipTests = args.includes('--skip-tests');
const verifyOnly = args.includes('--verify-only');

const step = (msg) => console.log(`\n▸ ${msg}`);
const fail = (msg) => { console.error(`\n✗ ${msg}\n`); process.exit(1); };

// 发布后核对：附件能下载、字节与 registry 记的 shasum 一致、关键文件在包里。
// 单独抽出来是因为 --verify-only 也要用同一套判据。
async function verifyReleased() {
  step(`核对 registry 上的 ${pkg.name}@${pkg.version}`);
  const check = await verifyPublish({
    name: pkg.name,
    version: pkg.version,
    expectFiles: ['package.json', 'client.js', 'client.chart.js', 'client.mbti.js', '命理排盘.html'],
    onWait: ({ waitedMs, lastReason }) => step(`仍在处理…（已等 ${Math.round(waitedMs / 1000)}s）：${lastReason}`),
  });
  if (!check.ok) {
    console.error(`\n✗ 发布核对没通过：${check.reason}`);
    console.error('  版本条目已在 registry 上，但附件不可用——装包的人会失败。');
    console.error('  处理办法（按 npm 的规则，unpublish/deprecate 属于绕过 2FA 的破坏性动作，');
    console.error('  granular token 会被 403 拒绝，需要在 npm 网页上用 2FA 手动做，或换 automation token）：');
    console.error('    1) 网页 https://www.npmjs.com/package/' + pkg.name + '/access 删除该版本；');
    console.error('    2) 或把 package.json 升到下一个补丁号重新发；');
    console.error('    3) 若只是还没落盘，等 10 分钟后再跑：node tools/release.mjs --verify-only');
    process.exit(1);
  }
  console.log(`  tarball: ${check.tarball}`);
  console.log(`  shasum: ${check.shasum}`);
  console.log(`  文件数: ${check.fileCount}`);
  console.log(`  latest: ${check.latest}`);
  if (check.latest !== pkg.version) {
    console.warn(`  ⚠ latest 目前指向 ${check.latest}，若需要可执行：npm dist-tag add ${pkg.name}@${pkg.version} latest`);
  }
  console.log(`\n✅ 已发布并核对通过 ${pkg.name}@${pkg.version}`);
  console.log('   提示：别忘了 git tag 并推送 —— git tag v' + pkg.version + ' && git push origin v' + pkg.version);
  return check;
}

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
if (verifyOnly) {
  await verifyReleased();
  process.exit(0);
}
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
step('重建 client.js、引擎分块与单文件 HTML');
run(process.execPath, [path.join(root, 'tools', 'build-client.mjs')], '构建 client.js 与分块');
run(process.execPath, [path.join(root, 'tools', 'build-html.mjs')], '构建 HTML');
step('校验构建产物与源码一致');
run('git', ['diff', '--exit-code', '--', 'client.js', 'client.*.js'], '校验 client.js 与分块（未提交的产物差异）');

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
// npm 的发布是异步的：版本条目先可见，tarball 附件可能晚几分钟才落盘。
// 所以核对以「附件能下载且字节对得上」为准，而不是 `npm view` 或 publish 的输出。
await verifyReleased();
