// B3 专旺成格 / 真从假从：状态、破格理由与全链路显示
import fs from 'node:fs';
import vm from 'node:vm';
import { compute } from '../engine/index.js';
import { ok, eq } from './_harness.mjs';

const B = (datetime, gender = 'male') => compute({ system: 'bazi', datetime, gender, trueSolar: false });
const special = (r, kind) => (r.frame.geju || []).filter((g) => g.kind === kind);

// ── ① 专旺：成格 / 待定 / 破格 ────────────────────────────────
const cheng = special(B('1961-08-15T15:30'), '专旺格');
eq('从革格数量', cheng.length, 1);
eq('从革格成格（月令申金助旺）', cheng[0] && cheng[0].status, '成格');
ok('成格无破格理由', Array.isArray(cheng[0].breaks) && cheng[0].breaks.length === 0);

const dai = special(B('1962-11-05T09:30'), '专旺格');
eq('炎上格待定（月令戌土不助旺）', dai[0] && dai[0].status, '待定');
ok('待定写明月令不助旺', dai[0].evidence.includes('不助旺'), dai[0].evidence);

const po = special(B('1950-01-03T01:30'), '专旺格');
eq('稼穑格破格（财星耗旺）', po[0] && po[0].status, '破格');
ok('破格列出财星分数', po[0].breaks.some((x) => x.includes('财')), po[0].breaks.join('；'));
ok('破格带 breakRule', typeof po[0].breakRule === 'string' && po[0].breakRule.includes('官杀'), po[0].breakRule);
ok('所有专旺状态在三档内', [cheng[0], dai[0], po[0]].every((g) => ['成格', '待定', '破格'].includes(g.status)));
ok('专旺带 status/breaks', [cheng[0], dai[0], po[0]].every((g) => typeof g.status === 'string' && Array.isArray(g.breaks)));

// ── ② 从格：真从 / 假从 ──────────────────────────────────────
const zhen = special(B('1966-06-12T13:30'), '从格');
eq('从财格真从', zhen[0] && zhen[0].status, '真从');
eq('真从根气为 0', zhen[0].rootWeight, 0);
ok('真从无破格理由', zhen[0].breaks.length === 0);

const jiaRoot = special(B('1950-01-12T01:30'), '从格');
eq('从儿格假从（有微根）', jiaRoot[0] && jiaRoot[0].status, '假从');
ok('假从记下微根重量', jiaRoot[0].rootWeight > 0 && jiaRoot[0].rootWeight < 1, String(jiaRoot[0].rootWeight));
ok('假从列出藏干微根', jiaRoot[0].breaks.some((x) => x.includes('藏')), jiaRoot[0].breaks.join('；'));

const jiaVirtual = special(B('1972-09-15T21:30'), '从格');
eq('从财格有比肩虚透 → 假从', jiaVirtual[0] && jiaVirtual[0].status, '假从');
ok('假从列出天干虚透', jiaVirtual[0].breaks.some((x) => x.includes('虚透')), jiaVirtual[0].breaks.join('；'));

const jiaSha = special(B('1969-03-25T21:30'), '从格');
eq('从杀格印比虚透 → 假从', jiaSha[0] && jiaSha[0].status, '假从');
ok('从杀假从带 breakRule', typeof jiaSha[0].breakRule === 'string' && jiaSha[0].breakRule.includes('假从'));

const zhenEr = special(B('1960-12-15T15:30'), '从格');
eq('从儿格真从', zhenEr[0] && zhenEr[0].status, '真从');

// ── ③ 摘要 / 解读 / 面板 ─────────────────────────────────────
const sum = B('1950-01-03T01:30');
ok('摘要标出专旺状态', sum.summary.includes('稼穑格[专旺格·破格]'), sum.summary.split('\n').find((l) => l.includes('稼穑')));
const fake = compute({ system: 'bazi', datetime: '1950-01-12T01:30', gender: 'male', trueSolar: false, withInterpret: true });
const gejuSec = (fake.interpret.sections || []).find((s) => s.key === 'geju');
ok('解读层写真假从与微根', gejuSec && gejuSec.text.includes('假从') && gejuSec.text.includes('微根'), gejuSec && gejuSec.text);
ok('解读层写专旺破格理由', (() => {
  const poR = compute({ system: 'bazi', datetime: '1950-01-03T01:30', gender: 'male', trueSolar: false, withInterpret: true });
  const sec = (poR.interpret.sections || []).find((s) => s.key === 'geju');
  return sec && sec.text.includes('破格') && sec.text.includes('财');
})(), '缺破格理由');

const sandbox = { window: {}, console };
vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
const PP = sandbox.window.__PP;
const sumHTML = PP.baziHTML(sum);
ok('面板 chip 标出破格', sumHTML.includes('稼穑格') && sumHTML.includes('专旺格·破格'), '缺状态');
ok('面板破格 chip 用 broken 样式', /class="pp-chip broken"[^>]*>稼穑格/.test(sumHTML), '未加 broken');
const fakeHTML = PP.baziHTML(fake);
ok('面板假从 chip 用 warn 样式', /class="pp-chip warn"[^>]*>从儿格/.test(fakeHTML), '未加 warn');
ok('面板悬停带破格理由', fakeHTML.includes('微根') && fakeHTML.includes('虚透'), '缺理由');
