// 生成可双击打开的单文件 HTML（引擎 + 界面全部内联，无需服务器）
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { buildModule, MODULE_ORDER } from './build-client.mjs';
// 询问方向的选项直接取自引擎，避免界面与解析层两处维护
import { DIRECTIONS, DIRECTION_DEFAULT } from '../engine/interpret.js';

const root = path.resolve(import.meta.dirname, '..');

// 页面「方法与验证」里的规模数字从断言基线读，不留手写常量（发版忘改就会骗订阅者）。
const baseline = JSON.parse(fs.readFileSync(path.join(root, 'test', 'assertion-baseline.json'), 'utf8'));
const TEST_FILES = Object.keys(baseline.files || {}).length;
const TEST_ASSERTS = baseline.total || Object.values(baseline.files || {}).reduce((a, b) => a + b, 0);
// 页面上标出版本：桌面那份拷贝是不是最新构建，一眼能看出来
const VERSION = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')).version;
const DIR_OPTIONS = DIRECTIONS
  .map((d) => `<option value="${d.key}"${d.key === DIRECTION_DEFAULT ? ' selected' : ''}>${d.label}</option>`)
  .join('');

export const CSS = `
:root{--bg:#f3eee4;--panel:#fffdf8;--panel2:#f8f3e9;--line:#d6cbb7;--ink:#1a1916;--ink2:#3f3a33;--dim:#6f6a60;--gold:#a72c23;--gold-deep:#7d1f18;--good:#1f6f3f;--bad:#a72c23;--warn:#8a5a00;
  /* 强调面（选中 tab、主按钮等实心底）与压在上面的文字色，两套配色各给一组 */
  --accent-bg:#a72c23;--accent-bg2:#7d1f18;--on-accent:#fff;--on-accent-soft:rgba(255,255,255,.84);
  --radius:12px;--shadow:0 1px 2px rgba(35,28,18,.05),0 18px 40px -30px rgba(35,28,18,.42);--ring:0 0 0 3px rgba(167,44,35,.16)}
/* 深色：跟随系统。只换变量，元素规则一条不改。@media screen 限定 → 打印永远浅色 */
@media screen and (prefers-color-scheme:dark){
  :root{--bg:#12110d;--panel:#1b1913;--panel2:#221f18;--line:#3c372e;--ink:#e7e2d6;--ink2:#d5cfc2;--dim:#9b9488;--gold:#e2755f;--gold-deep:#b8503f;--good:#67b98a;--bad:#e2755f;--warn:#d9a052;
    /* 深色下 --gold 是浅珊瑚，实心底若沿用原色，白字与深字都够不着 4.5:1；
       所以强调面单独取一档更亮的珊瑚，压深色字（见 test/theme.test.mjs 的对比度复算） */
    --accent-bg:#f0a38e;--accent-bg2:#e2755f;--on-accent:#14130f;--on-accent-soft:rgba(20,19,15,.84);
    --shadow:0 1px 2px rgba(0,0,0,.5),0 18px 40px -30px rgba(0,0,0,.9);--ring:0 0 0 3px rgba(226,117,95,.2)}
}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;color:var(--ink);font:16px/1.65 "Microsoft YaHei","PingFang SC",system-ui,sans-serif;padding-bottom:env(safe-area-inset-bottom);
  background:
    radial-gradient(900px 460px at 14% -160px,color-mix(in srgb,var(--gold) 9%,transparent),transparent 68%),
    radial-gradient(760px 420px at 96% -120px,color-mix(in srgb,var(--good) 7%,transparent),transparent 72%),
    var(--bg);
  -webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
::selection{background:color-mix(in srgb,var(--gold) 24%,transparent)}
:where(button,input,select,textarea,a,summary):focus-visible{outline:2px solid var(--gold);outline-offset:2px;border-radius:6px}
.wrap{max-width:1180px;margin:0 auto;padding:22px 26px 60px}
/* 抬头竖排：品牌在上，tab 条独占一行。19 个 tab 横排在品牌右侧会把末行挤成「起名 人格」孤零零两个 */
header{display:flex;flex-direction:column;align-items:stretch;gap:12px;margin-bottom:18px;padding-bottom:14px;border-bottom:1px solid var(--line)}
.brand-row{display:flex;align-items:center;justify-content:space-between;gap:10px 16px;flex-wrap:wrap}
.brand{display:flex;align-items:center;gap:12px;font-size:22px;font-weight:700;letter-spacing:.14em;color:var(--gold);line-height:1.3}
.brand .seal{display:inline-flex;align-items:center;justify-content:center;flex:none;width:40px;height:40px;border-radius:11px;
  background:linear-gradient(145deg,var(--accent-bg),var(--accent-bg2));color:var(--on-accent);font:700 20px/1 "Songti SC","SimSun",serif;letter-spacing:0;
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.22),0 8px 18px -10px var(--gold)}
.brand-txt{display:block;min-width:0}
.brand-txt small{display:block;font-size:12.5px;letter-spacing:.02em;color:var(--dim);font-weight:400;margin-top:3px}
.ver{display:inline-block;margin-left:8px;vertical-align:3px;padding:2px 8px;border:1px solid var(--line);border-radius:999px;background:var(--panel2);
  color:var(--dim);font:600 11px/1.5 system-ui,sans-serif;letter-spacing:.04em}
/* 等宽网格铺满一行：每格同宽、末行左对齐，不会出现右对齐造成的锯齿缺口 */
.tabs{display:grid;grid-template-columns:repeat(auto-fit,minmax(74px,1fr));grid-auto-rows:minmax(36px,auto);gap:6px}
.tab{display:flex;align-items:center;justify-content:center;text-align:center;padding:7px 10px;border-radius:999px;border:1px solid transparent;background:color-mix(in srgb,var(--panel) 62%,transparent);color:var(--dim);cursor:pointer;font-size:13.5px;font-family:inherit;white-space:nowrap;
  transition:background .16s ease,color .16s ease,border-color .16s ease,box-shadow .16s ease}
.tab:hover{background:var(--panel);border-color:var(--line);color:var(--ink)}
.tab.on{background:linear-gradient(145deg,var(--accent-bg),var(--accent-bg2));border-color:transparent;color:var(--on-accent);font-weight:600;box-shadow:0 8px 18px -12px var(--gold)}
/* 首屏按「想干什么」分组：19 个 tab 平铺时，第一次来的人得先猜「梅花」「称骨」是什么。
   卡片只是另一套入口，点击仍走同一个 setTab；熟练用户可一键回到平铺（19 个 tab 原样保留）。 */
.view-switch{display:flex;align-items:center;gap:8px}
.view-switch .hint{font-size:12px;color:var(--dim)}
.view-switch .seg button{padding:5px 11px;font-size:12.5px}
.start{margin-bottom:20px}
.recent{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:0 0 12px}
/* .recent 自带 display:flex，会盖掉 [hidden] 的 UA 样式：没有记录时必须显式收起，否则只剩一个空标签 */
.recent[hidden]{display:none}
.recent-lbl{font-size:12px;font-weight:600;letter-spacing:.1em;color:var(--gold)}
.recent-list{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.rc{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:999px;border:1px solid var(--line);
  background:color-mix(in srgb,var(--panel) 72%,transparent);color:var(--ink);font:inherit;font-size:13.5px;cursor:pointer;
  transition:border-color .14s ease,background .14s ease}
.rc:hover{border-color:var(--gold);background:var(--panel)}
.rc i{font-style:normal;font-size:11.5px;color:var(--dim)}
.groups{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.tgroup{padding:14px 14px 12px;border:1px solid var(--line);border-radius:14px;
  background:linear-gradient(180deg,var(--panel),color-mix(in srgb,var(--panel) 88%,var(--bg)));box-shadow:var(--shadow)}
.tgroup-head h2{display:flex;align-items:center;gap:8px;margin:0;font-size:15.5px;font-weight:600;color:var(--ink);letter-spacing:.06em}
.tgroup-head h2::before{content:"";flex:none;width:7px;height:7px;border-radius:2px;background:var(--gold)}
.tgroup-head p{margin:4px 0 11px;font-size:12.5px;line-height:1.6;color:var(--dim)}
.ttools{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}
.tool{display:flex;flex-direction:column;gap:1px;padding:8px 10px;text-align:left;border:1px solid var(--line);border-radius:9px;
  background:color-mix(in srgb,var(--panel2) 72%,transparent);color:var(--ink);font-family:inherit;cursor:pointer;
  transition:border-color .14s ease,background .14s ease,box-shadow .14s ease}
.tool b{font-size:13.5px;font-weight:600;letter-spacing:.02em}
.tool span{font-size:11.5px;line-height:1.4;color:var(--dim)}
.tool:hover{border-color:var(--gold);background:var(--panel)}
.tool.on{border-color:transparent;background:linear-gradient(145deg,var(--accent-bg),var(--accent-bg2));box-shadow:0 8px 18px -12px var(--gold)}
.tool.on b{color:var(--on-accent)}
.tool.on span{color:var(--on-accent-soft)}
/* 奇数个的那一组：末项铺满整行，避免右下留一个孤格 */
.tool.wide{grid-column:1/-1}
/* 手机端每组先露 4 个，其余折在「还有 N 个」后面：三组全展开会把表单挤到第二屏 */
.tmore{display:none;grid-column:1/-1;align-items:center;justify-content:center;gap:6px;padding:8px;border:1px dashed var(--line);border-radius:9px;
  background:transparent;color:var(--dim);font-family:inherit;font-size:12.5px;cursor:pointer}
.tmore:hover{color:var(--gold);border-color:var(--gold)}
body.view-group .tabs{display:none}
body.view-flat .start{display:none}
.bar{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px 14px;align-items:start;padding:18px 20px;margin-bottom:20px;
  background:linear-gradient(180deg,var(--panel),color-mix(in srgb,var(--panel) 90%,var(--bg)));border:1px solid var(--line);border-radius:16px;box-shadow:var(--shadow)}
.grp{display:contents}
.field{display:flex;flex-direction:column;gap:6px;font-size:12.5px;letter-spacing:.03em;color:var(--dim)}
/* 固定宽度而非 min-width：输入控件的默认固有宽度（20 字符）会把 1180px 下的单行输入区挤到换行 */
.field input,.field select{background:var(--panel2);border:1px solid var(--line);color:var(--ink);border-radius:8px;padding:8px 12px;font-size:15px;font-family:inherit;outline:none;width:150px;
  transition:border-color .16s ease,box-shadow .16s ease,background .16s ease}
.field input:hover,.field select:hover,.field textarea:hover{border-color:color-mix(in srgb,var(--line) 55%,var(--gold))}
#addr{width:178px}
#mh-num input{width:124px}
#changing{width:132px}
.field input:focus,.field select:focus,.field textarea:focus{border-color:var(--gold);box-shadow:var(--ring);background:var(--panel)}
.field.check{flex-direction:row;align-items:center;gap:8px;padding-bottom:8px}
/* 所问之事：多行文本，样式与输入框一致；整组可伸缩，空间不足时自动换行独占一行 */
.field textarea{background:var(--panel2);border:1px solid var(--line);color:var(--ink);border-radius:8px;padding:8px 12px;font-size:15px;font-family:inherit;line-height:1.5;outline:none;width:100%;min-width:0;resize:vertical}
#for-ask{flex:1 1 240px;min-width:0}
#ask-wrap{flex:1 1 auto;min-width:0}
/* 人格问卷：与日期/时刻无关，整行独占；4 题一页，1–5 单选。
   题目由 web-ui 从引擎取，页面只放容器与进度/翻页骨架 */
#for-mbti{grid-column:1/-1}
#for-mbti>.field{width:100%}
.mb-top{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.mb-prog{flex:1 1 180px;min-width:120px;height:6px;border:1px solid var(--line);border-radius:999px;background:var(--panel2);overflow:hidden}
.mb-prog i{display:block;height:100%;width:0;border-radius:999px;background:linear-gradient(90deg,var(--gold),var(--gold-deep));transition:width .18s ease}
.mb-count{font-size:12.5px;color:var(--dim);font-variant-numeric:tabular-nums;white-space:nowrap}
.mb-qs{display:flex;flex-direction:column;gap:10px;margin-top:12px}
.mb-q{padding:12px 14px;border:1px solid var(--line);border-radius:12px;background:color-mix(in srgb,var(--panel) 72%,transparent)}
.mb-qt{display:flex;gap:10px;align-items:baseline;font-size:14.5px;line-height:1.6;color:var(--ink)}
.mb-qt b{flex:none;padding-top:2px;font:600 12px/1 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;letter-spacing:.04em;color:var(--gold)}
.mb-opts{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px;margin-top:10px}
.mb-o{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:7px 4px;border:1px solid var(--line);border-radius:9px;background:var(--panel2);color:var(--dim);cursor:pointer;text-align:center;
  transition:border-color .14s ease,background .14s ease,color .14s ease,box-shadow .14s ease}
.mb-o input{position:absolute;inset:0;margin:0;opacity:0;cursor:pointer}
.mb-o b{font-size:14px;font-weight:600;color:var(--ink2);font-variant-numeric:tabular-nums}
.mb-o span{font-size:11.5px;line-height:1.3}
.mb-o:hover{border-color:color-mix(in srgb,var(--line) 40%,var(--gold))}
.mb-o.on{border-color:transparent;background:linear-gradient(145deg,var(--accent-bg),var(--accent-bg2));box-shadow:0 8px 16px -12px var(--gold)}
.mb-o.on b,.mb-o.on span{color:var(--on-accent)}
.mb-o:focus-within{outline:2px solid var(--gold);outline-offset:2px}
.mb-nav{display:flex;align-items:center;gap:8px;margin-top:12px;flex-wrap:wrap}
.mb-btn{padding:8px 16px;border-radius:9px;border:1px solid var(--line);background:var(--panel2);color:var(--ink);font-family:inherit;font-size:13.5px;cursor:pointer;
  transition:border-color .14s ease,background .14s ease,color .14s ease}
.mb-btn:hover:not(:disabled){border-color:var(--gold)}
.mb-btn:disabled{opacity:.42;cursor:not-allowed}
.mb-btn.primary{border-color:transparent;background:linear-gradient(145deg,var(--accent-bg),var(--accent-bg2));color:var(--on-accent);font-weight:600;box-shadow:0 10px 20px -14px var(--gold)}
.mb-btn.primary:hover:not(:disabled){filter:brightness(1.05)}
.mb-hint{margin-left:auto;font-size:12.5px;color:var(--dim);line-height:1.6}
.mb-hint.warn{color:var(--bad);font-weight:600}
#direction{flex:none;width:104px}
/* 必填未填：边框转红，提示复用 .err 的口径 */
.field.invalid textarea{border-color:var(--bad);background:rgba(224,102,95,.06)}
.field.check input{min-width:0;width:18px;height:18px;accent-color:var(--gold);padding:0}
.go{margin-left:0;grid-column:4;justify-self:end;align-self:end;padding:11px 24px;border-radius:9px;border:none;color:var(--on-accent);font-weight:600;cursor:pointer;font-family:inherit;font-size:15px;
  background:linear-gradient(145deg,var(--accent-bg),var(--accent-bg2));box-shadow:0 10px 22px -14px var(--gold),inset 0 1px 0 rgba(255,255,255,.18);
  transition:transform .14s ease,filter .14s ease,box-shadow .14s ease}
.go:hover{filter:brightness(1.06);transform:translateY(-1px);box-shadow:0 14px 26px -14px var(--gold),inset 0 1px 0 rgba(255,255,255,.22)}
.go:active{transform:translateY(0);filter:brightness(.98)}
.go.ghost{grid-column:3;background:transparent;border:1px solid var(--line);color:var(--dim);font-weight:500;margin-right:8px;box-shadow:none;transform:none}
.go.ghost:hover{background:var(--panel2);color:var(--ink)}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.chip{font-size:12.5px;padding:4px 11px;border-radius:999px;background:var(--panel2);border:1px solid var(--line);color:var(--dim)}
.chip.ok{color:var(--good);border-color:color-mix(in srgb,var(--good) 35%,transparent);background:color-mix(in srgb,var(--good) 8%,transparent)}
.chip.warn{color:var(--warn);border-color:color-mix(in srgb,var(--warn) 35%,transparent);background:color-mix(in srgb,var(--warn) 8%,transparent)}
.chip.dim{opacity:.6}
.note{margin-top:10px;font-size:13px;color:var(--dim)}
.err{margin-top:18px;padding:12px 16px;border-radius:10px;background:rgba(224,102,95,.12);color:var(--bad);font-size:14px}
/* 注：盘面样式（紫微宫格 .pp-grid / 八字 .pp-bz / 六爻 .mp-hy-row / 梅花 .mp-hexbox / 六壬 .mp-dl-pan2 / 塔罗 .mp-tt-grid）
   全部由 src/panel-kit.js 的 PP.CSS 提供，本文件只保留页面框架样式，不再重复定义旧版盘面类 */
h3{display:flex;align-items:center;gap:10px;margin:22px 0 10px;font-size:15px;font-weight:600;color:var(--gold);letter-spacing:.06em}
h3::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,var(--line),transparent)}
.seg{display:inline-flex;border:1px solid var(--line);border-radius:9px;overflow:hidden;background:var(--panel2)}
.seg button{padding:7px 14px;background:transparent;border:none;color:var(--dim);font-size:13.5px;font-family:inherit;cursor:pointer;transition:background .14s ease,color .14s ease}
.seg button:hover{color:var(--ink)}
.seg button.on{background:linear-gradient(145deg,var(--accent-bg),var(--accent-bg2));color:var(--on-accent);font-weight:600}
/* 结果入场：只做一次轻微上浮，不做循环动画 */
#out{animation:mp-rise .3s cubic-bezier(.2,.7,.3,1) both}
@keyframes mp-rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
/* 奇门换局规则：fieldset + 原生 radio（语义优先，外观沿用页面浅色块） */
.qmrule{grid-column:1 / -1;border:0;margin:0;padding:0;display:flex;flex-wrap:wrap;align-items:center;gap:10px 14px}
.qmrule legend{padding:0;font-size:13.5px;color:var(--dim)}
.qmopts{display:flex;flex-wrap:wrap;gap:8px}
.qmopt{display:inline-flex;align-items:center;gap:7px;padding:7px 12px;border:1px solid var(--line);border-radius:8px;font-size:13.5px;color:var(--ink);cursor:pointer}
.qmopt input{accent-color:var(--gold);margin:0}
.qmhelp{flex:1 1 100%;font-size:12.5px;color:var(--dim)}
.qmhelp summary{cursor:pointer}
.qmhelp p{margin:6px 0 0;line-height:1.7}
.tip{margin:-6px 0 16px;font-size:13.5px;color:var(--dim);line-height:1.8}
/* 起卦类 tab 的「已自动取当前时刻」提示：与 .tip 同一行块，独立成行，不占横向空间 */
.tip .auto-note{margin-top:4px;font-size:13.5px;color:var(--good);line-height:1.7}
/* 结果头部的「起卦时刻」一行 */
.cast-at{margin:0 0 14px;font-size:13.5px;color:var(--dim);line-height:1.7}
.cast-at b{color:var(--ink);font-weight:600;letter-spacing:.02em}
/* 结果区下方：导出/打印 */
.askbox{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:16px 0 0;padding:11px 13px;border:1px dashed var(--line);border-radius:10px;background:color-mix(in srgb,var(--panel) 55%,transparent)}
.askbox input{flex:1 1 240px;min-width:0;background:var(--panel2);border:1px solid var(--line);color:var(--ink);border-radius:8px;padding:8px 12px;font-size:14px;font-family:inherit;outline:none}
.askbox input:focus{border-color:var(--gold);box-shadow:var(--ring)}
.askbox button{padding:8px 14px;border:1px solid transparent;border-radius:8px;background:var(--accent-bg);color:var(--on-accent);font:inherit;font-size:13px;cursor:pointer}
.askbox button:hover{filter:brightness(1.08)}
.askbox .hint{font-size:12px;color:var(--dim)}
.method{max-width:860px;margin:0 auto;padding:24px 18px 40px;font-size:14px;line-height:1.9;color:var(--ink2)}
.method h2{font-size:18px;color:var(--gold);margin:0 0 12px;letter-spacing:.05em}
.method h3{display:block;font-size:15px;color:var(--ink);margin:18px 0 6px;letter-spacing:0}
.method h3::after{display:none}
.method a{color:var(--gold);text-decoration-color:color-mix(in srgb,var(--gold) 45%,transparent);text-underline-offset:3px}
.method ul{margin:6px 0;padding-left:20px}
.method .note{color:var(--dim);font-size:13px}
.mp-verify,.mp-rect{margin:14px 0 0;padding:12px;border:1px solid var(--line);border-radius:8px;background:var(--panel)}
.mp-verify-h{font-size:12px;font-weight:700;letter-spacing:.08em;color:var(--dim);margin-bottom:8px}
.mp-verify-row{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:13px;padding:3px 0}
.mp-verify-btns{display:flex;gap:4px}
.mp-chip{font-size:12px;padding:2px 9px;border-radius:999px;border:1px solid var(--line);background:transparent;color:var(--dim);cursor:pointer;font-family:inherit}
.mp-chip.on{background:var(--accent-bg);color:var(--on-accent);border-color:transparent}
.mp-verify-foot{display:flex;align-items:flex-start;gap:8px;margin-top:8px;flex-wrap:wrap}
.mp-verify-fit{font-size:12.5px;color:var(--dim);line-height:1.7;flex:1;min-width:0}
.mp-rect-row{display:flex;gap:6px;margin-bottom:6px}
.mp-rect-row .mp-input{flex:1;min-width:0}
.mp-rect-cand{font-size:12.5px;padding:5px 8px;border-radius:6px;background:var(--panel2);margin-top:4px;color:var(--dim)}
.mp-rect-cand.best{border-left:3px solid var(--gold);color:var(--ink)}
.mp-rect-err{color:var(--bad);font-size:12.5px}
/* 验前事 / 生时校正的按钮与输入框只有 .mp-btn/.mp-input 类名，样式却写在 DSH 宿主的 app.js 里，
   离线页借不到 → 退回原生控件（年份框 21px、按钮灰底且 31px 高）。页面层补一套同变量的小号控件，
   深浅两色都只跟着变量走，不另写颜色。 */
.mp-verify .mp-btn,.mp-rect .mp-btn{min-height:36px;padding:7px 14px;border-radius:8px;border:1px solid var(--line);background:var(--panel2);color:var(--ink);font-family:inherit;font-size:13px;cursor:pointer}
.mp-verify .mp-btn:hover,.mp-rect .mp-btn:hover{border-color:var(--gold);background:var(--panel)}
.mp-verify .mp-input,.mp-rect .mp-input{min-height:36px;padding:7px 10px;border-radius:8px;border:1px solid var(--line);background:var(--panel2);color:var(--ink);font-family:inherit;font-size:14px;outline:none}
.mp-verify .mp-input:focus,.mp-rect .mp-input:focus{border-color:var(--gold);box-shadow:var(--ring)}
.exp{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin:14px 0 0}
.exp button{padding:9px 16px;border-radius:9px;border:1px solid var(--line);background:var(--panel);color:var(--ink);font-family:inherit;font-size:14px;cursor:pointer;
  transition:background .14s ease,border-color .14s ease,transform .14s ease}
.exp button:hover{background:var(--panel2);border-color:var(--gold);transform:translateY(-1px)}
.exp .hint{font-size:13px;color:var(--dim)}

/* 中屏：三列会把每格压到 130px 上下，标题与一行白话都放不下，改成一列铺开 */
@media (min-width:641px) and (max-width:1000px){
  .groups{grid-template-columns:1fr}
  .ttools{grid-template-columns:repeat(auto-fit,minmax(158px,1fr))}
}

/* —— 竖屏（≤640px）：整页不横向滚动，输入区整行堆叠，盘面交给 panel-kit 的同名媒体查询 —— */
@media (max-width:640px){
  body{font-size:15.5px}
  .wrap{padding:14px 12px 48px}
  header{flex-direction:column;align-items:stretch;gap:10px;margin-bottom:12px}
  header>*{min-width:0}
  header{gap:10px;padding-bottom:12px}
  .brand{font-size:19px;letter-spacing:.1em}
  .brand .seal{width:34px;height:34px;border-radius:9px;font-size:17px}
  .brand-txt small{font-size:11.5px;line-height:1.5}
  /* 分组卡片：每组先露 4 个，其余折起来；否则三组铺完，表单要滚过一整屏才见到 */
  .view-switch{gap:6px}
  .view-switch .hint{display:none}
  .view-switch .seg button{min-height:36px;padding:6px 10px}
  .groups{grid-template-columns:1fr}
  .tgroup{padding:12px}
  .ttools{grid-template-columns:repeat(2,minmax(0,1fr))}
  .tool{padding:9px 10px;min-height:52px}
  .tool b{font-size:14px}
  .tool span{font-size:11px}
  .tgroup:not(.open) .ttools>.tool:nth-child(n+5){display:none}
  .tmore{display:flex}
  .rc{min-height:36px}
  /* 19 个 tab 铺网格要占掉大半个首屏，改成单行横滑：44px 触摸目标、滚动条藏起来、
     左右各留 12px 呼吸位（padding 与 .wrap 等宽，首尾 tab 不会被切口）*/
  .tabs{display:flex;flex-wrap:nowrap;gap:8px;overflow-x:auto;overscroll-behavior-x:contain;
    margin:0 -12px;padding:2px 12px 6px;scrollbar-width:none;-webkit-overflow-scrolling:touch}
  .tabs::-webkit-scrollbar{display:none}
  .tab{flex:0 0 auto;min-height:44px;padding:11px 16px;font-size:14px}
  .bar{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;padding:14px}
  .field{width:100%;min-width:0}
  .field input,.field select,.field textarea,#addr,#changing,#direction{width:100%;min-width:0;padding:11px 12px;font-size:16px;min-height:44px}
  /* 农历：子表单独占整行，方向分段按钮不再把「农历 → 公历」折成两行；
     闰月改用 .field.check 的小号勾选框，不再被 .field input 的 width:100% 拉成大方块 */
  #qk-convert{grid-column:1/-1}
  #qk-convert .seg button{white-space:nowrap}
  #for-ask{flex-direction:column;align-items:stretch}
  /* .field input 的 44px 高度是给文本框的；勾选框继承后会变成 18×44 的长条，
     触摸区改由外层 label 撑（点文字也能勾），方块本身保持 18px */
  .field.check{min-height:44px;padding-bottom:0;gap:10px}
  .field.check input{min-height:0;height:18px}
  #mh-num{flex-wrap:wrap}
  #mh-num input{flex:1 1 30%;width:auto}
  .seg{display:flex;width:100%}
  .seg button{flex:1;padding:12px 8px;min-height:44px}
  /* 人格问卷：5 个评分格在窄屏会挤成一行细条，缩字号与内边距，按钮整行方便点 */
  .mb-q{padding:11px 12px}
  .mb-qt{font-size:14px}
  .mb-o{padding:8px 3px;min-height:52px}
  .mb-o span{font-size:10.5px}
  .mb-btn{flex:1 1 auto;min-height:44px;padding:10px 12px}
  .mb-hint{flex-basis:100%;margin-left:0}
  /* 两列下把「看示例 / 排盘」并排放：原来写死 grid-column:4 会凭空多出两列 auto 轨道，
     把前两列挤成 134px，性别、按钮全被压扁 */
  .go,.go.ghost{grid-column:auto;justify-self:stretch;margin-left:0;margin-right:0;width:100%;padding:13px;font-size:16px;min-height:48px;border-radius:8px}
  .go.ghost{grid-column:1}
  .go{grid-column:2}
  /* 性别只有一格，留在半幅会空出右边半格；出生地同理，独占一行好填 */
  #for-gender,#for-bazi .field:not(.check){grid-column:1/-1}
  /* 验前事 / 生时校正：标签独占一行，三档判断按钮等分成 44px 触摸格；
     年份与类型输入同样抬到 44px（原先在离线页是 21px 的原生控件） */
  .mp-verify,.mp-rect{padding:10px}
  .mp-verify-row{flex-wrap:wrap;gap:6px;padding:5px 0}
  .mp-verify-txt{flex:1 1 100%}
  .mp-verify-btns{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;width:100%}
  .mp-chip{min-height:44px;min-width:44px;font-size:14px;padding:10px 6px}
  .mp-verify .mp-btn,.mp-rect .mp-btn{min-height:44px;font-size:14px;padding:10px 14px}
  .mp-verify .mp-input,.mp-rect .mp-input{min-height:44px;font-size:16px}
  /* 追问框与导出条同样抬到 44px：原先输入 37px、按钮 39px，是结果区最后几处矮控件 */
  .askbox input,.askbox button,.exp button{min-height:44px}
  .askbox input{font-size:16px}
  .tip{font-size:13px}
  .tip .auto-note{font-size:13px}
  .cast-at{font-size:13px}
}

/* 动效偏好：系统要求减少动态时，全部关掉（含结果入场） */
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important;scroll-behavior:auto!important}
}

/* —— 打印 / 存为 PDF ——
   只留抬头与结果，输入区、tab、按钮全部不打印；
   盘面每一块都别被撕成两页 */
@media print{
  @page{size:A4 portrait;margin:12mm}
  body{background:#fff;padding:0;font-size:12pt}
  .wrap{max-width:none;padding:0}
  .tabs,.bar,.tip,.go,.no-print,.exp{display:none!important}
  .start,.view-switch{display:none!important}
  header{margin:0 0 10px;padding-bottom:6px;border-bottom:1px solid #bbb}
  .brand{font-size:15pt}
  .brand small{display:block}
  #out{margin:0}
  .pp,#out .mp-it{break-inside:avoid;page-break-inside:avoid}
  .pp{box-shadow:none;border-color:#999}
  .pp-detail{break-inside:avoid}
  .pp-cell{cursor:auto}
  /* 详解块折叠着打印 → 纸面上只剩一个标题栏。打印时强制展开，并藏掉「点击收起」提示 */
  .mp-it.folded .mp-it-wrap{display:block!important}
  .mp-it.folded .mp-it-arrow{transform:none}
  .mp-it-hint{display:none}
  /* 彩色底块（四化块、身宫描边、三方四正底、选中宫底）都要印出来，
     只给 .pp-m 会让其余浅色底在纸上整片消失，色弱读者失去唯一线索 */
  .pp,.mp-it,.pp *,.mp-it *{-webkit-print-color-adjust:exact;print-color-adjust:exact}
  a[href]::after{content:""}
}
`;

function page() {
  const modules = MODULE_ORDER.map(buildModule).join('\n');
  const ui = fs.readFileSync(path.join(root, 'src', 'web-ui.js'), 'utf8');
  const core = fs.readFileSync(path.join(root, 'src', 'core.js'), 'utf8');
  const kit = fs.readFileSync(path.join(root, 'src', 'panel-kit.js'), 'utf8');
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>命理排盘 · 八字 紫微 六爻 奇门 大六壬 | 本地计算，每步有据可查</title>
<meta name="description" content="八套命理体系装进一个页面：八字、紫微斗数、六爻纳甲、梅花易数、大六壬、奇门遁甲、合盘、塔罗。全部本地计算、不联网；结果可复现，口径差异逐字可查。">
<meta name="theme-color" content="#f4f1ea" media="(prefers-color-scheme:light)">
<meta name="theme-color" content="#12110d" media="(prefers-color-scheme:dark)">
<meta property="og:type" content="website">
<meta property="og:locale" content="zh_CN">
<meta property="og:title" content="命理排盘 · 八套体系，一个页面">
<meta property="og:description" content="八字 / 紫微 / 六爻 / 梅花 / 六壬 / 奇门 / 合盘 / 塔罗。本地计算，不采集数据；口径怎么取、差异在哪里，都能逐字对照。">
<meta name="twitter:card" content="summary_large_image">
<style>${CSS}</style>
</head>
<body>
<div class="wrap">
  <header>
    <div class="brand-row">
      <div class="brand"><span class="seal" aria-hidden="true">命</span><span class="brand-txt">命理排盘<span class="ver">v${VERSION}</span><small>八字 · 紫微 · 六爻 · 梅花 · 六壬 · 奇门 · 合盘 · 塔罗　全部在本机计算</small></span></div>
      <div class="view-switch">
        <span class="hint">熟练了可以换回平铺</span>
        <span class="seg" role="group" aria-label="首屏样式">
          <button type="button" data-view="group" class="on">分组</button>
          <button type="button" data-view="flat">平铺</button>
        </span>
      </div>
    </div>
    <div class="tabs">
      <button class="tab" data-tab="ziwei">紫微</button>
      <button class="tab" data-tab="bazi">八字</button>
      <button class="tab" data-tab="liuyao">六爻</button>
      <button class="tab" data-tab="meihua">梅花</button>
      <button class="tab" data-tab="daliuren">六壬</button>
      <button class="tab" data-tab="qimen">奇门</button>
      <button class="tab" data-tab="hepan">合盘</button>
      <button class="tab" data-tab="tarot">塔罗</button>
      <button class="tab" data-tab="almanac">黄历</button>
      <button class="tab" data-tab="convert">农历</button>
      <button class="tab" data-tab="zeri">择日</button>
      <button class="tab" data-tab="chenggu">称骨</button>
      <button class="tab" data-tab="xiaoliuren">小六壬</button>
      <button class="tab" data-tab="star">星座</button>
      <button class="tab" data-tab="numerology">数字</button>
      <button class="tab" data-tab="trend">人生K</button>
      <button class="tab" data-tab="fengshui">风水</button>
      <button class="tab" data-tab="name">起名</button>
      <button class="tab" data-tab="mbti">人格</button>
    </div>
  </header>

  <!-- 首屏分组：同一批入口按「想干什么」重排，点击走 web-ui 的 setTab；平铺视图下整块收起 -->
  <section class="start" id="start" aria-label="选择要算的事">
    <div class="recent" id="recent" hidden>
      <span class="recent-lbl">最近用过</span>
      <span class="recent-list" id="recent-list"></span>
    </div>
    <div class="groups" id="groups">
      <section class="tgroup">
        <div class="tgroup-head"><h2>问一件事</h2><p>心里有一件具体的事，起一卦再决定</p></div>
        <div class="ttools">
          <button type="button" class="tool" data-tab="liuyao"><b>六爻</b><span>摇六次，问一件事</span></button>
          <button type="button" class="tool" data-tab="meihua"><b>梅花</b><span>见闻起卦，看当下</span></button>
          <button type="button" class="tool" data-tab="tarot"><b>塔罗</b><span>抽牌，看关系与选择</span></button>
          <button type="button" class="tool" data-tab="qimen"><b>奇门</b><span>看方位、时机与取舍</span></button>
          <button type="button" class="tool" data-tab="daliuren"><b>六壬</b><span>占事，断来意与结果</span></button>
          <button type="button" class="tool" data-tab="xiaoliuren"><b>小六壬</b><span>掐指一算，快速断</span></button>
          <button type="button" class="tmore" aria-expanded="false"></button>
        </div>
      </section>
      <section class="tgroup">
        <div class="tgroup-head"><h2>看一个人</h2><p>看自己或身边人的性情、格局与运程</p></div>
        <div class="ttools">
          <button type="button" class="tool" data-tab="bazi"><b>八字</b><span>四柱看一生格局</span></button>
          <button type="button" class="tool" data-tab="ziwei"><b>紫微</b><span>十二宫细看</span></button>
          <button type="button" class="tool" data-tab="hepan"><b>合盘</b><span>两个人合不合</span></button>
          <button type="button" class="tool" data-tab="mbti"><b>人格</b><span>16 型性格问卷</span></button>
          <button type="button" class="tool" data-tab="chenggu"><b>称骨</b><span>按生辰称命重</span></button>
          <button type="button" class="tool" data-tab="numerology"><b>数字</b><span>生日数字看性格</span></button>
          <button type="button" class="tool wide" data-tab="trend"><b>人生K</b><span>一生高低走势</span></button>
          <button type="button" class="tmore" aria-expanded="false"></button>
        </div>
      </section>
      <section class="tgroup">
        <div class="tgroup-head"><h2>查日子</h2><p>挑时间、换农历，顺带看看家里和名字</p></div>
        <div class="ttools">
          <button type="button" class="tool" data-tab="almanac"><b>黄历</b><span>今天宜忌、时辰吉凶</span></button>
          <button type="button" class="tool" data-tab="zeri"><b>择日</b><span>挑个办事的好日子</span></button>
          <button type="button" class="tool" data-tab="convert"><b>农历</b><span>公历农历互转</span></button>
          <button type="button" class="tool" data-tab="star"><b>星座</b><span>星座性格与今日运</span></button>
          <button type="button" class="tool" data-tab="fengshui"><b>风水</b><span>房屋朝向与布置</span></button>
          <button type="button" class="tool" data-tab="name"><b>起名</b><span>按八字选字</span></button>
          <button type="button" class="tmore" aria-expanded="false"></button>
        </div>
      </section>
    </div>
  </section>

  <div class="bar">
    <!-- 初始值是「命盘类（紫微/八字）」的示例默认：出生时间必然是过去，不取当前时刻。
         切到六爻/梅花/六壬等起卦类 tab 时，web-ui.js 会自动把这两个框换成你的本机当前时刻。 -->
    <label class="field" id="for-date"><span id="lbl-date">出生日期（公历）</span><input id="date" type="date" value="1990-05-12"></label>
    <label class="field" id="for-time"><span id="lbl-time">出生时刻</span><input id="time" type="time" value="14:30"></label>
    <label class="field" id="for-gender">性别
      <select id="gender"><option value="female">女</option><option value="male">男</option></select>
    </label>
    <div class="grp" id="for-bazi" style="display:none">
      <label class="field">出生地<input id="addr" placeholder="如 河北石家庄 / 成都"></label>
      <label class="field check"><input id="ts" type="checkbox" checked> 真太阳时</label>
      <label class="field check" title="开启后会请求 OpenStreetMap"><input id="online" type="checkbox"> 联网精确到区县</label>
      <label class="field check" title="23:00–23:59 出生时：勾选=按次日日柱起时柱（晚子时换日）；不勾=仍用当日日柱"><input id="latezi" type="checkbox" checked> 晚子时换日</label>
      <label class="field check" title="同一份出生信息再排另一套盘，并列对照"><input id="cross" type="checkbox"> 八字 × 紫微 交叉验证</label>
    </div>
    <label class="field" id="for-liuyao" style="display:none">六爻<input id="lines" placeholder="9 7 8 8 7 6，空则随机"></label>
    <!-- 合盘：第二个人的出生信息；合盘方式决定用八字还是紫微两盘对照 -->
    <div class="grp" id="for-hepan" style="display:none">
      <label class="field">对方出生日期<input id="pdate" type="date" value="1992-08-15"></label>
      <label class="field">对方出生时刻<input id="ptime" type="time" value="10:00"></label>
      <label class="field">对方性别
        <select id="pgender"><option value="female">女</option><option value="male">男</option></select>
      </label>
      <label class="field">对方出生地（可空）<input id="paddr" placeholder="如 四川成都"></label>
      <div class="field">合盘方式
        <div class="seg" id="hpchart">
          <button data-chart="bazi" class="on">八字</button>
          <button data-chart="ziwei">紫微</button>
        </div>
      </div>
    </div>
    <!-- 奇门：换局规则（fieldset + 原生 radio）与取用方向；换规则会重起局 -->
    <div class="grp" id="for-qimen" style="display:none">
      <fieldset class="qmrule">
        <legend>换局规则</legend>
        <div class="qmopts" role="radiogroup" aria-label="奇门换局规则">
          <label class="qmopt"><input type="radio" name="qimen_rule" value="chaibu" checked><span>拆补</span></label>
          <label class="qmopt"><input type="radio" name="qimen_rule" value="chaoshen"><span>超神接气</span></label>
          <label class="qmopt"><input type="radio" name="qimen_rule" value="zhirun"><span>置闰</span></label>
        </div>
        <details class="qmhelp">
          <summary>三种规则有什么区别？</summary>
          <p>决定符头与节气如何对齐、是否插入闰局；同一个时刻在不同规则下可能得到不同局数。默认「拆补」与工具层一致。</p>
        </details>
      </fieldset>
      <label class="field">晚子时<select id="qlatezi"><option value="same-day">23:00 后归当日</option><option value="next-day">23:00 后归次日</option></select></label>
      <label class="field">询问方向（定用神）<select id="qdir">${DIR_OPTIONS}</select></label>
    </div>
    <div class="grp" id="for-meihua" style="display:none">
      <div class="field">起卦方式
        <div class="seg">
          <button data-mode="time" class="on">时间起卦</button>
          <button data-mode="number">数字起卦</button>
        </div>
      </div>
      <label class="field" id="mh-num" style="display:none;flex-direction:row;gap:8px">
        <input id="upper" placeholder="第一个数" style="min-width:96px">
        <input id="lower" placeholder="第二个数" style="min-width:96px">
        <input id="changing" placeholder="动爻 1-6（可空）" style="min-width:120px">
      </label>
    </div>
    <!-- 所问之事 + 询问方向：六爻 / 梅花 / 六壬 / 塔罗这些问事的体系共用。
         问题必填，会与卦象一起交给下方解读，解读按这个方向展开。-->
    <div class="grp" id="for-ask" style="display:none">
      <label class="field" id="ask-wrap">所问之事（必填）
        <textarea id="question" rows="2" placeholder="用一句话描述所问之事，例如：今年是否适合换工作？"></textarea>
      </label>
      <label class="field">询问方向
        <select id="direction">${DIR_OPTIONS}</select>
      </label>
      <!-- 塔罗牌阵张数：仅塔罗 tab 显示（1/3/5 由引擎 TAROT SPREADS 支持） -->
      <label class="field" id="for-count" style="display:none">牌阵
        <select id="tcount">
          <option value="1">1 张（当下指引）</option>
          <option value="3" selected>3 张（过去·现在·未来）</option>
          <option value="5">5 张（现状·阻碍·建议·结果·潜在）</option>
        </select>
      </label>
    </div>
    <!-- 速查类：黄历/择日/称骨/小六壬/星座/生命数字/人生K线/风水/起名。
         每个体系自己的最小输入；日期/时刻仍用上面的两个框。 -->
    <div class="grp" id="for-quick" style="display:none">
      <div id="qk-zeri" style="display:none">
        <label class="field">所办事项
          <select id="ztask">
            <optgroup label="常用"><option>开业</option><option>嫁娶</option><option>搬家入宅</option><option>出行</option><option>签订合同</option><option>祭祀</option></optgroup>
            <optgroup label="婚嫁"><option>领证</option><option>订婚</option><option>提亲</option><option>收送聘金</option><option>满月酒</option></optgroup>
            <optgroup label="生活"><option>搬家</option><option>入宅</option><option>旅行</option><option>访亲友</option><option>入学</option><option>求医</option></optgroup>
            <optgroup label="建造"><option>动土</option><option>装修</option><option>装修建造</option><option>安葬</option><option>试车买车</option></optgroup>
            <optgroup label="工商"><option>交易</option><option>投资</option><option>签约</option><option>纳财</option><option>赴任</option></optgroup>
          </select>
        </label>
        <label class="field">看多少天<input id="zdays" type="number" min="1" max="60" value="30"></label>
        <label class="field">当事人属相（可空）
          <select id="zsheng">
            <option value="">不排除</option>
            <option>鼠</option><option>牛</option><option>虎</option><option>兔</option><option>龙</option><option>蛇</option>
            <option>马</option><option>羊</option><option>猴</option><option>鸡</option><option>狗</option><option>猪</option>
          </select>
        </label>
      </div>
      <div id="qk-convert" style="display:none">
        <div class="field">转换方向
          <div class="seg" id="convertmode">
            <button data-mode="solar2lunar" class="on">公历 → 农历</button>
            <button data-mode="lunar2solar">农历 → 公历</button>
          </div>
        </div>
        <div id="qk-convert-lunar" style="display:none">
          <label class="field">农历日期<input id="lunardate" placeholder="如 2026-9-17"></label>
          <label class="field check">闰月<input id="leapm" type="checkbox"></label>
        </div>
      </div>
      <div id="qk-xiaoliuren" style="display:none">
        <div class="field">起课方式
          <div class="seg" id="xlrmode">
            <button data-mode="time" class="on">时间起课</button>
            <button data-mode="number">报数起课</button>
          </div>
        </div>
        <label class="field" id="xlr-num" style="display:none;flex-direction:row;gap:8px">
          <input id="num1" type="number" min="1" max="99" placeholder="第一个数" style="min-width:96px">
          <input id="num2" type="number" min="1" max="99" placeholder="第二个数" style="min-width:96px">
          <input id="num3" type="number" min="1" max="99" placeholder="第三个数" style="min-width:96px">
        </label>
      </div>
      <div id="qk-trend" style="display:none">
        <label class="field">算到几岁<input id="toage" type="number" min="10" max="100" value="60"></label>
      </div>
      <div id="qk-fengshui" style="display:none">
        <div class="field">看什么
          <div class="seg" id="fsmode">
            <button data-mode="natal" class="on">命卦</button>
            <button data-mode="advise">门主灶</button>
            <button data-mode="xuankong">玄空</button>
          </div>
        </div>
        <label class="field" id="fs-advise" style="display:none">坐山<input id="sitting" placeholder="如 子 / 乾" value="子"></label>
        <label class="field" id="fs-advise2" style="display:none">朝向<input id="facing" placeholder="如 午 / 巽" value="午"></label>
        <label class="field" id="fs-period" style="display:none">运（1–9）<input id="fsperiod" type="number" min="1" max="9" value="9"></label>
      </div>
      <!-- 人格问卷：4 题一页、1–5 打分。题目与 1–5 的说明由 web-ui 从引擎取，
           这里只放容器与翻页骨架，避免题目在页面和引擎里各抄一份 -->
      <div id="for-mbti" style="display:none">
        <div class="field">
          <span>十六型人格问卷 · 4 题一页，按 1（完全不像）到 5（很像我）打分</span>
          <div class="mb-top">
            <div class="mb-prog" aria-hidden="true"><i id="mbti-fill"></i></div>
            <span class="mb-count" id="mbti-count">第 1 / 6 页 · 已答 0 / 24</span>
          </div>
          <div class="mb-qs" id="mbti-qs"></div>
          <div class="mb-nav">
            <button type="button" class="mb-btn" id="mbti-prev" disabled>上一页</button>
            <button type="button" class="mb-btn" id="mbti-next">下一页</button>
            <button type="button" class="mb-btn primary" id="mbti-submit" disabled>看结果</button>
            <button type="button" class="mb-btn" id="mbti-clear">清空</button>
            <span class="mb-hint" id="mbti-hint">答满 12 题可先看结果</span>
          </div>
        </div>
      </div>
      <div id="qk-name" style="display:none">
        <div class="field">看什么
          <div class="seg" id="nnmode">
            <button data-mode="assess" class="on">评名字</button>
            <button data-mode="generate">生成候选</button>
          </div>
        </div>
        <label class="field">姓<input id="surname" placeholder="如 李" value="李"></label>
        <label class="field" id="nn-assess">名字<input id="givenname" placeholder="如 沐宸"></label>
        <label class="field" id="nn-generate" style="display:none">候选个数<input id="nlimit" type="number" min="1" max="20" value="6"></label>
      </div>
    </div>
    <button id="sample" class="go ghost" title="用固定示例盘看完整报告">看示例</button>
    <button id="go" class="go">排盘</button>
  </div>

  <div class="tip" id="tip"></div>

  <main id="out"></main>

  <section id="method" class="method no-print" hidden>
    <h2>方法与验证</h2>
    <p class="note">这个页面只做一件事：把「结论是怎么来的、验证到什么程度」交代清楚。</p>
    <h3>八套体系，全部本地计算</h3>
    <ul><li>八字（四柱 · 藏干 · 十神 · 神煞 · 大运流年 · 格局用神）</li><li>紫微斗数（安星 · 四化 · 大限 · 流年/流月/流日/流时）</li><li>六爻纳甲（装卦 · 六亲 · 六神 · 世应 · 变卦 · 旬空）</li><li>梅花易数 · 大六壬 · 奇门遁甲 · 合盘 · 塔罗</li></ul>
    <h3>对拍：把典籍当期望值</h3>
    <ul><li>六爻：京房八宫卦序与世应，64 卦全表；旬空六旬表</li><li>六壬：日干寄宫、中气换将；紫微：纳音定五行局、紫微天府相照</li><li>卦例：《增删卜易》9 条 +《卜筮正宗》128 条（93 成对 + 35 静卦），核本变卦 / 动爻数 / 卦宫 / 缺爻 / 旬空</li></ul>
    <h3>工程验证</h3>
    <ul><li>测试：${TEST_FILES} 个测试文件 / ${TEST_ASSERTS} 条断言；七道闸（回归 · 断言基线 · 测试可失败自检 · HTML 注入面 · 工程约定 · 产物宿主形态 · 随机扫射）</li><li>可复现：seed / asOf 显式；同一输入同一输出</li><li>口径：晚子时、真太阳时、奇门三流派、闰月归月都可切换，并有字段级差异对照</li></ul>
    <h3>已知边界（不猜）</h3>
    <ul><li>六爻应期（具体哪天应验）不做；卦例只录动爻个数，不录爻位</li><li>财富/健康只给结构判断与档位，不给金额区间、不作诊断</li><li>紫微飞星已做「单一支化逐宫追到成环」与「三方四正 16 条按落宫归堆」，但都未叠大限流年四化、不折吉凶；八字交运日已能算到日/时，但未与第三方排盘案例批量对拍</li></ul>
    <p class="note">内容用于传统文化学习与自我探索，不构成医疗、投资、法律或人事决策依据。</p>
    <button id="method-close" class="go" style="margin-top:12px">收起</button>
  </section>
  <div class="no-print" style="text-align:center;margin:18px 0 30px"><button id="method-open" style="background:none;border:none;color:var(--dim);font:inherit;font-size:13px;text-decoration:underline;cursor:pointer">方法与验证</button></div>
</div>

<script>
const __mods = {};
${modules}
window.Engine = __mods.index;
</script>
<script>
${core}
</script>
<script>
${kit}
document.head.appendChild(Object.assign(document.createElement('style'), { textContent: window.__PP.CSS }));
</script>
<script>
${ui}
</script>
</body>
</html>
`;
}

export { page };

// 只有直接运行时才写文件；被测试 import 时只取 page()，不产生副作用
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const out = page();
  // 默认写进仓库根的 命理排盘.html：这个文件随 npm 包一起发出去（见 package.json 的 files），
  // 订阅者装完包就有离线页，不必自己构建。`--out <file>` 可另存（例如同步到桌面那份拷贝）。
  const outIdx = process.argv.indexOf('--out');
  const target = outIdx > 0 && process.argv[outIdx + 1]
    ? path.resolve(process.argv[outIdx + 1])
    : path.resolve(root, '命理排盘.html');
  fs.writeFileSync(target, out, 'utf8');
  console.log(`written: ${target}  (${(out.length / 1024).toFixed(1)} KB)`);
  // 桌面那份是手工拷的产物，源码一改就旧了。`--desktop` 让它跟着构建走，
  // 页面左上角的版本徽标用来核对是不是最新构建。
  if (process.argv.includes('--desktop')) {
    const desktop = path.join(os.homedir(), 'Desktop', '命理排盘.html');
    fs.mkdirSync(path.dirname(desktop), { recursive: true });
    if (path.resolve(desktop) !== path.resolve(target)) {
      fs.writeFileSync(desktop, out, 'utf8');
      console.log(`written: ${desktop}  (${(out.length / 1024).toFixed(1)} KB)`);
    }
  }
}




