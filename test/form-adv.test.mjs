// 表单分块与「高级选项」折叠（P0-21 / P1-24）。
//
// 这里的每一条都对应一次真实的用户困惑：选风水的人看见「八字 × 紫微 交叉验证」，
// 而 23 点出生的人，如果「晚子时换日」被折进高级选项里，他永远不会知道自己
// 的时柱是按次日算的——所以这两类字段的分界线不是「常用 / 少用」，是
// 「不看也不影响结果」还是「不看就可能出假盘」。
import { ok } from './_harness.mjs';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const BUILD = fs.readFileSync(path.join(ROOT, 'tools', 'build-html.mjs'), 'utf8');
const UI = fs.readFileSync(path.join(ROOT, 'src', 'web-ui.js'), 'utf8');

// 取一个 id 对应的块：从 id="xxx" 所在位置起，到它自己的收尾标签为止。
// 必须截到收尾，否则「for-solar 里没有 online」这种断言会因为把后面的块也框进来而假红。
function block(id, endTag) {
  const at = BUILD.indexOf('id="' + id + '"');
  if (at < 0) return '';
  const start = BUILD.lastIndexOf('<', at);
  const end = BUILD.indexOf(endTag || '</div>', at);
  return BUILD.slice(start, end < 0 ? start + 600 : end);
}

// ── 分块：谁跟谁一组 ─────────────────────────────────────────────
const solar = block('for-solar');
const bazi = block('for-bazi');
const adv = BUILD.indexOf('<details class="adv" id="for-adv"');
const advBlock = adv >= 0 ? block('for-adv', '</details>') : '';

ok('for-solar 是独立的块', solar.length > 0 && solar.includes('class="grp"'));
ok('for-solar 里有出生地', /id="addr"/.test(solar));
ok('for-solar 里有真太阳时', /id="ts"/.test(solar));
ok('for-bazi 是独立的块', bazi.length > 0);
ok('for-bazi 里有晚子时换日', /id="latezi"/.test(bazi));

// 联网与交叉验证都滚进高级选项，不再占着台面
ok('for-solar 不再包含联网开关', !/id="online"/.test(solar));
ok('for-bazi 不再包含交叉验证', !/id="cross"/.test(bazi));
ok('有 id 为 for-adv 的 details', adv >= 0);
ok('高级选项里面有联网', /id="online"/.test(advBlock));
ok('高级选项里面有交叉验证', /id="cross"/.test(advBlock));
ok('高级选项的两项各自带 id 供显隐', /id="adv-online"/.test(advBlock) && /id="adv-cross"/.test(advBlock));

// 晚子时换日必须留在台面上：折起来就等于藏了一个会改时柱的口径
ok('晚子时换日没有被折进高级选项', !/id="latezi"/.test(advBlock));

// ── 稳态：id 唯一，别在别处又摆一份 ────────────────────────────
['for-solar', 'for-bazi', 'for-adv', 'adv-online', 'adv-cross'].forEach((id) => {
  const n = BUILD.split('id="' + id + '"').length - 1;
  ok('id ' + id + ' 在表单里只出现一次', n === 1);
});
['addr', 'ts', 'latezi', 'online', 'cross'].forEach((id) => {
  const n = BUILD.split('id="' + id + '"').length - 1;
  ok('控件 ' + id + ' 只有一份', n === 1);
});

// ── 显隐：setTab 里按体系分 ─────────────────────────────────────
ok('setTab 控制 for-solar 的显隐', /el\('for-solar'\)/.test(UI) && /solar\.style\.display/.test(UI));
ok('setTab 控制 for-bazi 的显隐', /show\('for-bazi', tab === 'bazi'/.test(UI) || /el\('for-bazi'\)\.style\.display\s*=\s*tab === 'bazi'/.test(UI));
ok('setTab 控制 for-adv 的显隐', /el\('for-adv'\)/.test(UI) && /adv\.style\.display/.test(UI));
ok(
  '高级选项在 birth 类体系或八字/紫微下才露',
  /adv\.style\.display\s*=\s*\(birth \|\| tab === 'bazi' \|\| tab === 'ziwei'\)/.test(UI)
);
ok('联网只跟 birth 类走', /advOnline\.style\.display\s*=\s*birth/.test(UI));
ok('交叉验证只跟八字/紫微走', /advCross\.style\.display\s*=\s*\(tab === 'bazi' \|\| tab === 'ziwei'\)/.test(UI));

// ── 视觉：独占一行、展开内部用 flex 排 ─────────────────────────
ok('高级选项独占整行', /\.adv\{grid-column:1\/-1\}/.test(BUILD));
ok('收起时 summary 是一行可点', /\.adv>summary\{[^}]*list-style:none/.test(BUILD));
ok('summary 有三角指示且展开时转向', /\.adv>summary::before\{content:'▸'/.test(BUILD) && /\.adv\[open\]>summary::before\{transform:rotate/.test(BUILD));
ok('展开后内部不被 grid 一列挤住', /\.adv>\.grp\{display:flex;flex-wrap:wrap/.test(BUILD));
ok('去掉 webkit 默认三角', /\.adv>summary::-webkit-details-marker\{display:none\}/.test(BUILD));

// ── tooltip：每个可能被误读的开关都要有解释 ─────────────────────
// title 挂在 label 上（浏览器 hover 整行都能出提示），不是挂在 input 上。
[
  ['真太阳时', 'ts', /真太阳时/],
  ['晚子时换日', 'latezi', /晚子时/],
  ['联网', 'online', /区县/],
  ['交叉验证', 'cross', /对照/]
].forEach(([name, id, word]) => {
  const m = BUILD.match(new RegExp('<label[^>]*title="([^"]*)"[^>]*>\\s*<input id="' + id + '"'));
  ok(name + '开关的 label 带 title 解释', !!m && word.test(m[1]));
});
