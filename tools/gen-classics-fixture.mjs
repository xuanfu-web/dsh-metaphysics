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
    },
  },
  bajua,
  liuren: { ganJiGong, yueJiangByZhongQi, yueJiangSamples },
  ziwei: { wuxingJu, tianfuFromZiwei },
};

const out = path.join(root, 'test', 'fixtures', 'classics.json');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, `${JSON.stringify(fixture, null, 2)}\n`, 'utf8');
console.log(`写入 ${path.relative(root, out)}：${bajua.length} 卦、${yueJiangByZhongQi.length} 中气、${Object.keys(ganJiGong).length} 天干寄宫`);
