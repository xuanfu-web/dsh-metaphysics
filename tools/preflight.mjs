// 提交前那一套闸，脱离 git 钩子也能跑。
//
// 为什么要有这一层：本机 DSH 沙箱里 msys sh 起不来
//   fatal error - couldn't create signal pipe, Win32 error 5
// 装 .git/hooks 会把每一次 git commit 都堵死（git 一定用 sh 跑钩子）。
// 所以闸门逻辑集中在这里，钩子模板只负责调它；本机日常用 npm run preflight。
//
// 用法：
//   node tools/preflight.mjs          轻量：文案闸 + 行尾 + 注入面 + 暂存 js 语法
//   node tools/preflight.mjs --full   全闸：build-all --gate（约半分钟）
//   node tools/preflight.mjs --staged 只查语法，跳过其余（改注释时图快）
import { spawnSync, execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const full = argv.includes('--full');
const syntaxOnly = argv.includes('--staged');

const NODE = process.execPath;

function run(name, args) {
  const t0 = Date.now();
  const r = spawnSync(NODE, args, { cwd: REPO, stdio: 'inherit', encoding: 'utf8' });
  const ms = Date.now() - t0;
  if (r.status !== 0) {
    console.log(`\n✗ ${name} 失败（${ms}ms）：node ${args.join(' ')}`);
    return false;
  }
  console.log(`✓ ${name}（${ms}ms）`);
  return true;
}

function stagedJs() {
  try {
    const out = execFileSync('git', ['diff', '--cached', '--name-only', '--diff-filter=ACMR'], {
      cwd: REPO,
      encoding: 'utf8',
    });
    return out
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => /\.(m?js)$/.test(s));
  } catch (e) {
    return [];
  }
}

const steps = [];
if (full) {
  steps.push(['全闸（构建 + 200 个测试文件）', ['tools/build-all.mjs', '--gate']]);
} else if (!syntaxOnly) {
  steps.push(
    ['文案闸', ['tools/lint-copy.mjs']],
    ['文案闸自检（故意写错的文案必须变红）', ['tools/verify-lint-copy.mjs']],
    ['行尾必须是 LF', ['tools/check-eol.mjs']],
    ['HTML 注入面', ['tools/check-html-sinks.mjs']],
  );
}

let ok = true;
for (const [name, args] of steps) {
  if (!run(name, args)) {
    ok = false;
    break;
  }
}

if (ok) {
  const files = stagedJs();
  if (files.length) {
    console.log(`\n暂存 js 语法（${files.length} 个）`);
    for (const f of files) {
      const r = spawnSync(NODE, ['--check', f], { cwd: REPO, encoding: 'utf8' });
      if (r.status !== 0) {
        console.log(`✗ 语法错误：${f}`);
        if (r.stderr) console.log(r.stderr.trim());
        ok = false;
        break;
      }
    }
    if (ok) console.log('✓ 语法');
  }
}

if (!ok) {
  console.log('\n没通过。改完重跑：node tools/preflight.mjs');
  process.exitCode = 1;
} else {
  console.log(full ? '\n全闸通过。' : '\n可以提交了；推送前跑 node tools/preflight.mjs --full');
}
