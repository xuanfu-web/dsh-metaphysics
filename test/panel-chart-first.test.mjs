// 结果区的第一块必须是盘面（卦象 / 牌面 / 星盘），技术信息往后排。
//
// 起因：结果卡原来是 castAtHTML → 性能 → 修订 → 句柄 → 影子 → 推导链 → 盘面，
// 一屏里最先看到的是「12ms」「修订 3 处」这种技术行，卦象要往下翻才见。
// 盘面才是这张盘唯一有吸引力的东西，所以把它提到最前，性能/修订/句柄/影子/推导链
// 全部后置。以后若有人往前面塞新的技术块，这里要红。
import fs from 'node:fs';
import { ok, eq } from './_harness.mjs';

const app = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
const chart = app.slice(app.indexOf('function chartHTML('), app.indexOf('function castRow('));

// ── ① 函数本体 ────────────────────────────────────────────────
ok('有 chartHTML 分派函数', chart.startsWith('function chartHTML('), chart.slice(0, 40));
ok('函数名以 HTML 结尾（html-sinks 的渲染器契约）', /function chartHTML\(/.test(app));

const kinds = [...chart.matchAll(/result\.kind === '([a-z]+)'/g)].map((m) => m[1]);
eq('覆盖 18 个体系分支（其余走 quickHTML 兜底）', kinds.length, 18);
eq('分支顺序与原分派一致',
  kinds.join(','),
  'ziwei,bazi,meihua,daliuren,qimen,hepan,tarot,liuyao,chenggu,almanac,zeri,trend,name,mbti,constitution,wuyunliuqi,taiyi,fengshui');

const renderers = [...new Set([...chart.matchAll(/PP\.([a-zA-Z]+HTML)\(/g)].map((m) => m[1]))];
ok('渲染器去重后 21 个（18 体系 + trend/qimenFacts/ziweiHepan + quickHTML 兜底）', renderers.length === 21, renderers.join(','));
ok('盘面函数只做分派，不掺技术块',
  !/perfHTML|revisionHTML|handleHTML|shadowHTML|traceHTML|caliberHTML/.test(chart),
  renderers.join(','));
ok('三元链以分号收尾（不是函数实参残留的逗号）', /PP\.quickHTML\(result\.r\);\s*\n/.test(chart));
ok('没有裸逗号收尾', !/PP\.quickHTML\(result\.r\),\s*\}/.test(chart));

// 「先说结论」方框：panel-kit 侧钉着「方框在盘面之前」，结果卡要盘面第一，
// 所以在 chartHTML 里把它剥下来挪到盘面之后——渲染器不改，只有顺序变。
ok('按开头是不是 mp-br 方框来判断', chart.includes("html.startsWith('<section class=\"mp-br\"')"), chart.slice(-300));
ok('剥下来的段接到盘面之后', /html\.slice\(end \+ 10\) \+ html\.slice\(0, end \+ 10\)/.test(chart), chart.slice(-200));
ok('没命中时原样返回', /return end < 0 \? html :/.test(chart));

// ── ② 结果卡拼接顺序 ──────────────────────────────────────────
const iHtml = app.indexOf('__html: chartHTML(result)');
ok('结果卡以盘面开头', iHtml > 0);
const order = [
  ['盘面', iHtml],
  ['起卦时刻 castAtHTML', app.indexOf('castAtHTML(result)', iHtml)],
  ['解读 resultWithInterpret', app.indexOf("PP.resultWithInterpret('', result.it", iHtml)],
  ['性能 perf', app.indexOf('PP.perfHTML(perf)', iHtml)],
  ['修订 revision', app.indexOf('PP.revisionHTML(result.r.revision)', iHtml)],
  ['句柄 handle', app.indexOf('PP.handleHTML(result.r.handle)', iHtml)],
  ['影子盘 shadow', app.indexOf('PP.shadowHTML(result.r.shadow', iHtml)],
  ['推导链 trace', app.indexOf('PP.traceHTML(result.r.trace', iHtml)],
  ['口径对照 caliber', app.indexOf('PP.caliberHTML(result.caliber)', iHtml)],
];
for (let i = 1; i < order.length; i++) {
  ok(order[i][0] + ' 排在前一块之后', order[i][1] > order[i - 1][1] && order[i][1] > 0,
    order[i - 1][0] + '@' + order[i - 1][1] + ' → ' + order[i][0] + '@' + order[i][1]);
}
ok('盘面已从 resultWithInterpret 拆出（第一参为空串）', /resultWithInterpret\('', result\.it/.test(app));
ok('解读仍走 resultWithInterpret 入口', app.includes('PP.resultWithInterpret('));

// ── ③ 每块只出现一次 ──────────────────────────────────────────
fn: {
  const n = (pat) => (app.match(new RegExp(pat, 'g')) || []).length;
  eq('chartHTML 调用一次', n('__html: chartHTML\\(result\\)'), 1);
  eq('perf 一处', n('PP\\.perfHTML\\(perf\\)'), 1);
  eq('trace 一处', n('PP\\.traceHTML\\(result\\.r\\.trace'), 1);
}