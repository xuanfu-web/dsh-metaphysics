// 生时校正（仅八字）：给一组「过去发生过的事」，把候选时辰逐一排盘、按同一套信号规则打分，
// 输出候选排序，帮助缩小出生时辰的范围。
//
// 必须说清的三件事：
//   1. 这是**缩小范围**的参考，不替代出生记录；命中数相同或接近时，不要硬选一个；
//   2. 只有时柱（以及跨 23:00 时的日柱）会变，年/月柱通常不变，所以候选之间的差异集中在晚运、子女、事业后半段；
//   3. 打分规则是显式、固定的（见 matchEvent），不是拟合；换一套规则排序可能变。
import { buildBazi } from './bazi.js';
import { bool } from './bool.js';

const KINDS = ['career', 'wealth', 'love', 'move', 'health', 'other'];
const HOURS = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 23];
/** 事件条数上限：对账用不到几百条，超限是输入异常而不是需求 */
const MAX_EVENTS = 200;
/** 事件年份跨度上限：人活着的事件区间本来就窄，超宽只会把流年表撑爆 */
const MAX_SPAN = 120;

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
  // 事件只用来对账，几十条已足够。不设上限的后果很具体：20 万条会原样回显成 2MB 结果，
  // 并且下面的取最小值（Math.min(...arr) 逐元素入参）直接把栈打爆。
  if (clean.length > MAX_EVENTS) {
    const e = new Error(`生时校正的事件最多 ${MAX_EVENTS} 条，收到 ${clean.length} 条——只报最近几十年里确实发生过的事即可`);
    e.code = 'E_INPUT';
    throw e;
  }
  if (clean.some((x) => x.year < 1600 || x.year > 2400)) {
    const e = new Error('事件年份要落在 1600–2400 之间（与排盘支持的年份一致）');
    e.code = 'E_INPUT';
    throw e;
  }
  // 出生前的事件不参与对账：以前照样进窗口并计分，一个填错的年份就能把整体排序拉走，
  // 而排序看起来仍是「算出来的」。报错而不是静默丢掉——静默会让调用方以为它在名单里。
  const beforeBirth = clean.filter((x) => x.year < base.year);
  if (beforeBirth.length) {
    const e = new Error(`事件年份早于出生年 ${base.year}：${beforeBirth.map((x) => x.year).join('、')}——生时校正只对出生以后发生的事打分`);
    e.code = 'E_INPUT';
    throw e;
  }
  const nowYear = clean.reduce((m, x) => (x.year < m ? x.year : m), clean[0].year);
  // 流年表默认只有 10 条：事件比最早一条晚十年以上时永远查不到，被当成「没对上」，
  // 对所有候选同样落空，只会白白拉低命中率。窗口要覆盖到最晚一条事件。
  const lastYear = clean.reduce((m, x) => (x.year > m ? x.year : m), clean[0].year);
  // 窗口按事件年份逐年排盘，跨度不设上限就等于「两个年份决定要排多少张盘」：
  // [{year:1601},{year:2399}] 会让每个候选摊上 799 年流年，实测 1267ms（30 年跨度只有 9ms）。
  if (lastYear - nowYear + 1 > MAX_SPAN) {
    const e = new Error(`事件年份跨度太大：${nowYear}–${lastYear} 共 ${lastYear - nowYear + 1} 年，最多 ${MAX_SPAN} 年`
      + '——只报真正相关的几十年，别用两个极端年份把窗口撑开');
    e.code = 'E_INPUT';
    throw e;
  }
  // 候选时辰同样要限：一天只有 12 个时辰，给了 1000 个就是白排 1000 张盘
  const wanted = Array.isArray(opts.hours) && opts.hours.length
    ? [...new Set(opts.hours.filter((h) => Number.isInteger(h) && h >= 0 && h <= 23))]
    : HOURS;
  if (!wanted.length) {
    const e = new Error('候选时辰里没有有效的小时（0–23 的整数）');
    e.code = 'E_INPUT';
    throw e;
  }
  const hours = wanted.slice(0, 24);

  const candidates = hours.map((hour) => {
    const chart = buildBazi({
      ...base,
      hour,
      minute: 0,
      gender,
      lateZi: bool(opts.lateZi, true),
      trueSolar: bool(opts.trueSolar, true),
      dst: bool(opts.dst, true),
      address: typeof opts.address === 'string' ? opts.address : undefined,
      longitude: typeof opts.longitude === 'number' ? opts.longitude : undefined,
      geo: opts.geo && typeof opts.geo === 'object' ? opts.geo : undefined,
      nowYear,
      liunianTo: lastYear,
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
      // 时辰未知时没有时柱可校正：给 null，让调用方自己判断要不要做这件事
      hourGanzhi: chart.pillars.hour ? chart.pillars.hour.ganzhi : null,
      score: clean.length ? matched.length / clean.length : 0,
      hits: matched.length,
      total: clean.length,
      matchedYears: matched.map((x) => x.year),
      missedYears: missed.map((x) => x.year),
    };
  });
  // 真太阳时校正后，不同整点可能落进同一时辰（如东经 114.5° 一带 0:00 与 1:00 都在子时），
  // 排出来的盘完全一样。重复列 14 条会让用户以为有 14 种可能，这里按盘面合并。
  const merged = [];
  const seen = new Map();
  for (const c of candidates) {
    const key = `${c.dayGanzhi}|${c.hourGanzhi}`;
    const hit = seen.get(key);
    if (hit) {
      hit.hours.push(c.hour);
      hit.label = `${hit.hours.map((h) => `${String(h).padStart(2, '0')}:00`).join(' / ')} 起`;
      continue;
    }
    const item = { ...c, hours: [c.hour], label: `${String(c.hour).padStart(2, '0')}:00 起` };
    seen.set(key, item);
    merged.push(item);
  }
  merged.sort((a, b) => b.score - a.score || a.hour - b.hour);

  const days = [...new Set(merged.map((c) => c.dayGanzhi))];
  const best = merged[0];
  const second = merged[1];
  const tie = second && second.score === best.score;
  const dropped = candidates.length - merged.length;

  return {
    system: 'bazi',
    base,
    events: clean,
    hours,
    candidates: merged,
    best: best || null,
    tie,
    dayChanged: days.length > 1,
    note: `候选 ${merged.length} 组：命中数最高 ${best ? best.hits : 0}/${clean.length}${tie ? `（有并列：${merged.filter((c) => c.score === best.score).map((c) => c.hours.join('/')).join('、')} 点）` : ''}。` +
      (dropped ? `输入 ${candidates.length} 个整点中有 ${dropped} 个与相邻整点落在同一时辰，已合并为同一组。` : '') +
      `事件按 ${nowYear}–${lastYear} 年逐年对账（共 ${lastYear - nowYear + 1} 年）。` +
      (days.length > 1 ? `注意：跨 23:00 的候选会改变日柱（${days.join(' / ')}），这类差异比时柱更关键。` : '候选之间只差时柱（日柱未变）。') +
      ' 这是缩小范围的参考，不替代出生记录；命中数接近时不要硬选。',
  };
}

/** 事件类别（与工具 schema 的 kind 枚举一致）；导出时不起别名，打包器只支持直接导出 */
export const RECTIFY_KINDS = KINDS;
export default rectifyBirth;
