// 八大地支结构：只读标注的静态口径。
// 依据 docs/炳祥八字-课程知识内化.md 第 2.4 / 2.5 节：
// 年支定 A 档，四支分两营；异类支的宫位权重（年 11 / 月 36 / 日 27 / 时 16）决定静态从格概率。
import { compute } from '../engine/index.js';
import { branchStructureOf, supportOf, HIDDEN_PCT, PILLAR_WEIGHT } from '../engine/structure.js';
import { ok, eq } from './_harness.mjs';

const bazi = (datetime, extra = {}) => compute({ system: 'bazi', datetime, gender: 'male', trueSolar: false, ...extra });
const gz = (r) => ['year', 'month', 'day', 'hour'].map((k) => (r.pillars[k] ? r.pillars[k].stem + r.pillars[k].branch : '--')).join(' ');

// ── 一、宫位权重与藏干百分比表 ─────────────────────────────────
eq('干支宫位权重（干合计 10）', PILLAR_WEIGHT.stem.year + PILLAR_WEIGHT.stem.month + PILLAR_WEIGHT.stem.day + PILLAR_WEIGHT.stem.hour, 10);
eq('干支宫位权重（支合计 90）', PILLAR_WEIGHT.branch.year + PILLAR_WEIGHT.branch.month + PILLAR_WEIGHT.branch.day + PILLAR_WEIGHT.branch.hour, 90);
eq('月令一支 36 分', PILLAR_WEIGHT.branch.month, 36);
for (const [branch, table] of Object.entries(HIDDEN_PCT)) {
  const sum = Object.values(table).reduce((a, b) => a + b, 0);
  eq(`${branch}藏干百分比合计 100`, sum, 100);
}
eq('午藏丁 90 / 己 10（炳祥口径，不是丁己各半）', HIDDEN_PCT.午.丁, 90);
eq('亥藏壬 70 / 甲 30', HIDDEN_PCT.亥.甲, 30);

// ── 二、得地表：半得地不计入身强阵营 ───────────────────────────
eq('甲木见亥为得地', supportOf('甲', '亥').level, '得地');
eq('甲木见辰只算半得地', supportOf('甲', '辰').level, '半得地');
eq('戊土见寅只算半得地（20%）', supportOf('戊', '寅').weight, 0.2);
eq('庚金见巳只算半得地（10%，巳酉丑合才当金）', supportOf('庚', '巳').weight, 0.1);
eq('癸水见辰为半得地（50%）', supportOf('癸', '辰').weight, 0.5);
eq('丁火见戌不按得地（须午戌合/寅午戌）', supportOf('丁', '戌').level, '半得地');

// ── 三、八种结构：直接给四支，核 code 与静态概率 ────────────────
const mk = (branches, dayStem = '甲') => branchStructureOf({
  year: { stem: '甲', branch: branches[0] },
  month: { stem: '甲', branch: branches[1] },
  day: { stem: dayStem, branch: branches[2] },
  hour: { stem: '甲', branch: branches[3] },
}, dayStem);

const cases = [
  [['亥', '亥', '亥', '亥'], 'AAAA', 99],
  [['亥', '申', '申', '申'], 'ABBB', 80],
  [['亥', '亥', '亥', '申'], 'AAAB', 55],
  [['亥', '亥', '申', '亥'], 'AABA', 20],
  [['亥', '申', '亥', '亥'], 'ABAA', 1],
  [['亥', '亥', '申', '申'], 'AABB', 0],
  [['亥', '申', '亥', '申'], 'ABAB', 0],
  [['亥', '申', '申', '亥'], 'ABBA', null],
];
for (const [branches, code, prob] of cases) {
  const s = mk(branches);
  eq(`${code} 结构码`, s.code, code);
  eq(`${code} 静态从格概率`, s.congProb, prob);
}
eq('ABAA 的异类是月支（36 分）', mk(['亥', '申', '亥', '亥']).odd[0].weight, 36);
eq('ABBB 的异类是年支（11 分）', mk(['亥', '申', '申', '申']).odd[0].weight, 11);
eq('二对二没有异类', mk(['亥', '申', '亥', '申']).odd.length, 0);
ok('ABBA 原文未给概率，只给措辞', mk(['亥', '申', '申', '亥']).word.includes('有可能'));

// ── 四、平衡度：A 档可能是身弱阵营 ──────────────────────────────
const weakAll = mk(['亥', '亥', '亥', '亥']);
eq('四支同党时 balance 全在一档', weakAll.balance.branch.A + weakAll.balance.branch.B, 90);
eq('年支定 A 档：四支全得地时 A 档即身强阵营', weakAll.aCamp, '身强阵营');

// ── 五、接进排盘结果，且不动旺衰 ────────────────────────────────
const r = bazi('2008-12-04T01:30');
eq('样本四柱', gz(r), '戊子 癸亥 戊寅 癸丑');
const st = r.strength.branchStructure;
eq('戊土四支全不得地 → AAAA', st.code, 'AAAA');
eq('AAAA 静态从格概率 99', st.congProb, 99);
ok('四支同党且均属身弱阵营', st.detail.includes('均属身弱阵营'), st.detail);
ok('旺衰结论未被结构标注改动', ['身弱', '偏弱', '中和'].includes(r.strength.level), `${r.strength.level} ${r.strength.score}`);
ok('格局 frame 也带同一份结构', r.frame.structure && r.frame.structure.code === st.code);
ok('结构标注声明静态边界', st.note.includes('静态') && st.note.includes('合化'));

// ── 六、时柱缺失：第四支是占位值，不套概率 ─────────────────────
const three = bazi('2008-12-04T01:30', { hourUnknown: true });
const s3 = three.strength.branchStructure;
eq('三柱标记占位时支', s3.placeholderHour, true);
eq('三柱不套从格概率', s3.congProb, null);
ok('三柱写明不判结构概率', s3.congRange.includes('三柱'), s3.congRange);
ok('三柱 detail 点明占位值', s3.detail.includes('占位值'), s3.detail);
ok('frame 里的同一份结构也被标占位', three.frame.structure && three.frame.structure.placeholderHour === true);
