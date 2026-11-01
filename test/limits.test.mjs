// 能力边界清单：「这个插件不回答什么」
//
// 这份清单的存在理由是防一类错误：让用户以为工具能回答所有问题。
// 所以它不是免责话术——「可能不准」这种句子没有信息量，用户看完还是不知道该信哪部分。
// 有用的写法是：这条为什么做不到、做到哪一步就停了。这一组盯五件事：
//   ① 字段完整、id 不重复、文案有实质（不是套话）、无绝对化用词；
//   ② 每个体系都要有专属边界，不能只挂三条通用条目；
//   ③ 通用三条必须覆盖效度 / 同盘不同命 / 专业建议三个死穴；
//   ④ interpret 结果要带上清单，且随体系变化（奇门支路也要带）；
//   ⑤ 清单不能和实现矛盾——写「不给公历日期」，引擎输出里就不能真有日期。
import { UNIVERSAL_LIMITS, SYSTEM_LIMITS, limitsFor } from '../engine/limits.js';
import { compute } from '../engine/index.js';
import { ok } from './_harness.mjs';

// 绝对化用词：与知识库共用同一把尺子，边界清单更不能口出断言
const BAN = /(一定|必然|注定|肯定会|绝对会|百分百|铁定|毫无疑问)/;

ok('通用边界不少于三条', UNIVERSAL_LIMITS.length >= 3, String(UNIVERSAL_LIMITS.length));

const ALL = [...UNIVERSAL_LIMITS, ...Object.values(SYSTEM_LIMITS).flat()];
const UIDS = new Set(ALL.map((l) => l.id));
const UIDS_DUP = ALL.filter((l, i) => ALL.findIndex((x) => x.id === l.id) !== i).map((l) => l.id);

ok('每条边界都有 id / title / text', ALL.every((l) => l.id && l.title && l.text), '缺字段');
ok('边界 id 不重复', UIDS_DUP.length === 0, UIDS_DUP.join(','));
ok('边界文案有实质（≥40 字）', ALL.every((l) => l.text.length >= 40), ALL.filter((l) => l.text.length < 40).map((l) => `${l.id}:${l.text.length}`).join(','));
ok('边界文案无绝对化用词', ALL.filter((l) => BAN.test(l.title + l.text)).length === 0, ALL.filter((l) => BAN.test(l.title + l.text)).map((l) => l.id).join(','));
ok('边界标题不像免责套话', !ALL.some((l) => /仅供参考|请理性看待|信则有/.test(l.title)), '有套话标题');

// ── 三个死穴：效度、同盘不同命、专业建议 ───────────────────
const uids = UNIVERSAL_LIMITS.map((l) => l.id);
ok('通用边界覆盖「效度未经检验」', uids.includes('validity'));
ok('通用边界覆盖「同盘不同命」', uids.includes('same-chart'));
ok('通用边界覆盖「不给专业建议」', uids.includes('advice'));

// ── 每个体系都要有专属条目 ───────────────────────────────
for (const sys of ['liuyao', 'bazi', 'ziwei', 'meihua', 'daliuren', 'qimen', 'tarot']) {
  ok(`${sys} 有专属能力边界`, (SYSTEM_LIMITS[sys] || []).length >= 1, '缺专属条目');
}
ok('未知体系只回通用三条', limitsFor('nope').length === UNIVERSAL_LIMITS.length, String(limitsFor('nope').length));
ok('limitsFor 拼接通用与专属', limitsFor('liuyao').length === UNIVERSAL_LIMITS.length + SYSTEM_LIMITS.liuyao.length);

// ── 集成：解析结果要带上，且随体系变化 ─────────────────────
{
  const bazi = compute({ system: 'bazi', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州', withInterpret: true });
  const it = bazi.interpret;
  ok('八字解析带能力边界', Array.isArray(it.limits) && it.limits.length >= 4, String(it.limits && it.limits.length));
  ok('八字边界含「不预测具体年份事件」', it.limits.some((l) => l.id === 'bazi-no-event'));
  ok('八字边界含通用三条', ['validity', 'same-chart', 'advice'].every((id) => it.limits.some((l) => l.id === id)));
  ok('八字不带六爻专属条目', !it.limits.some((l) => l.id === 'liuyao-no-date'));
}

{
  // ⑤ 清单与实现不能矛盾：写着「应期不给公历日期」，输出里就不能有日期
  const lines = [7, 7, 7, 7, 7, 7];
  const r = compute({ system: 'liuyao', lines, datetime: '2026-03-06T17:58', direction: 'study', withInterpret: true });
  const it = r.interpret;
  ok('六爻解析带能力边界', Array.isArray(it.limits) && it.limits.length >= 4, String(it.limits && it.limits.length));
  ok('六爻边界含「应期不给公历日期」', it.limits.some((l) => l.id === 'liuyao-no-date'));
  const flat = JSON.stringify(it);
  const dateHit = flat.match(/\d{4}\s*年\s*\d{1,2}\s*月\s*\d{1,2}\s*日/g) || [];
  ok('六爻解析全文不出现公历日期（与边界一致）', dateHit.length === 0, dateHit.slice(0, 2).join(' | '));
}

// ── 奇门支路：它不经过正文组装，边界要走公共收尾才带得上 ────
{
  const q = compute({ system: 'qimen', datetime: '2026-03-06T17:58', direction: 'study', withInterpret: true });
  const it = q.interpret;
  ok('奇门解析也带能力边界', Array.isArray(it.limits) && it.limits.length >= 4, String(it.limits && it.limits.length));
  ok('奇门边界含「八门九星入墓未做」', it.limits.some((l) => l.id === 'qimen-bamen'));
}
