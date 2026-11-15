#!/usr/bin/env node
// 三层披露的评测脚本（PRD 1.4 / 第 9 章 / US-014）
//
// 跑法：node tools/eval-envelope.mjs [--json] [--quiet]
// 输出：M1–M7 指标表 + 旧版字数对比；任一指标不达标时退出码非 0。
//
// 口径说明（免得后人拿它当「准不准」的分数看）：
//   direction 一致性衡量的是「同一张盘重复算是否给同一个方向」，
//   不是「跟某位师傅的判断是否一致」——后者没有客观答案，不在本脚本范围内。
import fs from 'node:fs';
import path from 'node:path';
import { compute } from '../engine/index.js';
import {
  buildEnvelope, validateEnvelope, renderL0L1, duplicateRatio,
  rebuildForFollowup, lenCn, LIMITS, FORBIDDEN, HEDGE, SCHEMA_VERSION,
} from '../engine/envelope.js';
import { scanTerms } from '../engine/term-dict.js';
import { interpret } from '../engine/interpret.js';

const root = path.resolve(import.meta.dirname, '..');
const argv = process.argv.slice(2);
const asJson = argv.includes('--json');
const quiet = argv.includes('--quiet');

const CASES = JSON.parse(fs.readFileSync(path.join(root, 'test/envelope-cases.json'), 'utf8'));
const AS_OF = CASES.asOf || '2026-11-15T08:30';

const line = (s = '') => { if (!quiet) console.log(s); };
const pad = (s, n) => String(s).padEnd(n, ' ');
const rpad = (s, n) => String(s).padStart(n, ' ');

/** 一句话切成几句：中文标点 + 换行；空串不算 */
function sentences(text) {
  return String(text || '')
    .split(/[。！？!?\n]+/)
    .map((s) => s.trim())
    .filter((s) => lenCn(s) > 0);
}

function countAll(text, list) {
  let n = 0;
  for (const w of list) {
    let from = 0;
    for (;;) {
      const at = String(text).indexOf(w, from);
      if (at < 0) break;
      n += 1;
      from = at + w.length;
    }
  }
  return n;
}

const rows = [];
let m1Hit = 0;
let maxL0L1 = 0;
let sumRatio = 0;
let fuzzyTotal = 0;
let sentTotal = 0;
let t3Total = 0;
let m5Hit = 0;
let m5Run = 0;
let m7Hit = 0;
let m7Run = 0;
let expectHit = 0;
let expectRun = 0;
let fails = 0;
let oldCharsTotal = 0;

for (const c of CASES.cases) {
  let r;
  try {
    r = compute(c.input);
  } catch (e) {
    fails += 1;
    rows.push({ id: c.id, error: `compute 失败：${e.message}` });
    continue;
  }
  const env = buildEnvelope(r, { asOf: AS_OF, mode: 'eval', noCache: true });
  const check = validateEnvelope(env, { system: c.system });
  const text = renderL0L1(env);

  // M1 首屏结论率：headline 存在、长度合规、且就是 L0 的第一行
  const hl = env && env.verdict && env.verdict.headline;
  const hlLen = lenCn(hl);
  const firstLine = String(text || '').split('\n')[0] || '';
  const m1ok = !!hl && hlLen >= LIMITS.headline[0] && hlLen <= LIMITS.headline[1] && firstLine === hl;
  if (m1ok) m1Hit += 1;

  maxL0L1 = Math.max(maxL0L1, check.l0l1Chars);
  sumRatio += duplicateRatio(c.system, env.factors);

  const sents = sentences(text);
  sentTotal += sents.length;
  fuzzyTotal += countAll(text, FORBIDDEN) + countAll(text, HEDGE);

  const t3 = scanTerms(c.system, text).filter((h) => h.tier === 'T3').length;
  t3Total += t3;

  // M5 同盘一致率：同一输入连算 10 次，方向必须每次一样
  const dirs = new Set();
  for (let i = 0; i < 10; i += 1) {
    const again = buildEnvelope(compute(c.input), { asOf: AS_OF, mode: 'eval', noCache: true });
    dirs.add(again.verdict.direction);
  }
  m5Run += 1;
  if (dirs.size === 1) m5Hit += 1;

  // M7 追问一致率：追问只换问题，方向必须与原结论一致
  const fu = rebuildForFollowup(env, '那具体该先做哪一步？');
  m7Run += 1;
  if (fu && fu.verdict.direction === env.verdict.direction) m7Hit += 1;

  // 期望方向（只统计人工标了 expect 的盘）
  if (c.expect) {
    expectRun += 1;
    if (env.verdict.direction === c.expect) expectHit += 1;
  }

  // 旧版对照：整份解析的正文（五维正文 + 建议 + 分节）字数
  let oldChars = 0;
  try {
    const it = interpret(r);
    oldChars = (it.dimensions || []).reduce((n, d) => n + lenCn(d.text) + lenCn(d.advice) + lenCn(d.plain), 0)
      + (it.sections || []).reduce((n, s) => n + lenCn(s.text), 0);
  } catch { oldChars = 0; }
  oldCharsTotal += oldChars;

  if (!check.ok) fails += 1;
  rows.push({
    id: c.id,
    system: c.system,
    dir: env.verdict.direction,
    conf: env.verdict.confidence,
    hl: hlLen,
    l0l1: check.l0l1Chars,
    old: oldChars,
    factors: env.factors.length,
    t3,
    ok: check.ok,
    errors: check.errors.map((e) => e.rule_id),
    headline: hl,
  });
}

const total = CASES.cases.length;
const M = {
  m1: +(m1Hit / total * 100).toFixed(1),
  m2: maxL0L1,
  m3: +(sumRatio / total).toFixed(3),
  m4: +(sentTotal ? fuzzyTotal / sentTotal * 100 : 0).toFixed(2),
  m5: +(m5Run ? m5Hit / m5Run * 100 : 0).toFixed(1),
  m6: t3Total,
  m7: +(m7Run ? m7Hit / m7Run * 100 : 0).toFixed(1),
};

const GATES = {
  m1: { ok: M.m1 === 100, target: '=100%' },
  m2: { ok: M.m2 <= LIMITS.l0l1, target: `<=${LIMITS.l0l1}` },
  m3: { ok: M.m3 <= 1.05, target: '<=1.05' },
  m4: { ok: M.m4 <= 5, target: '<=5%' },
  m5: { ok: M.m5 >= 95, target: '>=95%' },
  m6: { ok: M.m6 === 0, target: '=0' },
  m7: { ok: M.m7 === 100, target: '=100%' },
};
const expectRate = expectRun ? +(expectHit / expectRun * 100).toFixed(1) : null;
const expectOk = expectRun === 0 || expectRate >= 90;
const allOk = Object.values(GATES).every((g) => g.ok) && expectOk && fails === 0;

if (asJson) {
  console.log(JSON.stringify({
    schema_version: SCHEMA_VERSION,
    cases: total,
    metrics: M,
    gates: GATES,
    expect: { rate: expectRate, labelled: expectRun, ok: expectOk },
    oldCharsAvg: Math.round(oldCharsTotal / total),
    newCharsAvg: Math.round(rows.reduce((n, r) => n + (r.l0l1 || 0), 0) / total),
    failedCases: fails,
    rows,
    ok: allOk,
  }, null, 2));
  process.exit(allOk ? 0 : 1);
}

line(`三层披露评测 · ${total} 个经典盘 · asOf ${AS_OF}`);
line('');
line(`${pad('盘', 12)}${rpad('方向', 6)}${rpad('把握', 6)}${rpad('L0+L1', 7)}${rpad('旧版', 8)}${rpad('因素', 6)}${rpad('T3', 4)}  结论`);
line('─'.repeat(96));
for (const r of rows) {
  if (r.error) { line(`${pad(r.id, 12)}  ${r.error}`); continue; }
  line(`${pad(r.id, 12)}${rpad(r.dir, 6)}${rpad(r.conf, 6)}${rpad(r.l0l1, 7)}${rpad(r.old, 8)}${rpad(r.factors, 6)}${rpad(r.t3, 4)}  ${r.ok ? '✓' : `✗ ${r.errors.join(',')}`}`);
  if (!quiet) line(`${' '.repeat(12)}${r.headline}`);
}
line('─'.repeat(96));
line('');
line('指标      实测        目标      判定');
const fmt = {
  m1: [`${M.m1}%`, 'M1 首屏结论率'],
  m2: [`${M.m2} 字`, 'M2 L0+L1 字数'],
  m3: [`${M.m3}`, 'M3 因素重复率'],
  m4: [`${M.m4}%`, 'M4 模糊词密度'],
  m5: [`${M.m5}%`, 'M5 同盘一致率'],
  m6: [`${M.m6}`, 'M6 T3 术语越界'],
  m7: [`${M.m7}%`, 'M7 追问一致率'],
};
for (const k of Object.keys(fmt)) {
  line(`${pad(fmt[k][1], 16)}${pad(fmt[k][0], 12)}${pad(GATES[k].target, 10)}${GATES[k].ok ? '✓' : '✗'}`);
}
line(`${pad('期望方向一致', 16)}${pad(expectRate == null ? '未标注' : `${expectRate}%`, 12)}${pad('>=90%', 10)}${expectOk ? '✓' : '✗'}（标注 ${expectRun} 盘）`);
line('');
const avgOld = Math.round(oldCharsTotal / total);
const avgNew = Math.round(rows.reduce((n, r) => n + (r.l0l1 || 0), 0) / total);
line(`字数对照：旧版正文均 ${avgOld} 字 → 新版首屏均 ${avgNew} 字（压缩到 ${avgOld ? Math.round(avgNew / avgOld * 100) : 0}%），完整依据仍留在 L2`);
line(allOk ? '\n✓ 全部指标达标' : '\n✗ 有指标未达标');
process.exit(allOk ? 0 : 1);
