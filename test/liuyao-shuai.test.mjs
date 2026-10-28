// 六爻用神旺衰：月建给气、日辰给扶克，外加月破 / 暗动 / 冲空
//
// 这一层不背断语，全部由「五行生克 + 地支六冲」推出，所以测试用另一套写法
// 把每一格重算一遍，而不是拿实现自己的表去证自己。
// 盯三件事：
//   ① 月令五态与日辰五关系在 12×12 上逐格对上；
//   ② 真盘上逐爻复算，且月破 / 暗动 / 冲空三种冲法按定义分开；
//   ③ 摘要 / 解析 / 面板 / 白话四处都看得见，旧结果（没有 useGodStrength）也不炸。
import fs from 'node:fs';
import {
  buildLiuyao, hexagramFromBits, yongshenOf, yongshenStrength,
  zhiElementOf, monthStateOf, dayRelationOf,
} from '../engine/liuyao.js';
import { compute } from '../engine/index.js';
import { interpret } from '../engine/interpret.js';
import { buildAnswer, buildPlain } from '../engine/interpret-plain.js';
import { ok, eq } from './_harness.mjs';

// ── 独立录入的一套底表（与实现无关，故意分两处写） ──────────────────
const ZHI_WX = {
  子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火',
  午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水',
};
const SHENG = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const KE = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };
const CHONG = { 子: '午', 午: '子', 丑: '未', 未: '丑', 寅: '申', 申: '寅', 卯: '酉', 酉: '卯', 辰: '戌', 戌: '辰', 巳: '亥', 亥: '巳' };
const ZHIS = Object.keys(ZHI_WX);
const WXS = ['木', '火', '土', '金', '水'];

/** 自己算一遍月令五态：同气旺、月令所生相、生月令休、克月令囚、被月令克死 */
function myMonthState(el, monthEl) {
  if (el === monthEl) return '旺';
  if (SHENG[monthEl] === el) return '相';
  if (SHENG[el] === monthEl) return '休';
  if (KE[el] === monthEl) return '囚';
  if (KE[monthEl] === el) return '死';
  return '?';
}

/** 自己算一遍日辰关系：站在爻这边看，是日生我、日克我，还是我泄它、耗它 */
function myDayRelation(el, dayEl) {
  if (el === dayEl) return '比和';
  if (SHENG[dayEl] === el) return '日生';
  if (KE[dayEl] === el) return '日克';
  if (SHENG[el] === dayEl) return '泄';
  if (KE[el] === dayEl) return '耗';
  return '?';
}

const DAY = { stem: '甲', branch: '子', name: '甲子' };
const bitsOf = (mask) => Array.from({ length: 6 }, (_, i) => (mask >> i) & 1);
const lineValue = (a, b) => (a === b ? (a ? 7 : 8) : (a ? 9 : 6));
const BY_NAME = new Map();
for (let mask = 0; mask < 64; mask++) {
  const h = hexagramFromBits(bitsOf(mask));
  BY_NAME.set(h.name, bitsOf(mask));
}
const castStatic = (name, day = DAY) => buildLiuyao({ lines: BY_NAME.get(name).map((b) => (b ? 7 : 8)), dayGanZhi: day });
const castPair = (combo, day = DAY) => {
  const [a, b] = combo.split('之').map((s) => s.trim());
  const A = BY_NAME.get(a);
  const B = BY_NAME.get(b);
  return buildLiuyao({ lines: A.map((bit, i) => lineValue(bit, B[i])), dayGanZhi: day });
};

// ① 底表：地支五行十二支齐全
for (const z of ZHIS) eq(`地支五行 ${z}`, zhiElementOf(z), ZHI_WX[z]);
eq('未知地支返回 null', zhiElementOf('甲'), null);

// ② 月令五态：12 支 × 12 月 = 144 格逐格复算
let gridBad = [];
for (const z of ZHIS) {
  for (const m of ZHIS) {
    const got = monthStateOf(ZHI_WX[z], ZHI_WX[m]);
    const want = myMonthState(ZHI_WX[z], ZHI_WX[m]);
    if (got !== want) gridBad.push(`${z}/${m}:${got}≠${want}`);
  }
}
eq('月令五态 144 格全部对上', gridBad.join(','), '');

// ③ 日辰五关系：又是 144 格
let dayBad = [];
for (const z of ZHIS) {
  for (const d of ZHIS) {
    const got = dayRelationOf(ZHI_WX[z], ZHI_WX[d]);
    const want = myDayRelation(ZHI_WX[z], ZHI_WX[d]);
    if (got !== want) dayBad.push(`${z}/${d}:${got}≠${want}`);
  }
}
eq('日辰五关系 144 格全部对上', dayBad.join(','), '');

// ④ 五行齐备：五种月令态、五种日辰关系都能在底表里出现（防死表）
const ordered = (arr, order) => order.filter((x) => arr.includes(x)).join('');
eq('五种月令态都能出现', ordered(WXS.map((e) => monthStateOf(e, '木')), ['旺', '相', '休', '囚', '死']), '旺相休囚死');
eq('五种日辰关系都能出现', ordered(WXS.map((e) => dayRelationOf(e, '木')), ['日生', '日克', '比和', '泄', '耗']), '日生日克比和泄耗');

// ⑤ 真盘逐爻复算：取 12 个静卦 × 3 个月建，把每条 用神 爻的态与关系重算
{
  const months = ['寅', '午', '亥'];
  let checked = 0;
  let bad = [];
  const names = [...BY_NAME.keys()].slice(0, 12);
  for (const name of names) {
    for (const mb of months) {
      for (const direction of ['wealth', 'career', 'study']) {
        const r = castStatic(name);
        const ug = yongshenOf(r, { direction });
        if (!ug || !ug.found.length) continue;
        const st = yongshenStrength(r, ug, { monthBranch: mb, dayBranch: DAY.branch });
        if (!st) { bad.push(`${name}/${mb}/${direction}:null`); continue; }
        for (const l of st.lines) {
          checked++;
          const want = myMonthState(l.element, ZHI_WX[mb]);
          if (l.monthState !== want) bad.push(`${name}/${mb}/${direction}/${l.position}:${l.monthState}≠${want}`);
          const wantRel = myDayRelation(l.element, ZHI_WX[DAY.branch]);
          if (l.dayRelation !== wantRel) bad.push(`${name}/day/${l.position}:${l.dayRelation}≠${wantRel}`);
          if (l.monthChong !== (CHONG[l.branch] === mb)) bad.push(`${name}/${mb}:月破判错`);
        }
      }
    }
  }
  ok('真盘逐爻复算数量足够', checked >= 60, String(checked));
  eq('真盘逐爻复算无错', bad.slice(0, 5).join(','), '');
}

// ⑥ 三种冲法按定义分开：月建冲=月破、日冲静爻=暗动、日冲旬空=冲空、日冲动爻=逢日辰冲
{
  const r = castStatic('乾为天');                 // 静卦：六爻不动
  const ug = yongshenOf(r, { direction: 'career' }); // 官鬼在 4 爻午火
  const lineBranch = ug.found[0].branch;
  const monthChong = CHONG[lineBranch];
  const stMonth = yongshenStrength(r, ug, { monthBranch: monthChong, dayBranch: '子' });
  ok('月建与用神相冲 → 标月破', stMonth.lines.every((l) => CHONG[l.branch] === monthChong ? l.chongTag === '月破' : l.chongTag !== '月破'), JSON.stringify(stMonth.lines));
  ok('月破进 labels', stMonth.labels.includes('用神月破'), stMonth.labels.join(','));

  // 日辰冲静爻：把日辰设成与用神相冲的那一支
  const stDay = yongshenStrength(r, ug, { monthBranch: '寅', dayBranch: monthChong });
  const stillLine = stDay.lines.find((l) => l.branch === lineBranch);
  eq('日辰冲静爻 → 暗动', stillLine.chongTag, '暗动');
  ok('暗动进 labels', stDay.labels.includes('用神暗动'), stDay.labels.join(','));

  // 动爻被日辰冲 → 逢日辰冲（不叫暗动）：扫到一张「用神那一爻在动」的卦再用
  let moving = null;
  let ugM = null;
  let mv = null;
  outer: for (const [name, bits] of BY_NAME) {
    for (let p = 0; p < 6; p++) {
      const bent = bits.slice();
      bent[p] = 1 - bent[p];
      const chart = buildLiuyao({ lines: bits.map((bit, i) => lineValue(bit, bent[i])), dayGanZhi: DAY });
      const ugTry = yongshenOf(chart, { direction: 'career' });
      const hit = ugTry.found.find((l) => l.moving);
      if (hit) { moving = chart; ugM = ugTry; mv = hit; break outer; }
    }
  }
  ok('找到用神发动的卦用于对冲', !!mv, '');
  const stMv = yongshenStrength(moving, ugM, { monthBranch: '寅', dayBranch: CHONG[mv.branch] });
  const mvLine = stMv.lines.find((l) => l.position === mv.position);
  eq('日辰冲动爻 → 逢日辰冲', mvLine.chongTag, '逢日辰冲');

  // 旬空之爻被日辰冲 → 冲空
  const kongLine = ug.found[0];
  const fakeKong = { ...r, xunKong: [kongLine.branch] };
  const stKong = yongshenStrength(fakeKong, ug, { monthBranch: '寅', dayBranch: CHONG[kongLine.branch] });
  eq('日辰冲旬空之爻 → 冲空', stKong.lines.find((l) => l.position === kongLine.position).chongTag, '冲空');
}

// ⑦ labels 顺序：月令态按 旺相休囚死、日辰关系按 日生/日克/比和/泄/耗
{
  const r = castStatic('乾为天');
  const ug = yongshenOf(r, { direction: 'career' });
  const st = yongshenStrength(r, ug, { monthBranch: '午', dayBranch: '丑' });
  const mIdx = st.labels.filter((l) => /^用神月建/.test(l)).map((l) => '旺相休囚死'.indexOf(l.slice(4)));
  ok('月令状态标签按旺相休囚死排序', mIdx.every((v, i) => i === 0 || mIdx[i - 1] <= v), st.labels.join(','));
  const relOrder = ['用神得日辰生', '用神受日辰克', '用神与日辰比和', '用神泄于日辰', '用神耗日辰'];
  const rIdx = st.labels.filter((l) => relOrder.includes(l)).map((l) => relOrder.indexOf(l));
  ok('日辰关系标签按固定次序', rIdx.every((v, i) => i === 0 || rIdx[i - 1] <= v), st.labels.join(','));
}

// ⑧ 缺月建时只报日辰那一半；两者都没有就返回 null
{
  const r = castStatic('乾为天');
  const ug = yongshenOf(r, { direction: 'career' });
  const st = yongshenStrength(r, ug, { dayBranch: '丑' });
  eq('无月建时 month 为 null', st.month, null);
  ok('无月建时不出月令标签', !st.labels.some((l) => /^用神月建/.test(l)), st.labels.join(','));
  ok('无月建时仍有日辰标签', st.labels.some((l) => /日辰/.test(l)), st.labels.join(','));
  const stDayOnly = yongshenStrength(r, ug, {});
  ok('没给月建时自动退回日辰（日辰恒有）', !!(stDayOnly && stDayOnly.day && stDayOnly.day.branch), JSON.stringify(stDayOnly && stDayOnly.day));
  eq('没有用神就返回 null', yongshenStrength(r, null, { monthBranch: '午' }), null);
}

// ⑨ 摘要 / 解析 / 面板 / 白话四处可见（走真实入口，月建由 datetime 推）
{
  const r = compute({ system: 'liuyao', lines: [9, 8, 7, 8, 7, 8], datetime: '2024-06-15T15:00', direction: 'career' });
  ok('结果上有 useGodStrength', !!(r.useGodStrength && r.useGodStrength.labels.length), '');
  ok('摘要出「用神旺衰」行', /用神旺衰：月建 /.test(r.summary), r.summary.split('\n').slice(-4).join(' | '));
  ok('摘要的月建与引擎一致', r.summary.includes(`月建 ${r.useGodStrength.month.branch}（${r.useGodStrength.month.element}）`), '');

  const body = interpret(r, { direction: 'career' });
  const sec = (body.sections || []).find((s) => s.key === 'yongshen');
  ok('解析有用神节', !!sec, '');
  ok('解析出「时令对用神」段', /时令对用神：月建 /.test(sec.text), sec.text.slice(0, 160));
  ok('解析不再说「月建对爻的旺衰（只用了日辰）」', !/只用了日辰/.test((body.sections || []).map((s) => s.text).join('')), '');
  ok('解析声明只报状态不折成分数', /只报状态，不折成分数/.test(sec.text), '');

  const plain = buildAnswer(r, { direction: 'career' });
  ok('白话点出时令对这件事的帮/压', /(帮着的|不太帮忙|有帮有压)/.test(plain), plain.slice(0, 240));
  const plainAll = buildPlain(r, { direction: 'career' });
  ok('整段白话也提到时令', /(帮着的|不太帮忙|有帮有压)/.test(plainAll), plainAll.slice(0, 240));

  const vm = await import('node:vm');
  const sandbox = { window: { Engine: { compute } }, console };
  vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
  const PP = sandbox.window.__PP;
  const html = PP.liuyaoHTML(r);
  for (const l of r.useGodStrength.labels) ok(`面板 chip ${l}`, html.includes(l), '');
  const warnChip = r.useGodStrength.labels.filter((l) => /死|囚|月破|受日辰克|泄|耗/.test(l));
  if (warnChip.length) ok('不利的旺衰 chip 用 warn 色', warnChip.every((l) => html.includes(`pp-chip warn">${l}</span>`)), warnChip.join(','));
  const okChip = r.useGodStrength.labels.filter((l) => /旺|相|得日辰生|比和/.test(l));
  if (okChip.length) ok('有利的旺衰 chip 用 ok 色', okChip.every((l) => html.includes(`pp-chip ok">${l}</span>`)), okChip.join(','));
}

// ⑩ 旧结果（没有 useGodStrength）四处都不硬凑
{
  const r = compute({ system: 'liuyao', lines: [9, 8, 7, 8, 7, 8], datetime: '2024-06-15T15:00', direction: 'career' });
  delete r.useGodStrength;
  const sec = (interpret(r, { direction: 'career' }).sections || []).find((s) => s.key === 'yongshen');
  ok('旧结果解析里没有时令段', !/时令对用神/.test(sec.text), '');
  ok('旧结果白话不硬凑时令', !/(帮着的|不太帮忙|有帮有压)/.test(buildAnswer(r, { direction: 'career' })), '');
  const vm = await import('node:vm');
  const sandbox = { window: { Engine: { compute } }, console };
  vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
  const html = sandbox.window.__PP.liuyaoHTML(r);
  ok('旧结果面板照常渲染', html.includes('用神 官鬼'), '');
  ok('旧结果面板不出旺衰 chip', !/用神月建/.test(html), '');
}

// ⑪ 没给时间就没有月建：只报日辰（六神仍按本机当天）
{
  const r = compute({ system: 'liuyao', lines: [9, 8, 7, 8, 7, 8], direction: 'career' });
  eq('无时间时没有月建字段', r.useGodStrength.month, null);
  ok('无时间时摘要写日辰那一半', /用神旺衰：用神/.test(r.summary), r.summary.split('\n').slice(-3).join(' | '));
}

// ⑫ 确定性：同一输入两次结果逐字相同
{
  const a = compute({ system: 'liuyao', lines: [9, 8, 7, 8, 7, 8], datetime: '2024-06-15T15:00', direction: 'career' });
  const b = compute({ system: 'liuyao', lines: [9, 8, 7, 8, 7, 8], datetime: '2024-06-15T15:00', direction: 'career' });
  eq('两次算出的旺衰逐字相同', JSON.stringify(a.useGodStrength), JSON.stringify(b.useGodStrength));
}
