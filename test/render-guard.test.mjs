// 渲染兜底（0.85.1）：
//   ① 切体系那条链不许再裸写 `el('x').style` —— 一处落空就 TypeError，
//      后面的 el() 与 refreshFlow 全被截断，界面上就是「点完这块白掉了、按钮也点不动」；
//   ② 真抛出去时必须留字：全局 error / unhandledrejection 挂一行可复制的提示，而不是一片白；
//   ③ 页面显式声明 `color-scheme` —— 不声明时强制深色/夜间模式会把整页颜色反过来，
//      见过的表现正是「深色底上的卡片翻成白块、字也没了」。
import fs from 'node:fs';
import path from 'node:path';
import { ok, eq } from './_harness.mjs';

const root = path.resolve(import.meta.dirname, '..');
const UI = fs.readFileSync(path.join(root, 'src', 'web-ui.js'), 'utf8');
const HTML = fs.readFileSync(path.join(root, 'tools', 'build-html.mjs'), 'utf8');

// ── ① 空安全的显隐 ──
{
  ok('有 show(id, on) 这个空安全入口', /function show\(id, on\)/.test(UI));
  ok('show 里先判空再写样式', /function show\(id, on\) \{[\s\S]{0,200}if \(n\) n\.style\.display/.test(UI), '取不到元素时不该抛');
  // 裸写一处就足以让 setTab 半路中断：全文件不许再出现 `el('某id').style.xxx`
  const bare = UI.match(/el\('[\w-]+'\)\.style\./g) || [];
  eq('不再有裸写 el(…).style', bare.length, 0, bare.slice(0, 3).join(' / '));
  // 显隐一律走 show：数量要够（原来 setTab + 快捷区一共二十来处）
  const uses = UI.match(/show\('[\w-]+', /g) || [];
  ok(`显隐改走 show（${uses.length} 处）`, uses.length >= 18, String(uses.length));
}

// ── ② show 真的空安全（拿真源码在新 Function 里跑）──
{
  const start = UI.indexOf('function show(id, on) {');
  const end = UI.indexOf('\n  }', start) + 4;
  const showSrc = UI.slice(start, end);
  ok('能取出 show 的源码片段', showSrc.includes('if (n)'), showSrc.slice(0, 60));
  const make = (nodes) => new Function('document', 'const el = (id) => document.getElementById(id);\n' + showSrc + '\nreturn show;')({
    getElementById: (id) => nodes[id] || null,
  });
  const nodes = { a: { style: { display: 'none' } } };
  const show = make(nodes);
  let threw = '';
  try { show('nope', true); } catch (e) { threw = String(e && e.message); }
  ok('元素不存在时 show 不抛', threw === '', threw);
  ok('元素不存在时返回 null', show('nope', true) === null);
  ok('on=true → display 空（露出来）', show('a', true) && nodes.a.style.display === '');
  ok('on=false → display none（收起）', show('a', false) && nodes.a.style.display === 'none');
  ok('假值（undefined）按收起处理', show('a', undefined) && nodes.a.style.display === 'none');
}

// ── ③ 全局兜底条 ──
{
  ok('有 installCrashLine', /function installCrashLine\(\)/.test(UI));
  ok('监听 error', /addEventListener\('error', onErr\)/.test(UI));
  ok('监听 unhandledrejection', /addEventListener\('unhandledrejection', onErr\)/.test(UI));
  ok('只报第一条，避免连环异常刷屏', /crashShown = true/.test(UI) && /if \(crashShown\) return;/.test(UI));
  // 只看兜底这一段：文件别处也有叫 box 的变量，整文件扫会把别人的 innerHTML 算进来
  const guardChunk = UI.slice(UI.indexOf('function installCrashLine()'), UI.indexOf('}\n', UI.indexOf('window.addEventListener(\'unhandledrejection\', onErr)')) + 2);
  ok('提示语用 textContent 写（错误里可能带用户输入原文）', /box\.textContent = /.test(guardChunk) && !/box\.innerHTML/.test(guardChunk), guardChunk.slice(0, 60));
  ok('提示带 role="alert"', /box\.setAttribute\('role', 'alert'\)/.test(UI));
  ok('提示里有「复制这句」按钮', /btn\.textContent = '复制这句'/.test(UI));
  ok('挂载在 DOMContentLoaded 的最前面（先挂兜底再做别的）', /DOMContentLoaded', \(\) => \{[\s\S]{0,120}installCrashLine\(\);/.test(UI));

  // 真跑一遍：两次异常只出第一条，且抛异常本身不再抛
  const start = UI.indexOf('let crashShown = false;');
  const end = UI.indexOf('\n  }\n', UI.indexOf('function installCrashLine()')) + 4;
  const guardSrc = UI.slice(start, end);
  const made = [];
  const win = { handlers: {}, addEventListener: (k, f) => { win.handlers[k] = f; } };
  const doc = {
    body: { insertBefore() {} },
    getElementById: () => null,
    createElement: () => {
      const node = {
        className: '', textContent: '', children: [],
        setAttribute() {}, addEventListener() {}, appendChild(c) { node.children.push(c); },
      };
      made.push(node);
      return node;
    },
  };
  const fakeNav = { clipboard: { writeText: () => {} } };
  const run = new Function('window', 'document', 'navigator', 'console', guardSrc + '\nreturn installCrashLine;');
  const install = run(win, doc, fakeNav, { error() {} });
  install();
  win.handlers.error({ message: 'boom' });
  win.handlers.unhandledrejection({ reason: { message: 'second' } });
  eq('第一次异常生成一个提示节点', made.filter((n) => n.className === 'mp-crash').length, 1);
  const box = made.filter((n) => n.className === 'mp-crash')[0];
  ok('提示里带着错误原文', box && String(box.textContent).includes('boom'), box && box.textContent);
  ok('提示上挂了复制按钮', box && box.children.length === 1);
}

// ── ④ 页面声明 color-scheme（防强制深色/夜间模式反色）──
{
  ok('页面模板里有 color-scheme 声明', /<meta name="color-scheme" content="light dark">/.test(HTML));
  ok('声明在 <head> 里、靠前（和 viewport 挨着）', /<meta name="viewport"[\s\S]{0,400}<meta name="color-scheme"/.test(HTML));
  const page = path.join(root, '命理排盘.html');
  if (fs.existsSync(page)) {
    const built = fs.readFileSync(page, 'utf8');
    ok('产物页面里也带上了这条声明', built.includes('<meta name="color-scheme" content="light dark">'));
  }
}

// ── ⑥ 选中态不许被 :hover 的白底盖掉（触屏点完 hover 不会散）──
{
  // 规则拆成「选择器 → 声明块」，只看最外层的简单规则（@media 里的也算，键名带前缀不影响判断）
  const rules = [...HTML.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({ sel: m[1].trim(), body: m[2] }));
  const bases = ['.tool', '.tab', '.mb-o', '.seg button', '.mp-chip', '.rc-item'];
  for (const base of bases) {
    const hovers = rules.filter((r) => r.sel.includes(base + ':hover') && /background/.test(r.body));
    const ons = rules.filter((r) => new RegExp(base.replace('.', '\\') + '.on').test(r.sel) || r.sel.split(',').some((s) => s.trim() === base + '.on'));
    if (!hovers.length || !ons.length) continue;
    // 选中态要么不再被 hover 命中（:not(.on)），要么自己把背景重新声明一遍
    const hoverScoped = hovers.every((r) => r.sel.includes(':not(.on)'));
    const onRedraws = ons.some((r) => /background/.test(r.body));
    ok(`${base} 选中态不会被 hover 白底盖掉（${hoverScoped ? 'hover 已排除 .on' : 'hover 未排除'}）`, hoverScoped || onRedraws,
      'hover 设了白底、.on 没重画背景 → 触屏点完就是一块空白卡');
    if (onRedraws) ok(`${base}.on 自己带背景`, true);
  }
  // 这两处是实测过的现场，钉死写法
  ok('.tool:hover 只作用于未选中', /\.tool:not\(\.on\):hover/.test(HTML) && !/\n\.tool:hover\{/.test(HTML));
  ok('.tab:hover 只作用于未选中', /\.tab:not\(\.on\):hover/.test(HTML));
  ok('.tool.on 显式重画深色底', /\.tool\.on\{[\s\S]{0,200}background:linear-gradient\(145deg,var\(--accent-bg\)/.test(HTML));
  ok('.tab.on 显式重画深色底', /\.tab\.on\{[\s\S]{0,200}background:linear-gradient\(145deg,var\(--accent-bg\)/.test(HTML));
}

// ── ⑦ 兜底条样式只用令牌 ──
{
  const rule = (HTML.match(/\.mp-crash\{[^}]*\}/) || [''])[0];
  ok('有 .mp-crash 的样式', rule.length > 20, rule.slice(0, 40));
  ok('不写死色值', !/#[0-9a-fA-F]{3,8}/.test(rule) && !/rgb\(/.test(rule), rule.slice(0, 80));
  ok('边框用 --bad 令牌', /var\(--bad\)/.test(rule));
  ok('底/字用 --panel / --ink', /var\(--panel\)/.test(rule) && /var\(--ink\)/.test(rule));
}
