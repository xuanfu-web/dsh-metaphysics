// 袁天罡称骨：按农历年/月/日/时辰四柱骨重求和，给分档白话批语。
// 骨重表为通行本口径；批语是白话自撰（不冒充原版称骨歌诀原文）。
import { solarToLunar } from './lunar.js';
import { ganzhiName, toJDN, dayGanzhiIndex } from './calendar.js';
import { assertCivil } from './validate.js';
import { hourToBranch } from './almanac.js';

/** 六十甲子年骨重（单位：钱；索引 = (农历年 - 4) mod 60，0 = 甲子）。 */
export const YEAR_WEIGHT = [
  12, 9, 6, 7, 12, 5, 9, 8, 7, 8,
  15, 9, 16, 8, 8, 19, 12, 6, 8, 7,
  5, 15, 6, 16, 15, 7, 9, 12, 10, 7,
  15, 6, 5, 14, 14, 9, 7, 7, 9, 12,
  8, 7, 13, 5, 14, 5, 9, 17, 5, 7,
  12, 8, 8, 6, 19, 6, 8, 16, 10, 7,
];

/** 农历月骨重（正月…腊月）。 */
export const MONTH_WEIGHT = [6, 7, 18, 9, 5, 16, 9, 15, 18, 8, 9, 5];

/** 农历日骨重（初一…三十）。 */
export const DAY_WEIGHT = [
  5, 10, 8, 15, 16, 15, 8, 16, 8, 16,
  9, 17, 8, 17, 10, 8, 9, 18, 5, 15,
  10, 9, 8, 9, 15, 18, 7, 8, 16, 6,
];

/** 时辰骨重（按地支）。 */
export const HOUR_WEIGHT = { 子: 16, 丑: 6, 寅: 7, 卯: 10, 辰: 9, 巳: 16, 午: 10, 未: 8, 申: 8, 酉: 9, 戌: 6, 亥: 6 };

const LIANG = ['一', '二', '三', '四', '五', '六', '七'];
const QIAN = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
const MONTH_TEXT = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
const DAY_TENS = ['初', '十', '廿'];
const DAY_UNITS = ['十', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

/** 钱 → 「X两Y钱」（不足一两只写钱数）。 */
export function formatWeight(qian) {
  const liang = Math.floor(qian / 10);
  const rem = qian % 10;
  const liangPart = liang > 0 ? `${LIANG[liang - 1]}两` : '';
  const remPart = rem > 0 ? `${QIAN[rem - 1]}钱` : liang > 0 ? '整' : '零';
  return `${liangPart}${remPart}`;
}

/** 农历日序中文：初一…三十。 */
export function lunarDayText(day) {
  if (day === 10) return '初十';
  if (day === 20) return '二十';
  if (day === 30) return '三十';
  const ten = Math.floor(day / 10);
  const unit = day % 10;
  return `${DAY_TENS[ten]}${DAY_UNITS[unit]}`;
}

/** 农历月序中文。 */
export function lunarMonthText(month, isLeap = false) {
  return `${isLeap ? '闰' : ''}${MONTH_TEXT[month - 1] || month}月`;
}

/** 骨重分档（白话自撰）。 */
function bandVerdict(qian) {
  if (qian >= 55) return { band: '上上', text: '骨重沉实，根基深厚，一生多逢贵人，谋事易成；守正持重，福泽可久。' };
  if (qian >= 45) return { band: '上', text: '骨重充实，中年前后渐入佳境，事业家宅两旺；忌骄忌躁，善守即善成。' };
  if (qian >= 35) return { band: '中上', text: '骨重适中，先劳后逸，凭本事立身；中年转运之象，稳扎稳打自见分晓。' };
  if (qian >= 25) return { band: '中', text: '骨重平平，成败多靠自身经营；宜有一技傍身、广结善缘，勤则补拙。' };
  return { band: '中下', text: '骨重较轻，早年多磨，凡事宜稳不宜急；积跬步以至千里，晚景反可安宁。' };
}

/**
 * 称骨主函数。
 * @param {{ year:number, month:number, day:number, hour:number, minute?:number }} input
 *   一律按公历给生日（农历换算由引擎完成）；时辰必填——称骨四柱缺时辰不可算。
 */
export function buildChenggu(input) {
  assertCivil(input, '称骨');
  const { year, month, day, hour } = input;
  const minute = input.minute || 0;
  if (!Number.isInteger(hour) || hour < 0 || hour > 23) {
    throw new Error('称骨必须给时辰：hour 为 0–23 的整数（缺时辰四柱不齐，骨重无法求和）');
  }
  const lunar = solarToLunar(year, month, day);
  const lunarYear = lunar.lunarYear;
  const lunarMonth = lunar.month;
  const lunarDay = lunar.day;
  const yearGz = ganzhiName((((lunarYear - 4) % 60) + 60) % 60);
  const hourBranch = hourToBranch(hour, minute);

  const wYear = YEAR_WEIGHT[((lunarYear - 4) % 60 + 60) % 60];
  const wMonth = MONTH_WEIGHT[lunarMonth - 1];
  const wDay = DAY_WEIGHT[lunarDay - 1];
  const wHour = HOUR_WEIGHT[hourBranch];
  if ([wYear, wMonth, wDay, wHour].some((x) => typeof x !== 'number')) {
    throw new Error(`称骨表缺项：年${wYear} 月${wMonth} 日${wDay} 时${wHour}`);
  }
  const total = wYear + wMonth + wDay + wHour;
  const verdict = bandVerdict(total);
  const jdn = toJDN(year, month, day);

  return {
    system: 'chenggu',
    input: { solar: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`, hour, minute },
    lunar: {
      text: `农历${yearGz.name}年${lunarMonthText(lunarMonth, lunar.isLeap)}${lunarDayText(lunarDay)} ${hourBranch}时`,
      year: lunarYear,
      month: lunarMonth,
      day: lunarDay,
      isLeap: lunar.isLeap,
      hourBranch,
    },
    ganzhi: { year: yearGz.name, day: ganzhiName(dayGanzhiIndex(jdn)).name },
    weights: {
      year: { qian: wYear, label: `${yearGz.name}年 ${formatWeight(wYear)}` },
      month: { qian: wMonth, label: `农历${lunarMonthText(lunarMonth, lunar.isLeap)} ${formatWeight(wMonth)}` },
      day: { qian: wDay, label: `农历${lunarDayText(lunarDay)} ${formatWeight(wDay)}` },
      hour: { qian: wHour, label: `${hourBranch}时 ${formatWeight(wHour)}` },
    },
    total: { qian: total, label: formatWeight(total) },
    verdict,
    sources: [
      '骨重表：通行本袁天罡称骨（六十甲子年 / 十二月 / 三十日 / 十二时辰）',
      '批语：白话自撰，非原版称骨歌诀原文，可自行对照',
    ],
    disclaimer: '骨重为通行表口径；批语为白话解读，属民俗娱乐参考，不构成命运断言。',
  };
}
