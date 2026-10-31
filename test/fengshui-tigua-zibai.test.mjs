// 玄空 B5：兼向替卦（沈氏替星表、4.5° 阈值、同卦兼/出卦兼）与年月日时紫白。
//
// 对拍口径：
//   - 替星用《沈氏玄空学》坤壬乙诀 24 山全表，逐条核无缺无重；
//   - 兼向阈值按「偏离本山中心超过 4.5°」；
//   - 年月日时紫白按公式派锚点：2010 年八白、2003 年六白；癸未年正月五黄；
//     冬至后甲子日起一白、雨水后七赤、谷雨后四绿；夏至后甲子起九紫逆行；
//     冬至后四正/四墓/四生日子时起 1/7/4，夏至后起 9/3/6。
import { compute } from '../engine/index.js';
import {
  buildFengshui, jianXiangOf, TIGUA_TABLE, timeFlyingOf, JIAN_XIANG_THRESHOLD,
  MOUNTAIN_META, MOUNTAINS_24,
} from '../engine/fengshui.js';

let pass = 0; let fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log(`PASS  ${label}`); } else { fail++; console.log(`FAIL  ${label} -> ${detail === undefined ? '' : JSON.stringify(detail)}`); }
};
const eq = (label, a, b) => ok(label, a === b, `${JSON.stringify(a)} vs ${JSON.stringify(b)}`);
const throwsMsg = (label, fn, part) => {
  try { fn(); ok(label, false, '没有抛错'); } catch (e) { ok(label, String(e && e.message).includes(part), e && e.message); }
};
const throwsCode = (label, fn, code) => {
  try { fn(); ok(label, false, '没有抛错'); } catch (e) { ok(label, e && e.code === code, e && e.code); }
};
const build = (args) => buildFengshui({ action: 'xuankong', sitting: '子', facing: '午', ...args });

// ── ① 替星表：24 山全覆盖、只出 1/2/6/7/9 五星 ───────────────────
{
  const keys = Object.keys(TIGUA_TABLE);
  eq('替星表 24 山', keys.length, 24);
  ok('替星表与 24 山一一对应', MOUNTAINS_24.every((m) => Object.prototype.hasOwnProperty.call(TIGUA_TABLE, m.m)));
  ok('替星只出 1/2/6/7/9', [...new Set(Object.values(TIGUA_TABLE))].sort((a, b) => a - b).join(',') === '1,2,6,7,9', [...new Set(Object.values(TIGUA_TABLE))]);
  eq('子替一白', TIGUA_TABLE['子'], 1);
  eq('癸替一白', TIGUA_TABLE['癸'], 1);
  eq('坤替二黑', TIGUA_TABLE['坤'], 2);
  eq('乾替六白', TIGUA_TABLE['乾'], 6);
  eq('艮替七赤', TIGUA_TABLE['艮'], 7);
  eq('午替九紫', TIGUA_TABLE['午'], 9);
}

// ── ② 兼向阈值与同卦/出卦 ────────────────────────────────────────
{
  eq('阈值 4.5°', JIAN_XIANG_THRESHOLD, 4.5);
  const zi = MOUNTAIN_META['子'];
  eq('4.5° 仍正向', jianXiangOf(zi, 4.5).active, false);
  eq('4.6° 起替卦', jianXiangOf(zi, 4.6).active, true);
  const right = jianXiangOf(zi, 6);
  eq('子 +6° 兼癸', right.jian, '癸');
  eq('子兼癸是同卦兼', right.kind, '同卦兼');
  eq('子癸同阴', right.sameYinYang, true);
  const left = jianXiangOf(zi, -6);
  eq('子 -6° 兼壬', left.jian, '壬');
  eq('子壬同卦但一阴一阳', left.sameYinYang, false);
  const gui = MOUNTAIN_META['癸'];
  eq('癸 +6° 兼丑是出卦兼', jianXiangOf(gui, 6).kind, '出卦兼');
  ok('兼向说明含度数与兼山', right.note.includes('6°') && right.note.includes('癸') && right.note.includes('替卦'), right.note);
}

// ── ③ 8 运子午兼癸：山向替星入中，正向表不套 ─────────────────────
{
  const down = build({ period: 8 });
  const ti = build({ period: 8, sittingOffset: 6 });
  eq('8运子午下卦山星四入中', down.meta.shanCenter.star, 4);
  eq('8运子午下卦向星三入中', down.meta.xiangCenter.star, 3);
  eq('兼向后山星改一白入中', ti.meta.shanCenter.star, 1);
  eq('兼后向星改九紫入中', ti.meta.xiangCenter.star, 9);
  eq('山盘标替卦', ti.meta.shanCenter.mode, '替卦');
  eq('向盘标替卦', ti.meta.xiangCenter.mode, '替卦');
  eq('山盘记原运星四', ti.meta.shanCenter.original, 4);
  eq('山盘已替', ti.meta.shanCenter.replaced, true);
  eq('向盘记原运星三', ti.meta.xiangCenter.original, 3);
  eq('向盘已替', ti.meta.xiangCenter.replaced, true);
  eq('替卦不套正向表', ti.wangShanWangXiang.byTable, null);
  ok('替卦说明写清不套表', ti.wangShanWangXiang.note.includes('替卦盘不套正向'), ti.wangShanWangXiang.note);
  ok('替卦盘面仍可判到山到向', typeof ti.wangShanWangXiang.byChart === 'boolean');
  eq('4.5° 不换盘', JSON.stringify(build({ period: 8, sittingOffset: 4.5 }).palaces), JSON.stringify(down.palaces));
  ok('4.6° 换盘', JSON.stringify(build({ period: 8, sittingOffset: 4.6 }).palaces) !== JSON.stringify(down.palaces));
  const sorted = (key) => ti.palaces.map((p) => p[key]).sort((a, b) => a - b).join('');
  ok('替卦山盘仍是 1–9 排列', sorted('shan') === '123456789');
  ok('替卦向盘仍是 1–9 排列', sorted('xiang') === '123456789');
  const ti9 = build({ period: 9, sittingOffset: 6 });
  ok('当运星落中宫写中宫', ti9.dangYun.xiang.text.includes('中宫') && !ti9.dangYun.xiang.text.includes('undefined'), ti9.dangYun.xiang.text);
}

// ── ④ 用替而未替：5 运子山，替星与原运星同为 1 ───────────────────
{
  const down = build({ period: 5 });
  const ti = build({ period: 5, sittingOffset: 6 });
  eq('5运子山下卦山星一入中', down.meta.shanCenter.star, 1);
  eq('5运子山替星仍一入中', ti.meta.shanCenter.star, 1);
  eq('用替而未替标记', ti.meta.shanCenter.replaced, false);
  eq('用替而未替盘面与下卦一致', JSON.stringify(ti.palaces), JSON.stringify(down.palaces));
  ok('说明点出用替而未替', ti.wangShanWangXiang.note.includes('用替而未替'), ti.wangShanWangXiang.note);
}

// ── ⑤ 度数输入与边界 ────────────────────────────────────────────
{
  const byOffset = build({ period: 8, sittingOffset: 6 });
  const byDeg = build({ period: 8, sittingDegree: 6 });
  eq('sittingDegree 6 等同 offset 6', JSON.stringify(byDeg.palaces), JSON.stringify(byOffset.palaces));
  const byFaceDeg = buildFengshui({ action: 'xuankong', period: 8, sitting: '子', facing: '午', facingDegree: 186 });
  eq('facingDegree 186 等同 offset 6', JSON.stringify(byFaceDeg.palaces), JSON.stringify(byOffset.palaces));
  const neg = build({ period: 8, sittingDegree: 354 });
  eq('sittingDegree 354 得 -6°', neg.meta.sittingOffset, -6);
  eq('354° 兼壬', neg.meta.jianXiang.jian, '壬');

  throwsMsg('offset 超 7.5 报错', () => build({ period: 8, sittingOffset: 8 }), '7.5');
  throwsMsg('offset 非数字报错', () => build({ period: 8, sittingOffset: '6' }), '必须是数字');
  throwsMsg('度数不在子山报错', () => build({ period: 8, sittingDegree: 350 }), '不在子山');
  throwsMsg('度数越界报错', () => build({ period: 8, sittingDegree: 400 }), '0–360');
  throwsMsg('坐向兼度不一致报错', () => buildFengshui({ action: 'xuankong', period: 8, sitting: '子', facing: '午', sittingOffset: 6, facingOffset: -6 }), '不一致');
  throwsCode('兼度越界带 E_INPUT', () => build({ period: 8, sittingOffset: 9 }), 'E_INPUT');
}

// ── ⑥ 年月日时紫白：年与月锚点 ──────────────────────────────────
{
  const y = (year, month, day) => timeFlyingOf({ year, month, day, hour: 12, minute: 0 });
  eq('2010 年八白入中', y(2010, 9, 1).year.center, 8);
  eq('2003 年六白入中', y(2003, 2, 10).year.center, 6);
  eq('2026 年一白入中', y(2026, 10, 31).year.center, 1);
  eq('癸未年正月五黄', y(2003, 2, 10).month.center, 5);
  eq('癸未年二月四绿', y(2003, 3, 10).month.center, 4);
  eq('2026 戌月九紫入中', y(2026, 10, 31).month.center, 9);
  eq('节气月按寅月起数', y(2026, 10, 31).meta.monthNum, 9);
  eq('节气月名寒露', y(2026, 10, 31).meta.monthJie, '寒露');
  eq('年支取立春界', y(2026, 1, 10).meta.guaYear, 2025);
  eq('年支立春前归上一年', y(2026, 1, 10).meta.yearBranch, '巳');
}

// ── ⑦ 日紫白：六个分段锚点（甲子日） ────────────────────────────
{
  const d = (year, month, day, hour = 0) => timeFlyingOf({ year, month, day, hour, minute: 30 });
  eq('冬至–雨水甲子起一白', d(2024, 12, 26).day.center, 1);
  eq('雨水–谷雨甲子起七赤', d(2025, 2, 24).day.center, 7);
  eq('谷雨–夏至甲子起四绿', d(2025, 4, 25).day.center, 4);
  eq('夏至–处暑甲子起九紫', d(2025, 6, 24).day.center, 9);
  eq('处暑–霜降甲子起三碧', d(2025, 10, 22).day.center, 3);
  eq('霜降–冬至甲子起六白', d(2025, 12, 21).day.center, 6);
  eq('冬至后甲子顺飞', d(2024, 12, 26).day.fly, '顺飞');
  eq('夏至后甲子逆飞', d(2025, 6, 24).day.fly, '逆飞');
  eq('冬至交界前仍阴遁', d(2025, 12, 21, 18).meta.half, '阴遁');
  eq('冬至交界后转阳遁', d(2025, 12, 21, 23).meta.half, '阳遁');
  eq('23:00 后日星归次日', d(2026, 10, 31, 23).meta.dayGanzhi, d(2026, 11, 1, 0).meta.dayGanzhi);
}

// ── ⑧ 时紫白：冬夏两半 × 日支三组的子时起点 ─────────────────────
{
  const h = (year, month, day, hour = 0) => timeFlyingOf({ year, month, day, hour, minute: 30 });
  eq('阳遁四正日子时一白', h(2025, 2, 24).hour.center, 1);
  eq('阳遁四墓日子时七赤', h(2025, 2, 25).hour.center, 7);
  eq('阳遁四生日子时四绿', h(2025, 2, 26).hour.center, 4);
  eq('阴遁四正日子时九紫', h(2025, 6, 24).hour.center, 9);
  eq('阴遁四墓日子时三碧', h(2025, 6, 25).hour.center, 3);
  eq('阴遁四生日子时六白', h(2025, 6, 26).hour.center, 6);
  eq('阳遁午时一白进六位到七', h(2025, 2, 24, 12).hour.center, 7);
  eq('阴遁午时九紫退六位到三', h(2025, 6, 24, 12).hour.center, 3);
  eq('阳遁时盘顺飞', h(2025, 2, 24).hour.fly, '顺飞');
  eq('阴遁时盘逆飞', h(2025, 6, 24).hour.fly, '逆飞');
  eq('日子时支取子', h(2025, 2, 24).meta.hourBranch, '子');
  eq('午时支取午', h(2025, 2, 24, 12).meta.hourBranch, '午');
  ok('阴遁逆飞时中宫九紫、乾宫一白', h(2025, 6, 24).hour.palaces.find((p) => p.palace === '乾').num === 1, h(2025, 6, 24).hour.palaces);
}

// ── ⑨ 接线：玄空输出、摘要、compute 参数 ────────────────────────
{
  const r = build({ sittingOffset: 6, fortuneDate: '2026-10-31', fortuneTime: '12:00' });
  ok('输出带年月日时', r.timeFlying && r.timeFlying.year && r.timeFlying.month && r.timeFlying.day && r.timeFlying.hour);
  eq('飞星日期归九运', r.meta.period, 9);
  eq('显式运压过飞星日期', build({ period: 8, fortuneDate: '2026-10-31' }).meta.period, 8);
  eq('年月日时年星一白', r.timeFlying.year.center, 1);
  eq('年月日时月星九紫', r.timeFlying.month.center, 9);
  ok('飞星 meta 带节气与分段', r.timeFlying.meta.segment.includes('霜降') && r.timeFlying.meta.half === '阴遁');

  const yearOnly = build({ period: 9, fortuneYear: 2026 });
  ok('只给年份时 year 有、月日时为空', yearOnly.timeFlying.year && !yearOnly.timeFlying.month && !yearOnly.timeFlying.day && !yearOnly.timeFlying.hour);
  ok('只给年份时提示补日期', yearOnly.timeFlying.meta.note.includes('fortuneDate'), yearOnly.timeFlying.meta.note);
  ok('不给日期时没有 timeFlying', !build({ period: 9 }).timeFlying);

  const c = compute({
    system: 'fengshui', action: 'xuankong', sitting: '子', facing: '午',
    sittingOffset: 6, fortuneDate: '2026-10-31', fortuneTime: '12:00',
  });
  ok('summary 标替卦', c.summary.includes('·替卦') && c.summary.includes('【替卦】'), c.summary);
  ok('summary 含年月日时', c.summary.includes('【年月日时】') && c.summary.includes('年一白') && c.summary.includes('月九紫'), c.summary);
  ok('summary 表法写明替卦不套表', c.summary.includes('替卦不套正向表'), c.summary);

  throwsMsg('fortuneDate 格式错报错', () => build({ period: 9, fortuneDate: '2026/10/31' }), 'YYYY-MM-DD');
  throwsMsg('fortuneDate 非法日期报错', () => build({ period: 9, fortuneDate: '2026-02-30' }), '有效日期');
  throwsMsg('fortuneTime 格式错报错', () => build({ period: 9, fortuneDate: '2026-10-31', fortuneTime: '25:00' }), 'HH:MM');
  throwsCode('飞星日期错带 E_INPUT', () => build({ period: 9, fortuneDate: 'x' }), 'E_INPUT');
}

console.log(`\n${pass} PASS / ${fail} FAIL`);
process.exit(fail ? 1 : 0);
