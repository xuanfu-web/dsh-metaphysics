// 测试自检：故意写错一条断言，测试必须真的变红。
//
// 这是为了保护「测试本身」——0.14.0 之前 9 个测试文件断言失败仍然 exit 0，
// 全量 27/27 的绿色没有任何意义。任何一次改动如果让断言重新变成"只打印不失败"，
// 这个自检会立刻发现。
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const src = path.join(root, 'test', 'bazi.test.mjs');
const tmp = path.join(root, 'test', '_selfcheck.test.mjs');

const NEEDLE = "'己卯 丙子 戊午 壬子'";
const text = readFileSync(src, 'utf8');
if (!text.includes(NEEDLE)) {
  console.error(`✗ 自检无法进行：${path.relative(root, src)} 里找不到用于破坏的期望值 ${NEEDLE}`);
  console.error('  请把本脚本的 NEEDLE 同步成该文件里仍然存在的断言。');
  process.exit(1);
}

writeFileSync(tmp, text.replace(NEEDLE, "'自检用错误值'"), 'utf8');
let failed = null;
try {
  const r = spawnSync(process.execPath, [tmp], { encoding: 'utf8' });
  const out = `${r.stdout || ''}\n${r.stderr || ''}`;
  failed = { status: r.status, hasFail: /^FAIL /m.test(out), tail: out.trim().split('\n').slice(-2).join(' / ') };
} finally {
  try { unlinkSync(tmp); } catch (e) { /* 删不掉也不影响结论 */ }
}

if (failed.status === 0) {
  console.error('✗ 自检失败：断言已经写错，测试进程却以 0 退出——测试的失败信号又断了。');
  process.exit(1);
}
if (!failed.hasFail) {
  console.error('✗ 自检失败：进程非零退出，但不是因为断言失败（可能只是语法/导入错误）。');
  console.error(`  最后两行：${failed.tail}`);
  process.exit(1);
}

console.log(`✓ 测试自检通过：故意写错的断言让进程以 ${failed.status} 退出（${failed.tail}）`);
