// 引擎边界的入参守卫。
//
// 引擎的导出函数（buildBazi / buildZiwei / buildDaliuren / buildQimen…）假设调用方
// 已经把「1990-05-12T14:30」解析成了 { year, month, day, hour, minute }。传错形状时，
// 以前会在内部某行抛裸 TypeError（例如 buildBazi({ datetime: '...' })），
// 调用方只能看见 "Cannot read properties of null"，不知道是自己传错了什么。
//
// 这里统一在入口判一次，失败一律 E_INPUT，并在文案里写清「该传什么」。
import { fail } from './fail.js';

/** 支持的公历年份范围：更早的年份时区与历法口径都不可靠，宁可拒绝 */
export const MIN_YEAR = 1600;
export const MAX_YEAR = 2400;

export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function daysInMonth(year, month) {
  if (month === 2) return isLeapYear(year) ? 29 : 28;
  return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1] || 0;
}

const show = (v) => (typeof v === 'string' ? `「${v}」` : String(v));
const HINT = '引擎只接受解析好的公历字段 { year, month, day, hour?, minute? }；字符串请先交给宿主层的 parseDateTime 解析';

/**
 * 校验公历入参；不合法时抛 E_INPUT。
 * @param {object} input 至少含整数 year / month / day；hour、minute 可省略（按 0）
 * @param {string} [who] 出错时用于定位是谁的入参（合盘两侧各传 'a' / 'b'）
 */
export function assertCivil(input, who = '') {
  const p = who ? `${who} 的` : '';
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    const got = input === null ? 'null' : Array.isArray(input) ? '数组' : typeof input;
    throw fail('E_INPUT', `${p}入参必须是对象（收到 ${got}）；${HINT}`);
  }
  const hour = input.hour === undefined ? 0 : input.hour;
  const minute = input.minute === undefined ? 0 : input.minute;
  for (const [key, value] of [['year', input.year], ['month', input.month], ['day', input.day], ['hour', hour], ['minute', minute]]) {
    if (!Number.isInteger(value)) throw fail('E_INPUT', `${p}${key} 必须是整数（收到 ${show(value)}）；${HINT}`);
  }
  if (input.year < MIN_YEAR || input.year > MAX_YEAR) {
    throw fail('E_INPUT', `${p}year 超出支持范围 ${MIN_YEAR}–${MAX_YEAR}（收到 ${input.year}）；更早的年份时区与历法口径不可靠`);
  }
  if (input.month < 1 || input.month > 12) {
    throw fail('E_INPUT', `${p}month 超出范围 1–12（收到 ${input.month}）`);
  }
  const max = daysInMonth(input.year, input.month);
  if (input.day < 1 || input.day > max) {
    throw fail('E_INPUT', `${p}日期不存在：${input.year}-${input.month}-${input.day}（${input.year} 年 ${input.month} 月只有 ${max} 天）`);
  }
  if (hour < 0 || hour > 23) throw fail('E_INPUT', `${p}hour 超出范围 0–23（收到 ${hour}）`);
  if (minute < 0 || minute > 59) throw fail('E_INPUT', `${p}minute 超出范围 0–59（收到 ${minute}）`);
  return input;
}
