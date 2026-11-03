// 紫微杂曜安星库（H4）：全表里通行、但本插件默认盘不排的十二颗杂曜。
// 每条给：定宫依据、安星诀原文、逐宫查表或公式、五行与基本义、出处与互核情况。
//
// 口径（三条硬规矩）：
//  ① 只收「至少两处独立来源给出同一张表」的星；查不到的宁可不收，不凭记忆补一格。
//  ② 诀文逐字照抄来源，转抄例子与诀文冲突时以诀文为准，冲突本身写进 note（例：天才的
//     网络例子自相矛盾，见该条）。
//  ③ 异名不合并：年支系的「蜚廉」与博士十二神的「飞廉」是两颗星，同名不同宫；
//     「解神」按月安（月解），另有按年安的「年解」，两者都收、都标依据，不互相替换。
// 龙德／月德同样按年支可安，但与岁前十二神的龙德同名而异宫，本库不另立（见 SKIPPED）。

import { BRANCHES } from './calendar.js';

const fix = (i) => ((i % 12) + 12) % 12;

// ── 逐宫查表（键 = 依据值，值 = 地支序 0=子） ──────────────────

// 解神（月解）：正二在申、三四在戌、五六在子、七八在寅、九十在辰、十一十二在午。
// 另一写法「单月冲宫觅解神，双月还依单月辰」——按月建（正月起寅）取对冲，
// 正月建寅冲申、三月建辰冲戌……与上表逐格相同，故两式互核通过。
export const TABLE_JIESHEN = { 1: 8, 2: 8, 3: 10, 4: 10, 5: 0, 6: 0, 7: 2, 8: 2, 9: 4, 10: 4, 11: 6, 12: 6 };

// 天巫：正五九月在巳、二六十月在申、三七十一月在寅、四八十二月在亥（巳申寅亥四生位轮十二月）。
export const TABLE_TIANWU = { 1: 5, 5: 5, 9: 5, 2: 8, 6: 8, 10: 8, 3: 2, 7: 2, 11: 2, 4: 11, 8: 11, 12: 11 };

// 天月：一犬二蛇三在龙，四虎五羊六兔宫，七猪八羊九在虎，十马冬犬腊寅中。
export const TABLE_TIANUE = { 1: 10, 2: 5, 3: 4, 4: 2, 5: 7, 6: 3, 7: 11, 8: 7, 9: 2, 10: 6, 11: 10, 12: 2 };

// 阴煞：正七月在寅、二八月在子、三九月在戌、四十月在申、五十一月在午、六十二月在辰。
export const TABLE_YINSHA = { 1: 2, 7: 2, 2: 0, 8: 0, 3: 10, 9: 10, 4: 8, 10: 8, 5: 6, 11: 6, 6: 4, 12: 4 };

// 天官贵人（生年干）：甲羊乙龙壬犬宜，丙蛇丁虎己辛鸡，戊兔庚猪癸宜马。
// 天福贵人（生年干）：甲爱金鸡乙爱猴，丁猪丙鼠己虎头，戊寻玉兔庚壬马，辛癸逢蛇爵禄荣。
// 另有合并诀「甲喜羊鸡乙龙猴……」把两星排在同一行，逐干拆开与本表全同；
// 戊年两星同在卯宫（合并诀只举「戊玉兔」一格，两诀合看才知道是同居）。
export const TABLE_TIANGUAN = { 甲: 7, 乙: 4, 丙: 5, 丁: 2, 戊: 3, 己: 9, 庚: 11, 辛: 9, 壬: 10, 癸: 6 };
export const TABLE_TIANFU = { 甲: 9, 乙: 8, 丙: 0, 丁: 11, 戊: 3, 己: 2, 庚: 6, 辛: 5, 壬: 6, 癸: 5 };

// 天厨（生年干）：甲丁食蛇口，乙戊辛马方，丙从鼠口得，己食于猴房，庚食虎头上，壬鸡癸猪堂。
// 另一传本「甲丁蛇位号天厨，丙鼠壬鸡癸伴猪，乙戊辛干皆向马，己猴庚虎福神殊」——字面不同、
// 逐干落宫相同；另有排盘文直接列出十干表，三处一致。
export const TABLE_TIANCHU = { 甲: 5, 乙: 6, 丙: 0, 丁: 5, 戊: 6, 己: 8, 庚: 2, 辛: 6, 壬: 9, 癸: 11 };

// 蜚廉（生年支）：「蜚廉分方顺年移，西南东北各轮之」——子年起申宫，按西方（申酉戌）、
// 南方（巳午未）、东方（寅卯辰）、北方（亥子丑）四组顺轮十二年支。
export const TABLE_FEILIAN = { 子: 8, 丑: 9, 寅: 10, 卯: 5, 辰: 6, 巳: 7, 午: 2, 未: 3, 申: 4, 酉: 11, 戌: 0, 亥: 1 };

// 天德／年解（生年支）：「天德星君起酉宫，顺至生年定其踪；年解戌宫逆行去，数至生年可解凶。」
export const TIANDE_START = 9;   // 酉起子，顺行
export const NIANJIE_START = 10; // 戌起子，逆行

// ── 库（顺序即面板与全文的展示顺序） ──────────────────────────

export const ZUOYAO_LIB = [
  {
    name: '解神',
    basis: '生月',
    type: '吉星',
    wuxing: '阴水（一说属土，通行表不取五行断）',
    verse: '正二在申三四在戍，五六在子七八在寅，九十月坐于辰宫，十一十二在午宫。\n（另一式：单月冲宫觅解神，双月还依单月辰。）',
    table: TABLE_JIESHEN,
    meaning: '消灾解厄：灾厄临身前先有感应，逢凶化吉之力。与按生年安的「年解」不是同一颗星。',
    temple: null,
    refs: ['https://m.yi958.com/ziwei/posts/15175', 'http://www.360doc.cn/article/6029610_1149007117.html', 'https://wk.baidu.com/view/2d750d65783e0912a2162a58'],
    check: '三源同表；两式（查表法／月建对冲法）逐月互核一致',
    note: '解神即「月解」，网络转抄常与年解混为一条，本库分列两星。',
  },
  {
    name: '天巫',
    basis: '生月',
    type: '吉星',
    wuxing: '阳土',
    verse: '正五九月在巳，二六十月在申，三七十一在寅，四八十二在亥。\n（另一式：巳申寅亥天巫位，分轮十二月星君。）',
    table: TABLE_TIANWU,
    meaning: '升迁与香火：主地位提升、近宗教玄学；会吉星则名声显。',
    temple: null,
    refs: ['https://m.yi958.com/ziwei/posts/15175', 'http://www.360doc.cn/article/6029610_1149007117.html', 'https://wk.baidu.com/view/2d750d65783e0912a2162a58'],
    check: '三源同表（四生位轮十二月，两式同一）',
    note: '',
  },
  {
    name: '天月',
    basis: '生月',
    type: '煞星',
    wuxing: '阴土',
    verse: '一犬二蛇三在龙，四虎五羊六兔宫，七猪八羊九在虎，十马冬犬腊寅中。',
    table: TABLE_TIANUE,
    meaning: '病符之星：主小病缠身、体弱，也主与世无争、缺主见。',
    temple: null,
    refs: ['https://m.yi958.com/ziwei/posts/15175', 'http://www.360doc.cn/article/6029610_1149007117.html', 'https://zhidao.baidu.com/question/252564654384154444.html'],
    check: '三源逐字同诀（八月在未、十二月在寅两处最易抄错，三源皆同）',
    note: '',
  },
  {
    name: '阴煞',
    basis: '生月',
    type: '煞星',
    wuxing: '阴土',
    verse: '正七月在寅，二八月在子，三九月在戍，四十月在申，五十一在午，六十二在辰。\n（另一式：寅子戌，申午辰，分六月，阴煞临。）',
    table: TABLE_YINSHA,
    meaning: '疑心与暗耗：主多疑、易受小人拖累，也主自我约束反省。',
    temple: null,
    refs: ['https://m.yi958.com/ziwei/posts/15175', 'http://www.360doc.cn/article/6029610_1149007117.html', 'https://m.meipian.cn/58g6z14p'],
    check: '三源同表（隔六月同宫，正七寅、二八子……）',
    note: '',
  },
  {
    name: '天官',
    basis: '生年干',
    type: '吉星',
    wuxing: '阳土',
    verse: '甲羊乙龙壬犬宜，丙蛇丁虎己辛鸡，戊兔庚猪癸宜马，其人贵显可先知。',
    table: TABLE_TIANGUAN,
    meaning: '主贵显、清闲：喜入命宫或官禄宫；与天同、天梁庙地同宫主尊荣高寿，余者平常。',
    temple: ['寅', '申', '巳', '卯'],
    refs: ['https://ziweiscience.com/index.php/2024-06-25/anxingfa/', 'https://m.yi958.com/ziwei/posts/15175', 'https://www.daowen.com/book/content/226294168/14993368.html'],
    check: '两诀（分立式／合并式）逐干互核一致；入庙四宫另见专论',
    note: '己、辛同年干落酉，属原表如此，不是抄重。',
  },
  {
    name: '天福',
    basis: '生年干',
    type: '吉星',
    wuxing: '阳土',
    verse: '甲爱金鸡乙爱猴，丁猪丙鼠己虎头，戊寻玉兔庚壬马，辛癸逢蛇爵禄荣。',
    table: TABLE_TIANFU,
    meaning: '主爵禄、吉祥：乐于助人、爱享受，运限逢之受人注目。',
    temple: ['寅', '申', '巳', '卯'],
    refs: ['https://ziweiscience.com/index.php/2024-06-25/anxingfa/', 'https://m.yi958.com/ziwei/posts/15175', 'https://www.daowen.com/book/content/226294168/14993368.html'],
    check: '两诀逐干互核一致；庚、壬同年干落午，戊年与天官同居卯宫',
    note: '合并诀「壬犬马癸马蛇游」把壬午、癸巳排在一起，与分立式同。',
  },
  {
    name: '天厨',
    basis: '生年干',
    type: '吉星',
    wuxing: '阴土',
    verse: '甲丁食蛇口，乙戊辛马方，丙从鼠口得，己食于猴房，庚食虎头上，壬鸡癸猪堂。\n（另传：甲丁蛇位号天厨，丙鼠壬鸡癸伴猪，乙戊辛干皆向马，己猴庚虎福神殊。）',
    table: TABLE_TIANCHU,
    meaning: '俸禄与口福：主食禄、公职，也主厨艺与鉴赏；会天才更显烹饪之资。',
    temple: null,
    refs: ['https://m.yi958.com/ziwei/posts/15175', 'http://www.360doc.cn/article/6029610_1149007117.html', 'https://m.bilibili.com/opus/1015667810277261321', 'https://baijiahao.baidu.com/s?id=1841437745877521371'],
    check: '两字面不同的诀 + 一处十干明表，四处逐干全同',
    note: '甲丁同居巳，乙戊辛同居午，是原表同宫而非抄重。',
  },
  {
    name: '蜚廉',
    basis: '生年支',
    type: '煞星',
    wuxing: '阴火',
    verse: '蜚廉分方顺年移，西南东北各轮之。\n（释：子年起申宫，十二年支先西方申酉戌、次南方巳午未、续东方寅卯辰、最后北方亥子丑。）',
    table: TABLE_FEILIAN,
    meaning: '口舌是非：主小人、诽谤、虚惊，宜静不宜争。',
    temple: null,
    refs: ['http://www.360doc.cn/article/6029610_1149007117.html', 'https://m.bilibili.com/opus/1015667810277261321'],
    check: '两源同诀同释（王亭之中州派讲义与安星口诀本），四方位轮年支的落宫逐支一致',
    note: '与博士十二神的「飞廉」同名异星：飞廉按禄存起、随大限顺逆，蜚廉只按生年支，两不相代。',
  },
  {
    name: '天德',
    basis: '生年支',
    type: '吉星',
    wuxing: '阳火',
    verse: '天德星君起酉宫，顺至生年定其踪。',
    formula: (c) => fix(TIANDE_START + c.yearBranch),
    meaning: '福佑之星：主逢凶化吉、有扶助，与岁前十二神的「天德」同名异宫。',
    temple: null,
    refs: ['http://www.360doc.cn/article/6029610_1149007117.html', 'https://m.bilibili.com/opus/1015667810277261321'],
    check: '两源同诀（酉宫起子顺行）',
    note: '岁前十二神里也有「天德」（太岁起顺数第十位），本盘两处都会出现，同名不同星，不可互换。',
  },
  {
    name: '年解',
    basis: '生年支',
    type: '吉星',
    wuxing: '阳水',
    verse: '年解戌宫逆行去，数至生年可解凶。',
    formula: (c) => fix(NIANJIE_START - c.yearBranch),
    meaning: '一生灾厄的总闸：与按生月安的「解神（月解）」分属两颗，年解管大事、月解管当期。',
    temple: null,
    refs: ['http://www.360doc.cn/article/6029610_1149007117.html', 'https://m.bilibili.com/opus/1015667810277261321'],
    check: '两源同诀（戌宫起子逆行）',
    note: '',
  },
  {
    name: '天才',
    basis: '命宫＋生年支',
    type: '杂曜',
    wuxing: '阳木',
    verse: '命宫起子天才顺。\n（释：自命宫起子年，顺数至本生年支安之。）',
    formula: (c) => fix(c.soulIndex + c.yearBranch),
    meaning: '才智与技艺：主聪明、有专长，会天厨增烹饪之资，会主星庙旺方显。',
    temple: null,
    refs: ['https://ziweiscience.com/index.php/2024-06-25/anxingfa/', 'http://www.360doc.cn/article/6029610_1149007117.html', 'https://m.meipian.cn/58g6z14p'],
    check: '三源同诀（命宫起子顺数生年支）',
    note: '360doc 转抄的例子自相矛盾：说命宫在午、戌年生人，按诀数到辰（该盘夫妻宫正在辰），却写成「巳宫安天才」。以诀文为准，例子判为笔误。',
  },
  {
    name: '天寿',
    basis: '身宫＋生年支',
    type: '杂曜',
    wuxing: '阳土',
    verse: '身宫起子天寿堂。\n（释：自身宫起子年，顺数至本生年支安之。）',
    formula: (c) => fix(c.bodyIndex + c.yearBranch),
    meaning: '寿年与长者缘：主稳重、近长辈，与天才对看（一按命宫、一按身宫）。',
    temple: null,
    refs: ['https://ziweiscience.com/index.php/2024-06-25/anxingfa/', 'http://www.360doc.cn/article/6029610_1149007117.html', 'https://m.meipian.cn/58g6z14p'],
    check: '三源同诀；转抄例子「亥年生人身宫在卯→寅宫」与公式复算一致',
    note: '',
  },
];

// 按年支可安、但本库刻意不另立的星：写清楚为什么不留，免得日后「顺手补上」造成同名双宫。
export const ZUOYAO_SKIPPED = [
  {
    name: '龙德',
    reason: '「龙德起羊（未）」按年支可安，但岁前十二神已有同名「龙德」（太岁起顺数第八位），两处同名异宫会让面板与断语打架。岁前那一套已在宫位神煞里呈现，故不另立。',
    refs: ['https://m.bilibili.com/opus/1015667810277261321'],
  },
  {
    name: '月德',
    reason: '「月起巳」按年支安月德；只见于「年支六曜诀」一条脉络，且与神煞体系无对应，收进来会给出无法验证的庙旺断，故不收。',
    refs: ['https://m.bilibili.com/opus/1015667810277261321', 'http://www.360doc.cn/article/6029610_1149007117.html'],
  },
];

export const ZUOYAO_NAMES = ZUOYAO_LIB.map((s) => s.name);

/** 全表统计：供面板与测试核对「收了几颗、几颗有庙、几颗有明表」 */
export const ZUOYAO_STATS = Object.freeze({
  total: ZUOYAO_LIB.length,
  byBasis: Object.freeze(ZUOYAO_LIB.reduce((acc, s) => {
    acc[s.basis] = (acc[s.basis] || 0) + 1;
    return acc;
  }, {})),
  withTable: ZUOYAO_LIB.filter((s) => s.table).length,
  withFormula: ZUOYAO_LIB.filter((s) => s.formula).length,
  withTemple: ZUOYAO_LIB.filter((s) => s.temple && s.temple.length).length,
  byType: Object.freeze(ZUOYAO_LIB.reduce((acc, s) => {
    acc[s.type] = (acc[s.type] || 0) + 1;
    return acc;
  }, {})),
  skipped: ZUOYAO_SKIPPED.map((s) => s.name),
});

/** 单颗星的落宫（表格优先，公式其次）；依据缺字段时返回 null，不猜宫。 */
export function zuoyaoBranch(star, ctx) {
  if (star.table) {
    const key = star.basis === '生月' ? ctx.lunarMonth
      : star.basis === '生年干' ? ctx.yearStem
        : star.basis === '生年支' ? BRANCHES[fix(ctx.yearBranch)]
          : null;
    if (key === null || key === undefined) return null;
    const v = star.table[key];
    return typeof v === 'number' ? fix(v) : null;
  }
  if (star.formula) {
    // 四颗公式曜全都要生年支；天才另要命宫、天寿另要身宫。少一个就整颗不排。
    if (typeof ctx.yearBranch !== 'number') return null;
    if (star.basis === '命宫＋生年支' && typeof ctx.soulIndex !== 'number') return null;
    if (star.basis === '身宫＋生年支' && typeof ctx.bodyIndex !== 'number') return null;
    const v = star.formula(ctx);
    return typeof v === 'number' && Number.isFinite(v) ? fix(v) : null;
  }
  return null;
}

/**
 * 安十二颗杂曜。ctx = { lunarMonth, yearStem, yearBranch, soulIndex, bodyIndex }
 * 返回 [{ name, type, branch, basis, verse }]，branch 为地支序。
 * 任何一颗算不出宫位（例如没传命宫）就整颗跳过，绝不安到默认宫。
 */
export function placeZuoyao(ctx = {}) {
  const out = [];
  for (const star of ZUOYAO_LIB) {
    const branch = zuoyaoBranch(star, ctx);
    if (branch === null) continue;
    out.push({
      name: star.name,
      type: star.type,
      branch,
      basis: star.basis,
      verse: star.verse,
      meaning: star.meaning,
      ...(star.temple && star.temple.length ? { temple: star.temple } : {}),
      ...(star.temple && star.temple.includes(BRANCHES[branch]) ? { inTemple: true } : {}),
    });
  }
  return out;
}

/** 一行摘要：全表收了哪些星、按什么定宫 */
export function zuoyaoBriefText() {
  const groups = [];
  for (const [basis, n] of Object.entries(ZUOYAO_STATS.byBasis)) {
    groups.push(`${basis} ${ZUOYAO_LIB.filter((s) => s.basis === basis).map((s) => s.name).join('、')}（${n}）`);
  }
  return groups.join('　');
}

/**
 * 安星诀全文（逐颗一行：星名＋定宫依据＋诀文＋互核情况）。
 * 面板、独立页与「复制提问」共用这一段：外部模型只拿到盘面星名是不够的，
 * 得知道这一颗是怎么定宫的，才不会把杂曜当成随意摆放的装饰。
 */
export function zuoyaoVerseBlock(list) {
  const rows = (list && list.length ? list : ZUOYAO_LIB);
  return rows.map((s) => {
    const star = ZUOYAO_LIB.find((x) => x.name === s.name) || s;
    const at = typeof s.branch === 'number' ? `（本盘落${BRANCHES[fix(s.branch)]}宫）` : '';
    return `${star.name}｜${star.basis}${at}｜${String(star.verse || '').replace(/\n/g, '')}｜互核：${star.check || '—'}`;
  }).join('\n');
}
