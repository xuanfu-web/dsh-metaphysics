// 袁天罡称骨：按农历年/月/日/时辰四柱骨重求和，查通行本《称骨歌》原文，附白话释义。
// 骨重表与歌诀均为通行本口径（各版本有异文，此处照录通行本）；释义是白话自撰，不是原文。
import { solarToLunar } from './lunar.js';
import { ganzhiName, toJDN, dayGanzhiIndex } from './calendar.js';
import { assertCivil } from './validate.js';
import { hourToBranch } from './almanac.js';

/** 六十甲子年骨重（单位：钱；索引 = (农历年 - 4) mod 60，0 = 甲子）。 */
export const YEAR_WEIGHT = [
  12, 9, 6, 7, 12, 5, 9, 8, 7, 8,
  15, 9, 16, 8, 8, 19, 12, 6, 8, 7,
  5, 15, 6, 16, 15, 7, 9, 12, 10, 7,
  15, 6, 5, 14, 14, 9, 7, 7, 9, 12,
  8, 7, 13, 5, 14, 5, 9, 17, 5, 7,
  12, 8, 8, 6, 19, 6, 8, 16, 10, 7,
];

/** 农历月骨重（正月…腊月）。 */
export const MONTH_WEIGHT = [6, 7, 18, 9, 5, 16, 9, 15, 18, 8, 9, 5];

/** 农历日骨重（初一…三十）。 */
export const DAY_WEIGHT = [
  5, 10, 8, 15, 16, 15, 8, 16, 8, 16,
  9, 17, 8, 17, 10, 8, 9, 18, 5, 15,
  10, 9, 8, 9, 15, 18, 7, 8, 16, 6,
];

/** 时辰骨重（按地支）。 */
export const HOUR_WEIGHT = { 子: 16, 丑: 6, 寅: 7, 卯: 10, 辰: 9, 巳: 16, 午: 10, 未: 8, 申: 8, 酉: 9, 戌: 6, 亥: 6 };

const LIANG = ['一', '二', '三', '四', '五', '六', '七'];
const QIAN = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
const MONTH_TEXT = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
const DAY_TENS = ['初', '十', '廿'];
const DAY_UNITS = ['十', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

/** 钱 → 「X两Y钱」（不足一两只写钱数）。 */
export function formatWeight(qian) {
  const liang = Math.floor(qian / 10);
  const rem = qian % 10;
  const liangPart = liang > 0 ? `${LIANG[liang - 1]}两` : '';
  const remPart = rem > 0 ? `${QIAN[rem - 1]}钱` : liang > 0 ? '整' : '零';
  return `${liangPart}${remPart}`;
}

/** 农历日序中文：初一…三十。 */
export function lunarDayText(day) {
  if (day === 10) return '初十';
  if (day === 20) return '二十';
  if (day === 30) return '三十';
  const ten = Math.floor(day / 10);
  const unit = day % 10;
  return `${DAY_TENS[ten]}${DAY_UNITS[unit]}`;
}

/** 农历月序中文。 */
export function lunarMonthText(month, isLeap = false) {
  return `${isLeap ? '闰' : ''}${MONTH_TEXT[month - 1] || month}月`;
}

/**
 * 通行本《称骨歌》五十二首：键 = 骨重（钱），21 = 二两一钱 … 72 = 七两二钱。
 * text 为歌诀原文照录（各版本有异文，此处取通行本，标点统一为「，；，。」）；
 * plain 为白话释义，是自撰，不是原文。
 */
export const CHENGGU_SONG = {
  21: { text: '短命非业谓大空，平生灾难事重重；凶祸频临陷逆境，终世困苦事不成。', plain: '起点低、阻力大，凡事难一气呵成；宜守稳借力，不宜孤注一掷。' },
  22: { text: '身寒骨冷苦伶仃，此命推来行乞人；劳劳碌碌无度日，终年打拱过平生。', plain: '早年资源薄、亲缘淡，靠勤苦与人缘翻身，最忌自弃。' },
  23: { text: '此命推来骨格轻，求谋作事事难成；妻儿兄弟应难许，别处他乡作散人。', plain: '独自谋事难成，宜合伙或依附平台；离乡发展反有出路。' },
  24: { text: '此命推来福禄无，门庭困苦总难荣；六亲骨肉皆无靠，流浪他乡作老翁。', plain: '六亲助力少，别指望祖业，早做打算、靠双手积累。' },
  25: { text: '此命推来祖业微，门庭营度似稀奇；六亲骨肉如冰炭，一世勤劳自把持。', plain: '家底薄、亲缘冷，一生靠自己操持，勤俭则安。' },
  26: { text: '平生衣禄苦中求，独自营谋事不休；离祖出门宜早计，晚来衣禄自无休。', plain: '白手起家之格：早离乡、晚渐稳，不必怕慢。' },
  27: { text: '一生作事少商量，难靠祖宗作主张；独马单枪空做去，早年晚岁总无长。', plain: '主意要自己拿，靠人不如靠己；早定方向才不空忙。' },
  28: { text: '一生行事似飘蓬，祖宗产业在梦中；若不过房改名姓，也当移徒二三通。', plain: '祖业难守，适合外出或改换环境，动中求安。' },
  29: { text: '初年运限未曾亨，纵有功名在后成；须过四旬才可立，移居改姓始为良。', plain: '功名在后，四十前后才立得住，忌中途频繁换道。' },
  30: { text: '劳劳碌碌苦中求，东奔西走何日休；若使终身勤与俭，老来稍可免忧愁。', plain: '东奔西走的劳碌格，靠勤俭积攒，晚年才得清闲。' },
  31: { text: '忙忙碌碌苦中求，何日云开见日头；难得祖基家可立，中年衣食渐无忧。', plain: '先难后易：祖基难得，中年衣食转宽，守住本业即可。' },
  32: { text: '初年运蹇事难谋，渐有财源如水流；到得中年衣食旺，那时名利一齐收。', plain: '幼年蹇滞，中年后财源渐旺，名利可期。' },
  33: { text: '早年做事事难成，百年勤劳枉费心；半世自如流水去，后来运到始得金。', plain: '前半程多试错，后半程才见成果，急不得。' },
  34: { text: '此命福气果如何，僧道门中衣禄多；离祖出家方为妙，朝晚拜佛念弥陀。', plain: '与清静行当、宗教或专门技艺有缘，离祖发展更顺。' },
  35: { text: '生平福量不周全，祖业根基觉少传；营事生涯宜守旧，时来衣食胜从前。', plain: '福量不齐，宜守旧业、少折腾；时运到了自然宽裕。' },
  36: { text: '不须劳碌过平生，独自成家福不轻；早有福星常照命，任君行去百般成。', plain: '不必太劳碌，福气随身，行事多能成。' },
  37: { text: '此命般般事不成，弟兄少力自孤行；虽然祖业须微有，来得明时去不明。', plain: '单打独斗吃力、兄弟少力；宜合作，钱财要明算账。' },
  38: { text: '一身骨肉最清高，早入簧门姓氏标；待到年将三十六，蓝衫脱去换红袍。', plain: '读书与专业路线见长，三十六前后有转机与体面。' },
  39: { text: '此命终身运不通，劳劳作事尽皆空；苦心竭力成家计，到得那时在梦中。', plain: '早年空忙，成家立业偏晚；重在坚持，不宜频繁改行。' },
  40: { text: '平生衣禄是绵长，件件心中自主张；前面风霜多受过，后来必定享安康。', plain: '先苦后甜：衣食渐稳，事在自主，晚景安康。' },
  41: { text: '此命推来自不同，为人能干异凡庸；中年还有逍遥福，不比前时运来通。', plain: '能干出众，早年只是运会未到；中年有逍遥之福。' },
  42: { text: '得宽怀处且宽怀，何用双眉皱不开；若使中年命运济，那时名利一起来。', plain: '心宽则顺；中年运济，名利自来，不必过虑。' },
  43: { text: '为人心性最聪明，作事轩昂近贵人；衣禄一生天注定，不须劳碌是丰亨。', plain: '聪明近贵，易得贵人提携，衣禄有天定之说。' },
  44: { text: '万事由天莫苦求，须知福碌赖人修；当年财帛难如意，晚景欣然便不优。', plain: '少壮难如意，晚景反安；福禄也靠人修，不必强求。' },
  45: { text: '名利推求竟若何，前番辛苦后奔波；命中难养男和女，骨肉扶持也不多。', plain: '中年前后仍奔波，子女缘与骨肉助力偏薄，凡事多自扛。' },
  46: { text: '东西南北尽皆通，出姓移居更觉隆；衣禄无穷无数定，中年晚景一般同。', plain: '外出、迁居更旺；衣禄不愁，中晚年境况相近。' },
  47: { text: '此命推求旺末年，妻荣子贵自怡然；平生原有滔滔福，可卜财源若水泉。', plain: '晚运佳：妻荣子贵，福厚财源长。' },
  48: { text: '初年运道未曾通，几许蹉跎命亦穷；兄弟六亲无依靠，一生事业晚来整。', plain: '早年蹉跎、六亲少靠，事业晚成，忌半途而废。' },
  49: { text: '此命推来福不轻，自成自立显门庭；从来富贵人钦敬，使婢差奴过一生。', plain: '自立门户、显耀门庭，中年后受人敬重。' },
  50: { text: '为利为名终日劳，中年福禄也多遭；老来自有财星照，不比前番目下高。', plain: '为名利终日奔忙，中年多波折；老来财星照，压力渐轻。' },
  51: { text: '一世荣华事事通，不须劳碌自亨通；兄弟叔侄皆如意，家业成时福禄宏。', plain: '事多顺遂，兄弟叔侄得力，家业易成。' },
  52: { text: '一世亨通事事能，不须劳苦自然宁；宗族有光欣喜甚，家产丰盈自称心。', plain: '诸事能干、少劳而宁；宗族有光，家产丰盈。' },
  53: { text: '此格推来福泽宏，兴家立业在其中；一生衣食安排定，却是人间一福翁。', plain: '兴家立业之格，衣食安稳，是人间有福之人。' },
  54: { text: '此格详采福泽宏，诗书满腹看功成；丰衣足食多安稳，正是人间有福人。', plain: '读书人格局：功名可期，衣食安稳。' },
  55: { text: '策马扬鞭争名利，少年作事费筹论；一朝福禄源源至，富贵荣华显六亲。', plain: '少年费筹谋，一朝福至；富贵显亲，属于厚积薄发。' },
  56: { text: '此格推来礼义通，一身福禄用无穷；甜酸苦辣皆尝过，滚滚财源盈而丰。', plain: '福禄厚：人生百味都经过，之后财源稳而丰。' },
  57: { text: '福禄丰盈万事全，一身荣耀乐天年；名扬威震人争羡，此世逍遥宛似仙。', plain: '万事较全，名望与荣耀随行，晚运逍遥。' },
  58: { text: '平生衣食自然来，名利双全富贵偕；金榜题名登甲第，紫袍玉带走金阶。', plain: '衣食自来、名利双全；有科第与体面之象。' },
  59: { text: '细推此格秀而清，必定才高学业成；甲第之中应有分，扬鞭走马显威荣。', plain: '才高学业成，有科第之份，前程显达。' },
  60: { text: '一朝金榜快题名，显祖荣宗大器成；衣禄定然无欠缺，田园财帛更丰盈。', plain: '金榜题名、显祖荣宗；衣禄丰足，田园财帛皆旺。' },
  61: { text: '不作朝中金榜客，定为世上大财翁；聪明天付经书熟，名显高褂自是荣。', plain: '不入仕途也能成富；聪明博学，自有显名之荣。' },
  62: { text: '此命生来福不穷，读书必定显亲宗；紫衣玉带为卿相，富贵荣华孰与同。', plain: '福泽不穷；读书可显亲，有卿相之象。' },
  63: { text: '命主为官福禄长，得来富贵实非常；名题雁塔传金榜，大显门庭天下扬。', plain: '仕途顺、福禄长；富贵非常，门庭显扬。' },
  64: { text: '此格威权不可当，紫袍金带尘高堂；荣华富贵谁能及，万古留名姓氏扬。', plain: '掌权之格：富贵与声名俱隆，留名后世。' },
  65: { text: '细推此命福非轻，富贵荣华孰与争；定国安邦人极品，威声显赫震寰瀛。', plain: '贵重之命；有定国安邦之器，声威远震。' },
  66: { text: '此格人间一福人，堆金积玉满堂春；从来富贵有天定，金榜题名更显亲。', plain: '堆金积玉、富贵天定；又有金榜显亲之象。' },
  67: { text: '此命生来福自宏，田园家业最高隆；平生衣禄盈丰足，一路荣华万事通。', plain: '福厚家隆：田园家业兴旺，衣禄丰足，一路荣华。' },
  68: { text: '富贵由天莫苦求，万事家计不须谋；十年不比前番事，祖业根基千古留。', plain: '家计不必苦谋；祖业根基可留，运势比前十年更好。' },
  69: { text: '君是人间福禄星，一生富贵众人钦；总然衣禄由天定，安享荣华过一生。', plain: '人间福禄星：富贵受人钦敬，安享荣华。' },
  70: { text: '此命推来福不轻，何须愁虑苦劳心；荣华富贵已天定，正笏垂绅拜紫宸。', plain: '不必愁虑劳心；荣华富贵已定，有朝堂之象。' },
  71: { text: '此命生成大不同，公侯卿相在其中；一生自有逍遥福，富贵荣华极品隆。', plain: '公侯卿相之格：福厚逍遥，富贵极品。' },
  72: { text: '此命推来天下隆，必定人间一主公；富贵荣华数不尽，定为乾坤一蛟龙。', plain: '极贵之格；但四表上限为七两一钱，此档基本不可达，仅备档。' },
};

/** 按骨重取歌诀（超出 21–72 钱返回 null）。 */
export function songOf(qian) {
  return CHENGGU_SONG[qian] || null;
}

/** 骨重分档（白话自撰）。 */
function bandVerdict(qian) {
  if (qian >= 55) return { band: '上上', text: '骨重沉实，根基深厚，一生多逢贵人，谋事易成；守正持重，福泽可久。' };
  if (qian >= 45) return { band: '上', text: '骨重充实，中年前后渐入佳境，事业家宅两旺；忌骄忌躁，善守即善成。' };
  if (qian >= 35) return { band: '中上', text: '骨重适中，先劳后逸，凭本事立身；中年转运之象，稳扎稳打自见分晓。' };
  if (qian >= 25) return { band: '中', text: '骨重平平，成败多靠自身经营；宜有一技傍身、广结善缘，勤则补拙。' };
  return { band: '中下', text: '骨重较轻，早年多磨，凡事宜稳不宜急；积跬步以至千里，晚景反可安宁。' };
}

/**
 * 称骨主函数。
 * @param {{ year:number, month:number, day:number, hour:number, minute?:number }} input
 *   一律按公历给生日（农历换算由引擎完成）；时辰必填——称骨四柱缺时辰不可算。
 */
export function buildChenggu(input) {
  assertCivil(input, '称骨');
  const { year, month, day, hour } = input;
  const minute = input.minute || 0;
  if (!Number.isInteger(hour) || hour < 0 || hour > 23) {
    throw new Error('称骨必须给时辰：hour 为 0–23 的整数（缺时辰四柱不齐，骨重无法求和）');
  }
  const lunar = solarToLunar(year, month, day);
  const lunarYear = lunar.lunarYear;
  const lunarMonth = lunar.month;
  const lunarDay = lunar.day;
  const yearGz = ganzhiName((((lunarYear - 4) % 60) + 60) % 60);
  const hourBranch = hourToBranch(hour, minute);

  const wYear = YEAR_WEIGHT[((lunarYear - 4) % 60 + 60) % 60];
  const wMonth = MONTH_WEIGHT[lunarMonth - 1];
  const wDay = DAY_WEIGHT[lunarDay - 1];
  const wHour = HOUR_WEIGHT[hourBranch];
  if ([wYear, wMonth, wDay, wHour].some((x) => typeof x !== 'number')) {
    throw new Error(`称骨表缺项：年${wYear} 月${wMonth} 日${wDay} 时${wHour}`);
  }
  const total = wYear + wMonth + wDay + wHour;
  const verdict = bandVerdict(total);
  const song = songOf(total);
  const jdn = toJDN(year, month, day);

  return {
    system: 'chenggu',
    input: { solar: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`, hour, minute },
    lunar: {
      text: `农历${yearGz.name}年${lunarMonthText(lunarMonth, lunar.isLeap)}${lunarDayText(lunarDay)} ${hourBranch}时`,
      year: lunarYear,
      month: lunarMonth,
      day: lunarDay,
      isLeap: lunar.isLeap,
      hourBranch,
    },
    ganzhi: { year: yearGz.name, day: ganzhiName(dayGanzhiIndex(jdn)).name },
    weights: {
      year: { qian: wYear, label: `${yearGz.name}年 ${formatWeight(wYear)}` },
      month: { qian: wMonth, label: `农历${lunarMonthText(lunarMonth, lunar.isLeap)} ${formatWeight(wMonth)}` },
      day: { qian: wDay, label: `农历${lunarDayText(lunarDay)} ${formatWeight(wDay)}` },
      hour: { qian: wHour, label: `${hourBranch}时 ${formatWeight(wHour)}` },
    },
    total: { qian: total, label: formatWeight(total) },
    verdict,
    song: song
      ? { qian: total, label: formatWeight(total), title: `称骨歌·${formatWeight(total)}`, text: song.text, plain: song.plain, source: '通行本《称骨歌》' }
      : { qian: total, label: formatWeight(total), title: `称骨歌·${formatWeight(total)}`, text: '', plain: '该骨重未见通行本歌诀（表内应落在二两一钱至七两二钱之间）。', source: '通行本《称骨歌》' },
    sources: [
      '骨重表：通行本袁天罡称骨（六十甲子年 / 十二月 / 三十日 / 十二时辰）',
      '歌诀：通行本《称骨歌》原文照录（各版本有异文，断句标点已统一）',
      '释义：白话自撰，非歌诀原文，只作字面直解',
    ],
    disclaimer: '骨重与歌诀均为通行本口径，属民俗娱乐参考；释义为白话解释，不构成命运断言。',
  };
}
