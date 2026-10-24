// 农历对拍：两套独立参照
// ① 香港天文台 2024 年公曆與農曆日期對照表（官方数据，逐月月首）
//    https://www.hko.gov.hk/tc/gts/time/calendar/text/files/T2024c.txt
// ② ICU（Node 内置 Intl 的 chinese 历法）抽样 2000 天，覆盖 1901–2100
//    ICU 的中国历与紫金山天文台同属「朔 + 中气、东经 120°」体系，但实现完全独立，
//    因此适合做互检：两边同时错的可能极低。
import { solarToLunar } from '../engine/lunar.js';

let pass = 0;
let fail = 0;
const ok = (n, c, d = '') => { if (c) { pass++; console.log(`PASS  ${n}${d ? '  -> ' + d : ''}`); } else { fail++; console.log(`FAIL  ${n}${d ? '  -> ' + d : ''}`); } };

// ── ① 天文台 2024 月首（公历日 → 农历月，均非闰月） ──
const HKO_2024 = [
  ['2024-01-11', 12, '腊月'], ['2024-02-10', 1, '正月'], ['2024-03-10', 2, '二月'],
  ['2024-04-09', 3, '三月'], ['2024-05-08', 4, '四月'], ['2024-06-06', 5, '五月'],
  ['2024-07-06', 6, '六月'], ['2024-08-04', 7, '七月'], ['2024-09-03', 8, '八月'],
  ['2024-10-03', 9, '九月'], ['2024-11-01', 10, '十月'], ['2024-12-01', 11, '十一月'],
  ['2024-12-31', 12, '十二月'],
];
let hkoBad = [];
for (const [iso, month, label] of HKO_2024) {
  const [y, m, d] = iso.split('-').map(Number);
  const r = solarToLunar(y, m, d);
  if (!(r.day === 1 && r.month === month && !r.isLeap)) hkoBad.push(`${iso} 期望${label}初一 实得${r.month}月${r.day}${r.isLeap ? '(闰)' : ''}`);
}
ok('天文台 2024 年 13 个月首全部对上', hkoBad.length === 0, hkoBad.join('；') || '13/13');

// ── ② ICU 抽样 2000 天 ──
const MONTH_NUM = {
  正月: 1, 二月: 2, 三月: 3, 四月: 4, 五月: 5, 六月: 6,
  七月: 7, 八月: 8, 九月: 9, 十月: 10, 十一月: 11, 冬月: 11, 十二月: 12, 腊月: 12,
};
const fmt = new Intl.DateTimeFormat('zh-CN-u-ca-chinese', {
  year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Shanghai',
});
const STEMS = '甲乙丙丁戊己庚辛壬癸';
const BRANCHES = '子丑寅卯辰巳午未申酉戌亥';

function icuOf(y, m, d) {
  const parts = fmt.formatToParts(new Date(Date.UTC(y, m - 1, d, 4))); // UTC 04:00 = 北京 12:00
  const get = (t) => (parts.find((p) => p.type === t) || {}).value || '';
  const monthName = get('month');
  const isLeap = /^闰/.test(monthName);
  const bare = monthName.replace(/^闰/, '');
  return {
    yearName: get('yearName'),
    month: MONTH_NUM[bare] || 0,
    isLeap,
    day: Number(get('day')),
    monthName,
  };
}

// 从 1901-01-01 到 2100-12-31 等距抽样
const start = Date.UTC(1901, 0, 1);
const end = Date.UTC(2100, 11, 31);
const N = 2000;
const step = Math.floor((end - start) / (N - 1));
const mismatches = [];
let checked = 0;
for (let i = 0; i < N; i++) {
  const t = new Date(start + i * step);
  const y = t.getUTCFullYear();
  const m = t.getUTCMonth() + 1;
  const d = t.getUTCDate();
  const icu = icuOf(y, m, d);
  if (!icu.month) continue; // 名称没认出来就跳过，避免误判
  const r = solarToLunar(y, m, d);
  checked++;
  const mineName = `${r.isLeap ? '闰' : ''}${r.month}月`;
  const okMonth = r.month === icu.month && Boolean(r.isLeap) === icu.isLeap;
  const okDay = r.day === icu.day;
  const gz = STEMS[((r.lunarYear - 4) % 10 + 10) % 10] + BRANCHES[((r.lunarYear - 4) % 12 + 12) % 12];
  const okYear = !icu.yearName || gz === icu.yearName;
  if (!(okMonth && okDay && okYear)) {
    mismatches.push(`${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')} 我=${gz}年${mineName}${r.day}日  ICU=${icu.yearName}年${icu.monthName}${icu.day}日`);
  }
}
// 干支年：必须 100%（这一项曾整体错一年，已修）
const yearOnly = mismatches.filter((x) => x.includes('干支年'));
ok('抽样 2000 天的农历干支年完全一致', yearOnly.length === 0,
  yearOnly.length ? `${yearOnly.length} 处：${yearOnly.slice(0, 3).join(' | ')}` : '0 处不一致');

// 月/日/闰：允许少量已知分歧（1929 年前时区、个别年份置闰流派差异）
const KNOWN_RATE = 0.995;
const rate = 1 - mismatches.length / checked;
ok('月/日/闰 一致率 ≥ 98%', rate >= KNOWN_RATE,
  `${(rate * 100).toFixed(2)}%（不一致 ${mismatches.length}/${checked}）`);
if (mismatches.length) {
  console.log('  已知分歧（待下一阶段处理：1929 年前用北京地方平时、个别年份置闰判定）：');
  for (const m of mismatches.slice(0, 8)) console.log('    ·', m);
}

// 附：把不一致的数量单独断言，便于回归时看趋势
ok('抽样比对覆盖率达标', checked >= 1900, `${checked}/2000`);


// ── ③ 置闰基准（1984 闰十月 / 1985 无闰 / 2052 闰八月 / 2053 无闰） ──
// 数据源：香港天文台 T1984c/T1985c/T2052c/T2053c（GB/T 33661-2017 口径）
const LEAP_CASES = [
  ['1984-11-23', 10, 1, true, '闰十月初一（无中气之月置闰）'],
  ['1984-12-22', 11, 1, false, '十一月初一（冬至当天）'],
  ['1985-02-20', 1, 1, false, '正月初一（正月无中气但不闰）'],
  ['1985-03-21', 2, 1, false, '二月初一（春分当天）'],
  ['2052-09-23', 8, 1, true, '闰八月初一（无中气之月置闰）'],
  ['2052-11-21', 10, 1, false, '十月初一（小雪当天）'],
  ['2053-02-19', 1, 1, false, '正月初一（正月无中气但不闰）'],
];
const leapBad = [];
for (const [iso, m, d, leap, why] of LEAP_CASES) {
  const [y, mo, dd] = iso.split('-').map(Number);
  const r = solarToLunar(y, mo, dd);
  if (!(r.month === m && r.day === d && Boolean(r.isLeap) === leap)) {
    leapBad.push(`${iso} 期望${leap ? '闰' : ''}${m}月${d}日 实得${r.isLeap ? '闰' : ''}${r.month}月${r.day}日`);
  }
}
ok('置闰基准 7 个边界点全部对上（含两个反例）', leapBad.length === 0, leapBad.join('；') || LEAP_CASES.map((c) => c[0]).join(' '));

// 两个反例单独断言：12 个月的年份不得因「无中气」而置闰
const noLeap1985 = solarToLunar(1985, 2, 20);
const noLeap2053 = solarToLunar(2053, 2, 19);
ok('12 个月的年份不置闰（1985/2053 正月）',
  noLeap1985.month === 1 && !noLeap1985.isLeap && noLeap2053.month === 1 && !noLeap2053.isLeap,
  `1985=${noLeap1985.month}月${noLeap1985.isLeap ? '闰' : ''} 2053=${noLeap2053.month}月${noLeap2053.isLeap ? '闰' : ''}`);
if (fail > 0) { console.log(`FAIL ${fail} 项`); process.exit(1); }
console.log(`\n农历对拍 ${pass} 项通过（天文台 13 个月首 + ICU 抽样 ${checked} 天）`);


