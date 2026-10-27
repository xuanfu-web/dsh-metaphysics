// 每日黄历（本地确定性 · 通行简表口径）
//
// 提供：农历日期、年/月/日干支（年按立春界，另列春节界生肖）、节气、建除十二神、
// 冲煞（冲什么生肖 / 煞在何方）、财神与喜神方位、建除简表宜忌、每日一卦。
//
// 诚实边界：本插件不依赖 lunar-javascript，逐日神煞（吉神凶煞）、二十八宿值日、
// 彭祖百忌、胎神等全量黄历数据未收录——输出里如实标注「未收录」，不臆造。
// 宜忌只按「建除十二神」通行简表给出（传统择日的第一层判据），不是逐日全量黄历。
import { solarToLunar } from './lunar.js';
import { nayinOf } from './nayin.js';
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

/** 黄道/黑道十二神（青龙、明堂…勾陈），值日与时家共用。 */
export const TIAN_SHEN = ['青龙', '明堂', '天刑', '朱雀', '金匮', '天德', '白虎', '玉堂', '天牢', '玄武', '司命', '勾陈'];
/** 六黄道（吉）/ 六黑道（凶）。 */
export const TIAN_SHEN_TYPE = {
  青龙: '黄道', 明堂: '黄道', 金匮: '黄道', 天德: '黄道', 玉堂: '黄道', 司命: '黄道',
  天刑: '黑道', 朱雀: '黑道', 白虎: '黑道', 天牢: '黑道', 玄武: '黑道', 勾陈: '黑道',
};
/** 十二神起例：以月支（日家）或日支（时家）为锚的偏移。 */
const TIAN_SHEN_OFFSET = { 子: 4, 丑: 2, 寅: 0, 卯: 10, 辰: 8, 巳: 6, 午: 4, 未: 2, 申: 0, 酉: 10, 戌: 8, 亥: 6 };

/** 日家十二神：日支 + 月支偏移；时家十二神：时支 + 日支偏移。 */
export function tianShenOf(branch, anchorBranch) {
  const b = BRANCHES.indexOf(branch);
  const off = TIAN_SHEN_OFFSET[anchorBranch];
  if (b < 0 || off == null) return null;
  const name = TIAN_SHEN[(b + off) % 12];
  const type = TIAN_SHEN_TYPE[name];
  return { name, type, luck: type === '黄道' ? '吉' : '凶' };
}

/** 二十八宿：值日宿按「日支 + 星期」轮转（四组各七宿）。 */
export const MANSIONS = {
  角: { luck: '吉', zheng: '木', animal: '蛟', gong: '东' }, 亢: { luck: '凶', zheng: '金', animal: '龙', gong: '东' },
  氐: { luck: '凶', zheng: '土', animal: '貉', gong: '东' }, 房: { luck: '吉', zheng: '日', animal: '兔', gong: '东' },
  心: { luck: '凶', zheng: '月', animal: '狐', gong: '东' }, 尾: { luck: '吉', zheng: '火', animal: '虎', gong: '东' },
  箕: { luck: '吉', zheng: '水', animal: '豹', gong: '东' }, 斗: { luck: '吉', zheng: '木', animal: '獬', gong: '北' },
  牛: { luck: '凶', zheng: '金', animal: '牛', gong: '北' }, 女: { luck: '凶', zheng: '土', animal: '蝠', gong: '北' },
  虚: { luck: '凶', zheng: '日', animal: '鼠', gong: '北' }, 危: { luck: '凶', zheng: '月', animal: '燕', gong: '北' },
  室: { luck: '吉', zheng: '火', animal: '猪', gong: '北' }, 壁: { luck: '吉', zheng: '水', animal: '獝', gong: '北' },
  奎: { luck: '凶', zheng: '木', animal: '狼', gong: '西' }, 娄: { luck: '吉', zheng: '金', animal: '狗', gong: '西' },
  胃: { luck: '吉', zheng: '土', animal: '彘', gong: '西' }, 昴: { luck: '凶', zheng: '日', animal: '鸡', gong: '西' },
  毕: { luck: '吉', zheng: '月', animal: '乌', gong: '西' }, 觜: { luck: '凶', zheng: '火', animal: '猴', gong: '西' },
  参: { luck: '吉', zheng: '水', animal: '猿', gong: '西' }, 井: { luck: '吉', zheng: '木', animal: '犴', gong: '南' },
  鬼: { luck: '凶', zheng: '金', animal: '羊', gong: '南' }, 柳: { luck: '凶', zheng: '土', animal: '獐', gong: '南' },
  星: { luck: '凶', zheng: '日', animal: '马', gong: '南' }, 张: { luck: '吉', zheng: '月', animal: '鹿', gong: '南' },
  翼: { luck: '凶', zheng: '火', animal: '蛇', gong: '南' }, 轸: { luck: '吉', zheng: '水', animal: '蚓', gong: '南' },
};
const XIU_GROUPS = {
  A: ['虚', '毕', '翼', '箕', '奎', '鬼', '氐'],
  B: ['房', '危', '觜', '轸', '斗', '娄', '柳'],
  C: ['星', '心', '室', '参', '角', '牛', '胃'],
  D: ['昴', '张', '尾', '壁', '井', '亢', '女'],
};
const XIU_GROUP_OF = { 子: 'A', 辰: 'A', 申: 'A', 丑: 'B', 巳: 'B', 酉: 'B', 寅: 'C', 午: 'C', 戌: 'C', 卯: 'D', 未: 'D', 亥: 'D' };

/** 值日宿：weekday 0=周日。 */
export function xiuOf(dayBranch, weekdayIndex) {
  const g = XIU_GROUP_OF[dayBranch];
  if (!g) return null;
  const name = XIU_GROUPS[g][weekdayIndex];
  const info = MANSIONS[name];
  return info ? { name, ...info } : null;
}

/** 吉神方位（按日干；福神取通行一变，另一变注明差异）。 */
const DIR_OF = { 坎: '正北', 艮: '东北', 震: '正东', 巽: '东南', 离: '正南', 坤: '西南', 兑: '正西', 乾: '西北' };
const POS_XI = { 甲: '艮', 乙: '乾', 丙: '坤', 丁: '离', 戊: '巽', 己: '艮', 庚: '乾', 辛: '坤', 壬: '离', 癸: '巽' };
const POS_CAI = { 甲: '艮', 乙: '艮', 丙: '坤', 丁: '坤', 戊: '坎', 己: '坎', 庚: '震', 辛: '震', 壬: '离', 癸: '离' };
const POS_FU = { 甲: '坎', 乙: '坤', 丙: '乾', 丁: '巽', 戊: '艮', 己: '坎', 庚: '坤', 辛: '乾', 壬: '巽', 癸: '艮' };
const POS_YANG_GUI = { 甲: '坤', 乙: '坤', 丙: '兑', 丁: '乾', 戊: '艮', 己: '坎', 庚: '离', 辛: '艮', 壬: '震', 癸: '巽' };
const POS_YIN_GUI = { 甲: '艮', 乙: '坎', 丙: '乾', 丁: '兑', 戊: '坤', 己: '坤', 庚: '艮', 辛: '离', 壬: '巽', 癸: '震' };
const posOf = (map, stem) => (map[stem] ? { gua: map[stem], dir: DIR_OF[map[stem]] } : null);

/** 胎神（逐日干支，通行表）。 */
const TAI_SHEN = {
  甲子: '占门碓 外东南', 乙丑: '碓磨厕 外东南', 丙寅: '厨灶炉 外正南', 丁卯: '仓库门 外正南', 戊辰: '房床栖 外正南',
  己巳: '占门床 外正南', 庚午: '占碓磨 外正南', 辛未: '厨灶厕 外西南', 壬申: '仓库炉 外西南', 癸酉: '房床门 外西南',
  甲戌: '占门栖 外西南', 乙亥: '碓磨床 外西南', 丙子: '厨灶碓 外西南', 丁丑: '仓库厕 外正西', 戊寅: '房床炉 外正西',
  己卯: '占大门 外正西', 庚辰: '碓磨栖 外正西', 辛巳: '厨灶床 外正西', 壬午: '仓库碓 外西北', 癸未: '房床厕 外西北',
  甲申: '占门炉 外西北', 乙酉: '碓磨门 外西北', 丙戌: '厨灶栖 外西北', 丁亥: '仓库床 外西北', 戊子: '房床碓 外正北',
  己丑: '占门厕 外正北', 庚寅: '碓磨炉 外正北', 辛卯: '厨灶门 外正北', 壬辰: '仓库栖 外正北', 癸巳: '占房床 房内北',
  甲午: '占门碓 房内北', 乙未: '碓磨厕 房内北', 丙申: '厨灶炉 房内北', 丁酉: '仓库门 房内北', 戊戌: '房床栖 房内中',
  己亥: '占门床 房内中', 庚子: '占碓磨 房内南', 辛丑: '厨灶厕 房内南', 壬寅: '仓库炉 房内南', 癸卯: '房床门 房内西',
  甲辰: '占门栖 房内东', 乙巳: '碓磨床 房内东', 丙午: '厨灶碓 房内东', 丁未: '仓库厕 房内东', 戊申: '房床炉 房内中',
  己酉: '占大门 外东北', 庚戌: '碓磨栖 外东北', 辛亥: '厨灶床 外东北', 壬子: '仓库碓 外东北', 癸丑: '房床厕 外东北',
  甲寅: '占门炉 外东北', 乙卯: '碓磨门 外正东', 丙辰: '厨灶栖 外正东', 丁巳: '仓库床 外正东', 戊午: '房床碓 外正东',
  己未: '占门厕 外正东', 庚申: '碓磨炉 外东南', 辛酉: '厨灶门 外东南', 壬戌: '仓库栖 外东南', 癸亥: '占房床 外东南',
};

/** 六合 / 三合（对日支取吉配生肖）。 */
const LIUHE = { 子: '丑', 丑: '子', 寅: '亥', 亥: '寅', 卯: '戌', 戌: '卯', 辰: '酉', 酉: '辰', 巳: '申', 申: '巳', 午: '未', 未: '午' };
const SANHE = { 申: '申子辰', 子: '申子辰', 辰: '申子辰', 亥: '亥卯未', 卯: '亥卯未', 未: '亥卯未', 寅: '寅午戌', 午: '寅午戌', 戌: '寅午戌', 巳: '巳酉丑', 酉: '巳酉丑', 丑: '巳酉丑' };

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

  const weekdayIdx = (jdn + 1) % 7;
  const weekday = ['日', '一', '二', '三', '四', '五', '六'][weekdayIdx];
  // 值日十二神（黄道/黑道）、二十八宿、胎神、纳音、吉神方位、时辰吉凶
  const dayGod = tianShenOf(dayBranch, BRANCHES[monthBranchIdx]);
  const xiu = xiuOf(dayBranch, weekdayIdx);
  const taiShen = TAI_SHEN[dayGz.name] || null;
  const hourBase = (STEMS.indexOf(dayGz.stem) % 5) * 2;
  const hours = BRANCHES.map((zhi, i) => {
    const gan = STEMS[(hourBase + i) % 10];
    const gz = ganzhiName(hourComposite((hourBase + i) % 10, i));
    const shen = tianShenOf(zhi, dayBranch);
    return {
      zhi,
      name: `${zhi}时`,
      ganZhi: gz.name,
      gan,
      shen: shen ? shen.name : null,
      type: shen ? shen.type : null,
      luck: shen ? shen.luck : null,
    };
  });
  const sanheGroup = SANHE[dayBranch] || '';
  const liuheBranch = LIUHE[dayBranch] || null;
  const lucky = {
    liuhe: liuheBranch ? SHENGXIAO[BRANCHES.indexOf(liuheBranch)] : null,
    sanhe: [...sanheGroup].filter((b) => b !== dayBranch).map((b) => SHENGXIAO[BRANCHES.indexOf(b)]),
  };
  const positions = {
    caiShen: CAI_SHEN[dayGz.stem] || null,
    xiShen: XI_SHEN[dayGz.stem] || null,
    fuShen: posOf(POS_FU, dayGz.stem),
    yangGui: posOf(POS_YANG_GUI, dayGz.stem),
    yinGui: posOf(POS_YIN_GUI, dayGz.stem),
    xiShenFull: posOf(POS_XI, dayGz.stem),
    caiShenFull: posOf(POS_CAI, dayGz.stem),
  };
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
      scope: '通行口径：宜忌按建除十二神简表；已收录值日十二神（黄道/黑道）、时辰吉凶、二十八宿、胎神、吉神方位、纳音、六合三合吉配；逐日全量吉神凶煞与彭祖百忌未收录',
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
    positions,
    dayGod,
    xiu,
    taiShen,
    nayin: { day: nayinOf(dayGanzhiIndex(jdn)) },
    lucky,
    hours,
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
      '值日/时家十二神（青龙…勾陈）、二十八宿、胎神、吉神方位：通行表',
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

/** 由时干序与时支序求六十甲子序。 */
function hourComposite(stemIdx, branchIdx) {
  for (let i = 0; i < 60; i++) {
    if (i % 10 === stemIdx && i % 12 === branchIdx) return i;
  }
  return 0;
}
