// 交运批量对拍：把 tools/data-jiaoyun.mjs 的第三方结果逐例复算。
// 锁四件事：样本可追溯（底本→生成物逐字节）、四柱/顺逆/时间基准同源、偏差落在可解释的量化范围内、
// 起运岁两种展示口径的差别被证明是口径差而不是算错。
// 厂家没印的字段是 null，一律剔除出分母；不拿本机值冒充厂家值。
import fs from 'node:fs';
import { compute } from '../engine/index.js';
import {
  PROVENANCE, BAZIQA_CASES, VENDOR_CASES, VENDOR_L0_CASES, UNUSABLE_CASES, ALL_CASES,
} from '../tools/data-jiaoyun.mjs';
import { render } from '../tools/gen-jiaoyun-data.mjs';
import { ok, eq } from './_harness.mjs';

const here = new URL('.', import.meta.url);
const readJson = (p) => JSON.parse(fs.readFileSync(new URL(p, here), 'utf8'));
const bq = readJson('./fixtures/baziqa-jiaoyun.json');
const vp = readJson('./fixtures/vendor-jiaoyun-pages.json');

const DIR = { forward: '顺行', backward: '逆行' };
const DAY_MS = 86400000;
const day = (s) => {
  const m = String(s).match(/^(\d{4})-(\d{2})-(\d{2})/);
  return Date.UTC(+m[1], +m[2] - 1, +m[3]);
};
const diffDays = (a, b) => Math.round((day(a) - day(b)) / DAY_MS);
const pillarsOf = (r) => ['year', 'month', 'day', 'hour'].map((k) => r.pillars[k].ganzhi);

function run(c) {
  const r = compute({
    system: 'bazi',
    datetime: c.datetime.replace(' ', 'T'),
    gender: c.gender,
    trueSolar: c.trueSolar === true,
    longitude: c.longitude ?? undefined,
    dst: (c.dstMinutes || 0) > 0,
    lateZi: c.lateZi !== false,
  });
  return {
    r,
    ours: r.dayun.jiao.at.slice(0, 10),
    diff: diffDays(r.dayun.jiao.at.slice(0, 10), c.vendor.startDate),
    pillars: pillarsOf(r),
  };
}

// ── 一、样本台账：数量、出处、未公布项必须显式为 null ──────────────
eq('BaziQA 主样本 20 例', BAZIQA_CASES.length, 20);
eq('公开页面补充样本 3 例', VENDOR_CASES.length, 3);
eq('历法层固定案例 3 例', VENDOR_L0_CASES.length, 3);
eq('整例不可用 1 例', UNUSABLE_CASES.length, 1);
eq('交运统计合计 23 例', ALL_CASES.length, 23);
{
  const ids = [...ALL_CASES, ...VENDOR_L0_CASES, ...UNUSABLE_CASES].map((c) => c.id);
  eq('全部样本 id 不重复', ids.length, new Set(ids).size);
  const bad = ALL_CASES.filter((c) =>
    !/^https:\/\//.test(c.source || '')
    || !c.engine
    || !/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(c.datetime)
    || !['male', 'female'].includes(c.gender)
    || !['forward', 'backward'].includes(c.vendor && c.vendor.direction)
    || !/^\d{4}-\d{2}-\d{2}$/.test(c.vendor && c.vendor.startDate));
  ok('每例都有出处、引擎、钟表时间、性别、方向、交运日', bad.length === 0, bad.map((c) => c.id).join(','));
  eq('BaziQA 只有 1 例夏令时边界', BAZIQA_CASES.filter((c) => c.dstMinutes > 0).length, 1);
  ok('BaziQA 主样本均为 UTC+8',
    BAZIQA_CASES.every((c) => /^Asia\/(Shanghai|Hong_Kong|Taipei|Macau)$/.test(c.timezone)),
    BAZIQA_CASES.filter((c) => !/^Asia\/(Shanghai|Hong_Kong|Taipei|Macau)$/.test(c.timezone)).map((c) => c.id).join(','));
  // 四柱为 null 只允许出现在「页面确实没印」的那一例，且要有 0 次出现的证据兜底。
  const nullPillars = ALL_CASES.filter((c) => c.vendorPillars == null);
  eq('只有 1 例厂家四柱未公布', nullPillars.map((c) => c.id).join(','), 'vendor-multifate-1990');
  ok('未公布项与 published 标记一致',
    nullPillars.every((c) => c.published.pillars === false)
    && ALL_CASES.filter((c) => c.published && c.published.pillars === true).every((c) => Array.isArray(c.vendorPillars) && c.vendorPillars.length === 4),
    '');
  ok('Multifate 四柱缺失有「0 次出现」证据',
    vp.multifateAbsentPillars.length === 3 && vp.multifateAbsentPillars.every((x) => x.occurrences === 0),
    JSON.stringify(vp.multifateAbsentPillars));
  ok('BaziQA 四柱全部为 4 个干支',
    BAZIQA_CASES.every((c) => Array.isArray(c.vendorPillars) && c.vendorPillars.length === 4
      && c.vendorPillars.every((g) => /^[\u4e00-\u9fa5]{2}$/.test(g))), '');
}

// ── 二、底本 → 生成物：逐字段重推 + 逐字节一致 ────────────────────
{
  eq('生成物与底本重排逐字节一致',
    fs.readFileSync(new URL('../tools/data-jiaoyun.mjs', here), 'utf8'), render());
  eq('PROVENANCE.commit 与底本一致', PROVENANCE.commit, bq.meta.commit);
  eq('底本记录 20 例切片', bq.cases.length, 20);
  eq('上游 17 个文件全部核过', bq.meta.files.length, 17);
  ok('17 个文件都有 blobSha 与 sha256',
    bq.meta.files.every((f) => /^[0-9a-f]{40}$/.test(f.blobSha) && /^[0-9a-f]{64}$/.test(f.sha256) && f.bytes > 0), '');
  eq('全库 117 例', PROVENANCE.charts, 117);
  eq('after_days 档位分布合计 117',
    Object.values(PROVENANCE.afterDaysDistribution).reduce((s, n) => s + n, 0), 117);
  ok('after_days 全库均为 10 的倍数', PROVENANCE.afterDaysAllMultiplesOf10 === true
    && Object.keys(PROVENANCE.afterDaysDistribution).every((k) => +k % 10 === 0),
    JSON.stringify(PROVENANCE.afterDaysDistribution));

  const mismatch = [];
  for (const c of BAZIQA_CASES) {
    const f = bq.cases.find((x) => x.chartKey === c.chartKey);
    if (!f) { mismatch.push(`${c.id}:底本无此 chartKey`); continue; }
    const want = {
      datetime: f.time.clock.datetime,
      vendorDatetime: f.chartDatetime,
      timeConvention: f.timeConvention,
      gender: f.gender,
      place: f.time.place,
      timezone: f.time.timezone,
      longitude: f.time.lon,
      dstMinutes: f.time.dst_minutes,
      vendorPillars: f.pillars,
      alternatives: f.alternatives,
      startDate: f.qiyun.start_date,
      direction: f.qiyun.direction,
      afterYears: f.qiyun.after_years,
      afterMonths: f.qiyun.after_months,
      afterDays: f.qiyun.after_days,
    };
    const got = {
      datetime: c.datetime, vendorDatetime: c.vendorDatetime, timeConvention: c.timeConvention,
      gender: c.gender, place: c.place, timezone: c.timezone, longitude: c.longitude,
      dstMinutes: c.dstMinutes, vendorPillars: c.vendorPillars, alternatives: c.alternatives,
      startDate: c.vendor.startDate, direction: c.vendor.direction,
      afterYears: c.vendor.afterYears, afterMonths: c.vendor.afterMonths, afterDays: c.vendor.afterDays,
    };
    for (const k of Object.keys(want)) {
      if (JSON.stringify(want[k]) !== JSON.stringify(got[k])) mismatch.push(`${c.id}.${k}`);
    }
    if (!c.source.includes(bq.meta.commit) || !c.source.endsWith(f.file)) mismatch.push(`${c.id}.source`);
  }
  eq('20 例逐字段从底本重推无偏差', mismatch.join(','), '');
  // 页面样本的每个声称值都必须真的出现在抓下来的正文引文里。
  const quoteBad = [];
  for (const c of [...VENDOR_CASES, ...VENDOR_L0_CASES, ...UNUSABLE_CASES]) {
    for (const key of String(c.evidence || '').split(/\s*\+\s*/)) {
      const q = vp.quotes[key.replace(/^quotes\./, '')];
      if (typeof q !== 'string' || !q.length) quoteBad.push(`${c.id}:${key}`);
    }
  }
  eq('每条样本都指向真实存在的正文引文', quoteBad.join(','), '');
  ok('元梓案例 3 的起运四段与交运时刻都在引文里',
    ['9 年 10 个月 21 天 12 小时', '1998-06-30 13:53', '戊辰、庚申、丙申、己丑', '首个完整大运为辛酉']
      .every((s) => vp.quotes.yuanziCase3.includes(s) || vp.quotes.yuanziCase2.includes(s)), '');
  ok('Multifate 只印了年月日与首运，没印四柱',
    ['7岁2个月', '1997年8月4日', '壬午'].every((s) => vp.quotes.multifateExample.includes(s)), '');
  ok('靈台自述只作经度校正、不含均时差',
    vp.quotes.lingtaiCalc.includes('08:00顯示為08:06')
    && vp.quotes.lingtaiCalc.includes('這一步只有經度差，不含均時差'), '');
}

// ── 三、逐例复算：四柱／顺逆／时间基准／首运必须同源 ───────────────
const rows = ALL_CASES.map((c) => ({ c, ...run(c) }));
const known = (key) => rows.filter((x) => x[key] !== null);
const hit = (key) => `${known(key).filter((x) => x[key]).length}/${known(key).length}`;
for (const x of rows) {
  x.pillarsOk = x.c.vendorPillars ? x.pillars.join(' ') === x.c.vendorPillars.join(' ') : null;
  x.directionOk = x.r.dayun.direction === DIR[x.c.vendor.direction];
  x.frameOk = x.c.vendorDatetime ? x.r.solarTime.civilText === x.c.vendorDatetime : null;
  x.firstDayunOk = x.c.vendorFirstDayun ? x.r.dayun.list[0].ganzhi === x.c.vendorFirstDayun : null;
  x.ageOk = x.r.dayun.startAge.years === x.c.vendor.afterYears && x.r.dayun.startAge.months === x.c.vendor.afterMonths;
  x.exactAgeOk = x.r.dayun.startAgeExact.years === x.c.vendor.afterYears
    && x.r.dayun.startAgeExact.months === x.c.vendor.afterMonths;
}
eq('四柱 22/22 与厂家一致（Multifate 未公布，剔除）', hit('pillarsOk'), '22/22');
eq('四柱不一致的例', rows.filter((x) => x.pillarsOk === false).map((x) => x.c.id).join(','), '');
eq('顺逆 23/23 与厂家一致', hit('directionOk'), '23/23');
eq('时间基准 20/20：喂原文钟表时间＋dst，引擎扣完回到上游 stated', hit('frameOk'), '20/20');
eq('首运 3/3 与页面一致', hit('firstDayunOk'), '3/3');
ok('交运时刻都落在出生之后', rows.every((x) => x.r.dayun.jiao.spanDays > 0 && x.r.dayun.jiao.jd > 0), '');
ok('取节方向与顺逆一致：顺行取下节、逆行取上节', rows.every((x) => {
  const from = day(x.r.dayun.jiao.from.time.slice(0, 10));
  const birth = day(x.c.vendorDatetime || x.c.datetime);
  return x.r.dayun.direction === '顺行' ? from >= birth : from <= birth;
}), '');

// ── 四、偏差分布：日级量化差，不允许出现量级错误 ─────────────────
const abs = rows.map((x) => Math.abs(x.diff));
const mean = abs.reduce((s, n) => s + n, 0) / abs.length;
eq('没有一例超过 10 天', rows.filter((x) => Math.abs(x.diff) > 10).map((x) => `${x.c.id}:${x.diff}`).join(','), '');
ok('完全同日至少 3 例', rows.filter((x) => x.diff === 0).length >= 3, String(rows.filter((x) => x.diff === 0).length));
ok('≤5 天至少 15 例', abs.filter((a) => a <= 5).length >= 15, String(abs.filter((a) => a <= 5).length));
ok('绝对偏差均值 ≤4.5 天', mean <= 4.5, mean.toFixed(2));
ok('同年月至少 18 例',
  rows.filter((x) => x.ours.slice(0, 7) === x.c.vendor.startDate.slice(0, 7)).length >= 18,
  String(rows.filter((x) => x.ours.slice(0, 7) === x.c.vendor.startDate.slice(0, 7)).length));
for (const c of VENDOR_CASES) {
  const x = rows.find((q) => q.c.id === c.id);
  ok(`${c.id} 与页面交运日相差 ≤3 天`, Math.abs(x.diff) <= 3, `${x.ours} vs ${c.vendor.startDate}（${x.diff} 天）`);
}

// ── 五、起运岁：证明「不一致」是展示口径差，不是算错 ───────────────
eq('截断到年月 23/23 与厂家一致', rows.filter((x) => x.exactAgeOk).length, 23);
eq('四舍五入到月 15/23（既有 startAge 口径）', rows.filter((x) => x.ageOk).length, 15);
{
  // 机制证伪：每一例四舍五入与厂家不符的，都必须是「月内余数 ≥0.5 被进位」，而不是间隔本身算错。
  const wrong = [];
  for (const x of rows.filter((q) => !q.ageOk)) {
    const tm = x.r.dayun.jiao.spanDays * 4;
    const frac = tm % 12;
    if (!(frac >= 0.5 && Math.round(frac) === Math.floor(frac) + 1)) wrong.push(`${x.c.id}:${frac.toFixed(3)}`);
    if (x.r.dayun.startAgeExact.years !== x.c.vendor.afterYears
      || x.r.dayun.startAgeExact.months !== x.c.vendor.afterMonths) wrong.push(`${x.c.id}:截断也不符`);
  }
  eq('8 例差全部由「月位进位」解释', wrong.join(','), '');
  eq('差例数恰为 8', rows.filter((x) => !x.ageOk).length, 8);
}
{
  // 最精确的一家：元梓把年/月/日/时四段都印了，本机截断口径必须四段全中。
  const x = rows.find((q) => q.c.id === 'vendor-yuanzi-1988');
  const e = x.r.dayun.startAgeExact;
  eq('元梓 9年10个月21天12小时 四段全中',
    `${e.years}/${e.months}/${e.days}/${e.hours}`,
    `${x.c.vendor.afterYears}/${x.c.vendor.afterMonths}/${x.c.vendor.afterDays}/${x.c.vendor.afterHours}`);
  eq('截断到日 4/22、到时 1/1（其余厂家只给 10 天档）',
    `${rows.filter((x) => x.c.vendor.afterDays != null && x.r.dayun.startAgeExact.days === x.c.vendor.afterDays).length}`
    + `/${rows.filter((x) => x.c.vendor.afterDays != null).length}`, '4/22');
  const dayBad = rows.filter((x) => x.c.vendor.afterDays != null
    && Math.abs(x.r.dayun.startAgeExact.days - x.c.vendor.afterDays) > 10);
  eq('没有一例「日」差超过一个 10 天档', dayBad.map((x) => x.c.id).join(','), '');
  ok('BaziQA 厂家「几天」全为 10 的倍数',
    BAZIQA_CASES.every((c) => c.vendor.afterDays % 10 === 0), '');
}
{
  // 靈台那 2 天差必须能被拆开：日历月加算 vs 比例加算，不是取节或顺逆错。
  const x = rows.find((q) => q.c.id === 'vendor-lingtai-2026');
  eq('靈台取节与页面同为大雪', x.r.dayun.jiao.from.name, '大雪');
  ok('靈台本机大雪 05:04 与页面引 HKO 05:05 只差 1 分钟',
    Math.abs(diffDays(x.r.dayun.jiao.from.time, x.c.vendorJie.time)) === 0
    && x.r.dayun.jiao.from.time.slice(11) === '05:04' && x.c.vendorJie.time.slice(11) === '05:05',
    `${x.r.dayun.jiao.from.time} vs ${x.c.vendorJie.time}`);
  ok('页面自述不含均时差，本机真太阳时含均时差',
    x.c.vendorTimeCaliber.equationOfTime === false && x.r.solarTime.offsetMinutes !== 6,
    `页面 +6 分；本机 ${x.r.solarTime.offsetMinutes} 分`);
}

// ── 六、夏令时输入语义：反向证伪 frameOk 不是恒真 ─────────────────
{
  const c = BAZIQA_CASES.find((x) => x.dstMinutes > 0);
  const good = run(c);
  // 把上游已经扣过夏令时的 stated 值再喂一次 dst:true，等于扣两次，必须给出不同结果。
  const dbl = compute({
    system: 'bazi', datetime: c.vendorDatetime.replace(' ', 'T'), gender: c.gender,
    trueSolar: false, dst: true, lateZi: true,
  });
  ok('双重扣夏令时会改变民用时间（证明 frameOk 是真闸门）',
    dbl.solarTime.civilText !== c.vendorDatetime,
    `${dbl.solarTime.civilText} vs ${c.vendorDatetime}`);
  ok('双重扣夏令时会改变交运时刻', dbl.dayun.jiao.at !== good.r.dayun.jiao.at,
    `${dbl.dayun.jiao.at} vs ${good.r.dayun.jiao.at}`);
  eq('正确喂法（原文钟表时间＋dst）回到上游 stated', good.r.solarTime.civilText, c.vendorDatetime);
  ok('夏令时例的原文与 stated 确实相差 60 分钟',
    c.datetime !== c.vendorDatetime && c.dstMinutes === 60, `${c.datetime} / ${c.vendorDatetime}`);
}

// ── 七、历法层固定案例：同一输入的两套口径都要能复现 ───────────────
for (const c of VENDOR_L0_CASES) {
  for (const v of c.variants) {
    const r = compute({
      system: 'bazi',
      datetime: (v.datetime || c.datetime).replace(' ', 'T'),
      gender: c.gender,
      trueSolar: v.trueSolar === undefined ? c.trueSolar === true : v.trueSolar,
      longitude: c.longitude ?? undefined,
      dst: (c.dstMinutes || 0) > 0,
      lateZi: v.lateZi === undefined ? true : v.lateZi,
    });
    if (v.expectPillars) {
      eq(`${c.id} / ${v.pageLabel} 四柱`, pillarsOf(r).join(' '), v.expectPillars.join(' '));
    }
    if (v.expectYearMonth) {
      eq(`${c.id} / ${v.pageLabel} 年月柱`,
        [r.pillars.year.ganzhi, r.pillars.month.ganzhi].join(' '), v.expectYearMonth.join(' '));
    }
    if (v.expectTrueSolarText) {
      // 页面那条基准自己用的还是 9.87sin2B 那套近似均时差：本日它取 +7.0 分，合计 +51 → 23:21。
      // 本机换 Meeus 严格式后 EoT≈8.5 分，合计 +52.4 → 23:22——天文一侧是本机对，页面偏小 1.5 分。
      // 要紧的是四柱：两者都落在子时，戊子一柱不受影响。所以这里不再钉「差整 1 分钟」，
      // 而是要求「同柱 + 偏差落在近似式误差带内」，并单独把 EoT 的天文精度钉在 calendar.test 里。
      ok(`${c.id} 校正分钟与页面相差 ≤2 分钟（近似式误差带）`,
        Math.abs(r.solarTime.offsetMinutes - v.expectOffsetMinutes) <= 2,
        `${r.solarTime.offsetMinutes} vs 页面 ${v.expectOffsetMinutes}`);
    }
  }
  if (c.expectJie) {
    const r = compute({
      system: 'bazi', datetime: c.datetime.replace(' ', 'T'), gender: c.gender, lateZi: true,
    });
    eq(`${c.id} 节气名`, r.jieqi.next.name, c.expectJie.name);
    eq(`${c.id} 节气时刻到分钟`, r.jieqi.next.time, c.expectJie.time);
  }
}
{
  // 子初换日开关必须真的改变日柱与时柱，否则上面两套四柱就是巧合。
  const c = VENDOR_L0_CASES.find((x) => x.id === 'l0-yuanzi-zi');
  const a = compute({ system: 'bazi', datetime: c.datetime.replace(' ', 'T'), gender: c.gender, lateZi: true });
  const b = compute({ system: 'bazi', datetime: c.datetime.replace(' ', 'T'), gender: c.gender, lateZi: false });
  ok('lateZi 开关确实改变日柱', a.pillars.day.ganzhi !== b.pillars.day.ganzhi,
    `${a.pillars.day.ganzhi} vs ${b.pillars.day.ganzhi}`);
  ok('lateZi 开关确实改变时柱', a.pillars.hour.ganzhi !== b.pillars.hour.ganzhi,
    `${a.pillars.hour.ganzhi} vs ${b.pillars.hour.ganzhi}`);
}

// ── 八、不可用样本：整例排除，旧结论必须显式撤回 ─────────────────
{
  const c = UNUSABLE_CASES[0];
  ok('不可用例不混进交运统计', !ALL_CASES.some((q) => q.id === c.id), c.id);
  ok('不可用例也不混进历法层统计', !VENDOR_L0_CASES.some((q) => q.id === c.id), c.id);
  eq('排除理由是页面自相矛盾', c.reason, '页面自相矛盾');
  ok('旧的「厂家取节错误」结论已显式撤回', /过度声称，已撤/.test(c.note), c.note);
  ok('替代解释标注为推测而非结论', /推测/.test(c.hypothesis), c.hypothesis.slice(0, 40));
  ok('本机复算标明钟点是自己取的中点', /页面没给这个钟点/.test(c.ours.assumption), c.ours.assumption);
  ok('矛盾双方都留了原文（页首四柱 vs 自动生成块）',
    vp.quotes.pipaHeader.includes('乙未') && vp.quotes.pipaAuto.includes('1978-08-25'), '');
  ok('页面只给巳时区间、没给精确钟点', c.notPublished.some((s) => /精确出生钟点/.test(s)), '');
}
