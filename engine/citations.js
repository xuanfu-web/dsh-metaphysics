// B6 引文索引：把「知识卡 → 书名 / 卷章 / 原文 / 链接」做成一张可核验的表。
//
// 两类来源：
//   ① CLASSICS（engine/classics.js）：八字三书，已有原文、卷章与典藏网链接；
//   ② CITATIONS（本文件）：紫微斗数全书，原文取自维基文库，链接到卷页。
//
// CARD_CITATIONS 给每张知识卡一个去处：
//   refs    已定位到可核验原文，测试会核验 quote 是否是来源正文的子串；
//   general 属于通行说 / 尚未定位到单一条文，明确标出why，不冒充原文；
//   todo    尚未实现或尚未录入。
// test/citations.test.mjs 会逐条检查，并把索引导出到 docs/citations.html。

import { CLASSICS, CLASSIC_BOOKS } from './classics.js';
import { KNOWLEDGE } from './interpret-knowledge.js';
import { PATTERN_BREAK_RULES } from './ziwei.js';

export const CITATION_BOOKS = {
  ziwei: {
    name: '紫微斗数全书',
    author: '宋·陈抟（传）',
    base: 'https://zh.wikisource.org/wiki/紫微斗數全書',
  },
};

// 紫微原文条目：quote 按维基文库通行本照录，plain 是本站自撰白话。
export const CITATIONS = [
  {
    id: 'zw-poge-sanfang',
    book: 'ziwei',
    chapter: '卷三·谈星要论',
    quote: '及命宫星辰庙旺，三方有恶星守照破格。',
    plain: '命宫主星虽庙旺，三方四正见恶星也会破格。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-poge-ruge',
    book: 'ziwei',
    chapter: '卷三·论人命入格',
    quote: '若居陷地又加杀化忌，为下格之命，不以入格而论也。',
    plain: '星落陷地又见煞星、化忌，就不按入格来论。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-poge-huaxiong',
    book: 'ziwei',
    chapter: '卷三·论人命入格',
    quote: '又入格不化吉而化凶，只以本命吉凶多寡而断之。',
    plain: '入了格却化吉少、化凶多，只能按原局吉凶的多寡来断。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-shiyin',
    book: 'ziwei',
    chapter: '卷一·增补太微赋',
    quote: '巨门子午二宫逢，身命逢之必贵荣，更得三方科禄照，石中隐玉是丰隆。',
    plain: '巨门在子午守命，要三方有化科、化禄照会，石中隐玉才成格。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-jiju-poge',
    book: 'ziwei',
    chapter: '卷三·论诸星同垣各司所宜分别富贵贫贱夭寿',
    quote: '因甲禄到寅卯宫有擎羊破格耳。',
    plain: '巨机本可取贵，但擎羊落宫会把格局破掉。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-riyue-jia',
    book: 'ziwei',
    chapter: '卷三·论诸星同垣各司所宜分别富贵贫贱夭寿',
    quote: '加羊陀冲守，宜僧。',
    plain: '日月夹命再加羊陀冲守，吉意大减。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-changqu',
    book: 'ziwei',
    chapter: '卷三·论诸星同垣各司所宜分别富贵贫贱夭寿',
    quote: '昌曲陷宫凶杀破虚誉之隆  凶杀即羊陀空劫。',
    plain: '昌曲落陷再逢凶杀，名声易成虚誉；这里的凶杀指羊陀空劫。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-kuiyue',
    book: 'ziwei',
    chapter: '卷三·论诸星同垣各司所宜分别富贵贫贱夭寿',
    quote: '魁钺重逢杀凑痼疾尤多  杀乃羊铃空劫。',
    plain: '魁钺夹命再凑煞星，贵气减等；煞指羊铃空劫。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-jiyue',
    book: 'ziwei',
    chapter: '卷三·论诸星同垣各司所宜分别富贵贫贱夭寿',
    quote: '机月同梁作吏人  命在寅申方论，加吉不论，无吉无杀亦是平常人，凶杀空劫化忌为下格。',
    plain: '机月同梁要在寅申论；无吉无杀只是平常，逢凶杀空劫化忌则降为下格。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-tanwu',
    book: 'ziwei',
    chapter: '卷三·论诸星同垣各司所宜分别富贵贫贱夭寿',
    quote: '贪武申宫为下格  化忌方论。',
    plain: '武贪在申本可论格，但带化忌才作下格论。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-huotan',
    book: 'ziwei',
    chapter: '卷一·增补太微赋',
    quote: '火遇贪狼照命宫，封侯食禄是英雄，三方倘若无凶杀，到老应知福寿隆。',
    plain: '火贪照命本是贵格，前提是三方没有凶杀；见煞则破。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-luma',
    book: 'ziwei',
    chapter: '卷一·诸星问答论·问天马星所主若何',
    quote: '如与禄存同宫，谓之禄马交驰，又曰折鞭马',
    plain: '禄存与天马同宫才叫禄马交驰。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-luma-kong',
    book: 'ziwei',
    chapter: '卷一·诸星问答论·问天马星所主若何',
    quote: '逢空亡谓之死马、亡马',
    plain: '禄马逢空亡，称死马、亡马，奔走之力被劫。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-luma-tuo',
    book: 'ziwei',
    chapter: '卷一·诸星问答论·问天马星所主若何',
    quote: '遇陀罗谓之折足马',
    plain: '禄马遇陀罗，称折足马，动而受阻。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-sihua-ji',
    book: 'ziwei',
    chapter: '卷一·诸星问答论·问化忌星所主若何',
    quote: '如会紫府、昌曲、左右、科权禄，与忌同宫又兼四杀共处，即发财亦不佳，功名亦不成就。',
    plain: '吉星与化忌、四杀同处，即使发财也不好，功名难成。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-sihua-lu',
    book: 'ziwei',
    chapter: '卷一·诸星问答论·问化禄星所主若何',
    quote: '禄为福德之神。守身命官禄之位，科权相逢必作大臣之职。',
    plain: '化禄主福，与科权相会可论官职。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-sihua-quan',
    book: 'ziwei',
    chapter: '卷一·诸星问答论·问化权星所主若何',
    quote: '权星掌判生杀之神。守身命科禄相逢出将入相。',
    plain: '化权主掌判，与科禄相会主权位。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-sihua-ke',
    book: 'ziwei',
    chapter: '卷一·诸星问答论·问化科星所主若何',
    quote: '科星上界应试，主掌文墨之星。守身命权禄相逢宰臣之贵。',
    plain: '化科主文墨名声，与权禄相会主贵。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-sanfang',
    book: 'ziwei',
    chapter: '卷三·谈星要论',
    quote: '三看迁移财帛官禄三方星辰刑冲克破。',
    plain: '第三步就看迁移、财帛、官禄这组三方有没有刑冲克破。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-shenming',
    book: 'ziwei',
    chapter: '卷三·谈星要论',
    quote: '看身安命禄马不落空亡天空截空最紧，旬空次之。',
    plain: '看身命先看禄马有没有落空亡、天空、截空。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-daxian',
    book: 'ziwei',
    chapter: '卷三·论大限十年祸福何如',
    quote: '如宫分星缠全吉庙旺得地，无擎羊陀罗火铃空劫者，主十年安静，人财全美。',
    plain: '大限宫吉星庙旺且不见羊陀火铃空劫，十年较安稳。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-miaowang',
    book: 'ziwei',
    chapter: '卷三·论诸星同垣各司所宜分别富贵贫贱夭寿',
    quote: '天机 庙子午 旺辰酉 陷丑未',
    plain: '天机的庙旺陷地：子午庙、辰酉旺、丑未陷。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-kongjie',
    book: 'ziwei',
    chapter: '卷一·诸星问答论·问天空地劫所主若何',
    quote: '二星守身命，遇吉则吉，遇凶则凶。如四杀冲照，轻者下贱，重者六畜之命。',
    plain: '空劫守身命，吉凶随会照而定；再逢四杀冲照则加重。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
];

const BOOK_OF = {
  ...Object.fromEntries(Object.entries(CLASSIC_BOOKS).map(([k, v]) => [k, v])),
  ...CITATION_BOOKS,
};

export function citationOf(id) {
  const hit = CITATIONS.find((c) => c.id === id) || CLASSICS.find((c) => c.id === id);
  if (!hit) return null;
  const book = BOOK_OF[hit.book];
  return {
    ...hit,
    bookName: book ? book.name : hit.book,
    bookAuthor: book ? book.author : '',
  };
}

// 每张知识卡的去处。refs 为已定位原文；general / todo 必须写 reason，不冒充引文。
export const CARD_CITATIONS = {
  // ── 八字：已定位（子平真诠 / 滴天髓 / 三命通会）
  'bazi-yueling-siquan': { refs: ['smt-renyuan'] },
  'bazi-geju': { refs: ['zp-yongshen'] },
  'bazi-suiyun': { refs: ['smt-suiyun'] },
  'bazi-sanming-duizhao': { refs: ['zp-zhenguan', 'smt-guansha-liu'] },
  'bazi-geju-chengbai': { refs: ['zp-chengbai'] },
  'bazi-huagi-bianhua': { refs: ['zp-bianhua'] },
  'bazi-zaji-quyong': { refs: ['zp-zaji'] },
  'bazi-zhuanwang-yuanwen': { refs: ['smt-quzhi', 'smt-yanshang', 'smt-congge', 'smt-runxia', 'smt-jiasi'] },
  'bazi-congge-yuanwen': { refs: ['smt-congsha', 'smt-congcai'] },
  'bazi-tongguan': { refs: ['dt-tongguan'] },
  // ── 八字：通行说，暂未定位单一条文
  'bazi-tonggen-tougan': { status: 'general', book: '滴天髓', chapter: '通神论', reason: '原文为「天干得一比肩，不如得支中一墓库」一路的取象，未定位到单一整句' },
  'bazi-wangxiang': { status: 'general', book: '五行大义', chapter: '旺相休囚死', reason: '通行五行旺衰说，未见可照录的单条原文' },
  'bazi-shensha': { status: 'general', book: '三命通会', chapter: '神煞篇', reason: '神煞散见诸卷，未定位到单一条文' },
  'bazi-tiaohou': { status: 'general', book: '穷通宝鉴', chapter: '调候用神', reason: '调候表按日干月令分散，未定位到单一条文' },
  'bazi-liuqin': { status: 'general', book: '子平真诠 / 滴天髓', chapter: '六亲', reason: '星宫同参为两书通义，未定位到单一条文' },
  'bazi-kongwang': { status: 'general', book: '渊海子平', chapter: '旬空', reason: '旬空出空为通行说，未定位到单一条文' },
  'bazi-xingchong': { status: 'general', book: '三命通会', chapter: '论刑冲合害', reason: '刑冲合害散见诸卷，未定位到单一条文' },
  'bazi-dayun-jiaoqi': { status: 'general', book: '渊海子平', chapter: '起运法', reason: '三日折一年为通行起运法，未定位到单一条文' },
  // ── 紫微：已定位（紫微斗数全书）
  'ziwei-sanfang': { refs: ['zw-sanfang'] },
  'ziwei-sihua': { refs: ['zw-sihua-lu', 'zw-sihua-ji'] },
  'ziwei-miaowang': { refs: ['zw-miaowang'] },
  'ziwei-daxian': { refs: ['zw-daxian'] },
  'ziwei-shengong': { refs: ['zw-shenming'] },
  'ziwei-kongjie': { refs: ['zw-kongjie'] },
  'ziwei-poge': { refs: ['zw-poge-ruge', 'zw-poge-sanfang'] },
  // ── 紫微：飞星派读法不在《全书》原文内
  'ziwei-feixing': { status: 'general', book: '紫微斗数全书 / 飞星派', chapter: '四化篇', reason: '宫干飞化属飞星派传法，非《全书》单条原文' },
  'ziwei-sanfang-fei': { status: 'general', book: '紫微斗数全书 / 飞星派', chapter: '四化篇', reason: '三方四正同飞属飞星派读法，未定位到单条原文' },
  'ziwei-jichuanji': { status: 'general', book: '紫微斗数全书 / 飞星派', chapter: '四化篇', reason: '忌转忌串连属飞星派读法，未定位到单条原文' },
  // ── 六爻：条目未录入原文，先标通行说
  'liuyao-yongshen': { status: 'general', book: '卜筮正宗 / 增删卜易', chapter: '用神章、伏神章', reason: '原文待录入；当前按通行用神法实现' },
  'liuyao-wangshuai': { status: 'general', book: '卜筮正宗', chapter: '月建日辰章', reason: '原文待录入' },
  'liuyao-dongbian': { status: 'general', book: '卜筮正宗 / 增删卜易', chapter: '动变章、进神退神', reason: '原文待录入' },
  'liuyao-fushen': { status: 'general', book: '卜筮正宗 / 增删卜易', chapter: '伏神章', reason: '原文待录入' },
  'liuyao-yongshen-shuai': { status: 'general', book: '增删卜易 / 卜筮正宗', chapter: '月建章、日辰章', reason: '原文待录入' },
  'liuyao-quanggu-shuai': { status: 'general', book: '增删卜易 / 卜筮正宗', chapter: '六爻旺衰论', reason: '原文待录入' },
  'liuyao-yingqi': { status: 'general', book: '卜筮正宗 / 增删卜易', chapter: '应期章', reason: '原文待录入' },
  'liuyao-liushen': { status: 'general', book: '卜筮正宗', chapter: '六神章', reason: '原文待录入' },
  'liuyao-liuchong': { status: 'general', book: '卜筮正宗 / 增删卜易', chapter: '六冲章', reason: '原文待录入' },
  'liuyao-liuhe': { status: 'general', book: '卜筮正宗', chapter: '六合章', reason: '原文待录入' },
  'liuyao-fanyin': { status: 'general', book: '增删卜易 / 卜筮正宗', chapter: '反吟伏吟篇', reason: '原文待录入' },
  'liuyao-fuyin': { status: 'general', book: '增删卜易 / 卜筮正宗', chapter: '伏吟篇', reason: '原文待录入' },
  'liuyao-jintui': { status: 'general', book: '增删卜易', chapter: '进神退神章', reason: '原文待录入' },
  'liuyao-jintui-yong': { status: 'general', book: '增删卜易', chapter: '进神退神章、用神章', reason: '原文待录入' },
  'liuyao-yingqi-exact': { status: 'todo', book: '卜筮正宗', chapter: '应期章', reason: '逐条应期尚未实现，等 20+ 条有应验日期的卦例' },
  // ── 其他体系：原文待录入
  'meihua-tiyong': { status: 'general', book: '梅花易数', chapter: '体用篇', reason: '原文待录入' },
  'daliuren-sike': { status: 'general', book: '大六壬大全', chapter: '九宗门取传法', reason: '原文待录入' },
  'qimen-yinyang': { status: 'general', book: '烟波钓叟歌 / 奇门遁甲统宗', chapter: '阴阳遁与拆补', reason: '原文待录入' },
  'qimen-jixing': { status: 'general', book: '烟波钓叟歌 / 奇门遁甲统宗', chapter: '刑格注', reason: '原文待录入' },
  'qimen-rumu': { status: 'general', book: '奇门遁甲统宗 / 五行大义', chapter: '三奇入墓条', reason: '原文待录入' },
  'qimen-wangshuai': { status: 'general', book: '奇门遁甲统宗 / 五行大义', chapter: '门星旺衰条', reason: '原文待录入' },
  'qimen-wangshuai-yong': { status: 'general', book: '奇门遁甲统宗 / 烟波钓叟歌', chapter: '门宫生克注', reason: '原文待录入' },
  'qimen-gan-shengke': { status: 'general', book: '奇门遁甲统宗 / 烟波钓叟歌', chapter: '干宫生克条', reason: '原文待录入' },
  'tarot-orientation': { status: 'general', book: '韦特塔罗', chapter: '逆位读法', reason: '韦特体系无中文古籍原文，逆位读法属近代流派' },
};

export function allCitations() {
  return [...CLASSICS.map((c) => citationOf(c.id)), ...CITATIONS.map((c) => citationOf(c.id))];
}

/** 把知识卡的 source 补成「原 source + 可核验引文索引」；general/todo 不伪造原文 */
export function citationSourceOf(cardId, fallback = '') {
  const entry = CARD_CITATIONS[cardId];
  if (!entry) {
    return { source: fallback, citations: [], status: 'general', reason: '未建立引文索引' };
  }
  if (Array.isArray(entry.refs) && entry.refs.length) {
    const citations = entry.refs.map(citationOf).filter(Boolean);
    const index = citations.map((c) => `《${c.bookName}·${c.chapter}》${c.url}`).join('；');
    return { source: `${fallback}（原文索引：${index}）`, citations, status: 'verified' };
  }
  return {
    source: `${fallback}（${entry.status === 'todo' ? '待补原文' : '通行说，原文待补'}：${entry.book || ''}${entry.chapter ? `·${entry.chapter}` : ''}）`,
    citations: [],
    status: entry.status || 'general',
    reason: entry.reason || '',
  };
}

/** 破格规则的引文：给测试与报告页共用 */
export function patternCitations() {
  return Object.entries(PATTERN_BREAK_RULES)
    .filter(([, rule]) => Array.isArray(rule.citationIds) && rule.citationIds.length)
    .map(([name, rule]) => ({ name, citationIds: rule.citationIds, citations: rule.citationIds.map(citationOf).filter(Boolean) }));
}
