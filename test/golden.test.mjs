// 对拍测试：与外部权威历表逐条比对，而不是只跟自己的历史输出比。
// 数据源：国立天文台（NAOJ）令和6年（2024）暦要項
//   https://eco.mtk.nao.ac.jp/koyomi/yoko/2024/rekiyou242.html （二十四節気）
//   https://eco.mtk.nao.ac.jp/koyomi/yoko/2024/rekiyou243.html （朔弦望）
// 原始时刻为日本中央標準時（JST, UTC+9）；本文件数值已统一换算为北京时间（UTC+8，减 1 小时）。
// 容差说明：本引擎节气用 Meeus 低精度太阳黄经（ch.25，误差约 0.01°，约合 14 分钟），
// 实测系统性偏早 1–14 分钟，故取 ±15 分钟。要让月柱在交节时刻与官方历完全一致，
// 需要 VSOP87 截断级黄经，属于后续优化项；当前对「距节 <15 分钟出生」已有复核提示。
// 定朔用 Meeus 第 49 章，实测偏差 <1.2 分钟，取 ±3 分钟。
import { termWindow, formatJd, partsToJd } from '../engine/calendar.js';
import { newMoonJd } from '../engine/lunar.js';

let pass = 0;
let fail = 0;
const ok = (name, cond, detail = '') => {
  if (cond) { pass++; console.log(`PASS  ${name}${detail ? '  -> ' + detail : ''}`); }
  else { fail++; console.log(`FAIL  ${name}${detail ? '  -> ' + detail : ''}`); }
};

// ── 2024 二十四节气（北京时间，NAOJ 换算） ──
const TERMS_2024 = [
  ['小寒', '2024-01-06T04:49'], ['大寒', '2024-01-20T22:07'], ['立春', '2024-02-04T16:27'],
  ['雨水', '2024-02-19T12:13'], ['惊蛰', '2024-03-05T10:23'], ['春分', '2024-03-20T11:06'],
  ['清明', '2024-04-04T15:02'], ['谷雨', '2024-04-19T22:00'], ['立夏', '2024-05-05T08:10'],
  ['小满', '2024-05-20T21:00'], ['芒种', '2024-06-05T12:10'], ['夏至', '2024-06-21T04:51'],
  ['小暑', '2024-07-06T22:20'], ['大暑', '2024-07-22T15:44'], ['立秋', '2024-08-07T08:09'],
  ['处暑', '2024-08-22T22:55'], ['白露', '2024-09-07T11:11'], ['秋分', '2024-09-22T20:44'],
  ['寒露', '2024-10-08T03:00'], ['霜降', '2024-10-23T06:15'], ['立冬', '2024-11-07T06:20'],
  ['小雪', '2024-11-22T03:56'], ['大雪', '2024-12-06T23:17'], ['冬至', '2024-12-21T17:21'],
];

const toJd = (s) => {
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);
  return partsToJd({ year: +m[1], month: +m[2], day: +m[3], hour: +m[4], minute: +m[5] });
};

// termWindow(2024) 返回 2023–2025 的滚动窗口，按 (year,name) 定位
const window = termWindow(2024);
const findTerm = (year, name) => window.find((t) => t.year === year && t.name === name);

let worstTerm = 0;
let badTerm = null;
for (const [name, iso] of TERMS_2024) {
  const t = findTerm(2024, name);
  if (!t) { ok(`节气 ${name}`, false, '未在窗口中找到'); continue; }
  const delta = (t.jd - toJd(iso)) * 1440; // 分钟
  if (Math.abs(delta) > worstTerm) { worstTerm = Math.abs(delta); badTerm = name; }
}

// ── 2025 二十四节气（北京时间，NAOJ 换算） ──
const TERMS_2025 = [
  ['小寒', '2025-01-05T10:33'], ['大寒', '2025-01-20T04:00'], ['立春', '2025-02-03T22:10'],
  ['雨水', '2025-02-18T18:07'], ['惊蛰', '2025-03-05T16:07'], ['春分', '2025-03-20T17:01'],
  ['清明', '2025-04-04T20:49'], ['谷雨', '2025-04-20T03:56'], ['立夏', '2025-05-05T13:57'],
  ['小满', '2025-05-21T02:55'], ['芒种', '2025-06-05T17:57'], ['夏至', '2025-06-21T10:42'],
  ['小暑', '2025-07-07T04:05'], ['大暑', '2025-07-22T21:29'], ['立秋', '2025-08-07T13:52'],
  ['处暑', '2025-08-23T04:34'], ['白露', '2025-09-07T16:52'], ['秋分', '2025-09-23T02:19'],
  ['寒露', '2025-10-08T08:41'], ['霜降', '2025-10-23T11:51'], ['立冬', '2025-11-07T12:04'],
  ['小雪', '2025-11-22T09:36'], ['大雪', '2025-12-07T05:05'], ['冬至', '2025-12-21T23:03'],
];
const win2025 = termWindow(2025);
let worstTerm25 = 0;
let badTerm25 = null;
const deltas25 = [];
for (const [name, iso] of TERMS_2025) {
  const t = win2025.find((x) => x.year === 2025 && x.name === name);
  if (!t) { ok(`2025 节气 ${name}`, false, '未在窗口中找到'); continue; }
  const d = (t.jd - toJd(iso)) * 1440;
  deltas25.push(`${name}${d.toFixed(0)}`);
  if (Math.abs(d) > worstTerm25) { worstTerm25 = Math.abs(d); badTerm25 = name; }
}

ok('2024 二十四节气全部命中（±2 分钟）', worstTerm <= 2,
  `最大偏差 ${worstTerm.toFixed(1)} 分（${badTerm}）`);
ok('2025 二十四节气全部命中（±2 分钟）', worstTerm25 <= 2,
  `最大偏差 ${worstTerm25.toFixed(1)} 分（${badTerm25}）`);

// 逐条列出，便于看是哪几个偏得多
const termDeltas = TERMS_2024.map(([name, iso]) => {
  const t = findTerm(2024, name);
  return { name, d: t ? (t.jd - toJd(iso)) * 1440 : NaN };
});
ok('2024 每个节气偏差都在 ±2 分钟内', termDeltas.every((x) => Math.abs(x.d) <= 2),
  `最大 ${Math.max(...termDeltas.map((x) => Math.abs(x.d))).toFixed(2)} 分`);

// ── 2024 朔（北京时间，NAOJ 换算） ──
const NEW_MOONS = [
  '2024-01-11T19:57', '2024-02-10T06:59', '2024-03-10T17:00', '2024-04-09T02:21',
  '2024-05-08T11:22', '2024-06-06T20:38', '2024-07-06T06:57', '2024-08-04T19:13',
  '2024-09-03T09:56', '2024-10-03T02:49', '2024-11-01T20:47', '2024-12-01T14:21',
  '2024-12-31T06:27',
];

const SYNODIC = 29.530588853;
let worstMoon = 0;
for (const iso of NEW_MOONS) {
  const target = toJd(iso);
  const k = Math.floor((target - 2451550.1) / SYNODIC);
  let best = null;
  for (let d = k - 2; d <= k + 2; d++) {
    const jd = newMoonJd(d);
    if (!best || Math.abs(jd - target) < Math.abs(best - target)) best = jd;
  }
  worstMoon = Math.max(worstMoon, Math.abs((best - target) * 1440));
}
ok('2024 十三次朔全部命中（±3 分钟）', worstMoon <= 3, `最大偏差 ${worstMoon.toFixed(1)} 分`);

if (fail > 0) { console.log(`FAIL ${fail} 项`); process.exit(1); }
console.log(`\n对拍 ${pass} 项全部通过`);
console.log(`  节气最大偏差 ${worstTerm.toFixed(1)} 分；朔最大偏差 ${worstMoon.toFixed(1)} 分`);
console.log(`  数据源 NAOJ 令和6年暦要項（JST 已换算为北京时间）`);

