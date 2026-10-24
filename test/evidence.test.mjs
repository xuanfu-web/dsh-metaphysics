// 解析的"依据"：命盘类维度必须列出引用的盘面事实，且两种渲染路径都要带上。
//
// 目标不是好看，而是可核对——用户看到"你适合土金水"时，能立刻看到"喜土金水 / 忌火木 / 月令巳火"
// 这些原始事实；模型引用时也不会凭空加戏。
import fs from 'node:fs';
import vm from 'node:vm';
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

const dimsOf = (r) => (r.interpret && r.interpret.dimensions) || [];

// ── ① 八字：五维都有依据 ───────────────────────────────────
const bzDims = dimsOf(BZ);
ok('八字解析仍是五维', bzDims.length === 5, String(bzDims.length));
for (const d of bzDims) {
  ok(`八字·${d.label} 有依据`, Array.isArray(d.evidence) && d.evidence.length >= 2, (d.evidence || []).join('；'));
}
// 依据必须是真的盘面事实：日主、喜忌、大运都在
const bzAll = bzDims.flatMap((d) => d.evidence || []).join('｜');
ok('八字依据含日主', /日主\s*\S/.test(bzAll), bzAll.slice(0, 40));
ok('八字依据含喜忌', /喜 .*忌/.test(bzAll), bzAll.slice(0, 60));
ok('八字依据含大运或流年', /大运|流年/.test(bzAll));

// ── ② 紫微：五维都有依据 ───────────────────────────────────
const zwDims = dimsOf(ZW);
ok('紫微解析仍是五维', zwDims.length === 5, String(zwDims.length));
for (const d of zwDims) {
  ok(`紫微·${d.label} 有依据`, Array.isArray(d.evidence) && d.evidence.length >= 2, (d.evidence || []).join('；'));
}
const zwAll = zwDims.flatMap((d) => d.evidence || []).join('｜');
ok('紫微依据含命宫主星', /命宫\s*\S/.test(zwAll), zwAll.slice(0, 40));
ok('紫微依据含宫位主星', /官禄|夫妻宫|疾厄宫/.test(zwAll));

// ── ③ 文本渲染带「依据」行 ─────────────────────────────────
const txt = interpretText(BZ.interpret);
// 用「缩进 + 依据」定位维度下的依据行，避免把「格局依据」这个 section 标题算进来
const evLines = (txt.match(/\n　依据：/g) || []).length;
ok('interpretText 输出依据行', evLines === 5, String(evLines));
ok('依据行不夹 undefined', !/undefined/.test(txt));

// ── ④ 面板渲染：有 mp-it-dev 且内容被转义 ───────────────────
const sandbox = { window: {}, console };
vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
const PP = sandbox.window.__PP;
const html = PP.interpretHTML(BZ.interpret);
ok('面板渲染出依据块', (html.match(/mp-it-dev/g) || []).length === 5, String((html.match(/mp-it-dev/g) || []).length));
ok('依据块含「依据」标签', html.includes('<b>依据</b>'));

// 转义：人为塞一条带标签的依据
const evil = JSON.parse(JSON.stringify(BZ.interpret));
evil.dimensions[0].evidence = ['<img src=x onerror=alert(1)>'];
const evilHtml = PP.interpretHTML(evil);
ok('依据内容被转义', !/<img/i.test(evilHtml) && evilHtml.includes('&lt;img'));
