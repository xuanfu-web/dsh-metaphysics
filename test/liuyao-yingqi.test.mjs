// 六爻应期线索：用神逢值 / 逢冲 / 逢合 + 月建五态给快慢
//
// 知识卡 `liuyao-yingqi` 一直写着「只作时间窗口的提示」，引擎此前一行都没给。
// 这一层只做诚实的那一半：列出该留意的地支，按五态分偏速 / 偏缓 / 待解 / 未定，
// 不换算日期、不排先后、不判忌神受制。这一组盯五件事：
//   ① 12 支的冲 / 合按独立表复算，触发支只有「本支、对支、六合支」三支；
//   ② 64 卦 × 12 月 × 4 方向逐条复算：月态、月破、旬空、快慢、归并去重；
//   ③ 旬空 / 月破 / 用神两现 / 伏神 / 缺月建 / 两现快慢不一 六条边界；
//   ④ 摘要 / 解析 / 白话 / 面板四处可见，且任何一处都不出现日期；
//   ⑤ 旧结果（没有 yingqi 字段）不硬凑、不报错。
import fs from 'node:fs';
import vm from 'node:vm';
import { hexagramFromBits, buildLiuyao, yongshenOf, yingqiWindow, YINGQI_TEMPO } from '../engine/liuyao.js';
import { compute } from '../engine/index.js';
import { interpret } from '../engine/interpret.js';
import { buildAnswer } from '../engine/interpret-plain.js';
import { KNOWLEDGE } from '../engine/interpret-knowledge.js';
import { ok, eq } from './_harness.mjs';

const bitsOf = (mask) => Array.from({ length: 6 }, (_, i) => (mask >> i) & 1);
const BY_NAME = new Map();
const ALL_BITS = [];
for (let mask = 0; mask < 64; mask++) {
  const h = hexagramFromBits(bitsOf(mask));
  BY_NAME.set(h.name, bitsOf(mask));
  ALL_BITS.push(bitsOf(mask));
}
const castStatic = (name, dayGanZhi = { stem: '甲', branch: '子', name: '甲子' }) =>
  buildLiuyao({ lines: BY_NAME.get(name).map((b) => (b ? 7 : 8)), dayGanZhi });

// ── 独立表：不 import 引擎的冲合与五态判定 ────────────────────
const ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const ZHI_EL = { 子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火', 午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水' };
const SHENG = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const KE = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };
const CHONG = { 子: '午', 午: '子', 丑: '未', 未: '丑', 寅: '申', 申: '寅', 卯: '酉', 酉: '卯', 辰: '戌', 戌: '辰', 巳: '亥', 亥: '巳' };
const HE = { 子: '丑', 丑: '子', 寅: '亥', 亥: '寅', 卯: '戌', 戌: '卯', 辰: '酉', 酉: '辰', 巳: '申', 申: '巳', 午: '未', 未: '午' };
const ORDER = ['逢值', '逢冲', '逢合', '出空填实', '冲空'];

function monthOf(el, monthEl) {
  if (!el || !monthEl) return 'unknown';
  if (el === monthEl) return '旺';
  if (SHENG[monthEl] === el) return '相';
  if (SHENG[el] === monthEl) return '休';
  if (KE[el] === monthEl) return '囚';
  if (KE[monthEl] === el) return '死';
  return 'unknown';
}

function expectedWindow(result, useGod, monthBranch) {
  const found = Array.isArray(useGod.found) ? useGod.found : [];
  const fushen = Array.isArray(useGod.fushen) ? useGod.fushen : [];
  const source = found.length ? found : fushen;
  const kong = Array.isArray(result.xunKong) ? result.xunKong : String(result.xunKong || '').split('');
  const monthElement = monthBranch ? ZHI_EL[monthBranch] : null;
  const items = source.map((l) => {
    const el = ZHI_EL[l.branch];
    const monthState = monthOf(el, monthElement);
    const monthChong = !!(monthBranch && CHONG[l.branch] === monthBranch);
    const isEmpty = kong.includes(l.branch);
    const tempo = monthChong || isEmpty ? '待解'
      : monthState === 'unknown' ? '未定'
        : (monthState === '旺' || monthState === '相') ? '偏速' : '偏缓';
    return { branch: l.branch, monthState, monthChong, kong: isEmpty, tempo };
  });
  const merged = [];
  for (const it of items) {
    const rows = [[it.branch, '逢值'], [CHONG[it.branch], '逢冲'], [HE[it.branch], '逢合']];
    if (it.kong) { rows[0][1] = [rows[0][1], '出空填实']; rows[1][1] = [rows[1][1], '冲空']; }
    for (const [branch, label] of rows) {
      if (!branch) continue;
      let cur = merged.find((x) => x.branch === branch);
      if (!cur) { cur = { branch, labels: [] }; merged.push(cur); }
      for (const lb of [].concat(label)) if (!cur.labels.includes(lb)) cur.labels.push(lb);
    }
  }
  for (const t of merged) t.labels.sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b));
  const tempos = items.map((x) => x.tempo);
  const tempo = tempos.includes('待解') ? '待解'
    : tempos.every((t) => t === '偏速') ? '偏速'
      : tempos.every((t) => t === '偏缓') ? '偏缓' : '未定';
  return { viaFushen: !found.length && fushen.length > 0, items, triggers: merged, tempo };
}

// ── ① 口径与知识卡 ───────────────────────────────────────────
{
  eq('四档口径固定', YINGQI_TEMPO.join(','), '偏速,偏缓,待解,未定');
  const card = KNOWLEDGE.find((k) => k.id === 'liuyao-yingqi');
  ok('应期知识卡仍标各家有异说', !!card && card.status === 'variant', card && card.status);
  ok('知识卡写逢值/逢冲/逢合与快慢四档', /逢值、逢冲、逢合/.test(card.detail) && /偏速 \/ 偏缓 \/ 待解 \/ 未定/.test(card.detail));
  ok('知识卡写明不换算日期', /不换算日期|不排先后/.test(card.note), card.note);
  const exact = KNOWLEDGE.find((k) => k.id === 'liuyao-yingqi-exact');
  ok('具体日期仍是待核实', !!exact && exact.status === 'todo', exact && exact.status);
}

// ── ② 12 支冲合：独立表自证 + 引擎输出对上 ────────────────────
{
  eq('六合覆盖 12 支且互逆', ZHI.every((z) => HE[HE[z]] === z && HE[z] !== z), true);
  eq('六冲覆盖 12 支且互逆', ZHI.every((z) => CHONG[CHONG[z]] === z && CHONG[z] !== z), true);
  eq('冲合不重叠', ZHI.every((z) => CHONG[z] !== HE[z]), true);

  const r = { xunKong: [] };
  for (const z of ZHI) {
    const ug = { liuqin: '父母', found: [{ position: 1, branch: z, element: ZHI_EL[z] }] };
    const yq = yingqiWindow(r, ug, { monthBranch: null });
    eq(`${z}：三支为 本支/对支/六合支`, yq.triggers.map((t) => t.branch).join(','), [z, CHONG[z], HE[z]].join(','));
  }
}

// ── ③ 64 卦 × 12 月 × 4 方向逐条复算 ─────────────────────────
{
  const casts = ALL_BITS.map((bits) => ({ bits, r: buildLiuyao({ lines: bits.map((b) => (b ? 7 : 8)), dayGanZhi: { stem: '甲', branch: '子', name: '甲子' } }) }));
  const bad = [];
  let checked = 0;
  const tempos = new Set();
  const viaCount = { 正: 0, 伏: 0 };
  for (const { r } of casts) {
    for (const dir of ['wealth', 'career', 'study', 'health']) {
      const ug = yongshenOf(r, { direction: dir });
      if (!ug.liuqin) continue;
      for (const mo of [...ZHI, null]) {
        const got = yingqiWindow(r, ug, { monthBranch: mo });
        if (!got) { bad.push(`${r.ben.name}/${dir}/${mo} 返回 null`); continue; }
        const exp = expectedWindow(r, ug, mo);
        checked += 1;
        tempos.add(got.tempo);
        viaCount[got.viaFushen ? '伏' : '正'] += 1;
        if (got.tempo !== exp.tempo) bad.push(`${r.ben.name}/${dir}/${mo} 快慢 ${got.tempo}≠${exp.tempo}`);
        if (got.viaFushen !== exp.viaFushen) bad.push(`${r.ben.name}/${dir}/${mo} 伏神标记不符`);
        if (got.items.length !== exp.items.length) bad.push(`${r.ben.name}/${dir}/${mo} 条目数不符`);
        for (let i = 0; i < exp.items.length; i++) {
          const g = got.items[i];
          const e = exp.items[i];
          if (g.branch !== e.branch) bad.push(`${r.ben.name}/${dir}/${mo} 第${i}条支 ${g.branch}≠${e.branch}`);
          if (g.element !== ZHI_EL[e.branch]) bad.push(`${r.ben.name}/${dir}/${mo} 五行 ${g.element}`);
          if (g.monthState !== e.monthState) bad.push(`${r.ben.name}/${dir}/${mo} 月态 ${g.monthState}≠${e.monthState}`);
          if (g.monthChong !== e.monthChong) bad.push(`${r.ben.name}/${dir}/${mo} 月破不符`);
          if (g.kong !== e.kong) bad.push(`${r.ben.name}/${dir}/${mo} 旬空不符`);
          if (g.tempo !== e.tempo) bad.push(`${r.ben.name}/${dir}/${mo} 单条快慢 ${g.tempo}≠${e.tempo}`);
        }
        const gotTrig = got.triggers.map((t) => `${t.branch}:${t.labels.join('/')}`).join(',');
        const expTrig = exp.triggers.map((t) => `${t.branch}:${t.labels.join('/')}`).join(',');
        if (gotTrig !== expTrig) bad.push(`${r.ben.name}/${dir}/${mo} 触发支\n  got ${gotTrig}\n  exp ${expTrig}`);
      }
    }
  }
  ok('复算样本足够（≥3000 盘）', checked >= 3000, String(checked));
  ok('64 卦 × 13 组月建（12 支 + 缺月建）× 4 方向逐条复算零不符', bad.length === 0, bad.slice(0, 3).join('｜'));
  ok('四种快慢都真实命中（无死规则）', YINGQI_TEMPO.every((t) => tempos.has(t)), [...tempos].join(','));
  ok('正用神与伏神两条路径都被覆盖', viaCount['正'] > 0 && viaCount['伏'] > 0, JSON.stringify(viaCount));
}

// ── ④ 六条边界 ───────────────────────────────────────────────
{
  // 旬空：用神酉金落甲戌旬（申酉空）
  const kongCast = castStatic('地火明夷', { stem: '甲', branch: '戌', name: '甲戌' });
  const kongUg = yongshenOf(kongCast, { direction: 'study' });
  const kongYq = yingqiWindow(kongCast, kongUg, { monthBranch: '寅' });
  eq('旬空：快慢记待解', kongYq.tempo, '待解');
  eq('旬空：三支不变', kongYq.triggers.map((t) => t.branch).join(','), '酉,卯,辰');
  eq('旬空：本支加出空填实', kongYq.triggers[0].labels.join('/'), '逢值/出空填实');
  eq('旬空：对支加冲空', kongYq.triggers[1].labels.join('/'), '逢冲/冲空');
  ok('旬空：条目里标出空', kongYq.items[0].kong === true && /旬空/.test(kongYq.items[0].tempoSay), kongYq.items[0].tempoSay);

  // 月破：辰土用神遇戌月（日取甲寅，旬空子丑，避开设词干扰）
  const cleanDay = { stem: '甲', branch: '寅', name: '甲寅' };
  const chongCast = castStatic('乾为天', cleanDay);
  const chongUg = yongshenOf(chongCast, { direction: 'study' });
  const chongYq = yingqiWindow(chongCast, chongUg, { monthBranch: '戌' });
  eq('月破：快慢记待解', chongYq.tempo, '待解');
  eq('月破：只标被冲的那条', chongYq.items.map((x) => x.monthChong).join(','), 'true,false');
  ok('月破不追加出空标签', !chongYq.triggers.some((t) => t.labels.includes('出空填实')));

  // 用神两现：辰与戌互冲，触发支归并去重
  const two = yingqiWindow(chongCast, chongUg, { monthBranch: '卯' });
  eq('两现：两条目', two.items.length, 2);
  eq('两现：触发支去重后四支', two.triggers.map((t) => t.branch).join(','), '辰,戌,酉,卯');
  eq('两现：辰同时是逢值与逢冲', two.triggers[0].labels.join('/'), '逢值/逢冲');
  eq('两现：标签按固定次序排', two.triggers.map((t) => t.labels.join('/')).join(','), '逢值/逢冲,逢值/逢冲,逢合,逢合');
  eq('两现：快慢一致（同五行同月态）', two.tempo, '偏缓');
  eq('两现：标签不重复', new Set(two.labels).size, two.labels.length);

  // 伏神：用神不上卦时取伏神
  const fuCast = castStatic('地雷复');
  const fuUg = yongshenOf(fuCast, { direction: 'study' });
  const fuYq = yingqiWindow(fuCast, fuUg, { monthBranch: '子' });
  eq('伏神：viaFushen 为真', fuYq.viaFushen, true);
  eq('伏神：支取自伏神巳火', fuYq.items[0].branch, '巳');
  eq('伏神：触发支按巳火算', fuYq.triggers.map((t) => t.branch).join(','), '巳,亥,申');

  // 缺月建：快慢未定
  const noMonth = yingqiWindow(chongCast, chongUg, { monthBranch: null });
  eq('缺月建：快慢未定', noMonth.tempo, '未定');
  ok('缺月建：每条都记未定', noMonth.items.every((x) => x.tempo === '未定' && x.monthState === 'unknown'));
  eq('缺月建：month 为 null', noMonth.month, null);

  // 两现快慢不一：直接构造不同五行的用神（现实里同一六亲同五行，这里测归并规则）
  const mixed = yingqiWindow({ xunKong: [] }, {
    liuqin: '父母',
    found: [
      { position: 1, branch: '子', element: '水' }, // 寅月：水生木，休 → 偏缓
      { position: 2, branch: '午', element: '火' }, // 寅月：木生火，相 → 偏速
    ],
  }, { monthBranch: '寅' });
  eq('两现一速一缓：整体记未定', mixed.tempo, '未定');
  eq('两现一速一缓：单条各自保留', mixed.items.map((x) => x.tempo).join(','), '偏缓,偏速');

  // 空入参
  eq('无用神返回 null', yingqiWindow({}, null), null);
  eq('没有六亲返回 null', yingqiWindow({}, { found: [], fushen: [] }), null);
  eq('六亲在但两处都空返回 null', yingqiWindow({}, { liuqin: '父母', found: [], fushen: [] }), null);
}

// ── ⑤ 四处可见 + 旧结果兼容 + 不出现日期 ─────────────────────
{
  const lines = BY_NAME.get('乾为天').map((b) => (b ? 7 : 8));
  const RESULT = compute({ system: 'liuyao', lines, datetime: '2024-03-15T10:00', direction: 'study' });
  ok('compute 结果挂了 yingqi', !!(RESULT.yingqi && RESULT.yingqi.triggers.length), JSON.stringify(RESULT.yingqi && RESULT.yingqi.labels));
  ok('摘要带应期行', /应期线索：偏缓 · 逢值\/逢冲辰/.test(RESULT.summary), (RESULT.summary.match(/应期线索：.*/) || [''])[0]);
  ok('摘要写明只列地支', /只列地支，不出日期/.test(RESULT.summary));
  ok('摘要不出现日期', !/\d{4}[-年]\d{1,2}[-月]\d{1,2}/.test(RESULT.summary));

  const it = interpret(RESULT, { direction: 'study' });
  const sec = (it.sections || []).find((x) => x.key === 'yingqi');
  ok('解析有应期线索段', !!sec, (it.sections || []).map((x) => x.key).join(','));
  ok('解析写快慢与可留意地支', /应期快慢：用神失月令之气/.test(sec.text) && /可留意的地支：辰（逢值、逢冲）/.test(sec.text), sec.text.slice(0, 90));
  ok('解析写明不换算日期、不判忌神受制', /不换算成具体日期/.test(sec.text) && /不判忌神受制/.test(sec.text));
  ok('解析不出现日期', !/\d{4}[-年]\d{1,2}[-月]\d{1,2}/.test(sec.text));
  const limits = (it.sections || []).find((x) => x.key === 'limits');
  ok('「未纳入」写明应期只到触发支与快慢', /应期的具体日期（只给逢值\/逢冲\/逢合的触发支与快慢方向）/.test(limits.text), limits.text.slice(0, 80));

  const plain = buildAnswer(RESULT, { direction: 'study' }, {});
  ok('白话带应期提示', /应期上大体偏远/.test(plain) && /传统会留意辰、戌、酉、卯这几个地支/.test(plain), plain.slice(-120));
  ok('白话写明不换算具体哪天', /不换算成具体哪天/.test(plain));
  ok('白话不出现日期', !/\d{4}[-年]/.test(plain));

  const sandbox = { window: {}, console };
  vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
  const html = sandbox.window.__PP.liuyaoHTML(RESULT);
  ok('面板输出快慢 chip', html.includes('应期偏缓'));
  ok('面板输出每个触发支 chip', RESULT.yingqi.labels.every((l) => html.includes(l)), RESULT.yingqi.labels.join(','));
  ok('面板 chip 带不出日期提示', /只列地支，不出日期/.test(html));

  // 旧结果：没有 yingqi 字段，三处都不硬凑
  const old = JSON.parse(JSON.stringify(RESULT));
  delete old.yingqi;
  ok('旧结果解析不出应期段', !(interpret(old, { direction: 'study' }).sections || []).some((x) => x.key === 'yingqi'));
  ok('旧结果白话不硬凑应期', !/应期上大体/.test(buildAnswer(old, { direction: 'study' }, {})));
  ok('旧结果面板不出应期 chip', !/应期偏速|应期偏缓|应期待解|应期未定/.test(sandbox.window.__PP.liuyaoHTML(old)));
}

// ── ⑥ 确定性 + 未指定方向不挂 ────────────────────────────────
{
  const lines = BY_NAME.get('乾为天').map((b) => (b ? 7 : 8));
  const a = compute({ system: 'liuyao', lines, datetime: '2024-03-15T10:00', direction: 'study' });
  const b = compute({ system: 'liuyao', lines, datetime: '2024-03-15T10:00', direction: 'study' });
  eq('同一输入两次结果一致', JSON.stringify(a.yingqi), JSON.stringify(b.yingqi));
  eq('同一输入两次摘要一致', a.summary, b.summary);

  const noDir = compute({ system: 'liuyao', lines, datetime: '2024-03-15T10:00' });
  ok('未指定方向时不挂 yingqi', !noDir.yingqi);

  ok('条目里没有日期字段', a.yingqi.items.every((x) => !('date' in x) && !('when' in x) && !('day' in x)));
  ok('触发支都是十二支之一', a.yingqi.triggers.every((t) => ZHI.includes(t.branch)), a.yingqi.triggers.map((t) => t.branch).join(','));
  ok('标签不带数字', a.yingqi.labels.every((l) => !/\d/.test(l)), a.yingqi.labels.join(','));
}
