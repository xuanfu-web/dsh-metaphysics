// 0.11.0：深色主题（变量化）、导出 PDF（打印样式）、窄屏 tab 排布
import fs from 'node:fs';

let pass = 0;
const fails = [];
const eq = (a, b, msg) => { if (a === b) pass++; else fails.push(`${msg}：期望 ${JSON.stringify(b)}，实际 ${JSON.stringify(a)}`); };
const ok = (c, msg) => { if (c) pass++; else fails.push(msg); };

const KIT = fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8');
const HTML = fs.readFileSync(new URL('../tools/build-html.mjs', import.meta.url), 'utf8');
const UI = fs.readFileSync(new URL('../src/web-ui.js', import.meta.url), 'utf8');

// ── 一、盘面颜色全部走变量（深色才能只改变量就换肤）─────────────
{
  // 变量定义本身允许写死颜色（浅色一套、深色一套），其余地方一律走 var()
  const declStart = KIT.indexOf('.pp,.mp-it{--ink:');
  const declEnd = KIT.indexOf('container-type:inline-size');
  ok(declStart >= 0 && declEnd > declStart, '找到 .pp 变量声明块');
  const decl = KIT.slice(declStart, declEnd);
  const outside = KIT.slice(0, declStart) + KIT.slice(declEnd);
  // 深色块里也有变量定义，同样先剔掉
  const outsideStripped = outside.replace(/--[a-zA-Z0-9-]+:#[0-9a-fA-F]{3,6}(?=[;}])/g, '');
  const strayHex = (outsideStripped.match(/#[0-9a-fA-F]{3,6}\b/g) || []);
  eq(strayHex.length, 0, `变量声明之外不得残留硬编码色（残留：${strayHex.join(' ')}）`);
  // 语义色变量齐备
  for (const v of ['--tri', '--soul', '--sel', '--link', '--hover', '--hover2', '--band', '--faint', '--label', '--ink2', '--br-good', '--br-bad', '--on-accent']) {
    ok(decl.includes(v + ':'), `变量 ${v} 已定义`);
  }
  // 回归：.pp-body 是视图容器（static + display:none），曾残留一条 ::after 的「身」角标规则，
  // position:absolute 会相对文档原点定位 → 每次排盘都在页面左上角飘出一个孤立的「身」方块。
  ok(!/\.pp-body::after/.test(KIT), '.pp-body 不得带 ::after（会飘出孤立「身」角标）');
  // 回归：.mp-it（解析与详解）是 .pp 的兄弟节点，变量必须与 .pp 共享；
  // 且不能用 --x:var(--x) 自引用（会让变量 invalid，连继承值也挡掉，--card 因此失效）。
  ok(/\.pp,\.mp-it\{--ink:/.test(KIT), '.mp-it 与 .pp 共享同一份调色板变量');
  const itBlock = (KIT.match(/\.mp-it\{[^}]*\}/) || [''])[0];
  ok(!/--([a-z0-9-]+)\s*:\s*var\(--\)/.test(itBlock),
    '.mp-it 内不得写 --x:var(--x) 自引用（无效声明会挡掉继承值）');
  ok(/--card:#[0-9a-f]{6}/.test(decl), '--card 在共享变量块里已定义（.mp-it-head 底色依赖它）');

  // 关键处的替换抽查
  ok(/\.pp-tri\{background:var\(--tri\)\}/.test(KIT), '三方四正底色走 --tri');
  ok(/\.pp-cell:hover\{background:var\(--hover\)\}/.test(KIT), '宫格 hover 走 --hover');
  ok(/\.pp-cell\.pp-sel\{background:var\(--sel\)/.test(KIT), '选中宫底色走 --sel');
  ok(/\.pp-detail \.dt-dr \.dt-k\{color:var\(--label\)/.test(KIT), '详情标签走 --label');
  eq(/rgba\(179,38,30/.test(KIT), false, '不再有硬编码的红色 rgba');
  ok(/rgba\(var\(--red-rgb\),/.test(KIT), '半透明红色改走 --red-rgb');
}

// ── 二、深色主题：只换变量，且不影响打印 ────────────────────────
{
  ok(/@media screen and \(prefers-color-scheme:dark\)/.test(KIT), '深色主题用 @media screen 限定（打印不受影响）');
  const darkBlock = KIT.slice(KIT.indexOf('@media screen and (prefers-color-scheme:dark)'));
  const seg = darkBlock.slice(0, darkBlock.indexOf('.pp *{box-sizing'));
  ok(/\.pp,?\.mp-it\{--ink:/.test(seg) || /\.pp\{--ink:/.test(seg), '深色块内重定义 .pp/.mp-it 变量');
  eq(/\{background:var\(--bg\)\}/.test(seg), false, '深色块内不重复写元素样式（只改变量）');
  // 深色下主色要比浅色亮（否则小字在深底上读不出来）
  const lum = (hex) => {
    const n = parseInt(hex.slice(1), 16);
    return ((n >> 16) & 255) * 0.299 + ((n >> 8) & 255) * 0.587 + (n & 255) * 0.114;
  };
  const pick = (text) => (text.match(/--ink:(#[0-9a-f]{6})/) || [])[1];
  const lightInk = pick(KIT.slice(KIT.indexOf('.pp,.mp-it{--ink:'), KIT.indexOf('container-type:inline-size')));
  const darkInk = pick(seg);
  ok(lum(darkInk) > 200, `深色文字足够亮（${darkInk} 亮度 ${Math.round(lum(darkInk))}）`);
  ok(lum(lightInk) < 60, `浅色文字足够深（${lightInk} 亮度 ${Math.round(lum(lightInk))}）`);
  const bgDark = (seg.match(/--bg:(#[0-9a-f]{6})/) || [])[1];
  ok(lum(bgDark) < 40, `深色底足够暗（${bgDark} 亮度 ${Math.round(lum(bgDark))}）`);
  // 正文与次级文字要和底色拉开层次
  const muted = (seg.match(/--muted:(#[0-9a-f]{6})/) || [])[1];
  ok(lum(muted) - lum(bgDark) > 100, '次级文字与深底对比足够');
}

// ── 三、页面层深色 ──────────────────────────────────────────────
{
  ok(/@media screen and \(prefers-color-scheme:dark\)\{[\s\S]{0,400}--bg:#12110d/.test(HTML), '页面层有深色变量覆盖');
  ok(/\.tab\.on,\.seg button\.on,\.go\{color:#14130f\}/.test(HTML), '深色下强调色实心底上的文字反色');
}

// ── 四、导出 PDF：打印样式 ─────────────────────────────────────
{
  const printAt = HTML.indexOf('@media print{');
  ok(printAt > 0, '存在 @media print 块');
  const printBlock = HTML.slice(printAt, HTML.indexOf('`;', printAt));
  ok(/\.tabs,\.bar,\.tip,\.go,\.now,\.no-print,\.exp\{display:none!important\}/.test(printBlock), '打印时隐藏输入区/tab/导出按钮');
  ok(/\.pp,#out \.mp-it\{break-inside:avoid/.test(printBlock), '盘面与解读不被撕页');
  ok(/@page\{size:A4 portrait/.test(printBlock), '打印纸张默认 A4 纵向');
  ok(/print-color-adjust:exact/.test(printBlock), '打印保留四化色块颜色');
  // 按钮只在有结果时出现
  ok(/function exportBar\(\)/.test(UI), 'web-ui 提供导出条');
  ok(/class="exp no-print"/.test(UI), '导出条带 no-print，自己不打印');
  ok(/data-act="pdf"/.test(UI) && /data-act="print"/.test(UI), '导出条含「存为 PDF」与「打印」');
  ok(/onExportClick\(e\)/.test(UI), '点击导出按钮触发打印');
  ok(/window\.print\(\)/.test(UI), '走浏览器原生打印，不引第三方库');
}

// ── 五、窄屏 tab 排布：六个 tab 必须全部可见 ────────────────────
{
  ok(/\.tabs\{display:grid;grid-template-columns:repeat\(3,1fr\)/.test(HTML), '窄屏 tab 改 3 列网格');
  ok(/\.tab\{width:auto;min-width:0;padding:11px 6px;text-align:center\}/.test(HTML), '窄屏 tab 均分宽度');
  // 横滑方案会让最后一个 tab 卡在右缘，必须去掉
  const narrow = HTML.slice(HTML.indexOf('@media (max-width:640px)'), HTML.indexOf('@media print{'));
  eq(/overflow-x:auto/.test(narrow), false, '窄屏 tab 不再靠横向滚动');
  ok(/min-height:44px/.test(narrow), '窄屏 tab 触摸目标 ≥44px');
}

if (fails.length) {
  console.log(`FAIL ${fails.length} 项：`);
  for (const f of fails.slice(0, 15)) console.log('  -', f);
  process.exit(1);
}
console.log(`PASS 深色/导出/窄屏排布 ${pass} 项断言`);
