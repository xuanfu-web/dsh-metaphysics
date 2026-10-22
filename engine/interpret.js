// 解析与详解模块
// 输入：任一体系的排盘结果（compute 的返回值）
// 输出：结构化解析对象 —— { moduleType, system, title, lead, dimensions[], sections[], disclaimer }
//   moduleType：natal（命盘） / divination（卦象） / card（牌阵）
//   dimensions：五个固定维度，每项 { key, label, text, advice }
//   sections：体系专属的附加解读（卦辞爻辞、塔罗整体叙事等）
// 文案口径：第二人称、温和、只给倾向与建议，不作绝对判断。

import {
  HEX64, HEX_BY_CORE, TRIGRAM, YAO_POSITION, MOVING_NATURE,
  ZIWEI_STARS, WUXING_INDUSTRY, WUXING_ORGAN, TENGOD_STYLE,
  LIUREN_JIANG, TAROT_ELEMENT_FOCUS, DISCLAIMER,
} from './interpret-data.js';

// ── 固定五维度 ────────────────────────────────────────────
export const DIMENSIONS = [
  { key: 'overall', label: '整体运势' },
  { key: 'work', label: '工作与职业选择' },
  { key: 'career', label: '事业发展' },
  { key: 'love', label: '爱情与感情' },
  { key: 'health', label: '健康状况' },
];

export const MODULE_TYPE = {
  bazi: 'natal', ziwei: 'natal',
  liuyao: 'divination', meihua: 'divination', daliuren: 'divination',
  tarot: 'card',
};

export const SYSTEM_LABEL = {
  bazi: '八字', ziwei: '紫微斗数', liuyao: '六爻',
  meihua: '梅花易数', daliuren: '大六壬', tarot: '塔罗',
};

// 大运/流年档位 → 走势描述（非绝对判断）
const TIER_TEXT = {
  大吉: '外部环境对你比较配合，属于可以主动争取的阶段',
  吉: '整体偏顺，适合稳步推进手上的事',
  平: '起伏不大，更适合打基础、补短板',
  忌: '摩擦与消耗偏多，宜守成、减少冒进',
  大忌: '压力相对集中，宜降低预期、先保住基本盘',
};

const TIER_ADVICE = {
  大吉: '想做的事可以排进日程，别只停在想法上',
  吉: '按已有节奏走，把一件事做完整比开新头更划算',
  平: '把精力投向积累：技能、资质、人脉都算数',
  忌: '少做大的调整，先把手上的事收尾',
  大忌: '给自己留出缓冲，重要决定不妨往后放一放',
};

// ── 小工具 ────────────────────────────────────────────────
const isObj = (v) => v && typeof v === 'object';
const pick = (o, k, d = '') => (isObj(o) && o[k] != null ? o[k] : d);
const join = (arr, sep = '、') => (Array.isArray(arr) ? arr.filter(Boolean).join(sep) : String(arr || ''));

/** 查询卦意：全名 → 核心卦名 → 上下卦取象兜底 */
export function hexInfo(name, upper, lower) {
  if (HEX64[name]) return { full: name, ...HEX64[name] };
  const core = typeof name === 'string' && name.length > 2 ? name.slice(2) : name;
  if (HEX_BY_CORE[core]) {
    const full = HEX_BY_CORE[core];
    return { full, ...HEX64[full] };
  }
  const u = TRIGRAM[upper] || {};
  const l = TRIGRAM[lower] || {};
  return {
    full: name || '本卦',
    meaning: `${u.nature || upper || ''}在${l.nature || lower || ''}上，${u.trait || ''}遇${l.trait || ''}`.trim(),
    scene: '按上下卦的取象体会这一卦的大意',
  };
}

/** 从格局名反推对应的十神（用于匹配行事风格） */
function godFromPattern(name) {
  const s = String(name || '');
  if (/七杀/.test(s)) return '七杀';
  if (/正官/.test(s)) return '正官';
  if (/正财/.test(s)) return '正财';
  if (/偏财|财格/.test(s)) return '偏财';
  if (/伤官/.test(s)) return '伤官';
  if (/食神|食伤/.test(s)) return '食神';
  if (/正印/.test(s)) return '正印';
  if (/偏印|枭/.test(s)) return '偏印';
  if (/劫财/.test(s)) return '劫财';
  if (/比肩|比劫/.test(s)) return '比肩';
  if (/官/.test(s)) return '正官';
  if (/财/.test(s)) return '偏财';
  if (/印/.test(s)) return '正印';
  return '';
}

/** 按爻位取爻辞大意 */
function yaoGist(pos, moving) {
  const y = YAO_POSITION.find((x) => x.pos === pos) || YAO_POSITION[0];
  return `${y.name}（${y.gist}）：${y.tone}${moving ? '；此处发动，' + (moving.yinYang === '阳' ? MOVING_NATURE.yang : MOVING_NATURE.yin) : ''}`;
}

// ══════════════════════════════════════════════════════════
// 八字
// ══════════════════════════════════════════════════════════
function baziInterpret(r) {
  const dm = isObj(r.dayMaster) ? r.dayMaster : {};
  const st = isObj(r.strength) ? r.strength : {};
  const frame = isObj(r.frame) ? r.frame : {};
  const ys = isObj(frame.yongshen) ? frame.yongshen : {};
  const wx = isObj(r.wuxing) ? r.wuxing : {};
  const level = pick(st, 'level', '中和');
  const favor = Array.isArray(ys.favor) ? ys.favor : [];
  const avoid = Array.isArray(ys.avoid) ? ys.avoid : [];
  const primary = pick(frame, 'primaryName', '未取定');
  const gender = pick(r.input, 'gender', '');
  const isMale = gender === 'male';

  // 当前大运与流年
  const age = Number(pick(r.liunian?.[0], 'age', NaN));
  const list = Array.isArray(r.dayun?.list) ? r.dayun.list : [];
  let cur = null;
  for (const d of list) {
    if (Number.isFinite(age) && Number(d.startAge) <= age) cur = d;
  }
  if (!cur && list.length) cur = list[0];
  const curLuck = isObj(cur?.luck) ? cur.luck : {};
  const curTier = pick(curLuck, 'tier', '平');
  const ln = isObj(r.liunian?.[0]) ? r.liunian[0] : {};
  const lnLuck = isObj(ln.luck) ? ln.luck : {};
  const lnTier = pick(lnLuck, 'tier', '平');

  // 十神强弱排序
  const groups = isObj(frame.godStats?.groups) ? frame.godStats.groups : {};
  const top = Object.entries(groups).sort((a, b) => b[1] - a[1]);
  const topName = top[0]?.[0] || '';
  const secondName = top[1]?.[0] || '';

  // 五行偏枯
  const wxEntries = Object.entries(wx).sort((a, b) => b[1] - a[1]);
  const strongest = wxEntries[0]?.[0] || '';
  const weakest = wxEntries[wxEntries.length - 1]?.[0] || '';
  const missing = Object.keys(wx).filter((k) => Number(wx[k]) === 0);

  // 未来三步大运
  const idx = cur ? list.indexOf(cur) : -1;
  const ahead = idx >= 0 ? list.slice(idx + 1, idx + 4) : list.slice(0, 3);

  const dimensions = [
    {
      key: 'overall', label: '整体运势',
      text: `你的日主是${dm.stem}（五行属${dm.element}），命局身${level}（${pick(st, 'score', '')} 分）。` +
        `用神取向偏${join(favor)}、忌${join(avoid)}，可以理解为：往${join(favor)}的方向走，你会更省力。${pick(ys, 'detail', '').split('。')[0]}。` +
        `目前走在${pick(cur, 'ganzhi', '当前')}大运（${curTier}），${pick(ln, 'year', '今年')}年流年${pick(ln, 'ganzhi', '')}同样是${lnTier}的档位。`,
      advice: `${TIER_TEXT[curTier] || TIER_TEXT.平}。${TIER_ADVICE[lnTier] || TIER_ADVICE.平}；把大方向定在${join(favor)}相关的领域，会比硬扛${join(avoid)}顺畅一些。`,
    },
    {
      key: 'work', label: '工作与职业选择',
      text: `按喜用神看，${join(favor)}这几类方向对你更有利，可参考的行业包括：${favor.slice(0, 2).map((e) => WUXING_INDUSTRY[e] || '').filter(Boolean).join('；') || '暂未取定，可先按兴趣与能力试'}。` +
        `命局主格为${primary}，这类结构的人通常${TENGOD_STYLE[godFromPattern(primary)] || '有自己稳定的节奏'}。` +
        `十神中${topName}最重（${top[0]?.[1] ?? ''}），${secondName}次之，说明你在${topName}所代表的事项上投入的精力最多。`,
      advice: `选岗位时可以偏向「${join(favor)}属性 + ${topName}对应的事务」；如果现在的工作明显偏${join(avoid)}且长期让你疲惫，可以参考上面方向做小幅试探，不必立刻大改。`,
    },
    {
      key: 'career', label: '事业发展',
      text: `${primary}的格局，配合十神里${topName}偏旺的结构，事业上更适合${topName === '财' ? '靠业绩与资源积累说话' : topName === '官杀' ? '在有规则的组织里按层级上升' : topName === '印' ? '凭资质、专业与口碑取胜' : topName === '食伤' ? '靠作品、技术与表达打开局面' : '与人并肩、共同承担的方式'}。` +
        `接下来几步大运依次为：${ahead.map((d) => `${d.ganzhi}（${d.luck?.tier || '平'}）`).join(' → ') || '暂未排出'}，` +
        `整体节奏是${ahead.length && ahead.filter((d) => ['吉', '大吉'].includes(d.luck?.tier)).length >= 2 ? '先抑后扬、后段更顺' : '需要一步步积累，中间偶有起伏'}。`,
      advice: `把${ahead[0]?.ganzhi || '下一步'}这一步当作铺垫期，重点补${topName === '食伤' ? '作品与专业深度' : topName === '官杀' ? '资历与组织内的信任' : '可迁移的能力与资质'}；遇到${join(avoid)}过重的年份，优先保住已有成果。`,
    },
    {
      key: 'love', label: '爱情与感情',
      text: `${isMale ? '男命以财星看妻缘' : '女命以官杀看夫缘'}，你命局中${isMale ? '财' : '官杀'}的力量为${groups[isMale ? '财' : '官杀'] ?? '—'}，` +
        `${Number(groups[isMale ? '财' : '官杀'] || 0) >= 2 ? '缘分出现的机会不算少' : '需要自己主动创造认识人的场景'}。` +
        `日支（配偶宫）为${pick(r.pillars?.day, 'branch', '')}，坐${pick(r.pillars?.day, 'zizuo', '')}，` +
        `这里的信号是：${Number(groups[isMale ? '财' : '官杀'] || 0) >= 2 ? '关系里你容易被主动靠近，但要留意筛选' : '感情推进偏慢，属于需要经营的类型'}。`,
      advice: `不必急着要结果，先看清自己在关系里最在意什么。${Number(groups[isMale ? '财' : '官杀'] || 0) >= 2 ? '选项多时，明确标准反而更省心' : '可以把社交圈稍微扩大一点，但别为了脱单降低底线'}；沟通上多说具体需求，少让对方猜。`,
    },
    {
      key: 'health', label: '健康状况',
      text: `五行分布上，${strongest}最旺、${weakest}最弱${missing.length ? `，其中${join(missing)}在命局中没有明现` : ''}。` +
        `按五行与身体的对应，${strongest}偏旺时${WUXING_ORGAN[strongest]?.part || ''}负担相对重（${WUXING_ORGAN[strongest]?.note || ''}）；` +
        `${weakest}偏弱则${WUXING_ORGAN[weakest]?.part || ''}偏弱一些，是更值得留意的部分。这只是传统命理的取象提示，不是诊断。`,
      advice: `建议把作息规律放在第一位——尤其是睡眠时长尽量稳定；${WUXING_ORGAN[weakest]?.note ? weakest + '对应的' + WUXING_ORGAN[weakest].part + '可以按体检项目关注' : '按常规体检关注'}。任何不适请去看医生，别用命理结论替代检查。`,
    },
  ];

  const sections = [
    {
      key: 'yongshen', label: '用神与忌神',
      text: `喜用：${join(favor)}（对应十神：${join(ys.favorTenGods || ys.favorRoles || [])}）；忌：${join(avoid)}（对应十神：${join(ys.avoidTenGods || ys.avoidRoles || [])}）。` +
        `${pick(ys, 'detail', '')}${ys.tiaohou ? `调候上${ys.tiaohou.note}。` : ''}`,
    },
    {
      key: 'geju', label: '格局依据',
      text: (Array.isArray(frame.geju) ? frame.geju : []).map((g) => `${g.name}（${g.kind}）：${g.evidence}`).join('；') || '未取到格局',
    },
  ];

  return {
    lead: `下面按五个维度拆开说。所有内容来自你这张命盘的结构，讲的是倾向与建议，不是预言——方向供你参考，怎么走在你自己。`,
    dimensions, sections,
  };
}

// ══════════════════════════════════════════════════════════
// 紫微斗数
// ══════════════════════════════════════════════════════════
const ZW_MAIN = Object.keys(ZIWEI_STARS);

function zwPalace(r, name) {
  return (r.palaces || []).find((p) => p.palace === name) || null;
}
function zwMainStar(p) {
  if (!p) return null;
  const s = (p.stars || []).find((x) => ZW_MAIN.includes(x.name));
  return s ? s.name : null;
}
function zwSha(p) {
  return (p?.stars || []).filter((s) => s.type === '煞星').map((s) => s.name);
}

function ziweiInterpret(r) {
  const soul = zwPalace(r, '命宫') || (r.palaces || [])[0];
  const career = zwPalace(r, '官禄');
  const wealth = zwPalace(r, '财帛');
  const spouse = zwPalace(r, '夫妻');
  const health = zwPalace(r, '疾厄');
  const move = zwPalace(r, '迁移');

  // 命宫主星：命宫无主星时借对宫（迁移），再退到命主星；同时记下来源，避免与「命无正曜」格局打架
  const soulOwn = zwMainStar(soul);
  const moveStar = zwMainStar(move);
  const lifeM = ZW_MAIN.includes(pick(r, 'lifeMaster')) ? r.lifeMaster : null;
  let soulStar = soulOwn || moveStar || lifeM || '紫微';
  const soulFrom = soulOwn
    ? `你的命宫主星是${soulStar}`
    : moveStar
      ? `你的命宫无正曜，按紫微的规则借对宫（迁移）来看，主星是${soulStar}`
      : `你的命宫与对宫都没有正曜，这里按命主星${soulStar}来看`;
  const S = ZIWEI_STARS[soulStar] || ZIWEI_STARS.紫微;

  const careerStar = zwMainStar(career);
  const wealthStar = zwMainStar(wealth);
  const spouseStar = zwMainStar(spouse);
  const healthStar = zwMainStar(health);

  const age = Number(pick(r.liunian?.[0], 'age', NaN));
  let daxianPalace = null;
  for (const p of r.palaces || []) {
    const d = p.daxian || {};
    if (Number.isFinite(age) && Number(d.start) <= age && age <= Number(d.end)) daxianPalace = p;
  }
  const patterns = Array.isArray(r.patterns) ? r.patterns : [];
  const patText = patterns.length
    ? patterns.slice(0, 3).map((p) => `${p.name}（${p.tone === 'good' ? '偏吉' : p.tone === 'bad' ? '需留意' : '中性'}：${p.evidence}）`).join('；')
    : '本盘未触发常见格局条目';
  const lnMutagen = Array.isArray(r.liunian?.[0]?.mutagen) ? r.liunian[0].mutagen.slice(0, 2).join('、') : '';

  const dimensions = [
    {
      key: 'overall', label: '整体运势',
      text: `${soulFrom}，性格底色上${S.trait}。本盘${patText}。` +
        `当前大限走在${daxianPalace ? `${daxianPalace.palace}（${daxianPalace.daxian.start}–${daxianPalace.daxian.end}岁）` : '当前阶段'}，` +
        `${lnMutagen ? `流年四化为${lnMutagen}，本年的变化感主要落在这几颗星上` : '流年四化信号不明显'}。`,
      advice: `这一阶段的主题更接近「${daxianPalace ? daxianPalace.palace : '命宫'}」代表的事——把它当作今年的主线，其余事围绕它安排；${S.trait}是你的优势，也是需要留意别用过头的地方。`,
    },
    {
      key: 'work', label: '工作与职业选择',
      text: `命宫${soulStar}给出的是底层偏好：${S.work}。官禄宫${careerStar ? `主星为${careerStar}，${ZIWEI_STARS[careerStar]?.work || '有其自身的做事方式'}` : '无正曜，工作方式更多受环境与他人影响，适合配合型岗位'}。` +
        `两者合起来看，你更适合${careerStar && careerStar !== soulStar ? `用${soulStar}的方式去做${careerStar}擅长的事` : '在稳定的框架里发挥自己的特点'}。`,
      advice: `挑工作时可以优先看岗位内容是否匹配上面这条；如果暂时不能换，试着在现有岗位里争取靠近这部分的事务，会比硬熬更容易做出成绩。`,
    },
    {
      key: 'career', label: '事业发展',
      text: `财帛宫${wealthStar ? `见${wealthStar}，${ZIWEI_STARS[wealthStar]?.trait || ''}` : '无正曜'}，官禄宫${careerStar || '无正曜'}，` +
        `${wealthStar && careerStar ? '财与事业两宫都有主星坐守，说明这两块是可以主动经营的部分' : '有一宫无主星，说明该块更容易受外部条件牵动，宜借势而非强求'}。` +
        `大限推进上，${daxianPalace ? `目前落在${daxianPalace.palace}` : '当前阶段'}，下一步会转入相邻的宫位，重心也会跟着挪。`,
      advice: `事业上建议做两件事：一是把可积累的东西（技能、资质、作品）做厚；二是${careerStar ? `发挥${careerStar}的优势——${ZIWEI_STARS[careerStar]?.trait || ''}` : '找一个能带你的前辈或平台'}。遇到四化化忌的年份，先守成再谈扩张。`,
    },
    {
      key: 'love', label: '爱情与感情',
      text: `夫妻宫${spouseStar ? `主星为${spouseStar}，感情上的倾向是${ZIWEI_STARS[spouseStar]?.love || '有自己相处的节奏'}` : '无正曜，关系状态更多由对方与互动方式决定'}。` +
        `${zwSha(spouse).length ? `夫妻宫同时见${join(zwSha(spouse))}，相处中容易出现摩擦或第三者干扰的暗示，但煞星不等于定局，更多是提醒你留意沟通方式` : '夫妻宫未见明显煞星，关系的基调相对平顺'}。`,
      advice: `感情里${spouseStar ? `参考${spouseStar}的特点：${ZIWEI_STARS[spouseStar]?.love || ''}` : '可以更主动地表达自己的需求'}。有分歧时先说清事实与感受，别急着下结论；关系的好坏取决于两个人怎么做，不取决于这张盘。`,
    },
    {
      key: 'health', label: '健康状况',
      text: `疾厄宫${healthStar ? `见${healthStar}，传统取象上${ZIWEI_STARS[healthStar]?.health || '需要留意自身的薄弱环节'}` : '无正曜，身体状态更多受生活作息直接影响'}。` +
        `${zwSha(health).length ? `同时见${join(zwSha(health))}，提示这一块值得比其他部位多一分留意。` : ''}这些都是象征性的提示，不构成任何医学判断。`,
      advice: `把${healthStar ? ZIWEI_STARS[healthStar]?.health?.replace('留意', '').replace('需要留意', '') || '常规' : '常规'}当作体检时重点关注的参考；真正管用的还是规律作息、适度运动与定期检查。身体不舒服请直接就医。`,
    },
  ];

  const sections = [
    { key: 'palaces', label: '关键宫位', text: `命宫${soulStar}　官禄${careerStar || '无正曜'}　财帛${wealthStar || '无正曜'}　夫妻${spouseStar || '无正曜'}　疾厄${healthStar || '无正曜'}` },
    { key: 'patterns', label: '格局', text: patText },
  ];

  return {
    lead: `紫微斗数看的是你与环境的互动方式。下面按五个维度拆开，讲的是性格与处境的倾向，具体怎么选仍然在你。`,
    dimensions, sections,
  };
}

// ══════════════════════════════════════════════════════════
// 卦象通用：卦辞 / 爻辞 / 动爻 / 生活落点
// ══════════════════════════════════════════════════════════
function hexSections({ benName, benUpper, benLower, bianName, bianUpper, bianLower, movingLine, moving }) {
  const ben = hexInfo(benName, benUpper, benLower);
  const sections = [
    {
      key: 'guaCi', label: '卦名与卦辞大意',
      text: `本卦为「${ben.full}」，卦辞大意是：${ben.meaning}。这一卦讲的是事情当下的整体走势——你可以先记住这句，后面每个维度都会回到它。`,
    },
    {
      key: 'yaoCi', label: '爻辞与动爻',
      text: moving ? yaoGist(moving.position, moving) : '本卦无动爻，事情处于相对静止的状态，短期内变化的动力不强，宜按现状维持。',
    },
  ];
  if (bianName) {
    const bian = hexInfo(bianName, bianUpper, bianLower);
    sections.push({
      key: 'bianGua', label: '变卦与走向',
      text: `动爻变化之后得到「${bian.full}」，${bian.meaning}。变卦往往指向事情后来的样子：从「${ben.full}」走到「${bian.full}」，可以理解为局面会从${ben.scene}转为${bian.scene}。`,
    });
  }
  sections.push({
    key: 'scene', label: '落到生活里',
    text: `把这一卦放进日常：${ben.scene}。${bianName ? `而后续的方向是${hexInfo(bianName, bianUpper, bianLower).scene}。` : ''}你可以对照着看看，眼下哪件事最像这个描述。`,
  });
  return { sections, ben, bian: bianName ? hexInfo(bianName, bianUpper, bianLower) : null };
}

// ══════════════════════════════════════════════════════════
// 六爻
// ══════════════════════════════════════════════════════════
const LIUQIN_USE = {
  妻财: '钱财、收入、订单，也指男命的妻缘',
  官鬼: '工作、职位、上司、考核，也指压力与疾病',
  父母: '文书、合同、学历、长辈、房子',
  子孙: '下属、客户、创意、消解压力的出口',
  兄弟: '同事、同行、竞争者，多与破财相关',
};

function liuyaoInterpret(r) {
  const ben = isObj(r.ben) ? r.ben : {};
  const bian = isObj(r.bian) ? r.bian : {};
  const lines = Array.isArray(ben.lines) ? ben.lines : [];
  const moving = lines.find((l) => l.moving) || null;
  const { sections, ben: benInfo, bian: bianInfo } = hexSections({
    benName: ben.name, benUpper: ben.upper, benLower: ben.lower,
    bianName: bian.name, bianUpper: bian.upper, bianLower: bian.lower,
    moving,
  });

  const shiLine = lines.find((l) => l.position === ben.shi);
  const yingLine = lines.find((l) => l.position === ben.ying);
  const palaceEl = pick(ben, 'palaceElement', '');
  const movingLiuqin = moving?.liuqin || '';
  const movingLiushen = moving?.liushen || '';
  const dayGZ = pick(r.dayGanZhi, 'name', '');

  sections.push({
    key: 'liuqin', label: '六亲取用',
    text: `这一卦里，${movingLiuqin ? `动爻落在${movingLiuqin}（${LIUQIN_USE[movingLiuqin] || ''}）` : '没有发动的六亲'}。` +
      `如果你心里有具体问题，可以对号入座：${Object.entries(LIUQIN_USE).map(([k, v]) => `${k}主${v.split('，')[0]}`).join('；')}。`,
  });

  const dimensions = [
    {
      key: 'overall', label: '整体运势',
      text: `这一卦是「${benInfo.full}」，${benInfo.meaning}。${movingLiushen ? `动爻带${movingLiushen}，事情带一点${movingLiushen === '青龙' ? '喜庆顺遂' : movingLiushen === '白虎' ? '压力与阻碍' : movingLiushen === '朱雀' ? '口舌与是非' : movingLiushen === '玄武' ? '不明朗、需要核实' : '反复与牵扯'}的色彩。` : ''}` +
        `日辰为${dayGZ}，卦宫属${palaceEl}，整体更像是${benInfo.scene}的阶段。`,
      advice: `${benInfo.scene}——顺着这句做就行。${moving ? '既然有动爻，说明事情还在变化，先观察几天再定也不迟。' : '暂无动爻，说明短期内不会有大的转折，维持现状反而是稳妥选择。'}`,
    },
    {
      key: 'work', label: '工作与职业选择',
      text: `问工作看官鬼与父母：本卦中${(lines.filter((l) => l.liuqin === '官鬼').length ? `官鬼出现${lines.filter((l) => l.liuqin === '官鬼').length}处，${lines.find((l) => l.liuqin === '官鬼').moving ? '且有发动，岗位或考核层面会有动作' : '但未发动，职位层面暂时平稳'}` : '未见官鬼，工作这件事在卦中不是主要矛盾')}；` +
        `${(lines.filter((l) => l.liuqin === '父母').length ? '父母（文书、合同、资质）有出现，涉及手续与材料的事要提前准备' : '父母未现，手续类事务暂无明显阻碍')}。`,
      advice: `如果正在看机会，建议先把合同、岗位职责这些落到纸面上的东西问清楚；${moving?.liuqin === '官鬼' ? '动爻在官鬼，工作层面近期有变动的迹象，可以主动谈，但别先辞再找。' : '工作层面暂无强动象，稳住手上的事更划算。'}`,
    },
    {
      key: 'career', label: '事业发展',
      text: `世爻（代表你）在${ben.shi}爻${shiLine ? `，六亲为${shiLine.liuqin}，${shiLine.moving ? '且发动' : '安静未动'}` : ''}；应爻（代表对方与环境）在${ben.ying}爻${yingLine ? `，六亲为${yingLine.liuqin}` : ''}。` +
        `世应之间${shiLine && yingLine ? (shiLine.liuqin === yingLine.liuqin ? '同气相求，双方立场接近' : '立场有别，需要多沟通') : '信号不明'}，` +
        `${bianInfo ? `变卦「${bianInfo.full}」提示后续走向是${bianInfo.scene}` : '暂无变卦'}。`,
      advice: `事业上的建议是：${shiLine?.moving ? '你自己这边有主动变化的意思，那就把想法说出来、把动作做出来' : '先不动，把手上的事做扎实'}；${bianInfo ? `按${bianInfo.scene}的方向去准备，会比被动等结果好。` : ''}`,
    },
    {
      key: 'love', label: '爱情与感情',
      text: `问感情，男看妻财、女看官鬼。本卦中${(lines.filter((l) => l.liuqin === '妻财').length ? `妻财${lines.filter((l) => l.liuqin === '妻财').length}现${lines.find((l) => l.liuqin === '妻财').moving ? '且发动，感情层面有动静' : '但安静，关系暂时平缓'}` : '妻财未现，感情不是当前卦象的重点')}；` +
        `${(lines.filter((l) => l.liuqin === '官鬼').length ? '官鬼有现，对方或关系中的压力面是被看到的' : '官鬼未现')}。${benInfo.meaning}，放在关系里就是${benInfo.scene}。`,
      advice: `关系里${moving?.liuqin === '妻财' || moving?.liuqin === '官鬼' ? '近期有变化的可能，适合把话说开，别憋着' : '暂时平稳，可以按自己的节奏相处'}。卦象只给倾向，真正决定关系的是你们怎么沟通。`,
    },
    {
      key: 'health', label: '健康状况',
      text: `问健康，看官鬼（病）与子孙（医药、消散）。本卦中${(lines.filter((l) => l.liuqin === '官鬼').length ? `官鬼有现${lines.find((l) => l.liuqin === '官鬼').moving ? '且发动，提示身体上可能有需要留意的地方' : '，但安静，暂无明显变化'}` : '官鬼未现，卦象未指向明显的身体问题')}；` +
        `${(lines.filter((l) => l.liuqin === '子孙').length ? '子孙有现，恢复与调养的出口是有的' : '子孙未现，休息与调养需要自己主动安排')}。${movingLiushen === '白虎' ? '动爻带白虎，尤其别忽视突发的身体信号。' : ''}`,
      advice: `这一卦在健康上的提醒是${(lines.filter((l) => l.liuqin === '官鬼').length ? '别硬扛，累了就休息，有机会就做一次检查' : '维持现有作息即可，别自己吓自己')}。任何不适请就医，卦象不能替代诊断。`,
    },
  ];

  return {
    lead: `这一卦问的是眼下的具体事。下面先讲卦理，再分五个维度落到生活里——卦象给的是倾向，不是定论。`,
    dimensions, sections,
  };
}

// ══════════════════════════════════════════════════════════
// 梅花易数
// ══════════════════════════════════════════════════════════
function meihuaInterpret(r) {
  const ben = isObj(r.ben) ? r.ben : {};
  const hu = isObj(r.hu) ? r.hu : {};
  const bian = isObj(r.bian) ? r.bian : {};
  const cuo = isObj(r.cuo) ? r.cuo : {};
  const zong = isObj(r.zong) ? r.zong : {};
  const bu = isObj(r.bodyUse) ? r.bodyUse : {};
  const lines = Array.isArray(r.lines) ? r.lines : [];
  const movingLine = lines.find((l) => l.moving) || (Number(r.moving) ? lines[Number(r.moving) - 1] : null);
  const { sections, ben: benInfo, bian: bianInfo } = hexSections({
    benName: ben.name, benUpper: ben.upper, benLower: ben.lower,
    bianName: bian.name, bianUpper: bian.upper, bianLower: bian.lower,
    moving: movingLine,
  });

  const bodyEl = pick(bu.body, 'element', '');
  const useEl = pick(bu.use, 'element', '');
  const relation = pick(bu, 'relation', '');
  const mhLevel = pick(bu, 'level', '');
  const isJi = /吉/.test(mhLevel);
  const isXiong = /凶/.test(mhLevel);

  sections.splice(1, 0, {
    key: 'tiYong', label: '体用关系',
    text: `体卦为${pick(bu.body, 'trigram', '')}（${bodyEl}），代表你自己；用卦为${pick(bu.use, 'trigram', '')}（${useEl}），代表对方与环境。${relation}（${mhLevel}）。` +
      `梅花易数看体用生克：${isJi ? '用卦对体卦有利，事情推进会相对顺' : isXiong ? '用卦克体或消耗体卦，推进中会感到阻力，宜缓不宜急' : '体用关系平和，事情按常态发展'}。`,
  });
  sections.splice(3, 0, {
    key: 'huGua', label: '互卦与过程',
    text: `互卦为「${pick(hu, 'name', '')}」，${hexInfo(hu.name, hu.upper, hu.lower).meaning}——互卦看事情中间的过程，这一段大致是这个味道。` +
      `错卦「${pick(cuo, 'name', '')}」是换个立场看同一件事，综卦「${pick(zong, 'name', '')}」是站在对方位置看，可以参考着换个角度想。`,
  });

  const dimensions = [
    {
      key: 'overall', label: '整体运势',
      text: `本卦「${benInfo.full}」，${benInfo.meaning}。体${bodyEl}用${useEl}，${relation}，判定为${mhLevel}。` +
        `${isJi ? '整体的倾向是顺的：外部环境对你不算苛刻，可以正常推进' : isXiong ? '整体有阻力：不是不能做，而是要多留余量与耐心' : '整体平稳，不会有大的起落'}。`,
      advice: `${benInfo.scene}。${isXiong ? '建议把节奏放慢，先解决卡点再谈推进' : isJi ? '可以趁势把想做的事往前推一步' : '按原计划走，不必刻意改变'}。`,
    },
    {
      key: 'work', label: '工作与职业选择',
      text: `梅花里工作看用卦与体卦的生克：现在用卦${useEl}${isJi ? '对体卦有利，说明当下的工作环境或岗位与你的匹配度还不错' : isXiong ? '与体卦相耗，说明眼下这份工作消耗感偏重' : '与体卦关系平和，属于不好不坏'}` +
        `。本卦${benInfo.meaning}，对应到工作里就是${benInfo.scene}。`,
      advice: `${isXiong ? '如果长期觉得被消耗，可以先在内部争取调整职责，再考虑外部机会' : isJi ? '适合主动争取更多责任或更好的岗位' : '把手上的事做好，等一个明确的信号再动'}。选工作时优先考虑让你舒服的环境，长期看比短期收益重要。`,
    },
    {
      key: 'career', label: '事业发展',
      text: `变卦「${bianInfo ? bianInfo.full : ''}」代表事情的结局方向，${bianInfo ? bianInfo.meaning : ''}。互卦「${pick(hu, 'name', '')}」代表过程，${hexInfo(hu.name, hu.upper, hu.lower).meaning}。` +
        `合起来看：过程${hexInfo(hu.name, hu.upper, hu.lower).scene}，结果${bianInfo ? bianInfo.scene : '暂不明朗'}。`,
      advice: `按这个结构，建议${isJi ? '现在就把关键的一步迈出去' : isXiong ? '先补短板、攒条件，等下一轮再动' : '小步推进，边做边看'}。动爻在${pick(r, 'movingName', '某爻')}，变化点就在那里，值得重点关注。`,
    },
    {
      key: 'love', label: '爱情与感情',
      text: `感情上看体用是否相合：体${bodyEl}与用${useEl}之间是${relation}，${isJi ? '这种组合在关系里意味着双方相处比较顺，彼此能给到支撑' : isXiong ? '这种组合提示相处中有一方付出更多，需要留意平衡' : '关系处在常态，没有特别的张力'}` +
        `。本卦${benInfo.meaning}，放到两人之间就是${benInfo.scene}。`,
      advice: `${isXiong ? '别把不满攒着，找个合适的时机说清楚；也别指望对方猜' : isJi ? '可以主动推进关系，做一些共同的事' : '维持现在的相处节奏就好'}。卦象看的是当下的气氛，关系的走向取决于你们怎么经营。`,
    },
    {
      key: 'health', label: '健康状况',
      text: `梅花里健康看体卦的强弱：体卦${pick(bu.body, 'trigram', '')}属${bodyEl}，${isXiong ? '被用卦所耗，传统取象上提示近期精力消耗偏大' : isJi ? '得到生扶，精力状态相对好' : '平顺，无明显偏枯'}。` +
        `${WUXING_ORGAN[bodyEl] ? `${bodyEl}对应${WUXING_ORGAN[bodyEl].part}，${WUXING_ORGAN[bodyEl].note}。` : ''}这是取象提示，不是诊断。`,
      advice: `${isXiong ? '近期别硬撑，睡眠与饮食先稳住，有条件做一次常规体检' : '保持现在的作息即可，顺势多动一动更好'}。身体有明确的症状请直接看医生。`,
    },
  ];

  return {
    lead: `梅花易数重「体用」——你与这件事之间的关系。下面先讲卦理与体用，再分五个维度落到生活场景。`,
    dimensions, sections,
  };
}

// ══════════════════════════════════════════════════════════
// 大六壬
// ══════════════════════════════════════════════════════════
function daliurenInterpret(r) {
  const sc = isObj(r.sanChuan) ? r.sanChuan : {};
  const chu = isObj(sc.chu) ? sc.chu : {};
  const zhong = isObj(sc.zhong) ? sc.zhong : {};
  const mo = isObj(sc.mo) ? sc.mo : {};
  const gj = isObj(r.geJu) ? r.geJu : {};
  const ke = Array.isArray(r.siKe) ? r.siKe : [];
  const jiangOf = (x) => LIUREN_JIANG[x?.jiangFull] || LIUREN_JIANG[x?.jiang] || '';

  const sections = [
    {
      key: 'sanChuan', label: '三传与事体走向',
      text: `初传${pick(chu, 'zhi', '')}（${pick(chu, 'jiangFull', '')}·${pick(chu, 'liuQin', '')}${chu.xunKong ? '·旬空' : ''}）：${jiangOf(chu) || '发端的信号'}；` +
        `中传${pick(zhong, 'zhi', '')}（${pick(zhong, 'jiangFull', '')}·${pick(zhong, 'liuQin', '')}${zhong.xunKong ? '·旬空' : ''}）：${jiangOf(zhong) || '过程的信号'}；` +
        `末传${pick(mo, 'zhi', '')}（${pick(mo, 'jiangFull', '')}·${pick(mo, 'liuQin', '')}${mo.xunKong ? '·旬空' : ''}）：${jiangOf(mo) || '结局的信号'}。` +
        `三传讲的是一件事从发端、经过到落定的过程，可以按这个顺序对照你的处境。`,
    },
    {
      key: 'geju', label: '课体与四课',
      text: `本课为${pick(gj, 'name', '未定')}${gj.detail ? `（${gj.detail}）` : ''}。${ke.length ? `四课：${ke.map((k, i) => `${i + 1}课 ${k.top || ''}上${k.bottom || ''}下`).join('　')}` : ''}`,
    },
  ];

  const chuQin = pick(chu, 'liuQin', '');
  const moQin = pick(mo, 'liuQin', '');
  const hasKong = !!(chu.xunKong || zhong.xunKong || mo.xunKong);

  const dimensions = [
    {
      key: 'overall', label: '整体运势',
      text: `这一课${pick(gj, 'name', '')}${gj.detail ? `·${gj.detail}` : ''}，发端在${pick(chu, 'zhi', '')}（${jiangOf(chu) || ''}），落定在${pick(mo, 'zhi', '')}（${jiangOf(mo) || ''}）。` +
        `${hasKong ? '课中有旬空，提示事情里有「看着有、实则虚」的部分，涉及承诺与数字的要核实。' : '课中无旬空，事情相对实在。'}` +
        `整体倾向是：${/吉|生|合/.test(jiangOf(chu) + jiangOf(mo)) ? '开局与结局的象都不差，可以正常推进' : /虎|蛇|勾|空/.test(jiangOf(chu) + jiangOf(mo)) ? '过程中有牵绊与不明朗处，宜慢不宜快' : '平顺中带一点摩擦' }。`,
      advice: `${hasKong ? '先把信息核实清楚，别在含糊的基础上做决定' : '按你原本的计划推进即可'}。${/虎/.test(jiangOf(chu)) ? '开局带白虎，头几天别硬碰，先观察。' : ''}事情的局面是动态的，这一课看的是当下这一刻的气象。`,
    },
    {
      key: 'work', label: '工作与职业选择',
      text: `工作看官鬼与青龙、太常：本课${chuQin === '官鬼' ? '初传即见官鬼，事情一上来就与职位、考核或上级有关' : `初传为${chuQin || '未取'}，${jiangOf(chu) || ''}`}。` +
        `${/青龙/.test(JSON.stringify(sc)) ? '课中见青龙，工作层面有喜庆与进益的象' : '课中未见青龙，工作层面属常态推进'}；` +
        `${/朱雀/.test(JSON.stringify(sc)) ? '见朱雀，文书、沟通与口舌要留意，材料务必留底' : ''}`,
      advice: `涉及岗位与待遇的事，建议把口头承诺落成文字；${/朱雀/.test(JSON.stringify(sc)) ? '沟通时少说满话，多留余地。' : '正常沟通即可。'}选工作时优先考虑课象中显示出支撑力的方向。`,
    },
    {
      key: 'career', label: '事业发展',
      text: `末传${pick(mo, 'zhi', '')}（${moQin || ''}·${jiangOf(mo) || ''}）主结局，${moQin === '官鬼' ? '结局落在官鬼，事业这条线会有明确的结果或位置变化' : moQin === '妻财' ? '结局落在妻财，更多体现为收入与资源的落袋' : moQin === '子孙' ? '结局落在子孙，压力会消散，适合收尾与转向' : '结局的信号相对中性'}。` +
        `${mo.xunKong ? '末传旬空，结局有落空的可能，别把预期定得太满。' : '末传不空，结果相对实在。'}`,
      advice: `按三传的顺序安排节奏：初传阶段先摸清情况，中传阶段处理摩擦，末传阶段收果。${mo.xunKong ? '对结果保留一点弹性，Plan B 提前想好。' : '可以朝着末传给出的方向去准备。'}`,
    },
    {
      key: 'love', label: '爱情与感情',
      text: `感情看妻财与天后、六合：本课${/六合/.test(JSON.stringify(sc)) ? '见六合，有和合、契约之象，关系层面是往一起走的' : '未见六合，关系层面没有明显的和合信号'}；` +
        `${/天后/.test(JSON.stringify(sc)) ? '见天后，有被照顾、被回应的象' : ''}${/玄武/.test(JSON.stringify(sc)) ? '见玄武，提示信息不明或有隐瞒，重要的事要当面问清' : ''}` +
        `${/妻财/.test(JSON.stringify(sc)) ? '课中见妻财，感情这条线是被看到的' : ''}。`,
      advice: `${/玄武/.test(JSON.stringify(sc)) ? '关系里有看不清的地方，别猜，直接问。' : '按你感受到的相处状态来判断就好。'}卦象只反映当下的气氛，关系如何取决于两个人怎么做。`,
    },
    {
      key: 'health', label: '健康状况',
      text: `健康看白虎与子孙：本课${/白虎/.test(JSON.stringify(sc)) ? '见白虎，传统取象上提示身体有需要留意的地方，尤其突发的不适别忽视' : '未见白虎，卦象未指向明显的身体问题'}；` +
        `${/子孙/.test(JSON.stringify(sc)) ? '见子孙，医药与调养的出口是有的，恢复的象在' : '未见子孙，休息与调养需要自己主动安排'}。这些都是象征提示，不构成医学判断。`,
      advice: `${/白虎/.test(JSON.stringify(sc)) ? '近期别熬夜、别硬扛，有条件做一次检查' : '保持现有作息，适度运动即可'}。任何不适请就医，这一课不能替代诊断。`,
    },
  ];

  return {
    lead: `大六壬看的是一件事的来龙去脉。三传给出「发端—过程—结局」的顺序，下面按这个结构分五个维度说。`,
    dimensions, sections,
  };
}

// ══════════════════════════════════════════════════════════
// 塔罗
// ══════════════════════════════════════════════════════════
function tarotInterpret(r) {
  const cards = Array.isArray(r.cards) ? r.cards : [];
  const n = cards.length;
  const major = cards.filter((c) => c.arcana === '大阿卡纳');
  const upright = cards.filter((c) => c.upright);
  const reversed = cards.filter((c) => !c.upright);
  const court = cards.filter((c) => /国王|王后|骑士|侍从/.test(String(c.name)));

  // 元素分布
  const elCount = {};
  for (const c of cards) if (c.element) elCount[c.element] = (elCount[c.element] || 0) + 1;
  const elText = Object.entries(elCount).map(([k, v]) => `${k}×${v}`).join('、') || '分布不明';
  const lack = ['火', '水', '风', '土'].filter((e) => !elCount[e]);

  // 主轴：优先未来位/最后一张，其次第一张
  const axis = cards.find((c) => /未来|结果|建议/.test(String(c.position))) || cards[cards.length - 1] || null;

  // 整体叙事：把各张串成一条线，避免各说各话
  const narrative = cards.map((c, i) => {
    const turn = c.upright ? '顺' : '滞';
    return `${c.position}（${c.positionHint || ''}）${c.name}${c.orientation}：${c.core || (c.keywords || []).join('、')}，这一环是${turn}的`;
  }).join('；');

  const sections = [
    {
      key: 'narrative', label: '整盘连贯解读',
      text: `先把几张牌串成一条线来看：${narrative}。` +
        `${axis ? `整盘的主轴是「${axis.name}」（${axis.position}·${axis.orientation}）——${axis.core || ''}。其余几张可以理解为这条主线在不同阶段的样貌：${cards.filter((c) => c !== axis).map((c) => `${c.position}的${c.name}说明${c.core || (c.keywords || []).join('、')}`).join('，')}。` : ''}` +
        `所以这张牌阵讲的不是几件不相干的事，而是同一件事在不同时间位置上的样子。`,
    },
    {
      key: 'structure', label: '牌面结构',
      text: `${n} 张牌中有 ${major.length} 张大阿卡纳（占 ${Math.round((major.length / n) * 100)}%），${major.length >= Math.ceil(n / 2) ? '大牌过半，事情牵动的层面较深，与环境、阶段性的课题有关' : '大牌不到半数，重点更偏日常层面的具体人事'}。` +
        `元素分布：${elText}${lack.length ? `；缺${join(lack)}，这一块容易被忽略` : ''}。` +
        `正逆位 ${upright.length} 正 ${reversed.length} 逆，${reversed.length > upright.length ? '逆位偏多，说明阻滞主要来自内部状态而非外部条件' : '整体偏顺，逆位那张是全盘的关节'}。`,
    },
  ];

  const dimBase = (key) => {
    const hit = cards.find((c) => {
      const kw = (c.keywords || []).join('') + String(c.core || '');
      if (key === 'love') return /爱|情感|关系|圣杯|恋人|伴侣/.test(kw) || (c.domain === '情感与关系');
      if (key === 'work') return /工作|事业|职场|权杖|星币|金币/.test(kw) || (c.domain === '工作与事业');
      if (key === 'career') return /成就|成功|目标|进展|资源/.test(kw);
      if (key === 'health') return /健康|休息|疲惫|压力|疗愈/.test(kw);
      return true;
    });
    return hit;
  };

  const dimensions = [
    {
      key: 'overall', label: '整体运势',
      text: `整盘的主轴落在「${axis ? axis.name : '—'}」（${axis ? axis.orientation : ''}），${axis ? axis.core || (axis.keywords || []).join('、') : ''}。` +
        `${reversed.length ? `其中${join(reversed.map((c) => `${c.name}（${c.position}）`))}是逆位，逆位不等于凶，更像那股力量还没顺过来或用力过猛，它是这张牌阵里最值得你先看的部分。` : '全部为正位，说明牌面呈现的状态与你当下的处境是通的。'}` +
        `${lack.length ? `元素上缺${join(lack)}，${lack.map((e) => TAROT_ELEMENT_FOCUS[e]?.area).filter(Boolean).join('、')}这一块容易被忽略。` : ''}`,
      advice: `${reversed.length ? `先把${reversed[0].name}指出的卡点处理掉（${(reversed[0].keywords || []).join('、')}），暂时不要加码推进` : '按牌面呈现的节奏走'}；${lack.length ? `补一点${lack[0]}的力量：${TAROT_ELEMENT_FOCUS[lack[0]]?.advice || ''}` : '把注意力放在能立刻做的小事上，先动一件'}。牌是镜子，照的是你此刻的状态。`,
    },
    {
      key: 'work', label: '工作与职业选择',
      text: `${dimBase('work') ? `牌面上与工作最相关的是「${dimBase('work').name}」（${dimBase('work').position}·${dimBase('work').orientation}）：${dimBase('work').core || (dimBase('work').keywords || []).join('、')}。` : '牌面上没有明确指向工作的牌。'}` +
        `${court.length ? `牌中有宫廷牌${join(court.map((c) => c.name))}，说明局面里有具体的人（也可能就是你自己的某个侧面）在起作用。` : ''}` +
        `${elCount.土 ? '有土元素，现实条件与资源是被这张牌阵看到的。' : '缺土元素，现实条件与资源这块容易估计不足。'}`,
      advice: `工作上建议：${elCount.土 ? '把计划落到预算与时间表上，别停在口头' : '先把现实条件摸清楚——薪资、工时、稳定性，再谈喜好'}；${dimBase('work') && !dimBase('work').upright ? '这张相关牌是逆位，说明当下的不适主要来自状态而非岗位本身，可以调状态再看。' : ''}`,
    },
    {
      key: 'career', label: '事业发展',
      text: `从牌阵的时间线看：${cards.map((c) => `${c.position}是${c.name}${c.orientation}`).join('，')}。` +
        `${major.length >= Math.ceil(n / 2) ? '大牌过半，事业这条线牵动的不只是岗位，还有你对自己要往哪走的判断' : '变化更多发生在具体事务层面，先把眼前的项目做成'}` +
        `${axis ? `；结局位置的「${axis.name}」给出的方向是${axis.core || ''}` : ''}。`,
      advice: `建议把${cards[0]?.position || '最初'}这一环的课题先收尾，再往${axis?.position || '结果'}的方向推进；${elCount.火 ? '火的能量在，适合主动出击一步' : '缺火时别等热情来，先用流程推着自己动'}。事业发展是长线，牌面只反映当前这一段。`,
    },
    {
      key: 'love', label: '爱情与感情',
      text: `${dimBase('love') ? `与感情最相关的是「${dimBase('love').name}」（${dimBase('love').position}·${dimBase('love').orientation}）：${dimBase('love').core || (dimBase('love').keywords || []).join('、')}。` : '牌面上没有明确指向感情的牌，当下这段关系不是主要议题。'}` +
        `${elCount.水 ? '有水元素，情感与感受在这件事里占的分量不轻。' : '缺水元素，容易用理性压过感受，留意别忽略自己的情绪。'}`,
      advice: `${elCount.水 ? '先照顾好感受再谈效率：把想说的话说出口，比猜对方心思有效' : '给自己留一点感受情绪的时间，别把所有事都当任务处理'}；${dimBase('love') && !dimBase('love').upright ? '相关牌为逆位，提示关系里有没说开的地方，找个合适时机讲清楚。' : ''}关系取决于你们怎么做，牌只帮你把问题问清楚。`,
    },
    {
      key: 'health', label: '健康状况',
      text: `牌阵里${dimBase('health') ? `与健康状态最贴近的是「${dimBase('health').name}」：${dimBase('health').core || (dimBase('health').keywords || []).join('、')}` : '没有直接指向身体的牌'}。` +
        `${reversed.length >= 2 ? `${reversed.length} 张逆位，提示内在消耗偏大，身体往往是第一个反映出来的` : '整体状态与牌面呈现的相对一致'}` +
        `${elCount.土 || elCount.水 ? '' : '；缺土与水，作息与身体的基本盘容易被牺牲'}。这些是象征性的提示，不是诊断。`,
      advice: `${reversed.length >= 2 ? '建议先把睡眠与饮食稳住，别在这个阶段额外加压' : '维持现有作息，适度运动即可'}；${lack.length ? `补${lack[0]}所代表的${TAROT_ELEMENT_FOCUS[lack[0]]?.area || ''}：${TAROT_ELEMENT_FOCUS[lack[0]]?.advice || ''}` : ''}身体有明确不适请就医，牌面不能替代专业意见。`,
    },
  ];

  return {
    lead: `塔罗是一套象征系统而不是判决。下面先给整盘的连贯解读（把几张牌串成一条线），再分五个维度落到生活里。`,
    dimensions, sections,
  };
}

// ══════════════════════════════════════════════════════════
// 统一入口
// ══════════════════════════════════════════════════════════
const BUILDERS = {
  bazi: baziInterpret,
  ziwei: ziweiInterpret,
  liuyao: liuyaoInterpret,
  meihua: meihuaInterpret,
  daliuren: daliurenInterpret,
  tarot: tarotInterpret,
};

/**
 * 生成解析与详解
 * @param {object} r compute() 的返回值
 * @returns {object|null} 结构化解析对象
 */
export function interpret(r) {
  if (!isObj(r) || !r.system) return null;
  const fn = BUILDERS[r.system];
  if (!fn) return null;
  let body;
  try {
    body = fn(r);
  } catch (e) {
    return {
      moduleType: MODULE_TYPE[r.system] || 'natal',
      system: r.system,
      systemLabel: SYSTEM_LABEL[r.system] || r.system,
      title: '解析与详解',
      lead: '这一盘的解析暂未生成，请稍后重试。',
      dimensions: [],
      sections: [],
      disclaimer: DISCLAIMER,
      error: String(e && e.message),
    };
  }
  return {
    moduleType: MODULE_TYPE[r.system] || 'natal',
    system: r.system,
    systemLabel: SYSTEM_LABEL[r.system] || r.system,
    title: '解析与详解',
    lead: body.lead || '',
    dimensions: body.dimensions || [],
    sections: body.sections || [],
    disclaimer: DISCLAIMER,
  };
}

export default interpret;
