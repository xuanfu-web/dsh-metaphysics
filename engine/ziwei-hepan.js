// 紫微合盘：两盘并排 + 互落宫 + 四化引动。
// 口径：把一方的「命宫 / 夫妻宫」地支落到对方盘的宫位上，判断影响落在对方哪一领域；
// 再把一方生年四化所化的星，找它在对方盘的位置，判断「你的某种特质会引动对方哪一宫」。
// 这是并排对照的读法，不涉及两盘叠加安星（那是另一派做法，本文不采用）。
import { buildZiwei } from './ziwei.js';

const NAMES = ['命宫', '兄弟', '夫妻', '子女', '财帛', '疾厄', '迁移', '交友', '官禄', '田宅', '福德', '父母'];
const MUT_MEAN = {
  禄: '会把资源、机会与松弛感带过去',
  权: '会不自觉地主导或施压',
  科: '带来的更多是名声、体面与理性',
  忌: '会勾起压力点与执念',
};
const MUT_SCORE = { 禄: 10, 权: 5, 科: 8, 忌: -10 };
// 落在对方这些宫位时影响最直接
const STRONG_LANDS = ['命宫', '夫妻', '福德', '财帛', '官禄'];

const palaceByBranch = (chart, branch) => (chart.palaces || []).find((p) => p.branch === branch) || null;
const mainStars = (p) => (p && p.stars ? p.stars.filter((s) => s.type === 'main' || s.type === '吉星' || s.type === '煞星').map((s) => s.name) : []);

/** 一方的某宫（按地支）在对方盘中落到哪个宫位 */
function landOn(host, branch) {
  const p = palaceByBranch(host, branch);
  return p ? { palace: p.palace, branch: p.branch, stars: mainStars(p) } : null;
}

export function buildZiweiHepan(input) {
  const A = buildZiwei({ ...input.a });
  const B = buildZiwei({ ...input.b });

  // ① 互落宫：命宫、夫妻宫各落到对方哪一宫
  const soulToB = landOn(B, A.soul.branch);
  const soulToA = landOn(A, B.soul.branch);
  const spouseBranchA = (A.palaces.find((p) => p.palace === '夫妻') || {}).branch;
  const spouseBranchB = (B.palaces.find((p) => p.palace === '夫妻') || {}).branch;
  const spouseAtoB = spouseBranchA ? landOn(B, spouseBranchA) : null;
  const spouseBtoA = spouseBranchB ? landOn(A, spouseBranchB) : null;

  // ② 四化引动：A 生年四化的星，在 B 盘哪一宫
  const hits = [];
  const collect = (from, to, who, targetWho) => {
    for (const p of from.palaces || []) {
      for (const s of p.stars || []) {
        if (!s.mutagen) continue;
        const target = (to.palaces || []).find((q) => (q.stars || []).some((x) => x.name === s.name));
        const land = target ? target.palace : null;
        hits.push({
          who,
          star: s.name,
          mutagen: s.mutagen,
          ownPalace: p.palace,
          landingPalace: land,
          strong: land ? STRONG_LANDS.includes(land) : false,
          text: `${who}的${s.name}化${s.mutagen}（在本命${p.palace}）落在${targetWho}的${land || '盘外'}——${who}${MUT_MEAN[s.mutagen]}`,
        });
      }
    }
  };
  collect(A, B, '你', '对方');
  collect(B, A, '对方', '你');

  // ③ 评分：互落宫 + 四化
  let score = 40;
  const dims = [];
  if (soulToB) {
    const strong = STRONG_LANDS.includes(soulToB.palace);
    const s = strong ? 12 : 5;
    score += s;
    dims.push({ key: 'soul', label: '命宫互落', score: s, text: `你的命宫在${A.soul.branch}，落到对方盘的「${soulToB.palace}」${soulToB.stars.length ? `（同宫见 ${soulToB.stars.join('、')}）` : ''}——${strong ? '影响直接，脾气与做派会明显落在对方这一块' : '影响偏间接，主要体现在日常协作上'}。` });
  }
  if (soulToA) {
    dims.push({ key: 'soulBack', label: '对方命宫落你盘', score: 0, text: `对方的命宫在${B.soul.branch}，落到你盘的「${soulToA.palace}」${soulToA.stars.length ? `（同宫见 ${soulToA.stars.join('、')}）` : ''}。` });
  }
  if (spouseAtoB && spouseBtoA) {
    const good = ['命宫', '夫妻', '福德'].includes(spouseAtoB.palace) || ['命宫', '夫妻', '福德'].includes(spouseBtoA.palace);
    const s = good ? 8 : 2;
    score += s;
    dims.push({ key: 'spouse', label: '夫妻宫互落', score: s, text: `你的夫妻宫在${spouseBranchA}，落在对方「${spouseAtoB.palace}」；对方的夫妻宫在${spouseBranchB}，落在你「${spouseBtoA.palace}」。${good ? '双方的感情定位能对上彼此在意的事' : '彼此的期待更容易落在不同领域，需要说清楚'}` });
  }
  // 四化净分：禄科为正、忌为负；落在强宫加倍
  let mutScore = 0;
  for (const h of hits) {
    const base = MUT_SCORE[h.mutagen] || 0;
    mutScore += h.strong ? Math.round(base * 1.5) : base;
  }
  mutScore = Math.max(-25, Math.min(25, mutScore));
  score += mutScore;
  dims.push({ key: 'mutagen', label: '四化引动', score: mutScore, text: hits.filter((h) => h.who === '你').map((h) => h.text).join('；') || '你这边没有生年四化引动对方的宫位。' });

  const total = Math.max(0, Math.min(100, Math.round(score)));
  const level = total >= 75 ? '契合度较高' : total >= 55 ? '中等偏顺' : total >= 40 ? '需要磨合' : '差异较大';

  const side = (z, who) => ({
    who,
    soul: { branch: z.soul.branch, palace: z.soul.palace },
    body: { branch: z.body.branch, lands: z.body.lands },
    bureau: z.bureau.name,
    ziwei: z.ziwei,
    tianfu: z.tianfu,
    soulStars: mainStars(z.palaces.find((p) => p.palace === '命宫') || {}),
    spouseStars: mainStars(z.palaces.find((p) => p.palace === '夫妻') || {}),
    natalSihua: (z.palaces || []).flatMap((p) => (p.stars || []).filter((s) => s.mutagen).map((s) => `${s.name}化${s.mutagen}(${p.palace})`)),
    summary: z.summary,
  });

  return {
    system: 'hepan',
    chart: 'ziwei',
    a: side(A, '你'),
    b: side(B, '对方'),
    score: { total, level },
    dimensions: dims,
    interactions: hits,
    notes: [
      '紫微合盘看的是「彼此会在对方生活里的哪一块起作用」，不是关系成败的判决。',
      '口径：命宫与夫妻宫按地支落到对方盘的宫位；四化按「一方的生年四化星在对方盘的落宫」读，落在命宫/夫妻/福德/财帛/官禄加倍计分。',
    ],
  };
}

