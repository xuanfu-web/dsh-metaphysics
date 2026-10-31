// 风水：八宅命卦 + 大游年八星 + 年家紫白飞星 + 24 山门主灶布局倾向（纯本地确定性）。
// 口径：大游年歌与 24 山归属为八宅通行口径，吉凶名词照传统转述；不做现场勘舆结论。
// 参照公开通行表实现（与常见八宅/玄空入门资料一致），年紫白用纯公式，不依赖任何第三方历法库。
import {
  partsToJd, termInstantJd, toJDN, dayGanzhiIndex, ganzhiName, termWindow, previousJie, BRANCHES,
} from './calendar.js';
import { applyDst } from './dst.js';
import { fail } from './fail.js';

/** 九星名称表：数 → {name, color, element, star(北斗名), lucky}。 */
export const NINE_STARS = {
  1: { name: '一白', color: '白', element: '水', star: '贪狼', lucky: true },
  2: { name: '二黑', color: '黑', element: '土', star: '巨门', lucky: false },
  3: { name: '三碧', color: '碧', element: '木', star: '禄存', lucky: false },
  4: { name: '四绿', color: '绿', element: '木', star: '文曲', lucky: true },
  5: { name: '五黄', color: '黄', element: '土', star: '廉贞', lucky: false },
  6: { name: '六白', color: '白', element: '金', star: '武曲', lucky: true },
  7: { name: '七赤', color: '赤', element: '金', star: '破军', lucky: false },
  8: { name: '八白', color: '白', element: '土', star: '左辅', lucky: true },
  9: { name: '九紫', color: '紫', element: '火', star: '右弼', lucky: true },
};

/** 后天八卦 → 方位。 */
export const PALACE_DIRECTION = {
  坎: '正北', 艮: '东北', 震: '正东', 巽: '东南',
  离: '正南', 坤: '西南', 兑: '正西', 乾: '西北',
};

/** 大游年歌：自本卦起，按「坎艮震巽离坤兑乾」循环顺数，数组为自卦后第 1–7 位。 */
const YOUNIAN_ORDER = ['坎', '艮', '震', '巽', '离', '坤', '兑', '乾'];
export const DAYOUTIAN = {
  乾: ['六煞', '天医', '五鬼', '祸害', '绝命', '延年', '生气'],
  坎: ['五鬼', '天医', '生气', '延年', '绝命', '祸害', '六煞'],
  艮: ['六煞', '绝命', '祸害', '生气', '延年', '天医', '五鬼'],
  震: ['延年', '生气', '祸害', '绝命', '五鬼', '天医', '六煞'],
  巽: ['天医', '五鬼', '六煞', '祸害', '生气', '绝命', '延年'],
  离: ['六煞', '五鬼', '绝命', '延年', '祸害', '生气', '天医'],
  坤: ['天医', '延年', '绝命', '生气', '祸害', '五鬼', '六煞'],
  兑: ['生气', '祸害', '延年', '绝命', '六煞', '五鬼', '天医'],
};

export const LUCKY_STARS = ['生气', '延年', '天医', '伏位'];
export const UNLUCKY_STARS = ['绝命', '五鬼', '六煞', '祸害'];

/** 24 山（周天 360° 每山 15°，自北顺时针）：山 → 后天八卦归属 + 中心度数（子山 = 0°）。 */
export const MOUNTAINS_24 = [
  { m: '壬', gua: '坎', deg: 345 }, { m: '子', gua: '坎', deg: 0 }, { m: '癸', gua: '坎', deg: 15 },
  { m: '丑', gua: '艮', deg: 30 }, { m: '艮', gua: '艮', deg: 45 }, { m: '寅', gua: '艮', deg: 60 },
  { m: '甲', gua: '震', deg: 75 }, { m: '卯', gua: '震', deg: 90 }, { m: '乙', gua: '震', deg: 105 },
  { m: '辰', gua: '巽', deg: 120 }, { m: '巽', gua: '巽', deg: 135 }, { m: '巳', gua: '巽', deg: 150 },
  { m: '丙', gua: '离', deg: 165 }, { m: '午', gua: '离', deg: 180 }, { m: '丁', gua: '离', deg: 195 },
  { m: '未', gua: '坤', deg: 210 }, { m: '坤', gua: '坤', deg: 225 }, { m: '申', gua: '坤', deg: 240 },
  { m: '庚', gua: '兑', deg: 255 }, { m: '酉', gua: '兑', deg: 270 }, { m: '辛', gua: '兑', deg: 285 },
  { m: '戌', gua: '乾', deg: 300 }, { m: '乾', gua: '乾', deg: 315 }, { m: '亥', gua: '乾', deg: 330 },
];

const MOUNTAIN_INDEX = new Map(MOUNTAINS_24.map((x, i) => [x.m, i]));

export function mountainInfo(name) {
  const i = MOUNTAIN_INDEX.get(name);
  if (i === undefined) {
    throw fail('E_INPUT', `坐向必须是 24 山之一（${MOUNTAINS_24.map((x) => x.m).join('')}），收到「${name}」——请按罗盘 24 山报坐或报向，不要自造方位词。`);
  }
  return { ...MOUNTAINS_24[i], index: i };
}

export function sittingFromFacing(facing) {
  const f = mountainInfo(facing);
  const i = (f.index + 12) % 24;
  return { ...MOUNTAINS_24[i], index: i };
}

const guaGroup = (gua) => (['坎', '离', '震', '巽'].includes(gua) ? '东四' : '西四');

/** 八星 → 布局角色（门主灶厕各宜何星方）。 */
export const STAR_LAYOUT_ROLE = {
  生气: '大吉：最宜开门、主卧、灶口朝向',
  延年: '大吉：宜开门、主卧（利感情与人缘）',
  天医: '次吉：宜主卧、书房、老人房（利健康）',
  伏位: '次吉：宜卧室、神位（主平稳）',
  祸害: '小凶：宜厕所、储物间（宜静不宜动）',
  六煞: '次凶：宜厕所、储物间',
  五鬼: '大凶：宜厕所，或以灶坐压之（传统「火烧五鬼」说）',
  绝命: '最凶：宜灶坐压之、储物，忌门床',
};

const GUA_BY_NUM = ['坎', '坤', '震', '巽', '中', '乾', '兑', '艮', '离'];

/**
 * 八宅命卦：按节气年（立春界）公元年后两位 n：
 *   1900–1999：男 (100−n) ÷ 9 取余，女 (n−4) ÷ 9 取余；
 *   2000–2099：男 (99−n) ÷ 9 取余，女 (n−3) ÷ 9 取余（负数加 9）。
 * 余 0 作 9；余 5 男作坤、女作艮。数→卦：1坎 2坤 3震 4巽 6乾 7兑 8艮 9离。
 */
export function mingGua(birthYear, gender) {
  const tail = ((birthYear % 100) + 100) % 100;
  const century = birthYear >= 2000 ? { male: 99, female: 3 } : { male: 100, female: 4 };
  const mod9 = (n) => { const r = ((n % 9) + 9) % 9; return r === 0 ? 9 : r; };
  let num = gender === 'male' ? mod9(century.male - tail) : mod9(tail - century.female);
  if (num === 5) num = gender === 'male' ? 2 : 8;
  const gua = GUA_BY_NUM[num - 1];
  if (gua === '中') throw new Error('命卦计算异常：落中宫');
  return { num, gua, direction: PALACE_DIRECTION[gua] };
}

/** 大游年八星（含伏位=本卦）。 */
export function eightStars(gua) {
  const result = { 伏位: { palace: gua, direction: PALACE_DIRECTION[gua] } };
  const start = YOUNIAN_ORDER.indexOf(gua);
  for (let step = 1; step <= 7; step++) {
    const palace = YOUNIAN_ORDER[(start + step) % 8];
    result[DAYOUTIAN[gua][step - 1]] = { palace, direction: PALACE_DIRECTION[palace] };
  }
  return result;
}

/** 立春界节气年：生日在当年立春前 → 上一年（按正午判，与黄历一致）。 */
export function guaYearOf(year, month, day) {
  const birthJd = partsToJd({ year, month, day, hour: 12, minute: 0 });
  return birthJd < termInstantJd(year, 2) ? year - 1 : year;
}

/**
 * 年紫白入中之星（1–9）：锚点 2026 丙午 = 一白，逐年退一位，九年一轮。
 * 对照公开表：2024 三碧、2025 二黑、2026 一白、2027 九紫、2034 二黑、2035 一白。
 */
export function yearZibaiStar(year) {
  const n = (1 + (2026 - year)) % 9;
  return n <= 0 ? n + 9 : n;
}

const PALACE_ORDER = ['坎', '坤', '震', '巽', '中', '乾', '兑', '艮', '离']; // 洛书数 1–9 对应宫

const norm9 = (n) => {
  const r = ((n % 9) + 9) % 9;
  return r === 0 ? 9 : r;
};

/** 紫白九宫：入中星按洛书轨迹飞布。forward=true 顺飞，false 逆飞。 */
function zibaiChart(center, forward = true) {
  const palaces = [];
  for (const palace of PALACE_ORDER) {
    const k = PALACE_ORDER.indexOf(palace) + 1;
    const num = norm9(k - 5 + center);
    const s = NINE_STARS[num];
    palaces.push({ palace, direction: palace === '中' ? '中宫' : PALACE_DIRECTION[palace], num, name: s.name, star: s.star, element: s.element, lucky: s.lucky });
  }
  return { center, centerName: NINE_STARS[center].name, forward, fly: forward ? '顺飞' : '逆飞', palaces };
}

/** 九宫飞星：年星入中顺飞。 */
export function yearlyFlying(year) {
  return zibaiChart(yearZibaiStar(year), true);
}

// ── 年、月、日、时紫白（公式派） ─────────────────────────────────
// 年：年星逐年退一位，入中顺飞（与 yearZibaiStar 同一锚点）。
// 月：子午卯酉年正月八白、辰戌丑未年正月五黄、寅申巳亥年正月二黑；逐月退一位，入中顺飞。
// 日：冬至–夏至阳遁、夏至–冬至阴遁；三段（冬至/雨水/谷雨、夏至/处暑/霜降）分别起 1/7/4 与 9/3/6。
// 时：冬至后四正日/四墓日/四生日子时起 1/7/4；夏至后起 9/3/6；阳遁时星顺行顺飞、阴遁时星逆行逆飞。
// 口径说明：月按节气月（寅月为正月）；日按公历日、23:00 后归次日；各家另有「日星一律顺飞」「月按农历月」等说法，见 note。

const JIE_MONTH_NUM = {
  立春: 1, 惊蛰: 2, 清明: 3, 立夏: 4, 芒种: 5, 小暑: 6,
  立秋: 7, 白露: 8, 寒露: 9, 立冬: 10, 大雪: 11, 小寒: 12,
};
const MONTH_START_BY_GROUP = { 四正: 8, 四墓: 5, 四生: 2 };
const HOUR_START_WINTER = { 四正: 1, 四墓: 7, 四生: 4 };
const HOUR_START_SUMMER = { 四正: 9, 四墓: 3, 四生: 6 };

const branchGroupOf = (branch) => (
  ['子', '午', '卯', '酉'].includes(branch) ? '四正'
    : ['辰', '戌', '丑', '未'].includes(branch) ? '四墓' : '四生'
);

const yearBranchOf = (year) => ganzhiName((((year - 4) % 60) + 60) % 60).branch;

function latestTerm(terms, name, jd) {
  let found = null;
  for (const t of terms) {
    if (t.jd > jd) break;
    if (t.name === name) found = t;
  }
  return found;
}

/** 冬至/夏至分阴阳遁，再按雨水/谷雨或处暑/霜降分上中下元。 */
function zibaiHalfAt(terms, jd) {
  const dz = latestTerm(terms, '冬至', jd);
  const xz = latestTerm(terms, '夏至', jd);
  const yang = Boolean(dz) && (!xz || dz.jd > xz.jd);
  if (yang) {
    const gy = latestTerm(terms, '谷雨', jd);
    const ys = latestTerm(terms, '雨水', jd);
    if (gy && dz && gy.jd > dz.jd) return { half: '阳遁', segment: '谷雨–夏至（下元）', offset: 3, boundary: '冬至后阳遁，谷雨至上元转下元' };
    if (ys && dz && ys.jd > dz.jd) return { half: '阳遁', segment: '雨水–谷雨（中元）', offset: 6, boundary: '冬至后阳遁，雨水至上元转中元' };
    return { half: '阳遁', segment: '冬至–雨水（上元）', offset: 0, boundary: '冬至后阳遁上元' };
  }
  const sj = latestTerm(terms, '霜降', jd);
  const cs = latestTerm(terms, '处暑', jd);
  if (sj && xz && sj.jd > xz.jd) return { half: '阴遁', segment: '霜降–冬至（下元）', offset: 3, boundary: '夏至后阴遁，霜降至上元转下元' };
  if (cs && xz && cs.jd > xz.jd) return { half: '阴遁', segment: '处暑–霜降（中元）', offset: 6, boundary: '夏至后阴遁，处暑至上元转中元' };
  return { half: '阴遁', segment: '夏至–处暑（上元）', offset: 0, boundary: '夏至后阴遁上元' };
}

/**
 * 年月日时紫白飞星。
 * @param {{year:number,month:number,day:number,hour?:number,minute?:number}} at 公历日期与时刻
 */
export function timeFlyingOf(at) {
  const year = Number(at.year); const month = Number(at.month); const day = Number(at.day);
  const hour = Number.isInteger(at.hour) ? at.hour : 12;
  const minute = Number.isInteger(at.minute) ? at.minute : 0;
  const jd = partsToJd({ year, month, day, hour, minute });
  const terms = termWindow(year);
  const guaYear = guaYearOf(year, month, day);
  const yearBranch = yearBranchOf(guaYear);
  const yearGroup = branchGroupOf(yearBranch);
  const prevJie = previousJie(terms, jd);
  const monthNum = JIE_MONTH_NUM[prevJie ? prevJie.name : '立春'] || 1;
  const half = zibaiHalfAt(terms, jd);
  const jdn = toJDN(year, month, day) + (hour >= 23 ? 1 : 0);
  const dayIdx = dayGanzhiIndex(jdn);
  const dayName = ganzhiName(dayIdx).name;
  const dayBranch = ganzhiName(dayIdx).branch;
  const dayGroup = branchGroupOf(dayBranch);
  const hourIdx = Math.floor(((hour + 1) % 24) / 2);

  const yearCenter = yearZibaiStar(guaYear);
  const monthCenter = norm9(MONTH_START_BY_GROUP[yearGroup] - (monthNum - 1));
  const dayBase = norm9(dayIdx + 1 + half.offset);
  const dayCenter = half.half === '阳遁' ? dayBase : norm9(10 - dayBase);
  const hourStart = half.half === '阳遁' ? HOUR_START_WINTER[dayGroup] : HOUR_START_SUMMER[dayGroup];
  const hourCenter = norm9(hourStart + (half.half === '阳遁' ? hourIdx : -hourIdx));

  return {
    year: { ...zibaiChart(yearCenter, true), basis: `${guaYear} 年（立春界）年星 ${NINE_STARS[yearCenter].name} 入中顺飞` },
    month: { ...zibaiChart(monthCenter, true), basis: `${yearBranch}年（${yearGroup}）${prevJie ? prevJie.name : '立春'}月，${monthNum} 月 ${NINE_STARS[monthCenter].name} 入中顺飞` },
    day: { ...zibaiChart(dayCenter, half.half === '阳遁'), basis: `${half.half}·${half.segment}，${dayName}日第 ${dayIdx + 1} 位，${NINE_STARS[dayCenter].name} 入中${half.half === '阳遁' ? '顺' : '逆'}飞` },
    hour: { ...zibaiChart(hourCenter, half.half === '阳遁'), basis: `${half.half}·${half.segment}，${dayGroup}日 ${BRANCHES[hourIdx]}时，${NINE_STARS[hourCenter].name} 入中${half.half === '阳遁' ? '顺' : '逆'}飞` },
    meta: {
      guaYear, yearBranch, yearGroup, monthNum, monthJie: prevJie ? prevJie.name : '立春',
      dayGanzhi: dayName, daySeq: dayIdx + 1, dayGroup,
      hourBranch: BRANCHES[hourIdx], half: half.half, segment: half.segment, boundary: half.boundary,
      note: '月按节气月（寅月为正月）；日按公历日、23:00 后归次日；日/时星入中后的顺逆取「冬至顺、夏至逆」。另有「一律顺飞」与「月按农历月」派，本插件不合并，差异见本注。',
    },
  };
}

const pad2 = (n) => String(n).padStart(2, '0');

// ── 玄空飞星（下卦） ─────────────────────────────────────────────
// 口径：三元九运每运 20 年，1864 年起一运；运盘当运星入中顺飞。
// 山盘/向盘：取坐宫/向宫的运星入中，按「入中运星本宫同元龙」的阴阳定顺逆（五黄入中按本山阴阳）。
// 这一步是玄空挨星的关键：不是按坐山本身的阴阳，而是按入中运星原宫对应元龙的阴阳；
// 按本山阴阳会把旺山旺向算成每运固定的六局，与通行二十四山旺山旺向表对不上。

/** 三元九运：1864 起每 20 年一运，九运一轮（180 年）。 */
export function periodOfYear(year) {
  const k = Math.floor((year - 1864) / 20);
  const period = ((k % 9) + 9) % 9 + 1;
  const start = 1864 + 20 * k;
  return { period, start, end: start + 19, label: `${period}运（${start}–${start + 19}）` };
}

/** 三元龙阴阳：天元/人元四隅为阳、四正为阴；地元四正为阳、四隅为阴。 */
const YANG_MOUNTAINS = new Set(['乾', '巽', '艮', '坤', '甲', '庚', '壬', '丙', '寅', '申', '巳', '亥']);
const YUAN_NAME = ['地元', '天元', '人元'];

/** 24 山 → 三元龙 + 阴阳（MOUNTAINS_24 每卦三山依次为 地元/天元/人元）。 */
export const MOUNTAIN_META = {};
MOUNTAINS_24.forEach((x, i) => {
  MOUNTAIN_META[x.m] = { ...x, yuan: YUAN_NAME[i % 3], yinYang: YANG_MOUNTAINS.has(x.m) ? '阳' : '阴' };
});

/** 飞星轨迹：中 → 乾 → 兑 → 艮 → 离 → 坎 → 坤 → 震 → 巽（即洛书 5→6→7→8→9→1→2→3→4）。 */
const FLY_SEQ = ['中', '乾', '兑', '艮', '离', '坎', '坤', '震', '巽'];
const NUM_TO_GUA = ['坎', '坤', '震', '巽', '中', '乾', '兑', '艮', '离']; // 洛书数 1–9 本位卦
const YUAN_INDEX = { 地元: 0, 天元: 1, 人元: 2 };

const mountainsOfGua = (gua) => MOUNTAINS_24.filter((x) => x.gua === gua).map((x) => MOUNTAIN_META[x.m]);

/** 入中星按轨迹飞布：forward=true 顺飞，false 逆飞。返回 宫 → 星数。 */
function fly(center, forward) {
  const out = {};
  for (let i = 0; i < 9; i++) {
    const v = ((center - 1 + (forward ? i : -i)) % 9 + 9) % 9 + 1;
    out[FLY_SEQ[i]] = v;
  }
  return out;
}

/** 入中运星定顺逆：取本宫（运星本位卦）同元龙之山的阴阳；五黄入中按本山阴阳。 */
function flightOf(mount, center) {
  if (center === 5) {
    return { forward: mount.yinYang === '阳', basis: `五黄入中，按${mount.m}本山${mount.yuan}${mount.yinYang}论` };
  }
  const home = NUM_TO_GUA[center - 1];
  const hm = mountainsOfGua(home)[YUAN_INDEX[mount.yuan]];
  return { forward: hm.yinYang === '阳', basis: `${center}${home}宫取${mount.yuan}${hm.m}（${hm.yinYang}）` };
}

// ── 兼向替卦 ─────────────────────────────────────────────────────
// 兼向超过 4.5°（离山界 3° 以内）用替卦：山星/向星改以该山的替星入中，顺逆仍按
// 「替星本宫同元龙」的阴阳定。替星取《沈氏玄空学》坤壬乙诀（1/2/6/7/9 五星）；
// 三碧、四绿、八白在此诀中不作替星，属各家分歧，见 note。
export const TIGUA_SOURCE = '《沈氏玄空学》坤壬乙诀（子癸甲申一白、壬卯乙未坤二黑、乾亥辰巽巳戌六白、酉辛丑艮丙七赤、寅午庚丁九紫）';

export const TIGUA_TABLE = Object.freeze({
  子: 1, 癸: 1, 甲: 1, 申: 1,
  壬: 2, 卯: 2, 乙: 2, 未: 2, 坤: 2,
  乾: 6, 亥: 6, 辰: 6, 巽: 6, 巳: 6, 戌: 6,
  酉: 7, 辛: 7, 丑: 7, 艮: 7, 丙: 7,
  寅: 9, 午: 9, 庚: 9, 丁: 9,
});

export const JIAN_XIANG_THRESHOLD = 4.5;

/** 兼向判定：offset 为坐山相对本山中心的度数，正数向下一山（顺时针）。 */
export function jianXiangOf(sitting, offset = 0) {
  const off = Number(offset) || 0;
  if (Math.abs(off) <= JIAN_XIANG_THRESHOLD) {
    return {
      active: false, offset: off, threshold: JIAN_XIANG_THRESHOLD,
      sitting: sitting.m, jian: null, kind: null, sameYinYang: null,
      note: `坐山偏离中心 ${off}°，未超 ${JIAN_XIANG_THRESHOLD}°，按正向下卦排盘。`,
    };
  }
  const idx = MOUNTAINS_24.findIndex((x) => x.m === sitting.m);
  const neighbor = MOUNTAINS_24[(idx + (off > 0 ? 1 : -1) + 24) % 24];
  const sMeta = MOUNTAIN_META[sitting.m];
  const nMeta = MOUNTAIN_META[neighbor.m];
  const sameGua = neighbor.gua === sitting.gua;
  return {
    active: true, offset: off, threshold: JIAN_XIANG_THRESHOLD,
    sitting: sitting.m, jian: neighbor.m, side: off > 0 ? '右' : '左',
    kind: sameGua ? '同卦兼' : '出卦兼',
    sameYinYang: nMeta.yinYang === sMeta.yinYang,
    note: `坐山偏离中心 ${off}°，兼${neighbor.m}（${sameGua ? '同卦兼' : '出卦兼'}${sameGua && nMeta.yinYang === sMeta.yinYang ? '，同阴同阳' : ''}）；按沈氏替卦，山星以 ${TIGUA_TABLE[sitting.m]} 入中。`,
  };
}

/** 通行二十四山旺山旺向表（每项含正反两向；一运、九运无局）。 */
export const WANG_SHAN_WANG_XIANG = {
  1: [],
  2: [['乾', '巽'], ['亥', '巳'], ['丑', '未']],
  3: [['卯', '酉'], ['乙', '辛'], ['辰', '戌']],
  4: [['艮', '坤'], ['寅', '申'], ['甲', '庚']],
  5: [['子', '午'], ['癸', '丁'], ['卯', '酉'], ['乙', '辛'], ['丑', '未'], ['辰', '戌']],
  6: [['艮', '坤'], ['寅', '申'], ['甲', '庚']],
  7: [['卯', '酉'], ['乙', '辛'], ['辰', '戌']],
  8: [['乾', '巽'], ['亥', '巳'], ['丑', '未']],
  9: [],
};

export const XUANKONG_SOURCES = [
  '三元九运（1864 年起一运、每运 20 年，九运 180 年一轮）',
  '玄空下卦挨星（运盘顺飞；山盘/向盘以入中运星本宫同元龙阴阳定顺逆，五黄入中按本山阴阳）',
  '兼向替卦：坐山偏离中心超 4.5° 用《沈氏玄空学》坤壬乙诀替星入中，顺逆按替星本宫同元龙',
  '年月日时紫白（公式派：年逐年退一位；月按年支三组起 8/5/2；日按冬至夏至三段起 1/7/4 与 9/3/6；时按日支三组子时起 1/7/4 与 9/3/6）',
  '二十四山旺山旺向通行表（每项含正反两向；一运、九运无局；只对正向下卦）',
];

export const XUANKONG_DISCLAIMER = '玄空排盘为传统通行口径的本地计算，属民俗参考，不构成现场勘舆结论，仅供娱乐；兼向超 4.5° 按沈氏替卦，年月日时紫白按公式派；各家另有异说，形峦与现场勘舆不在本工具范围内。';

/** 玄空排盘：运盘 + 山盘 + 向盘 + 当运星 + 合十 + 表法旺山旺向；兼向超阈值改用替卦。 */
export function xuankongChart(period, sitting, facing, opts = {}) {
  const sit = MOUNTAIN_META[sitting];
  const face = MOUNTAIN_META[facing];
  const offset = Number(opts.offset) || 0;
  const jianXiang = jianXiangOf(sit, offset);
  const yun = fly(period, true);
  const sCenter = jianXiang.active ? TIGUA_TABLE[sit.m] : yun[sit.gua];
  const fCenter = jianXiang.active ? TIGUA_TABLE[face.m] : yun[face.gua];
  const sFly = flightOf(sit, sCenter);
  const fFly = flightOf(face, fCenter);
  const shan = fly(sCenter, sFly.forward);
  const xiang = fly(fCenter, fFly.forward);
  const palaces = PALACE_ORDER.map((palace, i) => ({
    palace,
    direction: palace === '中' ? '中宫' : PALACE_DIRECTION[palace],
    luoshu: i + 1,
    yun: yun[palace],
    shan: shan[palace],
    xiang: xiang[palace],
  }));
  const wheres = (map) => PALACE_ORDER.filter((p) => map[p] === period);
  const pairs = WANG_SHAN_WANG_XIANG[period];
  const hit = pairs.find(([a, b]) => (sit.m === a && face.m === b) || (sit.m === b && face.m === a));
  const byChart = shan[sit.gua] === period && xiang[face.gua] === period;
  const replaced = {
    shan: jianXiang.active && sCenter !== yun[sit.gua],
    xiang: jianXiang.active && fCenter !== yun[face.gua],
  };
  const note = jianXiang.active
    ? `替卦盘不套正向旺山旺向表；${byChart ? '本盘当运山星/向星仍到坐向。' : '本盘当运山星/向星未同时到坐向。'}${!replaced.shan && !replaced.xiang ? '山向两替星均「用替而未替」，实际仍按原卦气。' : ''}`
    : byChart && hit
      ? '盘面与表法一致：本局到山到向。'
      : byChart
        ? '盘面到山到向，但不在通行表法所列之局（表法与盘面口径不同，并列不合并）。'
        : hit
          ? '通行表法列为旺山旺向，但本盘当运山星/向星未同时落坐向（表法与盘面口径不同，并列不合并）。'
          : '本局既未到山到向，也不在表法旺山旺向之列。';
  return {
    palaces,
    sitting: sit,
    facing: face,
    yun,
    shan,
    xiang,
    yunCenter: period,
    jianXiang,
    shanCenter: {
      star: sCenter, ...sFly,
      mode: jianXiang.active ? '替卦' : '下卦',
      original: yun[sit.gua],
      replaced: replaced.shan,
    },
    xiangCenter: {
      star: fCenter, ...fFly,
      mode: jianXiang.active ? '替卦' : '下卦',
      original: yun[face.gua],
      replaced: replaced.xiang,
    },
    dangYun: { shan: wheres(shan), xiang: wheres(xiang) },
    heshi: {
      shan: PALACE_ORDER.filter((p) => shan[p] + yun[p] === 10),
      xiang: PALACE_ORDER.filter((p) => xiang[p] + yun[p] === 10),
    },
    wangShanWangXiang: {
      byChart,
      byTable: jianXiang.active ? null : Boolean(hit),
      table: pairs.map(([a, b]) => `${a}${b}`),
      note,
    },
  };
}

/** DST 校正出生日期（1986–1991），返回校正后的年月日。 */
function civilDate(input) {
  const dst = input.dst === false
    ? { year: input.year, month: input.month, day: input.day, hour: 0, minute: 0, applied: false, note: null }
    : applyDst({ year: input.year, month: input.month, day: input.day, hour: 0, minute: 0 });
  return { year: dst.year, month: dst.month, day: dst.day, dst };
}

const SOURCES = [
  '大游年歌（八宅通行口径）',
  '年家紫白飞星（纯公式：以 2026 丙午一白入中、逐年退一位、九年一轮；按立春换年）',
  '24 山归属与度数（八宅通行口径，每山 15°）',
];

const DISCLAIMER = '八宅与飞星为传统通行口径的本地计算，属民俗参考，不构成现场勘舆结论，仅供娱乐；实际户型以现场为准。';

/**
 * 风水主函数。
 * @param {{action?:'natal'|'advise'|'xuankong', year?:number, month?:number, day?:number, gender?:'male'|'female',
 *          fortuneYear?:number, sitting?:string, facing?:string, period?:number, dst?:boolean}} input
 *  natal（默认）：要生日 + 性别 + 流年（缺流年则只算命卦与八星）。
 *  advise：要坐山或向山（24 山，给一即可）；出生信息可选，给了才做命宅配。
 *  xuankong：要坐山或向山；运由 period（1–9）或 fortuneYear 定，缺省按九运并注明。
 */
export function buildFengshui(input) {
  if (input.action === 'advise') return buildAdvise(input);
  if (input.action === 'xuankong') return buildXuankong(input);
  const gender = input.gender;
  if (gender !== 'male' && gender !== 'female') {
    throw fail('E_INPUT', '风水命卦需要性别：男女命卦算法不同，不可缺省');
  }
  if (!Number.isInteger(input.year) || !Number.isInteger(input.month) || !Number.isInteger(input.day)) {
    throw fail('E_INPUT', '风水命卦需要完整出生年月日（公历）——只知道年份不够：命卦按立春界划分出生年');
  }
  const civil = civilDate(input);
  const guaYear = guaYearOf(civil.year, civil.month, civil.day);
  const { num, gua, direction } = mingGua(guaYear, gender);
  const stars = eightStars(gua);
  const eastFour = ['坎', '离', '震', '巽'].includes(gua);
  const fortuneYear = Number.isInteger(input.fortuneYear) ? input.fortuneYear : null;

  return {
    system: 'fengshui',
    meta: {
      birth: `${civil.year}-${pad2(civil.month)}-${pad2(civil.day)}`,
      guaYear,
      gender: gender === 'male' ? '男' : '女',
      fortuneYear,
      ...(civil.dst.applied ? { dst: civil.dst.note } : {}),
      ...(fortuneYear === null ? { note: '未给流年：未算年紫白飞星（需要时补 fortuneYear）。' } : {}),
      scope: '八宅命卦 + 大游年八星 + 年紫白；玄空飞星见 action=xuankong；不含形峦与现场勘舆。',
    },
    mingGua: {
      num,
      gua,
      direction,
      group: eastFour ? '东四命' : '西四命',
      compatible: eastFour ? '宜东四宅（坐坎离震巽）' : '宜西四宅（坐乾坤艮兑）',
    },
    luckyDirections: LUCKY_STARS.map((s) => ({ star: s, ...stars[s] })),
    unluckyDirections: UNLUCKY_STARS.map((s) => ({ star: s, ...stars[s] })),
    ...(fortuneYear === null ? {} : { yearlyFlying: yearlyFlying(fortuneYear) }),
    sources: SOURCES,
    disclaimer: DISCLAIMER,
  };
}

/** 坐向解析：至少给坐或向；两者都给则必须对宫。 */
function resolveSittingFacing(input) {
  const hasSitting = typeof input.sitting === 'string' && input.sitting.trim() !== '';
  const hasFacing = typeof input.facing === 'string' && input.facing.trim() !== '';
  if (!hasSitting && !hasFacing) {
    throw fail('E_INPUT', '缺少坐向：sitting（坐山）或 facing（向山）至少给一个——按罗盘 24 山报坐或报向，例如「坐北朝南」对应坐子向午');
  }
  if (hasSitting && hasFacing) {
    const s = mountainInfo(input.sitting.trim());
    const f = mountainInfo(input.facing.trim());
    if ((s.index + 12) % 24 !== f.index) {
      throw fail('E_INPUT', `坐向不自洽：坐${s.m}（${s.deg}°）与向${f.m}（${f.deg}°）不是对宫（相差应 180°，实测 ${((f.deg - s.deg) + 360) % 360}°）——请核对罗盘读数。`);
    }
  }
  const sitting = hasSitting ? mountainInfo(input.sitting.trim()) : sittingFromFacing(input.facing.trim());
  const facing = MOUNTAINS_24[(sitting.index + 12) % 24];
  return { sitting, facing };
}

/** 宅卦坐向 + 门主灶厕布局倾向 + 命宅配。 */
function buildAdvise(input) {
  const { sitting, facing } = resolveSittingFacing(input);
  const houseGua = sitting.gua;
  const stars = eightStars(houseGua);
  const lucky = LUCKY_STARS.map((s) => stars[s]);
  const unlucky = UNLUCKY_STARS.map((s) => stars[s]);
  const dir = (x) => `${x.direction}（${x.palace}宫）`;

  const starChart = [...LUCKY_STARS, ...UNLUCKY_STARS].map((s) => ({
    star: s,
    lucky: LUCKY_STARS.includes(s),
    ...stars[s],
    role: STAR_LAYOUT_ROLE[s],
  }));

  const layout = {
    door: `门宜开于吉方：首选生气方 ${dir(lucky[0])}，次选延年方 ${dir(lucky[1])}、天医方 ${dir(lucky[2])}。`,
    stove: `灶宜「坐凶向吉」：灶身压凶方（首选绝命方 ${dir(unlucky[0])}、五鬼方 ${dir(unlucky[1])}），灶口朝吉方。`,
    bed: `主卧与床头宜安吉方：生气方 ${dir(lucky[0])} 或延年方 ${dir(lucky[1])}；床头宜向吉方。`,
    toilet: `厕所宜压凶方：祸害方 ${dir(unlucky[3])} 或六煞方 ${dir(unlucky[2])}（污去凶气，宜静常闭）。`,
  };

  let mingMatch = null;
  const hasBirth = Number.isInteger(input.year) && Number.isInteger(input.month) && Number.isInteger(input.day)
    && (input.gender === 'male' || input.gender === 'female');
  if (hasBirth) {
    const civil = civilDate(input);
    const guaYear = guaYearOf(civil.year, civil.month, civil.day);
    const ming = mingGua(guaYear, input.gender);
    const mGroup = guaGroup(ming.gua);
    const hGroup = guaGroup(houseGua);
    const same = mGroup === hGroup;
    const mingLucky = LUCKY_STARS.map((s) => `${s}位${eightStars(ming.gua)[s].direction}`).join('、');
    mingMatch = {
      birth: `${civil.year}-${pad2(civil.month)}-${pad2(civil.day)}`,
      guaYear,
      gender: input.gender === 'male' ? '男' : '女',
      mingGua: { gua: ming.gua, direction: ming.direction, group: `${mGroup}命` },
      houseGua: { gua: houseGua, group: `${hGroup}宅` },
      sameGroup: same,
      text: same
        ? `命宅相配（${mGroup}命住${hGroup}宅）：以宅之八星盘布局即可，个人吉方与宅吉方大体同向。`
        : `命宅不配（${mGroup}命住${hGroup}宅）：传统调停法——门与床以命卦吉方为先（此命四吉方：${mingLucky}），灶仍按宅卦坐凶向吉，两盘各自取用。`,
    };
  }

  return {
    system: 'fengshui',
    meta: {
      action: 'advise',
      ...(hasBirth ? {} : { birthNote: '未提供生辰：未做命宅配；如需按个人命卦调停门床，请补充出生年月日与性别。' }),
      sitting: `${sitting.m}山（罗盘 ${sitting.deg}°）`,
      facing: `${facing.m}山（罗盘 ${facing.deg}°）`,
      houseGua,
      houseGroup: `${guaGroup(houseGua)}宅`,
      scope: '门主灶厕走向按八宅通行口径给倾向，玄空飞星见 action=xuankong；不含形峦、不是现场勘舆结论。',
    },
    houseStars: starChart,
    layout,
    ...(mingMatch ? { mingMatch } : {}),
    sources: SOURCES,
    disclaimer: DISCLAIMER,
  };
}

/** 兼向读数：接受坐/向的偏移度数或罗盘度数，两边都给时必须一致。 */
function resolveOffset(input, sitting, facing) {
  const present = (v) => v !== undefined && v !== null && v !== '';
  const number = (v, label) => {
    if (typeof v !== 'number' || !Number.isFinite(v)) throw fail('E_INPUT', `${label} 必须是数字（度），收到「${v}」`);
    return v;
  };
  const degreeOffset = (v, mountain, label) => {
    const deg = number(v, label);
    if (deg < 0 || deg > 360) throw fail('E_INPUT', `${label} 必须在 0–360° 之间（罗盘度数），收到「${deg}」`);
    const diff = ((deg - mountain.deg + 540) % 360) - 180;
    if (Math.abs(diff) > 7.5 + 1e-9) throw fail('E_INPUT', `${label} ${deg}° 不在${mountain.m}山范围内（${mountain.m}中心 ${mountain.deg}°，每山 15°），请核对坐向。`);
    return diff;
  };
  const values = [];
  if (present(input.sittingOffset)) values.push(number(input.sittingOffset, 'sittingOffset'));
  if (present(input.sittingDegree)) values.push(degreeOffset(input.sittingDegree, sitting, 'sittingDegree'));
  if (present(input.facingOffset)) values.push(number(input.facingOffset, 'facingOffset'));
  if (present(input.facingDegree)) values.push(degreeOffset(input.facingDegree, facing, 'facingDegree'));
  if (!values.length) return { offset: 0, source: '未报兼向度数，按正向（0°）' };
  const offset = values[0];
  if (values.some((v) => Math.abs(v - offset) > 1e-9)) throw fail('E_INPUT', `坐向兼度不一致：${values.join('° / ')}°——坐与向应同向偏离，请只报一个偏移或核对度数。`);
  if (Math.abs(offset) > 7.5 + 1e-9) throw fail('E_INPUT', `兼向偏移必须在 −7.5°–7.5°（相对本山中心），收到「${offset}」——超过 7.5° 已进入下一山。`);
  return { offset, source: '按所报兼向度数' };
}

/** 飞星日期：fortuneDate=YYYY-MM-DD、fortuneTime=HH:MM；缺省 12:00。 */
function parseFortuneAt(input) {
  const present = (v) => v !== undefined && v !== null && v !== '';
  if (!present(input.fortuneDate)) return null;
  if (typeof input.fortuneDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(input.fortuneDate)) {
    throw fail('E_INPUT', `fortuneDate 需为 YYYY-MM-DD，收到「${input.fortuneDate}」`);
  }
  const [year, month, day] = input.fortuneDate.split('-').map(Number);
  const probe = new Date(Date.UTC(year, month - 1, day));
  if (probe.getUTCFullYear() !== year || probe.getUTCMonth() !== month - 1 || probe.getUTCDate() !== day) {
    throw fail('E_INPUT', `fortuneDate 不是有效日期：「${input.fortuneDate}」`);
  }
  const rawTime = present(input.fortuneTime) ? input.fortuneTime : '12:00';
  if (typeof rawTime !== 'string' || !/^\d{2}:\d{2}$/.test(rawTime)) {
    throw fail('E_INPUT', `fortuneTime 需为 HH:MM，收到「${rawTime}」`);
  }
  const [hour, minute] = rawTime.split(':').map(Number);
  if (hour > 23 || minute > 59) throw fail('E_INPUT', `fortuneTime 超出范围（HH:MM）：「${rawTime}」`);
  const dst = input.dst === false ? null : applyDst({ year, month, day, hour, minute });
  const at = dst ? { year: dst.year, month: dst.month, day: dst.day, hour: dst.hour, minute: dst.minute } : { year, month, day, hour, minute };
  return { at, dst };
}

/** 玄空排盘：坐向 + 运 → 九宫盘、当运星、合十、表法旺山旺向；兼向超阈值用替卦。 */
function buildXuankong(input) {
  const { sitting, facing } = resolveSittingFacing(input);
  const offsetInfo = resolveOffset(input, sitting, facing);
  const fortune = parseFortuneAt(input);
  let period;
  let yearInfo = null;
  let note;
  if (input.period !== undefined && input.period !== null && !Number.isInteger(input.period)) {
    throw fail('E_INPUT', `运必须是 1–9 的整数（三元九运），收到「${input.period}」——一运 1864 起、九运 2024–2043。`);
  }
  if (Number.isInteger(input.period)) {
    if (input.period < 1 || input.period > 9) {
      throw fail('E_INPUT', `运必须是 1–9 的整数（三元九运），收到「${input.period}」——一运 1864 起、九运 2024–2043。`);
    }
    period = input.period;
  } else if (Number.isInteger(input.fortuneYear)) {
    yearInfo = periodOfYear(input.fortuneYear);
    period = yearInfo.period;
  } else if (fortune) {
    yearInfo = periodOfYear(guaYearOf(fortune.at.year, fortune.at.month, fortune.at.day));
    period = yearInfo.period;
    note = `未显式给运：按飞星日期归入 ${yearInfo.label}。`;
  } else {
    period = 9;
    note = '未给运：默认按九运（2024–2043）排盘；可传 period（1–9）或 fortuneYear 指定。';
  }
  const chart = xuankongChart(period, sitting.m, facing.m, { offset: offsetInfo.offset });
  const sitMeta = MOUNTAIN_META[sitting.m];
  const faceMeta = MOUNTAIN_META[facing.m];
  const center = (c) => ({
    star: c.star, name: NINE_STARS[c.star].name, fly: c.forward ? '顺飞' : '逆飞', basis: c.basis,
    mode: c.mode, original: c.original, replaced: c.replaced,
  });
  const where = (list) => list.map((p) => (p === '中' ? '中宫' : `${p}宫${PALACE_DIRECTION[p]}`)).join('、') || '无';
  let timeFlying = null;
  if (fortune) {
    timeFlying = timeFlyingOf(fortune.at);
    if (fortune.dst && fortune.dst.applied) timeFlying.meta.dst = fortune.dst.note;
  } else if (Number.isInteger(input.fortuneYear)) {
    const centerStar = yearZibaiStar(input.fortuneYear);
    timeFlying = {
      year: { ...zibaiChart(centerStar, true), basis: `${input.fortuneYear} 年紫白 ${NINE_STARS[centerStar].name} 入中顺飞` },
      month: null, day: null, hour: null,
      meta: { guaYear: input.fortuneYear, note: '只给年份：已排年紫白；补 fortuneDate（YYYY-MM-DD）与 fortuneTime（HH:MM）可排月、日、时。' },
    };
  }
  return {
    system: 'fengshui',
    meta: {
      action: 'xuankong',
      period,
      periodLabel: yearInfo ? yearInfo.label : `${period}运`,
      ...(yearInfo ? { year: input.fortuneYear || (fortune && fortune.at.year), periodStart: yearInfo.start, periodEnd: yearInfo.end } : {}),
      sitting: `${sitting.m}山（罗盘 ${sitting.deg}°）`,
      facing: `${facing.m}山（罗盘 ${facing.deg}°）`,
      sittingGua: sitting.gua,
      facingGua: facing.gua,
      sittingYuan: `${sitMeta.yuan}${sitMeta.yinYang}`,
      facingYuan: `${faceMeta.yuan}${faceMeta.yinYang}`,
      sittingOffset: offsetInfo.offset,
      jianXiang: chart.jianXiang,
      shanCenter: center(chart.shanCenter),
      xiangCenter: center(chart.xiangCenter),
      ...(note ? { note } : {}),
      scope: '玄空下卦/替卦：运盘 + 山盘 + 向盘 + 当运星 + 合十 + 表法旺山旺向；兼向超 4.5° 按沈氏替卦；年月日时紫白按公式派；不含形峦与现场勘舆。',
    },
    palaces: chart.palaces,
    dangYun: {
      shan: { palaces: chart.dangYun.shan, text: where(chart.dangYun.shan) },
      xiang: { palaces: chart.dangYun.xiang, text: where(chart.dangYun.xiang) },
    },
    heshi: { shan: chart.heshi.shan, xiang: chart.heshi.xiang },
    wangShanWangXiang: chart.wangShanWangXiang,
    ...(timeFlying ? { timeFlying } : {}),
    sources: XUANKONG_SOURCES,
    disclaimer: XUANKONG_DISCLAIMER,
  };
}
