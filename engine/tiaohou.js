// 调候：寒暖燥湿判定 + 用神仲裁
//
// 定位：八字取用，传统上先看「气候」——冬生水冷木寒，先要火来解冻；
// 夏生火炎土燥，先要水来润泽。扶抑法管的是「强弱」，调候管的是「冷暖」，
// 两者不是一回事，冲突时要显式裁决，而不是悄悄按扶抑打分。
//
// 本模块只做三件事：
//   1) 从月令 + 五行分布 + 地支燥湿，判出寒 / 热 / 燥 / 湿 / 平和，并给出依据；
//   2) 给出调候所需之物（丙火 / 壬水），以及与之相反的忌物；
//   3) 生成一段「说人话」的气候叙述，供解释层与面板直接使用。
//
// 口径：调候取用以月令寒暖 + 全局水火燥湿为主，属通行做法；
// 日主 + 月令的更细取用由 engine/qiongtong.js（穷通宝鉴 120 格）叠加，冲突时以调候优先。

const STEM_ELEMENT = {
  甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土',
  己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水',
};

/** 月令的寒暖基准：-2 最寒（子月），+2 最热（午月） */
const SEASON_TEMP = {
  亥: -1.8, 子: -2, 丑: -1.5,
  寅: -0.4, 卯: 0.2, 辰: 0.5,
  巳: 1.3, 午: 2, 未: 1.5,
  申: 0.6, 酉: 0.2, 戌: -0.2,
};

const SEASON_NAME = {
  亥: '初冬', 子: '仲冬', 丑: '季冬',
  寅: '初春', 卯: '仲春', 辰: '季春',
  巳: '初夏', 午: '仲夏', 未: '季夏',
  申: '初秋', 酉: '仲秋', 戌: '季秋',
};

/** 湿土 / 燥土：丑辰为湿，未戌为燥；亥子水气重，巳午火气重 */
const WET_BRANCH = { 丑: 1, 辰: 1, 子: 0.6, 亥: 0.5 };
const DRY_BRANCH = { 未: 1, 戌: 1, 午: 0.4, 巳: 0.4 };

/** 各气候的调候所需 */
const NEED = {
  寒湿: { element: '火', stem: '丙', avoid: '水', why: '冻土要太阳来解，水再多只会更冷' },
  寒燥: { element: '火', stem: '丙', avoid: '水', why: '天寒地干，先要一点阳和之气' },
  寒: { element: '火', stem: '丙', avoid: '水', why: '冬令气寒，非火不暖' },
  温热: { element: '水', stem: '壬', avoid: '火', why: '火气初旺，得水润泽才好用' },
  燥热: { element: '水', stem: '壬', avoid: '火', why: '火炎土燥，非水不润' },
  热: { element: '水', stem: '壬', avoid: '火', why: '夏令炎威，先求一泓清水' },
  湿滞: { element: '火', stem: '丙', avoid: '水', why: '湿气郁结，要火来蒸腾' },
  燥: { element: '水', stem: '壬', avoid: '火', why: '气燥不润，得水则舒' },
  平和: { element: null, stem: null, avoid: null, why: '寒暖相济，气候不是这一盘的主要矛盾' },
};

const KIND_NAME = {
  寒湿: '寒湿', 寒燥: '寒燥', 寒: '寒',
  温热: '温热', 燥热: '燥热', 热: '热',
  湿滞: '湿滞', 燥: '燥', 平和: '平和',
};

/** 日主五行在不同气候里的「体感」一句话 */
const DAY_FEEL = {
  寒湿: {
    木: '木是花草藤萝，冰封的土里抽不出芽——它不缺雨水，缺的是一轮太阳',
    火: '火在冬天最怕被水浇，一点火苗要护住，才谈得上发光',
    土: '土冻成一块，再厚也长不出东西，得先晒透',
    金: '金在寒水里泡久了，锋刃会发滞，要火来炼一炼',
    水: '水本就冷，再加寒就是死水；要火把它烧活',
  },
  寒燥: {
    木: '木在干冷里最难熬，既缺暖气，又缺一点滋润',
    火: '火在寒天里要先活下来，才有余力照别人',
    土: '土冷而干，板结着，得暖气与一点水汽一起松',
    金: '金寒则脆，得火炼、得土养，才成器',
    水: '水在寒天里收得太紧，要一点火气化开',
  },
  寒: {
    木: '冬木先要暖，暖了才谈得上发荣',
    火: '火在冬天要护住，别被冷风吹散',
    土: '土寒不生物，先暖后养',
    金: '金寒则钝，得火则利',
    水: '水寒则滞，得火则行',
  },
  温热: {
    木: '木在暖和里长得快，但要防长得太急、根扎不深',
    火: '火得时令，容易旺过头，要留一点水来收',
    土: '土被火烤着，容易燥，得水润一润',
    金: '金在暖处容易软，需要一点水土把它养住',
    水: '水在暖处容易蒸干，要源头不断',
  },
  燥热: {
    木: '木被火烤着，叶子先焦，得先补水',
    火: '火已经够旺了，再添柴只会烧到自己',
    土: '土燥则裂，得水润、得木疏',
    金: '金在燥热里容易发烫变形，要水来淬',
    水: '水在燥热里最珍贵，一滴都不能浪费',
  },
  热: {
    木: '木在暑天要水，不然只长叶不结果',
    火: '火已经当令，收着用比放出去更划算',
    土: '土热则燥，得水则安',
    金: '金在暑天要水来洗，才见光泽',
    水: '水在暑天是命脉，要保住源头',
  },
  湿滞: {
    木: '木泡在水里会烂根，先要疏土透气',
    火: '火在湿气里点不着，得先除湿',
    土: '土湿成泥，得火蒸腾、得木来疏',
    金: '金埋在湿土里会生锈，要见火见光',
    水: '水已经太多，再添就是泛滥',
  },
  燥: {
    木: '木在燥气里容易枯，先要一点水',
    火: '火在燥处容易失控，要收',
    土: '土燥不毛，得水润、得木疏',
    金: '金在燥处要水来洗，才不刺手',
    水: '水在燥处最容易被耗干，要护住',
  },
  平和: {
    木: '寒暖还算相济，木有生长的余地',
    火: '气候不偏，火可以按自己的节奏用',
    土: '土不燥不湿，能养也能载',
    金: '金不寒不燥，成器只差打磨',
    水: '水不冰不涸，能流得动',
  },
};

const round2 = (n) => Math.round(n * 100) / 100;

/**
 * 判定气候。
 * @param {object} p
 * @param {string} p.monthBranch 月支
 * @param {string} p.dayStem 日干
 * @param {object} p.wuxing 五行分值（bazi.js 的 wuxing）
 * @param {string[]} p.branches 四柱地支（用于数湿土/燥土）
 */
export function judgeClimate({ monthBranch, dayStem, wuxing = {}, branches = [] }) {
  const fire = Number(wuxing['火'] || 0);
  const water = Number(wuxing['水'] || 0);
  let wet = 0;
  let dry = 0;
  let wetCount = 0;
  let dryCount = 0;
  for (const b of branches) {
    if (WET_BRANCH[b]) { wet += WET_BRANCH[b]; if (b === '丑' || b === '辰') wetCount += 1; }
    if (DRY_BRANCH[b]) { dry += DRY_BRANCH[b]; if (b === '未' || b === '戌') dryCount += 1; }
  }
  const seasonT = SEASON_TEMP[monthBranch] ?? 0;
  const temp = round2(seasonT + 0.45 * fire - 0.4 * water);
  const damp = round2(wet - dry + 0.25 * water - 0.25 * fire);

  const cold = temp <= -0.8;
  const hot = temp >= 0.9;
  const wetSide = damp >= 0.8;
  const drySide = damp <= -0.8;

  let kind = '平和';
  if (cold && wetSide) kind = '寒湿';
  else if (cold && drySide) kind = '寒燥';
  else if (cold) kind = '寒';
  else if (hot && drySide) kind = '燥热';
  else if (hot) kind = '温热';
  else if (hot && damp >= 0.8) kind = '湿滞';
  else if (drySide) kind = '燥';
  else if (wetSide) kind = '湿滞';

  const need = NEED[kind] || NEED.平和;
  const dayElement = STEM_ELEMENT[dayStem] || '土';
  const evidence = [
    `${SEASON_NAME[monthBranch] || monthBranch}${monthBranch}月`,
    `火${fire}`,
    `水${water}`,
    wetCount ? `湿土${wetCount}处` : '',
    dryCount ? `燥土${dryCount}处` : '',
  ].filter(Boolean);

  const priority = Math.abs(temp) >= 1.2 || Math.abs(damp) >= 1.2 ? '调候优先' : '扶抑为主';
  const narration = buildNarration({ kind, monthBranch, dayElement, need, temp, damp, fire, water });

  return {
    kind,
    label: KIND_NAME[kind] || kind,
    temp,
    damp,
    cold,
    hot,
    wet: wetSide,
    dry: drySide,
    need: need.element ? { element: need.element, stem: need.stem, why: need.why } : null,
    avoidElement: need.avoid,
    dayElement,
    priority,
    evidence,
    narration,
  };
}

function buildNarration({ kind, monthBranch, dayElement, need, fire, water }) {
  const feel = (DAY_FEEL[kind] || DAY_FEEL.平和)[dayElement] || '';
  const season = SEASON_NAME[monthBranch] || '';
  const head = `${season ? season : ''}${monthBranch}月出生，全局火${fire}、水${water}，这一盘的气候是「${KIND_NAME[kind] || kind}」`;
  if (!need.element) {
    return `${head}。${feel}。调候不是这一盘的主要矛盾，取用仍以扶抑为主，寒暖只作微调。`;
  }
  return `${head}。${feel}。所以这一局要的不是更多的${kind.includes('寒') ? '水' : '火'}，而是${need.stem}${need.element}——${need.why}。`;
}

/** 调候与扶抑的仲裁说明：冲突时把话说明白，不静默取一个 */
export function arbitrate(climate, favors = [], avoids = []) {
  if (!climate || !climate.need) return { clash: false, text: '气候平和，按扶抑取用即可。' };
  const needEl = climate.need.element;
  const inFavor = favors.includes(needEl);
  const inAvoid = avoids.includes(needEl);
  const same = inFavor && !inAvoid;
  if (same) return { clash: false, text: `调候要${climate.need.stem}${needEl}，扶抑也以${needEl}为喜——两套取法同向，不必取舍。` };
  return {
    clash: true,
    text: `调候要${climate.need.stem}${needEl}，扶抑却把${needEl}列为${inAvoid ? '忌' : '闲'}；两者不一致，本盘按调候优先取${needEl}，扶抑次之——因为寒暖失衡时，再补强弱也难受。`,
  };
}

/** 供解释层直接使用的一段话（面板与文本共用） */
export function climateText(climate) {
  if (!climate) return '';
  const ev = (climate.evidence || []).join('、');
  const arb = climate.need
    ? `调候取${climate.need.stem}${climate.need.element}（${climate.need.why}），忌${climate.avoidElement}。`
    : '气候平和，调候不作主取。';
  return `${climate.label}（${ev}）。${climate.narration}${arb}${climate.priority === '调候优先' ? ' 本盘调候优先于扶抑。' : ''}`;
}
