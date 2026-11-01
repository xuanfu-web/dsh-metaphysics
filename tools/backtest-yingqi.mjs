// 六爻应期对拍：拿《增删卜易》卦例检验 yingqi.js 的规则是否覆盖原文所记应验支。
//
// 两个指标分开算，不混：
//   ① 并集命中：实际应验支 ∈ 引擎给出的全部触发支
//   ② 主规则命中：实际应验支 ∈ 优先级最高那条规则给的支
// 并集越大越容易命中，所以同时报「平均触发支数」与随机基线（支数/12）——
// 如果命中率只比基线高一点，那就是规则没用，得照实说。
//
// 用法：node tools/backtest-yingqi.mjs [--json]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildLiuyao } from '../engine/liuyao.js';
import { yingqiPredict } from '../engine/yingqi.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FIX = JSON.parse(fs.readFileSync(path.join(ROOT, 'test', 'fixtures', 'zengshan-cases.json'), 'utf8'));

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
    ruleIds: pred.rules.map((r) => r.id),
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

// 按主规则分组，看哪条规则常落空
const byRule = {};
for (const r of used) {
  const k = r.primaryId || 'none';
  byRule[k] = byRule[k] || { n: 0, hit: 0, hitAny: 0 };
  byRule[k].n++;
  if (r.hitPrimary) byRule[k].hit++;
  if (r.hitAny) byRule[k].hitAny++;
}

const pct = (x) => `${(x * 100).toFixed(1)}%`;
const report = {
  meta: {
    fixture: 'test/fixtures/zengshan-cases.json',
    cases: n,
    skipped: rows.length - n,
    note: '原文自语自证，衡量的是「引擎触发支集合是否覆盖原文所记应验支」，不等于预测能力',
  },
  metrics: {
    并集命中: hitAny,
    并集命中率: pct(hitAny / (n || 1)),
    主规则命中: hitPri,
    主规则命中率: pct(hitPri / (n || 1)),
    平均触发支数: Number(avgSet.toFixed(2)),
    随机基线: pct(baseline),
  },
  byRule,
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
  console.log(`卦例 ${n} 条（跳过 ${rows.length - n}）`);
  console.log(`并集命中 ${hitAny}/${n} = ${report.metrics.并集命中率}`);
  console.log(`主规则命中 ${hitPri}/${n} = ${report.metrics.主规则命中率}`);
  console.log(`平均触发支 ${avgSet.toFixed(2)} 支，随机基线 ${report.metrics.随机基线}`);
  console.log('\n按主规则：');
  for (const [k, v] of Object.entries(byRule).sort((a, b) => b[1].n - a[1].n)) {
    console.log(`  ${k.padEnd(24)} ${String(v.n).padStart(2)} 例  并集 ${v.hitAny}  主规则 ${v.hit}`);
  }
  console.log('\n逐条：');
  for (const r of report.rows) {
    console.log(`  ${r.hit}${r.hitPrimary} ${r.date.padEnd(8)} ${r.zhan.slice(0, 12).padEnd(13)} 用神${r.useGod.padEnd(12)} 应验${r.actual.padEnd(3)} 预测${r.pred.padEnd(6)} 主规则:${r.primary}`);
  }
}
