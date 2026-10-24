// 换局事件枚举器：按规则生成候选日，比较「拆补」与「超神接气/置闰」的排盘差异。
// 用法：node tools/qimen-divergence.mjs [起始年] [结束年]
// 输出：分裂样本（含四方差异），按「分裂程度」排序；默认取前 20 条打印。
import { buildQimen } from '../engine/qimen.js';
import { termInstantJd, jdToParts, partsToJd, formatJd } from '../engine/calendar.js';

const fromYear = Number(process.argv[2] || 2024);
const toYear = Number(process.argv[3] || 2026);

const DAY = 86400000;
const pad = (n) => String(n).padStart(2, '0');
const iso = (y, m, d) => `${y}-${pad(m)}-${pad(d)}`;
const jdOfDay = (y, m, d) => partsToJd({ year: y, month: m, day: d, hour: 12, minute: 0 });
const dayOfJd = (jd) => {
  const p = jdToParts(jd);
  return { y: p.year, m: p.month, d: p.day };
};
const addDays = (y, m, d, n) => {
  const jd = jdOfDay(y, m, d) + n;
  return dayOfJd(jd);
};

/** 收集某年的换局事件日：交节前后、甲己日、超九日临界、跨零点 */
function candidates(year) {
  const out = new Map();
  const push = (y, m, d, reason) => {
    const key = iso(y, m, d);
    if (!out.has(key)) out.set(key, { date: key, reasons: [] });
    const e = out.get(key);
    if (!e.reasons.includes(reason)) e.reasons.push(reason);
  };
  // 1) 24 节气交节当天、前 1 天、后 1 天
  for (let i = 0; i < 24; i++) {
    const p = dayOfJd(termInstantJd(year, i));
    for (const off of [-1, 0, 1]) {
      const q = addDays(p.y, p.m, p.d, off);
      push(q.y, q.m, q.d, `交节${off === 0 ? '当天' : off > 0 ? '+1' : '-1'}`);
    }
  }
  // 2) 甲己日（符头）
  for (let jd = jdOfDay(year, 1, 1); jd <= jdOfDay(year, 12, 31); jd++) {
    const idx = (((Math.floor(jd + 0.5) + 49) % 60) + 60) % 60;
    if (idx % 10 === 0 || idx % 10 === 5) {
      const p = dayOfJd(jd);
      push(p.y, p.m, p.d, '甲己符头日');
    }
  }
  // 3) 距交节 9/10/11 天
  for (let i = 0; i < 24; i++) {
    const p = dayOfJd(termInstantJd(year, i));
    for (const off of [-9, -10, -11, 9, 10, 11]) {
      const q = addDays(p.y, p.m, p.d, off);
      if (q.y === year) push(q.y, q.m, q.d, `距交节${off > 0 ? '+' : ''}${off}天`);
    }
  }
  return [...out.values()];
}

const HOURS = ['00:30', '03:30', '09:30', '15:30', '21:30', '23:30'];

function resultOf(date, time, juMethod) {
  const [y, m, d] = date.split('-').map(Number);
  const [hh, mm] = time.split(':').map(Number);
  const r = buildQimen({ year: y, month: m, day: d, hour: hh, minute: mm, juMethod });
  return {
    term: r.jieqi,
    yuan: r.yuan,
    ju: `${r.dun}${r.juNumber}`,
    full: r.ju,
    dun: r.dun,
    note: r.juMethodNote,
    dayGz: r.siZhu.day,
    hourGz: r.siZhu.time,
  };
}

/** 逐字段比较，输出差异（不是只判相同） */
function diff(a, b) {
  const fields = [];
  if (a.term !== b.term) fields.push(`节气 ${a.term}→${b.term}`);
  if (a.yuan !== b.yuan) fields.push(`元 ${a.yuan}→${b.yuan}`);
  if (a.ju !== b.ju) fields.push(`局数 ${a.ju}→${b.ju}`);
  if (a.dayGz !== b.dayGz) fields.push(`日柱 ${a.dayGz}→${b.dayGz}`);
  return { fields, score: fields.length };
}

const splits = [];
let checked = 0;
for (let y = fromYear; y <= toYear; y++) {
  for (const c of candidates(y)) {
    for (const t of HOURS) {
      checked++;
      const chaibu = resultOf(c.date, t, 'chaibu');
      const chaoshen = resultOf(c.date, t, 'chaoshen');
      const zhirun = resultOf(c.date, t, 'zhirun');
      const d1 = diff(chaibu, chaoshen);
      const d2 = diff(chaibu, zhirun);
      const score = Math.max(d1.score, d2.score);
      if (score > 0) {
        splits.push({
          date: c.date,
          time: t,
          reasons: c.reasons,
          score,
          chaibu,
          other: d2.score >= d1.score
            ? { name: '置闰', ...zhirun, diff: d2.fields }
            : { name: '超接', ...chaoshen, diff: d1.fields },
        });
      }
    }
  }
}

splits.sort((a, b) => b.score - a.score || a.date.localeCompare(b.date));
const top = splits.slice(0, 20);
console.log(`枚举 ${fromYear}–${toYear}：候选 ${checked} 个时刻，分裂 ${splits.length} 个`);
console.log('');
for (const s of top) {
  console.log(`${s.date} ${s.time}  [${s.reasons.slice(0, 2).join('/')}]  分裂度 ${s.score}`);
  console.log(`  拆补：${s.chaibu.full}　节气 ${s.chaibu.term}　${s.chaibu.note}`);
  console.log(`  ${s.other.name}：${s.other.full}　节气 ${s.other.term}　${s.other.note}`);
  console.log(`  差异：${s.other.diff.join('；')}`);
  console.log('');
}
// 供测试直接复用
if (process.argv.includes('--json')) {
  console.log(JSON.stringify(top.slice(0, 5).map((s) => ({
    date: s.date, time: s.time,
    chaibu: { ju: s.chaibu.full, term: s.chaibu.term },
    other: { name: s.other.name, ju: s.other.full, term: s.other.term },
    diff: s.other.diff,
  })), null, 2));
}
