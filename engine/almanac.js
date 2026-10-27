// 每日黄历（本地确定性 · 通行简表口径）
//
// 提供：农历日期、年/月/日干支（年按立春界，另列春节界生肖）、节气、建除十二神、
// 冲煞（冲什么生肖 / 煞在何方）、财神与喜神方位、建除简表宜忌、每日一卦。
//
// 诚实边界：本插件不依赖 lunar-javascript，逐日神煞（吉神凶煞）、二十八宿值日、
// 彭祖百忌、胎神等全量黄历数据未收录——输出里如实标注「未收录」，不臆造。
// 宜忌只按「建除十二神」通行简表给出（传统择日的第一层判据），不是逐日全量黄历。
import { solarToLunar } from './lunar.js';
import {
  toJDN, fromJDN, dayGanzhiIndex, ganzhiName, termWindow, termInstantJd, partsToJd, STEMS, BRANCHES, TERM_NAMES,
} from './calendar.js';
import { HEX64 } from './interpret-data.js';
import { assertCivil, daysInMonth } from './validate.js';

/** 建除十二神（按日支相对月支顺数）。 */
export const ZHIXING = ['建', '除', '满', '平', '定', '执', '破', '危', '成', '收', '开', '闭'];

/** 建除十二神宜忌（通行简表；传统黄历在此基础上再叠神煞与宿值）。 */
export const ZHIXING_YI = {
  建: ['出行', '上任', '会友', '上书', '见工'],
  除: ['除服', '疗病', '扫舍', '出行'],
  满: ['祈福', '祭祀', '结亲', '开市', '交易'],
  平: ['修饰垣墙', '平治道涂'],
  定: ['嫁娶', '订盟', '纳采', '祭祀', '祈福'],
  执: ['祭祀', '祈福', '捕捉', '纳畜'],
  破: ['破屋', '坏垣', '求医'],
  危: ['祭祀', '祈福', '安床'],
  成: ['嫁娶', '开市', '入学', '上任', '修造'],
  收: ['纳财', '收账', '进人口'],
  开: ['开市', '交易', '嫁娶', '入学', '动土'],
  闭: ['筑堤', '埋穴', '补垣'],
};

export const ZHIXING_JI = {
  建: ['动土', '开仓', '出货财', '安葬'],
  除: ['求财', '赴任', '嫁娶'],
  满: ['服药', '栽种', '安葬'],
  平: ['祈福', '求嗣'],
  定: ['诉讼', '出行'],
  执: ['开市', '求财', '出行'],
  破: ['嫁娶', '开市', '动土'],
  危: ['登高', '行船', '出行'],
  成: ['诉讼'],
  收: ['开市', '出行', '安葬'],
  开: ['安葬'],
  闭: ['开市', '出行', '求医'],
};

/** 财神方位歌（按日干）。 */
const CAI_SHEN = { 甲: '东北', 乙: '东北', 丙: '西南', 丁: '西南', 戊: '正北', 己: '正北', 庚: '正东', 辛: '正东', 壬: '正南', 癸: '正南' };

/** 喜神方位（通行口诀，按日干）。 */
const XI_SHEN = { 甲: '东北', 乙: '西北', 丙: '西南', 丁: '正南', 戊: '东南', 己: '东北', 庚: '西北', 辛: '西南', 壬: '正南', 癸: '东南' };

/** 日支 → 冲的生肖 + 煞方（传统：申子辰煞南、寅午戌煞北、巳酉丑煞东、亥卯未煞西）。 */
export const SHENGXIAO = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
const SHA_BY_GROUP = { 申子辰: '南', 寅午戌: '北', 巳酉丑: '东', 亥卯未: '西' };
function shaOf(branch) {
  for (const [g, v] of Object.entries(SHA_BY_GROUP)) if (g.includes(branch)) return v;
  return null;
}

/** 24 小时制 → 时辰地支。 */
export function hourToBranch(hour, minute = 0) {
  const h = Number.isInteger(hour) ? ((hour % 24) + 24) % 24 : 12;
  // 子时 23:00–00:59；分钟不改变时辰（真太阳时已在调用方处理）
  return BRANCHES[Math.floor(((h + 1) % 24) / 2)];
}

/** 由日支与月支推建除十二神。 */
export function zhixingOf(dayBranch, monthBranch) {
  const d = BRANCHES.indexOf(dayBranch);
  const m = BRANCHES.indexOf(monthBranch);
  return ZHIXING[((d - m) % 12 + 12) % 12];
}

/** 农历月/日中文。 */
const MONTH_TEXT = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
const DAY_TENS = ['初', '十', '廿'];
const DAY_UNITS = ['十', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
function dayText(day) {
  if (day === 10) return '初十';
  if (day === 20) return '二十';
  if (day === 30) return '三十';
  return `${DAY_TENS[Math.floor(day / 10)]}${DAY_UNITS[day % 10]}`;
}
export function lunarMonthText(month, isLeap = false) {
  return `${isLeap ? '闰' : ''}${MONTH_TEXT[month - 1] || month}月`;
}

/** 每日一卦：日期哈希确定性映射到通行本 64 卦（同日同卦）。 */
export function dailyHexagram(year, month, day) {
  const names = Object.keys(HEX64);
  if (!names.length) return null;
  const seed = (((year * 10007) ^ (month * 911) ^ (day * 97)) >>> 0) % names.length;
  const name = names[seed];
  return { name, ...HEX64[name] };
}

/** 节气名（TERM_NAMES 与 termWindow 的 index 一一对应）。 */
const termName = (t) => (t && (t.name || TERM_NAMES[t.index])) || '';

/**
 * 黄历主函数。
 * @param {{year:number, month:number, day:number}} input 公历日期（必须真实存在）
 */
export function buildAlmanac(input) {
  assertCivil(input, '黄历');
  const { year, month, day } = input;
  if (day > daysInMonth(year, month)) {
    throw new Error(`非法日期：${year} 年 ${month} 月没有 ${day} 日`);
  }
  const jdNoon = partsToJd({ year, month, day, hour: 12, minute: 0 });
  const lunar = solarToLunar(year, month, day);
  const jdn = toJDN(year, month, day);

  // 年柱：立春界；同时给出春节界口径
  const lichunJd = termInstantJd(year, 2);
  const ganzhiYear = jdNoon < lichunJd ? year - 1 : year;
  const yearIdx = (((ganzhiYear - 4) % 60) + 60) % 60;
  const yearGz = ganzhiName(yearIdx);
  const springYear = lunar.lunarYear;
  const springGz = ganzhiName((((springYear - 4) % 60) + 60) % 60);

  // 月柱：以「节」为界
  const jieTerms = termWindow(year, { jieOnly: true });
  let prevJie = null;
  let nextJie = null;
  for (const t of jieTerms) {
    if (t.jd <= jdNoon) prevJie = t; else { if (!nextJie) nextJie = t; }
  }
  const monthBranchIdx = ((2 + (prevJie.index - 2) / 2) % 12 + 12) % 12;
  const yinMonthStem = ((STEMS.indexOf(yearGz.stem) % 5) * 2 + 2) % 10;
  const monthStemIdx = (yinMonthStem + ((monthBranchIdx - 2 + 12) % 12)) % 10;
  // 月柱干支按「天干地支同旬」组合：用 sexagenary 序推
  const monthGz = ganzhiName(monthComposite(monthStemIdx, monthBranchIdx));

  const dayGz = ganzhiName(dayGanzhiIndex(jdn));
  const dayBranch = dayGz.branch;
  const zhiXing = zhixingOf(dayBranch, BRANCHES[monthBranchIdx]);
  const chongIdx = (BRANCHES.indexOf(dayBranch) + 6) % 12;
  const chongShengXiao = SHENGXIAO[chongIdx];

  const allTerms = termWindow(year);
  let prevTerm = null;
  let nextTerm = null;
  for (const t of allTerms) {
    if (t.jd <= jdNoon) prevTerm = t; else { if (!nextTerm) nextTerm = t; }
  }
  const fmtJdDate = (jd) => {
    const p = fromJDN(Math.floor(jd + 0.5));
    return `${p.year}-${String(p.month).padStart(2, '0')}-${String(p.day).padStart(2, '0')}`;
  };

  const weekday = ['日', '一', '二', '三', '四', '五', '六'][(jdn + 1) % 7];
  const lunarText = `农历${springGz.name}年${lunarMonthText(lunar.month, lunar.isLeap)}${dayText(lunar.day)}`;
  const boundaryNote = yearGz.name !== springGz.name
    ? `年界：本条按立春界作${yearGz.name}年·属${SHENGXIAO[BRANCHES.indexOf(yearGz.branch)]}（命理排盘用）；春节界为${springGz.name}年·属${SHENGXIAO[BRANCHES.indexOf(springGz.branch)]}，两种都对，取用场合不同`
    : null;

  return {
    system: 'almanac',
    meta: {
      date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      weekday: `星期${weekday}`,
      ...(boundaryNote ? { boundaryNote } : {}),
      scope: '通行简表口径：宜忌只按建除十二神；逐日神煞/二十八宿/彭祖百忌/胎神等全量黄历数据未收录',
    },
    lunar: {
      year: springYear,
      month: lunar.month,
      day: lunar.day,
      isLeap: lunar.isLeap,
      text: lunarText,
    },
    ganzhi: {
      year: yearGz.name,
      month: monthGz.name,
      day: dayGz.name,
      shengXiao: SHENGXIAO[BRANCHES.indexOf(yearGz.branch)],
      springYear: springGz.name,
      springShengXiao: SHENGXIAO[BRANCHES.indexOf(springGz.branch)],
    },
    jieQi: {
      prev: prevTerm ? { name: termName(prevTerm), date: fmtJdDate(prevTerm.jd) } : null,
      next: nextTerm ? { name: termName(nextTerm), date: fmtJdDate(nextTerm.jd) } : null,
    },
    positions: { caiShen: CAI_SHEN[dayGz.stem] || null, xiShen: XI_SHEN[dayGz.stem] || null },
    zhiXing,
    yi: ZHIXING_YI[zhiXing].slice(),
    ji: ZHIXING_JI[zhiXing].slice(),
    chong: {
      shengXiao: chongShengXiao,
      text: `冲${chongShengXiao}`,
      sha: shaOf(dayBranch) ? `煞${shaOf(dayBranch)}` : null,
    },
    dailyHexagram: dailyHexagram(year, month, day),
    sources: [
      '农历与节气：本地天文历法（定朔 + 节气黄经）',
      '建除十二神与冲煞：传统通行口径',
      '宜忌：建除十二神通行简表（非逐日全量黄历）',
      '每日一卦：按公历日期确定性取卦（同日同卦）',
    ],
    disclaimer: '黄历为传统民俗口径的本地确定性计算；宜忌仅按建除简表，属娱乐参考，不构成择日结论。',
  };
}

/** 由月干序与月支序求六十甲子序（同旬组合必然存在）。 */
function monthComposite(stemIdx, branchIdx) {
  for (let i = 0; i < 60; i++) {
    if (i % 10 === stemIdx && i % 12 === branchIdx) return i;
  }
  return 0;
}
