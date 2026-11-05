// 入参校验回归：非法输入必须明确报错（带错误码），而不是静默改成另一个盘。
//
// 0.14.0 及以前的几个静默降级：
//   · 1990-02-30 / 2026-04-31 被接受并滚到下个月
//   · 不填性别按男命排（大运/大限方向直接反了）
//   · 六爻爻数不对 → 悄悄换成随机摇卦
//   · 塔罗张数不支持 → 悄悄按 3 张
//   · asOf 解析不了 → 悄悄用「此刻」
import { compute, parseDateTime } from '../engine/index.js';
import { buildFengshui } from '../engine/fengshui.js';
import { buildZiwei } from '../engine/ziwei.js';
import { shuliOf } from '../engine/name.js';
import { buildLiuyao, yongshenOf, yongshenStrength, fushenAccess, hexagramStrength, jinTuiPower, yingqiWindow } from '../engine/liuyao.js';
import { tarotReading } from '../engine/tarot.js';
import { buildMbti } from '../engine/mbti.js';
import { ok } from './_harness.mjs';

/** 断言"必须抛错"，并核对错误码 */
function throws(label, fn, expectCode) {
  let err = null;
  try {
    fn();
  } catch (e) {
    err = e;
  }
  if (!err) return ok(label, false, '没有抛错');
  const codeOk = !expectCode || err.code === expectCode;
  return ok(label, codeOk, `${err.code || '(无码)'}：${err.message}`);
}

function notThrows(label, fn) {
  try {
    fn();
    return ok(label, true);
  } catch (e) {
    return ok(label, false, `${e.code || ''} ${e.message}`);
  }
}

// ── ① 日期合法性（月份天数 + 闰年）────────────────────────────
throws('1990-02-30 报错', () => parseDateTime('1990-02-30T10:00'), 'E_INPUT');
throws('2026-04-31 报错', () => parseDateTime('2026-04-31T10:00'), 'E_INPUT');
throws('2000-02-30 报错', () => parseDateTime('2000-02-30'), 'E_INPUT');
throws('1900-02-29（非闰年）报错', () => parseDateTime('1900-02-29'), 'E_INPUT');
throws('月份 13 报错', () => parseDateTime('1990-13-01'), 'E_INPUT');
throws('25:00 报错', () => parseDateTime('1990-05-12T25:00'), 'E_INPUT');
throws('年份 1500 报错', () => parseDateTime('1500-01-01'), 'E_RANGE');
const leap = parseDateTime('2000-02-29');
ok('2000-02-29 被接受', leap.day === 29 && leap.month === 2);
ok('秒被接受（忽略）', parseDateTime('1990-05-12T14:30:45').minute === 30);
// 秒只被忽略、不该被放过：正则写的是 \d{1,2}，「T14:30:99」曾静默折成 14:30，
// 与 1990-02-30 滚月同一类问题——非法输入悄悄变成一个合法时刻。
throws('秒 60 报错', () => parseDateTime('1990-05-12T14:30:60'), 'E_INPUT');
throws('秒 99 报错', () => parseDateTime('1990-05-12T14:30:99'), 'E_INPUT');
notThrows('秒 59 被接受', () => parseDateTime('1990-05-12T14:30:59'));

// ── ② 性别必填 ───────────────────────────────────────────────
throws('bazi 缺 gender 报错', () => compute({ system: 'bazi', datetime: '1990-05-12T14:30' }), 'E_INPUT');
throws('ziwei 缺 gender 报错', () => compute({ system: 'ziwei', datetime: '1990-05-12T14:30' }), 'E_INPUT');
throws('gender 用中文值报错', () => compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: '男' }), 'E_INPUT');
notThrows('bazi 带 gender 正常', () => compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male' }));

// ── ③ 合盘 partner ───────────────────────────────────────────
throws('合盘缺 partner 报错', () => compute({ system: 'hepan', datetime: '1990-05-12T14:30', gender: 'male' }), 'E_PARTNER');
throws('partner 缺 datetime 报错', () => compute({
  system: 'hepan', datetime: '1990-05-12T14:30', gender: 'male',
  partner: { gender: 'female' },
}), 'E_PARTNER');
throws('partner 缺 gender 报错', () => compute({
  system: 'hepan', datetime: '1990-05-12T14:30', gender: 'male',
  partner: { datetime: '1992-03-03T10:00' },
}), 'E_INPUT');
throws('主方缺 gender 报错', () => compute({
  system: 'hepan', datetime: '1990-05-12T14:30',
  partner: { datetime: '1992-03-03T10:00', gender: 'female' },
}), 'E_INPUT');
notThrows('合盘参数齐全正常', () => compute({
  system: 'hepan', datetime: '1990-05-12T14:30', gender: 'male',
  partner: { datetime: '1992-03-03T10:00', gender: 'female' },
}));

// ── ④ 六爻爻值 ───────────────────────────────────────────────
throws('六爻 5 个爻值报错', () => compute({ system: 'liuyao', lines: [7, 7, 7, 7, 7] }), 'E_LINES');
throws('六爻 7 个爻值报错', () => compute({ system: 'liuyao', lines: [7, 7, 7, 7, 7, 7, 7] }), 'E_LINES');
throws('六爻 非数组报错', () => compute({ system: 'liuyao', lines: 'abc' }), 'E_LINES');
throws('六爻 值越界报错', () => compute({ system: 'liuyao', lines: [1, 2, 3, 4, 5, 6] }), 'E_LINES');
notThrows('六爻 不填爻值 = 随机摇卦', () => compute({ system: 'liuyao' }));

// ── ⑤ 塔罗张数 ───────────────────────────────────────────────
throws('塔罗 4 张报错', () => compute({ system: 'tarot', count: 4 }), 'E_COUNT');
throws('塔罗 2 张报错', () => compute({ system: 'tarot', count: 2 }), 'E_COUNT');
notThrows('塔罗 1/3/5 正常', () => {
  for (const n of [1, 3, 5]) compute({ system: 'tarot', count: n });
});
notThrows('塔罗 不填 = 3 张', () => compute({ system: 'tarot' }));

// ── ⑥ asOf（紫微流月/流日/流时基准）──────────────────────────
throws('asOf 乱码报错', () => compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male', asOf: 'not-a-date' }), 'E_ASOF');
throws('asOf 日期不存在报错', () => compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male', asOf: '2026-02-30' }), 'E_ASOF');
notThrows('asOf 合法正常', () => compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male', asOf: '2026-10-22T16:00' }));
// asOf 与 parseDateTime / assertCivil 同一把年份尺：以前只校验月日时，1500 / 2500
// 会一路排进流月流日，农历表只覆盖 1600–2400，出来的是一张外推盘。
for (const bad of ['1500-01-01', '1599-12-31', '2401-01-01', '2500-06-01', '9999-12-31', '0000-01-01']) {
  throws(`asOf ${bad} 超出 1600–2400 报 E_ASOF`, () => compute({
    system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male', asOf: bad,
  }), 'E_ASOF');
}
const asOfRangeText = (() => {
  try {
    compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male', asOf: '1500-01-01' });
  } catch (e) {
    return e.message;
  }
  return '';
})();
ok('asOf 越界文案点名 1600–2400', /1600–2400/.test(asOfRangeText), asOfRangeText);
const zeroAsOfText = (() => {
  try {
    compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male', asOf: '0000-01-01' });
  } catch (e) {
    return e.message;
  }
  return '';
})();
ok('asOf 0000 报年份越界而不是格式错误',
  /年份超出可计算范围/.test(zeroAsOfText) && !/无法解析/.test(zeroAsOfText), zeroAsOfText);
notThrows('asOf 1600 / 2400 两端点仍可排', () => {
  compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male', asOf: '1600-01-01T12:00' });
  compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male', asOf: '2400-12-31T12:00' });
});

// ── ⑦ 奇门参数枚举 ───────────────────────────────────────────
throws('juMethod 非法报错', () => compute({ system: 'qimen', datetime: '2026-10-24T11:43', juMethod: 'foo' }), 'E_INPUT');
throws('lateZiHourMode 非法报错', () => compute({ system: 'qimen', datetime: '2026-10-24T11:43', lateZiHourMode: 'x' }), 'E_INPUT');
notThrows('奇门三派取局正常', () => {
  for (const m of ['chaibu', 'chaoshen', 'zhirun']) compute({ system: 'qimen', datetime: '2026-10-24T11:43', juMethod: m });
});

// ── ⑧ 体系名 ─────────────────────────────────────────────────
throws('缺 system 报错', () => compute({}), 'E_INPUT');
throws('未知体系报错', () => compute({ system: 'nope' }), 'E_SYSTEM');
const unknown = (() => { try { compute({ system: 'nope' }); } catch (e) { return e.message; } return ''; })();
ok('未知体系提示列出可选体系', ['bazi', 'ziwei', 'qimen', 'tarot', 'fengshui', 'name'].every((k) => unknown.includes(k)), unknown);

// ── ⑨ 梅花起卦参数 ───────────────────────────────────────────
throws('梅花数字起卦缺数字报错', () => compute({ system: 'meihua', mode: 'number' }), 'E_INPUT');

// ── ⑩ 工具层：错误面统一带错误码前缀（回归：曾因 `return run(args)` 少了 await 而漏包）──
const { apply } = await import('../index.js');
let def = null;
apply({ tools: { register: (d) => { def = d; return () => {}; } }, effect: (fn) => fn() });
ok('工具定义已注册', !!def && typeof def.execute === 'function');

let toolErr = '';
try {
  await def.execute({ system: 'tarot', count: 4 });
} catch (e) {
  toolErr = e.message;
}
ok('工具层错误带 [E_COUNT] 前缀', toolErr.startsWith('[E_COUNT]'), toolErr);

const okRes = await def.execute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male' });
ok('工具层正常路径返回摘要', typeof okRes.summary === 'string' && okRes.summary.includes('【四柱】'));

// ── ⑪ name 的「年/月/日 + 时」生辰路径（回归：hour 守卫把它封死）────────
// schema 的 year 说明写着「配合 month/day/hour」，engine 的 name 分支也真读 args.hour / args.minute；
// 工具层的 hour 白名单少了 name，等于文档宣传的写法只有 compute() 走得通，宿主调用一律 E_INPUT。
const NAME_BIRTH = { system: 'name', action: 'generate', surname: '李', year: 1990, month: 5, day: 12, hour: 10 };
const nameEngine = compute(NAME_BIRTH);
ok('引擎按 year/month/day/hour 出候选名', Array.isArray(nameEngine.candidates) && nameEngine.candidates.length > 0);
const nameTool = await def.execute(NAME_BIRTH);
ok('工具层同参数不再报错', JSON.stringify(nameTool.candidates) === JSON.stringify(nameEngine.candidates), nameTool.candidates ? nameTool.candidates.length : '-');
const nameMinuteTool = await def.execute({ ...NAME_BIRTH, minute: 30 });
ok('name 认 minute（与 datetime 同盘）', JSON.stringify(nameMinuteTool.candidates) === JSON.stringify(compute({ ...NAME_BIRTH, minute: 30 }).candidates));
const nameViaDateTime = await def.execute({ system: 'name', action: 'generate', surname: '李', datetime: '1990-05-12T10:00' });
ok('分开字段与 datetime 两种写法同结果', JSON.stringify(nameViaDateTime.candidates) === JSON.stringify(nameTool.candidates));
// name 也支持 year/month/day 分开给生辰：只给到日、没有 hour 时同样按 00:00 占位，
// 不能因为没走 datetime 就绕过「只给日期」的提示。
{
  const splitDate = compute({ system: 'name', action: 'generate', surname: '李', year: 1990, month: 5, day: 12, withInterpret: false });
  const dateOnlyName = compute({ system: 'name', action: 'generate', surname: '李', datetime: '1990-05-12', withInterpret: false });
  ok('name 分开年月日缺时刻：标注 timeMissing', splitDate.timeMissing === true, String(splitDate.timeMissing));
  ok('name 分开年月日缺时刻：摘要首行说清', /^⚠ 只给了日期、没有时刻/.test(splitDate.summary || ''),
    (splitDate.summary || '').split('\n')[0]);
  ok('name 分开年月日缺时刻：与 datetime 只给日期同盘',
    JSON.stringify(splitDate.candidates) === JSON.stringify(dateOnlyName.candidates));
  ok('name 给到小时不提示缺时刻', compute({ ...NAME_BIRTH, withInterpret: false }).timeMissing === undefined);
}
const guardText = await def.execute({ system: 'tarot', datetime: '1990-05-12T14:30', hour: 3 }).then(() => '', (e) => String(e.message));
ok('hour 守卫文案列全三个体系', /chenggu \/ xiaoliuren \/ name/.test(guardText), guardText);
const otherHour = await def.execute({ system: 'numerology', datetime: '1990-05-12', hour: 3 }).then(() => '', (e) => String(e.message));
ok('其它体系显式传 hour 仍报错', /hour 仅用于/.test(otherHour), otherHour);
const otherMinute = await def.execute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', minute: 30 }).then(() => '', (e) => String(e.message));
ok('其它体系显式传 minute 报错', /minute 仅用于 name/.test(otherMinute), otherMinute);

// ── ⑫ host 统一参数整形（字符串布尔 / 字符串数字）────────────
// 模型常把 true 写成 "true"、把 9 写成 "9"。以前前者被当成 false、后者在引擎里
// 报「运必须是 1–9 的整数，收到 9」——数字明明合法，错得让人无从下手。
const errMsg = (p) => p.then(() => '', (e) => String(e.message));
const strPeriod = await def.execute({ system: 'fengshui', action: 'xuankong', period: '9', sitting: '子' });
ok('period:"9" 与 9 同盘', JSON.stringify(strPeriod.palaces) === JSON.stringify(compute({ system: 'fengshui', action: 'xuankong', period: 9, sitting: '子' }).palaces));
const strPeriodOpt = await def.execute({ system: 'fengshui', action: 'xuankong', sitting: '子', options: { period: '9' } });
ok('options 里的 "9" 同样归一', JSON.stringify(strPeriodOpt.palaces) === JSON.stringify(strPeriod.palaces));
const strHour = await def.execute({ ...NAME_BIRTH, hour: '10' });
ok('hour:"10" 与 10 同结果', JSON.stringify(strHour.candidates) === JSON.stringify(nameTool.candidates));
const strBoolOff = await def.execute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '安徽池州', trueSolar: 'false' });
const boolOff = await def.execute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '安徽池州', trueSolar: false });
ok('trueSolar:"false" 等同 false', strBoolOff.handle === boolOff.handle, `${strBoolOff.handle} vs ${boolOff.handle}`);
const strShadow = await def.execute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', shadow: 'true' });
ok('shadow:"true" 等同 true', typeof strShadow.shadow === 'object' && typeof strShadow.shadow.id === 'string');
const strNoInterpret = await def.execute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', withInterpret: 'false' });
ok('withInterpret:"false" 不开解析', strNoInterpret.interpret === undefined && strNoInterpret.interpretTier === undefined);
const badBool = await errMsg(def.execute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', withInterpret: 'yes' }));
ok('非法布尔值报 E_INPUT', /^\[E_INPUT\].*布尔/.test(badBool), badBool);
const badInt = await errMsg(def.execute({ ...NAME_BIRTH, hour: 10.5 }));
ok('整数字段收小数报 E_INPUT', /^\[E_INPUT\].*整数/.test(badInt), badInt);
const badNum = await errMsg(def.execute({ system: 'fengshui', action: 'xuankong', sitting: '子', period: '九' }));
ok('数字字段收非数字串报 E_INPUT', /^\[E_INPUT\].*数字/.test(badNum), badNum);

// ── 引擎直调：字符串布尔必须与真布尔排同一张盘、拿同一个句柄 ──────
// 工具层归一过一次，但脚本/面板可以直接调 compute()。引擎里用 `!== false` 读开关时
// 只认字面 false，于是 trueSolar:"false" 排出「开真太阳时」的盘，句柄里却写着 false——
// 同一张盘两个身份，影子盘对拍与深链回放全跟着错。
const E = { system: 'bazi', datetime: '1996-01-15T08:30', gender: 'male', address: '安徽池州' };
const chartOf = (extra) => compute({ ...E, ...extra, withInterpret: false });
for (const [name, key] of [['trueSolar', 'trueSolar'], ['lateZi', 'lateZi']]) {
  const strOff = chartOf({ [key]: 'false' });
  const realOff = chartOf({ [key]: false });
  ok(`${name}:"false" 与 false 同句柄`, strOff.handle === realOff.handle, `${strOff.handle} vs ${realOff.handle}`);
  ok(`${name}:"false" 盘面按关排`, strOff.input[key] === false, JSON.stringify(strOff.input[key]));
  const strOn = chartOf({ [key]: 'true' });
  const realOn = chartOf({ [key]: true });
  ok(`${name}:"true" 与 true 同句柄`, strOn.handle === realOn.handle);
  ok(`${name}:"true" 盘面按开排`, strOn.input[key] === true, JSON.stringify(strOn.input[key]));
  ok(`${name}:0 等同 false`, chartOf({ [key]: 0 }).handle === realOff.handle);
}
// dst 的盘面回显是对象（applied/note），要拿夏令时窗口内的日期才看得出开关是否生效
const DST_BIRTH = { ...E, datetime: '1988-06-01T10:00' };
const dstChart = (v) => compute({ ...DST_BIRTH, dst: v, withInterpret: false });
ok('dst:"false" 与 false 同句柄', dstChart('false').handle === dstChart(false).handle);
ok('dst:"false" 不校正', dstChart('false').input.dst.applied === false);
ok('dst:"true" 与 true 同句柄', dstChart('true').handle === dstChart(true).handle);
ok('dst:"true" 触发校正', dstChart('true').input.dst.applied === true);
ok('dst:0 等同 false', dstChart(0).handle === dstChart(false).handle);
ok('引擎直调 withInterpret:"false" 不开解析', chartOf({ withInterpret: 'false' }).interpret === undefined);
ok('引擎直调 withInterpret:"true" 开解析', compute({ ...E, withInterpret: 'true' }).interpret !== undefined);
ok('引擎直调 shadow:"true" 出影子盘', typeof chartOf({ shadow: 'true' }).shadow === 'object');
ok('引擎直调 shadow:"true" 与 true 同 ID',
  chartOf({ shadow: 'true' }).shadow.id === chartOf({ shadow: true }).shadow.id);
ok('引擎直调 hourUnknown:"true" 只排三柱',
  chartOf({ hourUnknown: 'true' }).hourUnknown === true && chartOf({ hourUnknown: false }).hourUnknown === undefined);
ok('引擎直调 hourUnknown:"false" 与 false 同盘',
  JSON.stringify(chartOf({ hourUnknown: 'false' }).pillars) === JSON.stringify(chartOf({ hourUnknown: false }).pillars));
ok('引擎直调 cross:"true" 出交叉验证', Boolean(compute({ ...E, cross: 'true', withInterpret: false }).cross));
// 影子盘指纹与句柄同源：同一口径的两种写法必须给同一个 baseId
ok('影子盘 baseId 不受写法影响',
  (chartOf({ shadow: true, trueSolar: 'false' }).shadow || {}).baseId
  === (chartOf({ shadow: true, trueSolar: false }).shadow || {}).baseId);

// ── 只给日期、没给时刻：必须当场说清，而不是静默按 00:00 排出完整四柱 ──
// parseDateTime 把时分补 0，盘面上看不出任何异常——这类静默默认正是最难发现的一种。
const dateOnly = (sys, extra = {}) => compute({ system: sys, datetime: '1990-05-12', gender: 'male', withInterpret: false, ...extra });
{
  const b = dateOnly('bazi');
  ok('只给日期：标注 timeMissing', b.timeMissing === true);
  ok('只给日期：摘要首行就说清', /^⚠ 只给了日期、没有时刻/.test(b.summary || ''), (b.summary || '').split('\n')[0]);
  ok('只给日期：时柱仍排出（不改盘面）', Boolean(b.pillars && b.pillars.hour && b.pillars.hour.ganzhi), JSON.stringify(b.pillars && b.pillars.hour));
  const withTime = compute({ system: 'bazi', datetime: '1990-05-12T00:00', gender: 'male', withInterpret: false });
  ok('给了 00:00 也算给了时刻', withTime.timeMissing === undefined && !/只给了日期/.test(withTime.summary || ''));
  ok('给了时刻：不出现该提示', !/只给了日期/.test(dateOnly('bazi', { datetime: '1990-05-12T14:30' }).summary || ''));
  // 时辰未知本来就只排三柱，再叠一句「按 00:00 暂算」是自相矛盾
  ok('hourUnknown 时不重复提示', /只给了日期/.test(dateOnly('bazi', { hourUnknown: true }).summary || '') === false,
    (dateOnly('bazi', { hourUnknown: true }).summary || '').split('\n')[0]);
  ok('紫微缺时刻：给的对策是补时刻而不是三柱',
    /紫微排不出三柱/.test(dateOnly('ziwei').summary || ''));
  ok('奇门缺时刻：说清是起局时辰', /起局时辰/.test(dateOnly('qimen').summary || ''));
  // 只以「日」为输入的体系不该被这句提示打扰（小六壬缺时辰是直接报错，不走这条路）
  ok('黄历只给日期不提示缺时刻', dateOnly('almanac').timeMissing === undefined);
  // 六爻取日辰/月建定六神与旬空，不看钟点；梅花数字起卦只读 upper/lower——都不该误报
  ok('六爻只给日期不提示缺时刻', dateOnly('liuyao', { seed: 7 }).timeMissing === undefined,
    (dateOnly('liuyao', { seed: 7 }).summary || '').split('\n')[0]);
  ok('梅花数字起卦只给日期不提示缺时刻',
    dateOnly('meihua', { mode: 'number', upper: 3, lower: 5 }).timeMissing === undefined,
    (dateOnly('meihua', { mode: 'number', upper: 3, lower: 5 }).summary || '').split('\n')[0]);
  ok('梅花时间起卦缺时刻照常提示', dateOnly('meihua', { mode: 'time' }).timeMissing === true);
  // 合盘对方 / 第三方也只给日期时，时柱同样按 00:00 静默排——不能只提示主方
  {
    const hp = (partner, partner2) => compute({
      system: 'hepan', datetime: '1990-05-12T14:30', gender: 'male',
      partner, ...(partner2 ? { partner2 } : {}), withInterpret: false,
    });
    const p = hp({ datetime: '1992-08-03', gender: 'female' });
    ok('合盘对方只给日期：标注 timeMissing 并点名对方', p.timeMissing === true && /对方/.test((p.summary || '').split('\n')[0]),
      (p.summary || '').split('\n')[0]);
    const p2 = hp({ datetime: '1992-08-03T09:00', gender: 'female' }, { datetime: '1988-09-09', gender: 'male' });
    ok('合盘第三方只给日期：点名第三方', p2.timeMissing === true && /第三方/.test((p2.summary || '').split('\n')[0]),
      (p2.summary || '').split('\n')[0]);
    const both = hp({ datetime: '1992-08-03', gender: 'female' }, { datetime: '1988-09-09', gender: 'male' });
    ok('两方都缺时刻：一条提示里都点名', /对方、第三方/.test((both.summary || '').split('\n')[0]),
      (both.summary || '').split('\n')[0]);
    const fine = hp({ datetime: '1992-08-03T09:00', gender: 'female' }, { datetime: '1988-09-09T08:00', gender: 'male' });
    ok('三方都给时刻：不提示', fine.timeMissing === undefined, (fine.summary || '').split('\n')[0]);
  }
  ok('小六壬缺时辰直接报错', (() => {
    try { dateOnly('xiaoliuren'); return false; } catch (e) { return e.code === 'E_INPUT'; }
  })());
}

// ── 本轮复查：边界条件、空值与分支遗漏 ──────────────────────
{
  // 趋势时辰未知：摘要承诺「时柱按正午暂算」，计算就必须真的按正午。
  // 以前 hourUnknown 只挂在结果上、没传进 buildBazi，日期串缺省出来的 00:00 被拿来算旺衰。
  const trend = (dt, extra = {}) => compute({ system: 'trend', datetime: dt, gender: 'male', toAge: 30, withInterpret: false, ...extra });
  const unknown = trend('1990-05-12', { hourUnknown: true });
  const noon = trend('1990-05-12T12:00', { hourUnknown: true });
  const midnight = trend('1990-05-12T00:00');
  ok('趋势时辰未知：旺衰按正午占位（与显式 12:00 同分）',
    unknown.meta.strength.score === noon.meta.strength.score,
    `${unknown.meta.strength.score} vs ${noon.meta.strength.score}`);
  ok('趋势时辰未知：确实不同于按 00:00 算',
    unknown.meta.strength.score !== midnight.meta.strength.score,
    `${unknown.meta.strength.score} vs ${midnight.meta.strength.score}`);

  // 合盘第三方与主方/对方同一口径：时辰未知就不出盘，不能只拦前两方。
  const hpBase = {
    system: 'hepan', datetime: '1990-05-12T14:30', gender: 'male', address: '安徽池州',
    partner: { datetime: '1992-08-03T09:00', gender: 'female', address: '江苏南京' },
    withInterpret: false,
  };
  throws('合盘第三方 hourUnknown 报 HOUR_UNKNOWN', () => compute({
    ...hpBase, partner2: { datetime: '1988-09-09T08:00', gender: 'male', hourUnknown: true },
  }), 'HOUR_UNKNOWN');

  // 十神方向：tenGod(aStem,bStem) 是「对方在我盘里」，文案不能说反。
  const hp = compute(hpBase);
  const stems = hp.detail.stems;
  ok('合盘十神方向：对方在你盘里 = tenGodToB',
    stems.text.includes(`对方在你盘里是「${stems.tenGodToB}」`)
    && stems.text.includes(`你在对方盘里是「${stems.tenGodToA}」`), stems.text);

  // 梅花数字起卦：null / false / [] 都会被 Number() 变成 0，以前静默起成坤为地。
  throws('梅花数字起卦 upper/lower 为 null 报错', () => compute({ system: 'meihua', mode: 'number', upper: null, lower: null }), 'E_INPUT');
  throws('梅花数字起卦 upper:false / lower:[] 报错', () => compute({ system: 'meihua', mode: 'number', upper: false, lower: [] }), 'E_INPUT');
  notThrows('梅花数字起卦 0 仍是合法输入', () => compute({ system: 'meihua', mode: 'number', upper: 0, lower: 0 }));
  // 卦数必须是整数：3.5 以前一路走到 bitsOf 才抛裸 TypeError；动爻位也只收 1–6 整数，
  // 布尔 / 数组 / 小数都不能靠 Number() 静默折成「第几爻」。
  throws('梅花数字起卦 upper 小数报 E_INPUT', () => compute({ system: 'meihua', mode: 'number', upper: 3.5, lower: 5 }), 'E_INPUT');
  throws('梅花数字起卦 lower 小数报 E_INPUT', () => compute({ system: 'meihua', mode: 'number', upper: 3, lower: 5.5 }), 'E_INPUT');
  throws('梅花数字起卦 changing:true 报 E_INPUT', () => compute({ system: 'meihua', mode: 'number', upper: 3, lower: 5, changing: true }), 'E_INPUT');
  throws('梅花数字起卦 changing:[3] 报 E_INPUT', () => compute({ system: 'meihua', mode: 'number', upper: 3, lower: 5, changing: [3] }), 'E_INPUT');
  throws('梅花数字起卦 changing 小数报 E_INPUT', () => compute({ system: 'meihua', mode: 'number', upper: 3, lower: 5, changing: 2.5 }), 'E_INPUT');
  notThrows('梅花数字起卦 changing:"2" 仍按第 2 爻', () => compute({ system: 'meihua', mode: 'number', upper: 3, lower: 5, changing: '2' }));

  // 八字 × 紫微交叉验证：八字侧显式关掉晚子时，交叉的紫微盘也必须按当日；
  // 以前只把开关传给八字，23:00 后的紫微仍按默认 current-day，等于拿两个生日互证。
  {
    const crossOf = (extra) => compute({
      system: 'bazi', datetime: '2026-02-16T23:30', gender: 'male',
      cross: true, trueSolar: false, dst: false, withInterpret: false, ...extra,
    });
    const off = crossOf({ lateZi: false });
    const on = crossOf({ lateZi: true });
    ok('交叉验证：lateZi 开/关得到不同紫微交叉结果', JSON.stringify(off.cross) !== JSON.stringify(on.cross));
    const spouseMain = (lateZishi) => {
      const z = buildZiwei({
        year: 2026, month: 2, day: 16, hour: 23, minute: 30,
        gender: 'male', trueSolar: false, dst: false, lateZishi,
      });
      return z.palaces.find((p) => p.palace === '夫妻').stars.filter((s) => s.type === '主星').map((s) => s.name);
    };
    const offLove = off.cross.items.find((x) => x.key === 'love').ziwei;
    const onLove = on.cross.items.find((x) => x.key === 'love').ziwei;
    const offMain = spouseMain('current-day');
    const onMain = spouseMain('next-day');
    ok('交叉验证：lateZi:false 与单盘 current-day 夫妻宫同星',
      offLove.includes(`夫妻宫主星 ${offMain.join('、')}`), `${offLove} vs ${offMain.join('、')}`);
    ok('交叉验证：lateZi:true 与单盘 next-day 夫妻宫同星',
      onLove.includes(`夫妻宫主星 ${onMain.join('、')}`), `${onLove} vs ${onMain.join('、')}`);
  }

  // seed 只认十进制：Number("0x10") / Number(false) / Number([]) 都能过旧 isSeed，
  // 但工具层的 number 校验会拒——同一份输入两条路，句柄与复现都对不上。
  throws('seed:"0x10" 与工具层同口径报错', () => compute({ system: 'tarot', seed: '0x10' }), 'E_INPUT');
  throws('seed:false 报错', () => compute({ system: 'tarot', seed: false }), 'E_INPUT');
  const seedA = compute({ system: 'tarot', seed: '1000' });
  const seedB = compute({ system: 'tarot', seed: 1000 });
  ok('十进制数字串 seed 仍与数字同句柄', seedA.handle === seedB.handle);

  // 塔罗 question 不是字符串时不能抛裸 TypeError。
  const tarotQ = compute({ system: 'tarot', datetime: '2026-03-01T10:00', question: 123 });
  ok('塔罗 question 为数字被转成字符串', tarotQ.question === '123', String(tarotQ.question));

  // 风水命卦：世纪常数每世纪减 1；以前 2100 年以后一直沿用 2000 年代的 99/3。
  const guaOf = (y) => compute({ system: 'fengshui', datetime: `${y}-06-01T10:00`, gender: 'male', withInterpret: false }).mingGua.gua;
  ok('风水命卦 1900 男仍是坎', guaOf(1900) === '坎', guaOf(1900));
  ok('风水命卦 2000 男仍是离', guaOf(2000) === '离', guaOf(2000));
  ok('风水命卦 2100 男为艮（世纪递减）', guaOf(2100) === '艮', guaOf(2100));
  ok('风水命卦 2200 男为兑（世纪递减）', guaOf(2200) === '兑', guaOf(2200));
  const guaFemale = (y) => compute({ system: 'fengshui', datetime: `${y}-06-01T10:00`, gender: 'female', withInterpret: false }).mingGua.gua;
  ok('风水命卦 2000 女仍为乾', guaFemale(2000) === '乾', guaFemale(2000));
  ok('风水命卦 2100 女为兑（世纪递减）', guaFemale(2100) === '兑', guaFemale(2100));
  ok('风水命卦 2200 女为艮（世纪递减）', guaFemale(2200) === '艮', guaFemale(2200));
  throws('风水 fortuneYear 0 报错', () => compute({
    system: 'fengshui', datetime: '1990-05-12T10:00', gender: 'male', fortuneYear: 0,
  }), 'E_INPUT');
  throws('风水直接调用：2 月 30 日报错', () => buildFengshui({
    action: 'natal', year: 2020, month: 2, day: 30, gender: 'male',
  }), 'E_INPUT');

  // 数理超过 81 用取模，不再空转：1e12 的笔画覆盖以前会把整个插件卡死。
  ok('数理 104 取 24', shuliOf(104).num === 24);
  ok('数理 1e12 立即返回 80', shuliOf(1e12).num === 80, String(shuliOf(1e12) && shuliOf(1e12).num));

  // schema 里的枚举不再只是写给模型看：工具层与引擎直调都要同一份契约。
  let enumMsg = '';
  try {
    await def.execute({ system: 'liuyao', datetime: '2026-03-01T10:00', lines: [7, 8, 9, 6, 7, 8], direction: 'romance' });
  } catch (e) { enumMsg = e.message; }
  ok('工具层 direction 拼错当场报错', enumMsg.startsWith('[E_INPUT]') && /direction 只能是/.test(enumMsg), enumMsg);
  enumMsg = '';
  try {
    await def.execute({ system: 'liuyao', datetime: '2026-03-01T10:00', lines: [7, 8, 9, 6, 7, 8], gender: '女' });
  } catch (e) { enumMsg = e.message; }
  ok('工具层 gender 非法值当场报错', enumMsg.startsWith('[E_INPUT]') && /gender 只能是/.test(enumMsg), enumMsg);
  throws('引擎直调六爻 gender:"女" 报错', () => compute({
    system: 'liuyao', datetime: '2026-03-01T10:00', lines: [7, 8, 9, 6, 7, 8], gender: '女',
  }), 'E_INPUT');
  throws('引擎直调 direction 拼错报错', () => compute({
    system: 'liuyao', datetime: '2026-03-01T10:00', lines: [7, 8, 9, 6, 7, 8], direction: 'romance',
  }), 'E_INPUT');
}

// ── 第三轮复查：仅建议项的边界修补 ──────────────────────────────
{
  const DAY = { stem: '甲', branch: '子', name: '甲子' };

  // 六爻直调 seed：以前 buildLiuyao({ seed }) 静默走 Math.random，同 seed 摇不出同一卦。
  const cast = (seed) => buildLiuyao({ seed, dayGanZhi: DAY });
  const seedA = cast(20261105);
  const seedB = cast(20261105);
  ok('六爻直调同 seed 可复现', JSON.stringify(seedA.cast.lines) === JSON.stringify(seedB.cast.lines), JSON.stringify(seedA.cast.lines));
  const seedC = cast(20261106);
  ok('六爻不同 seed 得到不同卦（本次样本）', JSON.stringify(seedA.cast.lines) !== JSON.stringify(seedC.cast.lines), JSON.stringify(seedC.cast.lines));
  throws('六爻直调 seed:"0x10" 与工具层同口径报错', () => buildLiuyao({ seed: '0x10' }), 'E_INPUT');
  throws('六爻 random 非函数报错', () => buildLiuyao({ random: 'nope' }), 'E_INPUT');

  // MCP 客户端把「没有 options」写成 null：应与不传同义，而不是 E_INPUT。
  const optNull = await def.execute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', options: null });
  ok('工具层 options:null 与不传等价', typeof optNull.handle === 'string', typeof optNull.handle);

  // 六爻辅助函数与 yongshenOf 同口径：opts 省略或 null 按默认；显式给错类型才报错。
  const chart = buildLiuyao({ lines: [7, 8, 9, 6, 7, 8], dayGanZhi: DAY });
  const useGod = yongshenOf(chart);
  for (const [name, fn] of [
    ['yongshenStrength', () => yongshenStrength(chart, useGod, null)],
    ['fushenAccess', () => fushenAccess(chart, useGod, null)],
    ['hexagramStrength', () => hexagramStrength(chart, null)],
    ['jinTuiPower', () => jinTuiPower(chart, null)],
    ['yingqiWindow', () => yingqiWindow(chart, useGod, null)],
  ]) {
    notThrows(`liuyao ${name}(opts=null) 按默认口径`, fn);
  }
  throws('liuyao 辅助函数 opts 传字符串仍报 E_INPUT', () => yongshenStrength(chart, useGod, 'x'), 'E_INPUT');

  // 塔罗牌库外牌名：常见别名归一；真未知的牌名在开场点名，逐张退回泛义。
  const aliasRead = tarotReading({ cards: [{ name: '愚人' }] });
  ok('塔罗别名「愚人」按「愚者」取牌义', aliasRead.some((p) => p.includes('天王星在水瓶座')), aliasRead.join('|').slice(0, 120));
  const unknownRead = tarotReading({ cards: [{ name: '不存在的牌' }] });
  ok('塔罗未知牌名在开场点名', unknownRead[0].includes('不在韦特 78 张牌库里'), unknownRead[0]);
  ok('塔罗未知牌名退回泛义且不留空关键词句',
    unknownRead.some((p) => p.includes('正位泛义')) && unknownRead.every((p) => !p.includes('正位：。')),
    unknownRead.join('|').slice(0, 160));

  // MBTI：整维未答时，结果里要能直接看出是哪一维，不能只靠字符串强度猜。
  const noEI = buildMbti({ answers: Array.from({ length: 24 }, (_, i) => (i % 4 === 0 ? null : 4)) });
  ok('MBTI 整维未答时列出维度', Array.isArray(noEI.unanswered) && noEI.unanswered.join(',') === 'EI', JSON.stringify(noEI.unanswered));
  ok('MBTI 未答维度写进说明', /EI.*一题未答/.test(noEI.note), noEI.note);
}
