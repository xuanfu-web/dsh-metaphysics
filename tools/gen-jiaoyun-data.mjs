// 离线重排交运对拍样本：test/fixtures/{baziqa-jiaoyun,vendor-jiaoyun-pages}.json → tools/data-jiaoyun.mjs
//
// 样本文件是生成物，不要手改。改口径请改底本或改这里的映射，然后重跑：
//   node tools/gen-jiaoyun-data.mjs          重写
//   node tools/gen-jiaoyun-data.mjs --check  只校验现有文件与底本一致（CI 用，不写盘）
//
// 三条硬规矩（上一版样本就是在这里栽的）：
//   1. 喂引擎的时间用上游 time.clock（原文钟表时间），让引擎自己扣夏令时；
//      上游 chart.datetime 取的是 stated（已扣夏令时），直接拿它再扣一次会偏 1 小时。
//   2. 页面没印的字段记 null，并把 published 标 false；本插件自己算的值绝不冒充厂家值。
//   3. 页面自相矛盾的整例进 UNUSABLE_CASES，不进命中率，也不拿它当「厂家算错」的证据。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC_BAZIQA = path.join(ROOT, 'test', 'fixtures', 'baziqa-jiaoyun.json');
const SRC_VENDOR = path.join(ROOT, 'test', 'fixtures', 'vendor-jiaoyun-pages.json');
const OUT = path.join(ROOT, 'tools', 'data-jiaoyun.mjs');

const bq = JSON.parse(fs.readFileSync(SRC_BAZIQA, 'utf8'));
const vp = JSON.parse(fs.readFileSync(SRC_VENDOR, 'utf8'));

// id 只是标签，出处以 file/chartKey 为准。显式列出，不用字符串尾段反推：
// 上游 2017_C7a_female_19510124 与 2017_C7b_female_19510124 同生日，反推尾段会撞成同一个 id。
const IDS = {
  'contest8_2021.json/male_19700723_P029': 'baziqa-2021-P029',
  'contest8_2022.json/female_19810526_P018': 'baziqa-2022-P018',
  'contest8_2022.json/female_19900523_P019': 'baziqa-2022-P019',
  'contest8_2023.json/female_19661018_P009': 'baziqa-2023-P009',
  'contest8_2023.json/female_20020601_P015': 'baziqa-2023-P015',
  'contest8_2024.json/guangdong_female_19800824_P001': 'baziqa-2024-P001',
  'contest8_2025.json/taiwan_female_19880215_P007': 'baziqa-2025-P007',
  'contest8_2026.json/2026_C1_male_19820612': 'baziqa-2026-19820612',
  'contest8_2026.json/2026_C2_female_19810120': 'baziqa-2026-19810120',
  'contest8_2026.json/2026_C7_female_19990814': 'baziqa-2026-19990814',
  'hkjfma_2013.json/2013_C2_female_19721106': 'baziqa-2013-19721106',
  'hkjfma_2013.json/2013_C3_male_19720115': 'baziqa-2013-19720115',
  'hkjfma_2015.json/2015_C6_female_19960310': 'baziqa-2015-19960310',
  'hkjfma_2017.json/2017_C2_male_19800625': 'baziqa-2017-19800625',
  'hkjfma_2017.json/2017_C5_female_19800202': 'baziqa-2017-19800202',
  'hkjfma_2017.json/2017_C7a_female_19510124': 'baziqa-2017-C7a',
  'hkjfma_2017.json/2017_C7b_female_19510124': 'baziqa-2017-C7b',
  'hkjfma_2018.json/2018_C6_female_19930817': 'baziqa-2018-19930817',
  'hkjfma_2019.json/2019_C4_female_19710528': 'baziqa-2019-19710528',
  'hkjfma_2020.json/2020_C2_female_19790301': 'baziqa-2020-19790301',
};

const cases = bq.cases.map((c) => {
  const key = `${c.file}/${c.chartKey}`;
  const id = IDS[key];
  if (!id) throw new Error(`没有 id 映射：${key}`);
  const clock = c.time.clock && c.time.clock.datetime;
  if (!clock) throw new Error(`${key} 上游没有 time.clock.datetime`);
  const hh = Number(clock.slice(11, 13));
  const notes = [`原文钟表时间 ${clock.slice(11)}`];
  if ((c.time.dst_minutes || 0) > 0) notes.push(`夏令时 ${c.time.dst_minutes} 分：上游 stated=${c.chartDatetime} 已扣，clock=${clock} 才是原文`);
  if (hh >= 23) notes.push('晚子时');
  if (c.hourPillarVaries) notes.push('上游标 hour_pillar_varies（另有 clock 变体四柱）');
  return {
    id,
    source: `${bq.meta.source}/blob/${bq.meta.commit}/charts/bazi/${c.file}`,
    chartKey: c.chartKey,
    engine: 'lunar-python 1.4.8',
    datetime: clock,
    vendorDatetime: c.chartDatetime,
    timeConvention: c.timeConvention,
    gender: c.gender,
    place: c.time.place,
    timezone: c.time.timezone,
    longitude: c.time.lon ?? null,
    dstMinutes: c.time.dst_minutes || 0,
    trueSolar: false,
    vendorPillars: c.pillars,
    vendor: {
      startDate: c.qiyun.start_date,
      direction: c.qiyun.direction,
      afterYears: c.qiyun.after_years,
      afterMonths: c.qiyun.after_months,
      afterDays: c.qiyun.after_days,
    },
    alternatives: c.alternatives,
    note: notes.join('；'),
  };
});
const ids = cases.map((c) => c.id);
if (new Set(ids).size !== ids.length) throw new Error('id 撞了');

// 页面示例：每个值都要能在采集到的正文引文里找到；找不到的记 null。
const q = vp.quotes;
const must = (quote, s, what) => {
  if (!quote || !quote.includes(s)) throw new Error(`页面引文里没有${what}：「${s}」`);
};
must(q.yuanziCase3, '1988-08-09 02:53', '出生时刻');
must(q.yuanziCase3, '戊辰、庚申、丙申、己丑', '四柱');
must(q.yuanziCase3, '1998-06-30 13:53', '交运时刻');
must(q.yuanziCase3, '9 年 10 个月 21 天 12 小时', '起运时长');
must(q.yuanziCase3, '首个完整大运为辛酉', '首运');
must(q.multifateExample, '1990年5月15日14时30分', '出生时刻');
must(q.multifateExample, '1997年8月4日起', '交运日');
must(q.multifateExample, '7岁2个月', '起运岁月');
must(q.lingtaiFields, '2026年1月1日08:00', '出生时刻');
must(q.lingtaiFields, '2034年5月16日', '交运日');
must(q.lingtaiCalc, '8年4月15日', '起运时长');
must(q.lingtaiCalc, '不含均時差', '经度校正口径');
for (const a of vp.multifateAbsentPillars) {
  if (a.occurrences !== 0) throw new Error(`multifate 竟然公布了 ${a.ganzhi}，须重新裁决`);
}

const vendorCases = [
  {
    id: 'vendor-yuanzi-1988',
    source: vp.meta.pages.find((p) => p.key === 'yuanzi').url,
    engine: '元梓知易 公开验证案例 3（固定四柱与起运基准）',
    evidence: 'quotes.yuanziCase3',
    datetime: '1988-08-09 02:53',
    gender: 'male',
    place: '中国大陆',
    timezone: 'Asia/Shanghai',
    longitude: null,
    dstMinutes: 60,
    trueSolar: false,
    lateZi: true,
    vendorPillars: ['戊辰', '庚申', '丙申', '己丑'],
    vendorFirstDayun: '辛酉',
    vendor: { startDate: '1998-06-30', startTime: '13:53', direction: 'forward', afterYears: 9, afterMonths: 10, afterDays: 21, afterHours: 12 },
    published: { pillars: true, firstDayun: true, startDate: true, startTime: true, years: true, months: true, days: true, hours: true },
    vendorJie: '白露（出生后的下一节）',
    note: '页面写明夏令时 UTC+09:00、日界 23:00 子初换日、顺排、计至白露；并解释交运显示 13:53 而非 14:53 是因 1998 年已无夏令时',
  },
  {
    id: 'vendor-multifate-1990',
    source: vp.meta.pages.find((p) => p.key === 'multifate').url,
    engine: 'Multifate 八字大运示例（虚构人物）',
    evidence: 'quotes.multifateExample',
    datetime: '1990-05-15 14:30',
    gender: 'male',
    place: '上海',
    timezone: 'Asia/Shanghai',
    longitude: null,
    dstMinutes: 0,
    trueSolar: false,
    lateZi: true,
    // 页面只印大运干支与交运日，没印四柱：庚午/辛巳/庚辰 在正文里出现 0 次（见 multifateAbsentPillars）
    vendorPillars: null,
    vendorFirstDayun: '壬午',
    vendor: { startDate: '1997-08-04', startTime: null, direction: 'forward', afterYears: 7, afterMonths: 2, afterDays: null },
    published: { pillars: false, firstDayun: true, startDate: true, startTime: false, years: true, months: true, days: false },
    note: '页面印「7岁2个月」「1997年8月4日起」「壬午」；四柱与「几天」未公布，记 null，不拿本机四柱冒充厂家值',
  },
  {
    id: 'vendor-lingtai-2026',
    source: vp.meta.pages.find((p) => p.key === 'lingtai').url,
    engine: '靈台 起运示例（假设资料）',
    evidence: 'quotes.lingtaiFields + quotes.lingtaiCalc',
    datetime: '2026-01-01 08:00',
    gender: 'male',
    place: '上海',
    timezone: 'Asia/Shanghai',
    longitude: 121.5,
    dstMinutes: 0,
    trueSolar: true,
    lateZi: true,
    vendorPillars: ['乙巳', '戊子', '乙亥', '庚辰'],
    vendorFirstDayun: '丁亥',
    vendor: { startDate: '2034-05-16', startTime: null, direction: 'backward', afterYears: 8, afterMonths: 4, afterDays: 15 },
    published: { pillars: true, firstDayun: true, startDate: true, startTime: false, years: true, months: true, days: true },
    // 页面自述只做经度校正、不含均时差；本插件 trueSolar 两者都算，差值在对拍里逐项归因
    vendorTimeCaliber: { longitudeOnly: true, correctionMinutes: 6, equationOfTime: false, displayedBirth: '08:06' },
    vendorJie: { name: '大雪', time: '2025-12-07 05:05', source: '页面引香港天文台 2025 年十二月历表' },
    vendorSpan: '约25天3小時；24天→8年、1天→4個月、3小時→约15天',
    note: '页面明写「只有經度差，不含均時差」，并把余数按日历月加算；本插件按 365.2422/3 比例加算，两者差约 1.7 天',
  },
];

// 同页另有三组固定验证案例，锁的是历法层（换日／真太阳时／立春），不混进交运统计。
const vendorL0 = [
  {
    id: 'l0-yuanzi-zi',
    source: vp.meta.pages.find((p) => p.key === 'yuanzi').url,
    evidence: 'quotes.yuanziCase1',
    topic: '23:00 子初换日 vs 00:00 午夜换日',
    datetime: '1983-12-08 23:30',
    gender: 'male',
    timezone: 'Asia/Shanghai',
    dstMinutes: 0,
    trueSolar: false,
    variants: [
      { lateZi: true, expectPillars: ['癸亥', '甲子', '辛未', '戊子'], pageLabel: '23:00 子初换日' },
      { lateZi: false, expectPillars: ['癸亥', '甲子', '庚午', '丙子'], pageLabel: '00:00 午夜换日' },
    ],
    note: '同一输入两种日界，页面把两套四柱都印出来了；正好用来证伪「lateZi 开关没生效」',
  },
  {
    id: 'l0-yuanzi-jixi',
    source: vp.meta.pages.find((p) => p.key === 'yuanzi').url,
    evidence: 'quotes.yuanziCase2',
    topic: '真太阳时跨过 23:00',
    datetime: '1983-12-08 22:30',
    gender: 'male',
    place: '黑龙江鸡西',
    timezone: 'Asia/Shanghai',
    longitude: 130.97,
    dstMinutes: 0,
    variants: [
      { trueSolar: false, expectPillars: ['癸亥', '甲子', '庚午', '丁亥'], pageLabel: '钟表时间' },
      { trueSolar: true, expectPillars: ['癸亥', '甲子', '辛未', '戊子'], pageLabel: '真太阳时', expectTrueSolarText: '1983-12-08 23:21', expectOffsetMinutes: 51 },
    ],
    note: '页面：经度 +43.9 分、均时差 +7.0 分（它用的是 9.87sin2B 那套近似式）、合计 +51 分 → 23:21。本插件按 Meeus 严格式推 EoT≈8.5 分、合计 +52.4 → 23:22——天文一侧是严格式对，页面偏小 1.5 分；两者同落子时，四柱全同',
  },
  {
    id: 'l0-yuanzi-lichun',
    source: vp.meta.pages.find((p) => p.key === 'yuanzi').url,
    evidence: 'quotes.yuanziCase5',
    topic: '同一立春瞬间换年换月',
    datetime: '2024-02-04 16:20',
    gender: 'male',
    timezone: 'Asia/Shanghai',
    dstMinutes: 0,
    trueSolar: false,
    expectJie: { name: '立春', time: '2024-02-04 16:27' },
    variants: [
      { datetime: '2024-02-04 16:20', expectYearMonth: ['癸卯', '乙丑'], pageLabel: '交节前约 7 分钟' },
      { datetime: '2024-02-04 16:30', expectYearMonth: ['甲辰', '丙寅'], pageLabel: '交节后约 3 分钟' },
    ],
    note: '页面印本站立春为北京时间 02-04 16:27；本插件 jieqi 给同一分钟，前后两侧年月柱各自翻换',
  },
];

// 不可用样本：页面自身前后矛盾，既不能当厂家真值，也不能当「厂家算错」的证据。
const unusable = [
  {
    id: 'unusable-pipa-1047',
    source: vp.meta.pages.find((p) => p.key === 'pipa').url,
    evidence: 'quotes.pipaHeader + quotes.pipaAuto',
    reason: '页面自相矛盾',
    detail: '页首与四柱表是「【乾造】乙未 甲申 己未 己巳」（乙未年=1955，大运癸未壬午辛巳为甲申月逆排，与乙年阴男逆行相符）；'
      + '但同页自动生成块写「出生农历 戊午年七月廿二／公历 1978-08-25／真太阳时 9时至11时之间」，起运 5年8个月、交运 1984-04-24左右。'
      + '1984-04-24 减 5年8个月 指向 1978-08-25，与页首乙未年不是同一张盘。',
    published: { pillars: '乙未 甲申 己未 己巳（页首）', birthBlock: '戊午年七月廿二 / 1978-08-25', startAge: '5年8个月', startDate: '1984-04-24左右', jie: ['立秋 1978-08-08 05:17:40', '白露 1978-09-08 08:02:24'] },
    notPublished: ['精确出生钟点（只给巳时 9–11 时区间）', '性别以外的四柱归属说明'],
    ours: { datetime: '1978-08-25 10:00', assumption: '10:00 是本机在巳时区间里取的中点，页面没给这个钟点', pillars: ['戊午', '庚申', '己未', '己巳'], direction: '顺行', startDate: '1983-04-15', startAge: '4年8个月', jie: '白露 1978-09-08 08:02' },
    hypothesis: '若按 1978-08-25 10:00 逆数到立秋（1978-08-08 05:17:40）得约 17.2 天，三天折一年正是 5年8个月——与页面起运值相符；'
      + '但戊午年阳男应顺排，且页面大运列却是逆排。这只是推测，页面没有自述取节过程，不作为「厂家取节错误」的结论。',
    note: '整例判不可用：不进命中率，也不据此改本插件算法。旧版样本把它写成「厂家顺行却按上一节立秋」的确定结论，属过度声称，已撤。',
  },
];

const js = (v) => JSON.stringify(v);
const ser = (o, indent) => {
  const pad = ' '.repeat(indent);
  const lines = Object.entries(o).map(([k, v]) => {
    const key = /^[A-Za-z_$][\w$]*$/.test(k) ? k : js(k);
    if (v === null) return `${pad}${key}: null,`;
    if (Array.isArray(v)) return `${pad}${key}: ${js(v)},`;
    if (typeof v === 'object') return `${pad}${key}: ${ser(v, indent + 2)},`;
    return `${pad}${key}: ${typeof v === 'string' ? js(v) : String(v)},`;
  });
  return `{\n${lines.join('\n')}${lines.length ? '\n' : ''}${' '.repeat(Math.max(0, indent - 2))}}`;
};
const listOf = (arr, indent) => arr.map((o) => `${' '.repeat(indent)}${ser(o, indent + 2)},`).join('\n');

export function render() {
  const m = bq.meta;
  const s = m.stats;
  const out = [];
  out.push('// 第三方交运对拍样本 —— 生成物，请勿手改。');
  out.push(`// 重排：node tools/gen-jiaoyun-data.mjs（校验：--check）`);
  out.push(`// 底本：test/fixtures/baziqa-jiaoyun.json（${m.source} @ ${m.commit.slice(0, 10)}，${s.upstreamFiles} 个文件逐字节核过）`
    + `＋ test/fixtures/vendor-jiaoyun-pages.json（${vp.meta.pages.length} 个公开页面，正文引文＋哈希）`);
  out.push(`// 采集：${m.capturedAt.slice(0, 10)} / ${vp.meta.capturedAt.slice(0, 10)}；厂家引擎 ${m.engine.split('（')[0]}`);
  out.push('//');
  out.push(`// 选例口径的实数（不是「精心挑选」）：全库 ${s.charts} 例 → 有分钟级 stated ${s.filter.preciseStated} → UTC+8 ${s.filter.preciseUtc8}`
    + ` → 其中无夏令时 ${s.filter.preciseUtc8NoDst}。本文件取其中显式列出的 ${cases.length} 例，覆盖 12 个源文件、晚子时、夏令时边界与同一命例的两个时辰变体。`);
  out.push(`// 厂家 after_days 全库只出现 ${Object.keys(s.afterDaysDistribution).join('/')} 三档（${s.charts}/${s.charts} 为 10 的倍数），`
    + '是「一时辰折十日」的量化值，不是逐日精算；交运日天然有日级差，对拍只锁四柱、顺逆与偏差量级。');
  out.push('// 喂引擎用 datetime（上游 time.clock 原文钟表时间），让引擎自己扣夏令时；vendorDatetime 是上游实际排盘用的 stated 值，两者由测试逐例对齐。');
  out.push('');
  out.push(`export const PROVENANCE = ${ser({
    repo: m.source, commit: m.commit, commitUrl: m.commitUrl, upstreamFiles: s.upstreamFiles, charts: s.charts,
    afterDaysDistribution: s.afterDaysDistribution, afterDaysAllMultiplesOf10: s.afterDaysAllMultiplesOf10,
    filter: s.filter, selected: cases.length, baziqaCapturedAt: m.capturedAt, vendorCapturedAt: vp.meta.capturedAt,
    vendorPages: vp.meta.pages.map((p) => ({ key: p.key, url: p.url, textChars: p.textChars, textSha256: p.textSha256 })),
  }, 2)};`);
  out.push('');
  out.push('export const BAZIQA_CASES = [');
  out.push(listOf(cases, 2));
  out.push('];');
  out.push('');
  out.push('// 公开页面补充样本：published 标 false 的字段是页面没印的，一律 null，不参与该项比对。');
  out.push('export const VENDOR_CASES = [');
  out.push(listOf(vendorCases, 2));
  out.push('];');
  out.push('');
  out.push('// 同一批页面里的历法层固定案例（换日／真太阳时／立春），不混进交运统计。');
  out.push('export const VENDOR_L0_CASES = [');
  out.push(listOf(vendorL0, 2));
  out.push('];');
  out.push('');
  out.push('// 不可用样本：页面自相矛盾，整例排除，既不当厂家真值也不当厂家错值的证据。');
  out.push('export const UNUSABLE_CASES = [');
  out.push(listOf(unusable, 2));
  out.push('];');
  out.push('');
  out.push('export const ALL_CASES = [...BAZIQA_CASES, ...VENDOR_CASES];');
  out.push('');
  return out.join('\n');
}

// 只有直接运行才写盘；被测试 import 时只暴露 render()，不产生副作用。
const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const text = render();
  if (process.argv.includes('--check')) {
    const cur = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
    if (cur !== text) {
      console.error('✗ tools/data-jiaoyun.mjs 与底本不一致：跑 node tools/gen-jiaoyun-data.mjs 重排');
      process.exit(1);
    }
    console.log(`✓ tools/data-jiaoyun.mjs 与底本逐字节一致（${Buffer.byteLength(text)} bytes，${cases.length} + ${vendorCases.length} 例，另 ${vendorL0.length} 条历法案例、${unusable.length} 条不可用）`);
  } else {
    fs.writeFileSync(OUT, text);
    console.log(`写入 tools/data-jiaoyun.mjs：${Buffer.byteLength(text)} bytes`);
    console.log(`  BAZIQA ${cases.length} 例、页面 ${vendorCases.length} 例、历法层 ${vendorL0.length} 例、不可用 ${unusable.length} 例`);
  }
}