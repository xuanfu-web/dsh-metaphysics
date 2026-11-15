// 三层披露评测：M1–M7（PRD 1.4 / 9.1）+ 新旧首屏对比。
//
//   node tools/eval-envelope.mjs          # 快速档，同盘复跑 3 次
//   node tools/eval-envelope.mjs --full   # 同盘复跑 10 次（M5 严格口径）
//
// 任一指标不达标就 exit 1 —— 本地和 CI 同一套门槛，别让「看起来还行」混过去。
// 回归集固定 21 盘：八字 5、紫微 5、六爻 5、奇门 3、塔罗 3，覆盖男女、早晚子时、闰月边界。
import { compute } from '../engine/index.js';
import { renderL0L1, duplicateRatio, lenCn, LIMITS, DIRECTIONS } from '../engine/envelope.js';
import { scanTerms } from '../engine/term-dict.js';

const FULL = process.argv.includes('--full');
const RERUNS = FULL ? 10 : 3;
const Q = '今年是否适合换工作';
const DIR = 'career';

const CASES = [
  ['bazi', '1996-01-19T07:31', { system: 'bazi', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州' }],
  ['bazi', '1990-05-12T14:30', { system: 'bazi', datetime: '1990-05-12T14:30', gender: 'female' }],
  ['bazi', '1988-11-03T23:20', { system: 'bazi', datetime: '1988-11-03T23:20', gender: 'male' }],
  ['bazi', '2001-02-28T04:05', { system: 'bazi', datetime: '2001-02-28T04:05', gender: 'female' }],
  ['bazi', '1975-08-09T18:40', { system: 'bazi', datetime: '1975-08-09T18:40', gender: 'male' }],
  ['ziwei', '1996-01-19T07:31', { system: 'ziwei', datetime: '1996-01-19T07:31', gender: 'male' }],
  ['ziwei', '1990-05-12T14:30', { system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'female' }],
  ['ziwei', '1988-11-03T23:20', { system: 'ziwei', datetime: '1988-11-03T23:20', gender: 'male' }],
  ['ziwei', '2001-02-28T04:05', { system: 'ziwei', datetime: '2001-02-28T04:05', gender: 'female' }],
  ['ziwei', '1975-08-09T18:40', { system: 'ziwei', datetime: '1975-08-09T18:40', gender: 'male' }],
  ['liuyao', '9-7-8-8-7-6', { system: 'liuyao', datetime: '2026-10-22T14:10', lines: [9, 7, 8, 8, 7, 6] }],
  ['liuyao', '7-7-7-7-7-7', { system: 'liuyao', datetime: '2026-10-22T14:10', lines: [7, 7, 7, 7, 7, 7] }],
  ['liuyao', '8-8-8-8-8-8', { system: 'liuyao', datetime: '2026-10-22T14:10', lines: [8, 8, 8, 8, 8, 8] }],
  ['liuyao', '6-9-6-9-6-9', { system: 'liuyao', datetime: '2026-03-03T08:00', lines: [6, 9, 6, 9, 6, 9] }],
  ['liuyao', '9-9-9-9-9-9', { system: 'liuyao', datetime: '2026-03-03T08:00', lines: [9, 9, 9, 9, 9, 9] }],
  ['qimen', '2026-10-31T12:00', { system: 'qimen', datetime: '2026-10-31T12:00' }],
  ['qimen', '2026-10-24T11:43', { system: 'qimen', datetime: '2026-10-24T11:43' }],
  ['qimen', '2026-01-05T08:00', { system: 'qimen', datetime: '2026-01-05T08:00' }],
  ['tarot', 'seed-42', { system: 'tarot', count: 3, seed: 42 }],
  ['tarot', 'seed-7', { system: 'tarot', count: 3, seed: 7 }],
  ['tarot', 'seed-2026', { system: 'tarot', count: 5, seed: 2026 }],
];

const rows = [];
const problems = [];
let m1ok = 0, m2ok = 0, m3ok = 0, m4ok = 0, m6ok = 0, degraded = 0;
let m5same = 0, m5total = 0;
let m7ok = 0, m7total = 0;
let oldSum = 0, newSum = 0;

for (const [system, label, base] of CASES) {
  const args = { ...base, withInterpret: true, question: Q, direction: DIR };
  const r = compute(args);
  const it = r.interpret || {};
  const env = it.envelope;
  if (!env) { problems.push(`${system}/${label}：没有 envelope`); continue; }

  const sysKey = env.meta && env.meta.system || system;
  if (env.degraded) degraded += 1;

  const text = renderL0L1(env);
  const chars = lenCn(text);
  const headChars = lenCn(env.verdict && env.verdict.headline);

  // M1 首屏结论率：headline 有、且长度落在 12–40
  const okHead = headChars >= 12 && headChars <= LIMITS.headline[1] && DIRECTIONS.includes(env.verdict.direction);
  if (okHead) m1ok += 1; else problems.push(`${system}/${label}：M1 headline ${headChars} 字 / 方向 ${env.verdict.direction}`);

  // M2 L0+L1 不超过 400 字
  if (chars <= LIMITS.l0l1) m2ok += 1; else problems.push(`${system}/${label}：M2 L0+L1 ${chars} 字`);

  // M3 因素重复率
  const ratio = duplicateRatio(sysKey, env.factors);
  if (ratio <= 1.05) m3ok += 1; else problems.push(`${system}/${label}：M3 重复率 ${ratio.toFixed(2)}`);

  // M4 模糊词密度
  const fuzzy = (text.match(/可能|或许|大概|也许|似乎/g) || []).length
    + (text.match(/部分流派认为|另有说法|古籍记载|各家有异说|某种程度上|一定程度上|因人而异|视情况而定|尚不能确定|有待观察|有待验证|仅供参考/g) || []).length;
  const density = chars ? fuzzy / chars : 0;
  if (density <= 0.05) m4ok += 1; else problems.push(`${system}/${label}：M4 模糊密度 ${(density * 100).toFixed(1)}%`);

  // M6 T3 术语越界
  const t3 = scanTerms(sysKey, text).filter((h) => h.tier === 'T3');
  if (!t3.length) m6ok += 1; else problems.push(`${system}/${label}：M6 T3 越界 ${t3.map((h) => h.term).join('/')}`);

  // M5 同盘一致率：同参数复跑，envelope 必须逐字节相同
  const snap = JSON.stringify(env);
  let same = 0;
  for (let i = 1; i < RERUNS; i += 1) {
    const again = compute(args);
    if (JSON.stringify(again.interpret && again.interpret.envelope) === snap) same += 1;
  }
  m5total += 1;
  if (same === RERUNS - 1) m5same += 1;
  else problems.push(`${system}/${label}：M5 复跑 ${RERUNS} 次只有 ${same + 1} 次一致`);

  // M7 追问一致率：只换问法，结论不许变
  if (typeof r.handle === 'string' && r.handle) {
    const again = compute({ handle: r.handle, ask: '换个说法问同一件事', withInterpret: true });
    const env2 = again.interpret && again.interpret.envelope;
    m7total += 1;
    const same2 = env2
      && env2.verdict.headline === env.verdict.headline
      && env2.verdict.direction === env.verdict.direction
      && env2.verdict.confidence === env.verdict.confidence;
    if (same2) m7ok += 1;
    else problems.push(`${system}/${label}：M7 追问后结论变了（${env2 ? env2.verdict.headline : '无 envelope'}）`);
  }

  // 新旧对比：老首屏是 lead + 五个维度正文，新首屏是 L0+L1
  // 奇门走的是「按宫位分节」而不是五维度，老口径要把 sections 也算上，否则对比表里它一律是 0
  const dims = it.dimensions || [];
  const oldChars = lenCn(it.lead || '') + (dims.length
    ? dims.reduce((n, d) => n + lenCn((d.text || '') + (d.advice || '')), 0)
    : (it.sections || []).reduce((n, x) => n + lenCn((x.label || '') + (x.text || '')), 0));
  oldSum += oldChars;
  newSum += chars;

  rows.push({
    system: sysKey, label, head: headChars, chars,
    老首屏: oldChars, factors: (env.factors || []).length,
    重复: ratio.toFixed(2), 模糊: `${(density * 100).toFixed(1)}%`, T3: t3.length,
    degraded: env.degraded ? '是' : '',
  });
}

// ── 输出 ────────────────────────────────────────────────
const pad = (s, n) => String(s).padEnd(n, ' ');
const padL = (s, n) => String(s).padStart(n, ' ');

console.log('');
console.log(pad('体系', 8) + pad('盘', 20) + padL('首屏', 5) + padL('L0L1', 6) + padL('老首屏', 7) + padL('因素', 5) + padL('重复', 6) + padL('模糊', 7) + padL('T3', 4) + '  简化');
for (const r of rows) {
  console.log(pad(r.system, 8) + pad(r.label, 20) + padL(r.head, 5) + padL(r.chars, 6)
    + padL(r.老首屏, 7) + padL(r.factors, 5) + padL(r.重复, 6) + padL(r.模糊, 7) + padL(r.T3, 4) + '  ' + r.degraded);
}

const n = rows.length;
const line = (id, name, got, need, pass) => {
  const mark = pass ? '✓' : '✗';
  console.log(`${mark} ${id} ${pad(name, 16)} ${got}  （门槛 ${need}）`);
};
const pct = (a, b) => (b ? `${(a / b * 100).toFixed(1)}% (${a}/${b})` : '—');

console.log('');
line('M1', '首屏结论率', pct(m1ok, n), '100%', m1ok === n && n > 0);
line('M2', 'L0+L1 字数', `${m2ok}/${n} 盘 ≤${LIMITS.l0l1}`, '100%', m2ok === n && n > 0);
line('M3', '因素重复率', `${m3ok}/${n} 盘 ≤1.05`, '100%', m3ok === n && n > 0);
line('M4', '模糊词密度', `${m4ok}/${n} 盘 ≤5%`, '100%', m4ok === n && n > 0);
line('M5', '同盘一致率', pct(m5same, m5total), `≥95%（复跑 ${RERUNS} 次）`, m5total > 0 && m5same / m5total >= 0.95);
line('M6', 'T3 术语越界', `${m6ok}/${n} 盘为 0`, '100%', m6ok === n && n > 0);
line('M7', '追问一致率', m7total ? pct(m7ok, m7total) : '无 handle 盘', '100%', m7total > 0 ? m7ok === m7total : true);

const shrink = oldSum ? ((1 - newSum / oldSum) * 100).toFixed(1) : '0';
console.log('');
console.log(`首屏总量：老 ${oldSum} 字 → 新 ${newSum} 字（${shrink}% 被折到 L2 与专业视图里）`);
console.log(`降级盘：${degraded} 个${degraded ? '（校验器两轮没修好才打这个标，出现就要看是哪条规则顶住了）' : ''}`);

if (!n) problems.push('一个盘都没跑出来');

if (problems.length) {
  console.log('');
  for (const p of problems.slice(0, 40)) console.log(`  · ${p}`);
  if (problems.length > 40) console.log(`  …另有 ${problems.length - 40} 条`);
  console.log('');
  console.log(`✗ 评测未通过：${problems.length} 处`);
  process.exitCode = 1;
} else {
  console.log('');
  console.log('✓ 评测通过：M1–M7 全部达标');
}
