// 六爻应期：把《增删卜易》各门类应期总注的条文逐条落成规则。
//
// 条文出处：各門類應期總注章第又二十六（本地底本见 test/fixtures/citation-sources.json，
// 键 https://zh.wikisource.org/wiki/增刪卜易/26又3）。原文 19 条，这里只实现能落到「地支」上的那些；
// 落不到的（如「独发独静」「卦之不明再占」）明确列在 NOT_IMPLEMENTED，不假装做了。
//
// 设计原则（和 yingqiWindow 一致）：只给「该留意哪一支」，不换算公历日期。
// 一条卦例往往同时满足两条规则，所以输出「适用规则列表」+「触发支并集」，
// 并标出优先级最高的一条作主规则——对拍时分会算「并集命中」与「主规则命中」两个数，
// 不拿并集去冒充精度。
import { chongOf, heOf, jinTuiOf, zhiElementOf } from './liuyao.js';

const ZHI = '子丑寅卯辰巳午未申酉戌亥'.split('');

// 五行墓库：水/土墓辰、木墓未、火墓戌、金墓丑
const MU_OF = { 水: '辰', 土: '辰', 木: '未', 火: '戌', 金: '丑' };
// 五行生我
const SHENG_ME = { 木: '水', 火: '木', 土: '火', 金: '土', 水: '金' };
const SHENG_BY_ME = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const KE_ME = { 木: '金', 火: '水', 土: '木', 金: '火', 水: '土' };

/** 某五行对应的全部地支（金→申酉） */
const BRANCHES_OF = (() => {
  const out = {};
  for (const b of ZHI) {
    const e = zhiElementOf(b);
    (out[e] = out[e] || []).push(b);
  }
  return out;
})();

/**
 * 规则的排列顺序 = 原文《各門類應期總注章第又二十六》19 条的罗列次序。
 *
 * 这一条要写清楚，因为 0.59.0 之前这里是错的：
 * 旧注释称「状态互斥优先级照应期总注的排列：空 → 破 → 动 → 墓 → 太旺 → 衰绝 → 静」，
 * 但把原文逐条对下来，真实次序是——
 *   静 → 动 → 太旺 → 衰绝 → 入墓 → 六合 → 月破 → 旬空 → 大象吉受克 → 大象凶受克
 *   → 元神总纲 → 化进 → 化退 → 独发独静 → 变爻动爻 → 远近当分 → 再占 → 世空元动 → 世衰元静
 * 旧代码几乎是把这串倒过来排的，而「空 → 破 → … → 静」这个说法原文里没有，是编的。
 *
 * 更要紧的一点：**原文是分类罗列，不是效力排序**。前八条是「常、常、病×6」，
 * 后面又混进化进/化退与变爻动爻，章内找不到任何「哪条先判」的表述。
 * 所以 primary 只表示「按原文顺序第一条生效的规则」，不表示「最可能应验的那条」——
 * 对拍（tools/backtest-yingqi.mjs）也显示按这个顺序取第一条，命中率与随机基线无显著差异。
 */
export const RULE_ORDER = [
  'jing-zhi-chong',
  'dong-he-zhi',
  'taiwang-mu-chong',
  'shuaijue-sheng-wang',
  'rumu-chong-kai',
  'liuhe-xiang-ji',
  'yuepo-xi-tian',
  'xunkong-tian-chong',
  'jixiang-keshen-shouke',
  'xiong-keshen-fengsheng',
  'huajin-zhi-he',
  'huatui-ji-zhi-chong',
  'bianyao-dongyao',
  'shikong-yuanshen-zhi',
  'shishuai-yuanshen-chong',
];

/** 规则编号表：与 RULE_ORDER 同一批规则，保留此导出名给老调用方 */
export const YINGQI_RULE_IDS = RULE_ORDER;

// 条文里给出、但落不到「某支」上的条目：列出来，避免被误以为已经做了
export const NOT_IMPLEMENTED = [
  '問有應於獨發獨靜：詳獨發章（要判「獨發/獨靜」整卦只有一爻動，属整卦层，未并入单爻规则）',
  '勿謂爻之不驗，遠近當分：遠事定之以年月，近事應之於日時（要按事情远近换尺，本模块不猜远近）',
  '倘遇卦之不明，再占是一法（操作建议，不是应期取法）',
  '元神來助來扶，貴看用神衰旺，忌神來沖克，須觀元气興衰（总纲，无独立取支）',
];

const uniq = (xs) => [...new Set(xs.filter(Boolean))];

/**
 * 判用神当前状态。
 *
 * 各项**独立计算、不互斥**——同一爻可以既旬空又月破、又入墓，各条规则各自判断要不要给支。
 * 0.59.0 之前的注释写成「状态互斥优先级：空 → 破 → 动 → 墓 → 太旺 → 衰绝 → 静」，
 * 原文里没有这层互斥关系，那段话是编的；这里没有选择逻辑，所以改注释不改行为。
 * @param {object} line 用神爻（buildLiuyao 的 ben.lines 之一）
 * @param {object} bianLine 同位变爻（不动则为 null）
 * @param {{monthBranch?:string, dayBranch?:string, kong?:string[], sameElement?:number}} ctx
 */
export function yingqiState(line, bianLine, ctx = {}) {
  const branch = line.branch;
  const element = line.element || zhiElementOf(branch);
  const month = ctx.monthBranch || null;
  const day = ctx.dayBranch || null;
  const kong = ctx.kong || [];
  const kongHit = kong.includes(branch);
  const monthPo = !!(month && chongOf(branch) === month);
  const moving = Boolean(line.moving);
  const bianBranch = bianLine ? bianLine.branch : null;
  const jt = bianBranch ? jinTuiOf(branch, bianBranch) : null;
  const muBranch = MU_OF[element] || null;
  const ruMu = !!(muBranch && (day === muBranch || month === muBranch));
  // 六合：与月建或日辰作合，或动而化合（变爻与本爻六合）
  const heWith = [];
  if (month && heOf(branch) === month) heWith.push({ with: '月建', branch: month });
  if (day && heOf(branch) === day) heWith.push({ with: '日辰', branch: day });
  if (moving && bianBranch && heOf(branch) === bianBranch) heWith.push({ with: '变爻', branch: bianBranch });
  // 太旺：月建同气（旺/相）且日辰生扶或比和
  const monthSame = !!(month && zhiElementOf(month) === element);
  const monthSheng = !!(month && zhiElementOf(month) === SHENG_ME[element]);
  const daySame = !!(day && zhiElementOf(day) === element);
  const daySheng = !!(day && zhiElementOf(day) === SHENG_ME[element]);
  const taiWang = (monthSame || monthSheng) && (daySame || daySheng);
  // 衰绝：被月建所克，且日辰不生不扶
  const monthKe = !!(month && zhiElementOf(month) === KE_ME[element]);
  const shuaiJue = monthKe && !(daySame || daySheng);

  return {
    branch, element, moving, bianBranch, jinTui: jt, kongHit, monthPo, ruMu,
    heWith, taiWang, shuaiJue, monthSame, monthSheng, daySame, daySheng, monthKe,
    muBranch,
  };
}

/**
 * 按应期总注给出触发支集合。
 * @returns {{rules:Array<{id:string,label:string,quote:string,branches:string[]}>, primary:object|null, branches:string[], state:object}}
 */
export function yingqiPredict(result, useGod, opts = {}) {
  const st = {
    monthBranch: opts.monthBranch || null,
    dayBranch: opts.dayBranch || (result && result.dayGanZhi ? result.dayGanZhi.branch : null),
    kong: Array.isArray(result && result.xunKong) ? result.xunKong : [],
  };
  if (!useGod || !useGod.branch) return { rules: [], primary: null, branches: [], state: null };

  const bianLine = useGod.position && result && result.bian
    ? (result.bian.lines || []).find((l) => l.position === useGod.position) || null
    : null;
  const s = yingqiState({ branch: useGod.branch, element: useGod.element, moving: useGod.moving }, bianLine, st);
  const b = s.branch;
  const rules = [];
  const add = (id, label, quote, branches) => {
    const bs = uniq(branches);
    if (bs.length) rules.push({ id, label, quote, branches: bs });
  };

  if (s.kongHit) add('xunkong-tian-chong', '旬空填实/冲空', '旬空最愛塡沖', [b, chongOf(b)]);
  if (s.monthPo) add('yuepo-xi-tian', '月破填实/逢合', '月破喜塡…又有逢午月應之，塡實之月則不破矣', [b, heOf(b)]);
  if (s.moving && s.jinTui === '进') add('huajin-zhi-he', '化进神逢值逢合', '化進神、逢值逢合：如申動酉…有應申月日者，有應巳月日者', [b, heOf(b)]);
  if (s.moving && s.jinTui === '退') add('huatui-ji-zhi-chong', '化退神忌值忌冲', '化退神、忌值忌沖：如酉化申…有應申月日者，有應寅日月者', [s.bianBranch, chongOf(s.bianBranch)]);
  if (s.moving && !s.jinTui) add('bianyao-dongyao', '动爻/变爻之支', '問有應於變爻動爻：如爻臨戌土，變出酉金，有戌日應者，有酉日應者', [b, s.bianBranch]);
  if (s.moving) add('dong-he-zhi', '动而逢合逢值', '動而逢合逢值：如主事爻臨子水發動，後遇丑日子日而應之', [heOf(b), b]);
  if (s.ruMu) add('rumu-chong-kai', '入墓喜冲开', '入三墓俱喜沖開：如主事爻臨午火，假使火墓於戌，後逢辰日則應之', [chongOf(s.muBranch)]);
  if (s.heWith.length) add('liuhe-xiang-ji', '六合宜相击（冲开）', '遇六合亦宜相擊…卽如主象臨子，與丑作合，後逢午未日應之', s.heWith.flatMap((h) => [chongOf(b), chongOf(h.branch)]));
  if (s.taiWang) add('taiwang-mu-chong', '太旺逢墓逢冲', '太旺者逢墓逢沖：如主事爻臨午火…後逢亥子日應之，又有戌日應之乃火入墓也', [s.muBranch, chongOf(b)]);
  if (s.shuaiJue) add('shuaijue-sheng-wang', '衰绝遇生遇旺', '衰絕者，遇生遇旺：如主事爻屬金，占卦於巳午月日…後逢土月日或至秋令當時則旺矣', [...(BRANCHES_OF[SHENG_ME[s.element]] || []), ...(BRANCHES_OF[s.element] || [])]);
  if (!s.moving && !s.kongHit && !s.monthPo && !s.ruMu && !s.heWith.length) {
    add('jing-zhi-chong', '静而逢值逢冲', '靜而逢值逢沖：如主事爻臨子水不動，後逢子日午日而應之', [b, chongOf(b)]);
  }

  // 元神/忌神两条要整卦信息：用神受克 → 待克神受制；用神衰而元静 → 待元神逢冲
  const lines = (result && result.ben && result.ben.lines) || [];
  const keBranch = (() => {
    const keEl = KE_ME[s.element];
    const hit = lines.filter((l) => (l.element || zhiElementOf(l.branch)) === keEl && l.moving);
    return hit.length ? hit[0].branch : null;
  })();
  const yuanBranch = (() => {
    const yuanEl = SHENG_ME[s.element];
    const hit = lines.filter((l) => ((l.element || zhiElementOf(l.branch)) === yuanEl));
    return hit.length ? hit[0].branch : null;
  })();
  if (keBranch && (s.shuaiJue || s.kongHit || s.monthPo)) {
    add('jixiang-keshen-shouke', '待克神受克', '大象吉而受克，須待克神受克…後逢申酉日沖克克神則吉', [chongOf(keBranch)]);
  }
  if (yuanBranch && s.shuaiJue && !s.moving) {
    add('shishuai-yuanshen-chong', '元神逢冲', '世衰元靜，必然是元气逢沖…後逢巳日成事', [chongOf(yuanBranch)]);
  }
  if (yuanBranch && s.kongHit) {
    add('shikong-yuanshen-zhi', '待元神逢值', '世空元動，須待元神逢值…主亥日得財', [yuanBranch]);
  }

  // 按原文罗列次序排（见 RULE_ORDER），primary 只是「第一条生效的」，不是「最可能应验的」
  const rankOf = (id) => {
    const i = RULE_ORDER.indexOf(id);
    return i < 0 ? RULE_ORDER.length : i;
  };
  rules.sort((a, b) => rankOf(a.id) - rankOf(b.id));

  const primary = rules[0] || null;
  return {
    rules,
    primary,
    branches: uniq(rules.flatMap((r) => r.branches)),
    state: s,
  };
}

/** 把预测结果压成一句可读的话（报告与面板共用措辞） */
export function yingqiSay(pred) {
  if (!pred || !pred.branches.length) return '应期：无可用触发支（缺用神或月建）';
  const main = pred.primary ? pred.primary.label : '无';
  return `应期：主看「${main}」，留意 ${pred.branches.join('、')} 支（共 ${pred.branches.length} 支）`;
}
