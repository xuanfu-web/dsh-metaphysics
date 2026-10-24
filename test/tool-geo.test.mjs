// 工具层的地址解析策略：默认离线、显式才联网、同地址不重复请求。
//
// 0.14.1 及以前：只要地址写了区县，工具就自动发一次 Nominatim 请求（还把 UA 停在 0.2），
// 既违背 README 的隐私承诺，也让每次排盘多出最多 2.5 秒。
import { apply } from '../index.js';
import { ok } from './_harness.mjs';

let def = null;
apply({ tools: { register: (d) => { def = d; return () => {}; } }, effect: (fn) => fn() });
ok('工具定义已注册', !!def && typeof def.execute === 'function');

// ── ① schema 自描述 ─────────────────────────────────────────
const props = def.parameters.properties;
ok('schema 声明 geocode 枚举', JSON.stringify(props.geocode && props.geocode.enum) === '["offline","online"]');
ok('schema 声明 seed', !!props.seed && props.seed.type === 'number');
ok('schema 说明 asOf 覆盖三个体系', /紫微/.test(props.asOf.description) && /八字/.test(props.asOf.description) && /塔罗/.test(props.asOf.description));

// ── ② 默认离线：不允许发网络请求 ────────────────────────────
let fetchCalls = 0;
globalThis.fetch = () => {
  fetchCalls += 1;
  throw new Error('离线模式下不应发起网络请求');
};

const offline = await def.execute({
  system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '新疆喀什地区疏附县',
});
ok('默认离线不发起 fetch', fetchCalls === 0, `fetch 调用 ${fetchCalls} 次`);
ok('离线仍能按内置表取到经度', typeof offline.input.longitude === 'number', String(offline.input.longitude));
ok('离线结果标明坐标来源等级', !!offline.input.geo && !!offline.input.geo.level, offline.input.geo && offline.input.geo.level);

// ── ③ 显式联网：读到结果并缓存 ──────────────────────────────
const calls = [];
globalThis.fetch = async (url) => {
  calls.push(String(url));
  return {
    ok: true,
    json: async () => [{ lon: '75.98932', lat: '39.47041', display_name: '疏附县, 喀什地区, 新疆' }],
  };
};

const online1 = await def.execute({
  system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '新疆喀什地区疏附县', geocode: 'online',
});
ok('显式 online 会联网一次', calls.length === 1, `fetch 调用 ${calls.length} 次`);
ok('联网结果被采用', Math.abs(online1.input.longitude - 75.98932) < 1e-6, String(online1.input.longitude));
ok('联网结果标注为在线解析', !!online1.input.geo && online1.input.geo.level === '在线');

const online2 = await def.execute({
  system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '新疆喀什地区疏附县', geocode: 'online',
});
ok('同地址第二次命中缓存', calls.length === 1, `fetch 调用 ${calls.length} 次`);
ok('缓存结果一致', online2.input.longitude === online1.input.longitude);

// ── ④ 非法 geocode 值 ──────────────────────────────────────
let code = '';
try {
  await def.execute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', geocode: 'auto' });
} catch (e) {
  code = e.message;
}
ok('非法 geocode 报 E_INPUT', code.startsWith('[E_INPUT]'), code);

// ── ⑤ 合盘：双方地址都走同一策略（默认离线，不发请求）──────
const before = calls.length;
const hp = await def.execute({
  system: 'hepan', datetime: '1990-05-12T14:30', gender: 'male', address: '河北石家庄',
  partner: { datetime: '1992-03-03T10:00', gender: 'female', address: '黑龙江漠河' },
});
ok('合盘默认离线不联网', calls.length === before, `fetch 调用 ${calls.length - before} 次`);
ok('合盘双方都带经度', typeof hp.a.longitude === 'number' && typeof hp.b.longitude === 'number', `${hp.a.longitude}, ${hp.b.longitude}`);
