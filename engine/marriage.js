// 婚姻这条线：先定类型，再定年份，最后给三五句人话。
//
// 为什么要单独一层：用户问「我什么时候结婚」「对方什么样」是最常见的问法
// （见 docs/问题地图-十二类.md，婚姻占全部真实问法的四分之一），
// 但原先把配偶星、夫妻宫、流年合冲散在 interpret.js 各处，
// 用户读完只知道「配偶星不弱」，还是不知道自己哪年该动、对方什么特征。
//
// 口径说明：这是规则化的一层，不是唯一流派。
//   · 配偶星：男命取财（正财／偏财），女命取官杀（正官／七杀）——子平通行；
//   · 夫妻宫：日支；
//   · 动婚信号：流年合入夫妻宫、冲夫妻宫、配偶星透干、红鸾天喜到，
//     只标「什么时候容易动」，不断言「一定结婚」；
//   · 特征推断按配偶星五行与所在柱位取象，属象法，个体差异大，
//     写成「大概」「多半」而不是定论。
import { STEMS, BRANCHES } from './calendar.js';
import { tenGod } from './bazi.js';
import { fail } from './fail.js';

const SPOUSE_GODS = { male: ['正财', '偏财'], female: ['正官', '七杀'] };

// 六合 / 六冲 / 驿马
const LIUHE = {
  子: '丑', 丑: '子', 寅: '亥', 亥: '寅', 卯: '戌', 戌: '卯',
  辰: '酉', 酉: '辰', 巳: '申', 申: '巳', 午: '未', 未: '午',
};
const LIUCHONG = {
  子: '午', 午: '子', 丑: '未', 未: '丑', 寅: '申', 申: '寅',
  卯: '酉', 酉: '卯', 辰: '戌', 戌: '辰', 巳: '亥', 亥: '巳',
};
const YIMA = {
  申: '寅', 子: '寅', 辰: '寅', 寅: '申', 午: '申', 戌: '申',
  巳: '亥', 酉: '亥', 丑: '亥', 亥: '巳', 卯: '巳', 未: '巳',
};
// 红鸾按年支起：子卯、丑寅、寅丑、卯子、辰亥、巳戌、午酉、未申、申未、酉午、戌巳、亥辰
const HONGLUAN = {
  子: '卯', 丑: '寅', 寅: '丑', 卯: '子', 辰: '亥', 巳: '戌',
  午: '酉', 未: '申', 申: '未', 酉: '午', 戌: '巳', 亥: '辰',
};

// 配偶星五行 → 取象（象法，只作「大概」用）
const LOOK = {
  木: '身形偏高偏瘦，五官清秀，眉眼偏长',
  火: '面色偏红，眼神亮，动作快，个头中等偏上',
  土: '体格厚实，脸型偏方圆，站姿稳',
  金: '轮廓分明，皮肤偏白，骨架清瘦有力',
  水: '体态偏圆润，眼睛灵活，表情多',
};
const TEMPER = {
  木: '性子直，认死理，吃软不吃硬',
  火: '脾气急，热得快也消得快，藏不住话',
  土: '慢热，稳，认准了就不动',
  金: '讲原则，说话有分寸，不太会哄人',
  水: '心思细，会看人脸色，主意变得快',
};
const FROM = {
  year: '多半在家乡以外，或者经长辈牵线',
  month: '多在同学同事这类日常圈子里遇到',
  day: '自己认识的成分大，多半谈过一段才定',
  hour: '遇得偏晚，或者年纪差得比较明显',
};
const ZHIZUO = {
  比肩: '相处像朋友，好起来无话不谈，也容易各持一端',
  劫财: '容易有第三方掺和，或者两个人抢主导',
  食神: '日子过得松弛，你会被照顾得多一点',
  伤官: '你话多、要求高，容易嘴快伤到人',
  正财: '务实，算得清日子，但不太浪漫',
  偏财: '花销大，人缘旺，也容易分心',
  正官: '对方有规矩，关系偏正式，也偏约束',
  七杀: '对方强势，压力感重，但推得动你',
  正印: '被照顾，像有人替你兜底',
  偏印: '对方想法多，安静，有时猜不透',
};

const COL_CN = {
  year: '年柱（早年、远方）',
  month: '月柱（工作圈、同辈）',
  day: '日柱（自己身边）',
  hour: '时柱（晚年、晚辈）',
};

const round1 = (v) => Math.round(v * 10) / 10;

/** 某年的流年干支（1984 甲子为基准）。 */
export function yearGanzhi(year) {
  const i = ((year - 4) % 60 + 60) % 60;
  return { stem: STEMS[i % 10], branch: BRANCHES[i % 12], index: i };
}

/**
 * 婚姻层：给定一张已排好的八字盘，产出类型判断、对象取象、动婚年份与要留意的地方。
 *
 * @param {object} chart buildBazi 的返回值（至少要有 pillars、dayun、frame）
 * @param {object} [opts] { fromAge, toAge } 判年区间，默认 20–45 岁
 * @returns {object}
 */
export function buildMarriage(chart, opts = {}) {
  if (!chart || typeof chart !== 'object' || !chart.pillars) {
    throw fail('E_INPUT', '婚姻盘点需要一张已排好的八字盘：先调 buildBazi 拿到 pillars');
  }
  const gender = chart.input && chart.input.gender;
  if (gender !== 'male' && gender !== 'female') {
    throw fail('E_INPUT', '婚姻盘点需要性别：男命取财为妻、女命取官为夫，不可缺省');
  }
  const isMale = gender === 'male';
  const spouseGods = SPOUSE_GODS[gender];
  const day = chart.pillars.day;
  const dayStem = day.stem;
  const dayBranch = day.branch;
  const yearBranch = chart.pillars.year.branch;

  // ── 一、配偶星：权重、元素、透在哪儿 ─────────────────────────
  const byGod = (chart.frame && chart.frame.godStats && chart.frame.godStats.byGod) || {};
  let starWeight = 0;
  for (const god of spouseGods) starWeight += Number(byGod[god]) || 0;

  const starCols = [];
  const starElems = {};
  for (const key of ['year', 'month', 'day', 'hour']) {
    const p = chart.pillars[key];
    if (!p) continue;
    const g = p.stemTenGod;
    if (spouseGods.includes(g)) {
      starCols.push({ col: key, pos: '干', god: g, stem: p.stem });
      starElems[p.stemElement] = (starElems[p.stemElement] || 0) + 1;
    }
    for (const h of p.hidden || []) {
      if (spouseGods.includes(h.tenGod)) {
        starCols.push({ col: key, pos: '支', god: h.tenGod, stem: h.stem });
        starElems[h.element] = (starElems[h.element] || 0) + 1;
      }
    }
  }
  let starElement = '';
  let starElemMax = 0;
  for (const k of Object.keys(starElems)) {
    if (starElems[k] > starElemMax) { starElemMax = starElems[k]; starElement = k; }
  }
  if (!starElement) {
    // 原局不见配偶星时，用配偶星「该是什么五行」反推：男命取我克，女命取克我
    const me = day.stemElement;
    const KE = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };   // 我克者
    const BEI = { 木: '金', 金: '火', 火: '水', 水: '土', 土: '木' };  // 克我者
    starElement = isMale ? (KE[me] || '') : (BEI[me] || '');
  }
  const starLevel = starWeight >= 2 ? '旺' : starWeight >= 1 ? '中和' : starWeight > 0 ? '偏弱' : '不见';

  // ── 二、夫妻宫：日支的状态 ──────────────────────────────────
  const palaceHidden = (day.hidden || [])[0] || {};
  const relations = Array.isArray(chart.relations) ? chart.relations : [];
  const palaceChong = [];
  const palaceHe = [];
  for (const rel of relations) {
    if (typeof rel !== 'string') continue;
    if (rel.includes(dayBranch) && rel.includes('冲')) palaceChong.push(rel);
    if (rel.includes(dayBranch) && rel.includes('合')) palaceHe.push(rel);
  }
  // 本命四支之间直接查一遍，relations 的表达方式各版不一，这里自己算更稳
  for (const key of ['year', 'month', 'hour']) {
    const b = chart.pillars[key] && chart.pillars[key].branch;
    if (!b) continue;
    if (LIUCHONG[b] === dayBranch && !palaceChong.includes(b)) palaceChong.push(`${b}冲${dayBranch}`);
    if (LIUHE[b] === dayBranch && !palaceHe.includes(b)) palaceHe.push(`${b}合${dayBranch}`);
  }
  const palaceSha = (day.shensha || []).filter((s) => ['阴差阳错', '孤辰', '寡宿', '红艳煞'].includes(s));

  // ── 三、类型：先定类型，再定年份 ─────────────────────────────
  const groups = (chart.frame && chart.frame.godStats && chart.frame.godStats.groups) || {};
  const bijie = Number(groups['比劫']) || 0;
  const shishang = Number(groups['食伤']) || 0;
  const types = [];
  if (palaceChong.length) {
    types.push({ key: 'bo', label: '关系有起伏型', why: `夫妻宫（日支${dayBranch}）在命局里就被冲（${palaceChong.join('、')}），亲密关系容易有反复，起得快也容易散` });
  }
  if (starLevel === '不见' || starLevel === '偏弱') {
    types.push({ key: 'wan', label: '晚成型', why: starLevel === '不见' ? '原局不见配偶星，姻缘多由大运流年引发，遇得偏晚' : `配偶星（${spouseGods.join('/')}）偏弱（${round1(starWeight)}），缘分来得慢，但一旦定下反而稳` });
  }
  if (isMale && bijie >= 3) {
    types.push({ key: 'zheng', label: '竞争型', why: `比劫偏重（${round1(bijie)}），男命比劫夺财，择偶时对手多，或者自己犹豫不决` });
  }
  if (!isMale && shishang >= 2.5) {
    types.push({ key: 'ke', label: '挑剔型', why: `食伤偏重（${round1(shishang)}），女命食伤制官，看人眼光高，也容易一句话把人顶走` });
  }
  if ((starCols.some((c) => c.col === 'year') || starCols.some((c) => c.col === 'hour'))) {
    types.push({ key: 'yi', label: '远距离型', why: '配偶星落在年柱或时柱，对方多半来自外地，或者遇见的时间点偏早偏晚' });
  }
  if (!types.length) {
    types.push({ key: 'ping', label: '平顺型', why: `配偶星${starLevel}、夫妻宫未见冲，感情的基调偏平顺，不需要特意去催` });
  }
  const mainType = types[0];

  // ── 四、对象取象 ───────────────────────────────────────────
  const starCol = starCols[0] ? starCols[0].col : '';
  const spousePortrait = {
    element: starElement,
    look: LOOK[starElement] || '看不出明显偏向',
    temper: TEMPER[starElement] || '性子不好一概而论',
    from: FROM[starCol] || '来路不好判断，多半在日常场合遇到',
    relation: ZHIZUO[palaceHidden.tenGod] || '相处模式看两个人的实际磨合',
  };

  // ── 五、动婚年份：先定类型再加权 ─────────────────────────────
  const birthYear = chart.input
    ? (chart.input.civil && chart.input.civil.year) || chart.input.year
    : undefined;
  const fromAge = Number(opts.fromAge) || 20;
  const toAge = Number(opts.toAge) || 45;
  const dayunList = (chart.dayun && Array.isArray(chart.dayun.list)) ? chart.dayun.list : [];
  const favor = (chart.frame && chart.frame.yongshen && chart.frame.yongshen.favor) || [];
  const hongluan = HONGLUAN[yearBranch] || '';
  const tianxi = hongluan ? BRANCHES[(BRANCHES.indexOf(hongluan) + 6) % 12] : '';

  const windows = [];
  const nowYear = (chart.liunian && chart.liunian[0] && chart.liunian[0].year)
    || Number(opts.nowYear) || 0;
  if (Number.isInteger(birthYear)) {
    for (let age = fromAge; age <= toAge; age += 1) {
      const year = birthYear + age;
      const gz = yearGanzhi(year);
      const reasons = [];
      let score = 0;

      if (LIUHE[gz.branch] === dayBranch) { score += 2.5; reasons.push(`${gz.branch}与日支${dayBranch}六合，合入夫妻宫`); }
      if (LIUCHONG[gz.branch] === dayBranch) { score += 1.5; reasons.push(`${gz.branch}冲日支${dayBranch}，主变动`); }
      const gzGod = tenGod(dayStem, gz.stem);
      if (spouseGods.includes(gzGod)) { score += 2; reasons.push(`流年天干${gz.stem}为${gzGod}，配偶星透出`); }
      if (hongluan && gz.branch === hongluan) { score += 1.5; reasons.push('红鸾到'); }
      if (tianxi && gz.branch === tianxi) { score += 1.2; reasons.push('天喜到'); }

      const dy = dayunList.find((d) => age >= d.startAge && age < d.startAge + 10);
      if (dy) {
        if (dy.branch === LIUHE[dayBranch]) { score += 0.8; reasons.push(`大运${dy.ganzhi}地支合夫妻宫`); }
        if (dy.branch === LIUCHONG[dayBranch]) { score += 0.6; reasons.push(`大运${dy.ganzhi}地支冲夫妻宫`); }
        if (spouseGods.includes(dy.stemTenGod)) { score += 0.6; reasons.push(`大运走${dy.stemTenGod}`); }
      }
      if (starElement && favor.includes(starElement)) score += 0.4;

      if (score >= 2) {
        windows.push({
          year, age, ganzhi: `${gz.stem}${gz.branch}`,
          dayun: dy ? dy.ganzhi : '', score: round1(score),
          kind: score >= 4 ? '最容易动' : score >= 3 ? '容易动' : '有动静',
          past: nowYear > 0 && year < nowYear,
          reasons,
        });
      }
    }
  }
  windows.sort((a, b) => (b.score - a.score) || (a.year - b.year));
  // 用户问的是「往后哪年」，所以未来年份优先占名额；过去的只留两个作参照。
  const picked = [];
  const takeOne = (w) => {
    if (picked.every((p) => Math.abs(p.year - w.year) >= 2)) picked.push(w);
  };
  for (const w of windows) { if (!w.past && picked.length < 4) takeOne(w); }
  for (const w of windows) { if (w.past && picked.filter((p) => p.past).length < 2) takeOne(w); }
  picked.sort((a, b) => a.year - b.year);

  // ── 六、要留意的 ───────────────────────────────────────────
  const risks = [];
  if (palaceChong.length) risks.push(`夫妻宫逢冲（${palaceChong.join('、')}），关系里容易有聚少离多，或者一段接一段地换`);
  if (palaceSha.length) risks.push(`日柱带${palaceSha.join('、')}，交往阶段容易差一口气，往往不是不合适，是时机不对`);
  if (isMale && bijie >= 3) risks.push('比劫重，财星易被分夺：别把恋人晾着去忙别的，容易被别人接手');
  if (!isMale && shishang >= 2.5) risks.push('食伤重，官星受制：话别太快，很多矛盾是一句顶回去之后才有的');
  if (palaceHidden.tenGod === '比肩' || palaceHidden.tenGod === '劫财') risks.push('日支坐比劫：两个人的边界感偏弱，容易争主导，谁都不肯先低头');
  if (starLevel === '不见') risks.push('原局无配偶星，不是不能婚，是要等大运流年把它引出来，急不来');
  if (!risks.length) risks.push('没有明显的硬伤，剩下的就是遇不遇得上、愿不愿意定');

  // ── 七、人话，三五句 ───────────────────────────────────────
  const lines = [];
  lines.push(`${mainType.label}：${mainType.why}。`);
  const starLine = starLevel === '不见'
    ? `原局看不到${isMale ? '财' : '官杀'}，配偶星要从大运流年里找`
    : `配偶星（${spouseGods.join('/')}）${starLevel}，落在${COL_CN[starCol] || '命局里'}`;
  lines.push(`${starLine}；日支${dayBranch}${palaceHidden.tenGod ? `坐${palaceHidden.tenGod}` : ''}，${spousePortrait.relation}。`);
  const future = picked.filter((w) => !w.past);
  const pastOnes = picked.filter((w) => w.past);
  const fmt = (w) => `${w.year}（${w.age}岁，${w.kind}）`;
  if (future.length) {
    lines.push(`往后看，最容易动的是 ${future.slice(0, 3).map(fmt).join('、')}${pastOnes.length ? `；此前 ${pastOnes.map((w) => w.year).join('、')} 也有过动静` : ''}，这几个年份前后多留意身边的人。`);
  } else if (pastOnes.length) {
    lines.push(`此前 ${pastOnes.map(fmt).join('、')} 有过动静；到 ${toAge} 岁之前没有更强的信号，等大运换步再看。`);
  } else {
    lines.push(`${fromAge}–${toAge} 岁之间没有明显动婚的年份，感情上偏静，等大运换步再看。`);
  }
  lines.push(`对方大概：${spousePortrait.look}；${spousePortrait.temper}；${spousePortrait.from}。`);
  lines.push(`${risks[0]}。`);

  return {
    gender, genderCn: isMale ? '男命' : '女命',
    type: mainType, types,
    star: {
      gods: spouseGods, weight: round1(starWeight), level: starLevel,
      element: starElement, cols: starCols,
    },
    palace: {
      branch: dayBranch, element: day.branchElement,
      tenGod: palaceHidden.tenGod || '', zizuo: day.zizuo || '',
      chong: palaceChong, he: palaceHe, sha: palaceSha,
      yima: YIMA[yearBranch] === dayBranch,
    },
    spouse: spousePortrait,
    hongluan, tianxi,
    windows: picked,
    risks,
    lines,
    basis: '规则化口径：配偶星取男财女官、夫妻宫取日支、动婚信号取流年合冲夫妻宫与配偶星透干、红鸾天喜至；特征按配偶星五行与柱位取象。属子平通行读法，不是唯一流派，也不是对具体某个人的断言。',
  };
}
