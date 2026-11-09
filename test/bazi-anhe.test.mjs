// 暗合（炳祥中级第 15 课口径）：只作取象，不参与旺衰与格局。
// 通合：亥午、寅丑；禄合：卯申、午亥、巳子；干支暗合六组；自合取辰。
import { buildRelations } from '../engine/bazi.js';
import { compute } from '../engine/index.js';
import { ok, eq } from './_harness.mjs';

const P = (gz) => ({ stem: gz[0], branch: gz[1], ganzhi: gz });
const mk = (y, m, d, h) => ({ year: P(y), month: P(m), day: P(d), hour: P(h) });
const anhe = (pillars) => buildRelations(pillars).anhe;

// ── 一、通合 / 禄合 ────────────────────────────────────────────
const r1 = buildRelations(mk('甲午', '丁亥', '戊子', '辛巳'));
ok('亥午判通合，且不再重复标禄合', r1.anhe.includes('亥午通合（藏干双合）') && !r1.anhe.some((x) => x.includes('午亥禄合')), r1.anhe.join(' '));
ok('寅丑判通合', anhe(mk('甲寅', '乙丑', '丙辰', '丁卯')).includes('寅丑通合（藏干双合）'));
ok('卯申判禄合', anhe(mk('甲卯', '庚申', '丙子', '丁酉')).includes('卯申禄合'));
ok('巳子判禄合', anhe(mk('甲子', '辛巳', '丙子', '丁酉')).includes('巳子禄合'));

// ── 二、干支暗合与自合 ────────────────────────────────────────
for (const gz of ['甲午', '丁亥', '戊子', '辛巳', '壬午', '癸巳']) {
  ok(`${gz}干支暗合`, anhe(mk(gz, '戊辰', '庚申', '丙寅')).includes(`${gz}干支暗合`), anhe(mk(gz, '戊辰', '庚申', '丙寅')).join(' '));
}
ok('辰自合', anhe(mk('甲辰', '丙子', '戊申', '庚午')).some((x) => x.endsWith('自合')));
ok('非辰不自合', !anhe(mk('甲子', '丙子', '戊子', '庚子')).some((x) => x.includes('自合')));

// ── 三、去重与边界 ────────────────────────────────────────────
const four = r1.anhe.filter((x) => x.includes('干支暗合'));
eq('甲午/丁亥/戊子/辛巳 四柱各记一次', four.length, 4);
eq('同一柱型重复出现按柱计', anhe(mk('甲午', '丙午', '戊午', '庚午')).filter((x) => x.includes('干支暗合')).length, 1);
ok('暗合不混进 stems/branches', !r1.stems.some((x) => x.includes('暗合')) && !r1.branches.some((x) => x.includes('暗合')));
ok('返回 anheNote 声明不参与旺衰', r1.anheNote.includes('不参与旺衰'), r1.anheNote);

// ── 四、接进排盘结果的干支关系 ──────────────────────────────────
const c = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', trueSolar: false });
ok('relations 带 anhe 数组', Array.isArray(c.relations.anhe));
ok('辛巳柱识别为干支暗合', c.relations.anhe.includes('辛巳干支暗合'), c.relations.anhe.join(' '));
ok('同时带 anheNote', typeof c.relations.anheNote === 'string' && c.relations.anheNote.includes('不参与旺衰'));

// ── 五、无暗合时给空数组，不是 undefined ───────────────────────
const none = buildRelations(mk('甲子', '丙寅', '戊戌', '庚申'));
ok('无暗合时 anhe 为空数组', Array.isArray(none.anhe) && none.anhe.length === 0, none.anhe.join(' '));
