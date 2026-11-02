// 校验页新鲜度：docs/verification.html 与徽章必须由当前源码逐字节渲染得出来。
//
// 为什么要单独成一条：这一步在 CI 里存在（.github/workflows/test.yml 用
// `git add -N + git diff --exit-code` 卡产物是否漏生成），但本地 `npm run test:ci` 没有，
// 于是「本地全绿、推上去 CI 红」成了常态。这里用同一个渲染函数在内存里重跑一遍再比字节，
// 不依赖 git（clone 出来没有 .git 的机器、以及 npm pack 之后的目录都能跑）。
// verification.mjs 不写日期戳，产物是纯函数结果，因此字节比较是可信的判据。
import fs from 'node:fs';
import path from 'node:path';
import { buildVerification, renderVerificationHTML, renderBadgeSVG } from './verification.mjs';

const root = path.resolve(import.meta.dirname, '..');
const TARGETS = [
  ['docs/verification.html', renderVerificationHTML],
  ['docs/assets/verification-badge.svg', renderBadgeSVG],
];

const data = buildVerification();
const stale = [];
for (const [rel, render] of TARGETS) {
  const want = render(data);
  const file = path.join(root, rel);
  let have = null;
  try { have = fs.readFileSync(file, 'utf8'); } catch (e) { /* 文件还没生成 */ }
  if (have === want) continue;
  const at = firstDiff(have ?? '', want);
  stale.push(`${rel}${have === null ? '（缺失）' : `：第 ${at.line} 行第 ${at.col} 个字符起不同`}`
    + `｜磁盘 ${Buffer.byteLength(have ?? '')} 字节 / 源码渲染 ${Buffer.byteLength(want)} 字节`);
}

if (stale.length) {
  console.error('✗ 校验页与源码不一致（改了 engine/ 或验证用例却没重生成）：');
  for (const s of stale) console.error(`  - ${s}`);
  console.error('  处理：npm run build:verification 后把两个文件一起提交。');
  process.exit(1);
}
console.log(`✓ 校验页新鲜度通过：${TARGETS.length} 个产物与源码渲染逐字节一致`);

/** 第一个不同的位置（按行/列报，方便对着编辑器找） */
function firstDiff(a, b) {
  let line = 1;
  let col = 1;
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) {
    if (a[i] !== b[i]) return { line, col };
    if (a[i] === '\n') { line += 1; col = 1; } else col += 1;
  }
  return { line, col };
}
