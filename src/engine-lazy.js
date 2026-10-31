// 引擎懒加载：入口只带界面，按当前 tab 去宿主取 client.<name>.js 分块。
// 分块由 build-client.mjs 生成；每块自带统一入口，因此切 tab 时把该块的导出合并到同一个 Engine 对象上。
const Engine = {};
Engine.DIRECTIONS = __MP_DIRECTIONS__;
Engine.compute = () => {
  throw new Error('命理引擎尚未加载');
};
const MP_ENGINE_CACHE = Object.create(null);

function mpChunkOf(tab) {
  return __MP_CHUNKS__[tab] || __MP_CHUNKS__.ziwei || 'client.chart.js';
}

async function __mpEnsureEngine(tab) {
  const chunk = mpChunkOf(tab);
  let engine = MP_ENGINE_CACHE[chunk];
  if (!engine) {
    if (!require || typeof require.async !== 'function') {
      throw new Error('当前宿主不支持客户端分块加载（require.async 缺失），请升级 DeepSeek Harness');
    }
    const mod = await require.async(`./${chunk}`);
    engine = mod && (mod.Engine || mod.default);
    if (!engine || typeof engine.compute !== 'function') {
      throw new Error(`命理引擎分块 ${chunk} 未返回 Engine`);
    }
    MP_ENGINE_CACHE[chunk] = engine;
  }
  // 只合并有值的导出：没有 interpret / DIRECTIONS 的分块不能把上一块的能力抹掉
  for (const key of Object.keys(engine)) {
    if (engine[key] !== undefined) Engine[key] = engine[key];
  }
  if (!Array.isArray(Engine.DIRECTIONS)) Engine.DIRECTIONS = __MP_DIRECTIONS__;
  window.Engine = Engine;
  window.__MP_ENGINE_READY__ = true;
  return Engine;
}

window.__mpEnsureEngine = __mpEnsureEngine;
window.Engine = Engine;
