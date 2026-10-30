// 口径对照 CLI：同一时刻在不同流派口径下排出什么差异
//
//   node tools/caliber-diff.mjs --datetime 1996-01-19T23:40 --gender male
//   node tools/caliber-diff.mjs --datetime 1996-01-19T23:40 --system qimen
//
// 用法即演示：命理圈争的就是这几个开关，这里直接把「变在哪几个字」摊开。
import { compute } from '../engine/index.js';
import { diffObjects, renderDiff } from '../engine/diff.js';

function argOf(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const datetime = argOf('datetime', '1996-01-19T23:40');
const gender = argOf('gender', 'male');
const address = argOf('address', '安徽池州');
const system = argOf('system', 'bazi');

/** 需要对照的口径组：每次两组参数，只差一个维度 */
const SWITCHES = {
  bazi: [
    {
      name: '晚子时：23:00 后是否换日',
      a: { lateZi: true },
      b: { lateZi: false },
    },
    {
      name: '真太阳时：是否按出生地经度修正',
      a: { trueSolar: true },
      b: { trueSolar: false },
    },
  ],
  qimen: [
    {
      name: '取局流派：拆补 / 超神接气 / 置闰',
      a: { juMethod: 'chaibu' },
      b: { juMethod: 'zhirun' },
    },
    {
      name: '晚子时归日：当日 / 次日',
      a: { lateZiHourMode: 'same-day' },
      b: { lateZiHourMode: 'next-day' },
    },
  ],
  ziwei: [
    {
      name: '闰月：按日切分 / 整月归次月',
      a: { leapMonth: 'split' },
      b: { leapMonth: 'next' },
    },
    {
      name: '闰月：整月归本月 / 整月归次月',
      a: { leapMonth: 'prev' },
      b: { leapMonth: 'next' },
    },
    {
      name: '真太阳时：是否按出生地经度修正',
      a: { trueSolar: true },
      b: { trueSolar: false },
    },
  ],
};

const base = { system, datetime, gender, address };
const switches = SWITCHES[system] || SWITCHES.bazi;

console.log(`口径对照 · ${system} · ${datetime}${system === 'bazi' || system === 'ziwei' ? ` · ${gender}` : ''}`);
console.log('（同一组输入，只切换一个口径开关；下方只列变化的字段）\n');

let totalChanged = 0;
for (const sw of switches) {
  const A = compute({ ...base, ...sw.a });
  const B = compute({ ...base, ...sw.b });
  const diffs = diffObjects(A, B);
  totalChanged += diffs.length;
  console.log(renderDiff(diffs, { title: sw.name }));
  console.log('');
}

console.log(`合计变化 ${totalChanged} 处。若为 0，说明该时刻对这几组口径不敏感（例如出生时刻不在子时、或无经度）。`);
