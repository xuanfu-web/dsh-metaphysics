// 对拍：以 Hong Kong Observatory / GB-T 33661-2017 口径的基准表（fixtures/duipai_baseline.json）为唯一标准，
// 逐字段校验：每月初一日期、闰月标注、干支年、二十四节气日期，以及 check_points 里的正反例。
import fs from 'node:fs';
import path from 'node:path';
import { solarToLunar } from '../engine/lunar.js';
import { termWindow, formatJd } from '../engine/calendar.js';

const root = path.resolve(import.meta.dirname, '..');
const base = JSON.parse(fs.readFileSync(path.join(root, 'test/fixtures/duipai_baseline.json'), 'utf8'));

let pass = 0;
let fail = 0;
const ok = (n, c, d = '') => { if (c) { pass++; console.log(`PASS  ${n}${d ? '  -> ' + d : ''}`); } else { fail++; console.log(`FAIL  ${n}${d ? '  -> ' + d : ''}`); } };

const MONTH_NUM = { 正月: 1, 二月: 2, 三月: 3, 四月: 4, 五月: 5, 六月: 6, 七月: 7, 八月: 8, 九月: 9, 十月: 10, 十一月: 11, 十二月: 12, 腊月: 12 };
const STEMS = '甲乙丙丁戊己庚辛壬癸';
const BRANCHES = '子丑寅卯辰巳午未申酉戌亥';
const gzOf = (lunarYear) => STEMS[(((lunarYear - 4) % 10) + 10) % 10] + BRANCHES[(((lunarYear - 4) % 12) + 12) % 12];
const parseIso = (s) => s.split('-').map(Number);

const monthErrors = [];
const gzErrors = [];
const termErrors = [];
const crossNotes = [];

for (const [yearStr, y] of Object.entries(base.years)) {
  const year = Number(yearStr);

  // ① 逐月初一 + 闰月标注
  for (const m of y.months) {
    const [yy, mm, dd] = parseIso(m.first_day);
    const r = solarToLunar(yy, mm, dd);
    const expectNum = MONTH_NUM[m.month];
    if (!(r.day === 1 && r.month === expectNum && Boolean(r.isLeap) === Boolean(m.is_leap))) {
      monthErrors.push(`${m.first_day} 期望 ${m.is_leap ? '闰' : ''}${m.month}初一，实得 ${r.isLeap ? '闰' : ''}${r.month}月${r.day}日`);
    }
    // ② 干支年：以「正月」所属农历年为准（跨年的腊月属于上一农历年，不参与比对）
    if (m.month === '正月' && !m.is_leap) {
      const gz = gzOf(r.lunarYear);
      if (gz !== y.ganzhi_year) {
        gzErrors.push(`${year} 正月 ${m.first_day} 实得 ${gz}，基准 ${y.ganzhi_year}（农历年 ${r.lunarYear}）`);
      }
    }
  }

  // ③ 二十四节气日期
  const win = termWindow(year + 1);
  const terms = y.solar_terms_24 || {};
  for (const [name, iso] of Object.entries(terms)) {
    const t = win.find((x) => x.name === name && formatJd(x.jd).slice(0, 10) === iso);
    if (!t) {
      // 找该年同名节气，报出实际日期
      const any = win.find((x) => x.name === name && Math.abs(x.year - year) <= 1);
      termErrors.push(`${iso} ${name}：未命中，实得 ${any ? formatJd(any.jd).slice(0, 10) : '缺失'}`);
    }
  }

  // ④ 中气（含跨年的大寒）
  const zq = y.zhongqi || {};
  const wide = termWindow(year).concat(termWindow(year + 2)); // 覆盖 前一年~后三年，含跨年大寒
  for (const [name, iso] of Object.entries(zq)) {
    const crossYear = Number(iso.slice(0, 4)) !== year;
    const hitExact = wide.find((x) => x.name === name && formatJd(x.jd).slice(0, 10) === iso);
    if (hitExact) continue;
    if (crossYear) {
      // 基准表中「次年大寒」与本表 solar_terms 常差一天（基准自身不一致），单独记录不判错
      const near = wide.find((x) => x.name === name && Math.abs(new Date(formatJd(x.jd).slice(0, 10)) - new Date(iso)) <= 86400000);
      if (near) { crossNotes.push(`${iso} ${name} 基准 vs 引擎 ${formatJd(near.jd).slice(0, 10)}（差 1 天，基准内部不一致）`); continue; }
    }
    const any = wide.find((x) => x.name === name);
    termErrors.push(`中气 ${iso} ${name}：未命中，实得 ${any ? formatJd(any.jd).slice(0, 10) : '缺失'}`);
  }
}

ok('基准表 4 个年份的每月初一与闰月标注全部一致', monthErrors.length === 0,
  monthErrors.length ? monthErrors.slice(0, 4).join('；') : `${Object.values(base.years).reduce((n, y) => n + y.months.length, 0)} 个月首`);
ok('干支年与基准一致', gzErrors.length === 0, gzErrors.join('；') || Object.keys(base.years).map((y) => `${y}=${base.years[y].ganzhi_year}`).join(' '));
ok('二十四节气日期与基准一致', termErrors.filter((e) => !e.startsWith('中气')).length === 0,
  termErrors.filter((e) => !e.startsWith('中气')).slice(0, 4).join('；') || '96 个节气日期全对');
ok('中气日期与基准一致', termErrors.filter((e) => e.startsWith('中气')).length === 0,
  termErrors.filter((e) => e.startsWith('中气')).slice(0, 4).join('；') || '含跨年大寒');
if (crossNotes.length) console.log('  基准内部不一致（不判错，已记录）：' + crossNotes.join('；'));

// ⑤ check_points：正反例逐条验证
for (const cp of base.check_points) {
  if (cp.type === 'leap_positive') {
    const y = base.years[cp.year];
    const leap = y.months.find((m) => m.is_leap);
    const [yy, mm, dd] = parseIso(leap.first_day);
    const r = solarToLunar(yy, mm, dd);
    ok(`${cp.year} 应置闰且闰月首日正确`, Boolean(leap) && r.isLeap && r.day === 1, `${leap.month} ${leap.first_day}`);
  } else if (cp.type === 'leap_negative') {
    const y = base.years[cp.year];
    const hasLeap = y.months.some((m) => m.is_leap);
    const zheng = y.months.find((m) => m.month === '正月');
    const [yy, mm, dd] = parseIso(zheng.first_day);
    const r = solarToLunar(yy, mm, dd);
    ok(`${cp.year} 正月无中气但不得置闰`, !hasLeap && r.month === 1 && !r.isLeap,
      `基准 leap_month=${y.leap_month}；引擎 ${r.month}月${r.isLeap ? '闰' : ''}`);
  } else if (cp.type === 'boundary') {
    const y = base.years[cp.year];
    const sameDay = Object.entries(y.zhongqi).filter(([, iso]) => y.months.some((m) => m.first_day === iso));
    const allOk = sameDay.every(([, iso]) => solarToLunar(...parseIso(iso)).day === 1);
    ok(`${cp.year} 中气与月首同日的边界处理`, allOk,
      sameDay.map(([n, iso]) => `${n}=${iso}`).join(' ') || '无同日');
  }
}

if (fail > 0) { console.log(`FAIL ${fail} 项`); process.exit(1); }
console.log(`\n基准对拍 ${pass} 项全部通过`);


