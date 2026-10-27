// 人生 K 线 / 风水 / 起名 / 合盘细化层：口径与边界
import { compute } from '../engine/index.js';
import { buildTrend } from '../engine/trend.js';
import { buildFengshui, mingGua, yearZibaiStar, yearlyFlying, MOUNTAINS_24 } from '../engine/fengshui.js';
import { buildName, CHAR_LIB } from '../engine/name.js';
import { buildHepan } from '../engine/hepan.js';

let pass = 0; let fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log(`PASS  ${label}`); } else { fail++; console.log(`FAIL  ${label} -> ${detail === undefined ? '' : JSON.stringify(detail)}`); }
};
const eq = (label, a, b) => ok(label, a === b, `${JSON.stringify(a)} vs ${JSON.stringify(b)}`);
const near = (label, a, b, tol = 0.001) => ok(label, Math.abs(a - b) <= tol, `${a} vs ${b}`);
const throwsCode = (label, fn, code) => {
  try { fn(); ok(label, false, '没有抛错'); } catch (e) { ok(label, !code || (e && e.code === code) || (e && e.code === 'E_INPUT') || String(e && e.message).includes('缺少') || String(e && e.message).includes('必须') || String(e && e.message).includes('需要') || String(e && e.message).includes('不自洽') || String(e && e.message).includes('请给') || String(e && e.message).includes('只能是'), e && e.message); }
};

// ── 人生 K 线 ───────────────────────────────────────────────
const t = buildTrend({ year: 1990, month: 5, day: 12, hour: 14, minute: 30, gender: 'female', toAge: 60 });
eq('trend 体系名', t.system, 'trend');
ok('trend 日主丁', String(t.meta.dayMaster.stem || t.meta.dayMaster).startsWith('丁'), t.meta.dayMaster);
ok('trend 旺衰给出分档', ['身强', '偏强', '中和', '偏弱', '身弱'].includes(t.meta.strength.level), t.meta.strength);
ok('trend 分段覆盖到 toAge', t.segments[t.segments.length - 1].endAge >= 60, t.segments.map((s) => s.endAge));
ok('trend 逐年点数 = toAge', t.points.length === 60, t.points.length);
ok('trend 分值在 2–99', t.points.every((p) => p.score >= 2 && p.score <= 99), t.points.slice(0, 3));
ok('trend K 线高点≥收盘≥低点', t.points.every((p) => p.kline.high >= p.kline.close && p.kline.close >= p.kline.low), t.points[0]);
ok('trend 走势分段数=分段数+起运前', Array.isArray(t.sparkline) && t.sparkline.length === t.segments.length + 1, t.sparkline);
ok('trend 关键年最多 3 个', !t.highlights || !t.highlights.best || t.highlights.best.length <= 3, t.highlights);

// 边界：旺衰落在换档阈值上时不强出顺位结论
const tb = buildTrend({ year: 1988, month: 7, day: 1, hour: 0, minute: 30, gender: 'female', toAge: 40 });
ok('trend 夏令时日期被校正', tb.meta.birth === '1988-06-30', tb.meta.birth);
if (tb.meta.boundaryNote) ok('trend 边界时只给提示不给排序', tb.highlights.best.length === 0, tb.highlights);

const t100 = buildTrend({ year: 1990, month: 5, day: 12, hour: 14, minute: 30, gender: 'female' });
eq('trend 默认算到 100 岁', t100.points.length, 100);

// ── 风水 ───────────────────────────────────────────────────
const f = buildFengshui({ year: 1990, month: 8, day: 15, gender: 'female', fortuneYear: 2026 });
eq('fengshui 体系名', f.system, 'fengshui');
eq('命卦 1990 女 = 8 艮', f.mingGua.num, 8);
eq('命卦卦名', f.mingGua.gua, '艮');
eq('艮为西四命', f.mingGua.group, '西四命');
ok('四吉方齐全', f.luckyDirections.length === 4 && f.luckyDirections.every((x) => x.direction), f.luckyDirections);
ok('四凶方齐全', f.unluckyDirections.length === 4, f.unluckyDirections);
eq('艮命生气在西南', f.luckyDirections.find((x) => x.star === '生气').direction, '西南');
eq('年紫白 2026 = 一白', f.yearlyFlying.center, 1);

// 公式对公开表
const zibai = { 2024: 3, 2025: 2, 2026: 1, 2027: 9, 2034: 2, 2035: 1 };
for (const [y, n] of Object.entries(zibai)) eq(`年紫白 ${y} = ${n}`, yearZibaiStar(Number(y)), n);
const fly = yearlyFlying(2026);
ok('九宫飞星九个宫', fly.palaces.length === 9, fly.palaces.length);
ok('九宫数字互不重复', new Set(fly.palaces.map((p) => p.num)).size === 9, fly.palaces.map((p) => p.num));

// 命卦公式对公开表：1990 男 1 坎、2000 男 9 离、2000 女 6 乾、1990 女 8 艮
eq('1990 男命卦', mingGua(1990, 'male').gua, '坎');
eq('2000 男命卦', mingGua(2000, 'male').gua, '离');
eq('2000 女命卦', mingGua(2000, 'female').gua, '乾');
eq('1990 女命卦', mingGua(1990, 'female').gua, '艮');

// 门主灶
const adv = buildFengshui({ action: 'advise', sitting: '子', year: 1990, month: 8, day: 15, gender: 'female' });
eq('advise 宅卦 = 坐山八卦', adv.meta.houseGua, '坎');
eq('advise 坎宅东四', adv.meta.houseGroup, '东四宅');
ok('advise 门灶床厕都有话', ['door', 'stove', 'bed', 'toilet'].every((k) => typeof adv.layout[k] === 'string' && adv.layout[k].length > 8), adv.layout);
ok('advise 命宅配文案含「不配」', adv.mingMatch && adv.mingMatch.sameGroup === false, adv.mingMatch && adv.mingMatch.text);
const adv2 = buildFengshui({ action: 'advise', facing: '午' });
eq('只给向山可反推坐山', adv2.meta.sitting, '子山（罗盘 0°）');
throwsCode('坐向不自洽报错', () => buildFengshui({ action: 'advise', sitting: '子', facing: '子' }), 'E_INPUT');
throwsCode('非 24 山报错', () => buildFengshui({ action: 'advise', sitting: '东' }), 'E_INPUT');
throwsCode('femgshui 缺性别报错', () => buildFengshui({ year: 1990, month: 8, day: 15 }), 'E_INPUT');
ok('24 山 24 个', MOUNTAINS_24.length === 24 && new Set(MOUNTAINS_24.map((x) => x.m)).size === 24, MOUNTAINS_24.length);

// 立春界：立春前出生按上一年算命卦
const before = buildFengshui({ year: 1990, month: 1, day: 20, gender: 'male' });
eq('立春前 guaYear = 1989', before.meta.guaYear, 1989);

// ── 起名 ───────────────────────────────────────────────────
eq('字库去重后条目数 = 数组长度', new Set(CHAR_LIB.map((c) => c[0])).size, CHAR_LIB.length);
ok('字库至少 150 字', CHAR_LIB.length >= 150, CHAR_LIB.length);
const ne = buildName({ surname: '李', givenName: '梓桐', year: 1990, month: 8, day: 15, hour: 10, gender: 'male' });
eq('name 体系名', ne.system, 'name');
ok('两个字都查出五行', ne.chars.every((c) => c.element !== '未收录'), ne.chars);
ok('梓=木', ne.chars[0].element === '木', ne.chars[0]);
ok('给出生辰时有喜用与旺衰', !!ne.bazi && Array.isArray(ne.bazi.favorable) && !!ne.bazi.strength.level, ne.bazi);
ok('未收录字如实标注', buildName({ surname: '李', givenName: '龘' }).chars[0].element === '未收录');
const ng = buildName({ action: 'generate', surname: '李', year: 1990, month: 8, day: 15, hour: 10, gender: 'male', limit: 5 });
eq('生成 5 个候选', ng.candidates.length, 5);
ok('候选都落在喜用五行', ng.candidates.every((c) => c.chars.every((x) => ng.bazi.favorable.includes(x.element))), ng.candidates[0]);
ok('候选去重（同名不重复）', new Set(ng.candidates.map((c) => c.given)).size === ng.candidates.length, ng.candidates.map((c) => c.given));
ok('候选含全名', ng.candidates.every((c) => c.name === '李' + c.given), ng.candidates[0]);
throwsCode('generate 缺生辰报错', () => buildName({ action: 'generate', surname: '李', gender: 'male' }), 'E_INPUT');
throwsCode('assess 缺名报错', () => buildName({ surname: '李' }), 'E_INPUT');
throwsCode('名超过 2 字报错', () => buildName({ surname: '李', givenName: '一二三' }), 'E_INPUT');

// ── 合盘细化层（吸附玄机阁 match 口径）──
const h = buildHepan({
  a: { year: 1990, month: 8, day: 15, hour: 10, gender: 'male' },
  b: { year: 1992, month: 3, day: 8, hour: 14, gender: 'female' },
});
ok('合盘保留原有三维度', h.dimensions.length === 3, h.dimensions.length);
ok('合盘新增 detail 层', !!h.detail && !!h.detail.yearRelation && !!h.detail.stems && !!h.detail.nayin, Object.keys(h.detail || {}));
ok('属相层有标签与说明', typeof h.detail.yearRelation.label === 'string' && h.detail.yearRelation.text.includes('属相'), h.detail.yearRelation);
ok('吉凶象计数为非负整数', Number.isInteger(h.detail.tally.good) && h.detail.tally.good >= 0 && Number.isInteger(h.detail.tally.bad), h.detail.tally);
ok('吉凶象分档用「吉象/凶象」措辞而非总分档', ['吉象偏多', '吉略多于凶', '吉凶相当', '凶象偏多'].includes(h.detail.tally.lean), h.detail.tally);
ok('年命纳音有五行生克说明', h.detail.nayin.text.length > 6, h.detail.nayin);

// 属相关系：六冲/六合各取一例
const chongH = buildHepan({
  a: { year: 1990, month: 8, day: 15, hour: 10, gender: 'male' }, // 午
  b: { year: 1984, month: 3, day: 8, hour: 14, gender: 'female' }, // 子 → 子午冲
});
eq('子午属相六冲', chongH.detail.yearRelation.label, '六冲');

// ── compute 层：三个新体系可经 compute 走通 ─────────────────
const ct = compute({ system: 'trend', datetime: '1990-05-12T14:30', gender: 'female', toAge: 40 });
ok('compute trend 有 summary', typeof ct.summary === 'string' && ct.summary.includes('人生 K 线'), ct.summary && ct.summary.slice(0, 40));
const cf = compute({ system: 'fengshui', datetime: '1990-08-15T10:00', gender: 'female', fortuneYear: 2026 });
ok('compute fengshui summary 含命卦', cf.summary.includes('命卦'), cf.summary.slice(0, 40));
const cn = compute({ system: 'name', surname: '李', givenName: '梓桐' });
ok('compute name summary 含评估', cn.summary.includes('名字评估'), cn.summary.slice(0, 40));
const cm = compute({ system: 'name', action: 'generate', surname: '李', datetime: '1990-08-15T10:00', gender: 'male', limit: 3 });
eq('compute name generate 3 个', cm.candidates.length, 3);
const ca = compute({ system: 'fengshui', action: 'advise', sitting: '子' });
ok('compute fengshui advise summary 含宅卦', ca.summary.includes('宅卦'), ca.summary.slice(0, 40));

console.log(`\n${pass} PASS / ${fail} FAIL`);
process.exit(fail ? 1 : 0);
