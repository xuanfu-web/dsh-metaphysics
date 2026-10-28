// 奇门天盘干：干宫生克与干对月令的旺衰。
//
// 这两层都能从「天干五行 + 洛书宫五行 + 月支五行」独立推出，所以不照抄实现里的表：
//   ① 用天干五行与宫五行重推 stemPalaceRelation 的全部 10×9 组合；
//   ② 合成宫位验 比和 / 干克宫 / 宫克干 / 干生宫 / 宫生干 五侧与缺参情形；
//   ③ 扫 60 个真实盘，逐宫把 stemElement / stemRelation / stemState 用独立公式复算；
//   ④ 验天盘干（三奇六仪 9 个）都能出现（防死表），且五种状态都能出现；
//   ⑤ 三处可见：摘要「干 …」、解读「月令旺衰」段的干与干宫生克、面板「干旺衰」「干宫生克」；
//   ⑥ 旧结果（无 stemState / stemRelation）不炸。
import fs from 'node:fs';
import vm from 'node:vm';
import { buildQimen, stemPalaceRelation, monthState, QIMEN_STATE_TABLES } from '../engine/qimen.js';
import { interpretQimen } from '../engine/qimen-interpret.js';
import { compute } from '../engine/index.js';
import { ok, eq } from './_harness.mjs';

// ── 独立推导用的表 ────────────────────────────────────────────
// 天干五行：甲乙木、丙丁火、戊己土、庚辛金、壬癸水
const STEM_ELEMENT = {
  甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土',
  己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水',
};
// 洛书九宫五行：1水 2土 3木 4木 5土 6金 7金 8土 9火
const PALACE_ELEMENT = { 1: '水', 2: '土', 3: '木', 4: '木', 5: '土', 6: '金', 7: '金', 8: '土', 9: '火' };
const SHENG = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const KE = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };
const GONGS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

/** 独立版：干五行 vs 宫五行 */
function relOf(stem, palace) {
  const se = STEM_ELEMENT[stem];
  const pe = PALACE_ELEMENT[palace];
  if (!se || !pe) return 'unknown';
  if (se === pe) return '比和';
  if (KE[se] === pe) return '干克宫';
  if (KE[pe] === se) return '宫克干';
  if (SHENG[se] === pe) return '干生宫';
  if (SHENG[pe] === se) return '宫生干';
  return 'unknown';
}
/** 独立版：五行在月令的旺相休囚死 */
function stateOf(element, monthElement) {
  if (!element || !monthElement) return 'unknown';
  if (element === monthElement) return '旺';
  if (SHENG[monthElement] === element) return '相';
  if (SHENG[element] === monthElement) return '休';
  if (KE[element] === monthElement) return '囚';
  if (KE[monthElement] === element) return '死';
  return 'unknown';
}

// ── 一、表与独立推导一致 ──────────────────────────────────────
for (const [stem, element] of Object.entries(STEM_ELEMENT)) {
  eq(`天干五行 ${stem}`, QIMEN_STATE_TABLES.stem[stem], element);
}
eq('天干表十条', Object.keys(QIMEN_STATE_TABLES.stem).length, 10);

let relChecked = 0;
let relMismatch = [];
for (const stem of Object.keys(STEM_ELEMENT)) {
  for (const gong of GONGS) {
    const got = stemPalaceRelation(stem, gong);
    const want = relOf(stem, gong);
    relChecked += 1;
    if (got.type !== want) relMismatch.push(`${stem}@${gong}: ${got.type} ≠ ${want}`);
  }
}
eq('10 干 × 9 宫 = 90 组全部复算一致', relChecked, 90);
ok('干宫生克无一处不符', relMismatch.length === 0, relMismatch.slice(0, 5).join('；'));
ok('干宫关系带五行与说明', ['甲', '辛'].every((st) => {
  const r = stemPalaceRelation(st, '9');
  return r.stem && r.palace && r.note && r.note.length >= 4;
}), JSON.stringify(stemPalaceRelation('辛', '9')));

// ── 二、合成盘：五侧与缺参 ────────────────────────────────────
const fake = (stem, palace) => stemPalaceRelation(stem, palace);
eq('辛金在离九：宫克干', fake('辛', '9').type, '宫克干');
eq('乙木在坤二：干克宫', fake('乙', '2').type, '干克宫');
eq('甲木在震三：比和', fake('甲', '3').type, '比和');
eq('壬水在巽四：干生宫？', fake('壬', '4').type, relOf('壬', '4'));
eq('丙火在乾六：火克金，干克宫', fake('丙', '6').type, '干克宫');
eq('丙火在坎一：水克火，宫克干', fake('丙', '1').type, '宫克干');
eq('戊土在坎一：干克宫', fake('戊', '1').type, '干克宫');
eq('缺干返回 unknown', fake('', '9').type, 'unknown');
eq('缺宫返回 unknown', fake('甲', '10').type, 'unknown');
eq('宫号缺省返回 unknown', fake('甲', undefined).type, 'unknown');

// ── 三、扫真实盘：逐宫复算 ────────────────────────────────────
{
  const seenStem = new Set();
  const seenType = new Set();
  const seenState = new Set();
  let charts = 0;
  let palaceChecked = 0;
  const bad = [];
  for (let day = 1; day <= 28; day += 3) {
    for (let hour = 1; hour <= 23; hour += 4) {
      const r = buildQimen({ year: 2026, month: 7, day, hour, minute: 0 });
      charts += 1;
      const mo = r.month && r.month.element;
      if (!mo) bad.push('缺月令五行');
      for (const p of r.palaces) {
        palaceChecked += 1;
        seenStem.add(p.tianPan);
        seenType.add(p.stemRelation.type);
        seenState.add(p.stemState);
        if (p.stemElement !== STEM_ELEMENT[p.tianPan]) bad.push(`${p.palace}宫干五行 ${p.tianPan}`);
        if (p.stemRelation.type !== relOf(p.tianPan, p.palace)) bad.push(`${p.palace}宫${p.tianPan} 关系`);
        if (p.stemRelation.note !== stemPalaceRelation(p.tianPan, p.palace).note) bad.push(`${p.palace}宫说明`);
        if (p.stemState !== stateOf(STEM_ELEMENT[p.tianPan], mo)) bad.push(`${p.palace}宫${p.tianPan} 旺衰`);
      }
      const c = r.centerPalace;
      if (c.tianPan && c.stemState !== stateOf(STEM_ELEMENT[c.tianPan], mo)) bad.push('中五宫旺衰');
      if (c.tianPan && c.stemRelation.type !== relOf(c.tianPan, '5')) bad.push('中五宫关系');
    }
  }
  eq('扫盘数量', charts, 60);
  eq('逐宫复算无一处不符', bad.length, 0);
  eq('扫过的宫数', palaceChecked, 60 * 8);
  ok('天盘干九个都能出现（三奇六仪，甲不上盘）', seenStem.size === 9 && !seenStem.has('甲'), [...seenStem].join(''));
  ok('五种干宫关系都能出现（防死表）', seenType.size === 5, [...seenType].join('、'));
  ok('五种干旺衰都能出现', seenState.size === 5, [...seenState].join('、'));
}

// ── 四、states.stem 汇总与逐宫一致 ───────────────────────────
{
  const r = buildQimen({ year: 2024, month: 6, day: 15, hour: 15, minute: 0 });
  const order = ['旺', '相', '休', '囚', '死'];
  const stemsInStates = [];
  for (const k of order) {
    if (!Array.isArray(r.states.stem[k])) { ok(`states.stem 有「${k}」桶`, false); continue; }
    stemsInStates.push(...r.states.stem[k]);
  }
  const expect = r.palaces.filter((p) => p.tianPan).map((p) => p.tianPan).sort().join('');
  eq('states.stem 正好覆盖八宫天盘干', stemsInStates.slice().sort().join(''), expect);
  const byState = {};
  for (const p of r.palaces) {
    if (!p.tianPan) continue;
    (byState[p.stemState] = byState[p.stemState] || []).push(p.tianPan);
  }
  let same = true;
  for (const k of order) {
    const a = (byState[k] || []).slice().sort().join('');
    const b = (r.states.stem[k] || []).slice().sort().join('');
    if (a !== b) same = false;
  }
  ok('逐宫 stemState 与 states.stem 一致', same, JSON.stringify(byState));
  eq('中五宫也有干旺衰', monthState(QIMEN_STATE_TABLES.stem[r.centerPalace.tianPan], r.month.element), r.centerPalace.stemState);
}

// ── 五、三处可见：摘要 / 解读 / 面板 ──────────────────────────
{
  const r = buildQimen({ year: 2024, month: 6, day: 15, hour: 15, minute: 0 });
  const summary = compute({ system: 'qimen', datetime: '2024-06-15T15:00' }).summary;
  const stateLin = summary.split('\n').find((l) => l.includes('【旺衰】')) || '';
  ok('摘要旺衰行带「干」', stateLin.includes('　干 '), stateLin);
  ok('摘要旺衰行的干来自盘面', Object.values(r.states.stem).flat().every((st) => stateLin.includes(st)), stateLin);
  ok('摘要旺衰行仍带门与星', stateLin.includes('门 ') && stateLin.includes('星 '));

  const it = interpretQimen(r, { direction: 'career' });
  const sec = it.sections.find((s) => s.key === 'states');
  ok('解读有「月令旺衰」段', !!sec);
  ok('解读的旺衰段提到天盘干', !!sec && sec.text.includes('天盘干'), sec && sec.text.slice(0, 40));
  ok('解读的旺衰段含干宫生克', !!sec && sec.text.includes('干宫的落宫关系'), sec && sec.text.trim().slice(-80));
  const relTypes = new Set(r.palaces.filter((p) => p.tianPan).map((p) => p.stemRelation.type));
  ok('解读列出实际出现的干宫关系', !!sec && [...relTypes].every((t) => sec.text.includes(t)), [...relTypes].join('、'));
  ok('解读不再声称天盘干旺衰未纳入',
    !it.sections.some((s) => s.text.includes('天盘干的旺衰未纳入')));

  const sandbox = { window: {}, console };
  vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
  const PP = sandbox.window.__PP;
  const html = PP.qimenFactsHTML(r);
  ok('面板事实表有「干旺衰」', html.includes('<dt>干旺衰</dt>'), html.slice(0, 80));
  ok('面板事实表有「干宫生克」', html.includes('<dt>干宫生克</dt>'));
  const dd = (label) => (html.match(new RegExp(`<dt>${label}</dt><dd>([^<]*)</dd>`)) || [])[1] || '';
  ok('干旺衰值非空', dd('干旺衰') !== '—' && dd('干旺衰').length > 0, dd('干旺衰'));
  ok('干宫生克值带关系名', /干克宫|宫克干|干生宫|宫生干|比和/.test(dd('干宫生克')), dd('干宫生克'));
  const grid = PP.qimenHTML(r);
  ok('九宫格标出干宫关系', /pp-qm-bot/.test(grid) && grid.includes('宫克干'), grid.slice(0, 60));

  // 转义：干名被污染也不能变成标签
  const evil = JSON.parse(JSON.stringify(r));
  evil.palaces[0].stemRelation.type = '<img src=x onerror=alert(1)>';
  const evilHtml = PP.qimenFactsHTML(evil);
  ok('干宫关系里的标签被转义', !/<img/i.test(evilHtml), evilHtml.slice(0, 80));
}

// ── 六、旧结果兼容：没有 stemState / stemRelation 也不能炸 ────
{
  const r = buildQimen({ year: 2024, month: 6, day: 15, hour: 15, minute: 0 });
  const old = JSON.parse(JSON.stringify(r));
  delete old.states.stem;
  for (const p of old.palaces) { delete p.stemState; delete p.stemRelation; delete p.stemElement; }
  delete old.centerPalace.stemState;
  delete old.centerPalace.stemRelation;

  const it = interpretQimen(old, { direction: 'career' });
  const sec = it.sections.find((s) => s.key === 'states');
  ok('旧结果仍出旺衰段', !!sec);
  ok('旧结果不硬写干宫关系', !!sec && sec.text.includes('干宫的落宫关系另算'), sec && sec.text.slice(0, 40));

  const sandbox = { window: {}, console };
  vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
  const PP = sandbox.window.__PP;
  const html = PP.qimenFactsHTML(old);
  ok('旧结果面板照常渲染', html.includes('<dt>干旺衰</dt>') && html.includes('<dt>干宫生克</dt>'));
  ok('旧结果干旺衰显示占位', (html.match(/<dt>干旺衰<\/dt><dd>([^<]*)<\/dd>/) || [])[1] === '—');
}

// ── 七、确定性 ───────────────────────────────────────────────
{
  const a = buildQimen({ year: 2026, month: 10, day: 28, hour: 21, minute: 0 });
  const b = buildQimen({ year: 2026, month: 10, day: 28, hour: 21, minute: 0 });
  eq('同输入两次结果一致', JSON.stringify(a.states), JSON.stringify(b.states));
  ok('干关系是纯函数', a.palaces.every((p, i) => p.stemRelation.type === b.palaces[i].stemRelation.type));
}
