// 八字四柱表版式：四列并排、无竖线、天干地支大字、十神分组着色、五行旺相休囚死
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

const SEASON_EL = { 寅: '木', 卯: '木', 巳: '火', 午: '火', 申: '金', 酉: '金', 亥: '水', 子: '水', 辰: '土', 戌: '土', 丑: '土', 未: '土' };
const GEN = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const OVR = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };

const mk = (datetime) => compute({ system: 'bazi', datetime, gender: 'male', address: '安徽池州' });
const r = mk('1996-01-19T07:31');
const html = PP.baziHTML(r);

// ── 一、表格骨架：四柱固定四列 + 左窄行名 ───────────────────────
{
  ok(/<table class="pp-bz">/.test(html), '八字用 pp-bz 表格渲染');
  ok(/table-layout:fixed/.test(SRC), '固定表格布局，四列等分不被内容撑歪');
  ok(/\.pp-bz\{width:100%;max-width:860px;margin:0 auto/.test(SRC), '桌面端限制最大宽度并居中');
  ok(/\.pp-bz th:first-child,\.pp-bz td\.bz-lbl\{width:46px\}/.test(SRC), '行名列固定 46px 窄列');
  // 表头四柱
  const ths = html.match(/<th[^>]*>([^<]*)<\/th>/g) || [];
  eq(ths.length, 5, '表头 = 1 个空角 + 4 个柱名');
  for (const n of ['年柱', '月柱', '日柱', '时柱']) ok(html.includes(`>${n}</th>`), `表头含「${n}」`);
}

// ── 二、无竖线、只用极淡横线 ───────────────────────────────────
{
  ok(/\.pp-bz th,\.pp-bz td\{[^}]*border:none/.test(SRC), '单元格无四边框（不用竖线切列）');
  ok(/\.pp-bz tr\+tr td\{border-top:1px solid var\(--hair\)\}/.test(SRC), '行间只用 --hair 发丝横线');
  // 明暗两套都要定义（浅色值随色板调整：底色压深后发丝线需同步加深，否则与背景几乎同亮、失去分隔作用）
  ok(/--hair:#e9e2d3/.test(SRC) && /--hair:#2f2b23/.test(SRC), '--hair 明暗两套都在');
}

// ── 三、天干地支大字：选择器必须真的命中 ───────────────────────
{
  ok(/class="bz-big wx-wood"|class="bz-big wx-fire"|class="bz-big wx-earth"|class="bz-big wx-metal"|class="bz-big wx-water"/.test(html),
    '天干/地支用 .big 包住并带五行色类');
  ok(/\.pp-bz \.bz-big\{font-size:26px/.test(SRC), '大字样式挂在后代 .big 上');
  ok(!/\.pp-bz td\.big/.test(SRC), '不得写 td.bz-big（class 在 span 上，td.bz-big 永不命中）');
  eq((html.match(/<span class="bz-big /g) || []).length, 8, '4 柱 × 天干地支 = 8 个大字');
}

// ── 四、十神按五类分组、颜色全部走变量 ─────────────────────────
{
  const groups = { 'tg-bi': ['比肩', '劫财'], 'tg-shi': ['食神', '伤官'], 'tg-cai': ['偏财', '正财'], 'tg-guan': ['七杀', '正官'], 'tg-yin': ['偏印', '正印'] };
  for (const [cls, names] of Object.entries(groups)) {
    ok(new RegExp(`\\.${cls}\\{color:var\\(--${cls}\\)\\}`).test(SRC), `.${cls} 用变量 −−${cls} 着色`);
    ok(new RegExp(`--${cls}:#[0-9a-fA-F]{6}`).test(SRC), `变量 −−${cls} 已声明（浅色）`);
  }
  ok(/--tg-bi:#93b7cf/.test(SRC), '深色块重定义了十神分组色（不参与打印）');
  ok(!/#4a6f8a|#4c7a5c|#8a6b1f|#9c5b56|#6d5f83/.test(SRC.replace(/--[a-zA-Z0-9-]+:#[0-9a-fA-F]{3,6}(?=[;}])/g, '')),
    '十神分组色不得在变量声明之外残留硬编码');
}

// ── 五、藏干逐行列出并跟五行色 ─────────────────────────────────
{
  ok(/\.pp-bz \.bz-cg\{display:block;font-style:normal/.test(SRC), '藏干每条独立成行');
  ok(/<i class="bz-cg wx-/.test(html), '藏干带五行色类');
  const cg = (html.match(/<i class="bz-cg wx-\w+">([^<]+)<\/i>/g) || []).length;
  ok(cg >= 4 && cg <= 16, `藏干条数落在合理区间（实际 ${cg}）`);
}

// ── 六、五行旺相休囚死：以月令推五态 ───────────────────────────
function wxCells(h) {
  const m = h.match(/<td class="bz-wxs" colspan="4">([\s\S]*?)<\/td>/);
  if (!m) return null;
  return [...m[1].matchAll(/<b class="wx-\w+">(.)<\/b><em>(.)<\/em>/g)].map((x) => ({ el: x[1], st: x[2] }));
}
{
  const cells = wxCells(html);
  ok(!!cells, '表格末行有「五行」一格（colspan=4，横跨四柱）');
  ok(/<td class="bz-lbl">五行<\/td>/.test(html), '五行行左侧有行名');
  eq((cells || []).length, 5, '五态各一项');
  eq((cells || []).map((c) => c.st).join(''), '旺相休囚死', '顺序为 旺 → 相 → 休 → 囚 → 死');
  eq(new Set((cells || []).map((c) => c.el)).size, 5, '五行互不重复');

  // 与月令对齐：旺 = 当令五行，其余按生克
  const seasonEl = SEASON_EL[r.pillars.month.branch];
  const got = Object.fromEntries((cells || []).map((c) => [c.st, c.el]));
  eq(got['旺'], seasonEl, `旺 = 月令${r.pillars.month.branch}本气（${seasonEl}）`);
  eq(got['相'], GEN[seasonEl], '相 = 我生（当令所生）');
  eq(got['休'], Object.keys(GEN).find((k) => GEN[k] === seasonEl), '休 = 生我（生当令者）');
  eq(got['囚'], Object.keys(OVR).find((k) => OVR[k] === seasonEl), '囚 = 克我（克当令者）');
  eq(got['死'], OVR[seasonEl], '死 = 我克（当令所克）');
  // 和引擎里日主强弱用的月令五行必须同一口径
  eq(seasonEl, r.strength.parts.season.element, '渲染用的月令五行与引擎 strength.parts.season 一致');
}

// ── 七、反向断言：换月令，五行行必须跟着变 ─────────────────────
{
  const cases = ['1996-01-19T07:31', '1996-05-19T07:31', '1996-08-19T07:31', '1996-11-19T07:31'];
  const seen = cases.map((d) => {
    const rr = mk(d);
    const c = wxCells(PP.baziHTML(rr));
    return `${rr.pillars.month.branch}:${(c || []).map((x) => x.el + x.st).join('')}`;
  });
  eq(new Set(seen).size >= 3, true, '四个不同月令至少推出三种不同的五行行（不是写死的）');
  for (const s of seen) {
    const [mb, rest] = s.split(':');
    eq(rest.startsWith(SEASON_EL[mb]), true, `月令${mb} 时首位是当令五行（${rest.slice(0, 2)}）`);
  }
}

// ── 八、窄屏：一处也不能 2×2 折行 ──────────────────────────────
{
  eq((SRC.match(/\.pp-bz \.bz-big\{font-size:23px\}/g) || []).length, 2, '@media 与 @container 两处都收紧大字');
  eq((SRC.match(/\.pp-bz td\.bz-wxs\{font-size:11px/g) || []).length, 2, '五行行也有两处窄屏覆盖');
  ok(!/\.pp-bz tbody\{display:(grid|flex)/.test(SRC), 'tbody 不得改成网格（会破坏四柱并列）');
}

if (fails.length) {
  console.log(`FAIL ${fails.length} 项：`);
  for (const f of fails.slice(0, 15)) console.log('  -', f);
  process.exit(1);
}
console.log(`PASS 八字四柱表版式 ${pass} 项断言`);
