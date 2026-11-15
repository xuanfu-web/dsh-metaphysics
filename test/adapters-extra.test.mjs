// 大六壬 / 梅花 / 合盘 三个专属 adapter。
//
// 它们以前走 defaultAdapter：方向硬写 mixed、把握硬写 low、条件固定一句
// 「若条件与盘面对得上」，factors 只有「核心结论/关键条件」两条固定名。
// 也就是说，这三张盘在结论卡上什么都没说。这里把各自的判断钉死：
// 大六壬看三传走势与末传落点，梅花看体用生克与变卦，合盘看三项分与合冲计数。
import { compute } from '../engine/index.js';
import { ADAPTERS, FACTOR_WHITELIST, buildEnvelope, lenCn, validateEnvelope } from '../engine/envelope.js';
import { ok, eq } from './_harness.mjs';

const CASES = [
  ['daliuren', { system: 'daliuren', datetime: '2026-11-15T10:30', question: '这件事能不能成' }],
  ['daliuren-b', { system: 'daliuren', datetime: '2025-03-08T22:10', question: '换工作' }],
  ['meihua', { system: 'meihua', datetime: '2026-11-15T10:30', question: '这单能签吗', mode: 'time' }],
  ['meihua-b', { system: 'meihua', datetime: '2024-07-01T05:00', question: '要不要搬', mode: 'time' }],
  ['hepan', { system: 'hepan', datetime: '1990-05-12T14:30', gender: 'female', partner: { datetime: '1992-08-15T10:00', gender: 'male' } }],
  ['hepan-b', { system: 'hepan', datetime: '1988-01-02T08:00', gender: 'male', partner: { datetime: '1993-12-25T20:00', gender: 'female' } }],
];

const built = CASES.map(([tag, args]) => {
  const r = compute(args);
  const env = buildEnvelope(r, { system: args.system, noCache: true });
  return { tag, system: args.system, env, r };
});

// ── ① 六张盘全部自己算出来，没有一张悄悄降级回 default ──────────────
for (const b of built) {
  const chk = validateEnvelope(b.env, { system: b.system });
  ok(`${b.tag} 通过校验`, chk.ok, JSON.stringify(chk.errors).slice(0, 200));
  ok(`${b.tag} 没降级回 default`, !b.env.degraded, String(b.env.degraded_reason));
  const names = b.env.factors.map((f) => f.name);
  ok(`${b.tag} 因子名都在白名单里`, names.every((n) => (FACTOR_WHITELIST[b.system] || []).includes(n)), names.join(','));
  ok(`${b.tag} headline 在 12–40 之间`, lenCn(b.env.verdict.headline) >= 12 && lenCn(b.env.verdict.headline) <= 40, String(lenCn(b.env.verdict.headline)));
  ok(`${b.tag} 不是那两条固定因子名`, !names.includes('核心结论') && !names.includes('关键条件'), names.join(','));
  const cond = b.env.verdict.condition;
  if (cond) ok(`${b.tag} 条件句是「若X，则Y」`, /^若.+[，,].*则.+/.test(cond), cond);
  ok(`${b.tag} 没有「若条件与盘面对得上」`, cond !== '若条件与盘面对得上，则这条结论才站得住', cond);
}

// ── ② 方向是真的按盘算的，不是永远 mixed ────────────────────────
for (const sys of ['daliuren', 'meihua', 'hepan']) {
  const dirs = built.filter((b) => b.system === sys).map((b) => b.env.verdict.direction);
  ok(`${sys} 方向随盘变（至少一组非 mixed）`, dirs.some((d) => d !== 'mixed'), dirs.join(','));
}

// ── ③ 大六壬：末传空亡 → 偏卡 + 把握低 + 条件句 ─────────────────
const kongR = {
  sanChuan: {
    chu: { zhi: '子', liuQin: '官鬼', jiangFull: '太常' },
    zhong: { zhi: '丑', liuQin: '父母', jiangFull: '天空' },
    mo: { zhi: '寅', liuQin: '父母', jiangFull: '勾陈', xunKong: '子' },
  },
  geJu: { name: '贼克', detail: '重审' },
  dayGanZhi: '癸巳', hourZhi: '巳',
};
const kong = ADAPTERS.daliuren(kongR, {});
eq('末传落空判偏卡', kong.verdict.direction, 'negative');
eq('末传落空把握只给 low', kong.verdict.confidence, 'low');
ok('末传落空必须给条件句', /^若.+[，,].*则.+/.test(kong.verdict.condition), kong.verdict.condition);

// 递生 vs 递克：三传五行连着两处相生 / 相克，方向要分开
const sheng = ADAPTERS.daliuren({
  sanChuan: { chu: { zhi: '寅', liuQin: '妻财' }, zhong: { zhi: '午', liuQin: '妻财' }, mo: { zhi: '戌', liuQin: '妻财' } },
  geJu: { name: '比用', detail: '知一' },
}, {});
const ke = ADAPTERS.daliuren({
  sanChuan: { chu: { zhi: '寅', liuQin: '官鬼' }, zhong: { zhi: '辰', liuQin: '官鬼' }, mo: { zhi: '亥', liuQin: '官鬼' } },
  geJu: { name: '涉害', detail: '见机' },
}, {});
eq('三传递生 + 末传妻财 → 偏顺', sheng.verdict.direction, 'positive');
eq('三传递克 + 末传官鬼 → 偏卡', ke.verdict.direction, 'negative');
ok('递生的把握比递克高', sheng.verdict.confidence === 'high' || ke.verdict.confidence !== 'high',
  `${sheng.verdict.confidence}/${ke.verdict.confidence}`);

// ── ④ 梅花：四种体用关系各有各的话 ────────────────────────────
const mh = (relation, level, bianUpper, benUpper, benLower) => ADAPTERS.meihua({
  bodyUse: { relation, level, body: { trigram: '乾', element: '金' }, use: { trigram: '震', element: '木' } },
  ben: { name: '天雷无妄', upper: benUpper || '乾', lower: benLower || '震' },
  hu: { name: '风山渐' },
  bian: { name: '天地否', upper: bianUpper || '乾' },
  moving: 3, movingName: '三爻',
}, {});

const wantAdvice = [
  ['体克用', '吉', '主动权在你手上'],
  ['用克体', '凶', '都在耗你'],
  ['体生用', '平', '你在往外给'],
  ['用生体', '吉', '对方在给你'],
  ['比和', '平', '两边力量相当'],
  // 引擎真给的是整句，不是关键词：这两种写法都必须认出来
  ['体用比和，事顺而稳', '吉', '两边力量相当'],
  ['用克体（土克水），受阻受制', '凶', '都在耗你'],
];
for (const [rel, level, word] of wantAdvice) {
  const d = mh(rel, level);
  ok(`梅花「${rel}」有自己的说法`, d.advice.join('|').includes(word), d.advice.join('|'));
}
eq('用克体判偏卡', mh('用克体', '凶').verdict.direction, 'negative');
eq('体克用判偏顺', mh('体克用', '吉').verdict.direction, 'positive');
eq('平局判两头都有', mh('比和', '平').verdict.direction, 'mixed');
ok('平局把握只给 low', mh('比和', '平').verdict.confidence === 'low');
// 变卦没换道（上卦或下卦与本卦同）→ 把握升一档
ok('变卦同象时把握更高', mh('体克用', '吉', '乾').verdict.confidence === 'high');
ok('变卦换象时把握回落', mh('体克用', '吉', '坎').verdict.confidence === 'medium');

// ── ⑤ 合盘：三项分与合冲计数合起来定向 ──────────────────────────
const hp = (stemScore, gongScore, wxScore, good, bad) => ADAPTERS.hepan({
  score: { total: good * 10 + 30, level: good > bad ? '中等偏顺' : '差异较大' },
  dimensions: [
    { key: 'stem', label: '日主关系', score: stemScore, text: '甲' },
    { key: 'gong', label: '夫妻宫', score: gongScore, text: '子' },
    { key: 'wuxing', label: '五行互补', score: wxScore, text: '火' },
  ],
  detail: { tally: { good, bad, lean: '吉象偏多' }, crossBranches: [{ a: '子', b: '午', name: '相冲', score: -1, text: '冲' }] },
  a: { dayMaster: '甲木', dayBranch: '子' },
  b: { dayMaster: '丁火', dayBranch: '丑' },
}, {});

eq('三项全顺 + 吉多 → 偏顺', hp(5, 4, 28, 5, 1).verdict.direction, 'positive');
eq('三项全逆 + 凶多 → 偏卡', hp(-3, -2, 0, 1, 5).verdict.direction, 'negative');
eq('有顺有逆 → 两头都有', hp(5, -4, 3, 3, 3).verdict.direction, 'mixed');
ok('两头都有时必须给条件句', /^若.+[，,].*则.+/.test(hp(5, -4, 3, 3, 3).verdict.condition), hp(5, -4, 3, 3, 3).verdict.condition);
ok('合盘不下「配不配」的断言', !/必配|必离|配不配/.test(JSON.stringify(hp(5, 4, 28, 5, 1))), 'ok');

// ── ⑥ 盘面残缺时不许抛：宁可少说，也不能白屏 ──────────────────────
for (const sys of ['daliuren', 'meihua', 'hepan']) {
  let thrown = '';
  let d = null;
  try { d = ADAPTERS[sys]({}, {}); } catch (e) { thrown = String(e && e.message); }
  ok(`${sys} 拿到空盘面也不抛`, !thrown, thrown);
  ok(`${sys} 空盘面也给出方向枚举值`, d && ['positive', 'negative', 'mixed', 'undetermined'].includes(d.verdict.direction), d && d.verdict.direction);
  ok(`${sys} 空盘面也留一条建议`, d && d.advice.length >= 1 && d.advice.every((a) => a && lenCn(a) <= 25), d && d.advice.join('|'));
}

// ── ⑦ 盘标签落到 meta.chart，别让三张盘在历史列表里长一样 ─────────
const labels = built.map((b) => b.env.meta.chart);
ok('大六壬盘标签带日柱与时支', labels[0].includes('日') && labels[0].includes('时'), labels[0]);
ok('梅花盘标签带本卦与变卦', labels[2].includes('→'), labels[2]);
ok('合盘盘标签带双方日主', labels[4].includes('×'), labels[4]);
ok('三张盘标签互不相同', new Set(labels).size === labels.length, labels.join(' / '));
