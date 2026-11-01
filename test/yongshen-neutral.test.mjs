// 喜忌中性档：忌神里全局分量近零的那一行，展示层标「中性偏忌」，但不从 avoid 里删。
//
// 来源：用户反馈「身弱盘报喜火金水木、忌土 / 金 0.3 分却按实忌列出」。
// 约束：
//   1. 只改展示，不改评分——行运遇到这一行仍按忌扣分（局中没有 ≠ 运里不来）；
//   2. 阈值 0.5 分，中性集合必须是 avoid 的子集；
//   3. 摘要 / 解析 / 白话 / 面板 / 推导链五处都要能看见，且逐字一致地引用同一个 weight。
import fs from 'node:fs';
import vm from 'node:vm';
import { compute, renderText } from '../engine/index.js';
import { scoreLuck } from '../engine/geju.js';
import { ok, eq } from './_harness.mjs';

const sandbox = { window: {}, console };
vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
const PP = sandbox.window.__PP;

// 该型盘：偏弱、喜火土、忌金水木，金只有 0.3 分（与反馈同构，日期为合成样本）
const BASE = { system: 'bazi', datetime: '1978-03-08T22:10', gender: 'male', address: '广东广州' };
const r = compute({ ...BASE, withInterpret: true, trace: true });
const ys = r.frame.yongshen;

// ── ① 结构 ────────────────────────────────────────────────────────
ok('该型盘偏弱', r.strength.level === '偏弱' || r.strength.level === '身弱', r.strength.level);
ok('金在忌里', ys.avoid.includes('金'), ys.avoid.join(''));
ok('金同时进中性集合', Array.isArray(ys.neutral) && ys.neutral.some((n) => n.element === '金'), JSON.stringify(ys.neutral));
const neuJin = ys.neutral.find((n) => n.element === '金');
ok('中性条目带角色与分量', neuJin && neuJin.role === '食伤' && neuJin.verb === '泄秀' && neuJin.weight === 0.3, JSON.stringify(neuJin));
ok('中性是忌的子集', ys.neutral.every((n) => ys.avoid.includes(n.element)), JSON.stringify(ys.neutral));
ok('有分量的忌神不落中性', ys.neutral.every((n) => n.weight < 0.5), JSON.stringify(ys.neutral));
ok('中性十神与条目同源', ys.neutralTenGods.includes('食神') && ys.neutralTenGods.includes('伤官'), ys.neutralTenGods.join(','));
ok('中性角色可读', Array.isArray(ys.neutralRoles) && ys.neutralRoles.every((x) => typeof x === 'string' && x), JSON.stringify(ys.neutralRoles));

// ── ② 评分不变：金运仍按忌扣分 ────────────────────────────────────
const jinLuck = scoreLuck('庚申', r.frame);
const huoLuck = scoreLuck('丙午', r.frame);
ok('金干支仍按忌计（降分）', jinLuck.score < huoLuck.score, `金 ${jinLuck.score} vs 火 ${huoLuck.score}`);
ok('金运理由写明为忌神', jinLuck.reasons.some((x) => x.includes('忌神')), jinLuck.reasons.join('；'));
ok('中性不改变 avoid 内容', (() => {
  const again = compute(BASE).frame.yongshen;
  return JSON.stringify(again.avoid) === JSON.stringify(ys.avoid);
})());

// ── ③ 五处可见 ────────────────────────────────────────────────────
const detailLine = String(ys.detail).split('\n').find((l) => l.includes('中性偏忌')) || '';
ok('detail 有中性偏忌一行', detailLine.includes('金（局中 0.3 分）'), detailLine);
ok('detail 说明仍留在喜忌里', detailLine.includes('仍按忌计'), detailLine);

const text = renderText(r);
ok('摘要标出中性偏忌', /中性偏忌：金 0\.3 分/.test(text), (text.match(/中性偏忌[^\n]*/) || [''])[0]);

const sec = (r.interpret.sections || []).find((s) => s.key === 'yongshen') || {};
ok('解析「用神与忌神」节写明近零', /中性偏忌/.test(sec.text || '') && /金/.test(sec.text || ''), (sec.text || '').slice(0, 120));
const plain = (r.interpret.plain || '') + (r.interpret.outline || []).map((o) => o.text).join('｜');
ok('白话或一页读懂提到中性偏忌', /中性偏忌/.test(plain), plain.slice(0, 160));

const traceStep = (r.trace || []).find((t) => t.key === 'geju') || {};
ok('推导链格局层写中性偏忌', /中性偏忌\s*金（0\.3 分）/.test(traceStep.result || ''), (traceStep.result || '').slice(0, 120));
ok('导出文本同样带中性偏忌', /中性偏忌/.test(r.traceText || ''));

const html = PP.baziHTML(r);
const neuChips = (html.match(/pp-chip neu/g) || []).length;
ok('面板有中性 chip', neuChips >= 3, String(neuChips));
ok('面板 chip 写明分量', /中性偏忌 金 0\.3 分/.test(html), (html.match(/中性偏忌[^<]*/) || [''])[0]);
ok('面板中性 chip 带说明', /title="局中分量近零，按中性偏忌看"/.test(html));
ok('食伤十神不重复出现在 warn 里', (() => {
  const warn = (html.match(/<span class="pp-chip warn">([^<]+)<\/span>/g) || []).map((s) => s.replace(/<[^>]+>/g, ''));
  return !warn.includes('食神') && !warn.includes('伤官');
})(), (html.match(/<span class="pp-chip warn">[^<]+<\/span>/g) || []).join(','));

// ── ④ 无近零忌神的盘：中性为空，文案不出现 ────────────────────────
const clean = compute({ system: 'bazi', datetime: '2001-09-30T04:20', gender: 'female', address: '四川成都', trace: true, withInterpret: true });
ok('该型盘中性为空', Array.isArray(clean.frame.yongshen.neutral) && clean.frame.yongshen.neutral.length === 0, JSON.stringify(clean.frame.yongshen.neutral));
ok('无中性时 detail 不出现该行', !String(clean.frame.yongshen.detail).includes('中性偏忌'));
ok('无中性时摘要不出现该行', !/中性偏忌/.test(renderText(clean)));
ok('无中性时面板不出现该 chip', !/pp-chip neu/.test(PP.baziHTML(clean)));

// ── ⑤ 广扫：阈值与包含关系在 120 张盘上恒成立 ─────────────────────
let scanned = 0; let withNeutral = 0; const bad = [];
for (let i = 0; i < 120; i++) {
  const y = 1950 + ((i * 37) % 71);
  const m = 1 + ((i * 5) % 12);
  const d = 1 + ((i * 11) % 28);
  const h = (i * 7) % 24;
  const pad = (n) => String(n).padStart(2, '0');
  const x = compute({ system: 'bazi', datetime: `${y}-${pad(m)}-${pad(d)}T${pad(h)}:30`, gender: i % 2 ? 'female' : 'male' });
  const ysj = x.frame && x.frame.yongshen;
  if (!ysj) { bad.push(`#${i} 无喜忌`); continue; }
  scanned += 1;
  if (ysj.neutral.length) withNeutral += 1;
  if (!ysj.neutral.every((n) => ysj.avoid.includes(n.element))) bad.push(`#${i} 中性不在忌里`);
  if (!ysj.neutral.every((n) => n.weight < 0.5)) bad.push(`#${i} 阈值超界 ${JSON.stringify(ysj.neutral)}`);
  if (ysj.neutral.length > ysj.avoid.length) bad.push(`#${i} 中性多于忌`);
}
eq('扫盘样本量', scanned, 120);
ok('120 张盘全部满足阈值与包含关系', bad.length === 0, bad.slice(0, 3).join('；'));
ok('中性档不是空设（有盘命中）', withNeutral > 0, `命中 ${withNeutral} 张`);
