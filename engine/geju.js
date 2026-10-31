// 八字格局、用神与行运评分
//
// 定位：在 bazi.js 算出四柱、五行、旺衰之后，给出
//   1) 格局（月令格 + 特殊格 + 常见组合）；
//   2) 用神 / 喜忌（调候优先 + 扶抑校验；气候平和时仍以扶抑为主）；
//   3) 大运、流年的吉凶倾向评分（含调候修正项）。
// 取舍：格局派别差异极大，这里只给「规则可复核」的判定，evidence 写明依据；
// 调候由 tiaohou.js 独立判定，与扶抑冲突时显式裁决并写明理由，不静默取用。

import { judgeClimate, arbitrate } from './tiaohou.js';
import { qtOf } from './qiongtong.js';
import { sanheGroupOf } from './sanhe.js';

const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const STEM_ELEMENT = {
  甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土',
  己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水',
};
const BRANCH_ELEMENT = {
  子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火',
  午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水',
};
const GENERATES = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const OVERCOMES = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };
const HIDDEN = {
  子: ['癸'], 丑: ['己', '癸', '辛'], 寅: ['甲', '丙', '戊'], 卯: ['乙'],
  辰: ['戊', '乙', '癸'], 巳: ['丙', '戊', '庚'], 午: ['丁', '己'], 未: ['己', '丁', '乙'],
  申: ['庚', '壬', '戊'], 酉: ['辛'], 戌: ['戊', '辛', '丁'], 亥: ['壬', '甲'],
};
const HIDDEN_W = [1, 0.5, 0.3];

const LUSHEN_BRANCH = { 甲: '寅', 乙: '卯', 丙: '巳', 丁: '午', 戊: '巳', 己: '午', 庚: '申', 辛: '酉', 壬: '亥', 癸: '子' };
const YANGREN_BRANCH = { 甲: '卯', 乙: '辰', 丙: '午', 丁: '未', 戊: '午', 己: '未', 庚: '酉', 辛: '戌', 壬: '子', 癸: '丑' };
const STEM_HE = { 甲己: '土', 乙庚: '金', 丙辛: '水', 丁壬: '木', 戊癸: '火' };

const isYangStem = (s) => STEMS.indexOf(s) % 2 === 0;
const ELEMENTS = ['木', '火', '土', '金', '水'];

/** 十神：以日干为我（与 bazi.js 同规则） */
export function tenGod(dayStem, otherStem) {
  const me = STEM_ELEMENT[dayStem];
  const it = STEM_ELEMENT[otherStem];
  const same = isYangStem(dayStem) === isYangStem(otherStem);
  if (me === it) return same ? '比肩' : '劫财';
  if (GENERATES[me] === it) return same ? '食神' : '伤官';
  if (OVERCOMES[me] === it) return same ? '偏财' : '正财';
  if (OVERCOMES[it] === me) return same ? '七杀' : '正官';
  if (GENERATES[it] === me) return same ? '偏印' : '正印';
  return '?';
}

const godGroups = {
  比劫: ['比肩', '劫财'],
  食伤: ['食神', '伤官'],
  财: ['正财', '偏财'],
  官杀: ['正官', '七杀'],
  印: ['正印', '偏印'],
};

/** 全局十神权重：四柱天干 1.0，地支藏干按本气 1 / 中气 0.5 / 余气 0.3 */
function godStats(pillars, dayStem) {
  const total = { 比劫: 0, 食伤: 0, 财: 0, 官杀: 0, 印: 0 };
  const byGod = { 比肩: 0, 劫财: 0, 食神: 0, 伤官: 0, 正财: 0, 偏财: 0, 正官: 0, 七杀: 0, 正印: 0, 偏印: 0 };
  const add = (stem, w) => {
    const god = tenGod(dayStem, stem);
    const g = Object.keys(godGroups).find((k) => godGroups[k].includes(god));
    if (g) total[g] += w;
    if (byGod[god] !== undefined) byGod[god] += w;
  };
  for (const key of ['year', 'month', 'day', 'hour']) {
    add(pillars[key].stem, key === 'day' ? 0.6 : 1);
    (HIDDEN[pillars[key].branch] || []).forEach((h, i) => add(h, HIDDEN_W[i] ?? 0.1));
  }
  for (const k of Object.keys(total)) total[k] = Math.round(total[k] * 10) / 10;
  for (const k of Object.keys(byGod)) byGod[k] = Math.round(byGod[k] * 10) / 10;
  return { groups: total, byGod };
}

/** 用神所属五行：生我 / 同我 / 我生 / 我克 / 克我 */
export function elementRoles(dayStem) {
  const me = STEM_ELEMENT[dayStem];
  const inMe = ELEMENTS.find((e) => GENERATES[e] === me);
  const guan = ELEMENTS.find((e) => OVERCOMES[e] === me);
  return { me, inMe, shi: GENERATES[me], cai: OVERCOMES[me], guan };
}

// ── 月令格 ───────────────────────────────────────────────────

// 四墓（杂气）月：辰戌丑未所藏多、用神不一，取用先看透干，再看会支。
// 会支只认三合局——子平真诠十六「逢申与子会局」的例子即三合，三会方与兼透兼用仍不纳入。
const ZA_MONTHS = ['辰', '未', '戌', '丑'];

function huiCandidate(pillars, monthBranch, cands) {
  if (!ZA_MONTHS.includes(monthBranch)) return null;
  const group = sanheGroupOf(monthBranch);
  if (!group) return null;
  const others = ['year', 'day', 'hour'];
  const need = group.branches.filter((b) => b !== monthBranch);
  if (!need.every((b) => others.some((k) => pillars[k].branch === b))) return null;
  const cand = cands.find((c) => STEM_ELEMENT[c.stem] === group.element);
  if (!cand) return null;
  const where = others
    .filter((k) => need.includes(pillars[k].branch))
    .map((k) => `${({ year: '年', day: '日', hour: '时' })[k]}支${pillars[k].branch}`);
  return { ...cand, group, where };
}

function monthPattern(pillars, dayStem, monthBranch) {
  const hidden = HIDDEN[monthBranch] || [];
  const cands = hidden.map((stem, i) => ({
    stem,
    god: tenGod(dayStem, stem),
    pos: ['本气', '中气', '余气'][i],
    w: HIDDEN_W[i] ?? 0.1,
  }));
  const others = ['year', 'month', 'hour'];
  const exposedKey = others.find((k) => cands.some((c) => c.stem === pillars[k].stem));
  const base = cands[0];
  const hui = exposedKey ? null : huiCandidate(pillars, monthBranch, cands);
  const use = exposedKey ? cands.find((c) => c.stem === pillars[exposedKey].stem) : (hui || base);
  const usedBy = exposedKey ? '透干' : (hui ? '会支' : '本气');
  const exposedPos = exposedKey ? { year: '年', month: '月', hour: '时' }[exposedKey] : null;

  // 建禄只认日干的禄位；戊土辰月、己土未月这类「本气比肩但不在禄位」的杂气月不再冒称建禄
  if (base.god === '比肩' && LUSHEN_BRANCH[dayStem] === monthBranch) {
    return {
      name: '建禄格',
      kind: '月令格',
      evidence: `月令${monthBranch}为日干${dayStem}之禄（本气${base.stem}比肩），身坐禄地`,
    };
  }
  if (base.god === '劫财') {
    if (YANGREN_BRANCH[dayStem] === monthBranch) {
      return {
        name: isYangStem(dayStem) ? '阳刃格' : '月刃格',
        kind: '月令格',
        evidence: `月令${monthBranch}为日干${dayStem}之刃（本气${base.stem}劫财）${isYangStem(dayStem) ? '' : '，阴干统称月刃'}`,
      };
    }
    return { name: '月劫格', kind: '月令格', evidence: `月令${monthBranch}本气${base.stem}为劫财` };
  }
  if (usedBy === '本气' && base.god === '比肩') {
    return {
      name: '比肩格',
      kind: '月令格',
      evidence: `月令${monthBranch}藏${hidden.join('')}，本气${base.stem}为比肩，但${dayStem}禄在${LUSHEN_BRANCH[dayStem]}、不在${monthBranch}，属杂气月比肩当权`,
    };
  }
  // 子平十六：「透乙则用月劫」——杂气月由透干或会支取到劫财时，仍作月劫论
  if (usedBy !== '本气' && use.god === '劫财') {
    const via = exposedKey ? `透于${exposedPos}干` : `${hui.where.join('、')}会成${hui.group.element}局`;
    return {
      name: '月劫格',
      kind: '月令格',
      evidence: `月令${monthBranch}藏${hidden.join('')}，${use.pos}${use.stem}（劫财）${via}，劫财为用，作月劫论`,
    };
  }
  const name = `${use.god}格`;
  let ex;
  if (exposedKey) {
    ex = `月令${monthBranch}藏${hidden.join('')}，${use.pos}${use.stem}（${use.god}）透于${exposedPos}干`;
  } else if (hui) {
    ex = `月令${monthBranch}藏${hidden.join('')}，本气${base.stem}（${base.god}）未透干，而${hui.where.join('、')}会成${hui.group.element}局，取${use.pos}${use.stem}（${use.god}）为用`;
  } else {
    ex = `月令${monthBranch}藏${hidden.join('')}，本气${base.stem}（${base.god}）未透干，以月令本气取格`;
  }
  return { name, kind: '月令格', evidence: ex };
}

// ── 特殊格 / 组合 ────────────────────────────────────────────

const ZHUANWANG = { 木: '曲直格', 火: '炎上格', 土: '稼穑格', 金: '从革格', 水: '润下格' };
const CONG = { 财: '从财格', 官杀: '从杀格', 食伤: '从儿格', 印: '从强格', 比劫: '从强格' };

function specialPatterns(pillars, dayStem, monthBranch, strength, wuxing, gods) {
  const out = [];
  const roles = elementRoles(dayStem);
  const me = roles.me;
  const mine = wuxing[me] ?? 0;
  const yin = wuxing[roles.inMe] ?? 0;
  const cai = wuxing[roles.cai] ?? 0;
  const guan = wuxing[roles.guan] ?? 0;
  const shi = wuxing[roles.shi] ?? 0;

  // 化气格：日干与年/月/时干五合，且月令助化神
  for (const key of ['year', 'month', 'hour']) {
    const other = pillars[key].stem;
    const target = STEM_HE[dayStem + other] || STEM_HE[other + dayStem];
    if (!target) continue;
    const monthEl = BRANCH_ELEMENT[monthBranch];
    const supports = monthEl === target || GENERATES[monthEl] === target;
    if (!supports) continue;
    out.push({
      name: `${target === '土' ? '化土格' : `化${target}格`}`,
      kind: '化气格',
      evidence: `日干${dayStem}与${['年', '月', '时'][['year', 'month', 'hour'].indexOf(key)]}干${other}合化${target}，月令${monthBranch}${monthEl}${monthEl === target ? '同化神' : '生助化神'}；化气格须全局无争合妒合才算真，此处仅列条件` ,
    });
    break;
  }

  // 专旺：日主之气独旺，官杀、财星皆弱
  if ((strength.level === '身强' || strength.level === '偏强') && mine + yin >= 5 && guan <= 1.2 && cai <= 1.8) {
    out.push({
      name: ZHUANWANG[me],
      kind: '专旺格',
      evidence: `日主${me}得${mine + yin}分（同类+印），官杀${guan}、财${cai}皆弱，成${ZHUANWANG[me]}之势`,
    });
  }

  // 从格：日主无根而被他神主导
  const hasRoot = ['year', 'month', 'day', 'hour'].some((key) =>
    (HIDDEN[pillars[key].branch] || []).some((h) => STEM_ELEMENT[h] === me || GENERATES[STEM_ELEMENT[h]] === me));
  if (!hasRoot && (strength.level === '身弱' || strength.level === '偏弱')) {
    const main = Object.entries({ 财: cai, 官杀: guan, 食伤: shi, 印: yin })
      .sort((a, b) => b[1] - a[1])[0];
    if (main[1] >= 2.5) {
      out.push({
        name: CONG[main[0]],
        kind: '从格',
        evidence: `日主无根（四支藏干无同类与印），${main[0]}占 ${main[1]} 分最旺，从${main[0]}之势`,
      });
    }
  }

  // 常见组合（只报事实并列，不作吉凶断语）
  const byGod = gods.byGod || {};
  const g = gods.groups || gods;
  const hasGod = (name) => (byGod[name] ?? 0) >= 0.5;
  const yinGods = (byGod.正印 ?? 0) + (byGod.偏印 ?? 0);
  const combos = [
    ['官印相生', hasGod('正官') && yinGods >= 0.5, `正官与印并见，官生印而护身`],
    ['杀印相生', hasGod('七杀') && yinGods >= 0.5 && (byGod.七杀 ?? 0) > (byGod.正官 ?? 0), `七杀与印并见，杀印相生`],
    ['食伤生财', (g.食伤 ?? 0) >= 0.6 && (g.财 ?? 0) >= 0.6, `食伤${g.食伤}+财${g.财}，食伤生财`],
    ['财官相生', (g.财 ?? 0) >= 0.6 && (g.官杀 ?? 0) >= 0.6, `财${g.财}+官杀${g.官杀}，财生官`],
    ['伤官配印', hasGod('伤官') && yinGods >= 0.5 && (g.财 ?? 0) <= 1, `伤官与印并见，伤官配印`],
    ['伤官见官', hasGod('伤官') && hasGod('正官'), `伤官与正官并见（伤官见官，为祸百端之说）`],
    ['羊刃驾杀', (g.官杀 ?? 0) >= 1 && YANGREN_BRANCH[dayStem] === monthBranch, `月令为刃，又有七杀${g.官杀}，刃杀相制`],
  ];
  for (const [name, cond, evidence] of combos) if (cond) out.push({ name, kind: '组合', evidence });
  return out;
}

// ── 通关 ────────────────────────────────────────────────────
// 滴天髓「通关」只给取象（织女、牛郎），这里把结构说清：
// 用神与忌神两行在局中都真有分量、且相克时，五行里恰有一行能接上——克方所生、且能生被克方。
// 只报这一行在局中的分量，不判「关通了就吉」。
const TONGGUAN_MIN = 1.5;
export function tongguanOf(favor = [], avoid = [], wuxing = {}) {
  const w = (el) => Math.round((Number(wuxing[el]) || 0) * 10) / 10;
  for (const use of favor) {
    if (w(use) < TONGGUAN_MIN) continue;
    for (const foe of avoid) {
      if (OVERCOMES[foe] !== use || w(foe) < TONGGUAN_MIN) continue;
      const bridge = GENERATES[foe];
      if (!bridge || GENERATES[bridge] !== use) continue;
      const weight = w(bridge);
      const bridgeIsAvoid = avoid.includes(bridge) && !favor.includes(bridge);
      const level = bridgeIsAvoid ? '为忌' : weight >= TONGGUAN_MIN ? '可通' : weight > 0 ? '关弱' : '未通';
      return {
        use, foe, bridge,
        weight,
        present: weight > 0,
        bridgeIsAvoid,
        level,
        usable: level === '可通',
        note: '相战＝用神与忌神两行各在局中 ≥1.5 分且相克；通关一行＝克方所生、又能生用神的那一行（五行里唯一），只报局中分量，不据此断吉凶',
      };
    }
  }
  return null;
}

// ── 用神 / 喜忌 ──────────────────────────────────────────────


function yongshenOf(dayStem, monthBranch, strength, wuxing, branches = []) {
  const roles = elementRoles(dayStem);
  const me = roles.me;
  const weak = strength.level === '身弱' || strength.level === '偏弱';
  const strong = strength.level === '身强' || strength.level === '偏强';
  const roleName = (el) => (el === me ? '比劫' : el === roles.inMe ? '印'
    : el === roles.shi ? '食伤' : el === roles.cai ? '财' : '官杀');
  const ROLE_VERB = { 比劫: '帮身', 印: '生身', 食伤: '泄秀', 财: '耗', 官杀: '制' };

  const baseFavor = weak ? [roles.inMe, me] : strong ? [roles.shi, roles.cai, roles.guan] : [roles.inMe, me, roles.shi];
  const baseAvoid = weak ? [roles.shi, roles.cai, roles.guan] : strong ? [me, roles.inMe] : [roles.guan, roles.cai];
  let favor = baseFavor.slice();
  let avoid = baseAvoid.slice();
  // 调候所忌若正好是扶抑所喜（弱土遇燥的火、寒湿盘的强土遇水），两边不能同时列。
  // 本表保留在喜用、不列入忌，并单列「有争议」；否则摘要会出现同一行既喜又忌。
  const disputed = [];

  // 先判气候，再决定要不要让调候压过扶抑
  const climate = judgeClimate({ monthBranch, dayStem, wuxing, branches });
  // 《穷通宝鉴》120 格：同一「日主 + 月令」的取用顺序。只作展示与加权，不覆盖气候调候
  const qt = qtOf(dayStem, monthBranch);
  const arb = arbitrate(climate, baseFavor, baseAvoid);
  if (climate.need && climate.priority === '调候优先') {
    const needEl = climate.need.element;
    if (!favor.includes(needEl)) favor.unshift(needEl);
    avoid = avoid.filter((e) => e !== needEl);
    const badEl = climate.avoidElement;
    if (badEl && favor.includes(badEl)) {
      disputed.push({
        element: badEl,
        favorRole: roleName(badEl),
        favorVerb: ROLE_VERB[roleName(badEl)],
        climate: climate.label,
        note: `调候忌${badEl}（${climate.label}），但它在扶抑里为${roleName(badEl)}；本表保留在喜用，不列入忌。`,
      });
    } else if (badEl && !avoid.includes(badEl)) {
      avoid.unshift(badEl);
    }
  }

  const expand = {
    比劫: ['比肩', '劫财'], 印: ['正印', '偏印'], 食伤: ['食神', '伤官'],
    财: ['正财', '偏财'], 官杀: ['正官', '七杀'],
  };
  const favorTenGods = Array.from(new Set(favor.flatMap((el) => expand[roleName(el)] || [])));
  const avoidTenGods = Array.from(new Set(avoid.flatMap((el) => expand[roleName(el)] || [])));
  const disputedTenGods = Array.from(new Set(disputed.flatMap((d) => expand[roleName(d.element)] || [])));
  const tongguan = tongguanOf(favor, avoid, wuxing);

  const describe = (el) => `${el}（${roleName(el)}·${ROLE_VERB[roleName(el)]}）`;
  const disputedText = disputed
    .map((d) => `${d.element}（扶抑为${d.favorRole}·${d.favorVerb}；${d.climate}盘调候忌${d.element}，本表保留在喜用）`)
    .join('、');
  const detail = [
    `日主${dayStem}${me}，${strength.level}（${strength.score} 分）：`,
    `喜${favor.map(describe).join('、') || '—'}；忌${avoid.map(describe).join('、') || '—'}。`,
    disputed.length ? `有争议：${disputedText}。` : '',
    !weak && !strong ? '身中和，先取调候与通关，喜忌随大运流年动态变化。' : '',
    `调候：${climate.label}（${(climate.evidence || []).join('、')}）${climate.need ? `，取${climate.need.stem}${climate.need.element}，忌${climate.avoidElement}${disputed.some((d) => d.element === climate.avoidElement) ? '（有争议）' : ''}` : '，气候平和'}。`,
    qt ? `穷通宝鉴：${qt.month}${dayStem}${me}，用神${qt.yong.join('、')}（首取${qt.primary}）。` : '',
    tongguan
      ? `通关：忌${tongguan.foe}克用${tongguan.use}，五行以${tongguan.bridge}为关；局中${tongguan.level === '可通'
        ? `${tongguan.bridge} ${tongguan.weight} 分，关可通`
        : tongguan.level === '关弱'
          ? `仅 ${tongguan.bridge} ${tongguan.weight} 分，关弱`
          : tongguan.level === '为忌'
            ? `${tongguan.bridge} ${tongguan.weight} 分但此行为忌，通关力打折`
            : `未见${tongguan.bridge}，关未通`}（只作结构提示，不据此断吉凶）。`
      : '',
    arb.text,
    arb.clash ? '取舍：本盘按「调候优先、扶抑次之」取用；若你更认同扶抑派，可把调候当环境偏好，强弱判断不受影响。' : '',
  ].filter(Boolean).join('');

  return {
    method: climate.priority === '调候优先' ? '调候优先 + 扶抑校验' : '扶抑为主 + 调候校验',
    level: strength.level,
    favor,
    avoid,
    disputed,
    favorRoles: favor.map(roleName),
    avoidRoles: avoid.map(roleName),
    favorTenGods,
    avoidTenGods,
    disputedTenGods,
    tiaohou: { ...climate, ...arb, element: climate.need ? climate.need.element : null },
    climate,
    qt,
    tongguan,
    detail,
  };
}

// ── 行运评分 ────────────────────────────────────────────────

const TIERS = [
  [1.3, '大吉'],
  [0.6, '吉'],
  [-0.6, '平'],
  [-1.3, '忌'],
  [-Infinity, '大忌'],
];

export function scoreLuck(ganzhi, frame) {
  const ys = frame.yongshen;
  const stem = ganzhi[0];
  const branch = ganzhi[1];
  const stemEl = STEM_ELEMENT[stem];
  const branchEl = BRANCH_ELEMENT[branch];
  const th = ys.tiaohou || ys.climate || null;
  const scoreEl = (el) => {
    let s = 0;
    if (ys.favor.includes(el)) s += 1;
    if (ys.avoid.includes(el)) s -= 1;
    return s;
  };
  let score = scoreEl(stemEl) * 1.0 + scoreEl(branchEl) * 0.8;
  for (const h of (HIDDEN[branch] || []).slice(1)) {
    score += scoreEl(STEM_ELEMENT[h]) * 0.2;
  }

  const reasons = [];
  if (ys.favor.includes(stemEl)) reasons.push(`天干${stem}${stemEl}为用神`);
  else if (ys.avoid.includes(stemEl)) reasons.push(`天干${stem}${stemEl}为忌神`);
  else reasons.push(`天干${stem}${stemEl}不喜不忌`);
  if (ys.favor.includes(branchEl)) reasons.push(`地支${branch}${branchEl}助用`);
  else if (ys.avoid.includes(branchEl)) reasons.push(`地支${branch}${branchEl}助忌`);

  // 调候修正：不是"有没有这个五行"，而是"这一年是给命局添了一把火，还是泼了一盆水"
  if (th && th.need && th.priority === '调候优先') {
    const needEl = th.need.element;
    const oppEl = th.avoidElement;
    const cold = String(th.kind).includes('寒');
    if (stemEl === needEl) {
      score += 1.1;
      reasons.push(`${th.label}之局得${stem}${stemEl}，${cold ? '解冻' : '得润'}`);
    } else if (stemEl === oppEl) {
      score -= 0.9;
      reasons.push(`${th.label}之局再逢${stem}${stemEl}，${cold ? '冻木难生' : '燥上加燥'}`);
    }
    if (branchEl === needEl) {
      score += 0.9;
      reasons.push(`地支${branch}${branchEl}合调候`);
    } else if (branchEl === oppEl) {
      score -= 1.0;
      reasons.push(`地支${branch}${branchEl}加重${th.label}`);
    }
    if (cold && (stemEl === '水' || branchEl === '水')) score -= 0.3;
  } else if (th && th.need && (stemEl === th.need.element || branchEl === th.need.element)) {
    reasons.push(`合调候（${th.need.element}）`);
  }

  const godStem = tenGod(frame.dayStem, stem);
  const bonus = ys.favorTenGods.includes(godStem) ? 0.3 : 0;
  // 穷通宝鉴：天干正好是这一格的首取/次取时，再给一点「按书取用」的分
  // 只在该干不属于忌神时加分——书里的取用与气候调候不同向时，以调候为先
  const qt = ys.qt || null;
  if (qt && qt.primary && !ys.avoid.includes(STEM_ELEMENT[qt.primary])) {
    if (stem === qt.primary) {
      score += 0.3;
      reasons.push(`天干${stem}正是${qt.branch}月${qt.stem}日的首取（穷通宝鉴）`);
    } else if (qt.yong.includes(stem) && !ys.avoid.includes(STEM_ELEMENT[stem])) {
      score += 0.15;
      reasons.push(`天干${stem}为穷通宝鉴次取`);
    }
  }
  let total = Math.round((score + bonus) * 10) / 10;
  total = Math.max(-4, Math.min(4, total));

  const tier = TIERS.find(([min]) => total >= min)[1];
  return { ganzhi, score: total, tier, stemTenGod: godStem, reasons, note: `${godStem}运，${tier}（${total}）` };
}

// ── 对外入口 ────────────────────────────────────────────────

/**
 * @param {object} p
 * @param {object} p.pillars 四柱
 * @param {string} p.dayStem 日干
 * @param {string} p.monthBranch 月支
 * @param {object} p.strength bazi.js 的旺衰结果
 * @param {object} p.wuxing 五行分值
 */
export function analyzeBaziFrame({ pillars, dayStem, monthBranch, strength, wuxing }) {
  const gods = godStats(pillars, dayStem);
  const month = monthPattern(pillars, dayStem, monthBranch);
  const special = specialPatterns(pillars, dayStem, monthBranch, strength, wuxing, gods);
  const geju = [month, ...special];
  const yongshen = yongshenOf(dayStem, monthBranch, strength, wuxing, Object.values(pillars).map((p) => p.branch));
  return {
    geju,
    primary: month,
    primaryName: month.name,
    godStats: gods,
    yongshen,
    dayStem,
    monthBranch,
  };
}
