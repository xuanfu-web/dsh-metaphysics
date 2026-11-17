// 解释层与配色的三条质量线（0.82.x 第四批）：
//   ① 同一句长文不能在给模型的那段文本里念两遍（摘要自身、摘要与解析段都算）；
//   ② 分歧清单里状态一致的组，限定语只在小标题上出现一次，条目只说事；
//   ③ 小字令牌 --label / --faint 在 bg / card / band 三种底上都要过 WCAG AA 4.5:1。
import fs from 'node:fs';
import { compute, renderText } from '../engine/index.js';
import { caveatsFor } from '../engine/interpret-knowledge.js';
import { ok } from './_harness.mjs';

const KIT = fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8');
const CASES = [
  ['bazi', { system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male' }],
  ['ziwei', { system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male' }],
  ['liuyao', { system: 'liuyao', datetime: '2026-11-15T10:00', lines: [7, 8, 9, 7, 8, 9] }],
  ['hepan', { system: 'hepan', datetime: '1990-05-12T14:30', gender: 'male', partner: { datetime: '1992-08-03T09:15', gender: 'female' } }],
  ['tarot', { system: 'tarot', spread: 'three', seed: 7 }],
  ['qimen', { system: 'qimen', datetime: '2026-11-15T10:00' }],
  ['almanac', { system: 'almanac', datetime: '2026-11-17' }],
];
const textOf = (args) => renderText(compute({ ...args, withInterpret: true, detail: 'full' }));
const longSentences = (t) => t.split(/[。\n]/).map((s) => s.trim()).filter((s) => s.length >= 18);

// ── ① 长句不重复 ──
{
  let worst = '';
  for (const [tag, args] of CASES) {
    const sents = longSentences(textOf(args));
    const seen = new Set();
    const dup = [];
    for (const s of sents) { if (seen.has(s)) dup.push(s); else seen.add(s); }
    if (dup.length && !worst) worst = `${tag}: ${dup[0].slice(0, 30)}（${dup.length} 句）`;
    ok(`${tag}：给模型的文本里没有重复长句`, dup.length === 0, worst);
  }
}

// ── ② 去重不许删掉唯一一份：结论句、每张牌各自的位置说明都还在 ──
{
  const bazi = textOf(CASES[0][1]);
  for (const key of ['日主', '调候：', '穷通宝鉴：', '两层不同']) {
    ok(`八字：去重后「${key}」仍在文本里`, bazi.includes(key), key);
  }
  const tarot = textOf(CASES[4][1]);
  ok('塔罗：三张牌的位次说明齐全', /过去/.test(tarot) && /现在/.test(tarot) && /未来/.test(tarot));
  // 去重是「删重复的那一份」，不是「删短的那一份」：最短的正文段落也要留至少一句
  const paras = tarot.split('\n').filter((l) => l.trim().length > 0);
  ok('塔罗：去重后没有整段被清空', paras.length >= 5, `${paras.length} 段`);
}

// ── ③ 分歧清单：一致的组把限定语提到表头 ──
{
  for (const sys of ['bazi', 'ziwei', 'liuyao', 'tarot']) {
    const it = compute({
      ...(sys === 'bazi' ? { datetime: '1990-05-12T14:30', gender: 'male' }
        : sys === 'ziwei' ? { datetime: '1990-05-12T14:30', gender: 'male' }
          : sys === 'liuyao' ? { datetime: '2026-11-15T10:00', lines: [7, 8, 9, 7, 8, 9] }
            : { spread: 'three', seed: 7 }),
      system: sys,
      withInterpret: true,
    }).interpret;
    const sec = (it.sections || []).find((s) => s.key === 'caveats');
    if (!sec) continue;
    const disputed = caveatsFor(sys).filter((k) => k.status !== 'todo');
    const items = sec.text.split('\n').filter((l) => l.startsWith('· '));
    const perItemTag = items.filter((l) => /（文本·各家有异说）/.test(l));
    ok(`${sys}：条目不再各自拖「（文本·各家有异说）」`, perItemTag.length === 0,
      perItemTag.length ? perItemTag[0].slice(0, 40) : '');
    ok(`${sys}：限定语提到了小标题`, /均为文本·各家有异说/.test(sec.text), sec.text.slice(0, 40));
    ok(`${sys}：提标签没有吞掉条目`, items.length === disputed.length, `${items.length} 行 / ${disputed.length} 条`);
    ok(`${sys}：每条的本事仍在`, disputed.every((k) => sec.text.includes(k.gist)));
  }
}

// ── ④ 小字对比度：两套主题、三种底都要过 AA ──
{
  const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  const L = (hex) => {
    const rgb = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    return 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2]);
  };
  const ratio = (a, b) => {
    const [x, y] = [L(a), L(b)].sort((m, n) => n - m);
    return (x + 0.05) / (y + 0.05);
  };
  const all = [...KIT.matchAll(/--(label|faint|ink3):(#[0-9a-f]{6})/g)];
  ok('令牌定义齐全（label / faint / ink3 两套主题）', all.length === 6, `${all.length} 处`);
  // 浅色三处定义在前、深色在后：按出现顺序取前三个当浅色，后三个当深色
  const light = all.slice(0, 3).map((m) => m[2]);
  const dark = all.slice(3, 6).map((m) => m[2]);
  const lightGrounds = ['#f4f2ec', '#fdfdfb', '#f7f5ef'];
  const darkGrounds = ['#131311', '#1f1f1c', '#26261f'];
  let worstLight = 99;
  let worstDark = 99;
  for (const fg of light) for (const bg of lightGrounds) worstLight = Math.min(worstLight, ratio(fg, bg));
  for (const fg of dark) for (const bg of darkGrounds) worstDark = Math.min(worstDark, ratio(fg, bg));
  ok(`浅色小字最低对比度 ${worstLight.toFixed(2)}:1 ≥ 4.5`, worstLight >= 4.5, light.join('/'));
  ok(`深色小字最低对比度 ${worstDark.toFixed(2)}:1 ≥ 4.5`, worstDark >= 4.5, dark.join('/'));
  // 层级不许塌成一片：正文 → 标签 → 最弱，仍要能分出三档
  const ink = (KIT.match(/--ink:(#[0-9a-f]{6})/) || [])[1];
  const label = light[0];
  const faint = light[1];
  ok('浅色层级：正文 > 标签 > 最弱', ratio(ink, '#f4f2ec') > ratio(label, '#f4f2ec') && ratio(label, '#f4f2ec') > 3.9,
    `${ratio(ink, '#f4f2ec').toFixed(2)} / ${ratio(label, '#f4f2ec').toFixed(2)} / ${ratio(faint, '#f4f2ec').toFixed(2)}`);
  ok('旧的低对比度值已不再出现', !/--label:#8a8378|--faint:#a9a296/.test(KIT));
}

// ── ⑤ 判断标签语义色：「能成 / 要看条件 / 两头都有」得真的分得开 ──
// 曾经这三行写成 --env-good:var(--env-good) 自引用，整条声明作废：
// 浅色下三枚标签全靠继承，看着一模一样。这条断言就是钉住它别回潮。
{
  const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  const L = (hex) => {
    const rgb = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    return 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2]);
  };
  const ratio = (a, b) => {
    const [x, y] = [L(a), L(b)].sort((m, n) => n - m);
    return (x + 0.05) / (y + 0.05);
  };
  const selfRef = KIT.match(/--env-(good|warn|alt):var\(--env-/g) || [];
  ok('判断标签色不是自引用', selfRef.length === 0, selfRef.join(' '));
  const found = [...KIT.matchAll(/--env-(good|warn|alt):(#[0-9a-f]{6})/g)];
  ok('判断标签三色都有实值（两套主题各一套）', found.length >= 6, found.map((m) => m[2]).join(' '));
  // 定义必须落在 :root 上：结论卡 .mp-env-head 不在 .pp/.mp-it 令牌作用域里，
// 只写在那一套里的话 var() 取不到值 → 标签退回继承墨色（这就是当初「三枚同色」的根因）
  ok(':root 也定义了判断标签色', /:root\{--env-good:#[0-9a-f]{6};--env-warn:#[0-9a-f]{6};--env-alt:#[0-9a-f]{6}\}/.test(KIT));
  ok('深色也有 :root 级覆盖', /prefers-color-scheme:dark\)\{:root\{--env-good:#/.test(KIT));
  const light = found.slice(0, 3).map((m) => m[2]);
  const grounds = ['#fdfdfb', '#f4f2ec', '#f7f5ef'];
  let worst = 99;
  for (const fg of light) for (const bg of grounds) worst = Math.min(worst, ratio(fg, bg));
  ok(`判断标签最低对比度 ${worst.toFixed(2)}:1 ≥ 4.5`, worst >= 4.5, light.join('/'));
  const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  let minGap = 999;
  for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) {
    const a = rgb(light[i]); const b = rgb(light[j]);
    minGap = Math.min(minGap, Math.max(...a.map((v, k) => Math.abs(v - b[k]))));
  }
  ok(`三色彼此分得开（最大通道差 ${minGap} ≥ 24）`, minGap >= 24, light.join('/'));
  // 空态不该再用虚线框：虚线在这套界面里读成「还没做完」
  const empty = KIT.match(/\.mp-prof-empty\{[^}]*\}/);
  ok('空态是实线框而不是虚线', !!empty && !/dashed/.test(empty[0]), empty ? empty[0].slice(0, 60) : '缺规则');
}

// ── ⑥ 报告区的区块标题得是真标题 ────────────────────────────────
// 原来「结论 / 关键几点 / 怎么做 / 留意 / 人生 K 线 / 一眼看」全是 div 与 b：
// 读屏软件听不出层次，键盘与读屏的「跳标题」也就跳不进报告的任何一段。
// 换标签必须同时收掉 UA 的默认 margin 与粗体，视觉一个字都不许变。
{
  const heads = [
    ['结论', '<h2 class="mp-env-kicker">结论</h2>'],
    ['关键几点', '<h2 class="mp-env-sec-h">关键几点</h2>'],
    ['怎么做', '<h3 class="mp-env-adv-h">怎么做</h3>'],
    ['留意', '<h3 class="mp-env-risk-h">留意</h3>'],
    ['人生 K 线', '<h2 class="mp-kline-title">人生 K 线</h2>'],
    ['一眼看', '<h2 class="mp-yiyan-h">一眼看</h2>'],
    ['一页读懂', '<h3 class="mp-outline-h">一页读懂</h3>'],
    ['解析分节', '<h3 class="mp-it-sh">${esc(s.label)}'],
  ];
  for (const [label, html] of heads) ok(`「${label}」是标题元素`, KIT.includes(html), html);
  const resets = ['.mp-env-kicker{margin:0;', '.mp-env-adv b,.mp-env-adv h3{margin:0;',
    '.mp-env-risk b,.mp-env-risk h3{display:inline;margin:0 8px 0 0;', '.mp-it-sh{margin:0 0 6px}',
    '.mp-kline-title{margin:0;', '.mp-yiyan-h{display:inline;margin:0;',
    'h3.mp-env-adv-h{display:block}', 'h3.mp-it-sh{display:block}',
    '.mp-outline-h{margin:0 0 6px}', 'h3.mp-outline-h{display:block}'];
  ok('标题的 UA 默认 margin 都收掉了', resets.every((s) => KIT.includes(s)), resets.filter((s) => !KIT.includes(s)).join(' '));
  ok('标题元素各只渲染一处', ['mp-env-kicker', 'mp-env-sec-h', 'mp-env-adv-h', 'mp-env-risk-h', 'mp-kline-title', 'mp-yiyan-h', 'mp-outline-h']
    .every((c) => (KIT.match(new RegExp(`class="${c}"`, 'g')) || []).length === 1));
}