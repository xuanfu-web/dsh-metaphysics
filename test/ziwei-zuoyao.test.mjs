// H4 紫微杂曜安星库（engine/ziwei-zuoyao.js）：十二颗杂曜的落宫必须能由安星诀反推出来。
//
// 这一版要防的四件事：
//  ① 表格被人「顺手补齐」——所有期望值都从诀文里的地支字重新映射一遍，
//     不复制引擎表里的数字；两处一旦分叉就 FAIL。
//  ② 同名异星被合并——蜚廉（年支）与飞廉（博士十二神）、年解与月解（解神）、
//     本库天德与岁前十二神的天德，都是两颗星，谁也不许顶替谁。
//  ③ 默认盘被改动——49 颗星是旧盘与存档的基准，全表只能显式开启。
//  ④ 出处冒充原文——诀文只算通行辑本并核，知识卡与引文索引必须挂在「通行说」，
//     不许被改成 refs 去指一条并不存在的《全书》原文。
import fs from 'node:fs';
import vm from 'node:vm';
import { compute } from '../engine/index.js';
import { buildZiwei, ZIWEI_SCHOOL_DEFAULTS, ZIWEI_SCHOOL_OPTIONS, XIANCHI, HUAGAI, posuIndex } from '../engine/ziwei.js';
import {
  ZUOYAO_LIB, ZUOYAO_NAMES, ZUOYAO_STATS, ZUOYAO_SKIPPED,
  placeZuoyao, zuoyaoBranch, zuoyaoVerseBlock, zuoyaoBriefText,
} from '../engine/ziwei-zuoyao.js';
import { askPrompt } from '../engine/followup.js';
import { KNOWLEDGE } from '../engine/interpret-knowledge.js';
import { CARD_CITATIONS } from '../engine/citations.js';
import { ok, eq } from './_harness.mjs';

const BR = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const at = (name) => ZUOYAO_LIB.find((s) => s.name === name);
const tableOf = (name) => at(name).table;
// 期望值一律写成「诀文里的地支字」，再由这里翻成地支序——引擎写错一格就会露出来
const byBranch = (pairs) => Object.fromEntries(pairs.map(([k, ch]) => [k, BR.indexOf(ch)]));

// ── ① 库的结构与出处 ────────────────────────────────────────
eq('全表收了十二颗', ZUOYAO_LIB.length, 12);
eq('星名不重复', new Set(ZUOYAO_NAMES).size, 12);
ok('每颗都有定宫依据', ZUOYAO_LIB.every((s) => ['生月', '生年干', '生年支', '命宫＋生年支', '身宫＋生年支'].includes(s.basis)));
ok('每颗都有诀文，且诀文不是白话大意', ZUOYAO_LIB.every((s) => s.verse && s.verse.length >= 9 && /[，。]/.test(s.verse)));
ok('每颗都有基本义与互核说明', ZUOYAO_LIB.every((s) => s.meaning && s.meaning.length >= 8 && s.check && s.check.length >= 6));
ok('每颗都列了出处，且每条都是可点的绝对链接', ZUOYAO_LIB.every((s) => s.refs.length >= 2 && s.refs.every((u) => /^https?:\/\/\S+/.test(u))));
// 互核的意义在「不同站点各说一遍」，同一个站挂三条不算两颗星的独立出处
ok('每颗都有两处以上独立站点互核', ZUOYAO_LIB.every((s) => new Set(s.refs.map((u) => new URL(u).host)).size >= 2),
  ZUOYAO_LIB.filter((s) => new Set(s.refs.map((u) => new URL(u).host)).size < 2).map((s) => s.name).join(','));
eq('按依据分组：生月 4／年干 3／年支 3／命身宫 2', ZUOYAO_STATS.byBasis, { '生月': 4, '生年干': 3, '生年支': 3, '命宫＋生年支': 1, '身宫＋生年支': 1 });
eq('八颗走查表、四颗走公式', [ZUOYAO_STATS.withTable, ZUOYAO_STATS.withFormula], [8, 4]);
eq('只有天官天福有庙地专论', ZUOYAO_STATS.withTemple, 2);
eq('吉煞杂分类', ZUOYAO_STATS.byType, { 吉星: 7, 煞星: 3, 杂曜: 2 });
ok('刻意不收的两颗都写明理由', ZUOYAO_SKIPPED.length === 2 && ZUOYAO_SKIPPED.every((s) => s.reason.length >= 20));
eq('不收清单不混进库', ZUOYAO_SKIPPED.map((s) => s.name).filter((n) => ZUOYAO_NAMES.includes(n)), []);

// ── ② 逐颗复算：期望值从诀文重导，不抄引擎的表 ──────────────
// 解神「正二在申三四在戍，五六在子七八在寅，九十月坐于辰宫，十一十二在午宫」
eq('解神逐月', tableOf('解神'), byBranch([[1, '申'], [2, '申'], [3, '戌'], [4, '戌'], [5, '子'], [6, '子'], [7, '寅'], [8, '寅'], [9, '辰'], [10, '辰'], [11, '午'], [12, '午']]));
// 第二式独立互核：单月取月建（正月起寅）的对冲，双月随单月
const jieshenByClash = (m) => BR.indexOf('寅') + (Math.ceil(m / 2) - 1) * 2 + 6;
ok('解神两式逐月互核一致（查表 = 月建对冲）', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  .every((m) => tableOf('解神')[m] === ((jieshenByClash(m) % 12) + 12) % 12));
eq('解神按月安（basis 是生月）', at('解神').basis, '生月');

eq('天巫逐月', tableOf('天巫'), byBranch([[1, '巳'], [2, '申'], [3, '寅'], [4, '亥'], [5, '巳'], [6, '申'], [7, '寅'], [8, '亥'], [9, '巳'], [10, '申'], [11, '寅'], [12, '亥']]));
ok('天巫确是巳申寅亥四生位轮十二月', [...new Set(Object.values(tableOf('天巫')))].sort((a, b) => a - b).join(',') === BR.indexOf('寅') + ',' + BR.indexOf('巳') + ',' + BR.indexOf('申') + ',' + BR.indexOf('亥'));

eq('天月逐月', tableOf('天月'), byBranch([[1, '戌'], [2, '巳'], [3, '辰'], [4, '寅'], [5, '未'], [6, '卯'], [7, '亥'], [8, '未'], [9, '寅'], [10, '午'], [11, '戌'], [12, '寅']]));
eq('天月八月在未（最易抄错的一格）', tableOf('天月')[8], BR.indexOf('未'));

eq('阴煞逐月', tableOf('阴煞'), byBranch([[1, '寅'], [2, '子'], [3, '戌'], [4, '申'], [5, '午'], [6, '辰'], [7, '寅'], [8, '子'], [9, '戌'], [10, '申'], [11, '午'], [12, '辰']]));
ok('阴煞隔六月同宫（正七寅、二八子……）', [1, 2, 3, 4, 5, 6].every((m) => tableOf('阴煞')[m] === tableOf('阴煞')[m + 6]));

// 天官「甲羊乙龙壬犬宜，丙蛇丁虎己辛鸡，戊兔庚猪癸宜马」
eq('天官十干', tableOf('天官'), byBranch([['甲', '未'], ['乙', '辰'], ['丙', '巳'], ['丁', '寅'], ['戊', '卯'], ['己', '酉'], ['庚', '亥'], ['辛', '酉'], ['壬', '戌'], ['癸', '午']]));
// 天福「甲爱金鸡乙爱猴，丁猪丙鼠己虎头，戊寻玉兔庚壬马，辛癸逢蛇爵禄荣」
eq('天福十干', tableOf('天福'), byBranch([['甲', '酉'], ['乙', '申'], ['丙', '子'], ['丁', '亥'], ['戊', '卯'], ['己', '寅'], ['庚', '午'], ['辛', '巳'], ['壬', '午'], ['癸', '巳']]));
eq('戊年天官天福同居卯宫', tableOf('天官').戊, tableOf('天福').戊);
ok('天官天福入庙四宫都在四生位', at('天官').temple.join(',') === '寅,申,巳,卯' && at('天福').temple.join(',') === '寅,申,巳,卯');

// 天厨「甲丁食蛇口，乙戊辛马方，丙从鼠口得，己食于猴房，庚食虎头上，壬鸡癸猪堂」
eq('天厨十干', tableOf('天厨'), byBranch([['甲', '巳'], ['乙', '午'], ['丙', '子'], ['丁', '巳'], ['戊', '午'], ['己', '申'], ['庚', '寅'], ['辛', '午'], ['壬', '酉'], ['癸', '亥']]));
ok('天厨两字面不同的诀同表（甲丁同巳、乙戊辛同午）', tableOf('天厨').甲 === tableOf('天厨').丁 && tableOf('天厨').乙 === tableOf('天厨').戊 && tableOf('天厨').戊 === tableOf('天厨').辛);

// 蜚廉：子年起申，先西（申酉戌）次南（巳午未）续东（寅卯辰）后北（亥子丑）
eq('蜚廉十二年支', tableOf('蜚廉'), byBranch([['子', '申'], ['丑', '酉'], ['寅', '戌'], ['卯', '巳'], ['辰', '午'], ['巳', '未'], ['午', '寅'], ['未', '卯'], ['申', '辰'], ['酉', '亥'], ['戌', '子'], ['亥', '丑']]));
const FANGWEI = ['申', '酉', '戌', '巳', '午', '未', '寅', '卯', '辰', '亥', '子', '丑'];
ok('蜚廉正是四方位轮十二年支', BR.indexOf('申') === tableOf('蜚廉').子 && FANGWEI.map((c) => BR.indexOf(c)).join(',') === Object.values(tableOf('蜚廉')).join(','));

// 天德起酉顺、年解起戌逆
ok('天德酉宫起子顺行', [0, 1, 5, 11].every((yb) => zuoyaoBranch(at('天德'), { yearBranch: yb }) === (9 + yb) % 12));
ok('年解戌宫起子逆行', [0, 1, 5, 11].every((yb) => zuoyaoBranch(at('年解'), { yearBranch: yb }) === ((10 - yb) % 12 + 12) % 12));
ok('天德与年解对同一个年支不同宫（一顺一逆）', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].every((yb) => zuoyaoBranch(at('天德'), { yearBranch: yb }) !== zuoyaoBranch(at('年解'), { yearBranch: yb })));

// 天才／天寿：两处转抄例子，一正一误，都以诀文为准
eq('天才：命宫在午、戌年生人 → 辰宫（转抄写巳宫，判为笔误）',
  zuoyaoBranch(at('天才'), { soulIndex: BR.indexOf('午'), yearBranch: BR.indexOf('戌') }), BR.indexOf('辰'));
eq('天寿：身宫在卯、亥年生人 → 寅宫（与转抄例子一致）',
  zuoyaoBranch(at('天寿'), { bodyIndex: BR.indexOf('卯'), yearBranch: BR.indexOf('亥') }), BR.indexOf('寅'));
ok('天才按命宫、天寿按身宫，两者依据不同', at('天才').basis === '命宫＋生年支' && at('天寿').basis === '身宫＋生年支');

// ── ③ 同一条「年支六曜诀」也钉住已有三颗（新库反过来校验旧表） ──
// 「破碎轮排巳丑酉，不关生月与生时」
ok('破碎按年支三轮巳丑酉', [0, 6, 3, 9].every((b) => posuIndex(b) === BR.indexOf('巳'))
  && [2, 8, 5, 11].every((b) => posuIndex(b) === BR.indexOf('酉'))
  && [4, 10, 1, 7].every((b) => posuIndex(b) === BR.indexOf('丑')));
// 「辰丑戌未轮华盖」「酉午卯子布咸池」
ok('华盖四组落辰丑戌未（三合墓库）', ['寅午戌', '申子辰', '巳酉丑', '亥卯未'].map((t) => BR[HUAGAI[t]]).join(',') === '戌,辰,丑,未');
ok('咸池四组落酉午卯子', ['寅午戌', '申子辰', '巳酉丑', '亥卯未'].map((t) => BR[XIANCHI[t]]).join(',') === '卯,酉,午,子');

// ── ④ placeZuoyao：缺依据就整颗跳过，绝不安到默认宫 ─────────
const CTX = { lunarMonth: 5, yearStem: '庚', yearBranch: 6, soulIndex: 2, bodyIndex: 10 };
eq('参数齐时安满十二颗', placeZuoyao(CTX).length, 12);
eq('没给生月：月系四颗全跳过', placeZuoyao({ ...CTX, lunarMonth: undefined }).length, 8);
eq('没给年干：年干三颗全跳过', placeZuoyao({ ...CTX, yearStem: undefined }).length, 9);
eq('没给命宫：天才跳过', placeZuoyao({ ...CTX, soulIndex: undefined }).length, 11);
eq('空参数不安任何一颗', placeZuoyao({}), []);
ok('落宫都在十二支内', placeZuoyao(CTX).every((s) => s.branch >= 0 && s.branch < 12));
ok('每颗都带回诀文与基本义（面板与复制提问要用）', placeZuoyao(CTX).every((s) => s.verse && s.meaning));
eq('庚年天官落亥、天厨落寅', placeZuoyao(CTX).filter((s) => ['天官', '天厨'].includes(s.name)).map((s) => `${s.name}${BR[s.branch]}`).join(','), '天官亥,天厨寅');
// 戊年：天官、天福诀文同指卯宫（合并诀只举一格），卯又在这两颗的庙地名单里
eq('入庙标记只在庙地出现', placeZuoyao({ ...CTX, yearStem: '戊' }).filter((s) => s.inTemple).map((s) => `${s.name}${BR[s.branch]}`).sort().join(','), '天官卯,天福卯');
eq('丙年只有天官入庙（天福落子，不在庙地名单）', placeZuoyao({ ...CTX, yearStem: '丙' }).filter((s) => s.inTemple).map((s) => s.name).join(','), '天官');
ok('诀文块按落宫回写本盘宫名', zuoyaoVerseBlock(placeZuoyao(CTX)).split('\n').length === 12
  && zuoyaoVerseBlock(placeZuoyao(CTX)).includes('本盘落寅宫'));
ok('诀文块不带换行外的裸换行（一行一颗）', zuoyaoVerseBlock(placeZuoyao(CTX)).split('\n').every((l) => l.split('｜').length === 4));
ok('一行摘要把四路依据都写出来', ['生月', '生年干', '生年支', '命宫＋生年支', '身宫＋生年支'].every((b) => zuoyaoBriefText().includes(b)));

// ── ⑤ 开关与默认盘 ─────────────────────────────────────────
eq('开关扩到十三类', Object.keys(ZIWEI_SCHOOL_OPTIONS).length, 13);
eq('杂曜开关默认 minimal', ZIWEI_SCHOOL_DEFAULTS.zuoyaoSchool, 'minimal');
eq('只许 minimal / full', ZIWEI_SCHOOL_OPTIONS.zuoyaoSchool, ['minimal', 'full']);
const BASE = {
  year: 1990, month: 6, day: 15, hour: 10, minute: 0,
  gender: 'male', trueSolar: false, dst: false, asOf: '2026-10-30T12:00',
};
const names = (r) => r.palaces.flatMap((p) => p.stars.map((s) => s.name));
const starAt = (r, n) => r.palaces.find((p) => p.stars.some((s) => s.name === n))?.branch ?? null;
const DEF = buildZiwei(BASE);
const FULL = buildZiwei({ ...BASE, zuoyaoSchool: 'full' });
eq('默认仍是 49 颗星', names(DEF).length, 49);
eq('开全表 61 颗', names(FULL).length, 61);
eq('默认不排任何一颗全表杂曜', ZUOYAO_NAMES.filter((n) => names(DEF).includes(n)), []);
ok('全表十二颗在盘里各只出现一次', ZUOYAO_NAMES.every((n) => FULL.palaces.reduce((a, p) => a + p.stars.filter((s) => s.name === n).length, 0) === 1), ZUOYAO_NAMES.filter((n) => FULL.palaces.reduce((a, p) => a + p.stars.filter((s) => s.name === n).length, 0) !== 1).join(','));
eq('盘上落宫 = 库复算落宫', ZUOYAO_NAMES.map((n) => starAt(FULL, n)).join(','), placeZuoyao({ lunarMonth: DEF.lunar.month, yearStem: DEF.yearGanzhi.charAt(0), yearBranch: BR.indexOf(DEF.yearGanzhi.charAt(1)), soulIndex: BR.indexOf(DEF.soul.branch), bodyIndex: BR.indexOf(DEF.body.branch) }).sort((a, b) => ZUOYAO_NAMES.indexOf(a.name) - ZUOYAO_NAMES.indexOf(b.name)).map((s) => BR[s.branch]).join(','));
eq('默认盘的 zuoyao 层只报口径', [DEF.zuoyao.mode, DEF.zuoyao.starTotal, DEF.zuoyao.placed.length, DEF.zuoyao.verses], ['minimal', 49, 0, '']);
eq('全表盘的 zuoyao 层带十二行落宫', [FULL.zuoyao.mode, FULL.zuoyao.starTotal, FULL.zuoyao.placed.length, FULL.zuoyao.verses.split('\n').length], ['full', 61, 12, 12]);
ok('placed 每颗都写宫名与依据', FULL.zuoyao.placed.every((x) => x.palace && x.basis && BR.includes(x.branch)));
eq('不收清单两档都给（免得日后以为漏了）', [DEF.zuoyao.skipped.length, FULL.zuoyao.skipped.length], [2, 2]);
eq('简盘星名是全表的子集', names(DEF).filter((n) => !names(FULL).includes(n)), []);

// 同名异星不许互相顶替
ok('蜚廉（年支）与博士十二神的飞廉并存不合并', FULL.palaces.some((p) => p.stars.some((s) => s.name === '蜚廉'))
  && BOSHI_HAS_FEILIAN(FULL));
function BOSHI_HAS_FEILIAN(r) {
  // 博士十二神在宫位神煞里，不在星曜里：两处的「飞廉」各归各，谁也顶不掉谁
  return r.palaces.some((p) => p.shensha.boshi === '飞廉') && !names(r).includes('飞廉');
}
ok('年解与月解（解神）两颗同现', names(FULL).includes('解神') && names(FULL).includes('年解') && starAt(FULL, '解神') !== starAt(FULL, '年解'));
ok('本库天德与岁前十二神的天德各在各处', names(FULL).includes('天德') && FULL.palaces.some((p) => p.shensha.suiqi === '天德'));

// ── ⑥ 复制提问：外部模型要拿到诀文，不然只知道十二个陌生名字 ──
const promptFull = askPrompt(FULL, { question: '今年适不适合换工作？' }).text;
const promptDef = askPrompt(DEF, { question: '今年适不适合换工作？' }).text;
ok('开全表时复制提问带安星诀段', promptFull.includes('紫微杂曜安星诀') && promptFull.includes('命宫起子天才顺'));
ok('复制提问写明属通行说、并声明不是全书原文（不冒充古籍）', /属通行说，不是《紫微斗数全书》原文/.test(promptFull));
ok('复制提问把不另立的两颗也交代了', promptFull.includes('龙德') && promptFull.includes('月德'));
ok('默认盘不塞诀文（没用的规则不进提问）', !promptDef.includes('紫微杂曜安星诀'));

// ── ⑦ 知识卡与引文：出处口径必须挂在「通行说」 ───────────────
const card = KNOWLEDGE.find((k) => k.id === 'ziwei-zaoyao');
ok('知识卡存在', !!card && card.system === 'ziwei');
ok('知识卡按落宫实质挂 work / health（overall 三张已占满）', ['work', 'health'].every((d) => card.dims.includes(d)));
ok('知识卡把四路依据与同名异星都写进正文', ['解神', '天厨', '蜚廉', '天才'].every((n) => card.detail.includes(n)));
eq('引文索引把这张记作通行说', CARD_CITATIONS['ziwei-zaoyao'].status, 'general');
ok('通行说不带 refs（不伪造原文条目）', !Array.isArray(CARD_CITATIONS['ziwei-zaoyao'].refs) && CARD_CITATIONS['ziwei-zaoyao'].reason.length >= 10);
const z = compute({ system: 'ziwei', datetime: '1990-06-15T10:00', gender: 'male', withInterpret: true, zuoyaoSchool: 'full' });
const knowKeys = z.interpret.dimensions.flatMap((d) => (d.knowledge || []).map((k) => k.id));
ok('全表盘的解读层真的挂上了这张卡', knowKeys.includes('ziwei-zaoyao'), knowKeys.join(','));

// ── ⑧ 面板与独立页：同一份渲染层，两处都得露出这块 ───────────
// 源码 grep 只能证明「写了」，不能证明「渲染得出来」——这里真跑一遍渲染器。
const kit = fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8');
const PANEL = { window: { Engine: { compute } }, console };
vm.runInNewContext(kit, PANEL, { filename: 'panel-kit.js' });
const PP = PANEL.window.__PP;
ok('面板渲染器在 vm 里可用', typeof PP.ziweiHTML === 'function');
// 丙寅年：天官落巳（庙）、天福落子（不庙）——拿一年同时验两件事
const P_FULL = PP.ziweiHTML(compute({ system: 'ziwei', datetime: '1986-06-15T10:00', gender: 'male', zuoyaoSchool: 'full' }));
const P_MIN = PP.ziweiHTML(compute({ system: 'ziwei', datetime: '1986-06-15T10:00', gender: 'male' }));
ok('全表盘渲染出「已排 12 颗（61 颗盘）」', P_FULL.includes('杂曜全表 · 已排 12 颗（61 颗盘）'));
ok('十二颗都成芯片，各带落宫与本盘宫名', ZUOYAO_NAMES.every((n) => P_FULL.includes(`>${n} `) && P_FULL.includes('（') && P_FULL.includes('）')),
  ZUOYAO_NAMES.filter((n) => !P_FULL.includes(`>${n} `)).join(','));
ok('入庙那颗带「·庙」，未入庙的不带', P_FULL.includes('）·庙</span>') && P_FULL.includes('天福 子（') && !/天福 子（[^）]*）·庙/.test(P_FULL));
ok('诀文块默认折叠并写明通行说', /<details class="pp-zy">/.test(P_FULL) && P_FULL.includes('属通行说'));
ok('诀文按行破成 <br>（一行一颗）', (P_FULL.match(/class="pp-zy-v">.*?<\/div>/s)[0].match(/<br>/g) || []).length === 11);
ok('未另立的两颗在面板点名', P_FULL.includes('龙德') && P_FULL.includes('月德'));
ok('简盘渲染只给口径与怎么开，不摊诀文', P_MIN.includes('杂曜 · 本盘 49 颗（通行简盘）') && !P_MIN.includes('pp-zy-v'));
ok('两档面板都不漏 undefined / NaN 文案', !/undefined|NaN/.test(P_FULL + P_MIN), (P_FULL + P_MIN).match(/.{0,40}(undefined|NaN).{0,40}/)?.[0] || '');
ok('面板渲染杂曜层', kit.includes('r.zuoyao') && kit.includes('pp-zy'));
ok('面板默认档给一句白话怎么开全表', kit.includes('通行简盘') && kit.includes('追加十二颗'));
ok('面板把不另立的两颗也显示', kit.includes('zy.skipped'));
ok('诀文默认折叠（点开才摊）', /<details class="pp-zy">/.test(kit));
ok('CSS 定义了这三条类（不留未定义的裸类名）', ['.pp-zy{', '.pp-zy-v{', '.pp-zy-s{'].every((c) => kit.includes(c)));
ok('入庙标进宫位与详情两处', (kit.match(/inTemple/g) || []).length >= 4);
const client = fs.readFileSync(new URL('../client.chart.js', import.meta.url), 'utf8');
const entry = fs.readFileSync(new URL('../client.js', import.meta.url), 'utf8');
ok('命盘分块带了杂曜库（漏了会静默 undefined）', client.includes('ZUOYAO_LIB') && client.includes('placeZuoyao'), String(client.length));
ok('入口面板 CSS/渲染进了 client.js', entry.includes('pp-zy'));
const html = fs.readFileSync(new URL('../命理排盘.html', import.meta.url), 'utf8');
ok('离线页同源带上这块', html.includes('pp-zy') && html.includes('ZUOYAO_LIB'));
