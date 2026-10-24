// 渲染层安全回归：用户可控文本（所问之事 / 错误文案）不得以 HTML 形式进入 innerHTML。
//
// 背景：0.14.0 的塔罗面板把 r.question 直接拼进模板，塔罗解读段落又会回显问题原文，
// 两处都未转义；src/web-ui.js 的错误提示把 e.message（含用户填的 datetime 原文）拼进 innerHTML。
// 面板与宿主页面同源，这类注入的影响面不止本插件。
import fs from 'node:fs';
import vm from 'node:vm';
import { assemble } from '../tools/build-client.mjs';
import { ok } from './_harness.mjs';

const reactStub = { createElement: () => null, useState: () => [null, () => {}] };

// 引擎
let cap = null;
vm.runInNewContext(assemble('return { inject: [], apply() {}, engine: Engine };'), {
  window: { __ModuleLoader__: { load: (m) => { cap = m; } } },
  console,
}, { filename: 'probe.js' });
const E = cap.factory(() => reactStub).engine;

// 渲染器
const sandbox = { window: { Engine: E }, console };
vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
const PP = sandbox.window.__PP;
ok('渲染器可用', !!PP && typeof PP.tarotHTML === 'function');

const PAYLOAD = '<img src=x onerror="alert(1)"><script>alert(2)</script>';

// ① 塔罗面板：所问之事 + 解读段落里的问题回显
const tarot = E.compute({ system: 'tarot', count: 3, question: PAYLOAD });
const tHtml = PP.tarotHTML(tarot);
ok('塔罗面板不再出现原始 <img>', !/<img/i.test(tHtml), (tHtml.match(/<img[^>]*>/i) || [''])[0]);
ok('塔罗面板不再出现原始 <script>', !/<script/i.test(tHtml));
ok('塔罗面板保留转义后的可读文本', tHtml.includes('&lt;img'));
ok('解读段落同样转义', (tarot.reading || []).length > 0 && !/<img/i.test(tHtml));

// ② 解析层：ask.question 回显（面板 + 文本两条路径）
const bazi = E.compute({
  system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male',
  withInterpret: true, question: PAYLOAD,
});
const iHtml = PP.interpretHTML(bazi.interpret);
ok('解析面板不再出现原始 <img>', !/<img/i.test(iHtml));
ok('解析面板保留转义后的文本', iHtml.includes('&lt;img'));

// ③ web-ui 的错误路径：源码层面确认已改成 textContent（这里没有 DOM，只能查实现）
const webUi = fs.readFileSync(new URL('../src/web-ui.js', import.meta.url), 'utf8');
ok('错误提示走 textContent', /box\.textContent\s*=/.test(webUi));
ok('错误提示不再拼进 innerHTML', !/class="err">\$\{/.test(webUi));

// ④ 转义函数本身的边界：属性上下文里的引号也必须被处理
const quoted = E.compute({ system: 'tarot', count: 1, question: '" onmouseover="alert(3)' });
const qHtml = PP.tarotHTML(quoted);
ok('引号被转义（属性注入失效）', !/onmouseover="alert\(3\)"/.test(qHtml) && qHtml.includes('&quot;'));
