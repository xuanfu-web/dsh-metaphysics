// 八字神煞引擎：表驱动、双查法，按类归组
// 设计要点：
//  · 每条规则声明「查法来源」（年干/日干、年支/日支、月支、日柱、时柱）与命中的干支；
//  · 同一神煞有多派查法时，在 rule 文本里注明，避免「算法黑箱」；
//  · 命中按柱记录，同时给出按类别归并的 chart 级视图，供 UI 分组展示。
// 神煞只作参考，不可直接断吉凶——吉凶仍须看格局、旺衰、行运。
import { BRANCHES } from './calendar.js';

export const PILLAR_KEYS = ['year', 'month', 'day', 'hour'];
export const PILLAR_LABEL = { year: '年柱', month: '月柱', day: '日柱', hour: '时柱' };
export const CATEGORY_ORDER = ['贵人', '文星', '婚姻', '性情', '事业', '凶煞', '格局'];

const STEMS_LIST = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const STEM_VIA = { year: '年干', month: '月干', day: '日干', hour: '时干' };
const BRANCH_VIA = { year: '年支', month: '月支', day: '日支', hour: '时支' };

// 三合局（将星、驿马、桃花等以年支、日支双查）
const SANHE = { 寅午戌: ['寅', '午', '戌'], 申子辰: ['申', '子', '辰'], 巳酉丑: ['巳', '酉', '丑'], 亥卯未: ['亥', '卯', '未'] };
const trioKey = (b) => Object.keys(SANHE).find((k) => SANHE[k].includes(b));
// 方局（孤辰、寡宿以年支查）
const FANGJU = { 亥子丑: ['寅', '戌'], 寅卯辰: ['巳', '丑'], 巳午未: ['申', '辰'], 申酉戌: ['亥', '未'] };
const fangjuKey = (b) => Object.keys(FANGJU).find((k) => k.includes(b));
// 季节（天赦、四废、童子煞以月支查）
const SEASON = {
  寅: '春', 卯: '春', 辰: '春',
  巳: '夏', 午: '夏', 未: '夏',
  申: '秋', 酉: '秋', 戌: '秋',
  亥: '冬', 子: '冬', 丑: '冬',
};

const T = (ch) => ({ kind: 'branch', ch });
const S = (ch) => ({ kind: 'stem', ch });
const GZ = (ch) => ({ kind: 'gz', ch });

// ── 表 ──────────────────────────────────────────────────────────

// 天乙贵人：甲戊庚丑未，乙己子申，丙丁亥酉，辛午寅，壬癸卯巳
const TIANYI = {
  甲: ['丑', '未'], 戊: ['丑', '未'], 庚: ['丑', '未'],
  乙: ['子', '申'], 己: ['子', '申'],
  丙: ['亥', '酉'], 丁: ['亥', '酉'],
  辛: ['午', '寅'], 壬: ['卯', '巳'], 癸: ['卯', '巳'],
};
// 太极贵人：甲乙子午，丙丁卯酉，戊己辰戌丑未，庚辛寅亥，壬癸巳申
const TAIJI = {
  甲: ['子', '午'], 乙: ['子', '午'],
  丙: ['卯', '酉'], 丁: ['卯', '酉'],
  戊: ['辰', '戌', '丑', '未'], 己: ['辰', '戌', '丑', '未'],
  庚: ['寅', '亥'], 辛: ['寅', '亥'],
  壬: ['巳', '申'], 癸: ['巳', '申'],
};
// 天德贵人：按月支（寅=正月），值可为天干或地支
const TIANDE = { 寅: '丁', 卯: '申', 辰: '壬', 巳: '辛', 午: '亥', 未: '甲', 申: '癸', 酉: '寅', 戌: '丙', 亥: '乙', 子: '巳', 丑: '庚' };
// 月德贵人：按三合月局
const YUEDE = { 寅午戌: '丙', 申子辰: '壬', 亥卯未: '甲', 巳酉丑: '庚' };
// 月德合：月德与五合之干
const YUEDE_HE = { 丙: '辛', 壬: '丁', 甲: '己', 庚: '乙' };
// 福星贵人：甲丙寅子、乙癸卯丑，丁酉、戊申、己未、庚午、辛巳、壬辰
const FUXING = {
  甲: ['寅', '子'], 丙: ['寅', '子'],
  乙: ['卯', '丑'], 癸: ['卯', '丑'],
  丁: ['酉'], 戊: ['申'], 己: ['未'], 庚: ['午'], 辛: ['巳'], 壬: ['辰'],
};
// 天官贵人（通行表，流派有异）
const TIANGUAN = { 甲: ['未'], 乙: ['辰'], 丙: ['巳'], 丁: ['酉'], 戊: ['戌'], 己: ['卯'], 庚: ['亥'], 辛: ['申'], 壬: ['午'], 癸: ['寅'] };
// 国印贵人
const GUOYIN = { 甲: ['戌'], 乙: ['亥'], 丙: ['丑'], 丁: ['寅'], 戊: ['丑'], 己: ['寅'], 庚: ['辰'], 辛: ['巳'], 壬: ['未'], 癸: ['申'] };
// 天厨贵人：食神之禄
const TIANCHU = { 甲: ['巳'], 乙: ['午'], 丙: ['巳'], 丁: ['午'], 戊: ['申'], 己: ['酉'], 庚: ['亥'], 辛: ['子'], 壬: ['寅'], 癸: ['卯'] };
// 天医：月支退一位
const TIANYI_MED = { 寅: '丑', 卯: '寅', 辰: '卯', 巳: '辰', 午: '巳', 未: '午', 申: '未', 酉: '申', 戌: '酉', 亥: '戌', 子: '亥', 丑: '子' };
// 文昌贵人
const WENCHANG = { 甲: ['巳'], 乙: ['午'], 丙: ['申'], 丁: ['酉'], 戊: ['申'], 己: ['酉'], 庚: ['亥'], 辛: ['子'], 壬: ['寅'], 癸: ['卯'] };
// 德秀贵人：按月局，德、秀各自取干
const DEXIU = {
  寅午戌: ['丙', '丁', '戊', '癸'],
  申子辰: ['壬', '癸', '戊', '己', '丙', '辛', '甲', '己'],
  巳酉丑: ['庚', '辛', '乙'],
  亥卯未: ['甲', '乙', '丁', '壬'],
};
// 桃花（咸池）
const TAOHUA = { 寅午戌: ['卯'], 申子辰: ['酉'], 巳酉丑: ['午'], 亥卯未: ['子'] };
// 将星：三合中神
const JIANGXING = { 寅午戌: ['午'], 申子辰: ['子'], 巳酉丑: ['酉'], 亥卯未: ['卯'] };
// 华盖：三合墓库
const HUAGAI = { 寅午戌: ['戌'], 申子辰: ['辰'], 巳酉丑: ['丑'], 亥卯未: ['未'] };
// 驿马
const YIMA = { 寅午戌: ['申'], 申子辰: ['寅'], 巳酉丑: ['亥'], 亥卯未: ['巳'] };
// 劫煞、灾煞、亡神：由三合局推
const JIESHA = { 寅午戌: ['亥'], 申子辰: ['巳'], 巳酉丑: ['寅'], 亥卯未: ['申'] };
const ZAISHA = { 寅午戌: ['子'], 申子辰: ['午'], 巳酉丑: ['卯'], 亥卯未: ['酉'] };
const WANGSHEN = { 寅午戌: ['巳'], 申子辰: ['亥'], 巳酉丑: ['申'], 亥卯未: ['寅'] };
// 金舆：禄前二位
const JINYU = { 甲: ['辰'], 乙: ['巳'], 丙: ['未'], 丁: ['申'], 戊: ['未'], 己: ['申'], 庚: ['戌'], 辛: ['亥'], 壬: ['丑'], 癸: ['寅'] };
// 禄神
const LUSHEN = { 甲: ['寅'], 乙: ['卯'], 丙: ['巳'], 丁: ['午'], 戊: ['巳'], 己: ['午'], 庚: ['申'], 辛: ['酉'], 壬: ['亥'], 癸: ['子'] };
// 羊刃：禄前一位（阳干论刃为主）
const YANGREN = { 甲: ['卯'], 乙: ['辰'], 丙: ['午'], 丁: ['未'], 戊: ['午'], 己: ['未'], 庚: ['酉'], 辛: ['戌'], 壬: ['子'], 癸: ['丑'] };
// 飞刃：羊刃六冲
const FEIREN = { 甲: ['酉'], 乙: ['戌'], 丙: ['子'], 丁: ['丑'], 戊: ['子'], 己: ['丑'], 庚: ['卯'], 辛: ['辰'], 壬: ['午'], 癸: ['未'] };
// 流霞（通行表）
const LIUXIA = { 甲: ['酉'], 乙: ['戌'], 丙: ['未'], 丁: ['申'], 戊: ['巳'], 己: ['午'], 庚: ['辰'], 辛: ['卯'], 壬: ['亥'], 癸: ['寅'] };

// 日柱专论
const KUIGANG = ['庚辰', '庚戌', '壬辰', '戊戌'];
const RIDE = ['甲寅', '丙辰', '戊辰', '庚辰', '壬戌'];
const RIGUI = ['丁酉', '丁亥', '癸巳', '癸卯'];
const LIUXIU = ['丙午', '丁未', '戊子', '戊午', '己丑', '己未'];
const SHIE_DABAI = ['甲辰', '乙巳', '丙申', '丁亥', '戊戌', '己丑', '庚辰', '辛巳', '壬申', '癸亥'];
const YINCHA_YANGCUO = ['丙子', '丁丑', '戊寅', '辛卯', '壬辰', '癸巳', '丙午', '丁未', '戊申', '辛酉', '壬戌', '癸亥'];
// 天赦日：春戊寅、夏甲午、秋戊申、冬甲子
const TIAN_SHE = { 春: '戊寅', 夏: '甲午', 秋: '戊申', 冬: '甲子' };
// 四废日：春庚申辛酉、夏壬子癸亥、秋甲寅乙卯、冬丙午丁巳
const SIFEI = { 春: ['庚申', '辛酉'], 夏: ['壬子', '癸亥'], 秋: ['甲寅', '乙卯'], 冬: ['丙午', '丁巳'] };
// 童子煞：春秋生见寅子，冬夏生见卯未辰
const TONGZI = { 春: ['寅', '子'], 秋: ['寅', '子'], 夏: ['卯', '未', '辰'], 冬: ['卯', '未', '辰'] };
// 三奇贵人（须依序相连）
const SANQI = ['甲戊庚', '乙丙丁', '壬癸辛'];
// 金神：时柱见之
const JINSHEN = ['乙丑', '己巳', '癸酉'];

// ── 规则工厂 ────────────────────────────────────────────────────

/** 天干查支：天乙、太极、文昌、福星、天官、国印、天厨、禄神、羊刃、飞刃、金舆、流霞 */
function byStem(name, cat, luck, rule, table, refs = ['day']) {
  return {
    name, cat, luck, rule, refs, refKind: 'stem',
    targets: (ctx, ref) => (table[ctx.pillars[ref].stem] || []).map(T),
  };
}

/** 三合星查支：将星、华盖、驿马、桃花、劫煞、灾煞、亡神（年支、日支双查） */
function byTrio(name, cat, luck, rule, table, refs = ['year', 'day']) {
  return {
    name, cat, luck, rule, refs, refKind: 'branch',
    targets: (ctx, ref) => {
      const k = trioKey(ctx.pillars[ref].branch);
      return k && table[k] ? table[k].map(T) : [];
    },
  };
}

/** 按年支（或其它单柱地支）查支，用于红鸾、天喜、孤辰、寡宿 */
function byRefBranch(name, cat, luck, rule, fn, ref = 'year') {
  return {
    name, cat, luck, rule, refs: [ref], refKind: 'branch', viaLabel: BRANCH_VIA[ref],
    targets: (ctx) => fn(ctx),
  };
}

/** 月支查：天德、月德、月德合、德秀、天医、天赦、四废、童子煞 */
function byMonth(name, cat, luck, rule, fn, slots) {
  return { name, cat, luck, rule, refs: ['month'], refKind: 'branch', viaLabel: '月支', slots, targets: (ctx) => fn(ctx) };
}

/** 整柱（日柱/时柱）比对 */
function byPillarGz(name, cat, luck, rule, list, slot = 'day') {
  return {
    name, cat, luck, rule, refs: [slot], refKind: 'branch', viaLabel: PILLAR_LABEL[slot], slots: [slot],
    targets: (ctx, ref) => (list.includes(ctx.pillars[ref].ganzhi) ? [GZ(ctx.pillars[ref].ganzhi)] : []),
  };
}

// ── 规则集（顺序即同柱内显示顺序：先贵人文星，后凶煞）────────────────

const RULES = [
  // 贵人
  byStem('天乙贵人', '贵人', 'good',
    '甲戊庚见丑未，乙己见子申，丙丁见亥酉，辛见午寅，壬癸见卯巳（年干、日干查四支）',
    TIANYI, ['year', 'day']),
  byStem('太极贵人', '贵人', 'good',
    '甲乙见子午，丙丁见卯酉，戊己见辰戌丑未，庚辛见寅亥，壬癸见巳申（年干、日干查四支）',
    TAIJI, ['year', 'day']),
  byMonth('天德贵人', '贵人', 'good',
    '正月丁、二月申、三月壬、四月辛、五月亥、六月甲、七月癸、八月寅、九月丙、十月乙、冬月巳、腊月庚（月支查干或支）',
    (ctx) => {
      const ch = TIANDE[ctx.pillars.month.branch];
      if (!ch) return [];
      return STEMS_LIST.includes(ch) ? [S(ch)] : [T(ch)];
    }),
  byMonth('月德贵人', '贵人', 'good',
    '寅午戌月见丙，申子辰月见壬，亥卯未月见甲，巳酉丑月见庚（月支查天干）',
    (ctx) => {
      const k = trioKey(ctx.pillars.month.branch);
      return k && YUEDE[k] ? [S(YUEDE[k])] : [];
    }),
  byMonth('月德合', '贵人', 'good',
    '月德之合干：丙见辛、壬见丁、甲见己、庚见乙（月支定月德后查天干）',
    (ctx) => {
      const k = trioKey(ctx.pillars.month.branch);
      const he = k && YUEDE[k] ? YUEDE_HE[YUEDE[k]] : null;
      return he ? [S(he)] : [];
    }),
  byStem('福星贵人', '贵人', 'good',
    '甲丙见寅子，乙癸见卯丑，丁见酉、戊见申、己见未、庚见午、辛见巳、壬见辰（年干、日干查四支）',
    FUXING, ['year', 'day']),
  byStem('天官贵人', '贵人', 'good',
    '甲未、乙辰、丙巳、丁酉、戊戌、己卯、庚亥、辛申、壬午、癸寅（年干、日干查四支；此表流派有异）',
    TIANGUAN, ['year', 'day']),
  byStem('国印贵人', '贵人', 'good',
    '甲戌、乙亥、丙丑、丁寅、戊丑、己寅、庚辰、辛巳、壬未、癸申（年干、日干查四支）',
    GUOYIN, ['year', 'day']),
  byStem('天厨贵人', '贵人', 'good',
    '食神之禄：甲巳、乙午、丙巳、丁午、戊申、己酉、庚亥、辛子、壬寅、癸卯（日干查四支）',
    TIANCHU, ['day']),
  byMonth('天医', '贵人', 'good',
    '月支退一位：寅月见丑、卯月见寅……丑月见子（月支查四支）',
    (ctx) => {
      const ch = TIANYI_MED[ctx.pillars.month.branch];
      return ch ? [T(ch)] : [];
    }),

  // 文星
  byStem('文昌贵人', '文星', 'good',
    '甲巳、乙午、丙申、丁酉、戊申、己酉、庚亥、辛子、壬寅、癸卯（年干、日干查四支）',
    WENCHANG, ['year', 'day']),
  byMonth('德秀贵人', '文星', 'good',
    '寅午戌月德丙丁、秀戊癸；申子辰月德壬癸戊己、秀丙辛甲己；巳酉丑月德庚辛、秀乙庚；亥卯未月德甲乙、秀丁壬（月支查天干）',
    (ctx) => {
      const k = trioKey(ctx.pillars.month.branch);
      return k && DEXIU[k] ? DEXIU[k].map(S) : [];
    }),

  // 婚姻
  byTrio('桃花', '婚姻', 'neutral',
    '寅午戌见卯、申子辰见酉、巳酉丑见午、亥卯未见子（年支、日支双查）',
    TAOHUA),
  byRefBranch('红鸾', '婚姻', 'good',
    '卯起子逆数：子见卯、丑见寅、寅见丑、卯见子……（年支查四支）',
    (ctx) => {
      const idx = BRANCHES.indexOf(ctx.pillars.year.branch);
      return [T(BRANCHES[((3 - idx) % 12 + 12) % 12])];
    }),
  byRefBranch('天喜', '婚姻', 'good',
    '红鸾对冲之位：子见酉、丑见申、寅见未……（年支查四支）',
    (ctx) => {
      const idx = BRANCHES.indexOf(ctx.pillars.year.branch);
      const luan = ((3 - idx) % 12 + 12) % 12;
      return [T(BRANCHES[(luan + 6) % 12])];
    }),
  byRefBranch('孤辰', '婚姻', 'bad',
    '亥子丑年见寅、寅卯辰年见巳、巳午未年见申、申酉戌年见亥（年支查四支）',
    (ctx) => {
      const k = fangjuKey(ctx.pillars.year.branch);
      return k ? [T(FANGJU[k][0])] : [];
    }),
  byRefBranch('寡宿', '婚姻', 'bad',
    '亥子丑年见戌、寅卯辰年见丑、巳午未年见辰、申酉戌年见未（年支查四支）',
    (ctx) => {
      const k = fangjuKey(ctx.pillars.year.branch);
      return k ? [T(FANGJU[k][1])] : [];
    }),
  byStem('金舆', '婚姻', 'good',
    '禄前二位：甲龙乙蛇丙戊羊、丁己申宫庚犬乡、辛猪壬牛癸虎位（日干查四支）',
    JINYU, ['day']),

  // 性情
  byTrio('华盖', '性情', 'neutral',
    '寅午戌见戌、申子辰见辰、巳酉丑见丑、亥卯未见未（年支、日支双查）',
    HUAGAI),
  byStem('羊刃', '性情', 'bad',
    '禄前一位：甲卯、乙辰、丙戊午、丁己未、庚酉、辛戌、壬子、癸丑（日干查四支；阳干论刃为主）',
    YANGREN, ['day']),
  byStem('飞刃', '性情', 'bad',
    '羊刃六冲：甲酉、乙戌、丙子、丁丑、戊子、己丑、庚卯、辛辰、壬午、癸未（日干查四支）',
    FEIREN, ['day']),
  byPillarGz('魁罡', '性情', 'neutral',
    '日柱庚辰、庚戌、壬辰、戊戌（日柱见之）',
    KUIGANG),
  byMonth('童子煞', '性情', 'neutral',
    '春秋生见寅子，冬夏生见卯未辰（取季节口诀，查日支、时支；另有纳音五行一法，流派多歧，仅作参考）',
    (ctx) => {
      const season = SEASON[ctx.pillars.month.branch];
      const list = season && TONGZI[season];
      return list ? list.map(T) : [];
    }, ['day', 'hour']),
  byPillarGz('六秀日', '性情', 'good',
    '日柱丙午、丁未、戊子、戊午、己丑、己未（日柱见之）',
    LIUXIU),
  byPillarGz('日德', '性情', 'good',
    '日柱甲寅、丙辰、戊辰、庚辰、壬戌（日柱见之）',
    RIDE),
  byPillarGz('日贵', '性情', 'good',
    '日柱丁酉、丁亥、癸巳、癸卯（日柱见之）',
    RIGUI),

  // 事业
  byStem('禄神', '事业', 'good',
    '甲寅、乙卯、丙戊巳、丁己午、庚申、辛酉、壬亥、癸子（日干查四支）',
    LUSHEN, ['day']),
  byTrio('将星', '事业', 'good',
    '寅午戌见午、申子辰见子、巳酉丑见酉、亥卯未见卯（年支、日支双查）',
    JIANGXING),
  byTrio('驿马', '事业', 'neutral',
    '寅午戌见申、申子辰见寅、巳酉丑见亥、亥卯未见巳（年支、日支双查）',
    YIMA),

  // 凶煞
  byTrio('劫煞', '凶煞', 'bad',
    '寅午戌见亥、申子辰见巳、巳酉丑见寅、亥卯未见申（年支、日支双查）',
    JIESHA),
  byTrio('灾煞', '凶煞', 'bad',
    '寅午戌见子、申子辰见午、巳酉丑见卯、亥卯未见酉（年支、日支双查）',
    ZAISHA),
  byTrio('亡神', '凶煞', 'bad',
    '寅午戌见巳、申子辰见亥、巳酉丑见申、亥卯未见寅（年支、日支双查）',
    WANGSHEN),
  {
    name: '空亡', cat: '凶煞', luck: 'bad',
    rule: '以日柱所在旬的空亡反查各柱地支（日柱旬空）',
    refs: ['day'], refKind: 'branch', viaLabel: '日柱旬空',
    targets: (ctx) => (ctx.kongwang || []).map(T),
  },
  byPillarGz('十恶大败', '凶煞', 'bad',
    '日柱甲辰、乙巳、丙申、丁亥、戊戌、己丑、庚辰、辛巳、壬申、癸亥（日柱见之）',
    SHIE_DABAI),
  byPillarGz('阴差阳错', '凶煞', 'bad',
    '日柱丙子、丁丑、戊寅、辛卯、壬辰、癸巳、丙午、丁未、戊申、辛酉、壬戌、癸亥（日柱见之）',
    YINCHA_YANGCUO),
  byMonth('四废日', '凶煞', 'bad',
    '春庚申辛酉、夏壬子癸亥、秋甲寅乙卯、冬丙午丁巳（月支定季节查日柱）',
    (ctx) => {
      const season = SEASON[ctx.pillars.month.branch];
      const gz = ctx.pillars.day.ganzhi;
      return season && SIFEI[season].includes(gz) ? [GZ(gz)] : [];
    }, ['day']),
  byStem('流霞', '凶煞', 'bad',
    '甲酉、乙戌、丙未、丁申、戊巳、己午、庚辰、辛卯、壬亥、癸寅（日干查四支；通行表）',
    LIUXIA, ['day']),

  // 格局
  byMonth('天赦日', '格局', 'good',
    '春戊寅、夏甲午、秋戊申、冬甲子（月支定季节查日柱）',
    (ctx) => {
      const season = SEASON[ctx.pillars.month.branch];
      const gz = ctx.pillars.day.ganzhi;
      return season && TIAN_SHE[season] === gz ? [GZ(gz)] : [];
    }, ['day']),
  byPillarGz('金神', '格局', 'neutral',
    '时柱乙丑、己巳、癸酉（时柱见之；严格成格另需日主身旺，此仅记星）',
    JINSHEN, 'hour'),
  {
    name: '天罗', cat: '凶煞', luck: 'bad',
    rule: '四支见戌、亥俱全（戌亥为天罗）',
    custom: (ctx) => chartPattern(ctx, ['戌', '亥']),
  },
  {
    name: '地网', cat: '凶煞', luck: 'bad',
    rule: '四支见辰、巳俱全（辰巳为地网）',
    custom: (ctx) => chartPattern(ctx, ['辰', '巳']),
  },
  {
    name: '三奇贵人', cat: '格局', luck: 'good',
    rule: '年月日或月日时天干依序为甲戊庚（天上）、乙丙丁（地下）、壬癸辛（人中）',
    custom: (ctx) => {
      const out = [];
      for (const trio of [['year', 'month', 'day'], ['month', 'day', 'hour']]) {
        const gz = trio.map((k) => ctx.pillars[k].stem).join('');
        if (SANQI.includes(gz)) out.push({ pillars: trio.slice(), via: '三柱天干', target: gz });
      }
      return out;
    },
  },
];

/** 四支俱全即命中（天罗地网） */
function chartPattern(ctx, branches) {
  const keys = PILLAR_KEYS.filter((k) => branches.includes(ctx.pillars[k].branch));
  if (keys.length < branches.length) return [];
  return [{ pillars: keys, via: '四支', target: branches.join('') }];
}

// ── 执行 ────────────────────────────────────────────────────────

function matches(pl, t) {
  if (t.kind === 'stem') return pl.stem === t.ch;
  if (t.kind === 'branch') return pl.branch === t.ch;
  return pl.ganzhi === t.ch;
}

function runRule(r, ctx) {
  if (r.custom) return r.custom(ctx);
  const hits = [];
  for (const ref of r.refs) {
    const targets = r.targets(ctx, ref) || [];
    if (!targets.length) continue;
    const via = r.viaLabel || (r.refKind === 'stem' ? STEM_VIA : BRANCH_VIA)[ref];
    for (const key of (r.slots || PILLAR_KEYS)) {
      const pl = ctx.pillars[key];
      for (const t of targets) {
        if (matches(pl, t)) hits.push({ pillars: [key], via, target: t.ch });
      }
    }
  }
  return hits;
}

/**
 * 计算八字神煞
 * @param {object} pillars { year, month, day, hour }，每柱需有 stem/branch/ganzhi
 * @param {string[]} kongwang 日柱旬空的两个地支
 * @returns {{ detail: object, groups: array, names: string[], count: number }}
 *   detail[key] = [{ name, cat, luck, via, target, rule }]
 *   groups = [{ cat, items: [{ name, luck, pillars, via, target, rule }] }]
 */
export function computeBaziShensha(pillars, kongwang = []) {
  const ctx = { pillars, kongwang };
  const items = [];
  for (const r of RULES) {
    const hits = runRule(r, ctx);
    if (!hits.length) continue;
    const entry = { name: r.name, cat: r.cat, luck: r.luck, rule: r.rule, pillars: [], via: new Set(), target: new Set() };
    for (const h of hits) {
      for (const k of h.pillars) if (!entry.pillars.includes(k)) entry.pillars.push(k);
      if (h.via) entry.via.add(h.via);
      if (h.target) entry.target.add(h.target);
    }
    entry.pillars.sort((a, b) => PILLAR_KEYS.indexOf(a) - PILLAR_KEYS.indexOf(b));
    items.push(entry);
  }
  // 同柱内按类别归置，类别内保持规则声明顺序
  items.sort((a, b) => CATEGORY_ORDER.indexOf(a.cat) - CATEGORY_ORDER.indexOf(b.cat));

  const detail = { year: [], month: [], day: [], hour: [] };
  for (const it of items) {
    for (const k of it.pillars) {
      detail[k].push({
        name: it.name,
        cat: it.cat,
        luck: it.luck,
        via: [...it.via].join('、'),
        target: [...it.target].join('、'),
        rule: it.rule,
      });
    }
  }

  const groups = [];
  for (const cat of CATEGORY_ORDER) {
    const list = items.filter((i) => i.cat === cat);
    if (!list.length) continue;
    groups.push({
      cat,
      items: list.map((i) => ({
        name: i.name,
        cat: i.cat,
        luck: i.luck,
        pillars: i.pillars.slice(),
        via: [...i.via].join('、'),
        target: [...i.target].join('、'),
        rule: i.rule,
      })),
    });
  }

  return {
    detail,
    groups,
    names: items.map((i) => i.name),
    count: items.reduce((n, i) => n + i.pillars.length, 0),
  };
}

/** 单个神煞的查法速查（供 UI 悬浮提示） */
export const RULE_TABLE = RULES.reduce((acc, r) => { acc[r.name] = { cat: r.cat, luck: r.luck, rule: r.rule }; return acc; }, {});
