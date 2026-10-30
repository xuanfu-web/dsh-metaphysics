// 八字解读词库的门：天干取象、十神画像、命局基调、干支关系，四层都要接得进解析。
//
// 词库只做「怎么说」，所以这里的断言分两类：
//   ① 表本身：天干十个、十神十个加五组、基调按旺衰分别有话说；
//   ② 接线：解析里真的出现了命局框架 / 正面画像 / 流年时间轴 / 专业建议四节，
//      而且四节引用的是这张盘的真实字段（干支、用神、十神），不是通用套话。
import { compute } from '../engine/index.js';
import { interpret } from '../engine/interpret.js';
import {
  STEM_PORTRAIT, TENGOD_PORTRAIT, FRAME_TONE,
  frameToneOf, relationNotes, godPortraitOf, stemPortraitOf,
} from '../engine/bazi-words.js';
import { ok, eq } from './_harness.mjs';

const BAN = /(一定|必然|注定|肯定会|绝对会|百分百|铁定|毫无疑问)/;
const BAD = /(undefined|NaN|\[object)/;

// ── 1. 目录完整性 ───────────────────────────────────────────
eq('十天干齐全', Object.keys(STEM_PORTRAIT).join(''), '甲乙丙丁戊己庚辛壬癸');
eq('十神加五组齐全', Object.keys(TENGOD_PORTRAIT).length, 15);
const GROUPS = ['比劫', '食伤', '财', '官杀', '印'];
ok('五个十神组都在表里', GROUPS.every((g) => TENGOD_PORTRAIT[g]), GROUPS.filter((g) => !TENGOD_PORTRAIT[g]).join(','));
eq('强档三种基调', Object.keys(FRAME_TONE.强).join(','), '泄,制,耗');
eq('弱档三种基调', Object.keys(FRAME_TONE.弱).join(','), '生,比,泄');
eq('中档一种基调', Object.keys(FRAME_TONE.中).join(','), 'default');

// ── 2. 字段口径 ─────────────────────────────────────────────
let badStem = 0;
for (const [stem, s] of Object.entries(STEM_PORTRAIT)) {
  if (!s.image || !s.look || !s.temper || !s.gift || !s.trap) badStem++;
  if (BAN.test(`${s.look}${s.temper}${s.gift}${s.trap}`) || BAD.test(s.image)) badStem++;
}
ok('每个天干五段取象齐全且无绝对化表述', badStem === 0, `${badStem} 条不合格`);

let badGod = 0;
for (const [name, g] of Object.entries(TENGOD_PORTRAIT)) {
  if (!g.role || !g.gift || !g.trap || !g.love || !g.work) badGod++;
  if (BAN.test(`${g.gift}${g.trap}${g.love}${g.work}`)) badGod++;
}
ok('十神与五组都有画像且无绝对化表述', badGod === 0, `${badGod} 条不合格`);

let badTone = 0;
for (const tier of ['强', '弱', '中']) {
  for (const text of Object.values(FRAME_TONE[tier])) {
    if (!text || text.length < 20) badTone++;
    if (BAN.test(text)) badTone++;
  }
}
ok('命局基调每条都够长、无绝对化表述', badTone === 0, `${badTone} 条不合格`);

// ── 3. 基调取句：旺衰 + 用神方向 ──────────────────────────
ok('身强喜官杀 → 取「制」', frameToneOf('身强', ['官杀']) === FRAME_TONE.强.制);
ok('身强喜财 → 取「耗」', frameToneOf('身强', ['财']) === FRAME_TONE.强.耗);
ok('身强喜食伤 → 取「泄」', frameToneOf('身强', ['食伤']) === FRAME_TONE.强.泄);
ok('身弱喜印 → 取「生」', frameToneOf('身弱', ['印']) === FRAME_TONE.弱.生);
ok('身弱喜比劫 → 取「比」', frameToneOf('身弱', ['比劫']) === FRAME_TONE.弱.比);
ok('身弱喜食伤 → 取「泄」', frameToneOf('身弱', ['食伤']) === FRAME_TONE.弱.泄);
eq('中和取通用句', frameToneOf('中和', ['财']), FRAME_TONE.中.default);
// 调用方按十神权重排好再传：排在前面的一路先被采纳，这条是「秩序」而不是「首选」
ok('按传入顺序取第一路', frameToneOf('身强', ['财', '官杀']) === FRAME_TONE.强.耗);
ok('传进来的是串也能用', frameToneOf('身强', '官杀') === FRAME_TONE.强.制);
ok('强档遇到没有对应基调的用神（印）时回落泄', frameToneOf('身强', ['印']) === FRAME_TONE.强.泄);
ok('弱档遇到没有对应基调的用神（财）时回落实', frameToneOf('身弱', ['财']) === FRAME_TONE.弱.生);

// ── 4. 地支关系取句 ─────────────────────────────────────────
const notes = relationNotes(['丑未相冲', '巳丑拱合金', '自刑午', '丑未相冲']);
eq('同一种关系只出现一次', notes.length, 3);
// 「自刑午」同时含「自刑」与「刑」，规则顺序保证它读成自刑而不是刑
eq('自刑优先于刑', relationNotes(['自刑午']).length, 1);
ok('自刑优先于刑（内容检查）', relationNotes(['自刑午'])[0].startsWith('自刑'));
ok('「拱合」按合来读', notes.some((n) => n.startsWith('合')));
eq('不含关系词的串直接略过', relationNotes(['甲乙丙丁']).length, 0);
eq('非数组输入返回空表', relationNotes(null).length, 0);
eq('空表返回空表', relationNotes([]).length, 0);

eq('未知十神返回 null', godPortraitOf('不存在'), null);
eq('未知天干返回 null', stemPortraitOf('X'), null);
eq('空值不炸', godPortraitOf(undefined), null);

// ── 5. 接进真实盘面 ─────────────────────────────────────────
const r = compute({ system: 'bazi', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州' });
const it = interpret(r, {});
eq('解析没有报错', it.error, undefined);

const byKey = Object.fromEntries((it.sections || []).map((s) => [s.key, s]));
const need = ['framework', 'portrait', 'years', 'advice'];
ok('四节齐全', need.every((k) => byKey[k]), need.filter((k) => !byKey[k]).join(','));

const fw = byKey.framework.text;
ok('命局框架写了日主', fw.includes('**日主**') && fw.includes(r.dayMaster.stem));
ok('命局框架写了用神', fw.includes('**用神**') && r.frame.yongshen.favor.length > 0);
ok('命局框架写了格局', fw.includes('**格局**') && r.frame.geju.length > 0);
ok('命局框架带出一句基调', Object.values(FRAME_TONE.强).concat(Object.values(FRAME_TONE.弱), [FRAME_TONE.中.default])
  .some((t) => fw.includes(t)));

const pt = byKey.portrait.text;
ok('画像三小节齐全', ['**外在取象**', '**性格底色**', '**事业与家庭**'].every((k) => pt.includes(k)));
ok('外在取象引用的是本盘日主的象', pt.includes(STEM_PORTRAIT[r.dayMaster.stem].image));
ok('画像没有落到「看喜用与时运」这种空话', !pt.includes('做事方式看喜用与时运'));

const yrs = byKey.years.text;
ok('流年时间轴给了三年', (yrs.match(/\*\*\d{4} /g) || []).length === 3, String((yrs.match(/\*\*\d{4} /g) || []).length));
ok('流年用的是本盘头的干支', yrs.includes(r.liunian[0].ganzhi) && yrs.includes(r.liunian[1].ganzhi));
ok('流年标了档位', /(大吉|吉|平|小凶|大忌)/.test(yrs));
ok('流年说明档位不是断语', /不是「会发生什么」/.test(yrs));

const adv = byKey.advice.text;
ok('专业建议四条', ['①', '②', '③', '④'].every((k) => adv.includes(k)));
ok('建议里带出真实的喜用五行', r.frame.yongshen.favor.some((e) => adv.includes(e)));

const allText = (it.sections || []).map((s) => s.text).join('\n') + (it.dimensions || []).map((d) => d.text).join('\n');
ok('全文无 undefined/NaN', !BAD.test(allText), (allText.match(BAD) || [])[0] || '');
