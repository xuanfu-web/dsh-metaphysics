// 小六壬（诸葛马前课）：月/日/时（或报三个数）掐指落宫，六宫循环。
// 口径：通行掌诀；断语为白话提炼（非原文照录）。轻量快占，属民俗参考。
import { solarToLunar } from './lunar.js';
import { bool } from './bool.js';
import { hourToBranch } from './almanac.js';
import { BRANCHES, fromJDN, toJDN } from './calendar.js';
import { parseYmd } from './datetime.js';
import { assertShifted } from './validate.js';
import { fail } from './fail.js';

/** 六宫：吉凶 + 白话断语。 */
export const PALACES = {
  大安: { luck: '吉', text: '事事昌顺，宜静守不宜妄动；所问之事根基稳，缓一缓更妥。' },
  留连: { luck: '凶', text: '事多牵扯反复，暗中有耗；宜守不宜进，防拖延与口舌。' },
  速喜: { luck: '吉', text: '喜事将至，行动宜快；所问之事三日内外见分晓。' },
  赤口: { luck: '凶', text: '口舌是非、官讼之象；宜谨言慎行，凡事留凭证。' },
  小吉: { luck: '吉', text: '小有助力，慢慢来能成；合作与人际有贵人。' },
  空亡: { luck: '凶', text: '落空之象，谋事多不成；宜停一停，改期再议。' },
};

export const PALACE_ORDER = ['大安', '留连', '速喜', '赤口', '小吉', '空亡'];

const pick = (n) => PALACE_ORDER[(((n - 1) % 6) + 6) % 6];

/**
 * 小六壬主函数。
 * @param {{mode:'time'|'number', date?:string, hour?:number, num1?:number, num2?:number, num3?:number, question?:string}} input
 *   time 模式下 date 与 hour 必须成对（缺时辰则同一天任何时刻同宫，等于静默代填）。
 */
export function buildXiaoliuren(input) {
  if (!input || typeof input !== 'object') {
    throw fail('E_INPUT', '小六壬起课参数不能为空：时间起课要 date / hour，数字起课要 num1 / num2 / num3');
  }
  const mode = input.mode === 'number' ? 'number' : 'time';
  let m;
  let d;
  let h;
  let originText;
  if (mode === 'time') {
    if (typeof input.hour !== 'number' || !Number.isInteger(input.hour) || input.hour < 0 || input.hour > 23) {
      throw fail('E_INPUT', '时间起课必须同时给 date 与 hour（0–23）：掐指按时辰推进，缺时辰不可代填');
    }
    const mt = parseYmd(input.date, 'date');
    if (!mt) {
      throw fail('E_INPUT', input.date
        ? `date 不是真实存在的公历日期：「${input.date}」，请用 2026-12-01 这种格式`
        : '时间起课需要 date（公历 YYYY-MM-DD）——请向用户询问日期');
    }
    // 晚子时换日与八字/六壬/奇门同口径：23:00–23:59 归次日，否则同一子时前后会落到两个日子
    let y = mt.year;
    let mo = mt.month;
    let dy = mt.day;
    const lateZi = bool(input.lateZi, true);
    if (lateZi && input.hour >= 23) {
      const next = assertShifted(fromJDN(toJDN(y, mo, dy) + 1), '小六壬时间起课');
      y = next.year;
      mo = next.month;
      dy = next.day;
    }
    const lunar = solarToLunar(y, mo, dy);
    const branch = hourToBranch(input.hour);
    m = lunar.month;
    d = lunar.day;
    h = BRANCHES.indexOf(branch) + 1;
    originText = `农历${lunar.month}月${lunar.day}日 ${branch}时：月${m} → 日${d} → 时${h} 掐指落宫${lateZi && input.hour >= 23 ? '（晚子时按次日）' : ''}`;
  } else {
    const nums = [input.num1, input.num2, input.num3].map(Number);
    if (nums.some((x) => !Number.isInteger(x) || x < 1 || x > 99)) {
      throw fail('E_INPUT', '报数起课需要三个 1–99 的正整数（随口报即可）——缺数请向用户索要，不要代填');
    }
    [m, d, h] = nums;
    originText = `报数 ${m}、${d}、${h}：依次按月/日/时位掐指落宫`;
  }
  const p1 = pick(m);
  const p2 = pick(PALACE_ORDER.indexOf(p1) + 1 + d - 1);
  const p3 = pick(PALACE_ORDER.indexOf(p2) + 1 + h - 1);
  const info = PALACES[p3];
  return {
    system: 'xiaoliuren',
    // question 放在顶层，不放进 meta：句柄按设计不收 question（它不影响盘面），
    // 放进 meta 会让「句柄回放」与「原始调用」的 meta 不一致（回放后变 null），
    // 看起来像盘变了。其余体系也都是把 question 挂顶层。
    meta: { mode: mode === 'time' ? '时间起课' : '报数起课', originText },
    question: input.question || null,
    steps: [p1, p2, p3],
    result: { palace: p3, luck: info.luck, text: info.text },
    sources: ['掌诀口径：通行马前口诀（白话提炼，非原文照录）'],
    disclaimer: '小六壬为轻量快占，属民俗娱乐参考；重要事项请综合现实信息判断。',
  };
}
