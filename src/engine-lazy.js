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
  // 兜底用 chart：它是命盘类四 tab（八字/紫微/合盘/趋势）共用的那块，
  // 未知 tab 落到它至少能排命盘，不会取到一个不存在的文件名。
  return __MP_CHUNKS__[tab] || __MP_CHUNKS__.bazi || 'client.chart.js';
}

const mpLazyNow = () => (typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now());

// ── 共享分块：公共栈（fail / bool / datetime / lunar / interpret / envelope …）只取一次 ──
// 宿主的 require.async 对文件名不设白名单（CLIENT_CHUNK 正则就是 client.*.js），
// 所以可以单开共享块；它把模块写进 globalThis.__MP_SHARED__，各分块从这张表取用，
// 省下每块重复的几十 KB。分两层：核心层人人要，解释栈（interpret / envelope / knowledge）
// 只有带解析的几块要——黄历、星盘这些轻体系不该为排一张盘多下 160KB。
const MP_SHARED_TIERS = {};
const MP_SHARED_FETCH_TIER = Object.create(null);

function __mpEnsureTier(tier) {
  if (MP_SHARED_TIERS[tier]) return Promise.resolve();
  if (!MP_SHARED_FETCH_TIER[tier]) {
    const file = __MP_SHARED_FILES__[tier];
    MP_SHARED_FETCH_TIER[tier] = require.async(`./${file}`)
      .then(() => {
        const ready = globalThis.__MP_SHARED_READY__;
        if (!ready || ready[tier] !== true) throw new Error(`命理引擎共享分块 ${file} 未注册`);
        MP_SHARED_TIERS[tier] = true;
      })
      // 失败要清掉在途记录：一次网络抖动不该把后续所有 tab 都钉死在失败上
      .catch((err) => {
        MP_SHARED_FETCH_TIER[tier] = null;
        throw err;
      });
  }
  return MP_SHARED_FETCH_TIER[tier];
}

/** 先核心层、再按需解释层；两层可以并行，但核心必须先落表（分块 factory 同步读它） */
async function __mpEnsureShared(chunk) {
  const tiers = (__MP_CHUNK_TIERS__ && __MP_CHUNK_TIERS__[chunk]) || ['core'];
  await __mpEnsureTier('core');
  if (tiers.includes('interpret')) await __mpEnsureTier('interpret');
}

async function __mpEnsureEngine(tab) {
  const chunk = mpChunkOf(tab);
  let engine = MP_ENGINE_CACHE[chunk];
  const cached = !!engine;
  const t0 = mpLazyNow();
  if (!engine) {
    if (!require || typeof require.async !== 'function') {
      throw new Error('当前宿主不支持客户端分块加载（require.async 缺失），请升级 DeepSeek Harness');
    }
    // 公共模块必须先就位：分块的 factory 是同步的，引用在那一刻就定死
    await __mpEnsureShared(chunk);
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
