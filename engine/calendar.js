import { earthL } from './vsop-earth.js';
// 历法底座：儒略日、干支、二十四节气、真太阳时
// 全部为纯函数，不依赖 DOM / Node API，Host 与 Client 可共用。

export const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
export const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

export const TERM_NAMES = [
  '小寒', '大寒', '立春', '雨水', '惊蛰', '春分', '清明', '谷雨',
  '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋', '处暑',
  '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至',
];

// 二十四节气对应的太阳视黄经（0 号为小寒 285°）
export function termLongitude(index) {
  return (285 + 15 * index) % 360;
}

/** 公历 -> 儒略日数（当日正午的整数 JDN） */
export function toJDN(year, month, day) {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return (
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

/** 儒略日数 -> 公历 */
export function fromJDN(jdn) {
  const a = jdn + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor((146097 * b) / 4);
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  return {
    year: 100 * b + d - 4800 + Math.floor(m / 10),
    month: m + 3 - 12 * Math.floor(m / 10),
    day: e - Math.floor((153 * m + 2) / 5) + 1,
  };
}

/** 由天干/地支序号求六十甲子序号（0 = 甲子），阴阳不配返回 -1 */
export function sexagenaryIndex(stemIdx, branchIdx) {
  for (let i = 0; i < 60; i++) {
    if (i % 10 === stemIdx && i % 12 === branchIdx) return i;
  }
  return -1;
}

export function ganzhiName(index) {
  const i = ((index % 60) + 60) % 60;
  return {
    index: i,
    stem: STEMS[i % 10],
    branch: BRANCHES[i % 12],
    name: STEMS[i % 10] + BRANCHES[i % 12],
  };
}

/** 日柱干支序号。基准：1900-01-31 甲辰旬外推，(JDN + 49) % 60 = 0 即甲子日 */
export function dayGanzhiIndex(jdn) {
  return (((jdn + 49) % 60) + 60) % 60;
}

/**
 * 太阳视黄经（度）。
 * 黄经本体改用 VSOP87B 截断级数（105 项），再把地心黄经转成视黄经：
 *   λ = Θ + FK5修正 + 章动Δψ + 光行差
 * 与 NAOJ 历要项对拍：2024/2025 共 48 个节气，偏差从原来的最多 13.5 分钟降到 1 分钟内。
 */
export function sunLongitude(jd) {
  const d = jd - 2451545.0;
  const T = d / 36525;
  const Tv = d / 365250; // VSOP87 的时间参量单位是「儒略千年」，不是世纪

  // 1) 地球日心黄经 → 太阳地心黄经
  let theta = (earthL(Tv) * 180) / Math.PI + 180;
  theta = ((theta % 360) + 360) % 360;

  // 2) 岁差：VSOP87B 的黄经是 J2000 参考系，必须先推到当日平春分点
  //    （2024 年约 0.335°，相当于 8 小时，漏掉会让整个节气表错开）
  const prec = (5029.0966 * T + 1.11113 * T * T - 0.000006 * T * T * T) / 3600;
  theta += prec;

  // 3) FK5 系统修正（Meeus 25.9）
  theta -= 0.09033 / 3600;

  // 3) 章动（Meeus 22，取四项主项，精度约 0.5″）
  const om = ((125.04452 - 1934.136261 * T) * Math.PI) / 180;
  const ls = ((280.4665 + 36000.7698 * T) * Math.PI) / 180;
  const lm = ((218.3165 + 481267.8813 * T) * Math.PI) / 180;
  const dPsi = (-17.2 * Math.sin(om) - 1.32 * Math.sin(2 * ls) - 0.23 * Math.sin(2 * lm) + 0.21 * Math.sin(2 * om)) / 3600;
  theta += dPsi;

  // 4) 光行差：-20.4898″ / R；R 只需三位有效数字，沿用低精度日地距离即可
  const m = ((357.52911 + 35999.05029 * T - 0.0001537 * T * T) * Math.PI) / 180;
  const e = 0.016708634 - 0.000042037 * T - 0.0000001267 * T * T;
  const R = (1.000001018 * (1 - e * e)) / (1 + e * Math.cos(m + (1.914602 - 0.004817 * T) * (Math.PI / 180) * Math.sin(m)));
  theta -= 20.4898 / 3600 / (R || 1);

  return ((theta % 360) + 360) % 360;
}

/** ΔT（TT - UT，秒）。分段线性近似，误差 < 2s，对分钟级排盘足够 */
export function deltaTSeconds(year) {
  const knots = [
    [1900, -2.8], [1920, 21.2], [1940, 24.3], [1950, 29.1], [1960, 33.2],
    [1970, 40.2], [1980, 50.5], [1990, 56.9], [2000, 63.8], [2010, 66.1],
    [2020, 69.4], [2030, 72.0], [2050, 80.0], [2100, 110.0],
  ];
  if (year <= knots[0][0]) return knots[0][1];
  for (let i = 1; i < knots.length; i++) {
    if (year <= knots[i][0]) {
      const [y0, v0] = knots[i - 1];
      const [y1, v1] = knots[i];
      return v0 + ((v1 - v0) * (year - y0)) / (y1 - y0);
    }
  }
  return knots[knots.length - 1][1];
}

/**
 * 第 index 个节气（0 = 小寒）在指定年份的时刻，返回北京时间儒略日。
 * index 为偶数的是「节」（定月柱），奇数的是「气」。
 */
export function termInstantJd(year, index) {
  const target = termLongitude(index);
  const anchor = toJDN(year, 1, 5) - 0.5 + index * 15.2184;
  let jd = anchor;
  for (let n = 0; n < 12; n++) {
    let diff = target - sunLongitude(jd);
    diff = ((((diff + 180) % 360) + 360) % 360) - 180;
    jd += diff / 0.98564736;
    if (Math.abs(diff) < 1e-7) break;
  }
  // TT -> UT -> 本地时间轴（求解轴是 UT，展示轴是东八区）
  return jd - deltaTSeconds(year) / 86400 + 8 / 24;
}

/** 儒略日（本地时间轴）拆成日期与时刻 */
export function jdToParts(jdLocal) {
  const jdn = Math.floor(jdLocal + 0.5);
  const frac = jdLocal + 0.5 - jdn;
  const totalMinutes = Math.round(frac * 1440);
  const { year, month, day } = fromJDN(jdn);
  return {
    year,
    month,
    day,
    hour: Math.floor(totalMinutes / 60) % 24,
    minute: totalMinutes % 60,
  };
}

export function partsToJd({ year, month, day, hour = 0, minute = 0 }) {
  return toJDN(year, month, day) - 0.5 + (hour * 60 + minute) / 1440;
}

/** 均时差（分钟）：真太阳时 = 平太阳时 + 经度差 + 均时差 */
export function equationOfTime(year, month, day) {
  const n = toJDN(year, month, day) - toJDN(year, 1, 1) + 1;
  const B = (2 * Math.PI * (n - 81)) / 364;
  return 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
}

/** 列出 [year-1, year+1] 三年的节气，按时间升序 */
export function termWindow(year) {
  const list = [];
  for (let y = year - 1; y <= year + 1; y++) {
    for (let i = 0; i < 24; i++) {
      list.push({ year: y, index: i, name: TERM_NAMES[i], jd: termInstantJd(y, i) });
    }
  }
  list.sort((a, b) => a.jd - b.jd);
  return list;
}

/** 找到 jd 之前（含）最近的一个「节」（偶数索引） */
export function previousJie(terms, jd) {
  let found = null;
  for (const t of terms) {
    if (t.index % 2 !== 0) continue;
    if (t.jd <= jd) found = t;
    else break;
  }
  return found;
}

/** 找到 jd 之后最近的一个「节」 */
export function nextJie(terms, jd) {
  for (const t of terms) {
    if (t.index % 2 !== 0) continue;
    if (t.jd > jd) return t;
  }
  return null;
}

export function formatJd(jd) {
  const p = jdToParts(jd);
  const pad = (n) => String(n).padStart(2, '0');
  return `${p.year}-${pad(p.month)}-${pad(p.day)} ${pad(p.hour)}:${pad(p.minute)}`;
}


