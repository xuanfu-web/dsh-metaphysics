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
const ctx = await browser.newContext({ viewport: { width: 1180, height: 900 }, colorScheme: 'light', permissions: ['clipboard-read', 'clipboard-write'] });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });

// 分组卡默认只露 4 项：第 5 项往后要先点「还有 N 个」展开，否则点击超时
async function openTool(k) {
  const sel = '.mp-tool[data-tab="' + k + '"]';
  const target = page.locator(sel);
  if (await target.count()) {
    for (let i = 0; i < await target.count(); i++) {
      const el = target.nth(i);
      if (await el.isVisible()) { await el.click(); return; }
    }
  }
  const opened = await page.evaluate((key) => {
    const el = document.querySelector('.mp-tool[data-tab="' + key + '"]');
    if (!el) return false;
    const group = el.closest('.mp-tgroup');
    const more = group && group.querySelector('.mp-tmore');
    if (!more) return false;
    more.click();
    return true;
  }, k);
  if (opened) await page.waitForTimeout(300);
  await page.locator(sel).first().click();
}

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

// 首屏（面板与单页同一套信息架构：三组卡片，每组先露 4 个）
ok((await page.locator('#side-icon svg').count()) === 1, '侧栏图标画出来了');
ok((await page.locator('.mp-start').count()) === 1, '主面板出现首屏');
ok((await page.locator('.mp-tgroup').count()) === 3, '首屏三组卡片', String(await page.locator('.mp-tgroup').count()));
ok((await text('.mp-start')).includes('问一件事'), '首屏分组标题正确');
const bootResult = await outLen();
ok(bootResult > 4000, '面板打开即排默认盘（紫微）', `${bootResult} 字符`);
ok(!(await page.locator('.mp-err, .mp-wrap pre').count()), '没有渲染兜底/错误块');

// ── 五、八字：点卡片 → 排盘 → 出结果 ────────────────────────────
await openTool('bazi');
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

// ── 五·五、日期框逐字输入：中间态不能被父组件回写截断 ──────────────
// 掩码把「1990-05-1」解析成合法日期后，若边敲边 onChange，父组件回写 value 会把
// 刚敲的 2 冲掉，最终静默变成 1 日。page.fill 一次写整串测不出来，这里用真键盘。
{
  const dateInput = page.locator('#main label.mp-field:has(span:text-is("出生日期（公历）")) input');
  const timeInput = page.locator('#main label.mp-field:has(span:text-is("出生时刻")) input');
  await timeInput.fill('14:30');
  await dateInput.click();
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Delete');
  await page.keyboard.type('1990051', { delay: 40 });
  const mid = await dateInput.inputValue();
  ok(mid === '1990-05-1', '面板 · 打到一半的「1990-05-1」原样保留', mid);
  await page.keyboard.type('2', { delay: 40 });
  const full = await dateInput.inputValue();
  ok(full === '1990-05-12', '面板 · 接着敲 2 补成 12 日（不是 1 日）', full);

  // 不先失焦、直接点排盘：失焦提交要先于点击生效，排的必须是 12 日那张
  await page.locator('button.mp-btn').filter({ hasText: '排盘' }).first().click();
  await page.waitForSelector('#main .pp-bz', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(500);
  const typedHist = await page.evaluate(() => {
    try { return JSON.parse(localStorage.getItem('dsh-metaphysics/history-v1') || '[]')[0] || null; } catch (e) { return null; }
  });
  ok(typedHist && typedHist.date === '1990-05-12', '面板 · 直接点排盘用的是刚敲的 12 日', JSON.stringify(typedHist && typedHist.date));
}

// ── 五·六、看示例：历史条目记的是示例盘自己的参数 ──────────────────
// 切体系 / 看示例都是「同一个 handler 里先 setState 再 run」，历史若读渲染闭包里的
// 旧 state，就会把上一张盘的性别、出生地记到示例盘名下，点回来排成另一个人。
{
  // 先把表单改成明显的另一组值，确保示例盘的参数与它不同
  const dateInput = page.locator('#main label.mp-field:has(span:text-is("出生日期（公历）")) input');
  const addrInput = page.locator('#main label.mp-field:has(span.mp-lbl:text-matches("出生地")) input');
  const genderSel = page.locator('#main label.mp-field:has(span:text-is("性别")) select');
  await dateInput.fill('1977-02-03');
  await genderSel.selectOption('female');
  await addrInput.fill('广东广州');
  await page.locator('button.mp-btn').filter({ hasText: '看示例' }).first().click();
  await page.waitForSelector('#main .pp-bz', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(700);
  const sampleHist = await page.evaluate(() => {
    try { return JSON.parse(localStorage.getItem('dsh-metaphysics/history-v1') || '[]')[0] || null; } catch (e) { return null; }
  });
  ok(sampleHist && sampleHist.date === '1990-05-12' && sampleHist.gender === 'male'
    && sampleHist.address === '河北石家庄', '面板 · 示例盘的历史条目是示例盘自己的参数',
  JSON.stringify(sampleHist && { d: sampleHist.date, g: sampleHist.gender, a: sampleHist.address }));
}

// ── 五·七、合盘重放：对方生日是这张盘的输入 ──────────────────────
// 历史只记主方生日时，改过对方资料再点旧条目，会拿表单里此刻的对方重排——
// 排出来的已不是当初看的那张盘，而且两条不同对方的盘还会被当成重复条目顶掉。
{
  await openTool('hepan');
  await page.waitForTimeout(700);
  const pDateInput = page.locator('#main label.mp-field:has(span:text-is("对方出生日期")) input');
  const pTimeInput = page.locator('#main label.mp-field:has(span:text-is("对方出生时刻")) input');
  const hpRun = async () => {
    // 合盘的主按钮写的是「合盘」，不是「排盘」
    await page.locator('button.mp-btn').filter({ hasText: /排盘|合盘/ }).first().click();
    await page.waitForTimeout(1300);
    return page.evaluate(() => {
      try { return JSON.parse(localStorage.getItem('dsh-metaphysics/history-v1') || '[]')[0] || null; } catch (e) { return null; }
    });
  };
  await pDateInput.fill('1993-03-08');
  await pTimeInput.fill('09:15');
  const first = await hpRun();
  ok(first && first.kind === 'hepan' && first.partnerDate === '1993-03-08' && first.partnerTime === '09:15',
    '面板 · 合盘历史记住对方生日与时刻', JSON.stringify(first && { d: first.partnerDate, t: first.partnerTime }));
  // 换成另一个对方再排：两条盘输入不同，不应被去重合并
  await pDateInput.fill('1988-11-20');
  await pTimeInput.fill('20:30');
  const second = await hpRun();
  ok(second && second.partnerDate === '1988-11-20', '面板 · 换对方后记下新的那张', JSON.stringify(second && second.partnerDate));
  const histNow = await page.evaluate(() => {
    try { return JSON.parse(localStorage.getItem('dsh-metaphysics/history-v1') || '[]'); } catch (e) { return []; }
  });
  const hpEntries = histNow.filter((x) => x && x.kind === 'hepan');
  ok(hpEntries.some((x) => x.partnerDate === '1993-03-08') && hpEntries.some((x) => x.partnerDate === '1988-11-20'),
    '面板 · 不同对方的合盘各占一条历史（未互相顶掉）', `${hpEntries.length} 条合盘`);
  // 点回第一张：表单里的对方资料必须跟着还原，重排的才是当初那张盘
  const backIdx = histNow.findIndex((x) => x && x.kind === 'hepan' && x.partnerDate === '1993-03-08');
  await page.locator('.mp-hist-item').nth(backIdx).click();
  await page.waitForTimeout(1300);
  const back = {
    date: await pDateInput.inputValue().catch(() => ''),
    time: await pTimeInput.inputValue().catch(() => ''),
  };
  ok(back.date === '1993-03-08' && back.time === '09:15', '面板 · 点历史重放会还原对方生日与时刻', JSON.stringify(back));
  // 回到八字 tab，后面的用例按八字面板继续
  await openTool('bazi');
  await page.waitForTimeout(600);
}

// ── 五·八、真太阳时 / 晚子时：开关也是这张盘的输入 ─────────────────
// 历史若不记这两个开关，重放时就跟着表单此刻的勾选走，同一张盘换个排法。
{
  const tsBox = page.locator('#main .mp-checks label').filter({ hasText: '真太阳时' }).locator('input');
  const lateBox = page.locator('#main .mp-checks label').filter({ hasText: '晚子时换日' }).locator('input');
  ok((await tsBox.count()) === 1 && (await lateBox.count()) === 1, '面板 · 有真太阳时与晚子时开关');
  const dateInput = page.locator('#main label.mp-field:has(span:text-is("出生日期（公历）")) input');
  const timeInput = page.locator('#main label.mp-field:has(span:text-is("出生时刻")) input');
  await dateInput.fill('1991-08-08');
  // 选在时辰边界上：关掉真太阳时是辰时，开着（河北经度偏西约 22 分钟）退回卯时
  await timeInput.fill('08:10');
  await tsBox.uncheck();
  await lateBox.uncheck();
  await page.locator('button.mp-btn').filter({ hasText: '排盘' }).first().click();
  await page.waitForTimeout(1300);
  const offEntry = await page.evaluate(() => {
    try { return JSON.parse(localStorage.getItem('dsh-metaphysics/history-v1') || '[]')[0] || null; } catch (e) { return null; }
  });
  ok(offEntry && offEntry.trueSolar === false && offEntry.lateZi === false,
    '面板 · 历史条目记下真太阳时与晚子时', JSON.stringify(offEntry && { ts: offEntry.trueSolar, lz: offEntry.lateZi }));
  const chartOff = await page.evaluate(() => {
    const t = document.querySelector('#main .pp-bz');
    return t ? t.innerText.replace(/\s+/g, ' ').trim() : '';
  });
  // 表单拨回默认（两个都开），再点历史：重排必须按条目当时关着的算
  await tsBox.check();
  await lateBox.check();
  await page.locator('.mp-hist-item').first().click();
  await page.waitForTimeout(1300);
  ok(!(await tsBox.isChecked()) && !(await lateBox.isChecked()), '面板 · 点历史重放会还原两个开关');
  const chartBack = await page.evaluate(() => {
    const t = document.querySelector('#main .pp-bz');
    return t ? t.innerText.replace(/\s+/g, ' ').trim() : '';
  });
  ok(chartOff && chartBack === chartOff, '面板 · 重放回来的是同一张盘', chartBack.slice(0, 32));
  await tsBox.check();
  await lateBox.check();
}

// ── 五·九、人生K线：出生地同样进真太阳时 ──────────────────────────
// K 线页是出生盘，表单给了出生地与真太阳时开关；只对八字传地址会让同一份输入
// 在两张表里算出不同的时柱。
{
  await openTool('trend');
  await page.waitForTimeout(700);
  const dateInput = page.locator('#main label.mp-field:has(span:text-is("出生日期（公历）")) input');
  const timeInput = page.locator('#main label.mp-field:has(span:text-is("出生时刻")) input');
  const addrInput = page.locator('#main label.mp-field:has(span.mp-lbl:text-matches("出生地")) input');
  await dateInput.fill('1991-08-08');
  await timeInput.fill('08:10');
  await addrInput.fill('');
  // 人生K线的主按钮写的是「起卦」
  await page.locator('#main .mp-actions button.mp-btn').last().click();
  await page.waitForTimeout(1600);
  const klNo = await text('.mp-kline');
  await addrInput.fill('河北石家庄');
  await page.locator('#main .mp-actions button.mp-btn').last().click();
  await page.waitForTimeout(1600);
  const klYes = await text('.mp-kline');
  ok(klNo.length > 100 && klYes !== klNo, '面板 · 人生K线也把出生地换算成真太阳时', klYes.slice(0, 40));
  await addrInput.fill('');
  await openTool('bazi');
  await page.waitForTimeout(500);
}

// ── 五·十、择日：所办事项也是这张盘的输入，历史按事项分开记 ──────────
// 只看日期会把「开业」和「嫁娶」两种择日当成同一条历史：点旧的回来，
// 下拉还停在后一次的事项上，排出来的已是另一件事。
{
  await openTool('zeri');
  await page.waitForTimeout(600);
  const dateInput = page.locator('#main label.mp-field:has(span:text-is("日期（公历）")) input');
  const taskSel = page.locator('#main label.mp-field:has(span:text-is("所办事项")) select');
  const candInput = page.locator('#main label.mp-field:has(span:has-text("候选日")) input');
  // 填候选日才走并排表（区间模式是文字版）：候选日本身也是这张盘的输入
  const zeriRun = async () => {
    await page.locator('#main .mp-actions button.mp-btn').last().click();
    await page.waitForTimeout(1300);
    return page.evaluate(() => {
      const t = document.querySelector('#main .mp-zr');
      return t ? t.innerText.replace(/\s+/g, ' ').trim() : '';
    });
  };
  await dateInput.fill('2026-12-01');
  await candInput.fill('2026-12-01, 2026-12-08, 2026-12-15');
  await taskSel.selectOption('开业');
  const kaiye = await zeriRun();
  ok(kaiye.length > 100 && kaiye.includes('开业'), '面板 · 择日按所办事项出结果', kaiye.slice(0, 40));
  const firstZeri = await page.evaluate(() => {
    try { return JSON.parse(localStorage.getItem('dsh-metaphysics/history-v1') || '[]')[0] || null; } catch (e) { return null; }
  });
  ok(firstZeri && firstZeri.kind === 'zeri' && firstZeri.task === '开业',
    '面板 · 择日历史记住所办事项', JSON.stringify(firstZeri && { k: firstZeri.kind, t: firstZeri.task }));
  await taskSel.selectOption('嫁娶');
  const jiaqu = await zeriRun();
  ok(jiaqu !== kaiye, '面板 · 换事项后结果不同', jiaqu.slice(0, 40));
  const zeriHist = await page.evaluate(() => {
    try { return JSON.parse(localStorage.getItem('dsh-metaphysics/history-v1') || '[]'); } catch (e) { return []; }
  });
  const zeriEntries = zeriHist.filter((x) => x && x.kind === 'zeri');
  ok(zeriEntries.some((x) => x.task === '开业') && zeriEntries.some((x) => x.task === '嫁娶'),
    '面板 · 不同事项各占一条择日历史（未互相顶掉）', `${zeriEntries.length} 条择日`);
  // 点回「开业」那条：下拉与结果都要回到当初那张
  const backIdx = zeriHist.findIndex((x) => x && x.kind === 'zeri' && x.task === '开业');
  await page.locator('.mp-hist-item').nth(backIdx).click();
  await page.waitForTimeout(1300);
  const taskBack = await taskSel.inputValue().catch(() => '');
  const zeriBack = await page.evaluate(() => {
    const t = document.querySelector('#main .mp-zr');
    return t ? t.innerText.replace(/\s+/g, ' ').trim() : '';
  });
  ok(taskBack === '开业', '面板 · 点历史重放还原所办事项', taskBack);
  ok(zeriBack === kaiye, '面板 · 重放回来的是同一张择日盘', zeriBack.slice(0, 40));
  // 回到八字 tab，后面的用例按八字面板继续
  await openTool('bazi');
  await page.waitForTimeout(500);
}

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
await openTool('liuyao');
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

// ── 十一、我的命盘：存一张卡，下次一点就出盘 ────────────────────
// 这块是「用户不用每次重报出生信息」的主路径，全程走真实点击：
// 填表 → 存档 → 改日期排别的盘 → 点档案卡 → 出生信息回填 + 出的是同一张盘。
{
  await page.setViewportSize({ width: 900, height: 900 });
  await page.emulateMedia({ colorScheme: 'light' });
  await page.waitForTimeout(300);

  const bz = page.locator('#main .pp-bz').first();
  const chartText = async () => ((await bz.count()) ? (await bz.innerText()).replace(/\s+/g, ' ').trim() : '');
  const errsBefore = errors.length;

  // 档案只描述「一个人」，占事体系不给存入条
  await openTool('liuyao');
  await page.waitForTimeout(200);
  ok((await page.locator('#main .mp-prof').count()) === 1, '六爻页也显示「我的命盘」区');
  ok((await page.locator('#main .mp-prof-name').count()) === 0, '占事体系不给「存为我的命盘」输入条');

  await openTool('bazi');
  await page.waitForTimeout(250);
  ok((await page.locator('#main .mp-prof-empty').count()) === 1, '没有档案时给一句引导而不是空框');
  ok((await page.locator('#main .mp-prof-name').count()) === 1, '八字页出现称呼输入框');

  const dateEl = '#main label.mp-field:has(span:text-is("出生日期（公历）")) input';
  const timeEl = '#main label.mp-field:has(span:text-is("出生时刻")) input';
  const addrEl = '#main label.mp-field:has(span.mp-lbl:text-matches("出生地")) input';
  const genderEl = '#main label.mp-field:has(span:text-is("性别")) select';
  // 上一节勾过「时辰未知」，时刻框是禁用的；档案要存真实钟点，先取消
  const huAgain = page.locator('#main label.mp-chk').filter({ hasText: '时辰未知' });
  if ((await huAgain.count()) && (await huAgain.locator('input').isChecked())) {
    await huAgain.locator('input').uncheck();
    await page.waitForTimeout(200);
  }
  await page.fill(dateEl, '1988-03-05');
  await page.fill(timeEl, '08:30');
  await page.selectOption(genderEl, 'male');
  await page.fill(addrEl, '河北石家庄');
  await page.locator('button.mp-btn').filter({ hasText: '排盘' }).first().click();
  await page.waitForSelector('#main .pp-bz', { timeout: 15000 });
  await page.waitForTimeout(600);
  const saved = await chartText();
  ok(/年柱/.test(saved), '存盘前先排出一张八字盘', saved.slice(0, 36));

  await page.fill('#main .mp-prof-name', '阿测');
  await page.locator('#main button[data-mp-prof="put"]').click();
  await page.waitForTimeout(300);
  ok((await page.locator('#main .mp-prof-card').count()) === 1, '点「存为我的命盘」多出一张档案卡');
  ok((await text('#main .mp-prof-nm')).includes('阿测'), '卡面写的是称呼', await text('#main .mp-prof-nm'));
  const storedRaw = await page.evaluate(() => localStorage.getItem('dsh-metaphysics/profiles-v1'));
  const stored = (() => { try { return JSON.parse(storedRaw || '[]'); } catch (e) { return []; } })();
  ok(Array.isArray(stored) && stored.length === 1, '档案落到本机 localStorage', storedRaw ? storedRaw.slice(0, 60) : '空');
  ok(stored[0] && stored[0].date === '1988-03-05' && stored[0].time === '08:30', '存的是输入（生日/时刻），不是结果', JSON.stringify(stored[0] && { d: stored[0].date, t: stored[0].time }));
  ok(stored[0] && stored[0].kind === 'bazi' && stored[0].gender === 'male', '档案记住体系与性别');
  ok((await text('#main .mp-note')).includes('已存入我的命盘'), '存入后有回执', (await text('#main .mp-note')).slice(0, 40));
  ok((await page.locator('#main .mp-prof-name').inputValue()) === '', '存完清空称呼框，下次直接写新名字');

  // 称呼框是裸 DOM：翻一下置顶会让档案区整块重绘，已经敲进去的字不能被重绘抹掉
  await page.fill('#main .mp-prof-name', '临时称呼');
  await page.locator('#main [data-mp-prof="pin"]').dispatchEvent('click');
  await page.waitForTimeout(250);
  ok((await page.locator('#main .mp-prof-name').inputValue()) === '临时称呼', '档案区重绘后刚敲的称呼还在', await page.locator('#main .mp-prof-name').inputValue());
  ok((await page.locator('#main .mp-prof-card.pinned').count()) === 1, '重绘来自置顶（卡片状态确实变了）');
  await page.locator('#main [data-mp-prof="pin"]').dispatchEvent('click');
  await page.waitForTimeout(250);
  await page.fill('#main .mp-prof-name', '');

  // 窄屏不许因为多了一张卡就横向溢出（卡片网格 + 档案条都算进去）
  await page.setViewportSize({ width: 480, height: 820 });
  await page.waitForTimeout(350);
  const profNarrow = await page.evaluate(() => {
    const main = document.getElementById('main');
    return main.scrollWidth - main.clientWidth;
  });
  ok(profNarrow <= 2, '480px 有档案卡仍无横向溢出', `溢出 ${profNarrow}px`);
  await page.setViewportSize({ width: 900, height: 900 });
  await page.waitForTimeout(300);

  // 深色下档案条按钮：配色变量挂在 .mp-prof 上，档案条一旦被拼到 section 外面就拿不到，
  // 结果是「底透明 + 字继承页面色」——单页那边真就这么糊过一次，这里钉住。
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.waitForTimeout(250);
  const barContrast = await page.evaluate(() => {
    const nums = (c) => (String(c).match(/[\d.]+/g) || []).map(Number);
    const lum = (rgb) => {
      const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
      return 0.2126 * f(rgb[0]) + 0.7152 * f(rgb[1]) + 0.0722 * f(rgb[2]);
    };
    const el = document.querySelector('#main .mp-prof-bar button');
    if (!el) return { err: '没有档案条按钮' };
    const cs = getComputedStyle(el);
    const bg = nums(cs.backgroundColor);
    if (bg.length < 3 || (bg.length > 3 && bg[3] < 0.5)) return { err: `底色透明（配色变量没落到这个元素）：${cs.backgroundColor}` };
    const fg = nums(cs.color);
    if (fg.length < 3) return { err: `取不到字色：${cs.color}` };
    const a = lum(fg);
    const b = lum(bg);
    return { r: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05), fg: cs.color, bg: cs.backgroundColor };
  });
  ok(!barContrast.err && barContrast.r >= 4.5, '深色下「存为我的命盘」按钮文字看得见',
    barContrast.err || `${barContrast.r.toFixed(2)}:1（字 ${barContrast.fg} / 底 ${barContrast.bg}）`);
  await page.emulateMedia({ colorScheme: 'light' });
  await page.waitForTimeout(200);

  // 换一张盘，再点档案卡：应当一键回到 1988 那张
  await page.fill(dateEl, '1990-12-01');
  await page.locator('button.mp-btn').filter({ hasText: '排盘' }).first().click();
  await page.waitForTimeout(1200);
  const other = await chartText();
  ok(other && other !== saved, '换了日期确实排成另一张盘', other.slice(0, 36));
  await page.locator('#main .mp-prof-use').first().click();
  await page.waitForFunction((want) => {
    const el = document.querySelector('#main .pp-bz');
    return !!el && el.innerText.replace(/\s+/g, ' ').trim() === want;
  }, saved, { timeout: 20000 }).catch(() => {});
  ok((await chartText()) === saved, '点档案卡直接出同一张盘（不必重报出生信息）', (await chartText()).slice(0, 36));
  const filled = await page.evaluate(() => {
    const f = (t) => {
      const lab = Array.from(document.querySelectorAll('#main label.mp-field'))
        .find((x) => x.querySelector('span.mp-lbl') && x.querySelector('span.mp-lbl').innerText.trim() === t);
      const inp = lab && (lab.querySelector('input') || lab.querySelector('select'));
      return inp ? inp.value : '';
    };
    return { date: f('出生日期（公历）'), time: f('出生时刻'), addr: f('出生地（省/市即可）'), gender: f('性别') };
  });
  ok(filled.date === '1988-03-05', '卡上的生日回填进日期框', filled.date);
  ok(filled.time === '08:30', '卡上的时刻回填进时刻框', filled.time);
  ok(filled.gender === 'male', '卡上的性别回填', filled.gender);
  ok(filled.addr.includes('石家庄'), '卡上的出生地回填', filled.addr);
  const afterUse = await page.evaluate(() => {
    try { return JSON.parse(localStorage.getItem('dsh-metaphysics/profiles-v1') || '[]')[0] || {}; } catch (e) { return {}; }
  });
  ok(afterUse.uses >= 1 && afterUse.lastUsedAt > 0, '用过一次就记次数（列表按最近用过排）', `uses=${afterUse.uses}`);

  // 卡面操作：hover 才出现（平时不占视觉），置顶/改名/删除都要真点得到
  // 上一步刚点过卡片，鼠标还停在卡上，:hover 是活的——先把指针挪开再验「平时收着」
  await page.mouse.move(2, 2);
  await page.waitForTimeout(200);
  const pinBtn = page.locator('#main [data-mp-prof="pin"]');
  ok(!(await pinBtn.isVisible()), '不悬停时卡面按钮不占位');
  await page.locator('#main .mp-prof-card').first().hover();
  await page.waitForTimeout(150);
  ok(await pinBtn.isVisible(), '悬停卡片后出现置顶/改名/删除');
  await pinBtn.click();
  await page.waitForTimeout(200);
  ok((await page.locator('#main .mp-prof-card.pinned').count()) === 1, '置顶后卡片带上 pinned 标记');
  ok((await text('#main [data-mp-prof="pin"]')).includes('已置顶'), '置顶按钮文案跟着变', await text('#main [data-mp-prof="pin"]'));

  await page.locator('#main [data-mp-prof="edit"]').dispatchEvent('click');
  await page.waitForTimeout(250);
  ok((await text('#main button[data-mp-prof="put"]')).includes('更新这张档案'), '改名时按钮变「更新这张档案」');
  ok((await page.locator('#main .mp-prof-name').inputValue()) === '阿测', '改名把原称呼读回输入框');
  ok((await page.locator('#main [data-mp-prof="cancel"]').count()) === 1, '改名时给一条取消退路');
  await page.locator('#main [data-mp-prof="cancel"]').dispatchEvent('click');
  await page.waitForTimeout(200);
  ok((await text('#main button[data-mp-prof="put"]')).includes('存为我的命盘'), '取消改名后按钮复原');

  // 删除点两次才算：防误触
  await page.locator('#main [data-mp-prof="del"]').dispatchEvent('click');
  await page.waitForTimeout(200);
  ok((await page.locator('#main .mp-prof-card').count()) === 1, '第一次点删除不删，只变成确认');
  ok((await text('#main [data-mp-prof="del"]')).includes('确认删除'), '按钮文案变成「确认删除」', await text('#main [data-mp-prof="del"]'));
  await page.locator('#main [data-mp-prof="del"]').dispatchEvent('click');
  await page.waitForTimeout(250);
  ok((await page.locator('#main .mp-prof-card').count()) === 0, '第二次点才真删');
  ok((await page.locator('#main .mp-prof-empty').count()) === 1, '删空后回到引导文案');
  ok((await text('#main .mp-note')).includes('删除'), '删除有回执', (await text('#main .mp-note')).slice(0, 40));
  const afterDel = await page.evaluate(() => localStorage.getItem('dsh-metaphysics/profiles-v1'));
  ok(afterDel === '[]' || !afterDel || JSON.parse(afterDel).length === 0, '删掉的档案不留在本机', String(afterDel).slice(0, 40));
  ok((await page.locator('#main .pp-bz').count()) === 1, '删档案不影响已经排出来的盘');
  ok(errors.length === errsBefore, '档案全流程无新增 JS 报错', errors.slice(errsBefore, errsBefore + 2).join(' | '));
}

// ── 十二、复制给其他 AI：主问题与追问都要进包 ────────────────────
// 命盘类没有主问题输入框、问事类有；只读追问会让问事类的「所问」退回默认开场句，
// 只读主问题又会让刚写的追问整段丢失。两侧都要验，面板这条链直通宿主。
{
  const errsBefore = errors.length;
  // ① 只填「所问之事」、追问框空着：包里的所问必须是用户的主问题
  await openTool('liuyao');
  await page.waitForTimeout(300);
  await page.locator('.mp-textarea').fill('今年适合换工作吗');
  await page.locator('button.mp-btn').filter({ hasText: '起卦' }).first().click();
  await page.waitForTimeout(1500);
  await page.evaluate(() => navigator.clipboard.writeText('__before__'));
  await page.locator('[data-bridge-copy="full"]').click();
  await page.waitForTimeout(300);
  const lyPack = await page.evaluate(() => navigator.clipboard.readText());
  // 只看摘要之前的抬头：摘要正文里本来就有「所问：」，拿全文匹配会把默认句的错盖过去
  const lyHead = lyPack.split('——盘面摘要——')[0];
  ok(/所问：今年适合换工作吗/.test(lyHead), '面板复制提问 · 只填「所问之事」时也进包');
  ok(!/所问：请先用一句白话讲清/.test(lyHead), '面板复制提问 · 默认开场句不顶替用户问题');

  // ② 「问进对话」与复制提问同一口径：桥没就绪时它退回剪贴板，正好能读到包体
  await page.evaluate(() => navigator.clipboard.writeText('__before__'));
  await page.locator('button.mp-btn').filter({ hasText: '问进对话' }).click();
  await page.waitForTimeout(400);
  const chatPack = await page.evaluate(() => navigator.clipboard.readText());
  ok(chatPack.split('——盘面摘要——')[0].includes('所问：今年适合换工作吗'), '面板问进对话 · 只填「所问之事」时也进包');

  // ③ 八字填入追问：写在按钮左边的那句必须进包，且带上已有开场结论
  await openTool('bazi');
  await page.waitForTimeout(300);
  await page.locator('button.mp-btn').filter({ hasText: '排盘' }).first().click();
  await page.waitForSelector('.pp-bz', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(800);
  await page.locator('#main .mp-askbox input.mp-input').fill('2027 年事业怎么样');
  await page.evaluate(() => navigator.clipboard.writeText('__before__'));
  await page.locator('[data-bridge-copy="full"]').click();
  await page.waitForTimeout(300);
  const bzPack = await page.evaluate(() => navigator.clipboard.readText());
  ok(bzPack.includes('2027 年事业怎么样'), '面板复制提问 · 带上追问框里写的问题');
  ok(bzPack.includes('——盘面摘要——') && bzPack.includes('——回答要求——'), '面板复制提问 · 带盘面摘要与回答骨架');
  ok(bzPack.includes('——开场结论') && bzPack.includes('说人话：'), '面板复制提问 · 带面板已算好的开场结论');
  ok(errors.length === errsBefore, '复制提问流程无新增 JS 报错', errors.slice(errsBefore, errsBefore + 2).join(' | '));
}


// ── 十二·五、起卦快捷行：六个体系一键起卦 ──────────────────────
// 静态测试只能证明「字符串长得对」；这一段证明点下去真的换体系、真的出盘，
// 且与点 tab 走同一条 switchTo——所以六爻没填问题时照样被拦住。
{
  const errsBefore = errors.length;
  await openTool('ziwei');
  await page.waitForTimeout(300);
  ok((await page.locator('.mp-castrow-h').count()) === 1, '面板表单顶部有起卦表头');
  ok((await page.locator('.mp-castchip').count()) === 0, '起卦行默认折叠（不展开时没有 chip）');
  const headText = await text('.mp-castrow-l');
  ok(['六爻', '梅花', '六壬', '奇门', '塔罗', '小六壬'].every((l) => headText.includes(l)),
    '折叠态并排列出六个体系', headText.slice(0, 60));

  await page.locator('.mp-castrow-h').click();
  await page.waitForTimeout(250);
  ok((await page.locator('.mp-castchip').count()) === 6, '展开后六个 chip', String(await page.locator('.mp-castchip').count()));
  const order = await page.evaluate(() => [...document.querySelectorAll('.mp-castchip')].map((b) => b.getAttribute('data-cast')));
  ok(order.join(',') === 'liuyao,meihua,daliuren,qimen,tarot,xiaoliuren', 'chip 顺序与常量一致', order.join(','));
  const stored = await page.evaluate(() => localStorage.getItem('mp.cast.open'));
  ok(stored === 'true', '展开状态记进本机', String(stored));

  // 塔罗不看时间：点一下就抽牌，最不依赖输入
  await page.locator('.mp-castchip[data-cast="tarot"]').click();
  await page.waitForTimeout(1500);
  ok((await page.locator('.mp-castchip[data-cast="tarot"]').getAttribute('aria-pressed')) === 'true',
    '点过的体系高亮', String(await page.locator('.mp-castchip[data-cast="tarot"]').getAttribute('aria-pressed')));
  const tarotMain = await text('#main');
  ok(tarotMain.length > 200, '点塔罗 chip 直接出牌面（不用再点按钮）', tarotMain.length + ' 字符');

  // 已有盘时行尾给「把这张盘问进对话」，与结果卡下方那条是同一通路
  ok((await page.locator('.mp-castgo').count()) === 1, '有结果时出现「把这张盘问进对话」');
  await page.evaluate(() => navigator.clipboard.writeText('__before__'));
  await page.locator('.mp-castgo').click();
  await page.waitForTimeout(400);
  const chipPack = await page.evaluate(() => navigator.clipboard.readText());
  ok(chipPack !== '__before__' && chipPack.includes('——盘面摘要——'),
    'chip 的问进对话走既有 handoff（桥未就绪退回剪贴板）', chipPack.slice(0, 40));

  // 六爻必填：chip 与 tab 同一条 switchTo，所以这里同样会被拦住
  await page.locator('.mp-castchip[data-cast="liuyao"]').click();
  await page.waitForTimeout(700);
  ok((await page.locator('.mp-textarea').count()) === 1, '点六爻 chip 切到六爻面板');
  // 前面几段填过「所问之事」，状态还在——先清空，才能测到「没填就被拦」
  await page.locator('.mp-textarea').fill('');
  await page.waitForTimeout(200);
  await page.locator('.mp-castchip[data-cast="liuyao"]').click();
  await page.waitForTimeout(600);
  // 面板本来就有「所问之事（必填）」这行标签，所以不能拿全文关键词当判据——
  // 只看错误行本身（setError 写进 .mp-err，role=alert），外加输入框的 invalid 态。
  const lyErr = await page.locator('.mp-err').first().innerText().catch(() => '');
  const lyInvalid = (await page.locator('.mp-textarea.invalid').count()) === 1;
  ok(/所问之事/.test(lyErr), '没填问题就起卦同样被拦（chip 没绕开必填）', lyErr.replace(/\s+/g, ' ').slice(0, 50));
  ok(lyInvalid, '被拦时输入框标红（不静默出错盘）', String(lyInvalid));
  ok(errors.length === errsBefore, '起卦快捷行全程无新增 JS 报错', errors.slice(errsBefore, errsBefore + 2).join(' | '));
}

// ── 十二·六、结果区第一块是盘面 ────────────────────────────────
// 静态测试只能证明拼接顺序写对了；这一段看真机 DOM：一屏里第一眼必须是牌面/卦象，
// 不是「12ms」「修订 3 处」这类技术行。
{
  await openTool('tarot');
  await page.waitForTimeout(300);
  // 问事体系问题必填（十二·五 末尾把框清空过），先写一句再起卦
  await page.locator('.mp-textarea').fill('这周能不能把这件事定下来');
  if (!(await page.locator('.mp-castchip[data-cast="tarot"]').count())) {
    await page.locator('.mp-castrow-h').click();
    await page.waitForTimeout(200);
  }
  await page.locator('.mp-castchip[data-cast="tarot"]').click();
  await page.waitForSelector('.mp-card', { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(400);
  const diag = await page.evaluate(() => {
    const card = document.querySelector('.mp-card');
    const el = card && card.firstElementChild;
    return {
      hasCard: !!card,
      cardCls: card ? String(card.className) : null,
      kids: card ? [...card.children].slice(0, 4).map((x) => String(x.className || x.tagName)) : [],
      first: el ? String(el.className || el.tagName) : null,
      ttFirst: !!(el && el.classList && (el.classList.contains('mp-tt-card') || el.querySelector('.mp-tt-card'))),
      ttAnywhere: !!(card && card.querySelector('.mp-tt-card')),
    };
  });
  ok(diag.ttFirst, '结果卡第一块就是塔罗牌面', JSON.stringify(diag));
  ok(!!diag.first && !/mp-perf|mp-rev|mp-handle|mp-shadow|mp-trace|mp-cast-at|mp-caliber/.test(diag.first),
    '第一块不是技术信息行', JSON.stringify(diag.kids));
}

// ── 十二·七、体质问卷：第 20 个体系，45 题分 9 页 ──────────────
// 引擎侧有静态测试，这一段看真机：点进去拿得到题面、能翻页、答满 27 题能出结果卡，
// 且结果卡第一块是体质盘面（chartHTML 分派），不是技术行。
{
  const errsBefore = errors.length;
  await openTool('constitution');
  await page.waitForSelector('.mp-quiz-list', { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(400);
  const head = await page.locator('.mp-quiz-count').first().innerText().catch(() => '');
  ok(/第 1 \/ 9 页/.test(head), '体质问卷一进来就是第 1 / 9 页', head.replace(/\s+/g, ' '));
  ok((await page.locator('.mp-quiz-q').count()) === 5, '一页 5 题', String(await page.locator('.mp-quiz-q').count()));
  ok((await page.locator('.mp-quiz-o').count()) === 25, '每题 5 个选项（1 没有 … 5 总是）', String(await page.locator('.mp-quiz-o').count()));
  ok((await page.locator('.mp-quiz-btn.primary').count()) === 1, '看结果在问卷导航里，没有另起主按钮', String(await page.locator('.mp-quiz-btn.primary').count()));

  // 答满 27 题：每题点第 3 个选项（「有时」），一页答完再翻页
  for (let p = 0; p < 6; p += 1) {
    const groups = page.locator('.mp-quiz-opts');
    const n = await groups.count();
    for (let i = 0; i < n; i += 1) {
      await groups.nth(i).locator('.mp-quiz-o').nth(2).click();
    }
    const next = page.locator('.mp-quiz-btn', { hasText: '下一页' });
    if (await next.count()) await next.first().click();
    await page.waitForTimeout(140);
  }
  const cnt = await page.locator('.mp-quiz-count').first().innerText().catch(() => '');
  const answered = Number((/已答 (\d+) \/ 45/.exec(cnt) || [])[1] || 0);
  ok(answered >= 27, '答满 27 题就够看结果', cnt.replace(/\s+/g, ' '));
  const goBtn = page.locator('.mp-quiz-btn.primary').first();
  const canGo = await goBtn.isEnabled().catch(() => false);
  ok(canGo, '够 27 题后「看结果」可点', String(canGo));
  await goBtn.click();
  await page.waitForSelector('.mp-card', { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(400);
  const csDiag = await page.evaluate(() => {
    const card = document.querySelector('.mp-card');
    const el = card && card.firstElementChild;
    return { hasCard: !!card, first: el ? String(el.className || el.tagName) : null, cs: !!(card && card.querySelector('.mp-cs')) };
  });
  ok(csDiag.cs, '体质结果卡里有九条横条（.mp-cs）', JSON.stringify(csDiag));
  ok(/mp-cs/.test(String(csDiag.first)), '结果卡第一块就是体质盘面', JSON.stringify(csDiag));
  ok(errors.length === errsBefore, '体质问卷全程无新增 JS 报错', errors.slice(errsBefore).join(' | '));
}

// ── 十二·八、五运六气：第 21 个体系，只要日期、不要生辰 ────────
// 引擎侧有 114 条静态断言，这一段只验真机：切进去能出结果卡、第一块是运气盘面、
// 日期字段在而性别不在（TIME_KIND 是 date，不是 birth）。
{
  const errsBefore = errors.length;
  await openTool('wuyunliuqi');
  await page.waitForTimeout(500);
  const dateField = page.locator('#main .mp-panel input.mp-input[placeholder^="年-月-日"]');
  ok((await dateField.count()) >= 1, '运气 tab 有日期字段', String(await dateField.count()));
  ok((await page.locator('#main .mp-panel select').count()) === 0, '运气 tab 不显示性别下拉', String(await page.locator('#main .mp-panel select').count()));
  await page.waitForSelector('.mp-card', { timeout: 8000 }).catch(() => {});
  const info = await page.evaluate(() => {
    const card = document.querySelector('#main .mp-card');
    if (!card) return { hasCard: false };
    const first = card.firstElementChild;
    return {
      hasCard: true,
      first: first ? first.className : '',
      steps: card.querySelectorAll('.mp-wl-step').length,
      on: card.querySelectorAll('.mp-wl-step.on').length,
      tags: card.querySelectorAll('.mp-wl-tag').length,
      text: (card.textContent || '').slice(0, 60),
    };
  });
  ok(info.hasCard && /mp-wl/.test(info.first), '运气结果卡第一块是运气盘面', JSON.stringify(info).slice(0, 160));
  ok(info.steps === 11, '九步时刻表（客运 5 + 客气 6）', String(info.steps));
  ok(info.on >= 1, '当前所处那一步高亮', String(info.on));
  ok(errors.length === errsBefore, '运气 tab 全程无新增 JS 报错', errors.slice(errsBefore).join(' | '));
}

// ── 十二·九、太乙神数：第 22 个体系，九宫地盘 + 六类落点 ────────
// 引擎侧有 120 条静态断言，这一段只验真机：切进去能出结果卡、第一块是九宫图、
// 太乙那一格恰好亮一个（三年一宫，不会同时亮两格）。
{
  const errsBefore = errors.length;
  await openTool('taiyi');
  await page.waitForTimeout(500);
  const dateField = page.locator('#main .mp-panel input.mp-input[placeholder^="年-月-日"]');
  ok((await dateField.count()) >= 1, '太乙 tab 有日期字段', String(await dateField.count()));
  ok((await page.locator('#main .mp-panel select').count()) === 0, '太乙 tab 不显示性别下拉', String(await page.locator('#main .mp-panel select').count()));
  await page.waitForSelector('.mp-card', { timeout: 8000 }).catch(() => {});
  const info = await page.evaluate(() => {
    const card = document.querySelector('#main .mp-card');
    if (!card) return { hasCard: false };
    const first = card.firstElementChild;
    const on = card.querySelectorAll('.mp-ty-cell.on');
    return {
      hasCard: true,
      first: first ? first.className : '',
      cells: card.querySelectorAll('.mp-ty-cell').length,
      on: on.length,
      onText: on[0] ? (on[0].textContent || '') : '',
      wc: card.querySelectorAll('.mp-ty-mark.w').length,
      secs: card.querySelectorAll('.mp-ty-sec').length,
      text: (card.textContent || '').slice(0, 60),
    };
  });
  ok(info.hasCard && /mp-ty/.test(info.first), '太乙结果卡第一块是九宫盘面', JSON.stringify(info).slice(0, 160));
  ok(info.cells === 9, '九宫格正好九格', String(info.cells));
  ok(info.on === 1, '太乙恰好落在一格', String(info.on));
  ok(info.wc >= 1, '文昌带标记', String(info.wc));
  ok(info.secs >= 4, '落宫 / 八门 / 文昌 / 积年四行都在', String(info.secs));
  ok(/太乙|宫|局/.test(info.onText + info.text), '盘面写出了太乙落宫与局数', (info.onText + '|' + info.text).slice(0, 80));
  ok(errors.length === errsBefore, '太乙 tab 全程无新增 JS 报错', errors.slice(errsBefore).join(' | '));
}

// ── 十三、未发版改动清单：面板运行时得真的拿得到 ────────────────
// client.js 里那行注入是构建期写进去的，源码断言看不到压缩后的形态；
// 错误边界的环境行（版本号 + 未发版改动 N 项）全靠它，所以在真 React 里读一次。
{
  const list = await page.evaluate(() => window.__MP_UNRELEASED);
  // 只断言「是数组」：发版后这一段会被清空，届时这里应当是 []，不是 undefined
  ok(Array.isArray(list), '面板运行时取得到未发版改动清单', JSON.stringify(list === undefined ? 'undefined' : list).slice(0, 140));
  ok(list.every((t) => typeof t === 'string' && t.trim() === t && t.length > 0), '清单每条都是非空标题', list.join(' / ').slice(0, 140));
}

// ── 十四、全程无 JS 报错 ───────────────────────────────────────
ok(errors.length === 0, '面板全程无 JS 报错', errors.slice(0, 3).join(' | '));

await page.screenshot({ path: path.join(root, '_e2e-panel.png') });
await browser.close();
await new Promise((r) => server.close(r));
for (const f of Object.values(tmp)) { try { fs.unlinkSync(f); } catch (e) { /* 已删 */ } }

console.log(`\n${pass} 通过，${fails.length} 失败`);
if (fails.length) { fails.forEach((f) => console.log('  - ' + f)); process.exit(1); }
