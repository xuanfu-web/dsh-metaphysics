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
    __MP_CHUNKS__: { bazi: 'client.bazi.js', ziwei: 'client.ziwei.js' },
    console,
    __mpCalls: 0,
    require: {
      async: async (name) => {
        env.__mpCalls += 1;
        ok('取块路径正确', name.startsWith('./'), name);
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
eq('第一次记录 tab', first.tab, 'bazi');
eq('第一次记录分块', first.chunk, 'client.bazi.js');
eq('第一次是未命中缓存', first.cached, false);
ok('第一次耗时为非负数', typeof first.ms === 'number' && first.ms >= 0, String(first.ms));
ok('引擎可用', typeof env.window.Engine.compute === 'function' && env.__mpCalls === 1);
await env.window.__mpEnsureEngine('bazi');
eq('第二次命中缓存', env.window.__MP_LAST_LOAD.cached, true);
eq('缓存命中不再取块', env.__mpCalls, 1);
await env.window.__mpEnsureEngine('ziwei');
eq('换 tab 记录新分块', env.window.__MP_LAST_LOAD.chunk, 'client.ziwei.js');
eq('换 tab 是未命中缓存', env.window.__MP_LAST_LOAD.cached, false);

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
const paintBody = UI.slice(UI.indexOf('function paint() {'), UI.indexOf('/** 追问区'));
ok('独立页重绘后仍补回耗时行',
  paintBody.includes('perfHTML(last.perf)') && paintBody.includes("insertAdjacentHTML('beforeend', perfHtml)"),
  paintBody.slice(-200));
ok('独立页把耗时行放进结果区', UI.includes("el('out').insertAdjacentHTML('beforeend', perfHtml)"));

// ── 本地回显，不上报 ──
for (const [name, src] of [['app.js', APP], ['web-ui.js', UI], ['engine-lazy.js', LAZY]]) {
  ok(`${name} 没有上报调用`, !/sendBeacon|navigator\.connections|new Image\(\)\.src/.test(src), name);
}
