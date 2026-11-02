import { solarToLunar } from '../engine/lunar.js';
import { termInstantJd, jdToParts } from '../engine/calendar.js';

import { ok } from './_harness.mjs';

// 春节（正月初一）锚点
const springFestivals = {
  1984: '1984-02-02', 1990: '1990-01-27', 2000: '2000-02-05',
  2010: '2010-02-14', 2015: '2015-02-19', 2020: '2020-01-25',
  2023: '2023-01-22', 2024: '2024-02-10', 2025: '2025-01-29', 2026: '2026-02-17',
};

for (const [y, date] of Object.entries(springFestivals)) {
  const [Y, M, D] = date.split('-').map(Number);
  const l = solarToLunar(Y, M, D);
  ok(`${date} = 正月初一`, l.month === 1 && l.day === 1 && !l.isLeap, `${l.month}月${l.day}日${l.isLeap ? ' 闰' : ''}`);
}

// 前一天应为上年腊月
const eve = solarToLunar(2024, 2, 9);
ok('2024-02-09 = 腊月三十', eve.month === 12 && eve.day === 30, `${eve.month}月${eve.day}日`);

// 中秋（八月十五）
const midAutumn = { 2023: '2023-09-29', 2024: '2024-09-17', 2025: '2025-10-06' };
for (const [y, date] of Object.entries(midAutumn)) {
  const [Y, M, D] = date.split('-').map(Number);
  const l = solarToLunar(Y, M, D);
  ok(`${date} = 八月十五`, l.month === 8 && l.day === 15, `${l.month}月${l.day}日`);
}

// 闰月：2020 闰四月，2023 闰二月，2025 闰六月
const leaps = [
  ['2020-05-23', 4, true, '2020 闰四月初一'],
  ['2023-03-22', 2, true, '2023 闰二月初一'],
  ['2025-07-25', 6, true, '2025 闰六月初一'],
];
for (const [date, month, isLeap, label] of leaps) {
  const [Y, M, D] = date.split('-').map(Number);
  const l = solarToLunar(Y, M, D);
  ok(label, l.month === month && l.isLeap === true && l.day === 1, `${l.month}月${l.day}日${l.isLeap ? ' 闰' : ''}`);
}

// 1929 年前那一次「北京地方平时」换算只能做一遍。
// 早先 lunar.js 把 calendar 已经落在本地轴上的节气时刻又套了一次 toHistoricalLocal，
// 等于把所有中气整体推后约 12 分钟；正好卡在午夜前后的中气因此归错了月，
// 1917、1922 两年各多出一个闰月。历书：1917 闰二月、1922 闰五月（引擎曾误判闰三月、闰六月）。
const pre1929 = [
  ['1917-03-23', 2, true, '1917 闰二月初一'],
  ['1917-04-21', 3, false, '1917-04-21 = 三月初一，不是闰三月初一'],
  ['1922-06-25', 5, true, '1922 闰五月初一'],
  ['1922-07-24', 6, false, '1922-07-24 = 六月初一，不是闰六月初一'],
];
for (const [date, month, isLeap, label] of pre1929) {
  const [Y, M, D] = date.split('-').map(Number);
  const l = solarToLunar(Y, M, D);
  ok(label, l.month === month && l.day === 1 && l.isLeap === isLeap,
    `${l.month}月${l.day}日${l.isLeap ? ' 闰' : ''}`);
}

// 「冬至必须在十一月」是整张置闰表的定盘星：十一月由含冬至的那个月锚死，
// 之后才逐月推中气、找第一个无中气之月置闰。时间轴算错时最先松动的就是它，
// 所以 1900–2100 逐年核对，而不是只挑几个样本年。
const dzBad = [];
for (let y = 1900; y <= 2100; y++) {
  const p = jdToParts(termInstantJd(y, 23));
  const l = solarToLunar(p.year, p.month, p.day);
  if (!l) dzBad.push(`${y} 越界`);
  else if (l.month !== 11 || l.isLeap) dzBad.push(`${y}：冬至${p.month}-${p.day} → ${l.isLeap ? '闰' : ''}${l.month}月${l.day}日`);
}
ok('1900–2100 每年冬至都落在十一月', dzBad.length === 0, dzBad.slice(0, 6).join('；') || '201 年全中');

// 连续 60 天逐日自检：同一月内日期递增，换月则回到初一
let prev = null;
let monotonic = true;
for (let d = 0; d < 60; d++) {
  const dt = new Date(Date.UTC(2024, 0, 1 + d));
  const y = dt.getUTCFullYear(); const m = dt.getUTCMonth() + 1; const dd = dt.getUTCDate();
  const l = solarToLunar(y, m, dd);
  if (prev) {
    if (l.monthStart === prev.monthStart) {
      if (l.day !== prev.day + 1) { monotonic = false; console.log('  同日序断点', y, m, dd, prev.day, l.day); }
    } else if (l.day !== 1) {
      monotonic = false; console.log('  换月非初一', y, m, dd, l.monthStart, l.day);
    }
  }
  prev = l;
}
ok('连续 60 天日期连续', monotonic);
