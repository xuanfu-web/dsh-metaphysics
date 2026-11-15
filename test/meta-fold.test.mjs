// 元信息折叠：方法类段落与出处卡片不许再挤在正文里
// 依据是 2c 的实测：八个主力体系里 method 段落占推演层 15%–72%（大六壬 268/374），
// 出处卡更狠——八字 3798 字、六爻 2525 字，而五维真正的话只有 300–600 字。
// 这一条测的是「分层没被改回去」，不是具体文案。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compute, interpret } from '../engine/index.js';
import { ok, eq } from './_harness.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');

const METHOD_KEYS = ['caveats', 'limits', 'quant', 'checklist', 'todo', 'reasoning', 'checks', 'classics'];
const TEXT_KEYS = ['jingText', 'guaCi', 'yaoCi'];

const CASES = [
  ['bazi', { system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male' }],
  ['ziwei', { system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male' }],
  ['liuyao', { system: 'liuyao', lines: [7, 8, 9, 7, 8, 9], question: '这份工作要不要接' }],
  ['qimen', { system: 'qimen', datetime: '2026-11-15T10:00', question: '这笔款能不能收回' }],
  ['tarot', { system: 'tarot', question: '该不该搬走', spread: 'three' }],
  ['daliuren', { system: 'daliuren', datetime: '2026-11-15T09:00', question: '能不能成' }],
  ['meihua', { system: 'meihua', datetime: '2026-11-15T09:00', question: '明天谈得下来吗' }]
];

const built = CASES.map(([tag, args]) => {
  const r = compute(args);
  const it = interpret(r, args.question || '');
  return { tag, r, it, secs: (it && it.sections) || [] };
});

// ── 1. 引擎侧：段落性质有标记，且标记与白名单一致 ───────────────
for (const b of built) {
  const wrong = b.secs.filter((s) => METHOD_KEYS.indexOf(s.key) >= 0 && s.kind !== 'method');
  ok(`${b.tag}：方法类段落都标了 kind=method`, wrong.length === 0, wrong.map((s) => s.key).join(','));
  const wrongText = b.secs.filter((s) => TEXT_KEYS.indexOf(s.key) >= 0 && s.kind !== 'text');
  ok(`${b.tag}：经文类段落都标了 kind=text`, wrongText.length === 0, wrongText.map((s) => s.key).join(','));
  const strayKind = b.secs.filter((s) => s.kind && ['method', 'text'].indexOf(s.kind) < 0);
  ok(`${b.tag}：没有第三种 kind`, strayKind.length === 0, strayKind.map((s) => s.key).join(','));
}

const bazi = built.find((b) => b.tag === 'bazi');
const baziMethod = bazi.secs.filter((s) => s.kind === 'method').map((s) => s.key);
ok('八字：口径分歧（caveats）归入方法区', baziMethod.indexOf('caveats') >= 0, baziMethod.join(','));
ok('八字：未纳入与量化口径归入方法区', baziMethod.indexOf('limits') >= 0 && baziMethod.indexOf('quant') >= 0);
ok('八字：正文里没有残留方法段', bazi.secs.filter((s) => s.kind !== 'method').every((s) => METHOD_KEYS.indexOf(s.key) < 0));

const liuyao = built.find((b) => b.tag === 'liuyao');
ok('六爻：经文原文留在正文（用户会主动找）', liuyao.secs.some((s) => s.key === 'jingText' && s.kind === 'text'));
const liuyaoBody = liuyao.secs.filter((s) => s.kind !== 'method').reduce((n, s) => n + String(s.text || '').length, 0);
const liuyaoMethod = liuyao.secs.filter((s) => s.kind === 'method').reduce((n, s) => n + String(s.text || '').length, 0);
ok('六爻：方法层字数超过正文', liuyaoMethod > 0 && liuyaoBody < liuyaoMethod, `正文 ${liuyaoBody} / 方法 ${liuyaoMethod}`);

// ── 2. 渲染侧：一处折叠区、正文不出出处卡 ───────────────────
const kitSrc = fs.readFileSync(path.join(root, 'src', 'panel-kit.js'), 'utf8');
globalThis.window = {};
new Function('window', kitSrc)(globalThis.window);
const PP = globalThis.window.__PP;

const baziHTML = PP.interpretHTML(bazi.it, { folded: false });
eq('方法与出处只有一个折叠区', (baziHTML.match(/class="mp-it-sec mp-it-method"/g) || []).length, 1);
ok('文末有「依据与出处」锚点', baziHTML.includes('id="mp-sec-know"'));
const dimZone = baziHTML.split('class="mp-it-secs"')[0];
ok('五维正文里不再内联出处卡', !dimZone.includes('know-row'));
ok('五维里保留了出处入口链接', dimZone.includes('mp-it-knowref'));
ok('出处入口指向文末锚点', /href="#mp-sec-know"/.test(dimZone));

const tocText = (baziHTML.match(/<nav class="mp-toc"[^]*?<\/nav>/) || [''])[0];
ok('目录里有「方法与出处」一项', tocText.includes('方法与出处'));
ok('目录里不再逐个列方法段', !tocText.includes('这套规则有多稳') && !tocText.includes('未纳入'));

const bodyZone = baziHTML.split('class="mp-it-secs"')[1] || '';
const bodyOnly = bodyZone.split('class="mp-it-sec mp-it-method"')[0] || '';
ok('正文里不再出现方法段标题', !bodyOnly.includes('这套规则有多稳') && !bodyOnly.includes('未纳入'));

// ── 3. 边界：没有五维、没有知识卡的体系也不能崩 ───────────────
const qimen = built.find((b) => b.tag === 'qimen');
const qHTML = PP.interpretHTML(qimen.it, { folded: false });
ok('奇门（无五维）仍有方法与出处折叠区', qHTML.includes('mp-it-method'));
ok('奇门无知识卡时不作文末出处段', !qHTML.includes('id="mp-sec-know"'));

const tarot = built.find((b) => b.tag === 'tarot');
ok('塔罗有知识卡时出处段出现', PP.interpretHTML(tarot.it, { folded: false }).includes('id="mp-sec-know"'));

ok('null 解析返回空串', PP.interpretHTML(null) === '');
ok('空解析返回空串', PP.interpretHTML({ dimensions: [] }) === '');

// ── 4. 锚点唯一：奇门自己有一段 key 就叫 facts，事实层块不能也叫 mp-sec-facts ──
{
  const q = PP.interpretHTML(qimen.it, { folded: false });
  const ids = [...q.matchAll(/id="([a-z0-9-]+)"/g)].map((m) => m[1]);
  eq('渲染结果里 id 不重复（奇门）', ids.filter((x, i) => ids.indexOf(x) !== i).join(','), '');
  ok('事实层块用 mp-facts 做锚点', q.includes('id="mp-facts"'));
  ok('正文角标指向 mp-facts', q.includes('href="#mp-facts"'));
  ok('奇门自己的 facts 段仍占 mp-sec-facts', q.includes('id="mp-sec-facts"'));
  const b = PP.interpretHTML(built.find((x) => x.tag === 'bazi').it, { folded: false });
  const bIds = [...b.matchAll(/id="([a-z0-9-]+)"/g)].map((m) => m[1]);
  eq('渲染结果里 id 不重复（八字）', bIds.filter((x, i) => bIds.indexOf(x) !== i).join(','), '');
}
