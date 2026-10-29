// 六爻「全卦逐爻月建旺衰」：六爻每一爻都给月令五态与日辰五关系
//
// 与用神旺衰同一套判定，区别只在不挑用神，所以测试的重点是「全」与「不错位」：
//   ① 12 张静卦 × 3 个月建，逐爻用另一套写法重算五态与五关系；
//   ② 五态分布之和恒为 6，世应各一，动爻与旬空原样带出；
//   ③ 月破 / 暗动 / 冲空 / 逢日辰冲 四种冲法按定义分开（合成爻直接构造）；
//   ④ 不指定用神也要出全卦旺衰；摘要 / 解析 / 白话 / 面板四处可见；
//   ⑤ 「未纳入」里不再写全卦逐爻旺衰；旧结果（没有 hexStrength）不炸。
import fs from 'node:fs';
import vm from 'node:vm';
import { buildLiuyao, hexagramFromBits, hexagramStrength } from '../engine/liuyao.js';
import { compute } from '../engine/index.js';
import { interpret } from '../engine/interpret.js';
import { buildAnswer, buildPlain } from '../engine/interpret-plain.js';
import { ok, eq } from './_harness.mjs';

// ── 独立录入的底表（与实现分两处写）────────────────────────────
const ZHI_WX = {
  子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火',
  午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水',
};
const SHENG = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const KE = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };
const CHONG = { 子: '午', 午: '子', 丑: '未', 未: '丑', 寅: '申', 申: '寅', 卯: '酉', 酉: '卯', 辰: '戌', 戌: '辰', 巳: '亥', 亥: '巳' };
const ORDER = ['旺', '相', '休', '囚', '死'];

function myMonthState(el, monthEl) {
  if (el === monthEl) return '旺';
  if (SHENG[monthEl] === el) return '相';
  if (SHENG[el] === monthEl) return '休';
  if (KE[el] === monthEl) return '囚';
  if (KE[monthEl] === el) return '死';
  return '?';
}
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
const MASKS = [0, 1, 2, 3, 5, 6, 9, 10, 17, 20, 33, 63];
const CASTS = MASKS.map((mask) => ({
  mask,
  name: hexagramFromBits(bitsOf(mask)).name,
  r: buildLiuyao({ lines: bitsOf(mask).map((b) => (b ? 7 : 8)), dayGanZhi: DAY }),
}));

// ── ① 12 张静卦 × 3 个月建：逐爻独立重算 ─────────────────────
{
  const months = ['寅', '午', '戌'];
  const bad = [];
  let cells = 0;
  for (const { name, r } of CASTS) {
    eq(`${name}：六爻齐全`, r.ben.lines.length, 6);
    for (const monthBranch of months) {
      const hs = hexagramStrength(r, { monthBranch, dayBranch: DAY.branch });
      const monthEl = ZHI_WX[monthBranch];
      const dayEl = ZHI_WX[DAY.branch];
      for (const l of hs.lines) {
        cells += 1;
        const el = ZHI_WX[l.branch];
        const wantState = myMonthState(el, monthEl);
        const wantRel = myDayRelation(el, dayEl);
        if (l.element !== el) bad.push(`${name}${l.position}爻五行:${l.element}≠${el}`);
        if (l.monthState !== wantState) bad.push(`${name}${l.position}爻${monthBranch}月:${l.monthState}≠${wantState}`);
        if (l.dayRelation !== wantRel) bad.push(`${name}${l.position}爻日:${l.dayRelation}≠${wantRel}`);
        if (l.monthChong !== (CHONG[l.branch] === monthBranch)) bad.push(`${name}${l.position}爻月冲标记错`);
        if (l.dayChong !== (CHONG[l.branch] === DAY.branch)) bad.push(`${name}${l.position}爻日冲标记错`);
      }
    }
  }
  ok('12 卦 × 3 月 × 6 爻逐格复算', bad.length === 0, bad.slice(0, 5).join(' ') || `${cells} 格`);
}

// ── ② 分布、世应、动爻、旬空 ──────────────────────────────────
{
  const hs = hexagramStrength(CASTS[3].r, { monthBranch: '午', dayBranch: DAY.branch });
  const sum = ORDER.reduce((n, k) => n + hs.counts[k], 0);
  eq('五态分布之和恒为六', sum, 6);
  eq('分布键齐全（无状态也留 0）', Object.keys(hs.counts).sort().join(','), ORDER.slice().sort().join(','));
  eq('世爻唯一', hs.lines.filter((l) => l.shi).length, 1);
  eq('应爻唯一', hs.lines.filter((l) => l.ying).length, 1);
  eq('世爻位次与盘面一致', hs.lines.find((l) => l.shi).position, CASTS[3].r.ben.shi);
  eq('应爻位次与盘面一致', hs.lines.find((l) => l.ying).position, CASTS[3].r.ben.ying);
  eq('静卦无动爻', hs.lines.filter((l) => l.moving).length, 0);
  const kongWant = [...CASTS[3].r.xunKong]
    .filter((z) => CASTS[3].r.ben.lines.some((l) => l.branch === z));
  const kongGot = hs.lines.filter((l) => l.kong).map((l) => l.branch).sort();
  eq('旬空爻与盘面一致', kongGot.join(','), kongWant.sort().join(','));
  eq('最旺爻只取月建旺', hs.strongest.join(','), hs.lines.filter((l) => l.monthState === '旺').map((l) => l.position).join(','));
}

// ── ③ 四种冲法按定义分开（合成爻构造）────────────────────────
{
  const mk = (branch, { moving = false, kong = '' } = {}) => ({
    ben: {
      shi: 1,
      ying: 4,
      lines: [1, 2, 3, 4, 5, 6].map((p) => ({
        position: p, name: `${p}爻`, branch: p === 1 ? branch : '子', element: ZHI_WX[p === 1 ? branch : '子'],
        liuqin: '兄弟', moving: p === 1 ? moving : false, ganzhi: `甲${p === 1 ? branch : '子'}`,
      })),
    },
    dayGanZhi: { branch: '子' },
    xunKong: kong,
  });
  eq('月建冲爻 → 月破', hexagramStrength(mk('午'), { monthBranch: '子' }).lines[0].chongTag, '月破');
  eq('日辰冲静爻 → 暗动', hexagramStrength(mk('午'), { monthBranch: '寅' }).lines[0].chongTag, '暗动');
  eq('日辰冲旬空之爻 → 冲空', hexagramStrength(mk('午', { kong: '午未' }), { monthBranch: '寅' }).lines[0].chongTag, '冲空');
  eq('日辰冲动爻 → 逢日辰冲', hexagramStrength(mk('午', { moving: true }), { monthBranch: '寅' }).lines[0].chongTag, '逢日辰冲');
  ok('月破优先于日冲', hexagramStrength(mk('午'), { monthBranch: '子' }).lines[0].chongTag === '月破');
  const tags = hexagramStrength(mk('午'), { monthBranch: '子' }).labels.filter((l) => /月破|暗动|冲空|逢日辰冲/.test(l));
  ok('冲法标签只标实际发生的', tags.length === 1 && tags[0] === '月破1爻', tags.join(','));
}

// ── ④ 缺月建 / 缺日辰 / 缺盘 ─────────────────────────────────
{
  const onlyDay = hexagramStrength(CASTS[0].r, { dayBranch: '丑' });
  ok('缺月建时只给日辰一半', onlyDay.month === null && onlyDay.lines.every((l) => l.monthState === 'unknown'), 'month=null');
  eq('缺月建时不编月令标签', onlyDay.labels.filter((l) => /全卦[旺相休囚死]/.test(l)).length, 0);
  eq('没有日辰与月建就返回 null', hexagramStrength({ ben: CASTS[0].r.ben }, { monthBranch: null, dayBranch: null }), null);
  eq('空盘返回 null', hexagramStrength(null, { monthBranch: '寅' }), null);
}

// ── ⑤ 不指定用神也要出全卦旺衰 ───────────────────────────────
const RESULT = compute({ system: 'liuyao', lines: [7, 8, 9, 7, 8, 6], datetime: '2026-10-28T10:00' });
{
  ok('无询问方向也有 hexStrength', !!(RESULT.hexStrength && RESULT.hexStrength.labels.length), String(RESULT.hexStrength && RESULT.hexStrength.labels.length));
  ok('无询问方向时 useGod 不挂', !RESULT.useGod || !RESULT.useGod.liuqin);
  ok('摘要带全卦旺衰行', /全卦旺衰：月建/.test(RESULT.summary), (RESULT.summary.match(/全卦旺衰：.*/) || [''])[0].slice(0, 60));
  ok('摘要写五态分布', /全卦旺\d+爻/.test(RESULT.summary));

  const sec = (interpret(RESULT, {}).sections || []).find((x) => x.key === 'hexStrength');
  ok('解析有「全卦逐爻旺衰」节', !!sec, sec ? sec.label : '缺失');
  ok('解析逐爻写到六爻', (sec.text.match(/\d爻/g) || []).length >= 6, String((sec.text.match(/\d爻/g) || []).length));
  ok('解析给出五态分布', /五态分布：/.test(sec.text));
  ok('解析声明只报状态不折分数', /不折成分数/.test(sec.text));

  const limits = (interpret(RESULT, {}).sections || []).find((x) => x.key === 'limits');
  ok('「未纳入」不再写全卦逐爻旺衰', !/全卦逐爻/.test(limits.text), limits.text.slice(0, 50));
  ok('「未纳入」仍保留权重与应期', /权重/.test(limits.text) && /应期/.test(limits.text));
  ok('「未纳入」不再把化进力重整条列为空缺', !/没有计算：化进/.test(limits.text), limits.text.slice(0, 60));

  const plain = buildAnswer(RESULT, {}, {});
  ok('白话给出整张卦的气', /整张卦六爻/.test(plain), plain.slice(0, 80));
  ok('白话整段也带上', /整张卦六爻/.test(buildPlain(RESULT, {}, {})));

  const sandbox = { window: {}, console };
  vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
  const html = sandbox.window.__PP.liuyaoHTML(RESULT);
  const chips = (html.match(/全卦[旺相休囚死]\d+爻/g) || []);
  eq('面板五态 chip 数量与分布一致', chips.length, ORDER.filter((k) => RESULT.hexStrength.counts[k]).length);
  ok('面板 chip 已转义', !/全卦[^<]*<[a-z]/.test(html));
}

// ── ⑥ 旧结果兼容 ─────────────────────────────────────────────
{
  const old = JSON.parse(JSON.stringify(RESULT));
  delete old.hexStrength;
  ok('缺 hexStrength 时不产出该节', !(interpret(old, {}).sections || []).some((s) => s.key === 'hexStrength'));
  ok('缺 hexStrength 时白话不硬凑', !/整张卦六爻/.test(buildAnswer(old, {}, {})));
  const sandbox = { window: {}, console };
  vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
  ok('缺 hexStrength 时面板不出 chip', !/全卦[旺相休囚死]\d+爻/.test(sandbox.window.__PP.liuyaoHTML(old)));
}

// ── ⑦ 确定性与标签次序 ──────────────────────────────────────
{
  const a = JSON.stringify(hexagramStrength(CASTS[5].r, { monthBranch: '申', dayBranch: '寅' }));
  const b = JSON.stringify(hexagramStrength(CASTS[5].r, { monthBranch: '申', dayBranch: '寅' }));
  ok('同一卦两次结果一致', a === b);

  const hs = hexagramStrength(CASTS[5].r, { monthBranch: '申', dayBranch: DAY.branch });
  const idx = ORDER.map((k) => hs.labels.findIndex((l) => l.startsWith(`全卦${k}`))).filter((i) => i >= 0);
  ok('五态标签按旺相休囚死排序', idx.every((v, i) => i === 0 || v > idx[i - 1]), hs.labels.join(' · '));
  const shiIdx = hs.labels.findIndex((l) => l.startsWith('世爻月建'));
  const yingIdx = hs.labels.findIndex((l) => l.startsWith('应爻月建'));
  if (shiIdx >= 0 && yingIdx >= 0) ok('世在应之前', shiIdx < yingIdx, `${shiIdx}<${yingIdx}`);
  ok('标签无重复', new Set(hs.labels).size === hs.labels.length);
}
