// 口径对照 CLI：同一时刻在不同流派口径下排出什么差异
//
//   node tools/caliber-diff.mjs --datetime 1996-01-19T23:40 --gender male
//   node tools/caliber-diff.mjs --datetime 1996-01-19T23:40 --system qimen
//
// 与面板、独立页共用 engine/index.js 的 caliberCompare：开关表只有一份，
// 这里只负责把「当前口径 → 另一口径」的根因与连带影响打成文本。
import { caliberCompare } from '../engine/index.js';

function argOf(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const datetime = argOf('datetime', '1996-01-19T23:40');
const gender = argOf('gender', 'male');
const address = argOf('address', '安徽池州');
const system = argOf('system', 'bazi');

const cmp = caliberCompare({ system, datetime, gender, address });
if (!cmp.switches.length) {
  console.log(`口径对照 · ${system}：这个体系没有可对照的口径开关（目前支持 bazi / ziwei / qimen）。`);
  process.exit(0);
}

console.log(`口径对照 · ${system} · ${datetime}${system === 'bazi' || system === 'ziwei' ? ` · ${gender}` : ''}`);
console.log('（同一组输入，只把当前口径换成另一档；下方只列变化字段与根因）\n');

for (const row of cmp.switches) {
  console.log(`【${row.title}】`);
  console.log(`  当前 · ${row.currentLabel}　→　另一口径 · ${row.altLabel}`);
  if (row.error) {
    console.log(`  未能对照：${row.error}\n`);
    continue;
  }
  if (!row.total) {
    console.log('  本盘不受此口径影响：所有字段一致。\n');
    continue;
  }
  console.log(`  ${row.summary}`);
  for (const r of row.roots) {
    console.log(`    根因　${r.label} ${r.from} → ${r.to}`);
  }
  console.log(`    连带　${row.categories.map((c) => `${c.name} ${c.count} 处`).join('、')}`);
  console.log('');
}

console.log(`合计变化 ${cmp.total} 处。若为 0，说明该时刻对这几组口径不敏感（例如出生时刻不在子时、或无经度）。`);
