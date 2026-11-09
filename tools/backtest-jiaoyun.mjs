// 交运批量对拍：把本机交运日与第三方排盘结果逐例比对。
// 底本：tools/data-jiaoyun.mjs（生成物）← test/fixtures/*.json（上游逐字节 / 页面正文引文核过）。
// 只读比对，不改引擎。四柱／顺逆／时间基准／首运不一致，或偏差 >10 天，退出码 1。
// published=false 的厂家字段是 null：不参与比对，也不拿本机值冒充厂家值。
import { compute } from '../engine/index.js';
import { ALL_CASES, BAZIQA_CASES, VENDOR_CASES, UNUSABLE_CASES, PROVENANCE } from './data-jiaoyun.mjs';

const MAX_DIFF_DAYS = 10;
const DIR = { forward: '顺行', backward: '逆行' };
const DAY_MS = 86400000;

function parts(s) {
  const m = String(s).match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? Date.UTC(+m[1], +m[2] - 1, +m[3]) : NaN;
}
const daysBetween = (a, b) => Math.round((parts(a) - parts(b)) / DAY_MS);
const pillarsOf = (r) => ['year', 'month', 'day', 'hour'].map((k) => r.pillars[k].ganzhi);
// 厂家没印的项返回 null，与 true/false 三态分开；统计时 null 一律剔除。
const same = (ours, vendor) => (vendor == null ? null : ours === vendor);

// 「Y 年 M 月」按日历加算（月末截断），用于把精算总天数拆成 年月部分 + 余数。
function addYM(s, years, months) {
  const m = String(s).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return NaN;
  const y = +m[1] + (years || 0);
  const mo = +m[2] - 1 + (months || 0);
  const last = new Date(Date.UTC(y, mo + 1, 0)).getUTCDate();
  return Date.UTC(y, mo, Math.min(+m[3], last));
}

function runCase(c) {
  const r = compute({
    system: 'bazi',
    datetime: c.datetime.replace(' ', 'T'),
    gender: c.gender,
    trueSolar: c.trueSolar === true,
    longitude: c.longitude ?? undefined,
    dst: (c.dstMinutes || 0) > 0,
    lateZi: c.lateZi !== false,
  });
  const ours = r.dayun.jiao.at.slice(0, 10);
  const pillars = pillarsOf(r);
  const base = c.vendorDatetime || c.datetime;
  const exactTotalDays = r.dayun.jiao.spanDays * r.dayun.jiao.scaleDaysPerDay;
  const ymDays = (addYM(base, c.vendor.afterYears, c.vendor.afterMonths) - parts(base)) / DAY_MS;
  const residual = exactTotalDays - ymDays;
  return {
    case: c,
    ours,
    during: r.dayun.jiao.at,
    diff: daysBetween(ours, c.vendor.startDate),
    pillars,
    pillarsOk: c.vendorPillars ? same(pillars.join(' '), c.vendorPillars.join(' ')) : null,
    directionOk: r.dayun.direction === DIR[c.vendor.direction],
    // 时间基准：喂原文钟表时间 + dst，引擎扣完夏令时必须回到上游排盘用的 stated 值。
    frameOk: c.vendorDatetime ? same(r.solarTime.civilText, c.vendorDatetime) : null,
    firstDayun: r.dayun.list[0] && r.dayun.list[0].ganzhi,
    firstDayunOk: same(r.dayun.list[0] && r.dayun.list[0].ganzhi, c.vendorFirstDayun),
    yearMonthOk: ours.slice(0, 7) === c.vendor.startDate.slice(0, 7),
    ageOk: (c.vendor.afterYears == null || c.vendor.afterMonths == null) ? null
      : r.dayun.startAge.years === c.vendor.afterYears && r.dayun.startAge.months === c.vendor.afterMonths,
    startAge: `${r.dayun.startAge.years}y${r.dayun.startAge.months}m`,
    // 截断口径（年/月/日/时）：与厂家「X年X个月X天」的展示方式同源
    exact: r.dayun.startAgeExact,
    exactText: `${r.dayun.startAgeExact.years}y${r.dayun.startAgeExact.months}m${r.dayun.startAgeExact.days}d${r.dayun.startAgeExact.hours}h`,
    exactAgeOk: (c.vendor.afterYears == null || c.vendor.afterMonths == null) ? null
      : r.dayun.startAgeExact.years === c.vendor.afterYears && r.dayun.startAgeExact.months === c.vendor.afterMonths,
    exactDaysOk: same(r.dayun.startAgeExact.days, c.vendor.afterDays),
    exactHoursOk: same(r.dayun.startAgeExact.hours, c.vendor.afterHours),
    jie: `${r.dayun.jiao.from.name} ${r.dayun.jiao.from.time}`,
    exactTotalDays: +exactTotalDays.toFixed(2),
    ymDays: +ymDays.toFixed(2),
    residual: +residual.toFixed(2),
    delta: c.vendor.afterDays == null ? null : +(residual - c.vendor.afterDays).toFixed(2),
  };
}

const pad = (s, n) => String(s).padEnd(n, ' ');
const mark = (v) => (v === null ? '—' : v ? 'OK' : 'FAIL');
const rows = ALL_CASES.map(runCase);

const summaryOf = (list) => {
  const b = { n: list.length, exact: 0, le2: 0, le5: 0, le10: 0, over10: 0 };
  for (const r of list) {
    const a = Math.abs(r.diff);
    if (a === 0) b.exact += 1;
    if (a <= 2) b.le2 += 1;
    if (a <= 5) b.le5 += 1;
    if (a <= 10) b.le10 += 1;
    else b.over10 += 1;
  }
  const abs = list.map((r) => Math.abs(r.diff));
  b.meanAbsDays = abs.length ? +(abs.reduce((s, x) => s + x, 0) / abs.length).toFixed(2) : null;
  b.maxAbsDays = abs.length ? Math.max(...abs) : null;
  return b;
};
// 三态字段的命中率：分母只算厂家真的印了的那几例。
const tally = (list, key) => {
  const known = list.filter((r) => r[key] !== null && r[key] !== undefined);
  return `${known.filter((r) => r[key]).length}/${known.length}`;
};
const baziqaRows = rows.filter((r) => BAZIQA_CASES.includes(r.case));
const vendorRows = rows.filter((r) => VENDOR_CASES.includes(r.case));
const all = summaryOf(rows);

const json = process.argv.includes('--json');
if (json) {
  const pack = (list) => list.map((r) => ({
    id: r.case.id,
    datetime: r.case.datetime,
    vendorDatetime: r.case.vendorDatetime || null,
    vendor: r.case.vendor.startDate,
    ours: r.ours,
    diffDays: r.diff,
    pillarsOk: r.pillarsOk,
    directionOk: r.directionOk,
    frameOk: r.frameOk,
    firstDayunOk: r.firstDayunOk,
    yearMonthOk: r.yearMonthOk,
    ageOk: r.ageOk,
    exactAgeOk: r.exactAgeOk,
    exactDaysOk: r.exactDaysOk,
    exactHoursOk: r.exactHoursOk,
    startAgeExact: r.exact,
    jie: r.jie,
    attribution: {
      exactTotalDays: r.exactTotalDays,
      ymDays: r.ymDays,
      residual: r.residual,
      vendorAfterDays: r.case.vendor.afterDays,
      delta: r.delta,
    },
  }));
  console.log(JSON.stringify({
    provenance: {
      repo: PROVENANCE.repo,
      commit: PROVENANCE.commit,
      charts: PROVENANCE.charts,
      afterDaysDistribution: PROVENANCE.afterDaysDistribution,
      afterDaysAllMultiplesOf10: PROVENANCE.afterDaysAllMultiplesOf10,
    },
    total: rows.length,
    hits: {
      pillars: tally(rows, 'pillarsOk'),
      direction: `${rows.filter((r) => r.directionOk).length}/${rows.length}`,
      frame: tally(rows, 'frameOk'),
      firstDayun: tally(rows, 'firstDayunOk'),
      yearMonth: `${rows.filter((r) => r.yearMonthOk).length}/${rows.length}`,
      age: tally(rows, 'ageOk'),
      ageExact: tally(rows, 'exactAgeOk'),
      daysExact: tally(rows, 'exactDaysOk'),
      hoursExact: tally(rows, 'exactHoursOk'),
    },
    all,
    baziqa: summaryOf(baziqaRows),
    vendor: summaryOf(vendorRows),
    cases: pack(rows),
    unusable: UNUSABLE_CASES.map((c) => ({ id: c.id, reason: c.reason, note: c.note })),
  }, null, 2));
} else {
  console.log('交运批量对拍（只读；不改引擎）');
  console.log(`底本：${PROVENANCE.repo} @ ${PROVENANCE.commit.slice(0, 10)}，全库 ${PROVENANCE.charts} 例，取样 ${BAZIQA_CASES.length} 例 + 公开页面 ${VENDOR_CASES.length} 例`);
  console.log(`厂家 after_days 档位 ${JSON.stringify(PROVENANCE.afterDaysDistribution)}，全为 10 的倍数：${PROVENANCE.afterDaysAllMultiplesOf10}\n`);
  console.log(`${pad('id', 28)}${pad('厂家交运', 12)}${pad('本机交运', 12)}${pad('Δ天', 6)}${pad('基准', 6)}${pad('四柱', 6)}${pad('顺逆', 6)}${pad('首运', 6)}${pad('起运岁', 8)}`);
  for (const r of rows) {
    console.log(`${pad(r.case.id, 28)}${pad(r.case.vendor.startDate, 12)}${pad(r.ours, 12)}${pad(r.diff, 6)}${pad(mark(r.frameOk), 6)}${pad(mark(r.pillarsOk), 6)}${pad(mark(r.directionOk), 6)}${pad(mark(r.firstDayunOk), 6)}${pad(`${r.startAge}${r.ageOk === null ? '—' : r.ageOk ? '' : '≠'}`, 8)}`);
  }
  console.log(`\n合计 ${rows.length} 例：四柱 ${tally(rows, 'pillarsOk')}，顺逆 ${rows.filter((r) => r.directionOk).length}/${rows.length}，时间基准 ${tally(rows, 'frameOk')}，首运 ${tally(rows, 'firstDayunOk')}，同年月 ${rows.filter((r) => r.yearMonthOk).length}/${rows.length}`);
  console.log(`起运岁两种口径：四舍五入到月 ${tally(rows, 'ageOk')}；截断到年月 ${tally(rows, 'exactAgeOk')}（截断到日 ${tally(rows, 'exactDaysOk')}、到时 ${tally(rows, 'exactHoursOk')}）`);
  console.log('（分母只算厂家印了该项的例；— 表示厂家未公布，不参与比对）');
  console.log(`交运日偏差：完全同日 ${all.exact}；≤2 天 ${all.le2}；≤5 天 ${all.le5}；≤10 天 ${all.le10}；>10 天 ${all.over10}`);
  console.log(`绝对偏差均值 ${all.meanAbsDays} 天，最大 ${all.maxAbsDays} 天`);
  const brief = (s) => `n=${s.n} 同日${s.exact} ≤2:${s.le2} ≤5:${s.le5} ≤10:${s.le10} >10:${s.over10} 均值${s.meanAbsDays} 最大${s.maxAbsDays}`;
  console.log(`分组：BaziQA ${brief(summaryOf(baziqaRows))}；公开页面 ${brief(summaryOf(vendorRows))}`);

  console.log('\n偏差归因（精算总天数 = spanDays × 365.2422/3；年月按日历加算，余数对比厂家「几天」）：');
  console.log(`${pad('id', 28)}${pad('精算总天', 11)}${pad('年月天', 10)}${pad('本机余数', 10)}${pad('厂家天', 8)}${pad('Δ', 8)}${pad('取节', 24)}`);
  for (const r of rows) {
    console.log(`${pad(r.case.id, 28)}${pad(r.exactTotalDays, 11)}${pad(r.ymDays, 10)}${pad(r.residual, 10)}${pad(r.case.vendor.afterDays == null ? '—' : r.case.vendor.afterDays, 8)}${pad(r.delta == null ? '—' : r.delta, 8)}${pad(r.jie, 24)}`);
  }
  console.log('两个系统性来源：① 厂家「几天」只按 10 天档量化；② 厂家余数按日历月加算，本机按 365.2422/3 比例加算。');

  console.log('\n起运岁展示口径（同一个 spanDays，两种拆法）：');
  console.log(`${pad('id', 28)}${pad('厂家', 16)}${pad('本机截断', 16)}${pad('本机四舍五入', 14)}${pad('年月', 6)}${pad('日', 6)}${pad('时', 6)}`);
  for (const r of rows) {
    const v = r.case.vendor;
    const vendorText = `${v.afterYears}y${v.afterMonths}m${v.afterDays == null ? '—' : `${v.afterDays}d`}${v.afterHours == null ? '' : `${v.afterHours}h`}`;
    console.log(`${pad(r.case.id, 28)}${pad(vendorText, 16)}${pad(r.exactText, 16)}${pad(r.startAge, 14)}${pad(mark(r.exactAgeOk), 6)}${pad(mark(r.exactDaysOk), 6)}${pad(mark(r.exactHoursOk), 6)}`);
  }
  console.log('截断＝年月取整后余数继续拆（1 月 = 0.25 日 = 6 时）；四舍五入＝月位 Math.round。前者与厂家展示同源，后者会把余数 ≥半月 进位。');

  console.log(`\n整例排除、不进命中率（${UNUSABLE_CASES.length} 例）：`);
  for (const c of UNUSABLE_CASES) console.log(`  ${c.id}：${c.reason} —— ${c.note}`);
}

const bad = rows.filter((r) => r.pillarsOk === false || r.directionOk === false
  || r.frameOk === false || r.firstDayunOk === false || Math.abs(r.diff) > MAX_DIFF_DAYS);
if (bad.length) {
  console.error(`\n✗ ${bad.length} 例超出对拍门槛（四柱/顺逆/时间基准/首运不一致，或偏差 >${MAX_DIFF_DAYS} 天）：${bad.map((r) => r.case.id).join(', ')}`);
  process.exit(1);
}
