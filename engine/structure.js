// 八大地支结构（炳祥课堂口径）
//
// 定位：只做「静态结构 + 宫位权重」的只读标注，不改旺衰、不改喜忌。
// 课堂口径来源：炳祥八字课程笔记（内部资料，不随包发布）；
// 这里把「四个地支落在身强阵营还是身弱阵营」按年支定 A 档（年支那一档记 A，另一档记 B），
// 于是八种排布可以写成 AAAA / ABBB / AAAB / AABA / ABAA / AABB / ABAB / ABBA，
// 再从「异类那一支的宫位权重」读出静态从格概率：
//   年支独异 11 分 → 80% 从；时支独异 16 分 → 50-60% 从；
//   日支独异 27 分 → 20% 从；月支独异 36 分 → 99% 不从。
//
// 注意：这是**静态**概率。三合、三会、六合把某一支「合走」之后，阵营可能整体改写，
// 那时要以合化后的阵营重新排结构；课堂原话也是「静态条件之外，生克合化的演化会更多」。

const STEM_ELEMENT = {
  甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土',
  己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水',
};
const GENERATES = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };

/** 干支宫位权重：天干合计 10、地支合计 90（日干为参照点，计 0） */
export const PILLAR_WEIGHT = {
  stem: { year: 2, month: 5, day: 0, hour: 3 },
  branch: { year: 11, month: 36, day: 27, hour: 16 },
};

/** 藏干固定百分比（课堂口径，同一支内合计 100） */
export const HIDDEN_PCT = {
  子: { 癸: 100 },
  丑: { 己: 20, 辛: 40, 癸: 40 },
  寅: { 甲: 65, 丙: 30, 戊: 5 },
  卯: { 乙: 100 },
  辰: { 戊: 45, 乙: 30, 癸: 25 },
  巳: { 丙: 65, 戊: 20, 庚: 15 },
  午: { 丁: 90, 己: 10 },
  未: { 己: 55, 丁: 40, 乙: 5 },
  申: { 庚: 65, 壬: 30, 戊: 5 },
  酉: { 辛: 100 },
  戌: { 戊: 55, 辛: 25, 丁: 20 },
  亥: { 壬: 70, 甲: 30 },
};

// 得地 / 半得地 / 不得地。数值只作标签与说明，不参与旺衰打分。
// 半得地一律不计入身强阵营（课堂：土日主见辰「不能当得地看」；戌对火日主须午戌合/寅午戌才得地）。
const SUPPORT = {
  木: { 得地: '亥子寅卯', 半: { 辰: 0.5, 未: 0.2 } },
  火: { 得地: '寅卯巳午未', 半: { 戌: 0 } },
  土: { 得地: '巳午未戌', 半: { 寅: 0.2, 辰: 0.5 } },
  金: { 得地: '丑酉申戌辰', 半: { 未: 0.1, 巳: 0.1 } },
  水: { 得地: '申亥子丑', 半: { 辰: 0.5 } },
};

const PILLARS = ['year', 'month', 'day', 'hour'];
const LABEL = { year: '年', month: '月', day: '日', hour: '时' };

/** 静态从格概率（%）。null 表示课堂只说「有可能」，未给数字。 */
const CONG_PROB = {
  AAAA: { prob: 99, range: '≈99%', word: '四支同党，基本为真从' },
  ABBB: { prob: 80, range: '≈80%', word: '年支独异，极易从' },
  AAAB: { prob: 55, range: '50-60%', word: '时支独异，从与不从各半' },
  AABA: { prob: 20, range: '≈20%', word: '日支独异，不易从' },
  ABAA: { prob: 1, range: '≈1%', word: '月支独异，几乎不从' },
  AABB: { prob: 0, range: '0%', word: '二对二最平衡，无从格' },
  ABAB: { prob: 0, range: '0%', word: '二对二，无从格' },
  ABBA: { prob: null, range: '原文未给', word: '二对二，原文只说「有可能从格」' },
};

/** 日主在某一支的得地程度 */
export function supportOf(dayStem, branch) {
  const el = STEM_ELEMENT[dayStem];
  const table = SUPPORT[el];
  if (!table) return { level: '不得地', weight: 0 };
  if (table.得地.includes(branch)) return { level: '得地', weight: 1 };
  const half = table.半[branch];
  if (half !== undefined) return { level: '半得地', weight: half };
  return { level: '不得地', weight: 0 };
}

/** 天干属于身强阵营（印比）还是身弱阵营（食伤财官杀） */
function stemCamp(dayStem, stem) {
  const me = STEM_ELEMENT[dayStem];
  const el = STEM_ELEMENT[stem];
  if (!me || !el) return 'B';
  return el === me || GENERATES[el] === me ? 'A' : 'B';
}

/**
 * 八大地支结构。
 * @param {object} pillars 四柱（时柱可为 null）
 * @param {string} dayStem 日干
 */
export function branchStructureOf(pillars, dayStem) {
  const keys = PILLARS.filter((k) => pillars[k] && pillars[k].branch);
  if (!keys.length) return null;

  const yearCamp = branchCamp(pillars.year.branch, dayStem);
  const branches = keys.map((k) => {
    const branch = pillars[k].branch;
    const sup = supportOf(dayStem, branch);
    const camp = sup.weight >= 1 ? 'A' : 'B';
    return {
      key: k,
      label: LABEL[k],
      branch,
      camp: camp === yearCamp ? 'A' : 'B',
      support: sup.level,
      supportWeight: sup.weight,
      weight: PILLAR_WEIGHT.branch[k],
    };
  });

  // 年支那一档记 A；四支不足时（无时辰）只报实际存在的三支，code 相应变短
  const code = branches.map((b) => b.camp).join('');
  const prob = CONG_PROB[code] || null;

  const aCamp = supportOf(dayStem, pillars.year.branch).weight >= 1 ? '身强阵营' : '身弱阵营';
  const bCamp = aCamp === '身强阵营' ? '身弱阵营' : '身强阵营';

  const sum = (camp, field) => branches.filter((b) => b.camp === camp).reduce((n, b) => n + b[field], 0);
  const branchBal = { A: sum('A', 'weight'), B: sum('B', 'weight') };
  const branchStrong = aCamp === '身强阵营' ? branchBal.A : branchBal.B;
  const branchWeak = aCamp === '身强阵营' ? branchBal.B : branchBal.A;

  const stemKeys = ['year', 'month', 'hour'].filter((k) => pillars[k] && pillars[k].stem);
  const stemBal = { A: 0, B: 0 };
  for (const k of stemKeys) stemBal[stemCamp(dayStem, pillars[k].stem)] += PILLAR_WEIGHT.stem[k];

  const weakDays = branches.filter((b) => b.support !== '得地');
  const aCount = branches.filter((b) => b.camp === 'A').length;
  const bCount = branches.length - aCount;
  // 异类＝人数少的那一档；二对二没有异类
  const minority = aCount === 0 || bCount === 0 ? null : aCount < bCount ? 'A' : bCount < aCount ? 'B' : null;
  const odd = minority ? branches.filter((b) => b.camp === minority) : [];

  const balance = {
    aCamp,
    branch: branchBal,
    stem: stemBal,
    total: { A: branchBal.A + stemBal.A, B: branchBal.B + stemBal.B },
  };

  const shapeText = !minority
    ? (aCount === branches.length || bCount === branches.length
      ? `四支同党（均属${aCamp}）`
      : `二对二：${branches.filter((b) => b.camp === 'A').map((b) => b.label).join('、')}支属${aCamp}，`
        + `${branches.filter((b) => b.camp === 'B').map((b) => b.label).join('、')}支属${bCamp}`)
    : `异类为${odd.map((b) => `${b.label}支（${b.weight} 分）`).join('、')}`;

  const detail = [
    `四支${code}（${branches.map((b) => `${b.label}支${b.branch}${b.support}`).join('、')}）`,
    shapeText,
    `地支 身强${branchStrong} : 身弱${branchWeak}，加天干 ${balance.total[aCamp === '身强阵营' ? 'A' : 'B']}:${balance.total[aCamp === '身强阵营' ? 'B' : 'A']}`,
  ];

  // 没有时柱时概率表不适用：AAAA 之类需要四支齐全才成立
  const complete = branches.length === 4;

  return {
    code,
    complete,
    aCamp,
    congProb: complete && prob ? prob.prob : null,
    congRange: complete && prob ? prob.range : '三柱不判结构概率',
    word: complete && prob ? prob.word : '时柱暂缺，只列三支结构，不套从格概率',
    branches,
    balance,
    odd: odd.map((b) => ({ key: b.key, label: b.label, branch: b.branch, weight: b.weight })),
    halfSupported: weakDays.filter((b) => b.support === '半得地').map((b) => `${b.label}支${b.branch}`),
    detail: detail.join('；'),
    method: '按年支定 A 档，四支分两营；异类支的宫位权重决定静态从格概率（炳祥课堂口径，非唯一流派）',
    note: '静态结构。三合/三会/六合把某一支合走时，应以合化后的阵营重排；概率只作提示，不直接断从格。',
  };
}

function branchCamp(branch, dayStem) {
  return supportOf(dayStem, branch).weight >= 1 ? 'A' : 'B';
}

/**
 * 宫位权重的百分比视图（炳祥课程第 2.1 节）。
 *
 * 天干合计 10（年 2 / 月 5 / 日 0 / 时 3），地支合计 90（年 11 / 月 36 / 日 27 / 时 16），
 * 两表相加正好 100，所以「按柱合计」本身就是百分比：年 13%、月 41%、日 27%、时 19%。
 * 这里只做展示层换算，不改 bazi.js 的旺衰评分，也不参与取格与喜忌。
 *
 * 三柱模式（未给出生时刻）时，时柱是正午占位：权重照表列出，但合计只有 81，
 * 不重新归一化——权重是固定口径，归一化会把占位时柱洗成实有。
 */
export function weightPctOf(pillars = {}, { hourUnknown = false } = {}) {
  const present = PILLARS.filter((k) => pillars[k] && pillars[k].branch);
  const complete = !hourUnknown && present.length === 4;
  // 三柱模式：时柱是正午占位，不计入合计；其余缺柱同理
  const counted = complete ? PILLARS.slice() : present.filter((k) => !(k === 'hour' && hourUnknown));
  const stem = {};
  const branch = {};
  const pct = {};
  for (const k of PILLARS) {
    stem[k] = PILLAR_WEIGHT.stem[k];
    branch[k] = PILLAR_WEIGHT.branch[k];
    pct[k] = counted.includes(k) ? stem[k] + branch[k] : 0;
  }
  const totalStem = counted.reduce((n, k) => n + stem[k], 0);
  const totalBranch = counted.reduce((n, k) => n + branch[k], 0);
  const all = totalStem + totalBranch;
  const rows = counted.map((k) => `${LABEL[k]} ${pct[k]}%（干${stem[k]}+支${branch[k]}）`).join('、');
  const missing = counted.length < 4 ? `；${PILLARS.filter((k) => !counted.includes(k)).map((k) => LABEL[k]).join('、')}柱未计` : '';
  return {
    complete,
    stem,
    branch,
    pct,
    total: { stem: totalStem, branch: totalBranch, all },
    detail: `宫位权重合计 ${all}：${rows}${missing}`,
    method: '炳祥课程宫位权重：天干 2/5/0/3、地支 11/36/27/16，合计 100；日干为参照点计 0。只作展示换算，不改旺衰评分',
    note: complete
      ? '月令 41% 为四柱之首（课堂称事业宫）；日 27%、时 19%、年 13%'
      : '时柱暂缺，权重表照列，但本盘合计不足 100；不重新归一化',
  };
}
