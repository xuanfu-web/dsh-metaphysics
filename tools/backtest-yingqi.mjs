// 六爻应期对拍：拿《增删卜易》卦例检验 yingqi.js 的规则是否覆盖原文所记应验支。
//
// 三个指标分开算，不混：
//   ① 并集命中：实际应验支 ∈ 引擎给出的全部触发支
//   ② 主规则命中：实际应验支 ∈ 优先级最高那条规则给的支
//   ③ 逐规则：每条规则**单独**被触发时的命中率与平均支数
// 并集越大越容易命中，所以每个指标都配自己的随机基线（支数/12）与二项单尾 p 值——
// 只看百分比会把「多给几支所以更容易中」误读成「规则有效」。
//
// 用途边界（重要）：这份脚本只用来**报告**，不用来调规则。
// 若按这里的逐规则表现去改规则顺序或阈值，命中率就是自己喂出来的；
// 规则顺序只按原文条文的排列走（见 yingqi.js 的 RULE_ORDER 注释）。
//
// 用法：node tools/backtest-yingqi.mjs [--json]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildLiuyao } from '../engine/liuyao.js';
import { yingqiPredict } from '../engine/yingqi.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FIX = JSON.parse(fs.readFileSync(path.join(ROOT, 'test', 'fixtures', 'zengshan-cases.json'), 'utf8'));

// ── 二项单尾检验：命中数 ≥ k 的概率，用来判断「高于基线」是不是运气 ──
const LOGF = [0, 0];
const logFact = (x) => {
  for (let i = LOGF.length; i <= x; i++) LOGF[i] = LOGF[i - 1] + Math.log(i);
  return LOGF[x];
};
const binomTail = (n, k, p) => {
  if (k <= 0) return 1;
  if (p <= 0) return 0;
  if (p >= 1) return 1;
  let s = 0;
  for (let i = k; i <= n; i++) {
    s += Math.exp(logFact(n) - logFact(i) - logFact(n - i) + i * Math.log(p) + (n - i) * Math.log(1 - p));
  }
  return Math.min(1, s);
};

const rows = [];
for (const c of FIX.cases) {
  const built = buildLiuyao({
    lines: c.lines,
    dayGanZhi: { stem: c.day[0], branch: c.day[1] },
  });
  const line = built.ben.lines.find((l) => l.position === c.useGod.position);
  if (!line) { rows.push({ ...c, skip: '用神爻位不在卦中' }); continue; }
  const pred = yingqiPredict(built, { position: line.position, branch: line.branch, element: line.element, moving: line.moving }, { monthBranch: c.month });
  const set = new Set(pred.branches);
  const hitAny = c.actual.some((b) => set.has(b));
  const pri = pred.primary ? new Set(pred.primary.branches) : new Set();
  const hitPrimary = c.actual.some((b) => pri.has(b));
  rows.push({
    ...c,
    pred: pred.branches,
    primaryId: pred.primary ? pred.primary.id : null,
    primaryLabel: pred.primary ? pred.primary.label : '无',
    primaryBranches: pred.primary ? pred.primary.branches : [],
    ruleSets: pred.rules.map((r) => ({ id: r.id, label: r.label, branches: r.branches })),
    hitAny,
    hitPrimary,
    state: pred.state ? {
      kong: pred.state.kongHit, po: pred.state.monthPo, mu: pred.state.ruMu,
      moving: pred.state.moving, jt: pred.state.jinTui,
      taiWang: pred.state.taiWang, shuai: pred.state.shuaiJue, he: pred.state.heWith.length,
    } : null,
  });
}

const used = rows.filter((r) => !r.skip);
const n = used.length;
const hitAny = used.filter((r) => r.hitAny).length;
const hitPri = used.filter((r) => r.hitPrimary).length;
const avgSet = used.reduce((s, r) => s + r.pred.length, 0) / (n || 1);
const baseline = avgSet / 12;

// 主规则要按**它自己给的支数**算基线：主规则通常只给 2 支，拿 3.55 支的基线比会低估它
const expectPri = used.reduce((s, r) => s + (r.primaryBranches.length / 12), 0) / (n || 1);

// 逐规则：该规则被触发时，它自己的支集是否命中（与它是不是主规则无关）
const byRule = {};
for (const r of used) {
  for (const rs of r.ruleSets) {
    const tag = byRule[rs.id] || (byRule[rs.id] = { label: rs.label, n: 0, hit: 0, branches: 0 });
    tag.n++;
    tag.branches += rs.branches.length;
    const s = new Set(rs.branches);
    if (r.actual.some((b) => s.has(b))) tag.hit++;
  }
}
for (const v of Object.values(byRule)) {
  v.avgBranches = Number((v.branches / (v.n || 1)).toFixed(2));
  v.baseline = v.avgBranches / 12;
  v.rate = v.hit / (v.n || 1);
  v.lift = v.rate - v.baseline;
  v.p = binomTail(v.n, v.hit, v.baseline);
}

// 按主规则分组，看哪条常落空
const byPrimary = {};
for (const r of used) {
  const k = r.primaryId || 'none';
  byPrimary[k] = byPrimary[k] || { n: 0, hit: 0, hitAny: 0 };
  byPrimary[k].n++;
  if (r.hitPrimary) byPrimary[k].hit++;
  if (r.hitAny) byPrimary[k].hitAny++;
}

const pct = (x) => `${(x * 100).toFixed(1)}%`;
const pAny = binomTail(n, hitAny, baseline);
const pPri = binomTail(n, hitPri, expectPri);

const report = {
  meta: {
    fixture: 'test/fixtures/zengshan-cases.json',
    cases: n,
    skipped: rows.length - n,
    note: '原文自语自证，衡量的是「引擎触发支集合是否覆盖原文所记应验支」，不等于预测能力；逐规则表现只作报告，不据此调规则',
  },
  metrics: {
    并集命中: hitAny,
    并集命中率: pct(hitAny / (n || 1)),
    并集基线: pct(baseline),
    并集p值: Number(pAny.toFixed(4)),
    主规则命中: hitPri,
    主规则命中率: pct(hitPri / (n || 1)),
    主规则基线: pct(expectPri),
    主规则p值: Number(pPri.toFixed(4)),
    平均触发支数: Number(avgSet.toFixed(2)),
    随机基线: pct(baseline),
  },
  byRule: Object.fromEntries(Object.entries(byRule).map(([k, v]) => [k, { ...v, rate: pct(v.rate), baseline: pct(v.baseline), lift: Number(v.lift.toFixed(3)), p: Number(v.p.toFixed(4)) }])),
  byPrimary,
  rows: used.map((r) => ({
    date: `${r.month}月${r.day}日`,
    zhan: r.zhan,
    ben: r.ben,
    useGod: `${r.useGod.liuqin}${r.useGod.branch}(${r.useGod.position}爻)`,
    actual: r.actual.join(''),
    pred: r.pred.join(''),
    primary: r.primaryLabel,
    hit: r.hitAny ? '✓' : '✗',
    hitPrimary: r.hitPrimary ? '✓' : '✗',
    words: r.yingqiWords,
  })),
};

if (process.argv.includes('--json')) {
  console.log(JSON.stringify(report, null, 2));
} else {
  const verdict = (p) => (p < 0.01 ? '显著（p<0.01）' : p < 0.05 ? '显著（p<0.05）' : '不显著');
  console.log(`卦例 ${n} 条（跳过 ${rows.length - n}）`);
  console.log(`并集命中 ${hitAny}/${n} = ${report.metrics.并集命中率}｜基线 ${report.metrics.并集基线}｜p=${pAny.toFixed(4)} ${verdict(pAny)}`);
  console.log(`主规则命中 ${hitPri}/${n} = ${report.metrics.主规则命中率}｜基线 ${report.metrics.主规则基线}｜p=${pPri.toFixed(4)} ${verdict(pPri)}`);
  console.log(`平均触发支 ${avgSet.toFixed(2)} 支`);
  console.log('\n逐规则（按提升排序；提升 = 该规则命中率 − 它自己支数的随机基线）：');
  const rr = Object.entries(byRule).sort((a, b) => b[1].lift - a[1].lift);
  for (const [k, v] of rr) {
    const mark = v.p < 0.05 && v.lift > 0 ? '★' : v.lift < 0 ? '·' : ' ';
    console.log(` ${mark} ${k.padEnd(22)} ${String(v.n).padStart(2)} 例  ${v.hit} 中  ${pct(v.rate).padStart(6)}  基线 ${pct(v.baseline).padStart(6)}  提升 ${(v.lift * 100).toFixed(1).padStart(5)}pt  均 ${v.avgBranches} 支  p=${v.p.toFixed(3)}`);
  }
  console.log('\n按主规则：');
  for (const [k, v] of Object.entries(byPrimary).sort((a, b) => b[1].n - a[1].n)) {
    console.log(`  ${k.padEnd(24)} ${String(v.n).padStart(2)} 例  并集 ${v.hitAny}  主规则 ${v.hit}`);
  }
  console.log('\n逐条：');
  for (const r of report.rows) {
    console.log(`  ${r.hit}${r.hitPrimary} ${r.date.padEnd(8)} ${r.zhan.slice(0, 12).padEnd(13)} 用神${r.useGod.padEnd(12)} 应验${r.actual.padEnd(3)} 预测${r.pred.padEnd(6)} 主规则:${r.primary}`);
  }
}
