#!/usr/bin/env node
// 面板真机回归：把宿主侧栏里那套 UI（src/app.js）真的挂起来点一遍。
//
// 为什么单页 E2E 覆盖不到它：app.js 不是网页，是宿主里的客户端插件——要 React、要
// 槽位服务（slots）、要分块引擎、要 conversation inputActions。单页那份跑的是
// src/web-ui.js，两条渲染链只有 panel-kit 是共用的。上次「时辰未知」就是在共用层修的，
// 但面板自己的状态（勾选、历史、深链落地、首屏卡片）一直只有静态字符串测试。
//
// 做法：用真实 Chrome + 真实 React，配一个最小宿主——假 slots 注册表、假 ctx.effect、
// 打好的全量 client（assemble()），然后把 PanelIcon 画进侧栏、把主面板画进 #main，
// 再照用户的操作顺序点。不联网、不写仓库外文件。
//
// 用法：npm run e2e:panel   （没有 Chrome / Edge 时打印跳过并返回 0）
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { chromium } from 'playwright-core';
import { build } from 'esbuild';
import { assemble } from './build-client.mjs';

const root = path.resolve(import.meta.dirname, '..');

const CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);

const exe = CANDIDATES.find((p) => { try { return fs.existsSync(p); } catch (e) { return false; } });
if (!exe) {
  console.log('跳过：本机没有找到 Chrome / Edge。设 CHROME_PATH 指向浏览器后再跑。');
  process.exit(0);
}

let pass = 0;
const fails = [];
const ok = (c, name, extra = '') => {
  if (c) { pass += 1; console.log('PASS  ' + name + (extra ? '  -> ' + extra : '')); }
  else { fails.push(name + (extra ? ' -> ' + extra : '')); console.log('FAIL  ' + name + (extra ? '  -> ' + extra : '')); }
};

// ── 一、素材：React（打成 IIFE）+ 全量 client（含引擎）────────────
// 面板在宿主里拿的是宿主的 React；这里用同版本真 React，行为一致（hooks、事件委托、
// 错误边界都走真实现，不写迷你替身——替身测不出「我们和 React 的用法对不对」）。
const tmp = {
  react: path.join(root, '_panel-react.js'),
  client: path.join(root, '_panel-client.js'),
  html: path.join(root, '_panel-harness.html'),
};

const reactBundle = await build({
  stdin: {
    contents: `
      import * as React from 'react';
      import * as ReactDOM from 'react-dom';
      import * as ReactDOMClient from 'react-dom/client';
      window.React = React;
      window.ReactDOM = Object.assign({}, ReactDOM, { createRoot: ReactDOMClient.createRoot });
    `,
    resolveDir: root,
    loader: 'js',
  },
  bundle: true,
  format: 'iife',
  platform: 'browser',
  define: { 'process.env.NODE_ENV': '"development"' },
  write: false,
  logLevel: 'silent',
});
fs.writeFileSync(tmp.react, reactBundle.outputFiles[0].text, 'utf8');
fs.writeFileSync(tmp.client, assemble(), 'utf8');

const HARNESS_HTML = `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><title>面板宿主（测试用）</title>
<style>
  /* 宿主的设计令牌：面板只读这些变量，不自己定颜色。深色靠 prefers-color-scheme 换值，
     和真实宿主一样——所以「深色下选中块字看不见」这类问题在这里能复现。 */
  :root{
    --dsw-alias-bg-layer-1:#ffffff; --dsw-alias-bg-layer-2:#f6f7f9;
    --dsw-alias-border-l1:#e3e5ea; --dsw-alias-label-primary:#1b1d21;
    --dsw-alias-label-secondary:#5b6068; --dsw-alias-brand-primary:#2f5bea;
    --dsw-alias-state-error-primary:#c0392b; --dsw-alias-state-warning-primary:#a86a00;
  }
  @media (prefers-color-scheme: dark){
    :root{
      --dsw-alias-bg-layer-1:#17181c; --dsw-alias-bg-layer-2:#202329;
      --dsw-alias-border-l1:#33363d; --dsw-alias-label-primary:#eceef2;
      --dsw-alias-label-secondary:#a6abb5; --dsw-alias-brand-primary:#8fb0ff;
      --dsw-alias-state-error-primary:#ff8a7a; --dsw-alias-state-warning-primary:#e0b055;
    }
  }
  html,body{height:100%}
  body{margin:0;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);
    font:14px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif}
  #root{height:100%}
  .host{display:flex;height:100%}
  #sidebar{width:56px;flex:none;border-right:1px solid var(--dsw-alias-border-l1);
    display:flex;flex-direction:column;align-items:center;padding-top:10px;gap:6px;
    background:var(--dsw-alias-bg-layer-2)}
  #side-icon{width:36px;height:36px;border:none;border-radius:9px;background:transparent;cursor:pointer;
    display:flex;align-items:center;justify-content:center;color:var(--dsw-alias-label-primary)}
  #side-icon:hover{background:var(--dsw-alias-bg-layer-1)}
  #main{flex:1;min-width:0;overflow:auto;background:var(--dsw-alias-bg-layer-1)}
</style></head>
<body><div id="root"></div>
<script>
  // 宿主的分块协议：插件加载时把 factory 交给宿主，宿主再喂给它 require。
  window.__ModuleLoader__ = {
    mods: {},
    load(m) { this.mods[m.id] = m; window.__MP_MODULE__ = m; },
  };
</script>
<script src="./_panel-react.js"></script>
<script src="./_panel-client.js"></script>
</body></html>`;
fs.writeFileSync(tmp.html, HARNESS_HTML, 'utf8');

// ── 二、静态服务：file:// 下 localStorage 会抛 SecurityError，用本机 http 才真实
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };
const server = http.createServer((req, res) => {
  if (String(req.url || '').includes('favicon')) { res.writeHead(204); res.end(); return; }
  const rel = decodeURIComponent(String(req.url || '/').split('?')[0]).replace(/^\/+/, '') || '_panel-harness.html';
  const file = path.resolve(root, rel);
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404); res.end('not found'); return;
  }
  res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = 'http://127.0.0.1:' + server.address().port;

const browser = await chromium.launch({ executablePath: exe, headless: true });
const ctx = await browser.newContext({ viewport: { width: 1180, height: 900 }, colorScheme: 'light' });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });

await page.goto(base + '/_panel-harness.html', { waitUntil: 'load' });
await page.waitForTimeout(200);

// ── 三、装成宿主：注册槽位、调用 apply ──────────────────────────
const boot = await page.evaluate(() => {
  const mod = window.__MP_MODULE__;
  if (!mod || typeof mod.factory !== 'function') return { err: 'client 未通过 __ModuleLoader__ 注册' };
  const React = window.React;
  const require = (name) => (name === 'react' ? React : undefined);
  let plugin;
  try { plugin = mod.factory(require); } catch (e) { return { err: 'factory 抛错：' + e.message }; }
  if (!plugin || typeof plugin.apply !== 'function') return { err: 'factory 没返回 apply' };

  // 假槽位：真实宿主只接受已声明的槽位，这里对所有 key 都放行，
  // 但把「注册了什么、顺序如何」原样记下来——测的就是这层接线。
  const regs = [];
  window.__MP_REGS = regs;
  const slots = {
    register(opts, comp) {
      if (!opts || !opts.name) throw new Error('slot is not declared');
      regs.push({ name: opts.name, id: opts.id || '', order: opts.order, comp });
      return { dispose() {} };
    },
    inject(key, cb) { cb(); },
    spec() { return { kind: 'zone', scope: 'session' }; },
  };
  const ctxObj = {
    slots,
    effect(fn) { try { fn(); } catch (e) { console.error(e); } },
    get: (k) => (k === 'slots' ? slots : null),
  };
  try { plugin.apply(ctxObj); } catch (e) { return { err: 'apply 抛错：' + e.message }; }
  return {
    ok: true,
    inject: plugin.inject,
    names: regs.map((r) => r.name),
  };
});

ok(!boot.err, '插件能在宿主里完成注册', boot.err || (boot.names || []).join(' / '));
ok(Array.isArray(boot.inject) && boot.inject.includes('slots'), '插件声明依赖 slots', JSON.stringify(boot.inject));
ok((boot.names || []).includes('sidebar.panellist'), '侧栏入口已注册');
ok((boot.names || []).includes('main'), '主面板已注册');
ok((boot.names || []).includes('conversation.input.right'), '会话输入条桥已注册');

// ── 四、按宿主的做法把两个槽位画出来 ────────────────────────────
const mounted = await page.evaluate(() => {
  const React = window.React;
  const ReactDOM = window.ReactDOM;
  const h = React.createElement;
  const regs = window.__MP_REGS || [];
  const icon = regs.find((r) => r.name === 'sidebar.panellist');
  const main = regs.find((r) => r.name === 'main');
  if (!icon || !main) return { err: '槽位组件缺失' };

  function Host() {
    // 宿主侧栏没有「打开/关闭面板」的语义给插件：点图标就把面板挂到 main。
    const [open, setOpen] = React.useState(true);
    return h('div', { className: 'host' },
      h('aside', { id: 'sidebar' },
        h('button', {
          id: 'side-icon', type: 'button', 'aria-label': '命理排盘',
          onClick: () => setOpen((o) => !o),
        }, h(icon.comp, { size: 20, active: open }))),
      h('div', { id: 'main' }, open ? h(main.comp) : h('div', { id: 'panel-closed' }, '面板已收起')));
  }
  ReactDOM.createRoot(document.getElementById('root')).render(h(Host));
  return { ok: true };
});
ok(!mounted.err, '面板挂载成功', mounted.err || '');
await page.waitForTimeout(600);

const text = async (sel) => (await page.locator(sel).count()) ? (await page.locator(sel).first().innerText()).trim() : '';
const outLen = () => page.evaluate(() => (document.getElementById('main') || {}).innerHTML?.length || 0);

// 首屏（面板与单页同一套信息架构：三组卡片）
ok((await page.locator('#side-icon svg').count()) === 1, '侧栏图标画出来了');
ok((await page.locator('.mp-start').count()) === 1, '主面板出现首屏');
ok((await page.locator('.mp-tgroup').count()) === 3, '首屏三组卡片', String(await page.locator('.mp-tgroup').count()));
ok((await text('.mp-start')).includes('问一件事'), '首屏分组标题正确');
const bootResult = await outLen();
ok(bootResult > 4000, '面板打开即排默认盘（紫微）', `${bootResult} 字符`);
ok(!(await page.locator('.mp-err, .mp-wrap pre').count()), '没有渲染兜底/错误块');

// ── 五、八字：点卡片 → 排盘 → 出结果 ────────────────────────────
await page.locator('.mp-tool[data-tab="bazi"]').click();
await page.waitForTimeout(200);
ok((await page.locator('.mp-btn').filter({ hasText: '排盘' }).count()) >= 1, '切到八字后有「排盘」按钮');
await page.locator('button.mp-btn').filter({ hasText: '排盘' }).first().click();
await page.waitForSelector('.pp-bz', { timeout: 15000 }).catch(() => {});
ok((await page.locator('.pp-bz').count()) === 1, '八字盘面渲染出来了');
ok((await text('#main')).includes('先说结论'), '盘面上方先给一段人话（面板同样生效）');
ok((await page.locator('.mp-br').count()) === 1, '「先说结论」方框只渲染一次');
ok((await page.locator('.pp-bz').count()) === 1 && /年柱/.test(await text('.pp-bz')), '盘面含四柱表头', (await text('.pp-bz')).slice(0, 40));

const hist = await page.evaluate(() => {
  try { return JSON.parse(localStorage.getItem('dsh-metaphysics/history-v1') || '[]'); } catch (e) { return null; }
});
ok(Array.isArray(hist) && hist.length >= 1, '排过的盘进了本地历史', JSON.stringify(hist && hist.slice(0, 1)).slice(0, 80));
ok(await page.locator('.mp-recent-list .mp-rc').count() >= 1, '首屏「最近用过」出现该条目');

// ── 六、面板独有：时辰未知的勾选联动 ────────────────────────────
const huLabel = page.locator('label.mp-chk').filter({ hasText: '时辰未知' });
ok((await huLabel.count()) === 1, '八字面板出现「时辰未知」勾选（单页是另一套控件）');
await huLabel.locator('input').check();
await page.waitForTimeout(150);
const timeDisabled = await page.evaluate(() => {
  const t = document.querySelector('#main input[type="time"]');
  return t ? t.disabled : null;
});
ok(timeDisabled === true, '勾上后时刻框被禁用（不让人以为还要填）');
await page.locator('button.mp-btn').filter({ hasText: '排盘' }).first().click();
await page.waitForTimeout(1200);
const baziText = await text('#main');
const baziHtml = await page.evaluate(() => document.getElementById('main').innerHTML);
ok(baziText.includes('时柱暂缺'), '三柱盘写明「时柱暂缺」', baziText.slice(0, 160).replace(/\s+/g, ' '));
ok(!/12:00/.test(baziHtml), '结果里不出现 12:00 占位钟点');
const colCount = await page.evaluate(() => document.querySelectorAll('#main table.pp-bz tbody tr:first-child td[data-c]').length);
ok(colCount === 3, '盘面只画三列', String(colCount));
ok(!/\bnull\b|undefined|NaN/.test(baziText), '结果里没有 null / undefined / NaN');

// ── 七、问事体系：问题必填、复制提示按钮 ────────────────────────
await page.locator('.mp-tool[data-tab="liuyao"]').click();
await page.waitForTimeout(250);
ok((await page.locator('.mp-textarea').count()) === 1, '六爻面板出现「所问之事」');
await page.locator('button.mp-btn').filter({ hasText: '起卦' }).first().click();
await page.waitForTimeout(400);
const notice = await text('.mp-note, .mp-err');
ok(notice.includes('所问之事') || notice.includes('必填') || (await page.locator('.mp-textarea.invalid').count()) === 1,
  '空着问题起卦会被拦（不静默出错盘）', notice.slice(0, 40));
await page.locator('.mp-textarea').fill('下周三之前能不能拿到书面 offer');
await page.locator('button.mp-btn').filter({ hasText: '起卦' }).first().click();
await page.waitForTimeout(1500);
ok((await text('#main')).includes('世'), '六爻出结果（含世爻）');
ok((await page.locator('[data-mp-askcopy]').count()) === 1, '结果页有「复制问事提示」按钮');

// ── 七·五、连点 10 次：面板这一层也要压一下 ───────────────────
// 引擎侧的 200 次压测（test/stress.test.mjs）测的是排盘本身；这里测的是「点」这条链：
// 每次点击都会 setState + 重渲染 + 写历史，状态若累积，点到第 10 次会开始变慢或串结果。
{
  const errsBefore = errors.length;
  for (let i = 0; i < 10; i++) {
    await page.locator('button.mp-btn').filter({ hasText: '起卦' }).first().click();
    await page.waitForTimeout(140);
  }
  await page.waitForTimeout(800);
  const st = await page.evaluate(() => {
    let hist = [];
    try { hist = JSON.parse(localStorage.getItem('dsh-metaphysics/history-v1') || '[]'); } catch (e) { hist = []; }
    return { hist: hist.length, html: document.getElementById('main').innerHTML };
  });
  ok(/世/.test(st.html), '连点 10 次后结果仍然正常（含世爻）');
  ok(st.hist <= 20, '本地历史不超过 20 条（超出丢弃最旧）', `${st.hist} 条`);
  ok(errors.length === errsBefore, '连点过程没有新增 JS 报错', errors.slice(errsBefore, errsBefore + 2).join(' | '));
  ok(st.html.length < 400000, '连点后 DOM 没有无限膨胀', `${Math.round(st.html.length / 1024)}KB`);
}

// ── 八、深色主题：选中块的字要看得见（面板用真实宿主变量）────────
await page.emulateMedia({ colorScheme: 'dark' });
await page.waitForTimeout(400);
const contrast = await page.evaluate(() => {
  const parse = (c) => (String(c).match(/[\d.]+/g) || []).slice(0, 3).map(Number);
  const lum = (rgb) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(rgb[0]) + 0.7152 * f(rgb[1]) + 0.0722 * f(rgb[2]);
  };
  const ratio = (a, b) => (Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05);
  const el = document.querySelector('#main .mp-tool.on');
  if (!el) return { err: '没有选中的卡片' };
  const b = el.querySelector('b') || el;
  const cs = getComputedStyle(b);
  const bg = getComputedStyle(el).backgroundColor;
  const varOnBrand = getComputedStyle(document.documentElement).getPropertyValue('--mp-on-brand').trim();
  return { r: ratio(parse(cs.color), parse(bg)), color: cs.color, bg, varOnBrand };
});
ok(!contrast.err && contrast.r >= 4.5, '深色下选中卡片文字对比度 ≥4.5', contrast.err || `${contrast.r.toFixed(2)}:1（字 ${contrast.color} / 底 ${contrast.bg}）`);
ok(!!contrast.varOnBrand, '--mp-on-brand 由运行时按对比度写入', contrast.varOnBrand);

// ── 九、窄屏（宿主侧栏 520px）：不许横向溢出 ────────────────────
await page.setViewportSize({ width: 520, height: 820 });
await page.waitForTimeout(400);
const narrow = await page.evaluate(() => {
  const main = document.getElementById('main');
  let widest = 0; let who = '';
  main.querySelectorAll('*').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width > widest && r.width > main.clientWidth + 2) { widest = r.width; who = el.tagName + '.' + String(el.className || '').split(' ')[0]; }
  });
  return { overflow: main.scrollWidth - main.clientWidth, widest, who };
});
ok(narrow.overflow <= 2, '520px 面板无横向溢出', `溢出 ${narrow.overflow}px${narrow.who ? ' 来自 ' + narrow.who : ''}`);
const btnBox = await page.locator('button.mp-btn').filter({ hasText: '起卦' }).first().boundingBox().catch(() => null);
ok(btnBox && btnBox.width > 80 && btnBox.height >= 40, '窄屏主按钮仍可点', btnBox ? `${Math.round(btnBox.width)}×${Math.round(btnBox.height)}` : '取不到');

// ── 十、深链落地：带 #mp= 打开要自动还原那张盘 ──────────────────
{
  const p2 = await ctx.newPage();
  const err2 = [];
  p2.on('pageerror', (e) => err2.push(e.message));
  p2.on('console', (m) => { if (m.type() === 'error') err2.push(m.text()); });
  await p2.goto(base + '/_panel-harness.html', { waitUntil: 'load' });
  await p2.evaluate(() => {
    const mod = window.__MP_MODULE__;
    const React = window.React;
    const plugin = mod.factory((n) => (n === 'react' ? React : undefined));
    const regs = [];
    const slots = {
      register(o, c) { regs.push({ name: o.name, comp: c }); return { dispose() {} }; },
      inject(_k, cb) { cb(); },
      spec() { return { kind: 'zone', scope: 'session' }; },
    };
    plugin.apply({ slots, effect: (fn) => fn() });
    window.__MP_REGS = regs;
  });
  // 先用同一份宿主拿到一个真实句柄，再拿它当深链打开
  const link = await p2.evaluate(async () => {
    const Engine = window.Engine;
    const r = Engine.compute({ system: 'liuyao', datetime: '2026-11-01T22:10', lines: [9, 7, 8, 8, 7, 6], question: '今年考运', withInterpret: false });
    window.__MP_HANDLE = r.handle;
    return r.handle || '';
  });
  ok(!!link, '句柄取出成功', String(link).slice(0, 24));

  const p3 = await ctx.newPage();
  const err3 = [];
  p3.on('pageerror', (e) => err3.push(e.message));
  p3.on('console', (m) => { if (m.type() === 'error') err3.push(m.text()); });
  await p3.goto(base + '/_panel-harness.html#mp=' + encodeURIComponent(link) + '&q=' + encodeURIComponent('今年考运'), { waitUntil: 'load' });
  await p3.evaluate(() => {
    const mod = window.__MP_MODULE__;
    const React = window.React;
    const ReactDOM = window.ReactDOM;
    const h = React.createElement;
    const plugin = mod.factory((n) => (n === 'react' ? React : undefined));
    const regs = [];
    const slots = {
      register(o, c) { regs.push({ name: o.name, comp: c }); return { dispose() {} }; },
      inject(_k, cb) { cb(); },
      spec() { return { kind: 'zone', scope: 'session' }; },
    };
    plugin.apply({ slots, effect: (fn) => fn() });
    const main = regs.find((r) => r.name === 'main');
    ReactDOM.createRoot(document.getElementById('root')).render(h('div', { id: 'main', style: { height: '100%' } }, h(main.comp)));
  });
  await p3.waitForTimeout(2500);
  const deep = await p3.evaluate(() => ({
    html: document.getElementById('main').innerHTML,
    tabOn: (document.querySelector('#main .mp-tool.on') || {}).getAttribute
      ? document.querySelector('#main .mp-tool.on').getAttribute('data-tab') : '',
    note: (document.querySelector('#main .mp-note, #main .mp-auto') || {}).innerText || '',
    badge: (document.querySelector('#main .mp-badge') || {}).innerText || '',
  }));
  ok(deep.html.includes('世'), '深链还原的是同一张盘（六爻含世爻）');
  ok(deep.tabOn === 'liuyao', '深链把面板切到了对应体系', deep.tabOn);
  ok(deep.html.includes('今年考运'), '深链带的问题落进了结果');
  ok(err3.length === 0, '深链落地无 JS 报错', err3.slice(0, 2).join(' | '));
  await p2.close(); await p3.close();
}

// ── 十一、全程无 JS 报错 ───────────────────────────────────────
ok(errors.length === 0, '面板全程无 JS 报错', errors.slice(0, 3).join(' | '));

await page.screenshot({ path: path.join(root, '_e2e-panel.png') });
await browser.close();
await new Promise((r) => server.close(r));
for (const f of Object.values(tmp)) { try { fs.unlinkSync(f); } catch (e) { /* 已删 */ } }

console.log(`\n${pass} 通过，${fails.length} 失败`);
if (fails.length) { fails.forEach((f) => console.log('  - ' + f)); process.exit(1); }
