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

// ── 高亮块字色（深色主题下品牌色变浅，白字会糊掉）──────────
{
  ok('颜色工具已导出', ['parseRGB', 'hexToRGB', 'luminance', 'contrastRatio', 'pickOnColor'].every((k) => typeof Core[k] === 'function'));

  // 与 WCAG 定义对齐：纯白/纯黑 = 21:1
  ok('对比度公式对得上 WCAG', Math.abs(Core.contrastRatio([255, 255, 255], [0, 0, 0]) - 21) < 0.01);
  ok('同色对比度为 1', Math.abs(Core.contrastRatio([18, 17, 12], [18, 17, 12]) - 1) < 1e-9);

  // 解析：rgb / rgba / 简写 hex 都收，半透明与非颜色串一律当「没有实底」
  ok('解析 rgb', JSON.stringify(Core.parseRGB('rgb(255, 255, 255)')) === '[255,255,255]');
  ok('解析 rgba 不透明', JSON.stringify(Core.parseRGB('rgba(10,20,30,1)')) === '[10,20,30]');
  ok('半透明背景不当作实底', Core.parseRGB('rgba(0,0,0,0)') === null && Core.parseRGB('rgba(0,0,0,.2)') === null);
  ok('非颜色串返回 null', Core.parseRGB('var(--x)') === null && Core.parseRGB('') === null);

  // 方向：深底配白字、浅底配近黑
  ok('深色底挑白字', Core.pickOnColor('rgb(20,40,90)') === Core.ON_DARK);
  ok('浅色底挑近黑', Core.pickOnColor('rgb(240,240,240)') === Core.ON_LIGHT);
  ok('量不到时返回空串（交给 CSS 兜底）', Core.pickOnColor('rgba(0,0,0,0)') === '' && Core.pickOnColor('') === '');

  // 关键：不能挑出比另一边更差的颜色。用 RGB 步长 51 的全网格走一遍。
  let worst = 99;
  let suboptimal = 0;
  for (let r = 0; r <= 255; r += 51) {
    for (let g = 0; g <= 255; g += 51) {
      for (let b = 0; b <= 255; b += 51) {
        const bg = [r, g, b];
        const picked = Core.pickOnColor(`rgb(${r}, ${g}, ${b})`);
        const got = Core.contrastRatio(bg, Core.hexToRGB(picked));
        const other = Core.contrastRatio(bg, Core.hexToRGB(picked === Core.ON_DARK ? Core.ON_LIGHT : Core.ON_DARK));
        if (got + 1e-9 < other) suboptimal += 1;
        worst = Math.min(worst, Math.max(got, other));
      }
    }
  }
  ok('全色域里都挑对比度高的一侧', suboptimal === 0, `${suboptimal} 个底色的选择比另一边差`);
  // 中灰（如 #7f7f7f）两边都到不了 4.5，这是色彩本身的极限，不是选错；
  // 但任何底色下都应当至少过 3:1（大字号 AA），否则就是真的看不清。
  ok('任何底色下字对比度不低于 3:1', worst >= 3, `最低 ${worst.toFixed(2)}`);
}
