// 人元司权分日：按「节」到出生日的日差定当权藏干。
// 三件事要钉住：① 30 日表自身自洽（连续、合计 30、末段是本气）；
// ② 日差与边界（节当日第 1 日、段尾/段首、第 31 日起按本气且标 beyond）；
// ③ 不改取格——格局层拿到的输入里没有人元，删掉结果字段后复算仍一致。
import { compute } from '../engine/index.js';
import { buildBazi, RENYUAN_TABLE, renyuanOf, HIDDEN_STEMS, STEM_ELEMENT } from '../engine/bazi.js';
import { analyzeBaziFrame } from '../engine/geju.js';
import { classicOf } from '../engine/classics.js';
import { KNOWLEDGE } from '../engine/interpret-knowledge.js';
import { ok, eq } from './_harness.mjs';

const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const abs = /一定|必然|注定|百分百/;
const B = (datetime, extra = {}) => compute({ system: 'bazi', datetime, gender: 'male', trueSolar: false, ...extra });
const sec = (r, key) => ((r.interpret && r.interpret.sections) || []).find((s) => s.key === key) || null;

// ── ① 表结构：12 个月、每段连续、合计 30、末段等于藏干本气 ──────────────
eq('表覆盖十二支', Object.keys(RENYUAN_TABLE).sort().join(''), [...BRANCHES].sort().join(''));
for (const b of BRANCHES) {
  const segs = RENYUAN_TABLE[b];
  const sum = segs.reduce((n, [, d]) => n + d, 0);
  const froms = renyuanOf(b, 1, 0).segments;
  ok(`${b}月：合计 30 日`, sum === 30, String(sum));
  ok(`${b}月：段首尾相接、从第 1 日起`,
    froms[0].from === 1 && froms[froms.length - 1].to === 30
    && froms.every((s, i) => i === 0 || s.from === froms[i - 1].to + 1),
    froms.map((s) => `${s.stem}${s.from}-${s.to}`).join(' '));
  ok(`${b}月：每段五行与天干一致`, froms.every((s) => s.element === STEM_ELEMENT[s.stem]));
  ok(`${b}月：末段是本气`, froms[froms.length - 1].stem === HIDDEN_STEMS[b][0],
    `${froms[froms.length - 1].stem} vs ${HIDDEN_STEMS[b][0]}`);
  ok(`${b}月：段数在 2–3 之间`, segs.length >= 2 && segs.length <= 3, String(segs.length));
  ok(`${b}月：天干都是十干之一`, segs.every(([s]) => STEM_ELEMENT[s]));
}

// 司权表比本柱藏干表宽：子/卯/午/酉/亥的余气或中气不在藏干表里，两表各照原样
const outside = [];
for (const b of BRANCHES) {
  for (const s of renyuanOf(b, 1, 0).segments) {
    if (!HIDDEN_STEMS[b].includes(s.stem)) outside.push(`${b}${s.stem}`);
  }
}
eq('司权表里不在藏干表的干恰好五处', outside.join(','), '子壬,卯甲,午丙,酉庚,亥戊');
for (const b of BRANCHES) {
  const segs = renyuanOf(b, 1, 0).segments;
  ok(`${b}月：只有末段必在藏干表内`, HIDDEN_STEMS[b].includes(segs[segs.length - 1].stem));
}

// ── ② 边界：段首、段尾、跨段、第 31 日、日数下限 ─────────────────────
const T = 2450000.4; // 任取一个「节」时刻
const D = (n) => 2450000 + n - 1; // 第 n 日（节当日为第 1 日）
for (const b of BRANCHES) {
  const r1 = renyuanOf(b, D(1), T);
  eq(`${b}月第 1 日取首段`, r1.active, RENYUAN_TABLE[b][0][0]);
  eq(`${b}月第 1 日 from=1`, r1.segment.from, 1);
  for (const s of RENYUAN_TABLE[b]) {
    const at = renyuanOf(b, D(renyuanOf(b, 1, 0).segments.find((x) => x.stem === s[0]).from), T);
    eq(`${b}月 ${s[0]} 段首当权`, at.active, s[0]);
    const seg = renyuanOf(b, 1, 0).segments.find((x) => x.stem === s[0]);
    const end = renyuanOf(b, D(seg.to), T);
    eq(`${b}月 ${s[0]} 段尾仍当权`, end.active, s[0]);
    if (seg.to < 30) {
      const next = renyuanOf(b, D(seg.to + 1), T);
      ok(`${b}月 ${s[0]} 段尾次日换段`, next.active !== s[0], next.active);
    }
  }
  const d31 = renyuanOf(b, D(31), T);
  eq(`${b}月第 31 日按本气`, d31.active, HIDDEN_STEMS[b][0]);
  ok(`${b}月第 31 日标 beyond`, d31.beyond === true);
  eq(`${b}月第 31 日无 next`, d31.next, null);
  const d0 = renyuanOf(b, 2449999, T);
  eq(`${b}月日数下限钳到 1`, d0.day, 1);
}

// ── ③ 十二个月的真实盘：从 r.jieqi.previous.time 独立复算日差 ──────────
const jdnDay = (y, m, d) => Math.floor(Date.UTC(y, m - 1, d) / 86400000);
const daysSince = (birth, termTime) => {
  const [ty, tm, td] = termTime.slice(0, 10).split('-').map(Number);
  const [by, bm, bd] = birth;
  return jdnDay(by, bm, bd) - jdnDay(ty, tm, td) + 1;
};
const MONTH_CASES = [
  [1, 15, '丑'], [2, 15, '寅'], [3, 15, '卯'], [4, 15, '辰'],
  [5, 15, '巳'], [6, 15, '午'], [7, 15, '未'], [8, 15, '申'],
  [9, 15, '酉'], [10, 15, '戌'], [11, 15, '亥'], [12, 15, '子'],
];
for (const [m, d, branch] of MONTH_CASES) {
  const r = B(`1990-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}T12:00`, { withInterpret: true });
  const want = daysSince([1990, m, d], r.jieqi.previous.time);
  eq(`1990-${m}-15 月支`, r.renyuan.month, branch);
  eq(`1990-${m}-15 日差独立复算`, r.renyuan.day, want);
  eq(`1990-${m}-15 与月柱同支`, r.renyuan.month, r.pillars.month.branch);
  const seg = r.renyuan.segment;
  ok(`1990-${m}-15 当权落在段内`, r.renyuan.day >= seg.from && r.renyuan.day <= seg.to,
    `${r.renyuan.day} in ${seg.from}-${seg.to}`);
  ok(`1990-${m}-15 当权是段内那一干`,
    r.renyuan.segments.find((s) => s.from === seg.from).stem === r.renyuan.active);
  ok(`1990-${m}-15 解析带人元节`, !!sec(r, 'renyuan') && sec(r, 'renyuan').text.includes('不改取格'));
}

// ── ④ 已知盘：立夏后第 7 日（巳月庚金司权） ─────────────────────────
const A = B('1990-05-12T14:30', { withInterpret: true });
eq('巳月盘：日差 7', A.renyuan.day, 7);
eq('巳月盘：庚金当权', A.renyuan.active, '庚');
eq('巳月盘：当权五行', A.renyuan.activeElement, '金');
eq('巳月盘：段 6–14', `${A.renyuan.segment.from}-${A.renyuan.segment.to}`, '6-14');
eq('巳月盘：起算节令', A.renyuan.term.name, '立夏');
eq('巳月盘：下一干丙 15 日起', `${A.renyuan.next.stem}${A.renyuan.next.from}`, '丙15');
eq('巳月盘：尚有 8 日', A.renyuan.next.inDays, 8);
ok('巳月盘：庚在本柱藏干内', A.renyuan.inHidden === true);
ok('巳月盘：摘要有人元行', A.summary.includes('人元：巳月第7日'), A.summary.split('\n').find((l) => l.includes('人元')) || '');
ok('巳月盘：摘要列三段', A.summary.includes('戊1–5 庚6–14 丙15–30'));
ok('巳月盘：摘要无绝对化', !abs.test(A.summary));

const asec = sec(A, 'renyuan');
ok('解析：节名叫人元司权', asec && asec.label === '人元司权');
ok('解析：写明从立夏起算', asec.text.includes('从立夏起算'));
ok('解析：写明 30 日表与异说', asec.text.includes('30 日表') && asec.text.includes('7/7/16') && asec.text.includes('9/3/18'));
ok('解析：明说不改取格', asec.text.includes('不改取格') && asec.text.includes('透干') && asec.text.includes('会支'));
ok('解析：写法无绝对化', !abs.test(asec.text));
const keys = A.interpret.sections.map((s) => s.key);
ok('解析：人元节排在月令之后、时间窗之前',
  keys.indexOf('renyuan') > keys.indexOf('reasoning') && keys.indexOf('renyuan') < keys.indexOf('timeline'),
  keys.join(','));

// ── ⑤ 两处口径提示：亥月戊不在藏干表、第 31 日超出 30 日表 ─────────────
const H = B('1990-11-08T12:00', { withInterpret: true });
eq('亥月初一：戊土当权', H.renyuan.active, '戊');
eq('亥月初一：日差 1', H.renyuan.day, 1);
ok('亥月戊：标不在藏干表内', H.renyuan.inHidden === false);
ok('亥月盘：解析点明两表口径不同',
  sec(H, 'renyuan').text.includes('不在本柱藏干表中') && sec(H, 'renyuan').text.includes('不互相改写'));

const O = B('2023-06-05T12:00', { withInterpret: true });
eq('巳月第 31 日：仍按本气丙', O.renyuan.active, '丙');
eq('巳月第 31 日：日差 31', O.renyuan.day, 31);
ok('巳月第 31 日：标 beyond', O.renyuan.beyond === true);
ok('超出表盘：摘要点明按本气', O.summary.includes('已过 30 日表'));
ok('超出表盘：解析点明不硬分摊', sec(O, 'renyuan').text.includes('不硬分摊'));

// ── ⑥ 节令边界：立春前属丑月第 30 日，立春后属寅月第 1 日 ────────────
// 2024 立春 02-04 16:27（北京时间）；关真太阳时以钉住钟面
const before = B('2024-02-04T16:00');
const after = B('2024-02-04T16:30');
eq('立春前月支丑', before.renyuan.month, '丑');
eq('立春前是丑月第 30 日', before.renyuan.day, 30);
eq('立春前当权己土', before.renyuan.active, '己');
eq('立春后月支寅', after.renyuan.month, '寅');
eq('立春当日是寅月第 1 日', after.renyuan.day, 1);
eq('立春后当权戊土', after.renyuan.active, '戊');
ok('立春后日差与节令时间同源', after.renyuan.term.name === '立春' && after.renyuan.term.time.startsWith('2024-02-04'));

// ── ⑦ 不改取格：格局层的输入里没有人元，删掉字段复算仍一致 ────────────
const frameAgain = analyzeBaziFrame({
  pillars: A.pillars, dayStem: A.dayMaster.stem, monthBranch: A.pillars.month.branch,
  strength: A.strength, wuxing: A.wuxing,
});
eq('格局复算与结果一致', JSON.stringify(frameAgain), JSON.stringify(A.frame));
ok('格局证据不引用人元', !/人元|司权/.test(JSON.stringify(A.frame)));
ok('旺衰依据不引用人元', !/人元|司权/.test(JSON.stringify(A.strength)));
const stripped = JSON.parse(JSON.stringify(A));
delete stripped.renyuan;
const strippedAgain = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', trueSolar: false });
eq('同一输入两次结果一致', JSON.stringify(strippedAgain.renyuan), JSON.stringify(A.renyuan));
ok('删掉字段不影响格局', stripped.frame.primary.name === A.frame.primary.name && stripped.frame.yongshen.favor.join('') === A.frame.yongshen.favor.join(''));

// ── ⑧ 知识卡：仍标 variant，写清 30 日表与不改取格 ───────────────────
const card = KNOWLEDGE.find((k) => k.id === 'bazi-yueling-siquan');
ok('知识卡仍登记', !!card);
eq('知识卡状态不变', card.status, 'variant');
ok('知识卡写明 30 日表', card.note.includes('30 日表'));
ok('知识卡写明不改取格', card.detail.includes('不改取格') || card.detail.includes('不随轮值改判'));
ok('知识卡写明第 31 日口径', card.note.includes('第 31 日'));
ok('知识卡无绝对化', !abs.test(card.detail + card.note));

// ── ⑨ 古籍原文：三命通会此本日数不同，原文并列、不改判 ──────────────────
const ryc = classicOf('smt-renyuan');
ok('三命通会人元条已登记', !!ryc && ryc.book === 'sanming' && ryc.chapter === '卷二·论人元司事');
ok('原文照录、不带省略号', !!ryc && ryc.quote.length >= 12 && !ryc.quote.includes('…') && !ryc.quote.includes('...'));
ok('此本寅月作 5/5/20（本插件通行表 7/7/16）',
  ryc.quote.includes('艮土用事五日') && ryc.quote.includes('甲木二十日') && RENYUAN_TABLE.寅.map(([, d]) => d).join('/') === '7/7/16');
ok('此本卯月作 7/23（本插件通行表 10/20）',
  ryc.quote.includes('甲木用事七日') && ryc.quote.includes('乙木二十三日') && RENYUAN_TABLE.卯.map(([, d]) => d).join('/') === '10/20');
ok('白话点明两表不是同一套分法', ryc.plain.includes('不是同一套分法') && ryc.plain.includes('不改取格'));
ok('结果挂 renyuanClassic', A.renyuanClassic && A.renyuanClassic.id === 'smt-renyuan' && A.renyuanClassic.bookName === '三命通会');
ok('摘要人元行带原文出处', A.summary.includes('原文见《三命通会·卷二·论人元司事》'));
ok('解析人元节附原文与白话', asec.text.includes('《三命通会·卷二·论人元司事》') && asec.text.includes(ryc.quote) && asec.text.includes('白话：'));
ok('解析人元节点明 5/5/20', asec.text.includes('5/5/20'));
ok('人元条不进五条取条表', A.classics.every((e) => e.id !== 'smt-renyuan'));
ok('知识卡出处带典藏网 7529', card.source.includes('7529') && card.note.includes('5/5/20'));
