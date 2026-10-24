// 农历（定朔）：朔望月计算 + 冬至所在月为十一月 + 无中气置闰
import {
  toJDN, jdToParts, termInstantJd, deltaTSeconds,
} from './calendar.js';

const SYNODIC = 29.530588861;
const NEW_MOON_EPOCH = 2451550.09766;
const D2R = Math.PI / 180;

/**
 * 第 k 个朔的儒略日（北京时间）。
 * Meeus《天文算法》第 49 章主要周期项，实测与公开朔时刻相差约 1 分钟。
 */
export function newMoonJd(k) {
  const T = k / 1236.85;
  const jde = NEW_MOON_EPOCH + SYNODIC * k
    + 0.00015437 * T * T
    - 0.000000150 * T * T * T
    + 0.00000000073 * T * T * T * T;

  const E = 1 - 0.002516 * T - 0.0000074 * T * T;
  const M = (2.5534 + 29.10535670 * k - 0.0000014 * T * T - 0.00000011 * T * T * T) * D2R;
  const Mp = (201.5643 + 385.81693528 * k + 0.0107582 * T * T + 0.00001238 * T * T * T
    - 0.000000058 * T * T * T * T) * D2R;
  const F = (160.7108 + 390.67050284 * k - 0.0016118 * T * T - 0.00000227 * T * T * T
    + 0.000000011 * T * T * T * T) * D2R;
  const Om = (124.7746 - 1.56375588 * k + 0.0020672 * T * T + 0.00000215 * T * T * T) * D2R;

  const corr =
    -0.40720 * Math.sin(Mp)
    + 0.17241 * E * Math.sin(M)
    + 0.01608 * Math.sin(2 * Mp)
    + 0.01039 * Math.sin(2 * F)
    + 0.00739 * E * Math.sin(Mp - M)
    - 0.00514 * E * Math.sin(Mp + M)
    + 0.00208 * E * E * Math.sin(2 * M)
    - 0.00111 * Math.sin(Mp - 2 * F)
    - 0.00057 * Math.sin(Mp + 2 * F)
    + 0.00056 * E * Math.sin(2 * Mp + M)
    - 0.00042 * Math.sin(3 * Mp)
    + 0.00042 * E * Math.sin(M + 2 * F)
    + 0.00038 * E * Math.sin(M - 2 * F)
    - 0.00024 * E * Math.sin(2 * Mp - M)
    - 0.00017 * Math.sin(Om)
    - 0.00007 * Math.sin(Mp + 2 * M)
    + 0.00004 * Math.sin(2 * Mp - 2 * F)
    + 0.00004 * Math.sin(3 * M)
    + 0.00003 * Math.sin(Mp + M - 2 * F)
    + 0.00003 * Math.sin(2 * Mp + 2 * F)
    - 0.00003 * Math.sin(Mp + M + 2 * F)
    + 0.00003 * Math.sin(Mp - M + 2 * F)
    - 0.00002 * Math.sin(Mp - M - 2 * F)
    - 0.00002 * Math.sin(3 * Mp + M)
    + 0.00002 * Math.sin(4 * Mp);

  // TT -> UT -> 北京时间
  const jdUT = jde + corr - deltaTSeconds(2000 + T * 100) / 86400;
  return jdUT + (jdUT < CUTOVER_JD ? OFFSET_BEIJING_LOCAL : OFFSET_MODERN);
}

/** 某时刻所在的「日」：返回当日 0 时的 JDN */
export function dayNumberOf(jd) {
  return Math.floor(jd + 0.5);
}

// 1929 年元旦之前，中国历书按「北京地方平时」（116.4E，UTC+7.7611）推算朔与中气；
// 之后改用东经 120 度标准时（UTC+8）。这一天差会让朔日跨零点，进而整月错位。
const OFFSET_MODERN = 8 / 24;
const OFFSET_BEIJING_LOCAL = 7.7611 / 24;
const CUTOVER_JD = 2425613.5; // 1929-01-01 00:00 UT

/** 把 calendar 给出的「东八区轴」时刻换成当时的地方轴 */
function toHistoricalLocal(jdBeijing) {
  const jdUT = jdBeijing - OFFSET_MODERN;
  return jdUT + (jdUT < CUTOVER_JD ? OFFSET_BEIJING_LOCAL : OFFSET_MODERN);
}

function kNear(jdDay) {
  return Math.round((jdDay + 0.5 - NEW_MOON_EPOCH) / SYNODIC);
}

/** 判断 (startDay, endDay) 内是否含中气（气 = 奇数索引） */
function hasZhongQi(year, startDay, endDay) {
  for (let y = year - 1; y <= year + 1; y++) {
    for (let i = 1; i < 24; i += 2) {
      const jdLocal = toHistoricalLocal(termInstantJd(y, i));
      const d = dayNumberOf(jdLocal);
      if (d >= startDay && d < endDay) return { index: i, jd: jdLocal };
    }
  }
  return null;
}

/**
 * 公历 -> 农历
 * 规则：冬至所在月为十一月；其后逐月编号，遇无中气之月置闰。
 */
export function solarToLunar(year, month, day) {
  const targetDay = toJDN(year, month, day);

  const wsDayThisYear = dayNumberOf(toHistoricalLocal(termInstantJd(year, 23)));
  const wsYear = targetDay < wsDayThisYear ? year - 1 : year;
  const wsDay = dayNumberOf(toHistoricalLocal(termInstantJd(wsYear, 23)));

  // 十一月朔：日序不晚于冬至的最后一个朔日
  let k = kNear(wsDay);
  while (dayNumberOf(newMoonJd(k)) > wsDay) k--;
  while (dayNumberOf(newMoonJd(k + 1)) <= wsDay) k++;

  // ── 置闰前提（国标口径）──
  // 只有「两个冬至月之间有 13 个朔望月」才需要置闰，且取其中第一个无中气的月。
  // 若只有 12 个月，即使某月无中气也不闰（1985 正月、2053 正月就是这种反例）。
  const nextWsDay = dayNumberOf(toHistoricalLocal(termInstantJd(wsYear + 1, 23)));
  let kNext = k;
  while (dayNumberOf(newMoonJd(kNext + 1)) <= nextWsDay) kNext++;
  const cycleMonths = kNext - k;
  let leapIdx = -1;
  if (cycleMonths === 13) {
    for (let i = 1; i <= cycleMonths; i++) {
      const s = dayNumberOf(newMoonJd(k + i - 1));
      const e = dayNumberOf(newMoonJd(k + i));
      if (!hasZhongQi(wsYear, s, e)) { leapIdx = i; break; }
    }
  }

  let num = 11;
  // 农历年以正月初一为界：月序越过「正」之后，岁次进一位
  let wrapped = false;
  let cursorStart = dayNumberOf(newMoonJd(k));

  for (let i = 1; i <= 15; i++) {
    const startDay = dayNumberOf(newMoonJd(k + i - 1));
    const endDay = dayNumberOf(newMoonJd(k + i));
    const zq = hasZhongQi(wsYear, startDay, endDay);
    const isLeap = i === leapIdx;

    if (targetDay >= startDay && targetDay < endDay) {
      const sp = jdToParts(newMoonJd(k + i - 1));
      // 闰月沿用上一个月的月号
      const displayNum = isLeap ? ((num + 10) % 12) + 1 : num;
      return {
        year: wsYear,
        // 农历年号：十一、十二月属上一农历年，正月至十月属 wsYear + 1
        lunarYear: wrapped ? wsYear + 1 : wsYear,
        month: displayNum,
        day: targetDay - startDay + 1,
        isLeap,
        monthStart: `${sp.year}-${String(sp.month).padStart(2, '0')}-${String(sp.day).padStart(2, '0')}`,
        hasZhongQi: Boolean(zq),
      };
    }

    if (isLeap) { /* 闰月不推进月号 */ }
    else {
      num = (num % 12) + 1;
      if (num === 1) wrapped = true; // 已越过正月初一
    }
    cursorStart = endDay;
  }

  throw new Error(`农历换算失败：${year}-${month}-${day}`);
}

/** 农历月首的儒略日（供内部校验） */
export function monthStartJd(year, month, day) {
  return toJDN(year, month, day);
}

export { SYNODIC };





