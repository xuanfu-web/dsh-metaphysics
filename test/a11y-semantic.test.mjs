// 语义与可访问性：发版后巡检（0.83.0 之后）补的一批硬伤
//   ① 首屏分组区块、「方法与验证」区块原来只有视觉标题、没有可读名字 —— 读屏只能听到「区块」；
 //  ② 八字盘面表 5 个表头没有 scope=col —— 读屏把「年/月/日/时」读成一串无归属单元格；
 //  ③ 称骨吃下 gender 却完全不参与计算，且歌诀只有通行本一套，原来的免责没提「女命歌诀」——
 //     女命用户会以为自己看到的是女命断语。这条既锁文案，也锁「男女同盘」这个既定口径；
 //  ④ 页面外壳在 localhost 也注册 ./sw.js，而根目录没有 sw.js：每开一次页面就必然 404 一次。
import fs from 'node:fs';
import vm from 'node:vm';
import { compute } from '../engine/index.js';
import { ok } from './_harness.mjs';

const ROOT = new URL('../', import.meta.url);
const read = (p) => fs.readFileSync(new URL(p, ROOT), 'utf8');
const BUILD = read('tools/build-html.mjs');
const KIT = read('src/panel-kit.js');

// 面板渲染跑一份真 dom：读的是 src/panel-kit.js 原文，不是构建产物
const sandbox = { window: {}, console };
vm.runInNewContext(KIT, sandbox, { filename: 'panel-kit.js' });
const pp = sandbox.window.__PP;

const baziArgs = { system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male' };
const R = compute(baziArgs);

// ── ① 区块要有可读名字 ────────────────────────────────────────────
{
  const tgroups = (BUILD.match(/<section class="tgroup"/g) || []).length;
  const named = (BUILD.match(/<section class="tgroup" aria-labelledby="tg-h-\$\{gi\}"/g) || []).length;
  ok('首屏分组区块都带 aria-labelledby', tgroups > 0 && named === tgroups, `${named}/${tgroups}`);
  ok('分组标题 h2 带同名 id', /<h2 id="tg-h-\$\{gi\}">/.test(BUILD));
  // id 靠 map 下标生成：不留 index 就会 4 个区块共用一个 id，读屏照样分不开
  ok('分组 map 带下标参数', /GROUPS\.map\(\(g, gi\)/ .test(BUILD));
  ok('「方法与验证」区块带 aria-labelledby', /<section id="method" class="method no-print" hidden aria-labelledby="method-h">/.test(BUILD));
  ok('「方法与验证」的 h2 带对应 id', /<h2 id="method-h">方法与验证<\/h2>/.test(BUILD));
  // 外壳里每一个 section 都带名字：漏一个，读屏就多一处「区块」念不出是什么
  const secTags = [...BUILD.matchAll(/<section[^>]*>/g)].map((m) => m[0]);
  const nameless = secTags.filter((t) => !/aria-label=|aria-labelledby=/.test(t));
  ok('页面外壳每个 section 都有名字', secTags.length >= 3 && nameless.length === 0, nameless.join(' '));
}

// ── ② 八字表头逐个带 scope ────────────────────────────────────────
{
  const html = pp.baziHTML(R);
  const thead = (html.match(/<thead>.*?<\/thead>/s) || [''])[0];
  const ths = (thead.match(/<th[\s>]/g) || []).length;
  const scoped = (thead.match(/<th scope="col"/g) || []).length;
  ok('八字表头每个 th 都带 scope=col', ths === 5 && scoped === 5, `${scoped}/${ths}`);
  ok('表头首格（空角）有可读名', thead.includes('aria-label="项目"'));
  // 名字不许空着：空 th 读屏会念「空白」，等于没名字
  ok('表头首格不是裸空 th', !/^<thead><tr><th><\/th>/.test(thead));
}

// ── ③ 称骨：性别不参与计算这件事，必须写在用户看得到的地方 ────────
{
  const cg = (gender) => compute({ system: 'chenggu', datetime: '1990-05-12T14:30', gender });
  const m = cg('male');
  const f = cg('female');
  const n = cg(undefined);
  const body = (r) => JSON.stringify({ weights: r.weights, total: r.total, verdict: r.verdict, song: r.song, summary: r.summary });
  ok('称骨：男/女/缺省三档骨重与结论逐字相同（口径即「不分男女」）', body(m) === body(f) && body(m) === body(n));
  ok('称骨：性别写错仍然报错，不静默替换', (() => {
    try { cg('x'); return false; } catch (e) { return e && e.code === 'E_INPUT'; }
  })());
  ok('引擎免责写明「男女同表」', /男女同表/.test(m.disclaimer), m.disclaimer.slice(0, 40));
  ok('引擎免责写明女命歌诀未收', /女命歌诀/.test(m.disclaimer), '');
  const card = pp.chengguHTML(m);
  ok('面板称骨卡也写明女命歌诀未收（不能只有引擎一处）', /女命歌诀/.test(card));
  ok('面板称骨卡不再写「不分男女」却没交代别本', !/不分男女/.test(card));
  ok('称骨卡不出 undefined/NaN', !/undefined|NaN/.test(card));
}

// ── ④ Service Worker 只在 https 注册 ──────────────────────────────
{
  const sw = (BUILD.match(/<script>if \("serviceWorker"[\s\S]*?<\/script>/) || [''])[0];
  ok('页面里仍有 SW 注册脚本', sw.length > 0);
  ok('SW 只在 https 下注册', /location\.protocol === "https:"/.test(sw));
  ok('不再带 localhost 分支（本地没有 sw.js，注册必 404）', !/localhost|127\\.0\\.0\\.1/.test(sw), sw.slice(0, 80));
  ok('注册失败仍然静默吞掉（不污染页面报错）', /\.catch\(function \(\) \{\}\)/.test(sw));
}
