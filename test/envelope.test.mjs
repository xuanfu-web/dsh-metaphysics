// 三层披露契约（OutputEnvelope）的守门测试。
//
// 这一层最容易腐化：只要有人往文案里塞一句「部分流派认为」或把「月破」写进 L1，
// 用户看到的就又从结论退回了推演日志。所以这里钉四件事：
//   ① 结构 —— 必填字段、枚举、条数、字数；
//   ② 去重 —— 同一件事的四种叫法必须并成一条；
//   ③ 越界 —— T2/T3 术语与模糊词不许出现在 L0+L1；
//   ④ 稳定 —— 同盘同参数两次输出逐字节相同（M5 的地基）。
//
// 断言工具是 ok(label, cond) / eq(label, actual, expected) —— 标签在前。
import { compute } from '../engine/index.js';
import {
  SCHEMA_VERSION, DIRECTIONS, CONFIDENCES, LIMITS, FORBIDDEN, DISCLAIMER,
  chartIdOf, dedupeFactors, duplicateRatio, renderL0L1, lenCn,
  validateEnvelope, repairEnvelope, buildEnvelope, pickVariant, rebuildForFollowup,
} from '../engine/envelope.js';
import { ok, eq } from './_harness.mjs';

// ── 一、结构与常量 ────────────────────────────────────────
eq('契约版本号', SCHEMA_VERSION, '1.0.0');
eq('方向枚举不多不少', DIRECTIONS.join(','), 'positive,negative,mixed,undetermined');
eq('把握枚举不多不少', CONFIDENCES.join(','), 'high,medium,low');
eq('全站唯一一条免责的 id', DISCLAIMER.id, 'std-v1');
eq('免责只落在页脚', DISCLAIMER.position, 'footer');
ok(`模糊套话黑名单至少 10 条（现在 ${FORBIDDEN.length}）`, FORBIDDEN.length >= 10);
ok('黑名单含「部分流派认为」', FORBIDDEN.includes('部分流派认为'));
ok('黑名单含「因人而异」', FORBIDDEN.includes('因人而异'));
eq('headline 下限 12 字', LIMITS.headline[0], 12);
eq('headline 上限 40 字', LIMITS.headline[1], 40);
eq('L0+L1 总字数上限', LIMITS.l0l1, 400);

// chart_id 是灰度和缓存的键，必须同输入同结果、不同输入不同结果
const idA = chartIdOf({ system: 'bazi', datetime: '1996-01-19T07:31', gender: 'male' });
const idA2 = chartIdOf({ system: 'bazi', datetime: '1996-01-19T07:31', gender: 'male' });
const idB = chartIdOf({ system: 'bazi', datetime: '1996-01-19T07:32', gender: 'male' });
eq('chart_id 同输入稳定', idA, idA2);
ok('chart_id 换个时辰就不同', idA !== idB);
ok('chart_id 是 7 位 base32 的大写字（能直接进 DOM id 与 URL）', /^[0-9A-Z]{7}$/.test(idA));

// ── 二、去重：几种叫法并成一条 ────────────────────────────
{
  const src = [
    { id: 'a', name: '六合', state: '节卦', impact: '整体在拢', weight: 0.6, evidence_refs: ['e1'] },
    { id: 'b', name: '六合卦', state: '节卦', impact: '整体在拢', weight: 0.8, evidence_refs: ['e2'] },
    { id: 'c', name: '卦逢六合', state: '节卦', impact: '整体在拢', weight: 0.5, evidence_refs: ['e3'] },
    { id: 'd', name: '世爻状态', state: '初爻', impact: '你这边偏弱', weight: 0.4, evidence_refs: ['e4'] },
  ];
  const out = dedupeFactors('liuyao', src);
  eq('三种六合叫法并成一条，加世爻共两条', out.length, 2);
  const he = out.slice().sort((x, y) => y.weight - x.weight)[0];
  eq('合并取最大权重（不是累加，也不是取第一条）', he.weight, 0.8);
  ok('合并后证据不丢，按 ref 累加', he.evidence_refs.length >= 2);
  ok('合并条数记进 duplicate_count，界面上要能说「另有 N 处同义表述」', he.duplicate_count >= 1);
  ok('原始四条重复率大于 1.5', duplicateRatio('liuyao', src) > 1.5);
  eq('去重后重复率恰好 1', duplicateRatio('liuyao', out), 1);
  eq('空列表重复率按 1 算，不返回 Infinity', duplicateRatio('liuyao', []), 1);
}

// ── 三、校验器：该拦的必须拦住 ────────────────────────────
function mini(patch = {}) {
  return {
    schema_version: SCHEMA_VERSION,
    meta: { mode: 'live', system: 'bazi', chart_id: 'x1', generated_at: '2026-11-15 08:00' },
    verdict: { headline: '日主偏强、气候偏燥，宜取水调候，见水这条线才算稳', direction: 'mixed', confidence: 'medium', condition: '若水这条线补上，则推进才稳' },
    factors: [{ id: 'f1', name: '日主强弱', state: '偏强', impact: '底气够，但也容易硬顶', weight: 0.9, evidence_refs: [] }],
    timeline: [],
    advice: ['先把手上三件事排个先后'],
    risk: '火太重时容易白耗力气',
    evidence: [],
    conflicts: [],
    disclaimer: { id: 'std-v1', position: 'footer' },
    ...patch,
  };
}

eq('合规样本通过校验', validateEnvelope(mini()).ok, true);
eq('版本号不符被拦', validateEnvelope(mini({ schema_version: '0.9' })).ok, false);
eq('headline 短于 12 字被拦', validateEnvelope(mini({ verdict: { ...mini().verdict, headline: '太短' } })).ok, false);
eq('方向不在枚举被拦', validateEnvelope(mini({ verdict: { ...mini().verdict, direction: 'maybe' } })).ok, false);
eq('mixed 却没写前提条件，被拦', validateEnvelope(mini({ verdict: { ...mini().verdict, direction: 'mixed', condition: '' } })).ok, false);
eq('因素为空被拦', validateEnvelope(mini({ factors: [] })).ok, false);
eq('因素超过 5 条被拦', validateEnvelope(mini({
  factors: new Array(6).fill(0).map((_, i) => ({ id: `f${i}`, name: `因素${i}`, state: 's', impact: 'i', weight: 0.1, evidence_refs: [] })),
})).ok, false);
eq('建议为空被拦', validateEnvelope(mini({ advice: [] })).ok, false);
eq('建议超过 3 条被拦', validateEnvelope(mini({ advice: ['一', '二', '三', '四'] })).ok, false);

{
  const bad = mini({ verdict: { ...mini().verdict, headline: '这部分流派认为日主偏强，另有说法称气候燥，总之因人而异' } });
  const r = validateEnvelope(bad);
  eq('套话黑名单命中即不合格', r.ok, false);
  ok('报错 rule_id 指向模糊词规则', r.errors.some((e) => /FUZZY|FORBIDDEN/.test(e.rule_id)));
  ok('每条报错四个字段齐全', r.errors.every((e) => 'field' in e && 'rule_id' in e && 'actual' in e && 'expected' in e));
}

{
  // T2 术语越界：「月破」只许在 L2
  const bad = mini({ factors: [{ id: 'f1', name: '用神状态', state: '月破', impact: '这一爻使不上劲', weight: 0.9, evidence_refs: [] }] });
  eq('T2 术语出现在 L1 被拦', validateEnvelope(bad, { system: 'liuyao' }).ok, false);
}

// 校验速度：PRD 要求 <50ms，200 次滚动平均给同样门槛
{
  const one = mini();
  const t0 = Date.now();
  for (let i = 0; i < 200; i += 1) validateEnvelope(one);
  const ms = (Date.now() - t0) / 200;
  ok(`校验单次耗时 ${ms.toFixed(2)}ms（门槛 50ms）`, ms < 50);
}

// ── 四、修复器：只改越界的那个字段，不动结论 ──────────────
{
  const bad = mini({ verdict: { ...mini().verdict, headline: '日主偏强气候偏燥宜取水调候见水这条线才算稳这条话已经超了四十个字的上限了吧' } });
  const fixed = repairEnvelope(bad);
  ok(`修复后 headline 收到 ${lenCn(fixed.verdict.headline)} 字`, lenCn(fixed.verdict.headline) <= LIMITS.headline[1]);
  eq('修复不动方向', fixed.verdict.direction, bad.verdict.direction);
}

// ── 五、五个体系真盘：结构合法 + 稳定 + 首屏够短 ──────────
const CASES = [
  ['bazi', { system: 'bazi', datetime: '1996-01-19T07:31', gender: 'male' }],
  ['ziwei', { system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'female' }],
  ['liuyao', { system: 'liuyao', datetime: '2026-10-22T14:10', lines: [9, 7, 8, 8, 7, 6] }],
  ['qimen', { system: 'qimen', datetime: '2026-10-31T12:00' }],
  ['tarot', { system: 'tarot', count: 3, seed: 42 }],
];

for (const [name, args] of CASES) {
  const r = compute({ ...args, withInterpret: true, question: '今年是否适合换工作', direction: 'career' });
  const env = r.interpret && r.interpret.envelope;
  ok(`${name}：解读结果带 envelope`, !!env);
  if (!env) continue;

  const check = validateEnvelope(env, { system: env.meta.system });
  ok(`${name}：契约校验通过${check.ok ? '' : '（' + check.errors.map((e) => e.rule_id).join('/') + '）'}`, check.ok);

  const text = renderL0L1(env);
  ok(`${name}：L0+L1 ${lenCn(text)} 字 ≤ ${LIMITS.l0l1}`, lenCn(text) <= LIMITS.l0l1);
  ok(`${name}：首屏不含套话`, !FORBIDDEN.some((w) => text.includes(w)));
  ok(`${name}：headline 有实际内容`, env.verdict.headline.length >= 8);
  eq(`${name}：免责指向全站唯一那条`, env.disclaimer.id, 'std-v1');
  ok(`${name}：因素 ${env.factors.length} 条在 1–5 之间`, env.factors.length >= 1 && env.factors.length <= 5);

  // 稳定：同参数再算一次，整块必须逐字节相同（含 chart_id、不含耗时）
  const again = compute({ ...args, withInterpret: true, question: '今年是否适合换工作', direction: 'career' });
  eq(`${name}：同盘两次输出逐字节相同`, JSON.stringify(again.interpret.envelope), JSON.stringify(env));

  // 追问只换问法，结论不动
  const fu = rebuildForFollowup(env, '换个说法再问一次同一件事');
  eq(`${name}：追问不换结论`, fu.verdict.headline, env.verdict.headline);
  eq(`${name}：追问不换方向`, fu.verdict.direction, env.verdict.direction);
}

// ── 六、灰度分桶 ──────────────────────────────────────────
eq('ratio=0 全走老渲染', pickVariant('any', 0), 'legacy');
eq('ratio=100 全走新渲染', pickVariant('any', 100), 'envelope');
eq('同一 chart_id 永远落同一侧（否则用户刷新一次界面就换样）', pickVariant('abc', 50), pickVariant('abc', 50));
{
  let env = 0;
  for (let i = 0; i < 400; i += 1) if (pickVariant(`chart-${i}`, 30) === 'envelope') env += 1;
  ok(`30% 灰度实际分到 ${env}/400，落在大致三成`, env > 60 && env < 180);
}

// ── 七、构建入口：未知体系不抛 ────────────────────────────
{
  const env = buildEnvelope({ system: 'unknown-sys', asOf: '2026-11-15T08:00' }, {});
  ok('未知体系返回对象或 null，不抛异常', !env || typeof env === 'object');
}
