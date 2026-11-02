// 确定性伪随机数：只用于让「同一次摇卦 / 抽牌」可以复现（seed 相同 → 结果相同）。
// 不用于任何安全用途，也不承担密码学强度。

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
 * 从参数里取随机源：
 * - 没给 seed：沿用 Math.random（保持"真随机"的手感）
 * - 给了数字或数字字符串：mulberry32(seed)，可复现
 * - 给了别的东西：调用方应当先报错，这里兜底回 Math.random
 */
export function randomOf(seed) {
  if (seed === undefined || seed === null || seed === '') return Math.random;
  const n = Number(seed);
  return Number.isFinite(n) ? mulberry32(n) : Math.random;
}

/** 是否是一个可以接受的 seed */
export function isSeed(v) {
  if (v === undefined || v === null || v === '') return true;
  return Number.isFinite(Number(v));
}
