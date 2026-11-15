#!/usr/bin/env node
// 把工作区里「索引是 LF、磁盘是 CRLF」的文件按索引内容重写成 LF。
//
// 为什么需要它：core.autocrlf=true 的机器上，git 认为「CRLF 工作区 == LF 索引」是等价的，
// 所以 `git checkout -- .`、`git checkout-index -a -f` 都不会重写这些文件——它们看起来
// 恰好是「没有本地改动」，实际磁盘上每个换行都多一个 \r。索引与 CI 是干净的，只有本机不干净，
// 于是「本机能跑、别人机器报字符偏移不对」这类问题会一直存在而没人查得动。
//
// 用法：node tools/fix-eol-worktree.mjs          只看有多少个文件要改（dry）
//       node tools/fix-eol-worktree.mjs --write  真写
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const write = process.argv.includes('--write');

const files = execFileSync('git', ['ls-files', '-z'], { cwd: root, maxBuffer: 64 * 1024 * 1024 })
  .toString('utf8').split('\0').filter(Boolean);

const dirty = [];
const skipped = [];
for (const rel of files) {
  const full = path.join(root, rel);
  let buf;
  try { buf = fs.readFileSync(full); } catch { continue; }
  if (buf.indexOf(13) < 0) continue; // 没有 \r，本来就干净
  // 只处理索引里是 LF 的：索引本身是 CRLF 的文件（i/crlf）不属于这里管
  const idxtxt = execFileSync('git', ['show', `:${rel}`], { cwd: root, maxBuffer: 64 * 1024 * 1024 });
  if (idxtxt.indexOf(13) >= 0) { skipped.push(rel); continue; }
  dirty.push({ rel, full, idxtxt });
}

if (skipped.length) {
  console.log(`· 跳过 ${skipped.length} 个「索引本身就是 CRLF」的文件：${skipped.slice(0, 5).join(', ')}${skipped.length > 5 ? ' …' : ''}`);
}

if (!dirty.length) {
  console.log('✓ 工作区行尾已经是 LF，没有要改的文件');
  process.exit(0);
}

console.log(`${write ? '重写' : '待改'} ${dirty.length} 个文件：`);
for (const d of dirty.slice(0, 12)) console.log(`  - ${d.rel}`);
if (dirty.length > 12) console.log(`  …共 ${dirty.length} 个`);

if (!write) {
  console.log('\n这是 dry run，加 --write 才真写。');
  process.exit(0);
}
for (const d of dirty) fs.writeFileSync(d.full, d.idxtxt);
console.log(`\n✓ 已按索引内容重写 ${dirty.length} 个文件为 LF`);
