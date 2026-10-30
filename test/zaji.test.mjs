// 杂气取用（《子平真诠》十六）：透干优先 → 三合会支 → 本气回退；
// 顺带钉住建禄误标与「透/会得劫财作月劫」两处修正，以及总纲位四选一。
import fs from 'node:fs';
import vm from 'node:vm';
import { compute } from '../engine/index.js';
import { classicOf, classicsFor, CLASSIC_BOOKS } from '../engine/classics.js';
import { KNOWLEDGE } from '../engine/interpret-knowledge.js';

let pass = 0;
let fail = 0;
const ok = (name, cond, extra = '') => {
  if (cond) { pass += 1; console.log(`PASS  ${name}`); }
  else { fail += 1; console.log(`FAIL  ${name}${extra ? ` — ${extra}` : ''}`); }
};
const B = (datetime, gender = 'male') => compute({ system: 'bazi', datetime, gender });
const four = (r) => ['year', 'month', 'day', 'hour'].map((k) => r.pillars[k].ganzhi).join(' ');

// —— 条目
const e = classicOf('zp-zaji');
ok('条目已登记', !!e && e.book === 'ziping');
ok('章名照录第十六章', e.chapter === '十六、论杂气如何取用', e.chapter);
ok('出处为典藏网 53636', e.url === 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/53636.html', e.url);
ok('原文含透干与会支', e.quote.includes('何谓透干') && e.quote.includes('何谓会支'));
ok('原文含「一透则一用」与「透而又会」', e.quote.includes('一透则一用') && e.quote.includes('透而又会'));
ok('原文无省略号', !e.quote.includes('…') && !e.quote.includes('...'));
ok('scene 为用神', e.scene === '用神', e.scene);
ok('tags 留空（通论不绑单格）', Array.isArray(e.tags) && e.tags.length === 0);
ok('白话点明四墓与次序', e.plain.includes('辰戌丑未') && e.plain.includes('透') && e.plain.includes('会'));
ok('白话不写绝对化断语', !/一定|必然|注定|百分百/.test(e.plain));

// —— 透干优先于会支
{
  const r = B('1996-01-19T07:30');
  ok('1996 盘四柱', four(r) === '乙亥 己丑 乙卯 庚辰', four(r));
  ok('丑月兼亥卯会局，仍先取透干', r.frame.primary.name === '偏财格' && r.frame.primary.evidence.includes('透于月干'), r.frame.primary.evidence);
  ok('透干时依据不写会成', !r.frame.primary.evidence.includes('会成'));
}

// —— 会支次之
{
  const r = B('1985-02-03T10:00');
  ok('1985-02-03 四柱', four(r) === '甲子 丁丑 癸酉 丁巳', four(r));
  ok('丑月酉巳会金局取偏印', r.frame.primary.name === '偏印格' && r.frame.primary.evidence.includes('会成金局'), r.frame.primary.evidence);
  ok('会支依据写明本气未透', r.frame.primary.evidence.includes('未透干'));

  const r2 = B('2005-01-13T10:00');
  ok('2005-01-13 四柱', four(r2) === '甲申 丁丑 丁酉 乙巳', four(r2));
  ok('丑月酉巳会金局取偏财', r2.frame.primary.name === '偏财格' && r2.frame.primary.evidence.includes('会成金局'), r2.frame.primary.evidence);

  const r3 = B('2002-10-13T10:00');
  ok('2002-10-13 四柱', four(r3) === '壬午 庚戌 甲寅 己巳', four(r3));
  ok('戌月午寅会火局取伤官', r3.frame.primary.name === '伤官格' && r3.frame.primary.evidence.includes('会成火局'), r3.frame.primary.evidence);
}

// —— 三合不齐回本气
{
  const r = B('1992-04-05T06:00');
  ok('1992-04-05 四柱', four(r) === '壬申 甲辰 辛亥 辛卯', four(r));
  ok('辰月只有申、缺子，回本气取格', r.frame.primary.name === '正印格' && r.frame.primary.evidence.includes('以月令本气取格'), r.frame.primary.evidence);
  ok('回本气时依据不写会成', !r.frame.primary.evidence.includes('会成'));
}

// —— 建禄只认禄位；劫财为用作月劫
{
  const jl = B('1989-03-05T10:00');
  ok('甲日寅月仍为建禄', jl.frame.primary.name === '建禄格' && jl.frame.primary.evidence.includes('禄'), jl.frame.primary.evidence);
  const jl2 = B('1983-08-20T10:00');
  ok('庚日申月仍为建禄', jl2.frame.primary.name === '建禄格', jl2.frame.primary.name);
  const bi = B('1990-04-13T10:00');
  ok('戊日辰月不再冒称建禄', bi.frame.primary.name === '比肩格', bi.frame.primary.name);
  ok('比肩格依据点明禄在巳不在辰', bi.frame.primary.evidence.includes('禄在巳') && bi.frame.primary.evidence.includes('不在辰'), bi.frame.primary.evidence);

  const yj1 = B('1985-04-05T10:00');
  ok('辰月透乙作月劫', yj1.frame.primary.name === '月劫格' && yj1.frame.primary.evidence.includes('透于年干'), yj1.frame.primary.evidence);
  const yj2 = B('1996-08-05T10:00');
  ok('未月透乙作月劫', yj2.frame.primary.name === '月劫格' && yj2.frame.primary.evidence.includes('透于月干'), yj2.frame.primary.evidence);
  const yj3 = B('1990-10-28T02:00');
  ok('戌月午寅会火局、丁劫财为用作月劫', yj3.frame.primary.name === '月劫格' && yj3.frame.primary.evidence.includes('会成火局') && yj3.frame.primary.evidence.includes('作月劫论'), yj3.frame.primary.evidence);
}

// —— 非杂气月不启用会支
{
  const r = B('1979-11-13T06:00');
  ok('1979-11-13 四柱', four(r) === '己未 乙亥 甲申 丁卯', four(r));
  ok('亥月虽有未卯会木，仍按本气取偏印', r.frame.primary.name === '偏印格' && r.frame.primary.evidence.includes('以月令本气取格'), r.frame.primary.evidence);
  ok('非杂气月依据不写会成', !r.frame.primary.evidence.includes('会成'));

  const r2 = B('1985-09-15T06:00');
  ok('酉月巳丑齐全也不取会支', r2.frame.primary.name === '偏财格' && !r2.frame.primary.evidence.includes('会成'), r2.frame.primary.evidence);
}

// —— 总纲位四选一
{
  const za = classicsFor({ geju: [{ name: '偏财格', kind: '月令格' }], climate: { kind: '平和' }, monthBranch: '丑' });
  ok('杂气月取论杂气如何取用', za.some((x) => x.id === 'zp-zaji') && !za.some((x) => x.id === 'zp-yongshen'));
  ok('杂气 why 点明透干与会支', za.find((x) => x.id === 'zp-zaji').why.includes('透干') && za.find((x) => x.id === 'zp-zaji').why.includes('会支'));
  ok('杂气 why 无「论论」', za.every((x) => !x.why.includes('论论')));

  const zaCombo = classicsFor({ geju: [{ name: '偏财格', kind: '月令格' }, { name: '财官相生', kind: '组合' }], climate: { kind: '平和' }, monthBranch: '未' });
  ok('杂气优先于组合', zaCombo.some((x) => x.id === 'zp-zaji') && !zaCombo.some((x) => x.id === 'zp-chengbai'));

  const zaHuagi = classicsFor({ geju: [{ name: '化土格', kind: '化气格' }, { name: '正官格', kind: '月令格' }], climate: { kind: '平和' }, monthBranch: '辰' });
  ok('化气优先于杂气', zaHuagi.some((x) => x.id === 'zp-bianhua') && !zaHuagi.some((x) => x.id === 'zp-zaji'));

  const real = B('1985-02-03T10:00');
  ok('真实杂气盘总纲位出 zp-zaji', real.classics.some((x) => x.id === 'zp-zaji'), real.classics.map((x) => x.id).join(','));
  ok('真实杂气盘仍守 5 条上限', real.classics.length <= 5, String(real.classics.length));
  ok('化气盘不与杂气并列', B('2002-10-13T10:00').classics.some((x) => x.id === 'zp-bianhua') && !B('2002-10-13T10:00').classics.some((x) => x.id === 'zp-zaji'));
  ok('同输入同输出', JSON.stringify(classicsFor(real)) === JSON.stringify(real.classics));
}

// —— 摘要 / 解释层 / 面板 / 知识卡
{
  const r = B('1985-02-03T10:00', 'male');
  ok('摘要带原文书名与章名', r.summary.includes(`《${CLASSIC_BOOKS.ziping.name}·十六、论杂气如何取用》`));
  const it = B('1985-02-03T10:00', 'male');
  const withIt = compute({ system: 'bazi', datetime: '1985-02-03T10:00', gender: 'male', withInterpret: true });
  const sec = (withIt.interpret.sections || []).find((s) => s.key === 'classics');
  ok('解释层古籍节含杂气取用', !!sec && sec.text.includes('论杂气如何取用'));
  ok('未开解释层时不带 interpret', !it.interpret || !it.interpret.sections);

  const box = { window: {}, console };
  vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), box, { filename: 'panel-kit.js' });
  const html = box.window.__PP.baziHTML(r);
  ok('面板出现杂气章名', html.includes('论杂气如何取用'));
  ok('面板条目数与匹配数一致', (html.match(/mp-cl-e/g) || []).length === r.classics.length);

  const card = KNOWLEDGE.find((k) => k.id === 'bazi-zaji-quyong');
  ok('知识卡已入库且归八字', !!card && card.system === 'bazi');
  ok('知识卡标为异说并有注', !!card && card.status === 'variant' && typeof card.note === 'string' && card.note.length > 0);
  ok('知识卡对上原文与出处', !!card && card.source.includes('《子平真诠》十六、论杂气如何取用') && card.detail.includes('透干') && card.detail.includes('会支'));
  ok('知识卡 note 点明兼透与会支口径', !!card && card.note.includes('兼透') && card.note.includes('三合'));
}

console.log(`\n===== 杂气取用 =====\nPASS ${pass}　FAIL ${fail}`);
if (fail > 0) process.exitCode = 1;
