// 择日：逐日按黄历「建除简表宜忌」+ 建除神适配 + 冲属相排除打分排序。
// 口径透明：这是排序引导，不是吉凶断语；未收录逐日神煞，冲煞按日支对生肖。
import { fromJDN, toJDN } from './calendar.js';
import { buildAlmanac, SHENGXIAO } from './almanac.js';
import { fail } from './fail.js';

// 择日的入参错误一律带 E_INPUT：裸 new Error 到工具层只剩 [E_INTERNAL]，
// 模型拿到的是一句没有指向性的文案，改不了参数。
const bad = (message) => fail('E_INPUT', message);

/** 支持的事项：直接宜词 + 关联宜词（黄历措辞）。 */
export const TASKS = {
  嫁娶: { yi: ['嫁娶', '结亲', '订盟', '纳采'], related: ['会亲友', '裁衣'], category: 'marriage' },
  订婚: { yi: ['订盟', '纳采'], related: ['嫁娶', '会亲友'], category: 'marriage' },
  领证: { yi: ['嫁娶', '纳采'], related: ['订盟', '会亲友'], category: 'marriage' },
  提亲: { yi: ['纳采', '订盟'], related: ['会亲友'], category: 'marriage' },
  收送聘金: { yi: ['纳采', '订盟'], related: ['嫁娶'], category: 'marriage' },
  满月酒: { yi: ['祭祀', '祈福'], related: ['会亲友'], category: 'celebration' },
  开业: { yi: ['开市', '立券', '交易'], related: ['纳财', '挂匾'], category: 'business' },
  交易: { yi: ['交易', '立券'], related: ['开市', '纳财'], category: 'business' },
  投资: { yi: ['纳财', '交易'], related: ['立券'], category: 'business' },
  签订合同: { yi: ['立券', '交易'], related: ['纳财', '开市'], category: 'contract' },
  签约: { yi: ['立券', '交易'], related: ['纳财', '开市'], category: 'contract' },
  纳财: { yi: ['纳财', '收账'], related: ['开市', '立券'], category: 'contract' },
  入宅: { yi: ['入宅', '移徙'], related: ['安床', '修造', '扫舍'], category: 'move' },
  搬家: { yi: ['移徙', '入宅'], related: ['安床', '修造'], category: 'move' },
  搬家入宅: { yi: ['入宅', '移徙'], related: ['安床', '扫舍'], category: 'move' },
  动土: { yi: ['动土', '修造'], related: ['竖柱', '上梁'], category: 'construction' },
  装修: { yi: ['修造', '修饰垣墙'], related: ['动土'], category: 'construction' },
  装修建造: { yi: ['修造', '动土'], related: ['竖柱', '上梁'], category: 'construction' },
  试车买车: { yi: ['交易', '纳财'], related: ['出行'], category: 'purchase' },
  安葬: { yi: ['安葬', '破土'], related: ['立碑', '埋穴'], category: 'burial' },
  出行: { yi: ['出行'], related: ['上任', '赴任'], category: 'travel' },
  旅行: { yi: ['出行'], related: ['上任', '赴任'], category: 'travel' },
  赴任: { yi: ['上任', '赴任'], related: ['出行'], category: 'travel' },
  访亲友: { yi: ['会亲友'], related: ['出行'], category: 'visit' },
  入学: { yi: ['入学'], related: ['开市', '修造'], category: 'study' },
  祭祀: { yi: ['祭祀'], related: ['祈福', '求嗣'], category: 'worship' },
  求医: { yi: ['求医', '疗病'], related: ['针灸'], category: 'medical' },
};

/** 事项分组（界面按组呈现；与商用黄历的「常用/婚嫁/生活/建造/工商」对应）。 */
export const TASK_GROUPS = {
  常用: ['嫁娶', '搬家入宅', '出行', '开业', '签订合同', '祭祀'],
  婚嫁: ['嫁娶', '订婚', '领证', '提亲', '收送聘金', '满月酒'],
  生活: ['搬家', '入宅', '旅行', '访亲友', '入学', '求医', '祭祀'],
  建造: ['动土', '装修', '装修建造', '安葬', '试车买车'],
  工商: ['开业', '交易', '投资', '签订合同', '签约', '纳财', '赴任'],
};

/** 建除十二神按事项大类的通行适配（简化口径）。 */
const ZHIXING_FAVOR = {
  marriage: ['满', '定', '成', '开'],
  celebration: ['满', '成', '开', '平'],
  business: ['开', '成', '满', '收'],
  move: ['定', '成', '开', '除'],
  construction: ['建', '除', '成', '开'],
  purchase: ['成', '开', '满'],
  burial: ['除', '定', '闭', '破'],
  travel: ['建', '成', '开', '除'],
  visit: ['满', '平', '定', '成'],
  study: ['成', '开', '建'],
  worship: ['除', '满', '平', '定', '执', '成', '开'],
  contract: ['定', '成', '收', '开'],
  medical: ['除', '开'],
};

const VERDICT = (score, ctx) => {
  if (ctx.chongSelf) {
    return { verdict: '回避', text: `当日冲${ctx.chongSelf}（当事人属相）：传统择日径直排除，不进推荐与可用名单。`, excluded: true };
  }
  if (score >= 3) return { verdict: '推荐', text: '宜项与建除相配，此日对所问事项顺遂。', excluded: false };
  if (score >= 1) {
    return {
      verdict: '可用',
      text: ctx.jiHit.length ? `可考虑，但当日忌${ctx.jiHit.join('、')}：宜项加分、忌项减分，未抵消干净。` : '未见冲克，可用；若有更好的日子，优先取推荐日。',
      excluded: false,
    };
  }
  if (score >= 0) return { verdict: '平平', text: ctx.jiHit.length ? `当日忌${ctx.jiHit.join('、')}，宜项不相干，不作首选。` : '宜忌不相干，无助力也无冲克。', excluded: false };
  return { verdict: '回避', text: ctx.jiHit.length ? `当日忌${ctx.jiHit.join('、')}，对所问事项不宜。` : '减分项多于加分项，此日不宜。', excluded: false };
};

/**
 * 择日主函数。
 * @param {{task:string, startDate:string, days?:number, shengXiao?:string}} input
 *   startDate 必填（公历 YYYY-MM-DD），避免引擎在无时钟环境下静默取「今天」。
 */
/** 严格解析公历日期：2 月 30 日这类不存在的日子直接判非法，不滚到下个月 */
function parseYmd(raw) {
  const m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(raw || '').trim());
  if (!m) return null;
  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  if (month < 1 || month > 12 || day < 1) return null;
  const back = fromJDN(toJDN(year, month, day));
  return back.year === year && back.month === month && back.day === day ? { year, month, day } : null;
}

const ymd = (p) => `${p.year}-${String(p.month).padStart(2, '0')}-${String(p.day).padStart(2, '0')}`;

/**
 * 择日主函数。
 * @param {{task:string, startDate:string, days?:number, shengXiao?:string,
 *   candidates?:string[]}} input
 *   startDate 必填（公历 YYYY-MM-DD），避免引擎在无时钟环境下静默取「今天」。
 *   candidates 给了就只比这几个候选日（2–12 个，去重、保持输入顺序），startDate 与 days 不参与。
 */
export function buildZeri(input) {
  const task = input.task;
  if (!TASKS[task]) throw bad(`不支持的事项「${task}」。支持：${Object.keys(TASKS).join('、')}`);
  const shengXiaoRaw = typeof input.shengXiao === 'string' ? input.shengXiao.trim() : '';
  const shengXiao = shengXiaoRaw || null;
  if (shengXiao && !SHENGXIAO.includes(shengXiao)) throw bad(`shengXiao 须为生肖名：${SHENGXIAO.join('、')}`);

  // 候选日模式：只比用户给的这几天，不再按区间扫
  let candidates = null;
  if (input.candidates !== undefined && input.candidates !== null) {
    if (!Array.isArray(input.candidates)) {
      throw bad('candidates 须为日期数组，例如 ["2026-12-01","2026-12-08","2026-12-15"]');
    }
    if (input.candidates.length < 2) throw bad('candidates 至少给 2 个候选日；只想看一天请用 startDate + days: 1');
    if (input.candidates.length > 12) throw bad('candidates 最多 12 个候选日；更多请用 startDate + days 扫区间');
    const seen = new Set();
    candidates = [];
    for (const raw of input.candidates) {
      const p = parseYmd(raw);
      if (!p) throw bad(`候选日不是真实存在的公历日期：「${raw}」，请用 2026-12-01 这种格式`);
      const key = ymd(p);
      if (seen.has(key)) continue;
      seen.add(key);
      candidates.push(p);
    }
    if (candidates.length < 2) throw bad('候选日去重后不足 2 天；至少要两个不同的日子才谈得上比较');
  }

  let start = null;
  let days = 0;
  if (!candidates) {
    const m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(input.startDate || '').trim());
    if (!m) throw bad('择日需要 startDate（公历 YYYY-MM-DD）——请向用户询问起算日，不要代填');
    start = { year: Number(m[1]), month: Number(m[2]), day: Number(m[3]) };
    // days 以前只认 Number.isInteger，于是 "45"（模型很爱给字符串）与 45.5 都静默变成 30 天：
    // 用户要的区间被悄悄改短，而结果里只看得到实际扫了几天，看不出被改过。
    // 现在：能规范成整数的（含数字串）就规范，范围外或非数字一律报错，不猜。
    const rawDays = input.days;
    if (rawDays === undefined || rawDays === null || rawDays === '') {
      days = 30;
    } else {
      const n = Number(rawDays);
      if (!Number.isInteger(n)) throw bad(`择日的 days 要是 1–60 的整数，收到「${rawDays}」`);
      if (n < 1 || n > 60) throw bad(`择日的 days 要在 1–60 之间（${n} 超出范围）；更长请用分段多次查询`);
      days = n;
    }
  }

  const spec = TASKS[task];
  const zhixingSet = ZHIXING_FAVOR[spec.category];

  const makeRow = (p) => {
    const a = buildAlmanac(p);
    let score = 0;
    const reasons = [];
    const yiHit = spec.yi.filter((w) => a.yi.includes(w));
    if (yiHit.length) { score += 2; reasons.push(`宜${yiHit.join('、')}（+2）`); }
    const relHit = spec.related.filter((w) => a.yi.includes(w));
    if (relHit.length) { score += 1; reasons.push(`关联宜项${relHit.join('、')}（+1）`); }
    const jiHit = [...spec.yi, ...spec.related].filter((w) => a.ji.includes(w));
    if (jiHit.length) { score -= 3; reasons.push(`忌${jiHit.join('、')}（-3）`); }
    const chongSelf = shengXiao && a.chong.shengXiao === shengXiao ? shengXiao : null;
    if (chongSelf) { score -= 2; reasons.push(`冲${shengXiao}（当事人属相，径直排除）`); }
    if (zhixingSet.includes(a.zhiXing)) { score += 1; reasons.push(`建除${a.zhiXing}神利${task}（+1）`); }
    if (a.zhiXing === '破' && spec.category !== 'burial') { score -= 1; reasons.push('破日（-1）'); }
    if (a.zhiXing === '危' && spec.category !== 'travel' && spec.category !== 'worship') { score -= 1; reasons.push('危日（-1）'); }

    const v = VERDICT(score, { chongSelf, jiHit });
    return {
      date: a.meta.date,
      weekday: a.meta.weekday,
      lunar: a.lunar.text,
      dayGanZhi: a.ganzhi.day,
      zhiXing: a.zhiXing,
      yi: a.yi,
      ji: a.ji,
      chong: a.chong.shengXiao,
      score,
      reasons,
      verdict: v.verdict,
      verdictText: v.text,
      ...(v.excluded ? { excluded: true } : {}),
    };
  };

  const list = candidates
    ? candidates.map(makeRow)
    : Array.from({ length: days }, (_, i) => makeRow(fromJDN(toJDN(start.year, start.month, start.day) + i)));

  const ranked = list.slice().sort((x, y) => y.score - x.score || (x.date < y.date ? -1 : 1));
  const startDate = candidates
    ? candidates.slice().sort((x, y) => (ymd(x) < ymd(y) ? -1 : 1)).map(ymd)[0]
    : ymd(start);

  // 候选日比较：只在这几天里比，给出最高分和同分者；不换算成「好多少」
  let compare = null;
  if (candidates) {
    const pool = ranked.filter((d) => !d.excluded);
    const top = pool[0] || null;
    const scores = list.map((d) => d.score);
    compare = {
      mode: 'candidates',
      count: list.length,
      best: top ? {
        date: top.date,
        score: top.score,
        verdict: top.verdict,
        ties: pool.filter((d) => d.score === top.score).map((d) => d.date),
      } : null,
      spread: Math.max(...scores) - Math.min(...scores),
      note: '候选日只在这几天里比：分数来自建除宜忌与冲煞，胜出只表示更合所问事项，不代表「好多少」。',
    };
  }

  return {
    system: 'zeri',
    meta: {
      task,
      mode: candidates ? 'candidates' : 'range',
      startDate,
      days: list.length,
      shengXiao,
      ...(candidates ? { candidates: candidates.map(ymd) } : {}),
      scope: shengXiao
        ? `宜忌按建除简表；已给当事人属相（${shengXiao}），凡当日冲该属相径直排除。评分仅用于排序引导。`
        : '宜忌按建除简表；未给当事人属相，未做冲属相排除。评分仅用于排序引导。',
    },
    best: ranked.filter((d) => d.verdict === '推荐' && !d.excluded).slice(0, 5).map((d) => d.date),
    usable: ranked.filter((d) => d.verdict === '可用' && !d.excluded).slice(0, 5).map((d) => d.date),
    avoid: list.filter((d) => d.verdict === '回避').map((d) => `${d.date}（${d.reasons.join('；') || '综合减分'}）`),
    days: list,
    ...(compare ? { compare } : {}),
    excludedCount: list.filter((d) => d.excluded).length,
    sources: ['宜忌：建除十二神通行简表', '建除适配与冲煞：传统通行口径', '排序：宜忌加减分 + 属相排除（确定性）'],
    disclaimer: '择日为传统黄历口径的本地计算，属民俗参考；评分只用于排序，不构成择日结论。',
  };
}
