// B6 引文索引：知识卡覆盖、引文可解析、原文子串可核验、索引页与数据同源。
import fs from 'node:fs';
import { CLASSICS } from '../engine/classics.js';
import {
  CITATIONS, CITATION_BOOKS, CARD_CITATIONS, allCitations, citationOf, citationSourceOf, patternCitations,
} from '../engine/citations.js';
import { KNOWLEDGE } from '../engine/interpret-knowledge.js';
import { PATTERN_BREAK_RULES } from '../engine/ziwei.js';
import { compute } from '../engine/index.js';
import { buildCitationsHTML } from '../tools/citations.mjs';
import { ok, eq } from './_harness.mjs';

const FX = JSON.parse(fs.readFileSync(new URL('./fixtures/citation-sources.json', import.meta.url), 'utf8'));
const norm = (s) => String(s ?? '').replace(/[\s\u3000]+/g, '');
const all = allCitations();

// ── ① 引文数据与原文核验 ─────────────────────────────────────
ok('引文库非空', all.length === CLASSICS.length + CITATIONS.length && all.length >= 60, String(all.length));
eq('引文 id 唯一', new Set(all.map((c) => c.id)).size, all.length);
ok('每条引文都有书名/卷章/原文/链接', all.every((c) => c.bookName && c.chapter.length >= 2 && c.quote.length >= 8 && /^https:\/\//.test(c.url)));
ok('紫微书已登记', CITATION_BOOKS.ziwei && CITATION_BOOKS.ziwei.name === '紫微斗数全书');
ok('穷通宝鉴已登记', CITATION_BOOKS.qiongtong && CITATION_BOOKS.qiongtong.name === '穷通宝鉴');

// B6 补录：七张八字卡从「通行说」落到可核验原文
const refilled = ['bazi-wangxiang', 'bazi-shensha', 'bazi-kongwang', 'bazi-dayun-jiaoqi', 'bazi-liuqin', 'bazi-xingchong', 'bazi-tiaohou'];
ok('B6 补录卡片已带 refs', refilled.every((id) => Array.isArray(CARD_CITATIONS[id].refs) && CARD_CITATIONS[id].refs.length));
ok('旺相休囚死取三命通会卷二', citationOf('smt-wangxiang').bookName === '三命通会' && citationOf('smt-wangxiang').chapter === '卷二·论五行旺相休囚死并寄');
ok('起运取三命通会论大运', citationOf('smt-dayun-qiyun').chapter === '卷二·论大运');
ok('六亲取三命通会卷七', citationOf('smt-liuqin').chapter === '卷七·论六亲');
ok('调候取穷通宝鉴五行总论', citationOf('qt-tiaohou').bookName === '穷通宝鉴' && citationOf('qt-tiaohou').chapter === '五行总论');
ok('补录条目不写省略号', refilled.every((id) => !/[….](\.\.\.)?/.test(citationOf(CARD_CITATIONS[id].refs[0]).quote)));

// B6 第三批：奇门五张、梅花一张落到《奇门遁甲统宗》《梅花易数》原文
const refilled2 = ['qimen-yinyang', 'qimen-jixing', 'qimen-rumu', 'qimen-wangshuai', 'qimen-wangshuai-yong', 'meihua-tiyong'];
ok('奇门遁甲统宗与梅花易数已登记', CITATION_BOOKS.qimen.name === '奇门遁甲统宗' && CITATION_BOOKS.meihua.name === '梅花易数');
ok('B6 第三批卡片已带 refs', refilled2.every((id) => Array.isArray(CARD_CITATIONS[id].refs) && CARD_CITATIONS[id].refs.length));
ok('阴阳遁取统宗卷一总赋', citationOf('qm-yinyang').chapter === '卷一·奇门秘诀总赋');
ok('三奇入墓取统宗卷十一', citationOf('qm-rumu').chapter === '卷十一·玄机赋（中）' && /三奇入墓/.test(citationOf('qm-rumu').quote));
ok('门星旺衰取统宗卷三', citationOf('qm-wangshuai').chapter === '卷三' && /旺相休囚/.test(citationOf('qm-wangshuai').quote));
ok('体用取梅花易数卷二', citationOf('mh-tiyong').bookName === '梅花易数' && citationOf('mh-tiyong').chapter === '卷二·体用生克');
ok('第三批条目不写省略号', refilled2.every((id) => !/[….](\.\.\.)?/.test(citationOf(CARD_CITATIONS[id].refs[0]).quote)));

// B6 第四批：六爻十三张落到《增删卜易》（维基文库本，繁体照录）
const refilled3 = ['liuyao-yongshen', 'liuyao-fushen', 'liuyao-wangshuai', 'liuyao-yongshen-shuai', 'liuyao-quanggu-shuai', 'liuyao-dongbian', 'liuyao-liushen', 'liuyao-liuhe', 'liuyao-liuchong', 'liuyao-fanyin', 'liuyao-fuyin', 'liuyao-jintui', 'liuyao-yingqi'];
ok('增删卜易已登记', CITATION_BOOKS.liuyao.name === '增删卜易' && CITATION_BOOKS.liuyao.base.includes('zh.wikisource.org'));
ok('B6 第四批卡片已带 refs', refilled3.every((id) => Array.isArray(CARD_CITATIONS[id].refs) && CARD_CITATIONS[id].refs.length));
ok('用神与伏神分取两章', citationOf('zs-yongshen').chapter === '卷一·用神章第八' && citationOf('zs-fushen').chapter === '卷二·飛伏神章第二十八');
ok('月建日辰分取两章', citationOf('zs-yuejian').chapter === '卷一·月將章第十六' && citationOf('zs-richen').chapter === '卷一·日辰章第十七');
ok('六冲六合取本章', citationOf('zs-liuchong').chapter === '卷一·六沖章第二十' && citationOf('zs-liuhe').chapter === '卷一·六合章第十九');
ok('反吟伏吟同出反伏章', citationOf('zs-fanyin').chapter === '卷一·反伏章第二十五' && citationOf('zs-fuyin').chapter === '卷一·反伏章第二十五');
ok('进神退神取卷二', citationOf('zs-jintui').chapter === '卷二·進神退神章第二十九');
ok('应期取总注章', citationOf('zs-yingqi').chapter === '卷一·各門類應期總注章第又二十六');
ok('第四批条目不写省略号', refilled3.every((id) => !/[….](\.\.\.)?/.test(citationOf(CARD_CITATIONS[id].refs[0]).quote)));

// B6 第五批：大六壬四课/三传承落到《大六壬大全》（维基文库四库全书本）
ok('大六壬大全已登记', CITATION_BOOKS.daliuren && CITATION_BOOKS.daliuren.name === '大六壬大全'
  && CITATION_BOOKS.daliuren.base.includes('zh.wikisource.org'));
ok('大六壬四课三传卡已带 refs', Array.isArray(CARD_CITATIONS['daliuren-sike'].refs) && CARD_CITATIONS['daliuren-sike'].refs.length === 2);
ok('十干寄宫取卷一', citationOf('dl-jigong').chapter === '卷一·起例（十干寄宫）' && /甲课寅兮乙课辰/.test(citationOf('dl-jigong').quote));
ok('贼克法取卷一', citationOf('dl-zeike').chapter === '卷一·起例（贼克法）' && /取课先从下贼呼/.test(citationOf('dl-zeike').quote));
ok('月将取卷二神将释', citationOf('dl-yuejiang').chapter === '卷二·神将释（月将）' && /月将/.test(citationOf('dl-yuejiang').quote));
ok('大六壬条目不写省略号', ['dl-jigong', 'dl-zeike', 'dl-yuejiang'].every((id) => !/[….](\.\.\.)?/.test(citationOf(id).quote)));

const missingText = [];
const unverified = [];
for (const c of [...CLASSICS, ...CITATIONS]) {
  const text = FX.chapters[c.url];
  if (!text) { missingText.push(c.id); continue; }
  const q = c.verifiedQuote || c.quote;
  if (!norm(text).includes(norm(q))) unverified.push(c.id);
}
ok('每条引文的来源正文都在 fixture 里', missingText.length === 0, missingText.join(','));
ok('原文子串逐条核验通过', unverified.length === 0, unverified.join(','));
ok('异文条目标出 verifiedQuote 与说明', CLASSICS.filter((c) => c.variantNote).every((c) => c.verifiedQuote && c.variantNote.length > 8));
ok('引文不把白话混进原文', all.every((c) => !c.quote.includes('本站') && !c.quote.includes('本插件')));

// ── ② 知识卡覆盖 ────────────────────────────────────────────
const ids = new Set(KNOWLEDGE.map((k) => k.id));
ok('每张知识卡都有索引', KNOWLEDGE.every((k) => CARD_CITATIONS[k.id]), KNOWLEDGE.filter((k) => !CARD_CITATIONS[k.id]).map((k) => k.id).join(','));
ok('索引里没有不存在的卡', Object.keys(CARD_CITATIONS).every((id) => ids.has(id)), Object.keys(CARD_CITATIONS).filter((id) => !ids.has(id)).join(','));
ok('状态取值合法', Object.values(CARD_CITATIONS).every((e) => (Array.isArray(e.refs) && e.refs.length) || ['general', 'todo'].includes(e.status)));
ok('general/todo 都写了理由', Object.values(CARD_CITATIONS).filter((e) => !Array.isArray(e.refs)).every((e) => e.reason && e.reason.length >= 4 && e.book));

const badRefs = [];
for (const [id, e] of Object.entries(CARD_CITATIONS)) {
  for (const ref of e.refs || []) if (!citationOf(ref)) badRefs.push(`${id}→${ref}`);
}
ok('知识卡引用的 id 都能解析', badRefs.length === 0, badRefs.join(','));

const verifiedCards = KNOWLEDGE.filter((k) => Array.isArray(CARD_CITATIONS[k.id].refs) && CARD_CITATIONS[k.id].refs.length);
const generalCards = KNOWLEDGE.filter((k) => CARD_CITATIONS[k.id].status === 'general');
const todoCards = KNOWLEDGE.filter((k) => CARD_CITATIONS[k.id].status === 'todo');
ok('已定位原文的知识卡 ≥ 17', verifiedCards.length >= 17, String(verifiedCards.length));
ok('通行说与待补单独计数', generalCards.length + todoCards.length > 0, `general ${generalCards.length} / todo ${todoCards.length}`);

// ── ③ 破格规则引用 ──────────────────────────────────────────
const graded = Object.entries(PATTERN_BREAK_RULES).filter(([, r]) => !r.kind);
ok('可判破格的格局都带引文', graded.every(([, r]) => Array.isArray(r.citationIds) && r.citationIds.length > 0), graded.filter(([, r]) => !r.citationIds).map(([n]) => n).join(','));
ok('破格引文全部可解析', patternCitations().every((p) => p.citations.length === p.citationIds.length), patternCitations().filter((p) => p.citations.length !== p.citationIds.length).map((p) => p.name).join(','));
ok('忌格/结构标签不硬配破格引文', Object.entries(PATTERN_BREAK_RULES).filter(([, r]) => r.kind).every(([, r]) => !r.citationIds));

// ── ④ source 富化 ──────────────────────────────────────────
const vs = citationSourceOf('bazi-geju', '《子平真诠》「论用神」');
ok('已定位卡片的 source 带卷章与链接', vs.status === 'verified' && vs.source.includes('原文索引') && vs.source.includes('https://') && vs.citations.length > 0, vs.source);
const gs = citationSourceOf('bazi-tonggen-tougan', '《滴天髓》通神论');
ok('通行说卡片标明原文待补，不伪造链接', gs.status === 'general' && gs.source.includes('通行说') && !gs.source.includes('http'), gs.source);
// 2026-11-01 复核：用神化进退的喜忌分档已落到《增删卜易》卷二進神退神章原文
ok('用神化进退已落到進神退神章', Array.isArray(CARD_CITATIONS['liuyao-jintui-yong'].refs)
  && CARD_CITATIONS['liuyao-jintui-yong'].refs[0] === 'zs-jintui');
ok('用神化进退的 source 带原文索引', citationSourceOf('liuyao-jintui-yong').status === 'verified');
ok('通行说剩七张（另有 1 张待补）', generalCards.length === 7 && todoCards.length === 1, `general ${generalCards.length} / todo ${todoCards.length}`);
const ts = citationSourceOf('liuyao-yingqi-exact', '待补');
ok('待补卡片标明 todo', ts.status === 'todo' && ts.source.includes('待补原文'), ts.source);
const z = compute({ system: 'ziwei', datetime: '1955-01-02T00:00', gender: 'male', withInterpret: true });
const know = (z.interpret.dimensions || []).flatMap((d) => d.knowledge || []);
ok('解读层知识卡带引文对象', know.some((k) => Array.isArray(k.citations) && k.citations.length > 0), know.map((k) => k.id).join(','));
ok('解读层 source 带原文链接', know.some((k) => k.citations.length && k.source.includes('zh.wikisource.org')), know.map((k) => k.source).join(' | ').slice(0, 200));

// ── ⑤ 索引页同源 ────────────────────────────────────────────
const html = fs.readFileSync(new URL('../docs/citations.html', import.meta.url), 'utf8');
ok('索引页与生成器逐字一致', html === buildCitationsHTML());
ok('索引页带统计与引文库', html.includes('知识卡') && html.includes('引文库') && html.includes(String(all.length)));
ok('索引页列出紫微原文', html.includes('不以入格而论') && html.includes('紫微斗数全书'));
ok('索引页无外链脚本', !/<script[^>]+src=/.test(html));
