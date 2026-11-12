// 摇卦 / 抽牌的随机源，两条路线分工：
//   · 不给 seed —— 走系统加密随机（globalThis.crypto.getRandomValues）。
//     占卜里「这一卦真是随机摇出来的」是可信度的一部分：Math.random 内部状态只有 48 位，
//     连续输出可以被倒推，对一个用来问事的东西来说太轻。
//   · 给了 seed —— 走 mulberry32，同 seed 同结果；句柄回放、影子盘对拍都靠这条。
//
// engine/ 是对外一份纯计算（客户端也要打包进去），所以这里既不 import node:crypto，
// 也不碰浏览器全局对象（tools/check-patterns.mjs 会拦）——只认 globalThis.crypto。

/** mulberry32：32 位状态，分布够用，实现只有几行 */
export function mulberry32(seed) {
  const n = Number(seed);
  // 状态只有 32 位，但不能只截低 32 位（`>>> 0`）：相差 2^32 的种子会跑出同一串数。
  // 拿毫秒时间戳当种子时，隔 49.7 天的两次摇卦会得到完全一样的卦——用户换了种子却看不出区别，
  // 「可复现」就退成了「可猜测」。所以把高位与小数位各折一份进状态；
  // 整数种子（0…2^31）的低 32 位仍原样参与，小种子不会莫名其妙换一卦。
  const lo = n >>> 0;
  const hi = Math.floor(Math.abs(n) / 4294967296) >>> 0;
  const frac = Math.round((n - Math.trunc(n)) * 4294967296) >>> 0;
  let a = (lo ^ Math.imul(hi + 1, 0x85ebca6b) ^ frac) >>> 0;
  if (!a) a = 0x9e3779b9;
  return function next() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * 系统加密随机源：从 globalThis.crypto（Node 19+ 与浏览器同源）按批取 32 位整数，
 * 一批够塔罗洗 78 张、六爻摇 18 次，省掉每次取数跨进 native 的开销。
 * 完全没有 crypto 的运行时退 Math.random —— 只为不抛错，这条兜底不承担强度。
 */
function cryptoRandom() {
  const web = globalThis.crypto;
  if (!web || typeof web.getRandomValues !== 'function') return Math.random;
  const POOL = 128;
  const pool = new Uint32Array(POOL);
  let idx = POOL;
  const next = () => {
    if (idx >= POOL) { web.getRandomValues(pool); idx = 0; }
    return pool[idx++] / 4294967296;
  };
  next.source = 'crypto';
  return next;
}

// 与宿主 / bool.js 同一把尺：只认十进制（可带指数、尾点）。Number() 会把
// "0x10"、false、[] 也变成有效数字，于是直接调引擎能排出盘、走工具层却被拒——
// 同一份输入两种命运，正是句柄与复现最容易分叉的地方。
const NUMERIC_TEXT = /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/;

const seedNumber = (seed) => {
  if (typeof seed === 'number') return Number.isFinite(seed) ? seed : NaN;
  if (typeof seed === 'string') {
    const s = seed.trim();
    if (s !== '' && NUMERIC_TEXT.test(s)) return Number(s);
  }
  return NaN;
};

/**
 * 从参数里取随机源：
 * - 没给 seed：系统加密随机（crypto），手感还是真随机，但挪不出可猜的规律
 * - 给了数字或十进制数字串：mulberry32(seed)，同 seed 同结果，可复现
 * - 给了别的东西：调用方应当先报错，这里兜底回 crypto
 */
export function randomOf(seed) {
  if (seed === undefined || seed === null || seed === '') return cryptoRandom();
  const n = seedNumber(seed);
  return Number.isFinite(n) ? mulberry32(n) : cryptoRandom();
}

/** 是否是一个可以接受的 seed */
export function isSeed(v) {
  if (v === undefined || v === null || v === '') return true;
  return Number.isFinite(seedNumber(v));
}
