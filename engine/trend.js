// 人生 K 线：把「大运 + 流年」的十神对日主的影响折算成逐年 0–100 分，
// 再画成开高低收的蜡烛形态与 ASCII 迷你图。
//
// 口径：这是一套**简化启发式**——十神计分表固定、正负号随日主旺衰方向翻转，
// 只用于看形态与相对起伏；分高不等于真实吉凶，旺衰落在换档边界时连排序都不给。
import { buildBazi, HIDDEN_STEMS, tenGod } from './bazi.js';
import { ganzhiName, sexagenaryIndex, STEMS, BRANCHES } from './calendar.js';

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

/** 把大运表补到覆盖 toAge（引擎默认只排 8 步 / 80 年）。 */
function extendDayun(list, direction, toAge) {
  const out = list.slice();
  const step = direction === '逆行' ? -1 : 1;
  let guard = 0;
  while (out.length && out[out.length - 1].startAge <= toAge && guard < 24) {
    const last = out[out.length - 1];
    // last.ganzhi 是「甲辰」这样的名字，不是六十甲子序号：先换回序号再顺/逆推一步
    const lastIdx = sexagenaryIndex(STEMS.indexOf(last.ganzhi[0]), BRANCHES.indexOf(last.ganzhi[1]));
    const nextIdx = (lastIdx + step + 60) % 60;
    const g = ganzhiName(nextIdx);
    out.push({ step: last.step + 1, startAge: last.startAge + 10, ganzhi: g.name, stem: g.stem, branch: g.branch, stemTenGod: last.stemTenGod });
    guard++;
  }
  return out;
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
    throw new Error('人生 K 线需要性别：大运顺逆由性别决定，不可缺省');
  }
  const toAge = clamp(Number.isInteger(input.toAge) ? input.toAge : 100, 10, 100);
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

  const dayun = extendDayun(r.dayun.list, r.dayun.direction, toAge);
  const segments = dayun
    .map((d, i) => ({
      ganZhi: d.ganzhi,
      startAge: d.startAge,
      endAge: (dayun[i + 1] ? dayun[i + 1].startAge : d.startAge + 10) - 1,
    }))
    .filter((s) => s.startAge <= toAge);

  const birthYear = Number(String(r.solarTime.civilText).slice(0, 4));
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
