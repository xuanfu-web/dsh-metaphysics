// 紫微 · 闰月口径：按日切分（默认，主流排盘）/ 整月归次月 / 整月归本月。
// 重点防三件事：闰月后半月被当成上月排、流月斗君二次换月、非闰月被顺手改坏。
import { compute } from '../engine/index.js';
import { solarToLunar } from '../engine/lunar.js';
import { buildZiwei, leapPolicyOf, effectiveLunarMonth, LEAP_POLICIES } from '../engine/ziwei.js';
import { ok, eq } from './_harness.mjs';

// 2020 年闰四月（公历 5-23 起）：1–15 为前半月、16 起为后半月
const LU10 = solarToLunar(2020, 6, 1);
const LU15 = solarToLunar(2020, 6, 6);
const LU16 = solarToLunar(2020, 6, 7);
const LU21 = solarToLunar(2020, 6, 12);
eq('2020-06-01 是闰四月初十', [LU10.isLeap, LU10.month, LU10.day], [true, 4, 10]);
eq('2020-06-07 是闰四月十六', [LU16.isLeap, LU16.month, LU16.day], [true, 4, 16]);

// ── 一、口径函数 ───────────────────────────────────────────
eq('三档口径', LEAP_POLICIES, ['split', 'next', 'prev']);
eq('默认按日切分', leapPolicyOf({}), 'split');
eq('leapAsNext 是 next 的旧写法', leapPolicyOf({ leapAsNext: true }), 'next');
eq('显式 next', leapPolicyOf({ leapMonth: 'next' }), 'next');
eq('显式 prev', leapPolicyOf({ leapMonth: 'prev' }), 'prev');
eq('不认识的取值回到默认', leapPolicyOf({ leapMonth: 'nonsense' }), 'split');
eq('leapMonth 优先于旧开关', leapPolicyOf({ leapMonth: 'prev', leapAsNext: true }), 'prev');

eq('非闰月不受口径影响', effectiveLunarMonth({ isLeap: false, month: 6, day: 20 }, 'next'), 6);
eq('前半月归本月', effectiveLunarMonth(LU15, 'split'), 4);
eq('十六起归次月', effectiveLunarMonth(LU16, 'split'), 5);
eq('next 整月归次月', effectiveLunarMonth(LU21, 'next'), 5);
eq('prev 整月归本月', effectiveLunarMonth(LU21, 'prev'), 4);
eq('闰十二月十六起回绕到正月', effectiveLunarMonth({ isLeap: true, month: 12, day: 16 }, 'split'), 1);

// ── 二、起盘：默认按日切分 ─────────────────────────────────
const base = { year: 2020, month: 6, day: 12, hour: 10, minute: 0, gender: 'male', trueSolar: false, asOf: '2026-10-30T12:00' };
const SPLIT = buildZiwei(base);
eq('默认口径写进盘里', SPLIT.lunar.leapPolicy, 'split');
eq('起盘月按次月', SPLIT.lunar.month, 5);
eq('原始闰月仍保留', SPLIT.lunar.monthRaw, 4);
ok('闰月说明写清怎么算的', /21日按5月/.test(SPLIT.lunar.note), SPLIT.lunar.note);
eq('盘里回显口径', SPLIT.input.leapMonth, 'split');

const PREV = buildZiwei({ ...base, leapMonth: 'prev' });
const NEXT = buildZiwei({ ...base, leapMonth: 'next' });
const ALIAS = buildZiwei({ ...base, leapAsNext: true });
eq('prev 起盘月是本月', PREV.lunar.month, 4);
eq('next 起盘月是次月', NEXT.lunar.month, 5);
ok('后半月 prev 与 split 命宫不同', PREV.soul.branch !== SPLIT.soul.branch, `${PREV.soul.branch}/${SPLIT.soul.branch}`);
ok('后半月 split 与 next 命宫相同', SPLIT.soul.branch === NEXT.soul.branch, `${SPLIT.soul.branch}/${NEXT.soul.branch}`);
eq('旧开关等价于 next（命宫）', ALIAS.soul.branch, NEXT.soul.branch);
eq('旧开关等价于 next（紫微）', ALIAS.ziwei, NEXT.ziwei);
eq('旧开关在盘里标成 next', ALIAS.input.leapMonth, 'next');
eq('旧开关回显 leapAsNext', ALIAS.input.leapAsNext, true);

// 前半月：split 与 prev 同盘
const EARLY = { ...base, day: 5 };
eq('前半月 split 起盘月', buildZiwei(EARLY).lunar.month, 4);
eq('前半月 split 与 prev 同命宫', buildZiwei(EARLY).soul.branch, buildZiwei({ ...EARLY, leapMonth: 'prev' }).soul.branch);

// ── 三、流月斗君只换一次月 ─────────────────────────────────
eq('split 的斗君', SPLIT.doujun.zinian, NEXT.doujun.zinian);
ok('prev 的斗君与 split 不同', PREV.doujun.zinian !== SPLIT.doujun.zinian, `${PREV.doujun.zinian}/${SPLIT.doujun.zinian}`);
eq('流年斗君用换算后的月（不是再换一次）', ALIAS.flow.year.doujun, NEXT.flow.year.doujun);
eq('流年斗君与本命斗君自洽', SPLIT.flow.year.doujun, NEXT.flow.year.doujun);

// ── 四、非闰月：三种口径排出同一张盘 ───────────────────────
const NORMAL = { year: 1990, month: 5, day: 12, hour: 14, minute: 30, gender: 'female', trueSolar: false, asOf: '2026-10-30T12:00' };
const nA = buildZiwei({ ...NORMAL, leapMonth: 'split' });
const nB = buildZiwei({ ...NORMAL, leapMonth: 'next' });
const nC = buildZiwei({ ...NORMAL, leapMonth: 'prev' });
eq('非闰月 split = next（宫位）', JSON.stringify(nA.palaces), JSON.stringify(nB.palaces));
eq('非闰月 split = prev（宫位）', JSON.stringify(nA.palaces), JSON.stringify(nC.palaces));
eq('非闰月不写闰月提示', nA.lunar.note, undefined);

// ── 五、接线：compute / 摘要 ───────────────────────────────
const A = compute({ system: 'ziwei', datetime: '2020-06-12T10:00', gender: 'male', leapMonth: 'prev' });
const B = compute({ system: 'ziwei', datetime: '2020-06-12T10:00', gender: 'male' });
ok('compute 透传 leapMonth', A.lunar.month === 4 && A.lunar.leapPolicy === 'prev');
ok('默认就是 split', B.lunar.month === 5 && B.lunar.leapPolicy === 'split');
ok('摘要写闰月原日 + 起盘月', /【农历】2020年闰4月21日（按5月起盘）/.test(B.summary), B.summary.split('\n').find((l) => /农历/.test(l)));
ok('prev 摘要不写起盘月换算', /【农历】2020年闰4月21日（月首/.test(A.summary), A.summary.split('\n').find((l) => /农历/.test(l)));
ok('规则里写明默认按日切分', /按日切分/.test(B.rules.leapMonth), B.rules.leapMonth);
const D = compute({ system: 'ziwei', datetime: '1990-05-12T10:00', gender: 'male' });
ok('非闰月摘要不带闰月换算', !/（按\d+月起盘）/.test(D.summary));
ok('不认识的 leapMonth 不报错、按默认算', (() => {
  const X = compute({ system: 'ziwei', datetime: '2020-06-12T10:00', gender: 'male', leapMonth: 'nonsense' });
  return X.lunar.leapPolicy === 'split' && X.lunar.month === 5;
})());
