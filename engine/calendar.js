import { earthL } from './vsop-earth.js';
import { createLru } from './lru.js';
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

// 1929 年元旦之前，中国历书按「北京地方平时」（116.4°E，UTC+7.7611）推算朔与中气；
// 之后改用东经 120° 标准时（UTC+8）。这 14 分钟会让交节/合朔跨零点，进而整月错位，
// 所以节气与农历必须共用同一套换算，不能各写一份。
export const OFFSET_MODERN = 8 / 24;
export const OFFSET_BEIJING_LOCAL = 7.7611 / 24;
// 切点 = 1929-01-01 00:00（东八区）对应的 UT 儒略日 = 1928-12-31 16:00 UT。
// 这里用的是真儒略日轴：partsToJd(1929,1,1) = 2425612.5，减 8/24 即 2425612.1667。
export const CUTOVER_JD = 2425612 + 4 / 24; // 2425612.1667

/** 某时刻（UT 轴）应当使用的本地时区偏移量 */
export function localOffsetFor(jdUt) {
  return jdUt < CUTOVER_JD ? OFFSET_BEIJING_LOCAL : OFFSET_MODERN;
}

/**
 * 第 index 个节气（0 = 小寒）在指定年份的时刻，返回「当时本地时间轴」的儒略日。
 * index 为偶数的是「节」（定月柱），奇数的是「气」。
 *
 * 结果按 (year, index) 缓存：农历换算一次要问几百次中气（每个候选月都要判有无中气），
 * 而 VSOP87 的 earthL 是整个引擎最贵的一段——不缓存时紫微盘 10ms 里有 8ms 花在这里。
 */
const TERM_INSTANT_CACHE = createLru({ max: 4096, name: 'termInstant' });

/**
 * 牛顿迭代收敛容差（度）。
 * 1e-7° ≈ 0.002 秒、1e-5° ≈ 0.02 秒——输出只精确到分钟，取 1e-5 即可：
 * 实测 24 节气总迭代数 131 → 105（-20%），节气时刻最大差 0.02 秒。
 */
const TERM_CONVERGE_DEG = 1e-5;

// 同一节气在相邻年份的时刻相差约一个回归年（365.2422 日）。
// 把它当作下一年同一节气的牛顿初值，可从 5.5 次迭代降到 2~3 次——
// 实测「第二次以后取同一节气」的成本约为首次的 45%。
const TERM_GUESS_CACHE = new Map(); // index -> 上次解出的本地时间轴 jd
const TROPICAL_YEAR = 365.2422;

function computeTermInstantJd(year, index) {
  const target = termLongitude(index);
  const anchor = toJDN(year, 1, 5) - 0.5 + index * 15.2184;
  const prev = TERM_GUESS_CACHE.get(index);
  // 初值取「上一年同一节气 + 回归年」与几何锚点中更接近的一个
  let jd = prev !== undefined ? prev + TROPICAL_YEAR : anchor;
  if (Math.abs(jd - anchor) > 20) jd = anchor; // 偏离过大说明缓存跨了多年，退回锚点
  for (let n = 0; n < 12; n++) {
    let diff = target - sunLongitude(jd);
    diff = ((((diff + 180) % 360) + 360) % 360) - 180;
    jd += diff / 0.98564736;
    if (Math.abs(diff) < TERM_CONVERGE_DEG) break;
  }
  TERM_GUESS_CACHE.set(index, jd);
  // TT -> UT -> 当时本地时间轴（1929 前是北京地方平时，之后是东八区）
  const jdUt = jd - deltaTSeconds(year) / 86400;
  return jdUt + localOffsetFor(jdUt);
}

export function termInstantJd(year, index) {
  const key = year * 24 + index;
  const hit = TERM_INSTANT_CACHE.get(key);
  if (hit !== undefined) return hit;
  const jd = computeTermInstantJd(year, index);
  TERM_INSTANT_CACHE.set(key, jd);
  return jd;
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

// 一次排盘要算 72 个节气（三年窗口），每次十多轮牛顿迭代 × VSOP87 105 项。
// 同一年的盘经常连着排（面板切 tab、合盘两侧），按年缓存能把这块成本降到常数级。
const TERM_WINDOW_CACHE = createLru({ max: 8, name: 'termWindow' });
// 单年 24 节气也单独缓存：相邻年份的窗口高度重叠（year±1），
// 只按窗口缓存会让 1996 与 1997 各算一遍 1996 的 24 个节气。
const TERM_YEAR_CACHE = createLru({ max: 32, name: 'termYear' });
const ALL_TERM_INDEXES = Array.from({ length: 24 }, (_, i) => i);
const JIE_TERM_INDEXES = ALL_TERM_INDEXES.filter((i) => i % 2 === 0); // 节：定月柱用，气不参与

/**
 * 单年节气（按 jd 升序），结果只读，调用方不得修改
 * @param {number} year
 * @param {boolean} jieOnly 只要十二「节」——八字定月柱、定大运起运只用到节，
 *   算全套 24 个等于替用不上的「气」白付一半 VSOP 求值成本
 */
function termYearList(year, jieOnly) {
  const key = jieOnly ? `${year}|jie` : `${year}|all`;
  const hit = TERM_YEAR_CACHE.get(key);
  if (hit) return hit;
  // 若该年全年 24 节气已在缓存里（紫微/奇门会算全年），只要节时直接过滤复用，
  // 避免「八字先算节、紫微再算气」时两边各建一份、缓存互不命中。
  if (jieOnly) {
    const full = TERM_YEAR_CACHE.get(`${year}|all`);
    if (full) {
      const jie = full.filter((t) => t.index % 2 === 0);
      TERM_YEAR_CACHE.set(key, jie);
      return jie;
    }
  }
  const list = [];
  for (const i of (jieOnly ? JIE_TERM_INDEXES : ALL_TERM_INDEXES)) {
    list.push({ year, index: i, name: TERM_NAMES[i], jd: termInstantJd(year, i) });
  }
  list.sort((a, b) => a.jd - b.jd);
  TERM_YEAR_CACHE.set(key, list);
  return list;
}

/**
 * 列出 [year-1, year+1] 三年的节气，按时间升序（结果按年缓存，调用方不要修改返回值）
 * @param {number} year
 * @param {{jieOnly?: boolean}} [opts] jieOnly=true 时只返回十二节（default：false，含气）
 */
export function termWindow(year, opts = {}) {
  const jieOnly = opts.jieOnly === true;
  const cacheKey = jieOnly ? `${year}|jie` : year;
  const cached = TERM_WINDOW_CACHE.get(cacheKey);
  if (cached) return cached;
  const list = [
    ...termYearList(year - 1, jieOnly),
    ...termYearList(year, jieOnly),
    ...termYearList(year + 1, jieOnly),
  ];
  list.sort((a, b) => a.jd - b.jd);
  TERM_WINDOW_CACHE.set(cacheKey, list);
  return list;
}

/**
 * 由任一干支求旬空两支（全库唯一实现）。
 * 六十甲子按旬分六组，空亡即旬首所辖十支之外的两支。
 * @param {string} ganzhi 两字干支，如 '丙申'
 * @returns {string[]} 两个空亡地支，如 ['辰','巳']；非干支返回 []
 */
export function xunKongOf(ganzhi) {
  if (typeof ganzhi !== 'string' || ganzhi.length < 2) return [];
  const s = STEMS.indexOf(ganzhi[0]);
  const b = BRANCHES.indexOf(ganzhi[1]);
  if (s < 0 || b < 0) return [];
  const idx = sexagenaryIndex(s, b);
  if (idx < 0) return [];
  const head = Math.floor(idx / 10) * 10; // 旬首序号：甲子=0、甲戌=10…
  return [BRANCHES[(head + 10) % 12], BRANCHES[(head + 11) % 12]];
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

/** 缓存命中率快照：DSH_METRICS=1 时由 renderText 打印，便于判断缓存是否真的有用 */
export function cacheMetrics() {
  return [TERM_INSTANT_CACHE.stats(), TERM_YEAR_CACHE.stats(), TERM_WINDOW_CACHE.stats()];
}
