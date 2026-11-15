// 事实型头卡：没有判断可下的 10 个体系，一句话 + 两三条事实 + 一条注意。
//
// 这里钉三件事：
// ① 每个体系都得给得出卡——盘面明明算了一堆字段却从表格开始，等于让用户自己找结论；
// ② 卡里不许出现判断词（把握、置信、偏顺、偏卡）——这些体系没有方向可判，
//   以前走 defaultAdapter 那个 mixed/low 是假判断，不能换个地方再摆一次；
// ③ 缺数据时宁可返回 null，也不给空壳卡。
import { compute } from '../engine/index.js';
import { factHeadline, HEADLINE_SYSTEMS, hanCount } from '../engine/headline.js';
import { ok, eq } from './_harness.mjs';

const CASES = [
  ['almanac', { system: 'almanac', datetime: '2026-11-15T14:30' }],
  ['zeri', { system: 'zeri', startDate: '2026-11-15', days: 30, task: '入宅' }],
  ['chenggu', { system: 'chenggu', datetime: '1990-05-12T14:30' }],
  ['xiaoliuren', { system: 'xiaoliuren', datetime: '2026-11-15T14:30' }],
  ['star', { system: 'star', datetime: '2026-11-15T14:30' }],
  ['numerology', { system: 'numerology', datetime: '1990-05-12T14:30' }],
  ['mbti', { system: 'mbti', answers: [3, 4, 2, 5, 3, 4, 1, 3, 5, 2, 3, 4, 3, 2, 5, 4, 3, 3, 4, 2, 3, 5, 3, 4] }],
  ['fengshui', { system: 'fengshui', datetime: '1990-05-12T14:30', gender: 'male', sitting: '子', facing: '午' }],
  ['name', { system: 'name', datetime: '2024-05-12T14:30', givenName: '沐宸', surname: '王' }],
  ['convert', { system: 'convert', mode: 'solar2lunar', datetime: '2026-11-15T14:30' }],
];

const built = CASES.map(([tag, args]) => ({ tag, args, r: compute(args) }));

// ── ① 十个体系都出卡，字段齐、长度在框内 ────────────────────────────
for (const b of built) {
  const h = b.r.factHead;
  ok(`${b.tag} 给了头卡`, !!h, JSON.stringify(Object.keys(b.r).slice(0, 12)));
  if (!h) continue;
  ok(`${b.tag} headline 有内容`, hanCount(h.headline) >= 4, h.headline);
  ok(`${b.tag} headline 不超 60 字`, h.headline.length <= 60, String(h.headline.length));
  ok(`${b.tag} facts 至少一条`, Array.isArray(h.facts) && h.facts.length >= 1, JSON.stringify(h.facts));
  ok(`${b.tag} facts 不超过三条`, h.facts.length <= 3, String(h.facts.length));
  ok(`${b.tag} facts 键值都非空`, h.facts.every((f) => f.k && f.v), JSON.stringify(h.facts));
  ok(`${b.tag} facts 键不超 6 字`, h.facts.every((f) => f.k.length <= 6), JSON.stringify(h.facts.map((f) => f.k)));
  ok(`${b.tag} kicker 说的是「一览」`, /一览/.test(h.kicker), h.kicker);
}

// ── ② 不出判断词：这些体系本来就没有方向可判 ────────────────────────
const JUDGE = /把握|置信|偏顺|偏卡|大概率|建议你|direction|confidence/;
for (const b of built) {
  const h = b.r.factHead;
  if (!h) continue;
  const all = [h.headline, h.note, ...h.facts.map((f) => f.v)].join(' ');
  ok(`${b.tag} 不带判断词`, !JUDGE.test(all), all.slice(0, 80));
  ok(`${b.tag} 不出现旧固定句`, !/若条件与盘面对得上/.test(all), all.slice(0, 80));
}

// ── ③ 卡是这份盘算出来的，不是一个常量模板 ──────────────────────────
const a1 = compute({ system: 'almanac', datetime: '2026-11-15T14:30' }).factHead;
const a2 = compute({ system: 'almanac', datetime: '2026-12-25T08:00' }).factHead;
ok('两天黄历头条不同', a1 && a2 && a1.headline !== a2.headline, a1 && a2 ? `${a1.headline} / ${a2.headline}` : '缺卡');
const n1 = compute({ system: 'numerology', datetime: '1990-05-12T14:30' }).factHead;
const n2 = compute({ system: 'numerology', datetime: '1996-02-29T09:00' }).factHead;
ok('两个生日生命路径数不同或头条不同', n1 && n2 && n1.headline !== n2.headline, n1 && n2 ? `${n1.headline} / ${n2.headline}` : '缺卡');

// ── ④ 有 brief 的体系不再叠一张事实卡 ───────────────────────────────
const bazi = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male' });
ok('八字有 brief', !!bazi.brief, '无 brief');
ok('八字不出事实头卡', !bazi.factHead, JSON.stringify(bazi.factHead));
const ziwei = compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male' });
ok('紫微不出事实头卡', !ziwei.factHead, JSON.stringify(ziwei.factHead));

// ── ⑤ 缺数据宁可不给卡，也不给空壳 ──────────────────────────────────
eq('null 输入返回 null', factHeadline(null), null);
eq('空对象返回 null', factHeadline({}), null);
eq('未覆盖体系返回 null', factHeadline({ system: 'bazi' }), null);
eq('黄历只有 system 时降级为 null', factHeadline({ system: 'almanac' }), null);
const bare = factHeadline({ system: 'chenggu', total: {}, verdict: {}, song: {} });
eq('称骨缺骨重返回 null', bare, null);
const halfMbti = factHeadline({ system: 'mbti', type: 'INFJ', dims: [], profile: {}, oneLine: '', answered: 5, total: 24 });
ok('人格只有类型也能出卡', !!halfMbti && /INFJ/.test(halfMbti.headline), JSON.stringify(halfMbti && halfMbti.headline));
ok('人格缺维度不编四维行', !!halfMbti && !halfMbti.facts.some((f) => f.k === '四维'), JSON.stringify(halfMbti && halfMbti.facts));
// 字段类型乱给也不许抛——引擎里任何异常都会拖掉整张盘
const junk = factHeadline({ system: 'almanac', lunar: 5, ganzhi: 'x', yi: 3, positions: null, dayGod: [] });
ok('字段类型乱给不抛', junk === null || typeof junk.headline === 'string', JSON.stringify(junk));

// ── ⑥ 登记表与实际实现对齐 ──────────────────────────────────────────
eq('登记 10 个体系', HEADLINE_SYSTEMS.length, 10);
eq('登记表不重复', new Set(HEADLINE_SYSTEMS).size, 10);
for (const sys of HEADLINE_SYSTEMS) {
  ok(`${sys} 在 HEADLINE_SYSTEMS 里也有盘可算`, CASES.some(([t]) => t === sys), sys);
}
