// A1+ 推导链出处：能指向古籍篇名的才写《书·篇》，没底的明确写「未录入 / 未标卷次」
import { compute } from '../engine/index.js';
import { CLASSIC_BOOKS } from '../engine/classics.js';
import { CITATION_BOOKS } from '../engine/citations.js';
// 卷次登记表要看全库：引擎侧只留定位字段，还有一半原文条目放在不打包的 citations-fuwen
import { LIBRARY_CITATIONS as CITATIONS } from '../engine/citations-fuwen.js';
import { traceMarkdown } from '../engine/trace.js';
import { ok, eq } from './_harness.mjs';

const LIU = compute({ system: 'liuyao', datetime: '2026-05-01T10:00', lines: [9, 8, 9, 7, 8, 6], direction: 'career', trace: true });
const BAZ = compute({ system: 'bazi', datetime: '1996-01-19T23:40', gender: 'male', address: '安徽池州', trace: true });
const ZW = compute({ system: 'ziwei', datetime: '1996-01-19T23:40', gender: 'male', trace: true });
const QM = compute({ system: 'qimen', datetime: '2026-05-01T10:00', direction: 'career', trace: true });
const DL = compute({ system: 'daliuren', datetime: '2026-05-01T10:00', trace: true });

const all = [...LIU.trace, ...BAZ.trace, ...ZW.trace, ...QM.trace, ...DL.trace];
const north = (t, key) => t.trace.find((x) => x.key === key);

// ── 结构：每层都给实现位置，书名只出现在已登记的书里 ──
ok('五体系共 16 层', all.length === 16, String(all.length));
ok('每层出处都指向实现', all.every((t) => /实现：engine\//.test(t.source)), all.map((t) => t.source).join(' | '));
const registered = new Set([...Object.values(CLASSIC_BOOKS), ...Object.values(CITATION_BOOKS)].map((b) => b.name));
const books = new Set();
for (const t of all) {
  for (const m of String(t.source).matchAll(/《([^》]+)》/g)) books.add(m[1]);
}
eq('引用的书名都在古籍登记表里', [...books].filter((b) => !registered.has(b)).join('、'), '');

// 书名 + 篇名必须能在引文库或经典库里找到同书同章（防止编章节）
const BOOKS = { ...CLASSIC_BOOKS, ...CITATION_BOOKS };
const chapterPairs = CITATIONS.map((c) => [BOOKS[c.book] && BOOKS[c.book].name, c.chapter]);
const hasChapter = (book, chapter) => chapterPairs.some(([b, c]) => b === book && c === chapter);
ok('增删卜易·用神章已登记', hasChapter('增删卜易', '卷一·用神章第八'));
ok('增删卜易·飛伏神章已登记', hasChapter('增删卜易', '卷二·飛伏神章第二十八'));
ok('增删卜易·月將章已登记', hasChapter('增删卜易', '卷一·月將章第十六'));
ok('增删卜易·日辰章已登记', hasChapter('增删卜易', '卷一·日辰章第十七'));
ok('奇门统宗·玄机赋（中）已登记', hasChapter('奇门遁甲统宗', '卷十一·玄机赋（中）'));
ok('奇门统宗·卷三已登记', hasChapter('奇门遁甲统宗', '卷三'));
ok('奇门统宗·卷二已登记', hasChapter('奇门遁甲统宗', '卷二'));
ok('紫微斗数全书·论人命入格已登记', hasChapter('紫微斗数全书', '卷三·论人命入格'));
ok('紫微斗数全书·谈星要论已登记', hasChapter('紫微斗数全书', '卷三·谈星要论'));
// B8 六爻源头三本：卷次照页面自身的标法（黄金策分「1、總斷千金賦」以下诸节，无卷次）
ok('京氏易传·乾宫大有已登记', hasChapter('京氏易传', '卷上·乾下離上·大有'));
ok('京氏易传·晋卦注文已登记', hasChapter('京氏易传', '卷上·坤下離上·晋（注文）'));
ok('火珠林·六亲根源已登记', hasChapter('火珠林', '六亲根源'));
ok('黄金策·总断千金赋已登记', hasChapter('黄金策', '一·总断千金赋'));

// ── 六爻：B8 起纳甲与世应能指到《京氏易传》，通则仍写「属通行推步」──
ok('纳甲引京氏易传卷上', north(LIU, 'najia').source.includes('《京氏易传》卷上'), north(LIU, 'najia').source);
ok('世应引京氏易传并标通行推步', north(LIU, 'shiying').source.includes('《京氏易传》')
  && north(LIU, 'shiying').source.includes('通行推步'), north(LIU, 'shiying').source);
ok('六亲引火珠林六亲根源', north(LIU, 'liuqin').source.includes('《火珠林》六亲根源'), north(LIU, 'liuqin').source);
ok('六亲对读用神章', north(LIU, 'liuqin').source.includes('《增删卜易》卷一·用神章第八'), north(LIU, 'liuqin').source);
ok('伏神引飛伏神章', LIU.trace.filter((t) => t.key === 'fushen').every((t) => t.source.includes('卷二·飛伏神章第二十八')),
  LIU.trace.filter((t) => t.key === 'fushen').map((t) => t.source).join(' | '));
ok('六爻旺衰引月將与日辰', north(LIU, 'wangsheng').source.includes('月將章第十六') && north(LIU, 'wangsheng').source.includes('日辰章第十七'),
  north(LIU, 'wangsheng').source);

// ── 八字：量化算法不冒充古籍；格局引子平真诠；四宫写明 Tyme 口径 ──
ok('旺衰写明非古籍定数', north(BAZ, 'strength').source.includes('非古籍定数'), north(BAZ, 'strength').source);
ok('格局引子平真诠论用神', north(BAZ, 'geju').source.includes('《子平真诠》八、论用神'), north(BAZ, 'geju').source);
ok('调候引穷通宝鉴五行总论', north(BAZ, 'geju').source.includes('《穷通宝鉴》五行总论'), north(BAZ, 'geju').source);
ok('四宫写明 Tyme 口径与对拍', north(BAZ, 'palaces').source.includes('Tyme 1.5.4') && north(BAZ, 'palaces').source.includes('704 组'),
  north(BAZ, 'palaces').source);

// ── 紫微：引全书卷三 ──
ok('格局引紫微斗数全书卷三', north(ZW, 'patterns').source.includes('《紫微斗数全书》卷三'), north(ZW, 'patterns').source);

// ── 奇门：事实/旺衰/宫位各引本仓已录入的章页；用神表不冒充原文 ──
ok('盘面事实引奇门秘诀总赋', north(QM, 'facts').source.includes('卷一·奇门秘诀总赋'), north(QM, 'facts').source);
ok('用神表写明非古籍原文', north(QM, 'yongshen').source.includes('非古籍原文'), north(QM, 'yongshen').source);
ok('旺衰引统宗卷三', north(QM, 'states').source.includes('《奇门遁甲统宗》卷三'), north(QM, 'states').source);
ok('宫位引卷二与玄机赋', north(QM, 'relations').source.includes('卷二') && north(QM, 'relations').source.includes('玄机赋（中）'),
  north(QM, 'relations').source);

// ── 大六壬：四课/三传引《大六壬大全》四库本；加时布盘仍标通行口诀 ──
ok('大六壬四课引起例十干寄宫', north(DL, 'sike').source.includes('《大六壬大全》卷一·起例（十干寄宫）'), north(DL, 'sike').source);
ok('大六壬三传引起例贼克法', north(DL, 'sanchuan').source.includes('卷一·起例（贼克法'), north(DL, 'sanchuan').source);
ok('大六壬天地盘引卷二神将释', north(DL, 'tiandipan').source.includes('《大六壬大全》卷二·神将释'), north(DL, 'tiandipan').source);
ok('加时布盘仍标通行口诀', north(DL, 'tiandipan').source.includes('加时布盘属通行口诀，未标卷次'), north(DL, 'tiandipan').source);

// ── 导出：Markdown 原文照搬这些出处，不改写 ──
const md = traceMarkdown(LIU.trace, { system: 'liuyao' });
ok('Markdown 含新增出处', md.includes('《增删卜易》卷一·月將章第十六') && md.includes('**出处**：'));
// B8 之前这句断言的是「md 里有未录入古籍章页」；纳甲与世应接上《京氏易传》后，
// 六爻这一路已经没有「未录入」了，改成盯住新书目真的进了导出文本。
ok('Markdown 照搬六爻源头书目', md.includes('《京氏易传》卷上') && md.includes('《火珠林》六亲根源'), md.slice(0, 120));
