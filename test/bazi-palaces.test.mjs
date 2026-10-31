// B3 四宫口径：胎元 / 胎息 / 命宫 / 身宫
// 命宫、身宫按 Tyme 1.5.4（ziwei.pub 同一实现）复算，样本已与 tyme4ts 704 组日期逐组对齐。
import fs from 'node:fs';
import vm from 'node:vm';
import { compute } from '../engine/index.js';
import { ok, eq } from './_harness.mjs';

const BR = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const B = (datetime, gender = 'male') => compute({ system: 'bazi', datetime, gender, trueSolar: false });

const FIXTURES = [
  ['1950-01-03T01:30', '己丑 丙子 戊戌 癸丑', '丁卯', '癸卯', '戊辰', '丙寅'],
  ['1960-12-15T15:30', '庚子 戊子 丁丑 戊申', '己卯', '壬子', '乙酉', '乙酉'],
  ['1972-09-15T21:30', '壬子 己酉 己酉 乙亥', '庚子', '甲辰', '己酉', '己酉'],
  ['1990-05-12T14:30', '庚午 辛巳 丁丑 丁未', '壬申', '壬子', '辛巳', '己丑'],
  ['2000-01-01T00:00', '己卯 丙子 戊午 壬子', '丁卯', '癸未', '己巳', '丁丑'],
  ['2020-12-21T06:30', '庚子 戊子 戊戌 乙卯', '己卯', '癸卯', '戊寅', '庚辰'],
];

for (const [datetime, pillars, taiyuan, taixi, minggong, shengong] of FIXTURES) {
  const r = B(datetime);
  eq(`${datetime} 四柱`, [r.pillars.year.ganzhi, r.pillars.month.ganzhi, r.pillars.day.ganzhi, r.pillars.hour.ganzhi].join(' '), pillars);
  eq(`${datetime} 胎元`, r.palaces.taiyuan.ganzhi, taiyuan);
  eq(`${datetime} 胎息`, r.palaces.taixi.ganzhi, taixi);
  eq(`${datetime} 命宫`, r.palaces.minggong.ganzhi, minggong);
  eq(`${datetime} 身宫`, r.palaces.shengong.ganzhi, shengong);
}

// ── 结构：胎息＝日干五合、日支六合 ────────────────────────────
const STEM_HE = { 甲己: '土', 乙庚: '金', 丙辛: '水', 丁壬: '木', 戊癸: '火' };
const branchHe = (b) => BR[(1 - BR.indexOf(b) + 12) % 12];
for (const [datetime] of FIXTURES) {
  const r = B(datetime);
  const day = r.pillars.day;
  const expectStem = Object.keys(STEM_HE).find((k) => k.includes(day.stem)).replace(day.stem, '');
  eq(`${datetime} 胎息天干取五合`, r.palaces.taixi.ganzhi[0], expectStem);
  eq(`${datetime} 胎息地支取六合`, r.palaces.taixi.ganzhi[1], branchHe(day.branch));
}

// ── 结构：命宫与身宫两支序数之和恒为 6（Tyme 口径） ───────────
for (const [datetime] of FIXTURES) {
  const r = B(datetime);
  const sum = BR.indexOf(r.palaces.minggong.branch) + BR.indexOf(r.palaces.shengong.branch);
  eq(`${datetime} 命宫+身宫支序为六`, sum % 12, 6);
}

// ── 链路：摘要 / 解读 / 推导链 / 面板 ────────────────────────
const r = B('1990-05-12T14:30', 'female');
ok('摘要含胎元、胎息、命宫、身宫', ['胎元', '胎息', '命宫', '身宫'].every((x) => r.summary.includes(x)));
ok('摘要四宫值正确', r.summary.includes(`壬申`) && r.summary.includes(`壬子`) && r.summary.includes(`辛巳`) && r.summary.includes(`己丑`));

const it = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'female', trueSolar: false, withInterpret: true });
const sec = (it.interpret.sections || []).find((s) => s.key === 'palaces');
ok('解读层有胎命身一节', !!sec && sec.label === '胎命身');
ok('解读层写四宫算法与干支', sec && sec.text.includes('壬申') && sec.text.includes('壬子')
  && sec.text.includes('五合') && sec.text.includes('合数'), sec && sec.text);

const tr = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'female', trueSolar: false, trace: true });
const layer = (tr.trace || []).find((t) => t.key === 'palaces');
ok('推导链有胎命身层', !!layer && tr.trace.length === 3);
ok('推导链结果含四宫', layer && ['壬申', '壬子', '辛巳', '己丑'].every((x) => layer.result.includes(x)), layer && layer.result);

const sandbox = { window: {}, console };
vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
const PP = sandbox.window.__PP;
const html = PP.baziHTML(r);
ok('面板渲染胎息', html.includes('胎息') && html.includes('壬子'));
ok('面板四宫卡标题', html.includes('胎命身'));
ok('面板四宫值全部转义呈现', ['壬申', '壬子', '辛巳', '己丑'].every((x) => html.includes(x)));
