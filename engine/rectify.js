// 生时校正（仅八字）：给一组「过去发生过的事」，把候选时辰逐一排盘、按同一套信号规则打分，
// 输出候选排序，帮助缩小出生时辰的范围。
//
// 必须说清的三件事：
//   1. 这是**缩小范围**的参考，不替代出生记录；命中数相同或接近时，不要硬选一个；
//   2. 只有时柱（以及跨 23:00 时的日柱）会变，年/月柱通常不变，所以候选之间的差异集中在晚运、子女、事业后半段；
//   3. 打分规则是显式、固定的（见 matchEvent），不是拟合；换一套规则排序可能变。
import { buildBazi } from './bazi.js';

const KINDS = ['career', 'wealth', 'love', 'move', 'health', 'other'];
const HOURS = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 23];

const TEN_GOD = (l) => l.stemTenGod || '';
const has = (l, re) => re.test((l.relations || []).join(''));
const tier = (l) => (l.luck && l.luck.tier) || '平';

/**
 * 单条「过去发生的事」在某个候选盘里的信号是否吻合（规则固定、可复核）。
 * @param {object} l 某年的流年条目
 * @param {string} kind career | wealth | love | move | health | other
 */
export function matchEvent(l, kind) {
  if (!l) return false;
  const tg = TEN_GOD(l);
  const t = tier(l);
  switch (kind) {
    case 'career': return /官|杀|食|伤/.test(tg) || has(l, /冲|合/) || t === '大吉' || t === '大忌';
    case 'wealth': return /财|食|伤/.test(tg) || t === '大吉' || t === '吉';
    case 'love': return /财|官|杀/.test(tg) || has(l, /合|冲/);
    case 'move': return has(l, /冲|合/);
    case 'health': return has(l, /刑|害|冲/) || t === '大忌' || t === '忌';
    default: return t === '大吉' || t === '大忌' || has(l, /冲|刑|合/);
  }
}

/**
 * @param {object} opts
 * @param {{year:number,month:number,day:number,minute?:number}} opts.base 出生日期（时辰待定）
 * @param {'male'|'female'} opts.gender
 * @param {Array<{year:number, kind:string}>} opts.events 过去发生的事（年份 + 类别）
 * @param {number[]} [opts.hours] 候选小时（默认 0/1/2/4/…/22/23）
 * @param {boolean} [opts.lateZi] 晚子时是否换日
 * @param {boolean} [opts.trueSolar]
 * @param {string} [opts.address]
 * @param {number} [opts.longitude]
 * @param {object} [opts.geo]
 */
export function rectifyBirth(opts) {
  const base = opts && opts.base;
  const events = (opts && opts.events) || [];
  const gender = opts && opts.gender;
  if (!base || !Number.isInteger(base.year) || !Number.isInteger(base.month) || !Number.isInteger(base.day)) {
    const e = new Error('生时校正需要出生日期 { year, month, day }');
    e.code = 'E_INPUT';
    throw e;
  }
  if (!gender) {
    const e = new Error('生时校正需要性别');
    e.code = 'E_INPUT';
    throw e;
  }
  const clean = events
    .filter((x) => x && Number.isInteger(Number(x.year)))
    .map((x) => ({ year: Number(x.year), kind: KINDS.includes(x.kind) ? x.kind : 'other' }));
  if (!clean.length) {
    const e = new Error('生时校正需要至少一条「过去发生的事」（年份 + 类别）');
    e.code = 'E_INPUT';
    throw e;
  }
  const nowYear = Math.min(...clean.map((x) => x.year));
  const hours = Array.isArray(opts.hours) && opts.hours.length
    ? opts.hours.filter((h) => Number.isInteger(h) && h >= 0 && h <= 23)
    : HOURS;

  const candidates = hours.map((hour) => {
    const chart = buildBazi({
      ...base,
      hour,
      minute: 0,
      gender,
      lateZi: opts.lateZi !== false,
      trueSolar: opts.trueSolar !== false,
      address: typeof opts.address === 'string' ? opts.address : undefined,
      longitude: typeof opts.longitude === 'number' ? opts.longitude : undefined,
      geo: opts.geo && typeof opts.geo === 'object' ? opts.geo : undefined,
      nowYear,
    });
    const matched = [];
    const missed = [];
    for (const ev of clean) {
      const l = (chart.liunian || []).find((x) => Number(x.year) === ev.year);
      (matchEvent(l, ev.kind) ? matched : missed).push(ev);
    }
    return {
      hour,
      label: `${String(hour).padStart(2, '0')}:00 起`,
      dayGanzhi: chart.pillars.day.ganzhi,
      hourGanzhi: chart.pillars.hour.ganzhi,
      score: clean.length ? matched.length / clean.length : 0,
      hits: matched.length,
      total: clean.length,
      matchedYears: matched.map((x) => x.year),
      missedYears: missed.map((x) => x.year),
    };
  });
  candidates.sort((a, b) => b.score - a.score || a.hour - b.hour);

  const days = [...new Set(candidates.map((c) => c.dayGanzhi))];
  const best = candidates[0];
  const second = candidates[1];
  const tie = second && second.score === best.score;

  return {
    system: 'bazi',
    base,
    events: clean,
    hours,
    candidates,
    best: best || null,
    tie,
    dayChanged: days.length > 1,
    note: `候选 ${candidates.length} 个：命中数最高 ${best ? best.hits : 0}/${clean.length}${tie ? `（有并列：${candidates.filter((c) => c.score === best.score).map((c) => c.hour).join('、')} 点）` : ''}。` +
      (days.length > 1 ? `注意：跨 23:00 的候选会改变日柱（${days.join(' / ')}），这类差异比时柱更关键。` : '候选之间只差时柱（日柱未变）。') +
      ' 这是缩小范围的参考，不替代出生记录；命中数接近时不要硬选。',
  };
}

/** 事件类别（与工具 schema 的 kind 枚举一致）；导出时不起别名，打包器只支持直接导出 */
export const RECTIFY_KINDS = KINDS;
export default rectifyBirth;
