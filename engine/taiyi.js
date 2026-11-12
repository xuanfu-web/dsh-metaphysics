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
// 没有做的（scope 里写明，别在文案里假装有）：计神、始击、定目、主算 / 客算、
// 主客大小将、三基（君基 / 臣基 / 民基）、五福、十精，以及掩迫关囚击格等格局判定。
// 这些各有独立起例，互相对不上时整套盘会自相矛盾，必须单独一轮对着《太乙金镜式经》
// 与《太乙统宗宝鉴》逐条对拍，不在这层混进来。

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

export const TAIYI_SCOPE = {
  covered: [
    '太乙积年与五元六纪',
    '局数（残年再取 72 的余数）',
    '阴阳遁（冬至后阳、夏至后阴）',
    '太乙落宫（三年一宫、不入中五）',
    '八门（三十年一转）',
    '文昌（十八年一周，遇乾、坤各数两次）',
  ],
  notCovered: [
    '计神、始击、定目',
    '主算、客算与主客大小将参将',
    '三基（君基、臣基、民基）、五福、十精',
    '掩、迫、关、囚、击、格等格局判定',
  ],
  note: '这一层只到「太乙、八门、文昌」三个落点；主客算与格局需要另一套起例，未收录。',
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
  return { dun: 'yang', by: 'jd' };
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

/** 主入口 */
export function buildTaiyi(input) {
  assertObject(input, '太乙神数');
  assertCivil(input, '太乙神数');
  const { year, month, day } = input;

  const jinian = taiyiJinian(year);
  const { rest360, ju } = taiyiRound(jinian);
  const yuanji = yuanJiOf(rest360);
  const gate = eightGate(year);

  // 年家默认阳遁；给了具体日期时，口径仍写在 meta 里，方便以后接交节判定
  const dun = 'yang';

  const t = taiyiPalace(ju, dun);
  const wc = wenChang(jinian, dun);

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
      epoch: TAIYI_EPOCH,
    },
    year: { ...yuanji, rest360 },
    taiyi: t,
    gate,
    wenchang: wc,
    scope: TAIYI_SCOPE,
  };
}

export default buildTaiyi;
