// 引擎懒加载：入口只带界面，按当前 tab 去宿主取 client.<name>.js 分块。
// 分块由 build-client.mjs 生成；每块自带统一入口，因此切 tab 时把该块的导出合并到同一个 Engine 对象上。
const Engine = {};
Engine.DIRECTIONS = __MP_DIRECTIONS__;
Engine.compute = () => {
  throw new Error('命理引擎尚未加载');
};
const MP_ENGINE_CACHE = Object.create(null);
// 在途请求：同一分块的并发调用共享这一次取块，否则首屏连点两个体系会各下载一份同样的块
const MP_ENGINE_FETCH = Object.create(null);

function mpChunkOf(tab) {
  return __MP_CHUNKS__[tab] || __MP_CHUNKS__.bazi || 'client.bazi.js';
}

const mpLazyNow = () => (typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now());

async function __mpEnsureEngine(tab) {
  const chunk = mpChunkOf(tab);
  let engine = MP_ENGINE_CACHE[chunk];
  const cached = !!engine;
  const t0 = mpLazyNow();
  if (!engine) {
    if (!require || typeof require.async !== 'function') {
      throw new Error('当前宿主不支持客户端分块加载（require.async 缺失），请升级 DeepSeek Harness');
    }
    // 失败也要清掉在途记录，否则一次网络抖动会把这块永久钉在「正在加载」上
    let pending = MP_ENGINE_FETCH[chunk];
    if (!pending) {
      pending = require.async(`./${chunk}`).then((mod) => {
        const loaded = mod && (mod.Engine || mod.default);
        if (!loaded || typeof loaded.compute !== 'function') {
          throw new Error(`命理引擎分块 ${chunk} 未返回 Engine`);
        }
        MP_ENGINE_CACHE[chunk] = loaded;
        return loaded;
      });
      MP_ENGINE_FETCH[chunk] = pending;
      pending.catch(() => {}).then(() => { delete MP_ENGINE_FETCH[chunk]; });
    }
    engine = await pending;
  }
  // 只合并有值的导出：没有 interpret / DIRECTIONS 的分块不能把上一块的能力抹掉
  for (const key of Object.keys(engine)) {
    if (engine[key] !== undefined) Engine[key] = engine[key];
  }
  if (!Array.isArray(Engine.DIRECTIONS)) Engine.DIRECTIONS = __MP_DIRECTIONS__;
  window.Engine = Engine;
  window.__MP_ENGINE_READY__ = true;
  // 只在本机回显耗时：不埋点上报、不发网络请求。cached 区分「首次取块」与「切回已载入的 tab」
  window.__MP_LAST_LOAD = { tab, chunk, cached, ms: Math.round((mpLazyNow() - t0) * 10) / 10 };
  return Engine;
}

window.__mpEnsureEngine = __mpEnsureEngine;
window.Engine = Engine;
