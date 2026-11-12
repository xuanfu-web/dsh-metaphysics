// 太乙神数（年家）：积年 → 五元六纪 → 局数 → 阴阳遁 → 太乙落宫 → 八门 → 文昌。
//
// 这一层只做「能对着口诀逐条复核」的部分：
//   1. 太乙积年 = 公元年 + 10153917（《太乙数统宗》口径，公元 0 年为 10153917）
//   2. 积年 mod 360 = 残年（六纪 × 60 年），残年再 mod 72 = 局数（五元 × 72 局）
//   3. 冬至后为阳遁、夏至后为阴遁
//   4. 局数 mod 24：三年一宫、不入中五宫。阳遁自乾一宫顺行八宫，阴遁自巽九宫逆行八宫
//   5. 八门三十年一转，1954 年休门起，休生伤杜景死惊开
//   6. 文昌：积年 mod 18，阳局自武德（申）起、阴局自吕申（寅）起，顺行十六神，
//      遇阴德（乾）、大武（坤）各数两次
//
//   7. 计神：积年 mod 60 得六十甲子序，从寅起逆数十二支
//   8. 始击：计神加和德（艮）之宫，天目（文昌）随盘移一位，即始击
//   9. 主算 / 客算：沿九宫环顺行累加宫数，天目在正宫按本数、在间神先计一，
//      数到太乙宫前一位为止
//  10. 大将 = 算数个位（得十置一），参将 = 大将 × 3 的个位
//  11. 掩、迫、囚、格、关五种位置关系
//
//  12. 定目、三基、五福、大游、十精、八种格局、阴阳数和
//  13. 月计 / 日计 / 时计：按《太乙金镜式经》卷一的积月、积日、时实三套推法
//  14. 古法吉凶：按卷一《推太公考时法》——八种相犯全无、主客数和，算和顺；
//      命中任何一犯，古法算相犯。这是古籍的占断口径，不是预测，文案里必须写明。
//
// 没有做的（scope 里写明，别在文案里假装有）：四神拆成本身与绛宫、明堂、玉堂
// 十二位全序；胜负断辞与三旗五将。

import { termInstantJd, toJDN, jdToParts, dayGanzhiIndex, STEMS } from './calendar.js';
import { assertCivil } from './validate.js';
import { assertObject } from './validate.js';

/** 上元甲子到公元 0 年的积年数（《太乙数统宗》通行口径） */
export const TAIYI_EPOCH = 10153917;

/** 九宫（太乙特有的宫位数，与奇门不同：乾一、离二、艮三、震四、中五、兑六、坤七、坎八、巽九） */
export const PALACES = {
  1: { name: '乾', gua: '乾', dir: '西北' },
  2: { name: '离', gua: '离', dir: '正南' },
  3: { name: '艮', gua: '艮', dir: '东北' },
  4: { name: '震', gua: '震', dir: '正东' },
  5: { name: '中', gua: '中', dir: '中央' },
  6: { name: '兑', gua: '兑', dir: '正西' },
  7: { name: '坤', gua: '坤', dir: '西南' },
  8: { name: '坎', gua: '坎', dir: '正北' },
  9: { name: '巽', gua: '巽', dir: '东南' },
};

/**
 * 十六神：从乾起顺时针一圈。`num` 是该间辰落在地盘上的宫数，
 * 十六个间辰两两共用一宫（乾与戌共用 1 宫、亥与子共用 8 宫……）。
 */
export const SIXTEEN = [
  { idx: 0, pos: '乾', god: '阴德', num: 1 },
  { idx: 1, pos: '亥', god: '大义', num: 8 },
  { idx: 2, pos: '子', god: '地主', num: 8 },
  { idx: 3, pos: '丑', god: '阳德', num: 3 },
  { idx: 4, pos: '艮', god: '和德', num: 3 },
  { idx: 5, pos: '寅', god: '吕申', num: 4 },
  { idx: 6, pos: '卯', god: '高丛', num: 4 },
  { idx: 7, pos: '辰', god: '太阳', num: 9 },
  { idx: 8, pos: '巽', god: '大炅', num: 9 },
  { idx: 9, pos: '巳', god: '大神', num: 2 },
  { idx: 10, pos: '午', god: '大威', num: 2 },
  { idx: 11, pos: '未', god: '天道', num: 7 },
  { idx: 12, pos: '坤', god: '大武', num: 7 },
  { idx: 13, pos: '申', god: '武德', num: 6 },
  { idx: 14, pos: '酉', god: '太簇', num: 6 },
  { idx: 15, pos: '戌', god: '阴主', num: 1 },
];

/** 阳遁太乙行宫次序：顺行八宫，不入中五 */
export const YANG_WALK = [1, 2, 3, 4, 6, 7, 8, 9];
/** 阴遁太乙行宫次序：逆行八宫，同样不入中五 */
export const YIN_WALK = [9, 8, 7, 6, 4, 3, 2, 1];

/** 八门三十年一转，1954 年为休门 */
export const EIGHT_GATES = ['休门', '生门', '伤门', '杜门', '景门', '死门', '惊门', '开门'];
export const GATE_BASE_YEAR = 1954;
export const GATE_PERIOD = 30;

/** 五元：七十二局一元 */
export const FIVE_YUAN = ['甲子元', '丙子元', '戊子元', '庚子元', '壬子元'];
/** 三理：太乙在每一宫理天、理地、理人各一年 */
export const THREE_LI = ['理天', '理地', '理人'];

/** 《太乙金镜式经》卷一的天文常数：章岁、章月、日法、月法 */
export const ZHANG_SUI = 657;
export const ZHANG_YUE = 8726;
export const RI_FA = 49;
export const YUE_FA = 2447;

/** 二十四局一周 → 宫序（起一宫顺行八宫、不游中五）与入宫第几期 */
export function palaceFromR24(r24) {
  const k = Math.ceil(r24 / 3);
  const inPalace = r24 - (k - 1) * 3 || 3;
  return { k, palace: YANG_WALK[k - 1], inPalace };
}

/** 从某支起、逆行第 n 步（n 取 1..12，1 就是起点） */
export function branchWalk(startIdx, step) {
  const idx = (((startIdx - (step - 1)) % 12) + 12) % 12;
  return { idx, branch: BRANCH_NAMES[idx] };
}

/** 十六神顺行第 n 步：遇阴德（乾）、大武（坤）各数两次，故十八步一周 */
export function sixteenStep(startGod, rest18) {
  const start = SIXTEEN.findIndex((x) => x.god === startGod);
  const steps = [];
  for (let i = 0; i < SIXTEEN.length; i += 1) {
    const cur = SIXTEEN[(start + i) % SIXTEEN.length];
    steps.push(cur);
    if (cur.pos === '乾' || cur.pos === '坤') steps.push(cur);
  }
  return steps[rim(rest18, 18) - 1];
}

/** 月计：积月 = ⌊积年 × 章月 ÷ 章岁⌋，其余数称闰余 */
export function monthJiOf(jinian) {
  const jiyue = Number((BigInt(jinian) * BigInt(ZHANG_YUE)) / BigInt(ZHANG_SUI));
  const r24 = rim(jiyue, 24);
  const t = palaceFromR24(r24);
  const mu = sixteenStep('武德', rim(jiyue, 18));
  const js = branchWalk(2, rim(rim(jiyue, 60), 12));
  return {
    jiyue,
    taiyi: { rest24: r24, palace: t.palace, palaceName: PALACES[t.palace].name, unitInPalace: t.inPalace },
    mu: { pos: mu.pos, god: mu.god, palace: mu.num },
    jishen: js,
  };
}

/** 日计：积日 = ⌊积月 × 月法 ÷ 日法⌋ */
export function dayJiOf(jinian) {
  const jiyue = Number((BigInt(jinian) * BigInt(ZHANG_YUE)) / BigInt(ZHANG_SUI));
  const jiri = Number((BigInt(jiyue) * BigInt(YUE_FA)) / BigInt(RI_FA));
  const r24 = rim(jiri, 24);
  const t = palaceFromR24(r24);
  const mu = sixteenStep('武德', rim(jiri, 18));
  const js = branchWalk(2, rim(rim(jiri, 60), 12));
  return {
    jiri,
    taiyi: { rest24: r24, palace: t.palace, palaceName: PALACES[t.palace].name, unitInPalace: t.inPalace },
    mu: { pos: mu.pos, god: mu.god, palace: mu.num },
    jishen: js,
  };
}

/** 时计：以上年冬至为天正、十二时一辰，时实 = (冬至积日 − 1) × 12 + 时辰序 */
export function hourJiOf(datetime) {
  const { year, month, day, hour } = datetime;
  const wp = jdToParts(termInstantJd(year - 1, 23));
  const winterJdn = toJDN(wp.year, wp.month, wp.day);
  const summerJd = termInstantJd(year, 11);
  const nowJd = toJDN(year, month, day) - 0.5 + (hour * 60) / 1440;
  const dun = nowJd >= summerJd ? 'yin' : 'yang';
  const hIdx = Math.floor(((hour + 1) % 24) / 2);
  const shiShi = (winterJdn - 1) * 12 + hIdx;
  const r24 = rim(shiShi, 24);
  const t = palaceFromR24(r24);
  const start = dun === 'yang' ? 2 : 8;
  const js = branchWalk(start, rim(rim(shiShi, 60), 12));
  return {
    shiShi,
    dun,
    taiyi: { rest24: r24, palace: t.palace, palaceName: PALACES[t.palace].name, unitInPalace: t.inPalace },
    jishen: js,
    note: '时计用现代节气定冬至与夏至，不用唐代气法常数；与卷一的古历口径会有几日差。',
  };
}

/** 古法吉凶：按卷一《推太公考时法》的位置判据，只判「相犯与否」与「数和不和」 */
export function jiXiongOf(o) {
  const items = (o.geju && o.geju.list) || [];
  const xiangFan = items.length > 0;
  const zhuHe = !!(o.heshu && o.heshu.zhu && o.heshu.zhu.he);
  const keHe = !!(o.heshu && o.heshu.ke && o.heshu.ke.he);
  const he = zhuHe && keHe;
  const gate = (o.gate && o.gate.gate) || '';
  // 卷一「吉道谓开休生三门」，年家只值一门，能判的就到这里
  const jiDao = gate === '开' || gate === '休' || gate === '生';
  // 用词照《太乙金镜式经》：凶、不和、吉、大吉；不自造档位
  let grade = 'ji';
  if (xiangFan) grade = 'xiong';
  else if (!he) grade = 'buhe';
  else if (jiDao) grade = 'daji';
  const label = grade === 'xiong' ? '凶' : grade === 'buhe' ? '不和' : grade === 'daji' ? '大吉' : '吉';
  const basis = xiangFan
    ? '命中' + items.join('、') + '，不满足卷一「上下无掩击迫囚关格对、并不相犯」'
    : !he
      ? '不相犯，但' + (zhuHe ? '客算' : '主算') + '落在不和'
      : jiDao
        ? '阴阳和顺、不相犯，八门又值' + gate + '（卷一所称吉道）'
        : '阴阳和顺、不相犯，八门值' + gate + '，不在开休生之内';
  const text = basis + '。';
  const note = '卷一另有「大利」「利以行兵」「先吉后凶」，要五将与神将同参，这一层没有做。';
  return { xiangFan, items, he, gate, grade, label, text, note };
}

/* ── 神将层（第五层）─────────────────────────────────────────────
   卷一《推太乙当时法》：「以日度加时因步六壬式，知天乙成败之分」——
   借六壬十二神看四将与文昌、始击落在吉神还是凶神下。口径由本盘自定，写在这里备查：
   1) 十二神用六壬序（贵人、螣蛇、朱雀、六合、勾陈、青龙、天后、太阴、玄武、太常、白虎、天空）；
   2) 贵人按日干起（甲戊庚丑未 / 乙己子申 / 丙丁亥酉 / 壬癸巳卯 / 辛午寅），卯至申用昼贵、酉至寅用夜贵；
   3) 贵人临亥子丑寅卯辰顺行、临巳午未申酉戌逆行；
   4) 四将与文昌、始击的卦位按后天八卦取一支（乾亥、坎子、艮丑、震卯、巽巳、离午、坤未、兑酉），
      再取该支上的神；太乙九宫一宫两支，取生支这一支，是本盘唯一能自洽的一档。
   这一层只给「古法怎么判」，不给成不成。 */

export const TWELVE_GODS = ['贵人', '螣蛇', '朱雀', '六合', '勾陈', '青龙', '天后', '太阴', '玄武', '太常', '白虎', '天空'];
export const GOD_GOOD = ['贵人', '六合', '青龙', '太阴', '太常'];
export const GOD_BAD = ['螣蛇', '朱雀', '勾陈', '玄武', '白虎', '天空'];
/** 后天八卦取支：一宫两支时取生支（与十六神位里同向那一支一致） */
export const TRIGRAM_TO_BRANCH = { 乾: '亥', 坎: '子', 艮: '丑', 震: '卯', 巽: '巳', 离: '午', 坤: '未', 兑: '酉' };
/** 十六神位名 → 地支：卦位取生支，支位原样 */
export const POS_TO_BRANCH = { ...TRIGRAM_TO_BRANCH, 子: '子', 丑: '丑', 寅: '寅', 卯: '卯', 辰: '辰', 巳: '巳', 午: '午', 未: '未', 申: '申', 酉: '酉', 戌: '戌', 亥: '亥' };
const GUI_REN = { 甲: '丑', 戊: '丑', 庚: '丑', 乙: '子', 己: '子', 丙: '亥', 丁: '亥', 壬: '巳', 癸: '巳', 辛: '午' };
const GUI_REN_NIGHT = { 甲: '未', 戊: '未', 庚: '未', 乙: '申', 己: '申', 丙: '酉', 丁: '酉', 壬: '卯', 癸: '卯', 辛: '寅' };

/** 当天的日干 */
export function dayStemOf(year, month, day) {
  const idx = dayGanzhiIndex(toJDN(year, month, day));
  return STEMS[((idx % 10) + 10) % 10];
}

/** 起十二神：昼贵 / 夜贵按卯～申、酉～寅分；反回 { stem, day, startBranch, dir, table } */
export function twelveGodsOf(stem, hour) {
  const h = typeof hour === 'number' ? hour : 0;
  const bi = Math.floor(((h + 1) % 24) / 2);
  const day = bi >= 2 && bi <= 7;
  const start = (day ? GUI_REN : GUI_REN_NIGHT)[stem] || '丑';
  const si = BRANCH_NAMES.indexOf(start);
  const dir = ['亥', '子', '丑', '寅', '卯', '辰'].includes(start) ? 1 : -1;
  const table = {};
  TWELVE_GODS.forEach((g, k) => {
    const bi2 = ((si + dir * k) % 12 + 12) % 12;
    table[BRANCH_NAMES[bi2]] = g;
  });
  return { stem, day, startBranch: start, dir, table };
}

/** 四将与文昌、始击各落哪一神下 */
export function shenJiangOf(o) {
  const t = twelveGodsOf(o.dayStem, o.hour);
  const b2b = POS_TO_BRANCH;
  const rows = [
    ['主大将', o.jiang.zhuDaName],
    ['主参将', o.jiang.zhuCanName],
    ['客大将', o.jiang.keDaName],
    ['客参将', o.jiang.keCanName],
    ['文昌', o.wenchang && o.wenchang.pos],
    ['始击', o.shiji && o.shiji.pos],
  ].map(([who, gua]) => {
    const br = b2b[gua] || '';
    const god = br ? t.table[br] || '' : '';
    const kind = GOD_GOOD.includes(god) ? 'good' : GOD_BAD.includes(god) ? 'bad' : 'mid';
    return { who, gua, branch: br, god, kind };
  });
  const goods = rows.filter((x) => x.kind === 'good').map((x) => x.who + '在' + x.god);
  const bads = rows.filter((x) => x.kind === 'bad').map((x) => x.who + '在' + x.god);
  const mids = rows.filter((x) => x.kind === 'mid').map((x) => x.who + '在' + (x.god || '无名'));
  return { ...t, rows, goods, bads, mids };
}

/**
 * 位置层 + 神将层合成卷一的判辞：凶 / 不和 / 吉 / 大吉 / 大利 / 先吉后凶。
 * 卷一判语：门具将发遇吉神则大吉；门杜闭塞遇吉神守固大利；门杜闭塞遇凶神则先吉后凶。
 * 位置层已相犯时古法认定「不相犯」不成立，不再往上抬。
 */
export function verdictOf(o) {
  const pos = o.jixiong || {};
  const sj = o.shenjiang || {};
  const gate = (o.gate && o.gate.gate) || '';
  const jiDao = gate === '开' || gate === '休' || gate === '生';
  const rows = sj.rows || [];
  const allGood = rows.length > 0 && (sj.bads || []).length === 0 && (sj.mids || []).length === 0;
  const anyBad = (sj.bads || []).length > 0;
  let grade = pos.grade || 'ji';
  let label = pos.label || '吉';
  if (grade !== 'xiong' && allGood) {
    grade = jiDao ? 'daji' : 'dali';
    label = jiDao ? '大吉' : '大利';
  } else if (grade !== 'xiong' && anyBad) {
    grade = jiDao ? 'xianji' : 'xiong';
    label = jiDao ? '先吉后凶' : '凶';
  }
  return { grade, label, jiDao, allGood, anyBad, posGrade: pos.grade, text: pos.text };
}

/** 《太乙金镜式经》这一层覆盖的算法清单（面板与文案都从这里取） */


export const TAIYI_SCOPE = {
  covered: [
    '太乙积年与五元六纪',
    '局数（残年再取 72 的余数）',
    '阴阳遁（冬至后阳、夏至后阴）',
    '太乙落宫（三年一宫、不入中五）',
    '八门（三十年一转）',
    '文昌（十八年一周，遇乾、坤各数两次）',
    '计神（积年 mod 60，从寅起逆数）',
    '始击（计神加和德，天目随移）',
    '主算、客算与主客大小将、参将',
    '掩、击、格、对、提、迫、囚、关八种位置关系',
    '定目（年支合神移至太岁宫）',
    '三基（君基、臣基、民基）',
    '五福、大游',
    '十精其余（天乙、地乙、直符、四神、小游）',
    '阴阳数和（重阳、重阴、上和、次和、下和）',
    '月计、日计、时计（积月、积日、时实三套推法）',
    '古法吉凶倾向（相犯与否 ＋ 数和不和）',
  ],
  notCovered: [
    '四神拆成本身与绛宫、明堂、玉堂的十二位全序',
    '胜负断辞、三旗五将',
  ],
  note: '这一层做到太乙、八门、文昌、计神、始击、主客算与四将、八种格局、定目、三基、五福、大游、十精、阴阳数和、月日时三计、古法吉凶与神将判辞；阴阳遁按冬至夏至交节判；四神十二位全序、胜负断辞不做。',
};

/** 取模成 1..n（余数 0 当 n） */
const rim = (n, m) => {
  const r = n % m;
  return r === 0 ? m : r;
};

/** 太乙积年：公元年 + 常数 */
export function taiyiJinian(year) {
  return TAIYI_EPOCH + year;
}

/** 残年（360 年一周）与局数（72 局一元） */
export function taiyiRound(jinian) {
  const rest360 = rim(jinian, 360);
  const ju = rim(rest360, 72);
  return { rest360, ju };
}

/** 五元六纪：残年第几年、第几纪、第几元 */
export function yuanJiOf(rest360) {
  const ji = Math.floor((rest360 - 1) / 60); // 0..5
  const yuan = Math.floor((rest360 - 1) / 72); // 0..4
  return {
    jiNo: ji + 1,
    jiName: `第${['一', '二', '三', '四', '五', '六'][ji]}纪`,
    jiYear: ((rest360 - 1) % 60) + 1,
    yuanNo: yuan + 1,
    yuanName: FIVE_YUAN[yuan],
    yuanYear: ((rest360 - 1) % 72) + 1,
  };
}

/**
 * 阴阳遁：冬至到次年夏至之间为阳遁，夏至到冬至之间为阴遁。
 * 传 jd 就按交节时刻判，不传就按「年家默认阳遁」——年盘本身不落到某一天，
 * 所以这里把口径写进结果，别让调用方以为它按月份算。
 */
export function dunOf(jd) {
  if (typeof jd !== 'number' || !Number.isFinite(jd)) return { dun: 'yang', by: 'default' };
  const p = jdToParts(jd);
  const summer = termInstantJd(p.year, 11); // 当年夏至
  const winter = termInstantJd(p.year, 23); // 当年冬至
  const yin = jd >= summer && jd < winter;
  return { dun: yin ? 'yin' : 'yang', by: 'jd', summer, winter };
}

/** 太乙落宫：局数 mod 24，三年一宫 */
export function taiyiPalace(ju, dun) {
  const walk = dun === 'yin' ? YIN_WALK : YANG_WALK;
  const rest24 = rim(ju, 24);
  const groupIdx = Math.ceil(rest24 / 3) - 1;
  const palace = walk[groupIdx];
  const yearInPalace = ((rest24 - 1) % 3) + 1;
  return {
    rest24,
    palace,
    palaceName: PALACES[palace].name,
    dir: PALACES[palace].dir,
    yearInPalace,
    li: THREE_LI[yearInPalace - 1],
  };
}

/** 八门：三十年一转 */
export function eightGate(year) {
  const idx = Math.floor((year - GATE_BASE_YEAR) / GATE_PERIOD);
  const mod = ((idx % 8) + 8) % 8;
  return { gate: EIGHT_GATES[mod], idx: mod + 1 };
}

/**
 * 文昌：积年 mod 18，阳局自武德（申）起、阴局自吕申（寅）起，
 * 顺行十六神，遇阴德（乾）、大武（坤）各数两次。
 */
export function wenChang(jinian, dun) {
  const steps = [];
  const startIdx = dun === 'yin' ? SIXTEEN.findIndex((s) => s.pos === '寅') : SIXTEEN.findIndex((s) => s.pos === '申');
  let i = startIdx;
  while (steps.length < 18) {
    const s = SIXTEEN[i % 16];
    steps.push(s);
    // 遇乾（阴德）与坤（大武）各数两次
    if (s.pos === '乾' || s.pos === '坤') steps.push(s);
    i += 1;
    if (steps.length > 18) steps.length = 18;
  }
  const r = rim(jinian, 18);
  const hit = steps[r - 1];
  return { rest18: r, pos: hit.pos, god: hit.god, num: hit.num, palaceName: PALACES[hit.num].name };
}

/** 八卦正宫名（十六神里 pos 落在这八个上就是正宫，其余是间神） */
export const GUA_NAMES = ['乾', '兑', '离', '震', '巽', '坎', '艮', '坤'];

/** 九宫环顺行：坎八 → 艮三 → 震四 → 巽九 → 离二 → 坤七 → 兑六 → 乾一 */
export const PALACE_RING = [8, 3, 4, 9, 2, 7, 6, 1];

/** 十二支名 */
export const BRANCH_NAMES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

/** 地支序 → 十六神索引（子→地主、丑→阳德、寅→吕申……） */
export const BRANCH_TO_SIXTEEN = [2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15, 1];

/** 对宫：一乾对九巽、二离对八坎、三艮对七坤、四震对六兑，中五无对 */
export const OPPOSITE_PALACE = { 1: 9, 9: 1, 2: 8, 8: 2, 3: 7, 7: 3, 4: 6, 6: 4, 5: 5 };

/** 九宫环上的下一宫 */
export function nextPalace(palace) {
  const i = PALACE_RING.indexOf(palace);
  return PALACE_RING[(i + 1) % PALACE_RING.length];
}

/** 九宫环上的上一宫（顺行的「前一宫」，即太乙左右） */
export function prevPalace(palace) {
  const i = PALACE_RING.indexOf(palace);
  return PALACE_RING[(i - 1 + PALACE_RING.length) % PALACE_RING.length];
}

/** 六合：与某支相合的那一支（子丑、寅亥、卯戌、辰酉、巳申、午未） */
export const LIU_HE = [1, 0, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

/**
 * 定目：淘金歌「为客最难详定计，便以合神加太岁」——把合神搬到太岁所在处，
 * 盘整体旋转，原先天目（文昌）落到的位置就是定目。
 */
export function dingMuOf(wenChangIdx, yearBranchIdx) {
  const heIdx = LIU_HE[yearBranchIdx];
  const taiSui16 = BRANCH_TO_SIXTEEN[yearBranchIdx];
  const he16 = BRANCH_TO_SIXTEEN[heIdx];
  const idx16 = ((wenChangIdx + (taiSui16 - he16)) % 16 + 16) % 16;
  const item = SIXTEEN[idx16];
  return { shift: taiSui16 - he16, idx16, pos: item.pos, god: item.god, palace: item.num, palaceName: PALACES[item.num].name };
}

/** 三基：君基三十年一移起午、臣基三年一移起午、民基一年一移起戌，顺行十二支 */
export function sanJiOf(jinian) {
  const step = (base, period, start) => BRANCH_NAMES[(start + Math.floor((jinian - 1) / period)) % 12];
  return {
    jun: step('jun', 30, 6),
    chen: step('chen', 3, 6),
    min: step('min', 1, 10),
    note: '君基三十年一移、臣基三年一移，都从午起；民基一年一移，从戌起，顺行十二支。',
  };
}

/** 五福：四十五年移一位，上元甲子起一宫，乾一 → 艮三 → 巽九 → 坤七 → 中五 */
export const WUFU_ORDER = [1, 3, 9, 7, 5];
export function wuFuOf(jinian) {
  const i = Math.floor((jinian - 1) / 45) % WUFU_ORDER.length;
  const palace = WUFU_ORDER[i];
  return { index: i, palace, palaceName: PALACES[palace].name };
}

/** 大游：三十六年移一位，上元甲子起七宫，逆数 七→六→四→三→二→一→九→八 */
export const DAYOU_ORDER = [7, 6, 4, 3, 2, 1, 9, 8];
export function daYouOf(jinian) {
  const i = Math.floor((jinian - 1) / 36) % DAYOU_ORDER.length;
  const palace = DAYOU_ORDER[i];
  return { index: i, palace, palaceName: PALACES[palace].name };
}

/** 十二支上的位移取位（起点按地支索引，三年/三十年一移） */
function branchStep(startIdx, period, jinian) {
  return { index: (startIdx + Math.floor((jinian - 1) / period)) % 12, name: BRANCH_NAMES[(startIdx + Math.floor((jinian - 1) / period)) % 12] };
}

/**
 * 十精里的四个「十二宫」神：
 * 天乙「甲子上元从六起，三年一徙顺行踪」（第六位 = 巳）
 * 地乙「上元甲子九宫九，顺行十二宫中序，三年亦易」
 * 直符「上元甲子元从五，十二宫中顺数详」（第五位 = 辰 → 按九宫数五 = 中宫，这里按十二支第五位辰起）
 * 小游：三年一移，起一宫。
 */
export function shiJingOf(jinian) {
  const tianYi = branchStep(5, 3, jinian);
  const diYi = branchStep(8, 3, jinian);
  const zhiFu = branchStep(4, 3, jinian);
  const SI_SHEN_RING = ['一宫', '二宫', '三宫', '四宫', '五宫', '六宫', '七宫', '八宫', '九宫', '绛宫', '明堂', '玉堂'];
  const siShen = SI_SHEN_RING[Math.floor((jinian - 1) / 3) % 12];
  const xiaoYou = PALACES[YANG_WALK[Math.floor((jinian - 1) / 3) % 8]].name;
  return {
    tianyi: tianYi.name,
    diyi: diYi.name,
    zhifu: zhiFu.name,
    sishen: siShen,
    xiaoyou: xiaoYou,
    note: '天乙、地乙、直符、四神、小游都按上元甲子起例、三年一移；十精的另一半是五福、君基、臣基、民基、大游。',
  };
}

/**
 * 阴阳和不和（张良经 / 卷二）：太乙在阳宫（八三四九）得奇数为重阳，得偶数为和；
 * 太乙在阴宫（二七六一）得偶数为重阴，得奇数为和。这里只判这一段，不做胜负推断。
 */
export function heShuOf(taiyiPalace, suan) {
  const YANG = [8, 3, 4, 9];
  const yin = !YANG.includes(taiyiPalace);
  const odd = suan % 2 === 1;
  const chongYang = !yin && odd;
  const chongYin = yin && !odd;
  const he = !chongYang && !chongYin;
  const SHANG = [14, 18];
  const CI = [23, 29, 32];
  const XIA = [12, 16, 27, 34, 38];
  const grade = SHANG.includes(suan) ? '上和' : CI.includes(suan) ? '次和' : XIA.includes(suan) ? '下和' : '';
  return {
    grade,
    yang: !yin,
    odd,
    he,
    chongYang,
    chongYin,
    text: he
      ? `太乙在${yin ? '阴' : '阳'}宫、算得${odd ? '奇' : '偶'}数，为阴阳和${grade ? '（' + grade + '）' : ''}。`
      : chongYang
        ? '太乙在阳宫、算得奇数，为重阳，按经文属不和。'
        : '太乙在阴宫、算得偶数，为重阴，按经文属不和。',
  };
}


/**
 * 计神：积年 mod 60 得六十甲子第几年（1..60），从寅起逆数十二支。
 * 甲子年（序 1）计神在寅；寅年（序 3）计神在子，即「太岁在寅，计神在子」。
 */
export function jiShenOf(jinian) {
  const r = rim(jinian, 60);
  const bi = (((2 - (r - 1)) % 12) + 12) % 12;
  const idx16 = BRANCH_TO_SIXTEEN[bi];
  const item = SIXTEEN[idx16];
  return { r, branch: BRANCH_NAMES[bi], idx16, god: item.god, palace: item.num, palaceName: PALACES[item.num].name };
}

/**
 * 始击：计神加和德（艮，十六神索引 4）之宫，天目随盘整体移动。
 * 位移 = 和德索引 − 计神索引；文昌落位顺移同一位移。
 */
export function shiJiOf(wenChangIdx, jiIdx16) {
  const HE_DE = 4;
  const shift = HE_DE - jiIdx16;
  const idx16 = ((wenChangIdx + shift) % 16 + 16) % 16;
  const item = SIXTEEN[idx16];
  return { shift, idx16, pos: item.pos, god: item.god, palace: item.num, palaceName: PALACES[item.num].name };
}

/**
 * 主算 / 客算：从某位天目所在处起，沿九宫环顺行累加宫数。
 * 天目在正宫按本宫数起；在间神先计一，再从该间神所属的正宫继续。
 * 数到太乙宫前一位为止（不含太乙宫本身）。
 */
export function suanOf(idx16, taiyiPalace) {
  const item = SIXTEEN[idx16];
  const isJian = !GUA_NAMES.includes(item.pos);
  let total = isJian ? 1 : 0;
  let cur = item.num;
  for (let i = 0; i < PALACE_RING.length; i += 1) {
    if (cur === taiyiPalace) break;
    total += cur;
    cur = nextPalace(cur);
  }
  return total === 0 ? 1 : total;
}

/** 大将宫数：算数个位，整十按「得十置一」归一宫 */
export function generalOf(n) {
  const g = n % 10;
  return g === 0 ? 1 : g;
}

/** 参将宫数：大将 × 3 的个位，整十同样归一宫 */
export function canJiangOf(g) {
  const c = (g * 3) % 10;
  return c === 0 ? 1 : c;
}

/** 掩迫囚格关：只判位置关系，不掺吉凶 */
export function gejuOf(o) {
  const { taiyiPalace, shiJiPalace, wenChangPalace, zhuDa, keDa, zhuCan, keCan } = o;
  const near = [nextPalace(taiyiPalace), prevPalace(taiyiPalace)];
  const yan = shiJiPalace === taiyiPalace;
  const ji = near.includes(shiJiPalace);
  const ge = shiJiPalace === OPPOSITE_PALACE[taiyiPalace];
  const dui = wenChangPalace === OPPOSITE_PALACE[taiyiPalace];
  const ti = keDa === wenChangPalace;
  const poAt = [];
  if (near.includes(wenChangPalace)) poAt.push('文昌');
  if (near.includes(zhuDa)) poAt.push('主大将');
  if (near.includes(keDa)) poAt.push('客大将');
  if (near.includes(zhuCan)) poAt.push('主参将');
  if (near.includes(keCan)) poAt.push('客参将');
  const qiuAt = [['主大将', zhuDa], ['客大将', keDa], ['主参将', zhuCan], ['客参将', keCan]]
    .filter((x) => x[1] === taiyiPalace).map((x) => x[0]);
  const cross = [
    ['主大将', zhuDa, '客大将', keDa],
    ['主大将', zhuDa, '客参将', keCan],
    ['客大将', keDa, '主参将', zhuCan],
    ['主参将', zhuCan, '客参将', keCan],
  ];
  const guan = cross.filter((x) => x[1] === x[3]).map((x) => x[0] + '与' + x[2] + '同宫');
  const list = [];
  if (yan) list.push('掩：始击与太乙同宫');
  if (ji) list.push('击：始击在太乙左右');
  if (ge) list.push('格：太乙与始击相望（对宫）');
  if (dui) list.push('对：文昌冲太乙宫');
  if (ti) list.push('提：客大将与文昌同宫');
  if (poAt.length) list.push('迫：' + poAt.join('、') + '在太乙前后');
  if (qiuAt.length) list.push('囚：' + qiuAt.join('、') + '与太乙同宫');
  if (guan.length) list.push('关：' + guan.join('，'));
  return { yan, ji, ge, dui, ti, po: poAt, qiu: qiuAt, guan, list };
}

/** 主入口 */
export function buildTaiyi(input) {
  assertObject(input, '太乙神数');
  assertCivil(input, '太乙神数');
  const { year, month, day } = input;

  const jinian = taiyiJinian(year);
  const { rest360, ju } = taiyiRound(jinian);
  const yuanji = yuanJiOf(rest360);
  const gate = eightGate(year);

  // 阳遁 / 阴遁按交节判：冬至到次年夏至为阳，夏至到冬至为阴。
  // 这一盘总要落到某一天，所以直接按日期判，不再默认阳遁。
  const hourNum = typeof input.hour === 'number' ? input.hour : 0;
  const nowJd = toJDN(year, month, day) - 0.5 + hourNum / 24;
  const dunInfo = dunOf(nowJd);
  const dun = dunInfo.dun;

  const t = taiyiPalace(ju, dun);
  const wc = wenChang(jinian, dun);

  const wcIdx16 = SIXTEEN.findIndex((x) => x.pos === wc.pos && x.god === wc.god);
  const js = jiShenOf(jinian);
  const sj = shiJiOf(wcIdx16, js.idx16);
  const zhuSuan = suanOf(wcIdx16, t.palace);
  const keSuan = suanOf(sj.idx16, t.palace);
  const zhuDa = generalOf(zhuSuan);
  const keDa = generalOf(keSuan);
  const zhuCan = canJiangOf(zhuDa);
  const keCan = canJiangOf(keDa);
  const geju = gejuOf({
    taiyiPalace: t.palace,
    shiJiPalace: sj.palace,
    wenChangPalace: wc.num,
    zhuDa,
    keDa,
    zhuCan,
    keCan,
  });
  const yearBranchIdx = (((year - 4) % 12) + 12) % 12;
  const dm = dingMuOf(wcIdx16, yearBranchIdx);
  const heZhu = heShuOf(t.palace, zhuSuan);
  const heKe = heShuOf(t.palace, keSuan);
  const heshu = { zhu: heZhu, ke: heKe };
  const jixiong = jiXiongOf({ geju, heshu, gate });
  const dayStem = dayStemOf(year, month, day);
  const jiangObj = {
    zhuDa, keDa, zhuCan, keCan,
    zhuDaName: PALACES[zhuDa].name, keDaName: PALACES[keDa].name,
    zhuCanName: PALACES[zhuCan].name, keCanName: PALACES[keCan].name,
  };
  const shenjiang = shenJiangOf({ dayStem, hour: typeof input.hour === 'number' ? input.hour : 0, jiang: jiangObj, wenchang: wc, shiji: sj });
  const verdict = verdictOf({ jixiong, shenjiang, gate });
  const monthJi = monthJiOf(jinian);
  const dayJi = dayJiOf(jinian);
  const hourJi = hourJiOf({ year, month, day, hour: typeof input.hour === 'number' ? input.hour : 0 });

  return {
    system: 'taiyi',
    meta: {
      datetime: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      year,
      jinian,
      rest360,
      ju,
      dun,
      dunText: dun === 'yin' ? '阴遁' : '阳遁',
      dunBy: dunInfo.by,
      epoch: TAIYI_EPOCH,
    },
    year: { ...yuanji, rest360 },
    taiyi: t,
    gate,
    wenchang: wc,
    jishen: js,
    shiji: sj,
    suan: { zhu: zhuSuan, ke: keSuan },
    jiang: {
      zhuDa,
      keDa,
      zhuCan,
      keCan,
      zhuDaName: PALACES[zhuDa].name,
      keDaName: PALACES[keDa].name,
      zhuCanName: PALACES[zhuCan].name,
      keCanName: PALACES[keCan].name,
    },
    geju,
    dingmu: dm,
    sanji: sanJiOf(jinian),
    wufu: wuFuOf(jinian),
    dayou: daYouOf(jinian),
    shijing: shiJingOf(jinian),
    heshu,
    jixiong,
    verdict,
    shenjiang,
    month: monthJi,
    day: dayJi,
    hour: hourJi,
    scope: TAIYI_SCOPE,
  };
}

export default buildTaiyi;
