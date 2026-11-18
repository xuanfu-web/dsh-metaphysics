#!/usr/bin/env node
// 台账清账闸：`docs/ledger.md` 的「## 二、待办」里不许留没结案的行。
//
//   node tools/check-backlog.mjs          # 有未结案的行就 red
//   node tools/check-backlog.mjs --list   # 只打印，不判失败（写文档时用）
//
// 为什么：发版报告里每次都有一串「剩余未做」，靠人记性收尾的结果就是永远收不完
// （0.84.0 收尾时才补上「推 main」这一步）。规则很简单——一行要么有结论词
// （完成 / 已发版 / 已决 / 不拆 / 不落表 / 已改完），要么它就在拦发版。
//
// 判据：表格行第 2 列（状态）必须命中 CONCLUSION；否则报「未结案」并给出该行标题。
// 表格之外的行（说明文字）不看，免得把叙述文字当成待办。

import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const file = path.join(root, 'docs', 'ledger.md');
const listOnly = process.argv.includes('--list');
const CONCLUSION = /完成|已发版|已决|不拆|不落表|已改完|已收口/;
// 「完成」也常出现在「未完成 / 未发版」这种状态里——所以先看否定词，再看结论词。
const UNSETTLED = /未发版|未完成|未做|还没|待定|待办|WIP|攒批/;

const text = fs.readFileSync(file, 'utf8');
const lines = text.split('\n');

const start = lines.findIndex((l) => /^##\s*二、/.test(l));
if (start < 0) {
  console.error('✗ docs/ledger.md 里找不到「## 二、」段');
  process.exit(1);
}
let end = lines.findIndex((l, i) => i > start && /^##\s/.test(l));
if (end < 0) end = lines.length;

const rows = [];
for (let i = start + 1; i < end; i++) {
  const line = lines[i];
  if (!/^\|/.test(line)) continue;
  if (/^\|\s*-{3}/.test(line)) continue; // 分隔行
  const cells = line.split('|').slice(1, -1).map((c) => c.trim());
  if (cells.length < 2) continue;
  if (cells[0] === '项') continue; // 表头
  rows.push({ line: i + 1, item: cells[0], status: cells[1] });
}

if (!rows.length) {
  console.log('✓ 台账「二、待办」里没有行（等于没有欠账）');
  process.exit(0);
}

const open = rows.filter((r) => UNSETTLED.test(r.status) || !CONCLUSION.test(r.status));
if (listOnly) {
  console.log(`共 ${rows.length} 行：${rows.length - open.length} 已结案 / ${open.length} 未结案`);
  for (const r of open) console.log(`  未结案 L${r.line}: ${r.item.slice(0, 40)} —— 状态「${r.status.slice(0, 20)}」`);
  process.exit(0);
}

if (open.length) {
  console.error(`\n✗ 台账里还有 ${open.length} 行没结案（发版前必须清掉，或写进「四、已决」给出决定）：\n`);
  for (const r of open) console.error(`  L${r.line}  ${r.item.slice(0, 60)}\n         状态：${r.status.slice(0, 60)}`);
  console.error('\n结案写法：完成 / 已发版 <ver> / 已改完（含依据）/ 已决（决定 + 依据）。');
  console.error('决定类的不必硬做，写进「## 四、已决」并注明「这是决定，不是待办」。');
  process.exit(1);
}

console.log(`✓ 台账清账：${rows.length} 行全部有结论（没有「剩余未做」）`);
