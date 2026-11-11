// 合化四条件（问真《基础知识·干支中》）：只读判定，不改关系文案、不改旺衰与喜忌。
// 四条件：天干紧挨 / 被化天干无同类帮扶 / 月令有引化物 / 引化物不被克；
// 隔合、遥合、争合、妒合一律不化；反化不做。
import { compute } from '../engine/index.js';
import { judgeHehua } from '../engine/hehua.js';
import { ok, eq } from './_harness.mjs';

const bazi = (datetime, extra = {}) => compute({ system: 'bazi', datetime, gender: 'male', trueSolar: false, ...extra });

// 手工组四柱：只给 judgeHehua 需要的 stem / branch
const mk = (o) => {
  const p = {};
  for (const k of ['year', 'month', 'day', 'hour']) p[k] = { stem: o[k][0], branch: o[k][1] };
  return p;
};
const hh = (o, keys) => {
  const p = mk(o);
  return judgeHehua(p, p.month.branch, p.day.stem, keys);
};
const one = (o, pair) => {
  const h = hh(o);
  return h.items.find((x) => x.pair === pair) || {};
};

// ── 一、参考例：问真唯一完整例「己酉 甲戌 壬戌 丁未」甲己化土成功 ──
const REF = { year: '己酉', month: '甲戌', day: '壬戌', hour: '丁未' };
const ref = hh(REF);
eq('参考例判出两组合', ref.items.length, 2);
const jiaji = ref.items.find((x) => x.pair === '己甲') || {};
eq('甲己(己甲)判化成功', jiaji.status, '化成功');
eq('甲己化出来的五行是土', jiaji.huaElement, '土');
eq('甲己紧挨', jiaji.closeness, '紧挨');
eq('甲己四条件全过', JSON.stringify(jiaji.conditions), JSON.stringify({
  adjacent: true, noConflict: true, unrescued: true, monthLead: true, leadUnchecked: true,
}));
eq('甲己被化的是阴干己', jiaji.yinStem, '己');
eq('transformed 记下己甲化土', ref.transformed.join(','), '己甲化土');
ok('化成功的证据写出月令引化', jiaji.evidence.includes('月令戌为土') && jiaji.evidence.includes('正好引化'), jiaji.evidence);
ok('证据写明确切的被化干与克神', jiaji.evidence.includes('被化干己土在天干无同类帮扶') && jiaji.evidence.includes('克土的木不在月干与日干'), jiaji.evidence);

// 同盘壬丁合：月令戌不是木，只作合绊
const rending = ref.items.find((x) => x.pair === '壬丁') || {};
eq('壬丁不化', rending.status, '合绊不化');
eq('壬丁败在月令无引化', rending.conditions.monthLead, false);
eq('壬丁涉及日元', rending.dayMasterInvolved, true);

// ── 二、四个否决条件各一条反证 ────────────────────────────────
// ① 隔合：庚乙相隔一位
const ge = one({ year: '辛丑', month: '庚申', day: '甲子', hour: '乙丑' }, '庚乙');
eq('相隔一位判隔合', ge.closeness, '隔合');
eq('隔合不化', ge.status, '隔合不化');
eq('隔合败在非紧挨', ge.conditions.adjacent, false);
ok('隔合文案写明相隔一位', ge.evidence.includes('相隔一位（隔合）'), ge.evidence);

// ① 遥合：癸戊相隔两位
const yao = one({ year: '癸卯', month: '甲午', day: '辛丑', hour: '戊子' }, '癸戊');
eq('相隔两位判遥合', yao.closeness, '遥合');
eq('遥合不化', yao.status, '遥合不化');
ok('遥合文案写明相隔两位', yao.evidence.includes('相隔两位（遥合）'), yao.evidence);

// ① 争合：两阳干（壬壬）争一阴干丁
const zheng = hh({ year: '壬子', month: '丁卯', day: '壬寅', hour: '甲辰' });
ok('争合的两组都不化', zheng.items.length === 2 && zheng.items.every((x) => x.status === '争合不化'), zheng.items.map((x) => x.status).join(','));
ok('争合两组都记 noConflict=false', zheng.items.every((x) => x.conditions.noConflict === false));
ok('争合文案点出同一阴干', zheng.text.includes('同一阴干'), zheng.text);

// ① 妒合：两阴干（乙乙）争一阳干庚
const du = hh({ year: '乙丑', month: '庚申', day: '乙酉', hour: '丙子' });
ok('妒合的两组都不化', du.items.length === 2 && du.items.every((x) => x.status === '妒合不化'), du.items.map((x) => x.status).join(','));
ok('妒合文案点出同一阳干', du.text.includes('同一阳干'), du.text);

// ② 被化天干有同类帮扶
const fu = one({ year: '甲子', month: '己巳', day: '戊辰', hour: '丙辰' }, '甲己');
eq('有比劫帮扶不化', fu.status, '合绊不化');
eq('败在 unrescued', fu.conditions.unrescued, false);
ok('写明帮扶的是哪一干', fu.evidence.includes('被化干己在天干有同类戊帮扶'), fu.evidence);

// ③ 月令无引化物
const yin = one({ year: '甲子', month: '己亥', day: '乙丑', hour: '丙子' }, '甲己');
eq('月令亥（水）不引化土', yin.conditions.monthLead, false);
eq('月令无引化则不化', yin.status, '合绊不化');

// ④ 引化物被克：月干乙木克土
const ke = one({ year: '丙寅', month: '乙丑', day: '甲子', hour: '己巳' }, '甲己');
eq('月令丑本气为土，有引化', ke.conditions.monthLead, true);
eq('但月干乙木克土，仍不化', ke.conditions.leadUnchecked, false);
eq('引化物被克就不化', ke.status, '合绊不化');
ok('写明克神在哪一柱', ke.evidence.includes('乙（月干）'), ke.evidence);

// ④ 克神只在时干：不挡化，但要在文案里交代
const far = hh({ year: '己酉', month: '甲戌', day: '壬戌', hour: '乙巳' });
eq('克神只在时干仍判化成功', far.items[0].status, '化成功');
ok('并补一句说明离得远', far.text.includes('被化神隔开，不挡化'), far.text);

// ── 三、日元参与：化成功也不改日元五行 ──────────────────────────
const dm = hh({ year: '丙寅', month: '己戌', day: '甲子', hour: '丁卯' });
eq('日元参与的甲己化成功', dm.items[0].status, '化成功');
eq('标记日元参与', dm.items[0].dayMasterInvolved, true);
ok('文案声明日元仍按原五行论', dm.text.includes('五行属性仍按原干论'), dm.text);
ok('notes 里也声明一次', dm.notes.some((n) => n.includes('本质属性不会转变')), dm.notes.join(' | '));
ok('notes 说明五合未必以日元为主', dm.notes.some((n) => n.includes('未必以日元为主')), dm.notes.join(' | '));
ok('notes 声明反化不做', dm.notes.some((n) => n.includes('反化') && n.includes('不做')), dm.notes.join(' | '));

// ── 四、边界：无合、少一柱 ────────────────────────────────────
const none = hh({ year: '甲子', month: '丙寅', day: '戊辰', hour: '庚申' });
eq('无五合时 items 为空', none.items.length, 0);
eq('无五合时文案给出说明', none.text, '四柱天干未见五合。');
eq('无五合时 transformed 为空', none.transformed.length, 0);

const three = hh(REF, ['year', 'month', 'day']);
eq('时辰未知只判年月日三干', three.items.length, 1);
eq('时辰未知仍能判出甲己化土', three.items[0].status, '化成功');
const shortKeys = judgeHehua(mk(REF), '戌', '壬', []);
eq('传入空柱列表时兜底', shortKeys.text, '天干不足两柱，五合无从判起。');

// ── 五、只读：关系文案与旺衰、喜忌一概不动 ──────────────────────
const r69 = bazi('1969-10-14T14:00');
const stems = r69.relations.stems;
ok('relations.stems 仍是「待定」原文', stems.includes('己甲合（化土待定）') && stems.includes('壬丁合（化木待定）'), stems.join(' | '));
ok('relations.stems 没被改写成「合化土」', !stems.some((x) => x.includes('合化土')), stems.join(' | '));
ok('hehua 挂在 relations 上并判出化成功', r69.relations.hehua.items.some((x) => x.pair === '己甲' && x.status === '化成功'));
ok('旺衰结论未被合化改动', r69.strength.level === '身弱' && r69.strength.score === -1.3, `${r69.strength.level} ${r69.strength.score}`);
ok('喜忌未被合化改动', r69.frame.yongshen.favor.join(',') === '金,水' && r69.frame.yongshen.avoid.join(',') === '木,火,土');
ok('method 声明只作标注', r69.relations.hehua.method.includes('四条件'), r69.relations.hehua.method);
ok('boundary 声明不改旺衰与喜忌', r69.relations.hehua.boundary.includes('不改旺衰分') && r69.relations.hehua.boundary.includes('不改喜忌'), r69.relations.hehua.boundary);

// ── 六、时辰未知：只判三干，且明说 ──────────────────────────────
const r69u = bazi('1969-10-14T14:00', { hourUnknown: true });
eq('时辰未知只剩一组合', r69u.relations.hehua.items.length, 1);
eq('时辰未知仍判甲己化土', r69u.relations.hehua.items[0].status, '化成功');
eq('打了占位时柱标记', r69u.relations.hehua.placeholderHour, true);
ok('文案说明时干那一组无从判起', r69u.relations.hehua.text.includes('时柱暂缺') && r69u.relations.hehua.text.includes('日干与时干那一组无从判起'), r69u.relations.hehua.text);

// ── 七、解析层可见 ────────────────────────────────────────────
const it69 = bazi('1969-10-14T14:00', { withInterpret: true, question: '今年工作' });
const sec = (it69.interpret.sections || []).find((s) => s.key === 'hehua') || { text: '' };
ok('解析层新增「合化」一节', !!sec.text, (it69.interpret.sections || []).map((s) => s.key).join(','));
ok('合化节列出两组的结论', sec.text.includes('【化成功】') && sec.text.includes('【合绊不化】'), sec.text.slice(0, 120));
ok('合化节带口径与边界', sec.text.includes('口径：') && sec.text.includes('边界：'), sec.text.slice(-120));
ok('合化节带三条 notes', (sec.text.match(/^· /gm) || []).length === 3, String((sec.text.match(/^· /gm) || []).length));

const it90 = bazi('1990-05-12T14:30', { withInterpret: true, question: '今年工作' });
ok('无五合的盘不出合化节', !(it90.interpret.sections || []).some((s) => s.key === 'hehua'), (it90.interpret.sections || []).map((s) => s.key).join(','));

// ── 八、文案不越界：不下绝对断语、不漏出 undefined ──────────────
const BAN = /(一定会|必然|注定|肯定会|百分之百|保证会|绝对会|铁定|毫无疑问)/;
const joined = [ref.text, ge.evidence, yao.evidence, zheng.text, du.text, far.text, dm.text, it69.relations.hehua.text, sec.text].join('\n');
ok('合化文案不带绝对化断语', !BAN.test(joined), (joined.match(BAN) || [])[0] || '');
ok('合化文案不漏 undefined / NaN', !/(undefined|NaN|\[object)/.test(joined), (joined.match(/(undefined|NaN|\[object)/) || [])[0] || '');
