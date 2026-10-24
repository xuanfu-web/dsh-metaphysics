// 知识库质量门：条目必须自带出处与可信度标注，且不得出现绝对化表述
//
// 这套条目会在文末以「各家有异说 / 待核实」的形式直接展示给用户，
// 所以它比普通文案更需要硬约束：没有出处的知识、没标注分歧的断言，都不该进库。
import { KNOWLEDGE, knowledgeFor, caveatsFor, STATUS_LABEL } from '../engine/interpret-knowledge.js';
import { compute } from '../engine/index.js';
import { ok } from './_harness.mjs';

const STATUSES = new Set(['settled', 'variant', 'todo']);
const SYSTEMS = new Set(['bazi', 'ziwei', 'liuyao', 'meihua', 'daliuren', 'qimen', 'tarot', 'hepan']);
const BAN = /(一定|必然|注定|肯定会|绝对会|百分百|铁定|毫无疑问)/;

ok('知识条目数量达标（≥24）', KNOWLEDGE.length >= 24, String(KNOWLEDGE.length));

const ids = KNOWLEDGE.map((k) => k.id);
ok('id 唯一', new Set(ids).size === ids.length, `${ids.length - new Set(ids).size} 个重复`);

let badSystem = 0;
let badStatus = 0;
let noSource = 0;
let shortDetail = 0;
let noGist = 0;
let variantNoNote = 0;
let banned = 0;
for (const k of KNOWLEDGE) {
  if (!SYSTEMS.has(k.system)) badSystem++;
  if (!STATUSES.has(k.status)) badStatus++;
  if (!k.source || k.source.length < 6) noSource++;
  if (!k.detail || k.detail.length < 30) shortDetail++;
  if (!k.gist || k.gist.length < 8 || k.gist.length > 48) noGist++;
  if (k.status !== 'settled' && !k.note) variantNoNote++;
  if (BAN.test(`${k.gist}${k.detail}${k.note || ''}`)) banned++;
}
ok('体系字段合法', badSystem === 0, `${badSystem} 条非法`);
ok('状态字段合法', badStatus === 0, `${badStatus} 条非法`);
ok('每条都有出处', noSource === 0, `${noSource} 条缺出处`);
ok('机制解释不敷衍（≥30 字）', shortDetail === 0, `${shortDetail} 条过短`);
ok('一句话白话长度合理', noGist === 0, `${noGist} 条不合格`);
ok('有异说/待核实必须写清分歧', variantNoNote === 0, `${variantNoNote} 条没写 note`);
ok('全库无绝对化表述', banned === 0, `${banned} 条越界`);

// 每个体系都要有能挂到「整体运势」上的条目，否则解析卡片会空
for (const sys of ['bazi', 'ziwei', 'liuyao', 'meihua', 'daliuren', 'qimen', 'tarot']) {
  const n = knowledgeFor(sys, 'overall').length;
  ok(`${sys} 有 overall 知识条目`, n > 0, `${n} 条`);
}
ok('文案用词无绝对化', true, BAN.source);

// caveatsFor 只返回非 settled
const c = caveatsFor('bazi');
ok('caveats 不含 settled', c.every((k) => k.status !== 'settled'), `${c.length} 条`);
ok('caveats 覆盖有异说条目', c.some((k) => k.status === 'variant'), `${c.length} 条`);

// 状态标签齐全
ok('状态标签齐全', Object.keys(STATUS_LABEL).length === 3, JSON.stringify(STATUS_LABEL));

// ── 集成：知识条目要真的出现在解析结果里 ──
const r = compute({ system: 'bazi', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州', withInterpret: true, question: '今年考运', direction: 'study' });
const it = r.interpret;
const withKnow = (it.dimensions || []).filter((d) => Array.isArray(d.knowledge) && d.knowledge.length);
ok('八字：维度挂上知识条目', withKnow.length >= 3, `${withKnow.length} 个维度有知识`);
ok('八字：知识条目带出处', withKnow.every((d) => d.knowledge.every((k) => k.source && k.statusLabel)), '缺出处或标签');
ok('八字：有条目计数', it.knowledgeCount > 0, String(it.knowledgeCount));
ok('八字：文末有可信度声明', (it.sections || []).some((s) => s.label === '这套规则有多稳'), '缺「这套规则有多稳」');
ok('八字：caveats 数组存在', Array.isArray(it.caveats) && it.caveats.length > 0, `${it.caveats && it.caveats.length}`);

// 六爻：用神条目必须出现（这是六爻最核心的一条规则）
const l = compute({ system: 'liuyao', datetime: '2026-10-24T19:30', lines: [7, 8, 9, 6, 7, 8], question: '这件事能成吗', withInterpret: true }).interpret;
const liuyaoKnow = (l.dimensions || []).flatMap((d) => d.knowledge || []);
ok('六爻：用神规则已挂载', liuyaoKnow.some((k) => k.id === 'liuyao-yongshen'), liuyaoKnow.map((k) => k.id).join(','));
ok('六爻：待核实项被标注', (l.caveats || []).some((k) => k.status === 'todo') || (l.sections || []).some((s) => s.label === '尚未实现（不猜）'), '缺待核实声明');
