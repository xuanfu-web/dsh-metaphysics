// 三套内联 SVG 符号：爻线 / 五行 / 八卦。
// 只验结构与几何，不验像素；符号是纯函数，逐个单独验比从整盘反推更可靠。
import fs from 'node:fs';
import vm from 'node:vm';
import { compute } from '../engine/index.js';
import { ok } from './_harness.mjs';

const sandbox = { window: { Engine: { compute } }, console };
vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
const PP = sandbox.window.__PP;

const { _hexBar: hexBar, _wxIcon: wxIcon, _triGlyph: triGlyph } = PP;
ok('爻线生成器已暴露', typeof hexBar === 'function');
ok('五行生成器已暴露', typeof wxIcon === 'function');
ok('八卦生成器已暴露', typeof triGlyph === 'function');

// ── 一、爻线：阳一整条 / 阴两段 ──────────────────────────────
{
  const yang = hexBar(true, false);
  const yin = hexBar(false, false);
  ok('阳爻是 svg', yang.startsWith('<svg class="mp-hex"'));
  ok('阳爻 1 条 rect', (yang.match(/<rect/g) || []).length === 1, String((yang.match(/<rect/g) || []).length));
  ok('阴爻 2 条 rect', (yin.match(/<rect/g) || []).length === 2, String((yin.match(/<rect/g) || []).length));
  ok('阳爻满宽 104', yang.includes('width="104"'));
  // 阴爻两段 + 间隙 = 满宽
  const nums = [...yin.matchAll(/<rect x="([\d.]+)" y="[\d.]+" width="([\d.]+)"/g)].map((m) => [+m[1], +m[2]]);
  ok('阴爻两段等宽', nums.length === 2 && nums[0][1] === nums[1][1], JSON.stringify(nums));
  const total = nums.reduce((s, [, w]) => s + w, 0) + (nums[1][0] - (nums[0][0] + nums[0][1]));
  ok('阴爻两段+间隙 = 104', total === 104, String(total));
  ok('阴爻第二段不越界', nums[1][0] + nums[1][1] === 104, String(nums[1][0] + nums[1][1]));

  // 动爻 / 尺寸
  ok('动爻加 hex-on', hexBar(true, true).includes('hex-on'));
  ok('不动爻无 hex-on', !hexBar(true, false).includes('hex-on'));
  ok('sm 尺寸类', hexBar(true, false, 'sm').includes('mp-hex sm'));
  ok('md 尺寸类', hexBar(true, false, 'md').includes('mp-hex md'));
  ok('尺寸不影响几何', (hexBar(true, false, 'sm').match(/<rect/g) || []).length === (hexBar(true, false).match(/<rect/g) || []).length);

  // 无内联硬编码颜色（颜色交给 CSS 变量的 currentColor）
  ok('爻线用 currentColor', yang.includes('currentColor'));
  ok('爻线无十六进制色', !/-?\w*="#[0-9a-f]{3,6}"/i.test(yang));
  ok('爻线无 script', !/<script/i.test(yang + yin));
  ok('爻线 aria-hidden', yang.includes('aria-hidden="true"'));
}

// ── 二、五行符号 ────────────────────────────────────────────
{
  const els = ['木', '火', '土', '金', '水'];
  const svgs = els.map(wxIcon);
  ok('五种元素都有符号', svgs.every((s) => s.includes('<svg') && s.includes('<path')));
  ok('符号取 currentColor', svgs.every((s) => s.includes('stroke="currentColor"')));
  ok('符号为描边不填充', svgs.every((s) => s.includes('fill="none"')));
  // 路径必须互不相同，否则「金」「木」会长一样
  const ds = new Set(svgs.map((s) => (s.match(/d="([^"]+)"/) || [])[1]));
  ok('五条路径互不相同', ds.size === 5, `distinct=${ds.size}`);
  ok('未知元素返回空串', wxIcon('无') === '' && wxIcon(undefined) === '');
  ok('符号 aria-hidden', svgs[0].includes('aria-hidden="true"'));
  ok('符号无脚本', svgs.every((s) => !/<script/i.test(s)));
}

// ── 三、八卦符号：八个卦的爻位必须对 ────────────────────────────
{
  // TRI_BITS 自下而上：乾[1,1,1] 兑[1,1,0] 离[1,0,1] 震[1,0,0] 巽[0,1,1] 坎[0,1,0] 艮[0,0,1] 坤[0,0,0]
  const BITES = {
    乾: [1, 1, 1], 兑: [1, 1, 0], 离: [1, 0, 1], 震: [1, 0, 0],
    巽: [0, 1, 1], 坎: [0, 1, 0], 艮: [0, 0, 1], 坤: [0, 0, 0],
  };
  for (const [name, bitsBottomUp] of Object.entries(BITES)) {
    const svg = triGlyph(name);
    const rects = [...svg.matchAll(/<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)"/g)].map((m) => ({ x: +m[1], y: +m[2], w: +m[3] }));
    ok(`${name} 画三爻`, rects.length === (bitsBottomUp.filter((b) => b).length + bitsBottomUp.filter((b) => !b).length * 2), `${name} rects=${rects.length}`);
    // 按 y 分组：y=0 顶爻、4 中爻、8 初爻
    const byY = {};
    for (const r of rects) (byY[r.y] ||= []).push(r);
    const topDown = [0, 4, 8];
    const expected = bitsBottomUp.slice().reverse(); // 自上而下
    let matched = true;
    topDown.forEach((y, i) => {
      const group = byY[y] || [];
      const isYang = expected[i] === 1;
      if (isYang && !(group.length === 1 && group[0].w === 14)) matched = false;
      if (!isYang && !(group.length === 2 && group.every((g) => g.w === 5.6))) matched = false;
    });
    ok(`${name} 爻位正确（自上而下 ${expected.map((b) => (b ? '阳' : '阴')).join('')}）`, matched);
    ok(`${name} 不越界`, rects.every((r) => r.x >= 0 && r.x + r.w <= 14 && r.y >= 0 && r.y + 2 <= 10));
    ok(`${name} 无脚本`, !/<script/i.test(svg));
  }
  ok('未知卦返回坤形（全阴）不崩', triGlyph('无').includes('<svg'));
  ok('undefined 不崩', triGlyph(undefined).includes('<svg'));
}

// ── 四、整合到盘面 ──────────────────────────────────────────
{
  const LY = compute({ system: 'liuyao', lines: [9, 7, 8, 8, 7, 6], question: '测试' });
  const lyH = PP.liuyaoHTML(LY);
  ok('六爻盘含 SVG 爻线', /<svg class="mp-hex/.test(lyH));
  ok('六爻盘无旧 span 爻线', !/<span class="mp-hex/.test(lyH));
  ok('六爻盘有动爻标记位', lyH.includes('mp-hy-mv'));
  ok('六爻盘动爻标 ○', lyH.includes('○'));
  ok('六爻盘动爻标 ×', lyH.includes('×'));
  ok('六爻盘爻线包在 mp-hy-ln', lyH.includes('mp-hy-ln'));

  const MH = compute({ system: 'meihua', datetime: '1990-05-12T14:30', question: '测试' });
  const mhH = PP.meihuaHTML(MH);
  ok('梅花盘含八卦象', mhH.includes('mp-trig'));
  const trigs = mhH.match(/<svg class="mp-trig"[\s\S]*?<\/svg>/g) || [];
  ok('梅花上下卦各一象', trigs.length >= 2, String(trigs.length));
  ok('八卦象都画三爻', trigs.every((s) => {
    const rects = (s.match(/<rect/g) || []).length;
    return rects === 3 || rects === 6 || rects === 4 || rects === 5;
  }));

  const BZ = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'female', address: '河北石家庄' });
  const bzH = PP.baziHTML(BZ);
  ok('八字盘含五行符号', bzH.includes('mp-wxi'));
  ok('五行符号挂在 wx 色类内', /class="pp-chip wx-\w+"><svg class="mp-wxi"/.test(bzH));
  ok('用神行含五行符号', /class="wx-\w+"><svg class="mp-wxi"/.test(bzH.split('喜')[1] || ''));
}

// ── 五、不破坏既有结构（回归护栏）────────────────────────────
{
  const BZ = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'female', address: '河北石家庄' });
  const bzH = PP.baziHTML(BZ);
  ok('五行旺相休囚死行结构未变', /<b class="wx-\w+">(.)<\/b><em>(.)<\/em>/.test(bzH));
  ok('天干仍带 bz-big wx-*', /class="bz-big wx-(wood|fire|earth|metal|water)"/.test(bzH));
  ok('藏干仍带 bz-cg wx-*', /<i class="bz-cg wx-\w+">/.test(bzH));
  ok('四柱表仍在', bzH.includes('<table class="pp-bz">'));
}

// ── 六、无脏值与注入面 ──────────────────────────────────────
{
  const all = [
    PP.baziHTML(compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'female' })),
    PP.meihuaHTML(compute({ system: 'meihua', datetime: '1990-05-12T14:30' })),
    PP.liuyaoHTML(compute({ system: 'liuyao', lines: [7, 8, 9, 8, 7, 6] })),
  ].join('');
  ok('无 NaN/Infinity', !/NaN|Infinity/.test(all));
  ok('无 script 标签', !/<script/i.test(all));
  ok('无事件属性', !/on(error|load|click)=/i.test(all));
}
