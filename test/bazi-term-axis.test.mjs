// 交节轴：节气时刻是标准时（东八区，经 DST 校正），出生时刻必须放回同一根轴再比先后。
//
// 反例形状：2024 立春在 02-04 16:27。东经 120° 以西真太阳时更早，真太阳时还没到立春、
// 标准时已经过了；东经 120° 以东反过来。旧实现拿真太阳时去 previousJie，会让年柱/月柱
// 在交节前后一个经度修正带宽度内判到另一侧。这里两侧各钉一个点，并锁住起运间隔/JIE 距离同轴。
import { buildBazi } from '../engine/bazi.js';
import { partsToJd } from '../engine/calendar.js';
import { ok, eq } from './_harness.mjs';

const four = (r) => [r.pillars.year.ganzhi, r.pillars.month.ganzhi, r.pillars.day.ganzhi, r.pillars.hour.ganzhi].join(' ');
const LICHUN_2024 = '2024-02-04 16:27';

// ── 一、西侧（lon 116.4，真太阳时 -28 分）：标准时已过立春，真太阳时还没到 ──
{
  const on = buildBazi({ year: 2024, month: 2, day: 4, hour: 16, minute: 30, gender: 'male', longitude: 116.4, trueSolar: true });
  const off = buildBazi({ year: 2024, month: 2, day: 4, hour: 16, minute: 30, gender: 'male', longitude: 116.4, trueSolar: false });
  ok('前提：真太阳时读数仍在立春之前', on.solarTime.trueSolarText === '2024-02-04 16:01', on.solarTime.trueSolarText);
  eq('开真太阳时：年柱已按立春进甲辰', four(on).split(' ')[0], '甲辰');
  eq('开真太阳时：月柱已按立春进丙寅', four(on).split(' ')[1], '丙寅');
  eq('关真太阳时：同一钟点同一组四柱', four(on), four(off));
  eq('距上一节按标准时算：3 分钟', on.jieqi.nearBoundaryMinutes, 3);
  eq('上一节写明立春', on.jieqi.previous.name, '立春');
  eq('上一节时刻即节气标准时', on.jieqi.previous.time, LICHUN_2024);
}

// ── 二、东侧（lon 134.8，真太阳时 +45 分）：真太阳时已过立春，标准时还没到 ──
{
  const r = buildBazi({ year: 2024, month: 2, day: 4, hour: 16, minute: 15, gender: 'male', longitude: 134.8, trueSolar: true });
  ok('前提：真太阳时读数已过立春', r.solarTime.trueSolarText === '2024-02-04 17:00', r.solarTime.trueSolarText);
  eq('年柱仍按标准时留在癸卯', r.pillars.year.ganzhi, '癸卯');
  eq('月柱仍按标准时留在乙丑', r.pillars.month.ganzhi, '乙丑');
  eq('逆排起运取上一节小寒，间隔按标准时', r.dayun.jiao.from.name, '小寒');
  const civil = partsToJd({ year: 2024, month: 2, day: 4, hour: 16, minute: 15 });
  const prevJie = partsToJd({ year: 2024, month: 1, day: 6, hour: 4, minute: 49 });
  ok('起运间隔 = 标准时出生 − 小寒', Math.abs(r.dayun.toNextJieDays - (civil - prevJie)) < 0.01, `${r.dayun.toNextJieDays} vs ${civil - prevJie}`);
}

// ── 三、离节够远时开关真太阳时只动时柱，不动年月柱 ──────────────────────
{
  const on = buildBazi({ year: 1990, month: 5, day: 12, hour: 14, minute: 30, gender: 'male', longitude: 116.4, trueSolar: true, dst: false });
  const off = buildBazi({ year: 1990, month: 5, day: 12, hour: 14, minute: 30, gender: 'male', longitude: 116.4, trueSolar: false, dst: false });
  const cols = (r) => four(r).split(' ').slice(0, 3).join(' ');
  eq('年月日三柱与真太阳时开关无关', cols(on), cols(off));
  eq('起运方向不受影响', on.dayun.direction, off.dayun.direction);
  ok('起运间隔亦不随经度修正漂移', Math.abs(on.dayun.toNextJieDays - off.dayun.toNextJieDays) < 1e-9,
    `${on.dayun.toNextJieDays} vs ${off.dayun.toNextJieDays}`);
  ok('交运时刻仍标真太阳时', on.dayun.jiao.frame === '真太阳时' && off.dayun.jiao.frame === '平太阳时',
    `${on.dayun.jiao.frame} / ${off.dayun.jiao.frame}`);
}
