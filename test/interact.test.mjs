// 0.10.0 新增：宫位点击展开详情、三方四正联动、身宫格类名修复、触摸目标 44px
import fs from 'node:fs';
import { compute } from '../engine/index.js';

let pass = 0;
const fails = [];
const eq = (a, b, msg) => { if (a === b) pass++; else fails.push(`${msg}：期望 ${JSON.stringify(b)}，实际 ${JSON.stringify(a)}`); };
const ok = (c, msg) => { if (c) pass++; else fails.push(msg); };

globalThis.window = globalThis.window || {};
const SRC = fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8');
new Function('window', SRC)(globalThis.window);
const PP = globalThis.window.__PP;

const BR = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const r = compute({ system: 'ziwei', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州' });
const html = PP.ziweiHTML(r);

// ── 一、身宫格类名必须与视图容器类名分开 ────────────────────────
// .pp-body 是视图容器（display:none）。曾经身宫格也用 pp-body，
// 结果 12 宫只显示 11 宫，身宫那格整个消失。
{
  const cellClasses = html.match(/class="pp-cell[^"]*"/g) || [];
  eq(cellClasses.length, 36, '12 宫 × 3 视图 = 36 个宫格');
  const shenCells = cellClasses.filter((c) => c.includes('pp-shen'));
  eq(shenCells.length, 3, '身宫格用 pp-shen 标记（三视图各一处）');
  eq(cellClasses.filter((c) => /\bpp-body\b/.test(c)).length, 0, '宫格不得带 pp-body 类（会撞视图容器的 display:none）');
  ok(/\.pp-shen::after\{content:"身"/.test(SRC), '.pp-shen::after 渲染「身」角标');
}

// ── 二、每个宫格带 data-pi / data-view，供点击定位 ───────────────
{
  eq((html.match(/data-pi="\d+"/g) || []).length, 36, '36 个宫格都带 data-pi');
  for (const v of ['ben', 'da', 'ln']) {
    eq((html.match(new RegExp(`data-view="${v}"`, 'g')) || []).length >= 12, true, `${v} 视图宫格带 data-view`);
  }
  eq((html.match(/class="pp-detail"/g) || []).length, 3, '三个视图各有一个详情容器');
  ok(/\.pp-detail\.open\{display:block\}/.test(SRC), '详情展开态有独立样式');
}

// ── 三、详情内容：按视图命宫排宫名 ──────────────────────────────
{
  const soulIdx = BR.indexOf(r.soul.branch);
  const d = PP._palaceDetailHTML(soulIdx, soulIdx);
  ok(d.includes('命宫'), '命宫详情标题为「命宫」');
  ok(d.includes('大限'), '详情含大限区间');
  ok(d.includes('小限起'), '详情含小限起始年龄');
  ok(d.includes('三方四正'), '详情含三方四正行');
  ok(d.includes('十二神'), '详情含长生/博士/将前/岁前四层十二神');
  ok(d.includes('宫干四化'), '详情含宫干四化');
  ok(/data-pp-close/.test(d), '详情有收起按钮');
  // 大限视图下，同一地支的宫名应随大限命宫改变
  const dxPalace = r.palaces.find((p) => p.daxian.start <= 1 && p.daxian.end >= 1) || r.palaces[0];
  const dxIdx = BR.indexOf(dxPalace.branch);
  const d2 = PP._palaceDetailHTML(soulIdx, dxIdx);
  eq(/<b>命宫<\/b>/.test(d2), true, '大限视图下大限命宫应排为命宫');
}

// ── 四、空宫必须写出借对宫主星 ──────────────────────────────────
{
  const soulIdx = BR.indexOf(r.soul.branch);
  let foundEmpty = false;
  for (let i = 0; i < 12; i++) {
    const p = r.palaces.find((x) => BR.indexOf(x.branch) === i);
    const hasMain = p.stars.some((s) => s.type === '主星');
    if (hasMain) continue;
    foundEmpty = true;
    const d = PP._palaceDetailHTML(i, soulIdx);
    ok(d.includes('无主星'), `${p.branch}宫空宫标注「无主星」`);
    ok(d.includes('借对宫'), `${p.branch}宫空宫标注借对宫主星`);
  }
  ok(foundEmpty, '本盘存在空宫（用于验证借星文案）');
}

// ── 五、三方四正联动：三个关联宫位 ──────────────────────────────
{
  const src = SRC;
  ok(/fx\(pi \+ 4\)/.test(src) && /fx\(pi \+ 8\)/.test(src) && /fx\(pi \+ 6\)/.test(src), '联动覆盖三合(+4/+8)与对宫(+6)三宫');
  ok(/pp-link/.test(src), '关联宫用 pp-link 高亮');
  ok(/function clearMarks/.test(src), '切换宫位前清掉上一轮标记');
  // 再点同一宫收回
  ok(/classList\.contains\('pp-sel'\)/.test(src), '再点同一宫可收起');
}

// ── 六、触摸目标：视图切换 ≥44px ────────────────────────────────
{
  ok(/\.pp-modes label\{[^}]*min-height:44px/.test(SRC), '本命/大限/流年 切换目标高度 ≥44px');
  ok(/\.pp-detail \.dh \.x\{[^}]*min-height:44px/.test(SRC), '详情收起按钮高度 ≥44px');
  ok(/\.pp-detail \.dh \.x\{[^}]*min-width:48px/.test(SRC), '详情收起按钮宽度 ≥44px');
}

// ── 七、详情排版用 grid（flex 会让长值整块换行、标签与内容错行）──
{
  ok(/\.pp-detail \.dr\{[^}]*display:grid/.test(SRC), '详情行用 grid 对齐标签与内容');
  eq(/\.pp-detail \.dr\{[^}]*flex-wrap/.test(SRC), false, '详情行不再用可换行的 flex');
}

// ── 八、容器查询与竖屏都覆盖详情面板 ────────────────────────────
{
  eq((SRC.match(/\.pp-detail\{padding:9px 10px 11px\}/g) || []).length, 2, '@media 与 @container 两处都收紧详情内边距');
}

if (fails.length) {
  console.log(`FAIL ${fails.length} 项：`);
  for (const f of fails.slice(0, 15)) console.log('  -', f);
  process.exit(1);
}
console.log(`PASS 宫位交互与触摸目标 ${pass} 项断言`);
