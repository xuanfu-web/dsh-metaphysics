import {
  toJDN, dayGanzhiIndex, ganzhiName, termInstantJd, formatJd, TERM_NAMES, partsToJd, jdToParts,
} from '../engine/calendar.js';

const ok = (label, cond, extra = '') =>
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${label}${extra ? '  -> ' + extra : ''}`);

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
