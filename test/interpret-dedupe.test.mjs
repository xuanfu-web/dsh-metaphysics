// 0.46.4：注解去重的三条硬约束，都要能被钉住——
//   ① 同一张卡挂在哪个维度，不能因为「问法/方向不同而显示顺序变了」而漂移；
//   ② 文末「这套规则有多稳」必须列全，不能截断，也不能漏掉未展开条目的原注；
//   ③ 没填问题时，抬头与直答标题不能出现「未填写」「先答所问」这类假话。
import fs from 'node:fs';
import { compute, interpretText } from '../engine/index.js';
import { caveatsFor } from '../engine/interpret-knowledge.js';
import { ok } from './_harness.mjs';

const BASE = { system: 'bazi', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州', withInterpret: true };
const baziOf = (extra = {}) => compute({ ...BASE, ...extra }).interpret;

// ── ① 归属稳定：卡片跟维度身份走，不跟显示顺序走 ──
{
  const sig = (it) => (it.dimensions || [])
    .flatMap((d) => (d.knowledge || []).map((k) => `${k.id}@${d.key}`))
    .sort()
    .join('|');
  const baseline = sig(baziOf({ question: '今年考运', direction: 'study' }));
  ok('八字：注解归属有内容可测', baseline.length > 0, baseline.slice(0, 60));

  const DIRS = ['general', 'wealth', 'career', 'love', 'health', 'study', 'travel'];
  const drifted = DIRS.filter((d) => sig(baziOf({ question: '看看今年怎么样', direction: d })) !== baseline);
  ok('八字：换询问方向不改变「卡片→维度」归属', drifted.length === 0, drifted.length ? drifted.join(',') : '');

  // 换问法（同一方向、不同问题）也不该漂移：归属按维度身份定，与问题文本无关
  const asked = sig(baziOf({ question: '感情怎么样', direction: 'study' }));
  ok('八字：换问题文本不改变注解归属', asked === baseline, baseline === asked ? '' : '归属变了');

  // 不填问题同样稳定——这条是 0.46.3 时声称测过、实际没测的
  const silent = sig(baziOf({}));
  ok('八字：填不填问题，注解归属一致', silent === baseline, silent === baseline ? '' : '归属变了');

  // 每维最多 3 条，且同一张卡全报告只出现一次
  const ids = (baziOf({ question: '今年考运', direction: 'study' }).dimensions || [])
    .flatMap((d) => (d.knowledge || []).map((k) => k.id));
  ok('八字：同一张知识卡不重复挂载', new Set(ids).size === ids.length, `${ids.length} 条 / ${new Set(ids).size} 张`);
  ok('八字：每维注解不超过 3 条', (baziOf({}).dimensions || []).every((d) => (d.knowledge || []).length <= 3),
    (baziOf({}).dimensions || []).map((d) => (d.knowledge || []).length).join(','));
}

// ── ② 文末分歧清单列全：不截断、不丢原注、不与「待核实」段重复 ──
{
  const it = baziOf({ question: '今年考运', direction: 'study' });
  const cav = caveatsFor('bazi');
  const disputed = cav.filter((k) => k.status !== 'todo');
  const sec = (it.sections || []).find((s) => s.key === 'caveats');
  const text = sec ? sec.text : '';
  const lines = text.split('\n').filter((l) => l.startsWith('· '));
  ok('八字：分歧清单存在', !!sec, sec ? '' : '缺 caveats 段');
  const allListed = disputed.every((k) => text.includes(k.gist));
  ok('八字：分歧条目全数列出（不截断）', allListed, allListed ? '' : `${lines.length} 行 / ${disputed.length} 条`);
  ok('八字：分歧行数等于条目数', lines.length === disputed.length, lines.length === disputed.length ? '' : `${lines.length} vs ${disputed.length}`);

  const mounted = new Set((it.dimensions || []).flatMap((d) => (d.knowledge || []).map((k) => k.id)));
  const lostNote = disputed.filter((k) => !mounted.has(k.id) && k.note && !text.includes(k.note));
  ok('八字：未展开条目的原注仍在清单里', lostNote.length === 0, lostNote.length ? lostNote.map((k) => k.id).join(',') : '');
  const dupNote = disputed.filter((k) => mounted.has(k.id) && k.note && text.includes(k.note));
  ok('八字：已展开条目不重复贴原注', dupNote.length === 0, dupNote.length ? dupNote.map((k) => k.id).join(',') : '');

  // 「待核实」单独成段并附原注；它不能再出现在「这套规则有多稳」里
  const li = compute({ system: 'liuyao', datetime: '2026-10-24T19:30', lines: [7, 8, 9, 6, 7, 8], question: '这件事能成吗', withInterpret: true }).interpret;
  const todos = caveatsFor('liuyao').filter((k) => k.status === 'todo');
  const tsec = (li.sections || []).find((s) => s.key === 'todo');
  const csec = (li.sections || []).find((s) => s.key === 'caveats');
  const todoInSec = !!tsec && todos.every((k) => tsec.text.includes(k.gist));
  ok('六爻：待核实项进「尚未实现」段', todoInSec, todoInSec ? '' : todos.map((k) => k.id).join(','));
  const todoNote = !!tsec && todos.every((k) => !k.note || tsec.text.includes(k.note));
  ok('六爻：待核实项附原注', todoNote, todoNote ? '' : '缺注');
  const todoSeparated = !csec || todos.every((k) => !csec.text.includes(k.gist));
  ok('六爻：待核实项不混进分歧清单', todoSeparated, todoSeparated ? '' : '混入了');
}

// ── ③ 没填问题：直答标题、抬头都不能假装「答所问」 ──
{
  const text = interpretText(baziOf({}));
  const titleOk = text.includes('▶ 先看结论：') && !text.includes('▶ 先答所问：');
  ok('无问题：直答标题为「先看结论」', titleOk, titleOk ? '' : text.slice(0, 60));
  ok('无问题：抬头不写「未填写」', !text.includes('（未填写）'), text.includes('（未填写）') ? text.slice(0, 60) : '');
  ok('无问题：不假称「你问的这件事」', !text.includes('具体到你问的这件事'), text.includes('具体到你问的这件事') ? text.slice(0, 120) : '');

  const withQ = interpretText(baziOf({ question: '今年考运', direction: 'study' }));
  ok('有问题：直答标题仍为「先答所问」', withQ.includes('▶ 先答所问：'), withQ.includes('▶ 先答所问：') ? '' : withQ.slice(0, 60));

  // 奇门只选方向、不问事：回显只报方向，正文也不能说「答所问」
  const q = compute({ system: 'qimen', datetime: '2026-10-24T19:30', direction: 'wealth', withInterpret: true }).interpret;
  const qText = interpretText(q);
  const echoOk = q.ask && q.ask.echo === '询问方向：财运';
  ok('奇门没填问题：回显只报方向', echoOk, echoOk ? '' : q.ask && q.ask.echo);
  const qTitleOk = qText.includes('▶ 先看结论：') && !qText.includes('先答所问');
  ok('奇门没填问题：标题为「先看结论」', qTitleOk, qTitleOk ? '' : qText.slice(0, 80));
  const dirOk = /财运/.test(q.answer || '');
  ok('奇门没填问题：直答落到所选方向', dirOk, dirOk ? '' : q.answer);
}

// ── ④ 面板回显：源码层面钉住「不再渲染（未填写）」 ──
{
  const kit = fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8');
  const oldAskNone = /<span class="ask-none">（未填写）<\/span>/.test(kit);
  ok('面板：旧「（未填写）」回显已删除', !oldAskNone, oldAskNone ? '仍存在旧串' : '');
  const condAsk = /\$\{askQ \? `<span class="ask-q">问题：\$\{askQ\}<\/span>/.test(kit);
  ok('面板：只有填了问题才渲染「问题：」', condAsk, condAsk ? '' : '条件渲染缺失');
  const condTitle = /\$\{askQ \? '先答所问' : '先看结论'\}/.test(kit);
  ok('面板：直答标题按有无问题切换', condTitle, condTitle ? '' : '标题未切换');
}

// ── ⑤ knowledgeCount 独立核对：计数必须等于实际唯一卡片数 ──
for (const [label, it] of [
  ['八字', baziOf({ question: '今年考运', direction: 'study' })],
  ['六爻', compute({ system: 'liuyao', datetime: '2026-10-24T19:30', lines: [7, 8, 9, 6, 7, 8], question: '这件事能成吗', withInterpret: true }).interpret],
]) {
  const ids = (it.dimensions || []).flatMap((d) => (d.knowledge || []).map((k) => k.id));
  ok(`${label}：knowledgeCount 等于唯一卡片数`, it.knowledgeCount === new Set(ids).size, `${it.knowledgeCount} vs ${new Set(ids).size}`);
  ok(`${label}：knowledgeCount 等于逐维挂载总数`, it.knowledgeCount === ids.length, `${it.knowledgeCount} vs ${ids.length}`);
}
