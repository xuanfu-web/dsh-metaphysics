// D1+ 首屏耗时埋点：引擎取块 / 排盘 / 渲染三段实测，只在本机回显
import fs from 'node:fs';
import vm from 'node:vm';
import { ok, eq } from './_harness.mjs';

// ── 渲染：缺哪段就省略哪段，不编数字 ──
const KIT = fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8');
const box = { window: {}, console };
vm.runInNewContext(KIT, box, { filename: 'panel-kit.js' });
const PP = box.window.__PP;
eq('没有耗时数据不渲染', PP.perfHTML(null), '');
eq('空对象不渲染', PP.perfHTML({}), '');
const full = PP.perfHTML({ engineMs: 18.4, computeMs: 9.2, renderMs: 14.6, totalMs: 42.2, cached: false });
ok('首屏总时长', full.includes('首屏 42ms'), full);
ok('三段齐全', full.includes('引擎 18ms') && full.includes('排盘 9ms') && full.includes('渲染 15ms'), full);
ok('首次加载有标注', full.includes('（首次加载）'), full);
ok('已缓存有标注', PP.perfHTML({ engineMs: 0.4, cached: true, totalMs: 3 }).includes('（已缓存）'));
const noCache = PP.perfHTML({ engineMs: 5 });
ok('不知道是否缓存就不写', !/>[^<]*首次加载/.test(noCache) && !/>[^<]*已缓存/.test(noCache), noCache);
const partial = PP.perfHTML({ computeMs: 7.6, totalMs: 8.1 });
ok('缺引擎段仍可显示', partial.includes('首屏 8ms') && partial.includes('排盘 8ms') && !partial.includes('引擎'), partial);
ok('只有总时长也能显示', PP.perfHTML({ totalMs: 5 }).includes('首屏 5ms'));
ok('非法值不显示成 NaN', !PP.perfHTML({ engineMs: 'x', computeMs: null, totalMs: NaN }).includes('NaN')
  && PP.perfHTML({ engineMs: 'x', computeMs: null, totalMs: NaN }) === '');
ok('负数归零', PP.perfHTML({ computeMs: -3 }).includes('排盘 0ms'));
ok('带本机说明', full.includes('本机这一次的实测耗时'));

// ── 引擎懒加载：记录取块耗时与是否命中缓存 ──
const LAZY = fs.readFileSync(new URL('../src/engine-lazy.js', import.meta.url), 'utf8');
const makeEnv = () => {
  const env = {
    window: {},
    __MP_DIRECTIONS__: ['事业', '感情'],
    __MP_CHUNKS__: { bazi: 'client.chart.js', ziwei: 'client.chart.js', liuyao: 'client.liuyao.js' },
    // 0.84 起引擎分块靠两层共享模块：93 入口会把这两张表注入进来，这里按同样的形状补上，
    // 否则 engine-lazy.js 里的 __MP_CHUNK_TIERS__ 是 ReferenceError
    __MP_CHUNK_TIERS__: {
      'client.chart.js': ['core', 'interpret'],
      'client.liuyao.js': ['core', 'interpret'],
    },
    __MP_SHARED_FILES__: { core: 'client.shared.js', interpret: 'client.shared-interpret.js' },
    // 共享层的「已就位」标记必须是**事先就存在于沙箱里**的对象：
    // 创建 context 之后再往上挂属性，vm 里读不到（这一步踩过）
    __MP_SHARED_READY__: {},
    console,
    __mpCalls: 0,
    require: {
      async: async (name) => {
        env.__mpCalls += 1;
        ok('取块路径正确', name.startsWith('./'), name);
        if (name.startsWith('./client.shared')) {
          // 共享层在真实宿主里会往 globalThis 写表并置就绪位，这里照做，才能走到取块那一步
          const tier = name.includes('interpret') ? 'interpret' : 'core';
          env.__MP_SHARED_READY__[tier] = true;
          return { shared: tier, modules: 1 };
        }
        return { Engine: { compute: () => ({ ok: name }) } };
      },
    },
  };
  vm.runInNewContext(LAZY, env, { filename: 'engine-lazy.js' });
  return env;
};
const env = makeEnv();
await env.window.__mpEnsureEngine('bazi');
const first = env.window.__MP_LAST_LOAD;
eq('第一次记录 tab', 'bazi', first.tab);
eq('第一次记录分块', 'client.chart.js', first.chunk);
eq('第一次是未命中缓存', false, first.cached);
ok('第一次耗时为非负数', typeof first.ms === 'number' && first.ms >= 0, String(first.ms));
// 抽共享块之后，首开一块要取三个文件：核心层、解释层、具体块（三层都算「一次取块」）
ok('引擎可用', typeof env.window.Engine.compute === 'function' && env.__mpCalls === 3, String(env.__mpCalls));
await env.window.__mpEnsureEngine('bazi');
eq('第二次命中缓存', true, env.window.__MP_LAST_LOAD.cached);
eq('缓存命中不再取块', 3, env.__mpCalls);
// 八字与紫微同块：换 tab 不再取块（合并前这里会再下载一份完整公共栈）
await env.window.__mpEnsureEngine('ziwei');
eq('同块换 tab 仍记同一分块', 'client.chart.js', env.window.__MP_LAST_LOAD.chunk);
eq('同块换 tab 命中缓存', true, env.window.__MP_LAST_LOAD.cached);
eq('同块换 tab 不重复取块', 3, env.__mpCalls);
// 真正的跨块切换（命盘 → 六爻）才取新文件
await env.window.__mpEnsureEngine('liuyao');
eq('跨块切换记录新分块', 'client.liuyao.js', env.window.__MP_LAST_LOAD.chunk);
eq('跨块切换是未命中缓存', false, env.window.__MP_LAST_LOAD.cached);
eq('跨块切换才多取一个文件', 4, env.__mpCalls);

// ── 并发取块：同一块的多个调用只下载一次 ──
// 抽共享块之后首开一块是「核心层 → 解释层 → 具体块」三跳，所以这里不能只放一次闸，
// 用 pending 队列把每一跳逐个放开，再断言总次数（1 次核心 + 1 次具体块 = 2）。
const slow = makeEnv();
const pendingReleases = [];
slow.require.async = (name) => new Promise((resolve) => {
  slow.__mpCalls += 1;
  pendingReleases.push(() => {
    if (String(name).startsWith('./client.shared')) {
      // 共享层要照运行时的样子置就位标记，否则等待方一律判「没注册」
      const tier = String(name).includes('interpret') ? 'interpret' : 'core';
      slow.__MP_SHARED_READY__[tier] = true;
      resolve({ shared: tier, modules: 1 });
      return;
    }
    resolve({ Engine: { compute: () => ({}) } });
  });
});
const p1 = slow.window.__mpEnsureEngine('bazi');
const p2 = slow.window.__mpEnsureEngine('bazi');
const p3 = slow.window.__mpEnsureEngine('bazi');
eq('并发期间只取过一次块', slow.__mpCalls, 1);
// 把每一跳逐个放行，直到没有待放行的为止
while (pendingReleases.length) {
  pendingReleases.shift()();
  await new Promise((r) => setTimeout(r, 0));
}
const trio = await Promise.all([p1, p2, p3]);
ok('并发调用都拿到引擎', trio.every((e) => typeof e.compute === 'function'));
eq('解出来后累计只有三段：核心层 + 解释层 + 具体块', slow.__mpCalls, 3);
await slow.window.__mpEnsureEngine('bazi');
eq('并发之后仍算命中缓存', slow.__mpCalls, 3);

// ── 取块失败不留残锁：下一次要真的重试 ──
// 共享层照常放行，只让**具体块**第一次返回一个没有 Engine 的东西——
// 这才是「发布产物坏了」的真实形态（共享层失败会在更早的一步就报「未注册」）。
const flaky = makeEnv();
flaky.require.async = async (name) => {
  flaky.__mpCalls += 1;
  if (String(name).startsWith('./client.shared')) {
    const tier = String(name).includes('interpret') ? 'interpret' : 'core';
    flaky.__MP_SHARED_READY__[tier] = true;
    return { shared: tier, modules: 1 };
  }
  if (!flaky.__failedOnce) {
    flaky.__failedOnce = true;
    return { notEngine: true };
  }
  return { Engine: { compute: () => ({}) } };
};
let threw = '';
try { await flaky.window.__mpEnsureEngine('bazi'); } catch (e) { threw = e.message; }
ok('坏块报错', /未返回 Engine/.test(threw), threw);
ok('报错后不写就绪标记', !flaky.window.__MP_ENGINE_READY__);
threw = '';
try { await flaky.window.__mpEnsureEngine('bazi'); } catch (e) { threw = e.message; }
ok('重试不再抛旧错误', threw === '', threw);
// 共享层已经就位，重试只该重取具体块：累计 3（核心层 1 + 解释层 1 + 块 2 次）
eq('失败后重试只重取坏掉的那一块', flaky.__mpCalls, 4);
ok('重试成功后引擎可用', typeof flaky.window.Engine.compute === 'function');

// ── 面板接线 ──
const APP = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
ok('面板读懒加载耗时', APP.includes('__MP_LAST_LOAD'));
ok('面板有计时起点', APP.includes('const runStart = mpNow()'));
ok('面板量排盘耗时', APP.includes('const computeStart = mpNow()') && APP.includes('const computeMs ='));
ok('面板渲染耗时行', APP.includes('PP.perfHTML(perf)'));
ok('面板有空值保护', APP.includes('setPerf(null)'));
ok('面板用两帧估首屏', APP.includes('draw(2)'));
ok('面板不把过期回调写回', APP.includes('runToken !== perfSeq'));
ok('计时不依赖 Date.now 单源', APP.includes('performance.now'));

// ── 独立页接线 ──
const UI = fs.readFileSync(new URL('../src/web-ui.js', import.meta.url), 'utf8');
ok('独立页有计时起点', UI.includes('const runStart = mpNow()'));
ok('独立页量排盘耗时', UI.includes('const computeMs ='));
ok('独立页量渲染耗时', UI.includes('const renderMs ='));
ok('独立页把耗时行存进结果状态', UI.includes('last.perf = { computeMs, renderMs'));
ok('独立页显示耗时行', UI.includes('window.__PP.perfHTML(last.perf)'));
ok('独立页把耗时行传进 composeResult 的 parts', UI.includes('perf: last.perf ?'));
ok('独立页不再事后补插耗时行（那会塞进用户视图）',
  !/insertAdjacentHTML\('beforeend', perfHtml\)/.test(UI));
ok('独立页只在 dev 视图补一次重绘', /if \(window\.__MPCompose\.devOn\(\)\) paint\(\)/.test(UI));

// ── 本地回显，不上报 ──
for (const [name, src] of [['app.js', APP], ['web-ui.js', UI], ['engine-lazy.js', LAZY]]) {
  ok(`${name} 没有上报调用`, !/sendBeacon|navigator\.connections|new Image\(\)\.src/.test(src), name);
}
