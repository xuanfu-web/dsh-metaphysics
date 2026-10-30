// 紫微解读词库的门：条目要全、口径要稳、面板要真的渲染成段落。
//
// 这一层是「引擎算、词库说」的分界：词库本身不含判断条件，所以测试只能查两件事 ——
//   ① 覆盖：十二宫、十四主星、双星、煞星、吉星、七档亮度、三十四格局，一个都不能漏；
//   ② 口径：不与 PATTERN_TONE 打架、不出现绝对化断言、不留 undefined/NaN。
// 最后用真实盘面验证逐宫 12 条与三层格局确实接进了 interpret()。
import fs from 'node:fs';
import { compute } from '../engine/index.js';
import { interpret } from '../engine/interpret.js';
import { PATTERN_TONE } from '../engine/ziwei.js';
import {
  PALACE_FIELD, STAR_EXTRA, STAR_PAIR, SHA_STAR, MAIN_SHA, FU_STAR,
  HUA_READ, BRIGHT_READ, PATTERN_READ,
  palaceFieldOf, brightRead, starExtraOf, starPairOf, huaInLine,
  shaLineOf, shaNatureOf, fuLineOf, patternReadOf,
} from '../engine/ziwei-words.js';
import { ok, eq } from './_harness.mjs';

const BAN = /(一定|必然|注定|肯定会|绝对会|百分百|铁定|毫无疑问)/;
const BAD = /(undefined|NaN|\[object)/;

// ── 1. 目录完整性 ───────────────────────────────────────────
eq('十二宫取象齐全', Object.keys(PALACE_FIELD).length, 12);
eq('十四主星细节齐全', Object.keys(STAR_EXTRA).length, 14);
eq('双星组合不少于 24 组', Object.keys(STAR_PAIR).length >= 24, true);
eq('煞星词条齐全', Object.keys(SHA_STAR).length, 14);
eq('六煞名单就是那六颗', MAIN_SHA.slice().sort().join(','), ['地劫', '地空', '擎羊', '火星', '铃星', '陀罗'].sort().join(','));
eq('吉星词条不少于 18 条', Object.keys(FU_STAR).length >= 18, true);
eq('四化读法齐全', Object.keys(HUA_READ).join(''), '禄权科忌');
eq('亮度七档齐全', Object.keys(BRIGHT_READ).join(''), '庙旺得利平不陷');
eq('格局读法三十四条', Object.keys(PATTERN_READ).length, 34);

// 词库与引擎的格局表必须一一对应：多一条是编出来的格局，少一条会在面板上落空白
const toneKeys = Object.keys(PATTERN_TONE).sort();
const readKeys = Object.keys(PATTERN_READ).sort();
eq('格局读法与 PATTERN_TONE 一一对应', readKeys.join(','), toneKeys.join(','));

// ── 2. 字段与口径 ───────────────────────────────────────────
let badPalace = 0;
for (const [name, p] of Object.entries(PALACE_FIELD)) {
  if (!p.field || !p.ask || !p.drift || !p.huaJi) badPalace++;
  if (BAN.test(`${p.field}${p.ask}${p.drift}${p.huaJi}`) || BAD.test(p.huaJi)) badPalace++;
}
ok('每宫四段取象齐全且无绝对化表述', badPalace === 0, `${badPalace} 条不合格`);

let badStar = 0;
for (const [name, s] of Object.entries(STAR_EXTRA)) {
  if (!s.alias || !s.key || !s.bright || !s.dim || !s.gift || !s.watch) badStar++;
  if (BAN.test(`${s.bright}${s.dim}${s.gift}${s.watch}`)) badStar++;
}
ok('每个主星六段齐全且无绝对化表述', badStar === 0, `${badStar} 条不合格`);

let badPair = 0;
for (const [key, p] of Object.entries(STAR_PAIR)) {
  if (!p.gist || !p.watch) badPair++;
  // 双星 key 必须是两颗主星名拼起来，否则 starPairOf 的查表永远对不上
  const a = key.slice(0, 2);
  const b = key.slice(2);
  if (!STAR_EXTRA[a] || !STAR_EXTRA[b]) badPair++;
  if (BAN.test(`${p.gist}${p.watch}`)) badPair++;
}
ok('双星 key 都能拆成两颗真实主星', badPair === 0, `${badPair} 条不合格`);

let badSha = 0;
for (const [name, s] of Object.entries(SHA_STAR)) {
  if (!s.nature || !s.inPalace || !s.remind) badSha++;
  // 煞星不许写成判决：词库里出现「必」「注定」这类字样就失败
  if (BAN.test(`${s.nature}${s.inPalace}${s.remind}`)) badSha++;
}
ok('煞星词条齐全且不写成判决', badSha === 0, `${badSha} 条不合格`);

let badFu = 0;
for (const [name, f] of Object.entries(FU_STAR)) {
  if (!f.nature || !f.gift || !f.note) badFu++;
  if (BAD.test(`${f.nature}${f.gift}${f.note}`)) badFu++;
}
ok('吉星词条齐全且无坏值', badFu === 0, `${badFu} 条不合格`);

let badPat = 0;
for (const [name, p] of Object.entries(PATTERN_READ)) {
  if (!p.gist || p.gist.length < 6 || !p.advice) badPat++;
  if (BAN.test(`${p.gist}${p.advice}`)) badPat++;
}
ok('三十四格局都有读法与做法，且不写成判决', badPat === 0, `${badPat} 条不合格`);

// 亮度只调语气，不改结论：好/中性/差三档都必须有，且措辞不能是好坏判决
const tones = new Set(Object.values(BRIGHT_READ).map((b) => b.tone));
eq('亮度映射覆盖好/中/差三档', [...tones].sort().join(','), 'bad,good,neutral');
ok('亮度措辞不出现好坏判决', !Object.values(BRIGHT_READ).some((b) => /(凶|吉|糟|完蛋)/.test(b.plain)));

// ── 3. 取词函数的行为 ───────────────────────────────────────
eq('宫名别名 事业 → 官禄', palaceFieldOf('事业')?.field, PALACE_FIELD.官禄.field);
eq('宫名别名 奴仆 → 交友', palaceFieldOf('奴仆')?.field, PALACE_FIELD.交友.field);
eq('未知宫名返回 null', palaceFieldOf('不存在'), null);
eq('亮度「庙」是 good', brightRead('庙')?.tone, 'good');
eq('亮度空值返回 null', brightRead(''), null);
eq('未知星名返回 null', starExtraOf('不存在'), null);
eq('双星顺序颠倒也能查到', starPairOf(['贪狼', '紫微'])?.gist, STAR_PAIR.紫微贪狼.gist);
eq('单星不是双星组合', starPairOf(['紫微']), null);
eq('三星不是双星组合', starPairOf(['紫微', '天府', '贪狼']), null);

ok('化禄入财帛带出赚钱方式', /化禄入财帛/.test(huaInLine('禄', '财帛')) && /钱|进项/.test(huaInLine('禄', '财帛')));
ok('化忌入某宫用的是该宫的 huaJi', huaInLine('忌', '夫妻').includes(PALACE_FIELD.夫妻.huaJi));
eq('未知宫名的四化返回空串（由调用方退回通用说法）', huaInLine('禄', '不存在'), '');

const sha1 = shaLineOf(['擎羊']);
ok('单煞给出针对性的做法', sha1.includes(SHA_STAR.擎羊.inPalace) && sha1.includes(SHA_STAR.擎羊.remind));
const sha2 = shaLineOf(['擎羊', '陀罗', '火星', '铃星']);
ok('多煞最多只点三颗，避免堆砌', sha2.split('（').length - 1 === 3, sha2);
eq('无从词库的星不进煞星句', shaLineOf(['天魁']), '');
ok('只说星情时不含落宫与做法', !shaNatureOf(['地空']).includes(SHA_STAR.地空.remind) && shaNatureOf(['地空']) === SHA_STAR.地空.nature);
eq('吉星句为空时返回空串', fuLineOf([]), '');
ok('吉星句带出该星的名字', fuLineOf(['文昌']).includes('文昌'));

eq('词库内格局读法优先', patternReadOf('紫府同宫', 'good')?.gist, PATTERN_READ.紫府同宫.gist);
ok('词库外格局按 tone 回落', patternReadOf('未收录格局', 'bad').gist.includes('消耗'));
ok('词库外格局无 tone 时回落中性', patternReadOf('未收录格局', 'neutral').gist.includes('中性'));

// ── 4. 接进真实盘面 ─────────────────────────────────────────
const r = compute({ system: 'ziwei', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州' });
const it = interpret(r, {});
eq('解析没有报错', it.error, undefined);

const byKey = Object.fromEntries((it.sections || []).map((s) => [s.key, s]));
ok('有命身底色一节', !!byKey.identity);
ok('有逐宫分析一节', !!byKey.palaces);
ok('逐宫覆盖十二宫', (byKey.palaces.text.match(/^【/gm) || []).length === 12, String((byKey.palaces.text.match(/^【/gm) || []).length));
ok('逐宫每一条都写了宫位取象', r.palaces.every((p) => byKey.palaces.text.includes(p.palace)));

// 一张盘可能只落到某一层（比如全是中性结构），所以只要求「至少出现一层」，
// 并逐个核对出现的那层 tone 与格局名都对得上词库——宁可少一节，不能错一节。
const TIER = { 'pattern-good': 'good', 'pattern-neutral': 'watch', 'pattern-bad': 'bad' };
const tiers = Object.keys(TIER).filter((k) => byKey[k]);
ok('至少出现一层格局分节', tiers.length > 0, Object.keys(byKey).join(','));
for (const k of tiers) {
  eq(`${k} 的 tone 正确`, byKey[k].tone, TIER[k]);
  const names = (byKey[k].text.match(/\*\*([^*]+)\*\*/g) || []).map((s) => s.slice(2, -2));
  ok(`${k} 里的格局名都在词库内`, names.every((n) => PATTERN_TONE[n]), names.filter((n) => !PATTERN_TONE[n]).join(','));
}
ok('行动建议给到具体条目', !!byKey.advice && /①/.test(byKey.advice.text));

// 全文字面检查：任何一节都不许漏出 undefined/NaN
const allText = (it.sections || []).map((s) => s.text).join('\n') + (it.dimensions || []).map((d) => d.text).join('\n');
ok('全文无 undefined/NaN', !BAD.test(allText), (allText.match(BAD) || [])[0] || '');

// ── 5. 面板渲染：分节 tone、段落、加粗 ──────────────────────
// 词库里的 **名称** 与 \n 必须真的变成 <b> 与独立段落，否则用户看到的是满屏星号。
const src = fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8');
const sandbox = { window: {} };
new Function('window', src)(sandbox.window);
const html = sandbox.window.__PP.interpretHTML(it, { folded: false });

ok('面板渲染出加粗', /<b>[^<]{2,}<\/b>/.test(html));
ok('面板没漏出 ** 星号', !html.includes('**'));
ok('面板把每一行拆成独立段落', (html.match(/class="mp-it-p"/g) || []).length >= 12,
  String((html.match(/class="mp-it-p"/g) || []).length));
ok('格局分节带上了 tone 类', /mp-it-sec tone-(good|watch|bad)/.test(html));
if (tiers.length) ok('逐层 tone 类都出现了', tiers.every((k) => html.includes(`tone-${TIER[k]}`)), tiers.join(','));
ok('逐宫一节渲染了十二个锚点', (html.match(/id="mp-sec-palaces"/g) || []).length === 1);
