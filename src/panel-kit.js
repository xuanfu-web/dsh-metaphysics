// 共用渲染层：紫微/八字/六爻/梅花/六壬/塔罗 -> HTML 字符串。面板与独立页面共用同一份。
(function () {
  const CSS = `
.pp{--ink:#1b1b1b;--muted:#6f6a60;--line:#c8c1b2;--bg:#fffdf8;--card:#fffefb;--red:#b3261e;--lu:#1f6f3f;--quan:#8a5a00;--ke:#1f4e79;--ji:#b3261e;
  border:1px solid var(--line);background:var(--bg);color:var(--ink);font-family:"Songti SC","SimSun","Microsoft YaHei",serif;font-size:12.5px;line-height:1.55}
.pp *{box-sizing:border-box}
.pp-grid{display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,minmax(150px,auto));gap:0}
.pp-cell{border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:7px 8px;display:flex;flex-direction:column;position:relative;min-height:150px;background:var(--bg)}
.pp-cell:nth-child(4n){border-right:none}
.pp-cell.pp-lastrow{border-bottom:none}
.pp-center{grid-column:2/4;grid-row:2/4;border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:16px 18px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;text-align:center;background:var(--bg)}
.pp-center .t1{font-size:17px;font-weight:700;letter-spacing:.05em;margin-bottom:6px}
.pp-center .t2{font-size:12.5px;color:var(--ink)}
.pp-center .t3{font-size:14px;letter-spacing:.35em;margin:6px 0;font-weight:600}
.pp-center .t4{font-size:12.5px;color:var(--muted)}
.pp-stars{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:0 6px;font-size:13px;line-height:1.6;min-height:36px}
.pp-st{white-space:nowrap}
.pp-st.main{font-weight:700}
.pp-st.good{color:var(--lu)}
.pp-st.bad{color:var(--ji)}
.pp-st.aux{color:var(--muted)}
.pp-m{display:inline-block;font-style:normal;font-size:12px;line-height:1;padding:0 2px;border-radius:2px;color:#fff;margin-left:1px;vertical-align:1px}
.pp-m.lu{background:var(--lu)}.pp-m.quan{background:var(--quan)}.pp-m.ke{background:var(--ke)}.pp-m.ji{background:var(--ji)}
.pp-ages{margin-top:2px;font-size:12px;color:var(--muted);letter-spacing:.02em}
.pp-foot{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;gap:4px;font-size:12px;color:var(--muted)}
.pp-foot .l{display:flex;flex-direction:column;gap:0;line-height:1.5}
.pp-foot .l .dx{color:var(--ink)}
.pp-foot .r{display:flex;flex-direction:column;align-items:flex-end;gap:0;line-height:1.5}
.pp-foot .pn{color:var(--red);font-size:14px;font-weight:700}
.pp-soul{box-shadow:inset 0 0 0 2px rgba(179,38,30,.35)}
.pp-body::after{content:"身";position:absolute;top:4px;left:4px;font-size:12px;color:#fff;background:var(--muted);padding:0 3px;border-radius:2px}
.pp-legend{display:flex;gap:10px;align-items:center;justify-content:center;font-size:12px;color:var(--muted);margin-top:6px}
.pp-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;font-family:system-ui,sans-serif}
.pp-chip{font-size:12.5px;padding:3px 9px;border:1px solid var(--line);color:var(--muted);background:var(--bg)}
.pp-chip.ok{color:var(--lu);border-color:var(--lu)}
.pp-chip.warn{color:var(--quan);border-color:var(--quan)}
.pp-sec{margin-top:10px}
.pp-sec-h{font-size:12.5px;letter-spacing:.08em;color:#8a8378;font-weight:700;margin-bottom:2px}
.pp-tl{font-size:12.5px;color:var(--muted);line-height:1.75}
.pp-bz{width:100%;border-collapse:collapse;font-size:13.5px;font-family:system-ui,sans-serif}
.pp-bz th,.pp-bz td{border:1px solid var(--line);padding:8px 10px;text-align:center}
.pp-bz th{color:var(--red);font-weight:600;font-size:12.5px}
.pp-bz td.big{font-size:24px;font-weight:700}
.pp-bz td.lbl{color:var(--muted);font-size:12.5px;width:60px}
.wx-wood{color:#1f6f3f}.wx-fire{color:#b3261e}.wx-earth{color:#8a5a00}.wx-metal{color:#8a6b1f}.wx-water{color:#1f4e79}
.zhuri{color:#b3261e;font-weight:700}
.pp-rel{margin-top:10px;font-size:13px;line-height:1.9}
.pp-rel b{color:var(--muted);font-weight:400;margin-right:10px}
.pp-str{margin-top:10px;font-size:13px;line-height:1.8}
.pp-str b{color:var(--red);font-size:15px;margin:0 4px}
.pp-drel{font-style:normal;color:var(--red);font-size:12px}
.pp-dim{color:var(--muted)}
.pp-r{display:none}
.pp-modes{display:flex;align-items:center;border-bottom:1px solid var(--line);font-family:system-ui,sans-serif}
.pp-modes label{padding:6px 20px;font-size:12.5px;color:var(--muted);cursor:pointer;border-right:1px solid var(--line);user-select:none}
.pp-modes label:hover{background:#f2ece0}
.pp-soon{margin-left:auto;padding-right:10px;font-size:12px;color:#a9a296}
.pp-body{display:none}
#ppm-ben:checked~.pp-body.ben,#ppm-da:checked~.pp-body.da,#ppm-ln:checked~.pp-body.ln{display:block}
#ppm-ben:checked~.pp-modes label[for="ppm-ben"],#ppm-da:checked~.pp-modes label[for="ppm-da"],#ppm-ln:checked~.pp-modes label[for="ppm-ln"]{background:var(--red);color:#fff}
.pp-tri{background:#fbf8f1}
.pp-soul{background:#fdf3f1}
.pp-zh{margin-left:4px;white-space:nowrap}
.pp-ss{display:flex;flex-wrap:wrap;gap:0 7px;font-size:12.5px;line-height:1.6}
.pp-ss .s{white-space:nowrap;cursor:help}
.pp-ss .s.good{color:var(--lu)}
.pp-ss .s.bad{color:var(--ji)}
.pp-ss .s.neutral{color:var(--quan)}
.pp-ssx{margin-top:10px;font-family:system-ui,sans-serif}
.pp-ssx .h{display:flex;align-items:baseline;gap:8px;font-size:12.5px;color:var(--muted);border-top:1px solid var(--line);padding-top:8px;margin-top:10px}
.pp-ssx .h b{color:var(--red);font-size:14px;font-weight:600}
.pp-ssg{display:flex;gap:8px;align-items:baseline;margin-top:5px;font-size:12.5px;line-height:1.7}
.pp-ssg .gt{flex:0 0 40px;color:var(--muted);font-size:12px;letter-spacing:.08em}
.pp-ssg .gi{display:flex;flex-wrap:wrap;gap:3px 6px}
.pp-ssi{white-space:nowrap;border:1px solid var(--line);padding:0 5px;cursor:help}
.pp-ssi.good{color:var(--lu);border-color:rgba(31,111,63,.35)}
.pp-ssi.bad{color:var(--ji);border-color:rgba(179,38,30,.3)}
.pp-ssi.neutral{color:var(--quan);border-color:rgba(138,90,0,.3)}
.pp-ssi em{font-style:normal;font-size:12px;color:var(--muted);margin-left:2px}

/* —— 爻线：真线，阳为整条、阴为断开、动爻描红 —— */
.hex{display:flex;gap:16%;height:11px;width:104px;flex:0 0 auto;color:var(--ink);align-items:stretch}
.hex i{flex:1;background:currentColor;border-radius:1.5px}
.hex.yin{gap:18%}
.hex.on{color:var(--red)}
.hex.dim{color:#b9b2a4}
.hex.sm{width:74px;height:9px}
.hex.md{width:88px;height:10px}

/* —— 六爻 —— */
.hy-wrap{display:flex;gap:22px;flex-wrap:wrap;align-items:flex-start}
.hy-box{border:1px solid var(--line);background:var(--card);padding:12px 16px 14px;min-width:250px}
.hy-h{display:flex;align-items:baseline;gap:8px;margin-bottom:10px;font-family:system-ui,sans-serif}
.hy-h b{color:var(--red);font-size:14px}
.hy-h span{color:var(--muted);font-size:12px}
.hy{display:flex;flex-direction:column;gap:6px}
.hy-row{display:grid;grid-template-columns:18px 30px 112px 60px 54px 40px;gap:8px;align-items:center;font-size:13px;font-family:system-ui,sans-serif;padding:1px 0}
.hy-sy{color:var(--red);font-size:12px;font-weight:700}
.hy-nm{color:var(--muted);font-size:12px}
.hy-gz{letter-spacing:.04em}
.hy-ls{color:var(--muted);font-size:12px}
.hy-dn{color:var(--red);font-size:12px;font-family:system-ui,sans-serif}
.hy-void{color:#a9a296}
.hy-row.plain{grid-template-columns:34px 112px;gap:9px;padding:0}
.mh-mini{display:flex;flex-direction:column;gap:4px}

/* —— 梅花 —— */
.mh{padding:16px}
.mh-head{font-size:13px;color:var(--muted);margin-bottom:12px}
.mh-main{display:flex;gap:18px;flex-wrap:wrap;align-items:flex-start}
.hexbox{border:1px solid var(--line);background:var(--card);padding:12px 15px 13px}
.hexbox.mini{min-width:118px}
.hexbox .h{display:flex;justify-content:space-between;gap:10px;font-size:12px;letter-spacing:.14em;color:var(--muted);font-family:system-ui,sans-serif;margin-bottom:5px}
.hexbox .n{font-size:17px;font-weight:700;color:var(--red);margin-bottom:8px;letter-spacing:.04em}
.hexbox.mini .n{font-size:15px;margin-bottom:6px}
.hexbox .s{font-size:12px;color:var(--muted);margin-top:8px;font-family:system-ui,sans-serif}
.trib{display:flex;flex-direction:column;gap:4px}
.trib+.trib{margin-top:8px;padding-top:8px;border-top:1px dotted var(--line)}
.trib-h{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--muted);font-family:system-ui,sans-serif;margin-bottom:3px}
.tri-tag{font-size:12px;padding:0 4px;border:1px solid var(--line);color:var(--muted);font-family:system-ui,sans-serif}
.tri-tag.ti{color:var(--red);border-color:rgba(179,38,30,.45);font-weight:700}
.tri-tag.yong{color:var(--ke);border-color:rgba(31,78,121,.45)}
.mh-rel{margin-top:12px;font-size:13.5px;font-family:system-ui,sans-serif;line-height:1.8}
.mh-rel b{color:var(--muted);font-weight:400;margin-right:8px}
.mh-rel .lv{font-weight:700}
.mh-rel .lv.good{color:var(--lu)}
.mh-rel .lv.bad{color:var(--ji)}
.mh-rel .lv.flat{color:var(--quan)}

/* —— 大六壬 —— */
.dl{padding:16px}
.dl-head{font-size:13px;color:var(--muted);margin-bottom:12px;line-height:1.7}
.dl-sc{display:flex;align-items:stretch;margin:0 0 12px;flex-wrap:wrap}
.dl-sc-c{border:1px solid var(--line);background:var(--card);padding:10px 18px;min-width:110px;text-align:center}
.dl-sc-c+.dl-sc-c{border-left:none}
.dl-sc-c.ge{border-left:1px solid var(--line);background:#fbf6ec}
.dl-sc-k{font-size:12px;letter-spacing:.16em;color:var(--muted);font-family:system-ui,sans-serif}
.dl-sc-z{font-size:24px;font-weight:700;color:var(--red);line-height:1.2}
.dl-sc-j{font-size:12px}
.dl-sc-l{font-size:12px;color:var(--muted);font-family:system-ui,sans-serif}
.dl-sc-gn{font-size:16px;font-weight:700;margin-top:1px}
.dl-sk{display:flex;justify-content:center;margin-bottom:12px;flex-wrap:wrap}
.dl-sk-c{border:1px solid var(--line);background:var(--card);padding:8px 14px 9px;text-align:center;min-width:82px}
.dl-sk-c+.dl-sk-c{border-left:none}
.dl-sk-k{font-size:12px;color:var(--muted);letter-spacing:.1em;font-family:system-ui,sans-serif}
.dl-sk-s{font-size:17px;font-weight:700;color:var(--red);line-height:1.3}
.dl-sk-x{font-size:14.5px;color:var(--muted);line-height:1.3}
.dl-sk-r{font-size:12px;color:var(--muted);font-family:system-ui,sans-serif}
.dl-pan2{display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,minmax(84px,auto));border:1px solid var(--line);background:var(--bg)}
.dl-pc{border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:7px 9px;display:flex;flex-direction:column;gap:0}
.dl-pc .tz{font-size:21px;font-weight:700;color:var(--red);line-height:1.2}
.dl-pc .dz{font-size:12px;color:var(--muted);font-family:system-ui,sans-serif}
.dl-pc .jz{font-size:12px;color:var(--quan);margin-top:auto;font-family:system-ui,sans-serif}
.dl-c{grid-column:2/4;grid-row:2/4;border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:14px;display:flex;flex-direction:column;gap:4px;align-items:center;justify-content:center;text-align:center;background:#fffdf8}
.dl-c .t1{font-size:16px;font-weight:700;letter-spacing:.06em}
.dl-c .t2{font-size:12px;color:var(--muted);font-family:system-ui,sans-serif}
.dl-c .t3{font-size:12.5px;letter-spacing:.2em;margin-top:3px}
.dl-legend{display:flex;gap:12px;justify-content:center;font-size:12px;color:var(--muted);font-family:system-ui,sans-serif;margin-top:6px}

/* —— 塔罗 —— */
.tt{padding:16px}
.tt-head{font-size:12.5px;color:var(--muted);margin-bottom:12px;letter-spacing:.04em}
.tt-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(172px,1fr));gap:10px}
.tt-card{border:1px solid var(--line);background:#fffefb;padding:13px 14px;display:flex;flex-direction:column;gap:7px;min-height:168px}
.tt-card.rev{background:#fbf7f4;border-style:dashed}
.tt-pos{font-size:12px;color:var(--muted);letter-spacing:.14em}
.tt-name{font-size:19px;font-weight:700;color:var(--red);letter-spacing:.04em}
.tt-ori{font-size:12px;padding:1px 7px;border:1px solid var(--line);align-self:flex-start;color:var(--muted)}
.tt-kw{display:flex;flex-wrap:wrap;gap:4px 8px;font-size:13px;line-height:1.7}
.tt-kw span{border-bottom:1px dotted var(--line)}
.tt-el{margin-top:auto;font-size:12px;color:var(--muted)}
.tt-core{font-size:12.5px;color:#4a453d;line-height:1.7;border-left:2px solid var(--line);padding-left:8px}
.tt-no{font-size:12px;color:var(--muted);letter-spacing:.1em;margin-left:6px}
.tt-tip{margin-top:12px;font-size:12px;color:var(--muted)}
.tt-q{font-size:13px;margin-bottom:6px}
.tt-q b{color:var(--muted);font-weight:400;margin-right:8px}
.tt-read{margin-top:14px;border-top:1px solid var(--line);padding-top:10px}
.tt-rt{font-size:12px;letter-spacing:.14em;color:var(--muted);margin-bottom:6px}
.tt-read p{margin:0 0 5px;font-size:13px;line-height:1.85}
.tt-note{margin-top:12px}
.tt-ta{width:100%;border:1px solid var(--line);background:#fffefb;color:var(--ink);padding:8px;font-size:13px;font-family:inherit;line-height:1.7;resize:vertical;outline:none}
.tt-ta:focus{border-color:var(--red)}

/* —— 解析与详解 —— */
.it{--ink:#1b1b1b;--muted:#6f6a60;--line:#c8c1b2;--bg:#fffdf8;--card:#fffefb;--red:#b3261e;
  margin-top:14px;border:1px solid var(--line);background:var(--bg);color:var(--ink);
  font-family:"Songti SC","SimSun","Microsoft YaHei",serif;font-size:13px;line-height:1.75}
.it *{box-sizing:border-box}
.it-head{display:flex;align-items:baseline;gap:9px;flex-wrap:wrap;padding:12px 16px;border-bottom:1px solid var(--line);background:var(--card)}
.it-title{font-size:15px;font-weight:700;letter-spacing:.08em;color:var(--red)}
.it-tag{font-size:12px;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:1px 9px;font-family:system-ui,sans-serif}
.it-lead{padding:11px 16px;font-size:13px;color:#4a453d;border-bottom:1px dashed var(--line)}
.it-body{padding:2px 16px 12px}
.it-dim{padding:12px 0;border-bottom:1px dashed var(--line)}
.it-dim:last-of-type{border-bottom:none}
.it-dh{display:flex;align-items:center;gap:8px;margin-bottom:6px}
.it-dno{flex:none;width:20px;height:20px;border-radius:50%;background:var(--red);color:#fff;font-size:12px;display:flex;align-items:center;justify-content:center;font-family:system-ui,sans-serif}
.it-dlabel{font-size:14.5px;font-weight:700;letter-spacing:.04em}
.it-dtext{font-size:13px;line-height:1.9;text-align:justify}
.it-adv{margin-top:8px;padding:9px 12px;background:#f7f3ea;border-left:2px solid var(--red);font-size:13px;line-height:1.85}
.it-adv b{color:var(--red);font-weight:600;margin-right:7px;font-family:system-ui,sans-serif;font-size:12px;letter-spacing:.1em}
.it-secs{border-top:1px solid var(--line);padding:12px 16px 2px;background:var(--card)}
.it-sec{margin-bottom:11px}
.it-sh{font-size:13px;font-weight:700;color:#1f6f3f;letter-spacing:.06em;margin-bottom:4px}
.it-stext{font-size:13px;line-height:1.9;color:#3f3a33;text-align:justify}
.it-dis{padding:11px 16px;border-top:1px solid var(--line);background:#f7f3ea;font-size:12px;line-height:1.75;color:var(--muted);font-family:system-ui,sans-serif}

/* —— 竖屏（≤640px）：盘面重排为竖向卡片，页面不横向滚动 —— */
@media (max-width:640px){
  .pp-modes{flex-wrap:wrap}
  .pp-modes label{padding:6px 16px}
  .pp-soon{margin-left:0;padding:6px 10px;width:100%;border-top:1px solid var(--line)}
  /* 紫微：十二宫改 2 列卡片流，总览置顶 */
  .pp-grid{grid-template-columns:repeat(2,1fr);grid-template-rows:none;gap:6px;padding:8px}
  .pp-cell{grid-row:auto!important;grid-column:auto!important;min-height:0;border:1px solid var(--line)!important;border-radius:8px}
  .pp-center{grid-row:auto!important;grid-column:1/-1!important;order:-1;border:1px solid var(--line)!important;border-radius:8px}
  .pp-stars{justify-content:flex-start}
  /* 八字：隐藏表头，行标签整行 + 四柱 2×2，每格角标柱名 */
  .pp-bz{border-collapse:separate;border-spacing:0}
  .pp-bz thead{display:none}
  .pp-bz,.pp-bz tbody{display:block}
  .pp-bz tr{display:grid;grid-template-columns:repeat(2,1fr);margin-top:-1px}
  .pp-bz td{margin:0 0 0 -1px}
  .pp-bz td.lbl{grid-column:1/-1;width:auto;margin:0;background:var(--card);color:var(--ink);font-weight:600}
  .pp-bz td[data-c]::before{content:attr(data-c);display:block;font-size:12px;color:var(--muted);letter-spacing:.12em;margin-bottom:2px}
  .pp-bz td.big{font-size:26px}
  /* 六爻：列宽收紧，爻线自适应拉长 */
  .hy-wrap{gap:14px}
  .hy-box{min-width:0;width:100%}
  .hy-row{grid-template-columns:14px 32px minmax(64px,1fr) 46px 42px 32px;gap:6px;font-size:12.5px}
  .hy-row.plain{grid-template-columns:32px minmax(72px,1fr)}
  .hex{width:auto;min-width:64px;height:12px}
  .hex.sm{min-width:56px;height:10px}
  .hex.md{min-width:60px;height:11px}
  /* 梅花 */
  .mh{padding:10px}
  .mh-main{gap:12px}
  .hexbox.mini{min-width:100px}
  /* 大六壬：天地盘改 3 列卡片流，总览置顶 */
  .dl{padding:10px}
  .dl-sc-c{min-width:88px;padding:8px 12px}
  .dl-sk-c{min-width:70px;padding:6px 8px 7px}
  .dl-pan2{grid-template-columns:repeat(3,1fr);grid-template-rows:none}
  .dl-pc{grid-row:auto!important;grid-column:auto!important;min-height:76px}
  .dl-c{grid-row:auto!important;grid-column:1/-1!important;order:-1}
  /* 塔罗 */
  .tt{padding:10px}
  .tt-grid{grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}
  /* 解析与详解：收窄内边距、行距放宽便于竖屏阅读 */
  .it-head,.it-lead,.it-body,.it-secs,.it-dis{padding-left:11px;padding-right:11px}
  .it-dlabel{font-size:15px}
  .it-dtext,.it-stext,.it-adv{font-size:13.5px;line-height:1.95}
  .it-adv{padding:9px 10px}
}
@media (max-width:430px){
  /* 窄屏手机：紫微单列，保证宫名/干支/星曜完整可读 */
  .pp-grid{grid-template-columns:1fr}
  .dl-sc-c{min-width:80px}
}
`;
  const pp = (window.__PP = window.__PP || {});
  pp.CSS = CSS;

  const TYPE_CLASS = { 主星: 'main', 吉星: 'good', 煞星: 'bad', 辅星: 'aux', 杂曜: 'aux' };
  const MUT = { 禄: 'lu', 权: 'quan', 科: 'ke', 忌: 'ji' };
  const POS = {
    巳: [1, 1], 午: [1, 2], 未: [1, 3], 申: [1, 4],
    辰: [2, 1], 酉: [2, 4], 卯: [3, 1], 戌: [3, 4],
    寅: [4, 1], 丑: [4, 2], 子: [4, 3], 亥: [4, 4],
  };

  // 先天八卦：爻自下而上，1 阳 0 阴
  const TRI_BITS = {
    乾: [1, 1, 1], 兑: [1, 1, 0], 离: [1, 0, 1], 震: [1, 0, 0],
    巽: [0, 1, 1], 坎: [0, 1, 0], 艮: [0, 0, 1], 坤: [0, 0, 0],
  };
  const POS_NAME = ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'];

  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  /** 单爻线：阳一整条，阴两段；动爻描红 */
  const hexBar = (yang, moving, size) => `<span class="hex${yang ? '' : ' yin'}${moving ? ' on' : ''}${size ? ' ' + size : ''}">${yang ? '<i></i>' : '<i></i><i></i>'}</span>`;

  function starsHTML(stars) {
    if (!stars || !stars.length) return '';
    return stars.map((s) => {
      const cls = TYPE_CLASS[s.type] || 'aux';
      const m = s.mutagen ? `<i class="pp-m ${MUT[s.mutagen]}">${s.mutagen}</i>` : '';
      return `<span class="pp-st ${cls}">${s.name}${m}</span>`;
    }).join('');
  }

  function agesHTML(age) {
    const list = [];
    for (let i = 0; i < 6; i++) list.push(age + i * 12);
    return list.join(',');
  }

  const NAMES = ['命宫', '兄弟', '夫妻', '子女', '财帛', '疾厄', '迁移', '交友', '官禄', '田宅', '福德', '父母'];
  const BR = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  const fx = (n) => ((n % 12) + 12) % 12;
  const isTrine = (b, m) => b !== m && [fx(m + 4), fx(m + 8), fx(m + 6)].includes(b);

  function cellHTML(p, soulIdx) {
    const pos = POS[p.branch] || [1, 1];
    const b = BR.indexOf(p.branch);
    const cls = ['pp-cell'];
    if (b === soulIdx) cls.push('pp-soul');
    else if (isTrine(b, soulIdx)) cls.push('pp-tri');
    if (p.isBody) cls.push('pp-body');
    if (pos[0] === 4) cls.push('pp-lastrow');
    const ss = p.shensha || {};
    const pname = NAMES[fx(soulIdx - b)];
    const zh = (p.selfHua && p.selfHua.length)
      ? `<span class="pp-zh">${p.selfHua.map((x) => `<i class="pp-m ${MUT[x.type]}">${x.type}</i>`).join('')}</span>` : '';
    return `<div class="${cls.join(' ')}" style="grid-row:${pos[0]};grid-column:${pos[1]}">
      <div class="pp-stars">${starsHTML(p.stars)}${zh}</div>
      <div class="pp-ages">${agesHTML(p.xiaoxian.age)}</div>
      <div class="pp-foot">
        <div class="l">
          <span class="dx">${ss.boshi} ${p.daxian.start}-${p.daxian.end}</span>
          <span>${ss.jiangqian}</span>
          <span>${ss.suiqi}</span>
        </div>
        <div class="r">
          <span>${ss.changsheng}</span>
          <span>${p.ganzhi}</span>
          <span class="pn">${pname}</span>
        </div>
      </div>
    </div>`;
  }

  function sizhuOf(r) {
    try {
      const E = window.Engine || (window.__PP && window.__PP.Engine);
      if (!E || !E.buildBazi || !r.input) return '';
      const b = E.buildBazi({
        year: r.input.year, month: r.input.month, day: r.input.day,
        hour: r.input.hour, minute: r.input.minute,
        gender: r.input.gender, trueSolar: false,
      });
      return ['year', 'month', 'day', 'hour'].map((k) => b.pillars[k].ganzhi).join(' ');
    } catch (e) { return ''; }
  }

  pp.ziweiHTML = function (r) {
    const soulIdx = BR.indexOf(r.soul.branch);
    const ln = (r.liunian && r.liunian[0]) || null;
    const age = ln ? ln.age : 1;
    const dxPalace = r.palaces.find((p) => age >= p.daxian.start && age <= p.daxian.end) || r.palaces[0];
    const dxIdx = BR.indexOf(dxPalace.branch);
    const lnIdx = ln ? BR.indexOf(ln.lifePalace.branch) : soulIdx;

    const grid = (m) => r.palaces.map((p) => cellHTML(p, m)).join('');
    const center = (m, kind) => {
      const mode = kind === 'da'
        ? `<div class="t1">大限 ${dxPalace.ganzhi}　${dxPalace.daxian.start}-${dxPalace.daxian.end}岁</div>`
        : kind === 'ln' && ln
          ? `<div class="t1">流年 ${ln.ganzhi}　${ln.age}岁</div>`
          : `<div class="t1">${r.daxian.rule.slice(0, 2)}　${r.bureau.name}</div>`;
      return `<div class="pp-center">
        ${mode}
        <div class="t2">公历 ${r.input.year}-${String(r.input.month).padStart(2, '0')}-${String(r.input.day).padStart(2, '0')} ${String(r.input.hour).padStart(2, '0')}:${String(r.input.minute).padStart(2, '0')}</div>
        <div class="t2">农历 ${r.lunar.year}年${r.lunar.isLeap ? '闰' : ''}${r.lunar.month}月${r.lunar.day}日${r.hourBranch}时</div>
        ${sizhuOf(r) ? `<div class="t3">${sizhuOf(r)}</div>` : ''}
        <div class="t4">命主 ${r.lifeMaster}　身主 ${r.bodyMaster}</div>
        <div class="t4">命宫 ${r.soul.branch}　身宫 ${r.body.branch}　五行局 ${r.bureau.name}</div>
        <div class="t4">子年斗君 ${r.doujun ? r.doujun.zinian : '—'}　流年斗君 ${ln && ln.doujun ? ln.doujun : '—'}</div>
        <div class="t4">紫微 ${r.ziwei}　天府 ${r.tianfu}　${kind === 'da' ? '大限命宫 ' + BR[dxIdx] : kind === 'ln' ? '流年命宫 ' + BR[lnIdx] : '本命命宫 ' + r.soul.branch}</div>
        <div class="pp-legend"><span class="pp-m lu">禄</span><span class="pp-m quan">权</span><span class="pp-m ke">科</span><span class="pp-m ji">忌</span><span>红框=命宫　浅底=三方四正</span></div>
      </div>`;
    };

    const body = (id, m, kind) => `<div class="pp-body ${id}"><div class="pp-grid">${grid(m)}${center(m, kind)}</div></div>`;

    const cq = r.changqu;
    const chips = cq ? `<div class="pp-chips">
      <span class="pp-chip">昌 ${cq.wenchang.branch}（${cq.wenchang.palace}）</span>
      <span class="pp-chip">曲 ${cq.wenqu.branch}（${cq.wenqu.palace}）</span>
      <span class="pp-chip">${cq.relation}</span>
      <span class="pp-chip">入命三方 ${cq.inSoulSanfang ? '是' : '否'}</span>
      <span class="pp-chip ${cq.absorb.label === '杂' ? 'warn' : 'ok'}">吸收·${cq.absorb.label}</span>
    </div>` : '';
    const pats = (r.patterns || []).length
      ? `<div class="pp-chips">${r.patterns.map((p) => `<span class="pp-chip ${p.tone === 'good' ? 'ok' : p.tone === 'bad' ? 'warn' : ''}" title="${esc(p.evidence || '')}">${p.name}</span>`).join('')}</div>` : '';
    const dxs = (r.daxianList || []).length
      ? `<div class="pp-chips">${r.daxianList.slice(0, 8).map((d) => `<span class="pp-chip" title="${esc(`${d.ganzhi} 宫干四化：` + d.mutagenHits.map((m) => `${m.star}化${m.type}→${m.palace || '未上盘'}`).join('、'))}">${d.branch} ${d.ages[0]}-${d.ages[1]}</span>`).join('')}</div>` : '';
    const lnHit = ln && ln.mutagenHits && ln.mutagenHits.length
      ? `<div class="pp-chips">${ln.mutagenHits.map((m) => `<span class="pp-chip ${m.type === '忌' ? 'warn' : m.type === '禄' ? 'ok' : ''}">${m.star}化${m.type}→${m.palace || '未上盘'}</span>`).join('')}</div>` : '';

    return `<div class="pp">
      <input type="radio" name="ppm" id="ppm-ben" class="pp-r" checked>
      <input type="radio" name="ppm" id="ppm-da" class="pp-r">
      <input type="radio" name="ppm" id="ppm-ln" class="pp-r">
      <div class="pp-modes">
        <label for="ppm-ben">本命</label><label for="ppm-da">大限</label><label for="ppm-ln">流年</label>
        <span class="pp-soon">流月 · 流日 · 流时（未实现）</span>
      </div>
      ${body('ben', soulIdx, 'ben')}
      ${body('da', dxIdx, 'da')}
      ${body('ln', lnIdx, 'ln')}
    </div>${chips}${pats}${dxs}${lnHit}`;
  };

  /** 六爻 / 梅花的卦体：上爻在最上 */
  function hexRows(lines, opt) {
    const o = opt || {};
    const sorted = lines.slice().sort((a, b) => b.position - a.position);
    if (o.plain) {
      return sorted.map((l) => `<div class="hy-row plain">
        <span class="hy-nm">${l.name || POS_NAME[l.position - 1]}</span>
        ${hexBar(l.yinYang === '阳', l.moving)}
      </div>`).join('');
    }
    return sorted.map((l) => {
      const yang = l.yinYang === '阳';
      const sh = o.shiYing
        ? (l.position === o.shi ? '<span class="hy-sy">世</span>' : l.position === o.ying ? '<span class="hy-sy">应</span>' : '<span></span>')
        : '<span></span>';
      return `<div class="hy-row">
        ${sh}
        <span class="hy-nm">${l.name || POS_NAME[l.position - 1]}</span>
        ${hexBar(yang, l.moving)}
        <span class="hy-gz">${esc(l.ganzhi || '')}</span>
        <span class="hy-lq">${esc(l.liuqin || '')}</span>
        <span class="hy-ls">${esc(l.liushen || '')}</span>
      </div>`;
    }).join('');
  }

  pp.liuyaoHTML = function (r) {
    const box = (title, sub, hex, lines) => `<div class="hy-box">
      <div class="hy-h"><b>${title}</b><span>${sub}</span></div>
      <div class="hy">${hexRows(lines, { shiYing: true, shi: hex.shi, ying: hex.ying })}</div>
    </div>`;
    const ben = box(`本卦 ${r.ben.name}`, `${r.ben.palace} · ${r.ben.palaceElement}`, r.ben, r.ben.lines);
    const bian = r.bian
      ? box(`变卦 ${r.bian.name}`, `${r.bian.palace} · ${r.bian.palaceElement}`, r.bian, r.bian.lines)
      : `<div class="hy-box"><div class="hy-h"><b>六爻安静</b><span>无动爻，不取变卦</span></div>
          <div class="pp-dim" style="font-size:12px;line-height:1.9">断卦以本卦卦辞与世应生克为主。</div></div>`;
    return `<div class="pp" style="padding:14px">
      <div class="mh-head">起卦 ${r.cast.notation.join('、')}（自下而上）　日辰 ${r.dayGanZhi.name}</div>
      <div class="hy-wrap">${ben}${bian}</div>
    </div>`;
  };

  pp.meihuaHTML = function (r) {
    // 三爻成卦：由上下卦名反推爻线
    const mini = (title, name, upper, lower, note) => {
      const bits = [...(TRI_BITS[lower] || [0, 0, 0]), ...(TRI_BITS[upper] || [0, 0, 0])];
      const rows = bits.slice().reverse().map((b) => hexBar(!!b, false, 'sm')).join('');
      return `<div class="hexbox mini">
        <div class="h">${title}</div>
        <div class="n">${name}</div>
        <div class="mh-mini">${rows}</div>
        <div class="s">${note || `上${upper} 下${lower}`}</div>
      </div>`;
    };
    // 本卦：分上下卦，标体用
    const benBits = r.lines.slice().sort((a, b) => b.position - a.position);
    const upperLines = benBits.slice(0, 3);
    const lowerLines = benBits.slice(3);
    const movingInUpper = r.moving >= 4;
    const trib = (label, tri, lines, isBody) => `<div class="trib">
      <div class="trib-h">${label} ${tri}${TRI_EL(tri)}<span class="tri-tag ${isBody ? 'ti' : 'yong'}">${isBody ? '体' : '用'}</span></div>
      <div class="hy" style="gap:5px">${hexRows(lines, { plain: true })}</div>
    </div>`;
    const mainBox = `<div class="hexbox">
      <div class="h"><span>本卦</span><span>动 ${r.movingName}</span></div>
      <div class="n">${r.ben.name}</div>
      ${trib('上卦', r.ben.upper, upperLines, !movingInUpper)}
      ${trib('下卦', r.ben.lower, lowerLines, movingInUpper)}
      <div class="s">${r.source}</div>
    </div>`;

    const lv = r.bodyUse.level;
    const lvCls = lv.includes('凶') ? 'bad' : lv.includes('吉') ? 'good' : 'flat';
    const useLine = `<div class="mh-rel">
      <div><b>体</b>${r.bodyUse.body.trigram}（${r.bodyUse.body.element}）　<b>用</b>${r.bodyUse.use.trigram}（${r.bodyUse.use.element}）</div>
      <div><span class="lv ${lvCls}">${lv}</span>　${r.bodyUse.relation}</div>
    </div>`;

    const cuoTri = TRI_OF(r.cuo.name) || ['', ''];
    const zongTri = TRI_OF(r.zong.name) || ['', ''];
    return `<div class="pp mh">
      <div class="mh-main">
        ${mainBox}
        ${mini('互卦', r.hu.name, r.hu.upper, r.hu.lower, '中藏之象')}
        ${mini('变卦', r.bian.name, r.bian.upper, r.bian.lower, `动 ${r.movingName} 后`)}
        ${mini('错卦', r.cuo.name, cuoTri[1], cuoTri[0], '六爻全变')}
        ${mini('综卦', r.zong.name, zongTri[1], zongTri[0], '上下颠倒')}
      </div>
      ${useLine}
    </div>`;
  };

  // 由卦名查上下卦（六十四卦全表，用于错卦/综卦）
  const HEX_TABLE = {
    乾为天: ['乾', '乾'], 天风姤: ['乾', '巽'], 天山遁: ['乾', '艮'], 天地否: ['乾', '坤'],
    风地观: ['巽', '坤'], 山地剥: ['艮', '坤'], 火地晋: ['离', '坤'], 火天大有: ['离', '乾'],
    坎为水: ['坎', '坎'], 水泽节: ['坎', '兑'], 水雷屯: ['坎', '震'], 水火既济: ['坎', '离'],
    泽火革: ['兑', '离'], 雷火丰: ['震', '离'], 地火明夷: ['坤', '离'], 地水师: ['坤', '坎'],
    艮为山: ['艮', '艮'], 山火贲: ['艮', '离'], 山天大畜: ['艮', '乾'], 山泽损: ['艮', '兑'],
    火泽睽: ['离', '兑'], 天泽履: ['乾', '兑'], 风泽中孚: ['巽', '兑'], 风山渐: ['巽', '艮'],
    震为雷: ['震', '震'], 雷地豫: ['震', '坤'], 雷水解: ['震', '坎'], 雷风恒: ['震', '巽'],
    地风升: ['坤', '巽'], 水风井: ['坎', '巽'], 泽风大过: ['兑', '巽'], 泽雷随: ['兑', '震'],
    巽为风: ['巽', '巽'], 风天小畜: ['巽', '乾'], 风火家人: ['巽', '离'], 风雷益: ['巽', '震'],
    天雷无妄: ['乾', '震'], 火雷噬嗑: ['离', '震'], 山雷颐: ['艮', '震'], 山风蛊: ['艮', '巽'],
    离为火: ['离', '离'], 火山旅: ['离', '艮'], 火风鼎: ['离', '巽'], 火水未济: ['离', '坎'],
    山水蒙: ['艮', '坎'], 风水涣: ['巽', '坎'], 天水讼: ['乾', '坎'], 天火同人: ['乾', '离'],
    坤为地: ['坤', '坤'], 地雷复: ['坤', '震'], 地泽临: ['坤', '兑'], 地天泰: ['坤', '乾'],
    雷天大壮: ['震', '乾'], 泽天夬: ['兑', '乾'], 水天需: ['坎', '乾'], 水地比: ['坎', '坤'],
    兑为泽: ['兑', '兑'], 泽水困: ['兑', '坎'], 泽地萃: ['兑', '坤'], 泽山咸: ['兑', '艮'],
    水山蹇: ['坎', '艮'], 地山谦: ['坤', '艮'], 雷山小过: ['震', '艮'], 雷泽归妹: ['震', '兑'],
  };
  const TRI_ELEM = { 乾: '金', 兑: '金', 离: '火', 震: '木', 巽: '木', 坎: '水', 艮: '土', 坤: '土' };
  const TRI_EL = (t) => (TRI_ELEM[t] ? ` ${TRI_ELEM[t]}` : '');
  const TRI_OF = (name) => HEX_TABLE[name] || null; // [下卦, 上卦]

  pp.daliurenHTML = function (r) {
    const sc = r.sanChuan;
    const cbox = (c, k) => `<div class="dl-sc-c">
      <div class="dl-sc-k">${k}</div>
      <div class="dl-sc-z">${c.zhi}</div>
      <div class="dl-sc-j">${c.jiangFull || c.jiang}</div>
      <div class="dl-sc-l">${c.liuQin}${c.xunKong ? ' · 空' : ''}</div>
    </div>`;
    const ge = `<div class="dl-sc-c ge">
      <div class="dl-sc-k">格局</div>
      <div class="dl-sc-gn">${r.geJu.name}</div>
      <div class="dl-sc-l">${r.geJu.detail}</div>
    </div>`;
    const keCells = r.siKe.slice().map((x) => `<div class="dl-sk-c">
      <div class="dl-sk-k">${['一课', '二课', '三课', '四课'][x.position - 1] || x.position + '课'}</div>
      <div class="dl-sk-s">${x.shang}</div>
      <div class="dl-sk-x">${x.xia}</div>
      <div class="dl-sk-r">${x.relation} · ${x.jiangFull || x.jiang}</div>
    </div>`).join('');
    const cells = r.pan.map((p) => {
      const pos = POS[p.di] || [1, 1];
      return `<div class="dl-pc" style="grid-row:${pos[0]};grid-column:${pos[1]}">
        <div class="tz">${p.tian}</div>
        <div class="dz">地盘 ${p.di}</div>
        <div class="jz">${p.jiangFull}</div>
      </div>`;
    }).join('');
    const center = `<div class="dl-c">
      <div class="t1">${r.dayGanZhi}日　${r.hourZhi}时</div>
      <div class="t2">${r.dayNight}贵 · 月将 ${r.yueJiang.name}${r.yueJiang.zhi} · 贵人${r.guiren.reverse ? '逆' : '顺'}行</div>
      <div class="t3">${sc.chu.zhi} → ${sc.zhong.zhi} → ${sc.mo.zhi}</div>
      <div class="t2">节气 ${r.jieqi.name}${r.jieqi.time ? ' ' + r.jieqi.time : ''}</div>
    </div>`;
    return `<div class="pp dl">
      <div class="dl-head">日 ${r.dayGanZhi}　时 ${r.hourZhi}（${r.dayNight}贵）　月将 ${r.yueJiang.name}${r.yueJiang.zhi}　节气 ${r.jieqi.name}　贵人${r.guiren.reverse ? '逆' : '顺'}行</div>
      <div class="dl-sc">${cbox(sc.chu, '初传')}${cbox(sc.zhong, '中传')}${cbox(sc.mo, '末传')}${ge}</div>
      <div class="dl-sk">${keCells}</div>
      <div class="dl-pan2">${cells}${center}</div>
      <div class="dl-legend"><span>大字＝天盘支</span><span>小字＝地盘（固定十二支）</span><span>右下＝天将</span></div>
    </div>`;
  };

  pp.tarotHTML = function (r) {
    const cards = r.cards.map((c) => `
      <div class="tt-card ${c.upright ? 'up' : 'rev'}">
        <div class="tt-pos" title="${esc(c.positionHint || '')}">${c.position}</div>
        <div class="tt-name">${c.name}${c.number ? `<span class="tt-no">${c.number}</span>` : ''}</div>
        <div class="tt-ori">${c.orientation}</div>
        ${c.core ? `<div class="tt-core">${c.core}</div>` : ''}
        <div class="tt-kw">${c.keywords.map((k) => `<span>${k}</span>`).join('')}</div>
        <div class="tt-el">${c.arcana} · ${c.element}${c.suit ? ' · ' + c.suit + (c.rankCn ? c.rankCn : '') : ''}${c.domain ? ' · ' + c.domain : ''}</div>
      </div>`).join('');
    const reading = (r.reading || []).map((p) => `<p>${p}</p>`).join('');
    return `<div class="pp tt">
      <div class="tt-q"><b>所问</b>${r.question ? r.question : '<span class="pp-dim">（未填写，可在上方输入后重抽）</span>'}</div>
      <div class="tt-head">${r.spread}${r.castAt ? `　·　抽牌于 ${r.castAt}` : ''}</div>
      <div class="tt-grid">${cards}</div>
      <div class="tt-read"><div class="tt-rt">牌面解读</div>${reading}</div>
      <div class="tt-note"><div class="tt-rt">你的记录</div>
        <textarea class="tt-ta" rows="4" placeholder="写下判断或对照后的想法……（仅本页可见，不保存）"></textarea>
      </div>
      ${r.systemNote ? `<div class="tt-tip">${r.systemNote}</div>` : ''}
      <div class="tt-tip">塔罗用于自我觉察与娱乐，不作确定性预言。</div>
    </div>`;
  };

  pp.baziHTML = function (r) {
    const cols = [['year', '年柱'], ['month', '月柱'], ['day', '日柱'], ['hour', '时柱']];
    const SHORT = { year: '年', month: '月', day: '日', hour: '时' };
    const ELC = { 木: 'wood', 火: 'fire', 土: 'earth', 金: 'metal', 水: 'water' };
    const el = (e) => `<span class="wx-${ELC[e] || 'earth'}">${e}</span>`;
    // 神煞：悬停显示「类别·查法来源查目标｜查法口诀」
    const ssTag = (x) => `<span class="s ${x.luck || 'neutral'}" title="${esc(`${x.cat} · ${x.via}查${x.target} ｜ ${x.rule}`)}">${x.name}</span>`;
    // data-c：竖屏 2×2 重排时每格左上角标注柱名（桌面端不显示）
    const line = (label, fn) => `<tr><td class="lbl">${label}</td>${cols.map(([k]) => `<td data-c="${SHORT[k]}">${fn(r.pillars[k], k)}</td>`).join('')}</tr>`;
    const head = `<thead><tr><th></th>${cols.map(([, n]) => `<th>${n}</th>`).join('')}</tr></thead>`;
    const rows = [
      line('十神', (p, k) => `<span class="${k === 'day' ? 'zhuri' : 'pp-dim'}">${k === 'day' ? (r.input.gender === 'male' ? '元男' : '元女') : (p.stemTenGod || '—')}</span>`),
      line('天干', (p) => `<span class="big ${'wx-' + ELC[p.stemElement]}">${p.stem}</span>`),
      line('地支', (p) => `<span class="big ${'wx-' + ELC[p.branchElement]}">${p.branch}</span>`),
      line('藏干', (p) => p.hidden.map((x) => `<span class="wx-${ELC[x.element]}">${x.stem}${x.element}</span>`).join(' ')),
      line('支神', (p) => p.hidden.map((x) => `<span class="pp-dim">${x.tenGod}</span>`).join('<br>')),
      line('纳音', (p) => p.nayin),
      line('空亡', (p) => `<span class="pp-dim">${p.kongwang.join('')}</span>`),
      line('地势', (p) => p.dishi),
      line('自坐', (p) => p.zizuo),
      line('神煞', (p) => (p.shenshaDetail && p.shenshaDetail.length
        ? `<span class="pp-ss">${p.shenshaDetail.map(ssTag).join('')}</span>`
        : '<span class="pp-dim">—</span>')),
    ].join('');
    const wx = Object.entries(r.wuxing).map(([k, v]) => `<span class="pp-chip wx-${ELC[k]}">${k} ${v}</span>`).join('');

    // 格局 / 用神 / 十神
    const fr = r.frame || {};
    const tierCls = (t) => (t === '大吉' || t === '吉' ? 'ok' : t === '大忌' || t === '忌' ? 'warn' : '');
    const sect = (title, body) => (body ? `<div class="pp-sec"><div class="pp-sec-h">${title}</div>${body}</div>` : '');
    const gj = fr.geju && fr.geju.length ? `
      <div class="pp-tl">${fr.primary ? `主格 <b>${esc(fr.primary.name)}</b>　${esc(fr.primary.evidence)}` : ''}</div>
      <div class="pp-chips">${fr.geju.map((g) => `<span class="pp-chip" title="${esc(g.evidence)}">${esc(g.name)}<i class="pp-drel">${esc(g.kind)}</i></span>`).join('')}</div>` : '';
    const ys = fr.yongshen ? `
      <div class="pp-tl">喜 ${fr.yongshen.favor.map(el).join('')}　忌 ${fr.yongshen.avoid.map(el).join('')}　<span class="pp-dim">${esc(fr.yongshen.method)}</span></div>
      <div class="pp-chips">${fr.yongshen.favorTenGods.map((t) => `<span class="pp-chip ok">${esc(t)}</span>`).join('')}${fr.yongshen.avoidTenGods ? fr.yongshen.avoidTenGods.map((t) => `<span class="pp-chip warn">${esc(t)}</span>`).join('') : ''}</div>
      <div class="pp-tl pp-dim">${esc(fr.yongshen.detail)}</div>` : '';
    const gods = fr.godStats ? `<div class="pp-chips">${Object.entries(fr.godStats.groups).map(([k, v]) => `<span class="pp-chip">${k} ${v}</span>`).join('')}</div>` : '';

    // 行运
    const dy = r.dayun.list.map((d) => {
      const lk = d.luck || null;
      return `<span class="pp-chip ${lk ? tierCls(lk.tier) : ''}" title="${esc(lk ? `${lk.tier} ${lk.score}｜${(lk.reasons || []).join('；')}` : '')}">${d.startAge} ${d.ganzhi}${(d.relations && d.relations.length) ? ` <i class="pp-drel">${d.relations.join('')}</i>` : ''}${lk ? ` ${lk.tier}` : ''}</span>`;
    }).join('');
    const ln = (r.liunian && r.liunian.length) ? `<div class="pp-chips">${r.liunian.slice(0, 8).map((l) => {
      const lk = l.luck || null;
      return `<span class="pp-chip ${lk ? tierCls(lk.tier) : ''}" title="${esc(lk ? `${lk.tier} ${lk.score}｜${(lk.reasons || []).join('；')}` : '')}">${l.year} ${l.ganzhi}${lk ? ` ${lk.tier}` : ''}</span>`;
    }).join('')}</div>` : '';
    const str = r.strength ? `<div class="pp-str">日主强弱：<b>${r.strength.level}</b>${r.strength.score}　<span class="pp-dim">${r.strength.detail}</span></div>` : '';
    const ssGroups = (r.shensha && r.shensha.groups) || [];
    const ssx = ssGroups.length ? `
      <div class="pp-ssx">
        <div class="h"><b>神煞全览</b><span>共 ${r.shensha.count} 见 · ${ssGroups.length} 类 · 悬停看查法</span></div>
        ${ssGroups.map((g) => `<div class="pp-ssg"><span class="gt">${g.cat}</span><span class="gi">${g.items.map((i) => `<span class="pp-ssi ${i.luck || 'neutral'}" title="${esc(`${i.via}查${i.target} ｜ ${i.rule}`)}">${i.name}<em>${i.pillars.map((k) => SHORT[k] || '').join('')}</em></span>`).join('')}</span></div>`).join('')}
        <div class="h" style="border-top:none;padding-top:4px;margin-top:4px">神煞只作参考，吉凶仍须看格局、旺衰与行运。</div>
      </div>` : '';
    return `<div class="pp" style="padding:12px">
      <table class="pp-bz">${head}<tbody>${rows}</tbody></table>
      <div class="pp-rel"><div><b>天干</b>${(r.relations && r.relations.stems.length) ? r.relations.stems.join(' · ') : '—'}</div>
      <div><b>地支</b>${(r.relations && r.relations.branches.length) ? r.relations.branches.join(' · ') : '—'}</div></div>
      ${str}
      ${sect('格局', gj)}
      ${sect('用神', ys)}
      ${sect('五行与十神', `<div class="pp-chips">${wx}</div>${gods}`)}
      ${sect('大运', `<div class="pp-chips">${dy}</div>`)}
      ${ln ? sect('流年', ln) : ''}
      ${ssx}
      <div style="margin-top:8px;font-size:12px;color:#6f6a60">上一节 ${r.jieqi.previous.name} ${r.jieqi.previous.time}　下一节 ${r.jieqi.next.name} ${r.jieqi.next.time}　${r.dayun.rule}，${r.dayun.startAge.years}岁起运</div>
    </div>`;
  };

  // ── 解析与详解：把 interpret() 的结构化结果渲染成卡片 ──
  const MT_LABEL = { natal: '命盘解析', divination: '卦象解析', card: '牌阵解析' };

  pp.interpretHTML = function (it) {
    if (!it || !it.dimensions || !it.dimensions.length) return '';
    const dims = it.dimensions.map((d, i) => `<div class="it-dim">
      <div class="it-dh"><span class="it-dno">${i + 1}</span><span class="it-dlabel">${esc(d.label)}</span></div>
      <div class="it-dtext">${esc(d.text)}</div>
      ${d.advice ? `<div class="it-adv"><b>建议</b>${esc(d.advice)}</div>` : ''}
    </div>`).join('');
    const secs = (it.sections && it.sections.length)
      ? `<div class="it-secs">${it.sections.map((s) => `<div class="it-sec">
        <div class="it-sh">${esc(s.label)}</div>
        <div class="it-stext">${esc(s.text)}</div>
      </div>`).join('')}</div>`
      : '';
    const tags = [it.systemLabel, MT_LABEL[it.moduleType] || it.moduleType].filter(Boolean);
    return `<div class="it">
      <div class="it-head"><span class="it-title">解析与详解</span>${tags.map((t) => `<span class="it-tag">${esc(t)}</span>`).join('')}</div>
      ${it.lead ? `<div class="it-lead">${esc(it.lead)}</div>` : ''}
      <div class="it-body">${dims}</div>
      ${secs}
      <div class="it-dis">${esc(it.disclaimer)}</div>
    </div>`;
  };

  /** 结果 + 解析一并渲染 */
  pp.resultWithInterpret = function (html, it) {
    return (html || '') + pp.interpretHTML(it);
  };
})();
