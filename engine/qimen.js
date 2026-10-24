// 时家奇门（转盘，拆补法定局）。
// 算法移植自 MIT 许可的 qimendunjia-standalone@0.1.0（作者：见其 LICENSE），
// 保留其定局/排盘口径（符头定三元、值符值使推演、天盘随值符旋转、中五宫寄坤二），
// 只把历法层换成本插件自己的 calendar/lunar 模块——节气、干支、农历都走同一套已验证的源码。
import { termInstantJd, termWindow, jdToParts, partsToJd, formatJd, ganzhiName, sexagenaryIndex, STEMS, BRANCHES } from './calendar.js';
import { solarToLunar } from './lunar.js';
import { assertCivil } from './validate.js';

const TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const SAN_QI_LIU_YI = ['戊', '己', '庚', '辛', '壬', '癸', '丁', '丙', '乙'];
const LUO_SHU_ORDER = ['1', '8', '3', '4', '9', '2', '7', '6'];
const DISPLAY_ORDER = ['9', '2', '7', '6', '1', '8', '3', '4'];
const BASIC_STARS = { 1: '天蓬', 8: '天任', 3: '天冲', 4: '天辅', 9: '天英', 2: '天芮', 7: '天柱', 6: '天心', 5: '天禽' };
const BASIC_GATES = { 1: '休门', 8: '生门', 3: '伤门', 4: '杜门', 9: '景门', 2: '死门', 7: '惊门', 6: '开门', 5: '' };
// 八神命名对齐参照实现：第五位作「勾陈」、第六位作「朱雀」（部分流派作白虎/玄武，位置一致）
const BASIC_GODS = ['值符', '螣蛇', '太阴', '六合', '勾陈', '朱雀', '九地', '九天'];
const STANDARD_STARS = ['天英', '天芮', '天柱', '天心', '天蓬', '天任', '天冲', '天辅'];
const STANDARD_GATES = ['景门', '死门', '惊门', '开门', '休门', '生门', '伤门', '杜门'];
const STANDARD_GODS = ['值符', '螣蛇', '太阴', '六合', '勾陈', '朱雀', '九地', '九天'];
const XUN_SHOU_TO_FULL_MAP = { 戊: '甲子戊', 己: '甲戌己', 庚: '甲申庚', 辛: '甲午辛', 壬: '甲辰壬', 癸: '甲寅癸' };
const ZHI_TO_GONG = { 子: '1', 丑: '8', 寅: '8', 卯: '3', 辰: '4', 巳: '4', 午: '9', 未: '2', 申: '2', 酉: '7', 戌: '6', 亥: '6' };
const COUNTER_CLOCKWISE_ORDER = ['1', '6', '7', '2', '9', '4', '3', '8'];

// 节气 → 三元局数（上/中/下），与参照实现一致
const JU_NUMBERS_MAP = {
  冬至: '174', 惊蛰: '174', 小寒: '285', 大寒: '396', 春分: '396', 雨水: '963',
  清明: '417', 立夏: '417', 立春: '852', 谷雨: '528', 小满: '528', 芒种: '639',
  夏至: '936', 白露: '936', 小暑: '825', 大暑: '714', 秋分: '714', 立秋: '258',
  寒露: '693', 立冬: '693', 处暑: '147', 霜降: '582', 小雪: '582', 大雪: '471',
};

// ── 历法适配：把本插件的时间轴转成奇门引擎要的 snapshot ──
const xunOf = (gz) => {
  const idx = indexOfGz(gz);
  if (idx < 0) return '';
  const head = Math.floor(idx / 10) * 10;
  return ganzhiName(head).name; // 甲子/甲戌/甲申/甲午/甲辰/甲寅
};
const indexOfGz = (gz) => {
  for (let i = 0; i < 60; i++) if (ganzhiName(i).name === gz) return i;
  return -1;
};

/** 由公历时刻构建快照（本地民用时间轴） */
export function buildSnapshot({ year, month, day, hour, minute, lateZiHourMode = 'same-day' }) {
  assertCivil({ year, month, day, hour, minute });
  const jd = partsToJd({ year, month, day, hour, minute });

  // 日干支：晚子时按「次日」或「当日」
  const baseJdn = partsToJd({ year, month, day, hour: 12, minute: 0 });
  const jdn = Math.floor(baseJdn + 0.5);
  const isLateZi = hour >= 23;
  const dayJdn = isLateZi && lateZiHourMode === 'next-day' ? jdn + 1 : jdn;
  const dayGz = ganzhiName((((dayJdn + 49) % 60) + 60) % 60).name;

  // 时干支（五鼠遁）：23:00 之后时柱一律按次日的日干起子时，
  // 这样 same-day / next-day 两种口径只有日柱不同、时柱一致（与参照实现一致）。
  const hourBranchIdx = Math.floor(((hour + 1) % 24) / 2);
  const hourStemBasisJdn = isLateZi ? jdn + 1 : jdn;
  const hourBasisGz = ganzhiName((((hourStemBasisJdn + 49) % 60) + 60) % 60).name;
  const dayStemIdx = STEMS.indexOf(hourBasisGz[0]);
  const hourStemIdx = (dayStemIdx % 5) * 2 + hourBranchIdx;
  const hourStem = STEMS[((hourStemIdx % 10) + 10) % 10];
  const hourGz = ganzhiName(sexagenaryIndex(STEMS.indexOf(hourStem), hourBranchIdx)).name;

  // 年月干支：用本插件已验证的八字引擎同款规则（节气月、立春年）
  const yearGz = ganzhiName((((solarYearFor(year, month, day, hour, minute) - 4) % 60) + 60) % 60).name;
  const monthGz = monthGanzhiOf(jd);

  // 符头（最近的甲/己日）：超神接气与置闰都以它为准
  const fuTouOffset = (((dayJdn + 49) % 60) + 60) % 60 % 5;
  const fuTouJdn = dayJdn - fuTouOffset;
  const fuTouMid = fuTouJdn - 0.5 + 0.5; // 符头日正午（本地轴）
  const winF = termWindow(year);
  const pastF = winF.filter((t) => t.jd <= fuTouMid);
  const fuTouTerm = pastF.length ? pastF[pastF.length - 1] : winF[0];
  const fuTouLeadDays = Math.round(fuTouTerm.jd - fuTouMid);
  // 符头到「下一个交节」的天数：超神越九日才谈置闰
  const nextTerm = winF.find((t) => t.jd > fuTouMid) || winF[winF.length - 1];
  const leadToNextTerm = Math.round(nextTerm.jd - fuTouMid);

  // 当前节气（不晚于此刻的最后一个）
  const win = termWindow(year);
  const past = win.filter((t) => t.jd <= jd);
  const cur = past.length ? past[past.length - 1] : win[0];

  // 阴阳遁：冬至（含）到夏至（不含）为阳遁
  const wsThis = termInstantJd(year, 23);
  const wsYear = jd < wsThis ? year - 1 : year;
  const wsJd = termInstantJd(wsYear, 23);
  const ssJd = termInstantJd(wsYear + 1, 11);

  // 十二时辰干支表（值符值使按 hourIndex 取）
  const hours = [];
  for (let i = 0; i < 12; i++) {
    const st = (dayStemIdx % 5) * 2 + i;
    const gz = ganzhiName(sexagenaryIndex(STEMS.indexOf(STEMS[((st % 10) + 10) % 10]), i)).name;
    hours.push({ ganZhi: gz, xun: xunOf(gz) });
  }

  const lunar = solarToLunar(year, month, day);

  return {
    yearGanZhi: yearGz,
    monthGanZhi: monthGz,
    dayGanZhi: dayGz,
    dayXun: xunOf(dayGz),
    monthXun: xunOf(monthGz),
    yearXun: xunOf(yearGz),
    hours,
    solarTermName: cur.name,
    fuTouTermName: fuTouTerm.name,
    fuTouLeadDays,
    nextTermName: nextTerm.name,
    nextTermJd: nextTerm.jd,
    leadToNextTerm,
    julianDay: jd,
    winterSolsticeJulianDay: wsJd,
    summerSolsticeJulianDay: ssJd,
    solarDate: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    lunarDate: `${lunar.year}年${lunar.isLeap ? '闰' : ''}${lunar.month}月${lunar.day}日`,
    solarTermTime: formatJd(cur.jd),
  };
}

/** 立春分界的公历年（与八字引擎一致） */
function solarYearFor(year, month, day, hour, minute) {
  const jd = partsToJd({ year, month, day, hour, minute });
  const lichun = termInstantJd(year, 2); // 立春
  return jd < lichun ? year - 1 : year;
}

/** 月柱：以「节」为界，五虎遁起月干 */
function monthGanzhiOf(jd) {
  const parts = jdToParts(jd);
  const win = termWindow(parts.year);
  const jie = win.filter((t) => t.index % 2 === 0 && t.jd <= jd);
  const cur = jie.length ? jie[jie.length - 1] : win[0];
  // 节气索引 -> 月支：小寒(0)/大寒(1)=丑，立春(2)/雨水(3)=寅 …
  const branchIdx = (Math.floor(cur.index / 2) + 1) % 12;
  const yearForMonth = solarYearFor(parts.year, parts.month, parts.day, parts.hour, parts.minute);
  const yinStem = ((STEMS.indexOf(ganzhiName((((yearForMonth - 4) % 60) + 60) % 60).name[0]) % 5) * 2 + 2) % 10;
  const offset = ((branchIdx - 2) + 12) % 12;
  return ganzhiName(sexagenaryIndex((yinStem + offset) % 10, branchIdx)).name;
}

// ── 排盘 ──

// ── 五行与同宫关系（断语层用，均为可复算事实）──
const GATE_ELEMENT = { 休门: '水', 生门: '土', 伤门: '木', 杜门: '木', 景门: '火', 死门: '土', 惊门: '金', 开门: '金' };
const STAR_ELEMENT = { 天蓬: '水', 天任: '土', 天冲: '木', 天辅: '木', 天英: '火', 天芮: '土', 天柱: '金', 天心: '金', 天禽: '土', 禽芮: '土' };
const PALACE_ELEMENT = { 1: '水', 2: '土', 3: '木', 4: '木', 5: '土', 6: '金', 7: '金', 8: '土', 9: '火' };
const SHENG = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const KE = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };

/** 两五行关系：axis = a 对 b */
export function wuxingRelation(a, b) {
  if (!a || !b) return 'unknown';
  if (a === b) return '比和';
  if (SHENG[a] === b) return '生';
  if (SHENG[b] === a) return '被生';
  if (KE[a] === b) return '克';
  if (KE[b] === a) return '被克';
  return 'unknown';
}

/**
 * 同宫门与宫的关系（严格按「门五行 vs 宫五行」，仅同宫成立）
 * 门克宫＝门迫；宫克门＝宫制门（不是门迫）；其余为门生宫/宫生门/比和
 */
export function gatePalaceRelation(gate, palace) {
  const ge = GATE_ELEMENT[gate];
  const pe = PALACE_ELEMENT[palace];
  if (!ge || !pe) return { type: 'unknown', gate: ge || null, palace: pe || null, note: '缺少门或宫的五行，无法判断' };
  if (KE[ge] === pe) return { type: '门迫', gate: ge, palace: pe, note: `${ge}克${pe}，门克宫` };
  if (KE[pe] === ge) return { type: '宫制门', gate: ge, palace: pe, note: `${pe}克${ge}，宫克门（制，不为迫）` };
  if (SHENG[ge] === pe) return { type: '门生宫', gate: ge, palace: pe, note: `${ge}生${pe}` };
  if (SHENG[pe] === ge) return { type: '宫生门', gate: ge, palace: pe, note: `${pe}生${ge}` };
  return { type: '比和', gate: ge, palace: pe, note: `${ge}与${pe}比和` };
}
function getDiPan(type, num) {
  const result = {};
  let gong = num;
  for (const stem of SAN_QI_LIU_YI) {
    result[gong.toString()] = stem;
    if (type === 'yang') gong = gong === 9 ? 1 : gong + 1;
    else gong = gong === 1 ? 9 : gong - 1;
  }
  return result;
}

function findStemPalace(diPan, stem) {
  return Object.keys(diPan).find((g) => g !== '5' && diPan[g] === stem);
}

function distributeJiuXing(diPan, xunShou, shiGan) {
  const zhiFuGong = findStemPalace(diPan, xunShou) || '2';
  const zhiFuXing = BASIC_STARS[zhiFuGong];
  if (!shiGan) return { zhiFuGong, zhiFuLuoGong: zhiFuGong, zhiFuXing, jiuXing: { ...BASIC_STARS } };
  const zhiFuLuoGong = findStemPalace(diPan, shiGan) || (diPan['5'] === shiGan ? '2' : zhiFuGong);
  const zhiFuIndex = LUO_SHU_ORDER.indexOf(zhiFuGong);
  const luoGongIndex = LUO_SHU_ORDER.indexOf(zhiFuLuoGong);
  if (zhiFuIndex === -1 || luoGongIndex === -1) return { zhiFuGong, zhiFuLuoGong, zhiFuXing, jiuXing: { ...BASIC_STARS } };
  const steps = (luoGongIndex - zhiFuIndex + 8) % 8;
  const jiuXing = { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' };
  for (let i = 0; i < LUO_SHU_ORDER.length; i++) {
    const src = LUO_SHU_ORDER[i];
    const dst = LUO_SHU_ORDER[(i + steps) % LUO_SHU_ORDER.length];
    jiuXing[dst] = src === '2' ? '禽芮' : BASIC_STARS[src];
  }
  return { zhiFuGong, zhiFuLuoGong, zhiFuXing, jiuXing };
}

function distributeBaMen(zhiFuGong, shiGan, type) {
  const originalGong = zhiFuGong === '5' ? '2' : zhiFuGong;
  const zhiShiMen = BASIC_GATES[originalGong] || '';
  const steps = Math.max(TIAN_GAN.indexOf(shiGan), 0);
  let cur = Number(originalGong);
  for (let i = 0; i < steps; i++) {
    if (type === 'yang') cur = cur === 9 ? 1 : cur + 1;
    else cur = cur === 1 ? 9 : cur - 1;
  }
  const zhiShiGong = (cur === 5 ? '2' : cur.toString());
  const menIdx = LUO_SHU_ORDER.findIndex((g) => BASIC_GATES[g] === zhiShiMen);
  const luoIdx = LUO_SHU_ORDER.indexOf(zhiShiGong);
  if (menIdx === -1 || luoIdx === -1) return { zhiShiGong, zhiShiMen, baMen: { ...BASIC_GATES } };
  const rot = (luoIdx - menIdx + 8) % 8;
  const baMen = { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' };
  for (let i = 0; i < LUO_SHU_ORDER.length; i++) {
    baMen[LUO_SHU_ORDER[(i + rot) % LUO_SHU_ORDER.length]] = BASIC_GATES[LUO_SHU_ORDER[i]];
  }
  return { zhiShiGong, zhiShiMen, baMen };
}

function distributeBaShen(zhiFuGong, type) {
  const order = type === 'yang' ? LUO_SHU_ORDER : COUNTER_CLOCKWISE_ORDER;
  const baShen = { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' };
  const start = zhiFuGong === '5' ? '2' : zhiFuGong;
  const si = order.indexOf(start);
  if (si === -1) return baShen;
  for (let i = 0; i < BASIC_GODS.length; i++) baShen[order[(si + i) % order.length]] = BASIC_GODS[i];
  return baShen;
}

function xunShouLiuYi(gz) {
  const tg = TIAN_GAN.indexOf(gz[0]);
  const dz = DI_ZHI.indexOf(gz[1]);
  if (tg === -1 || dz === -1) return '戊';
  const headDz = DI_ZHI[(dz - tg + 12) % 12];
  const heads = ['子', '戌', '申', '午', '辰', '寅'];
  const stems = ['戊', '己', '庚', '辛', '壬', '癸'];
  const i = heads.indexOf(headDz);
  return i === -1 ? '戊' : stems[i];
}

const KONG_WANG = { 甲子: ['戌', '亥'], 甲戌: ['申', '酉'], 甲申: ['午', '未'], 甲午: ['辰', '巳'], 甲辰: ['寅', '卯'], 甲寅: ['子', '丑'] };

function calcJuShu(snapshot, juMethod = 'chaibu') {
  const ganZhi = snapshot.dayGanZhi;
  const tg = TIAN_GAN.indexOf(ganZhi[0]);
  const dz = DI_ZHI.indexOf(ganZhi[1]);
  const fuTouDz = DI_ZHI[(dz - (tg % 5) + 12) % 12];
  const yuan = ['子', '午', '卯', '酉'].includes(fuTouDz) ? 0 : ['寅', '申', '巳', '亥'].includes(fuTouDz) ? 1 : 2;
  const dun = snapshot.julianDay >= snapshot.winterSolsticeJulianDay && snapshot.julianDay < snapshot.summerSolsticeJulianDay ? 'yang' : 'yin';

  // ── 流派：节气取哪个 ──
  // chaibu  拆补：以「当前实际节气」定局，符头只管上中下元（本实现已验证）
  // chaotic 超神接气：局随符头走。符头先于节气到＝超神（提前用该节局）；符头晚于节气＝接气（等符头再换局）
  // zhirun  置闰：在拆补基础上，若符头比节气超前 9 天以上，则在芒种/大雪后置闰一个三元
  let termName = snapshot.solarTermName;
  let yuanOverride = -1;
  let note = '拆补法：当前节气 + 符头定三元';
  if (juMethod === 'chaoshen' && snapshot.fuTouTermName) {
    termName = snapshot.fuTouTermName;
    note = '超神接气：局随符头（符头先到用本节，节气先到等符头）';
  } else if (juMethod === 'zhirun') {
    // 置闰只可能落在「芒种后～夏至前」与「大雪后～冬至前」这两段，
    // 其他节气即使超神越九日也不得置闰（改为按超神接气处理）。
    const lead = snapshot.leadToNextTerm;
    const inWindow = snapshot.nextTermName === '夏至' || snapshot.nextTermName === '冬至';
    if (lead != null && lead >= 9 && inWindow) {
      termName = snapshot.solarTermName;
      yuanOverride = 2; // 闰奇：重复本节的下元
      note = `置闰法：符头距${snapshot.nextTermName} ${lead} 天（超九日），在${snapshot.solarTermName}置闰下元`;
    } else if (lead != null && lead >= 9) {
      termName = snapshot.fuTouTermName || termName;
      note = `置闰法：超神 ${lead} 天，但不在芒种/大雪窗口，按超神接气取${termName}`;
    } else {
      note = `置闰法：符头距${snapshot.nextTermName} ${lead} 天，未达置闰条件，按拆补处理`;
    }
  }
  const nums = JU_NUMBERS_MAP[termName] || '111';
  const num = Number(nums.charAt(yuan));
  const CN = { 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 7: '七', 8: '八', 9: '九' };
  const yuanName = ['上元', '中元', '下元'][yuanOverride >= 0 ? yuanOverride : yuan];
  return {
    jieQiName: termName,
    juMethod,
    juMethodNote: note,
    type: dun,
    number: num,
    yuan: yuanName,
    fullName: `${dun === 'yin' ? '阴遁' : '阳遁'}${CN[num]}局 (${yuanName})`,
  };
}

function calcAnGan(zhiShiGong, shiGan, xunShou, type, diPan) {
  const seq = ['戊', '己', '庚', '辛', '壬', '癸', '丁', '丙', '乙'];
  const startStem = shiGan === '甲' ? xunShou : shiGan;
  let si = seq.indexOf(startStem);
  let gong = Number(zhiShiGong);
  if (si === -1) si = 0;
  if (diPan[gong.toString()] === startStem) gong = 5;
  const anGan = { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' };
  for (let i = 0; i < 9; i++) {
    anGan[gong.toString()] = seq[si];
    si = (si + 1) % seq.length;
    gong = type === 'yang' ? (gong === 9 ? 1 : gong + 1) : gong === 1 ? 9 : gong - 1;
  }
  return anGan;
}

const findGong = (obj, val) =>
  Object.keys(obj).find((k) => obj[k] === val || (val === '天芮' && obj[k] === '禽芮')) || '9';

/** 排盘主函数 */
export function buildQimen(input) {
  // snapshot 是内部快照路径（已由 buildSnapshot 校验过），不必重复校验
  if (!input.snapshot) assertCivil(input);
  const snapshot = input.snapshot || buildSnapshot(input);
  const hourIdx = input.hourIndex != null ? input.hourIndex : Math.floor((((input.hour ?? 0) + 1) % 24) / 2);
  const hourGz = snapshot.hours[hourIdx] ? snapshot.hours[hourIdx].ganZhi : snapshot.hours[snapshot.hours.length - 1].ganZhi;
  const juMethod = ['chaibu', 'chaoshen', 'zhirun'].includes(input.juMethod) ? input.juMethod : 'chaibu';
  const juShu = calcJuShu(snapshot, juMethod);
  const xunShou = xunShouLiuYi(hourGz);
  const shiGan = hourGz[0];
  const diPan = getDiPan(juShu.type, juShu.number);
  const jx = distributeJiuXing(diPan, xunShou, shiGan);
  const bm = distributeBaMen(jx.zhiFuGong, shiGan, juShu.type);
  const zhiFuLuoGong = jx.zhiFuLuoGong || jx.zhiFuGong;
  const baShen = distributeBaShen(zhiFuLuoGong, juShu.type);
  const anGan = calcAnGan(bm.zhiShiGong, shiGan, xunShou, juShu.type, diPan);

  const idxFu = LUO_SHU_ORDER.indexOf(jx.zhiFuGong);
  const idxLuo = LUO_SHU_ORDER.indexOf(jx.zhiFuLuoGong);
  const rot = (idxLuo - idxFu + 8) % 8;
  const tianPan = { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' };
  LUO_SHU_ORDER.forEach((gong, i) => {
    const stem = diPan[gong];
    const target = LUO_SHU_ORDER[(i + rot) % LUO_SHU_ORDER.length];
    // 中五宫寄坤二只影响地盘的归属，天盘仍是单个干（参照实现同此口径）
    tianPan[target] = stem;
  });
  tianPan['5'] = diPan['5'] || ''; // 中五宫天盘取本宫地盘干

  const kongZhi = KONG_WANG[snapshot.dayXun === xunOf(hourGz) ? xunOf(hourGz) : xunOf(hourGz)] || [];
  const kongGong = kongZhi.map((z) => ZHI_TO_GONG[z]).filter(Boolean);
  const maMap = { 申: '寅', 子: '寅', 辰: '寅', 寅: '申', 午: '申', 戌: '申', 亥: '巳', 卯: '巳', 未: '巳', 巳: '亥', 酉: '亥', 丑: '亥' };
  const maZhi = maMap[hourGz[1]] || '';
  const maGong = ZHI_TO_GONG[maZhi] || '';

  // 中五宫单列（天禽寄坤二，门神为空），与参照实现的九宫结构对齐
  const centerPalace = {
    palace: '5',
    diPan: diPan['5'] || '',
    tianPan: tianPan['5'] || '',
    star: '天禽',
    gate: '',
    god: '',
    anGan: '',
    palaceElement: PALACE_ELEMENT['5'],
    gateElement: null,
    starElement: STAR_ELEMENT['天禽'],
    gateRelation: { type: 'unknown', note: '中宫无门，不参与门宫关系' },
    kong: false,
    ma: false,
    center: true,
  };

  const palaces = DISPLAY_ORDER.map((gong) => ({
    palace: gong,
    diPan: diPan[gong] || '',
    tianPan: tianPan[gong] || '',
    star: jx.jiuXing[gong] || '',
    gate: bm.baMen[gong] || '',
    god: baShen[gong] || '',
    anGan: anGan[gong] || '',
    palaceElement: PALACE_ELEMENT[gong],
    gateElement: GATE_ELEMENT[bm.baMen[gong]] || null,
    starElement: STAR_ELEMENT[jx.jiuXing[gong]] || null,
    gateRelation: gatePalaceRelation(bm.baMen[gong], gong),
    kong: kongGong.includes(gong),
    ma: maGong === gong,
  }));

  return {
    system: 'qimen',
    solarDate: snapshot.solarDate,
    lunarDate: snapshot.lunarDate,
    siZhu: {
      year: snapshot.yearGanZhi,
      month: snapshot.monthGanZhi,
      day: snapshot.dayGanZhi,
      time: hourGz,
    },
    ju: juShu.fullName,
    dun: juShu.type === 'yin' ? '阴遁' : '阳遁',
    juNumber: juShu.number,
    juMethod: juShu.juMethod,
    juMethodNote: juShu.juMethodNote,
    yuan: juShu.yuan,
    jieqi: juShu.jieQiName,
    jieqiTime: snapshot.solarTermTime,
    xunshou: XUN_SHOU_TO_FULL_MAP[xunShou] || '',
    // gong = 值符所落之宫（与参照 core.fuGong 对齐）；yuanGong = 值符星的本宫
    zhiFu: { star: jx.zhiFuXing, gong: jx.zhiFuLuoGong || jx.zhiFuGong, yuanGong: jx.zhiFuGong },
    zhiShi: { gate: bm.zhiShiMen, gong: bm.zhiShiGong },
    kongWang: kongZhi,
    ma: { zhi: maZhi, gong: maGong },
    palaces,
    centerPalace,
    rules: [
      '定局：以日干支符头定上中下元（子午卯酉上元、寅申巳亥中元、辰戌丑未下元），按节气取局数',
      '阴阳遁：冬至至夏至前用阳遁，夏至至冬至前用阴遁',
      '中五宫寄坤二宫；天盘随值符旋转，八神随值符落宫顺（阳）/逆（阴）布',
      '本次未实现超神接气与置闰，采用拆补法',
    ],
  };
}














