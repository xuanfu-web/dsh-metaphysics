// 事实层：正文段落只能引盘面上真实存在的条目
//
// 这条闸挡的是两件事：
//   ① 段落挂了不存在的事实 id（写错名字、或者事实函数改了 id 没同步）；
//   ② 事实层抽不出东西却没人发现——段落照样输出，等于「没有依据的断言」。
// 它不判文案好坏，只判「引用能不能对上」。
import { compute, interpret } from '../engine/index.js';
import { buildFacts, factById, refsFor, FACT_SYSTEMS, SECTION_REFS } from '../engine/facts.js';
import { ok, eq } from './_harness.mjs';

const CASES = [
  ['bazi', { system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '北京' }],
  ['bazi', { system: 'bazi', datetime: '1985-11-03T05:10', gender: 'female' }],
  ['ziwei', { system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male' }],
  ['liuyao', { system: 'liuyao', lines: [7, 8, 9, 7, 8, 9], question: '这份工作要不要接' }],
  ['qimen', { system: 'qimen', datetime: '2026-11-15T10:00', question: '这笔款能不能收回' }],
  ['tarot', { system: 'tarot', question: '该不该搬走', spread: 'three' }],
  ['daliuren', { system: 'daliuren', datetime: '2026-11-15T10:00', question: '事情几时成' }],
  ['meihua', { system: 'meihua', datetime: '2026-11-15T10:00', question: '要不要回老家' }],
  ['hepan', { system: 'hepan', datetime: '1990-05-12T14:30', gender: 'male', partner: { datetime: '1992-08-03T09:15', gender: 'female' } }],
  ['trend', { system: 'trend', datetime: '1990-05-12T14:30', gender: 'male' }],
  ['almanac', { system: 'almanac', datetime: '2026-11-15' }],
  ['zeri', { system: 'zeri', startDate: '2026-11-15', task: '入宅' }],
  ['xiaoliuren', { system: 'xiaoliuren', datetime: '2026-11-15T10:00' }],
  ['star', { system: 'star', datetime: '2026-11-15' }],
  ['numerology', { system: 'numerology', datetime: '1990-05-12' }],
  ['fengshui', { system: 'fengshui', datetime: '1990-05-12T14:30', gender: 'male' }],
  ['name', { system: 'name', datetime: '1990-05-12', surname: '李', givenName: '沐宸' }],
  ['convert', { system: 'convert', datetime: '1990-05-12' }],
  ['wuyunliuqi', { system: 'wuyunliuqi', datetime: '2026-11-15' }],
  ['taiyi', { system: 'taiyi', datetime: '2026-11-15' }],
];

// ── 一、事实层本身：有东西、有 id、不重复、只读盘面 ──
const bazi = compute(CASES[0][1]);
const baziIt = interpret(bazi);
const bFacts = buildFacts(bazi, baziIt && baziIt.envelope);
ok('八字事实层抽得出东西（≥12 条）', bFacts.length >= 12, `实际 ${bFacts.length}`);
eq('每条都有 id/label/value/group', bFacts.every((f) => f.id && f.label && f.value && f.group), true);
eq('id 不重复', new Set(bFacts.map((f) => f.id)).size, bFacts.length);
eq('id 一律 f- 或 ev- 开头', bFacts.every((f) => /^(f|ev)-/.test(f.id)), true);
ok('四柱事实在', !!factById(bFacts, 'f-bazi-pillars'));
ok('日主事实带天干', /丁/.test(String((factById(bFacts, 'f-bazi-daymaster') || {}).value || '')));
ok('旺衰事实带档位与分数', /身强/.test(String((factById(bFacts, 'f-bazi-strength') || {}).value || '')));
ok('当前大运按日期落位（甲申，2018 起）', /甲申/.test(String((factById(bFacts, 'f-bazi-dayun') || {}).value || '')), String((factById(bFacts, 'f-bazi-dayun') || {}).value));
ok('空亡是干支不是对象', !/\[object/.test(String((factById(bFacts, 'f-bazi-kongwang') || {}).value || '')), String((factById(bFacts, 'f-bazi-kongwang') || {}).value));
eq('任何一条事实里都不出现 [object', bFacts.some((f) => /\[object/.test(f.value)), false);

// 换盘则事实跟着变：同一个 id，值必须换
const bazi2 = compute(CASES[1][1]);
const f2 = buildFacts(bazi2, null);
ok('换一张盘，四柱变了', (factById(f2, 'f-bazi-pillars') || {}).value !== (factById(bFacts, 'f-bazi-pillars') || {}).value);
ok('换一张盘，日主变了', (factById(f2, 'f-bazi-daymaster') || {}).value !== (factById(bFacts, 'f-bazi-daymaster') || {}).value);

// 缺字段不编：给个空盘，不抛、返回 []
eq('空对象不抛、返回空表', buildFacts({}, null).length, 0);
eq('null 不抛、返回空表', buildFacts(null, null).length, 0);
eq('未登记体系走兜底不抛', Array.isArray(buildFacts({ system: 'nope' }, null)), true);

// ── 二、引用表：登记了就要能对上；没登记的不许凭空出现 ──
ok('八字登记表已建（≥20 段）', Object.keys(SECTION_REFS.bazi).length >= 20);
eq('FACT_SYSTEMS 里登记了八字', FACT_SYSTEMS.includes('bazi'), true);
eq('未登记体系没有 refs', refsFor('nope', 'cross'), null);
eq('未登记段落没有 refs', refsFor('bazi', 'no-such-section'), null);
ok('refsFor 返回的是副本（改它不影响登记表）', (() => {
  const a = refsFor('bazi', 'cross');
  a.push('f-fake');
  return refsFor('bazi', 'cross').indexOf('f-fake') < 0;
})());

// ── 三、段落引用：每条 refs 都必须指向真实存在的事实 ──
let refDangling = [];
let refCount = 0;
for (const [, args] of CASES) {
  let it = null;
  try { it = interpret(compute(args)); } catch (e) { refDangling.push(`${args.system} 抛了：${e.message}`); continue; }
  if (!it) continue;
  const ids = new Set((it.facts || []).map((f) => f.id));
  for (const s of it.sections || []) {
    if (!s.refs) continue;
    refCount += 1;
    for (const id of s.refs) {
      if (!ids.has(id)) refDangling.push(`${args.system}/${s.key} → ${id}`);
    }
  }
}
eq('没有指向空气的引用', refDangling.join('，'), '');
ok('至少跑了 20 段带引用', refCount >= 20, `实际 ${refCount}`);

// 八字的正文段落要有覆盖率：不是「能挂就挂」，而是「主要段落都挂上」
const baziSections = (baziIt && baziIt.sections || []).filter((s) => s.kind !== 'method');
const baziWithRefs = baziSections.filter((s) => s.refs && s.refs.length);
ok('八字正文段落覆盖率 ≥ 75%', baziWithRefs.length / Math.max(1, baziSections.length) >= 0.75,
  `${baziWithRefs.length}/${baziSections.length}`);
// 方法类不该挂：它讲规则，不指向这张盘上的某条
eq('方法类段落不挂 refs', baziSections.some((s) => s.kind === 'method' && s.refs), false);
ok('it.facts 挂在 interpret 结果上（不是只给测试用）', Array.isArray(baziIt.facts) && baziIt.facts.length > 0);

// ── 四、不因重写重新膨胀：facts 只描述盘面，不写判断语 ──
const JUDGE_WORDS = ['建议你', '一定能', '注定', '必然', '偏顺', '偏卡', '把握'];
const dirty = bFacts.filter((f) => JUDGE_WORDS.some((w) => f.value.indexOf(w) >= 0));
eq('事实层里不出现判断用语', dirty.map((f) => f.id).join('，'), '');
ok('单条事实不超过 160 字', bFacts.every((f) => f.value.length <= 160), String(Math.max(...bFacts.map((f) => f.value.length))));
