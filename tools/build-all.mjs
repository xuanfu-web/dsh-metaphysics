#!/usr/bin/env node
// 一条命令跑完「正确的构建顺序」。
//
// 为什么需要它（2026-11-15）：
//   产物之间有依赖——页面内嵌「N 个测试文件 / M 条断言」、verification.html 由断言基线生成、
//   citations.html 由引文库生成、docs/index.html 是命理排盘.html 的副本。顺序错一步或漏拷一次，
//   就会看到「字符数相同但内容不同」这种既不像代码错、也不像测试错的红。而这类红最贵的代价不是修，
//   是**判断成本**：会把人引去查「是不是漏了某步构建」，掩盖真因（这次真因是 CRLF，不是顺序）。
//   所以顺序不该靠人记，写成脚本。
//
// 顺序（改这里之前先读上面那段）：
//   build-client → verification → citations → build-html → 拷 docs/index.html
//   → check-eol（行尾）→ check-bundle（产物与源码一致）
//
// 用法：
//   node tools/build-all.mjs          只构建 + 拷副本 + 两道产物闸
//   node tools/build-all.mjs --gate   构建完再跑完整全闸（等同 test:ci + 文案闸 + 行尾闸）
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const gate = process.argv.includes('--gate');
const t0 = Date.now();

function run(label, args) {
  const started = Date.now();
  const r = spawnSync(process.execPath, args, { cwd: root, stdio: 'inherit', encoding: 'utf8' });
  const ms = Date.now() - started;
  if (r.status !== 0) {
    console.error(`\n✗ ${label} 失败（${ms}ms，退出码 ${r.status}）——后续步骤不再执行`);
    process.exit(r.status || 1);
  }
  console.log(`  ✓ ${label}（${ms}ms）`);
}

console.log('== 构建（顺序固定，勿调换）==');
run('build-client', ['tools/build-client.mjs']);
run('verification', ['tools/verification.mjs']);
run('citations', ['tools/citations.mjs']);
run('build-html', ['tools/build-html.mjs']);

const src = path.join(root, '命理排盘.html');
const dst = path.join(root, 'docs', 'index.html');
if (!fs.existsSync(src)) {
  console.error(`✗ 找不到 ${src}，build-html 没有产出页面`);
  process.exit(1);
}
fs.copyFileSync(src, dst);
console.log(`  ✓ 拷副本 命理排盘.html → docs/index.html（${(fs.statSync(dst).size / 1024).toFixed(1)}KB）`);

console.log('== 产物闸 ==');
run('check-eol', ['tools/check-eol.mjs']);
run('check-bundle', ['tools/check-bundle.mjs']);

if (gate) {
  console.log('== 全闸 ==');
  run('check-verification', ['tools/check-verification.mjs']);
  run('check-html-sinks', ['tools/check-html-sinks.mjs']);
  run('check-patterns', ['tools/check-patterns.mjs']);
  run('lint-copy', ['tools/lint-copy.mjs']);
  run('verify-lint-copy', ['tools/verify-lint-copy.mjs']);
  run('check-perf', ['tools/check-perf.mjs']);
  run('check-assertions', ['tools/check-assertions.mjs']);
  run('verify-tests-can-fail', ['tools/verify-tests-can-fail.mjs']);
  run('test-all', ['tools/test-all.mjs']);
}

console.log(`\n✓ 全部完成，用时 ${((Date.now() - t0) / 1000).toFixed(1)}s${gate ? '（含全闸）' : '（未含全闸，加 --gate 一起跑）'}`);
