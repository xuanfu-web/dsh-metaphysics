// 合盘（合婚）：日主关系 + 夫妻宫关系 + 五行互补。
// 口径：日主取五行生克（双向平均），夫妻宫取日支的六合/三合/冲/害/刑/破，
// 五行互补看「一方喜用是否正是另一方所旺」。各派取法不同，这里只给通用版结论。
import { buildBazi } from './bazi.js';
import { STEMS, BRANCHES } from './calendar.js';

const WX_GAN = { 甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土', 己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水' };
const WX_ZHI = { 子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火', 午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水' };
const SHENG = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const KE = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };

// 地支两两关系（只取合、冲、害、刑、破；三合按半合算）
const LIU_HE = [['子', '丑'], ['寅', '亥'], ['卯', '戌'], ['辰', '酉'], ['巳', '申'], ['午', '未']];
const CHONG = [['子', '午'], ['丑', '未'], ['寅', '申'], ['卯', '酉'], ['辰', '戌'], ['巳', '亥']];
const HAI = [['子', '未'], ['丑', '午'], ['寅', '巳'], ['卯', '辰'], ['申', '亥'], ['酉', '戌']];
const PO = [['子', '酉'], ['卯', '午'], ['辰', '丑'], ['未', '戌'], ['寅', '亥'], ['巳', '申']];
const SAN_HE = [['申', '子', '辰'], ['寅', '午', '戌'], ['巳', '酉', '丑'], ['亥', '卯', '未']];
const XING = [['寅', '巳', '申'], ['丑', '戌', '未'], ['子', '卯']];

const pairIn = (list, a, b) => list.some((g) => g.includes(a) && g.includes(b) && a !== b);

function zhiRelation(a, b) {
  if (a === b) return { name: '同支', score: 0, text: '日支相同，性情相近，容易互相理解，也容易同时卡在同一处' };
  if (pairIn(LIU_HE, a, b)) return { name: '六合', score: 20, text: '日支六合，相处自然、彼此补位' };
  for (const g of SAN_HE) {
    if (g.includes(a) && g.includes(b)) return { name: '半合', score: 14, text: '日支同属三合局，易有共同语言' };
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

/** 合盘主函数 */
export function buildHepan(input) {
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
      summary: B.summary,
    },
    score: { total: pct, level },
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
