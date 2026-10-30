// 三命通会接入：典籍登记 + 条目校验 + 与子平真诠并列对照 + 摘要/解释层/面板接线。
import fs from 'node:fs';
import vm from 'node:vm';
import { compute } from '../engine/index.js';
import { CLASSICS, CLASSIC_BOOKS, classicOf, classicsFor } from '../engine/classics.js';
import { KNOWLEDGE } from '../engine/interpret-knowledge.js';

let pass = 0; let fail = 0;
const ok = (name, cond) => { if (cond) { pass++; console.log('PASS  ' + name); } else { fail++; console.log('FAIL  ' + name); } };

const R = compute({ system: 'bazi', datetime: '1996-01-19T07:30', gender: 'male' });
const SMT = CLASSICS.filter((e) => e.book === 'sanming');
const SMT_TEN_IDS = ['smt-zhenguan', 'smt-zhengcai', 'smt-piancai', 'smt-yinshou', 'smt-shishen', 'smt-shangguan', 'smt-yangren', 'smt-jianlu'];
const SMT_SPECIAL_IDS = ['smt-quzhi', 'smt-yanshang', 'smt-congge', 'smt-runxia', 'smt-jiasi', 'smt-congsha', 'smt-congcai'];
const SMT_TEN = SMT.filter((e) => SMT_TEN_IDS.includes(e.id));
const SMT_SPECIAL = SMT.filter((e) => SMT_SPECIAL_IDS.includes(e.id));

// —— 书目与条目
ok('三命通会已登记', CLASSIC_BOOKS.sanming && CLASSIC_BOOKS.sanming.name === '三命通会' && CLASSIC_BOOKS.sanming.author === '明·万民英');
ok('三命通会条目 16 条（8 论十神 + 7 格局篇 + 1 官煞去留）', SMT.length === 16 && SMT_TEN.length === 8 && SMT_SPECIAL.length === 7 && SMT.filter((e) => e.id === 'smt-guansha-liu').length === 1);
ok('论十神章名都以「论」立题', SMT_TEN.every((e) => /^卷[五六]·论/.test(e.chapter)));
ok('七杀对照篇按本本章名照录', classicOf('smt-guansha-liu').chapter === '卷五·官煞去留杂论');
ok('条目 id 全局唯一', new Set(CLASSICS.map((e) => e.id)).size === CLASSICS.length);
ok('章节都标到卷', SMT.every((e) => /^卷[五六]·/.test(e.chapter)));
ok('出处都是典藏网三命通会', SMT.every((e) => /^https:\/\/www\.diancang\.xyz\/xuanxuewushu\/sanmingtonghui\/\d+\.html$/.test(e.url)));
ok('出处逐条不同（没有共用链接）', new Set(SMT.map((e) => e.url)).size === SMT.length);
ok('原文不省略、不改写', SMT.every((e) => !e.quote.includes('…') && !e.quote.includes('...') && e.quote.length >= 20));
ok('每条都有自撰白话', SMT.every((e) => typeof e.plain === 'string' && e.plain.length >= 10));

// —— 原文抽检（与抓取到的通行本逐字一致）
ok('论正官含「止许一位，多则不宜」', classicOf('smt-zhenguan').quote.includes('止许一位，多则不宜'));
ok('论正财含「妻赍财嫁我」', classicOf('smt-zhengcai').quote.includes('妻赍财嫁我'));
ok('论偏财含「乃众人之财也」', classicOf('smt-piancai').quote.includes('乃众人之财也') && classicOf('smt-piancai').quote.includes('姊妹兄弟分夺'));
ok('官煞去留含「天干透者易去，月支所藏者难去」', classicOf('smt-guansha-liu').quote.includes('天干透者易去，月支所藏者难去'));
ok('论印绶含「能护我官星」', classicOf('smt-yinshou').quote.includes('能护我官星'));
ok('论食神含「一名寿星，一名爵星」', classicOf('smt-shishen').quote.includes('一名寿星，一名爵星'));
ok('论伤官含「伤尽则能生财」', classicOf('smt-shangguan').quote.includes('伤尽则能生财'));
ok('论阳刃含「旺越其分，故险」', classicOf('smt-yangren').quote.includes('旺越其分，故险'));
ok('论建禄含「见财不聚」', classicOf('smt-jianlu').quote.includes('见财不聚'));

// —— 专旺五格与弃命从格（卷五、卷六单章，逐条核原文与链接）
for (const [id, must, chapter, url] of [
  ['smt-quzhi', '须有亥字带印为入格', '卷六·曲直', '7630'],
  ['smt-yanshang', '须有寅字带印为入格', '卷六·炎上', '7631'],
  ['smt-congge', '须带丙丁巳午一二位方成其器', '卷六·从革', '7632'],
  ['smt-runxia', '忌引卯巳死绝之地', '卷六·润下', '7633'],
  ['smt-jiasi', '戊己忻逢四季，乃为稼穑之名', '卷六·稼穑', '7634'],
  ['smt-congsha', '身无所归，不得已从之', '卷五·弃命从煞', '7598'],
  ['smt-congcai', '若逢根气，命损无猜', '卷六·弃命从财', '7652'],
]) {
  const e = classicOf(id);
  ok(`${id} 原文抽检`, !!e && e.book === 'sanming' && e.quote.includes(must));
  ok(`${id} 章名与典藏网链接`, !!e && e.chapter === chapter && e.url === `https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/${url}.html`);
}
ok('七篇格局原文逐条不同', new Set(SMT_SPECIAL.map((e) => e.quote)).size === 7);
ok('七篇格局原文 tag 不与月令十神混用', SMT_SPECIAL.every((e) => e.tags.every((t) => !['正官', '七杀', '偏官', '财', '正财', '偏财', '印', '食神', '伤官', '阳刃', '劫财', '建禄', '比肩', '月劫'].includes(t))));

// —— 并列对照取法
const one = (name) => classicsFor({ geju: [{ name, kind: '月令格' }], climate: { kind: '平和' } });
for (const [ge, zp, smt] of [['正官格', 'zp-zhenguan', 'smt-zhenguan'], ['正财格', 'zp-cai', 'smt-zhengcai'], ['偏财格', 'zp-cai', 'smt-piancai'], ['七杀格', 'zp-pianguan', 'smt-guansha-liu'], ['正印格', 'zp-yin', 'smt-yinshou'], ['食神格', 'zp-shishen', 'smt-shishen'], ['伤官格', 'zp-shangguan', 'smt-shangguan'], ['阳刃格', 'zp-yangren', 'smt-yangren'], ['建禄格', 'zp-lujie', 'smt-jianlu']]) {
  const rows = one(ge);
  ok(`${ge} 子平真诠在前`, rows[0] && rows[0].id === zp);
  ok(`${ge} 三命通会对照`, rows[1] && rows[1].id === smt && rows[1].why.includes('三命通会'));
}
ok('偏财格不再取正财章', !one('偏财格').some((e) => e.id === 'smt-zhengcai'));
ok('正财格不误取偏财章', !one('正财格').some((e) => e.id === 'smt-piancai'));
const rows1996 = classicsFor(R);
ok('1996 盘同为两书并列', rows1996.some((e) => e.book === 'ziping') && rows1996.some((e) => e.book === 'sanming'));
ok('对照条 why 写明「另有取法」', rows1996.filter((e) => e.book === 'sanming').every((e) => e.why.includes('另有取法')));
ok('默认最多 5 条', rows1996.length <= 5);
ok('总纲位换成变化条后仍保住两书对照', rows1996[0].id === 'zp-cai' && rows1996[1].id === 'smt-piancai' && rows1996.filter((e) => e.book === 'sanming').length === 1);
ok('limit 生效', classicsFor(R, 2).length === 2);
ok('去重', new Set(rows1996.map((e) => e.id)).size === rows1996.length);
ok('结果稳定（同输入同输出）', JSON.stringify(classicsFor(R)) === JSON.stringify(rows1996));

// —— 摘要 / 解释层 / 面板
ok('摘要含三命通会', R.summary.includes('【古籍】') && R.summary.includes('三命通会'));
const it = compute({ system: 'bazi', datetime: '1996-01-19T07:30', gender: 'male', withInterpret: true }).interpret;
const sec = (it.sections || []).find((s) => s.key === 'classics');
ok('解释层古籍节含三命通会', !!sec && sec.text.includes('《三命通会·卷六·论偏财》') && !sec.text.includes('《三命通会·卷六·论正财》'));

const box = { window: {}, console };
vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), box, { filename: 'panel-kit.js' });
const html = box.window.__PP.baziHTML(R);
ok('面板书名不再误标为滴天髓', html.includes('三命通会·卷六·论偏财') && !html.includes('滴天髓·卷六·论偏财'));
ok('面板偏财格不引正财章', !html.includes('三命通会·卷六·论正财'));
ok('面板条目数与匹配数一致', (html.match(/mp-cl-e/g) || []).length === R.classics.length);

// —— 知识卡
const card = KNOWLEDGE.find((k) => k.id === 'bazi-sanming-duizhao');
ok('知识卡存在且归属八字', !!card && card.system === 'bazi' && card.status === 'variant');
ok('知识卡点明两书分工', !!card && card.detail.includes('子平真诠') && card.detail.includes('三命通会') && card.gist.includes('用'));
for (const [id, must, src] of [
  ['bazi-geju-chengbai', ['带忌', '救应'], '《子平真诠》九、论用神成败救应'],
  ['bazi-huagi-bianhua', ['化为印', '化为财'], '《子平真诠》十、论用神变化'],
]) {
  const k = KNOWLEDGE.find((x) => x.id === id);
  ok(`知识卡 ${id} 已入库且标有异说`, !!k && k.system === 'bazi' && k.status === 'variant' && !!k.note);
  ok(`知识卡 ${id} 对上原文与出处`, !!k && must.every((w) => k.detail.includes(w)) && k.source.includes(src));
  ok(`知识卡 ${id} 不把原文当断语`, !!k && /不据此|不逐盘|只列条件|并列/.test(k.note));
}
for (const [id, must, src] of [
  ['bazi-zhuanwang-yuanwen', ['曲直', '稼穑', '局全'], '《三命通会》卷六'],
  ['bazi-congge-yuanwen', ['弃命', '从财', '从煞'], '《三命通会》卷五'],
]) {
  const k = KNOWLEDGE.find((x) => x.id === id);
  ok(`知识卡 ${id} 已入库且标有异说`, !!k && k.system === 'bazi' && k.status === 'variant' && !!k.note);
  ok(`知识卡 ${id} 对上原文与出处`, !!k && must.every((w) => k.detail.includes(w)) && k.source.includes(src));
  ok(`知识卡 ${id} 不把原文当断语`, !!k && /不据此|不补|并列/.test(k.note));
}

console.log(`\n${pass} PASS / ${fail} FAIL`);
if (fail) process.exit(1);
