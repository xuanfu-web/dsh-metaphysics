// 干支关系：自刑补齐 + 五行占比权重口径。
//
// 0.14.2 及以前 buildRelations 遇到两柱同支直接 continue，"辰辰/午午/酉酉/亥亥"这些
// 自刑一律不报；大运/流年支与原局同支时同样被跳过。
import { buildRelations, buildBazi, HIDDEN_STEMS } from '../engine/bazi.js';
import { compute } from '../engine/index.js';
import { ok } from './_harness.mjs';

const P = (gz) => ({ stem: gz[0], branch: gz[1], ganzhi: gz });
const mk = (y, m, d, h) => ({ year: P(y), month: P(m), day: P(d), hour: P(h) });
const rels = (pillars) => buildRelations(pillars).branches;

// ── ① 自刑：辰午酉亥两柱同见即成刑 ───────────────────────────
for (const zhi of ['辰', '午', '酉', '亥']) {
  const out = rels(mk(`甲${zhi}`, `丙${zhi}`, `戊${zhi}`, `庚${zhi}`));
  ok(`${zhi}${zhi} 判自刑`, out.includes(`${zhi}${zhi}自刑`), out.join(' '));
}
// 非自刑地支即使同见也不报
for (const zhi of ['子', '丑', '寅', '卯', '巳', '未', '申', '戌']) {
  const out = rels(mk(`甲${zhi}`, `丙${zhi}`, `戊${zhi}`, `庚${zhi}`));
  ok(`${zhi}${zhi} 不报自刑`, !out.some((x) => x.includes('自刑')), out.join(' '));
}

// 四柱同为辰：只报一条，不重复
const four = rels(mk('甲辰', '丙辰', '戊辰', '庚辰')).filter((x) => x.includes('自刑'));
ok('自刑去重（4 柱同支只 1 条）', four.length === 1, four.join(' '));

// ── ①b 五合只写「有合」，不抢断「化」──────────────────────
// 戊癸合火是否真化要看月令、化神与争合妒合；干支关系层不能直接写成「合化火」。
const heStems = buildRelations(mk('戊辰', '癸亥', '甲子', '丙寅')).stems.filter((x) => x.includes('合'));
ok('戊癸合标明化火待定', heStems.some((x) => x === '戊癸合（化火待定）'), heStems.join(' '));
ok('不再直接写死合化火', !heStems.some((x) => x.includes('合化火')), heStems.join(' '));
for (const [a, b] of [['甲', '己'], ['乙', '庚'], ['丙', '辛'], ['丁', '壬']]) {
  const out = buildRelations(mk(`${a}子`, `${b}丑`, '戊辰', '庚申')).stems.filter((x) => x.includes(a) && x.includes(b));
  ok(`${a}${b}合也标待定`, out.some((x) => x.includes('待定')), out.join(' '));
}

// ── ② 三刑 / 子卯刑 仍然成立 ───────────────────────────────
ok('寅巳申三刑', rels(mk('甲寅', '丁巳', '庚申', '壬子')).filter((x) => x.includes('刑')).length >= 2);
ok('子卯相刑', rels(mk('甲子', '丁卯', '庚午', '壬申')).some((x) => /子卯|卯子/.test(x)), rels(mk('甲子', '丁卯', '庚午', '壬申')).join(' '));
ok('相冲不被自刑逻辑影响', rels(mk('甲子', '丙午', '戊戌', '庚寅')).includes('子午相冲'));

// ── ③ 大运/流年支同于原局且属辰午酉亥 → 关系里带自刑 ─────────
const c = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', trueSolar: false });
const natal = ['year', 'month', 'day', 'hour'].map((k) => c.pillars[k].branch);
const SELF = ['辰', '午', '酉', '亥'];
let checked = 0;
for (const d of c.dayun.list) {
  if (!SELF.includes(d.branch) || !natal.includes(d.branch)) continue;
  checked += 1;
  ok(`大运 ${d.ganzhi} 与命局同支判自刑`, (d.relations || []).some((x) => x.includes('自刑')), (d.relations || []).join(''));
}
ok('本命盘确实覆盖到自刑场景', checked > 0, `${checked} 步大运`);

// ── ④ 五行占比权重：天干 1.0 + 藏干 1/0.5/0.3 ────────────────
const W = [1, 0.5, 0.3];
let expected = 0;
for (const k of ['year', 'month', 'day', 'hour']) {
  expected += 1;
  HIDDEN_STEMS[c.pillars[k].branch].forEach((_, i) => { expected += W[i] ?? 0.1; });
}
const actual = Object.values(c.wuxing).reduce((a, b) => a + b, 0);
ok('五行总量 = 天干 + 藏干加权', Math.abs(actual - expected) <= 0.2, `${actual.toFixed(2)} vs ${expected.toFixed(2)}`);

// 藏干顺序与本气/中气/余气标注（权重按这个顺序取，顺序错了权重就错了）
const chenChart = buildBazi({ year: 2024, month: 4, day: 10, hour: 12, gender: 'male', trueSolar: false });
ok('辰月藏干顺序 = 戊乙癸', chenChart.pillars.month.branch === '辰'
  && chenChart.pillars.month.hidden.map((h) => h.stem).join('') === '戊乙癸',
chenChart.pillars.month.hidden.map((h) => h.stem).join(''));
ok('藏干 role 依次为本气/中气/余气', chenChart.pillars.month.hidden.map((h) => h.role).join('/') === '本气/中气/余气',
  chenChart.pillars.month.hidden.map((h) => h.role).join('/'));
