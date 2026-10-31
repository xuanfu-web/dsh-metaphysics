// B4 奇门十干克应 100 组 + 六仪入墓：表格完整性、盘面接线、摘要/解读/面板/推导链
import fs from 'node:fs';
import vm from 'node:vm';
import { compute } from '../engine/index.js';
import { buildQimen, liuYiRuMuOf, ruMuOf, QIMEN_CONDITION_TABLES } from '../engine/qimen.js';
import { SHIGAN_YING, SHIGAN_YING_SOURCE, ganyingOf } from '../engine/qimen-ganying.js';
import { ok, eq } from './_harness.mjs';

const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

// ── ① 100 组表：齐全、无重复、字段完整 ──────────────────────
eq('十干克应正好 100 组', Object.keys(SHIGAN_YING).length, 100);
const missing = [];
for (const t of STEMS) for (const d of STEMS) if (!SHIGAN_YING[t + d]) missing.push(t + d);
eq('十天干两两组合无缺', missing.join(','), '');
eq('无重复键', new Set(Object.keys(SHIGAN_YING)).size, 100);
ok('每条都有格名与取象', Object.values(SHIGAN_YING).every((x) => x.name && x.text && x.name.length >= 2 && x.text.length >= 4));
ok('底本带链接与讹字说明', /^https:\/\//.test(SHIGAN_YING_SOURCE.url) && SHIGAN_YING_SOURCE.note.includes('校正'));

// 各天干组抽一条，防整组错位
const SAMPLES = [
  ['甲', '丙', '青龙返首'], ['戊', '丙', '青龙反首'], ['乙', '辛', '青龙逃走'],
  ['丙', '甲', '飞鸟跌穴'], ['丁', '癸', '朱雀投江'], ['己', '庚', '利格反名'],
  ['庚', '丙', '太白入荧'], ['辛', '乙', '白虎猖狂'], ['壬', '丁', '干合蛇刑'], ['癸', '癸', '天网四张'],
];
for (const [t, d, name] of SAMPLES) {
  const hit = ganyingOf(t, d);
  ok(`${t}加${d} → ${name}`, hit && hit.name === name && hit.tian === t && hit.di === d && hit.text.length >= 4, hit && hit.name);
}
ok('未收录返回 null', ganyingOf('甲', 'X') === null && ganyingOf('', '甲') === null);

// ── ② 六仪入墓：六条、宫位与五行墓库一致 ────────────────────
const MU = QIMEN_CONDITION_TABLES.liuYiRuMu;
eq('六仪入墓六条', Object.keys(MU).length, 6);
ok('六仪入墓不含三奇', ['乙', '丙', '丁'].every((s) => !(s in MU)));
ok('三奇入墓仍只有三条', Object.keys(QIMEN_CONDITION_TABLES.ruMu).length === 3);
for (const [stem, palace, zhi] of [['戊', '6', '戌'], ['己', '8', '丑'], ['庚', '8', '丑'], ['辛', '4', '辰'], ['壬', '4', '辰'], ['癸', '2', '未']]) {
  ok(`六仪入墓 ${stem} → ${palace}宫${zhi}`, MU[stem] && MU[stem].palace === palace && MU[stem].zhi === zhi, JSON.stringify(MU[stem]));
}
const fake = (pairs) => pairs.map(([palace, tianPan]) => ({ palace, tianPan }));
eq('戊在乾六成立六仪入墓', liuYiRuMuOf(fake([['6', '戊']])).length, 1);
eq('戊在巽四不成立', liuYiRuMuOf(fake([['4', '戊']])).length, 0);
eq('庚在艮八成立', liuYiRuMuOf(fake([['8', '庚']])).length, 1);
eq('癸在坤二成立', liuYiRuMuOf(fake([['2', '癸']])).length, 1);
eq('三奇不判六仪入墓', liuYiRuMuOf(fake([['6', '丙'], ['2', '乙']])).length, 0);
eq('六仪不判三奇入墓', ruMuOf(fake([['6', '戊'], ['8', '庚']])).length, 0);

// ── ③ 盘面接线：每宫带 ganYing，条件与表一致 ────────────────
const r = compute({ system: 'qimen', datetime: '2026-10-31T12:00', withInterpret: true, trace: true });
ok('八宫都带十干克应', r.palaces.every((p) => p.ganYing && p.ganYing.tian && p.ganYing.di && p.ganYing.name));
ok('中宫也带十干克应', !!r.centerPalace.ganYing && r.centerPalace.ganYing.key === `${r.centerPalace.tianPan}${r.centerPalace.diPan}`);
ok('每宫克应与表逐条一致', r.palaces.every((p) => {
  const hit = SHIGAN_YING[p.tianPan + p.diPan];
  return hit && p.ganYing.name === hit.name && p.ganYing.text === hit.text;
}));
ok('conditions.liuYiRuMu 与表一致', r.conditions.liuYiRuMu.every((x) => MU[x.stem] && MU[x.stem].palace === x.palace));
ok('摘要含十干克应行', r.summary.includes('【十干克应】') && r.palaces.some((p) => r.summary.includes(p.ganYing.name)));
ok('摘要含六仪入墓字段', r.summary.includes('六仪入墓'));
const gsec = (r.interpret.sections || []).find((s) => s.key === 'ganying');
ok('解读有十干克应段', !!gsec && gsec.label === '十干克应');
ok('解读逐个列格名与取象', r.palaces.every((p) => gsec.text.includes(p.ganYing.name) && gsec.text.includes(p.ganYing.text)));
ok('解读声明只作取象不折吉凶', gsec.text.includes('不自动折吉凶'));

// ── ④ 面板与推导链 ──────────────────────────────────────────
const sandbox = { window: {}, console };
vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
const PP = sandbox.window.__PP;
const html = PP.qimenHTML(r);
ok('面板九宫格显示克应名', r.palaces.every((p) => html.includes(`${p.ganYing.tian}加${p.ganYing.di} ${p.ganYing.name}`)));
const facts = PP.qimenFactsHTML(r);
ok('面板事实表有十干克应', facts.includes('十干克应') && facts.includes(r.palaces[0].ganYing.name));
ok('面板事实表有六仪入墓', facts.includes('六仪入墓'));
const rel = (r.trace || []).find((t) => t.key === 'relations');
ok('推导链关系层含十干克应', rel && rel.inputs.some((x) => x.label === '十干克应' && x.value.includes(r.palaces[0].ganYing.name)));
ok('推导链关系层含六仪入墓', rel && rel.inputs.some((x) => x.label.includes('六仪入墓')));

// ── ⑤ 扫盘：60 个时辰都不断档 ───────────────────────────────
let charts = 0;
let cells = 0;
for (let day = 1; day <= 10; day += 1) {
  for (let hour = 0; hour < 24; hour += 4) {
    const dt = `2026-10-${String(day).padStart(2, '0')}T${String(hour).padStart(2, '0')}:00`;
    const q = compute({ system: 'qimen', datetime: dt });
    charts += 1;
    for (const p of q.palaces) {
      if (!p.ganYing || !SHIGAN_YING[p.tianPan + p.diPan]) throw new Error(`${dt} ${p.palace}宫缺克应`);
      cells += 1;
    }
  }
}
ok('扫盘 60 个时辰 / 480 宫全部有克应', charts === 60 && cells === 480, `${charts} 盘 / ${cells} 宫`);
