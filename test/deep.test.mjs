// 解析深化：看盘顺序 / 时间窗 / 交叉校验 / 未纳入——四段都必须由盘面数据推出，不能是空话。
import { compute, interpretText } from '../engine/index.js';
import { ok } from './_harness.mjs';

const BZ = compute({
  system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male',
  address: '河北石家庄', withInterpret: true, question: '今年适合换工作吗', direction: 'career',
});
const ZW = compute({
  system: 'ziwei', datetime: '1996-01-19T07:31', gender: 'male',
  address: '安徽池州', withInterpret: true,
});

const sec = (r, key) => ((r.interpret && r.interpret.sections) || []).find((s) => s.key === key) || null;

// ── 八字 ────────────────────────────────────────────────────
const bzKeys = (BZ.interpret.sections || []).map((s) => s.key);
ok('八字有看盘顺序', bzKeys.includes('reasoning') && bzKeys.includes('timeline') && bzKeys.includes('checks') && bzKeys.includes('limits'), bzKeys.join(','));

const bzSeq = sec(BZ, 'reasoning').text;
for (const step of ['①', '②', '③', '④', '⑤']) ok(`顺序含第 ${step} 步`, bzSeq.includes(step));
ok('顺序依次讲月令/用神/格局/大运/维度',
  /月令/.test(bzSeq) && /用神/.test(bzSeq) && /格局/.test(bzSeq) && /大运/.test(bzSeq) && /维度/.test(bzSeq));
ok('顺序引用真实旺衰与喜忌', bzSeq.includes(BZ.strength.level) && bzSeq.includes(BZ.frame.yongshen.favor[0]), BZ.strength.level);

const bzTime = sec(BZ, 'timeline').text;
ok('时间窗含当前大运与后续两步', /当前大运/.test(bzTime) && /后续两步/.test(bzTime));
ok('时间窗列五年流年', (bzTime.match(/20\d\d /g) || []).length >= 5, String((bzTime.match(/20\d\d /g) || []).length));
ok('流年带档位与理由', /大忌|大吉|吉|平|忌/.test(bzTime) && /（.*为忌神|.*为用神.*）/.test(bzTime));

const bzChecks = sec(BZ, 'checks').text;
ok('交叉校验含喜忌合计', /喜用合计/.test(bzChecks));
ok('交叉校验含运年同向判断', /大运.*流年|运年/.test(bzChecks), bzChecks.slice(0, 40));
ok('交叉校验含调候一致性', /调候喜/.test(bzChecks));

ok('八字有「未纳入」并说明流派边界', /未纳入|没有计算/.test(sec(BZ, 'limits').text) && /扶抑|调候/.test(sec(BZ, 'limits').text));

// ── 紫微 ────────────────────────────────────────────────────
const zwKeys = (ZW.interpret.sections || []).map((s) => s.key);
ok('紫微有看盘顺序/时间窗/未纳入', ['reasoning', 'timeline', 'limits'].every((k) => zwKeys.includes(k)), zwKeys.join(','));

const zwSeq = sec(ZW, 'reasoning').text;
for (const token of ['命宫', '三方四正', '生年四化', '大限', '流年四化']) ok(`紫微顺序含「${token}」`, zwSeq.includes(token));
ok('紫微顺序引用真实主星', zwSeq.includes(ZW.palaces.find((p) => p.isSoul).stars.find((s) => s.type === '主星')?.name || '无正曜')
  || /借对宫/.test(zwSeq), ZW.palaces.find((p) => p.isSoul).stars.map((s) => s.name).join(','));

const zwTime = sec(ZW, 'timeline').text;
ok('紫微时间窗含三步大限', /大限：.*→.*→/.test(zwTime), zwTime.slice(0, 40));
ok('紫微时间窗列五年流年', (zwTime.match(/20\d\d /g) || []).length >= 5, String((zwTime.match(/20\d\d /g) || []).length));
ok('紫微时间窗带岁数', /\d+–\d+岁/.test(zwTime) && /\d+岁/.test(zwTime));

// ── 通用质量：无占位、长度可控、两段路径都渲染 ─────────────
for (const [label, r] of [['八字', BZ], ['紫微', ZW]]) {
  const all = JSON.stringify(r.interpret);
  ok(`${label}：新段落无 undefined/NaN`, !/undefined|NaN|\[object/.test(all));
  const txt = interpretText(r.interpret);
  ok(`${label}：文本输出含看盘顺序`, /看盘顺序：/.test(txt));
  ok(`${label}：文本输出含时间窗`, /时间窗：/.test(txt));
  ok(`${label}：单段长度可控`, (sec(r, 'timeline').text.length) < 1400, String(sec(r, 'timeline').text.length));
}

// ── 卦象类也补「看卦/看课顺序」与未纳入 ────────────────────
const CASES = [
  ['六爻', { system: 'liuyao', lines: [7, 8, 9, 6, 7, 8], question: '这件事能成吗' }, ['卦宫', '世应', '动爻', '用神', '日辰', '变卦']],
  ['六壬', { system: 'daliuren', datetime: '2026-10-24T11:43' }, ['月将', '四课', '三传', '课体', '神将']],
];
for (const [label, args, tokens] of CASES) {
  const r = compute({ ...args, withInterpret: true });
  const it = r.interpret;
  const keys = (it.sections || []).map((s) => s.key);
  ok(`${label}：解析未走兜底`, !it.error, it.error || '');
  ok(`${label}：有看盘顺序与未纳入`, keys.includes('reasoning') && keys.includes('limits'), keys.join(','));
  const seq = (it.sections || []).find((s) => s.key === 'reasoning');
  ok(`${label}：顺序含关键步骤`, !!seq && tokens.every((t) => seq.text.includes(t)), seq ? seq.text.slice(0, 50) : 'missing');
  ok(`${label}：顺序无占位值`, !!seq && !/undefined|NaN|\[object/.test(seq.text));
}
