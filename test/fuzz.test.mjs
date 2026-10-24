// 稳定性扫射：随机但可复现的输入，跑遍八个体系，确认不崩、不吐 NaN、摘要不空。
//
// 目的不是验算（那由 golden / 对拍测试负责），而是守住"任何合法输入都不能让排盘抛异常
// 或产出半截结果"这条底线——这类问题在真实对话里最难排查，因为模型会把它当成"没有这个盘"。
import { compute } from '../engine/index.js';
import { mulberry32 } from '../engine/random.js';
import { ok } from './_harness.mjs';

const rand = mulberry32(20261024);
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const int = (lo, hi) => lo + Math.floor(rand() * (hi - lo + 1));
const daysInMonth = (y, m) => (m === 2
  ? ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? 29 : 28)
  : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1]);

function randomBirth() {
  const year = int(1900, 2100);
  const month = int(1, 12);
  const day = int(1, daysInMonth(year, month));
  const hour = int(0, 23);
  const minute = int(0, 59);
  const pad = (n) => String(n).padStart(2, '0');
  return { datetime: `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}`, year };
}

/** 对一批输入做统一体检；返回失败样例 */
function sweep(label, cases, check) {
  const bad = [];
  for (const args of cases) {
    try {
      const r = compute(args);
      const text = JSON.stringify(r);
      if (!r || typeof r.summary !== 'string' || !r.summary.trim()) bad.push(`${label}: 摘要为空`);
      else if (/NaN|undefined|\[object Object\]/.test(r.summary)) bad.push(`${label}: 摘要含无效值 -> ${r.summary.slice(0, 60)}`);
      if (text.length > 500000) bad.push(`${label}: 结果过大 ${text.length}B`);
      if (typeof check === 'function') {
        const issue = check(r);
        if (issue) bad.push(`${label}: ${issue}`);
      }
    } catch (e) {
      bad.push(`${label}: 抛错 ${e && e.message}`);
    }
  }
  ok(`${label}（${cases.length} 例）`, bad.length === 0, bad.slice(0, 3).join(' ｜ '));
}

const N = 12;
const births = Array.from({ length: N }, randomBirth);
const genders = births.map(() => pick(['male', 'female']));

sweep('八字', births.map((b, i) => ({ system: 'bazi', datetime: b.datetime, gender: genders[i] })), (r) => (
  r.pillars && r.pillars.year && r.pillars.day ? '' : '缺四柱'
));

sweep('紫微', births.map((b, i) => ({ system: 'ziwei', datetime: b.datetime, gender: genders[i] })), (r) => (
  Array.isArray(r.palaces) && r.palaces.length === 12 ? '' : '宫位不是 12 个'
));

sweep('奇门', births.map((b) => ({ system: 'qimen', datetime: b.datetime })), (r) => (
  // 八宫 + 单独的中五宫（天禽寄坤二）
  r.palaces && r.palaces.length === 8 && r.centerPalace ? '' : '九宫结构不全'
));

sweep('大六壬', births.map((b) => ({ system: 'daliuren', datetime: b.datetime })), (r) => (
  r.sanChuan && r.sanChuan.chu && r.siKe && r.siKe.length === 4 ? '' : '三传/四课不全'
));

sweep('梅花（时间起卦）', births.map((b) => ({ system: 'meihua', mode: 'time', datetime: b.datetime })), (r) => (
  r.ben && r.bian ? '' : '缺本卦/变卦'
));

sweep('六爻（随机摇卦 + seed）', Array.from({ length: N }, (_, i) => ({ system: 'liuyao', seed: i + 1, question: `问题 ${i}` })), (r) => (
  r.ben && r.ben.lines && r.ben.lines.length === 6 ? '' : '本卦爻数不对'
));

sweep('塔罗', Array.from({ length: N }, (_, i) => ({ system: 'tarot', seed: i + 1, count: pick([1, 3, 5]) })), (r) => (
  Array.isArray(r.cards) && r.cards.length > 0 ? '' : '没有抽到牌'
));

sweep('合盘', births.slice(0, 6).map((b, i) => ({
  system: 'hepan',
  datetime: b.datetime,
  gender: genders[i],
  partner: { datetime: births[(i + 1) % births.length].datetime, gender: genders[(i + 1) % births.length] },
})), (r) => (r.a && r.b && r.score ? '' : '缺双方或评分'));

// 边界日期：可计算范围的两端与闰年边界
const BOUNDARY = [
  '1600-01-01T00:00', '2400-12-31T23:59', '1900-02-28T12:00', '2000-02-29T12:00',
  '1929-01-01T00:00', '1928-12-31T23:59',
];
sweep('边界日期·八字', BOUNDARY.map((datetime) => ({ system: 'bazi', datetime, gender: 'male' })));
sweep('边界日期·紫微', BOUNDARY.map((datetime) => ({ system: 'ziwei', datetime, gender: 'female' })));

// 参数矩阵：把各体系的开关组合都走一遍（真太阳时、晚子时、闰月口径、取局流派、牌阵张数）
sweep('参数矩阵', [
  { system: 'bazi', datetime: '1990-05-12T23:40', gender: 'male', address: '新疆喀什', trueSolar: false },
  { system: 'bazi', datetime: '1990-05-12T23:40', gender: 'female', longitude: 87.6, lateZi: false },
  { system: 'ziwei', datetime: '2020-05-23T09:00', gender: 'male', address: '安徽池州', leapAsNext: true },
  { system: 'ziwei', datetime: '1987-07-15T03:00', gender: 'female', address: '广东汕头', asOf: '2026-02-01T00:00' },
  { system: 'qimen', datetime: '2026-10-24T23:30', juMethod: 'chaibu' },
  { system: 'qimen', datetime: '2026-10-24T23:30', juMethod: 'chaoshen', lateZi: true },
  { system: 'qimen', datetime: '2026-10-24T23:30', juMethod: 'zhirun', lateZiHourMode: 'next-day' },
  { system: 'meihua', mode: 'number', upper: 17, lower: 29, changing: 3 },
  { system: 'meihua', mode: 'number', upper: 1, lower: 1 },
  { system: 'liuyao', lines: [6, 9, 6, 9, 6, 9], datetime: '2026-03-03T08:00', question: '六爻全动' },
  { system: 'tarot', count: 5, seed: 5, question: '带 emoji 的问题 🌙 与长句'.repeat(3) },
  { system: 'hepan', chart: 'ziwei', datetime: '1990-05-12T23:40', gender: 'male', address: '新疆喀什', partner: { datetime: '1992-03-03T10:00', gender: 'female', address: '黑龙江漠河' } },
]);

// 解析层：八体系都要能出内容（奇门是分节形态）
const withIt = [
  { system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male' },
  { system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male' },
  { system: 'qimen', datetime: '2026-10-24T11:43' },
  { system: 'daliuren', datetime: '2026-10-24T11:43' },
  { system: 'meihua', mode: 'time', datetime: '2026-10-24T11:43' },
  { system: 'liuyao', lines: [7, 8, 9, 6, 7, 8], question: '这件事能成吗' },
  { system: 'tarot', seed: 3, count: 3, question: '要不要接这份工作' },
];
sweep('解析层', withIt.map((a) => ({ ...a, withInterpret: true, question: '今年整体如何' })), (r) => {
  const it = r.interpret;
  if (!it) return '没有解析';
  if (it.system === 'qimen') return (it.sections || []).length ? '' : '奇门解析无分节';
  return (it.dimensions || []).length === 5 ? '' : `维度 ${(it.dimensions || []).length} 条`;
});

// 可复现：同参数两次结果必须字节级一致（随机体系用 seed 固定）
const same = [
  { system: 'tarot', seed: 99, count: 3 },
  { system: 'liuyao', seed: 7 },
  { system: 'liuyao', seed: 7, asOf: '2020-01-01T12:00' },
  { system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', asOf: '2020-01-01T00:00' },
  { system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male', asOf: '2020-01-01T00:00' },
];
for (const args of same) {
  const a = JSON.stringify(compute(args));
  const b = JSON.stringify(compute(args));
  ok(`${args.system} 可复现`, a === b, a === b ? '' : '两次结果不同');
}
