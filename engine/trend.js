// 人生 K 线：把「大运 + 流年」的十神对日主的影响折算成逐年 0–100 分，
// 再画成开高低收的蜡烛形态与 ASCII 迷你图。
//
// 口径：这是一套**简化启发式**——十神计分表固定、正负号随日主旺衰方向翻转，
// 只用于看形态与相对起伏；分高不等于真实吉凶，旺衰落在换档边界时连排序都不给。
import { buildBazi, HIDDEN_STEMS, tenGod } from './bazi.js';
import { ganzhiName, sexagenaryIndex, STEMS, BRANCHES } from './calendar.js';
import { fail } from './fail.js';

// ── 十神计分表 ────────────────────────────────────────────────
// 三张表各自求和接近 0，保证分数有正负双向起伏；符号随日主旺衰方向翻转：
//   偏弱 → 喜生扶（印 / 比劫）为正，忌克泄耗（官杀 / 食伤 / 财）为负；
//   偏强 → 喜克泄耗为正，忌生扶为负；
//   中和 → 财官印温和加分，杀伤伤官小扣。
const SHISHEN_WEAK = {
  正印: 2, 偏印: 2, 比肩: 2, 劫财: 1,
  食神: -1, 伤官: -2, 偏财: -2, 正财: -2,
  正官: -1, 七杀: -3,
};
const SHISHEN_STRONG = {
  正印: -2, 偏印: -2, 比肩: -2, 劫财: -1,
  食神: 1, 伤官: 1, 偏财: 2, 正财: 2,
  正官: 2, 七杀: 1,
};
const SHISHEN_NEUTRAL = {
  正印: 1, 偏印: 0, 比肩: 0, 劫财: -1,
  食神: 1, 伤官: -2, 偏财: 1, 正财: 2,
  正官: 2, 七杀: -2,
};

const FAVOR = { 身强: 'strong', 偏强: 'strong', 中和: 'neutral', 偏弱: 'weak', 身弱: 'weak' };
const TABLE_OF = { strong: SHISHEN_STRONG, neutral: SHISHEN_NEUTRAL, weak: SHISHEN_WEAK };

/** 旺衰分档的换档阈值：分数贴着阈值时，多一个干支就换表，整套符号翻转。 */
const LEVEL_CUTS = [0.5, 1.5, 2.5, 4];
const BOUNDARY_EPS = 0.3;

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

/** 干支（天干 + 地支本气）对日主的十神；地支取本气藏干，与四柱十神口径一致。 */
function tenGodOfZhi(dayStem, branch) {
  const main = HIDDEN_STEMS[branch] && HIDDEN_STEMS[branch][0];
  return main ? tenGod(dayStem, main) : null;
}

const yearGanzhi = (year) => ganzhiName(((year - 4) % 60 + 60) % 60);

/**
 * 大运分段，按「交运那一年」切，年龄落在与 points[].age 同一条虚岁轴上。
 *
 * 不能直接用 dayun.startAge：那是周岁（三日用折一年从出生日算起），
 * 而 K 线一年一格、`age` 就是虚岁（= 年份 − 出生年 + 1，与八字流年表同一口径）。
 * 两套轴混在一起会让整条线提前一年：1990-05-12 男命 1998-08 交壬午，
 * 旧写法把 1997（还没起运）划进壬午，2007（仍在壬午）却标成癸未。
 * 交运日期本来就是同一份数据的精确表达，所以按它的年份起算；
 * 引擎只排八步，八步之外按十年一格推年份，干支仍按六十甲子顺/逆推。
 */
function buildSegments(list, direction, birthYear, toAge) {
  const toYear = birthYear + toAge - 1;
  const step = direction === '逆行' ? -1 : 1;
  const years = [];
  for (const d of list) years.push({ ganZhi: d.ganzhi, startYear: Number(String(d.fromDate).slice(0, 4)) });
  let guard = 0;
  while (years.length && years[years.length - 1].startYear <= toYear && guard < 24) {
    const last = years[years.length - 1];
    // ganZhi 是「甲辰」这样的名字，不是六十甲子序号：先换回序号再顺/逆推一步
    const lastIdx = sexagenaryIndex(STEMS.indexOf(last.ganZhi[0]), BRANCHES.indexOf(last.ganZhi[1]));
    const g = ganzhiName((lastIdx + step + 60) % 60);
    years.push({ ganZhi: g.name, startYear: last.startYear + 10 });
    guard++;
  }
  return years
    .map((s, i) => ({
      ganZhi: s.ganZhi,
      startAge: s.startYear - birthYear + 1,
      endAge: (years[i + 1] ? years[i + 1].startYear : s.startYear + 10) - birthYear,
    }))
    .filter((s) => s.startAge <= toAge);
}

/**
 * 人生 K 线主函数。
 * @param {{year:number,month:number,day:number,hour?:number,minute?:number,gender:'male'|'female',
 *          toAge?:number,lateZi?:boolean,trueSolar?:boolean,dst?:boolean,
 *          address?:string,longitude?:number,geo?:object}} input
 */
export function buildTrend(input) {
  const gender = input.gender;
  if (gender !== 'male' && gender !== 'female') {
    throw fail('E_INPUT', '人生 K 线需要性别：大运顺逆由性别决定，不可缺省');
  }
  // 以前 toAge 只认整数：50.5 会被静默换成默认 100 岁，点数翻倍还看不出来
  let toAge = 100;
  if (input.toAge !== undefined && input.toAge !== null && input.toAge !== '') {
    const n = Number(input.toAge);
    if (!Number.isInteger(n) || n < 10 || n > 100) {
      throw fail('E_INPUT', `toAge 要是 10–100 的整数（岁），收到「${input.toAge}」`);
    }
    toAge = n;
  }
  const r = buildBazi({
    year: input.year,
    month: input.month,
    day: input.day,
    hour: Number.isInteger(input.hour) ? input.hour : 12,
    minute: Number.isInteger(input.minute) ? input.minute : 0,
    gender,
    lateZi: input.lateZi !== false,
    trueSolar: input.trueSolar !== false,
    dst: input.dst !== false,
    address: typeof input.address === 'string' ? input.address : undefined,
    longitude: typeof input.longitude === 'number' ? input.longitude : undefined,
    geo: input.geo && typeof input.geo === 'object' ? input.geo : undefined,
  });

  const dayStem = r.pillars.day.stem;
  const table = TABLE_OF[FAVOR[r.strength.level] || 'neutral'];
  const rawBound = 5 * Math.max(...Object.values(table).map(Math.abs));
  const scoreOf = (god) => table[god] ?? 0;
  const boundary = LEVEL_CUTS.some((c) => Math.abs(r.strength.score - c) <= BOUNDARY_EPS);

  const birthYear = Number(String(r.solarTime.civilText).slice(0, 4));
  const segments = buildSegments(r.dayun.list, r.dayun.direction, birthYear, toAge);

  const points = [];
  let prev = 50;
  for (let age = 1; age <= toAge; age++) {
    const year = birthYear + age - 1;
    const gz = yearGanzhi(year);
    const seg = segments.find((s) => age >= s.startAge && age <= s.endAge) || null;
    const godGan = tenGod(dayStem, gz.stem);
    const godZhi = tenGodOfZhi(dayStem, gz.branch);
    const dyGodGan = seg ? tenGod(dayStem, seg.ganZhi[0]) : null;
    const dyGodZhi = seg ? tenGodOfZhi(dayStem, seg.ganZhi[1]) : null;

    const raw = scoreOf(godGan) + scoreOf(godZhi)
      + (seg ? (scoreOf(dyGodGan) + scoreOf(dyGodZhi)) * 1.5 : 0);
    const score = clamp(Math.round(((raw + rawBound) / (rawBound * 2)) * 100), 2, 99);
    points.push({
      age,
      year,
      ganZhi: gz.name,
      dayunGanZhi: seg ? seg.ganZhi : null,
      shiShenGan: godGan,
      shiShenZhi: godZhi,
      score,
      kline: {
        open: prev,
        close: score,
        high: clamp(score + 4, 0, 100),
        low: clamp(score - 4, 0, 100),
      },
    });
    prev = score;
  }

  const sorted = points.slice().sort((a, b) => b.score - a.score);
  return {
    system: 'trend',
    meta: {
      birth: String(r.solarTime.civilText).slice(0, 10),
      gender,
      dayMaster: `${dayStem}（${r.dayMaster.yinYang}${r.dayMaster.element}）`,
      strength: { level: r.strength.level, score: r.strength.score, boundary },
      toAge,
      // 当前年份由调用方给（asOf）：引擎不读挂钟，同一条线在任意时刻复算都一致。
      // 没给就不写这个键，summary 那边据此省掉「你现在在第几步」。
      ...(Number.isInteger(input.nowYear) ? { nowYear: input.nowYear } : {}),
      ...(boundary
        ? {
          boundaryNote:
            `旺衰分 ${r.strength.score} 正落在换档阈值附近（阈值 ${LEVEL_CUTS.join(' / ')}，容差 ${BOUNDARY_EPS}）：`
            + '多一个同类干支或少一个就会换计分表，整套正负号随之翻转——因此这里不出「最好 / 最差年份」的排序结论。',
        }
        : {}),
    },
    segments,
    points,
    highlights: boundary
      ? { suppressed: '旺衰落在换档边界，年份排序不可靠，不给顺位 / 谨慎年份', best: [], worst: [] }
      : {
        best: sorted.slice(0, 3).map((p) => `${p.age}岁（${p.year}，${p.ganZhi}，${p.score}分）`),
        worst: sorted.slice(-3).reverse().map((p) => `${p.age}岁（${p.year}，${p.ganZhi}，${p.score}分）`),
      },
    sparkline: asciiSparkline(points),
    sources: [
      '运势分：流年 / 大运干支十神对日主的简化启发式计分（旺衰方向决定正负号）',
      'K 线形态：收盘 = 当年分，开盘 = 上年分，高低各 ±4（确定性生成）',
    ],
    disclaimer: boundary
      ? '人生 K 线为简化启发式的可视化；本盘旺衰判定处于换档边界，趋势与年份排序均不可靠，仅供展示，不构成任何现实决策依据。'
      : '人生 K 线为简化启发式的可视化，趋势形态仅供娱乐参考，不构成任何现实决策依据；十年大运内每年分值不等于真实吉凶。',
  };
}

/** ASCII 迷你 K 线：每年一个方块（▁▂▃▄▅▆▇█），按大运分段成行。 */
function asciiSparkline(points) {
  const BLOCKS = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
  const lines = [];
  const groups = [];
  for (const p of points) {
    const key = p.dayunGanZhi || '起运前';
    const last = groups[groups.length - 1];
    if (!last || last.key !== key) groups.push({ key, points: [] });
    groups[groups.length - 1].points.push(p);
  }
  for (const g of groups) {
    const bars = g.points
      .map((p) => BLOCKS[clamp(Math.floor((p.score / 100) * BLOCKS.length), 0, BLOCKS.length - 1)])
      .join('');
    lines.push(`${g.key}（${g.points[0].age}–${g.points[g.points.length - 1].age}岁）：${bars}`);
  }
  return lines;
}
