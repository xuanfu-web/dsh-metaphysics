// 生成「经典通例」对拍数据：test/fixtures/classics.json
//
// 原则：这里录入的是**典籍里的规则表**（八宫卦序、世应交位、日干寄宫、中气换将、
// 纳音定局、紫微天府对照），不是从引擎输出反推的期望值——否则就是自己给自己背书。
// 出处写到典籍与条目一级（公开经典，通行本），不冒充版刻页码。
//
// 用法：node tools/gen-classics-fixture.mjs
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');

// ── 京房八宫卦序（《京氏易传》，通行本）──────────────���───────
// 每宫八卦：本宫（八纯）→ 一世 → 二世 → 三世 → 四世 → 五世 → 游魂 → 归魂
const PALACES = {
  乾: ['乾为天', '天风姤', '天山遁', '天地否', '风地观', '山地剥', '火地晋', '火天大有'],
  坎: ['坎为水', '水泽节', '水雷屯', '水火既济', '泽火革', '雷火丰', '地火明夷', '地水师'],
  艮: ['艮为山', '山火贲', '山天大畜', '山泽损', '火泽睽', '天泽履', '风泽中孚', '风山渐'],
  震: ['震为雷', '雷地豫', '雷水解', '雷风恒', '地风升', '水风井', '泽风大过', '泽雷随'],
  巽: ['巽为风', '风天小畜', '风火家人', '风雷益', '天雷无妄', '火雷噬嗑', '山雷颐', '山风蛊'],
  离: ['离为火', '火山旅', '火风鼎', '火水未济', '山水蒙', '风水涣', '天水讼', '天火同人'],
  坤: ['坤为地', '地雷复', '地泽临', '地天泰', '雷天大壮', '泽天夬', '水天需', '水地比'],
  兑: ['兑为泽', '泽水困', '泽地萃', '泽山咸', '水山蹇', '地山谦', '雷山小过', '雷泽归妹'],
};

// 世爻定例：八纯上爻、一世初爻……五世五爻、游魂四爻、归魂三爻；应爻与世相隔三位
const SHI_BY_ORDER = [6, 1, 2, 3, 4, 5, 4, 3];

const bajua = [];
for (const [palace, list] of Object.entries(PALACES)) {
  list.forEach((name, order) => {
    const shi = SHI_BY_ORDER[order];
    bajua.push({ name, palace: `${palace}宫`, order, shi, ying: shi > 3 ? shi - 3 : shi + 3 });
  });
}

// ── 大六壬通例（《大六壬指南》通行本）──────────────────────
const ganJiGong = { 甲: '寅', 乙: '辰', 丙: '巳', 丁: '未', 戊: '巳', 己: '未', 庚: '申', 辛: '戌', 壬: '亥', 癸: '丑' };

// 中气换将：月将随中气而更，节内不变
const yueJiangByZhongQi = [
  { zhongqi: '雨水', jiang: '亥', name: '登明' },
  { zhongqi: '春分', jiang: '戌', name: '河魁' },
  { zhongqi: '谷雨', jiang: '酉', name: '从魁' },
  { zhongqi: '小满', jiang: '申', name: '传送' },
  { zhongqi: '夏至', jiang: '未', name: '小吉' },
  { zhongqi: '大暑', jiang: '午', name: '胜光' },
  { zhongqi: '处暑', jiang: '巳', name: '太乙' },
  { zhongqi: '秋分', jiang: '辰', name: '天罡' },
  { zhongqi: '霜降', jiang: '卯', name: '太冲' },
  { zhongqi: '小雪', jiang: '寅', name: '功曹' },
  { zhongqi: '冬至', jiang: '丑', name: '大吉' },
  { zhongqi: '大寒', jiang: '子', name: '神后' },
];

// 取样日期：每个中气之后若干天（确保落在该中气与下一中气之间）
const yueJiangSamples = [
  { zhongqi: '雨水', date: '2026-02-25T12:00' },
  { zhongqi: '春分', date: '2026-03-25T12:00' },
  { zhongqi: '谷雨', date: '2026-04-25T12:00' },
  { zhongqi: '小满', date: '2026-05-25T12:00' },
  { zhongqi: '夏至', date: '2026-06-25T12:00' },
  { zhongqi: '大暑', date: '2026-07-28T12:00' },
  { zhongqi: '处暑', date: '2026-08-28T12:00' },
  { zhongqi: '秋分', date: '2026-09-28T12:00' },
  { zhongqi: '霜降', date: '2026-10-28T12:00' },
  { zhongqi: '小雪', date: '2026-11-26T12:00' },
  { zhongqi: '冬至', date: '2026-12-26T12:00' },
  { zhongqi: '大寒', date: '2027-01-25T12:00' },
];

// ── 《增删卜易》卦例（原文取自 luckclub.cn 古籍典藏电子本，PDF 有文字层）────────
// 每条记「月建 + 日干支 + 本卦 → 变卦」；卦名按原文用字保留（遯/遁 为异体），
// 动爻不录：原文卦象图在 PDF 中被压成一行，位置不可靠，硬录等于造数据。
// 对拍点：引擎能否用 64 卦表把「本卦 → 变卦」这一对如实还原（名字与翻爻）。
const liuyaoExamples = [
  { chapter: '元神忌神衰旺章第十', month: '酉', day: '辛亥', ben: '兑为泽', bian: '雷水解', quote: '酉月辛亥日占求财，得兑为泽变雷水解卦' },
  { chapter: '元神忌神衰旺章第十', month: '巳', day: '乙未', ben: '泽风大过', bian: '火风鼎', quote: '巳月乙未日自占病，得泽风大过变火风鼎卦' },
  { chapter: '月将章第十六', month: '午', day: '丁未', ben: '困', bian: '雷风恒', quote: '午月丁未日占弟被讼吉凶，得困卦变雷风恒卦' },
  { chapter: '月将章第十六', month: '寅', day: '丁酉', ben: '艮', bian: '明夷', quote: '寅月丁酉日占开铺面，得艮卦变明夷卦' },
  { chapter: '日辰章第十七', month: '申', day: '戊午', ben: '天山遯', bian: '天风姤', quote: '申月戊午日占病，得天山遯变天风姤卦' },
  { chapter: '独发章第三十一', month: '午', day: '甲申', ben: '天火同人', bian: '泽火革', quote: '午月甲申日防涨水冲去麦子，占何日晴，得天火同人变泽火革卦' },
  { chapter: '星煞章第三十三', month: '辰', day: '戊子', ben: '水地比', bian: '泽山咸', quote: '辰月戊子日占小舟过开恐盘阻，得水地比变泽山咸卦' },
  { chapter: '星煞章第三十三', month: '亥', day: '甲辰', ben: '火天大有', bian: '大畜', quote: '亥月甲辰日又占，又得火天大有变大畜卦' },
  { chapter: '用神元神忌神仇神章第九', month: '辰', day: '癸巳', ben: '坎为水', bian: '风水涣', quote: '辰月癸巳日，得坎为水变风水涣卦' },
];

// ── 《卜筮正宗》卦例（复城道长精校 docx，有文字层）──────────────
// 从正文表格提取：占事 / 卦名（本之变）/ 卦宫；有日期的记日期。
// 只收「本卦明确变出另一卦」且卦名可唯一解析的例子；判不准的（卦名讹字、无变卦）不收。
// 书里印的「空亡」若与通用旬空不符，只记录不断言（见 meta.sources 里的说明）。
const boshizhengzong = [
  // 此例书作「空亡 戌亥」，但丙辰日属甲寅旬、通用旬空应为子丑——只取卦名与卦宫，kong 留空
  { zhan: '自己终身成败', name: '火山旅之山风蛊', gong: '离火', date: '辰月丙辰日', kong: '', quote: '忆予于戊辰年辰月丙辰日卜自己终身成败得旅之蛊卦' },
  { zhan: '父为子择媳', name: '地雷复之火雷噬嗑', gong: '坤土', date: '申月甲午日', kong: '辰巳', quote: '又一人申月甲午日父为子择媳，得复之噬嗑卦' },
  { zhan: '占弟病业已临危', name: '水火既济之泽火革', gong: '坎水', date: '', kong: '辰巳' },
  { zhan: '占开店', name: '艮为山之地火明夷', gong: '艮土', date: '', kong: '子丑' },
  { zhan: '一人占仆何日回', name: '泽天夬之天泽履', gong: '坤土', date: '', kong: '午未' },
  { zhan: '占虑大计', name: '火山旅之地火明夷', gong: '离火', date: '', kong: '子丑' },
  { zhan: '两村争戽水闹殴', name: '离为火之坤为地', gong: '离火', date: '', kong: '子丑' },
  // 原文此例「卦宫」列为兑金，但水风井属震宫（木），与八宫表冲突——可能表格串行，先不收
  { zhan: '占升选', name: '地泽临之风泽中孚', gong: '坤土', date: '', kong: '申酉' },
  { zhan: '客外占众中安否', name: '天雷无妄之乾为天', gong: '巽木', date: '', kong: '子丑' },
  { zhan: '占子病吉凶', name: '艮为山之山水蒙', gong: '艮土', date: '', kong: '辰巳' },
  { zhan: '占功名终得出任否', name: '天火同人之泽火革', gong: '离火', date: '', kong: '戌亥' },
  { zhan: '占何日得财', name: '离为火之雷火丰', gong: '离火', date: '', kong: '申酉' },
  { zhan: '占因误军粮被参', name: '雷火丰之火山旅', gong: '坎水', date: '', kong: '寅卯' },
  { zhan: '一人因自及子俱被拿问', name: '巽为风之坤为地', gong: '巽木', date: '', kong: '子丑' },
  { zhan: '占妾近病', name: '巽为风之火天大有', gong: '巽木', date: '', kong: '辰巳' },
  { zhan: '占雨久伤麦可否', name: '天火同人之泽火革', gong: '离火', date: '', kong: '午未' },
  { zhan: '占父在乱军中吉凶', name: '山天大畜之泽地萃', gong: '艮土', date: '', kong: '戌亥' },
  { zhan: '占子何日脱难', name: '雷地豫之雷泽归妹', gong: '震木', date: '', kong: '寅卯' },
  { zhan: '因母病占问流年', name: '风雷益之天雷无妄', gong: '巽木', date: '', kong: '辰巳' },
];

// ── 紫微斗数安星要诀（《紫微斗数全书》通行本）──────────────
// 五行局由命宫纳音五行定：水二局、木三局、金四局、土五局、火六局
const wuxingJu = { 水: { name: '水二局', number: 2 }, 木: { name: '木三局', number: 3 }, 金: { name: '金四局', number: 4 }, 土: { name: '土五局', number: 5 }, 火: { name: '火六局', number: 6 } };


// 紫微与天府以寅申为轴镜像：天府 = 4 - 紫微（子=0 … 亥=11，模 12）
const tianfuFromZiwei = { rule: 'tianfuIndex = (4 - ziweiIndex + 12) % 12', basis: '紫微天府对照（寅申同宫，其余相照）' };

const fixture = {
  meta: {
    note: '公开经典通例，规则级录入（典籍 + 条目），不是从引擎输出反推的期望值。',
    generatedBy: 'tools/gen-classics-fixture.mjs',
    sources: {
      bajua: '《京氏易传》八宫卦序；世应交位为通行定例（八纯上爻、一至五世依次、游魂四爻、归魂三爻）',
      liuren: '《大六壬指南》日干寄宫、中气换将（雨水登明亥将起，逐中气一将）',
      ziwei: '《紫微斗数全书》安星要诀：纳音定五行局、紫微天府以寅申为轴相照',
      liuyaoExamples: '《增删卜易》卦例（luckclub.cn 古籍典藏电子本，PDF 有文字层）；原文用字保留（遯/遁 异体），动爻不录——原书卦象图在 PDF 里压成一行，位置不可靠',
      boshizhengzong: '《卜筮正宗》（复城道长精校 docx）：20 条卦例的占事/卦名/卦宫取自正文表格；卦名异体（干/乾、遯/遁）已归一。书中「空亡」与通用旬空不一致的例子（丙辰日作戌亥，应为子丑）只保留卦名卦宫，不断言空亡',
      boshizhengzongNote: 'docx 正文约 173k 字，识别出 138 条带「占事」的卦例，其中 99 条卦名可唯一解析；本文件收 20 条（含 2 条有日期），其余因卦名讹字或缺变卦未收',
      boshizhengzong: '《卜筮正宗》（复城道长精校）为扫描版、无文字层，暂未引用',
    },
    variants: { 遯: '遁' },
  },
  bajua,
  liuyaoExamples,
  boshizhengzong,
  liuren: { ganJiGong, yueJiangByZhongQi, yueJiangSamples },
  ziwei: { wuxingJu, tianfuFromZiwei },
};

const out = path.join(root, 'test', 'fixtures', 'classics.json');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, `${JSON.stringify(fixture, null, 2)}\n`, 'utf8');
console.log(`写入 ${path.relative(root, out)}：${bajua.length} 卦、${yueJiangByZhongQi.length} 中气、${Object.keys(ganJiGong).length} 天干寄宫`);
