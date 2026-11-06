import {
  toJDN, dayGanzhiIndex, ganzhiName, termInstantJd, formatJd, TERM_NAMES, partsToJd, jdToParts, deltaTSeconds,
} from '../engine/calendar.js';

import { ok } from './_harness.mjs';

// ΔT 远年外推：括号里是「世纪」不是年。写成 32×(y−1820)² 会让 2400 年 ΔT 达 1076 万秒（约 124 天），
// 节气与朔望整体推后几个月——2026-11-06 复查时抓到的单位错误，必须锁住量级与连续性。
ok('ΔT 2100 仍取端点 110s', Math.abs(deltaTSeconds(2100) - 110) < 0.5, String(deltaTSeconds(2100)));
ok('ΔT 2101 与 2100 连续（< 2s）', deltaTSeconds(2101) - deltaTSeconds(2100) < 2, String(deltaTSeconds(2101)));
ok('ΔT 2200 ≈ 321s', Math.abs(deltaTSeconds(2200) - 321) < 3, String(deltaTSeconds(2200)));
ok('ΔT 2400 ≈ 936s', Math.abs(deltaTSeconds(2400) - 936) < 5, String(deltaTSeconds(2400)));
ok('ΔT 远年不会大到「天」级（< 3600s）', deltaTSeconds(2400) < 3600, String(deltaTSeconds(2400)));
ok('ΔT 2100→2400 单调递增', deltaTSeconds(2400) > deltaTSeconds(2200) && deltaTSeconds(2200) > deltaTSeconds(2100));

ok('JDN(2000-01-01) = 2451545', toJDN(2000, 1, 1) === 2451545, String(toJDN(2000, 1, 1)));
ok('JDN(1949-10-01) = 2433191', toJDN(1949, 10, 1) === 2433191, String(toJDN(1949, 10, 1)));

ok('日柱 2000-01-01 = 戊午', ganzhiName(dayGanzhiIndex(toJDN(2000, 1, 1))).name === '戊午',
  ganzhiName(dayGanzhiIndex(toJDN(2000, 1, 1))).name);
ok('日柱 1949-10-01 = 甲子', ganzhiName(dayGanzhiIndex(toJDN(1949, 10, 1))).name === '甲子',
  ganzhiName(dayGanzhiIndex(toJDN(1949, 10, 1))).name);

// 2024 年节气锚点（北京时间，公开历书值），允许 ±10 分钟（低精度太阳黄经的固有误差）
const anchors2024 = {
  立春: [2, 4, 16, 26.9],
  春分: [3, 20, 11, 6.2],
  夏至: [6, 21, 4, 50.8],
  秋分: [9, 22, 20, 43.8],
  冬至: [12, 21, 17, 20.6],
};
for (const [name, [m, d, h, mi]] of Object.entries(anchors2024)) {
  const i = TERM_NAMES.indexOf(name);
  const got = jdToParts(termInstantJd(2024, i));
  const expectMinutes = h * 60 + mi;
  const gotMinutes = got.hour * 60 + got.minute;
  const delta = gotMinutes - expectMinutes;
  const sameDay = got.month === m && got.day === d;
  ok(`2024 ${name} 偏差 ${delta.toFixed(0)} 分钟 (≤10)`, sameDay && Math.abs(delta) <= 10,
    `${got.month}-${got.day} ${got.hour}:${String(got.minute).padStart(2, '0')}`);
}

// 1950 年立春（用于历史数据交叉校验）
console.log('1950 立春:', formatJd(termInstantJd(1950, 2)));
console.log('1984 立春:', formatJd(termInstantJd(1984, 2)));

const round = partsToJd({ year: 2024, month: 2, day: 4, hour: 16, minute: 27 });
const back = jdToParts(round);
ok('时间往返', back.year === 2024 && back.month === 2 && back.day === 4 && back.hour === 16 && back.minute === 27,
  JSON.stringify(back));

// jdToParts 的两条不变量，都是真踩过的坑：
// ① 整分必须原样回来。JD 是浮点，13:00 常算成 779.99999 分，直接 floor 就成了 12:59，
//    未时跌回午时——紫微的火铃地空、八字的时柱会跟着错一整宫。
const minutesBad = [];
for (const day of [4, 10, 29]) {
  for (let mi = 0; mi < 1440; mi += 7) {
    const p0 = { year: 2024, month: 2, day, hour: Math.floor(mi / 60), minute: mi % 60 };
    const p = jdToParts(partsToJd(p0));
    if (p.year !== 2024 || p.month !== 2 || p.day !== day || p.hour !== p0.hour || p.minute !== p0.minute) {
      minutesBad.push(`${day}日${p0.hour}:${String(p0.minute).padStart(2, '0')} → ${p.hour}:${String(p.minute).padStart(2, '0')}`);
    }
  }
}
ok('全天整分往返不失（含 2 月 29 日）', minutesBad.length === 0, `${minutesBad.length} 处：${minutesBad.slice(0, 3).join('；')}`);

// ② 跨午夜不许进位。旧写法四舍五入到分再对 24 取模：23:59:45 一入位就是 1440 分，
//    小时回 0、日序不动，于是「当天 23:59:45」被写成「当天 00:00」——日柱凭空退一天。
//    晚子时换日与真太阳时跨午夜正好都踩在这条线上。
const midnightJd = partsToJd({ year: 2024, month: 2, day: 10, hour: 23, minute: 59 }) + 45 / 86400;
const lateNight = jdToParts(midnightJd);
ok('23:59:45 仍属 2 月 10 日 23:59', lateNight.day === 10 && lateNight.hour === 23 && lateNight.minute === 59,
  JSON.stringify(lateNight));
ok('23:59:45 往回误差小于 1 分', Math.abs(partsToJd(lateNight) - midnightJd) * 1440 < 1,
  `${((partsToJd(lateNight) - midnightJd) * 1440).toFixed(2)} 分`);
const afterMidnight = jdToParts(partsToJd({ year: 2024, month: 2, day: 11, hour: 0, minute: 0 }) + 30 / 86400);
ok('次日 00:00:30 属 2 月 11 日', afterMidnight.day === 11 && afterMidnight.hour === 0 && afterMidnight.minute === 0,
  JSON.stringify(afterMidnight));
