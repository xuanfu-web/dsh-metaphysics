// 1929 年前后的时区口径：节气与农历必须共用同一套「当时本地时间」换算。
//
// 1929-01-01 之前中国历书按北京地方平时（UTC+7.7611）推算朔与中气，之后才是东八区。
// 0.14.1 及以前只有农历做了这个切换，节气一律 +8，导致 1929 年前出生者在交节前后
// 十几分钟内可能月柱整柱错位。
import {
  localOffsetFor, OFFSET_MODERN, OFFSET_BEIJING_LOCAL,
  termInstantJd, partsToJd, formatJd,
} from '../engine/calendar.js';
import { solarToLunar } from '../engine/lunar.js';
import { ok } from './_harness.mjs';

const utOf = (y, m, d) => partsToJd({ year: y, month: m, day: d }) - OFFSET_MODERN;

ok('1920 年用北京地方平时', Math.abs(localOffsetFor(utOf(1920, 6, 1)) - OFFSET_BEIJING_LOCAL) < 1e-12);
ok('2026 年用东八区', Math.abs(localOffsetFor(utOf(2026, 6, 1)) - OFFSET_MODERN) < 1e-12);
ok('切换点在 1929-01-01', Math.abs(localOffsetFor(utOf(1928, 12, 31)) - OFFSET_BEIJING_LOCAL) < 1e-12
  && Math.abs(localOffsetFor(utOf(1929, 1, 2)) - OFFSET_MODERN) < 1e-12);

// 1920 冬至：按北京地方平时应是 11:03（若仍一律 +8 会得到 11:17）
const dongzhi1920 = formatJd(termInstantJd(1920, 23));
ok('1920 冬至按北京地方平时标注', dongzhi1920 === '1920-12-22 11:03', dongzhi1920);

// 两套偏移相差 0.2389 小时（14.33 分钟），正是历史上会"吃掉"一次交节的那个量级
const gapMinutes = (OFFSET_MODERN - OFFSET_BEIJING_LOCAL) * 1440;
ok('两套偏移相差约 14.3 分钟', Math.abs(gapMinutes - 14.33) < 0.05, gapMinutes.toFixed(2));
ok('节气时刻在本地轴（不是 UTC）', Math.abs(termInstantJd(2025, 23) - partsToJd({ year: 2025, month: 12, day: 21 })) < 1);

// 农历侧仍然是已知锚点（1920-02-20 = 庚申年正月初一）
const l = solarToLunar(1920, 2, 20);
ok('1920 春节 = 正月初一', l.month === 1 && l.day === 1 && l.isLeap === false, `${l.month}月${l.day}日`);
ok('1929 元旦仍是农历十一月廿一', (() => {
  const x = solarToLunar(1929, 1, 1);
  return x.month === 11 && x.day === 21;
})());
