// 0.50.1：宿主面板首屏与独立页同步（分组 / 最近用过 / 分组↔平铺 / 窄屏收纳）。
//
// 约束：分组数据只有一份（src/groups.mjs）——页面构建时生成 HTML，面板构建时注入
// window.__MPGroups；两处都不许再各写一份，否则又会像 0.39 之后那样悄悄分叉。
import fs from 'node:fs';
import { GROUPS } from '../src/groups.mjs';
import { page } from '../tools/build-html.mjs';
import { ok, eq } from './_harness.mjs';

const app = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
const html = page();
const clientBuild = fs.readFileSync(new URL('../tools/build-client.mjs', import.meta.url), 'utf8');
const pageBuild = fs.readFileSync(new URL('../tools/build-html.mjs', import.meta.url), 'utf8');

const flat = GROUPS.flatMap((g) => g.items);
const keys = flat.map((it) => it.k);

// ── ① 分组数据：三组、19 项、顺序与文案 ─────────────────────────
eq('分组数', GROUPS.length, 3);
eq('组名与顺序', GROUPS.map((g) => g.title).join(','), '问一件事,看一个人,查日子');
ok('每组一句白话提示', GROUPS.every((g) => g.hint && g.hint.length >= 8), GROUPS.map((g) => g.hint).join(' / '));
eq('入口共 19 项', flat.length, 19);
eq('入口不重复', new Set(keys).size, 19);
ok('每项都有名称与白话说明', flat.every((it) => it.label && it.tip && it.tip.length >= 4));
ok('窄屏奇数项的「人生K」铺满整行', GROUPS[1].items.some((it) => it.k === 'trend' && it.wide === true));

// ── ② 与平铺的 19 个 tab 一一对应 ───────────────────────────────
const tabKeys = [...app.matchAll(/\{ k: '([a-z]+)', label: '/g)].map((m) => m[1]);
eq('面板平铺 tab 也是 19 个', tabKeys.length, 19);
eq('分组入口与平铺 tab 集合一致', [...keys].sort().join(','), [...tabKeys].sort().join(','));

// ── ③ 唯一数据源：面板注入、页面生成，两边都不再手抄 ─────────────
ok('面板从 window.__MPGroups 取分组', /const GROUPS = Array\.isArray\(window\.__MPGroups\) \? window\.__MPGroups : \[\]/.test(app));
ok('面板源码里不再内联分组文案', !app.includes("title: '问一件事'"));
ok('构建把 GROUPS 注入 client', /window\.__MPGroups = \$\{JSON\.stringify\(GROUPS\)\}/.test(clientBuild));
ok('构建 client 时引入 groups.mjs', /from '\.\.\/src\/groups\.mjs'/.test(clientBuild));
ok('页面构建引入 groups.mjs', /from '\.\.\/src\/groups\.mjs'/.test(pageBuild));
ok('页面分组由 GROUPS 生成', /\$\{GROUPS\.map\(\(g\) => `/.test(pageBuild));

// ── ④ 页面产物与分组数据逐项一致 ───────────────────────────────
const pageTools = [...html.matchAll(/<button type="button" class="tool(?: wide)?" data-tab="([a-z]+)"><b>([^<]+)<\/b><span>([^<]+)<\/span><\/button>/g)]
  .map((m) => ({ k: m[1], label: m[2], tip: m[3] }));
eq('页面生成 19 个入口', pageTools.length, 19);
eq('页面入口顺序与数据一致', pageTools.map((t) => t.k).join(','), keys.join(','));
eq('页面名称与数据一致', pageTools.map((t) => t.label).join(','), flat.map((it) => it.label).join(','));
eq('页面白话与数据一致', pageTools.map((t) => t.tip).join(','), flat.map((it) => it.tip).join(','));
ok('页面仍保留「还有 N 个」折叠按钮', (html.match(/class="tmore" aria-expanded="false"/g) || []).length === 3);

// ── ⑤ 面板首屏：分组卡片 / 最近用过 / 视图开关 ──────────────────
ok('首屏容器与分组网格', /className: 'mp-start'/.test(app) && /className: 'mp-groups'/.test(app));
ok('分组卡片逐项渲染并带 data-tab', /['"]data-tab['"]: k/.test(app) && /className: 'mp-tool'/.test(app));
ok('最近用过最多 3 条', /const RECENT_MAX = 3/.test(app));
ok('最近用过按入口去重并提到最前', /filter\(\(x\) => x && x\.tab && x\.tab !== k\)/.test(app));
ok('写入时按上限截断', /\.slice\(0, RECENT_MAX\)/.test(app));
ok('最近用过的名称来自 TABS 白名单', /TABS\.some\(\(t\) => t\.k === x\.tab\)/.test(app));
ok('没有记录时整行隐藏', /hidden: recentList\.length === 0/.test(app) && /\.mp-recent\[hidden\]\{display:none\}/.test(app));
ok('视图开关持久化（分组/平铺）', /const VIEW_KEY = 'mp\.first\.view'/.test(app) && /storeSet\(VIEW_KEY, next\)/.test(app));
ok('启动时恢复上次视图', /storeGet\(VIEW_KEY\) === 'flat' \? 'flat' : 'group'/.test(app));
ok('分组视图隐藏平铺 tab 条', /'mp-tabs' \+ \(view === 'flat' \? '' : ' hide'\)/.test(app) && /\.mp-tabs\.hide\{display:none\}/.test(app));
ok('两套入口共用 activate', /const activate = \(k\) => \{\s*recordRecent\(k\);\s*switchTo\(k\);\s*\}/.test(app));
ok('tab 与卡片都走 activate', /onClick: \(\) => activate\(t\.k\)/.test(app) && /onClick: \(\) => activate\(k\)/.test(app));

// ── ⑥ 窄屏收纳：每组先露 4 项，其余折起来 ──────────────────────
ok('容器查询按侧栏宽度折叠', /@container \(max-width:560px\)/.test(app));
ok('折叠规则只藏第 5 项以后', /\.mp-tgroup:not\(\.open\) \.mp-ttools>\.mp-tool:nth-child\(n\+5\)\{display:none\}/.test(app));
ok('折叠按钮平时不显示', /\.mp-tmore\{display:none/.test(app));
ok('折叠按钮写明还有几个', /`还有 \$\{extra\} 个`/.test(app));
ok('展开/收起带 aria-expanded', /'aria-expanded': open \? 'true' : 'false'/.test(app));
ok('按实际入口数算折叠数量', /Math\.max\(0, g\.items\.length - 4\)/.test(app));

// ── ⑦ 存储不可用要降级 ─────────────────────────────────────────
ok('读存储失败返回 null', /function storeGet\(key\) \{\s*try \{/.test(app) && /catch \(e\) \{ return null; \}/.test(app));
ok('写存储失败静默', /function storeSet\(key, val\) \{\s*try \{/.test(app) && /catch \(e\) \{ \/\* 存不了不影响使用 \*\/ \}/.test(app));
