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
eq('覆盖 19 个体系分支（0.77.0 称骨分支撤除，其余走 quickHTML 兜底；0.86 福签、0.87 灵签）', kinds.length, 19);
eq('分支顺序与原分派一致',
  kinds.join(','),
  'ziwei,bazi,meihua,daliuren,qimen,hepan,tarot,qian,guanyin,liuyao,almanac,zeri,trend,name,mbti,constitution,wuyunliuqi,taiyi,fengshui');

const renderers = [...new Set([...chart.matchAll(/PP\.([a-zA-Z]+HTML)\(/g)].map((m) => m[1]))];
// plainHTML 是「说人话」层，不是盘面渲染器，但它也叫 *HTML，会被同一个正则抓到，所以计 23。
ok('渲染器去重后 23 个（19 体系 + trend/qimenFacts/ziweiHepan + quickHTML + plainHTML；chengguHTML 引擎级保留不再接分支）', renderers.length === 23, renderers.join(','));
ok('盘面函数只做分派，不掺技术块',
  !/perfHTML|revisionHTML|handleHTML|shadowHTML|traceHTML|caliberHTML/.test(chart),
  renderers.join(','));
ok('三元链以分号收尾（不是函数实参残留的逗号）', /PP\.quickHTML\(result\.r\);\s*\n/.test(chart));
ok('没有裸逗号收尾', !/PP\.quickHTML\(result\.r\),\s*\}/.test(chart));

// 「先说结论」方框：panel-kit 侧钉着「方框在盘面之前」，结果卡要盘面第一，
// 所以在 chartHTML 里把它剥下来挪到盘面之后——渲染器不改，只有顺序变。
ok('按开头是不是 mp-br 方框来判断', chart.includes("html.startsWith('<section class=\"mp-br\"')"), chart.slice(-300));
ok('剥下来的段接到盘面之后', /const body = end < 0 \? html : html\.slice\(end \+ 10\);/.test(chart), chart.slice(-260));
ok('没命中时原样返回', /const body = end < 0 \? html :/.test(chart));

// ── ② 结果卡拼接顺序：结论 → 盘面 → 时刻 → 解读 → 技术信息 ───────────
// 三层披露上线后，「第一块」从盘面换成了结论卡：盘面是这张盘的样子，结论才是用户来要的东西。
// 盘面仍排在所有技术信息（性能/修订/句柄/影子/推导链）之前，这条底线不动。
const iHead = app.indexOf('PP.envHeadHTML(result.it');
ok('结果卡以结论卡开头（打开第一眼就是判断）', iHead > 0);
const USER_ORDER = ['head', 'body', 'chart', 'shortId', 'castAt', 'interpret'];
const DEV_ORDER = ['revision', 'handle', 'shadow', 'trace', 'caliber', 'perf'];
ok('盘面在 parts 里现算', /chart:\s*chartHTML\(result\)/.test(app));
// 面板只传 12 段：追问条与导出条在面板里是独立 React 组件，不进这块 innerHTML
for (const k of [...USER_ORDER, ...DEV_ORDER]) {
  ok('面板传了 ' + k, new RegExp('\\n\\s*' + k + ':').test(app));
}
// 段序本身（含追问/附加的位置、五档差异）由 test/compose.test.mjs 用常量级断言钉住，
// 这里只保证面板把该传的都传了——别在两个文件里各写一份顺序表，改一处就会有一边过时。
ok('盘面已从 resultWithInterpret 拆出（第一参为空串）', /resultWithInterpret\('', result\.it/.test(app));
ok('解读仍走 resultWithInterpret 入口', app.includes('PP.resultWithInterpret('));

// ── ③ 每块只出现一次 ──────────────────────────────────────────
fn: {
  const n = (pat) => (app.match(new RegExp(pat, 'g')) || []).length;
  eq('chartHTML 只在一处被调用', n(': chartHTML\\(result\\)'), 1);
  eq('perf 一处', n('perf: PP\\.perfHTML\\(perf\\)'), 1);
  eq('trace 一处', n('PP\\.traceHTML\\(result\\.r\\.trace'), 1);

// ── 结果卡「说人话」层 ─────────────────────────────────────────────
{
  const appSrc = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
  const pkSrc = fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8');

  ok('panel-kit 有 pp.plainHTML', pkSrc.includes('pp.plainHTML = function'));
  ok('太乙跳过白话层（自带一套）', pkSrc.includes("r.system === 'taiyi'"));
  ok('三组读法齐全', ['SAY.cast', 'SAY.person', 'SAY.day'].every((x) => pkSrc.includes(x)));
  ok('输出带 mp-pl 外壳', pkSrc.includes('class="mp-pl"') && pkSrc.includes('mp-pl-lead'));
  ok('chartHTML 把白话接在盘面之后', appSrc.includes('return body + PP.plainHTML(result.r) + tail;'));
  ok('白话层不预测成败', !/必成|一定|注定/.test(pkSrc.slice(pkSrc.indexOf('pp.plainHTML'), pkSrc.indexOf('pp.taiyiHTML'))));
}
}