// 紫微「四化飞星」与串连：宫干定四化星，星定落宫，跟着同一支化逐宫走。
//
// 三层验证：
//   1. 四化表：测试内独立录入十天干四化，与实现逐条比对（防表被改错）；
//   2. 12 宫 × 四化 = 48 条飞化：落宫必须真的坐着那颗星，自化标记必须与盘面 selfHua 一致；
//   3. 串连：每一步的「宫干 → 化星 → 落宫」都要成立，步与步首尾相接，且一定能在 12 步内停（成环或无星）。
import fs from 'node:fs';
import vm from 'node:vm';
import { buildZiwei, FLY_TYPES, flyStarOf, flyStars, flyChain, flyChains } from '../engine/ziwei.js';
import { compute } from '../engine/index.js';
import { interpret } from '../engine/interpret.js';
import { buildAnswer, buildPlain } from '../engine/interpret-plain.js';
import { ok, eq } from './_harness.mjs';

// ── ① 十天干四化表：独立录入（中州派常用口径）───────────────
const HUA = {
  甲: { 禄: '廉贞', 权: '破军', 科: '武曲', 忌: '太阳' },
  乙: { 禄: '天机', 权: '天梁', 科: '紫微', 忌: '太阴' },
  丙: { 禄: '天同', 权: '天机', 科: '文昌', 忌: '廉贞' },
  丁: { 禄: '太阴', 权: '天同', 科: '天机', 忌: '巨门' },
  戊: { 禄: '贪狼', 权: '太阴', 科: '右弼', 忌: '天机' },
  己: { 禄: '武曲', 权: '贪狼', 科: '天梁', 忌: '文曲' },
  庚: { 禄: '太阳', 权: '武曲', 科: '太阴', 忌: '天同' },
  辛: { 禄: '巨门', 权: '太阳', 科: '文曲', 忌: '文昌' },
  壬: { 禄: '天梁', 权: '紫微', 科: '左辅', 忌: '武曲' },
  癸: { 禄: '破军', 权: '巨门', 科: '太阴', 忌: '贪狼' },
};

eq('四化类型顺序固定', FLY_TYPES.join(''), '禄权科忌');
{
  const bad = [];
  for (const [stem, map] of Object.entries(HUA)) {
    for (const type of FLY_TYPES) {
      const got = flyStarOf(stem, type);
      if (got !== map[type]) bad.push(`${stem}${type}:${got || 'null'}≠${map[type]}`);
    }
  }
  ok('十天干 × 四化 共 40 条与独立录入一致', bad.length === 0, bad.join(' ') || '40/40');
  eq('未知天干不猜', flyStarOf('甲子', '禄'), null);
  eq('未知化不计', flyStarOf('甲', '德'), null);
}

// ── ② 一张固定盘：48 条飞化逐条核 ──────────────────────────
const CHART = buildZiwei({ year: 1990, month: 5, day: 12, hour: 14, minute: 30, gender: 'male' });
const BY_PALACE = new Map(CHART.palaces.map((p) => [p.palace, p]));
const starPalace = new Map();
for (const p of CHART.palaces) for (const s of p.stars) starPalace.set(s.name, p);

{
  const fly = flyStars(CHART);
  eq('每宫都算四化', fly.length, 12);
  const bad = [];
  for (const row of fly) {
    for (const f of row.flies) {
      const want = HUA[row.stem][f.type];
      if (f.star !== want) bad.push(`${row.palace}${f.type}星:${f.star}≠${want}`);
      const home = starPalace.get(f.star);
      if (!home) { bad.push(`${row.palace}${f.type}:${f.star}未上盘`); continue; }
      if (f.to !== home.palace) bad.push(`${row.palace}${f.type}${f.star}落:${f.to}≠${home.palace}`);
      if (f.toBranch !== home.branch) bad.push(`${row.palace}${f.type}支:${f.toBranch}≠${home.branch}`);
      if (f.self !== (home.palace === row.palace)) bad.push(`${row.palace}${f.type}自化标记不符`);
    }
  }
  ok('12 宫 × 四化 = 48 条飞化全部落到真实宫位', bad.length === 0, bad.join(' ') || '48/48');
}

// 自化标记要和盘面自带的 selfHua 对得上（两处独立算，能互相证伪）
{
  const bad = [];
  for (const row of flyStars(CHART)) {
    const declared = new Set((BY_PALACE.get(row.palace).selfHua || []).map((h) => `${h.star}${h.type}`));
    const mine = new Set(row.flies.filter((f) => f.self).map((f) => `${f.star}${f.type}`));
    for (const k of new Set([...declared, ...mine])) {
      if (declared.has(k) !== mine.has(k)) bad.push(`${row.palace}:${k}`);
    }
  }
  ok('飞星自化与盘面 selfHua 完全一致', bad.length === 0, bad.join(' ') || '一致');
}

// ── ③ 串连：步与步相接、12 步内必停 ────────────────────────
{
  const bad = [];
  for (const type of FLY_TYPES) {
    const ch = flyChain(CHART, { from: '命宫', type });
    if (!ch) { bad.push(`${type}:无链`); continue; }
    eq(`链起点固定为命宫（${type}）`, ch.path[0], '命宫');
    eq(`链步数+1＝路径长度（${type}）`, ch.steps.length + 1, ch.path.length);
    for (let i = 0; i < ch.steps.length; i++) {
      const s = ch.steps[i];
      if (s.from !== ch.path[i]) bad.push(`${type}#${i}起点与路径不符`);
      if (s.to !== ch.path[i + 1]) bad.push(`${type}#${i}终点与路径不符`);
      if (s.star !== HUA[s.fromStem][type]) bad.push(`${type}#${i}宫干化星不符`);
      const home = starPalace.get(s.star);
      if (!home || home.palace !== s.to) bad.push(`${type}#${i}落宫不符`);
      if (BY_PALACE.get(s.from).stem !== s.fromStem) bad.push(`${type}#${i}宫干不符`);
      if (i + 1 < ch.steps.length && ch.steps[i + 1].from !== s.to) bad.push(`${type}#${i}未与下一步相接`);
    }
    if (!['cycle', 'no-star', 'off-chart', 'max'].includes(ch.ended)) bad.push(`${type}:停因未知 ${ch.ended}`);
    if (ch.closed && !ch.path.slice(0, -1).includes(ch.path[ch.path.length - 1])) bad.push(`${type}:成环点不在路径上`);
    if (ch.steps.length > 12) bad.push(`${type}:超过 12 步`);
  }
  ok('四支化的串连首尾相接且 12 步内停止', bad.length === 0, bad.join(' ') || '4/4');
}

// 换一张盘：从任一宫出发都不会绕不出来
{
  const other = buildZiwei({ year: 2000, month: 2, day: 29, hour: 6, minute: 5, gender: 'female' });
  const bad = [];
  let cycles = 0;
  let open = 0;
  const lens = new Set();
  for (const from of other.palaces.map((p) => p.palace)) {
    const ch = flyChain(other, { from, type: '忌' });
    if (!ch || !ch.steps.length) continue;
    if (ch.steps.length > 12) bad.push(`${from}:${ch.steps.length}步`);
    if (ch.closed) cycles++;
    else open++;
    lens.add(ch.steps.length);
    // 除成环那一点外，路径中途不许重复（重复即意味着漏检成环）
    const body = ch.path.slice(0, -1);
    if (new Set(body).size !== body.length) bad.push(`${from}:路径中途重复`);
  }
  ok('12 宫出发的忌链都能收敛', bad.length === 0, bad.join(' ') || '12/12');
  // 宫干四化是「一个宫 → 一个宫」的映射，12 个点上的映射必然成环；
  // 断点只可能来自星未上盘，所以这里要求全部成环，且长度有长有短
  ok('忌链在完整盘上必然成环（映射性质）', cycles === 12 && open === 0, `成环 ${cycles} / 未成环 ${open}`);
  ok('链长并非全都一样（能区分短环与长环）', lens.size >= 2, [...lens].sort((a, b) => a - b).join(','));
}

// ── ④ 固定盘的回归快照（口径一旦改动就会被这条拦下）───────────
{
  const fc = flyChains(CHART, { from: '命宫' });
  eq('禄链路径', fc.禄.path.join('→'), '命宫→官禄→父母→命宫');
  eq('权链路径', fc.权.path.join('→'), '命宫→财帛→子女→福德→命宫');
  eq('科链路径', fc.科.path.join('→'), '命宫→交友→官禄→子女→命宫');
  eq('忌链路径', fc.忌.path.join('→'), '命宫→父母→福德→财帛→交友→父母');
  eq('四条都成环', [fc.禄, fc.权, fc.科, fc.忌].map((c) => c.closed).join(','), 'true,true,true,true');
  const ji = fc.忌.steps.map((s) => `${s.fromStem}${s.star}${s.type}→${s.to}`).join('；');
  eq('忌链逐跳（宫干·星·落宫）', ji, '丙廉贞忌→父母；丁巨门忌→福德；戊天机忌→财帛；壬武曲忌→交友；己文曲忌→父母');
}

// ── ⑤ 三处可见：摘要 / 解读 / 面板 / 白话 ──────────────────
const RESULT = compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male' });
{
  ok('摘要带命宫飞星行', /【命宫飞星】禄：命宫→官禄→父母→命宫（成环）/.test(RESULT.summary), (RESULT.summary.match(/【命宫飞星】.*/) || [''])[0].slice(0, 60));
  ok('摘要给出忌链走向', /忌：命宫→父母→福德→财帛→交友→父母（成环）/.test(RESULT.summary));

  const sec = (interpret(RESULT, {}).sections || []).find((x) => x.key === 'fly');
  ok('解读有「四化飞星」节', !!sec, sec ? sec.label : '缺失');
  ok('解读逐跳写出宫干与星', /命宫（丙）化忌廉贞→父母/.test(sec.text), sec.text.slice(0, 80));
  ok('解读点明成环', /绕回父母宫成环/.test(sec.text));
  ok('解读带上自化说明', /自化/.test(sec.text));
  ok('解读声明只描方向不断吉凶', /只描方向与牵引，不断吉凶/.test(sec.text));

  const plain = buildAnswer(RESULT, { question: '今年工作怎么样' }, {});
  ok('白话直答提到串联的几件事', /这几件事在你身上是连着转的/.test(plain), plain.slice(0, 60));
  ok('白话整段也带上这条线', /连着转|绕圈的线/.test(buildPlain(RESULT, {}, {})));

  // 面板：vm 里跑渲染层（与 qimen-ui 同一套办法）
  const sandbox = { window: {}, console };
  vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
  const html = sandbox.window.__PP.ziweiHTML(RESULT);
  const chips = html.match(/飞[禄权科忌] [^<]*/g) || [];
  eq('面板四条飞星 chip 齐全', chips.length, 4);
  ok('面板忌链 chip 标明成环', chips.some((c) => /飞忌 命→父母→福德→财帛→交友→父母↺/.test(c)), chips.join(' | '));
  ok('面板 chip 带逐跳说明（title）', /title="命宫（丙）化忌廉贞→父母/.test(html));
  ok('面板 chip 路径已转义无标签注入', !/<span class="pp-chip[^"]*"[^>]*>[^<]*<[a-z]/.test(html));
}

// ── ⑥ 旧结果兼容：缺 fly / flyChains 的盘不炸 ───────────────
{
  const old = JSON.parse(JSON.stringify(RESULT));
  delete old.fly;
  delete old.flyChains;
  const secs = (interpret(old, {}).sections || []);
  ok('缺飞星字段时不产出该节', !secs.some((s) => s.key === 'fly'));
  ok('缺飞星字段时白话仍能出', buildAnswer(old, {}, {}).length > 10);
  ok('缺链条时白话不硬凑', !/连着转/.test(buildAnswer(old, {}, {})));
  const sandbox = { window: {}, console };
  vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
  ok('缺链条时面板不渲染飞星 chip', !/飞[禄权科忌] /.test(sandbox.window.__PP.ziweiHTML(old)));
}
