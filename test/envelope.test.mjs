// 三层披露契约（PRD US-001~US-008 / US-010~US-013）的回归测试。
//
// 这一层最容易被后续改动破坏，而且破坏时不会报错——只会悄悄多出几百字、
// 悄悄把「六冲」写进首屏、悄悄把免责贴两遍。所以断言按 PRD 的硬约束逐条钉。
import { compute } from '../engine/index.js';
import {
  SCHEMA_VERSION, DIRECTIONS, CONFIDENCES, LIMITS, FORBIDDEN, HEDGE, DISCLAIMER,
  FACTOR_WHITELIST, OUTPUT_SCHEMA, DIRECTION_LABEL,
  chartIdOf, dedupeFactors, duplicateRatio, renderL0L1,
  validateEnvelope, repairEnvelope, buildEnvelope, rebuildForFollowup, pickVariant, lenCn,
} from '../engine/envelope.js';
import {
  TERM_DICT, SYNONYM_GROUPS, dictSize, synonymGroupCount,
  scanTerms, termsByTier, termPlain, synonymKey,
} from '../engine/term-dict.js';

let pass = 0, fail = 0;
const ok = (cond, name, extra = '') => {
  if (cond) { pass++; console.log('PASS ', name); }
  else { fail++; console.log('FAIL ', name, extra); }
};
const eq = (a, b, name) => ok(a === b, name, `实际 ${a} / 期望 ${b}`);

const baziR = compute({ system: 'bazi', datetime: '1995-08-20T14:30', gender: 'female' });
const ziweiR = compute({ system: 'ziwei', datetime: '1995-08-20T14:30', gender: 'female' });
const liuyaoR = compute({ system: 'liuyao', seed: 7, question: '这笔钱能要回来吗', direction: 'wealth' });
const qimenR = compute({ system: 'qimen', datetime: '2026-11-15T08:30', question: '什么时候能签下这个合同' });
const tarotR = compute({ system: 'tarot', seed: 3, count: 3, question: '要不要换工作', direction: 'career' });
const AS_OF = '2026-11-15T08:30';

const envOf = (r, extra = {}) => buildEnvelope(r, { asOf: AS_OF, mode: 'eval', noCache: true, ...extra });

// ── US-001 契约：枚举与 schema ─────────────────────────────
eq(SCHEMA_VERSION, '1.0.0', 'schema_version 固定 1.0.0');
ok(DIRECTIONS.join() === 'positive,negative,mixed,undetermined', 'direction 四值枚举');
ok(CONFIDENCES.join() === 'high,medium,low', 'confidence 三值枚举');
ok(OUTPUT_SCHEMA && OUTPUT_SCHEMA.version === SCHEMA_VERSION, '导出 JSON Schema 且版本一致');
ok(OUTPUT_SCHEMA.required.includes('verdict') && OUTPUT_SCHEMA.required.includes('factors'), 'Schema 必填项含 verdict/factors');
ok(DIRECTION_LABEL.positive && DIRECTION_LABEL.undetermined, '四个方向都有中文呈现，界面不出现英文枚举');

const GOOD = {
  schema_version: SCHEMA_VERSION,
  meta: { system: 'liuyao', chart_id: 'abc123', chart: '离为火', school: '纳甲', mode: 'eval', generated_at: '2026-11-15 08:30' },
  verdict: { headline: '妻财在四爻，月建平、日辰克；卦逢六冲，应期偏缓', direction: 'negative', confidence: 'medium', condition: '' },
  factors: [
    { id: 'f1', name: '用神状态', state: '月建平·日辰克', impact: '这一爻气不足，事情推得慢', weight: 0.9, evidence_refs: ['e1'] },
    { id: 'f2', name: '卦体格局', state: '离为火·六冲', impact: '整体在散，越推越薄', weight: 0.8, evidence_refs: ['e1'] },
  ],
  timeline: [{ window: '逢酉', pace: '缓', note: '只给区间' }],
  advice: ['先别追着要结果，把凭据留好', '找中间人问一句'],
  risk: '整体在散，越急越容易两头空',
  evidence: [{ id: 'e1', label: '用神', detail: '妻财｜四爻｜月建平' }],
  conflicts: [],
  disclaimer: { id: 'std-v1', position: 'footer' },
};

const goodCheck = validateEnvelope(GOOD, { system: 'liuyao' });
ok(goodCheck.ok, '合法样例通过校验', JSON.stringify(goodCheck.errors));

// 五份非法样例：字段缺失 / 字数超限 / 非法枚举 / 因素重复 / 免责重复
const clone = () => JSON.parse(JSON.stringify(GOOD));
const bad1 = clone(); delete bad1.verdict;
const bad2 = clone(); bad2.verdict.headline = '这一卦'.repeat(20);
const bad3 = clone(); bad3.verdict.direction = 'good';
const bad4 = clone(); bad4.factors.push({ id: 'f3', name: '用神状态', state: '月建克', impact: '这一爻气不足', weight: 0.5, evidence_refs: [] });
const bad5 = clone(); bad5.advice = ['仅供参考，先把凭据留好', '找中间人问一句'];
const BADS = [
  ['字段缺失', bad1, 'HEADLINE_LEN|DIRECTION_ENUM'],
  ['字数超限', bad2, 'HEADLINE_LEN|L0L1_LEN'],
  ['非法枚举', bad3, 'DIRECTION_ENUM'],
  ['因素重复', bad4, 'FACTOR_NAME_DUP'],
  ['免责重复', bad5, 'FUZZY_FORBIDDEN|DISCLAIMER_IN_BODY'],
];
for (const [name, sample, expectRule] of BADS) {
  const r = validateEnvelope(sample, { system: 'liuyao' });
  const hit = r.errors.some((e) => expectRule.split('|').includes(e.rule_id));
  ok(!r.ok && hit, `非法样例被拦截：${name}`, JSON.stringify(r.errors.map((e) => e.rule_id)));
}

// ── US-002 校验器：错误格式 / 耗时 ────────────────────────
const errShape = validateEnvelope(bad3, { system: 'liuyao' }).errors[0];
ok(['field', 'rule_id', 'actual', 'expected'].every((k) => k in errShape), '错误对象含 field/rule_id/actual/expected');
ok(goodCheck.ms < 50, `校验耗时 ${goodCheck.ms}ms < 50ms`);

// ── US-003 去重 ──────────────────────────────────────────
eq(synonymKey('liuyao', '六合'), synonymKey('liuyao', '六合卦'), '「六合」与「六合卦」归一到同一 key');
eq(synonymKey('liuyao', '卦逢六合'), synonymKey('liuyao', '六合'), '「卦逢六合」也归一');
const dup = dedupeFactors('liuyao', [
  { name: '用神状态', weight: 0.5, impact: '弱', evidence_refs: ['e1'] },
  { name: '用爻', weight: 0.9, impact: '强', evidence_refs: ['e2'] },
]);
eq(dup.length, 1, '同义因素合并成一条');
ok(dup[0].evidence_refs.length === 2, '合并后 evidence_refs 不丢', JSON.stringify(dup[0].evidence_refs));
eq(dup[0].duplicate_count, 1, '合并计次');
ok(dup[0].weight === 0.9, '合并取更高的权重');

const many = Array.from({ length: 8 }, (_, i) => ({ name: `项${i}`, weight: i / 10, impact: `结果${i}`, evidence_refs: [] }));
eq(dedupeFactors('bazi', many).length, LIMITS.factors[1], '去重后最多保留 5 条');
const sorted = dedupeFactors('bazi', many);
ok(sorted.every((f, i) => i === 0 || sorted[i - 1].weight >= f.weight), '按 weight 降序');

const DEDUPE_CASES = [
  ['bazi', '用神', '喜用'], ['bazi', '大运', '十年大运'], ['bazi', '忌神', '所忌'],
  ['ziwei', '命宫', '本命宫'], ['ziwei', '大限', '十年大限'], ['ziwei', '化忌', '化忌星'],
  ['liuyao', '六冲', '六冲之卦'], ['liuyao', '月建', '月支'], ['liuyao', '应期', '成事时间'],
  ['qimen', '值符', '直符'], ['qimen', '值使', '直使门'], ['tarot', '正位', '顺位'],
];
let dedupeHit = 0;
for (const [sys, a, b] of DEDUPE_CASES) if (synonymKey(sys, a) === synonymKey(sys, b)) dedupeHit += 1;
eq(dedupeHit, DEDUPE_CASES.length, `12 组同义场景全部归一（命中 ${dedupeHit}）`);
ok(duplicateRatio('liuyao', [{ name: '六合' }, { name: '六合卦' }, { name: '世爻状态' }]) <= 1.5, '重复率按「明细/去重后」计算');

// ── US-005 字数预算与模糊词 ───────────────────────────────
const badLong = clone();
badLong.advice = ['先'.repeat(30), '找中间人问一句'];
ok(!validateEnvelope(badLong, { system: 'liuyao' }).ok, '单条建议超 25 字被拦截');
const badHedge = clone();
badHedge.advice = ['可能先等等', '或许再问问'];
badHedge.risk = '大概会有点波动';
ok(validateEnvelope(badHedge, { system: 'liuyao' }).errors.some((e) => e.rule_id === 'FUZZY_HEDGE'), '限额词超过 2 次被拦截');

for (const [name, r] of [['bazi', baziR], ['ziwei', ziweiR], ['liuyao', liuyaoR], ['qimen', qimenR], ['tarot', tarotR]]) {
  const env = envOf(r);
  const v = validateEnvelope(env, { system: name });
  ok(v.ok, `${name} 真实盘通过全部硬约束`, JSON.stringify(v.errors));
  ok(v.l0l1Chars <= LIMITS.l0l1, `${name} 的 L0+L1 = ${v.l0l1Chars} 字 ≤ ${LIMITS.l0l1}`);
  ok(v.fuzzy <= LIMITS.fuzzyTotal, `${name} 模糊词 ${v.fuzzy} ≤ ${LIMITS.fuzzyTotal}`);
  ok(env.disclaimer.id === DISCLAIMER.id && env.disclaimer.position === 'footer', `${name} 免责只在页脚一份`);
  ok(!renderL0L1(env).includes('仅供参考'), `${name} 正文没有免责重复`);
}

// ── US-006 术语分级 ──────────────────────────────────────
for (const sys of ['bazi', 'ziwei', 'liuyao', 'qimen', 'tarot']) {
  ok(dictSize(sys) >= 30, `${sys} 术语词典 ≥30 条（实际 ${dictSize(sys)}）`);
  ok(synonymGroupCount(sys) >= 20, `${sys} 同义词组 ≥20（实际 ${synonymGroupCount(sys)}）`);
  ok(termsByTier(sys, 'T3').length >= 5, `${sys} 标出 T3 推演细节 ${termsByTier(sys, 'T3').length} 条`);
  ok(termsByTier(sys, 'T1').every((t) => termPlain(sys, t)), `${sys} 每个 T1 都有白话`);
}
const t3Sample = clone();
t3Sample.advice = ['先看神煞再决定', '找中间人问一句'];
ok(validateEnvelope(t3Sample, { system: 'bazi' }).errors.some((e) => e.rule_id === 'TERM_T3'), 'T3 术语进 L0/L1 即校验失败');
const t2Sample = clone();
t2Sample.verdict.headline = '妻财在四爻，月建平、日辰克；卦逢反吟，应期偏缓';
ok(validateEnvelope(t2Sample, { system: 'liuyao' }).errors.some((e) => e.rule_id === 'TERM_T2'), 'T2 术语进 L0/L1 也拦截');
ok(!scanTerms('liuyao', '这一卦整体在散，能拢住').length, '同义词里的口语不参与越界扫描（避免假阳性）');
const hitT1 = scanTerms('liuyao', '妻财在四爻，月建平');
ok(hitT1.every((h) => h.tier === 'T1'), '真实术语命中按 T1 记账', JSON.stringify(hitT1));

// ── US-007 免责一次化 ────────────────────────────────────
const envDis = envOf(baziR);
ok(renderL0L1(envDis).split('仅供参考').length === 1, 'L0+L1 里没有免责短语');
const badDis = clone();
badDis.disclaimer = { id: 'x', position: 'body' };
ok(validateEnvelope(badDis, { system: 'liuyao' }).errors.some((e) => e.rule_id === 'DISCLAIMER_SHAPE'), '免责挂错位置被拦截');

// ── US-008 chart_id 与追问复用 ───────────────────────────
const id1 = chartIdOf(baziR, { mode: 'eval' });
const id2 = chartIdOf(baziR, { mode: 'eval' });
eq(id1, id2, '同一张盘 chart_id 稳定');
ok(id1 !== chartIdOf(ziweiR, { mode: 'eval' }), '不同体系 chart_id 不同');
const e1 = envOf(liuyaoR);
const t0 = Date.now();
const e2 = buildEnvelope(liuyaoR, { asOf: AS_OF, mode: 'eval' });
ok(Date.now() - t0 < 500, '命中缓存时重建耗时 < 500ms');
eq(e2.verdict.direction, e1.verdict.direction, '缓存命中后结论方向不变');
const follow = rebuildForFollowup(e1, '那具体什么时候？');
eq(follow.verdict.direction, e1.verdict.direction, '追问不改原结论方向');
eq(follow.meta.chart_id, e1.meta.chart_id, '追问复用同一 chart_id');

// ── US-009 修复与降级 ────────────────────────────────────
const over = clone();
over.factors[0].impact = '这一爻气不足，事情推得很慢很慢，需要等很久才可能有一点点动静';
const fixed = repairEnvelope(over, validateEnvelope(over, { system: 'liuyao' }).errors, { system: 'liuyao' });
ok(lenCn(fixed.factors[0].impact) <= LIMITS.impact, '超长 impact 被定向截短');
eq(fixed.verdict.direction, over.verdict.direction, '修复不改结论方向');
const degraded = envOf({ ...baziR, strength: null, frame: null, climate: null, dayun: null });
ok(degraded && degraded.verdict && degraded.verdict.headline, '关键字段缺失时仍能给出信封（不阻断）');

// ── US-010~013 各体系适配 ────────────────────────────────
for (const [name, r, sys] of [['bazi', baziR, 'bazi'], ['ziwei', ziweiR, 'ziwei'], ['liuyao', liuyaoR, 'liuyao'], ['qimen', qimenR, 'qimen'], ['tarot', tarotR, 'tarot']]) {
  const env = envOf(r);
  ok(env.meta.system === sys, `${name} meta.system 正确`);
  ok(env.factors.length >= 1 && env.factors.length <= 5, `${name} 因素 1–5 条`);
  ok(env.factors.every((f) => (FACTOR_WHITELIST[sys] || []).includes(f.name)), `${name} 因素名全部落在白名单内`, JSON.stringify(env.factors.map((f) => f.name)));
  ok((env.conflicts || []).length >= 1, `${name} 有流派分歧进 conflicts（不塞正文）`);
  ok(env.evidence.every((e) => e.id && e.label), `${name} 证据卡有 id 与标题`);
  ok(!renderL0L1(env).includes('神煞'), `${name} 神煞类杂项不进 L0/L1`);
}
ok(envOf(baziR).factors.some((f) => f.name === '当前大运'), '八字只讲当前大运（含下一步进 timeline）');
ok(envOf(ziweiR).factors.some((f) => f.name === '四化落点'), '紫微讲四化落点');
ok(envOf(liuyaoR).factors.some((f) => f.name === '用神状态'), '六爻以用神状态为第一因素');
ok(envOf(qimenR).factors.some((f) => f.name === '用神落宫'), '奇门以用神落宫为第一因素');
ok(envOf(tarotR).factors.some((f) => f.name === '核心牌'), '塔罗以核心牌定调');

// ── US-015 灰度 ─────────────────────────────────────────
eq(pickVariant('x', 0), 'legacy', '比例 0 时全部走旧渲染（可回滚）');
eq(pickVariant('x', 100), 'envelope', '比例 100 时全部走新渲染');
const buckets = new Set();
for (let i = 0; i < 200; i += 1) buckets.add(pickVariant(`chart-${i}`, 50));
eq(buckets.size, 2, '比例 50 时两个变体都出现');

// ── 全局：24 盘抽样不回归 ───────────────────────────────
const DATES = ['1988-03-05T06:10', '1992-11-28T23:40', '1995-08-20T14:30', '2000-01-01T00:05', '1979-07-14T09:00', '2010-05-05T18:20'];
let sampleBad = 0;
for (const d of DATES) {
  for (const g of ['male', 'female']) {
    for (const s of ['bazi', 'ziwei']) {
      const env = buildEnvelope(compute({ system: s, datetime: d, gender: g }), { asOf: AS_OF, mode: 'eval', noCache: true });
      const v = validateEnvelope(env, { system: s });
      if (!v.ok || env.degraded) sampleBad += 1;
    }
  }
}
eq(sampleBad, 0, '24 盘抽样全部通过且无降级');

console.log(`\n${pass} PASS / ${fail} FAIL`);
if (fail) process.exit(1);
