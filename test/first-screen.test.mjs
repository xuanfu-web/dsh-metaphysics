// 0.39.0：首屏按「想干什么」分组（问一件事 / 看一个人 / 查日子）+ 最近用过 + 分组↔平铺。
//
// 约束：分组卡片只是另一套入口——22 个 tab 原样保留，两套入口走同一条 setTab/activate 路径；
// 页面断网、localStorage 不可用时，分组与平铺都必须照常能用，只是不记「最近用过」。
import fs from 'node:fs';
import { page } from '../tools/build-html.mjs';
import { ok, eq } from './_harness.mjs';

const html = page();
const ui = fs.readFileSync(new URL('../src/web-ui.js', import.meta.url), 'utf8');
const narrow = html.slice(html.indexOf('@media (max-width:640px)'), html.indexOf('@media print{'));

const tabList = [...html.matchAll(/<button class="tab" data-tab="([a-z]+)"/g)].map((m) => m[1]);
const toolList = [...html.matchAll(/<button type="button" class="tool(?: wide)?" data-tab="([a-z]+)"/g)].map((m) => m[1]);

// ── ① 分组首屏：三组、每组一句白话 ──────────────────────────────
ok('首屏分组区存在', /<section class="start" id="start"/.test(html));
eq('三个分组', (html.match(/class="tgroup"/g) || []).length, 3);
{
  const heads = [...html.matchAll(/<div class="tgroup-head"><h2>([^<]+)<\/h2><p>([^<]+)<\/p><\/div>/g)].map((m) => m[1]);
  eq('组名与顺序', heads.join(','), '问一件事,看一个人,查日子');
  const hints = [...html.matchAll(/<div class="tgroup-head"><h2>[^<]+<\/h2><p>([^<]+)<\/p><\/div>/g)].map((m) => m[1]);
  eq('每组都有一句白话提示', hints.length, 3);
  ok('提示不是占位文案', hints.every((h) => h.length >= 8), hints.join(' / '));
}

// ── ② 分组是精选入口：20 个，缺的两个留在平铺 ──────────────────
eq('分组里 20 个入口', toolList.length, 20);
eq('入口不重复', new Set(toolList).size, 20);
ok('分组是平铺的子集', toolList.every((k) => tabList.includes(k)), toolList.filter((k) => !tabList.includes(k)).join(','));
eq('分组刻意不收录星座与数字', tabList.filter((k) => !toolList.includes(k)).sort().join(','), 'numerology,star');
{
  const entries = [...html.matchAll(/<button type="button" class="tool(?: wide)?" data-tab="[a-z]+"(?: title="[^"]*")?><b>([^<]+)<\/b><span>([^<]+)<\/span><\/button>/g)];
  eq('20 项都带名称与白话说明', entries.length, 20);
  ok('白话说明不是空串', entries.every((m) => m[2].trim().length >= 4));
  ok('六爻的白话说明在页面上', html.includes('<b>六爻</b><span>摇六次问事</span>'));
}

// ── ③ 平铺回退：22 个 tab 原样保留，可一键切回 ──────────────────
eq('平铺的 22 个 tab 仍在', tabList.length, 22);
ok('视图开关默认选中分组', /<button type="button" data-view="group" class="on">分组<\/button>/.test(html));
ok('可切回平铺', /<button type="button" data-view="flat">平铺<\/button>/.test(html));
ok('分组视图收起平铺 tab 条', /body\.view-group \.tabs\{display:none\}/.test(html));
ok('平铺视图收起分组区', /body\.view-flat \.start\{display:none\}/.test(html));
ok('视图选择单独记忆', /const VIEW_KEY = 'mp\.first\.view'/.test(ui));
ok('切换视图时写入记忆', /storeSet\(VIEW_KEY, b\.dataset\.view\)/.test(ui));
ok('启动时恢复上次的视图', /applyView\(storeGet\(VIEW_KEY\) === 'flat' \? 'flat' : 'group'\)/.test(ui));

// ── ④ 最近用过：最多 3 条，只在用户动手时记 ────────────────────
ok('最近用过的存储键', /const RECENT_KEY = 'mp\.recent\.tabs'/.test(ui));
ok('最多记 3 条', /const RECENT_MAX = 3/.test(ui) && /slice\(0, RECENT_MAX\)/.test(ui));
ok('写入时按上限截断', /function recordRecent\(t\)[\s\S]{0,220}list\.slice\(0, RECENT_MAX\)/.test(ui));
ok('重复入口提到最前而不是记两条', /filter\(\(x\) => x && x\.tab && x\.tab !== t\)/.test(ui));
ok('点入口时记录', /function activate\(next\) \{[\s\S]{0,160}recordRecent\(next\)/.test(ui));
ok('点主按钮起卦/排盘时也记录', /function goCast\(\) \{\s*recordRecent\(tab\);/.test(ui));
ok('人格问卷答够提交时记录', /mbAnswered\(\) < MBTI_MIN\) \{ mbNudge\(\); return; \}\s*recordRecent\('mbti'\)/.test(ui));
// C3 深链：启动改成「先读链接、没有再排默认盘」；仍然不能在初始化时写最近记录
ok('启动时先看深链再排盘', /const deep = readDeepLink\(\);\s*setTab\(deep \? deep\.tab : 'ziwei'\)/.test(ui));
const bootBlock = (ui.match(/const deep = readDeepLink\(\);[\s\S]*?Promise\.resolve\(run\(\)\)/) || [''])[0];
ok('首屏初始化不写最近记录', !!bootBlock && !/recordRecent/.test(bootBlock), bootBlock.length ? bootBlock.slice(0, 60) : '没找到启动块');
ok('没有记录时整行隐藏', /row\.hidden = list\.length === 0/.test(ui));
ok('隐藏要显式写样式（display:flex 会盖掉 [hidden]）', /\.recent\[hidden\]\{display:none\}/.test(html));
ok('存储里的 tab 先过白名单（不直接当选择器）', /labels\[x\.tab\]/.test(ui));

// ── ⑤ 存储不可用要降级，不能把页面搞坏 ─────────────────────────
ok('读存储失败返回空', /function storeGet\(key\) \{\s*try \{/.test(ui) && /catch \(e\) \{ return null; \}/.test(ui));
ok('写存储失败静默降级', /function storeSet\(key, val\) \{\s*try \{/.test(ui) && /catch \(e\) \{ \/\* 存不了不影响使用 \*\/ \}/.test(ui));
ok('最近用过的名称走文本节点，不拼 HTML', /b\.appendChild\(document\.createTextNode\(labels\[x\.tab\]\)\)/.test(ui));

// ── ⑥ 每组先露 4 个，其余折起来（宽窄屏同一口径） ───────────────
ok('每组只露前 4 个（全局规则）', /\.tgroup:not\(\.open\) \.ttools>\.tool:nth-child\(n\+5\)\{display:none\}/.test(html));
ok('折叠按钮默认可见', /\.tmore\{display:flex;/.test(html));
ok('桌面端也折叠，不再只在窄屏', !/\.tmore\{display:none/.test(html));
ok('折叠按钮写明还有几个', /more\.textContent = `还有 \$\{extra\} 个`/.test(ui));
ok('展开/收起并有 aria 状态', /g\.classList\.toggle\('open'\)/.test(ui) && /aria-expanded/.test(ui));
ok('按实际入口数算折叠数量', /g\.querySelectorAll\('\.ttools>\.tool'\)\.length - 4/.test(ui));

// ── ⑦ 两套入口共用一条激活路径 ────────────────────────────────
ok('tab 与分组卡片都走 activate',
  /querySelectorAll\('\.tab, \.tool'\)\.forEach\(\(b\) => b\.addEventListener\('click', \(\) => activate\(b\.dataset\.tab\)\)\)/.test(ui));
ok('activate 内部仍走 setTab', /function activate\(next\) \{\s*setTab\(next\);/.test(ui));
ok('切 tab 时同步分组卡片高亮',
  /document\.querySelectorAll\('\.tool'\)\.forEach\(\(b\) => b\.classList\.toggle\('on', b\.dataset\.tab === tab\)\)/.test(ui));

// ── ⑧ 深色与打印 ───────────────────────────────────────────────
// 0.49.3：强调面改用变量（旧的深色元素规则写在基础规则之前、被同优先级覆盖，实际没生效）
ok('选中卡片文字走 --on-accent / --on-accent-soft',
  /\.tool\.on b\{color:var\(--on-accent\)\}/.test(html) && /\.tool\.on span\{color:var\(--on-accent-soft\)\}/.test(html));
ok('打印时隐藏首屏分组与视图开关', /\.start,\.view-switch\{display:none!important\}/.test(html));
