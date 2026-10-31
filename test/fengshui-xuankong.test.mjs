// 玄空飞星（下卦）：三元九运、三元龙阴阳、挨星顺逆、九宫盘、当运星、合十、表法旺山旺向
import { compute } from '../engine/index.js';
import { buildFengshui, periodOfYear, MOUNTAIN_META } from '../engine/fengshui.js';

let pass = 0; let fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log(`PASS  ${label}`); } else { fail++; console.log(`FAIL  ${label} -> ${detail === undefined ? '' : JSON.stringify(detail)}`); }
};
const eq = (label, a, b) => ok(label, a === b, `${JSON.stringify(a)} vs ${JSON.stringify(b)}`);
const throwsMsg = (label, fn, part) => {
  try { fn(); ok(label, false, '没有抛错'); } catch (e) { ok(label, String(e && e.message).includes(part), e && e.message); }
};
const throwsCode = (label, fn, code) => {
  try { fn(); ok(label, false, '没有抛错'); } catch (e) { ok(label, e && e.code === code, e && e.code); }
};

// ── 三元九运：1864 起一运，每运 20 年，九运一轮 ────────────────
const PERIODS = [
  [1863, 9, 1844], [1864, 1, 1864], [1883, 1, 1864], [1884, 2, 1884],
  [1963, 5, 1944], [1983, 6, 1964], [2003, 7, 1984], [2004, 8, 2004],
  [2023, 8, 2004], [2024, 9, 2024], [2043, 9, 2024], [2044, 1, 2044],
];
for (const [y, p, start] of PERIODS) {
  const info = periodOfYear(y);
  eq(`${y} 年 → ${p} 运`, info.period, p);
  eq(`${y} 年运起点`, info.start, start);
}
eq('2026 运标签', periodOfYear(2026).label, '9运（2024–2043）');
eq('2043 运终点', periodOfYear(2043).end, 2043);

// ── 24 山三元龙阴阳（通行表） ──────────────────────────────────
const SANYUAN = {
  壬: '地元阳', 子: '天元阴', 癸: '人元阴',
  丑: '地元阴', 艮: '天元阳', 寅: '人元阳',
  甲: '地元阳', 卯: '天元阴', 乙: '人元阴',
  辰: '地元阴', 巽: '天元阳', 巳: '人元阳',
  丙: '地元阳', 午: '天元阴', 丁: '人元阴',
  未: '地元阴', 坤: '天元阳', 申: '人元阳',
  庚: '地元阳', 酉: '天元阴', 辛: '人元阴',
  戌: '地元阴', 乾: '天元阳', 亥: '人元阳',
};
for (const [m, want] of Object.entries(SANYUAN)) {
  const meta = MOUNTAIN_META[m];
  eq(`三元龙 ${m} = ${want}`, meta ? `${meta.yuan}${meta.yinYang}` : '缺失', want);
}

// ── 九宫盘：运/山/向 ─────────────────────────────────────────
const chartOf = (r) => Object.fromEntries(r.palaces.map((x) => [x.palace, [x.yun, x.shan, x.xiang]]));
const eqChart = (label, r, want) => {
  const got = chartOf(r);
  const bad = Object.keys(want).filter((k) => JSON.stringify(got[k]) !== JSON.stringify(want[k]));
  ok(label, bad.length === 0, bad.map((k) => `${k} ${JSON.stringify(got[k])}≠${JSON.stringify(want[k])}`).join('; '));
};
const build = (period, sitting, facing) => buildFengshui({ action: 'xuankong', period, sitting, facing });

// 以下七局含通行旺山旺向、双星会向/会坐与五黄入中，用公开盘面数字作锚点
eqChart('8运 乾山巽向', build(8, '乾', '巽'), {
  巽: [7, 1, 8], 离: [3, 5, 3], 坤: [5, 3, 1], 震: [6, 2, 9], 中: [8, 9, 7], 兑: [1, 7, 5], 艮: [2, 6, 4], 坎: [4, 4, 2], 乾: [9, 8, 6],
});
eqChart('8运 子山午向（双星会向）', build(8, '子', '午'), {
  巽: [7, 3, 4], 离: [3, 8, 8], 坤: [5, 1, 6], 震: [6, 2, 5], 中: [8, 4, 3], 兑: [1, 6, 1], 艮: [2, 7, 9], 坎: [4, 9, 7], 乾: [9, 5, 2],
});
eqChart('8运 卯山酉向（双星会向）', build(8, '卯', '酉'), {
  巽: [7, 5, 2], 离: [3, 1, 6], 坤: [5, 3, 4], 震: [6, 4, 3], 中: [8, 6, 1], 兑: [1, 8, 8], 艮: [2, 9, 7], 坎: [4, 2, 5], 乾: [9, 7, 9],
});
eqChart('8运 丑山未向（五黄入中）', build(8, '丑', '未'), {
  巽: [7, 3, 6], 离: [3, 7, 1], 坤: [5, 5, 8], 震: [6, 4, 7], 中: [8, 2, 5], 兑: [1, 9, 3], 艮: [2, 8, 2], 坎: [4, 6, 9], 乾: [9, 1, 4],
});
eqChart('9运 未山丑向', build(9, '未', '丑'), {
  巽: [8, 7, 2], 离: [4, 2, 7], 坤: [6, 9, 9], 震: [7, 8, 1], 中: [9, 6, 3], 兑: [2, 4, 5], 艮: [3, 3, 6], 坎: [5, 1, 8], 乾: [1, 5, 4],
});
eqChart('9运 子山午向（五黄入中）', build(9, '子', '午'), {
  巽: [8, 6, 3], 离: [4, 1, 8], 坤: [6, 8, 1], 震: [7, 7, 2], 中: [9, 5, 4], 兑: [2, 3, 6], 艮: [3, 2, 7], 坎: [5, 9, 9], 乾: [1, 4, 5],
});
eqChart('5运 子山午向', build(5, '子', '午'), {
  巽: [4, 2, 1], 离: [9, 6, 5], 坤: [2, 4, 3], 震: [3, 3, 2], 中: [5, 1, 9], 兑: [7, 8, 7], 艮: [8, 7, 6], 坎: [1, 5, 4], 乾: [6, 9, 8],
});

// ── 盘面旺山旺向 ↔ 通行表：两套独立数据必须逐运吻合 ─────────────
const PAIRS = [['乾', '巽'], ['亥', '巳'], ['丑', '未'], ['卯', '酉'], ['乙', '辛'], ['辰', '戌'], ['艮', '坤'], ['寅', '申'], ['甲', '庚'], ['子', '午'], ['癸', '丁'], ['壬', '丙']];
const TABLE = {
  1: [],
  2: [['乾', '巽'], ['亥', '巳'], ['丑', '未']],
  3: [['卯', '酉'], ['乙', '辛'], ['辰', '戌']],
  4: [['艮', '坤'], ['寅', '申'], ['甲', '庚']],
  5: [['子', '午'], ['癸', '丁'], ['卯', '酉'], ['乙', '辛'], ['丑', '未'], ['辰', '戌']],
  6: [['艮', '坤'], ['寅', '申'], ['甲', '庚']],
  7: [['卯', '酉'], ['乙', '辛'], ['辰', '戌']],
  8: [['乾', '巽'], ['亥', '巳'], ['丑', '未']],
  9: [],
};
const key = (a, b) => [a, b].sort().join('');
for (let p = 1; p <= 9; p++) {
  const want = new Set(TABLE[p].map(([a, b]) => key(a, b)));
  const bad = [];
  for (const [a, b] of PAIRS) {
    const r = build(p, a, b);
    if (r.wangShanWangXiang.byChart !== want.has(key(a, b))) bad.push(`${a}${b}=${r.wangShanWangXiang.byChart}`);
  }
  ok(`${p}运 盘面旺山旺向与通行表一致`, bad.length === 0, bad);
}

// ── 每运 12 局：运盘/山盘/向盘都是 1–9 的排列，九宫齐全 ─────────
for (let p = 1; p <= 9; p++) {
  const bad = [];
  for (const [a, b] of PAIRS) {
    const r = build(p, a, b);
    const sorted = (k) => r.palaces.map((x) => x[k]).sort().join('');
    if (r.palaces.length !== 9 || sorted('yun') !== '123456789' || sorted('shan') !== '123456789' || sorted('xiang') !== '123456789') bad.push(`${a}${b}`);
  }
  ok(`${p}运 12 局三盘均为 1–9 排列`, bad.length === 0, bad);
}

// ── 当运星、表法、合十 ─────────────────────────────────────────
const r8 = build(8, '乾', '巽');
ok('8运 乾巽 盘面到山到向', r8.wangShanWangXiang.byChart === true, r8.wangShanWangXiang);
ok('8运 乾巽 在表法内', r8.wangShanWangXiang.byTable === true, r8.wangShanWangXiang);
eq('8运 乾巽 山星八到乾', r8.dangYun.shan.palaces.join(''), '乾');
eq('8运 乾巽 向星八到巽', r8.dangYun.xiang.palaces.join(''), '巽');
eq('8运 子午 不在表法内', build(8, '子', '午').wangShanWangXiang.byTable, false);
eq('8运 子午 盘面双星会向', build(8, '子', '午').palaces.find((x) => x.palace === '离').xiang, 8);
eq('9运 乾巽 不在表法内', build(9, '乾', '巽').wangShanWangXiang.byTable, false);
eq('9运 乾巽 盘面未到山到向', build(9, '乾', '巽').wangShanWangXiang.byChart, false);
eq('5运 子午 盘面到山到向', build(5, '子', '午').wangShanWangXiang.byChart, true);
ok('表法一运/九运为空', build(1, '子', '午').wangShanWangXiang.table.length === 0 && build(9, '子', '午').wangShanWangXiang.table.length === 0, null);
for (const r of [r8, build(8, '子', '午'), build(5, '子', '午'), build(9, '未', '丑')]) {
  const ys = Object.fromEntries(r.palaces.map((x) => [x.palace, x.yun]));
  const ss = Object.fromEntries(r.palaces.map((x) => [x.palace, x.shan]));
  const xs = Object.fromEntries(r.palaces.map((x) => [x.palace, x.xiang]));
  ok('合十判据逐宫可复算', r.heshi.shan.every((p) => ss[p] + ys[p] === 10) && r.heshi.xiang.every((p) => xs[p] + ys[p] === 10), { shan: r.heshi.shan, xiang: r.heshi.xiang });
}

// ── 入中与顺逆：运星本宫同元龙定阴阳，五黄用本山阴阳 ─────────────
const r8c = build(8, '乾', '巽');
ok('8运 乾巽 山盘九入中逆飞', r8c.meta.shanCenter.star === 9 && r8c.meta.shanCenter.fly === '逆飞', r8c.meta.shanCenter);
ok('8运 乾巽 向盘七入中逆飞', r8c.meta.xiangCenter.star === 7 && r8c.meta.xiangCenter.fly === '逆飞', r8c.meta.xiangCenter);
ok('8运 乾巽 逆飞依据含离宫午', r8c.meta.shanCenter.basis.includes('离') && r8c.meta.shanCenter.basis.includes('午'), r8c.meta.shanCenter.basis);
const r8z = build(8, '子', '午');
ok('8运 子午 山盘四入中顺飞', r8z.meta.shanCenter.star === 4 && r8z.meta.shanCenter.fly === '顺飞', r8z.meta.shanCenter);
const r8w = build(8, '丑', '未');
ok('8运 丑未 五黄入中按本山阴阳', r8w.meta.xiangCenter.star === 5 && r8w.meta.xiangCenter.basis.includes('五黄入中'), r8w.meta.xiangCenter);

// ── 坐向互通、全组合确定性 ─────────────────────────────────────
const bySit = build(8, '子', '午');
const byFace = buildFengshui({ action: 'xuankong', period: 8, facing: '午' });
eq('只报向等同报坐向（盘面）', JSON.stringify(bySit.palaces), JSON.stringify(byFace.palaces));
eq('只报向等同报坐向（坐山）', byFace.meta.sitting, bySit.meta.sitting);
let det = true; let detBad = '';
for (let p = 1; p <= 9 && det; p++) {
  for (const { m } of Object.values(MOUNTAIN_META)) {
    const a = build(p, m, null);
    const b = build(p, m, null);
    if (JSON.stringify(a) !== JSON.stringify(b)) { det = false; detBad = `${p}运 ${m}`; break; }
  }
}
ok('9 运 × 24 山 = 216 局确定性', det, detBad);

// ── 运的来源：显式 period > fortuneYear > 默认九运 ──────────────
const py = buildFengshui({ action: 'xuankong', sitting: '子', facing: '午', fortuneYear: 2026 });
eq('fortuneYear 2026 → 9 运', py.meta.period, 9);
eq('fortuneYear 2026 标签', py.meta.periodLabel, '9运（2024–2043）');
eq('fortuneYear 2000 → 7 运', buildFengshui({ action: 'xuankong', sitting: '子', fortuneYear: 2000 }).meta.period, 7);
eq('显式 period 压过 fortuneYear', buildFengshui({ action: 'xuankong', sitting: '子', period: 8, fortuneYear: 2026 }).meta.period, 8);
const pd = buildFengshui({ action: 'xuankong', sitting: '子' });
eq('缺省运 = 9', pd.meta.period, 9);
ok('缺省运有提示', typeof pd.meta.note === 'string' && pd.meta.note.includes('未给运'), pd.meta.note);
ok('玄空 scope 声明含替卦与年月日时', pd.meta.scope.includes('兼向超 4.5° 按沈氏替卦') && pd.meta.scope.includes('年月日时紫白'), pd.meta.scope);
eq('玄空来源五条', pd.sources.length, 5);

// ── 输入边界 ───────────────────────────────────────────────────
throwsMsg('玄空缺坐向报错', () => buildFengshui({ action: 'xuankong' }), '缺少坐向');
throwsMsg('玄空坐向不自洽报错', () => buildFengshui({ action: 'xuankong', sitting: '子', facing: '子' }), '不自洽');
throwsMsg('玄空非 24 山报错', () => buildFengshui({ action: 'xuankong', sitting: '北' }), '24 山');
throwsMsg('玄空运越界报错', () => buildFengshui({ action: 'xuankong', sitting: '子', period: 10 }), '1–9');
throwsMsg('玄空运为 0 报错', () => buildFengshui({ action: 'xuankong', sitting: '子', period: 0 }), '1–9');
throwsMsg('玄空运非整数报错', () => buildFengshui({ action: 'xuankong', sitting: '子', period: 2.5 }), '1–9');
throwsMsg('玄空运为字符串报错', () => buildFengshui({ action: 'xuankong', sitting: '子', period: '9' }), '1–9');
throwsCode('玄空运非整数带 E_INPUT', () => buildFengshui({ action: 'xuankong', sitting: '子', period: 2.5 }), 'E_INPUT');
eq('period 为 null 仍按缺省九运', buildFengshui({ action: 'xuankong', sitting: '子', period: null }).meta.period, 9);

// ── compute 接线与文本 ─────────────────────────────────────────
const c = compute({ system: 'fengshui', action: 'xuankong', sitting: '乾', facing: '巽', period: 8 });
eq('compute 玄空 action', c.meta.action, 'xuankong');
for (const tag of ['【玄空】', '【九宫】', '【当运】', '【表法】', '【合十】']) {
  ok(`玄空 summary 含 ${tag}`, c.summary.includes(tag), c.summary);
}
ok('玄空 summary 八运乾巽 到山到向', c.summary.includes('到山到向'), c.summary);
ok('玄空 summary 九宫含中宫盘', c.summary.includes('中8/9/7'), c.summary);
const c9 = compute({ system: 'fengshui', action: 'xuankong', sitting: '子', fortuneYear: 2026 });
ok('compute 玄空 fortuneYear 标签', c9.summary.includes('9运（2024–2043）'), c9.summary);

console.log(`\n${pass} PASS / ${fail} FAIL`);
process.exit(fail ? 1 : 0);
