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

// ── 五、紫微：按宫位组织的事实，四化单独立组 ──
const zw = compute(CASES[2][1]);
const zwIt = interpret(zw);
const zFacts = buildFacts(zw, zwIt && zwIt.envelope);
const zVal = (id) => String((factById(zFacts, id) || {}).value || '');
ok('紫微事实层抽得出东西（≥12 条）', zFacts.length >= 12, `实际 ${zFacts.length}`);
eq('紫微 id 不重复', new Set(zFacts.map((f) => f.id)).size, zFacts.length);
ok('命宫事实带地支与主星', /戌/.test(zVal('f-ziwei-soul')) && /太阴/.test(zVal('f-ziwei-soul')), zVal('f-ziwei-soul'));
ok('身宫事实带落宫', /福德/.test(zVal('f-ziwei-body')), zVal('f-ziwei-body'));
ok('五行局事实在', /土五局/.test(zVal('f-ziwei-bureau')), zVal('f-ziwei-bureau'));
ok('生年四化四条齐（禄权科忌）', ['禄', '权', '科', '忌'].every((m) => zVal('f-ziwei-sihua').indexOf(`化${m}`) >= 0), zVal('f-ziwei-sihua'));
ok('十四主星落宫覆盖 ≥8 宫', (zVal('f-ziwei-mainstars').split('｜').length) >= 8, `${zVal('f-ziwei-mainstars').split('｜').length} 宫`);
ok('当前大限按年龄落位（35–44 岁）', /35–44/.test(zVal('f-ziwei-daxian')), zVal('f-ziwei-daxian'));
ok('流年四化四条齐', (zVal('f-ziwei-flow-sihua').split('、').length) === 4, zVal('f-ziwei-flow-sihua'));
eq('紫微事实里不出现 [object', zFacts.some((f) => /\[object/.test(f.value)), false);
eq('紫微事实里不出现判断用语', zFacts.filter((f) => JUDGE_WORDS.some((w) => f.value.indexOf(w) >= 0)).map((f) => f.id).join('，'), '');
ok('紫微登记表已建（≥8 段）', Object.keys(SECTION_REFS.ziwei).length >= 8, String(Object.keys(SECTION_REFS.ziwei).length));
eq('FACT_SYSTEMS 里登记了紫微', FACT_SYSTEMS.includes('ziwei'), true);
const zwSections = (zwIt && zwIt.sections || []).filter((s) => s.kind !== 'method');
const zwWithRefs = zwSections.filter((s) => s.refs && s.refs.length);
ok('紫微正文段落覆盖率 ≥ 75%', zwWithRefs.length / Math.max(1, zwSections.length) >= 0.75,
  `${zwWithRefs.length}/${zwSections.length}`);
// 换盘则事实跟着变：换性别会把大限顺逆与落宫一起改掉
const zw2 = compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'female' });
const z2 = buildFacts(zw2, null);
ok('换性别，当前大限跟着变', (factById(z2, 'f-ziwei-daxian') || {}).value !== zVal('f-ziwei-daxian'),
  `${(factById(z2, 'f-ziwei-daxian') || {}).value} vs ${zVal('f-ziwei-daxian')}`);

// ── 六、六爻：卦、爻、世应、日辰 ──
const ly = compute(CASES[3][1]);
const lyIt = interpret(ly);
const lFacts = buildFacts(ly, lyIt && lyIt.envelope);
const lVal = (id) => String((factById(lFacts, id) || {}).value || '');
ok('六爻事实层抽得出东西（≥8 条）', lFacts.length >= 8, `实际 ${lFacts.length}`);
ok('本卦事实带卦名与宫', /离为火/.test(lVal('f-liuyao-hex')) && /离宫/.test(lVal('f-liuyao-hex')), lVal('f-liuyao-hex'));
ok('变卦事实在', /震为雷/.test(lVal('f-liuyao-bian')), lVal('f-liuyao-bian'));
ok('世应事实带世与应', /世/.test(lVal('f-liuyao-shiying')) && /应/.test(lVal('f-liuyao-shiying')), lVal('f-liuyao-shiying'));
ok('动爻事实带两条动爻', lVal('f-liuyao-moving').split('、').length === 2, lVal('f-liuyao-moving'));
ok('日辰事实带旬与空亡', /癸巳/.test(lVal('f-liuyao-day')) && /空亡/.test(lVal('f-liuyao-day')), lVal('f-liuyao-day'));
ok('六亲事实带六爻', lVal('f-liuyao-liuqin').split('｜').length === 6, String(lVal('f-liuyao-liuqin').split('｜').length));
ok('六爻登记表已建（≥6 段）', Object.keys(SECTION_REFS.liuyao).length >= 6, String(Object.keys(SECTION_REFS.liuyao).length));
const lySections = (lyIt && lyIt.sections || []).filter((s) => s.kind !== 'method');
const lyWithRefs = lySections.filter((s) => s.refs && s.refs.length);
ok('六爻正文段落覆盖率 ≥ 75%', lyWithRefs.length / Math.max(1, lySections.length) >= 0.75,
  `${lyWithRefs.length}/${lySections.length}`);
// 换一卦，本卦与动爻都要换
const ly2 = compute({ system: 'liuyao', lines: [8, 7, 8, 6, 9, 7], question: '这份工作要不要接' });
const l2 = buildFacts(ly2, null);
ok('换卦，本卦名变了', (factById(l2, 'f-liuyao-hex') || {}).value !== lVal('f-liuyao-hex'),
  `${(factById(l2, 'f-liuyao-hex') || {}).value} vs ${lVal('f-liuyao-hex')}`);

// ── 七、奇门：局、值符值使、九宫、刑墓空马 ──
const qm = compute(CASES[4][1]);
const qmIt = interpret(qm);
const qFacts = buildFacts(qm, qmIt && qmIt.envelope);
const qVal = (id) => String((factById(qFacts, id) || {}).value || '');
ok('奇门事实层抽得出东西（≥8 条）', qFacts.length >= 8, `实际 ${qFacts.length}`);
ok('局事实带局数与节气', /阴遁三局/.test(qVal('f-qimen-ju')) && /立冬/.test(qVal('f-qimen-ju')), qVal('f-qimen-ju'));
ok('值符事实带星与宫', /天柱/.test(qVal('f-qimen-zhifu')) && /宫/.test(qVal('f-qimen-zhifu')), qVal('f-qimen-zhifu'));
ok('值使事实带门与宫', /惊门/.test(qVal('f-qimen-zhishi')) && /宫/.test(qVal('f-qimen-zhishi')), qVal('f-qimen-zhishi'));
ok('九宫配置覆盖 8 宫（中宫不计）', qVal('f-qimen-palaces').split('｜').length === 8, String(qVal('f-qimen-palaces').split('｜').length));
ok('空亡马星事实在', /空亡/.test(qVal('f-qimen-kongma')) && /马星/.test(qVal('f-qimen-kongma')), qVal('f-qimen-kongma'));
ok('门旺衰事实带旺相休囚死', ['旺', '相', '休', '囚', '死'].every((k) => qVal('f-qimen-states').indexOf(k) >= 0), qVal('f-qimen-states'));
ok('奇门登记表已建（≥6 段）', Object.keys(SECTION_REFS.qimen).length >= 6, String(Object.keys(SECTION_REFS.qimen).length));
const qmSections = (qmIt && qmIt.sections || []).filter((s) => s.kind !== 'method');
const qmWithRefs = qmSections.filter((s) => s.refs && s.refs.length);
ok('奇门正文段落覆盖率 ≥ 75%', qmWithRefs.length / Math.max(1, qmSections.length) >= 0.75,
  `${qmWithRefs.length}/${qmSections.length}`);
eq('七体系事实里都不出现空段（｜｜）', [bFacts, zFacts, lFacts, qFacts].some((arr) => arr.some((f) => /｜｜|^｜|｜$/.test(f.value))), false);
eq('七体系事实里都不出现 undefined/NaN', [bFacts, zFacts, lFacts, qFacts].some((arr) => arr.some((f) => /undefined|NaN/.test(f.value))), false);
