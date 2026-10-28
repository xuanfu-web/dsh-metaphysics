// 0.32.0：大运交运时刻（日 / 时辰级）。
// 口径：交运时刻 = 出生时刻 + 「出生 → 起运那一侧节令」的真实天数 × 365.2422/3。
// 这条比例同时兑现古法三条——三日折一年、一日折四月、一时辰折十日；
// 每步大运在同月同日同时刻换，闰日退到 2 月 28 日。
//
// 重点防四件事：①比例被写错（三日/一年不再是同一个数）②顺逆排取错节令
// ③交运日期与 startAge、每步 10 年脱钩 ④闰日与旧结果（无 dayun.jiao）炸掉。
import fs from 'node:fs';
import vm from 'node:vm';
import { buildBazi } from '../engine/bazi.js';
import { compute, interpret } from '../engine/index.js';
import { formatJd, partsToJd } from '../engine/calendar.js';
import { daysInMonth } from '../engine/validate.js';
import { ok, eq } from './_harness.mjs';

const SAMPLE = { year: 1990, month: 5, day: 12, hour: 14, minute: 30 };
const male = buildBazi({ ...SAMPLE, gender: 'male', trueSolar: false, dst: false, nowYear: 2026 });
const female = buildBazi({ ...SAMPLE, gender: 'female', trueSolar: false, dst: false, nowYear: 2026 });
const J = male.dayun.jiao;
const JF = female.dayun.jiao;

const DATE_RE = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
const parseDate = (s) => {
  const m = DATE_RE.exec(s);
  return m ? { year: +s.slice(0, 4), month: +s.slice(5, 7), day: +s.slice(8, 10), hour: +s.slice(11, 13), minute: +s.slice(14, 16) } : null;
};

// ── 一、结构：交运字段齐全，且与旧字段并存（startAge 不动） ───────────
{
  ok('dayun.jiao 存在', !!J, String(J));
  eq('交运字段清单', Object.keys(J).sort().join(','), 'at,frame,from,jd,note,offsetMinutes,scaleDaysPerDay,spanDays,yearDays');
  ok('at 是「YYYY-MM-DD HH:mm」', DATE_RE.test(J.at), J.at);
  ok('from 写明用的是哪个节令', typeof J.from.name === 'string' && DATE_RE.test(J.from.time), JSON.stringify(J.from));
  ok('保留旧字段 startAge（向后兼容）', Number.isInteger(male.dayun.startAge.years) && Number.isInteger(male.dayun.startAge.months), JSON.stringify(male.dayun.startAge));
  ok('保留旧字段 toNextJieDays', typeof male.dayun.toNextJieDays === 'number', String(male.dayun.toNextJieDays));
  ok('口径写进结果（note 提到三日折一年）', /三日折一年/.test(J.note), J.note);
}

// ── 二、比例：三日折一年 / 一日折四月 / 一时辰折十日 ───────────────────
{
  const YEAR = 365.2422;
  ok('一年取回归年 365.2422 日', Math.abs(J.yearDays - YEAR) < 1e-9, String(J.yearDays));
  ok('比例 = 年长 / 3', Math.abs(J.scaleDaysPerDay - YEAR / 3) < 1e-9, String(J.scaleDaysPerDay));
  ok('三日折一年（3 日 × 比例 = 1 年）', Math.abs(3 * J.scaleDaysPerDay - YEAR) < 1e-9, String(3 * J.scaleDaysPerDay));
  ok('一日折四月（比例 ÷ 月长 = 4）', Math.abs(J.scaleDaysPerDay / (YEAR / 12) - 4) < 1e-9, String(J.scaleDaysPerDay / (YEAR / 12)));
  ok('一时辰折十日（比例 ÷ 12 ≈ 10.15 日）', Math.abs(J.scaleDaysPerDay / 12 - 10.1456) < 1e-3, String(J.scaleDaysPerDay / 12));
  ok('比例是常量（男女同盘一致）', Math.abs(J.scaleDaysPerDay - JF.scaleDaysPerDay) < 1e-12, '');
}

// ── 三、独立复算：交运 jd = 出生 jd + 真实相隔天数 × 比例 ───────────────
{
  // trueSolar:false 时 jd 就是民用时刻，可直接由 partsToJd 复算，不必借引擎内部变量
  const birthJd = partsToJd(SAMPLE);
  const offset = J.jd - birthJd;
  ok('交运偏移 = spanDays × 比例（差 < 0.001 日）', Math.abs(offset - J.spanDays * J.scaleDaysPerDay) < 1e-3, `${offset.toFixed(6)} vs ${(J.spanDays * J.scaleDaysPerDay).toFixed(6)}`);
  ok('交运时刻与 jd 同源', J.at === formatJd(J.jd), `${J.at} vs ${formatJd(J.jd)}`);
  ok('交运偏移 > 0（时刻在出生之后）', offset > 0, String(offset));
  // 交运岁数与 startAge（按月四舍五入的旧字段）必须同源：相差不超过半个月
  const jiaoYears = J.spanDays / 3;
  const ageYears = male.dayun.startAge.years + male.dayun.startAge.months / 12;
  ok('交运时刻与 startAge 同源（差 < 1 个月）', Math.abs(ageYears - jiaoYears) <= 1 / 12 + 1e-9, `${ageYears.toFixed(4)} vs ${jiaoYears.toFixed(4)}`);
}

// ── 四、顺排取下一节、逆排取上一节 ────────────────────────────────────
{
  eq('男命阳年顺排', male.dayun.direction, '顺行');
  eq('女命阳年逆排', female.dayun.direction, '逆行');
  ok('顺行：数到下一节', J.from.name === male.jieqi.next.name && J.from.time === male.jieqi.next.time, `${J.from.name} ${J.from.time} vs ${male.jieqi.next.name} ${male.jieqi.next.time}`);
  ok('逆行：数到上一节', JF.from.name === female.jieqi.previous.name && JF.from.time === female.jieqi.previous.time, `${JF.from.name} ${JF.from.time} vs ${female.jieqi.previous.name} ${female.jieqi.previous.time}`);
  ok('顺行相隔天数 = 下一节 jd − 出生 jd', Math.abs(J.spanDays - (partsToJd(parseDate(J.from.time)) - partsToJd(SAMPLE))) < 1e-3, String(J.spanDays));
  ok('逆行相隔天数 = 出生 jd − 上一节 jd', Math.abs(JF.spanDays - (partsToJd(SAMPLE) - partsToJd(parseDate(JF.from.time)))) < 1e-3, String(JF.spanDays));
}

// ── 五、每步大运：起止相接、每步 10 年、首步从交运日始 ─────────────────
{
  const list = male.dayun.list;
  eq('八步大运', list.length, 8);
  eq('首步 fromDate = 交运时刻', list[0].fromDate, J.at);
  const gaps = list.slice(0, -1).filter((d, i) => d.toDate !== list[i + 1].fromDate);
  eq('前一步 toDate 接上后一步 fromDate', gaps.map((d) => d.ganzhi).join(','), '');
  const notTen = list.filter((d) => Number(d.toDate.slice(0, 4)) - Number(d.fromDate.slice(0, 4)) !== 10);
  eq('每步正好 10 个公历年', notTen.map((d) => d.ganzhi).join(','), '');
  const clockChanged = list.filter((d) => d.fromDate.slice(11) !== J.at.slice(11) || d.toDate.slice(11) !== J.at.slice(11));
  eq('每步都在同一时刻换（时分相同）', clockChanged.map((d) => d.fromDate).join(','), '');
  const mdChanged = list.filter((d) => d.fromDate.slice(5, 10) !== J.at.slice(5, 10));
  eq('每步都在同月同日换', mdChanged.map((d) => d.fromDate).join(','), '');
  const ageDrift = list.filter((d) => Math.abs((Number(d.fromDate.slice(0, 4)) - SAMPLE.year) - d.startAge) > 1);
  eq('交运年份与 startAge 相差不超过 1 岁', ageDrift.map((d) => `${d.ganzhi}@${d.fromDate}`).join(','), '');
  ok('每步都带 fromDate/toDate 字符串', list.every((d) => DATE_RE.test(d.fromDate) && DATE_RE.test(d.toDate)), '');
}

// ── 六、闰日：交运日落在 2 月 29 日时，十年后（平年）退到 2 月 28 日 ─────
{
  const leap = buildBazi({ year: 1987, month: 10, day: 10, hour: 8, minute: 0, gender: 'male', trueSolar: false, dst: false, nowYear: 2026 });
  ok('该盘交运日正好是 2 月 29 日', leap.dayun.jiao.at.slice(5, 10) === '02-29', leap.dayun.jiao.at);
  eq('闰日十年后退到 2 月 28 日（时分不变）', leap.dayun.list[0].toDate, `${Number(leap.dayun.jiao.at.slice(0, 4)) + 10}-02-28 ${leap.dayun.jiao.at.slice(11)}`);
  eq('下一步也接在同一天', leap.dayun.list[1].fromDate, leap.dayun.list[0].toDate);
}

// ── 七、全年扫描：交运与每步日期都是合法公历日期 ───────────────────────
{
  const bad = [];
  let scanned = 0;
  for (let y = 1990; y <= 2000; y++) {
    for (const month of [1, 3, 6, 9, 12]) {
      for (const gender of ['male', 'female']) {
        const r = buildBazi({ year: y, month, day: 15, hour: 10, minute: 0, gender, trueSolar: false, dst: false, nowYear: 2026 });
        scanned += 1;
        for (const s of [r.dayun.jiao.at, ...r.dayun.list.flatMap((d) => [d.fromDate, d.toDate])]) {
          const p = parseDate(s);
          if (!p || p.day < 1 || p.day > daysInMonth(p.year, p.month) || p.hour > 23 || p.minute > 59) bad.push(s);
        }
      }
    }
  }
  ok(`扫 ${scanned} 个盘，交运日期全部是合法公历`, bad.length === 0, bad.slice(0, 5).join(' '));
}

// ── 八、真太阳时：交运时刻与四柱同口径，且标注 frame ───────────────────
{
  const ts = buildBazi({ ...SAMPLE, gender: 'male', longitude: 87.6, dst: false, nowYear: 2026 });
  ok('带经度时 frame 标真太阳时', ts.dayun.jiao.frame === '真太阳时', ts.dayun.jiao.frame);
  ok('带经度时 offsetMinutes 非零', Math.abs(ts.dayun.jiao.offsetMinutes) > 0, String(ts.dayun.jiao.offsetMinutes));
  ok('真太阳时盘的交运时刻仍与 jd 同源', ts.dayun.jiao.at === formatJd(ts.dayun.jiao.jd), ts.dayun.jiao.at);
  const civilOffset = ts.dayun.jiao.jd - partsToJd(SAMPLE);
  const expectOffset = ts.dayun.jiao.offsetMinutes / 1440 + ts.dayun.jiao.spanDays * ts.dayun.jiao.scaleDaysPerDay;
  // jiao.spanDays 在结果里按 4 位小数存档，乘上 121.7 后本身就有约 1 分钟量级的舍入，容差取 0.02 日（≈29 分）
  ok('交运偏移 = 真太阳时修正 + 比例放大', Math.abs(civilOffset - expectOffset) < 0.02, `${civilOffset.toFixed(6)} vs ${expectOffset.toFixed(6)}`);
  eq('不传经度时标平太阳时', J.frame, '平太阳时');
}

// ── 九、四处可见：摘要 / 解读时间窗 / 大运表 / 面板 ────────────────────
{
  const r = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', trueSolar: false, dst: false, nowYear: 2026 });
  ok('摘要写明交运时刻', r.summary.includes(`交运 ${r.dayun.jiao.at}`), r.summary.split('\n').find((l) => l.includes('交运')) || '');
  ok('摘要写明三日折一年', r.summary.includes('三日折一年'), '');
  ok('摘要写明距哪个节令', r.summary.includes(`距${r.dayun.jiao.from.name}`), '');
  const iv = interpret(r, { question: '事业' });
  const tl = (iv.sections || []).find((s) => s.key === 'timeline');
  ok('解读「时间窗」写交运时刻', !!tl && tl.text.includes(`起运交运时刻 ${r.dayun.jiao.at}`), tl ? tl.text.slice(0, 60) : '缺时间窗节');
  ok('解读「时间窗」写每步同月同日换', !!tl && tl.text.includes('每步大运在同月同日同时刻换'), '');
  const table = (iv.tables || []).find((t) => t.key === 'dayun');
  ok('大运表有「交运」列', !!table && table.columns.includes('交运'), table ? table.columns.join('|') : '缺大运表');
  ok('大运表首行交运日期 = 首个 fromDate', !!table && table.rows[0][2] === r.dayun.list[0].fromDate, table ? String(table.rows[0][2]) : '');
  const sandbox = { window: {}, console };
  vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
  const html = sandbox.window.__PP.baziHTML(r);
  ok('面板曲线头写交运', html.includes(`交运 ${r.dayun.jiao.at}`), '');
  ok('面板大运 chip 的 title 带交运日期', html.includes(`${r.dayun.list[0].fromDate} 交运；`), '');
  ok('面板页脚写交运与口径', html.includes(`交运 ${r.dayun.jiao.at}，${r.dayun.jiao.frame}`), '');
}

// ── 十、旧结果兼容：没有 dayun.jiao 时不炸、也不硬凑文案 ────────────────
{
  const r = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', trueSolar: false, dst: false, nowYear: 2026 });
  const sumOld = r.summary;
  const old = JSON.parse(JSON.stringify(r));
  delete old.dayun.jiao;
  // baziText 在 compute 内部调用，这里直接对「去掉 jiao 的结果」重新出一份摘要做对照
  const textOld = (() => {
    const copy = { ...r };
    copy.dayun = { ...r.dayun };
    delete copy.dayun.jiao;
    return interpret(copy, {}).sections.find((s) => s.key === 'timeline').text;
  })();
  ok('旧结果：时间窗不写交运时刻', !textOld.includes('起运交运时刻'), textOld.slice(0, 40));
  ok('旧结果：时间窗其余内容照旧', textOld.includes('当前大运：'), '');
  const sandbox = { window: {}, console };
  vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
  const copy = { ...r, dayun: { ...r.dayun } };
  delete copy.dayun.jiao;
  const htmlOld = sandbox.window.__PP.baziHTML(copy);
  ok('旧结果：面板照常渲染', htmlOld.length > 1000 && htmlOld.includes('人生运势曲线'), String(htmlOld.length));
  ok('旧结果：面板不写交运', !htmlOld.includes('交运 19') && !htmlOld.includes('交运 20'), '');
  ok('新摘要确实写了交运（对照项）', sumOld.includes('交运'), '');
}

// ── 十一、确定性：同一入参两次结果一致，且不受 nowYear 影响 ─────────────
{
  const a = buildBazi({ ...SAMPLE, gender: 'male', trueSolar: false, dst: false, nowYear: 2026 });
  const b = buildBazi({ ...SAMPLE, gender: 'male', trueSolar: false, dst: false, nowYear: 2031 });
  eq('交运时刻与 nowYear 无关', a.dayun.jiao.at, b.dayun.jiao.at);
  eq('交运 jd 与 nowYear 无关', a.dayun.jiao.jd, b.dayun.jiao.jd);
  eq('每步日期与 nowYear 无关', a.dayun.list.map((d) => d.fromDate).join(','), b.dayun.list.map((d) => d.fromDate).join(','));
}
