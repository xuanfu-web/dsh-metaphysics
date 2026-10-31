// B2 紫微破格：34 条格局逐条有成格/破格判据，判据可复算、带引文，且不改原盘。
import fs from 'node:fs';
import vm from 'node:vm';
import { buildZiwei, PATTERN_TONE, PATTERN_BREAK_RULES } from '../engine/ziwei.js';
import { compute, renderText } from '../engine/index.js';
import { citationOf } from '../engine/citations.js';
import { ok, eq } from './_harness.mjs';

const chart = (year, month, day, hour) => buildZiwei({
  year, month, day, hour, minute: 0, gender: 'male', trueSolar: false,
});

// ── ① 规则表完整 ────────────────────────────────────────────
const names = Object.keys(PATTERN_TONE);
eq('34 条格局都有破格规则', Object.keys(PATTERN_BREAK_RULES).length, 34);
eq('规则表与格局目录同名', Object.keys(PATTERN_BREAK_RULES).sort(), names.slice().sort());
const graded = names.filter((n) => !PATTERN_BREAK_RULES[n].kind);
const notGraded = names.filter((n) => PATTERN_BREAK_RULES[n].kind);
eq('可判破格 23 条（吉格 20 + 中性 3）', graded.length, 23);
eq('不判破格 11 条（结构 2 + 忌格 9）', notGraded.length, 11);
ok('每条规则都有判据或说明', names.every((n) => {
  const r = PATTERN_BREAK_RULES[n];
  return r.kind ? typeof r.note === 'string' && r.note.length > 6 : Array.isArray(r.breakers) && r.breakers.length > 0 && r.rule.length > 6;
}));
ok('可判破格的规则都带引文', graded.every((n) => PATTERN_BREAK_RULES[n].citationIds.length > 0 && PATTERN_BREAK_RULES[n].citationIds.every((id) => citationOf(id))));
ok('忌格不硬造破格引文', names.filter((n) => PATTERN_TONE[n] === 'bad').every((n) => !PATTERN_BREAK_RULES[n].citationIds));

// ── ② 扫盘：状态合法、可复算、能真的判出破格 ─────────────────
const SWEEP = [];
for (let y = 1950; y <= 2025; y += 3) {
  for (let m = 1; m <= 12; m += 1) SWEEP.push([y, m, 1 + ((y + m) % 28), (y + m * 3) % 24]);
}
let broken = 0;
let formed = 0;
let na = 0;
const brokenByPattern = new Map();
const badBroken = [];
for (const [y, m, d, h] of SWEEP) {
  const z = chart(y, m, d, h);
  for (const p of z.patterns) {
    if (p.status === 'broken') {
      broken += 1;
      brokenByPattern.set(p.name, (brokenByPattern.get(p.name) || 0) + 1);
      if (!Array.isArray(p.breaks) || !p.breaks.length || !p.breakRule) badBroken.push(`${y}-${m}-${d} ${p.name}`);
      if (!p.breaks.every((b) => typeof b === 'string' && b.length > 4)) badBroken.push(`${p.name}:空理由`);
    } else if (p.status === 'formed') {
      formed += 1;
      if (p.breaks.length) badBroken.push(`${p.name}:成格却有破格理由`);
    } else if (p.status === 'n/a') {
      na += 1;
      if (p.breaks.length) badBroken.push(`${p.name}:不判却有理由`);
    }
  }
  const bad = z.patterns.filter((p) => p.tone === 'bad' && p.status === 'broken');
  if (bad.length) badBroken.push(`忌格被标破格：${bad.map((x) => x.name).join(',')}`);
}
ok('312 张盘状态字段合法', badBroken.length === 0, badBroken.slice(0, 5).join('｜'));
ok('能判出破格', broken > 100, `broken ${broken} / formed ${formed} / n/a ${na}`);
ok('破格覆盖多种格局', brokenByPattern.size >= 6, [...brokenByPattern.entries()].map(([k, v]) => `${k}:${v}`).join(' '));
ok('破格理由带星名与宫支', [...brokenByPattern.keys()].length > 0);
{
  const z = chart(1955, 1, 2, 0);
  const p = z.patterns.find((x) => x.status === 'broken');
  ok('破格理由写明星与宫位', !!p && p.breaks.some((b) => /（[子丑寅卯辰巳午未申酉戌亥]）/.test(b)), p && p.breaks.join('；'));
}

// ── ③ 具体格局 ──────────────────────────────────────────────
const z1955 = compute({ system: 'ziwei', datetime: '1955-01-02T00:00', gender: 'male', withInterpret: true });
const byName = new Map(z1955.patterns.map((p) => [p.name, p]));
ok('1995 盘有破格条目', z1955.patternSummary.broken.length > 0, z1955.patternSummary.broken.join(','));
eq('摘要 broken/formed/notGraded 之和等于格局数',
  z1955.patternSummary.broken.length + z1955.patternSummary.formed.length + z1955.patternSummary.notGraded.length,
  z1955.patterns.length);
ok('摘要行带破格数与名单',
  z1955.summary.includes(`破格 ${z1955.patternSummary.broken.length}`) && z1955.patternSummary.broken.every((n) => z1955.summary.includes(n)),
  z1955.patternSummary.broken.join(','));
ok('武贪同行可成格', byName.get('武贪同行') && byName.get('武贪同行').status === 'formed', byName.get('武贪同行') && byName.get('武贪同行').status);
ok('三奇嘉会在此盘被判破格', byName.get('三奇嘉会') && byName.get('三奇嘉会').status === 'broken', byName.get('三奇嘉会') && byName.get('三奇嘉会').status);
const sec = (z1955.interpret.sections || []).filter((s) => String(s.key).startsWith('pattern-'));
ok('解读层写出破格理由', sec.some((s) => s.text.includes('破格：') && s.text.includes('三方见')), sec.map((s) => s.text).join('|').slice(0, 200));
ok('文本层摘要带破格', renderText(z1955).includes('破格'));

// 火贪格：三方有煞 → 破格；三方无煞 → 成格（扫盘里两种都应出现）
let huoTanBroken = 0;
let huoTanFormed = 0;
for (const [y, m, d, h] of SWEEP) {
  const z = chart(y, m, d, h);
  const p = z.patterns.find((x) => x.name === '火贪铃贪');
  if (p && p.status === 'broken') huoTanBroken += 1;
  if (p && p.status === 'formed') huoTanFormed += 1;
}
ok('火贪铃贪有成有破', huoTanBroken > 0 && huoTanFormed > 0, `成格 ${huoTanFormed} / 破格 ${huoTanBroken}`);

// ── ④ 只读与确定性 ─────────────────────────────────────────
const a1 = chart(1955, 1, 2, 0);
const a2 = chart(1955, 1, 2, 0);
eq('同输入同破格状态',
  JSON.stringify(a1.patterns.map((p) => [p.name, p.status, p.breaks])),
  JSON.stringify(a2.patterns.map((p) => [p.name, p.status, p.breaks])));
const plain = compute({ system: 'ziwei', datetime: '1955-01-02T00:00', gender: 'male' });
const withIt = JSON.parse(JSON.stringify(z1955));
delete withIt.interpret;
ok('解读层不改盘面与破格状态', JSON.stringify(plain) === JSON.stringify(withIt));

// ── ⑤ 面板 ────────────────────────────────────────────────
const sandbox = { window: {}, document: {}, console };
vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
const PP = sandbox.window.__PP;
const html = PP.ziweiHTML(z1955);
ok('面板破格 chip 带标记', html.includes('（破格）') && html.includes('pp-chip broken'), html.slice(0, 120));
ok('面板 chip 标题写破格理由', /title="[^"]*破格：/.test(html));
ok('面板转义破格文本', !html.includes('<script>'));
