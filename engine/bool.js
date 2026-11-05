/**
 * 读参数里的布尔值只走这里。
 *
 * 本文件是引擎入口的「参数口径归一」：布尔（bool / canonicalFlags）与
 * 数字（canonicalNumbers）各一道，盘面读的、句柄编码的、指纹比的是同一份值。
 *
 * 直接写 `args.cross === true` 会把字符串 "true" 与数字 1 都当成 false——
 * 模型经 JSON 传参时这三种写法都出现过，界面层归一后仍可能有旧句柄或直接调用
 * 引擎的路径。defaultValue 决定「没给值」时的口径（如 lateZi 默认 true）。
 */
export function bool(value, defaultValue = false) {
  if (value === undefined || value === null || value === '') return defaultValue;
  if (value === true || value === 1 || value === 'true' || value === '1') return true;
  if (value === false || value === 0 || value === 'false' || value === '0') return false;
  return defaultValue;
}

/**
 * 引擎入口的开关归一表：键 → 未给值时的默认口径。
 * 只收 schema 里声明为 boolean 的参数；盘面读值与句柄编码必须看到同一份值。
 */
export const FLAG_DEFAULTS = {
  lateZi: true, trueSolar: true, dst: true,
  isLeapMonth: false, leapAsNext: false,
  cross: false, hourUnknown: false, diff: false, shadow: false,
  trace: false, rectify: false, withInterpret: false,
};

/** 合盘对方 / 第三方对象里的同名开关（见 hepan、shadowPerson）：键 → 未给值时的默认口径。
 *  hourUnknown 的缺省是 false（合盘遇到 true 会拦），不能跟着 lateZi 等默认开。 */
const PARTNER_FLAGS = {
  lateZi: true,
  trueSolar: true,
  dst: true,
  hourUnknown: false,
};

function canonicalInto(source, defaults) {
  let out = source;
  const put = (key, value) => {
    if (Object.is(source[key], value)) return;
    if (out === source) out = { ...source };
    out[key] = value;
  };
  const drop = (key) => {
    if (out === source) out = { ...source };
    delete out[key];
  };
  for (const [key, fallback] of Object.entries(defaults)) {
    // 没给这个键就一个键都不加：凭空补 true 会改掉所有旧句柄的身份
    if (source[key] === undefined) continue;
    // 空串 / 空白串按「没给」处理（宿主 normalizeArgs 也是这么收的）：
    // 各体系的缺省并不相同——奇门 lateZi 缺省 same-day、紫微 lateZishi 缺省 current-day，
    // 若把 "" 折成全局缺省 true，同一次输入走工具层和直调引擎会排出两张盘。
    if (typeof source[key] === 'string' && source[key].trim() === '') { drop(key); continue; }
    put(key, bool(source[key], fallback));
  }
  return out;
}

function canonicalPartner(person) {
  if (!person || typeof person !== 'object' || Array.isArray(person)) return person;
  let out = person;
  for (const [key, fallback] of Object.entries(PARTNER_FLAGS)) {
    if (person[key] === undefined) continue;
    if (typeof person[key] === 'string' && person[key].trim() === '') {
      if (out === person) out = { ...person };
      delete out[key];
      continue;
    }
    const v = bool(person[key], fallback);
    if (Object.is(person[key], v)) continue;
    if (out === person) out = { ...person };
    out[key] = v;
  }
  return out;
}

/**
 * 把 args 里的字符串布尔 / 数字布尔统一成真布尔，返回**新对象**（无改动时返回原对象）。
 *
 * 为什么要在入口做一次：0.62.x 的盘面读开关用 `!== false`（只认字面 false），
 * 句柄却直接编码传进来的原文。于是 `trueSolar:"false"` 排出「开真太阳时」的盘，
 * 句柄里却写着 false——同一张盘两个身份，影子盘对拍、深链回放、跨版本 diff 全跟着错。
 * 现在读值已统一走 `bool()`，这道归一仍要在入口做：它保证句柄与指纹拿到的
 * 也是同一份真布尔，而不只是「读的时候碰巧算出同一个结果」。
 */
export function canonicalFlags(args) {
  if (!args || typeof args !== 'object') return args;
  let out = canonicalInto(args, FLAG_DEFAULTS);
  for (const key of ['partner', 'partner2']) {
    const person = out[key];
    const fixed = canonicalPartner(person);
    if (fixed !== person) {
      if (out === args) out = { ...args };
      out[key] = fixed;
    }
  }
  return out;
}

// ── 数字归一 ────────────────────────────────────────────────
// 只把「整串就是一个数」的字符串转成数字：count:"3" → 3、period:"9" → 9。
// "9运" / "十" / 空串原样留着，让各体系原有的范围校验报 E_INPUT，
// 而不是先变成 NaN 再以「没给」的身份混过去。

/** schema 里 type 为 number / integer 的顶层键（options 由工具层摊平到顶层） */
export const NUMERIC_KEYS = [
  'hour', 'minute', 'longitude', 'verifyPast', 'seed',
  'days', 'lunarYear', 'lunarMonth', 'lunarDay',
  'num1', 'num2', 'num3', 'upper', 'lower', 'changing',
  'count', 'toAge', 'fortuneYear', 'period', 'limit',
  'sittingOffset', 'sittingDegree', 'facingOffset', 'facingDegree',
  'year', 'month', 'day',
];

/** 数值数组：逐项转，任一项不是数字就整组不动，交给原有校验报错 */
export const NUMERIC_ARRAY_KEYS = ['lines', 'rectifyHours', 'answers'];

/** 字形 → 笔画的映射：值也是数字（起名的 strokeOverrides / surnameStrokes） */
export const NUMERIC_MAP_KEYS = ['strokeOverrides', 'surnameStrokes'];

// 与宿主 normalizeArgs 同一把尺：指数写法（1e3）与尾点（5.）都算「整串是一个数」。
// 收窄成十进制会把 seed:"1e3" 留在字符串态——randomOf 照样按 1000 出牌，句柄却记着
// "1e3"，同一张盘两个身份，正是这刀要消掉的东西。
const NUMERIC_RE = /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/;

function numericOf(value) {
  if (typeof value !== 'string') return value;
  const s = value.trim();
  if (!NUMERIC_RE.test(s)) return value;
  const n = Number(s);
  return Number.isFinite(n) ? n : value;
}

function canonicalMap(obj) {
  let changed = false;
  const next = {};
  for (const [k, v] of Object.entries(obj)) {
    const n = v === null ? null : numericOf(v);
    if (!Object.is(n, v)) changed = true;
    next[k] = n;
  }
  return changed ? next : obj;
}

/**
 * 把数字串统一成数字，返回**新对象**（无改动时返回原对象）。
 *
 * 为什么也要在入口做一刀：句柄直接编码参数原文，`count:"3"` 与 `count:3`
 * 抽出同一副牌、却拿到两个句柄——影子盘对拍、深链回放会认成两张盘。
 * 另有两处不只影响身份，是实打实的算错：
 *   * 风水 `period:"9"` 被 1–9 校验拒掉，报错里还写着「收到「9」」，看着像误报；
 *   * 起名 `strokeOverrides:{"秋":"9"}` 被 overridesOf 静默丢掉，五格退回字库笔画，
 *     用户给的笔画根本没参与计算。
 */
export function canonicalNumbers(args) {
  if (!args || typeof args !== 'object') return args;
  let out = args;
  const put = (key, value) => {
    if (Object.is(args[key], value)) return;
    if (out === args) out = { ...args };
    out[key] = value;
  };
  for (const key of NUMERIC_KEYS) {
    if (args[key] === undefined) continue;
    // 空串 / 空白串按「没给」处理（与宿主 normalizeArgs 一致）。留着会变成另一条路：
    // 梅花数字起卦 Number("") = 0、风水 period 直接报「收到「」」——同一份输入两种结果。
    if (typeof args[key] === 'string' && args[key].trim() === '') {
      if (out === args) out = { ...args };
      delete out[key];
      continue;
    }
    put(key, numericOf(args[key]));
  }
  for (const key of NUMERIC_ARRAY_KEYS) {
    const v = args[key];
    if (!Array.isArray(v)) continue;
    let changed = false;
    const next = v.map((x) => {
      if (x === null) return null;
      if (typeof x === 'string' && x.trim() === '') { changed = true; return undefined; }
      const n = numericOf(x);
      if (!Object.is(n, x)) changed = true;
      return n;
    });
    if (changed) put(key, next);
  }
  for (const key of NUMERIC_MAP_KEYS) {
    const v = args[key];
    if (!v || typeof v !== 'object' || Array.isArray(v)) continue;
    put(key, canonicalMap(v));
  }
  return out;
}
