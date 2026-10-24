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
/* 深色：跟随系统。只换变量，元素规则一条不改。@media screen 限定 → 打印永远浅色 */
@media screen and (prefers-color-scheme:dark){
  :root{--bg:#12110d;--panel:#1b1913;--panel2:#221f18;--line:#3c372e;--ink:#e7e2d6;--dim:#9b9488;--gold:#e2755f;--good:#67b98a;--bad:#e2755f;--warn:#d9a052}
  /* 深色下强调色是浅色，这些实心底上的文字得反过来 */
  .tab.on,.seg button.on,.go{color:#14130f}
  .err{background:rgba(226,117,95,.14)}
}
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
.bar{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px 14px;align-items:start;padding:16px 18px;background:var(--panel);border:1px solid var(--line);border-radius:12px;margin-bottom:18px}
.grp{display:contents}
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
.go{margin-left:0;grid-column:4;justify-self:end;align-self:end;padding:10px 22px;border-radius:6px;border:none;background:var(--gold);color:#fff;font-weight:600;cursor:pointer;font-family:inherit;font-size:15px}
.go:hover{filter:brightness(1.08)}
.go.ghost{grid-column:3;background:transparent;border:1px solid var(--line);color:var(--dim);font-weight:500;margin-right:8px}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.chip{font-size:13px;padding:4px 10px;border-radius:7px;background:var(--panel2);border:1px solid var(--line);color:var(--dim)}
.chip.ok{color:var(--good);border-color:rgba(95,191,139,.35)}
.chip.warn{color:var(--warn);border-color:rgba(216,161,60,.35)}
.chip.dim{opacity:.6}
.note{margin-top:10px;font-size:13px;color:var(--dim)}
.err{margin-top:18px;padding:12px 16px;border-radius:10px;background:rgba(224,102,95,.12);color:var(--bad);font-size:14px}
/* 注：盘面样式（紫微宫格 .pp-grid / 八字 .pp-bz / 六爻 .mp-hy-row / 梅花 .mp-hexbox / 六壬 .mp-dl-pan2 / 塔罗 .mp-tt-grid）
   全部由 src/panel-kit.js 的 PP.CSS 提供，本文件只保留页面框架样式，不再重复定义旧版盘面类 */
h3{margin:18px 0 8px;font-size:15px;font-weight:600;color:var(--gold)}
.seg{display:inline-flex;border:1px solid var(--line);border-radius:8px;overflow:hidden}
.seg button{padding:7px 14px;background:transparent;border:none;color:var(--dim);font-size:13.5px;font-family:inherit;cursor:pointer}
.seg button.on{background:var(--gold);color:#fff;font-weight:600}
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
.askbox{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:14px 0 0;padding:10px 12px;border:1px dashed var(--line);border-radius:8px}
.askbox input{flex:1 1 240px;min-width:0;background:var(--panel2);border:1px solid var(--line);color:var(--ink);border-radius:8px;padding:8px 12px;font-size:14px;font-family:inherit}
.askbox button{padding:8px 14px;border:1px solid var(--line);border-radius:8px;background:var(--gold);color:#fff;font:inherit;font-size:13px;cursor:pointer}
.askbox .hint{font-size:12px;color:var(--dim)}
.method{max-width:860px;margin:0 auto;padding:24px 18px 40px;font-size:14px;line-height:1.9;color:var(--ink2)}
.method h2{font-size:18px;color:var(--gold);margin:0 0 12px}
.method h3{font-size:15px;color:var(--ink);margin:18px 0 6px}
.method ul{margin:6px 0;padding-left:20px}
.method .note{color:var(--dim);font-size:13px}
.exp{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin:14px 0 0}
.exp button{padding:9px 16px;border-radius:8px;border:1px solid var(--line);background:var(--panel);color:var(--ink);font-family:inherit;font-size:14px;cursor:pointer}
.exp button:hover{background:var(--panel2);border-color:var(--gold)}
.exp .hint{font-size:13px;color:var(--dim)}

/* —— 竖屏（≤640px）：整页不横向滚动，输入区整行堆叠，盘面交给 panel-kit 的同名媒体查询 —— */
@media (max-width:640px){
  body{font-size:15.5px}
  .wrap{padding:14px 12px 48px}
  header{flex-direction:column;align-items:stretch;gap:10px;margin-bottom:12px}
  header>*{min-width:0}
  .brand{font-size:19px}
  .tabs{margin-left:0;padding-bottom:4px;max-width:100%}
  .tab{flex:0 0 auto;padding:11px 17px;font-size:14px;min-height:44px}
  .bar{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;padding:14px}
    .field{min-width:0}
  .field{width:100%}
  .field input,.field select,.field textarea,#addr,#changing,#direction{width:100%;min-width:0;padding:11px 12px;font-size:16px;min-height:44px}
  #for-ask{flex-direction:column;align-items:stretch}
  .field.check{padding-bottom:0}
  #mh-num{flex-wrap:wrap}
  #mh-num input{flex:1 1 30%;width:auto}
  .seg{display:flex;width:100%}
  .seg button{flex:1;padding:12px 8px;min-height:44px}
  .go{margin-left:0;width:100%;padding:13px;font-size:16px;min-height:48px;border-radius:8px}
  .tip{font-size:13px}
  .tip .auto-note{font-size:13px}
  .cast-at{font-size:13px}
  /* 六个 tab 在 390px 下横向排不下，改成 3 列两行铺满：
     原来靠 overflow-x 横滑，最后一个「塔罗」永远卡在右缘只露半个字 */
  .tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;overflow:visible;width:100%}
  .tab{width:auto;min-width:0;padding:11px 6px;text-align:center}
}

/* —— 打印 / 存为 PDF ——
   只留抬头与结果，输入区、tab、按钮全部不打印；
   盘面每一块都别被撕成两页 */
@media print{
  @page{size:A4 portrait;margin:12mm}
  body{background:#fff;padding:0;font-size:12pt}
  .wrap{max-width:none;padding:0}
  .tabs,.bar,.tip,.go,.no-print,.exp{display:none!important}
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
    <div class="brand">命理排盘<small>八字 · 紫微 · 六爻 · 梅花 · 六壬 · 奇门 · 合盘 · 塔罗　全部在本机计算</small></div>
    <div class="tabs">
      <button class="tab" data-tab="ziwei">紫微</button>
      <button class="tab" data-tab="bazi">八字</button>
      <button class="tab" data-tab="liuyao">六爻</button>
      <button class="tab" data-tab="meihua">梅花</button>
      <button class="tab" data-tab="daliuren">六壬</button>
      <button class="tab" data-tab="qimen">奇门</button>
      <button class="tab" data-tab="hepan">合盘</button>
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
    <ul><li>测试：52 个测试文件 / 1327 条断言；五道闸（回归 · 断言基线 · 测试可失败自检 · HTML 注入面 · 工程约定）</li><li>可复现：seed / asOf 显式；同一输入同一输出</li><li>口径：晚子时、真太阳时、奇门三流派、闰月归月都可切换，并有字段级差异对照</li></ul>
    <h3>已知边界（不猜）</h3>
    <ul><li>六爻应期（具体哪天应验）不做；卦例只录动爻个数，不录爻位</li><li>财富/健康只给结构判断与档位，不给金额区间、不作诊断</li><li>紫微飞星串连、八字交运日的时辰级细分未做</li></ul>
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
  // 默认写到工作区根目录；`--out <file>` 可另存（例如同步到桌面那份拷贝）
  const outIdx = process.argv.indexOf('--out');
  const target = outIdx > 0 && process.argv[outIdx + 1]
    ? path.resolve(process.argv[outIdx + 1])
    : path.resolve(root, '..', '命理排盘.html');
  fs.writeFileSync(target, out, 'utf8');
  console.log(`written: ${target}  (${(out.length / 1024).toFixed(1)} KB)`);
}




