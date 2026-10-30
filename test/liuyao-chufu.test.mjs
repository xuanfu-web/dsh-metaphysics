// 六爻伏神出伏：飞伏生克 + 月建日辰 → 四档条件
//
// 知识卡一直写着「飞神生伏神、伏神克飞神、日月生扶算得力；飞神克伏神受压难出」，
// 但引擎此前只算飞伏生克，没有把月建日辰落到伏神身上。这一组盯四件事：
//   ① 64 卦 × 4 档所问，每一条伏神都按独立的五行表复算，四档不许出现死规则；
//   ② 可出 / 有助有压 / 受压难出 / 未得助 四条边界各构造一张盘钉住；
//   ③ 缺月建、缺日辰、旬空、飞伏关系未知时的退化路径；
//   ④ 摘要 / 解析 / 白话 / 面板四处可见，且不输出日期。
import fs from 'node:fs';
import vm from 'node:vm';
import { hexagramFromBits, buildLiuyao, yongshenOf, fushenAccess, FUSHEN_VERDICTS } from '../engine/liuyao.js';
import { compute } from '../engine/index.js';
import { interpret } from '../engine/interpret.js';
import { buildAnswer, buildPlain } from '../engine/interpret-plain.js';
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
const castStatic = (name, dayGanZhi) => buildLiuyao({ lines: BY_NAME.get(name).map((b) => (b ? 7 : 8)), dayGanZhi });
const castAll = (dayGanZhi) => ALL_BITS.map((bits) => buildLiuyao({ lines: bits.map((b) => (b ? 7 : 8)), dayGanZhi }));

// ── 独立五行表：不 import 引擎的判定函数 ──────────────────────
const ZHI_EL = { 子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火', 午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水' };
const SHENG = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const KE = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };
const CHONG = { 子: '午', 午: '子', 丑: '未', 未: '丑', 寅: '申', 申: '寅', 卯: '酉', 酉: '卯', 辰: '戌', 戌: '辰', 巳: '亥', 亥: '巳' };

function relOf(hiddenEl, flyingEl) {
  if (SHENG[flyingEl] === hiddenEl) return '飞生伏';
  if (SHENG[hiddenEl] === flyingEl) return '伏生飞';
  if (KE[flyingEl] === hiddenEl) return '飞克伏';
  if (KE[hiddenEl] === flyingEl) return '伏克飞';
  return '比和';
}
function monthOf(el, monthEl) {
  if (!el || !monthEl) return 'unknown';
  if (el === monthEl) return '旺';
  if (SHENG[monthEl] === el) return '相';
  if (SHENG[el] === monthEl) return '休';
  if (KE[el] === monthEl) return '囚';
  if (KE[monthEl] === el) return '死';
  return 'unknown';
}
function dayOf(el, dayEl) {
  if (!el || !dayEl) return 'unknown';
  if (el === dayEl) return '比和';
  if (SHENG[dayEl] === el) return '日生';
  if (KE[dayEl] === el) return '日克';
  if (SHENG[el] === dayEl) return '泄';
  if (KE[el] === dayEl) return '耗';
  return 'unknown';
}
function expectOf(hiddenBranch, hiddenEl, flyingEl, monthBranch, dayBranch) {
  const relation = relOf(hiddenEl, flyingEl);
  const monthState = monthBranch ? monthOf(hiddenEl, ZHI_EL[monthBranch]) : 'unknown';
  const monthChong = !!(monthBranch && CHONG[hiddenBranch] === monthBranch);
  const dayRelation = dayBranch ? dayOf(hiddenEl, ZHI_EL[dayBranch]) : 'unknown';
  const supports = [];
  if (relation === '飞生伏') supports.push('飞神生伏');
  if (relation === '伏克飞') supports.push('伏神克飞');
  if (dayRelation === '日生') supports.push('日辰生伏');
  if (dayRelation === '比和') supports.push('日辰比和');
  if (monthState === '旺') supports.push('月建同气');
  if (monthState === '相') supports.push('月建相生');
  const pressures = [];
  if (relation === '飞克伏') pressures.push('飞神克伏');
  if (dayRelation === '日克') pressures.push('日辰克伏');
  if (monthChong) pressures.push('月破');
  const verdict = supports.length && pressures.length ? '有助有压'
    : supports.length ? '可出'
      : pressures.length ? '受压难出' : '未得助';
  return { relation, monthState, monthChong, dayRelation, supports, pressures, verdict };
}
// ── ① 口径与档位表 ───────────────────────────────────────────
{
  eq('四档口径固定', FUSHEN_VERDICTS.join(','), '可出,有助有压,受压难出,未得助');
  const card = KNOWLEDGE.find((k) => k.id === 'liuyao-fushen');
  ok('知识卡存在且仍标各家有异说', !!card && card.status === 'variant', card && card.status);
  ok('知识卡写明四档', /可出 \/ 有助有压 \/ 受压难出 \/ 未得助/.test(card.detail), card.detail.slice(-60));
  ok('知识卡写明不出应期', /不出应期/.test(card.detail) && /不输出日期/.test(card.note));
  ok('知识卡写明助压的取法', /飞生伏、伏克飞、日辰生\/比和、月建旺\/相算助/.test(card.note) && /飞克伏、日辰克、月破算压/.test(card.note));
}

// ── ② 64 卦 × 4 档独立复算：每条伏神都要对上 ─────────────────
{
  const ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  const MONTHS = ZHI;
  const DAYS = ZHI;
  const casts = castAll({ stem: '甲', branch: '子', name: '甲子' });
  const bad = [];
  const verdicts = new Set();
  const relations = new Set();
  let checked = 0;
  for (const r of casts) {
    for (const dir of ['wealth', 'career', 'study', 'health']) {
      const ug = yongshenOf(r, { direction: dir });
      if (ug.found.length || !ug.fushen.length) continue;
      for (const mo of MONTHS) {
        for (const da of DAYS) {
          const fa = fushenAccess(r, ug, { monthBranch: mo, dayBranch: da });
          if (!fa) { bad.push(`${r.ben.name}/${dir}/${mo}${da} 返回 null`); continue; }
          if (fa.items.length !== ug.fushen.length) bad.push(`${r.ben.name}/${dir} 条目数不符`);
          for (let i = 0; i < ug.fushen.length; i++) {
            const f = ug.fushen[i];
            const got = fa.items[i];
            const exp = expectOf(f.branch, f.element, f.fei.element, mo, da);
            checked += 1;
            verdicts.add(got.verdict);
            relations.add(got.relation);
            if (got.relation !== exp.relation) bad.push(`${r.ben.name}/${dir}/${mo}${da} 关系 ${got.relation}≠${exp.relation}`);
            if (got.monthState !== exp.monthState) bad.push(`${r.ben.name}/${dir}/${mo}${da} 月态 ${got.monthState}≠${exp.monthState}`);
            if (got.monthChong !== exp.monthChong) bad.push(`${r.ben.name}/${dir}/${mo}${da} 月破不符`);
            if (got.dayRelation !== exp.dayRelation) bad.push(`${r.ben.name}/${dir}/${mo}${da} 日关系 ${got.dayRelation}≠${exp.dayRelation}`);
            if (got.supports.slice().sort().join(',') !== exp.supports.slice().sort().join(',')) bad.push(`${r.ben.name}/${dir}/${mo}${da} 助不符：${got.supports} vs ${exp.supports}`);
            if (got.pressures.slice().sort().join(',') !== exp.pressures.slice().sort().join(',')) bad.push(`${r.ben.name}/${dir}/${mo}${da} 压不符：${got.pressures} vs ${exp.pressures}`);
            if (got.verdict !== exp.verdict) bad.push(`${r.ben.name}/${dir}/${mo}${da} 档位 ${got.verdict}≠${exp.verdict}`);
          }
        }
      }
    }
  }
  ok('复算样本足够（≥5000 条伏神）', checked >= 5000, String(checked));
  ok('64 卦 × 4 档 × 12 月 × 12 日逐条复算零不符', bad.length === 0, bad.slice(0, 4).join('｜'));
  ok('四档都真实命中（无死规则）', FUSHEN_VERDICTS.every((v) => verdicts.has(v)), [...verdicts].join(','));
  ok('真实盘里出现四种飞伏关系', ['飞生伏', '伏生飞', '飞克伏', '伏克飞'].every((x) => relations.has(x)), [...relations].join(','));
  ok('档位由助压两栏唯一决定', FUSHEN_VERDICTS.length === 4);
}

// 比和：真实盘里未必凑得齐，用同五行的飞伏构造一次
{
  const mk = (relation) => fushenAccess({}, {
    fushen: [{ position: 1, branch: '寅', element: '木', relation, fei: { position: 1, branch: '卯', element: '木' } }],
  }, { monthBranch: null, dayBranch: null });
  eq('比和：飞伏同气', mk('比和').items[0].relation, '比和');
  eq('比和且无日月：未得助', mk('比和').items[0].verdict, '未得助');
  eq('伏克飞：只看飞伏也判可出', mk('伏克飞').items[0].verdict, '可出');
  eq('飞克伏：只看飞伏也判受压', mk('飞克伏').items[0].verdict, '受压难出');
}

// ── ③ 四条档位边界各构造一张盘 ───────────────────────────────
const fu = (name, dir, mo, da, dayGanZhi = { stem: '甲', branch: '子', name: '甲子' }) => {
  const r = castStatic(name, dayGanZhi);
  const ug = yongshenOf(r, { direction: dir });
  return { r, ug, fa: fushenAccess(r, ug, { monthBranch: mo, dayBranch: da }) };
};
{
  const a = fu('地雷复', 'study', '寅', '卯');
  eq('可出：飞生伏 + 月建相 + 日生', a.fa.items[0].verdict, '可出');
  ok('可出：助列三项、压列为空', a.fa.items[0].supports.includes('飞神生伏') && a.fa.items[0].supports.includes('日辰生伏') && a.fa.items[0].pressures.length === 0, a.fa.items[0].say);

  const b = fu('地雷复', 'study', '亥', '卯');
  eq('有助有压：月破压住飞生伏与日生', b.fa.items[0].verdict, '有助有压');
  ok('有助有压：月破在压列', b.fa.items[0].pressures.includes('月破'), b.fa.items[0].say);

  const c = fu('地火明夷', 'wealth', '子', '子');
  eq('受压难出：飞克伏 + 月破 + 日克', c.fa.items[0].verdict, '受压难出');
  ok('受压难出：三条压、零助', c.fa.items[0].pressures.length === 3 && c.fa.items[0].supports.length === 0, c.fa.items[0].say);

  const d = fu('地山谦', 'wealth', '午', '辰');
  eq('未得助：伏生飞 + 月休 + 日耗', d.fa.items[0].verdict, '未得助');
  ok('未得助：助压两栏都空', d.fa.items[0].supports.length === 0 && d.fa.items[0].pressures.length === 0, d.fa.items[0].say);
}

// ── ④ 缺月建 / 只看飞伏 / 旬空 / 飞伏未知 ────────────────────
{
  const r = castStatic('地雷复'); // 不给 dayGanZhi
  const bare = { ...r, dayGanZhi: null }; // 老盘或裸对象：日月都没有
  const ug = yongshenOf(bare, { direction: 'study' });
  const noMonth = fushenAccess(bare, ug, { monthBranch: null, dayBranch: '卯' });
  eq('缺月建仍按日辰判', noMonth.items[0].verdict, '可出');
  eq('缺月建时 basis 写日辰', noMonth.items[0].basis, '日辰');
  eq('缺月建时月态为 unknown', noMonth.items[0].monthState, 'unknown');

  const flyOnly = fushenAccess(bare, ug, { monthBranch: null, dayBranch: null });
  eq('日月都缺时只看飞伏', flyOnly.items[0].basis, '飞伏');
  eq('飞生伏在只看飞伏时仍判可出', flyOnly.items[0].verdict, '可出');
  eq('只看飞伏时不编月态', flyOnly.items[0].monthState, 'unknown');

  const kongCast = castStatic('地雷复', { stem: '甲', branch: '午', name: '甲午' });
  const kongUg = yongshenOf(kongCast, { direction: 'study' });
  const kongFa = fushenAccess(kongCast, kongUg, { monthBranch: '寅', dayBranch: '午' });
  ok('伏神旬空只标出', kongFa.items[0].kong === true && /伏神旬空/.test(kongFa.items[0].say), kongFa.items[0].say);
  ok('旬空不并入助压两栏', !kongFa.items[0].supports.join('|').includes('空') && !kongFa.items[0].pressures.join('|').includes('空'));
  eq('旬空不改变档位（本例仍可出）', kongFa.items[0].verdict, '可出');

  const unknown = fushenAccess({}, { fushen: [{ position: 1, branch: '子', element: '水', relation: null, fei: null }] }, { monthBranch: null, dayBranch: null });
  eq('飞伏关系缺失时不硬判', unknown.items[0].verdict, '飞伏未知');
  eq('无伏神时返回 null', fushenAccess({}, { fushen: [] }), null);
  eq('useGod 为空时返回 null', fushenAccess({}, null), null);
}

// ── ⑤ 四处可见 + 旧结果兼容 + 不输出日期 ─────────────────────
{
  const lines = BY_NAME.get('地雷复').map((b) => (b ? 7 : 8));
  const RESULT = compute({ system: 'liuyao', lines, datetime: '2024-03-15T10:00', direction: 'study' });
  ok('compute 结果挂了 fushenAccess', !!(RESULT.fushenAccess && RESULT.fushenAccess.items.length), JSON.stringify(RESULT.fushenAccess && RESULT.fushenAccess.labels));
  ok('摘要带伏神出伏行', /伏神出伏：第2爻/.test(RESULT.summary), (RESULT.summary.match(/伏神出伏：.*/) || [''])[0]);
  ok('摘要只写档位不写日期', !/\d{4}[-年]\d{1,2}[-月]\d{1,2}/.test(RESULT.summary));

  const sec = (interpret(RESULT, { direction: 'study' }).sections || []).find((x) => x.key === 'yongshen');
  ok('解析有伏神出伏条件段', /伏神出伏的条件：/.test(sec.text), sec.text.slice(0, 80));
  ok('解析写明四档与不排优先级', /可出 \/ 有助有压 \/ 受压难出 \/ 未得助/.test(sec.text) && /不排各家优先级/.test(sec.text));
  ok('解析写完不出应期日期', /也不给应期日期/.test(sec.text));
  const limits = (interpret(RESULT, { direction: 'study' }).sections || []).find((x) => x.key === 'limits');
  ok('「未纳入」承认条件已判、应期具体日期未做', /应期的具体日期（只给逢值\/逢冲\/逢合的触发支与快慢方向）/.test(limits.text), limits.text.slice(0, 80));

  const plain = buildAnswer(RESULT, { direction: 'study' }, {});
  ok('白话带上出伏条件', /属于「出得来」的一档|一边有助、一边有压|被上面的力量压着|暂时没借到力/.test(plain), plain.slice(-90));
  ok('白话不把条件说成应期', !/\d{4}[-年]/.test(plain));

  const sandbox = { window: {}, console };
  vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
  const html = sandbox.window.__PP.liuyaoHTML(RESULT);
  const chips = RESULT.fushenAccess.labels.map((l) => `伏神${l}`);
  ok('面板每个档位各出一个 chip', chips.every((c) => html.includes(c)), chips.join(','));
  ok('面板 chip 文本已转义', !/伏神第?\d爻[^<]*<[a-z]/.test(html));

  // 旧结果（没有新字段）：解析/白话/面板都不硬凑；摘要本身是快照，按旧盘的串保留
  const old = JSON.parse(JSON.stringify(RESULT));
  delete old.fushenAccess;
  ok('旧结果解析不出条件段', !/伏神出伏的条件：/.test((interpret(old, { direction: 'study' }).sections || []).find((x) => x.key === 'yongshen').text));
  ok('旧结果白话不硬凑新档位', !/属于「出得来」的一档|一边有助、一边有压|被上面的力量压着|暂时没借到力/.test(buildAnswer(old, { direction: 'study' }, {})));
  ok('旧结果面板不出 chip', !/伏神第\d爻(可出|有助有压|受压难出|未得助)/.test(sandbox.window.__PP.liuyaoHTML(old)));
}

// ── ⑥ 只在用神不上卦时出现 + 确定性 ───────────────────────────
{
  const withGod = compute({ system: 'liuyao', lines: BY_NAME.get('地天泰').map((b) => (b ? 7 : 8)), datetime: '2024-03-15T10:00', direction: 'wealth' });
  ok('用神在卦上时不挂 fushenAccess', !withGod.fushenAccess || !withGod.useGod.fushen.length);
  const noDir = compute({ system: 'liuyao', lines: BY_NAME.get('地雷复').map((b) => (b ? 7 : 8)), datetime: '2024-03-15T10:00' });
  ok('未指定方向时不判伏神出伏', !noDir.fushenAccess);

  const r = castStatic('地雷复');
  const ug = yongshenOf(r, { direction: 'study' });
  const a = JSON.stringify(fushenAccess(r, ug, { monthBranch: '亥', dayBranch: '卯' }));
  const b = JSON.stringify(fushenAccess(r, ug, { monthBranch: '亥', dayBranch: '卯' }));
  ok('同一输入两次结果一致', a === b);
  const fa = fushenAccess(r, ug, { monthBranch: '亥', dayBranch: '卯' });
  ok('标签无重复', new Set(fa.labels).size === fa.labels.length, fa.labels.join(' · '));
  ok('条目里没有日期字段', fa.items.every((it) => !('date' in it) && !('when' in it) && !('yingqi' in it)));
}
