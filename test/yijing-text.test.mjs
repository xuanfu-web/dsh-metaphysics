// 《周易》经文原文库：结构自证、跨卦查重、校勘锚点、解释层与分块接线。
//
// 这张表的来源是三份互校的公开底本（见 engine/yijing-text.js 头注），不是凭记忆手敲的。
// 所以测试的重点不是「条数对不对」（数一遍就知道），而是三条能反向证伪的锁：
//   ① 爻题的「九 / 六」必须等于本引擎排出来的该位阴阳——错位、错卦、题序写反都会当场红；
//   ② 386 条爻辞正文互不相同——历史上真实的错误（大有九二误置同人六二）正是这一类；
//   ③ 分块里必须真的带着这张表——漏配 tools/build-client.mjs 时不报错，只在结果里静默没有原文。
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { YIJING, YIJING_COUNTS, yijingOf, yaoAt, jingText } from '../engine/yijing-text.js';
import { hexagramFromBits } from '../engine/liuyao.js';
import { compute, askPackages } from '../engine/index.js';
import { ok, eq } from './_harness.mjs';

const root = path.resolve(import.meta.dirname, '..');
const ENTRIES = Object.values(YIJING);

// ── ① 覆盖与形态 ────────────────────────────────────────────
eq('64 卦全在表里', Object.keys(YIJING).length, 64);
eq('爻条总数 386（384 爻 + 用九 + 用六）', YIJING_COUNTS.yao, 386);
eq('卦辞总数 64', YIJING_COUNTS.gua, 64);
eq('卦序 1..64 无重无漏', [...new Set(ENTRIES.map((e) => e.order))].sort((a, b) => a - b).join(','),
  Array.from({ length: 64 }, (_, i) => i + 1).join(','));
ok('每条卦辞都以「卦名：」开头', ENTRIES.every((e) => e.gua.startsWith(`${e.core}：`)),
  ENTRIES.filter((e) => !e.gua.startsWith(`${e.core}：`)).map((e) => e.full).join('、'));
ok('每条爻辞都是「爻题：正文」两段式', ENTRIES.every((e) => e.yao.every((y) => /^[^：]{2,3}：.+$/.test(y))));
ok('爻辞正文以句末标点收尾', ENTRIES.every((e) => e.yao.every((y) =>
  /[。！]$/.test(y.replace(/〔[^〕]*〕$/, '')))));
ok('乾 / 坤 各有 7 条，其余 6 条', ENTRIES.every((e) => e.yao.length === (['乾', '坤'].includes(e.core) ? 7 : 6)));
ok('用九 / 用六 只出现在乾、坤的第 7 条', (() => {
  const seven = ENTRIES.filter((e) => e.yao.length === 7);
  return seven.length === 2 && seven.every((e) => e.core === '乾' || e.core === '坤')
    && YIJING['乾为天'].yao[6].startsWith('用九：') && YIJING['坤为地'].yao[6].startsWith('用六：');
})(), ENTRIES.filter((e) => e.yao.length === 7).map((e) => e.full).join('、'));

// ── ② 结构自证：爻题的九/六 == 引擎卦画的阴阳 ───────────────
// 取辞规则也一并锁住：初/上 是「位在前」（初九、上六），二三四五 是「题在前」（九二、六五）。
const misTitle = [];
const misBits = [];
for (let b = 0; b < 64; b++) {
  const bits = [0, 1, 2, 3, 4, 5].map((i) => (b >> i) & 1);
  const h = hexagramFromBits(bits);
  const e = YIJING[h.name];
  if (!e) { misTitle.push(`表里查不到 ${h.name}`); continue; }
  for (let p = 1; p <= 6; p++) {
    const t = e.yao[p - 1].split('：')[0];
    const yang = bits[p - 1] === 1;
    const mark = p === 1 || p === 6 ? t[1] : t[0];
    if ((mark === '九') !== yang) misBits.push(`${h.name} ${t} 第${p}位应为${yang ? '九' : '六'}`);
    if (p === 1 && t[0] !== '初') misTitle.push(`${h.name} ${t} 初爻当以「初」起`);
    if (p === 6 && t[0] !== '上') misTitle.push(`${h.name} ${t} 上爻当以「上」起`);
    if (p > 1 && p < 6 && !'九六'.includes(t[0])) misTitle.push(`${h.name} ${t} 中四爻当以九/六起`);
    const posChar = ['初', '二', '三', '四', '五', '上'][p - 1];
    if (!t.includes(posChar)) misTitle.push(`${h.name} ${t} 缺位名「${posChar}」`);
  }
}
eq('384 爻的爻题与引擎卦画阴阳全部相符', misBits.join(' | '), '');
eq('384 爻的爻题写法全部合京房例', misTitle.join(' | '), '');

// ── ③ 跨卦查重：三源投票抓到的那类错，必须永远回不来 ────────
const yaoBody = [];
for (const e of ENTRIES) for (const y of e.yao) yaoBody.push({ full: e.full, title: y.split('：')[0], body: y.split('：').slice(1).join('：') });
eq('爻条总数（含用九用六）', yaoBody.length, 386);
const seenBody = new Map();
const dup = [];
for (const { full, title, body } of yaoBody) {
  if (seenBody.has(body)) dup.push(`${full}·${title} 与 ${seenBody.get(body)} 正文相同`);
  else seenBody.set(body, `${full}·${title}`);
}
eq('386 条爻辞正文两两不同', dup.join(' | '), '');
eq('64 条卦辞正文两两不同', (() => {
  const g = new Map(); const d = [];
  for (const e of ENTRIES) { const k = e.gua.slice(e.core.length + 1); if (g.has(k)) d.push(`${e.full} 与 ${g.get(k)} 卦辞相同`); else g.set(k, e.full); }
  return d.join(' | ');
})(), '');

// ── ④ 校勘锚点：生成脚本里逐条裁定过的位置，改回去就会红 ────
const anchors = [
  ['乾为天', 'gua', '乾：元亨，利贞。'],
  ['乾为天', 6, '用九：见群龙无首，吉。'],
  ['坤为地', 6, '用六：利永贞。'],
  ['水雷屯', 2, '六三：即鹿无虞，惟入于林中，君子几不如舍，往吝。〔一作既鹿〕'],
  ['地雷复', 0, '初九：不远复，无祗悔，元吉。〔一作不复远〕'],
  ['天水讼', 3, '九四：不克讼，复即命，渝安贞，吉。〔一作复自命〕'],
  ['火天大有', 1, '九二：大车以载，有攸往，无咎。'],
  ['天火同人', 1, '六二：同人于宗，吝。'],
  ['泽火革', 'gua', '革：己日乃孚，元亨利贞，悔亡。〔一作巳日乃孚〕'],
  ['水火既济', 4, '九五：东邻杀牛，不如西邻之禴祭，实受其福。'],
  ['雷风恒', 5, '上六：振恒，凶。'],
  ['火水未济', 5, '上九：有孚于饮酒，无咎，濡其首，有孚失是。'],
  ['坎为水', 5, '上六：系用徽纆，置于丛棘，三岁不得，凶。'],
  ['雷火丰', 2, '九三：丰其沛，日中见沫，折其右肱，无咎。〔一作日中见昧〕'],
];
for (const [full, where, want] of anchors) {
  const e = YIJING[full];
  const got = where === 'gua' ? e.gua : e.yao[where];
  ok(`锚点 ${full}·${where === 'gua' ? '卦辞' : e.yao[where].split('：')[0]}`, got === want, got === want ? '' : `实得 ${got}`);
}
ok('底本错字「同人于宗」未被搬进大有九二', !YIJING['火天大有'].yao[1].includes('同人于宗'));
ok('大有九二的爻题按卦画写作九二（底本作六二，已改）', YIJING['火天大有'].yao[1].startsWith('九二：'));
eq('异文标注只在带〔一作…〕的条目里出现',
  ENTRIES.reduce((s, e) => s + [e.gua, ...e.yao].filter((t) => t.includes('〔')).length, 0), 20);

// ── ⑤ 取卦 API ─────────────────────────────────────────────
// core 是卦名本身：单字卦（屯、乾）是一字，复字卦（既济、大有）是两字
eq('按全名取卦', yijingOf('水火既济').core, '既济');
eq('按卦名取卦', yijingOf('屯').full, '水雷屯');
eq('复字卦名单字不认', yijingOf('既'), null);
eq('去掉书名号与空白', yijingOf('《水火既济》').full, '水火既济');
eq('取不到返回 null', yijingOf('水火既济x'), null);
eq('空输入返回 null', yijingOf(''), null);
eq('第 7 位取用九', yaoAt(yijingOf('乾'), 7), '用九：见群龙无首，吉。');
eq('越界返回空串', yaoAt(yijingOf('乾'), 8), '');
eq('空表返回空串', yaoAt(null, 1), '');

// ── ⑥ 经文段落：动爻取辞、六爻皆变补用九、互卦与变卦 ───────
const jQianAll = jingText({ benName: '乾为天', bianName: '坤为地', movingPositions: [1, 2, 3, 4, 5, 6] });
ok('六爻皆变时补用九', jQianAll.split('\n').includes('用九：见群龙无首，吉。'), jQianAll.split('\n').length + ' 行');
ok('动爻按位升序排', jingText({ benName: '乾为天', movingPositions: [5, 2, 2] }).split('\n').slice(2).join('|') === '九二：见龙在田，利见大人。|九五：飞龙在天，利见大人。');
eq('无动爻只给卦辞', jingText({ benName: '风山渐', movingPositions: [] }).split('\n').length, 3);
ok('无动爻写明皆静', jingText({ benName: '风山渐', movingPositions: [] }).includes('六爻皆静'));
ok('异文段尾给图例', jingText({ benName: '水雷屯', movingPositions: [3] }).includes('〔一作…〕为古籍异文'));
ok('无动爻且无异文不给图例', !jingText({ benName: '风山渐', movingPositions: [] }).includes('图例') && !jingText({ benName: '风山渐', movingPositions: [] }).includes('异文'));
eq('本变同卦不重复罗列', jingText({ benName: '乾为天', bianName: '乾为天', movingPositions: [1] }).split('\n').filter((l) => l.startsWith('变卦')).length, 0);
ok('梅花互卦单列一行', jingText({ benName: '水火既济', huName: '火水未济', bianName: '泽火革', movingPositions: [3] }).includes('互卦「火水未济」'));
eq('查不到卦返回空串（调用方据此省略整节）', jingText({ benName: '不存在的卦' }), '');
eq('不传参数返回空串', jingText(), '');
ok('段落里没有 HTML 元字符（面板按行转义，出现 < > 说明原文被污染）',
  !/[<>]/.test([jingText({ benName: '乾为天', bianName: '坤为地', movingPositions: [1, 2, 3, 4, 5, 6] }), jingText({ benName: '火水未济', bianName: '水火既济', movingPositions: [6] })].join('')));

// ── ⑦ 解释层接线：经文原文进 sections，且排在「落到生活里」之前 ──
const LIU = { system: 'liuyao', datetime: '2026-10-24T19:30', question: '这件事能成吗', withInterpret: true };
const liuOne = compute({ ...LIU, lines: [7, 8, 9, 6, 7, 8] }).interpret;
const secOf = (it) => (it.sections || []).find((s) => s.key === 'jingText');
ok('六爻结果带出经文原文节', !!secOf(liuOne), (liuOne.sections || []).map((s) => s.label).join('、'));
ok('经文节以「本卦「卦名」」起头', /^本卦「.+」\n/.test(secOf(liuOne)?.text || ''), String(secOf(liuOne)?.text).slice(0, 24));
const labels = (liuOne.sections || []).map((s) => s.key);
ok('经文排在变卦与走向之前、白话大意之后', labels.indexOf('guaCi') < labels.indexOf('jingText') && labels.indexOf('jingText') < labels.indexOf('scene'), labels.join('、'));
const benEntry = yijingOf(compute({ ...LIU, lines: [7, 8, 9, 6, 7, 8] }).ben.name);
ok('经文里的卦辞与卦内表同源', secOf(liuOne).text.includes(benEntry.gua), benEntry.full);
const liuQuiet = compute({ ...LIU, lines: [7, 8, 7, 8, 7, 8] }).interpret;
ok('静卦（无动爻）也给出经文节', !!secOf(liuQuiet) && secOf(liuQuiet).text.includes('六爻皆静'), String(secOf(liuQuiet)?.text).slice(0, 40));
const mh = compute({ system: 'meihua', mode: 'time', datetime: '2026-10-24T11:43', withInterpret: true }).interpret;
const mhJing = secOf(mh);
ok('梅花结果带出经文原文节，且含互卦', !!mhJing && /互卦「.+」/.test(mhJing.text), (mh.sections || []).map((s) => s.label).join('、'));
const mhR = compute({ system: 'meihua', mode: 'time', datetime: '2026-10-24T11:43' });
ok('梅花经文里的动爻就是本命动爻', mhJing.text.includes(yaoAt(yijingOf(mhR.ben.name), mhR.moving)), `动爻 ${mhR.moving}`);

// ── ⑦b 复制提问出口：交给别家模型时，原文要一起走，不能只给白话大意 ──
const liuR = compute({ ...LIU, lines: [7, 8, 9, 6, 7, 8] });
const pk = askPackages(liuR, { question: '这件事能成吗' });
ok('复制提问的整包文本带上《周易》原文', pk.full.includes(benEntry.gua) && pk.full.includes('《周易》经文原文'), `full ${pk.full.length} 字`);
ok('包里的原文就是盘面上那段', pk.full.includes(String(liuR.jing)), String(liuR.jing).slice(0, 20));
const baziPk = askPackages(compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', withInterpret: true }));
ok('非卦象体系不多塞这一段', !baziPk.full.includes('《周易》经文原文') && !baziPk.full.includes('本卦「'));

// ── ⑧ 分块接线：漏配 build-client 时不报错，只在结果里静默没有原文，所以直接跑分块 ──
const chunkFile = path.join(root, 'client.liuyao.js');
ok('六爻分块已构建（先跑 npm run build）', fs.existsSync(chunkFile));
if (fs.existsSync(chunkFile)) {
  const code = fs.readFileSync(chunkFile, 'utf8');
  let reg = null;
  vm.runInNewContext(code, { window: { __ModuleLoader__: { load: (m) => { reg = m; } } }, console }, { filename: 'client.liuyao.js' });
  ok('分块注册成功', reg && reg.chunk === 'client.liuyao.js', reg && reg.chunk);
  const Engine = reg.factory(() => ({ createElement: () => null })).Engine;
  const ci = Engine.compute({ ...LIU, lines: [7, 8, 9, 6, 7, 8] }).interpret;
  ok('分块里的六爻结果带出经文原文', !!secOf(ci), (ci.sections || []).map((s) => s.label).join('、'));
  const cm = Engine.compute({ system: 'meihua', mode: 'time', datetime: '2026-10-24T11:43', withInterpret: true }).interpret;
  ok('分块里的梅花结果带出经文原文', !!secOf(cm), (cm.sections || []).map((s) => s.label).join('、'));
}

// ── ⑨ 体积：这张表只该进六爻/梅花分块，不该抬其它 17 块 ────
const chunkGz = (f) => {
  const p = path.join(root, f);
  return fs.existsSync(p) ? fs.statSync(p).size : 0;
};
ok('原文表本身不超过 40KB（超了说明被复制成了多份）', fs.statSync(path.join(root, 'engine/yijing-text.js')).size < 40 * 1024, String(chunkGz('engine/yijing-text.js')));
const otherChunk = fs.readFileSync(path.join(root, 'client.tarot.js'), 'utf8');
ok('经文表没有混进无关分块（否则每块都白背 12KB）', !otherChunk.includes('本卦「乾为天」') && !otherChunk.includes('见群龙无首'), `client.tarot.js ${chunkGz('client.tarot.js')}B`);
