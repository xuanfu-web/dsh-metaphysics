// 合盘（合婚）：日主关系 + 夫妻宫关系 + 五行互补。
// 口径：日主取五行生克（双向平均），夫妻宫取日支的六合/三合/冲/害/刑/破，
// 五行互补看「一方喜用是否正是另一方所旺」。各派取法不同，这里只给通用版结论。
import { buildBazi, tenGod } from './bazi.js';
import { STEMS, BRANCHES } from './calendar.js';
import { assertCivil } from './validate.js';
import { SANHE_GROUPS } from './sanhe.js';

const WX_GAN = { 甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土', 己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水' };
const WX_ZHI = { 子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火', 午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水' };
const SHENG = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const KE = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };

// 地支两两关系（只取合、冲、害、刑、破；三合按半合算）
const LIU_HE = [['子', '丑'], ['寅', '亥'], ['卯', '戌'], ['辰', '酉'], ['巳', '申'], ['午', '未']];
const CHONG = [['子', '午'], ['丑', '未'], ['寅', '申'], ['卯', '酉'], ['辰', '戌'], ['巳', '亥']];
const HAI = [['子', '未'], ['丑', '午'], ['寅', '巳'], ['卯', '辰'], ['申', '亥'], ['酉', '戌']];
const PO = [['子', '酉'], ['卯', '午'], ['辰', '丑'], ['未', '戌'], ['寅', '亥'], ['巳', '申']];
const XING = [['寅', '巳', '申'], ['丑', '戌', '未'], ['子', '卯']];

const pairIn = (list, a, b) => list.some((g) => g.includes(a) && g.includes(b) && a !== b);

function zhiRelation(a, b) {
  if (a === b) return { name: '同支', score: 0, text: '日支相同，性情相近，容易互相理解，也容易同时卡在同一处' };
  if (pairIn(LIU_HE, a, b)) return { name: '六合', score: 20, text: '日支六合，相处自然、彼此补位' };
  if (SANHE_GROUPS.some((g) => g.branches.includes(a) && g.branches.includes(b))) {
    return { name: '半合', score: 14, text: '日支同属三合局，易有共同语言' };
  }
  if (pairIn(CHONG, a, b)) return { name: '相冲', score: -15, text: '日支相冲，节奏与需求容易错位，需要刻意协调' };
  if (pairIn(XING, a, b)) {
    for (const g of XING) {
      if (g.includes(a) && g.includes(b)) return { name: '相刑', score: -10, text: '日支相刑，摩擦多起于细节，宜少用指责' };
    }
  }
  if (pairIn(HAI, a, b)) return { name: '相害', score: -9, text: '日支相害，容易因第三方或误解生嫌隙' };
  if (pairIn(PO, a, b)) return { name: '相破', score: -5, text: '日支相破，小事易起波澜' };
  return { name: '无直接关系', score: 4, text: '日支之间没有直接刑冲合害，关系好坏主要看经营' };
}

/** 两个五行之间：对方对我 */
function wxToMe(other, me) {
  if (other === me) return { name: '比和', score: 13, text: '两人日主同五行，气味相投，也容易一起犯同样的毛病' };
  if (SHENG[other] === me) return { name: '生我', score: 20, text: '对方五行生我，容易得到照顾与助力' };
  if (SHENG[me] === other) return { name: '我生', score: 10, text: '我生对方，多为付出的一方，久了要留意消耗' };
  if (KE[me] === other) return { name: '我克', score: 5, text: '我克对方，主导感较强，需留意对方的空间' };
  return { name: '克我', score: -12, text: '对方克我，压力感偏重，宜把话说开' };
}

/** 年支（属相）关系：六合、三合、六冲、六害、相刑、自刑，其余为无直接关系。 */
function yearBranchRelation(a, b) {
  if (a === b) return { name: '同属相（自刑之一）', score: -3, text: '属相相同，传统称「自刑」，容易互相较劲、谁也不让谁' };
  if (pairIn(LIU_HE, a, b)) return { name: '六合', score: 3, text: '属相六合，初印象与长辈缘通常不错' };
  if (SANHE_GROUPS.some((g) => g.branches.includes(a) && g.branches.includes(b))) {
    return { name: '三合', score: 3, text: '属相三合，容易有共同话题与共同朋友' };
  }
  if (pairIn(CHONG, a, b)) return { name: '六冲', score: -3, text: '属相六冲，节奏与立场容易相反，重大决定前宜多对一遍' };
  if (pairIn(HAI, a, b)) return { name: '相害', score: -2, text: '属相相害，容易因第三方或误会生嫌隙' };
  for (const g of XING) {
    if (g.includes(a) && g.includes(b)) return { name: '相刑', score: -2, text: '属相相刑，摩擦多起于相处细节' };
  }
  return { name: '无直接关系', score: 0, text: '属相之间没有合冲刑害，表层影响小，以日柱为主' };
}

/** 合盘主函数 */
export function buildHepan(input) {
  assertCivil(input && input.a, 'a');
  assertCivil(input && input.b, 'b');
  const A = buildBazi({ ...input.a, gender: input.a.gender });
  const B = buildBazi({ ...input.b, gender: input.b.gender });

  const aStem = A.pillars.day.stem;
  const bStem = B.pillars.day.stem;
  const aWx = WX_GAN[aStem];
  const bWx = WX_GAN[bStem];
  const aZhi = A.pillars.day.branch;
  const bZhi = B.pillars.day.branch;

  // ① 日主
  const aToB = wxToMe(bWx, aWx); // 以 A 为主体看 B
  const bToA = wxToMe(aWx, bWx);
  const stemScore = (aToB.score + bToA.score) / 2;

  // ② 夫妻宫（日支）
  const gong = zhiRelation(aZhi, bZhi);

  // ③ 五行互补：一方喜用是否正是另一方所旺
  const favorA = (A.frame && A.frame.yongshen ? A.frame.yongshen.favor : []).slice();
  const favorB = (B.frame && B.frame.yongshen ? B.frame.yongshen.favor : []).slice();
  const wxCount = (r) => {
    const m = {};
    for (const k of ['year', 'month', 'day', 'hour']) {
      m[WX_GAN[r.pillars[k].stem]] = (m[WX_GAN[r.pillars[k].stem]] || 0) + 1;
      m[WX_ZHI[r.pillars[k].branch]] = (m[WX_ZHI[r.pillars[k].branch]] || 0) + 1;
    }
    return m;
  };
  const wxA = wxCount(A);
  const wxB = wxCount(B);
  const strongOf = (m) => Object.entries(m).sort((x, y) => y[1] - x[1])[0] || ['', 0];
  const [strongA] = strongOf(wxA);
  const [strongB] = strongOf(wxB);
  const bFeedsA = favorA.includes(strongB);
  const aFeedsB = favorB.includes(strongA);
  let compScore = 0;
  const compNotes = [];
  if (bFeedsA) { compScore += 12; compNotes.push(`对方的旺行 ${strongB} 正是你的喜用`); }
  if (aFeedsB) { compScore += 12; compNotes.push(`你的旺行 ${strongA} 正是对方的喜用`); }
  if (!bFeedsA && !aFeedsB) { compScore += 3; compNotes.push('双方的旺行都不是对方的喜用，互补性一般，靠沟通补'); }
  // 一方缺的五行正好是对方所旺，也算补
  const missingA = ['木', '火', '土', '金', '水'].filter((w) => !wxA[w]);
  const missingB = ['木', '火', '土', '金', '水'].filter((w) => !wxB[w]);
  if (missingA.includes(strongB)) { compScore += 4; compNotes.push(`你命局缺 ${strongB}，对方正好偏旺`); }
  if (missingB.includes(strongA)) { compScore += 4; compNotes.push(`对方命局缺 ${strongA}，你正好偏旺`); }

  // ④ 综合
  const raw = stemScore + gong.score + compScore; // 理论区间约 -27 ~ 56
  const pct = Math.max(0, Math.min(100, Math.round(((raw + 27) / 83) * 100)));
  const level = pct >= 75 ? '契合度较高' : pct >= 55 ? '中等偏顺' : pct >= 40 ? '需要磨合' : '差异较大';

  // ⑤ 细化层（对齐传统合婚口径）：属相（年支）关系、天干五合、双向十神、
  //    跨盘地支关系、年命纳音生克、吉凶象计数。只增加明细，不改动上面的总分与三维度。
  const aYear = A.pillars.year;
  const bYear = B.pillars.year;
  const yearRel = yearBranchRelation(aYear.branch, bYear.branch);
  const HE5 = [['甲', '己'], ['乙', '庚'], ['丙', '辛'], ['丁', '壬'], ['戊', '癸']];
  const he5 = HE5.some((p) => p.includes(aStem) && p.includes(bStem) && aStem !== bStem);
  const godA = tenGod(aStem, bStem); // 对方日干在我盘中为
  const godB = tenGod(bStem, aStem);
  const A_BR = ['year', 'month', 'day', 'hour'].map((k) => A.pillars[k].branch);
  const B_BR = ['year', 'month', 'day', 'hour'].map((k) => B.pillars[k].branch);
  const cross = [];
  for (const x of A_BR) {
    for (const y of B_BR) {
      if (pairIn(LIU_HE, x, y)) cross.push({ a: x, b: y, name: '六合', score: 1, text: '跨盘六合，易有自然的亲近与默契' });
      else if (SANHE_GROUPS.some((g) => g.branches.includes(x) && g.branches.includes(y))) {
        cross.push({ a: x, b: y, name: '半合', score: 1, text: '跨盘半合，某些事上容易一拍即合' });
      } else if (pairIn(CHONG, x, y)) cross.push({ a: x, b: y, name: '相冲', score: -1, text: '跨盘相冲，某些领域节奏相反，需要分工' });
      else if (pairIn(HAI, x, y)) cross.push({ a: x, b: y, name: '相害', score: -1, text: '跨盘相害，容易在第三方或琐事上起误会' });
    }
  }
  const uniqCross = [];
  const seen = new Set();
  for (const c of cross) {
    const k = `${c.name}${[c.a, c.b].sort().join('')}`;
    if (seen.has(k)) continue;
    seen.add(k);
    uniqCross.push(c);
  }
  // 年命纳音：纳音名末字即五行（如「大林木」→ 木）
  const nyA = aYear.nayin;
  const nyB = bYear.nayin;
  const naEl = nyA[nyA.length - 1];
  const nbEl = nyB[nyB.length - 1];
  const nayinRel = naEl === nbEl
    ? { name: '纳音比和', score: 0, text: '两人年命纳音同五行，底色相近' }
    : SHENG[naEl] === nbEl
      ? { name: '纳音相生', score: 1, text: `你的年命纳音属${naEl}生对方${nbEl}，你多是先付出的一方` }
      : SHENG[nbEl] === naEl
        ? { name: '纳音相生', score: 1, text: `对方年命纳音属${nbEl}生你${naEl}，你容易得到照应` }
        : KE[naEl] === nbEl
          ? { name: '纳音相克', score: -1, text: `你的年命纳音属${naEl}克对方${nbEl}，主导感偏强` }
          : { name: '纳音相克', score: -1, text: `对方年命纳音属${nbEl}克你${naEl}，压力感偏重` };
  const good = (yearRel.score > 0 ? 1 : 0) + (he5 ? 1 : 0) + (gong.score > 5 ? 1 : 0)
    + uniqCross.filter((c) => c.score > 0).length + (nayinRel.score > 0 ? 1 : 0);
  const bad = (yearRel.score < 0 ? 1 : 0) + (gong.score < 0 ? 1 : 0)
    + uniqCross.filter((c) => c.score < 0).length + (nayinRel.score < 0 ? 1 : 0);
  const lean = good - bad >= 3 ? '吉象偏多' : good - bad >= 1 ? '吉略多于凶' : good - bad === 0 ? '吉凶相当' : '凶象偏多';

  const detail = {
    yearRelation: { label: yearRel.name, text: `属相：你${aYear.branch}（${aYear.ganzhi}），对方${bYear.branch}（${bYear.ganzhi}）。${yearRel.text}。` },
    stems: {
      he5,
      tenGodToB: godA,
      tenGodToA: godB,
      text: he5
        ? `日干五合（${aStem}${bStem}），传统称「天干五合」，主彼此吸引强，也容易黏在一起分不开。`
        : `日干无五合：你在对方盘里是「${godA}」，对方在你盘里是「${godB}」。`,
    },
    crossBranches: uniqCross.slice(0, 8),
    nayin: { a: nyA, b: nyB, label: nayinRel.name, text: nayinRel.text },
    tally: { good, bad, lean },
    framing: '属相（年支）只影响表层印象，传统合婚以日柱为主；分档只说明吉凶象多少，不作「必配/必离」断言。',
  };

  const dim = (key, label, score, text, extra) => ({ key, label, score: Math.round(score), text, ...(extra || {}) });

  return {
    system: 'hepan',
    a: {
      gender: A.input.gender,
      pillars: ['year', 'month', 'day', 'hour'].map((k) => A.pillars[k].ganzhi),
      dayMaster: `${aStem}${aWx}`,
      dayBranch: aZhi,
      strength: A.strength ? A.strength.level : null,
      favor: favorA.join(''),
      wuxing: wxA,
      // 真太阳时口径要能被看到：合盘与单盘用同一套修正，否则同一个人会出现两套四柱
      longitude: A.input.longitude ?? null,
      trueSolar: A.input.trueSolar !== false,
      solarNote: A.solarTime ? A.solarTime.note : '',
      summary: A.summary,
    },
    b: {
      gender: B.input.gender,
      pillars: ['year', 'month', 'day', 'hour'].map((k) => B.pillars[k].ganzhi),
      dayMaster: `${bStem}${bWx}`,
      dayBranch: bZhi,
      strength: B.strength ? B.strength.level : null,
      favor: favorB.join(''),
      wuxing: wxB,
      longitude: B.input.longitude ?? null,
      trueSolar: B.input.trueSolar !== false,
      solarNote: B.solarTime ? B.solarTime.note : '',
      summary: B.summary,
    },
    score: { total: pct, level },
    detail,
    dimensions: [
      dim('stem', '日主关系', stemScore, `你的日主 ${aStem}${aWx}，对方 ${bStem}${bWx}。${aToB.text}；${bToA.text}。`),
      dim('gong', '夫妻宫（日支）', gong.score, `${gong.name}：${gong.text}。你日支 ${aZhi}，对方日支 ${bZhi}。`),
      dim('wuxing', '五行互补', compScore, compNotes.join('；') + '。'),
    ],
    notes: [
      '合盘看的是相处方式与互补点，不决定关系成败；现实里的沟通与选择分量更重。',
      `口径：日主取五行生克双向平均，夫妻宫取日支关系，五行互补看「一方喜用是否为另一方所旺」。`,
    ],
  };
}
