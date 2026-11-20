// 落款（腾讯频道二维码）与手动检查更新：四条硬性约束，改回去就红
//   ① 落款只在报告最末出现一次，且在折叠区之外 —— 解读默认收起也要看得见；
//   ② 二维码是内嵌 data URI，面板与独立页都不联网取图；默认收起，点了才展开；
//   ③ 「检查更新」是手动按钮：渲染阶段一次请求都不许发，只有 points 点下去才 fetch；
//   ④ 联网失败一律静默（清空提示），不许弹窗、不许留错误号。
// 依据：插件整体离线（0.84 刚修掉「本地每开一次页面 404 一次」），任何常驻请求都是回退。
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compute, interpret } from '../engine/index.js';
import { ok, eq } from './_harness.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const KIT_SRC = fs.readFileSync(path.join(root, 'src', 'panel-kit.js'), 'utf8');
const COMPOSE_SRC = fs.readFileSync(path.join(root, 'src', 'compose.js'), 'utf8');

const CASES = [
  ['bazi', { system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male' }],
  ['ziwei', { system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'female' }],
  ['liuyao', { system: 'liuyao', lines: [7, 8, 9, 7, 8, 9], question: '这份工作要不要接' }],
  ['qimen', { system: 'qimen', datetime: '2026-11-15T10:00', question: '这笔款能不能收回' }],
  ['tarot', { system: 'tarot', question: '该不该搬走', spread: 'three' }],
  ['chenggu', { system: 'chenggu', datetime: '1990-05-12T14:30', gender: 'female' }],
  ['xiaoliuren', { system: 'xiaoliuren', datetime: '2026-11-15T09:00', question: '出行顺利吗' }]
];

// 渲染基座：window 只要 __MP_VER 与 location，其余全靠源码自身
const makeWindow = (ver) => ({ __MP_VER: ver, location: { search: '', hash: '' } });
const renderAll = (ver) => {
  const win = makeWindow(ver);
  new Function('window', KIT_SRC)(win);
  new Function('window', COMPOSE_SRC)(win);
  const PP = win.__PP;
  const C = win.__MPCompose;
  return {
    PP,
    win,
    items: CASES.map(([tag, args]) => {
      const it = interpret(compute(args), args.question || '');
      // 走真实拼装口（应用与页面都是这样拼的）：interpret 一段 + sign 一段交给 composeResult。
      // folded 用 true —— 解读默认就是收起的，落款必须在这一状态下仍看得见。
      const html = C.composeResult({
        interpret: PP.resultWithInterpret('', it, { folded: true }),
        sign: PP.signatureHTML('2026-11-20'),
      }, { system: args.system });
      return { tag, html };
    })
  };
};

const { PP, win, items } = renderAll('0.85.0');

// ── ① 一处落款，在折叠区之外，每份报告都看得见 ────────────────────
{
  for (const it of items) {
    const strips = (it.html.match(/class="mp-sig"/g) || []).length;
    eq(`${it.tag}：落款只在报告里出现一次`, strips, 1);
    eq(`${it.tag}：落款带频道号`, (it.html.match(/pd48189034/g) || []).length >= 1, true);
    // 解读默认 folded 收起；落款若还在 .mp-it-wrap 里，有解读的体系（八字、紫微）就看不见它
    const sig = it.html.indexOf('class="mp-sig"');
    if (it.html.includes('mp-it-wrap')) {
      ok(`${it.tag}：解读是默认收起的（前提成立）`, it.html.includes('mp-it folded'));
      ok(`${it.tag}：落款不藏在解析折叠容器里`,
        sig > it.html.indexOf('mp-it-wrap') && it.html.slice(sig).indexOf('mp-it-wrap') < 0, `sig=${sig}`);
    } else {
      ok(`${it.tag}：短报告没有解读折叠，落款照样出`, sig >= 0);
    }
    ok(`${it.tag}：落款之后不再接任何解读容器（它就在报告最末）`,
      it.html.slice(sig).indexOf('class="mp-it') < 0, `sig=${sig}`);
    const after = it.html.slice(it.html.lastIndexOf('class="mp-sig"'));
    ok(`${it.tag}：落款后只有收尾标签`, !/<h3|\/\/mp-it-|class="mp-.+-row"/.test(after) && after.trimEnd().endsWith('</div>'));
    // 首屏/正文区不能出现二维码或频道号：那是引流位，用户已明确否掉
    const head = it.html.slice(0, sig);
    ok(`${it.tag}：正文区没有二维码`, !head.includes('data:image/png;base64'));
    ok(`${it.tag}：正文区没有频道号`, !head.includes('pd48189034'));
  }
}

// ── ② 二维码内嵌、默认收起（日期固定在有效期内，免得测试随日历翻红）──
{
  const html = PP.signatureHTML('2026-11-20');
  eq('落款里有两个二维码（频道 + 微信群）', (html.match(/data:image\/png;base64,/g) || []).length, 2);
  ok('二维码是内嵌 data URI（不指向任何服务器）', /<img src="data:image\/png;base64,/.test(html));
  eq('报告里没有外链图片', (html.match(/<img[^>]+src="(?:https?:)?\/\//g) || []).length, 0);
  ok('频道码带可读名（含频道号）', /<img[^>]+alt="[^"]*pd48189034/.test(html));
  ok('微信群码带可读名（含群名与有效期）', /<img[^>]+alt="[^"]*微信群[^"]*2026-11-27/.test(html));
  eq('频道码固定 132 尺寸', (html.match(/<img[^>]+width="132" height="132"/g) || []).length, 1);
  eq('微信群码按原尺寸 240 显示（模块密，不缩采样）', (html.match(/<img[^>]+width="240" height="240"/g) || []).length, 1);
  // 默认收起靠 CSS 与 class，不靠 hidden 属性 —— details 收起时 CSS 也要压住
  ok('二维码容器默认不带 on 类', !/class="mp-sig-qr on"/.test(html));
  ok('两个展开按钮初始 aria-expanded=false', (html.match(/data-mp-qr="(?:qq|wx)" aria-expanded="false"/g) || []).length, 2);
  const css = String(PP.CSS);
  ok('CSS 里 .mp-sig-qr 默认隐藏', /\.mp-sig-qr\{display:none/.test(css));
  ok('CSS 里 .mp-sig-qr.on 才显示', /\.mp-sig-qr\.on\{display:flex\}/.test(css));
  ok('群码显示尺寸单独放大', /\.mp-sig-qr\[data-qr-for="wx"\] img\{width:240px/.test(css));
  ok('打印媒体不出二维码', /@media print\{\.mp-sig-qr\{display:none!important\}\}/.test(css));
  // 体积：两张码合起来也不能把主包撑爆（0.84 起 gzip 上限 132KB）
  const b64s = [...html.matchAll(/data:image\/png;base64,([A-Za-z0-9+/=]+)/g)].map((m) => m[1].length);
  ok('两张二维码各自在预算内（base64 < 8KB）', b64s.length === 2 && b64s.every((n) => n > 1000 && n < 8192), b64s.join('+'));
  ok('两张二维码合计 base64 < 12KB', b64s.reduce((a, b) => a + b, 0) < 12288, String(b64s.reduce((a, b) => a + b, 0)));
}

// ── ②b 群码有期限：过期就撤图，只留一行说明 ─────────────────────────
{
  ok('有效期最后一天仍算有效', PP.wxQrLive('2026-11-27') === true);
  ok('过了有效期就失效', PP.wxQrLive('2026-11-28') === false);
  ok('带时间的日期串按日期比较', PP.wxQrLive('2026-11-20T23:59:00') === true);
  const dead = PP.signatureHTML('2026-11-28');
  eq('过期后只剩频道码一张', (dead.match(/data:image\/png;base64,/g) || []).length, 1);
  ok('过期后没有微信按钮与微信行', !dead.includes('data-mp-qr="wx"') && !dead.includes('data-qr-for="wx"'));
  ok('过期后写明原因与解决办法', /已过期（2026-11-27 前有效）/.test(dead));
  ok('过期后频道入口与检查更新仍在', dead.includes('pd48189034') && dead.includes('data-mp-chk'));
  // 两个按钮各开各的行：键必须配对，否则微信按钮会去开频道那张
  const live = PP.signatureHTML('2026-11-20');
  for (const k of ['qq', 'wx']) ok(`按钮 ${k} 有配对的行`, live.includes(`data-mp-qr="${k}"`) && live.includes(`data-qr-for="${k}"`));
  ok('点击处理按按钮键找行', /querySelector\(`\.mp-sig-qr\[data-qr-for="\$\{q\.getAttribute\('data-mp-qr'\)\}"\]`\)/.test(KIT_SRC));
}

// ── ③ 渲染期零请求，点了才 fetch ───────────────────────────────────
{
  const calls = [];
  const win2 = makeWindow('0.85.0');
  win2.fetch = (...a) => { calls.push(a); return Promise.resolve({ ok: true, json: () => Promise.resolve({ version: '0.85.0' }) }); };
  new Function('window', KIT_SRC)(win2);
  const PP2 = win2.__PP;
  for (const [tag, args] of CASES) {
    PP2.interpretHTML(interpret(compute(args), args.question || ''), { folded: false });
  }
  eq('渲染七份报告一次网络请求都没发', calls.length, 0);
  eq('源码里只有一个外部接口地址（npm registry）', (KIT_SRC.match(/https:\/\/registry\.npmjs\.org/g) || []).length, 1);
  ok('检查更新按钮是 type=button（不提交任何表单）', /<button type="button" class="mp-sig-btn" data-mp-chk>/.test(items[0].html));
}

// ── ④ 检查更新的四种结果：新版 / 已最新 / 失败静默 / 没网 ────────────
{
  const btn = () => ({ disabled: false, dis: 0 });
  const wait = () => new Promise((r) => setTimeout(r, 60));
  const cases = [
    ['有新版', { version: '0.86.0' }, (t) => t.indexOf('0.86.0') >= 0 && t.indexOf('可用') >= 0],
    ['同版本算已最新', { version: '0.85.0' }, (t) => t.indexOf('已是最新') >= 0],
    ['远端比本地旧也算已最新', { version: '0.84.0' }, (t) => t.indexOf('已是最新') >= 0]
  ];
  for (const [name, body, check] of cases) {
    const win3 = makeWindow('0.85.0');
    win3.fetch = () => Promise.resolve({ ok: true, json: () => Promise.resolve(body) });
    new Function('window', KIT_SRC)(win3);
    const msg = { textContent: '' };
    win3.__PP.checkUpdate(msg, btn());
    await wait();
    ok(`检查更新：${name}`, check(String(msg.textContent)), String(msg.textContent));
  }
  // 失败静默：网络错、非 200、JSON 坏、没有 version 字段 —— 一律清空，不留红字
  const fails = [
    ['网络错', () => Promise.reject(new Error('offline'))],
    ['非 200', () => Promise.resolve({ ok: false, json: () => Promise.resolve({}) })],
    ['JSON 坏', () => Promise.resolve({ ok: true, json: () => Promise.reject(new Error('bad json')) })],
    ['缺 version', () => Promise.resolve({ ok: true, json: () => Promise.resolve({}) })]
  ];
  for (const [name, impl] of fails) {
    const win4 = makeWindow('0.85.0');
    win4.fetch = impl;
    new Function('window', KIT_SRC)(win4);
    const msg = { textContent: '正在查…' };
    const b = btn();
    win4.__PP.checkUpdate(msg, b);
    await wait();
    ok(`检查更新失败静默：${name}`, String(msg.textContent) === '', JSON.stringify(msg.textContent));
    ok(`检查更新失败后按钮恢复可点：${name}`, b.disabled === false);
  }
  // 没有 fetch 的环境（老宿主 / 被策略禁掉）：直接不吭声，不抛异常
  // 注意 node 22 自带全局 fetch，得真藏掉才算「这个环境没有 fetch」
  const win5 = makeWindow('0.85.0');
  new Function('window', KIT_SRC)(win5);
  const msg5 = { textContent: '' };
  const realFetch = globalThis.fetch;
  globalThis.fetch = undefined;
  ok('没有 fetch 时检查更新不抛异常', (() => { try { win5.__PP.checkUpdate(msg5, btn()); return true; } catch (e) { return false; } })());
  eq('没有 fetch 时不留任何提示', String(msg5.textContent), '');
  globalThis.fetch = realFetch;
}

// ── ⑤ 版本号印在落款上，且与注入的 __MP_VER 一致 ────────────────────
{
  ok('落款印的是注入的版本号', /烛微命盘<i>v0\.85\.0<\/i>/.test(items[0].html));
  // __MP_VER 没注入（老宿主/纯引擎调用）时不能印出 undefined 或 v
  const bare = renderAll('');
  ok('没有版本号时不印 v 空串', !/烛微命盘<i>v<\/i>/.test(bare.items[0].html));
  ok('没有版本号时落款仍在', bare.items[0].html.includes('class="mp-sig"'));
  // 版本号必须来自 window，不许写死在源码里
  ok('源码里没有写死 0.85.0', !/0\.85\.0/.test(KIT_SRC.replace(/__MP_VER/g, '')));
}

// ── ⑥ 面板/页面共用一份：落款不许只挂某一条链 ────────────────────────
{
  eq('落款代码在共用模块里（panel-kit）', KIT_SRC.includes('class="mp-sig"') && KIT_SRC.includes('pp.checkUpdate'), true);
  ok('构建脚本不会把落款剥掉', !/mp-sig/.test(fs.readFileSync(path.join(root, 'tools', 'build-html.mjs'), 'utf8')));
  ok('落款的点击绑定幂等（重复注入不叠监听）', KIT_SRC.includes('window.__MP_SIG_BOUND'));
  // interpretHTML 的容器默认 folded 收起；落款一旦回到它里面，就等于回到「看不见」
  const iStart = KIT_SRC.indexOf('pp.interpretHTML = function');
  const iEnd = KIT_SRC.indexOf('pp.followupHTML = function');
  ok('interpretHTML 不再生成落款', iStart > 0 && iEnd > iStart && !KIT_SRC.slice(iStart, iEnd).includes('signatureHTML'));
  ok('拼接层把落款列成独立段', /USER_SEGS = \[[^\]]*'sign'\]/.test(COMPOSE_SRC));
}
