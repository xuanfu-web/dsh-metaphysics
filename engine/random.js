// 确定性伪随机数：只用于让「同一次摇卦 / 抽牌」可以复现（seed 相同 → 结果相同）。
// 不用于任何安全用途，也不承担密码学强度。

/** mulberry32：32 位状态，分布够用，实现只有几行 */
export function mulberry32(seed) {
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
