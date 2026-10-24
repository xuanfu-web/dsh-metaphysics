window.__ModuleLoader__.load({
  id: 'dsh-metaphysics',
  factory(require) {
    const React = (function () {
      try { return require('react'); } catch (e) { return globalThis.React; }
    })();
    if (!React) return { inject: [], apply() {} };
    const h = React.createElement;
    const __mods = {};
__mods['vsop-earth'] = (function () {
const L0 = [
  [1.75347045673,0,0],[0.03341656453,4.66925680415,6283.0758499914],[0.00034894275,4.62610242189,12566.1516999828],[0.00003417572,2.82886579754,3.523118349],
  [0.00003497056,2.74411783405,5753.3848848968],[0.00003135899,3.62767041756,77713.7714681205],[0.00002676218,4.41808345438,7860.4193924392],[0.00002342691,6.13516214446,3930.2096962196],
  [0.00001273165,2.03709657878,529.6909650946],[0.00001324294,0.74246341673,11506.7697697936],[0.00000901854,2.04505446477,26.2983197998],[0.00001199167,1.10962946234,1577.3435424478],
  [0.00000857223,3.50849152283,398.1490034082],[0.00000779786,1.17882681962,5223.6939198022],[0.0000099025,5.23268072088,5884.9268465832],[0.00000753141,2.53339052847,5507.5532386674],
  [0.00000505267,4.58292599973,18849.2275499742],[0.00000492392,4.20505711826,775.522611324],[0.00000356672,2.91954114478,0.0673103028],[0.00000284125,1.89869240932,796.2980068164],
  [0.00000242879,0.34481445893,5486.777843175],[0.00000317087,5.84901948512,11790.6290886588],[0.00000271112,0.31486255375,10977.078804699],[0.00000206217,4.80646631478,2544.3144198834],
  [0.00000205478,1.86953770281,5573.1428014331],[0.00000202318,2.45767790232,6069.7767545534],[0.00000126225,1.08295459501,20.7753954924],[0.00000155516,0.83306084617,213.299095438],
  [0.00000115132,0.64544911683,0.9803210682],[0.00000102851,0.63599845579,4694.0029547076],[0.00000101724,4.2667980198,7.1135470008],[9.9206e-7,6.20992926918,2146.1654164752],
  [0.00000132212,3.41118292683,2942.4634232916],[9.7607e-7,0.68101342359,155.4203994342],[8.5128e-7,1.29870764804,6275.9623029906],[7.4651e-7,1.755089133,5088.6288397668],
  [0.00000101895,0.97569280312,15720.8387848784],[8.4711e-7,3.67080093031,71430.69561812909],[7.3547e-7,4.67926633877,801.8209311238],[7.3874e-7,3.50319414955,3154.6870848956],
  [7.8757e-7,3.03697458703,12036.4607348882],[7.9637e-7,1.80791287082,17260.1546546904],[8.5803e-7,5.9832263126,161000.6857376741],[5.6963e-7,2.78430458592,6286.5989683404],
  [6.1148e-7,1.81839892984,7084.8967811152],[6.9627e-7,0.83297621398,9437.762934887],[5.6116e-7,4.38694865354,14143.4952424306],[6.2449e-7,3.97763912806,8827.3902698748],
  [5.1145e-7,0.28306832879,5856.4776591154],[5.5577e-7,3.47006059924,6279.5527316424],[4.1036e-7,5.36817592855,8429.2412664666],[5.1605e-7,1.33282739866,1748.016413067],
  [5.1992e-7,0.18914947184,12139.5535091068],[4.9e-7,0.48735014197,1194.4470102246],[3.92e-7,6.16833020996,10447.3878396044],[3.557e-7,1.775968892,6812.766815086],
  [3.677e-7,6.04133863162,10213.285546211],[3.6596e-7,2.56957481827,1059.3819301892],[3.3296e-7,0.59310278598,17789.845619785],[3.5954e-7,1.70875808777,2352.8661537718],
  [4.0938e-7,2.39850938714,19651.048481098],[3.0047e-7,2.73975124088,1349.8674096588],[3.0412e-7,0.44294464169,83996.84731811189],[2.3663e-7,0.48473622521,8031.0922630584],
  [2.3574e-7,2.06528133162,3340.6124266998],[2.1089e-7,4.14825468851,951.7184062506],[2.4738e-7,0.21484762138,3.5904286518],[2.5352e-7,3.16470891653,4690.4798363586],
  [2.2823e-7,5.22195230819,4705.7323075436],[2.1419e-7,1.42563910473,16730.4636895958],[2.1891e-7,5.55594302779,553.5694028424],[2.03e-7,0.37133792946,283.8593188652],
];
const L1 = [[6283.0758499914,0,0],[0.00206058863,2.67823455808,6283.0758499914],[0.00004303419,2.63512233481,12566.1516999828],[0.00000425264,1.59046982018,3.523118349],[0.00000109017,2.96631010675,1577.3435424478],[9.3479e-7,2.59211109542,18849.2275499742],[0.00000119305,5.79555765566,26.2983197998],[7.2121e-7,1.13840581212,529.6909650946],[6.7784e-7,1.87453300345,398.1490034082],[6.735e-7,4.40932832004,5507.5532386674],[5.9045e-7,2.88815790631,5223.6939198022],[5.5976e-7,2.17471740035,155.4203994342],[4.5411e-7,0.39799502896,796.2980068164],[3.6298e-7,0.46875437227,775.522611324],[2.8962e-7,2.64732254645,7.1135470008],[2.0844e-7,5.34138275149,0.9803210682]];
const L2 = [[0.00008721859,1.07253635559,6283.0758499914],[0.0000099099,3.14159265359,0],[0.00000294833,0.43717350256,12566.1516999828],[2.7338e-7,0.05295636147,3.523118349],[1.6333e-7,5.18820215724,26.2983197998],[1.5745e-7,3.68504712183,155.4203994342],[9.425e-8,0.29667114694,18849.2275499742],[8.938e-8,2.05706319592,77713.7714681205],[6.94e-8,0.82691541038,775.522611324],[5.061e-8,4.6624323168,1577.3435424478]];
const L3 = [[0.00000289058,5.84173149732,6283.0758499914],[2.0712e-7,6.0498393902,12566.1516999828],[2.962e-8,5.1956057957,155.4203994342],[2.527e-8,3.14159265359,0],[1.288e-8,4.7219761197,3.523118349]];
const L4 = [[7.714e-8,4.14117321449,6283.0758499914],[1.016e-8,3.27573644241,12566.1516999828]];

function earthL(T) {
  let s = 0;
  for (const [a, b, c] of L0) s += a * Math.cos(b + c * T);
  let t = 1;
  for (const arr of [L1, L2, L3, L4]) {
    t *= T;
    for (const [a, b, c] of arr) s += a * t * Math.cos(b + c * T);
  }
  return s;
}

return { earthL };
})();

__mods.calendar = (function () {
const { earthL } = __mods['vsop-earth'];

const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const TERM_NAMES = [
  '小寒', '大寒', '立春', '雨水', '惊蛰', '春分', '清明', '谷雨',
  '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋', '处暑',
  '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至',
];

function termLongitude(index) {
  return (285 + 15 * index) % 360;
}

function toJDN(year, month, day) {
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

function fromJDN(jdn) {
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

function sexagenaryIndex(stemIdx, branchIdx) {
  for (let i = 0; i < 60; i++) {
    if (i % 10 === stemIdx && i % 12 === branchIdx) return i;
  }
  return -1;
}

function ganzhiName(index) {
  const i = ((index % 60) + 60) % 60;
  return {
    index: i,
    stem: STEMS[i % 10],
    branch: BRANCHES[i % 12],
    name: STEMS[i % 10] + BRANCHES[i % 12],
  };
}

function dayGanzhiIndex(jdn) {
  return (((jdn + 49) % 60) + 60) % 60;
}

function sunLongitude(jd) {
  const d = jd - 2451545.0;
  const T = d / 36525;
  const Tv = d / 365250;

  let theta = (earthL(Tv) * 180) / Math.PI + 180;
  theta = ((theta % 360) + 360) % 360;

  const prec = (5029.0966 * T + 1.11113 * T * T - 0.000006 * T * T * T) / 3600;
  theta += prec;

  theta -= 0.09033 / 3600;

  const om = ((125.04452 - 1934.136261 * T) * Math.PI) / 180;
  const ls = ((280.4665 + 36000.7698 * T) * Math.PI) / 180;
  const lm = ((218.3165 + 481267.8813 * T) * Math.PI) / 180;
  const dPsi = (-17.2 * Math.sin(om) - 1.32 * Math.sin(2 * ls) - 0.23 * Math.sin(2 * lm) + 0.21 * Math.sin(2 * om)) / 3600;
  theta += dPsi;

  const m = ((357.52911 + 35999.05029 * T - 0.0001537 * T * T) * Math.PI) / 180;
  const e = 0.016708634 - 0.000042037 * T - 0.0000001267 * T * T;
  const R = (1.000001018 * (1 - e * e)) / (1 + e * Math.cos(m + (1.914602 - 0.004817 * T) * (Math.PI / 180) * Math.sin(m)));
  theta -= 20.4898 / 3600 / (R || 1);

  return ((theta % 360) + 360) % 360;
}

function deltaTSeconds(year) {
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

const OFFSET_MODERN = 8 / 24;
const OFFSET_BEIJING_LOCAL = 7.7611 / 24;
const CUTOVER_JD = 2425612 + 4 / 24;

function localOffsetFor(jdUt) {
  return jdUt < CUTOVER_JD ? OFFSET_BEIJING_LOCAL : OFFSET_MODERN;
}

const TERM_INSTANT_CACHE = new Map();
const TERM_INSTANT_CACHE_MAX = 4096;

function computeTermInstantJd(year, index) {
  const target = termLongitude(index);
  const anchor = toJDN(year, 1, 5) - 0.5 + index * 15.2184;
  let jd = anchor;
  for (let n = 0; n < 12; n++) {
    let diff = target - sunLongitude(jd);
    diff = ((((diff + 180) % 360) + 360) % 360) - 180;
    jd += diff / 0.98564736;
    if (Math.abs(diff) < 1e-7) break;
  }
  const jdUt = jd - deltaTSeconds(year) / 86400;
  return jdUt + localOffsetFor(jdUt);
}

function termInstantJd(year, index) {
  const key = year * 24 + index;
  const hit = TERM_INSTANT_CACHE.get(key);
  if (hit !== undefined) return hit;
  const jd = computeTermInstantJd(year, index);
  if (TERM_INSTANT_CACHE.size >= TERM_INSTANT_CACHE_MAX) {
    TERM_INSTANT_CACHE.delete(TERM_INSTANT_CACHE.keys().next().value);
  }
  TERM_INSTANT_CACHE.set(key, jd);
  return jd;
}

function jdToParts(jdLocal) {
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

function partsToJd({ year, month, day, hour = 0, minute = 0 }) {
  return toJDN(year, month, day) - 0.5 + (hour * 60 + minute) / 1440;
}

function equationOfTime(year, month, day) {
  const n = toJDN(year, month, day) - toJDN(year, 1, 1) + 1;
  const B = (2 * Math.PI * (n - 81)) / 364;
  return 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
}

const TERM_WINDOW_CACHE = new Map();
const TERM_WINDOW_CACHE_MAX = 8;

function termWindow(year) {
  const cached = TERM_WINDOW_CACHE.get(year);
  if (cached) return cached;
  const list = [];
  for (let y = year - 1; y <= year + 1; y++) {
    for (let i = 0; i < 24; i++) {
      list.push({ year: y, index: i, name: TERM_NAMES[i], jd: termInstantJd(y, i) });
    }
  }
  list.sort((a, b) => a.jd - b.jd);
  if (TERM_WINDOW_CACHE.size >= TERM_WINDOW_CACHE_MAX) {
    TERM_WINDOW_CACHE.delete(TERM_WINDOW_CACHE.keys().next().value);
  }
  TERM_WINDOW_CACHE.set(year, list);
  return list;
}

function previousJie(terms, jd) {
  let found = null;
  for (const t of terms) {
    if (t.index % 2 !== 0) continue;
    if (t.jd <= jd) found = t;
    else break;
  }
  return found;
}

function nextJie(terms, jd) {
  for (const t of terms) {
    if (t.index % 2 !== 0) continue;
    if (t.jd > jd) return t;
  }
  return null;
}

function formatJd(jd) {
  const p = jdToParts(jd);
  const pad = (n) => String(n).padStart(2, '0');
  return `${p.year}-${pad(p.month)}-${pad(p.day)} ${pad(p.hour)}:${pad(p.minute)}`;
}

return { STEMS, BRANCHES, TERM_NAMES, termLongitude, toJDN, fromJDN, sexagenaryIndex, ganzhiName, dayGanzhiIndex, sunLongitude, deltaTSeconds, OFFSET_MODERN, OFFSET_BEIJING_LOCAL, CUTOVER_JD, localOffsetFor, termInstantJd, jdToParts, partsToJd, equationOfTime, termWindow, previousJie, nextJie, formatJd };
})();

__mods.lunar = (function () {
const { toJDN, jdToParts, termInstantJd, deltaTSeconds, localOffsetFor, OFFSET_MODERN } = __mods.calendar;

const SYNODIC = 29.530588861;
const NEW_MOON_EPOCH = 2451550.09766;
const D2R = Math.PI / 180;

function newMoonJd(k) {
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

  const jdUT = jde + corr - deltaTSeconds(2000 + T * 100) / 86400;
  return jdUT + localOffsetFor(jdUT);
}

function dayNumberOf(jd) {
  return Math.floor(jd + 0.5);
}

function toHistoricalLocal(jdBeijing) {
  const jdUt = jdBeijing - OFFSET_MODERN;
  return jdUt + localOffsetFor(jdUt);
}

function kNear(jdDay) {
  return Math.round((jdDay + 0.5 - NEW_MOON_EPOCH) / SYNODIC);
}

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

function solarToLunar(year, month, day) {
  const targetDay = toJDN(year, month, day);

  const wsDayThisYear = dayNumberOf(toHistoricalLocal(termInstantJd(year, 23)));
  const wsYear = targetDay < wsDayThisYear ? year - 1 : year;
  const wsDay = dayNumberOf(toHistoricalLocal(termInstantJd(wsYear, 23)));

  let k = kNear(wsDay);
  while (dayNumberOf(newMoonJd(k)) > wsDay) k--;
  while (dayNumberOf(newMoonJd(k + 1)) <= wsDay) k++;

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
  let wrapped = false;
  let cursorStart = dayNumberOf(newMoonJd(k));

  for (let i = 1; i <= 15; i++) {
    const startDay = dayNumberOf(newMoonJd(k + i - 1));
    const endDay = dayNumberOf(newMoonJd(k + i));
    const zq = hasZhongQi(wsYear, startDay, endDay);
    const isLeap = i === leapIdx;

    if (targetDay >= startDay && targetDay < endDay) {
      const sp = jdToParts(newMoonJd(k + i - 1));
      const displayNum = isLeap ? ((num + 10) % 12) + 1 : num;
      return {
        year: wsYear,
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
      if (num === 1) wrapped = true;
    }
    cursorStart = endDay;
  }

  throw new Error(`农历换算失败：${year}-${month}-${day}`);
}

function monthStartJd(year, month, day) {
  return toJDN(year, month, day);
}

return { SYNODIC, newMoonJd, dayNumberOf, solarToLunar, monthStartJd };
})();

__mods.geo = (function () {
const RAW = `
北京 116.41 39.90;上海 121.47 31.23;天津 117.20 39.13;重庆 106.55 29.56
广州 113.26 23.13;深圳 114.06 22.55;珠海 113.58 22.27;东莞 113.75 23.02;佛山 113.12 23.02
汕头 116.68 23.35;中山 113.39 22.52;惠州 114.42 23.11;江门 113.08 22.58;湛江 110.36 21.27
韶关 113.60 24.81;梅州 116.12 24.29;清远 113.05 23.70;肇庆 112.47 23.05;茂名 110.93 21.66
揭阳 116.37 23.55;潮州 116.62 23.66;汕尾 115.37 22.78;河源 114.70 23.74;阳江 111.98 21.86
杭州 120.15 30.28;宁波 121.55 29.88;温州 120.70 28.00;嘉兴 120.75 30.75;湖州 120.09 30.89
绍兴 120.58 30.05;金华 119.65 29.09;台州 121.42 28.66;舟山 122.10 30.00;衢州 118.87 28.94;丽水 119.92 28.45
南京 118.80 32.06;苏州 120.62 31.32;无锡 120.31 31.49;常州 119.97 31.81;南通 120.89 31.98
徐州 117.28 34.26;扬州 119.41 32.39;盐城 120.16 33.35;泰州 119.92 32.46;镇江 119.45 32.20
淮安 119.02 33.61;连云港 119.22 34.60;宿迁 118.28 33.96
合肥 117.23 31.82;芜湖 118.43 31.35;蚌埠 117.39 32.92;安庆 117.05 30.54;阜阳 115.81 32.90
大同 113.30 40.08;阳泉 113.58 37.86;长治 113.12 36.19;晋城 112.85 35.49;朔州 112.43 39.33
晋中 112.75 37.69;运城 111.00 35.02;忻州 112.73 38.42;临汾 111.52 36.09;吕梁 111.14 37.52
六安 116.50 31.75;马鞍山 118.50 31.67;淮南 117.00 32.63;滁州 118.32 32.30;黄山 118.34 29.71
福州 119.30 26.08;厦门 118.09 24.48;泉州 118.68 24.87;漳州 117.65 24.51;莆田 119.01 25.45
宁德 119.55 26.67;三明 117.64 26.26;南平 118.18 26.64;龙岩 117.02 25.08
南昌 115.86 28.68;赣州 114.93 25.83;九江 116.00 29.70;上饶 117.94 28.45;宜春 114.40 27.80
吉安 114.99 27.11;抚州 116.36 27.95;景德镇 117.18 29.27;萍乡 113.85 27.62;新余 114.93 27.82;鹰潭 117.07 28.26
济南 117.00 36.65;青岛 120.38 36.07;烟台 121.45 37.46;潍坊 119.16 36.70;临沂 118.35 35.05
济宁 116.59 35.41;淄博 118.05 36.82;威海 122.12 37.51;泰安 117.09 36.20;德州 116.36 37.44
聊城 115.98 36.45;菏泽 115.48 35.23;枣庄 117.32 34.81;日照 119.53 35.42;东营 118.50 37.43
滨州 117.97 37.38
郑州 113.62 34.75;洛阳 112.45 34.62;南阳 112.53 33.00;开封 114.31 34.80;新乡 113.93 35.30
安阳 114.35 36.10;商丘 115.65 34.44;信阳 114.09 32.15;周口 114.70 33.62;驻马店 114.02 33.00
平顶山 113.19 33.77;许昌 113.85 34.03;焦作 113.24 35.22;濮阳 115.03 35.76;漯河 114.03 33.58;三门峡 111.20 34.78
武汉 114.30 30.59;宜昌 111.29 30.69;襄阳 112.14 32.04;荆州 112.24 30.33;黄石 115.04 30.20
十堰 110.79 32.65;孝感 113.92 30.92;黄冈 114.87 30.45;咸宁 114.32 29.84;恩施 109.49 30.27
荆门 112.20 31.04;随州 113.38 31.72;鄂州 114.89 30.40
长沙 112.94 28.23;株洲 113.13 27.83;湘潭 112.94 27.83;衡阳 112.57 26.89;岳阳 113.13 29.36
常德 111.70 29.03;郴州 113.02 25.77;邵阳 111.47 27.24;益阳 112.36 28.55;永州 111.61 26.42
怀化 109.99 27.55;娄底 112.00 27.70;张家界 110.48 29.12
成都 104.07 30.67;绵阳 104.68 31.47;德阳 104.40 31.13;南充 106.08 30.80;宜宾 104.63 28.77
泸州 105.44 28.87;自贡 104.78 29.34;乐山 103.76 29.58;达州 107.50 31.21;内江 105.06 29.58
遂宁 105.57 30.53;眉山 103.85 30.05;广元 105.84 32.44;广安 106.63 30.46;攀枝花 101.72 26.58
雅安 103.00 29.98;巴中 106.75 31.87;资阳 104.63 30.12
贵阳 106.63 26.65;遵义 106.93 27.73;六盘水 104.83 26.60;安顺 105.93 26.25;毕节 105.29 27.30
铜仁 109.19 27.72;凯里 107.98 26.58;都匀 107.52 26.26
昆明 102.83 24.88;曲靖 103.80 25.49;玉溪 102.54 24.35;大理 100.23 25.60;丽江 100.23 26.86
保山 99.17 25.11;昭通 103.72 27.34;普洱 100.97 22.79;临沧 100.09 23.88;景洪 100.80 22.00
拉萨 91.13 29.65;日喀则 88.88 29.27;林芝 94.36 29.65;昌都 97.17 31.14
西安 108.94 34.34;咸阳 108.70 34.33;宝鸡 107.14 34.37;渭南 109.50 34.50;汉中 107.03 33.07
榆林 109.73 38.29;延安 109.49 36.60;安康 109.03 32.68;商洛 109.94 33.87;铜川 108.95 34.90
兰州 103.83 36.06;天水 105.72 34.58;白银 104.14 36.55;酒泉 98.49 39.73;张掖 100.45 38.93
武威 102.63 37.93;庆阳 107.64 35.71;平凉 106.67 35.54;定西 104.63 35.58;陇南 104.93 33.40
西宁 101.78 36.62;海东 102.10 36.50;格尔木 94.90 36.40
银川 106.23 38.49;石嘴山 106.38 39.02;吴忠 106.20 37.99;固原 106.24 36.02
乌鲁木齐 87.62 43.82;克拉玛依 84.89 45.58;喀什 75.99 39.47;伊宁 81.32 43.92;库尔勒 86.15 41.76
阿克苏 80.26 41.17;哈密 93.51 42.83;吐鲁番 89.19 42.95;石河子 86.04 44.31
呼和浩特 111.75 40.84;包头 109.84 40.66;鄂尔多斯 109.78 39.61;赤峰 118.89 42.26;通辽 122.24 43.65
呼伦贝尔 119.77 49.21;乌兰察布 113.13 40.99;巴彦淖尔 107.42 40.75
沈阳 123.43 41.80;大连 121.62 38.92;鞍山 122.99 41.11;抚顺 123.96 41.88;本溪 123.77 41.30
丹东 124.38 40.13;锦州 121.13 41.10;营口 122.24 40.67;阜新 121.67 42.02;辽阳 123.24 41.27
盘锦 122.07 41.12;铁岭 123.84 42.29;朝阳 120.45 41.57;葫芦岛 120.84 40.71
长春 125.32 43.82;吉林 126.55 43.84;四平 124.35 43.17;通化 125.94 41.73;白山 126.42 41.94
松原 124.82 45.14;白城 122.84 45.62;延吉 129.51 42.91
哈尔滨 126.53 45.80;齐齐哈尔 123.92 47.35;牡丹江 129.63 44.55;佳木斯 130.32 46.80;大庆 125.11 46.59
鸡西 130.97 45.30;双鸭山 131.16 46.65;伊春 128.84 47.73;鹤岗 130.30 47.35;黑河 127.53 50.24;绥化 126.97 46.65
南宁 108.37 22.82;柳州 109.42 24.33;桂林 110.29 25.27;梧州 111.28 23.48;北海 109.12 21.48
玉林 110.16 22.63;百色 106.62 23.90;河池 108.06 24.70;钦州 108.65 21.98;防城港 108.35 21.69
贵港 109.60 23.11;贺州 111.57 24.40;来宾 109.23 23.75;崇左 107.36 22.40
海口 110.20 20.04;三亚 109.51 18.25;儋州 109.58 19.52;琼海 110.47 19.26
香港 114.17 22.32;澳门 113.55 22.20;台北 121.52 25.03;高雄 120.31 22.63;台中 120.68 24.14
`;

const PROVINCES = {
  河北: '石家庄', 山西: '太原', 内蒙古: '呼和浩特', 辽宁: '沈阳', 吉林: '长春', 黑龙江: '哈尔滨',
  江苏: '南京', 浙江: '杭州', 安徽: '合肥', 福建: '福州', 江西: '南昌', 山东: '济南', 河南: '郑州',
  湖北: '武汉', 湖南: '长沙', 广东: '广州', 广西: '南宁', 海南: '海口', 四川: '成都', 贵州: '贵阳',
  云南: '昆明', 西藏: '拉萨', 陕西: '西安', 甘肃: '兰州', 青海: '西宁', 宁夏: '银川', 新疆: '乌鲁木齐',
  台湾: '台北',
};

const EXTRA = {
  石家庄: [114.51, 38.04], 太原: [112.55, 37.87], 沈阳: [123.43, 41.80],
  长春: [125.32, 43.82], 哈尔滨: [126.53, 45.80], 南京: [118.80, 32.06],
  杭州: [120.15, 30.28], 合肥: [117.23, 31.82], 福州: [119.30, 26.08],
  南昌: [115.86, 28.68], 济南: [117.00, 36.65], 郑州: [113.62, 34.75],
  武汉: [114.30, 30.59], 长沙: [112.94, 28.23], 广州: [113.26, 23.13],
  南宁: [108.37, 22.82], 海口: [110.20, 20.04], 成都: [104.07, 30.67],
  贵阳: [106.63, 26.65], 昆明: [102.83, 24.88], 拉萨: [91.13, 29.65],
  西安: [108.94, 34.34], 兰州: [103.83, 36.06], 西宁: [101.78, 36.62],
  银川: [106.23, 38.49], 乌鲁木齐: [87.62, 43.82], 台北: [121.52, 25.03],
};

const CITIES = (() => {
  const map = {};
  for (const line of RAW.trim().split('\n')) {
    for (const item of line.split(';')) {
      const parts = item.trim().split(/\s+/);
      if (parts.length !== 3) continue;
      const [name, lon, lat] = parts;
      map[name] = { lon: Number(lon), lat: Number(lat) };
    }
  }
  for (const [name, [lon, lat]] of Object.entries(EXTRA)) {
    if (!map[name]) map[name] = { lon, lat };
  }
  return map;
})();

const SUFFIX = /(省|市|地区|盟|自治州|自治县|自治区|特别行政区|县|区|镇|乡|街道|村|小区|社区)/g;

function resolveAddress(input) {
  const raw = String(input || '').trim();
  if (!raw) return null;

  const num = Number(raw);
  if (Number.isFinite(num) && /^-?\d+(\.\d+)?$/.test(raw) && num >= 60 && num <= 150) {
    return { lon: num, lat: null, matched: `${num}°E`, level: '经度', note: '按你输入的经度计算' };
  }

  const text = raw.replace(/\s/g, '').replace(SUFFIX, '');
  const names = Object.keys(CITIES).sort((a, b) => b.length - a.length);

  for (const n of names) {
    if (text.includes(n)) {
      const c = CITIES[n];
      return { lon: c.lon, lat: c.lat, matched: n, level: '地级市', note: `按 ${n} 估算（约 ${c.lon}°E）` };
    }
  }
  const rawFlat = raw.replace(/\s/g, '');
  for (const [prov, capital] of Object.entries(PROVINCES)) {
    const at = rawFlat.indexOf(prov);
    if (at < 0) continue;
    const after = rawFlat.charAt(at + prov.length);
    if (after === '区' || after === '县') continue;
    const c = CITIES[capital] || { lon: EXTRA[capital][0], lat: EXTRA[capital][1] };
    return { lon: c.lon, lat: c.lat, matched: capital, level: '省会', note: `未匹配到具体城市，按 ${prov} 省会 ${capital} 估算（约 ${c.lon}°E）` };
  }
  return { lon: null, lat: null, matched: null, level: '未匹配', note: `没查到「${raw}」，可改填经度（如 116.4）` };
}

const DETAIL = /(区|县|镇|乡|村|小区|街道|路|号|巷|弄|组|队)/;

const USER_AGENT = 'dsh-metaphysics/0.14.3 (+https://github.com/xuanfu-web/dsh-metaphysics)';

async function onlineLookup(text, { timeoutMs = 2500 } = {}) {
  if (typeof fetch !== 'function') return null;
  let timer = null;
  try {
    const controller = typeof AbortController === 'function' ? new AbortController() : null;
    if (controller) timer = setTimeout(() => controller.abort(), timeoutMs);
    const url = 'https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&accept-language=zh-CN&countrycodes=cn&q='
      + encodeURIComponent(text);
    const res = await fetch(url, {
      signal: controller ? controller.signal : undefined,
      headers: { 'User-Agent': USER_AGENT },
    });
    if (!res || !res.ok) return null;
    const list = await res.json();
    if (!Array.isArray(list) || list.length === 0) return null;
    const hit = list[0];
    const lon = Number(hit.lon);
    const lat = Number(hit.lat);
    if (!Number.isFinite(lon)) return null;
    return { lon, lat, matched: hit.display_name, level: '在线', note: `在线解析：${hit.display_name}` };
  } catch (e) {
    return null;
  } finally {
    if (timer) clearTimeout(timer);
  }
}

async function geocodeAddress(input, opts = {}) {
  const local = resolveAddress(input);
  const text = String(input || '').trim();
  if (!text) return local;
  const wantOnline = opts.online === true;
  if (!wantOnline) return local;
  if (local && typeof local.lon === 'number' && !DETAIL.test(text)) return local;
  const remote = await onlineLookup(text, opts);
  if (remote) return { ...remote, local: local && local.lon != null ? local : null };
  if (local && typeof local.lon === 'number') {
    return { ...local, onlineFailed: true, note: `${local.note}（联网解析失败或超时，已退回内置坐标表）` };
  }
  return { ...local, onlineFailed: true };
}

return { CITIES, PROVINCES, resolveAddress, geocodeAddress };
})();

__mods.random = (function () {

function mulberry32(seed) {
  let a = Number(seed) >>> 0;
  if (!a) a = 0x9e3779b9;
  return function next() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randomOf(seed) {
  if (seed === undefined || seed === null || seed === '') return Math.random;
  const n = Number(seed);
  return Number.isFinite(n) ? mulberry32(n) : Math.random;
}

function isSeed(v) {
  if (v === undefined || v === null || v === '') return true;
  return Number.isFinite(Number(v));
}

return { mulberry32, randomOf, isSeed };
})();

__mods.shensha = (function () {
const { BRANCHES } = __mods.calendar;

const PILLAR_KEYS = ['year', 'month', 'day', 'hour'];
const PILLAR_LABEL = { year: '年柱', month: '月柱', day: '日柱', hour: '时柱' };
const CATEGORY_ORDER = ['贵人', '文星', '婚姻', '性情', '事业', '凶煞', '格局'];

const STEMS_LIST = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const STEM_VIA = { year: '年干', month: '月干', day: '日干', hour: '时干' };
const BRANCH_VIA = { year: '年支', month: '月支', day: '日支', hour: '时支' };

const SANHE = { 寅午戌: ['寅', '午', '戌'], 申子辰: ['申', '子', '辰'], 巳酉丑: ['巳', '酉', '丑'], 亥卯未: ['亥', '卯', '未'] };
const trioKey = (b) => Object.keys(SANHE).find((k) => SANHE[k].includes(b));
const FANGJU = { 亥子丑: ['寅', '戌'], 寅卯辰: ['巳', '丑'], 巳午未: ['申', '辰'], 申酉戌: ['亥', '未'] };
const fangjuKey = (b) => Object.keys(FANGJU).find((k) => k.includes(b));
const SEASON = {
  寅: '春', 卯: '春', 辰: '春',
  巳: '夏', 午: '夏', 未: '夏',
  申: '秋', 酉: '秋', 戌: '秋',
  亥: '冬', 子: '冬', 丑: '冬',
};

const T = (ch) => ({ kind: 'branch', ch });
const S = (ch) => ({ kind: 'stem', ch });
const GZ = (ch) => ({ kind: 'gz', ch });

const TIANYI = {
  甲: ['丑', '未'], 戊: ['丑', '未'], 庚: ['丑', '未'],
  乙: ['子', '申'], 己: ['子', '申'],
  丙: ['亥', '酉'], 丁: ['亥', '酉'],
  辛: ['午', '寅'], 壬: ['卯', '巳'], 癸: ['卯', '巳'],
};
const TAIJI = {
  甲: ['子', '午'], 乙: ['子', '午'],
  丙: ['卯', '酉'], 丁: ['卯', '酉'],
  戊: ['辰', '戌', '丑', '未'], 己: ['辰', '戌', '丑', '未'],
  庚: ['寅', '亥'], 辛: ['寅', '亥'],
  壬: ['巳', '申'], 癸: ['巳', '申'],
};
const TIANDE = { 寅: '丁', 卯: '申', 辰: '壬', 巳: '辛', 午: '亥', 未: '甲', 申: '癸', 酉: '寅', 戌: '丙', 亥: '乙', 子: '巳', 丑: '庚' };
const YUEDE = { 寅午戌: '丙', 申子辰: '壬', 亥卯未: '甲', 巳酉丑: '庚' };
const YUEDE_HE = { 丙: '辛', 壬: '丁', 甲: '己', 庚: '乙' };
const FUXING = {
  甲: ['寅', '子'], 丙: ['寅', '子'],
  乙: ['卯', '丑'], 癸: ['卯', '丑'],
  丁: ['酉'], 戊: ['申'], 己: ['未'], 庚: ['午'], 辛: ['巳'], 壬: ['辰'],
};
const TIANGUAN = { 甲: ['未'], 乙: ['辰'], 丙: ['巳'], 丁: ['酉'], 戊: ['戌'], 己: ['卯'], 庚: ['亥'], 辛: ['申'], 壬: ['午'], 癸: ['寅'] };
const GUOYIN = { 甲: ['戌'], 乙: ['亥'], 丙: ['丑'], 丁: ['寅'], 戊: ['丑'], 己: ['寅'], 庚: ['辰'], 辛: ['巳'], 壬: ['未'], 癸: ['申'] };
const TIANCHU = { 甲: ['巳'], 乙: ['午'], 丙: ['巳'], 丁: ['午'], 戊: ['申'], 己: ['酉'], 庚: ['亥'], 辛: ['子'], 壬: ['寅'], 癸: ['卯'] };
const TIANYI_MED = { 寅: '丑', 卯: '寅', 辰: '卯', 巳: '辰', 午: '巳', 未: '午', 申: '未', 酉: '申', 戌: '酉', 亥: '戌', 子: '亥', 丑: '子' };
const WENCHANG = { 甲: ['巳'], 乙: ['午'], 丙: ['申'], 丁: ['酉'], 戊: ['申'], 己: ['酉'], 庚: ['亥'], 辛: ['子'], 壬: ['寅'], 癸: ['卯'] };
const DEXIU = {
  寅午戌: ['丙', '丁', '戊', '癸'],
  申子辰: ['壬', '癸', '戊', '己', '丙', '辛', '甲', '己'],
  巳酉丑: ['庚', '辛', '乙'],
  亥卯未: ['甲', '乙', '丁', '壬'],
};
const TAOHUA = { 寅午戌: ['卯'], 申子辰: ['酉'], 巳酉丑: ['午'], 亥卯未: ['子'] };
const JIANGXING = { 寅午戌: ['午'], 申子辰: ['子'], 巳酉丑: ['酉'], 亥卯未: ['卯'] };
const HUAGAI = { 寅午戌: ['戌'], 申子辰: ['辰'], 巳酉丑: ['丑'], 亥卯未: ['未'] };
const YIMA = { 寅午戌: ['申'], 申子辰: ['寅'], 巳酉丑: ['亥'], 亥卯未: ['巳'] };
const JIESHA = { 寅午戌: ['亥'], 申子辰: ['巳'], 巳酉丑: ['寅'], 亥卯未: ['申'] };
const ZAISHA = { 寅午戌: ['子'], 申子辰: ['午'], 巳酉丑: ['卯'], 亥卯未: ['酉'] };
const WANGSHEN = { 寅午戌: ['巳'], 申子辰: ['亥'], 巳酉丑: ['申'], 亥卯未: ['寅'] };
const JINYU = { 甲: ['辰'], 乙: ['巳'], 丙: ['未'], 丁: ['申'], 戊: ['未'], 己: ['申'], 庚: ['戌'], 辛: ['亥'], 壬: ['丑'], 癸: ['寅'] };
const LUSHEN = { 甲: ['寅'], 乙: ['卯'], 丙: ['巳'], 丁: ['午'], 戊: ['巳'], 己: ['午'], 庚: ['申'], 辛: ['酉'], 壬: ['亥'], 癸: ['子'] };
const YANGREN = { 甲: ['卯'], 乙: ['辰'], 丙: ['午'], 丁: ['未'], 戊: ['午'], 己: ['未'], 庚: ['酉'], 辛: ['戌'], 壬: ['子'], 癸: ['丑'] };
const FEIREN = { 甲: ['酉'], 乙: ['戌'], 丙: ['子'], 丁: ['丑'], 戊: ['子'], 己: ['丑'], 庚: ['卯'], 辛: ['辰'], 壬: ['午'], 癸: ['未'] };
const LIUXIA = { 甲: ['酉'], 乙: ['戌'], 丙: ['未'], 丁: ['申'], 戊: ['巳'], 己: ['午'], 庚: ['辰'], 辛: ['卯'], 壬: ['亥'], 癸: ['寅'] };

const KUIGANG = ['庚辰', '庚戌', '壬辰', '戊戌'];
const RIDE = ['甲寅', '丙辰', '戊辰', '庚辰', '壬戌'];
const RIGUI = ['丁酉', '丁亥', '癸巳', '癸卯'];
const LIUXIU = ['丙午', '丁未', '戊子', '戊午', '己丑', '己未'];
const SHIE_DABAI = ['甲辰', '乙巳', '丙申', '丁亥', '戊戌', '己丑', '庚辰', '辛巳', '壬申', '癸亥'];
const YINCHA_YANGCUO = ['丙子', '丁丑', '戊寅', '辛卯', '壬辰', '癸巳', '丙午', '丁未', '戊申', '辛酉', '壬戌', '癸亥'];
const TIAN_SHE = { 春: '戊寅', 夏: '甲午', 秋: '戊申', 冬: '甲子' };
const SIFEI = { 春: ['庚申', '辛酉'], 夏: ['壬子', '癸亥'], 秋: ['甲寅', '乙卯'], 冬: ['丙午', '丁巳'] };
const TONGZI = { 春: ['寅', '子'], 秋: ['寅', '子'], 夏: ['卯', '未', '辰'], 冬: ['卯', '未', '辰'] };
const SANQI = ['甲戊庚', '乙丙丁', '壬癸辛'];
const JINSHEN = ['乙丑', '己巳', '癸酉'];

function byStem(name, cat, luck, rule, table, refs = ['day']) {
  return {
    name, cat, luck, rule, refs, refKind: 'stem',
    targets: (ctx, ref) => (table[ctx.pillars[ref].stem] || []).map(T),
  };
}

function byTrio(name, cat, luck, rule, table, refs = ['year', 'day']) {
  return {
    name, cat, luck, rule, refs, refKind: 'branch',
    targets: (ctx, ref) => {
      const k = trioKey(ctx.pillars[ref].branch);
      return k && table[k] ? table[k].map(T) : [];
    },
  };
}

function byRefBranch(name, cat, luck, rule, fn, ref = 'year') {
  return {
    name, cat, luck, rule, refs: [ref], refKind: 'branch', viaLabel: BRANCH_VIA[ref],
    targets: (ctx) => fn(ctx),
  };
}

function byMonth(name, cat, luck, rule, fn, slots) {
  return { name, cat, luck, rule, refs: ['month'], refKind: 'branch', viaLabel: '月支', slots, targets: (ctx) => fn(ctx) };
}

function byPillarGz(name, cat, luck, rule, list, slot = 'day') {
  return {
    name, cat, luck, rule, refs: [slot], refKind: 'branch', viaLabel: PILLAR_LABEL[slot], slots: [slot],
    targets: (ctx, ref) => (list.includes(ctx.pillars[ref].ganzhi) ? [GZ(ctx.pillars[ref].ganzhi)] : []),
  };
}

const RULES = [
  byStem('天乙贵人', '贵人', 'good',
    '甲戊庚见丑未，乙己见子申，丙丁见亥酉，辛见午寅，壬癸见卯巳（年干、日干查四支）',
    TIANYI, ['year', 'day']),
  byStem('太极贵人', '贵人', 'good',
    '甲乙见子午，丙丁见卯酉，戊己见辰戌丑未，庚辛见寅亥，壬癸见巳申（年干、日干查四支）',
    TAIJI, ['year', 'day']),
  byMonth('天德贵人', '贵人', 'good',
    '正月丁、二月申、三月壬、四月辛、五月亥、六月甲、七月癸、八月寅、九月丙、十月乙、冬月巳、腊月庚（月支查干或支）',
    (ctx) => {
      const ch = TIANDE[ctx.pillars.month.branch];
      if (!ch) return [];
      return STEMS_LIST.includes(ch) ? [S(ch)] : [T(ch)];
    }),
  byMonth('月德贵人', '贵人', 'good',
    '寅午戌月见丙，申子辰月见壬，亥卯未月见甲，巳酉丑月见庚（月支查天干）',
    (ctx) => {
      const k = trioKey(ctx.pillars.month.branch);
      return k && YUEDE[k] ? [S(YUEDE[k])] : [];
    }),
  byMonth('月德合', '贵人', 'good',
    '月德之合干：丙见辛、壬见丁、甲见己、庚见乙（月支定月德后查天干）',
    (ctx) => {
      const k = trioKey(ctx.pillars.month.branch);
      const he = k && YUEDE[k] ? YUEDE_HE[YUEDE[k]] : null;
      return he ? [S(he)] : [];
    }),
  byStem('福星贵人', '贵人', 'good',
    '甲丙见寅子，乙癸见卯丑，丁见酉、戊见申、己见未、庚见午、辛见巳、壬见辰（年干、日干查四支）',
    FUXING, ['year', 'day']),
  byStem('天官贵人', '贵人', 'good',
    '甲未、乙辰、丙巳、丁酉、戊戌、己卯、庚亥、辛申、壬午、癸寅（年干、日干查四支；此表流派有异）',
    TIANGUAN, ['year', 'day']),
  byStem('国印贵人', '贵人', 'good',
    '甲戌、乙亥、丙丑、丁寅、戊丑、己寅、庚辰、辛巳、壬未、癸申（年干、日干查四支）',
    GUOYIN, ['year', 'day']),
  byStem('天厨贵人', '贵人', 'good',
    '食神之禄：甲巳、乙午、丙巳、丁午、戊申、己酉、庚亥、辛子、壬寅、癸卯（日干查四支）',
    TIANCHU, ['day']),
  byMonth('天医', '贵人', 'good',
    '月支退一位：寅月见丑、卯月见寅……丑月见子（月支查四支）',
    (ctx) => {
      const ch = TIANYI_MED[ctx.pillars.month.branch];
      return ch ? [T(ch)] : [];
    }),

  byStem('文昌贵人', '文星', 'good',
    '甲巳、乙午、丙申、丁酉、戊申、己酉、庚亥、辛子、壬寅、癸卯（年干、日干查四支）',
    WENCHANG, ['year', 'day']),
  byMonth('德秀贵人', '文星', 'good',
    '寅午戌月德丙丁、秀戊癸；申子辰月德壬癸戊己、秀丙辛甲己；巳酉丑月德庚辛、秀乙庚；亥卯未月德甲乙、秀丁壬（月支查天干）',
    (ctx) => {
      const k = trioKey(ctx.pillars.month.branch);
      return k && DEXIU[k] ? DEXIU[k].map(S) : [];
    }),

  byTrio('桃花', '婚姻', 'neutral',
    '寅午戌见卯、申子辰见酉、巳酉丑见午、亥卯未见子（年支、日支双查）',
    TAOHUA),
  byRefBranch('红鸾', '婚姻', 'good',
    '卯起子逆数：子见卯、丑见寅、寅见丑、卯见子……（年支查四支）',
    (ctx) => {
      const idx = BRANCHES.indexOf(ctx.pillars.year.branch);
      return [T(BRANCHES[((3 - idx) % 12 + 12) % 12])];
    }),
  byRefBranch('天喜', '婚姻', 'good',
    '红鸾对冲之位：子见酉、丑见申、寅见未……（年支查四支）',
    (ctx) => {
      const idx = BRANCHES.indexOf(ctx.pillars.year.branch);
      const luan = ((3 - idx) % 12 + 12) % 12;
      return [T(BRANCHES[(luan + 6) % 12])];
    }),
  byRefBranch('孤辰', '婚姻', 'bad',
    '亥子丑年见寅、寅卯辰年见巳、巳午未年见申、申酉戌年见亥（年支查四支）',
    (ctx) => {
      const k = fangjuKey(ctx.pillars.year.branch);
      return k ? [T(FANGJU[k][0])] : [];
    }),
  byRefBranch('寡宿', '婚姻', 'bad',
    '亥子丑年见戌、寅卯辰年见丑、巳午未年见辰、申酉戌年见未（年支查四支）',
    (ctx) => {
      const k = fangjuKey(ctx.pillars.year.branch);
      return k ? [T(FANGJU[k][1])] : [];
    }),
  byStem('金舆', '婚姻', 'good',
    '禄前二位：甲龙乙蛇丙戊羊、丁己申宫庚犬乡、辛猪壬牛癸虎位（日干查四支）',
    JINYU, ['day']),

  byTrio('华盖', '性情', 'neutral',
    '寅午戌见戌、申子辰见辰、巳酉丑见丑、亥卯未见未（年支、日支双查）',
    HUAGAI),
  byStem('羊刃', '性情', 'bad',
    '禄前一位：甲卯、乙辰、丙戊午、丁己未、庚酉、辛戌、壬子、癸丑（日干查四支；阳干论刃为主）',
    YANGREN, ['day']),
  byStem('飞刃', '性情', 'bad',
    '羊刃六冲：甲酉、乙戌、丙子、丁丑、戊子、己丑、庚卯、辛辰、壬午、癸未（日干查四支）',
    FEIREN, ['day']),
  byPillarGz('魁罡', '性情', 'neutral',
    '日柱庚辰、庚戌、壬辰、戊戌（日柱见之）',
    KUIGANG),
  byMonth('童子煞', '性情', 'neutral',
    '春秋生见寅子，冬夏生见卯未辰（取季节口诀，查日支、时支；另有纳音五行一法，流派多歧，仅作参考）',
    (ctx) => {
      const season = SEASON[ctx.pillars.month.branch];
      const list = season && TONGZI[season];
      return list ? list.map(T) : [];
    }, ['day', 'hour']),
  byPillarGz('六秀日', '性情', 'good',
    '日柱丙午、丁未、戊子、戊午、己丑、己未（日柱见之）',
    LIUXIU),
  byPillarGz('日德', '性情', 'good',
    '日柱甲寅、丙辰、戊辰、庚辰、壬戌（日柱见之）',
    RIDE),
  byPillarGz('日贵', '性情', 'good',
    '日柱丁酉、丁亥、癸巳、癸卯（日柱见之）',
    RIGUI),

  byStem('禄神', '事业', 'good',
    '甲寅、乙卯、丙戊巳、丁己午、庚申、辛酉、壬亥、癸子（日干查四支）',
    LUSHEN, ['day']),
  byTrio('将星', '事业', 'good',
    '寅午戌见午、申子辰见子、巳酉丑见酉、亥卯未见卯（年支、日支双查）',
    JIANGXING),
  byTrio('驿马', '事业', 'neutral',
    '寅午戌见申、申子辰见寅、巳酉丑见亥、亥卯未见巳（年支、日支双查）',
    YIMA),

  byTrio('劫煞', '凶煞', 'bad',
    '寅午戌见亥、申子辰见巳、巳酉丑见寅、亥卯未见申（年支、日支双查）',
    JIESHA),
  byTrio('灾煞', '凶煞', 'bad',
    '寅午戌见子、申子辰见午、巳酉丑见卯、亥卯未见酉（年支、日支双查）',
    ZAISHA),
  byTrio('亡神', '凶煞', 'bad',
    '寅午戌见巳、申子辰见亥、巳酉丑见申、亥卯未见寅（年支、日支双查）',
    WANGSHEN),
  {
    name: '空亡', cat: '凶煞', luck: 'bad',
    rule: '以日柱所在旬的空亡反查各柱地支（日柱旬空）',
    refs: ['day'], refKind: 'branch', viaLabel: '日柱旬空',
    targets: (ctx) => (ctx.kongwang || []).map(T),
  },
  byPillarGz('十恶大败', '凶煞', 'bad',
    '日柱甲辰、乙巳、丙申、丁亥、戊戌、己丑、庚辰、辛巳、壬申、癸亥（日柱见之）',
    SHIE_DABAI),
  byPillarGz('阴差阳错', '凶煞', 'bad',
    '日柱丙子、丁丑、戊寅、辛卯、壬辰、癸巳、丙午、丁未、戊申、辛酉、壬戌、癸亥（日柱见之）',
    YINCHA_YANGCUO),
  byMonth('四废日', '凶煞', 'bad',
    '春庚申辛酉、夏壬子癸亥、秋甲寅乙卯、冬丙午丁巳（月支定季节查日柱）',
    (ctx) => {
      const season = SEASON[ctx.pillars.month.branch];
      const gz = ctx.pillars.day.ganzhi;
      return season && SIFEI[season].includes(gz) ? [GZ(gz)] : [];
    }, ['day']),
  byStem('流霞', '凶煞', 'bad',
    '甲酉、乙戌、丙未、丁申、戊巳、己午、庚辰、辛卯、壬亥、癸寅（日干查四支；通行表）',
    LIUXIA, ['day']),

  byMonth('天赦日', '格局', 'good',
    '春戊寅、夏甲午、秋戊申、冬甲子（月支定季节查日柱）',
    (ctx) => {
      const season = SEASON[ctx.pillars.month.branch];
      const gz = ctx.pillars.day.ganzhi;
      return season && TIAN_SHE[season] === gz ? [GZ(gz)] : [];
    }, ['day']),
  byPillarGz('金神', '格局', 'neutral',
    '时柱乙丑、己巳、癸酉（时柱见之；严格成格另需日主身旺，此仅记星）',
    JINSHEN, 'hour'),
  {
    name: '天罗', cat: '凶煞', luck: 'bad',
    rule: '四支见戌、亥俱全（戌亥为天罗）',
    custom: (ctx) => chartPattern(ctx, ['戌', '亥']),
  },
  {
    name: '地网', cat: '凶煞', luck: 'bad',
    rule: '四支见辰、巳俱全（辰巳为地网）',
    custom: (ctx) => chartPattern(ctx, ['辰', '巳']),
  },
  {
    name: '三奇贵人', cat: '格局', luck: 'good',
    rule: '年月日或月日时天干依序为甲戊庚（天上）、乙丙丁（地下）、壬癸辛（人中）',
    custom: (ctx) => {
      const out = [];
      for (const trio of [['year', 'month', 'day'], ['month', 'day', 'hour']]) {
        const gz = trio.map((k) => ctx.pillars[k].stem).join('');
        if (SANQI.includes(gz)) out.push({ pillars: trio.slice(), via: '三柱天干', target: gz });
      }
      return out;
    },
  },
];

function chartPattern(ctx, branches) {
  const keys = PILLAR_KEYS.filter((k) => branches.includes(ctx.pillars[k].branch));
  if (keys.length < branches.length) return [];
  return [{ pillars: keys, via: '四支', target: branches.join('') }];
}

function matches(pl, t) {
  if (t.kind === 'stem') return pl.stem === t.ch;
  if (t.kind === 'branch') return pl.branch === t.ch;
  return pl.ganzhi === t.ch;
}

function runRule(r, ctx) {
  if (r.custom) return r.custom(ctx);
  const hits = [];
  for (const ref of r.refs) {
    const targets = r.targets(ctx, ref) || [];
    if (!targets.length) continue;
    const via = r.viaLabel || (r.refKind === 'stem' ? STEM_VIA : BRANCH_VIA)[ref];
    for (const key of (r.slots || PILLAR_KEYS)) {
      const pl = ctx.pillars[key];
      for (const t of targets) {
        if (matches(pl, t)) hits.push({ pillars: [key], via, target: t.ch });
      }
    }
  }
  return hits;
}

function computeBaziShensha(pillars, kongwang = []) {
  const ctx = { pillars, kongwang };
  const items = [];
  for (const r of RULES) {
    const hits = runRule(r, ctx);
    if (!hits.length) continue;
    const entry = { name: r.name, cat: r.cat, luck: r.luck, rule: r.rule, pillars: [], via: new Set(), target: new Set() };
    for (const h of hits) {
      for (const k of h.pillars) if (!entry.pillars.includes(k)) entry.pillars.push(k);
      if (h.via) entry.via.add(h.via);
      if (h.target) entry.target.add(h.target);
    }
    entry.pillars.sort((a, b) => PILLAR_KEYS.indexOf(a) - PILLAR_KEYS.indexOf(b));
    items.push(entry);
  }
  items.sort((a, b) => CATEGORY_ORDER.indexOf(a.cat) - CATEGORY_ORDER.indexOf(b.cat));

  const detail = { year: [], month: [], day: [], hour: [] };
  for (const it of items) {
    for (const k of it.pillars) {
      detail[k].push({
        name: it.name,
        cat: it.cat,
        luck: it.luck,
        via: [...it.via].join('、'),
        target: [...it.target].join('、'),
        rule: it.rule,
      });
    }
  }

  const groups = [];
  for (const cat of CATEGORY_ORDER) {
    const list = items.filter((i) => i.cat === cat);
    if (!list.length) continue;
    groups.push({
      cat,
      items: list.map((i) => ({
        name: i.name,
        cat: i.cat,
        luck: i.luck,
        pillars: i.pillars.slice(),
        via: [...i.via].join('、'),
        target: [...i.target].join('、'),
        rule: i.rule,
      })),
    });
  }

  return {
    detail,
    groups,
    names: items.map((i) => i.name),
    count: items.reduce((n, i) => n + i.pillars.length, 0),
  };
}

const RULE_TABLE = RULES.reduce((acc, r) => { acc[r.name] = { cat: r.cat, luck: r.luck, rule: r.rule }; return acc; }, {});

return { PILLAR_KEYS, PILLAR_LABEL, CATEGORY_ORDER, computeBaziShensha, RULE_TABLE };
})();

__mods.geju = (function () {

const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const STEM_ELEMENT = {
  甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土',
  己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水',
};
const BRANCH_ELEMENT = {
  子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火',
  午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水',
};
const GENERATES = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const OVERCOMES = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };
const HIDDEN = {
  子: ['癸'], 丑: ['己', '癸', '辛'], 寅: ['甲', '丙', '戊'], 卯: ['乙'],
  辰: ['戊', '乙', '癸'], 巳: ['丙', '戊', '庚'], 午: ['丁', '己'], 未: ['己', '丁', '乙'],
  申: ['庚', '壬', '戊'], 酉: ['辛'], 戌: ['戊', '辛', '丁'], 亥: ['壬', '甲'],
};
const HIDDEN_W = [1, 0.5, 0.3];

const LUSHEN_BRANCH = { 甲: '寅', 乙: '卯', 丙: '巳', 丁: '午', 戊: '巳', 己: '午', 庚: '申', 辛: '酉', 壬: '亥', 癸: '子' };
const YANGREN_BRANCH = { 甲: '卯', 乙: '辰', 丙: '午', 丁: '未', 戊: '午', 己: '未', 庚: '酉', 辛: '戌', 壬: '子', 癸: '丑' };
const STEM_HE = { 甲己: '土', 乙庚: '金', 丙辛: '水', 丁壬: '木', 戊癸: '火' };

const isYangStem = (s) => STEMS.indexOf(s) % 2 === 0;
const ELEMENTS = ['木', '火', '土', '金', '水'];

function tenGod(dayStem, otherStem) {
  const me = STEM_ELEMENT[dayStem];
  const it = STEM_ELEMENT[otherStem];
  const same = isYangStem(dayStem) === isYangStem(otherStem);
  if (me === it) return same ? '比肩' : '劫财';
  if (GENERATES[me] === it) return same ? '食神' : '伤官';
  if (OVERCOMES[me] === it) return same ? '偏财' : '正财';
  if (OVERCOMES[it] === me) return same ? '七杀' : '正官';
  if (GENERATES[it] === me) return same ? '偏印' : '正印';
  return '?';
}

const godGroups = {
  比劫: ['比肩', '劫财'],
  食伤: ['食神', '伤官'],
  财: ['正财', '偏财'],
  官杀: ['正官', '七杀'],
  印: ['正印', '偏印'],
};

function godStats(pillars, dayStem) {
  const total = { 比劫: 0, 食伤: 0, 财: 0, 官杀: 0, 印: 0 };
  const byGod = { 比肩: 0, 劫财: 0, 食神: 0, 伤官: 0, 正财: 0, 偏财: 0, 正官: 0, 七杀: 0, 正印: 0, 偏印: 0 };
  const add = (stem, w) => {
    const god = tenGod(dayStem, stem);
    const g = Object.keys(godGroups).find((k) => godGroups[k].includes(god));
    if (g) total[g] += w;
    if (byGod[god] !== undefined) byGod[god] += w;
  };
  for (const key of ['year', 'month', 'day', 'hour']) {
    add(pillars[key].stem, key === 'day' ? 0.6 : 1);
    (HIDDEN[pillars[key].branch] || []).forEach((h, i) => add(h, HIDDEN_W[i] ?? 0.1));
  }
  for (const k of Object.keys(total)) total[k] = Math.round(total[k] * 10) / 10;
  for (const k of Object.keys(byGod)) byGod[k] = Math.round(byGod[k] * 10) / 10;
  return { groups: total, byGod };
}

function elementRoles(dayStem) {
  const me = STEM_ELEMENT[dayStem];
  const inMe = ELEMENTS.find((e) => GENERATES[e] === me);
  const guan = ELEMENTS.find((e) => OVERCOMES[e] === me);
  return { me, inMe, shi: GENERATES[me], cai: OVERCOMES[me], guan };
}

function monthPattern(pillars, dayStem, monthBranch) {
  const hidden = HIDDEN[monthBranch] || [];
  const cands = hidden.map((stem, i) => ({
    stem,
    god: tenGod(dayStem, stem),
    pos: ['本气', '中气', '余气'][i],
    w: HIDDEN_W[i] ?? 0.1,
  }));
  const others = ['year', 'month', 'hour'];
  const exposedKey = others.find((k) => cands.some((c) => c.stem === pillars[k].stem));
  const base = cands[0];
  const use = exposedKey ? cands.find((c) => c.stem === pillars[exposedKey].stem) : base;
  const exposedPos = exposedKey ? { year: '年', month: '月', hour: '时' }[exposedKey] : null;

  if (base.god === '比肩') {
    return {
      name: '建禄格',
      kind: '月令格',
      evidence: `月令${monthBranch}为日干${dayStem}之禄（本气${base.stem}比肩），身坐禄地`,
    };
  }
  if (base.god === '劫财') {
    if (YANGREN_BRANCH[dayStem] === monthBranch) {
      return {
        name: isYangStem(dayStem) ? '阳刃格' : '月刃格',
        kind: '月令格',
        evidence: `月令${monthBranch}为日干${dayStem}之刃（本气${base.stem}劫财）${isYangStem(dayStem) ? '' : '，阴干统称月刃'}`,
      };
    }
    return { name: '月劫格', kind: '月令格', evidence: `月令${monthBranch}本气${base.stem}为劫财` };
  }
  const name = `${use.god}格`;
  const ex = exposedKey
    ? `月令${monthBranch}藏${hidden.join('')}，${use.pos}${use.stem}（${use.god}）透于${exposedPos}干`
    : `月令${monthBranch}藏${hidden.join('')}，本气${base.stem}（${base.god}）未透干，以月令本气取格`;
  return { name, kind: '月令格', evidence: ex };
}

const ZHUANWANG = { 木: '曲直格', 火: '炎上格', 土: '稼穑格', 金: '从革格', 水: '润下格' };
const CONG = { 财: '从财格', 官杀: '从杀格', 食伤: '从儿格', 印: '从强格', 比劫: '从强格' };

function specialPatterns(pillars, dayStem, monthBranch, strength, wuxing, gods) {
  const out = [];
  const roles = elementRoles(dayStem);
  const me = roles.me;
  const mine = wuxing[me] ?? 0;
  const yin = wuxing[roles.inMe] ?? 0;
  const cai = wuxing[roles.cai] ?? 0;
  const guan = wuxing[roles.guan] ?? 0;
  const shi = wuxing[roles.shi] ?? 0;

  for (const key of ['year', 'month', 'hour']) {
    const other = pillars[key].stem;
    const target = STEM_HE[dayStem + other] || STEM_HE[other + dayStem];
    if (!target) continue;
    const monthEl = BRANCH_ELEMENT[monthBranch];
    const supports = monthEl === target || GENERATES[monthEl] === target;
    if (!supports) continue;
    out.push({
      name: `${target === '土' ? '化土格' : `化${target}格`}`,
      kind: '化气格',
      evidence: `日干${dayStem}与${['年', '月', '时'][['year', 'month', 'hour'].indexOf(key)]}干${other}合化${target}，月令${monthBranch}${monthEl}${monthEl === target ? '同化神' : '生助化神'}；化气格须全局无争合妒合才算真，此处仅列条件` ,
    });
    break;
  }

  if ((strength.level === '身强' || strength.level === '偏强') && mine + yin >= 5 && guan <= 1.2 && cai <= 1.8) {
    out.push({
      name: ZHUANWANG[me],
      kind: '专旺格',
      evidence: `日主${me}得${mine + yin}分（同类+印），官杀${guan}、财${cai}皆弱，成${ZHUANWANG[me]}之势`,
    });
  }

  const hasRoot = ['year', 'month', 'day', 'hour'].some((key) =>
    (HIDDEN[pillars[key].branch] || []).some((h) => STEM_ELEMENT[h] === me || GENERATES[STEM_ELEMENT[h]] === me));
  if (!hasRoot && (strength.level === '身弱' || strength.level === '偏弱')) {
    const main = Object.entries({ 财: cai, 官杀: guan, 食伤: shi, 印: yin })
      .sort((a, b) => b[1] - a[1])[0];
    if (main[1] >= 2.5) {
      out.push({
        name: CONG[main[0]],
        kind: '从格',
        evidence: `日主无根（四支藏干无同类与印），${main[0]}占 ${main[1]} 分最旺，从${main[0]}之势`,
      });
    }
  }

  const byGod = gods.byGod || {};
  const g = gods.groups || gods;
  const hasGod = (name) => (byGod[name] ?? 0) >= 0.5;
  const yinGods = (byGod.正印 ?? 0) + (byGod.偏印 ?? 0);
  const combos = [
    ['官印相生', hasGod('正官') && yinGods >= 0.5, `正官与印并见，官生印而护身`],
    ['杀印相生', hasGod('七杀') && yinGods >= 0.5 && (byGod.七杀 ?? 0) > (byGod.正官 ?? 0), `七杀与印并见，杀印相生`],
    ['食伤生财', (g.食伤 ?? 0) >= 0.6 && (g.财 ?? 0) >= 0.6, `食伤${g.食伤}+财${g.财}，食伤生财`],
    ['财官相生', (g.财 ?? 0) >= 0.6 && (g.官杀 ?? 0) >= 0.6, `财${g.财}+官杀${g.官杀}，财生官`],
    ['伤官配印', hasGod('伤官') && yinGods >= 0.5 && (g.财 ?? 0) <= 1, `伤官与印并见，伤官配印`],
    ['伤官见官', hasGod('伤官') && hasGod('正官'), `伤官与正官并见（伤官见官，为祸百端之说）`],
    ['羊刃驾杀', (g.官杀 ?? 0) >= 1 && YANGREN_BRANCH[dayStem] === monthBranch, `月令为刃，又有七杀${g.官杀}，刃杀相制`],
  ];
  for (const [name, cond, evidence] of combos) if (cond) out.push({ name, kind: '组合', evidence });
  return out;
}

const TIAOHOU = {
  亥: ['火', '冬月寒水当令，最喜火暖局'],
  子: ['火', '仲冬水旺，最喜火暖局'],
  丑: ['火', '季冬湿寒，喜火解冻'],
  巳: ['水', '初夏火旺，喜水制衡'],
  午: ['水', '仲夏火炎，最喜水调候'],
  未: ['水', '季夏燥土，喜水润局'],
  寅: ['火', '初春尚寒，得火而发'],
  卯: ['火', '仲春木旺，喜火吐秀'],
  辰: ['金', '季春湿土，喜金水疏泄'],
  申: ['火', '初秋金旺，喜火炼金'],
  酉: ['火', '仲秋金锐，喜火制'],
  戌: ['水', '季秋燥土，喜水润泽'],
};

function yongshenOf(dayStem, monthBranch, strength, wuxing) {
  const roles = elementRoles(dayStem);
  const me = roles.me;
  const weak = strength.level === '身弱' || strength.level === '偏弱';
  const strong = strength.level === '身强' || strength.level === '偏强';

  const favor = weak ? [roles.inMe, me] : strong ? [roles.shi, roles.cai, roles.guan] : [roles.inMe, me, roles.shi];
  const avoid = weak ? [roles.shi, roles.cai, roles.guan] : strong ? [me, roles.inMe] : [roles.guan, roles.cai];
  const favorableTenGods = weak ? ['正印', '偏印', '比肩', '劫财'] : strong
    ? ['食神', '伤官', '正财', '偏财', '正官', '七杀']
    : ['正印', '偏印', '食神', '伤官'];

  const th = TIAOHOU[monthBranch];
  const tiaohou = th ? { element: th[0], note: th[1] } : null;

  const roleName = (el) => (el === me ? '比劫' : el === roles.inMe ? '印'
    : el === roles.shi ? '食伤' : el === roles.cai ? '财' : '官杀');
  const detail = [
    `日主${dayStem}${me}，${strength.level}（${strength.score} 分）：`,
    weak
      ? `喜${roles.inMe}（印）生身、${me}（比劫）帮身；忌${roles.shi}（食伤）泄、${roles.cai}（财）耗、${roles.guan}（官杀）克。`
      : strong
        ? `喜${roles.shi}（食伤）泄秀、${roles.cai}（财）耗、${roles.guan}（官杀）制；忌${me}（比劫）与${roles.inMe}（印）再助。`
        : '身中和，先取调候与通关，喜忌随大运流年动态变化。',
    tiaohou ? `调候（简化）：${tiaohou.note}，宜${tiaohou.element}。` : '',
    '扶抑法为主；调候未用穷通宝鉴全表，各派取用不同，仅作方向提示。',
  ].filter(Boolean).join('');

  return {
    method: '扶抑为主 + 调候简化提示',
    level: strength.level,
    favor,
    avoid,
    favorRoles: favor.map(roleName),
    avoidRoles: avoid.map(roleName),
    favorTenGods: favorableTenGods,
    avoidTenGods: weak
      ? ['食神', '伤官', '正财', '偏财', '正官', '七杀']
      : strong
        ? ['比肩', '劫财', '正印', '偏印']
        : ['正官', '七杀', '正财', '偏财'],
    tiaohou,
    detail,
  };
}

const TIERS = [
  [1.3, '大吉'],
  [0.6, '吉'],
  [-0.6, '平'],
  [-1.3, '忌'],
  [-Infinity, '大忌'],
];

function scoreLuck(ganzhi, frame) {
  const ys = frame.yongshen;
  const stem = ganzhi[0];
  const branch = ganzhi[1];
  const stemEl = STEM_ELEMENT[stem];
  const branchEl = BRANCH_ELEMENT[branch];
  const scoreEl = (el) => {
    let s = 0;
    if (ys.favor.includes(el)) s += 1;
    if (ys.avoid.includes(el)) s -= 1;
    if (ys.tiaohou && el === ys.tiaohou.element) s += 0.4;
    return s;
  };
  let score = scoreEl(stemEl) * 1.0 + scoreEl(branchEl) * 0.8;
  for (const h of (HIDDEN[branch] || []).slice(1)) {
    score += scoreEl(STEM_ELEMENT[h]) * 0.2;
  }
  score = Math.round(score * 10) / 10;

  const godStem = tenGod(frame.dayStem, stem);
  const bonus = ys.favorTenGods.includes(godStem) ? 0.3 : 0;
  const total = Math.round((score + bonus) * 10) / 10;

  const tier = TIERS.find(([min]) => total >= min)[1];
  const reasons = [];
  if (ys.favor.includes(stemEl)) reasons.push(`天干${stem}${stemEl}为用神`);
  else if (ys.avoid.includes(stemEl)) reasons.push(`天干${stem}${stemEl}为忌神`);
  else reasons.push(`天干${stem}${stemEl}不喜不忌`);
  if (ys.favor.includes(branchEl)) reasons.push(`地支${branch}${branchEl}助用`);
  else if (ys.avoid.includes(branchEl)) reasons.push(`地支${branch}${branchEl}助忌`);
  if (ys.tiaohou && (stemEl === ys.tiaohou.element || branchEl === ys.tiaohou.element)) {
    reasons.push(`合调候（${ys.tiaohou.element}）`);
  }
  return { ganzhi, score: total, tier, stemTenGod: godStem, reasons, note: `${godStem}运，${tier}（${total}）` };
}

function analyzeBaziFrame({ pillars, dayStem, monthBranch, strength, wuxing }) {
  const gods = godStats(pillars, dayStem);
  const month = monthPattern(pillars, dayStem, monthBranch);
  const special = specialPatterns(pillars, dayStem, monthBranch, strength, wuxing, gods);
  const geju = [month, ...special];
  const yongshen = yongshenOf(dayStem, monthBranch, strength, wuxing);
  return {
    geju,
    primary: month,
    primaryName: month.name,
    godStats: gods,
    yongshen,
    dayStem,
    monthBranch,
  };
}

return { tenGod, elementRoles, scoreLuck, analyzeBaziFrame };
})();

__mods.bazi = (function () {
const { STEMS, BRANCHES, TERM_NAMES, ganzhiName, dayGanzhiIndex, jdToParts, partsToJd, sexagenaryIndex, termWindow, previousJie, nextJie, equationOfTime, formatJd } = __mods.calendar;
const { resolveAddress } = __mods.geo;
const { computeBaziShensha } = __mods.shensha;
const { analyzeBaziFrame, scoreLuck } = __mods.geju;

const HIDDEN_STEMS = {
  子: ['癸'],
  丑: ['己', '癸', '辛'],
  寅: ['甲', '丙', '戊'],
  卯: ['乙'],
  辰: ['戊', '乙', '癸'],
  巳: ['丙', '戊', '庚'],
  午: ['丁', '己'],
  未: ['己', '丁', '乙'],
  申: ['庚', '壬', '戊'],
  酉: ['辛'],
  戌: ['戊', '辛', '丁'],
  亥: ['壬', '甲'],
};

const STEM_ELEMENT = {
  甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土',
  己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水',
};

const BRANCH_ELEMENT = {
  子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火',
  午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水',
};

const GENERATES = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const OVERCOMES = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };

const isYangStem = (stem) => STEMS.indexOf(stem) % 2 === 0;

const WUXING_HIDDEN_WEIGHT = [1, 0.5, 0.3];
const ROOT_HIDDEN_WEIGHT = [1.2, 0.6, 0.3];

const STEM_HE = { 甲己: '土', 乙庚: '金', 丙辛: '水', 丁壬: '木', 戊癸: '火' };
const STEM_CHONG_PAIRS = ['甲庚', '乙辛', '丙壬', '丁癸'];
const BRANCH_HE = { 子丑: '土', 寅亥: '木', 卯戌: '火', 辰酉: '金', 巳申: '水', 午未: '土' };
const SANHE = { 申子辰: '水', 亥卯未: '木', 寅午戌: '火', 巳酉丑: '金' };
const SANHUI = { 寅卯辰: '木', 巳午未: '火', 申酉戌: '金', 亥子丑: '水' };
const BRANCH_CHONG = ['子午', '丑未', '寅申', '卯酉', '辰戌', '巳亥'];
const BRANCH_HAI = ['子未', '丑午', '寅巳', '卯辰', '申亥', '酉戌'];
const BRANCH_PO = ['子酉', '丑辰', '寅亥', '卯午', '巳申', '未戌'];
const XING_GROUPS = [['寅', '巳', '申'], ['丑', '戌', '未'], ['子', '卯']];
const XING_SELF = ['辰', '午', '酉', '亥'];

const hasPair = (list, a, b) => list.includes(a + b) || list.includes(b + a);

function buildRelations(pillars) {
  const stems = ['year', 'month', 'day', 'hour'].map((k) => pillars[k].stem);
  const branches = ['year', 'month', 'day', 'hour'].map((k) => pillars[k].branch);

  const stemOut = [];
  for (let i = 0; i < 4; i++) {
    for (let j = i + 1; j < 4; j++) {
      const a = stems[i];
      const b = stems[j];
      if (a === b) continue;
      const he = STEM_HE[a + b] || STEM_HE[b + a];
      if (he) { stemOut.push({ text: `${a}${b}合化${he}`, rank: 0 }); continue; }
      if (hasPair(STEM_CHONG_PAIRS, a, b)) { stemOut.push({ text: `${a}${b}相冲`, rank: 1 }); continue; }
      const ea = STEM_ELEMENT[a];
      const eb = STEM_ELEMENT[b];
      if (OVERCOMES[ea] === eb) stemOut.push({ text: `${a}克${b}`, rank: 3 });
      else if (OVERCOMES[eb] === ea) stemOut.push({ text: `${b}克${a}`, rank: 3 });
    }
  }

  const branchOut = [];
  const set = new Set(branches);
  const fullSans = [];
  for (const [k, v] of Object.entries(SANHE)) {
    if ([...k].every((c) => set.has(c))) {
      branchOut.push({ text: `${k}三合${v}`, rank: 0 });
      fullSans.push(k);
    }
  }
  const fullHuis = [];
  for (const [k, v] of Object.entries(SANHUI)) {
    if ([...k].every((c) => set.has(c))) {
      branchOut.push({ text: `${k}三会${v}`, rank: 0 });
      fullHuis.push(k);
    }
  }
  for (let i = 0; i < 4; i++) {
    for (let j = i + 1; j < 4; j++) {
      const a = branches[i];
      const b = branches[j];
      if (a === b) {
        if (XING_SELF.includes(a)) branchOut.push({ text: `${a}${b}自刑`, rank: 2 });
        continue;
      }
      const he = BRANCH_HE[a + b] || BRANCH_HE[b + a];
      const sh = Object.keys(SANHE).find((k) => k.includes(a) && k.includes(b));
      const hui = Object.keys(SANHUI).find((k) => k.includes(a) && k.includes(b));
      if (he) {
        branchOut.push({ text: `${a}${b}合${he}`, rank: 0 });
      } else {
        if (sh && !fullSans.includes(sh)) {
          const mid = sh[1];
          const kind = a === mid || b === mid ? '半合' : '拱合';
          branchOut.push({ text: `${a}${b}${kind}${SANHE[sh]}`, rank: 0 });
        }
        if (hui && !fullHuis.includes(hui)) {
          const adj = Math.abs(hui.indexOf(a) - hui.indexOf(b)) === 1;
          branchOut.push({ text: `${a}${b}${adj ? '半会' : '拱会'}${SANHUI[hui]}`, rank: 0 });
        }
      }
      if (hasPair(BRANCH_CHONG, a, b)) branchOut.push({ text: `${a}${b}相冲`, rank: 1 });
      if (hasPair(BRANCH_HAI, a, b)) branchOut.push({ text: `${a}${b}相害`, rank: 2 });
      if (hasPair(BRANCH_PO, a, b)) branchOut.push({ text: `${a}${b}相破`, rank: 2 });
      for (const g of XING_GROUPS) {
        if (g.includes(a) && g.includes(b)) branchOut.push({ text: `${a}${b}相刑`, rank: 2 });
      }
    }
  }

  const uniq = (arr) => {
    const seen = new Set();
    const out = [];
    for (const x of [...arr].sort((p, q) => p.rank - q.rank)) {
      if (!seen.has(x.text)) { seen.add(x.text); out.push(x.text); }
    }
    return out;
  };
  return { stems: uniq(stemOut), branches: uniq(branchOut) };
}

function tenGod(dayStem, otherStem) {
  const me = STEM_ELEMENT[dayStem];
  const it = STEM_ELEMENT[otherStem];
  const samePolarity = isYangStem(dayStem) === isYangStem(otherStem);
  if (me === it) return samePolarity ? '比肩' : '劫财';
  if (GENERATES[me] === it) return samePolarity ? '食神' : '伤官';
  if (OVERCOMES[me] === it) return samePolarity ? '偏财' : '正财';
  if (OVERCOMES[it] === me) return samePolarity ? '七杀' : '正官';
  if (GENERATES[it] === me) return samePolarity ? '偏印' : '正印';
  return '?';
}

const NAYIN_NAMES = [
  '海中金', '炉中火', '大林木', '路旁土', '剑锋金',
  '山头火', '涧下水', '城头土', '白蜡金', '杨柳木',
  '泉中水', '屋上土', '霹雳火', '松柏木', '长流水',
  '沙中金', '山下火', '平地木', '壁上土', '金箔金',
  '覆灯火', '天河水', '大驿土', '钗钏金', '桑柘木',
  '大溪水', '沙中土', '天上火', '石榴木', '大海水',
];

function nayin(ganzhiIdx) {
  return NAYIN_NAMES[Math.floor((((ganzhiIdx % 60) + 60) % 60) / 2)];
}

const JIE_TO_MONTH_BRANCH = { 0: 1, 2: 2, 4: 3, 6: 4, 8: 5, 10: 6, 12: 7, 14: 8, 16: 9, 18: 10, 20: 11, 22: 0 };

function pillar(ganzhiIdx, dayStem) {
  const g = ganzhiName(ganzhiIdx);
  const hidden = HIDDEN_STEMS[g.branch];
  return {
    ganzhi: g.name,
    stem: g.stem,
    branch: g.branch,
    stemElement: STEM_ELEMENT[g.stem],
    branchElement: BRANCH_ELEMENT[g.branch],
    stemTenGod: dayStem ? tenGod(dayStem, g.stem) : null,
    hidden: hidden.map((s, i) => ({
      stem: s,
      element: STEM_ELEMENT[s],
      tenGod: dayStem ? tenGod(dayStem, s) : null,
      role: ['本气', '中气', '余气'][i] ?? '余气',
    })),
    nayin: nayin(ganzhiIdx),
  };
}

function applyTrueSolar(jd, longitude) {
  const p = jdToParts(jd);
  if (longitude == null || Number.isNaN(longitude)) {
    return { offsetMinutes: 0, jd, note: '未提供经度，按东八区平太阳时' };
  }
  const longitudeMinutes = (longitude - 120) * 4;
  const eot = equationOfTime(p.year, p.month, p.day);
  const offset = longitudeMinutes + eot;
  return {
    offsetMinutes: Math.round(offset * 10) / 10,
    jd: jd + offset / 1440,
    note: `经度差 ${longitudeMinutes.toFixed(1)} 分 + 均时差 ${eot.toFixed(1)} 分`,
  };
}

function buildBazi(input) {
  const { year, month, day, hour = 0, minute = 0, gender = 'male' } = input;
  const lateZi = input.lateZi !== false;
  const useTrueSolar = input.trueSolar !== false;

  const civilJd = partsToJd({ year, month, day, hour, minute });
  const geo = input.geo || (input.address ? resolveAddress(input.address) : null);
  const longitude = typeof input.longitude === 'number'
    ? input.longitude
    : (geo && typeof geo.lon === 'number' ? geo.lon : undefined);
  const solar = useTrueSolar ? applyTrueSolar(civilJd, longitude) : { offsetMinutes: 0, jd: civilJd, note: '未启用真太阳时' };
  const jd = solar.jd;

  const terms = termWindow(year);
  const prevJieTerm = previousJie(terms, jd);
  const nextJieTerm = nextJie(terms, jd);

  const lichun = terms.find((t) => t.index === 2 && t.year === year);
  const solarYear = lichun && jd < lichun.jd ? year - 1 : year;
  const yearIdx = (((solarYear - 4) % 60) + 60) % 60;
  const yearStem = STEMS[yearIdx % 10];

  const monthBranchIdx = JIE_TO_MONTH_BRANCH[prevJieTerm.index];
  const yinMonthStem = ((STEMS.indexOf(yearStem) % 5) * 2 + 2) % 10;
  const monthOffset = ((monthBranchIdx - 2) % 12 + 12) % 12;
  const monthStemIdx = (yinMonthStem + monthOffset) % 10;
  const monthIdx = sexagenaryIndex(monthStemIdx, monthBranchIdx);

  const jdnBase = Math.floor(jd + 0.5);
  const hourOfDay = jdToParts(jd).hour;
  const jdn = lateZi && hourOfDay >= 23 ? jdnBase + 1 : jdnBase;
  const dayIdx = dayGanzhiIndex(jdn);
  const dayStem = STEMS[dayIdx % 10];

  const hourBranchIdx = Math.floor(((hourOfDay + 1) % 24) / 2);
  const ziHourStem = ((STEMS.indexOf(dayStem) % 5) * 2) % 10;
  const hourStemIdx = (ziHourStem + hourBranchIdx) % 10;
  const hourIdx = sexagenaryIndex(hourStemIdx, hourBranchIdx);

  const pillars = {
    year: pillar(yearIdx, dayStem),
    month: pillar(monthIdx, dayStem),
    day: pillar(dayIdx, dayStem),
    hour: pillar(hourIdx, dayStem),
  };

  const isYangYear = STEMS.indexOf(yearStem) % 2 === 0;
  const forward = (isYangYear && gender === 'male') || (!isYangYear && gender === 'female');
  const spanDays = forward ? nextJieTerm.jd - jd : jd - prevJieTerm.jd;
  const totalMonths = spanDays * 4;
  let startAgeYears = Math.floor(totalMonths / 12);
  let startAgeMonths = Math.round(totalMonths % 12);
  if (startAgeMonths >= 12) { startAgeMonths -= 12; startAgeYears += 1; }

  const dayun = [];
  for (let i = 1; i <= 8; i++) {
    const idx = (((monthIdx + (forward ? i : -i)) % 60) + 60) % 60;
    const g = ganzhiName(idx);
    dayun.push({
      step: i,
      startAge: startAgeYears + (i - 1) * 10,
      ganzhi: g.name,
      stem: g.stem,
      branch: g.branch,
      stemTenGod: tenGod(dayStem, g.stem),
      nayin: nayin(idx),
    });
  }

  const thisYear = Number(input.nowYear) || new Date().getFullYear();
  const liunian = [];
  for (let y = thisYear; y < thisYear + 10; y++) {
    const idx = (((y - 4) % 60) + 60) % 60;
    liunian.push({
      year: y,
      age: y - solarYear + 1,
      ganzhi: ganzhiName(idx).name,
      stemTenGod: tenGod(dayStem, ganzhiName(idx).stem),
    });
  }

  const wuxing = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
  for (const p of Object.values(pillars)) {
    wuxing[p.stemElement] += 1;
    p.hidden.forEach((h, i) => {
      wuxing[h.element] += WUXING_HIDDEN_WEIGHT[i] ?? 0.1;
    });
  }
  for (const k of Object.keys(wuxing)) wuxing[k] = Math.round(wuxing[k] * 10) / 10;

  const xunStart = Math.floor(dayIdx / 10) * 10;
  const kongwang = [
    BRANCHES[(xunStart + 10) % 12],
    BRANCHES[(xunStart + 11) % 12],
  ];

  const CHANGSHENG = ['长生', '沐浴', '冠带', '临官', '帝旺', '衰', '病', '死', '墓', '绝', '胎', '养'];
  const CS_START = { 甲: 11, 乙: 6, 丙: 2, 丁: 9, 戊: 2, 己: 9, 庚: 5, 辛: 0, 壬: 8, 癸: 3 };
  const isYang = (s) => STEMS.indexOf(s) % 2 === 0;

  function changsheng(stem, branch) {
    const start = CS_START[stem];
    const bi = BRANCHES.indexOf(branch);
    const step = isYang(stem) ? bi - start : start - bi;
    return CHANGSHENG[((step % 12) + 12) % 12];
  }

  function xunKong(ganzhi) {
    const idx = sexagenaryIndex(STEMS.indexOf(ganzhi[0]), BRANCHES.indexOf(ganzhi[1]));
    const start = Math.floor(idx / 10) * 10;
    return [BRANCHES[(start + 10) % 12], BRANCHES[(start + 11) % 12]];
  }

  const monthBranch = pillars.month.branch;

  const shensha = computeBaziShensha(pillars, kongwang);

  for (const key of ['year', 'month', 'day', 'hour']) {
    const pl = pillars[key];
    pl.dishi = changsheng(dayStem, pl.branch);
    pl.zizuo = changsheng(pl.stem, pl.branch);
    pl.kongwang = xunKong(pl.ganzhi);
    pl.shensha = shensha.detail[key].map((x) => x.name);
    pl.shenshaDetail = shensha.detail[key];
  }

  const SEASON_EL = { 寅: '木', 卯: '木', 巳: '火', 午: '火', 申: '金', 酉: '金', 亥: '水', 子: '水', 辰: '土', 戌: '土', 丑: '土', 未: '土' };
  const me = STEM_ELEMENT[dayStem];
  const seasonEl = SEASON_EL[monthBranch];
  let monthW;
  let monthWord;
  if (me === seasonEl) { monthW = 3; monthWord = '旺'; }
  else if (GENERATES[seasonEl] === me) { monthW = 2; monthWord = '相'; }
  else if (GENERATES[me] === seasonEl) { monthW = 1; monthWord = '休'; }
  else if (OVERCOMES[me] === seasonEl) { monthW = 0.5; monthWord = '囚'; }
  else { monthW = 0; monthWord = '死'; }

  let rootScore = 0;
  const rootBranches = [];
  for (const key of ['year', 'month', 'day', 'hour']) {
    const pl = pillars[key];
    let hit = false;
    pl.hidden.forEach((h, i) => {
      if (STEM_ELEMENT[h.stem] === me) { rootScore += ROOT_HIDDEN_WEIGHT[i] ?? 0.1; hit = true; }
      else if (GENERATES[STEM_ELEMENT[h.stem]] === me) { rootScore += (ROOT_HIDDEN_WEIGHT[i] ?? 0.1) * 0.4; hit = true; }
    });
    if (hit) rootBranches.push(pl.branch);
  }

  let helpScore = 0;
  const helpers = [];
  const drainers = [];
  for (const key of ['year', 'month', 'hour']) {
    const st = pillars[key].stem;
    const el2 = STEM_ELEMENT[st];
    if (el2 === me) { helpScore += 1; helpers.push(st); }
    else if (GENERATES[el2] === me) { helpScore += 0.8; helpers.push(st); }
    else if (OVERCOMES[el2] === me) { helpScore -= 1; drainers.push(st); }
    else if (OVERCOMES[me] === el2) { helpScore -= 0.8; drainers.push(st); }
    else { helpScore -= 0.5; drainers.push(st); }
  }

  const total = Math.round((monthW + rootScore + helpScore) * 10) / 10;
  const level = total >= 4 ? '身强' : total >= 2.5 ? '偏强' : total >= 1.5 ? '中和' : total >= 0.5 ? '偏弱' : '身弱';
  const strength = {
    level,
    score: total,
    detail: `月令${monthBranch}${seasonEl}，日主${me}${monthWord}(${monthW})；通根${rootBranches.join('') || '无'}(${rootScore.toFixed(1)})；天干帮扶${helpers.join('') || '无'}／耗泄${drainers.join('') || '无'}(${helpScore.toFixed(1)})`,
    method: '月令权重 3/2/1/0.5/0 + 地支藏干通根 + 天干帮扶，量化后分档；属简化算法，非唯一流派',
    parts: {
      season: { branch: monthBranch, element: seasonEl, word: monthWord, weight: monthW },
      roots: rootBranches,
      rootScore: Math.round(rootScore * 10) / 10,
      helpers,
      drainers,
      helpScore: Math.round(helpScore * 10) / 10,
    },
  };

  const frame = analyzeBaziFrame({ pillars, dayStem, monthBranch, strength, wuxing });

  const pairRel = (a, b) => {
    if (!a || !b) return [];
    if (a === b) return XING_SELF.includes(a) ? ['自刑'] : [];
    const out = [];
    if (BRANCH_HE[a + b] || BRANCH_HE[b + a]) out.push('合');
    if (hasPair(BRANCH_CHONG, a, b)) out.push('冲');
    if (hasPair(BRANCH_HAI, a, b)) out.push('害');
    if (hasPair(BRANCH_PO, a, b)) out.push('破');
    for (const g of XING_GROUPS) if (g.includes(a) && g.includes(b)) out.push('刑');
    return out;
  };
  const natalBranches = ['year', 'month', 'day', 'hour'].map((k) => pillars[k].branch);
  const relOf = (branch) => {
    const seen = new Set();
    const out = [];
    for (const b of natalBranches) {
      for (const r of pairRel(b, branch)) {
        const t = r + b;
        if (!seen.has(t)) { seen.add(t); out.push(t); }
      }
    }
    return out;
  };
  for (const d of dayun) {
    d.relations = relOf(d.branch);
    d.luck = scoreLuck(d.ganzhi, frame);
  }
  for (const l of liunian) {
    l.relations = relOf(l.ganzhi[1]);
    l.luck = scoreLuck(l.ganzhi, frame);
  }

  const p = jdToParts(jd);

  const mStemIdx = STEMS.indexOf(pillars.month.stem);
  const mBranchIdx = BRANCHES.indexOf(pillars.month.branch);
  const taiyuan = ganzhiName(sexagenaryIndex((mStemIdx + 1) % 10, (mBranchIdx + 3) % 12));
  const hourBrIdxForGong = BRANCHES.indexOf(pillars.hour.branch);
  const soulIdx = (((mBranchIdx - hourBrIdxForGong) % 12) + 12) % 12;
  const yinStem = ((STEMS.indexOf(pillars.year.stem) % 5) * 2 + 2) % 10;
  const soulStemIdx = (yinStem + ((soulIdx - 2 + 12) % 12)) % 10;
  const minggong = ganzhiName(sexagenaryIndex(soulStemIdx, soulIdx));
  const bodyIdx = (soulIdx + 6) % 12;
  const bodyStemIdx = (yinStem + ((bodyIdx - 2 + 12) % 12)) % 10;
  const shengong = ganzhiName(sexagenaryIndex(bodyStemIdx, bodyIdx));

  return {
    system: 'bazi',
    relations: buildRelations(pillars),
    palaces: {
      taiyuan: { ganzhi: taiyuan.name, note: '月干进一、月支进三' },
      minggong: { ganzhi: minggong.name, branch: minggong.branch, note: '子月起正月顺数至生月，再逆数至生时；干按五虎遁' },
      shengong: { ganzhi: shengong.name, branch: shengong.branch, note: '命宫对宫' },
    },
    input: {
      civil: { year, month, day, hour, minute },
      gender,
      longitude: longitude ?? null,
      address: input.address || null,
      geo,
      lateZi,
      trueSolar: useTrueSolar,
    },
    solarTime: {
      civilText: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      trueSolarText: formatJd(jd),
      offsetMinutes: solar.offsetMinutes,
      note: solar.note,
      lunarYearForPillar: solarYear,
    },
    jieqi: {
      previous: { name: prevJieTerm.name, time: formatJd(prevJieTerm.jd) },
      next: { name: nextJieTerm.name, time: formatJd(nextJieTerm.jd) },
      nearBoundaryMinutes: Math.round(Math.min(jd - prevJieTerm.jd, nextJieTerm.jd - jd) * 1440),
    },
    pillars,
    dayMaster: { stem: dayStem, element: STEM_ELEMENT[dayStem], yinYang: isYangStem(dayStem) ? '阳' : '阴' },
    wuxing,
    kongwang,
    shensha,
    dayun: {
      direction: forward ? '顺行' : '逆行',
      rule: `${isYangYear ? '阳' : '阴'}年${gender === 'male' ? '男' : '女'}${forward ? '顺排' : '逆排'}`,
      startAge: { years: startAgeYears, months: startAgeMonths },
      toNextJieDays: Math.round(spanDays * 100) / 100,
      list: dayun,
    },
    strength,
    frame,
    liunian,
    liunianFrom: thisYear,
  };
}

return { HIDDEN_STEMS, STEM_ELEMENT, BRANCH_ELEMENT, buildRelations, tenGod, nayin, applyTrueSolar, buildBazi };
})();

__mods.liuyao = (function () {
const { STEMS, BRANCHES, toJDN, ganzhiName, dayGanzhiIndex } = __mods.calendar;

const TRIGRAM_BITS = {
  乾: [1, 1, 1], 兑: [1, 1, 0], 离: [1, 0, 1], 震: [1, 0, 0],
  巽: [0, 1, 1], 坎: [0, 1, 0], 艮: [0, 0, 1], 坤: [0, 0, 0],
};
const TRIGRAM_BY_VALUE = ['坤', '震', '坎', '兑', '艮', '离', '巽', '乾'];

const bitsValue = (bits) => bits[0] + 2 * bits[1] + 4 * bits[2];

const PALACE_NAMES = {
  乾: ['乾为天', '天风姤', '天山遁', '天地否', '风地观', '山地剥', '火地晋', '火天大有'],
  兑: ['兑为泽', '泽水困', '泽地萃', '泽山咸', '水山蹇', '地山谦', '雷山小过', '雷泽归妹'],
  离: ['离为火', '火山旅', '火风鼎', '火水未济', '山水蒙', '风水涣', '天水讼', '天火同人'],
  震: ['震为雷', '雷地豫', '雷水解', '雷风恒', '地风升', '水风井', '泽风大过', '泽雷随'],
  巽: ['巽为风', '风天小畜', '风火家人', '风雷益', '天雷无妄', '火雷噬嗑', '山雷颐', '山风蛊'],
  坎: ['坎为水', '水泽节', '水雷屯', '水火既济', '泽火革', '雷火丰', '地火明夷', '地水师'],
  艮: ['艮为山', '山火贲', '山天大畜', '山泽损', '火泽睽', '天泽履', '风泽中孚', '风山渐'],
  坤: ['坤为地', '地雷复', '地泽临', '地天泰', '雷天大壮', '泽天夬', '水天需', '水地比'],
};

const PALACE_ELEMENT = {
  乾: '金', 兑: '金', 离: '火', 震: '木', 巽: '木', 坎: '水', 艮: '土', 坤: '土',
};

const SHI_POSITION = [6, 1, 2, 3, 4, 5, 4, 3];

const NAJIA = {
  乾: { gan: ['甲', '壬'], inner: ['子', '寅', '辰'], outer: ['午', '申', '戌'] },
  坤: { gan: ['乙', '癸'], inner: ['未', '巳', '卯'], outer: ['丑', '亥', '酉'] },
  震: { gan: ['庚', '庚'], inner: ['子', '寅', '辰'], outer: ['午', '申', '戌'] },
  巽: { gan: ['辛', '辛'], inner: ['丑', '亥', '酉'], outer: ['未', '巳', '卯'] },
  坎: { gan: ['戊', '戊'], inner: ['寅', '辰', '午'], outer: ['申', '戌', '子'] },
  离: { gan: ['己', '己'], inner: ['卯', '丑', '亥'], outer: ['酉', '未', '巳'] },
  艮: { gan: ['丙', '丙'], inner: ['辰', '午', '申'], outer: ['戌', '子', '寅'] },
  兑: { gan: ['丁', '丁'], inner: ['巳', '卯', '丑'], outer: ['亥', '酉', '未'] },
};

const BRANCH_ELEMENT = {
  子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火',
  午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水',
};

const GENERATES = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const OVERCOMES = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };

const LIUSHEN = ['青龙', '朱雀', '勾陈', '螣蛇', '白虎', '玄武'];
const LIUSHEN_START = { 甲: 0, 乙: 0, 丙: 1, 丁: 1, 戊: 2, 己: 3, 庚: 4, 辛: 4, 壬: 5, 癸: 5 };

function liuqin(palaceElement, branchElement) {
  if (palaceElement === branchElement) return '兄弟';
  if (GENERATES[branchElement] === palaceElement) return '父母';
  if (GENERATES[palaceElement] === branchElement) return '子孙';
  if (OVERCOMES[branchElement] === palaceElement) return '官鬼';
  if (OVERCOMES[palaceElement] === branchElement) return '妻财';
  return '?';
}

const HEXAGRAM_INDEX = new Map();

function flip(bits, positions) {
  const out = bits.slice();
  for (const p of positions) out[p] = out[p] ? 0 : 1;
  return out;
}

for (const [palace, names] of Object.entries(PALACE_NAMES)) {
  const t = TRIGRAM_BITS[palace];
  const variants = [
    { lower: t, upper: t },
    { lower: flip(t, [0]), upper: t },
    { lower: flip(t, [0, 1]), upper: t },
    { lower: flip(t, [0, 1, 2]), upper: t },
    { lower: flip(t, [0, 1, 2]), upper: flip(t, [0]) },
    { lower: flip(t, [0, 1, 2]), upper: flip(t, [0, 1]) },
    { lower: flip(t, [0, 1, 2]), upper: flip(t, [1]) },
    { lower: t, upper: flip(t, [1]) },
  ];
  variants.forEach((v, order) => {
    const upper = TRIGRAM_BY_VALUE[bitsValue(v.upper)];
    const lower = TRIGRAM_BY_VALUE[bitsValue(v.lower)];
    HEXAGRAM_INDEX.set(`${upper}|${lower}`, {
      name: names[order],
      palace,
      palaceElement: PALACE_ELEMENT[palace],
      order,
      upper,
      lower,
      lines: [...v.lower, ...v.upper],
      shi: SHI_POSITION[order],
      ying: SHI_POSITION[order] > 3 ? SHI_POSITION[order] - 3 : SHI_POSITION[order] + 3,
    });
  });
}

const HEXAGRAM_COUNT = HEXAGRAM_INDEX.size;

function hexagramFromBits(bits) {
  const upper = TRIGRAM_BY_VALUE[bitsValue(bits.slice(3))];
  const lower = TRIGRAM_BY_VALUE[bitsValue(bits.slice(0, 3))];
  return HEXAGRAM_INDEX.get(`${upper}|${lower}`);
}

function tossLines(random = Math.random) {
  const lines = [];
  for (let i = 0; i < 6; i++) {
    let sum = 0;
    for (let c = 0; c < 3; c++) sum += random() < 0.5 ? 3 : 2;
    lines.push(sum);
  }
  return lines;
}

function lineToBit(v) {
  return v === 7 || v === 9 ? 1 : 0;
}

function isMoving(v) {
  return v === 6 || v === 9;
}

function buildLiuyao(input = {}) {
  const rawLines = Array.isArray(input.lines) && input.lines.length === 6
    ? input.lines.slice()
    : tossLines(input.random);

  const invalid = rawLines.filter((v) => ![6, 7, 8, 9].includes(v));
  if (invalid.length) throw new Error(`爻值只能是 6/7/8/9，收到 ${JSON.stringify(rawLines)}`);

  const bits = rawLines.map(lineToBit);
  const ben = hexagramFromBits(bits);
  const moving = rawLines.map((v, i) => (isMoving(v) ? i : -1)).filter((i) => i >= 0);
  const bianBits = moving.length ? flip(bits, moving) : null;
  const bian = bianBits ? hexagramFromBits(bianBits) : null;

  const dayGanZhi = input.dayGanZhi ?? (() => {
    const now = new Date();
    const jdn = toJDN(now.getFullYear(), now.getMonth() + 1, now.getDate());
    const g = ganzhiName(dayGanzhiIndex(jdn));
    return { stem: g.stem, branch: g.branch, name: g.name };
  })();

  const liushenStart = LIUSHEN_START[dayGanZhi.stem] ?? 0;

  function decorate(hex, movingSet) {
    const rows = [];
    for (let i = 0; i < 6; i++) {
      const isInner = i < 3;
      const trigram = isInner ? hex.lower : hex.upper;
      const nj = NAJIA[trigram];
      const branch = isInner ? nj.inner[i] : nj.outer[i - 3];
      const gan = isInner ? nj.gan[0] : nj.gan[1];
      const element = BRANCH_ELEMENT[branch];
      const value = rawLines[i];
      rows.push({
        position: i + 1,
        name: ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'][i],
        yinYang: bits[i] ? '阳' : '阴',
        moving: movingSet ? movingSet.has(i) : isMoving(value),
        symbol: bits[i] ? '━━━━━' : '━━ ━━',
        ganzhi: gan + branch,
        stem: gan,
        branch,
        element,
        liuqin: liuqin(hex.palaceElement, element),
        liushen: LIUSHEN[(liushenStart + i) % 6],
      });
    }
    return rows;
  }

  const benRows = decorate(ben, new Set(moving));
  const movingSet = new Set(moving);
  const bianRows = bian ? decorate(bian, new Set()) : null;
  if (bianRows) {
    bianRows.forEach((r, i) => {
      r.changedFrom = movingSet.has(i) ? benRows[i].symbol : null;
    });
  }

  return {
    system: 'liuyao',
    question: input.question ?? null,
    cast: {
      lines: rawLines,
      notation: rawLines.map((v) => ({ 6: '老阴 ✕', 7: '少阳', 8: '少阴', 9: '老阳 ○' }[v])),
      movingPositions: moving.map((i) => i + 1),
    },
    dayGanZhi: { name: dayGanZhi.name, stem: dayGanZhi.stem, branch: dayGanZhi.branch },
    ben: {
      name: ben.name,
      upper: ben.upper,
      lower: ben.lower,
      palace: `${ben.palace}宫`,
      palaceElement: ben.palaceElement,
      shi: ben.shi,
      ying: ben.ying,
      lines: benRows,
    },
    bian: bian
      ? {
        name: bian.name,
        upper: bian.upper,
        lower: bian.lower,
        palace: `${bian.palace}宫`,
        palaceElement: bian.palaceElement,
        shi: bian.shi,
        ying: bian.ying,
        lines: bianRows,
      }
      : null,
  };
}

return { HEXAGRAM_COUNT, hexagramFromBits, tossLines, buildLiuyao };
})();

__mods.ziwei = (function () {
const { STEMS, BRANCHES, ganzhiName, sexagenaryIndex, jdToParts, partsToJd, formatJd } = __mods.calendar;
const { solarToLunar } = __mods.lunar;
const { applyTrueSolar } = __mods.bazi;
const { resolveAddress } = __mods.geo;

const fix = (i) => ((i % 12) + 12) % 12;

const PALACE_NAMES = [
  '命宫', '兄弟', '夫妻', '子女', '财帛', '疾厄',
  '迁移', '交友', '官禄', '田宅', '福德', '父母',
];

const BUREAU = {
  水: { name: '水二局', number: 2 },
  木: { name: '木三局', number: 3 },
  金: { name: '金四局', number: 4 },
  土: { name: '土五局', number: 5 },
  火: { name: '火六局', number: 6 },
};

const NAYIN_NAMES = [
  '海中金', '炉中火', '大林木', '路旁土', '剑锋金',
  '山头火', '涧下水', '城头土', '白蜡金', '杨柳木',
  '泉中水', '屋上土', '霹雳火', '松柏木', '长流水',
  '沙中金', '山下火', '平地木', '壁上土', '金箔金',
  '覆灯火', '天河水', '大驿土', '钗钏金', '桑柘木',
  '大溪水', '沙中土', '天上火', '石榴木', '大海水',
];

function nayinElement(ganzhiIdx) {
  const name = NAYIN_NAMES[Math.floor((((ganzhiIdx % 60) + 60) % 60) / 2)];
  return { name, element: name[2] };
}

const ZIWEI_GROUP = [
  { offset: 0, name: '紫微' }, { offset: -1, name: '天机' }, { offset: -3, name: '太阳' },
  { offset: -4, name: '武曲' }, { offset: -5, name: '天同' }, { offset: -8, name: '廉贞' },
];
const TIANFU_GROUP = [
  { offset: 0, name: '天府' }, { offset: 1, name: '太阴' }, { offset: 2, name: '贪狼' },
  { offset: 3, name: '巨门' }, { offset: 4, name: '天相' }, { offset: 5, name: '天梁' },
  { offset: 6, name: '七杀' }, { offset: 10, name: '破军' },
];

const BRIGHTNESS = {
  紫微: ['平', '庙', '庙', '旺', '得', '旺', '庙', '庙', '旺', '平', '得', '旺'],
  天机: ['庙', '陷', '得', '旺', '利', '平', '庙', '陷', '得', '旺', '利', '平'],
  太阳: ['陷', '陷', '旺', '庙', '旺', '旺', '庙', '得', '得', '平', '陷', '陷'],
  武曲: ['旺', '庙', '得', '利', '庙', '平', '旺', '庙', '得', '利', '庙', '平'],
  天同: ['旺', '陷', '利', '庙', '平', '庙', '陷', '陷', '旺', '平', '平', '庙'],
  廉贞: ['平', '利', '庙', '平', '利', '陷', '平', '利', '庙', '平', '利', '陷'],
  天府: ['庙', '庙', '庙', '得', '庙', '得', '旺', '庙', '得', '旺', '庙', '得'],
  太阴: ['庙', '庙', '陷', '陷', '陷', '陷', '陷', '陷', '利', '旺', '旺', '庙'],
  贪狼: ['旺', '庙', '平', '利', '庙', '陷', '旺', '庙', '平', '利', '庙', '陷'],
  巨门: ['旺', '旺', '庙', '庙', '陷', '旺', '旺', '旺', '庙', '庙', '陷', '旺'],
  天相: ['庙', '庙', '庙', '陷', '得', '得', '庙', '庙', '庙', '陷', '得', '得'],
  天梁: ['庙', '旺', '庙', '庙', '庙', '陷', '庙', '旺', '庙', '庙', '庙', '陷'],
  七杀: ['旺', '庙', '庙', '陷', '庙', '平', '旺', '庙', '庙', '陷', '庙', '平'],
  破军: ['庙', '旺', '得', '陷', '旺', '平', '庙', '旺', '得', '陷', '旺', '平'],
};

const MUTAGEN = {
  甲: { 廉贞: '禄', 破军: '权', 武曲: '科', 太阳: '忌' },
  乙: { 天机: '禄', 天梁: '权', 紫微: '科', 太阴: '忌' },
  丙: { 天同: '禄', 天机: '权', 文昌: '科', 廉贞: '忌' },
  丁: { 太阴: '禄', 天同: '权', 天机: '科', 巨门: '忌' },
  戊: { 贪狼: '禄', 太阴: '权', 右弼: '科', 天机: '忌' },
  己: { 武曲: '禄', 贪狼: '权', 天梁: '科', 文曲: '忌' },
  庚: { 太阳: '禄', 武曲: '权', 太阴: '科', 天同: '忌' },
  辛: { 巨门: '禄', 太阳: '权', 文曲: '科', 文昌: '忌' },
  壬: { 天梁: '禄', 紫微: '权', 左辅: '科', 武曲: '忌' },
  癸: { 破军: '禄', 巨门: '权', 太阴: '科', 贪狼: '忌' },
};

const LUCUN = { 甲: 2, 乙: 3, 丙: 5, 丁: 6, 戊: 5, 己: 6, 庚: 8, 辛: 9, 壬: 11, 癸: 0 };
const KUI_YUE = {
  甲: [1, 7], 戊: [1, 7], 庚: [1, 7], 乙: [0, 8], 己: [0, 8],
  丙: [11, 9], 丁: [11, 9], 辛: [6, 2], 壬: [3, 5], 癸: [3, 5],
};

const MING_ZHU = {
  子: '贪狼', 丑: '巨门', 寅: '禄存', 卯: '文曲', 辰: '廉贞', 巳: '武曲',
  午: '破军', 未: '武曲', 申: '廉贞', 酉: '文曲', 戌: '禄存', 亥: '巨门',
};

const SHEN_ZHU = {
  子: '铃星', 丑: '天相', 寅: '天梁', 卯: '天同', 辰: '文昌', 巳: '天机',
  午: '火星', 未: '天相', 申: '天梁', 酉: '天同', 戌: '文昌', 亥: '天机',
};

const TRIADS = {
  寅午戌: [2, 6, 10],
  申子辰: [8, 0, 4],
  巳酉丑: [5, 9, 1],
  亥卯未: [11, 3, 7],
};

function triadOf(branchIndex) {
  const b = fix(branchIndex);
  for (const [name, arr] of Object.entries(TRIADS)) {
    if (arr.includes(b)) return name;
  }
  throw new Error(`三合局未匹配：${branchIndex}`);
}

const DIRECTIONS = {  寅卯辰: [2, 3, 4],
  巳午未: [5, 6, 7],
  申酉戌: [8, 9, 10],
  亥子丑: [11, 0, 1],
};

function directionOf(branchIndex) {
  const b = fix(branchIndex);
  for (const [name, arr] of Object.entries(DIRECTIONS)) {
    if (arr.includes(b)) return name;
  }
  throw new Error(`四正未匹配：${branchIndex}`);
}

const HUO_START = { 寅午戌: 1, 申子辰: 2, 巳酉丑: 3, 亥卯未: 9 };
const LING_START = { 寅午戌: 3, 申子辰: 10, 巳酉丑: 10, 亥卯未: 10 };
const TIANMA = { 寅午戌: 8, 申子辰: 2, 巳酉丑: 11, 亥卯未: 5 };
const XIANCHI = { 寅午戌: 3, 申子辰: 9, 巳酉丑: 6, 亥卯未: 0 };
const HUAGAI = { 寅午戌: 10, 申子辰: 4, 巳酉丑: 1, 亥卯未: 7 };
const JIANGXING = { 寅午戌: 6, 申子辰: 0, 巳酉丑: 9, 亥卯未: 3 };

const GUCHEN = { 寅卯辰: 5, 巳午未: 8, 申酉戌: 11, 亥子丑: 2 };
const GUASU = { 寅卯辰: 1, 巳午未: 4, 申酉戌: 7, 亥子丑: 10 };

function posuIndex(yearBranch) {
  const b = fix(yearBranch);
  if ([0, 6, 3, 9].includes(b)) return 5;  
  if ([2, 8, 5, 11].includes(b)) return 9; 
  return 1;                                
}

const XIAOXIAN_START = {
  male: { 寅午戌: 4, 申子辰: 10, 巳酉丑: 7, 亥卯未: 1 },
  female: { 寅午戌: 10, 申子辰: 4, 巳酉丑: 1, 亥卯未: 7 },
};

const CHANGSHENG_NAMES = ['长生', '沐浴', '冠带', '临官', '帝旺', '衰', '病', '死', '墓', '绝', '胎', '养'];
const BOSHI_NAMES = ['博士', '力士', '青龙', '小耗', '将军', '奏书', '飞廉', '喜神', '病符', '大耗', '伏兵', '官府'];
const JIANGQIAN_NAMES = ['将星', '攀鞍', '岁驿', '息神', '华盖', '劫煞', '灾煞', '天煞', '指背', '咸池', '月煞', '亡神'];
const SUIQI_NAMES = ['岁建', '晦气', '丧门', '贯索', '官符', '小耗', '大耗', '龙德', '白虎', '天德', '吊客', '病符'];

const CHANGSHENG_START = { 2: 8, 3: 11, 4: 5, 5: 8, 6: 2 };

function hourBranchIndex(hour, minute = 0) {
  const total = hour * 60 + minute;
  if (total >= 23 * 60 || total < 60) return 0;
  return Math.floor((total - 60) / 120) + 1;
}

function ziweiTianfuIndex(lunarDay, bureauNumber) {
  let offset = 0;
  let quotient = 0;
  for (;;) {
    const divisor = lunarDay + offset;
    quotient = Math.floor(divisor / bureauNumber);
    if (divisor % bureauNumber === 0) break;
    offset++;
    if (offset > 60) throw new Error('紫微定位失败');
  }
  quotient %= 12;
  let yinBased = quotient - 1;
  yinBased += offset % 2 === 0 ? offset : -offset;
  const ziwei = fix(yinBased + 2);
  return { ziwei, tianfu: fix(4 - ziwei) };
}

function xiaoxianAge(branchIndex, triad, gender) {
  const start = XIAOXIAN_START[gender === 'female' ? 'female' : 'male'][triad];
  const b = fix(branchIndex);
  return gender === 'female' ? fix(start - b) + 1 : fix(b - start) + 1;
}

function buildZiwei(input) {
  const { year: cy, month: cm, day: cd, hour: ch = 0, minute: cmin = 0, gender = 'male' } = input;
  const useTrueSolar = input.trueSolar !== false;
  const geo = input.geo || (input.address ? resolveAddress(input.address) : null);
  const longitude = typeof input.longitude === 'number'
    ? input.longitude
    : (geo && typeof geo.lon === 'number' ? geo.lon : undefined);
  const civilJd = partsToJd({ year: cy, month: cm, day: cd, hour: ch, minute: cmin });
  const solar = useTrueSolar
    ? applyTrueSolar(civilJd, longitude)
    : { offsetMinutes: 0, jd: civilJd, note: '未启用真太阳时' };
  const eff = jdToParts(solar.jd);
  const year = eff.year;
  const month = eff.month;
  const day = eff.day;
  const hour = eff.hour;
  const minute = eff.minute;

  const lunarRaw = solarToLunar(year, month, day);
  const lunarMonth = lunarRaw.isLeap && input.leapAsNext
    ? (lunarRaw.month % 12) + 1
    : lunarRaw.month;
  const lunarDay = lunarRaw.day;

  const hb = hourBranchIndex(hour, minute);
  const hourBranch = BRANCHES[hb];

  const yearGanzhi = ganzhiName((((lunarRaw.lunarYear - 4) % 60) + 60) % 60);
  const yearStem = yearGanzhi.stem;
  const yb = BRANCHES.indexOf(yearGanzhi.branch);
  const triad = triadOf(yb);

  const soulIndex = fix(2 + (lunarMonth - 1) - hb);
  const bodyIndex = fix(2 + (lunarMonth - 1) + hb);

  const yinStem = ((STEMS.indexOf(yearStem) % 5) * 2 + 2) % 10;
  const soulStem = (yinStem + fix(soulIndex - 2)) % 10;
  const soulNayin = nayinElement(sexagenaryIndex(soulStem, soulIndex));
  const bureau = BUREAU[soulNayin.element];

  const { ziwei, tianfu } = ziweiTianfuIndex(lunarDay, bureau.number);

  const starsByBranch = Array.from({ length: 12 }, () => []);
  const put = (branch, name, type) => {
    const idx = fix(branch);
    const star = { name, type };
    if (type === '主星' && BRIGHTNESS[name]) {
      const b = BRIGHTNESS[name][idx];
      if (b) star.brightness = b;
    }
    starsByBranch[idx].push(star);
  };

  for (const s of ZIWEI_GROUP) put(ziwei + s.offset, s.name, '主星');
  for (const s of TIANFU_GROUP) put(tianfu + s.offset, s.name, '主星');

  const wenchang = fix(10 - hb);
  const wenqu = fix(4 + hb);
  put(wenchang, '文昌', '辅星');
  put(wenqu, '文曲', '辅星');
  const zuofu = fix(4 + (lunarMonth - 1));
  const youbi = fix(10 - (lunarMonth - 1));
  put(zuofu, '左辅', '辅星');
  put(youbi, '右弼', '辅星');
  put(6 + hb, '台辅', '吉星');     // 午起子时顺行
  put(2 + hb, '封诰', '吉星');     // 寅起子时顺行

  const lucun = LUCUN[yearStem];
  put(lucun, '禄存', '吉星');
  put(lucun + 1, '擎羊', '煞星');
  put(lucun - 1, '陀罗', '煞星');
  const [kui, yue] = KUI_YUE[yearStem];
  put(kui, '天魁', '吉星');
  put(yue, '天钺', '吉星');

  const hongluan = fix(3 - yb);
  put(hongluan, '红鸾', '吉星');
  put(hongluan + 6, '天喜', '吉星');
  put(6 - yb, '天哭', '煞星');
  put(6 + yb, '天虚', '煞星');
  put(4 + yb, '龙池', '吉星');
  put(10 - yb, '凤阁', '吉星');
  put(TIANMA[triad], '天马', '吉星');
  put(XIANCHI[triad], '咸池', '煞星');
  put(HUAGAI[triad], '华盖', '杂曜');
  const dirGroup = directionOf(yb);
  put(GUCHEN[dirGroup], '孤辰', '煞星');
  put(GUASU[dirGroup], '寡宿', '煞星');
  put(posuIndex(yb), '破碎', '煞星');

  put(9 + (lunarMonth - 1), '天刑', '煞星');  // 酉起正月顺行
  put(1 + (lunarMonth - 1), '天姚', '煞星');  // 丑起正月顺行

  put(zuofu + (lunarDay - 1), '三台', '吉星');
  put(youbi - (lunarDay - 1), '八座', '吉星');
  put(wenchang + (lunarDay - 2), '恩光', '吉星');
  put(wenqu + (lunarDay - 2), '天贵', '吉星');

  put(HUO_START[triad] + hb, '火星', '煞星');
  put(LING_START[triad] + hb, '铃星', '煞星');
  put(11 + hb, '地劫', '煞星');   // 亥宫起子时，顺行
  put(11 - hb, '地空', '煞星');   // 亥宫起子时，逆行

  put(soulIndex - 7, '天伤', '杂曜');
  put(soulIndex - 5, '天使', '杂曜');

  const mutagenMap = MUTAGEN[yearStem] ?? {};
  for (const list of starsByBranch) {
    for (const star of list) {
      if (mutagenMap[star.name]) star.mutagen = mutagenMap[star.name];
    }
  }

  const palaceNames = [];
  for (let i = 0; i < 12; i++) palaceNames[fix(soulIndex - i)] = PALACE_NAMES[i];

  const yearYang = STEMS.indexOf(yearStem) % 2 === 0;
  const forward = (yearYang && gender === 'male') || (!yearYang && gender === 'female');
  const startAge = bureau.number;

  const csStart = CHANGSHENG_START[bureau.number];
  const shenshaAt = (branch) => {
    const d = forward ? 1 : -1;
    return {
      changsheng: CHANGSHENG_NAMES[fix(d * (branch - csStart))],
      boshi: BOSHI_NAMES[fix(d * (branch - lucun))],
      jiangqian: JIANGQIAN_NAMES[fix(branch - JIANGXING[triad])],
      suiqi: SUIQI_NAMES[fix(branch - yb)],
    };
  };

  const palaces = [];
  for (let i = 0; i < 12; i++) {
    const branch = fix(soulIndex - i);
    const stem = (yinStem + fix(branch - 2)) % 10;
    const stepIndex = forward ? fix(branch - soulIndex) : fix(soulIndex - branch);
    const dxStart = startAge + stepIndex * 10;
    const gz = STEMS[stem] + BRANCHES[branch];
    const pal = MUTAGEN[STEMS[stem]] ?? {};
    const selfHua = starsByBranch[branch]
      .filter((s) => pal[s.name])
      .map((s) => ({ star: s.name, type: pal[s.name] }));
    palaces.push({
      palace: palaceNames[branch],
      branch: BRANCHES[branch],
      stem: STEMS[stem],
      ganzhi: gz,
      isSoul: branch === soulIndex,
      isBody: branch === bodyIndex,
      stars: starsByBranch[branch].map((s) => ({ ...s })),
      shensha: shenshaAt(branch),
      selfHua,
      daxian: {
        start: dxStart,
        end: dxStart + 9,
        stem: STEMS[stem],
        mutagen: Object.entries(MUTAGEN[STEMS[stem]] ?? {}).map(([s, k]) => `${s}化${k}`),
      },
      xiaoxian: { age: xiaoxianAge(branch, triad, gender) },
      sanfang: [branch, branch + 4, branch + 8, branch + 6]
        .map((x) => palaceNames[fix(x)]),
    });
  }

  const changqu = (() => {
    const set = new Set([wenchang, wenqu]);
    let relation;
    if (wenchang === wenqu) relation = `同宫于${BRANCHES[wenchang]}`;
    else if (set.has(0) && set.has(2)) relation = '夹丑（子·寅）';
    else if (set.has(6) && set.has(8)) relation = '夹未（午·申）';
    else if (set.has(5) && set.has(9)) relation = '丑三合（巳·酉）';
    else if (set.has(11) && set.has(3)) relation = '未三合（亥·卯）';
    else relation = '与丑未无关';

    const sanfang = [soulIndex, fix(soulIndex + 4), fix(soulIndex + 8), fix(soulIndex + 6)];
    const pick = (branch, name) => {
      const stars = starsByBranch[branch];
      const self = stars.find((s) => s.name === name) || {};
      return {
        branch: BRANCHES[branch],
        palace: palaceNames[branch],
        mutagen: self.mutagen ?? null,
        sha: stars.filter((s) => s.type === '煞星').map((s) => s.name),
      };
    };
    const wc = pick(wenchang, '文昌');
    const wq = pick(wenqu, '文曲');
    const jiBranches = [wc, wq].filter((x) => x.mutagen === '忌').map((x) => x.branch);
    const shaAll = [...new Set([...wc.sha, ...wq.sha])];
    const tone = jiBranches.length
      ? { label: '杂', reason: `昌曲化忌于${jiBranches.join('、')}` }
      : shaAll.length >= 2
        ? { label: '杂', reason: `昌曲两宫会煞 ${shaAll.join('、')}` }
        : { label: '清', reason: '昌曲无化忌、不明显会煞' };

    return {
      relation,
      inSoulSanfang: sanfang.includes(wenchang) || sanfang.includes(wenqu),
      wenchang: wc,
      wenqu: wq,
      absorb: tone,
    };
  })();

  const thisYear = new Date().getFullYear();
  const liunian = [];
  for (let y = thisYear; y < thisYear + 12; y++) {
    const gz = ganzhiName((((y - 4) % 60) + 60) % 60);
    const b = BRANCHES.indexOf(gz.branch);
    const lu = LUCUN[gz.stem];
    const age = y - lunarRaw.lunarYear + 1;
    const xxAge = ((age - 1) % 12) + 1;
    const xxPalace = palaces.find((p) => p.xiaoxian.age === xxAge);
    const dxPalace = palaces.find((p) => age >= p.daxian.start && age <= p.daxian.end);
    liunian.push({
      year: y,
      ganzhi: gz.name,
      age,
      lifePalace: { branch: gz.branch, palace: palaceNames[b] },
      doujun: BRANCHES[fix(b - (lunarMonth - 1) + hb)],
      sanfang: [fix(b), fix(b + 4), fix(b + 8), fix(b + 6)].map((x) => palaceNames[x]),
      liulu: BRANCHES[lu],
      liuyang: BRANCHES[fix(lu + 1)],
      liutuo: BRANCHES[fix(lu - 1)],
      liukui: BRANCHES[KUI_YUE[gz.stem][0]],
      liuyue: BRANCHES[KUI_YUE[gz.stem][1]],
      mutagen: Object.entries(MUTAGEN[gz.stem] ?? {}).map(([s, k]) => `${s}化${k}`),
      daxian: dxPalace
        ? { palace: dxPalace.palace, start: dxPalace.daxian.start, end: dxPalace.daxian.end }
        : null,
      xiaoxian: xxPalace ? { age: xxAge, palace: xxPalace.palace } : null,
    });
  }

  const chart = {
    system: 'ziwei',
    input: {
      year: cy, month: cm, day: cd, hour: ch, minute: cmin,
      gender,
      leapAsNext: Boolean(input.leapAsNext),
      longitude: longitude ?? null,
      address: input.address || null,
      geo,
      trueSolar: useTrueSolar,
    },
    solarTime: {
      civilText: `${cy}-${String(cm).padStart(2, '0')}-${String(cd).padStart(2, '0')} ${String(ch).padStart(2, '0')}:${String(cmin).padStart(2, '0')}`,
      trueSolarText: formatJd(solar.jd),
      offsetMinutes: solar.offsetMinutes,
      note: solar.note,
    },
    lunar: {
      year: lunarRaw.lunarYear,
      month: lunarMonth,
      day: lunarDay,
      isLeap: lunarRaw.isLeap,
      monthStart: lunarRaw.monthStart,
      ...(lunarRaw.isLeap ? { note: '闰月按本月起盘（可用 leapAsNext 改为按次月）' } : {}),
    },
    hourBranch,
    yearGanzhi: yearGanzhi.name,
    soul: {
      palace: '命宫',
      branch: BRANCHES[soulIndex],
      stem: STEMS[soulStem],
      ganzhi: STEMS[soulStem] + BRANCHES[soulIndex],
      nayin: soulNayin.name,
    },
    body: { palace: '身宫', branch: BRANCHES[bodyIndex], lands: palaceNames[bodyIndex] },
    lifeMaster: MING_ZHU[BRANCHES[soulIndex]],
    bodyMaster: SHEN_ZHU[BRANCHES[yb]],
    doujun: {
      zinian: BRANCHES[fix(hb - (lunarMonth - 1))],
      rule: '流年支起正月，逆数至生月，再起子时顺数至生时',
    },
    bureau: { name: bureau.name, number: bureau.number, element: soulNayin.element },
    ziwei: BRANCHES[ziwei],
    tianfu: BRANCHES[tianfu],
    changqu,
    palaces,
    liunian,
    daxian: {
      direction: forward ? '顺行' : '逆行',
      rule: `${yearYang ? '阳' : '阴'}年${gender === 'male' ? '男' : '女'}${forward ? '顺行' : '逆行'}`,
      startAge,
    },
    xiaoxianRule: {
      start: XIAOXIAN_START[gender === 'female' ? 'female' : 'male'][triad],
      direction: gender === 'male' ? '顺行' : '逆行',
      note: '小限一岁起宫按年支三合，男顺女逆，每宫一岁，十二年一周',
    },
    rules: {
      ziweiPlacement: '借数法：局数除日数取商，商数自寅宫顺行，借数奇逆偶顺',
      mutagen: '生年四化用中州派常用表；庚干各派有异（有以天同化科、太阴化忌者）',
      leapMonth: '闰月默认按本月，可切换为按次月',
      auxStars: '火铃按年支三合起点顺数至生时；羊陀夹禄存；魁钺按年干；地空亥起子时逆行、地劫顺行；三台八座随辅弼；恩光天贵随昌曲退一位；台辅封诰按时支',
      shensha: '长生、博士随大限顺逆；将前、岁前恒顺行；天伤恒在交友、天使恒在疾厄',
      masters: '命主按命宫地支，身主按生年地支',
      liunian: '流年命宫取该年地支宫；三方四正为本宫与 +4/+8/+6；并给该年所属大限与小限',
      changqu: '昌曲落宫只由时支决定，故与丑未的关系（夹/三合/同宫/无关）是结构性结论；absorb 的「清/杂」是启发式标记，依据昌曲化忌与会煞，不是断语',
    },
  };

  chart.patterns = detectPatterns(chart);
  chart.daxianList = daxianList(chart);
  enrichLiunian(chart);
  chart.flow = flowOf(chart, input.asOf);
  chart.patternSummary = {
    count: chart.patterns.length,
    good: chart.patterns.filter((p) => p.tone === 'good').map((p) => p.name),
    bad: chart.patterns.filter((p) => p.tone === 'bad').map((p) => p.name),
    note: '格局只描述结构，不作吉凶断语；同一命盘可并存吉格与忌格',
  };
  return chart;
}

function starBranchOf(chart, name) {
  const p = chart.palaces.find((x) => x.stars.some((s) => s.name === name));
  return p ? BRANCHES.indexOf(p.branch) : -1;
}

function palaceAt(chart, branchIndex) {
  const b = fix(branchIndex);
  return chart.palaces.find((p) => BRANCHES.indexOf(p.branch) === b);
}

function detectPatterns(chart) {
  const soul = chart.palaces.find((p) => p.isSoul);
  const soulIdx = BRANCHES.indexOf(soul.branch);
  const sanfang = [soulIdx, fix(soulIdx + 4), fix(soulIdx + 8), fix(soulIdx + 6)];
  const starsIn = (indices) => new Set(indices.flatMap((b) => palaceAt(chart, b)?.stars.map((s) => s.name) ?? []));
  const near = starsIn(sanfang);
  const soulStars = soul.stars.filter((s) => s.type === '主星').map((s) => s.name);
  const out = [];

  const add = (name, evidence) => out.push({ name, evidence });

  if (soulStars.length === 0) add('命无正曜', '命宫无十四主星，需借对宫安星');
  if (soulStars.some((s) => ['七杀', '破军', '贪狼'].includes(s))) {
    add('杀破狼', `命宫坐 ${soulStars.filter((s) => ['七杀', '破军', '贪狼'].includes(s)).join('、')}`);
  }
  const jyTL = ['天机', '太阴', '天同', '天梁'];
  if (jyTL.every((s) => near.has(s)) && soulStars.some((s) => jyTL.includes(s))) {
    add('机月同梁', '命宫三方四正会齐天机、太阴、天同、天梁');
  }
  if (soulIdx === 11 && starBranchOf(chart, '太阴') === 11) add('月朗天门', '太阴在亥守命');
  if (soulIdx === 3 && starBranchOf(chart, '太阳') === 3) add('日出扶桑', '太阳在卯守命');
  if (near.has('天府') && near.has('天相')) add('府相朝垣', '命宫三方四正见天府、天相');

  const lu = starBranchOf(chart, '禄存');
  const ma = starBranchOf(chart, '天马');
  if (lu >= 0 && ma >= 0 && (lu === ma || fix(lu - ma) === 6)) add('禄马交驰', `禄存在${chart.ziwei && BRANCHES[lu]}，天马在${BRANCHES[ma]}`);

  const huo = starBranchOf(chart, '火星');
  const ling = starBranchOf(chart, '铃星');
  if (fix(soulIdx - 1) === huo && fix(soulIdx + 1) === ling) add('火铃夹命', '火星在命宫前一宫、铃星在后一宫夹命');
  if (fix(soulIdx - 1) === ling && fix(soulIdx + 1) === huo) add('火铃夹命', '铃星与火星夹命');

  const ji = chart.palaces.find((p) => p.stars.some((s) => s.mutagen === '忌'));
  if (ji) {
    const jb = BRANCHES.indexOf(ji.branch);
    if (fix(jb - 1) === starBranchOf(chart, '擎羊') && fix(jb + 1) === starBranchOf(chart, '陀罗')) {
      add('羊陀夹忌', `化忌在${ji.branch}，擎羊陀罗夹之`);
    }
  }

  const lctw = ['铃星', '文昌', '陀罗', '武曲'].map((n) => starBranchOf(chart, n));
  if (lctw.every((b) => b >= 0) && lctw.every((b) => sanfang.includes(fix(b)))) {
    add('铃昌陀武', `铃${BRANCHES[lctw[0]]}·昌${BRANCHES[lctw[1]]}·陀${BRANCHES[lctw[2]]}·武${BRANCHES[lctw[3]]} 会于命宫(${BRANCHES[soulIdx]})三方四正`);
  }

  const hualu = chart.palaces.find((p) => p.stars.some((s) => s.mutagen === '禄'));
  if (hualu && lu >= 0) {
    const hb2 = BRANCHES.indexOf(hualu.branch);
    if (hb2 === lu || fix(hb2 - lu) === 6) add('双禄交流', `禄存在${BRANCHES[lu]}，化禄在${hualu.branch}`);
  }

  const inSoul = (name) => soul.stars.some((s) => s.name === name);
  const nearStar = (name) => near.has(name);
  const jia = (a, b) => {
    const ba = starBranchOf(chart, a);
    const bb = starBranchOf(chart, b);
    return ba >= 0 && bb >= 0 && fix(ba + 1) === soulIdx && fix(bb - 1) === soulIdx;
  };
  const mutagensIn = (indices) => {
    const set = new Set();
    for (const b of indices) for (const s of (palaceAt(chart, b)?.stars ?? [])) if (s.mutagen) set.add(s.mutagen);
    return set;
  };

  if (inSoul('紫微') && inSoul('天府')) add('紫府同宫', '紫微、天府同守命宫');
  if (nearStar('紫微') && nearStar('天府')) add('紫府朝垣', '命宫三方四正会紫微、天府');
  if ((inSoul('紫微') || inSoul('天府')) && ['左辅', '右弼', '天魁', '天钺'].filter(nearStar).length >= 2) {
    const l = ['左辅', '右弼', '天魁', '天钺'].filter(nearStar);
    add('君臣庆会', `紫微/天府坐命，三方会${l.join('、')}`);
  }
  if (soulIdx === 6 && starBranchOf(chart, '紫微') === 6) add('极向离明', '紫微在午守命');
  if ((soulIdx === 0 || soulIdx === 6) && inSoul('七杀')) add('七杀朝斗', `七杀在${BRANCHES[soulIdx]}守命`);
  if ((soulIdx === 0 || soulIdx === 6) && inSoul('破军')) add('英星入庙', `破军在${BRANCHES[soulIdx]}守命`);
  if ((soulIdx === 0 || soulIdx === 6) && inSoul('巨门')) add('石中隐玉', `巨门在${BRANCHES[soulIdx]}守命`);
  if (starBranchOf(chart, '巨门') >= 0 && starBranchOf(chart, '巨门') === starBranchOf(chart, '太阳')) {
    add('巨日同宫', `巨门太阳同宫于${BRANCHES[starBranchOf(chart, '巨门')]}`);
  }

  if (jia('太阳', '太阴')) add('日月夹命', '太阳、太阴夹命宫');
  if (starBranchOf(chart, '太阳') >= 0 && starBranchOf(chart, '太阴') >= 0
    && fix(starBranchOf(chart, '太阳') - starBranchOf(chart, '太阴')) === 6) {
    add('日月对照', `太阳在${BRANCHES[starBranchOf(chart, '太阳')]}，太阴在${BRANCHES[starBranchOf(chart, '太阴')]}，隔宫对照`);
  }

  if (jia('左辅', '右弼')) add('左右夹命', '左辅、右弼夹命宫');
  if (jia('文昌', '文曲')) add('昌曲夹命', '文昌、文曲夹命宫');
  if (jia('天魁', '天钺')) add('魁钺夹命', '天魁、天钺夹命宫');
  if (jia('擎羊', '陀罗')) add('羊陀夹命', '擎羊、陀罗夹命宫');

  const muts = mutagensIn(sanfang);
  if (muts.has('禄') && muts.has('权') && muts.has('科')) add('三奇嘉会', '化禄、化权、化科会于命宫三方四正');
  const luStars = ['禄存', '化禄'].filter((n) => n === '禄存' ? nearStar(n) : muts.has('禄'));
  if (luStars.length === 2) add('双禄朝垣', '禄存与化禄同会命宫三方四正');
  if (near.has('地空') && near.has('地劫') && (inSoul('地空') || inSoul('地劫'))) add('命里逢空', '地空、地劫会命');

  if (soulIdx === 6 && starBranchOf(chart, '擎羊') === 6) add('马头带箭', '擎羊在午守命');
  if (soulIdx === 4 || soulIdx === 10) add('天罗地网', `命宫在${BRANCHES[soulIdx]}，辰戌为天罗地网`);
  const lianzhen = starBranchOf(chart, '廉贞');
  const tianxiang = starBranchOf(chart, '天相');
  const qingyang = starBranchOf(chart, '擎羊');
  if (lianzhen >= 0 && qingyang >= 0 && tianxiang >= 0
    && fix(lianzhen + 1) === tianxiang && fix(qingyang - 1) === tianxiang) {
    add('刑囚夹印', '廉贞与擎羊夹天相（刑囚夹印）');
  }
  if (near.has('贪狼') && (near.has('火星') || near.has('铃星'))) {
    add('火贪铃贪', `贪狼与${near.has('火星') ? '火星' : '铃星'}会于命宫三方四正`);
  }
  if (starBranchOf(chart, '武曲') >= 0 && starBranchOf(chart, '武曲') === starBranchOf(chart, '贪狼')) {
    add('武贪同行', `武曲贪狼同宫于${BRANCHES[starBranchOf(chart, '武曲')]}`);
  }
  if (soulIdx === 0 && inSoul('贪狼')) add('泛水桃花', '贪狼在子守命');

  const seen = new Set();
  return out
    .filter((p) => (seen.has(p.name) ? false : (seen.add(p.name), true)))
    .map((p) => ({ ...p, tone: PATTERN_TONE[p.name] || 'neutral' }));
}

const PATTERN_TONE = {
  紫府同宫: 'good', 紫府朝垣: 'good', 君臣庆会: 'good', 极向离明: 'good',
  七杀朝斗: 'good', 英星入庙: 'good', 石中隐玉: 'good', 巨日同宫: 'good',
  日月夹命: 'good', 日月对照: 'good', 左右夹命: 'good', 昌曲夹命: 'good',
  魁钺夹命: 'good', 三奇嘉会: 'good', 双禄朝垣: 'good', 府相朝垣: 'good',
  禄马交驰: 'good', 月朗天门: 'good', 日出扶桑: 'good', 机月同梁: 'good',
  武贪同行: 'neutral', 命无正曜: 'neutral', 杀破狼: 'neutral', 双禄交流: 'neutral',
  火贪铃贪: 'neutral', 火铃夹命: 'bad', 羊陀夹命: 'bad', 羊陀夹忌: 'bad',
  铃昌陀武: 'bad', 命里逢空: 'bad', 马头带箭: 'bad', 天罗地网: 'bad',
  刑囚夹印: 'bad', 泛水桃花: 'bad',
};

function daxianList(chart) {
  const mainOf = (palaceNames) => {
    const set = new Set();
    for (const name of palaceNames) {
      const p = chart.palaces.find((x) => x.palace === name);
      for (const s of (p?.stars ?? [])) if (s.type === '主星') set.add(s.name);
    }
    return [...set];
  };
  return chart.palaces
    .map((p) => ({
      palace: p.palace,
      branch: p.branch,
      stem: p.stem,
      ganzhi: p.ganzhi,
      ages: [p.daxian.start, p.daxian.end],
      mutagen: p.daxian.mutagen,
      selfHua: p.selfHua,
      sanfang: p.sanfang,
      mainStars: mainOf(p.sanfang),
      mutagenHits: Object.entries(MUTAGEN[p.stem] ?? {}).map(([star, type]) => {
        const b = starBranchOf(chart, star);
        return { star, type, branch: b >= 0 ? BRANCHES[b] : null, palace: b >= 0 ? chart.palaces.find((x) => x.branch === BRANCHES[b])?.palace ?? null : null };
      }),
    }))
    .sort((a, b) => a.ages[0] - b.ages[0]);
}

function enrichLiunian(chart) {
  for (const ln of chart.liunian) {
    const stem = ln.ganzhi[0];
    ln.mutagenHits = Object.entries(MUTAGEN[stem] ?? {}).map(([star, type]) => {
      const b = starBranchOf(chart, star);
      return {
        star,
        type,
        branch: b >= 0 ? BRANCHES[b] : null,
        palace: b >= 0 ? chart.palaces.find((x) => x.branch === BRANCHES[b])?.palace ?? null : null,
      };
    });
    ln.sanfangMainStars = [...new Set(ln.sanfang.flatMap((name) => {
      const p = chart.palaces.find((x) => x.palace === name);
      return (p?.stars ?? []).filter((s) => s.type === '主星').map((s) => s.name);
    }))];
  }
  return chart.liunian;
}

function asOfParts(v) {
  if (!v) return null;
  if (typeof v === 'object') return v;
  const m = String(v).match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T ](\d{1,2}):(\d{1,2}))?$/);
  if (!m) return null;
  return {
    year: Number(m[1]), month: Number(m[2]), day: Number(m[3]),
    hour: m[4] === undefined ? 12 : Number(m[4]),
    minute: m[5] === undefined ? 0 : Number(m[5]),
  };
}

function flowOf(chart, asOf) {
  const now = new Date();
  const a = asOfParts(asOf) || {};
  const Y = a.year || now.getFullYear();
  const M = a.month || now.getMonth() + 1;
  const D = a.day || now.getDate();
  const H = a.hour === undefined ? now.getHours() : a.hour;
  const MI = a.minute === undefined ? now.getMinutes() : a.minute;

  const lr = solarToLunar(Y, M, D);
  const leapAsNext = Boolean(chart.input && chart.input.leapAsNext);
  const natalMonth = chart.lunar.isLeap && leapAsNext ? (chart.lunar.month % 12) + 1 : chart.lunar.month;
  const natalHB = BRANCHES.indexOf(chart.hourBranch);
  const hbNow = hourBranchIndex(H, MI);

  const gz = ganzhiName((((lr.lunarYear - 4) % 60) + 60) % 60);
  const yB = BRANCHES.indexOf(gz.branch);
  const doujun = fix(yB - (natalMonth - 1) + natalHB);
  const mIdx = fix(doujun + (lr.month - 1));
  const dIdx = fix(mIdx + (lr.day - 1));
  const hIdx = fix(dIdx + hbNow);

  const point = (idx) => {
    const br = BRANCHES[idx];
    const p = chart.palaces.find((x) => x.branch === br);
    const stem = p ? p.stem : null;
    const mutagenHits = stem
      ? Object.entries(MUTAGEN[stem] ?? {}).map(([star, type]) => {
        const b = starBranchOf(chart, star);
        return {
          star,
          type,
          branch: b >= 0 ? BRANCHES[b] : null,
          palace: b >= 0 ? chart.palaces.find((x) => x.branch === BRANCHES[b])?.palace ?? null : null,
        };
      })
      : [];
    const tri = [idx, fix(idx + 4), fix(idx + 8), fix(idx + 6)];
    const sanfang = tri.map((x) => chart.palaces.find((q) => q.branch === BRANCHES[x])?.palace ?? null);
    const sanfangMainStars = [...new Set(tri.flatMap((x) => {
      const q = chart.palaces.find((z) => z.branch === BRANCHES[x]);
      return (q?.stars ?? []).filter((s) => s.type === '主星').map((s) => s.name);
    }))];
    return {
      branch: br,
      palace: p ? p.palace : null,
      stem,
      ganzhi: p ? p.ganzhi : null,
      mutagenHits,
      sanfang,
      sanfangMainStars,
    };
  };

  const two = (n) => String(n).padStart(2, '0');
  return {
    asOf: {
      solar: `${Y}-${two(M)}-${two(D)} ${two(H)}:${two(MI)}`,
      lunar: `${lr.lunarYear}年${lr.isLeap ? '闰' : ''}${lr.month}月${lr.day}日${BRANCHES[hbNow]}时`,
      yearGanzhi: gz.name,
      hourBranch: BRANCHES[hbNow],
    },
    year: { ...point(yB), doujun: BRANCHES[doujun] },
    month: { index: lr.month, ...point(mIdx) },
    day: { index: lr.day, ...point(dIdx) },
    hour: { hourIndex: hbNow, ...point(hIdx) },
    rules: '流月命宫自流年斗君（该年支起正月逆数至生月，再起子时顺数至生时）起正月，顺行至该农历月；流日自流月命宫起初一，顺行至该农历日；流时自流日命宫起子时，顺行至该时辰；四化取落点宫的原局宫干',
  };
}

return { PALACE_NAMES, BRIGHTNESS, MUTAGEN, LUCUN, KUI_YUE, MING_ZHU, SHEN_ZHU, triadOf, HUO_START, LING_START, TIANMA, XIANCHI, HUAGAI, JIANGXING, GUCHEN, GUASU, posuIndex, XIAOXIAN_START, CHANGSHENG_NAMES, BOSHI_NAMES, JIANGQIAN_NAMES, SUIQI_NAMES, CHANGSHENG_START, hourBranchIndex, ziweiTianfuIndex, xiaoxianAge, buildZiwei, detectPatterns, daxianList, enrichLiunian, asOfParts, flowOf };
})();

__mods.tarot = (function () {

const MAJOR = [
  ['愚者', '0', '新开始 冒险 纯真 无限可能', '鲁莽 逃避 原地打转 不切实际'],
  ['魔术师', 'I', '行动力 资源整合 化想法为现实 沟通', '夸大 操纵 能力未用 自欺'],
  ['女祭司', 'II', '直觉 潜意识 静观其变 内在智慧', '忽视直觉 秘密 表面化 失焦'],
  ['皇后', 'III', '丰盛 滋养 创造力 孕育', '过度依赖 停滞 消耗 空虚'],
  ['皇帝', 'IV', '秩序 权威 结构 掌控', '专断 僵化 失控 硬撑'],
  ['教皇', 'V', '传统 指导 信念 规范', '教条 反叛 形式主义 盲从'],
  ['恋人', 'VI', '结合 抉择 价值观一致 吸引', '失衡 犹豫 错误选择 貌合神离'],
  ['战车', 'VII', '意志 前进 掌控方向 胜利', '失控 方向不明 蛮干 内耗'],
  ['力量', 'VIII', '温柔的坚定 耐心 驯服 勇气', '自我怀疑 压抑 强撑 失衡'],
  ['隐者', 'IX', '内省 独处 寻求真理 沉淀', '孤立 逃避 封闭 钻牛角尖'],
  ['命运之轮', 'X', '转机 周期 因缘际会 顺势', '停滞 抗拒变化 重复循环 错位'],
  ['正义', 'XI', '公平 因果 权衡 决定', '偏颇 逃避责任 失衡 拖延'],
  ['倒吊人', 'XII', '暂停 换位 牺牲换取洞见 放下', '无谓牺牲 拖延 僵持 白费'],
  ['死神', 'XIII', '结束 转化 断舍离 重生', '抗拒结束 拖泥带水 停滞 恐惧'],
  ['节制', 'XIV', '调和 中道 耐心融合 疗愈', '失衡 极端 急躁 消耗'],
  ['恶魔', 'XV', '欲望 束缚 执念 现实交易', '挣脱 觉察 解除依赖 松绑'],
  ['高塔', 'XVI', '突变 崩塌 真相冲击 解放', '延迟的崩解 避免改变 余震 侥幸'],
  ['星星', 'XVII', '希望 疗愈 指引 长期信心', '失望 信心动摇 修复中 断线'],
  ['月亮', 'XVIII', '迷雾 潜意识 不安 幻象', '迷雾散去 真相浮现 释放 清醒'],
  ['太阳', 'XIX', '成功 光明 活力 坦率', '短暂阴霾 过度乐观 延迟 强颜'],
  ['审判', 'XX', '觉醒 召唤 重生 清算', '自我批判 拒绝面对 迟疑 旧账'],
  ['世界', 'XXI', '完成 圆满 整合 跨越', '未竟 收尾拖延 差一步 循环'],
];

const MAJOR_EXT = [
  ['风', '一脚踏出悬崖也不怕，一切还没被定义'], // 愚者 · 天王星/风
  ['风', '手上的工具已经齐全，想法可以立刻变成现实'], // 魔术师 · 水星
  ['水', '答案还在水面之下，安静比追问更能接近它'], // 女祭司 · 月亮
  ['土', '先把自己养好，丰盛才会从你身上长出来'], // 皇后 · 金星
  ['火', '秩序与边界一旦建立，事情才有谈成的余地'], // 皇帝 · 白羊
  ['土', '旧有的规矩既是保护，也可能成为枷锁'], // 教皇 · 金牛
  ['风', '关系与选择都指向同一件事：你真正看重什么'], // 恋人 · 双子
  ['水', '方向定了就往前，意志是这段路的燃料'], // 战车 · 巨蟹
  ['火', '真正的力量不是压制，而是温柔地与之共处'], // 力量 · 狮子
  ['土', '退到无人处，是为了看清自己手里的那盏灯'], // 隐者 · 处女
  ['火', '周期自己会转，人能做的是在对的时点推一把'], // 命运之轮 · 木星
  ['风', '一切都有对价，愿意付的那部分才算公平'], // 正义 · 天秤
  ['水', '暂停不是失败，换个角度才看得见新的路'], // 倒吊人 · 海王星/水
  ['水', '结束必须真的结束，新的东西才有位置进来'], // 死神 · 天蝎
  ['火', '不偏不倚地调和，耐心把两种东西融成一种'], // 节制 · 射手
  ['土', '欲望本身不是问题，被它牵着走才是'], // 恶魔 · 摩羯
  ['火', '崩塌带走的是假的，剩下才是能重建的地基'], // 高塔 · 火星
  ['风', '在最暗的地方给出希望，方向感来自远方'], // 星星 · 水瓶
  ['水', '看不清的时候，先承认自己在迷雾里'], // 月亮 · 双鱼
  ['火', '结果本身会说话，坦率与明亮就是答案'], // 太阳 · 太阳
  ['火', '被点到名字的时候，要敢于回应并重新出发'], // 审判 · 冥王星/火
  ['土', '一个循环走完，才轮得到下一个开始'], // 世界 · 土星
];

const SUITS = [
  ['权杖', '火', '行动与热情', '冲动受阻'],
  ['圣杯', '水', '情感与关系', '情绪淤积'],
  ['宝剑', '风', '思维与冲突', '思虑过度'],
  ['星币', '土', '现实与资源', '务实停滞'],
];

const MINOR = {
  权杖: [
    ['一', '灵感 起点 行动冲动', '方向未明 拖延 点火即灭'],
    ['二', '规划 远望 抉择', '犹豫 视野受限 迟迟不定'],
    ['三', '拓展 等待成果 布局', '进度延迟 变数 收成不佳'],
    ['四', '稳定 庆祝 归属', '不安 根基松动 表面和谐'],
    ['五', '竞争 摩擦 磨合', '内耗 息事宁人 回避冲突'],
    ['六', '胜利 认可 士气', '虚名 失落 名不副实'],
    ['七', '坚守 防御 立场', '疲于应付 退让 寡不敌众'],
    ['八', '迅速 消息 进展', '延误 混乱 节奏被打断'],
    ['九', '警觉 坚持到底 界限', '疲惫 疑心过重 戒备成疾'],
    ['十', '重担 责任 收尾', '卸下 崩溃边缘 超载'],
    ['侍从', '热忱 尝试 新消息', '热情短暂 难持久 三分钟热度'],
    ['骑士', '冒进 行动 冒险', '莽撞 半途而废 冲动'],
    ['王后', '自信 魅力 感染力', '善妒 自我怀疑 争胜'],
    ['国王', '领导 决断 魄力', '专横 急于求成 独断'],
  ],
  圣杯: [
    ['一', '情感萌发 直觉 新关系', '情感封闭 压抑 不敢投入'],
    ['二', '结合 互许 对等', '失衡 猜疑 貌合神离'],
    ['三', '欢庆 友谊 共享', '过度社交 疏离 流于热闹'],
    ['四', '倦怠 错过 停滞', '重新留意 转机 愿意接住'],
    ['五', '失落 遗憾 执念', '释怀 走出 重新接受'],
    ['六', '怀旧 童真 旧人', '沉溺过去 难放下 美化回忆'],
    ['七', '幻想 选项过多 白日梦', '看清现实 决断 收心'],
    ['八', '离开 寻找意义 转身', '难以割舍 徘徊 反复回头'],
    ['九', '满足 心愿达成 享受', '满足流于表面 贪婪 欲求不满'],
    ['十', '圆满 家庭 归属', '和谐流于表面 疏离 各怀心事'],
    ['侍从', '敏感 讯息 灵感', '情绪化 幼稚 玻璃心'],
    ['骑士', '浪漫 邀约 追寻', '承诺落空 空谈 忽冷忽热'],
    ['王后', '共情 包容 温柔', '情绪淹没 讨好 失去边界'],
    ['国王', '情绪掌控 成熟 稳定', '压抑 冷漠 情绪封锁'],
  ],
  宝剑: [
    ['一', '真相 突破 清晰', '混乱 误解 思绪打结'],
    ['二', '僵持 回避 权衡', '打破僵局 抉择 不得不选'],
    ['三', '心痛 分离 刺伤', '疗愈 放下 结痂'],
    ['四', '休息 恢复 沉淀', '勉强支撑 疲惫 恢复不足'],
    ['五', '争执 失利 代价', '和解 止损 认输'],
    ['六', '过渡 离开 前行', '滞留原地 难行 回头'],
    ['七', '策略 隐瞒 独行', '坦白 被识破 自食其果'],
    ['八', '自我束缚 限制 看不清', '松绑 看清出路 允许自己'],
    ['九', '焦虑 失眠 内耗', '恐惧渐退 松动 天亮了'],
    ['十', '终结 谷底 触底', '触底反弹 重启 止血'],
    ['侍从', '好奇 观察 求知', '口舌 轻率 想太多'],
    ['骑士', '直言 急进 冲撞', '鲁莽 伤人 唐突'],
    ['王后', '理性 明辨 独立', '尖刻 冷硬 苛责'],
    ['国王', '权威 判断 原则', '专断 苛刻 口不择言'],
  ],
  星币: [
    ['一', '务实开端 机会 落地', '错失 根基不稳 空谈'],
    ['二', '平衡 调度 灵活', '失衡 顾此失彼 分身乏术'],
    ['三', '协作 技艺 成果', '配合不畅 各自为政 返工'],
    ['四', '守成 保守 掌控', '松手 匮乏感 抓太紧'],
    ['五', '匮乏 困境 排外', '转机 援手 愿意求助'],
    ['六', '施与受 分享 公平', '付出失衡 计较 人情账'],
    ['七', '评估 耐心 等待', '急躁 白费 收成打折'],
    ['八', '精进 专注 学习', '敷衍 半途 走神'],
    ['九', '自足 丰盛 独立', '依附 虚耗 不配得感'],
    ['十', '基业 家族 长期', '家累 短视 根基松动'],
    ['侍从', '务实 学习 起步', '拖延 眼高手低 迟迟不动'],
    ['骑士', '稳步 推进 可靠', '停滞 保守 磨蹭'],
    ['王后', '照料 丰饶 务实', '操劳 控制 过度付出'],
    ['国王', '稳健 掌控 成果', '固执 贪利 油盐不进'],
  ],
};

const ROMAN = ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI'];

const RANK_META = {
  一: { number: 'A', value: 1, core: '起点，一切刚被点燃' },
  二: { number: '2', value: 2, core: '两股力量之间的平衡' },
  三: { number: '3', value: 3, core: '第一次成形，成果与代价同来' },
  四: { number: '4', value: 4, core: '停下来，把结构暂时稳住' },
  五: { number: '5', value: 5, core: '失衡带来的摩擦' },
  六: { number: '6', value: 6, core: '修复，让事情重新流动' },
  七: { number: '7', value: 7, core: '收成之前的审视与取舍' },
  八: { number: '8', value: 8, core: '把节奏重新握在自己手里' },
  九: { number: '9', value: 9, core: '接近满盈的临界' },
  十: { number: '10', value: 10, core: '一个周期走到收束' },
  侍从: { number: '侍从', value: 11, core: '学徒式的试探' },
  骑士: { number: '骑士', value: 12, core: '带上方向的行动' },
  王后: { number: '王后', value: 13, core: '成熟的照顾与吸引' },
  国王: { number: '国王', value: 14, core: '掌控局面与承担' },
};

const SPREADS = {
  1: [
    { name: '当下指引', hint: '此刻最该被看见、也最该被照做的那一点' },
  ],
  3: [
    { name: '过去', hint: '已经发生、仍在起作用的那部分' },
    { name: '现在', hint: '当下正在发生、你能直接触碰的局面' },
    { name: '未来', hint: '若维持当前走向，事情可能落到的位置' },
  ],
  5: [
    { name: '现状', hint: '眼下真实的地形与手上的资源' },
    { name: '阻碍', hint: '卡住进程、还没被命名的那个结' },
    { name: '建议', hint: '可以主动调整的方向与做法' },
    { name: '结果', hint: '按当前路径走下去的大致落点' },
    { name: '潜在', hint: '尚未浮出水面、却在暗中推动的部分' },
  ],
};

const COURT = ['侍从', '骑士', '王后', '国王'];
const ELEMENT_ORDER = ['火', '水', '风', '土'];
const ELEM_NAME = { 火: '热情与行动', 水: '情感与关系', 风: '思维与沟通', 土: '现实与资源' };
const ELEM_TIP = {
  火: '先做一件让自己动起来的小事，别等状态',
  水: '给情绪留出说话的时间，别急着讲道理',
  风: '把想法写下来再判断，别只在脑子里绕',
  土: '落成一个可执行的步骤，写明时间和预算',
};
const ELEM_WARN = {
  火: '容易过火，别把热情变成压人',
  水: '别被情绪淹没，先分清哪部分是自己的',
  风: '想得太多，记得回到事实和身体',
  土: '别太保守到错过窗口',
};

const POS_TAIL = {
  当下指引: '此刻能做的，就是照着这一面去调整今天的一个具体动作。',
  过去: '它已经发生，但余波仍在决定你现在怎么出手。',
  现在: '这是你此刻可以直接触碰、也可以调整的部分。',
  未来: '若维持现在的走法会往这里靠，但它还不是定局。',
  现状: '先把这一层看清楚，再谈要不要动。',
  阻碍: '它不一定在外面，很多时候是你不肯命名的那一部分。',
  建议: '这条可以当作接下来几天的小实验，而不是教条。',
  结果: '它是当前路径的延长线，换一条路径就会换落点。',
  潜在: '它还没浮出水面，却已经在左右你的选择。',
};

const SYSTEM_NOTE = '塔罗为象征系统，牌义与元素对应存在流派差异；此处采用 RWS（韦特）牌名/编号与黄金黎明的元素归属，仅供自我觉察与娱乐。';

function tarotDeck() {
  const deck = [];
  MAJOR.forEach(([name, numeral, up, down], i) => {
    const [element, core] = MAJOR_EXT[i];
    deck.push({ name, arcana: '大阿卡纳', element, number: numeral, value: i, core, up, down });
  });
  for (const [suit, element, domain] of SUITS) {
    for (const [rankCn, up, down] of MINOR[suit]) {
      const meta = RANK_META[rankCn];
      deck.push({
        name: `${suit}${rankCn}`,
        arcana: '小阿卡纳',
        element,
        domain,
        suit,
        rank: meta.number,
        rankCn,
        number: meta.number,
        value: meta.value,
        core: `${suit}：${meta.core}`,
        up,
        down,
      });
    }
  }
  return deck;
}

const BY_NAME = new Map(tarotDeck().map((c) => [c.name, c]));

const splitKeywords = (s) => String(s || '').split(/\s+/).filter(Boolean);

function stamp(at) {
  if (typeof at === 'string' && at.trim()) return at.trim().replace('T', ' ').slice(0, 16);
  const d = new Date();
  const p = (x) => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

function tarotReading({ question = '', cards = [] } = {}) {
  const q = String(question || '').trim();
  const list = (Array.isArray(cards) ? cards : []).filter((c) => c && c.name);
  const n = list.length;
  if (!n) return ['没有抽到牌面，无法解读。'];

  const names = list.map((c) => c.name).join(' / ');
  const paras = [];

  paras.push(q
    ? `你问的是「${q}」，抽到的是 ${n} 张牌阵（${names}）。塔罗是一套象征系统而不是判决：不同流派对牌义、编号与逆位的取舍略有差异，这里按 RWS（韦特）牌名与黄金黎明的元素对应来读，请把下面的话当作镜子，对照自己的处境取用。`
    : `这次没有具体提问，那就先看牌面本身在说什么。牌阵 ${n} 张（${names}）。塔罗是象征系统，牌义随流派略有差异，这里按 RWS（韦特）与黄金黎明的常见对应来读，读到合用的部分就好。`);

  const idx = list.map((_, i) => i);
  const groups = n <= 3 ? idx.map((i) => [i]) : [idx.slice(0, Math.ceil(n / 2)), idx.slice(Math.ceil(n / 2))];
  for (const group of groups) {
    const lines = group.map((i) => {
      const c = list[i];
      const meta = BY_NAME.get(c.name) || {};
      const kws = (c.keywords && c.keywords.length ? c.keywords : splitKeywords(c.upright ? meta.up : meta.down)).join('、');
      const ori = c.upright === false ? '逆位' : '正位';
      const oriNote = c.upright === false
        ? '逆位并不等于凶，更像这股力量还没顺过来，或用力过了头'
        : '正位，这股力量目前是通的';
      const hint = c.positionHint || (SPREADS[n] && SPREADS[n][i] ? SPREADS[n][i].hint : '这一位要看的是它在你处境里的位置');
      const core = meta.core ? `它的核心是「${meta.core}」，` : '';
      const tail = POS_TAIL[c.position] || '把它放回你的处境里对照，看看哪一句戳中了你。';
      return `${c.position}（${hint}）是「${c.name}」${ori}：${kws}。${core}${oriNote}。${tail}`;
    });
    paras.push(lines.join(''));
  }

  const majorCount = list.filter((c) => c.arcana === '大阿卡纳').length;
  const revCount = list.filter((c) => c.upright === false).length;
  const upCount = n - revCount;
  const elementCount = {};
  for (const c of list) {
    const e = (BY_NAME.get(c.name) || {}).element || c.element;
    if (e) elementCount[e] = (elementCount[e] || 0) + 1;
  }
  const present = ELEMENT_ORDER.filter((e) => elementCount[e]);
  const missing = ELEMENT_ORDER.filter((e) => !elementCount[e]);
  const dominant = present.slice().sort((a, b) => elementCount[b] - elementCount[a])[0];
  const heavy = dominant && elementCount[dominant] * 2 >= n;
  const majorHalf = majorCount * 2 >= n;
  const courtCount = list.filter((c) => COURT.includes(c.rank) || COURT.includes(c.rankCn)).length;
  const pct = Math.round((majorCount / n) * 100);
  const distribution = present.map((e) => `${e}×${elementCount[e]}`).join('、');
  paras.push([
    `${n} 张里有 ${majorCount} 张大阿卡纳（占 ${pct}%），${majorHalf
      ? '达到或超过半数，说明这是「主题层面的大事」，牵动的多半是方向与阶段，而不是细节执行'
      : '不到半数，重点更偏日常层面的推进，先看具体的人与事'}。`,
    `元素分布：${distribution || '无'}（大牌按黄金黎明的元素归属计入，仅作象征参考）；${missing.length
      ? `缺${missing.map((e) => `${e}（${ELEM_NAME[e]}）`).join('、')}，这一块容易被忽略`
      : '四种元素都在，配比还算均衡'}${heavy ? `。${dominant}偏旺，这股力量用得过头会压住别的部分` : ''}。`,
    `宫廷牌 ${courtCount} 张，${courtCount
      ? '说明局面里有具体的人（也可能是你某个侧面的状态）在推动'
      : '没有明显人格化的角色，事情更靠情势本身在走'}；正逆位 ${upCount} 正 ${revCount} 逆，${upCount > revCount
      ? '整体偏顺，逆位那张是全盘的关节'
      : upCount === revCount ? '顺逆各半，正处在拉扯与转换中' : '阻力偏多，先把卡住的部分读透，再谈推进'}。`,
  ].join(''));

  const majorCard = list.find((c) => c.arcana === '大阿卡纳');
  const revCard = list.find((c) => c.upright === false);
  const key = majorCard || revCard || list[0];
  const keyMeta = BY_NAME.get(key.name) || {};
  const keyReason = majorCard
    ? '它出现的地方，往往就是这件事真正被牵动的层级'
    : revCard
      ? '全盘没有大阿卡纳，关节就落在第一张逆位上——那股还没顺过来的力量'
      : '全盘既没有大阿卡纳也没有逆位，走势平顺，就以第一张为参照';
  paras.push(`全盘的关节是「${key.name}」（${key.position}·${key.upright === false ? '逆位' : '正位'}）${keyMeta.core ? `，${keyMeta.core}` : ''}。${keyReason}；其余几张可以看作它在不同位置上的回声。`);

  const tips = [];
  if (revCard) tips.push(`先把「${revCard.name}」逆位指出的卡点处理掉（${(revCard.keywords || []).join('、')}），暂时不要加码推进`);
  if (majorHalf) tips.push('把问题从「怎么办」换成「要不要」：先定方向，方法再慢慢补');
  else tips.push('把注意力放回能立刻做的小事上，先动一件，再看牌面怎么变');
  if (missing.length) tips.push(`补一点${missing[0]}的力量：${ELEM_TIP[missing[0]]}`);
  else if (heavy) tips.push(`${dominant}已经偏旺，${ELEM_WARN[dominant]}`);
  const adviceCard = list.find((c) => c.position === '建议');
  if (adviceCard) tips.push(`把「${adviceCard.name}」${adviceCard.orientation}的关键词（${(adviceCard.keywords || []).join('、')}）当作接下来一周的小练习`);
  const picked = tips.slice(0, 3);
  paras.push(`建议：其一，${picked[0]}；其二，${picked[1]}${picked[2] ? `；其三，${picked[2]}` : ''}。`);

  paras.push('牌是镜子，照出的是你此刻的状态与盲点，不是命运的判决书。涉及医疗、法律、财务等重大决定，请务必咨询对应的专业人士，牌面只用来帮你把问题问清楚。');

  return paras;
}

function drawTarot({ count = 3, question = '', at, random = Math.random } = {}) {
  const n = [1, 3, 5].includes(count) ? count : 3;
  const rand = typeof random === 'function' ? random : Math.random;
  const deck = tarotDeck();
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  const positions = SPREADS[n];
  const cards = deck.slice(0, n).map((c, i) => {
    const upright = rand() < 0.5;
    const pos = positions[i];
    return {
      position: pos.name,
      positionHint: pos.hint,
      name: c.name,
      arcana: c.arcana,
      element: c.element,
      ...(c.domain ? { domain: c.domain } : {}),
      ...(c.suit ? { suit: c.suit } : {}),
      number: c.number,
      ...(c.rank ? { rank: c.rank } : {}),
      ...(c.rankCn ? { rankCn: c.rankCn } : {}),
      value: c.value,
      core: c.core,
      upright,
      orientation: upright ? '正位' : '逆位',
      keywords: splitKeywords(upright ? c.up : c.down),
    };
  });
  const q = (question || '').trim();
  return {
    system: 'tarot',
    question: q || null,
    castAt: stamp(at),
    spread: `${n} 张牌阵（${positions.map((p) => p.name).join(' / ')}）`,
    cards,
    reading: tarotReading({ question: q, cards }),
    systemNote: SYSTEM_NOTE,
  };
}

return { MAJOR, SUITS, MINOR, ROMAN, SPREADS, tarotDeck, tarotReading, drawTarot };
})();

__mods.meihua = (function () {
const { BRANCHES } = __mods.calendar;
const { solarToLunar } = __mods.lunar;
const { hexagramFromBits } = __mods.liuyao;

const TRI_NAME = ['', '乾', '兑', '离', '震', '巽', '坎', '艮', '坤'];
const TRI_BITS = {
  乾: [1, 1, 1], 兑: [1, 1, 0], 离: [1, 0, 1], 震: [1, 0, 0],
  巽: [0, 1, 1], 坎: [0, 1, 0], 艮: [0, 0, 1], 坤: [0, 0, 0],
};
const TRI_ELEMENT = { 乾: '金', 兑: '金', 离: '火', 震: '木', 巽: '木', 坎: '水', 艮: '土', 坤: '土' };
const GENERATES = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const OVERCOMES = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };

const mod8 = (n) => ((n % 8) + 7) % 8 + 1;
const mod6 = (n) => ((n % 6) + 5) % 6 + 1;

function bitsOf(num) {
  return TRI_BITS[TRI_NAME[num]];
}

function hexName(upperNum, lowerNum) {
  const bits = [...bitsOf(lowerNum), ...bitsOf(upperNum)];
  const h = hexagramFromBits(bits);
  return { name: h.name, upper: TRI_NAME[upperNum], lower: TRI_NAME[lowerNum], bits };
}

function relation(bodyEl, useEl) {
  if (bodyEl === useEl) return { level: '吉', text: '体用比和，事顺而稳' };
  if (GENERATES[useEl] === bodyEl) return { level: '大吉', text: `用生体（${useEl}生${bodyEl}），得外力相助` };
  if (GENERATES[bodyEl] === useEl) return { level: '小凶', text: `体生用（${bodyEl}生${useEl}），耗损付出` };
  if (OVERCOMES[bodyEl] === useEl) return { level: '吉', text: `体克用（${bodyEl}克${useEl}），事可为但费力` };
  return { level: '凶', text: `用克体（${useEl}克${bodyEl}），受阻受制` };
}

function buildMeihua(input = {}) {
  const mode = input.mode === 'number' ? 'number' : 'time';
  let upperNum;
  let lowerNum;
  let moving;
  let source;

  if (mode === 'number') {
    const a = Number(input.upper);
    const b = Number(input.lower);
    if (!Number.isFinite(a) || !Number.isFinite(b)) throw new Error('数字起卦需要两个数字（upper / lower）');
    upperNum = mod8(a);
    lowerNum = mod8(b);
    moving = Number.isFinite(Number(input.changing)) && Number(input.changing) > 0
      ? mod6(Number(input.changing))
      : mod6(a + b);
    source = `数字起卦：${a} / ${b}`;
  } else {
    const dt = parseDateTime(input.datetime);
    const lunar = solarToLunar(dt.year, dt.month, dt.day);
    const yearBranch = ((lunar.lunarYear - 4) % 12 + 12) % 12;
    const hb = Math.floor(((dt.hour + 1) % 24) / 2);
    const sum1 = yearBranch + 1 + lunar.month + lunar.day;
    const sum2 = sum1 + hb + 1;
    upperNum = mod8(sum1);
    lowerNum = mod8(sum2);
    moving = mod6(sum2);
    source = `时间起卦：${BRANCHES[yearBranch]}年${lunar.month}月${lunar.day}日${BRANCHES[hb]}时`;
  }

  const ben = hexName(upperNum, lowerNum);
  const bits = ben.bits;

  const changedBits = bits.slice();
  changedBits[moving - 1] = changedBits[moving - 1] ? 0 : 1;
  const bian = hexagramFromBits(changedBits);

  const huLower = [bits[1], bits[2], bits[3]];
  const huUpper = [bits[2], bits[3], bits[4]];
  const hu = hexagramFromBits([...huLower, ...huUpper]);

  const movingInUpper = moving >= 4;
  const bodyTri = movingInUpper ? ben.lower : ben.upper;
  const useTri = movingInUpper ? ben.upper : ben.lower;
  const rel = relation(TRI_ELEMENT[bodyTri], TRI_ELEMENT[useTri]);

  const cuoBits = bits.map((b) => (b ? 0 : 1));
  const zongBits = bits.slice().reverse();
  const cuo = hexagramFromBits(cuoBits);
  const zong = hexagramFromBits(zongBits);

  return {
    system: 'meihua',
    mode,
    source,
    moving,
    movingName: ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'][moving - 1],
    ben: { name: ben.name, upper: ben.upper, lower: ben.lower, element: `${TRI_ELEMENT[ben.upper]}/${TRI_ELEMENT[ben.lower]}` },
    hu: { name: hu.name, upper: hu.upper, lower: hu.lower },
    bian: { name: bian.name, upper: bian.upper, lower: bian.lower },
    cuo: { name: cuo.name },
    zong: { name: zong.name },
    bodyUse: {
      body: { trigram: bodyTri, element: TRI_ELEMENT[bodyTri] },
      use: { trigram: useTri, element: TRI_ELEMENT[useTri] },
      relation: rel.text,
      level: rel.level,
    },
    lines: bits.map((b, i) => ({
      position: i + 1,
      name: ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'][i],
      yinYang: b ? '阳' : '阴',
      moving: i === moving - 1,
    })),
  };
}

function parseDateTime(text) {
  if (typeof text !== 'string' || !text.trim()) throw new Error('时间起卦需要 datetime');
  const m = text.trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T\s](\d{1,2}):(\d{1,2}))?$/);
  if (!m) throw new Error(`无法解析 datetime：「${text}」`);
  return {
    year: Number(m[1]), month: Number(m[2]), day: Number(m[3]),
    hour: Number(m[4] ?? 0), minute: Number(m[5] ?? 0),
  };
}

return { TRI_NAME, TRI_ELEMENT, TRI_BITS, buildMeihua };
})();

__mods.daliuren = (function () {
const { toJDN, dayGanzhiIndex, ganzhiName, termWindow, formatJd } = __mods.calendar;

const GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const TIAN_JIANG = ['贵', '蛇', '雀', '合', '勾', '龙', '空', '虎', '常', '玄', '阴', '后'];
const JIANG_FULL = {
  贵: '贵人', 蛇: '螣蛇', 雀: '朱雀', 合: '六合', 勾: '勾陈', 龙: '青龙',
  空: '天空', 虎: '白虎', 常: '太常', 玄: '玄武', 阴: '太阴', 后: '天后',
};
const YUE_JIANG_NAME = {
  亥: '登明', 戌: '河魁', 酉: '从魁', 申: '传送', 未: '小吉', 午: '胜光',
  巳: '太乙', 辰: '天罡', 卯: '太冲', 寅: '功曹', 丑: '大吉', 子: '神后',
};

const GAN_WUXING = { 甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土', 己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水' };
const ZHI_WUXING = { 子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火', 午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水' };

const SHENG = { 金: '水', 水: '木', 木: '火', 火: '土', 土: '金' };
const KE = { 金: '木', 木: '土', 土: '水', 水: '火', 火: '金' };

function wuxingRelation(shang, xia) {
  if (shang === xia) return '比和';
  if (KE[shang] === xia) return '克';
  if (KE[xia] === shang) return '被克';
  if (SHENG[shang] === xia) return '生';
  if (SHENG[xia] === shang) return '被生';
  return '比和';
}

const LIUQIN_MAP = { 被生: '父母', 生: '子孙', 克: '妻财', 比和: '兄弟', 被克: '官鬼' };

const GAN_JI_GONG = { 甲: '寅', 乙: '辰', 丙: '巳', 丁: '未', 戊: '巳', 己: '未', 庚: '申', 辛: '戌', 壬: '亥', 癸: '丑' };

const YANG_POS = ['巳', '午', '未', '申', '酉', '戌'];

const JIEQI_YUE_JIANG = {
  雨水: '亥', 惊蛰: '亥', 春分: '戌', 清明: '戌', 谷雨: '酉', 立夏: '酉',
  小满: '申', 芒种: '申', 夏至: '未', 小暑: '未', 大暑: '午', 立秋: '午',
  处暑: '巳', 白露: '巳', 秋分: '辰', 寒露: '辰', 霜降: '卯', 立冬: '卯',
  小雪: '寅', 大雪: '寅', 冬至: '丑', 小寒: '丑', 大寒: '子', 立春: '子',
};

const GUIREN_START = {
  甲: { day: '丑', night: '未' }, 戊: { day: '丑', night: '未' }, 庚: { day: '丑', night: '未' },
  乙: { day: '子', night: '申' }, 己: { day: '子', night: '申' },
  丙: { day: '亥', night: '酉' }, 丁: { day: '亥', night: '酉' },
  壬: { day: '巳', night: '卯' }, 癸: { day: '巳', night: '卯' },
  辛: { day: '午', night: '寅' },
};

const DAY_NIGHT_MAP = {
  卯: '昼', 辰: '昼', 巳: '昼', 午: '昼', 未: '昼', 申: '昼',
  酉: '夜', 戌: '夜', 亥: '夜', 子: '夜', 丑: '夜', 寅: '夜',
};

const RI_LU = { 甲: '寅', 乙: '卯', 丙: '巳', 丁: '午', 戊: '巳', 己: '午', 庚: '申', 辛: '酉', 壬: '亥', 癸: '子' };
const YANG_REN = { 甲: '卯', 乙: '辰', 丙: '午', 丁: '未', 戊: '午', 己: '未', 庚: '酉', 辛: '戌', 壬: '子', 癸: '丑' };
const SAN_HE = { 申: '水', 子: '水', 辰: '水', 寅: '火', 午: '火', 戌: '火', 巳: '金', 酉: '金', 丑: '金', 亥: '木', 卯: '木', 未: '木' };
const SAN_HE_SHEN = {
  水: { 驿马: '寅', 桃花: '酉', 华盖: '辰', 劫煞: '巳', 亡神: '亥' },
  火: { 驿马: '申', 桃花: '卯', 华盖: '戌', 劫煞: '亥', 亡神: '巳' },
  金: { 驿马: '亥', 桃花: '午', 华盖: '丑', 劫煞: '寅', 亡神: '申' },
  木: { 驿马: '巳', 桃花: '子', 华盖: '未', 劫煞: '申', 亡神: '寅' },
};

function calcShensha(dayGz) {
  const gan = dayGz[0];
  const zhi = dayGz[1];
  const out = [];
  const push = (name, branch, note) => {
    if (!out.some((x) => x.name === name)) out.push({ name, branch, note });
  };
  if (RI_LU[gan]) push('日禄', RI_LU[gan], '日干临官之位');
  if (YANG_REN[gan]) push('羊刃', YANG_REN[gan], '日干帝旺之位');
  const trio = SAN_HE_SHEN[SAN_HE[zhi]];
  if (trio) {
    push('驿马', trio.驿马, '日支三合冲位，主迁动');
    push('桃花', trio.桃花, '咸池，主情缘');
    push('华盖', trio.华盖, '主孤高、技艺');
    push('劫煞', trio.劫煞, '主意外耗损');
    push('亡神', trio.亡神, '主失脱、心神不定');
  }
  return out;
}

const XUN_KONG = {
  甲子: ['戌', '亥'], 甲戌: ['申', '酉'], 甲申: ['午', '未'],
  甲午: ['辰', '巳'], 甲辰: ['寅', '卯'], 甲寅: ['子', '丑'],
};

const JIA_ZI_60 = Array.from({ length: 60 }, (_, i) => GAN[i % 10] + ZHI[i % 12]);

const ZHI_CHONG = { 子: '午', 午: '子', 丑: '未', 未: '丑', 寅: '申', 申: '寅', 卯: '酉', 酉: '卯', 辰: '戌', 戌: '辰', 巳: '亥', 亥: '巳' };
const YI_MA = { 寅: '申', 午: '申', 戌: '申', 申: '寅', 子: '寅', 辰: '寅', 巳: '亥', 酉: '亥', 丑: '亥', 亥: '巳', 卯: '巳', 未: '巳' };

const BA_ZHUAN_DAYS = ['壬子', '甲寅', '乙卯', '丁巳', '己未', '庚申', '辛酉', '癸亥'];
const GAN_ZHI_SAME_POSITION = ['甲寅', '丁未', '己未', '庚申', '癸丑'];

const yinYang = (s) => (['甲', '丙', '戊', '庚', '壬'].includes(s) || ['子', '寅', '辰', '午', '申', '戌'].includes(s) ? '阳' : '阴');

function tianDiPan(jieqiName, hourZhi, dayGan) {
  const yueJiang = JIEQI_YUE_JIANG[jieqiName] ?? '子';
  const hourIndex = ZHI.indexOf(hourZhi);
  const yueJiangIndex = ZHI.indexOf(yueJiang);
  const tianPan = new Array(12);
  for (let i = 0; i < 12; i++) {
    tianPan[(hourIndex + i) % 12] = ZHI[(yueJiangIndex + i) % 12];
  }
  const dayNight = DAY_NIGHT_MAP[hourZhi] ?? '昼';
  const cfg = GUIREN_START[dayGan];
  const guirenStart = dayNight === '昼' ? cfg.day : cfg.night;
  const guirenIndex = ZHI.indexOf(guirenStart);
  const guirenTianZhi = tianPan[guirenIndex];
  const isReverse = YANG_POS.includes(guirenTianZhi);
  const tianJiang = new Array(12);
  if (isReverse) {
    const rev = ['贵', '后', '阴', '玄', '常', '虎', '空', '龙', '勾', '合', '雀', '蛇'];
    for (let i = 0; i < 12; i++) tianJiang[(guirenIndex + i) % 12] = rev[i];
  } else {
    for (let i = 0; i < 12; i++) tianJiang[(guirenIndex + i) % 12] = TIAN_JIANG[i];
  }
  const diToTian = {};
  const diToJiang = {};
  for (let i = 0; i < 12; i++) {
    diToTian[ZHI[i]] = tianPan[i];
    diToJiang[ZHI[i]] = tianJiang[i];
  }
  return { tianPan, diToTian, diToJiang, yueJiang, dayNight, guirenStart, isReverse };
}

function keRelation(shang, xia) {
  const sw = ZHI_WUXING[shang] ?? GAN_WUXING[shang] ?? '土';
  const xw = ZHI_WUXING[xia] ?? GAN_WUXING[xia] ?? '土';
  const rel = wuxingRelation(sw, xw);
  return { 克: '上克下', 被克: '下贼上', 生: '上生下', 被生: '下生上', 比和: '比和' }[rel] ?? '比和';
}

function siKe(dayGan, dayZhi, tdp) {
  const { diToTian, diToJiang } = tdp;
  const jiGong = GAN_JI_GONG[dayGan];
  const yi = diToTian[jiGong];
  const er = diToTian[yi];
  const san = diToTian[dayZhi];
  const si = diToTian[san];
  const mk = (pos, shang, xia) => ({
    position: pos,
    shang,
    xia,
    jiang: diToJiang[GAN_JI_GONG[xia] ?? xia] ?? '',
    relation: keRelation(shang, xia),
  });
  return [mk(1, yi, dayGan), mk(2, er, yi), mk(3, san, dayZhi), mk(4, si, san)];
}

function analyze(ke) {
  const s = { shangKeXia: 0, xiaZeiShang: 0 };
  for (const k of ke) {
    if (k.relation === '上克下') s.shangKeXia++;
    else if (k.relation === '下贼上') s.xiaZeiShang++;
  }
  return s;
}

function xunKong(dayGz, zhi) {
  const idx = JIA_ZI_60.indexOf(dayGz);
  if (idx < 0) return null;
  const head = JIA_ZI_60[Math.floor(idx / 10) * 10];
  return (XUN_KONG[head] || []).includes(zhi) ? zhi : null;
}

function chuan(pos, zhi, tdp, dayGan, dayGz) {
  const rel = wuxingRelation(GAN_WUXING[dayGan] ?? '土', ZHI_WUXING[zhi] ?? '土');
  return {
    position: pos,
    zhi,
    jiang: tdp.diToJiang[zhi] ?? '',
    jiangFull: JIANG_FULL[tdp.diToJiang[zhi]] ?? '',
    liuQin: LIUQIN_MAP[rel] ?? '兄弟',
    xunKong: xunKong(dayGz, zhi),
  };
}

function checkFanYin(tdp) {
  let cnt = 0;
  for (let i = 0; i < 12; i++) if (ZHI_CHONG[ZHI[i]] === tdp.diToTian[ZHI[i]]) cnt++;
  return cnt >= 6;
}

function sheHaiDepth(shang, xia) {
  const sw = ZHI_WUXING[shang] ?? '土';
  const start = ZHI.indexOf(xia);
  const end = ZHI.indexOf(shang);
  let cnt = 0;
  let cur = start;
  while (cur !== end) {
    if (wuxingRelation(sw, ZHI_WUXING[ZHI[cur]]) === '克') cnt++;
    cur = (cur - 1 + 12) % 12;
  }
  return cnt;
}

function multipleZeiKe(ke, dayGan, target) {
  const m = ke.filter((k) => k.relation === target);
  if (m.length === 1) return { zhi: m[0].shang, geJu: '贼克', detail: target === '下贼上' ? '重审' : '元首' };
  const yy = yinYang(dayGan);
  const same = m.filter((k) => yinYang(k.shang) === yy);
  if (same.length === 1) return { zhi: same[0].shang, geJu: '比用', detail: '知一' };
  const pool = same.length ? same : m;
  const ranked = pool.map((k) => ({ k, d: sheHaiDepth(k.shang, k.xia) })).sort((a, b) => b.d - a.d);
  const tied = ranked.length >= 2 && ranked[0].d === ranked[1].d;
  return { zhi: ranked[0].k.shang, geJu: '涉害', detail: tied ? '察微' : '见机' };
}

function noZeiKe(ke, tdp, dayGan) {
  const dw = GAN_WUXING[dayGan] ?? '土';
  for (const k of ke) {
    const rel = wuxingRelation(ZHI_WUXING[k.shang] ?? '土', dw);
    if (rel === '克') return { zhi: k.shang, geJu: '遥克', detail: '蒿矢' };
    if (rel === '被克') return { zhi: k.shang, geJu: '遥克', detail: '弹射' };
  }
  return { zhi: tdp.diToTian['酉'], geJu: '昴星', detail: yinYang(dayGan) === '阳' ? '虎视' : '冬蛇掩目' };
}

function fanYin(ke, dayGan, dayZhi, stats, isFB) {
  if (isFB) return { zhi: YI_MA[dayZhi] ?? '寅', detail: '绝嗣' };
  for (const rel of ['下贼上', '上克下']) {
    const m = ke.filter((k) => k.relation === rel);
    if (m.length) {
      const yy = yinYang(dayGan);
      const same = m.filter((k) => yinYang(k.shang) === yy);
      return { zhi: (same[0] ?? m[0]).shang, detail: '无依' };
    }
  }
  return { zhi: YI_MA[dayZhi] ?? '寅', detail: '无亲' };
}

function buildDaliuren(input) {
  const { year, month, day, hour = 0, minute = 0 } = input;
  const lateZi = input.lateZi !== false;
  const jdnBase = toJDN(year, month, day);
  const jdn = lateZi && hour >= 23 ? jdnBase + 1 : jdnBase;
  const dayIdx = dayGanzhiIndex(jdn);
  const dayGz = ganzhiName(dayIdx).name;
  const dayGan = dayGz[0];
  const dayZhi = dayGz[1];
  const hourZhi = ZHI[Math.floor(((hour + 1) % 24) / 2)];

  const jd = jdnBase - 0.5 + (hour * 60 + minute) / 1440;
  const terms = termWindow(year).filter((t) => t.jd <= jd);
  const last = terms.length ? terms[terms.length - 1] : null;
  const jieqiName = last ? last.name : '冬至';

  const tdp = tianDiPan(jieqiName, hourZhi, dayGan);
  const ke = siKe(dayGan, dayZhi, tdp);

  const stats = analyze(ke);
  const isFuYin = tdp.yueJiang === hourZhi;
  const isFanYin = checkFanYin(tdp);
  const isBaZhuan = BA_ZHUAN_DAYS.includes(dayGz);
  const isSamePos = GAN_ZHI_SAME_POSITION.includes(dayGz);
  const isFanYinBaZhuan = isSamePos && stats.xiaZeiShang === 4;

  let chu;
  let geJu;
  let detail;
  if (isFanYin || isFanYinBaZhuan) {
    const r = fanYin(ke, dayGan, dayZhi, stats, isFanYinBaZhuan);
    chu = r.zhi; geJu = '返吟'; detail = r.detail;
  } else if (isFuYin) {
    chu = yinYang(dayGan) === '阳' ? GAN_JI_GONG[dayGan] : dayZhi;
    geJu = '伏吟'; detail = yinYang(dayGan) === '阳' ? '自任' : '杜传';
  } else if (isBaZhuan && stats.shangKeXia === 0 && stats.xiaZeiShang === 0) {
    const i = ZHI.indexOf(dayZhi);
    chu = ZHI[(i + (yinYang(dayGan) === '阳' ? 2 : -2) + 12) % 12];
    geJu = '八专'; detail = '帷簿';
  } else if (stats.xiaZeiShang === 1 && stats.shangKeXia === 0) {
    chu = ke.find((k) => k.relation === '下贼上').shang; geJu = '贼克'; detail = '重审';
  } else if (stats.shangKeXia === 1 && stats.xiaZeiShang === 0) {
    chu = ke.find((k) => k.relation === '上克下').shang; geJu = '贼克'; detail = '元首';
  } else if (stats.xiaZeiShang >= 1) {
    const r = multipleZeiKe(ke, dayGan, '下贼上');
    chu = r.zhi; geJu = r.geJu; detail = r.detail;
  } else if (stats.shangKeXia >= 2) {
    const r = multipleZeiKe(ke, dayGan, '上克下');
    chu = r.zhi; geJu = r.geJu; detail = r.detail;
  } else if (stats.shangKeXia === 0 && stats.xiaZeiShang === 0) {
    const r = noZeiKe(ke, tdp, dayGan);
    chu = r.zhi; geJu = r.geJu; detail = r.detail;
  } else {
    chu = ke[0].shang; geJu = '贼克'; detail = '元首';
  }

  let zhong;
  let mo;
  if (isFanYin) {
    zhong = ZHI_CHONG[chu];
    mo = ZHI_CHONG[zhong];
  } else {
    zhong = tdp.diToTian[chu];
    mo = tdp.diToTian[zhong];
  }

  return {
    system: 'daliuren',
    input: { year, month, day, hour, minute },
    dayGanZhi: dayGz,
    hourZhi,
    dayNight: tdp.dayNight,
    jieqi: { name: jieqiName, time: last ? formatJd(last.jd) : null },
    yueJiang: { zhi: tdp.yueJiang, name: YUE_JIANG_NAME[tdp.yueJiang] },
    guiren: { zhi: tdp.guirenStart, reverse: tdp.isReverse },
    pan: ZHI.map((d, i) => ({
      di: d,
      tian: tdp.tianPan[i],
      jiang: tdp.diToJiang[d],
      jiangFull: JIANG_FULL[tdp.diToJiang[d]],
    })),
    siKe: ke.map((k) => ({ ...k, jiangFull: JIANG_FULL[k.jiang] ?? '' })),
    sanChuan: {
      chu: chuan('初传', chu, tdp, dayGan, dayGz),
      zhong: chuan('中传', zhong, tdp, dayGan, dayGz),
      mo: chuan('末传', mo, tdp, dayGan, dayGz),
    },
    shensha: calcShensha(dayGz),
    geJu: { name: geJu, detail },
  };
}

return { ZHI, GAN, TIAN_JIANG, JIANG_FULL, JIEQI_YUE_JIANG, calcShensha, buildDaliuren };
})();

__mods.hepan = (function () {
const { buildBazi } = __mods.bazi;
const { STEMS, BRANCHES } = __mods.calendar;

const WX_GAN = { 甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土', 己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水' };
const WX_ZHI = { 子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火', 午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水' };
const SHENG = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const KE = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };

const LIU_HE = [['子', '丑'], ['寅', '亥'], ['卯', '戌'], ['辰', '酉'], ['巳', '申'], ['午', '未']];
const CHONG = [['子', '午'], ['丑', '未'], ['寅', '申'], ['卯', '酉'], ['辰', '戌'], ['巳', '亥']];
const HAI = [['子', '未'], ['丑', '午'], ['寅', '巳'], ['卯', '辰'], ['申', '亥'], ['酉', '戌']];
const PO = [['子', '酉'], ['卯', '午'], ['辰', '丑'], ['未', '戌'], ['寅', '亥'], ['巳', '申']];
const SAN_HE = [['申', '子', '辰'], ['寅', '午', '戌'], ['巳', '酉', '丑'], ['亥', '卯', '未']];
const XING = [['寅', '巳', '申'], ['丑', '戌', '未'], ['子', '卯']];

const pairIn = (list, a, b) => list.some((g) => g.includes(a) && g.includes(b) && a !== b);

function zhiRelation(a, b) {
  if (a === b) return { name: '同支', score: 0, text: '日支相同，性情相近，容易互相理解，也容易同时卡在同一处' };
  if (pairIn(LIU_HE, a, b)) return { name: '六合', score: 20, text: '日支六合，相处自然、彼此补位' };
  for (const g of SAN_HE) {
    if (g.includes(a) && g.includes(b)) return { name: '半合', score: 14, text: '日支同属三合局，易有共同语言' };
  }
  if (pairIn(CHONG, a, b)) return { name: '相冲', score: -15, text: '日支相冲，节奏与需求容易错位，需要刻意协调' };
  if (pairIn(XING, a, b)) {
    for (const g of XING) {
      if (g.includes(a) && g.includes(b)) return { name: '相刑', score: -10, text: '日支相刑，摩擦多起于细节，宜少用指责' };
    }
  }
  if (pairIn(HAI, a, b)) return { name: '相害', score: -9, text: '日支相害，容易因第三方或误解生嫌隙' };
  if (pairIn(PO, a, b)) return { name: '相破', score: -5, text: '日支相破，小事易起波澜' };
  return { name: '无直接关系', score: 4, text: '日支之间没有直接刑冲合害，关系好坏主要看经营' };
}

function wxToMe(other, me) {
  if (other === me) return { name: '比和', score: 13, text: '两人日主同五行，气味相投，也容易一起犯同样的毛病' };
  if (SHENG[other] === me) return { name: '生我', score: 20, text: '对方五行生我，容易得到照顾与助力' };
  if (SHENG[me] === other) return { name: '我生', score: 10, text: '我生对方，多为付出的一方，久了要留意消耗' };
  if (KE[me] === other) return { name: '我克', score: 5, text: '我克对方，主导感较强，需留意对方的空间' };
  return { name: '克我', score: -12, text: '对方克我，压力感偏重，宜把话说开' };
}

function buildHepan(input) {
  const A = buildBazi({ ...input.a, gender: input.a.gender });
  const B = buildBazi({ ...input.b, gender: input.b.gender });

  const aStem = A.pillars.day.stem;
  const bStem = B.pillars.day.stem;
  const aWx = WX_GAN[aStem];
  const bWx = WX_GAN[bStem];
  const aZhi = A.pillars.day.branch;
  const bZhi = B.pillars.day.branch;

  const aToB = wxToMe(bWx, aWx);
  const bToA = wxToMe(aWx, bWx);
  const stemScore = (aToB.score + bToA.score) / 2;

  const gong = zhiRelation(aZhi, bZhi);

  const favorA = (A.frame && A.frame.yongshen ? A.frame.yongshen.favor : []).slice();
  const favorB = (B.frame && B.frame.yongshen ? B.frame.yongshen.favor : []).slice();
  const wxCount = (r) => {
    const m = {};
    for (const k of ['year', 'month', 'day', 'hour']) {
      m[WX_GAN[r.pillars[k].stem]] = (m[WX_GAN[r.pillars[k].stem]] || 0) + 1;
      m[WX_ZHI[r.pillars[k].branch]] = (m[WX_ZHI[r.pillars[k].branch]] || 0) + 1;
    }
    return m;
  };
  const wxA = wxCount(A);
  const wxB = wxCount(B);
  const strongOf = (m) => Object.entries(m).sort((x, y) => y[1] - x[1])[0] || ['', 0];
  const [strongA] = strongOf(wxA);
  const [strongB] = strongOf(wxB);
  const bFeedsA = favorA.includes(strongB);
  const aFeedsB = favorB.includes(strongA);
  let compScore = 0;
  const compNotes = [];
  if (bFeedsA) { compScore += 12; compNotes.push(`对方的旺行 ${strongB} 正是你的喜用`); }
  if (aFeedsB) { compScore += 12; compNotes.push(`你的旺行 ${strongA} 正是对方的喜用`); }
  if (!bFeedsA && !aFeedsB) { compScore += 3; compNotes.push('双方的旺行都不是对方的喜用，互补性一般，靠沟通补'); }
  const missingA = ['木', '火', '土', '金', '水'].filter((w) => !wxA[w]);
  const missingB = ['木', '火', '土', '金', '水'].filter((w) => !wxB[w]);
  if (missingA.includes(strongB)) { compScore += 4; compNotes.push(`你命局缺 ${strongB}，对方正好偏旺`); }
  if (missingB.includes(strongA)) { compScore += 4; compNotes.push(`对方命局缺 ${strongA}，你正好偏旺`); }

  const raw = stemScore + gong.score + compScore;
  const pct = Math.max(0, Math.min(100, Math.round(((raw + 27) / 83) * 100)));
  const level = pct >= 75 ? '契合度较高' : pct >= 55 ? '中等偏顺' : pct >= 40 ? '需要磨合' : '差异较大';

  const dim = (key, label, score, text, extra) => ({ key, label, score: Math.round(score), text, ...(extra || {}) });

  return {
    system: 'hepan',
    a: {
      gender: A.input.gender,
      pillars: ['year', 'month', 'day', 'hour'].map((k) => A.pillars[k].ganzhi),
      dayMaster: `${aStem}${aWx}`,
      dayBranch: aZhi,
      strength: A.strength ? A.strength.level : null,
      favor: favorA.join(''),
      wuxing: wxA,
      longitude: A.input.longitude ?? null,
      trueSolar: A.input.trueSolar !== false,
      solarNote: A.solarTime ? A.solarTime.note : '',
      summary: A.summary,
    },
    b: {
      gender: B.input.gender,
      pillars: ['year', 'month', 'day', 'hour'].map((k) => B.pillars[k].ganzhi),
      dayMaster: `${bStem}${bWx}`,
      dayBranch: bZhi,
      strength: B.strength ? B.strength.level : null,
      favor: favorB.join(''),
      wuxing: wxB,
      longitude: B.input.longitude ?? null,
      trueSolar: B.input.trueSolar !== false,
      solarNote: B.solarTime ? B.solarTime.note : '',
      summary: B.summary,
    },
    score: { total: pct, level },
    dimensions: [
      dim('stem', '日主关系', stemScore, `你的日主 ${aStem}${aWx}，对方 ${bStem}${bWx}。${aToB.text}；${bToA.text}。`),
      dim('gong', '夫妻宫（日支）', gong.score, `${gong.name}：${gong.text}。你日支 ${aZhi}，对方日支 ${bZhi}。`),
      dim('wuxing', '五行互补', compScore, compNotes.join('；') + '。'),
    ],
    notes: [
      '合盘看的是相处方式与互补点，不决定关系成败；现实里的沟通与选择分量更重。',
      `口径：日主取五行生克双向平均，夫妻宫取日支关系，五行互补看「一方喜用是否为另一方所旺」。`,
    ],
  };
}

return { buildHepan };
})();

__mods['ziwei-hepan'] = (function () {
const { buildZiwei } = __mods.ziwei;

const NAMES = ['命宫', '兄弟', '夫妻', '子女', '财帛', '疾厄', '迁移', '交友', '官禄', '田宅', '福德', '父母'];
const MUT_MEAN = {
  禄: '会把资源、机会与松弛感带过去',
  权: '会不自觉地主导或施压',
  科: '带来的更多是名声、体面与理性',
  忌: '会勾起压力点与执念',
};
const MUT_SCORE = { 禄: 10, 权: 5, 科: 8, 忌: -10 };
const STRONG_LANDS = ['命宫', '夫妻', '福德', '财帛', '官禄'];

const palaceByBranch = (chart, branch) => (chart.palaces || []).find((p) => p.branch === branch) || null;
const mainStars = (p) => (p && p.stars ? p.stars.filter((s) => s.type === 'main' || s.type === '吉星' || s.type === '煞星').map((s) => s.name) : []);

function landOn(host, branch) {
  const p = palaceByBranch(host, branch);
  return p ? { palace: p.palace, branch: p.branch, stars: mainStars(p) } : null;
}

function buildZiweiHepan(input) {
  const A = buildZiwei({ ...input.a });
  const B = buildZiwei({ ...input.b });

  const soulToB = landOn(B, A.soul.branch);
  const soulToA = landOn(A, B.soul.branch);
  const spouseBranchA = (A.palaces.find((p) => p.palace === '夫妻') || {}).branch;
  const spouseBranchB = (B.palaces.find((p) => p.palace === '夫妻') || {}).branch;
  const spouseAtoB = spouseBranchA ? landOn(B, spouseBranchA) : null;
  const spouseBtoA = spouseBranchB ? landOn(A, spouseBranchB) : null;

  const hits = [];
  const collect = (from, to, who, targetWho) => {
    for (const p of from.palaces || []) {
      for (const s of p.stars || []) {
        if (!s.mutagen) continue;
        const target = (to.palaces || []).find((q) => (q.stars || []).some((x) => x.name === s.name));
        const land = target ? target.palace : null;
        hits.push({
          who,
          star: s.name,
          mutagen: s.mutagen,
          ownPalace: p.palace,
          landingPalace: land,
          strong: land ? STRONG_LANDS.includes(land) : false,
          text: `${who}的${s.name}化${s.mutagen}（在本命${p.palace}）落在${targetWho}的${land || '盘外'}——${who}${MUT_MEAN[s.mutagen]}`,
        });
      }
    }
  };
  collect(A, B, '你', '对方');
  collect(B, A, '对方', '你');

  let score = 40;
  const dims = [];
  if (soulToB) {
    const strong = STRONG_LANDS.includes(soulToB.palace);
    const s = strong ? 12 : 5;
    score += s;
    dims.push({ key: 'soul', label: '命宫互落', score: s, text: `你的命宫在${A.soul.branch}，落到对方盘的「${soulToB.palace}」${soulToB.stars.length ? `（同宫见 ${soulToB.stars.join('、')}）` : ''}——${strong ? '影响直接，脾气与做派会明显落在对方这一块' : '影响偏间接，主要体现在日常协作上'}。` });
  }
  if (soulToA) {
    dims.push({ key: 'soulBack', label: '对方命宫落你盘', score: 0, text: `对方的命宫在${B.soul.branch}，落到你盘的「${soulToA.palace}」${soulToA.stars.length ? `（同宫见 ${soulToA.stars.join('、')}）` : ''}。` });
  }
  if (spouseAtoB && spouseBtoA) {
    const good = ['命宫', '夫妻', '福德'].includes(spouseAtoB.palace) || ['命宫', '夫妻', '福德'].includes(spouseBtoA.palace);
    const s = good ? 8 : 2;
    score += s;
    dims.push({ key: 'spouse', label: '夫妻宫互落', score: s, text: `你的夫妻宫在${spouseBranchA}，落在对方「${spouseAtoB.palace}」；对方的夫妻宫在${spouseBranchB}，落在你「${spouseBtoA.palace}」。${good ? '双方的感情定位能对上彼此在意的事' : '彼此的期待更容易落在不同领域，需要说清楚'}` });
  }
  let mutScore = 0;
  for (const h of hits) {
    const base = MUT_SCORE[h.mutagen] || 0;
    mutScore += h.strong ? Math.round(base * 1.5) : base;
  }
  mutScore = Math.max(-25, Math.min(25, mutScore));
  score += mutScore;
  dims.push({ key: 'mutagen', label: '四化引动', score: mutScore, text: hits.filter((h) => h.who === '你').map((h) => h.text).join('；') || '你这边没有生年四化引动对方的宫位。' });

  const total = Math.max(0, Math.min(100, Math.round(score)));
  const level = total >= 75 ? '契合度较高' : total >= 55 ? '中等偏顺' : total >= 40 ? '需要磨合' : '差异较大';

  const side = (z, who) => ({
    who,
    soul: { branch: z.soul.branch, palace: z.soul.palace },
    body: { branch: z.body.branch, lands: z.body.lands },
    bureau: z.bureau.name,
    ziwei: z.ziwei,
    tianfu: z.tianfu,
    soulStars: mainStars(z.palaces.find((p) => p.palace === '命宫') || {}),
    spouseStars: mainStars(z.palaces.find((p) => p.palace === '夫妻') || {}),
    natalSihua: (z.palaces || []).flatMap((p) => (p.stars || []).filter((s) => s.mutagen).map((s) => `${s.name}化${s.mutagen}(${p.palace})`)),
    summary: z.summary,
  });

  return {
    system: 'hepan',
    chart: 'ziwei',
    a: side(A, '你'),
    b: side(B, '对方'),
    score: { total, level },
    dimensions: dims,
    interactions: hits,
    notes: [
      '紫微合盘看的是「彼此会在对方生活里的哪一块起作用」，不是关系成败的判决。',
      '口径：命宫与夫妻宫按地支落到对方盘的宫位；四化按「一方的生年四化星在对方盘的落宫」读，落在命宫/夫妻/福德/财帛/官禄加倍计分。',
    ],
  };
}

return { buildZiweiHepan };
})();

__mods.qimen = (function () {
const { termInstantJd, termWindow, jdToParts, partsToJd, formatJd, ganzhiName, sexagenaryIndex, STEMS, BRANCHES } = __mods.calendar;
const { solarToLunar } = __mods.lunar;

const TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const SAN_QI_LIU_YI = ['戊', '己', '庚', '辛', '壬', '癸', '丁', '丙', '乙'];
const LUO_SHU_ORDER = ['1', '8', '3', '4', '9', '2', '7', '6'];
const DISPLAY_ORDER = ['9', '2', '7', '6', '1', '8', '3', '4'];
const BASIC_STARS = { 1: '天蓬', 8: '天任', 3: '天冲', 4: '天辅', 9: '天英', 2: '天芮', 7: '天柱', 6: '天心', 5: '天禽' };
const BASIC_GATES = { 1: '休门', 8: '生门', 3: '伤门', 4: '杜门', 9: '景门', 2: '死门', 7: '惊门', 6: '开门', 5: '' };
const BASIC_GODS = ['值符', '螣蛇', '太阴', '六合', '勾陈', '朱雀', '九地', '九天'];
const STANDARD_STARS = ['天英', '天芮', '天柱', '天心', '天蓬', '天任', '天冲', '天辅'];
const STANDARD_GATES = ['景门', '死门', '惊门', '开门', '休门', '生门', '伤门', '杜门'];
const STANDARD_GODS = ['值符', '螣蛇', '太阴', '六合', '勾陈', '朱雀', '九地', '九天'];
const XUN_SHOU_TO_FULL_MAP = { 戊: '甲子戊', 己: '甲戌己', 庚: '甲申庚', 辛: '甲午辛', 壬: '甲辰壬', 癸: '甲寅癸' };
const ZHI_TO_GONG = { 子: '1', 丑: '8', 寅: '8', 卯: '3', 辰: '4', 巳: '4', 午: '9', 未: '2', 申: '2', 酉: '7', 戌: '6', 亥: '6' };
const COUNTER_CLOCKWISE_ORDER = ['1', '6', '7', '2', '9', '4', '3', '8'];

const JU_NUMBERS_MAP = {
  冬至: '174', 惊蛰: '174', 小寒: '285', 大寒: '396', 春分: '396', 雨水: '963',
  清明: '417', 立夏: '417', 立春: '852', 谷雨: '528', 小满: '528', 芒种: '639',
  夏至: '936', 白露: '936', 小暑: '825', 大暑: '714', 秋分: '714', 立秋: '258',
  寒露: '693', 立冬: '693', 处暑: '147', 霜降: '582', 小雪: '582', 大雪: '471',
};

const xunOf = (gz) => {
  const idx = indexOfGz(gz);
  if (idx < 0) return '';
  const head = Math.floor(idx / 10) * 10;
  return ganzhiName(head).name;
};
const indexOfGz = (gz) => {
  for (let i = 0; i < 60; i++) if (ganzhiName(i).name === gz) return i;
  return -1;
};

function buildSnapshot({ year, month, day, hour, minute, lateZiHourMode = 'same-day' }) {
  const jd = partsToJd({ year, month, day, hour, minute });

  const baseJdn = partsToJd({ year, month, day, hour: 12, minute: 0 });
  const jdn = Math.floor(baseJdn + 0.5);
  const isLateZi = hour >= 23;
  const dayJdn = isLateZi && lateZiHourMode === 'next-day' ? jdn + 1 : jdn;
  const dayGz = ganzhiName((((dayJdn + 49) % 60) + 60) % 60).name;

  const hourBranchIdx = Math.floor(((hour + 1) % 24) / 2);
  const hourStemBasisJdn = isLateZi ? jdn + 1 : jdn;
  const hourBasisGz = ganzhiName((((hourStemBasisJdn + 49) % 60) + 60) % 60).name;
  const dayStemIdx = STEMS.indexOf(hourBasisGz[0]);
  const hourStemIdx = (dayStemIdx % 5) * 2 + hourBranchIdx;
  const hourStem = STEMS[((hourStemIdx % 10) + 10) % 10];
  const hourGz = ganzhiName(sexagenaryIndex(STEMS.indexOf(hourStem), hourBranchIdx)).name;

  const yearGz = ganzhiName((((solarYearFor(year, month, day, hour, minute) - 4) % 60) + 60) % 60).name;
  const monthGz = monthGanzhiOf(jd);

  const fuTouOffset = (((dayJdn + 49) % 60) + 60) % 60 % 5;
  const fuTouJdn = dayJdn - fuTouOffset;
  const fuTouMid = fuTouJdn - 0.5 + 0.5;
  const winF = termWindow(year);
  const pastF = winF.filter((t) => t.jd <= fuTouMid);
  const fuTouTerm = pastF.length ? pastF[pastF.length - 1] : winF[0];
  const fuTouLeadDays = Math.round(fuTouTerm.jd - fuTouMid);
  const nextTerm = winF.find((t) => t.jd > fuTouMid) || winF[winF.length - 1];
  const leadToNextTerm = Math.round(nextTerm.jd - fuTouMid);

  const win = termWindow(year);
  const past = win.filter((t) => t.jd <= jd);
  const cur = past.length ? past[past.length - 1] : win[0];

  const wsThis = termInstantJd(year, 23);
  const wsYear = jd < wsThis ? year - 1 : year;
  const wsJd = termInstantJd(wsYear, 23);
  const ssJd = termInstantJd(wsYear + 1, 11);

  const hours = [];
  for (let i = 0; i < 12; i++) {
    const st = (dayStemIdx % 5) * 2 + i;
    const gz = ganzhiName(sexagenaryIndex(STEMS.indexOf(STEMS[((st % 10) + 10) % 10]), i)).name;
    hours.push({ ganZhi: gz, xun: xunOf(gz) });
  }

  const lunar = solarToLunar(year, month, day);

  return {
    yearGanZhi: yearGz,
    monthGanZhi: monthGz,
    dayGanZhi: dayGz,
    dayXun: xunOf(dayGz),
    monthXun: xunOf(monthGz),
    yearXun: xunOf(yearGz),
    hours,
    solarTermName: cur.name,
    fuTouTermName: fuTouTerm.name,
    fuTouLeadDays,
    nextTermName: nextTerm.name,
    nextTermJd: nextTerm.jd,
    leadToNextTerm,
    julianDay: jd,
    winterSolsticeJulianDay: wsJd,
    summerSolsticeJulianDay: ssJd,
    solarDate: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    lunarDate: `${lunar.year}年${lunar.isLeap ? '闰' : ''}${lunar.month}月${lunar.day}日`,
    solarTermTime: formatJd(cur.jd),
  };
}

function solarYearFor(year, month, day, hour, minute) {
  const jd = partsToJd({ year, month, day, hour, minute });
  const lichun = termInstantJd(year, 2);
  return jd < lichun ? year - 1 : year;
}

function monthGanzhiOf(jd) {
  const parts = jdToParts(jd);
  const win = termWindow(parts.year);
  const jie = win.filter((t) => t.index % 2 === 0 && t.jd <= jd);
  const cur = jie.length ? jie[jie.length - 1] : win[0];
  const branchIdx = (Math.floor(cur.index / 2) + 1) % 12;
  const yearForMonth = solarYearFor(parts.year, parts.month, parts.day, parts.hour, parts.minute);
  const yinStem = ((STEMS.indexOf(ganzhiName((((yearForMonth - 4) % 60) + 60) % 60).name[0]) % 5) * 2 + 2) % 10;
  const offset = ((branchIdx - 2) + 12) % 12;
  return ganzhiName(sexagenaryIndex((yinStem + offset) % 10, branchIdx)).name;
}

const GATE_ELEMENT = { 休门: '水', 生门: '土', 伤门: '木', 杜门: '木', 景门: '火', 死门: '土', 惊门: '金', 开门: '金' };
const STAR_ELEMENT = { 天蓬: '水', 天任: '土', 天冲: '木', 天辅: '木', 天英: '火', 天芮: '土', 天柱: '金', 天心: '金', 天禽: '土', 禽芮: '土' };
const PALACE_ELEMENT = { 1: '水', 2: '土', 3: '木', 4: '木', 5: '土', 6: '金', 7: '金', 8: '土', 9: '火' };
const SHENG = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const KE = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };

function wuxingRelation(a, b) {
  if (!a || !b) return 'unknown';
  if (a === b) return '比和';
  if (SHENG[a] === b) return '生';
  if (SHENG[b] === a) return '被生';
  if (KE[a] === b) return '克';
  if (KE[b] === a) return '被克';
  return 'unknown';
}

function gatePalaceRelation(gate, palace) {
  const ge = GATE_ELEMENT[gate];
  const pe = PALACE_ELEMENT[palace];
  if (!ge || !pe) return { type: 'unknown', gate: ge || null, palace: pe || null, note: '缺少门或宫的五行，无法判断' };
  if (KE[ge] === pe) return { type: '门迫', gate: ge, palace: pe, note: `${ge}克${pe}，门克宫` };
  if (KE[pe] === ge) return { type: '宫制门', gate: ge, palace: pe, note: `${pe}克${ge}，宫克门（制，不为迫）` };
  if (SHENG[ge] === pe) return { type: '门生宫', gate: ge, palace: pe, note: `${ge}生${pe}` };
  if (SHENG[pe] === ge) return { type: '宫生门', gate: ge, palace: pe, note: `${pe}生${ge}` };
  return { type: '比和', gate: ge, palace: pe, note: `${ge}与${pe}比和` };
}
function getDiPan(type, num) {
  const result = {};
  let gong = num;
  for (const stem of SAN_QI_LIU_YI) {
    result[gong.toString()] = stem;
    if (type === 'yang') gong = gong === 9 ? 1 : gong + 1;
    else gong = gong === 1 ? 9 : gong - 1;
  }
  return result;
}

function findStemPalace(diPan, stem) {
  return Object.keys(diPan).find((g) => g !== '5' && diPan[g] === stem);
}

function distributeJiuXing(diPan, xunShou, shiGan) {
  const zhiFuGong = findStemPalace(diPan, xunShou) || '2';
  const zhiFuXing = BASIC_STARS[zhiFuGong];
  if (!shiGan) return { zhiFuGong, zhiFuLuoGong: zhiFuGong, zhiFuXing, jiuXing: { ...BASIC_STARS } };
  const zhiFuLuoGong = findStemPalace(diPan, shiGan) || (diPan['5'] === shiGan ? '2' : zhiFuGong);
  const zhiFuIndex = LUO_SHU_ORDER.indexOf(zhiFuGong);
  const luoGongIndex = LUO_SHU_ORDER.indexOf(zhiFuLuoGong);
  if (zhiFuIndex === -1 || luoGongIndex === -1) return { zhiFuGong, zhiFuLuoGong, zhiFuXing, jiuXing: { ...BASIC_STARS } };
  const steps = (luoGongIndex - zhiFuIndex + 8) % 8;
  const jiuXing = { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' };
  for (let i = 0; i < LUO_SHU_ORDER.length; i++) {
    const src = LUO_SHU_ORDER[i];
    const dst = LUO_SHU_ORDER[(i + steps) % LUO_SHU_ORDER.length];
    jiuXing[dst] = src === '2' ? '禽芮' : BASIC_STARS[src];
  }
  return { zhiFuGong, zhiFuLuoGong, zhiFuXing, jiuXing };
}

function distributeBaMen(zhiFuGong, shiGan, type) {
  const originalGong = zhiFuGong === '5' ? '2' : zhiFuGong;
  const zhiShiMen = BASIC_GATES[originalGong] || '';
  const steps = Math.max(TIAN_GAN.indexOf(shiGan), 0);
  let cur = Number(originalGong);
  for (let i = 0; i < steps; i++) {
    if (type === 'yang') cur = cur === 9 ? 1 : cur + 1;
    else cur = cur === 1 ? 9 : cur - 1;
  }
  const zhiShiGong = (cur === 5 ? '2' : cur.toString());
  const menIdx = LUO_SHU_ORDER.findIndex((g) => BASIC_GATES[g] === zhiShiMen);
  const luoIdx = LUO_SHU_ORDER.indexOf(zhiShiGong);
  if (menIdx === -1 || luoIdx === -1) return { zhiShiGong, zhiShiMen, baMen: { ...BASIC_GATES } };
  const rot = (luoIdx - menIdx + 8) % 8;
  const baMen = { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' };
  for (let i = 0; i < LUO_SHU_ORDER.length; i++) {
    baMen[LUO_SHU_ORDER[(i + rot) % LUO_SHU_ORDER.length]] = BASIC_GATES[LUO_SHU_ORDER[i]];
  }
  return { zhiShiGong, zhiShiMen, baMen };
}

function distributeBaShen(zhiFuGong, type) {
  const order = type === 'yang' ? LUO_SHU_ORDER : COUNTER_CLOCKWISE_ORDER;
  const baShen = { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' };
  const start = zhiFuGong === '5' ? '2' : zhiFuGong;
  const si = order.indexOf(start);
  if (si === -1) return baShen;
  for (let i = 0; i < BASIC_GODS.length; i++) baShen[order[(si + i) % order.length]] = BASIC_GODS[i];
  return baShen;
}

function xunShouLiuYi(gz) {
  const tg = TIAN_GAN.indexOf(gz[0]);
  const dz = DI_ZHI.indexOf(gz[1]);
  if (tg === -1 || dz === -1) return '戊';
  const headDz = DI_ZHI[(dz - tg + 12) % 12];
  const heads = ['子', '戌', '申', '午', '辰', '寅'];
  const stems = ['戊', '己', '庚', '辛', '壬', '癸'];
  const i = heads.indexOf(headDz);
  return i === -1 ? '戊' : stems[i];
}

const KONG_WANG = { 甲子: ['戌', '亥'], 甲戌: ['申', '酉'], 甲申: ['午', '未'], 甲午: ['辰', '巳'], 甲辰: ['寅', '卯'], 甲寅: ['子', '丑'] };

function calcJuShu(snapshot, juMethod = 'chaibu') {
  const ganZhi = snapshot.dayGanZhi;
  const tg = TIAN_GAN.indexOf(ganZhi[0]);
  const dz = DI_ZHI.indexOf(ganZhi[1]);
  const fuTouDz = DI_ZHI[(dz - (tg % 5) + 12) % 12];
  const yuan = ['子', '午', '卯', '酉'].includes(fuTouDz) ? 0 : ['寅', '申', '巳', '亥'].includes(fuTouDz) ? 1 : 2;
  const dun = snapshot.julianDay >= snapshot.winterSolsticeJulianDay && snapshot.julianDay < snapshot.summerSolsticeJulianDay ? 'yang' : 'yin';

  let termName = snapshot.solarTermName;
  let yuanOverride = -1;
  let note = '拆补法：当前节气 + 符头定三元';
  if (juMethod === 'chaoshen' && snapshot.fuTouTermName) {
    termName = snapshot.fuTouTermName;
    note = '超神接气：局随符头（符头先到用本节，节气先到等符头）';
  } else if (juMethod === 'zhirun') {
    const lead = snapshot.leadToNextTerm;
    const inWindow = snapshot.nextTermName === '夏至' || snapshot.nextTermName === '冬至';
    if (lead != null && lead >= 9 && inWindow) {
      termName = snapshot.solarTermName;
      yuanOverride = 2;
      note = `置闰法：符头距${snapshot.nextTermName} ${lead} 天（超九日），在${snapshot.solarTermName}置闰下元`;
    } else if (lead != null && lead >= 9) {
      termName = snapshot.fuTouTermName || termName;
      note = `置闰法：超神 ${lead} 天，但不在芒种/大雪窗口，按超神接气取${termName}`;
    } else {
      note = `置闰法：符头距${snapshot.nextTermName} ${lead} 天，未达置闰条件，按拆补处理`;
    }
  }
  const nums = JU_NUMBERS_MAP[termName] || '111';
  const num = Number(nums.charAt(yuan));
  const CN = { 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 7: '七', 8: '八', 9: '九' };
  const yuanName = ['上元', '中元', '下元'][yuanOverride >= 0 ? yuanOverride : yuan];
  return {
    jieQiName: termName,
    juMethod,
    juMethodNote: note,
    type: dun,
    number: num,
    yuan: yuanName,
    fullName: `${dun === 'yin' ? '阴遁' : '阳遁'}${CN[num]}局 (${yuanName})`,
  };
}

function calcAnGan(zhiShiGong, shiGan, xunShou, type, diPan) {
  const seq = ['戊', '己', '庚', '辛', '壬', '癸', '丁', '丙', '乙'];
  const startStem = shiGan === '甲' ? xunShou : shiGan;
  let si = seq.indexOf(startStem);
  let gong = Number(zhiShiGong);
  if (si === -1) si = 0;
  if (diPan[gong.toString()] === startStem) gong = 5;
  const anGan = { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' };
  for (let i = 0; i < 9; i++) {
    anGan[gong.toString()] = seq[si];
    si = (si + 1) % seq.length;
    gong = type === 'yang' ? (gong === 9 ? 1 : gong + 1) : gong === 1 ? 9 : gong - 1;
  }
  return anGan;
}

const findGong = (obj, val) =>
  Object.keys(obj).find((k) => obj[k] === val || (val === '天芮' && obj[k] === '禽芮')) || '9';

function buildQimen(input) {
  const snapshot = input.snapshot || buildSnapshot(input);
  const hourIdx = input.hourIndex != null ? input.hourIndex : Math.floor((((input.hour ?? 0) + 1) % 24) / 2);
  const hourGz = snapshot.hours[hourIdx] ? snapshot.hours[hourIdx].ganZhi : snapshot.hours[snapshot.hours.length - 1].ganZhi;
  const juMethod = ['chaibu', 'chaoshen', 'zhirun'].includes(input.juMethod) ? input.juMethod : 'chaibu';
  const juShu = calcJuShu(snapshot, juMethod);
  const xunShou = xunShouLiuYi(hourGz);
  const shiGan = hourGz[0];
  const diPan = getDiPan(juShu.type, juShu.number);
  const jx = distributeJiuXing(diPan, xunShou, shiGan);
  const bm = distributeBaMen(jx.zhiFuGong, shiGan, juShu.type);
  const zhiFuLuoGong = jx.zhiFuLuoGong || jx.zhiFuGong;
  const baShen = distributeBaShen(zhiFuLuoGong, juShu.type);
  const anGan = calcAnGan(bm.zhiShiGong, shiGan, xunShou, juShu.type, diPan);

  const idxFu = LUO_SHU_ORDER.indexOf(jx.zhiFuGong);
  const idxLuo = LUO_SHU_ORDER.indexOf(jx.zhiFuLuoGong);
  const rot = (idxLuo - idxFu + 8) % 8;
  const tianPan = { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' };
  LUO_SHU_ORDER.forEach((gong, i) => {
    const stem = diPan[gong];
    const target = LUO_SHU_ORDER[(i + rot) % LUO_SHU_ORDER.length];
    tianPan[target] = stem;
  });
  tianPan['5'] = diPan['5'] || ''; // 中五宫天盘取本宫地盘干

  const kongZhi = KONG_WANG[snapshot.dayXun === xunOf(hourGz) ? xunOf(hourGz) : xunOf(hourGz)] || [];
  const kongGong = kongZhi.map((z) => ZHI_TO_GONG[z]).filter(Boolean);
  const maMap = { 申: '寅', 子: '寅', 辰: '寅', 寅: '申', 午: '申', 戌: '申', 亥: '巳', 卯: '巳', 未: '巳', 巳: '亥', 酉: '亥', 丑: '亥' };
  const maZhi = maMap[hourGz[1]] || '';
  const maGong = ZHI_TO_GONG[maZhi] || '';

  const centerPalace = {
    palace: '5',
    diPan: diPan['5'] || '',
    tianPan: tianPan['5'] || '',
    star: '天禽',
    gate: '',
    god: '',
    anGan: '',
    palaceElement: PALACE_ELEMENT['5'],
    gateElement: null,
    starElement: STAR_ELEMENT['天禽'],
    gateRelation: { type: 'unknown', note: '中宫无门，不参与门宫关系' },
    kong: false,
    ma: false,
    center: true,
  };

  const palaces = DISPLAY_ORDER.map((gong) => ({
    palace: gong,
    diPan: diPan[gong] || '',
    tianPan: tianPan[gong] || '',
    star: jx.jiuXing[gong] || '',
    gate: bm.baMen[gong] || '',
    god: baShen[gong] || '',
    anGan: anGan[gong] || '',
    palaceElement: PALACE_ELEMENT[gong],
    gateElement: GATE_ELEMENT[bm.baMen[gong]] || null,
    starElement: STAR_ELEMENT[jx.jiuXing[gong]] || null,
    gateRelation: gatePalaceRelation(bm.baMen[gong], gong),
    kong: kongGong.includes(gong),
    ma: maGong === gong,
  }));

  return {
    system: 'qimen',
    solarDate: snapshot.solarDate,
    lunarDate: snapshot.lunarDate,
    siZhu: {
      year: snapshot.yearGanZhi,
      month: snapshot.monthGanZhi,
      day: snapshot.dayGanZhi,
      time: hourGz,
    },
    ju: juShu.fullName,
    dun: juShu.type === 'yin' ? '阴遁' : '阳遁',
    juNumber: juShu.number,
    juMethod: juShu.juMethod,
    juMethodNote: juShu.juMethodNote,
    yuan: juShu.yuan,
    jieqi: juShu.jieQiName,
    jieqiTime: snapshot.solarTermTime,
    xunshou: XUN_SHOU_TO_FULL_MAP[xunShou] || '',
    zhiFu: { star: jx.zhiFuXing, gong: jx.zhiFuLuoGong || jx.zhiFuGong, yuanGong: jx.zhiFuGong },
    zhiShi: { gate: bm.zhiShiMen, gong: bm.zhiShiGong },
    kongWang: kongZhi,
    ma: { zhi: maZhi, gong: maGong },
    palaces,
    centerPalace,
    rules: [
      '定局：以日干支符头定上中下元（子午卯酉上元、寅申巳亥中元、辰戌丑未下元），按节气取局数',
      '阴阳遁：冬至至夏至前用阳遁，夏至至冬至前用阴遁',
      '中五宫寄坤二宫；天盘随值符旋转，八神随值符落宫顺（阳）/逆（阴）布',
      '本次未实现超神接气与置闰，采用拆补法',
    ],
  };
}

return { buildSnapshot, wuxingRelation, gatePalaceRelation, buildQimen };
})();

__mods['qimen-interpret'] = (function () {
const { wuxingRelation, gatePalaceRelation } = __mods.qimen;

const GATE_MEAN = {
  休门: '休为休息、蓄势，传统上主养精与谈判',
  生门: '生为生发、财源，传统上主求财与谋事',
  伤门: '伤为耗损、冲突，传统上主竞争与损耗',
  杜门: '杜为闭塞、隐藏，传统上主保密与研究',
  景门: '景为文书、声名，传统上主宣传与考试',
  死门: '死为终结、收束，传统上主了断与送旧',
  惊门: '惊为惊动、口舌，传统上主争辩与追讨',
  开门: '开为开张、通达，传统上主上任与开拓',
};
const STAR_MEAN = {
  天蓬: '天蓬主暗昧、胆大', 天任: '天任主厚稳、经营', 天冲: '天冲主快速、行动',
  天辅: '天辅主文教、辅助', 天英: '天英主显扬、热烈', 天芮: '天芮主病患、纠缠',
  天柱: '天柱主口舌、阻隔', 天心: '天心主谋略、医术', 天禽: '天禽主中正、协调', 禽芮: '禽芮主中正兼病气',
};
const GOD_MEAN = {
  值符: '值符为首领，主主导权与贵人', 腾蛇: '腾蛇主虚惊、反复', 太阴: '太阴主暗助、私密',
  六合: '六合主和合、媒介', 白虎: '白虎主刚烈、伤病', 玄武: '玄武主暗昧、失脱',
  九地: '九地主沉稳、守成', 九天: '九天主高远、扬动',
};
const YONG_SHEN = {
  general: { label: '综合', primary: ['开门'], secondary: ['生门'], note: '综合以开、生两门为候选用神' },
  wealth: { label: '财运', primary: ['生门'], secondary: ['开门'], note: '求财以生门为主，开门为辅' },
  career: { label: '事业', primary: ['开门'], secondary: ['值符'], note: '事业以开门为主，值符（主导权）为辅' },
  love: { label: '感情', primary: ['休门'], secondary: ['六合'], note: '感情以休门为主，六合（和合）为辅' },
  study: { label: '学业', primary: ['景门'], secondary: ['天辅'], note: '学业以景门为主，天辅（文教）为辅' },
  health: { label: '健康', primary: ['天芮'], secondary: ['死门'], note: '问病以天芮为主，死门为辅；只作传统取象，不作诊断' },
  travel: { label: '出行', primary: ['九天'], secondary: ['驿马'], note: '出行以九天为主，兼看驿马' },
};

const REL_TEXT = {
  生: '主体力量流向环境或趋势',
  克: '主体对环境或趋势构成压力、有改造意图',
  比和: '两者取向相近、力量相若',
  被生: '环境或趋势为主体提供支持条件',
  被克: '环境或趋势对主体构成约束',
  unknown: '五行缺失，关系未定',
};

const findPalace = (r, key) => r.palaces.find((p) => p.star === key || p.gate === key || p.god === key || p.palace === key) || null;
const cell = (p) => `${p.palace}宫（${p.star}·${p.gate}·${p.god}）`;

function interpretQimen(r, opts = {}) {
  if (!r || r.system !== 'qimen') return null;
  const dir = YONG_SHEN[opts.direction] ? opts.direction : 'general';
  const ys = YONG_SHEN[dir];
  const sections = [];
  const unresolved = [];

  sections.push({
    key: 'facts',
    label: '排盘事实',
    text: `${r.ju}；节气 ${r.jieqi}（${r.jieqiTime}）；${r.siZhu.year}年 ${r.siZhu.month}月 ${r.siZhu.day}日 ${r.siZhu.time}时；`
      + `值符 ${r.zhiFu.star} 落 ${r.zhiFu.gong} 宫，值使 ${r.zhiShi.gate} 落 ${r.zhiShi.gong} 宫；`
      + `旬首 ${r.xunshou}；空亡 ${r.kongWang.join('') || '—'}；驿马 ${r.ma.zhi || '—'}。`
      + (r.juMethodNote ? `取局口径：${r.juMethodNote}。` : ''),
  });

  const zhiFuP = findPalace(r, r.zhiFu.gong);
  const zhiShiP = findPalace(r, r.zhiShi.gong);
  if (zhiFuP) {
    sections.push({
      key: 'zhifu',
      label: '值符落宫（单宫）',
      text: `值符 ${r.zhiFu.star} 在 ${cell(zhiFuP)}。事实：宫属${zhiFuP.palaceElement}，门属${zhiFuP.gateElement || '—'}，星属${zhiFuP.starElement || '—'}。`
        + `传统解释：${STAR_MEAN[zhiFuP.star] || ''}；${GATE_MEAN[zhiFuP.gate] || ''}；${GOD_MEAN[zhiFuP.god] || ''}。`
        + `此宫可读作当下较易发力的位置，但不等于事情即此定向。`,
    });
  }
  if (zhiShiP) {
    sections.push({
      key: 'zhishi',
      label: '值使落宫（单宫）',
      text: `值使 ${r.zhiShi.gate} 在 ${cell(zhiShiP)}。传统解释：${GATE_MEAN[zhiShiP.gate] || ''}。值使所落之宫常被读作事情推进的口子。`,
    });
  }

  const yongList = [];
  for (const key of [...ys.primary, ...ys.secondary]) {
    const p = findPalace(r, key);
    if (p) yongList.push({ key, palace: p });
  }
  if (!yongList.length) unresolved.push(`${ys.label}的用神未上盘`);
  if (yongList.length > 1) unresolved.push(`用神有 ${yongList.length} 个候选（${yongList.map((x) => x.key).join('、')}）`);
  sections.push({
    key: 'yongshen',
    label: `用神候选（${ys.label}）`,
    text: `${ys.note}。` + (yongList.length
      ? yongList.map((x) => `${x.key} → ${cell(x.palace)}`).join('；') + '。'
      : '本盘未见对应符号，暂以值符落宫参照，属未决项。'),
  });

  const primary = yongList[0] || null;
  if (primary && zhiFuP) {
    if (primary.palace.palace === zhiFuP.palace) {
      sections.push({
        key: 'relation',
        label: '用神宫 × 值符宫',
        text: `用神与值符同处 ${zhiFuP.palace} 宫（同宫）——关系并不因此消失，需看该宫门星神与旺衰；`
          + `该宫门宫关系为「${(zhiFuP.gateRelation || gatePalaceRelation(zhiFuP.gate, zhiFuP.palace)).type}」。`,
      });
    } else {
      const rel = wuxingRelation(primary.palace.palaceElement, zhiFuP.palaceElement);
      sections.push({
        key: 'relation',
        label: '用神宫 × 值符宫',
        text: `用神宫（${primary.palace.palace}，${primary.palace.palaceElement}）对值符宫（${zhiFuP.palace}，${zhiFuP.palaceElement}）为「${rel}」：${REL_TEXT[rel] || '关系未定'}。`
          + `这是落宫五行层面的关系；是否占优还要看门、月令与所问之事。`,
      });
    }
  }

  const forced = [];
  const controlled = [];
  for (const p of r.palaces) {
    const rel = p.gateRelation || gatePalaceRelation(p.gate, p.palace);
    if (rel.type === '门迫') forced.push(`${p.palace}宫（${p.gate}${rel.gate}克宫${rel.palace}）`);
    else if (rel.type === '宫制门') controlled.push(`${p.palace}宫（宫${rel.palace}克${p.gate}${rel.gate}）`);
  }
  const kongCells = r.palaces.filter((p) => p.kong).map((p) => `${p.palace}宫`);
  sections.push({
    key: 'conditions',
    label: '宫位条件',
    text: `门迫（同宫内门克宫）：${forced.length ? forced.join('、') : '本盘无'}；`
      + `宫制门（宫克门，属「制」不为迫）：${controlled.length ? controlled.join('、') : '无'}。`
      + (kongCells.length ? `空亡：${kongCells.join('、')}——落空之宫事多不实。` : '无落空之宫。')
      + `门迫只作宫位条件，不自动等同于用神受制。`,
  });

  if (unresolved.length) {
    sections.push({
      key: 'tendency',
      label: '最终倾向',
      text: `暂不给单一倾向。未决项：${unresolved.join('；')}。先把用神定下来，再谈顺逆。`,
    });
  } else {
    const rel = wuxingRelation(primary.palace.palaceElement, zhiFuP.palaceElement);
    const tone = rel === '被生' || rel === '生' ? '偏向顺' : rel === '被克' ? '偏向滞' : '中性';
    sections.push({
      key: 'tendency',
      label: '最终倾向',
      text: `在当前输入、规则集与所问之事下：若以「${primary.key}」为用神，用神宫对值符宫为「${rel}」，整体${tone}；`
        + `若${ys.label}实际取另一个候选，或时间范围不同，解读边界随之变化。未决项：月令旺衰未纳入本规则集。`,
    });
  }

  sections.push({
    key: 'checklist',
    label: '复核清单',
    text: '建议人工核对：①出生时间与真太阳时是否一致；②取局口径（拆补/置闰/超接）是否与所用流派一致；'
      + '③用神是否取对；④空亡宫是否影响关键符号；⑤若结论与现实直觉冲突，先查输入与规则。',
  });

  return {
    system: 'qimen',
    moduleType: 'divination',
    question: opts.question || '',
    direction: dir,
    sections,
    unresolved,
    ruleset: { juMethod: r.juMethod, schema: 'interpret/2' },
    disclaimer: '奇门属传统术数，用于整理思路与排序选项；不构成对现实的确定性预测，重要决策请以事实与专业意见为准。',
  };
}

return { interpretQimen };
})();

__mods['interpret-data'] = (function () {

const TRIGRAM = {
  乾: { nature: '天', trait: '刚健、主导', element: '金' },
  坤: { nature: '地', trait: '承载、柔顺', element: '土' },
  震: { nature: '雷', trait: '启动、震动', element: '木' },
  巽: { nature: '风', trait: '渗透、顺势', element: '木' },
  坎: { nature: '水', trait: '险陷、流动', element: '水' },
  离: { nature: '火', trait: '明丽、附著', element: '火' },
  艮: { nature: '山', trait: '静止、阻挡', element: '土' },
  兑: { nature: '泽', trait: '愉悦、口舌', element: '金' },
};

const YAO_POSITION = [
  { pos: 1, name: '初爻', gist: '事之始，根基与起点', tone: '宜稳不宜急' },
  { pos: 2, name: '二爻', gist: '初步展开，能力初显', tone: '宜务实积累' },
  { pos: 3, name: '三爻', gist: '进退交界的关口，多劳少得', tone: '宜守拙退让' },
  { pos: 4, name: '四爻', gist: '接近决策层，转机初现', tone: '宜谨慎措辞' },
  { pos: 5, name: '五爻', gist: '得位居中，事态最盛', tone: '宜把握主节奏' },
  { pos: 6, name: '上爻', gist: '发展至极，盛极思变', tone: '宜留余地收尾' },
];

const MOVING_NATURE = {
  yang: '阳极转阴：原本强势、推进得很快的那个环节，接下来需要收一收、留余地',
  yin: '阴极转阳：原本停滞、迟迟没动静的那个环节，接下来会出现变化，可以主动推一把',
};

const HEX64 = {
  乾为天: { meaning: '刚健运行，自强不息', scene: '主动权在你手上，宜自己定节奏' },
  坤为地: { meaning: '厚德载物，顺势而成', scene: '配合与承接比抢先更有利' },
  水雷屯: { meaning: '初生艰难，如草木破土', scene: '事情刚起步会乱，先把基础扎稳' },
  山水蒙: { meaning: '蒙昧待启，问道则通', scene: '信息不全时先请教，不要硬闯' },
  水天需: { meaning: '等待时机，不可冒进', scene: '条件没齐，耐心等一等反而快' },
  天水讼: { meaning: '争讼之象，宜和解', scene: '有分歧先谈，别把关系推上对抗' },
  地水师: { meaning: '用众之道，纪律为先', scene: '靠团队成事，规矩要立在前' },
  水地比: { meaning: '亲附相辅，择善而从', scene: '选对合作对象，比单打独斗重要' },
  风天小畜: { meaning: '小有积蓄，力量未充', scene: '先攒资源，暂不大举投入' },
  天泽履: { meaning: '循礼而行，如履虎尾', scene: '按规则走，谨慎就不会出事' },
  地天泰: { meaning: '上下交泰，通达和顺', scene: '沟通顺畅，是推进的好时候' },
  天地否: { meaning: '阴阳不交，闭塞不通', scene: '卡住时先停下来，别硬顶' },
  天火同人: { meaning: '与人同心，众志可成', scene: '找同频的人一起做，事半倍' },
  火天大有: { meaning: '丰盛富有，如日中天', scene: '收获可观，记得分享与收敛' },
  地山谦: { meaning: '谦逊受益，卑以自牧', scene: '放低姿态，反而更容易被接纳' },
  雷地豫: { meaning: '悦乐振奋，顺势而动', scene: '士气高，适合启动与造势' },
  泽雷随: { meaning: '随时而动，择善而随', scene: '跟随大势走，别拧着来' },
  山风蛊: { meaning: '积弊待治，破而后立', scene: '旧问题该清一清了，别拖' },
  地泽临: { meaning: '居高临下，督导亲近', scene: '亲自盯一盯，效果比放手好' },
  风地观: { meaning: '观仰教化，观察而明', scene: '先看清楚再表态' },
  火雷噬嗑: { meaning: '咬合去梗，明断是非', scene: '障碍要正面处理，绕不过去' },
  山火贲: { meaning: '文饰之美，适度为宜', scene: '包装有用，但别盖过实质' },
  山地剥: { meaning: '剥落衰败，宜守不宜进', scene: '在消耗期，止损优先' },
  地雷复: { meaning: '一阳来复，去而复返', scene: '转机回来了，可以小步重启' },
  天雷无妄: { meaning: '不妄为，守正即吉', scene: '按本分做，别投机' },
  山天大畜: { meaning: '大有蓄养，厚积待发', scene: '积累期，学东西最有价值' },
  山雷颐: { meaning: '养正自守，节饮食慎言语', scene: '养身体、养口碑，别透支' },
  泽风大过: { meaning: '过甚有险，栋梁将折', scene: '担子太重，该减负或加固' },
  坎为水: { meaning: '重险叠至，惟诚可济', scene: '困难接连来，稳住心神最要紧' },
  离为火: { meaning: '附丽光明，柔顺守中', scene: '借助光亮的东西，别孤军奋战' },
  泽山咸: { meaning: '感应相和，男女相悦', scene: '情感互动顺畅，宜真诚表达' },
  雷风恒: { meaning: '恒久不易，持之则成', scene: '长期坚持才有结果' },
  天山遁: { meaning: '退避为智，以退为进', scene: '适时抽身，不是认输' },
  雷天大壮: { meaning: '阳刚壮盛，宜正不宜猛', scene: '气势足，但别用力过猛' },
  火地晋: { meaning: '晋升初进，如日上升', scene: '有上升机会，主动争取' },
  地火明夷: { meaning: '光明受掩，韬光养晦', scene: '暂时低调，保存实力' },
  风火家人: { meaning: '内治为先，各安其位', scene: '先把身边人和日常安顿好' },
  火泽睽: { meaning: '睽违背离，同中有异', scene: '意见不合是常态，求同存异' },
  水山蹇: { meaning: '蹇难阻滞，宜反身修德', scene: '走不通就绕，回头补短板' },
  雷水解: { meaning: '险难消解，宜速不宜缓', scene: '结打开了，趁势把事办了' },
  山泽损: { meaning: '损己益人，损中有得', scene: '先让一点，后面有回报' },
  风雷益: { meaning: '增益利民，顺势施为', scene: '投入会有产出，可以加码' },
  泽天夬: { meaning: '决而去之，果决除弊', scene: '该断的事果断断，别拖泥带水' },
  天风姤: { meaning: '不期而遇，柔遇刚', scene: '有意外的人或机会出现' },
  泽地萃: { meaning: '聚合众力，物以类聚', scene: '聚人聚资源的时候到了' },
  地风升: { meaning: '积小以高大，循序上升', scene: '一步一步往上走，别跳级' },
  泽水困: { meaning: '困穷待援，安贫守正', scene: '资源受限时先守住基本盘' },
  水风井: { meaning: '井养不穷，修井得清', scene: '把现有的渠道维护好' },
  泽火革: { meaning: '革故鼎新，时至则变', scene: '该改就改，时机已经到了' },
  火风鼎: { meaning: '鼎新烹饪，稳重得位', scene: '新格局已立，按新规矩办' },
  震为雷: { meaning: '震惊百里，惧而后安', scene: '突发变动会来，先稳住再应对' },
  艮为山: { meaning: '止其所止，静而定', scene: '该停就停，停下来才看得清' },
  风山渐: { meaning: '渐进有序，如鸿渐于陆', scene: '慢慢来反而到得快' },
  雷泽归妹: { meaning: '归嫁失序，宜守本分', scene: '关系里别越位，按本分处' },
  雷火丰: { meaning: '丰大光明，宜及时施为', scene: '盛时要做事，别浪费势头' },
  火山旅: { meaning: '旅居在外，谨慎自守', scene: '处在变动环境，低调稳当些' },
  巽为风: { meaning: '顺入以柔，申命行事', scene: '用柔的方式渗透，别硬碰' },
  兑为泽: { meaning: '喜悦相悦，朋友讲习', scene: '多交流多请教，气氛是好的' },
  风水涣: { meaning: '涣散离散，宜聚人心', scene: '人心散了，先把共识找回来' },
  水泽节: { meaning: '节制有度，苦节不可', scene: '设边界、控节奏，别过头' },
  风泽中孚: { meaning: '诚信居中，信则人任', scene: '诚意是当下最有效的通行证' },
  雷山小过: { meaning: '小事可过，大事不可', scene: '细节可以灵活，大方向别偏' },
  水火既济: { meaning: '事已成，慎终如始', scene: '做成之后更要防松懈' },
  火水未济: { meaning: '事未成，慎辨慎行', scene: '还差一步，别急着庆祝' },
};

const HEX_BY_CORE = Object.fromEntries(
  Object.keys(HEX64).map((full) => {
    const core = full.length > 2 ? full.slice(2) : full.slice(0, 1);
    return [core, full];
  })
);

const ZIWEI_STARS = {
  紫微: {
    trait: '有主见、重体面，习惯站在统筹的位置',
    work: '适合需要拍板与统筹的岗位，管理、政务、项目负责一类',
    love: '在关系里需要被尊重，慢热但认真',
    health: '留意血压与作息紊乱',
  },
  天机: {
    trait: '脑子转得快，兴趣多、想法多',
    work: '适合策划、技术、咨询、研发一类动脑的岗位',
    love: '容易被有趣的人吸引，需要精神共鸣',
    health: '思虑多，留意神经紧张与睡眠',
  },
  太阳: {
    trait: '外放热心，愿意付出、也愿意被看见',
    work: '适合对外型岗位，教学、销售、公关、公益一类',
    love: '主动付出型，注意别一厢情愿',
    health: '留意心血管与用眼过度',
  },
  武曲: {
    trait: '务实、讲效率，认结果不认空话',
    work: '适合金融、财务、工程、执行类岗位',
    love: '感情表达偏实在，用行动多于言语',
    health: '留意呼吸系统与过劳',
  },
  天同: {
    trait: '温和好相处，重感受，凡事求舒服',
    work: '适合服务、文职、教育、文创一类低对抗的岗位',
    love: '需要陪伴感，容易被温柔的人打动',
    health: '留意免疫力与情绪性不适',
  },
  廉贞: {
    trait: '细腻又较真，审美与原则都在意',
    work: '适合需要精细度的岗位，法务、审计、设计、医疗一类',
    love: '感情投入深，也容易较劲',
    health: '留意炎症与情绪郁结',
  },
  天府: {
    trait: '稳重可靠，善于守成与资源调度',
    work: '适合行政、财务、运营、仓储一类守盘型岗位',
    love: '倾向稳定长久的关系',
    health: '留意体重与消化负担',
  },
  太阴: {
    trait: '内敛敏感，心思细，重安全感',
    work: '适合研究、文案、财务、艺术一类安静专注的岗位',
    love: '慢热、重细节，需要被照顾到感受',
    health: '留意睡眠与内分泌节律',
  },
  贪狼: {
    trait: '好奇心强、人缘好，兴趣广泛',
    work: '适合业务、市场、传媒、跨界的开拓型岗位',
    love: '桃花偏旺，需要自己划清边界',
    health: '留意肝火与作息不规律',
  },
  巨门: {
    trait: '善于分析，也容易多疑，嘴上功夫好',
    work: '适合法务、教学、咨询、谈判一类靠口才与逻辑的岗位',
    love: '容易因多想而生误会，宜多说清楚',
    health: '留意口腔、呼吸道与思虑过度',
  },
  天相: {
    trait: '讲规矩、重协调，习惯做辅佐者',
    work: '适合秘书、执行、协调、后勤一类支撑型岗位',
    love: '关系里偏迁就，需要学会表达需求',
    health: '留意皮肤与免疫波动',
  },
  天梁: {
    trait: '有长者气，爱操心、乐意帮人',
    work: '适合教育、医护、公益、顾问一类助人的岗位',
    love: '照顾型伴侣，别把对方当孩子',
    health: '留意慢病管理与过劳',
  },
  七杀: {
    trait: '果断敢冲，抗压但容易硬碰硬',
    work: '适合开拓、销售、创业、外勤一类高挑战岗位',
    love: '感情来得快，需要留给对方缓冲',
    health: '留意意外伤害与旧伤复发',
  },
  破军: {
    trait: '喜新厌旧，敢破敢立，不走老路',
    work: '适合变革、创业、项目从零到一的岗位',
    love: '感情变动偏多，稳定需要共同目标',
    health: '留意泌尿与外伤',
  },
};

const WUXING_INDUSTRY = {
  木: '教育培训、出版撰稿、文职行政、农林园艺、中医药、服装与设计、文创',
  火: '互联网、传媒影视、能源电力、餐饮与品牌、演艺传播、电子科技',
  土: '地产建筑、物业管理、行政人事、农业种植、供应链仓储、财会',
  金: '金融银行、法律法务、机械制造、审计风控、医疗器械、军警安保',
  水: '物流贸易、咨询顾问、传媒公关、旅游出行、科研水产、信息技术',
};

const WUXING_ORGAN = {
  木: { part: '肝胆、筋骨', note: '情绪疏泄与久坐久视是主要负担' },
  火: { part: '心脏、小肠、血脉', note: '睡眠节律与情绪起伏最需留意' },
  土: { part: '脾胃、肌肉', note: '饮食规律与消化吸收是关键' },
  金: { part: '肺、大肠、呼吸道与皮肤', note: '空气质量与换季是敏感点' },
  水: { part: '肾、膀胱、内分泌与腰膝', note: '过劳与熬夜最先反映在这里' },
};

const TENGOD_STYLE = {
  正官: '守规矩、重名分，适合在成体系的组织里按规则上升',
  七杀: '抗压敢拼，适合高挑战、需要快速决断的岗位',
  正财: '稳定务实，适合按劳取酬、积累型的路径',
  偏财: '善抓机会、人脉广，适合业务、投资、资源整合类',
  食神: '表达与创造见长，适合技术、创作、教育一类',
  伤官: '想法多、不服旧规，适合改革、创业、专业创意',
  正印: '学习力强、有耐心，适合研究、文教、需要资质的岗位',
  偏印: '偏门钻研，适合冷门专业、技术深耕',
  比肩: '独立能扛，适合并肩作战或独立负责一块',
  劫财: '行动快、竞争心强，适合业务冲刺型工作',
};

const LIUREN_JIANG = {
  贵人: '贵人、助力、被提携',
  螣蛇: '缠绕、反复、惊扰不定',
  朱雀: '口舌、文书、消息是非',
  六合: '合作、契约、和合之事',
  勾陈: '牵绊、拖延、纠缠难断',
  青龙: '喜庆、财禄、顺利推进',
  天空: '虚空、不实、计划落空',
  白虎: '压力、病丧、突发阻碍',
  太常: '衣食、常规、平稳运行',
  玄武: '暗昧、失物、信息不明',
  太阴: '隐秘、暗中助力、私下的事',
  天后: '女性、恩泽、情感与照料',
};

const DISCLAIMER =
  '以上解析由本插件依据你提供的出生信息（或起卦时刻）按传统命理规则生成，属文化娱乐与自我觉察的参考，' +
  '不构成医疗、心理、投资、法律或人事决策的依据。涉及健康请咨询医生，涉及重大决定请以现实信息与专业人士意见为准。';

const TAROT_ELEMENT_FOCUS = {
  火: { area: '行动力与热情', advice: '把能量投到一件具体的事上，别同时开太多头' },
  水: { area: '情感与关系', advice: '先照顾好感受，再谈效率' },
  风: { area: '思考与沟通', advice: '把想法写下来，与相关的人说清楚' },
  土: { area: '现实与资源', advice: '落实成可执行的步骤，写明时间和预算' },
};

return { TRIGRAM, YAO_POSITION, MOVING_NATURE, HEX64, HEX_BY_CORE, ZIWEI_STARS, WUXING_INDUSTRY, WUXING_ORGAN, TENGOD_STYLE, LIUREN_JIANG, DISCLAIMER, TAROT_ELEMENT_FOCUS };
})();

__mods.interpret = (function () {

const { HEX64, HEX_BY_CORE, TRIGRAM, YAO_POSITION, MOVING_NATURE, ZIWEI_STARS, WUXING_INDUSTRY, WUXING_ORGAN, TENGOD_STYLE, LIUREN_JIANG, TAROT_ELEMENT_FOCUS, DISCLAIMER } = __mods['interpret-data'];
const { MUTAGEN } = __mods.ziwei;

const DIMENSIONS = [
  { key: 'overall', label: '整体运势' },
  { key: 'work', label: '工作与职业选择' },
  { key: 'career', label: '事业发展' },
  { key: 'love', label: '爱情与感情' },
  { key: 'health', label: '健康状况' },
];

const MODULE_TYPE = {
  bazi: 'natal', ziwei: 'natal',
  liuyao: 'divination', meihua: 'divination', daliuren: 'divination',
  tarot: 'card',
};

const SYSTEM_LABEL = {
  bazi: '八字', ziwei: '紫微斗数', liuyao: '六爻',
  meihua: '梅花易数', daliuren: '大六壬', tarot: '塔罗',
};

const DIRECTIONS = [
  { key: 'general', label: '综合', dim: null, focus: '' },
  { key: 'wealth', label: '财运', dim: 'work', focus: '钱财进出的落点主要看「工作与职业选择」与「事业发展」这两条。' },
  { key: 'career', label: '事业', dim: 'career', focus: '事业发展这条与你的问题最直接。' },
  { key: 'love', label: '感情', dim: 'love', focus: '感情这条与你的问题最直接。' },
  { key: 'health', label: '健康', dim: 'health', focus: '健康这条与你的问题最直接；下面只作提醒，不作任何诊断。' },
  { key: 'study', label: '学业', dim: 'career', focus: '学业与考试更贴近「事业发展」这条，讲的是长期积累与阶段进展。' },
  { key: 'travel', label: '出行', dim: 'overall', focus: '出行与迁动更贴近「整体运势」这条，看的是当下这一段的大环境。' },
];

const DIRECTION_DEFAULT = 'general';
const dirOf = (key) => DIRECTIONS.find((d) => d.key === key) || DIRECTIONS[0];

function askOf(opts) {
  const o = isObj(opts) ? opts : {};
  const question = typeof o.question === 'string' ? o.question.trim().slice(0, 200) : '';
  const d = dirOf(o.direction);
  return {
    question,
    direction: d.key,
    directionLabel: d.label,
    echo: `问题：${question || '（未填写）'} ｜ 询问方向：${d.label}`,
  };
}

function applyAsk(dims, ask, lead) {
  const list = Array.isArray(dims) ? dims.slice() : [];
  const d = dirOf(ask && ask.direction);
  if (d.dim) {
    const i = list.findIndex((x) => x && x.key === d.dim);
    if (i > 0) { const hit = list[i]; list.splice(i, 1); list.unshift(hit); }
    if (list[0] && list[0].key === d.dim) {
      const head = ask.question
        ? `就你所问的「${ask.question}」来看（${d.label}方向）——${d.focus}`
        : `按${d.label}这个方向看——${d.focus}`;
      list[0] = Object.assign({}, list[0], { text: `${head}${list[0].text}`, focused: true });
    }
  }
  let l = lead || '';
  if (ask.question) l = `你问的是「${ask.question}」${d.key === 'general' ? '。' : `，方向是${d.label}。`}${l}`;
  else if (d.key !== 'general') l = `方向是${d.label}。${l}`;
  return { dims: list, lead: l };
}

const TIER_TEXT = {
  大吉: '外部环境对你比较配合，属于可以主动争取的阶段',
  吉: '整体偏顺，适合稳步推进手上的事',
  平: '起伏不大，更适合打基础、补短板',
  忌: '摩擦与消耗偏多，宜守成、减少冒进',
  大忌: '压力相对集中，宜降低预期、先保住基本盘',
};

const TIER_ADVICE = {
  大吉: '想做的事可以排进日程，别只停在想法上',
  吉: '按已有节奏走，把一件事做完整比开新头更划算',
  平: '把精力投向积累：技能、资质、人脉都算数',
  忌: '少做大的调整，先把手上的事收尾',
  大忌: '给自己留出缓冲，重要决定不妨往后放一放',
};

const isObj = (v) => v && typeof v === 'object';
const pick = (o, k, d = '') => (isObj(o) && o[k] != null ? o[k] : d);
const join = (arr, sep = '、') => (Array.isArray(arr) ? arr.filter(Boolean).join(sep) : String(arr || ''));

function hexInfo(name, upper, lower) {
  if (HEX64[name]) return { full: name, ...HEX64[name] };
  const core = typeof name === 'string' && name.length > 2 ? name.slice(2) : name;
  if (HEX_BY_CORE[core]) {
    const full = HEX_BY_CORE[core];
    return { full, ...HEX64[full] };
  }
  const u = TRIGRAM[upper] || {};
  const l = TRIGRAM[lower] || {};
  return {
    full: name || '本卦',
    meaning: `${u.nature || upper || ''}在${l.nature || lower || ''}上，${u.trait || ''}遇${l.trait || ''}`.trim(),
    scene: '按上下卦的取象体会这一卦的大意',
  };
}

function godFromPattern(name) {
  const s = String(name || '');
  if (/七杀/.test(s)) return '七杀';
  if (/正官/.test(s)) return '正官';
  if (/正财/.test(s)) return '正财';
  if (/偏财|财格/.test(s)) return '偏财';
  if (/伤官/.test(s)) return '伤官';
  if (/食神|食伤/.test(s)) return '食神';
  if (/正印/.test(s)) return '正印';
  if (/偏印|枭/.test(s)) return '偏印';
  if (/劫财/.test(s)) return '劫财';
  if (/比肩|比劫/.test(s)) return '比肩';
  if (/官/.test(s)) return '正官';
  if (/财/.test(s)) return '偏财';
  if (/印/.test(s)) return '正印';
  return '';
}

function yaoGist(pos, moving) {
  const y = YAO_POSITION.find((x) => x.pos === pos) || YAO_POSITION[0];
  return `${y.name}（${y.gist}）：${y.tone}${moving ? '；此处发动，' + (moving.yinYang === '阳' ? MOVING_NATURE.yang : MOVING_NATURE.yin) : ''}`;
}

function baziInterpret(r) {
  const dm = isObj(r.dayMaster) ? r.dayMaster : {};
  const st = isObj(r.strength) ? r.strength : {};
  const frame = isObj(r.frame) ? r.frame : {};
  const ys = isObj(frame.yongshen) ? frame.yongshen : {};
  const wx = isObj(r.wuxing) ? r.wuxing : {};
  const level = pick(st, 'level', '中和');
  const favor = Array.isArray(ys.favor) ? ys.favor : [];
  const avoid = Array.isArray(ys.avoid) ? ys.avoid : [];
  const primary = pick(frame, 'primaryName', '未取定');
  const gender = pick(r.input, 'gender', '');
  const isMale = gender === 'male';

  const age = Number(pick(r.liunian?.[0], 'age', NaN));
  const list = Array.isArray(r.dayun?.list) ? r.dayun.list : [];
  let cur = null;
  for (const d of list) {
    if (Number.isFinite(age) && Number(d.startAge) <= age) cur = d;
  }
  if (!cur && list.length) cur = list[0];
  const curLuck = isObj(cur?.luck) ? cur.luck : {};
  const curTier = pick(curLuck, 'tier', '平');
  const ln = isObj(r.liunian?.[0]) ? r.liunian[0] : {};
  const lnLuck = isObj(ln.luck) ? ln.luck : {};
  const lnTier = pick(lnLuck, 'tier', '平');

  const groups = isObj(frame.godStats?.groups) ? frame.godStats.groups : {};
  const top = Object.entries(groups).sort((a, b) => b[1] - a[1]);
  const topName = top[0]?.[0] || '';
  const secondName = top[1]?.[0] || '';

  const wxEntries = Object.entries(wx).sort((a, b) => b[1] - a[1]);
  const strongest = wxEntries[0]?.[0] || '';
  const weakest = wxEntries[wxEntries.length - 1]?.[0] || '';
  const missing = Object.keys(wx).filter((k) => Number(wx[k]) === 0);

  const idx = cur ? list.indexOf(cur) : -1;

  const cross = [];
  const GAN_WX = { 甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土', 己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水' };
  const ganWx = (gz) => GAN_WX[String(gz || '')[0]] || '';
  const ZHI_WX = { 子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火', 午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水' };
  if (cur) {
    const dw = ganWx(cur.ganzhi);
    if (dw) {
      if (favor.includes(dw)) cross.push(`当前大运 ${cur.ganzhi} 走${dw}，正是喜用，这十年推事情比平时省力；${topName ? `可把力气放在${topName}对应的事上` : '适合把长期计划铺开'}。`);
      else if (avoid.includes(dw)) cross.push(`当前大运 ${cur.ganzhi} 走${dw}，落在忌神上，这十年更适合守成、补短板，不宜大杠杆扩张。`);
      else cross.push(`当前大运 ${cur.ganzhi} 走${dw}，既非喜用也非忌神，属于平运，结果更多取决于你在这段里做了什么。`);
    }
  }
  if (missing.length) {
    const good = missing.filter((m) => avoid.includes(m));
    const bad = missing.filter((m) => favor.includes(m));
    if (good.length) cross.push(`命局缺 ${good.join('、')}，而它正是你的忌神——缺得刚好，不必刻意去补。`);
    if (bad.length) cross.push(`命局缺 ${bad.join('、')}，这恰是喜用，是这盘的短板：靠环境、行业与身边人来补，比自己硬扛有效。`);
  }
  if (topName && primary) {
    const godOfPattern = godFromPattern(primary);
    if (godOfPattern && topName && godOfPattern === topName) cross.push(`格局 ${primary} 与最重的${topName}一致，说明你的能量集中在同一条线上，长处突出、短板也集中。`);
    else if (godOfPattern) cross.push(`格局 ${primary}（偏${godOfPattern}）与最重的${topName}不在一条线上，内在会有两股力气拉扯：一边是格局给你的路，一边是你本能投入最多的事。`);
  }
  const hasRen = Array.isArray(r.shensha) && r.shensha.some((g) => (g.items || []).some((i) => i.name === '羊刃'));
  if (hasRen && Number(groups['官杀'] || 0) >= 1) {
    cross.push('命见羊刃且官杀有力，属压力驱动型：遇强则强，但需要出口，长期憋着容易内耗；运动或竞技类爱好比"忍"更有用。');
  }
  if (r.pillars?.day) {
    const isM = r.input?.gender === 'male';
    const spouseGod = isM ? '财' : '官杀';
    const spVal = Number(groups[spouseGod] || 0);
    const zhiWx = ZHI_WX[r.pillars.day.branch] || '';
    if (spVal >= 2 && zhiWx && favor.includes(zhiWx)) cross.push(`配偶星（${spouseGod}）不弱，且日支 ${r.pillars.day.branch} 属喜用，感情中有实际助益，不只看感觉。`);
    else if (spVal === 0) cross.push(`命局不见${spouseGod}，感情多靠自己主动创造场景；日支 ${r.pillars.day.branch} 更像"对方的样子"而不是"缘分的强度"。`);
  }

  const ahead = idx >= 0 ? list.slice(idx + 1, idx + 4) : list.slice(0, 3);
  const ev = (...xs) => xs.filter((x) => x != null && x !== '');

  const dimensions = [
    {
      key: 'overall', label: '整体运势',
      text: `你的日主是${dm.stem}（五行属${dm.element}），命局${level}（${pick(st, 'score', '')} 分）。` +
        `用神取向偏${join(favor)}，忌${join(avoid)}——往${join(favor)}的方向走会更省力${ys.tiaohou && ys.tiaohou.note ? `；调候上${ys.tiaohou.note}` : ''}。` +
        `目前走在${pick(cur, 'ganzhi', '当前')}大运（${curTier}），${pick(ln, 'year', '今年')}年流年${pick(ln, 'ganzhi', '')}为${lnTier}。`,
      advice: `大运看：${TIER_TEXT[curTier] || TIER_TEXT.平}；流年看：${TIER_ADVICE[lnTier] || TIER_ADVICE.平}。大方向定在${join(favor)}相关的领域，会比硬扛${join(avoid)}顺畅一些。`,
      evidence: ev(
        `日主 ${dm.stem}${dm.element}·${level}`,
        st && st.parts && st.parts.season ? `月令 ${st.parts.season.branch}${st.parts.season.element}` : '',
        `喜 ${join(favor)} / 忌 ${join(avoid)}`,
        cur ? `大运 ${cur.ganzhi}·${curTier}` : '',
        ln && ln.ganzhi ? `流年 ${ln.year}${ln.ganzhi}·${lnTier}` : '',
      ),
    },
    {
      key: 'work', label: '工作与职业选择',
      text: `按喜用神看，${join(favor)}这几类方向对你更有利，可参考的行业包括：${favor.slice(0, 2).map((e) => WUXING_INDUSTRY[e] || '').filter(Boolean).join('；') || '暂未取定，可先按兴趣与能力试'}。` +
        `命局主格为${primary}，这类结构的人通常${TENGOD_STYLE[godFromPattern(primary)] || '有自己稳定的节奏'}。` +
        `十神中${topName}最重（${top[0]?.[1] ?? ''}），${secondName}次之，说明你在${topName}所代表的事项上投入的精力最多。`,
      advice: `选岗位时可以偏向「${join(favor)}属性 + ${topName}对应的事务」；如果现在的工作明显偏${join(avoid)}且长期让你疲惫，可以参考上面方向做小幅试探，不必立刻大改。`,
      evidence: ev(
        `主格 ${primary}`,
        `喜用五行 ${join(favor)}`,
        top.length ? `十神 ${top.slice(0, 3).map(([k, v]) => `${k}${v}`).join(' ')}` : '',
      ),
    },
    {
      key: 'career', label: '事业发展',
      text: `${primary}的格局，配合十神里${topName}偏旺的结构，事业上更适合${topName === '财' ? '靠业绩与资源积累说话' : topName === '官杀' ? '在有规则的组织里按层级上升' : topName === '印' ? '凭资质、专业与口碑取胜' : topName === '食伤' ? '靠作品、技术与表达打开局面' : '与人并肩、共同承担的方式'}。` +
        `接下来几步大运依次为：${ahead.map((d) => `${d.ganzhi}（${d.luck?.tier || '平'}）`).join(' → ') || '暂未排出'}，` +
        `整体节奏是${ahead.length && ahead.filter((d) => ['吉', '大吉'].includes(d.luck?.tier)).length >= 2 ? '先抑后扬、后段更顺' : '需要一步步积累，中间偶有起伏'}。`,
      advice: `把${ahead[0]?.ganzhi || '下一步'}这一步当作铺垫期，重点补${topName === '食伤' ? '作品与专业深度' : topName === '官杀' ? '资历与组织内的信任' : '可迁移的能力与资质'}；遇到${join(avoid)}过重的年份，优先保住已有成果。`,
      evidence: ev(
        `格局 ${primary}`,
        ahead.length ? `后续大运 ${ahead.map((d) => d.ganzhi).join(' → ')}` : '',
        `当前 ${pick(cur, 'ganzhi', '—')}·${curTier}`,
      ),
    },
    {
      key: 'love', label: '爱情与感情',
      text: `${isMale ? '男命以财星看妻缘' : '女命以官杀看夫缘'}，你命局中${isMale ? '财' : '官杀'}的力量为${groups[isMale ? '财' : '官杀'] ?? '—'}，` +
        `${Number(groups[isMale ? '财' : '官杀'] || 0) >= 2 ? '缘分出现的机会不算少' : '需要自己主动创造认识人的场景'}。` +
        `日支（配偶宫）为${pick(r.pillars?.day, 'branch', '')}，坐${pick(r.pillars?.day, 'zizuo', '')}，` +
        `这里的信号是：${Number(groups[isMale ? '财' : '官杀'] || 0) >= 2 ? '关系里你容易被主动靠近，但要留意筛选' : '感情推进偏慢，属于需要经营的类型'}。`,
      advice: `不必急着要结果，先看清自己在关系里最在意什么。${Number(groups[isMale ? '财' : '官杀'] || 0) >= 2 ? '选项多时，明确标准反而更省心' : '可以把社交圈稍微扩大一点，但别为了脱单降低底线'}；沟通上多说具体需求，少让对方猜。`,
      evidence: ev(
        `${isMale ? '财' : '官杀'} 权重 ${groups[isMale ? '财' : '官杀'] ?? '—'}`,
        `日支 ${pick(r.pillars?.day, 'branch', '')}·${pick(r.pillars?.day, 'zizuo', '')}`,
        `配偶星 ${isMale ? '财' : '官杀'}`,
      ),
    },
    {
      key: 'health', label: '健康状况',
      text: `五行分布上，${strongest}最旺、${weakest}最弱${missing.length ? `，其中${join(missing)}在命局中没有明现` : ''}。` +
        `按五行与身体的对应，${strongest}偏旺时${WUXING_ORGAN[strongest]?.part || ''}负担相对重（${WUXING_ORGAN[strongest]?.note || ''}）；` +
        `${weakest}偏弱则${WUXING_ORGAN[weakest]?.part || ''}偏弱一些，是更值得留意的部分。这只是传统命理的取象提示，不是诊断。`,
      advice: `建议把作息规律放在第一位——尤其是睡眠时长尽量稳定；${WUXING_ORGAN[weakest]?.note ? weakest + '对应的' + WUXING_ORGAN[weakest].part + '可以按体检项目关注' : '按常规体检关注'}。任何不适请去看医生，别用命理结论替代检查。`,
      evidence: ev(
        `五行 ${Object.entries(wx).map(([k, v]) => `${k}${v}`).join(' ')}`,
        `最旺 ${strongest} / 最弱 ${weakest}`,
        missing.length ? `缺 ${join(missing)}` : '',
      ),
    },
  ];

  const sections = [
    ...(cross.length ? [{ key: 'cross', label: '交叉判断', text: cross.join('　') }] : []),
    {
      key: 'yongshen', label: '用神与忌神',
      text: `喜用：${join(favor)}（对应十神：${join(ys.favorTenGods || ys.favorRoles || [])}）；忌：${join(avoid)}（对应十神：${join(ys.avoidTenGods || ys.avoidRoles || [])}）。` +
        `${pick(ys, 'detail', '')}`,
    },
    {
      key: 'geju', label: '格局依据',
      text: (Array.isArray(frame.geju) ? frame.geju : []).map((g) => `${g.name}（${g.kind}）：${g.evidence}`).join('；') || '未取到格局',
    },
  ];

  return {
    lead: `下面按五个维度拆开说。所有内容来自你这张命盘的结构，讲的是倾向与建议，不是预言——方向供你参考，怎么走在你自己。`,
    dimensions, sections,
  };
}

const ZW_MAIN = Object.keys(ZIWEI_STARS);

function zwPalace(r, name) {
  return (r.palaces || []).find((p) => p.palace === name) || null;
}
function zwMainStar(p) {
  if (!p) return null;
  const s = (p.stars || []).find((x) => ZW_MAIN.includes(x.name));
  return s ? s.name : null;
}
function zwSha(p) {
  return (p?.stars || []).filter((s) => s.type === '煞星').map((s) => s.name);
}

const SIHUA_ORDER = ['禄', '权', '科', '忌'];

function zwNatalSihua(r) {
  const palaces = Array.isArray(r?.palaces) ? r.palaces : [];

  const placed = new Map();
  for (const p of palaces) {
    for (const s of (p.stars || [])) {
      if (!s || !s.mutagen || placed.has(s.name)) continue;
      placed.set(s.name, { type: s.mutagen, palace: p.palace || null });
    }
  }

  const ganzhi = pick(r, 'yearGanzhi', '');
  const yearStem = typeof ganzhi === 'string' ? ganzhi.slice(0, 1) : '';
  const table = MUTAGEN[yearStem] || {};
  const starOfType = {};
  for (const [star, type] of Object.entries(table)) starOfType[type] = star;

  const out = [];
  for (const type of SIHUA_ORDER) {
    let star = starOfType[type] || '';
    if (!star) {
      for (const [name, info] of placed) {
        if (info.type === type) { star = name; break; }
      }
    }
    if (!star) continue;
    const hit = placed.get(star);
    out.push({ star, type, palace: hit ? hit.palace : null });
  }
  return out;
}

function zwSihuaText(list) {
  if (!Array.isArray(list) || !list.length) return '';
  return list
    .map((m) => (m.palace ? `${m.star}化${m.type}于${m.palace}` : `${m.star}化${m.type}（未上盘）`))
    .join('、');
}

function ziweiInterpret(r) {
  const soul = zwPalace(r, '命宫') || (r.palaces || [])[0];
  const career = zwPalace(r, '官禄');
  const wealth = zwPalace(r, '财帛');
  const spouse = zwPalace(r, '夫妻');
  const health = zwPalace(r, '疾厄');
  const move = zwPalace(r, '迁移');

  const soulOwn = zwMainStar(soul);
  const moveStar = zwMainStar(move);
  const lifeM = ZW_MAIN.includes(pick(r, 'lifeMaster')) ? r.lifeMaster : null;
  let soulStar = soulOwn || moveStar || lifeM || '紫微';
  const soulFrom = soulOwn
    ? `你的命宫主星是${soulStar}`
    : moveStar
      ? `你的命宫无正曜，按紫微的规则借对宫（迁移）来看，主星是${soulStar}`
      : `你的命宫与对宫都没有正曜，这里按命主星${soulStar}来看`;
  const S = ZIWEI_STARS[soulStar] || ZIWEI_STARS.紫微;

  const careerStar = zwMainStar(career);
  const wealthStar = zwMainStar(wealth);
  const spouseStar = zwMainStar(spouse);
  const healthStar = zwMainStar(health);

  const age = Number(pick(r.liunian?.[0], 'age', NaN));
  let daxianPalace = null;
  for (const p of r.palaces || []) {
    const d = p.daxian || {};
    if (Number.isFinite(age) && Number(d.start) <= age && age <= Number(d.end)) daxianPalace = p;
  }
  const patterns = Array.isArray(r.patterns) ? r.patterns : [];
  const patText = patterns.length
    ? patterns.slice(0, 3).map((p) => `${p.name}（${p.tone === 'good' ? '偏吉' : p.tone === 'bad' ? '需留意' : '中性'}：${p.evidence}）`).join('；')
    : '本盘未触发常见格局条目';
  const lnMutagen = Array.isArray(r.liunian?.[0]?.mutagen) ? r.liunian[0].mutagen.slice(0, 4).join('、') : '';
  const natalSihua = zwNatalSihua(r);
  const natalSihuaText = zwSihuaText(natalSihua);

  const dimensions = [
    {
      key: 'overall', label: '整体运势',
      text: `${soulFrom}，性格底色上${S.trait}。本盘${patText}。` +
        `当前大限走在${daxianPalace ? `${daxianPalace.palace}（${daxianPalace.daxian.start}–${daxianPalace.daxian.end}岁）` : '当前阶段'}，` +
        `${lnMutagen ? `流年四化为${lnMutagen}，本年的变化感主要落在这几颗星上` : '流年四化信号不明显'}。` +
        (r.flow ? `再往下一层，当前流月命宫是${r.flow.month.ganzhi}，落在原局${r.flow.month.palace || '未上盘'}，本月的变化更容易在这一宫代表的事情上显出来。` : '') +
        (natalSihuaText
          ? `另外你本命的生年四化落在：${natalSihuaText}——这是你这辈子比较稳定的底色，不随某一年改变。`
          : ''),
      advice: `这一阶段的主题更接近「${daxianPalace ? daxianPalace.palace : '命宫'}」代表的事——把它当作今年的主线，其余事围绕它安排；${S.trait}是你的优势，也是需要留意别用过头的地方。`,
      evidence: [
        `命宫 ${soulStar}${soulOwn ? '' : '（借对宫）'}`,
        daxianPalace ? `大限 ${daxianPalace.palace} ${daxianPalace.daxian.start}–${daxianPalace.daxian.end}岁` : '',
        lnMutagen ? `流年四化 ${lnMutagen}` : '',
        `格局 ${patterns.length} 条`,
      ].filter(Boolean),
    },
    {
      key: 'work', label: '工作与职业选择',
      text: `命宫${soulStar}给出的是底层偏好：${S.work}。官禄宫${careerStar ? `主星为${careerStar}，${ZIWEI_STARS[careerStar]?.work || '有其自身的做事方式'}` : '无正曜，工作方式更多受环境与他人影响，适合配合型岗位'}。` +
        `两者合起来看，你更适合${careerStar && careerStar !== soulStar ? `用${soulStar}的方式去做${careerStar}擅长的事` : '在稳定的框架里发挥自己的特点'}。`,
      advice: `挑工作时可以优先看岗位内容是否匹配上面这条；如果暂时不能换，试着在现有岗位里争取靠近这部分的事务，会比硬熬更容易做出成绩。`,
      evidence: [`命宫 ${soulStar}`, `官禄 ${careerStar || '无正曜'}`, `财帛 ${wealthStar || '无正曜'}`],
    },
    {
      key: 'career', label: '事业发展',
      text: `财帛宫${wealthStar ? `见${wealthStar}，${ZIWEI_STARS[wealthStar]?.trait || ''}` : '无正曜'}，官禄宫${careerStar || '无正曜'}，` +
        `${wealthStar && careerStar ? '财与事业两宫都有主星坐守，说明这两块是可以主动经营的部分' : '有一宫无主星，说明该块更容易受外部条件牵动，宜借势而非强求'}。` +
        `大限推进上，${daxianPalace ? `目前落在${daxianPalace.palace}` : '当前阶段'}，下一步会转入相邻的宫位，重心也会跟着挪。`,
      advice: `事业上建议做两件事：一是把可积累的东西（技能、资质、作品）做厚；二是${careerStar ? `发挥${careerStar}的优势——${ZIWEI_STARS[careerStar]?.trait || ''}` : '找一个能带你的前辈或平台'}。遇到四化化忌的年份，先守成再谈扩张。`,
      evidence: [
        `财帛 ${wealthStar || '无正曜'}`,
        `官禄 ${careerStar || '无正曜'}`,
        daxianPalace ? `当前大限 ${daxianPalace.palace}` : '',
      ].filter(Boolean),
    },
    {
      key: 'love', label: '爱情与感情',
      text: `夫妻宫${spouseStar ? `主星为${spouseStar}，感情上的倾向是${ZIWEI_STARS[spouseStar]?.love || '有自己相处的节奏'}` : '无正曜，关系状态更多由对方与互动方式决定'}。` +
        `${zwSha(spouse).length ? `夫妻宫同时见${join(zwSha(spouse))}，相处中容易出现摩擦或第三者干扰的暗示，但煞星不等于定局，更多是提醒你留意沟通方式` : '夫妻宫未见明显煞星，关系的基调相对平顺'}。`,
      advice: `感情里${spouseStar ? `参考${spouseStar}的特点：${ZIWEI_STARS[spouseStar]?.love || ''}` : '可以更主动地表达自己的需求'}。有分歧时先说清事实与感受，别急着下结论；关系的好坏取决于两个人怎么做，不取决于这张盘。`,
      evidence: [
        `夫妻宫 ${spouseStar || '无正曜'}`,
        `煞星 ${join(zwSha(spouse)) || '无'}`,
        `夫妻宫支 ${spouse && spouse.branch ? spouse.branch : '—'}`,
      ],
    },
    {
      key: 'health', label: '健康状况',
      text: `疾厄宫${healthStar ? `见${healthStar}，传统取象上${ZIWEI_STARS[healthStar]?.health || '需要留意自身的薄弱环节'}` : '无正曜，身体状态更多受生活作息直接影响'}。` +
        `${zwSha(health).length ? `同时见${join(zwSha(health))}，提示这一块值得比其他部位多一分留意。` : ''}这些都是象征性的提示，不构成任何医学判断。`,
      advice: `把${healthStar ? ZIWEI_STARS[healthStar]?.health?.replace('留意', '').replace('需要留意', '') || '常规' : '常规'}当作体检时重点关注的参考；真正管用的还是规律作息、适度运动与定期检查。身体不舒服请直接就医。`,
      evidence: [
        `疾厄宫 ${healthStar || '无正曜'}`,
        `煞星 ${join(zwSha(health)) || '无'}`,
      ],
    },
  ];

  const sections = [
    { key: 'palaces', label: '关键宫位', text: `命宫${soulStar}　官禄${careerStar || '无正曜'}　财帛${wealthStar || '无正曜'}　夫妻${spouseStar || '无正曜'}　疾厄${healthStar || '无正曜'}` },
    { key: 'patterns', label: '格局', text: patText },
  ];
  if (natalSihua.length) {
    const ke = natalSihua.find((m) => m.type === '科') || null;
    const palaceWord = (p) => `${p}${String(p).endsWith('宫') ? '' : '宫'}`;
    const kePart = ke
      ? `其中化科是${ke.star}${ke.palace ? `落在${palaceWord(ke.palace)}` : '未上盘'}，`
      : '';
    sections.push({
      key: 'sihua', label: '生年四化',
      text: `你出生年的天干定下四颗化星，落在：${natalSihuaText}。` +
        `读法上，化禄的宫位做起来比较顺手、也容易有人帮忙；化权的宫位偏向由你拿主意、但也更容易用力过猛；化科的宫位自带一层体面与贵人缘，遇到事多半能体面收场；化忌的宫位是你容易在意、也容易反复的地方。` +
        `${kePart}这几处只是长期倾向，落到具体某一年还要配上流年四化一起看，不必把它当成结论。`,
    });
  }

  if (r.flow) {
    const f = r.flow;
    const at = (p) => `${p.ganzhi || '—'}${p.palace ? `落${p.palace}` : ''}`;
    const hits = (p) => (p.mutagenHits || []).map((m) => `${m.star}化${m.type}${m.palace ? `→${m.palace}` : ''}`).join('、');
    sections.push({
      key: 'flow',
      label: '流月 · 流日 · 流时',
      text: `以 ${f.asOf.solar}（农历 ${f.asOf.lunar}，流年 ${f.asOf.yearGanzhi}，斗君 ${f.year.doujun}）为准往下推：` +
        `流月命宫 ${at(f.month)}，四化 ${hits(f.month) || '不明显'}；` +
        `流日命宫 ${at(f.day)}，四化 ${hits(f.day) || '不明显'}；` +
        `流时命宫 ${at(f.hour)}，四化 ${hits(f.hour) || '不明显'}。` +
        `这三层的读法不一样：流月管的是一整个月的节奏，适合拿来做「这个月该推进还是该收」的判断；` +
        `流日和流时颗粒度太细，更容易被临时因素打断，看它们不如说是在看「今明两天的情绪底色」，不必逐条对号入座。`,
    });
  }

  return {
    lead: `紫微斗数看的是你与环境的互动方式。下面按五个维度拆开，讲的是性格与处境的倾向，具体怎么选仍然在你。`,
    dimensions, sections,
  };
}

function hexSections({ benName, benUpper, benLower, bianName, bianUpper, bianLower, movingLine, moving }) {
  const ben = hexInfo(benName, benUpper, benLower);
  const sections = [
    {
      key: 'guaCi', label: '卦名与卦辞大意',
      text: `本卦为「${ben.full}」，卦辞大意是：${ben.meaning}。这一卦讲的是事情当下的整体走势——你可以先记住这句，后面每个维度都会回到它。`,
    },
    {
      key: 'yaoCi', label: '爻辞与动爻',
      text: moving ? yaoGist(moving.position, moving) : '本卦无动爻，事情处于相对静止的状态，短期内变化的动力不强，宜按现状维持。',
    },
  ];
  if (bianName) {
    const bian = hexInfo(bianName, bianUpper, bianLower);
    sections.push({
      key: 'bianGua', label: '变卦与走向',
      text: `动爻变化之后得到「${bian.full}」，${bian.meaning}。变卦往往指向事情后来的样子：从「${ben.full}」走到「${bian.full}」，可以理解为局面会从${ben.scene}转为${bian.scene}。`,
    });
  }
  sections.push({
    key: 'scene', label: '落到生活里',
    text: `把这一卦放进日常：${ben.scene}。${bianName ? `而后续的方向是${hexInfo(bianName, bianUpper, bianLower).scene}。` : ''}你可以对照着看看，眼下哪件事最像这个描述。`,
  });
  return { sections, ben, bian: bianName ? hexInfo(bianName, bianUpper, bianLower) : null };
}

const LIUQIN_USE = {
  妻财: '钱财、收入、订单，也指男命的妻缘',
  官鬼: '工作、职位、上司、考核，也指压力与疾病',
  父母: '文书、合同、学历、长辈、房子',
  子孙: '下属、客户、创意、消解压力的出口',
  兄弟: '同事、同行、竞争者，多与破财相关',
};

function liuyaoInterpret(r) {
  const ben = isObj(r.ben) ? r.ben : {};
  const bian = isObj(r.bian) ? r.bian : {};
  const lines = Array.isArray(ben.lines) ? ben.lines : [];
  const moving = lines.find((l) => l.moving) || null;
  const { sections, ben: benInfo, bian: bianInfo } = hexSections({
    benName: ben.name, benUpper: ben.upper, benLower: ben.lower,
    bianName: bian.name, bianUpper: bian.upper, bianLower: bian.lower,
    moving,
  });

  const shiLine = lines.find((l) => l.position === ben.shi);
  const yingLine = lines.find((l) => l.position === ben.ying);
  const palaceEl = pick(ben, 'palaceElement', '');
  const movingLiuqin = moving?.liuqin || '';
  const movingLiushen = moving?.liushen || '';
  const dayGZ = pick(r.dayGanZhi, 'name', '');
  const cnt = (k) => lines.filter((l) => l.liuqin === k).length;
  const lineEv = (l) => (l ? `${l.position}爻${l.liuqin}${l.liushen ? '·' + l.liushen : ''}${l.moving ? '（动）' : ''}` : '—');
  const ev = (...xs) => xs.filter((x) => x != null && x !== '');

  sections.push({
    key: 'liuqin', label: '六亲取用',
    text: `这一卦里，${movingLiuqin ? `动爻落在${movingLiuqin}（${LIUQIN_USE[movingLiuqin] || ''}）` : '没有发动的六亲'}。` +
      `如果你心里有具体问题，可以对号入座：${Object.entries(LIUQIN_USE).map(([k, v]) => `${k}主${v.split('，')[0]}`).join('；')}。`,
  });

  const dimensions = [
    {
      key: 'overall', label: '整体运势',
      text: `这一卦是「${benInfo.full}」，${benInfo.meaning}。${movingLiushen ? `动爻带${movingLiushen}，事情带一点${movingLiushen === '青龙' ? '喜庆顺遂' : movingLiushen === '白虎' ? '压力与阻碍' : movingLiushen === '朱雀' ? '口舌与是非' : movingLiushen === '玄武' ? '不明朗、需要核实' : '反复与牵扯'}的色彩。` : ''}` +
        `日辰为${dayGZ}，卦宫属${palaceEl}，整体更像是${benInfo.scene}的阶段。`,
      advice: `${benInfo.scene}——顺着这句做就行。${moving ? '既然有动爻，说明事情还在变化，先观察几天再定也不迟。' : '暂无动爻，说明短期内不会有大的转折，维持现状反而是稳妥选择。'}`,
      evidence: ev(
        `本卦 ${ben.name || '—'}（${ben.upper || ''}/${ben.lower || ''}）`,
        moving ? `动爻 ${lineEv(moving)}` : '无动爻',
        `日辰 ${dayGZ || '—'}`,
        `卦宫 ${pick(ben, 'palace', '—')}·${palaceEl || '—'}`,
      ),
    },
    {
      key: 'work', label: '工作与职业选择',
      text: `问工作看官鬼与父母：本卦中${(lines.filter((l) => l.liuqin === '官鬼').length ? `官鬼出现${lines.filter((l) => l.liuqin === '官鬼').length}处，${lines.find((l) => l.liuqin === '官鬼').moving ? '且有发动，岗位或考核层面会有动作' : '但未发动，职位层面暂时平稳'}` : '未见官鬼，工作这件事在卦中不是主要矛盾')}；` +
        `${(lines.filter((l) => l.liuqin === '父母').length ? '父母（文书、合同、资质）有出现，涉及手续与材料的事要提前准备' : '父母未现，手续类事务暂无明显阻碍')}。`,
      advice: `如果正在看机会，建议先把合同、岗位职责这些落到纸面上的东西问清楚；${moving?.liuqin === '官鬼' ? '动爻在官鬼，工作层面近期有变动的迹象，可以主动谈，但别先辞再找。' : '工作层面暂无强动象，稳住手上的事更划算。'}`,
      evidence: ev(
        `官鬼 ${cnt('官鬼')} 现`,
        `父母 ${cnt('父母')} 现`,
        movingLiuqin ? `动爻六亲 ${movingLiuqin}` : '无动爻',
      ),
    },
    {
      key: 'career', label: '事业发展',
      text: `世爻（代表你）在${ben.shi}爻${shiLine ? `，六亲为${shiLine.liuqin}，${shiLine.moving ? '且发动' : '安静未动'}` : ''}；应爻（代表对方与环境）在${ben.ying}爻${yingLine ? `，六亲为${yingLine.liuqin}` : ''}。` +
        `世应之间${shiLine && yingLine ? (shiLine.liuqin === yingLine.liuqin ? '同气相求，双方立场接近' : '立场有别，需要多沟通') : '信号不明'}，` +
        `${bianInfo ? `变卦「${bianInfo.full}」提示后续走向是${bianInfo.scene}` : '暂无变卦'}。`,
      advice: `事业上的建议是：${shiLine?.moving ? '你自己这边有主动变化的意思，那就把想法说出来、把动作做出来' : '先不动，把手上的事做扎实'}；${bianInfo ? `按${bianInfo.scene}的方向去准备，会比被动等结果好。` : ''}`,
      evidence: ev(
        `世 ${lineEv(shiLine)}`,
        `应 ${lineEv(yingLine)}`,
        bian.name ? `变卦 ${bian.name}` : '无变卦',
      ),
    },
    {
      key: 'love', label: '爱情与感情',
      text: `问感情，男看妻财、女看官鬼。本卦中${(lines.filter((l) => l.liuqin === '妻财').length ? `妻财${lines.filter((l) => l.liuqin === '妻财').length}现${lines.find((l) => l.liuqin === '妻财').moving ? '且发动，感情层面有动静' : '但安静，关系暂时平缓'}` : '妻财未现，感情不是当前卦象的重点')}；` +
        `${(lines.filter((l) => l.liuqin === '官鬼').length ? '官鬼有现，对方或关系中的压力面是被看到的' : '官鬼未现')}。${benInfo.meaning}，放在关系里就是${benInfo.scene}。`,
      advice: `关系里${moving?.liuqin === '妻财' || moving?.liuqin === '官鬼' ? '近期有变化的可能，适合把话说开，别憋着' : '暂时平稳，可以按自己的节奏相处'}。卦象只给倾向，真正决定关系的是你们怎么沟通。`,
      evidence: ev(
        `妻财 ${cnt('妻财')} 现`,
        `官鬼 ${cnt('官鬼')} 现`,
        `世应 ${lineEv(shiLine)} / ${lineEv(yingLine)}`,
      ),
    },
    {
      key: 'health', label: '健康状况',
      text: `问健康，看官鬼（病）与子孙（医药、消散）。本卦中${(lines.filter((l) => l.liuqin === '官鬼').length ? `官鬼有现${lines.find((l) => l.liuqin === '官鬼').moving ? '且发动，提示身体上可能有需要留意的地方' : '，但安静，暂无明显变化'}` : '官鬼未现，卦象未指向明显的身体问题')}；` +
        `${(lines.filter((l) => l.liuqin === '子孙').length ? '子孙有现，恢复与调养的出口是有的' : '子孙未现，休息与调养需要自己主动安排')}。${movingLiushen === '白虎' ? '动爻带白虎，尤其别忽视突发的身体信号。' : ''}`,
      advice: `这一卦在健康上的提醒是${(lines.filter((l) => l.liuqin === '官鬼').length ? '别硬扛，累了就休息，有机会就做一次检查' : '维持现有作息即可，别自己吓自己')}。任何不适请就医，卦象不能替代诊断。`,
      evidence: ev(
        `官鬼 ${cnt('官鬼')} 现`,
        `子孙 ${cnt('子孙')} 现`,
        movingLiushen ? `动爻六神 ${movingLiushen}` : '',
      ),
    },
  ];

  return {
    lead: `这一卦问的是眼下的具体事。下面先讲卦理，再分五个维度落到生活里——卦象给的是倾向，不是定论。`,
    dimensions, sections,
  };
}

function meihuaInterpret(r) {
  const ben = isObj(r.ben) ? r.ben : {};
  const hu = isObj(r.hu) ? r.hu : {};
  const bian = isObj(r.bian) ? r.bian : {};
  const cuo = isObj(r.cuo) ? r.cuo : {};
  const zong = isObj(r.zong) ? r.zong : {};
  const bu = isObj(r.bodyUse) ? r.bodyUse : {};
  const lines = Array.isArray(r.lines) ? r.lines : [];
  const movingLine = lines.find((l) => l.moving) || (Number(r.moving) ? lines[Number(r.moving) - 1] : null);
  const { sections, ben: benInfo, bian: bianInfo } = hexSections({
    benName: ben.name, benUpper: ben.upper, benLower: ben.lower,
    bianName: bian.name, bianUpper: bian.upper, bianLower: bian.lower,
    moving: movingLine,
  });

  const bodyEl = pick(bu.body, 'element', '');
  const useEl = pick(bu.use, 'element', '');
  const relation = pick(bu, 'relation', '');
  const mhLevel = pick(bu, 'level', '');
  const isJi = /吉/.test(mhLevel);
  const isXiong = /凶/.test(mhLevel);

  sections.splice(1, 0, {
    key: 'tiYong', label: '体用关系',
    text: `体卦为${pick(bu.body, 'trigram', '')}（${bodyEl}），代表你自己；用卦为${pick(bu.use, 'trigram', '')}（${useEl}），代表对方与环境。${relation}（${mhLevel}）。` +
      `梅花易数看体用生克：${isJi ? '用卦对体卦有利，事情推进会相对顺' : isXiong ? '用卦克体或消耗体卦，推进中会感到阻力，宜缓不宜急' : '体用关系平和，事情按常态发展'}。`,
  });
  sections.splice(3, 0, {
    key: 'huGua', label: '互卦与过程',
    text: `互卦为「${pick(hu, 'name', '')}」，${hexInfo(hu.name, hu.upper, hu.lower).meaning}——互卦看事情中间的过程，这一段大致是这个味道。` +
      `错卦「${pick(cuo, 'name', '')}」是换个立场看同一件事，综卦「${pick(zong, 'name', '')}」是站在对方位置看，可以参考着换个角度想。`,
  });

  const dimensions = [
    {
      key: 'overall', label: '整体运势',
      text: `本卦「${benInfo.full}」，${benInfo.meaning}。体${bodyEl}用${useEl}，${relation}，判定为${mhLevel}。` +
        `${isJi ? '整体的倾向是顺的：外部环境对你不算苛刻，可以正常推进' : isXiong ? '整体有阻力：不是不能做，而是要多留余量与耐心' : '整体平稳，不会有大的起落'}。`,
      advice: `${benInfo.scene}。${isXiong ? '建议把节奏放慢，先解决卡点再谈推进' : isJi ? '可以趁势把想做的事往前推一步' : '按原计划走，不必刻意改变'}。`,
      evidence: [
        `本卦 ${benInfo.full}`,
        `互卦 ${pick(hu, 'name', '—')}`,
        `变卦 ${pick(bian, 'name', '—')}`,
        `体${bodyEl} / 用${useEl}·${relation || '—'}`,
        `判定 ${mhLevel || '—'}`,
      ].filter(Boolean),
    },
    {
      key: 'work', label: '工作与职业选择',
      text: `梅花里工作看用卦与体卦的生克：现在用卦${useEl}${isJi ? '对体卦有利，说明当下的工作环境或岗位与你的匹配度还不错' : isXiong ? '与体卦相耗，说明眼下这份工作消耗感偏重' : '与体卦关系平和，属于不好不坏'}` +
        `。本卦${benInfo.meaning}，对应到工作里就是${benInfo.scene}。`,
      advice: `${isXiong ? '如果长期觉得被消耗，可以先在内部争取调整职责，再考虑外部机会' : isJi ? '适合主动争取更多责任或更好的岗位' : '把手上的事做好，等一个明确的信号再动'}。选工作时优先考虑让你舒服的环境，长期看比短期收益重要。`,
      evidence: [`体卦 ${bodyEl}`, `用卦 ${useEl}`, `体用 ${relation || '—'}`],
    },
    {
      key: 'career', label: '事业发展',
      text: `变卦「${bianInfo ? bianInfo.full : ''}」代表事情的结局方向，${bianInfo ? bianInfo.meaning : ''}。互卦「${pick(hu, 'name', '')}」代表过程，${hexInfo(hu.name, hu.upper, hu.lower).meaning}。` +
        `合起来看：过程${hexInfo(hu.name, hu.upper, hu.lower).scene}，结果${bianInfo ? bianInfo.scene : '暂不明朗'}。`,
      advice: `按这个结构，建议${isJi ? '现在就把关键的一步迈出去' : isXiong ? '先补短板、攒条件，等下一轮再动' : '小步推进，边做边看'}。动爻在${pick(r, 'movingName', '某爻')}，变化点就在那里，值得重点关注。`,
      evidence: [
        `互卦 ${pick(hu, 'name', '—')}`,
        `变卦 ${pick(bian, 'name', '—')}`,
        `动爻 ${pick(r, 'movingName', '—')}`,
      ],
    },
    {
      key: 'love', label: '爱情与感情',
      text: `感情上看体用是否相合：体${bodyEl}与用${useEl}之间是${relation}，${isJi ? '这种组合在关系里意味着双方相处比较顺，彼此能给到支撑' : isXiong ? '这种组合提示相处中有一方付出更多，需要留意平衡' : '关系处在常态，没有特别的张力'}` +
        `。本卦${benInfo.meaning}，放到两人之间就是${benInfo.scene}。`,
      advice: `${isXiong ? '别把不满攒着，找个合适的时机说清楚；也别指望对方猜' : isJi ? '可以主动推进关系，做一些共同的事' : '维持现在的相处节奏就好'}。卦象看的是当下的气氛，关系的走向取决于你们怎么经营。`,
      evidence: [
        `体 ${bodyEl} / 用 ${useEl}`,
        `体用 ${relation || '—'}`,
        `本卦 ${benInfo.full}`,
      ],
    },
    {
      key: 'health', label: '健康状况',
      text: `梅花里健康看体卦的强弱：体卦${pick(bu.body, 'trigram', '')}属${bodyEl}，${isXiong ? '被用卦所耗，传统取象上提示近期精力消耗偏大' : isJi ? '得到生扶，精力状态相对好' : '平顺，无明显偏枯'}。` +
        `${WUXING_ORGAN[bodyEl] ? `${bodyEl}对应${WUXING_ORGAN[bodyEl].part}，${WUXING_ORGAN[bodyEl].note}。` : ''}这是取象提示，不是诊断。`,
      advice: `${isXiong ? '近期别硬撑，睡眠与饮食先稳住，有条件做一次常规体检' : '保持现在的作息即可，顺势多动一动更好'}。身体有明确的症状请直接看医生。`,
      evidence: [
        `体卦 ${pick(bu.body, 'trigram', '—')}属${bodyEl}`,
        `用卦 ${pick(bu.use, 'trigram', '—')}属${useEl}`,
        `体用 ${relation || '—'}`,
      ],
    },
  ];

  return {
    lead: `梅花易数重「体用」——你与这件事之间的关系。下面先讲卦理与体用，再分五个维度落到生活场景。`,
    dimensions, sections,
  };
}

function daliurenInterpret(r) {
  const sc = isObj(r.sanChuan) ? r.sanChuan : {};
  const chu = isObj(sc.chu) ? sc.chu : {};
  const zhong = isObj(sc.zhong) ? sc.zhong : {};
  const mo = isObj(sc.mo) ? sc.mo : {};
  const gj = isObj(r.geJu) ? r.geJu : {};
  const ke = Array.isArray(r.siKe) ? r.siKe : [];
  const jiangOf = (x) => LIUREN_JIANG[x?.jiangFull] || LIUREN_JIANG[x?.jiang] || '';

  const sections = [
    {
      key: 'sanChuan', label: '三传与事体走向',
      text: `初传${pick(chu, 'zhi', '')}（${pick(chu, 'jiangFull', '')}·${pick(chu, 'liuQin', '')}${chu.xunKong ? '·旬空' : ''}）：${jiangOf(chu) || '发端的信号'}；` +
        `中传${pick(zhong, 'zhi', '')}（${pick(zhong, 'jiangFull', '')}·${pick(zhong, 'liuQin', '')}${zhong.xunKong ? '·旬空' : ''}）：${jiangOf(zhong) || '过程的信号'}；` +
        `末传${pick(mo, 'zhi', '')}（${pick(mo, 'jiangFull', '')}·${pick(mo, 'liuQin', '')}${mo.xunKong ? '·旬空' : ''}）：${jiangOf(mo) || '结局的信号'}。` +
        `三传讲的是一件事从发端、经过到落定的过程，可以按这个顺序对照你的处境。`,
    },
    {
      key: 'geju', label: '课体与四课',
      text: `本课为${pick(gj, 'name', '未定')}${gj.detail ? `（${gj.detail}）` : ''}。${ke.length ? `四课：${ke.map((k, i) => `${i + 1}课 ${k.shang || ''}上${k.xia || ''}下`).join('　')}` : ''}`,
    },
  ];

  const chuQin = pick(chu, 'liuQin', '');
  const moQin = pick(mo, 'liuQin', '');
  const hasKong = !!(chu.xunKong || zhong.xunKong || mo.xunKong);
  const scText = JSON.stringify(sc);
  const has = (x) => scText.includes(x);
  const chuan = `初${pick(chu, 'zhi', '—')} → 中${pick(zhong, 'zhi', '—')} → 末${pick(mo, 'zhi', '—')}`;

  const dimensions = [
    {
      key: 'overall', label: '整体运势',
      text: `这一课${pick(gj, 'name', '')}${gj.detail ? `·${gj.detail}` : ''}，发端在${pick(chu, 'zhi', '')}（${jiangOf(chu) || ''}），落定在${pick(mo, 'zhi', '')}（${jiangOf(mo) || ''}）。` +
        `${hasKong ? '课中有旬空，提示事情里有「看着有、实则虚」的部分，涉及承诺与数字的要核实。' : '课中无旬空，事情相对实在。'}` +
        `整体倾向是：${/吉|生|合/.test(jiangOf(chu) + jiangOf(mo)) ? '开局与结局的象都不差，可以正常推进' : /虎|蛇|勾|空/.test(jiangOf(chu) + jiangOf(mo)) ? '过程中有牵绊与不明朗处，宜慢不宜快' : '平顺中带一点摩擦' }。`,
      advice: `${hasKong ? '先把信息核实清楚，别在含糊的基础上做决定' : '按你原本的计划推进即可'}。${/虎/.test(jiangOf(chu)) ? '开局带白虎，头几天别硬碰，先观察。' : ''}事情的局面是动态的，这一课看的是当下这一刻的气象。`,
      evidence: [
        `课体 ${pick(gj, 'name', '—')}`,
        `三传 ${chuan}`,
        `月将 ${pick(r.yueJiang, 'name', '—')}`,
        hasKong ? '课中见旬空' : '无旬空',
      ],
    },
    {
      key: 'work', label: '工作与职业选择',
      text: `工作看官鬼与青龙、太常：本课${chuQin === '官鬼' ? '初传即见官鬼，事情一上来就与职位、考核或上级有关' : `初传为${chuQin || '未取'}，${jiangOf(chu) || ''}`}。` +
        `${/青龙/.test(JSON.stringify(sc)) ? '课中见青龙，工作层面有喜庆与进益的象' : '课中未见青龙，工作层面属常态推进'}；` +
        `${/朱雀/.test(JSON.stringify(sc)) ? '见朱雀，文书、沟通与口舌要留意，材料务必留底' : ''}`,
      advice: `涉及岗位与待遇的事，建议把口头承诺落成文字；${/朱雀/.test(JSON.stringify(sc)) ? '沟通时少说满话，多留余地。' : '正常沟通即可。'}选工作时优先考虑课象中显示出支撑力的方向。`,
      evidence: [
        `初传 ${pick(chu, 'zhi', '—')}·${chuQin || '未取'}·${jiangOf(chu) || '—'}`,
        has('青龙') ? '见青龙' : '无青龙',
        has('朱雀') ? '见朱雀' : '无朱雀',
      ],
    },
    {
      key: 'career', label: '事业发展',
      text: `末传${pick(mo, 'zhi', '')}（${moQin || ''}·${jiangOf(mo) || ''}）主结局，${moQin === '官鬼' ? '结局落在官鬼，事业这条线会有明确的结果或位置变化' : moQin === '妻财' ? '结局落在妻财，更多体现为收入与资源的落袋' : moQin === '子孙' ? '结局落在子孙，压力会消散，适合收尾与转向' : '结局的信号相对中性'}。` +
        `${mo.xunKong ? '末传旬空，结局有落空的可能，别把预期定得太满。' : '末传不空，结果相对实在。'}`,
      advice: `按三传的顺序安排节奏：初传阶段先摸清情况，中传阶段处理摩擦，末传阶段收果。${mo.xunKong ? '对结果保留一点弹性，Plan B 提前想好。' : '可以朝着末传给出的方向去准备。'}`,
      evidence: [
        `末传 ${pick(mo, 'zhi', '—')}·${moQin || '未取'}·${jiangOf(mo) || '—'}`,
        mo.xunKong ? '末传旬空' : '末传不空',
        `三传 ${chuan}`,
      ],
    },
    {
      key: 'love', label: '爱情与感情',
      text: `感情看妻财与天后、六合：本课${/六合/.test(JSON.stringify(sc)) ? '见六合，有和合、契约之象，关系层面是往一起走的' : '未见六合，关系层面没有明显的和合信号'}；` +
        `${/天后/.test(JSON.stringify(sc)) ? '见天后，有被照顾、被回应的象' : ''}${/玄武/.test(JSON.stringify(sc)) ? '见玄武，提示信息不明或有隐瞒，重要的事要当面问清' : ''}` +
        `${/妻财/.test(JSON.stringify(sc)) ? '课中见妻财，感情这条线是被看到的' : ''}。`,
      advice: `${/玄武/.test(JSON.stringify(sc)) ? '关系里有看不清的地方，别猜，直接问。' : '按你感受到的相处状态来判断就好。'}卦象只反映当下的气氛，关系如何取决于两个人怎么做。`,
      evidence: [
        has('六合') ? '见六合' : '无六合',
        has('天后') ? '见天后' : '无天后',
        has('妻财') ? '见妻财' : '无妻财',
      ],
    },
    {
      key: 'health', label: '健康状况',
      text: `健康看白虎与子孙：本课${/白虎/.test(JSON.stringify(sc)) ? '见白虎，传统取象上提示身体有需要留意的地方，尤其突发的不适别忽视' : '未见白虎，卦象未指向明显的身体问题'}；` +
        `${/子孙/.test(JSON.stringify(sc)) ? '见子孙，医药与调养的出口是有的，恢复的象在' : '未见子孙，休息与调养需要自己主动安排'}。这些都是象征提示，不构成医学判断。`,
      advice: `${/白虎/.test(JSON.stringify(sc)) ? '近期别熬夜、别硬扛，有条件做一次检查' : '保持现有作息，适度运动即可'}。任何不适请就医，这一课不能替代诊断。`,
      evidence: [
        has('白虎') ? '见白虎' : '无白虎',
        has('子孙') ? '见子孙' : '无子孙',
        `课体 ${pick(gj, 'name', '—')}`,
      ],
    },
  ];

  return {
    lead: `大六壬看的是一件事的来龙去脉。三传给出「发端—过程—结局」的顺序，下面按这个结构分五个维度说。`,
    dimensions, sections,
  };
}

function tarotInterpret(r) {
  const cards = Array.isArray(r.cards) ? r.cards : [];
  const n = cards.length;
  const major = cards.filter((c) => c.arcana === '大阿卡纳');
  const upright = cards.filter((c) => c.upright);
  const reversed = cards.filter((c) => !c.upright);
  const court = cards.filter((c) => /国王|王后|骑士|侍从/.test(String(c.name)));

  const elCount = {};
  for (const c of cards) if (c.element) elCount[c.element] = (elCount[c.element] || 0) + 1;
  const elText = Object.entries(elCount).map(([k, v]) => `${k}×${v}`).join('、') || '分布不明';
  const lack = ['火', '水', '风', '土'].filter((e) => !elCount[e]);

  const axis = cards.find((c) => /未来|结果|建议/.test(String(c.position))) || cards[cards.length - 1] || null;

  const narrative = cards.map((c, i) => {
    const turn = c.upright ? '顺' : '滞';
    return `${c.position}（${c.positionHint || ''}）${c.name}${c.orientation}：${c.core || (c.keywords || []).join('、')}，这一环是${turn}的`;
  }).join('；');

  const sections = [
    {
      key: 'narrative', label: '整盘连贯解读',
      text: `先把几张牌串成一条线来看：${narrative}。` +
        `${axis ? `整盘的主轴是「${axis.name}」（${axis.position}·${axis.orientation}）——${axis.core || ''}。其余几张可以理解为这条主线在不同阶段的样貌：${cards.filter((c) => c !== axis).map((c) => `${c.position}的${c.name}说明${c.core || (c.keywords || []).join('、')}`).join('，')}。` : ''}` +
        `所以这张牌阵讲的不是几件不相干的事，而是同一件事在不同时间位置上的样子。`,
    },
    {
      key: 'structure', label: '牌面结构',
      text: `${n} 张牌中有 ${major.length} 张大阿卡纳（占 ${Math.round((major.length / n) * 100)}%），${major.length >= Math.ceil(n / 2) ? '大牌过半，事情牵动的层面较深，与环境、阶段性的课题有关' : '大牌不到半数，重点更偏日常层面的具体人事'}。` +
        `元素分布：${elText}${lack.length ? `；缺${join(lack)}，这一块容易被忽略` : ''}。` +
        `正逆位 ${upright.length} 正 ${reversed.length} 逆，${reversed.length > upright.length ? '逆位偏多，说明阻滞主要来自内部状态而非外部条件' : '整体偏顺，逆位那张是全盘的关节'}。`,
    },
  ];

  const dimBase = (key) => {
    const hit = cards.find((c) => {
      const kw = (c.keywords || []).join('') + String(c.core || '');
      if (key === 'love') return /爱|情感|关系|圣杯|恋人|伴侣/.test(kw) || (c.domain === '情感与关系');
      if (key === 'work') return /工作|事业|职场|权杖|星币|金币/.test(kw) || (c.domain === '工作与事业');
      if (key === 'career') return /成就|成功|目标|进展|资源/.test(kw);
      if (key === 'health') return /健康|休息|疲惫|压力|疗愈/.test(kw);
      return true;
    });
    return hit;
  };

  const dimensions = [
    {
      key: 'overall', label: '整体运势',
      text: `整盘的主轴落在「${axis ? axis.name : '—'}」（${axis ? axis.orientation : ''}），${axis ? axis.core || (axis.keywords || []).join('、') : ''}。` +
        `${reversed.length ? `其中${join(reversed.map((c) => `${c.name}（${c.position}）`))}是逆位，逆位不等于凶，更像那股力量还没顺过来或用力过猛，它是这张牌阵里最值得你先看的部分。` : '全部为正位，说明牌面呈现的状态与你当下的处境是通的。'}` +
        `${lack.length ? `元素上缺${join(lack)}，${lack.map((e) => TAROT_ELEMENT_FOCUS[e]?.area).filter(Boolean).join('、')}这一块容易被忽略。` : ''}`,
      advice: `${reversed.length ? `先把${reversed[0].name}指出的卡点处理掉（${(reversed[0].keywords || []).join('、')}），暂时不要加码推进` : '按牌面呈现的节奏走'}；${lack.length ? `补一点${lack[0]}的力量：${TAROT_ELEMENT_FOCUS[lack[0]]?.advice || ''}` : '把注意力放在能立刻做的小事上，先动一件'}。牌是镜子，照的是你此刻的状态。`,
      evidence: [
        `牌阵 ${n} 张（${cards.map((c) => c.position).join(' / ')}）`,
        `主轴 ${axis ? `${axis.name}·${axis.position}·${axis.orientation}` : '—'}`,
        `逆位 ${reversed.length} / 正位 ${upright.length}`,
        lack.length ? `缺 ${join(lack)}` : '五行元素齐',
      ],
    },
    {
      key: 'work', label: '工作与职业选择',
      text: `${dimBase('work') ? `牌面上与工作最相关的是「${dimBase('work').name}」（${dimBase('work').position}·${dimBase('work').orientation}）：${dimBase('work').core || (dimBase('work').keywords || []).join('、')}。` : '牌面上没有明确指向工作的牌。'}` +
        `${court.length ? `牌中有宫廷牌${join(court.map((c) => c.name))}，说明局面里有具体的人（也可能就是你自己的某个侧面）在起作用。` : ''}` +
        `${elCount.土 ? '有土元素，现实条件与资源是被这张牌阵看到的。' : '缺土元素，现实条件与资源这块容易估计不足。'}`,
      advice: `工作上建议：${elCount.土 ? '把计划落到预算与时间表上，别停在口头' : '先把现实条件摸清楚——薪资、工时、稳定性，再谈喜好'}；${dimBase('work') && !dimBase('work').upright ? '这张相关牌是逆位，说明当下的不适主要来自状态而非岗位本身，可以调状态再看。' : ''}`,
      evidence: [
        `工作相关牌 ${dimBase('work') ? `${dimBase('work').name}·${dimBase('work').position}·${dimBase('work').orientation}` : '无'}`,
        `宫廷牌 ${court.length} 张`,
        `土元素 ${elCount.土 || 0} 张`,
      ],
    },
    {
      key: 'career', label: '事业发展',
      text: `从牌阵的时间线看：${cards.map((c) => `${c.position}是${c.name}${c.orientation}`).join('，')}。` +
        `${major.length >= Math.ceil(n / 2) ? '大牌过半，事业这条线牵动的不只是岗位，还有你对自己要往哪走的判断' : '变化更多发生在具体事务层面，先把眼前的项目做成'}` +
        `${axis ? `；结局位置的「${axis.name}」给出的方向是${axis.core || ''}` : ''}。`,
      advice: `建议把${cards[0]?.position || '最初'}这一环的课题先收尾，再往${axis?.position || '结果'}的方向推进；${elCount.火 ? '火的能量在，适合主动出击一步' : '缺火时别等热情来，先用流程推着自己动'}。事业发展是长线，牌面只反映当前这一段。`,
      evidence: [
        `时间线 ${cards.map((c) => `${c.position}·${c.name}${c.orientation}`).join(' → ')}`,
        `大阿卡纳 ${major.length}/${n}`,
      ],
    },
    {
      key: 'love', label: '爱情与感情',
      text: `${dimBase('love') ? `与感情最相关的是「${dimBase('love').name}」（${dimBase('love').position}·${dimBase('love').orientation}）：${dimBase('love').core || (dimBase('love').keywords || []).join('、')}。` : '牌面上没有明确指向感情的牌，当下这段关系不是主要议题。'}` +
        `${elCount.水 ? '有水元素，情感与感受在这件事里占的分量不轻。' : '缺水元素，容易用理性压过感受，留意别忽略自己的情绪。'}`,
      advice: `${elCount.水 ? '先照顾好感受再谈效率：把想说的话说出口，比猜对方心思有效' : '给自己留一点感受情绪的时间，别把所有事都当任务处理'}；${dimBase('love') && !dimBase('love').upright ? '相关牌为逆位，提示关系里有没说开的地方，找个合适时机讲清楚。' : ''}关系取决于你们怎么做，牌只帮你把问题问清楚。`,
      evidence: [
        `感情相关牌 ${dimBase('love') ? `${dimBase('love').name}·${dimBase('love').position}·${dimBase('love').orientation}` : '无'}`,
        `水元素 ${elCount.水 || 0} 张`,
      ],
    },
    {
      key: 'health', label: '健康状况',
      text: `牌阵里${dimBase('health') ? `与健康状态最贴近的是「${dimBase('health').name}」：${dimBase('health').core || (dimBase('health').keywords || []).join('、')}` : '没有直接指向身体的牌'}。` +
        `${reversed.length >= 2 ? `${reversed.length} 张逆位，提示内在消耗偏大，身体往往是第一个反映出来的` : '整体状态与牌面呈现的相对一致'}` +
        `${elCount.土 || elCount.水 ? '' : '；缺土与水，作息与身体的基本盘容易被牺牲'}。这些是象征性的提示，不是诊断。`,
      advice: `${reversed.length >= 2 ? '建议先把睡眠与饮食稳住，别在这个阶段额外加压' : '维持现有作息，适度运动即可'}；${lack.length ? `补${lack[0]}所代表的${TAROT_ELEMENT_FOCUS[lack[0]]?.area || ''}：${TAROT_ELEMENT_FOCUS[lack[0]]?.advice || ''}` : ''}身体有明确不适请就医，牌面不能替代专业意见。`,
      evidence: [
        `健康相关牌 ${dimBase('health') ? `${dimBase('health').name}·${dimBase('health').position}` : '无'}`,
        `逆位 ${reversed.length} 张`,
        `元素 土${elCount.土 || 0} / 水${elCount.水 || 0}`,
      ],
    },
  ];

  return {
    lead: `塔罗是一套象征系统而不是判决。下面先给整盘的连贯解读（把几张牌串成一条线），再分五个维度落到生活里。`,
    dimensions, sections,
  };
}

const BUILDERS = {
  bazi: baziInterpret,
  ziwei: ziweiInterpret,
  liuyao: liuyaoInterpret,
  meihua: meihuaInterpret,
  daliuren: daliurenInterpret,
  tarot: tarotInterpret,
};

const { interpretQimen } = __mods['qimen-interpret'];

function interpret(r, opts) {
  if (!isObj(r) || !r.system) return null;
  if (r.system === 'qimen') return interpretQimen(r, opts);
  const fn = BUILDERS[r.system];
  if (!fn) return null;
  let body;
  try {
    body = fn(r);
  } catch (e) {
    return {
      moduleType: MODULE_TYPE[r.system] || 'natal',
      system: r.system,
      systemLabel: SYSTEM_LABEL[r.system] || r.system,
      title: '解析与详解',
      lead: '这一盘的解析暂未生成，请稍后重试。',
      dimensions: [],
      sections: [],
      disclaimer: DISCLAIMER,
      error: String(e && e.message),
      ask: askOf(opts),
    };
  }
  const tuned = applyAsk(body.dimensions || [], askOf(opts), body.lead || '');
  return {
    moduleType: MODULE_TYPE[r.system] || 'natal',
    system: r.system,
    systemLabel: SYSTEM_LABEL[r.system] || r.system,
    title: '解析与详解',
    lead: tuned.lead,
    dimensions: tuned.dims,
    sections: body.sections || [],
    disclaimer: DISCLAIMER,
    ask: askOf(opts),
  };
}

return { DIMENSIONS, MODULE_TYPE, SYSTEM_LABEL, DIRECTIONS, DIRECTION_DEFAULT, dirOf, hexInfo, interpret };
})();

__mods.index = (function () {
const { buildBazi } = __mods.bazi;
const { buildLiuyao, tossLines } = __mods.liuyao;
const { buildZiwei, BRIGHTNESS, flowOf, asOfParts } = __mods.ziwei;
const { drawTarot } = __mods.tarot;
const { buildMeihua } = __mods.meihua;
const { buildDaliuren } = __mods.daliuren;
const { buildHepan } = __mods.hepan;
const { buildZiweiHepan } = __mods['ziwei-hepan'];
const { buildQimen } = __mods.qimen;
const { geocodeAddress, resolveAddress } = __mods.geo;
const { toJDN, ganzhiName, dayGanzhiIndex } = __mods.calendar;
const { randomOf, isSeed } = __mods.random;
const { interpret, DIRECTIONS, DIRECTION_DEFAULT } = __mods.interpret;

const pad = (n) => String(n).padStart(2, '0');

const fail = (code, message) => {
  const e = new Error(message);
  e.code = code;
  return e;
};

const GENDERS = ['male', 'female'];

function daysInMonth(year, month) {
  if (month === 2) {
    const leap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    return leap ? 29 : 28;
  }
  return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
}

function requireGender(value, who = '') {
  if (GENDERS.includes(value)) return value;
  const got = value === undefined || value === null || value === '' ? '（未提供）' : `「${value}」`;
  throw fail('E_INPUT', `${who ? who + '的' : ''}gender 必须是 male 或 female${got}；性别决定大运/大限顺逆，不能靠默认值`);
}

function parseDateTime(text) {
  if (typeof text !== 'string' || !text.trim()) {
    throw fail('E_INPUT', '缺少 datetime（公历日期时间），例如 1990-05-12T14:30');
  }
  const m = text.trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T\s](\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?$/);
  if (!m) throw fail('E_INPUT', `无法解析 datetime：「${text}」，请用 1990-05-12T14:30 这种格式`);
  const out = {
    year: Number(m[1]), month: Number(m[2]), day: Number(m[3]),
    hour: Number(m[4] ?? 0), minute: Number(m[5] ?? 0),
  };
  if (out.month < 1 || out.month > 12) throw fail('E_INPUT', `月份超出范围：${out.month}`);
  const maxDay = daysInMonth(out.year, out.month);
  if (out.day < 1 || out.day > maxDay) {
    throw fail('E_INPUT', `日期不存在：${out.year}-${out.month}-${out.day}（${out.year} 年 ${out.month} 月只有 ${maxDay} 天）`);
  }
  if (out.hour > 23 || out.minute > 59) throw fail('E_INPUT', `时间超出范围：${out.hour}:${out.minute}`);
  if (out.year < 1600 || out.year > 2400) {
    throw fail('E_RANGE', `年份 ${out.year} 超出可计算范围（1600–2400）`);
  }
  if (out.year < 1900 || out.year > 2100) {
    out.precision = {
      level: 'approx',
      note: `ΔT 模型仅覆盖 1900–2100，${out.year} 年按端点值外推，节气与朔望时刻可能有分钟级偏差，月柱在交节前后需复核`,
    };
  }
  return out;
}

function baziText(r) {
  const P = r.pillars;
  const line = (label, p) =>
    `${label}：${p.ganzhi}　${p.stemTenGod ? `十神 ${p.stemTenGod}　` : ''}藏干 ${p.hidden.map((h) => `${h.stem}(${h.tenGod})`).join(' ')}　纳音 ${p.nayin}`
    + `　地势 ${p.dishi}　自坐 ${p.zizuo}　空亡 ${p.kongwang.join('')}`
    + (p.shensha && p.shensha.length ? `　神煞 ${p.shensha.join('、')}` : '');
  const wuxing = Object.entries(r.wuxing).map(([k, v]) => `${k}${v}`).join(' ');
  const palaces = r.palaces
    ? `【胎元】${r.palaces.taiyuan.ganzhi}　命宫 ${r.palaces.minggong.ganzhi}　身宫 ${r.palaces.shengong.ganzhi}`
    : '';
  const dayun = r.dayun.list.slice(0, 8)
    .map((d) => `${d.startAge}岁 ${d.ganzhi}(${d.stemTenGod})${d.luck ? `·${d.luck.tier}` : ''}${d.relations && d.relations.length ? `[${d.relations.join('')}]` : ''}`).join('　');
  const near = r.jieqi.nearBoundaryMinutes < 20
    ? `\n⚠ 出生时刻距「节」仅 ${r.jieqi.nearBoundaryMinutes} 分钟，而节气时刻本身有最多约 14 分钟的偏差，月柱与年柱建议人工复核。`
    : '';
  const SHORT = { year: '年', month: '月', day: '日', hour: '时' };
  const shenshaLine = r.shensha && r.shensha.groups && r.shensha.groups.length
    ? `神煞（${r.shensha.count} 见）：` + r.shensha.groups.map((g) =>
      `${g.cat}｜` + g.items.map((i) => `${i.name}(${i.pillars.map((k) => SHORT[k]).join('')})`).join('、')).join('；')
    : '神煞：—';
  const gejuLine = r.frame ? [
    `格局：${r.frame.primary ? `${r.frame.primary.name}（${r.frame.primary.evidence}）` : '—'}`,
    `　　　${r.frame.geju.map((g) => `${g.name}[${g.kind}]`).join('　')}`,
    `用神：喜${r.frame.yongshen.favor.join('')}（${r.frame.yongshen.favorTenGods.join('、')}）　忌${r.frame.yongshen.avoid.join('')}（${r.frame.yongshen.avoidTenGods.join('、')}）　${r.frame.yongshen.method}`,
    `　　　${r.frame.yongshen.detail}`,
    `十神权重：${Object.entries(r.frame.godStats.groups).map(([k, v]) => `${k}${v}`).join(' ')}`,
  ] : [];
  return [
    `【四柱】${P.year.ganzhi} ${P.month.ganzhi} ${P.day.ganzhi} ${P.hour.ganzhi}`,
    `日主：${r.dayMaster.stem}${r.dayMaster.element}（${r.dayMaster.yinYang}）　空亡：${r.kongwang.join('')}`,
    line('年柱', P.year), line('月柱', P.month), line('日柱', P.day), line('时柱', P.hour),
    `五行：${wuxing}`,
    ...(palaces ? [palaces] : []),
    `日主强弱：${r.strength.level}（${r.strength.score}）　${r.strength.detail}`,
    ...gejuLine,
    `天干关系：${(r.relations && r.relations.stems.length) ? r.relations.stems.join('　') : '—'}`,
    `地支关系：${(r.relations && r.relations.branches.length) ? r.relations.branches.join('　') : '—'}`,
    shenshaLine,
    `真太阳时：${r.solarTime.trueSolarText}（${r.input.geo ? r.input.geo.note + '；' : ''}${r.solarTime.note}）　晚子时：${r.input.lateZi ? '23:00 后算次日' : '23:00 后仍算当日'}`,
    `节气：上一节 ${r.jieqi.previous.name} ${r.jieqi.previous.time}　下一节 ${r.jieqi.next.name} ${r.jieqi.next.time}`,
    `大运：${r.dayun.rule}（${r.dayun.direction}），${r.dayun.startAge.years}岁${r.dayun.startAge.months}个月起运`,
    `　${dayun}`,
    `流年：${r.liunian.slice(0, 10).map((l) => `${l.year}${l.ganzhi}(${l.stemTenGod})${l.luck ? `·${l.luck.tier}` : ''}`).join('　')}`,
    '（格局、用神、行运吉凶为扶抑＋简化调候的量化提示，非断语。）',
  ].join('\n') + near;
}

function ziweiText(r) {
  const lunarText = `${r.lunar.year}年${r.lunar.isLeap ? '闰' : ''}${r.lunar.month}月${r.lunar.day}日`;
  const starText = (stars) => (stars.length
    ? stars.map((s) => `${s.name}${s.mutagen ? `化${s.mutagen}` : ''}`).join(' ')
    : '—');
  const shenshaText = (s) =>
    `神煞：长生(${s.changsheng}) 博士(${s.boshi}) 将前(${s.jiangqian}) 岁前(${s.suiqi})`;
  const rows = [];
  for (const p of r.palaces) {
    const mark = p.isSoul ? '【命】' : p.isBody ? '【身】' : '　　';
    rows.push(`  ${p.palace} ${p.branch} ${p.ganzhi} ${mark} 大限${String(p.daxian.start).padStart(2)}-${p.daxian.end} 小限${String(p.xiaoxian.age).padStart(2)}  ${starText(p.stars)}`);
    rows.push(`     ${shenshaText(p.shensha)}`);
  }
  const liunian = (r.liunian ?? []).slice(0, 6).map((l) =>
    `  ${l.year} ${l.ganzhi} ${String(l.age).padStart(2)}岁 命宫${l.lifePalace.branch}(${l.lifePalace.palace}) 流禄${l.liulu} 流羊${l.liuyang} 流陀${l.liutuo} ｜ ${l.mutagen.map((m) => m.replace('化', '')).join(' ')}`
    + (l.mutagenHits ? `　四化落宫 ${l.mutagenHits.map((m) => `${m.star}${m.type}→${m.palace || '未上盘'}`).join('、')}` : '')
    + (l.sanfangMainStars ? `　三方主星 ${l.sanfangMainStars.join('')}` : ''));
  const patterns = (r.patterns ?? []).length
    ? r.patterns.map((p) => `${p.name}（${p.tone === 'good' ? '吉格' : p.tone === 'bad' ? '忌格' : '中'}：${p.evidence}）`).join('；')
    : '无明显格局（按内置规则）';
  const daxian = (r.daxianList ?? []).slice(0, 8).map((d) =>
    `  ${d.branch}宫（${d.palace}）${d.ages[0]}-${d.ages[1]}岁 ${d.ganzhi} 会${d.mainStars.join('') || '—'} 化 ${d.mutagenHits.map((m) => `${m.star}${m.type}→${m.palace || '未上盘'}`).join('、')}`);
  return [
    `【农历】${lunarText}（月首 ${r.lunar.monthStart}）　时支：${r.hourBranch}　年干支：${r.yearGanzhi}`,
    `【时刻】${r.solarTime ? `${r.solarTime.civilText} → 真太阳时 ${r.solarTime.trueSolarText}${r.input.geo ? '（' + r.input.geo.note + '）' : ''}` : ''}`,
    `【命宫】${r.soul.branch}（${r.soul.ganzhi}·${r.soul.nayin}）　【身宫】${r.body.branch}（落${r.body.lands}）　【五行局】${r.bureau.name}`,
    `【紫微】${r.ziwei}　【天府】${r.tianfu}　【命主】${r.lifeMaster}　【身主】${r.bodyMaster}`,
    `【大限】${r.daxian.rule}，${r.daxian.startAge}岁起　【小限】${r.xiaoxianRule.direction}`,
    `【昌曲】文昌${r.changqu.wenchang.branch}（${r.changqu.wenchang.palace}${r.changqu.wenchang.mutagen ? '·化' + r.changqu.wenchang.mutagen : ''}）　文曲${r.changqu.wenqu.branch}（${r.changqu.wenqu.palace}${r.changqu.wenqu.mutagen ? '·化' + r.changqu.wenqu.mutagen : ''}）`,
    `　　　${r.changqu.relation}　入命三方：${r.changqu.inSoulSanfang ? '是' : '否'}　吸收面：${r.changqu.absorb.label}（${r.changqu.absorb.reason}）`,
    '十二宫：',
    ...rows,
    '大限（按起运年龄排序，前 8 限，宫干四化落宫）：',
    ...daxian,
    '流年（前 6 年，完整 12 年在结构化数据里）：',
    ...liunian,
    `【格局】${patterns}`,
    r.patternSummary ? `【结构统计】吉格 ${r.patternSummary.good.length}、忌格 ${r.patternSummary.bad.length}；${r.patternSummary.note}` : '',
    r.lunar.note ? `注：${r.lunar.note}` : '',
  ].filter(Boolean).join('\n');
}

function qimenText(r) {
  const P = r.palaces;
  const cell = (x) => `${x.palace}宫 ${x.star || '—'}／${x.gate || '—'}／${x.god || '—'}${x.kong ? ' 空' : ''}${x.ma ? ' 马' : ''}`;
  return [
    `【四柱】${r.siZhu.year} ${r.siZhu.month} ${r.siZhu.day} ${r.siZhu.time}`,
    `【局数】${r.ju}　节气 ${r.jieqi}（${r.jieqiTime}）`,
    `【值符】${r.zhiFu.star}（${r.zhiFu.gong}宫）　【值使】${r.zhiShi.gate}（${r.zhiShi.gong}宫）　旬首 ${r.xunshou}`,
    `【空亡】${r.kongWang.join('') || '—'}　驿马 ${r.ma.zhi || '—'}（${r.ma.gong || '—'}宫）`,
    `【九宫】${P.map(cell).join('　')}`,
    `※ 晚子时：${r.lateZiHourMode === 'next-day' ? '23:00 后归次日' : '23:00 后仍归当日'}（可用 lateZiHourMode / lateZi 指定）`,
    `※ ${r.rules[r.rules.length - 1]}`,
  ].join('\n');
}

function hepanText(r) {
  if (r.chart === 'ziwei') {
    const d = (x) => `${x.label}：${x.score >= 0 ? '+' : ''}${x.score}　${x.text}`;
    return [
      `【紫微合盘】${r.score.level}（${r.score.total}/100）`,
      `你　命宫 ${r.a.soul.branch}（${r.a.soulStars.join('、') || '无主星'}）　夫妻 ${r.a.spouseStars.join('、') || '无主星'}　${r.a.bureau}`,
      `对方 命宫 ${r.b.soul.branch}（${r.b.soulStars.join('、') || '无主星'}）　夫妻 ${r.b.spouseStars.join('、') || '无主星'}　${r.b.bureau}`,
      ...r.dimensions.map(d),
      ...r.interactions.map((h) => `　· ${h.text}`),
      ...r.notes.map((n) => `※ ${n}`),
    ].join('\n');
  }
  const d = (x) => `${x.label}：${x.score >= 0 ? '+' : ''}${x.score}　${x.text}`;
  const solarLine = (side) => {
    if (!side || !side.solarNote) return '—';
    return `${side.longitude == null ? '未含经度修正' : `${side.longitude}°E`}（${side.solarNote}）`;
  };
  return [
    `【合盘】${r.score.level}（${r.score.total}/100）`,
    `你　${r.a.pillars.join(' ')}　日主 ${r.a.dayMaster}　日支 ${r.a.dayBranch}　${r.a.strength || ''}`,
    `对方 ${r.b.pillars.join(' ')}　日主 ${r.b.dayMaster}　日支 ${r.b.dayBranch}　${r.b.strength || ''}`,
    `真太阳时：你 ${solarLine(r.a)}；对方 ${solarLine(r.b)}`,
    ...r.dimensions.map(d),
    ...r.notes.map((n) => `※ ${n}`),
  ].join('\n');
}

function daliurenText(r) {
  const sc = r.sanChuan;
  const one = (c) => `${c.zhi}(${c.jiang}${c.liuQin}${c.xunKong ? '空' : ''})`;
  return [
    `【日时】${r.dayGanZhi}日　${r.hourZhi}时（${r.dayNight}贵）　月将 ${r.yueJiang.name}${r.yueJiang.zhi}　节气 ${r.jieqi.name}　${r.lateZi === false ? '晚子时不换日' : '晚子时换日'}`,
    `【三传】初 ${one(sc.chu)} → 中 ${one(sc.zhong)} → 末 ${one(sc.mo)}`,
    `【四课】${r.siKe.map((k) => `${k.position}课 ${k.shang}上${k.xia}下(${k.relation}·${k.jiang})`).join('　')}`,
    `【天地盘】${r.pan.map((p) => `${p.di}:${p.tian}(${p.jiang})`).join(' ')}`,
    `【格局】${r.geJu.name}·${r.geJu.detail}`,
    ...((r.shensha && r.shensha.length) ? [`【神煞】${r.shensha.map((x) => `${x.name}${x.branch}`).join('　')}`] : []),
  ].join('\n');
}

function meihuaText(r) {
  const lines = [
    `【起卦】${r.source}`,
    `【本卦】${r.ben.name}（上${r.ben.upper} 下${r.ben.lower}）　动爻：${r.movingName}`,
    `【互卦】${r.hu.name}　【变卦】${r.bian.name}　【错卦】${r.cuo.name}　【综卦】${r.zong.name}`,
    `【体用】体 ${r.bodyUse.body.trigram}${r.bodyUse.body.element}　用 ${r.bodyUse.use.trigram}${r.bodyUse.use.element}　${r.bodyUse.level}`,
    `　　　　${r.bodyUse.relation}`,
  ];
  const bars = r.lines.slice().reverse().map((l) =>
    `  ${l.name} ${l.yinYang === '阳' ? '━━━━━' : '━━  ━━'}${l.moving ? ' ←动' : ''}`);
  return [...lines, '【爻】', ...bars].join('\n');
}

function tarotText(r) {
  const lines = [
    r.question ? `【所问】${r.question}` : '（未填写提问）',
    `【牌阵】${r.spread}${r.castAt ? `　抽牌于 ${r.castAt}` : ''}`,
  ];
  for (const c of r.cards) {
    lines.push(`  ${c.position}：${c.name}（${c.orientation}）　${c.keywords.join('、')}`);
  }
  if (r.reading && r.reading.length) {
    lines.push('【解读】');
    for (const p of r.reading) lines.push(`  ${p}`);
  }
  return lines.join('\n');
}

function liuyaoText(r) {
  const fmt = (hex) => {
    const rows = hex.lines.slice().reverse().map((l) => {
      const mark = l.position === hex.shi ? '世' : l.position === hex.ying ? '应' : '　';
      return `  ${l.name} ${mark} ${l.symbol} ${l.ganzhi}${l.element} ${l.liuqin}/${l.liushen}`;
    });
    return [`${hex.name}（${hex.palace}·${hex.palaceElement}）`, ...rows].join('\n');
  };
  const out = [
    `起卦：${r.cast.notation.join('、')}（自下而上）`,
    `日辰：${r.dayGanZhi.name}`,
    r.question ? `所问：${r.question}` : '',
    '本卦：',
    fmt(r.ben),
  ];
  if (r.bian) out.push(`动爻：第 ${r.cast.movingPositions.join('、')} 爻`, '变卦（六亲以变卦自身宫论）：', fmt(r.bian));
  else out.push('六爻安静，无变卦。');
  return out.filter(Boolean).join('\n');
}

function jsonSafe(value) {
  return JSON.parse(JSON.stringify(value));
}

function compute(args = {}) {
  const r = jsonSafe(computeRaw(args));
  if (r && r.precision && r.precision.level === 'approx' && r.summary) {
    r.summary = `⚠ ${r.precision.note}\n${r.summary}`;
  }
  if (r && (r.system === 'bazi' || r.system === 'ziwei') && r.input && r.input.longitude == null && r.summary) {
    r.summary = `⚠ 未提供出生地或经度：按东八区平太阳时排盘，时柱可能与本命盘相差一个时辰；海外出生请先把当地时间换算成东八区标准时。\n${r.summary}`;
  }
  if (args.withInterpret) {
    r.interpret = interpret(r, {
      question: typeof args.question === 'string' ? args.question : '',
      direction: typeof args.direction === 'string' ? args.direction : 'general',
    });
  }
  return r;
}

function interpretText(i) {
  if (!i) return '';
  const out = [`【${i.title || '解析与详解'}】${i.ask && i.ask.echo ? i.ask.echo : ''}`];
  if (i.lead) out.push(i.lead);
  if (i.error) out.push(`⚠ 解析生成失败：${i.error}（上方盘面数据本身可用）`);
  for (const d of i.dimensions || []) {
    const evidence = Array.isArray(d.evidence) && d.evidence.length ? `\n　依据：${d.evidence.join('；')}` : '';
    out.push(`${d.label}：${d.text}${d.advice ? `　建议：${d.advice}` : ''}${evidence}`);
  }
  for (const s of i.sections || []) out.push(`${s.label}：${s.text}`);
  if (i.disclaimer) out.push(i.disclaimer);
  return out.join('\n');
}

const JU_METHODS = ['chaibu', 'chaoshen', 'zhirun'];
const TAROT_COUNTS = [1, 3, 5];
const LATE_ZI_MODES = ['same-day', 'next-day'];

function checkAsOf(asOf) {
  if (asOf === undefined || asOf === null || asOf === '') return undefined;
  const parts = asOfParts(asOf);
  if (!parts) throw fail('E_ASOF', `无法解析 asOf：「${asOf}」，请用 2026-10-22T16:00 这种格式`);
  const { year, month, day } = parts;
  if (!(month >= 1 && month <= 12) || !(day >= 1 && day <= daysInMonth(year, month))) {
    throw fail('E_ASOF', `asOf 指向的日期不存在：${asOf}`);
  }
  return parts;
}

function computeRaw(args = {}) {
  const system = args.system;
  if (system === 'bazi') {
    const dt = parseDateTime(args.datetime);
    const asOf = checkAsOf(args.asOf);
    const result = buildBazi({
      ...dt,
      gender: requireGender(args.gender),
      longitude: typeof args.longitude === 'number' ? args.longitude : undefined,
      address: typeof args.address === 'string' ? args.address : undefined,
      geo: args.geo && typeof args.geo === 'object' ? args.geo : undefined,
      lateZi: args.lateZi !== false,
      trueSolar: args.trueSolar !== false,
      nowYear: asOf ? asOf.year : undefined,
    });
    return { ...result, ...(asOf ? { asOf } : {}), precision: dt.precision, summary: baziText(result) };
  }
  if (system === 'ziwei') {
    const dt = parseDateTime(args.datetime);
    const asOf = checkAsOf(args.asOf);
    const result = buildZiwei({
      ...dt,
      gender: requireGender(args.gender),
      leapAsNext: args.leapAsNext === true,
      longitude: typeof args.longitude === 'number' ? args.longitude : undefined,
      address: typeof args.address === 'string' ? args.address : undefined,
      geo: args.geo && typeof args.geo === 'object' ? args.geo : undefined,
      trueSolar: args.trueSolar,
      asOf,
    });
    return { ...result, precision: dt.precision, summary: ziweiText(result) };
  }
  if (system === 'tarot') {
    const count = args.count === undefined || args.count === null || args.count === '' ? 3 : Number(args.count);
    if (!TAROT_COUNTS.includes(count)) {
      throw fail('E_COUNT', `塔罗张数只能是 1 / 3 / 5，收到「${args.count}」`);
    }
    if (!isSeed(args.seed)) throw fail('E_INPUT', `seed 必须是数字，收到「${args.seed}」`);
    const asOf = checkAsOf(args.asOf);
    const result = drawTarot({ count, question: args.question, at: args.asOf, random: randomOf(args.seed) });
    if (args.seed !== undefined && args.seed !== null && args.seed !== '') result.seed = Number(args.seed);
    return { ...result, ...(asOf ? { asOf } : {}), summary: tarotText(result) };
  }
  if (system === 'daliuren') {
    const dt = parseDateTime(args.datetime);
    const lateZi = args.lateZi !== false;
    const result = buildDaliuren({ ...dt, lateZi });
    result.lateZi = lateZi;
    return { ...result, precision: dt.precision, summary: daliurenText(result) };
  }
  if (system === 'qimen') {
    const dt = parseDateTime(args.datetime);
    if (args.juMethod !== undefined && !JU_METHODS.includes(args.juMethod)) {
      throw fail('E_INPUT', `juMethod 只能是 chaibu / chaoshen / zhirun，收到「${args.juMethod}」`);
    }
    const mode = args.lateZiHourMode !== undefined
      ? args.lateZiHourMode
      : args.lateZi === true ? 'next-day' : args.lateZi === false ? 'same-day' : undefined;
    if (mode !== undefined && !LATE_ZI_MODES.includes(mode)) {
      throw fail('E_INPUT', `lateZiHourMode 只能是 same-day / next-day，收到「${mode}」`);
    }
    const lateZiHourMode = mode === 'next-day' ? 'next-day' : 'same-day';
    const result = buildQimen({ ...dt, lateZiHourMode, juMethod: args.juMethod });
    result.lateZiHourMode = lateZiHourMode;
    return { ...result, summary: qimenText(result) };
  }
  if (system === 'hepan') {
    const partner = args.partner;
    if (!partner || typeof partner !== 'object') {
      throw fail('E_PARTNER', '合盘需要 partner：{ datetime, gender, address? }，其中 partner.datetime 是对方的公历出生时间');
    }
    if (!partner.datetime) {
      throw fail('E_PARTNER', '缺少 partner.datetime（对方的公历出生时间），例如 partner: {"datetime":"1992-03-03T10:00","gender":"female"}');
    }
    const pa = parseDateTime(args.datetime);
    const pb = parseDateTime(partner.datetime);
    const chart = args.chart === 'ziwei' ? 'ziwei' : 'bazi';
    const sideA = {
      ...pa,
      gender: requireGender(args.gender, '你（主方）'),
      trueSolar: args.trueSolar,
      lateZi: args.lateZi,
      address: typeof args.address === 'string' ? args.address : undefined,
      longitude: typeof args.longitude === 'number' ? args.longitude : undefined,
      geo: args.geo && typeof args.geo === 'object' ? args.geo : undefined,
    };
    const sideB = {
      ...pb,
      gender: requireGender(partner.gender, '对方'),
      trueSolar: partner.trueSolar,
      lateZi: partner.lateZi,
      address: typeof partner.address === 'string' ? partner.address : undefined,
      longitude: typeof partner.longitude === 'number' ? partner.longitude : undefined,
      geo: partner.geo && typeof partner.geo === 'object' ? partner.geo : undefined,
    };
    const result = chart === 'ziwei' ? buildZiweiHepan({ a: sideA, b: sideB }) : buildHepan({ a: sideA, b: sideB });
    return { ...result, summary: hepanText(result) };
  }
  if (system === 'meihua') {
    let result;
    try {
      result = buildMeihua({
        mode: args.mode === 'number' ? 'number' : 'time',
        datetime: args.datetime,
        upper: args.upper,
        lower: args.lower,
        changing: args.changing,
      });
    } catch (e) {
      throw fail('E_INPUT', `梅花起卦参数不完整：${e && e.message ? e.message : e}`);
    }
    return { ...result, summary: meihuaText(result) };
  }
  if (system === 'liuyao') {
    if (!isSeed(args.seed)) throw fail('E_INPUT', `seed 必须是数字，收到「${args.seed}」`);
    let lines;
    if (args.lines === undefined || args.lines === null) {
      lines = tossLines(randomOf(args.seed));
    } else {
      if (!Array.isArray(args.lines)) {
        throw fail('E_LINES', 'lines 必须是数组：自下而上 6 个爻值（6 老阴 / 7 少阳 / 8 少阴 / 9 老阳）');
      }
      if (args.lines.length !== 6) {
        throw fail('E_LINES', `六爻需要正好 6 个爻值（自下而上），收到 ${args.lines.length} 个；留空则由引擎随机摇卦`);
      }
      lines = args.lines.map(Number);
    }
    let dayGanZhi;
    let asOf = null;
    const stamp = args.datetime ? parseDateTime(args.datetime) : checkAsOf(args.asOf);
    if (stamp) {
      if (!args.datetime) asOf = stamp;
      const g = ganzhiName(dayGanzhiIndex(toJDN(stamp.year, stamp.month, stamp.day)));
      dayGanZhi = { stem: g.stem, branch: g.branch, name: g.name };
    }
    let result;
    try {
      result = buildLiuyao({ lines, question: args.question, dayGanZhi });
    } catch (e) {
      throw fail('E_LINES', e && e.message ? e.message : e);
    }
    if (args.seed !== undefined && args.seed !== null && args.seed !== '') result.seed = Number(args.seed);
    return { ...result, ...(asOf ? { asOf } : {}), summary: liuyaoText(result) };
  }
  if (!system) {
    throw fail('E_INPUT', '缺少 system，可选：bazi（四柱八字）、ziwei（紫微斗数）、liuyao（六爻）、meihua（梅花易数）、daliuren（大六壬）、qimen（奇门遁甲）、hepan（合盘）、tarot（塔罗）。');
  }
  throw fail('E_SYSTEM', `未知体系「${system}」，可选：bazi（四柱八字）、ziwei（紫微斗数）、liuyao（六爻）、meihua（梅花易数）、daliuren（大六壬）、qimen（奇门遁甲）、hepan（合盘）、tarot（塔罗）。`);
}

function renderText(result) {
  const base = result.summary ?? JSON.stringify(result, null, 2);
  if (!result.interpret) return base;
  const extra = interpretText(result.interpret);
  return extra ? `${base}\n\n${extra}` : base;
}

return { interpret, DIRECTIONS, DIRECTION_DEFAULT, BRIGHTNESS, flowOf, geocodeAddress, resolveAddress, buildBazi, buildLiuyao, tossLines, parseDateTime, compute, interpretText, renderText };
})();

    const Engine = __mods.index;
    window.Engine = Engine;
(function () {
  const CSS = `
.pp,.mp-it{--ink:#1b1b1b;--ink2:#3f3a33;--muted:#6f6a60;--label:#8a8378;--faint:#a9a296;
  --line:#c8c1b2;--dimline:#b9b2a4;--hair:#efe9dc;
  --bg:#fffdf8;--card:#fffefb;--band:#f7f3ea;--hover:#f7f2e5;--hover2:#f2ece0;
  --tri:#f9f3e6;--soul:#fdf3f1;--sel:#fff5f2;--link:#fbeee9;
  --red:#b3261e;--red-rgb:179,38,30;--lu:#1f6f3f;--lu-rgb:31,111,63;
  --quan:#8a5a00;--quan-rgb:138,90,0;--ke:#1f4e79;--ke-rgb:31,78,121;--ji:#b3261e;
  --br-good:#4c7a5c;--br-bad:#9c5b56;--on-accent:#fff;--wx-metal:#8a6b1f;
  --tg-bi:#4a6f8a;--tg-shi:#4c7a5c;--tg-cai:#8a6b1f;--tg-guan:#9c5b56;--tg-yin:#6d5f83}
.pp{border:1px solid var(--line);background:var(--bg);color:var(--ink);font-family:"Songti SC","SimSun","Microsoft YaHei",serif;font-size:12.5px;line-height:1.55;
  container-type:inline-size}
@media screen and (prefers-color-scheme:dark){
  .pp,.mp-it{--ink:#eae5d9;--ink2:#d5cfc2;--muted:#aca598;--label:#a49c8e;--faint:#928b7e;
    --line:#514a3e;--dimline:#5f5849;--hair:#2f2b23;
    --bg:#15140f;--card:#1e1c16;--band:#262218;--hover:#2a251b;--hover2:#312c21;
    --tri:#231f16;--soul:#2e1e1a;--sel:#3a231d;--link:#2e211b;
    --red:#f08569;--red-rgb:240,133,105;--lu:#74c795;--lu-rgb:116,199,149;
    --quan:#e2a95c;--quan-rgb:226,169,92;--ke:#86bcea;--ke-rgb:134,188,234;--ji:#f08569;
    --br-good:#79c79a;--br-bad:#e09a8c;--on-accent:#14130f;--wx-metal:#dcb273;
    --tg-bi:#93b7cf;--tg-shi:#8fbb9d;--tg-cai:#d3ae62;--tg-guan:#d98d84;--tg-yin:#b4a4d0}
}
.pp *{box-sizing:border-box}
.pp-grid{display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,minmax(150px,auto));gap:0;border:1px solid var(--line)}
.pp-cell{border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:7px 8px;display:flex;flex-direction:column;position:relative;min-height:150px;background:var(--bg)}
.pp-cell.pp-lastcol{border-right:none}
.pp-cell.pp-lastrow{border-bottom:none}
.pp-center{grid-column:2/4;grid-row:2/4;border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:16px 18px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;text-align:center;background:var(--bg)}
.pp-center .ct-t1{font-size:17px;font-weight:700;letter-spacing:.05em;margin-bottom:6px}
.pp-center .ct-t2{font-size:12.5px;color:var(--ink)}
.pp-center .ct-t3{font-size:14px;letter-spacing:.35em;margin:6px 0;font-weight:600}
.pp-center .ct-t4{font-size:12.5px;color:var(--muted)}
.pp-stars{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:0 6px;font-size:13px;line-height:1.6;min-height:36px}
.pp-st{white-space:nowrap}
.pp-st.main{font-weight:700}
.pp-st.good{color:var(--lu)}
.pp-st.bad{color:var(--ji)}
.pp-st.aux{color:var(--muted)}
.pp-m{display:inline-block;font-style:normal;font-size:12px;line-height:1;padding:0 2px;border-radius:2px;color:var(--on-accent);margin-left:1px;vertical-align:1px}
.pp-m.lu{background:var(--lu)}.pp-m.quan{background:var(--quan)}.pp-m.ke{background:var(--ke)}.pp-m.ji{background:var(--ji)}
.pp-m.view{background:transparent;box-shadow:inset 0 0 0 1px currentColor}
.pp-m.view.lu{color:var(--lu)}.pp-m.view.quan{color:var(--quan)}.pp-m.view.ke{color:var(--ke)}.pp-m.view.ji{color:var(--ji)}
.pp-b{font-style:normal;font-size:11.5px;margin-left:4px;color:var(--muted);letter-spacing:0;opacity:.9}
.pp-b.good{color:var(--br-good)}
.pp-b.mid{color:var(--muted)}
.pp-b.bad{color:var(--br-bad)}
.pp-ages{margin-top:2px;font-size:12px;color:var(--muted);letter-spacing:.02em}
.pp-foot{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;gap:4px;font-size:12px;color:var(--muted)}
.pp-foot .ft-l{display:flex;flex-direction:column;gap:0;line-height:1.5}
.pp-foot .ft-l .ft-dx{color:var(--ink)}
.pp-foot .ft-r{display:flex;flex-direction:column;align-items:flex-end;gap:0;line-height:1.5}
.pp-foot .ft-pn{color:var(--red);font-size:14px;font-weight:700}
.pp-soul{box-shadow:inset 0 0 0 2px rgba(var(--red-rgb),.35)}
.pp-shen::after{content:"身";position:absolute;top:4px;left:4px;font-size:12px;color:var(--on-accent);background:var(--muted);padding:0 3px;border-radius:2px;z-index:1}
.pp-legend{display:flex;gap:10px;align-items:center;justify-content:center;font-size:12px;color:var(--muted);margin-top:6px}
.pp-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;font-family:system-ui,sans-serif}
.pp-chip{font-size:12.5px;padding:3px 9px;border:1px solid var(--line);color:var(--muted);background:var(--bg)}
.pp-chip.ok{color:var(--lu);border-color:var(--lu)}
.pp-chip.warn{color:var(--quan);border-color:var(--quan)}
.pp-sec{margin-top:10px}
.pp-flow{margin-top:9px;border:1px solid var(--line);background:var(--card);font-family:system-ui,sans-serif}
.pp-flow .flow-row{display:grid;grid-template-columns:66px auto minmax(0,1fr);gap:0 10px;align-items:baseline;padding:6px 11px;border-top:1px solid var(--line);font-size:12.5px;line-height:1.6}
.pp-flow .flow-row:first-child{border-top:none;background:var(--band);font-size:12px;color:var(--muted)}
.pp-flow .flow-row b{color:var(--red);font-weight:600;letter-spacing:.04em;white-space:nowrap}
.pp-flow .flow-row .flow-p{color:var(--ink)}
.pp-flow .flow-row .flow-p .flow-k{white-space:nowrap}
.pp-flow .flow-row .flow-m{color:var(--muted);min-width:0}
.pp-flow .flow-row .flow-m i{font-style:normal;margin-right:6px;white-space:nowrap}
.pp-flow .flow-row .flow-m i em{font-style:normal;color:var(--faint);margin-left:2px}
.pp-flow .flow-row .flow-m i.flow-dim{color:var(--faint)}
.pp-flow .flow-row .flow-p em.flow-same{font-style:normal;color:var(--faint);font-size:11.5px;margin-left:5px}
.pp-sec-h{font-size:12.5px;letter-spacing:.08em;color:var(--label);font-weight:700;margin-bottom:2px}
.pp-tl{font-size:12.5px;color:var(--muted);line-height:1.75}
.pp-bz{width:100%;max-width:860px;margin:0 auto;border-collapse:collapse;font-size:13px;font-family:system-ui,sans-serif;table-layout:fixed}
.pp-bz th,.pp-bz td{padding:5px 2px;text-align:center;vertical-align:middle;border:none}
.pp-bz th{border-bottom:1px solid var(--line);color:var(--muted);font-weight:600;font-size:12.5px;letter-spacing:.06em}
.pp-bz th.bz-hdr-day{color:var(--red)}
.pp-bz tr+tr td{border-top:1px solid var(--hair)}
.pp-bz th:first-child,.pp-bz td.bz-lbl{width:46px}
.pp-bz td.bz-lbl{text-align:left;padding-left:3px;color:var(--muted);font-size:11.5px;line-height:1.4;white-space:nowrap}
.pp-bz .bz-big{font-size:26px;font-weight:600;line-height:1.2}
.pp-bz .bz-cg{display:block;font-style:normal;font-size:11.5px;line-height:1.55}
.pp-bz td.bz-wxs{text-align:center;font-size:12px;line-height:1.9}
.pp-bz td.bz-wxs i{display:inline-block;font-style:normal;margin:0 9px;white-space:nowrap}
.pp-bz td.bz-wxs i b{font-weight:600}
.pp-bz td.bz-wxs i em{font-style:normal;margin-left:1px;font-size:11px;color:var(--muted)}
.tg-bi{color:var(--tg-bi)}.tg-shi{color:var(--tg-shi)}.tg-cai{color:var(--tg-cai)}.tg-guan{color:var(--tg-guan)}.tg-yin{color:var(--tg-yin)}
.wx-wood{color:var(--lu)}.wx-fire{color:var(--red)}.wx-earth{color:var(--quan)}.wx-metal{color:var(--wx-metal)}.wx-water{color:var(--ke)}
.bz-zhuri{color:var(--red);font-weight:700}
.pp-rel{margin-top:10px;font-size:13px;line-height:1.9}
.pp-rel b{color:var(--muted);font-weight:400;margin-right:10px}
.pp-str{margin-top:10px;font-size:13px;line-height:1.8}
.pp-str b{color:var(--red);font-size:15px;margin:0 4px}
.pp-drel{font-style:normal;color:var(--red);font-size:12px}
.pp-dim{color:var(--muted)}
.pp-r{display:none}
.pp-modes{display:flex;align-items:center;border-bottom:1px solid var(--line);font-family:system-ui,sans-serif}
.pp-modes label{min-height:44px;display:inline-flex;align-items:center;padding:3px 20px;font-size:12.5px;color:var(--muted);cursor:pointer;border-right:1px solid var(--line);user-select:none}
.pp-modes label:hover{background:var(--hover2)}
.pp-soon{margin-left:auto;padding-right:10px;font-size:12px;color:var(--faint)}
.pp-body{display:none}
#ppm-ben:checked~.pp-body.ben,#ppm-da:checked~.pp-body.da,#ppm-ln:checked~.pp-body.ln{display:block}
#ppm-ben:checked~.pp-modes label[for="ppm-ben"],#ppm-da:checked~.pp-modes label[for="ppm-da"],#ppm-ln:checked~.pp-modes label[for="ppm-ln"]{background:var(--red);color:var(--on-accent)}
.pp-tri{background:var(--tri)}
.pp-soul{background:var(--soul)}
.pp-zh{margin-left:4px;white-space:nowrap}
.pp-borrow{font-size:9.5px;color:var(--muted);margin-top:1px;letter-spacing:.02em}

.pp-cell{cursor:pointer;transition:background .14s ease,box-shadow .14s ease;outline:none}
.pp-cell:hover{background:var(--hover)}
.pp-cell.pp-sel{background:var(--sel);box-shadow:inset 0 0 0 2px rgba(var(--red-rgb),.5)}
.pp-cell.pp-link{background:var(--link);box-shadow:inset 0 0 0 1.5px rgba(var(--red-rgb),.22)}
.pp-detail{display:none;border-top:1px solid var(--line);background:var(--card);padding:11px 14px 13px;font-family:system-ui,sans-serif}
.pp-detail.open{display:block}
.pp-detail .dt-dh{display:flex;align-items:center;flex-wrap:wrap;gap:4px 10px;padding-bottom:6px;margin-bottom:7px;border-bottom:1px dashed var(--line)}
.pp-detail .dt-dh b{font-size:15.5px;color:var(--red);letter-spacing:.04em}
.pp-detail .dt-dh span{font-size:12.5px;color:var(--muted)}
.pp-detail .dt-dh .dt-x{margin-left:auto;font-size:12.5px;color:var(--muted);border:none;background:none;text-decoration:underline;text-decoration-style:dotted;text-underline-offset:3px;min-height:44px;min-width:48px;display:inline-flex;align-items:center;justify-content:center;padding:0 10px;cursor:pointer;user-select:none}
.pp-detail .dt-dh .dt-x:hover{color:var(--red)}
.pp-detail .dt-dr{font-size:13px;line-height:1.85;display:grid;grid-template-columns:62px minmax(0,1fr);align-items:baseline;gap:0 8px}
.pp-detail .dt-dr .dt-k{color:var(--label);font-size:12px;letter-spacing:.06em}
.pp-detail .dt-dr .dt-v{min-width:0}
.pp-detail .dt-st{white-space:nowrap;margin-right:7px;display:inline-block}
.pp-detail .dt-st.main{font-weight:700}
.pp-detail .dt-st.good{color:var(--lu)}
.pp-detail .dt-st.bad{color:var(--ji)}
.pp-detail .dt-st.aux{color:var(--muted)}
.pp-detail .dt-st .dt-br{font-style:normal;font-size:11.5px;color:var(--muted);margin-left:3px}
.pp-detail .dt-st .dt-br.good{color:var(--br-good)}
.pp-detail .dt-st .dt-br.bad{color:var(--br-bad)}
.pp-detail .dt-tri{color:var(--muted)}
.pp-detail .dt-tri b{color:var(--ink);font-weight:600;margin-left:4px}
.pp-detail .dt-tri em{font-style:normal;color:var(--muted);font-size:12px;margin-left:5px}
.pp-detail .dt-tri em::before{content:"·";margin-right:3px}
.pp-detail .dt-empty{color:var(--faint);font-size:12.5px}
.pp-detail .hint{color:var(--faint);font-size:11.5px;margin-top:6px}
.pp-ss{display:flex;flex-wrap:wrap;gap:0 7px;font-size:12.5px;line-height:1.6}
.pp-bz .pp-ss{flex-direction:column;align-items:center;gap:0;font-size:11.5px;line-height:1.5}
.pp-ss .ss-s{white-space:nowrap;cursor:help}
.pp-ss .ss-s.good{color:var(--lu)}
.pp-ss .ss-s.bad{color:var(--ji)}
.pp-ss .ss-s.neutral{color:var(--quan)}
.pp-ssx{margin-top:10px;font-family:system-ui,sans-serif}
.pp-ssx .ssx-h{display:flex;align-items:baseline;gap:8px;font-size:12.5px;color:var(--muted);border-top:1px solid var(--line);padding-top:8px;margin-top:10px}
.pp-ssx .ssx-h b{color:var(--red);font-size:14px;font-weight:600}
.pp-ssg{display:flex;gap:8px;align-items:baseline;margin-top:5px;font-size:12.5px;line-height:1.7}
.pp-ssg .ssg-gt{flex:0 0 40px;color:var(--muted);font-size:12px;letter-spacing:.08em}
.pp-ssg .ssg-gi{display:flex;flex-wrap:wrap;gap:3px 6px}
.pp-ssi{white-space:nowrap;border:1px solid var(--line);padding:0 5px;cursor:help}
.pp-ssi.good{color:var(--lu);border-color:rgba(var(--lu-rgb),.35)}
.pp-ssi.bad{color:var(--ji);border-color:rgba(var(--red-rgb),.3)}
.pp-ssi.neutral{color:var(--quan);border-color:rgba(var(--quan-rgb),.3)}
.pp-ssi em{font-style:normal;font-size:12px;color:var(--muted);margin-left:2px}

.mp-hex{display:flex;gap:16%;height:11px;width:104px;flex:0 0 auto;color:var(--ink);align-items:stretch}
.mp-hex i{flex:1;background:currentColor;border-radius:1.5px}
.mp-hex.yin{gap:18%}
.mp-hex.hex-on{color:var(--red)}
.mp-hex.dim{color:var(--dimline)}
.mp-hex.sm{width:74px;height:9px}
.mp-hex.md{width:88px;height:10px}

.mp-hy-wrap{display:flex;gap:22px;flex-wrap:wrap;align-items:flex-start}
.mp-hy-box{border:1px solid var(--line);background:var(--card);padding:12px 16px 14px;min-width:250px}
.mp-hy-h{display:flex;align-items:baseline;gap:8px;margin-bottom:10px;font-family:system-ui,sans-serif}
.mp-hy-h b{color:var(--red);font-size:14px}
.mp-hy-h span{color:var(--muted);font-size:12px}
.mp-hy{display:flex;flex-direction:column;gap:6px}
.mp-hy-row{display:grid;grid-template-columns:18px 30px 112px 60px 54px 40px;gap:8px;align-items:center;font-size:13px;font-family:system-ui,sans-serif;padding:1px 0}
.mp-hy-sy{color:var(--red);font-size:12px;font-weight:700}
.mp-hy-nm{color:var(--muted);font-size:12px}
.mp-hy-gz{letter-spacing:.04em}
.mp-hy-lq{color:var(--ink2)}
.mp-hy-ls{color:var(--muted);font-size:12px}
.mp-hy-dn{color:var(--red);font-size:12px;font-family:system-ui,sans-serif}
.mp-hy-void{color:var(--faint)}
.mp-hy-row.hy-plain{grid-template-columns:34px 112px;gap:9px;padding:0}
.mp-mh-mini{display:flex;flex-direction:column;gap:4px}

.mp-mh{padding:16px}
.mp-mh-head{font-size:13px;color:var(--muted);margin-bottom:12px}
.mp-mh-main{display:flex;gap:18px;flex-wrap:wrap;align-items:flex-start}
.mp-hexbox{border:1px solid var(--line);background:var(--card);padding:12px 15px 13px}
.mp-hexbox.hb-mini{min-width:118px}
.mp-hexbox .hb-h{display:flex;justify-content:space-between;gap:10px;font-size:12px;letter-spacing:.14em;color:var(--muted);font-family:system-ui,sans-serif;margin-bottom:5px}
.mp-hexbox .hb-n{font-size:17px;font-weight:700;color:var(--red);margin-bottom:8px;letter-spacing:.04em}
.mp-hexbox.hb-mini .n{font-size:15px;margin-bottom:6px}
.mp-hexbox .hb-s{font-size:12px;color:var(--muted);margin-top:8px;font-family:system-ui,sans-serif}
.mp-trib{display:flex;flex-direction:column;gap:4px}
.mp-trib+.mp-trib{margin-top:8px;padding-top:8px;border-top:1px dotted var(--line)}
.mp-trib-h{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--muted);font-family:system-ui,sans-serif;margin-bottom:3px}
.mp-tritag{font-size:12px;padding:0 4px;border:1px solid var(--line);color:var(--muted);font-family:system-ui,sans-serif}
.mp-tritag.tritag-ti{color:var(--red);border-color:rgba(var(--red-rgb),.45);font-weight:700}
.mp-tritag.tritag-yong{color:var(--ke);border-color:rgba(var(--ke-rgb),.45)}
.mp-mh-rel{margin-top:12px;font-size:13.5px;font-family:system-ui,sans-serif;line-height:1.8}
.mp-mh-rel b{color:var(--muted);font-weight:400;margin-right:8px}
.mp-mh-rel .mh-lv{font-weight:700}
.mp-mh-rel .mh-lv.good{color:var(--lu)}
.mp-mh-rel .mh-lv.bad{color:var(--ji)}
.mp-mh-rel .mh-lv.flat{color:var(--quan)}

.mp-dl{padding:16px}
.mp-dl-head{font-size:13px;color:var(--muted);margin-bottom:12px;line-height:1.7}
.mp-dl-sc{display:flex;align-items:stretch;margin:0 0 12px;flex-wrap:wrap}
.mp-dl-sc-c{border:1px solid var(--line);background:var(--card);padding:10px 18px;min-width:110px;text-align:center}
.mp-dl-sc-c+.mp-dl-sc-c{border-left:none}
.mp-dl-sc-c.ge{border-left:1px solid var(--line);background:var(--band)}
.mp-dl-sc-k{font-size:12px;letter-spacing:.16em;color:var(--muted);font-family:system-ui,sans-serif}
.mp-dl-sc-z{font-size:24px;font-weight:700;color:var(--red);line-height:1.2}
.mp-dl-sc-j{font-size:12px}
.mp-dl-sc-l{font-size:12px;color:var(--muted);font-family:system-ui,sans-serif}
.mp-dl-sc-gn{font-size:16px;font-weight:700;margin-top:1px}
.mp-dl-sk{display:flex;justify-content:center;margin-bottom:12px;flex-wrap:wrap}
.mp-dl-sk-c{border:1px solid var(--line);background:var(--card);padding:8px 14px 9px;text-align:center;min-width:82px}
.mp-dl-sk-c+.mp-dl-sk-c{border-left:none}
.mp-dl-sk-k{font-size:12px;color:var(--muted);letter-spacing:.1em;font-family:system-ui,sans-serif}
.mp-dl-sk-s{font-size:17px;font-weight:700;color:var(--red);line-height:1.3}
.mp-dl-sk-x{font-size:14.5px;color:var(--muted);line-height:1.3}
.mp-dl-sk-r{font-size:12px;color:var(--muted);font-family:system-ui,sans-serif}
.mp-qm{padding:14px}
.mp-qm-head{display:flex;flex-direction:column;gap:3px;font-size:12px;color:var(--muted);margin-bottom:12px}
.mp-qm-head b{font-size:17px;color:var(--red)}
.mp-qm-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;border:1px solid var(--line);padding:4px;background:var(--bg)}
.pp-qm-cell{border:1px solid var(--line);padding:6px 8px;min-height:74px;display:flex;flex-direction:column;justify-content:space-between;background:var(--bg)}
.pp-qm-cell.center{align-items:center;justify-content:center;text-align:center;background:var(--band)}
.pp-qm-top,.pp-qm-bot{display:flex;justify-content:space-between;font-size:10px;color:var(--muted)}
.pp-qm-mid{display:flex;justify-content:space-between;align-items:baseline}
.pp-qm-mid .tp,.pp-qm-mid .dp{font-size:15px;font-weight:700;color:var(--ink)}
.pp-qm-mid .star,.pp-qm-mid .gate{font-size:12px;color:var(--ink2)}
.pp-qm-top .god{color:var(--red);font-weight:600}
.pp-qm-top .mk{color:var(--ji);font-weight:600}
.pp-qm-ju{font-size:14px;font-weight:700;color:var(--red);margin-bottom:4px}
.pp-qm-kv{font-size:11.5px;color:var(--ink)}
.pp-qm-kv.dim{color:var(--muted)}
.mp-qm-legend,.mp-qm-rules{margin-top:10px;font-size:11px;color:var(--muted);line-height:1.7}
.mp-qm-rules p{margin:2px 0}.mp-hp{padding:14px}
.mp-hp-head{display:flex;align-items:baseline;gap:10px;margin-bottom:12px}
.mp-hp-head b{font-size:19px;color:var(--red)}
.mp-hp-head span{font-size:12px;color:var(--muted)}
.mp-hp-sides{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px}
.mp-hp-side{border:1px solid var(--line);background:var(--bg);padding:10px 12px}
.mp-hp-who{font-size:10px;letter-spacing:.14em;color:var(--muted);margin-bottom:4px}
.mp-hp-gz{font-size:15px;font-weight:700;color:var(--red);letter-spacing:.04em;margin-bottom:6px}
.mp-hp-kv{display:flex;justify-content:space-between;font-size:12px;line-height:1.7}
.mp-hp-kv span{color:var(--muted)}
.mp-hp-dims{display:flex;flex-direction:column;gap:8px}
.mp-hp-dim{border-top:1px solid var(--line);padding-top:8px}
.mp-hp-dimh{display:flex;justify-content:space-between;align-items:baseline;font-size:13px;font-weight:600}
.mp-hp-dimh b{font-size:12px;color:var(--muted)}
.mp-hp-dimh b.good{color:var(--lu)}
.mp-hp-dimh b.bad{color:var(--ji)}
.mp-hp-dimt{font-size:12px;line-height:1.8;margin-top:3px;color:var(--ink)}
.mp-hp-inter{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}
.mp-hp-ith{font-size:11px;color:var(--muted);margin-bottom:4px;letter-spacing:.06em}
.mp-hp-inter ul{margin:0;padding-left:14px;font-size:11.5px;line-height:1.8}
.mp-hp-inter li{margin-bottom:2px}
.mp-hp-inter li b{display:inline-block;min-width:14px;text-align:center;border-radius:2px;margin-right:4px;color:var(--on-accent);font-size:10px}
.mp-hp-inter li b.m-禄{background:var(--lu)}
.mp-hp-inter li b.m-权{background:var(--quan)}
.mp-hp-inter li b.m-科{background:var(--ke)}
.mp-hp-inter li b.m-忌{background:var(--ji)}
.mp-hp-inter li i{font-style:normal;color:var(--red);font-size:10px;margin-left:3px}.mp-hp-notes{margin-top:12px;font-size:11px;color:var(--muted);line-height:1.7}
.mp-hp-notes p{margin:2px 0}.mp-dl-ss{margin-top:10px;display:flex;gap:10px;flex-wrap:wrap;align-items:baseline;font-size:12px}
.mp-dl-ss b{font-weight:600;color:var(--muted);font-size:11px;letter-spacing:.1em}
.mp-dl-ss span{color:var(--ink);cursor:help}
.mp-dl-ss i{font-style:normal;color:var(--red);margin-left:2px;font-weight:600}.mp-dl-pan2{display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,minmax(84px,auto));border:1px solid var(--line);background:var(--bg)}
.mp-dl-pc{border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:7px 9px;display:flex;flex-direction:column;gap:0}
.mp-dl-pc .tz{font-size:21px;font-weight:700;color:var(--red);line-height:1.2}
.mp-dl-pc .dz{font-size:12px;color:var(--muted);font-family:system-ui,sans-serif}
.mp-dl-pc .jz{font-size:12px;color:var(--quan);margin-top:auto;font-family:system-ui,sans-serif}
.mp-dl-c{grid-column:2/4;grid-row:2/4;border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:14px;display:flex;flex-direction:column;gap:4px;align-items:center;justify-content:center;text-align:center;background:var(--bg)}
.mp-dl-c .dl-t1{font-size:16px;font-weight:700;letter-spacing:.06em}
.mp-dl-c .dl-t2{font-size:12px;color:var(--muted);font-family:system-ui,sans-serif}
.mp-dl-c .dl-t3{font-size:12.5px;letter-spacing:.2em;margin-top:3px}
.mp-dl-legend{display:flex;gap:12px;justify-content:center;font-size:12px;color:var(--muted);font-family:system-ui,sans-serif;margin-top:6px}

.mp-tt{padding:16px}
.mp-tt-head{font-size:12.5px;color:var(--muted);margin-bottom:12px;letter-spacing:.04em}
.mp-tt-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(172px,1fr));gap:10px}
.mp-tt-card{border:1px solid var(--line);background:var(--card);padding:13px 14px;display:flex;flex-direction:column;gap:7px;min-height:168px}
.mp-tt-card.tt-rev{background:var(--band);border-style:dashed}
.mp-tt-pos{font-size:12px;color:var(--muted);letter-spacing:.14em}
.mp-tt-name{font-size:19px;font-weight:700;color:var(--red);letter-spacing:.04em}
.mp-tt-ori{font-size:12px;padding:1px 7px;border:1px solid var(--line);align-self:flex-start;color:var(--muted)}
.mp-tt-kw{display:flex;flex-wrap:wrap;gap:4px 8px;font-size:13px;line-height:1.7}
.mp-tt-kw span{border-bottom:1px dotted var(--line)}
.mp-tt-el{margin-top:auto;font-size:12px;color:var(--muted)}
.mp-tt-core{font-size:12.5px;color:var(--ink2);line-height:1.7;border-left:2px solid var(--line);padding-left:8px}
.mp-tt-no{font-size:12px;color:var(--muted);letter-spacing:.1em;margin-left:6px}
.mp-tt-tip{margin-top:12px;font-size:12px;color:var(--muted)}
.mp-tt-q{font-size:13px;margin-bottom:6px}
.mp-tt-q b{color:var(--muted);font-weight:400;margin-right:8px}
.mp-tt-read{margin-top:14px;border-top:1px solid var(--line);padding-top:10px}
.mp-tt-rt{font-size:12px;letter-spacing:.14em;color:var(--muted);margin-bottom:6px}
.mp-tt-read p{margin:0 0 5px;font-size:13px;line-height:1.85}
.mp-tt-note{margin-top:12px}
.mp-tt-ta{width:100%;border:1px solid var(--line);background:var(--card);color:var(--ink);padding:8px;font-size:13px;font-family:inherit;line-height:1.7;resize:vertical;outline:none}
.mp-tt-ta:focus{border-color:var(--red)}

.mp-it{margin-top:14px;border:1px solid var(--line);background:var(--bg);color:var(--ink);
  font-family:"Songti SC","SimSun","Microsoft YaHei",serif;font-size:13px;line-height:1.75}
.mp-it *{box-sizing:border-box}
.mp-it-head{display:flex;align-items:center;gap:9px;flex-wrap:wrap;width:100%;padding:12px 16px;border:none;border-bottom:1px solid var(--line);background:var(--card);color:inherit;font:inherit;font-family:inherit;text-align:left;cursor:pointer;-webkit-appearance:none;appearance:none}
.mp-it-head:hover{background:var(--band)}
.mp-it-arrow{flex:none;font-size:12px;line-height:1;color:var(--red);transition:transform .16s ease}
.mp-it.folded .mp-it-arrow{transform:rotate(-90deg)}
.mp-it.folded .mp-it-wrap{display:none}
.mp-it-hint{margin-left:auto;font-size:12px;color:var(--muted);font-family:system-ui,sans-serif}
.mp-it-title{font-size:15px;font-weight:700;letter-spacing:.08em;color:var(--red)}
.mp-it-tag{font-size:12px;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:1px 9px;font-family:system-ui,sans-serif}
.mp-it-ask{padding:10px 16px;background:var(--band);border-bottom:1px dashed var(--line);font-size:13px;line-height:1.8;color:var(--ink2);font-family:system-ui,sans-serif}
.mp-it-ask .ask-q{font-weight:600;color:var(--ink)}
.mp-it-ask .ask-sep{color:var(--dimline);margin:0 7px}
.mp-it-ask .ask-d{color:var(--lu)}
.mp-it-ask .ask-none{color:var(--muted);font-weight:400}
.mp-it-focus{margin-left:6px;font-size:12px;color:var(--lu);border:1px solid rgba(var(--lu-rgb),.35);border-radius:999px;padding:1px 9px;font-family:system-ui,sans-serif}
.mp-it-dim.focus{background:linear-gradient(90deg,rgba(var(--lu-rgb),.06),transparent 60%);border-left:2px solid var(--lu);padding-left:10px}
.mp-it-lead{padding:11px 16px;font-size:13px;color:var(--ink2);border-bottom:1px dashed var(--line)}
.mp-it-err{margin:12px 16px;padding:9px 12px;border-left:2px solid var(--red);background:var(--soul);font-size:12.5px;line-height:1.8;color:var(--ink2)}
.mp-it-err b{color:var(--red);margin-right:6px}
.mp-it-body{padding:2px 16px 12px}
.mp-it-dim{padding:12px 0;border-bottom:1px dashed var(--line)}
.mp-it-dim:last-of-type{border-bottom:none}
.mp-it-dh{display:flex;align-items:center;gap:8px;margin-bottom:6px}
.mp-it-dno{flex:none;width:20px;height:20px;border-radius:50%;background:var(--red);color:var(--on-accent);font-size:12px;display:flex;align-items:center;justify-content:center;font-family:system-ui,sans-serif}
.mp-it-dlabel{font-size:14.5px;font-weight:700;letter-spacing:.04em}
.mp-it-dtext{font-size:13px;line-height:1.9;text-align:justify}
.mp-it-dev{margin-top:7px;font-size:12px;line-height:1.75;color:var(--muted)}
.mp-it-dev b{color:var(--label);font-weight:600;margin-right:7px;font-family:system-ui,sans-serif;font-size:11px;letter-spacing:.1em}
.mp-it-adv{margin-top:8px;padding:9px 12px;background:var(--band);border-left:2px solid var(--red);font-size:13px;line-height:1.85}
.mp-it-adv b{color:var(--red);font-weight:600;margin-right:7px;font-family:system-ui,sans-serif;font-size:12px;letter-spacing:.1em}
.mp-it-secs{border-top:1px solid var(--line);padding:12px 16px 2px;background:var(--card)}
.mp-it-sec{margin-bottom:11px}
.mp-it-sh{font-size:13px;font-weight:700;color:var(--lu);letter-spacing:.06em;margin-bottom:4px}
.mp-it-stext{font-size:13px;line-height:1.9;color:var(--ink2);text-align:justify}
.mp-it-dis{padding:11px 16px;border-top:1px solid var(--line);background:var(--band);font-size:12px;line-height:1.75;color:var(--muted);font-family:system-ui,sans-serif}

@media (max-width:640px){
  .pp-modes{flex-wrap:wrap}
  .pp-modes label{padding:6px 16px}
  .pp-soon{margin-left:0;padding:6px 10px;width:100%;border-top:1px solid var(--line)}
  .pp-grid{grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,minmax(0,auto));gap:0;padding:0}
  .pp-cell{min-height:0;padding:3px 2px 4px;border-radius:0}
  .pp-center{grid-column:2/4;grid-row:2/4;order:0;border-radius:0;padding:5px 3px;gap:2px}
  .pp-center .ct-t1{font-size:12px;margin-bottom:2px;letter-spacing:.02em}
  .pp-center .ct-t2{font-size:9px;line-height:1.4}
  .pp-center .ct-t3{font-size:10.5px;letter-spacing:.16em;margin:2px 0}
  .pp-center .ct-t4{font-size:9px;line-height:1.45}
  .pp-center .pp-legend{font-size:8.5px;gap:4px;margin-top:3px;flex-wrap:wrap;line-height:1.4}
  .pp-stars{flex-direction:column;flex-wrap:nowrap;align-items:flex-start;justify-content:flex-start;gap:1px;font-size:11px;line-height:1.4;min-height:0}
  .pp-st.main{font-size:11px}
  .pp-st.good,.pp-st.bad,.pp-st.aux{font-size:9.5px}
  .pp-m{font-size:8.5px;padding:0 1px;vertical-align:0}
  .pp-b{font-size:10px;margin-left:3px;opacity:.9}
  .pp-ages{font-size:8.5px;line-height:1.45;margin-top:2px;word-break:break-all}
  .pp-foot{font-size:8.5px;line-height:1.4;gap:2px}
  .pp-foot .ft-pn{font-size:11px}
  .pp-detail{padding:9px 10px 11px}
  .pp-detail .dt-dh b{font-size:14.5px}
  .pp-detail .dt-dh span{font-size:11.5px}
  .pp-detail .dt-dr{font-size:13px;line-height:1.9}
  .pp-detail .dt-dr{grid-template-columns:54px minmax(0,1fr)}
  .pp-detail .dt-dr .dt-k{font-size:11.5px}
  .pp-detail .dt-st .dt-br{font-size:11px}
  .pp-flow .flow-row{grid-template-columns:64px minmax(0,1fr);gap:1px 8px;padding:7px 9px}
  .pp-flow .flow-row .flow-m{grid-column:1/-1}
  .pp-bz{font-size:11.5px}
  .pp-bz th,.pp-bz td{padding:4px 1px}
  .pp-bz th:first-child,.pp-bz td.bz-lbl{width:38px}
  .pp-bz td.bz-lbl{font-size:10.5px}
  .pp-bz .bz-big{font-size:23px}
  .pp-bz .bz-cg{font-size:10px;line-height:1.45}
  .pp-bz .pp-ss{font-size:10px;line-height:1.4}
  .pp-bz td.bz-wxs{font-size:11px;line-height:1.8}
  .pp-bz td.bz-wxs i{margin:0 5px}
  .pp-bz td.bz-wxs i em{font-size:10px}
  .pp-bz th{font-size:11.5px}
  .mp-hy-wrap{gap:14px}
  .mp-hy-box{min-width:0;width:100%}
  .mp-hy-row{grid-template-columns:14px 32px minmax(64px,1fr) 46px 42px 32px;gap:6px;font-size:12.5px}
  .mp-hy-row.hy-plain{grid-template-columns:32px minmax(72px,1fr)}
  .mp-hex{width:auto;min-width:64px;height:12px}
  .mp-hex.sm{min-width:56px;height:10px}
  .mp-hex.md{min-width:60px;height:11px}
  .mp-mh{padding:10px}
  .mp-mh-main{gap:12px}
  .mp-hexbox.hb-mini{min-width:100px}
  .mp-dl{padding:10px}
  .mp-dl-sc-c{min-width:88px;padding:8px 12px}
  .mp-dl-sk-c{min-width:70px;padding:6px 8px 7px}
  .mp-dl-pan2{grid-template-columns:repeat(3,1fr);grid-template-rows:none}
  .mp-dl-pc{grid-row:auto!important;grid-column:auto!important;min-height:76px}
  .mp-dl-c{grid-row:auto!important;grid-column:1/-1!important;order:-1}
  .mp-tt{padding:10px}
  .mp-tt-grid{grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}
  .mp-it-head,.mp-it-lead,.mp-it-body,.mp-it-secs,.mp-it-dis,.mp-it-ask{padding-left:11px;padding-right:11px}
  .mp-it-head{min-height:46px}
  .mp-it-hint{margin-left:0;flex-basis:100%}
  .mp-it-dlabel{font-size:15px}
  .mp-it-dtext,.mp-it-stext,.mp-it-adv{font-size:13.5px;line-height:1.95}
  .mp-it-adv{padding:9px 10px}
}
@container (max-width:640px){
  .pp-modes{flex-wrap:wrap}
  .pp-modes label{padding:6px 16px}
  .pp-soon{margin-left:0;padding:6px 10px;width:100%;border-top:1px solid var(--line)}
  .pp-grid{grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,minmax(0,auto));gap:0;padding:0}
  .pp-cell{min-height:0;padding:3px 2px 4px;border-radius:0}
  .pp-center{grid-column:2/4;grid-row:2/4;order:0;border-radius:0;padding:5px 3px;gap:2px}
  .pp-center .ct-t1{font-size:12px;margin-bottom:2px;letter-spacing:.02em}
  .pp-center .ct-t2{font-size:9px;line-height:1.4}
  .pp-center .ct-t3{font-size:10.5px;letter-spacing:.16em;margin:2px 0}
  .pp-center .ct-t4{font-size:9px;line-height:1.45}
  .pp-center .pp-legend{font-size:8.5px;gap:4px;margin-top:3px;flex-wrap:wrap;line-height:1.4}
  .pp-stars{flex-direction:column;flex-wrap:nowrap;align-items:flex-start;justify-content:flex-start;gap:1px;font-size:11px;line-height:1.4;min-height:0}
  .pp-st.main{font-size:11px}
  .pp-st.good,.pp-st.bad,.pp-st.aux{font-size:9.5px}
  .pp-m{font-size:8.5px;padding:0 1px;vertical-align:0}
  .pp-b{font-size:10px;margin-left:3px;opacity:.9}
  .pp-ages{font-size:8.5px;line-height:1.45;margin-top:2px;word-break:break-all}
  .pp-foot{font-size:8.5px;line-height:1.4;gap:2px}
  .pp-foot .ft-pn{font-size:11px}
  .pp-detail{padding:9px 10px 11px}
  .pp-detail .dt-dh b{font-size:14.5px}
  .pp-detail .dt-dh span{font-size:11.5px}
  .pp-detail .dt-dr{font-size:13px;line-height:1.9}
  .pp-detail .dt-dr{grid-template-columns:54px minmax(0,1fr)}
  .pp-detail .dt-dr .dt-k{font-size:11.5px}
  .pp-detail .dt-st .dt-br{font-size:11px}
  .pp-flow .flow-row{grid-template-columns:64px minmax(0,1fr);gap:1px 8px;padding:7px 9px}
  .pp-flow .flow-row .flow-m{grid-column:1/-1}
  .pp-bz{font-size:11.5px}
  .pp-bz th,.pp-bz td{padding:4px 1px}
  .pp-bz th:first-child,.pp-bz td.bz-lbl{width:38px}
  .pp-bz td.bz-lbl{font-size:10.5px}
  .pp-bz .bz-big{font-size:23px}
  .pp-bz .bz-cg{font-size:10px;line-height:1.45}
  .pp-bz .pp-ss{font-size:10px;line-height:1.4}
  .pp-bz td.bz-wxs{font-size:11px;line-height:1.8}
  .pp-bz td.bz-wxs i{margin:0 5px}
  .pp-bz td.bz-wxs i em{font-size:10px}
  .pp-bz th{font-size:11.5px}
  .mp-hy-wrap{gap:14px}
  .mp-hy-box{min-width:0;width:100%}
  .mp-hy-row{grid-template-columns:14px 32px minmax(64px,1fr) 46px 42px 32px;gap:6px;font-size:12.5px}
  .mp-hy-row.hy-plain{grid-template-columns:32px minmax(72px,1fr)}
  .mp-hex{width:auto;min-width:64px;height:12px}
  .mp-hex.sm{min-width:56px;height:10px}
  .mp-hex.md{min-width:60px;height:11px}
  .mp-mh{padding:10px}
  .mp-mh-main{gap:12px}
  .mp-hexbox.hb-mini{min-width:100px}
  .mp-dl{padding:10px}
  .mp-dl-sc-c{min-width:88px;padding:8px 12px}
  .mp-dl-sk-c{min-width:70px;padding:6px 8px 7px}
  .mp-dl-pan2{grid-template-columns:repeat(3,1fr);grid-template-rows:none}
  .mp-dl-pc{grid-row:auto!important;grid-column:auto!important;min-height:76px}
  .mp-dl-c{grid-row:auto!important;grid-column:1/-1!important;order:-1}
  .mp-tt{padding:10px}
  .mp-tt-grid{grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}
  .mp-it-head,.mp-it-lead,.mp-it-body,.mp-it-secs,.mp-it-dis,.mp-it-ask{padding-left:11px;padding-right:11px}
  .mp-it-head{min-height:46px}
  .mp-it-hint{margin-left:0;flex-basis:100%}
  .mp-it-dlabel{font-size:15px}
  .mp-it-dtext,.mp-it-stext,.mp-it-adv{font-size:13.5px;line-height:1.95}
  .mp-it-adv{padding:9px 10px}
}
@media (max-width:430px){
  .pp-cell{padding:2px 1px 3px}
  .pp-st.main{font-size:10px}
  .pp-st.good,.pp-st.bad,.pp-st.aux{font-size:9px}
  .pp-foot .ft-pn{font-size:10px}
  .pp-center .ct-t1{font-size:11px}
  .pp-center .ct-t2,.pp-center .ct-t4{font-size:8.5px}
  .mp-dl-sc-c{min-width:80px}
  .mp-hy-box{padding:10px 10px 12px}
  .mp-hy-row{grid-template-columns:12px 30px minmax(56px,1fr) 42px 38px 28px;gap:4px;font-size:11.5px}
  .mp-hy-row.hy-plain{grid-template-columns:28px minmax(56px,1fr);gap:6px}
}
@container (max-width:430px){
  .pp-cell{padding:2px 1px 3px}
  .pp-st.main{font-size:10px}
  .pp-st.good,.pp-st.bad,.pp-st.aux{font-size:9px}
  .pp-foot .ft-pn{font-size:10px}
  .pp-center .ct-t1{font-size:11px}
  .pp-center .ct-t2,.pp-center .ct-t4{font-size:8.5px}
  .mp-dl-sc-c{min-width:80px}
  .mp-hy-box{padding:10px 10px 12px}
  .mp-hy-row{grid-template-columns:12px 30px minmax(56px,1fr) 42px 38px 28px;gap:4px;font-size:11.5px}
  .mp-hy-row.hy-plain{grid-template-columns:28px minmax(56px,1fr);gap:6px}
}
`;
  const pp = (window.__PP = window.__PP || {});
  pp.CSS = CSS;

  const TYPE_CLASS = { 主星: 'main', 吉星: 'good', 煞星: 'bad', 辅星: 'aux', 杂曜: 'aux' };
  const MUT = { 禄: 'lu', 权: 'quan', 科: 'ke', 忌: 'ji' };
  const BR_CLASS = { 庙: 'good', 旺: 'good', 得: 'mid', 利: 'mid', 平: 'mid', 不: 'bad', 陷: 'bad' };
  const POS = {
    巳: [1, 1], 午: [1, 2], 未: [1, 3], 申: [1, 4],
    辰: [2, 1], 酉: [2, 4], 卯: [3, 1], 戌: [3, 4],
    寅: [4, 1], 丑: [4, 2], 子: [4, 3], 亥: [4, 4],
  };

  const TRI_BITS = {
    乾: [1, 1, 1], 兑: [1, 1, 0], 离: [1, 0, 1], 震: [1, 0, 0],
    巽: [0, 1, 1], 坎: [0, 1, 0], 艮: [0, 0, 1], 坤: [0, 0, 0],
  };
  const POS_NAME = ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'];

  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const hexBar = (yang, moving, size) => `<span class="mp-hex${yang ? '' : ' yin'}${moving ? ' on' : ''}${size ? ' ' + size : ''}">${yang ? '<i></i>' : '<i></i><i></i>'}</span>`;

  function starsHTML(stars, viewHua) {
    if (!stars || !stars.length) return '';
    return stars.map((s) => {
      const cls = TYPE_CLASS[s.type] || 'aux';
      const m = s.mutagen ? `<i class="pp-m ${MUT[s.mutagen]}">${s.mutagen}</i>` : '';
      const vh = viewHua && viewHua[s.name];
      const vm = vh ? `<i class="pp-m view ${MUT[vh]}">${vh}</i>` : '';
      const b = s.brightness ? `<em class="pp-b ${BR_CLASS[s.brightness] || 'mid'}">${s.brightness}</em>` : '';
      return `<span class="pp-st ${cls}">${s.name}${b}${m}${vm}</span>`;
    }).join('');
  }

  function agesHTML(age) {
    const list = [];
    for (let i = 0; i < 6; i++) list.push(age + i * 12);
    return list.join(',');
  }

  const NAMES = ['命宫', '兄弟', '夫妻', '子女', '财帛', '疾厄', '迁移', '交友', '官禄', '田宅', '福德', '父母'];
  const BR = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  const fx = (n) => ((n % 12) + 12) % 12;
  const isTrine = (b, m) => b !== m && [fx(m + 4), fx(m + 8), fx(m + 6)].includes(b);

  function cellHTML(p, soulIdx, view, allPalaces, viewHua) {
    const pos = POS[p.branch] || [1, 1];
    const b = BR.indexOf(p.branch);
    const cls = ['pp-cell'];
    if (b === soulIdx) cls.push('pp-soul');
    else if (isTrine(b, soulIdx)) cls.push('pp-tri');
    if (p.isBody) cls.push('pp-shen');
    if (pos[0] === 4) cls.push('pp-lastrow');
    if (pos[1] === 4) cls.push('pp-lastcol');
    const ss = p.shensha || {};
    const pname = NAMES[fx(soulIdx - b)];
    const zh = (p.selfHua && p.selfHua.length)
      ? `<span class="pp-zh">${p.selfHua.map((x) => `<i class="pp-m ${MUT[x.type]}">${x.type}</i>`).join('')}</span>` : '';
    let borrow = '';
    if (b === soulIdx && allPalaces) {
      const isMain = (s) => (TYPE_CLASS[s.type] || '') === 'main';
      if (!(p.stars || []).some(isMain)) {
        const opp = allPalaces.find((x) => BR.indexOf(x.branch) === fx(b + 6));
        const borrowed = opp ? (opp.stars || []).filter(isMain) : [];
        if (borrowed.length) {
          borrow = `<div class="pp-borrow" title="命宫无主星，借对宫（迁移宫）主星">借 ${borrowed.map((s) => s.name).join(' ')}</div>`;
        }
      }
    }
    return `<div class="${cls.join(' ')}" data-pi="${b}" data-view="${view}" role="button" tabindex="0" aria-expanded="false" style="grid-row:${pos[0]};grid-column:${pos[1]}">
      <div class="pp-stars">${starsHTML(p.stars, viewHua)}${zh}</div>
      ${borrow}
      <div class="pp-ages">${agesHTML(p.xiaoxian.age)}</div>
      <div class="pp-foot">
        <div class="ft-l">
          <span class="ft-dx">${ss.boshi} ${p.daxian.start}-${p.daxian.end}</span>
          <span>${ss.jiangqian}</span>
          <span>${ss.suiqi}</span>
        </div>
        <div class="ft-r">
          <span>${ss.changsheng}</span>
          <span>${p.ganzhi}</span>
          <span class="ft-pn">${pname}</span>
        </div>
      </div>
    </div>`;
  }

  function sizhuOf(r) {
    try {
      const E = window.Engine || (window.__PP && window.__PP.Engine);
      if (!E || !E.buildBazi || !r.input) return '';
      const b = E.buildBazi({
        year: r.input.year, month: r.input.month, day: r.input.day,
        hour: r.input.hour, minute: r.input.minute,
        gender: r.input.gender, trueSolar: false,
      });
      return ['year', 'month', 'day', 'hour'].map((k) => b.pillars[k].ganzhi).join(' ');
    } catch (e) { return ''; }
  }

  pp.ziweiHTML = function (r) {
    const soulIdx = BR.indexOf(r.soul.branch);
    const ln = (r.liunian && r.liunian[0]) || null;
    const age = ln ? ln.age : 1;
    const dxPalace = r.palaces.find((p) => age >= p.daxian.start && age <= p.daxian.end) || r.palaces[0];
    const dxIdx = BR.indexOf(dxPalace.branch);
    const lnIdx = ln ? BR.indexOf(ln.lifePalace.branch) : soulIdx;

    const huaMap = (hits) => {
      const o = {};
      for (const h of hits || []) if (h && h.star) o[h.star] = h.type;
      return o;
    };
    const dxObj = (r.daxianList || []).find((d) => d.branch === dxPalace.branch) || null;
    const huaByView = { da: huaMap(dxObj && dxObj.mutagenHits), ln: huaMap(ln && ln.mutagenHits) };

    const grid = (m, kind) => r.palaces.map((p) => cellHTML(p, m, kind, r.palaces, huaByView[kind] || null)).join('');
    const center = (m, kind) => {
      const mode = kind === 'da'
        ? `<div class="ct-t1">大限 ${dxPalace.ganzhi}　${dxPalace.daxian.start}-${dxPalace.daxian.end}岁</div>`
        : kind === 'ln' && ln
          ? `<div class="ct-t1">流年 ${ln.ganzhi}　${ln.age}岁</div>`
          : `<div class="ct-t1">${r.daxian.rule.slice(0, 2)}　${r.bureau.name}</div>`;
      return `<div class="pp-center">
        ${mode}
        <div class="ct-t2">公历 ${r.input.year}-${String(r.input.month).padStart(2, '0')}-${String(r.input.day).padStart(2, '0')} ${String(r.input.hour).padStart(2, '0')}:${String(r.input.minute).padStart(2, '0')}</div>
        <div class="ct-t2">农历 ${r.lunar.year}年${r.lunar.isLeap ? '闰' : ''}${r.lunar.month}月${r.lunar.day}日${r.hourBranch}时</div>
        ${sizhuOf(r) ? `<div class="ct-t3">${sizhuOf(r)}</div>` : ''}
        <div class="ct-t4">命主 ${r.lifeMaster}　身主 ${r.bodyMaster}</div>
        <div class="ct-t4">命宫 ${r.soul.branch}　身宫 ${r.body.branch}　五行局 ${r.bureau.name}</div>
        <div class="ct-t4">子年斗君 ${r.doujun ? r.doujun.zinian : '—'}　流年斗君 ${ln && ln.doujun ? ln.doujun : '—'}</div>
        <div class="ct-t4">紫微 ${r.ziwei}　天府 ${r.tianfu}　${kind === 'da' ? '大限命宫 ' + BR[dxIdx] : kind === 'ln' ? '流年命宫 ' + BR[lnIdx] : '本命命宫 ' + r.soul.branch}</div>
        ${kind === 'da' || kind === 'ln' ? `<div class="ct-t4 pp-viewhua">${kind === 'da' ? '大限' : '流年'}四化　${(kind === 'da' ? huaByView.da : huaByView.ln) && Object.keys(kind === 'da' ? huaByView.da : huaByView.ln).length
          ? Object.entries(kind === 'da' ? huaByView.da : huaByView.ln).map(([s2, t]) => `${s2}化${t}`).join('　')
          : '<span class="pp-dim">未飞四化</span>'}</div>` : ''}
        <div class="pp-legend"><span class="pp-m lu">禄</span><span class="pp-m quan">权</span><span class="pp-m ke">科</span><span class="pp-m ji">忌</span><span>实心=生年四化　空心=大限/流年四化　红框=命宫　浅底=三方四正</span></div>
      </div>`;
    };

    const body = (id, m, kind) => `<div class="pp-body ${id}" data-view="${kind}" data-soul="${m}"><div class="pp-grid">${grid(m, kind)}${center(m, kind)}</div><div class="pp-detail"></div></div>`;

    const cq = r.changqu;
    const chips = cq ? `<div class="pp-chips">
      <span class="pp-chip">昌 ${cq.wenchang.branch}（${cq.wenchang.palace}）</span>
      <span class="pp-chip">曲 ${cq.wenqu.branch}（${cq.wenqu.palace}）</span>
      <span class="pp-chip">${cq.relation}</span>
      <span class="pp-chip">入命三方 ${cq.inSoulSanfang ? '是' : '否'}</span>
      <span class="pp-chip ${cq.absorb.label === '杂' ? 'warn' : 'ok'}">吸收·${cq.absorb.label}</span>
    </div>` : '';
    const pats = (r.patterns || []).length
      ? `<div class="pp-chips">${r.patterns.map((p) => `<span class="pp-chip ${p.tone === 'good' ? 'ok' : p.tone === 'bad' ? 'warn' : ''}" title="${esc(p.evidence || '')}">${p.name}</span>`).join('')}</div>` : '';
    const dxs = (r.daxianList || []).length
      ? `<div class="pp-chips">${r.daxianList.slice(0, 8).map((d) => `<span class="pp-chip" title="${esc(`${d.ganzhi} 宫干四化：` + d.mutagenHits.map((m) => `${m.star}化${m.type}→${m.palace || '未上盘'}`).join('、'))}">${d.branch} ${d.ages[0]}-${d.ages[1]}</span>`).join('')}</div>` : '';
    const lnHit = ln && ln.mutagenHits && ln.mutagenHits.length
      ? `<div class="pp-chips">${ln.mutagenHits.map((m) => `<span class="pp-chip ${m.type === '忌' ? 'warn' : m.type === '禄' ? 'ok' : ''}">${m.star}化${m.type}→${m.palace || '未上盘'}</span>`).join('')}</div>` : '';

    const fl = r.flow;
    const flowHTML = fl ? (() => {
      const muts = (p) => (p.mutagenHits || []).length
        ? p.mutagenHits.map((m) => `<i>${m.star}化${m.type}<em>→${m.palace || '未上盘'}</em></i>`).join('')
        : '<i class="dim">宫干无四化</i>';
      const row = (label, p, note) =>
        `<div class="flow-row"><b>${label}</b><span class="flow-p"><span class="flow-k">${p.ganzhi || '—'}　落${p.palace || '未上盘'}（${p.branch}）</span>${note ? `<em class="flow-same">${note}</em>` : ''}</span><span class="flow-m">${muts(p)}</span></div>`;
      const sameAsMonth = fl.day.branch === fl.month.branch;
      const sameNote = sameAsMonth ? '（日数走满一圈，故同宫）' : '';
      return `<div class="pp-flow">
        <div class="flow-row"><b>基准</b><span class="flow-p">${fl.asOf.solar}</span><span class="flow-m">农历 ${fl.asOf.lunar}　流年 ${fl.asOf.yearGanzhi}（斗君 ${fl.year.doujun}）</span></div>
        ${row(`流月 ${fl.month.index} 月`, fl.month)}
        ${row(`流日 ${fl.day.index} 日`, fl.day, sameNote)}
        ${row(`流时 ${BR[fl.hour.hourIndex]}时`, fl.hour)}
      </div>`;
    })() : '';

    pp._zw = r;
    return `<div class="pp">
      <input type="radio" name="ppm" id="ppm-ben" class="pp-r" checked>
      <input type="radio" name="ppm" id="ppm-da" class="pp-r">
      <input type="radio" name="ppm" id="ppm-ln" class="pp-r">
      <div class="pp-modes">
        <label for="ppm-ben">本命</label><label for="ppm-da">大限</label><label for="ppm-ln">流年</label>
        <span class="pp-soon">点任一宫位看详情</span>
      </div>
      ${body('ben', soulIdx, 'ben')}
      ${body('da', dxIdx, 'da')}
      ${body('ln', lnIdx, 'ln')}
    </div>${flowHTML}${chips}${pats}${dxs}${lnHit}`;
  };

  function starLine(list) {
    if (!list.length) return '<span class="dt-empty">无</span>';
    return list.map((s) => {
      const cls = TYPE_CLASS[s.type] || 'aux';
      const br = s.brightness ? `<em class="dt-br ${BR_CLASS[s.brightness] || 'mid'}">${s.brightness}</em>` : '';
      const mu = s.mutagen ? `<i class="pp-m ${MUT[s.mutagen]}">${s.mutagen}</i>` : '';
      return `<span class="dt-st ${cls}">${s.name}${br}${mu}</span>`;
    }).join('');
  }

  function palaceDetailHTML(pi, soulIdx) {
    const r = pp._zw;
    if (!r) return '';
    const at = (idx) => r.palaces.find((p) => BR.indexOf(p.branch) === idx);
    const p = at(pi) || r.palaces.find((x) => BR.indexOf(x.branch) === pi);
    if (!p) return '';
    const b = BR.indexOf(p.branch);
    const nm = NAMES[fx(soulIdx - b)];
    const ss = p.shensha || {};
    const mains = p.stars.filter((s) => s.type === '主星');
    const auxes = p.stars.filter((s) => s.type === '吉星' || s.type === '辅星');
    const bads = p.stars.filter((s) => s.type === '煞星');
    const misc = p.stars.filter((s) => !['主星', '吉星', '辅星', '煞星'].includes(s.type));
    const selfHua = (p.selfHua || []).length
      ? p.selfHua.map((x) => `<i class="pp-m ${MUT[x.type]}">${x.type}</i>`).join('')
      : '<span class="dt-empty">无</span>';
    const tri = [fx(b + 4), fx(b + 8), fx(b + 6)].map((idx) => {
      const q = at(idx);
      const qn = NAMES[fx(soulIdx - idx)];
      const qm = q ? q.stars.filter((s) => s.type === '主星').map((s) => s.name).join('、') : '';
      const tag = idx === fx(b + 6) ? '对宫' : '三合';
      return `<span class="dt-st">${qn}[${BR[idx]}]<b>${qm || '无主星'}</b><em>${tag}</em></span>`;
    }).join('');
    const at6 = at(fx(b + 6));
    const borrowStars = at6 ? at6.stars.filter((s) => s.type === '主星') : [];
    const mainRow = mains.length
      ? starLine(mains)
      : `<span class="dt-empty">无主星</span><span class="dt-tri">　借对宫 <b>${borrowStars.length ? borrowStars.map((s) => s.name).join('、') : '亦无主星'}</b></span>`;
    const row = (k, v) => `<div class="dt-dr"><span class="dt-k">${k}</span><div class="dt-v">${v}</div></div>`;

    return `<div class="dt-dh">
        <b>${nm}</b><span>${p.branch}宫 · ${p.ganzhi}</span>
        <span>大限 ${p.daxian.start}-${p.daxian.end}</span>
        <span>小限起 ${p.xiaoxian.age} 岁</span>
        ${p.isBody ? '<span>· 身宫</span>' : ''}
        <span class="dt-x" data-pp-close="1">收起</span>
      </div>
      ${row('主星', mainRow)}
      ${row('吉辅', starLine(auxes))}
      ${bads.length ? row('煞星', starLine(bads)) : ''}
      ${misc.length ? row('杂曜', starLine(misc)) : ''}
      ${row('宫干四化', selfHua)}
      ${row('十二神', `<span class="dt-tri">长生 ${ss.changsheng || '—'}　博士 ${ss.boshi || '—'}　将前 ${ss.jiangqian || '—'}　岁前 ${ss.suiqi || '—'}</span>`)}
      ${row('三方四正', `<span class="dt-tri">${tri}</span>`)}
      <div class="hint">三方四正在盘上已同步标出（浅红描边）。再点一次本宫可收起。</div>`;
  }

  function clearMarks(body) {
    body.querySelectorAll('.pp-cell.pp-sel,.pp-cell.pp-link').forEach((c) => {
      c.classList.remove('pp-sel');
      c.classList.remove('pp-link');
    });
    body.querySelectorAll('.pp-cell[aria-expanded="true"]').forEach((c) => c.setAttribute('aria-expanded', 'false'));
  }

  function bindZiwei() {
    if (bindZiwei.done || typeof document === 'undefined' || !document.addEventListener) return;
    bindZiwei.done = true;
    const toggle = (cell) => {
      const body = cell.closest('.pp-body');
      if (!body) return;
      const detail = body.querySelector('.pp-detail');
      if (!detail) return;
      if (cell.classList.contains('pp-sel')) {
        clearMarks(body);
        detail.classList.remove('open');
        detail.innerHTML = '';
        return;
      }
      clearMarks(body);
      const pi = Number(cell.dataset.pi);
      const soulIdx = Number(body.dataset.soul);
      const sel = body.querySelectorAll('.pp-cell');
      sel.forEach((c) => {
        const ci = Number(c.dataset.pi);
        if (ci === fx(pi + 4) || ci === fx(pi + 8) || ci === fx(pi + 6)) c.classList.add('pp-link');
      });
      cell.classList.add('pp-sel');
      cell.setAttribute('aria-expanded', 'true');
      detail.innerHTML = palaceDetailHTML(pi, soulIdx);
      detail.classList.add('open');
    };
    document.addEventListener('click', (e) => {
      const t = e.target;
      if (t && t.closest && t.closest('[data-pp-close]')) {
        const body = t.closest('.pp-body');
        if (body) {
          clearMarks(body);
          const d = body.querySelector('.pp-detail');
          if (d) { d.classList.remove('open'); d.innerHTML = ''; }
          return;
        }
      }
      const cell = t && t.closest ? t.closest('.pp-cell[data-pi]') : null;
      if (cell) toggle(cell);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const cell = e.target && e.target.closest ? e.target.closest('.pp-cell[data-pi]') : null;
      if (!cell) return;
      e.preventDefault();
      toggle(cell);
    });
  }
  pp.bindZiwei = bindZiwei;
  pp._palaceDetailHTML = palaceDetailHTML;
  bindZiwei();

  function hexRows(lines, opt) {
    const o = opt || {};
    const sorted = lines.slice().sort((a, b) => b.position - a.position);
    if (o.plain) {
      return sorted.map((l) => `<div class="mp-hy-row hy-plain">
        <span class="mp-hy-nm">${l.name || POS_NAME[l.position - 1]}</span>
        ${hexBar(l.yinYang === '阳', l.moving)}
      </div>`).join('');
    }
    return sorted.map((l) => {
      const yang = l.yinYang === '阳';
      const sh = o.shiYing
        ? (l.position === o.shi ? '<span class="mp-hy-sy">世</span>' : l.position === o.ying ? '<span class="mp-hy-sy">应</span>' : '<span></span>')
        : '<span></span>';
      return `<div class="mp-hy-row">
        ${sh}
        <span class="mp-hy-nm">${l.name || POS_NAME[l.position - 1]}</span>
        ${hexBar(yang, l.moving)}
        <span class="mp-hy-gz">${esc(l.ganzhi || '')}</span>
        <span class="mp-hy-lq">${esc(l.liuqin || '')}</span>
        <span class="mp-hy-ls">${esc(l.liushen || '')}</span>
      </div>`;
    }).join('');
  }

  pp.liuyaoHTML = function (r) {
    const box = (title, sub, hex, lines) => `<div class="mp-hy-box">
      <div class="mp-hy-h"><b>${title}</b><span>${sub}</span></div>
      <div class="mp-hy">${hexRows(lines, { shiYing: true, shi: hex.shi, ying: hex.ying })}</div>
    </div>`;
    const ben = box(`本卦 ${r.ben.name}`, `${r.ben.palace} · ${r.ben.palaceElement}`, r.ben, r.ben.lines);
    const bian = r.bian
      ? box(`变卦 ${r.bian.name}`, `${r.bian.palace} · ${r.bian.palaceElement}`, r.bian, r.bian.lines)
      : `<div class="mp-hy-box"><div class="mp-hy-h"><b>六爻安静</b><span>无动爻，不取变卦</span></div>
          <div class="pp-dim" style="font-size:12px;line-height:1.9">断卦以本卦卦辞与世应生克为主。</div></div>`;
    return `<div class="pp" style="padding:14px">
      <div class="mp-mh-head">起卦 ${r.cast.notation.join('、')}（自下而上）　日辰 ${r.dayGanZhi.name}</div>
      <div class="mp-hy-wrap">${ben}${bian}</div>
    </div>`;
  };

  pp.meihuaHTML = function (r) {
    const mini = (title, name, upper, lower, note) => {
      const bits = [...(TRI_BITS[lower] || [0, 0, 0]), ...(TRI_BITS[upper] || [0, 0, 0])];
      const rows = bits.slice().reverse().map((b) => hexBar(!!b, false, 'sm')).join('');
      return `<div class="mp-hexbox hb-mini">
        <div class="hb-h">${title}</div>
        <div class="hb-n">${name}</div>
        <div class="mp-mh-mini">${rows}</div>
        <div class="hb-s">${note || `上${upper} 下${lower}`}</div>
      </div>`;
    };
    const benBits = r.lines.slice().sort((a, b) => b.position - a.position);
    const upperLines = benBits.slice(0, 3);
    const lowerLines = benBits.slice(3);
    const movingInUpper = r.moving >= 4;
    const trib = (label, tri, lines, isBody) => `<div class="mp-trib">
      <div class="mp-trib-h">${label} ${tri}${TRI_EL(tri)}<span class="mp-tritag ${isBody ? 'tritag-ti' : 'tritag-yong'}">${isBody ? '体' : '用'}</span></div>
      <div class="mp-hy" style="gap:5px">${hexRows(lines, { plain: true })}</div>
    </div>`;
    const mainBox = `<div class="mp-hexbox">
      <div class="hb-h"><span>本卦</span><span>动 ${r.movingName}</span></div>
      <div class="hb-n">${r.ben.name}</div>
      ${trib('上卦', r.ben.upper, upperLines, !movingInUpper)}
      ${trib('下卦', r.ben.lower, lowerLines, movingInUpper)}
      <div class="hb-s">${r.source}</div>
    </div>`;

    const lv = r.bodyUse.level;
    const lvCls = lv.includes('凶') ? 'bad' : lv.includes('吉') ? 'good' : 'flat';
    const useLine = `<div class="mp-mh-rel">
      <div><b>体</b>${r.bodyUse.body.trigram}（${r.bodyUse.body.element}）　<b>用</b>${r.bodyUse.use.trigram}（${r.bodyUse.use.element}）</div>
      <div><span class="mh-lv ${lvCls}">${lv}</span>　${r.bodyUse.relation}</div>
    </div>`;

    const cuoTri = TRI_OF(r.cuo.name) || ['', ''];
    const zongTri = TRI_OF(r.zong.name) || ['', ''];
    return `<div class="pp mp-mh">
      <div class="mp-mh-main">
        ${mainBox}
        ${mini('互卦', r.hu.name, r.hu.upper, r.hu.lower, '中藏之象')}
        ${mini('变卦', r.bian.name, r.bian.upper, r.bian.lower, `动 ${r.movingName} 后`)}
        ${mini('错卦', r.cuo.name, cuoTri[0], cuoTri[1], '六爻全变')}
        ${mini('综卦', r.zong.name, zongTri[0], zongTri[1], '整卦倒转')}
      </div>
      ${useLine}
    </div>`;
  };

  const HEX_TABLE = {
    乾为天: ['乾', '乾'], 天风姤: ['乾', '巽'], 天山遁: ['乾', '艮'], 天地否: ['乾', '坤'],
    风地观: ['巽', '坤'], 山地剥: ['艮', '坤'], 火地晋: ['离', '坤'], 火天大有: ['离', '乾'],
    坎为水: ['坎', '坎'], 水泽节: ['坎', '兑'], 水雷屯: ['坎', '震'], 水火既济: ['坎', '离'],
    泽火革: ['兑', '离'], 雷火丰: ['震', '离'], 地火明夷: ['坤', '离'], 地水师: ['坤', '坎'],
    艮为山: ['艮', '艮'], 山火贲: ['艮', '离'], 山天大畜: ['艮', '乾'], 山泽损: ['艮', '兑'],
    火泽睽: ['离', '兑'], 天泽履: ['乾', '兑'], 风泽中孚: ['巽', '兑'], 风山渐: ['巽', '艮'],
    震为雷: ['震', '震'], 雷地豫: ['震', '坤'], 雷水解: ['震', '坎'], 雷风恒: ['震', '巽'],
    地风升: ['坤', '巽'], 水风井: ['坎', '巽'], 泽风大过: ['兑', '巽'], 泽雷随: ['兑', '震'],
    巽为风: ['巽', '巽'], 风天小畜: ['巽', '乾'], 风火家人: ['巽', '离'], 风雷益: ['巽', '震'],
    天雷无妄: ['乾', '震'], 火雷噬嗑: ['离', '震'], 山雷颐: ['艮', '震'], 山风蛊: ['艮', '巽'],
    离为火: ['离', '离'], 火山旅: ['离', '艮'], 火风鼎: ['离', '巽'], 火水未济: ['离', '坎'],
    山水蒙: ['艮', '坎'], 风水涣: ['巽', '坎'], 天水讼: ['乾', '坎'], 天火同人: ['乾', '离'],
    坤为地: ['坤', '坤'], 地雷复: ['坤', '震'], 地泽临: ['坤', '兑'], 地天泰: ['坤', '乾'],
    雷天大壮: ['震', '乾'], 泽天夬: ['兑', '乾'], 水天需: ['坎', '乾'], 水地比: ['坎', '坤'],
    兑为泽: ['兑', '兑'], 泽水困: ['兑', '坎'], 泽地萃: ['兑', '坤'], 泽山咸: ['兑', '艮'],
    水山蹇: ['坎', '艮'], 地山谦: ['坤', '艮'], 雷山小过: ['震', '艮'], 雷泽归妹: ['震', '兑'],
  };
  const TRI_ELEM = { 乾: '金', 兑: '金', 离: '火', 震: '木', 巽: '木', 坎: '水', 艮: '土', 坤: '土' };
  const TRI_EL = (t) => (TRI_ELEM[t] ? ` ${TRI_ELEM[t]}` : '');
  const TRI_OF = (name) => HEX_TABLE[name] || null;

  pp.daliurenHTML = function (r) {
    const sc = r.sanChuan;
    const cbox = (c, k) => `<div class="mp-dl-sc-c">
      <div class="mp-dl-sc-k">${k}</div>
      <div class="mp-dl-sc-z">${c.zhi}</div>
      <div class="mp-dl-sc-j">${c.jiangFull || c.jiang}</div>
      <div class="mp-dl-sc-l">${c.liuQin}${c.xunKong ? ' · 空' : ''}</div>
    </div>`;
    const ge = `<div class="mp-dl-sc-c ge">
      <div class="mp-dl-sc-k">格局</div>
      <div class="mp-dl-sc-gn">${r.geJu.name}</div>
      <div class="mp-dl-sc-l">${r.geJu.detail}</div>
    </div>`;
    const keCells = r.siKe.slice().map((x) => `<div class="mp-dl-sk-c">
      <div class="mp-dl-sk-k">${['一课', '二课', '三课', '四课'][x.position - 1] || x.position + '课'}</div>
      <div class="mp-dl-sk-s">${x.shang}</div>
      <div class="mp-dl-sk-x">${x.xia}</div>
      <div class="mp-dl-sk-r">${x.relation} · ${x.jiangFull || x.jiang}</div>
    </div>`).join('');
    const cells = r.pan.map((p) => {
      const pos = POS[p.di] || [1, 1];
      return `<div class="mp-dl-pc" style="grid-row:${pos[0]};grid-column:${pos[1]}">
        <div class="tz">${p.tian}</div>
        <div class="dz">地盘 ${p.di}</div>
        <div class="jz">${p.jiangFull}</div>
      </div>`;
    }).join('');
    const center = `<div class="mp-dl-c">
      <div class="dl-t1">${r.dayGanZhi}日　${r.hourZhi}时</div>
      <div class="dl-t2">${r.dayNight}贵 · 月将 ${r.yueJiang.name}${r.yueJiang.zhi} · 贵人${r.guiren.reverse ? '逆' : '顺'}行</div>
      <div class="dl-t3">${sc.chu.zhi} → ${sc.zhong.zhi} → ${sc.mo.zhi}</div>
      <div class="dl-t2">节气 ${r.jieqi.name}${r.jieqi.time ? ' ' + r.jieqi.time : ''}</div>
    </div>`;
    return `<div class="pp mp-dl">
      <div class="mp-dl-head">日 ${r.dayGanZhi}　时 ${r.hourZhi}（${r.dayNight}贵）　月将 ${r.yueJiang.name}${r.yueJiang.zhi}　节气 ${r.jieqi.name}　贵人${r.guiren.reverse ? '逆' : '顺'}行</div>
      <div class="mp-dl-sc">${cbox(sc.chu, '初传')}${cbox(sc.zhong, '中传')}${cbox(sc.mo, '末传')}${ge}</div>
      <div class="mp-dl-sk">${keCells}</div>
      <div class="mp-dl-pan2">${cells}${center}</div>
      ${(r.shensha || []).length ? `<div class="mp-dl-ss"><b>神煞</b>${r.shensha.map((x) => `<span title="${esc(x.note || '')}">${x.name}<i>${x.branch}</i></span>`).join('')}</div>` : ''}
      <div class="mp-dl-legend"><span>大字＝天盘支</span><span>小字＝地盘（固定十二支）</span><span>右下＝天将</span></div>
    </div>`;
  };

  pp.tarotHTML = function (r) {
    const cards = r.cards.map((c) => `
      <div class="mp-tt-card ${c.upright ? 'tt-up' : 'tt-rev'}">
        <div class="mp-tt-pos" title="${esc(c.positionHint || '')}">${c.position}</div>
        <div class="mp-tt-name">${c.name}${c.number ? `<span class="mp-tt-no">${c.number}</span>` : ''}</div>
        <div class="mp-tt-ori">${c.orientation}</div>
        ${c.core ? `<div class="mp-tt-core">${c.core}</div>` : ''}
        <div class="mp-tt-kw">${c.keywords.map((k) => `<span>${k}</span>`).join('')}</div>
        <div class="mp-tt-el">${c.arcana} · ${c.element}${c.suit ? ' · ' + c.suit + (c.rankCn ? c.rankCn : '') : ''}${c.domain ? ' · ' + c.domain : ''}</div>
      </div>`).join('');
    const q = r.question ? esc(r.question) : '<span class="pp-dim">（未填写，可在上方输入后重抽）</span>';
    const reading = (r.reading || []).map((p) => `<p>${esc(p)}</p>`).join('');
    return `<div class="pp mp-tt">
      <div class="mp-tt-q"><b>所问</b>${q}</div>
      <div class="mp-tt-head">${r.spread}${r.castAt ? `　·　抽牌于 ${r.castAt}` : ''}</div>
      <div class="mp-tt-grid">${cards}</div>
      <div class="mp-tt-read"><div class="mp-tt-rt">牌面解读</div>${reading}</div>
      <div class="mp-tt-note"><div class="mp-tt-rt">你的记录</div>
        <textarea class="mp-tt-ta" rows="4" placeholder="写下判断或对照后的想法……（仅本页可见，不保存）"></textarea>
      </div>
      ${r.systemNote ? `<div class="mp-tt-tip">${r.systemNote}</div>` : ''}
      <div class="mp-tt-tip">塔罗用于自我觉察与娱乐，不作确定性预言。</div>
    </div>`;
  };

  pp.hepanHTML = function (r) {
    const side = (x, who) => `<div class="mp-hp-side">
      <div class="mp-hp-who">${who}</div>
      <div class="mp-hp-gz">${x.pillars.join(' ')}</div>
      <div class="mp-hp-kv"><span>日主</span><b>${x.dayMaster}</b></div>
      <div class="mp-hp-kv"><span>日支</span><b>${x.dayBranch}</b></div>
      <div class="mp-hp-kv"><span>强弱</span><b>${x.strength || '—'}</b></div>
      <div class="mp-hp-kv"><span>喜用</span><b>${x.favor || '—'}</b></div>
    </div>`;
    const dims = r.dimensions.map((d) => `<div class="mp-hp-dim">
      <div class="mp-hp-dimh"><span>${d.label}</span><b class="${d.score >= 10 ? 'good' : d.score < 0 ? 'bad' : ''}">${d.score >= 0 ? '+' : ''}${d.score}</b></div>
      <div class="mp-hp-dimt">${d.text}</div>
    </div>`).join('');
    return `<div class="pp mp-hp">
      <div class="mp-hp-head"><b>${r.score.level}</b><span>${r.score.total}/100</span></div>
      <div class="mp-hp-sides">${side(r.a, '你')}${side(r.b, '对方')}</div>
      <div class="mp-hp-dims">${dims}</div>
      <div class="mp-hp-notes">${r.notes.map((n) => `<p>${n}</p>`).join('')}</div>
    </div>`;
  };

  const QM_ROWS = [['4', '9', '2'], ['3', '5', '7'], ['8', '1', '6']];
  pp.qimenHTML = function (r) {
    const byGong = {};
    for (const p of r.palaces) byGong[p.palace] = p;
    const cell = (g) => {
      if (g === '5') {
        return `<div class="pp-qm-cell center">
          <div class="pp-qm-ju">${r.ju}</div>
          <div class="pp-qm-kv">${r.siZhu.year} ${r.siZhu.month}</div>
          <div class="pp-qm-kv">${r.siZhu.day} ${r.siZhu.time}</div>
          <div class="pp-qm-kv dim">${r.jieqi} ${r.yuan}</div>
        </div>`;
      }
      const p = byGong[g] || {};
      return `<div class="pp-qm-cell">
        <div class="pp-qm-top"><span class="god">${p.god || ''}</span><span class="mk">${p.kong ? '空' : ''}${p.ma ? '马' : ''}</span></div>
        <div class="pp-qm-mid"><span class="tp">${p.tianPan || ''}</span><span class="star">${p.star || ''}</span></div>
        <div class="pp-qm-mid"><span class="dp">${p.diPan || ''}</span><span class="gate">${p.gate || ''}</span></div>
        <div class="pp-qm-bot"><span>${p.anGan || ''}</span><span class="no">${g}</span></div>
      </div>`;
    };
    return `<div class="pp mp-qm">
      <div class="mp-qm-head">
        <b>${r.ju}</b>
        <span>${r.siZhu.year} ${r.siZhu.month} ${r.siZhu.day} ${r.siZhu.time}</span>
        <span>节气 ${r.jieqi}（${r.jieqiTime}）</span>
        <span>值符 ${r.zhiFu.star}（${r.zhiFu.gong}宫）　值使 ${r.zhiShi.gate}（${r.zhiShi.gong}宫）</span>
        <span>旬首 ${r.xunshou}　空亡 ${r.kongWang.join('') || '—'}　驿马 ${r.ma.zhi || '—'}</span>
      </div>
      <div class="mp-qm-grid">${QM_ROWS.map((row) => row.map(cell).join('')).join('')}</div>
      <div class="mp-qm-legend">上＝九星　中＝天盘干／八门　下＝地盘干／宫号　角落＝八神</div>
      <div class="mp-qm-rules">${r.rules.map((x) => `<p>${x}</p>`).join('')}</div>
    </div>`;
  };

  pp.ziweiHepanHTML = function (r) {
    const side = (x, who) => `<div class="mp-hp-side">
      <div class="mp-hp-who">${who}</div>
      <div class="mp-hp-gz">命宫 ${x.soul.branch}　夫妻 ${x.soul.branch ? '' : ''}${x.spouseStars.length ? '' : ''}</div>
      <div class="mp-hp-kv"><span>命宫主星</span><b>${x.soulStars.join('、') || '无正曜'}</b></div>
      <div class="mp-hp-kv"><span>夫妻宫主星</span><b>${x.spouseStars.join('、') || '无正曜'}</b></div>
      <div class="mp-hp-kv"><span>五行局</span><b>${x.bureau}</b></div>
      <div class="mp-hp-kv"><span>身宫</span><b>${x.body.branch}（${x.body.lands || '—'}）</b></div>
      <div class="mp-hp-kv"><span>生年四化</span><b>${x.natalSihua.join('、')}</b></div>
    </div>`;
    const dims = r.dimensions.map((d) => `<div class="mp-hp-dim">
      <div class="mp-hp-dimh"><span>${d.label}</span><b class="${d.score >= 10 ? 'good' : d.score < 0 ? 'bad' : ''}">${d.score >= 0 ? '+' : ''}${d.score}</b></div>
      <div class="mp-hp-dimt">${d.text}</div>
    </div>`).join('');
    const list = (who) => (r.interactions || []).filter((h) => h.who === who)
      .map((h) => `<li><b class="m-${h.mutagen}">${h.mutagen}</b>${h.star}：本命${h.ownPalace} → 对方${h.landingPalace || '盘外'}${h.strong ? '<i>（强）</i>' : ''}</li>`).join('');
    return `<div class="pp mp-hp">
      <div class="mp-hp-head"><b>${r.score.level}</b><span>${r.score.total}/100　紫微合盘</span></div>
      <div class="mp-hp-sides">${side(r.a, '你')}${side(r.b, '对方')}</div>
      <div class="mp-hp-dims">${dims}</div>
      <div class="mp-hp-inter">
        <div><div class="mp-hp-ith">你的四化 落在对方</div><ul>${list('你') || '<li>无</li>'}</ul></div>
        <div><div class="mp-hp-ith">对方的四化 落在你</div><ul>${list('对方') || '<li>无</li>'}</ul></div>
      </div>
      <div class="mp-hp-notes">${r.notes.map((n) => `<p>${n}</p>`).join('')}</div>
    </div>`;
  };

  pp.baziHTML = function (r) {
    const cols = [['year', '年柱'], ['month', '月柱'], ['day', '日柱'], ['hour', '时柱']];
    const SHORT = { year: '年', month: '月', day: '日', hour: '时' };
    const ELC = { 木: 'wood', 火: 'fire', 土: 'earth', 金: 'metal', 水: 'water' };
    const TG = {
      比肩: 'tg-bi', 劫财: 'tg-bi',
      食神: 'tg-shi', 伤官: 'tg-shi',
      偏财: 'tg-cai', 正财: 'tg-cai',
      七杀: 'tg-guan', 正官: 'tg-guan',
      偏印: 'tg-yin', 正印: 'tg-yin',
    };
    const tg = (name) => `<span class="tg ${TG[name] || ''}">${name}</span>`;
    const el = (e) => `<span class="wx-${ELC[e] || 'earth'}">${e}</span>`;
    const ssTag = (x) => `<span class="ss-s ${x.luck || 'neutral'}" title="${esc(`${x.cat} · ${x.via}查${x.target} ｜ ${x.rule}`)}">${x.name}</span>`;
    const line = (label, fn) => `<tr><td class="bz-lbl">${label}</td>${cols.map(([k]) => `<td data-c="${SHORT[k]}">${fn(r.pillars[k], k)}</td>`).join('')}</tr>`;
    const head = `<thead><tr><th></th>${cols.map(([k, n]) => `<th${k === 'day' ? ' class="bz-hdr-day"' : ''}>${n}</th>`).join('')}</tr></thead>`;
    const SEASON_EL = { 寅: '木', 卯: '木', 巳: '火', 午: '火', 申: '金', 酉: '金', 亥: '水', 子: '水', 辰: '土', 戌: '土', 丑: '土', 未: '土' };
    const GEN = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
    const OVR = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };
    const seasonEl = SEASON_EL[r.pillars.month.branch] || '土';
    const WX_ALL = ['木', '火', '土', '金', '水'];
    const stateOf = (e) => (e === seasonEl ? '旺'
      : GEN[seasonEl] === e ? '相'
        : GEN[e] === seasonEl ? '休'
          : OVR[e] === seasonEl ? '囚' : '死');
    const wxRow = `<tr><td class="bz-lbl">五行</td><td class="bz-wxs" colspan="4">${
      ['旺', '相', '休', '囚', '死'].map((st) => {
        const e = WX_ALL.find((x) => stateOf(x) === st) || seasonEl;
        return `<i><b class="wx-${ELC[e]}">${e}</b><em>${st}</em></i>`;
      }).join('')}</td></tr>`;
    const rows = [
      line('十神', (p, k) => (k === 'day'
        ? `<span class="bz-zhuri">${r.input.gender === 'male' ? '元男' : '元女'}</span>`
        : (p.stemTenGod ? tg(p.stemTenGod) : '<span class="pp-dim">—</span>'))),
      line('天干', (p) => `<span class="bz-big ${'wx-' + ELC[p.stemElement]}">${p.stem}</span>`),
      line('地支', (p) => `<span class="bz-big ${'wx-' + ELC[p.branchElement]}">${p.branch}</span>`),
      line('藏干', (p) => p.hidden.map((x) => `<i class="bz-cg wx-${ELC[x.element]}">${x.stem}·${x.element}</i>`).join('')),
      line('支神', (p) => p.hidden.map((x) => tg(x.tenGod)).join('<br>')),
      line('纳音', (p) => p.nayin),
      line('空亡', (p) => `<span class="pp-dim">${p.kongwang.join('')}</span>`),
      line('地势', (p) => p.dishi),
      line('自坐', (p) => p.zizuo),
      line('神煞', (p) => (p.shenshaDetail && p.shenshaDetail.length
        ? `<span class="pp-ss">${p.shenshaDetail.map(ssTag).join('')}</span>`
        : '<span class="pp-dim">—</span>')),
      wxRow,
    ].join('');
    const wx = Object.entries(r.wuxing).map(([k, v]) => `<span class="pp-chip wx-${ELC[k]}">${k} ${v}</span>`).join('');

    const fr = r.frame || {};
    const tierCls = (t) => (t === '大吉' || t === '吉' ? 'ok' : t === '大忌' || t === '忌' ? 'warn' : '');
    const sect = (title, body) => (body ? `<div class="pp-sec"><div class="pp-sec-h">${title}</div>${body}</div>` : '');
    const gj = fr.geju && fr.geju.length ? `
      <div class="pp-tl">${fr.primary ? `主格 <b>${esc(fr.primary.name)}</b>　${esc(fr.primary.evidence)}` : ''}</div>
      <div class="pp-chips">${fr.geju.map((g) => `<span class="pp-chip" title="${esc(g.evidence)}">${esc(g.name)}<i class="pp-drel">${esc(g.kind)}</i></span>`).join('')}</div>` : '';
    const ys = fr.yongshen ? `
      <div class="pp-tl">喜 ${fr.yongshen.favor.map(el).join('')}　忌 ${fr.yongshen.avoid.map(el).join('')}　<span class="pp-dim">${esc(fr.yongshen.method)}</span></div>
      <div class="pp-chips">${fr.yongshen.favorTenGods.map((t) => `<span class="pp-chip ok">${esc(t)}</span>`).join('')}${fr.yongshen.avoidTenGods ? fr.yongshen.avoidTenGods.map((t) => `<span class="pp-chip warn">${esc(t)}</span>`).join('') : ''}</div>
      <div class="pp-tl pp-dim">${esc(fr.yongshen.detail)}</div>` : '';
    const gods = fr.godStats ? `<div class="pp-chips">${Object.entries(fr.godStats.groups).map(([k, v]) => `<span class="pp-chip">${k} ${v}</span>`).join('')}</div>` : '';

    const dy = r.dayun.list.map((d) => {
      const lk = d.luck || null;
      return `<span class="pp-chip ${lk ? tierCls(lk.tier) : ''}" title="${esc(lk ? `${lk.tier} ${lk.score}｜${(lk.reasons || []).join('；')}` : '')}">${d.startAge} ${d.ganzhi}${(d.relations && d.relations.length) ? ` <i class="pp-drel">${d.relations.join('')}</i>` : ''}${lk ? ` ${lk.tier}` : ''}</span>`;
    }).join('');
    const ln = (r.liunian && r.liunian.length) ? `<div class="pp-chips">${r.liunian.slice(0, 8).map((l) => {
      const lk = l.luck || null;
      return `<span class="pp-chip ${lk ? tierCls(lk.tier) : ''}" title="${esc(lk ? `${lk.tier} ${lk.score}｜${(lk.reasons || []).join('；')}` : '')}">${l.year} ${l.ganzhi}${lk ? ` ${lk.tier}` : ''}</span>`;
    }).join('')}</div>` : '';
    const str = r.strength ? `<div class="pp-str">日主强弱：<b>${r.strength.level}</b>${r.strength.score}　<span class="pp-dim">${r.strength.detail}</span></div>` : '';
    const ssGroups = (r.shensha && r.shensha.groups) || [];
    const ssx = ssGroups.length ? `
      <div class="pp-ssx">
        <div class="ssx-h"><b>神煞全览</b><span>共 ${r.shensha.count} 见 · ${ssGroups.length} 类 · 悬停看查法</span></div>
        ${ssGroups.map((g) => `<div class="pp-ssg"><span class="ssg-gt">${g.cat}</span><span class="ssg-gi">${g.items.map((i) => `<span class="pp-ssi ${i.luck || 'neutral'}" title="${esc(`${i.via}查${i.target} ｜ ${i.rule}`)}">${i.name}<em>${i.pillars.map((k) => SHORT[k] || '').join('')}</em></span>`).join('')}</span></div>`).join('')}
        <div class="ssx-h" style="border-top:none;padding-top:4px;margin-top:4px">神煞只作参考，吉凶仍须看格局、旺衰与行运。</div>
      </div>` : '';
    return `<div class="pp" style="padding:12px">
      <table class="pp-bz">${head}<tbody>${rows}</tbody></table>
      <div class="pp-rel"><div><b>天干</b>${(r.relations && r.relations.stems.length) ? r.relations.stems.join(' · ') : '—'}</div>
      <div><b>地支</b>${(r.relations && r.relations.branches.length) ? r.relations.branches.join(' · ') : '—'}</div></div>
      ${str}
      ${sect('格局', gj)}
      ${sect('用神', ys)}
      ${sect('五行与十神', `<div class="pp-chips">${wx}</div>${gods}`)}
      ${sect('大运', `<div class="pp-chips">${dy}</div>`)}
      ${ln ? sect('流年', ln) : ''}
      ${r.palaces ? sect('胎元与命身宫', `<div class="pp-chips">
        <span class="pp-chip" title="${r.palaces.taiyuan.note}">胎元 ${r.palaces.taiyuan.ganzhi}</span>
        <span class="pp-chip" title="${r.palaces.minggong.note}">命宫 ${r.palaces.minggong.ganzhi}</span>
        <span class="pp-chip" title="${r.palaces.shengong.note}">身宫 ${r.palaces.shengong.ganzhi}</span>
      </div>`) : ''}
      ${ssx}
      <div style="margin-top:8px;font-size:12px;color:var(--muted)">上一节 ${r.jieqi.previous.name} ${r.jieqi.previous.time}　下一节 ${r.jieqi.next.name} ${r.jieqi.next.time}　${r.dayun.rule}，${r.dayun.startAge.years}岁起运</div>
    </div>`;
  };

  const MT_LABEL = { natal: '命盘解析', divination: '卦象解析', card: '牌阵解析' };

  pp.interpretHTML = function (it, opt) {
    if (!it) return '';
    if (!(it.dimensions && it.dimensions.length) && !it.error) return '';
    const folded = !!(opt && opt.folded);
    const dims = it.dimensions.map((d, i) => `<div class="mp-it-dim${d.focused ? ' focus' : ''}">
      <div class="mp-it-dh"><span class="mp-it-dno">${i + 1}</span><span class="mp-it-dlabel">${esc(d.label)}</span>${d.focused ? '<span class="mp-it-focus">最贴近你的问题</span>' : ''}</div>
      <div class="mp-it-dtext">${esc(d.text)}</div>
      ${(d.evidence && d.evidence.length) ? `<div class="mp-it-dev"><b>依据</b>${d.evidence.map((x) => esc(x)).join('；')}</div>` : ''}
      ${d.advice ? `<div class="mp-it-adv"><b>建议</b>${esc(d.advice)}</div>` : ''}
    </div>`).join('');
    const secs = (it.sections && it.sections.length)
      ? `<div class="mp-it-secs">${it.sections.map((s) => `<div class="mp-it-sec">
        <div class="mp-it-sh">${esc(s.label)}</div>
        <div class="mp-it-stext">${esc(s.text)}</div>
      </div>`).join('')}</div>`
      : '';
    const tags = [it.systemLabel, MT_LABEL[it.moduleType] || it.moduleType].filter(Boolean);
    const ask = it.ask;
    const askLine = (ask && (ask.question || (ask.direction && ask.direction !== 'general')))
      ? `<div class="mp-it-ask"><span class="ask-q">问题：${ask.question ? esc(ask.question) : '<span class="ask-none">（未填写）</span>'}</span><span class="ask-sep">｜</span><span class="ask-d">询问方向：${esc(ask.directionLabel || '综合')}</span></div>`
      : '';
    return `<div class="mp-it${folded ? ' folded' : ''}">
      <button type="button" class="mp-it-head" aria-expanded="${folded ? 'false' : 'true'}">
        <span class="mp-it-arrow" aria-hidden="true">▾</span>
        <span class="mp-it-title">解析与详解</span>${tags.map((t) => `<span class="mp-it-tag">${esc(t)}</span>`).join('')}
        <span class="mp-it-hint">${folded ? '点击展开' : '点击收起'}</span>
      </button>
      <div class="mp-it-wrap">
        ${askLine}
        ${it.lead ? `<div class="mp-it-lead">${esc(it.lead)}</div>` : ''}
        ${it.error ? `<div class="mp-it-err"><b>⚠ 解析生成失败</b>${esc(it.error)}——上方盘面数据本身可用</div>` : ''}
        <div class="mp-it-body">${dims}</div>
        ${secs}
        <div class="mp-it-dis">${esc(it.disclaimer)}</div>
      </div>
    </div>`;
  };

  pp.resultWithInterpret = function (html, it, opt) {
    return (html || '') + pp.interpretHTML(it, opt);
  };
})();

const HIST_KEY = 'dsh-metaphysics/history-v1';
function loadHistory() {
  try {
    const raw = window.localStorage && window.localStorage.getItem(HIST_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list.slice(0, 20) : [];
  } catch (e) { return []; }
}
function saveHistory(list) {
  try {
    if (window.localStorage) window.localStorage.setItem(HIST_KEY, JSON.stringify(list.slice(0, 20)));
  } catch (e) { /* 隐私模式或配额满：静默降级，不影响排盘 */ }
}
const sameEntry = (a, b) =>
  a.kind === b.kind && a.date === b.date && a.time === b.time && a.gender === b.gender
  && a.address === b.address && a.lines === b.lines && a.question === b.question
  && a.mhMode === b.mhMode && a.upper === b.upper && a.lower === b.lower;

function HISTORY_LABEL(kind, r) {
  if (kind === 'bazi') return Object.values(r.pillars || {}).map((p) => p.ganzhi).join(' ');
  if (kind === 'ziwei') return `${r.soul ? r.soul.branch : ''}宫 ${r.bureau ? r.bureau.name : ''} ${r.lunar ? r.lunar.year + '年' : ''}`.trim();
  if (kind === 'liuyao') return r.ben && r.ben.name ? r.ben.name : '';
  if (kind === 'meihua') return r.ben && r.ben.name ? `${r.ben.name} 动${r.moving}` : '';
  if (kind === 'daliuren') return `${r.dayGanZhi || ''} ${r.geJu ? r.geJu.name : ''}`;
  return '';
}
const PP = window.__PP;
const CSS = `
.mp-wrap{height:100%;overflow:auto;padding:20px 24px 40px;color:var(--dsw-alias-label-primary);font-size:14px}
.mp-wrap>*{max-width:940px;margin-left:auto;margin-right:auto}
.mp-panel{background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:14px;padding:16px 18px 14px;margin-bottom:14px}
.mp-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px 14px;align-items:end}
.mp-lbl{display:block;height:18px;line-height:18px;font-size:12.5px;color:var(--dsw-alias-label-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mp-checks{display:flex;gap:20px;flex-wrap:wrap;margin-top:13px;font-size:12.5px;color:var(--dsw-alias-label-secondary)}
.mp-checks label{display:inline-flex;align-items:center;gap:6px;cursor:pointer}
.mp-askblock{margin-top:14px;display:flex;flex-direction:column;gap:5px}
.mp-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:14px}
.mp-tabs{display:inline-flex;gap:4px;margin-bottom:14px;flex-wrap:wrap;padding:4px;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:11px;width:100%;max-width:940px}
.mp-tab{padding:7px 15px;border-radius:8px;border:none;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;font-size:13.5px;transition:background .12s,color .12s}
.mp-tab:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
.mp-tab.on{background:var(--dsw-alias-brand-primary);color:#fff}
.mp-field{display:flex;flex-direction:column;gap:5px;font-size:13px;color:var(--dsw-alias-label-secondary);min-width:0}
.mp-input{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-primary);border-radius:8px;padding:7px 11px;font-size:14px;outline:none;width:100%;min-width:0;height:36px}
.mp-input:focus{border-color:var(--dsw-alias-brand-primary)}
.mp-textarea{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-primary);border-radius:8px;padding:8px 11px;font-size:14px;outline:none;width:100%;min-width:0;resize:vertical;line-height:1.5;font-family:inherit}
.mp-textarea:focus{border-color:var(--dsw-alias-brand-primary)}
.mp-textarea.invalid{border-color:var(--dsw-alias-state-error-primary)}
.mp-btn{padding:8px 22px;border-radius:8px;border:none;background:var(--dsw-alias-brand-primary);color:#fff;cursor:pointer;font-size:14px;font-weight:600;min-width:132px}
.mp-btn.ghost{background:transparent;border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-secondary)}
.mp-seg{display:flex;width:100%;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;overflow:hidden;height:36px}
.mp-seg button{flex:1;padding:0 8px;background:transparent;border:none;color:var(--dsw-alias-label-secondary);font-size:13px;cursor:pointer}
.mp-seg button.on{background:var(--dsw-alias-brand-primary);color:#fff}
.mp-hist{margin-bottom:14px}
.mp-hist-h{display:flex;align-items:center;justify-content:space-between;font-size:12px;color:var(--dsw-alias-label-secondary);margin-bottom:6px}
.mp-hist-clear{background:transparent;border:none;color:var(--dsw-alias-label-secondary);font-size:12px;cursor:pointer;padding:0}
.mp-hist-clear:hover{color:var(--dsw-alias-state-error-primary)}
.mp-hist-list{display:flex;gap:8px;flex-wrap:wrap}
.mp-hist-item{display:flex;align-items:baseline;gap:6px;padding:6px 10px;border-radius:9px;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-primary);font-size:12px;cursor:pointer;max-width:100%}
.mp-hist-item:hover{border-color:var(--dsw-alias-brand-primary)}
.mp-hist-item b{font-weight:600}
.mp-hist-item span{color:var(--dsw-alias-label-secondary)}
.mp-hist-item i{font-style:normal;color:var(--dsw-alias-label-secondary);opacity:.7;font-size:11px}.mp-hint{font-size:12.5px;color:var(--dsw-alias-label-secondary);line-height:1.7;margin:0 0 14px;padding-left:2px}
.mp-card{margin-top:18px;padding:16px 18px;border-radius:14px;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1)}
.mp-flat{margin-top:16px;padding:0;border:none;background:transparent;border-radius:0}
.mp-dim{color:var(--dsw-alias-label-secondary)}
.mp-err{margin-top:16px;padding:9px 14px;border-radius:8px;border-left:3px solid var(--dsw-alias-state-error-primary);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 8%,transparent);color:var(--dsw-alias-state-error-primary);font-size:13px}
.mp-empty{margin-top:26px;padding:34px 24px;border:1px dashed var(--dsw-alias-border-l1);border-radius:12px;text-align:center;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:2}
.mp-empty b{display:block;font-size:15px;color:var(--dsw-alias-label-primary);margin-bottom:6px;font-weight:600}
.mp-note{margin-top:12px;padding:9px 14px;border-radius:10px;font-size:12px;background:color-mix(in srgb,var(--dsw-alias-state-warning-primary) 14%,transparent);color:var(--dsw-alias-state-warning-primary)}
.mp-bar{display:flex;gap:8px;align-items:center;margin-top:14px}
.mp-auto{margin:-8px 0 14px;padding-left:2px;font-size:12.5px;line-height:1.7;color:var(--dsw-alias-label-secondary)}
.mp-cast{margin:0 0 14px;padding-left:2px;font-size:12.5px;line-height:1.7;color:var(--dsw-alias-label-secondary)}
.mp-cast b{color:var(--dsw-alias-label-primary);font-weight:600}
@media (max-width:860px){
  .mp-row{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (max-width:720px){
  .mp-wrap{padding:14px 14px 36px}
  .mp-tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-bottom:12px}
  .mp-tab{padding:9px 4px;font-size:13.5px;text-align:center}
  .mp-input,.mp-textarea{padding:10px 12px;font-size:16px;min-height:44px;height:auto}
  .mp-textarea{min-height:76px}
  .mp-actions{margin-top:12px}
  .mp-btn{width:100%;padding:12px;font-size:15px;min-height:46px;min-width:0}
  .mp-hint,.mp-auto,.mp-cast{font-size:12.5px}
  .mp-empty{margin-top:18px;padding:24px 16px;font-size:12.5px}
  .mp-bar{flex-wrap:wrap}
}
@media (max-width:480px){
  .mp-row{grid-template-columns:1fr}
}
@media (max-width:420px){
  .mp-wrap{padding:12px 10px 32px}
  .mp-tab{font-size:13px;padding:8px 2px}
}
`;

const { useState, useEffect } = React;

function PanelIcon(props) {
  const size = props && props.size ? props.size : 20;
  const active = props && props.active;
  return h('svg', {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round',
    'aria-hidden': true, style: { opacity: active ? 1 : 0.72 },
  },
  h('circle', { cx: 12, cy: 12, r: 8.2 }),
  h('path', { d: 'M12 3.8a4.1 4.1 0 0 1 0 8.2 4.1 4.1 0 0 0 0 8.2' }),
  h('circle', { cx: 12, cy: 8, r: 1.1, fill: 'currentColor', stroke: 'none' }),
  h('circle', { cx: 12, cy: 16, r: 1.1, fill: 'currentColor', stroke: 'none' }));
}

const TABS = [
  { k: 'ziwei', label: '紫微', timeLabel: '出生时刻', hint: '紫微斗数需要出生日期、时刻与性别；出生地只影响真太阳时修正。' },
  { k: 'bazi', label: '八字', timeLabel: '出生时刻', hint: '四柱八字按节气与真太阳时定时柱，出生地越准，时柱越稳。' },
  { k: 'liuyao', label: '六爻', timeLabel: '起卦时刻', hint: '六爻不需要出生时间：只用起卦当下的日辰定六神、月建定旺衰，卦由摇出。' },
  { k: 'meihua', label: '梅花', timeLabel: '起卦时刻', hint: '梅花用起卦时刻的年月日时数成卦，也可直接给两个数字起卦；与出生时间无关。' },
  { k: 'daliuren', label: '六壬', timeLabel: '起卦时刻', hint: '大六壬用起卦时刻的日干支、时支与月将起天地盘；同样与出生时间无关。' },
  { k: 'hepan', label: '合盘', timeLabel: '你的出生时刻', hint: '合盘按「日主 + 夫妻宫 + 五行互补」看两个人的相处与互补，需要双方出生信息。' },
    { k: 'tarot', label: '塔罗', timeLabel: '', hint: '塔罗不看时间，只记录抽牌时刻与你的提问。' },
];

function pad(n) { return String(n).padStart(2, '0'); }

function nowParts() {
  const d = new Date();
  return { date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`, time: `${pad(d.getHours())}:${pad(d.getMinutes())}` };
}

const TIME_KIND = {
  ziwei: 'birth', bazi: 'birth', hepan: 'birth',
  liuyao: 'cast', meihua: 'cast', daliuren: 'cast',
  tarot: 'none',
};
const SAMPLE = { date: '1990-05-12', time: '14:30' };
const kindOf = (t) => TIME_KIND[t] || 'none';

const NEED_ASK = { liuyao: true, meihua: true, daliuren: true, tarot: true };
const needAsk = (t) => !!NEED_ASK[t];

function App() {
  const [tab, setTab] = useState('ziwei');
  const [date, setDate] = useState('1990-05-12');
  const [time, setTime] = useState('14:30');
  const [gender, setGender] = useState('female');
  const [address, setAddress] = useState('');
  const [pDate, setPDate] = useState('1992-08-15');
  const [pTime, setPTime] = useState('10:00');
  const [pGender, setPGender] = useState('female');
  const [pAddress, setPAddress] = useState('');
  const [hpChart, setHpChart] = useState('bazi');
  const [trueSolar, setTrueSolar] = useState(true);
  const [onlineGeo, setOnlineGeo] = useState(false);
  const [lines, setLines] = useState('');
  const [result, setResult] = useState(null);
  const [hist, setHist] = useState(() => loadHistory());
  const [replayArgs, setReplayArgs] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [count, setCount] = useState('3');
  const [question, setQuestion] = useState('');
  const [direction, setDirection] = useState('general');
  const [foldPref, setFoldPref] = useState(null);
  const [askInvalid, setAskInvalid] = useState(false);
  const [mhMode, setMhMode] = useState('time');
  const [upper, setUpper] = useState('');
  const [lower, setLower] = useState('');
  const [changing, setChanging] = useState('');
  const [copied, setCopied] = useState('');
  const [manual, setManual] = useState({ birth: null, cast: null });

  const meta = TABS.find((t) => t.k === tab) || TABS[0];
  const isBirth = tab === 'bazi' || tab === 'ziwei' || tab === 'hepan';
  const timeKind = kindOf(tab);
  const usesTimeInput = !(tab === 'meihua' && mhMode === 'number');
  const showDT = tab !== 'tarot' && usesTimeInput;

  const run = async (kind, override, modeOverride) => {
    const k = kind || tab;
    const mh = modeOverride || mhMode;
    const dt = override ? override : { date, time };
    try {
      const datetime = `${dt.date}T${dt.time}`;
      const args = { system: k };
      if (k !== 'tarot') args.datetime = datetime;
      if (k === 'bazi' || k === 'ziwei') {
        args.gender = gender;
        args.trueSolar = trueSolar;
        if (address.trim()) {
          args.address = address.trim();
          try {
            const g = await Engine.geocodeAddress(args.address, { online: onlineGeo });
            if (g && typeof g.lon === 'number') { args.longitude = g.lon; args.geo = g; }
          } catch (e) {
            console.error('[metaphysics] 地址解析失败，退回内置表', e);
          }
        }
      }
      if (k === 'liuyao') {
        const parsed = lines.split(/[^0-9]+/).filter(Boolean).map(Number);
        const bad = parsed.filter((n) => ![6, 7, 8, 9].includes(n));
        if (parsed.length === 6 && bad.length === 0) {
          args.lines = parsed;
        } else if (lines.trim()) {
          setNotice(parsed.length !== 6
            ? `爻值需要正好 6 个数字（当前 ${parsed.length} 个），本次按随机摇卦。`
            : `爻值只能是 6/7/8/9（收到 ${bad.join('/')}），本次按随机摇卦。`);
        }
      }
      if (k === 'tarot') args.count = Number(count);
      if (k === 'hepan') {
        args.chart = hpChart;
        args.partner = {
          datetime: `${pDate}T${pTime}`,
          gender: pGender,
          address: pAddress.trim() || undefined,
          trueSolar,
        };
      }
      if (needAsk(k)) {
        if (!question.trim()) {
          setError('请先填写「所问之事」——一句话即可，例如：今年是否适合换工作？');
          setAskInvalid(true);
          setResult(null);
          return;
        }
        setAskInvalid(false);
        args.question = question.trim();
      }
      if (k === 'meihua') {
        args.mode = mh;
        if (mh === 'number') {
          if (upper.trim() === '' || lower.trim() === '') {
            setError('数字起卦需要填两个数（第一个数定上卦、第二个数定下卦）。');
            setResult(null);
            return;
          }
          args.upper = Number(upper);
          args.lower = Number(lower);
          if (!Number.isFinite(args.upper) || !Number.isFinite(args.lower)) {
            setError('两个数都要是数字，例如 17 和 29。');
            setResult(null);
            return;
          }
          if (changing !== '') args.changing = Number(changing);
        }
      }
      const r = Engine.compute(args);
      const it = Engine.interpret
        ? Engine.interpret(r, needAsk(k) ? { question: question.trim(), direction } : undefined)
        : null;
      const timed = kindOf(k) === 'cast' && (k !== 'meihua' || mh === 'time');
      setResult({ kind: k, r, it, at: dt, timed });
      setError('');      setCopied('');
      if (k !== 'tarot') {
        const entry = {
          kind: k, date, time, gender, address,
          lines: k === 'liuyao' ? lines : '',
          question: needAsk(k) ? question.trim() : '',
          direction, count,
          mhMode, upper, lower, changing,
          label: HISTORY_LABEL(k, r),
          at: Date.now(),
        };
        setHist((prev) => {
          const next = [entry, ...prev.filter((x) => !sameEntry(x, entry))].slice(0, 20);
          saveHistory(next);
          return next;
        });
      }
    } catch (e) {
      setError(e && e.message ? e.message : String(e));
      setResult(null);
    }
  };

  const switchTo = (next) => {
    const k = kindOf(next);
    setTab(next);
    setError('');
    if (k === 'none') { run(next); return; } // 塔罗不看时间，直接抽牌（与 web-ui 一致）
    const v = manual[k] || (k === 'cast' ? nowParts() : { date: SAMPLE.date, time: SAMPLE.time });
    setDate(v.date);
    setTime(v.time);
    run(next, v);
  };

  const editDate = (value) => {
    setDate(value);
    if (timeKind !== 'none') setManual((m) => Object.assign({}, m, { [timeKind]: { date: value, time } }));
  };
  const editTime = (value) => {
    setTime(value);
    if (timeKind !== 'none') setManual((m) => Object.assign({}, m, { [timeKind]: { date, time: value } }));
  };

  const runNow = () => {
    const t = nowParts();
    setDate(t.date);
    setTime(t.time);
    if (timeKind !== 'none') setManual((m) => Object.assign({}, m, { [timeKind]: null }));
    run(tab, t);
  };

  const go = () => {
    if (timeKind !== 'none' && !manual[timeKind]) {
      const t = nowParts();
      setDate(t.date);
      setTime(t.time);
      run(tab, t);
      return;
    }
    run(tab);
  };

  const switchMode = (m) => {
    setMhMode(m);
    run(tab, { date, time }, m);
  };

  const isNarrow = () => !!(window.matchMedia && window.matchMedia('(max-width: 640px)').matches);
  const defaultFolded = () => (foldPref === null ? isNarrow() : foldPref);

  const onFoldClick = (e) => {
    const head = e.target && e.target.closest ? e.target.closest('.mp-it-head') : null;
    if (!head) return;
    const box = head.closest('.mp-it');
    if (!box) return;
    const folded = !box.classList.contains('folded');
    box.classList.toggle('folded', folded);
    head.setAttribute('aria-expanded', folded ? 'false' : 'true');
    const hint = head.querySelector('.mp-it-hint');
    if (hint) hint.textContent = folded ? '点击展开' : '点击收起';
    setFoldPref(folded);
  };

  const refreshInterpret = (dir, q) => {
    if (!result || !needAsk(tab)) return;
    const ask = { question: (q === undefined ? question : q).trim(), direction: dir === undefined ? direction : dir };
    const it = Engine.interpret ? Engine.interpret(result.r, ask) : null;
    setResult(Object.assign({}, result, { it }));
  };

  const castAtHTML = (res) => {
    if (!res || !res.timed || !res.at) return '';
    return `<div class="mp-cast">起卦时刻：<b>${res.at.date} ${res.at.time}</b>　（来自你的本机时间，点「此刻」可重新取当下）</div>`;
  };

  const copyResult = () => {
    try {
      const text = result && result.r && result.r.summary ? result.r.summary : '';
      if (!text) return;
      navigator.clipboard.writeText(text).then(() => setCopied('已复制'), () => setCopied('复制失败'));
    } catch (e) { setCopied('复制失败'); }
  };

  const field = (label, node) => h('label', { className: 'mp-field' }, h('span', { className: 'mp-lbl' }, label), node);

  const replay = (x) => {
    setTab(x.kind);
    if (x.date) setDate(x.date);
    if (x.time) setTime(x.time);
    if (x.gender) setGender(x.gender);
    setAddress(x.address || '');
    setLines(x.lines || '');
    setQuestion(x.question || '');
    setDirection(x.direction || 'general');
    setCount(x.count || '3');
    setMhMode(x.mhMode || 'time');
    setUpper(x.upper || '');
    setLower(x.lower || '');
    setChanging(x.changing || '');
    setAskInvalid(false);
    setReplayArgs(x);
  };
  const clearHist = () => { setHist([]); saveHistory([]); };

  useEffect(() => { run('ziwei'); }, []);
  useEffect(() => {
    if (!replayArgs) return;
    const k = replayArgs.kind;
    setReplayArgs(null);
    run(k);
  }, [replayArgs]);

  const children = [
    h('div', { key: 'tabs', className: 'mp-tabs', role: 'tablist', 'aria-label': '命理体系' }, TABS.map((t) =>
      h('button', {
        key: t.k,
        role: 'tab',
        'aria-selected': tab === t.k ? 'true' : 'false',
        tabIndex: tab === t.k ? 0 : -1,
        className: 'mp-tab' + (tab === t.k ? ' on' : ''),
        onClick: () => switchTo(t.k),
      }, t.label))),

    h('div', { key: 'head', className: 'mp-panel' },
      h('div', { className: 'mp-row' },
        showDT ? field(isBirth ? '出生日期（公历）' : '起卦日期（公历）',
          h('input', { className: 'mp-input', type: 'date', value: date, onChange: (e) => editDate(e.target.value) })) : null,
        showDT ? field(isBirth ? '出生时刻' : '起卦时刻',
          h('input', { className: 'mp-input', type: 'time', value: time, onChange: (e) => editTime(e.target.value) })) : null,
        isBirth ? field('性别', h('select', {
          className: 'mp-input', value: gender, onChange: (e) => setGender(e.target.value),
        }, h('option', { value: 'female' }, '女'), h('option', { value: 'male' }, '男'))) : null,
        isBirth ? field('出生地（省/市即可）', h('input', {
          className: 'mp-input', placeholder: '如 河北石家庄 / 成都', value: address,
          onChange: (e) => setAddress(e.target.value),
        })) : null,
        tab === 'hepan' ? field('对方出生日期', h('input', {
          className: 'mp-input', type: 'date', value: pDate, onChange: (e) => setPDate(e.target.value),
        })) : null,
        tab === 'hepan' ? field('对方出生时刻', h('input', {
          className: 'mp-input', type: 'time', value: pTime, onChange: (e) => setPTime(e.target.value),
        })) : null,
        tab === 'hepan' ? field('对方性别', h('select', {
          className: 'mp-input', value: pGender, onChange: (e) => setPGender(e.target.value),
        }, h('option', { value: 'female' }, '女'), h('option', { value: 'male' }, '男'))) : null,
        tab === 'hepan' ? field('合盘方式', h('div', { className: 'mp-seg' },
          h('button', { className: hpChart === 'bazi' ? 'on' : '', onClick: () => setHpChart('bazi') }, '八字'),
          h('button', { className: hpChart === 'ziwei' ? 'on' : '', onClick: () => setHpChart('ziwei') }, '紫微'))) : null,        tab === 'hepan' ? field('对方出生地（可空）', h('input', {
          className: 'mp-input', placeholder: '如 四川成都', value: pAddress,
          onChange: (e) => setPAddress(e.target.value),
        })) : null,
        needAsk(tab) ? field('询问方向', h('select', {
          className: 'mp-input', value: direction,
          onChange: (e) => { setDirection(e.target.value); refreshInterpret(e.target.value); },
        }, (Engine.DIRECTIONS || []).map((d) => h('option', { key: d.key, value: d.key }, d.label)))) : null,
        tab === 'tarot' ? field('张数', h('select', {
          className: 'mp-input', value: count, onChange: (e) => setCount(e.target.value),
        }, h('option', { value: '1' }, '1 张 · 指引'), h('option', { value: '3' }, '3 张 · 过去现在未来'), h('option', { value: '5' }, '5 张 · 十字牌阵'))) : null,
        tab === 'liuyao' ? field('六爻（可空）', h('input', {
          className: 'mp-input', placeholder: '空则随机，如 9 7 8 8 7 6', value: lines,
          onChange: (e) => setLines(e.target.value),
        })) : null,
        tab === 'meihua' ? field('起卦方式', h('div', { className: 'mp-seg' },
          h('button', { className: mhMode === 'time' ? 'on' : '', onClick: () => switchMode('time') }, '时间'),
          h('button', { className: mhMode === 'number' ? 'on' : '', onClick: () => switchMode('number') }, '数字'))) : null,
        (tab === 'meihua' && mhMode === 'number') ? field('第一个数', h('input', {
          className: 'mp-input', value: upper, placeholder: '如 17',
          onChange: (e) => setUpper(e.target.value),
        })) : null,
        (tab === 'meihua' && mhMode === 'number') ? field('第二个数', h('input', {
          className: 'mp-input', value: lower, placeholder: '如 29',
          onChange: (e) => setLower(e.target.value),
        })) : null,
        (tab === 'meihua' && mhMode === 'number') ? field('动爻（可空）', h('input', {
          className: 'mp-input', value: changing, placeholder: '1-6',
          onChange: (e) => setChanging(e.target.value),
        })) : null,
      ),
      isBirth ? h('div', { className: 'mp-checks' },
        h('label', { title: '按出生地经度把钟表时间换算成真太阳时' },
          h('input', { type: 'checkbox', checked: trueSolar, onChange: (e) => setTrueSolar(e.target.checked) }), '真太阳时'),
        h('label', { title: '开启后会请求 OpenStreetMap，把区县/村落到更精确的坐标' },
          h('input', { type: 'checkbox', checked: onlineGeo, onChange: (e) => setOnlineGeo(e.target.checked) }), '联网精确到区县')) : null,
      needAsk(tab) ? h('div', { className: 'mp-askblock' },
        h('span', { className: 'mp-lbl' }, '所问之事（必填）'),
        h('textarea', {
          className: 'mp-textarea' + (askInvalid ? ' invalid' : ''),
          rows: 2, value: question,
          placeholder: '用一句话描述所问之事，例如：今年是否适合换工作？',
          onChange: (e) => { setQuestion(e.target.value); setAskInvalid(false); },
          onBlur: (e) => refreshInterpret(undefined, e.target.value),
        })) : null,
      h('div', { key: 'actions', className: 'mp-actions' },
        h('button', { className: 'mp-btn', onClick: go, title: '时间仍为自动时，点它会取当下再起卦' },
          tab === 'tarot' ? '抽牌' : tab === 'bazi' || tab === 'ziwei' ? '排盘' : tab === 'hepan' ? '合盘' : '起卦'))),

    h('div', { key: 'hint', className: 'mp-hint' }, meta.hint),

    hist.length ? h('div', { key: 'hist', className: 'mp-hist' },
      h('div', { className: 'mp-hist-h' },
        h('span', null, '最近排过'),
        h('button', { className: 'mp-hist-clear', onClick: clearHist }, '清空')),
      h('div', { className: 'mp-hist-list' }, hist.map((x, i) =>
        h('button', {
          key: i, className: 'mp-hist-item', title: `${x.date} ${x.time}`,
          onClick: () => replay(x),
        },
          h('b', null, (TABS.find((t) => t.k === x.kind) || {}).label || x.kind),
          h('span', null, x.label || '—'),
          h('i', null, `${x.date.slice(5)} ${x.time}`))))) : null,

    (timeKind === 'cast' && usesTimeInput) ? h('div', { key: 'auto', className: 'mp-auto' },
      manual.cast
        ? `起卦时刻用的是你手动填的（${time}）；想跟随当下，把时间改回或清空即可。`
        : `起卦时刻已自动取本机时间（${time}），每次点起卦都会重新取当下；想固定时刻就在上面改。`) : null,

    error ? h('div', { key: 'err', className: 'mp-err', role: 'alert' }, error) : null,
    notice ? h('div', { key: 'ntc', className: 'mp-note', role: 'status' }, notice) : null,

    (!result && !error) ? h('div', { key: 'empty', className: 'mp-empty' },
      h('b', null, tab === 'ziwei' ? '填好出生信息，点「排盘」' : tab === 'bazi' ? '填好出生信息，点「排盘」'
        : tab === 'tarot' ? '写下想问的事，点「抽牌」' : '写下所问之事，点「起卦」'),
      tab === 'ziwei' || tab === 'bazi' ? '出生日期、时刻与性别即可；出生地只影响真太阳时。' : '起卦时刻已自动取当下，也可以手动改。') : null,

    result ? h('div', {
      key: 'card',
      className: 'mp-card mp-flat',
      role: 'region',
      'aria-label': '排盘结果',
      'aria-live': 'polite',
      onClick: onFoldClick,
      dangerouslySetInnerHTML: {
        __html: castAtHTML(result) + PP.resultWithInterpret(
          result.kind === 'ziwei' ? PP.ziweiHTML(result.r)
            : result.kind === 'bazi' ? PP.baziHTML(result.r)
              : result.kind === 'meihua' ? PP.meihuaHTML(result.r)
                : result.kind === 'daliuren' ? PP.daliurenHTML(result.r)
                  : result.kind === 'hepan' ? (result.r.chart === 'ziwei' ? PP.ziweiHepanHTML(result.r) : PP.hepanHTML(result.r))
                  : result.kind === 'tarot' ? PP.tarotHTML(result.r)
                    : PP.liuyaoHTML(result.r),
          result.it,
          { folded: defaultFolded() },
        ),
      },
    }) : null,

    result ? h('div', { key: 'bar', className: 'mp-bar' },
      h('button', { className: 'mp-btn ghost', style: { fontSize: 12, padding: '5px 12px' }, onClick: copyResult },
        copied || '复制文字结果')) : null,

    (!result && !error) ? h('div', { key: 'ph', className: 'mp-dim', style: { marginTop: 24, fontSize: 12 } },
      '选择体系后点「排盘」。所有计算在本机完成，不上传任何数据。') : null,
  ];

  return h('div', { className: 'mp-wrap' }, children);
}

function injectStyle(css) {
  try {
    if (typeof styles !== 'undefined' && styles && typeof styles.insert === 'function') {
      return styles.insert(css);
    }
  } catch (e) {
    console.error('[metaphysics] styles.insert 不可用，改用 DOM 注入', e);
  }
  try {
    const el = document.createElement('style');
    el.setAttribute('data-plugin', '@local/metaphysics');
    el.textContent = css;
    document.head.appendChild(el);
    return () => el.remove();
  } catch (e) {
    console.error('[metaphysics] DOM 注入样式也失败', e);
    return () => {};
  }
}

function safeApply(ctx) {
  try {
    const dispose = injectStyle(CSS + (PP && PP.CSS ? PP.CSS : ''));
    if (typeof ctx.effect === 'function' && typeof dispose === 'function') ctx.effect(() => dispose);
  } catch (e) {
    console.error('[metaphysics] 样式注入失败', e);
  }

  let slots = null;
  try {
    slots = (ctx && ctx.slots) || (ctx && typeof ctx.get === 'function' ? ctx.get('slots') : null);
  } catch (e) {
    console.error('[metaphysics] 取 slots 服务失败', e);
  }
  if (!slots || typeof slots.register !== 'function') {
    console.error('[metaphysics] slots 服务不可用，面板未注册');
    return;
  }

  const waitFor = (key, install) => {
    try {
      if (typeof slots.inject === 'function') {
        slots.inject(key, install);
      } else {
        install();
      }
    } catch (e) {
      console.error('[metaphysics] 等待槽位失败：' + key, e);
      try { install(); } catch (e2) { console.error('[metaphysics] 直接注册也失败：' + key, e2); }
    }
  };

  waitFor('sidebar.panellist', () => slots.register(
    { name: 'sidebar.panellist', id: 'metaphysics', order: 20, label: () => '命理' },
    PanelIcon,
  ));

  waitFor('main', () => slots.register({ name: 'main', key: 'metaphysics' }, App));
}

return {
  inject: ['slots'],
  apply(ctx) {
    try {
      safeApply(ctx);
    } catch (e) {
      console.error('[metaphysics] apply 异常', e);
    }
  },
};

  },
});
