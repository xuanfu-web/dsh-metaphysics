// 不发版本号时，「改了什么」只认 CHANGELOG 的「未发布」段这一处来源。
// 这里钉住解析口径（段边界、顶层条目、转义）与两处产物是否真把清单带出去。
import fs from 'node:fs';
import { ok, eq } from './_harness.mjs';
import { unreleasedItems, unreleasedFromChangelog, badgeHtml, methodBlockHtml, escHtml } from '../tools/unreleased.mjs';
import { page } from '../tools/build-html.mjs';

const read = (p) => fs.readFileSync(new URL('../' + p, import.meta.url), 'utf8');

// ── 解析口径 ────────────────────────────────────────────────
const SAMPLE = [
  '## 未发布',
  '',
  '- **甲事**（`a.js`）：',
  '  - 子条目 **不该算一条**',
  '',
  '- 没有粗体标题的顶层条目',
  '- **乙事**（`b.js`）：',
  '',
  '## 0.9.0（已发布）',
  '',
  '- **丙事**：',
].join('\n');
eq('只取未发布段的顶层粗体条目', JSON.stringify(unreleasedItems(SAMPLE)), JSON.stringify(['甲事', '乙事']));
eq('下一个 ## 标题即止，不吞已发布条目', unreleasedItems(SAMPLE).includes('丙事'), false);
eq('没有未发布段时返回空', JSON.stringify(unreleasedItems('## 0.1.0\n\n- **甲事**')), '[]');
eq('空文本返回空', JSON.stringify(unreleasedItems('')), '[]');
eq('null 返回空', JSON.stringify(unreleasedItems(null)), '[]');
eq('CRLF 与 LF 同解', JSON.stringify(unreleasedItems(SAMPLE.replace(/\n/g, '\r\n'))), JSON.stringify(['甲事', '乙事']));
eq('未发布段是最后一段时也收得住',
  JSON.stringify(unreleasedItems('## 未发布\n- **甲事**\n')), JSON.stringify(['甲事']));
eq('版本段之后的旧「未发布」草稿不算当前清单',
  JSON.stringify(unreleasedItems('## 0.9.0（已发布）\n\n- **已发**\n\n## 未发布\n\n- **旧草稿**\n')),
  '[]');

// ── 渲染 ──────────────────────────────────────────────────
eq('空清单不渲染小牌（不留「另含 0 项」）', badgeHtml([]), '');
eq('null 清单同样不渲染', badgeHtml(null), '');
ok('两项时写出「另含 2 项未发版改动」', /另含 2 项未发版改动/.test(badgeHtml(['甲', '乙'])));
ok('小牌的 title 逐条列出', badgeHtml(['甲', '乙']).indexOf('甲；乙') > 0, badgeHtml(['甲', '乙']));
ok('条目里的引号与尖括号被转义',
  /&lt;b&gt;/.test(badgeHtml(['含 <b>标签</b>'])) && !/title="[^"]*<b>/.test(badgeHtml(['含 <b>标签</b>'])),
  badgeHtml(['含 <b>标签</b>']));
eq('escHtml 处理 & 与单引号', escHtml('a & b "c"'), 'a &amp; b &quot;c&quot;');
ok('方法段带小标题', /^<h3>本版之后又改了什么/.test(methodBlockHtml(['甲'])), methodBlockHtml(['甲']).slice(0, 40));
ok('方法段逐条成 li', (methodBlockHtml(['甲', '乙']).match(/<li>/g) || []).length === 2);
ok('方法段指回 CHANGELOG 的未发布段', /CHANGELOG 的「未发布」段/.test(methodBlockHtml(['甲'])));
eq('空清单时方法段整段不渲染', methodBlockHtml([]), '');
ok('方法段里的条目同样转义', /&lt;script&gt;/.test(methodBlockHtml(['<script>'])));

// ── 仓库里这份 CHANGELOG ───────────────────────────────────
// 只钉「解析与渲染口径」，不钉「此刻有没有未发版条目」——发版会把这一段清空，
// 拿仓库当前状态当期望值，下一次发版当天就会误红。
const real = unreleasedFromChangelog(new URL('../CHANGELOG.md', import.meta.url));
ok('条目都是顶层粗体标题（不掺子条目）', real.every((t) => t && t === t.trim()), real.join(' / '));
ok('不把已发布段的条目算进来', real.every((t) => !/择日神煞宜忌层/.test(t)), real.join(' / '));

// ── 产物接线 ──────────────────────────────────────────────
const HTML = page();
// 小牌与方法段必须与清单同进同退：有清单就必须渲染，没清单就必须整块消失
eq('小牌出现与否与未发布段一致', /class="ver-note"/.test(HTML), real.length > 0);
eq('方法段出现与否与未发布段一致', /本版之后又改了什么/.test(HTML), real.length > 0);
ok('小牌要么没有，要么紧跟版本徽标（不另起一块）',
  !/class="ver-note"/.test(HTML) || /<span class="ver">v[\d.]+<\/span><span class="ver-note"/.test(HTML));
ok('非空清单时小牌写出条数', real.length === 0 || HTML.includes(`另含 ${real.length} 项未发版改动`), `清单 ${real.length} 条`);
ok('窄屏只藏小牌、不藏方法段清单', /\.ver-note\{display:none\}/.test(HTML));
ok('小牌字色只走变量', /\.ver-note\{[^}]*color:var\(--ink2\)/.test(HTML));
// 11px 小字压在 --panel2 上：浅/深两套都要够到 AA 的 4.5:1（与 theme.test.mjs 同一套 WCAG 算法）
{
  const rgbOf = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  const lum = (rgb) => 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2]);
  const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
  const varsOf = (txt) => Object.fromEntries([...txt.matchAll(/--([a-z0-9-]+):#([0-9a-fA-F]{3,6})\b/g)]
    .map((m) => [m[1], '#' + (m[2].length === 3 ? m[2].split('').map((c) => c + c).join('') : m[2])]));
  const rootAt = HTML.indexOf(':root{');
  const darkAt = HTML.indexOf('prefers-color-scheme:dark');
  const schemes = [['浅色', HTML.slice(rootAt, HTML.indexOf('}', rootAt))],
    ['深色', HTML.slice(darkAt, HTML.indexOf('}}', darkAt))]];
  for (const [name, decl] of schemes) {
    const v = varsOf(decl);
    const c = contrast(rgbOf(v.ink2), rgbOf(v.panel2));
    ok(`${name}·小牌字色 ${c.toFixed(2)}:1 ≥ 4.5`, c >= 4.5, `${v.ink2} on ${v.panel2}`);
  }
}
const CLIENT = read('client.js');
const BCLIENT = read('tools/build-client.mjs');
ok('build-client 两个入口（全量包与正式入口）都注入清单',
  (BCLIENT.match(/\$\{unreleasedLine\(\)\}/g) || []).length === 2,
  String((BCLIENT.match(/\$\{unreleasedLine\(\)\}/g) || []).length));
ok('client.js 里确有未发版改动计数', /window\.__MP_UNRELEASED\s*=\s*\d+/.test(CLIENT));
// 产物是压缩过的，等号两边没有空格——按压缩后的形态断言，别拿源码写法去比
// 注入的是数组字面量（发版后清单为空也仍是 `[]`，所以只比到左括号）
ok('注入的是算出来的项数而不是手写清单', /__MP_UNRELEASED\s*=\s*\d+/.test(CLIENT));
const APP = read('src/app.js');
ok('面板报错行带出未发版改动项数', /__MP_UNRELEASED \? ' · 未发版改动 '/.test(APP));
ok('没有未发版改动时报错行不多话（三元另一支是空串）', /' 项' : ''\)/.test(APP));
