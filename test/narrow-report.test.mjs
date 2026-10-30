// 0.44.0 窄屏与深色下的「交叉验证 + 三张表」：
//   ① 390px 实测时大运表排到 748px，被截掉右半边且没有「还能滑」的提示 → 每行摊成一张卡；
//   ② 交叉验证原本是五段「八字——…；紫微——…；判断：…」长句 → 改成带判断标签的对照卡；
//   ③ 目录链接 22px、证据摘要 33px、名词解释 22px，都够不着 44px 的触摸目标；
//   ④ 浅色下表头 label 对 band 只有 3.51:1，11px 小字读不清 → 换 ink2。
// 这里锁的是「结构与样式口径」；像素级实测在交付说明里给出（390×844，浅色/深色各一遍）。
import fs from 'node:fs';
import vm from 'node:vm';
import { compute, crossSection } from '../engine/index.js';
import { ok, eq } from './_harness.mjs';

const KIT = fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8');
const UI = fs.readFileSync(new URL('../src/web-ui.js', import.meta.url), 'utf8');
const APP = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');

const BZ = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '河北石家庄', cross: true, withInterpret: true });
const sandbox = { window: {}, console };
vm.runInNewContext(KIT, sandbox, { filename: 'panel-kit.js' });
const PP = sandbox.window.__PP;

// ── ① 交叉验证：分节带 items，面板画对照卡 ─────────────────────
{
  const sec = crossSection(BZ.cross);
  ok('crossSection 有五个方面', sec.items.length === 5, String(sec.items.length));
  ok('crossSection 保留文本给 Markdown', sec.text.split('\n').length === 5 && sec.text.includes('八字——'));
  ok('crossSection 走同一个分节 key', sec.key === 'crossSystem' && sec.label === '八字 × 紫微 交叉验证');
  eq('crossSection(空) 给空 items', crossSection(null).items.length, 0);

  const it = BZ.interpret;
  ok('compute 的解析里已带结构化 items', it.sections.some((s) => s.key === 'crossSystem' && Array.isArray(s.items) && s.items.length === 5));

  const html = PP.interpretHTML(it, { folded: false });
  eq('面板渲染五张对照卡', (html.match(/class="mp-cross-row"/g) || []).length, 5);
  eq('八字/紫微各一列', (html.match(/class="mp-cross-cell"/g) || []).length, 10);
  ok('对照卡不再吐连读长句', !html.includes('八字——') && !html.includes('紫微——'), '仍渲染了「八字——」长句');
  // 判断标签按 同向/有张力/互补 上色，未知值留中性，不猜
  const TONE = { 同向: 'good', 有张力: 'watch', 互补: 'alt' };
  for (const c of BZ.cross.items) {
    const want = `mp-cross-tag t-${TONE[c.stance] || 'plain'}`;
    ok(`「${c.label}」标签用 ${want}`, html.includes(want), c.stance);
  }
  ok('对照卡标签与备注都转义', (() => {
    const evil = JSON.parse(JSON.stringify(it));
    const s = evil.sections.find((x) => x.key === 'crossSystem');
    s.items[0].label = '<img src=x onerror=alert(1)>';
    s.items[0].bazi = '<script>alert(1)</script>';
    const h = PP.interpretHTML(evil, { folded: false });
    return !/<img|<script/i.test(h) && h.includes('&lt;img') && h.includes('&lt;script');
  })());
}

// ── ② 窄屏表格：data-label + 一列一张卡 ────────────────────────
{
  const it = BZ.interpret;
  const html = PP.interpretHTML(it, { folded: false });
  const cells = it.tables.reduce((n, t) => n + t.rows.length * t.columns.length, 0);
  const cols = it.tables.reduce((n, t) => n + t.columns.length, 0);
  eq('每个单元格都带 data-label', (html.match(/data-label="/g) || []).length, cells);
  eq('表头带 scope=col', (html.match(/scope="col"/g) || []).length, cols);
  ok('data-label 已转义', (() => {
    const evil = JSON.parse(JSON.stringify(it));
    evil.tables[0].columns[0] = '"><img src=x>';
    const h = PP.interpretHTML(evil);
    return !/<img/i.test(h) && h.includes('&quot;&gt;&lt;img');
  })());

  const narrowStart = KIT.indexOf('/* —— ≤640px：大运表');
  const narrow = KIT.slice(narrowStart, KIT.indexOf('.mp-fu{', narrowStart));
  ok('找到窄屏表格样式块', narrowStart > 0 && narrow.length > 200, String(narrow.length));
  ok('窄屏表格不再横向滚动', /\.mp-table-scroll\{overflow:visible/.test(narrow));
  ok('窄屏隐藏表头', /\.mp-table thead\{display:none\}/.test(narrow));
  ok('每行变卡片', /\.mp-table tr\{display:block/.test(narrow));
  ok('单元格用 data-label 当行标', /\.mp-table td::before\{content:attr\(data-label\)/.test(narrow));
  ok('首列抬成卡头', /\.mp-table td:first-child\{display:block/.test(narrow));
  ok('窄屏对照卡改单列', /\.mp-cross-b\{grid-template-columns:1fr/.test(narrow));
  ok('表头改用 ink2（对比度修复）', /\.mp-table th\{background:var\(--band\);color:var\(--ink2\)/.test(KIT));

  // dsh 侧栏：窗口宽、报告窄，@media 不触发，同一批规则要能在容器查询下生效
  const cqStart = KIT.indexOf('@container (max-width:640px){', narrowStart);
  const cq = KIT.slice(cqStart, KIT.indexOf('.mp-fu{', cqStart));
  ok('mp-it 声明为查询容器', /\.mp-it\{[^}]*container-type:inline-size/.test(KIT));
  ok('侧栏窄同样摊成卡片', cqStart > 0 && /\.mp-table tr\{display:block/.test(cq) && /td::before\{content:attr\(data-label\)/.test(cq));
  ok('侧栏窄目录同样 44px', /\.mp-toc a\{[^}]*min-height:44px/.test(cq));
  ok('侧栏窄对照卡同样单列', /\.mp-cross-b\{grid-template-columns:1fr/.test(cq));
}

// ── ③ 触摸目标：目录 / 证据摘要 / 名词解释 ≥44px ──────────────
{
  const narrowStart = KIT.indexOf('/* —— ≤640px：大运表');
  const narrow = KIT.slice(narrowStart, KIT.indexOf('.mp-fu{', narrowStart));
  ok('目录链接 44px', /\.mp-toc a\{[^}]*min-height:44px/.test(narrow));
  ok('目录横滑、首尾留白', /\.mp-toc\{[^}]*overflow-x:auto/.test(narrow) && /scrollbar-width:none/.test(narrow));
  ok('证据摘要 44px', /\.mp-it-ev>summary\{[^}]*min-height:44px/.test(narrow));
  ok('名词解释摘要 44px', /\.mp-it-gloss summary\{[^}]*min-height:44px/.test(narrow));
  ok('折叠标题本来就够高', /\.mp-it-head\{min-height:46px\}/.test(KIT));
}

// ── ④ 对比度：浅色/深色两套变量都按 WCAG 算一遍 ───────────────
{
  const hex = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  const lum = (h) => { const [r, g, b] = hex(h).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

  const declStart = KIT.indexOf('.pp,.mp-it,');
  const declEnd = KIT.indexOf('container-type:inline-size');
  const light = KIT.slice(declStart, declEnd);
  const darkAt = KIT.indexOf('@media screen and (prefers-color-scheme:dark)');
  const dark = KIT.slice(darkAt, darkAt + 2200);
  const varsOf = (txt) => Object.fromEntries([...txt.matchAll(/--([a-z0-9-]+):(#[0-9a-fA-F]{6})/g)].map((m) => [m[1], m[2]]));
  const palettes = { 浅色: varsOf(light), 深色: varsOf(dark) };
  ok('两套变量都取到', Object.keys(palettes.浅色).length > 20 && Object.keys(palettes.深色).length > 20);

  // 表头/正文/标签/备注/判断标签/目录：正文类小字一律 ≥4.5:1（AA）
  const pairs = [
    ['ink2', 'band', '表头 11px'],
    ['ink2', 'card', '表格正文 12.5px'],
    ['muted', 'card', '卡内标签与备注 11–12px'],
    ['lu', 'bg', '目录链接 12px'],
    ['lu', 'card', '同向标签 11px'],
    ['quan', 'card', '有张力标签 11px'],
    ['ke', 'card', '互补标签 11px'],
  ];
  for (const [name, p] of Object.entries(palettes)) {
    for (const [fg, bg, label] of pairs) {
      const r = ratio(p[fg], p[bg]);
      ok(`${name}·${label} 对比度 ${r.toFixed(2)}:1 ≥ 4.5`, r >= 4.5, `${p[fg]} on ${p[bg]} = ${r.toFixed(2)}`);
    }
  }
  // 旧口径的回归：表头若改回 label，浅色只有 3.51，必须继续亮红灯
  ok('表头 label 对 band 确实不达标（说明修复有必要）', ratio(palettes.浅色.label, palettes.浅色.band) < 4.5,
    ratio(palettes.浅色.label, palettes.浅色.band).toFixed(2));
}

// ── ⑤ 两个入口都用同一份 crossSection，不各自拼文本 ───────────
{
  ok('独立页用 crossSection', /crossSection\(last\.r\.cross\)/.test(UI));
  ok('面板用 crossSection', /crossSection\(r\.cross\)/.test(APP));
}
