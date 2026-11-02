// 可复现性：同一次抽牌 / 摇卦 / 流年表，必须能用参数完整回放。
//
// 0.14.1 及以前塔罗与六爻直接用 Math.random，同一问题两次调用得到不同卦/牌，
// 既无法回放，也没法写 golden 测试；八字的流年表则锚在「当前年份」，隔年重算结论就变了。
import { compute } from '../engine/index.js';
import { mulberry32 } from '../engine/random.js';
import { ok } from './_harness.mjs';

// ── ① 塔罗 seed ──────────────────────────────────────────────
const t1 = compute({ system: 'tarot', count: 3, seed: 42, question: '这份工作要不要接' });
const t2 = compute({ system: 'tarot', count: 3, seed: 42, question: '这份工作要不要接' });
const t3 = compute({ system: 'tarot', count: 3, seed: 43, question: '这份工作要不要接' });
const pick = (r) => r.cards.map((c) => `${c.name}${c.orientation}`).join('|');

ok('塔罗：同 seed 同结果', pick(t1) === pick(t2), pick(t1));
ok('塔罗：结果里回显 seed', t1.seed === 42);
ok('塔罗：不同 seed 得到不同牌面', pick(t1) !== pick(t3), `${pick(t1)} vs ${pick(t3)}`);
ok('塔罗：不传 seed 仍可用', pick(compute({ system: 'tarot', count: 1 })).length > 0);

// ── ② 塔罗 castAt 由 asOf 固定 ───────────────────────────────
const stamped = compute({ system: 'tarot', count: 1, seed: 7, asOf: '2026-01-02T03:04' });
ok('塔罗：asOf 决定 castAt', stamped.castAt === '2026-01-02 03:04', stamped.castAt);

// ── ③ 六爻 seed ──────────────────────────────────────────────
const l1 = compute({ system: 'liuyao', seed: 2026, question: '此事可行否' });
const l2 = compute({ system: 'liuyao', seed: 2026, question: '此事可行否' });
ok('六爻：同 seed 同卦', l1.cast.notation.join(',') === l2.cast.notation.join(','), l1.cast.notation.join(','));
ok('六爻：结果里回显 seed', l1.seed === 2026);
const l3 = compute({ system: 'liuyao', seed: 11, question: '此事可行否' });
ok('六爻：不同 seed 至少有一次不同（6 爻 × 4 态）', l1.cast.notation.join(',') !== l3.cast.notation.join(','));

// ── ④ 八字流年基准年 ─────────────────────────────────────────
const now = new Date().getFullYear();
const bz = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male' });
ok('八字：默认从今年起排流年', bz.liunianFrom === now && bz.liunian[0].year === now, `${bz.liunianFrom}`);
const bzFixed = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', asOf: '2018-06-01T00:00' });
ok('八字：asOf 钉死流年基准', bzFixed.liunianFrom === 2018 && bzFixed.liunian[0].year === 2018, `${bzFixed.liunianFrom}`);
ok('八字：asOf 回显在结果里', !!bzFixed.asOf && bzFixed.asOf.year === 2018);

// ── ⑤ 非法 seed / asOf ───────────────────────────────────────
function code(fn) {
  try { fn(); return ''; } catch (e) { return e.code || 'ERR'; }
}
ok('非法 seed 报 E_INPUT', code(() => compute({ system: 'tarot', count: 1, seed: 'abc' })) === 'E_INPUT');
ok('八字非法 asOf 报 E_ASOF', code(() => compute({
  system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', asOf: 'not-a-date',
})) === 'E_ASOF');

// ── ⑥ 种子折叠：状态只有 32 位，但不同种子不该撞成同一串 ──────
// 旧写法只取 `seed >>> 0`，相差 2^32 的种子完全等价。拿毫秒时间戳当种子时，
// 隔 49.7 天的两次摇卦会得到同一副卦——用户明明换了种子，结果却看不出区别，
// 「同 seed 同结果」于是退化成「换 seed 也一样」。
const seq = (s) => {
  const f = mulberry32(s);
  return Array.from({ length: 6 }, () => f().toFixed(9)).join(',');
};
ok('mulberry32：同种子逐位一致', seq(2026) === seq(2026));
for (const [a, b, label] of [
  [1, 1 + 4294967296, '整数种子相差 2^32'],
  [1730000000000, 1730000000000 + 4294967296, '时间戳种子相差 2^32'],
  [1730000000000, 1730000000001, '时间戳种子相差 1 毫秒'],
  [1, 1.5, '种子差半格'],
  [1, 2, '相邻小整数种子'],
]) ok(`mulberry32：${label}不再撞车`, seq(a) !== seq(b), `${a} → ${seq(a)} ／ ${b} → ${seq(b)}`);
