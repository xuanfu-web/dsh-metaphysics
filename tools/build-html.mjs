// 生成可双击打开的单文件 HTML（引擎 + 界面全部内联，无需服务器）
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { buildModule, MODULE_ORDER } from './build-client.mjs';

const root = path.resolve(import.meta.dirname, '..');

export const CSS = `
:root{--bg:#f4f1ea;--panel:#fffdf8;--panel2:#f7f3ea;--line:#cfc7b6;--ink:#1b1b1b;--dim:#6f6a60;--gold:#b3261e;--good:#1f6f3f;--bad:#b3261e;--warn:#8a5a00}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:14px/1.6 "Microsoft YaHei","PingFang SC",system-ui,sans-serif}
.wrap{max-width:1180px;margin:0 auto;padding:22px 26px 60px}
header{display:flex;align-items:center;gap:20px;flex-wrap:wrap;margin-bottom:16px}
.brand{font-size:19px;font-weight:700;letter-spacing:.12em;color:var(--gold)}
.brand small{display:block;font-size:11px;letter-spacing:.02em;color:var(--dim);font-weight:400;margin-top:2px}
.tabs{display:flex;gap:6px;margin-left:auto}
.tab{padding:6px 18px;border-radius:999px;border:1px solid var(--line);background:transparent;color:var(--dim);cursor:pointer;font-size:13px;font-family:inherit}
.tab:hover{background:var(--panel2)}
.tab.on{background:var(--gold);border-color:transparent;color:#fff;font-weight:600}
.bar{display:flex;gap:14px;align-items:flex-end;flex-wrap:wrap;padding:14px 16px;background:var(--panel);border:1px solid var(--line);border-radius:12px;margin-bottom:18px}
.grp{display:flex;gap:14px;align-items:flex-end}
.field{display:flex;flex-direction:column;gap:5px;font-size:12px;color:var(--dim)}
.field input,.field select{background:var(--panel2);border:1px solid var(--line);color:var(--ink);border-radius:8px;padding:7px 10px;font-size:13px;font-family:inherit;outline:none;min-width:140px}
.field input:focus,.field select:focus{border-color:var(--gold)}
.field.check{flex-direction:row;align-items:center;gap:6px;padding-bottom:7px}
.field.check input{min-width:0;width:16px;height:16px;accent-color:var(--gold);padding:0}
.go{margin-left:auto;padding:8px 22px;border-radius:4px;border:none;background:var(--gold);color:#fff;font-weight:600;cursor:pointer;font-family:inherit;font-size:13px}
.go:hover{filter:brightness(1.08)}
.chips{display:flex;flex-wrap:wrap;gap:7px;margin-top:12px}
.chip{font-size:12px;padding:4px 10px;border-radius:7px;background:var(--panel2);border:1px solid var(--line);color:var(--dim)}
.chip.ok{color:var(--good);border-color:rgba(95,191,139,.35)}
.chip.warn{color:var(--warn);border-color:rgba(216,161,60,.35)}
.chip.dim{opacity:.6}
.note{margin-top:10px;font-size:12px;color:var(--dim)}
.err{margin-top:18px;padding:12px 16px;border-radius:10px;background:rgba(224,102,95,.12);color:var(--bad)}
h3{margin:18px 0 8px;font-size:13px;font-weight:600;color:var(--gold)}
.zv{display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,minmax(124px,auto));gap:7px}
.zc{border:1px solid var(--line);border-radius:11px;background:var(--panel);padding:8px 9px;display:flex;flex-direction:column;gap:5px}
.zc.soul{border-color:var(--gold);box-shadow:inset 0 0 0 1px rgba(201,162,90,.5)}
.zc.center{grid-column:2/4;grid-row:2/4;justify-content:center;gap:7px;background:var(--panel2);border-color:rgba(201,162,90,.4);padding:16px 18px}
.zc.center .cl{font-size:15px;font-weight:600;color:var(--gold)}
.ph{display:flex;justify-content:space-between;align-items:baseline;font-size:12px}
.pname{font-weight:600}
.pbr{color:var(--dim);font-size:11px}
.tag{display:inline-block;margin-left:4px;padding:0 4px;border-radius:4px;background:var(--gold);color:#1a1400;font-size:10px;font-weight:700}
.tag.body{background:var(--dim);color:#12141a}
.stars{display:flex;flex-wrap:wrap;gap:2px 6px;font-size:11.5px;line-height:1.5}
.st.main{color:var(--ink);font-weight:600}
.st.good{color:var(--good)}
.st.bad{color:var(--bad)}
.st.aux{color:var(--dim)}
.st i{font-style:normal;font-size:9.5px;margin-left:1px;padding:0 2px;border-radius:3px}
.m-lu{background:rgba(95,191,139,.2);color:var(--good)}
.m-quan{background:rgba(201,162,90,.2);color:var(--gold)}
.m-ke{background:rgba(216,161,60,.2);color:var(--warn)}
.m-ji{background:rgba(224,102,95,.2);color:var(--bad)}
.foot{margin-top:auto;font-size:10.5px;color:var(--dim)}
.ss{font-size:10.5px;line-height:1.5;color:var(--dim);opacity:.85;margin-top:2px}
.bz{display:grid;grid-template-columns:56px repeat(4,1fr);gap:8px 12px;align-items:center;margin-top:6px}
.bz .lbl{font-size:12px;color:var(--dim)}
.bz .cell{font-size:12.5px}
.bz .cell.head{color:var(--gold);font-size:12px;font-weight:600}
.bz .big{font-size:23px;font-weight:600}
.bz .small{font-size:11.5px;line-height:1.7}
.dim{color:var(--dim)}
.ly{display:flex;flex-direction:column;gap:5px;font-family:ui-monospace,Consolas,monospace;font-size:13px}
.ly-row{display:flex;align-items:center;gap:10px}
.ly-name{width:34px;color:var(--dim);font-size:11.5px}
.ly-bar{width:76px;letter-spacing:1px}
.ly-bar.yang{color:var(--ink)}
.ly-bar.yin{color:var(--dim)}
.ly-bar.moving{color:var(--warn)}
.ly-gz{width:60px}
.ly-lq{width:54px}
.ly-ls{width:44px;font-size:11.5px}
.ly-mv{color:var(--warn);font-size:11px}
.mark{display:inline-block;width:18px}
.seg{display:inline-flex;border:1px solid var(--line);border-radius:8px;overflow:hidden}
.seg button{padding:6px 13px;background:transparent;border:none;color:var(--dim);font-size:12px;font-family:inherit;cursor:pointer}
.seg button.on{background:var(--gold);color:#fff;font-weight:600}
.tip{margin:-6px 0 16px;font-size:12px;color:var(--dim);line-height:1.8}
.now{padding:8px 14px;border-radius:4px;border:1px solid var(--line);background:transparent;color:var(--dim);font-family:inherit;font-size:13px;cursor:pointer}
.now:hover{background:var(--panel2)}
`;

function page() {
  const modules = MODULE_ORDER.map(buildModule).join('\n');
  const ui = fs.readFileSync(path.join(root, 'src', 'web-ui.js'), 'utf8');
  const kit = fs.readFileSync(path.join(root, 'src', 'panel-kit.js'), 'utf8');
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
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
    <label class="field" id="for-tarot" style="display:none">提问<input id="question" placeholder="例如：这份工作要不要接？"></label>
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
