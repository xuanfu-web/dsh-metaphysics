// 「一眼看」：首屏那一行。这里守两件事——文案确实来自各面算好的字段，
// 以及它不能变成第二条推导（同一个盘刷新两次必须一模一样）。
import fs from 'node:fs';
import vm from 'node:vm';
import { buildBazi } from '../engine/index.js';
import { buildMarriage } from '../engine/marriage.js';
import { buildFacets } from '../engine/facets.js';
import { ok, eq } from './_harness.mjs';

const kitSrc = fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8');
const load = () => {
  const sandbox = { window: {}, console };
  vm.runInNewContext(kitSrc, sandbox, { filename: 'panel-kit.js' });
  return sandbox.window.__PP;
};
const PP = load();

const mk = (o) => buildBazi({ trueSolar: false, dst: false, lateZi: true, nowYear: 2026, ...o });
const A = mk({ year: 1990, month: 5, day: 12, hour: 14, minute: 30, gender: 'female' });
const ma = buildMarriage(A);
const fa = buildFacets(A);

// ── 有全部输入时：一行讲完盘面 + 事业 + 财 + 婚期 ──
{
  const html = PP.oneLineHTML(A, { marriage: ma, life: fa });
  ok('有盘就出「一眼看」', html.includes('aria-label="一眼看"'), html.slice(0, 60));
  ok('写日主旺衰', html.includes(`${A.dayMaster.stem}${A.dayMaster.element}${A.strength.level}`), A.strength.level);
  ok('写生月', html.includes(`生${A.pillars.month.branch}月`), A.pillars.month.branch);
  const ct = String(fa.career.type.label).split('、')[0];
  ok('带事业类型（只取第一段，避免首屏折成三行）', html.includes(`事业偏${ct}`) && !html.includes('[object Object]'), ct);
  ok('带财力量级（去掉括号注解）', html.includes('财是') || html.includes('财平'), fa.wealth.tier);
  ok('不带括号注解', !html.includes('（赚得到也花得快）'), '括号注释应只留在六面卡里');
  ok('带婚姻类型', html.includes(ma.types[0].label.replace(/型$/, '')), ma.types[0].label);
  const fw = ma.windows.filter((w) => !w.past)[0];
  ok('带最近的未来年份', !!fw && html.includes(`最可能动在 ${fw.year} 年`), fw ? String(fw.year) : '无未来窗口');
  ok('句子以句号收尾', /\u3002<\/p><\/section>$/.test(html), html.slice(-30));
}

// ── 缺 marriage / life 时：只讲盘面，不硬凑空句 ──
{
  const html = PP.oneLineHTML(A);
  ok('没有六面与婚姻也给盘面那一句', html.includes('aria-label="一眼看"') && html.includes(A.strength.level), html.slice(0, 80));
  ok('缺输入时不出现事业/婚缘字样', !html.includes('事业偏') && !html.includes('婚缘'), html.slice(0, 80));
  ok('缺输入时只有一个分句', (html.match(/\uFF1A/g) || []).length === 0, '没有「：」就不该有分句');
}

// ── 不能变成第二条推导：同盘两次完全一致，换盘必须变 ──
{
  const a1 = PP.oneLineHTML(A, { marriage: ma, life: fa });
  const a2 = PP.oneLineHTML(A, { marriage: buildMarriage(A), life: buildFacets(A) });
  eq('同一盘两次渲染完全一致', a1, a2);
  const B = mk({ year: 1985, month: 11, day: 3, hour: 9, minute: 0, gender: 'male' });
  const b1 = PP.oneLineHTML(B, { marriage: buildMarriage(B), life: buildFacets(B) });
  ok('换盘这一行必须变', a1 !== b1, '');
  ok('B 盘也写自己的旺衰', b1.includes(B.strength.level), B.strength.level);
}

// ── 缺盘 / 时辰未知：不炸 ──
{
  eq('缺盘返回空串', PP.oneLineHTML(null), '');
  eq('没有 strength 返回空串', PP.oneLineHTML({ pillars: {} }), '');
  const nc = mk({ year: 1990, month: 5, day: 12, hourUnknown: true, gender: 'female' });
  const h = PP.oneLineHTML(nc, { marriage: buildMarriage(nc), life: buildFacets(nc) });
  ok('时辰未知仍出这一行', h.includes('aria-label="一眼看"'), h.slice(0, 60));
  ok('时辰未知时不写生月以外没有的柱', !h.includes('undefined'), h.slice(0, 80));
}

// ── 拼接位置：必须排在结论块之后、盘面之前 ──
{
  const html = PP.baziHTML(A, { marriage: ma, life: fa });
  const iBrief = html.indexOf('aria-label="先说结论"');
  const iOne = html.indexOf('aria-label="一眼看"');
  const iChart = html.indexOf('bz-lbl');
  ok('有结论块时一眼看排在它之后', iBrief === -1 || iOne > iBrief, `${iBrief} -> ${iOne}`);
  ok('一眼看在盘面之前', iChart > 0 && iOne < iChart, `${iOne} -> ${iChart}`);
  ok('整卡只出现一次', (html.match(/aria-label="一眼看"/g) || []).length === 1, '');
}
