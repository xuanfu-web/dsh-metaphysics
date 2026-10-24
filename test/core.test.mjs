// 两个 UI 共用的表单规则（src/core.js）：爻值解析、问事体系、数字输入。
//
// 这些规则原本在 app.js 与 web-ui.js 各写一遍，改一处漏一处（例如 0.14.1 加的错误码
// 就只改了工具层）。现在合成一份，这里直接加载浏览器文件做单测。
import fs from 'node:fs';
import vm from 'node:vm';
import { ok } from './_harness.mjs';

const sandbox = { window: {}, console };
vm.runInNewContext(fs.readFileSync(new URL('../src/core.js', import.meta.url), 'utf8'), sandbox, { filename: 'core.js' });
const Core = sandbox.window.__MPCore;

ok('core 已挂到 window', !!Core && typeof Core.parseLines === 'function');

// ── 问事体系 ──────────────────────────────────────────────
for (const k of ['liuyao', 'meihua', 'daliuren', 'tarot']) ok(`${k} 需要所问之事`, Core.needAsk(k) === true);
for (const k of ['bazi', 'ziwei', 'hepan', 'qimen', 'nope']) ok(`${k} 不需要所问之事`, Core.needAsk(k) === false);

// ── 爻值解析 ──────────────────────────────────────────────
const six = Core.parseLines('9 7 8 8 7 6');
ok('六值解析成功', JSON.stringify(six.lines) === '[9,7,8,8,7,6]' && six.warning === '', JSON.stringify(six));
ok('混写分隔符也能解析', JSON.stringify(Core.parseLines('9,7,8,8,7,6').lines) === '[9,7,8,8,7,6]');
ok('空输入 = 随机（无提示）', Core.parseLines('').lines === null && Core.parseLines('').warning === '');
ok('空白输入 = 随机', Core.parseLines('   ').lines === null);

const short = Core.parseLines('7 8 9');
ok('不足 6 个给提示', short.lines === null && /正好 6 个/.test(short.warning), short.warning);
const bad = Core.parseLines('1 2 3 4 5 6');
ok('值越界给提示', bad.lines === null && /6\/7\/8\/9/.test(bad.warning), bad.warning);
ok('多一个也给提示', /正好 6 个/.test(Core.parseLines('7 8 9 6 7 8 9').warning));

// ── 数字输入 ──────────────────────────────────────────────
ok('空串不当 0', Core.toNumber('') === null);
ok('数字串转数字', Core.toNumber(' 3 ') === 3);
ok('非数字返回 null', Core.toNumber('abc') === null);
ok('0 是合法输入', Core.toNumber('0') === 0);
