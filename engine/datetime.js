// 共享的日期时间解析：各体系与工具层必须用同一把尺，避免某条分支绕过校验。
import { fail } from './fail.js';
import { MIN_YEAR, MAX_YEAR } from './validate.js';

export function daysInMonth(year, month) {
  if (month === 2) {
    const leap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    return leap ? 29 : 28;
  }
  return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
}

/** 严格解析公历日期 YYYY-MM-DD。
 *  格式不对 / 日子不存在（2 月 30 日）→ 返回 null，由调用方给自己的文案；
 *  格式对但年份超出 1600–2400 → 抛 E_RANGE。
 *
 *  年份闸门不能省：这里以前只查月/日，于是 0000-01-01、2500-06-01、9999-12-31 都能静默出盘——
 *  农历、节气、干支表都不覆盖这些年份，算出来的仍是「看着正常」的盘面，没人知道自己拿到了外推值。
 *  走 parseDateTime 的体系同一道闸早已生效，只收日期的体系（择日、小六壬）不该绕过。
 *  @param {string} raw
 *  @param {string} [who] 报错时说是谁的日期。择日必须传（startDate / 候选日）：
 *    否则越界会一路走到 buildAlmanac，由它抛出「黄历 的 year 超出支持范围」，锅甩给了一个用户没填的东西。
 */
export function parseYmd(raw, who = '') {
  const s = String(raw == null ? '' : raw).trim();
  const m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(s);
  if (!m) return null;
  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  if (month < 1 || month > 12 || day < 1 || day > daysInMonth(year, month)) return null;
  if (year < MIN_YEAR || year > MAX_YEAR) {
    const p = who ? `${who} ` : '';
    throw fail('E_RANGE', `${p}「${m[0]}」的年份超出可计算范围（${MIN_YEAR}–${MAX_YEAR}，收到 ${year} 年）；`
      + '农历与节气表不覆盖之外的年份');
  }
  return { year, month, day };
}

/** 解析 'YYYY-MM-DDTHH:mm' / 'YYYY-MM-DD HH:mm' / 'YYYY-MM-DD'
 *  可以带秒（用户常直接粘 ISO 串），但引擎的民用时间口径到分钟：秒只校验、不参与换算。 */
export function parseDateTime(text) {
  if (typeof text !== 'string' || !text.trim()) {
    throw fail('E_INPUT', '缺少 datetime（公历日期时间），例如 1990-05-12T14:30');
  }
  const m = text.trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T\s](\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?$/);
  if (!m) throw fail('E_INPUT', `无法解析 datetime：「${text}」，请用 1990-05-12T14:30 这种格式`);
  // 秒位以前只捕获不校验：\d{1,2} 放过 0–99，于是「T03:04:99」被静默折成 03:04。
  // 与 1990-02-30 同一类问题——非法输入悄悄变成一个合法时刻，盘面照样排出，没人知道。
  if (m[6] !== undefined && Number(m[6]) > 59) throw fail('E_INPUT', `秒超出范围：${m[6]}`);
  const out = {
    year: Number(m[1]), month: Number(m[2]), day: Number(m[3]),
    hour: Number(m[4] ?? 0), minute: Number(m[5] ?? 0),
  };
  if (out.month < 1 || out.month > 12) throw fail('E_INPUT', `月份超出范围：${out.month}`);
  // 只校验 1..31 会让 1990-02-30、2026-04-31 这类日期静默滚到下个月，整盘错位且无人察觉
  const maxDay = daysInMonth(out.year, out.month);
  if (out.day < 1 || out.day > maxDay) {
    throw fail('E_INPUT', `日期不存在：${out.year}-${out.month}-${out.day}（${out.year} 年 ${out.month} 月只有 ${maxDay} 天）`);
  }
  if (out.hour > 23 || out.minute > 59) throw fail('E_INPUT', `时间超出范围：${out.hour}:${out.minute}`);
  // ΔT（地球自转改正）表只覆盖 1900–2100，超出后按端点值外推，精度不可保证
  if (out.year < MIN_YEAR || out.year > MAX_YEAR) {
    throw fail('E_RANGE', `年份 ${out.year} 超出可计算范围（${MIN_YEAR}–${MAX_YEAR}）`);
  }
  if (out.year < 1900 || out.year > 2100) {
    out.precision = {
      level: 'approx',
      note: `ΔT 模型仅覆盖 1900–2100，${out.year} 年按端点值外推，节气与朔望时刻可能有分钟级偏差，月柱在交节前后需复核`,
    };
  }
  return out;
}
