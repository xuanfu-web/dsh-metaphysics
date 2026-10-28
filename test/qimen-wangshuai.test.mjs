// 奇门月令旺衰：门与星按月支五行分旺相休囚死。
//
// 验证四层：
//   ① 表：地支五行、八门五行、九星五行与传世说法逐条对拍；
//   ② 算法：五行对月令的旺相休囚死，用测试内独立的生克表重算 5×12；
//   ③ 盘面：60 个真实盘的每个宫，门/星状态与「该门五行 + 该盘月支」独立推出的结果一致；
//   ④ 三处可见：摘要【旺衰】、解读「月令旺衰」段、面板 dl 两行，且旧结果不炸。
import fs from 'node:fs';
import vm from 'node:vm';
import { compute } from '../engine/index.js';
import { buildQimen, monthState, monthElementOf, groupByState, QIMEN_STATE_TABLES } from '../engine/qimen.js';
import { interpretQimen } from '../engine/qimen-interpret.js';
import { ok } from './_harness.mjs';

// ── ① 独立重写三张表（不 import 引擎内部的表） ──────────────
const BRANCH_EL = {
  子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火',
  午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水',
};
const GATE_EL = { 休门: '水', 生门: '土', 伤门: '木', 杜门: '木', 景门: '火', 死门: '土', 惊门: '金', 开门: '金' };
const STAR_EL = { 天蓬: '水', 天任: '土', 天冲: '木', 天辅: '木', 天英: '火', 天芮: '土', 天柱: '金', 天心: '金', 天禽: '土', 禽芮: '土' };
const SHENG = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const KE = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };

// ── 表：与传世说法对拍 ──
ok('地支五行表与引擎一致', JSON.stringify(QIMEN_STATE_TABLES.branch) === JSON.stringify(BRANCH_EL),
  JSON.stringify(QIMEN_STATE_TABLES.branch));
ok('八门五行表与引擎一致', JSON.stringify(QIMEN_STATE_TABLES.gate) === JSON.stringify(GATE_EL));
ok('九星五行表与引擎一致', JSON.stringify(QIMEN_STATE_TABLES.star) === JSON.stringify(STAR_EL));
ok('月支 → 五行可查', monthElementOf('午') === '火' && monthElementOf('子') === '水' && monthElementOf('辰') === '土');

// ── ② 算法：独立重算旺相休囚死 ─────────────────────────────
function expectState(el, monthEl) {
  if (el === monthEl) return '旺';
  if (SHENG[monthEl] === el) return '相';
  if (SHENG[el] === monthEl) return '休';
  if (KE[el] === monthEl) return '囚';
  if (KE[monthEl] === el) return '死';
  return '?';
}
// ── 算法：旺相休囚死定义 ──
const ELS = ['木', '火', '土', '金', '水'];
let bad = 0;
for (const [branch, monthEl] of Object.entries(BRANCH_EL)) {
  for (const el of ELS) {
    const want = expectState(el, monthEl);
    const got = monthState(el, monthEl);
    if (want !== got) { bad += 1; ok(`${monthEl}月 ${el} → ${want}`, false, `实得 ${got}`); }
  }
}
ok('5 行 × 12 月支 全部与独立推导一致', bad === 0, `${bad} 处不符`);
ok('同气为旺（午火·火）', monthState('火', '火') === '旺');
ok('月令所生为相（午火·土）', monthState('土', '火') === '相');
ok('生月令为休（午火·木）', monthState('木', '火') === '休');
ok('克月令为囚（午火·水）', monthState('水', '火') === '囚');
ok('被月令克为死（午火·金）', monthState('金', '火') === '死');
ok('缺参数不抛，返回 unknown', monthState(null, '火') === 'unknown' && monthState('火', undefined) === 'unknown');

// ── 归堆：每门的五行只落一态 ──
const g = groupByState(Object.entries(GATE_EL).map(([name, element]) => ({ name, element })), '火');
const flat = ['旺', '相', '休', '囚', '死'].flatMap((k) => g[k]);
ok('8 门不重不漏', flat.length === 8 && new Set(flat).size === 8, flat.join('/'));
ok('午月火：景门旺', g.旺.join('/') === '景门', g.旺.join('/'));
ok('午月火：生门死门相', g.相.sort().join('/') === '死门/生门', g.相.join('/'));
ok('午月火：休门囚', g.囚.join('/') === '休门');
ok('午月火：开门惊门死', g.死.sort().join('/') === '开门/惊门', g.死.join('/'));

// ── ③ 盘面：真实盘逐宫对拍 ─────────────────────────────────
// ── 盘面：60 个真实盘逐宫核对 ──
let casts = 0;
let mism = 0;
const seenStates = new Set();
for (let day = 1; day <= 28; day += 3) {
  for (let hour = 1; hour <= 23; hour += 4) {
    const r = buildQimen({ year: 2026, month: 7, day, hour, minute: 0 });
    casts += 1;
    const monthBranch = r.siZhu.month[1];
    const monthEl = BRANCH_EL[monthBranch];
    if (r.month.branch !== monthBranch || r.month.element !== monthEl) {
      mism += 1;
      ok(`月令取自月支（day ${day} ${hour}时）`, false, `${r.month.branch}/${r.month.element} vs ${monthBranch}/${monthEl}`);
    }
    for (const p of r.palaces) {
      const wantGate = GATE_EL[p.gate];
      const wantStar = STAR_EL[p.star];
      if (p.gateState !== expectState(wantGate, monthEl) || p.starState !== expectState(wantStar, monthEl)) {
        mism += 1;
        ok(`${r.solarDate} ${p.palace}宫 状态`, false, `门 ${p.gate}/${p.gateState} 星 ${p.star}/${p.starState}`);
      }
      seenStates.add(p.gateState);
      seenStates.add(p.starState);
    }
    const gateFlat = ['旺', '相', '休', '囚', '死'].flatMap((k) => r.states.gate[k]);
    if (gateFlat.length !== 8 || new Set(gateFlat).size !== 8) {
      mism += 1;
      ok(`${r.solarDate} 八门归堆不重不漏`, false, gateFlat.join('/'));
    }
    const starFlat = ['旺', '相', '休', '囚', '死'].flatMap((k) => r.states.star[k]);
    if (starFlat.length !== 8) {
      mism += 1;
      ok(`${r.solarDate} 八宫星归堆`, false, String(starFlat.length));
    }
  }
}
ok('60 个盘的月令与逐宫状态全部对得上', casts === 60 && mism === 0, `${casts} 盘，${mism} 处不符`);
ok('五态在真实盘里都能出现（防状态写死）', seenStates.size === 5, [...seenStates].join('/'));
const one = buildQimen({ year: 2024, month: 6, day: 15, hour: 15, minute: 0 });
ok('中五宫星也有状态', one.centerPalace.star === '天禽' && ['旺', '相', '休', '囚', '死'].includes(one.centerPalace.starState),
  one.centerPalace.starState);
ok('中五宫无门，故无门状态', one.centerPalace.gateState === undefined, String(one.centerPalace.gateState));

// ── ④ 三处可见 ─────────────────────────────────────────────
// ── 摘要：一行【旺衰】 ──
const sum = compute({ system: 'qimen', datetime: '2024-06-15T15:00' }).summary;
ok('摘要含【旺衰】', /【旺衰】月令 午（火）/.test(sum), sum.split('\n').find((l) => l.startsWith('【旺衰】')) || '');
ok('摘要门态按旺相休囚死排列', /门 旺 景门　相 /m.test(sum));
ok('摘要与盘面数据一致', sum.includes('旺 景门') && sum.includes('死 惊门/开门'), sum.split('\n').find((l) => l.startsWith('【旺衰】')) || '');

// ── 解读：月令旺衰段 ──
const out = interpretQimen(buildQimen({ year: 2024, month: 6, day: 15, hour: 15, minute: 0 }), {
  question: '这次合作能不能成', direction: 'career',
});
const sec = out.sections.find((s) => s.key === 'states');
ok('sections 里有 states', !!sec, out.sections.map((s) => s.key).join(','));
ok('段标题是「月令旺衰」', sec && sec.label === '月令旺衰', sec && sec.label);
ok('写明月令与五行', sec && sec.text.includes('月令 午（火）'));
ok('写明五态定义', sec && sec.text.includes('旺为同月令之气') && sec.text.includes('死为月令所克'));
ok('声明不折吉凶', sec && sec.text.includes('不')) ;
ok('states 段在 conditions 之后', out.sections.findIndex((s) => s.key === 'states')
  > out.sections.findIndex((s) => s.key === 'conditions'));
ok('倾向段不再声称门星旺衰未纳入', !out.sections.map((s) => s.text).join('\n').includes('月令旺衰未纳入'));
const old = { ...buildQimen({ year: 2024, month: 6, day: 15, hour: 15, minute: 0 }) };
delete old.month; delete old.states;
for (const p of old.palaces) { delete p.gateState; delete p.starState; }
const oldOut = interpretQimen(old, { question: '旧结果没有月令字段' });
ok('旧结果不抛且不出 states 段', !oldOut.sections.find((s) => s.key === 'states'));

// ── 面板：事实表两行 ──
const sandbox = { window: {}, console };
vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
const PP = sandbox.window.__PP;
const panel = PP.qimenFactsHTML(buildQimen({ year: 2024, month: 6, day: 15, hour: 15, minute: 0 }));
ok('有月令行', /<dt>月令<\/dt><dd>午（火）<\/dd>/.test(panel), panel.match(/<dt>月令<\/dt><dd>[^<]*/)?.[0] || '');
ok('有门旺衰行', /<dt>门旺衰<\/dt><dd>旺 景门/.test(panel), panel.match(/<dt>门旺衰<\/dt><dd>[^<]*/)?.[0] || '');
ok('有星旺衰行', /<dt>星旺衰<\/dt><dd>旺 天英/.test(panel), panel.match(/<dt>星旺衰<\/dt><dd>[^<]*/)?.[0] || '');
ok('无月令数据时面板仍渲染', PP.qimenFactsHTML(old).includes('<dt>月令</dt><dd>—</dd>'));
const evil = JSON.parse(JSON.stringify(buildQimen({ year: 2024, month: 6, day: 15, hour: 15, minute: 0 })));
evil.states.gate.旺 = ['<img src=x onerror=alert(1)>'];
ok('门名里的标签被转义', !/<img/i.test(PP.qimenFactsHTML(evil)) && PP.qimenFactsHTML(evil).includes('&lt;img'));
