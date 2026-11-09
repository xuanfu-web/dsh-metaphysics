// 开关的写法不该改变盘面：JSON 传参里 true / "true" / 1 都出现过，
// false / "false" / 0 同理。引擎里曾用 `!== false` 读开关（只认字面 false），
// 于是 trueSolar:"false" 排出「开真太阳时」的盘，而句柄照着原文写 false——
// 同一张盘两个身份：影子盘对拍、深链回放、跨版本 diff 全跟着错。
//
// 这里按体系 × 开关 × 写法做整盘比对（含句柄与影子盘 ID），一处不一致就说明
// 某个引擎里还留着只认字面布尔的读法。
import { compute } from '../engine/index.js';
import { canonicalFlags } from '../engine/bool.js';
import { buildZiwei } from '../engine/ziwei.js';
import { ok } from './_harness.mjs';

const BASE = {
  bazi: { system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '安徽池州' },
  // asOf 钉死：紫微的 flow 默认读本机当前时刻，两次调用跨分钟就会差 1 分钟，
  // 这不是开关归一的问题，而是测试自己引入了时钟噪声。
  ziwei: { system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male', address: '安徽池州', asOf: '2026-03-01T10:00' },
  liuyao: { system: 'liuyao', datetime: '2026-03-01T10:00', seed: 7 },
  meihua: { system: 'meihua', datetime: '2026-03-01T10:00' },
  daliuren: { system: 'daliuren', datetime: '2026-03-01T10:00' },
  qimen: { system: 'qimen', datetime: '2026-03-01T10:00' },
  hepan: {
    system: 'hepan', datetime: '1990-05-12T14:30', gender: 'male', address: '安徽池州',
    partner: { datetime: '1992-08-03T09:00', gender: 'female', address: '江苏南京' },
  },
  trend: { system: 'trend', datetime: '1990-05-12T14:30', gender: 'male', address: '安徽池州' },
  fengshui: { system: 'fengshui', datetime: '1988-06-01T10:00', gender: 'male' },
  chenggu: { system: 'chenggu', datetime: '1990-05-12T14:30' },
  xiaoliuren: { system: 'xiaoliuren', datetime: '2026-03-01T10:00' },
  zeri: { system: 'zeri', datetime: '2026-03-01T10:00' },
  almanac: { system: 'almanac', datetime: '2026-03-01T10:00' },
  star: { system: 'star', datetime: '1990-05-12T14:30' },
  numerology: { system: 'numerology', datetime: '1990-05-12T14:30' },
  tarot: { system: 'tarot', datetime: '2026-03-01T10:00', seed: 3 },
  name: { system: 'name', surname: '辛', givenName: '秋林', gender: 'male', datetime: '1996-01-05T08:30' },
  convert: { system: 'convert', datetime: '2026-03-01T10:00', mode: 'solar2lunar' },
};

// schema 里声明成 boolean 的顶层开关
const FLAGS = ['lateZi', 'trueSolar', 'dst', 'hourUnknown', 'cross', 'shadow', 'trace', 'rectify', 'withInterpret', 'diff'];
const PAIRS = [['"true"', 'true', true], ['1', 1, true], ['"false"', 'false', false], ['0', 0, false]];
// 每次调用都会变的字段（当下时刻、Δt 精度提示），比对前剔除
const VOLATILE = ['castAt', 'thisYear', 'asOf', 'precision'];

function chart(base, extra) {
  let r;
  try {
    r = JSON.parse(JSON.stringify(compute({ ...base, ...extra })));
  } catch (e) {
    return { error: e.code || String(e.message) };
  }
  for (const k of VOLATILE) delete r[k];
  return r;
}

/** 列出两份结果里取值不同的顶层键，用于失败时定位 */
function keysDiffering(a, b) {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  return [...keys].filter((k) => JSON.stringify(a[k]) !== JSON.stringify(b[k]));
}

for (const [name, base] of Object.entries(BASE)) {
  const bad = [];
  for (const flag of FLAGS) {
    for (const [label, written, canonical] of PAIRS) {
      const a = chart(base, { [flag]: written });
      const b = chart(base, { [flag]: canonical });
      if (JSON.stringify(a) === JSON.stringify(b)) continue;
      bad.push(`${flag}=${label}≠${canonical}（${keysDiffering(a, b).join('/') || a.error || b.error}）`);
    }
  }
  ok(`${name}：字符串/数字布尔与真布尔排同一张盘、同一句柄`,
    bad.length === 0, bad.slice(0, 4).join('；'));
}

// partner 里的开关同样要归一：合盘两侧各排一张八字，写错一个就变成两个人不同口径
{
  const base = BASE.hepan;
  const a = chart(base, { partner: { ...base.partner, trueSolar: 'false' } });
  const b = chart(base, { partner: { ...base.partner, trueSolar: false } });
  ok('合盘对方 trueSolar:"false" 与 false 同盘', JSON.stringify(a) === JSON.stringify(b),
    keysDiffering(a, b).join('/'));
  const c = chart(base, { partner: { ...base.partner, trueSolar: 'true' } });
  const d = chart(base, { partner: { ...base.partner, trueSolar: true } });
  ok('合盘对方 trueSolar:"true" 与 true 同盘', JSON.stringify(c) === JSON.stringify(d),
    keysDiffering(c, d).join('/'));

  // partner 里的 hourUnknown 同样要归一：字符串 "false" 不能因为落在 partner 里就绕过。
  const off = chart(base, { partner: { ...base.partner, hourUnknown: 'false' } });
  const realOff = chart(base, { partner: { ...base.partner, hourUnknown: false } });
  ok('合盘对方 hourUnknown:"false" 与 false 同盘',
    !off.error && JSON.stringify(off) === JSON.stringify(realOff),
    keysDiffering(off, realOff).join('/') || off.error || realOff.error);
  const on = chart(base, { partner: { ...base.partner, hourUnknown: 'true' } });
  const realOn = chart(base, { partner: { ...base.partner, hourUnknown: true } });
  ok('合盘对方 hourUnknown:"true" 与 true 同报 HOUR_UNKNOWN',
    on.error === 'HOUR_UNKNOWN' && realOn.error === 'HOUR_UNKNOWN',
    `${on.error || '未报错'} / ${realOn.error || '未报错'}`);
}

// 合盘 chart:'ziwei' 的晚子时：lateZi 必须映射到紫微的 lateZishi，
// 否则 `lateZi:false` 与 true 排出的合盘一字不差，而八字合盘同一开关却生效。
{
  const ziweiHepan = (lateZi) => compute({
    system: 'hepan', chart: 'ziwei',
    datetime: '2026-02-16T23:30', gender: 'male',
    partner: { datetime: '1995-02-10T09:00', gender: 'female' },
    trueSolar: false, withInterpret: false, lateZi,
  });
  const off = ziweiHepan(false);
  const on = ziweiHepan(true);
  const zOff = buildZiwei({
    year: 2026, month: 2, day: 16, hour: 23, minute: 30,
    gender: 'male', trueSolar: false, lateZishi: 'current-day',
  });
  const zOn = buildZiwei({
    year: 2026, month: 2, day: 16, hour: 23, minute: 30,
    gender: 'male', trueSolar: false, lateZishi: 'next-day',
  });
  ok('合盘紫微 lateZi:false 与单盘 current-day 同命宫',
    off.a.soul.branch === zOff.soul.branch, `${off.a.soul.branch} vs ${zOff.soul.branch}`);
  ok('合盘紫微 lateZi:true 与单盘 next-day 同命宫',
    on.a.soul.branch === zOn.soul.branch, `${on.a.soul.branch} vs ${zOn.soul.branch}`);
  ok('合盘紫微 lateZi 开/关是两张盘',
    off.a.soul.branch !== on.a.soul.branch, `${off.a.soul.branch} / ${on.a.soul.branch}`);
}

// 缺省口径不能因为「显式写了一次默认值」就换身份之外的东西：盘面必须一致
{
  const a = chart(BASE.bazi, {});
  const b = chart(BASE.bazi, { lateZi: true, trueSolar: true, dst: true });
  ok('显式写默认值与不写排出同一张盘', JSON.stringify(a.pillars) === JSON.stringify(b.pillars));
}

// 归一必须返回副本：调用方常把同一份 args 复用到多次排盘（面板、对拍、口径对照），
// 就地改写会把「上一张盘的开关」带进下一次调用。
{
  const frozen = Object.freeze({ ...BASE.bazi, trueSolar: 'false', withInterpret: 'false' });
  let threw = '';
  try { compute(frozen); } catch (e) { threw = e.code || String(e.message); }
  ok('compute 不改写入参（冻结的 args 也能跑）', threw === '', threw);
  ok('归一后原对象里的字符串保持原样', frozen.trueSolar === 'false' && frozen.withInterpret === 'false');

  const same = canonicalFlags({ system: 'bazi' });
  const sameAgain = { system: 'bazi' };
  ok('无改动时返回同一引用', canonicalFlags(sameAgain) === sameAgain);
  const mixed = canonicalFlags({ lateZi: 'off', dst: null });
  ok('无法识别的写法按默认口径归一', mixed.lateZi === true && mixed.dst === true, JSON.stringify(mixed));
  ok('归一不动入参', JSON.stringify(mixed) === '{"lateZi":true,"dst":true}');
}

// ── 数字：`count:"3"` 与 `count:3` 也是同一张盘、同一个身份 ──────────────
// 句柄直接编码参数原文，数字串会排出同一副牌却换一个句柄；更糟的有两处是真算错：
// 风水 period:"9" 被 1–9 校验拒掉（报错里写着「收到「9」」），
// 起名 strokeOverrides:{"秋":"9"} 被静默丢掉、五格退回字库笔画。
const NUM_CASES = [
  ['tarot count', { system: 'tarot', seed: 5 }, 'count', '3', 3],
  ['tarot seed', { system: 'tarot', count: 3 }, 'seed', '5', 5],
  ['trend toAge', { system: 'trend', datetime: '1990-05-12T14:30', gender: 'male' }, 'toAge', '30', 30],
  ['fengshui period', { system: 'fengshui', action: 'xuankong', sitting: '子' }, 'period', '9', 9],
  ['ziwei fortuneYear', { system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male' }, 'fortuneYear', '2026', 2026],
  ['zeri days', { system: 'zeri', startDate: '2026-03-01', task: '嫁娶' }, 'days', '7', 7],
  ['fengshui sittingDegree', { system: 'fengshui', action: 'xuankong', sitting: '子', period: 9 }, 'sittingDegree', '5', 5],
  ['convert lunarYear', { system: 'convert', mode: 'lunar2solar', lunarMonth: 2, lunarDay: 3 }, 'lunarYear', '2026', 2026],
];
for (const [label, base, key, written, canonical] of NUM_CASES) {
  const a = chart(base, { [key]: written });
  const b = chart(base, { [key]: canonical });
  // 两边都报同一个错也算「一致」，但这种用例什么也没锁住：明确要求这份输入排得出来
  ok(`${label}:"${written}" 与 ${canonical} 排同一张盘、同一句柄`,
    !a.error && JSON.stringify(a) === JSON.stringify(b),
    keysDiffering(a, b).join('/') || a.error || b.error);
}

// 数值数组：六爻爻值、报数起课、命卦整度
{
  const pairs = [
    ['liuyao lines', { system: 'liuyao', datetime: '2026-03-01T10:00' }, 'lines', ['7', '8', '9', '6', '7', '8'], [7, 8, 9, 6, 7, 8]],
    ['meihua upper', { system: 'meihua', mode: 'number', lower: 5 }, 'upper', '3', 3],
    ['meihua changing', { system: 'meihua', mode: 'number', upper: 3, lower: 5 }, 'changing', '2', 2],
    ['xiaoliuren num1', { system: 'xiaoliuren', mode: 'number', num2: 5, num3: 7 }, 'num1', '3', 3],
    ['mbti answers', { system: 'mbti' }, 'answers',
      [1, 2, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2].map(String),
      [1, 2, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2]],
    ['rectifyHours', { system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', rectify: true, events: [{ year: 2015, kind: 'career' }] }, 'rectifyHours', ['9', '10', '11'], [9, 10, 11]],
  ];
  for (const [label, base, key, written, canonical] of pairs) {
    const a = chart(base, { [key]: written });
    const b = chart(base, { [key]: canonical });
    ok(`${label} 数字串数组与数字数组同盘`, !a.error && JSON.stringify(a) === JSON.stringify(b),
      keysDiffering(a, b).join('/') || a.error || b.error);
  }
}

// 笔画覆盖不只是身份问题：字符串值曾被静默丢弃，五格按字库笔画算，用户给的笔画没参与
{
  const str = compute({ system: 'name', surname: '辛', givenName: '秋林', strokeOverrides: { 秋: '9' }, withInterpret: false });
  const num = compute({ system: 'name', surname: '辛', givenName: '秋林', strokeOverrides: { 秋: 9 }, withInterpret: false });
  ok('strokeOverrides 字符串笔画与数字同盘', JSON.stringify(str) === JSON.stringify(num));
  ok('strokeOverrides 字符串笔画被采纳（source=user）',
    str.wuge.strokes.find((s) => s.char === '秋').source === 'user',
    JSON.stringify(str.wuge.strokes.map((s) => `${s.char}:${s.strokes}/${s.source}`)));
  const sn = compute({ system: 'name', surname: '辛', givenName: '秋林', surnameStrokes: { 辛: '7' }, withInterpret: false });
  ok('surnameStrokes 字符串笔画被采纳', sn.wuge.strokes.find((s) => s.char === '辛').source === 'user');
}

// 「整串才是一个数」：别把 "9运" / "三十" 变成 NaN 混成「没给」，也别把合法数字拒之门外
{
  const errs = [
    ['count:"abc"', { system: 'tarot', count: 'abc' }, 'E_COUNT'],
    ['period:"九"', { system: 'fengshui', action: 'xuankong', sitting: '子', period: '九' }, 'E_INPUT'],
    ['toAge:"三十"', { system: 'trend', datetime: '1990-05-12T14:30', gender: 'male', toAge: '三十' }, 'E_INPUT'],
  ];
  for (const [label, args, want] of errs) {
    const got = chart(args, {}).error;
    ok(`${label} 仍报 ${want}`, got === want, String(got));
  }
  const okPeriod = chart({ system: 'fengshui', action: 'xuankong', sitting: '子' }, { period: '9' });
  ok('period:"9" 不再被当成非法（此前报错里还写着「收到「9」」）', !okPeriod.error, okPeriod.error);
  ok('小数保持小数', chart({ system: 'tarot', count: 3 }, { seed: '1.5' }).seed === 1.5);
}

// 数字串的每种合法写法都只能有一个身份：指数与尾点也是 Number() 认的数，
// randomOf 会照它们出牌；若归一只认十进制，牌同而句柄不同，回放就对不上。
{
  for (const [label, str, num] of [['指数 1e3', '1e3', 1000], ['尾点 5.', '5.', 5], ['前导零 03', '03', 3]]) {
    const a = compute({ system: 'tarot', seed: str, count: 3 });
    const b = compute({ system: 'tarot', seed: num, count: 3 });
    ok(`${label}：牌面一致`, JSON.stringify(a.cards) === JSON.stringify(b.cards));
    ok(`${label}：句柄一致`, a.handle === b.handle, `${a.handle} vs ${b.handle}`);
    ok(`${label}：seed 落成数字`, a.seed === num, String(a.seed));
  }
}

// 空串 / 空白串等于「没给」：宿主 normalizeArgs 就是这么收的。
// 若折成全局缺省，奇门 lateZi 与紫微 lateZishi 的缺省会和「不给」走出两张盘；
// 数字键留着空串则会被 Number("") 读成 0（梅花 upper）或报「收到「」」（风水 period）。
{
  const ziweiBase = { system: 'ziwei', datetime: '2026-03-01T23:30', gender: 'male' };
  const absentZiwei = compute(ziweiBase);
  for (const blank of ['', '  ']) {
    const got = compute({ ...ziweiBase, lateZi: blank });
    ok(`lateZi:${JSON.stringify(blank)} 与不给同盘同句柄`, got.handle === absentZiwei.handle, got.handle);
  }
  const absentQimen = compute({ system: 'qimen', datetime: '2026-03-01T23:30' });
  const blankQimen = compute({ system: 'qimen', datetime: '2026-03-01T23:30', lateZi: '' });
  ok('奇门 lateZi 空串按「不给」（same-day）处理', blankQimen.handle === absentQimen.handle);
  const absentTarot = compute({ system: 'tarot', seed: 3 });
  const blankTarot = compute({ system: 'tarot', seed: 3, count: '' });
  ok('count 空串与不给同盘同句柄', blankTarot.handle === absentTarot.handle);
  const absentKh = compute({ system: 'fengshui', action: 'xuankong', sitting: '子' });
  const blankKh = compute({ system: 'fengshui', action: 'xuankong', sitting: '子', period: '' });
  ok('period 空串按「不给」处理', blankKh.handle === absentKh.handle);
  ok('upper 空串按缺参数报错，不再被 Number("") 读成 0', (() => {
    try { compute({ system: 'meihua', mode: 'number', upper: '', lower: 5 }); return false; }
    catch (e) { return e.code === 'E_INPUT'; }
  })());
}

// 归一自身：返回副本、不改入参、无改动时返回同一引用
{
  const { canonicalNumbers, NUMERIC_KEYS, NUMERIC_ARRAY_KEYS } = await import('../engine/bool.js');
  const src = Object.freeze({ count: '3', lines: ['7', '8'], strokeOverrides: Object.freeze({ 秋: '9' }) });
  const fixed = canonicalNumbers(src);
  ok('canonicalNumbers 返回新对象', fixed !== src);
  ok('canonicalNumbers 输出可真布尔数字', fixed.count === 3 && fixed.lines[0] === 7 && fixed.strokeOverrides.秋 === 9);
  ok('canonicalNumbers 不改入参', src.count === '3' && src.lines[0] === '7' && src.strokeOverrides.秋 === '9');
  const untouched = { count: 3, note: '3' };
  ok('无改动时返回同一引用', canonicalNumbers(untouched) === untouched);
  ok('非数值键不动（note:"3" 不是数值参数）', canonicalNumbers({ note: '3' }).note === '3');

  // 与 schema 同步：schema 里声明的每个 number/integer 参数都要在归一表里，避免以后加参数漏一刀
  const { apply } = await import('../index.js');
  let def = null;
  apply({ effect: (f) => f(), tools: { register: (d) => { def = d; return () => {}; } } });
  const declared = [];
  for (const [key, spec] of Object.entries(def.parameters.properties)) {
    if (spec.type === 'number' || spec.type === 'integer') declared.push(key);
  }
  for (const [key, spec] of Object.entries(def.parameters.properties.options.properties || {})) {
    if (spec.type === 'number' || spec.type === 'integer') declared.push(key);
    else if (spec.type === 'array' && spec.items && ['number', 'integer'].includes(spec.items.type)) declared.push(key);
  }
  const covered = new Set([...NUMERIC_KEYS, ...NUMERIC_ARRAY_KEYS]);
  const missing = declared.filter((k) => !covered.has(k));
  ok('schema 里的数值参数全部进了归一表', missing.length === 0, missing.join(','));
}
