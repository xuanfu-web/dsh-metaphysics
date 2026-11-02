#!/usr/bin/env node
// 真机回归：用本机 Chrome 打开构建好的单页，把 19 个 tab 逐个点一遍。
//
// 为什么还要这一层：smoke-all 测的是「引擎 → 渲染函数」，跑在 node 里；
// 浏览器里还有一层没人覆盖——事件绑定、表单显隐、勾选后的重渲染、深链落地。
// 上次「时辰未知」崩在渲染函数（node 能测到），但「勾选后时刻框收起」这种事只有真浏览器能验。
//
// 用法：npm run e2e            （需要本机装了 Chrome 或 Edge；找不到就跳过并返回 0）
//      CHROME_PATH=/path/to/chrome npm run e2e
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const root = path.resolve(import.meta.dirname, '..');
const pageFile = path.join(root, '命理排盘.html');

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
if (!fs.existsSync(pageFile)) {
  console.error('缺交付物：命理排盘.html 不存在，先跑 npm run build:desktop');
  process.exit(1);
}

let pass = 0;
const fails = [];
const ok = (c, name, extra = '') => {
  if (c) { pass += 1; console.log('PASS  ' + name + (extra ? '  -> ' + extra : '')); } else { fails.push(name + (extra ? ' -> ' + extra : '')); console.log('FAIL  ' + name + (extra ? '  -> ' + extra : '')); }
};

const TABS = [
  { k: 'ziwei', name: '紫微' }, { k: 'bazi', name: '八字' }, { k: 'liuyao', name: '六爻' },
  { k: 'meihua', name: '梅花' }, { k: 'daliuren', name: '六壬' }, { k: 'qimen', name: '奇门' },
  { k: 'hepan', name: '合盘' }, { k: 'tarot', name: '塔罗' }, { k: 'almanac', name: '黄历' },
  { k: 'convert', name: '农历' }, { k: 'zeri', name: '择日' }, { k: 'chenggu', name: '称骨' },
  { k: 'xiaoliuren', name: '小六壬' }, { k: 'star', name: '星座' }, { k: 'numerology', name: '生命数字' },
  { k: 'mbti', name: '人格' }, { k: 'trend', name: '人生K线' }, { k: 'fengshui', name: '风水' },
  { k: 'name', name: '起名' },
];

const browser = await chromium.launch({ executablePath: exe, headless: true, args: ['--allow-file-access-from-files'] });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: 'light' });
const page = await ctx.newPage();

const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });

await page.goto('file:///' + pageFile.replace(/\\/g, '/'), { waitUntil: 'load' });
await page.waitForTimeout(400);
ok(true, '页面加载完成');

/** 点某个 tab：平铺/分组两种视图里都找得到 */
async function openTab(k) {
  // 平铺视图用 .tab，分组视图用 .tool；默认是分组视图，所以不能只找 .tab
  const loc = page.locator(`[data-tab="${k}"]`);
  const n = await loc.count();
  for (let i = 0; i < n; i++) {
    const el = loc.nth(i);
    if (await el.isVisible()) { await el.click(); return true; }
  }
  return false;
}

/** 填该 tab 必填的表单项（只填可见的） */
async function fillRequired(k) {
  const set = async (id, v) => {
    const el = page.locator('#' + id);
    if (await el.count() && await el.isVisible()) { await el.fill(v); return true; }
    return false;
  };
  if (['liuyao', 'meihua', 'daliuren', 'tarot'].includes(k)) await set('question', '下周三之前这件事能不能成');
  if (k === 'zeri') {
    // 择日的起算日就是主表单的「日期」，事项是下拉框
    await set('date', '2026-11-03');
    const t = page.locator('#ztask');
    if (await t.count() && await t.isVisible()) await t.selectOption('开业').catch(() => {});
  }
  if (k === 'name') { await set('surname', '李'); await set('givenname', '明轩'); }
}

for (const t of TABS) {
  errors.length = 0;
  const opened = await openTab(t.k);
  ok(opened, `${t.name} · 切得到`);
  if (!opened) continue;
  await page.waitForTimeout(120);
  await fillRequired(t.k);

  // 人格问卷的产物是「一份卷子」（不是盘），主按钮被它自己的分页控件取代
  if (t.k === 'mbti') {
    const next = page.locator('#mbti-next');
    if (await next.count() && await next.isVisible()) await next.click();
    await page.waitForTimeout(250);
    // 问卷是内联渲染在 #mbti-qs 里的，不进 #out
    const paper = await page.evaluate(() => {
      const host = document.getElementById('mbti-qs');
      const out = document.getElementById('out');
      return { q: host ? host.textContent.trim().length : 0, o: out ? out.innerHTML.length : 0 };
    });
    ok(paper.q > 80, '人格 · 卷子渲染出来了', `${paper.q} 字`);
    ok(errors.length === 0, '人格 · 无 JS 报错', errors.slice(0, 2).join(' | '));
    continue;
  }
  const go = page.locator('#go');
  ok(await go.count() > 0, `${t.name} · 有主按钮`);
  if (await go.count() && await go.isVisible()) await go.click();
  else ok(false, `${t.name} · 主按钮可点`, '按钮不可见');

  // 等结果落地：输出区出现盘面模块，或出现明确错误
  let settled = false;
  for (let i = 0; i < 60; i++) {
    const state = await page.evaluate(() => {
      const out = document.getElementById('out');
      const html = out ? out.innerHTML : '';
      const err = out ? out.querySelector('.err') : null;
      return { len: html.length, err: err ? err.textContent.trim() : '' };
    });
    if (state.err) { settled = 'err:' + state.err.slice(0, 60); break; }
    if (state.len > 800) { settled = true; break; }
    await page.waitForTimeout(100);
  }
  ok(settled === true, `${t.name} · 出结果`, settled === true ? '' : String(settled || '超时'));

  const dirty = await page.evaluate(() => {
    const out = document.getElementById('out');
    const html = out ? out.innerHTML : '';
    const hit = /(^|>)\s*undefined\s*(<|$)|>NaN<|\[object Object\]/.exec(html);
    return hit ? hit[0].slice(0, 40) : '';
  });
  ok(!dirty, `${t.name} · 结果无脏串`, dirty);
  ok(errors.length === 0, `${t.name} · 无 JS 报错`, errors.slice(0, 2).join(' | '));

  if (t.k === 'bazi') {
    // 勾「时辰未知」：时刻框应被禁用、结果里出现三柱提示
    const box = page.locator('#hourunknown');
    ok(await box.count() > 0, '八字 · 有「时辰未知」勾选');
    if (await box.count()) {
      await box.check({ force: true });
      await page.locator('#go').click({ force: true });
      await page.waitForFunction(() => {
        const o = document.getElementById('out');
        return o && o.innerHTML.includes('时柱暂缺');
      }, null, { timeout: 8000 }).catch(() => {});
      const txt = await page.evaluate(() => document.getElementById('out').innerHTML);
      ok(txt.includes('时柱暂缺'), '八字 · 勾选后结果注明时柱暂缺');
      ok(!/12:00/.test(txt), '八字 · 三柱结果不含 12:00');
      await box.uncheck({ force: true });
    }
  }
}

// 深链：直接带 #mp=... 打开，落地应自动切 tab 并出结果
{
  errors.length = 0;
  const deep = 'file:///' + pageFile.replace(/\\/g, '/') + '#mp=' + encodeURIComponent(JSON.stringify({ system: 'liuyao', datetime: '2026-11-01T22:10', lines: [9, 7, 8, 8, 7, 6], question: '深链能不能落地' }));
  const p2 = await ctx.newPage();
  const errs2 = [];
  p2.on('pageerror', (e) => errs2.push(e.message));
  await p2.goto(deep, { waitUntil: 'load' });
  await p2.waitForTimeout(1200);
  const out = await p2.evaluate(() => (document.getElementById('out') || {}).innerHTML || '');
  ok(out.length > 500, '深链 · 自动出结果', String(out.length));
  ok(!errs2.length, '深链 · 无 JS 报错', errs2.slice(0, 2).join(' | '));
  await p2.close();
}

// 深色主题：整页截图，检查有没有「白字压白底」这类看不见的文字
{
  const p3 = await ctx.newPage();
  await p3.emulateMedia({ colorScheme: 'dark' });
  await p3.goto('file:///' + pageFile.replace(/\\/g, '/'), { waitUntil: 'load' });
  await p3.waitForTimeout(300);
  const lowContrast = await p3.evaluate(() => {
    // 只查「有文字且文字与底色几乎同色」的元素，深浅两套主题都适用
    const lum = (rgb) => {
      const m = String(rgb).match(/\d+(\.\d+)?/g);
      if (!m || m.length < 3) return null;
      const [r, g, b] = m.slice(0, 3).map(Number);
      const f = (v) => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4); };
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const bad = [];
    document.querySelectorAll('button, .tab, .tool, a, span, b, li').forEach((el) => {
      // 只看「自己直接含文字」的元素：父容器（如 button.tool）的文字都在子节点里，
      // 拿它的 color 去算对比度会误报——它的 color 压根没被用来画字。
      const hasOwnText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      const txt = (el.textContent || '').trim();
      if (!hasOwnText || !txt || txt.length > 30) return;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none' || Number(cs.opacity) < 0.2) return;
      const l1 = lum(cs.color);
      // 背景可能是渐变（background-image），只读 backgroundColor 会拿到透明，
      // 于是把「浅粉底 + 深字」误判成同色。渐变取其中各色值的平均再算亮度。
      const bgLum = (node) => {
        const cs2 = getComputedStyle(node);
        const c = cs2.backgroundColor;
        const a = String(c).match(/rgba?\([^)]*,\s*([\d.]+)\)/);
        const alpha = a ? Number(a[1]) : 1;
        if (alpha > 0.5) return lum(c);
        const img = cs2.backgroundImage;
        if (img && img !== 'none') {
          const cols = img.match(/rgba?\([^)]*\)/g) || [];
          const vals = cols.map(lum).filter((v) => v != null);
          if (vals.length) return vals.reduce((x, y) => x + y, 0) / vals.length;
        }
        return null;
      };
      let node = el; let l2 = null;
      while (node && node !== document.documentElement) {
        l2 = bgLum(node);
        if (l2 != null) break;
        node = node.parentElement;
      }
      if (l1 == null || l2 == null) return;
      const hi = Math.max(l1, l2); const lo = Math.min(l1, l2);
      const ratio = (hi + 0.05) / (lo + 0.05);
      if (ratio < 2.2) bad.push(`${txt.slice(0, 12)}(${ratio.toFixed(2)})`);
    });
    return bad.slice(0, 6);
  });
  ok(lowContrast.length === 0, '深色主题 · 无明显低对比文字', lowContrast.join('、'));
  const shot = path.join(root, '_e2e-dark.png');
  await p3.screenshot({ path: shot, fullPage: false });
  console.log('      深色截图：' + shot);
  await p3.close();
}

// 浅色 + 窄屏：手机上门最常出问题的两处——横向溢出、平铺 tab 挤成一条
{
  const p4 = await ctx.newPage();
  await p4.setViewportSize({ width: 390, height: 780 });
  await p4.emulateMedia({ colorScheme: 'light' });
  await p4.goto('file:///' + pageFile.split(String.fromCharCode(92)).join('/'), { waitUntil: 'load' });
  await p4.waitForTimeout(400);
  const m = await p4.evaluate(() => {
    const de = document.documentElement;
    const overflow = de.scrollWidth - de.clientWidth;
    // 看有没有元素宽到把页面撑出去
    let widest = 0; let who = '';
    document.querySelectorAll('body *').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > widest && r.width > de.clientWidth + 2) { widest = r.width; who = el.tagName + '.' + String(el.className || '').split(' ')[0]; }
    });
    return { overflow, widest, who };
  });
  ok(m.overflow <= 2, '窄屏 · 无横向溢出', `溢出 ${m.overflow}px${m.who ? ' 来自 ' + m.who : ''}`);
  // 窄屏下点一个 tab + 出结果
  const tabBtn = p4.locator('[data-tab="bazi"]');
  const n = await tabBtn.count();
  let clicked = false;
  for (let i = 0; i < n; i++) { const el = tabBtn.nth(i); if (await el.isVisible()) { await el.click(); clicked = true; break; } }
  ok(clicked, '窄屏 · 能切到八字');
  if (clicked) {
    const go = p4.locator('#go');
    if (await go.count() && await go.isVisible()) await go.click();
    await p4.waitForTimeout(900);
    const len = await p4.evaluate(() => (document.getElementById('out') || {}).innerHTML.length || 0);
    ok(len > 800, '窄屏 · 出结果', String(len));
    await p4.screenshot({ path: path.join(root, '_e2e-mobile.png'), fullPage: false });
    console.log('      窄屏截图：' + path.join(root, '_e2e-mobile.png'));
  }
  await p4.close();
}

await browser.close();

console.log(`\n${pass} 项通过${fails.length ? `，${fails.length} 项失败` : ''}`);
if (fails.length) {
  for (const f of fails) console.log('  - ' + f);
  process.exit(1);
}
