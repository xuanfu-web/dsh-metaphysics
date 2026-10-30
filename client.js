window.__ModuleLoader__.load({
  id: 'dsh-metaphysics',
  version: '0.46.5',
  factory(require) {
    const React = (function () {
      try { return require('react'); } catch (e) { return globalThis.React; }
    })();
    if (!React) return { inject: [], apply() {} };
    const h = React.createElement;
    const __mods = {};
__mods.fail = (function () {

const fail = (code, message) => {
  const e = new Error(message);
  e.code = code;
  return e;
};

return { fail };
})();

__mods.validate = (function () {
const { fail } = __mods.fail;

const MIN_YEAR = 1600;
const MAX_YEAR = 2400;

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function daysInMonth(year, month) {
  if (month === 2) return isLeapYear(year) ? 29 : 28;
  return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1] || 0;
}

const show = (v) => (typeof v === 'string' ? `「${v}」` : String(v));
const HINT = '引擎只接受解析好的公历字段 { year, month, day, hour?, minute? }；字符串请先交给宿主层的 parseDateTime 解析';

function assertCivil(input, who = '') {
  const p = who ? `${who} 的` : '';
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    const got = input === null ? 'null' : Array.isArray(input) ? '数组' : typeof input;
    throw fail('E_INPUT', `${p}入参必须是对象（收到 ${got}）；${HINT}`);
  }
  const hour = input.hour === undefined ? 0 : input.hour;
  const minute = input.minute === undefined ? 0 : input.minute;
  for (const [key, value] of [['year', input.year], ['month', input.month], ['day', input.day], ['hour', hour], ['minute', minute]]) {
    if (!Number.isInteger(value)) throw fail('E_INPUT', `${p}${key} 必须是整数（收到 ${show(value)}）；${HINT}`);
  }
  if (input.year < MIN_YEAR || input.year > MAX_YEAR) {
    throw fail('E_INPUT', `${p}year 超出支持范围 ${MIN_YEAR}–${MAX_YEAR}（收到 ${input.year}）；更早的年份时区与历法口径不可靠`);
  }
  if (input.month < 1 || input.month > 12) {
    throw fail('E_INPUT', `${p}month 超出范围 1–12（收到 ${input.month}）`);
  }
  const max = daysInMonth(input.year, input.month);
  if (input.day < 1 || input.day > max) {
    throw fail('E_INPUT', `${p}日期不存在：${input.year}-${input.month}-${input.day}（${input.year} 年 ${input.month} 月只有 ${max} 天）`);
  }
  if (hour < 0 || hour > 23) throw fail('E_INPUT', `${p}hour 超出范围 0–23（收到 ${hour}）`);
  if (minute < 0 || minute > 59) throw fail('E_INPUT', `${p}minute 超出范围 0–59（收到 ${minute}）`);
  return input;
}

return { MIN_YEAR, MAX_YEAR, isLeapYear, daysInMonth, assertCivil };
})();

__mods.lru = (function () {

function createLru({ max = 64, ttlMs = 0, name = 'lru', now = () => Date.now() } = {}) {
  const map = new Map();
  const stats = { name, hits: 0, misses: 0, evictions: 0, expirations: 0 };

  const expired = (entry) => ttlMs > 0 && now() - entry.at > ttlMs;

  return {
    name,
    max,
    ttlMs,
    get(key) {
      const entry = map.get(key);
      if (!entry || expired(entry)) {
        if (entry) { map.delete(key); stats.expirations += 1; }
        stats.misses += 1;
        return undefined;
      }
      map.delete(key);
      map.set(key, entry);
      stats.hits += 1;
      return entry.value;
    },
    set(key, value) {
      if (map.has(key)) map.delete(key);
      map.set(key, { value, at: now() });
      while (map.size > max) {
        map.delete(map.keys().next().value);
        stats.evictions += 1;
      }
      return value;
    },
    has(key) {
      const entry = map.get(key);
      if (!entry) return false;
      if (expired(entry)) { map.delete(key); stats.expirations += 1; return false; }
      return true;
    },
    delete(key) { return map.delete(key); },
    clear() { map.clear(); },
    get size() { return map.size; },
    stats() {
      const total = stats.hits + stats.misses;
      return {
        name,
        size: map.size,
        max,
        hits: stats.hits,
        misses: stats.misses,
        evictions: stats.evictions,
        expirations: stats.expirations,
        hitRate: total ? stats.hits / total : 0,
      };
    },
  };
}

return { createLru };
})();

__mods.nayin = (function () {

const NAYIN_NAMES = [
  '海中金', '炉中火', '大林木', '路旁土', '剑锋金',
  '山头火', '涧下水', '城头土', '白蜡金', '杨柳木',
  '泉中水', '屋上土', '霹雳火', '松柏木', '长流水',
  '沙中金', '山下火', '平地木', '壁上土', '金箔金',
  '覆灯火', '天河水', '大驿土', '钗钏金', '桑柘木',
  '大溪水', '沙中土', '天上火', '石榴木', '大海水',
];

function nayinOf(ganzhiIdx) {
  const i = ((Number(ganzhiIdx) % 60) + 60) % 60;
  const name = NAYIN_NAMES[Math.floor(i / 2)];
  return { name, element: name[2] };
}

return { NAYIN_NAMES, nayinOf };
})();

__mods.sanhe = (function () {

const SANHE_GROUPS = [
  { branches: ['申', '子', '辰'], element: '水' },
  { branches: ['亥', '卯', '未'], element: '木' },
  { branches: ['寅', '午', '戌'], element: '火' },
  { branches: ['巳', '酉', '丑'], element: '金' },
];

const SANHE = Object.fromEntries(SANHE_GROUPS.map((g) => [g.branches.join(''), g.element]));

const SANHE_ELEMENT = Object.fromEntries(
  SANHE_GROUPS.flatMap((g) => g.branches.map((b) => [b, g.element])),
);

function sanheGroupOf(branch) {
  return SANHE_GROUPS.find((g) => g.branches.includes(branch)) || null;
}

return { SANHE_GROUPS, SANHE, SANHE_ELEMENT, sanheGroupOf };
})();

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
const { createLru } = __mods.lru;

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

const TERM_INSTANT_CACHE = createLru({ max: 4096, name: 'termInstant' });

const TERM_CONVERGE_DEG = 1e-5;

const TERM_GUESS_CACHE = new Map();
const TROPICAL_YEAR = 365.2422;

function computeTermInstantJd(year, index) {
  const target = termLongitude(index);
  const anchor = toJDN(year, 1, 5) - 0.5 + index * 15.2184;
  const prev = TERM_GUESS_CACHE.get(index);
  let jd = prev !== undefined ? prev + TROPICAL_YEAR : anchor;
  if (Math.abs(jd - anchor) > 20) jd = anchor;
  for (let n = 0; n < 12; n++) {
    let diff = target - sunLongitude(jd);
    diff = ((((diff + 180) % 360) + 360) % 360) - 180;
    jd += diff / 0.98564736;
    if (Math.abs(diff) < TERM_CONVERGE_DEG) break;
  }
  TERM_GUESS_CACHE.set(index, jd);
  const jdUt = jd - deltaTSeconds(year) / 86400;
  return jdUt + localOffsetFor(jdUt);
}

function termInstantJd(year, index) {
  const key = year * 24 + index;
  const hit = TERM_INSTANT_CACHE.get(key);
  if (hit !== undefined) return hit;
  const jd = computeTermInstantJd(year, index);
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

const TERM_WINDOW_CACHE = createLru({ max: 8, name: 'termWindow' });
const TERM_YEAR_CACHE = createLru({ max: 32, name: 'termYear' });
const ALL_TERM_INDEXES = Array.from({ length: 24 }, (_, i) => i);
const JIE_TERM_INDEXES = ALL_TERM_INDEXES.filter((i) => i % 2 === 0);

function termYearList(year, jieOnly) {
  const key = jieOnly ? `${year}|jie` : `${year}|all`;
  const hit = TERM_YEAR_CACHE.get(key);
  if (hit) return hit;
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

function termWindow(year, opts = {}) {
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

function xunKongOf(ganzhi) {
  if (typeof ganzhi !== 'string' || ganzhi.length < 2) return [];
  const s = STEMS.indexOf(ganzhi[0]);
  const b = BRANCHES.indexOf(ganzhi[1]);
  if (s < 0 || b < 0) return [];
  const idx = sexagenaryIndex(s, b);
  if (idx < 0) return [];
  const head = Math.floor(idx / 10) * 10;
  return [BRANCHES[(head + 10) % 12], BRANCHES[(head + 11) % 12]];
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

function cacheMetrics() {
  return [TERM_INSTANT_CACHE.stats(), TERM_YEAR_CACHE.stats(), TERM_WINDOW_CACHE.stats()];
}

return { STEMS, BRANCHES, TERM_NAMES, termLongitude, toJDN, fromJDN, sexagenaryIndex, ganzhiName, dayGanzhiIndex, sunLongitude, deltaTSeconds, OFFSET_MODERN, OFFSET_BEIJING_LOCAL, CUTOVER_JD, localOffsetFor, termInstantJd, jdToParts, partsToJd, equationOfTime, termWindow, xunKongOf, previousJie, nextJie, formatJd, cacheMetrics };
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

const USER_AGENT = 'dsh-metaphysics/0.23.0 (+https://github.com/xuanfu-web/dsh-metaphysics)';

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

__mods.dst = (function () {
const { daysInMonth } = __mods.validate;

const DST_SPANS = {
  1986: ['1986-05-04', '1986-09-14'],
  1987: ['1987-04-12', '1987-09-13'],
  1988: ['1988-04-10', '1988-09-11'],
  1989: ['1989-04-16', '1989-09-17'],
  1990: ['1990-04-15', '1990-09-16'],
  1991: ['1991-04-14', '1991-09-15'],
};

const ORD = (y, m, d) => y * 10000 + m * 100 + d;

function inDstSpan(t) {
  const span = DST_SPANS[t.year];
  if (!span) return false;
  const [sy, sm, sd] = span[0].split('-').map(Number);
  const [ey, em, ed] = span[1].split('-').map(Number);
  const n = ORD(t.year, t.month, t.day);
  if (n < ORD(sy, sm, sd) || n > ORD(ey, em, ed)) return false;
  const minutes = t.hour * 60 + (t.minute || 0);
  if (n === ORD(sy, sm, sd) && minutes < 120) return false;
  if (n === ORD(ey, em, ed) && minutes >= 120) return false;
  return true;
}

function applyDst(t) {
  const minute = t.minute || 0;
  if (!inDstSpan(t)) return { year: t.year, month: t.month, day: t.day, hour: t.hour, minute, applied: false, note: null };
  let { year, month, day, hour } = t;
  hour -= 1;
  if (hour < 0) {
    hour += 24;
    day -= 1;
    if (day < 1) {
      month -= 1;
      if (month < 1) { month = 12; year -= 1; }
      day = daysInMonth(year, month);
    }
  }
  return {
    year, month, day, hour, minute,
    applied: true,
    note: `检出自 ${DST_SPANS[t.year][0]} 至 ${DST_SPANS[t.year][1]} 的中国夏令时：出生钟面时间已减 1 小时校正`,
  };
}

function withDstNote(notes, dst) {
  const out = Array.isArray(notes) ? notes.slice() : [];
  if (dst && dst.applied && dst.note) out.push(dst.note);
  return out;
}

return { DST_SPANS, inDstSpan, applyDst, withDstNote };
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

__mods.tiaohou = (function () {

const STEM_ELEMENT = {
  甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土',
  己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水',
};

const SEASON_TEMP = {
  亥: -1.8, 子: -2, 丑: -1.5,
  寅: -0.4, 卯: 0.2, 辰: 0.5,
  巳: 1.3, 午: 2, 未: 1.5,
  申: 0.6, 酉: 0.2, 戌: -0.2,
};

const SEASON_NAME = {
  亥: '初冬', 子: '仲冬', 丑: '季冬',
  寅: '初春', 卯: '仲春', 辰: '季春',
  巳: '初夏', 午: '仲夏', 未: '季夏',
  申: '初秋', 酉: '仲秋', 戌: '季秋',
};

const WET_BRANCH = { 丑: 1, 辰: 1, 子: 0.6, 亥: 0.5 };
const DRY_BRANCH = { 未: 1, 戌: 1, 午: 0.4, 巳: 0.4 };

const NEED = {
  寒湿: { element: '火', stem: '丙', avoid: '水', why: '冻土要太阳来解，水再多只会更冷' },
  寒燥: { element: '火', stem: '丙', avoid: '水', why: '天寒地干，先要一点阳和之气' },
  寒: { element: '火', stem: '丙', avoid: '水', why: '冬令气寒，非火不暖' },
  温热: { element: '水', stem: '壬', avoid: '火', why: '火气初旺，得水润泽才好用' },
  燥热: { element: '水', stem: '壬', avoid: '火', why: '火炎土燥，非水不润' },
  热: { element: '水', stem: '壬', avoid: '火', why: '夏令炎威，先求一泓清水' },
  湿滞: { element: '火', stem: '丙', avoid: '水', why: '湿气郁结，要火来蒸腾' },
  燥: { element: '水', stem: '壬', avoid: '火', why: '气燥不润，得水则舒' },
  平和: { element: null, stem: null, avoid: null, why: '寒暖相济，气候不是这一盘的主要矛盾' },
};

const KIND_NAME = {
  寒湿: '寒湿', 寒燥: '寒燥', 寒: '寒',
  温热: '温热', 燥热: '燥热', 热: '热',
  湿滞: '湿滞', 燥: '燥', 平和: '平和',
};

const DAY_FEEL = {
  寒湿: {
    木: '木是花草藤萝，冰封的土里抽不出芽——它不缺雨水，缺的是一轮太阳',
    火: '火在冬天最怕被水浇，一点火苗要护住，才谈得上发光',
    土: '土冻成一块，再厚也长不出东西，得先晒透',
    金: '金在寒水里泡久了，锋刃会发滞，要火来炼一炼',
    水: '水本就冷，再加寒就是死水；要火把它烧活',
  },
  寒燥: {
    木: '木在干冷里最难熬，既缺暖气，又缺一点滋润',
    火: '火在寒天里要先活下来，才有余力照别人',
    土: '土冷而干，板结着，得暖气与一点水汽一起松',
    金: '金寒则脆，得火炼、得土养，才成器',
    水: '水在寒天里收得太紧，要一点火气化开',
  },
  寒: {
    木: '冬木先要暖，暖了才谈得上发荣',
    火: '火在冬天要护住，别被冷风吹散',
    土: '土寒不生物，先暖后养',
    金: '金寒则钝，得火则利',
    水: '水寒则滞，得火则行',
  },
  温热: {
    木: '木在暖和里长得快，但要防长得太急、根扎不深',
    火: '火得时令，容易旺过头，要留一点水来收',
    土: '土被火烤着，容易燥，得水润一润',
    金: '金在暖处容易软，需要一点水土把它养住',
    水: '水在暖处容易蒸干，要源头不断',
  },
  燥热: {
    木: '木被火烤着，叶子先焦，得先补水',
    火: '火已经够旺了，再添柴只会烧到自己',
    土: '土燥则裂，得水润、得木疏',
    金: '金在燥热里容易发烫变形，要水来淬',
    水: '水在燥热里最珍贵，一滴都不能浪费',
  },
  热: {
    木: '木在暑天要水，不然只长叶不结果',
    火: '火已经当令，收着用比放出去更划算',
    土: '土热则燥，得水则安',
    金: '金在暑天要水来洗，才见光泽',
    水: '水在暑天是命脉，要保住源头',
  },
  湿滞: {
    木: '木泡在水里会烂根，先要疏土透气',
    火: '火在湿气里点不着，得先除湿',
    土: '土湿成泥，得火蒸腾、得木来疏',
    金: '金埋在湿土里会生锈，要见火见光',
    水: '水已经太多，再添就是泛滥',
  },
  燥: {
    木: '木在燥气里容易枯，先要一点水',
    火: '火在燥处容易失控，要收',
    土: '土燥不毛，得水润、得木疏',
    金: '金在燥处要水来洗，才不刺手',
    水: '水在燥处最容易被耗干，要护住',
  },
  平和: {
    木: '寒暖还算相济，木有生长的余地',
    火: '气候不偏，火可以按自己的节奏用',
    土: '土不燥不湿，能养也能载',
    金: '金不寒不燥，成器只差打磨',
    水: '水不冰不涸，能流得动',
  },
};

const round2 = (n) => Math.round(n * 100) / 100;

function judgeClimate({ monthBranch, dayStem, wuxing = {}, branches = [] }) {
  const fire = Number(wuxing['火'] || 0);
  const water = Number(wuxing['水'] || 0);
  let wet = 0;
  let dry = 0;
  let wetCount = 0;
  let dryCount = 0;
  for (const b of branches) {
    if (WET_BRANCH[b]) { wet += WET_BRANCH[b]; if (b === '丑' || b === '辰') wetCount += 1; }
    if (DRY_BRANCH[b]) { dry += DRY_BRANCH[b]; if (b === '未' || b === '戌') dryCount += 1; }
  }
  const seasonT = SEASON_TEMP[monthBranch] ?? 0;
  const temp = round2(seasonT + 0.45 * fire - 0.4 * water);
  const damp = round2(wet - dry + 0.25 * water - 0.25 * fire);

  const cold = temp <= -0.8;
  const hot = temp >= 0.9;
  const wetSide = damp >= 0.8;
  const drySide = damp <= -0.8;

  let kind = '平和';
  if (cold && wetSide) kind = '寒湿';
  else if (cold && drySide) kind = '寒燥';
  else if (cold) kind = '寒';
  else if (hot && drySide) kind = '燥热';
  else if (hot) kind = '温热';
  else if (hot && damp >= 0.8) kind = '湿滞';
  else if (drySide) kind = '燥';
  else if (wetSide) kind = '湿滞';

  const need = NEED[kind] || NEED.平和;
  const dayElement = STEM_ELEMENT[dayStem] || '土';
  const evidence = [
    `${SEASON_NAME[monthBranch] || monthBranch}${monthBranch}月`,
    `火${fire}`,
    `水${water}`,
    wetCount ? `湿土${wetCount}处` : '',
    dryCount ? `燥土${dryCount}处` : '',
  ].filter(Boolean);

  const priority = Math.abs(temp) >= 1.2 || Math.abs(damp) >= 1.2 ? '调候优先' : '扶抑为主';
  const narration = buildNarration({ kind, monthBranch, dayElement, need, temp, damp, fire, water });

  return {
    kind,
    label: KIND_NAME[kind] || kind,
    temp,
    damp,
    cold,
    hot,
    wet: wetSide,
    dry: drySide,
    need: need.element ? { element: need.element, stem: need.stem, why: need.why } : null,
    avoidElement: need.avoid,
    dayElement,
    priority,
    evidence,
    narration,
  };
}

function buildNarration({ kind, monthBranch, dayElement, need, fire, water }) {
  const feel = (DAY_FEEL[kind] || DAY_FEEL.平和)[dayElement] || '';
  const season = SEASON_NAME[monthBranch] || '';
  const head = `${season ? season : ''}${monthBranch}月出生，全局火${fire}、水${water}，这一盘的气候是「${KIND_NAME[kind] || kind}」`;
  if (!need.element) {
    return `${head}。${feel}。调候不是这一盘的主要矛盾，取用仍以扶抑为主，寒暖只作微调。`;
  }
  return `${head}。${feel}。所以这一局要的不是更多的${kind.includes('寒') ? '水' : '火'}，而是${need.stem}${need.element}——${need.why}。`;
}

function arbitrate(climate, favors = [], avoids = []) {
  if (!climate || !climate.need) return { clash: false, text: '气候平和，按扶抑取用即可。' };
  const needEl = climate.need.element;
  const inFavor = favors.includes(needEl);
  const inAvoid = avoids.includes(needEl);
  const same = inFavor && !inAvoid;
  if (same) return { clash: false, text: `调候要${climate.need.stem}${needEl}，扶抑也以${needEl}为喜——两套取法同向，不必取舍。` };
  return {
    clash: true,
    text: `调候要${climate.need.stem}${needEl}，扶抑却把${needEl}列为${inAvoid ? '忌' : '闲'}；两者不一致，本盘按调候优先取${needEl}，扶抑次之——因为寒暖失衡时，再补强弱也难受。`,
  };
}

function climateText(climate) {
  if (!climate) return '';
  const ev = (climate.evidence || []).join('、');
  const arb = climate.need
    ? `调候取${climate.need.stem}${climate.need.element}（${climate.need.why}），忌${climate.avoidElement}。`
    : '气候平和，调候不作主取。';
  return `${climate.label}（${ev}）。${climate.narration}${arb}${climate.priority === '调候优先' ? ' 本盘调候优先于扶抑。' : ''}`;
}

return { judgeClimate, arbitrate, climateText };
})();

__mods.qiongtong = (function () {

const QT_BRANCHES = ["寅","卯","辰","巳","午","未","申","酉","戌","亥","子","丑"];
const QT_MONTHS = ["正月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
const QT_BASE_URL = 'https://www.luckclub.cn/bazi/004/';
const QT_NOTE = '用神顺序据通行整理表，原文摘句照录；各版本有异文，按条目 note 标注待核处。';

const QT = {
  "甲": [
    {
      "b": "寅",
      "m": "正月",
      "y": "丙癸",
      "q": "正月甲木，初春尚有余寒，得丙癸逢，富贵双全。癸藏丙透，名寒木向阳，主大富贵。倘风水不及，亦不失儒林俊秀。如无丙癸，平常人也。",
      "ch": 2,
      "qs": "丙癸"
    },
    {
      "b": "卯",
      "m": "二月",
      "y": "庚丙丁戊己",
      "q": "或二月甲木，庚金得所者，名阳刃架煞，可许异途小贵，若武职便显，但要财资煞，柱中逢财，英雄独压万人，若见癸水，困了财杀，主为光棍，重刃必定遭凶，煞重无凶，但性格横暴，正二月甲木，无从财化土之格。",
      "ch": 3,
      "qs": "庚癸"
    },
    {
      "b": "辰",
      "m": "三月",
      "y": "庚丁壬",
      "q": "三月甲木，木气相竭。先取庚金，次用壬水。",
      "ch": 4,
      "qs": "庚壬"
    },
    {
      "b": "巳",
      "m": "四月",
      "y": "癸丁庚",
      "q": "四月甲木退气，丙火司权，先癸后丁。",
      "ch": 5,
      "qs": "丙癸丁"
    },
    {
      "b": "午",
      "m": "五月",
      "y": "癸丁庚",
      "q": "五六月甲木,木性虚焦，一理共推，五月先癸后丁，庚金次之。，或五月乏癸，用丁亦可，要运行地为佳。六月三伏生寒，丁火退气。先丁后庚，无癸亦可。",
      "ch": 6,
      "qs": "癸丁庚"
    },
    {
      "b": "未",
      "m": "六月",
      "y": "丁庚癸",
      "q": "五六月甲木,木性虚焦，一理共推，五月先癸后丁，庚金次之。，或五月乏癸，用丁亦可，要运行地为佳。六月三伏生寒，丁火退气。先丁后庚，无癸亦可。",
      "ch": 6,
      "qs": "癸丁庚"
    },
    {
      "b": "申",
      "m": "七月",
      "y": "庚丁壬",
      "q": "七月甲堪为戟，然非丁不能造庚，非庚不能造甲，丁庚两透，科甲可许。",
      "ch": 7,
      "qs": "丁庚"
    },
    {
      "b": "酉",
      "m": "八月",
      "y": "丁丙庚",
      "q": "八月甲木，木囚金旺。丁火为先，次用丙火，庚金再次。",
      "ch": 8,
      "qs": "丁丙庚"
    },
    {
      "b": "戌",
      "m": "九月",
      "y": "庚甲丁壬癸",
      "q": "九月甲木，木星凋零，独爱丁火壬癸滋扶。",
      "ch": 9,
      "qs": "丁壬癸"
    },
    {
      "b": "亥",
      "m": "十月",
      "y": "庚丁丙戊",
      "q": "十月甲木，以庚为君，以丁为佐，丙火次之，忌壬水泛木，须戊土为制，故戊又次之。",
      "ch": 10,
      "qs": "庚丁丙壬戊"
    },
    {
      "b": "子",
      "m": "十一月",
      "y": "丁庚丙",
      "q": "十一月甲木，木性生寒，丁先庚后，丙火佐之，癸水司权，为火金之病。",
      "ch": 11,
      "qs": "丁庚丙癸"
    },
    {
      "b": "丑",
      "m": "十二月",
      "y": "丁庚丙",
      "q": "十二月甲木，天寒气冻，木性极寒，无发生之象。先用庚劈甲，方引丁火，始得木火有通明之象，故丁次之。",
      "ch": 12,
      "qs": "庚丁"
    }
  ],
  "乙": [
    {
      "b": "寅",
      "m": "正月",
      "y": "丙癸",
      "q": "正月天气，犹有余寒，非丙不长，虽有癸润，恐凝寒气，故先用丙，癸次之。",
      "ch": 13,
      "qs": "丙癸"
    },
    {
      "b": "卯",
      "m": "二月",
      "y": "丙癸",
      "q": "二月乙木，阳气渐升，木不寒矣，以丙为君，癸为臣，丙癸两透，不透庚金，大富大贵。",
      "ch": 14,
      "qs": "丙癸庚"
    },
    {
      "b": "辰",
      "m": "三月",
      "y": "癸丙戊",
      "q": "三月乙木，阳气愈炽，先癸后丙",
      "ch": 15,
      "qs": "癸丙"
    },
    {
      "b": "巳",
      "m": "四月",
      "y": "癸",
      "q": "四月乙木，巳宫自有丙火，戊取癸水为尊。四月乙木,专用癸水,丙火酌用,虽以庚辛佐癸,须辛透为清。",
      "ch": 16,
      "qs": "丙戊癸庚辛"
    },
    {
      "b": "午",
      "m": "五月",
      "y": "癸丙",
      "q": "五月乙木，丁火司权，禾稼俱旱。上半月属阳，先癸次丙；下半月属阴，三伏生寒，丙癸齐用。柱多金水，丙火为先，余皆用癸水为先。",
      "ch": 17,
      "qs": "丁癸丙"
    },
    {
      "b": "未",
      "m": "六月",
      "y": "癸丙",
      "q": "六月乙木，木性且寒，柱多金水，丙火为尊。支成水局，乙得无伤。癸水透干，大富大贵。无癸定作常人，运不行北，困苦一生。",
      "ch": 18,
      "qs": "丙癸"
    },
    {
      "b": "申",
      "m": "七月",
      "y": "丙癸己",
      "q": "七月乙木，庚金乘令，庚虽输情于乙妹，怎奈干乙难合支庚。柱见庚多，乙难受载。或丙癸透干，又加己出埋金，丙癸己俱透，此格可云科甲，大富大贵",
      "ch": 19,
      "qs": "庚丙癸己甲"
    },
    {
      "b": "酉",
      "m": "八月",
      "y": "癸丙丁",
      "q": "八月乙木，芝兰禾稼均退，以丹桂为乙木。在白露之后，桂蕊未开，专用癸水，以滋桂萼。若秋分后，桂花已开，又当向阳，宜先用丙，癸水次之，丙癸两透，科甲名臣。",
      "ch": 20,
      "qs": "癸丙甲"
    },
    {
      "b": "戌",
      "m": "九月",
      "y": "癸辛",
      "q": "九月乙木，枝枯叶落，必赖癸水滋养。如见甲申时，名为藤萝繁甲，可秋可冬。",
      "ch": 21,
      "qs": "癸甲"
    },
    {
      "b": "亥",
      "m": "十月",
      "y": "丙戊",
      "q": "十月乙木，丙不受气，壬水司令，丙为尊，或壬多，用戊土。",
      "ch": 22,
      "qs": "丙壬戊"
    },
    {
      "b": "子",
      "m": "十一月",
      "y": "丙",
      "q": "十一月乙木，根叶寒冻，喜丙复一阳，用丙火解冻，斯花木有向阳之意，不宜癸水出干以冻花木，故专用丙火。",
      "ch": 23,
      "qs": "丙癸"
    },
    {
      "b": "丑",
      "m": "十二月",
      "y": "丙",
      "q": "十二月乙木，木寒宜丙，有寒谷回春之象。得一丙透，无癸出破格，不特科甲，定主名臣显宦。丙火藏支，不过廪贡生员。干支无丙，一介寒儒。",
      "ch": 24,
      "qs": "丙癸甲"
    }
  ],
  "丙": [
    {
      "b": "寅",
      "m": "正月",
      "y": "壬庚",
      "q": "正月三阳开泰，火气渐炎，取壬为尊，庚金为佐。壬庚两透，定许科甲，即壬透庚藏，虽不由科甲，恰有异途恩封",
      "ch": 25,
      "qs": "壬庚甲"
    },
    {
      "b": "卯",
      "m": "二月",
      "y": "壬己",
      "q": "二月丙火，阳气舒升，专用壬水。",
      "ch": 26,
      "qs": "壬"
    },
    {
      "b": "辰",
      "m": "三月",
      "y": "壬甲",
      "q": "三月火气渐炎，专用壬水，或支成土局，取甲为辅，壬不可离。",
      "ch": 27,
      "qs": "壬甲"
    },
    {
      "b": "巳",
      "m": "四月",
      "y": "壬癸庚",
      "q": "四月丙火，建禄于巳，火势炎炎，宜专用壬水，解炎威之力，成既济之功。如无壬水，名孤阳失辅，难透清光，得庚发水源，方为有根之水。壬庚两透，不见戊己出干，号曰湖海汪洋，广映太阳，光辉显著，文明之象。",
      "ch": 28,
      "qs": "壬庚戊己"
    },
    {
      "b": "午",
      "m": "五月",
      "y": "壬庚",
      "q": "五月丙火愈炎，得壬庚高透，方为上命。或一壬无庚，亦主贡监，还须好运。犹防戊己出干，丁壬化合，则为平人。即不透庚壬。或有申宫长生之水，济之坐禄之金，至妙，必入词林。又怕戊己杂乱，则为异路。",
      "ch": 29,
      "qs": "壬庚戊己丁"
    },
    {
      "b": "未",
      "m": "六月",
      "y": "壬庚",
      "q": "六月丙火退气，三伏生寒，己土泄气，壬水为用，取庚辅佐。",
      "ch": 30,
      "qs": "己壬庚"
    },
    {
      "b": "申",
      "m": "七月",
      "y": "壬戊",
      "q": "七月丙火，太阳转西，阳气渐衰。日近西山，见土皆晦。惟日照湖海，暮夜光天，故仍用壬水，辅映太阳光辉。",
      "ch": 31,
      "qs": "壬"
    },
    {
      "b": "酉",
      "m": "八月",
      "y": "壬癸",
      "q": "八月丙火，日近黄昏，丙有余光，存于湖海，仍用壬水辅映。",
      "ch": 32,
      "qs": "壬"
    },
    {
      "b": "戌",
      "m": "九月",
      "y": "甲壬",
      "q": "九月丙火，火气愈退，忌土晦光，必须先用甲木，次取壬水。",
      "ch": 33,
      "qs": "甲壬"
    },
    {
      "b": "亥",
      "m": "十月",
      "y": "甲戊庚壬",
      "q": "十月丙火，太阳失令，得见甲戊庚齐透，科甲有准，风土不及，终成选拔，主为人性好清高，斯文领袖。",
      "ch": 34,
      "qs": "甲戊庚"
    },
    {
      "b": "子",
      "m": "十一月",
      "y": "壬戊己",
      "q": "十一月丙火，冬至一阳生，弱中复强，壬水为最，戊土佐之。",
      "ch": 35,
      "qs": "壬戊"
    },
    {
      "b": "丑",
      "m": "十二月",
      "y": "壬甲",
      "q": "十二月丙火，气进二阳，每雪欺霜，喜壬为用，己土司令，土多又不可少甲",
      "ch": 36,
      "qs": "壬己甲"
    }
  ],
  "丁": [
    {
      "b": "寅",
      "m": "正月",
      "y": "甲庚",
      "q": "正月丁火，甲木当权，乃为母旺，非庚不能劈甲，何以引丁，先庚次壬。",
      "ch": 37,
      "qs": "甲庚壬"
    },
    {
      "b": "卯",
      "m": "二月",
      "y": "庚甲",
      "q": "二月丁火，湿乙伤丁，先庚后甲，非庚不能去乙，非甲不能引丁。",
      "ch": 38,
      "qs": "乙庚甲"
    },
    {
      "b": "辰",
      "m": "三月",
      "y": "甲庚",
      "q": "三月丁火，戊土司令，泄弱丁气，先用甲木引丁制土，次看庚金。",
      "ch": 39,
      "qs": "戊甲庚"
    },
    {
      "b": "巳",
      "m": "四月",
      "y": "甲庚",
      "q": "四月丁火乘旺，虽取甲引丁，必须用庚劈甲，有庚伐甲、方云木火通明；甲多、又取庚为先。",
      "ch": 40,
      "qs": "甲庚"
    },
    {
      "b": "午",
      "m": "五月",
      "y": "壬庚癸",
      "q": "五月丁火，时逢建禄，不得轻用甲木；遇干透隔位之壬，不贪丁合，忠而且孝。",
      "ch": 41,
      "qs": "甲壬"
    },
    {
      "b": "未",
      "m": "六月",
      "y": "甲壬庚",
      "q": "六月丁火，阴柔退气，但值三伏生寒，丁弱极矣，专取甲木，壬水次之。",
      "ch": 42,
      "qs": "甲壬"
    },
    {
      "b": "申",
      "m": "七月",
      "y": "甲庚丙戊",
      "q": "七月丁火，退气柔弱，端用甲木，金虽乘旺司权，无伤丁之理，仍取庚劈甲，为引火之物，或借丙暖金晒甲，不虑丙夺丁光，凡两丙夹丁者，夏月忌之，余月不忌，但此格少年困苦刑克中年富贵，必要地支见水制丙，方",
      "ch": 43,
      "qs": "甲庚丙"
    },
    {
      "b": "酉",
      "m": "八月",
      "y": "甲庚丙戊",
      "q": "或八月一派辛金，不见庚金，又无比劫，比弃命从才，富而且贵，虽不科甲，亦有异途，从才者水为妻，不克，有正偏，木为子，不刑。或九月一派戊土，泄丁火之气，不见甲木，为伤官伤尽，非寻常可比，或甲木透出",
      "ch": 44,
      "qs": "辛庚甲戊",
      "note": "原文全章未见「丙」，此格按整理表录入，待以善本核对"
    },
    {
      "b": "戌",
      "m": "九月",
      "y": "甲庚戊",
      "q": "或八月一派辛金，不见庚金，又无比劫，比弃命从才，富而且贵，虽不科甲，亦有异途，从才者水为妻，不克，有正偏，木为子，不刑。或九月一派戊土，泄丁火之气，不见甲木，为伤官伤尽，非寻常可比，或甲木透出",
      "ch": 44,
      "qs": "辛庚甲戊"
    },
    {
      "b": "亥",
      "m": "十月",
      "y": "甲庚",
      "q": "三冬丁火微寒，端用庚甲，甲乃庚之良友，凡用甲木，庚不可少，无庚无甲，何能引丁，难云木火通明，冬丁有甲，不怕水多金多，可称上格，甲庚两透，科甲分明，见己则否，己多合甲，则为常人。或一丙夺丁，必赖",
      "ch": 45,
      "qs": "庚甲己丙"
    },
    {
      "b": "子",
      "m": "十一月",
      "y": "甲庚",
      "q": "或仲冬水多癸旺，金无比印，此作弃命从杀，亦有异途功名，见丁比出干，难合格局，常人，且主骨肉浮云，六亲流水，戊出破癸，颇有兄弟妻儿，此格用戊，火妻土子，用甲，水妻木子。或四柱多丙丁，又用癸制火，",
      "ch": 46,
      "qs": "癸戊甲丙"
    },
    {
      "b": "丑",
      "m": "十二月",
      "y": "甲庚",
      "q": "或仲冬水多癸旺，金无比印，此作弃命从杀，亦有异途功名，见丁比出干，难合格局，常人，且主骨肉浮云，六亲流水，戊出破癸，颇有兄弟妻儿，此格用戊，火妻土子，用甲，水妻木子。或四柱多丙丁，又用癸制火，",
      "ch": 46,
      "qs": "癸戊甲丙"
    }
  ],
  "戊": [
    {
      "b": "寅",
      "m": "正月",
      "y": "丙甲癸",
      "q": "正二月宜先透丙，三月宜先透甲，盖正二月虽有癸甲，无丙亦难除寒气，如风雨淹淹，万物生而不长，故无丙者，一生成败，富贵艰辛，或有丙无癸甲者，名曰春旱，如万物生而多厄，一生勤苦，劳而无功。",
      "ch": 48,
      "qs": "丙甲癸辛"
    },
    {
      "b": "卯",
      "m": "二月",
      "y": "丙甲癸",
      "q": "正二月宜先透丙，三月宜先透甲，盖正二月虽有癸甲，无丙亦难除寒气，如风雨淹淹，万物生而不长，故无丙者，一生成败，富贵艰辛，或有丙无癸甲者，名曰春旱，如万物生而多厄，一生勤苦，劳而无功。",
      "ch": 48,
      "qs": "丙甲癸辛"
    },
    {
      "b": "辰",
      "m": "三月",
      "y": "甲丙癸",
      "q": "三月戊土司令，不见丙甲癸者，愚而且贱，甲癸透者、科甲；两癸透者、生员。丙透甲藏，无癸者富；有癸者，异途显达。",
      "ch": 49,
      "qs": "丙甲癸"
    },
    {
      "b": "巳",
      "m": "四月",
      "y": "甲丙癸",
      "q": "四月戊土，阳气发升，寒气内藏，外实内虚，不畏火炎，无阳气相催，万物不长，故先用甲疏劈，次取丙癸为佐。",
      "ch": 50,
      "qs": "甲丙癸"
    },
    {
      "b": "午",
      "m": "五月",
      "y": "壬甲丙",
      "q": "五月戊土，仲夏火炎，先看壬水，次取甲木，丙火酌用，用癸恐其力微。",
      "ch": 51,
      "qs": "壬甲丙癸"
    },
    {
      "b": "未",
      "m": "六月",
      "y": "癸丙甲",
      "q": "六月戊土，遇夏干枯，先看癸水，次用丙火、甲木。",
      "ch": 52,
      "qs": "癸丙甲"
    },
    {
      "b": "申",
      "m": "七月",
      "y": "丙癸甲",
      "q": "七月戊土，阳气渐入，寒气渐出，先丙后癸，甲木次之。",
      "ch": 53,
      "qs": "丙癸甲"
    },
    {
      "b": "酉",
      "m": "八月",
      "y": "丙癸",
      "q": "八月戊土，金泄身寒，赖丙照暖，喜水滋润，先丙后癸，不必木疏。",
      "ch": 54,
      "qs": "丙癸"
    },
    {
      "b": "戌",
      "m": "九月",
      "y": "甲丙癸",
      "q": "九月戊土当权，不可专用丙火。先看甲木，次取癸水，却忌戊与癸合。见金先用癸水，后取丙火，配合支干，方成有生之土，合此定发云程，科甲有准。",
      "ch": 55,
      "qs": "丙甲癸"
    },
    {
      "b": "亥",
      "m": "十月",
      "y": "甲丙",
      "q": "十月戊土，时值小阳，阳气略出，先用甲木，次取丙火，非甲，土不灵，非丙，土不暖；安能发生万物。",
      "ch": 56,
      "qs": "甲丙"
    },
    {
      "b": "子",
      "m": "十一月",
      "y": "丙甲",
      "q": "十一二月严寒冰冻，丙火为尊，甲木为佐。丙甲两透，桃浪之人；丙出甲藏，采芹食饩，丙藏甲出，佐杂前程；有丙无甲者，豪富，有甲无丙者，清贫，丙甲全无，下流之造。",
      "ch": 57,
      "qs": "丙甲"
    },
    {
      "b": "丑",
      "m": "十二月",
      "y": "丙甲",
      "q": "十一二月严寒冰冻，丙火为尊，甲木为佐。丙甲两透，桃浪之人；丙出甲藏，采芹食饩，丙藏甲出，佐杂前程；有丙无甲者，豪富，有甲无丙者，清贫，丙甲全无，下流之造。",
      "ch": 57,
      "qs": "丙甲"
    }
  ],
  "己": [
    {
      "b": "寅",
      "m": "正月",
      "y": "丙庚甲",
      "q": "正月己土，寒气未退，田园犹冻，丙暖为尊，得丙照暖，万物自生。忌见壬水，盖壬不为丙优，反为己病，何也？壬乃江湖之水，田园浸没，急须修堤岸，田园始得播种，须戊作堤，以保园圃，壬多见戊者，定主清雅富",
      "ch": 58,
      "qs": "丙壬戊"
    },
    {
      "b": "卯",
      "m": "二月",
      "y": "甲癸丙",
      "q": "二月己土，阳气渐升，虽禾稼未成，万物发生。但田园未展，宜先取甲木疏之，忌合；次取癸水润之。",
      "ch": 59,
      "qs": "甲癸"
    },
    {
      "b": "辰",
      "m": "三月",
      "y": "丙癸甲",
      "q": "三月己土，正栽培禾稼之时。先丙后癸，土暖而润，随用甲疏。",
      "ch": 60,
      "qs": "丙癸甲"
    },
    {
      "b": "巳",
      "m": "四月",
      "y": "癸丙",
      "q": "三夏己土，时值禾稼在田，最喜甘沛，取癸为要，次用丙火。夏无太阳，禾稼不长，故无癸曰旱田，无丙曰孤阴。",
      "ch": 61,
      "qs": "癸丙"
    },
    {
      "b": "午",
      "m": "五月",
      "y": "癸丙",
      "q": "三夏己土，时值禾稼在田，最喜甘沛，取癸为要，次用丙火。夏无太阳，禾稼不长，故无癸曰旱田，无丙曰孤阴。",
      "ch": 61,
      "qs": "癸丙"
    },
    {
      "b": "未",
      "m": "六月",
      "y": "癸丙",
      "q": "三夏己土，时值禾稼在田，最喜甘沛，取癸为要，次用丙火。夏无太阳，禾稼不长，故无癸曰旱田，无丙曰孤阴。",
      "ch": 61,
      "qs": "癸丙"
    },
    {
      "b": "申",
      "m": "七月",
      "y": "丙癸",
      "q": "三秋己土，万物收藏之际，外虚内实，寒气渐升，须丙火温之，癸水润之。不特此也，且癸能泄金，丙能制金，补土精神，则秋生之物咸茂矣。",
      "ch": 62,
      "qs": "丙癸"
    },
    {
      "b": "酉",
      "m": "八月",
      "y": "丙癸",
      "q": "三秋己土，万物收藏之际，外虚内实，寒气渐升，须丙火温之，癸水润之。不特此也，且癸能泄金，丙能制金，补土精神，则秋生之物咸茂矣。",
      "ch": 62,
      "qs": "丙癸"
    },
    {
      "b": "戌",
      "m": "九月",
      "y": "甲丙癸",
      "q": "三秋己土，万物收藏之际，外虚内实，寒气渐升，须丙火温之，癸水润之。不特此也，且癸能泄金，丙能制金，补土精神，则秋生之物咸茂矣。",
      "ch": 62,
      "qs": "丙癸"
    },
    {
      "b": "亥",
      "m": "十月",
      "y": "丙甲戊",
      "q": "三冬己土，湿泥寒冻，非丙暖不生，取丙为尊，甲木能参用，不可用癸。唯初冬壬水旺，用以为制，余皆用丙。无丙用丁，但丁不能解冻除寒，不能火济；丁多，衣禄安然。",
      "ch": 63,
      "qs": "丙甲癸壬丁"
    },
    {
      "b": "子",
      "m": "十一月",
      "y": "丙甲戊",
      "q": "三冬己土，湿泥寒冻，非丙暖不生，取丙为尊，甲木能参用，不可用癸。唯初冬壬水旺，用以为制，余皆用丙。无丙用丁，但丁不能解冻除寒，不能火济；丁多，衣禄安然。",
      "ch": 63,
      "qs": "丙甲癸壬丁"
    },
    {
      "b": "丑",
      "m": "十二月",
      "y": "丙甲戊",
      "q": "三冬己土，湿泥寒冻，非丙暖不生，取丙为尊，甲木能参用，不可用癸。唯初冬壬水旺，用以为制，余皆用丙。无丙用丁，但丁不能解冻除寒，不能火济；丁多，衣禄安然。",
      "ch": 63,
      "qs": "丙甲癸壬丁"
    }
  ],
  "庚": [
    {
      "b": "寅",
      "m": "正月",
      "y": "戊甲壬丙丁",
      "q": "正月庚金，木旺之际，有土皆死，不能生金。且金之寒气未除，先用丙暖庚性。又虑土厚埋金，须甲疏泄。",
      "ch": 65,
      "qs": "丙甲"
    },
    {
      "b": "卯",
      "m": "二月",
      "y": "丁甲庚丙",
      "q": "二月庚金，卯中乙木当权，柱中自然有乙，当令之乙，得庚辰时，庚必留情于乙，此金有暗强之势，如秋金相似。",
      "ch": 66,
      "qs": "乙"
    },
    {
      "b": "辰",
      "m": "三月",
      "y": "甲丁壬癸",
      "q": "三月庚金，戊土司令，不怕生寒，无生金之理，有埋金之忧。故先用甲木疏土，次用丁火煅炼成器，不必用庚劈甲。",
      "ch": 67,
      "qs": "戊甲丁"
    },
    {
      "b": "巳",
      "m": "四月",
      "y": "壬戊丙丁",
      "q": "四月庚金，长生在巳，巳虽有丙，内有戊土，丙不熔金，故不畏火炎。但丙不可轻用，宜先用壬水，方得中和。书曰：群金生夏，妙用玄武；次取戊土，丙火佐之；三者皆全，富贵无双。或透一二，亦主贡监衣衿。",
      "ch": 68,
      "qs": "丙戊壬"
    },
    {
      "b": "午",
      "m": "五月",
      "y": "壬癸",
      "q": "五月庚金，丁火旺烈，庚金败地，专用壬水，癸又次之。",
      "ch": 69,
      "qs": "丁壬癸"
    },
    {
      "b": "未",
      "m": "六月",
      "y": "丁甲",
      "q": "六月庚金，三伏生寒，金顽已极。先用丁火，次取甲木。",
      "ch": 70,
      "qs": "丁甲"
    },
    {
      "b": "申",
      "m": "七月",
      "y": "丁甲",
      "q": "七月庚金，刚锐极矣。专用丁火煅炼，次取木引丁。故曰：秋金刚锐最为奇，壬癸相逢总不宜：如逢木火来成局，试看福寿与天齐。",
      "ch": 71,
      "qs": "丁壬癸"
    },
    {
      "b": "酉",
      "m": "八月",
      "y": "丁甲丙",
      "q": "八月庚金，刚锐未退，仍用丁甲，丙不可少。",
      "ch": 72,
      "qs": "丁甲丙"
    },
    {
      "b": "戌",
      "m": "九月",
      "y": "甲壬",
      "q": "九月庚金，戊土司令，最怕土厚埋金。宜先用甲疏，后用壬洗，则金自出矣，忌见己土浊壬。",
      "ch": 73,
      "qs": "戊甲壬己"
    },
    {
      "b": "亥",
      "m": "十月",
      "y": "丁丙",
      "q": "十月庚金，水冷性寒，非丁莫造，非丙不暖。",
      "ch": 74,
      "qs": "丁丙"
    },
    {
      "b": "子",
      "m": "十一月",
      "y": "丁甲丙",
      "q": "十一月庚金，天气严寒，仍取丁甲，次取丙火照暖。",
      "ch": 75,
      "qs": "丁甲丙"
    },
    {
      "b": "丑",
      "m": "十二月",
      "y": "丙丁甲",
      "q": "十二月庚金，寒气太重，丑为湿泥，愈寒愈冻，先取丙火解冻，次取丁火炼金，甲亦不可少。",
      "ch": 76,
      "qs": "丙丁甲"
    }
  ],
  "辛": [
    {
      "b": "寅",
      "m": "正月",
      "y": "己壬庚",
      "q": "正月辛金，阳气舒升寒气未除。然正月建寅，中有长生之丙，可解寒气。但忌甲木司权，辛金失令。性爱湿泥滋养，取己土为身之本。次用壬水淘洗，欲得辛金发现，全赖壬水之功。",
      "ch": 77,
      "qs": "丙甲己壬"
    },
    {
      "b": "卯",
      "m": "二月",
      "y": "壬甲",
      "q": "二月辛金，阳和之际，壬水为尊。见戊己为病，得甲制伏，则辛金不致埋没，壬水不致混浊，合此者，必身入玉堂。故二月庚金，有壬甲透者贵显；否则，乡绅。或壬坐亥支，不见土出，可能入芥，家亦小康。得申中之",
      "ch": 78,
      "qs": "壬戊己甲庚"
    },
    {
      "b": "辰",
      "m": "三月",
      "y": "壬甲",
      "q": "三月辛金，戊土司令，辛承正气，母旺子相。",
      "ch": 79,
      "qs": "戊"
    },
    {
      "b": "巳",
      "m": "四月",
      "y": "壬甲癸",
      "q": "四月辛金，时道首夏，忌丙火之燥烈，喜壬水之洗淘。",
      "ch": 80,
      "qs": "丙壬"
    },
    {
      "b": "午",
      "m": "五月",
      "y": "壬己癸",
      "q": "五月辛金，丁火司权，辛金失令，阴柔之极，不宜煅炼，须己壬兼用。何也？己为泥沙，壬为湖海，己无壬不湿，辛无己不生，故壬己并用。无壬，癸亦可用，但癸力小。",
      "ch": 81,
      "qs": "丁己壬癸"
    },
    {
      "b": "未",
      "m": "六月",
      "y": "壬庚甲",
      "q": "六月己土当权，滋扶太过，恐污金不耀，专用壬水为妙，次取庚金佐之。",
      "ch": 82,
      "qs": "己壬庚"
    },
    {
      "b": "申",
      "m": "七月",
      "y": "壬甲戊",
      "q": "七月辛金，值庚秉令，不旺自旺。且申中有长生之壬，四柱不见戊土透干，胎元亦无戊制，唯申中一戊，为壬堤岸，人命得此，为官清正，但不富耳。",
      "ch": 83,
      "qs": "庚壬戊"
    },
    {
      "b": "酉",
      "m": "八月",
      "y": "壬甲",
      "q": "八月辛金，当权，得令，旺之极矣，专用壬水淘之泄之为贵，故云：金见水以流通。",
      "ch": 84,
      "qs": "壬"
    },
    {
      "b": "戌",
      "m": "九月",
      "y": "壬甲",
      "q": "九月辛金，戊土司令，母旺子相，须甲疏土，壬泄旺金，先壬后甲。壬甲两透，桃洞之仙。",
      "ch": 85,
      "qs": "戊甲壬"
    },
    {
      "b": "亥",
      "m": "十月",
      "y": "壬丙",
      "q": "十月时值小阳，阳气初潜，寒气未盛，先用壬水，次用丙火，暖壬温辛。",
      "ch": 86,
      "qs": "壬丙"
    },
    {
      "b": "子",
      "m": "十一月",
      "y": "丙戊壬甲",
      "q": "十一月辛金，癸水司令，为寒冬雨露，最忌癸水出干，冻金而困丙火。",
      "ch": 87,
      "qs": "癸丙"
    },
    {
      "b": "丑",
      "m": "十二月",
      "y": "丙壬戊己",
      "q": "十二月辛金，寒冻之极，先丙后壬。无丙不能解冻，无壬不能洗淘。",
      "ch": 88,
      "qs": "丙壬"
    }
  ],
  "壬": [
    {
      "b": "寅",
      "m": "正月",
      "y": "庚丙戊",
      "q": "正月壬水，汪洋之象，能并百川之流。然水性柔弱，宜用庚金之源，次取丙火以除寒气，又次取戊土以止其流，庶不致汪洋无度。",
      "ch": 90,
      "qs": "庚丙戊"
    },
    {
      "b": "卯",
      "m": "二月",
      "y": "戊辛庚",
      "q": "二月壬水，寒气初除，清流湛深，不用丙暖，专取戊土为堤岸，辛发其源，庚金次之。",
      "ch": 91,
      "qs": "丙戊辛庚"
    },
    {
      "b": "辰",
      "m": "三月",
      "y": "甲庚",
      "q": "三月壬水，戊土司权，死有推山塞海之患，先用甲疏季土，次取庚发水源。",
      "ch": 92,
      "qs": "戊甲庚"
    },
    {
      "b": "巳",
      "m": "四月",
      "y": "壬辛庚癸",
      "q": "四月壬水，丙火司权，水弱极矣。专取壬水比肩为助，次取辛金发源，忌与丙火合化，又以庚金为佐。",
      "ch": 93,
      "qs": "丙辛庚"
    },
    {
      "b": "午",
      "m": "五月",
      "y": "癸庚辛",
      "q": "五月壬水，丁旺壬弱，取庚为用，取癸为佐。无庚不能蓄源，无癸不能伤丁。",
      "ch": 94,
      "qs": "丁庚癸"
    },
    {
      "b": "未",
      "m": "六月",
      "y": "辛甲",
      "q": "六月壬水，己土当权，丁火退气，用辛蓄源，用甲劈土；先辛后甲，次取癸水。",
      "ch": 95,
      "qs": "己丁辛甲癸"
    },
    {
      "b": "申",
      "m": "七月",
      "y": "戊丁",
      "q": "七月壬水，庚金司令，壬得申之长生，源流自远，转弱为强。专用戊土，次取丁火，佐戊制庚，但用辰戌之戊，不用申中受病之戊。",
      "ch": 96,
      "qs": "庚戊丁"
    },
    {
      "b": "酉",
      "m": "八月",
      "y": "甲庚",
      "q": "八月壬水，辛金司权，金白水清之时，忌戊己为病，专取甲木。",
      "ch": 97,
      "qs": "辛戊己甲"
    },
    {
      "b": "戌",
      "m": "九月",
      "y": "甲丙",
      "q": "九月亥水进气，其性将厚。若一派壬水，见一甲制戌中之戊，又见一戊出干，斯用丙火，此格清贵极矣，正谓一将当关，群邪自伏。见丙，便主衣禄，或不见丙戊，终为下格。",
      "ch": 98,
      "qs": "甲戊丙"
    },
    {
      "b": "亥",
      "m": "十月",
      "y": "戊丙庚",
      "q": "十月壬水司权，至旺之极，取戊为用。",
      "ch": 99,
      "qs": "戊"
    },
    {
      "b": "子",
      "m": "十一月",
      "y": "戊丙",
      "q": "十一月壬水，阳刃帮身，较前更旺，先取戊土，次用丙火。",
      "ch": 100,
      "qs": "戊丙"
    },
    {
      "b": "丑",
      "m": "十二月",
      "y": "丙丁甲",
      "q": "十二月壬水，旺极复衰，何也？上半月癸辛主事，壬水稍旺，专用丙火解冻，下半月己土主事，故衰，亦用丙火，甲木佐之；故有丙，名利两全。",
      "ch": 101,
      "qs": "癸辛丙己甲"
    }
  ],
  "癸": [
    {
      "b": "寅",
      "m": "正月",
      "y": "辛丙",
      "q": "正月癸水，值三阳之候，为雨露之精，其性至柔。先用辛金，生癸水之源，次用丙火照暖，名阴阳和合，万物发生。",
      "ch": 102,
      "qs": "辛丙"
    },
    {
      "b": "卯",
      "m": "二月",
      "y": "庚辛",
      "q": "二月癸水，不刚不柔，乙木司令，泄弱元神，专用庚金为用，辛金次之。",
      "ch": 103,
      "qs": "乙庚辛"
    },
    {
      "b": "辰",
      "m": "三月",
      "y": "丙辛甲",
      "q": "三月癸水，要分清明鼓雨，清明后火气未炽，专用丙火，名阴阳承蔼。谷雨后虽用丙火，还宜辛金佐之，富贵；次看何神高透无伤，便可定格局高低。如",
      "ch": 104,
      "qs": "丙辛"
    },
    {
      "b": "巳",
      "m": "四月",
      "y": "辛",
      "q": "四月癸水，喜见新母，无辛，庚亦可用，但不自然。",
      "ch": 105,
      "qs": "辛庚"
    },
    {
      "b": "午",
      "m": "五月",
      "y": "庚辛壬癸",
      "q": "五月癸水，至弱无根，必须庚辛为生身之本，但丁火司权，金难敌火，安能滋养癸水？宜见比劫，方得庚辛妙用。",
      "ch": 106,
      "qs": "庚辛丁"
    },
    {
      "b": "未",
      "m": "六月",
      "y": "庚辛壬癸",
      "q": "六月癸水，有上下月之分，上半月庚辛无气，下半月庚辛有气。凡六癸日，人多推此月多不验者，何也？俗士不知此理，不知未中有乙，与己同宫，破而不破，故癸水不能从煞，所以专用庚辛。如上半月，金神衰弱，火",
      "ch": 107,
      "qs": "庚辛乙己",
      "note": "原文全章未见「壬」，此格按整理表录入，待以善本核对"
    },
    {
      "b": "申",
      "m": "七月",
      "y": "丁",
      "q": "七月癸水，正母旺子相之时。癸虽死申，殊不知申中有庚生之，名死处逢生，弱中复强，即运行西北，亦不死也。但庚司令，刚锐极矣，必取丁火为用。",
      "ch": 108,
      "qs": "庚丁"
    },
    {
      "b": "酉",
      "m": "八月",
      "y": "辛丙",
      "q": "八月癸水，辛金虚灵，非顽金可比，正金白水清。故取辛金为用，丙火佐之，名水暖金温。",
      "ch": 109,
      "qs": "辛丙"
    },
    {
      "b": "戌",
      "m": "九月",
      "y": "辛甲壬癸",
      "q": "九月癸水，失令无根，戊土司权，克制太过，专用辛金发癸水之源，次用癸甲，要比肩滋甲制戊方妙。",
      "ch": 110,
      "qs": "戊辛甲"
    },
    {
      "b": "亥",
      "m": "十月",
      "y": "庚辛戊丁",
      "q": "十月癸水，旺中有弱，何也？因亥摇木，泄散元神，宜用庚辛为妙。",
      "ch": 111,
      "qs": "庚辛"
    },
    {
      "b": "子",
      "m": "十一月",
      "y": "丙辛",
      "q": "十一月癸水，值冰冻之时，金水无交欢之象，专用丙火解冻，庶不致变雨为雪，结露为霜。又要辛金滋扶，然无丙火，辛亦不妙。凡冬季癸水，有丙透解冻，则金温水暖，两两相生，要不见壬透，自然登科及第，紫诰金",
      "ch": 112,
      "qs": "丙辛壬"
    },
    {
      "b": "丑",
      "m": "十二月",
      "y": "丙丁",
      "q": "十二月癸水，落地成冰，万物不能舒泰，专用丙火解冻。",
      "ch": 113,
      "qs": "丙"
    }
  ]
};

function qtOf(dayStem, monthBranch) {
  const arr = QT[dayStem];
  if (!arr) return null;
  const i = QT_BRANCHES.indexOf(monthBranch);
  if (i < 0) return null;
  const e = arr[i];
  if (!e) return null;
  const yong = [...e.y];
  return {
    stem: dayStem,
    branch: e.b,
    month: e.m,
    yong,
    primary: yong[0] || null,
    quote: e.q,
    quoteStems: [...e.qs],
    chapter: e.ch,
    url: QT_BASE_URL + String(e.ch).padStart(3, '0') + '/',
    note: e.note || '',
    label: dayStem + '日生于' + e.m + '（' + e.m + e.b + '月）',
  };
}

function qtLine(e) {
  if (!e) return '';
  return e.label + '：用神 ' + e.yong.join('、') + '（首取 ' + e.primary + '）';
}

return { QT_BRANCHES, QT_MONTHS, QT_BASE_URL, QT_NOTE, QT, qtOf, qtLine };
})();

__mods.classics = (function () {

const CLASSIC_BOOKS = {
  ziping: { name: '子平真诠', author: '清·沈孝瞻', base: 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/' },
  ditian: { name: '滴天髓', author: '明·京图（通行本）', base: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/' },
  sanming: { name: '三命通会', author: '明·万民英', base: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/' },
};

const CLASSICS = [
  {
    id: 'zp-yongshen',
    book: 'ziping',
    chapter: '八、论用神',
    scene: '用神',
    tags: [],
    quote: '八字用神，专求月令，以日干配月令地支，而生克不同，格局分焉。财官印食，此用神之善而顺用之者也；煞伤劫刃，用神之不善而逆用之者也。',
    plain: '用神从月令里找：财、官、印、食四吉神顺用（生之护之），煞、伤、劫、刃四凶神逆用（制之化之）。',
    url: 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/53628.html',
  },
  {
    id: 'zp-zhenguan',
    book: 'ziping',
    chapter: '三十一、论正官',
    scene: '格局',
    tags: ['正官'],
    quote: '以刑冲破害为忌，则以生之护之为喜矣。存其喜而去其忌则贵，而贵之中又有高低者，何也？',
    plain: '正官格最忌刑冲破害，喜财生官、印护官；去忌存喜才谈得上贵，贵的层次还要看财印是否并透、有无伤官七煞混杂。',
    url: 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/53651.html',
  },
  {
    id: 'zp-cai',
    book: 'ziping',
    chapter: '三十三、论财',
    scene: '格局',
    tags: ['财', '正财', '偏财'],
    quote: '财为我克，使用之物也，以能生官，所以为美。为财帛，为妻妾，为才能，为驿马，皆财类也。',
    plain: '财是我所克、能为我用之物，因能生官而美；它同时代表钱财、配偶、才能、走动，不只「钱」一项。',
    url: 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/53653.html',
  },
  {
    id: 'zp-yin',
    book: 'ziping',
    chapter: '三十五、论印绶',
    scene: '格局',
    tags: ['印'],
    quote: '印绶喜其生身，正偏同为美格，故财与印不分偏正，同为一格而论之。',
    plain: '印能生身，正印偏印都算美格，不分偏正而论；印格的关键在身印强弱与官杀、食伤、财的配合。',
    url: 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/53655.html',
  },
  {
    id: 'zp-shishen',
    book: 'ziping',
    chapter: '三十七、论食神',
    scene: '格局',
    tags: ['食神'],
    quote: '食神本属泄气，以其能生正财，所以喜之。故食神生财，美格也。财要有根，不必偏正叠出，如身强食旺而财透，大贵之格。',
    plain: '食神本是泄气，可贵在能生财；食神生财要财有根，身强、食旺、财透三者齐，格局才大。',
    url: 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/53657.html',
  },
  {
    id: 'zp-pianguan',
    book: 'ziping',
    chapter: '三十九、论偏官',
    scene: '格局',
    tags: ['七杀', '偏官'],
    quote: '煞以攻身，似非美物，百大贵之格，多存七煞。盖控制得宜，煞为我用，如大英雄大豪杰，似难驾驭，而处之有方，则惊天动地之功，忽焉而就。',
    plain: '七煞攻身，看着不美，但大贵之格多有七煞——能控制住就为我所用，像驾驭豪杰，处之有方就能成大事。',
    url: 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/53659.html',
  },
  {
    id: 'zp-shangguan',
    book: 'ziping',
    chapter: '四十一、论伤官',
    scene: '格局',
    tags: ['伤官'],
    quote: '伤官虽非吉神，实为秀气，故文人学士，多于伤官格内得之。而夏木见水，冬金见火，则又为秀之尤秀者也。',
    plain: '伤官不是吉神，却是秀气所在，文人多出伤官格；夏木得水、冬金得火，是秀气里更秀的两种。',
    url: 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/53661.html',
  },
  {
    id: 'zp-yangren',
    book: 'ziping',
    chapter: '四十三、论阳刃',
    scene: '格局',
    tags: ['劫财', '阳刃'],
    quote: '阳刃者，劫我正财之神，乃正财之七煞也。禄前一位，惟五阳有之，故为阳刃。不曰劫而曰刃，劫之甚也。刃宜伏制，官煞皆宜，财印相随，尤为贵显。',
    plain: '阳刃是劫财之极（只有五阳干有），宜用官煞制伏；财印相随而不相碍，格局更显。',
    url: 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/53663.html',
  },
  {
    id: 'zp-lujie',
    book: 'ziping',
    chapter: '四十五、论建禄月劫',
    scene: '格局',
    tags: ['比肩', '建禄', '月劫'],
    quote: '故建禄与月劫，可同一格，不必加分，皆以透干支，别取财官煞食为用。',
    plain: '建禄、月劫同看一格，月令本身不算用神，要另看透出的财官煞食取用。',
    url: 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/53665.html',
  },
  {
    id: 'zp-qihou',
    book: 'ziping',
    chapter: '十四、论用神配气候得失',
    scene: '调候',
    tags: [],
    quote: '论命惟以月令用神为主，然亦须配气候而互参之。譬如英雄豪杰，生得其时，自然事半功倍；遭时不顺，虽有奇才，成功不易。',
    plain: '月令用神为主，但必须配气候参看；同样的格局，生在得时的气候里事半功倍，逆着气候就费劲。',
    url: 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/53634.html',
  },
  {
    id: 'zp-chengbai',
    book: 'ziping',
    chapter: '九、论用神成败救应',
    scene: '格局',
    tags: [],
    quote: '成中有败，必是带忌；败中有成，全凭救应。',
    plain: '成格不等于一路顺：成中带忌（官逢财又逢伤、官被合之类）就打了折；败格也未必无救——印来解伤、合来清煞，败中还能转成。',
    url: 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/53629.html',
  },
  {
    id: 'zp-bianhua',
    book: 'ziping',
    chapter: '十、论用神变化',
    scene: '格局',
    tags: [],
    quote: '故若丁生亥月，本为正官，支全卯未，则化为印。己生申月，本属伤官。藏庚透壬，则化为财。凡此之类皆用神之变化也。',
    plain: '用神本从月令取，但月令藏干不一：丁生亥月本为正官，支会卯未就化为印；己生申月本属伤官，庚藏壬透就化为财。起点相同，合化一变，取用也跟着变（原文只说变化之由，不断定某盘必化）。',
    url: 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/53630.html',
  },
  {
    id: 'dt-hannuan',
    book: 'ditian',
    chapter: '通神论·寒暖',
    scene: '调候',
    tags: [],
    quote: '天道有寒暖，生育万物，人道行之，不可过也。',
    plain: '天有寒暖才能生养万物，人命里寒暖也不能过——过寒过热都要调。',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153091.html',
  },
  {
    id: 'dt-zaoshi',
    book: 'ditian',
    chapter: '通神论·燥湿',
    scene: '调候',
    tags: [],
    quote: '地道有燥湿，生成品汇，人道得之，不可偏也。',
    plain: '地有燥湿才有品类生成，人命得燥湿之气也不能偏。',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153091.html',
  },
  {
    id: 'dt-shuaiwang',
    book: 'ditian',
    chapter: '通神论·衰旺',
    scene: '调候',
    tags: [],
    quote: '能知旺衰之真机，其于三命之奥，思过半矣。',
    plain: '真正看懂旺衰的机关，命理之奥就过了一半——旺衰不是数个数，要看真机。',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153091.html',
  },
  {
    id: 'dt-zhonghe',
    book: 'ditian',
    chapter: '通神论·中和',
    scene: '调候',
    tags: [],
    quote: '既识中和之正理，而于五行之妙，有全能焉。',
    plain: '懂得中和的道理，五行的妙处就都在其中了。',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153091.html',
  },
  {
    id: 'dt-guansha',
    book: 'ditian',
    chapter: '通神论·官杀',
    scene: '十神',
    tags: ['正官', '七杀'],
    quote: '官杀混杂来问我，有可有不可。',
    plain: '官杀混杂不是一律不好，要看能不能去留取清。',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153091.html',
  },
  {
    id: 'dt-shangguan',
    book: 'ditian',
    chapter: '通神论·伤官',
    scene: '十神',
    tags: ['伤官'],
    quote: '伤官见官最难辨，可见不可见。',
    plain: '伤官见官是最难分辨的一条：有的能见，有的不能见，不能一句「伤官见官为祸百端」了事。',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153091.html',
  },
  {
    id: 'dt-yueling',
    book: 'ditian',
    chapter: '通神论·月令',
    scene: '用神',
    tags: [],
    quote: '月令乃提纲之府，譬之宅也，人元为用事之神，宅之定向也，不可以不卜。',
    plain: '月令像宅子，藏干是用事之神，像宅子的朝向，必须细看。',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153091.html',
  },
  {
    id: 'dt-tiyong',
    book: 'ditian',
    chapter: '通神论·体用',
    scene: '用神',
    tags: [],
    quote: '道有体用，不可以一端论也，要在扶之抑之得其宜。',
    plain: '体用不能只看一头，关键是扶抑得宜。',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153091.html',
  },
  {
    id: 'dt-jingshen',
    book: 'ditian',
    chapter: '通神论·精神',
    scene: '用神',
    tags: [],
    quote: '人有精神，不可以一偏求也，要在损之益之得其中。',
    plain: '看精神不能偏执一端，要在损益之间求其中。',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153091.html',
  },
  {
    id: 'dt-tongguan',
    book: 'ditian',
    chapter: '通神论·通关',
    scene: '用神',
    tags: [],
    quote: '关内有织女，关外有牛郎，此关若通也，相邀入洞房。',
    plain: '两股力隔着一道关相望：一边织女、一边牛郎，中间若有一行能把两边接上（一方生它、它再生另一方），对峙就化成相生。原文只给取象，哪一行为关要按五行生克定。',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153091.html',
  },
  {
    id: 'smt-zhenguan',
    book: 'sanming',
    chapter: '卷五·论正官',
    scene: '格局',
    tags: ['正官'],
    quote: '正官者，乃甲见辛、乙见庚之例。阴阳配合，相制有用，成其道也。故正官为六格之首，止许一位，多则不宜。',
    plain: '正官取「克我而阴阳相配」，有制而能成用；六格以正官居首，只宜一位，多见就杂。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7582.html',
  },
  {
    id: 'smt-zhengcai',
    book: 'sanming',
    chapter: '卷六·论正财',
    scene: '格局',
    tags: ['财', '正财'],
    quote: '正财者，乃甲见己、乙见戊之例。受我克制，为我之妻，譬人娶妻，妻赍财嫁我，我必精神康强，而后可享用，若衰微不振，虽妻财丰厚，但能目视，终不得用。',
    plain: '正财是我克制之物，古人以「娶妻带财」作比：自身精神康强才受用得起，身弱不振，财再厚也只是看着。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7645.html',
  },
  {
    id: 'smt-piancai',
    book: 'sanming',
    chapter: '卷六·论偏财',
    scene: '格局',
    tags: ['财', '偏财'],
    quote: '何谓偏财？乃甲见戊、乙见己之例。非妻所带，乃众人之财也。切忌有姊妹兄弟分夺，柱无官星，祸患百出。',
    plain: '偏财取「我克而阴阳不同」：不是妻家带来的私财，而是众人之财，宜流通不宜独占。原文最忌比肩劫财来分夺，又说柱中无官星则多事（旧说的重话照录，本插件只记原文、不作断语）。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7650.html',
  },
  {
    id: 'smt-yinshou',
    book: 'sanming',
    chapter: '卷六·论印绶',
    scene: '格局',
    tags: ['印'],
    quote: '印绶者，乃五行生我之名。如甲乙在亥子月，丙丁在寅卯月之类，乃我气之源，为生气，为父母，能护我官星，使无伤克',
    plain: '印是生我之气，像源头与父母：它能护住官星，使官不受伤克；反过来说，印重就怕财来破。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7655.html',
  },
  {
    id: 'smt-shishen',
    book: 'sanming',
    chapter: '卷六·论食神',
    scene: '格局',
    tags: ['食神'],
    quote: '凡命遇财煞之地，食神旺相，煞被食制，不敢为祸，财被食生，充裕不竭，故食神一名寿星，一名爵星，良有以也。',
    plain: '食神旺，一头制煞、一头生财：煞被制住不敢为祸，财被生起不至枯竭；所以食神又叫寿星、爵星。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7663.html',
  },
  {
    id: 'smt-shangguan',
    book: 'sanming',
    chapter: '卷六·论伤官',
    scene: '格局',
    tags: ['伤官'],
    quote: '伤官虽凶，乃我所生，自家之物，伤尽则能生财，财旺则能生官，造化展转有情。',
    plain: '伤官虽称凶，却是我自己生出来的：伤尽（柱中不见官星）反能生财，财旺再生官，辗转还是有情。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7662.html',
  },
  {
    id: 'smt-yangren',
    book: 'sanming',
    chapter: '卷六·论阳刃',
    scene: '格局',
    tags: ['阳刃', '劫财'],
    quote: '阳者，阴阳之阳，刃者，刀刃之刃，即禄前一位，言旺越其分，故险。',
    plain: '阳刃指禄前一位，旺过了本分，所以险；甲丙戊庚壬五阳干才有刃，阴干见伤官同论。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7671.html',
  },
  {
    id: 'smt-jianlu',
    book: 'sanming',
    chapter: '卷六·论建禄',
    scene: '格局',
    tags: ['建禄', '比肩', '月劫'],
    quote: '凡命月令建禄，难招祖业，必主平生见财不聚，却病少寿长，行运再见比肩，克妻妨父损子',
    plain: '月令建禄是日主临官之地，身旺而财官难取：古说难承祖业、见财不聚，但病少寿长；再走比肩运，古书说克妻妨父损子（属于旧说的重话，本插件只记原文、不作断语）。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7672.html',
  },
  {
    id: 'smt-guansha-liu',
    book: 'sanming',
    chapter: '卷五·官煞去留杂论',
    scene: '格局',
    tags: ['七杀', '偏官'],
    quote: '凡看去留，要详柱中官煞孰重孰轻，天干透者易去，月支所藏者难去，须伤官食神去官煞之物众而有力，方才去得。',
    plain: '官煞混见时先比谁重谁轻：天干透出的容易去，月支藏着的难去；用来去官煞的伤官食神要成众、有根有力，才真去得掉。七杀格遇正官混杂，就按这一篇看取舍。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7599.html',
  },
  {
    id: 'smt-quzhi',
    book: 'sanming',
    chapter: '卷六·曲直',
    scene: '格局',
    tags: ['曲直格', '专旺'],
    quote: '甲乙日得亥卯未局，柱中须有亥字带印为入格，若无亥有卯，止是木之本气，却要见金土为贵，既无亥字，又无金土，则木不秀不实，难以言贵。',
    plain: '曲直格要木局成方（亥卯未）且带亥字为印，才算入格；只有卯、没有亥，只是木的本气，得另见金土才谈得上贵；两样都没有，木虽旺而无成，难称贵格。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7630.html',
  },
  {
    id: 'smt-yanshang',
    book: 'sanming',
    chapter: '卷六·炎上',
    scene: '格局',
    tags: ['炎上格', '专旺'],
    quote: '丙丁日遇寅午戌局，柱中须有寅字带印为入格，无寅止是九流近贵之命，若火自旺，无亥水相济，不贵。喜东北方运，忌见辰丑戊己，晦火光明，多主眼疾，或患风气，柱有木制成贵，忌水金乡，怕冲。',
    plain: '炎上格要火局成方（寅午戌）且带寅字为印才入格；无寅只是偏贵的命。火自旺还要一点水相济，过燥不贵；行运喜东北、忌湿土晦火，也怕冲。原文另带「多主眼疾」一句，属于旧说，本插件只记原文、不作健康判断。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7631.html',
  },
  {
    id: 'smt-congge',
    book: 'sanming',
    chapter: '卷六·从革',
    scene: '格局',
    tags: ['从革格', '专旺'],
    quote: '庚辛日见巳酉丑局，须带丙丁巳午一二位方成其器，但不可火多。如辛巳、辛酉、辛丑三日不喜五月生，被火所伤，宜八月或水土养育食神印绶为吉。',
    plain: '从革格是金局成方（巳酉丑），但金要火炼才成器：须带丙丁或巳午一二位，火又不能多。辛巳、辛酉、辛丑三日出身在五月（火旺）被伤，原文说宜八月或水土养育。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7632.html',
  },
  {
    id: 'smt-runxia',
    book: 'sanming',
    chapter: '卷六·润下',
    scene: '格局',
    tags: ['润下格', '专旺'],
    quote: '壬癸日见申子辰全，忌引卯巳死绝之地，三刑四冲之乡，死绝则不流，冲刑则横流，岁运同。或曰水太泛须柱有土神一两位制之，得成堤岸，既有土怕会木为凶，如有木伤土要金印救解，终是一生成败。',
    plain: '润下格是水局三合全（申子辰），最忌卯巳死绝与三刑四冲：死绝水不流，冲刑水横流，行运也一样看。水太泛要一两位土作堤，有土又怕木来破堤，木伤土再用金印解救——原文把成败条件摊开讲。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7633.html',
  },
  {
    id: 'smt-jiasi',
    book: 'sanming',
    chapter: '卷六·稼穑',
    scene: '格局',
    tags: ['稼穑格', '专旺'],
    quote: '赋云：戊己忻逢四季，乃为稼穑之名。是戊己生逢季月，喜见木为官，止得一木为妙，木多则土虚，主虚诈为破家不仁之人。',
    plain: '稼穑格取戊己生于四季月（辰戌丑未）。原文说喜见一木为官，木多则土虚；后半对木多之人的评语是旧说的重话，本插件只照录条件、不拿来评价人。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7634.html',
  },
  {
    id: 'smt-congsha',
    book: 'sanming',
    chapter: '卷五·弃命从煞',
    scene: '格局',
    tags: ['从杀格'],
    quote: '《独步》云：弃命从煞，须要会煞从财，忌煞从煞。盖言从煞格，以煞神太重，身无所归，不得已从之，要行煞旺及财乡，四柱无一点比肩印绶方论，如遇运扶身旺，与煞为敌，从煞不专，故为祸患。',
    plain: '从煞格是煞太重、日主无所归才「弃命」相从：条件是四柱没有一点比肩印绶扶身，行运喜煞旺与财乡；一旦走扶身之运，与煞为敌，就从得不专。本插件只作结构说明，不据此断寿夭。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7598.html',
  },
  {
    id: 'smt-congcai',
    book: 'sanming',
    chapter: '卷六·弃命从财',
    scene: '格局',
    tags: ['从财格'],
    quote: '《独步》云：弃命从财，须要会财，若逢根气，命损无猜。假如丁生酉月，柱多庚辛，日干无气，只得弃命相从，运入北方财官旺地，乃为入格，南行灾。',
    plain: '从财格要财会成局、日干无气；一见根气就破格，原文用「命损无猜」这种重话写明。以丁生酉月、柱多庚辛为例：只能弃命相从，行北方财官旺地为入格，南行则灾。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7652.html',
  },
];

const BY_ID = CLASSICS.reduce((m, e) => { m[e.id] = e; return m; }, {});

const GEJU_KEY = {
  正官格: '正官',
  七杀格: '七杀',
  偏官格: '偏官',
  正财格: '正财',
  偏财格: '偏财',
  正印格: '印',
  偏印格: '印',
  食神格: '食神',
  伤官格: '伤官',
  阳刃格: '阳刃',
  月劫格: '月劫',
  建禄格: '建禄',
};

const SPECIAL_CLASSIC = {
  曲直格: 'smt-quzhi',
  炎上格: 'smt-yanshang',
  从革格: 'smt-congge',
  润下格: 'smt-runxia',
  稼穑格: 'smt-jiasi',
  从财格: 'smt-congcai',
  从杀格: 'smt-congsha',
};

function classicOf(id) {
  return BY_ID[id] || null;
}

function tagOf(gejuName) {
  const name = String(gejuName || '');
  if (GEJU_KEY[name]) return GEJU_KEY[name];
  const bare = name.replace(/格$/, '');
  return GEJU_KEY[bare + '格'] || bare;
}

function pick(tag, book) {
  return CLASSICS.find((e) => e.scene === '格局' && e.tags.includes(tag) && (!book || e.book === book)) || null;
}

function chapterTitle(e) {
  return e.chapter.replace(/^.*[、·]/, '').replace(/^论/, '');
}

function classicsFor(r, limit = 5) {
  if (!r) return [];
  const out = [];
  const seen = new Set();
  const push = (entry, why) => {
    if (!entry || seen.has(entry.id) || out.length >= limit) return;
    seen.add(entry.id);
    out.push({ ...entry, why });
  };
  const gejuList = Array.isArray(r.geju) ? r.geju : (r.frame && Array.isArray(r.frame.geju) ? r.frame.geju : []);
  for (const g of gejuList) {
    const entry = g && SPECIAL_CLASSIC[g.name] ? classicOf(SPECIAL_CLASSIC[g.name]) : null;
    if (entry) push(entry, `本盘列有「${g.name}」，故取${CLASSIC_BOOKS[entry.book].name}「${chapterTitle(entry)}」一条`);
  }
  for (const g of gejuList) {
    if (!g || (g.kind && g.kind !== '月令格')) continue;
    const tag = tagOf(g.name);
    const primary = pick(tag, 'ziping') || pick(tag);
    if (primary) push(primary, `你的月令格局是「${g.name}」，故取${CLASSIC_BOOKS[primary.book].name}「${chapterTitle(primary)}」一条`);
    const alt = CLASSICS.find((e) => e.scene === '格局' && e.tags.includes(tag) && (!primary || e.book !== primary.book));
    if (alt) push(alt, `同是「${g.name}」，${CLASSIC_BOOKS[alt.book].name}「${chapterTitle(alt)}」另有取法，可对照读`);
  }
  const cli = r.climate || (r.frame && r.frame.yongshen && (r.frame.yongshen.climate || r.frame.yongshen.tiaohou));
  const tg = r.frame && r.frame.yongshen && r.frame.yongshen.tongguan;
  const tgEntry = tg && tg.usable ? classicOf('dt-tongguan') : null;
  if (cli && cli.kind && cli.kind !== '平和') {
    const cold = !!(cli.cold || cli.kind.indexOf('寒') >= 0);
    const hot = !!(cli.hot || cli.kind.indexOf('热') >= 0);
    push(classicOf(cold ? 'dt-hannuan' : 'dt-zaoshi'), `本盘气候判为「${cli.kind}」，故取${CLASSIC_BOOKS.ditian.name}寒暖燥湿一条`);
    if (!tgEntry) push(classicOf('zp-qihou'), '气候与月令用神要互参，故取子平真诠「用神配气候」一条');
    if (hot) push(classicOf('dt-hannuan'), '本盘偏热，寒暖一条正对');
  }
  if (tgEntry) {
    push(tgEntry, `本盘忌${tg.foe}克用${tg.use}，局中${tg.bridge}${tg.weight}分可作通关，故取${CLASSIC_BOOKS.ditian.name}「通关」一条`);
  }
  const huagi = gejuList.find((g) => g && g.kind === '化气格');
  const combo = gejuList.find((g) => g && g.kind === '组合');
  if (huagi) {
    push(classicOf('zp-bianhua'), `本盘列有「${huagi.name}」：用神由月令合化而变，总纲一位改取${CLASSIC_BOOKS.ziping.name}论用神变化`);
  } else if (combo) {
    push(classicOf('zp-chengbai'), `本盘另有「${combo.name}」组合：成格还要看带忌与救应，总纲一位改取${CLASSIC_BOOKS.ziping.name}论用神成败救应`);
  } else {
    push(classicOf('zp-yongshen'), '用神从月令取、四吉顺用四凶逆用，是通用总纲');
  }
  return out;
}

function classicsText(rows) {
  if (!rows || !rows.length) return '';
  return rows.map((e) => `《${CLASSIC_BOOKS[e.book].name}·${e.chapter}》「${e.quote}」`).join('\n');
}

return { CLASSIC_BOOKS, CLASSICS, classicOf, classicsFor, classicsText };
})();

__mods.geju = (function () {

const { judgeClimate, arbitrate } = __mods.tiaohou;
const { qtOf } = __mods.qiongtong;

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

const TONGGUAN_MIN = 1.5;
function tongguanOf(favor = [], avoid = [], wuxing = {}) {
  const w = (el) => Math.round((Number(wuxing[el]) || 0) * 10) / 10;
  for (const use of favor) {
    if (w(use) < TONGGUAN_MIN) continue;
    for (const foe of avoid) {
      if (OVERCOMES[foe] !== use || w(foe) < TONGGUAN_MIN) continue;
      const bridge = GENERATES[foe];
      if (!bridge || GENERATES[bridge] !== use) continue;
      const weight = w(bridge);
      const bridgeIsAvoid = avoid.includes(bridge) && !favor.includes(bridge);
      const level = bridgeIsAvoid ? '为忌' : weight >= TONGGUAN_MIN ? '可通' : weight > 0 ? '关弱' : '未通';
      return {
        use, foe, bridge,
        weight,
        present: weight > 0,
        bridgeIsAvoid,
        level,
        usable: level === '可通',
        note: '相战＝用神与忌神两行各在局中 ≥1.5 分且相克；通关一行＝克方所生、又能生用神的那一行（五行里唯一），只报局中分量，不据此断吉凶',
      };
    }
  }
  return null;
}

function yongshenOf(dayStem, monthBranch, strength, wuxing, branches = []) {
  const roles = elementRoles(dayStem);
  const me = roles.me;
  const weak = strength.level === '身弱' || strength.level === '偏弱';
  const strong = strength.level === '身强' || strength.level === '偏强';

  const baseFavor = weak ? [roles.inMe, me] : strong ? [roles.shi, roles.cai, roles.guan] : [roles.inMe, me, roles.shi];
  const baseAvoid = weak ? [roles.shi, roles.cai, roles.guan] : strong ? [me, roles.inMe] : [roles.guan, roles.cai];
  let favor = baseFavor.slice();
  let avoid = baseAvoid.slice();

  const climate = judgeClimate({ monthBranch, dayStem, wuxing, branches });
  const qt = qtOf(dayStem, monthBranch);
  const arb = arbitrate(climate, baseFavor, baseAvoid);
  if (climate.need && climate.priority === '调候优先') {
    const needEl = climate.need.element;
    if (!favor.includes(needEl)) favor.unshift(needEl);
    avoid = avoid.filter((e) => e !== needEl);
    if (climate.avoidElement && !avoid.includes(climate.avoidElement)) avoid.unshift(climate.avoidElement);
  }

  const roleName = (el) => (el === me ? '比劫' : el === roles.inMe ? '印'
    : el === roles.shi ? '食伤' : el === roles.cai ? '财' : '官杀');
  const expand = {
    比劫: ['比肩', '劫财'], 印: ['正印', '偏印'], 食伤: ['食神', '伤官'],
    财: ['正财', '偏财'], 官杀: ['正官', '七杀'],
  };
  const favorTenGods = Array.from(new Set(favor.flatMap((el) => expand[roleName(el)] || [])));
  const avoidTenGods = Array.from(new Set(avoid.flatMap((el) => expand[roleName(el)] || [])));
  const tongguan = tongguanOf(favor, avoid, wuxing);

  const detail = [
    `日主${dayStem}${me}，${strength.level}（${strength.score} 分）：`,
    weak
      ? `喜${roles.inMe}（印）生身、${me}（比劫）帮身；忌${roles.shi}（食伤）泄、${roles.cai}（财）耗、${roles.guan}（官杀）克。`
      : strong
        ? `喜${roles.shi}（食伤）泄秀、${roles.cai}（财）耗、${roles.guan}（官杀）制；忌${me}（比劫）与${roles.inMe}（印）再助。`
        : '身中和，先取调候与通关，喜忌随大运流年动态变化。',
    `调候：${climate.label}（${(climate.evidence || []).join('、')}）${climate.need ? `，取${climate.need.stem}${climate.need.element}，忌${climate.avoidElement}` : '，气候平和'}。`,
    qt ? `穷通宝鉴：${qt.month}${dayStem}${me}，用神${qt.yong.join('、')}（首取${qt.primary}）。` : '',
    tongguan
      ? `通关：忌${tongguan.foe}克用${tongguan.use}，五行以${tongguan.bridge}为关；局中${tongguan.level === '可通'
        ? `${tongguan.bridge} ${tongguan.weight} 分，关可通`
        : tongguan.level === '关弱'
          ? `仅 ${tongguan.bridge} ${tongguan.weight} 分，关弱`
          : tongguan.level === '为忌'
            ? `${tongguan.bridge} ${tongguan.weight} 分但此行为忌，通关力打折`
            : `未见${tongguan.bridge}，关未通`}（只作结构提示，不据此断吉凶）。`
      : '',
    arb.text,
    arb.clash ? '取舍：本盘按「调候优先、扶抑次之」取用；若你更认同扶抑派，可把调候当环境偏好，强弱判断不受影响。' : '',
  ].filter(Boolean).join('');

  return {
    method: climate.priority === '调候优先' ? '调候优先 + 扶抑校验' : '扶抑为主 + 调候校验',
    level: strength.level,
    favor,
    avoid,
    favorRoles: favor.map(roleName),
    avoidRoles: avoid.map(roleName),
    favorTenGods,
    avoidTenGods,
    tiaohou: { ...climate, ...arb, element: climate.need ? climate.need.element : null },
    climate,
    qt,
    tongguan,
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
  const th = ys.tiaohou || ys.climate || null;
  const scoreEl = (el) => {
    let s = 0;
    if (ys.favor.includes(el)) s += 1;
    if (ys.avoid.includes(el)) s -= 1;
    return s;
  };
  let score = scoreEl(stemEl) * 1.0 + scoreEl(branchEl) * 0.8;
  for (const h of (HIDDEN[branch] || []).slice(1)) {
    score += scoreEl(STEM_ELEMENT[h]) * 0.2;
  }

  const reasons = [];
  if (ys.favor.includes(stemEl)) reasons.push(`天干${stem}${stemEl}为用神`);
  else if (ys.avoid.includes(stemEl)) reasons.push(`天干${stem}${stemEl}为忌神`);
  else reasons.push(`天干${stem}${stemEl}不喜不忌`);
  if (ys.favor.includes(branchEl)) reasons.push(`地支${branch}${branchEl}助用`);
  else if (ys.avoid.includes(branchEl)) reasons.push(`地支${branch}${branchEl}助忌`);

  if (th && th.need && th.priority === '调候优先') {
    const needEl = th.need.element;
    const oppEl = th.avoidElement;
    const cold = String(th.kind).includes('寒');
    if (stemEl === needEl) {
      score += 1.1;
      reasons.push(`${th.label}之局得${stem}${stemEl}，${cold ? '解冻' : '得润'}`);
    } else if (stemEl === oppEl) {
      score -= 0.9;
      reasons.push(`${th.label}之局再逢${stem}${stemEl}，${cold ? '冻木难生' : '燥上加燥'}`);
    }
    if (branchEl === needEl) {
      score += 0.9;
      reasons.push(`地支${branch}${branchEl}合调候`);
    } else if (branchEl === oppEl) {
      score -= 1.0;
      reasons.push(`地支${branch}${branchEl}加重${th.label}`);
    }
    if (cold && (stemEl === '水' || branchEl === '水')) score -= 0.3;
  } else if (th && th.need && (stemEl === th.need.element || branchEl === th.need.element)) {
    reasons.push(`合调候（${th.need.element}）`);
  }

  const godStem = tenGod(frame.dayStem, stem);
  const bonus = ys.favorTenGods.includes(godStem) ? 0.3 : 0;
  const qt = ys.qt || null;
  if (qt && qt.primary && !ys.avoid.includes(STEM_ELEMENT[qt.primary])) {
    if (stem === qt.primary) {
      score += 0.3;
      reasons.push(`天干${stem}正是${qt.branch}月${qt.stem}日的首取（穷通宝鉴）`);
    } else if (qt.yong.includes(stem) && !ys.avoid.includes(STEM_ELEMENT[stem])) {
      score += 0.15;
      reasons.push(`天干${stem}为穷通宝鉴次取`);
    }
  }
  let total = Math.round((score + bonus) * 10) / 10;
  total = Math.max(-4, Math.min(4, total));

  const tier = TIERS.find(([min]) => total >= min)[1];
  return { ganzhi, score: total, tier, stemTenGod: godStem, reasons, note: `${godStem}运，${tier}（${total}）` };
}

function analyzeBaziFrame({ pillars, dayStem, monthBranch, strength, wuxing }) {
  const gods = godStats(pillars, dayStem);
  const month = monthPattern(pillars, dayStem, monthBranch);
  const special = specialPatterns(pillars, dayStem, monthBranch, strength, wuxing, gods);
  const geju = [month, ...special];
  const yongshen = yongshenOf(dayStem, monthBranch, strength, wuxing, Object.values(pillars).map((p) => p.branch));
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

return { tenGod, elementRoles, tongguanOf, scoreLuck, analyzeBaziFrame };
})();

__mods.bazi = (function () {
const { STEMS, BRANCHES, TERM_NAMES, ganzhiName, dayGanzhiIndex, jdToParts, partsToJd, sexagenaryIndex, termWindow, previousJie, nextJie, equationOfTime, formatJd, xunKongOf } = __mods.calendar;
const { resolveAddress } = __mods.geo;
const { computeBaziShensha } = __mods.shensha;
const { assertCivil, daysInMonth } = __mods.validate;
const { applyDst } = __mods.dst;
const { nayinOf } = __mods.nayin;
const { SANHE } = __mods.sanhe;
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

function nayin(ganzhiIdx) {
  return nayinOf(ganzhiIdx).name;
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
  assertCivil(input);
  let { year, month, day, hour = 0, minute = 0, gender = 'male' } = input;
  const lateZi = input.lateZi !== false;
  const useTrueSolar = input.trueSolar !== false;
  const dst = input.dst === false ? { applied: false, note: null } : applyDst({ year, month, day, hour, minute });
  if (dst.applied) {
    year = dst.year; month = dst.month; day = dst.day; hour = dst.hour; minute = dst.minute;
  }

  const civilJd = partsToJd({ year, month, day, hour, minute });
  const geo = input.geo || (input.address ? resolveAddress(input.address) : null);
  const longitude = typeof input.longitude === 'number'
    ? input.longitude
    : (geo && typeof geo.lon === 'number' ? geo.lon : undefined);
  const solar = useTrueSolar ? applyTrueSolar(civilJd, longitude) : { offsetMinutes: 0, jd: civilJd, note: '未启用真太阳时' };
  const jd = solar.jd;

  const terms = termWindow(year, { jieOnly: true });
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

  const JIAO_YEAR_DAYS = 365.2422;
  const JIAO_SCALE = JIAO_YEAR_DAYS / 3;
  const jiaoFromTerm = forward ? nextJieTerm : prevJieTerm;
  const jiaoJd = jd + spanDays * JIAO_SCALE;
  const jiaoParts = jdToParts(jiaoJd);
  const addYearsClamped = (p, n) => {
    const y = p.year + n;
    return { year: y, month: p.month, day: Math.min(p.day, daysInMonth(y, p.month)), hour: p.hour, minute: p.minute };
  };

  const dayun = [];
  const dayunWindows = [];
  for (let i = 1; i <= 8; i++) {
    const idx = (((monthIdx + (forward ? i : -i)) % 60) + 60) % 60;
    const g = ganzhiName(idx);
    const fromJd = partsToJd(addYearsClamped(jiaoParts, (i - 1) * 10));
    const toJd = partsToJd(addYearsClamped(jiaoParts, i * 10));
    dayun.push({
      step: i,
      startAge: startAgeYears + (i - 1) * 10,
      ganzhi: g.name,
      stem: g.stem,
      branch: g.branch,
      stemTenGod: tenGod(dayStem, g.stem),
      nayin: nayin(idx),
      fromDate: formatJd(fromJd),
      toDate: formatJd(toJd),
    });
    dayunWindows.push({ step: i, ganzhi: g.name, fromJd, toJd });
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

  const monthBranch = pillars.month.branch;

  const shensha = computeBaziShensha(pillars, kongwang);

  for (const key of ['year', 'month', 'day', 'hour']) {
    const pl = pillars[key];
    pl.dishi = changsheng(dayStem, pl.branch);
    pl.zizuo = changsheng(pl.stem, pl.branch);
    pl.kongwang = xunKongOf(pl.ganzhi);
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

  const NATAL_LABEL = { year: '年柱', month: '月柱', day: '日柱', hour: '时柱' };
  const stemOvercomes = (a, b) => OVERCOMES[STEM_ELEMENT[a]] === STEM_ELEMENT[b];
  const tianKeDiChong = (a, b) => {
    if (typeof a !== 'string' || typeof b !== 'string' || a.length < 2 || b.length < 2) return false;
    if (!(a[0] in STEM_ELEMENT) || !(b[0] in STEM_ELEMENT)) return false;
    return (stemOvercomes(a[0], b[0]) || stemOvercomes(b[0], a[0])) && hasPair(BRANCH_CHONG, a[1], b[1]);
  };
  const lichunJd = (y) => {
    const t = termWindow(y, { jieOnly: true }).find((x) => x.index === 2 && jdToParts(x.jd).year === y);
    return t ? t.jd : partsToJd({ year: y, month: 2, day: 4 });
  };
  for (const l of liunian) {
    const yStart = lichunJd(l.year);
    const yEnd = lichunJd(l.year + 1);
    const active = dayunWindows.filter((w) => w.fromJd < yEnd && w.toJd > yStart);
    const signals = [];
    for (const w of active) {
      if (w.ganzhi === l.ganzhi) {
        signals.push({ type: '岁运并临', target: `第${w.step}步大运`, detail: `大运与流年同为${l.ganzhi}` });
      } else if (tianKeDiChong(w.ganzhi, l.ganzhi)) {
        signals.push({ type: '运年反吟', target: `第${w.step}步大运`, detail: `大运${w.ganzhi}与流年${l.ganzhi}天克地冲` });
      }
    }
    for (const key of ['year', 'month', 'day', 'hour']) {
      const g = pillars[key].ganzhi;
      if (!g) continue;
      if (l.ganzhi === g) {
        signals.push({ type: '流年伏吟', target: NATAL_LABEL[key], detail: `流年${l.ganzhi}与${NATAL_LABEL[key]}同干支` });
      } else if (tianKeDiChong(l.ganzhi, g)) {
        signals.push({ type: '流年反吟', target: NATAL_LABEL[key], detail: `流年${l.ganzhi}与${NATAL_LABEL[key]}${g}天克地冲` });
      }
    }
    l.suiyun = {
      dayun: active.map((w) => ({ step: w.step, ganzhi: w.ganzhi })),
      signals,
      note: '只标干支重复与天克地冲这类变动信号，不判吉凶；大运按该年立春到次年立春的区间取，交运落在年内时前后两步并列',
    };
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
      dst: { applied: !!dst.applied, note: dst.note || null },
    },
    solarTime: {
      civilText: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      trueSolarText: formatJd(jd),
      offsetMinutes: solar.offsetMinutes,
      note: dst.applied ? `${dst.note}；${solar.note}` : solar.note,
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
      jiao: {
        at: formatJd(jiaoJd),
        jd: Math.round(jiaoJd * 1e6) / 1e6,
        scaleDaysPerDay: JIAO_SCALE,
        yearDays: JIAO_YEAR_DAYS,
        spanDays: Math.round(spanDays * 1e4) / 1e4,
        from: { name: jiaoFromTerm.name, time: formatJd(jiaoFromTerm.jd) },
        frame: solar.offsetMinutes ? '真太阳时' : '平太阳时',
        offsetMinutes: solar.offsetMinutes,
        note: '三日折一年：出生到节令的真实间隔按 365.2422/3 放大后加到出生时刻；同一比例即「一日折四月、一时辰折十日」，每步大运在同月同日同时刻换',
      },
      list: dayun,
    },
    strength,
    frame,
    climate: frame.yongshen.climate || frame.yongshen.tiaohou || null,
    liunian,
    liunianFrom: thisYear,
  };
}

return { HIDDEN_STEMS, STEM_ELEMENT, BRANCH_ELEMENT, buildRelations, tenGod, nayin, applyTrueSolar, buildBazi };
})();

__mods.liuyao = (function () {
const { STEMS, BRANCHES, toJDN, ganzhiName, dayGanzhiIndex, sexagenaryIndex, xunKongOf } = __mods.calendar;

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
const LIUQIN_NAMES = ['父母', '兄弟', '子孙', '妻财', '官鬼'];
const LIUSHEN_START = { 甲: 0, 乙: 0, 丙: 1, 丁: 1, 戊: 2, 己: 3, 庚: 4, 辛: 4, 壬: 5, 癸: 5 };

const ZHI_CHONG_PAIRS = [['子', '午'], ['丑', '未'], ['寅', '申'], ['卯', '酉'], ['辰', '戌'], ['巳', '亥']];
const ZHI_HE_PAIRS = [['子', '丑'], ['寅', '亥'], ['卯', '戌'], ['辰', '酉'], ['巳', '申'], ['午', '未']];
const CHONG_OF = Object.fromEntries(ZHI_CHONG_PAIRS.flatMap(([a, b]) => [[a, b], [b, a]]));
const TRIGRAM_OPPOSITE = { 乾: '巽', 巽: '乾', 坎: '离', 离: '坎', 艮: '坤', 坤: '艮', 震: '兑', 兑: '震' };

const JIN_TUI_PAIRS = [['寅', '卯'], ['巳', '午'], ['申', '酉'], ['亥', '子'], ['丑', '辰'], ['辰', '未'], ['未', '戌'], ['戌', '丑']];
const JIN_OF = new Map(JIN_TUI_PAIRS);
const TUI_OF = new Map(JIN_TUI_PAIRS.map(([a, b]) => [b, a]));

function jinTuiOf(from, to) {
  if (!from || !to || from === to) return null;
  if (JIN_OF.get(from) === to) return '进';
  if (TUI_OF.get(from) === to) return '退';
  return null;
}

function pairThirds(branches, table) {
  const cnt = new Map();
  for (const b of branches) cnt.set(b, (cnt.get(b) || 0) + 1);
  const hits = [];
  for (const [a, b] of table) {
    const na = cnt.get(a) || 0;
    const nb = cnt.get(b) || 0;
    if (!na && !nb) continue;
    if (na !== 1 || nb !== 1) return null;
    cnt.set(a, 0);
    cnt.set(b, 0);
    hits.push([a, b]);
  }
  return hits.length * 2 === branches.length ? hits : null;
}

function hexBranches(hex) {
  const inner = NAJIA[hex.lower].inner.slice();
  const outer = NAJIA[hex.upper].outer.slice();
  return { inner, outer, all: [...inner, ...outer] };
}

function hexBody(hex) {
  const { inner, outer, all } = hexBranches(hex);
  const chongPairs = pairThirds(all, ZHI_CHONG_PAIRS);
  const hePairs = pairThirds(all, ZHI_HE_PAIRS);
  return {
    name: hex.name,
    upper: hex.upper,
    lower: hex.lower,
    inner,
    outer,
    chong: Boolean(chongPairs),
    he: Boolean(hePairs),
    chongPairs: chongPairs || [],
    hePairs: hePairs || [],
  };
}

function bodyRelations(ben, bian = null, moving = []) {
  const b = hexBody(ben);
  const out = {
    ben: { name: b.name, chong: b.chong, he: b.he, chongPairs: b.chongPairs, hePairs: b.hePairs, inner: b.inner, outer: b.outer },
    bian: null,
    fuYin: { inner: false, outer: false },
    fanYin: { inner: null, outer: null }, // null 或 { by: ['chong'|'pair'] }
    yaoFuYin: [],
    yaoFanYin: [],
    jinTui: [], // [{ position, from, to, type: '进'|'退' }]
  };
  if (!bian) return out;

  const v = hexBody(bian);
  out.bian = { name: v.name, chong: v.chong, he: v.he, chongPairs: v.chongPairs, hePairs: v.hePairs, inner: v.inner, outer: v.outer };

  for (const side of ['inner', 'outer']) {
    const x = b[side];
    const y = v[side];
    const tri = side === 'inner' ? [ben.lower, bian.lower] : [ben.upper, bian.upper];
    const changed = tri[0] !== tri[1];
    if (changed && x.every((z, i) => z === y[i])) {
      out.fuYin[side] = true;
      continue;
    }
    const by = [];
    if (changed && x.every((z, i) => CHONG_OF[z] === y[i])) by.push('chong');
    if (changed && TRIGRAM_OPPOSITE[tri[0]] === tri[1]) by.push('pair');
    if (by.length) out.fanYin[side] = { by };
  }

  for (const p of moving) {
    const i = p - 1;
    if (!(i >= 0 && i < 6)) continue;
    const x = i < 3 ? b.inner[i] : b.outer[i - 3];
    const y = i < 3 ? v.inner[i] : v.outer[i - 3];
    if (x === y) out.yaoFuYin.push(p);
    else if (CHONG_OF[x] === y) out.yaoFanYin.push(p);
    const jt = jinTuiOf(x, y);
    if (jt) out.jinTui.push({ position: p, from: x, to: y, type: jt });
  }
  return out;
}

function bodyLabels(body) {
  if (!body || !body.ben) return [];
  const fuYin = body.fuYin || {};
  const fanYin = body.fanYin || {};
  const yaoFuYin = body.yaoFuYin || [];
  const yaoFanYin = body.yaoFanYin || [];
  const out = [];
  if (body.ben.chong) out.push('六冲卦');
  if (body.ben.he) out.push('六合卦');
  if (body.bian) {
    if (body.bian.chong) out.push('变六冲');
    else if (body.bian.he) out.push('变六合');
  }
  const sides = [['inner', '内卦'], ['outer', '外卦']];
  for (const [k, label] of sides) if (fuYin[k]) out.push(`${label}伏吟`);
  for (const [k, label] of sides) if (fanYin[k]) out.push(`${label}反吟`);
  if (yaoFuYin.length) out.push(`爻伏吟 ${yaoFuYin.join('、')}`);
  if (yaoFanYin.length) out.push(`爻反吟 ${yaoFanYin.join('、')}`);
  const jin = (body.jinTui || []).filter((x) => x.type === '进').map((x) => x.position);
  const tui = (body.jinTui || []).filter((x) => x.type === '退').map((x) => x.position);
  if (jin.length) out.push(`化进神 ${jin.join('、')}`);
  if (tui.length) out.push(`化退神 ${tui.join('、')}`);
  return out;
}

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

const PURE_BY_PALACE = new Map();
for (const h of HEXAGRAM_INDEX.values()) if (h.order === 0) PURE_BY_PALACE.set(h.palace, h);

const YONGSHEN_RULES = Object.freeze({
  wealth: { liuqin: '妻财', ask: '求财、收入、订单' },
  career: { liuqin: '官鬼', ask: '工作、职位、考核' },
  health: { liuqin: '官鬼', ask: '病与压力（子孙为医药）' },
  study: { liuqin: '父母', ask: '考试、证书、文书合同' },
  love: { liuqin: null, ask: '感情：男看妻财、女看官鬼' },
  travel: { liuqin: null, ask: '出行以世爻为用，父母为舟车' },
  general: { liuqin: null, ask: '未指明所问之事' },
});

const WUXING_SAY = {
  飞生伏: '飞神生伏神，伏神借得上力',
  伏生飞: '伏神生飞神，力气往外泄',
  飞克伏: '飞神克伏神，伏神受压难出',
  伏克飞: '伏神克飞神，伏神能自出',
  比和: '飞伏比和，同气相求',
};

const RELATION_LABEL = {
  飞生伏: '伏神得飞神生',
  伏生飞: '伏神泄气于飞神',
  飞克伏: '伏神受飞神克',
  伏克飞: '伏神克飞神可出',
  比和: '飞伏比和',
};

function wuxingBetween(min, max) {
  if (GENERATES[max] === min) return '飞生伏';
  if (GENERATES[min] === max) return '伏生飞';
  if (OVERCOMES[max] === min) return '飞克伏';
  if (OVERCOMES[min] === max) return '伏克飞';
  return '比和';
}

const sideOf = (position) => (position <= 3 ? 'inner' : 'outer');

function yongshenOf(result, opts = {}) {
  const r = result && typeof result === 'object' ? result : {};
  const ben = r.ben && typeof r.ben === 'object' ? r.ben : {};
  const lines = Array.isArray(ben.lines) ? ben.lines : [];
  const direction = YONGSHEN_RULES[opts.direction] ? opts.direction : 'general';
  const rule = YONGSHEN_RULES[direction];
  const gender = opts.gender === 'female' ? 'female' : 'male';
  const body = r.body && typeof r.body === 'object' ? r.body : {};
  const kongArr = Array.isArray(r.xunKong)
    ? r.xunKong
    : (typeof r.xunKong === 'string' ? r.xunKong.split('') : []);

  const direct = LIUQIN_NAMES.includes(opts.liuqin) ? opts.liuqin : null;
  const byShi = !direct && direction === 'travel';
  const liuqinName = direct || (byShi ? '世' : (direction === 'love' ? (gender === 'female' ? '官鬼' : '妻财') : rule.liuqin));
  const base = {
    direction,
    gender,
    ask: rule.ask,
    byShi,
    liuqin: liuqinName,
    found: [],
    missing: false,
    fushen: [],
    labels: [],
  };
  if (!liuqinName) { base.labels = ['用神未取（未指明所问之事）']; return base; }

  const found = byShi
    ? lines.filter((l) => l.position === ben.shi)
    : lines.filter((l) => l.liuqin === liuqinName);
  base.found = found.map((l) => ({
    position: l.position,
    name: l.name,
    liuqin: l.liuqin,
    branch: l.branch,
    element: l.element,
    ganzhi: l.ganzhi,
    moving: Boolean(l.moving),
    liushen: l.liushen,
    shi: l.position === ben.shi,
    ying: l.position === ben.ying,
    kong: kongArr.includes(l.branch),
  }));

  const labels = [];
  const label = byShi ? '用神 世爻' : `用神 ${liuqinName}`;
  labels.push(label);
  const jin = (body.jinTui || []).filter((x) => x.type === '进').map((x) => x.position);
  const tui = (body.jinTui || []).filter((x) => x.type === '退').map((x) => x.position);
  const yaoFu = body.yaoFuYin || [];
  const yaoFan = body.yaoFanYin || [];

  if (found.length) {
    labels.push(`${label}在 ${found.map((l) => `${l.position}爻`).join('、')}`);
    if (found.length > 1) labels.push(`用神两现 ${found.map((l) => l.position).join('、')}`);
    if (found.some((l) => l.position === ben.shi)) labels.push('用神持世');
    if (found.some((l) => l.position === ben.ying)) labels.push('用神临应');
    if (found.some((l) => l.moving)) labels.push('用神发动');
    if (found.some((l) => kongArr.includes(l.branch))) labels.push('用神空亡');
    if (found.some((l) => jin.includes(l.position))) labels.push('用神化进神');
    if (found.some((l) => tui.includes(l.position))) labels.push('用神化退神');
    if (found.some((l) => yaoFu.includes(l.position))) labels.push('用神爻伏吟');
    if (found.some((l) => yaoFan.includes(l.position))) labels.push('用神爻反吟');
  } else {
    base.missing = true;
    const palace = String(ben.palace || '').replace(/宫$/, '');
    const pure = PURE_BY_PALACE.get(palace) || null;
    if (pure) {
      for (let i = 0; i < 6; i++) {
        const isInner = i < 3;
        const nj = NAJIA[isInner ? pure.lower : pure.upper];
        const branch = isInner ? nj.inner[i] : nj.outer[i - 3];
        const gan = isInner ? nj.gan[0] : nj.gan[1];
        const element = BRANCH_ELEMENT[branch];
        if (liuqin(pure.palaceElement, element) !== liuqinName) continue;
        const fei = lines[i] || null;
        const relation = fei ? wuxingBetween(element, fei.element) : null;
        base.fushen.push({
          position: i + 1,
          liuqin: liuqinName,
          branch,
          element,
          ganzhi: gan + branch,
          relation,
          fei: fei ? { position: fei.position, liuqin: fei.liuqin, branch: fei.branch, element: fei.element, ganzhi: fei.ganzhi } : null,
        });
      }
    }
    if (base.fushen.length) {
      labels.push(`用神不上卦·伏于 ${base.fushen.map((f) => `${f.position}爻`).join('、')}`);
      if (base.fushen.length > 1) labels.push(`伏神两现 ${base.fushen.map((f) => f.position).join('、')}`);
      const rels = [...new Set(base.fushen.map((f) => f.relation).filter(Boolean))];
      for (const rel of rels) labels.push(RELATION_LABEL[rel] || `伏神${rel}`);
    } else {
      labels.push('用神不上卦');
    }
  }

  const sides = found.length ? [...new Set(found.map((l) => sideOf(l.position)))] : [];
  if (body.ben) {
    if (body.ben.chong) labels.push('用神在六冲卦');
    if (body.ben.he) labels.push('用神在六合卦');
    if (body.bian && body.bian.chong) labels.push('用神逢变六冲');
    if (body.bian && body.bian.he) labels.push('用神逢变六合');
  }
  for (const side of sides) {
    if (body.fuYin && body.fuYin[side]) labels.push(`用神在${side === 'inner' ? '内' : '外'}卦伏吟`);
    if (body.fanYin && body.fanYin[side]) {
      const by = (body.fanYin[side].by || []).includes('chong') ? '地支全冲' : '八卦正对';
      labels.push(`用神在${side === 'inner' ? '内' : '外'}卦反吟`);
      labels.push(`反吟来源：${by}`);
    }
  }

  base.labels = labels;
  base.relationSay = base.fushen.map((f) => WUXING_SAY[f.relation]).filter(Boolean);
  base.side = sides.length === 1 ? (sides[0] === 'inner' ? '内卦' : '外卦') : null;
  return base;
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

  const dayIdx = sexagenaryIndex(STEMS.indexOf(dayGanZhi.stem), BRANCHES.indexOf(dayGanZhi.branch));
  const xun = dayIdx >= 0 ? Math.floor(dayIdx / 10) : -1;
  const xunKong = xunKongOf(`${dayGanZhi.stem}${dayGanZhi.branch}`);
  const xunShou = xun >= 0 ? ganzhiName(xun * 10).name : '';

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
    xunShou,
    xunKong,
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
    body: (() => {
      const body = bodyRelations(ben, bian, moving.map((i) => i + 1));
      body.labels = bodyLabels(body);
      return body;
    })(),
  };
}

const ZHI_ELEMENT = {
  子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火',
  午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水',
};
const ELEMENT_SHENG = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const ELEMENT_KE = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };
const MONTH_STATE_ORDER = ['旺', '相', '休', '囚', '死'];
const MONTH_STATE_SAY = {
  旺: '与月令同气，当令得时',
  相: '受月令之生，气有余',
  休: '生月令而气泄，力减',
  囚: '克月令而力困',
  死: '被月令所克，气受制',
};
const DAY_RELATION_ORDER = ['日生', '日克', '比和', '泄', '耗'];
const DAY_RELATION_SAY = {
  日生: '日辰生扶，当天有人托着',
  日克: '日辰克制，当天被压一头',
  比和: '与日辰同气，当天得到同类之助',
  泄: '生扶日辰，气往外走',
  耗: '克制日辰，力有所耗',
};

function zhiElementOf(branch) {
  return ZHI_ELEMENT[branch] || null;
}

function monthStateOf(element, monthElement) {
  if (!element || !monthElement) return 'unknown';
  if (element === monthElement) return '旺';
  if (ELEMENT_SHENG[monthElement] === element) return '相';
  if (ELEMENT_SHENG[element] === monthElement) return '休';
  if (ELEMENT_KE[element] === monthElement) return '囚';
  if (ELEMENT_KE[monthElement] === element) return '死';
  return 'unknown';
}

function dayRelationOf(element, dayElement) {
  if (!element || !dayElement) return 'unknown';
  if (element === dayElement) return '比和';
  if (ELEMENT_SHENG[dayElement] === element) return '日生';
  if (ELEMENT_KE[dayElement] === element) return '日克';
  if (ELEMENT_SHENG[element] === dayElement) return '泄';
  if (ELEMENT_KE[element] === dayElement) return '耗';
  return 'unknown';
}

function yongshenStrength(result, useGod, opts = {}) {
  if (!useGod || !Array.isArray(useGod.found) || !useGod.found.length) return null;
  const monthBranch = opts.monthBranch || null;
  const dayBranch = opts.dayBranch || (result && result.dayGanZhi ? result.dayGanZhi.branch : null);
  if (!monthBranch && !dayBranch) return null;
  const monthElement = monthBranch ? zhiElementOf(monthBranch) : null;
  const dayElement = dayBranch ? zhiElementOf(dayBranch) : null;
  const kong = Array.isArray(result && result.xunKong)
    ? result.xunKong
    : (result && typeof result.xunKong === 'string' ? result.xunKong.split('') : []);

  const lines = useGod.found.map((l) => {
    const element = l.element || zhiElementOf(l.branch);
    const monthChong = !!(monthBranch && CHONG_OF[l.branch] === monthBranch);
    const dayChong = !!(dayBranch && CHONG_OF[l.branch] === dayBranch);
    const monthState = monthStateOf(element, monthElement);
    const dayRelation = dayRelationOf(element, dayElement);
    const isEmpty = kong.includes(l.branch);
    return {
      position: l.position,
      branch: l.branch,
      element,
      monthState,
      monthSay: MONTH_STATE_SAY[monthState] || '',
      monthChong,
      dayRelation,
      daySay: DAY_RELATION_SAY[dayRelation] || '',
      dayChong,
      kong: isEmpty,
      moving: !!l.moving,
      chongTag: monthChong ? '月破'
        : dayChong ? (isEmpty ? '冲空' : (l.moving ? '逢日辰冲' : '暗动')) : '',
    };
  });

  const labels = [];
  const states = [...new Set(lines.map((l) => l.monthState))].filter((x) => x !== 'unknown');
  states.sort((a, b) => MONTH_STATE_ORDER.indexOf(a) - MONTH_STATE_ORDER.indexOf(b));
  for (const st of states) labels.push(`用神月建${st}`);
  if (lines.some((l) => l.monthChong)) labels.push('用神月破');
  const rels = [...new Set(lines.map((l) => l.dayRelation))].filter((x) => x !== 'unknown');
  rels.sort((a, b) => DAY_RELATION_ORDER.indexOf(a) - DAY_RELATION_ORDER.indexOf(b));
  for (const rel of rels) {
    labels.push(rel === '日生' ? '用神得日辰生'
      : rel === '日克' ? '用神受日辰克'
        : rel === '比和' ? '用神与日辰比和'
          : rel === '泄' ? '用神泄于日辰' : '用神耗日辰');
  }
  for (const tag of [...new Set(lines.map((l) => l.chongTag))].filter(Boolean)) {
    labels.push(tag === '月破' ? '' : `用神${tag}`);
  }
  const clean = labels.filter(Boolean).filter((x, i, arr) => arr.indexOf(x) === i);

  return {
    month: monthBranch ? { branch: monthBranch, element: monthElement } : null,
    day: dayBranch ? { branch: dayBranch, element: dayElement } : null,
    lines,
    labels: clean,
    note: '月建主这一段的旺衰，日辰看当天是扶是克；两处都只给状态标签，不折成分数，也不单独断吉凶。',
  };
}

const FUSHEN_VERDICTS = ['可出', '有助有压', '受压难出', '未得助'];

function fushenAccess(result, useGod, opts = {}) {
  if (!useGod || !Array.isArray(useGod.fushen) || !useGod.fushen.length) return null;
  const monthBranch = opts.monthBranch || null;
  const dayBranch = opts.dayBranch || (result && result.dayGanZhi ? result.dayGanZhi.branch : null);
  const monthElement = monthBranch ? zhiElementOf(monthBranch) : null;
  const dayElement = dayBranch ? zhiElementOf(dayBranch) : null;
  const kong = Array.isArray(result && result.xunKong)
    ? result.xunKong
    : (result && typeof result.xunKong === 'string' ? result.xunKong.split('') : []);

  const items = useGod.fushen.map((f) => {
    const element = f.element || zhiElementOf(f.branch);
    const relation = f.relation || null;
    const monthState = monthStateOf(element, monthElement);
    const monthChong = !!(monthBranch && CHONG_OF[f.branch] === monthBranch);
    const dayRelation = dayRelationOf(element, dayElement);
    const kongz = kong.includes(f.branch);

    const supports = [];
    if (relation === '飞生伏') supports.push('飞神生伏');
    if (relation === '伏克飞') supports.push('伏神克飞');
    if (dayRelation === '日生') supports.push('日辰生伏');
    if (dayRelation === '比和') supports.push('日辰比和');
    if (monthState === '旺') supports.push('月建同气');
    if (monthState === '相') supports.push('月建相生');

    const pressures = [];
    if (relation === '飞克伏') pressures.push('飞神克伏');
    if (dayRelation === '日克') pressures.push('日辰克伏');
    if (monthChong) pressures.push('月破');

    const verdict = !relation ? '飞伏未知'
      : supports.length && pressures.length ? '有助有压'
        : supports.length ? '可出'
          : pressures.length ? '受压难出' : '未得助';
    const basis = monthBranch && dayBranch ? '月建日辰' : monthBranch ? '月建' : dayBranch ? '日辰' : '飞伏';

    const facts = [];
    if (relation) facts.push(`飞伏${relation}`);
    if (monthBranch) facts.push(`月建${monthBranch}（${monthElement}）${monthState}${monthChong ? '、月破' : ''}`);
    if (dayBranch) facts.push(`日辰${dayBranch}（${dayElement}）${dayRelation}`);
    if (kongz) facts.push('伏神旬空');
    const say = `第${f.position}爻${f.branch}${element}：${facts.join('，')} → ${verdict}` +
      `（助：${supports.join('、') || '无'}；压：${pressures.join('、') || '无'}）`;

    return {
      position: f.position,
      branch: f.branch,
      element,
      relation,
      fei: f.fei || null,
      monthState,
      monthChong,
      dayRelation,
      kong: kongz,
      basis,
      supports,
      pressures,
      verdict,
      say,
    };
  });

  return {
    month: monthBranch ? { branch: monthBranch, element: monthElement } : null,
    day: dayBranch ? { branch: dayBranch, element: dayElement } : null,
    items,
    labels: items.map((it) => `第${it.position}爻${it.verdict}`),
    note: '出伏只看「有没有助、有没有压」两件事：飞生伏、伏克飞、日辰生/比和、月建旺/相算助；飞克伏、日辰克、月破算压。四档只把条件并列，不排各家优先级；旬空只标出，不并入档位，也不出应期。',
  };
}

function hexagramStrength(result, opts = {}) {
  const rows = (result && result.ben && Array.isArray(result.ben.lines))
    ? result.ben.lines
    : (result && Array.isArray(result.lines) ? result.lines : []);
  if (!rows.length) return null;
  const monthBranch = opts.monthBranch || null;
  const dayBranch = opts.dayBranch || (result.dayGanZhi ? result.dayGanZhi.branch : null);
  if (!monthBranch && !dayBranch) return null;
  const monthElement = monthBranch ? zhiElementOf(monthBranch) : null;
  const dayElement = dayBranch ? zhiElementOf(dayBranch) : null;
  const kong = Array.isArray(result.xunKong)
    ? result.xunKong
    : (typeof result.xunKong === 'string' ? result.xunKong.split('') : []);
  const shiPos = result.ben ? result.ben.shi : null;
  const yingPos = result.ben ? result.ben.ying : null;

  const lines = rows.map((l) => {
    const element = l.element || zhiElementOf(l.branch);
    const monthChong = !!(monthBranch && CHONG_OF[l.branch] === monthBranch);
    const dayChong = !!(dayBranch && CHONG_OF[l.branch] === dayBranch);
    const monthState = monthStateOf(element, monthElement);
    const dayRelation = dayRelationOf(element, dayElement);
    const isEmpty = kong.includes(l.branch);
    return {
      position: l.position,
      name: l.name,
      branch: l.branch,
      element,
      liuqin: l.liuqin ?? null,
      shi: l.position === shiPos,
      ying: l.position === yingPos,
      moving: !!l.moving,
      kong: isEmpty,
      monthState,
      monthSay: MONTH_STATE_SAY[monthState] || '',
      monthChong,
      dayRelation,
      daySay: DAY_RELATION_SAY[dayRelation] || '',
      dayChong,
      chongTag: monthChong ? '月破'
        : dayChong ? (isEmpty ? '冲空' : (l.moving ? '逢日辰冲' : '暗动')) : '',
    };
  });

  const counts = {};
  for (const st of MONTH_STATE_ORDER) counts[st] = lines.filter((l) => l.monthState === st).length;

  const labels = [];
  for (const st of MONTH_STATE_ORDER) if (counts[st]) labels.push(`全卦${st}${counts[st]}爻`);
  const shiLine = lines.find((l) => l.shi) || null;
  const yingLine = lines.find((l) => l.ying) || null;
  if (shiLine && shiLine.monthState !== 'unknown') labels.push(`世爻月建${shiLine.monthState}`);
  if (yingLine && yingLine.monthState !== 'unknown') labels.push(`应爻月建${yingLine.monthState}`);
  const tagCount = (tag) => lines.filter((l) => l.chongTag === tag).length;
  for (const tag of ['月破', '暗动', '冲空', '逢日辰冲']) {
    const n = tagCount(tag);
    if (n) labels.push(`${tag}${n}爻`);
  }

  return {
    month: monthBranch ? { branch: monthBranch, element: monthElement } : null,
    day: dayBranch ? { branch: dayBranch, element: dayElement } : null,
    lines,
    counts,
    strongest: lines.filter((l) => l.monthState === '旺').map((l) => l.position),
    weakest: lines.filter((l) => l.monthState === '死' || l.monthChong).map((l) => l.position),
    shi: shiLine ? { position: shiLine.position, branch: shiLine.branch, monthState: shiLine.monthState, dayRelation: shiLine.dayRelation } : null,
    ying: yingLine ? { position: yingLine.position, branch: yingLine.branch, monthState: yingLine.monthState, dayRelation: yingLine.dayRelation } : null,
    labels,
    note: '月建主这一段的旺衰、日辰管当天的扶克，六爻逐一给状态；判定与用神旺衰同一套，只多了世应与动爻标记。只报状态、不折分数，也不单独断吉凶。',
  };
}

const JIN_VERDICT = { 旺: '后劲足', 相: '后劲足', 休: '后劲有限', 囚: '后劲有限', 死: '进得虚' };
const TUI_VERDICT = { 旺: '退得缓', 相: '退得缓', 休: '退得实', 囚: '退得实', 死: '退得实' };

function jinTuiPower(result, opts = {}) {
  const items = result && result.body && Array.isArray(result.body.jinTui) ? result.body.jinTui : [];
  if (!items.length) return null;
  const rows = result && result.ben && Array.isArray(result.ben.lines) ? result.ben.lines : [];
  const monthBranch = opts.monthBranch || null;
  const dayBranch = opts.dayBranch || (result && result.dayGanZhi ? result.dayGanZhi.branch : null);
  const monthElement = monthBranch ? zhiElementOf(monthBranch) : null;
  const dayElement = dayBranch ? zhiElementOf(dayBranch) : null;
  const kong = Array.isArray(result && result.xunKong)
    ? result.xunKong
    : (result && typeof result.xunKong === 'string' ? result.xunKong.split('') : []);

  const lines = items.map((x) => {
    const line = rows[x.position - 1] || null;
    const element = (line && line.element) || zhiElementOf(x.from);
    const monthState = monthStateOf(element, monthElement);
    const monthChong = !!(monthBranch && CHONG_OF[x.from] === monthBranch);
    const dayChong = !!(dayBranch && CHONG_OF[x.from] === dayBranch);
    const dayRelation = dayRelationOf(element, dayElement);
    const isEmpty = kong.includes(x.from);
    const verdict = !monthBranch ? '只报趋势'
      : monthChong ? '月破失据'
        : ((x.type === '进' ? JIN_VERDICT : TUI_VERDICT)[monthState] || '未定');
    const monthSay = monthBranch
      ? `月建${monthBranch}（${monthElement}）对${element}为${monthState}`
      : '缺月建，只看日辰';
    const daySay = dayRelation === 'unknown' ? '' : `日辰${dayBranch}（${dayElement}）${dayRelation}`;
    const extra = [monthChong ? '又遭月破' : '', isEmpty ? '旬空待填' : '', dayChong ? '逢日辰冲' : ''].filter(Boolean);
    return {
      position: x.position,
      from: x.from,
      to: x.to,
      type: x.type,
      element,
      monthState,
      monthChong,
      dayRelation,
      dayChong,
      kong: isEmpty,
      verdict,
      say: `${x.from}→${x.to}（${x.type}）：${monthSay}${daySay ? `，${daySay}` : ''}${extra.length ? `，${extra.join('、')}` : ''} → ${verdict}`,
    };
  });

  return {
    month: monthBranch ? { branch: monthBranch, element: monthElement } : null,
    day: dayBranch ? { branch: dayBranch, element: dayElement } : null,
    lines,
    labels: lines.map((l) => `${l.position}爻化${l.type}·${l.verdict}`),
    note: '进退只说这一爻往哪边走；力重是把它放回月建日辰，看有没有托着——得令则进得动、退得慢，失令则进得虚、退得实，月破压过一切。仍不直接定吉凶：用神化进为喜，忌神化进反而是忌。',
  };
}

return { jinTuiOf, hexBody, bodyRelations, bodyLabels, HEXAGRAM_COUNT, hexagramFromBits, YONGSHEN_RULES, yongshenOf, tossLines, buildLiuyao, zhiElementOf, monthStateOf, dayRelationOf, yongshenStrength, FUSHEN_VERDICTS, fushenAccess, hexagramStrength, jinTuiPower };
})();

__mods.ziwei = (function () {
const { STEMS, BRANCHES, ganzhiName, sexagenaryIndex, jdToParts, partsToJd, formatJd } = __mods.calendar;
const { solarToLunar } = __mods.lunar;
const { applyTrueSolar } = __mods.bazi;
const { applyDst } = __mods.dst;
const { assertCivil } = __mods.validate;
const { nayinOf } = __mods.nayin;
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

function nayinElement(ganzhiIdx) {
  return nayinOf(ganzhiIdx);
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

const ZIWEI_SCHOOL_DEFAULTS = Object.freeze({
  brightnessSchool: 'default',
  gengYearSihua: 'GYWYT',
  tianmaSchool: 'year-branch',
  tiankongSchool: 'off',
  jiekongSchool: 'off',
  kuiyueSchool: 'qs1',
  tianshiTianshang: 'normal',
  changshengSchool: 'yin-yang-shun-ni',
  lateZishi: 'current-day',
});

const ZIWEI_SCHOOL_OPTIONS = Object.freeze({
  brightnessSchool: ['default', 'QS', 'XD1', 'ZZ', 'XD2'],
  gengYearSihua: ['GYWYT', 'GYWTY', 'GYWFT', 'GYWFX', 'GYWTX'],
  tianmaSchool: ['year-branch', 'month-branch'],
  tiankongSchool: ['off', 'normal', 'shun-jia-shi'],
  jiekongSchool: ['off', 'double', 'single', 'zhanyan'],
  kuiyueSchool: ['qs1', 'qs2', 'zhong-yiming', 'network'],
  tianshiTianshang: ['normal', 'zhongzhou'],
  changshengSchool: ['yin-yang-shun-ni', 'shui-tu', 'huo-tu'],
  lateZishi: ['current-day', 'next-day', 'all-current', 'day-cur-time-next'],
});

function ziweiSchoolsOf(input = {}) {
  const nested = input.schools && typeof input.schools === 'object' ? input.schools : {};
  const out = {};
  for (const [key, allowed] of Object.entries(ZIWEI_SCHOOL_OPTIONS)) {
    const raw = input[key] !== undefined ? input[key] : nested[key];
    out[key] = allowed.includes(raw) ? raw : ZIWEI_SCHOOL_DEFAULTS[key];
  }
  return out;
}

const BRIGHTNESS_LEVELS_7 = ['', '庙', '旺', '得', '利', '平', '不', '陷'];
const BRIGHTNESS_LEVELS_5 = ['', '庙', '旺', '平', '闲', '陷'];
const BRIGHTNESS_SCHOOLS = {
  QS: {
    levels: BRIGHTNESS_LEVELS_7,
    rows: {
      紫微: [5, 1, 2, 2, 3, 2, 1, 1, 2, 2, 3, 2],
      天机: [1, 7, 3, 2, 4, 5, 1, 7, 3, 2, 4, 5],
      太阳: [7, 6, 2, 1, 2, 2, 2, 3, 3, 5, 6, 7],
      武曲: [2, 1, 3, 4, 1, 5, 2, 1, 3, 4, 1, 5],
      天同: [2, 6, 4, 5, 5, 1, 7, 6, 2, 5, 5, 1],
      廉贞: [5, 4, 1, 5, 4, 7, 5, 4, 1, 5, 4, 7],
      天府: [1, 1, 1, 3, 1, 3, 2, 1, 3, 2, 1, 3],
      太阴: [1, 1, 2, 7, 7, 7, 6, 6, 4, 2, 2, 1],
      贪狼: [2, 1, 5, 4, 1, 7, 2, 1, 5, 4, 1, 7],
      巨门: [2, 6, 1, 1, 7, 2, 2, 6, 1, 1, 7, 2],
      天相: [1, 1, 1, 7, 3, 3, 1, 3, 1, 7, 3, 3],
      天梁: [1, 2, 1, 1, 1, 3, 1, 2, 7, 3, 1, 7],
      七杀: [2, 1, 1, 2, 1, 5, 2, 1, 1, 2, 1, 5],
      破军: [1, 2, 3, 7, 2, 5, 1, 2, 3, 7, 2, 5],
    },
  },
  XD1: {
    levels: BRIGHTNESS_LEVELS_7,
    rows: {
      紫微: [5, 1, 1, 2, 3, 2, 1, 1, 2, 2, 3, 2],
      天机: [1, 7, 3, 2, 4, 5, 1, 7, 3, 2, 4, 5],
      太阳: [7, 6, 2, 1, 2, 2, 1, 3, 4, 5, 7, 7],
      武曲: [2, 1, 3, 4, 1, 5, 2, 1, 3, 4, 1, 5],
      天同: [2, 6, 4, 1, 5, 1, 7, 6, 2, 5, 5, 1],
      廉贞: [5, 4, 1, 5, 4, 7, 5, 4, 1, 5, 4, 7],
      天府: [1, 1, 1, 3, 2, 3, 2, 1, 3, 2, 2, 3],
      太阴: [1, 1, 6, 7, 7, 7, 7, 5, 4, 2, 2, 1],
      贪狼: [2, 1, 5, 3, 1, 7, 2, 1, 5, 4, 1, 7],
      巨门: [2, 6, 1, 1, 5, 5, 2, 5, 1, 1, 5, 2],
      天相: [1, 1, 1, 7, 5, 3, 3, 3, 1, 7, 3, 3],
      天梁: [1, 2, 1, 2, 1, 7, 1, 2, 7, 3, 1, 7],
      七杀: [2, 1, 1, 2, 3, 5, 2, 1, 1, 2, 1, 5],
      破军: [1, 2, 3, 7, 2, 5, 1, 2, 3, 7, 2, 5],
    },
  },
  ZZ: {
    levels: BRIGHTNESS_LEVELS_5,
    rows: {
      紫微: [3, 1, 1, 2, 5, 2, 1, 1, 2, 3, 4, 2],
      天机: [1, 5, 2, 2, 1, 3, 1, 5, 3, 2, 1, 3],
      太阳: [5, 5, 2, 1, 2, 2, 1, 3, 4, 4, 5, 5],
      武曲: [2, 1, 4, 5, 1, 3, 2, 1, 3, 2, 1, 3],
      天同: [2, 5, 4, 1, 3, 1, 5, 5, 2, 3, 3, 1],
      廉贞: [3, 2, 1, 4, 2, 5, 3, 1, 1, 3, 2, 5],
      天府: [1, 1, 1, 3, 1, 3, 2, 1, 3, 5, 1, 2],
      太阴: [1, 1, 4, 5, 4, 5, 5, 3, 3, 2, 2, 1],
      贪狼: [2, 1, 3, 4, 1, 5, 2, 1, 3, 3, 1, 5],
      巨门: [2, 2, 1, 1, 3, 3, 2, 5, 1, 1, 2, 2],
      天相: [1, 1, 1, 5, 2, 3, 2, 4, 1, 5, 4, 3],
      天梁: [1, 2, 1, 1, 2, 5, 1, 2, 5, 4, 2, 5],
      七杀: [2, 1, 1, 5, 2, 3, 2, 2, 1, 4, 1, 3],
      破军: [1, 2, 5, 2, 2, 4, 1, 1, 5, 5, 2, 3],
    },
  },
  XD2: {
    levels: BRIGHTNESS_LEVELS_5,
    rows: {
      紫微: [4, 1, 1, 2, 4, 2, 1, 1, 2, 3, 5, 2],
      天机: [1, 5, 2, 2, 2, 3, 1, 5, 2, 2, 2, 3],
      太阳: [5, 5, 2, 1, 2, 2, 1, 2, 3, 3, 5, 5],
      武曲: [2, 1, 3, 5, 1, 3, 2, 1, 3, 2, 1, 3],
      天同: [2, 5, 3, 1, 2, 1, 5, 5, 2, 3, 3, 1],
      廉贞: [3, 2, 1, 4, 2, 5, 3, 1, 1, 3, 2, 5],
      天府: [2, 1, 1, 3, 1, 2, 2, 1, 2, 3, 1, 2],
      太阴: [1, 1, 5, 5, 5, 5, 5, 5, 2, 2, 1, 1],
      贪狼: [2, 1, 3, 2, 1, 5, 2, 1, 3, 2, 1, 5],
      巨门: [2, 5, 1, 2, 5, 1, 2, 5, 1, 2, 5, 1],
      天相: [1, 1, 1, 5, 2, 3, 2, 3, 1, 5, 5, 3],
      天梁: [1, 2, 1, 1, 2, 5, 1, 2, 5, 3, 2, 5],
      七杀: [2, 2, 1, 5, 1, 3, 2, 2, 1, 3, 1, 3],
      破军: [1, 1, 5, 2, 2, 3, 1, 1, 5, 5, 2, 3],
    },
  },
};

function schoolBrightness(name, branchIndex, school = 'default') {
  const table = BRIGHTNESS_SCHOOLS[school];
  if (!table || !table.rows[name]) return BRIGHTNESS[name] ? BRIGHTNESS[name][fix(branchIndex)] : undefined;
  const level = table.rows[name][fix(branchIndex)];
  return level ? table.levels[level] : undefined;
}

const GENG_MUTAGEN = {
  GYWYT: { 太阳: '禄', 武曲: '权', 太阴: '科', 天同: '忌' },
  GYWTY: { 太阳: '禄', 武曲: '权', 天同: '科', 太阴: '忌' },
  GYWFT: { 太阳: '禄', 武曲: '权', 天府: '科', 天同: '忌' },
  GYWFX: { 太阳: '禄', 武曲: '权', 天府: '科', 天相: '忌' },
  GYWTX: { 太阳: '禄', 武曲: '权', 天同: '科', 天相: '忌' },
};

function mutagenOf(stem, schools) {
  if (stem === '庚') return GENG_MUTAGEN[schools.gengYearSihua] || MUTAGEN.庚;
  return MUTAGEN[stem] ?? {};
}

const KUI_YUE_SCHOOLS = {
  qs2: {
    甲: [1, 7], 戊: [1, 7], 庚: [6, 2], 乙: [0, 8], 己: [0, 8],
    丙: [11, 9], 丁: [11, 9], 辛: [6, 2], 壬: [5, 3], 癸: [5, 3],
  },
  'zhong-yiming': {
    甲: [1, 7], 戊: [1, 7], 庚: [2, 6], 乙: [0, 8], 己: [0, 8],
    丙: [11, 9], 丁: [11, 9], 辛: [2, 6], 壬: [5, 3], 癸: [5, 3],
  },
  network: {
    甲: [1, 7], 戊: [1, 7], 庚: [1, 7], 乙: [0, 8], 己: [0, 8],
    丙: [11, 9], 丁: [11, 9], 辛: [6, 2], 壬: [3, 5], 癸: [3, 5],
  },
};

const JIEKONG = {
  single: { 甲: 8, 乙: 6, 丙: 4, 丁: 2, 戊: 0, 己: 9, 庚: 7, 辛: 5, 壬: 3, 癸: 1 },
  double: {
    甲: [8, 9], 乙: [7, 6], 丙: [4, 5], 丁: [3, 2], 戊: [0, 1],
    己: [9, 8], 庚: [6, 7], 辛: [5, 4], 壬: [2, 3], 癸: [1, 0],
  },
  zhanyan: { 甲: 8, 乙: 6, 丙: 4, 丁: 2, 戊: 10, 己: 9, 庚: 7, 辛: 5, 壬: 3, 癸: 11 },
};

const LUCUN = { 甲: 2, 乙: 3, 丙: 5, 丁: 6, 戊: 5, 己: 6, 庚: 8, 辛: 9, 壬: 11, 癸: 0 };
const KUI_YUE = {
  甲: [1, 7], 戊: [1, 7], 庚: [1, 7], 乙: [0, 8], 己: [0, 8],
  丙: [11, 9], 丁: [11, 9], 辛: [6, 2], 壬: [3, 5], 癸: [3, 5],
};
KUI_YUE_SCHOOLS.qs1 = KUI_YUE;

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

const LEAP_POLICIES = ['split', 'next', 'prev'];

function leapPolicyOf(input) {
  if (input && LEAP_POLICIES.includes(input.leapMonth)) return input.leapMonth;
  return input && input.leapAsNext ? 'next' : 'split';
}

function effectiveLunarMonth(raw, policy) {
  if (!raw || !raw.isLeap) return raw ? raw.month : 0;
  if (policy === 'next') return (raw.month % 12) + 1;
  if (policy === 'split') return raw.day <= 15 ? raw.month : (raw.month % 12) + 1;
  return raw.month;
}

function buildZiwei(input) {
  assertCivil(input);
  const schools = ziweiSchoolsOf(input);
  const { year: cy, month: cm, day: cd, hour: ch = 0, minute: cmin = 0, gender = 'male' } = input;
  const useTrueSolar = input.trueSolar !== false;
  const geo = input.geo || (input.address ? resolveAddress(input.address) : null);
  const longitude = typeof input.longitude === 'number'
    ? input.longitude
    : (geo && typeof geo.lon === 'number' ? geo.lon : undefined);
  const civilJdRaw = partsToJd({ year: cy, month: cm, day: cd, hour: ch, minute: cmin });
  const dst = input.dst === false ? { applied: false, note: null } : applyDst({ year: cy, month: cm, day: cd, hour: ch, minute: cmin });
  const civilJd = dst.applied ? partsToJd({ year: dst.year, month: dst.month, day: dst.day, hour: dst.hour, minute: dst.minute }) : civilJdRaw;
  const solar = useTrueSolar
    ? applyTrueSolar(civilJd, longitude)
    : { offsetMinutes: 0, jd: civilJd, note: '未启用真太阳时' };
  let eff = jdToParts(solar.jd);
  if (schools.lateZishi === 'next-day' && eff.hour >= 23) eff = jdToParts(solar.jd + 1);
  const year = eff.year;
  const month = eff.month;
  const day = eff.day;
  const hour = eff.hour;
  const minute = eff.minute;

  const lunarRaw = solarToLunar(year, month, day);
  const leapPolicy = leapPolicyOf(input);
  const lunarMonth = effectiveLunarMonth(lunarRaw, leapPolicy);
  const lunarDay = lunarRaw.day;

  const hb = hourBranchIndex(hour, minute);
  const hourBranch = BRANCHES[hb];

  const yearGanzhi = ganzhiName((((lunarRaw.lunarYear - 4) % 60) + 60) % 60);
  const yearStem = yearGanzhi.stem;
  const yb = BRANCHES.indexOf(yearGanzhi.branch);
  const triad = triadOf(yb);
  const yearYang = STEMS.indexOf(yearStem) % 2 === 0;
  const forward = (yearYang && gender === 'male') || (!yearYang && gender === 'female');
  const kuiyueTable = KUI_YUE_SCHOOLS[schools.kuiyueSchool] || KUI_YUE;

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
      const b = schoolBrightness(name, idx, schools.brightnessSchool);
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
  const [kui, yue] = kuiyueTable[yearStem];
  put(kui, '天魁', '吉星');
  put(yue, '天钺', '吉星');

  const hongluan = fix(3 - yb);
  put(hongluan, '红鸾', '吉星');
  put(hongluan + 6, '天喜', '吉星');
  put(6 - yb, '天哭', '煞星');
  put(6 + yb, '天虚', '煞星');
  put(4 + yb, '龙池', '吉星');
  put(10 - yb, '凤阁', '吉星');
  const maTriad = schools.tianmaSchool === 'month-branch'
    ? triadOf(fix(2 + (lunarMonth - 1)))
    : triad;
  put(TIANMA[maTriad], '天马', '吉星');
  put(XIANCHI[triad], '咸池', '煞星');
  put(HUAGAI[triad], '华盖', '杂曜');
  const dirGroup = directionOf(yb);
  put(GUCHEN[dirGroup], '孤辰', '煞星');
  put(GUASU[dirGroup], '寡宿', '煞星');
  put(posuIndex(yb), '破碎', '煞星');

  if (schools.tiankongSchool !== 'off') {
    put(schools.tiankongSchool === 'shun-jia-shi' ? yb + hb : yb + 1, '天空', '杂曜');
  }
  if (schools.jiekongSchool !== 'off') {
    const jk = JIEKONG[schools.jiekongSchool][yearStem];
    if (Array.isArray(jk)) {
      put(jk[0], '截空', '杂曜');
      put(jk[1], '副截', '杂曜');
    } else {
      put(jk, '截空', '杂曜');
    }
    const nianIndex = (((lunarRaw.lunarYear - 4) % 60) + 60) % 60;
    const decadeStart = nianIndex - (nianIndex % 10);
    put(decadeStart + 10, '旬空', '杂曜');
    put(decadeStart + 11, '副旬', '杂曜');
  }

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

  const swapTianshi = schools.tianshiTianshang === 'zhongzhou' && !forward;
  put(soulIndex - (swapTianshi ? 5 : 7), '天伤', '杂曜');
  put(soulIndex - (swapTianshi ? 7 : 5), '天使', '杂曜');

  const mutagenMap = mutagenOf(yearStem, schools);
  for (const list of starsByBranch) {
    for (const star of list) {
      if (mutagenMap[star.name]) star.mutagen = mutagenMap[star.name];
    }
  }

  const palaceNames = [];
  for (let i = 0; i < 12; i++) palaceNames[fix(soulIndex - i)] = PALACE_NAMES[i];

  const startAge = bureau.number;

  const csStart = schools.changshengSchool === 'huo-tu' && bureau.number === 5
    ? 2
    : CHANGSHENG_START[bureau.number];
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
      liukui: BRANCHES[kuiyueTable[gz.stem][0]],
      liuyue: BRANCHES[kuiyueTable[gz.stem][1]],
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
      leapMonth: leapPolicy,
      leapAsNext: leapPolicy === 'next',
      longitude: longitude ?? null,
      address: input.address || null,
      geo,
      trueSolar: useTrueSolar,
      dst: { applied: !!dst.applied, note: dst.note || null },
      schools: { ...schools },
    },
    schools: { ...schools },
    solarTime: {
      civilText: `${cy}-${String(cm).padStart(2, '0')}-${String(cd).padStart(2, '0')} ${String(ch).padStart(2, '0')}:${String(cmin).padStart(2, '0')}`,
      trueSolarText: formatJd(solar.jd),
      offsetMinutes: solar.offsetMinutes,
      note: dst.applied ? `${dst.note}；${solar.note}` : solar.note,
    },
    lunar: {
      year: lunarRaw.lunarYear,
      month: lunarMonth,
      monthRaw: lunarRaw.month,
      day: lunarDay,
      isLeap: lunarRaw.isLeap,
      leapPolicy,
      monthStart: lunarRaw.monthStart,
      ...(lunarRaw.isLeap ? {
        note: leapPolicy === 'split'
          ? `闰${lunarRaw.month}月按日切分：1–15 按本月、16 起按次月；本盘闰月${lunarDay}日按${lunarMonth}月`
          : leapPolicy === 'next' ? '闰月整月按次月起盘' : '闰月整月按本月起盘',
      } : {}),
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
      mutagen: '生年四化用中州派常用表；庚干可按流派切换（默认阳武阴同，另有同科阴忌、府科、府科相忌、同科相忌）',
      schools: `流派开关：亮度 ${schools.brightnessSchool}、庚干四化 ${schools.gengYearSihua}、天马 ${schools.tianmaSchool}、天空 ${schools.tiankongSchool}、截空 ${schools.jiekongSchool}、魁钺 ${schools.kuiyueSchool}、天伤天使 ${schools.tianshiTianshang}、长生 ${schools.changshengSchool}、晚子时 ${schools.lateZishi}；庚干四化只作用于生年四化`,
      leapMonth: '闰月默认按日切分（1–15 归本月、16 起归次月，主流排盘口径）；可传 leapMonth: next（整月归次月）或 prev（整月归本月），leapAsNext: true 等同 next',
      auxStars: '火铃按年支三合起点顺数至生时；羊陀夹禄存；魁钺按年干；地空亥起子时逆行、地劫顺行；三台八座随辅弼；恩光天贵随昌曲退一位；台辅封诰按时支',
      shensha: '长生、博士随大限顺逆；将前、岁前恒顺行；天伤恒在交友、天使恒在疾厄',
      masters: '命主按命宫地支，身主按生年地支',
      liunian: '流年命宫取该年地支宫；三方四正为本宫与 +4/+8/+6；并给该年所属大限与小限',
      flyComposite: '三方四正取本宫、对宫与两个三合宫共四宫，四宫宫干各化禄权科忌共 16 条，按落宫归堆标会聚（双忌会、禄忌同宫、三化会、自化）；只描会照，不折吉凶',
      changqu: '昌曲落宫只由时支决定，故与丑未的关系（夹/三合/同宫/无关）是结构性结论；absorb 的「清/杂」是启发式标记，依据昌曲化忌与会煞，不是断语',
    },
  };

  chart.patterns = detectPatterns(chart);
  chart.daxianList = daxianList(chart);
  chart.fly = flyStars(chart);
  chart.flyChains = flyChains(chart, { from: '命宫' });
  chart.flyComposite = flyComposite(chart, { from: '命宫' });
  enrichLiunian(chart);
  chart.flow = flowOf(chart, input.asOf);
  chart.patternSummary = {
    count: chart.patterns.length,
    good: chart.patterns.filter((p) => p.tone === 'good').map((p) => p.name),
    neutral: chart.patterns.filter((p) => p.tone === 'neutral').map((p) => p.name),
    bad: chart.patterns.filter((p) => p.tone === 'bad').map((p) => p.name),
    note: '格局只描述结构，不作吉凶断语；同一命盘可并存吉格、中性结构与忌格',
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
  if (lu >= 0 && ma >= 0 && (lu === ma || fix(lu - ma) === 6)) add('禄马交驰', `禄存在${BRANCHES[lu]}，天马在${BRANCHES[ma]}`);

  const huo = starBranchOf(chart, '火星');
  const ling = starBranchOf(chart, '铃星');
  if (fix(soulIdx - 1) === huo && fix(soulIdx + 1) === ling) add('火铃夹命', '火星在命宫前一宫、铃星在后一宫夹命');
  if (fix(soulIdx - 1) === ling && fix(soulIdx + 1) === huo) add('火铃夹命', '铃星与火星夹命');

  const ji = chart.palaces.find((p) => p.stars.some((s) => s.mutagen === '忌'));
  if (ji && lu >= 0 && BRANCHES.indexOf(ji.branch) === lu) {
    add('羊陀夹忌', `化忌与禄存在${ji.branch}同宫，擎羊陀罗夹之`);
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
    if (ba < 0 || bb < 0) return false;
    return (fix(ba + 1) === soulIdx && fix(bb - 1) === soulIdx)
      || (fix(bb + 1) === soulIdx && fix(ba - 1) === soulIdx);
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
  if (jia('擎羊', '陀罗')) add('羊陀夹命', `禄存在${BRANCHES[soulIdx]}守命，擎羊陀罗前后夹之`);

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
  if (lianzhen >= 0 && tianxiang >= 0 && qingyang >= 0
    && lianzhen === tianxiang && qingyang === tianxiang && tianxiang === soulIdx
    && (tianxiang === 0 || tianxiang === 6)) {
    add('刑囚夹印', `廉贞天相同守命宫${BRANCHES[tianxiang]}，擎羊同宫`);
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

const FLY_TYPES = ['禄', '权', '科', '忌'];

function flyStarOf(stem, type) {
  const map = MUTAGEN[stem];
  if (!map) return null;
  for (const [star, t] of Object.entries(map)) if (t === type) return star;
  return null;
}

function flyStars(chart) {
  const palaces = chart.palaces || [];
  return palaces.map((p) => ({
    palace: p.palace,
    branch: p.branch,
    stem: p.stem,
    flies: FLY_TYPES.map((type) => {
      const star = flyStarOf(p.stem, type);
      const b = star ? starBranchOf(chart, star) : -1;
      const target = b >= 0 ? palaces.find((x) => x.branch === BRANCHES[b]) : null;
      return {
        type,
        star,
        to: target ? target.palace : null,
        toBranch: target ? target.branch : null,
        self: !!(target && target.palace === p.palace),
      };
    }),
  }));
}

function flyChain(chart, { from = '命宫', type = '忌', maxSteps = 12 } = {}) {
  const palaces = chart.palaces || [];
  const start = palaces.find((p) => p.palace === from) || palaces[0];
  if (!start) return null;
  const steps = [];
  const seen = new Set([start.palace]);
  let cur = start;
  let ended = 'max';
  for (let i = 0; i < Math.max(1, maxSteps); i++) {
    const star = flyStarOf(cur.stem, type);
    if (!star) { ended = 'no-star'; break; }
    const b = starBranchOf(chart, star);
    if (b < 0) { ended = 'off-chart'; break; }
    const to = palaces.find((x) => x.branch === BRANCHES[b]);
    steps.push({ from: cur.palace, fromBranch: cur.branch, fromStem: cur.stem, star, type, to: to.palace, toBranch: to.branch });
    if (seen.has(to.palace)) { ended = 'cycle'; break; }
    seen.add(to.palace);
    cur = to;
  }
  return {
    from: start.palace,
    type,
    steps,
    path: [start.palace, ...steps.map((s) => s.to)],
    ended,
    closed: ended === 'cycle',
  };
}

function flyChains(chart, { from = '命宫', maxSteps = 12 } = {}) {
  const out = {};
  for (const type of FLY_TYPES) out[type] = flyChain(chart, { from, type, maxSteps });
  return out;
}

const PALACE_SUFFIX = (p) => `${p}${String(p).endsWith('宫') ? '' : '宫'}`;

function flyComposite(chart, { from = '命宫' } = {}) {
  const palaces = chart.palaces || [];
  const src = palaces.find((p) => p.palace === from) || palaces[0];
  if (!src) return null;
  const names = Array.isArray(src.sanfang) && src.sanfang.length
    ? [...new Set(src.sanfang)].slice(0, 4)
    : [src.palace];

  const sources = [];
  for (const name of names) {
    const p = palaces.find((x) => x.palace === name);
    if (!p) continue;
    sources.push({
      palace: p.palace,
      branch: p.branch,
      stem: p.stem,
      flies: FLY_TYPES.map((type) => {
        const star = flyStarOf(p.stem, type);
        const b = star ? starBranchOf(chart, star) : -1;
        const target = b >= 0 ? palaces.find((x) => x.branch === BRANCHES[b]) : null;
        return {
          type,
          star,
          to: target ? target.palace : null,
          toBranch: target ? target.branch : null,
          self: !!(target && target.palace === p.palace),
        };
      }),
    });
  }

  const targets = [];
  for (const p of palaces) {
    const incoming = [];
    for (const s of sources) {
      for (const f of s.flies) {
        if (f.to === p.palace) {
          incoming.push({ from: s.palace, fromBranch: s.branch, fromStem: s.stem, type: f.type, star: f.star, self: f.self });
        }
      }
    }
    if (!incoming.length) continue;
    targets.push({
      palace: p.palace,
      branch: p.branch,
      incoming,
      types: [...new Set(incoming.map((x) => x.type))],
      count: incoming.length,
    });
  }
  targets.sort((a, b) => b.count - a.count || BRANCHES.indexOf(a.branch) - BRANCHES.indexOf(b.branch));

  const jiAt = (t) => t.incoming.filter((x) => x.type === '忌').length;
  const groups = {
    doubleJi: targets.filter((t) => jiAt(t) >= 2),
    luJi: targets.filter((t) => t.types.includes('禄') && t.types.includes('忌')),
    tripleHua: targets.filter((t) => t.types.length >= 3),
    selfHua: targets.filter((t) => t.incoming.some((x) => x.self)),
  };

  const labels = [];
  for (const t of groups.doubleJi) labels.push(`${['', '', '双忌', '三忌', '四忌'][jiAt(t)] || `${jiAt(t)}忌`}会${PALACE_SUFFIX(t.palace)}`);
  for (const t of groups.luJi) labels.push(`禄忌同宫${PALACE_SUFFIX(t.palace)}`);
  const HUA_NUM = { 3: '三化会', 4: '四化会' };
  for (const t of groups.tripleHua) labels.push(`${HUA_NUM[t.types.length] || `${t.types.length}化会`}${PALACE_SUFFIX(t.palace)}`);
  for (const t of groups.selfHua) labels.push(`${PALACE_SUFFIX(t.palace)}自化`);

  const byType = {};
  for (const type of FLY_TYPES) {
    byType[type] = sources
      .map((s) => {
        const f = s.flies.find((x) => x.type === type);
        return f && f.to ? { from: s.palace, star: f.star, to: f.to, self: f.self } : null;
      })
      .filter(Boolean);
  }

  return {
    from: src.palace,
    sanfang: sources.map((s) => s.palace),
    sources,
    targets,
    groups,
    byType,
    labels,
    note: '三方四正取本宫、对宫与两个三合宫共四宫，四宫宫干各化禄权科忌共 16 条飞化，按落宫归堆；只在落宫相同（会照）时标会聚，单条飞出不另立标签。只描会照与方向，不折吉凶，也未叠大限流年四化。',
  };
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
  const natalMonth = chart.lunar.month;
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

return { PALACE_NAMES, BRIGHTNESS, MUTAGEN, ZIWEI_SCHOOL_DEFAULTS, ZIWEI_SCHOOL_OPTIONS, ziweiSchoolsOf, BRIGHTNESS_SCHOOLS, schoolBrightness, KUI_YUE_SCHOOLS, LUCUN, KUI_YUE, MING_ZHU, SHEN_ZHU, triadOf, HUO_START, LING_START, TIANMA, XIANCHI, HUAGAI, JIANGXING, GUCHEN, GUASU, posuIndex, XIAOXIAN_START, CHANGSHENG_NAMES, BOSHI_NAMES, JIANGQIAN_NAMES, SUIQI_NAMES, CHANGSHENG_START, hourBranchIndex, ziweiTianfuIndex, xiaoxianAge, LEAP_POLICIES, leapPolicyOf, effectiveLunarMonth, buildZiwei, detectPatterns, PATTERN_TONE, daxianList, FLY_TYPES, flyStarOf, flyStars, flyChain, flyChains, flyComposite, enrichLiunian, asOfParts, flowOf };
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
const { fail } = __mods.fail;
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
    if (!Number.isFinite(a) || !Number.isFinite(b)) throw fail('E_INPUT', '数字起卦需要两个数字（upper / lower），例如 upper=3、lower=5');
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
  if (typeof text !== 'string' || !text.trim()) throw fail('E_INPUT', '时间起卦需要 datetime，例如 2026-10-24T11:43');
  const m = text.trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T\s](\d{1,2}):(\d{1,2}))?$/);
  if (!m) throw fail('E_INPUT', `无法解析 datetime：「${text}」，请用 2026-10-24T11:43 这种格式`);
  return {
    year: Number(m[1]), month: Number(m[2]), day: Number(m[3]),
    hour: Number(m[4] ?? 0), minute: Number(m[5] ?? 0),
  };
}

return { TRI_NAME, TRI_ELEMENT, TRI_BITS, buildMeihua };
})();

__mods.daliuren = (function () {
const { toJDN, dayGanzhiIndex, ganzhiName, termWindow, formatJd, xunKongOf } = __mods.calendar;
const { assertCivil } = __mods.validate;
const { SANHE_ELEMENT } = __mods.sanhe;

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
  const trio = SAN_HE_SHEN[SANHE_ELEMENT[zhi]];
  if (trio) {
    push('驿马', trio.驿马, '日支三合冲位，主迁动');
    push('桃花', trio.桃花, '咸池，主情缘');
    push('华盖', trio.华盖, '主孤高、技艺');
    push('劫煞', trio.劫煞, '主意外耗损');
    push('亡神', trio.亡神, '主失脱、心神不定');
  }
  return out;
}

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
  return xunKongOf(dayGz).includes(zhi) ? zhi : null;
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
  assertCivil(input);
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

return { ZHI, GAN, TIAN_JIANG, JIANG_FULL, JIEQI_YUE_JIANG, GAN_JI_GONG, calcShensha, buildDaliuren };
})();

__mods.hepan = (function () {
const { buildBazi, tenGod } = __mods.bazi;
const { STEMS, BRANCHES } = __mods.calendar;
const { assertCivil } = __mods.validate;
const { SANHE_GROUPS } = __mods.sanhe;

const WX_GAN = { 甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土', 己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水' };
const WX_ZHI = { 子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火', 午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水' };
const SHENG = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const KE = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };

const LIU_HE = [['子', '丑'], ['寅', '亥'], ['卯', '戌'], ['辰', '酉'], ['巳', '申'], ['午', '未']];
const CHONG = [['子', '午'], ['丑', '未'], ['寅', '申'], ['卯', '酉'], ['辰', '戌'], ['巳', '亥']];
const HAI = [['子', '未'], ['丑', '午'], ['寅', '巳'], ['卯', '辰'], ['申', '亥'], ['酉', '戌']];
const PO = [['子', '酉'], ['卯', '午'], ['辰', '丑'], ['未', '戌'], ['寅', '亥'], ['巳', '申']];
const XING = [['寅', '巳', '申'], ['丑', '戌', '未'], ['子', '卯']];

const pairIn = (list, a, b) => list.some((g) => g.includes(a) && g.includes(b) && a !== b);

function zhiRelation(a, b) {
  if (a === b) return { name: '同支', score: 0, text: '日支相同，性情相近，容易互相理解，也容易同时卡在同一处' };
  if (pairIn(LIU_HE, a, b)) return { name: '六合', score: 20, text: '日支六合，相处自然、彼此补位' };
  if (SANHE_GROUPS.some((g) => g.branches.includes(a) && g.branches.includes(b))) {
    return { name: '半合', score: 14, text: '日支同属三合局，易有共同语言' };
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

function yearBranchRelation(a, b) {
  if (a === b) return { name: '同属相（自刑之一）', score: -3, text: '属相相同，传统称「自刑」，容易互相较劲、谁也不让谁' };
  if (pairIn(LIU_HE, a, b)) return { name: '六合', score: 3, text: '属相六合，初印象与长辈缘通常不错' };
  if (SANHE_GROUPS.some((g) => g.branches.includes(a) && g.branches.includes(b))) {
    return { name: '三合', score: 3, text: '属相三合，容易有共同话题与共同朋友' };
  }
  if (pairIn(CHONG, a, b)) return { name: '六冲', score: -3, text: '属相六冲，节奏与立场容易相反，重大决定前宜多对一遍' };
  if (pairIn(HAI, a, b)) return { name: '相害', score: -2, text: '属相相害，容易因第三方或误会生嫌隙' };
  for (const g of XING) {
    if (g.includes(a) && g.includes(b)) return { name: '相刑', score: -2, text: '属相相刑，摩擦多起于相处细节' };
  }
  return { name: '无直接关系', score: 0, text: '属相之间没有合冲刑害，表层影响小，以日柱为主' };
}

function buildHepan(input) {
  assertCivil(input && input.a, 'a');
  assertCivil(input && input.b, 'b');
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

  const aYear = A.pillars.year;
  const bYear = B.pillars.year;
  const yearRel = yearBranchRelation(aYear.branch, bYear.branch);
  const HE5 = [['甲', '己'], ['乙', '庚'], ['丙', '辛'], ['丁', '壬'], ['戊', '癸']];
  const he5 = HE5.some((p) => p.includes(aStem) && p.includes(bStem) && aStem !== bStem);
  const godA = tenGod(aStem, bStem);
  const godB = tenGod(bStem, aStem);
  const A_BR = ['year', 'month', 'day', 'hour'].map((k) => A.pillars[k].branch);
  const B_BR = ['year', 'month', 'day', 'hour'].map((k) => B.pillars[k].branch);
  const cross = [];
  for (const x of A_BR) {
    for (const y of B_BR) {
      if (pairIn(LIU_HE, x, y)) cross.push({ a: x, b: y, name: '六合', score: 1, text: '跨盘六合，易有自然的亲近与默契' });
      else if (SANHE_GROUPS.some((g) => g.branches.includes(x) && g.branches.includes(y))) {
        cross.push({ a: x, b: y, name: '半合', score: 1, text: '跨盘半合，某些事上容易一拍即合' });
      } else if (pairIn(CHONG, x, y)) cross.push({ a: x, b: y, name: '相冲', score: -1, text: '跨盘相冲，某些领域节奏相反，需要分工' });
      else if (pairIn(HAI, x, y)) cross.push({ a: x, b: y, name: '相害', score: -1, text: '跨盘相害，容易在第三方或琐事上起误会' });
    }
  }
  const uniqCross = [];
  const seen = new Set();
  for (const c of cross) {
    const k = `${c.name}${[c.a, c.b].sort().join('')}`;
    if (seen.has(k)) continue;
    seen.add(k);
    uniqCross.push(c);
  }
  const nyA = aYear.nayin;
  const nyB = bYear.nayin;
  const naEl = nyA[nyA.length - 1];
  const nbEl = nyB[nyB.length - 1];
  const nayinRel = naEl === nbEl
    ? { name: '纳音比和', score: 0, text: '两人年命纳音同五行，底色相近' }
    : SHENG[naEl] === nbEl
      ? { name: '纳音相生', score: 1, text: `你的年命纳音属${naEl}生对方${nbEl}，你多是先付出的一方` }
      : SHENG[nbEl] === naEl
        ? { name: '纳音相生', score: 1, text: `对方年命纳音属${nbEl}生你${naEl}，你容易得到照应` }
        : KE[naEl] === nbEl
          ? { name: '纳音相克', score: -1, text: `你的年命纳音属${naEl}克对方${nbEl}，主导感偏强` }
          : { name: '纳音相克', score: -1, text: `对方年命纳音属${nbEl}克你${naEl}，压力感偏重` };
  const good = (yearRel.score > 0 ? 1 : 0) + (he5 ? 1 : 0) + (gong.score > 5 ? 1 : 0)
    + uniqCross.filter((c) => c.score > 0).length + (nayinRel.score > 0 ? 1 : 0);
  const bad = (yearRel.score < 0 ? 1 : 0) + (gong.score < 0 ? 1 : 0)
    + uniqCross.filter((c) => c.score < 0).length + (nayinRel.score < 0 ? 1 : 0);
  const lean = good - bad >= 3 ? '吉象偏多' : good - bad >= 1 ? '吉略多于凶' : good - bad === 0 ? '吉凶相当' : '凶象偏多';

  const detail = {
    yearRelation: { label: yearRel.name, text: `属相：你${aYear.branch}（${aYear.ganzhi}），对方${bYear.branch}（${bYear.ganzhi}）。${yearRel.text}。` },
    stems: {
      he5,
      tenGodToB: godA,
      tenGodToA: godB,
      text: he5
        ? `日干五合（${aStem}${bStem}），传统称「天干五合」，主彼此吸引强，也容易黏在一起分不开。`
        : `日干无五合：你在对方盘里是「${godA}」，对方在你盘里是「${godB}」。`,
    },
    crossBranches: uniqCross.slice(0, 8),
    nayin: { a: nyA, b: nyB, label: nayinRel.name, text: nayinRel.text },
    tally: { good, bad, lean },
    framing: '属相（年支）只影响表层印象，传统合婚以日柱为主；分档只说明吉凶象多少，不作「必配/必离」断言。',
  };

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
    detail,
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

__mods.trend = (function () {
const { buildBazi, HIDDEN_STEMS, tenGod } = __mods.bazi;
const { ganzhiName, sexagenaryIndex, STEMS, BRANCHES } = __mods.calendar;

const SHISHEN_WEAK = {
  正印: 2, 偏印: 2, 比肩: 2, 劫财: 1,
  食神: -1, 伤官: -2, 偏财: -2, 正财: -2,
  正官: -1, 七杀: -3,
};
const SHISHEN_STRONG = {
  正印: -2, 偏印: -2, 比肩: -2, 劫财: -1,
  食神: 1, 伤官: 1, 偏财: 2, 正财: 2,
  正官: 2, 七杀: 1,
};
const SHISHEN_NEUTRAL = {
  正印: 1, 偏印: 0, 比肩: 0, 劫财: -1,
  食神: 1, 伤官: -2, 偏财: 1, 正财: 2,
  正官: 2, 七杀: -2,
};

const FAVOR = { 身强: 'strong', 偏强: 'strong', 中和: 'neutral', 偏弱: 'weak', 身弱: 'weak' };
const TABLE_OF = { strong: SHISHEN_STRONG, neutral: SHISHEN_NEUTRAL, weak: SHISHEN_WEAK };

const LEVEL_CUTS = [0.5, 1.5, 2.5, 4];
const BOUNDARY_EPS = 0.3;

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function tenGodOfZhi(dayStem, branch) {
  const main = HIDDEN_STEMS[branch] && HIDDEN_STEMS[branch][0];
  return main ? tenGod(dayStem, main) : null;
}

const yearGanzhi = (year) => ganzhiName(((year - 4) % 60 + 60) % 60);

function extendDayun(list, direction, toAge) {
  const out = list.slice();
  const step = direction === '逆行' ? -1 : 1;
  let guard = 0;
  while (out.length && out[out.length - 1].startAge <= toAge && guard < 24) {
    const last = out[out.length - 1];
    const lastIdx = sexagenaryIndex(STEMS.indexOf(last.ganzhi[0]), BRANCHES.indexOf(last.ganzhi[1]));
    const nextIdx = (lastIdx + step + 60) % 60;
    const g = ganzhiName(nextIdx);
    out.push({ step: last.step + 1, startAge: last.startAge + 10, ganzhi: g.name, stem: g.stem, branch: g.branch, stemTenGod: last.stemTenGod });
    guard++;
  }
  return out;
}

function buildTrend(input) {
  const gender = input.gender;
  if (gender !== 'male' && gender !== 'female') {
    throw new Error('人生 K 线需要性别：大运顺逆由性别决定，不可缺省');
  }
  const toAge = clamp(Number.isInteger(input.toAge) ? input.toAge : 100, 10, 100);
  const r = buildBazi({
    year: input.year,
    month: input.month,
    day: input.day,
    hour: Number.isInteger(input.hour) ? input.hour : 12,
    minute: Number.isInteger(input.minute) ? input.minute : 0,
    gender,
    lateZi: input.lateZi !== false,
    trueSolar: input.trueSolar !== false,
    dst: input.dst !== false,
    address: typeof input.address === 'string' ? input.address : undefined,
    longitude: typeof input.longitude === 'number' ? input.longitude : undefined,
    geo: input.geo && typeof input.geo === 'object' ? input.geo : undefined,
  });

  const dayStem = r.pillars.day.stem;
  const table = TABLE_OF[FAVOR[r.strength.level] || 'neutral'];
  const rawBound = 5 * Math.max(...Object.values(table).map(Math.abs));
  const scoreOf = (god) => table[god] ?? 0;
  const boundary = LEVEL_CUTS.some((c) => Math.abs(r.strength.score - c) <= BOUNDARY_EPS);

  const dayun = extendDayun(r.dayun.list, r.dayun.direction, toAge);
  const segments = dayun
    .map((d, i) => ({
      ganZhi: d.ganzhi,
      startAge: d.startAge,
      endAge: (dayun[i + 1] ? dayun[i + 1].startAge : d.startAge + 10) - 1,
    }))
    .filter((s) => s.startAge <= toAge);

  const birthYear = Number(String(r.solarTime.civilText).slice(0, 4));
  const points = [];
  let prev = 50;
  for (let age = 1; age <= toAge; age++) {
    const year = birthYear + age - 1;
    const gz = yearGanzhi(year);
    const seg = segments.find((s) => age >= s.startAge && age <= s.endAge) || null;
    const godGan = tenGod(dayStem, gz.stem);
    const godZhi = tenGodOfZhi(dayStem, gz.branch);
    const dyGodGan = seg ? tenGod(dayStem, seg.ganZhi[0]) : null;
    const dyGodZhi = seg ? tenGodOfZhi(dayStem, seg.ganZhi[1]) : null;

    const raw = scoreOf(godGan) + scoreOf(godZhi)
      + (seg ? (scoreOf(dyGodGan) + scoreOf(dyGodZhi)) * 1.5 : 0);
    const score = clamp(Math.round(((raw + rawBound) / (rawBound * 2)) * 100), 2, 99);
    points.push({
      age,
      year,
      ganZhi: gz.name,
      dayunGanZhi: seg ? seg.ganZhi : null,
      shiShenGan: godGan,
      shiShenZhi: godZhi,
      score,
      kline: {
        open: prev,
        close: score,
        high: clamp(score + 4, 0, 100),
        low: clamp(score - 4, 0, 100),
      },
    });
    prev = score;
  }

  const sorted = points.slice().sort((a, b) => b.score - a.score);
  return {
    system: 'trend',
    meta: {
      birth: String(r.solarTime.civilText).slice(0, 10),
      gender,
      dayMaster: `${dayStem}（${r.dayMaster.yinYang}${r.dayMaster.element}）`,
      strength: { level: r.strength.level, score: r.strength.score, boundary },
      toAge,
      ...(boundary
        ? {
          boundaryNote:
            `旺衰分 ${r.strength.score} 正落在换档阈值附近（阈值 ${LEVEL_CUTS.join(' / ')}，容差 ${BOUNDARY_EPS}）：`
            + '多一个同类干支或少一个就会换计分表，整套正负号随之翻转——因此这里不出「最好 / 最差年份」的排序结论。',
        }
        : {}),
    },
    segments,
    points,
    highlights: boundary
      ? { suppressed: '旺衰落在换档边界，年份排序不可靠，不给顺位 / 谨慎年份', best: [], worst: [] }
      : {
        best: sorted.slice(0, 3).map((p) => `${p.age}岁（${p.year}，${p.ganZhi}，${p.score}分）`),
        worst: sorted.slice(-3).reverse().map((p) => `${p.age}岁（${p.year}，${p.ganZhi}，${p.score}分）`),
      },
    sparkline: asciiSparkline(points),
    sources: [
      '运势分：流年 / 大运干支十神对日主的简化启发式计分（旺衰方向决定正负号）',
      'K 线形态：收盘 = 当年分，开盘 = 上年分，高低各 ±4（确定性生成）',
    ],
    disclaimer: boundary
      ? '人生 K 线为简化启发式的可视化；本盘旺衰判定处于换档边界，趋势与年份排序均不可靠，仅供展示，不构成任何现实决策依据。'
      : '人生 K 线为简化启发式的可视化，趋势形态仅供娱乐参考，不构成任何现实决策依据；十年大运内每年分值不等于真实吉凶。',
  };
}

function asciiSparkline(points) {
  const BLOCKS = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
  const lines = [];
  const groups = [];
  for (const p of points) {
    const key = p.dayunGanZhi || '起运前';
    const last = groups[groups.length - 1];
    if (!last || last.key !== key) groups.push({ key, points: [] });
    groups[groups.length - 1].points.push(p);
  }
  for (const g of groups) {
    const bars = g.points
      .map((p) => BLOCKS[clamp(Math.floor((p.score / 100) * BLOCKS.length), 0, BLOCKS.length - 1)])
      .join('');
    lines.push(`${g.key}（${g.points[0].age}–${g.points[g.points.length - 1].age}岁）：${bars}`);
  }
  return lines;
}

return { buildTrend };
})();

__mods.fengshui = (function () {
const { partsToJd, termInstantJd } = __mods.calendar;
const { applyDst } = __mods.dst;
const { fail } = __mods.fail;

const NINE_STARS = {
  1: { name: '一白', color: '白', element: '水', star: '贪狼', lucky: true },
  2: { name: '二黑', color: '黑', element: '土', star: '巨门', lucky: false },
  3: { name: '三碧', color: '碧', element: '木', star: '禄存', lucky: false },
  4: { name: '四绿', color: '绿', element: '木', star: '文曲', lucky: true },
  5: { name: '五黄', color: '黄', element: '土', star: '廉贞', lucky: false },
  6: { name: '六白', color: '白', element: '金', star: '武曲', lucky: true },
  7: { name: '七赤', color: '赤', element: '金', star: '破军', lucky: false },
  8: { name: '八白', color: '白', element: '土', star: '左辅', lucky: true },
  9: { name: '九紫', color: '紫', element: '火', star: '右弼', lucky: true },
};

const PALACE_DIRECTION = {
  坎: '正北', 艮: '东北', 震: '正东', 巽: '东南',
  离: '正南', 坤: '西南', 兑: '正西', 乾: '西北',
};

const YOUNIAN_ORDER = ['坎', '艮', '震', '巽', '离', '坤', '兑', '乾'];
const DAYOUTIAN = {
  乾: ['六煞', '天医', '五鬼', '祸害', '绝命', '延年', '生气'],
  坎: ['五鬼', '天医', '生气', '延年', '绝命', '祸害', '六煞'],
  艮: ['六煞', '绝命', '祸害', '生气', '延年', '天医', '五鬼'],
  震: ['延年', '生气', '祸害', '绝命', '五鬼', '天医', '六煞'],
  巽: ['天医', '五鬼', '六煞', '祸害', '生气', '绝命', '延年'],
  离: ['六煞', '五鬼', '绝命', '延年', '祸害', '生气', '天医'],
  坤: ['天医', '延年', '绝命', '生气', '祸害', '五鬼', '六煞'],
  兑: ['生气', '祸害', '延年', '绝命', '六煞', '五鬼', '天医'],
};

const LUCKY_STARS = ['生气', '延年', '天医', '伏位'];
const UNLUCKY_STARS = ['绝命', '五鬼', '六煞', '祸害'];

const MOUNTAINS_24 = [
  { m: '壬', gua: '坎', deg: 345 }, { m: '子', gua: '坎', deg: 0 }, { m: '癸', gua: '坎', deg: 15 },
  { m: '丑', gua: '艮', deg: 30 }, { m: '艮', gua: '艮', deg: 45 }, { m: '寅', gua: '艮', deg: 60 },
  { m: '甲', gua: '震', deg: 75 }, { m: '卯', gua: '震', deg: 90 }, { m: '乙', gua: '震', deg: 105 },
  { m: '辰', gua: '巽', deg: 120 }, { m: '巽', gua: '巽', deg: 135 }, { m: '巳', gua: '巽', deg: 150 },
  { m: '丙', gua: '离', deg: 165 }, { m: '午', gua: '离', deg: 180 }, { m: '丁', gua: '离', deg: 195 },
  { m: '未', gua: '坤', deg: 210 }, { m: '坤', gua: '坤', deg: 225 }, { m: '申', gua: '坤', deg: 240 },
  { m: '庚', gua: '兑', deg: 255 }, { m: '酉', gua: '兑', deg: 270 }, { m: '辛', gua: '兑', deg: 285 },
  { m: '戌', gua: '乾', deg: 300 }, { m: '乾', gua: '乾', deg: 315 }, { m: '亥', gua: '乾', deg: 330 },
];

const MOUNTAIN_INDEX = new Map(MOUNTAINS_24.map((x, i) => [x.m, i]));

function mountainInfo(name) {
  const i = MOUNTAIN_INDEX.get(name);
  if (i === undefined) {
    throw fail('E_INPUT', `坐向必须是 24 山之一（${MOUNTAINS_24.map((x) => x.m).join('')}），收到「${name}」——请按罗盘 24 山报坐或报向，不要自造方位词。`);
  }
  return { ...MOUNTAINS_24[i], index: i };
}

function sittingFromFacing(facing) {
  const f = mountainInfo(facing);
  const i = (f.index + 12) % 24;
  return { ...MOUNTAINS_24[i], index: i };
}

const guaGroup = (gua) => (['坎', '离', '震', '巽'].includes(gua) ? '东四' : '西四');

const STAR_LAYOUT_ROLE = {
  生气: '大吉：最宜开门、主卧、灶口朝向',
  延年: '大吉：宜开门、主卧（利感情与人缘）',
  天医: '次吉：宜主卧、书房、老人房（利健康）',
  伏位: '次吉：宜卧室、神位（主平稳）',
  祸害: '小凶：宜厕所、储物间（宜静不宜动）',
  六煞: '次凶：宜厕所、储物间',
  五鬼: '大凶：宜厕所，或以灶坐压之（传统「火烧五鬼」说）',
  绝命: '最凶：宜灶坐压之、储物，忌门床',
};

const GUA_BY_NUM = ['坎', '坤', '震', '巽', '中', '乾', '兑', '艮', '离'];

function mingGua(birthYear, gender) {
  const tail = ((birthYear % 100) + 100) % 100;
  const century = birthYear >= 2000 ? { male: 99, female: 3 } : { male: 100, female: 4 };
  const mod9 = (n) => { const r = ((n % 9) + 9) % 9; return r === 0 ? 9 : r; };
  let num = gender === 'male' ? mod9(century.male - tail) : mod9(tail - century.female);
  if (num === 5) num = gender === 'male' ? 2 : 8;
  const gua = GUA_BY_NUM[num - 1];
  if (gua === '中') throw new Error('命卦计算异常：落中宫');
  return { num, gua, direction: PALACE_DIRECTION[gua] };
}

function eightStars(gua) {
  const result = { 伏位: { palace: gua, direction: PALACE_DIRECTION[gua] } };
  const start = YOUNIAN_ORDER.indexOf(gua);
  for (let step = 1; step <= 7; step++) {
    const palace = YOUNIAN_ORDER[(start + step) % 8];
    result[DAYOUTIAN[gua][step - 1]] = { palace, direction: PALACE_DIRECTION[palace] };
  }
  return result;
}

function guaYearOf(year, month, day) {
  const birthJd = partsToJd({ year, month, day, hour: 12, minute: 0 });
  return birthJd < termInstantJd(year, 2) ? year - 1 : year;
}

function yearZibaiStar(year) {
  const n = (1 + (2026 - year)) % 9;
  return n <= 0 ? n + 9 : n;
}

const PALACE_ORDER = ['坎', '坤', '震', '巽', '中', '乾', '兑', '艮', '离']; // 洛书数 1–9 对应宫

function yearlyFlying(year) {
  const center = yearZibaiStar(year);
  const palaces = [];
  for (const palace of PALACE_ORDER) {
    const k = PALACE_ORDER.indexOf(palace) + 1;
    const num = ((((k - 5 + center - 1) % 9) + 9) % 9) + 1;
    const s = NINE_STARS[num];
    palaces.push({ palace, direction: palace === '中' ? '中宫' : PALACE_DIRECTION[palace], num, name: s.name, star: s.star, element: s.element, lucky: s.lucky });
  }
  return { center, centerName: NINE_STARS[center].name, palaces };
}

const pad2 = (n) => String(n).padStart(2, '0');

function periodOfYear(year) {
  const k = Math.floor((year - 1864) / 20);
  const period = ((k % 9) + 9) % 9 + 1;
  const start = 1864 + 20 * k;
  return { period, start, end: start + 19, label: `${period}运（${start}–${start + 19}）` };
}

const YANG_MOUNTAINS = new Set(['乾', '巽', '艮', '坤', '甲', '庚', '壬', '丙', '寅', '申', '巳', '亥']);
const YUAN_NAME = ['地元', '天元', '人元'];

const MOUNTAIN_META = {};
MOUNTAINS_24.forEach((x, i) => {
  MOUNTAIN_META[x.m] = { ...x, yuan: YUAN_NAME[i % 3], yinYang: YANG_MOUNTAINS.has(x.m) ? '阳' : '阴' };
});

const FLY_SEQ = ['中', '乾', '兑', '艮', '离', '坎', '坤', '震', '巽'];
const NUM_TO_GUA = ['坎', '坤', '震', '巽', '中', '乾', '兑', '艮', '离']; // 洛书数 1–9 本位卦
const YUAN_INDEX = { 地元: 0, 天元: 1, 人元: 2 };

const mountainsOfGua = (gua) => MOUNTAINS_24.filter((x) => x.gua === gua).map((x) => MOUNTAIN_META[x.m]);

function fly(center, forward) {
  const out = {};
  for (let i = 0; i < 9; i++) {
    const v = ((center - 1 + (forward ? i : -i)) % 9 + 9) % 9 + 1;
    out[FLY_SEQ[i]] = v;
  }
  return out;
}

function flightOf(mount, center) {
  if (center === 5) {
    return { forward: mount.yinYang === '阳', basis: `五黄入中，按${mount.m}本山${mount.yuan}${mount.yinYang}论` };
  }
  const home = NUM_TO_GUA[center - 1];
  const hm = mountainsOfGua(home)[YUAN_INDEX[mount.yuan]];
  return { forward: hm.yinYang === '阳', basis: `${center}${home}宫取${mount.yuan}${hm.m}（${hm.yinYang}）` };
}

const WANG_SHAN_WANG_XIANG = {
  1: [],
  2: [['乾', '巽'], ['亥', '巳'], ['丑', '未']],
  3: [['卯', '酉'], ['乙', '辛'], ['辰', '戌']],
  4: [['艮', '坤'], ['寅', '申'], ['甲', '庚']],
  5: [['子', '午'], ['癸', '丁'], ['卯', '酉'], ['乙', '辛'], ['丑', '未'], ['辰', '戌']],
  6: [['艮', '坤'], ['寅', '申'], ['甲', '庚']],
  7: [['卯', '酉'], ['乙', '辛'], ['辰', '戌']],
  8: [['乾', '巽'], ['亥', '巳'], ['丑', '未']],
  9: [],
};

const XUANKONG_SOURCES = [
  '三元九运（1864 年起一运、每运 20 年，九运 180 年一轮）',
  '玄空下卦挨星（运盘顺飞；山盘/向盘以入中运星本宫同元龙阴阳定顺逆，五黄入中按本山阴阳）',
  '二十四山旺山旺向通行表（每项含正反两向；一运、九运无局）',
];

const XUANKONG_DISCLAIMER = '玄空下卦为传统通行口径的本地排盘，属民俗参考，不构成现场勘舆结论，仅供娱乐；替卦/兼向、年月日时飞星与形峦不在本工具范围内。';

function xuankongChart(period, sitting, facing) {
  const sit = MOUNTAIN_META[sitting];
  const face = MOUNTAIN_META[facing];
  const yun = fly(period, true);
  const sCenter = yun[sit.gua];
  const fCenter = yun[face.gua];
  const sFly = flightOf(sit, sCenter);
  const fFly = flightOf(face, fCenter);
  const shan = fly(sCenter, sFly.forward);
  const xiang = fly(fCenter, fFly.forward);
  const palaces = PALACE_ORDER.map((palace, i) => ({
    palace,
    direction: palace === '中' ? '中宫' : PALACE_DIRECTION[palace],
    luoshu: i + 1,
    yun: yun[palace],
    shan: shan[palace],
    xiang: xiang[palace],
  }));
  const wheres = (map) => PALACE_ORDER.filter((p) => map[p] === period);
  const pairs = WANG_SHAN_WANG_XIANG[period];
  const hit = pairs.find(([a, b]) => (sit.m === a && face.m === b) || (sit.m === b && face.m === a));
  const byChart = shan[sit.gua] === period && xiang[face.gua] === period;
  const note = byChart && hit
    ? '盘面与表法一致：本局到山到向。'
    : byChart
      ? '盘面到山到向，但不在通行表法所列之局（表法与盘面口径不同，并列不合并）。'
      : hit
        ? '通行表法列为旺山旺向，但本盘当运山星/向星未同时落坐向（表法与盘面口径不同，并列不合并）。'
        : '本局既未到山到向，也不在表法旺山旺向之列。';
  return {
    palaces,
    sitting: sit,
    facing: face,
    yun,
    shan,
    xiang,
    yunCenter: period,
    shanCenter: { star: sCenter, ...sFly },
    xiangCenter: { star: fCenter, ...fFly },
    dangYun: { shan: wheres(shan), xiang: wheres(xiang) },
    heshi: {
      shan: PALACE_ORDER.filter((p) => shan[p] + yun[p] === 10),
      xiang: PALACE_ORDER.filter((p) => xiang[p] + yun[p] === 10),
    },
    wangShanWangXiang: { byChart, byTable: Boolean(hit), table: pairs.map(([a, b]) => `${a}${b}`), note },
  };
}

function civilDate(input) {
  const dst = input.dst === false
    ? { year: input.year, month: input.month, day: input.day, hour: 0, minute: 0, applied: false, note: null }
    : applyDst({ year: input.year, month: input.month, day: input.day, hour: 0, minute: 0 });
  return { year: dst.year, month: dst.month, day: dst.day, dst };
}

const SOURCES = [
  '大游年歌（八宅通行口径）',
  '年家紫白飞星（纯公式：以 2026 丙午一白入中、逐年退一位、九年一轮；按立春换年）',
  '24 山归属与度数（八宅通行口径，每山 15°）',
];

const DISCLAIMER = '八宅与飞星为传统通行口径的本地计算，属民俗参考，不构成现场勘舆结论，仅供娱乐；实际户型以现场为准。';

function buildFengshui(input) {
  if (input.action === 'advise') return buildAdvise(input);
  if (input.action === 'xuankong') return buildXuankong(input);
  const gender = input.gender;
  if (gender !== 'male' && gender !== 'female') {
    throw fail('E_INPUT', '风水命卦需要性别：男女命卦算法不同，不可缺省');
  }
  if (!Number.isInteger(input.year) || !Number.isInteger(input.month) || !Number.isInteger(input.day)) {
    throw fail('E_INPUT', '风水命卦需要完整出生年月日（公历）——只知道年份不够：命卦按立春界划分出生年');
  }
  const civil = civilDate(input);
  const guaYear = guaYearOf(civil.year, civil.month, civil.day);
  const { num, gua, direction } = mingGua(guaYear, gender);
  const stars = eightStars(gua);
  const eastFour = ['坎', '离', '震', '巽'].includes(gua);
  const fortuneYear = Number.isInteger(input.fortuneYear) ? input.fortuneYear : null;

  return {
    system: 'fengshui',
    meta: {
      birth: `${civil.year}-${pad2(civil.month)}-${pad2(civil.day)}`,
      guaYear,
      gender: gender === 'male' ? '男' : '女',
      fortuneYear,
      ...(civil.dst.applied ? { dst: civil.dst.note } : {}),
      ...(fortuneYear === null ? { note: '未给流年：未算年紫白飞星（需要时补 fortuneYear）。' } : {}),
      scope: '八宅命卦 + 大游年八星 + 年紫白；玄空飞星见 action=xuankong；不含形峦与现场勘舆。',
    },
    mingGua: {
      num,
      gua,
      direction,
      group: eastFour ? '东四命' : '西四命',
      compatible: eastFour ? '宜东四宅（坐坎离震巽）' : '宜西四宅（坐乾坤艮兑）',
    },
    luckyDirections: LUCKY_STARS.map((s) => ({ star: s, ...stars[s] })),
    unluckyDirections: UNLUCKY_STARS.map((s) => ({ star: s, ...stars[s] })),
    ...(fortuneYear === null ? {} : { yearlyFlying: yearlyFlying(fortuneYear) }),
    sources: SOURCES,
    disclaimer: DISCLAIMER,
  };
}

function resolveSittingFacing(input) {
  const hasSitting = typeof input.sitting === 'string' && input.sitting.trim() !== '';
  const hasFacing = typeof input.facing === 'string' && input.facing.trim() !== '';
  if (!hasSitting && !hasFacing) {
    throw fail('E_INPUT', '缺少坐向：sitting（坐山）或 facing（向山）至少给一个——按罗盘 24 山报坐或报向，例如「坐北朝南」对应坐子向午');
  }
  if (hasSitting && hasFacing) {
    const s = mountainInfo(input.sitting.trim());
    const f = mountainInfo(input.facing.trim());
    if ((s.index + 12) % 24 !== f.index) {
      throw fail('E_INPUT', `坐向不自洽：坐${s.m}（${s.deg}°）与向${f.m}（${f.deg}°）不是对宫（相差应 180°，实测 ${((f.deg - s.deg) + 360) % 360}°）——请核对罗盘读数。`);
    }
  }
  const sitting = hasSitting ? mountainInfo(input.sitting.trim()) : sittingFromFacing(input.facing.trim());
  const facing = MOUNTAINS_24[(sitting.index + 12) % 24];
  return { sitting, facing };
}

function buildAdvise(input) {
  const { sitting, facing } = resolveSittingFacing(input);
  const houseGua = sitting.gua;
  const stars = eightStars(houseGua);
  const lucky = LUCKY_STARS.map((s) => stars[s]);
  const unlucky = UNLUCKY_STARS.map((s) => stars[s]);
  const dir = (x) => `${x.direction}（${x.palace}宫）`;

  const starChart = [...LUCKY_STARS, ...UNLUCKY_STARS].map((s) => ({
    star: s,
    lucky: LUCKY_STARS.includes(s),
    ...stars[s],
    role: STAR_LAYOUT_ROLE[s],
  }));

  const layout = {
    door: `门宜开于吉方：首选生气方 ${dir(lucky[0])}，次选延年方 ${dir(lucky[1])}、天医方 ${dir(lucky[2])}。`,
    stove: `灶宜「坐凶向吉」：灶身压凶方（首选绝命方 ${dir(unlucky[0])}、五鬼方 ${dir(unlucky[1])}），灶口朝吉方。`,
    bed: `主卧与床头宜安吉方：生气方 ${dir(lucky[0])} 或延年方 ${dir(lucky[1])}；床头宜向吉方。`,
    toilet: `厕所宜压凶方：祸害方 ${dir(unlucky[3])} 或六煞方 ${dir(unlucky[2])}（污去凶气，宜静常闭）。`,
  };

  let mingMatch = null;
  const hasBirth = Number.isInteger(input.year) && Number.isInteger(input.month) && Number.isInteger(input.day)
    && (input.gender === 'male' || input.gender === 'female');
  if (hasBirth) {
    const civil = civilDate(input);
    const guaYear = guaYearOf(civil.year, civil.month, civil.day);
    const ming = mingGua(guaYear, input.gender);
    const mGroup = guaGroup(ming.gua);
    const hGroup = guaGroup(houseGua);
    const same = mGroup === hGroup;
    const mingLucky = LUCKY_STARS.map((s) => `${s}位${eightStars(ming.gua)[s].direction}`).join('、');
    mingMatch = {
      birth: `${civil.year}-${pad2(civil.month)}-${pad2(civil.day)}`,
      guaYear,
      gender: input.gender === 'male' ? '男' : '女',
      mingGua: { gua: ming.gua, direction: ming.direction, group: `${mGroup}命` },
      houseGua: { gua: houseGua, group: `${hGroup}宅` },
      sameGroup: same,
      text: same
        ? `命宅相配（${mGroup}命住${hGroup}宅）：以宅之八星盘布局即可，个人吉方与宅吉方大体同向。`
        : `命宅不配（${mGroup}命住${hGroup}宅）：传统调停法——门与床以命卦吉方为先（此命四吉方：${mingLucky}），灶仍按宅卦坐凶向吉，两盘各自取用。`,
    };
  }

  return {
    system: 'fengshui',
    meta: {
      action: 'advise',
      ...(hasBirth ? {} : { birthNote: '未提供生辰：未做命宅配；如需按个人命卦调停门床，请补充出生年月日与性别。' }),
      sitting: `${sitting.m}山（罗盘 ${sitting.deg}°）`,
      facing: `${facing.m}山（罗盘 ${facing.deg}°）`,
      houseGua,
      houseGroup: `${guaGroup(houseGua)}宅`,
      scope: '门主灶厕走向按八宅通行口径给倾向，玄空飞星见 action=xuankong；不含形峦、不是现场勘舆结论。',
    },
    houseStars: starChart,
    layout,
    ...(mingMatch ? { mingMatch } : {}),
    sources: SOURCES,
    disclaimer: DISCLAIMER,
  };
}

function buildXuankong(input) {
  const { sitting, facing } = resolveSittingFacing(input);
  let period;
  let yearInfo = null;
  let note;
  if (input.period !== undefined && input.period !== null && !Number.isInteger(input.period)) {
    throw fail('E_INPUT', `运必须是 1–9 的整数（三元九运），收到「${input.period}」——一运 1864 起、九运 2024–2043。`);
  }
  if (Number.isInteger(input.period)) {
    if (input.period < 1 || input.period > 9) {
      throw fail('E_INPUT', `运必须是 1–9 的整数（三元九运），收到「${input.period}」——一运 1864 起、九运 2024–2043。`);
    }
    period = input.period;
  } else if (Number.isInteger(input.fortuneYear)) {
    yearInfo = periodOfYear(input.fortuneYear);
    period = yearInfo.period;
  } else {
    period = 9;
    note = '未给运：默认按九运（2024–2043）排盘；可传 period（1–9）或 fortuneYear 指定。';
  }
  const chart = xuankongChart(period, sitting.m, facing.m);
  const sitMeta = MOUNTAIN_META[sitting.m];
  const faceMeta = MOUNTAIN_META[facing.m];
  const center = (c) => ({ star: c.star, name: NINE_STARS[c.star].name, fly: c.forward ? '顺飞' : '逆飞', basis: c.basis });
  const where = (list) => list.map((p) => `${p}宫${PALACE_DIRECTION[p]}`).join('、') || '无';
  return {
    system: 'fengshui',
    meta: {
      action: 'xuankong',
      period,
      periodLabel: yearInfo ? yearInfo.label : `${period}运`,
      ...(yearInfo ? { year: input.fortuneYear, periodStart: yearInfo.start, periodEnd: yearInfo.end } : {}),
      sitting: `${sitting.m}山（罗盘 ${sitting.deg}°）`,
      facing: `${facing.m}山（罗盘 ${facing.deg}°）`,
      sittingGua: sitting.gua,
      facingGua: facing.gua,
      sittingYuan: `${sitMeta.yuan}${sitMeta.yinYang}`,
      facingYuan: `${faceMeta.yuan}${faceMeta.yinYang}`,
      shanCenter: center(chart.shanCenter),
      xiangCenter: center(chart.xiangCenter),
      ...(note ? { note } : {}),
      scope: '玄空下卦：运盘 + 山盘 + 向盘 + 当运星 + 合十 + 表法旺山旺向；不含替卦/兼向、不含年月日时飞星、不含形峦与现场勘舆。',
    },
    palaces: chart.palaces,
    dangYun: {
      shan: { palaces: chart.dangYun.shan, text: where(chart.dangYun.shan) },
      xiang: { palaces: chart.dangYun.xiang, text: where(chart.dangYun.xiang) },
    },
    heshi: { shan: chart.heshi.shan, xiang: chart.heshi.xiang },
    wangShanWangXiang: chart.wangShanWangXiang,
    sources: XUANKONG_SOURCES,
    disclaimer: XUANKONG_DISCLAIMER,
  };
}

return { NINE_STARS, PALACE_DIRECTION, DAYOUTIAN, LUCKY_STARS, UNLUCKY_STARS, MOUNTAINS_24, mountainInfo, sittingFromFacing, STAR_LAYOUT_ROLE, mingGua, eightStars, guaYearOf, yearZibaiStar, yearlyFlying, periodOfYear, MOUNTAIN_META, WANG_SHAN_WANG_XIANG, XUANKONG_SOURCES, XUANKONG_DISCLAIMER, xuankongChart, buildFengshui };
})();

__mods['name-data'] = (function () {

const READING = [
  ['梓', 'zi', 3, 11], ['桐', 'tong', 2, 10], ['楠', 'nan', 2, 13], ['楷', 'kai', 3, 13],
  ['松', 'song', 1, 8], ['柏', 'bai', 3, 9], ['枫', 'feng', 1, 13], ['榕', 'rong', 2, 14],
  ['槿', 'jin', 3, 15], ['棠', 'tang', 2, 12], ['楚', 'chu', 3, 13], ['柯', 'ke', 1, 9],
  ['桓', 'huan', 2, 10], ['榆', 'yu', 2, 13], ['栩', 'xu', 3, 10], ['榛', 'zhen', 1, 14],
  ['芸', 'yun', 2, 10], ['芷', 'zhi', 3, 10], ['芮', 'rui', 4, 10], ['若', 'ruo', 4, 11],
  ['茜', 'qian', 4, 12], ['茵', 'yin', 1, 12], ['茗', 'ming', 2, 12], ['莎', 'sha', 1, 13],
  ['茉', 'mo', 4, 11], ['筱', 'xiao', 3, 13], ['蓉', 'rong', 2, 16], ['萱', 'xuan', 1, 15],
  ['蕙', 'hui', 4, 18], ['蕊', 'rui', 3, 18], ['菲', 'fei', 1, 14], ['蔓', 'man', 4, 17],
  ['荣', 'rong', 2, 14], ['茂', 'mao', 4, 11], ['栋', 'dong', 4, 12], ['梁', 'liang', 2, 11],
  ['朴', 'pu', 3, 6], ['本', 'ben', 3, 5], ['林', 'lin', 2, 8], ['森', 'sen', 1, 12],
  ['枝', 'zhi', 1, 8], ['果', 'guo', 3, 8], ['禾', 'he', 2, 5], ['秀', 'xiu', 4, 7],
  ['穗', 'sui', 4, 17], ['稼', 'jia', 4, 15], ['颖', 'ying', 3, 16], ['苗', 'miao', 2, 8],
  ['菁', 'jing', 1, 14], ['菡', 'han', 4, 14], ['蕴', 'yun', 4, 22], ['蕾', 'lei', 3, 19],
  ['薇', 'wei', 1, 19], ['薏', 'yi', 4, 19], ['菀', 'wan', 3, 14], ['荷', 'he', 2, 13],
  ['莲', 'lian', 2, 17], ['菱', 'ling', 2, 14], ['苇', 'wei', 3, 15], ['荻', 'di', 2, 13],
  ['筠', 'yun', 2, 13], ['笛', 'di', 2, 11], ['杉', 'shan', 1, 7], ['柠', 'ning', 2, 18],
  ['桢', 'zhen', 1, 13], ['樾', 'yue', 4, 16], ['柘', 'zhe', 4, 9], ['权', 'quan', 2, 22],
  ['材', 'cai', 2, 7], ['杭', 'hang', 2, 8], ['枚', 'mei', 2, 8], ['梧', 'wu', 2, 11],
  ['竹', 'zhu', 2, 6], ['简', 'jian', 3, 18], ['策', 'ce', 4, 12], ['筹', 'chou', 2, 20],
  ['芬', 'fen', 1, 10], ['芳', 'fang', 1, 10], ['花', 'hua', 1, 10], ['菊', 'ju', 2, 14],
  ['兰', 'lan', 2, 23], ['芝', 'zhi', 1, 10], ['芹', 'qin', 2, 10], ['荃', 'quan', 2, 12],
  ['萃', 'cui', 4, 14], ['蓁', 'zhen', 1, 16], ['荞', 'qiao', 2, 18], ['莞', 'wan', 3, 13],
  ['萦', 'ying', 2, 16], ['蔚', 'wei', 4, 17], ['芃', 'peng', 2, 9], ['芩', 'qin', 2, 10],
  ['苡', 'yi', 3, 11], ['莱', 'lai', 2, 14], ['萌', 'meng', 2, 14], ['葆', 'bao', 3, 15],
  ['萧', 'xiao', 1, 18], ['樟', 'zhang', 1, 15], ['樱', 'ying', 1, 21], ['栎', 'li', 4, 19],
  ['棹', 'zhao', 4, 12], ['楸', 'qiu', 1, 13], ['槐', 'huai', 2, 14], ['橙', 'cheng', 2, 16],
  ['檀', 'tan', 2, 17],
  ['炎', 'yan', 2, 8], ['灿', 'can', 4, 17], ['炫', 'xuan', 4, 9], ['炜', 'wei', 3, 13],
  ['烨', 'ye', 4, 14], ['煜', 'yu', 4, 13], ['熙', 'xi', 1, 13], ['煊', 'xuan', 1, 13],
  ['焕', 'huan', 4, 13], ['熠', 'yi', 4, 15], ['炅', 'jiong', 3, 8], ['昱', 'yu', 4, 9],
  ['晗', 'han', 2, 11], ['旭', 'xu', 4, 6], ['昊', 'hao', 4, 8], ['晟', 'sheng', 4, 11],
  ['晨', 'chen', 2, 11], ['景', 'jing', 3, 12], ['曜', 'yao', 4, 18], ['曦', 'xi', 1, 20],
  ['朗', 'lang', 3, 11], ['昭', 'zhao', 1, 9], ['昕', 'xin', 1, 8], ['昀', 'yun', 2, 8],
  ['暖', 'nuan', 3, 13], ['灵', 'ling', 2, 24], ['丹', 'dan', 1, 4], ['彤', 'tong', 2, 7],
  ['冉', 'ran', 3, 5], ['南', 'nan', 2, 9], ['丰', 'feng', 1, 18], ['日', 'ri', 4, 4],
  ['阳', 'yang', 2, 17], ['光', 'guang', 1, 6], ['亮', 'liang', 4, 9], ['明', 'ming', 2, 8],
  ['晶', 'jing', 1, 12], ['晴', 'qing', 2, 12], ['夏', 'xia', 4, 10], ['智', 'zhi', 4, 12],
  ['卓', 'zhuo', 2, 8], ['乐', 'le', 4, 15], ['恺', 'kai', 3, 14], ['恬', 'tian', 2, 10],
  ['甜', 'tian', 2, 11], ['亭', 'ting', 2, 9], ['俊', 'jun', 4, 9], ['丙', 'bing', 3, 5],
  ['丁', 'ding', 1, 2], ['鼎', 'ding', 3, 13], ['陶', 'tao', 2, 16], ['熹', 'xi', 1, 16],
  ['炀', 'yang', 2, 13], ['烜', 'xuan', 3, 10], ['暻', 'jing', 3, 16], ['晖', 'hui', 1, 13],
  ['晔', 'ye', 4, 16], ['旻', 'min', 2, 8], ['晏', 'yan', 4, 10], ['晓', 'xiao', 3, 16],
  ['暄', 'xuan', 1, 13], ['昆', 'kun', 1, 8], ['伶', 'ling', 2, 7],
  ['坤', 'kun', 1, 8], ['垚', 'yao', 2, 9], ['培', 'pei', 2, 11], ['城', 'cheng', 2, 10],
  ['域', 'yu', 4, 11], ['坚', 'jian', 1, 11], ['墨', 'mo', 4, 15], ['均', 'jun', 1, 7],
  ['坦', 'tan', 3, 8], ['基', 'ji', 1, 11], ['堂', 'tang', 2, 11], ['圣', 'sheng', 4, 13],
  ['在', 'zai', 4, 6], ['岳', 'yue', 4, 8], ['峰', 'feng', 1, 10], ['峻', 'jun', 4, 10],
  ['岚', 'lan', 2, 12], ['岩', 'yan', 2, 8], ['崇', 'chong', 2, 11], ['岐', 'qi', 2, 7],
  ['屿', 'yu', 3, 17], ['磊', 'lei', 3, 15], ['尧', 'yao', 2, 12], ['圆', 'yuan', 2, 13],
  ['恩', 'en', 1, 10], ['惟', 'wei', 2, 11], ['轩', 'xuan', 1, 10], ['逸', 'yi', 4, 15],
  ['山', 'shan', 1, 3], ['岸', 'an', 4, 8], ['岑', 'cen', 2, 7], ['巍', 'wei', 1, 21],
  ['嵩', 'song', 1, 13], ['岭', 'ling', 3, 17], ['奥', 'ao', 4, 13], ['宜', 'yi', 2, 8],
  ['容', 'rong', 2, 10], ['意', 'yi', 4, 13], ['依', 'yi', 1, 8], ['悠', 'you', 1, 11],
  ['维', 'wei', 2, 14], ['纬', 'wei', 3, 15], ['永', 'yong', 3, 5], ['远', 'yuan', 3, 17],
  ['辰', 'chen', 2, 7], ['壁', 'bi', 4, 16], ['田', 'tian', 2, 5], ['由', 'you', 2, 5],
  ['画', 'hua', 4, 12], ['延', 'yan', 2, 7], ['建', 'jian', 4, 9], ['音', 'yin', 1, 9],
  ['韵', 'yun', 4, 19], ['玮', 'wei', 3, 14], ['雍', 'yong', 1, 13], ['懿', 'yi', 4, 22],
  ['宇', 'yu', 3, 6], ['亦', 'yi', 4, 6], ['安', 'an', 1, 6], ['宁', 'ning', 2, 14],
  ['锋', 'feng', 1, 15], ['钢', 'gang', 1, 16], ['钧', 'jun', 1, 12], ['铭', 'ming', 2, 14],
  ['锐', 'rui', 4, 15], ['锡', 'xi', 1, 16], ['锦', 'jin', 3, 16], ['鑫', 'xin', 1, 24],
  ['键', 'jian', 4, 17], ['鉴', 'jian', 4, 22], ['钦', 'qin', 1, 12], ['镇', 'zhen', 4, 18],
  ['铮', 'zheng', 1, 16], ['钰', 'yu', 4, 13], ['铠', 'kai', 3, 18], ['珊', 'shan', 1, 10],
  ['珠', 'zhu', 1, 10], ['琳', 'lin', 2, 13], ['琦', 'qi', 2, 13], ['琪', 'qi', 2, 13],
  ['瑜', 'yu', 2, 14], ['瑞', 'rui', 4, 14], ['瑄', 'xuan', 1, 14], ['璇', 'xuan', 2, 16],
  ['璟', 'jing', 3, 17], ['璐', 'lu', 4, 18], ['瑾', 'jin', 3, 16], ['珏', 'jue', 2, 9],
  ['环', 'huan', 2, 18], ['玲', 'ling', 2, 10], ['珑', 'long', 2, 21], ['瑶', 'yao', 2, 15],
  ['莹', 'ying', 2, 15], ['铎', 'duo', 2, 21], ['金', 'jin', 1, 8], ['秋', 'qiu', 1, 9],
  ['书', 'shu', 1, 10], ['舒', 'shu', 1, 12], ['善', 'shan', 4, 12], ['信', 'xin', 4, 9],
  ['修', 'xiu', 1, 10], ['素', 'su', 4, 10], ['静', 'jing', 4, 16], ['心', 'xin', 1, 4],
  ['新', 'xin', 1, 13], ['正', 'zheng', 4, 5], ['世', 'shi', 4, 5], ['少', 'shao', 3, 4],
  ['西', 'xi', 1, 6], ['白', 'bai', 2, 5], ['辛', 'xin', 1, 7], ['成', 'cheng', 2, 7],
  ['利', 'li', 4, 7], ['剑', 'jian', 4, 15], ['刚', 'gang', 1, 10], ['则', 'ze', 2, 9],
  ['初', 'chu', 1, 7], ['硕', 'shuo', 4, 14], ['尚', 'shang', 4, 8], ['臣', 'chen', 2, 6],
  ['川', 'chuan', 1, 3], ['舟', 'zhou', 1, 6], ['州', 'zhou', 1, 6], ['祖', 'zu', 3, 10],
  ['祥', 'xiang', 2, 11], ['禄', 'lu', 4, 13], ['禧', 'xi', 3, 17], ['珍', 'zhen', 1, 10],
  ['宣', 'xuan', 1, 9], ['序', 'xu', 4, 7], ['谦', 'qian', 1, 17], ['赞', 'zan', 4, 19],
  ['超', 'chao', 1, 12], ['锴', 'kai', 3, 17], ['承', 'cheng', 2, 8], ['语', 'yu', 3, 14],
  ['诺', 'nuo', 4, 16], ['诗', 'shi', 1, 13], ['梦', 'meng', 4, 14], ['思', 'si', 1, 9],
  ['悦', 'yue', 4, 11], ['欣', 'xin', 1, 8], ['嘉', 'jia', 1, 14], ['佳', 'jia', 1, 8],
  ['博', 'bo', 2, 12], ['睿', 'rui', 4, 14], ['知', 'zhi', 1, 8], ['星', 'xing', 1, 9],
  ['言', 'yan', 2, 7], ['和', 'he', 2, 8],
  ['江', 'jiang', 1, 7], ['河', 'he', 2, 9], ['海', 'hai', 3, 11], ['洋', 'yang', 2, 10],
  ['波', 'bo', 1, 9], ['涛', 'tao', 1, 18], ['涵', 'han', 2, 12], ['清', 'qing', 1, 12],
  ['澈', 'che', 4, 16], ['澄', 'cheng', 2, 16], ['润', 'run', 4, 16], ['泽', 'ze', 2, 17],
  ['沛', 'pei', 4, 8], ['沁', 'qin', 4, 8], ['泓', 'hong', 2, 9], ['泉', 'quan', 2, 9],
  ['汐', 'xi', 1, 7], ['淇', 'qi', 2, 12], ['鸿', 'hong', 2, 17], ['滋', 'zi', 1, 13],
  ['淼', 'miao', 3, 12], ['雨', 'yu', 3, 8], ['雪', 'xue', 3, 11], ['霖', 'lin', 2, 16],
  ['霏', 'fei', 1, 16], ['露', 'lu', 4, 21], ['霆', 'ting', 2, 15], ['雯', 'wen', 2, 12],
  ['霓', 'ni', 2, 16], ['湉', 'tian', 2, 13], ['沐', 'mu', 4, 8], ['宸', 'chen', 2, 10],
  ['然', 'ran', 2, 12], ['文', 'wen', 2, 4], ['月', 'yue', 4, 4], ['水', 'shui', 3, 4],
  ['冰', 'bing', 1, 6], ['洁', 'jie', 2, 16], ['浩', 'hao', 4, 11], ['瀚', 'han', 4, 20],
  ['渊', 'yuan', 1, 12], ['澜', 'lan', 2, 21], ['潮', 'chao', 2, 16], ['溪', 'xi', 1, 14],
  ['湘', 'xiang', 1, 13], ['渝', 'yu', 2, 13], ['深', 'shen', 1, 12], ['湛', 'zhan', 4, 13],
  ['汇', 'hui', 4, 13], ['洲', 'zhou', 1, 10], ['湾', 'wan', 1, 26], ['云', 'yun', 2, 12],
  ['风', 'feng', 1, 9], ['北', 'bei', 3, 5], ['冬', 'dong', 1, 5], ['玄', 'xuan', 2, 5],
  ['子', 'zi', 3, 3], ['平', 'ping', 2, 5], ['方', 'fang', 1, 4], ['帆', 'fan', 1, 6],
  ['航', 'hang', 2, 10], ['敏', 'min', 3, 11], ['慧', 'hui', 4, 15], ['惠', 'hui', 4, 12],
  ['霈', 'pei', 4, 15], ['灏', 'hao', 4, 25], ['湄', 'mei', 2, 13], ['滨', 'bin', 1, 18],
  ['洛', 'luo', 4, 10], ['津', 'jin', 1, 10], ['泊', 'bo', 2, 9], ['沧', 'cang', 1, 14],
  ['浦', 'pu', 3, 11],
];

const SURNAME_STROKES = {
  王: 4, 李: 7, 张: 11, 刘: 15, 陈: 16, 杨: 13, 黄: 12, 赵: 14, 吴: 7, 周: 8,
  徐: 10, 孙: 10, 马: 10, 朱: 6, 胡: 11, 郭: 15, 何: 7, 高: 10, 林: 8, 罗: 20,
  郑: 19, 梁: 11, 谢: 17, 宋: 7, 唐: 10, 许: 11, 韩: 17, 冯: 12, 曹: 11, 彭: 12,
  曾: 12, 萧: 18, 田: 5, 董: 15, 潘: 16, 袁: 10, 蔡: 17, 余: 7, 于: 3, 杜: 7,
  叶: 15, 程: 12, 魏: 18, 吕: 7, 丁: 2, 任: 6, 姚: 9, 卢: 16, 姜: 9, 崔: 11,
  钟: 17, 谭: 19, 陆: 16, 范: 15, 金: 8, 石: 5, 廖: 14, 贾: 13, 夏: 10, 韦: 9,
  付: 5, 方: 4, 白: 5, 邹: 17, 孟: 8, 熊: 14, 秦: 10, 邱: 12, 江: 7, 尹: 4,
  薛: 19, 段: 9, 雷: 13, 侯: 9, 龙: 16, 史: 5, 陶: 16, 黎: 15, 贺: 12, 顾: 21,
  毛: 4, 郝: 14, 龚: 22, 邵: 12, 钱: 16, 严: 20, 武: 8, 戴: 18, 莫: 13, 孔: 4,
  向: 6, 常: 11, 康: 11, 易: 8, 文: 4, 施: 9, 洪: 10, 安: 6, 颜: 18, 温: 13,
  章: 11, 鲁: 15, 葛: 15, 伍: 6, 申: 5, 尤: 4, 焦: 12, 柳: 9, 邢: 11, 路: 13,
  岳: 8, 乔: 12, 赖: 20, 万: 15, 苏: 22, 蒋: 17, 沈: 8, 汪: 8, 邓: 19, 覃: 12,
  房: 8, 边: 22, 辛: 7, 涂: 11, 甘: 5, 封: 9, 储: 18, 邬: 17, 路: 13, 詹: 13,
};

const SURNAME_READING = {
  王: ['wang', 2], 李: ['li', 3], 张: ['zhang', 1], 刘: ['liu', 2], 陈: ['chen', 2],
  杨: ['yang', 2], 黄: ['huang', 2], 赵: ['zhao', 4], 吴: ['wu', 2], 周: ['zhou', 1],
  徐: ['xu', 2], 孙: ['sun', 1], 马: ['ma', 3], 朱: ['zhu', 1], 胡: ['hu', 2],
  郭: ['guo', 1], 何: ['he', 2], 高: ['gao', 1], 林: ['lin', 2], 罗: ['luo', 2],
  郑: ['zheng', 4], 梁: ['liang', 2], 谢: ['xie', 4], 宋: ['song', 4], 唐: ['tang', 2],
  许: ['xu', 3], 韩: ['han', 2], 冯: ['feng', 2], 曹: ['cao', 2], 彭: ['peng', 2],
  曾: ['zeng', 1], 萧: ['xiao', 1], 田: ['tian', 2], 董: ['dong', 3], 潘: ['pan', 1],
  袁: ['yuan', 2], 蔡: ['cai', 4], 余: ['yu', 2], 于: ['yu', 2], 杜: ['du', 4],
  叶: ['ye', 4], 程: ['cheng', 2], 魏: ['wei', 4], 吕: ['lv', 3], 丁: ['ding', 1],
  任: ['ren', 2], 姚: ['yao', 2], 卢: ['lu', 2], 姜: ['jiang', 1], 崔: ['cui', 1],
  钟: ['zhong', 1], 谭: ['tan', 2], 陆: ['lu', 4], 范: ['fan', 4], 金: ['jin', 1],
  石: ['shi', 2], 廖: ['liao', 4], 贾: ['jia', 3], 夏: ['xia', 4], 韦: ['wei', 2],
  付: ['fu', 4], 方: ['fang', 1], 白: ['bai', 2], 邹: ['zou', 1], 孟: ['meng', 4],
  熊: ['xiong', 2], 秦: ['qin', 2], 邱: ['qiu', 1], 江: ['jiang', 1], 尹: ['yin', 3],
  薛: ['xue', 1], 段: ['duan', 4], 雷: ['lei', 2], 侯: ['hou', 2], 龙: ['long', 2],
  史: ['shi', 3], 陶: ['tao', 2], 黎: ['li', 2], 贺: ['he', 4], 顾: ['gu', 4],
  毛: ['mao', 2], 郝: ['hao', 3], 龚: ['gong', 1], 邵: ['shao', 4], 钱: ['qian', 2],
  严: ['yan', 2], 武: ['wu', 3], 戴: ['dai', 4], 莫: ['mo', 4], 孔: ['kong', 3],
  向: ['xiang', 4], 常: ['chang', 2], 康: ['kang', 1], 易: ['yi', 4], 文: ['wen', 2],
  施: ['shi', 1], 洪: ['hong', 2], 安: ['an', 1], 颜: ['yan', 2], 温: ['wen', 1],
  章: ['zhang', 1], 鲁: ['lu', 3], 葛: ['ge', 3], 伍: ['wu', 3], 申: ['shen', 1],
  尤: ['you', 2], 焦: ['jiao', 1], 柳: ['liu', 3], 邢: ['xing', 2], 路: ['lu', 4],
  岳: ['yue', 4], 乔: ['qiao', 2], 赖: ['lai', 4], 万: ['wan', 4], 苏: ['su', 1],
  蒋: ['jiang', 3], 沈: ['shen', 3], 汪: ['wang', 1], 邓: ['deng', 4], 覃: ['tan', 2],
  房: ['fang', 2], 边: ['bian', 1], 辛: ['xin', 1], 涂: ['tu', 2], 甘: ['gan', 1],
  封: ['feng', 1], 储: ['chu', 3], 邬: ['wu', 1], 詹: ['zhan', 1],
  欧: ['ou', 1],
  阳: ['yang', 2],
  司: ['si', 1],
  上: ['shang', 4],
  官: ['guan', 1],
  诸: ['zhu', 1],
  东: ['dong', 1],
  皇: ['huang', 2],
  甫: ['fu', 3],
  尉: ['yu', 4],
  迟: ['chi', 2],
  令: ['ling', 4],
  狐: ['hu', 2],
  慕: ['mu', 4],
  徒: ['tu', 2],
  公: ['gong', 1],
};

const DOUBLE_SURNAMES = {
  欧阳: { s: [15, 17], py: 'ouyang', tone: 1 },
  司马: { s: [5, 10], py: 'sima', tone: 1 },
  上官: { s: [3, 8], py: 'shangguan', tone: 4 },
  诸葛: { s: [15, 15], py: 'zhuge', tone: 1 },
  东方: { s: [8, 4], py: 'dongfang', tone: 1 },
  皇甫: { s: [9, 7], py: 'huangfu', tone: 2 },
  尉迟: { s: [11, 19], py: 'yuchi', tone: 4 },
  令狐: { s: [5, 8], py: 'linghu', tone: 4 },
  慕容: { s: [14, 10], py: 'murong', tone: 4 },
  宇文: { s: [6, 4], py: 'yuwen', tone: 3 },
  司徒: { s: [5, 10], py: 'situ', tone: 1 },
  夏侯: { s: [10, 9], py: 'xiahou', tone: 4 },
  公孙: { s: [4, 10], py: 'gongsun', tone: 1 },
};

const SHULI_81 = [null,
  ['吉', '太极之数'], ['凶', '两仪之数'], ['吉', '三才之数'], ['凶', '四象之数'],
  ['吉', '五行之数'], ['吉', '六爻之数'], ['吉', '七政之数'], ['吉', '八卦之数'],
  ['凶', '大成之数'], ['凶', '终结之数'], ['吉', '旱苗逢雨'], ['凶', '掘井无泉'],
  ['吉', '春日牡丹'], ['凶', '破兆之数'], ['吉', '福寿之数'], ['吉', '厚重之数'],
  ['吉', '刚强之数'], ['吉', '铁镜重磨'], ['凶', '多难之数'], ['凶', '屋下藏金'],
  ['吉', '明月中天'], ['凶', '秋草逢霜'], ['吉', '壮丽之数'], ['吉', '掘藏得金'],
  ['吉', '荣俊之数'], ['凶', '变怪之数'], ['半吉', '增长之数'], ['凶', '阔水浮萍'],
  ['吉', '智谋之数'], ['半吉', '非运之数'], ['吉', '春日花开'], ['吉', '宝马金鞍'],
  ['吉', '旭日升天'], ['凶', '破家之数'], ['吉', '高楼望月'], ['凶', '波澜重叠'],
  ['吉', '猛虎出林'], ['半吉', '磨铁成针'], ['吉', '富贵荣华'], ['半吉', '退安之数'],
  ['吉', '有德之数'], ['半吉', '寒蝉在柳'], ['凶', '散财破产'], ['凶', '烦闷之数'],
  ['吉', '顺风之数'], ['凶', '浪里淘金'], ['吉', '点石成金'], ['吉', '古松立鹤'],
  ['半吉', '转变之数'], ['半吉', '小舟入海'], ['半吉', '沉浮之数'], ['吉', '先见之明'],
  ['半吉', '曲卷难星'], ['凶', '石上栽花'], ['半吉', '善恶之数'], ['凶', '浪里行舟'],
  ['吉', '日照春松'], ['半吉', '晚行遇月'], ['凶', '寒蝉悲风'], ['凶', '无谋之数'],
  ['吉', '牡丹芙蓉'], ['凶', '衰败之数'], ['吉', '舟归平海'], ['凶', '非命之数'],
  ['吉', '巨流归海'], ['凶', '岩头步马'], ['吉', '通达之数'], ['吉', '顺风吹帆'],
  ['凶', '非业之数'], ['凶', '残菊经霜'], ['半吉', '石上金花'], ['凶', '劳苦之数'],
  ['半吉', '志高力微'], ['凶', '残菊逢霜'], ['半吉', '退守之数'], ['凶', '离散之数'],
  ['半吉', '半吉之数'], ['半吉', '晚苦之数'], ['凶', '云头望月'], ['半吉', '遁吉之数'],
  ['吉', '万物回春'],
];

return { READING, SURNAME_STROKES, SURNAME_READING, DOUBLE_SURNAMES, SHULI_81 };
})();

__mods.name = (function () {
const { buildBazi } = __mods.bazi;
const { assertCivil } = __mods.validate;
const { READING, SURNAME_STROKES, SURNAME_READING, DOUBLE_SURNAMES, SHULI_81 } = __mods['name-data'];

const SHENG = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const KE = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };
const SHENG_BY = { 火: '木', 土: '火', 金: '土', 水: '金', 木: '水' }; // 生我者
const KE_BY = { 土: '木', 水: '土', 火: '水', 金: '火', 木: '金' }; // 克我者
const ALL = ['木', '火', '土', '金', '水'];

const CHAR_LIB = [
  ['梓', '木', '梓树，喻成长、手艺与念乡', 'n'], ['桐', '木', '梧桐，高洁、引来凤凰', 'n'],
  ['楠', '木', '楠木，坚韧贵重', 'n'], ['楷', '木', '楷模，端正可法', 'm'],
  ['松', '木', '松柏常青，坚韧长寿', 'm'], ['柏', '木', '柏树，刚直耐寒', 'm'],
  ['枫', '木', '枫叶，热烈与秋意', 'n'], ['榕', '木', '榕树，荫庇包容', 'n'],
  ['槿', '木', '木槿，朝开暮落、坚韧', 'f'], ['棠', '木', '海棠，明媚雅致', 'f'],
  ['楚', '木', '清楚、楚楚有致', 'n'], ['柯', '木', '草木枝干，条理分明', 'm'],
  ['桓', '木', '桓桓武貌，栋梁', 'm'], ['榆', '木', '榆树，安稳敦厚', 'n'],
  ['栩', '木', '栩栩生动', 'n'], ['榛', '木', '榛果，丰实', 'n'],
  ['芸', '木', '芸香，清雅好学', 'f'], ['芷', '木', '白芷，芳洁', 'f'],
  ['芮', '木', '草初生，柔而韧', 'f'], ['若', '木', '若木，从容', 'f'],
  ['茜', '木', '茜草，明丽', 'f'], ['茵', '木', '绿茵，葱茏', 'f'],
  ['茗', '木', '茶芽，清雅', 'f'], ['莎', '木', '莎草，柔韧', 'f'],
  ['茉', '木', '茉莉，素净芬芳', 'f'], ['筱', '木', '小竹，清秀有节', 'f'],
  ['蓉', '木', '芙蓉，明艳', 'f'], ['萱', '木', '萱草，忘忧', 'f'],
  ['蕙', '木', '蕙兰，芳心', 'f'], ['蕊', '木', '花蕊，含秀', 'f'],
  ['菲', '木', '芳菲，繁茂', 'f'], ['蔓', '木', '藤蔓，绵延', 'f'],
  ['荣', '木', '繁荣，荣光', 'm'], ['茂', '木', '茂盛，丰隆', 'm'],
  ['栋', '木', '栋梁', 'm'], ['梁', '木', '桥梁、栋梁', 'm'],
  ['朴', '木', '质朴', 'm'], ['本', '木', '根本', 'm'],
  ['炎', '火', '火盛，热烈', 'm'], ['灿', '火', '灿烂', 'n'],
  ['炫', '火', '光彩炫目', 'm'], ['炜', '火', '光明', 'm'],
  ['烨', '火', '火光盛明', 'm'], ['煜', '火', '照耀', 'm'],
  ['熙', '火', '光明和乐', 'n'], ['煊', '火', '温暖显赫', 'm'],
  ['焕', '火', '焕然一新', 'm'], ['熠', '火', '熠熠生辉', 'n'],
  ['炅', '火', '日光', 'n'], ['昱', '火', '日光，明亮', 'm'],
  ['晗', '火', '天将明', 'f'], ['旭', '火', '旭日初升', 'm'],
  ['昊', '火', '广大如天', 'm'], ['晟', '火', '光明兴盛', 'm'],
  ['晨', '火', '清晨', 'n'], ['景', '火', '光景、景仰', 'n'],
  ['曜', '火', '日光照耀', 'm'], ['曦', '火', '晨曦', 'n'],
  ['朗', '火', '明朗', 'm'], ['昭', '火', '昭明', 'n'],
  ['昕', '火', '黎明', 'f'], ['昀', '火', '日光', 'f'],
  ['暖', '火', '温暖', 'f'], ['灵', '火', '灵秀', 'f'],
  ['丹', '火', '赤诚', 'f'], ['彤', '火', '朱红', 'f'],
  ['冉', '火', '冉冉上升', 'f'], ['南', '火', '南方，向阳', 'n'],
  ['坤', '土', '大地，厚德', 'm'], ['垚', '土', '山高', 'm'],
  ['培', '土', '培育', 'm'], ['城', '土', '城池，坚固', 'm'],
  ['域', '土', '疆域', 'm'], ['坚', '土', '坚定', 'm'],
  ['墨', '土', '笔墨，文气', 'n'], ['均', '土', '均衡', 'm'],
  ['坦', '土', '坦荡', 'm'], ['基', '土', '根基', 'm'],
  ['堂', '土', '堂堂正正', 'm'], ['圣', '土', '圣明', 'm'],
  ['在', '土', '存在、自在', 'n'], ['岳', '土', '山岳', 'm'],
  ['峰', '土', '山峰', 'm'], ['峻', '土', '高峻', 'm'],
  ['岚', '土', '山间雾气', 'f'], ['岩', '土', '岩石，刚毅', 'm'],
  ['崇', '土', '崇高', 'm'], ['岐', '土', '岐山，分岔有路', 'm'],
  ['屿', '土', '小岛', 'n'], ['磊', '土', '磊落', 'm'],
  ['尧', '土', '古圣王，高远', 'm'], ['圆', '土', '圆满', 'f'],
  ['恩', '土', '恩厚', 'n'], ['惟', '土', '思惟', 'm'],
  ['锋', '金', '锋芒', 'm'], ['钢', '金', '刚强', 'm'],
  ['钧', '金', '权衡、钧衡', 'm'], ['铭', '金', '铭记', 'm'],
  ['锐', '金', '锐进', 'm'], ['锡', '金', '赐予', 'm'],
  ['锦', '金', '锦绣', 'n'], ['鑫', '金', '兴盛（三金）', 'm'],
  ['键', '金', '关键、强健', 'm'], ['鉴', '金', '明鉴', 'm'],
  ['钦', '金', '钦敬', 'm'], ['镇', '金', '镇守', 'm'],
  ['铮', '金', '铮铮有声', 'm'], ['钰', '金', '珍宝', 'n'],
  ['铠', '金', '铠甲', 'm'], ['珊', '金', '珊瑚', 'f'],
  ['珠', '金', '明珠', 'f'], ['琳', '金', '美玉', 'f'],
  ['琦', '金', '美玉、奇伟', 'n'], ['琪', '金', '美玉', 'f'],
  ['瑜', '金', '美玉、瑜亮', 'n'], ['瑞', '金', '祥瑞', 'n'],
  ['瑄', '金', '璧玉', 'f'], ['璇', '金', '美玉', 'f'],
  ['璟', '金', '玉光', 'n'], ['璐', '金', '美玉', 'f'],
  ['瑾', '金', '美玉，谨守', 'f'], ['珏', '金', '双玉', 'n'],
  ['环', '金', '圆环，周全', 'f'], ['玲', '金', '玲珑', 'f'],
  ['珑', '金', '玲珑', 'f'], ['瑶', '金', '瑶华', 'f'],
  ['莹', '金', '晶莹', 'f'], ['铎', '金', '铃铎，传声', 'm'],
  ['江', '水', '江河，开阔', 'm'], ['河', '水', '河流', 'm'],
  ['海', '水', '海纳百川', 'm'], ['洋', '水', '海洋，宽广', 'n'],
  ['波', '水', '波澜', 'm'], ['涛', '水', '波涛', 'm'],
  ['涵', '水', '包涵、涵养', 'f'], ['清', '水', '清澈', 'n'],
  ['澈', '水', '澄澈', 'm'], ['澄', '水', '澄明', 'n'],
  ['润', '水', '温润', 'm'], ['泽', '水', '恩泽', 'm'],
  ['沛', '水', '充沛', 'm'], ['沁', '水', '沁润', 'f'],
  ['泓', '水', '水深而广', 'm'], ['泉', '水', '源泉', 'n'],
  ['汐', '水', '潮汐', 'f'], ['淇', '水', '淇水', 'f'],
  ['鸿', '水', '鸿鹄、宏大', 'm'], ['滋', '水', '滋润', 'n'],
  ['淼', '水', '水势浩渺', 'n'], ['雨', '水', '甘霖', 'n'],
  ['雪', '水', '洁白', 'f'], ['霖', '水', '甘霖', 'm'],
  ['霏', '水', '雨雪纷飞', 'f'], ['露', '水', '露华', 'f'],
  ['霆', '水', '雷霆', 'm'], ['雯', '水', '云纹', 'f'],
  ['霓', '水', '虹霓', 'f'], ['湉', '水', '水流平缓', 'f'],
  ['沐', '水', '沐浴，受润泽', 'n'], ['宸', '木', '屋宇、北极星所居，喻尊贵', 'm'],
  ['轩', '土', '高轩，气宇轩昂', 'm'], ['逸', '土', '安逸、超逸', 'm'],
  ['然', '火', '自然、坦然', 'n'], ['承', '金', '承继担当', 'm'],
  ['语', '木', '言语，温言', 'f'], ['诺', '火', '诺言，信守', 'n'],
  ['诗', '金', '诗书，文气', 'f'], ['梦', '木', '梦想', 'f'],
  ['思', '金', '思虑，才思', 'n'], ['悦', '金', '喜悦', 'f'],
  ['欣', '木', '欢欣', 'f'], ['嘉', '木', '嘉美', 'n'],
  ['佳', '木', '佳好', 'f'], ['博', '水', '博学', 'm'],
  ['文', '水', '文采', 'n'], ['睿', '金', '睿智', 'm'],
  ['宇', '土', '器宇、宇宙', 'm'], ['亦', '土', '也，从容', 'n'],
  ['知', '火', '知晓，明理', 'n'], ['星', '火', '星辰', 'n'],
  ['月', '木', '明月', 'f'], ['言', '木', '言语，信', 'n'],
  ['和', '水', '和顺', 'n'], ['安', '土', '安宁', 'n'],
  ['宁', '火', '安宁', 'f'],
  ['林', '木', '林木成片，茂盛有荫', 'n'], ['森', '木', '众木成林，森然', 'n'],
  ['枝', '木', '枝条，生发', 'n'], ['果', '木', '果实，有成', 'n'],
  ['禾', '木', '禾苗，五谷初生', 'n'], ['秀', '木', '禾吐穗，秀美出众', 'n'],
  ['穗', '木', '谷穗，丰实', 'n'], ['稼', '木', '庄稼，耕作有成', 'm'],
  ['颖', '木', '禾颖，聪颖', 'n'], ['苗', '木', '苗裔，初生有生机', 'n'],
  ['菁', '木', '菁华，草木茂盛', 'f'], ['菡', '木', '荷花含苞', 'f'],
  ['蕴', '木', '蕴积，含而不露', 'f'], ['蕾', '木', '花蕾，待放', 'f'],
  ['薇', '木', '蔷薇，细而韧', 'f'], ['薏', '木', '薏苡，清润', 'f'],
  ['菀', '木', '草木茂盛', 'f'], ['荷', '木', '荷花，出淤泥', 'f'],
  ['莲', '木', '莲花，清直', 'f'], ['菱', '木', '菱角，水生', 'f'],
  ['苇', '木', '芦苇，柔韧', 'n'], ['荻', '木', '荻草，秋声', 'n'],
  ['筠', '木', '竹皮，竹之青', 'n'], ['笛', '木', '竹笛，清音', 'n'],
  ['杉', '木', '杉木，挺拔', 'n'], ['柠', '木', '柠檬，清新', 'f'],
  ['桢', '木', '桢干，栋梁材', 'm'], ['樾', '木', '树荫，庇下', 'm'],
  ['柘', '木', '柘木，坚韧', 'n'], ['权', '木', '权衡，执中', 'm'],
  ['材', '木', '木材，成材', 'm'], ['杭', '木', '苏杭，舟行', 'n'],
  ['枚', '木', '衔枚，静而进', 'n'], ['梧', '木', '梧桐，栖凤', 'n'],
  ['竹', '木', '竹，有节而虚心', 'n'], ['简', '木', '简朴，简静', 'n'],
  ['策', '木', '策谋，鞭策', 'm'], ['筹', '木', '筹算，谋划', 'm'],
  ['芬', '木', '芬芳', 'f'], ['芳', '木', '芳华', 'f'],
  ['花', '木', '花，明媚', 'f'], ['菊', '木', '菊花，晚节', 'f'],
  ['兰', '木', '兰花，幽香', 'f'], ['芝', '木', '芝兰，瑞草', 'f'],
  ['芹', '木', '芹献，谦诚', 'f'], ['荃', '木', '荃草，香草', 'f'],
  ['萃', '木', '荟萃，聚合', 'n'], ['蓁', '木', '蓁蓁，草木盛', 'n'],
  ['荞', '木', '荞麦，实而不华', 'f'], ['莞', '木', '莞尔，浅笑', 'f'],
  ['萦', '木', '萦绕，绵长', 'f'], ['蔚', '木', '蔚然，文采盛', 'n'],
  ['芃', '木', '芃芃，草木茂', 'n'], ['芩', '木', '黄芩，草本', 'f'],
  ['苡', '木', '薏苡，清润', 'f'], ['莱', '木', '莱草，野而秀', 'n'],
  ['萌', '木', '萌芽，生机', 'n'], ['葆', '木', '永葆，守而不失', 'n'],
  ['萧', '木', '萧然，清疏', 'n'], ['樟', '木', '樟木，香而久', 'n'],
  ['樱', '木', '樱花，明丽', 'f'], ['栎', '木', '栎树，坚实', 'n'],
  ['棹', '木', '舟棹，行水', 'n'], ['楸', '木', '楸树，高直', 'n'],
  ['槐', '木', '槐树，三公之位', 'n'], ['橙', '木', '橙，明暖', 'n'],
  ['檀', '木', '檀香，沉静', 'n'],
  ['丰', '火', '丰盛、丰盈（繁体豐从豆，归火）', 'n'], ['日', '火', '太阳，光明', 'm'],
  ['阳', '火', '阳光，向阳而生', 'm'], ['光', '火', '光明', 'n'],
  ['亮', '火', '明亮，爽朗', 'm'], ['明', '火', '光明、明理', 'n'],
  ['晶', '火', '晶莹，三光', 'f'], ['晴', '火', '晴朗，天开', 'f'],
  ['夏', '火', '夏天，盛大', 'n'], ['智', '火', '智慧，明达', 'm'],
  ['卓', '火', '卓越，卓立', 'm'], ['乐', '火', '和乐', 'n'],
  ['恺', '火', '恺悌，和乐', 'm'], ['恬', '火', '恬静', 'f'],
  ['甜', '火', '甜美', 'f'], ['亭', '火', '亭亭，端立', 'f'],
  ['俊', '火', '俊朗，才俊', 'm'], ['丙', '火', '天干丙，阳火', 'm'],
  ['丁', '火', '天干丁，阴火', 'n'], ['鼎', '火', '鼎立，厚重', 'm'],
  ['陶', '火', '陶然，自得', 'n'], ['熹', '火', '熹微，晨光', 'n'],
  ['炀', '火', '火旺，炽盛', 'm'], ['烜', '火', '烜赫，显明', 'm'],
  ['暻', '火', '日光', 'n'], ['晖', '火', '日晖，光彩', 'n'],
  ['晔', '火', '光晔，明盛', 'n'], ['旻', '火', '秋天，天高', 'm'],
  ['晏', '火', '晏然，安和', 'n'], ['晓', '火', '拂晓，天将明', 'f'],
  ['暄', '火', '温暖，日暖', 'f'], ['昆', '火', '昆山，同也', 'm'],
  ['伶', '火', '伶俐，聪敏', 'f'],
  ['山', '土', '山，稳重', 'm'], ['岸', '土', '岸然，独立', 'm'],
  ['岑', '土', '小山，高而静', 'n'], ['巍', '土', '巍峨，高大', 'm'],
  ['嵩', '土', '嵩山，高峻', 'm'], ['岭', '土', '山岭，绵延', 'n'],
  ['奥', '土', '深奥，蕴藉', 'm'], ['宜', '土', '宜然，合度', 'n'],
  ['容', '土', '包容，容仪', 'n'], ['意', '土', '心意，诚意', 'f'],
  ['依', '土', '依倚，亲近', 'f'], ['悠', '土', '悠然，从容', 'f'],
  ['维', '土', '维系，纲维', 'n'], ['纬', '土', '经纬，有条', 'n'],
  ['永', '土', '永恒，久长', 'n'], ['远', '土', '高远', 'm'],
  ['辰', '土', '星辰、辰时', 'm'], ['壁', '土', '壁立，端正', 'm'],
  ['田', '土', '田野，耕获', 'm'], ['由', '土', '由来，自得', 'n'],
  ['画', '土', '图画，文采', 'f'], ['延', '土', '延展，绵长', 'm'],
  ['建', '土', '建立，树也', 'm'], ['音', '土', '音声，和鸣', 'f'],
  ['韵', '土', '韵致，余响', 'f'], ['玮', '土', '美玉，珍奇', 'm'],
  ['雍', '土', '雍容，和穆', 'm'], ['懿', '土', '懿德，美善', 'f'],
  ['金', '金', '金，坚而贵', 'm'], ['秋', '金', '秋收、成熟（秋属金，肃而收）', 'n'],
  ['书', '金', '书卷，文墨', 'n'], ['舒', '金', '舒展，从容', 'n'],
  ['善', '金', '善良，善成', 'n'], ['信', '金', '诚信，符信', 'm'],
  ['修', '金', '修远，修身', 'm'], ['素', '金', '素雅，本色', 'f'],
  ['静', '金', '安静，沉静', 'f'], ['心', '金', '心志，中藏', 'f'],
  ['新', '金', '新意，日新', 'n'], ['正', '金', '正直，端正', 'm'],
  ['世', '金', '世代，绵延', 'm'], ['少', '金', '少年，少壮', 'm'],
  ['西', '金', '西方，金位', 'n'], ['白', '金', '洁白，素净', 'n'],
  ['辛', '金', '天干辛，阴金', 'n'], ['成', '金', '成器，成事', 'm'],
  ['利', '金', '利落，锋利', 'm'], ['剑', '金', '剑，刚锐', 'm'],
  ['刚', '金', '刚强，不屈', 'm'], ['则', '金', '法则，有度', 'm'],
  ['初', '金', '初心，开端', 'n'], ['硕', '金', '硕大，学殖', 'm'],
  ['尚', '金', '崇尚，尚贤', 'n'], ['臣', '金', '臣，佐事', 'm'],
  ['川', '金', '川流，通达', 'n'], ['舟', '金', '舟行，济渡', 'n'],
  ['州', '金', '州，聚落', 'n'], ['祖', '金', '祖德，源远', 'm'],
  ['祥', '金', '吉祥，祥瑞', 'n'], ['禄', '金', '福禄，俸给', 'm'],
  ['禧', '金', '禧庆，福', 'n'], ['珍', '金', '珍宝，珍重', 'f'],
  ['宣', '金', '宣明，布达', 'n'], ['序', '金', '秩序，庠序', 'n'],
  ['谦', '金', '谦逊，有终', 'm'], ['赞', '金', '赞美，佐成', 'm'],
  ['超', '金', '超越，越过', 'm'], ['锴', '金', '精铁，坚刚', 'm'],
  ['水', '水', '水，润下', 'n'], ['冰', '水', '冰清，澄澈', 'f'],
  ['洁', '水', '洁净，洁身', 'f'], ['浩', '水', '浩大，广远', 'm'],
  ['瀚', '水', '浩瀚，无涯', 'm'], ['渊', '水', '渊深，有本', 'm'],
  ['澜', '水', '波澜，壮阔', 'n'], ['潮', '水', '潮涌，有信', 'n'],
  ['溪', '水', '溪流，清浅', 'f'], ['湘', '水', '湘水，清深', 'f'],
  ['渝', '水', '渝水，守而不变', 'n'], ['深', '水', '深厚，深藏', 'm'],
  ['湛', '水', '湛然，清深', 'm'], ['汇', '水', '汇聚，会归', 'n'],
  ['洲', '水', '洲渚，水中地', 'n'], ['湾', '水', '水湾，曲处', 'f'],
  ['云', '水', '云行，舒卷', 'n'], ['风', '水', '风雅，流动', 'n'],
  ['北', '水', '北方，水位', 'n'], ['冬', '水', '冬藏，静敛', 'f'],
  ['玄', '水', '玄远，幽深', 'n'], ['子', '水', '子，初生', 'm'],
  ['平', '水', '平和，坦易', 'n'], ['方', '水', '方正，有隅', 'n'],
  ['帆', '水', '风帆，顺行', 'n'], ['航', '水', '航行，济远', 'm'],
  ['敏', '水', '敏思，捷悟', 'f'], ['慧', '水', '慧心，明彻', 'f'],
  ['惠', '水', '惠泽，施与', 'f'], ['霈', '水', '霈雨，丰沛', 'm'],
  ['灏', '水', '灏气，广大', 'm'], ['湄', '水', '水湄，岸边', 'f'],
  ['滨', '水', '水滨，近水', 'n'], ['洛', '水', '洛水，清流', 'n'],
  ['津', '水', '津渡，要处', 'n'], ['泊', '水', '淡泊，自守', 'm'],
  ['沧', '水', '沧海，苍茫', 'm'], ['浦', '水', '浦，水滨', 'n'],
];

const EL_INDEX = new Map();
const EXTRA_INDEX = new Map();
for (const [c, py, tone, st] of READING) {
  if (!EXTRA_INDEX.has(c)) EXTRA_INDEX.set(c, { py, tone, st });
}
for (const c of CHAR_LIB) {
  if (!EL_INDEX.has(c[0])) {
    const x = EXTRA_INDEX.get(c[0]) || {};
    EL_INDEX.set(c[0], {
      c: c[0], el: c[1], meaning: c[2], g: c[3], order: EL_INDEX.size,
      py: x.py || null, tone: x.tone || null, strokes: x.st || null,
    });
  }
}

const NUM_ELEMENT = { 1: '木', 2: '木', 3: '火', 4: '火', 5: '土', 6: '土', 7: '金', 8: '金', 9: '水', 0: '水' };
const WX_REL = (a, b) => (a === b ? '同' : SHENG[a] === b ? '生' : KE[a] === b ? '克' : SHENG[b] === a ? '被生' : '被克');

function shuliOf(n) {
  let x = n;
  while (x > 81) x -= 80;
  if (!(x >= 1)) return null;
  const row = SHULI_81[x];
  return row ? { num: x, level: row[0], name: row[1] } : null;
}

function overridesOf(input) {
  const out = {};
  for (const src of [input && input.surnameStrokes, input && input.strokeOverrides]) {
    if (!src || typeof src !== 'object') continue;
    for (const [k, v] of Object.entries(src)) {
      if (Number.isInteger(v) && v > 0) out[k] = v;
    }
  }
  return Object.keys(out).length ? out : undefined;
}

function strokeOf(ch, overrides, kind) {
  if (overrides && Number.isInteger(overrides[ch]) && overrides[ch] > 0) {
    return { strokes: overrides[ch], source: 'user' };
  }
  const info = EL_INDEX.get(ch);
  if (info && info.strokes) return { strokes: info.strokes, source: 'lib' };
  if (kind === 'surname' && SURNAME_STROKES[ch]) return { strokes: SURNAME_STROKES[ch], source: 'surname' };
  return null;
}

function readingOf(ch, kind) {  const info = EL_INDEX.get(ch);
  if (info && info.py) return { py: info.py, tone: info.tone };
  if (kind === 'surname' && SURNAME_READING[ch]) {
    const [py, tone] = SURNAME_READING[ch];
    return { py, tone };
  }
  return null;
}

function wuge(surname, given, overrides) {
  const s = [...String(surname || '')];
  const g = [...String(given || '')];
  if (!s.length || !g.length) return { available: false, reason: '需要姓与名才能排五格' };
  if (s.length > 2) return { available: false, reason: '姓超过两字：五格只算单姓与常见复姓' };

  const dbl = s.length === 2 ? DOUBLE_SURNAMES[surname] : null;
  const useDbl = dbl && !s.some((ch) => overrides && overrides[ch]);
  const sInfo = useDbl
    ? dbl.s.map((n) => ({ strokes: n, source: 'table' }))
    : s.map((ch) => strokeOf(ch, overrides, 'surname'));
  const gInfo = g.map((ch) => strokeOf(ch, overrides, 'given'));
  const missing = [...s, ...g].filter((ch, i) => !(i < s.length ? sInfo[i] : gInfo[i - s.length]));
  if (missing.length) {
    return {
      available: false,
      reason: `这些字没有康熙笔画数据，五格算不了：${missing.join('、')}——可用 strokeOverrides 传入笔画后再算`,
      missing,
    };
  }

  const sStroke = sInfo.map((x) => x.strokes);
  const gStroke = gInfo.map((x) => x.strokes);
  const sum = (a) => a.reduce((x, y) => x + y, 0);
  const isDouble = s.length === 2;
  const tian = isDouble ? sum(sStroke) : sStroke[0] + 1;
  const ren = sStroke[s.length - 1] + gStroke[0];
  const di = sum(gStroke) + (g.length === 1 ? 1 : 0);
  const zong = sum(sStroke) + sum(gStroke);
  const wai = s.length === 1 && g.length === 1 ? 2 : zong - ren + 1;

  const rows = [['天格', tian], ['人格', ren], ['地格', di], ['外格', wai], ['总格', zong]].map(([key, n]) => ({
    key, strokes: n, ...shuliOf(n),
  }));
  const sancaiNums = [tian, ren, di].map((n) => n % 10);
  const sancaiEl = sancaiNums.map((n) => NUM_ELEMENT[n]);
  const rels = [
    { pair: '天与人', rel: WX_REL(sancaiEl[0], sancaiEl[1]) },
    { pair: '人与地', rel: WX_REL(sancaiEl[1], sancaiEl[2]) },
  ];
  const ordered = sancaiEl[0] === sancaiEl[1] && sancaiEl[1] === sancaiEl[2]
    ? '三才同气，气脉集中'
    : rels.every((x) => x.rel === '生' || x.rel === '同')
      ? '一路相生，传统看作顺遂'
      : rels.every((x) => x.rel === '克' || x.rel === '被克')
        ? '相连相克，传统看作内外拉扯'
        : `${rels.map((x) => `${x.pair}${x.rel}`).join('、')}，吉凶各派看法不一`;

  const source = [...sInfo, ...gInfo].some((x) => x.source === 'user') ? 'mixed' : 'table';
  return {
    available: true,
    surnameStyle: isDouble ? '复姓' : '单姓',
    strokes: [
      ...s.map((ch, i) => ({ char: ch, strokes: sInfo[i].strokes, source: sInfo[i].source, kind: '姓' })),
      ...g.map((ch, i) => ({ char: ch, strokes: gInfo[i].strokes, source: gInfo[i].source, kind: '名' })),
    ],
    rows,
    sancai: {
      elements: sancaiEl,
      text: `${sancaiEl.join('')}（${ordered}）`,
      relations: rels,
    },
    summary: rows.map((r) => `${r.key}${r.strokes}${r.level}`).join('　'),
    source,
  };
}

const INITIALS = ['zh', 'ch', 'sh', 'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'r', 'z', 'c', 's', 'y', 'w'];

function splitPinyin(py) {
  const p = String(py || '').toLowerCase();
  for (const ini of INITIALS) {
    if (p.startsWith(ini)) return { ini, fin: p.slice(ini.length) };
  }
  return { ini: '', fin: p };
}

const TONE_LABEL = { 1: '一', 2: '二', 3: '三', 4: '四' };

function phonetics(fullName) {
  const chars = [...String(fullName || '')];
  if (chars.length < 2) return { available: false, reason: '至少两个字才谈得上音韵' };
  const items = chars.map((ch, i) => {
    const r = readingOf(ch, i === 0 ? 'surname' : 'given');
    return r ? { char: ch, py: r.py, tone: r.tone, ...splitPinyin(r.py) } : { char: ch, py: null, tone: null, ini: null, fin: null };
  });
  const missing = items.filter((x) => !x.py).map((x) => x.char);
  if (missing.length) {
    return { available: false, reason: `这些字没有读音数据：${missing.join('、')}`, missing };
  }

  const issues = [];
  const tones = new Set(items.map((x) => x.tone));
  if (tones.size === 1 && items.length >= 2) {
    issues.push({ type: 'tone', text: `全名都是${TONE_LABEL[items[0].tone]}声，声调没有起伏` });
  }
  for (let i = 1; i < items.length; i++) {
    const a = items[i - 1];
    const b = items[i];
    if (a.py === b.py && a.tone === b.tone) {
      issues.push({ type: 'same', text: `「${a.char}${b.char}」同音同调（叠字或撞音）` });
      continue;
    }
    if (a.ini && a.ini === b.ini) issues.push({ type: 'initial', text: `「${a.char}${b.char}」同声母 ${a.ini}` });
    if (a.fin === b.fin) issues.push({ type: 'final', text: `「${a.char}${b.char}」同韵母 ${a.fin}` });
  }
  const inis = new Set(items.map((x) => x.ini).filter(Boolean));
  if (items.length >= 3 && inis.size === 1) {
    issues.push({ type: 'initial', text: `三字同声母 ${[...inis][0]}，连着读容易黏在一起` });
  }
  const level = issues.length === 0 ? '顺口' : issues.length === 1 ? '略拗' : '拗口';
  return {
    available: true,
    chars: items.map((x) => ({ char: x.char, py: x.py, tone: x.tone })),
    tonePattern: items.map((x) => x.tone).join('-'),
    issues,
    level,
  };
}

function userElement(input, ch) {
  const map = input && input.charElements;
  if (!map || typeof map !== 'object') return null;
  const v = map[ch];
  return ALL.includes(v) ? v : null;
}

function suggestFor(element, genderPref, exclude, count = 3) {
  const pool = CHAR_LIB.filter((c) => c[1] === element && !exclude.has(c[0]));
  pool.sort((a, b) => {
    const fit = (x) => (x[3] === genderPref || x[3] === 'n' ? 1 : 0);
    return fit(b) - fit(a);
  });
  return pool.slice(0, count).map((c) => ({ char: c[0], element: c[1], meaning: c[2] }));
}

const KIND_LABEL = { m: '男', f: '女', n: '中' };

function favorableElements(strength) {
  const level = strength && strength.level ? strength.level : null;
  const dayEl = strength && strength.dayElement ? strength.dayElement : null;
  if (!dayEl || !level) return { list: ALL.slice(), basis: '未取得旺衰：不筛五行，只做用字与字义建议' };
  if (level === '身强' || level === '偏强') {
    return {
      list: [KE_BY[dayEl], SHENG[dayEl], KE[dayEl]].filter(Boolean),
      basis: `${level}（${dayEl}）：宜克、泄、耗——用${KE_BY[dayEl]}（克我）、${SHENG[dayEl]}（我生）、${KE[dayEl]}（我克）`,
    };
  }
  if (level === '身弱' || level === '偏弱') {
    return {
      list: [dayEl, SHENG_BY[dayEl]].filter(Boolean),
      basis: `${level}（${dayEl}）：宜生、扶——用${dayEl}（同我）、${SHENG_BY[dayEl]}（生我）`,
    };
  }
  return { list: ALL.slice(), basis: `${level}：中和不偏，五行皆可用，以字义与音形为先` };
}

function charInfo(ch) {
  return EL_INDEX.get(ch) || null;
}

function assessName(input) {
  const surname = String(input.surname || '').trim();
  if (!surname) throw new Error('缺少姓氏：请给 surname（如「李」）');
  const given = String(input.givenName || '').trim();
  if (!given) throw new Error('缺少名字：请给 givenName（1–2 个汉字，如「沐宸」）');
  if ([...given].length > 2) throw new Error('名请给 1–2 个汉字；复姓请把复姓整体写在 surname，名只留 1–2 字');

  let favorable = { list: [], basis: '' };
  let strength = null;
  let baziNote = null;
  const hasBirth = Number.isInteger(input.year) && Number.isInteger(input.month) && Number.isInteger(input.day);
  if (hasBirth) {
    assertCivil(input, 'birth');
    const r = buildBazi({
      year: input.year, month: input.month, day: input.day,
      hour: Number.isInteger(input.hour) ? input.hour : 12,
      minute: Number.isInteger(input.minute) ? input.minute : 0,
      gender: input.gender || 'male',
      lateZi: input.lateZi !== false,
      trueSolar: input.trueSolar !== false,
      dst: input.dst !== false,
      longitude: input.longitude, address: input.address, geo: input.geo,
    });
    strength = { level: r.strength.level, score: r.strength.score, dayElement: r.pillars.day.stemElement };
    favorable = favorableElements(strength);
    baziNote = { dayMaster: r.dayMaster, solarNote: r.solarTime ? r.solarTime.note : '' };
  }

  const genderPref = input.gender === 'female' ? 'f' : 'm';
  const taken = new Set([surname, ...given]);
  const favPool = favorable.list.length ? favorable.list : ALL.slice();
  const chars = [...given].map((ch) => {
    const info = charInfo(ch);
    const given = userElement(input, ch);
    if (info) {
      return {
        char: ch, element: info.el, meaning: info.meaning,
        genderHint: KIND_LABEL[info.g], favorable: hasBirth ? favorable.list.includes(info.el) : null,
        source: 'lib', note: null,
      };
    }
    if (given) {
      return {
        char: ch, element: given, meaning: '字库未收录；五行按你指定的「' + given + '」计',
        genderHint: null, favorable: hasBirth ? favorable.list.includes(given) : null,
        source: 'user', note: '此字五行由调用方指定，不是字库推断',
      };
    }
    return {
      char: ch, element: '未收录', meaning: '字库未收录，未推断五行（不猜）',
      genderHint: null, favorable: null, source: 'none',
      note: hasBirth ? '若想贴合命局，可换用下面的同喜用字' : '字库未收录：给出生辰后可以看同喜用的替换字',
      suggest: hasBirth
        ? favPool.flatMap((el) => suggestFor(el, genderPref, taken, 2))
        : [],
    };
  });
  const known = chars.filter((c) => c.source === 'lib').length;
  const unknown = chars.filter((c) => c.source === 'none').length;
  const favCount = chars.filter((c) => c.favorable === true).length;
  const judged = chars.length - unknown;
  let verdict;
  if (!hasBirth) verdict = '只做了字义与五行归类；给出生年月日才能判断用字是否合喜用。';
  else if (unknown === chars.length) verdict = `两字都不在字库里，没法判断合不合喜用（喜用为 ${favorable.list.join('、')}）。下面给了可替换的常用字，或把你自己认定的五行传进来。`;
  else if (favCount === judged && judged > 0) verdict = `用字都落在喜用（${favorable.list.join('、')}）上，与命局方向一致。`;
  else if (favCount > 0) verdict = `部分用字合喜用（${favCount}/${judged}），其余可再斟酌；喜用为 ${favorable.list.join('、')}。`;
  else verdict = `用字未落在喜用（${favorable.list.join('、')}）上；不必然是坏名，但若想贴合命局可换字再看。`;

  const ov = overridesOf(input);
  const wu = wuge(surname, given, ov);
  const ph = phonetics(surname + given);

  return {
    system: 'name',
    action: 'assess',
    surname,
    givenName: given,
    fullName: surname + given,
    ...(hasBirth ? {
      bazi: {
        ...baziNote,
        strength,
        favorable: favorable.list,
        basis: favorable.basis,
      },
    } : {}),
    chars,
    wuge: wu,
    phonetics: ph,
    stats: { chars: chars.length, known, unknown, favorableCount: favCount, libSize: CHAR_LIB.length, wugeReady: wu.available === true },
    verdict,
    notes: [
      `字之五行按通行字义/偏旁归类，自建字库共 ${CHAR_LIB.length} 字（常用名用字为主）；未收录的字不猜五行，如实标注，「用户指定」是你传入的归类。`,
      '五格按康熙字典繁体笔画计（氵→水4、艹→艸6、华→華14 这类换算），81 数理取通行本、各派对少数数取法有出入；姓氏笔画表没覆盖的姓或你想按别派算，可传 strokeOverrides 覆盖。',
      '音韵只做机械检查（全名同调、相邻同声母/同韵母、叠字），不做语义谐音判断——谐音、方言读法还得自己读三遍。',
      '起名只做用字参考，不替父母做决定。',
    ],
  };
}

function generateNames(input) {
  const surname = String(input.surname || '').trim();
  if (!surname) throw new Error('缺少姓氏：请给 surname（如「李」）');
  if (!Number.isInteger(input.year) || !Number.isInteger(input.month) || !Number.isInteger(input.day)) {
    throw new Error('生成候选名需要完整出生年月日（公历）：不给生辰无法判断喜用五行');
  }
  assertCivil(input, 'birth');
  const gender = input.gender === 'female' ? 'female' : 'male';
  const limit = Math.max(1, Math.min(20, Number.isInteger(input.limit) ? input.limit : 10));
  const r = buildBazi({
    year: input.year, month: input.month, day: input.day,
    hour: Number.isInteger(input.hour) ? input.hour : 12,
    minute: Number.isInteger(input.minute) ? input.minute : 0,
    gender,
    lateZi: input.lateZi !== false,
    trueSolar: input.trueSolar !== false,
    dst: input.dst !== false,
    longitude: input.longitude, address: input.address, geo: input.geo,
  });
  const strength = { level: r.strength.level, score: r.strength.score, dayElement: r.pillars.day.stemElement };
  const fav = favorableElements(strength);
  const pool = CHAR_LIB.filter((c) => fav.list.includes(c[1]) && c[0] !== surname);
  const gPref = gender === 'male' ? 'm' : 'f';
  const sChars = [...surname];
  const ov = overridesOf(input);
  const sStroke = sChars.map((ch) => strokeOf(ch, ov, 'surname'));
  const sReady = sChars.length <= 2 && sStroke.every(Boolean);
  const sSum = sReady ? sStroke.reduce((x, y) => x + y.strokes, 0) : 0;
  const sLast = sReady ? sStroke[sStroke.length - 1].strokes : 0;
  const lv = (n) => { const r = shuliOf(n); return r ? (r.level === '吉' ? 2 : r.level === '半吉' ? 1 : 0) : 0; };
  const poolStroke = new Map(pool.map((c) => [c[0], (strokeOf(c[0], ov, 'given') || {}).strokes || 0]));
  const scored = [];
  for (let i = 0; i < pool.length; i++) {
    for (let j = 0; j < pool.length; j++) {
      if (i === j) continue;
      const a = pool[i];
      const b = pool[j];
      const fit = (x) => (x[3] === gPref || x[3] === 'n' ? 1 : 0);
      const gScore = fit(a) + fit(b) - (a[3] !== gPref && a[3] !== 'n' && b[3] !== gPref && b[3] !== 'n' ? 2 : 0);
      const aSt = poolStroke.get(a[0]);
      const bSt = poolStroke.get(b[0]);
      let wuScore = 0;
      if (sReady && aSt && bSt) {
        const ren = sLast + aSt;
        const di = aSt + bSt;
        const zong = sSum + aSt + bSt;
        wuScore = lv(ren) + lv(di) + lv(zong) + lv(zong - ren + 1);
      }
      scored.push({
        name: a[0] + b[0],
        chars: [
          { char: a[0], element: a[1], meaning: a[2] },
          { char: b[0], element: b[1], meaning: b[2] },
        ],
        elements: [a[1], b[1]],
        allFavorable: fav.list.includes(a[1]) && fav.list.includes(b[1]),
        genderScore: gScore,
        wugeScore: wuScore,
        order: (i * 7 + j * 13) % 9973,
      });
    }
  }
  const mixed = (c) => (c.elements[0] !== c.elements[1] ? 1 : 0);
  scored.sort((x, y) => (y.allFavorable - x.allFavorable) || (mixed(y) - mixed(x))
    || (y.wugeScore - x.wugeScore) || (y.genderScore - x.genderScore) || (x.order - y.order));
  const out = [];
  const usedNames = new Set();
  const usedChars = new Set([surname]);
  const usedPairs = new Set();
  const take = (cand, strict, freshPair) => {
    const key = [...cand.name].sort().join('');
    if (usedNames.has(key)) return false;
    if (strict && cand.chars.some((x) => usedChars.has(x.char))) return false;
    const pair = cand.elements.join('');
    if (freshPair && usedPairs.has(pair)) return false;
    usedNames.add(key);
    usedPairs.add(pair);
    cand.chars.forEach((x) => usedChars.add(x.char));
    out.push({
      rank: out.length + 1, name: surname + cand.name, given: cand.name, chars: cand.chars,
      wuge: wuge(surname, cand.name, ov),
      phonetics: phonetics(surname + cand.name),
    });
    return true;
  };
  for (const cand of scored) {
    if (out.length >= limit) break;
    take(cand, true, true);
  }
  for (const cand of scored) {
    if (out.length >= limit) break;
    take(cand, true, false);
  }
  for (const cand of scored) {
    if (out.length >= limit) break;
    take(cand, false, false);
  }
  return {
    system: 'name',
    action: 'generate',
    surname,
    gender: gender === 'male' ? '男' : '女',
    bazi: { dayMaster: r.dayMaster, strength, favorable: fav.list, basis: fav.basis },
    candidates: out,
    notes: [
      `字库共 ${CHAR_LIB.length} 字，只在喜用五行（${fav.list.join('、')}）里选字；未覆盖的生僻好字可用 charElements 指定五行后评估。`,
      '候选排序依次看：合喜用 → 两字异行 → 五格（人格/地格/总格/外格 吉多者先）→ 性别倾向 → 字库序，是排序不是「吉名」判定。',
      sReady
        ? '五格按康熙字典繁体笔画与通行本 81 数理算；姓的笔画取自内置姓氏表，没覆盖的姓可传 surnameStrokes 或 strokeOverrides。'
        : '姓的笔画不在内置姓氏表里，这一轮没按五格排序（不半算）；可传 surnameStrokes 或 strokeOverrides 后重算。',
      '音韵只做机械检查（同调、相邻同声母/同韵母、叠字），不做语义谐音判断——候选的音韵结果随每条一起给出。',
    ],
  };
}

function buildName(input) {
  if (input.action === 'generate') return generateNames(input);
  return assessName(input);
}

return { CHAR_LIB, shuliOf, wuge, splitPinyin, phonetics, favorableElements, assessName, generateNames, buildName };
})();

__mods['ziwei-hepan'] = (function () {
const { buildZiwei } = __mods.ziwei;
const { assertCivil } = __mods.validate;

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
  assertCivil(input && input.a, 'a');
  assertCivil(input && input.b, 'b');
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
const { assertCivil } = __mods.validate;

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
  assertCivil({ year, month, day, hour, minute });
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

const STEM_ELEMENT = {
  甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土',
  己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水',
};

function stemPalaceRelation(stem, palace) {
  const se = STEM_ELEMENT[stem];
  const pe = PALACE_ELEMENT[palace];
  if (!se || !pe) return { type: 'unknown', stem: se || null, palace: pe || null, note: '缺少干或宫的五行，无法判断' };
  if (KE[se] === pe) return { type: '干克宫', stem: se, palace: pe, note: `${se}克${pe}，天盘干克宫` };
  if (KE[pe] === se) return { type: '宫克干', stem: se, palace: pe, note: `${pe}克${se}，宫克天盘干` };
  if (SHENG[se] === pe) return { type: '干生宫', stem: se, palace: pe, note: `${se}生${pe}，干泄气于宫` };
  if (SHENG[pe] === se) return { type: '宫生干', stem: se, palace: pe, note: `${pe}生${se}，宫来生干` };
  return { type: '比和', stem: se, palace: pe, note: `${se}与${pe}比和` };
}

const JI_XING = {
  戊: { palace: '3', zhi: '卯', basis: '甲子戊，子刑卯' },
  己: { palace: '2', zhi: '未', basis: '甲戌己，戌刑未' },
  庚: { palace: '8', zhi: '寅', basis: '甲申庚，申刑寅' },
  辛: { palace: '9', zhi: '午', basis: '甲午辛，午自刑' },
  壬: { palace: '4', zhi: '辰', basis: '甲辰壬，辰自刑' },
  癸: { palace: '4', zhi: '巳', basis: '甲寅癸，寅刑巳' },
};
const RU_MU = {
  乙: { palace: '2', zhi: '未', basis: '乙木墓于未，未在坤二宫' },
  丙: { palace: '6', zhi: '戌', basis: '丙火墓于戌，戌在乾六宫' },
  丁: { palace: '6', zhi: '戌', basis: '丁火墓于戌，戌在乾六宫' },
};

function jiXingOf(palaces) {
  const out = [];
  for (const p of palaces || []) {
    const hit = JI_XING[p.tianPan];
    if (hit && hit.palace === String(p.palace)) out.push({ palace: p.palace, stem: p.tianPan, zhi: hit.zhi, basis: hit.basis });
  }
  return out;
}

function ruMuOf(palaces) {
  const out = [];
  for (const p of palaces || []) {
    const hit = RU_MU[p.tianPan];
    if (hit && hit.palace === String(p.palace)) out.push({ palace: p.palace, stem: p.tianPan, zhi: hit.zhi, basis: hit.basis });
  }
  return out;
}

const QIMEN_CONDITION_TABLES = Object.freeze({
  jiXing: Object.freeze(Object.fromEntries(Object.entries(JI_XING).map(([k, v]) => [k, { ...v }]))),
  ruMu: Object.freeze(Object.fromEntries(Object.entries(RU_MU).map(([k, v]) => [k, { ...v }]))),
});

const BRANCH_ELEMENT = {
  子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火',
  午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水',
};
function monthState(element, monthElement) {
  if (!element || !monthElement) return 'unknown';
  if (element === monthElement) return '旺';
  if (SHENG[monthElement] === element) return '相';
  if (SHENG[element] === monthElement) return '休';
  if (KE[element] === monthElement) return '囚';
  if (KE[monthElement] === element) return '死';
  return 'unknown';
}
function monthElementOf(branch) {
  return BRANCH_ELEMENT[branch] || null;
}
function groupByState(items, monthElement) {
  const out = { 旺: [], 相: [], 休: [], 囚: [], 死: [] };
  for (const it of items || []) {
    const st = monthState(it.element, monthElement);
    if (out[st]) out[st].push(it.name);
  }
  return out;
}
const QIMEN_STATE_TABLES = Object.freeze({
  gate: Object.freeze({ ...GATE_ELEMENT }),
  star: Object.freeze({ ...STAR_ELEMENT }),
  branch: Object.freeze({ ...BRANCH_ELEMENT }),
  stem: Object.freeze({ ...STEM_ELEMENT }),
});
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
  if (!input.snapshot) assertCivil(input);
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

  const monthBranch = (snapshot.monthGanZhi || '')[1] || '';
  const monthElement = BRANCH_ELEMENT[monthBranch] || null;

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
    stemElement: STEM_ELEMENT[tianPan['5']] || null,
    gateRelation: { type: 'unknown', note: '中宫无门，不参与门宫关系' },
    stemRelation: stemPalaceRelation(tianPan['5'], '5'),
    starState: monthState(STAR_ELEMENT['天禽'], monthElement),
    stemState: monthState(STEM_ELEMENT[tianPan['5']], monthElement),
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
    stemElement: STEM_ELEMENT[tianPan[gong]] || null,
    gateRelation: gatePalaceRelation(bm.baMen[gong], gong),
    stemRelation: stemPalaceRelation(tianPan[gong], gong),
    gateState: monthState(GATE_ELEMENT[bm.baMen[gong]], monthElement),
    starState: monthState(STAR_ELEMENT[jx.jiuXing[gong]], monthElement),
    stemState: monthState(STEM_ELEMENT[tianPan[gong]], monthElement),
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
    conditions: {
      jiXing: jiXingOf(palaces),
      ruMu: ruMuOf(palaces),
    },
    month: { branch: monthBranch, element: monthElement },
    states: {
      gate: groupByState(palaces.filter((p) => p.gate).map((p) => ({ name: p.gate, element: p.gateElement })), monthElement),
      star: groupByState(palaces.map((p) => ({ name: p.star, element: p.starElement })), monthElement),
      stem: groupByState(palaces.filter((p) => p.tianPan).map((p) => ({ name: p.tianPan, element: p.stemElement })), monthElement),
    },
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

return { buildSnapshot, wuxingRelation, gatePalaceRelation, stemPalaceRelation, jiXingOf, ruMuOf, QIMEN_CONDITION_TABLES, monthState, monthElementOf, groupByState, QIMEN_STATE_TABLES, buildQimen };
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

function stemRelationLine(r) {
  const groups = new Map();
  for (const p of r.palaces || []) {
    const rel = p.stemRelation || null;
    if (!rel || rel.type === 'unknown' || !p.tianPan) continue;
    if (!groups.has(rel.type)) groups.set(rel.type, []);
    groups.get(rel.type).push(`${p.palace}宫${p.tianPan}`);
  }
  const order = ['干克宫', '宫克干', '干生宫', '宫生干', '比和'];
  return order.filter((k) => groups.has(k)).map((k) => `${k} ${groups.get(k).join('、')}`).join('；') || '—';
}

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
  const jiXing = (r.conditions && r.conditions.jiXing) || [];
  const ruMu = (r.conditions && r.conditions.ruMu) || [];
  sections.push({
    key: 'conditions',
    label: '宫位条件',
    text: `门迫（同宫内门克宫）：${forced.length ? forced.join('、') : '本盘无'}；`
      + `宫制门（宫克门，属「制」不为迫）：${controlled.length ? controlled.join('、') : '无'}。`
      + `击刑（天盘六仪落刑宫）：${jiXing.length ? jiXing.map((x) => `${x.palace}宫${x.stem}（${x.basis}）`).join('、') : '本盘无'}；`
      + `入墓（天盘三奇落墓宫）：${ruMu.length ? ruMu.map((x) => `${x.palace}宫${x.stem}（${x.basis}）`).join('、') : '本盘无'}。`
      + (kongCells.length ? `空亡：${kongCells.join('、')}——落空之宫事多不实。` : '无落空之宫。')
      + `这三项都只作宫位条件：门迫、击刑、入墓不自动等同于用神受制，取象时看它们落在哪个符号上。`,
  });

  const mo = r.month || null;
  const st = r.states || null;
  if (mo && st) {
    const order = ['旺', '相', '休', '囚', '死'];
    const line = (g) => order.filter((k) => g && Array.isArray(g[k]) && g[k].length)
      .map((k) => `${k} ${g[k].join('、')}`).join('；') || '—';
    sections.push({
      key: 'states',
      label: '月令旺衰',
      text: `月令 ${mo.branch}（${mo.element}）：`
        + `门 ${line(st.gate)}。星 ${line(st.star)}。天盘干 ${line(st.stem)}。`
        + `旺为同月令之气，相为月令所生，休为生月令，囚为克月令，死为月令所克。`
        + `干宫的落宫关系另算：${stemRelationLine(r)}。`
        + `这一层只说明门、星、干自身力量强弱，不合吉凶：门旺而宫克门，仍受宫制；星旺而落宫死地，也难全其用。`,
    });
  }

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
        + `若${ys.label}实际取另一个候选，或时间范围不同，解读边界随之变化。未决项：天盘干与地盘的十干克应（100 组）未纳入本规则集，干宫生克只作落宫条件。`,
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

__mods.almanac = (function () {
const { solarToLunar } = __mods.lunar;
const { nayinOf } = __mods.nayin;
const { toJDN, fromJDN, dayGanzhiIndex, ganzhiName, termWindow, termInstantJd, partsToJd, STEMS, BRANCHES, TERM_NAMES } = __mods.calendar;
const { HEX64 } = __mods['interpret-data'];
const { assertCivil, daysInMonth } = __mods.validate;

const ZHIXING = ['建', '除', '满', '平', '定', '执', '破', '危', '成', '收', '开', '闭'];

const ZHIXING_YI = {
  建: ['出行', '上任', '会友', '上书', '见工'],
  除: ['除服', '疗病', '扫舍', '出行'],
  满: ['祈福', '祭祀', '结亲', '开市', '交易'],
  平: ['修饰垣墙', '平治道涂'],
  定: ['嫁娶', '订盟', '纳采', '祭祀', '祈福'],
  执: ['祭祀', '祈福', '捕捉', '纳畜'],
  破: ['破屋', '坏垣', '求医'],
  危: ['祭祀', '祈福', '安床'],
  成: ['嫁娶', '开市', '入学', '上任', '修造'],
  收: ['纳财', '收账', '进人口'],
  开: ['开市', '交易', '嫁娶', '入学', '动土'],
  闭: ['筑堤', '埋穴', '补垣'],
};

const ZHIXING_JI = {
  建: ['动土', '开仓', '出货财', '安葬'],
  除: ['求财', '赴任', '嫁娶'],
  满: ['服药', '栽种', '安葬'],
  平: ['祈福', '求嗣'],
  定: ['诉讼', '出行'],
  执: ['开市', '求财', '出行'],
  破: ['嫁娶', '开市', '动土'],
  危: ['登高', '行船', '出行'],
  成: ['诉讼'],
  收: ['开市', '出行', '安葬'],
  开: ['安葬'],
  闭: ['开市', '出行', '求医'],
};

const CAI_SHEN = { 甲: '东北', 乙: '东北', 丙: '西南', 丁: '西南', 戊: '正北', 己: '正北', 庚: '正东', 辛: '正东', 壬: '正南', 癸: '正南' };

const XI_SHEN = { 甲: '东北', 乙: '西北', 丙: '西南', 丁: '正南', 戊: '东南', 己: '东北', 庚: '西北', 辛: '西南', 壬: '正南', 癸: '东南' };

const SHENGXIAO = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
const SHA_BY_GROUP = { 申子辰: '南', 寅午戌: '北', 巳酉丑: '东', 亥卯未: '西' };
function shaOf(branch) {
  for (const [g, v] of Object.entries(SHA_BY_GROUP)) if (g.includes(branch)) return v;
  return null;
}

function hourToBranch(hour, minute = 0) {
  const h = Number.isInteger(hour) ? ((hour % 24) + 24) % 24 : 12;
  return BRANCHES[Math.floor(((h + 1) % 24) / 2)];
}

function zhixingOf(dayBranch, monthBranch) {
  const d = BRANCHES.indexOf(dayBranch);
  const m = BRANCHES.indexOf(monthBranch);
  return ZHIXING[((d - m) % 12 + 12) % 12];
}

const MONTH_TEXT = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
const DAY_TENS = ['初', '十', '廿'];
const DAY_UNITS = ['十', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
function dayText(day) {
  if (day === 10) return '初十';
  if (day === 20) return '二十';
  if (day === 30) return '三十';
  return `${DAY_TENS[Math.floor(day / 10)]}${DAY_UNITS[day % 10]}`;
}
function lunarMonthText(month, isLeap = false) {
  return `${isLeap ? '闰' : ''}${MONTH_TEXT[month - 1] || month}月`;
}

const TIAN_SHEN = ['青龙', '明堂', '天刑', '朱雀', '金匮', '天德', '白虎', '玉堂', '天牢', '玄武', '司命', '勾陈'];
const TIAN_SHEN_TYPE = {
  青龙: '黄道', 明堂: '黄道', 金匮: '黄道', 天德: '黄道', 玉堂: '黄道', 司命: '黄道',
  天刑: '黑道', 朱雀: '黑道', 白虎: '黑道', 天牢: '黑道', 玄武: '黑道', 勾陈: '黑道',
};
const TIAN_SHEN_OFFSET = { 子: 4, 丑: 2, 寅: 0, 卯: 10, 辰: 8, 巳: 6, 午: 4, 未: 2, 申: 0, 酉: 10, 戌: 8, 亥: 6 };

function tianShenOf(branch, anchorBranch) {
  const b = BRANCHES.indexOf(branch);
  const off = TIAN_SHEN_OFFSET[anchorBranch];
  if (b < 0 || off == null) return null;
  const name = TIAN_SHEN[(b + off) % 12];
  const type = TIAN_SHEN_TYPE[name];
  return { name, type, luck: type === '黄道' ? '吉' : '凶' };
}

const MANSIONS = {
  角: { luck: '吉', zheng: '木', animal: '蛟', gong: '东' }, 亢: { luck: '凶', zheng: '金', animal: '龙', gong: '东' },
  氐: { luck: '凶', zheng: '土', animal: '貉', gong: '东' }, 房: { luck: '吉', zheng: '日', animal: '兔', gong: '东' },
  心: { luck: '凶', zheng: '月', animal: '狐', gong: '东' }, 尾: { luck: '吉', zheng: '火', animal: '虎', gong: '东' },
  箕: { luck: '吉', zheng: '水', animal: '豹', gong: '东' }, 斗: { luck: '吉', zheng: '木', animal: '獬', gong: '北' },
  牛: { luck: '凶', zheng: '金', animal: '牛', gong: '北' }, 女: { luck: '凶', zheng: '土', animal: '蝠', gong: '北' },
  虚: { luck: '凶', zheng: '日', animal: '鼠', gong: '北' }, 危: { luck: '凶', zheng: '月', animal: '燕', gong: '北' },
  室: { luck: '吉', zheng: '火', animal: '猪', gong: '北' }, 壁: { luck: '吉', zheng: '水', animal: '獝', gong: '北' },
  奎: { luck: '凶', zheng: '木', animal: '狼', gong: '西' }, 娄: { luck: '吉', zheng: '金', animal: '狗', gong: '西' },
  胃: { luck: '吉', zheng: '土', animal: '彘', gong: '西' }, 昴: { luck: '凶', zheng: '日', animal: '鸡', gong: '西' },
  毕: { luck: '吉', zheng: '月', animal: '乌', gong: '西' }, 觜: { luck: '凶', zheng: '火', animal: '猴', gong: '西' },
  参: { luck: '吉', zheng: '水', animal: '猿', gong: '西' }, 井: { luck: '吉', zheng: '木', animal: '犴', gong: '南' },
  鬼: { luck: '凶', zheng: '金', animal: '羊', gong: '南' }, 柳: { luck: '凶', zheng: '土', animal: '獐', gong: '南' },
  星: { luck: '凶', zheng: '日', animal: '马', gong: '南' }, 张: { luck: '吉', zheng: '月', animal: '鹿', gong: '南' },
  翼: { luck: '凶', zheng: '火', animal: '蛇', gong: '南' }, 轸: { luck: '吉', zheng: '水', animal: '蚓', gong: '南' },
};
const XIU_GROUPS = {
  A: ['虚', '毕', '翼', '箕', '奎', '鬼', '氐'],
  B: ['房', '危', '觜', '轸', '斗', '娄', '柳'],
  C: ['星', '心', '室', '参', '角', '牛', '胃'],
  D: ['昴', '张', '尾', '壁', '井', '亢', '女'],
};
const XIU_GROUP_OF = { 子: 'A', 辰: 'A', 申: 'A', 丑: 'B', 巳: 'B', 酉: 'B', 寅: 'C', 午: 'C', 戌: 'C', 卯: 'D', 未: 'D', 亥: 'D' };

function xiuOf(dayBranch, weekdayIndex) {
  const g = XIU_GROUP_OF[dayBranch];
  if (!g) return null;
  const name = XIU_GROUPS[g][weekdayIndex];
  const info = MANSIONS[name];
  return info ? { name, ...info } : null;
}

const DIR_OF = { 坎: '正北', 艮: '东北', 震: '正东', 巽: '东南', 离: '正南', 坤: '西南', 兑: '正西', 乾: '西北' };
const POS_XI = { 甲: '艮', 乙: '乾', 丙: '坤', 丁: '离', 戊: '巽', 己: '艮', 庚: '乾', 辛: '坤', 壬: '离', 癸: '巽' };
const POS_CAI = { 甲: '艮', 乙: '艮', 丙: '坤', 丁: '坤', 戊: '坎', 己: '坎', 庚: '震', 辛: '震', 壬: '离', 癸: '离' };
const POS_FU = { 甲: '坎', 乙: '坤', 丙: '乾', 丁: '巽', 戊: '艮', 己: '坎', 庚: '坤', 辛: '乾', 壬: '巽', 癸: '艮' };
const POS_YANG_GUI = { 甲: '坤', 乙: '坤', 丙: '兑', 丁: '乾', 戊: '艮', 己: '坎', 庚: '离', 辛: '艮', 壬: '震', 癸: '巽' };
const POS_YIN_GUI = { 甲: '艮', 乙: '坎', 丙: '乾', 丁: '兑', 戊: '坤', 己: '坤', 庚: '艮', 辛: '离', 壬: '巽', 癸: '震' };
const posOf = (map, stem) => (map[stem] ? { gua: map[stem], dir: DIR_OF[map[stem]] } : null);

const TAI_SHEN = {
  甲子: '占门碓 外东南', 乙丑: '碓磨厕 外东南', 丙寅: '厨灶炉 外正南', 丁卯: '仓库门 外正南', 戊辰: '房床栖 外正南',
  己巳: '占门床 外正南', 庚午: '占碓磨 外正南', 辛未: '厨灶厕 外西南', 壬申: '仓库炉 外西南', 癸酉: '房床门 外西南',
  甲戌: '占门栖 外西南', 乙亥: '碓磨床 外西南', 丙子: '厨灶碓 外西南', 丁丑: '仓库厕 外正西', 戊寅: '房床炉 外正西',
  己卯: '占大门 外正西', 庚辰: '碓磨栖 外正西', 辛巳: '厨灶床 外正西', 壬午: '仓库碓 外西北', 癸未: '房床厕 外西北',
  甲申: '占门炉 外西北', 乙酉: '碓磨门 外西北', 丙戌: '厨灶栖 外西北', 丁亥: '仓库床 外西北', 戊子: '房床碓 外正北',
  己丑: '占门厕 外正北', 庚寅: '碓磨炉 外正北', 辛卯: '厨灶门 外正北', 壬辰: '仓库栖 外正北', 癸巳: '占房床 房内北',
  甲午: '占门碓 房内北', 乙未: '碓磨厕 房内北', 丙申: '厨灶炉 房内北', 丁酉: '仓库门 房内北', 戊戌: '房床栖 房内中',
  己亥: '占门床 房内中', 庚子: '占碓磨 房内南', 辛丑: '厨灶厕 房内南', 壬寅: '仓库炉 房内南', 癸卯: '房床门 房内西',
  甲辰: '占门栖 房内东', 乙巳: '碓磨床 房内东', 丙午: '厨灶碓 房内东', 丁未: '仓库厕 房内东', 戊申: '房床炉 房内中',
  己酉: '占大门 外东北', 庚戌: '碓磨栖 外东北', 辛亥: '厨灶床 外东北', 壬子: '仓库碓 外东北', 癸丑: '房床厕 外东北',
  甲寅: '占门炉 外东北', 乙卯: '碓磨门 外正东', 丙辰: '厨灶栖 外正东', 丁巳: '仓库床 外正东', 戊午: '房床碓 外正东',
  己未: '占门厕 外正东', 庚申: '碓磨炉 外东南', 辛酉: '厨灶门 外东南', 壬戌: '仓库栖 外东南', 癸亥: '占房床 外东南',
};

const LIUHE = { 子: '丑', 丑: '子', 寅: '亥', 亥: '寅', 卯: '戌', 戌: '卯', 辰: '酉', 酉: '辰', 巳: '申', 申: '巳', 午: '未', 未: '午' };
const SANHE = { 申: '申子辰', 子: '申子辰', 辰: '申子辰', 亥: '亥卯未', 卯: '亥卯未', 未: '亥卯未', 寅: '寅午戌', 午: '寅午戌', 戌: '寅午戌', 巳: '巳酉丑', 酉: '巳酉丑', 丑: '巳酉丑' };

function dailyHexagram(year, month, day) {
  const names = Object.keys(HEX64);
  if (!names.length) return null;
  const seed = (((year * 10007) ^ (month * 911) ^ (day * 97)) >>> 0) % names.length;
  const name = names[seed];
  return { name, ...HEX64[name] };
}

const termName = (t) => (t && (t.name || TERM_NAMES[t.index])) || '';

function buildAlmanac(input) {
  assertCivil(input, '黄历');
  const { year, month, day } = input;
  if (day > daysInMonth(year, month)) {
    throw new Error(`非法日期：${year} 年 ${month} 月没有 ${day} 日`);
  }
  const jdNoon = partsToJd({ year, month, day, hour: 12, minute: 0 });
  const lunar = solarToLunar(year, month, day);
  const jdn = toJDN(year, month, day);

  const lichunJd = termInstantJd(year, 2);
  const ganzhiYear = jdNoon < lichunJd ? year - 1 : year;
  const yearIdx = (((ganzhiYear - 4) % 60) + 60) % 60;
  const yearGz = ganzhiName(yearIdx);
  const springYear = lunar.lunarYear;
  const springGz = ganzhiName((((springYear - 4) % 60) + 60) % 60);

  const jieTerms = termWindow(year, { jieOnly: true });
  let prevJie = null;
  let nextJie = null;
  for (const t of jieTerms) {
    if (t.jd <= jdNoon) prevJie = t; else { if (!nextJie) nextJie = t; }
  }
  const monthBranchIdx = ((2 + (prevJie.index - 2) / 2) % 12 + 12) % 12;
  const yinMonthStem = ((STEMS.indexOf(yearGz.stem) % 5) * 2 + 2) % 10;
  const monthStemIdx = (yinMonthStem + ((monthBranchIdx - 2 + 12) % 12)) % 10;
  const monthGz = ganzhiName(monthComposite(monthStemIdx, monthBranchIdx));

  const dayGz = ganzhiName(dayGanzhiIndex(jdn));
  const dayBranch = dayGz.branch;
  const zhiXing = zhixingOf(dayBranch, BRANCHES[monthBranchIdx]);
  const chongIdx = (BRANCHES.indexOf(dayBranch) + 6) % 12;
  const chongShengXiao = SHENGXIAO[chongIdx];

  const allTerms = termWindow(year);
  let prevTerm = null;
  let nextTerm = null;
  for (const t of allTerms) {
    if (t.jd <= jdNoon) prevTerm = t; else { if (!nextTerm) nextTerm = t; }
  }
  const fmtJdDate = (jd) => {
    const p = fromJDN(Math.floor(jd + 0.5));
    return `${p.year}-${String(p.month).padStart(2, '0')}-${String(p.day).padStart(2, '0')}`;
  };

  const weekdayIdx = (jdn + 1) % 7;
  const weekday = ['日', '一', '二', '三', '四', '五', '六'][weekdayIdx];
  const dayGod = tianShenOf(dayBranch, BRANCHES[monthBranchIdx]);
  const xiu = xiuOf(dayBranch, weekdayIdx);
  const taiShen = TAI_SHEN[dayGz.name] || null;
  const hourBase = (STEMS.indexOf(dayGz.stem) % 5) * 2;
  const hours = BRANCHES.map((zhi, i) => {
    const gan = STEMS[(hourBase + i) % 10];
    const gz = ganzhiName(hourComposite((hourBase + i) % 10, i));
    const shen = tianShenOf(zhi, dayBranch);
    return {
      zhi,
      name: `${zhi}时`,
      ganZhi: gz.name,
      gan,
      shen: shen ? shen.name : null,
      type: shen ? shen.type : null,
      luck: shen ? shen.luck : null,
    };
  });
  const sanheGroup = SANHE[dayBranch] || '';
  const liuheBranch = LIUHE[dayBranch] || null;
  const lucky = {
    liuhe: liuheBranch ? SHENGXIAO[BRANCHES.indexOf(liuheBranch)] : null,
    sanhe: [...sanheGroup].filter((b) => b !== dayBranch).map((b) => SHENGXIAO[BRANCHES.indexOf(b)]),
  };
  const positions = {
    caiShen: CAI_SHEN[dayGz.stem] || null,
    xiShen: XI_SHEN[dayGz.stem] || null,
    fuShen: posOf(POS_FU, dayGz.stem),
    yangGui: posOf(POS_YANG_GUI, dayGz.stem),
    yinGui: posOf(POS_YIN_GUI, dayGz.stem),
    xiShenFull: posOf(POS_XI, dayGz.stem),
    caiShenFull: posOf(POS_CAI, dayGz.stem),
  };
  const lunarText = `农历${springGz.name}年${lunarMonthText(lunar.month, lunar.isLeap)}${dayText(lunar.day)}`;
  const boundaryNote = yearGz.name !== springGz.name
    ? `年界：本条按立春界作${yearGz.name}年·属${SHENGXIAO[BRANCHES.indexOf(yearGz.branch)]}（命理排盘用）；春节界为${springGz.name}年·属${SHENGXIAO[BRANCHES.indexOf(springGz.branch)]}，两种都对，取用场合不同`
    : null;

  return {
    system: 'almanac',
    meta: {
      date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      weekday: `星期${weekday}`,
      ...(boundaryNote ? { boundaryNote } : {}),
      scope: '通行口径：宜忌按建除十二神简表；已收录值日十二神（黄道/黑道）、时辰吉凶、二十八宿、胎神、吉神方位、纳音、六合三合吉配；逐日全量吉神凶煞与彭祖百忌未收录',
    },
    lunar: {
      year: springYear,
      month: lunar.month,
      day: lunar.day,
      isLeap: lunar.isLeap,
      text: lunarText,
    },
    ganzhi: {
      year: yearGz.name,
      month: monthGz.name,
      day: dayGz.name,
      shengXiao: SHENGXIAO[BRANCHES.indexOf(yearGz.branch)],
      springYear: springGz.name,
      springShengXiao: SHENGXIAO[BRANCHES.indexOf(springGz.branch)],
    },
    jieQi: {
      prev: prevTerm ? { name: termName(prevTerm), date: fmtJdDate(prevTerm.jd) } : null,
      next: nextTerm ? { name: termName(nextTerm), date: fmtJdDate(nextTerm.jd) } : null,
    },
    positions,
    dayGod,
    xiu,
    taiShen,
    nayin: { day: nayinOf(dayGanzhiIndex(jdn)) },
    lucky,
    hours,
    zhiXing,
    yi: ZHIXING_YI[zhiXing].slice(),
    ji: ZHIXING_JI[zhiXing].slice(),
    chong: {
      shengXiao: chongShengXiao,
      text: `冲${chongShengXiao}`,
      sha: shaOf(dayBranch) ? `煞${shaOf(dayBranch)}` : null,
    },
    dailyHexagram: dailyHexagram(year, month, day),
    sources: [
      '农历与节气：本地天文历法（定朔 + 节气黄经）',
      '建除十二神与冲煞：传统通行口径',
      '值日/时家十二神（青龙…勾陈）、二十八宿、胎神、吉神方位：通行表',
      '宜忌：建除十二神通行简表（非逐日全量黄历）',
      '每日一卦：按公历日期确定性取卦（同日同卦）',
    ],
    disclaimer: '黄历为传统民俗口径的本地确定性计算；宜忌仅按建除简表，属娱乐参考，不构成择日结论。',
  };
}

function monthComposite(stemIdx, branchIdx) {
  for (let i = 0; i < 60; i++) {
    if (i % 10 === stemIdx && i % 12 === branchIdx) return i;
  }
  return 0;
}

function hourComposite(stemIdx, branchIdx) {
  for (let i = 0; i < 60; i++) {
    if (i % 10 === stemIdx && i % 12 === branchIdx) return i;
  }
  return 0;
}

return { ZHIXING, ZHIXING_YI, ZHIXING_JI, SHENGXIAO, hourToBranch, zhixingOf, lunarMonthText, TIAN_SHEN, TIAN_SHEN_TYPE, tianShenOf, MANSIONS, xiuOf, dailyHexagram, buildAlmanac };
})();

__mods.star = (function () {
const { daysInMonth } = __mods.validate;

const SIGNS = [
  { name: '白羊座', element: '火象', planet: '火星', range: [3, 21, 4, 19], keywords: '热血、开拓、直来直往', compatible: '狮子、射手、天秤' },
  { name: '金牛座', element: '土象', planet: '金星', range: [4, 20, 5, 20], keywords: '沉稳、务实、惜物恋旧', compatible: '处女、摩羯、巨蟹' },
  { name: '双子座', element: '风象', planet: '水星', range: [5, 21, 6, 21], keywords: '灵动、好奇、能言善变', compatible: '天秤、水瓶、白羊' },
  { name: '巨蟹座', element: '水象', planet: '月亮', range: [6, 22, 7, 22], keywords: '顾家、念旧、外柔内韧', compatible: '天蝎、双鱼、金牛' },
  { name: '狮子座', element: '火象', planet: '太阳', range: [7, 23, 8, 22], keywords: '大方、自信、天生舞台感', compatible: '白羊、射手、天秤' },
  { name: '处女座', element: '土象', planet: '水星', range: [8, 23, 9, 22], keywords: '细致、挑剔、完美主义', compatible: '金牛、摩羯、巨蟹' },
  { name: '天秤座', element: '风象', planet: '金星', range: [9, 23, 10, 23], keywords: '优雅、权衡、社交高手', compatible: '双子、水瓶、狮子' },
  { name: '天蝎座', element: '水象', planet: '冥王星', range: [10, 24, 11, 22], keywords: '深挚、洞察、爱憎分明', compatible: '巨蟹、双鱼、处女' },
  { name: '射手座', element: '火象', planet: '木星', range: [11, 23, 12, 21], keywords: '乐观、自由、远方体质', compatible: '白羊、狮子、水瓶' },
  { name: '摩羯座', element: '土象', planet: '土星', range: [12, 22, 1, 19], keywords: '自律、坚忍、大器晚成', compatible: '金牛、处女、天蝎' },
  { name: '水瓶座', element: '风象', planet: '天王星', range: [1, 20, 2, 18], keywords: '独立、前卫、脑洞担当', compatible: '双子、天秤、射手' },
  { name: '双鱼座', element: '水象', planet: '海王星', range: [2, 19, 3, 20], keywords: '温柔、共情、浪漫滤镜', compatible: '巨蟹、天蝎、金牛' },
];

function signOfDate(month, day) {
  for (const s of SIGNS) {
    const [m1, d1, m2, d2] = s.range;
    if ((month === m1 && day >= d1) || (month === m2 && day <= d2)) return s;
  }
  return null;
}

function daySeed(y, m, d, salt) {
  let x = ((y * 73856093) ^ (m * 19349663) ^ (d * 83492791) ^ Math.imul(salt, 2654435761)) >>> 0;
  x = Math.imul(x ^ (x >>> 13), 0x5bd1e995);
  return (x ^ (x >>> 15)) >>> 0;
}

const COLORS = ['晨雾白', '海盐蓝', '苔原绿', '落日橘', '琥珀黄', '黛蓝', '藕荷粉', '石墨灰', '橄榄绿', '雾紫'];
const TONE_TEXT = {
  5: '势头极好，主动出击。',
  4: '顺风缓行，乘势而为。',
  3: '平顺持中，稳字当头。',
  2: '略有阻滞，慢即是快。',
  1: '宜静宜守，养精蓄锐。',
};

function buildStar(input) {
  const { year, month, day } = input || {};
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)
    || year < 1900 || year > 2100 || month < 1 || month > 12 || day < 1 || day > daysInMonth(year, month)) {
    throw new Error('星座需要真实存在的公历日期（year 1900–2100、month、day）——请向用户询问');
  }
  const sign = signOfDate(month, day);
  if (!sign) throw new Error(`无法识别星座：${year}-${month}-${day}`);
  const dims = ['事业', '感情', '财运', '健康'].map((k, i) => {
    const stars = (daySeed(year, month, day, i + 1) % 5) + 1;
    return { name: k, stars, text: TONE_TEXT[stars] };
  });
  return {
    system: 'star',
    meta: { date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}` },
    sign: {
      name: sign.name,
      element: sign.element,
      planet: sign.planet,
      keywords: sign.keywords,
      compatible: sign.compatible,
      range: `${sign.range[0]}月${sign.range[1]}日–${sign.range[2]}月${sign.range[3]}日`,
    },
    daily: {
      tone: TONE_TEXT[(daySeed(year, month, day, 9) % 5) + 1],
      dims,
      luckyColor: COLORS[daySeed(year, month, day, 10) % COLORS.length],
      luckyNumber: (daySeed(year, month, day, 11) % 9) + 1,
    },
    sources: ['星座区间：太阳过宫通行日期', '当日基调：日期哈希确定性生成（同日同结果）'],
    disclaimer: '星座档案为通行天文口径；当日基调纯娱乐向，同日同结果，不构成任何现实预测。',
  };
}

return { SIGNS, signOfDate, buildStar };
})();

__mods.numerology = (function () {
const { daysInMonth } = __mods.validate;

const NUMBER_MEANING = {
  1: { title: '开创者', keywords: '独立、主见、起步快', tendency: '习惯自己拍板，适合从零开始的事。', lesson: '课题是学会合作与示弱，别把「我能行」当唯一答案。' },
  2: { title: '协调者', keywords: '细腻、共情、善配合', tendency: '擅长读空气、做黏合剂，团队里离不开的角色。', lesson: '课题是别过度讨好、别把委屈攒成怨气。' },
  3: { title: '表达者', keywords: '活跃、创意、感染力', tendency: '靠表达与点子吃饭，越有舞台越发光。', lesson: '课题是持续力与收尾，别让兴趣过载成半成品。' },
  4: { title: '建构者', keywords: '务实、秩序、靠得住', tendency: '擅长把混乱理成流程，慢工出细活。', lesson: '课题是别过度求稳、别用规则捆住自己和别人。' },
  5: { title: '探索者', keywords: '自由、变化、新鲜感', tendency: '适应力强，喜欢移动与尝鲜，厌烦一成不变。', lesson: '课题是承诺与专注，别把「换一个」当解药。' },
  6: { title: '照顾者', keywords: '责任、顾家、审美', tendency: '天然把身边人放进自己的责任清单。', lesson: '课题是别替别人扛过头，爱不等于包办。' },
  7: { title: '探究者', keywords: '内省、钻研、独处', tendency: '需要个人空间，喜欢把问题想透再动。', lesson: '课题是信任与敞开，别用距离保护自己。' },
  8: { title: '经营者', keywords: '资源、格局、执行力', tendency: '对钱与权有直觉，擅长把资源盘活。', lesson: '课题是平衡控制欲，别用成果定义自我价值。' },
  9: { title: '理想者', keywords: '情怀、包容、完成感', tendency: '看得远，愿意为更大的意义投入。', lesson: '课题是落地与界限，别在付出里丢了自己。' },
  11: { title: '直觉者（主数）', keywords: '敏感、灵感、感召力', tendency: '直觉极准，容易成为别人的灯，但情绪消耗也大。', lesson: '课题是把天赋落地成具体作品，而不是只停在感受。' },
  22: { title: '实践家（主数）', keywords: '愿景、系统、扛大梁', tendency: '能把大想法拆成可行工程，压力与能力同步放大。', lesson: '课题是别被宏大目标压住，先完成小闭环。' },
  33: { title: '疗愈者（主数）', keywords: '大爱、教导、承担', tendency: '为他人承担是本能，适合教导与疗愈型角色。', lesson: '课题是先照顾好自己，别把牺牲当价值。' },
};

function reduceNumber(n, keepMasters = true) {
  let v = Math.abs(Math.trunc(n));
  while (v > 9) {
    if (keepMasters && (v === 11 || v === 22 || v === 33)) return v;
    v = String(v).split('').reduce((s, c) => s + Number(c), 0);
  }
  return v;
}

const digitSum = (n) => String(Math.abs(Math.trunc(n))).split('').reduce((s, c) => s + Number(c), 0);

function buildNumerology(input) {
  const { year, month, day } = input || {};
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)
    || year < 1900 || year > 2100 || month < 1 || month > 12 || day < 1 || day > daysInMonth(year, month)) {
    throw new Error('生命数字需要真实存在的公历出生日期（year 1900–2100、month、day）——请向用户询问，勿猜');
  }
  const lifePath = reduceNumber(digitSum(year) + digitSum(month) + digitSum(day));
  const birthday = reduceNumber(day);
  const attitude = reduceNumber(month + day);
  const parts = [
    { key: 'lifePath', name: '生命路径数', number: lifePath, meaning: NUMBER_MEANING[lifePath] },
    { key: 'birthday', name: '生日数', number: birthday, meaning: NUMBER_MEANING[birthday] },
    { key: 'attitude', name: '态度数', number: attitude, meaning: NUMBER_MEANING[attitude] },
  ];
  return {
    system: 'numerology',
    meta: { date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`, system: '西方数字学' },
    numbers: { lifePath, birthday, attitude },
    parts,
    primary: parts[0],
    sources: ['生命路径=出生年月日逐位求和归约；生日数=日归约；态度数=月+日归约（11/22/33 保留）'],
    disclaimer: '生命数字属西方数字学体系，与八字/紫微等东方术数口径不同、不可互相印证；仅供自我认识参考。',
  };
}

return { NUMBER_MEANING, reduceNumber, buildNumerology };
})();

__mods.mbti = (function () {
const { fail } = __mods.fail;

const DIMENSIONS = [
  {
    key: 'EI',
    left: 'E',
    right: 'I',
    name: '能量方向',
    leftSay: '向外：和人打交道时来电，边说边想',
    rightSay: '向内：独处时回血，先想清楚再开口',
    tie: 'I',
    note: '不是「会不会社交」，而是社交之后你更有电还是更耗电。',
  },
  {
    key: 'SN',
    left: 'S',
    right: 'N',
    name: '信息接收',
    leftSay: '具体：先看事实、细节和已有经验',
    rightSay: '联想：先看模式、隐喻和下一步可能',
    tie: 'N',
    note: '不是「聪明与否」，而是你先抓住哪一头。',
  },
  {
    key: 'TF',
    left: 'T',
    right: 'F',
    name: '决策依据',
    leftSay: '逻辑：先看是否站得住、是否一致',
    rightSay: '价值：先看人在其中会不会被伤到',
    tie: 'F',
    note: '不是「冷血或情绪化」，而是权衡时先放哪把尺子。',
  },
  {
    key: 'JP',
    left: 'J',
    right: 'P',
    name: '生活节奏',
    leftSay: '收束：先定计划，喜欢事情有个了结',
    rightSay: '开放：先留着口子，喜欢事情还能变',
    tie: 'P',
    note: '不是「勤快或懒散」，而是面对不确定时更愿意钉死还是留着。',
  },
];

const QUESTIONS = [
  { id: 'e1', dim: 'EI', side: 'E', text: '在一个都是陌生人的场合，你会主动找几个人聊起来。' },
  { id: 's1', dim: 'SN', side: 'S', text: '别人讲一件事，你更关心具体发生了什么、细节对不对得上。' },
  { id: 't1', dim: 'TF', side: 'T', text: '朋友来问你两难的选择，你会先把利弊摆清楚再谈感受。' },
  { id: 'j1', dim: 'JP', side: 'J', text: '出门前你习惯把行程和要带的东西先定下来。' },
  { id: 'e2', dim: 'EI', side: 'I', text: '忙完一整天，你更想一个人安静待着，而不是再约一轮。' },
  { id: 's2', dim: 'SN', side: 'N', text: '你常从一个现象跳到「再往下可能还会怎样」的联想上。' },
  { id: 't2', dim: 'TF', side: 'F', text: '做决定时，你更在意这件事对身边人的实际影响。' },
  { id: 'j2', dim: 'JP', side: 'P', text: '计划临时被打乱，你多半能顺势改，不太难受。' },
  { id: 'e3', dim: 'EI', side: 'E', text: '想事情的时候，你更习惯说给人听，说着说着就清楚了。' },
  { id: 's3', dim: 'SN', side: 'S', text: '你更信「做过、验证过」的办法，而不是听起来很新的办法。' },
  { id: 't3', dim: 'TF', side: 'T', text: '规则一旦定了，哪怕对自己不方便，你也倾向照着走。' },
  { id: 'j3', dim: 'JP', side: 'J', text: '有一件事没做完，你心里会一直悬着，想先把它收尾。' },
  { id: 'e4', dim: 'EI', side: 'I', text: '电话响了或有人临时找来，你第一反应是先缓一下再应对。' },
  { id: 's4', dim: 'SN', side: 'N', text: '你容易被「这背后是什么道理」这类问题勾住。' },
  { id: 't4', dim: 'TF', side: 'F', text: '别人情绪不好时，你直觉是先接住情绪，而不是先讲道理。' },
  { id: 'j4', dim: 'JP', side: 'P', text: '你常常边走边看，事到临头再定具体怎么做。' },
  { id: 'e5', dim: 'EI', side: 'E', text: '人多的场合待久了，你通常越待越有精神。' },
  { id: 's5', dim: 'SN', side: 'S', text: '你记事情偏向记「原话、原样、当时的情形」。' },
  { id: 't5', dim: 'TF', side: 'T', text: '和人争论时，你更在意谁的推理有漏洞，而不是谁伤了面子。' },
  { id: 'j5', dim: 'JP', side: 'J', text: '你喜欢把待办列出来，一条条划掉。' },
  { id: 'e6', dim: 'EI', side: 'I', text: '有新想法时，你更愿意先自己消化一轮，再拿出去讲。' },
  { id: 's6', dim: 'SN', side: 'N', text: '比起照现状做好，你更享受把现状改成一个更好的样子。' },
  { id: 't6', dim: 'TF', side: 'F', text: '要做取舍时，你会想「这样是不是对人不公平」。' },
  { id: 'j6', dim: 'JP', side: 'P', text: '临出发才收拾行李，你也觉得没什么问题。' },
];

const FUNCTION_STACKS = {
  ISTJ: ['Si', 'Te', 'Fi', 'Ne'],
  ISFJ: ['Si', 'Fe', 'Ti', 'Ne'],
  INFJ: ['Ni', 'Fe', 'Ti', 'Se'],
  INTJ: ['Ni', 'Te', 'Fi', 'Se'],
  ISTP: ['Ti', 'Se', 'Ni', 'Fe'],
  ISFP: ['Fi', 'Se', 'Ni', 'Te'],
  INFP: ['Fi', 'Ne', 'Si', 'Te'],
  INTP: ['Ti', 'Ne', 'Si', 'Fe'],
  ESTP: ['Se', 'Ti', 'Fe', 'Ni'],
  ESFP: ['Se', 'Fi', 'Te', 'Ni'],
  ENFP: ['Ne', 'Fi', 'Te', 'Si'],
  ENTP: ['Ne', 'Ti', 'Fe', 'Si'],
  ESTJ: ['Te', 'Si', 'Ne', 'Fi'],
  ESFJ: ['Fe', 'Si', 'Ne', 'Ti'],
  ENFJ: ['Fe', 'Ni', 'Se', 'Ti'],
  ENTJ: ['Te', 'Ni', 'Se', 'Fi'],
};

const FUNCTIONS = {
  Si: '内感觉：拿过去的经验当尺子，稳、细、记得住。',
  Se: '外感觉：对眼前的具体变化反应快，先动手再说。',
  Ni: '内直觉：把零碎线索收成一个方向感，先看到终局。',
  Ne: '外直觉：从一个点炸开很多可能，擅长另起一条路。',
  Ti: '内思考：要自己把逻辑盘通，讲得出为什么才认。',
  Te: '外思考：要事情跑起来，讲流程、指标和结果。',
  Fi: '内情感：先问「这符不符合我在意的东西」，价值感很强。',
  Fe: '外情感：先读空气、先顾关系，擅长把人和在一起。',
};

const TYPES = {
  ISTJ: {
    title: '检查者',
    keywords: '稳、准、守得住',
    oneLine: '答应的事会做完，讨厌临时改口和半成品。',
    strengths: ['流程感强，细节不漏', '说到做到，扛得住长期重复', '遇到混乱先立规矩'],
    blindspots: ['对「新办法」先起疑，容易错过转弯的机会', '把责任揽太多，难受也说不出口'],
    work: '适合规则清楚、可累积经验的岗位：审计、运维、法务、工程管理。',
    love: '表达朴素但稳定，重视承诺；需要对方把需求说明白，别指望你自己猜。',
    study: '靠体系与刷题推进，把知识整理成清单会明显提速。',
    growth: '练一件「没有标准答案」的事，容许自己在过程中改主意。',
  },
  ISFJ: {
    title: '守护者',
    keywords: '暖、细、记得住人',
    oneLine: '会默默把别人的需要记在心里，然后提前做好。',
    strengths: ['照顾细节与情绪', '记性好，了解身边人的习惯', '愿意做没人愿意做的收尾'],
    blindspots: ['习惯先委屈自己，之后积成怨', '对方没察觉你的付出时容易失落'],
    work: '适合需要耐心与责任心的岗位：护理、教育、行政、客户成功、人事。',
    love: '用做事表达感情，需要被明确看见与感谢；也要练习直接要。',
    study: '喜欢有例题、有反馈的学习方式，做学习小组的稳定输出者很合适。',
    growth: '练习说「这件事我做不到」，先照顾自己的电量。',
  },
  INFJ: {
    title: '提倡者',
    keywords: '深、理想、看穿人心',
    oneLine: '关心人为什么这么活，愿意为一个「值得」的目标长期投入。',
    strengths: ['能从细节里读出动机', '表达有感染力，适合讲清意义', '对长期方向有耐心'],
    blindspots: ['标准高，容易对现实失望', '想得太深而迟迟不开口，外人看不出你在乎'],
    work: '适合内容、咨询、教育、公益、产品策略这类「讲清一件事」的岗位。',
    love: '要的是深谈与理解，浅社交会耗电；需要对方给得起精神上的回应。',
    study: '适合主题式深挖，写读书笔记与建立自己的框架比刷题更有效。',
    growth: '把理想拆成这周能交付的一小步，别只在脑子里完成它。',
  },
  INTJ: {
    title: '建筑师',
    keywords: '远、冷静、自己搭系统',
    oneLine: '先看清全局再动手，讨厌无效沟通和低效流程。',
    strengths: ['长期规划清晰', '能独立啃下复杂问题', '对标准挑剔，产品因此更硬'],
    blindspots: ['说话直，容易让人觉得被否定', '对「慢」和「情绪」耐心不足'],
    work: '适合战略、研发、系统设计、投资研究这类需要独立判断的岗位。',
    love: '表达感情偏克制，用解决问题的方式示好；需要对方接受你的独处需求。',
    study: '自学效率高，适合先建框架再补细节；警惕只读不产出。',
    growth: '在给方案之前先接一句对方的感受，合作阻力会小很多。',
  },
  ISTP: {
    title: '巧匠',
    keywords: '手快、冷静、先修再说',
    oneLine: '遇到问题先上手拆开看，不爱开长会。',
    strengths: ['动手能力强，现场判断快', '压力下不慌，能抓住关键', '讲实际，不绕弯'],
    blindspots: ['对长期计划不感兴趣，容易拖到最后', '话少，别人不知道你在想什么'],
    work: '适合现场性强的岗位：工程、设备、急救、运维、技术支持、手艺型工作。',
    love: '不擅长说，但会用行动帮忙；需要对方接受你「不解释」的习惯。',
    study: '边做边学最快，先碰真实设备或真实项目，再回头补理论。',
    growth: '给重要的事留一个检查点，别全靠临场反应。',
  },
  ISFP: {
    title: '探险家',
    keywords: '真、敏感、跟着感觉走',
    oneLine: '在意「这件事对不对味」，不喜欢被安排得太死。',
    strengths: ['审美与体感准', '待人温和，不强加于人', '在真实情境里学得快'],
    blindspots: ['不愿冲突，把不满压着', '长期目标容易停在「想」这一步'],
    work: '适合与美、身体、具体对象打交道的岗位：设计、摄影、餐饮、康复、手作。',
    love: '用陪伴和小惊喜表达在意，讨厌被审问；需要空间也需要被确认。',
    study: '先看示例、先动手，理论放在用到的时候补，效率更高。',
    growth: '给在意的事定一个可交付的日期，把感觉变成作品。',
  },
  INFP: {
    title: '调停者',
    keywords: '柔、较真、心里有一杆秤',
    oneLine: '对人真诚，对自己在意的事格外较真，讨厌虚伪。',
    strengths: ['共情与想象力都好', '写与表达有个人味道', '能为价值观长期坚持'],
    blindspots: ['容易把「不够好」归到自己身上', '计划性弱，想法多而落地慢'],
    work: '适合创作、教育、心理、内容、公益这类能表达价值的岗位；强规则环境会耗电。',
    love: '看重真诚与被理解，愿意为对方调整；需要明确的回应，别长期猜。',
    study: '靠兴趣驱动，给自己找「为什么学」比逼自己更有效；用短周期输出防拖延。',
    growth: '把心里的标准写下来，分「必须有」和「有更好」，少一点全或无。',
  },
  INTP: {
    title: '逻辑家',
    keywords: '想透、好问、自己盘逻辑',
    oneLine: '喜欢把问题拆到原理层，讨厌「一直这样所以就这样」。',
    strengths: ['抽象思考强，能发现系统里的漏洞', '学新领域快', '不轻易被权威说服'],
    blindspots: ['想得多做得少，收尾困难', '指出问题时不修饰，容易树敌'],
    work: '适合研究、算法、架构、分析、写作这类需要反复推演的岗位。',
    love: '用分享想法表达亲近，需要对方能聊得深；别让讨论变成辩论。',
    study: '先弄清原理再练，适合自己搭知识树；给自己设「讲给别人听」的交付点。',
    growth: '给探索设时间盒，到点就交出一个能用的版本。',
  },
  ESTP: {
    title: '企业家',
    keywords: '快、敢、临场能打',
    oneLine: '看到机会先动手，比开会讨论更信现场反馈。',
    strengths: ['行动快，敢试错', '会看人、会周旋', '压力下反而清醒'],
    blindspots: ['耐心不足，容易留一堆半成品', '对长期代价估计偏轻'],
    work: '适合销售、商务、创业、现场运营、竞技类岗位；文牍型工作会闷。',
    love: '热烈直接，喜欢一起做事；需要对方接受你「说到就到」的节奏。',
    study: '靠实战与竞赛驱动，做项目比听课有效；需要有人帮你收尾。',
    growth: '动手前多问一句「三个月后这件事还成立吗」。',
  },
  ESFP: {
    title: '表演者',
    keywords: '热、会带气氛、活在当下',
    oneLine: '在人群里自带气氛，喜欢真实可感的体验。',
    strengths: ['感染力强，能把场子撑起来', '对人和现场的细节敏感', '愿意尝试新鲜事'],
    blindspots: ['对长期枯燥的事耐力有限', '不太愿意面对冲突背后的结构问题'],
    work: '适合面向人的岗位：活动、销售、主持、文旅、服务、内容出镜。',
    love: '表达直接，喜欢一起玩；需要对方给你稳定感，也别把自由当借口。',
    study: '边玩边学最有效，把知识做成游戏、演示或小组活动。',
    growth: '留一件「不好玩但重要」的事，按周推进。',
  },
  ENFP: {
    title: '竞选者',
    keywords: '亮、点子多、对人好奇',
    oneLine: '对人和可能性都很好奇，容易同时点亮很多盏灯。',
    strengths: ['联想快，能给人新视角', '真诚热情，容易建立信任', '擅长起头与鼓舞'],
    blindspots: ['兴趣转移快，收尾吃力', '情绪起伏大，容易被细节拖垮'],
    work: '适合创意、品牌、内容、培训、早期项目这类需要不断开新局的地方。',
    love: '需要新鲜感与被看见，愿意为对方想很多；要练习把承诺落到实处。',
    study: '用主题和讨论驱动，找学习搭子比一个人硬啃有效。',
    growth: '同时只开三条线，其余写进「以后再说」清单。',
  },
  ENTP: {
    title: '辩论家',
    keywords: '机敏、爱拆、想法往外冒',
    oneLine: '喜欢把既有说法掰开看，享受把问题换个角度。',
    strengths: ['反应快，能现场找到漏洞', '对新领域上手快', '擅长把复杂事讲得好玩'],
    blindspots: ['为辩而辩，容易伤人', '起头多、收尾少'],
    work: '适合咨询、产品、创业、策略、媒体这类需要不断破局的地方。',
    love: '用斗嘴表达亲近，需要对方接得住；别把关系也当成辩论场。',
    study: '讨论与质疑中理解最快，适合做分享者；给自己定交付时间。',
    growth: '挑一件「不新但重要」的事，把它做完再开下一个。',
  },
  ESTJ: {
    title: '总经理',
    keywords: '务实、能扛、把事推到底',
    oneLine: '目标定了就拆任务、定人、定时间，讨厌含糊。',
    strengths: ['组织与推进力强', '标准清楚，团队知道该做什么', '对结果负责'],
    blindspots: ['节奏太紧，忽视人的感受', '对新方法的容忍度低'],
    work: '适合管理、运营、项目、供应链、政务这类要「把事办成」的岗位。',
    love: '用承担责任表达在意，需要对方直接说需求；记得留不安排的时间。',
    study: '目标拆解 + 打卡推进最有效，适合带小组复习。',
    growth: '在下判断前多问一句「有没有我没想到的难处」。',
  },
  ESFJ: {
    title: '执政官',
    keywords: '周到、热络、把人放在心上',
    oneLine: '习惯先照顾气氛和关系，让事情在人情里办成。',
    strengths: ['组织人际与活动', '记得住每个人的状况', '愿意为集体做脏活累活'],
    blindspots: ['太在意别人评价，容易内耗', '对「不合群」的选项排斥'],
    work: '适合人力、行政、教育、客户、医护、社群运营这类以人为中心的岗位。',
    love: '投入、周到，需要明确的回应与稳定；别把照顾变成控制。',
    study: '在小组里学得最好，讲给别人听会记得更牢。',
    growth: '练习在不解释的情况下做一次自己的选择。',
  },
  ENFJ: {
    title: '主人公',
    keywords: '暖、会带人、看得见潜力',
    oneLine: '天然想把人和事往好的方向推，愿意为别人多走一步。',
    strengths: ['洞察他人需求', '善于组织与鼓舞', '把长期关系经营得住'],
    blindspots: ['过度承担别人的情绪', '为了和谐压下自己的判断'],
    work: '适合教育、管理、培训、公益、品牌这类「带人成长」的岗位。',
    love: '投入且会照顾，需要对方也主动；别把付出当成默认义务。',
    study: '教别人是最好的学法，适合做学习小组的组织者。',
    growth: '把「我该帮」和「不该我扛」分开，先照顾自己的电量。',
  },
  ENTJ: {
    title: '指挥官',
    keywords: '决断、看清、把盘做大',
    oneLine: '看得远也敢拍板，喜欢把资源调到最该去的地方。',
    strengths: ['目标与路径清楚', '能在压力下决断', '擅长组织复杂局面'],
    blindspots: ['节奏压人，忽略情绪成本', '把「效率」当成唯一标准'],
    work: '适合管理、创业、投资、战略、大型项目这类要定方向并扛结果的岗位。',
    love: '用规划和承担表达在意，需要对方能对话；记得把「安排」换成「商量」。',
    study: '先建目标与评估标准，按里程碑推进；警惕只搭框架不落细节。',
    growth: '定期问自己「这件事赢了，人会怎样」，把人的成本算进去。',
  },
};

const SCALE_SAY = {
  1: '完全不像',
  2: '不太像',
  3: '说不准',
  4: '有点像',
  5: '很像我',
};

function mbtiPaper() {
  return {
    system: 'mbti',
    needAnswers: true,
    scale: SCALE_SAY,
    total: QUESTIONS.length,
    dimensions: DIMENSIONS.map((d) => ({ key: d.key, name: d.name, left: d.left, right: d.right, leftSay: d.leftSay, rightSay: d.rightSay, note: d.note })),
    questions: QUESTIONS.map((q, i) => ({ no: i + 1, id: q.id, dim: q.dim, text: q.text })),
    note: '这是一份 MBTI 风格的问卷（不是官方 MBTI 量表）：每题按 1（完全不像我）到 5（很像我）打分，把 24 个分数按顺序交给 answers 即可出类型。题目只作自我参照，不适合用来评价别人的能力或做招聘、晋升等决定。',
  };
}

function normalizeAnswers(answers) {
  if (!Array.isArray(answers)) {
    throw fail('E_INPUT', 'answers 必须是数组：每题 1–5 分，按 questions 的顺序给；答题前先不带 answers 调一次，拿到题目');
  }
  if (answers.length > QUESTIONS.length) {
    throw fail('E_INPUT', `answers 最多 ${QUESTIONS.length} 个（对应 ${QUESTIONS.length} 题），收到 ${answers.length} 个`);
  }
  const out = [];
  for (let i = 0; i < QUESTIONS.length; i += 1) {
    const raw = answers[i];
    if (raw === undefined || raw === null || raw === '') {
      out.push(null);
      continue;
    }
    const v = Number(raw);
    if (!Number.isInteger(v) || v < 1 || v > 5) {
      throw fail('E_RANGE', `第 ${i + 1} 题的分值必须是 1–5 的整数（1 完全不像，5 很像我），收到「${raw}」`);
    }
    out.push(v);
  }
  return out;
}

function strengthOf(pct, answered) {
  if (!answered) return '未作答';
  if (pct <= 0.12) return '临界';
  if (pct <= 0.3) return '轻微';
  if (pct <= 0.6) return '明显';
  return '很强';
}

function buildMbti(input = {}) {
  const answers = normalizeAnswers(input.answers);
  const answeredAll = answers.filter((v) => v !== null).length;
  if (answeredAll < 12) {
    throw fail('E_INPUT', `至少答 ${12} 题才能出口径（现答 ${answeredAll} 题）；可以先不带 answers 调一次，把题目发给用户逐题打分`);
  }
  const dims = DIMENSIONS.map((d) => {
    let sum = 0;
    let answered = 0;
    QUESTIONS.forEach((q, i) => {
      const v = answers[i];
      if (v === null || q.dim !== d.key) return;
      answered += 1;
      sum += (v - 3) * (q.side === d.left ? 1 : -1);
    });
    const maxAbs = answered * 2;
    const pct = maxAbs ? Math.abs(sum) / maxAbs : 0;
    const picked = sum > 0 ? d.left : sum < 0 ? d.right : d.tie;
    return {
      key: d.key,
      name: d.name,
      left: d.left,
      right: d.right,
      leftSay: d.leftSay,
      rightSay: d.rightSay,
      note: d.note,
      sum,
      answered,
      maxAbs,
      pct: Math.round(pct * 1000) / 1000,
      picked,
      strength: strengthOf(pct, answered),
      tie: sum === 0,
    };
  });
  const type = dims.map((d) => d.picked).join('');
  const profile = TYPES[type];
  if (!profile) throw fail('E_SYSTEM', `内部错误：类型 ${type} 没有对应文案`);
  const stack = (FUNCTION_STACKS[type] || []).map((f) => ({ code: f, say: FUNCTIONS[f] || '' }));
  return {
    system: 'mbti',
    type,
    title: profile.title,
    keywords: profile.keywords,
    oneLine: profile.oneLine,
    dims: dims.map(({ sum, maxAbs, answered, ...rest }) => ({ ...rest, sum, maxAbs, answered })),
    profile: {
      title: profile.title,
      keywords: profile.keywords,
      oneLine: profile.oneLine,
      strengths: profile.strengths.slice(),
      blindspots: profile.blindspots.slice(),
      work: profile.work,
      love: profile.love,
      study: profile.study,
      growth: profile.growth,
      stack,
    },
    answered: answeredAll,
    skipped: QUESTIONS.length - answeredAll,
    total: QUESTIONS.length,
    note: '四维各 6 题、李克特 1–5 计分，按维度净分取字母（平手时取 I / N / F / P 一侧并标「临界」）。这是 MBTI 风格的问卷测算，不是官方量表；类型只作自我参照，不是能力评价，也不用它给人下结论。',
  };
}

return { DIMENSIONS, QUESTIONS, FUNCTION_STACKS, FUNCTIONS, TYPES, mbtiPaper, buildMbti };
})();

__mods.chenggu = (function () {
const { solarToLunar } = __mods.lunar;
const { ganzhiName, toJDN, dayGanzhiIndex } = __mods.calendar;
const { assertCivil } = __mods.validate;
const { hourToBranch } = __mods.almanac;

const YEAR_WEIGHT = [
  12, 9, 6, 7, 12, 5, 9, 8, 7, 8,
  15, 9, 16, 8, 8, 19, 12, 6, 8, 7,
  5, 15, 6, 16, 15, 7, 9, 12, 10, 7,
  15, 6, 5, 14, 14, 9, 7, 7, 9, 12,
  8, 7, 13, 5, 14, 5, 9, 17, 5, 7,
  12, 8, 8, 6, 19, 6, 8, 16, 10, 7,
];

const MONTH_WEIGHT = [6, 7, 18, 9, 5, 16, 9, 15, 18, 8, 9, 5];

const DAY_WEIGHT = [
  5, 10, 8, 15, 16, 15, 8, 16, 8, 16,
  9, 17, 8, 17, 10, 8, 9, 18, 5, 15,
  10, 9, 8, 9, 15, 18, 7, 8, 16, 6,
];

const HOUR_WEIGHT = { 子: 16, 丑: 6, 寅: 7, 卯: 10, 辰: 9, 巳: 16, 午: 10, 未: 8, 申: 8, 酉: 9, 戌: 6, 亥: 6 };

const LIANG = ['一', '二', '三', '四', '五', '六', '七'];
const QIAN = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
const MONTH_TEXT = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
const DAY_TENS = ['初', '十', '廿'];
const DAY_UNITS = ['十', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

function formatWeight(qian) {
  const liang = Math.floor(qian / 10);
  const rem = qian % 10;
  const liangPart = liang > 0 ? `${LIANG[liang - 1]}两` : '';
  const remPart = rem > 0 ? `${QIAN[rem - 1]}钱` : liang > 0 ? '整' : '零';
  return `${liangPart}${remPart}`;
}

function lunarDayText(day) {
  if (day === 10) return '初十';
  if (day === 20) return '二十';
  if (day === 30) return '三十';
  const ten = Math.floor(day / 10);
  const unit = day % 10;
  return `${DAY_TENS[ten]}${DAY_UNITS[unit]}`;
}

function lunarMonthText(month, isLeap = false) {
  return `${isLeap ? '闰' : ''}${MONTH_TEXT[month - 1] || month}月`;
}

const CHENGGU_SONG = {
  21: { text: '短命非业谓大空，平生灾难事重重；凶祸频临陷逆境，终世困苦事不成。', plain: '起点低、阻力大，凡事难一气呵成；宜守稳借力，不宜孤注一掷。' },
  22: { text: '身寒骨冷苦伶仃，此命推来行乞人；劳劳碌碌无度日，终年打拱过平生。', plain: '早年资源薄、亲缘淡，靠勤苦与人缘翻身，最忌自弃。' },
  23: { text: '此命推来骨格轻，求谋作事事难成；妻儿兄弟应难许，别处他乡作散人。', plain: '独自谋事难成，宜合伙或依附平台；离乡发展反有出路。' },
  24: { text: '此命推来福禄无，门庭困苦总难荣；六亲骨肉皆无靠，流浪他乡作老翁。', plain: '六亲助力少，别指望祖业，早做打算、靠双手积累。' },
  25: { text: '此命推来祖业微，门庭营度似稀奇；六亲骨肉如冰炭，一世勤劳自把持。', plain: '家底薄、亲缘冷，一生靠自己操持，勤俭则安。' },
  26: { text: '平生衣禄苦中求，独自营谋事不休；离祖出门宜早计，晚来衣禄自无休。', plain: '白手起家之格：早离乡、晚渐稳，不必怕慢。' },
  27: { text: '一生作事少商量，难靠祖宗作主张；独马单枪空做去，早年晚岁总无长。', plain: '主意要自己拿，靠人不如靠己；早定方向才不空忙。' },
  28: { text: '一生行事似飘蓬，祖宗产业在梦中；若不过房改名姓，也当移徒二三通。', plain: '祖业难守，适合外出或改换环境，动中求安。' },
  29: { text: '初年运限未曾亨，纵有功名在后成；须过四旬才可立，移居改姓始为良。', plain: '功名在后，四十前后才立得住，忌中途频繁换道。' },
  30: { text: '劳劳碌碌苦中求，东奔西走何日休；若使终身勤与俭，老来稍可免忧愁。', plain: '东奔西走的劳碌格，靠勤俭积攒，晚年才得清闲。' },
  31: { text: '忙忙碌碌苦中求，何日云开见日头；难得祖基家可立，中年衣食渐无忧。', plain: '先难后易：祖基难得，中年衣食转宽，守住本业即可。' },
  32: { text: '初年运蹇事难谋，渐有财源如水流；到得中年衣食旺，那时名利一齐收。', plain: '幼年蹇滞，中年后财源渐旺，名利可期。' },
  33: { text: '早年做事事难成，百年勤劳枉费心；半世自如流水去，后来运到始得金。', plain: '前半程多试错，后半程才见成果，急不得。' },
  34: { text: '此命福气果如何，僧道门中衣禄多；离祖出家方为妙，朝晚拜佛念弥陀。', plain: '与清静行当、宗教或专门技艺有缘，离祖发展更顺。' },
  35: { text: '生平福量不周全，祖业根基觉少传；营事生涯宜守旧，时来衣食胜从前。', plain: '福量不齐，宜守旧业、少折腾；时运到了自然宽裕。' },
  36: { text: '不须劳碌过平生，独自成家福不轻；早有福星常照命，任君行去百般成。', plain: '不必太劳碌，福气随身，行事多能成。' },
  37: { text: '此命般般事不成，弟兄少力自孤行；虽然祖业须微有，来得明时去不明。', plain: '单打独斗吃力、兄弟少力；宜合作，钱财要明算账。' },
  38: { text: '一身骨肉最清高，早入簧门姓氏标；待到年将三十六，蓝衫脱去换红袍。', plain: '读书与专业路线见长，三十六前后有转机与体面。' },
  39: { text: '此命终身运不通，劳劳作事尽皆空；苦心竭力成家计，到得那时在梦中。', plain: '早年空忙，成家立业偏晚；重在坚持，不宜频繁改行。' },
  40: { text: '平生衣禄是绵长，件件心中自主张；前面风霜多受过，后来必定享安康。', plain: '先苦后甜：衣食渐稳，事在自主，晚景安康。' },
  41: { text: '此命推来自不同，为人能干异凡庸；中年还有逍遥福，不比前时运来通。', plain: '能干出众，早年只是运会未到；中年有逍遥之福。' },
  42: { text: '得宽怀处且宽怀，何用双眉皱不开；若使中年命运济，那时名利一起来。', plain: '心宽则顺；中年运济，名利自来，不必过虑。' },
  43: { text: '为人心性最聪明，作事轩昂近贵人；衣禄一生天注定，不须劳碌是丰亨。', plain: '聪明近贵，易得贵人提携，衣禄有天定之说。' },
  44: { text: '万事由天莫苦求，须知福碌赖人修；当年财帛难如意，晚景欣然便不优。', plain: '少壮难如意，晚景反安；福禄也靠人修，不必强求。' },
  45: { text: '名利推求竟若何，前番辛苦后奔波；命中难养男和女，骨肉扶持也不多。', plain: '中年前后仍奔波，子女缘与骨肉助力偏薄，凡事多自扛。' },
  46: { text: '东西南北尽皆通，出姓移居更觉隆；衣禄无穷无数定，中年晚景一般同。', plain: '外出、迁居更旺；衣禄不愁，中晚年境况相近。' },
  47: { text: '此命推求旺末年，妻荣子贵自怡然；平生原有滔滔福，可卜财源若水泉。', plain: '晚运佳：妻荣子贵，福厚财源长。' },
  48: { text: '初年运道未曾通，几许蹉跎命亦穷；兄弟六亲无依靠，一生事业晚来整。', plain: '早年蹉跎、六亲少靠，事业晚成，忌半途而废。' },
  49: { text: '此命推来福不轻，自成自立显门庭；从来富贵人钦敬，使婢差奴过一生。', plain: '自立门户、显耀门庭，中年后受人敬重。' },
  50: { text: '为利为名终日劳，中年福禄也多遭；老来自有财星照，不比前番目下高。', plain: '为名利终日奔忙，中年多波折；老来财星照，压力渐轻。' },
  51: { text: '一世荣华事事通，不须劳碌自亨通；兄弟叔侄皆如意，家业成时福禄宏。', plain: '事多顺遂，兄弟叔侄得力，家业易成。' },
  52: { text: '一世亨通事事能，不须劳苦自然宁；宗族有光欣喜甚，家产丰盈自称心。', plain: '诸事能干、少劳而宁；宗族有光，家产丰盈。' },
  53: { text: '此格推来福泽宏，兴家立业在其中；一生衣食安排定，却是人间一福翁。', plain: '兴家立业之格，衣食安稳，是人间有福之人。' },
  54: { text: '此格详采福泽宏，诗书满腹看功成；丰衣足食多安稳，正是人间有福人。', plain: '读书人格局：功名可期，衣食安稳。' },
  55: { text: '策马扬鞭争名利，少年作事费筹论；一朝福禄源源至，富贵荣华显六亲。', plain: '少年费筹谋，一朝福至；富贵显亲，属于厚积薄发。' },
  56: { text: '此格推来礼义通，一身福禄用无穷；甜酸苦辣皆尝过，滚滚财源盈而丰。', plain: '福禄厚：人生百味都经过，之后财源稳而丰。' },
  57: { text: '福禄丰盈万事全，一身荣耀乐天年；名扬威震人争羡，此世逍遥宛似仙。', plain: '万事较全，名望与荣耀随行，晚运逍遥。' },
  58: { text: '平生衣食自然来，名利双全富贵偕；金榜题名登甲第，紫袍玉带走金阶。', plain: '衣食自来、名利双全；有科第与体面之象。' },
  59: { text: '细推此格秀而清，必定才高学业成；甲第之中应有分，扬鞭走马显威荣。', plain: '才高学业成，有科第之份，前程显达。' },
  60: { text: '一朝金榜快题名，显祖荣宗大器成；衣禄定然无欠缺，田园财帛更丰盈。', plain: '金榜题名、显祖荣宗；衣禄丰足，田园财帛皆旺。' },
  61: { text: '不作朝中金榜客，定为世上大财翁；聪明天付经书熟，名显高褂自是荣。', plain: '不入仕途也能成富；聪明博学，自有显名之荣。' },
  62: { text: '此命生来福不穷，读书必定显亲宗；紫衣玉带为卿相，富贵荣华孰与同。', plain: '福泽不穷；读书可显亲，有卿相之象。' },
  63: { text: '命主为官福禄长，得来富贵实非常；名题雁塔传金榜，大显门庭天下扬。', plain: '仕途顺、福禄长；富贵非常，门庭显扬。' },
  64: { text: '此格威权不可当，紫袍金带尘高堂；荣华富贵谁能及，万古留名姓氏扬。', plain: '掌权之格：富贵与声名俱隆，留名后世。' },
  65: { text: '细推此命福非轻，富贵荣华孰与争；定国安邦人极品，威声显赫震寰瀛。', plain: '贵重之命；有定国安邦之器，声威远震。' },
  66: { text: '此格人间一福人，堆金积玉满堂春；从来富贵有天定，金榜题名更显亲。', plain: '堆金积玉、富贵天定；又有金榜显亲之象。' },
  67: { text: '此命生来福自宏，田园家业最高隆；平生衣禄盈丰足，一路荣华万事通。', plain: '福厚家隆：田园家业兴旺，衣禄丰足，一路荣华。' },
  68: { text: '富贵由天莫苦求，万事家计不须谋；十年不比前番事，祖业根基千古留。', plain: '家计不必苦谋；祖业根基可留，运势比前十年更好。' },
  69: { text: '君是人间福禄星，一生富贵众人钦；总然衣禄由天定，安享荣华过一生。', plain: '人间福禄星：富贵受人钦敬，安享荣华。' },
  70: { text: '此命推来福不轻，何须愁虑苦劳心；荣华富贵已天定，正笏垂绅拜紫宸。', plain: '不必愁虑劳心；荣华富贵已定，有朝堂之象。' },
  71: { text: '此命生成大不同，公侯卿相在其中；一生自有逍遥福，富贵荣华极品隆。', plain: '公侯卿相之格：福厚逍遥，富贵极品。' },
  72: { text: '此命推来天下隆，必定人间一主公；富贵荣华数不尽，定为乾坤一蛟龙。', plain: '极贵之格；但四表上限为七两一钱，此档基本不可达，仅备档。' },
};

function songOf(qian) {
  return CHENGGU_SONG[qian] || null;
}

function bandVerdict(qian) {
  if (qian >= 55) return { band: '上上', text: '骨重沉实，根基深厚，一生多逢贵人，谋事易成；守正持重，福泽可久。' };
  if (qian >= 45) return { band: '上', text: '骨重充实，中年前后渐入佳境，事业家宅两旺；忌骄忌躁，善守即善成。' };
  if (qian >= 35) return { band: '中上', text: '骨重适中，先劳后逸，凭本事立身；中年转运之象，稳扎稳打自见分晓。' };
  if (qian >= 25) return { band: '中', text: '骨重平平，成败多靠自身经营；宜有一技傍身、广结善缘，勤则补拙。' };
  return { band: '中下', text: '骨重较轻，早年多磨，凡事宜稳不宜急；积跬步以至千里，晚景反可安宁。' };
}

function buildChenggu(input) {
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
  const song = songOf(total);
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
    song: song
      ? { qian: total, label: formatWeight(total), title: `称骨歌·${formatWeight(total)}`, text: song.text, plain: song.plain, source: '通行本《称骨歌》' }
      : { qian: total, label: formatWeight(total), title: `称骨歌·${formatWeight(total)}`, text: '', plain: '该骨重未见通行本歌诀（表内应落在二两一钱至七两二钱之间）。', source: '通行本《称骨歌》' },
    sources: [
      '骨重表：通行本袁天罡称骨（六十甲子年 / 十二月 / 三十日 / 十二时辰）',
      '歌诀：通行本《称骨歌》原文照录（各版本有异文，断句标点已统一）',
      '释义：白话自撰，非歌诀原文，只作字面直解',
    ],
    disclaimer: '骨重与歌诀均为通行本口径，属民俗娱乐参考；释义为白话解释，不构成命运断言。',
  };
}

return { YEAR_WEIGHT, MONTH_WEIGHT, DAY_WEIGHT, HOUR_WEIGHT, formatWeight, lunarDayText, lunarMonthText, CHENGGU_SONG, songOf, buildChenggu };
})();

__mods.xiaoliuren = (function () {
const { solarToLunar } = __mods.lunar;
const { hourToBranch } = __mods.almanac;
const { BRANCHES } = __mods.calendar;

const PALACES = {
  大安: { luck: '吉', text: '事事昌顺，宜静守不宜妄动；所问之事根基稳，缓一缓更妥。' },
  留连: { luck: '凶', text: '事多牵扯反复，暗中有耗；宜守不宜进，防拖延与口舌。' },
  速喜: { luck: '吉', text: '喜事将至，行动宜快；所问之事三日内外见分晓。' },
  赤口: { luck: '凶', text: '口舌是非、官讼之象；宜谨言慎行，凡事留凭证。' },
  小吉: { luck: '吉', text: '小有助力，慢慢来能成；合作与人际有贵人。' },
  空亡: { luck: '凶', text: '落空之象，谋事多不成；宜停一停，改期再议。' },
};

const PALACE_ORDER = ['大安', '留连', '速喜', '赤口', '小吉', '空亡'];

const pick = (n) => PALACE_ORDER[(((n - 1) % 6) + 6) % 6];

function buildXiaoliuren(input) {
  const mode = input.mode === 'number' ? 'number' : 'time';
  let m;
  let d;
  let h;
  let originText;
  if (mode === 'time') {
    if (typeof input.hour !== 'number' || !Number.isInteger(input.hour) || input.hour < 0 || input.hour > 23) {
      throw new Error('时间起课必须同时给 date 与 hour（0–23）：掐指按时辰推进，缺时辰不可代填');
    }
    const mt = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(input.date || '').trim());
    if (!mt) throw new Error('时间起课需要 date（公历 YYYY-MM-DD）——请向用户询问日期');
    const lunar = solarToLunar(Number(mt[1]), Number(mt[2]), Number(mt[3]));
    const branch = hourToBranch(input.hour);
    m = lunar.month;
    d = lunar.day;
    h = BRANCHES.indexOf(branch) + 1;
    originText = `农历${lunar.month}月${lunar.day}日 ${branch}时：月${m} → 日${d} → 时${h} 掐指落宫`;
  } else {
    const nums = [input.num1, input.num2, input.num3].map(Number);
    if (nums.some((x) => !Number.isInteger(x) || x < 1 || x > 99)) {
      throw new Error('报数起课需要三个 1–99 的正整数（随口报即可）——缺数请向用户索要，不要代填');
    }
    [m, d, h] = nums;
    originText = `报数 ${m}、${d}、${h}：依次按月/日/时位掐指落宫`;
  }
  const p1 = pick(m);
  const p2 = pick(PALACE_ORDER.indexOf(p1) + 1 + d - 1);
  const p3 = pick(PALACE_ORDER.indexOf(p2) + 1 + h - 1);
  const info = PALACES[p3];
  return {
    system: 'xiaoliuren',
    meta: { mode: mode === 'time' ? '时间起课' : '报数起课', question: input.question || null, originText },
    steps: [p1, p2, p3],
    result: { palace: p3, luck: info.luck, text: info.text },
    sources: ['掌诀口径：通行马前课（白话提炼，非原文照录）'],
    disclaimer: '小六壬为轻量快占，属民俗娱乐参考；重要事项请综合现实信息判断。',
  };
}

return { PALACES, PALACE_ORDER, buildXiaoliuren };
})();

__mods.zeri = (function () {
const { fromJDN, toJDN } = __mods.calendar;
const { buildAlmanac, SHENGXIAO } = __mods.almanac;

const TASKS = {
  嫁娶: { yi: ['嫁娶', '结亲', '订盟', '纳采'], related: ['会亲友', '裁衣'], category: 'marriage' },
  订婚: { yi: ['订盟', '纳采'], related: ['嫁娶', '会亲友'], category: 'marriage' },
  领证: { yi: ['嫁娶', '纳采'], related: ['订盟', '会亲友'], category: 'marriage' },
  提亲: { yi: ['纳采', '订盟'], related: ['会亲友'], category: 'marriage' },
  收送聘金: { yi: ['纳采', '订盟'], related: ['嫁娶'], category: 'marriage' },
  满月酒: { yi: ['祭祀', '祈福'], related: ['会亲友'], category: 'celebration' },
  开业: { yi: ['开市', '立券', '交易'], related: ['纳财', '挂匾'], category: 'business' },
  交易: { yi: ['交易', '立券'], related: ['开市', '纳财'], category: 'business' },
  投资: { yi: ['纳财', '交易'], related: ['立券'], category: 'business' },
  签订合同: { yi: ['立券', '交易'], related: ['纳财', '开市'], category: 'contract' },
  签约: { yi: ['立券', '交易'], related: ['纳财', '开市'], category: 'contract' },
  纳财: { yi: ['纳财', '收账'], related: ['开市', '立券'], category: 'contract' },
  入宅: { yi: ['入宅', '移徙'], related: ['安床', '修造', '扫舍'], category: 'move' },
  搬家: { yi: ['移徙', '入宅'], related: ['安床', '修造'], category: 'move' },
  搬家入宅: { yi: ['入宅', '移徙'], related: ['安床', '扫舍'], category: 'move' },
  动土: { yi: ['动土', '修造'], related: ['竖柱', '上梁'], category: 'construction' },
  装修: { yi: ['修造', '修饰垣墙'], related: ['动土'], category: 'construction' },
  装修建造: { yi: ['修造', '动土'], related: ['竖柱', '上梁'], category: 'construction' },
  试车买车: { yi: ['交易', '纳财'], related: ['出行'], category: 'purchase' },
  安葬: { yi: ['安葬', '破土'], related: ['立碑', '埋穴'], category: 'burial' },
  出行: { yi: ['出行'], related: ['上任', '赴任'], category: 'travel' },
  旅行: { yi: ['出行'], related: ['上任', '赴任'], category: 'travel' },
  赴任: { yi: ['上任', '赴任'], related: ['出行'], category: 'travel' },
  访亲友: { yi: ['会亲友'], related: ['出行'], category: 'visit' },
  入学: { yi: ['入学'], related: ['开市', '修造'], category: 'study' },
  祭祀: { yi: ['祭祀'], related: ['祈福', '求嗣'], category: 'worship' },
  求医: { yi: ['求医', '疗病'], related: ['针灸'], category: 'medical' },
};

const TASK_GROUPS = {
  常用: ['嫁娶', '搬家入宅', '出行', '开业', '签订合同', '祭祀'],
  婚嫁: ['嫁娶', '订婚', '领证', '提亲', '收送聘金', '满月酒'],
  生活: ['搬家', '入宅', '旅行', '访亲友', '入学', '求医', '祭祀'],
  建造: ['动土', '装修', '装修建造', '安葬', '试车买车'],
  工商: ['开业', '交易', '投资', '签订合同', '签约', '纳财', '赴任'],
};

const ZHIXING_FAVOR = {
  marriage: ['满', '定', '成', '开'],
  celebration: ['满', '成', '开', '平'],
  business: ['开', '成', '满', '收'],
  move: ['定', '成', '开', '除'],
  construction: ['建', '除', '成', '开'],
  purchase: ['成', '开', '满'],
  burial: ['除', '定', '闭', '破'],
  travel: ['建', '成', '开', '除'],
  visit: ['满', '平', '定', '成'],
  study: ['成', '开', '建'],
  worship: ['除', '满', '平', '定', '执', '成', '开'],
  contract: ['定', '成', '收', '开'],
  medical: ['除', '开'],
};

const VERDICT = (score, ctx) => {
  if (ctx.chongSelf) {
    return { verdict: '回避', text: `当日冲${ctx.chongSelf}（当事人属相）：传统择日径直排除，不进推荐与可用名单。`, excluded: true };
  }
  if (score >= 3) return { verdict: '推荐', text: '宜项与建除相配，此日对所问事项顺遂。', excluded: false };
  if (score >= 1) {
    return {
      verdict: '可用',
      text: ctx.jiHit.length ? `可考虑，但当日忌${ctx.jiHit.join('、')}：宜项加分、忌项减分，未抵消干净。` : '未见冲克，可用；若有更好的日子，优先取推荐日。',
      excluded: false,
    };
  }
  if (score >= 0) return { verdict: '平平', text: ctx.jiHit.length ? `当日忌${ctx.jiHit.join('、')}，宜项不相干，不作首选。` : '宜忌不相干，无助力也无冲克。', excluded: false };
  return { verdict: '回避', text: ctx.jiHit.length ? `当日忌${ctx.jiHit.join('、')}，对所问事项不宜。` : '减分项多于加分项，此日不宜。', excluded: false };
};

function buildZeri(input) {
  const task = input.task;
  if (!TASKS[task]) throw new Error(`不支持的事项「${task}」。支持：${Object.keys(TASKS).join('、')}`);
  const m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(input.startDate || '').trim());
  if (!m) throw new Error('择日需要 startDate（公历 YYYY-MM-DD）——请向用户询问起算日，不要代填');
  const start = { year: Number(m[1]), month: Number(m[2]), day: Number(m[3]) };
  const days = Math.max(1, Math.min(60, Number.isInteger(input.days) ? input.days : 30));
  const shengXiaoRaw = typeof input.shengXiao === 'string' ? input.shengXiao.trim() : '';
  const shengXiao = shengXiaoRaw || null;
  if (shengXiao && !SHENGXIAO.includes(shengXiao)) throw new Error(`shengXiao 须为生肖名：${SHENGXIAO.join('、')}`);

  const spec = TASKS[task];
  const zhixingSet = ZHIXING_FAVOR[spec.category];
  const startJdn = toJDN(start.year, start.month, start.day);
  const list = [];
  for (let i = 0; i < days; i++) {
    const p = fromJDN(startJdn + i);
    const a = buildAlmanac(p);
    let score = 0;
    const reasons = [];
    const yiHit = spec.yi.filter((w) => a.yi.includes(w));
    if (yiHit.length) { score += 2; reasons.push(`宜${yiHit.join('、')}（+2）`); }
    const relHit = spec.related.filter((w) => a.yi.includes(w));
    if (relHit.length) { score += 1; reasons.push(`关联宜项${relHit.join('、')}（+1）`); }
    const jiHit = [...spec.yi, ...spec.related].filter((w) => a.ji.includes(w));
    if (jiHit.length) { score -= 3; reasons.push(`忌${jiHit.join('、')}（-3）`); }
    const chongSelf = shengXiao && a.chong.shengXiao === shengXiao ? shengXiao : null;
    if (chongSelf) { score -= 2; reasons.push(`冲${shengXiao}（当事人属相，径直排除）`); }
    if (zhixingSet.includes(a.zhiXing)) { score += 1; reasons.push(`建除${a.zhiXing}神利${task}（+1）`); }
    if (a.zhiXing === '破' && spec.category !== 'burial') { score -= 1; reasons.push('破日（-1）'); }
    if (a.zhiXing === '危' && spec.category !== 'travel' && spec.category !== 'worship') { score -= 1; reasons.push('危日（-1）'); }

    const v = VERDICT(score, { chongSelf, jiHit });
    list.push({
      date: a.meta.date,
      weekday: a.meta.weekday,
      lunar: a.lunar.text,
      dayGanZhi: a.ganzhi.day,
      zhiXing: a.zhiXing,
      yi: a.yi,
      ji: a.ji,
      chong: a.chong.shengXiao,
      score,
      reasons,
      verdict: v.verdict,
      verdictText: v.text,
      ...(v.excluded ? { excluded: true } : {}),
    });
  }

  const ranked = list.slice().sort((x, y) => y.score - x.score || (x.date < y.date ? -1 : 1));
  return {
    system: 'zeri',
    meta: {
      task,
      startDate: `${start.year}-${String(start.month).padStart(2, '0')}-${String(start.day).padStart(2, '0')}`,
      days,
      shengXiao,
      scope: shengXiao
        ? `宜忌按建除简表；已给当事人属相（${shengXiao}），凡当日冲该属相径直排除。评分仅用于排序引导。`
        : '宜忌按建除简表；未给当事人属相，未做冲属相排除。评分仅用于排序引导。',
    },
    best: ranked.filter((d) => d.verdict === '推荐' && !d.excluded).slice(0, 5).map((d) => d.date),
    usable: ranked.filter((d) => d.verdict === '可用' && !d.excluded).slice(0, 5).map((d) => d.date),
    avoid: list.filter((d) => d.verdict === '回避').map((d) => `${d.date}（${d.reasons.join('；') || '综合减分'}）`),
    days: list,
    excludedCount: list.filter((d) => d.excluded).length,
    sources: ['宜忌：建除十二神通行简表', '建除适配与冲煞：传统通行口径', '排序：宜忌加减分 + 属相排除（确定性）'],
    disclaimer: '择日为传统黄历口径的本地计算，属民俗参考；评分只用于排序，不构成择日结论。',
  };
}

return { TASKS, TASK_GROUPS, buildZeri };
})();

__mods.convert = (function () {
const { solarToLunar } = __mods.lunar;
const { fromJDN, toJDN } = __mods.calendar;
const { buildAlmanac } = __mods.almanac;
const { assertCivil, daysInMonth } = __mods.validate;

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

function buildConvert(input) {
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

return { buildConvert };
})();

__mods['interpret-plain'] = (function () {

const s = (v, fallback = '') => (v === undefined || v === null || v === '' ? fallback : String(v));
const join = (arr) => (Array.isArray(arr) ? arr.filter(Boolean).join('') : '');
const has = (v) => (Array.isArray(v) ? v.length > 0 : v !== undefined && v !== null && v !== '');

const STRENGTH_PLAIN = {
  身强: '底子偏足、抗压能力好，但容易自己给自己加码，学会收力比使劲更重要',
  偏强: '底子略足，扛得住事，也容易把事都往自己身上揽',
  中和: '力量比较匀，属于「给什么环境就长出什么样子」的类型',
  偏弱: '底子偏薄，靠外部支援比硬扛有效，选对圈子与节奏很关键',
  身弱: '底子偏薄，先修恢复力再谈冲刺，硬撑的性价比最低',
};

const PLAIN_BODY = {
  六冲卦: '这一卦是「六冲」，事情起落快，急事反而好办，拖久了的人事容易散。',
  六合卦: '这一卦是「六合」，容易谈成，也容易黏住不放。',
  变六冲: '往下走会散，收尾别拖。',
  变六合: '往下走会合，事情倾向于延续下去。',
  内卦伏吟: '事情卡在原地打转，想动但动不了。',
  外卦伏吟: '外面那层没变，看起来在动，其实格局照旧。',
  内卦反吟: '反复在自己这一头，改了又改回来。',
  外卦反吟: '外面反复，对方或环境会来回拉扯。',
  化进神: '有一爻在往上走，顺着这股劲推比往回拉顺。',
  化退神: '有一爻在往后退，别按原来的势头硬推。',
};

const FUSHEN_PLAIN = {
  可出: '眼下的条件算是有助无压，属于「出得来」的一档——这是条件，不等于马上应验。',
  有助有压: '眼下是一边有助、一边有压，出得来，但得费点劲。',
  受压难出: '眼下被上面的力量压着，不太容易露头，先别急着硬推。',
  未得助: '眼下暂时没借到力，还得等条件转过来。',
  飞伏未知: '飞伏关系看不全，这一层先不下判断。',
};

function usePlainOf(ug, fa) {
  if (!ug || !ug.liuqin) return '';
  if (ug.found.length) {
    const pos = ug.found.map((f) => `第${f.position}爻`).join('、');
    const moving = ug.found.some((f) => f.moving);
    const who = ug.byShi ? '代表你自己' : `就是「${ug.liuqin}」这一类事`;
    return `你问的这件事，在卦里对应${pos}${who}——${moving ? '这一爻还在动，说明事情正在推进' : '这一爻没动，先按现状看'}。`;
  }
  if (ug.fushen.length) {
    const f = ug.fushen[0];
    const hit = fa && Array.isArray(fa.items) ? fa.items.find((x) => x.position === f.position) : null;
    const tail = hit ? ` ${FUSHEN_PLAIN[hit.verdict] || ''}` : '';
    return `你问的这件事，卦面上没有直接露出来，得往深处找：它藏在第${f.position}爻下面（伏神），与上面的关系是「${f.relation || '—'}」，要借力才出得来。${tail}`;
  }
  return '';
}

function useStrengthPlain(st) {
  if (!st || !st.lines || !st.lines.length) return '';
  const dead = st.lines.filter((l) => /死|囚/.test(l.monthState) || l.monthChong);
  const live = st.lines.filter((l) => /旺|相/.test(l.monthState));
  const when = st.month && st.month.branch ? `眼下这阵子（${st.month.branch}月）` : '起卦这段日子';
  if (dead.length && !live.length) return `${when}对这件事不太帮忙，气有点被压着——先别急着硬推，等风向转。`;
  if (live.length && !dead.length) return `${when}对这件事是帮着的，气正在往上走，能推就趁现在。`;
  return `${when}对这件事有帮有压，一半的力要自己挣——结果更看你怎么走。`;
}

function jinTuiPlain(r) {
  const jp = r && r.jinTuiPower;
  if (!jp || !Array.isArray(jp.lines) || !jp.lines.length) return '';
  const sayOf = (l) => (l.verdict === '后劲足' ? '时令托着，后劲足'
    : l.verdict === '后劲有限' ? '时令不太托，后劲有限'
      : l.verdict === '进得虚' ? '时令最背，进也是虚进'
        : l.verdict === '退得缓' ? '时令还托着，退得慢'
          : l.verdict === '退得实' ? '时令也不托，退得实'
            : l.verdict === '月破失据' ? '又正好逢月破，进退都站不稳'
              : '缺月建，先只当方向看');
  return `动爻的进退还要看时令：${jp.lines.map((l) => `${l.position}爻${l.from}→${l.to}${l.type}，${sayOf(l)}`).join('；')}。`;
}

function hexStrengthPlain(hs) {
  if (!hs || !hs.counts) return '';
  const up = (hs.counts.旺 || 0) + (hs.counts.相 || 0);
  const down = (hs.counts.囚 || 0) + (hs.counts.死 || 0);
  const when = hs.month && hs.month.branch ? `按${hs.month.branch}月这段时令看` : '按起卦这天看';
  const shi = hs.shi && hs.shi.monthState !== 'unknown' ? `代表你的世爻在${hs.shi.monthState}` : '';
  if (up >= 4 && down === 0) return `${when}，整张卦六爻的气多数是顺的，${shi}，眼下算是好推的时候。`;
  if (down >= 4 && up === 0) return `${when}，整张卦六爻的气多数被压着，${shi}，这几天更适合等而不是冲。`;
  return `${when}，整张卦六爻有顺有逆（旺相 ${up} 爻、囚死 ${down} 爻）${shi ? `，${shi}` : ''}，成不成要看具体哪一爻在动。`;
}

function flyCompositePlain(fc) {
  if (!fc || !Array.isArray(fc.targets)) return '';
  const hub = fc.targets.find((t) => t.count >= 2);
  const self = fc.groups && fc.groups.selfHua && fc.groups.selfHua.length
    ? '其中有的宫自己化出去又落回自己，容易表现为「想得多、落得少」。'
    : '';
  if (!hub) return `把命宫连同对宫、两个三合宫一起看，四股力飞出去没有挤到同一处，这几件事之间牵连不深。${self}`;
  return `把命宫连同对宫与两个三合宫一起看，${hub.incoming.length} 股力最后挤在「${String(hub.palace).replace(/宫$/, '')}」这件事上——这件事会把好几个方面的劲都吸过来。${self}`;
}

function bodyPlainOf(labels) {
  const keyOf = (l) => Object.keys(PLAIN_BODY).find((k) => l === k || l.startsWith(`${k} `)) || '';
  const primary = labels.find((l) => keyOf(l));
  const main = primary ? PLAIN_BODY[keyOf(primary)] : '';
  const extra = labels
    .filter((l) => l !== primary && /^化[进退]神 /.test(l))
    .map((l) => PLAIN_BODY[keyOf(l)])
    .filter(Boolean);
  return main + extra.join('');
}

const DIR_SECTION = {
  wealth: '「工作与职业选择」与「时间窗」',
  career: '「事业发展」与「时间窗」',
  love: '「爱情与感情」',
  health: '「健康状况」',
  study: '「事业发展」与「时间窗」',
  travel: '「整体运势」与「时间窗」',
  general: '「整体运势」与「看盘顺序」',
};

function buildAnswer(r, ask, ctx = {}) {
  if (!r || !r.system) return '';
  const q = s(ask && ask.question).trim();
  const dir = (ask && ask.direction) || 'general';
  const where = r.system === 'bazi'
    ? (DIR_SECTION[dir] || DIR_SECTION.general)
    : '下面与你的问题最贴近的那一节';
  const head = q ? `你问的是「${q}」。` : '';

  if (r.system === 'bazi') {
    const dm = r.dayMaster || {};
    const st = r.strength || {};
    const ys = (r.frame && r.frame.yongshen) || {};
    const favor = join(ys.favor);
    const avoid = join(ys.avoid);
    const ln = (r.liunian || [])[0];
    const parts = [
      head + `先说结论：你是${s(dm.stem)}${s(dm.element)}日主，命局${s(st.level, '待定')}` +
        `${favor ? `，顺${favor}、忌${avoid}——往${favor}的方向安排事情会更省力` : ''}。`,
      ln && ln.ganzhi
        ? `${s(ln.year)} 年是${ln.ganzhi}年（${s(ln.luck && ln.luck.tier, '平')}），这是「大环境」这一层。`
        : '',
      `具体到你问的这件事，重点看${where}。`,
    ];
    if (!q) parts[parts.length - 1] = `没指定问题，就按${where}的顺序往下看。`;
    return parts.filter(Boolean).join('');
  }

  if (r.system === 'ziwei') {
    const soul = r.soul || {};
    const body = r.body || {};
    const bureau = r.bureau || {};
    const md = r.lifeMaster || '';
    const ji = r.flyChains && r.flyChains.忌;
    const plainFly = ji && ji.steps.length
      ? `还有一条线值得留意：${ji.path.map((p) => p.replace(/宫$/, '')).join(' → ')}——这几件事在你身上是连着转的，一件卡住，容易牵动下一件。`
      : '';
    return [
      head + `先说结论：你的命宫落${s(soul.branch, '—')}宫` +
        `${bureau.name ? `、${bureau.name}` : ''}${md ? `，命主${md}` : ''}` +
        `${body.lands ? `，身宫落在「${body.lands}」——这张盘的重心在这件事上` : ''}。`,
      plainFly,
      flyCompositePlain(r.flyComposite),
      q ? `具体到你问的这件事，重点看${where}。` : `没指定问题，就按${where}的顺序往下看。`,
    ].filter(Boolean).join('');
  }

  if (r.system === 'liuyao') {
    const ben = r.ben || {};
    const moving = (r.cast && r.cast.movingPositions) || [];
    const bian = r.bian || {};
    const labels = (r.body && Array.isArray(r.body.labels)) ? r.body.labels : [];
    const plainBody = bodyPlainOf(labels);
    return [
      head + `先说结论：本卦是${s(ben.name, '—')}` +
        `${ben.palace ? `（${ben.palace}）` : ''}` +
        `${moving.length ? `，第 ${moving.join('、')} 爻动，变为${s(bian.name, '—')}` : '，六爻安静没有动爻'}。` +
        `${plainBody}${usePlainOf(r.useGod, r.fushenAccess)}${useStrengthPlain(r.useGodStrength)}${jinTuiPlain(r)}${hexStrengthPlain(r.hexStrength)}`,
      '断卦的落点在「世爻」（代表你）和「动爻」（事情的推动点），下面「看盘顺序」就按这个次序展开。',
    ].join('');
  }

  if (head) return `${head}下面按五个维度拆开看，重点看${where}。`;
  if (r.system === 'qimen') {
    const dirTip = dir !== 'general' && ask && ask.directionLabel ? `，取「${ask.directionLabel}」方向的用神` : '';
    return `下面按排盘事实、用神、宫位条件几节展开${dirTip}。`;
  }
  if (dir !== 'general' && ask && ask.directionLabel) {
    return `下面按五个维度拆开看，重点看与「${ask.directionLabel}」方向最贴近的那一节。`;
  }
  return '下面按五个维度拆开看，没指定问题，就从头依次读。';
}

function buildPlain(r, ask, ctx = {}) {
  if (!r || !r.system) return '';
  if (r.system === 'bazi') {
    const st = r.strength || {};
    const ys = (r.frame && r.frame.yongshen) || {};
    const favor = join(ys.favor);
    const avoid = join(ys.avoid);
    const strength = STRENGTH_PLAIN[st.level] || '力量偏中性';
    const tiaohou = ys.tiaohou && ys.tiaohou.note ? `另外，${ys.tiaohou.note}，所以「暖一点、亮一点」的环境通常更舒服。` : '';
    const sy = (r.liunian || []).find((l) => l.suiyun && Array.isArray(l.suiyun.signals) && l.suiyun.signals.length);
    const syPlain = sy
      ? `再往后看，${sy.year} 年${sy.ganzhi}是${sy.suiyun.signals.map((x) => x.type).join('、')}——传统上把它当作「变化感强一点」的提示，既不是好消息也不是坏消息，遇上时多留个心眼就好。`
      : '';
    return `你的命局属于「${s(st.level, '中性')}」：${strength}。` +
      `${favor ? `能补${favor}的环境（行业、方位、作息、相处的人）会让你省力；${avoid ? `而${avoid}偏重的场合容易空耗，能绕就绕。` : ''}` : ''}` +
      tiaohou + syPlain;
  }
  if (r.system === 'ziwei') {
    const body = r.body || {};
    const ji = r.flyChains && r.flyChains.忌;
    const feltChain = ji && ji.steps.length
      ? '你身上有个绕不开的规律：几件事是连着转的，一件卡住，后面就跟着慢下来。'
      : '';
    const fc = r.flyComposite;
    const hub = fc && Array.isArray(fc.targets) ? fc.targets.find((t) => t.count >= 2) : null;
    const feltComposite = !fc || !Array.isArray(fc.targets)
      ? ''
      : hub
        ? `再往深一层，四股力最后也压在「${String(hub.palace).replace(/宫$/, '')}」上——几个方面的劲都往这儿聚。`
        : '再往深一层，四股的力没有全挤到一处，这几件事之间牵连不深。';
    const focus = body.lands
      ? `真正让你上心的，多半是「${body.lands}」这件事，做别的总会分心。`
      : '';
    return [
      `紫微讲的是「你与环境怎么互动」，不是谁好谁坏——同一件事换个环境、换个人配合，结果就不一样。`,
      focus,
      feltChain,
      feltComposite,
    ].filter(Boolean).join('');
  }
  if (r.system === 'liuyao') {
    const ben = r.ben || {};
    const moving = (r.cast && r.cast.movingPositions) || [];
    const labels = (r.body && Array.isArray(r.body.labels)) ? r.body.labels : [];
    const plainBody = bodyPlainOf(labels);
    return `${s(ben.name, '这一卦')}讲的是一个「${moving.length ? '正在动、还会变' : '暂时不动、先看清'}」的局面——` +
      `${moving.length ? '有动爻，说明事情还有转圜空间，不是死局。' : '六爻安静，说明当下更该观察而不是硬推。'}` +
      `${plainBody}${usePlainOf(r.useGod, r.fushenAccess)}${useStrengthPlain(r.useGodStrength)}${jinTuiPlain(r)}${hexStrengthPlain(r.hexStrength)}`;
  }
  return '';
}

function dimensionPlain(key, r, ctx = {}) {
  if (!r || r.system !== 'bazi') return '';
  const ys = (r.frame && r.frame.yongshen) || {};
  const favor = join(ys.favor);
  const avoid = join(ys.avoid);
  const st = r.strength || {};
  if (key === 'overall') return `一句话：底子${s(st.level, '中性')}，往${favor || '有利方向'}走省力。`;
  if (key === 'work') return `一句话：挑${favor || '喜用'}属性的活儿，比硬碰${avoid || '忌神'}省力。`;
  if (key === 'career') return `一句话：你的上升方式，偏向把${favor || '长处'}做成看得见的成果。`;
  if (key === 'love') return '一句话：关系里先看清自己要什么，再决定推进速度。';
  if (key === 'health') return '一句话：作息稳定比任何调理都优先。';
  return '';
}

const GLOSSARY = [
  ['日主', '你出生那天对应的天干，代表「你自己」，整张盘都围着它转。'],
  ['用神', '这张盘里最需要补的那一类力量，顺着它做事更省力。'],
  ['忌神', '补得越多越别扭的那一类力量，不是坏东西，只是对你性价比低。'],
  ['调候', '按出生季节调温补缺：冬天的盘怕冷，夏天的盘怕燥。'],
  ['格局', '把整张盘的结构归成一个类型，用来看「你适合怎么打」。'],
  ['十神', '把五行关系翻译成人事：财＝资源、官杀＝规则与压力、印＝支持、食伤＝表达、比劫＝同伴。'],
  ['月令', '出生的月份，是判断强弱最关键的一个位置。'],
  ['日支', '日柱的地支，也叫「配偶宫」，看亲密关系的第一落点。'],
  ['大运', '十年一换的大阶段，决定这十年顺不顺手。'],
  ['流年', '每一年的干支，看当年的具体环境。'],
  ['空亡', '落到空亡的字，力量打折，事情容易「看着有、抓不住」。'],
  ['伏神', '卦里没出现的六亲，藏在同宫首卦的对应爻下，用时才看得见。'],
  ['世应', '世爻代表你，应爻代表对方或外部环境。'],
  ['动爻', '会变的爻，是事情「往哪走」的推动点。'],
  ['纳甲', '给六个爻配上天干地支，六亲与生克才有依据。'],
  ['四化', '禄权科忌四种变化，标记星曜在这一步运里扮演什么角色。'],
  ['大限', '紫微里的十年阶段，作用类似八字的「大运」。'],
  ['庙旺', '星曜落在某宫时的力量档位：庙、旺最强，得、利、平居中，不、陷最弱。'],
  ['三方四正', '从命宫出发的三合三方加对宫，共四个宫位，是全盘最核心的势力范围。'],
  ['命主', '紫微里另有一颗命主星，补命宫看不到的那一层底色。'],
  ['身主', '紫微里另有一颗身主星，管后天的行动与身体那一面。'],
  ['五行局', '用纳音给整张盘定一个局（水二局、木三局等），大限的起法以此为准。'],
  ['自化', '宫干让本宫星曜自己生出四化，代表这一宫的事容易自己发酵。'],
  ['飞星', '拿一个宫的宫干去四化别的宫，看事情从哪来、往哪走。'],
  ['正曜', '十四主星。「无正曜」指命宫没有主星，要借对宫来看。'],
  ['借对宫', '命宫无主星时借对宫主星来读，性格更依赖环境与身边的人。'],
  ['双星', '两主星同宫，按组合读，不能只看其中一颗。'],
  ['墓库', '地支里的仓库。五行入墓代表这股力量收着，不是没有。'],
  ['伏吟', '干支重复出现，事情容易原地打转、反复。'],
  ['反吟', '天克地冲，变动与对撞的意味更明显。'],
];

const GLOSSARY_BY_SYSTEM = {
  liuyao: {
    用神: '你问的这件事对应的那一类六亲，断卦先把它找出来。',
    月令: '起卦时的月份，用来看各爻旺不旺。',
    日支: '起卦当天的地支，与月建一起决定爻的力量。',
    大运: '六爻不看大运，这里只取当前这一件事的象。',
    流年: '六爻一般不看流年，看的是眼下这一卦的时段。',
  },
  ziwei: {
    用神: '紫微斗数以「用神宫」的强弱看事情，不取五行喜忌那套。',
    日主: '紫微斗数不看日主，看的是命宫与星曜组合。',
    十神: '紫微斗数用四化与星情，不用十神。',
  },
};

function buildGlossary(texts, system) {
  const body = (Array.isArray(texts) ? texts : [texts]).filter(Boolean).join('');
  if (!body) return [];
  const override = GLOSSARY_BY_SYSTEM[system] || {};
  return GLOSSARY
    .filter(([term]) => body.includes(term))
    .map(([term, plain]) => ({ term, plain: override[term] || plain }))
    .slice(0, 10);
}

const FOLLOWUPS = {
  career: ['这份工作要不要动，明年哪几个月是窗口？', '和上级的关系该硬碰还是绕开？', '现在转方向，代价主要在哪儿？'],
  wealth: ['这笔钱现在投出去合适吗？', '我的财主要来自工资还是副业？', '今年哪段时间最容易破财？'],
  love: ['这段关系能走到哪一步？', '什么时候适合把关系定下来？', '我在关系里最容易忽略什么？'],
  health: ['哪段时间身体最需要留意？', '作息怎么调最划算？', '查体和作息之外，还有什么是能自己控制的？'],
  study: ['今年再考一次，胜算在哪、短板在哪？', '复习节奏该怎么排？', '要不要换目标院校或岗位？'],
  travel: ['这次出门顺不顺，哪天走更好？', '换个城市生活，合不合适？'],
  general: ['今年最该抓的一件事是什么？', '最该避开的坑在哪？', '接下来三个月，什么时间点值得留意？'],
};

function buildFollowups(r, ask) {
  const dir = (ask && ask.direction) || 'general';
  const list = FOLLOWUPS[dir] || FOLLOWUPS.general;
  return list.slice(0, 3);
}

return { buildAnswer, buildPlain, dimensionPlain, buildGlossary, buildFollowups };
})();

__mods['interpret-knowledge'] = (function () {

const KNOWLEDGE = [
  {
    id: 'bazi-yueling-siquan',
    system: 'bazi', dims: ['overall', 'career'],
    gist: '月令不是「一个月」，是当月最有权的那一个字。',
    detail: '月令藏干按本气、中气、余气分日用事，本气当权的时间最长。所以判旺衰先看日主在月令是得令还是失令——得令者未看全局，已有三分底气。',
    source: '《子平真诠》论用神；人元司权分日之说见《渊海子平》',
    status: 'variant',
    note: '各家对中气、余气各主几日分法不同（有 7/7/16、9/3/18 等多说），本插件只取「本气当权」这一层，未细分日数。',
  },
  {
    id: 'bazi-tonggen-tougan',
    system: 'bazi', dims: ['overall', 'career'],
    gist: '天干是露在外面的样子，地支是藏在地下的根。',
    detail: '同一个五行，透在天干叫「显」，扎在地支叫「有根」。只有天干没有地支，是看着有、使不上劲；只有地支不通天干，是有实力、不显眼。判断一个人能不能扛事，看的就是根有多深。',
    source: '《滴天髓》「天干得一比肩，不如得支中一墓库」一路的取象',
    status: 'settled',
  },
  {
    id: 'bazi-wangxiang',
    system: 'bazi', dims: ['overall', 'health'],
    gist: '旺相休囚死是五行在当月的五种状态，不是吉凶等级。',
    detail: '以月令五行为基准：当令者旺、我生者相、生我者休、克我者囚、我克者死。它是「此刻谁说话有分量」的相对排序，换个季节就整体重排，不能当固定评价。',
    source: '《五行大义》旺相休囚死；历代命书沿用',
    status: 'settled',
  },
  {
    id: 'bazi-shensha',
    system: 'bazi', dims: ['overall', 'love'],
    gist: '神煞是标签，不是判决。',
    detail: '神煞给盘面加注脚（如「这个组合常被叫作天乙贵人」），吉凶仍要看格局、旺衰、行运三件事。单见一颗凶煞不足以断凶，单见一颗吉星也不足以断吉——这是历代命书反复强调、而市面软件常忽略的一条。',
    source: '《三命通会》神煞篇；《子平真诠》力主「神煞不主吉凶」',
    status: 'settled',
  },
  {
    id: 'bazi-geju',
    system: 'bazi', dims: ['career'],
    gist: '先看月令能不能取格，取不到才论从格、化气。',
    detail: '月令有可用之神（透干或会支有力），按正格论；月令无用、全局一边倒，才考虑从格；日干与相邻天干五合、且月令有化神之气，才论化气格。顺序颠倒会把普通格局误判成特殊格局。',
    source: '《子平真诠》「论用神」；从化条件见《滴天髓》',
    status: 'variant',
    note: '化气格成立条件各家宽严不一（是否要求月令为化神、是否允许有根），本插件按「有合且月令得化神之气」从严处理。',
  },
  {
    id: 'bazi-tiaohou',
    system: 'bazi', dims: ['overall', 'health'],
    gist: '冬夏生人先调温，其余先看扶抑。',
    detail: '调候是针对出生季节的温度校正：冬生水冷木寒，先要火来解冻；夏生火炎土燥，先要水来润泽。调候与扶抑冲突时，多数命书主张先调候，因为寒暖失衡时，再怎么补强弱也难受。',
    source: '《穷通宝鉴》（拦江网）调候用神体系',
    status: 'variant',
    note: '调候与扶抑的优先级各家有争论，也有主张以扶抑为主、调候为辅的。本插件同时给出两者，不替你定谁优先。',
  },
  {
    id: 'bazi-suiyun',
    system: 'bazi', dims: ['overall', 'career'],
    gist: '大运管十年基调，流年管当年触发。',
    detail: '大运像换了条路，流年像这条路上某一段的天气。岁运并临（当值大运与流年干支相同）、运年反吟（大运与流年天克地冲）、流年伏吟（流年与原局某柱干支相同）与流年反吟（流年与原局某柱天克地冲），是传统上标记「变动较大」的年份，属于提示而非断语。本插件逐年标出四类信号：当值大运按该年立春到次年立春的区间取，交运落在年内时前后两步并列；只标干支重复与对冲，不折分数。',
    source: '岁运并临、伏吟反吟见《三命通会》《渊海子平》',
    status: 'variant',
    note: '「岁运并临主大凶」是流传最广也最被滥用的说法，本插件只作变动提示，不断吉凶；大运与原局之间的伏吟反吟未逐年标注，四柱十神层面的引化也未叠入。',
  },
  {
    id: 'bazi-liuqin',
    system: 'bazi', dims: ['love'],
    gist: '六亲有「星」也有「宫」，两处一起看才立体。',
    detail: '星是十神（男命财为妻、女命官杀为夫、印为母一类），宫是四柱位置（年月日时对应祖上、父母、配偶、子女）。星宫同参：星现而宫破，缘分有但过程有阻；宫稳而星不现，关系平淡而少波折。',
    source: '星宫同参见《子平真诠》《滴天髓》',
    status: 'variant',
    note: '女命以官杀为夫是主流，亦有以日支为主、官杀为辅的取法；本插件按主流取，并在文案中说明。',
  },
  {
    id: 'bazi-kongwang',
    system: 'bazi', dims: ['overall'],
    gist: '空亡不是「没有」，是力道打折、抓不实。',
    detail: '日柱所在旬之外的两个地支为旬空。落空之支力量减弱，但逢冲、逢合、逢填实之期可以「出空」，届时又恢复作用。所以空亡要看它是否被救，不宜一见到空就断无。',
    source: '旬空出空之说见《渊海子平》；六爻《卜筮正宗》用法相通',
    status: 'variant',
    note: '空亡是否逢空即空，各家分歧较大，本插件只标注空亡，不做吉凶推断。',
  },
  {
    id: 'bazi-xingchong',
    system: 'bazi', dims: ['overall', 'love'],
    gist: '合能解冲，冲也能破合——关系不是单向的。',
    detail: '刑冲合害要按力的大小与先后比：两支相冲，若有第三支与其中一支相合，冲力被牵制；反之先合后冲，合局也会被冲散。三合成局通常要求月令或日主参与，否则只是拱合，力量有限。',
    source: '《三命通会》论刑冲合害',
    status: 'settled',
  },

  {
    id: 'bazi-sanming-duizhao',
    system: 'bazi', dims: ['overall', 'career'],
    gist: '同一个格，子平真诠讲怎么用，三命通会讲怎么取。',
    detail: '两书不是谁替代谁：子平真诠以月令取用神、论顺逆成败，重「用」；三命通会按十神逐格立论，重「取」与「忌」。同看正官格，前者问财印护官、伤煞混杂，后者先说「止许一位，多则不宜」。此本正财、偏财分章，两格各取本格一条；七杀没有单列「论偏官」，取卷五「官煞去留杂论」讲混杂时的去留。本插件把两条并列，不合并成一句断语。',
    source: '《子平真诠》论正官等篇；《三命通会》卷五、卷六论十神与官煞去留',
    status: 'variant',
    note: '两书成书年代与流派不同，用语有出入；本插件照录通行本，不做校勘改字，也不替两家调和。',
  },
  {
    id: 'bazi-geju-chengbai',
    system: 'bazi', dims: ['overall', 'career'],
    gist: '格有成有败：成中带忌会打折，败中有救还能转成。',
    detail: '月令取到格只是起点。成格要看有没有带忌——官逢财又逢伤、官透而被合、财旺生官又逢伤，都会把成格打折；败格也看有没有救应——印来解伤、合来清煞、劫来解财，败中可转。所以判格不能只报一个格名。',
    source: '《子平真诠》九、论用神成败救应',
    status: 'variant',
    note: '各家对成格条件与带忌轻重的排序不同（有先看刑冲、有先看合化），本插件只把原文与成败方向并列摆出，不逐盘判成破。',
  },
  {
    id: 'bazi-huagi-bianhua',
    system: 'bazi', dims: ['overall', 'career'],
    gist: '月令用神会因合化而变：同一个起点，取用可以不同。',
    detail: '用神本从月令取，但月令藏干不一，透出的字不同、支会合局不同，取用就跟着变：丁生亥月本为正官，支全卯未化为印；己生申月本属伤官，藏庚透壬化为财。所以看到化气格，要回头核对月令与合局，不能只按本气定格。',
    source: '《子平真诠》十、论用神变化；化气条件各家另论',
    status: 'variant',
    note: '化气格成立条件各家宽严不一（是否要求月令为化神、日主是否允许有根），本插件只列条件、附原文，不据此断定化气已成。',
  },
  {
    id: 'bazi-zhuanwang-yuanwen',
    system: 'bazi', dims: ['overall', 'career'],
    gist: '专旺五格各有专章：成格要看局全带印，不只看身强。',
    detail: '三命通会卷六曲直、炎上、从革、润下、稼穑五篇各立一格：曲直须亥卯未带亥，炎上须寅午戌带寅，从革须巳酉丑带丙丁巳午，润下须申子辰全，稼穑取四季土。原文的条件都比「身强」细：要局全、要带印或带火炼金，还要防冲刑死绝。本插件把命中的那一篇附在结果里，只作结构说明。',
    source: '《三命通会》卷六·曲直、炎上、从革、润下、稼穑',
    status: 'variant',
    note: '专旺是否必须成方局、是否允许一点官杀财，各家宽严不一；原文五篇之间条件也不齐（润下重忌冲刑、稼穑重四季土）。本插件只按「同类+印 ≥5、官杀财皆弱」列出并附原文，不据此断贵贱，也不补专旺的破格条件。',
  },
  {
    id: 'bazi-congge-yuanwen',
    system: 'bazi', dims: ['overall', 'career'],
    gist: '从格是身无归处才「弃命」相从：一见根气就破格。',
    detail: '三命通会卷五弃命从煞、卷六弃命从财各有一篇：从煞要煞重身柔、四柱无一点比肩印绶；从财要财会成局、日干无气，原文说「若逢根气，命损无猜」。两篇都说行运喜财煞旺地、忌扶身。本插件只在盘面出现从财格或从杀格时附上对应原文；从儿、从强没有单章，不硬凑。',
    source: '《三命通会》卷五·弃命从煞；卷六·弃命从财',
    status: 'variant',
    note: '从格成立条件各家分歧很大：是否允许日主有微根、阴阳干从与不从（原文说阳木不能从）、从儿与从强算不算正从，说法不一。本插件只列结构与原文，不据此断吉凶，也不补从儿、从强的原文。',
  },
  {
    id: 'bazi-tongguan',
    system: 'bazi', dims: ['overall', 'career'],
    gist: '两神相战要有中间一行接上，对峙才化成相生。',
    detail: '用神与忌神两行在局中各 ≥1.5 分、又正好相克时，五行里只有一行能接上：克方生它、它再生被克方（金克木则以水为关，土克水则以金为关）。滴天髓用织女、牛郎隔关相望作比，说「此关若通也，相邀入洞房」。本插件只按局中分量点出这一行，并写明它是不是忌神。',
    source: '《滴天髓》通神论·通关；五行生克为通行说',
    status: 'variant',
    note: '各家对「两神相战」取哪两神不一（有取日主与官杀、有取用神与忌神、有取局中最旺两行），本插件固定取「用神与克它的忌神，且两行各 ≥1.5 分」；通关一行只按五行生克唯一确定，不据此断吉凶，也不判通关之力是否够用。',
  },

  {
    id: 'ziwei-sanfang',
    system: 'ziwei', dims: ['overall', 'career'],
    gist: '看一个宫，要看它对面和左右三个宫。',
    detail: '三方四正＝本宫加对宫、三合两宫。命宫的三方是财帛、官禄、迁移，代表钱、事、外出的环境；只看本宫会漏掉一半信息，因为紫微断的是宫与宫之间的互动，不是单宫星曜的堆叠。',
    source: '《紫微斗数全书》三方四正说',
    status: 'settled',
  },
  {
    id: 'ziwei-sihua',
    system: 'ziwei', dims: ['overall', 'career'],
    gist: '四化是变化的方向，不是吉凶等级。',
    detail: '生年四化定先天基调（禄主得、权主掌、科主名、忌主执），宫干四化定后天演变；自化是宫干化出的星就在本宫，主此宫之事自己会起变化。同一个忌，落在六亲宫与落在财帛宫，含义完全不同。',
    source: '《紫微斗数全书》四化篇；宫干飞化见飞星派',
    status: 'variant',
    note: '三合派重星情与格局、飞星派重宫干飞化，两派读法差异明显。本插件给出生年四化与宫干自化，未做完整飞星串连。',
  },
  {
    id: 'ziwei-miaowang',
    system: 'ziwei', dims: ['overall'],
    gist: '庙旺得利平不陷，说的是星在这个宫舒不舒服。',
    detail: '同一颗星落在不同宫位，发挥程度差别很大。庙旺是得地，平陷是不得地；不得地不等于不好，只是这颗星的长处不容易发挥，需要借三方吉星来补。',
    source: '《紫微斗数全书》诸星庙旺表',
    status: 'variant',
    note: '太阳、太阴在少数宫位的庙旺标注各家有出入；本插件只标十四主星，不硬标辅星。',
  },
  {
    id: 'ziwei-daxian',
    system: 'ziwei', dims: ['career'],
    gist: '大限定十年主题，流年定当年事件。',
    detail: '大限看这十年主要在忙什么，流年看其中某一年被什么触发。两者的四化会叠在同一些宫位上，叠加处就是这十年里的关键点——只看流年而不看大限，容易把小事放大。',
    source: '《紫微斗数全书》大限流年篇',
    status: 'settled',
  },
  {
    id: 'ziwei-shengong',
    system: 'ziwei', dims: ['overall'],
    gist: '命宫是「你本来是谁」，身宫是「你后来把力气放在哪」。',
    detail: '身宫不独立成宫，而是寄在某一宫里（如寄财帛、寄官禄）。它标出中年之后的着力点：命宫强而身宫弱，多为主观强但落地慢；身宫得地，做事更容易见效。',
    source: '《紫微斗数全书》命身宫说',
    status: 'variant',
    note: '身宫寄宫的取法各家一致，但身宫与命宫谁更重，各家侧重不同。',
  },
  {
    id: 'ziwei-kongjie',
    system: 'ziwei', dims: ['overall', 'career'],
    gist: '空劫主计划外的变动，遇禄则财来财去。',
    detail: '地空地劫在紫微里代表落空与抽离：落财帛多主钱财不易积累，落官禄多主方向反复。若与禄存、化禄同宫，常见进得快、出得也快；与忌同宫则容易因变动而受挫。',
    source: '《紫微斗数全书》空劫条',
    status: 'variant',
    note: '空劫是否见禄反吉，各家说法不一，本插件只提示变动性质，不判吉凶。',
  },
  {
    id: 'ziwei-feixing',
    system: 'ziwei', dims: ['overall', 'career'],
    gist: '宫干定四化，星落哪宫，这一宫的力就往哪边走。',
    detail: '生年四化是先天带的，飞星四化是宫位自己去找的：每一宫的宫干定出禄权科忌四颗星，那几颗星落在哪一宫，就是这一宫的力气往哪边使。所以同一个「化忌」，从命宫飞出去和从财帛飞出去，说的是两件事。',
    source: '《紫微斗数全书》四化篇；中州派宫干四化传法',
    status: 'variant',
    note: '飞星派（如钦天四化）把宫干四化当主线，三合派只作辅助；庚干四化各派另有异说，本插件取中州派常用表。飞星串连与三方四正复合飞化现已给出，但未叠大限流年四化。',
  },
  {
    id: 'ziwei-sanfang-fei',
    system: 'ziwei', dims: ['overall', 'career'],
    gist: '三方四正一起飞，看四股力会到哪一宫。',
    detail: '单宫飞化只看本宫宫干把四化送去哪里；三方四正复合飞化把本宫、对宫与两个三合宫共四宫的宫干四化同时摊开，约 16 条，按落宫归堆，落到同一宫的就是会照。会在一处的化越多，那一宫被牵动的力道越集中；两忌以上会宫、禄忌同宫、三化以上会宫、宫干化出又落回本宫（自化），是这一层最常取的几种情形。',
    source: '《紫微斗数全书》四化篇；飞星派三方四正同飞说',
    status: 'variant',
    note: '飞星派对「三方四正一起飞」是否成立、会照要不要折成分数，各家口径不一；本插件只做落宫归堆与会照标记，不折分数，也未叠大限流年四化。',
  },
  {
    id: 'ziwei-jichuanji',
    system: 'ziwei', dims: ['overall'],
    gist: '忌转忌：化忌落进哪一宫，就从那一宫再化出去。',
    detail: '串连是跟着同一支化逐宫走：命宫化忌入父母，父母宫的宫干再化忌往下一宫，直到绕回走过的宫成环。环越短，越容易在同一组宫位上反复；走不出去（传统说「忌出不去」）不等于凶，只是这条力没有别的出口。',
    source: '《紫微斗数全书》四化篇；忌转忌串连法',
    status: 'variant',
    note: '串连几跳为止、是否允许借对宫飞化，各派不一；本插件只跟单一支化逐宫走，走满 12 宫或成环即停。',
  },

  {
    id: 'liuyao-yongshen',
    system: 'liuyao', dims: ['overall', 'work', 'wealth', 'love', 'health', 'study'],
    gist: '问什么就以哪一类六亲为用神，这一步定错，后面全盘白算。',
    detail: '取用按所问之事：求财与男命妻缘看妻财，工作职位考核看官鬼，文书合同学历看父母，健康以官鬼为病、子孙为医药，出行以世爻为用，感情男看妻财、女看官鬼。用神在卦上就取那一爻，出现两处记「两现」；用神不上卦，按本宫首卦同六亲的爻位取伏神，再看飞伏生克。本插件把这些位置与动变、旬空、卦体标签一一对上，但不替你选两现之中的主用。',
    source: '《卜筮正宗》用神章、伏神章；《增删卜易》用神章',
    status: 'settled',
  },
  {
    id: 'liuyao-wangshuai',
    system: 'liuyao', dims: ['overall'],
    gist: '月建管当令，日辰管生杀。',
    detail: '月建决定这一爻在这个月有没有气；日辰能生能克能冲能合，作用更直接。月破之爻当月无力；日冲则看动静——静爻被日冲为暗动，动爻被日冲为冲散。',
    source: '《卜筮正宗》月建日辰章',
    status: 'settled',
  },
  {
    id: 'liuyao-dongbian',
    system: 'liuyao', dims: ['overall'],
    gist: '动爻是「事情自己在动」的那一处。',
    detail: '动爻能生克静爻，静爻不能反克动爻。变爻对动爻有回头生、回头克两种反作用；化进神（如寅化卯）主加强，化退神（如卯化寅）主减弱。一爻独发看此爻，多爻乱动则看用神受不受伤。',
    source: '《卜筮正宗》动变章；《增删卜易》进神退神',
    status: 'settled',
  },
  {
    id: 'liuyao-fushen',
    system: 'liuyao', dims: ['overall'],
    gist: '用神不上卦，就去本宫首卦的同位取伏神。',
    detail: '本卦六爻里没有用神那一类六亲，就叫用神不上卦。取法是回到本卦所属宫的首卦（八纯卦），找出该六亲所在的爻位，那一爻即伏神，本卦同一爻位上的爻叫飞神。伏神要「得出」才有用：飞神生伏神、伏神克飞神、日月生扶都算得力；飞神克伏神则受压难出。本插件给出伏神爻位、干支五行、飞伏生克，并按月建日辰归成四档出伏条件（可出 / 有助有压 / 受压难出 / 未得助）；只判条件，不出应期日期。',
    source: '《卜筮正宗》伏神章；《增删卜易》伏神篇',
    status: 'variant',
    note: '首卦里同一六亲也可能出现两次（如乾宫乾为天的父母在三爻与上爻），此时取哪一爻为伏神各家不一；本插件把候选都列出并标「伏神两现」，不代选。出伏条件的归并口径：飞生伏、伏克飞、日辰生/比和、月建旺/相算助，飞克伏、日辰克、月破算压；有助无压为「可出」，有助有压为「有助有压」，有压无助为「受压难出」，两者都无为「未得助」。四档只并列条件、不排各家优先级；旬空只标出，不并入档位。应期各家分歧更大，仍不输出日期。',
  },
  {
    id: 'liuyao-yongshen-shuai',
    system: 'liuyao', dims: ['overall', 'work'],
    gist: '用神旺不旺，看月建给的气与日辰当天的扶克。',
    detail: '月建管「这一段时令」：爻五行与月支五行同气为旺、受月令生为相、生月令为休、克月令为囚、被月令克为死。日辰管「当天这一股力」：日辰生爻为生、克爻为克、同气为比和，反过来则是爻泄日、爻耗日。此外月建冲爻叫月破，日辰冲静爻叫暗动、冲旬空之爻叫冲空。本插件把这几项折成标签逐爻列出，不折成分数。',
    source: '《增删卜易》月建章、日辰章；《卜筮正宗》月建论',
    status: 'variant',
    note: '月破、暗动、冲空三者各家取法不完全一致（有派别把日冲动爻也叫暗动，有派别只认旺相之爻暗动）；本插件按「月建冲=月破、日冲静爻=暗动、日冲旬空=冲空」这一套给标签，并注明用了哪一支月建。',
  },
  {
    id: 'liuyao-quanggu-shuai',
    system: 'liuyao', dims: ['overall', 'work'],
    gist: '全卦逐爻看月建，才看得出气聚在哪一头。',
    detail: '月建管这一段时令的旺衰、日辰管当天的扶克，落到全部六爻逐爻判定：每爻都出月令五态（旺相休囚死）与日辰五关系，并标月破、暗动、冲空。世爻、应爻、动爻与旬空另标，五态分布能看出气是聚在世应还是散在旁爻——用神只是其中一处落点，不看全卦容易把一处当全局。',
    source: '《增删卜易》月建章、日辰章；《卜筮正宗》六爻旺衰论',
    status: 'variant',
    note: '各家对月破、暗动、冲空的取法不完全一致，是否给六爻折力重（分数）分歧更大；本插件只给状态标签与五态分布，不折分数。',
  },
  {
    id: 'liuyao-yingqi',
    system: 'liuyao', dims: ['overall', 'career'],
    gist: '应期是「什么时候见分晓」，不是「哪天」。',
    detail: '近事以日计、远事以月计；常见取法是等用神逢值、逢冲、逢合之期，或等忌神受制之期。应期法各家互有出入，同一卦不同取法可以差出很远，所以只作时间窗口的提示。',
    source: '《卜筮正宗》应期章；《增删卜易》',
    status: 'variant',
    note: '应期取法（值日、冲、合、填实、旬空出空）各家优先级不同，本插件不做具体日期推算。',
  },
  {
    id: 'liuyao-liushen',
    system: 'liuyao', dims: ['overall', 'love'],
    gist: '六神是这件事的味道，不是主角。',
    detail: '青龙主喜庆与正事、朱雀主口舌与文书、勾陈主田土与迟滞、螣蛇主虚惊与缠绕、白虎主伤损与急迫、玄武主暗昧与失脱。六神只作取象的修饰，断吉凶仍以六亲旺衰生克为主。',
    source: '《卜筮正宗》六神章',
    status: 'settled',
  },

  {
    id: 'liuyao-liuchong',
    system: 'liuyao', dims: ['overall'],
    gist: '六冲卦讲「散」：起落快、来去急。',
    detail: '六冲不按「爻位相邻」判，而是看六个地支能不能正好配成子午、寅申、辰戌三组对冲。按纳甲实排，八纯卦之外天雷无妄、雷天大壮也成六冲。冲不是单纯的坏：近病逢冲主速愈、久病逢冲才忌；求财问婚，冲多主聚不住。',
    source: '《卜筮正宗》六冲章；《增删卜易》卦体说',
    status: 'variant',
    note: '通行口诀多把六冲限为八纯卦，本插件按纳甲地支实配判定，故多出无妄与大壮两支；《增删卜易》卦例里这两卦确被称作六冲，可互证。',
  },
  {
    id: 'liuyao-liuhe',
    system: 'liuyao', dims: ['overall', 'love'],
    gist: '六合卦讲「成」：容易谈拢，也容易黏住。',
    detail: '六个地支正好配成子丑、寅亥、卯戌、辰酉、巳申、午未三组相合，即六合卦，共天地否、地天泰、地雷复、雷地豫、山火贲、水泽节、泽水困、火山旅八支。六合主和合、拖延：谈事情容易成，也容易久拖不决；问病则忌缠绵。',
    source: '《卜筮正宗》六合章',
    status: 'settled',
  },
  {
    id: 'liuyao-fanyin',
    system: 'liuyao', dims: ['overall', 'work'],
    gist: '反吟主反复：去了又来、定了又改。',
    detail: '卦反吟有两种成法：一是变卦某宫的三爻地支与本卦对应宫正好全冲；二是本卦之宫与变卦之宫在后天八卦上正对（乾巽、坎离、艮坤、震兑）。爻反吟则是动爻变出的地支回头冲本爻。无论哪种，取象都是反复、翻覆、旧事重提。',
    source: '《增删卜易》反吟伏吟篇；《卜筮正宗》',
    status: 'variant',
    note: '各家对「卦反吟」是否只认地支全冲有分歧；本插件的八卦正对一路，是从《增删卜易》卦例（如山地剥之坤为地、风天小畜之乾为天）反推出来的。',
  },
  {
    id: 'liuyao-fuyin',
    system: 'liuyao', dims: ['overall'],
    gist: '伏吟主呻吟：事情在原地打转。',
    detail: '卦变了，纳甲地支却没变，叫卦伏吟。纳甲上只有乾与震共用子寅辰、午申戌一套地支，所以卦伏吟只会出在乾与震互换的卦上，例如天雷无妄之雷天大壮、天风姤之雷风恒。动爻变出的地支与本爻同支，则是爻伏吟。伏吟取象是欲动不动、原地反复，常指人想动而形势不许。',
    source: '《增删卜易》伏吟篇；《卜筮正宗》',
    status: 'variant',
    note: '另有「伏吟以用神受困论」的说法，不限于卦体；本插件只报卦体层面的伏吟与动爻伏吟，不推断吉凶轻重。',
  },
  {
    id: 'liuyao-jintui',
    system: 'liuyao', dims: ['overall'],
    gist: '动爻变出同五行顺次之支，为化进神；反向为化退神。',
    detail: '动爻变出的地支与本爻同五行、且在顺次上往前一步，叫化进神；倒退一步叫化退神。八对是：寅→卯（木）、巳→午（火）、申→酉（金）、亥→子（水），土一支成环，丑→辰→未→戌→丑。同五行但不相邻（如寅→辰）不算。进神取象是这一爻代表的人或事有后劲、势在往前；退神取象是渐渐退气、按原势头推会落空。',
    source: '《增删卜易》进神退神章',
    status: 'settled',
  },
  {
    id: 'liuyao-jintui-yong',
    system: 'liuyao', dims: ['overall', 'work'],
    gist: '化进化退要看是用神还是忌神，还要叠月建日辰。',
    detail: '进神退神本身只说明这一爻的向外趋势：用神化进为得力，忌神化进则为患加剧；用神化退是力衰，忌神化退反而是解脱。传统还要看它在本月令衰旺、有没有日辰生扶，空亡或受克时进者未必能进。本插件把进退与爻位标出来，再按月建五态给一档力重——得令则进得动、退得慢，失令则进得虚、退得实，月破压过一切；只给档位，不折成加权分数，吉凶仍落在用神与忌神那一层判。',
    source: '《增删卜易》进神退神章、用神章',
    status: 'variant',
    note: '土之进退次序各家说法不完全一致，有以丑→辰→未→戌为进、也有只取辰戌丑未相对者；本插件按丑辰未戌成环处理，并用《增删卜易》卦例中「未土化戌土为进」「戌土化未土为退」对拍。',
  },

  {
    id: 'meihua-tiyong',
    system: 'meihua', dims: ['overall'],
    gist: '动的那一卦为用，不动的那一卦为体。',
    detail: '体代表自己、用代表所问之事。体克用主可控、用克体主受制、用生体主得助、体生用主付出。再看互卦与变卦判断中段与结局——梅花只取象不排盘，落点比六爻粗。',
    source: '《梅花易数》体用篇',
    status: 'settled',
  },
  {
    id: 'daliuren-sike',
    system: 'daliuren', dims: ['overall'],
    gist: '四课看事从哪来，三传看事往哪去。',
    detail: '四课由日干日支的阴阳与天地盘相叠而得；三传依九宗门（贼克、比用、涉害、遥克等）取初传，再顺推中传末传。三传之间的生克与空亡，是判断事情走向的主线。',
    source: '《大六壬大全》；九宗门取传法',
    status: 'settled',
  },
  {
    id: 'qimen-yinyang',
    system: 'qimen', dims: ['overall'],
    gist: '冬至后阳遁、夏至后阴遁，局数由节气与三元定。',
    detail: '一年分阴阳两遁，各九局；局数取决于当前节气与上中下三元（符头定元）。取局流派有拆补、超神接气、置闰三种，同一时刻可能排出不同局数——这不是算错，是流派差异。',
    source: '《烟波钓叟歌》；拆补与置闰见《奇门遁甲统宗》',
    status: 'variant',
    note: '三种取局法在节气交接前后差异最明显，本插件同时实现三种，可在参数里指定。',
  },
  {
    id: 'qimen-jixing',
    system: 'qimen', dims: ['overall', 'work'],
    gist: '六仪落刑宫叫击刑，是宫位条件不是判决。',
    detail: '六仪按所配地支相刑：甲子戊落震三（子刑卯）、甲戌己落坤二（戌刑未）、甲申庚落艮八（申刑寅）、甲午辛落离九（午自刑）、甲辰壬落巽四（辰自刑）、甲寅癸落巽四（寅刑巳）。天盘六仪落到自己那一宫即击刑，取象是受制、掣肘、旧账翻出来，多用来量这个符号本身使不使得上力。',
    source: '《烟波钓叟歌》刑格注；《奇门遁甲统宗》',
    status: 'variant',
    note: '有流派只论天盘六仪击刑，也有把地盘一并算的；本插件只判天盘，且只作宫位条件，不自动断用神受制。',
  },
  {
    id: 'qimen-rumu',
    system: 'qimen', dims: ['overall'],
    gist: '三奇落墓宫叫入墓：力量收进去，不容易使出来。',
    detail: '按五行墓库推：乙木墓在未（未属坤二宫），丙丁火墓在戌（戌属乾六宫）。天盘乙奇落坤二、丙奇或丁奇落乾六，即三奇入墓。取象是收束、藏起来、事情压住不动；好坏要看所问之事——问收藏、问了结，入墓未必是坏事。',
    source: '《奇门遁甲统宗》三奇入墓条；五行墓库见《五行大义》',
    status: 'variant',
    note: '各家对入墓范围说法不一：有只论三奇，也有把六仪、八门、九星一并论墓的；本插件只判天盘三奇，其余留白。',
  },
  {
    id: 'qimen-wangshuai',
    system: 'qimen', dims: ['overall', 'work'],
    gist: '门、星与天盘干按月令分旺相休囚死，只说明力量强弱。',
    detail: '旺相休囚死以月支五行为尺：与月令同气为旺，月令所生为相，生月令为休，克月令为囚，被月令所克为死。八门、九星与天盘干（三奇六仪）各按自身五行对月令，得出该符号当下「使不使得上力」。比如午月火旺，景门（火）旺、生门死门（土）相、休门（水）囚、开门惊门（金）死，天盘丙丁（火）旺、庚辛（金）死。',
    source: '《奇门遁甲统宗》门星旺衰条；五行旺相休囚死见《五行大义》',
    status: 'settled',
  },
  {
    id: 'qimen-wangshuai-yong',
    system: 'qimen', dims: ['overall', 'work'],
    gist: '旺衰是助力，不单独定吉凶：门旺而宫克门仍受制。',
    detail: '月令旺衰只回答「这个符号自身有多少气」，不回答「事情成不成」。取象时要和宫位关系叠起来看：门旺但同宫门克宫（门迫），力量被宫位掣肘；门囚但宫生门，仍得宫助。星同理，旺星落宫若被克，也难全其用。',
    source: '《奇门遁甲统宗》；《烟波钓叟歌》门宫生克注',
    status: 'variant',
    note: '有流派按时令而非月令论门星旺衰，也有以落宫五行当令者；本插件统一按月支五行判，并在解读里明确只作强度参考。',
  },
  {
    id: 'qimen-gan-shengke',
    system: 'qimen', dims: ['overall', 'work'],
    gist: '天盘干落宫论生克：干克宫主进取，宫克干受制，比和相安。',
    detail: '天盘干（三奇六仪）落到某宫，就看干的五行与该宫五行的生克：干克宫，是符号压向环境、偏进取与主动；宫克干，是环境反过来管住符号、偏受制与掣肘；干生宫，力量往外泄；宫生干，环境给力；比和，两下相安。这一层与门宫关系（门迫、宫制门）并列，各说各的，不互相替换；两者同时成立时分别列出，不折成一个分数。',
    source: '《奇门遁甲统宗》干宫生克条；《烟波钓叟歌》门宫生克注',
    status: 'variant',
    note: '各家对「干与宫」的取象宽窄不一：有只论干宫、有连天盘干加地盘干（十干克应）一并论的。本插件只判天盘干与所落宫，十干克应 100 组未做。',
  },
  {
    id: 'tarot-orientation',
    system: 'tarot', dims: ['overall'],
    gist: '逆位常见的两种读法：削弱，或转向内。',
    detail: '一派认为逆位是正位力量的减弱与阻塞；另一派主张逆位是同一原型的内向化、未表达。同一张逆位牌，两种读法给出的建议方向可能相反，所以牌阵解读要先把口径讲清楚。',
    source: '韦特体系传统；逆位读法属近代流派分歧',
    status: 'variant',
    note: '逆位是否参与解读本身就有分歧（有牌阵传统完全不用逆位）。本插件按削弱加内向综合取象，并在开头声明。',
  },
  {
    id: 'bazi-dayun-jiaoqi',
    system: 'bazi', dims: [],
    gist: '交运按「三日折一年」放大到日、时：起运时刻与每步换运日期都给。',
    detail: '把「出生 → 起运那一侧节令」的真实间隔按 365.2422/3（约 121.7474 倍）放大，加到出生时刻上就是交运时刻；同一比例也兑现「一日折四月、一时辰折十日」。每步大运在同月同日同时刻换，闰日退到 2 月 28 日。年长取回归年 365.2422 日，故与按 360 日折算的流派会差一两天。',
    source: '《渊海子平》起运法（三日折一年）；《三命通会》论行运',
    status: 'variant',
    note: '各家对「一年折几日」「交运日是否按 360 日计」取法不一，本插件固定 365.2422 日并把口径写进结果（dayun.jiao.yearDays）。出生时刻或经度一变，交运日会前后移一两天；月柱在交节边界时尤其要复核。',
  },
  {
    id: 'liuyao-yingqi-exact',
    system: 'liuyao', dims: [],
    gist: '具体应期（哪一天应验）本插件尚未推算。',
    detail: '应期需要综合用神旺衰、动变、旬空出空、日月冲合多层条件，且各家取法不同。当前只给时间窗口的方向性提示，不给具体日期——与其给一个看起来精确、实则拍脑袋的日子，不如留白。',
    source: '待补：《卜筮正宗》应期章逐条实现 + 已录 128 条卦例对拍（源 138 条）',
    status: 'todo',
    note: '扩展方向：用《卜筮正宗》卦例里有明确应验日期的条目做回归，先验证再输出。',
  },
];

function knowledgeFor(system, dimKey) {
  return KNOWLEDGE.filter((k) => k.system === system && k.dims.includes(dimKey));
}

function caveatsFor(system) {
  return KNOWLEDGE.filter((k) => k.system === system && k.status !== 'settled');
}

const STATUS_LABEL = {
  settled: '诸家一致',
  variant: '各家有异说',
  todo: '待核实',
};

return { KNOWLEDGE, knowledgeFor, caveatsFor, STATUS_LABEL };
})();

__mods['ziwei-words'] = (function () {

const PALACE_FIELD = {
  命宫: { field: '你自己、性格与选择的出发点', ask: '我是个什么样的人、遇事怎么反应', drift: '整个人的状态与主见', huaJi: '容易对自己不满意，反复琢磨「是不是还不够好」' },
  兄弟: { field: '手足、同辈与合作', ask: '和同辈人怎么相处', drift: '同辈之间的支持与较劲', huaJi: '同辈之间容易有拉扯，合作前先把账算清楚' },
  夫妻: { field: '亲密关系与伴侣', ask: '感情里怎么相处', drift: '关系的温度与相处方式', huaJi: '感情里容易反复计较，越在意越觉得累' },
  子女: { field: '子女、晚辈与作品', ask: '和晚辈、和自己的创作怎么相处', drift: '照顾与创造', huaJi: '对子女或作品容易操心过头，投入多而见效慢' },
  财帛: { field: '赚钱方式与现金流', ask: '钱从哪来、留不留得住', drift: '进项与花销', huaJi: '钱上容易反复，进得来也容易散，先管现金再谈收益' },
  疾厄: { field: '身体底子与情绪出口', ask: '身体哪里要多留意', drift: '作息与身体的信号', huaJi: '情绪容易往身体上走，压力最先反映在睡眠与肠胃' },
  迁移: { field: '出门、环境与人缘', ask: '在外发展顺不顺', drift: '外部环境与人际机会', huaJi: '在外容易遇到消耗，换环境前先把代价想清楚' },
  交友: { field: '朋友、同事与部属', ask: '怎么识人、怎么带人', drift: '身边的人际圈', huaJi: '容易替别人操心、被人情拖住，帮人之前先给自己留余地' },
  官禄: { field: '事业方向与做事方式', ask: '做什么工作、怎么做事', drift: '工作与身份感', huaJi: '工作上容易反复调整方向，先把一件事做完再谈换' },
  田宅: { field: '家庭、住所与积累', ask: '安家、置产与家底', drift: '居住环境与家庭气氛', huaJi: '家里的事容易牵扯精力，置产与搬迁宜缓不宜急' },
  福德: { field: '精神享受与内在节奏', ask: '怎么让自己舒服、怎么放松', drift: '心境、兴趣与休息', huaJi: '想得多、放不下，休息也休息不踏实' },
  父母: { field: '长辈、上司与文书', ask: '和长辈上级的关系、文书合约', drift: '长辈缘与合同文书', huaJi: '与长辈上级容易有隔阂，文书合约要逐条看清' },
};

const STAR_EXTRA = {
  紫微: { alias: '帝星', key: '尊', bright: '心里像有根定海针，遇事敢拍板，也压得住场面', dim: '容易端着架子，想法很多却不肯先低头', gift: '定方向、分主次、把人组织起来', watch: '面子与身段' },
  天机: { alias: '智星', key: '动', bright: '脑子快、点子多，变化里反而找得到路', dim: '想法多过行动，容易在犹豫里把时间耗掉', gift: '策划、推演、把复杂的事拆成步骤', watch: '想太多、坐不住' },
  太阳: { alias: '日主', key: '公', bright: '外放热心，愿意担事，也容易被看见', dim: '付出多、回报少，容易觉得不被认可', gift: '对外沟通、带头做事、把光照到别人身上', watch: '用力过度、忘了照顾自己' },
  武曲: { alias: '财星', key: '实', bright: '务实果决，认结果、扛得住硬活', dim: '容易只认数字，人情上显得生硬', gift: '算账、执行、把事做扎实', watch: '太硬、不给缓冲' },
  天同: { alias: '福星', key: '柔', bright: '脾气温和，能把紧张的气氛化开', dim: '容易贪舒服、事情拖着不动', gift: '协调、服务、让人放松下来', watch: '安逸与拖延' },
  廉贞: { alias: '囚星', key: '细', bright: '细腻又讲原则，做事有分寸', dim: '容易较真到钻牛角尖，情绪起伏也大', gift: '抓细节、守规矩、做需要精度的活', watch: '情绪郁结、过度执着' },
  天府: { alias: '库星', key: '稳', bright: '稳得住、会存会调度，是团队的压舱石', dim: '偏保守，机会来了也不敢动', gift: '守成、管资源、把局面稳住', watch: '求稳到错过时机' },
  太阴: { alias: '月主', key: '藏', bright: '心思细、耐得住，静下来能做深事', dim: '敏感多虑，情绪都藏在心里', gift: '研究、文案、需要长期专注的活', watch: '内耗与睡眠' },
  贪狼: { alias: '桃花', key: '贪', bright: '好奇、活络、人缘好，学什么都快', dim: '什么都想要，结果哪样都没做透', gift: '开拓、交际、把资源变成机会', watch: '边界与节制' },
  巨门: { alias: '暗星', key: '辩', bright: '口才与逻辑都好，靠说理就能服人', dim: '容易多疑，一句话能听出三层意思', gift: '谈判、教学、法务、需要辨析的活', watch: '言语是非与疑心' },
  天相: { alias: '印星', key: '辅', bright: '讲规矩、会协调，是让人放心的副手', dim: '容易迁就别人，委屈自己也不说', gift: '协调、执行、把流程跑顺', watch: '太在意别人怎么看' },
  天梁: { alias: '荫星', key: '荫', bright: '有长者气，能扛事、也愿意护着人', dim: '操心过度，替别人背了不该背的', gift: '顾问、教育、医护、替人排忧', watch: '管太多、放不下' },
  七杀: { alias: '将星', key: '决', bright: '果断敢冲，压力越大越顶得住', dim: '容易硬碰硬，把关系撞出裂痕', gift: '开拓、攻坚、从零打出一块地', watch: '急与硬' },
  破军: { alias: '耗星', key: '破', bright: '敢破敢立，旧局推得动、新局立得起', dim: '推翻了却重建不了，反复折腾', gift: '变革、重组、做从零到一的事', watch: '冲动与耗损' },
};

const STAR_PAIR = {
  紫微天府: { gist: '尊贵加稳重：既想有位置，也守得住家底，适合在体系里往上走', watch: '别把稳做成不动' },
  紫微贪狼: { gist: '帝星带桃花：有格局也有玩心，门路多、欲望也多', watch: '兴趣铺太开，主次容易乱' },
  紫微天相: { gist: '帝星配印：权力与规矩并存，做事讲体面，也讲章法', watch: '太要好看，容易被形式拖住' },
  紫微七杀: { gist: '帝星加将星：气魄大、手腕硬，开得了局面', watch: '压得住人也容易压伤人' },
  紫微破军: { gist: '帝星带耗：敢于推倒重来，一生常有大的转身', watch: '代价是先破后立，破之前先备好退路' },
  天机太阴: { gist: '机月同宫：心思细、筹划深，适合幕后与会动脑子的活', watch: '算得太细，反而迟迟不动手' },
  天机巨门: { gist: '机巨同宫：头脑快、嘴也利，论辩是强项', watch: '话多容易生是非' },
  天机天梁: { gist: '机梁同宫：善谋又讲原则，常是出主意又担责任的人', watch: '替人想太多，累的是自己' },
  太阳太阴: { gist: '日月同宫：外放与内敛同时在身上，两种节奏互相拉扯', watch: '别自己跟自己打架' },
  太阳巨门: { gist: '日巨同宫：靠一张嘴把事说成，适合以表达与说服为业', watch: '说话直，容易得罪人' },
  太阳天梁: { gist: '阳梁同宫：热心又有长者气，助人型，容易被人依赖', watch: '别把别人的事全揽过来' },
  武曲天府: { gist: '武府同宫：会算也会守，财务与执行双强，稳中有实', watch: '只算眼前账，容易错过长线' },
  武曲贪狼: { gist: '武贪同宫：务实与欲望并存，传统说三十岁以后越走越开', watch: '先把本事磨厚，别急着要结果' },
  武曲天相: { gist: '武相同宫：讲效率也讲规矩，适合在大机构里做执行', watch: '规矩压得太死，手脚会绑住' },
  武曲七杀: { gist: '武杀同宫：硬碰硬的组合，冲劲足、压力也大', watch: '成事快，耗得也快' },
  武曲破军: { gist: '武破同宫：能打也能拆，适合攻坚与改革', watch: '聚散都快，留不住的要认' },
  天同太阴: { gist: '同阴同宫：温和细腻，重感受，适合安静一点的环境', watch: '太舒服就不想动' },
  天同巨门: { gist: '同巨同宫：想得软、说得直，容易在亲近的人面前失控', watch: '把话说软一点' },
  天同天梁: { gist: '同梁同宫：有福气也有长者缘，遇事常有人替你说句话', watch: '依赖久了会长不大' },
  廉贞天府: { gist: '廉府同宫：精细配稳重，守得住规矩也管得住资源', watch: '过分谨慎会错过窗口' },
  廉贞贪狼: { gist: '廉贪同宫：欲望与原则拉扯，才艺多、诱惑也多', watch: '重心要自己定，别被带着走' },
  廉贞天相: { gist: '廉相同宫：讲分寸、重体面，做事有章法', watch: '被规矩绑住手脚' },
  廉贞七杀: { gist: '廉杀同宫：刚烈果决，抗压强，敢碰难事', watch: '硬碰硬伤的是关系' },
  廉贞破军: { gist: '廉破同宫：敢于破局，变动多，适合在动荡里做事', watch: '变动要有节奏，别一直重来' },
};

const SHA_STAR = {
  擎羊: { nature: '锐、直接、带冲撞', inPalace: '让这一宫的事来得急，容易有竞争与对抗', remind: '慢半拍再回应，别用人身去硬碰' },
  陀罗: { nature: '拖、磨、反复', inPalace: '让这一宫的事拖得久，越急越推不动', remind: '把大目标切成小段，靠节奏推进而不是靠爆发' },
  火星: { nature: '急、爆、来得快去得快', inPalace: '让这一宫的事突然发生，情绪也容易点着', remind: '起的当下先别做决定，隔一天再看' },
  铃星: { nature: '闷、记、往里烧', inPalace: '让这一宫的事闷着发酵，不说并不代表没有', remind: '把不满讲出来，比憋着省事' },
  地空: { nature: '抽离、落空', inPalace: '让这一宫的努力容易「看着有、抓不住」', remind: '重要的事留书面凭证，别只靠口头约定' },
  地劫: { nature: '耗、变动', inPalace: '让这一宫的资源容易在变动里流失', remind: '先设止损线，再谈投入' },
  天刑: { nature: '约束、规矩', inPalace: '这一宫容易受规则或外力约束', remind: '照流程走，别找捷径' },
  天姚: { nature: '吸引、暧昧', inPalace: '这一宫容易有人情与暧昧的牵扯', remind: '边界说清楚，别用含糊换方便' },
  咸池: { nature: '情欲、外缘', inPalace: '这一宫容易被外在的吸引牵动', remind: '分清一时心动与长期相处' },
  孤辰: { nature: '孤、独', inPalace: '这一宫的事常要自己扛', remind: '主动开口求援，不丢人' },
  寡宿: { nature: '淡、疏', inPalace: '这一宫的关系容易偏淡', remind: '关系要靠主动经营' },
  破碎: { nature: '碎、不整', inPalace: '这一宫的成果容易零散、难成整块', remind: '把事收尾收完整' },
  天哭: { nature: '忧、敏感', inPalace: '这一宫容易让人心里发紧', remind: '情绪来了先照顾好身体' },
  天虚: { nature: '虚、不实', inPalace: '这一宫容易雷声大雨点小', remind: '看落地证据，不看承诺' },
};

const MAIN_SHA = ['擎羊', '陀罗', '火星', '铃星', '地空', '地劫'];

const FU_STAR = {
  左辅: { nature: '助力、帮手', gift: '这一宫容易有人搭把手', note: '多把事交出去，别一个人扛' },
  右弼: { nature: '援手、缓和', gift: '这一宫容易在关键处被接住', note: '接受帮助，也记得回礼' },
  文昌: { nature: '文书、条理', gift: '这一宫的书面与规划能力强', note: '把想法落成文档' },
  文曲: { nature: '才艺、口才', gift: '这一宫的表达与感受力好', note: '用表达换机会' },
  天魁: { nature: '明文贵人', gift: '这一宫容易遇到明面上的提携', note: '该争取的位置直接开口' },
  天钺: { nature: '暗助贵人', gift: '这一宫常有人在背后帮忙', note: '人情记着，早晚用得上' },
  禄存: { nature: '守财、积存', gift: '这一宫的东西守得住', note: '先存后花' },
  天马: { nature: '动、驿马', gift: '这一宫的事常与移动、外地有关', note: '动起来比原地等更有利' },
  台辅: { nature: '台面、名分', gift: '这一宫容易被摆到台面上', note: '露脸的机会别推' },
  封诰: { nature: '封赏、认证', gift: '这一宫的资质与头衔有用', note: '该考的证早点考' },
  红鸾: { nature: '喜事', gift: '这一宫容易有喜庆与好消息', note: '好消息要说出来' },
  天喜: { nature: '喜庆、人缘', gift: '这一宫的人缘与气氛好', note: '多参加场合' },
  龙池: { nature: '雅、工整', gift: '这一宫有审美与工整的一面', note: '把细节做好' },
  凤阁: { nature: '华、体面', gift: '这一宫讲究排场与观感', note: '该有的体面别省' },
  三台: { nature: '地位、层级', gift: '这一宫容易有位置感', note: '按层级办事' },
  八座: { nature: '席位、稳定', gift: '这一宫坐得稳', note: '守住已有的位置' },
  恩光: { nature: '恩、被赏识', gift: '这一宫容易被赏识', note: '把成果让人看见' },
  天贵: { nature: '贵气、身份', gift: '这一宫带一点贵气', note: '抬头挺胸，别自轻' },
};

const HUA_READ = {
  禄: { key: '得', gist: '顺手、有人帮，做起来不费劲' },
  权: { key: '掌', gist: '要自己拿主意，也容易用力过猛' },
  科: { key: '名', gist: '带一层体面与名声，遇事多能收得漂亮' },
  忌: { key: '执', gist: '容易在意、反复，是心里放不下的那一块' },
};

const BRIGHT_READ = {
  庙: { word: '得地', tone: 'good', plain: '长处放得开，几乎是本色出演' },
  旺: { word: '有力', tone: 'good', plain: '特点容易显出来，做事有底气' },
  得: { word: '尚可', tone: 'neutral', plain: '能用，需要一点外力配合' },
  利: { word: '中平', tone: 'neutral', plain: '长处与短板都在，看怎么用' },
  平: { word: '偏弱', tone: 'neutral', plain: '不太争得到位置，宜借势' },
  不: { word: '不得地', tone: 'bad', plain: '长处不容易使上，得多绕一步' },
  陷: { word: '失地', tone: 'bad', plain: '容易往负面走，更需要自觉' },
};

const PATTERN_READ = {
  紫府同宫: { gist: '帝星与库星同坐命宫：格局稳、底气足，天生适合做统筹', advice: '别把稳做成保守，该出手时出手' },
  紫府朝垣: { gist: '紫微天府会照命宫：有贵气也有实力，环境一般不会太差', advice: '靠结构做事，别只靠个人硬撑' },
  君臣庆会: { gist: '紫微或天府坐命，又得左辅右弼魁钺会照：有人帮、有位置', advice: '把团队搭起来，别一个人扛' },
  极向离明: { gist: '紫微在午守命：处在最亮的位置，格局与声势都强', advice: '光环大，注意别把人压住' },
  七杀朝斗: { gist: '七杀在子午守命：杀伐果断，能在压力下成事', advice: '硬气用在事上，不用在关系上' },
  英星入庙: { gist: '破军在子午守命：敢破敢立，常能从零打出一片', advice: '破之后要有立，别只破不立' },
  石中隐玉: { gist: '巨门在子午守命：本事藏在里面，要靠机会慢慢磨出来', advice: '别因为一时不被看见就放弃' },
  巨日同宫: { gist: '巨门太阳同宫：靠表达与说服开路，越抛头露面越有利', advice: '话多的时候注意分寸' },
  日月夹命: { gist: '太阳太阴分居命宫两侧：内外两种力量都来帮你', advice: '一快一慢，别自己跟自己打架' },
  日月对照: { gist: '太阳太阴分守命迁：外放与内敛互为表里', advice: '换环境对你是加分项' },
  左右夹命: { gist: '左辅右弼夹命：关键处总有人搭手', advice: '主动求助，贵人才好使力' },
  昌曲夹命: { gist: '文昌文曲夹命：文书、考试、表达上占便宜', advice: '把才华落到作品与证书上' },
  魁钺夹命: { gist: '天魁天钺夹命：明暗两路都有人提携', advice: '机会来了别客气' },
  三奇嘉会: { gist: '化禄化权化科会于命宫三方：三样都到位，是标准的顺局', advice: '别把顺境当常态，留一手' },
  双禄朝垣: { gist: '禄存与化禄同会命宫三方：进项与积累两头都有', advice: '存下来的才算数' },
  府相朝垣: { gist: '天府天相会于命宫三方：稳当、讲规矩，适合体系内发展', advice: '按流程走，别嫌慢' },
  禄马交驰: { gist: '禄存与天马同宫或对照：动中得财，越跑越有', advice: '别在原地等机会' },
  月朗天门: { gist: '太阴在亥守命：心思澄明，适合做需要静气的事', advice: '把敏感用在专业上，别用在揣测上' },
  日出扶桑: { gist: '太阳在卯守命：正当升起的位置，势头好、人也敞亮', advice: '趁势做事，别等' },
  机月同梁: { gist: '天机太阴天梁会命：动脑、静气、长者缘齐备，适合稳定的专业路线', advice: '少折腾，深耕一门' },
  武贪同行: { gist: '武曲贪狼同宫：务实与欲望并存，传统说三十岁后越走越开', advice: '先把本事磨厚，别急着要结果' },
  命无正曜: { gist: '命宫无主星：性格由环境与对宫塑造，适应力是你的长处', advice: '选对环境比选对方法更要紧' },
  杀破狼: { gist: '七杀破军贪狼会命：一生变动多、节奏快，适合在动荡里做事', advice: '把变动变成主动选择，而不是被动应付' },
  双禄交流: { gist: '禄存与化禄相对：财路两头通', advice: '现金流要管好，小心两头都花' },
  火贪铃贪: { gist: '贪狼遇火星或铃星：爆发型的组合，机会来得猛', advice: '机会来时别犹豫，走时别恋战' },
  火铃夹命: { gist: '火星铃星分居命宫两侧：情绪容易被点着，也容易被消耗', advice: '先把火气压一压，事就顺一半' },
  羊陀夹命: { gist: '禄存守命、擎羊陀罗前后夹之：位置稳，但四周都是压力', advice: '守得住就别急着动' },
  羊陀夹忌: { gist: '化忌与禄存同宫、羊陀夹之：传统里最需要留意的一类结构', advice: '那件事慢一点，让别人先动' },
  铃昌陀武: { gist: '铃星文昌陀罗武曲会于命宫三方：想法多、爱走弯路，容易自己把自己绊住', advice: '做决定前先写下来，隔一夜再定' },
  命里逢空: { gist: '地空地劫会命：计划常有意外的抽离，落袋才算数', advice: '留凭证、留退路' },
  马头带箭: { gist: '擎羊在午守命：锋芒极盛，成事快、伤人也不慢', advice: '冲劲用在攻坚，不用在争输赢' },
  天罗地网: { gist: '命宫在辰戌：天罗地网，走的是有限制的路', advice: '在框里做出成绩，别硬撞框' },
  刑囚夹印: { gist: '廉贞天相同守命宫于子午又遇擎羊：规则与冲撞同时压过来', advice: '循规蹈矩是保命符' },
  泛水桃花: { gist: '贪狼在子守命：才情与情缘都旺，重心容易散', advice: '给自己立一条不越的线' },
};

const PALACE_ALIAS = { 奴仆: '交友', 奴仆宫: '交友', 事业: '官禄', 事业宫: '官禄' };
function palaceFieldOf(name) {
  const key = PALACE_ALIAS[String(name || '')] || String(name || '');
  return PALACE_FIELD[key] || null;
}

function brightRead(level) {
  return BRIGHT_READ[String(level || '')] || null;
}

function starExtraOf(name) {
  return STAR_EXTRA[String(name || '')] || null;
}

function starPairOf(mainStars) {
  const list = (Array.isArray(mainStars) ? mainStars : []).filter(Boolean);
  if (list.length !== 2) return null;
  return STAR_PAIR[list.join('')] || STAR_PAIR[list.slice().reverse().join('')] || null;
}

function huaInLine(type, palace) {
  const f = palaceFieldOf(palace);
  const h = HUA_READ[type];
  if (!f || !h) return '';
  if (type === '忌') return `化忌入${palace}：${f.huaJi}`;
  const tail = {
    禄: `${f.field}上来路顺、有人递梯子`,
    权: `${f.field}上你会想自己拿主意，也容易用力过猛`,
    科: `${f.field}上体面与名声会帮到你`,
  }[type];
  return tail ? `化${type}入${palace}：${tail}` : '';
}

function shaLineOf(names) {
  const list = (Array.isArray(names) ? names : []).filter((n) => SHA_STAR[n]);
  if (!list.length) return '';
  const parts = list.slice(0, 3).map((n) => `${n}（${SHA_STAR[n].nature}）${SHA_STAR[n].inPalace}`);
  const remind = list.length === 1 ? SHA_STAR[list[0]].remind : '先处理最急的那一件，其余的会跟着松动';
  return `${parts.join('；')}。做法上：${remind}。`;
}

function shaNatureOf(names) {
  return (Array.isArray(names) ? names : [])
    .map((n) => SHA_STAR[n] && SHA_STAR[n].nature)
    .filter(Boolean)
    .join('、');
}

function fuLineOf(names) {
  const list = (Array.isArray(names) ? names : []).filter((n) => FU_STAR[n]);
  if (!list.length) return '';
  return list.slice(0, 3).map((n) => `${n}${FU_STAR[n].gift.replace(/^这一宫/, '')}`).join('，');
}

function patternReadOf(name, tone) {
  const hit = PATTERN_READ[String(name || '')];
  if (hit) return hit;
  if (tone === 'good') return { gist: '结构偏向有利，具体落在哪件事，要看它牵动的是哪一宫', advice: '顺势把事情做完整' };
  if (tone === 'bad') return { gist: '结构偏向消耗，提示这一块值得多一分留意', advice: '先把节奏放缓，再谈取舍' };
  return { gist: '结构中性，成事与否更多看后天怎么用', advice: '当成提醒，不当成结论' };
}

return { PALACE_FIELD, STAR_EXTRA, STAR_PAIR, SHA_STAR, MAIN_SHA, FU_STAR, HUA_READ, BRIGHT_READ, PATTERN_READ, palaceFieldOf, brightRead, starExtraOf, starPairOf, huaInLine, shaLineOf, shaNatureOf, fuLineOf, patternReadOf };
})();

__mods['bazi-words'] = (function () {

const STEM_PORTRAIT = {
  甲: {
    image: '参天之木',
    look: '身形多半偏修长，肩背挺，站着有股站相',
    temper: '直、有担当，认定的事不太会转弯',
    gift: '扛得起事，适合把一摊子组织起来',
    trap: '不会转弯，撞上南墙也硬顶',
  },
  乙: {
    image: '藤萝之木',
    look: '身形柔韧，气质亲和，不太有攻击性',
    temper: '柔中带韧，擅长借力，能屈能伸',
    gift: '协调、渗透，在缝隙里也能生长',
    trap: '太依赖环境，环境一换就慌',
  },
  丙: {
    image: '太阳之火',
    look: '面色偏红润，精神足，进门容易被注意到',
    temper: '外放热情，心里想什么脸上就写着什么',
    gift: '感染人、带动气氛，适合站到台前',
    trap: '三分钟热度，来得快去得也快',
  },
  丁: {
    image: '灯烛之火',
    look: '偏清瘦，眼神亮，动静之间有点静气',
    temper: '内敛细腻，认准一件事能守很久',
    gift: '专注、耐得住，适合做需要磨的活',
    trap: '敏感，容易在心里反复内耗',
  },
  戊: {
    image: '城墙之土',
    look: '骨架偏厚，给人稳当、压得住场的感觉',
    temper: '沉稳慢热，不轻易表态，表态了就算数',
    gift: '承载与守成，能把局面稳稳托住',
    trap: '太钝，机会过了才反应过来',
  },
  己: {
    image: '田园之土',
    look: '面目温和，身形圆润，没什么棱角',
    temper: '包容细致，想得多，习惯先照顾别人',
    gift: '经营与服务，把琐碎的事理顺',
    trap: '纠结，反复权衡反而错过时机',
  },
  庚: {
    image: '刀剑之金',
    look: '骨架硬朗，气场直接，说话不绕弯',
    temper: '果决、讲义气，眼里容不下拖泥带水',
    gift: '执行与开疆，难啃的骨头敢接',
    trap: '太刚，锋利的一面容易伤到亲近的人',
  },
  辛: {
    image: '珠玉之金',
    look: '清秀讲究，衣着细节看得出用心',
    temper: '精致敏锐，对分寸与体面很在意',
    gift: '审美与精细活，做得比说的好',
    trap: '挑剔，也容易被一句评价刺到',
  },
  壬: {
    image: '江河之水',
    look: '身形偏厚实，眉眼开阔，气度大',
    temper: '大开大合，爱自由，不喜欢被框住',
    gift: '统筹与流动，能把资源盘活',
    trap: '散漫，摊子铺开却收不回来',
  },
  癸: {
    image: '雨露之水',
    look: '清秀安静，存在感不抢，但耐看',
    temper: '细腻、直觉强，心事多半自己消化',
    gift: '感知与研究，能注意到别人漏掉的细节',
    trap: '多愁，遇事先退，容易错过表态的时机',
  },
};

const TENGOD_PORTRAIT = {
  正官: { role: '规则与名分', gift: '守序可靠，答应的事会做到', trap: '太在意评价，放不开手脚', love: '重承诺，但不擅长把在意说出口', work: '适合在成体系的组织里按层级上升' },
  七杀: { role: '压力与冲劲', gift: '抗压强、敢担事，越难越来劲', trap: '急躁，习惯用硬碰解决问题', love: '容易被有主见的人吸引，也容易互相较劲', work: '适合高挑战、要快速决断的岗位' },
  正财: { role: '稳定收入与责任', gift: '务实会积累，账目清楚', trap: '算得太细，不敢为机会冒一点险', love: '重实际，用行动多于言语', work: '适合按劳取酬、积累型的路径' },
  偏财: { role: '机会与流动资源', gift: '善抓机会、人脉活络', trap: '铺得太开，钱和精力都容易留不住', love: '大方、桃花多，边界要自己划', work: '适合业务、投资、资源整合' },
  食神: { role: '表达与享受', gift: '会生活，也能把喜欢的事做成产出', trap: '太舒服就懒下来，节奏一松就拖', love: '温柔会照顾人，也怕麻烦', work: '适合技术、创作、餐饮、教育' },
  伤官: { role: '才华与不服', gift: '点子多、敢改，能做出别人做不出的东西', trap: '嘴上不饶人，赢了道理输了关系', love: '要求高，容易挑对方的刺', work: '适合改革、创意、专业型岗位' },
  正印: { role: '支持与学习', gift: '有耐心、学得进，靠得住', trap: '依赖心重，想得多做得少', love: '需要被理解与照顾', work: '适合研究、文教、需要资质的岗位' },
  偏印: { role: '偏门与钻研', gift: '冷门的门类也能钻透', trap: '孤，想法多但不爱解释', love: '需要空间，不喜欢被管', work: '适合专精技术、冷门专业' },
  比肩: { role: '同伴与自我', gift: '独立、扛得住，不轻易麻烦别人', trap: '固执，什么都想亲力亲为', love: '相处像朋友多过像恋人', work: '适合并肩作战或独立负责一块' },
  劫财: { role: '竞争与行动', gift: '行动快、敢抢，机会面前不犹豫', trap: '冲动，容易在钱和人情上破口', love: '来去都快，需要给彼此空间', work: '适合业务冲刺、竞争型岗位' },

  比劫: { role: '自我与同辈', gift: '独立、扛得住，不太依赖别人', trap: '固执，什么都想自己来', love: '相处像并肩的伙伴', work: '适合独立负责一块，或与同频的人并肩' },
  食伤: { role: '表达与产出', gift: '有想法，也做得出东西', trap: '话多或要求高，容易得罪人', love: '重视交流，也容易挑刺', work: '适合创作、技术、教学这类要表达的岗位' },
  财: { role: '资源与现实', gift: '务实、会算账、抓得住机会', trap: '把安全感全押在数字上', love: '重实际，用行动多于言语', work: '适合业务、财务、资源整合' },
  官杀: { role: '规则与压力', gift: '守序、抗压、担得起责任', trap: '绷得太紧，习惯用硬碰解决', love: '重承诺，也容易管得太宽', work: '适合体系内按层级上升，或高压高挑战的岗位' },
  印: { role: '支持与学习', gift: '有耐心、学得进、靠得住', trap: '想得多做得少，依赖现成的东西', love: '需要被理解与照顾', work: '适合研究、文教、需要资质的岗位' },
};

const FRAME_TONE = {
  强: {
    泄: '这盘的问题是「力气有余、出口不够」：不缺劲头，缺的是把劲往哪使。先把方向定下来，比再多加一把力更管用。',
    制: '这盘气足又带压力：能扛事，但也容易一直绷着。学会把压力分出去，比硬顶更能长久。',
    耗: '这盘底子厚，适合在资源与实务上做文章：把力气换成看得见的成果，别停在想法里。',
  },
  弱: {
    生: '这盘底子偏薄，靠「有人托一把」最有效：找对平台、师友与环境，比自己硬撑省力得多。',
    比: '这盘单打独斗会累，找到同频的人并肩做，反而能把短板补上。',
    泄: '这盘不宜再往外耗，先收一收摊子，把根基补稳，再谈扩张。',
  },
  中: {
    default: '这盘五行相对均衡，没有哪一处特别极端：走哪条路都能走，靠的是选择与坚持，不是运气。',
  },
};

function frameToneOf(level, favorRoles) {
  const strong = /强/.test(String(level || ''));
  const weak = /弱/.test(String(level || ''));
  const roles = Array.isArray(favorRoles) ? favorRoles : [String(favorRoles || '')];
  if (!strong && !weak) return FRAME_TONE.中.default;
  const table = strong ? FRAME_TONE.强 : FRAME_TONE.弱;
  for (const r of roles) {
    const key = /官杀/.test(r) ? '制'
      : /财/.test(r) ? '耗'
        : /食伤/.test(r) ? '泄'
          : /印/.test(r) ? '生'
            : /比劫/.test(r) ? '比' : '';
    if (key && table[key]) return table[key];
  }
  return strong ? table.泄 : table.生;
}

const RELATION_RULES = [
  [/自刑/, '自刑：自己跟自己较劲，多半是内耗而不是外来的事'],
  [/三会|三合/, '三合三会：几股力并成一股，做同类的事更容易成势'],
  [/六合|合/, '合：人事上容易谈拢，也容易被关系绑住、脱不开身'],
  [/相冲|冲/, '冲：桩子会晃，变动与拉扯偏多，宜先稳住再动'],
  [/相刑|刑/, '刑：规矩与情绪上的摩擦，事情不大但磨人'],
  [/相害|害/, '害：暗处的损耗，多是说不清的不顺'],
  [/相破|破/, '破：本来成形的事容易散，收尾要多花一分力'],
];

function relationNotes(list) {
  const out = [];
  for (const raw of (Array.isArray(list) ? list : [])) {
    for (const [re, note] of RELATION_RULES) {
      if (re.test(raw) && !out.includes(note)) { out.push(note); break; }
    }
  }
  return out;
}

function godPortraitOf(name) {
  return TENGOD_PORTRAIT[String(name || '')] || null;
}

function stemPortraitOf(stem) {
  return STEM_PORTRAIT[String(stem || '')] || null;
}

return { STEM_PORTRAIT, TENGOD_PORTRAIT, FRAME_TONE, frameToneOf, relationNotes, godPortraitOf, stemPortraitOf };
})();

__mods.interpret = (function () {

const { HEX64, HEX_BY_CORE, TRIGRAM, YAO_POSITION, MOVING_NATURE, ZIWEI_STARS, WUXING_INDUSTRY, WUXING_ORGAN, TENGOD_STYLE, LIUREN_JIANG, TAROT_ELEMENT_FOCUS, DISCLAIMER } = __mods['interpret-data'];
const { MUTAGEN } = __mods.ziwei;
const { palaceFieldOf, starExtraOf, starPairOf, brightRead, huaInLine, shaLineOf, shaNatureOf, fuLineOf, patternReadOf, MAIN_SHA } = __mods['ziwei-words'];
const { stemPortraitOf, godPortraitOf, frameToneOf, relationNotes } = __mods['bazi-words'];
const { bodyLabels, yongshenOf } = __mods.liuyao;

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
    echo: question ? `问题：${question} ｜ 询问方向：${d.label}` : `询问方向：${d.label}`,
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
  const cli = r.climate || (isObj(ys.climate) ? ys.climate : (isObj(ys.tiaohou) ? ys.tiaohou : null));
  const wx = isObj(r.wuxing) ? r.wuxing : {};
  const level = pick(st, 'level', '中和');
  const favor = Array.isArray(ys.favor) ? ys.favor : [];
  const avoid = Array.isArray(ys.avoid) ? ys.avoid : [];
  const primary = pick(frame, 'primaryName', '未取定');
  const gender = pick(r.input, 'gender', '');
  const isMale = gender === 'male';
  const spouseKey = isMale ? '财' : '官杀';

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

  const stemP = stemPortraitOf(dm.stem);
  const topP = godPortraitOf(topName);
  const secondP = godPortraitOf(secondName);
  const season = st.parts && st.parts.season ? st.parts.season : null;
  const dayZhi = pick(r.pillars?.day, 'branch', '');
  const byGodSorted = Object.entries(isObj(frame.godStats?.byGod) ? frame.godStats.byGod : {})
    .filter(([, v]) => Number(v) > 0)
    .sort((a, b) => b[1] - a[1]);
  const topGodName = byGodSorted[0] ? byGodSorted[0][0] : '';
  const topGodP = godPortraitOf(topGodName);
  const favorRolesByWeight = (Array.isArray(ys.favorRoles) ? ys.favorRoles : [])
    .slice()
    .sort((a, b) => (Number(groups[b]) || 0) - (Number(groups[a]) || 0));

  const frameworkText = [
    `**日主**：${dm.stem}${dm.element}（${dm.yinYang}${dm.element}）${season ? `生于${season.branch}月，日主在月令「${season.word}」` : ''}，命局${level}（${pick(st, 'score', '—')} 分）${stemP ? `——${stemP.image}之象` : ''}。`,
    `**用神**：喜${join(favor) || '—'}（${join(ys.favorRoles || []) || '—'}），忌${join(avoid) || '—'}（${join(ys.avoidRoles || []) || '—'}）。${frameToneOf(level, favorRolesByWeight)}`,
    `**格局**：${primary}（${pick(frame.primary, 'evidence', '')}）${(Array.isArray(frame.geju) ? frame.geju : []).filter((g) => g.name && g.name !== primary).length
      ? `，另有${frame.geju.map((g) => g.name).filter((n) => n && n !== primary).join('、')}`
      : ''}。`,
  ].join('\n');

  const portraitText = [
    `**外在取象**：${stemP ? `${stemP.image}的日主，传统取象上${stemP.look}` : '这一柱的取象词库未覆盖'}${stemP ? `；气质上${stemP.temper}` : ''}。这一层只是取象，不作定论。`,
    `**性格底色**：十神里${topName || '—'}最重${top[0] ? `（${top[0][1]}）` : ''}${secondName ? `，${secondName}次之` : ''}。${topP ? `${topP.gift}；${topP.trap}。` : ''}`
      + (topGodP && topGodName && topGodName !== topName ? `具体到单颗，${topGodName}最显，落在「${topGodP.role}」上。` : '')
      + (stemP ? `放在${dm.stem}日主身上，长处是「${stemP.gift}」，容易踩的坑是「${stemP.trap}」。` : ''),
    `**事业与家庭**：${topP ? `做事上${topP.work}` : '做事方式看喜用与时运'}${topP ? `；感情里${topP.love}。` : '。'}日支${dayZhi}${pick(r.pillars?.day, 'zizuo', '') ? `坐${pick(r.pillars?.day, 'zizuo', '')}` : ''}，${Number(groups[spouseKey] || 0) >= 2 ? '配偶星不弱，关系里你有条件被好好对待，也要留意别把这些当成理所当然' : '配偶星偏轻，感情更需要主动经营'}。${secondP ? `另一面是${secondName}的${secondP.role}：${secondP.gift}。` : ''}`,
  ].join('\n');

  const yearLines = (r.liunian || []).slice(0, 3).map((l) => {
    const lk = isObj(l.luck) ? l.luck : {};
    const notes = relationNotes(l.relations);
    const why = (lk.reasons || []).slice(0, 2).join('，');
    return `**${l.year} ${l.ganzhi}**（${l.age}岁·${l.stemTenGod || '—'}）${lk.tier || '平'}：${why || '没有特别信号，按大运的基调走'}${notes.length ? `；与命局的关系——${notes.join('；')}` : ''}。`;
  }).join('\n');
  const yearsText = yearLines
    ? `先看眼前三年（大字是当年干支与十神，后面是该年的档位与理由）：\n${yearLines}\n读法：档位说的是「这一年顺不顺手」，不是「会发生什么」；年份不顺时把重要动作挪到顺的年份，比硬扛更省事。`
    : '流年数据未取到，暂不展开。';

  const adviceItems = [];
  if (favor.length) {
    adviceItems.push(`把生活与工作往${join(favor)}的方向挪一点：${favor.slice(0, 2).map((e) => WUXING_INDUSTRY[e] || '').filter(Boolean).join('；') || '按喜用五行对应的行业挑'}。不必推倒重来，先从环境、圈子和日常习惯改起。`);
  }
  if (avoid.length) {
    adviceItems.push(`对${join(avoid)}保持一点自觉：不是不能碰，而是别在关键决定上给它加码——${avoid.includes('火') ? '少在情绪最热的时候拍板' : avoid.includes('木') ? '少在想法最多的时候开工' : '先把手上的事收尾再谈新的'}。`);
  }
  const relNotes = relationNotes(r.relations && r.relations.branches);
  if (relNotes.length) {
    adviceItems.push(`命局里的地支关系是「${(r.relations.branches || []).join('、')}」：${relNotes.join('；')}。对应到具体人事，先处理情绪，再处理事情。`);
  }
  if (cli && cli.need) {
    adviceItems.push(`调候要${cli.need.stem}${cli.need.element}：${cli.need.why}。落到日常，就是往这一类的环境、作息与节奏上靠。`);
  }
  const adviceText = adviceItems.slice(0, 4).map((t, i) => `${'①②③④'[i]} ${t}`).join('\n');

  const sections = [
    ...(cross.length ? [{ key: 'cross', label: '交叉判断', text: cross.join('　') }] : []),
    { key: 'framework', label: '命局框架', text: frameworkText },
    { key: 'portrait', label: '画像', text: portraitText },
    {
      key: 'reasoning', label: '看盘顺序',
      text: [
        `① 先看月令：${st.parts && st.parts.season ? `${st.parts.season.branch}月，日主${dm.element}${st.parts.season.word}（${st.parts.season.weight}）` : '月令已定'}，得旺衰 ${level}（${pick(st, 'score', '—')} 分）。这一步定的是"你有没有力气"。`,
        `② 再定用神：身强则取泄、耗、制——喜${join(favor)}（${join(ys.favorRoles || [])}），忌${join(avoid)}（${join(ys.avoidRoles || [])}）。这一步定的是"往哪走省力"。`,
        `③ 看格局：主格${primary}${(() => {
          const others = (Array.isArray(frame.geju) ? frame.geju : []).map((g) => g.name).filter((n) => n && n !== primary);
          return others.length ? `，另有${others.join('、')}` : '';
        })()}。格局与前两步同向时可信度更高；冲突时以用神为先。`,
        `④ 看大运：当前${pick(cur, 'ganzhi', '—')}（${curTier}）${ln && ln.year ? `，${ln.year} 年流年${ln.ganzhi}为${lnTier}` : ''}。行运的吉凶不看名字，看它落在喜用还是忌神（下方「时间窗」给了理由）。`,
        `⑤ 落到维度：工作看喜用五行与十神权重；感情看配偶星与日支；健康看最旺与最弱的五行。五维度都只是这套推导的应用，不是另一套算法。`,
      ].join('\n'),
    },
    {
      key: 'timeline', label: '时间窗',
      text: (() => {
        const curSpan = cur && cur.startAge != null ? `${cur.startAge}–${cur.startAge + 9}岁，${curTier}${curLuck.reasons && curLuck.reasons.length ? `；${curLuck.reasons.join('，')}` : ''}` : '—';
        const nextTwo = (ahead || []).slice(0, 2).map((d) => `${d.ganzhi}（${d.startAge}–${d.startAge + 9}岁，${d.luck?.tier || '平'}）`).join(' → ') || '—';
        const years = (r.liunian || []).slice(0, 5).map((l) => {
          const lk = isObj(l.luck) ? l.luck : {};
          const why = (lk.reasons || []).slice(0, 2).join('，');
          return `${l.year} ${l.ganzhi}·${l.stemTenGod || ''}·${lk.tier || '平'}${why ? `（${why}）` : ''}`;
        }).join('；');
        const jiaoLine = r.dayun && r.dayun.jiao && r.dayun.jiao.at
          ? `起运交运时刻 ${r.dayun.jiao.at}（${r.dayun.jiao.frame}；三日折一年，距${r.dayun.jiao.from.name} ${r.dayun.jiao.spanDays} 天）。每步大运在同月同日同时刻换，逐年日期见下方大运表「交运」列。\n`
          : '';
        return `${jiaoLine}当前大运：${pick(cur, 'ganzhi', '—')}（${curSpan}）。后续两步：${nextTwo}。\n近五年流年：${years || '—'}。\n读法：大运管"这十年的大环境"，流年管"今年的具体天气"；两者打架时，以能否动到用神为准。`;
      })(),
    },
    { key: 'years', label: '流年时间轴', text: yearsText },
    { key: 'advice', label: '专业建议', text: adviceText },
    (() => {
      const hits = (r.liunian || []).filter((l) => l.suiyun && Array.isArray(l.suiyun.signals) && l.suiyun.signals.length);
      return {
        key: 'suiyun', label: '岁运提示',
        text: hits.length
          ? hits.map((l) => {
            const stem = (l.suiyun.dayun || []).map((d) => `第${d.step}步${d.ganzhi}`).join('、');
            return `${l.year} ${l.ganzhi}（${stem || '未到起运'}）：${l.suiyun.signals.map((s) => s.detail).join('；')}`;
          }).join('\n') +
            '\n读法：岁运并临、运年反吟与流年伏吟/反吟只说明干支层面重复或对冲，传统上当作「变动感较强」的信号；本插件不据此判吉凶，要落到具体年份，仍看该年是否动到用神。'
          : '近十年没有岁运并临、运年反吟或流年伏吟/反吟。「岁运并临主大凶」这类说法流传很广，本插件只把它当变动提示，没有命中就不作额外解读。',
      };
    })(),
    {
      key: 'checks', label: '交叉校验',
      text: (() => {
        const favorScore = favor.reduce((sum, el) => sum + (Number(wx[el]) || 0), 0);
        const avoidScore = avoid.reduce((sum, el) => sum + (Number(wx[el]) || 0), 0);
        const out = [];
        out.push(favorScore < avoidScore
          ? `喜用合计 ${favorScore.toFixed?.(1) ?? favorScore} 低于忌神合计 ${avoidScore.toFixed?.(1) ?? avoidScore}：原局里"顺风的条件"偏少，靠行运与外部环境补更现实，别硬扛。`
          : `喜用合计 ${favorScore} 不低于忌神合计 ${avoidScore}：原局自带可用的条件，行运只是把它放大或压住。`);
        if (curTier && lnTier) {
          const good = ['吉', '大吉'];
          if (good.includes(curTier) && !good.includes(lnTier)) out.push('大运顺、当年逆：方向可以按大运走，具体动作挑流年的顺月做，不必因为一年不顺就推翻长期计划。');
          else if (!good.includes(curTier) && good.includes(lnTier)) out.push('大运逆、当年顺：今年适合借势处理具体事务，但不宜把长期结构性问题押在这一年解决。');
          else if (!good.includes(curTier) && !good.includes(lnTier)) out.push('大运与流年都偏逆：以守住基本盘为主，减少新增承诺。');
          else out.push('大运与流年同向偏顺：可以把想做但一直拖着的事排上日程。');
        }
        const th = ys.tiaohou && ys.tiaohou.need ? ys.tiaohou : null;
        if (th) {
          out.push(th.clash
            ? `调候要${th.need.stem}${th.need.element}，扶抑不在喜用里：两套取法有分歧，本盘按调候优先——寒暖失衡时，再补强弱也难受。`
            : `调候要${th.need.stem}${th.need.element}，与扶抑用神同向：取用上不打架，${th.need.element}相关的行业与环境优先。`);
        }
        return out.join('　');
      })(),
    },
    {
      key: 'yongshen', label: '用神与忌神',
      text: `喜用：${join(favor)}（对应十神：${join(ys.favorTenGods || ys.favorRoles || [])}）；忌：${join(avoid)}（对应十神：${join(ys.avoidTenGods || ys.avoidRoles || [])}）。` +
        `${pick(ys, 'detail', '')}`,
    },
    ...(cli ? [{
      key: 'climate', label: '寒暖燥湿',
      text: `${cli.narration}${cli.need
        ? `调候取${cli.need.stem}${cli.need.element}，忌${cli.avoidElement}；${cli.clash ? '与扶抑冲突，本盘以调候为先' : '与扶抑同向'}`
        : '气候平和，调候不作主取'}。`,
    }] : []),
    ...(ys.qt ? [{
      key: 'qiongtong', label: '穷通宝鉴',
      text: `${ys.qt.label}：用神 ${ys.qt.yong.join('、')}（首取 ${ys.qt.primary}）。原文：「${ys.qt.quote}」` +
        `（《穷通宝鉴》第 ${ys.qt.chapter} 章${ys.qt.note ? '；' + ys.qt.note : ''}）`,
    }] : []),
    {
      key: 'geju', label: '格局依据',
      text: (Array.isArray(frame.geju) ? frame.geju : []).map((g) => `${g.name}（${g.kind}）：${g.evidence}`).join('；') || '未取到格局',
    },
    ...(Array.isArray(r.classics) && r.classics.length ? [{
      key: 'classics', label: '古籍原文',
      text: r.classics.map((e) => `《${CLASSIC_BOOKS[e.book].name}·${e.chapter}》「${e.quote}」——${e.plain}`).join('\n'),
    }] : []),
    {
      key: 'quant', label: '量化口径',
      text: `本报告的量化只到「档位」：事业看十神权重（${topName} ${top[0]?.[1] ?? '—'}）、财富看财星权重（${groups['财'] ?? 0}）、感情看配偶星权重（${spouseKey} ${groups[spouseKey] ?? 0}）；大运/流年用「大吉 / 吉 / 平 / 忌」四档。不换算金额、不给健康诊断——那需要地域、家庭、行业与体检数据，命盘本身推不出来。`,
    },
    {
      key: 'limits', label: '未纳入',
      text: '本盘没有计算：流月与流日、神煞的加权轻重、地支藏干的动态引化（合冲后再论）。取用按「调候优先、扶抑校验」；调候由月令与全局寒暖燥湿判定，并按《穷通宝鉴》120 格给出用神顺序（整理表口径，原文摘句照录，异文处已标 note）；各派取法仍有分歧；真太阳时未含历史时区与夏令时。把这些补上会改变"强弱"的边际判断，所以这里只给方向，不下断语。',
    },
  ];

  const outline = [
    { key: 'overall', label: '整体', text: `${level}，喜${join(favor) || '—'}、忌${join(avoid) || '—'}` },
    { key: 'career', label: '事业', text: `主格${primary}，${topName}偏旺` },
    { key: 'wealth', label: '财富', text: `财星权重 ${groups['财'] ?? 0}${favor.includes('金') ? '，喜金助财' : ''}` },
    { key: 'love', label: '感情', text: `${spouseKey}星权重 ${groups[spouseKey] ?? 0}，日支 ${pick(r.pillars?.day, 'branch', '—')}` },
    { key: 'rhythm', label: '节奏', text: `当前${pick(cur, 'ganzhi', '—')}（${curTier}），${pick(ln, 'year', '')} ${pick(ln, 'ganzhi', '')}（${lnTier}）` },
  ];
  const tables = [
    {
      key: 'dayun', title: '大运表', columns: ['大运', '年龄', '交运', '十神', '档位', '理由'],
      rows: list.map((d) => [d.ganzhi, `${d.startAge}–${d.startAge + 9}`, d.fromDate || '—', d.stemTenGod || '', d.luck?.tier || '平', (d.luck?.reasons || []).join('，')]),
    },
    {
      key: 'liunian', title: '流年表（近十年）', columns: ['年份', '干支', '十神', '档位', '与原局'],
      rows: (r.liunian || []).slice(0, 10).map((l) => [String(l.year), l.ganzhi, l.stemTenGod || '', l.luck?.tier || '平', (l.relations || []).join('、')]),
    },
  ];
  const triggerRows = (r.liunian || [])
    .filter((l) => Array.isArray(l.relations) && l.relations.length)
    .slice(0, 10)
    .map((l) => [String(l.year), l.relations.join('、'), `流年${l.ganzhi}与原局地支：${l.relations.join('、')}`]);
  if (triggerRows.length) {
    tables.push({ key: 'triggers', title: '触发事件表', columns: ['年份', '触发', '依据'], rows: triggerRows });
  }

  return {
    lead: `下面按五个维度拆开说。所有内容来自你这张命盘的结构，讲的是倾向与建议，不是预言——方向供你参考，怎么走在你自己。`,
    dimensions, sections, outline, tables,
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
  const zwMainSha = (p) => zwSha(p).filter((n) => MAIN_SHA.includes(n));

  const careerStar = zwMainStar(career);
  const wealthStar = zwMainStar(wealth);
  const spouseStar = zwMainStar(spouse);
  const healthStar = zwMainStar(health);

  const mainsOf = (p) => (p?.stars || []).filter((x) => x.type === '主星');
  const brightOf = (p, name) => (p?.stars || []).find((x) => x.name === name)?.brightness || '';
  const pairOf = (p) => starPairOf(mainsOf(p).map((x) => x.name));
  const SX = starExtraOf(soulStar) || {};
  const soulBright = brightRead(brightOf(soul, soulStar));
  const soulPair = pairOf(soul);
  const lightLine = (b, extra) => (extra ? `${b && b.tone === 'bad' ? extra.dim : extra.bright}。` : '');

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
      text: `${soulFrom}${soulBright ? `（${soulBright.word}——${soulBright.plain}）` : ''}，性格底色上${S.trait}。` +
        (soulPair ? `${soulPair.gist}；${soulPair.watch}。` : '') +
        `本盘${patText}。` +
        `当前大限走在${daxianPalace ? `${daxianPalace.palace}（${daxianPalace.daxian.start}–${daxianPalace.daxian.end}岁）` : '当前阶段'}，` +
        `${lnMutagen ? `流年四化为${lnMutagen}，本年的变化感主要落在这几颗星上` : '流年四化信号不明显'}。` +
        (r.flow ? `再往下一层，当前流月命宫是${r.flow.month.ganzhi}，落在原局${r.flow.month.palace || '未上盘'}，本月的变化更容易在这一宫代表的事情上显出来。` : '') +
        (natalSihuaText
          ? `另外你本命的生年四化落在：${natalSihuaText}——这是你这辈子比较稳定的底色，不随某一年改变。`
          : ''),
      advice: (() => {
        const dxName = daxianPalace ? daxianPalace.palace : '命宫';
        const dxField = palaceFieldOf(dxName);
        return `这一阶段的主题更接近「${dxName}」——${dxField ? dxField.field : '这一宫代表的事'}。把它当作这几年的主线，其余安排围着它让路；`
          + `${SX.gift ? `你最顺手的做法是${SX.gift}` : `你的优势在${S.trait}`}，但要留意${SX.watch || '用它用过了头'}。`;
      })(),
      evidence: [
        `命宫 ${soulStar}${soulOwn ? '' : '（借对宫）'}`,
        daxianPalace ? `大限 ${daxianPalace.palace} ${daxianPalace.daxian.start}–${daxianPalace.daxian.end}岁` : '',
        lnMutagen ? `流年四化 ${lnMutagen}` : '',
        `格局 ${patterns.length} 条`,
      ].filter(Boolean),
    },
    {
      key: 'work', label: '工作与职业选择',
      text: (() => {
        const careerBright = brightRead(brightOf(career, careerStar));
        const careerPair = pairOf(career);
        const careerSha = zwMainSha(career);
        return `命宫${soulStar}给你的是底层偏好：${S.work}。`
          + `官禄宫${careerStar
            ? `主星为${careerStar}${careerBright ? `（${careerBright.word}）` : ''}，${ZIWEI_STARS[careerStar]?.work || '有其自身的做事方式'}`
            : '无正曜，工作方式更多受环境与他人影响，适合配合型岗位'}。`
          + (careerPair ? `${careerPair.gist}；要留意${careerPair.watch}。` : '')
          + (careerSha.length ? `官禄宫又见${join(careerSha)}：${shaLineOf(careerSha)}` : '')
          + `两者合起来看，你更适合${careerStar && careerStar !== soulStar ? `用${soulStar}的方式去做${careerStar}擅长的事` : '在稳定的框架里发挥自己的特点'}。`;
      })(),
      advice: `挑工作时可以先看岗位内容是否匹配上面这条；如果暂时不能换，试着在现有岗位里争取靠近这部分的事务——${SX.gift ? `把「${SX.gift}」这类活往自己身上揽，比硬熬更容易做出成绩` : '先做出一件拿得出手的事，比硬熬更容易被看见'}。`,
      evidence: [
        `命宫 ${soulStar}${soulBright ? `·${soulBright.word}` : ''}`,
        `官禄 ${careerStar || '无正曜'}`,
        `财帛 ${wealthStar || '无正曜'}`,
        ...(zwMainSha(career).length ? [`官禄煞星 ${join(zwMainSha(career))}`] : []),
      ],
    },
    {
      key: 'career', label: '事业发展',
      text: (() => {
        const wealthBright = brightRead(brightOf(wealth, wealthStar));
        const wealthPair = pairOf(wealth);
        return `财帛宫${wealthStar
          ? `见${wealthStar}${wealthBright ? `（${wealthBright.word}）` : ''}，${ZIWEI_STARS[wealthStar]?.trait || ''}`
          : '无正曜'}，官禄宫${careerStar || '无正曜'}，`
          + `${wealthStar && careerStar ? '财与事业两宫都有主星坐守，说明这两块是可以主动经营的部分' : '有一宫无主星，说明该块更容易受外部条件牵动，宜借势而非强求'}。`
          + (wealthPair ? `${wealthPair.gist}。` : '')
          + `大限推进上，${daxianPalace ? `目前落在${daxianPalace.palace}，这一宫管${palaceFieldOf(daxianPalace.palace)?.field || '这一段的事'}` : '当前阶段'}，下一步会转入相邻的宫位，重心也会跟着挪。`;
      })(),
      advice: `事业上建议做两件事：一是把可积累的东西（技能、资质、作品）做厚；二是${careerStar ? `发挥${careerStar}的优势——${ZIWEI_STARS[careerStar]?.trait || ''}` : '找一个能带你的前辈或平台'}。遇到四化化忌的年份，先守成再谈扩张。`,
      evidence: [
        `财帛 ${wealthStar || '无正曜'}`,
        `官禄 ${careerStar || '无正曜'}`,
        daxianPalace ? `当前大限 ${daxianPalace.palace}` : '',
      ].filter(Boolean),
    },
    {
      key: 'love', label: '爱情与感情',
      text: (() => {
        const spouseBright = brightRead(brightOf(spouse, spouseStar));
        const spousePair = pairOf(spouse);
        const spouseSha = zwMainSha(spouse);
        return `夫妻宫${spouseStar
          ? `主星为${spouseStar}${spouseBright ? `（${spouseBright.word}）` : ''}，感情上的倾向是${ZIWEI_STARS[spouseStar]?.love || '有自己相处的节奏'}`
          : '无正曜，关系状态更多由对方与互动方式决定'}。`
          + (spousePair ? `${spousePair.gist}。` : '')
          + `${spouseSha.length ? `夫妻宫同时见${join(spouseSha)}：${shaLineOf(spouseSha)}煞星不等于定局，更多是提醒你留意沟通方式。` : '夫妻宫未见明显煞星，关系的基调相对平顺。'}`
          + (SX.watch ? `另外，你自带的${SX.watch}这一面，在亲密关系里最容易被放大。` : '');
      })(),
      advice: `感情里${spouseStar ? `参考${spouseStar}的特点：${ZIWEI_STARS[spouseStar]?.love || ''}` : '可以更主动地表达自己的需求'}。有分歧时先说清事实与感受，别急着下结论；关系的好坏取决于两个人怎么做，不取决于这张盘。`,
      evidence: [
        `夫妻宫 ${spouseStar || '无正曜'}`,
        `煞星 ${join(zwSha(spouse)) || '无'}`,
        `夫妻宫支 ${spouse && spouse.branch ? spouse.branch : '—'}`,
      ],
    },
    {
      key: 'health', label: '健康状况',
      text: (() => {
        const healthBright = brightRead(brightOf(health, healthStar));
        const healthSha = zwMainSha(health);
        return `疾厄宫${healthStar
          ? `见${healthStar}${healthBright ? `（${healthBright.word}）` : ''}，传统取象上${ZIWEI_STARS[healthStar]?.health || '需要留意自身的薄弱环节'}`
          : '无正曜，身体状态更多受生活作息直接影响'}。`
          + (healthSha.length
            ? `同时见${join(healthSha)}，按星情只是「${shaNatureOf(healthSha)}」这一层，提示这一块值得比其他部位多一分留意。`
            : '')
          + '这些都是象征性的提示，不构成任何医学判断。';
      })(),
      advice: `把${healthStar ? ZIWEI_STARS[healthStar]?.health?.replace('留意', '').replace('需要留意', '') || '常规' : '常规'}当作体检时重点关注的参考；真正管用的还是规律作息、适度运动与定期检查。身体不舒服请直接就医。`,
      evidence: [
        `疾厄宫 ${healthStar || '无正曜'}`,
        `煞星 ${join(zwSha(health)) || '无'}`,
      ],
    },
  ];

  const soulField = palaceFieldOf('命宫');
  const bodyLands = pick(r.body, 'lands', '');
  const bodyField = palaceFieldOf(bodyLands);
  const identityText = [
    `命宫落在${soul.branch}（${soul && soul.ganzhi ? soul.ganzhi : '—'}），主星${soulStar}${soulBright ? `·${soulBright.word}` : ''}——这一宫管${soulField ? soulField.field : '你自己'}，${SX.gift ? `你身上最能用出去的是${SX.gift}` : S.trait}。`
      + (SX.gift ? lightLine(soulBright, SX) : ''),
    soulPair ? `${soulPair.gist}；要留意的是${soulPair.watch}。` : '',
    bodyLands ? `身宫寄在${bodyLands}——${bodyField ? `${bodyField.field}是后天更容易使上劲的地方` : '这是后天着力点'}，中年以后会越来越明显。` : '',
    `五行局为${pick(r.bureau, 'name', '—')}，${pick(r.daxian, 'startAge', '—')}岁起运：局定的是节奏（几步起、十年一换），不是好坏。`,
    `命主${pick(r, 'lifeMaster', '—')}、身主${pick(r, 'bodyMaster', '—')}：传统把这两颗当作整张盘的定调星，命主看底色，身主看后半程的着力点。`,
  ].filter(Boolean).join('\n');

  const trimDot = (s) => String(s || '').replace(/。$/, '');
  const palaceLines = (r.palaces || []).map((p) => {
    const mains = mainsOf(p);
    const shas = zwSha(p);
    const fus = (p.stars || []).filter((x) => x.type === '辅星' || x.type === '吉星').map((x) => x.name);
    const huas = (p.stars || []).filter((x) => x.mutagen).map((x) => `${x.name}化${x.mutagen}`);
    const selfs = (p.selfHua || []).map((x) => `自化${x.type}`);
    const head = `【${p.palace}·${p.branch}】`
      + `${mains.length ? mains.map((x) => `${x.name}${x.brightness || ''}`).join('·') : '无正曜'}`
      + (fus.length ? `｜吉 ${fus.slice(0, 3).join('、')}` : '')
      + (shas.length ? `｜煞 ${shas.join('、')}` : '')
      + ((huas.length || selfs.length) ? `｜${[...huas, ...selfs].join('、')}` : '');

    const read = [];
    if (mains.length) {
      const pair = starPairOf(mains.map((x) => x.name));
      const ex = starExtraOf(mains[0].name);
      if (pair) read.push(pair.gist);
      else if (ex) read.push(ex.gift);
    } else {
      const opposite = zwMainStar(zwPalace(r, (p.sanfang || [])[3]));
      read.push(opposite ? `无正曜，借对宫${opposite}来看` : '无正曜，这一宫随环境走');
    }
    if (fus.length) read.push(fuLineOf(fus));
    if (shas.length) read.push(shaLineOf(shas));
    for (const x of (p.stars || []).filter((y) => y.mutagen).slice(0, 2)) read.push(huaInLine(x.mutagen, p.palace));
    const tail = read.filter(Boolean).map(trimDot).join('；');
    return `${head}\n　${tail}。`;
  }).join('\n');
  const palacesText = `十二宫从命宫逆排，每宫管一件事。看一宫不能只看本宫，还要并上它的三方四正（本宫＋对宫＋两个三合宫）——下面先逐宫摊开，再回到整体。\n${palaceLines}`;

  const PATTERN_TIERS = [
    { tone: 'good', label: '有利格局' },
    { tone: 'neutral', label: '结构提示' },
    { tone: 'bad', label: '忌格提醒' },
  ];
  const patternSections = PATTERN_TIERS.map((t) => {
    const list = patterns.filter((p) => (p.tone || 'neutral') === t.tone);
    if (!list.length) return null;
    return {
      key: `pattern-${t.tone}`,
      label: t.label,
      tone: t.tone === 'neutral' ? 'watch' : t.tone,
      text: list.map((p) => {
        const rd = patternReadOf(p.name, p.tone);
        return `**${p.name}**　${rd.gist}\n　依据：${p.evidence}\n　做法：${rd.advice}`;
      }).join('\n'),
    };
  }).filter(Boolean);
  if (!patternSections.length) {
    patternSections.push({ key: 'pattern-none', label: '格局', text: '本盘未触发内置的常见格局条目。这不代表盘面平淡——格局只是把若干星位组合起个名字，没命中时按宫位与四化逐条看即可。' });
  }

  const adviceItems = [];
  if (SX.gift) {
    adviceItems.push(`把「${SX.gift}」做成招牌：${soulBright && soulBright.tone === 'bad'
      ? `${soulStar}在这宫不得地，长处不会自己显出来，越要挑能发挥它的场子`
      : `${soulStar}${soulBright ? `·${soulBright.word}` : '在命宫'}，顺着这条走最省力`}。`);
  }
  if (daxianPalace && daxianPalace.daxian) {
    const dxf = palaceFieldOf(daxianPalace.palace);
    adviceItems.push(`这几年主线在${daxianPalace.palace}（${daxianPalace.daxian.start}–${daxianPalace.daxian.end}岁）：${dxf ? dxf.field : '这一宫的事'}排前面，力气别摊平。`);
  }
  const jiHua = natalSihua.find((m) => m.type === '忌');
  if (jiHua && jiHua.palace) {
    const jf = palaceFieldOf(jiHua.palace);
    adviceItems.push(`生年化忌落在${jiHua.palace}：${jf ? jf.huaJi : '这一块容易反复'}——别硬顶，把预期调低一点反而顺。`);
  }
  const soulSha = zwMainSha(soul);
  if (soulSha.length) adviceItems.push(`命宫见${join(soulSha)}：${shaLineOf(soulSha)}`);
  const spouseSha2 = zwMainSha(spouse);
  if (spouseSha2.length && !soulSha.length) {
    adviceItems.push(`夫妻宫见${join(spouseSha2)}：${shaLineOf(spouseSha2)}`);
  }
  const adviceText = adviceItems.slice(0, 4)
    .map((t, i) => `${'①②③④'[i]} ${trimDot(t)}`)
    .join('\n') || '这张盘的结构比较平，没有单点特别突出——按现有节奏走，把一件事做完整比开新头更划算。';

  const sections = [
    { key: 'identity', label: '命身底色', text: identityText },
    { key: 'palaces', label: '逐宫分析', text: palacesText },
    ...patternSections,
    { key: 'advice', label: '行动建议', text: adviceText },
    {
      key: 'reasoning', label: '看盘顺序',
      text: [
        `① 先看命宫：${soulFrom}${S.trait ? `，底色是「${S.trait}」` : ''}。命宫回答的是"你是谁"，不是"会遇到什么"。`,
        `② 再看三方四正：${(soul && soul.sanfang) ? soul.sanfang.join('、') : '命/财/官/迁'}，会到的主星是${(() => {
          const names = (soul && soul.sanfang ? soul.sanfang : [])
            .map((n) => zwMainStar(zwPalace(r, n)))
            .filter(Boolean);
          const uniq = [...new Set(names)];
          return uniq.length ? uniq.join('、') : '无正曜';
        })()}——这是你与外界打交道时的常用手法。`,
        natalSihuaText ? `③ 生年四化：${natalSihuaText}。四化比星曜更能指出"你在意什么、哪里会反复"。` : '③ 生年四化：本盘四化信号不明显。',
        `④ 大限：${daxianPalace ? `${daxianPalace.palace}（${daxianPalace.daxian.start}–${daxianPalace.daxian.end}岁）` : '当前阶段'}。紫微里大限比流年重：十年的主题定下来，流年只是其中一年的天气。`,
        lnMutagen ? `⑤ 流年四化：${lnMutagen}${r.flow && r.flow.month ? `；流月命宫 ${r.flow.month.ganzhi}${r.flow.month.palace ? `（${r.flow.month.palace}）` : ''}` : ''}。` : '⑤ 流年四化：信号不明显。',
        '⑥ 落到维度：工作看命宫与官禄的配合；感情看夫妻宫与煞星；健康看疾厄宫——五维度都是上面几步的应用。',
      ].join('\n'),
    },
    {
      key: 'timeline', label: '时间窗',
      text: (() => {
        const list = (r.daxianList || []).slice().sort((a, b) => a.ages[0] - b.ages[0]);
        const idx = list.findIndex((d) => Number.isFinite(age) && age >= d.ages[0] && age <= d.ages[1]);
        const pick3 = list.slice(idx >= 0 ? idx : 0, (idx >= 0 ? idx : 0) + 3);
        const dx = pick3.map((d) => `${d.palace} ${d.ages[0]}–${d.ages[1]}岁·会${(d.mainStars || []).join('') || '—'}${(d.mutagenHits || []).length ? `·${d.mutagenHits.map((m) => m.star + m.type).join('')}` : ''}`).join(' → ');
        const yrs = (r.liunian || []).slice(0, 5).map((l) => `${l.year} ${l.ganzhi} ${l.age}岁·命宫${l.lifePalace ? l.lifePalace.palace : '—'}`).join('；');
        return `大限：${dx || '—'}。\n近五年流年：${yrs || '—'}。\n读法：大限定十年的主题，流年四化指出今年往哪边偏；两层方向相反时，以守住大限主题为主。`;
      })(),
    },
    {
      key: 'quant', label: '量化口径',
      text: '紫微这边只数「宫位里有什么」：大限看落宫与四化命中数、流年看命宫与四化星数；不把星曜折算成分数，也不预测金额与疾病诊断。四化命中数只是结构计数，不等于吉凶强度。',
    },
    {
      key: 'limits', label: '未纳入',
      text: '本盘没有计算：小限与大限的加权、流日流时的具体事项定位、双星组合的强弱细分，以及「三方四正一起飞」的复合飞化（这里只跟单一支化逐宫串连）。四化表取中州派常用口径，其他流派（如飞星派）结论会不同；这些不改变盘面事实，只影响轻重，所以只作方向参考。',
    },
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

  {
    const fc = r.flyChains;
    const word = (p) => `${p}${String(p).endsWith('宫') ? '' : '宫'}`;
    if (fc) {
      const chainOf = (t) => {
        const ch = fc[t];
        if (!ch || !ch.steps.length) return `${t}：命宫这一干不化${t}星`;
        const hops = ch.steps
          .map((s) => `${word(s.from)}（${s.fromStem}）化${t}${s.star}→${word(s.to)}（${s.toBranch}）`)
          .join('；');
        return `${t}：${hops}${ch.closed ? `，绕回${word(ch.path[ch.path.length - 1])}成环` : ''}`;
      };
      const selfs = (r.fly || []).flatMap((p) => (p.flies || [])
        .filter((f) => f.self)
        .map((f) => `${word(p.palace)}（${p.stem}）化${f.type}${f.star}落回本宫`));
      const ji = fc.忌;
      const jiRead = ji && ji.steps.length
        ? `忌这一条最值得盯：${word(ji.from)}化忌入${word(ji.steps[0].to)}，${word(ji.steps[0].to)}的宫干再化忌往下一宫去，${ji.closed ? `最后绕回${word(ji.path[ji.path.length - 1])}` : '走到没有可落的星就停下'}——` +
          `这条线就是你反复着力的那一圈，` +
          `${ji.closed ? '环越短越容易在同一组宫位上打转（传统说「忌出不去」）' : '没成环表示这条力还有落点没走完'}。`
        : '命宫这一干化忌未上盘，忌线不成立。';
      sections.push({
        key: 'fly', label: '四化飞星',
        text: `生年四化说的是「一出场就带着什么」，飞星四化说的是「这一宫自己会去找谁」：宫干定出四颗化星，星落到哪一宫，这一宫的力就往哪边使。` +
          `从命宫出发，四条线各串一遍——${chainOf('禄')}；${chainOf('权')}；${chainOf('科')}；${chainOf('忌')}。` +
          `${jiRead}` +
          `另外，四化落回本宫的是自化：${selfs.length ? selfs.join('、') + '——自己化出去又回到自己，常表现为「说得多、落得少」或一阵一阵的劲头' : '本盘没有自化'}。` +
          `这一层只描方向与牵引，不断吉凶：同样是化忌入某宫，落在生年忌上还是落在生年禄上，味道完全不同，得并着生年四化看。`,
      });
    }
  }

  {
    const fc = r.flyComposite;
    const word = (p) => `${p}${String(p).endsWith('宫') ? '' : '宫'}`;
    if (fc && Array.isArray(fc.sources) && fc.sources.length >= 2) {
      const hubs = fc.targets.filter((t) => t.count >= 2);
      const hubText = hubs.length
        ? hubs.slice(0, 5).map((t) => `${word(t.palace)}收了 ${t.incoming.map((x) => `${word(x.from)}化${x.type}${x.star}`).join('、')}`).join('；')
        : '四宫化出去之后没有落在同一宫，力是散开的';
      const readings = [];
      if (fc.groups.doubleJi.length) {
        readings.push(`${fc.groups.doubleJi.map((t) => word(t.palace)).join('、')}收到两个以上的忌——同一件事被反复牵动，传统看作那一宫的事务容易拖着不放`);
      }
      if (fc.groups.luJi.length) {
        readings.push(`${fc.groups.luJi.map((t) => word(t.palace)).join('、')}禄忌同宫：好处与在意的地方绑在一起，越想要的东西越容易反复`);
      }
      if (fc.groups.tripleHua.length) {
        readings.push(`${fc.groups.tripleHua.map((t) => word(t.palace)).join('、')}三化以上会宫：那一宫同时被几种力牵住，常常是这张盘最忙的地方`);
      }
      if (fc.groups.selfHua.length) {
        readings.push(`${fc.groups.selfHua.map((t) => word(t.palace)).join('、')}自化：宫干化出去又落回自己，表现为力气绕回原处`);
      }
      sections.push({
        key: 'flyComposite',
        label: '三方四正飞化',
        text: `上一节是命宫一条线往下追；这一节把命宫连同对宫与两个三合宫（${fc.sanfang.join('、')}）一起飞：四宫各化禄权科忌，共 16 条飞化（星未上盘的只记星不记落宫），按落宫归堆。` +
          `${hubText}。` +
          `${readings.length ? `${readings.join('；')}。` : ''}` +
          `读法上，会在一处的化越多，那一宫被牵动的力道越集中；落单的飞化只说明方向，不单独取象。这一层同样只描会照与方向，不折吉凶，也没有叠大限与流年四化。`,
      });
    }
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

  const outline = [
    { key: 'overall', label: '整体', text: `命宫${soulStar}${soulOwn ? '' : '（借对宫）'}${S.trait ? `，${S.trait}` : ''}` },
    { key: 'career', label: '事业', text: `官禄${careerStar || '无正曜'}` },
    { key: 'wealth', label: '财富', text: `财帛${wealthStar || '无正曜'}` },
    { key: 'love', label: '感情', text: `夫妻${spouseStar || '无正曜'}` },
    {
      key: 'rhythm', label: '节奏',
      text: daxianPalace && daxianPalace.daxian
        ? `当前大限${daxianPalace.palace}（${daxianPalace.daxian.start}–${daxianPalace.daxian.end}岁）${r.liunian?.[0]?.year ? `，${r.liunian[0].year} 流年` : ''}`
        : '当前大限未取到',
    },
  ];
  const daxianSorted = (r.daxianList || []).slice().sort((a, b) => a.ages[0] - b.ages[0]);
  const tables = [
    {
      key: 'daxian', title: '大限表', columns: ['大限', '年龄', '会主星', '四化'],
      rows: daxianSorted.map((d) => [
        d.palace,
        `${d.ages[0]}–${d.ages[1]}`,
        (d.mainStars || []).join('、'),
        (d.mutagenHits || []).map((m) => `${m.star}${m.type}→${m.palace}`).join('、'),
      ]),
    },
    {
      key: 'liunian', title: '流年表（近六年）', columns: ['年份', '干支', '年龄', '命宫', '四化'],
      rows: (r.liunian || []).slice(0, 6).map((l) => [
        String(l.year),
        l.ganzhi,
        String(l.age),
        l.lifePalace ? l.lifePalace.palace : '—',
        (l.mutagen || []).join('、'),
      ]),
    },
  ];
  const triggerRows = daxianSorted
    .flatMap((d) => (d.mutagenHits || []).map((m) => [
      `${d.palace}（${d.ages[0]}–${d.ages[1]}岁）`,
      `${m.star}化${m.type}→${m.palace}`,
      `大限${d.palace}引动`,
    ]))
    .slice(0, 12);
  if (triggerRows.length) {
    tables.push({ key: 'triggers', title: '触发事件表（大限四化）', columns: ['大限', '触发', '依据'], rows: triggerRows });
  }

  return {
    lead: `紫微斗数看的是你与环境的互动方式。下面按五个维度拆开，讲的是性格与处境的倾向，具体怎么选仍然在你。`,
    dimensions, sections, outline, tables,
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

function liuyaoInterpret(r, ask) {
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
  const bd = isObj(r.body) ? r.body : {};
  const bodyLabelList = (bd && Array.isArray(bd.labels)) ? bd.labels : bodyLabels(bd);
  const cnt = (k) => lines.filter((l) => l.liuqin === k).length;
  const lineEv = (l) => (l ? `${l.position}爻${l.liuqin}${l.liushen ? '·' + l.liushen : ''}${l.moving ? '（动）' : ''}` : '—');
  const ev = (...xs) => xs.filter((x) => x != null && x !== '');

  sections.push({
    key: 'liuqin', label: '六亲取用',
    text: `这一卦里，${movingLiuqin ? `动爻落在${movingLiuqin}（${LIUQIN_USE[movingLiuqin] || ''}）` : '没有发动的六亲'}。` +
      `如果你心里有具体问题，可以对号入座：${Object.entries(LIUQIN_USE).map(([k, v]) => `${k}主${v.split('，')[0]}`).join('；')}。`,
  });

  sections.push({
    key: 'reasoning', label: '看卦顺序',
    text: [
      `① 先定卦宫：本卦「${ben.name || '—'}」属${String(pick(ben, 'palace', '—')).replace(/宫$/, '')}宫（${palaceEl || '—'}），六亲由此排定——宫变了，同一个字的六亲就变了。`,
      `② 再看世应：世在${ben.shi}爻（${shiLine ? `${shiLine.liuqin}${shiLine.liushen ? `·${shiLine.liushen}` : ''}` : '—'}），应在${ben.ying}爻（${yingLine ? `${yingLine.liuqin}` : '—'}）；世代表你，应代表对方与环境。`,
      `③ 看动爻：${moving ? `${moving.position}爻${moving.liuqin}${moving.liushen ? `（${moving.liushen}）` : ''}发动，事情的变化点在这里` : '六爻安静，短期不会有大的转折'}。`,
      `④ 定用神：按所问之事取六亲——问工作看官鬼、文书看父母、求财与感情（男）看妻财、健康看官鬼与子孙；用神不上卦时，看伏神或借日月。`,
      `⑤ 看日辰：${dayGZ || '—'}日起六神、定旬空；日辰能生克动爻，但不被爻所伤。`,
      `⑥ 看变卦：${bian.name ? `变出「${bian.name}」，是事情后续的走向` : '本卦无变，以静卦论'}。以上每一步都能在下方「依据」里对上号。`,
    ].join('\n'),
  });
  if (bodyLabelList.length) {
    const sideOf = (o) => [o && o.inner ? '内卦' : '', o && o.outer ? '外卦' : ''].filter(Boolean).join('、');
    const fanYinSides = sideOf(bd.fanYin || {});
    const fanYinBy = ['inner', 'outer'].map((k) => bd.fanYin && bd.fanYin[k] && bd.fanYin[k].by).filter(Boolean).flat();
    const bodyText = [];
    if (bd.ben && bd.ben.chong) bodyText.push('本卦是六冲卦：六爻地支正好配成子午、寅申、辰戌三组对冲，传统读作「散」——事情起落快、成得急也散得急，急事与近病反而喜欢这股冲开的力量，拖了很久的人事则不容易凝聚。');
    if (bd.ben && bd.ben.he) bodyText.push('本卦是六合卦：六爻地支两两相合（子丑、寅亥、卯戌、辰酉、巳申、午未），传统读作「成」——容易谈拢，也容易拖住不放。');
    if (bd.bian && bd.bian.chong) bodyText.push('变卦也是六冲：往后走偏「散」，收尾容易一拍两散，也可能是速战速决。');
    else if (bd.bian && bd.bian.he) bodyText.push('变卦是六合：往后走偏「合」，收尾倾向于合拢、或者就这么延续下去。');
    if (sideOf(bd.fuYin || {})) bodyText.push(`${sideOf(bd.fuYin || {})}伏吟：卦变了，纳甲地支却没变（六十四卦里只有乾与震共用子寅辰/午申戌，所以卦伏吟只会出在乾↔震互换）——传统说「伏吟主呻吟」，人想动、事情在原地打转，宜先看清楚再迈步。`);
    if (fanYinSides) bodyText.push(`${fanYinSides}反吟：变卦与本卦相冲，来源有两种——${fanYinBy.includes('chong') ? '地支三爻全冲' : ''}${fanYinBy.includes('chong') && fanYinBy.includes('pair') ? '，或' : ''}${fanYinBy.includes('pair') ? '本卦之宫与变卦之宫在后天八卦上正对（乾巽、坎离、艮坤、震兑）' : ''}。传统说「反吟主反复」，去而复来、方案改来改去。`);
    if (bd.yaoFanYin && bd.yaoFanYin.length) bodyText.push(`动爻反吟（第${bd.yaoFanYin.join('、')}爻）：变出的地支回头冲本爻，变化点本身在反复——动了又翻回来，等于绕一圈回到原处。`);
    if (bd.yaoFuYin && bd.yaoFuYin.length) bodyText.push(`动爻伏吟（第${bd.yaoFuYin.join('、')}爻）：变出的地支与本爻同支，动了等于没动，想推的事会卡在同一道坎上。`);
    const jinYao = (bd.jinTui || []).filter((x) => x.type === '进');
    const tuiYao = (bd.jinTui || []).filter((x) => x.type === '退');
    if (jinYao.length) bodyText.push(`化进神（第${jinYao.map((x) => x.position).join('、')}爻：${jinYao.map((x) => `${x.from}→${x.to}`).join('、')}）：变出的地支与本爻同五行、且顺着往前一步，传统读作「进」——这一爻代表的人或事有后劲，往前走比退回去顺。`);
    if (tuiYao.length) bodyText.push(`化退神（第${tuiYao.map((x) => x.position).join('、')}爻：${tuiYao.map((x) => `${x.from}→${x.to}`).join('、')}）：变出的地支与本爻同五行、却倒着退一步，传统读作「退」——这一爻代表的人或事渐渐退气，别按原来的势头去推。`);
    const jp = r.jinTuiPower;
    if (jp && Array.isArray(jp.lines) && jp.lines.length) {
      bodyText.push(`进退的力重（放回月建日辰看）：${jp.lines.map((l) => `第${l.position}爻${l.say}`).join('；')}。进退只管方向，走不走得动看时令托不托着；用神化进为喜，忌神化进反而是忌。`);
    }
    bodyText.push('这些标签只说明卦体的动势，不直接定吉凶：同一支六冲，近病问的是速愈、久病问的是凶险；同一爻化进，也得看用神旺不旺、有没有月建日辰托着。');
    sections.push({ key: 'body', label: '卦体关系', text: bodyText.join('\n') });
  }

  const ug = yongshenOf(r, {
    direction: (ask && ask.direction) || (r.useGod && r.useGod.direction) || 'general',
    gender: (r.useGod && r.useGod.gender) || 'male',
  });
  if (ug && ug.liuqin) {
    const useText = [];
    useText.push(`所问方向取${ug.byShi ? '世爻' : ug.liuqin}为用神（${ug.ask}）${ug.direction === 'love' ? `；感情按${ug.gender === 'female' ? '女命看官鬼' : '男命看妻财'}取，性别未给时按男命算` : ''}。`);
    if (ug.found.length) {
      useText.push(`用神在卦上：${ug.found.map((f) => `${f.position}爻${f.ganzhi}${f.element}${f.liuqin}${f.liushen ? `·${f.liushen}` : ''}${f.shi ? '（持世）' : ''}${f.ying ? '（临应）' : ''}${f.moving ? '（发动）' : ''}${f.kong ? '（旬空）' : ''}`).join('、')}${ug.side ? `，落在${ug.side}` : ''}。`);
      if (ug.found.length > 1) useText.push('用神两现：传统取动者、取持世者、取旬空待填者，各派权重不同；这里只把几处都列出来，不替你选哪一爻当主用。');
    } else if (ug.fushen.length) {
      useText.push(`用神不上卦：本卦六爻里没有${ug.liuqin}，按「用神不上卦则于本宫首卦内寻之」，到${String(pick(ben, 'palace', '')).replace(/宫$/, '')}宫首卦取伏神——${ug.fushen.map((f) => `${f.position}爻${f.ganzhi}${f.element}，伏于飞神${f.fei ? `${f.fei.liuqin}${f.fei.ganzhi}${f.fei.element}` : '—'}之下`).join('；')}。`);
      if (ug.relationSay.length) useText.push(`飞伏生克：${ug.relationSay.join('；')}。伏神要得出才算有力，藏在忌神之下且被克，则虽有如无。`);
      const chufu = r.fushenAccess;
      if (chufu && Array.isArray(chufu.items) && chufu.items.length) {
        useText.push(`伏神出伏的条件：${chufu.items.map((f) => f.say).join('；')}。`);
        useText.push('「助」与「压」只把飞伏生克、月建日辰与月破并列摆出，再归成四档（可出 / 有助有压 / 受压难出 / 未得助）；不排各家优先级，旬空只标出、不并入档位，也不给应期日期。');
      }
    } else {
      useText.push(`用神不上卦，且本宫首卦里也没找到${ug.liuqin}，这一问在卦面上没有直接对应物，只能借日月或改日再占。`);
    }

    const link = [];
    if (bd.ben && bd.ben.chong) link.push('用神在六冲卦里：六冲主散，急事与近病借这股冲开的力量，缓事、久拖的人事则不容易凝聚');
    if (bd.ben && bd.ben.he) link.push('用神在六合卦里：六合主成，容易谈拢，也容易黏住不放');
    if (bd.bian && bd.bian.chong) link.push('用神逢变六冲：往后走向偏散，收尾容易一拍两散，也可能是速战速决');
    else if (bd.bian && bd.bian.he) link.push('用神逢变六合：往后走向偏合，倾向于合拢或就这么延续');
    for (const side of ['inner', 'outer']) {
      const nm = side === 'inner' ? '内卦' : '外卦';
      if (bd.fuYin && bd.fuYin[side]) link.push(`用神在${nm}伏吟：动而地支未变，想推的事卡在原地`);
      if (bd.fanYin && bd.fanYin[side]) link.push(`用神在${nm}反吟：变卦与本卦相冲，用神这一头去而复来、定了又改`);
    }
    const jinYong = (bd.jinTui || []).filter((x) => x.type === '进' && ug.found.some((f) => f.position === x.position));
    const tuiYong = (bd.jinTui || []).filter((x) => x.type === '退' && ug.found.some((f) => f.position === x.position));
    if (jinYong.length) link.push(`用神化进神（${jinYong.map((x) => `${x.from}→${x.to}`).join('、')}）：这一爻有后劲，顺着推比退回去顺`);
    if (tuiYong.length) link.push(`用神化退神（${tuiYong.map((x) => `${x.from}→${x.to}`).join('、')}）：这一爻渐渐退气，别按原来的势头硬推`);
    if (ug.found.some((f) => f.kong)) link.push('用神旬空：事情先悬着，传统说空要出空、填实才算落地');
    if (ug.found.some((f) => (bd.yaoFanYin || []).includes(f.position))) link.push('用神这一爻动而反吟：变化点本身在反复，动了又翻回来');
    if (ug.found.some((f) => (bd.yaoFuYin || []).includes(f.position))) link.push('用神这一爻动而伏吟：动了等于没动，容易卡在同一道坎上');
    if (link.length) useText.push(`与卦体对起来看：${link.join('；')}。`);
    const strength = r.useGodStrength;
    if (strength && strength.lines && strength.lines.length) {
      const head = strength.month && strength.month.branch
        ? `月建 ${strength.month.branch}（${strength.month.element}）`
        : '没有月建（未给起卦时间），只按日辰看';
      const body = strength.lines.map((l) => {
        const chong = l.monthChong ? '，遭月建冲（月破）'
          : l.dayChong ? (l.kong ? '，日辰冲空' : l.moving ? '，逢日辰冲' : '，日辰冲而暗动') : '';
        return `${l.position}爻${l.branch}${l.element}：月建${l.monthState}（${l.monthSay}），${l.dayRelation}（${l.daySay}）${chong}`;
      });
      useText.push(`时令对用神：${head}，日辰 ${strength.day ? `${strength.day.branch}（${strength.day.element}）` : '—'}。${body.join('；')}。`);
      useText.push('月建看这一段时令站在哪一边，日辰看当天那股力量是扶还是克；两处同时看，只报状态，不折成分数。');
    }
    useText.push('这一层只把用神、卦体与时令对起来，应期与成败还要看动爻变化与月建日辰的进退节奏，所以这里不折成分数、不断成败。');
    sections.push({ key: 'yongshen', label: '用神落位与卦体', text: useText.join('\n') });
  }

  {
    const hs = r.hexStrength;
    if (hs && Array.isArray(hs.lines) && hs.lines.length) {
      const head = hs.month && hs.month.branch
        ? `月建 ${hs.month.branch}（${hs.month.element}）`
        : '没有月建（未给起卦时间）';
      const day = hs.day && hs.day.branch ? `日辰 ${hs.day.branch}（${hs.day.element}）` : '日辰 —';
      const rows = hs.lines.map((l) => {
        const who = l.shi ? '（世）' : l.ying ? '（应）' : '';
        const flags = `${l.moving ? '·动' : ''}${l.kong ? '·旬空' : ''}`;
        return `${l.position}爻${l.liuqin ? l.liuqin : ''}${l.branch}${l.element}${who}${flags}：月建${l.monthState}，${l.dayRelation}${l.chongTag ? `，${l.chongTag}` : ''}`;
      });
      const order = ['旺', '相', '休', '囚', '死'];
      const dist = order.filter((k) => hs.counts[k]).map((k) => `${k}${hs.counts[k]}`).join('、');
      const shi = hs.shi ? `世爻在${hs.shi.position}爻（月建${hs.shi.monthState}，${hs.shi.dayRelation}）` : '';
      const ying = hs.ying ? `应爻在${hs.ying.position}爻（月建${hs.ying.monthState}，${hs.ying.dayRelation}）` : '';
      sections.push({
        key: 'hexStrength',
        label: '全卦逐爻旺衰',
        text: `整张卦按${head}、${day}逐爻过一遍：${rows.join('；')}。五态分布：${dist}——${[shi, ying].filter(Boolean).join('，')}。` +
          `气旺的爻对应的事推进起来省力，气弱或遭月破的爻对应的事宜缓；这只是六爻全貌，用神那几爻的细节仍以上一节为准，两处不冲突时再看动爻把哪一头带动。` +
          `判定与用神旺衰同一套（月令五态、日辰五关系、月破/暗动/冲空），只报状态，不折成分数。`,
      });
    }
  }

  sections.push({
    key: 'limits', label: '未纳入',
    text: '本卦没有计算：用神两现时该取哪一爻的权重、伏神出伏的应期（出伏条件已判，应期仍未做）。化进/化退的力重只按月建五态给「得令/失令」这类档位，不折成加权分数，也不叠动变连环；这些都会改变"旺不旺"的判断，所以这里只给取象与方向。',
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
        bodyLabelList.length ? `卦体 ${bodyLabelList.join('、')}` : '卦体 无六冲六合伏吟反吟',
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
  const chuQin = pick(chu, 'liuQin', '');
  const moQin = pick(mo, 'liuQin', '');
  const hasKong = !!(chu.xunKong || zhong.xunKong || mo.xunKong);
  const scText = JSON.stringify(sc);
  const has = (x) => scText.includes(x);
  const chuan = `初${pick(chu, 'zhi', '—')} → 中${pick(zhong, 'zhi', '—')} → 末${pick(mo, 'zhi', '—')}`;

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
    {
      key: 'reasoning', label: '看课顺序',
      text: [
        `① 先看月将加时：月将${pick(r.yueJiang, 'name', '—')}${pick(r.yueJiang, 'zhi', '')}加在${pick(r, 'hourZhi', '—')}时上，定出天地盘——后面所有关系都从这张盘推。`,
        `② 再看四课：日干寄宫起一课，日支起二课，依次得三、四课；四课是"事情的四个面"。`,
        `③ 看三传：初传${pick(chu, 'zhi', '—')}（${chuQin || '—'}）起，中传${pick(zhong, 'zhi', '—')}（${pick(zhong, 'liuQin', '—')}），末传${pick(mo, 'zhi', '—')}（${moQin || '—'}）落——发端、过程、结局。`,
        `④ 定课体：${pick(gj, 'name', '未定')}${gj.detail ? `（${gj.detail}）` : ''}；课体决定这件事"以什么方式"推进，不是吉凶标签。`,
        `⑤ 看神将：月将、贵人与旬空决定信号强弱；旬空处多为"看着有、实则虚"，须核实。`,
        '⑥ 落到维度：工作看官鬼与青龙、朱雀；感情看六合、天后与妻财；健康看白虎与子孙——都是上面几步的应用。',
      ].join('\n'),
    },
    {
      key: 'limits', label: '未纳入',
      text: '本课没有计算：年命与行年（命上神）、神煞的加权轻重、伏吟反吟的细分，以及课体之间的互涉。三传只取九宗门里的主要取法，其他流派（如以贵神起课）结论可能不同；这些只影响轻重，不改变课面事实。',
    },
  ];

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
const { buildAnswer, buildPlain, buildGlossary, buildFollowups, dimensionPlain } = __mods['interpret-plain'];
const { knowledgeFor, caveatsFor, STATUS_LABEL } = __mods['interpret-knowledge'];
const { CLASSIC_BOOKS } = __mods.classics;

function enrichPlain(result, r, ask) {
  if (!result) return result;
  const DIM_RANK = ['overall', 'work', 'career', 'love', 'health'];
  const rankOf = (key) => { const i = DIM_RANK.indexOf(key); return i < 0 ? DIM_RANK.length : i; };
  const seen = new Set();
  const dims = (result.dimensions || []).map((d) => {
    const p = dimensionPlain(d.key, r, {});
    return { ...d, ...(p ? { plain: p } : {}) };
  });
  const KNOW_PER_DIM = 3;
  for (const d of dims.slice().sort((a, b) => rankOf(a.key) - rankOf(b.key))) {
    const know = knowledgeFor(r.system, d.key)
      .filter((k) => !seen.has(k.id))
      .slice(0, KNOW_PER_DIM)
      .map((k) => ({
        id: k.id,
        gist: k.gist,
        detail: k.detail,
        source: k.source,
        status: k.status,
        statusLabel: STATUS_LABEL[k.status] || k.status,
        note: k.note || '',
      }));
    for (const k of know) seen.add(k.id);
    if (know.length) d.knowledge = know;
  }
  const texts = [
    result.lead,
    ...dims.map((d) => [d.label, d.text, d.advice, d.plain, ...(d.knowledge || []).map((k) => k.detail)].filter(Boolean).join('')),
    ...(result.sections || []).map((x) => x.text),
  ].filter(Boolean);

  const caveats = caveatsFor(r.system);
  const disputed = caveats.filter((k) => k.status !== 'todo');
  const caveatLine = disputed.length
    ? disputed.map((k) => {
      const tag = STATUS_LABEL[k.status] || k.status;
      return `· ${k.gist}（${tag}）${seen.has(k.id) || !k.note ? '' : `——${k.note}`}`;
    }).join('\n')
    : '';
  const secs = [...(result.sections || [])];
  if (caveatLine) {
    secs.push({
      key: 'caveats',
      label: '这套规则有多稳',
      text: `下列几条各家说法不一，本插件取其中一派并把分歧标出来，供你判断可信度（已在上面展开的只列条目，未展开的附原注）：\n${caveatLine}`,
    });
  }
  const todos = caveats.filter((k) => k.status === 'todo');
  if (todos.length) {
    secs.push({
      key: 'todo',
      label: '尚未实现（不猜）',
      text: todos.map((k) => `· ${k.gist}${k.note ? `——${k.note}` : ''}`).join('\n'),
    });
  }

  return {
    ...result,
    dimensions: dims,
    sections: secs,
    answer: result.answer || buildAnswer(r, ask, {}),
    plain: result.plain || buildPlain(r, ask, {}),
    followups: buildFollowups(r, ask),
    glossary: buildGlossary(texts, r.system),
    knowledgeCount: dims.reduce((n, d) => n + ((d.knowledge || []).length), 0),
    caveats: caveats.map((k) => ({ id: k.id, gist: k.gist, status: k.status, statusLabel: STATUS_LABEL[k.status] || k.status })),
  };
}

const TECHNIQUE = {
  bazi: '八字（月令 · 十神 · 大运流年）',
  ziwei: '紫微（宫位 · 四化 · 大限流年）',
  liuyao: '六爻（卦宫 · 世应 · 动爻 · 日辰）',
  meihua: '梅花（体用 · 互卦 · 变卦）',
  daliuren: '六壬（月将加时 · 四课 · 三传）',
  qimen: '奇门（九宫 · 值符值使 · 用神）',
  tarot: '塔罗（牌阵 · 正逆位 · 元素）',
  hepan: '合盘（日主 · 夫妻宫 · 五行互补）',
};

const confidenceOf = (dim) => {
  const n = Array.isArray(dim && dim.evidence) ? dim.evidence.length : 0;
  return n >= 3 ? '强' : n >= 2 ? '中' : '弱';
};

const withReportMeta = (body, r, ask) => enrichPlain({
  ...body,
  moduleType: MODULE_TYPE[r.system] || 'natal',
  system: r.system,
  systemLabel: SYSTEM_LABEL[r.system] || r.system,
  title: '解析与详解',
  dimensions: (body.dimensions || []).map((d) => ({ ...d, confidence: d.confidence || confidenceOf(d) })),
  sections: body.sections || [],
  outline: body.outline || [],
  tables: body.tables || [],
  technique: TECHNIQUE[r.system] || SYSTEM_LABEL[r.system] || r.system,
  disclaimer: body.disclaimer || DISCLAIMER,
  ask,
}, r, ask);

function interpret(r, opts) {
  if (!isObj(r) || !r.system) return null;
  const ask = askOf(opts);
  if (r.system === 'qimen') return withReportMeta(interpretQimen(r, opts), r, ask);
  const fn = BUILDERS[r.system];
  if (!fn) return null;
  let body;
  try {
    body = fn(r, ask);
  } catch (e) {
    return {
      moduleType: MODULE_TYPE[r.system] || 'natal',
      system: r.system,
      systemLabel: SYSTEM_LABEL[r.system] || r.system,
      title: '解析与详解',
      lead: '这一盘的解析暂未生成，请稍后重试。',
      dimensions: [],
      sections: [],
      outline: [],
      tables: [],
      technique: TECHNIQUE[r.system] || '',
      disclaimer: DISCLAIMER,
      error: String(e && e.message),
      ask,
    };
  }
  const tuned = applyAsk(body.dimensions || [], ask, body.lead || '');
  return withReportMeta({
    lead: tuned.lead,
    dimensions: tuned.dims,
    sections: body.sections || [],
    outline: body.outline || [],
    tables: body.tables || [],
  }, r, ask);
}

return { DIMENSIONS, MODULE_TYPE, SYSTEM_LABEL, DIRECTIONS, DIRECTION_DEFAULT, dirOf, hexInfo, interpret };
})();

__mods.followup = (function () {
const { ZIWEI_STARS } = __mods['interpret-data'];

const TOPICS = [
  { key: 'career', label: '事业', words: ['事业', '工作', '跳槽', '升职', '创业', '职业', '岗位', '离职', '加薪', '面试', 'offer'] },
  { key: 'wealth', label: '财富', words: ['财', '钱', '收入', '投资', '买房', '存款', '亏', '赚', '分红'] },
  { key: 'love', label: '感情', words: ['感情', '婚', '恋', '对象', '分手', '复合', '姻缘', '结婚', '桃花'] },
  { key: 'health', label: '健康', words: ['健康', '病', '身体', '手术', '失眠', '体检', '医院'] },
  { key: 'study', label: '学业', words: ['学业', '考试', '学习', '考研', '考公', '证书', '升学'] },
  { key: 'travel', label: '出行', words: ['出行', '搬家', '旅行', '出国', '迁', '远行'] },
];

const ZW_PALACE_BY_TOPIC = { career: '官禄', wealth: '财帛', love: '夫妻', health: '疾厄', study: '官禄', travel: '迁移', overall: '命宫' };

const parseYear = (q, r) => {
  const m = String(q).match(/(20\d{2})\s*年?/);
  if (m) return Number(m[1]);
  const base = Array.isArray(r.liunian) && r.liunian[0] ? Number(r.liunian[0].year) : null;
  if (!base) return null;
  if (/明年/.test(q)) return base + 1;
  if (/后年/.test(q)) return base + 2;
  if (/去年/.test(q)) return base - 1;
  if (/今年|本年/.test(q)) return base;
  return null;
};

const topicOf = (q) => TOPICS.find((t) => t.words.some((w) => String(q).includes(w))) || null;

function baziAnswer(r, q) {
  const year = parseYear(q, r);
  const topic = topicOf(q);
  const liunian = Array.isArray(r.liunian) ? r.liunian : [];
  const dayun = Array.isArray(r.dayun?.list) ? r.dayun.list : [];
  const years = liunian.map((l) => l.year);
  if (year && !liunian.some((l) => Number(l.year) === year)) {
    return {
      ok: false, year, topic,
      answer: `这一盘已排的流年范围是 ${years[0]}–${years[years.length - 1]}，没有 ${year} 年。可以把问题改到范围内，或用 asOf 指定你想看的年份重新排盘。`,
      evidence: [`已排流年：${years.join('、')}`], confidence: '弱',
    };
  }
  if (year) {
    const l = liunian.find((x) => Number(x.year) === year);
    const d = dayun.find((x) => Number(x.startAge) <= Number(l.age) && Number(l.age) <= Number(x.startAge) + 9) || null;
    const tier = l.luck?.tier || '平';
    const reasons = (l.luck?.reasons || []).slice(0, 3);
    const rel = (l.relations || []).join('、');
    const topicLine = topic ? topicSentence(r, topic.key) : '';
    return {
      ok: true, year, topic,
      answer: `${year} 年（${l.ganzhi}）流年，十神为${l.stemTenGod || '—'}，档位「${tier}」；所行大运 ${d ? `${d.ganzhi}（${d.luck?.tier || '平'}）` : '未取到'}。` +
        `${reasons.length ? `理由：${reasons.join('，')}。` : ''}${rel ? `与该年地支相关的原局关系：${rel}。` : ''}${topicLine}`,
      evidence: [
        `流年 ${l.year} ${l.ganzhi}·${l.stemTenGod || ''}·${tier}`,
        d ? `大运 ${d.ganzhi}·${d.luck?.tier || '平'}` : '',
        rel ? `原局关系 ${rel}` : '',
        topic ? `问题方向：${topic.label}` : '',
      ].filter(Boolean),
      confidence: d && reasons.length ? '强' : '中',
    };
  }
  if (topic) {
    const near = { wealth: 'overall', study: 'work', travel: 'overall' }[topic.key] || topic.key;
    const dim = (r.interpret?.dimensions || []).find((x) => x.key === topic.key || x.key === near);
    if (dim) {
      const groups = (r.frame && r.frame.godStats && r.frame.godStats.groups) || {};
      const quant = topic.key === 'wealth'
        ? ` 财星权重 ${Number(groups['财'] || 0)}（只作结构参考，不含金额）。`
        : '';
      return {
        ok: true, year: null, topic,
        answer: `按${topic.label}这条线看：${dim.text}${quant}${dim.advice ? ` 建议：${dim.advice}` : ''}`,
        evidence: (dim.evidence || []).slice(0, 4), confidence: dim.confidence || '中',
      };
    }
  }
  return {
    ok: false, year: null, topic,
    answer: `这个问题里没有识别到具体的年份或方面。可以这样问：「2027 年事业怎么样」「财运如何」「感情在 2028 年」；已排流年是 ${years[0]}–${years[years.length - 1]}。`,
    evidence: [`可问年份：${years.join('、')}`], confidence: '弱',
  };
}

function ziweiAnswer(r, q) {
  const year = parseYear(q, r);
  const topic = topicOf(q);
  const liunian = Array.isArray(r.liunian) ? r.liunian : [];
  if (year && !liunian.some((l) => Number(l.year) === year)) {
    return {
      ok: false, year, topic,
      answer: `这一盘的流年表覆盖 ${liunian[0]?.year}–${liunian[liunian.length - 1]?.year}，没有 ${year} 年；可以换一个年份，或用 asOf 指定起点重新排盘。`,
      evidence: [`流年表：${liunian.map((l) => l.year).join('、')}`], confidence: '弱',
    };
  }
  if (year) {
    const l = liunian.find((x) => Number(x.year) === year);
    const dx = l.daxian || {};
    return {
      ok: true, year, topic,
      answer: `${year} 年（${l.ganzhi}，${l.age} 岁）流年命宫落在「${l.lifePalace ? l.lifePalace.palace : '—'}」，四化为 ${(l.mutagen || []).join('、') || '不明显'}；所行大限${dx.palace ? `在${dx.palace}（${dx.start}–${dx.end} 岁）` : '未取到'}。${topic ? `与「${topic.label}」对应的宫位信号见下条依据。` : ''}`,
      evidence: [
        `流年命宫 ${l.lifePalace ? l.lifePalace.palace : '—'}（${l.lifePalace ? l.lifePalace.branch : '—'}）`,
        `四化 ${(l.mutagen || []).join('、') || '不明显'}`,
        dx.palace ? `大限 ${dx.palace}·${dx.start}–${dx.end}岁` : '',
      ].filter(Boolean),
      confidence: (l.mutagen || []).length >= 3 ? '强' : '中',
    };
  }
  if (topic) {
    const name = ZW_PALACE_BY_TOPIC[topic.key] || '命宫';
    const p = (r.palaces || []).find((x) => x.palace === name);
    if (p) {
      const stars = (p.stars || []).filter((s) => s.type === '主星').map((s) => s.name);
      const trait = stars.map((s) => ZIWEI_STARS[s]?.trait).filter(Boolean).slice(0, 2).join('；');
      return {
        ok: true, year: null, topic,
        answer: `「${topic.label}」看${name}：主星${stars.length ? stars.join('、') : '无正曜（借对宫）'}${trait ? `——${trait}` : ''}。宫支${p.branch}，${p.stems ? '' : ''}生年四化与煞星的影响需结合报告里的对应分节一起看。`,
        evidence: [`${name} ${p.branch}·${stars.join('、') || '无正曜'}`, ...(p.shensha || []).slice(0, 3)],
        confidence: stars.length ? '强' : '弱',
      };
    }
  }
  return {
    ok: false, year: null, topic,
    answer: '没有识别到具体年份或方面。可以问「2028 年事业」「感情怎么样」「财运在 2030 年」；也可以直接问某个宫位，如「夫妻宫」。',
    evidence: [], confidence: '弱',
  };
}

function topicSentence(r, key) {
  const map = { career: '事业', wealth: '财富', love: '感情', health: '健康', study: '学业', travel: '出行' };
  return `这段时间可以重点对照报告里「${map[key] || '整体'}」一节看。`;
}

function genericAnswer(r, q) {
  const topic = topicOf(q);
  const sections = Array.isArray(r.interpret?.sections) ? r.interpret.sections : [];
  const hit = topic
    ? sections.find((s) => s.label.includes(topic.label) || s.text.includes(topic.label))
    : null;
  if (hit) {
    return { ok: true, year: null, topic, answer: hit.text, evidence: [`引用分节：${hit.label}`], confidence: '中' };
  }
  const first = sections[0];
  return {
    ok: false, year: null, topic,
    answer: first
      ? `这一盘的追问需要落到具体方面（事业 / 财富 / 感情 / 健康 / 学业 / 出行）。先看「${first.label}」这一节，或把问题说得更具体一点。`
      : '这一盘暂时没有可追问的分节；先看完整解析，再问具体方面。',
    evidence: [], confidence: '弱',
  };
}

function followup(r, question) {
  const q = String(question || '').trim();
  const result = r && r.system === 'bazi' ? baziAnswer(r, q)
    : r && r.system === 'ziwei' ? ziweiAnswer(r, q)
      : genericAnswer(r, q);
  return { question: q, ...result };
}

const SYSTEM_LABEL = {
  bazi: '八字（四柱）',
  ziwei: '紫微斗数',
  liuyao: '六爻',
  meihua: '梅花易数',
  daliuren: '大六壬',
  qimen: '奇门遁甲',
  tarot: '塔罗',
  hepan: '合盘',
  chenggu: '称骨',
  almanac: '黄历',
  zeri: '择日',
  star: '星座',
  numerology: '生命数字',
  mbti: '十六型人格',
  trend: '人生 K 线',
  fengshui: '风水',
  name: '起名',
  convert: '公农历互转',
};

function askPrompt(r, opts = {}) {
  const label = SYSTEM_LABEL[r && r.system] || (r && r.system) || '未知体系';
  const asked = String((opts && opts.question) || '').trim();
  const question = asked || '请先用一句白话讲清这张盘的主线，再指出最值得注意的一两处，并说明每处的具体依据。';
  const limit = Number.isFinite(opts && opts.maxChars) && opts.maxChars >= 400 ? opts.maxChars : 3000;
  const raw = String((r && r.summary) || '').trim();
  const truncated = raw.length > limit;
  const summary = truncated ? `${raw.slice(0, limit)}…（摘要已截断）` : raw;

  const it = (opts && typeof opts.interpret === 'object' && opts.interpret)
    || (r && typeof r.interpret === 'object' && r.interpret) || null;
  const answer = String((it && it.answer) || '').trim();
  const plain = String((it && it.plain) || '').trim();
  const draft = [];
  if (answer) draft.push(`直答：${answer}`);
  if (plain) draft.push(`说人话：${plain}`);

  const lines = [
    '【命理追问】下面这张盘是命理插件刚排好的，请就着它回答我的问题；不用重新排盘，盘面字段已经够用。',
    `体系：${label}`,
    `所问：${question}`,
    '',
    ...(draft.length ? [
      '——开场结论（插件已按同一套规则算好，开场先沿用这句；措辞可改，口径别换）——',
      ...draft,
      '',
    ] : []),
    '——盘面摘要——',
    summary || '（这张盘没有摘要字段，请先让我重新排一次。）',
    '',
    '——回答要求——',
    '读者不懂命理。按下面的骨架答；任何一句他看不懂，就算没写完：',
    draft.length
      ? '1) 开头一句结论：先沿用上面的「开场结论」，再用一句不用术语的话说清这张盘的主线——只读这一句也该有收获；'
      : '1) 开头一句结论：不用术语，一句话说清这张盘的主线，只读这一句也该有收获；',
    '2) 判断最多两条，按重要性排序，每条分四行写：',
    '   盘面｜只引盘面已有的字（具体的柱、宫或爻、字段名），不掺解释；',
    '   白话｜把上一行的术语当场翻成日常话——调候 / 化气 / 通关 / 空亡 / 争合 这类词必须落地，一个词只翻一次，不连续堆三个以上；',
    '   倾向｜说「更可能……」，讲清它在现实里大概意味着什么，用概率语气；',
    '   边界｜这条在什么情况下不成立；盘面没给的，直接写「这盘里看不出来」；',
    '3) 收尾一句「如果只记一件事」：给一条能核对、能动手的观察点，并说明它出自上面哪条盘面依据；',
    '4) 别把传统说法当成已证实的事实：不下绝对断言，也不用「肯定」「绝对」这类词，更不写「格局很好」「运程不顺」这种没有信息的空话。',
  ];
  const text = lines.join('\n');
  return { text, question, system: (r && r.system) || '', label, chars: text.length, truncated };
}

return { followup, askPrompt };
})();

__mods.crosscheck = (function () {
const { ZIWEI_STARS } = __mods['interpret-data'];

const groupsOf = (bazi) => (bazi && bazi.frame && bazi.frame.godStats && bazi.frame.godStats.groups) || {};
const topOf = (groups) => Object.entries(groups).sort((a, b) => Number(b[1]) - Number(a[1]))[0] || null;
const zwPalace = (zw, name) => (zw.palaces || []).find((p) => p.palace === name) || null;
const zwMain = (p) => (p && p.stars ? p.stars.filter((s) => s.type === '主星').map((s) => s.name) : []);
const countSha = (p) => (p && p.stars ? p.stars.filter((s) => s.type === '煞星').length : 0);
const tierOf = (bazi) => {
  const age = Number(bazi.liunian && bazi.liunian[0] ? bazi.liunian[0].age : NaN);
  const list = (bazi.dayun && bazi.dayun.list) || [];
  let cur = null;
  for (const d of list) if (Number.isFinite(age) && Number(d.startAge) <= age) cur = d;
  return cur ? (cur.luck && cur.luck.tier) || '平' : '—';
};
const daxianOf = (zw) => {
  const age = Number(zw.liunian && zw.liunian[0] ? zw.liunian[0].age : NaN);
  for (const p of zw.palaces || []) {
    const d = p.daxian || {};
    if (Number.isFinite(age) && Number(d.start) <= age && age <= Number(d.end)) return p;
  }
  return null;
};

function crossCheck(bazi, zw) {
  const groups = groupsOf(bazi);
  const top = topOf(groups);
  const items = [];
  const push = (key, label, baziText, ziweiText, stance, note) => items.push({ key, label, bazi: baziText, ziwei: ziweiText, stance, note });

  {
    const career = zwPalace(zw, '官禄');
    const main = zwMain(career);
    const baziStrong = Number(groups['官杀'] || 0) + Number(groups['食伤'] || 0) >= 2;
    const ziweiHas = main.length > 0;
    const stance = baziStrong && ziweiHas ? '同向' : !baziStrong && !ziweiHas ? '同向' : '有张力';
    push('career', '事业主线',
      `${top ? `十神以${top[0]}最重（${top[1]}）` : '十神未取到'}；官杀+食伤权重 ${(Number(groups['官杀'] || 0) + Number(groups['食伤'] || 0)).toFixed(1)}`,
      main.length ? `官禄宫主星 ${main.join('、')}${ZIWEI_STARS[main[0]] ? `（${ZIWEI_STARS[main[0]].work}）` : ''}` : '官禄无正曜',
      stance,
      stance === '同向' ? '两边都指向（或都不强调）事业主线，方向可互参' : '一边强调事业主线、一边信号弱，建议以信号强的一边为主，另一边作补充');
  }

  {
    const wealth = zwPalace(zw, '财帛');
    const main = zwMain(wealth);
    const sha = countSha(wealth);
    const w = Number(groups['财'] || 0);
    const baziStrong = w >= 2;
    const ziweiStrong = main.length > 0;
    const stance = baziStrong && ziweiStrong ? '同向' : !baziStrong && !ziweiStrong ? '同向' : '有张力';
    push('wealth', '财运结构',
      `财星权重 ${w}${baziStrong ? '（偏强）' : '（偏弱）'}`,
      `${main.length ? `财帛主星 ${main.join('、')}` : '财帛无正曜'}${sha ? `；煞星 ${sha} 颗` : ''}`,
      stance,
      '两套体系对「财」的定义不同：八字看十神财星，紫微看财帛宫，只作对照，不作数值合并');
  }

  {
    const spouse = zwPalace(zw, '夫妻');
    const main = zwMain(spouse);
    const isMale = bazi.input && bazi.input.gender === 'male';
    const key = isMale ? '财' : '官杀';
    const v = Number(groups[key] || 0);
    const baziStrong = v >= 2;
    const ziweiStrong = main.length > 0;
    const stance = baziStrong && ziweiStrong ? '同向' : !baziStrong && !ziweiStrong ? '同向' : '有张力';
    push('love', '感情线索',
      `${isMale ? '妻' : '夫'}星（${key}）权重 ${v}${baziStrong ? '（不弱）' : '（偏弱）'}`,
      main.length ? `夫妻宫主星 ${main.join('、')}${ZIWEI_STARS[main[0]] ? `（${ZIWEI_STARS[main[0]].love}）` : ''}` : '夫妻宫无正曜',
      stance,
      stance === '同向' ? '两边对感情的强弱判断接近' : '一边说缘分不弱、一边主星信号弱，宜按「多主动创造场景」处理');
  }

  {
    const wx = bazi.wuxing || {};
    const weakest = Object.entries(wx).sort((a, b) => Number(a[1]) - Number(b[1]))[0];
    const health = zwPalace(zw, '疾厄');
    const main = zwMain(health);
    const sha = countSha(health);
    push('health', '身体关注点',
      weakest ? `最弱五行 ${weakest[0]}（${weakest[1]}）` : '五行未取到',
      `${main.length ? `疾厄主星 ${main.join('、')}` : '疾厄无正曜'}${sha ? `；煞星 ${sha} 颗` : ''}`,
      '互补',
      '两边指向的器官/系统不一定相同，合并起来看更稳；任何健康问题以体检与医生为准');
  }

  {
    const t = tierOf(bazi);
    const d = daxianOf(zw);
    const sha = d ? countSha(d) : 0;
    const good = ['吉', '大吉'];
    const bad = ['忌', '大忌'];
    const baziGood = good.includes(t);
    const baziBad = bad.includes(t);
    const ziweiHeavy = sha >= 2;
    let stance = '有张力';
    let note = '一边顺、一边压，按「大方向跟顺的一边、具体动作避开压的年份」处理';
    if ((baziGood && !ziweiHeavy) || (baziBad && ziweiHeavy) || (!baziGood && !baziBad && !ziweiHeavy)) {
      stance = '同向';
      note = '两边对当前阶段的松紧判断接近';
    }
    push('rhythm', '当前节奏',
      `大运档位 ${t}`,
      `${d ? `大限在${d.palace}` : '大限未取到'}${sha ? `；煞星 ${sha} 颗` : '；无煞星'}`,
      stance, note);
  }

  return { items };
}

function crossText(cross) {
  if (!cross || !Array.isArray(cross.items)) return '';
  return cross.items
    .map((i) => `· ${i.label}：八字——${i.bazi}；紫微——${i.ziwei}；判断：${i.stance}（${i.note}）`)
    .join('\n');
}

return { crossCheck, crossText };
})();

__mods.verify = (function () {
const KIND_LABEL = {
  career: '事业变动',
  wealth: '财运起伏',
  love: '感情变化',
  move: '搬迁 / 出行',
  health: '健康问题',
  other: '其他大事',
};

const THEME = (l) => {
  const rel = (l.relations || []).join('');
  if (/冲/.test(rel)) return '有冲：变动 / 摩擦';
  if (/刑/.test(rel)) return '有刑：内耗 / 反复';
  if (/合/.test(rel)) return '有合：合作 / 牵引';
  const tier = l.luck && l.luck.tier;
  if (tier === '大吉' || tier === '吉') return '流年偏顺';
  if (tier === '大忌' || tier === '忌') return '流年偏压';
  return '信号平缓';
};

function pastSignals(chart, untilYear) {
  const until = Number(untilYear) || Infinity;
  return (chart.liunian || [])
    .filter((l) => Number(l.year) <= until)
    .map((l) => ({
      year: Number(l.year),
      ganzhi: l.ganzhi,
      tier: (l.luck && l.luck.tier) || '平',
      tenGod: l.stemTenGod || '',
      relations: l.relations || [],
      theme: THEME(l),
    }));
}

function verifyFit(rows, marks) {
  const list = Array.isArray(rows) ? rows : [];
  const m = marks || {};
  const picked = list.filter((r) => m[r.year] === 'yes' || m[r.year] === 'no');
  const yes = picked.filter((r) => m[r.year] === 'yes').length;
  const no = picked.length - yes;
  const rate = picked.length ? yes / picked.length : null;
  const level = rate == null ? '未评' : rate >= 0.7 ? '高' : rate >= 0.4 ? '中' : '低';
  let advice = '';
  if (rate == null) advice = '先勾几项「准 / 不准 / 不确定」，再看得出的贴合度。';
  else if (level === '高') advice = '前事与流年信号对得较顺，可以按这张盘继续看；有分歧时以事实为准。';
  else if (level === '中') advice = '有一部分对得上：先用「追问」核对具体年份，再决定信到什么程度。';
  else advice = '对得不多：优先核对出生时间、出生地（时区/真太阳时）与晚子时口径，而不是改结论。';
  return { answered: picked.length, yes, no, rate, level, advice, labels: { ...KIND_LABEL } };
}

return { KIND_LABEL, pastSignals, verifyFit };
})();

__mods.rectify = (function () {
const { buildBazi } = __mods.bazi;

const KINDS = ['career', 'wealth', 'love', 'move', 'health', 'other'];
const HOURS = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 23];

const TEN_GOD = (l) => l.stemTenGod || '';
const has = (l, re) => re.test((l.relations || []).join(''));
const tier = (l) => (l.luck && l.luck.tier) || '平';

function matchEvent(l, kind) {
  if (!l) return false;
  const tg = TEN_GOD(l);
  const t = tier(l);
  switch (kind) {
    case 'career': return /官|杀|食|伤/.test(tg) || has(l, /冲|合/) || t === '大吉' || t === '大忌';
    case 'wealth': return /财|食|伤/.test(tg) || t === '大吉' || t === '吉';
    case 'love': return /财|官|杀/.test(tg) || has(l, /合|冲/);
    case 'move': return has(l, /冲|合/);
    case 'health': return has(l, /刑|害|冲/) || t === '大忌' || t === '忌';
    default: return t === '大吉' || t === '大忌' || has(l, /冲|刑|合/);
  }
}

function rectifyBirth(opts) {
  const base = opts && opts.base;
  const events = (opts && opts.events) || [];
  const gender = opts && opts.gender;
  if (!base || !Number.isInteger(base.year) || !Number.isInteger(base.month) || !Number.isInteger(base.day)) {
    const e = new Error('生时校正需要出生日期 { year, month, day }');
    e.code = 'E_INPUT';
    throw e;
  }
  if (!gender) {
    const e = new Error('生时校正需要性别');
    e.code = 'E_INPUT';
    throw e;
  }
  const clean = events
    .filter((x) => x && Number.isInteger(Number(x.year)))
    .map((x) => ({ year: Number(x.year), kind: KINDS.includes(x.kind) ? x.kind : 'other' }));
  if (!clean.length) {
    const e = new Error('生时校正需要至少一条「过去发生的事」（年份 + 类别）');
    e.code = 'E_INPUT';
    throw e;
  }
  const nowYear = Math.min(...clean.map((x) => x.year));
  const hours = Array.isArray(opts.hours) && opts.hours.length
    ? opts.hours.filter((h) => Number.isInteger(h) && h >= 0 && h <= 23)
    : HOURS;

  const candidates = hours.map((hour) => {
    const chart = buildBazi({
      ...base,
      hour,
      minute: 0,
      gender,
      lateZi: opts.lateZi !== false,
      trueSolar: opts.trueSolar !== false,
      dst: opts.dst !== false,
      address: typeof opts.address === 'string' ? opts.address : undefined,
      longitude: typeof opts.longitude === 'number' ? opts.longitude : undefined,
      geo: opts.geo && typeof opts.geo === 'object' ? opts.geo : undefined,
      nowYear,
    });
    const matched = [];
    const missed = [];
    for (const ev of clean) {
      const l = (chart.liunian || []).find((x) => Number(x.year) === ev.year);
      (matchEvent(l, ev.kind) ? matched : missed).push(ev);
    }
    return {
      hour,
      label: `${String(hour).padStart(2, '0')}:00 起`,
      dayGanzhi: chart.pillars.day.ganzhi,
      hourGanzhi: chart.pillars.hour.ganzhi,
      score: clean.length ? matched.length / clean.length : 0,
      hits: matched.length,
      total: clean.length,
      matchedYears: matched.map((x) => x.year),
      missedYears: missed.map((x) => x.year),
    };
  });
  candidates.sort((a, b) => b.score - a.score || a.hour - b.hour);

  const days = [...new Set(candidates.map((c) => c.dayGanzhi))];
  const best = candidates[0];
  const second = candidates[1];
  const tie = second && second.score === best.score;

  return {
    system: 'bazi',
    base,
    events: clean,
    hours,
    candidates,
    best: best || null,
    tie,
    dayChanged: days.length > 1,
    note: `候选 ${candidates.length} 个：命中数最高 ${best ? best.hits : 0}/${clean.length}${tie ? `（有并列：${candidates.filter((c) => c.score === best.score).map((c) => c.hour).join('、')} 点）` : ''}。` +
      (days.length > 1 ? `注意：跨 23:00 的候选会改变日柱（${days.join(' / ')}），这类差异比时柱更关键。` : '候选之间只差时柱（日柱未变）。') +
      ' 这是缩小范围的参考，不替代出生记录；命中数接近时不要硬选。',
  };
}

const RECTIFY_KINDS = KINDS;

return { matchEvent, rectifyBirth, RECTIFY_KINDS };
})();

__mods.index = (function () {
const { buildBazi } = __mods.bazi;
const { buildLiuyao, tossLines, bodyLabels, yongshenOf, yongshenStrength, fushenAccess, hexagramStrength, jinTuiPower } = __mods.liuyao;
const { buildZiwei, BRIGHTNESS, flowOf, asOfParts, ZIWEI_SCHOOL_DEFAULTS } = __mods.ziwei;
const { drawTarot } = __mods.tarot;
const { buildMeihua } = __mods.meihua;
const { buildDaliuren } = __mods.daliuren;
const { buildHepan } = __mods.hepan;
const { buildZiweiHepan } = __mods['ziwei-hepan'];
const { buildQimen, buildSnapshot } = __mods.qimen;
const { geocodeAddress, resolveAddress } = __mods.geo;
const { toJDN, ganzhiName, dayGanzhiIndex } = __mods.calendar;
const { randomOf, isSeed } = __mods.random;
const { interpret, DIRECTIONS, DIRECTION_DEFAULT } = __mods.interpret;
const { followup, askPrompt } = __mods.followup;
const { crossCheck, crossText } = __mods.crosscheck;
const { pastSignals, verifyFit } = __mods.verify;
const { rectifyBirth } = __mods.rectify;
const { buildAlmanac } = __mods.almanac;
const { buildZeri } = __mods.zeri;
const { buildChenggu } = __mods.chenggu;
const { buildXiaoliuren } = __mods.xiaoliuren;
const { buildStar } = __mods.star;
const { buildNumerology } = __mods.numerology;
const { buildMbti, mbtiPaper } = __mods.mbti;
const { buildConvert } = __mods.convert;
const { classicsFor, classicsText } = __mods.classics;
const { buildTrend } = __mods.trend;
const { buildFengshui } = __mods.fengshui;
const { buildName } = __mods.name;
const { fail } = __mods.fail;
const { assertCivil } = __mods.validate;

const pad = (n) => String(n).padStart(2, '0');

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

const ZIWEI_SCHOOL_KEYS = [
  'brightnessSchool', 'gengYearSihua', 'tianmaSchool', 'tiankongSchool', 'jiekongSchool',
  'kuiyueSchool', 'tianshiTianshang', 'changshengSchool', 'lateZishi',
];

function ziweiSchoolArgs(args) {
  const out = {};
  for (const key of ZIWEI_SCHOOL_KEYS) {
    if (args[key] !== undefined) out[key] = args[key];
  }
  if (args.schools && typeof args.schools === 'object') out.schools = args.schools;
  return out;
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
  const jiao = r.dayun.jiao && r.dayun.jiao.at
    ? `；交运 ${r.dayun.jiao.at}（${r.dayun.jiao.frame}，距${r.dayun.jiao.from.name} ${r.dayun.jiao.spanDays} 天，三日折一年）`
    : '';
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
    `寒暖：${r.climate ? `${r.climate.label}（${(r.climate.evidence || []).join('、')}）${r.climate.need ? `　调候取${r.climate.need.stem}${r.climate.need.element}　忌${r.climate.avoidElement}` : ''}` : '—'}` +
    (r.frame.yongshen.qt ? `　穷通：${r.frame.yongshen.qt.month}${r.frame.yongshen.qt.stem}取${r.frame.yongshen.qt.yong.join('、')}（首取${r.frame.yongshen.qt.primary}）` : ''),
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
    `大运：${r.dayun.rule}（${r.dayun.direction}），${r.dayun.startAge.years}岁${r.dayun.startAge.months}个月起运${jiao}`,
    `　${dayun}`,
    `流年：${r.liunian.slice(0, 10).map((l) => `${l.year}${l.ganzhi}(${l.stemTenGod})${l.luck ? `·${l.luck.tier}` : ''}`).join('　')}`,
    (() => {
      const hits = r.liunian.filter((l) => l.suiyun && l.suiyun.signals && l.suiyun.signals.length);
      if (!hits.length) return '岁运提示：近十年无岁运并临、运年反吟或流年伏吟/反吟（只标干支，不判吉凶）';
      const label = (s) => `${s.type}${s.type.startsWith('流年') && s.target ? `(${s.target})` : ''}`;
      return '岁运提示（只标干支变动，不判吉凶）：' + hits
        .map((l) => `${l.year}${l.ganzhi} ${l.suiyun.signals.map(label).join('/')}`).join('；');
    })(),
    '（格局、用神、行运吉凶为扶抑＋简化调候的量化提示，非断语。）',
  ].join('\n') + near;
}

function ziweiText(r) {
  const rawMonth = r.lunar.monthRaw || r.lunar.month;
  const lunarText = `${r.lunar.year}年${r.lunar.isLeap ? `闰${rawMonth}` : r.lunar.month}月${r.lunar.day}日`
    + (r.lunar.isLeap && r.lunar.month !== rawMonth ? `（按${r.lunar.month}月起盘）` : '');
  const schoolLine = (() => {
    if (!r.schools) return '';
    const labels = {
      brightnessSchool: '亮度', gengYearSihua: '庚干四化', tianmaSchool: '天马', tiankongSchool: '天空',
      jiekongSchool: '截空', kuiyueSchool: '魁钺', tianshiTianshang: '天伤天使',
      changshengSchool: '长生', lateZishi: '晚子时',
    };
    const diff = Object.entries(labels)
      .filter(([key]) => r.schools[key] && r.schools[key] !== ZIWEI_SCHOOL_DEFAULTS[key])
      .map(([key, label]) => `${label} ${r.schools[key]}`);
    return diff.length ? `【流派】${diff.join('　')}` : '';
  })();
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
  const flyLine = (() => {
    const fc = r.flyChains;
    if (!fc) return '';
    const one = (t) => {
      const ch = fc[t];
      if (!ch || !ch.steps.length) return '';
      return `${t}：${ch.path.join('→')}${ch.closed ? '（成环）' : ''}`;
    };
    const text = ['禄', '权', '科', '忌'].map(one).filter(Boolean).join('　');
    return text ? `【命宫飞星】${text}` : '';
  })();
  const flyCompositeLine = (() => {
    const fc = r.flyComposite;
    if (!fc || !Array.isArray(fc.sources) || !fc.sources.length) return '';
    const groups = fc.labels.length ? fc.labels.join(' · ') : '无同宫会聚';
    const detail = ['禄', '权', '科', '忌'].map((t) => {
      const list = ((fc.byType && fc.byType[t]) || []).filter((x) => !x.self);
      const tos = [...new Set(list.map((x) => String(x.to).replace(/宫$/, '')))];
      return tos.length ? `${t}→${tos.join('/')}` : '';
    }).filter(Boolean).join('　');
    return `【三方四正飞化】${fc.sanfang.join('·')}：${groups}${detail ? `　${detail}` : ''}`;
  })();
  return [
    `【农历】${lunarText}（月首 ${r.lunar.monthStart}）　时支：${r.hourBranch}　年干支：${r.yearGanzhi}`,
    `【时刻】${r.solarTime ? `${r.solarTime.civilText} → 真太阳时 ${r.solarTime.trueSolarText}${r.input.geo ? '（' + r.input.geo.note + '）' : ''}` : ''}`,
    `【命宫】${r.soul.branch}（${r.soul.ganzhi}·${r.soul.nayin}）　【身宫】${r.body.branch}（落${r.body.lands}）　【五行局】${r.bureau.name}`,
    `【紫微】${r.ziwei}　【天府】${r.tianfu}　【命主】${r.lifeMaster}　【身主】${r.bodyMaster}`,
    `【大限】${r.daxian.rule}，${r.daxian.startAge}岁起　【小限】${r.xiaoxianRule.direction}`,
    schoolLine,
    `【昌曲】文昌${r.changqu.wenchang.branch}（${r.changqu.wenchang.palace}${r.changqu.wenchang.mutagen ? '·化' + r.changqu.wenchang.mutagen : ''}）　文曲${r.changqu.wenqu.branch}（${r.changqu.wenqu.palace}${r.changqu.wenqu.mutagen ? '·化' + r.changqu.wenqu.mutagen : ''}）`,
    `　　　${r.changqu.relation}　入命三方：${r.changqu.inSoulSanfang ? '是' : '否'}　吸收面：${r.changqu.absorb.label}（${r.changqu.absorb.reason}）`,
    flyLine,
    flyCompositeLine,
    '十二宫：',
    ...rows,
    '大限（按起运年龄排序，前 8 限，宫干四化落宫）：',
    ...daxian,
    '流年（前 6 年，完整 12 年在结构化数据里）：',
    ...liunian,
    `【格局】${patterns}`,
    r.patternSummary ? `【结构统计】吉格 ${r.patternSummary.good.length}、中性 ${r.patternSummary.neutral.length}、忌格 ${r.patternSummary.bad.length}；${r.patternSummary.note}` : '',
    r.lunar.note ? `注：${r.lunar.note}` : '',
  ].filter(Boolean).join('\n');
}

const STATE_ORDER = ['旺', '相', '休', '囚', '死'];
function stateLine(r) {
  const st = r.states;
  const mo = r.month;
  if (!st || !mo) return '无月令数据';
  const fmt = (g) => STATE_ORDER.filter((k) => g && Array.isArray(g[k]) && g[k].length)
    .map((k) => `${k} ${g[k].join('/')}`).join('　');
  return `月令 ${mo.branch}（${mo.element}）　门 ${fmt(st.gate) || '—'}　星 ${fmt(st.star) || '—'}　干 ${fmt(st.stem) || '—'}`;
}

function qimenText(r) {
  const P = r.palaces;
  const cell = (x) => `${x.palace}宫 ${x.star || '—'}／${x.gate || '—'}／${x.god || '—'}${x.kong ? ' 空' : ''}${x.ma ? ' 马' : ''}`;
  return [
    `【四柱】${r.siZhu.year} ${r.siZhu.month} ${r.siZhu.day} ${r.siZhu.time}`,
    `【局数】${r.ju}　节气 ${r.jieqi}（${r.jieqiTime}）`,
    `【值符】${r.zhiFu.star}（${r.zhiFu.gong}宫）　【值使】${r.zhiShi.gate}（${r.zhiShi.gong}宫）　旬首 ${r.xunshou}`,
    `【空亡】${r.kongWang.join('') || '—'}　驿马 ${r.ma.zhi || '—'}（${r.ma.gong || '—'}宫）`,
    `【宫位条件】击刑 ${(r.conditions && r.conditions.jiXing || []).map((x) => `${x.palace}宫${x.stem}`).join('、') || '无'}　入墓 ${(r.conditions && r.conditions.ruMu || []).map((x) => `${x.palace}宫${x.stem}`).join('、') || '无'}`,
    `【旺衰】${stateLine(r)}`,
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
    ...(r.detail ? [
      `属相：${r.detail.yearRelation.label}——${r.detail.yearRelation.text}`,
      `日干：${r.detail.stems.text}`,
      ...(r.detail.crossBranches && r.detail.crossBranches.length
        ? [`跨盘地支：${r.detail.crossBranches.map((c) => `${c.name}（${c.a}${c.b}）`).join('、')}`]
        : []),
      `年命纳音：${r.detail.nayin.a} / ${r.detail.nayin.b}（${r.detail.nayin.label}）——${r.detail.nayin.text}`,
      `吉凶象：吉 ${r.detail.tally.good} / 凶 ${r.detail.tally.bad}（${r.detail.tally.lean}；分档只数象，总分以上面三维度为准）`,
    ] : []),
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
    r.xunShou ? `旬首：${r.xunShou}　旬空：${(r.xunKong || []).join('') || '—'}` : '',
    r.question ? `所问：${r.question}` : '',
    '本卦：',
    fmt(r.ben),
  ];
  if (r.bian) out.push(`动爻：第 ${r.cast.movingPositions.join('、')} 爻`, '变卦（六亲以变卦自身宫论）：', fmt(r.bian));
  else out.push('六爻安静，无变卦。');
  const body = (r.body && Array.isArray(r.body.labels)) ? r.body.labels : bodyLabels(r.body);
  out.push(`卦体：${body.length ? body.join(' · ') : '无六冲、六合、伏吟、反吟'}`);
  const ug = r.useGod || yongshenOf(r, {});
  if (ug && ug.liuqin) {
    const where = ug.found.length
      ? ug.found.map((f) => `${f.position}爻${f.ganzhi}${f.element}${f.kong ? '（空）' : ''}`).join('、')
      : (ug.fushen.length ? ug.fushen.map((f) => `伏 ${f.position}爻${f.ganzhi}${f.element}（${f.relation || '飞伏关系未知'}）`).join('、') : '不上卦');
    out.push(`用神：${ug.byShi ? '世爻' : ug.liuqin}（${ug.ask}）→ ${where}${ug.side ? `（${ug.side}）` : ''}`);
    const head = ug.byShi ? '用神 世爻' : `用神 ${ug.liuqin}`;
    const extra = ug.labels.filter((x) => x !== head && !x.startsWith(head));
    if (extra.length) out.push(`用神联动：${extra.join(' · ')}`);
    const strength = r.useGodStrength;
    if (strength && strength.labels.length) {
      const m = strength.month && strength.month.branch ? `月建 ${strength.month.branch}（${strength.month.element}）　` : '';
      out.push(`用神旺衰：${m}${strength.labels.join(' · ')}`);
    }
    const chufu = r.fushenAccess;
    if (chufu && Array.isArray(chufu.labels) && chufu.labels.length) {
      out.push(`伏神出伏：${chufu.labels.join(' · ')}`);
    }
  } else {
    out.push('用神：未取（未指明所问之事；用「询问方向」指定后即按六亲取用）');
  }
  const hexSt = r.hexStrength;
  if (hexSt && Array.isArray(hexSt.labels) && hexSt.labels.length) {
    const m = hexSt.month && hexSt.month.branch
      ? `月建 ${hexSt.month.branch}（${hexSt.month.element}）　`
      : '无月建（未给起卦时间）　';
    out.push(`全卦旺衰：${m}${hexSt.labels.join(' · ')}`);
  }
  const jt = r.jinTuiPower;
  if (jt && Array.isArray(jt.lines) && jt.lines.length) {
    out.push(`进退力重：${jt.lines.map((l) => `${l.position}爻${l.from}→${l.to}${l.type}·${l.verdict}`).join(' · ')}`);
  }
  return out.filter(Boolean).join('\n');
}

function jsonSafe(value) {
  return JSON.parse(JSON.stringify(value));
}

function compute(args = {}) {
  const r = jsonSafe(computeRaw(args));
  if (r && r.system === 'bazi') {
    r.classics = classicsFor(r);
    const ct = classicsText(r.classics);
    if (ct) r.summary = `${r.summary}\n【古籍】\n${ct}`;
  }
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
  if (args.cross === true && (r.system === 'bazi' || r.system === 'ziwei')) {
    const cdt = parseDateTime(args.datetime);
    const common = {
      ...cdt,
      gender: requireGender(args.gender),
      longitude: typeof args.longitude === 'number' ? args.longitude : undefined,
      address: typeof args.address === 'string' ? args.address : undefined,
      geo: args.geo && typeof args.geo === 'object' ? args.geo : undefined,
      trueSolar: args.trueSolar !== false,
      dst: args.dst !== false,
    };
    const asOf = checkAsOf(args.asOf);
    const other = r.system === 'bazi'
      ? buildZiwei({ ...common, leapMonth: args.leapMonth, leapAsNext: args.leapAsNext === true, ...ziweiSchoolArgs(args), asOf })
      : buildBazi({ ...common, lateZi: args.lateZi !== false, nowYear: asOf ? asOf.year : undefined });
    r.cross = crossCheck(r.system === 'bazi' ? r : other, r.system === 'ziwei' ? r : other);
    if (r.interpret) {
      r.interpret.sections.push({ key: 'crossSystem', label: '八字 × 紫微 交叉验证', text: crossText(r.cross) });
    }
  }
  if (Number.isInteger(args.verifyPast) && args.verifyPast > 0 && r.system === 'bazi') {
    const years = Math.min(Math.max(args.verifyPast, 1), 10);
    const from = Number(r.liunianFrom) - years;
    const pastChart = buildBazi({
      ...parseDateTime(args.datetime),
      gender: requireGender(args.gender),
      lateZi: args.lateZi !== false,
      trueSolar: args.trueSolar !== false,
      longitude: typeof args.longitude === 'number' ? args.longitude : undefined,
      address: typeof args.address === 'string' ? args.address : undefined,
      geo: args.geo && typeof args.geo === 'object' ? args.geo : undefined,
      dst: args.dst !== false,
      nowYear: from,
    });
    r.past = {
      rows: pastSignals(pastChart, Number(r.liunianFrom) - 1),
      years,
      until: Number(r.liunianFrom) - 1,
    };
  }
  if (args.rectify === true && r.system === 'bazi') {
    const base = parseDateTime(args.datetime);
    r.rectify = rectifyBirth({
      base: { year: base.year, month: base.month, day: base.day, minute: base.minute },
      gender: requireGender(args.gender),
      events: Array.isArray(args.events) ? args.events : [],
      hours: Array.isArray(args.rectifyHours) ? args.rectifyHours : undefined,
      lateZi: args.lateZi !== false,
      trueSolar: args.trueSolar !== false,
      dst: args.dst !== false,
      longitude: typeof args.longitude === 'number' ? args.longitude : undefined,
      address: typeof args.address === 'string' ? args.address : undefined,
      geo: args.geo && typeof args.geo === 'object' ? args.geo : undefined,
    });
  }
  if (typeof args.ask === 'string' && args.ask.trim()) r.followup = followup(r, args.ask);
  return r;
}

function interpretText(i) {
  if (!i) return '';
  const out = [`【${i.title || '解析与详解'}】${i.ask && i.ask.echo ? i.ask.echo : ''}`];
  if (i.answer) out.push(`▶ ${i.ask && i.ask.question ? '先答所问' : '先看结论'}：${i.answer}`);
  if (i.plain) out.push(`▶ 说人话：${i.plain}`);
  if (i.lead) out.push(i.lead);
  if (Array.isArray(i.outline) && i.outline.length) {
    out.push('一页读懂：' + i.outline.map((o) => `${o.label}·${o.text}`).join('　'));
  }
  if (i.error) out.push(`⚠ 解析生成失败：${i.error}（上方盘面数据本身可用）`);
  for (const d of i.dimensions || []) {
    const evidence = Array.isArray(d.evidence) && d.evidence.length ? `\n　依据：${d.evidence.join('；')}${d.confidence ? `　置信度：${d.confidence}` : ''}` : '';
    const plain = d.plain ? `（${d.plain}）` : '';
    const know = (d.knowledge || [])
      .map((k) => `\n　规则·${k.gist}〔${k.statusLabel}〕${k.detail}　出处：${k.source}${k.note ? `　注：${k.note}` : ''}`)
      .join('');
    out.push(`${d.label}：${plain}${d.text}${d.advice ? `　建议：${d.advice}` : ''}${evidence}${know}`);
  }
  for (const s of i.sections || []) out.push(`${s.label}：${s.text}`);
  for (const t of i.tables || []) {
    if (!Array.isArray(t.rows) || !t.rows.length) continue;
    out.push(`【${t.title}】`);
    out.push([t.columns.join(' | '), ...t.rows.map((r) => r.join(' | '))].join('\n'));
  }
  if (Array.isArray(i.followups) && i.followups.length) {
    out.push('还可以这样追问：' + i.followups.map((q) => `「${q}」`).join('　'));
  }
  if (Array.isArray(i.glossary) && i.glossary.length) {
    out.push('名词解释：' + i.glossary.map((g) => `${g.term}＝${g.plain}`).join('　'));
  }
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
      dst: args.dst !== false,
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
      leapMonth: args.leapMonth,
      leapAsNext: args.leapAsNext === true,
      ...ziweiSchoolArgs(args),
      longitude: typeof args.longitude === 'number' ? args.longitude : undefined,
      address: typeof args.address === 'string' ? args.address : undefined,
      geo: args.geo && typeof args.geo === 'object' ? args.geo : undefined,
      trueSolar: args.trueSolar,
      dst: args.dst !== false,
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
      dst: args.dst !== false,
      address: typeof args.address === 'string' ? args.address : undefined,
      longitude: typeof args.longitude === 'number' ? args.longitude : undefined,
      geo: args.geo && typeof args.geo === 'object' ? args.geo : undefined,
    };
    const sideB = {
      ...pb,
      gender: requireGender(partner.gender, '对方'),
      trueSolar: partner.trueSolar,
      lateZi: partner.lateZi,
      dst: partner.dst !== false,
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
    const ug = yongshenOf(result, { direction: args.direction, gender: args.gender });
    if (ug.liuqin) result.useGod = ug;
    let monthBranch = null;
    if (stamp) {
      try {
        const snap = buildSnapshot({ year: stamp.year, month: stamp.month, day: stamp.day, hour: stamp.hour, minute: stamp.minute });
        monthBranch = (snap.monthGanZhi || '')[1] || null;
      } catch {
        monthBranch = null;
      }
    }
    const hexStrength = hexagramStrength(result, { monthBranch, dayBranch: result.dayGanZhi.branch });
    if (hexStrength) result.hexStrength = hexStrength;
    const jtPower = jinTuiPower(result, { monthBranch, dayBranch: result.dayGanZhi.branch });
    if (jtPower) result.jinTuiPower = jtPower;
    if (ug.liuqin) {
      const strength = yongshenStrength(result, ug, { monthBranch, dayBranch: result.dayGanZhi.branch });
      if (strength) result.useGodStrength = strength;
      const chufu = fushenAccess(result, ug, { monthBranch, dayBranch: result.dayGanZhi.branch });
      if (chufu) result.fushenAccess = chufu;
    }
    if (args.seed !== undefined && args.seed !== null && args.seed !== '') result.seed = Number(args.seed);
    return { ...result, ...(asOf ? { asOf } : {}), summary: liuyaoText(result) };
  }
  if (system === 'almanac') {
    const dt = parseDateTime(args.datetime);
    const result = buildAlmanac({ year: dt.year, month: dt.month, day: dt.day });
    return { ...result, summary: almanacText(result) };
  }
  if (system === 'zeri') {
    if (typeof args.startDate !== 'string' || !args.startDate.trim()) {
      throw fail('E_INPUT', '择日需要 startDate（公历 YYYY-MM-DD，起算日）；可另给 days（1–60，默认 30）与 shengXiao（当事人属相）');
    }
    const result = buildZeri({
      task: args.task,
      startDate: args.startDate,
      days: args.days,
      shengXiao: args.shengXiao,
    });
    return { ...result, summary: zeriText(result) };
  }
  if (system === 'chenggu') {
    const dt = parseDateTime(args.datetime);
    const hasTime = /[T\s]\d{1,2}:\d{1,2}/.test(String(args.datetime));
    const hour = Number.isInteger(args.hour) ? args.hour : hasTime ? dt.hour : null;
    if (hour === null || hour < 0 || hour > 23) {
      throw fail('E_INPUT', '称骨必须给时辰：datetime 带时分（如 1990-08-15T10:00），或额外给 hour（0–23）——缺时辰四柱不齐');
    }
    const result = buildChenggu({ year: dt.year, month: dt.month, day: dt.day, hour, minute: hasTime ? dt.minute : 0 });
    return { ...result, summary: chengguText(result) };
  }
  if (system === 'convert') {
    const mode = args.mode === 'lunar2solar' ? 'lunar2solar' : 'solar2lunar';
    let result;
    if (mode === 'lunar2solar') {
      if (args.lunarYear == null || args.lunarMonth == null || args.lunarDay == null) {
        throw fail('E_INPUT', '农历转公历需要 lunarYear / lunarMonth / lunarDay（闰月另加 isLeapMonth: true）');
      }
      result = buildConvert({
        mode,
        lunarYear: Number(args.lunarYear),
        lunarMonth: Number(args.lunarMonth),
        lunarDay: Number(args.lunarDay),
        isLeapMonth: args.isLeapMonth === true,
      });
    } else {
      const dt = parseDateTime(args.datetime);
      result = buildConvert({ mode, year: dt.year, month: dt.month, day: dt.day });
    }
    return { ...result, summary: convertText(result) };
  }
  if (system === 'xiaoliuren') {
    const dt = args.datetime ? parseDateTime(args.datetime) : null;
    const result = buildXiaoliuren({
      mode: args.mode === 'number' ? 'number' : 'time',
      date: typeof args.date === 'string' && args.date.trim() ? args.date : dt ? `${dt.year}-${dt.month}-${dt.day}` : undefined,
      hour: Number.isInteger(args.hour) ? args.hour : dt && /[T\s]\d{1,2}:\d{1,2}/.test(String(args.datetime)) ? dt.hour : undefined,
      num1: args.num1,
      num2: args.num2,
      num3: args.num3,
      question: args.question,
    });
    return { ...result, summary: xiaoliurenText(result) };
  }
  if (system === 'star') {
    const dt = parseDateTime(args.datetime);
    const result = buildStar({ year: dt.year, month: dt.month, day: dt.day });
    return { ...result, summary: starText(result) };
  }
  if (system === 'numerology') {
    const dt = parseDateTime(args.datetime);
    const result = buildNumerology({ year: dt.year, month: dt.month, day: dt.day });
    return { ...result, summary: numerologyText(result) };
  }
  if (system === 'mbti') {
    if (args.answers === undefined || args.answers === null) {
      const paper = mbtiPaper();
      return { ...paper, summary: mbtiPaperText(paper) };
    }
    const result = buildMbti({ answers: args.answers });
    return { ...result, summary: mbtiText(result) };
  }
  if (system === 'trend') {
    const dt = parseDateTime(args.datetime);
    const result = buildTrend({
      ...dt,
      gender: requireGender(args.gender),
      toAge: args.toAge,
      lateZi: args.lateZi !== false,
      trueSolar: args.trueSolar !== false,
      dst: args.dst !== false,
      longitude: typeof args.longitude === 'number' ? args.longitude : undefined,
      address: typeof args.address === 'string' ? args.address : undefined,
      geo: args.geo && typeof args.geo === 'object' ? args.geo : undefined,
    });
    return { ...result, precision: dt.precision, summary: trendText(result) };
  }
  if (system === 'fengshui') {
    const action = args.action === 'advise' ? 'advise' : args.action === 'xuankong' ? 'xuankong' : 'natal';
    if (action === 'xuankong') {
      const result = buildFengshui({
        action,
        sitting: args.sitting,
        facing: args.facing,
        ...(args.period !== undefined ? { period: args.period } : {}),
        ...(Number.isInteger(args.fortuneYear) ? { fortuneYear: args.fortuneYear } : {}),
      });
      return { ...result, summary: fengshuiText(result) };
    }
    if (action === 'advise') {
      const result = buildFengshui({
        action,
        sitting: args.sitting,
        facing: args.facing,
        ...(args.datetime ? parseDateTime(args.datetime) : {}),
        ...(args.gender === 'male' || args.gender === 'female' ? { gender: args.gender } : {}),
        dst: args.dst !== false,
      });
      return { ...result, summary: fengshuiText(result) };
    }
    const dt = parseDateTime(args.datetime);
    const result = buildFengshui({
      action: 'natal',
      year: dt.year, month: dt.month, day: dt.day,
      gender: requireGender(args.gender),
      fortuneYear: Number.isInteger(args.fortuneYear) ? args.fortuneYear : undefined,
      dst: args.dst !== false,
    });
    return { ...result, summary: fengshuiText(result) };
  }
  if (system === 'name') {
    const action = args.action === 'generate' ? 'generate' : 'assess';
    const birth = args.datetime
      ? parseDateTime(args.datetime)
      : (Number.isInteger(args.year) && Number.isInteger(args.month) && Number.isInteger(args.day)
        ? {
          year: args.year, month: args.month, day: args.day,
          ...(Number.isInteger(args.hour) ? { hour: args.hour } : {}),
          ...(Number.isInteger(args.minute) ? { minute: args.minute } : {}),
        }
        : {});
    const result = buildName({
      action,
      surname: args.surname,
      givenName: args.givenName,
      limit: args.limit,
      charElements: args.charElements && typeof args.charElements === 'object' ? args.charElements : undefined,
      strokeOverrides: args.strokeOverrides && typeof args.strokeOverrides === 'object' ? args.strokeOverrides : undefined,
      surnameStrokes: args.surnameStrokes && typeof args.surnameStrokes === 'object' ? args.surnameStrokes : undefined,
      ...birth,
      ...(args.gender === 'male' || args.gender === 'female' ? { gender: args.gender } : {}),
      ...(args.datetime ? {
        lateZi: args.lateZi !== false,
        trueSolar: args.trueSolar !== false,
        dst: args.dst !== false,
        longitude: typeof args.longitude === 'number' ? args.longitude : undefined,
        address: typeof args.address === 'string' ? args.address : undefined,
        geo: args.geo && typeof args.geo === 'object' ? args.geo : undefined,
      } : {}),
    });
    return { ...result, summary: nameText(result) };
  }
  if (!system) {
    throw fail('E_INPUT', '缺少 system，可选：bazi（四柱八字）、ziwei（紫微斗数）、liuyao（六爻）、meihua（梅花易数）、daliuren（大六壬）、qimen（奇门遁甲）、hepan（合盘）、tarot（塔罗）、almanac（黄历）、zeri（择日）、chenggu（称骨）、xiaoliuren（小六壬）、star（星座）、numerology（生命数字）、mbti（十六型人格问卷）、trend（人生 K 线）、fengshui（风水）、name（起名）、convert（公农历互转）。');
  }
  throw fail('E_SYSTEM', `未知体系「${system}」，可选：bazi（四柱八字）、ziwei（紫微斗数）、liuyao（六爻）、meihua（梅花易数）、daliuren（大六壬）、qimen（奇门遁甲）、hepan（合盘）、tarot（塔罗）、almanac（黄历）、zeri（择日）、chenggu（称骨）、xiaoliuren（小六壬）、star（星座）、numerology（生命数字）、mbti（十六型人格问卷）、trend（人生 K 线）、fengshui（风水）、name（起名）、convert（公农历互转）。`);
}

function almanacText(r) {
  const g = r.ganzhi;
  const jq = r.jieQi && r.jieQi.next ? `　下一节：${r.jieQi.next.name} ${r.jieQi.next.date}` : '';
  const god = r.dayGod ? `值日：${r.dayGod.name}（${r.dayGod.type}·${r.dayGod.luck}）` : '';
  const xiu = r.xiu ? `二十八宿：${r.xiu.name}宿（${r.xiu.luck}·${r.xiu.zheng}·${r.xiu.animal}）` : '';
  const tai = r.taiShen ? `胎神：${r.taiShen}` : '';
  const pos = r.positions
    ? `吉神方位：喜神${r.positions.xiShen || '—'}　财神${r.positions.caiShen || '—'}　福神${r.positions.fuShen ? r.positions.fuShen.dir : '—'}　阳贵${r.positions.yangGui ? r.positions.yangGui.dir : '—'}　阴贵${r.positions.yinGui ? r.positions.yinGui.dir : '—'}`
    : '';
  const lucky = r.lucky ? `吉配生肖：六合${r.lucky.liuhe || '—'}　三合${(r.lucky.sanhe || []).join('、') || '—'}` : '';
  const nayin = r.nayin && r.nayin.day ? `日柱纳音：${r.nayin.day.name}` : '';
  const hours = (r.hours || []).map((h) => `${h.zhi}${h.ganZhi.slice(0, 1)}·${h.shen}${h.luck === '吉' ? '吉' : '凶'}`).join(' ');
  return [
    `【黄历】${r.meta.date} ${r.meta.weekday}　${r.lunar.text}`,
    `干支：${g.year}年　${g.month}月　${g.day}日　属${g.shengXiao}`,
    ...(r.meta.boundaryNote ? [`　${r.meta.boundaryNote}`] : []),
    `建除：${r.zhiXing}日　冲：${r.chong.text}${r.chong.sha ? `（${r.chong.sha}）` : ''}　${god}`,
    [xiu, nayin, tai].filter(Boolean).join('　'),
    `宜：${r.yi.join('、')}`,
    `忌：${r.ji.join('、')}`,
    pos,
    lucky,
    hours ? `时辰吉凶：${hours}` : '',
    `节气：上一节 ${r.jieQi.prev ? `${r.jieQi.prev.name} ${r.jieQi.prev.date}` : '—'}${jq}`,
    r.dailyHexagram ? `每日一卦：${r.dailyHexagram.name}　${r.dailyHexagram.meaning || ''}` : '',
    `口径：${r.meta.scope}`,
  ].filter(Boolean).join('\n');
}

function zeriText(r) {
  const head = `【择日·${r.meta.task}】${r.meta.startDate} 起 ${r.meta.days} 天${r.meta.shengXiao ? `　当事人属${r.meta.shengXiao}` : '（未给属相，未做冲煞排除）'}`;
  const top = r.days.slice().sort((a, b) => b.score - a.score).slice(0, 5)
    .map((d) => `· ${d.date} ${d.weekday}　${d.verdict}（${d.score}分）　宜${d.yi.slice(0, 3).join('/')}　${d.reasons.join('；') || '无特别加减分'}`);
  return [
    head,
    `推荐日：${r.best.length ? r.best.join('、') : '本期无（都不够推荐分）'}`,
    `可用日：${r.usable.length ? r.usable.join('、') : '无'}`,
    `回避日：${r.avoid.length ? r.avoid.slice(0, 6).join('、') : '无'}`,
    '逐日排序：',
    ...top,
    `口径：${r.meta.scope}`,
  ].join('\n');
}

function chengguText(r) {
  const s = r.song || {};
  const lines = [
    `【称骨】${r.input.solar} ${r.lunar.text}`,
    `四项：${r.weights.year.label}　${r.weights.month.label}　${r.weights.day.label}　${r.weights.hour.label}`,
    `合计：${r.total.label}（${r.verdict.band}）`,
    `歌诀（${r.total.label}）：${s.text || '—'}`,
    `释义：${s.plain || '—'}`,
    `分档白话：${r.verdict.text}`,
    '口径：骨重与歌诀为通行本口径（各版本歌诀有异文），释义为白话自撰，属民俗娱乐参考。',
  ];
  return lines.join('\n');
}

function xiaoliurenText(r) {
  return [
    `【小六壬·${r.meta.mode}】${r.meta.question ? `所问：${r.meta.question}` : ''}`,
    r.meta.originText,
    `落宫：${r.steps.join(' → ')}`,
    `断语：${r.result.palace}（${r.result.luck}）　${r.result.text}`,
  ].join('\n');
}

function starText(r) {
  return [
    `【星座】${r.meta.date}　${r.sign.name}（${r.sign.element}·守护星${r.sign.planet}）`,
    `区间：${r.sign.range}　关键词：${r.sign.keywords}　契合：${r.sign.compatible}`,
    `当日基调：${r.daily.tone}`,
    r.daily.dims.map((d) => `· ${d.name}：${'★'.repeat(d.stars)}${'☆'.repeat(5 - d.stars)}　${d.text}`).join('\n'),
    `幸运色：${r.daily.luckyColor}　幸运数字：${r.daily.luckyNumber}`,
    '口径：当日基调由日期哈希确定性生成（同日同结果），纯娱乐向。',
  ].join('\n');
}

function convertText(r) {
  const g = r.ganzhi;
  const dir = r.meta.mode === 'lunar2solar' ? '农历 → 公历' : '公历 → 农历';
  return [
    `【公农历转换·${dir}】${r.lunar.text} ⇄ ${r.solar.text} ${r.meta.weekday}`,
    `干支：${g.year}年　${g.month}月　${g.day}日　属${g.shengXiao}${g.springYear && g.springYear !== g.year ? `（春节界为${g.springYear}年）` : ''}`,
    ...(r.meta.note ? [`注：${r.meta.note}`] : []),
    `口径：${r.meta.scope}`,
  ].join('\n');
}

function numerologyText(r) {
  return [
    `【生命数字】${r.meta.date}（西方数字学，与八字/紫微不可互证）`,
    ...r.parts.map((p) => `${p.name}：${p.number}（${p.meaning.title}）　${p.meaning.keywords}\n　倾向：${p.meaning.tendency}\n　课题：${p.meaning.lesson}`),
  ].join('\n');
}

function mbtiText(r) {
  const dims = r.dims.map((d) => {
    const side = d.picked === d.left ? d.leftSay : d.rightSay;
    const pct = Math.round(d.pct * 100);
    return `${d.left}/${d.right} 取 ${d.picked}（${d.strength} ${pct}%，净分 ${d.sum}）　${side}`;
  });
  const p = r.profile;
  const stack = Array.isArray(p.stack) && p.stack.length
    ? p.stack.map((f, i) => `${i === 0 ? '主导 ' : ''}${f.code}`).join(' → ') + `\n　${p.stack.map((f) => `${f.code}：${f.say}`).join('\n　')}`
    : '';
  return [
    `【十六型人格】${r.type}（${p.title}）· ${p.keywords}　已答 ${r.answered}/${r.total} 题`,
    `一句：${p.oneLine}`,
    '【四维】',
    ...dims,
    `【优势】${p.strengths.join('；')}`,
    `【留意】${p.blindspots.join('；')}`,
    `【课题】${p.growth}`,
    `【认知功能】${stack}`,
    `【工作】${p.work}`,
    `【关系】${p.love}`,
    `【学习】${p.study}`,
    `注：${r.note}`,
  ].join('\n');
}

function mbtiPaperText(paper) {
  return [
    `【十六型人格问卷】${paper.total} 题，每题按 1（完全不像我）到 5（很像我）打分`,
    ...paper.questions.map((q) => `${q.no}. ${q.text}`),
    `请把 ${paper.total} 个分数按顺序交给 answers（如 [4,2,5,3,…]）；可以跳过某些题（填 null），至少答 12 题。`,
    `注：${paper.note}`,
  ].join('\n');
}

function trendText(r) {
  const s = r.meta.strength;
  const dm = r.meta.dayMaster;
  const dmText = dm && typeof dm === 'object' ? `${dm.stem}（${dm.element}）` : String(dm || '');
  return [
    `【人生 K 线】${r.meta.birth}　${r.meta.gender}　日主 ${dmText}　旺衰 ${s.level}（${s.score}）`,
    r.meta.boundaryNote ? `※ ${r.meta.boundaryNote}` : '',
    `【大运分段】${r.segments.map((g) => `${g.ganZhi} ${g.startAge}-${g.endAge}岁`).join('　')}`,
    `【走势】${Array.isArray(r.sparkline) ? r.sparkline.join('　') : r.sparkline}`,
    ...(r.highlights && r.highlights.best && r.highlights.best.length
      ? [`【关键年】最佳 ${r.highlights.best.join('；')}${r.highlights.worst && r.highlights.worst.length ? `\n最需留意 ${r.highlights.worst.join('；')}` : ''}`]
      : []),
    `※ ${r.disclaimer}`,
  ].filter(Boolean).join('\n');
}

function fengshuiText(r) {
  if (r.meta.action === 'xuankong') {
    const p = r.meta.period;
    const cell = (palace) => {
      const x = r.palaces.find((y) => y.palace === palace);
      return `${palace}${x.yun}/${x.shan}/${x.xiang}`;
    };
    const row = (names) => names.map(cell).join('　');
    const w = r.wangShanWangXiang;
    return [
      `【玄空】${r.meta.periodLabel}　坐 ${r.meta.sitting}　向 ${r.meta.facing}`,
      `【入中】山盘 ${r.meta.shanCenter.star}${r.meta.shanCenter.name}（${r.meta.shanCenter.fly}，${r.meta.shanCenter.basis}）；向盘 ${r.meta.xiangCenter.star}${r.meta.xiangCenter.name}（${r.meta.xiangCenter.fly}，${r.meta.xiangCenter.basis}）`,
      `【九宫】${row(['巽', '离', '坤'])}｜${row(['震', '中', '兑'])}｜${row(['艮', '坎', '乾'])}`,
      `【当运】山星${p}到${r.dangYun.shan.text}；向星${p}到${r.dangYun.xiang.text}`,
      `【表法】${w.table.length ? w.table.join('、') : '无'}；${w.note}`,
      `【合十】山星合十 ${r.heshi.shan.join('、') || '无'}；向星合十 ${r.heshi.xiang.join('、') || '无'}`,
      ...(r.meta.note ? [`※ ${r.meta.note}`] : []),
      `※ ${r.disclaimer}`,
    ].join('\n');
  }
  if (r.meta.action === 'advise') {
    const match = r.mingMatch
      ? [`【命宅配】${r.mingMatch.text}`]
      : [`※ ${r.meta.birthNote || '未提供生辰，未做命宅配。'}`];
    return [
      `【宅卦】坐 ${r.meta.sitting}　向 ${r.meta.facing}　${r.meta.houseGua}宅（${r.meta.houseGroup}）`,
      `【八星】${r.houseStars.map((x) => `${x.star}·${x.direction}${x.palace ? `（${x.palace}）` : ''}`).join('　')}`,
      `【门】${r.layout.door}`,
      `【灶】${r.layout.stove}`,
      `【床】${r.layout.bed}`,
      `【厕】${r.layout.toilet}`,
      ...match,
      `※ ${r.disclaimer}`,
    ].join('\n');
  }
  const g = r.mingGua;
  return [
    `【命卦】${g.num}${g.gua}（${g.group}）　方位 ${g.direction}`,
    `【四吉】${r.luckyDirections.map((x) => `${x.star}·${x.direction}${x.palace ? `（${x.palace}）` : ''}`).join('　')}`,
    `【四凶】${r.unluckyDirections.map((x) => `${x.star}·${x.direction}`).join('　')}`,
    ...(r.yearlyFlying
      ? [`【${r.meta.fortuneYear} 年九宫飞星】中宫 ${r.yearlyFlying.centerName}；${r.yearlyFlying.palaces.filter((p) => p.palace !== '中').map((p) => `${p.palace}${p.name}`).join('　')}`]
      : [`※ ${r.meta.note || ''}`]),
    `※ ${r.disclaimer}`,
  ].filter(Boolean).join('\n');
}

function nameText(r) {
  if (r.action === 'generate') {
    return [
      `【候选名】姓 ${r.surname}（${r.gender}，喜用 ${r.bazi.favorable.join('、')}）${r.bazi.basis}`,
      ...r.candidates.map((c) => {
        const wu = c.wuge && c.wuge.available ? `　五格 ${c.wuge.summary}` : '';
        const ph = c.phonetics && c.phonetics.available ? `　音韵 ${c.phonetics.level}（${c.phonetics.tonePattern}）` : '';
        return `${c.rank}. ${c.name}　${c.chars.map((x) => `${x.char}(${x.element})${x.meaning}`).join('　')}${wu}${ph}`;
      }),
      ...r.notes.map((n) => `※ ${n}`),
    ].join('\n');
  }
  const srcLabel = (c) => (c.source === 'lib' ? '字库' : c.source === 'user' ? '用户指定' : '未收录');
  const charLine = (c) => {
    const el = c.element === '未收录' ? '未收录（不猜五行）' : `${c.element}（${srcLabel(c)}）`;
    const fit = c.favorable === true ? '合喜用' : c.favorable === false ? '不合喜用' : '不判';
    const sug = c.suggest && c.suggest.length
      ? `　可换：${c.suggest.map((x) => `${x.char}（${x.element}）`).join('、')}`
      : '';
    return `· ${c.char}：${el}｜${fit}｜${c.meaning}${sug}`;
  };
  const wu = r.wuge;
  const wugeLine = wu && wu.available
    ? `【五格】${wu.strokes.map((x) => `${x.char}${x.strokes}画`).join('＋')}｜${wu.summary}｜三才 ${wu.sancai.text}`
    : `【五格】${wu ? wu.reason : '未算'}`;
  const ph = r.phonetics;
  const phLine = ph && ph.available
    ? `【音韵】${ph.chars.map((x) => `${x.char}${x.py}${x.tone}`).join(' ')}｜声调 ${ph.tonePattern}｜${ph.level}${ph.issues.length ? `：${ph.issues.map((i) => i.text).join('；')}` : ''}`
    : `【音韵】${ph ? ph.reason : '未算'}`;
  return [
    `【名字评估】${r.fullName}`,
    ...r.chars.map(charLine),
    r.bazi ? `【八字】日主 ${r.bazi.dayMaster && r.bazi.dayMaster.stem ? `${r.bazi.dayMaster.stem}（${r.bazi.dayMaster.element}）` : r.bazi.dayMaster}，旺衰 ${r.bazi.strength.level}（${r.bazi.strength.score}），${r.bazi.basis}` : '',
    wugeLine,
    phLine,
    `【结论】${r.verdict}`,
    ...r.notes.map((n) => `※ ${n}`),
  ].filter(Boolean).join('\n');
}

function renderText(result) {
  const base = result.summary ?? JSON.stringify(result, null, 2);
  const parts = [base];
  if (result.interpret) {
    const extra = interpretText(result.interpret);
    if (extra) parts.push(extra);
  }
  if (result.cross) parts.push(`【八字 × 紫微 交叉验证】\n${crossText(result.cross)}`);
  if (result.followup) {
    const f = result.followup;
    parts.push(`【追问】${f.question}\n${f.answer}${f.evidence && f.evidence.length ? `\n　依据：${f.evidence.join('；')}　置信度：${f.confidence}` : ''}`);
  }
  if (result.past && Array.isArray(result.past.rows) && result.past.rows.length) {
    parts.push(`【验前事】过去 ${result.past.years} 年的流年信号（只读，不改盘）\n` +
      result.past.rows.map((r) => `· ${r.year} ${r.ganzhi} · ${r.theme}（${r.tier}${r.tenGod ? `，${r.tenGod}` : ''}）`).join('\n') +
      '\n用法：在面板里勾「准 / 不准 / 不确定」后算贴合度；贴合度低时先核对出生时间、时区与晚子时口径。');
  }
  if (result.rectify && Array.isArray(result.rectify.candidates)) {
    const rc = result.rectify;
    parts.push(`【生时校正】候选时辰 ${rc.candidates.length} 个（固定规则打分，只缩小范围）\n` +
      rc.candidates.slice(0, 8).map((c) => `· ${c.label} 时柱 ${c.hourGanzhi} / 日柱 ${c.dayGanzhi} · 命中 ${c.hits}/${c.total}`).join('\n') +
      `\n${rc.note}`);
  }
  return parts.filter(Boolean).join('\n\n');
}

return { interpret, DIRECTIONS, DIRECTION_DEFAULT, BRIGHTNESS, flowOf, geocodeAddress, resolveAddress, buildBazi, buildLiuyao, tossLines, followup, askPrompt, pastSignals, verifyFit, rectifyBirth, crossCheck, crossText, buildAlmanac, buildZeri, buildChenggu, buildXiaoliuren, buildStar, buildNumerology, buildConvert, buildTrend, buildFengshui, buildName, parseDateTime, compute, interpretText, renderText };
})();

    const Engine = __mods.index;
    window.Engine = Engine;
    window.__MP_VER = '0.46.5';
(function () {
  const NEED_ASK = { liuyao: true, meihua: true, daliuren: true, tarot: true };
  const needAsk = (kind) => !!NEED_ASK[kind];

  function parseLines(text) {
    const raw = String(text == null ? '' : text).trim();
    if (!raw) return { lines: null, warning: '' };
    const v = raw.split(/[^0-9]+/).filter(Boolean).map(Number);
    const bad = v.filter((n) => ![6, 7, 8, 9].includes(n));
    if (v.length === 6 && bad.length === 0) return { lines: v, warning: '' };
    return {
      lines: null,
      warning: v.length !== 6
        ? `爻值需要正好 6 个数字（当前 ${v.length} 个），本次按随机摇卦。`
        : `爻值只能是 6/7/8/9（收到 ${bad.join('/')}），本次按随机摇卦。`,
    };
  }

  function toNumber(text) {
    const raw = String(text == null ? '' : text).trim();
    if (!raw) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  }

  window.__MPCore = { NEED_ASK, needAsk, parseLines, toNumber };
})();

(function () {
  const CSS = `
.pp,.mp-it,.mp-al,.mp-cg,.mp-cl,.mp-cli,.mp-kline,.mp-mb,.mp-mb-paper,.mp-nm,.mp-quick{--ink:#1b1b1b;--ink2:#3f3a33;--muted:#6f6a60;--label:#8a8378;--faint:#a9a296;
  --line:#c8c1b2;--dimline:#b9b2a4;--hair:#e9e2d3;
  --bg:#f6f1e6;--card:#fffdf8;--band:#fbf7ee;--hover:#f3ede1;--hover2:#ece5d6;
  --tri:#f3e8cd;--soul:#fae4dc;--sel:#fceee7;--link:#f9ece0;
  --red:#b3261e;--red-rgb:179,38,30;--lu:#1f6f3f;--lu-rgb:31,111,63;
  --quan:#8a5a00;--quan-rgb:138,90,0;--ke:#1f4e79;--ke-rgb:31,78,121;--ji:#b3261e;
  --br-good:#4c7a5c;--br-bad:#9c5b56;--on-accent:#fff;--wx-metal:#8a6b1f;
  --tg-bi:#4a6f8a;--tg-shi:#4c7a5c;--tg-cai:#8a6b1f;--tg-guan:#9c5b56;--tg-yin:#6d5f83;
  --ink3:#8a8378;--fx:"Kaiti SC",KaiTi,"STKaiti","Songti SC",serif;--sans:system-ui,-apple-system,"Microsoft YaHei",sans-serif;--kai:"Kaiti SC",KaiTi,"STKaiti",serif;
  --shadow:0 1px 2px rgba(35,28,18,.05),0 18px 40px -30px rgba(35,28,18,.42)}
.pp{border:1px solid var(--line);background:var(--bg);color:var(--ink);font-family:"Songti SC","SimSun","Microsoft YaHei",serif;font-size:12.5px;line-height:1.55;
  border-radius:12px;overflow:hidden;box-shadow:var(--shadow);container-type:inline-size}
@media screen and (prefers-color-scheme:dark){
  .pp,.mp-it,.mp-al,.mp-cg,.mp-cl,.mp-cli,.mp-kline,.mp-mb,.mp-mb-paper,.mp-nm,.mp-quick{--ink:#eae5d9;--ink2:#d5cfc2;--muted:#aca598;--label:#a49c8e;--faint:#928b7e;
    --line:#514a3e;--dimline:#5f5849;--hair:#2f2b23;
    --bg:#12110c;--card:#211f18;--band:#282419;--hover:#2e2a1f;--hover2:#383322;
    --tri:#332913;--soul:#3a231c;--sel:#43271f;--link:#33241c;
    --red:#f08569;--red-rgb:240,133,105;--lu:#74c795;--lu-rgb:116,199,149;
    --quan:#e2a95c;--quan-rgb:226,169,92;--ke:#86bcea;--ke-rgb:134,188,234;--ji:#f08569;
    --br-good:#79c79a;--br-bad:#e09a8c;--on-accent:#14130f;--wx-metal:#dcb273;
    --tg-bi:#93b7cf;--tg-shi:#8fbb9d;--tg-cai:#d3ae62;--tg-guan:#d98d84;--tg-yin:#b4a4d0;
    --ink3:#8b8478;--shadow:0 1px 2px rgba(0,0,0,.5),0 18px 40px -30px rgba(0,0,0,.9)}
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
.pp-soon{margin-left:auto;padding-right:10px;font-size:12px;color:var(--muted)}
.pp-body{display:none}
#ppm-ben:checked~.pp-body.ben,#ppm-da:checked~.pp-body.da,#ppm-ln:checked~.pp-body.ln{display:block}
#ppm-ben:checked~.pp-modes label[for="ppm-ben"],#ppm-da:checked~.pp-modes label[for="ppm-da"],#ppm-ln:checked~.pp-modes label[for="ppm-ln"]{background:var(--red);color:var(--on-accent)}
.pp-tri{background:var(--tri)}
.pp-soul{background:var(--soul)}
.pp-zh{margin-left:4px;white-space:nowrap}
.pp-borrow{font-size:9.5px;color:var(--muted);margin-top:1px;letter-spacing:.02em}

.pp-cell{cursor:pointer;transition:background .14s ease,box-shadow .14s ease;outline:none}
.pp-cell:hover{background:var(--hover)}
.pp-cell:focus-visible{box-shadow:inset 0 0 0 2px var(--red)}
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

.mp-hex{display:block;width:104px;height:12px;flex:0 0 auto;color:var(--ink);overflow:visible}
.mp-hex.hex-on{color:var(--red)}
.mp-hex.dim{color:var(--dimline)}
.mp-hex.sm{width:74px;height:9px}
.mp-hex.md{width:88px;height:10px}
.mp-hy-ln{display:flex;align-items:center;gap:4px;min-width:0}
.mp-hy-mv{flex:0 0 10px;font-style:normal;font-size:11px;line-height:1;color:var(--red);text-align:center}
.mp-wxi{display:inline-block;width:12px;height:12px;vertical-align:-2px;margin-right:3px;flex:0 0 auto}
.mp-trig{display:inline-block;width:14px;height:10px;vertical-align:-1px;margin-right:4px;color:currentColor}

.mp-hy-wrap{display:flex;gap:22px;flex-wrap:wrap;align-items:flex-start}
.mp-hy-box{border:1px solid var(--line);border-radius:10px;background:var(--card);padding:12px 16px 14px;min-width:250px}
.mp-hy-h{display:flex;align-items:baseline;gap:8px;margin-bottom:10px;font-family:system-ui,sans-serif}
.mp-hy-h b{color:var(--red);font-size:14px}
.mp-hy-h span{color:var(--muted);font-size:12px}
.mp-hy{display:flex;flex-direction:column;gap:6px}
.mp-hy-row{display:grid;grid-template-columns:18px 30px 128px 60px 54px 40px;gap:8px;align-items:center;font-size:13px;font-family:system-ui,sans-serif;padding:1px 0}
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
.mp-hexbox{border:1px solid var(--line);border-radius:10px;background:var(--card);padding:12px 15px 13px}
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

.mp-curve{margin-top:8px;border:1px solid var(--line);border-radius:8px;background:var(--card);padding:10px 12px 8px}
.mp-curve-h{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;font-size:12px;color:var(--label);font-family:system-ui,sans-serif;margin-bottom:4px}
.mp-curve-h b{font-size:12.5px;color:var(--ink);font-weight:600}
.mp-curve-h span{font-size:11.5px;color:var(--muted)}
.mp-curve svg{display:block;width:100%;height:auto;overflow:visible}
.mp-curve .cv-band{opacity:.09}
.mp-curve .cv-band.b-good{fill:var(--lu)}
.mp-curve .cv-band.b-bad{fill:var(--red)}
.mp-curve .cv-band.b-flat{fill:var(--muted)}
.mp-curve .cv-ax{stroke:var(--dimline);stroke-width:.6}
.mp-curve .cv-ax.zero{stroke:var(--line);stroke-width:.9}
.mp-curve .cv-lbl{fill:var(--muted);font-size:8px;font-family:system-ui,sans-serif}
.mp-curve .cv-lbl.age{font-size:8.5px}
.mp-curve .cv-dy{fill:none;stroke:var(--quan);stroke-width:1.6;stroke-linejoin:round}
.mp-curve .cv-dyfill{fill:var(--quan);opacity:.10}
.mp-curve .cv-ln{fill:none;stroke:var(--ke);stroke-width:1.4;stroke-linejoin:round;stroke-linecap:round}
.mp-curve .cv-dot{r:2}
.mp-curve .cv-dot.now{r:3.4;stroke:var(--card);stroke-width:1.2}
.mp-curve .cv-legend{display:flex;gap:12px;flex-wrap:wrap;margin-top:5px;font-size:11px;color:var(--muted);font-family:system-ui,sans-serif}
.mp-curve .cv-legend i{display:inline-block;width:14px;height:2px;vertical-align:3px;margin-right:4px}
.mp-curve .cv-tip{font-size:11px;color:var(--muted);line-height:1.6;margin-top:4px}
@media (max-width:520px){.mp-curve .cv-lbl.age{font-size:9px}}
.mp-kline{margin-top:10px;border:1px solid var(--line);border-radius:8px;background:var(--card);padding:10px 12px 9px}
.mp-kline-h{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;font-size:12px;color:var(--label);font-family:system-ui,sans-serif;margin-bottom:2px}
.mp-kline-h b{font-size:12.5px;color:var(--ink);font-weight:600}
.mp-kline-h span{font-size:11.5px;color:var(--muted)}
.mp-kline-fig svg{display:block;width:100%;height:auto;overflow:visible}
.mp-kline .kl-band{fill:var(--ink);opacity:.045}
.mp-kline .kl-grid{stroke:var(--line);stroke-width:.5;stroke-dasharray:1 4;opacity:.7}
.mp-kline .kl-grid.mid{stroke-width:.8;stroke-dasharray:3 3;opacity:.9}
.mp-kline .kl-segline{stroke:var(--dimline);stroke-width:.6;stroke-dasharray:2 3;opacity:.8}
.mp-kline .kl-seg{fill:var(--label);font-size:8.5px;font-family:system-ui,sans-serif;paint-order:stroke;stroke:var(--card);stroke-width:2.2px;stroke-linejoin:round}
.mp-kline .kl-lbl{fill:var(--muted);font-size:8px;font-family:system-ui,sans-serif}
.mp-kline .kl-lbl.age{font-size:8.5px}
.mp-kline .kl-lbl.axis{font-size:8px;letter-spacing:.02em;opacity:.85}
.mp-kline .kl-stripband{fill:var(--ink);opacity:.06;rx:2}
.mp-kline .kl-ma-lbl{font-size:8.5px;font-family:system-ui,sans-serif;paint-order:stroke;stroke:var(--card);stroke-width:2.4px;stroke-linejoin:round;fill:var(--muted)}
.mp-kline .kl-ma-lbl.m5{fill:var(--quan)}
.mp-kline .kl-ma-lbl.m10{fill:var(--ke);opacity:.9}
.mp-kline .kl-stats{display:flex;gap:14px;flex-wrap:wrap;margin-top:6px;font-size:11px;color:var(--muted);font-family:system-ui,sans-serif}
.mp-kline .kl-stats span{display:inline-flex;align-items:baseline;gap:5px}
.mp-kline .kl-stats em{font-style:normal;font-size:10.5px;color:var(--dim)}
.mp-kline .kl-stats b{font-size:12px;font-weight:600;color:var(--ink2);font-variant-numeric:tabular-nums}
.mp-kline .kl-stats b.hi{color:var(--ji)}
.mp-kline .kl-stats b.lo{color:var(--lu)}
.mp-kline .kl-c.up line{stroke:var(--ji);stroke-width:.8;opacity:.8}
.mp-kline .kl-c.up rect{fill:var(--ji);opacity:.92}
.mp-kline .kl-c.down line{stroke:var(--lu);stroke-width:.8;opacity:.8}
.mp-kline .kl-c.down rect{fill:var(--lu);opacity:.92}
.mp-kline .kl-c:hover rect{opacity:1}
.mp-kline .kl-ma{fill:none;stroke-linejoin:round;stroke-linecap:round}
.mp-kline .kl-ma.m5{stroke:var(--quan);stroke-width:1.3}
.mp-kline .kl-ma.m10{stroke:var(--ke);stroke-width:1;opacity:.85}
.mp-kline .kl-mark circle{fill:var(--quan)}
.mp-kline .kl-mark.lo circle{fill:var(--ke)}
.mp-kline .kl-mark .ring{fill:none;stroke:currentColor;stroke-width:.6;opacity:.5}
.mp-kline .kl-mark text{fill:var(--ink2);font-size:9px;font-family:system-ui,sans-serif;paint-order:stroke;stroke:var(--card);stroke-width:2.4px;stroke-linejoin:round}
.mp-kline .kl-legend{display:flex;gap:12px;flex-wrap:wrap;margin-top:6px;font-size:11px;color:var(--muted);font-family:system-ui,sans-serif}
.mp-kline .kl-legend i{display:inline-block;width:9px;height:9px;vertical-align:-1px;margin-right:4px;border-radius:1px}
.mp-kline .kl-legend i.up{background:var(--ji)}
.mp-kline .kl-legend i.down{background:var(--lu)}
.mp-kline .kl-legend i.m5{height:2px;background:var(--quan);vertical-align:3px}
.mp-kline .kl-legend i.m10{height:2px;background:var(--ke);vertical-align:3px}
.kl-segs{display:flex;flex-wrap:wrap;gap:4px 6px;margin-top:8px;font-family:system-ui,sans-serif}
.kl-chip{font-size:11px;color:var(--ink2);border:1px solid var(--hair);border-radius:99px;padding:1px 8px;background:var(--band)}
.kl-chip em{font-style:normal;color:var(--muted);margin-left:5px;font-size:10.5px}
.kl-hls{display:flex;flex-direction:column;gap:3px;margin-top:8px;font-size:11.5px;font-family:system-ui,sans-serif;color:var(--ink2)}
.kl-hl{border-left:2px solid var(--line);padding-left:7px;line-height:1.6}
.kl-hl.hi{border-color:var(--quan)}
.kl-hl.lo{border-color:var(--ke)}
.mp-kline-note{font-size:11px;color:var(--red);line-height:1.6;margin-top:6px}
.mp-kline-tip{font-size:11px;color:var(--muted);line-height:1.6;margin-top:5px}
@media print{.mp-kline{break-inside:avoid}}
.mp-tt{padding:16px}
.mp-tt-head{font-size:12.5px;color:var(--muted);margin-bottom:12px;letter-spacing:.04em}
.mp-tt-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(172px,1fr));gap:10px}
.mp-tt-card{border:1px solid var(--line);border-radius:10px;background:var(--card);padding:13px 14px;display:flex;flex-direction:column;gap:7px;min-height:168px}
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

.mp-it{margin-top:14px;border:1px solid var(--line);background:var(--bg);color:var(--ink);border-radius:12px;overflow:hidden;box-shadow:var(--shadow);
  font-family:"Songti SC","SimSun","Microsoft YaHei",serif;font-size:13px;line-height:1.75}
.mp-it *{box-sizing:border-box}
.mp-it-head{display:flex;align-items:center;gap:9px;flex-wrap:wrap;width:100%;padding:12px 16px;border:none;border-bottom:1px solid var(--line);background:var(--card);color:inherit;font:inherit;font-family:inherit;text-align:left;cursor:pointer;-webkit-appearance:none;appearance:none}
.mp-it-head:hover{background:var(--band)}
.mp-it-head:focus-visible{outline:2px solid var(--red);outline-offset:-3px}
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
.mp-it-focus{margin-left:6px;font-size:12px;color:var(--lu);border:1px solid rgba(var(--lu-rgb),.35);border-radius:999px;padding:1px 9px;font-family:system-ui,sans-serif}
.mp-it-dim.focus{background:linear-gradient(90deg,rgba(var(--lu-rgb),.06),transparent 60%);border-left:2px solid var(--lu);padding-left:10px}
.mp-it-lead{padding:11px 16px;font-size:13px;color:var(--ink2);border-bottom:1px dashed var(--line)}
.mp-it-ans{margin:12px 16px 0;padding:12px 14px;border-left:3px solid var(--red);background:var(--band);font-size:13.5px;line-height:1.9;text-align:justify}
.mp-it-ans b{display:block;font-size:11px;letter-spacing:.12em;color:var(--red);font-family:system-ui,sans-serif;margin-bottom:5px;font-weight:600}
.mp-it-plain{margin:10px 16px 0;padding:11px 14px;border:1px dashed var(--line);border-radius:8px;font-size:13px;line-height:1.9;color:var(--ink2);text-align:justify}
.mp-it-plain b{color:var(--lu);font-weight:600;margin-right:6px}
.mp-it-dplain{margin-bottom:6px;font-size:12.5px;line-height:1.8;color:var(--lu)}
.mp-it-fu{margin:4px 16px 12px;padding:11px 14px;background:var(--band);border-radius:8px}
.mp-it-fu b{display:block;font-size:11px;letter-spacing:.12em;color:var(--label);font-family:system-ui,sans-serif;margin-bottom:6px;font-weight:600}
.mp-it-fu li{font-size:12.5px;line-height:1.85;margin-left:16px;color:var(--ink2)}
.mp-it-gloss{margin:0 16px 12px;font-size:12px;line-height:1.85;color:var(--muted)}
.mp-it-gloss summary{cursor:pointer;font-family:system-ui,sans-serif;letter-spacing:.06em;color:var(--label);margin-bottom:6px}
.mp-it-gloss span{color:var(--ink2);font-weight:600;margin-right:4px}
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
.mp-it-know{margin-top:8px;display:flex;flex-direction:column;gap:6px}
.know-row{display:flex;gap:8px;align-items:flex-start;font-size:12px;line-height:1.8;color:var(--ink2)}
.know-status{flex:none;margin-top:2px;padding:1px 6px;border-radius:4px;font-size:10.5px;letter-spacing:.04em;font-family:system-ui,sans-serif;border:1px solid var(--line);color:var(--muted);white-space:nowrap}
.know-status.settled{color:var(--good)}
.know-status.variant{color:var(--warn)}
.know-status.todo{color:var(--red)}
.know-body b{display:block;font-size:12.5px;color:var(--ink);font-weight:600;margin-bottom:2px}
.know-body i{display:block;font-style:normal;color:var(--muted);font-size:11.5px;margin-top:2px}
.know-body em{display:block;font-style:normal;color:var(--warn);font-size:11.5px;margin-top:2px}
.mp-it-adv b{color:var(--red);font-weight:600;margin-right:7px;font-family:system-ui,sans-serif;font-size:12px;letter-spacing:.1em}
.mp-it-secs{border-top:1px solid var(--line);padding:12px 16px 2px;background:var(--card)}
.mp-it-sec{margin-bottom:11px}
.mp-it-sh{font-size:13px;font-weight:700;color:var(--lu);letter-spacing:.06em;margin-bottom:4px}
.mp-it-stext{font-size:13px;line-height:1.9;color:var(--ink2);text-align:justify}
.mp-it-sec.tone-good,.mp-it-sec.tone-watch,.mp-it-sec.tone-bad{padding-left:8px}
.mp-it-sec.tone-good{border-left:2px solid var(--lu)}
.mp-it-sec.tone-watch{border-left:2px solid var(--quan)}
.mp-it-sec.tone-bad{border-left:2px solid var(--red)}
.mp-it-sec.tone-good .mp-it-sh{color:var(--lu)}
.mp-it-sec.tone-watch .mp-it-sh{color:var(--quan)}
.mp-it-sec.tone-bad .mp-it-sh{color:var(--red)}
.mp-it-p{margin:0 0 5px}
.mp-it-p:last-child{margin-bottom:0}
.mp-it-p b{color:var(--ink);font-weight:700;letter-spacing:.02em}
.mp-outline{margin:12px 16px 0;border:1px solid var(--line);border-left:3px solid var(--lu);border-radius:8px;background:var(--card);padding:10px 12px}
.mp-outline-h{font-size:12px;font-weight:700;letter-spacing:.12em;color:var(--lu);margin-bottom:6px;font-family:system-ui,sans-serif}
.mp-outline-row{display:grid;grid-template-columns:56px minmax(0,1fr);gap:8px;padding:3px 0;font-size:13px;line-height:1.7;color:var(--ink2)}
.mp-outline-row b{color:var(--label);font-weight:600;font-family:system-ui,sans-serif}
.mp-toc{display:flex;flex-wrap:wrap;gap:6px 10px;margin:10px 16px 0;padding:8px 10px;border:1px dashed var(--line);border-radius:8px;font-size:12px;font-family:system-ui,sans-serif}
.mp-toc a{color:var(--lu);text-decoration:none;border-bottom:1px dotted rgba(var(--lu-rgb),.5)}
.mp-toc a:hover{color:var(--ink)}
.mp-it-ev{margin-top:7px;border:1px solid var(--line);border-radius:6px;background:var(--band);font-size:12px;font-family:system-ui,sans-serif}
.mp-it-ev>summary{cursor:pointer;padding:6px 9px;color:var(--muted);list-style:none}
.mp-it-ev>summary::-webkit-details-marker{display:none}
.mp-it-ev>summary::before{content:'▸ ';color:var(--label)}
.mp-it-ev[open]>summary::before{content:'▾ '}
.mp-it-ev-body{padding:2px 9px 8px;display:flex;flex-direction:column;gap:4px}
.mp-it-ev-item{color:var(--ink2);line-height:1.7;padding-left:12px;position:relative}
.mp-it-ev-item::before{content:'·';position:absolute;left:2px;color:var(--label)}
.mp-it-ev-tech{margin-top:4px;color:var(--label);font-size:11px;letter-spacing:.06em}
.mp-it-conf{font-size:11px;font-family:system-ui,sans-serif;border-radius:999px;padding:1px 8px;margin-left:6px;border:1px solid var(--line);color:var(--muted)}
.mp-it-conf.c-强{color:var(--lu);border-color:rgba(var(--lu-rgb),.4)}
.mp-it-conf.c-中{color:var(--label);border-color:var(--line)}
.mp-it-conf.c-弱{color:var(--red);border-color:rgba(var(--red-rgb),.4)}
.mp-tables{border-top:1px solid var(--line);padding:12px 16px 4px;background:var(--card)}
.mp-table-wrap{margin-bottom:12px}
.mp-table-h{font-size:12px;font-weight:700;letter-spacing:.1em;color:var(--lu);margin-bottom:5px;font-family:system-ui,sans-serif}
.mp-table-scroll{overflow-x:auto;border:1px solid var(--line);border-radius:8px}
.mp-table{width:100%;border-collapse:collapse;font-size:12px;line-height:1.6;color:var(--ink2);font-family:system-ui,sans-serif}
.mp-table th,.mp-table td{padding:5px 9px;text-align:left;vertical-align:top;border-bottom:1px solid var(--line);white-space:nowrap}
.mp-table th{background:var(--band);color:var(--label);font-weight:600;font-size:11px;letter-spacing:.06em}
.mp-table tbody tr:last-child td{border-bottom:none}
.mp-table tbody tr:nth-child(even) td{background:rgba(0,0,0,.02)}
@media print{
  .mp-toc{display:none}
  .mp-it.folded .mp-it-wrap{display:block}
  .mp-table-scroll{overflow:visible}
  .mp-table th,.mp-table td{white-space:normal}
  .mp-table-wrap,.mp-it-sec,.mp-it-dim{break-inside:avoid}
  .mp-table-wrap{page-break-inside:avoid}
}
.mp-fu{margin:12px 16px;border:1px solid var(--line);border-left:3px solid var(--lu);border-radius:8px;background:var(--card);padding:10px 12px;font-size:13px;line-height:1.8;color:var(--ink2)}
.mp-fu.miss{border-left-color:var(--red)}
.mp-fu-h{font-size:12px;font-weight:700;letter-spacing:.08em;color:var(--lu);margin-bottom:4px;font-family:system-ui,sans-serif}
.mp-fu.miss .mp-fu-h{color:var(--red)}
.mp-fu-ev{margin-top:5px;font-size:12px;color:var(--muted);font-family:system-ui,sans-serif}
.mp-quick{margin:12px 16px;border:1px solid var(--line);border-radius:8px;background:var(--card);padding:12px 14px}
.mp-cg{margin:12px 16px;border:1px solid var(--line);border-radius:8px;background:var(--card);padding:12px 14px;font-family:system-ui,sans-serif}
.mp-cg-h{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;margin-bottom:9px}
.mp-cg-h b{font-size:13px;color:var(--ink);font-weight:600}
.mp-cg-h span{font-size:11.5px;color:var(--muted)}
.mp-cg-w{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;background:var(--line);border:1px solid var(--line);border-radius:6px;overflow:hidden}
.mp-cg .cg-cell{background:var(--card);padding:7px 9px}
.mp-cg .cg-cell em{display:block;font-style:normal;font-size:10.5px;color:var(--muted);margin-bottom:2px}
.mp-cg .cg-cell b{font-size:13.5px;color:var(--ink);font-weight:600;font-variant-numeric:tabular-nums}
.mp-cg-tot{display:flex;align-items:baseline;gap:8px;margin:10px 0 4px}
.mp-cg-tot em{font-style:normal;font-size:11px;color:var(--muted)}
.mp-cg-tot b{font-size:19px;color:var(--lu);font-weight:700;letter-spacing:.02em}
.mp-cg-tot i{font-style:normal;font-size:10.5px;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:1px 7px}
.mp-cg-song{margin-top:8px;padding:10px 12px;border-left:3px solid var(--quan);background:var(--band);border-radius:0 6px 6px 0}
.mp-cg-song-h{font-size:11px;color:var(--muted);margin-bottom:5px}
.mp-cg-verse{font-family:var(--kai,system-ui),serif;font-size:15px;line-height:2;color:var(--ink);letter-spacing:.03em}
.mp-cg-verse span{display:block}
.mp-cg-miss{color:var(--muted);font-size:12.5px}
.mp-cg-plain{margin-top:7px;font-size:12.5px;line-height:1.85;color:var(--ink2)}
.mp-cg-plain em,.mp-cg-band em{font-style:normal;font-size:10.5px;color:var(--muted);border:1px solid var(--line);border-radius:3px;padding:0 4px;margin-right:6px;vertical-align:1px}
.mp-cg-band{margin-top:8px;font-size:12.5px;line-height:1.8;color:var(--ink2)}
.mp-cg-note{margin-top:9px;padding-top:8px;border-top:1px dashed var(--line);font-size:11px;line-height:1.7;color:var(--muted)}
@media print{.mp-cg{break-inside:avoid}}
@media (max-width:640px){.mp-cg-w{grid-template-columns:repeat(2,minmax(0,1fr))}}
.mp-quick-h{font-size:13px;color:var(--lu);margin-bottom:6px;font-family:system-ui,sans-serif}
.mp-cli{margin:10px 0;padding:10px 12px;border:1px solid var(--line);border-radius:10px;background:var(--card)}
.mp-cli-h{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--ink)}
.mp-cli-h b{font-size:13px}
.mp-cli-k{font-weight:700;color:var(--lu)}
.mp-cli-p{margin-left:auto;font-size:11.5px;color:var(--quan);background:var(--bg);border:1px solid var(--line);border-radius:999px;padding:1px 8px}
.mp-cli-bar{position:relative;margin:9px 0 4px;height:8px;border-radius:999px;background:linear-gradient(90deg,var(--quan) 0%,var(--line) 50%,var(--ji) 100%)}
.mp-cli-bar i{position:absolute;top:-3px;width:14px;height:14px;margin-left:-7px;border-radius:50%;background:var(--card);border:2px solid var(--ink);box-shadow:0 0 0 2px var(--card)}
.mp-cli-axis{display:flex;justify-content:space-between;font-size:11px;color:var(--ink3);margin-bottom:8px}
.mp-cli-row{display:flex;flex-wrap:wrap;gap:6px 10px;align-items:center;font-size:12.5px;color:var(--ink2)}
.mp-cli-row em{font-style:normal;color:var(--ink3)}
.mp-cli-row b{color:var(--ink)}
.mp-cli-narr{margin-top:8px;font-size:13px;line-height:1.85;color:var(--ink2);border-left:2px solid var(--quan);padding-left:9px}
.mp-qt{margin-top:10px;padding-top:9px;border-top:1px dashed var(--line)}
.mp-qt-h{display:flex;gap:8px;align-items:baseline;font-size:12.5px}
.mp-qt-h b{color:var(--ink);letter-spacing:.02em}
.mp-qt-h span{color:var(--ink2)}
.mp-qt-y{display:flex;gap:6px;align-items:center;margin-top:6px;font-size:12.5px;color:var(--ink2);flex-wrap:wrap}
.mp-qt-y em{font-style:normal;color:var(--ink3)}
.mp-qt-y b{font-family:var(--fx);font-size:15px;color:var(--lu);font-weight:600;line-height:1.1}
.mp-qt-y b.first{color:var(--ji);border-bottom:2px solid var(--ji);padding-bottom:1px}
.mp-qt-q{margin-top:6px;font-size:12.5px;line-height:1.8;color:var(--ink2);font-family:var(--fx)}
.mp-qt-q span{display:block;font-size:11px;color:var(--ink3);font-family:var(--sans);margin-top:2px}
.mp-cl{margin-top:12px;padding:10px 12px 8px;border-left:2px solid var(--quan);border-radius:0 8px 8px 0;
  background:color-mix(in srgb,var(--band) 72%,transparent)}
.mp-cl-h{display:flex;gap:8px;align-items:baseline;font-size:12.5px;margin-bottom:7px}
.mp-cl-h b{color:var(--ink);letter-spacing:.06em}
.mp-cl-h span{color:var(--ink3);font-size:11.5px}
.mp-cl-e{padding:8px 0;border-top:1px dashed var(--hair)}
.mp-cl-e:first-of-type{border-top:0;padding-top:0}
.mp-cl-t b{font-family:var(--fx);font-size:13px;color:var(--lu);font-weight:600;letter-spacing:.03em}
.mp-cl-q{font-family:var(--fx);font-size:14px;line-height:2;color:var(--ink);margin-top:3px;letter-spacing:.02em;
  padding-left:1.05em;text-indent:-1.05em}
.mp-cl-p{font-size:12px;line-height:1.9;color:var(--ink2);margin-top:3px}
@media print{.mp-cl{break-inside:avoid}}
@media print{.mp-cli{break-inside:avoid}}
.mp-nm{margin:12px 16px;border:1px solid var(--line);border-radius:8px;background:var(--card);padding:12px 14px;font-family:system-ui,sans-serif}
.mp-nm-h{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;border-bottom:1px solid var(--hair);padding-bottom:8px;margin-bottom:10px}
.mp-nm-h b{font-size:17px;color:var(--ink);font-weight:700}
.mp-nm-h i{font-style:normal;font-size:12px;color:var(--muted)}
.mp-nm-row{display:grid;grid-template-columns:52px 1fr;gap:10px;align-items:start;padding:8px 0;border-bottom:1px dashed var(--hair)}
.mp-nm-row:last-of-type{border-bottom:0}
.mp-nm-ch{font-size:30px;line-height:1.1;font-family:var(--fx);text-align:center;color:var(--ink)}
.mp-nm-b{min-width:0}
.mp-nm-t{display:flex;align-items:center;gap:7px;flex-wrap:wrap;font-size:12.5px;color:var(--ink2)}
.mp-nm-el{font-size:11.5px;border:1px solid currentColor;border-radius:999px;padding:0 7px;line-height:1.7}
.mp-nm-fit{font-size:11px;border-radius:999px;padding:0 7px;line-height:1.7;border:1px solid var(--line);color:var(--muted)}
.mp-nm-fit.ok{color:var(--lu);border-color:var(--lu)}
.mp-nm-fit.no{color:var(--ji);border-color:var(--ji)}
.mp-nm-m{margin-top:3px;font-size:12.5px;line-height:1.75;color:var(--ink2)}
.mp-nm-sug{margin-top:4px;font-size:12px;color:var(--muted)}
.mp-nm-sug b{font-weight:600;color:var(--ink2);margin-right:4px}
.mp-nm-sug span{white-space:nowrap;margin-right:7px}
.mp-nm-verd{margin-top:10px;padding:8px 10px;border-left:2px solid var(--quan);background:var(--band);font-size:12.5px;line-height:1.8;color:var(--ink2)}
.mp-nm-note{margin-top:8px;font-size:11.5px;line-height:1.8;color:var(--faint)}
.mp-nm-cand{margin-top:6px;border-top:1px solid var(--hair)}
.mp-nm-els{display:flex;gap:4px;align-items:center}
.mp-nm-c{display:grid;grid-template-columns:104px max-content minmax(0,1fr);gap:9px;align-items:center;padding:7px 0;border-bottom:1px dashed var(--hair);font-size:13.5px;color:var(--ink)}
.mp-nm-c:last-child{border-bottom:0}
.mp-nm-c b{font-family:var(--fx);font-size:16.5px;font-weight:600;white-space:nowrap;letter-spacing:.5px}
.mp-nm-c em{font-style:normal;font-size:11.5px;line-height:1.7;color:var(--muted);font-family:var(--sans)}
.mp-nm-wu{margin-top:10px;border-top:1px solid var(--hair);padding-top:9px}
.mp-nm-wu-h{display:flex;align-items:baseline;gap:9px;font-size:12.5px;color:var(--ink2)}
.mp-nm-wu-h b{font-weight:700;letter-spacing:.18em}
.mp-nm-wu-h i{font-style:normal;font-size:11px;color:var(--faint)}
.mp-nm-wu-rows{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px;margin:7px 0 6px}
.mp-nm-wu-c{border:1px solid var(--line);border-radius:6px;padding:5px 6px;text-align:center;background:var(--band)}
.mp-nm-wu-c em{display:block;font-style:normal;font-size:10.5px;color:var(--muted);letter-spacing:.06em}
.mp-nm-wu-c b{display:block;font-size:16px;line-height:1.35;color:var(--ink);font-family:var(--sans)}
.mp-nm-wu-c i{display:block;font-style:normal;font-size:10px;line-height:1.5;color:var(--faint);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mp-nm-wu-c.is-ok{border-color:var(--lu)}
.mp-nm-wu-c.is-ok b{color:var(--lu)}
.mp-nm-wu-c.is-half{border-color:var(--quan)}
.mp-nm-wu-c.is-half b{color:var(--quan)}
.mp-nm-wu-c.is-bad b{color:var(--ji)}
.mp-nm-ph{margin-top:9px;font-size:12.5px;line-height:1.8;color:var(--ink2)}
.mp-nm-ph b{font-weight:700;letter-spacing:.18em;margin-right:6px}
.mp-nm-ph em{font-style:normal;color:var(--muted);margin-left:6px;font-family:var(--sans);font-size:11.5px}
.mp-nm-ph-lv{font-size:11px;border-radius:999px;padding:0 7px;line-height:1.7;border:1px solid var(--line);color:var(--muted)}
.mp-nm-ph-lv.ok{color:var(--lu);border-color:var(--lu)}
.mp-nm-ph-lv.warn{color:var(--quan);border-color:var(--quan)}
.mp-nm-ph-lv.bad{color:var(--ji);border-color:var(--ji)}
.mp-nm-ph-i{display:inline-block;margin:2px 6px 0 0;font-size:11.5px;color:var(--muted)}
.mp-nm-ph-i:before{content:'·';margin-right:3px;color:var(--faint)}
@media print{.mp-nm{break-inside:avoid}}
.mp-quick-pre{margin:0;white-space:pre-wrap;word-break:break-word;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:13px;line-height:1.9;color:var(--ink2)}
.mp-fs .mp-quick-h{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}
.mp-fs-sub{font-size:11.5px;color:var(--muted);font-family:var(--sans)}
.mp-fs-chips{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 10px}
.mp-fs-chip{font-size:11.5px;line-height:1.8;border:1px solid var(--line);border-radius:999px;padding:0 9px;color:var(--muted);background:var(--band);font-family:var(--sans)}
.mp-fs-chip.ok{color:var(--lu);border-color:color-mix(in srgb,var(--lu) 40%,var(--line))}
.mp-fs-key{margin:0 0 6px;font-size:11px;color:var(--faint);font-family:var(--sans)}
.mp-fs-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:var(--line);border:1px solid var(--line);border-radius:6px;overflow:hidden;margin-bottom:10px}
.mp-fs-cell{background:var(--card);padding:7px 9px;display:flex;flex-direction:column;gap:6px;min-height:56px}
.mp-fs-cell.center{background:var(--band)}
.mp-fs-top{display:flex;align-items:baseline;gap:6px;min-width:0}
.mp-fs-gua{font-family:var(--fx);font-size:15px;font-weight:700;line-height:1;color:var(--ink)}
.mp-fs-dir{font-size:10.5px;color:var(--muted);font-family:var(--sans);white-space:nowrap}
.mp-fs-star{margin-left:auto;font-size:12px;color:var(--ink2);font-family:var(--sans);white-space:nowrap}
.mp-fs-star em{font-style:normal;font-size:10px;margin-left:4px;padding:0 5px;border:1px solid currentColor;border-radius:999px;line-height:1.6;vertical-align:1px}
.mp-fs-star em.ok{color:var(--lu)}
.mp-fs-star em.bad{color:var(--ji)}
.mp-fs-nums{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;font-family:var(--sans);font-variant-numeric:tabular-nums}
.mp-fs-nums span{text-align:center;font-size:13px;line-height:1.7;border:1px solid var(--hair);border-radius:4px;color:var(--ink2)}
.mp-fs-nums span.on{background:var(--tri);border-color:var(--quan);color:var(--quan);font-weight:700}
.mp-fs-facts{margin:0;display:flex;flex-direction:column;gap:4px}
.mp-fs-row{display:grid;grid-template-columns:64px minmax(0,1fr);gap:8px;font-size:12px;line-height:1.75}
.mp-fs-row dt{margin:0;color:var(--muted);font-family:var(--sans)}
.mp-fs-row dd{margin:0;color:var(--ink2);word-break:break-word}
.mp-fs-note{margin-top:9px;padding-top:8px;border-top:1px dashed var(--line);font-size:11px;line-height:1.7;color:var(--muted)}
@media print{.mp-fs{break-inside:avoid}}
@media (max-width:420px){.mp-fs-cell{padding:6px}.mp-fs-gua{font-size:14px}.mp-fs-nums span{font-size:12px}}
.mp-mb{margin:12px 16px;border:1px solid var(--line);border-radius:12px;background:var(--card);box-shadow:var(--shadow);overflow:hidden;font-family:var(--sans)}
.mp-mb-h{display:flex;flex-direction:row;align-items:center;gap:14px;flex-wrap:wrap;padding:15px 18px 14px;
  background:linear-gradient(135deg,var(--sel),var(--band) 64%,var(--card));border-bottom:1px solid var(--hair)}
.mp-mb-code{font-family:var(--fx);font-size:32px;font-weight:700;line-height:1;letter-spacing:.12em;color:var(--ink)}
.mp-mb-meta{display:flex;flex-direction:column;gap:3px;min-width:0}
.mp-mb-meta b{font-size:14.5px;font-weight:600;color:var(--ink);letter-spacing:.04em}
.mp-mb-meta i{font-style:normal;font-size:12px;line-height:1.5;color:var(--muted)}
.mp-mb-count{margin-left:auto;padding:3px 10px;border:1px solid var(--line);border-radius:999px;background:var(--card);color:var(--muted);font-size:11.5px;white-space:nowrap}
.mp-mb-body{padding:14px 18px 16px}
.mp-mb-dims{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.mp-mb-dim{border:1px solid var(--hair);border-radius:10px;background:var(--band);padding:9px 11px 10px}
.mp-mb-dh{display:flex;align-items:baseline;gap:6px;font-size:11.5px;color:var(--muted)}
.mp-mb-dh b{font-family:var(--fx);font-size:17px;font-weight:600;line-height:1.1;letter-spacing:.08em;color:var(--faint)}
.mp-mb-dh b.on{color:var(--ink)}
.mp-mb-dh em{font-style:normal;margin:0 auto;font-size:11.5px;letter-spacing:.06em}
.mp-mb-bar{position:relative;height:7px;border-radius:4px;background:var(--hair);margin:7px 0 6px;overflow:hidden}
.mp-mb-bar::after{content:"";position:absolute;left:50%;top:-1px;bottom:-1px;width:1px;background:color-mix(in srgb,var(--line) 70%,transparent)}
.mp-mb-bar em{position:absolute;top:0;bottom:0;background:linear-gradient(90deg,var(--quan),color-mix(in srgb,var(--quan) 55%,var(--card)));border-radius:4px}
.mp-mb-bar.l em{left:0}
.mp-mb-bar.r em{right:0;background:linear-gradient(270deg,var(--quan),color-mix(in srgb,var(--quan) 55%,var(--card)))}
.mp-mb-df{font-size:11.5px;color:var(--ink2);font-variant-numeric:tabular-nums}
.mp-mb-ds{margin-top:2px;font-size:11.5px;line-height:1.7;color:var(--muted)}
.mp-mb-sec{margin-top:11px;font-size:12.5px;line-height:1.85;color:var(--ink2)}
.mp-mb-sec em{display:inline-block;margin-right:7px;padding:0 7px;border:1px solid var(--hair);border-radius:5px;background:var(--band);color:var(--muted);font-size:11px;font-style:normal;letter-spacing:.08em}
.mp-mb-two{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:11px}
.mp-mb-two>div{border:1px solid var(--hair);border-left:3px solid var(--br-good);border-radius:8px;background:var(--card);padding:8px 10px;font-size:12.5px;line-height:1.8;color:var(--ink2)}
.mp-mb-two>div+div{border-left-color:var(--br-bad)}
.mp-mb-two b{display:block;margin-bottom:2px;font-size:11.5px;font-weight:600;letter-spacing:.08em;color:var(--br-good)}
.mp-mb-two>div+div b{color:var(--br-bad)}
.mp-mb-fn{display:flex;flex-wrap:wrap;gap:6px;margin-top:7px}
.mp-mb-fn span{font-size:11.5px;border:1px solid var(--line);border-radius:999px;background:var(--card);padding:2px 9px;color:var(--ink2)}
.mp-mb-fn span.lead{border-color:var(--quan);background:color-mix(in srgb,var(--quan) 9%,var(--card));color:var(--quan);font-weight:600}
.mp-mb-fn span b{font-weight:600;margin-right:4px}
.mp-mb-note{margin:12px 18px 14px;padding-top:10px;font-size:11px;line-height:1.7;color:var(--muted);border-top:1px solid var(--hair)}
.mp-mb-paper{margin:12px 16px;border:1px solid var(--line);border-radius:12px;background:var(--card);box-shadow:var(--shadow);overflow:hidden;font-family:var(--sans)}
.mp-mb-paper ol{counter-reset:q;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px 20px;
  margin:0;padding:12px 18px 14px;list-style:none;font-size:12.5px;line-height:1.7;color:var(--ink2)}
.mp-mb-paper li{counter-increment:q;position:relative;padding:0 0 6px 26px;border-bottom:1px dashed var(--hair)}
.mp-mb-paper li::before{content:counter(q);position:absolute;left:0;top:1px;display:flex;align-items:center;justify-content:center;
  width:19px;height:19px;border:1px solid var(--hair);border-radius:50%;background:var(--band);color:var(--muted);font-size:10.5px;font-variant-numeric:tabular-nums}
.mp-mb-paper .mp-mb-note{margin:0 18px 14px}
@media (max-width:640px){.mp-mb-dims,.mp-mb-two,.mp-mb-paper ol{grid-template-columns:1fr}.mp-mb-code{font-size:26px}.mp-mb-body{padding:12px 14px 14px}.mp-mb-h{padding:13px 14px 12px}}
@media print{.mp-mb{break-inside:avoid}}
.mp-al{margin:12px 16px;border:1px solid var(--line);border-radius:8px;background:var(--card);padding:12px 14px;font-family:system-ui,sans-serif}
.mp-al-h{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;border-bottom:1px solid var(--hair);padding-bottom:8px;margin-bottom:9px}
.mp-al-h b{font-size:18px;color:var(--ink);font-weight:700;font-variant-numeric:tabular-nums}
.mp-al-h i{font-style:normal;font-size:12px;color:var(--muted)}
.mp-al-gz{font-size:12.5px;color:var(--ink2);margin-bottom:9px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.mp-al-badge{font-size:11px;border:1px solid var(--line);border-radius:999px;padding:1px 8px}
.mp-al-badge.good{color:var(--lu);border-color:var(--lu)}
.mp-al-badge.bad{color:var(--ji);border-color:var(--ji)}
.mp-al-yiji{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:6px 0 9px}
.mp-al-col em,.mp-al-row>em{font-style:normal;font-size:10.5px;color:var(--muted);display:block;margin-bottom:4px}
.mp-al-chips{display:flex;flex-wrap:wrap;gap:4px}
.mp-al-chip{font-size:11.5px;padding:1px 7px;border:1px solid var(--line);border-radius:999px;color:var(--ink2);white-space:nowrap}
.mp-al-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;background:var(--line);border:1px solid var(--line);border-radius:6px;overflow:hidden;margin:8px 0}
.mp-al-cell{background:var(--card);padding:6px 8px;min-width:0}
.mp-al-cell em{display:block;font-style:normal;font-size:10.5px;color:var(--muted);margin-bottom:2px}
.mp-al-cell b{font-size:12.5px;color:var(--ink);font-weight:600;line-height:1.45;display:block}
.mp-al-row{margin:9px 0}
.mp-al-hours{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px}
.mp-al-hour{display:flex;align-items:baseline;gap:3px;border:1px solid var(--hair);border-radius:5px;padding:3px 6px;font-size:11px;color:var(--ink2);background:var(--band)}
.mp-al-hour i{font-style:normal;font-weight:600;color:var(--ink)}
.mp-al-hour em{font-style:normal;color:var(--muted)}
.mp-al-hour b{font-weight:500}
.mp-al-hour u{text-decoration:none;margin-left:auto;font-size:10.5px}
.mp-al-hour.good{border-color:var(--lu);color:var(--lu)}
.mp-al-hour.good i{color:var(--lu)}
.mp-al-hour.bad{border-color:var(--hair)}
.mp-al-hour.bad u{color:var(--ji)}
.mp-al-hex{margin-top:8px;font-size:12px;color:var(--ink2)}
.mp-al-hex b{color:var(--quan)}
.mp-al-note{margin-top:9px;padding-top:8px;border-top:1px dashed var(--line);font-size:11px;line-height:1.7;color:var(--muted)}
@media print{.mp-al{break-inside:avoid}}
@media (max-width:640px){.mp-al{margin:10px;padding:10px}.mp-al-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.mp-al-yiji{grid-template-columns:1fr}}.mp-quick-pre{margin:0;white-space:pre-wrap;word-break:break-word;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:13px;line-height:1.9;color:var(--ink2)}
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
  .mp-hex{width:100%;max-width:104px;min-width:56px;height:12px;flex:1 1 auto}
  .mp-hex.sm{max-width:74px;min-width:52px;height:10px}
  .mp-hex.md{max-width:88px;min-width:56px;height:11px}
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
  .mp-hex{width:100%;max-width:104px;min-width:56px;height:12px;flex:1 1 auto}
  .mp-hex.sm{max-width:74px;min-width:52px;height:10px}
  .mp-hex.md{max-width:88px;min-width:56px;height:11px}
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

  const hexBar = (yang, moving, size) => {
    const W = 104, H = 12, bh = 7, y = (H - bh) / 2, r = 1.6;
    const gap = 18, seg = Math.round((W - gap) / 2);
    const bars = yang
      ? `<rect x="0" y="${y}" width="${W}" height="${bh}" rx="${r}" fill="currentColor"/>`
      : `<rect x="0" y="${y}" width="${seg}" height="${bh}" rx="${r}" fill="currentColor"/>`
        + `<rect x="${seg + gap}" y="${y}" width="${W - seg - gap}" height="${bh}" rx="${r}" fill="currentColor"/>`;
    return `<svg class="mp-hex${moving ? ' hex-on' : ''}${size ? ' ' + size : ''}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true" focusable="false">${bars}</svg>`;
  };

  const WX_ICON = {
    木: 'M6 1.6V10.8M6 5.2 2.6 2.2M6 7.4 9.4 4.4',
    火: 'M6 1.4C7.6 3.6 9.2 5.4 9.2 7.6A3.2 3.2 0 0 1 2.8 7.6C2.8 5.4 4.4 3.6 6 1.4Z',
    土: 'M1.6 9.6h8.8M6 2.4v7.2M3.4 5.6h5.2',
    金: 'M6 1.2 10.6 6 6 10.8 1.4 6Z',
    水: 'M1.4 7.2C2.9 4.2 4.5 10.2 6 7.2 7.5 4.2 9.1 10.2 10.6 7.2',
  };
  const wxIcon = (el) => {
    const d = WX_ICON[el];
    if (!d) return '';
    return `<svg class="mp-wxi" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="${d}" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  };

  const triGlyph = (name) => {
    const bits = (TRI_BITS[name] || [0, 0, 0]).slice().reverse();
    const rows = bits.map((b, i) => {
      const y = i * 4;
      return b
        ? `<rect x="0" y="${y}" width="14" height="2" rx="0.6" fill="currentColor"/>`
        : `<rect x="0" y="${y}" width="5.6" height="2" rx="0.6" fill="currentColor"/>`
          + `<rect x="8.4" y="${y}" width="5.6" height="2" rx="0.6" fill="currentColor"/>`;
    }).join('');
    return `<svg class="mp-trig" viewBox="0 0 14 10" aria-hidden="true" focusable="false">${rows}</svg>`;
  };

  pp._hexBar = hexBar;
  pp._wxIcon = wxIcon;
  pp._triGlyph = triGlyph;

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
        <div class="ct-t2">农历 ${r.lunar.year}年${r.lunar.isLeap ? `闰${r.lunar.monthRaw || r.lunar.month}` : r.lunar.month}月${r.lunar.day}日${r.hourBranch}时${r.lunar.isLeap && r.lunar.monthRaw && r.lunar.month !== r.lunar.monthRaw ? `（按${r.lunar.month}月起盘）` : ''}</div>
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
    const flyHTML = r.flyChains ? (() => {
      const chips = ['禄', '权', '科', '忌'].map((t) => {
        const ch = r.flyChains[t];
        if (!ch || !ch.steps.length) return '';
        const path = ch.path.map((p) => String(p).replace(/宫$/, '')).join('→');
        const tip = ch.steps.map((s) => `${s.from}（${s.fromStem}）化${t}${s.star}→${s.to}`).join('；');
        const cls = t === '忌' ? 'warn' : t === '禄' ? 'ok' : '';
        return `<span class="pp-chip ${cls}" title="${esc(tip)}">飞${t} ${esc(path)}${ch.closed ? '↺' : ''}</span>`;
      }).join('');
      return chips ? `<div class="pp-chips">${chips}</div>` : '';
    })() : '';
    const flyCompositeHTML = r.flyComposite && Array.isArray(r.flyComposite.labels) && r.flyComposite.labels.length
      ? `<div class="pp-chips">${r.flyComposite.labels.map((l) => {
        const cls = /忌/.test(l) ? 'warn' : /自化/.test(l) ? '' : 'ok';
        const palaceOf = (x) => String(x).replace(/^.*?会/, '').replace(/^禄忌同宫/, '').replace(/自化$/, '');
        const hit = (r.flyComposite.targets || []).find((t) => t.palace === palaceOf(l));
        const tip = hit ? hit.incoming.map((x) => `${x.from}化${x.type}${x.star}`).join('、') : r.flyComposite.note;
        return `<span class="pp-chip ${cls}" title="${esc(tip)}">三方四正 ${esc(l)}</span>`;
      }).join('')}</div>` : '';

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
    </div>${flowHTML}${chips}${flyHTML}${flyCompositeHTML}${pats}${dxs}${lnHit}`;
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
      const mv = l.moving
        ? `<i class="mp-hy-mv" title="动爻">${yang ? '○' : '×'}</i>`
        : '<i class="mp-hy-mv"></i>';
      return `<div class="mp-hy-row">
        ${sh}
        <span class="mp-hy-nm">${l.name || POS_NAME[l.position - 1]}</span>
        <span class="mp-hy-ln">${hexBar(yang, l.moving)}${mv}</span>
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
    const bodyLabels = (r.body && Array.isArray(r.body.labels)) ? r.body.labels : [];
    const bodyRow = bodyLabels.length
      ? `<div class="pp-chips">${bodyLabels.map((l) => {
        const cls = /伏吟/.test(l) ? 'warn' : /反吟/.test(l) ? 'warn' : /化退神/.test(l) ? 'warn' : /六冲|散/.test(l) ? '' : 'ok';
        return `<span class="pp-chip ${cls}">${esc(l)}</span>`;
      }).join('')}</div>`
      : `<div class="pp-chips"><span class="pp-chip">卦体无六冲、六合、伏吟、反吟</span></div>`;
    const ug = r.useGod && r.useGod.liuqin ? r.useGod : null;
    const useRow = ug
      ? `<div class="pp-chips">${ug.labels.map((l) => {
        const cls = /空亡|退神|受克|泄气|不上卦/.test(l) ? 'warn'
          : /持世|化进|六合|得飞神生/.test(l) ? 'ok' : '';
        return `<span class="pp-chip ${cls}">${esc(l)}</span>`;
      }).join('')}</div>`
      : `<div class="pp-chips"><span class="pp-chip">用神未取（未指明所问之事）</span></div>`;
    const st = r.useGodStrength && Array.isArray(r.useGodStrength.labels) ? r.useGodStrength : null;
    const strengthRow = st && st.labels.length
      ? `<div class="pp-chips">${st.labels.map((l) => {
        const cls = /死|囚|月破|受日辰克|泄|耗/.test(l) ? 'warn'
          : /旺|相|得日辰生|比和/.test(l) ? 'ok' : '';
        return `<span class="pp-chip ${cls}">${esc(l)}</span>`;
      }).join('')}</div>`
      : '';
    const fu = r.fushenAccess && Array.isArray(r.fushenAccess.labels) ? r.fushenAccess : null;
    const fushenRow = fu && fu.labels.length
      ? `<div class="pp-chips">${fu.labels.map((l) => {
        const cls = /可出/.test(l) ? 'ok' : /受压难出|有助有压/.test(l) ? 'warn' : '';
        return `<span class="pp-chip ${cls}">伏神${esc(l)}</span>`;
      }).join('')}</div>`
      : '';
    const jp = r.jinTuiPower && Array.isArray(r.jinTuiPower.labels) ? r.jinTuiPower : null;
    const jinRow = jp && jp.labels.length
      ? `<div class="pp-chips">${jp.labels.map((l) => {
        const cls = /后劲足|退得缓/.test(l) ? 'ok' : /有限|进得虚|退得实|月破|未定/.test(l) ? 'warn' : '';
        return `<span class="pp-chip ${cls}">${esc(l)}</span>`;
      }).join('')}</div>`
      : '';
    const hs = r.hexStrength && Array.isArray(r.hexStrength.labels) ? r.hexStrength : null;
    const hexRow = hs && hs.labels.length
      ? `<div class="pp-chips">${hs.labels.map((l) => {
        const cls = /死|囚|月破|冲空/.test(l) ? 'warn'
          : /旺|相/.test(l) ? 'ok' : '';
        return `<span class="pp-chip ${cls}">${esc(l)}</span>`;
      }).join('')}</div>`
      : '';
    return `<div class="pp" style="padding:14px">
      <div class="mp-mh-head">起卦 ${r.cast.notation.join('、')}（自下而上）　日辰 ${r.dayGanZhi.name}</div>
      <div class="mp-hy-wrap">${ben}${bian}</div>
      ${bodyRow}
      ${useRow}
      ${strengthRow}
      ${fushenRow}
      ${jinRow}
      ${hexRow}
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
      <div class="mp-trib-h">${label} ${triGlyph(tri)}${tri}${TRI_EL(tri)}<span class="mp-tritag ${isBody ? 'tritag-ti' : 'tritag-yong'}">${isBody ? '体' : '用'}</span></div>
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

  pp.qimenFactsHTML = function (r) {
    if (!r || !r.palaces) return '';
    const row = (k, v) => `<div class="relation__row"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`;
    const stateCell = (g) => {
      if (!g) return '—';
      const parts = ['旺', '相', '休', '囚', '死'].filter((k) => Array.isArray(g[k]) && g[k].length)
        .map((k) => `${k} ${g[k].join('、')}`);
      return parts.join('；') || '—';
    };
    const rows = [
      ['局数', `${r.ju}${r.yuan ? `（${r.yuan}）` : ''}`],
      ['节气', `${r.jieqi || '—'}${r.jieqiTime ? `（${r.jieqiTime}）` : ''}`],
      ['四柱', `${r.siZhu ? `${r.siZhu.year} ${r.siZhu.month} ${r.siZhu.day} ${r.siZhu.time}` : '—'}`],
      ['值符', r.zhiFu ? `${r.zhiFu.star} · ${r.zhiFu.gong}宫` : '—'],
      ['值使', r.zhiShi ? `${r.zhiShi.gate} · ${r.zhiShi.gong}宫` : '—'],
      ['旬首', r.xunshou || '—'],
      ['空亡', (r.kongWang || []).join('') || '—'],
      ['驿马', r.ma && r.ma.zhi ? `${r.ma.zhi}${r.ma.gong ? `（${r.ma.gong}宫）` : ''}` : '—'],
      ['换局规则', r.juMethodNote || r.juMethod || '—'],
      ['晚子时', r.lateZiHourMode === 'next-day' ? '23:00 后归次日' : '23:00 后仍归当日'],
      ['击刑', (r.conditions && r.conditions.jiXing && r.conditions.jiXing.length)
        ? r.conditions.jiXing.map((x) => `${x.palace}宫${x.stem}`).join('、') : '本盘无'],
      ['入墓', (r.conditions && r.conditions.ruMu && r.conditions.ruMu.length)
        ? r.conditions.ruMu.map((x) => `${x.palace}宫${x.stem}`).join('、') : '本盘无'],
      ['月令', r.month && r.month.branch ? `${r.month.branch}（${r.month.element}）` : '—'],
      ['门旺衰', stateCell(r.states && r.states.gate)],
      ['星旺衰', stateCell(r.states && r.states.star)],
      ['干旺衰', stateCell(r.states && r.states.stem)],
      ['干宫生克', (() => {
        const order = ['干克宫', '宫克干', '干生宫', '宫生干', '比和'];
        const g = {};
        for (const p of r.palaces || []) {
          const rel = p.stemRelation || null;
          if (!rel || rel.type === 'unknown' || !p.tianPan) continue;
          (g[rel.type] = g[rel.type] || []).push(p.tianPan);
        }
        return order.filter((k) => g[k]).map((k) => k + ' ' + g[k].join('、')).join('；') || '—';
      })()],
    ];
    return `<dl class="relation mp-qm-facts" aria-label="奇门盘面事实">${rows.map(([k, v]) => row(k, v)).join('')}</dl>`;
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
        <div class="pp-qm-bot"><span class="dim">${(p.stemRelation && p.stemRelation.type !== 'unknown') ? p.stemRelation.type : ''}</span><span class="dim">${p.stemState || ''}</span></div>
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

  pp.curveHTML = function (r) {
    const dyList = (r && r.dayun && Array.isArray(r.dayun.list)) ? r.dayun.list : [];
    const lnList = (r && Array.isArray(r.liunian)) ? r.liunian : [];
    if (dyList.length < 2) return '';

    const num = (v) => (typeof v === 'number' && isFinite(v) ? v : 0);
    const dyScore = (d) => (d.luck ? num(d.luck.score) : 0);

    const VMAX = 4.2;
    const VMIN = -2.2;
    const startAge = num(r.dayun.startAge && r.dayun.startAge.years);
    const dyEnd = dyList.length
      ? dyList[dyList.length - 1].startAge + 10
      : startAge + 80;
    const lnAges = lnList.map((l) => num(l.age)).filter((a) => a > 0);
    const a0 = Math.min(startAge, ...(lnAges.length ? lnAges : [startAge]));
    const a1 = Math.max(dyEnd, ...(lnAges.length ? lnAges : [dyEnd]));
    const span = Math.max(1, a1 - a0);

    const W = 640, H = 190;
    const M = { t: 14, r: 16, b: 26, l: 30 };
    const pw = W - M.l - M.r;
    const ph = H - M.t - M.b;
    const X = (age) => M.l + ((age - a0) / span) * pw;
    const Y = (v) => M.t + ph - ((Math.max(VMIN, Math.min(VMAX, v)) - VMIN) / (VMAX - VMIN)) * ph;

    const BANDS = [
      { from: 1.2, to: VMAX, cls: 'b-good' },
      { from: 0.55, to: 1.2, cls: 'b-good' },
      { from: -0.8, to: 0.55, cls: 'b-flat' },
      { from: -1.45, to: -0.8, cls: 'b-bad' },
      { from: VMIN, to: -1.45, cls: 'b-bad' },
    ];
    const bands = BANDS.map((b) =>
      `<rect class="cv-band ${b.cls}" x="${M.l}" y="${Y(b.to).toFixed(1)}" width="${pw}" height="${(Y(b.from) - Y(b.to)).toFixed(1)}"/>`).join('');

    const stepW = (10 / span) * pw;
    const dyPts = [];
    dyList.forEach((d, i) => {
      const a = num(d.startAge);
      const v = dyScore(d);
      const xL = Math.max(M.l, X(a));
      const xR = Math.min(M.l + pw, X(a + 10));
      dyPts.push(`${xL.toFixed(1)},${Y(v).toFixed(1)}`);
      dyPts.push(`${xR.toFixed(1)},${Y(v).toFixed(1)}`);
    });
    const dyLine = dyPts.length
      ? `<polyline class="cv-dy" points="${dyPts.join(' ')}"/>` : '';
    const dyFill = dyPts.length
      ? `<polygon class="cv-dyfill" points="${M.l},${(M.t + ph).toFixed(1)} ${dyPts.join(' ')} ${(M.l + pw).toFixed(1)},${(M.t + ph).toFixed(1)}"/>` : '';

    const lnPts = lnList
      .filter((l) => l.luck && typeof l.luck.score === 'number')
      .map((l) => ({ x: X(num(l.age)), y: Y(num(l.luck.score)), y0: num(l.year), gz: l.ganzhi, tier: l.luck.tier, v: num(l.luck.score), age: num(l.age) }));
    const lnLine = lnPts.length > 1
      ? `<polyline class="cv-ln" points="${lnPts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')}"/>` : '';

    const TIER_FILL = { 大吉: 'var(--lu)', 吉: 'var(--lu)', 平: 'var(--muted)', 忌: 'var(--red)', 大忌: 'var(--red)' };
    const curYear = lnPts.length ? Math.min(...lnPts.map((p) => p.y0)) : null;
    const dots = lnPts.map((p) => {
      const isNow = p.y0 === curYear;
      return `<circle class="cv-dot${isNow ? ' now' : ''}" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" fill="${TIER_FILL[p.tier] || 'var(--muted)'}"><title>${esc(`${p.y0}年（${p.age}岁）${p.gz}　${p.tier} ${p.v}`)}</title></circle>`;
    }).join('');

    const axes = `<line class="cv-ax zero" x1="${M.l}" y1="${Y(0).toFixed(1)}" x2="${M.l + pw}" y2="${Y(0).toFixed(1)}"/>`
      + `<line class="cv-ax" x1="${M.l}" y1="${M.t}" x2="${M.l}" y2="${M.t + ph}"/>`;
    const tickStep = span > 60 ? 10 : 5;
    const ticks = [];
    for (let a = Math.ceil(a0 / tickStep) * tickStep; a <= a1; a += tickStep) {
      ticks.push(`<text class="cv-lbl age" x="${X(a).toFixed(1)}" y="${(M.t + ph + 13).toFixed(1)}" text-anchor="middle">${a}岁</text>`);
    }
    const yLabels = `<text class="cv-lbl" x="${(M.l - 5).toFixed(1)}" y="${(Y(2.4) + 3).toFixed(1)}" text-anchor="end">吉</text>`
      + `<text class="cv-lbl" x="${(M.l - 5).toFixed(1)}" y="${(Y(0) + 3).toFixed(1)}" text-anchor="end">平</text>`
      + `<text class="cv-lbl" x="${(M.l - 5).toFixed(1)}" y="${(Y(-1.8) + 3).toFixed(1)}" text-anchor="end">忌</text>`;

    const sorted = dyList.slice().sort((a, b) => dyScore(b) - dyScore(a));
    const best = sorted[0];
    const worst = sorted[sorted.length - 1];
    const mark = best && dyScore(best) > 0.55
      ? `<text class="cv-lbl" x="${X(num(best.startAge) + 5).toFixed(1)}" y="${(Y(dyScore(best)) - 5).toFixed(1)}" text-anchor="middle">▲${best.startAge}岁 ${best.luck.tier}</text>` : '';
    const markLo = worst && dyScore(worst) < -0.8
      ? `<text class="cv-lbl" x="${X(num(worst.startAge) + 5).toFixed(1)}" y="${(Y(dyScore(worst)) + 11).toFixed(1)}" text-anchor="middle">▼${worst.startAge}岁 ${worst.luck.tier}</text>` : '';

    const legend = `<div class="cv-legend">
      <span><i style="background:var(--quan)"></i>大运（阶梯，一步十年）</span>
      <span><i style="background:var(--ke)"></i>流年（逐年折线）</span>
      <span>绿带＝吉　灰带＝平　红带＝忌</span>
    </div>`;

    const tip = `<div class="cv-tip">曲线只呈现引擎已给出的行运评分（${VMIN} ~ ${VMAX}），不预测具体事件；档位与依据见下方「大运 / 流年」各节。悬停看逐年详情。</div>`;

    return `<div class="mp-curve">
      <div class="mp-curve-h"><b>人生运势曲线</b><span>${a0}–${a1} 岁　${r.dayun.rule}，${startAge} 岁起运${(r.dayun.jiao && r.dayun.jiao.at) ? `，交运 ${r.dayun.jiao.at}` : ''}</span></div>
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="人生运势曲线：${a0} 到 ${a1} 岁的大运与流年评分走势">
        ${bands}${axes}${dyFill}${dyLine}${lnLine}${dots}${ticks.join('')}${yLabels}${mark}${markLo}
      </svg>
      ${legend}${tip}
    </div>`;
  };

  let klineSeq = 0;
  pp.trendChart = function (r) {
    const pts = r && Array.isArray(r.points) ? r.points : [];
    if (pts.length < 2) return '';
    const segs = r && Array.isArray(r.segments) ? r.segments : [];
    const num = (v) => (typeof v === 'number' && isFinite(v) ? v : 0);
    const W = 720, H = 322;
    const M = { t: 34, r: 46, b: 66, l: 36 };
    const pw = W - M.l - M.r, ph = H - M.t - M.b;
    const n = pts.length;
    const step = pw / n;
    const X = (i) => M.l + (i + 0.5) * step;
    const Y = (v) => M.t + ph - (Math.max(0, Math.min(100, v)) / 100) * ph;
    const bodyW = Math.max(1.1, Math.min(10, step * 0.62));
    const sc = (p) => num(p.score);
    const yb = M.t + ph;
    const stripTop = yb + 20, stripH = 22;
    const clipId = `klclip${(klineSeq += 1)}`;

    const bands = segs.map((s, i) => {
      const i0 = Math.max(0, s.startAge - 1);
      const i1 = Math.min(n - 1, s.endAge - 1);
      if (i1 < i0) return '';
      const x = M.l + i0 * step;
      const w = Math.max(0.6, (i1 - i0 + 1) * step);
      const tint = i % 2 === 1;
      const rect = tint
        ? `<rect class="kl-band" x="${x.toFixed(1)}" y="${M.t}" width="${w.toFixed(1)}" height="${ph}"/>`
        + `<rect class="kl-stripband" x="${x.toFixed(1)}" y="${stripTop}" width="${w.toFixed(1)}" height="${stripH}"/>` : '';
      const line = i === 0 ? ''
        : `<line class="kl-segline" x1="${x.toFixed(1)}" y1="${M.t}" x2="${x.toFixed(1)}" y2="${yb}"/>`;
      const cx = Math.min(Math.max(M.l + ((i0 + i1 + 1) / 2) * step, M.l + 22), M.l + pw - 22);
      return rect + line
        + `<text class="kl-seg" x="${cx.toFixed(1)}" y="${(stripTop + 15).toFixed(1)}" text-anchor="middle">${esc(s.ganZhi)}</text>`;
    }).join('');

    const grid = [0, 25, 50, 75, 100].map((v) =>
      `<line class="kl-grid${v === 50 ? ' mid' : ''}" x1="${M.l}" y1="${Y(v).toFixed(1)}" x2="${M.l + pw}" y2="${Y(v).toFixed(1)}"/>`
      + `<text class="kl-lbl" x="${M.l - 6}" y="${(Y(v) + 3).toFixed(1)}" text-anchor="end">${v}</text>`).join('');

    const candles = pts.map((p, i) => {
      const k = p.kline || {};
      const o = num(k.open), c = num(k.close), hi = Math.min(100, num(k.high)), lo = Math.max(0, num(k.low));
      const up = c >= o;
      const yO = Y(o), yC = Y(c);
      const top = Math.min(yO, yC);
      const h = Math.max(0.8, Math.abs(yO - yC));
      const x = X(i);
      const title = `${p.age}岁（${p.year}年 ${p.ganZhi}）${c}分${p.dayunGanZhi ? ` · ${p.dayunGanZhi}运` : ''}`;
      return `<g class="kl-c${up ? ' up' : ' down'}"><title>${esc(title)}</title>`
        + `<line x1="${x.toFixed(2)}" y1="${Y(hi).toFixed(1)}" x2="${x.toFixed(2)}" y2="${Y(lo).toFixed(1)}"/>`
        + `<rect x="${(x - bodyW / 2).toFixed(2)}" y="${top.toFixed(1)}" width="${bodyW.toFixed(2)}" height="${h.toFixed(1)}" rx="0.7"/></g>`;
    }).join('');

    const maSeries = (win) => {
      const out = [];
      for (let i = 0; i < n; i++) {
        if (i + 1 < win) continue;
        let sum = 0;
        for (let j = i + 1 - win; j <= i; j++) sum += sc(pts[j]);
        out.push({ i, v: sum / win });
      }
      return out;
    };
    const maPath = (win) => maSeries(win)
      .map((q, k) => `${k ? 'L' : 'M'}${X(q.i).toFixed(1)} ${Y(q.v).toFixed(1)}`).join(' ');
    const maLabel = (win, cls) => {
      const s = maSeries(win);
      if (!s.length) return '';
      const last = s[s.length - 1];
      return { cls, y: Y(last.v), text: `<text class="kl-ma-lbl ${cls}" x="${M.l + pw + 5}" y="${Y(last.v).toFixed(1)}" text-anchor="start">${last.v.toFixed(0)}</text>` };
    };
    const lab10 = maLabel(10, 'm10'), lab5 = maLabel(5, 'm5');
    const maLabels = (() => {
      if (!lab5 || !lab10) return `${lab10 ? lab10.text : ''}${lab5 ? lab5.text : ''}`;
      let y5 = lab5.y, y10 = lab10.y;
      if (Math.abs(y5 - y10) < 10) {
        const top = Math.min(y5, y10), bot = Math.max(y5, y10);
        y5 = top - 6; y10 = bot + 6;
      }
      return `<text class="kl-ma-lbl m10" x="${M.l + pw + 5}" y="${y10.toFixed(1)}" text-anchor="start">${maSeries(10).slice(-1)[0].v.toFixed(0)}</text>`
        + `<text class="kl-ma-lbl m5" x="${M.l + pw + 5}" y="${y5.toFixed(1)}" text-anchor="start">${maSeries(5).slice(-1)[0].v.toFixed(0)}</text>`;
    })();

    let hiP = pts[0], loP = pts[0];
    for (const p of pts) {
      if (sc(p) > sc(hiP)) hiP = p;
      if (sc(p) < sc(loP)) loP = p;
    }
    const mark = (p, cls, dy) => {
      const i = pts.indexOf(p);
      const x = X(i), y = Y(sc(p));
      const tx = Math.min(Math.max(x, M.l + 26), M.l + pw - 26);
      const d = cls === 'hi' ? (y - 8 < M.t + 6 ? 14 : dy) : (y + 12 > M.t + ph - 2 ? -8 : dy);
      return `<g class="kl-mark ${cls}"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2"/>`
        + `<circle class="ring" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.6"/>`
        + `<text x="${tx.toFixed(1)}" y="${(y + d).toFixed(1)}" text-anchor="middle">${p.age}岁 ${sc(p)}</text></g>`;
    };

    const tickStep = n > 60 ? 10 : 5;
    const ages = pts.filter((p) => p.age % tickStep === 0).map((p) =>
      `<text class="kl-lbl age" x="${X(pts.indexOf(p)).toFixed(1)}" y="${(yb + 14).toFixed(1)}" text-anchor="middle">${p.age}</text>`).join('');
    const xNote = `<text class="kl-lbl axis" x="${M.l}" y="${(H - 6).toFixed(1)}">年龄（岁）</text>`
      + `<text class="kl-lbl axis" x="${M.l + pw}" y="${(H - 6).toFixed(1)}" text-anchor="end">每岁一分 · 满分 100</text>`;

    const legend = `<div class="kl-legend"><span><i class="up"></i>阳线：比上一岁高</span>`
      + `<span><i class="down"></i>阴线：比上一岁低</span>`
      + `<span><i class="m5"></i>5 年均线</span><span><i class="m10"></i>10 年均线</span>`
      + '<span>虚线＝大运交界</span></div>';

    return `<div class="mp-kline-fig">
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="人生K线：1 到 ${n} 岁的逐年评分蜡烛图">
        <defs><clipPath id="${clipId}"><rect x="${M.l}" y="${M.t}" width="${pw}" height="${ph}"/></clipPath></defs>
        ${bands}${grid}
        <g clip-path="url(#${clipId})">
          ${candles}
          <path class="kl-ma m10" d="${maPath(10)}"/><path class="kl-ma m5" d="${maPath(5)}"/>
        </g>
        ${maLabels}
        ${mark(hiP, 'hi', -8)}${mark(loP, 'lo', 12)}
        ${ages}${xNote}
      </svg>${legend}</div>`;
  };

  pp.trendHTML = function (r) {
    if (!r) return '';
    const chart = pp.trendChart(r);
    if (!chart) return pp.quickHTML(r);
    const segs = Array.isArray(r.segments) ? r.segments : [];
    const hl = (r.highlights && typeof r.highlights === 'object') ? r.highlights : {};
    const meta = r.meta || {};
    const st = meta.strength || {};
    const chips = segs.map((s) => `<span class="kl-chip">${esc(s.ganZhi)}<em>${s.startAge}–${s.endAge}</em></span>`).join('');
    const best = (Array.isArray(hl.best) ? hl.best : []).map((x) => `<div class="kl-hl hi">${esc(x)}</div>`).join('');
    const worst = (Array.isArray(hl.worst) ? hl.worst : []).map((x) => `<div class="kl-hl lo">${esc(x)}</div>`).join('');
    const note = meta.boundaryNote ? `<div class="mp-kline-note">${esc(meta.boundaryNote)}</div>`
      : (hl.suppressed ? `<div class="mp-kline-note">${esc(hl.suppressed)}</div>` : '');
    const pts = Array.isArray(r.points) ? r.points : [];
    const scoreOf = (p) => (typeof p.score === 'number' && isFinite(p.score) ? p.score : 0);
    const scores = pts.map(scoreOf);
    const mean = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    const span = scores.length ? Math.max(...scores) - Math.min(...scores) : 0;
    const segAvg = segs.map((s) => {
      const inside = pts.filter((p) => p.age >= s.startAge && p.age <= s.endAge).map(scoreOf);
      return { ganZhi: s.ganZhi, v: inside.length ? inside.reduce((a, b) => a + b, 0) / inside.length : 0 };
    }).filter((x) => x.v > 0).sort((a, b) => b.v - a.v);
    const blocked = !!(st.boundary || hl.suppressed);
    const statCells = [`<span><em>全段均值</em><b>${mean.toFixed(0)}</b></span>`];
    if (!blocked && segAvg.length) {
      statCells.push(`<span><em>最好大运</em><b class="hi">${esc(segAvg[0].ganZhi)} ${segAvg[0].v.toFixed(0)}</b></span>`);
      statCells.push(`<span><em>最差大运</em><b class="lo">${esc(segAvg[segAvg.length - 1].ganZhi)} ${segAvg[segAvg.length - 1].v.toFixed(0)}</b></span>`);
    }
    statCells.push(`<span><em>波动幅度</em><b>${span.toFixed(0)}</b></span>`);
    const stats = `<div class="kl-stats">${statCells.join('')}</div>`;
    return `<section class="mp-kline" aria-label="人生K线结果">
      <div class="mp-kline-h"><b>人生 K 线</b><span>${esc(meta.birth || '')}　日主 ${esc(meta.dayMaster || '')}　${esc(st.level || '')}${st.score ? `（${st.score}）` : ''}</span></div>
      ${chart}
      ${stats}
      ${chips ? `<div class="kl-segs">${chips}</div>` : ''}
      ${best || worst ? `<div class="kl-hls">${best}${worst}</div>` : ''}
      ${note}
      <div class="mp-kline-tip">逐岁分数由大运与流年十神按固定表确定性计分（1–100），只表五行力量的顺逆，不预测具体事件；旺衰落在换档阈值附近时，不出高低年份结论。</div>
    </section>`;
  };

  pp.chengguHTML = function (r) {
    if (!r) return '';
    const w = r.weights || {};
    const song = r.song || {};
    const cells = ['year', 'month', 'day', 'hour'].map((k) => {
      const x = w[k] || { label: '', qian: 0 };
      const name = String(x.label || '').split(' ')[0] || '';
      const val = String(x.label || '').split(' ')[1] || '';
      return `<div class="cg-cell"><em>${esc(name)}</em><b>${esc(val)}</b></div>`;
    }).join('');
    const verse = String(song.text || '');
    const lines = verse ? verse.replace(/[。]$/, '').split('；').map((s, i) => `<span>${esc(s)}${i === 0 ? '；' : '。'}</span>`).join('') : '';
    const band = r.verdict && r.verdict.band ? r.verdict.band : '';
    return `<section class="mp-cg" aria-label="称骨结果">
      <div class="mp-cg-h"><b>称骨</b><span>${esc(r.lunar && r.lunar.text ? r.lunar.text : '')}</span></div>
      <div class="mp-cg-w">${cells}</div>
      <div class="mp-cg-tot"><em>骨重合计</em><b>${esc(r.total && r.total.label ? r.total.label : '')}</b>${band ? `<i>${esc(band)}</i>` : ''}</div>
      <div class="mp-cg-song"><div class="mp-cg-song-h">称骨歌 · ${esc(r.total && r.total.label ? r.total.label : '')}</div>
        <div class="mp-cg-verse">${lines || '<span class="mp-cg-miss">该骨重未见通行本歌诀</span>'}</div>
        <div class="mp-cg-plain"><em>释义</em>${esc(song.plain || '')}</div></div>
      ${r.verdict && r.verdict.text ? `<div class="mp-cg-band"><em>分档</em>${esc(r.verdict.text)}</div>` : ''}
      <div class="mp-cg-note">骨重与歌诀为通行本口径（各版本歌诀有异文，断句标点已统一）；释义为白话自撰，只作字面直解，属民俗娱乐参考，不构成命运断言。</div>
    </section>`;
  };

  pp.nameHTML = function (r) {
    if (!r) return '';
    const ELC = { 木: 'wood', 火: 'fire', 土: 'earth', 金: 'metal', 水: 'water' };
    const elChip = (e) => (e === '未收录'
      ? '<span class="mp-nm-el">未收录</span>'
      : `<span class="mp-nm-el wx-${ELC[e] || 'earth'}">${esc(e)}</span>`);
    const head = (title, sub) => `<div class="mp-nm-h"><b>${esc(title)}</b>${sub ? `<i>${esc(sub)}</i>` : ''}</div>`;
    if (r.action === 'generate') {
      const fav = r.bazi && r.bazi.favorable ? r.bazi.favorable.join('、') : '';
      const cands = (r.candidates || []).map((c) => {
        const wu = c.wuge && c.wuge.available
          ? (() => {
            const good = c.wuge.rows.filter((x) => x.level === '吉').length;
            const bad = c.wuge.rows.filter((x) => x.level === '凶').length;
            const cls = bad === 0 && good >= 4 ? ' ok' : bad >= 2 ? ' no' : '';
            return `<span class="mp-nm-fit${cls}" title="${esc(c.wuge.summary)}">五格 ${good}/5 吉</span>`;
          })()
          : '';
        const ph = c.phonetics && c.phonetics.available
          ? `<span class="mp-nm-fit${c.phonetics.level === '拗口' ? ' no' : c.phonetics.level === '顺口' ? ' ok' : ''}" title="${esc((c.phonetics.issues || []).map((x) => x.text).join('；'))}">${esc(c.phonetics.level)}</span>`
          : '';
        return `<div class="mp-nm-c"><b>${esc(c.name)}</b><span class="mp-nm-els">${c.chars.map((x) => elChip(x.element)).join('')}${wu}${ph}</span><em>${esc(c.chars.map((x) => x.char + '·' + x.meaning).join('　'))}</em></div>`;
      }).join('');
      return `<section class="mp-nm" aria-label="候选名">
        ${head('候选名', `姓 ${r.surname}（${r.gender}）${fav ? `　喜用 ${fav}` : ''}`)}
        <div class="mp-nm-cand">${cands}</div>
        <div class="mp-nm-note">${(r.notes || []).map((n) => '※ ' + esc(n)).join('<br>')}</div>
      </section>`;
    }
    const rows = (r.chars || []).map((c) => {
      const fit = c.favorable === true ? '<span class="mp-nm-fit ok">合喜用</span>'
        : c.favorable === false ? '<span class="mp-nm-fit no">不合喜用</span>'
          : '<span class="mp-nm-fit">不判</span>';
      const src = c.source === 'user' ? '用户指定' : c.source === 'lib' ? '字库' : '未收录';
      const sug = c.suggest && c.suggest.length
        ? `<div class="mp-nm-sug"><b>可换</b>${c.suggest.map((x) => `<span class="wx-${ELC[x.element] || 'earth'}">${esc(x.char)}（${esc(x.element)}）</span>`).join('')}</div>`
        : '';
      return `<div class="mp-nm-row"><div class="mp-nm-ch">${esc(c.char)}</div>
        <div class="mp-nm-b"><div class="mp-nm-t">${elChip(c.element)}<span>${esc(src)}</span>${fit}</div>
        <div class="mp-nm-m">${esc(c.meaning)}</div>${sug}</div></div>`;
    }).join('');
    const bz = r.bazi
      ? `<div class="mp-nm-m">八字：${esc(r.bazi.dayMaster && r.bazi.dayMaster.stem ? `${r.bazi.dayMaster.stem}（${r.bazi.dayMaster.element}）` : String(r.bazi.dayMaster || ''))}　${esc(r.bazi.strength ? `${r.bazi.strength.level}（${r.bazi.strength.score}）` : '')}　喜用 ${esc((r.bazi.favorable || []).join('、'))}</div>
         <div class="mp-nm-m">${esc(r.bazi.basis || '')}</div>`
      : '';
    const LV = (x) => (x === '吉' ? 'is-ok' : x === '半吉' ? 'is-half' : 'is-bad');
    const wu = r.wuge && r.wuge.available
      ? `<div class="mp-nm-wu">
          <div class="mp-nm-wu-h"><b>五格</b><i>康熙笔画 · 通行本 81 数理</i></div>
          <div class="mp-nm-wu-rows">${r.wuge.rows.map((x) => `<div class="mp-nm-wu-c ${LV(x.level)}"><em>${esc(x.key)}</em><b>${x.strokes}</b><i>${esc(`${x.level} · ${x.name}`)}</i></div>`).join('')}</div>
          <div class="mp-nm-m">笔画：${r.wuge.strokes.map((x) => `${esc(x.char)}${x.strokes}${x.source === 'user' ? '（指定）' : ''}`).join(' ＋ ')}</div>
          <div class="mp-nm-m">三才：${esc(r.wuge.sancai.text)}</div>
        </div>`
      : `<div class="mp-nm-wu"><div class="mp-nm-wu-h"><b>五格</b><i>这一版算不了</i></div><div class="mp-nm-m">${esc(r.wuge ? r.wuge.reason : '未算')}</div></div>`;
    const ph = r.phonetics && r.phonetics.available
      ? `<div class="mp-nm-ph"><b>音韵</b><span class="mp-nm-ph-lv${r.phonetics.level === '顺口' ? ' ok' : r.phonetics.level === '拗口' ? ' bad' : ' warn'}">${esc(r.phonetics.level)}</span><em>${esc(r.phonetics.chars.map((x) => `${x.py}${x.tone}`).join(' '))}　声调 ${esc(r.phonetics.tonePattern)}</em>${(r.phonetics.issues || []).map((x) => `<span class="mp-nm-ph-i">${esc(x.text)}</span>`).join('')}</div>`
      : `<div class="mp-nm-ph"><b>音韵</b><em>${esc(r.phonetics ? r.phonetics.reason : '未算')}</em></div>`;
    return `<section class="mp-nm" aria-label="名字评估">
      ${head(r.fullName || '', `字库 ${r.stats && r.stats.libSize ? r.stats.libSize : ''} 字${r.stats && r.stats.unknown ? `　未收录 ${r.stats.unknown}` : ''}`)}
      ${rows}
      ${bz}
      ${wu}
      ${ph}
      <div class="mp-nm-verd">${esc(r.verdict || '')}</div>
      <div class="mp-nm-note">${(r.notes || []).map((n) => '※ ' + esc(n)).join('<br>')}</div>
    </section>`;
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
    const el = (e) => `<span class="wx-${ELC[e] || 'earth'}">${wxIcon(e)}${e}</span>`;
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
    const wx = Object.entries(r.wuxing).map(([k, v]) => `<span class="pp-chip wx-${ELC[k]}">${wxIcon(k)}${k} ${v}</span>`).join('');

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
    const cli = r.climate || (fr.yongshen && fr.yongshen.climate) || null;
    const cliCard = cli ? (() => {
      const pct = Math.max(2, Math.min(98, Math.round(((Number(cli.temp) || 0) + 3) / 6 * 100)));
      const need = cli.need ? `<em>调候取</em><b>${esc(cli.need.stem + cli.need.element)}</b>` : '<em>气候平和</em>';
      const avoid = cli.need ? `<em>忌</em><b>${esc(cli.avoidElement)}</b>` : '';
      const ev = (cli.evidence || []).length ? `<em>依据</em><span>${esc(cli.evidence.join('、'))}</span>` : '';
      const pri = cli.priority === '调候优先' ? '<span class="mp-cli-p">调候优先</span>' : '<span class="mp-cli-p">扶抑为主</span>';
      const qt = r.frame && r.frame.yongshen && r.frame.yongshen.qt;
      const qtCard = qt ? `<div class="mp-qt">
          <div class="mp-qt-h"><b>穷通宝鉴</b><span>${esc(qt.label)}</span></div>
          <div class="mp-qt-y"><em>用神</em>${qt.yong.map((y, i) => `<b class="${i === 0 ? 'first' : ''}">${esc(y)}</b>`).join('')}<em>首取 ${esc(qt.primary)}</em></div>
          <div class="mp-qt-q" title="${esc(qt.quote)}">「${esc(qt.quote)}」<span>第 ${qt.chapter} 章${qt.note ? ' · ' + esc(qt.note) : ''}</span></div>
        </div>` : '';
      return `<section class="mp-cli" aria-label="寒暖燥湿">
        <div class="mp-cli-h"><b>寒暖燥湿</b><span class="mp-cli-k">${esc(cli.label || '')}</span>${pri}</div>
        <div class="mp-cli-bar" title="寒 ← → 热"><i style="left:${pct}%"></i></div>
        <div class="mp-cli-axis"><span>寒</span><span>平</span><span>热</span></div>
        <div class="mp-cli-row">${need}${avoid}${ev}</div>
        <div class="mp-cli-narr">${esc(cli.narration || '')}</div>
        ${qtCard}
      </section>`;
    })() : '';
    const gods = fr.godStats ? `<div class="pp-chips">${Object.entries(fr.godStats.groups).map(([k, v]) => `<span class="pp-chip">${k} ${v}</span>`).join('')}</div>` : '';

    const dy = r.dayun.list.map((d) => {
      const lk = d.luck || null;
      return `<span class="pp-chip ${lk ? tierCls(lk.tier) : ''}" title="${esc(`${d.fromDate ? `${d.fromDate} 交运；` : ''}${lk ? `${lk.tier} ${lk.score}｜${(lk.reasons || []).join('；')}` : ''}`)}">${d.startAge} ${d.ganzhi}${(d.relations && d.relations.length) ? ` <i class="pp-drel">${d.relations.join('')}</i>` : ''}${lk ? ` ${lk.tier}` : ''}</span>`;
    }).join('');
    const ln = (r.liunian && r.liunian.length) ? `<div class="pp-chips">${r.liunian.slice(0, 8).map((l) => {
      const lk = l.luck || null;
      const sy = (l.suiyun && Array.isArray(l.suiyun.signals)) ? l.suiyun.signals : [];
      const syTip = sy.length ? `｜${sy.map((x) => x.detail).join('；')}` : '';
      return `<span class="pp-chip ${lk ? tierCls(lk.tier) : ''}" title="${esc(lk ? `${lk.tier} ${lk.score}｜${(lk.reasons || []).join('；')}${syTip}` : syTip.replace(/^｜/, ''))}">${l.year} ${l.ganzhi}${lk ? ` ${lk.tier}` : ''}</span>`;
    }).join('')}</div>` : '';
    const sy = (r.liunian || []).filter((l) => l.suiyun && Array.isArray(l.suiyun.signals) && l.suiyun.signals.length);
    const syRow = sy.length ? `<div class="pp-tl pp-dim">岁运提示（只标干支变动，不判吉凶）</div><div class="pp-chips">${sy.map((l) =>
      `<span class="pp-chip" title="${esc(`${l.suiyun.signals.map((x) => x.detail).join('；')}｜${l.suiyun.note || ''}`)}">${l.year} ${esc(l.suiyun.signals.map((x) => `${x.type}${x.type.startsWith('流年') && x.target ? `·${x.target}` : ''}`).join('/'))}</span>`).join('')}</div>` : '';
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
      ${cliCard}
      ${(Array.isArray(r.classics) && r.classics.length) ? `<section class="mp-cl" aria-label="古籍原文">
        <div class="mp-cl-h"><b>古籍原文</b><span>照录通行本，释义为白话自撰</span></div>
        ${r.classics.map((e) => `<div class="mp-cl-e">
          <div class="mp-cl-t"><b>${esc(({ ziping: '子平真诠', ditian: '滴天髓', sanming: '三命通会' }[e.book] || e.book) + '·' + e.chapter)}</b></div>
          <div class="mp-cl-q">「${esc(e.quote)}」</div>
          <div class="mp-cl-p">${esc(e.plain)}</div>
        </div>`).join('')}
      </section>` : ''}
      ${sect('五行与十神', `<div class="pp-chips">${wx}</div>${gods}`)}
      ${sect('大运', `${pp.curveHTML(r)}<div class="pp-chips">${dy}</div>`)}
      ${ln ? sect('流年', ln + syRow) : ''}
      ${r.palaces ? sect('胎元与命身宫', `<div class="pp-chips">
        <span class="pp-chip" title="${r.palaces.taiyuan.note}">胎元 ${r.palaces.taiyuan.ganzhi}</span>
        <span class="pp-chip" title="${r.palaces.minggong.note}">命宫 ${r.palaces.minggong.ganzhi}</span>
        <span class="pp-chip" title="${r.palaces.shengong.note}">身宫 ${r.palaces.shengong.ganzhi}</span>
      </div>`) : ''}
      ${ssx}
      <div style="margin-top:8px;font-size:12px;color:var(--muted)">上一节 ${r.jieqi.previous.name} ${r.jieqi.previous.time}　下一节 ${r.jieqi.next.name} ${r.jieqi.next.time}　${r.dayun.rule}，${r.dayun.startAge.years}岁起运${(r.dayun.jiao && r.dayun.jiao.at) ? `（交运 ${r.dayun.jiao.at}，${r.dayun.jiao.frame}）` : ''}</div>
    </div>`;
  };

  const MT_LABEL = { natal: '命盘解析', divination: '卦象解析', card: '牌阵解析' };

  pp.interpretHTML = function (it, opt) {
    if (!it) return '';
    const hasBody = (it.dimensions && it.dimensions.length) || (it.sections && it.sections.length);
    if (!hasBody && !it.error && !it.answer) return '';
    const folded = !!(opt && opt.folded);
    const dims = (it.dimensions || []).map((d, i) => `<div class="mp-it-dim${d.focused ? ' focus' : ''}">
      <div class="mp-it-dh"><span class="mp-it-dno">${i + 1}</span><span class="mp-it-dlabel">${esc(d.label)}</span>${d.focused ? '<span class="mp-it-focus">最贴近你的问题</span>' : ''}${d.confidence ? `<span class="mp-it-conf c-${esc(d.confidence)}">置信度 ${esc(d.confidence)}</span>` : ''}</div>
      ${d.plain ? `<div class="mp-it-dplain">${esc(d.plain)}</div>` : ''}
      <div class="mp-it-dtext">${esc(d.text)}</div>
      ${(d.evidence && d.evidence.length) ? `<details class="mp-it-ev"><summary>依据 · ${esc(d.evidence.length)} 条盘面事实</summary><div class="mp-it-ev-body">${d.evidence.map((x) => `<span class="mp-it-ev-item">${esc(x)}</span>`).join('')}<span class="mp-it-ev-tech">技法：${esc(it.technique || it.systemLabel || '')}</span></div></details>` : ''}
      ${(d.knowledge && d.knowledge.length) ? `<div class="mp-it-know">${d.knowledge.map((k) => `<div class="know-row"><span class="know-status ${k.status}">${esc(k.statusLabel)}</span><span class="know-body"><b>${esc(k.gist)}</b>${esc(k.detail)}${k.source ? `<i>出处：${esc(k.source)}</i>` : ''}${k.note ? `<em>注：${esc(k.note)}</em>` : ''}</span></div>`).join('')}</div>` : ''}
      ${d.advice ? `<div class="mp-it-adv"><b>建议</b>${esc(d.advice)}</div>` : ''}
    </div>`).join('');
    const outline = (it.outline && it.outline.length)
      ? `<div class="mp-outline"><div class="mp-outline-h">一页读懂</div>${it.outline.map((o) => `<div class="mp-outline-row"><b>${esc(o.label)}</b><span>${esc(o.text)}</span></div>`).join('')}</div>`
      : '';
    const toc = (it.sections && it.sections.length)
      ? `<nav class="mp-toc" aria-label="报告目录">${it.sections.map((s) => `<a href="#mp-sec-${esc(s.key)}">${esc(s.label)}</a>`).join('')}</nav>`
      : '';
    const tables = (it.tables && it.tables.length)
      ? `<div class="mp-tables">${it.tables.filter((t) => Array.isArray(t.rows) && t.rows.length).map((t) => `<div class="mp-table-wrap">
          <div class="mp-table-h">${esc(t.title)}</div>
          <div class="mp-table-scroll"><table class="mp-table">
            <thead><tr>${t.columns.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead>
            <tbody>${t.rows.map((row) => `<tr>${row.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody>
          </table></div>
        </div>`).join('')}</div>`
      : '';
    const richText = (text) => String(text || '')
      .split('\n')
      .map((line) => `<div class="mp-it-p">${esc(line).replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')}</div>`)
      .join('');
    const secs = (it.sections && it.sections.length)
      ? `<div class="mp-it-secs">${it.sections.map((s) => `<div class="mp-it-sec${s.tone ? ` tone-${esc(s.tone)}` : ''}" id="mp-sec-${esc(s.key)}">
        <div class="mp-it-sh">${esc(s.label)}</div>
        <div class="mp-it-stext">${richText(s.text)}</div>
      </div>`).join('')}</div>`
      : '';
    const tags = [it.systemLabel, MT_LABEL[it.moduleType] || it.moduleType].filter(Boolean);
    const ask = it.ask;
    const askQ = ask && ask.question ? esc(ask.question) : '';
    const askLine = ask && (askQ || (ask.direction && ask.direction !== 'general'))
      ? `<div class="mp-it-ask">${askQ ? `<span class="ask-q">问题：${askQ}</span><span class="ask-sep">｜</span>` : ''}<span class="ask-d">询问方向：${esc(ask.directionLabel || '综合')}</span></div>`
      : '';
    const answer = it.answer ? `<div class="mp-it-ans"><b>${askQ ? '先答所问' : '先看结论'}</b>${esc(it.answer)}</div>` : '';
    const plain = it.plain ? `<div class="mp-it-plain"><b>说人话</b>${esc(it.plain)}</div>` : '';
    const fu = (it.followups && it.followups.length)
      ? `<div class="mp-it-fu"><b>还可以这样追问</b><ul>${it.followups.map((q) => `<li>${esc(q)}</li>`).join('')}</ul></div>`
      : '';
    const gloss = (it.glossary && it.glossary.length)
      ? `<details class="mp-it-gloss"><summary>名词解释（${it.glossary.length} 条）</summary>${it.glossary.map((g) => `<div><span>${esc(g.term)}</span>${esc(g.plain)}</div>`).join('')}</details>`
      : '';
    return `<div class="mp-it${folded ? ' folded' : ''}">
      <button type="button" class="mp-it-head" aria-expanded="${folded ? 'false' : 'true'}">
        <span class="mp-it-arrow" aria-hidden="true">▾</span>
        <span class="mp-it-title">解析与详解</span>${tags.map((t) => `<span class="mp-it-tag">${esc(t)}</span>`).join('')}
        <span class="mp-it-hint">${folded ? '点击展开' : '点击收起'}</span>
      </button>
      <div class="mp-it-wrap">
        ${askLine}
        ${answer}
        ${plain}
        ${it.lead ? `<div class="mp-it-lead">${esc(it.lead)}</div>` : ''}
        ${it.error ? `<div class="mp-it-err"><b>⚠ 解析生成失败</b>${esc(it.error)}——上方盘面数据本身可用</div>` : ''}
        ${outline}
        ${toc}
        <div class="mp-it-body">${dims}</div>
        ${secs}
        ${tables}
        ${fu}
        ${gloss}
        <div class="mp-it-dis">${esc(it.disclaimer)}</div>
      </div>
    </div>`;
  };

  pp.followupHTML = function (fx) {
    if (!fx) return '';
    const ev = (fx.evidence && fx.evidence.length)
      ? `<div class="mp-fu-ev">依据：${fx.evidence.map((x) => esc(x)).join('；')}　置信度：${esc(fx.confidence || '弱')}</div>`
      : '';
    return `<div class="mp-fu${fx.ok ? '' : ' miss'}">
      <div class="mp-fu-h">追问 · ${esc(fx.question)}</div>
      <div class="mp-fu-a">${esc(fx.answer)}</div>
      ${ev}
    </div>`;
  };

  pp.resultWithInterpret = function (html, it, opt) {
    return (html || '') + pp.interpretHTML(it, opt);
  };

  pp.almanacHTML = function (r) {
    if (!r || !r.meta) return pp.quickHTML(r);
    const g = r.ganzhi || {};
    const god = r.dayGod || null;
    const chips = (list, cls) => (list || []).map((x) => `<span class="mp-al-chip${cls ? ` ${cls}` : ''}">${esc(x)}</span>`).join('');
    const cell = (k, v) => (v ? `<div class="mp-al-cell"><em>${esc(k)}</em><b>${esc(v)}</b></div>` : '');
    const xiu = r.xiu ? `${r.xiu.name}宿（${r.xiu.luck}·${r.xiu.zheng}·${r.xiu.animal}）` : '';
    const nayin = r.nayin && r.nayin.day ? r.nayin.day.name : '';
    const chong = r.chong ? `${r.chong.text}${r.chong.sha ? ` ${r.chong.sha}` : ''}` : '';
    const hours = (r.hours || []).map((h) => `<span class="mp-al-hour ${h.luck === '吉' ? 'good' : 'bad'}">`
      + `<i>${esc(h.zhi)}</i><em>${esc((h.ganZhi || '').slice(0, 1))}</em><b>${esc(h.shen || '')}</b>`
      + `<u>${esc(h.luck || '')}</u></span>`).join('');
    const pos = r.positions || {};
    const posRow = (k, v) => (v ? `<span class="mp-al-chip">${esc(k)}·${esc(typeof v === 'string' ? v : v.dir || '')}</span>` : '');
    const lucky = r.lucky || {};
    const godBadge = god ? `<span class="mp-al-badge ${god.luck === '吉' ? 'good' : 'bad'}">${esc(god.name)}·${esc(god.type)}·${esc(god.luck)}</span>` : '';
    return `<section class="mp-al" aria-label="黄历">
      <div class="mp-al-h"><b>${esc(r.meta.date || '')}</b><i>${esc(r.meta.weekday || '')}　${esc((r.lunar || {}).text || '')}</i></div>
      <div class="mp-al-gz">${esc(g.year || '')}年　${esc(g.month || '')}月　${esc(g.day || '')}日　属${esc(g.shengXiao || '')}　建除 ${esc(r.zhiXing || '')}日　${godBadge}</div>
      <div class="mp-al-yiji">
        <div class="mp-al-col"><em>宜</em><div class="mp-al-chips">${chips(r.yi)}</div></div>
        <div class="mp-al-col"><em>忌</em><div class="mp-al-chips">${chips(r.ji)}</div></div>
      </div>
      <div class="mp-al-grid">${cell('二十八宿', xiu)}${cell('日柱纳音', nayin)}${cell('胎神', r.taiShen)}${cell('冲煞', chong)}</div>
      <div class="mp-al-row"><em>吉神方位</em><div class="mp-al-chips">${posRow('喜神', pos.xiShen)}${posRow('财神', pos.caiShen)}${posRow('福神', pos.fuShen)}${posRow('阳贵', pos.yangGui)}${posRow('阴贵', pos.yinGui)}</div></div>
      <div class="mp-al-row"><em>时刻吉凶</em><div class="mp-al-hours">${hours}</div></div>
      <div class="mp-al-row"><em>吉配生肖</em><div class="mp-al-chips">${lucky.liuhe ? `<span class="mp-al-chip">六合·${esc(lucky.liuhe)}</span>` : ''}${chips(lucky.sanhe || [])}</div></div>
      ${r.dailyHexagram ? `<div class="mp-al-hex">每日一卦：<b>${esc(r.dailyHexagram.name)}</b>　${esc(r.dailyHexagram.meaning || '')}</div>` : ''}
      <div class="mp-al-note">${esc((r.meta && r.meta.scope) || '')}</div>
    </section>`;
  };

  pp.mbtiHTML = function (r) {
    if (!r) return '';
    if (r.needAnswers && Array.isArray(r.questions)) {
      const items = r.questions.map((q) => `<li>${esc(q.text)}</li>`).join('');
      return `<section class="mp-mb-paper" aria-label="十六型人格问卷">
        <div class="mp-mb-h">
          <span class="mp-mb-meta"><b>十六型人格问卷</b><i>${r.total} 题 · 每题 1 完全不像 / 5 很像我</i></span>
          <span class="mp-mb-count">填完分数再看结果</span>
        </div>
        <ol>${items}</ol>
        <div class="mp-mb-note">${esc(r.note || '')}</div>
      </section>`;
    }
    const dims = (r.dims || []).map((d) => {
      const pct = Math.round((d.pct || 0) * 100);
      const leftOn = d.picked === d.left;
      const width = Math.max(2, pct);
      const say = leftOn ? d.leftSay : d.rightSay;
      return `<div class="mp-mb-dim">
        <div class="mp-mb-dh"><b class="${leftOn ? 'on' : ''}">${esc(d.left)}</b><em>${esc(d.name)}</em><b class="${leftOn ? '' : 'on'}">${esc(d.right)}</b></div>
        <div class="mp-mb-bar ${leftOn ? 'l' : 'r'}"><em style="width:${width}%"></em></div>
        <div class="mp-mb-df">取 ${esc(d.picked)} · ${esc(d.strength)} ${pct}%</div>
        <div class="mp-mb-ds">${esc(say)}</div>
      </div>`;
    }).join('');
    const p = r.profile || {};
    const stack = (p.stack || []).map((f, i) => `<span class="${i === 0 ? 'lead' : ''}"><b>${esc(f.code)}</b>${esc(f.say)}</span>`).join('');
    return `<section class="mp-mb" aria-label="十六型人格结果">
      <div class="mp-mb-h">
        <span class="mp-mb-code">${esc(r.type || '')}</span>
        <span class="mp-mb-meta"><b>${esc(p.title || '')}</b><i>${esc(p.keywords || '')}</i></span>
        <span class="mp-mb-count">已答 ${r.answered || 0}/${r.total || 0} 题</span>
      </div>
      <div class="mp-mb-body">
        <div class="mp-mb-dims">${dims}</div>
        <div class="mp-mb-sec"><em>一句</em>${esc(p.oneLine || '')}</div>
        <div class="mp-mb-two">
          <div><b>优势</b>${(p.strengths || []).map((s) => esc(s)).join('；')}</div>
          <div><b>留意</b>${(p.blindspots || []).map((s) => esc(s)).join('；')}</div>
        </div>
        ${stack ? `<div class="mp-mb-sec"><em>认知功能</em>主导 ${esc((p.stack[0] || {}).code || '')} → 依次展开</div><div class="mp-mb-fn">${stack}</div>` : ''}
        <div class="mp-mb-sec"><em>工作</em>${esc(p.work || '')}</div>
        <div class="mp-mb-sec"><em>关系</em>${esc(p.love || '')}</div>
        <div class="mp-mb-sec"><em>学习</em>${esc(p.study || '')}</div>
        <div class="mp-mb-sec"><em>课题</em>${esc(p.growth || '')}</div>
      </div>
      <div class="mp-mb-note">${esc(r.note || '')}</div>
    </section>`;
  };

  const FS_GRID = [['巽', '离', '坤'], ['震', '中', '兑'], ['艮', '坎', '乾']];
  const FS_DIR = { 坎: '正北', 艮: '东北', 震: '正东', 巽: '东南', 离: '正南', 坤: '西南', 兑: '正西', 乾: '西北', 中: '中宫' };
  const FS_LUCKY = ['生气', '延年', '天医', '伏位'];
  const fsChip = (text, cls) => `<span class="mp-fs-chip${cls ? ' ' + cls : ''}">${esc(text)}</span>`;
  const fsCell = (gua, head, body) => `<div class="mp-fs-cell${gua === '中' ? ' center' : ''}">`
    + `<div class="mp-fs-top"><span class="mp-fs-gua">${esc(gua)}</span><span class="mp-fs-dir">${esc(FS_DIR[gua] || '')}</span>${head || ''}</div>`
    + (body || '') + '</div>';
  const fsFacts = (rows) => (rows.length
    ? `<dl class="mp-fs-facts">${rows.map(([k, v]) => `<div class="mp-fs-row"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>`
    : '');
  const fsSection = (title, sub, chips, grid, facts, notes) => `<section class="mp-quick mp-fs" aria-label="风水结果">`
    + `<div class="mp-quick-h"><b>${esc(title)}</b>${sub ? `<span class="mp-fs-sub">${esc(sub)}</span>` : ''}</div>`
    + (chips.length ? `<div class="mp-fs-chips">${chips.join('')}</div>` : '')
    + grid + facts
    + (notes.filter(Boolean).map((x) => `<div class="mp-fs-note">${esc(x)}</div>`).join(''))
    + '</section>';
  const fsBaguaGrid = (list, aria) => `<div class="mp-fs-grid" role="group" aria-label="${esc(aria)}">`
    + FS_GRID.map((row) => row.map((g) => {
      const x = list.find((y) => y && y.palace === g);
      if (!x) return fsCell(g, '', '');
      const good = FS_LUCKY.includes(x.star);
      const head = `<span class="mp-fs-star"${x.role ? ` title="${esc(x.role)}"` : ''}>${esc(x.star)}`
        + `<em class="${good ? 'ok' : 'bad'}">${good ? '吉' : '凶'}</em></span>`;
      return fsCell(g, head, '');
    }).join('')).join('') + '</div>';

  function fsXuankong(r, m) {
    const period = m.period;
    const by = {};
    for (const p of r.palaces || []) by[p.palace] = p;
    const grid = `<div class="mp-fs-key">每宫依次为 <b>运</b>／<b>山</b>／<b>向</b> 三星；底色高亮＝当运（${esc(period)}运）</div>`
      + '<div class="mp-fs-grid" role="group" aria-label="玄空九宫（运/山/向）">'
      + FS_GRID.map((row) => row.map((g) => {
        const p = by[g];
        if (!p) return fsCell(g, '', '');
        const nums = [['运', p.yun], ['山', p.shan], ['向', p.xiang]]
          .map(([k, v]) => `<span class="${v === period ? 'on' : ''}" title="${esc(k)}星 ${esc(v)}">${esc(v)}</span>`).join('');
        return fsCell(g, '', `<div class="mp-fs-nums">${nums}</div>`);
      }).join('')).join('') + '</div>';
    const w = r.wangShanWangXiang || {};
    const chips = [
      fsChip(`山盘 ${m.shanCenter.star}${m.shanCenter.name} · ${m.shanCenter.fly}`),
      fsChip(`向盘 ${m.xiangCenter.star}${m.xiangCenter.name} · ${m.xiangCenter.fly}`),
      fsChip(w.byChart ? '盘面：到山到向' : '盘面：未到山到向', w.byChart ? 'ok' : ''),
      fsChip(w.byTable ? '表法：在列' : '表法：未列', w.byTable ? 'ok' : ''),
    ];
    const facts = fsFacts([
      ['入中', `山盘 ${m.shanCenter.star}${m.shanCenter.name}（${m.shanCenter.fly}，${m.shanCenter.basis}）；`
        + `向盘 ${m.xiangCenter.star}${m.xiangCenter.name}（${m.xiangCenter.fly}，${m.xiangCenter.basis}）`],
      ['当运', `山星${period}落 ${r.dangYun.shan.text}；向星${period}落 ${r.dangYun.xiang.text}`],
      ['合十', `山星：${(r.heshi.shan || []).join('、') || '无'}；向星：${(r.heshi.xiang || []).join('、') || '无'}`],
      ['表法', `${w.note || ''}${(w.table || []).length ? ` 本运所列：${w.table.join('、')}。` : ' 本运表法无局。'}`],
    ]);
    return fsSection('玄空下卦', `${m.periodLabel} · 坐${m.sitting} · 向${m.facing}`, chips, grid, facts, [m.note, r.disclaimer]);
  }

  function fsNatal(r, m) {
    const mg = r.mingGua || {};
    const grid = fsBaguaGrid([...(r.luckyDirections || []), ...(r.unluckyDirections || [])], '八宅八向（吉凶）');
    const chips = [fsChip(mg.compatible || '—'), fsChip(`${m.gender}命 · ${m.guaYear} 年立春界`)];
    const rows = [];
    if (r.yearlyFlying) {
      const fy = r.yearlyFlying;
      rows.push(['年紫白', `${fy.centerName}入中；${fy.palaces.filter((p) => p.palace !== '中')
        .map((p) => `${p.palace}${p.name}`).join('、')}`]);
    }
    return fsSection('八宅命卦', `${mg.num}${mg.gua}（${mg.group}）· ${mg.direction}`, chips, grid, fsFacts(rows), [m.note, r.disclaimer]);
  }

  function fsAdvise(r, m) {
    const lay = r.layout || {};
    const grid = fsBaguaGrid(r.houseStars || [], '宅卦八向（吉凶）');
    const chips = [fsChip(`${m.houseGua}宅 · ${m.houseGroup}`), fsChip(`坐${m.sitting}`), fsChip(`向${m.facing}`)];
    const rows = [['门', lay.door], ['灶', lay.stove], ['床', lay.bed], ['厕', lay.toilet]];
    if (r.mingMatch) rows.push(['命宅配', r.mingMatch.text]);
    return fsSection('门主灶', `${m.houseGua}宅 · 坐${m.sitting} · 向${m.facing}`, chips, grid, fsFacts(rows),
      [m.birthNote, r.disclaimer]);
  }

  pp.fengshuiHTML = function (r) {
    if (!r || r.system !== 'fengshui') return pp.quickHTML(r);
    const m = r.meta || {};
    if (m.action === 'xuankong') return fsXuankong(r, m);
    if (m.action === 'advise') return fsAdvise(r, m);
    return fsNatal(r, m);
  };

  pp.quickHTML = function (r) {
    if (!r) return '';
    const LABEL = {
      almanac: '黄历', zeri: '择日', chenggu: '称骨', xiaoliuren: '小六壬',
      star: '星座', numerology: '生命数字', trend: '人生 K 线', fengshui: '风水', name: '起名', convert: '公农历转换',
      mbti: '十六型人格',
    };
    const title = LABEL[r.system] || '速查';
    const text = r.summary || '';
    const body = text ? `<pre class="mp-quick-pre">${esc(text)}</pre>` : '';
    return `<section class="mp-quick" aria-label="${esc(title)}结果">
      <div class="mp-quick-h"><b>${esc(title)}</b></div>
      ${body}
    </section>`;
  };

  pp.summaryCardPNG = function (r, it) {
    try {
      if (typeof document === 'undefined' || !document.createElement) return '';
      const outline = (it && it.outline) || [];
      const tables = ((it && it.tables) || []).filter((t) => Array.isArray(t.rows) && t.rows.length);
      const systemLabel = (it && it.systemLabel) || (r && r.system) || '命理报告';
      const W = 900;
      const PAD = 44;
      const line = 26;
      const font = (size, bold) => `${bold ? '600 ' : ''}${size}px "PingFang SC","Microsoft YaHei","Noto Sans CJK SC",sans-serif`;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext ? canvas.getContext('2d') : null;
      if (!ctx) return '';
      const wrap = (text, maxWidth) => {
        const out = [];
        let cur = '';
        for (const ch of String(text)) {
          const test = cur + ch;
          if (ctx.measureText(test).width > maxWidth && cur) { out.push(cur); cur = ch; } else cur = test;
        }
        if (cur) out.push(cur);
        return out.length ? out : [''];
      };
      ctx.font = font(15);
      let bodyH = 0;
      const outlineBlocks = outline.map((o) => {
        const lines = wrap(o.text, W - PAD * 2 - 70);
        bodyH += Math.min(lines.length, 2) * line + 10;
        return { o, lines: lines.slice(0, 2) };
      });
      const table = tables[0] || null;
      const tableRows = table ? table.rows.slice(0, 6) : [];
      const tableH = table ? 54 + tableRows.length * 34 : 0;
      const H = 150 + bodyH + (outlineBlocks.length ? 34 : 0) + tableH + 120;

      canvas.width = W;
      canvas.height = H;
      ctx.fillStyle = 'rgb(255,255,255)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = 'rgb(31,111,63)';
      ctx.fillRect(0, 0, W, 8);

      let y = 52;
      ctx.fillStyle = 'rgb(27,27,27)';
      ctx.font = font(28, true);
      ctx.fillText(`${systemLabel} · 摘要`, PAD, y);
      y += 30;
      ctx.fillStyle = 'rgb(111,106,96)';
      ctx.font = font(14);
      const meta = [r && r.input && r.input.datetime ? `出生/起局：${r.input.datetime}` : '', '本地计算 · 可复现'].filter(Boolean).join('　');
      ctx.fillText(meta, PAD, y);
      y += 34;

      if (outlineBlocks.length) {
        ctx.fillStyle = 'rgb(31,111,63)';
        ctx.font = font(16, true);
        ctx.fillText('一页读懂', PAD, y);
        y += 26;
        for (const { o, lines } of outlineBlocks) {
          ctx.fillStyle = 'rgb(138,131,120)';
          ctx.font = font(14, true);
          ctx.fillText(o.label, PAD, y);
          ctx.fillStyle = 'rgb(63,58,51)';
          ctx.font = font(15);
          lines.forEach((text, i) => ctx.fillText(text, PAD + 70, y + i * line));
          y += lines.length * line + 10;
        }
        y += 8;
      }

      if (table) {
        ctx.fillStyle = 'rgb(31,111,63)';
        ctx.font = font(16, true);
        ctx.fillText(table.title, PAD, y);
        y += 24;
        ctx.fillStyle = 'rgb(138,131,120)';
        ctx.font = font(13);
        ctx.fillText(table.columns.join(' · '), PAD, y);
        y += 8;
        ctx.strokeStyle = 'rgb(229,225,216)';
        ctx.beginPath(); ctx.moveTo(PAD, y); ctx.lineTo(W - PAD, y); ctx.stroke();
        y += 22;
        ctx.fillStyle = 'rgb(63,58,51)';
        ctx.font = font(14);
        for (const row of tableRows) {
          const text = row.filter(Boolean).join(' · ');
          const clipped = wrap(text, W - PAD * 2)[0];
          ctx.fillText(clipped, PAD, y);
          y += 34;
        }
      }

      y = H - 62;
      ctx.strokeStyle = 'rgb(229,225,216)';
      ctx.beginPath(); ctx.moveTo(PAD, y - 18); ctx.lineTo(W - PAD, y - 18); ctx.stroke();
      ctx.fillStyle = 'rgb(138,131,120)';
      ctx.font = font(12);
      ctx.fillText('内容用于传统文化学习与自我探索，不构成医疗、投资、法律或人事决策依据。', PAD, y + 6);
      ctx.fillText('dsh-metaphysics · 本机计算，未上传任何数据', PAD, y + 26);

      return canvas.toDataURL ? canvas.toDataURL('image/png') : '';
    } catch (e) {
      return '';
    }
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
.mp-panel{background:linear-gradient(180deg,var(--dsw-alias-bg-layer-2),color-mix(in srgb,var(--dsw-alias-bg-layer-2) 88%,var(--dsw-alias-bg-layer-1)));border:1px solid var(--dsw-alias-border-l1);border-radius:16px;padding:18px 20px 16px;margin-bottom:16px;
  box-shadow:0 1px 2px color-mix(in srgb,var(--dsw-alias-label-primary) 5%,transparent),0 16px 34px -30px color-mix(in srgb,var(--dsw-alias-label-primary) 45%,transparent)}
.mp-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px 14px;align-items:end}
.mp-lbl{display:block;height:18px;line-height:18px;font-size:12.5px;color:var(--dsw-alias-label-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mp-checks{display:flex;gap:20px;flex-wrap:wrap;margin-top:13px;font-size:12.5px;color:var(--dsw-alias-label-secondary)}
.mp-checks label{display:inline-flex;align-items:center;gap:6px;cursor:pointer}
.mp-askblock{margin-top:14px;display:flex;flex-direction:column;gap:5px}
.mp-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:14px}
.mp-tabs{display:inline-flex;gap:4px;margin-bottom:14px;flex-wrap:wrap;padding:4px;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:11px;width:100%;max-width:940px}
.mp-tab{padding:7px 15px;border-radius:9px;border:none;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;font-size:13.5px;transition:background .14s,color .14s,box-shadow .14s}
.mp-tab:hover{background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary)}
.mp-tab.on{background:var(--dsw-alias-brand-primary);color:#fff;box-shadow:0 8px 18px -12px var(--dsw-alias-brand-primary)}
.mp-field{display:flex;flex-direction:column;gap:5px;font-size:13px;color:var(--dsw-alias-label-secondary);min-width:0}
.mp-input{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-primary);border-radius:9px;padding:7px 11px;font-size:14px;outline:none;width:100%;min-width:0;height:36px;
  transition:border-color .14s,box-shadow .14s,background .14s}
.mp-input:hover{border-color:color-mix(in srgb,var(--dsw-alias-border-l1) 45%,var(--dsw-alias-brand-primary))}
.mp-input:focus{border-color:var(--dsw-alias-brand-primary);box-shadow:0 0 0 3px color-mix(in srgb,var(--dsw-alias-brand-primary) 18%,transparent)}
.mp-textarea{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-primary);border-radius:9px;padding:8px 11px;font-size:14px;outline:none;width:100%;min-width:0;resize:vertical;line-height:1.5;font-family:inherit;
  transition:border-color .14s,box-shadow .14s}
.mp-textarea:hover{border-color:color-mix(in srgb,var(--dsw-alias-border-l1) 45%,var(--dsw-alias-brand-primary))}
.mp-textarea:focus{border-color:var(--dsw-alias-brand-primary);box-shadow:0 0 0 3px color-mix(in srgb,var(--dsw-alias-brand-primary) 18%,transparent)}
.mp-textarea.invalid{border-color:var(--dsw-alias-state-error-primary)}
.mp-quiz-wrap{grid-column:1 / -1;display:flex;flex-direction:column;gap:6px}
.mp-quiz-top{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.mp-quiz-bar{flex:1 1 160px;min-width:110px;height:6px;border:1px solid var(--dsw-alias-border-l1);border-radius:999px;background:var(--dsw-alias-bg-layer-1);overflow:hidden}
.mp-quiz-bar i{display:block;height:100%;border-radius:999px;background:var(--dsw-alias-brand-primary);transition:width .18s ease}
.mp-quiz-count{font-size:12px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;white-space:nowrap}
.mp-quiz-list{display:flex;flex-direction:column;gap:8px;margin-top:8px}
.mp-quiz-q{padding:10px 12px;border:1px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-layer-1)}
.mp-quiz-qt{display:flex;gap:8px;align-items:baseline;font-size:13px;line-height:1.6;color:var(--dsw-alias-label-primary)}
.mp-quiz-qt b{flex:none;padding-top:1px;font:600 11px/1.4 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;letter-spacing:.04em;color:var(--dsw-alias-brand-primary)}
.mp-quiz-opts{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px;margin-top:8px}
.mp-quiz-o{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:6px 4px;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);cursor:pointer;text-align:center;
  transition:border-color .14s,background .14s,color .14s}
.mp-quiz-o input{position:absolute;inset:0;margin:0;opacity:0;cursor:pointer}
.mp-quiz-o b{font-size:13px;font-weight:600;color:var(--dsw-alias-label-primary);font-variant-numeric:tabular-nums}
.mp-quiz-o span{font-size:11px;line-height:1.3}
.mp-quiz-o:hover{border-color:var(--dsw-alias-brand-primary)}
.mp-quiz-o.on{border-color:transparent;background:var(--dsw-alias-brand-primary)}
.mp-quiz-o.on b,.mp-quiz-o.on span{color:#fff}
.mp-quiz-o:focus-within{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
.mp-quiz-nav{display:flex;align-items:center;gap:8px;margin-top:10px;flex-wrap:wrap}
.mp-quiz-btn{padding:6px 14px;border-radius:8px;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-primary);font-family:inherit;font-size:12.5px;cursor:pointer;min-height:32px}
.mp-quiz-btn:hover:not(:disabled){border-color:var(--dsw-alias-brand-primary)}
.mp-quiz-btn:disabled{opacity:.42;cursor:not-allowed}
.mp-quiz-btn.primary{border-color:transparent;background:var(--dsw-alias-brand-primary);color:#fff;font-weight:600}
.mp-quiz-hint{margin-left:auto;font-size:12px;color:var(--dsw-alias-label-secondary);line-height:1.6}
.mp-btn{padding:8px 22px;border-radius:9px;border:none;background:var(--dsw-alias-brand-primary);color:#fff;cursor:pointer;font-size:14px;font-weight:600;min-width:132px;
  box-shadow:0 10px 20px -14px var(--dsw-alias-brand-primary);transition:transform .14s,filter .14s,box-shadow .14s}
.mp-btn:hover{filter:brightness(1.06);transform:translateY(-1px)}
.mp-btn:active{transform:none;filter:brightness(.98)}
.mp-btn.ghost{background:transparent;border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-secondary);box-shadow:none}
.mp-btn.ghost:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);filter:none}
.mp-seg{display:flex;width:100%;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;overflow:hidden;height:36px}
.mp-seg button{flex:1;padding:0 8px;background:transparent;border:none;color:var(--dsw-alias-label-secondary);font-size:13px;cursor:pointer}
.mp-seg button.on{background:var(--dsw-alias-brand-primary);color:#fff}
.mp-qmrule{grid-column:1 / -1;border:0;margin:0;padding:0;display:flex;flex-wrap:wrap;align-items:center;gap:10px 14px}
.mp-qmrule legend{padding:0}
.mp-qmopts{display:flex;flex-wrap:wrap;gap:8px}
.mp-qmopt{display:inline-flex;align-items:center;gap:7px;padding:7px 12px;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;font-size:13px;cursor:pointer;color:var(--dsw-alias-label-primary)}
.mp-qmopt input{accent-color:var(--dsw-alias-brand-primary);margin:0}
.mp-qmhelp{flex:1 1 100%;font-size:12.5px;color:var(--dsw-alias-label-secondary)}
.mp-qmhelp summary{cursor:pointer}
.mp-qmhelp p{margin:6px 0 0}
.relation{display:flex;flex-direction:column;gap:6px;margin:14px 0 0;padding:12px;background:var(--dsw-alias-bg-layer-2);border-left:3px solid var(--dsw-alias-brand-primary);border-radius:8px}
.relation__row{display:grid;grid-template-columns:96px minmax(0,1fr);gap:8px;align-items:baseline}
.relation__row dt{margin:0;font-size:12.5px;color:var(--dsw-alias-label-secondary)}
.relation__row dd{margin:0;font-size:13.5px;color:var(--dsw-alias-label-primary)}
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
.mp-card{margin-top:18px;padding:16px 18px;border-radius:16px;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);
  box-shadow:0 1px 2px color-mix(in srgb,var(--dsw-alias-label-primary) 5%,transparent),0 18px 40px -32px color-mix(in srgb,var(--dsw-alias-label-primary) 42%,transparent)}
.mp-flat{margin-top:16px;padding:0;border:none;background:transparent;border-radius:0}
.mp-dim{color:var(--dsw-alias-label-secondary)}
.mp-err{margin-top:16px;padding:9px 14px;border-radius:8px;border-left:3px solid var(--dsw-alias-state-error-primary);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 8%,transparent);color:var(--dsw-alias-state-error-primary);font-size:13px}
.mp-empty{margin-top:26px;padding:34px 24px;border:1px dashed var(--dsw-alias-border-l1);border-radius:12px;text-align:center;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:2}
.mp-empty b{display:block;font-size:15px;color:var(--dsw-alias-label-primary);margin-bottom:6px;font-weight:600}
.mp-note{margin-top:12px;padding:9px 14px;border-radius:10px;font-size:12px;background:color-mix(in srgb,var(--dsw-alias-state-warning-primary) 14%,transparent);color:var(--dsw-alias-state-warning-primary)}
.mp-bar{display:flex;gap:8px;align-items:center;margin-top:14px}
.mp-askbox{display:flex;gap:8px;align-items:center;margin-top:12px}
.mp-askbox .mp-input{flex:1;min-width:0}
.mp-fx{margin-top:10px}
.mp-verify,.mp-rect{margin-top:12px;padding:12px;border:1px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-layer-2)}
.mp-verify-h{font-size:12px;font-weight:700;letter-spacing:.08em;color:var(--dsw-alias-label-secondary);margin-bottom:8px}
.mp-verify-row{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:12.5px;padding:3px 0}
.mp-verify-btns{display:flex;gap:4px}
.mp-chip{font-size:11.5px;padding:2px 8px;border-radius:999px;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer}
.mp-chip.on{background:var(--dsw-alias-brand-primary);color:#fff;border-color:transparent}
.mp-verify-foot{display:flex;align-items:flex-start;gap:8px;margin-top:8px;flex-wrap:wrap}
.mp-verify-fit{font-size:12px;color:var(--dsw-alias-label-secondary);line-height:1.7;flex:1;min-width:0}
.mp-rect-row{display:flex;gap:6px;margin-bottom:6px}
.mp-rect-row .mp-input{flex:1;min-width:0}
.mp-rect-cand{font-size:12px;padding:5px 8px;border-radius:6px;background:var(--dsw-alias-bg-layer-1);margin-top:4px;color:var(--dsw-alias-label-secondary)}
.mp-rect-cand.best{border-left:3px solid var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-primary)}
.mp-rect-err{color:var(--dsw-alias-label-secondary);font-size:12px}
.mp-checks{flex-direction:row;align-items:center;gap:7px;font-size:12.5px}
.mp-checks input{width:15px;height:15px;accent-color:var(--dsw-alias-brand-primary)}
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
  .mp-quiz-q{padding:9px 10px}
  .mp-quiz-o{padding:8px 3px;min-height:50px}
  .mp-quiz-o span{font-size:10px}
  .mp-quiz-btn{flex:1 1 auto;min-height:44px}
  .mp-quiz-hint{flex-basis:100%;margin-left:0}
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
:where(.mp-btn,.mp-tab,.mp-chip,.mp-hist-item,.mp-hist-clear,.mp-qmopt,.seg button):focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{transition-duration:.001ms!important;animation-duration:.001ms!important}
}
`;

const { useState, useEffect } = React;

const MBTI_PER_PAGE = 4;
const MBTI_MIN = 12;
let MBTI_INFO = null;
function mbtiInfo() {
  if (MBTI_INFO) return MBTI_INFO;
  let p = null;
  try { p = Engine.compute({ system: 'mbti' }); } catch (e) { p = null; }
  const questions = (p && p.questions) || [];
  MBTI_INFO = { total: (p && p.total) || questions.length, questions, scale: (p && p.scale) || {} };
  return MBTI_INFO;
}

function MbtiQuiz(props) {
  const { answers, page, onPick, onPage, onSubmit, onClear } = props;
  const info = mbtiInfo();
  const pages = Math.max(1, Math.ceil(info.total / MBTI_PER_PAGE));
  const start = page * MBTI_PER_PAGE;
  const slice = info.questions.slice(start, start + MBTI_PER_PAGE);
  const answered = answers.filter((v) => v != null).length;
  const pct = info.total ? Math.round((answered / info.total) * 100) : 0;
  const last = page >= pages - 1;
  const ready = answered >= MBTI_MIN;
  return h('div', { className: 'mp-quiz' },
    h('div', { className: 'mp-quiz-top' },
      h('div', { className: 'mp-quiz-bar', 'aria-hidden': 'true' }, h('i', { style: { width: pct + '%' } })),
      h('span', { className: 'mp-quiz-count' }, `第 ${page + 1} / ${pages} 页 · 已答 ${answered} / ${info.total}`)),
    h('div', { className: 'mp-quiz-list' }, slice.map((q, k) => {
      const i = start + k;
      return h('div', { key: q.id || i, className: 'mp-quiz-q' },
        h('div', { className: 'mp-quiz-qt' }, h('b', null, String(i + 1).padStart(2, '0')), h('span', null, q.text)),
        h('div', { className: 'mp-quiz-opts', role: 'radiogroup', 'aria-label': `第 ${i + 1} 题` },
          [1, 2, 3, 4, 5].map((n) => h('label', { key: n, className: 'mp-quiz-o' + (answers[i] === n ? ' on' : '') },
            h('input', {
              type: 'radio', name: `mpmbq${i}`, value: String(n), checked: answers[i] === n,
              onChange: () => onPick(i, n),
            }),
            h('b', null, String(n)),
            h('span', null, info.scale[n] || '')))));
    })),
    h('div', { className: 'mp-quiz-nav' },
      h('button', { className: 'mp-quiz-btn', disabled: page <= 0, onClick: () => onPage(-1) }, '上一页'),
      last ? null : h('button', { className: 'mp-quiz-btn', onClick: () => onPage(1) }, '下一页'),
      h('button', { className: 'mp-quiz-btn primary', disabled: !ready, onClick: onSubmit }, '看结果'),
      h('button', { className: 'mp-quiz-btn', onClick: onClear }, '清空'),
      h('span', { className: 'mp-quiz-hint' }, ready
        ? `已够 ${MBTI_MIN} 题，可以看结果；答完 ${info.total} 题会更准。`
        : `答满 ${MBTI_MIN} 题可先看结果（还差 ${MBTI_MIN - answered} 题）。`)),
  );
}

class PanelGuard extends (React.Component || Object) {
  constructor(props) { super(props); this.state = { err: null }; }
  static getDerivedStateFromError(err) { return { err }; }
  componentDidCatch(err, info) { console.error('[metaphysics] 面板渲染异常', err, info); }
  render() {
    if (!this.state.err) return this.props.children;
    const e = this.state.err;
    const stack = String((e && e.stack) || '').split('\n').slice(0, 14).join('\n');
    return h('div', { className: 'mp-wrap' }, h('div', { className: 'mp-panel' },
      h('div', { className: 'mp-lbl' }, '命理面板渲染出错——把下面这段发给我'),
      h('pre', { style: { whiteSpace: 'pre-wrap', fontSize: 12, lineHeight: 1.5, maxHeight: 320, overflow: 'auto', margin: '8px 0' } },
        String((e && e.message) || e) + '\n\n' + stack),
      h('div', { className: 'mp-lbl' }, '环境：__PP ' + (typeof PP) + ' · Engine ' + (typeof window.Engine) + ' · React ' + (typeof React) + ' · 版本 ' + (typeof PP === 'object' && PP && (window.__MP_VER || '?'))),
    ));
  }
}

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
  { k: 'qimen', label: '奇门', timeLabel: '起局时刻', hint: '奇门时家转盘：用起局时刻定节气、三元与局数；换局规则决定符头与节气如何对齐。' },
  { k: 'hepan', label: '合盘', timeLabel: '你的出生时刻', hint: '合盘按「日主 + 夫妻宫 + 五行互补」看两个人的相处与互补，需要双方出生信息。' },
    { k: 'tarot', label: '塔罗', timeLabel: '', hint: '塔罗不看时间，只记录抽牌时刻与你的提问。' },
  { k: 'almanac', label: '黄历', timeLabel: '', hint: '黄历按公历日期查农历、干支、宜忌、时辰吉凶、二十八宿与吉神方位；只做本地计算。' },
  { k: 'convert', label: '农历', timeLabel: '', hint: '公农历互转：公历生日可反查农历；只知道农历生日时，可转成公历再排盘。' },
  { k: 'zeri', label: '择日', timeLabel: '', hint: '择日把区间内每天的建除宜忌与事项适配打分排序，并按属相排除冲煞日。' },
  { k: 'chenggu', label: '称骨', timeLabel: '出生时刻', hint: '称骨按农历年、月、日、时的骨重求和；时辰必填。' },
  { k: 'xiaoliuren', label: '小六壬', timeLabel: '起课时刻', hint: '小六壬用农历月/日/时掐指，也可用三个随机数起课。' },
  { k: 'star', label: '星座', timeLabel: '', hint: '星座按公历日期给出太阳星座与当日基调；同日同星座结果固定。' },
  { k: 'numerology', label: '生命数字', timeLabel: '', hint: '生命数字按公历生日归约出生命路径数、生日数与态度数。' },
  { k: 'mbti', label: '人格', timeLabel: '', hint: '十六型人格是 24 道自我报告题的 MBTI 风格测算：4 题一页，按 1–5 打分，答满 12 题即可看结果；只作自我参照，不是官方量表。' },
  { k: 'trend', label: '人生K线', timeLabel: '出生时刻', hint: '人生 K 线按大运与流年十神给逐年运势分，画成走势图。' },
  { k: 'fengshui', label: '风水', timeLabel: '', hint: '风水看八宅命卦、大游年四吉四凶与流年九宫飞星；也可按坐向看门主灶倾向，或按运与坐向排玄空下卦盘。' },
  { k: 'name', label: '起名', timeLabel: '', hint: '起名按八字喜用匹配字库五行，可评估现有名字或生成候选名。' },
];

function pad(n) { return String(n).padStart(2, '0'); }

const QUICK_TABS = ['almanac', 'convert', 'zeri', 'chenggu', 'xiaoliuren', 'star', 'numerology', 'trend', 'fengshui', 'name'];

function nowParts() {
  const d = new Date();
  return { date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`, time: `${pad(d.getHours())}:${pad(d.getMinutes())}` };
}

const TIME_KIND = {
  ziwei: 'birth', bazi: 'birth', hepan: 'birth',
  liuyao: 'cast', meihua: 'cast', daliuren: 'cast', qimen: 'cast',
  tarot: 'none',
  almanac: 'date', zeri: 'date', star: 'date', numerology: 'date', convert: 'date',
  chenggu: 'birth', trend: 'birth', fengshui: 'birth', name: 'birth',
  xiaoliuren: 'cast',
  mbti: 'none',
};
const SAMPLE = { date: '1990-05-12', time: '14:30' };
const kindOf = (t) => TIME_KIND[t] || 'none';

const Core = window.__MPCore || {};
const needAsk = Core.needAsk || ((t) => false);

const COMPOSER = { ref: null, seats: [], keys: '', injectType: '', spec: '', errs: [], regs: 0, mounted: 0 };
const LAST = { r: null, q: '', it: null };

function bridgeDiagText() {
  const bits = [];
  bits.push('inputActions ' + (COMPOSER.ref ? '已拿到' : '未拿到'));
  bits.push('渲染 ' + COMPOSER.mounted + ' 次');
  bits.push('注册 ' + COMPOSER.regs + ' 次');
  bits.push('inject ' + (COMPOSER.injectType || '?'));
  bits.push('槽位 ' + (COMPOSER.spec || '?'));
  if (COMPOSER.errs.length) bits.push('错误：' + COMPOSER.errs.join(' / '));
  return '桥自检：' + bits.join('；');
}

function noteRegError(e) {
  if (COMPOSER.errs.length >= 3) return;
  const s = e && e.message ? String(e.message) : String(e);
  COMPOSER.errs.push(s.slice(0, 90));
}
function bridgeActions(props) {
  if (!props) return null;
  const a = props.inputActions;
  if (a && typeof a.setDraft === 'function' && typeof a.submit === 'function') return a;
  const b = props.actions && props.actions.input;
  if (b && typeof b.setDraft === 'function' && typeof b.submit === 'function') return b;
  return null;
}

function useBridge(props, name) {
  const actions = bridgeActions(props);
  useEffect(() => {
    if (COMPOSER.seats.indexOf(name) < 0) COMPOSER.seats.push(name);
    COMPOSER.keys = props ? Object.keys(props).join(',') : '';
    if (actions) {
      COMPOSER.ref = actions;
      try { window.__MPComposer = actions; } catch (e) { /* 非浏览器环境忽略 */ }
    }
    return () => { if (COMPOSER.ref === actions) COMPOSER.ref = null; };
  }, [actions, name]);
  return actions;
}

function askTextForLast() {
  const r = LAST.r;
  if (!r) return '';
  try {
    const p = Engine.askPrompt ? Engine.askPrompt(r, { question: LAST.q, interpret: LAST.it }) : null;
    return (p && p.text) || String(r.summary || '');
  } catch (e) { return String(r.summary || ''); }
}

function ComposerBridge(props) {
  COMPOSER.mounted += 1;
  const actions = useBridge(props, 'input.right');
  if (!actions) {
    return h('span', { className: 'mp-chip warn', title: '命理：已占住输入框槽位，但没拿到 inputActions；把这句话告诉作者' }, '命理·未就绪');
  }
  return h('button', {
    type: 'button', className: 'mp-chip ok',
    title: LAST.r ? '把上一张盘的摘要和问题发进对话窗' : '先在侧栏「命理」里排一张盘',
    onClick: () => { const t = askTextForLast(); if (t) sendToComposer(t); },
  }, '命理·问');
}

function ComposerProbe(props) {
  COMPOSER.mounted += 1;
  useBridge(props, 'composer.dock');
  return null;
}

function sendToComposer(text) {
  let ia = COMPOSER.ref;
  if (!ia) { try { ia = window.__MPComposer || null; } catch (e) { ia = null; } }
  if (!ia || typeof ia.setDraft !== 'function' || typeof ia.submit !== 'function') return false;
  ia.setDraft(text);
  ia.submit();
  return true;
}

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
  const [qimenRule, setQimenRule] = useState('chaibu');
  const [trueSolar, setTrueSolar] = useState(true);
  const [lateZi, setLateZi] = useState(true);
  const [qLateZi, setQLateZi] = useState('same-day');
  const [crossOn, setCrossOn] = useState(false);
  const [askText, setAskText] = useState('');
  const [chatNote, setChatNote] = useState('');
  const [fx, setFx] = useState(null);
  const [pastMarks, setPastMarks] = useState({});
  const [fit, setFit] = useState(null);
  const [rectEvents, setRectEvents] = useState([{ year: '2019', kind: 'career' }, { year: '2022', kind: 'love' }]);
  const [rectRes, setRectRes] = useState(null);
  const [task, setTask] = useState('开业');
  const [days, setDays] = useState('30');
  const [shengXiao, setShengXiao] = useState('');
  const [convMode, setConvMode] = useState('solar2lunar');
  const [lunarDate, setLunarDate] = useState('');
  const [leapMonth, setLeapMonth] = useState(false);
  const [xlrMode, setXlrMode] = useState('time');
  const [num1, setNum1] = useState(''); const [num2, setNum2] = useState(''); const [num3, setNum3] = useState('');
  const [mbAns, setMbAns] = useState(() => new Array(mbtiInfo().total).fill(null));
  const [mbPage, setMbPage] = useState(0);
  const [toAge, setToAge] = useState('60');
  const [fsMode, setFsMode] = useState('natal');
  const [fsPeriod, setFsPeriod] = useState('9');
  const [sitting, setSitting] = useState('子');
  const [facing, setFacing] = useState('午');
  const [nnMode, setNnMode] = useState('assess');
  const [surname, setSurname] = useState('李');
  const [givenName, setGivenName] = useState('');
  const [limitN, setLimitN] = useState('6');
  const [onlineGeo, setOnlineGeo] = useState(false);
  const [lines, setLines] = useState('');
  const [result, setResult] = useState(null);
  useEffect(() => {
    if (result && result.r) { LAST.r = result.r; LAST.q = askText.trim(); LAST.it = result.it || null; }
  }, [result, askText]);
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
  const isBirth = tab === 'bazi' || tab === 'ziwei' || tab === 'hepan'
    || tab === 'chenggu' || tab === 'trend' || tab === 'fengshui' || tab === 'name';
  const timeKind = kindOf(tab);
  const usesTimeInput = !(tab === 'meihua' && mhMode === 'number');
  const showDate = tab !== 'tarot' && tab !== 'mbti' && usesTimeInput;
  const showTime = showDate && timeKind !== 'date';
  const showDT = showTime;

  const run = async (kind, override, modeOverride, over) => {
    const k = kind || tab;
    const mh = modeOverride || mhMode;
    const dt = override ? override : { date, time };
    const genderV = over && over.gender ? over.gender : gender;
    const addressV = over && typeof over.address === 'string' ? over.address : address;
    setNotice('');   // 上一次的提示（如「先答满 12 题」）不该跟着新结果一起留下
    try {
      const datetime = `${dt.date}T${dt.time}`;
      const args = { system: k };
      if (k !== 'tarot') args.datetime = datetime;
      if (k === 'bazi' || k === 'ziwei' || k === 'hepan') {
        args.gender = genderV;
        args.trueSolar = trueSolar;
        if (addressV.trim()) {
          args.address = addressV.trim();
          try {
            const g = await Engine.geocodeAddress(args.address, { online: onlineGeo });
            if (g && typeof g.lon === 'number') { args.longitude = g.lon; args.geo = g; }
          } catch (e) {
            console.error('[metaphysics] 地址解析失败，退回内置表', e);
          }
        }
        if (k !== 'hepan') args.cross = crossOn;
        args.lateZi = lateZi;
      }
      if (k === 'liuyao') {
        const parsed = Core.parseLines(lines);
        if (parsed.lines) args.lines = parsed.lines;
        else if (parsed.warning) setNotice(parsed.warning);
      }
      if (k === 'qimen') { args.juMethod = qimenRule; args.lateZiHourMode = qLateZi; }
      if (k === 'bazi') args.verifyPast = 6;
      if (k === 'zeri') {
        args.startDate = dt.date;
        args.task = task;
        args.days = Number(days) || 30;
        if (shengXiao) args.shengXiao = shengXiao;
      }
      if (k === 'xiaoliuren') {
        args.mode = xlrMode;
        if (xlrMode === 'number') {
          args.num1 = Number(num1) || undefined;
          args.num2 = Number(num2) || undefined;
          args.num3 = Number(num3) || undefined;
        } else {
          args.date = dt.date;
          const hh = Number(String(dt.time).split(':')[0]);
          args.hour = Number.isFinite(hh) ? hh : 12;
        }
      }
      if (k === 'mbti') {
        delete args.datetime;
        const nums = mbAns.slice();
        while (nums.length && nums[nums.length - 1] == null) nums.pop();
        if (nums.length) args.answers = nums;
      }
      if (k === 'trend') { args.gender = genderV; args.toAge = Number(toAge) || 60; args.trueSolar = trueSolar; args.lateZi = lateZi; }
      if (k === 'fengshui') {
        args.action = fsMode;
        if (fsMode === 'natal') { args.gender = genderV; }
        else {
          args.sitting = sitting;
          args.facing = facing;
          delete args.datetime;
          if (fsMode === 'xuankong') args.period = Number(fsPeriod) || 9;
        }
      }
      if (k === 'name') {
        args.action = nnMode;
        args.surname = surname.trim();
        if (nnMode === 'generate') {
          args.gender = genderV; args.limit = Number(limitN) || 6;
          args.trueSolar = trueSolar; args.lateZi = lateZi;
        } else {
          args.givenName = givenName.trim();
          if (!dt.date || !dt.time) delete args.datetime;
        }
      }
      if (k === 'convert') {
        args.system = 'convert';
        if (convMode === 'lunar2solar') {
          const m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(lunarDate).trim());
          if (!m) {
            setError('农历转公历请按「农历年-月-日」填写，例如 2026-9-17；闰月单独勾选。');
            return;
          }
          args.mode = 'lunar2solar';
          args.lunarYear = Number(m[1]);
          args.lunarMonth = Number(m[2]);
          args.lunarDay = Number(m[3]);
          args.isLeapMonth = leapMonth;
          delete args.datetime;
        } else {
          args.mode = 'solar2lunar';
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
      let trend = null;
      if (k === 'bazi') {
        try {
          trend = Engine.compute({
            system: 'trend', datetime, gender: genderV, toAge: 100,
            trueSolar, lateZi,
            ...(args.dst !== undefined ? { dst: args.dst } : {}),
            ...(args.address ? { address: args.address } : {}),
            ...(typeof args.longitude === 'number' ? { longitude: args.longitude } : {}),
            ...(args.geo ? { geo: args.geo } : {}),
          });
        } catch (e) { trend = null; }
      }
      const ask = (needAsk(k) || k === 'qimen')
        ? { question: needAsk(k) ? question.trim() : '', direction }
        : undefined;
      const it = Engine.interpret ? Engine.interpret(r, ask) : null;
      if (it && r.cross && Engine.crossText) {
        it.sections = [...(it.sections || []), { key: 'crossSystem', label: '八字 × 紫微 交叉验证', text: Engine.crossText(r.cross) }];
      }
      const timed = kindOf(k) === 'cast' && (k !== 'meihua' || mh === 'time');
      setResult({ kind: k, r, it, at: dt, timed, trend });
      setFx(null); setFit(null); setPastMarks({}); setRectRes(null);
      setError('');      setCopied('');
      if (k !== 'tarot' && k !== 'mbti') {
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
    if (next === 'mbti') {
      setNotice('');
      if (mbAns.filter((v) => v != null).length >= MBTI_MIN) run(next);
      else setResult(null);
      return;
    }
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
    if (tab === 'mbti') {
      const n = mbAns.filter((v) => v != null).length;
      if (n < MBTI_MIN) {
        setNotice(`先答满 ${MBTI_MIN} 题再看结果（现答 ${n} 题，还差 ${MBTI_MIN - n} 题）。`);
        return;
      }
      run(tab);
      return;
    }
    if (timeKind !== 'none' && !manual[timeKind]) {
      const t = nowParts();
      setDate(t.date);
      setTime(t.time);
      run(tab, t);
      return;
    }
    run(tab);
  };

  const openSample = () => {
    const sample = { date: '1990-05-12', time: '14:30' };
    setTab('bazi');
    setGender('male');
    setAddress('河北石家庄');
    setManual((m) => Object.assign({}, m, { birth: sample }));
    setDate(sample.date);
    setTime(sample.time);
    run('bazi', sample, null, { gender: 'male', address: '河北石家庄' });
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
    if (!result || !(needAsk(tab) || tab === 'qimen')) return;
    const ask = {
      question: needAsk(tab) ? (q === undefined ? question : q).trim() : '',
      direction: dir === undefined ? direction : dir,
    };
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

  const doAsk = () => {
    if (!result || !result.r || !askText.trim()) return;
    try {
      setFx(Engine.followup ? Engine.followup(result.r, askText.trim()) : null);
    } catch (e) { setFx({ question: askText.trim(), ok: false, answer: '追问失败：' + (e && e.message ? e.message : e), evidence: [], confidence: '弱' }); }
  };

  const askInChat = () => {
    if (!result || !result.r) return;
    try {
      const p = Engine.askPrompt ? Engine.askPrompt(result.r, { question: askText.trim(), interpret: result.it }) : null;
      const text = p && p.text ? p.text : String(result.r.summary || '');
      if (sendToComposer(text)) { setChatNote('已发到对话窗，往下看回复。'); return; }
      const diag = '（' + bridgeDiagText() + '）';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          () => setChatNote('对话输入框还没就绪' + diag + '，已复制提问；粘进对话窗回车即可。'),
          () => setChatNote('对话输入框还没就绪' + diag + '，复制也没成功；先点「复制文字结果」再贴。'));
      } else { setChatNote('对话输入框还没就绪' + diag + '；先点「复制文字结果」再贴进对话窗。'); }
    } catch (e) { setChatNote('发到对话窗失败：' + (e && e.message ? e.message : e)); }
  };

  const downloadReport = () => {
    if (!result || !result.r) return;
    try {
      const text = Engine.renderText ? Engine.renderText(result.r) : (result.r.summary || '');
      const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `命理报告-${result.r.system}.md`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    } catch (e) {
      console.error('[metaphysics] 导出失败', e);
    }
  };

  const downloadCard = () => {
    if (!result || !result.r) return;
    try {
      const url = PP.summaryCardPNG ? PP.summaryCardPNG(result.r, result.it) : '';
      if (!url) { setCopied('当前环境不支持 Canvas 导出'); return; }
      const a = document.createElement('a');
      a.href = url;
      a.download = `命理摘要-${result.r.system}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      console.error('[metaphysics] 长图导出失败', e);
    }
  };

  const btnStyle = { fontSize: 12, padding: '5px 12px' };

  const calcFit = () => {
    if (!result || !result.r || !result.r.past) return;
    setFit(Engine.verifyFit ? Engine.verifyFit(result.r.past.rows, pastMarks) : null);
  };

  const runRectify = () => {
    if (!result || result.kind !== 'bazi') return;
    try {
      const [y, m, d] = String(date).split('-').map(Number);
      const [, mm] = String(time).split(':').map(Number);
      const events = rectEvents
        .filter((e) => Number(e.year))
        .map((e) => ({ year: Number(e.year), kind: e.kind }));
      setRectRes(Engine.rectifyBirth ? Engine.rectifyBirth({
        base: { year: y, month: m, day: d, minute: Number.isFinite(mm) ? mm : 0 },
        gender,
        events,
        lateZi,
        trueSolar,
        address: address.trim() || undefined,
      }) : { error: '当前客户端未加载生时校正模块' });
    } catch (e) {
      setRectRes({ error: e && e.message ? e.message : String(e) });
    }
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
        showDate ? field(isBirth ? '出生日期（公历）' : timeKind === 'date' ? '日期（公历）' : '起卦日期（公历）',
          h('input', { className: 'mp-input', type: 'date', value: date, onChange: (e) => editDate(e.target.value) })) : null,
        showTime ? field(isBirth ? '出生时刻' : '起卦时刻',
          h('input', { className: 'mp-input', type: 'time', value: time, onChange: (e) => editTime(e.target.value) })) : null,
        isBirth ? field('性别', h('select', {
          className: 'mp-input', value: gender, onChange: (e) => setGender(e.target.value),
        }, h('option', { value: 'female' }, '女'), h('option', { value: 'male' }, '男'))) : null,
        isBirth ? field('出生地（省/市即可）', h('input', {
          className: 'mp-input', placeholder: '如 河北石家庄 / 成都', value: address,
          onChange: (e) => setAddress(e.target.value),
        })) : null,
        (tab === 'bazi' || tab === 'ziwei') ? h('label', { className: 'mp-field mp-checks' },
          h('input', {
            type: 'checkbox', checked: crossOn,
            onChange: (e) => setCrossOn(e.target.checked),
          }),
          h('span', { className: 'mp-lbl' }, '八字 × 紫微 交叉验证')) : null,
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
        tab === 'qimen' ? h('fieldset', { key: 'qmr', className: 'mp-qmrule' },
          h('legend', { className: 'mp-lbl' }, '换局规则'),
          h('div', { className: 'mp-qmopts', role: 'radiogroup', 'aria-label': '奇门换局规则' },
            [['chaibu', '拆补'], ['chaoshen', '超神接气'], ['zhirun', '置闰']].map(([value, label]) => h('label', {
              key: value, className: 'mp-qmopt',
            },
            h('input', {
              type: 'radio', name: 'qimen_rule', value,
              checked: qimenRule === value,
              onChange: () => setQimenRule(value),
            }),
            h('span', null, label)))),
          h('div', { className: 'mp-field' }, h('span', { className: 'mp-lbl' }, '晚子时'),
            h('select', { className: 'mp-input', value: qLateZi, onChange: (e) => setQLateZi(e.target.value) },
              h('option', { value: 'same-day' }, '23:00 后归当日'),
              h('option', { value: 'next-day' }, '23:00 后归次日'))),
          h('details', { className: 'mp-qmhelp' },
            h('summary', null, '三种规则有什么区别？'),
            h('p', null, '决定符头与节气如何对齐、是否插入闰局；同一个时刻在不同规则下可能得到不同局数。默认「拆补」与工具层一致。'))) : null,
        needAsk(tab) || tab === 'qimen' ? field(tab === 'qimen' ? '询问方向（定用神）' : '询问方向', h('select', {
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
        tab === 'zeri' ? field('所办事项', h('select', {
          className: 'mp-input', value: task, onChange: (e) => setTask(e.target.value),
        }, [
          ['常用', ['嫁娶', '搬家入宅', '出行', '开业', '签订合同', '祭祀']],
          ['婚嫁', ['嫁娶', '订婚', '领证', '提亲', '收送聘金', '满月酒']],
          ['生活', ['搬家', '入宅', '旅行', '访亲友', '入学', '求医', '祭祀']],
          ['建造', ['动土', '装修', '装修建造', '安葬', '试车买车']],
          ['工商', ['开业', '交易', '投资', '签订合同', '签约', '纳财', '赴任']],
        ].map(([g, items]) => h('optgroup', { key: g, label: g },
          items.map((t) => h('option', { key: `${g}-${t}`, value: t }, t)))))) : null,
        tab === 'convert' ? field('转换方向', h('div', { className: 'mp-seg' },
          h('button', { className: convMode === 'solar2lunar' ? 'on' : '', onClick: () => setConvMode('solar2lunar') }, '公历 → 农历'),
          h('button', { className: convMode === 'lunar2solar' ? 'on' : '', onClick: () => setConvMode('lunar2solar') }, '农历 → 公历'))) : null,
        (tab === 'convert' && convMode === 'lunar2solar') ? field('农历日期', h('input', {
          className: 'mp-input', value: lunarDate, placeholder: '如 2026-9-17',
          onChange: (e) => setLunarDate(e.target.value),
        })) : null,
        (tab === 'convert' && convMode === 'lunar2solar') ? h('label', {
          className: 'mp-check',
        }, h('input', { type: 'checkbox', checked: leapMonth, onChange: (e) => setLeapMonth(e.target.checked) }), ' 闰月') : null,
        tab === 'zeri' ? field('看多少天', h('input', {
          className: 'mp-input', type: 'number', min: 1, max: 60, value: days,
          onChange: (e) => setDays(e.target.value),
        })) : null,
        tab === 'zeri' ? field('当事人属相（可空）', h('select', {
          className: 'mp-input', value: shengXiao, onChange: (e) => setShengXiao(e.target.value),
        }, h('option', { value: '' }, '不排除'), ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
          .map((s) => h('option', { key: s, value: s }, s)))) : null,
        tab === 'xiaoliuren' ? field('起课方式', h('div', { className: 'mp-seg' },
          h('button', { className: xlrMode === 'time' ? 'on' : '', onClick: () => setXlrMode('time') }, '时间'),
          h('button', { className: xlrMode === 'number' ? 'on' : '', onClick: () => setXlrMode('number') }, '报数'))) : null,
        (tab === 'xiaoliuren' && xlrMode === 'number') ? field('第一个数', h('input', {
          className: 'mp-input', type: 'number', min: 1, max: 99, value: num1,
          onChange: (e) => setNum1(e.target.value),
        })) : null,
        (tab === 'xiaoliuren' && xlrMode === 'number') ? field('第二个数', h('input', {
          className: 'mp-input', type: 'number', min: 1, max: 99, value: num2,
          onChange: (e) => setNum2(e.target.value),
        })) : null,
        (tab === 'xiaoliuren' && xlrMode === 'number') ? field('第三个数', h('input', {
          className: 'mp-input', type: 'number', min: 1, max: 99, value: num3,
          onChange: (e) => setNum3(e.target.value),
        })) : null,
        tab === 'mbti' ? h('div', { className: 'mp-quiz-wrap' },
          h('div', { className: 'mp-lbl' }, '十六型人格问卷 · 4 题一页，按 1（完全不像）到 5（很像我）打分'),
          h(MbtiQuiz, {
            answers: mbAns,
            page: mbPage,
            onPick: (i, n) => setMbAns((prev) => {
              const next = prev.slice();
              next[i] = n;
              return next;
            }),
            onPage: (d) => setMbPage((p) => Math.max(0, Math.min(
              p + d,
              Math.max(0, Math.ceil(mbtiInfo().total / MBTI_PER_PAGE) - 1),
            ))),
            onSubmit: go,
            onClear: () => {
              setMbAns(new Array(mbtiInfo().total).fill(null));
              setMbPage(0);
              setResult(null);  
            },
          })) : null,
        tab === 'trend' ? field('算到几岁', h('input', {
          className: 'mp-input', type: 'number', min: 10, max: 100, value: toAge,
          onChange: (e) => setToAge(e.target.value),
        })) : null,
        tab === 'fengshui' ? field('看什么', h('div', { className: 'mp-seg' },
          h('button', { className: fsMode === 'natal' ? 'on' : '', onClick: () => setFsMode('natal') }, '命卦'),
          h('button', { className: fsMode === 'advise' ? 'on' : '', onClick: () => setFsMode('advise') }, '门主灶'),
          h('button', { className: fsMode === 'xuankong' ? 'on' : '', onClick: () => setFsMode('xuankong') }, '玄空'))) : null,
        (tab === 'fengshui' && fsMode !== 'natal') ? field('坐山（24 山）', h('input', {
          className: 'mp-input', value: sitting, placeholder: '如 子 / 乾',
          onChange: (e) => setSitting(e.target.value),
        })) : null,
        (tab === 'fengshui' && fsMode !== 'natal') ? field('朝向（24 山）', h('input', {
          className: 'mp-input', value: facing, placeholder: '如 午 / 巽',
          onChange: (e) => setFacing(e.target.value),
        })) : null,
        (tab === 'fengshui' && fsMode === 'xuankong') ? field('运（1–9）', h('input', {
          className: 'mp-input', type: 'number', min: 1, max: 9, value: fsPeriod,
          onChange: (e) => setFsPeriod(e.target.value),
        })) : null,
        tab === 'name' ? field('看什么', h('div', { className: 'mp-seg' },
          h('button', { className: nnMode === 'assess' ? 'on' : '', onClick: () => setNnMode('assess') }, '评名字'),
          h('button', { className: nnMode === 'generate' ? 'on' : '', onClick: () => setNnMode('generate') }, '生成候选'))) : null,
        tab === 'name' ? field('姓', h('input', {
          className: 'mp-input', value: surname, placeholder: '如 李',
          onChange: (e) => setSurname(e.target.value),
        })) : null,
        (tab === 'name' && nnMode === 'assess') ? field('名字', h('input', {
          className: 'mp-input', value: givenName, placeholder: '如 沐宸',
          onChange: (e) => setGivenName(e.target.value),
        })) : null,
        (tab === 'name' && nnMode === 'generate') ? field('候选个数', h('input', {
          className: 'mp-input', type: 'number', min: 1, max: 20, value: limitN,
          onChange: (e) => setLimitN(e.target.value),
        })) : null,
      ),
      isBirth ? h('div', { className: 'mp-checks' },
        h('label', { title: '按出生地经度把钟表时间换算成真太阳时' },
          h('input', { type: 'checkbox', checked: trueSolar, onChange: (e) => setTrueSolar(e.target.checked) }), '真太阳时'),
        isBirth ? h('label', { className: 'mp-field mp-checks' },
          h('input', { type: 'checkbox', checked: lateZi, onChange: (e) => setLateZi(e.target.checked) }),
          h('span', { className: 'mp-lbl' }, '晚子时换日')) : null,
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
      tab === 'mbti' ? null : h('div', { key: 'actions', className: 'mp-actions' },
        h('button', {
          className: 'mp-btn ghost', style: { fontSize: 12, padding: '5px 12px', marginRight: 8 },
          onClick: openSample, title: '用固定示例盘看完整报告（不改动你已填的数据）',
        }, '看示例'),
        h('button', { className: 'mp-btn', onClick: go, title: '时间仍为自动时，点它会取当下再起卦' },
          tab === 'tarot' ? '抽牌'
            : tab === 'bazi' || tab === 'ziwei' ? '排盘'
              : tab === 'hepan' ? '合盘'
                : tab === 'qimen' ? '起局'
                  : QUICK_TABS.indexOf(tab) >= 0 ? '看结果' : '起卦'))),

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
      h('b', null, tab === 'ziwei' || tab === 'bazi' ? '填好出生信息，点「排盘」'
        : tab === 'tarot' ? '写下想问的事，点「抽牌」'
          : tab === 'mbti' ? '按 1–5 给题目打分，答满 12 题就能看结果'
            : QUICK_TABS.indexOf(tab) >= 0 ? '填好参数，点「看结果」'
              : '写下所问之事，点「起卦」'),
      tab === 'ziwei' || tab === 'bazi' ? '出生日期、时刻与性别即可；出生地只影响真太阳时。'
        : tab === 'mbti' ? '4 题一页，答案只在本地参与计算，不会上传。'
          : QUICK_TABS.indexOf(tab) >= 0 ? '按上面的选项填好参数即可；全部在本机计算，不上传。'
            : '起卦时刻已自动取当下，也可以手动改。') : null,

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
            : result.kind === 'bazi' ? (PP.baziHTML(result.r) + (result.trend ? PP.trendHTML(result.trend) : ''))
              : result.kind === 'meihua' ? PP.meihuaHTML(result.r)
                : result.kind === 'daliuren' ? PP.daliurenHTML(result.r)
                  : result.kind === 'qimen' ? (PP.qimenHTML(result.r) + PP.qimenFactsHTML(result.r))
                  : result.kind === 'hepan' ? (result.r.chart === 'ziwei' ? PP.ziweiHepanHTML(result.r) : PP.hepanHTML(result.r))
                  : result.kind === 'tarot' ? PP.tarotHTML(result.r)
                    : result.kind === 'liuyao' ? PP.liuyaoHTML(result.r)
                      : result.kind === 'chenggu' ? PP.chengguHTML(result.r)
                        : result.kind === 'almanac' ? PP.almanacHTML(result.r)
                        : result.kind === 'trend' ? PP.trendHTML(result.r)
                        : result.kind === 'name' ? PP.nameHTML(result.r)
                        : result.kind === 'mbti' ? PP.mbtiHTML(result.r)
                        : result.kind === 'fengshui' ? PP.fengshuiHTML(result.r)
                        : PP.quickHTML(result.r),
          result.it,
          { folded: defaultFolded() },
        ),
      },
    }) : null,

    result ? h('div', { key: 'bar', className: 'mp-bar' },
      h('button', { className: 'mp-btn ghost', style: { fontSize: 12, padding: '5px 12px' }, onClick: copyResult },
        copied || '复制文字结果'),
      h('button', {
        className: 'mp-btn ghost', style: { fontSize: 12, padding: '5px 12px', marginLeft: 8 },
        onClick: downloadReport, title: '导出盘面 + 解析（含一页读懂、三张表）为 Markdown',
      }, '导出 .md'),
      h('button', {
        className: 'mp-btn ghost', style: { fontSize: 12, padding: '5px 12px', marginLeft: 8 },
        onClick: downloadCard, title: '生成 PNG 摘要卡（一页读懂 + 首张表），适合直接分享',
      }, '存为摘要长图')) : null,

    result ? h('div', { key: 'ask', className: 'mp-askbox', style: { flexWrap: 'wrap' } },
      h('input', {
        className: 'mp-input', value: askText, maxLength: 120,
        placeholder: '追问：如 2027 年事业怎么样（回车提交）',
        onChange: (e) => setAskText(e.target.value),
        onKeyDown: (e) => { if (e.key === 'Enter') doAsk(); },
      }),
      h('button', { className: 'mp-btn ghost', style: { fontSize: 12, padding: '5px 12px' }, onClick: doAsk }, '追问'),
      h('button', {
        className: 'mp-btn ghost', style: { fontSize: 12, padding: '5px 12px', marginLeft: 8 },
        onClick: askInChat, title: '把这张盘的摘要和你的问题一起发进 DSH 对话窗，由对话里的模型接着答',
      }, '问进对话'),
      (COMPOSER.ref ? null : h('div', { key: 'bridgediag', className: 'mp-note', style: { marginTop: 6, fontSize: 11, flexBasis: '100%' } }, bridgeDiagText())),
      chatNote ? h('div', { key: 'chatnote', className: 'mp-note', style: { marginTop: 6, fontSize: 12, flexBasis: '100%' } }, chatNote) : null) : null,

    fx ? h('div', { key: 'fx', className: 'mp-fx', dangerouslySetInnerHTML: { __html: PP.followupHTML(fx) } }) : null,

    (result && result.kind === 'bazi' && result.r.past) ? h('div', { key: 'verify', className: 'mp-verify' },
      h('div', { className: 'mp-verify-h' }, '验前事 · 过去几年的信号（只读，不改盘）'),
      result.r.past.rows.map((row) => h('div', { key: row.year, className: 'mp-verify-row' },
        h('span', { className: 'mp-verify-txt' }, `${row.year} ${row.ganzhi} · ${row.theme}`),
        h('span', { className: 'mp-verify-btns' }, ['yes', 'no', 'unsure'].map((m) => h('button', {
          key: m,
          className: 'mp-chip' + (pastMarks[row.year] === m ? ' on' : ''),
          onClick: () => setPastMarks(Object.assign({}, pastMarks, { [row.year]: m })),
        }, m === 'yes' ? '准' : m === 'no' ? '不准' : '不确定'))))),
      h('div', { className: 'mp-verify-foot' },
        h('button', { className: 'mp-btn ghost', style: btnStyle, onClick: calcFit }, '算贴合度'),
        fit ? h('span', { className: 'mp-verify-fit' }, `命中 ${fit.yes}/${fit.answered}（${fit.level}）：${fit.advice}`) : null)) : null,

    (result && result.kind === 'bazi') ? h('div', { key: 'rect', className: 'mp-rect' },
      h('div', { className: 'mp-verify-h' }, '生时校正 · 用过去的事反推时辰'),
      rectEvents.map((ev, i) => h('div', { key: i, className: 'mp-rect-row' },
        h('input', {
          className: 'mp-input', type: 'number', min: 1900, max: 2100, value: ev.year,
          onChange: (e) => setRectEvents(rectEvents.map((x, j) => (j === i ? Object.assign({}, x, { year: e.target.value }) : x))),
        }),
        h('select', {
          className: 'mp-input', value: ev.kind,
          onChange: (e) => setRectEvents(rectEvents.map((x, j) => (j === i ? Object.assign({}, x, { kind: e.target.value }) : x))),
        }, [['career', '事业变动'], ['wealth', '财运'], ['love', '感情'], ['move', '搬迁/出行'], ['health', '健康'], ['other', '其他']]
          .map(([v, l]) => h('option', { key: v, value: v }, l))))),
      h('button', { className: 'mp-btn ghost', style: btnStyle, onClick: runRectify }, '计算候选时辰'),
      rectRes ? (rectRes.error
        ? h('div', { className: 'mp-rect-err' }, rectRes.error)
        : h('div', { className: 'mp-rect-out' },
          h('div', { className: 'mp-verify-fit' }, rectRes.note),
          rectRes.candidates.slice(0, 6).map((c) => h('div', {
            key: c.hour, className: 'mp-rect-cand' + (c === rectRes.best ? ' best' : ''),
          }, `${c.label} · 时柱 ${c.hourGanzhi} · 日柱 ${c.dayGanzhi} · 命中 ${c.hits}/${c.total}`)))) : null) : null,

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

  try {
    COMPOSER.injectType = typeof slots.inject;
    const sp = typeof slots.spec === 'function' ? slots.spec('conversation.input.right') : null;
    COMPOSER.spec = sp ? sp.kind + '/' + sp.scope : '未声明';
  } catch (e) {
    COMPOSER.spec = '取声明失败';
    noteRegError(e);
  }
  const tryReg = (options, component) => {
    try {
      const d = slots.register(options, component);
      COMPOSER.regs += 1;
      return d;
    } catch (e) {
      noteRegError(e);
      return null;
    }
  };

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

  waitFor('sidebar.panellist', () => tryReg(
    { name: 'sidebar.panellist', id: 'metaphysics', order: 20, label: () => '命理 v' + (window.__MP_VER || '') },
    PanelIcon,
  ));

  waitFor('main', () => tryReg({ name: 'main', key: 'metaphysics' }, (p) => h(PanelGuard, null, h(App, p))));

  const sessionSeat = (key, install) => {
    const run = () => {
      try { slots.inject(key, install); }
      catch (e) {
        console.error('[metaphysics] 槽位注册失败：' + key, e);
        try { install(); } catch (e2) { console.error('[metaphysics] 直接注册也失败：' + key, e2); }
      }
    };
    try {
      if (typeof ctx.effect === 'function') ctx.effect(run, 'metaphysics: ' + key);
      else run();
    } catch (e) {
      console.error('[metaphysics] effect 包裹失败：' + key, e);
      run();
    }
  };

  sessionSeat('conversation.input.right', () => tryReg(
    { name: 'conversation.input.right', id: 'metaphysics-ask', order: 40 },
    ComposerBridge,
  ));

  sessionSeat('conversation.composer.dock', () => tryReg(
    { name: 'conversation.composer.dock', id: 'metaphysics-dock', order: 60 },
    ComposerProbe,
  ));

  let seatTries = 0;
  const trySeatNow = () => {
    if (COMPOSER.ref) return;
    seatTries += 1;
    const tag = '-' + seatTries;
    tryReg({ name: 'conversation.input.right', id: 'metaphysics-ask' + tag, order: 40 }, ComposerBridge);
    tryReg({ name: 'conversation.composer.dock', id: 'metaphysics-dock' + tag, order: 60 }, ComposerProbe);
  };
  let seatTriesLeft = 20;
  const seatRetry = () => {
    if (COMPOSER.ref || seatTriesLeft <= 0) return;
    seatTriesLeft -= 1;
    trySeatNow();
    setTimeout(seatRetry, 700);
  };
  try { setTimeout(seatRetry, 700); } catch (e) { /* 无计时器环境 */ }
  try {
    document.addEventListener('pointerdown', () => trySeatNow(), { once: true, capture: true });
  } catch (e) { /* 非 DOM 环境 */ }
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
