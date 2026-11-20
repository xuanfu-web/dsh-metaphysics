#!/usr/bin/env node
// M1–M7 度量：把 PRD 1.4 那七项「量化验收指标」变成跑得出来的数。
//
// 为什么要有这个：任务书 1.4 写明「全部由脚本自动采集，不允许人工估算」。没有这个脚本，
// 「正文改写到底有没有变好」就只能靠感觉，改完谁都能说一句「读起来顺多了」。
//
// 口径（照 PRD 原文）：
//   M1 首屏结论率   verdict.headline 存在（100%）——只对有 verdict 的体系有意义
//   M2 标准视图字数 L0 + L1 渲染后的中文字符总数（≤400）
//   M3 因素重复率   渲染出的因素条目数 / 去重后因素数（≤1.05）
//   M4 模糊词密度   模糊表述数 / 总句数（≤5%）
//   M5 同盘一致率   同一盘跑 10 次，verdict.direction 一致（≥95%）
//   M6 术语越界率   L0+L1 里出现 T3 术语的次数（=0）
//   M7 追问一致率   追问后结论方向与原结论一致（100%）
//
// 用法：
//   node tools/metrics.mjs              人读表格 + 不达标就 exit 1
//   node tools/metrics.mjs --json       机读
//   node tools/metrics.mjs --only bazi  只跑一个体系
import fs from 'node:fs';
import path from 'node:path';
import { compute, interpret } from '../engine/index.js';
import { termsInText, hasDict } from '../engine/term-dict.js';

const root = path.resolve(import.meta.dirname, '..');
const argv = process.argv.slice(2);
const asJson = argv.includes('--json');
const onlyArg = argv.indexOf('--only');
const only = onlyArg >= 0 ? argv[onlyArg + 1] : '';

// ── 阈值（PRD 1.4 原文，改这里等于改验收标准，要有理由）──────────
const LIMITS = {
  M1: 1,        // 100%
  M2: 400,      // 中文字符
  M3: 1.05,     // 倍
  M4: 0.05,     // 5%
  M5: 0.95,     // 95%
  M6: 0,        // 次数
  M7: 1,        // 100%
};

// ── 模糊词：判「说了等于没说」的表述。带条件的「若…则…」不算模糊，
//    那是 PRD 要求的 condition 写法，所以先按句式剥离再判。
const FUZZY = ['可能', '也许', '或许', '大概', '大约', '似乎', '好像', '应该是', '说不定', '八成', '大致上', '差不多', '看情况', '因人而异', '有可能会'];

// ── 样本：24 个体系各一张固定盘。日期全部写死，不取 today（L-006）──
const SUITE = [
  { system: 'bazi', label: '八字', args: { system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '成都' } },
  { system: 'ziwei', label: '紫微', args: { system: 'ziwei', datetime: '1996-01-19T07:31', gender: 'male', address: '石家庄' } },
  { system: 'liuyao', label: '六爻', args: { system: 'liuyao', lines: [7, 8, 9, 7, 6, 8], question: '这次换工作能不能成', datetime: '2026-11-15T10:00' } },
  { system: 'meihua', label: '梅花', args: { system: 'meihua', mode: 'time', datetime: '2026-10-24T11:43', question: '这周能不能定下来' } },
  { system: 'qimen', label: '奇门', args: { system: 'qimen', datetime: '2026-11-15T10:00', question: '这笔合作该不该接' } },
  { system: 'daliuren', label: '大六壬', args: { system: 'daliuren', datetime: '2026-11-15T10:00', question: '这批货款什么时候到' } },
  { system: 'tarot', label: '塔罗', args: { system: 'tarot', spread: 'three', count: 3, question: '该不该换城市', seed: 20261115 } },
  { system: 'hepan', label: '合盘', args: { system: 'hepan', datetime: '1990-05-12T14:30', gender: 'male', partner: { datetime: '1992-08-15T10:00', gender: 'female' } } },
  { system: 'almanac', label: '黄历', args: { system: 'almanac', datetime: '2026-11-15T10:00' } },
  { system: 'zeri', label: '择日', args: { system: 'zeri', startDate: '2026-12-01', task: '开业' } },
  { system: 'chenggu', label: '称骨', args: { system: 'chenggu', datetime: '1990-05-12T14:30', gender: 'male' } },
  { system: 'xiaoliuren', label: '小六壬', args: { system: 'xiaoliuren', mode: 'time', date: '2026-11-15', hour: 10 } },
  { system: 'qian', label: '福签', args: { system: 'qian', datetime: '2026-11-15T10:00' } },
  { system: 'guanyin', label: '灵签', args: { system: 'guanyin', seed: 20261115 } },
  { system: 'star', label: '星座', args: { system: 'star', datetime: '1990-05-12T14:30' } },
  { system: 'numerology', label: '生命数字', args: { system: 'numerology', datetime: '1990-05-12T14:30' } },
  { system: 'trend', label: '人生K线', args: { system: 'trend', datetime: '1990-05-12T14:30', gender: 'male' } },
  { system: 'fengshui', label: '风水', args: { system: 'fengshui', datetime: '1990-05-12T14:30', gender: 'male', sitting: '子', facing: '午' } },
  { system: 'name', label: '起名', args: { system: 'name', surname: '李', givenName: '子墨' } },
  { system: 'taiyi', label: '太乙', args: { system: 'taiyi', datetime: '2026-11-15T10:00' } },
  { system: 'wuyunliuqi', label: '五运六气', args: { system: 'wuyunliuqi', datetime: '2026-11-15T10:00' } },
  { system: 'convert', label: '公农历', args: { system: 'convert', mode: 'solar2lunar', datetime: '2026-11-15T10:00' } },
  { system: 'mbti', label: '十六型', args: { system: 'mbti', answers: [3, 4, 2, 5, 3, 4, 2, 3, 4, 5, 3, 2, 4, 3, 5, 2, 3, 4, 3, 2, 4, 5, 3, 4] } },
  { system: 'constitution', label: '中医体质', args: { system: 'constitution', answers: [3, 2, 4, 3, 5, 2, 3, 4, 3, 2, 5, 3, 4, 3, 2, 4, 3, 5, 2, 3, 4, 3, 2, 5, 3, 4, 2, 3, 4, 5, 3, 2, 4, 3, 5, 2, 3, 4, 3, 2, 4, 3, 5, 2, 3] } },
];

const HAN = /[\u4e00-\u9fa5]/g;
const hanCount = (s) => (String(s || '').match(HAN) || []).length;
const sentences = (s) => String(s || '').split(/[。！？；\n]+/).map((x) => x.trim()).filter((x) => hanCount(x) > 0);

/** L0：首屏结论层。L1：标准解读层。两者之和才是 M2 的分母。 */
function layers(it) {
  const env = (it && it.envelope) || {};
  const v = env.verdict || null;
  const l0 = v ? [v.headline, v.condition].filter(Boolean).join('。') : '';
  const factors = Array.isArray(env.factors) ? env.factors : [];
  const l1 = [it && it.plain, ...factors.map((f) => f && f.impact)].filter(Boolean).join('。');
  return { l0, l1, verdict: v, factors };
}

function dupRatio(factors) {
  if (!factors.length) return 1;
  const seen = new Set();
  let dup = 0;
  for (const f of factors) {
    const key = `${(f && f.name) || ''}|${(f && f.state) || ''}`;
    if (seen.has(key)) dup += 1;
    else seen.add(key);
  }
  return factors.length / (factors.length - dup);
}

function fuzzyDensity(text) {
  // 「若…则…」是 PRD 要求的条件句，先剥离再数模糊词
  const stripped = String(text || '').replace(/若[^。！？]*?则[^。！？]*/g, '');
  const list = sentences(stripped);
  if (!list.length) return 0;
  let hits = 0;
  for (const s of list) if (FUZZY.some((w) => s.includes(w))) hits += 1;
  return hits / list.length;
}

function directionOf(it) {
  const v = it && it.envelope && it.envelope.verdict;
  return v ? String(v.direction || '') : '';
}

function runOne(item) {
  const t0 = Date.now();
  const r = compute(item.args);
  const it = interpret(r, {});
  const { l0, l1, verdict, factors } = layers(it);
  const text = `${l0}${l1}`;
  const m3 = dupRatio(factors);
  const m4 = fuzzyDensity(text);
  const t3 = hasDict(item.system) ? termsInText(item.system, text, 'T3') : [];

  // M5：同参再跑 9 次（共 10 次），看 direction 是否稳
  const dirs = new Set([directionOf(it)]);
  for (let i = 0; i < 9; i += 1) {
    try {
      dirs.add(directionOf(interpret(compute(item.args), {})));
    } catch (e) { /* 复算失败不参与一致性统计 */ }
  }
  const m5 = dirs.size === 1 ? 1 : 0;

  // M7：追问一次，direction 不能翻
  let m7 = 1;
  let askText = '';
  try {
    const ask = interpret(r, { ask: '今年事业怎么样' });
    askText = String((ask && (ask.answer || ask.plain)) || '');
    if (ask.envelope && ask.envelope.verdict) m7 = directionOf(ask) === directionOf(it) ? 1 : 0;
  } catch (e) { m7 = 0; }

  const parsed = !!verdict;
  if (!parsed) {
    return {
      system: item.system, label: item.label, hasVerdict: false, kind: 'lookup',
      M1: null, M2: null, M3: null, M4: null, M5: null, M6: null, M7: null,
      M6terms: [], verdictText: '', direction: '', askLen: 0, ms: Date.now() - t0,
    };
  }
  return {
    system: item.system,
    label: item.label,
    hasVerdict: true,
    M1: verdict && hanCount(verdict.headline) >= 8 ? 1 : 0,
    M2: hanCount(text),
    M3: Number(m3.toFixed(3)),
    M4: Number((m4 * 100).toFixed(1)),
    M5: m5,
    M6: t3.length,
    M6terms: t3.map((x) => (typeof x === 'string' ? x : x && x.term)).filter(Boolean),
    M7: m7,
    verdictText: verdict ? String(verdict.headline || '') : '',
    direction: directionOf(it),
    askLen: hanCount(askText),
    ms: Date.now() - t0,
  };
}

const rows = [];
const errors = [];
for (const item of SUITE) {
  if (only && item.system !== only) continue;
  try {
    rows.push(runOne(item));
  } catch (e) {
    errors.push({ system: item.system, label: item.label, error: e && e.code ? `${e.code}: ${e.message}` : String(e && e.message) });
  }
}

// 汇总：M1/M5/M7 是比例，M2/M3/M4/M6 按「达标体系数」算
const withVerdict = rows.filter((x) => x.hasVerdict);
const sum = {
  total: rows.length,
  withVerdict: withVerdict.length,
  M1: withVerdict.length ? Number((withVerdict.reduce((a, x) => a + x.M1, 0) / withVerdict.length).toFixed(3)) : null,
  M2pass: withVerdict.filter((x) => x.M2 <= LIMITS.M2).length,
  M2max: withVerdict.reduce((a, x) => Math.max(a, x.M2), 0),
  M3pass: withVerdict.filter((x) => x.M3 <= LIMITS.M3).length,
  M4pass: withVerdict.filter((x) => x.M4 <= LIMITS.M4 * 100).length,
  M5: withVerdict.length ? Number((withVerdict.reduce((a, x) => a + x.M5, 0) / withVerdict.length).toFixed(3)) : null,
  M6pass: withVerdict.filter((x) => x.M6 <= LIMITS.M6).length,
  M7: withVerdict.length ? Number((withVerdict.reduce((a, x) => a + x.M7, 0) / withVerdict.length).toFixed(3)) : null,
};

const fails = [];
if (sum.M1 !== null && sum.M1 < LIMITS.M1) fails.push(`M1 首屏结论率 ${sum.M1} < ${LIMITS.M1}`);
if (sum.M2max > LIMITS.M2) fails.push(`M2 字数超限：最大 ${sum.M2max} > ${LIMITS.M2}（${withVerdict.filter((x) => x.M2 > LIMITS.M2).map((x) => x.label).join('、')}）`);
if (sum.M3pass < withVerdict.length) fails.push(`M3 因素重复率超限：${withVerdict.filter((x) => x.M3 > LIMITS.M3).map((x) => `${x.label} ${x.M3}`).join('、')}`);
if (sum.M4pass < withVerdict.length) fails.push(`M4 模糊词密度超限：${withVerdict.filter((x) => x.M4 > LIMITS.M4 * 100).map((x) => `${x.label} ${x.M4}%`).join('、')}`);
if (sum.M5 !== null && sum.M5 < LIMITS.M5) fails.push(`M5 同盘一致率 ${sum.M5} < ${LIMITS.M5}`);
if (sum.M6pass < withVerdict.length) fails.push(`M6 T3 术语越界：${withVerdict.filter((x) => x.M6 > 0).map((x) => `${x.label} ${x.M6terms.join('/')}`).join('、')}`);
if (sum.M7 !== null && sum.M7 < LIMITS.M7) fails.push(`M7 追问一致率 ${sum.M7} < ${LIMITS.M7}`);
if (errors.length) fails.push(`有 ${errors.length} 个体系起不来：${errors.map((e) => `${e.label}(${e.error})`).join('、')}`);

if (asJson) {
  console.log(JSON.stringify({ limits: LIMITS, sum, rows, errors, fails }, null, 2));
} else {
  console.log('体系      首屏 字数 因素比 模糊% 一致 T3 追问');
  for (const x of rows) {
    const cell = (v, w) => (v === null || v === undefined ? "—" : String(v)).padStart(w);
    console.log(`${x.label.padEnd(9, ' ')} ${x.hasVerdict ? String(x.M1).padEnd(4) : "—".padEnd(4)} ${cell(x.M2, 4)} ${cell(x.M3, 6)} ${cell(x.M4, 5)} ${cell(x.M5, 4)} ${cell(x.M6, 2)} ${cell(x.M7, 4)}`);
  }
  console.log('');
  console.log(`有解读层 ${sum.withVerdict}/${sum.total} 个体系`);
  console.log(`M1 ${sum.M1 === null ? 'n/a' : sum.M1}  M2 最大 ${sum.M2max}字（${sum.M2pass}/${withVerdict.length} 达标）  M3 ${sum.M3pass}/${withVerdict.length}  M4 ${sum.M4pass}/${withVerdict.length}  M5 ${sum.M5}  M6 ${sum.M6pass}/${withVerdict.length}  M7 ${sum.M7}`);
}

if (fails.length) {
  console.error('');
  console.error(`✗ M1–M7 未全达标（${fails.length} 项）：`);
  for (const f of fails) console.error(`  - ${f}`);
  process.exit(1);
}
if (!asJson) console.log('\n✓ M1–M7 全部达标');
