// 用户侧文案：不留内部词、按钮四字以内（P1-33 / P1-34）。
//
// 这两条不是审美问题。内部词（句柄、影子盘、口径对照、验前事、生时校正）
// 出现在用户眼前时，读的人不知道它指什么，只会得出「这东西不是给我用的」。
// 按钮文字太长则更直接：手机上一排按钮本该两个一行，「存为摘要长图」占满整行，
// 后面「复制深链」被挤到看不见的位置。
//
// 判据分两层：能渲染的就渲出来查（真断言），只剩源码的才退回读文本。
import { ok } from './_harness.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compute, interpret } from '../engine/index.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');
const kitSrc = fs.readFileSync(path.join(root, 'src', 'panel-kit.js'), 'utf8');
const composeSrc = fs.readFileSync(path.join(root, 'src', 'compose.js'), 'utf8');
const uiSrc = fs.readFileSync(path.join(root, 'src', 'web-ui.js'), 'utf8');
const appSrc = fs.readFileSync(path.join(root, 'src', 'app.js'), 'utf8');

globalThis.window = {};
new Function('window', kitSrc)(globalThis.window);
new Function('window', composeSrc)(globalThis.window);
const PP = globalThis.window.__PP;
const C = globalThis.window.__MPCompose;

const han = (s) => (String(s).match(/[\u4e00-\u9fa5]/g) || []).length;

// 内部词：只许出现在开发者视图里
const INTERNAL = ['句柄', '影子盘', '口径对照', '一句话改参', '验前事', '生时校正'];

const bazi = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', trueSolar: false });
const it = interpret(bazi, { question: '这两年事业怎么走', direction: 'career' });

// ── 1. 用户视图：一段内部词都不许有 ───────────────────────────
const head = PP.envHeadHTML(it, { folded: false });
const body = PP.interpretHTML(it, { folded: false });
const chart = PP.ziweiHTML(compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male', trueSolar: false }));
const userView = head + body + chart;
INTERNAL.forEach((w) => {
  ok('用户视图不含内部词「' + w + '」', !userView.includes(w));
});

// ── 2. 开发者视图：这些词还在（不是删掉功能，是分层） ─────────
const devBits = [
  PP.handleHTML('mc1.7x9k.abcd'),
  PP.shadowHTML({ id: 'AB12CD', version: '0.82.0', baseId: 'B1' }),
  PP.caliberHTML({ note: 'x', groups: [] })
].join('');
ok('开发者视图里仍能看见「句柄」', devBits.includes('句柄'));
ok('开发者视图里仍能看见「影子盘」', devBits.includes('影子盘'));

// ── 3. 用户视图的标题是人话 ─────────────────────────────────
ok('核对过去的标题改成问句', /先核对过去几年/.test(uiSrc) && /先核对过去几年/.test(appSrc));
ok('反推时辰的标题改成问句', /不确定几点出生/.test(uiSrc) && /不确定几点出生/.test(appSrc));
ok('不再有「只读，不改盘」这种旁注', !/只读，不改盘/.test(uiSrc) && !/只读，不改盘/.test(appSrc));

// ── 4. 导出条按钮：动词 + 对象，汉字 ≤4 ────────────────────
const expBar = (uiSrc.match(/<div class="exp no-print">([\s\S]*?)<span class="hint">/) || ['', ''])[1];
const expLabels = Array.from(expBar.matchAll(/<button type="button" data-act="([a-z]+)"[^>]*>([^<]+)<\/button>/g))
  .map((m) => [m[1], m[2].trim()]);
ok('导出条按钮数量没变', expLabels.length === 9, '实际 ' + expLabels.length + ' 个');
ok('导出条第一项是改条件', expLabels.length > 0 && expLabels[0][0] === 'reform');
expLabels.forEach(([act, label]) => {
  ok('按钮「' + label + '」汉字不超过四个', han(label) <= 4, '汉字 ' + han(label));
});
const LABELS = expLabels.map((x) => x[1]);
['存 PDF', '存长图', '存 .md', '复制链接', '存卦例'].forEach((want) => {
  ok('导出条有「' + want + '」', LABELS.includes(want));
});

// ── 5. 面板侧：桥接按钮同样四字以内 ────────────────────────
const bridgeKinds = Array.from(appSrc.matchAll(/\['(full|brief|structured|link)', '([^']+)'/g)).map((m) => m[2]);
ok('面板桥接有四档', bridgeKinds.length === 4, bridgeKinds.join('/'));
bridgeKinds.forEach((label) => {
  ok('桥接按钮「' + label + '」汉字不超过四个', han(label) <= 4, '汉字 ' + han(label));
});

// ── 6. 同一件事不许两套叫法 ───────────────────────────────
// 开发者视图里那张卡仍叫「排盘句柄」（那是它的准确名字），用户侧一律叫盘号。
ok('页面脚本里不再出现「排盘句柄」', !/排盘句柄/.test(uiSrc) && !/排盘句柄/.test(appSrc));
ok('用户侧统一叫「盘号」', /盘号/.test(appSrc) && /盘号/.test(uiSrc));
ok('导出条没有「存为」这类长写法', !/存为 PDF|存为摘要长图/.test(uiSrc));
