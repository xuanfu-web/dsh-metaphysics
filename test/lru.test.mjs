// 统一 LRU：容量淘汰、命中后提序、TTL 过期、命中率统计。
import { createLru } from '../engine/lru.js';
import { cacheMetrics } from '../engine/calendar.js';
import { ok } from './_harness.mjs';

// ── 容量与淘汰顺序 ─────────────────────────────────────────
{
  const c = createLru({ max: 2, name: 't' });
  c.set('a', 1); c.set('b', 2);
  ok('按插入可取回', c.get('a') === 1 && c.get('b') === 2);
  c.get('a'); // 让 a 变成「最近使用」，此时队首是 b
  c.set('c', 3); // 应淘汰 b
  ok('淘汰最久未使用的一条', c.get('b') === undefined && c.get('a') === 1 && c.get('c') === 3);
  ok('容量不超过上限', c.size === 2, String(c.size));
  const s = c.stats();
  ok('统计了淘汰次数', s.evictions === 1, JSON.stringify(s));
  ok('统计了命中与未命中', s.hits >= 3 && s.misses >= 1, JSON.stringify(s));
}

// ── 覆盖写不额外占容量 ─────────────────────────────────────
{
  const c = createLru({ max: 2 });
  c.set('a', 1); c.set('b', 2); c.set('a', 9);
  ok('同键覆盖后仍是最新值', c.get('a') === 9 && c.size === 2);
}

// ── TTL 过期 ──────────────────────────────────────────────
{
  let clock = 1000;
  const c = createLru({ max: 10, ttlMs: 100, now: () => clock });
  c.set('k', 'v');
  ok('未过期时命中', c.get('k') === 'v');
  clock += 101;
  ok('过期后视为未命中', c.get('k') === undefined);
  ok('过期不计入淘汰', c.stats().expirations === 1 && c.stats().evictions === 0, JSON.stringify(c.stats()));
  ok('过期后 has 为 false', c.has('k') === false);
}

// ── has / delete / clear ──────────────────────────────────
{
  const c = createLru({ max: 3 });
  c.set('x', 1);
  ok('has 命中', c.has('x') === true && c.has('nope') === false);
  ok('delete 生效', c.delete('x') === true && c.get('x') === undefined);
  c.set('y', 2); c.clear();
  ok('clear 后为空', c.size === 0);
}

// ── 命中率 ────────────────────────────────────────────────
{
  const c = createLru({ max: 4, name: 'rate' });
  c.set('a', 1);
  c.get('a'); c.get('a'); c.get('b'); // 2 命中 1 未中
  const s = c.stats();
  ok('命中率按 hits/(hits+misses)', Math.abs(s.hitRate - 2 / 3) < 1e-9, JSON.stringify(s));
  ok('名字透传', s.name === 'rate');
}

// ── 节气三处缓存都接了指标 ──────────────────────────────────
{
  const rows = cacheMetrics();
  ok('节气相关的三处缓存都有指标', rows.length === 3 && rows.every((r) => typeof r.hitRate === 'number'),
    rows.map((r) => r.name).join(','));
  ok('指标带容量与上限', rows.every((r) => typeof r.size === 'number' && typeof r.max === 'number'));
}
