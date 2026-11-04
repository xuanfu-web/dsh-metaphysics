// 知识库质量门：条目必须自带出处与可信度标注，且不得出现绝对化表述
//
// 这套条目会在文末以「各家有异说 / 待核实」的形式直接展示给用户，
// 所以它比普通文案更需要硬约束：没有出处的知识、没标注分歧的断言，都不该进库。
import { KNOWLEDGE, knowledgeFor, caveatsFor, STATUS_LABEL, KNOWLEDGE_DISCLAIMER } from '../engine/interpret-knowledge.js';
import { compute, interpretText } from '../engine/index.js';
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

// 0.59.0 起：标签必须自己说清「这讲的是文本」。
// 以前写「诸家一致」，用户读成「这说法可靠」——实际含义只是「各书都这么写」。
// 这两件事混在一个词里，是产品在无意中骗人。这条断言就是防止有人把它改回去。
const bareLabel = Object.entries(STATUS_LABEL).filter(([, v]) => !/^文本·/.test(v)).map(([k]) => k);
ok('状态标签必须显式限定在文本层', bareLabel.length === 0, bareLabel.join(','));

// 效度声明必须同时否掉两件事：文本一致 ≠ 有效，插件不作保证
const note = KNOWLEDGE_DISCLAIMER || '';
ok('效度声明存在', note.length >= 30, `${note.length} 字`);
ok('效度声明点明「不表示经过验证」', /不表示.*验证/.test(note), note);
ok('效度声明点明「不作保证」', /不.*保证/.test(note), note);

// ── 集成：知识条目要真的出现在解析结果里 ──
const r = compute({ system: 'bazi', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州', withInterpret: true, question: '今年考运', direction: 'study' });
const it = r.interpret;
const withKnow = (it.dimensions || []).filter((d) => Array.isArray(d.knowledge) && d.knowledge.length);
ok('八字：维度挂上知识条目', withKnow.length >= 3, `${withKnow.length} 个维度有知识`);
ok('八字：知识条目带出处', withKnow.every((d) => d.knowledge.every((k) => k.source && k.statusLabel)), '缺出处或标签');
ok('八字：有条目计数', it.knowledgeCount > 0, String(it.knowledgeCount));
ok('八字：文末有可信度声明', (it.sections || []).some((s) => s.label === '这套规则有多稳'), '缺「这套规则有多稳」');
ok('八字：caveats 数组存在', Array.isArray(it.caveats) && it.caveats.length > 0, `${it.caveats && it.caveats.length}`);

// 0.59.0 起：分歧要分组——用户先要知道「我这盘有几处是取派分歧」，
// 体系总账次要。只给一张大清单，等于把「你这盘踩到的」和「这派别来就吵的」混成一锅。
{
  const cav = (it.sections || []).find((s) => s.key === 'caveats');
  const cavText = cav ? cav.text : '';
  ok('分歧按「本盘涉及」分组', /本盘涉及 \d+ 处|本盘未踩到/.test(cavText), cavText.slice(0, 80));
  // 标了「本盘涉及」的，必须真在这张盘的知识卡里出现过，不能虚标
  const head = cavText.split('本体系另有')[0] || '';
  const shownGists = new Set((it.dimensions || []).flatMap((d) => (d.knowledge || []).map((k) => k.gist.trim())));
  const touchedLines = head.split('\n').filter((l) => l.startsWith('· '));
  const ghost = touchedLines
    .map((l) => l.replace(/^· /, '').replace(/（文本·[^）]*）\s*$/, '').trim())
    .filter((g) => !shownGists.has(g));
  ok('「本盘涉及」的条目都真的在卡里出现过', ghost.length === 0, ghost.slice(0, 2).join(' | '));
}

// 注解不刷屏：一张卡全报告只挂一次，每维最多 3 条——否则同一段规则会在五个维度里复读
{
  const ids = (it.dimensions || []).flatMap((d) => (d.knowledge || []).map((k) => k.id));
  const uniq = new Set(ids);
  ok('八字：同一张知识卡不重复出现', uniq.size === ids.length, `${ids.length} 条 / ${uniq.size} 张`);
  ok('八字：每维注解不超过 3 条', (it.dimensions || []).every((d) => (d.knowledge || []).length <= 3), (it.dimensions || []).map((d) => (d.knowledge || []).length).join(','));
  ok('八字：knowledgeCount 与实际挂载的条目数一致', it.knowledgeCount === ids.length, `${it.knowledgeCount} vs ${ids.length}`);
}

// 没填问题时：抬头不喊「（未填写）」，也不假称「你问的这件事」
{
  const n = compute({ system: 'bazi', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州', withInterpret: true });
  const text = interpretText(n.interpret);
  ok('无问题：抬头不写「未填写」', !text.includes('（未填写）'), text.slice(0, 40));
  ok('无问题：不假称「你问的这件事」', !text.includes('具体到你问的这件事'), text.slice(0, 160));
}

// 六爻：用神条目必须出现（这是六爻最核心的一条规则）
const l = compute({ system: 'liuyao', datetime: '2026-10-24T19:30', lines: [7, 8, 9, 6, 7, 8], question: '这件事能成吗', withInterpret: true }).interpret;
const liuyaoKnow = (l.dimensions || []).flatMap((d) => d.knowledge || []);
ok('六爻：用神规则已挂载', liuyaoKnow.some((k) => k.id === 'liuyao-yongshen'), liuyaoKnow.map((k) => k.id).join(','));
ok('六爻：待核实项被标注', (l.caveats || []).some((k) => k.status === 'todo') || (l.sections || []).some((s) => s.label === '尚未实现（不猜）'), '缺待核实声明');

// ── 入墓知识卡必须与引擎墓库表同源 ────────────────────────────
// 起因：本轮把三奇入墓改成《玄机赋》阴干逆行取墓（乙→戌/乾六、丁→丑/艮八），
// 引擎、摘要、面板、推导链都换了，知识卡与 README 还在教旧表（乙木墓未→坤二、丙丁火墓戌→乾六）。
// 用户在同一次回答里会看到两套矛盾的墓宫，而知识卡还带着「各家有异说」的标签，更像是对的那个。
// 断言不从文案反推：期望值由 ruMuOf / LIUYI_RU_MU 现推，改表不改文案立刻挂。
const fs = await import('node:fs');
const path = await import('node:path');
const { ruMuOf } = await import('../engine/qimen.js');
const { LIUYI_RU_MU } = await import('../engine/qimen-ganying.js');
const engineMu = {};
for (const stem of ['乙', '丙', '丁']) {
  for (const pal of ['1', '2', '3', '4', '6', '7', '8', '9']) {
    const hit = ruMuOf([{ palace: pal, tianPan: stem }])[0];
    if (hit) engineMu[stem] = { zhi: hit.zhi, palace: /在([\u4e00-\u9fa5]{2})宫/.exec(hit.basis)[1] };
  }
}
for (const [stem, t] of Object.entries(LIUYI_RU_MU)) {
  engineMu[stem] = { zhi: t.zhi, palace: /在([\u4e00-\u9fa5]{2})宫/.exec(t.basis)[1] };
}
ok('引擎侧墓库表九干齐全（三奇 + 六仪）', Object.keys(engineMu).length === 9, JSON.stringify(engineMu));
const MU_RE = /([乙丙丁戊己庚辛壬癸]+)墓([子丑寅卯辰巳午未申酉戌亥])（([^）]+)）/g;
const readMu = (text) => {
  const out = {};
  for (const m of text.matchAll(MU_RE)) for (const s of m[1]) out[s] = { zhi: m[2], palace: m[3] };
  return out;
};
const drift = (doc, label) => {
  const got = readMu(doc);
  const bad = Object.keys(engineMu).filter((s) => !got[s] || got[s].zhi !== engineMu[s].zhi || got[s].palace !== engineMu[s].palace);
  ok(`${label}的入墓表与引擎逐项一致`, bad.length === 0, bad.map((s) => `${s}:${got[s] ? `${got[s].zhi}${got[s].palace}` : '缺失'}≠${engineMu[s].zhi}${engineMu[s].palace}`).join('、'));
  return got;
};
const rumu = KNOWLEDGE.find((k) => k.id === 'qimen-rumu') || {};
const knowMu = drift(String(rumu.detail || ''), '知识卡 qimen-rumu');
const readmeLine = (fs.readFileSync(path.resolve(import.meta.dirname, '../README.md'), 'utf8')
  .split('\n').find((x) => x.startsWith('- **奇门宫位条件**')) || '');
drift(readmeLine, 'README 奇门宫位条件');
ok('知识卡写明异说取自何处', /玄机赋/.test(String(rumu.note || '')) && /五行墓库|阴干/.test(String(rumu.note || '')), String(rumu.note || ''));
ok('知识卡不再出现旧表写法', !/乙木墓未/.test(String(rumu.detail || '')) && !/丙丁火墓戌/.test(String(rumu.detail || '')), String(rumu.detail || '').slice(0, 50));
