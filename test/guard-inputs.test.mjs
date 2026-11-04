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
const { drawTarot } = await import('../engine/tarot.js');
const { buildLiuyao } = await import('../engine/liuyao.js');
const { buildMeihua } = await import('../engine/meihua.js');
const { buildFengshui } = await import('../engine/fengshui.js');
const { buildName } = await import('../engine/name.js');
const { buildZeri } = await import('../engine/zeri.js');
const { buildXiaoliuren } = await import('../engine/xiaoliuren.js');
const { buildStar } = await import('../engine/star.js');
const { buildNumerology } = await import('../engine/numerology.js');

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
eq('默认候选按盘面合并为 12 组', normal.rectify.candidates.length, 12);
// 上面两条只管「条数」，窗口本身的宽度与起点没人管：
//   · 出生 1990、事件 1985 照样进窗口计分（age 为负的流年行永远查不到，却混在命中率里）；
//   · [{year:1601},{year:2399}] 两个年份就让每个候选摊上 799 年流年，实测 1267ms（30 年跨度 9ms）。
const rectMsg = (fn) => {
  try { fn(); return 'ACCEPTED'; } catch (e) { return `[${(e && e.code) || 'BARE'}] ${(e && e.message) || e}`; }
};
const EARLY = { base: { year: 1600, month: 1, day: 1 }, gender: 'male' };
const B90 = { base: { year: 1990, month: 5, day: 12 }, gender: 'male' };
const preMsg = rectMsg(() => E.rectifyBirth({ ...B90, events: [{ year: 1985, kind: 'career' }] }));
ok('出生前的事件报 E_INPUT（不再混进命中率）', preMsg.startsWith('[E_INPUT]'), preMsg);
ok('出生前事件点名年份与出生年', /早于出生年 1990/.test(preMsg) && /1985/.test(preMsg), preMsg);
ok('出生当年的事件不算早于出生', E.rectifyBirth({ ...B90, events: [{ year: 1990, kind: 'career' }] }).candidates[0].total === 1);
eq('事件跨度 799 年报 E_INPUT', codeOf(() => E.rectifyBirth({ ...EARLY, events: [{ year: 1601, kind: 'career' }, { year: 2399, kind: 'wealth' }] })), 'E_INPUT');
const spanMsg = rectMsg(() => E.rectifyBirth({ ...EARLY, events: [{ year: 1601, kind: 'career' }, { year: 2399, kind: 'wealth' }] }));
ok('跨度文案点出实算区间与上限', /1601–2399 共 799 年/.test(spanMsg) && /最多 120 年/.test(spanMsg), spanMsg);
const legalSpan = E.rectifyBirth({ ...EARLY, events: [{ year: 1601, kind: 'career' }, { year: 1720, kind: 'wealth' }] });
ok('120 年整窗仍放行（上限不误伤）', legalSpan.candidates.length >= 12, legalSpan.candidates.length);
ok('窗口文案与实算区间同源', /1601–1720 年逐年对账（共 120 年）/.test(legalSpan.note), (legalSpan.note || '').slice(0, 90));

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
const block = srcText.slice(srcText.indexOf('properties: {', srcText.indexOf('parameters')), srcText.indexOf('// 不写 required'));
const staticKeys = [...block.matchAll(/^ {8}([A-Za-z_][A-Za-z0-9_]*)\s*:\s*\{/gm)].map((m) => m[1]);
const dup = staticKeys.filter((k, i) => staticKeys.indexOf(k) !== i);
eq('properties 里没有重复键（两个 mode 曾互相覆盖）', dup.length, 0);
eq('静态键数与运行时属性数一致', staticKeys.length, Object.keys(props).length);
ok('schema 不再把 system 写成 required（只传 handle 的追问不该被宿主先拦）',
  !Array.isArray(def.parameters.required) || !def.parameters.required.includes('system'), JSON.stringify(def.parameters.required));
// hour / date 只有称骨与小六壬读：其它体系收到就报错，不能静默忽略
let hourMsg = '';
try {
  await def.execute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', hour: 14 });
} catch (e) { hourMsg = e.message || String(e); }
ok('bazi 收到 hour 报 E_INPUT', hourMsg.startsWith('[E_INPUT]'), hourMsg);
let dateMsg = '';
try {
  await def.execute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', date: '1990-05-13' });
} catch (e) { dateMsg = e.message || String(e); }
ok('bazi 收到 date 报 E_INPUT', dateMsg.startsWith('[E_INPUT]'), dateMsg);
// 只带 handle 的追问是文档主推用法，工具层要放行
const onlyHandle = await def.execute({ handle: E.compute(B).handle });
ok('只传 handle 也能排盘', onlyHandle.system === 'bazi' && !!onlyHandle.summary, onlyHandle.system);

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

// ── ⑩ fortuneYear：只收整数，小数不能悄悄落到另一运 ────────
const fyArgs = { system: 'fengshui', action: 'xuankong', sitting: '子' };
eq('fortuneYear 小数报 E_INPUT', codeOf(() => E.compute({ ...fyArgs, fortuneYear: 2026.5 })), 'E_INPUT');
eq('fortuneYear 非数字报 E_INPUT', codeOf(() => E.compute({ ...fyArgs, fortuneYear: 'abc' })), 'E_INPUT');
ok('fortuneYear 数字串仍按整数年份处理', (() => {
  const r = E.compute({ ...fyArgs, fortuneYear: '2026' });
  return r.meta && r.meta.periodLabel === '9运（2024–2043）';
})());

// ── ⑪ 引擎层入参守卫：空参数 / 爻数不对 / 张数不对 ──────────
eq('塔罗张数 2 报 E_INPUT', codeOf(() => drawTarot({ count: 2 })), 'E_INPUT');
eq('塔罗张数 4 报 E_INPUT', codeOf(() => drawTarot({ count: 4 })), 'E_INPUT');
eq('六爻空参数报 E_INPUT', codeOf(() => buildLiuyao(null)), 'E_INPUT');
// 爻值这一族（个数不对 / 值不在 6–9）两层同码 E_LINES：
// 以前引擎报 E_INPUT、宿主报 E_LINES，同一个错换个入口进来码不一样，调用方只能按文案猜
eq('六爻 5 个爻值报 E_LINES', codeOf(() => buildLiuyao({ lines: [7, 8, 7, 8, 7] })), 'E_LINES');
eq('六爻爻值 5 报 E_LINES', codeOf(() => buildLiuyao({ lines: [7, 8, 7, 8, 5, 7] })), 'E_LINES');
eq('梅花空参数报 E_INPUT', codeOf(() => buildMeihua(null)), 'E_INPUT');
eq('梅花无参数报 E_INPUT', codeOf(() => buildMeihua()), 'E_INPUT');
eq('风水空参数报 E_INPUT', codeOf(() => buildFengshui(null)), 'E_INPUT');
eq('起名空参数报 E_INPUT', codeOf(() => buildName(null)), 'E_INPUT');
eq('择日空参数报 E_INPUT', codeOf(() => buildZeri(null)), 'E_INPUT');
eq('小六壬空参数报 E_INPUT', codeOf(() => buildXiaoliuren(null)), 'E_INPUT');
eq('星座缺生日报 E_INPUT', codeOf(() => buildStar(null)), 'E_INPUT');
eq('生命数字缺生日报 E_INPUT', codeOf(() => buildNumerology(null)), 'E_INPUT');

// ── ⑫ 日期一律过共享日历：不存在、越界都 E_INPUT，不静默滚到另一天 ──
eq('择日 startDate 2 月 30 日报 E_INPUT', codeOf(() => E.compute({ system: 'zeri', task: '嫁娶', startDate: '2026-02-30' })), 'E_INPUT');
eq('择日 startDate 13 月报 E_INPUT', codeOf(() => E.compute({ system: 'zeri', task: '嫁娶', startDate: '2026-13-01' })), 'E_INPUT');
eq('小六壬不存在日期报 E_INPUT', codeOf(() => E.compute({ system: 'xiaoliuren', date: '2026-02-30', hour: 10 })), 'E_INPUT');
eq('梅花时间起卦 2 月 30 日报 E_INPUT', codeOf(() => E.compute({ system: 'meihua', mode: 'time', datetime: '1990-02-30T10:00' })), 'E_INPUT');
eq('梅花 25:00 报 E_INPUT', codeOf(() => E.compute({ system: 'meihua', mode: 'time', datetime: '1990-05-06T25:00' })), 'E_INPUT');
eq('梅花 1600 年前报 E_RANGE', codeOf(() => E.compute({ system: 'meihua', mode: 'time', datetime: '0001-01-01T10:00' })), 'E_RANGE');

// ── ⑬ 晚子时口径统一：称骨/小六壬/梅花也随 lateZi 换日 ────────
const lateA = E.compute({ system: 'chenggu', datetime: '1990-05-06T23:30', lateZi: true });
const lateB = E.compute({ system: 'chenggu', datetime: '1990-05-06T23:30', lateZi: false });
ok('称骨 23:30 换日与不换日差一天', lateA.lunar.day !== lateB.lunar.day, `${lateA.lunar.day} / ${lateB.lunar.day}`);
ok('称骨两口径骨重不同', lateA.total.qian !== lateB.total.qian, `${lateA.total.qian} / ${lateB.total.qian}`);
const xA = E.compute({ system: 'xiaoliuren', datetime: '1990-05-06T23:30', lateZi: true });
const xB = E.compute({ system: 'xiaoliuren', datetime: '1990-05-06T23:30', lateZi: false });
ok('小六壬 23:30 换日与不换日落宫不同', xA.steps.join('') !== xB.steps.join(''), `${xA.steps.join('')} / ${xB.steps.join('')}`);
ok('小六壬摘要写明晚子时口径', /晚子时按次日/.test(xA.meta.originText) && !/晚子时按次日/.test(xB.meta.originText));
const mA = E.compute({ system: 'meihua', mode: 'time', datetime: '1990-05-06T23:30', lateZi: true });
const mB = E.compute({ system: 'meihua', mode: 'time', datetime: '1990-05-06T23:30', lateZi: false });
ok('梅花 23:30 换日与不换日农历日不同', /13日/.test(mA.source) && /12日/.test(mB.source), `${mA.source} / ${mB.source}`);
ok('梅花两口径本卦不同', mA.ben.name !== mB.ben.name, `${mA.ben.name} / ${mB.ben.name}`);

// ── ⑭ schema 覆盖面：引擎会读的用户参数必须在工具 schema 里声明 ───────
// 起因：0.61.2 的 schema 连 lower / changing 都没有，本轮补上 lower 后仍漏 upper——
// mode 的说明写着「数字起卦需 upper/lower」，engine 也真读 args.upper，宿主照 schema 组参
// 就只能拿到「数字起卦需要两个数字」。逐键对拍，漏一个就转红。
const engSrcText = fs.readFileSync(path.resolve(import.meta.dirname, '../engine/index.js'), 'utf8');
// 例外：geo / shadowVersion 由宿主层派生后注入，schools 是平铺流派键的旧嵌套写法（工具面只认平铺）
const HOST_INTERNAL = new Set(['geo', 'shadowVersion', 'schools']);
const engineRead = [...new Set([...engSrcText.matchAll(/\bargs\.([A-Za-z_$][\w$]*)/g)].map((m) => m[1]))]
  .filter((k) => !HOST_INTERNAL.has(k));
const schemaMissing = engineRead.filter((k) => !props[k]);
ok('引擎读的用户键全部在 schema 里声明', schemaMissing.length === 0, `缺 ${schemaMissing.join('/')}`);
// 扫不到键时上面这条会空过，所以给清单本身设个下限：改动 args 的写法（解构、改名）要 here 就转红
ok('读键清单非空', engineRead.length >= 60, `${engineRead.length} 个`);
ok('梅花数字起卦三键齐备', ['upper', 'lower', 'changing'].every((k) => !!props[k]), JSON.stringify(['upper', 'lower', 'changing'].filter((k) => !props[k])));
ok('name 的分段生辰键齐备（year/month/day/hour/minute）', ['year', 'month', 'day', 'hour', 'minute'].every((k) => !!props[k]));
const meihuaNum = await def.execute({ system: 'meihua', mode: 'number', upper: 3, lower: 5 });
ok('按 schema 组参能起出数字卦', meihuaNum.ben && meihuaNum.ben.upper && meihuaNum.ben.lower, JSON.stringify(meihuaNum.ben || null));

// ── ⑮ 只收日期的体系也要过年份闸 ────────────────────────────────
// 起因：parseDateTime 早就有 1600–2400 这道闸，parseYmd 却只查月/日，小六壬与择日成了两条旁路：
// date:'0000-01-01' / '2500-06-01' / '9999-12-31' 静默出盘（历表覆盖不到的外推值）。
// 择日更绕：起算日合法、区间扫到 2401 时由 buildAlmanac 报错，文案是「黄历 的 year 超出支持范围」——
// 用户填的是 startDate，跟黄历没关系。
// 晚子时换日同理：2400-12-31T23:30 过校验后被整体搬到 2401 出盘，而直填 2401-01-01T00:30 会被拒。
const msgOf = (fn) => {
  try { fn(); return 'ACCEPTED'; } catch (e) { return `[${(e && e.code) || 'BARE'}] ${(e && e.message) || e}`; }
};
const V = await import('../engine/validate.js');
for (const d of ['0000-01-01', '1500-01-01', '2500-06-01', '9999-12-31']) {
  eq(`小六壬 date ${d} 越界报 E_RANGE`, codeOf(() => E.compute({ system: 'xiaoliuren', date: d, hour: 10 })), 'E_RANGE');
}
ok('小六壬两端点（MIN/MAX 年）仍可排', [V.MIN_YEAR, V.MAX_YEAR].every((y) => codeOf(() => E.compute({ system: 'xiaoliuren', date: `${y}-06-01`, hour: 10 })) === 'ACCEPTED'));
eq('闸的下限就是 validate 的 MIN_YEAR', codeOf(() => E.compute({ system: 'xiaoliuren', date: `${V.MIN_YEAR - 1}-01-01`, hour: 10 })), 'E_RANGE');
eq('闸的上限就是 validate 的 MAX_YEAR', codeOf(() => E.compute({ system: 'xiaoliuren', date: `${V.MAX_YEAR + 1}-01-01`, hour: 10 })), 'E_RANGE');
ok('小六壬 2 月 30 日仍按「不存在」报 E_INPUT（闸不抢答）', codeOf(() => E.compute({ system: 'xiaoliuren', date: '2026-02-30', hour: 10 })) === 'E_INPUT');
const zOver = msgOf(() => E.compute({ system: 'zeri', task: '嫁娶', startDate: `${V.MAX_YEAR + 1}-01-01` }));
ok('择日越界点名 startDate 且保留 E_RANGE', /^\[E_RANGE\]/.test(zOver) && /startDate/.test(zOver), zOver);
ok('择日越界不再甩锅黄历', !/黄历/.test(zOver), zOver);
const cOver = msgOf(() => E.compute({ system: 'zeri', task: '嫁娶', candidates: ['2026-12-01', `${V.MIN_YEAR - 1}-01-01`] }));
ok('候选日越界点名候选日、不提黄历', /^\[E_RANGE\]/.test(cOver) && /候选日/.test(cOver) && !/黄历/.test(cOver), cOver);
const span = msgOf(() => E.compute({ system: 'zeri', task: '嫁娶', startDate: `${V.MAX_YEAR}-12-30`, days: 3 }));
ok('起算日合法但区间扫出表外也拦得住', /^\[E_RANGE\]/.test(span) && /择日区间/.test(span) && !/黄历/.test(span), span);
eq('正好收在 MAX_YEAR-12-30 的区间不误伤', codeOf(() => E.compute({ system: 'zeri', task: '嫁娶', startDate: `${V.MAX_YEAR}-12-01`, days: 30 })), 'ACCEPTED');
for (const [sys, args] of [
  ['梅花', { system: 'meihua', mode: 'time', datetime: `${V.MAX_YEAR}-12-31T23:30` }],
  ['小六壬', { system: 'xiaoliuren', date: `${V.MAX_YEAR}-12-31`, hour: 23 }],
  ['称骨', { system: 'chenggu', datetime: `${V.MAX_YEAR}-12-31T23:30`, gender: 'male' }],
]) {
  eq(`${sys}晚子时换日换出表外报 E_RANGE`, codeOf(() => E.compute(args)), 'E_RANGE');
  ok(`${sys}越界文案说清是换日所致`, /晚子时按次日归后/.test(msgOf(() => E.compute(args))), msgOf(() => E.compute(args)));
  eq(`${sys}同日时前（22:59）照常出盘`, codeOf(() => E.compute({ ...args, datetime: args.datetime ? `${V.MAX_YEAR}-12-31T22:59` : undefined, hour: args.hour === 23 ? 22 : undefined })), 'ACCEPTED');
}
const dtSrc = fs.readFileSync(path.resolve(import.meta.dirname, '../engine/datetime.js'), 'utf8');
ok('datetime.js 的年份闸复用 validate 的常量，不另写数字', (dtSrc.match(/year < MIN_YEAR \|\| (?:out\.)?year > MAX_YEAR/g) || []).length === 2, dtSrc.match(/year < .{0,40}MAX_YEAR.{0,4}/g));
ok('数字卦与引擎直连同卦', JSON.stringify(meihuaNum.ben) === JSON.stringify(E.compute({ system: 'meihua', mode: 'number', upper: 3, lower: 5 }).ben));

// ── ⑯ 次级入口的形状守卫：不许裸 TypeError，也不许静默凑一张盘 ──────────
// 上一轮只补了 7 个 build* 主入口。引擎其余导出函数（取卦体、定用神、塔罗解牌、起名、
// 公农历互转）仍直接读 hex.lower / opts.direction / input.surname，传错形状时调用方
// 只看见 "Cannot read properties of null"，不知道是哪个键、该传什么。
// 更坏的是 buildLiuyao({ lines: '7,8,9,6,7,8' })：字符串在 Array.isArray 上是 false，
// 于是当成「没给爻」走随机摇卦——问的是排好的固定卦，答的是另一次掷钱的结果。
const LY = await import('../engine/liuyao.js');
const TR = await import('../engine/tarot.js');
const NM = await import('../engine/name.js');
const CV = await import('../engine/convert.js');
const chart = LY.buildLiuyao({ lines: [7, 8, 9, 6, 7, 8], question: '守卫自测' });
const BAD_SHAPES = [
  ['hexagramFromBits(null)', () => LY.hexagramFromBits(null), /6 个爻位/],
  ['hexagramFromBits(2 项)', () => LY.hexagramFromBits([1, 2]), /6 个爻位/],
  ['hexBody(null)', () => LY.hexBody(null), /upper/],
  ['bodyRelations(null)', () => LY.bodyRelations(null), /静卦时 bian 传 null/],
  ['bodyRelations(本卦, "既济")', () => LY.bodyRelations(chart.ben, '既济'), /卦对象或 null/],
  ['yongshenOf(盘, "求财")', () => LY.yongshenOf(chart, '求财'), /direction/],
  ['tarotReading(null)', () => TR.tarotReading(null), /cards/],
  ['tarotReading({ cards: "塔" })', () => TR.tarotReading({ cards: '塔' }), /drawTarot/],
  ['assessName(null)', () => NM.assessName(null), /surname/],
  ['generateNames(null)', () => NM.generateNames(null), /surname/],
  ['buildConvert(null)', () => CV.buildConvert(null), /lunarYear/],
];
for (const [label, fn] of BAD_SHAPES) {
  eq(`${label} 报 E_INPUT`, codeOf(fn), 'E_INPUT');
}
// 光说「收到 string」不够：文案必须同时写清该传什么，否则调用方还得回头读源码
ok('E_INPUT 文案既说收到什么、也说该传什么',
  BAD_SHAPES.every(([, fn, re]) => /收到/.test(msgOf(fn)) && re.test(msgOf(fn))),
  BAD_SHAPES.filter(([, fn, re]) => !(/收到/.test(msgOf(fn)) && re.test(msgOf(fn)))).map(([w, , re]) => `${w}↛${re}`).join(' / '));
// 守卫只挡错形状：把 null 当「省略」处理，别把正常调用一并否掉
ok('yongshenOf 的 opts 传 null 等同省略', JSON.stringify(LY.yongshenOf(chart, null)) === JSON.stringify(LY.yongshenOf(chart)));
ok('bodyRelations 静卦（bian 传 null）照常出', LY.bodyRelations(chart.ben, null, []).ben.name === chart.ben.name);
ok('hexagramFromBits 满 6 爻仍排得出卦', !!LY.hexagramFromBits([1, 0, 1, 0, 1, 0]).name);
ok('tarotReading 收到真牌面仍出解读', TR.tarotReading({ question: '守卫自测', cards: drawTarot({ count: 3, random: () => 0.5 }).cards }).length > 1);
eq('lines 传字符串不再静默随机摇卦', codeOf(() => LY.buildLiuyao({ lines: '7,8,9,6,7,8' })), 'E_LINES');
eq('lines 传数字同理', codeOf(() => LY.buildLiuyao({ lines: 789678 })), 'E_LINES');
eq('lines 传对象同理', codeOf(() => LY.buildLiuyao({ lines: { a: 1 } })), 'E_LINES');
// 引擎与宿主同口径：爻值这一族错误只有一个码，宿主层不必按文案二次判该转成什么
eq('引擎层爻值越界也是 E_LINES', codeOf(() => LY.buildLiuyao({ lines: [1, 2, 3, 4, 5, 6] })), 'E_LINES');
eq('引擎层 lines 长度不足也是 E_LINES', codeOf(() => LY.buildLiuyao({ lines: [7, 8, 9] })), 'E_LINES');
ok('E_LINES 文案点明要 6 个爻值', /6 个爻值/.test(msgOf(() => LY.buildLiuyao({ lines: 789678 }))), msgOf(() => LY.buildLiuyao({ lines: 789678 })));
eq('工具层非数组 lines 也保 E_LINES（不被压成 E_INPUT）', codeOf(() => E.compute({ system: 'liuyao', lines: 789678 })), 'E_LINES');
eq('工具层 5 个爻仍报 E_LINES', codeOf(() => E.compute({ system: 'liuyao', lines: [7, 8, 9, 6, 7] })), 'E_LINES');
ok('留空 lines 仍走随机摇卦（守卫不抢这条）', codeOf(() => E.compute({ system: 'liuyao', seed: 42 })) === 'ACCEPTED');

// ⑰ 晚子时换日跨 1600–2400：所有会换日的体系必须同一把尺。
// 反例：2400-12-31T23:30 在八字/大六壬/奇门(next-day)/紫微(next-day) 会被整体搬到 2401，
// 而直填 2401-01-01 早被 E_RANGE 拒——「换日就通、直填就拒」是同一张盘的两套资格。
const SHIFT_CASES = [
  ['八字', { system: 'bazi', datetime: '2400-12-31T23:30', gender: 'male' }],
  ['大六壬', { system: 'daliuren', datetime: '2400-12-31T23:30' }],
  ['奇门 next-day', { system: 'qimen', datetime: '2400-12-31T23:30', lateZiHourMode: 'next-day' }],
  ['紫微 next-day', { system: 'ziwei', datetime: '2400-12-31T23:30', gender: 'male', lateZishi: 'next-day' }],
];
for (const [label, args] of SHIFT_CASES) {
  eq(`${label} 晚子时换日越界 → E_RANGE`, codeOf(() => E.compute(args)), 'E_RANGE');
  const msg = msgOf(() => E.compute(args));
  ok(`${label} 越界文案点名「晚子时按次日归后」与范围`,
    /晚子时按次日归后/.test(msg) && /1600–2400/.test(msg), msg);
}
ok('八字 22:30 照旧可排', codeOf(() => E.compute({ system: 'bazi', datetime: '2400-12-31T22:30', gender: 'male' })) === 'ACCEPTED');
ok('八字显式 lateZi:false 不换日可排', codeOf(() => E.compute({ system: 'bazi', datetime: '2400-12-31T23:30', gender: 'male', lateZi: false })) === 'ACCEPTED');
ok('奇门 same-day 不换日可排', codeOf(() => E.compute({ system: 'qimen', datetime: '2400-12-31T23:30' })) === 'ACCEPTED');
ok('紫微默认 current-day 不换日可排', codeOf(() => E.compute({ system: 'ziwei', datetime: '2400-12-31T23:30', gender: 'male' })) === 'ACCEPTED');

// ⑱ 农历 2400 年末换到公历 2401：报「换算得到的目标公历越界」，不甩锅黄历。
const convMsg = msgOf(() => E.compute({ system: 'convert', mode: 'lunar2solar', lunarYear: 2400, lunarMonth: 12, lunarDay: 29 }));
eq('农历 2400-12-29 换算公历越界 → E_RANGE', codeOf(() => E.compute({ system: 'convert', mode: 'lunar2solar', lunarYear: 2400, lunarMonth: 12, lunarDay: 29 })), 'E_RANGE');
ok('convert 越界文案点名公历与范围、不提黄历',
  /公历日期/.test(convMsg) && /1600–2400/.test(convMsg) && !/黄历/.test(convMsg), convMsg);
ok('农历 2400-11-01 仍可换算（边界内）', codeOf(() => E.compute({ system: 'convert', mode: 'lunar2solar', lunarYear: 2400, lunarMonth: 11, lunarDay: 1 })) === 'ACCEPTED');
