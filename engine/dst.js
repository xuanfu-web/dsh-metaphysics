// 中国夏令时（1986–1991）校正：纯本地确定性。
//
// 这六年春夏钟表拨快 1 小时：出生证上的时间多数是「夏令时钟面时间」，
// 不校正则时辰（乃至日柱）整体错一档。区间为通行口径（春季 02:00 起，秋季 02:00 止，含头不含尾）。
// 依据：国务院 1986–1991 年夏令时通告；与公开万年历对拍一致。
import { daysInMonth } from './validate.js';

/** 历年夏令时区间：[起始日, 结束日]（本地钟面时间）。 */
export const DST_SPANS = {
  1986: ['1986-05-04', '1986-09-14'],
  1987: ['1987-04-12', '1987-09-13'],
  1988: ['1988-04-10', '1988-09-11'],
  1989: ['1989-04-16', '1989-09-17'],
  1990: ['1990-04-15', '1990-09-16'],
  1991: ['1991-04-14', '1991-09-15'],
};

const ORD = (y, m, d) => y * 10000 + m * 100 + d;

/**
 * 给定钟面时刻是否落在夏令时区间内。
 * @param {{year:number,month:number,day:number,hour:number,minute?:number}} t
 */
export function inDstSpan(t) {
  const span = DST_SPANS[t.year];
  if (!span) return false;
  const [sy, sm, sd] = span[0].split('-').map(Number);
  const [ey, em, ed] = span[1].split('-').map(Number);
  const n = ORD(t.year, t.month, t.day);
  if (n < ORD(sy, sm, sd) || n > ORD(ey, em, ed)) return false;
  const minutes = t.hour * 60 + (t.minute || 0);
  if (n === ORD(sy, sm, sd) && minutes < 120) return false; // 起始日 02:00 起
  if (n === ORD(ey, em, ed) && minutes >= 120) return false; // 结束日 02:00 止
  return true;
}

/**
 * 夏令时校正：钟面时间减 1 小时（跨日正确回退）。
 * @param {{year:number,month:number,day:number,hour:number,minute?:number}} t
 * @returns {{year,month,day,hour,minute,applied:boolean,note:string|null}}
 */
export function applyDst(t) {
  const minute = t.minute || 0;
  if (!inDstSpan(t)) return { year: t.year, month: t.month, day: t.day, hour: t.hour, minute, applied: false, note: null };
  let { year, month, day, hour } = t;
  hour -= 1;
  if (hour < 0) {
    hour += 24;
    day -= 1;
    if (day < 1) {
      month -= 1;
      if (month < 1) { month = 12; year -= 1; }
      day = daysInMonth(year, month);
    }
  }
  return {
    year, month, day, hour, minute,
    applied: true,
    note: `检出自 ${DST_SPANS[t.year][0]} 至 ${DST_SPANS[t.year][1]} 的中国夏令时：出生钟面时间已减 1 小时校正`,
  };
}

/** 把夏令时说明折进 notes 数组（不改动其它口径）。 */
export function withDstNote(notes, dst) {
  const out = Array.isArray(notes) ? notes.slice() : [];
  if (dst && dst.applied && dst.note) out.push(dst.note);
  return out;
}
