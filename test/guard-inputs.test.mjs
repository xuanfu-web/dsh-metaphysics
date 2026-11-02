// 入参守卫与可复现性：0.59.x 检视里抓到的那批「静默错盘 / 裸 TypeError / 随挂钟漂移」。
//
// 每条都对应一次真实修复，写法上都取两端中最坏的一种——不是「算错了」，而是
// 「说得很确定，但没人知道它已经换了口径」：
//   · 紫微流年表读挂钟，同一句柄跨年就换盘；
//   · 经度只判 typeof，1e999（Infinity）炸成裸 TypeError、181 静默排出另一张盘、
//     "86.0"（模型很爱给字符串）被丢掉，少一次真太阳时修正却毫无痕迹；
//   · asOf 只校验月日，25:99 被接受并折回当日子时；
//   · 择日 days 只认整数，"45" 静默变 30 天；
//   · 生时校正的事件与候选时辰不设上限，20 万条事件把栈打爆。
// 另外锁两件契约面：工具 schema 不能有重名键（曾经两个 mode 互相覆盖），
// 以及联网解析失败的结果不许进缓存（否则网络恢复后还连着几小时报「解析失败」）。
import { apply } from '../index.js';
import { ok, eq } from './_harness.mjs';
import fs from 'node:fs';
import path from 'node:path';

const E = await import('../engine/index.js');
const H = await import('../engine/handle.js');

let def = null;
apply({ tools: { register: (d) => { def = d; return () => {}; } }, effect: (fn) => fn() });
ok('工具定义已注册', !!def && typeof def.execute === 'function');

const codeOf = (fn) => {
  try {
    fn();
    return 'ACCEPTED';
  } catch (e) {
    return e && e.code ? e.code : `BARE:${(e && e.message) || e}`.slice(0, 40);
  }
};

// ── ① 紫微流年：基准年来自 asOf，不来自挂钟 ──────────────────
const z20 = E.compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male', asOf: '2020-06-01T10:00' });
eq('流年从 asOf 那年起排', z20.liunian[0].year, 2020);
ok('流年表与 flow 的年份同口径', !!z20.flow && z20.flow.asOf && String(z20.flow.asOf.solar).startsWith('2020-06-01'), z20.flow && z20.flow.asOf && z20.flow.asOf.solar);
ok('结果顶层回显 asOf', !!z20.asOf && z20.asOf.year === 2020, JSON.stringify(z20.asOf));
const z20b = E.compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male', asOf: '2020-06-01T10:00' });
ok('同参数两次排盘逐字节一致', JSON.stringify(z20) === JSON.stringify(z20b));
// 只给日期不给时刻：仍要能用（缺省由下游补正午），不能因为新加的时分校验被误伤
const zDate = E.compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male', asOf: '2026-06-01' });
eq('asOf 只给日期仍然可用', zDate.liunian[0].year, 2026);

// ── ② asOf 的时分也要校验 ───────────────────────────────────
eq('asOf 小时越界报 E_ASOF', codeOf(() => E.compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male', asOf: '2026-06-01T25:99' })), 'E_ASOF');
eq('asOf 分钟越界报 E_ASOF', codeOf(() => E.compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male', asOf: '2026-06-01T10:60' })), 'E_ASOF');
ok('asOf 合法时刻仍通过', (() => {
  const r = E.compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male', asOf: '2026-06-01T23:30' });
  return r.asOf.hour === 23 && r.asOf.minute === 30;
})());

// ── ③ 经度守卫 ─────────────────────────────────────────────
const B = { system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male' };
eq('longitude=Infinity 报 E_RANGE', codeOf(() => E.compute({ ...B, longitude: 1e999 })), 'E_RANGE');
eq('longitude=NaN 报 E_RANGE', codeOf(() => E.compute({ ...B, longitude: NaN })), 'E_RANGE');
eq('longitude=181 报 E_RANGE', codeOf(() => E.compute({ ...B, longitude: 181 })), 'E_RANGE');
eq('longitude="abc" 报 E_RANGE', codeOf(() => E.compute({ ...B, longitude: 'abc' })), 'E_RANGE');
const lonStr = E.compute({ ...B, longitude: '86.0' });
const lonNum = E.compute({ ...B, longitude: 86 });
const lonNone = E.compute({ ...B });
ok('数字串经度已生效（与数字版同盘）', JSON.stringify(lonStr.pillars) === JSON.stringify(lonNum.pillars));
ok('数字串经度不再等于「不给经度」', JSON.stringify(lonStr.pillars) !== JSON.stringify(lonNone.pillars));
eq('合盘对方经度越界点名对方', codeOf(() => E.compute({
  system: 'hepan', datetime: '1990-05-12T14:30', gender: 'male',
  partner: { datetime: '1992-03-03T10:00', gender: 'female', longitude: 999 },
})), 'E_RANGE');

// ── ④ 生时校正：事件条数、年份、候选时辰都要有边 ────────────
const many = Array.from({ length: 200000 }, (_, i) => ({ year: 1990 + (i % 40), kind: 'career' }));
eq('events 超上限报 E_INPUT', codeOf(() => E.compute({ ...B, rectify: true, events: many })), 'E_INPUT');
eq('events 年份离谱报 E_INPUT', codeOf(() => E.compute({ ...B, rectify: true, events: [{ year: -999999 }] })), 'E_INPUT');
const flooded = E.compute({ ...B, rectify: true, events: [{ year: 2019, kind: 'career' }], rectifyHours: Array.from({ length: 5000 }, () => 3) });
ok('候选时辰去重后不再灌水', flooded.rectify.candidates.length <= 24, `${flooded.rectify.candidates.length} 个候选`);
const normal = E.compute({ ...B, rectify: true, events: [{ year: 2019, kind: 'career' }, { year: 2022, kind: 'love' }] });
eq('默认候选时辰仍是 14 个', normal.rectify.candidates.length, 14);

// ── ⑤ 择日 days ────────────────────────────────────────────
const daysLen = (v) => {
  try {
    return E.compute({ system: 'zeri', task: '嫁娶', startDate: '2026-06-01', days: v }).days.length;
  } catch (e) {
    return e && e.code ? e.code : `BARE:${e.message}`.slice(0, 40);
  }
};
eq('days="45" 排 45 天（不再静默降成 30）', daysLen('45'), 45);
eq('days=45 排 45 天', daysLen(45), 45);
eq('days 缺省仍是 30 天', daysLen(undefined), 30);
eq('days=45.5 报 E_INPUT', daysLen(45.5), 'E_INPUT');
eq('days=0 报 E_INPUT', daysLen(0), 'E_INPUT');
eq('days=999 报 E_INPUT', daysLen(999), 'E_INPUT');
eq('days="abc" 报 E_INPUT', daysLen('abc'), 'E_INPUT');

// ── ⑥ 句柄增量：坏键换不掉原型，好键照常覆盖 ────────────────
const handle = E.compute(B).handle;
const polluted = JSON.parse(`{"handle":"${handle}","__proto__":{"withInterpret":true,"gender":"female"}}`);
const merged = H.resolveHandle(polluted);
ok('__proto__ 增量不替换对象原型', Object.getPrototypeOf(merged) === Object.prototype);
eq('被拦下的键不会变成参数', merged.withInterpret, undefined);
const okMerge = H.resolveHandle({ handle, gender: 'female' });
eq('正常增量仍然覆盖', okMerge.gender, 'female');
eq('句柄里的其余参数沿用', okMerge.datetime, '1990-05-12T14:30');

// ── ⑦ 工具 schema：不许有重名键 ─────────────────────────────
const props = def.parameters.properties;
ok('mode 同时给出三组取值', ['solar2lunar', 'lunar2solar', 'time', 'number'].every((v) => props.mode.enum.includes(v)), JSON.stringify(props.mode.enum));
ok('mode 描述点名三套体系', /convert/.test(props.mode.description) && /meihua/.test(props.mode.description) && /xiaoliuren/.test(props.mode.description));
const srcText = fs.readFileSync(path.resolve(import.meta.dirname, '../index.js'), 'utf8');
const block = srcText.slice(srcText.indexOf('properties: {', srcText.indexOf('parameters')), srcText.indexOf("required: ['system']"));
const staticKeys = [...block.matchAll(/^ {8}([A-Za-z_][A-Za-z0-9_]*)\s*:\s*\{/gm)].map((m) => m[1]);
const dup = staticKeys.filter((k, i) => staticKeys.indexOf(k) !== i);
eq('properties 里没有重复键（两个 mode 曾互相覆盖）', dup.length, 0);
eq('静态键数与运行时属性数一致', staticKeys.length, Object.keys(props).length);

// ── ⑧ 联网解析：风水不该发包，失败结果不进缓存 ──────────────
// 地址一律写到区县：geocodeAddress 对「内置表已命中的地级市」不发包（那是它自己的省流策略），
// 只有 DETAIL（区/县/镇…）或内置表没命中才会真联网。用市级地址的话这几条断言是空跑。
let calls = 0;
globalThis.fetch = async () => {
  calls += 1;
  return { ok: true, json: async () => [{ lon: '75.98932', lat: '39.47041', display_name: '疏附县, 喀什地区, 新疆' }] };
};
const fz = await def.execute({ system: 'fengshui', datetime: '1990-05-12T14:30', gender: 'male', address: '新疆喀什地区疏附县', geocode: 'online' });
ok('fengshui 不再把出生地发给第三方', calls === 0, `fetch 调用 ${calls} 次`);
ok('fengshui 盘面不受经度影响', !!fz.mingGua);

const F1 = await def.execute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '湖南长沙市雨花区', geocode: 'online' });
ok('bazi 联网解析成功并采用', F1.input.geo && F1.input.geo.level === '在线', F1.input.geo && F1.input.geo.level);
ok('联网请求确实发出去了', calls > 0, `fetch 调用 ${calls} 次`);
// 换成失败的 fetch：不应因为上一轮的成功缓存而跳过请求（这条只验失败不写缓存）
globalThis.fetch = async () => { calls += 1; throw new Error('网络不可达'); };
const badGeo = await def.execute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '云南普洱市思茅区', geocode: 'online' });
const callsAfterFail = calls;
ok('失败时退回内置表并标注', !!(badGeo.input.geo && badGeo.input.geo.onlineFailed), JSON.stringify(badGeo.input.geo && badGeo.input.geo.level));
globalThis.fetch = async () => {
  calls += 1;
  return { ok: true, json: async () => [{ lon: '100.97', lat: '22.78', display_name: '思茅区, 普洱市, 云南' }] };
};
const retry = await def.execute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '云南普洱市思茅区', geocode: 'online' });
ok('失败没进缓存：网络恢复后立刻重试', calls > callsAfterFail, `calls ${callsAfterFail} → ${calls}`);
ok('重试后拿到在线结果', retry.input.geo && retry.input.geo.level === '在线', JSON.stringify(retry.input.geo && retry.input.geo.level));

// ── ⑨ 自由文本长度：会整段进句柄，必须设边 ──────────────────
const longAddr = await def.execute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '甲'.repeat(60000) })
  .then(() => 'ACCEPTED').catch((e) => String(e.message).slice(0, 9));
eq('超长地址报 E_INPUT', longAddr, '[E_INPUT]');
const shortAddr = await def.execute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '河北石家庄' });
ok('正常地址不受影响', typeof shortAddr.input.longitude === 'number', String(shortAddr.input.longitude));
