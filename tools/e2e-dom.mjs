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
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: 'light', permissions: ['clipboard-read', 'clipboard-write'] });
const page = await ctx.newPage();

const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });

await page.goto('file:///' + pageFile.replace(/\\/g, '/'), { waitUntil: 'load' });
await page.waitForTimeout(400);
ok(true, '页面加载完成');

// ── 日期框：逐字输入不许吞位，隐藏字段不许拦不看日期的体系 ──────────
// page.fill 一次写整串，测不到「敲到一半」：掩码把「1990-05-1」补成 1990-05-01 后，
// 再敲 2 就变成 01 日的错盘。这里用真键盘一位一位打。
{
  await page.locator('#date').click();
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Delete');
  await page.keyboard.type('1990051', { delay: 20 });
  const mid = await page.locator('#date').inputValue();
  ok(mid === '1990-05-1', '单页 · 打到一半的「1990-05-1」原样保留', mid);
  await page.keyboard.type('2', { delay: 20 });
  const full = await page.locator('#date').inputValue();
  ok(full === '1990-05-12', '单页 · 接着敲 2 补成 12 日（不是 1 日）', full);

  // 塔罗不看日期：日期框清空也不该拿「请填写公历日期」拦住抽牌
  await page.locator('#date').fill('');
  await openTab('tarot');
  await page.waitForTimeout(300);
  await page.locator('#question').fill('这次跳槽能不能成');
  await page.locator('#go').click();
  await page.waitForTimeout(800);
  const tarotOut = await page.evaluate(() => {
    const out = document.getElementById('out');
    const err = out && out.querySelector('.err');
    return { err: err ? err.textContent.trim() : '', len: out ? out.innerHTML.length : 0 };
  });
  ok(!/公历日期/.test(tarotOut.err) && tarotOut.len > 50, '单页 · 日期空着也能抽塔罗（不拿隐藏字段拦人）',
    tarotOut.err || `${tarotOut.len} 字`);

  // 回到八字把日期补好，后面各 tab 沿用
  await openTab('bazi');
  await page.locator('#date').fill('1990-05-12');
  await page.locator('#time').fill('14:30');
  await page.locator('#go').click();
  await page.waitForSelector('#out .pp-bz', { timeout: 8000 }).catch(() => {});
  const baziErr = await page.evaluate(() => {
    const e = document.querySelector('#out .err');
    return e ? e.textContent.trim() : '';
  });
  ok(!baziErr, '单页 · 填好日期后八字正常出盘', baziErr.slice(0, 40));
}

/** 点某个 tab：平铺/分组两种视图里都找得到 */
async function openTab(k) {
  // 平铺视图用 .tab，分组视图用 .tool；默认是分组视图，所以不能只找 .tab
  const sel = `[data-tab="${k}"]`;
  const clickVisible = async () => {
    const loc = page.locator(sel);
    const n = await loc.count();
    for (let i = 0; i < n; i++) {
      const el = loc.nth(i);
      if (await el.isVisible()) { await el.click(); return true; }
    }
    return false;
  };
  if (await clickVisible()) return true;

  // 第 5 项往后折在「还有 N 个」里：先展开它所在的分组
  const opened = await page.evaluate((key) => {
    const els = [...document.querySelectorAll(`[data-tab="${key}"]`)];
    for (const el of els) {
      const group = el.closest('.tgroup, .mp-tgroup');
      const more = group && group.querySelector('.tmore, .mp-tmore');
      if (more) { more.click(); return true; }
    }
    return false;
  }, k);
  if (opened) {
    await page.waitForTimeout(300);
    if (await clickVisible()) return true;
  }

  // 不在分组里的体系（星座 / 数字）只在平铺视图：切过去再点
  const sw = page.locator('[data-view="flat"], .mp-viewsw button:has-text("平铺")');
  if ((await sw.count()) === 0) return false;
  await sw.first().click();
  await page.locator(`.mp-tabs ${sel}`).first().waitFor({ state: 'visible', timeout: 4000 }).catch(() => {});
  return clickVisible();
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

    // 生时校正的候选时辰属于「这张盘」：换一张盘必须清空，不能把旧候选贴上去
    await page.locator('#go').click({ force: true });
    await page.waitForSelector('#out .pp-bz', { timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(300);
    const rectBtn = page.locator('[data-rectify]');
    ok((await rectBtn.count()) === 1, '八字 · 有「计算候选时辰」按钮');
    if (await rectBtn.count()) {
      await rectBtn.click();
      await page.waitForTimeout(500);
      const first = await page.evaluate(() => ((document.getElementById('rectout') || {}).textContent || '').trim());
      ok(first.length > 20, '八字 · 生时校正给出候选时辰', first.slice(0, 40));
      await page.locator('#date').fill('1985-06-15');
      await page.locator('#go').click({ force: true });
      await page.waitForTimeout(800);
      const after = await page.evaluate(() => ((document.getElementById('rectout') || {}).textContent || '').trim());
      ok(after === '', '八字 · 换一张盘后旧的候选时辰不残留', after.slice(0, 40));
      await page.locator('#date').fill('1990-05-12');

      // 出生地也是这张盘的输入：排完之后只改表单、不重排，候选时辰不能跟着换
      await page.locator('#addr').fill('');
      await page.locator('#go').click({ force: true });
      await page.waitForSelector('#out .pp-bz', { timeout: 8000 }).catch(() => {});
      await page.waitForTimeout(300);
      await rectBtn.click();
      await page.waitForTimeout(500);
      const beforeAddr = await page.evaluate(() => ((document.getElementById('rectout') || {}).textContent || '').trim());
      await page.locator('#addr').fill('河北石家庄');
      await rectBtn.click();
      await page.waitForTimeout(500);
      const afterAddr = await page.evaluate(() => ((document.getElementById('rectout') || {}).textContent || '').trim());
      ok(beforeAddr.length > 20 && afterAddr === beforeAddr,
        '八字 · 改出生地不重排时候选时辰仍按这张盘的输入', afterAddr.slice(0, 40));
      await page.locator('#addr').fill('');
    }
  }
}

// 人生K线也是出生盘：出生地要进真太阳时，不能只对八字生效
{
  ok(await openTab('trend'), '人生K线 · 能切到 tab');
  await page.waitForTimeout(400);
  await page.locator('#date').fill('1991-08-08');
  await page.locator('#time').fill('08:10');
  await page.locator('#addr').fill('');
  await page.locator('#go').click({ force: true });
  await page.waitForTimeout(1200);
  const kNoAddr = await page.evaluate(() => (document.getElementById('out') || {}).innerText || '');
  await page.locator('#addr').fill('河北石家庄');
  await page.locator('#go').click({ force: true });
  await page.waitForTimeout(1200);
  const kAddr = await page.evaluate(() => (document.getElementById('out') || {}).innerText || '');
  ok(kNoAddr.length > 200 && kAddr !== kNoAddr,
    '人生K线 · 出生地进入真太阳时（同一时刻换地址结果不同）', kAddr.slice(0, 40));
  await page.locator('#addr').fill('');
  ok(await openTab('bazi'), '单页 · 能切回八字');
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

// ── 我的命盘（单页侧）：存一张卡 → 换一张盘 → 点卡回到原盘 ──────
// 档案的存储与渲染在 panel-kit 是共用的一份，但接线是各写各的：
// 面板走 React 的 onClick 委托，单页走 addEventListener + 真实表单 id。
// 只有把两边都点一遍，才知道「单页这边有没有把 id 填错 / 有没有把 run 忘了」。
{
  const errsBefore = errors.length;
  const p5 = await ctx.newPage();
  p5.on('pageerror', (e) => errors.push('p5 pageerror: ' + e.message));
  await p5.goto('file:///' + pageFile.replace(/\\/g, '/'), { waitUntil: 'load' });
  await p5.waitForTimeout(500);

  const bz = () => p5.evaluate(() => {
    const t = document.querySelector('#out .pp-bz');
    return t ? t.innerText.replace(/\s+/g, ' ').trim() : '';
  });

  // 分组视图下 .tab 那条是被 CSS 收起来的，能点的入口是分组卡片；两个都试一遍
  const clickTab = async (k) => {
    const loc = p5.locator(`[data-tab="${k}"]`);
    const n = await loc.count();
    for (let i = 0; i < n; i++) {
      const one = loc.nth(i);
      if (await one.isVisible()) { await one.click(); return true; }
    }
    if (!n) return false;
    await loc.first().dispatchEvent('click');
    return true;
  };

  ok((await p5.locator('#profwrap .mp-prof').count()) === 1, '单页 · 顶部出现「我的命盘」');
  ok((await p5.locator('#profwrap .mp-prof-empty').count()) === 1, '单页 · 没有档案时给引导');
  ok((await p5.locator('#profwrap .mp-prof-name').count()) === 1, '单页 · 命盘类体系给存入条');

  // 六爻是占事，没有「出生信息」可存
  ok(await clickTab('liuyao'), '单页 · 能切到六爻');
  await p5.waitForTimeout(500);
  ok((await p5.locator('#profwrap .mp-prof-name').count()) === 0, '单页 · 占事体系不给存入条');

  ok(await clickTab('bazi'), '单页 · 能切到八字');
  await p5.waitForTimeout(500);
  await p5.fill('#date', '1988-03-05');
  await p5.fill('#time', '08:30');
  await p5.selectOption('#gender', 'male');
  await p5.fill('#addr', '河北石家庄');
  await p5.locator('#hourunknown').uncheck().catch(() => {});
  await p5.locator('#go').click();
  await p5.waitForTimeout(1500);
  const saved = await bz();
  ok(/年柱/.test(saved), '单页 · 存盘前先排出一张八字盘', saved.slice(0, 32));

  await p5.fill('#profwrap .mp-prof-name', '单页阿测');
  await p5.locator('#profwrap button[data-mp-prof="put"]').click();
  await p5.waitForTimeout(300);
  ok((await p5.locator('#profwrap .mp-prof-card').count()) === 1, '单页 · 存入后多出一张档案卡');
  ok((await p5.locator('#profwrap .mp-prof-tip').innerText()).includes('已存入我的命盘'), '单页 · 存入回执写在这条上', (await p5.locator('#profwrap .mp-prof-tip').innerText()).slice(0, 30));
  const stored = await p5.evaluate(() => {
    try { return JSON.parse(localStorage.getItem('dsh-metaphysics/profiles-v1') || '[]'); } catch (e) { return []; }
  });
  ok(stored.length === 1 && stored[0].date === '1988-03-05' && stored[0].kind === 'bazi', '单页 · 档案落到本机存储', JSON.stringify(stored[0] || {}).slice(0, 60));

  // 改名：原称呼必须先读回输入框；什么都不改点「更新」，称呼不能被体系短名顶掉
  await p5.locator('#profwrap [data-mp-prof="edit"]').dispatchEvent('click');
  await p5.waitForTimeout(200);
  const editName = await p5.inputValue('#profwrap .mp-prof-name');
  ok(editName === '单页阿测', '单页 · 点「改名」把原称呼读回输入框', editName);
  await p5.locator('#profwrap button[data-mp-prof="put"]').click();
  await p5.waitForTimeout(300);
  const afterEdit = await p5.evaluate(() => {
    try { return JSON.parse(localStorage.getItem('dsh-metaphysics/profiles-v1') || '[]'); } catch (e) { return []; }
  });
  ok(afterEdit.length === 1 && afterEdit[0].label === '单页阿测', '单页 · 不改称呼直接更新，称呼不被体系名顶掉', JSON.stringify(afterEdit[0] || {}).slice(0, 60));

  // 换一张盘，再点卡：表单回填 + 出的是同一张盘
  await p5.fill('#date', '1990-12-01');
  await p5.locator('#go').click();
  await p5.waitForTimeout(1500);
  const other = await bz();
  ok(other && other !== saved, '单页 · 换日期确实换了一张盘', other.slice(0, 32));
  await p5.locator('#profwrap .mp-prof-use').first().click();
  await p5.waitForFunction((want) => {
    const t = document.querySelector('#out .pp-bz');
    return !!t && t.innerText.replace(/\s+/g, ' ').trim() === want;
  }, saved, { timeout: 20000 }).catch(() => {});
  ok((await bz()) === saved, '单页 · 点档案卡一点出盘（不必重报出生信息）', (await bz()).slice(0, 32));
  const filled = await p5.evaluate(() => ({
    date: (document.getElementById('date') || {}).value,
    time: (document.getElementById('time') || {}).value,
    gender: (document.getElementById('gender') || {}).value,
    addr: (document.getElementById('addr') || {}).value,
  }));
  ok(filled.date === '1988-03-05' && filled.time === '08:30', '单页 · 卡上的生日时刻回填进表单', `${filled.date} ${filled.time}`);
  ok(filled.gender === 'male' && String(filled.addr).includes('石家庄'), '单页 · 性别与出生地回填', `${filled.gender} ${filled.addr}`);

  // 删除两次确认 + 删完不影响已经排出来的盘
  await p5.locator('#profwrap [data-mp-prof="del"]').dispatchEvent('click');
  await p5.waitForTimeout(200);
  ok((await p5.locator('#profwrap .mp-prof-card').count()) === 1, '单页 · 第一次点删除只变成确认');
  ok((await p5.locator('#profwrap [data-mp-prof="del"]').innerText()).includes('确认删除'), '单页 · 按钮文案变「确认删除」');
  await p5.locator('#profwrap [data-mp-prof="del"]').dispatchEvent('click');
  await p5.waitForTimeout(250);
  ok((await p5.locator('#profwrap .mp-prof-card').count()) === 0, '单页 · 第二次点才真删');
  ok((await bz()) === saved, '单页 · 删档案不动已经排出来的盘');

  // 档案没存出生地：载入 / 改名都得清掉表单里上一张盘的地址，否则真太阳时按别人的地方算
  await p5.fill('#date', '1975-07-07');
  await p5.fill('#time', '09:09');
  await p5.fill('#addr', '');
  await p5.locator('#go').click();
  await p5.waitForTimeout(1200);
  await p5.fill('#profwrap .mp-prof-name', '无址阿测');
  await p5.locator('#profwrap button[data-mp-prof="put"]').click();
  await p5.waitForTimeout(300);
  const noAddrCard = p5.locator('#profwrap .mp-prof-card').filter({ hasText: '无址阿测' });
  ok((await noAddrCard.count()) === 1, '单页 · 没填出生地也能存档案');
  const storedNoAddr = await p5.evaluate(() => {
    try { return (JSON.parse(localStorage.getItem('dsh-metaphysics/profiles-v1') || '[]')[0] || {}).address; } catch (e) { return 'x'; }
  });
  ok(storedNoAddr === '', '单页 · 空出生地按空字符串存', String(storedNoAddr));
  await p5.fill('#addr', '四川成都');
  await noAddrCard.locator('.mp-prof-use').click();
  await p5.waitForTimeout(1200);
  const addrAfterUse = await p5.inputValue('#addr');
  ok(addrAfterUse === '', '单页 · 载入无出生地档案会清掉残留地址', addrAfterUse);
  await p5.fill('#addr', '四川成都');
  await noAddrCard.locator('[data-mp-prof="edit"]').dispatchEvent('click');
  await p5.waitForTimeout(200);
  const addrAfterEdit = await p5.inputValue('#addr');
  ok(addrAfterEdit === '', '单页 · 改名读回时也清掉残留地址', addrAfterEdit);

  // 旧版本 / 手改存储留下的「有日期没时刻」卡：不能拿表单里现成的 14:30 顶上排成另一个人
  await p5.evaluate(() => {
    localStorage.setItem('dsh-metaphysics/profiles-v1', JSON.stringify([
      { id: 'nt1', kind: 'bazi', label: '没时刻', date: '1990-01-01', time: '', hourUnknown: false, createdAt: 1, lastUsedAt: 1 },
    ]));
  });
  await p5.reload({ waitUntil: 'load' });
  await p5.waitForTimeout(500);
  ok((await p5.locator('#profwrap .mp-prof-card').count()) === 1, '单页 · 重载后读到那张缺时刻的卡');
  await p5.locator('#profwrap .mp-prof-use').first().click();
  await p5.waitForTimeout(500);
  ok((await p5.locator('#profwrap .mp-prof-tip').innerText()).includes('没有出生时刻'), '单页 · 缺时刻的卡提示先补时刻', (await p5.locator('#profwrap .mp-prof-tip').innerText()).slice(0, 30));
  ok((await p5.locator('#out .pp-bz').count()) === 0, '单页 · 缺时刻的卡不拿表单现成时刻排成另一个人');
  const ntUse = await p5.evaluate(() => {
    try { return (JSON.parse(localStorage.getItem('dsh-metaphysics/profiles-v1') || '[]')[0] || {}).uses || 0; } catch (e) { return -1; }
  });
  ok(ntUse === 0, '单页 · 没排出来的卡不算「排过一次」', String(ntUse));

  // 面板与单页共用存储：单页存的 key 必须和面板写的是同一个
  const keyOk = await p5.evaluate(() => Object.prototype.hasOwnProperty.call(window.__PP, 'PROF_KEY') && window.__PP.PROF_KEY === 'dsh-metaphysics/profiles-v1');
  ok(keyOk, '单页与面板共用同一个档案 key');
  ok(errors.length === errsBefore, '单页 · 档案流程无新增 JS 报错', errors.slice(errsBefore, errsBefore + 2).join(' | '));
  await p5.close();
}

// ── 复制给其他 AI（单页侧）：包里的「所问」必须是用户写的那句 ──────────
// 这条链最容易在接线层断：命盘类没有主问题输入框，若只读 #question，复制出去的
// 永远是「请先用一句白话讲清这张盘的主线」；追问框里刚写的字则整段丢失。
// 同时要求带上插件已算好的开场结论，别的模型才不会另起一套口径。
{
  const errsBefore = errors.length;
  const p6 = await ctx.newPage();
  p6.on('pageerror', (e) => errors.push('p6 pageerror: ' + e.message));
  await p6.goto('file:///' + pageFile.replace(/\\/g, '/'), { waitUntil: 'load' });
  await p6.waitForTimeout(500);

  const openTab = async (k) => {
    const loc = p6.locator(`[data-tab="${k}"]`);
    const n = await loc.count();
    for (let i = 0; i < n; i++) {
      if (await loc.nth(i).isVisible()) { await loc.nth(i).click(); return true; }
    }
    if (!n) return false;
    await loc.first().dispatchEvent('click');
    return true;
  };
  const copyAsk = async () => {
    await p6.evaluate(() => navigator.clipboard.writeText('__before__'));
    await p6.locator('[data-act="copyask"]').click();
    await p6.waitForTimeout(300);
    return p6.evaluate(() => navigator.clipboard.readText());
  };

  await openTab('bazi');
  await p6.click('#go');
  await p6.waitForTimeout(1400);
  await p6.fill('#askq', '2027 年事业怎么样');
  const baziPack = await copyAsk();
  ok(baziPack.includes('2027 年事业怎么样'), '复制提问 · 带上追问框里写的问题');
  ok(baziPack.includes('——盘面摘要——') && baziPack.includes('——回答要求——'), '复制提问 · 带盘面摘要与回答骨架');
  ok(baziPack.includes('——开场结论') && baziPack.includes('说人话：'), '复制提问 · 带面板已算好的开场结论');
  ok(baziPack.length > 2000, '复制提问 · 内容量够别的模型直接用', String(baziPack.length));

  // 只填「所问之事」、不写追问：问事类也不能退回默认开场句
  await openTab('liuyao');
  await p6.fill('#question', '今年适合换工作吗');
  await p6.click('#go');
  await p6.waitForTimeout(1400);
  const lyPack = await copyAsk();
  // 只看摘要之前的抬头：摘要正文里本来就有「所问：」，拿全文匹配会把默认句的错盖过去
  const lyHead = lyPack.split('——盘面摘要——')[0];
  ok(/所问：今年适合换工作吗/.test(lyHead), '复制提问 · 只填「所问之事」时也进包');
  ok(!/所问：请先用一句白话讲清/.test(lyHead), '复制提问 · 默认开场句不顶替用户问题');

  // 切「询问方向」会整块重绘 #out：追问框里已经输入的字不能被清掉
  await p6.fill('#askq', '换方向后这句话还在吗');
  await p6.locator('#direction').selectOption({ index: 1 });
  await p6.waitForTimeout(600);
  ok((await p6.inputValue('#askq')) === '换方向后这句话还在吗', '单页 · 切方向重绘后追问框内容保留');
  ok(errors.length === errsBefore, '单页 · 复制提问流程无新增 JS 报错', errors.slice(errsBefore, errsBefore + 2).join(' | '));
  await p6.close();
}

await browser.close();

console.log(`\n${pass} 项通过${fails.length ? `，${fails.length} 项失败` : ''}`);
if (fails.length) {
  for (const f of fails) console.log('  - ' + f);
  process.exit(1);
}
