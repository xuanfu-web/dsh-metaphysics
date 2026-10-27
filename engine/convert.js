// 公农历互转（本地确定性，不依赖外部历法库）
//
// 两种方向：
//   · 公历 → 农历：直接查本地定朔历（engine/lunar.js），给出农历年月日、闰月标记、干支、生肖。
//   · 农历 → 公历：按目标农历年的「月首」序列反查（每月 29/30 天，闰月单独一轮），
//     逐月定位后再加日偏移；不做「节气月」换算，农历就是朔望月口径。
//
// 诚实边界：只处理 1900–2100 的本地历法覆盖范围（与 lunar.js 一致）；闰月必须显式给出，
// 不猜「第一个同名月」；农历日期越界（如小月三十）如实报错，不静默回退。
import { solarToLunar } from './lunar.js';
import { fromJDN, toJDN } from './calendar.js';
import { buildAlmanac } from './almanac.js';
import { assertCivil, daysInMonth } from './validate.js';

const WEEK = ['日', '一', '二', '三', '四', '五', '六'];
const MONTH_TEXT = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
const DAY_TENS = ['初', '十', '廿'];
const DAY_UNITS = ['十', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

function dayText(day) {
  if (day === 10) return '初十';
  if (day === 20) return '二十';
  if (day === 30) return '三十';
  return `${DAY_TENS[Math.floor(day / 10)]}${DAY_UNITS[day % 10]}`;
}

function lunarText(year, month, day, isLeap) {
  return `农历${year}年${isLeap ? '闰' : ''}${MONTH_TEXT[month - 1] || month}月${dayText(day)}`;
}

/** 找某个农历年的正月初一（公历 1/20–2/25 之间）。 */
function lunarNewYearJdn(lunarYear) {
  const from = toJDN(lunarYear, 1, 20);
  const to = toJDN(lunarYear, 2, 25);
  for (let jdn = from; jdn <= to; jdn++) {
    const p = fromJDN(jdn);
    const l = solarToLunar(p.year, p.month, p.day);
    if (l.lunarYear === lunarYear && l.month === 1 && l.day === 1) return jdn;
  }
  return null;
}

/** 某农历年的月首序列（含闰月）。 */
function lunarMonths(lunarYear) {
  const first = lunarNewYearJdn(lunarYear);
  if (first == null) return [];
  const out = [];
  let cur = first;
  for (let i = 0; i < 14; i++) {
    const p = fromJDN(cur);
    const l = solarToLunar(p.year, p.month, p.day);
    if (i > 0 && l.month === 1 && !l.isLeap) break;
    let next = null;
    for (let k = 29; k <= 31; k++) {
      const d = fromJDN(cur + k);
      const l2 = solarToLunar(d.year, d.month, d.day);
      if (l2.day === 1) { next = cur + k; break; }
    }
    if (next == null) break;
    out.push({ month: l.month, isLeap: l.isLeap, startJdn: cur, length: next - cur });
    cur = next;
  }
  return out;
}

/**
 * 公农历互转。
 * @param {{mode?:'solar2lunar'|'lunar2solar', year?:number, month?:number, day?:number,
 *   lunarYear?:number, lunarMonth?:number, lunarDay?:number, isLeapMonth?:boolean}} input
 */
export function buildConvert(input) {
  const mode = input.mode === 'lunar2solar' ? 'lunar2solar' : 'solar2lunar';
  let solar;
  let lunar;
  let note = null;
  if (mode === 'solar2lunar') {
    solar = { year: input.year, month: input.month, day: input.day };
    assertCivil(solar, '公农历转换');
    if (solar.day > daysInMonth(solar.year, solar.month)) {
      throw new Error(`非法日期：${solar.year} 年 ${solar.month} 月没有 ${solar.day} 日`);
    }
    lunar = solarToLunar(solar.year, solar.month, solar.day);
  } else {
    const y = Number(input.lunarYear);
    const m = Number(input.lunarMonth);
    const d = Number(input.lunarDay);
    if (![y, m, d].every(Number.isInteger)) throw new Error('农历转换需要 lunarYear / lunarMonth / lunarDay');
    if (m < 1 || m > 12) throw new Error('农历月份须在 1–12');
    const months = lunarMonths(y);
    if (!months.length) throw new Error(`农历 ${y} 年超出本地历法覆盖范围（1900–2100）`);
    const isLeap = input.isLeapMonth === true;
    const hit = months.find((x) => x.month === m && x.isLeap === isLeap);
    if (!hit) {
      const leapMonths = months.filter((x) => x.isLeap).map((x) => `闰${MONTH_TEXT[x.month - 1]}月`);
      throw new Error(`农历 ${y} 年没有${leapMonths.length ? `该月（该年闰月为 ${leapMonths.join('、')}）` : '闰月'}：${isLeap ? '请确认闰月标记' : '请确认月份'}`);
    }
    if (d < 1 || d > hit.length) throw new Error(`农历 ${y} 年${isLeap ? '闰' : ''}${MONTH_TEXT[m - 1]}月只有 ${hit.length} 天，没有 ${d} 日`);
    const p = fromJDN(hit.startJdn + d - 1);
    solar = { year: p.year, month: p.month, day: p.day };
    const check = solarToLunar(p.year, p.month, p.day);
    if (check.month !== m || check.day !== d || check.isLeap !== isLeap) {
      note = '反查结果与目标农历日不完全一致，已按本地历法实际月首回推';
    }
    lunar = check;
  }

  const a = buildAlmanac(solar);
  const jdn = toJDN(solar.year, solar.month, solar.day);
  const solarText = `${solar.year}-${String(solar.month).padStart(2, '0')}-${String(solar.day).padStart(2, '0')}`;
  return {
    system: 'convert',
    meta: {
      mode,
      solarDate: solarText,
      weekday: `星期${WEEK[(jdn + 1) % 7]}`,
      ...(note ? { note } : {}),
      scope: '公农历互转按本地定朔历（1900–2100）；农历闰月须显式指定，不自动猜同名月',
    },
    solar: { year: solar.year, month: solar.month, day: solar.day, text: solarText },
    lunar: {
      year: lunar.lunarYear,
      month: lunar.month,
      day: lunar.day,
      isLeap: lunar.isLeap,
      text: lunarText(lunar.lunarYear, lunar.month, lunar.day, lunar.isLeap),
    },
    ganzhi: {
      year: a.ganzhi.year,
      month: a.ganzhi.month,
      day: a.ganzhi.day,
      shengXiao: a.ganzhi.shengXiao,
      springYear: a.ganzhi.springYear,
    },
    sources: ['农历：本地定朔 + 节气黄经历法（engine/lunar.js）', '干支与生肖：与黄历同口径（年按立春界，另列春节界）'],
    disclaimer: '历法换算为确定性计算；民俗历法各版本在极少数日期（交节当日、闰月边界）存在日界差异，已注明口径。',
  };
}
