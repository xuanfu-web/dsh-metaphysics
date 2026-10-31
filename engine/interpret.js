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
// 生年四化要按年干反查四颗星，四化表只在紫微引擎里定义了一份，这里直接复用，避免两处维护打架
import { MUTAGEN } from './ziwei.js';
// 紫微的词库单列一处：宫位取象、主星细节、双星、煞星辅星、四化措辞、庙旺语气、格局读法
import {
  palaceFieldOf, starExtraOf, starPairOf, brightRead, huaInLine,
  shaLineOf, shaNatureOf, fuLineOf, patternReadOf, MAIN_SHA,
} from './ziwei-words.js';
// 八字的画像词库：日主取象、十神画像、命局基调与地支关系说法
import { stemPortraitOf, godPortraitOf, frameToneOf, relationNotes } from './bazi-words.js';
// 卦体关系的文案与面板 chip 共用同一份标签，避免两处措辞走散
import { bodyLabels, yongshenOf } from './liuyao.js';

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

// ── 询问方向 ────────────────────────────────────────────
// 问事（六爻 / 梅花 / 大六壬 / 塔罗）时可选的方向。
// dim 指向五维度里最贴近的一条，会把该维度提到最前并在开头点明问题与方向，避免泛泛而谈。
export const DIRECTIONS = [
  { key: 'general', label: '综合', dim: null, focus: '' },
  { key: 'wealth', label: '财运', dim: 'work', focus: '钱财进出的落点主要看「工作与职业选择」与「事业发展」这两条。' },
  { key: 'career', label: '事业', dim: 'career', focus: '事业发展这条与你的问题最直接。' },
  { key: 'love', label: '感情', dim: 'love', focus: '感情这条与你的问题最直接。' },
  { key: 'health', label: '健康', dim: 'health', focus: '健康这条与你的问题最直接；下面只作提醒，不作任何诊断。' },
  { key: 'study', label: '学业', dim: 'career', focus: '学业与考试更贴近「事业发展」这条，讲的是长期积累与阶段进展。' },
  { key: 'travel', label: '出行', dim: 'overall', focus: '出行与迁动更贴近「整体运势」这条，看的是当下这一段的大环境。' },
];

export const DIRECTION_DEFAULT = 'general';
export const dirOf = (key) => DIRECTIONS.find((d) => d.key === key) || DIRECTIONS[0];

/** 归一化「所问之事 + 询问方向」，给出结构与回显串 */
function askOf(opts) {
  const o = isObj(opts) ? opts : {};
  const question = typeof o.question === 'string' ? o.question.trim().slice(0, 200) : '';
  const d = dirOf(o.direction);
  return {
    question,
    direction: d.key,
    directionLabel: d.label,
    // 没填问题时别在抬头喊一句「（未填写）」——读者只想知道这张盘在说什么
    echo: question ? `问题：${question} ｜ 询问方向：${d.label}` : `询问方向：${d.label}`,
  };
}

/** 把问题与方向写进解析：聚焦维度提前 + 点明方向 + 引语回显 */
function applyAsk(dims, ask, lead) {
  const list = Array.isArray(dims) ? dims.slice() : [];
  const d = dirOf(ask && ask.direction);
  if (d.dim) {
    const i = list.findIndex((x) => x && x.key === d.dim);
    if (i > 0) { const hit = list[i]; list.splice(i, 1); list.unshift(hit); }
    if (list[0] && list[0].key === d.dim) {
      const head = ask.question
        ? `就你所问的「${ask.question}」来看（${d.label}方向）——${d.focus}`
        : `按${d.label}这个方向看——${d.focus}`;
      list[0] = Object.assign({}, list[0], { text: `${head}${list[0].text}`, focused: true });
    }
  }
  let l = lead || '';
  if (ask.question) l = `你问的是「${ask.question}」${d.key === 'general' ? '。' : `，方向是${d.label}。`}${l}`;
  else if (d.key !== 'general') l = `方向是${d.label}。${l}`;
  return { dims: list, lead: l };
}

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
  const cli = r.climate || (isObj(ys.climate) ? ys.climate : (isObj(ys.tiaohou) ? ys.tiaohou : null));
  const wx = isObj(r.wuxing) ? r.wuxing : {};
  const level = pick(st, 'level', '中和');
  const favor = Array.isArray(ys.favor) ? ys.favor : [];
  const avoid = Array.isArray(ys.avoid) ? ys.avoid : [];
  const disputed = Array.isArray(ys.disputed) ? ys.disputed : [];
  const primary = pick(frame, 'primaryName', '未取定');
  const gender = pick(r.input, 'gender', '');
  const isMale = gender === 'male';
  const spouseKey = isMale ? '财' : '官杀';

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

  // ── 交叉判断：把两三个维度叠起来看，单看任一维度都会得出相反的结论 ──
  const cross = [];
  const GAN_WX = { 甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土', 己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水' };
  const ganWx = (gz) => GAN_WX[String(gz || '')[0]] || '';
  const ZHI_WX = { 子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火', 午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水' };
  // ① 用神 × 当前大运：这十年是「顺着走」还是「顶着走」
  if (cur) {
    const dw = ganWx(cur.ganzhi);
    if (dw) {
      if (favor.includes(dw)) cross.push(`当前大运 ${cur.ganzhi} 走${dw}，正是喜用，这十年推事情比平时省力；${topName ? `可把力气放在${topName}对应的事上` : '适合把长期计划铺开'}。`);
      else if (avoid.includes(dw)) cross.push(`当前大运 ${cur.ganzhi} 走${dw}，落在忌神上，这十年更适合守成、补短板，不宜大杠杆扩张。`);
      else cross.push(`当前大运 ${cur.ganzhi} 走${dw}，既非喜用也非忌神，属于平运，结果更多取决于你在这段里做了什么。`);
    }
  }
  // ② 五行缺失 × 喜忌：缺的正好是忌神，反而是好事
  if (missing.length) {
    const good = missing.filter((m) => avoid.includes(m));
    const bad = missing.filter((m) => favor.includes(m));
    if (good.length) cross.push(`命局缺 ${good.join('、')}，而它正是你的忌神——缺得刚好，不必刻意去补。`);
    if (bad.length) cross.push(`命局缺 ${bad.join('、')}，这恰是喜用，是这盘的短板：靠环境、行业与身边人来补，比自己硬扛有效。`);
  }
  // ③ 十神权重 × 格局：主格与最重十神一致＝专注，冲突＝拉扯
  if (topName && primary) {
    const godOfPattern = godFromPattern(primary);
    if (godOfPattern && topName && godOfPattern === topName) cross.push(`格局 ${primary} 与最重的${topName}一致，说明你的能量集中在同一条线上，长处突出、短板也集中。`);
    else if (godOfPattern) cross.push(`格局 ${primary}（偏${godOfPattern}）与最重的${topName}不在一条线上，内在会有两股力气拉扯：一边是格局给你的路，一边是你本能投入最多的事。`);
  }
  // ④ 神煞 × 十神：羊刃与七杀并见，是压力型结构
  const hasRen = Array.isArray(r.shensha) && r.shensha.some((g) => (g.items || []).some((i) => i.name === '羊刃'));
  if (hasRen && Number(groups['官杀'] || 0) >= 1) {
    cross.push('命见羊刃且官杀有力，属压力驱动型：遇强则强，但需要出口，长期憋着容易内耗；运动或竞技类爱好比"忍"更有用。');
  }
  // ⑤ 夫妻宫 × 配偶星：日支与财/官是否同气
  if (r.pillars?.day) {
    const isM = r.input?.gender === 'male';
    const spouseGod = isM ? '财' : '官杀';
    const spVal = Number(groups[spouseGod] || 0);
    const zhiWx = ZHI_WX[r.pillars.day.branch] || '';
    if (spVal >= 2 && zhiWx && favor.includes(zhiWx)) cross.push(`配偶星（${spouseGod}）不弱，且日支 ${r.pillars.day.branch} 属喜用，感情中有实际助益，不只看感觉。`);
    else if (spVal === 0) cross.push(`命局不见${spouseGod}，感情多靠自己主动创造场景；日支 ${r.pillars.day.branch} 更像"对方的样子"而不是"缘分的强度"。`);
  }

  const ahead = idx >= 0 ? list.slice(idx + 1, idx + 4) : list.slice(0, 3);
  // 依据：把每个维度"凭什么这么说"的盘面事实列出来，便于用户核对，也让文案不再是空口断语
  const ev = (...xs) => xs.filter((x) => x != null && x !== '');

  const dimensions = [
    {
      key: 'overall', label: '整体运势',
      // level 本身已是「身强/偏强/中和/偏弱/身弱」，这里不能再拼一个「身」
      text: `你的日主是${dm.stem}（五行属${dm.element}），命局${level}（${pick(st, 'score', '')} 分）。` +
        `用神取向偏${join(favor)}，忌${join(avoid)}——往${join(favor)}的方向走会更省力${ys.tiaohou && ys.tiaohou.note ? `；调候上${ys.tiaohou.note}` : ''}。` +
        `目前走在${pick(cur, 'ganzhi', '当前')}大运（${curTier}），${pick(ln, 'year', '今年')}年流年${pick(ln, 'ganzhi', '')}为${lnTier}。`,
      // 大运与流年各自给建议，不再把两个档位的文案并成一句（曾出现「起伏不大」后面接「留出缓冲」）
      advice: `大运看：${TIER_TEXT[curTier] || TIER_TEXT.平}；流年看：${TIER_ADVICE[lnTier] || TIER_ADVICE.平}。大方向定在${join(favor)}相关的领域，会比硬扛${join(avoid)}顺畅一些。`,
      evidence: ev(
        `日主 ${dm.stem}${dm.element}·${level}`,
        st && st.parts && st.parts.season ? `月令 ${st.parts.season.branch}${st.parts.season.element}` : '',
        `喜 ${join(favor)} / 忌 ${join(avoid)}`,
        cur ? `大运 ${cur.ganzhi}·${curTier}` : '',
        ln && ln.ganzhi ? `流年 ${ln.year}${ln.ganzhi}·${lnTier}` : '',
      ),
    },
    {
      key: 'work', label: '工作与职业选择',
      text: `按喜用神看，${join(favor)}这几类方向对你更有利，可参考的行业包括：${favor.slice(0, 2).map((e) => WUXING_INDUSTRY[e] || '').filter(Boolean).join('；') || '暂未取定，可先按兴趣与能力试'}。` +
        `命局主格为${primary}，这类结构的人通常${TENGOD_STYLE[godFromPattern(primary)] || '有自己稳定的节奏'}。` +
        `十神中${topName}最重（${top[0]?.[1] ?? ''}），${secondName}次之，说明你在${topName}所代表的事项上投入的精力最多。`,
      advice: `选岗位时可以偏向「${join(favor)}属性 + ${topName}对应的事务」；如果现在的工作明显偏${join(avoid)}且长期让你疲惫，可以参考上面方向做小幅试探，不必立刻大改。`,
      evidence: ev(
        `主格 ${primary}`,
        `喜用五行 ${join(favor)}`,
        top.length ? `十神 ${top.slice(0, 3).map(([k, v]) => `${k}${v}`).join(' ')}` : '',
      ),
    },
    {
      key: 'career', label: '事业发展',
      text: `${primary}的格局，配合十神里${topName}偏旺的结构，事业上更适合${topName === '财' ? '靠业绩与资源积累说话' : topName === '官杀' ? '在有规则的组织里按层级上升' : topName === '印' ? '凭资质、专业与口碑取胜' : topName === '食伤' ? '靠作品、技术与表达打开局面' : '与人并肩、共同承担的方式'}。` +
        `接下来几步大运依次为：${ahead.map((d) => `${d.ganzhi}（${d.luck?.tier || '平'}）`).join(' → ') || '暂未排出'}，` +
        `整体节奏是${ahead.length && ahead.filter((d) => ['吉', '大吉'].includes(d.luck?.tier)).length >= 2 ? '先抑后扬、后段更顺' : '需要一步步积累，中间偶有起伏'}。`,
      advice: `把${ahead[0]?.ganzhi || '下一步'}这一步当作铺垫期，重点补${topName === '食伤' ? '作品与专业深度' : topName === '官杀' ? '资历与组织内的信任' : '可迁移的能力与资质'}；遇到${join(avoid)}过重的年份，优先保住已有成果。`,
      evidence: ev(
        `格局 ${primary}`,
        ahead.length ? `后续大运 ${ahead.map((d) => d.ganzhi).join(' → ')}` : '',
        `当前 ${pick(cur, 'ganzhi', '—')}·${curTier}`,
      ),
    },
    {
      key: 'love', label: '爱情与感情',
      text: `${isMale ? '男命以财星看妻缘' : '女命以官杀看夫缘'}，你命局中${isMale ? '财' : '官杀'}的力量为${groups[isMale ? '财' : '官杀'] ?? '—'}，` +
        `${Number(groups[isMale ? '财' : '官杀'] || 0) >= 2 ? '缘分出现的机会不算少' : '需要自己主动创造认识人的场景'}。` +
        `日支（配偶宫）为${pick(r.pillars?.day, 'branch', '')}，坐${pick(r.pillars?.day, 'zizuo', '')}，` +
        `这里的信号是：${Number(groups[isMale ? '财' : '官杀'] || 0) >= 2 ? '关系里你容易被主动靠近，但要留意筛选' : '感情推进偏慢，属于需要经营的类型'}。`,
      advice: `不必急着要结果，先看清自己在关系里最在意什么。${Number(groups[isMale ? '财' : '官杀'] || 0) >= 2 ? '选项多时，明确标准反而更省心' : '可以把社交圈稍微扩大一点，但别为了脱单降低底线'}；沟通上多说具体需求，少让对方猜。`,
      evidence: ev(
        `${isMale ? '财' : '官杀'} 权重 ${groups[isMale ? '财' : '官杀'] ?? '—'}`,
        `日支 ${pick(r.pillars?.day, 'branch', '')}·${pick(r.pillars?.day, 'zizuo', '')}`,
        `配偶星 ${isMale ? '财' : '官杀'}`,
      ),
    },
    {
      key: 'health', label: '健康状况',
      text: `五行分布上，${strongest}最旺、${weakest}最弱${missing.length ? `，其中${join(missing)}在命局中没有明现` : ''}。` +
        `按五行与身体的对应，${strongest}偏旺时${WUXING_ORGAN[strongest]?.part || ''}负担相对重（${WUXING_ORGAN[strongest]?.note || ''}）；` +
        `${weakest}偏弱则${WUXING_ORGAN[weakest]?.part || ''}偏弱一些，是更值得留意的部分。这只是传统命理的取象提示，不是诊断。`,
      advice: `建议把作息规律放在第一位——尤其是睡眠时长尽量稳定；${WUXING_ORGAN[weakest]?.note ? weakest + '对应的' + WUXING_ORGAN[weakest].part + '可以按体检项目关注' : '按常规体检关注'}。任何不适请去看医生，别用命理结论替代检查。`,
      evidence: ev(
        `五行 ${Object.entries(wx).map(([k, v]) => `${k}${v}`).join(' ')}`,
        `最旺 ${strongest} / 最弱 ${weakest}`,
        missing.length ? `缺 ${join(missing)}` : '',
      ),
    },
  ];

  // ── 词库取词：日主取象 / 十神画像 / 命局基调 / 地支关系 ────────────
  const stemP = stemPortraitOf(dm.stem);
  const topP = godPortraitOf(topName);
  const secondP = godPortraitOf(secondName);
  const season = st.parts && st.parts.season ? st.parts.season : null;
  const dayZhi = pick(r.pillars?.day, 'branch', '');
  // 组（比劫/食伤…）之外，再点出单颗最突出的十神：同一组里正财与偏财的味道并不一样
  const byGodSorted = Object.entries(isObj(frame.godStats?.byGod) ? frame.godStats.byGod : {})
    .filter(([, v]) => Number(v) > 0)
    .sort((a, b) => b[1] - a[1]);
  const topGodName = byGodSorted[0] ? byGodSorted[0][0] : '';
  const topGodP = godPortraitOf(topGodName);
  // 用神角色按权重排序，命局基调取分量最重的那一路
  const favorRolesByWeight = (Array.isArray(ys.favorRoles) ? ys.favorRoles : [])
    .slice()
    .sort((a, b) => (Number(groups[b]) || 0) - (Number(groups[a]) || 0));

  const frameworkText = [
    `**日主**：${dm.stem}${dm.element}（${dm.yinYang}${dm.element}）${season ? `生于${season.branch}月，日主在月令「${season.word}」` : ''}，命局${level}（${pick(st, 'score', '—')} 分）${stemP ? `——${stemP.image}之象` : ''}。`,
    `**用神**：喜${join(favor) || '—'}（${join(ys.favorRoles || []) || '—'}），忌${join(avoid) || '—'}（${join(ys.avoidRoles || []) || '—'}）。${frameToneOf(level, favorRolesByWeight)}`,
    `**格局**：${primary}（${pick(frame.primary, 'evidence', '')}）${(Array.isArray(frame.geju) ? frame.geju : []).filter((g) => g.name && g.name !== primary).length
      ? `，另有${frame.geju.map((g) => g.name).filter((n) => n && n !== primary).join('、')}`
      : ''}。`,
  ].join('\n');

  const portraitText = [
    `**外在取象**：${stemP ? `${stemP.image}的日主，传统取象上${stemP.look}` : '这一柱的取象词库未覆盖'}${stemP ? `；气质上${stemP.temper}` : ''}。这一层只是取象，不作定论。`,
    `**性格底色**：十神里${topName || '—'}最重${top[0] ? `（${top[0][1]}）` : ''}${secondName ? `，${secondName}次之` : ''}。${topP ? `${topP.gift}；${topP.trap}。` : ''}`
      + (topGodP && topGodName && topGodName !== topName ? `具体到单颗，${topGodName}最显，落在「${topGodP.role}」上。` : '')
      + (stemP ? `放在${dm.stem}日主身上，长处是「${stemP.gift}」，容易踩的坑是「${stemP.trap}」。` : ''),
    `**事业与家庭**：${topP ? `做事上${topP.work}` : '做事方式看喜用与时运'}${topP ? `；感情里${topP.love}。` : '。'}日支${dayZhi}${pick(r.pillars?.day, 'zizuo', '') ? `坐${pick(r.pillars?.day, 'zizuo', '')}` : ''}，${Number(groups[spouseKey] || 0) >= 2 ? '配偶星不弱，关系里你有条件被好好对待，也要留意别把这些当成理所当然' : '配偶星偏轻，感情更需要主动经营'}。${secondP ? `另一面是${secondName}的${secondP.role}：${secondP.gift}。` : ''}`,
  ].join('\n');

  const yearLines = (r.liunian || []).slice(0, 3).map((l) => {
    const lk = isObj(l.luck) ? l.luck : {};
    const notes = relationNotes(l.relations);
    const why = (lk.reasons || []).slice(0, 2).join('，');
    return `**${l.year} ${l.ganzhi}**（${l.age}岁·${l.stemTenGod || '—'}）${lk.tier || '平'}：${why || '没有特别信号，按大运的基调走'}${notes.length ? `；与命局的关系——${notes.join('；')}` : ''}。`;
  }).join('\n');
  const yearsText = yearLines
    ? `先看眼前三年（大字是当年干支与十神，后面是该年的档位与理由）：\n${yearLines}\n读法：档位说的是「这一年顺不顺手」，不是「会发生什么」；年份不顺时把重要动作挪到顺的年份，比硬扛更省事。`
    : '流年数据未取到，暂不展开。';

  const adviceItems = [];
  if (favor.length) {
    adviceItems.push(`把生活与工作往${join(favor)}的方向挪一点：${favor.slice(0, 2).map((e) => WUXING_INDUSTRY[e] || '').filter(Boolean).join('；') || '按喜用五行对应的行业挑'}。不必推倒重来，先从环境、圈子和日常习惯改起。`);
  }
  if (avoid.length) {
    adviceItems.push(`对${join(avoid)}保持一点自觉：不是不能碰，而是别在关键决定上给它加码——${avoid.includes('火') ? '少在情绪最热的时候拍板' : avoid.includes('木') ? '少在想法最多的时候开工' : '先把手上的事收尾再谈新的'}。`);
  }
  const relNotes = relationNotes(r.relations && r.relations.branches);
  if (relNotes.length) {
    adviceItems.push(`命局里的地支关系是「${(r.relations.branches || []).join('、')}」：${relNotes.join('；')}。对应到具体人事，先处理情绪，再处理事情。`);
  }
  if (cli && cli.need) {
    adviceItems.push(`调候要${cli.need.stem}${cli.need.element}：${cli.need.why}。落到日常，就是往这一类的环境、作息与节奏上靠。`);
  }
  const adviceText = adviceItems.slice(0, 4).map((t, i) => `${'①②③④'[i]} ${t}`).join('\n');

  const sections = [
    ...(cross.length ? [{ key: 'cross', label: '交叉判断', text: cross.join('　') }] : []),
    { key: 'framework', label: '命局框架', text: frameworkText },
    { key: 'portrait', label: '画像', text: portraitText },
    {
      key: 'reasoning', label: '看盘顺序',
      // 把「先看什么、后看什么」摊开：用户能照着复核，也避免只给结论不给路径
      text: [
        `① 先看月令：${st.parts && st.parts.season ? `${st.parts.season.branch}月，日主${dm.element}${st.parts.season.word}（${st.parts.season.weight}）` : '月令已定'}，得旺衰 ${level}（${pick(st, 'score', '—')} 分）。这一步定的是"你有没有力气"。`,
        `② 再定用神：身强则取泄、耗、制——喜${join(favor)}（${join(ys.favorRoles || [])}），忌${join(avoid)}（${join(ys.avoidRoles || [])}）。这一步定的是"往哪走省力"。`,
        `③ 看格局：主格${primary}${(() => {
          const others = (Array.isArray(frame.geju) ? frame.geju : []).map((g) => g.name).filter((n) => n && n !== primary);
          return others.length ? `，另有${others.join('、')}` : '';
        })()}。格局与前两步同向时可信度更高；冲突时以用神为先。`,
        `④ 看大运：当前${pick(cur, 'ganzhi', '—')}（${curTier}）${ln && ln.year ? `，${ln.year} 年流年${ln.ganzhi}为${lnTier}` : ''}。行运的吉凶不看名字，看它落在喜用还是忌神（下方「时间窗」给了理由）。`,
        `⑤ 落到维度：工作看喜用五行与十神权重；感情看配偶星与日支；健康看最旺与最弱的五行。五维度都只是这套推导的应用，不是另一套算法。`,
      ].join('\n'),
    },
    ...(r.renyuan ? [(() => {
      const ry = r.renyuan;
      const table = ry.segments.map((s) => `${s.stem}${s.from}–${s.to}`).join(' / ');
      const nextSeg = ry.next ? `，第 ${ry.next.from} 日起交 ${ry.next.stem}${ry.next.element}` : '';
      const outside = ry.inHidden ? '' : ` 表里的 ${ry.active} 不在本柱藏干表中（属余气口径），两表各照原样，不互相改写。`;
      const beyond = ry.beyond ? ' 你生在第 31 日以后，已超出 30 日表，按本气算，不硬分摊。' : '';
      const ryc = r.renyuanClassic || classicOf('smt-renyuan');
      const src = ryc ? `\n原文：《${CLASSIC_BOOKS[ryc.book].name}·${ryc.chapter}》「${ryc.quote}」\n白话：${ryc.plain}` : '';
      return {
        key: 'renyuan', label: '人元司权',
        text: `生于${ry.month}月第 ${ry.day} 日（从${ry.term ? ry.term.name : '节'}起算，节当日为第 1 日，日差按本盘所用时刻所在日计）：这一日由 **${ry.active}${ry.activeElement}** 司权，第 ${ry.segment.from}–${ry.segment.to} 日属它${nextSeg}。\n`
          + '月令这一个月里，余气、中气、本气轮值，不是整月同一个五行当值——所以「月令是什么」，还要看生在第几日。\n'
          + `**口径**：本插件固定通行 30 日表（${table}）；另有 7/7/16、9/3/18 等分法，三命通会此本又作 5/5/20（见下原文），各家不一。分日只作解释层的一层细节，**不改取格**：取格仍按本气、透干与会支判定。${outside}${beyond}` + src,
      };
    })()] : []),
    {
      key: 'timeline', label: '时间窗',
      text: (() => {
        const curSpan = cur && cur.startAge != null ? `${cur.startAge}–${cur.startAge + 9}岁，${curTier}${curLuck.reasons && curLuck.reasons.length ? `；${curLuck.reasons.join('，')}` : ''}` : '—';
        const nextTwo = (ahead || []).slice(0, 2).map((d) => `${d.ganzhi}（${d.startAge}–${d.startAge + 9}岁，${d.luck?.tier || '平'}）`).join(' → ') || '—';
        const years = (r.liunian || []).slice(0, 5).map((l) => {
          const lk = isObj(l.luck) ? l.luck : {};
          const why = (lk.reasons || []).slice(0, 2).join('，');
          return `${l.year} ${l.ganzhi}·${l.stemTenGod || ''}·${lk.tier || '平'}${why ? `（${why}）` : ''}`;
        }).join('；');
        const jiaoLine = r.dayun && r.dayun.jiao && r.dayun.jiao.at
          ? `起运交运时刻 ${r.dayun.jiao.at}（${r.dayun.jiao.frame}；三日折一年，距${r.dayun.jiao.from.name} ${r.dayun.jiao.spanDays} 天）。每步大运在同月同日同时刻换，逐年日期见下方大运表「交运」列。\n`
          : '';
        return `${jiaoLine}当前大运：${pick(cur, 'ganzhi', '—')}（${curSpan}）。后续两步：${nextTwo}。\n近五年流年：${years || '—'}。\n读法：大运管"这十年的大环境"，流年管"今年的具体天气"；两者打架时，以能否动到用神为准。`;
      })(),
    },
    { key: 'years', label: '流年时间轴', text: yearsText },
    { key: 'advice', label: '专业建议', text: adviceText },
    (() => {
      const hits = (r.liunian || []).filter((l) => l.suiyun && Array.isArray(l.suiyun.signals) && l.suiyun.signals.length);
      const e = suiyunClassicOf(r);
      const src = e ? `\n原文：《${CLASSIC_BOOKS[e.book].name}·${e.chapter}》「${e.quote}」\n白话：${e.plain}` : '';
      return {
        key: 'suiyun', label: '岁运提示',
        text: hits.length
          ? hits.map((l) => {
            const stem = (l.suiyun.dayun || []).map((d) => `第${d.step}步${d.ganzhi}`).join('、');
            return `${l.year} ${l.ganzhi}（${stem || '未到起运'}）：${l.suiyun.signals.map((s) => s.detail).join('；')}`;
          }).join('\n') +
            '\n读法：岁运并临、运年反吟、大运与流年的伏吟/反吟只说明干支层面重复或对冲，传统上当作「变动感较强」的信号；本插件不据此判吉凶，要落到具体年份，仍看该年是否动到用神。大运与本命四柱的伏吟/反吟整步大运都在，会连续多年出现，不当成逐年加重。' + src
          : '近十年没有岁运并临、运年反吟或大运/流年伏吟、反吟。「岁运并临主大凶」这类说法流传很广，本插件只把它当变动提示，没有命中就不作额外解读。',
      };
    })(),
    {
      key: 'checks', label: '交叉校验',
      text: (() => {
        const favorScore = favor.reduce((sum, el) => sum + (Number(wx[el]) || 0), 0);
        const avoidScore = avoid.reduce((sum, el) => sum + (Number(wx[el]) || 0), 0);
        const out = [];
        out.push(favorScore < avoidScore
          ? `喜用合计 ${favorScore.toFixed?.(1) ?? favorScore} 低于忌神合计 ${avoidScore.toFixed?.(1) ?? avoidScore}：原局里"顺风的条件"偏少，靠行运与外部环境补更现实，别硬扛。`
          : `喜用合计 ${favorScore} 不低于忌神合计 ${avoidScore}：原局自带可用的条件，行运只是把它放大或压住。`);
        if (curTier && lnTier) {
          const good = ['吉', '大吉'];
          if (good.includes(curTier) && !good.includes(lnTier)) out.push('大运顺、当年逆：方向可以按大运走，具体动作挑流年的顺月做，不必因为一年不顺就推翻长期计划。');
          else if (!good.includes(curTier) && good.includes(lnTier)) out.push('大运逆、当年顺：今年适合借势处理具体事务，但不宜把长期结构性问题押在这一年解决。');
          else if (!good.includes(curTier) && !good.includes(lnTier)) out.push('大运与流年都偏逆：以守住基本盘为主，减少新增承诺。');
          else out.push('大运与流年同向偏顺：可以把想做但一直拖着的事排上日程。');
        }
        const th = ys.tiaohou && ys.tiaohou.need ? ys.tiaohou : null;
        if (th) {
          out.push(th.clash
            ? `调候要${th.need.stem}${th.need.element}，扶抑不在喜用里：两套取法有分歧，本盘按调候优先——寒暖失衡时，再补强弱也难受。`
            : `调候要${th.need.stem}${th.need.element}，与扶抑用神同向：取用上不打架，${th.need.element}相关的行业与环境优先。`);
        }
        return out.join('　');
      })(),
    },
    {
      key: 'yongshen', label: '用神与忌神',
      // detail 里通常已含调候说明，这里不再补一句，避免同一段出现两次「调候上…」
      text: `喜用：${join(favor)}（对应十神：${join(ys.favorTenGods || ys.favorRoles || [])}）；忌：${join(avoid)}（对应十神：${join(ys.avoidTenGods || ys.avoidRoles || [])}）。` +
        `${pick(ys, 'detail', '')}`,
    },
    ...(cli ? [{
      key: 'climate', label: '寒暖燥湿',
      text: `${cli.narration}${cli.need
        ? `调候取${cli.need.stem}${cli.need.element}，忌${cli.avoidElement}${disputed.some((d) => d.element === cli.avoidElement) ? '（有争议：该行在扶抑中为喜，见用神节）' : ''}；${cli.clash ? '与扶抑冲突，本盘以调候为先' : disputed.some((d) => d.element === cli.avoidElement) ? '调候所忌在扶抑里为喜，两说并存' : '与扶抑同向'}`
        : '气候平和，调候不作主取'}。`,
    }] : []),
    ...(ys.qt ? [{
      key: 'qiongtong', label: '穷通宝鉴',
      text: `${ys.qt.label}：用神 ${ys.qt.yong.join('、')}（首取 ${ys.qt.primary}）。原文：「${ys.qt.quote}」` +
        `（《穷通宝鉴》第 ${ys.qt.chapter} 章${ys.qt.note ? '；' + ys.qt.note : ''}）`,
    }] : []),
    {
      key: 'geju', label: '格局依据',
      text: (Array.isArray(frame.geju) ? frame.geju : []).map((g) => `${g.name}（${g.kind}）：${g.evidence}`).join('；') || '未取到格局',
    },
    ...(Array.isArray(r.classics) && r.classics.length ? [{
      key: 'classics', label: '古籍原文',
      text: r.classics.map((e) => `《${CLASSIC_BOOKS[e.book].name}·${e.chapter}》「${e.quote}」——${e.plain}`).join('\n'),
    }] : []),
    {
      key: 'quant', label: '量化口径',
      text: `本报告的量化只到「档位」：事业看十神权重（${topName} ${top[0]?.[1] ?? '—'}）、财富看财星权重（${groups['财'] ?? 0}）、感情看配偶星权重（${spouseKey} ${groups[spouseKey] ?? 0}）；大运/流年用「大吉 / 吉 / 平 / 忌」四档。不换算金额、不给健康诊断——那需要地域、家庭、行业与体检数据，命盘本身推不出来。`,
    },
    {
      key: 'limits', label: '未纳入',
      text: '本盘没有计算：流月与流日、神煞的加权轻重、地支藏干的动态引化（合冲后再论）。取用按「调候优先、扶抑校验」；调候由月令与全局寒暖燥湿判定，并按《穷通宝鉴》120 格给出用神顺序（整理表口径，原文摘句照录，异文处已标 note）；各派取法仍有分歧；真太阳时未含历史时区与夏令时。把这些补上会改变"强弱"的边际判断，所以这里只给方向，不下断语。',
    },
  ];

  // 一页读懂：报告顶部的五条结论（整体 / 事业 / 财富 / 感情 / 节奏）。
  // 只做「摘要」，不引入新判断——全部取自下面已经算好的字段。
  const outline = [
    { key: 'overall', label: '整体', text: `${level}，喜${join(favor) || '—'}、忌${join(avoid) || '—'}` },
    { key: 'career', label: '事业', text: `主格${primary}，${topName}偏旺` },
    { key: 'wealth', label: '财富', text: `财星权重 ${groups['财'] ?? 0}${favor.includes('金') ? '，喜金助财' : ''}` },
    { key: 'love', label: '感情', text: `${spouseKey}星权重 ${groups[spouseKey] ?? 0}，日支 ${pick(r.pillars?.day, 'branch', '—')}` },
    { key: 'rhythm', label: '节奏', text: `当前${pick(cur, 'ganzhi', '—')}（${curTier}），${pick(ln, 'year', '')} ${pick(ln, 'ganzhi', '')}（${lnTier}）` },
  ];
  // 三张表：大运 / 流年 / 触发事件。都是「把已有字段摊平」，不新增算法。
  const tables = [
    {
      key: 'dayun', title: '大运表', columns: ['大运', '年龄', '交运', '十神', '档位', '理由'],
      rows: list.map((d) => [d.ganzhi, `${d.startAge}–${d.startAge + 9}`, d.fromDate || '—', d.stemTenGod || '', d.luck?.tier || '平', (d.luck?.reasons || []).join('，')]),
    },
    {
      key: 'liunian', title: '流年表（近十年）', columns: ['年份', '干支', '十神', '档位', '与原局'],
      rows: (r.liunian || []).slice(0, 10).map((l) => [String(l.year), l.ganzhi, l.stemTenGod || '', l.luck?.tier || '平', (l.relations || []).join('、')]),
    },
  ];
  const triggerRows = (r.liunian || [])
    .filter((l) => Array.isArray(l.relations) && l.relations.length)
    .slice(0, 10)
    .map((l) => [String(l.year), l.relations.join('、'), `流年${l.ganzhi}与原局地支：${l.relations.join('、')}`]);
  if (triggerRows.length) {
    tables.push({ key: 'triggers', title: '触发事件表', columns: ['年份', '触发', '依据'], rows: triggerRows });
  }

  return {
    lead: `下面按五个维度拆开说。所有内容来自你这张命盘的结构，讲的是倾向与建议，不是预言——方向供你参考，怎么走在你自己。`,
    dimensions, sections, outline, tables,
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

// 四化的固定读法顺序：禄 → 权 → 科 → 忌
const SIHUA_ORDER = ['禄', '权', '科', '忌'];

/**
 * 取本盘的生年四化（年干四化）落宫清单，按 禄权科忌 排序。
 * 落宫以盘面上真正标出的 mutagen 为准；若该星在这张盘里没有落点（辅星偶有此情况），
 * palace 返回 null —— 交给文案如实写成「未上盘」，绝不补一个宫位上去。
 * @param {object} r 紫微排盘结果
 * @returns {Array<{star: string, type: string, palace: string|null}>} 生年四化清单
 */
function zwNatalSihua(r) {
  const palaces = Array.isArray(r?.palaces) ? r.palaces : [];

  // 星名 → {type, palace}：一宫可能同时坐两颗化星（如迁移宫天机化禄 + 太阴化忌），按星名去重
  const placed = new Map();
  for (const p of palaces) {
    for (const s of (p.stars || [])) {
      if (!s || !s.mutagen || placed.has(s.name)) continue;
      placed.set(s.name, { type: s.mutagen, palace: p.palace || null });
    }
  }

  // 年干四化表：用来补齐「盘上没有落点」的那几颗，以及保证输出顺序
  const ganzhi = pick(r, 'yearGanzhi', '');
  const yearStem = typeof ganzhi === 'string' ? ganzhi.slice(0, 1) : '';
  const table = MUTAGEN[yearStem] || {};
  const starOfType = {};
  for (const [star, type] of Object.entries(table)) starOfType[type] = star;

  const out = [];
  for (const type of SIHUA_ORDER) {
    // 年干表查不到时退回到盘面自身标注的那一颗
    let star = starOfType[type] || '';
    if (!star) {
      for (const [name, info] of placed) {
        if (info.type === type) { star = name; break; }
      }
    }
    if (!star) continue;
    const hit = placed.get(star);
    out.push({ star, type, palace: hit ? hit.palace : null });
  }
  return out;
}

/**
 * 把四化清单拼成一句人话。palace 为 null 时写「未上盘」。
 * @param {Array<{star: string, type: string, palace: string|null}>} list 四化清单
 * @returns {string} 如「天机化禄于迁移、天梁化权于夫妻、紫微化科于疾厄、太阴化忌于迁移」
 */
function zwSihuaText(list) {
  if (!Array.isArray(list) || !list.length) return '';
  return list
    .map((m) => (m.palace ? `${m.star}化${m.type}于${m.palace}` : `${m.star}化${m.type}（未上盘）`))
    .join('、');
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
  // 维度里只点名六煞；其余煞星留在逐宫分析，避免把细枝末节放大成主线
  const zwMainSha = (p) => zwSha(p).filter((n) => MAIN_SHA.includes(n));

  const careerStar = zwMainStar(career);
  const wealthStar = zwMainStar(wealth);
  const spouseStar = zwMainStar(spouse);
  const healthStar = zwMainStar(health);

  // 词库取词的几个小入口：主星清单、单颗星的亮度、双星组合、主星细节
  const mainsOf = (p) => (p?.stars || []).filter((x) => x.type === '主星');
  const brightOf = (p, name) => (p?.stars || []).find((x) => x.name === name)?.brightness || '';
  const pairOf = (p) => starPairOf(mainsOf(p).map((x) => x.name));
  const SX = starExtraOf(soulStar) || {};
  const soulBright = brightRead(brightOf(soul, soulStar));
  const soulPair = pairOf(soul);
  // 亮度的语气只调「长处放不放得开」，不改结论：落陷时取 dim 那一句
  const lightLine = (b, extra) => (extra ? `${b && b.tone === 'bad' ? extra.dim : extra.bright}。` : '');

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
  // 流年四化：四项全列，不要截断 —— 少了化科/化忌会让用户以为盘子算漏了
  const lnMutagen = Array.isArray(r.liunian?.[0]?.mutagen) ? r.liunian[0].mutagen.slice(0, 4).join('、') : '';
  // 生年四化：这才是用户最想看到的部分——自己盘上的化科落在哪颗星、哪个宫
  const natalSihua = zwNatalSihua(r);
  const natalSihuaText = zwSihuaText(natalSihua);

  const dimensions = [
    {
      key: 'overall', label: '整体运势',
      text: `${soulFrom}${soulBright ? `（${soulBright.word}——${soulBright.plain}）` : ''}，性格底色上${S.trait}。` +
        (soulPair ? `${soulPair.gist}；${soulPair.watch}。` : '') +
        `本盘${patText}。` +
        `当前大限走在${daxianPalace ? `${daxianPalace.palace}（${daxianPalace.daxian.start}–${daxianPalace.daxian.end}岁）` : '当前阶段'}，` +
        `${lnMutagen ? `流年四化为${lnMutagen}，本年的变化感主要落在这几颗星上` : '流年四化信号不明显'}。` +
        (r.flow ? `再往下一层，当前流月命宫是${r.flow.month.ganzhi}，落在原局${r.flow.month.palace || '未上盘'}，本月的变化更容易在这一宫代表的事情上显出来。` : '') +
        (natalSihuaText
          ? `另外你本命的生年四化落在：${natalSihuaText}——这是你这辈子比较稳定的底色，不随某一年改变。`
          : ''),
      advice: (() => {
        const dxName = daxianPalace ? daxianPalace.palace : '命宫';
        const dxField = palaceFieldOf(dxName);
        return `这一阶段的主题更接近「${dxName}」——${dxField ? dxField.field : '这一宫代表的事'}。把它当作这几年的主线，其余安排围着它让路；`
          + `${SX.gift ? `你最顺手的做法是${SX.gift}` : `你的优势在${S.trait}`}，但要留意${SX.watch || '用它用过了头'}。`;
      })(),
      evidence: [
        `命宫 ${soulStar}${soulOwn ? '' : '（借对宫）'}`,
        daxianPalace ? `大限 ${daxianPalace.palace} ${daxianPalace.daxian.start}–${daxianPalace.daxian.end}岁` : '',
        lnMutagen ? `流年四化 ${lnMutagen}` : '',
        `格局 ${patterns.length} 条`,
      ].filter(Boolean),
    },
    {
      key: 'work', label: '工作与职业选择',
      text: (() => {
        const careerBright = brightRead(brightOf(career, careerStar));
        const careerPair = pairOf(career);
        const careerSha = zwMainSha(career);
        return `命宫${soulStar}给你的是底层偏好：${S.work}。`
          + `官禄宫${careerStar
            ? `主星为${careerStar}${careerBright ? `（${careerBright.word}）` : ''}，${ZIWEI_STARS[careerStar]?.work || '有其自身的做事方式'}`
            : '无正曜，工作方式更多受环境与他人影响，适合配合型岗位'}。`
          + (careerPair ? `${careerPair.gist}；要留意${careerPair.watch}。` : '')
          + (careerSha.length ? `官禄宫又见${join(careerSha)}：${shaLineOf(careerSha)}` : '')
          + `两者合起来看，你更适合${careerStar && careerStar !== soulStar ? `用${soulStar}的方式去做${careerStar}擅长的事` : '在稳定的框架里发挥自己的特点'}。`;
      })(),
      advice: `挑工作时可以先看岗位内容是否匹配上面这条；如果暂时不能换，试着在现有岗位里争取靠近这部分的事务——${SX.gift ? `把「${SX.gift}」这类活往自己身上揽，比硬熬更容易做出成绩` : '先做出一件拿得出手的事，比硬熬更容易被看见'}。`,
      evidence: [
        `命宫 ${soulStar}${soulBright ? `·${soulBright.word}` : ''}`,
        `官禄 ${careerStar || '无正曜'}`,
        `财帛 ${wealthStar || '无正曜'}`,
        ...(zwMainSha(career).length ? [`官禄煞星 ${join(zwMainSha(career))}`] : []),
      ],
    },
    {
      key: 'career', label: '事业发展',
      text: (() => {
        const wealthBright = brightRead(brightOf(wealth, wealthStar));
        const wealthPair = pairOf(wealth);
        return `财帛宫${wealthStar
          ? `见${wealthStar}${wealthBright ? `（${wealthBright.word}）` : ''}，${ZIWEI_STARS[wealthStar]?.trait || ''}`
          : '无正曜'}，官禄宫${careerStar || '无正曜'}，`
          + `${wealthStar && careerStar ? '财与事业两宫都有主星坐守，说明这两块是可以主动经营的部分' : '有一宫无主星，说明该块更容易受外部条件牵动，宜借势而非强求'}。`
          + (wealthPair ? `${wealthPair.gist}。` : '')
          + `大限推进上，${daxianPalace ? `目前落在${daxianPalace.palace}，这一宫管${palaceFieldOf(daxianPalace.palace)?.field || '这一段的事'}` : '当前阶段'}，下一步会转入相邻的宫位，重心也会跟着挪。`;
      })(),
      advice: `事业上建议做两件事：一是把可积累的东西（技能、资质、作品）做厚；二是${careerStar ? `发挥${careerStar}的优势——${ZIWEI_STARS[careerStar]?.trait || ''}` : '找一个能带你的前辈或平台'}。遇到四化化忌的年份，先守成再谈扩张。`,
      evidence: [
        `财帛 ${wealthStar || '无正曜'}`,
        `官禄 ${careerStar || '无正曜'}`,
        daxianPalace ? `当前大限 ${daxianPalace.palace}` : '',
      ].filter(Boolean),
    },
    {
      key: 'love', label: '爱情与感情',
      text: (() => {
        const spouseBright = brightRead(brightOf(spouse, spouseStar));
        const spousePair = pairOf(spouse);
        const spouseSha = zwMainSha(spouse);
        return `夫妻宫${spouseStar
          ? `主星为${spouseStar}${spouseBright ? `（${spouseBright.word}）` : ''}，感情上的倾向是${ZIWEI_STARS[spouseStar]?.love || '有自己相处的节奏'}`
          : '无正曜，关系状态更多由对方与互动方式决定'}。`
          + (spousePair ? `${spousePair.gist}。` : '')
          + `${spouseSha.length ? `夫妻宫同时见${join(spouseSha)}：${shaLineOf(spouseSha)}煞星不等于定局，更多是提醒你留意沟通方式。` : '夫妻宫未见明显煞星，关系的基调相对平顺。'}`
          + (SX.watch ? `另外，你自带的${SX.watch}这一面，在亲密关系里最容易被放大。` : '');
      })(),
      advice: `感情里${spouseStar ? `参考${spouseStar}的特点：${ZIWEI_STARS[spouseStar]?.love || ''}` : '可以更主动地表达自己的需求'}。有分歧时先说清事实与感受，别急着下结论；关系的好坏取决于两个人怎么做，不取决于这张盘。`,
      evidence: [
        `夫妻宫 ${spouseStar || '无正曜'}`,
        `煞星 ${join(zwSha(spouse)) || '无'}`,
        `夫妻宫支 ${spouse && spouse.branch ? spouse.branch : '—'}`,
      ],
    },
    {
      key: 'health', label: '健康状况',
      text: (() => {
        const healthBright = brightRead(brightOf(health, healthStar));
        const healthSha = zwMainSha(health);
        return `疾厄宫${healthStar
          ? `见${healthStar}${healthBright ? `（${healthBright.word}）` : ''}，传统取象上${ZIWEI_STARS[healthStar]?.health || '需要留意自身的薄弱环节'}`
          : '无正曜，身体状态更多受生活作息直接影响'}。`
          + (healthSha.length
            ? `同时见${join(healthSha)}，按星情只是「${shaNatureOf(healthSha)}」这一层，提示这一块值得比其他部位多一分留意。`
            : '')
          + '这些都是象征性的提示，不构成任何医学判断。';
      })(),
      advice: `把${healthStar ? ZIWEI_STARS[healthStar]?.health?.replace('留意', '').replace('需要留意', '') || '常规' : '常规'}当作体检时重点关注的参考；真正管用的还是规律作息、适度运动与定期检查。身体不舒服请直接就医。`,
      evidence: [
        `疾厄宫 ${healthStar || '无正曜'}`,
        `煞星 ${join(zwSha(health)) || '无'}`,
      ],
    },
  ];

  // ── 命身底色：先把「这张盘是谁」摆出来，再谈逐宫与格局 ──────────
  const soulField = palaceFieldOf('命宫');
  const bodyLands = pick(r.body, 'lands', '');
  const bodyField = palaceFieldOf(bodyLands);
  const identityText = [
    `命宫落在${soul.branch}（${soul && soul.ganzhi ? soul.ganzhi : '—'}），主星${soulStar}${soulBright ? `·${soulBright.word}` : ''}——这一宫管${soulField ? soulField.field : '你自己'}，${SX.gift ? `你身上最能用出去的是${SX.gift}` : S.trait}。`
      + (SX.gift ? lightLine(soulBright, SX) : ''),
    soulPair ? `${soulPair.gist}；要留意的是${soulPair.watch}。` : '',
    bodyLands ? `身宫寄在${bodyLands}——${bodyField ? `${bodyField.field}是后天更容易使上劲的地方` : '这是后天着力点'}，中年以后会越来越明显。` : '',
    `五行局为${pick(r.bureau, 'name', '—')}，${pick(r.daxian, 'startAge', '—')}岁起运：局定的是节奏（几步起、十年一换），不是好坏。`,
    `命主${pick(r, 'lifeMaster', '—')}、身主${pick(r, 'bodyMaster', '—')}：传统把这两颗当作整张盘的定调星，命主看底色，身主看后半程的着力点。`,
  ].filter(Boolean).join('\n');

  // ── 逐宫分析：十二宫各一行清单 + 一句读法 ────────────────────
  const trimDot = (s) => String(s || '').replace(/。$/, '');
  const palaceLines = (r.palaces || []).map((p) => {
    const mains = mainsOf(p);
    const shas = zwSha(p);
    const fus = (p.stars || []).filter((x) => x.type === '辅星' || x.type === '吉星').map((x) => x.name);
    const huas = (p.stars || []).filter((x) => x.mutagen).map((x) => `${x.name}化${x.mutagen}`);
    const selfs = (p.selfHua || []).map((x) => `自化${x.type}`);
    const head = `【${p.palace}·${p.branch}】`
      + `${mains.length ? mains.map((x) => `${x.name}${x.brightness || ''}`).join('·') : '无正曜'}`
      + (fus.length ? `｜吉 ${fus.slice(0, 3).join('、')}` : '')
      + (shas.length ? `｜煞 ${shas.join('、')}` : '')
      + ((huas.length || selfs.length) ? `｜${[...huas, ...selfs].join('、')}` : '');

    const read = [];
    if (mains.length) {
      const pair = starPairOf(mains.map((x) => x.name));
      const ex = starExtraOf(mains[0].name);
      if (pair) read.push(pair.gist);
      else if (ex) read.push(ex.gift);
    } else {
      // 命无正曜时借对宫：三方数组的第四位就是对宫
      const opposite = zwMainStar(zwPalace(r, (p.sanfang || [])[3]));
      read.push(opposite ? `无正曜，借对宫${opposite}来看` : '无正曜，这一宫随环境走');
    }
    if (fus.length) read.push(fuLineOf(fus));
    if (shas.length) read.push(shaLineOf(shas));
    for (const x of (p.stars || []).filter((y) => y.mutagen).slice(0, 2)) read.push(huaInLine(x.mutagen, p.palace));
    const tail = read.filter(Boolean).map(trimDot).join('；');
    return `${head}\n　${tail}。`;
  }).join('\n');
  const palacesText = `十二宫从命宫逆排，每宫管一件事。看一宫不能只看本宫，还要并上它的三方四正（本宫＋对宫＋两个三合宫）——下面先逐宫摊开，再回到整体。\n${palaceLines}`;

  // ── 格局分三层：有利 / 结构提示 / 忌格提醒 ──────────────────
  const PATTERN_TIERS = [
    { tone: 'good', label: '有利格局' },
    { tone: 'neutral', label: '结构提示' },
    { tone: 'bad', label: '忌格提醒' },
  ];
  const patternSections = PATTERN_TIERS.map((t) => {
    const list = patterns.filter((p) => (p.tone || 'neutral') === t.tone);
    if (!list.length) return null;
    return {
      key: `pattern-${t.tone}`,
      label: t.label,
      tone: t.tone === 'neutral' ? 'watch' : t.tone,
      text: list.map((p) => {
        const rd = patternReadOf(p.name, p.tone);
        return `**${p.name}**　${rd.gist}\n　依据：${p.evidence}\n　做法：${rd.advice}`;
      }).join('\n'),
    };
  }).filter(Boolean);
  if (!patternSections.length) {
    patternSections.push({ key: 'pattern-none', label: '格局', text: '本盘未触发内置的常见格局条目。这不代表盘面平淡——格局只是把若干星位组合起个名字，没命中时按宫位与四化逐条看即可。' });
  }

  // ── 行动建议：每条都从盘面事实推出来，能指到具体一宫才写 ──────────
  const adviceItems = [];
  if (SX.gift) {
    adviceItems.push(`把「${SX.gift}」做成招牌：${soulBright && soulBright.tone === 'bad'
      ? `${soulStar}在这宫不得地，长处不会自己显出来，越要挑能发挥它的场子`
      : `${soulStar}${soulBright ? `·${soulBright.word}` : '在命宫'}，顺着这条走最省力`}。`);
  }
  if (daxianPalace && daxianPalace.daxian) {
    const dxf = palaceFieldOf(daxianPalace.palace);
    adviceItems.push(`这几年主线在${daxianPalace.palace}（${daxianPalace.daxian.start}–${daxianPalace.daxian.end}岁）：${dxf ? dxf.field : '这一宫的事'}排前面，力气别摊平。`);
  }
  const jiHua = natalSihua.find((m) => m.type === '忌');
  if (jiHua && jiHua.palace) {
    const jf = palaceFieldOf(jiHua.palace);
    adviceItems.push(`生年化忌落在${jiHua.palace}：${jf ? jf.huaJi : '这一块容易反复'}——别硬顶，把预期调低一点反而顺。`);
  }
  const soulSha = zwMainSha(soul);
  if (soulSha.length) adviceItems.push(`命宫见${join(soulSha)}：${shaLineOf(soulSha)}`);
  const spouseSha2 = zwMainSha(spouse);
  if (spouseSha2.length && !soulSha.length) {
    adviceItems.push(`夫妻宫见${join(spouseSha2)}：${shaLineOf(spouseSha2)}`);
  }
  const adviceText = adviceItems.slice(0, 4)
    .map((t, i) => `${'①②③④'[i]} ${trimDot(t)}`)
    .join('\n') || '这张盘的结构比较平，没有单点特别突出——按现有节奏走，把一件事做完整比开新头更划算。';

  const sections = [
    { key: 'identity', label: '命身底色', text: identityText },
    { key: 'palaces', label: '逐宫分析', text: palacesText },
    ...patternSections,
    { key: 'advice', label: '行动建议', text: adviceText },
    {
      key: 'reasoning', label: '看盘顺序',
      text: [
        `① 先看命宫：${soulFrom}${S.trait ? `，底色是「${S.trait}」` : ''}。命宫回答的是"你是谁"，不是"会遇到什么"。`,
        `② 再看三方四正：${(soul && soul.sanfang) ? soul.sanfang.join('、') : '命/财/官/迁'}，会到的主星是${(() => {
          const names = (soul && soul.sanfang ? soul.sanfang : [])
            .map((n) => zwMainStar(zwPalace(r, n)))
            .filter(Boolean);
          const uniq = [...new Set(names)];
          return uniq.length ? uniq.join('、') : '无正曜';
        })()}——这是你与外界打交道时的常用手法。`,
        natalSihuaText ? `③ 生年四化：${natalSihuaText}。四化比星曜更能指出"你在意什么、哪里会反复"。` : '③ 生年四化：本盘四化信号不明显。',
        `④ 大限：${daxianPalace ? `${daxianPalace.palace}（${daxianPalace.daxian.start}–${daxianPalace.daxian.end}岁）` : '当前阶段'}。紫微里大限比流年重：十年的主题定下来，流年只是其中一年的天气。`,
        lnMutagen ? `⑤ 流年四化：${lnMutagen}${r.flow && r.flow.month ? `；流月命宫 ${r.flow.month.ganzhi}${r.flow.month.palace ? `（${r.flow.month.palace}）` : ''}` : ''}。` : '⑤ 流年四化：信号不明显。',
        '⑥ 落到维度：工作看命宫与官禄的配合；感情看夫妻宫与煞星；健康看疾厄宫——五维度都是上面几步的应用。',
      ].join('\n'),
    },
    {
      key: 'timeline', label: '时间窗',
      text: (() => {
        const list = (r.daxianList || []).slice().sort((a, b) => a.ages[0] - b.ages[0]);
        const idx = list.findIndex((d) => Number.isFinite(age) && age >= d.ages[0] && age <= d.ages[1]);
        const pick3 = list.slice(idx >= 0 ? idx : 0, (idx >= 0 ? idx : 0) + 3);
        const dx = pick3.map((d) => `${d.palace} ${d.ages[0]}–${d.ages[1]}岁·会${(d.mainStars || []).join('') || '—'}${(d.mutagenHits || []).length ? `·${d.mutagenHits.map((m) => m.star + m.type).join('')}` : ''}`).join(' → ');
        const yrs = (r.liunian || []).slice(0, 5).map((l) => `${l.year} ${l.ganzhi} ${l.age}岁·命宫${l.lifePalace ? l.lifePalace.palace : '—'}`).join('；');
        return `大限：${dx || '—'}。\n近五年流年：${yrs || '—'}。\n读法：大限定十年的主题，流年四化指出今年往哪边偏；两层方向相反时，以守住大限主题为主。`;
      })(),
    },
    {
      key: 'quant', label: '量化口径',
      text: '紫微这边只数「宫位里有什么」：大限看落宫与四化命中数、流年看命宫与四化星数；不把星曜折算成分数，也不预测金额与疾病诊断。四化命中数只是结构计数，不等于吉凶强度。',
    },
    {
      key: 'limits', label: '未纳入',
      text: '本盘没有计算：小限与大限的加权、流日流时的具体事项定位、双星组合的强弱细分，以及「三方四正一起飞」的复合飞化（这里只跟单一支化逐宫串连）。四化表取中州派常用口径，其他流派（如飞星派）结论会不同；这些不改变盘面事实，只影响轻重，所以只作方向参考。',
    },
  ];
  if (natalSihua.length) {
    const ke = natalSihua.find((m) => m.type === '科') || null;
    // 宫位名本身可能已带「宫」（如命宫），拼的时候别叠出「命宫宫」
    const palaceWord = (p) => `${p}${String(p).endsWith('宫') ? '' : '宫'}`;
    const kePart = ke
      ? `其中化科是${ke.star}${ke.palace ? `落在${palaceWord(ke.palace)}` : '未上盘'}，`
      : '';
    sections.push({
      key: 'sihua', label: '生年四化',
      text: `你出生年的天干定下四颗化星，落在：${natalSihuaText}。` +
        `读法上，化禄的宫位做起来比较顺手、也容易有人帮忙；化权的宫位偏向由你拿主意、但也更容易用力过猛；化科的宫位自带一层体面与贵人缘，遇到事多半能体面收场；化忌的宫位是你容易在意、也容易反复的地方。` +
        `${kePart}这几处只是长期倾向，落到具体某一年还要配上流年四化一起看，不必把它当成结论。`,
    });
  }

  // 飞星四化：宫干定星、星定落宫，跟着同一支化一路串到成环
  {
    const fc = r.flyChains;
    const word = (p) => `${p}${String(p).endsWith('宫') ? '' : '宫'}`;
    if (fc) {
      const chainOf = (t) => {
        const ch = fc[t];
        if (!ch || !ch.steps.length) return `${t}：命宫这一干不化${t}星`;
        const hops = ch.steps
          .map((s) => `${word(s.from)}（${s.fromStem}）化${t}${s.star}→${word(s.to)}（${s.toBranch}）`)
          .join('；');
        return `${t}：${hops}${ch.closed ? `，绕回${word(ch.path[ch.path.length - 1])}成环` : ''}`;
      };
      const selfs = (r.fly || []).flatMap((p) => (p.flies || [])
        .filter((f) => f.self)
        .map((f) => `${word(p.palace)}（${p.stem}）化${f.type}${f.star}落回本宫`));
      const ji = fc.忌;
      const jiRead = ji && ji.steps.length
        ? `忌这一条最值得盯：${word(ji.from)}化忌入${word(ji.steps[0].to)}，${word(ji.steps[0].to)}的宫干再化忌往下一宫去，${ji.closed ? `最后绕回${word(ji.path[ji.path.length - 1])}` : '走到没有可落的星就停下'}——` +
          `这条线就是你反复着力的那一圈，` +
          `${ji.closed ? '环越短越容易在同一组宫位上打转（传统说「忌出不去」）' : '没成环表示这条力还有落点没走完'}。`
        : '命宫这一干化忌未上盘，忌线不成立。';
      sections.push({
        key: 'fly', label: '四化飞星',
        text: `生年四化说的是「一出场就带着什么」，飞星四化说的是「这一宫自己会去找谁」：宫干定出四颗化星，星落到哪一宫，这一宫的力就往哪边使。` +
          `从命宫出发，四条线各串一遍——${chainOf('禄')}；${chainOf('权')}；${chainOf('科')}；${chainOf('忌')}。` +
          `${jiRead}` +
          `另外，四化落回本宫的是自化：${selfs.length ? selfs.join('、') + '——自己化出去又回到自己，常表现为「说得多、落得少」或一阵一阵的劲头' : '本盘没有自化'}。` +
          `这一层只描方向与牵引，不断吉凶：同样是化忌入某宫，落在生年忌上还是落在生年禄上，味道完全不同，得并着生年四化看。`,
      });
    }
  }

  // 三方四正复合飞化：命宫连同对宫与两个三合宫一起飞，四宫 16 条按落宫归堆
  {
    const fc = r.flyComposite;
    const word = (p) => `${p}${String(p).endsWith('宫') ? '' : '宫'}`;
    if (fc && Array.isArray(fc.sources) && fc.sources.length >= 2) {
      const hubs = fc.targets.filter((t) => t.count >= 2);
      const hubText = hubs.length
        ? hubs.slice(0, 5).map((t) => `${word(t.palace)}收了 ${t.incoming.map((x) => `${word(x.from)}化${x.type}${x.star}`).join('、')}`).join('；')
        : '四宫化出去之后没有落在同一宫，力是散开的';
      const readings = [];
      if (fc.groups.doubleJi.length) {
        readings.push(`${fc.groups.doubleJi.map((t) => word(t.palace)).join('、')}收到两个以上的忌——同一件事被反复牵动，传统看作那一宫的事务容易拖着不放`);
      }
      if (fc.groups.luJi.length) {
        readings.push(`${fc.groups.luJi.map((t) => word(t.palace)).join('、')}禄忌同宫：好处与在意的地方绑在一起，越想要的东西越容易反复`);
      }
      if (fc.groups.tripleHua.length) {
        readings.push(`${fc.groups.tripleHua.map((t) => word(t.palace)).join('、')}三化以上会宫：那一宫同时被几种力牵住，常常是这张盘最忙的地方`);
      }
      if (fc.groups.selfHua.length) {
        readings.push(`${fc.groups.selfHua.map((t) => word(t.palace)).join('、')}自化：宫干化出去又落回自己，表现为力气绕回原处`);
      }
      sections.push({
        key: 'flyComposite',
        label: '三方四正飞化',
        text: `上一节是命宫一条线往下追；这一节把命宫连同对宫与两个三合宫（${fc.sanfang.join('、')}）一起飞：四宫各化禄权科忌，共 16 条飞化（星未上盘的只记星不记落宫），按落宫归堆。` +
          `${hubText}。` +
          `${readings.length ? `${readings.join('；')}。` : ''}` +
          `读法上，会在一处的化越多，那一宫被牵动的力道越集中；落单的飞化只说明方向，不单独取象。这一层同样只描会照与方向，不折吉凶，也没有叠大限与流年四化。`,
      });
    }
  }

  // 流月/流日/流时：流年只回答「今年」，再往下才是「这个月」「这两天」
  if (r.flow) {
    const f = r.flow;
    const at = (p) => `${p.ganzhi || '—'}${p.palace ? `落${p.palace}` : ''}`;
    const hits = (p) => (p.mutagenHits || []).map((m) => `${m.star}化${m.type}${m.palace ? `→${m.palace}` : ''}`).join('、');
    sections.push({
      key: 'flow',
      label: '流月 · 流日 · 流时',
      text: `以 ${f.asOf.solar}（农历 ${f.asOf.lunar}，流年 ${f.asOf.yearGanzhi}，斗君 ${f.year.doujun}）为准往下推：` +
        `流月命宫 ${at(f.month)}，四化 ${hits(f.month) || '不明显'}；` +
        `流日命宫 ${at(f.day)}，四化 ${hits(f.day) || '不明显'}；` +
        `流时命宫 ${at(f.hour)}，四化 ${hits(f.hour) || '不明显'}。` +
        `这三层的读法不一样：流月管的是一整个月的节奏，适合拿来做「这个月该推进还是该收」的判断；` +
        `流日和流时颗粒度太细，更容易被临时因素打断，看它们不如说是在看「今明两天的情绪底色」，不必逐条对号入座。`,
    });
  }

  // 一页读懂：五条结论（整体 / 事业 / 财富 / 感情 / 节奏），全部取自下面已算好的字段
  const outline = [
    { key: 'overall', label: '整体', text: `命宫${soulStar}${soulOwn ? '' : '（借对宫）'}${S.trait ? `，${S.trait}` : ''}` },
    { key: 'career', label: '事业', text: `官禄${careerStar || '无正曜'}` },
    { key: 'wealth', label: '财富', text: `财帛${wealthStar || '无正曜'}` },
    { key: 'love', label: '感情', text: `夫妻${spouseStar || '无正曜'}` },
    {
      key: 'rhythm', label: '节奏',
      text: daxianPalace && daxianPalace.daxian
        ? `当前大限${daxianPalace.palace}（${daxianPalace.daxian.start}–${daxianPalace.daxian.end}岁）${r.liunian?.[0]?.year ? `，${r.liunian[0].year} 流年` : ''}`
        : '当前大限未取到',
    },
  ];
  // 三张表：大限 / 流年 / 触发事件（大限四化）。只摊平已有字段，不加新判断。
  const daxianSorted = (r.daxianList || []).slice().sort((a, b) => a.ages[0] - b.ages[0]);
  const tables = [
    {
      key: 'daxian', title: '大限表', columns: ['大限', '年龄', '会主星', '四化'],
      rows: daxianSorted.map((d) => [
        d.palace,
        `${d.ages[0]}–${d.ages[1]}`,
        (d.mainStars || []).join('、'),
        (d.mutagenHits || []).map((m) => `${m.star}${m.type}→${m.palace}`).join('、'),
      ]),
    },
    {
      key: 'liunian', title: '流年表（近六年）', columns: ['年份', '干支', '年龄', '命宫', '四化'],
      rows: (r.liunian || []).slice(0, 6).map((l) => [
        String(l.year),
        l.ganzhi,
        String(l.age),
        l.lifePalace ? l.lifePalace.palace : '—',
        (l.mutagen || []).join('、'),
      ]),
    },
  ];
  const triggerRows = daxianSorted
    .flatMap((d) => (d.mutagenHits || []).map((m) => [
      `${d.palace}（${d.ages[0]}–${d.ages[1]}岁）`,
      `${m.star}化${m.type}→${m.palace}`,
      `大限${d.palace}引动`,
    ]))
    .slice(0, 12);
  if (triggerRows.length) {
    tables.push({ key: 'triggers', title: '触发事件表（大限四化）', columns: ['大限', '触发', '依据'], rows: triggerRows });
  }

  return {
    lead: `紫微斗数看的是你与环境的互动方式。下面按五个维度拆开，讲的是性格与处境的倾向，具体怎么选仍然在你。`,
    dimensions, sections, outline, tables,
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

function liuyaoInterpret(r, ask) {
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
  // 卦体关系（六冲/六合/伏吟/反吟）：由纳甲地支推导，见 engine/liuyao.js bodyRelations
  const bd = isObj(r.body) ? r.body : {};
  const bodyLabelList = (bd && Array.isArray(bd.labels)) ? bd.labels : bodyLabels(bd);
  // 取象依据：卦象类的"依据"就是卦面本身，提炼成一行便于核对
  const cnt = (k) => lines.filter((l) => l.liuqin === k).length;
  const lineEv = (l) => (l ? `${l.position}爻${l.liuqin}${l.liushen ? '·' + l.liushen : ''}${l.moving ? '（动）' : ''}` : '—');
  const ev = (...xs) => xs.filter((x) => x != null && x !== '');

  sections.push({
    key: 'liuqin', label: '六亲取用',
    text: `这一卦里，${movingLiuqin ? `动爻落在${movingLiuqin}（${LIUQIN_USE[movingLiuqin] || ''}）` : '没有发动的六亲'}。` +
      `如果你心里有具体问题，可以对号入座：${Object.entries(LIUQIN_USE).map(([k, v]) => `${k}主${v.split('，')[0]}`).join('；')}。`,
  });

  // 看卦顺序：卦象类的"依据"是卦面本身，但先看什么、后看什么同样要讲清
  sections.push({
    key: 'reasoning', label: '看卦顺序',
    text: [
      `① 先定卦宫：本卦「${ben.name || '—'}」属${String(pick(ben, 'palace', '—')).replace(/宫$/, '')}宫（${palaceEl || '—'}），六亲由此排定——宫变了，同一个字的六亲就变了。`,
      `② 再看世应：世在${ben.shi}爻（${shiLine ? `${shiLine.liuqin}${shiLine.liushen ? `·${shiLine.liushen}` : ''}` : '—'}），应在${ben.ying}爻（${yingLine ? `${yingLine.liuqin}` : '—'}）；世代表你，应代表对方与环境。`,
      `③ 看动爻：${moving ? `${moving.position}爻${moving.liuqin}${moving.liushen ? `（${moving.liushen}）` : ''}发动，事情的变化点在这里` : '六爻安静，短期不会有大的转折'}。`,
      `④ 定用神：按所问之事取六亲——问工作看官鬼、文书看父母、求财与感情（男）看妻财、健康看官鬼与子孙；用神不上卦时，看伏神或借日月。`,
      `⑤ 看日辰：${dayGZ || '—'}日起六神、定旬空；日辰能生克动爻，但不被爻所伤。`,
      `⑥ 看变卦：${bian.name ? `变出「${bian.name}」，是事情后续的走向` : '本卦无变，以静卦论'}。以上每一步都能在下方「依据」里对上号。`,
    ].join('\n'),
  });
  // 卦体关系：六冲/六合讲"聚散"，伏吟讲"原地"，反吟讲"反复"——只描述动势，吉凶仍归用神
  if (bodyLabelList.length) {
    const sideOf = (o) => [o && o.inner ? '内卦' : '', o && o.outer ? '外卦' : ''].filter(Boolean).join('、');
    const fanYinSides = sideOf(bd.fanYin || {});
    const fanYinBy = ['inner', 'outer'].map((k) => bd.fanYin && bd.fanYin[k] && bd.fanYin[k].by).filter(Boolean).flat();
    const bodyText = [];
    if (bd.ben && bd.ben.chong) bodyText.push('本卦是六冲卦：六爻地支正好配成子午、寅申、辰戌三组对冲，传统读作「散」——事情起落快、成得急也散得急，急事与近病反而喜欢这股冲开的力量，拖了很久的人事则不容易凝聚。');
    if (bd.ben && bd.ben.he) bodyText.push('本卦是六合卦：六爻地支两两相合（子丑、寅亥、卯戌、辰酉、巳申、午未），传统读作「成」——容易谈拢，也容易拖住不放。');
    if (bd.bian && bd.bian.chong) bodyText.push('变卦也是六冲：往后走偏「散」，收尾容易一拍两散，也可能是速战速决。');
    else if (bd.bian && bd.bian.he) bodyText.push('变卦是六合：往后走偏「合」，收尾倾向于合拢、或者就这么延续下去。');
    if (sideOf(bd.fuYin || {})) bodyText.push(`${sideOf(bd.fuYin || {})}伏吟：卦变了，纳甲地支却没变（六十四卦里只有乾与震共用子寅辰/午申戌，所以卦伏吟只会出在乾↔震互换）——传统说「伏吟主呻吟」，人想动、事情在原地打转，宜先看清楚再迈步。`);
    if (fanYinSides) bodyText.push(`${fanYinSides}反吟：变卦与本卦相冲，来源有两种——${fanYinBy.includes('chong') ? '地支三爻全冲' : ''}${fanYinBy.includes('chong') && fanYinBy.includes('pair') ? '，或' : ''}${fanYinBy.includes('pair') ? '本卦之宫与变卦之宫在后天八卦上正对（乾巽、坎离、艮坤、震兑）' : ''}。传统说「反吟主反复」，去而复来、方案改来改去。`);
    if (bd.yaoFanYin && bd.yaoFanYin.length) bodyText.push(`动爻反吟（第${bd.yaoFanYin.join('、')}爻）：变出的地支回头冲本爻，变化点本身在反复——动了又翻回来，等于绕一圈回到原处。`);
    if (bd.yaoFuYin && bd.yaoFuYin.length) bodyText.push(`动爻伏吟（第${bd.yaoFuYin.join('、')}爻）：变出的地支与本爻同支，动了等于没动，想推的事会卡在同一道坎上。`);
    const jinYao = (bd.jinTui || []).filter((x) => x.type === '进');
    const tuiYao = (bd.jinTui || []).filter((x) => x.type === '退');
    if (jinYao.length) bodyText.push(`化进神（第${jinYao.map((x) => x.position).join('、')}爻：${jinYao.map((x) => `${x.from}→${x.to}`).join('、')}）：变出的地支与本爻同五行、且顺着往前一步，传统读作「进」——这一爻代表的人或事有后劲，往前走比退回去顺。`);
    if (tuiYao.length) bodyText.push(`化退神（第${tuiYao.map((x) => x.position).join('、')}爻：${tuiYao.map((x) => `${x.from}→${x.to}`).join('、')}）：变出的地支与本爻同五行、却倒着退一步，传统读作「退」——这一爻代表的人或事渐渐退气，别按原来的势头去推。`);
    const jp = r.jinTuiPower;
    if (jp && Array.isArray(jp.lines) && jp.lines.length) {
      bodyText.push(`进退的力重（放回月建日辰看）：${jp.lines.map((l) => `第${l.position}爻${l.say}`).join('；')}。进退只管方向，走不走得动看时令托不托着；用神化进为喜，忌神化进反而是忌。`);
    }
    bodyText.push('这些标签只说明卦体的动势，不直接定吉凶：同一支六冲，近病问的是速愈、久病问的是凶险；同一爻化进，也得看用神旺不旺、有没有月建日辰托着。');
    sections.push({ key: 'body', label: '卦体关系', text: bodyText.join('\n') });
  }

  // 用神与卦体联动：卦体只说动势，落到用神身上才有指向
  const ug = yongshenOf(r, {
    direction: (ask && ask.direction) || (r.useGod && r.useGod.direction) || 'general',
    gender: (r.useGod && r.useGod.gender) || 'male',
  });
  if (ug && ug.liuqin) {
    const useText = [];
    useText.push(`所问方向取${ug.byShi ? '世爻' : ug.liuqin}为用神（${ug.ask}）${ug.direction === 'love' ? `；感情按${ug.gender === 'female' ? '女命看官鬼' : '男命看妻财'}取，性别未给时按男命算` : ''}。`);
    if (ug.found.length) {
      useText.push(`用神在卦上：${ug.found.map((f) => `${f.position}爻${f.ganzhi}${f.element}${f.liuqin}${f.liushen ? `·${f.liushen}` : ''}${f.shi ? '（持世）' : ''}${f.ying ? '（临应）' : ''}${f.moving ? '（发动）' : ''}${f.kong ? '（旬空）' : ''}`).join('、')}${ug.side ? `，落在${ug.side}` : ''}。`);
      if (ug.found.length > 1) useText.push('用神两现：传统取动者、取持世者、取旬空待填者，各派权重不同；这里只把几处都列出来，不替你选哪一爻当主用。');
    } else if (ug.fushen.length) {
      useText.push(`用神不上卦：本卦六爻里没有${ug.liuqin}，按「用神不上卦则于本宫首卦内寻之」，到${String(pick(ben, 'palace', '')).replace(/宫$/, '')}宫首卦取伏神——${ug.fushen.map((f) => `${f.position}爻${f.ganzhi}${f.element}，伏于飞神${f.fei ? `${f.fei.liuqin}${f.fei.ganzhi}${f.fei.element}` : '—'}之下`).join('；')}。`);
      if (ug.relationSay.length) useText.push(`飞伏生克：${ug.relationSay.join('；')}。伏神要得出才算有力，藏在忌神之下且被克，则虽有如无。`);
      const chufu = r.fushenAccess;
      if (chufu && Array.isArray(chufu.items) && chufu.items.length) {
        useText.push(`伏神出伏的条件：${chufu.items.map((f) => f.say).join('；')}。`);
        useText.push('「助」与「压」只把飞伏生克、月建日辰与月破并列摆出，再归成四档（可出 / 有助有压 / 受压难出 / 未得助）；不排各家优先级，旬空只标出、不并入档位，也不给应期日期。');
      }
    } else {
      useText.push(`用神不上卦，且本宫首卦里也没找到${ug.liuqin}，这一问在卦面上没有直接对应物，只能借日月或改日再占。`);
    }

    // 卦体落在用神身上的读法：同一支卦体，落到用神与落到忌神是两个意思
    const link = [];
    if (bd.ben && bd.ben.chong) link.push('用神在六冲卦里：六冲主散，急事与近病借这股冲开的力量，缓事、久拖的人事则不容易凝聚');
    if (bd.ben && bd.ben.he) link.push('用神在六合卦里：六合主成，容易谈拢，也容易黏住不放');
    if (bd.bian && bd.bian.chong) link.push('用神逢变六冲：往后走向偏散，收尾容易一拍两散，也可能是速战速决');
    else if (bd.bian && bd.bian.he) link.push('用神逢变六合：往后走向偏合，倾向于合拢或就这么延续');
    for (const side of ['inner', 'outer']) {
      const nm = side === 'inner' ? '内卦' : '外卦';
      if (bd.fuYin && bd.fuYin[side]) link.push(`用神在${nm}伏吟：动而地支未变，想推的事卡在原地`);
      if (bd.fanYin && bd.fanYin[side]) link.push(`用神在${nm}反吟：变卦与本卦相冲，用神这一头去而复来、定了又改`);
    }
    const jinYong = (bd.jinTui || []).filter((x) => x.type === '进' && ug.found.some((f) => f.position === x.position));
    const tuiYong = (bd.jinTui || []).filter((x) => x.type === '退' && ug.found.some((f) => f.position === x.position));
    if (jinYong.length) link.push(`用神化进神（${jinYong.map((x) => `${x.from}→${x.to}`).join('、')}）：这一爻有后劲，顺着推比退回去顺`);
    if (tuiYong.length) link.push(`用神化退神（${tuiYong.map((x) => `${x.from}→${x.to}`).join('、')}）：这一爻渐渐退气，别按原来的势头硬推`);
    if (ug.found.some((f) => f.kong)) link.push('用神旬空：事情先悬着，传统说空要出空、填实才算落地');
    if (ug.found.some((f) => (bd.yaoFanYin || []).includes(f.position))) link.push('用神这一爻动而反吟：变化点本身在反复，动了又翻回来');
    if (ug.found.some((f) => (bd.yaoFuYin || []).includes(f.position))) link.push('用神这一爻动而伏吟：动了等于没动，容易卡在同一道坎上');
    if (link.length) useText.push(`与卦体对起来看：${link.join('；')}。`);
    // 旺衰：月建与日辰都从外部推得，只报状态，不折成分数
    const strength = r.useGodStrength;
    if (strength && strength.lines && strength.lines.length) {
      const head = strength.month && strength.month.branch
        ? `月建 ${strength.month.branch}（${strength.month.element}）`
        : '没有月建（未给起卦时间），只按日辰看';
      const body = strength.lines.map((l) => {
        const chong = l.monthChong ? '，遭月建冲（月破）'
          : l.dayChong ? (l.kong ? '，日辰冲空' : l.moving ? '，逢日辰冲' : '，日辰冲而暗动') : '';
        return `${l.position}爻${l.branch}${l.element}：月建${l.monthState}（${l.monthSay}），${l.dayRelation}（${l.daySay}）${chong}`;
      });
      useText.push(`时令对用神：${head}，日辰 ${strength.day ? `${strength.day.branch}（${strength.day.element}）` : '—'}。${body.join('；')}。`);
      useText.push('月建看这一段时令站在哪一边，日辰看当天那股力量是扶还是克；两处同时看，只报状态，不折成分数。');
    }
    useText.push('这一层只把用神、卦体与时令对起来，不折成分数、不断成败；应期另在「应期线索」一节只给触发支与快慢。');
    sections.push({ key: 'yongshen', label: '用神落位与卦体', text: useText.join('\n') });
  }

  // 应期线索：只给触发支与快慢方向，不给日期
  {
    const yq = r.yingqi;
    if (yq && Array.isArray(yq.items) && yq.items.length) {
      const rows = yq.items.map((it) => {
        const flags = [
          it.monthState && it.monthState !== 'unknown' ? `月建${it.monthState}` : '',
          it.monthChong ? '月破' : '',
          it.kong ? '旬空' : '',
        ].filter(Boolean).join('、');
        return `${it.position}爻${it.branch}${it.element}${flags ? `（${flags}）` : ''}：${it.tempoSay}`;
      });
      sections.push({
        key: 'yingqi',
        label: '应期线索',
        text: `应期快慢：${yq.tempoSay}。${rows.join('；')}。可留意的地支：${yq.triggers.map((t) => `${t.branch}（${t.labels.join('、')}）`).join('；')}。` +
          `${yq.viaFushen ? '用神不上卦，这里的支取自伏神；伏神要先得出才算数。' : ''}` +
          '这一节只把传统的「逢值、逢冲、逢合」与旬空的出空、冲空摆出来，不换算成具体日期、不排先后、也不判忌神受制；近事以日计、远事以月计，用哪把尺取决于事情本身。',
      });
    }
  }

  // 全卦逐爻旺衰：不挑用神，六爻都过一遍，看整张卦的气压在哪一头
  {
    const hs = r.hexStrength;
    if (hs && Array.isArray(hs.lines) && hs.lines.length) {
      const head = hs.month && hs.month.branch
        ? `月建 ${hs.month.branch}（${hs.month.element}）`
        : '没有月建（未给起卦时间）';
      const day = hs.day && hs.day.branch ? `日辰 ${hs.day.branch}（${hs.day.element}）` : '日辰 —';
      const rows = hs.lines.map((l) => {
        const who = l.shi ? '（世）' : l.ying ? '（应）' : '';
        const flags = `${l.moving ? '·动' : ''}${l.kong ? '·旬空' : ''}`;
        return `${l.position}爻${l.liuqin ? l.liuqin : ''}${l.branch}${l.element}${who}${flags}：月建${l.monthState}，${l.dayRelation}${l.chongTag ? `，${l.chongTag}` : ''}`;
      });
      const order = ['旺', '相', '休', '囚', '死'];
      const dist = order.filter((k) => hs.counts[k]).map((k) => `${k}${hs.counts[k]}`).join('、');
      const shi = hs.shi ? `世爻在${hs.shi.position}爻（月建${hs.shi.monthState}，${hs.shi.dayRelation}）` : '';
      const ying = hs.ying ? `应爻在${hs.ying.position}爻（月建${hs.ying.monthState}，${hs.ying.dayRelation}）` : '';
      sections.push({
        key: 'hexStrength',
        label: '全卦逐爻旺衰',
        text: `整张卦按${head}、${day}逐爻过一遍：${rows.join('；')}。五态分布：${dist}——${[shi, ying].filter(Boolean).join('，')}。` +
          `气旺的爻对应的事推进起来省力，气弱或遭月破的爻对应的事宜缓；这只是六爻全貌，用神那几爻的细节仍以上一节为准，两处不冲突时再看动爻把哪一头带动。` +
          `判定与用神旺衰同一套（月令五态、日辰五关系、月破/暗动/冲空），只报状态，不折成分数。`,
      });
    }
  }

  sections.push({
    key: 'limits', label: '未纳入',
    text: '本卦没有计算：用神两现时该取哪一爻的权重、应期的具体日期（只给逢值/逢冲/逢合的触发支与快慢方向）、忌神受制的时点、动变连环。化进/化退的力重只按月建五态给「得令/失令」这类档位，不折成加权分数；这些都会改变"旺不旺"的判断，所以这里只给取象与方向。',
  });

  const dimensions = [
    {
      key: 'overall', label: '整体运势',
      text: `这一卦是「${benInfo.full}」，${benInfo.meaning}。${movingLiushen ? `动爻带${movingLiushen}，事情带一点${movingLiushen === '青龙' ? '喜庆顺遂' : movingLiushen === '白虎' ? '压力与阻碍' : movingLiushen === '朱雀' ? '口舌与是非' : movingLiushen === '玄武' ? '不明朗、需要核实' : '反复与牵扯'}的色彩。` : ''}` +
        `日辰为${dayGZ}，卦宫属${palaceEl}，整体更像是${benInfo.scene}的阶段。`,
      advice: `${benInfo.scene}——顺着这句做就行。${moving ? '既然有动爻，说明事情还在变化，先观察几天再定也不迟。' : '暂无动爻，说明短期内不会有大的转折，维持现状反而是稳妥选择。'}`,
      evidence: ev(
        `本卦 ${ben.name || '—'}（${ben.upper || ''}/${ben.lower || ''}）`,
        moving ? `动爻 ${lineEv(moving)}` : '无动爻',
        `日辰 ${dayGZ || '—'}`,
        `卦宫 ${pick(ben, 'palace', '—')}·${palaceEl || '—'}`,
        bodyLabelList.length ? `卦体 ${bodyLabelList.join('、')}` : '卦体 无六冲六合伏吟反吟',
      ),
    },
    {
      key: 'work', label: '工作与职业选择',
      text: `问工作看官鬼与父母：本卦中${(lines.filter((l) => l.liuqin === '官鬼').length ? `官鬼出现${lines.filter((l) => l.liuqin === '官鬼').length}处，${lines.find((l) => l.liuqin === '官鬼').moving ? '且有发动，岗位或考核层面会有动作' : '但未发动，职位层面暂时平稳'}` : '未见官鬼，工作这件事在卦中不是主要矛盾')}；` +
        `${(lines.filter((l) => l.liuqin === '父母').length ? '父母（文书、合同、资质）有出现，涉及手续与材料的事要提前准备' : '父母未现，手续类事务暂无明显阻碍')}。`,
      advice: `如果正在看机会，建议先把合同、岗位职责这些落到纸面上的东西问清楚；${moving?.liuqin === '官鬼' ? '动爻在官鬼，工作层面近期有变动的迹象，可以主动谈，但别先辞再找。' : '工作层面暂无强动象，稳住手上的事更划算。'}`,
      evidence: ev(
        `官鬼 ${cnt('官鬼')} 现`,
        `父母 ${cnt('父母')} 现`,
        movingLiuqin ? `动爻六亲 ${movingLiuqin}` : '无动爻',
      ),
    },
    {
      key: 'career', label: '事业发展',
      text: `世爻（代表你）在${ben.shi}爻${shiLine ? `，六亲为${shiLine.liuqin}，${shiLine.moving ? '且发动' : '安静未动'}` : ''}；应爻（代表对方与环境）在${ben.ying}爻${yingLine ? `，六亲为${yingLine.liuqin}` : ''}。` +
        `世应之间${shiLine && yingLine ? (shiLine.liuqin === yingLine.liuqin ? '同气相求，双方立场接近' : '立场有别，需要多沟通') : '信号不明'}，` +
        `${bianInfo ? `变卦「${bianInfo.full}」提示后续走向是${bianInfo.scene}` : '暂无变卦'}。`,
      advice: `事业上的建议是：${shiLine?.moving ? '你自己这边有主动变化的意思，那就把想法说出来、把动作做出来' : '先不动，把手上的事做扎实'}；${bianInfo ? `按${bianInfo.scene}的方向去准备，会比被动等结果好。` : ''}`,
      evidence: ev(
        `世 ${lineEv(shiLine)}`,
        `应 ${lineEv(yingLine)}`,
        bian.name ? `变卦 ${bian.name}` : '无变卦',
      ),
    },
    {
      key: 'love', label: '爱情与感情',
      text: `问感情，男看妻财、女看官鬼。本卦中${(lines.filter((l) => l.liuqin === '妻财').length ? `妻财${lines.filter((l) => l.liuqin === '妻财').length}现${lines.find((l) => l.liuqin === '妻财').moving ? '且发动，感情层面有动静' : '但安静，关系暂时平缓'}` : '妻财未现，感情不是当前卦象的重点')}；` +
        `${(lines.filter((l) => l.liuqin === '官鬼').length ? '官鬼有现，对方或关系中的压力面是被看到的' : '官鬼未现')}。${benInfo.meaning}，放在关系里就是${benInfo.scene}。`,
      advice: `关系里${moving?.liuqin === '妻财' || moving?.liuqin === '官鬼' ? '近期有变化的可能，适合把话说开，别憋着' : '暂时平稳，可以按自己的节奏相处'}。卦象只给倾向，真正决定关系的是你们怎么沟通。`,
      evidence: ev(
        `妻财 ${cnt('妻财')} 现`,
        `官鬼 ${cnt('官鬼')} 现`,
        `世应 ${lineEv(shiLine)} / ${lineEv(yingLine)}`,
      ),
    },
    {
      key: 'health', label: '健康状况',
      text: `问健康，看官鬼（病）与子孙（医药、消散）。本卦中${(lines.filter((l) => l.liuqin === '官鬼').length ? `官鬼有现${lines.find((l) => l.liuqin === '官鬼').moving ? '且发动，提示身体上可能有需要留意的地方' : '，但安静，暂无明显变化'}` : '官鬼未现，卦象未指向明显的身体问题')}；` +
        `${(lines.filter((l) => l.liuqin === '子孙').length ? '子孙有现，恢复与调养的出口是有的' : '子孙未现，休息与调养需要自己主动安排')}。${movingLiushen === '白虎' ? '动爻带白虎，尤其别忽视突发的身体信号。' : ''}`,
      advice: `这一卦在健康上的提醒是${(lines.filter((l) => l.liuqin === '官鬼').length ? '别硬扛，累了就休息，有机会就做一次检查' : '维持现有作息即可，别自己吓自己')}。任何不适请就医，卦象不能替代诊断。`,
      evidence: ev(
        `官鬼 ${cnt('官鬼')} 现`,
        `子孙 ${cnt('子孙')} 现`,
        movingLiushen ? `动爻六神 ${movingLiushen}` : '',
      ),
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
      evidence: [
        `本卦 ${benInfo.full}`,
        `互卦 ${pick(hu, 'name', '—')}`,
        `变卦 ${pick(bian, 'name', '—')}`,
        `体${bodyEl} / 用${useEl}·${relation || '—'}`,
        `判定 ${mhLevel || '—'}`,
      ].filter(Boolean),
    },
    {
      key: 'work', label: '工作与职业选择',
      text: `梅花里工作看用卦与体卦的生克：现在用卦${useEl}${isJi ? '对体卦有利，说明当下的工作环境或岗位与你的匹配度还不错' : isXiong ? '与体卦相耗，说明眼下这份工作消耗感偏重' : '与体卦关系平和，属于不好不坏'}` +
        `。本卦${benInfo.meaning}，对应到工作里就是${benInfo.scene}。`,
      advice: `${isXiong ? '如果长期觉得被消耗，可以先在内部争取调整职责，再考虑外部机会' : isJi ? '适合主动争取更多责任或更好的岗位' : '把手上的事做好，等一个明确的信号再动'}。选工作时优先考虑让你舒服的环境，长期看比短期收益重要。`,
      evidence: [`体卦 ${bodyEl}`, `用卦 ${useEl}`, `体用 ${relation || '—'}`],
    },
    {
      key: 'career', label: '事业发展',
      text: `变卦「${bianInfo ? bianInfo.full : ''}」代表事情的结局方向，${bianInfo ? bianInfo.meaning : ''}。互卦「${pick(hu, 'name', '')}」代表过程，${hexInfo(hu.name, hu.upper, hu.lower).meaning}。` +
        `合起来看：过程${hexInfo(hu.name, hu.upper, hu.lower).scene}，结果${bianInfo ? bianInfo.scene : '暂不明朗'}。`,
      advice: `按这个结构，建议${isJi ? '现在就把关键的一步迈出去' : isXiong ? '先补短板、攒条件，等下一轮再动' : '小步推进，边做边看'}。动爻在${pick(r, 'movingName', '某爻')}，变化点就在那里，值得重点关注。`,
      evidence: [
        `互卦 ${pick(hu, 'name', '—')}`,
        `变卦 ${pick(bian, 'name', '—')}`,
        `动爻 ${pick(r, 'movingName', '—')}`,
      ],
    },
    {
      key: 'love', label: '爱情与感情',
      text: `感情上看体用是否相合：体${bodyEl}与用${useEl}之间是${relation}，${isJi ? '这种组合在关系里意味着双方相处比较顺，彼此能给到支撑' : isXiong ? '这种组合提示相处中有一方付出更多，需要留意平衡' : '关系处在常态，没有特别的张力'}` +
        `。本卦${benInfo.meaning}，放到两人之间就是${benInfo.scene}。`,
      advice: `${isXiong ? '别把不满攒着，找个合适的时机说清楚；也别指望对方猜' : isJi ? '可以主动推进关系，做一些共同的事' : '维持现在的相处节奏就好'}。卦象看的是当下的气氛，关系的走向取决于你们怎么经营。`,
      evidence: [
        `体 ${bodyEl} / 用 ${useEl}`,
        `体用 ${relation || '—'}`,
        `本卦 ${benInfo.full}`,
      ],
    },
    {
      key: 'health', label: '健康状况',
      text: `梅花里健康看体卦的强弱：体卦${pick(bu.body, 'trigram', '')}属${bodyEl}，${isXiong ? '被用卦所耗，传统取象上提示近期精力消耗偏大' : isJi ? '得到生扶，精力状态相对好' : '平顺，无明显偏枯'}。` +
        `${WUXING_ORGAN[bodyEl] ? `${bodyEl}对应${WUXING_ORGAN[bodyEl].part}，${WUXING_ORGAN[bodyEl].note}。` : ''}这是取象提示，不是诊断。`,
      advice: `${isXiong ? '近期别硬撑，睡眠与饮食先稳住，有条件做一次常规体检' : '保持现在的作息即可，顺势多动一动更好'}。身体有明确的症状请直接看医生。`,
      evidence: [
        `体卦 ${pick(bu.body, 'trigram', '—')}属${bodyEl}`,
        `用卦 ${pick(bu.use, 'trigram', '—')}属${useEl}`,
        `体用 ${relation || '—'}`,
      ],
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
  // 这几个值在「看课顺序」里就要用到，必须先声明再拼 sections（否则 TDZ 报错被 catch 吞掉）
  const chuQin = pick(chu, 'liuQin', '');
  const moQin = pick(mo, 'liuQin', '');
  const hasKong = !!(chu.xunKong || zhong.xunKong || mo.xunKong);
  const scText = JSON.stringify(sc);
  const has = (x) => scText.includes(x);
  const chuan = `初${pick(chu, 'zhi', '—')} → 中${pick(zhong, 'zhi', '—')} → 末${pick(mo, 'zhi', '—')}`;

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
      text: `本课为${pick(gj, 'name', '未定')}${gj.detail ? `（${gj.detail}）` : ''}。${ke.length ? `四课：${ke.map((k, i) => `${i + 1}课 ${k.shang || ''}上${k.xia || ''}下`).join('　')}` : ''}`,
    },
    {
      key: 'reasoning', label: '看课顺序',
      text: [
        `① 先看月将加时：月将${pick(r.yueJiang, 'name', '—')}${pick(r.yueJiang, 'zhi', '')}加在${pick(r, 'hourZhi', '—')}时上，定出天地盘——后面所有关系都从这张盘推。`,
        `② 再看四课：日干寄宫起一课，日支起二课，依次得三、四课；四课是"事情的四个面"。`,
        `③ 看三传：初传${pick(chu, 'zhi', '—')}（${chuQin || '—'}）起，中传${pick(zhong, 'zhi', '—')}（${pick(zhong, 'liuQin', '—')}），末传${pick(mo, 'zhi', '—')}（${moQin || '—'}）落——发端、过程、结局。`,
        `④ 定课体：${pick(gj, 'name', '未定')}${gj.detail ? `（${gj.detail}）` : ''}；课体决定这件事"以什么方式"推进，不是吉凶标签。`,
        `⑤ 看神将：月将、贵人与旬空决定信号强弱；旬空处多为"看着有、实则虚"，须核实。`,
        '⑥ 落到维度：工作看官鬼与青龙、朱雀；感情看六合、天后与妻财；健康看白虎与子孙——都是上面几步的应用。',
      ].join('\n'),
    },
    {
      key: 'limits', label: '未纳入',
      text: '本课没有计算：年命与行年（命上神）、神煞的加权轻重、伏吟反吟的细分，以及课体之间的互涉。三传只取九宗门里的主要取法，其他流派（如以贵神起课）结论可能不同；这些只影响轻重，不改变课面事实。',
    },
  ];

  const dimensions = [
    {
      key: 'overall', label: '整体运势',
      text: `这一课${pick(gj, 'name', '')}${gj.detail ? `·${gj.detail}` : ''}，发端在${pick(chu, 'zhi', '')}（${jiangOf(chu) || ''}），落定在${pick(mo, 'zhi', '')}（${jiangOf(mo) || ''}）。` +
        `${hasKong ? '课中有旬空，提示事情里有「看着有、实则虚」的部分，涉及承诺与数字的要核实。' : '课中无旬空，事情相对实在。'}` +
        `整体倾向是：${/吉|生|合/.test(jiangOf(chu) + jiangOf(mo)) ? '开局与结局的象都不差，可以正常推进' : /虎|蛇|勾|空/.test(jiangOf(chu) + jiangOf(mo)) ? '过程中有牵绊与不明朗处，宜慢不宜快' : '平顺中带一点摩擦' }。`,
      advice: `${hasKong ? '先把信息核实清楚，别在含糊的基础上做决定' : '按你原本的计划推进即可'}。${/虎/.test(jiangOf(chu)) ? '开局带白虎，头几天别硬碰，先观察。' : ''}事情的局面是动态的，这一课看的是当下这一刻的气象。`,
      evidence: [
        `课体 ${pick(gj, 'name', '—')}`,
        `三传 ${chuan}`,
        `月将 ${pick(r.yueJiang, 'name', '—')}`,
        hasKong ? '课中见旬空' : '无旬空',
      ],
    },
    {
      key: 'work', label: '工作与职业选择',
      text: `工作看官鬼与青龙、太常：本课${chuQin === '官鬼' ? '初传即见官鬼，事情一上来就与职位、考核或上级有关' : `初传为${chuQin || '未取'}，${jiangOf(chu) || ''}`}。` +
        `${/青龙/.test(JSON.stringify(sc)) ? '课中见青龙，工作层面有喜庆与进益的象' : '课中未见青龙，工作层面属常态推进'}；` +
        `${/朱雀/.test(JSON.stringify(sc)) ? '见朱雀，文书、沟通与口舌要留意，材料务必留底' : ''}`,
      advice: `涉及岗位与待遇的事，建议把口头承诺落成文字；${/朱雀/.test(JSON.stringify(sc)) ? '沟通时少说满话，多留余地。' : '正常沟通即可。'}选工作时优先考虑课象中显示出支撑力的方向。`,
      evidence: [
        `初传 ${pick(chu, 'zhi', '—')}·${chuQin || '未取'}·${jiangOf(chu) || '—'}`,
        has('青龙') ? '见青龙' : '无青龙',
        has('朱雀') ? '见朱雀' : '无朱雀',
      ],
    },
    {
      key: 'career', label: '事业发展',
      text: `末传${pick(mo, 'zhi', '')}（${moQin || ''}·${jiangOf(mo) || ''}）主结局，${moQin === '官鬼' ? '结局落在官鬼，事业这条线会有明确的结果或位置变化' : moQin === '妻财' ? '结局落在妻财，更多体现为收入与资源的落袋' : moQin === '子孙' ? '结局落在子孙，压力会消散，适合收尾与转向' : '结局的信号相对中性'}。` +
        `${mo.xunKong ? '末传旬空，结局有落空的可能，别把预期定得太满。' : '末传不空，结果相对实在。'}`,
      advice: `按三传的顺序安排节奏：初传阶段先摸清情况，中传阶段处理摩擦，末传阶段收果。${mo.xunKong ? '对结果保留一点弹性，Plan B 提前想好。' : '可以朝着末传给出的方向去准备。'}`,
      evidence: [
        `末传 ${pick(mo, 'zhi', '—')}·${moQin || '未取'}·${jiangOf(mo) || '—'}`,
        mo.xunKong ? '末传旬空' : '末传不空',
        `三传 ${chuan}`,
      ],
    },
    {
      key: 'love', label: '爱情与感情',
      text: `感情看妻财与天后、六合：本课${/六合/.test(JSON.stringify(sc)) ? '见六合，有和合、契约之象，关系层面是往一起走的' : '未见六合，关系层面没有明显的和合信号'}；` +
        `${/天后/.test(JSON.stringify(sc)) ? '见天后，有被照顾、被回应的象' : ''}${/玄武/.test(JSON.stringify(sc)) ? '见玄武，提示信息不明或有隐瞒，重要的事要当面问清' : ''}` +
        `${/妻财/.test(JSON.stringify(sc)) ? '课中见妻财，感情这条线是被看到的' : ''}。`,
      advice: `${/玄武/.test(JSON.stringify(sc)) ? '关系里有看不清的地方，别猜，直接问。' : '按你感受到的相处状态来判断就好。'}卦象只反映当下的气氛，关系如何取决于两个人怎么做。`,
      evidence: [
        has('六合') ? '见六合' : '无六合',
        has('天后') ? '见天后' : '无天后',
        has('妻财') ? '见妻财' : '无妻财',
      ],
    },
    {
      key: 'health', label: '健康状况',
      text: `健康看白虎与子孙：本课${/白虎/.test(JSON.stringify(sc)) ? '见白虎，传统取象上提示身体有需要留意的地方，尤其突发的不适别忽视' : '未见白虎，卦象未指向明显的身体问题'}；` +
        `${/子孙/.test(JSON.stringify(sc)) ? '见子孙，医药与调养的出口是有的，恢复的象在' : '未见子孙，休息与调养需要自己主动安排'}。这些都是象征提示，不构成医学判断。`,
      advice: `${/白虎/.test(JSON.stringify(sc)) ? '近期别熬夜、别硬扛，有条件做一次检查' : '保持现有作息，适度运动即可'}。任何不适请就医，这一课不能替代诊断。`,
      evidence: [
        has('白虎') ? '见白虎' : '无白虎',
        has('子孙') ? '见子孙' : '无子孙',
        `课体 ${pick(gj, 'name', '—')}`,
      ],
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
      evidence: [
        `牌阵 ${n} 张（${cards.map((c) => c.position).join(' / ')}）`,
        `主轴 ${axis ? `${axis.name}·${axis.position}·${axis.orientation}` : '—'}`,
        `逆位 ${reversed.length} / 正位 ${upright.length}`,
        lack.length ? `缺 ${join(lack)}` : '五行元素齐',
      ],
    },
    {
      key: 'work', label: '工作与职业选择',
      text: `${dimBase('work') ? `牌面上与工作最相关的是「${dimBase('work').name}」（${dimBase('work').position}·${dimBase('work').orientation}）：${dimBase('work').core || (dimBase('work').keywords || []).join('、')}。` : '牌面上没有明确指向工作的牌。'}` +
        `${court.length ? `牌中有宫廷牌${join(court.map((c) => c.name))}，说明局面里有具体的人（也可能就是你自己的某个侧面）在起作用。` : ''}` +
        `${elCount.土 ? '有土元素，现实条件与资源是被这张牌阵看到的。' : '缺土元素，现实条件与资源这块容易估计不足。'}`,
      advice: `工作上建议：${elCount.土 ? '把计划落到预算与时间表上，别停在口头' : '先把现实条件摸清楚——薪资、工时、稳定性，再谈喜好'}；${dimBase('work') && !dimBase('work').upright ? '这张相关牌是逆位，说明当下的不适主要来自状态而非岗位本身，可以调状态再看。' : ''}`,
      evidence: [
        `工作相关牌 ${dimBase('work') ? `${dimBase('work').name}·${dimBase('work').position}·${dimBase('work').orientation}` : '无'}`,
        `宫廷牌 ${court.length} 张`,
        `土元素 ${elCount.土 || 0} 张`,
      ],
    },
    {
      key: 'career', label: '事业发展',
      text: `从牌阵的时间线看：${cards.map((c) => `${c.position}是${c.name}${c.orientation}`).join('，')}。` +
        `${major.length >= Math.ceil(n / 2) ? '大牌过半，事业这条线牵动的不只是岗位，还有你对自己要往哪走的判断' : '变化更多发生在具体事务层面，先把眼前的项目做成'}` +
        `${axis ? `；结局位置的「${axis.name}」给出的方向是${axis.core || ''}` : ''}。`,
      advice: `建议把${cards[0]?.position || '最初'}这一环的课题先收尾，再往${axis?.position || '结果'}的方向推进；${elCount.火 ? '火的能量在，适合主动出击一步' : '缺火时别等热情来，先用流程推着自己动'}。事业发展是长线，牌面只反映当前这一段。`,
      evidence: [
        `时间线 ${cards.map((c) => `${c.position}·${c.name}${c.orientation}`).join(' → ')}`,
        `大阿卡纳 ${major.length}/${n}`,
      ],
    },
    {
      key: 'love', label: '爱情与感情',
      text: `${dimBase('love') ? `与感情最相关的是「${dimBase('love').name}」（${dimBase('love').position}·${dimBase('love').orientation}）：${dimBase('love').core || (dimBase('love').keywords || []).join('、')}。` : '牌面上没有明确指向感情的牌，当下这段关系不是主要议题。'}` +
        `${elCount.水 ? '有水元素，情感与感受在这件事里占的分量不轻。' : '缺水元素，容易用理性压过感受，留意别忽略自己的情绪。'}`,
      advice: `${elCount.水 ? '先照顾好感受再谈效率：把想说的话说出口，比猜对方心思有效' : '给自己留一点感受情绪的时间，别把所有事都当任务处理'}；${dimBase('love') && !dimBase('love').upright ? '相关牌为逆位，提示关系里有没说开的地方，找个合适时机讲清楚。' : ''}关系取决于你们怎么做，牌只帮你把问题问清楚。`,
      evidence: [
        `感情相关牌 ${dimBase('love') ? `${dimBase('love').name}·${dimBase('love').position}·${dimBase('love').orientation}` : '无'}`,
        `水元素 ${elCount.水 || 0} 张`,
      ],
    },
    {
      key: 'health', label: '健康状况',
      text: `牌阵里${dimBase('health') ? `与健康状态最贴近的是「${dimBase('health').name}」：${dimBase('health').core || (dimBase('health').keywords || []).join('、')}` : '没有直接指向身体的牌'}。` +
        `${reversed.length >= 2 ? `${reversed.length} 张逆位，提示内在消耗偏大，身体往往是第一个反映出来的` : '整体状态与牌面呈现的相对一致'}` +
        `${elCount.土 || elCount.水 ? '' : '；缺土与水，作息与身体的基本盘容易被牺牲'}。这些是象征性的提示，不是诊断。`,
      advice: `${reversed.length >= 2 ? '建议先把睡眠与饮食稳住，别在这个阶段额外加压' : '维持现有作息，适度运动即可'}；${lack.length ? `补${lack[0]}所代表的${TAROT_ELEMENT_FOCUS[lack[0]]?.area || ''}：${TAROT_ELEMENT_FOCUS[lack[0]]?.advice || ''}` : ''}身体有明确不适请就医，牌面不能替代专业意见。`,
      evidence: [
        `健康相关牌 ${dimBase('health') ? `${dimBase('health').name}·${dimBase('health').position}` : '无'}`,
        `逆位 ${reversed.length} 张`,
        `元素 土${elCount.土 || 0} / 水${elCount.水 || 0}`,
      ],
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
 * @param {object} [opts] 可选：{ question 所问之事, direction 询问方向 key }
 *                 传了就把最贴近的维度提前、在该维度点明问题与方向，并给出回显串
 * @returns {object|null} 结构化解析对象
 */
import { interpretQimen } from './qimen-interpret.js';
import { buildAnswer, buildPlain, buildGlossary, buildFollowups, dimensionPlain } from './interpret-plain.js';
import { knowledgeFor, caveatsFor, STATUS_LABEL } from './interpret-knowledge.js';
import { CLASSIC_BOOKS, suiyunClassicOf, classicOf } from './classics.js';

/**
 * 给任意体系的解析结果补上「白话四层」：直答 / 说人话 / 每维一句话 / 追问建议。
 * 单独抽出来，是为了让奇门（走 qimen-interpret 的另一条路径）也能共用同一套口吻。
 */
function enrichPlain(result, r, ask) {
  if (!result) return result;
  // 注解卡的归属按「维度身份」定，不按显示顺序：所问之事会把某一维提前，
  // 若按显示顺序先到先得，同一张盘换个问法就换了注解归属。
  const DIM_RANK = ['overall', 'work', 'career', 'love', 'health'];
  const rankOf = (key) => { const i = DIM_RANK.indexOf(key); return i < 0 ? DIM_RANK.length : i; };
  const seen = new Set();
  const dims = (result.dimensions || []).map((d) => {
    const p = dimensionPlain(d.key, r, {});
    return { ...d, ...(p ? { plain: p } : {}) };
  });
  // 知识条目挂在维度下：讲「为什么这样断」，与结论、依据形成三层。
  // 两条硬约束，都是为「读得下去」：
  //   ① 一张卡全报告只挂一次——它讲的是「这条规则怎么用」，与挂在哪个维度无关；
  //      逐维重复会把五段正文冲散（1996 示例盘：29 条里 13 条是同一张卡的复读）。
  //   ② 每维最多 3 条——正文是给人读的，注解是读法不是清单；没挂进正文的分歧条目
  //      仍会在文末「这套规则有多稳」里逐条列出（带原注），不丢信息。
  const KNOW_PER_DIM = 3;
  for (const d of dims.slice().sort((a, b) => rankOf(a.key) - rankOf(b.key))) {
    const know = knowledgeFor(r.system, d.key)
      .filter((k) => !seen.has(k.id))
      .slice(0, KNOW_PER_DIM)
      .map((k) => ({
        id: k.id,
        gist: k.gist,
        detail: k.detail,
        source: k.source,
        status: k.status,
        statusLabel: STATUS_LABEL[k.status] || k.status,
        note: k.note || '',
      }));
    for (const k of know) seen.add(k.id);
    if (know.length) d.knowledge = know;
  }
  const texts = [
    result.lead,
    ...dims.map((d) => [d.label, d.text, d.advice, d.plain, ...(d.knowledge || []).map((k) => k.detail)].filter(Boolean).join('')),
    ...(result.sections || []).map((x) => x.text),
  ].filter(Boolean);

  // 文末的诚实声明：把「各家有异说 / 还没做」的部分摊开，而不是藏在专业感里。
  // 「待核实」的在下面单独成段（附原注），这里只列已定论/有异说的，避免同一句话写两遍。
  // 已在上面展开过的只留条目名当索引；没展开的附原注，保证信息不丢。
  const caveats = caveatsFor(r.system);
  const disputed = caveats.filter((k) => k.status !== 'todo');
  const caveatLine = disputed.length
    ? disputed.map((k) => {
      const tag = STATUS_LABEL[k.status] || k.status;
      return `· ${k.gist}（${tag}）${seen.has(k.id) || !k.note ? '' : `——${k.note}`}`;
    }).join('\n')
    : '';
  const secs = [...(result.sections || [])];
  if (caveatLine) {
    secs.push({
      key: 'caveats',
      label: '这套规则有多稳',
      text: `下列几条各家说法不一，本插件取其中一派并把分歧标出来，供你判断可信度（已在上面展开的只列条目，未展开的附原注）：\n${caveatLine}`,
    });
  }
  const todos = caveats.filter((k) => k.status === 'todo');
  if (todos.length) {
    secs.push({
      key: 'todo',
      label: '尚未实现（不猜）',
      text: todos.map((k) => `· ${k.gist}${k.note ? `——${k.note}` : ''}`).join('\n'),
    });
  }

  return {
    ...result,
    dimensions: dims,
    sections: secs,
    answer: result.answer || buildAnswer(r, ask, {}),
    plain: result.plain || buildPlain(r, ask, {}),
    followups: buildFollowups(r, ask),
    glossary: buildGlossary(texts, r.system),
    knowledgeCount: dims.reduce((n, d) => n + ((d.knowledge || []).length), 0),
    caveats: caveats.map((k) => ({ id: k.id, gist: k.gist, status: k.status, statusLabel: STATUS_LABEL[k.status] || k.status })),
  };
}

/** 各体系采用的技法标签：证据卡第一行要写「这条结论是用什么方法得出的」 */
const TECHNIQUE = {
  bazi: '八字（月令 · 十神 · 大运流年）',
  ziwei: '紫微（宫位 · 四化 · 大限流年）',
  liuyao: '六爻（卦宫 · 世应 · 动爻 · 日辰）',
  meihua: '梅花（体用 · 互卦 · 变卦）',
  daliuren: '六壬（月将加时 · 四课 · 三传）',
  qimen: '奇门（九宫 · 值符值使 · 用神）',
  tarot: '塔罗（牌阵 · 正逆位 · 元素）',
  hepan: '合盘（日主 · 夫妻宫 · 五行互补）',
};

/** 置信度：只按公开证据条数分档，不引入新算法——3 条以上「强」、2 条「中」、其余「弱」 */
const confidenceOf = (dim) => {
  const n = Array.isArray(dim && dim.evidence) ? dim.evidence.length : 0;
  return n >= 3 ? '强' : n >= 2 ? '中' : '弱';
};

const withReportMeta = (body, r, ask) => enrichPlain({
  ...body,
  moduleType: MODULE_TYPE[r.system] || 'natal',
  system: r.system,
  systemLabel: SYSTEM_LABEL[r.system] || r.system,
  title: '解析与详解',
  dimensions: (body.dimensions || []).map((d) => ({ ...d, confidence: d.confidence || confidenceOf(d) })),
  sections: body.sections || [],
  outline: body.outline || [],
  tables: body.tables || [],
  technique: TECHNIQUE[r.system] || SYSTEM_LABEL[r.system] || r.system,
  disclaimer: body.disclaimer || DISCLAIMER,
  ask,
}, r, ask);

export function interpret(r, opts) {
  if (!isObj(r) || !r.system) return null;
  const ask = askOf(opts);
  if (r.system === 'qimen') return withReportMeta(interpretQimen(r, opts), r, ask);
  const fn = BUILDERS[r.system];
  if (!fn) return null;
  let body;
  try {
    body = fn(r, ask);
  } catch (e) {
    return {
      moduleType: MODULE_TYPE[r.system] || 'natal',
      system: r.system,
      systemLabel: SYSTEM_LABEL[r.system] || r.system,
      title: '解析与详解',
      lead: '这一盘的解析暂未生成，请稍后重试。',
      dimensions: [],
      sections: [],
      outline: [],
      tables: [],
      technique: TECHNIQUE[r.system] || '',
      disclaimer: DISCLAIMER,
      error: String(e && e.message),
      ask,
    };
  }
  const tuned = applyAsk(body.dimensions || [], ask, body.lead || '');
  return withReportMeta({
    lead: tuned.lead,
    dimensions: tuned.dims,
    sections: body.sections || [],
    outline: body.outline || [],
    tables: body.tables || [],
  }, r, ask);
}

export default interpret;


