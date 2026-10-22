// 生成可双击打开的单文件 HTML（引擎 + 界面全部内联，无需服务器）
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { buildModule, MODULE_ORDER } from './build-client.mjs';
// 询问方向的选项直接取自引擎，避免界面与解析层两处维护
import { DIRECTIONS, DIRECTION_DEFAULT } from '../engine/interpret.js';

const root = path.resolve(import.meta.dirname, '..');
const DIR_OPTIONS = DIRECTIONS
  .map((d) => `<option value="${d.key}"${d.key === DIRECTION_DEFAULT ? ' selected' : ''}>${d.label}</option>`)
  .join('');

export const CSS = `
:root{--bg:#f4f1ea;--panel:#fffdf8;--panel2:#f7f3ea;--line:#cfc7b6;--ink:#1b1b1b;--dim:#6f6a60;--gold:#b3261e;--good:#1f6f3f;--bad:#b3261e;--warn:#8a5a00}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.65 "Microsoft YaHei","PingFang SC",system-ui,sans-serif;padding-bottom:env(safe-area-inset-bottom)}
.wrap{max-width:1180px;margin:0 auto;padding:22px 26px 60px}
header{display:flex;align-items:center;gap:20px;flex-wrap:wrap;margin-bottom:16px}
.brand{font-size:21px;font-weight:700;letter-spacing:.12em;color:var(--gold)}
.brand small{display:block;font-size:12.5px;letter-spacing:.02em;color:var(--dim);font-weight:400;margin-top:2px}
.tabs{display:flex;gap:8px;margin-left:auto}
.tab{padding:8px 20px;border-radius:999px;border:1px solid var(--line);background:transparent;color:var(--dim);cursor:pointer;font-size:14.5px;font-family:inherit;white-space:nowrap}
.tab:hover{background:var(--panel2)}
.tab.on{background:var(--gold);border-color:transparent;color:#fff;font-weight:600}
.bar{display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap;padding:16px 18px;background:var(--panel);border:1px solid var(--line);border-radius:12px;margin-bottom:18px}
.grp{display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap}
.field{display:flex;flex-direction:column;gap:6px;font-size:13.5px;color:var(--dim)}
/* 固定宽度而非 min-width：输入控件的默认固有宽度（20 字符）会把 1180px 下的单行输入区挤到换行 */
.field input,.field select{background:var(--panel2);border:1px solid var(--line);color:var(--ink);border-radius:8px;padding:8px 12px;font-size:15px;font-family:inherit;outline:none;width:150px}
#addr{width:178px}
#mh-num input{width:124px}
#changing{width:132px}
.field input:focus,.field select:focus,.field textarea:focus{border-color:var(--gold)}
.field.check{flex-direction:row;align-items:center;gap:8px;padding-bottom:8px}
/* 所问之事：多行文本，样式与输入框一致；整组可伸缩，空间不足时自动换行独占一行 */
.field textarea{background:var(--panel2);border:1px solid var(--line);color:var(--ink);border-radius:8px;padding:8px 12px;font-size:15px;font-family:inherit;line-height:1.5;outline:none;width:100%;min-width:0;resize:vertical}
#for-ask{flex:1 1 240px;min-width:0}
#ask-wrap{flex:1 1 auto;min-width:0}
#direction{flex:none;width:104px}
/* 必填未填：边框转红，提示复用 .err 的口径 */
.field.invalid textarea{border-color:var(--bad);background:rgba(224,102,95,.06)}
.field.check input{min-width:0;width:18px;height:18px;accent-color:var(--gold);padding:0}
.go{margin-left:auto;padding:10px 22px;border-radius:6px;border:none;background:var(--gold);color:#fff;font-weight:600;cursor:pointer;font-family:inherit;font-size:15px}
.go:hover{filter:brightness(1.08)}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.chip{font-size:13px;padding:4px 10px;border-radius:7px;background:var(--panel2);border:1px solid var(--line);color:var(--dim)}
.chip.ok{color:var(--good);border-color:rgba(95,191,139,.35)}
.chip.warn{color:var(--warn);border-color:rgba(216,161,60,.35)}
.chip.dim{opacity:.6}
.note{margin-top:10px;font-size:13px;color:var(--dim)}
.err{margin-top:18px;padding:12px 16px;border-radius:10px;background:rgba(224,102,95,.12);color:var(--bad);font-size:14px}
/* 注：盘面样式（紫微宫格 .pp-grid / 八字 .pp-bz / 六爻 .hy-row / 梅花 .hexbox / 六壬 .dl-pan2 / 塔罗 .tt-grid）
   全部由 src/panel-kit.js 的 PP.CSS 提供，本文件只保留页面框架样式，不再重复定义旧版盘面类 */
h3{margin:18px 0 8px;font-size:15px;font-weight:600;color:var(--gold)}
.seg{display:inline-flex;border:1px solid var(--line);border-radius:8px;overflow:hidden}
.seg button{padding:7px 14px;background:transparent;border:none;color:var(--dim);font-size:13.5px;font-family:inherit;cursor:pointer}
.seg button.on{background:var(--gold);color:#fff;font-weight:600}
.tip{margin:-6px 0 16px;font-size:13.5px;color:var(--dim);line-height:1.8}
/* 起卦类 tab 的「已自动取当前时刻」提示：与 .tip 同一行块，独立成行，不占横向空间 */
.tip .auto-note{margin-top:4px;font-size:13.5px;color:var(--good);line-height:1.7}
/* 结果头部的「起卦时刻」一行 */
.cast-at{margin:0 0 14px;font-size:13.5px;color:var(--dim);line-height:1.7}
.cast-at b{color:var(--ink);font-weight:600;letter-spacing:.02em}
.now{padding:10px 13px;border-radius:6px;border:1px solid var(--line);background:transparent;color:var(--dim);font-family:inherit;font-size:15px;cursor:pointer}
.now:hover{background:var(--panel2)}
/* —— 竖屏（≤640px）：整页不横向滚动，输入区整行堆叠，盘面交给 panel-kit 的同名媒体查询 —— */
@media (max-width:640px){
  body{font-size:15.5px}
  .wrap{padding:14px 12px 48px}
  header{flex-direction:column;align-items:stretch;gap:10px;margin-bottom:12px}
  header>*{min-width:0}
  .brand{font-size:19px}
  .tabs{margin-left:0;overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:4px;max-width:100%}
  .tab{flex:0 0 auto;padding:11px 17px;font-size:14px;min-height:44px}
  .bar{flex-direction:column;align-items:stretch;gap:14px;padding:14px}
  .grp{flex-direction:column;align-items:stretch;gap:14px}
  .field{width:100%}
  .field input,.field select,.field textarea,#addr,#changing,#direction{width:100%;min-width:0;padding:11px 12px;font-size:16px;min-height:44px}
  #for-ask{flex-direction:column;align-items:stretch}
  .field.check{padding-bottom:0}
  #mh-num{flex-wrap:wrap}
  #mh-num input{flex:1 1 30%;width:auto}
  .seg{display:flex;width:100%}
  .seg button{flex:1;padding:12px 8px;min-height:44px}
  .go{margin-left:0;width:100%;padding:13px;font-size:16px;min-height:48px;border-radius:8px}
  .now{width:100%;padding:12px;font-size:15px;min-height:46px;border-radius:8px}
  .tip{font-size:13px}
  .tip .auto-note{font-size:13px}
  .cast-at{font-size:13px}
}
`;

function page() {
  const modules = MODULE_ORDER.map(buildModule).join('\n');
  const ui = fs.readFileSync(path.join(root, 'src', 'web-ui.js'), 'utf8');
  const kit = fs.readFileSync(path.join(root, 'src', 'panel-kit.js'), 'utf8');
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>命理排盘</title>
<style>${CSS}</style>
</head>
<body>
<div class="wrap">
  <header>
    <div class="brand">命理排盘<small>八字 · 紫微 · 六爻 · 梅花 · 六壬 · 塔罗　全部在本机计算</small></div>
    <div class="tabs">
      <button class="tab" data-tab="ziwei">紫微</button>
      <button class="tab" data-tab="bazi">八字</button>
      <button class="tab" data-tab="liuyao">六爻</button>
      <button class="tab" data-tab="meihua">梅花</button>
      <button class="tab" data-tab="daliuren">六壬</button>
      <button class="tab" data-tab="tarot">塔罗</button>
    </div>
  </header>

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
    </div>
    <label class="field" id="for-liuyao" style="display:none">六爻<input id="lines" placeholder="9 7 8 8 7 6，空则随机"></label>
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
    </div>
    <button id="now" class="now" title="换成此刻并立即起卦">此刻</button>
    <button id="go" class="go">排盘</button>
  </div>

  <div class="tip" id="tip"></div>

  <main id="out"></main>
</div>

<script>
const __mods = {};
${modules}
window.Engine = __mods.index;
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

const out = page();
const target = path.resolve(root, '..', '命理排盘.html');
fs.writeFileSync(target, out, 'utf8');
console.log(`written: ${target}  (${(out.length / 1024).toFixed(1)} KB)`);
