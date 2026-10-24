// 统一 LRU 缓存：上限 + 可选 TTL + 命中率计数。
//
// 原先四处缓存各自为政（节气瞬时 4096 FIFO、单年 32、三年窗口 8、地址 200+TTL），
// 淘汰策略与上限写法都不一样，也没法回答「到底有没有命中」。这里抽一个工厂，
// 各处只保留自己的上限与 TTL 参数，行为等价，但结构统一、可观测。

/**
 * @param {{max?: number, ttlMs?: number, name?: string, now?: () => number}} [opts]
 *   max   最多保留多少条（超出按最久未使用淘汰）
 *   ttlMs >0 时，超过该毫秒数的条目视为未命中并删除
 *   now   取时函数（测试可注入；默认 Date.now，避免引擎里散落时间源）
 */
export function createLru({ max = 64, ttlMs = 0, name = 'lru', now = () => Date.now() } = {}) {
  const map = new Map(); // key -> { value, at }
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
      // 命中后移到队尾，维持「最久未使用在队首」
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
    /** 快照：命中率在调用时按当前计数算，便于渲染一行指标 */
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
