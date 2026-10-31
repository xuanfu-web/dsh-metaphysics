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
const gs = citationSourceOf('liuyao-liuhe', '《卜筮正宗》六合章');
ok('通行说卡片标明原文待补，不伪造链接', gs.status === 'general' && gs.source.includes('通行说') && !gs.source.includes('http'), gs.source);
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
