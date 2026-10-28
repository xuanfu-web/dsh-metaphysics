// 共用渲染层：紫微/八字/六爻/梅花/六壬/塔罗 -> HTML 字符串。面板与独立页面共用同一份。
(function () {
  const CSS = `
.pp,.mp-it{--ink:#1b1b1b;--ink2:#3f3a33;--muted:#6f6a60;--label:#8a8378;--faint:#a9a296;
  --line:#c8c1b2;--dimline:#b9b2a4;--hair:#e9e2d3;
  /* 底色略沉作「桌面」，--card 跳到近白：原先 bg 与 card 只差 1/255，卡片感等于零。
     同一色相里塞 9 个几乎相等的浅色，谁都浮不起来。 */
  --bg:#f6f1e6;--card:#fffdf8;--band:#fbf7ee;--hover:#f3ede1;--hover2:#ece5d6;
  --tri:#f3e8cd;--soul:#fae4dc;--sel:#fceee7;--link:#f9ece0;
  --red:#b3261e;--red-rgb:179,38,30;--lu:#1f6f3f;--lu-rgb:31,111,63;
  --quan:#8a5a00;--quan-rgb:138,90,0;--ke:#1f4e79;--ke-rgb:31,78,121;--ji:#b3261e;
  --br-good:#4c7a5c;--br-bad:#9c5b56;--on-accent:#fff;--wx-metal:#8a6b1f;
  --tg-bi:#4a6f8a;--tg-shi:#4c7a5c;--tg-cai:#8a6b1f;--tg-guan:#9c5b56;--tg-yin:#6d5f83}
/* 变量与 .mp-it 共享 —— 「解析与详解」是 .pp 的兄弟节点、不在 .pp 内部，
   变量只挂在 .pp 上时它拿不到 --card/--muted/--red，头部底色会变透明、边框会退回黑色。 */
.pp{border:1px solid var(--line);background:var(--bg);color:var(--ink);font-family:"Songti SC","SimSun","Microsoft YaHei",serif;font-size:12.5px;line-height:1.55;
  container-type:inline-size}
/* 深色：只换变量，不动任何一条选择器。用 @media screen 限定，
   打印永远走浅色 —— 深色主题下直接打印会得到一整页耗墨的深底 PDF。 */
@media screen and (prefers-color-scheme:dark){
  .pp,.mp-it{--ink:#eae5d9;--ink2:#d5cfc2;--muted:#aca598;--label:#a49c8e;--faint:#928b7e;
    --line:#514a3e;--dimline:#5f5849;--hair:#2f2b23;
  /* 与浅色同理：底更沉、卡片更亮，让层级在深底上也能立起来 */
    --bg:#12110c;--card:#211f18;--band:#282419;--hover:#2e2a1f;--hover2:#383322;
    --tri:#332913;--soul:#3a231c;--sel:#43271f;--link:#33241c;
    --red:#f08569;--red-rgb:240,133,105;--lu:#74c795;--lu-rgb:116,199,149;
    --quan:#e2a95c;--quan-rgb:226,169,92;--ke:#86bcea;--ke-rgb:134,188,234;--ji:#f08569;
    --br-good:#79c79a;--br-bad:#e09a8c;--on-accent:#14130f;--wx-metal:#dcb273;
    --tg-bi:#93b7cf;--tg-shi:#8fbb9d;--tg-cai:#d3ae62;--tg-guan:#d98d84;--tg-yin:#b4a4d0}
}
.pp *{box-sizing:border-box}
.pp-grid{display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,minmax(150px,auto));gap:0;border:1px solid var(--line)}
.pp-cell{border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:7px 8px;display:flex;flex-direction:column;position:relative;min-height:150px;background:var(--bg)}
/* 右边框按「视觉列」去，不能按 nth-child：格子用 grid-column 绝对定位，DOM 顺序不等于列序 */
.pp-cell.pp-lastcol{border-right:none}
.pp-cell.pp-lastrow{border-bottom:none}
.pp-center{grid-column:2/4;grid-row:2/4;border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:16px 18px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;text-align:center;background:var(--bg)}
.pp-center .ct-t1{font-size:17px;font-weight:700;letter-spacing:.05em;margin-bottom:6px}
.pp-center .ct-t2{font-size:12.5px;color:var(--ink)}
.pp-center .ct-t3{font-size:14px;letter-spacing:.35em;margin:6px 0;font-weight:600}
.pp-center .ct-t4{font-size:12.5px;color:var(--muted)}
.pp-stars{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:0 6px;font-size:13px;line-height:1.6;min-height:36px}
.pp-st{white-space:nowrap}
.pp-st.main{font-weight:700}
.pp-st.good{color:var(--lu)}
.pp-st.bad{color:var(--ji)}
.pp-st.aux{color:var(--muted)}
.pp-m{display:inline-block;font-style:normal;font-size:12px;line-height:1;padding:0 2px;border-radius:2px;color:var(--on-accent);margin-left:1px;vertical-align:1px}
.pp-m.lu{background:var(--lu)}.pp-m.quan{background:var(--quan)}.pp-m.ke{background:var(--ke)}.pp-m.ji{background:var(--ji)}
/* 大限/流年四化：只留色框不填充，与生年四化的实心块区分 */
.pp-m.view{background:transparent;box-shadow:inset 0 0 0 1px currentColor}
.pp-m.view.lu{color:var(--lu)}.pp-m.view.quan{color:var(--quan)}.pp-m.view.ke{color:var(--ke)}.pp-m.view.ji{color:var(--ji)}
/* 庙旺得利平不陷：星名后的等级小字。刻意压低视觉权重（灰为主、陷才微红），
   避免与四化的实心彩色方块抢层次 */
.pp-b{font-style:normal;font-size:11.5px;margin-left:4px;color:var(--muted);letter-spacing:0;opacity:.9}
.pp-b.good{color:var(--br-good)}
.pp-b.mid{color:var(--muted)}
.pp-b.bad{color:var(--br-bad)}
.pp-ages{margin-top:2px;font-size:12px;color:var(--muted);letter-spacing:.02em}
.pp-foot{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;gap:4px;font-size:12px;color:var(--muted)}
.pp-foot .ft-l{display:flex;flex-direction:column;gap:0;line-height:1.5}
.pp-foot .ft-l .ft-dx{color:var(--ink)}
.pp-foot .ft-r{display:flex;flex-direction:column;align-items:flex-end;gap:0;line-height:1.5}
.pp-foot .ft-pn{color:var(--red);font-size:14px;font-weight:700}
.pp-soul{box-shadow:inset 0 0 0 2px rgba(var(--red-rgb),.35)}
/* 注意：身宫格用 .pp-shen，不能叫 .pp-body —— .pp-body 是视图容器的类（display:none），
   两者同名会让身宫那一格整格消失（0.9.0 之前一直如此，12 宫少 1 宫）。
   下面这条 .pp-body 的「身」角标是从那次改名里漏下来的残骸：
   .pp-body 是 static 定位的整块视图容器，::after 却是 absolute，
   结果每次排盘都会在文档左上角飘出一个孤立的灰色「身」方块。已删除。 */
.pp-shen::after{content:"身";position:absolute;top:4px;left:4px;font-size:12px;color:var(--on-accent);background:var(--muted);padding:0 3px;border-radius:2px;z-index:1}
.pp-legend{display:flex;gap:10px;align-items:center;justify-content:center;font-size:12px;color:var(--muted);margin-top:6px}
.pp-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;font-family:system-ui,sans-serif}
.pp-chip{font-size:12.5px;padding:3px 9px;border:1px solid var(--line);color:var(--muted);background:var(--bg)}
.pp-chip.ok{color:var(--lu);border-color:var(--lu)}
.pp-chip.warn{color:var(--quan);border-color:var(--quan)}
.pp-sec{margin-top:10px}
/* 流月/流日/流时：一层层往外推的三级时间盘 */
.pp-flow{margin-top:9px;border:1px solid var(--line);background:var(--card);font-family:system-ui,sans-serif}
.pp-flow .flow-row{display:grid;grid-template-columns:66px auto minmax(0,1fr);gap:0 10px;align-items:baseline;padding:6px 11px;border-top:1px solid var(--line);font-size:12.5px;line-height:1.6}
.pp-flow .flow-row:first-child{border-top:none;background:var(--band);font-size:12px;color:var(--muted)}
.pp-flow .flow-row b{color:var(--red);font-weight:600;letter-spacing:.04em;white-space:nowrap}
.pp-flow .flow-row .flow-p{color:var(--ink)}
.pp-flow .flow-row .flow-p .flow-k{white-space:nowrap}
.pp-flow .flow-row .flow-m{color:var(--muted);min-width:0}
.pp-flow .flow-row .flow-m i{font-style:normal;margin-right:6px;white-space:nowrap}
.pp-flow .flow-row .flow-m i em{font-style:normal;color:var(--faint);margin-left:2px}
.pp-flow .flow-row .flow-m i.flow-dim{color:var(--faint)}
.pp-flow .flow-row .flow-p em.flow-same{font-style:normal;color:var(--faint);font-size:11.5px;margin-left:5px}
.pp-sec-h{font-size:12.5px;letter-spacing:.08em;color:var(--label);font-weight:700;margin-bottom:2px}
.pp-tl{font-size:12.5px;color:var(--muted);line-height:1.75}
/* 四柱表：按命书版式排 —— 左侧一列窄行名，年/月/日/时四柱固定并排在右，
   不打竖线、只用极淡横线分隔。四柱必须始终并排：2×2 折行后就没法一眼横扫四柱对照了。 */
.pp-bz{width:100%;max-width:860px;margin:0 auto;border-collapse:collapse;font-size:13px;font-family:system-ui,sans-serif;table-layout:fixed}
.pp-bz th,.pp-bz td{padding:5px 2px;text-align:center;vertical-align:middle;border:none}
.pp-bz th{border-bottom:1px solid var(--line);color:var(--muted);font-weight:600;font-size:12.5px;letter-spacing:.06em}
.pp-bz th.bz-hdr-day{color:var(--red)}
.pp-bz tr+tr td{border-top:1px solid var(--hair)}
.pp-bz th:first-child,.pp-bz td.bz-lbl{width:46px}
.pp-bz td.bz-lbl{text-align:left;padding-left:3px;color:var(--muted);font-size:11.5px;line-height:1.4;white-space:nowrap}
.pp-bz .bz-big{font-size:26px;font-weight:600;line-height:1.2}
.pp-bz .bz-cg{display:block;font-style:normal;font-size:11.5px;line-height:1.55}
.pp-bz td.bz-wxs{text-align:center;font-size:12px;line-height:1.9}
.pp-bz td.bz-wxs i{display:inline-block;font-style:normal;margin:0 9px;white-space:nowrap}
.pp-bz td.bz-wxs i b{font-weight:600}
.pp-bz td.bz-wxs i em{font-style:normal;margin-left:1px;font-size:11px;color:var(--muted)}
/* 十神按五类分组着色（比劫/食伤/财/官杀/印），低饱和，不抢干支五行的主色 */
.tg-bi{color:var(--tg-bi)}.tg-shi{color:var(--tg-shi)}.tg-cai{color:var(--tg-cai)}.tg-guan{color:var(--tg-guan)}.tg-yin{color:var(--tg-yin)}
.wx-wood{color:var(--lu)}.wx-fire{color:var(--red)}.wx-earth{color:var(--quan)}.wx-metal{color:var(--wx-metal)}.wx-water{color:var(--ke)}
.bz-zhuri{color:var(--red);font-weight:700}
.pp-rel{margin-top:10px;font-size:13px;line-height:1.9}
.pp-rel b{color:var(--muted);font-weight:400;margin-right:10px}
.pp-str{margin-top:10px;font-size:13px;line-height:1.8}
.pp-str b{color:var(--red);font-size:15px;margin:0 4px}
.pp-drel{font-style:normal;color:var(--red);font-size:12px}
.pp-dim{color:var(--muted)}
.pp-r{display:none}
.pp-modes{display:flex;align-items:center;border-bottom:1px solid var(--line);font-family:system-ui,sans-serif}
/* min-height:44px —— 视图切换是本盘唯一的主要控件，触摸目标必须够。
   原先 6px 上下内边距只有 31px 高，手机上是实打实的误触来源 */
.pp-modes label{min-height:44px;display:inline-flex;align-items:center;padding:3px 20px;font-size:12.5px;color:var(--muted);cursor:pointer;border-right:1px solid var(--line);user-select:none}
.pp-modes label:hover{background:var(--hover2)}
.pp-soon{margin-left:auto;padding-right:10px;font-size:12px;color:var(--faint)}
.pp-body{display:none}
#ppm-ben:checked~.pp-body.ben,#ppm-da:checked~.pp-body.da,#ppm-ln:checked~.pp-body.ln{display:block}
#ppm-ben:checked~.pp-modes label[for="ppm-ben"],#ppm-da:checked~.pp-modes label[for="ppm-da"],#ppm-ln:checked~.pp-modes label[for="ppm-ln"]{background:var(--red);color:var(--on-accent)}
.pp-tri{background:var(--tri)}
.pp-soul{background:var(--soul)}
.pp-zh{margin-left:4px;white-space:nowrap}
.pp-borrow{font-size:9.5px;color:var(--muted);margin-top:1px;letter-spacing:.02em}

/* —— 宫位点击展开详情 + 三方四正联动 ——
   宫格信息密度太高（尤其竖屏 10px），宫内必然有挤掉的东西。
   点开后把该宫的完整星曜、四化、十二神、三方四正摊平看。 */
.pp-cell{cursor:pointer;transition:background .14s ease,box-shadow .14s ease;outline:none}
.pp-cell:hover{background:var(--hover)}
.pp-cell.pp-sel{background:var(--sel);box-shadow:inset 0 0 0 2px rgba(var(--red-rgb),.5)}
/* 选中宫的财帛/官禄/迁移三宫：能一眼看出命宫牵着哪几宫 */
.pp-cell.pp-link{background:var(--link);box-shadow:inset 0 0 0 1.5px rgba(var(--red-rgb),.22)}
.pp-detail{display:none;border-top:1px solid var(--line);background:var(--card);padding:11px 14px 13px;font-family:system-ui,sans-serif}
.pp-detail.open{display:block}
.pp-detail .dt-dh{display:flex;align-items:center;flex-wrap:wrap;gap:4px 10px;padding-bottom:6px;margin-bottom:7px;border-bottom:1px dashed var(--line)}
.pp-detail .dt-dh b{font-size:15.5px;color:var(--red);letter-spacing:.04em}
.pp-detail .dt-dh span{font-size:12.5px;color:var(--muted)}
.pp-detail .dt-dh .dt-x{margin-left:auto;font-size:12.5px;color:var(--muted);border:none;background:none;text-decoration:underline;text-decoration-style:dotted;text-underline-offset:3px;min-height:44px;min-width:48px;display:inline-flex;align-items:center;justify-content:center;padding:0 10px;cursor:pointer;user-select:none}
.pp-detail .dt-dh .dt-x:hover{color:var(--red)}
/* 用 grid 而不是 flex：flex 下长值会把整块挤到下一行，标签与内容错行 */
.pp-detail .dt-dr{font-size:13px;line-height:1.85;display:grid;grid-template-columns:62px minmax(0,1fr);align-items:baseline;gap:0 8px}
.pp-detail .dt-dr .dt-k{color:var(--label);font-size:12px;letter-spacing:.06em}
.pp-detail .dt-dr .dt-v{min-width:0}
.pp-detail .dt-st{white-space:nowrap;margin-right:7px;display:inline-block}
.pp-detail .dt-st.main{font-weight:700}
.pp-detail .dt-st.good{color:var(--lu)}
.pp-detail .dt-st.bad{color:var(--ji)}
.pp-detail .dt-st.aux{color:var(--muted)}
.pp-detail .dt-st .dt-br{font-style:normal;font-size:11.5px;color:var(--muted);margin-left:3px}
.pp-detail .dt-st .dt-br.good{color:var(--br-good)}
.pp-detail .dt-st .dt-br.bad{color:var(--br-bad)}
.pp-detail .dt-tri{color:var(--muted)}
.pp-detail .dt-tri b{color:var(--ink);font-weight:600;margin-left:4px}
.pp-detail .dt-tri em{font-style:normal;color:var(--muted);font-size:12px;margin-left:5px}
.pp-detail .dt-tri em::before{content:"·";margin-right:3px}
.pp-detail .dt-empty{color:var(--faint);font-size:12.5px}
.pp-detail .hint{color:var(--faint);font-size:11.5px;margin-top:6px}
.pp-ss{display:flex;flex-wrap:wrap;gap:0 7px;font-size:12.5px;line-height:1.6}
.pp-bz .pp-ss{flex-direction:column;align-items:center;gap:0;font-size:11.5px;line-height:1.5}
.pp-ss .ss-s{white-space:nowrap;cursor:help}
.pp-ss .ss-s.good{color:var(--lu)}
.pp-ss .ss-s.bad{color:var(--ji)}
.pp-ss .ss-s.neutral{color:var(--quan)}
.pp-ssx{margin-top:10px;font-family:system-ui,sans-serif}
.pp-ssx .ssx-h{display:flex;align-items:baseline;gap:8px;font-size:12.5px;color:var(--muted);border-top:1px solid var(--line);padding-top:8px;margin-top:10px}
.pp-ssx .ssx-h b{color:var(--red);font-size:14px;font-weight:600}
.pp-ssg{display:flex;gap:8px;align-items:baseline;margin-top:5px;font-size:12.5px;line-height:1.7}
.pp-ssg .ssg-gt{flex:0 0 40px;color:var(--muted);font-size:12px;letter-spacing:.08em}
.pp-ssg .ssg-gi{display:flex;flex-wrap:wrap;gap:3px 6px}
.pp-ssi{white-space:nowrap;border:1px solid var(--line);padding:0 5px;cursor:help}
.pp-ssi.good{color:var(--lu);border-color:rgba(var(--lu-rgb),.35)}
.pp-ssi.bad{color:var(--ji);border-color:rgba(var(--red-rgb),.3)}
.pp-ssi.neutral{color:var(--quan);border-color:rgba(var(--quan-rgb),.3)}
.pp-ssi em{font-style:normal;font-size:12px;color:var(--muted);margin-left:2px}

/* —— 爻线：真线，阳为整条、阴为断开、动爻描红 —— */
/* 爻线改用内联 SVG：缩放不糊、阴爻两段的间隙按画布等比给出（原先靠 flex gap 百分比，
   字宽一变间隙就飘）。preserveAspectRatio:none 让宽高各自受 CSS 控制，
   圆角在窄屏被横向压扁的幅度只有半像素，肉眼不可见。 */
.mp-hex{display:block;width:104px;height:12px;flex:0 0 auto;color:var(--ink);overflow:visible}
.mp-hex.hex-on{color:var(--red)}
.mp-hex.dim{color:var(--dimline)}
.mp-hex.sm{width:74px;height:9px}
.mp-hex.md{width:88px;height:10px}
/* 动爻标记：老阳 ○ / 老阴 ×，与爻线同格右侧。非动爻留空位，保证六列对齐不抖 */
.mp-hy-ln{display:flex;align-items:center;gap:4px;min-width:0}
.mp-hy-mv{flex:0 0 10px;font-style:normal;font-size:11px;line-height:1;color:var(--red);text-align:center}
/* 五行符号：12×12 描边图标，取 currentColor，跟着 --wx-* 自动上色 */
.mp-wxi{display:inline-block;width:12px;height:12px;vertical-align:-2px;margin-right:3px;flex:0 0 auto}
/* 八卦小象：14×10 三爻，用于上下卦标题 */
.mp-trig{display:inline-block;width:14px;height:10px;vertical-align:-1px;margin-right:4px;color:currentColor}

/* —— 六爻 —— */
.mp-hy-wrap{display:flex;gap:22px;flex-wrap:wrap;align-items:flex-start}
.mp-hy-box{border:1px solid var(--line);background:var(--card);padding:12px 16px 14px;min-width:250px}
.mp-hy-h{display:flex;align-items:baseline;gap:8px;margin-bottom:10px;font-family:system-ui,sans-serif}
.mp-hy-h b{color:var(--red);font-size:14px}
.mp-hy-h span{color:var(--muted);font-size:12px}
.mp-hy{display:flex;flex-direction:column;gap:6px}
.mp-hy-row{display:grid;grid-template-columns:18px 30px 128px 60px 54px 40px;gap:8px;align-items:center;font-size:13px;font-family:system-ui,sans-serif;padding:1px 0}
.mp-hy-sy{color:var(--red);font-size:12px;font-weight:700}
.mp-hy-nm{color:var(--muted);font-size:12px}
.mp-hy-gz{letter-spacing:.04em}
.mp-hy-lq{color:var(--ink2)}
.mp-hy-ls{color:var(--muted);font-size:12px}
.mp-hy-dn{color:var(--red);font-size:12px;font-family:system-ui,sans-serif}
.mp-hy-void{color:var(--faint)}
.mp-hy-row.hy-plain{grid-template-columns:34px 112px;gap:9px;padding:0}
.mp-mh-mini{display:flex;flex-direction:column;gap:4px}

/* —— 梅花 —— */
.mp-mh{padding:16px}
.mp-mh-head{font-size:13px;color:var(--muted);margin-bottom:12px}
.mp-mh-main{display:flex;gap:18px;flex-wrap:wrap;align-items:flex-start}
.mp-hexbox{border:1px solid var(--line);background:var(--card);padding:12px 15px 13px}
.mp-hexbox.hb-mini{min-width:118px}
.mp-hexbox .hb-h{display:flex;justify-content:space-between;gap:10px;font-size:12px;letter-spacing:.14em;color:var(--muted);font-family:system-ui,sans-serif;margin-bottom:5px}
.mp-hexbox .hb-n{font-size:17px;font-weight:700;color:var(--red);margin-bottom:8px;letter-spacing:.04em}
.mp-hexbox.hb-mini .n{font-size:15px;margin-bottom:6px}
.mp-hexbox .hb-s{font-size:12px;color:var(--muted);margin-top:8px;font-family:system-ui,sans-serif}
.mp-trib{display:flex;flex-direction:column;gap:4px}
.mp-trib+.mp-trib{margin-top:8px;padding-top:8px;border-top:1px dotted var(--line)}
.mp-trib-h{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--muted);font-family:system-ui,sans-serif;margin-bottom:3px}
.mp-tritag{font-size:12px;padding:0 4px;border:1px solid var(--line);color:var(--muted);font-family:system-ui,sans-serif}
.mp-tritag.tritag-ti{color:var(--red);border-color:rgba(var(--red-rgb),.45);font-weight:700}
.mp-tritag.tritag-yong{color:var(--ke);border-color:rgba(var(--ke-rgb),.45)}
.mp-mh-rel{margin-top:12px;font-size:13.5px;font-family:system-ui,sans-serif;line-height:1.8}
.mp-mh-rel b{color:var(--muted);font-weight:400;margin-right:8px}
.mp-mh-rel .mh-lv{font-weight:700}
.mp-mh-rel .mh-lv.good{color:var(--lu)}
.mp-mh-rel .mh-lv.bad{color:var(--ji)}
.mp-mh-rel .mh-lv.flat{color:var(--quan)}

/* —— 大六壬 —— */
.mp-dl{padding:16px}
.mp-dl-head{font-size:13px;color:var(--muted);margin-bottom:12px;line-height:1.7}
.mp-dl-sc{display:flex;align-items:stretch;margin:0 0 12px;flex-wrap:wrap}
.mp-dl-sc-c{border:1px solid var(--line);background:var(--card);padding:10px 18px;min-width:110px;text-align:center}
.mp-dl-sc-c+.mp-dl-sc-c{border-left:none}
.mp-dl-sc-c.ge{border-left:1px solid var(--line);background:var(--band)}
.mp-dl-sc-k{font-size:12px;letter-spacing:.16em;color:var(--muted);font-family:system-ui,sans-serif}
.mp-dl-sc-z{font-size:24px;font-weight:700;color:var(--red);line-height:1.2}
.mp-dl-sc-j{font-size:12px}
.mp-dl-sc-l{font-size:12px;color:var(--muted);font-family:system-ui,sans-serif}
.mp-dl-sc-gn{font-size:16px;font-weight:700;margin-top:1px}
.mp-dl-sk{display:flex;justify-content:center;margin-bottom:12px;flex-wrap:wrap}
.mp-dl-sk-c{border:1px solid var(--line);background:var(--card);padding:8px 14px 9px;text-align:center;min-width:82px}
.mp-dl-sk-c+.mp-dl-sk-c{border-left:none}
.mp-dl-sk-k{font-size:12px;color:var(--muted);letter-spacing:.1em;font-family:system-ui,sans-serif}
.mp-dl-sk-s{font-size:17px;font-weight:700;color:var(--red);line-height:1.3}
.mp-dl-sk-x{font-size:14.5px;color:var(--muted);line-height:1.3}
.mp-dl-sk-r{font-size:12px;color:var(--muted);font-family:system-ui,sans-serif}
.mp-qm{padding:14px}
.mp-qm-head{display:flex;flex-direction:column;gap:3px;font-size:12px;color:var(--muted);margin-bottom:12px}
.mp-qm-head b{font-size:17px;color:var(--red)}
.mp-qm-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;border:1px solid var(--line);padding:4px;background:var(--bg)}
.pp-qm-cell{border:1px solid var(--line);padding:6px 8px;min-height:74px;display:flex;flex-direction:column;justify-content:space-between;background:var(--bg)}
.pp-qm-cell.center{align-items:center;justify-content:center;text-align:center;background:var(--band)}
.pp-qm-top,.pp-qm-bot{display:flex;justify-content:space-between;font-size:10px;color:var(--muted)}
.pp-qm-mid{display:flex;justify-content:space-between;align-items:baseline}
.pp-qm-mid .tp,.pp-qm-mid .dp{font-size:15px;font-weight:700;color:var(--ink)}
.pp-qm-mid .star,.pp-qm-mid .gate{font-size:12px;color:var(--ink2)}
.pp-qm-top .god{color:var(--red);font-weight:600}
.pp-qm-top .mk{color:var(--ji);font-weight:600}
.pp-qm-ju{font-size:14px;font-weight:700;color:var(--red);margin-bottom:4px}
.pp-qm-kv{font-size:11.5px;color:var(--ink)}
.pp-qm-kv.dim{color:var(--muted)}
.mp-qm-legend,.mp-qm-rules{margin-top:10px;font-size:11px;color:var(--muted);line-height:1.7}
.mp-qm-rules p{margin:2px 0}.mp-hp{padding:14px}
.mp-hp-head{display:flex;align-items:baseline;gap:10px;margin-bottom:12px}
.mp-hp-head b{font-size:19px;color:var(--red)}
.mp-hp-head span{font-size:12px;color:var(--muted)}
.mp-hp-sides{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px}
.mp-hp-side{border:1px solid var(--line);background:var(--bg);padding:10px 12px}
.mp-hp-who{font-size:10px;letter-spacing:.14em;color:var(--muted);margin-bottom:4px}
.mp-hp-gz{font-size:15px;font-weight:700;color:var(--red);letter-spacing:.04em;margin-bottom:6px}
.mp-hp-kv{display:flex;justify-content:space-between;font-size:12px;line-height:1.7}
.mp-hp-kv span{color:var(--muted)}
.mp-hp-dims{display:flex;flex-direction:column;gap:8px}
.mp-hp-dim{border-top:1px solid var(--line);padding-top:8px}
.mp-hp-dimh{display:flex;justify-content:space-between;align-items:baseline;font-size:13px;font-weight:600}
.mp-hp-dimh b{font-size:12px;color:var(--muted)}
.mp-hp-dimh b.good{color:var(--lu)}
.mp-hp-dimh b.bad{color:var(--ji)}
.mp-hp-dimt{font-size:12px;line-height:1.8;margin-top:3px;color:var(--ink)}
.mp-hp-inter{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}
.mp-hp-ith{font-size:11px;color:var(--muted);margin-bottom:4px;letter-spacing:.06em}
.mp-hp-inter ul{margin:0;padding-left:14px;font-size:11.5px;line-height:1.8}
.mp-hp-inter li{margin-bottom:2px}
.mp-hp-inter li b{display:inline-block;min-width:14px;text-align:center;border-radius:2px;margin-right:4px;color:var(--on-accent);font-size:10px}
.mp-hp-inter li b.m-禄{background:var(--lu)}
.mp-hp-inter li b.m-权{background:var(--quan)}
.mp-hp-inter li b.m-科{background:var(--ke)}
.mp-hp-inter li b.m-忌{background:var(--ji)}
.mp-hp-inter li i{font-style:normal;color:var(--red);font-size:10px;margin-left:3px}.mp-hp-notes{margin-top:12px;font-size:11px;color:var(--muted);line-height:1.7}
.mp-hp-notes p{margin:2px 0}.mp-dl-ss{margin-top:10px;display:flex;gap:10px;flex-wrap:wrap;align-items:baseline;font-size:12px}
.mp-dl-ss b{font-weight:600;color:var(--muted);font-size:11px;letter-spacing:.1em}
.mp-dl-ss span{color:var(--ink);cursor:help}
.mp-dl-ss i{font-style:normal;color:var(--red);margin-left:2px;font-weight:600}.mp-dl-pan2{display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,minmax(84px,auto));border:1px solid var(--line);background:var(--bg)}
.mp-dl-pc{border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:7px 9px;display:flex;flex-direction:column;gap:0}
.mp-dl-pc .tz{font-size:21px;font-weight:700;color:var(--red);line-height:1.2}
.mp-dl-pc .dz{font-size:12px;color:var(--muted);font-family:system-ui,sans-serif}
.mp-dl-pc .jz{font-size:12px;color:var(--quan);margin-top:auto;font-family:system-ui,sans-serif}
.mp-dl-c{grid-column:2/4;grid-row:2/4;border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:14px;display:flex;flex-direction:column;gap:4px;align-items:center;justify-content:center;text-align:center;background:var(--bg)}
.mp-dl-c .dl-t1{font-size:16px;font-weight:700;letter-spacing:.06em}
.mp-dl-c .dl-t2{font-size:12px;color:var(--muted);font-family:system-ui,sans-serif}
.mp-dl-c .dl-t3{font-size:12.5px;letter-spacing:.2em;margin-top:3px}
.mp-dl-legend{display:flex;gap:12px;justify-content:center;font-size:12px;color:var(--muted);font-family:system-ui,sans-serif;margin-top:6px}

/* —— 塔罗 —— */
/* ── 人生运势曲线 ──
   大运是阶梯（每步十年），流年是折线；两条叠在一张图上，
   一眼看出「哪段高、哪段低、现在在哪」——这类图是命理产品里最容易被截图传播的一张。
   纯内联 SVG，零依赖；颜色全部走 CSS 变量，深浅色自动跟随。 */
.mp-curve{margin-top:8px;border:1px solid var(--line);border-radius:8px;background:var(--card);padding:10px 12px 8px}
.mp-curve-h{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;font-size:12px;color:var(--label);font-family:system-ui,sans-serif;margin-bottom:4px}
.mp-curve-h b{font-size:12.5px;color:var(--ink);font-weight:600}
.mp-curve-h span{font-size:11.5px;color:var(--muted)}
.mp-curve svg{display:block;width:100%;height:auto;overflow:visible}
/* 档位色带：五个档各一条横向参考区，落在带内即该档 */
.mp-curve .cv-band{opacity:.09}
.mp-curve .cv-band.b-good{fill:var(--lu)}
.mp-curve .cv-band.b-bad{fill:var(--red)}
.mp-curve .cv-band.b-flat{fill:var(--muted)}
.mp-curve .cv-ax{stroke:var(--dimline);stroke-width:.6}
.mp-curve .cv-ax.zero{stroke:var(--line);stroke-width:.9}
.mp-curve .cv-lbl{fill:var(--muted);font-size:8px;font-family:system-ui,sans-serif}
.mp-curve .cv-lbl.age{font-size:8.5px}
.mp-curve .cv-dy{fill:none;stroke:var(--quan);stroke-width:1.6;stroke-linejoin:round}
.mp-curve .cv-dyfill{fill:var(--quan);opacity:.10}
.mp-curve .cv-ln{fill:none;stroke:var(--ke);stroke-width:1.4;stroke-linejoin:round;stroke-linecap:round}
.mp-curve .cv-dot{r:2}
.mp-curve .cv-dot.now{r:3.4;stroke:var(--card);stroke-width:1.2}
.mp-curve .cv-legend{display:flex;gap:12px;flex-wrap:wrap;margin-top:5px;font-size:11px;color:var(--muted);font-family:system-ui,sans-serif}
.mp-curve .cv-legend i{display:inline-block;width:14px;height:2px;vertical-align:3px;margin-right:4px}
.mp-curve .cv-tip{font-size:11px;color:var(--muted);line-height:1.6;margin-top:4px}
/* 窄屏：轴标签更稀，避免挤成一团 */
@media (max-width:520px){.mp-curve .cv-lbl.age{font-size:9px}}
/* ── 人生 K 线 ──
   逐年蜡烛图：实体＝该岁相对上一岁的涨跌，影线＝高低各 4 分的弹性。
   阳线暖色、阴线冷色；大运交界虚线 + 段名标在顶部；均线只作趋势参考。
   纯内联 SVG，零依赖，颜色全走变量，深浅色与打印都跟随。 */
.mp-kline{margin-top:10px;border:1px solid var(--line);border-radius:8px;background:var(--card);padding:10px 12px 9px}
.mp-kline-h{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;font-size:12px;color:var(--label);font-family:system-ui,sans-serif;margin-bottom:2px}
.mp-kline-h b{font-size:12.5px;color:var(--ink);font-weight:600}
.mp-kline-h span{font-size:11.5px;color:var(--muted)}
.mp-kline-fig svg{display:block;width:100%;height:auto;overflow:visible}
.mp-kline .kl-band{fill:var(--ink);opacity:.045}
.mp-kline .kl-grid{stroke:var(--line);stroke-width:.5;stroke-dasharray:1 4;opacity:.7}
.mp-kline .kl-grid.mid{stroke-width:.8;stroke-dasharray:3 3;opacity:.9}
.mp-kline .kl-segline{stroke:var(--dimline);stroke-width:.6;stroke-dasharray:2 3;opacity:.8}
.mp-kline .kl-seg{fill:var(--label);font-size:8.5px;font-family:system-ui,sans-serif;paint-order:stroke;stroke:var(--card);stroke-width:2.2px;stroke-linejoin:round}
.mp-kline .kl-lbl{fill:var(--muted);font-size:8px;font-family:system-ui,sans-serif}
.mp-kline .kl-lbl.age{font-size:8.5px}
.mp-kline .kl-lbl.axis{font-size:8px;letter-spacing:.02em;opacity:.85}
.mp-kline .kl-stripband{fill:var(--ink);opacity:.06;rx:2}
.mp-kline .kl-ma-lbl{font-size:8.5px;font-family:system-ui,sans-serif;paint-order:stroke;stroke:var(--card);stroke-width:2.4px;stroke-linejoin:round;fill:var(--muted)}
.mp-kline .kl-ma-lbl.m5{fill:var(--quan)}
.mp-kline .kl-ma-lbl.m10{fill:var(--ke);opacity:.9}
.mp-kline .kl-stats{display:flex;gap:14px;flex-wrap:wrap;margin-top:6px;font-size:11px;color:var(--muted);font-family:system-ui,sans-serif}
.mp-kline .kl-stats span{display:inline-flex;align-items:baseline;gap:5px}
.mp-kline .kl-stats em{font-style:normal;font-size:10.5px;color:var(--dim)}
.mp-kline .kl-stats b{font-size:12px;font-weight:600;color:var(--ink2);font-variant-numeric:tabular-nums}
.mp-kline .kl-stats b.hi{color:var(--ji)}
.mp-kline .kl-stats b.lo{color:var(--lu)}
.mp-kline .kl-c.up line{stroke:var(--ji);stroke-width:.8;opacity:.8}
.mp-kline .kl-c.up rect{fill:var(--ji);opacity:.92}
.mp-kline .kl-c.down line{stroke:var(--lu);stroke-width:.8;opacity:.8}
.mp-kline .kl-c.down rect{fill:var(--lu);opacity:.92}
.mp-kline .kl-c:hover rect{opacity:1}
.mp-kline .kl-ma{fill:none;stroke-linejoin:round;stroke-linecap:round}
.mp-kline .kl-ma.m5{stroke:var(--quan);stroke-width:1.3}
.mp-kline .kl-ma.m10{stroke:var(--ke);stroke-width:1;opacity:.85}
.mp-kline .kl-mark circle{fill:var(--quan)}
.mp-kline .kl-mark.lo circle{fill:var(--ke)}
.mp-kline .kl-mark .ring{fill:none;stroke:currentColor;stroke-width:.6;opacity:.5}
.mp-kline .kl-mark text{fill:var(--ink2);font-size:9px;font-family:system-ui,sans-serif;paint-order:stroke;stroke:var(--card);stroke-width:2.4px;stroke-linejoin:round}
.mp-kline .kl-legend{display:flex;gap:12px;flex-wrap:wrap;margin-top:6px;font-size:11px;color:var(--muted);font-family:system-ui,sans-serif}
.mp-kline .kl-legend i{display:inline-block;width:9px;height:9px;vertical-align:-1px;margin-right:4px;border-radius:1px}
.mp-kline .kl-legend i.up{background:var(--ji)}
.mp-kline .kl-legend i.down{background:var(--lu)}
.mp-kline .kl-legend i.m5{height:2px;background:var(--quan);vertical-align:3px}
.mp-kline .kl-legend i.m10{height:2px;background:var(--ke);vertical-align:3px}
.kl-segs{display:flex;flex-wrap:wrap;gap:4px 6px;margin-top:8px;font-family:system-ui,sans-serif}
.kl-chip{font-size:11px;color:var(--ink2);border:1px solid var(--hair);border-radius:99px;padding:1px 8px;background:var(--band)}
.kl-chip em{font-style:normal;color:var(--muted);margin-left:5px;font-size:10.5px}
.kl-hls{display:flex;flex-direction:column;gap:3px;margin-top:8px;font-size:11.5px;font-family:system-ui,sans-serif;color:var(--ink2)}
.kl-hl{border-left:2px solid var(--line);padding-left:7px;line-height:1.6}
.kl-hl.hi{border-color:var(--quan)}
.kl-hl.lo{border-color:var(--ke)}
.mp-kline-note{font-size:11px;color:var(--red);line-height:1.6;margin-top:6px}
.mp-kline-tip{font-size:11px;color:var(--muted);line-height:1.6;margin-top:5px}
@media print{.mp-kline{break-inside:avoid}}
.mp-tt{padding:16px}
.mp-tt-head{font-size:12.5px;color:var(--muted);margin-bottom:12px;letter-spacing:.04em}
.mp-tt-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(172px,1fr));gap:10px}
.mp-tt-card{border:1px solid var(--line);background:var(--card);padding:13px 14px;display:flex;flex-direction:column;gap:7px;min-height:168px}
.mp-tt-card.tt-rev{background:var(--band);border-style:dashed}
.mp-tt-pos{font-size:12px;color:var(--muted);letter-spacing:.14em}
.mp-tt-name{font-size:19px;font-weight:700;color:var(--red);letter-spacing:.04em}
.mp-tt-ori{font-size:12px;padding:1px 7px;border:1px solid var(--line);align-self:flex-start;color:var(--muted)}
.mp-tt-kw{display:flex;flex-wrap:wrap;gap:4px 8px;font-size:13px;line-height:1.7}
.mp-tt-kw span{border-bottom:1px dotted var(--line)}
.mp-tt-el{margin-top:auto;font-size:12px;color:var(--muted)}
.mp-tt-core{font-size:12.5px;color:var(--ink2);line-height:1.7;border-left:2px solid var(--line);padding-left:8px}
.mp-tt-no{font-size:12px;color:var(--muted);letter-spacing:.1em;margin-left:6px}
.mp-tt-tip{margin-top:12px;font-size:12px;color:var(--muted)}
.mp-tt-q{font-size:13px;margin-bottom:6px}
.mp-tt-q b{color:var(--muted);font-weight:400;margin-right:8px}
.mp-tt-read{margin-top:14px;border-top:1px solid var(--line);padding-top:10px}
.mp-tt-rt{font-size:12px;letter-spacing:.14em;color:var(--muted);margin-bottom:6px}
.mp-tt-read p{margin:0 0 5px;font-size:13px;line-height:1.85}
.mp-tt-note{margin-top:12px}
.mp-tt-ta{width:100%;border:1px solid var(--line);background:var(--card);color:var(--ink);padding:8px;font-size:13px;font-family:inherit;line-height:1.7;resize:vertical;outline:none}
.mp-tt-ta:focus{border-color:var(--red)}

/* —— 解析与详解 —— */
/* 变量由上面的 .pp,.mp-it 共享块提供。这里原先写过 --ink:var(--ink) 这类自引用声明，
   自引用会让变量变成 guaranteed-invalid，反而把继承值也挡掉了（--card 因此彻底失效）。 */
.mp-it{margin-top:14px;border:1px solid var(--line);background:var(--bg);color:var(--ink);
  font-family:"Songti SC","SimSun","Microsoft YaHei",serif;font-size:13px;line-height:1.75}
.mp-it *{box-sizing:border-box}
/* 标题栏即折叠开关：整栏可点，箭头旋转表示状态 */
.mp-it-head{display:flex;align-items:center;gap:9px;flex-wrap:wrap;width:100%;padding:12px 16px;border:none;border-bottom:1px solid var(--line);background:var(--card);color:inherit;font:inherit;font-family:inherit;text-align:left;cursor:pointer;-webkit-appearance:none;appearance:none}
.mp-it-head:hover{background:var(--band)}
.mp-it-arrow{flex:none;font-size:12px;line-height:1;color:var(--red);transition:transform .16s ease}
.mp-it.folded .mp-it-arrow{transform:rotate(-90deg)}
.mp-it.folded .mp-it-wrap{display:none}
.mp-it-hint{margin-left:auto;font-size:12px;color:var(--muted);font-family:system-ui,sans-serif}
.mp-it-title{font-size:15px;font-weight:700;letter-spacing:.08em;color:var(--red)}
.mp-it-tag{font-size:12px;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:1px 9px;font-family:system-ui,sans-serif}
/* 所问之事 + 询问方向的回显，放在引语上方，先让用户确认问的是什么 */
.mp-it-ask{padding:10px 16px;background:var(--band);border-bottom:1px dashed var(--line);font-size:13px;line-height:1.8;color:var(--ink2);font-family:system-ui,sans-serif}
.mp-it-ask .ask-q{font-weight:600;color:var(--ink)}
.mp-it-ask .ask-sep{color:var(--dimline);margin:0 7px}
.mp-it-ask .ask-d{color:var(--lu)}
.mp-it-ask .ask-none{color:var(--muted);font-weight:400}
/* 按询问方向提到最前的那一条 */
.mp-it-focus{margin-left:6px;font-size:12px;color:var(--lu);border:1px solid rgba(var(--lu-rgb),.35);border-radius:999px;padding:1px 9px;font-family:system-ui,sans-serif}
.mp-it-dim.focus{background:linear-gradient(90deg,rgba(var(--lu-rgb),.06),transparent 60%);border-left:2px solid var(--lu);padding-left:10px}
.mp-it-lead{padding:11px 16px;font-size:13px;color:var(--ink2);border-bottom:1px dashed var(--line)}
/* 白话四层：直答 / 说人话 / 每维一句话 / 追问 / 名词解释
   目的：先给结论再给依据，术语另设解释区，让「想问的人」不必先学会术语才能读懂 */
.mp-it-ans{margin:12px 16px 0;padding:12px 14px;border-left:3px solid var(--red);background:var(--band);font-size:13.5px;line-height:1.9;text-align:justify}
.mp-it-ans b{display:block;font-size:11px;letter-spacing:.12em;color:var(--red);font-family:system-ui,sans-serif;margin-bottom:5px;font-weight:600}
.mp-it-plain{margin:10px 16px 0;padding:11px 14px;border:1px dashed var(--line);border-radius:8px;font-size:13px;line-height:1.9;color:var(--ink2);text-align:justify}
.mp-it-plain b{color:var(--lu);font-weight:600;margin-right:6px}
.mp-it-dplain{margin-bottom:6px;font-size:12.5px;line-height:1.8;color:var(--lu)}
.mp-it-fu{margin:4px 16px 12px;padding:11px 14px;background:var(--band);border-radius:8px}
.mp-it-fu b{display:block;font-size:11px;letter-spacing:.12em;color:var(--label);font-family:system-ui,sans-serif;margin-bottom:6px;font-weight:600}
.mp-it-fu li{font-size:12.5px;line-height:1.85;margin-left:16px;color:var(--ink2)}
.mp-it-gloss{margin:0 16px 12px;font-size:12px;line-height:1.85;color:var(--muted)}
.mp-it-gloss summary{cursor:pointer;font-family:system-ui,sans-serif;letter-spacing:.06em;color:var(--label);margin-bottom:6px}
.mp-it-gloss span{color:var(--ink2);font-weight:600;margin-right:4px}
/* 解析生成失败：这属于"这段没出来"，不是断语，用警示色单独一行 */
.mp-it-err{margin:12px 16px;padding:9px 12px;border-left:2px solid var(--red);background:var(--soul);font-size:12.5px;line-height:1.8;color:var(--ink2)}
.mp-it-err b{color:var(--red);margin-right:6px}
.mp-it-body{padding:2px 16px 12px}
.mp-it-dim{padding:12px 0;border-bottom:1px dashed var(--line)}
.mp-it-dim:last-of-type{border-bottom:none}
.mp-it-dh{display:flex;align-items:center;gap:8px;margin-bottom:6px}
.mp-it-dno{flex:none;width:20px;height:20px;border-radius:50%;background:var(--red);color:var(--on-accent);font-size:12px;display:flex;align-items:center;justify-content:center;font-family:system-ui,sans-serif}
.mp-it-dlabel{font-size:14.5px;font-weight:700;letter-spacing:.04em}
.mp-it-dtext{font-size:13px;line-height:1.9;text-align:justify}
/* 依据：这条结论引用的盘面事实，弱化成灰字，不抢正文 */
.mp-it-dev{margin-top:7px;font-size:12px;line-height:1.75;color:var(--muted)}
.mp-it-dev b{color:var(--label);font-weight:600;margin-right:7px;font-family:system-ui,sans-serif;font-size:11px;letter-spacing:.1em}
.mp-it-adv{margin-top:8px;padding:9px 12px;background:var(--band);border-left:2px solid var(--red);font-size:13px;line-height:1.85}
/* 规则知识：讲「为什么这样断」并标可信度，视觉上比依据更轻，避免抢正文 */
.mp-it-know{margin-top:8px;display:flex;flex-direction:column;gap:6px}
.know-row{display:flex;gap:8px;align-items:flex-start;font-size:12px;line-height:1.8;color:var(--ink2)}
.know-status{flex:none;margin-top:2px;padding:1px 6px;border-radius:4px;font-size:10.5px;letter-spacing:.04em;font-family:system-ui,sans-serif;border:1px solid var(--line);color:var(--muted);white-space:nowrap}
/* 状态只用文字色区分，边框统一走 --line：主题测试禁止硬编码色值 */
.know-status.settled{color:var(--good)}
.know-status.variant{color:var(--warn)}
.know-status.todo{color:var(--red)}
.know-body b{display:block;font-size:12.5px;color:var(--ink);font-weight:600;margin-bottom:2px}
.know-body i{display:block;font-style:normal;color:var(--muted);font-size:11.5px;margin-top:2px}
.know-body em{display:block;font-style:normal;color:var(--warn);font-size:11.5px;margin-top:2px}
.mp-it-adv b{color:var(--red);font-weight:600;margin-right:7px;font-family:system-ui,sans-serif;font-size:12px;letter-spacing:.1em}
.mp-it-secs{border-top:1px solid var(--line);padding:12px 16px 2px;background:var(--card)}
.mp-it-sec{margin-bottom:11px}
.mp-it-sh{font-size:13px;font-weight:700;color:var(--lu);letter-spacing:.06em;margin-bottom:4px}
.mp-it-stext{font-size:13px;line-height:1.9;color:var(--ink2);text-align:justify}
/* 一页读懂：报告顶部五条结论 */
.mp-outline{margin:12px 16px 0;border:1px solid var(--line);border-left:3px solid var(--lu);border-radius:8px;background:var(--card);padding:10px 12px}
.mp-outline-h{font-size:12px;font-weight:700;letter-spacing:.12em;color:var(--lu);margin-bottom:6px;font-family:system-ui,sans-serif}
.mp-outline-row{display:grid;grid-template-columns:56px minmax(0,1fr);gap:8px;padding:3px 0;font-size:13px;line-height:1.7;color:var(--ink2)}
.mp-outline-row b{color:var(--label);font-weight:600;font-family:system-ui,sans-serif}
/* 目录：锚点跳转；打印时隐藏 */
.mp-toc{display:flex;flex-wrap:wrap;gap:6px 10px;margin:10px 16px 0;padding:8px 10px;border:1px dashed var(--line);border-radius:8px;font-size:12px;font-family:system-ui,sans-serif}
.mp-toc a{color:var(--lu);text-decoration:none;border-bottom:1px dotted rgba(var(--lu-rgb),.5)}
.mp-toc a:hover{color:var(--ink)}
/* 证据卡：依据收进 details，默认收起，避免长报告被事实淹没 */
.mp-it-ev{margin-top:7px;border:1px solid var(--line);border-radius:6px;background:var(--band);font-size:12px;font-family:system-ui,sans-serif}
.mp-it-ev>summary{cursor:pointer;padding:6px 9px;color:var(--muted);list-style:none}
.mp-it-ev>summary::-webkit-details-marker{display:none}
.mp-it-ev>summary::before{content:'▸ ';color:var(--label)}
.mp-it-ev[open]>summary::before{content:'▾ '}
.mp-it-ev-body{padding:2px 9px 8px;display:flex;flex-direction:column;gap:4px}
.mp-it-ev-item{color:var(--ink2);line-height:1.7;padding-left:12px;position:relative}
.mp-it-ev-item::before{content:'·';position:absolute;left:2px;color:var(--label)}
.mp-it-ev-tech{margin-top:4px;color:var(--label);font-size:11px;letter-spacing:.06em}
/* 置信度标签 */
.mp-it-conf{font-size:11px;font-family:system-ui,sans-serif;border-radius:999px;padding:1px 8px;margin-left:6px;border:1px solid var(--line);color:var(--muted)}
.mp-it-conf.c-强{color:var(--lu);border-color:rgba(var(--lu-rgb),.4)}
.mp-it-conf.c-中{color:var(--label);border-color:var(--line)}
.mp-it-conf.c-弱{color:var(--red);border-color:rgba(var(--red-rgb),.4)}
/* 三张表：横向可滚动，避免窄栏撑破 */
.mp-tables{border-top:1px solid var(--line);padding:12px 16px 4px;background:var(--card)}
.mp-table-wrap{margin-bottom:12px}
.mp-table-h{font-size:12px;font-weight:700;letter-spacing:.1em;color:var(--lu);margin-bottom:5px;font-family:system-ui,sans-serif}
.mp-table-scroll{overflow-x:auto;border:1px solid var(--line);border-radius:6px}
.mp-table{width:100%;border-collapse:collapse;font-size:12px;line-height:1.6;color:var(--ink2);font-family:system-ui,sans-serif}
.mp-table th,.mp-table td{padding:5px 9px;text-align:left;vertical-align:top;border-bottom:1px solid var(--line);white-space:nowrap}
.mp-table th{background:var(--band);color:var(--label);font-weight:600;font-size:11px;letter-spacing:.06em}
.mp-table tbody tr:last-child td{border-bottom:none}
.mp-table tbody tr:nth-child(even) td{background:rgba(0,0,0,.02)}
/* 打印：表格不撕页、目录隐藏、折叠的内容要展开 */
@media print{
  .mp-toc{display:none}
  .mp-it.folded .mp-it-wrap{display:block}
  .mp-table-scroll{overflow:visible}
  .mp-table th,.mp-table td{white-space:normal}
  .mp-table-wrap,.mp-it-sec,.mp-it-dim{break-inside:avoid}
  .mp-table-wrap{page-break-inside:avoid}
}
/* 追问结果 */
.mp-fu{margin:12px 16px;border:1px solid var(--line);border-left:3px solid var(--lu);border-radius:8px;background:var(--card);padding:10px 12px;font-size:13px;line-height:1.8;color:var(--ink2)}
.mp-fu.miss{border-left-color:var(--red)}
.mp-fu-h{font-size:12px;font-weight:700;letter-spacing:.08em;color:var(--lu);margin-bottom:4px;font-family:system-ui,sans-serif}
.mp-fu.miss .mp-fu-h{color:var(--red)}
.mp-fu-ev{margin-top:5px;font-size:12px;color:var(--muted);font-family:system-ui,sans-serif}
.mp-quick{margin:12px 16px;border:1px solid var(--line);border-radius:8px;background:var(--card);padding:12px 14px}
.mp-cg{margin:12px 16px;border:1px solid var(--line);border-radius:8px;background:var(--card);padding:12px 14px;font-family:system-ui,sans-serif}
.mp-cg-h{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;margin-bottom:9px}
.mp-cg-h b{font-size:13px;color:var(--ink);font-weight:600}
.mp-cg-h span{font-size:11.5px;color:var(--muted)}
.mp-cg-w{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;background:var(--line);border:1px solid var(--line);border-radius:6px;overflow:hidden}
.mp-cg .cg-cell{background:var(--card);padding:7px 9px}
.mp-cg .cg-cell em{display:block;font-style:normal;font-size:10.5px;color:var(--muted);margin-bottom:2px}
.mp-cg .cg-cell b{font-size:13.5px;color:var(--ink);font-weight:600;font-variant-numeric:tabular-nums}
.mp-cg-tot{display:flex;align-items:baseline;gap:8px;margin:10px 0 4px}
.mp-cg-tot em{font-style:normal;font-size:11px;color:var(--muted)}
.mp-cg-tot b{font-size:19px;color:var(--lu);font-weight:700;letter-spacing:.02em}
.mp-cg-tot i{font-style:normal;font-size:10.5px;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:1px 7px}
.mp-cg-song{margin-top:8px;padding:10px 12px;border-left:3px solid var(--quan);background:var(--band);border-radius:0 6px 6px 0}
.mp-cg-song-h{font-size:11px;color:var(--muted);margin-bottom:5px}
.mp-cg-verse{font-family:var(--kai,system-ui),serif;font-size:15px;line-height:2;color:var(--ink);letter-spacing:.03em}
.mp-cg-verse span{display:block}
.mp-cg-miss{color:var(--muted);font-size:12.5px}
.mp-cg-plain{margin-top:7px;font-size:12.5px;line-height:1.85;color:var(--ink2)}
.mp-cg-plain em,.mp-cg-band em{font-style:normal;font-size:10.5px;color:var(--muted);border:1px solid var(--line);border-radius:3px;padding:0 4px;margin-right:6px;vertical-align:1px}
.mp-cg-band{margin-top:8px;font-size:12.5px;line-height:1.8;color:var(--ink2)}
.mp-cg-note{margin-top:9px;padding-top:8px;border-top:1px dashed var(--line);font-size:11px;line-height:1.7;color:var(--muted)}
@media print{.mp-cg{break-inside:avoid}}
@media (max-width:640px){.mp-cg-w{grid-template-columns:repeat(2,minmax(0,1fr))}}
.mp-quick-h{font-size:13px;color:var(--lu);margin-bottom:6px;font-family:system-ui,sans-serif}
.mp-cli{margin:10px 0;padding:10px 12px;border:1px solid var(--line);border-radius:10px;background:var(--card)}
.mp-cli-h{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--ink)}
.mp-cli-h b{font-size:13px}
.mp-cli-k{font-weight:700;color:var(--lu)}
.mp-cli-p{margin-left:auto;font-size:11.5px;color:var(--quan);background:var(--bg);border:1px solid var(--line);border-radius:999px;padding:1px 8px}
.mp-cli-bar{position:relative;margin:9px 0 4px;height:8px;border-radius:999px;background:linear-gradient(90deg,var(--quan) 0%,var(--line) 50%,var(--ji) 100%)}
.mp-cli-bar i{position:absolute;top:-3px;width:14px;height:14px;margin-left:-7px;border-radius:50%;background:var(--card);border:2px solid var(--ink);box-shadow:0 0 0 2px var(--card)}
.mp-cli-axis{display:flex;justify-content:space-between;font-size:11px;color:var(--ink3);margin-bottom:8px}
.mp-cli-row{display:flex;flex-wrap:wrap;gap:6px 10px;align-items:center;font-size:12.5px;color:var(--ink2)}
.mp-cli-row em{font-style:normal;color:var(--ink3)}
.mp-cli-row b{color:var(--ink)}
.mp-cli-narr{margin-top:8px;font-size:13px;line-height:1.85;color:var(--ink2);border-left:2px solid var(--quan);padding-left:9px}
.mp-qt{margin-top:10px;padding-top:9px;border-top:1px dashed var(--line)}
.mp-qt-h{display:flex;gap:8px;align-items:baseline;font-size:12.5px}
.mp-qt-h b{color:var(--ink);letter-spacing:.02em}
.mp-qt-h span{color:var(--ink2)}
.mp-qt-y{display:flex;gap:6px;align-items:center;margin-top:6px;font-size:12.5px;color:var(--ink2);flex-wrap:wrap}
.mp-qt-y em{font-style:normal;color:var(--ink3)}
.mp-qt-y b{font-family:var(--fx);font-size:15px;color:var(--lu);font-weight:600;line-height:1.1}
.mp-qt-y b.first{color:var(--ji);border-bottom:2px solid var(--ji);padding-bottom:1px}
.mp-qt-q{margin-top:6px;font-size:12.5px;line-height:1.8;color:var(--ink2);font-family:var(--fx)}
.mp-qt-q span{display:block;font-size:11px;color:var(--ink3);font-family:var(--sans);margin-top:2px}
.mp-cl{margin-top:10px;padding-top:9px;border-top:1px dashed var(--line)}
.mp-cl-h{display:flex;gap:8px;align-items:baseline;font-size:12.5px;margin-bottom:6px}
.mp-cl-h b{color:var(--ink);letter-spacing:.02em}
.mp-cl-h span{color:var(--ink3);font-size:11.5px}
.mp-cl-e{padding:6px 0;border-top:1px dashed var(--hair)}
.mp-cl-e:first-of-type{border-top:0;padding-top:0}
.mp-cl-t b{font-family:var(--fx);font-size:13px;color:var(--lu);font-weight:600}
.mp-cl-q{font-family:var(--fx);font-size:13.5px;line-height:1.95;color:var(--ink);margin-top:2px;letter-spacing:.02em}
.mp-cl-p{font-size:12px;line-height:1.85;color:var(--ink2);margin-top:2px}
@media print{.mp-cl{break-inside:avoid}}
@media print{.mp-cli{break-inside:avoid}}
/* —— 起名评估卡片 —— */
.mp-nm{margin:12px 16px;border:1px solid var(--line);border-radius:8px;background:var(--card);padding:12px 14px;font-family:system-ui,sans-serif}
.mp-nm-h{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;border-bottom:1px solid var(--hair);padding-bottom:8px;margin-bottom:10px}
.mp-nm-h b{font-size:17px;color:var(--ink);font-weight:700}
.mp-nm-h i{font-style:normal;font-size:12px;color:var(--muted)}
.mp-nm-row{display:grid;grid-template-columns:52px 1fr;gap:10px;align-items:start;padding:8px 0;border-bottom:1px dashed var(--hair)}
.mp-nm-row:last-of-type{border-bottom:0}
.mp-nm-ch{font-size:30px;line-height:1.1;font-family:var(--fx);text-align:center;color:var(--ink)}
.mp-nm-b{min-width:0}
.mp-nm-t{display:flex;align-items:center;gap:7px;flex-wrap:wrap;font-size:12.5px;color:var(--ink2)}
.mp-nm-el{font-size:11.5px;border:1px solid currentColor;border-radius:999px;padding:0 7px;line-height:1.7}
.mp-nm-fit{font-size:11px;border-radius:999px;padding:0 7px;line-height:1.7;border:1px solid var(--line);color:var(--muted)}
.mp-nm-fit.ok{color:var(--lu);border-color:var(--lu)}
.mp-nm-fit.no{color:var(--ji);border-color:var(--ji)}
.mp-nm-m{margin-top:3px;font-size:12.5px;line-height:1.75;color:var(--ink2)}
.mp-nm-sug{margin-top:4px;font-size:12px;color:var(--muted)}
.mp-nm-sug b{font-weight:600;color:var(--ink2);margin-right:4px}
.mp-nm-sug span{white-space:nowrap;margin-right:7px}
.mp-nm-verd{margin-top:10px;padding:8px 10px;border-left:2px solid var(--quan);background:var(--band);font-size:12.5px;line-height:1.8;color:var(--ink2)}
.mp-nm-note{margin-top:8px;font-size:11.5px;line-height:1.8;color:var(--faint)}
.mp-nm-cand{margin-top:6px;border-top:1px solid var(--hair)}
.mp-nm-els{display:flex;gap:4px;align-items:center}
.mp-nm-c{display:grid;grid-template-columns:104px max-content minmax(0,1fr);gap:9px;align-items:center;padding:7px 0;border-bottom:1px dashed var(--hair);font-size:13.5px;color:var(--ink)}
.mp-nm-c:last-child{border-bottom:0}
.mp-nm-c b{font-family:var(--fx);font-size:16.5px;font-weight:600;white-space:nowrap;letter-spacing:.5px}
.mp-nm-c em{font-style:normal;font-size:11.5px;line-height:1.7;color:var(--muted);font-family:var(--sans)}
@media print{.mp-nm{break-inside:avoid}}
.mp-quick-pre{margin:0;white-space:pre-wrap;word-break:break-word;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:13px;line-height:1.9;color:var(--ink2)}
/* —— 黄历卡片 —— */
.mp-al{margin:12px 16px;border:1px solid var(--line);border-radius:8px;background:var(--card);padding:12px 14px;font-family:system-ui,sans-serif}
.mp-al-h{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;border-bottom:1px solid var(--hair);padding-bottom:8px;margin-bottom:9px}
.mp-al-h b{font-size:18px;color:var(--ink);font-weight:700;font-variant-numeric:tabular-nums}
.mp-al-h i{font-style:normal;font-size:12px;color:var(--muted)}
.mp-al-gz{font-size:12.5px;color:var(--ink2);margin-bottom:9px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.mp-al-badge{font-size:11px;border:1px solid var(--line);border-radius:999px;padding:1px 8px}
.mp-al-badge.good{color:var(--lu);border-color:var(--lu)}
.mp-al-badge.bad{color:var(--ji);border-color:var(--ji)}
.mp-al-yiji{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:6px 0 9px}
.mp-al-col em,.mp-al-row>em{font-style:normal;font-size:10.5px;color:var(--muted);display:block;margin-bottom:4px}
.mp-al-chips{display:flex;flex-wrap:wrap;gap:4px}
.mp-al-chip{font-size:11.5px;padding:1px 7px;border:1px solid var(--line);border-radius:999px;color:var(--ink2);white-space:nowrap}
.mp-al-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;background:var(--line);border:1px solid var(--line);border-radius:6px;overflow:hidden;margin:8px 0}
.mp-al-cell{background:var(--card);padding:6px 8px;min-width:0}
.mp-al-cell em{display:block;font-style:normal;font-size:10.5px;color:var(--muted);margin-bottom:2px}
.mp-al-cell b{font-size:12.5px;color:var(--ink);font-weight:600;line-height:1.45;display:block}
.mp-al-row{margin:9px 0}
.mp-al-hours{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px}
.mp-al-hour{display:flex;align-items:baseline;gap:3px;border:1px solid var(--hair);border-radius:5px;padding:3px 6px;font-size:11px;color:var(--ink2);background:var(--band)}
.mp-al-hour i{font-style:normal;font-weight:600;color:var(--ink)}
.mp-al-hour em{font-style:normal;color:var(--muted)}
.mp-al-hour b{font-weight:500}
.mp-al-hour u{text-decoration:none;margin-left:auto;font-size:10.5px}
.mp-al-hour.good{border-color:var(--lu);color:var(--lu)}
.mp-al-hour.good i{color:var(--lu)}
.mp-al-hour.bad{border-color:var(--hair)}
.mp-al-hour.bad u{color:var(--ji)}
.mp-al-hex{margin-top:8px;font-size:12px;color:var(--ink2)}
.mp-al-hex b{color:var(--quan)}
.mp-al-note{margin-top:9px;padding-top:8px;border-top:1px dashed var(--line);font-size:11px;line-height:1.7;color:var(--muted)}
@media print{.mp-al{break-inside:avoid}}
@media (max-width:640px){.mp-al{margin:10px;padding:10px}.mp-al-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.mp-al-yiji{grid-template-columns:1fr}}.mp-quick-pre{margin:0;white-space:pre-wrap;word-break:break-word;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:13px;line-height:1.9;color:var(--ink2)}
.mp-it-dis{padding:11px 16px;border-top:1px solid var(--line);background:var(--band);font-size:12px;line-height:1.75;color:var(--muted);font-family:system-ui,sans-serif}

/* —— 竖屏（≤640px）：盘面重排为竖向卡片，页面不横向滚动 —— */
@media (max-width:640px){
  .pp-modes{flex-wrap:wrap}
  .pp-modes label{padding:6px 16px}
  .pp-soon{margin-left:0;padding:6px 10px;width:100%;border-top:1px solid var(--line)}
  /* 紫微：竖屏保持 4×4 宫盘（宫位相对位置是三合/对宫的核心，不可丢），宫内改竖向紧凑排版 */
  .pp-grid{grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,minmax(0,auto));gap:0;padding:0}
  .pp-cell{min-height:0;padding:3px 2px 4px;border-radius:0}
  .pp-center{grid-column:2/4;grid-row:2/4;order:0;border-radius:0;padding:5px 3px;gap:2px}
  .pp-center .ct-t1{font-size:12px;margin-bottom:2px;letter-spacing:.02em}
  .pp-center .ct-t2{font-size:9px;line-height:1.4}
  .pp-center .ct-t3{font-size:10.5px;letter-spacing:.16em;margin:2px 0}
  .pp-center .ct-t4{font-size:9px;line-height:1.45}
  .pp-center .pp-legend{font-size:8.5px;gap:4px;margin-top:3px;flex-wrap:wrap;line-height:1.4}
  /* 星曜竖排堆叠：主星在上粗体，辅星小字，四化彩色标 */
  .pp-stars{flex-direction:column;flex-wrap:nowrap;align-items:flex-start;justify-content:flex-start;gap:1px;font-size:11px;line-height:1.4;min-height:0}
  .pp-st.main{font-size:11px}
  .pp-st.good,.pp-st.bad,.pp-st.aux{font-size:9.5px}
  .pp-m{font-size:8.5px;padding:0 1px;vertical-align:0}
  .pp-b{font-size:10px;margin-left:3px;opacity:.9}
  .pp-ages{font-size:8.5px;line-height:1.45;margin-top:2px;word-break:break-all}
  .pp-foot{font-size:8.5px;line-height:1.4;gap:2px}
  .pp-foot .ft-pn{font-size:11px}
  /* 详情面板：竖屏下要接得住 4×4 网格之外的全部信息 */
  .pp-detail{padding:9px 10px 11px}
  .pp-detail .dt-dh b{font-size:14.5px}
  .pp-detail .dt-dh span{font-size:11.5px}
  .pp-detail .dt-dr{font-size:13px;line-height:1.9}
  .pp-detail .dt-dr{grid-template-columns:54px minmax(0,1fr)}
  .pp-detail .dt-dr .dt-k{font-size:11.5px}
  .pp-detail .dt-st .dt-br{font-size:11px}
  /* 流月/流日/流时：窄屏一行放不下「命宫+四化」，四化另起一行 */
  .pp-flow .flow-row{grid-template-columns:64px minmax(0,1fr);gap:1px 8px;padding:7px 9px}
  .pp-flow .flow-row .flow-m{grid-column:1/-1}
  /* 八字：四柱保持四列并排（参考命书版式），只收紧字号与行距，不折行 */
  .pp-bz{font-size:11.5px}
  .pp-bz th,.pp-bz td{padding:4px 1px}
  .pp-bz th:first-child,.pp-bz td.bz-lbl{width:38px}
  .pp-bz td.bz-lbl{font-size:10.5px}
  .pp-bz .bz-big{font-size:23px}
  .pp-bz .bz-cg{font-size:10px;line-height:1.45}
  .pp-bz .pp-ss{font-size:10px;line-height:1.4}
  .pp-bz td.bz-wxs{font-size:11px;line-height:1.8}
  .pp-bz td.bz-wxs i{margin:0 5px}
  .pp-bz td.bz-wxs i em{font-size:10px}
  .pp-bz th{font-size:11.5px}
  /* 六爻：列宽收紧，爻线自适应拉长 */
  .mp-hy-wrap{gap:14px}
  .mp-hy-box{min-width:0;width:100%}
  .mp-hy-row{grid-template-columns:14px 32px minmax(64px,1fr) 46px 42px 32px;gap:6px;font-size:12.5px}
  .mp-hy-row.hy-plain{grid-template-columns:32px minmax(72px,1fr)}
  /* 爻线是 SVG：宽度交给容器（flex:1），高度仍由尺寸类决定 */
  .mp-hex{width:100%;max-width:104px;min-width:56px;height:12px;flex:1 1 auto}
  .mp-hex.sm{max-width:74px;min-width:52px;height:10px}
  .mp-hex.md{max-width:88px;min-width:56px;height:11px}
  /* 梅花 */
  .mp-mh{padding:10px}
  .mp-mh-main{gap:12px}
  .mp-hexbox.hb-mini{min-width:100px}
  /* 大六壬：天地盘改 3 列卡片流，总览置顶 */
  .mp-dl{padding:10px}
  .mp-dl-sc-c{min-width:88px;padding:8px 12px}
  .mp-dl-sk-c{min-width:70px;padding:6px 8px 7px}
  .mp-dl-pan2{grid-template-columns:repeat(3,1fr);grid-template-rows:none}
  .mp-dl-pc{grid-row:auto!important;grid-column:auto!important;min-height:76px}
  .mp-dl-c{grid-row:auto!important;grid-column:1/-1!important;order:-1}
  /* 塔罗 */
  .mp-tt{padding:10px}
  .mp-tt-grid{grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}
  /* 解析与详解：收窄内边距、行距放宽便于竖屏阅读 */
  .mp-it-head,.mp-it-lead,.mp-it-body,.mp-it-secs,.mp-it-dis,.mp-it-ask{padding-left:11px;padding-right:11px}
  .mp-it-head{min-height:46px}
  .mp-it-hint{margin-left:0;flex-basis:100%}
  .mp-it-dlabel{font-size:15px}
  .mp-it-dtext,.mp-it-stext,.mp-it-adv{font-size:13.5px;line-height:1.95}
  .mp-it-adv{padding:9px 10px}
}
/* —— 以下 @container 版本与上方 @media 同规则 ——
   媒体查询按「视口宽度」判断，dsh 桌面侧栏是「容器窄但视口宽」（如侧栏 420px、窗口 1400px），
   @media 不会触发，盘面会用桌面排版挤成一团。.pp 已声明 container-type:inline-size，
   这里改按容器宽度判断，侧栏、独立页、手机三处排版一致。 */
@container (max-width:640px){
  .pp-modes{flex-wrap:wrap}
  .pp-modes label{padding:6px 16px}
  .pp-soon{margin-left:0;padding:6px 10px;width:100%;border-top:1px solid var(--line)}
  /* 紫微：保持 4×4 宫盘（宫位相对位置是三合/对宫的核心，不可丢），宫内竖向紧凑排版 */
  .pp-grid{grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,minmax(0,auto));gap:0;padding:0}
  .pp-cell{min-height:0;padding:3px 2px 4px;border-radius:0}
  .pp-center{grid-column:2/4;grid-row:2/4;order:0;border-radius:0;padding:5px 3px;gap:2px}
  .pp-center .ct-t1{font-size:12px;margin-bottom:2px;letter-spacing:.02em}
  .pp-center .ct-t2{font-size:9px;line-height:1.4}
  .pp-center .ct-t3{font-size:10.5px;letter-spacing:.16em;margin:2px 0}
  .pp-center .ct-t4{font-size:9px;line-height:1.45}
  .pp-center .pp-legend{font-size:8.5px;gap:4px;margin-top:3px;flex-wrap:wrap;line-height:1.4}
  .pp-stars{flex-direction:column;flex-wrap:nowrap;align-items:flex-start;justify-content:flex-start;gap:1px;font-size:11px;line-height:1.4;min-height:0}
  .pp-st.main{font-size:11px}
  .pp-st.good,.pp-st.bad,.pp-st.aux{font-size:9.5px}
  .pp-m{font-size:8.5px;padding:0 1px;vertical-align:0}
  .pp-b{font-size:10px;margin-left:3px;opacity:.9}
  .pp-ages{font-size:8.5px;line-height:1.45;margin-top:2px;word-break:break-all}
  .pp-foot{font-size:8.5px;line-height:1.4;gap:2px}
  .pp-foot .ft-pn{font-size:11px}
  .pp-detail{padding:9px 10px 11px}
  .pp-detail .dt-dh b{font-size:14.5px}
  .pp-detail .dt-dh span{font-size:11.5px}
  .pp-detail .dt-dr{font-size:13px;line-height:1.9}
  .pp-detail .dt-dr{grid-template-columns:54px minmax(0,1fr)}
  .pp-detail .dt-dr .dt-k{font-size:11.5px}
  .pp-detail .dt-st .dt-br{font-size:11px}
  .pp-flow .flow-row{grid-template-columns:64px minmax(0,1fr);gap:1px 8px;padding:7px 9px}
  .pp-flow .flow-row .flow-m{grid-column:1/-1}
  .pp-bz{font-size:11.5px}
  .pp-bz th,.pp-bz td{padding:4px 1px}
  .pp-bz th:first-child,.pp-bz td.bz-lbl{width:38px}
  .pp-bz td.bz-lbl{font-size:10.5px}
  .pp-bz .bz-big{font-size:23px}
  .pp-bz .bz-cg{font-size:10px;line-height:1.45}
  .pp-bz .pp-ss{font-size:10px;line-height:1.4}
  .pp-bz td.bz-wxs{font-size:11px;line-height:1.8}
  .pp-bz td.bz-wxs i{margin:0 5px}
  .pp-bz td.bz-wxs i em{font-size:10px}
  .pp-bz th{font-size:11.5px}
  .mp-hy-wrap{gap:14px}
  .mp-hy-box{min-width:0;width:100%}
  .mp-hy-row{grid-template-columns:14px 32px minmax(64px,1fr) 46px 42px 32px;gap:6px;font-size:12.5px}
  .mp-hy-row.hy-plain{grid-template-columns:32px minmax(72px,1fr)}
  /* 爻线是 SVG：宽度交给容器（flex:1），高度仍由尺寸类决定 */
  .mp-hex{width:100%;max-width:104px;min-width:56px;height:12px;flex:1 1 auto}
  .mp-hex.sm{max-width:74px;min-width:52px;height:10px}
  .mp-hex.md{max-width:88px;min-width:56px;height:11px}
  .mp-mh{padding:10px}
  .mp-mh-main{gap:12px}
  .mp-hexbox.hb-mini{min-width:100px}
  .mp-dl{padding:10px}
  .mp-dl-sc-c{min-width:88px;padding:8px 12px}
  .mp-dl-sk-c{min-width:70px;padding:6px 8px 7px}
  .mp-dl-pan2{grid-template-columns:repeat(3,1fr);grid-template-rows:none}
  .mp-dl-pc{grid-row:auto!important;grid-column:auto!important;min-height:76px}
  .mp-dl-c{grid-row:auto!important;grid-column:1/-1!important;order:-1}
  .mp-tt{padding:10px}
  .mp-tt-grid{grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}
  .mp-it-head,.mp-it-lead,.mp-it-body,.mp-it-secs,.mp-it-dis,.mp-it-ask{padding-left:11px;padding-right:11px}
  .mp-it-head{min-height:46px}
  .mp-it-hint{margin-left:0;flex-basis:100%}
  .mp-it-dlabel{font-size:15px}
  .mp-it-dtext,.mp-it-stext,.mp-it-adv{font-size:13.5px;line-height:1.95}
  .mp-it-adv{padding:9px 10px}
}
@media (max-width:430px){
  /* 窄屏手机：紫微仍保持 4×4 宫盘（相对位置不可丢），进一步收紧宫内字号与间距 */
  .pp-cell{padding:2px 1px 3px}
  .pp-st.main{font-size:10px}
  .pp-st.good,.pp-st.bad,.pp-st.aux{font-size:9px}
  .pp-foot .ft-pn{font-size:10px}
  .pp-center .ct-t1{font-size:11px}
  .pp-center .ct-t2,.pp-center .ct-t4{font-size:8.5px}
  .mp-dl-sc-c{min-width:80px}
  /* 六爻盘：六列固定宽 + 间隙最窄也要 260px，而 320px 屏下 .mp-hy 内容区只有 232px，
     会溢出 28px。这里把六列压到 206px、间隙让到 4px（合计 226px），
     同时把 .mp-hy-box 的左右内边距从 16 收到 10 再腾出 12px。 */
  .mp-hy-box{padding:10px 10px 12px}
  .mp-hy-row{grid-template-columns:12px 30px minmax(56px,1fr) 42px 38px 28px;gap:4px;font-size:11.5px}
  .mp-hy-row.hy-plain{grid-template-columns:28px minmax(56px,1fr);gap:6px}
}
/* 容器查询版：极窄侧栏 / 小屏手机（与上方 @media 同规则） */
@container (max-width:430px){
  .pp-cell{padding:2px 1px 3px}
  .pp-st.main{font-size:10px}
  .pp-st.good,.pp-st.bad,.pp-st.aux{font-size:9px}
  .pp-foot .ft-pn{font-size:10px}
  .pp-center .ct-t1{font-size:11px}
  .pp-center .ct-t2,.pp-center .ct-t4{font-size:8.5px}
  .mp-dl-sc-c{min-width:80px}
  /* 六爻盘：六列固定宽 + 间隙最窄也要 260px，而 320px 屏下 .mp-hy 内容区只有 232px，
     会溢出 28px。这里把六列压到 206px、间隙让到 4px（合计 226px），
     同时把 .mp-hy-box 的左右内边距从 16 收到 10 再腾出 12px。 */
  .mp-hy-box{padding:10px 10px 12px}
  .mp-hy-row{grid-template-columns:12px 30px minmax(56px,1fr) 42px 38px 28px;gap:4px;font-size:11.5px}
  .mp-hy-row.hy-plain{grid-template-columns:28px minmax(56px,1fr);gap:6px}
}
`;
  const pp = (window.__PP = window.__PP || {});
  pp.CSS = CSS;

  const TYPE_CLASS = { 主星: 'main', 吉星: 'good', 煞星: 'bad', 辅星: 'aux', 杂曜: 'aux' };
  const MUT = { 禄: 'lu', 权: 'quan', 科: 'ke', 忌: 'ji' };
  // 庙旺得利平不陷 → 三档视觉权重：吉（庙旺）/ 中（得利平）/ 忌（不陷）
  const BR_CLASS = { 庙: 'good', 旺: 'good', 得: 'mid', 利: 'mid', 平: 'mid', 不: 'bad', 陷: 'bad' };
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

  /**
   * 单爻线：阳一整条，阴两段；动爻描红。
   * 用内联 SVG 而非 span+background：缩放不糊，阴爻间隙按画布坐标等比给出。
   * 画布固定 104×12，靠 CSS 控宽高（preserveAspectRatio:none），三种尺寸共用一份几何。
   */
  const hexBar = (yang, moving, size) => {
    const W = 104, H = 12, bh = 7, y = (H - bh) / 2, r = 1.6;
    const gap = 18, seg = Math.round((W - gap) / 2);
    const bars = yang
      ? `<rect x="0" y="${y}" width="${W}" height="${bh}" rx="${r}" fill="currentColor"/>`
      : `<rect x="0" y="${y}" width="${seg}" height="${bh}" rx="${r}" fill="currentColor"/>`
        + `<rect x="${seg + gap}" y="${y}" width="${W - seg - gap}" height="${bh}" rx="${r}" fill="currentColor"/>`;
    return `<svg class="mp-hex${moving ? ' hex-on' : ''}${size ? ' ' + size : ''}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true" focusable="false">${bars}</svg>`;
  };

  // 五行符号：描边取 currentColor，跟着 --wx-* 上色。形状取各元素最易辨识的意象
  // （木＝树 / 火＝焰 / 土＝「土」字骨 / 金＝菱形 / 水＝波纹），12×12 画布。
  const WX_ICON = {
    木: 'M6 1.6V10.8M6 5.2 2.6 2.2M6 7.4 9.4 4.4',
    火: 'M6 1.4C7.6 3.6 9.2 5.4 9.2 7.6A3.2 3.2 0 0 1 2.8 7.6C2.8 5.4 4.4 3.6 6 1.4Z',
    土: 'M1.6 9.6h8.8M6 2.4v7.2M3.4 5.6h5.2',
    金: 'M6 1.2 10.6 6 6 10.8 1.4 6Z',
    水: 'M1.4 7.2C2.9 4.2 4.5 10.2 6 7.2 7.5 4.2 9.1 10.2 10.6 7.2',
  };
  const wxIcon = (el) => {
    const d = WX_ICON[el];
    if (!d) return '';
    return `<svg class="mp-wxi" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="${d}" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  };

  /** 八卦小象：14×10 三爻，自上而下。TRI_BITS 自下而上存，这里翻过来 */
  const triGlyph = (name) => {
    const bits = (TRI_BITS[name] || [0, 0, 0]).slice().reverse();
    const rows = bits.map((b, i) => {
      const y = i * 4;
      return b
        ? `<rect x="0" y="${y}" width="14" height="2" rx="0.6" fill="currentColor"/>`
        : `<rect x="0" y="${y}" width="5.6" height="2" rx="0.6" fill="currentColor"/>`
          + `<rect x="8.4" y="${y}" width="5.6" height="2" rx="0.6" fill="currentColor"/>`;
    }).join('');
    return `<svg class="mp-trig" viewBox="0 0 14 10" aria-hidden="true" focusable="false">${rows}</svg>`;
  };

  // 供测试直接调（同 _palaceDetailHTML 的约定）：符号生成器是纯函数，单独验比从整盘反推更可靠
  pp._hexBar = hexBar;
  pp._wxIcon = wxIcon;
  pp._triGlyph = triGlyph;

  function starsHTML(stars, viewHua) {
    if (!stars || !stars.length) return '';
    return stars.map((s) => {
      const cls = TYPE_CLASS[s.type] || 'aux';
      const m = s.mutagen ? `<i class="pp-m ${MUT[s.mutagen]}">${s.mutagen}</i>` : '';
      // 大限/流年四化用空心框，与生年四化的实心框区分
      const vh = viewHua && viewHua[s.name];
      const vm = vh ? `<i class="pp-m view ${MUT[vh]}">${vh}</i>` : '';
      const b = s.brightness ? `<em class="pp-b ${BR_CLASS[s.brightness] || 'mid'}">${s.brightness}</em>` : '';
      // 顺序：星名 → 亮度灰字 → 四化色块。灰字紧贴星名变成一体，彩色实心框独立在末尾，
      // 避免两者字号差导致视觉叠压（试过 星名→四化→亮度，10px 字形会压住 8.5px 的框）
      return `<span class="pp-st ${cls}">${s.name}${b}${m}${vm}</span>`;
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

  function cellHTML(p, soulIdx, view, allPalaces, viewHua) {
    const pos = POS[p.branch] || [1, 1];
    const b = BR.indexOf(p.branch);
    const cls = ['pp-cell'];
    if (b === soulIdx) cls.push('pp-soul');
    else if (isTrine(b, soulIdx)) cls.push('pp-tri');
    if (p.isBody) cls.push('pp-shen');
    if (pos[0] === 4) cls.push('pp-lastrow');
    if (pos[1] === 4) cls.push('pp-lastcol');
    const ss = p.shensha || {};
    const pname = NAMES[fx(soulIdx - b)];
    const zh = (p.selfHua && p.selfHua.length)
      ? `<span class="pp-zh">${p.selfHua.map((x) => `<i class="pp-m ${MUT[x.type]}">${x.type}</i>`).join('')}</span>` : '';
    // 命无正曜：命宫无十四主星时，传统要借对宫（迁移宫）主星来看
    let borrow = '';
    if (b === soulIdx && allPalaces) {
      const isMain = (s) => (TYPE_CLASS[s.type] || '') === 'main';
      if (!(p.stars || []).some(isMain)) {
        const opp = allPalaces.find((x) => BR.indexOf(x.branch) === fx(b + 6));
        const borrowed = opp ? (opp.stars || []).filter(isMain) : [];
        if (borrowed.length) {
          borrow = `<div class="pp-borrow" title="命宫无主星，借对宫（迁移宫）主星">借 ${borrowed.map((s) => s.name).join(' ')}</div>`;
        }
      }
    }
    return `<div class="${cls.join(' ')}" data-pi="${b}" data-view="${view}" role="button" tabindex="0" aria-expanded="false" style="grid-row:${pos[0]};grid-column:${pos[1]}">
      <div class="pp-stars">${starsHTML(p.stars, viewHua)}${zh}</div>
      ${borrow}
      <div class="pp-ages">${agesHTML(p.xiaoxian.age)}</div>
      <div class="pp-foot">
        <div class="ft-l">
          <span class="ft-dx">${ss.boshi} ${p.daxian.start}-${p.daxian.end}</span>
          <span>${ss.jiangqian}</span>
          <span>${ss.suiqi}</span>
        </div>
        <div class="ft-r">
          <span>${ss.changsheng}</span>
          <span>${p.ganzhi}</span>
          <span class="ft-pn">${pname}</span>
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

    // 大限 / 流年的四化：把该限干、年干飞出的四化铺到对应星上
    const huaMap = (hits) => {
      const o = {};
      for (const h of hits || []) if (h && h.star) o[h.star] = h.type;
      return o;
    };
    const dxObj = (r.daxianList || []).find((d) => d.branch === dxPalace.branch) || null;
    const huaByView = { da: huaMap(dxObj && dxObj.mutagenHits), ln: huaMap(ln && ln.mutagenHits) };

    const grid = (m, kind) => r.palaces.map((p) => cellHTML(p, m, kind, r.palaces, huaByView[kind] || null)).join('');
    const center = (m, kind) => {
      const mode = kind === 'da'
        ? `<div class="ct-t1">大限 ${dxPalace.ganzhi}　${dxPalace.daxian.start}-${dxPalace.daxian.end}岁</div>`
        : kind === 'ln' && ln
          ? `<div class="ct-t1">流年 ${ln.ganzhi}　${ln.age}岁</div>`
          : `<div class="ct-t1">${r.daxian.rule.slice(0, 2)}　${r.bureau.name}</div>`;
      return `<div class="pp-center">
        ${mode}
        <div class="ct-t2">公历 ${r.input.year}-${String(r.input.month).padStart(2, '0')}-${String(r.input.day).padStart(2, '0')} ${String(r.input.hour).padStart(2, '0')}:${String(r.input.minute).padStart(2, '0')}</div>
        <div class="ct-t2">农历 ${r.lunar.year}年${r.lunar.isLeap ? '闰' : ''}${r.lunar.month}月${r.lunar.day}日${r.hourBranch}时</div>
        ${sizhuOf(r) ? `<div class="ct-t3">${sizhuOf(r)}</div>` : ''}
        <div class="ct-t4">命主 ${r.lifeMaster}　身主 ${r.bodyMaster}</div>
        <div class="ct-t4">命宫 ${r.soul.branch}　身宫 ${r.body.branch}　五行局 ${r.bureau.name}</div>
        <div class="ct-t4">子年斗君 ${r.doujun ? r.doujun.zinian : '—'}　流年斗君 ${ln && ln.doujun ? ln.doujun : '—'}</div>
        <div class="ct-t4">紫微 ${r.ziwei}　天府 ${r.tianfu}　${kind === 'da' ? '大限命宫 ' + BR[dxIdx] : kind === 'ln' ? '流年命宫 ' + BR[lnIdx] : '本命命宫 ' + r.soul.branch}</div>
        ${kind === 'da' || kind === 'ln' ? `<div class="ct-t4 pp-viewhua">${kind === 'da' ? '大限' : '流年'}四化　${(kind === 'da' ? huaByView.da : huaByView.ln) && Object.keys(kind === 'da' ? huaByView.da : huaByView.ln).length
          ? Object.entries(kind === 'da' ? huaByView.da : huaByView.ln).map(([s2, t]) => `${s2}化${t}`).join('　')
          : '<span class="pp-dim">未飞四化</span>'}</div>` : ''}
        <div class="pp-legend"><span class="pp-m lu">禄</span><span class="pp-m quan">权</span><span class="pp-m ke">科</span><span class="pp-m ji">忌</span><span>实心=生年四化　空心=大限/流年四化　红框=命宫　浅底=三方四正</span></div>
      </div>`;
    };

    const body = (id, m, kind) => `<div class="pp-body ${id}" data-view="${kind}" data-soul="${m}"><div class="pp-grid">${grid(m, kind)}${center(m, kind)}</div><div class="pp-detail"></div></div>`;

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

    // 流月/流日/流时：流年只能看到「今年」，要落到「这个月这段时间」得再往下一层
    const fl = r.flow;
    const flowHTML = fl ? (() => {
      const muts = (p) => (p.mutagenHits || []).length
        ? p.mutagenHits.map((m) => `<i>${m.star}化${m.type}<em>→${m.palace || '未上盘'}</em></i>`).join('')
        : '<i class="dim">宫干无四化</i>';
      const row = (label, p, note) =>
        `<div class="flow-row"><b>${label}</b><span class="flow-p"><span class="flow-k">${p.ganzhi || '—'}　落${p.palace || '未上盘'}（${p.branch}）</span>${note ? `<em class="flow-same">${note}</em>` : ''}</span><span class="flow-m">${muts(p)}</span></div>`;
      // 日数走满 12 宫就回到同宫，不说明会被当成算错
      const sameAsMonth = fl.day.branch === fl.month.branch;
      const sameNote = sameAsMonth ? '（日数走满一圈，故同宫）' : '';
      return `<div class="pp-flow">
        <div class="flow-row"><b>基准</b><span class="flow-p">${fl.asOf.solar}</span><span class="flow-m">农历 ${fl.asOf.lunar}　流年 ${fl.asOf.yearGanzhi}（斗君 ${fl.year.doujun}）</span></div>
        ${row(`流月 ${fl.month.index} 月`, fl.month)}
        ${row(`流日 ${fl.day.index} 日`, fl.day, sameNote)}
        ${row(`流时 ${BR[fl.hour.hourIndex]}时`, fl.hour)}
      </div>`;
    })() : '';
    pp._zw = r; // 详情面板用：点击宫位时从这里取完整宫数据
    return `<div class="pp">
      <input type="radio" name="ppm" id="ppm-ben" class="pp-r" checked>
      <input type="radio" name="ppm" id="ppm-da" class="pp-r">
      <input type="radio" name="ppm" id="ppm-ln" class="pp-r">
      <div class="pp-modes">
        <label for="ppm-ben">本命</label><label for="ppm-da">大限</label><label for="ppm-ln">流年</label>
        <span class="pp-soon">点任一宫位看详情</span>
      </div>
      ${body('ben', soulIdx, 'ben')}
      ${body('da', dxIdx, 'da')}
      ${body('ln', lnIdx, 'ln')}
    </div>${flowHTML}${chips}${pats}${dxs}${lnHit}`;
  };

  // ── 宫位详情 ────────────────────────────────────────────────
  // 4×4 宫盘必然挤（竖屏主星才 10px），宫内放不下完整星曜、四化、十二神。
  // 点开某宫后把这些摊平，并把它的三方四正一起标出来。
  function starLine(list) {
    if (!list.length) return '<span class="dt-empty">无</span>';
    return list.map((s) => {
      const cls = TYPE_CLASS[s.type] || 'aux';
      const br = s.brightness ? `<em class="dt-br ${BR_CLASS[s.brightness] || 'mid'}">${s.brightness}</em>` : '';
      const mu = s.mutagen ? `<i class="pp-m ${MUT[s.mutagen]}">${s.mutagen}</i>` : '';
      return `<span class="dt-st ${cls}">${s.name}${br}${mu}</span>`;
    }).join('');
  }

  function palaceDetailHTML(pi, soulIdx) {
    const r = pp._zw;
    if (!r) return '';
    const at = (idx) => r.palaces.find((p) => BR.indexOf(p.branch) === idx);
    const p = at(pi) || r.palaces.find((x) => BR.indexOf(x.branch) === pi);
    if (!p) return '';
    const b = BR.indexOf(p.branch);
    const nm = NAMES[fx(soulIdx - b)];
    const ss = p.shensha || {};
    const mains = p.stars.filter((s) => s.type === '主星');
    const auxes = p.stars.filter((s) => s.type === '吉星' || s.type === '辅星');
    const bads = p.stars.filter((s) => s.type === '煞星');
    const misc = p.stars.filter((s) => !['主星', '吉星', '辅星', '煞星'].includes(s.type));
    const selfHua = (p.selfHua || []).length
      ? p.selfHua.map((x) => `<i class="pp-m ${MUT[x.type]}">${x.type}</i>`).join('')
      : '<span class="dt-empty">无</span>';
    // 三方四正：三合（+4/+8）与对宫（+6）
    const tri = [fx(b + 4), fx(b + 8), fx(b + 6)].map((idx) => {
      const q = at(idx);
      const qn = NAMES[fx(soulIdx - idx)];
      const qm = q ? q.stars.filter((s) => s.type === '主星').map((s) => s.name).join('、') : '';
      const tag = idx === fx(b + 6) ? '对宫' : '三合';
      return `<span class="dt-st">${qn}[${BR[idx]}]<b>${qm || '无主星'}</b><em>${tag}</em></span>`;
    }).join('');
    const at6 = at(fx(b + 6));
    const borrowStars = at6 ? at6.stars.filter((s) => s.type === '主星') : [];
    // 空宫借对宫主星安星，是紫微实务里的固定做法，空着不写等于漏了半宫信息
    const mainRow = mains.length
      ? starLine(mains)
      : `<span class="dt-empty">无主星</span><span class="dt-tri">　借对宫 <b>${borrowStars.length ? borrowStars.map((s) => s.name).join('、') : '亦无主星'}</b></span>`;
    const row = (k, v) => `<div class="dt-dr"><span class="dt-k">${k}</span><div class="dt-v">${v}</div></div>`;

    return `<div class="dt-dh">
        <b>${nm}</b><span>${p.branch}宫 · ${p.ganzhi}</span>
        <span>大限 ${p.daxian.start}-${p.daxian.end}</span>
        <span>小限起 ${p.xiaoxian.age} 岁</span>
        ${p.isBody ? '<span>· 身宫</span>' : ''}
        <span class="dt-x" data-pp-close="1">收起</span>
      </div>
      ${row('主星', mainRow)}
      ${row('吉辅', starLine(auxes))}
      ${bads.length ? row('煞星', starLine(bads)) : ''}
      ${misc.length ? row('杂曜', starLine(misc)) : ''}
      ${row('宫干四化', selfHua)}
      ${row('十二神', `<span class="dt-tri">长生 ${ss.changsheng || '—'}　博士 ${ss.boshi || '—'}　将前 ${ss.jiangqian || '—'}　岁前 ${ss.suiqi || '—'}</span>`)}
      ${row('三方四正', `<span class="dt-tri">${tri}</span>`)}
      <div class="hint">三方四正在盘上已同步标出（浅红描边）。再点一次本宫可收起。</div>`;
  }

  function clearMarks(body) {
    body.querySelectorAll('.pp-cell.pp-sel,.pp-cell.pp-link').forEach((c) => {
      c.classList.remove('pp-sel');
      c.classList.remove('pp-link');
    });
    // 状态同步：aria-expanded 只对当前展开的那一宫为 true
    body.querySelectorAll('.pp-cell[aria-expanded="true"]').forEach((c) => c.setAttribute('aria-expanded', 'false'));
  }

  // 全局委托：面板与独立页都不需要额外初始化，panel-kit 一加载就生效
  function bindZiwei() {
    if (bindZiwei.done || typeof document === 'undefined' || !document.addEventListener) return;
    bindZiwei.done = true;
    const toggle = (cell) => {
      const body = cell.closest('.pp-body');
      if (!body) return;
      const detail = body.querySelector('.pp-detail');
      if (!detail) return;
      // 再点同一宫 → 收起
      if (cell.classList.contains('pp-sel')) {
        clearMarks(body);
        detail.classList.remove('open');
        detail.innerHTML = '';
        return;
      }
      clearMarks(body);
      const pi = Number(cell.dataset.pi);
      const soulIdx = Number(body.dataset.soul);
      const sel = body.querySelectorAll('.pp-cell');
      sel.forEach((c) => {
        const ci = Number(c.dataset.pi);
        if (ci === fx(pi + 4) || ci === fx(pi + 8) || ci === fx(pi + 6)) c.classList.add('pp-link');
      });
      cell.classList.add('pp-sel');
      cell.setAttribute('aria-expanded', 'true');
      detail.innerHTML = palaceDetailHTML(pi, soulIdx);
      detail.classList.add('open');
    };
    document.addEventListener('click', (e) => {
      const t = e.target;
      if (t && t.closest && t.closest('[data-pp-close]')) {
        const body = t.closest('.pp-body');
        if (body) {
          clearMarks(body);
          const d = body.querySelector('.pp-detail');
          if (d) { d.classList.remove('open'); d.innerHTML = ''; }
          return;
        }
      }
      const cell = t && t.closest ? t.closest('.pp-cell[data-pi]') : null;
      if (cell) toggle(cell);
    });
    // 键盘可达：Enter / 空格等同于点击
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const cell = e.target && e.target.closest ? e.target.closest('.pp-cell[data-pi]') : null;
      if (!cell) return;
      e.preventDefault();
      toggle(cell);
    });
  }
  pp.bindZiwei = bindZiwei;
  pp._palaceDetailHTML = palaceDetailHTML; // 供测试直接调
  bindZiwei();

  /** 六爻 / 梅花的卦体：上爻在最上 */
  function hexRows(lines, opt) {
    const o = opt || {};
    const sorted = lines.slice().sort((a, b) => b.position - a.position);
    if (o.plain) {
      return sorted.map((l) => `<div class="mp-hy-row hy-plain">
        <span class="mp-hy-nm">${l.name || POS_NAME[l.position - 1]}</span>
        ${hexBar(l.yinYang === '阳', l.moving)}
      </div>`).join('');
    }
    return sorted.map((l) => {
      const yang = l.yinYang === '阳';
      const sh = o.shiYing
        ? (l.position === o.shi ? '<span class="mp-hy-sy">世</span>' : l.position === o.ying ? '<span class="mp-hy-sy">应</span>' : '<span></span>')
        : '<span></span>';
      // 动爻标记沿用传统：老阳 ○ / 老阴 ×。非动爻留同宽空位，六列不抖
      const mv = l.moving
        ? `<i class="mp-hy-mv" title="动爻">${yang ? '○' : '×'}</i>`
        : '<i class="mp-hy-mv"></i>';
      return `<div class="mp-hy-row">
        ${sh}
        <span class="mp-hy-nm">${l.name || POS_NAME[l.position - 1]}</span>
        <span class="mp-hy-ln">${hexBar(yang, l.moving)}${mv}</span>
        <span class="mp-hy-gz">${esc(l.ganzhi || '')}</span>
        <span class="mp-hy-lq">${esc(l.liuqin || '')}</span>
        <span class="mp-hy-ls">${esc(l.liushen || '')}</span>
      </div>`;
    }).join('');
  }

  pp.liuyaoHTML = function (r) {
    const box = (title, sub, hex, lines) => `<div class="mp-hy-box">
      <div class="mp-hy-h"><b>${title}</b><span>${sub}</span></div>
      <div class="mp-hy">${hexRows(lines, { shiYing: true, shi: hex.shi, ying: hex.ying })}</div>
    </div>`;
    const ben = box(`本卦 ${r.ben.name}`, `${r.ben.palace} · ${r.ben.palaceElement}`, r.ben, r.ben.lines);
    const bian = r.bian
      ? box(`变卦 ${r.bian.name}`, `${r.bian.palace} · ${r.bian.palaceElement}`, r.bian, r.bian.lines)
      : `<div class="mp-hy-box"><div class="mp-hy-h"><b>六爻安静</b><span>无动爻，不取变卦</span></div>
          <div class="pp-dim" style="font-size:12px;line-height:1.9">断卦以本卦卦辞与世应生克为主。</div></div>`;
    // 卦体标签由引擎算好挂在 body.labels 上（六冲/六合/伏吟/反吟），这里只负责摆位置
    const bodyLabels = (r.body && Array.isArray(r.body.labels)) ? r.body.labels : [];
    const bodyRow = bodyLabels.length
      ? `<div class="pp-chips">${bodyLabels.map((l) => {
        const cls = /伏吟/.test(l) ? 'warn' : /反吟/.test(l) ? 'warn' : /六冲|散/.test(l) ? '' : 'ok';
        return `<span class="pp-chip ${cls}">${esc(l)}</span>`;
      }).join('')}</div>`
      : `<div class="pp-chips"><span class="pp-chip">卦体无六冲、六合、伏吟、反吟</span></div>`;
    return `<div class="pp" style="padding:14px">
      <div class="mp-mh-head">起卦 ${r.cast.notation.join('、')}（自下而上）　日辰 ${r.dayGanZhi.name}</div>
      <div class="mp-hy-wrap">${ben}${bian}</div>
      ${bodyRow}
    </div>`;
  };

  pp.meihuaHTML = function (r) {
    // 三爻成卦：由上下卦名反推爻线
    const mini = (title, name, upper, lower, note) => {
      const bits = [...(TRI_BITS[lower] || [0, 0, 0]), ...(TRI_BITS[upper] || [0, 0, 0])];
      const rows = bits.slice().reverse().map((b) => hexBar(!!b, false, 'sm')).join('');
      return `<div class="mp-hexbox hb-mini">
        <div class="hb-h">${title}</div>
        <div class="hb-n">${name}</div>
        <div class="mp-mh-mini">${rows}</div>
        <div class="hb-s">${note || `上${upper} 下${lower}`}</div>
      </div>`;
    };
    // 本卦：分上下卦，标体用
    const benBits = r.lines.slice().sort((a, b) => b.position - a.position);
    const upperLines = benBits.slice(0, 3);
    const lowerLines = benBits.slice(3);
    const movingInUpper = r.moving >= 4;
    const trib = (label, tri, lines, isBody) => `<div class="mp-trib">
      <div class="mp-trib-h">${label} ${triGlyph(tri)}${tri}${TRI_EL(tri)}<span class="mp-tritag ${isBody ? 'tritag-ti' : 'tritag-yong'}">${isBody ? '体' : '用'}</span></div>
      <div class="mp-hy" style="gap:5px">${hexRows(lines, { plain: true })}</div>
    </div>`;
    const mainBox = `<div class="mp-hexbox">
      <div class="hb-h"><span>本卦</span><span>动 ${r.movingName}</span></div>
      <div class="hb-n">${r.ben.name}</div>
      ${trib('上卦', r.ben.upper, upperLines, !movingInUpper)}
      ${trib('下卦', r.ben.lower, lowerLines, movingInUpper)}
      <div class="hb-s">${r.source}</div>
    </div>`;

    const lv = r.bodyUse.level;
    const lvCls = lv.includes('凶') ? 'bad' : lv.includes('吉') ? 'good' : 'flat';
    const useLine = `<div class="mp-mh-rel">
      <div><b>体</b>${r.bodyUse.body.trigram}（${r.bodyUse.body.element}）　<b>用</b>${r.bodyUse.use.trigram}（${r.bodyUse.use.element}）</div>
      <div><span class="mh-lv ${lvCls}">${lv}</span>　${r.bodyUse.relation}</div>
    </div>`;

    const cuoTri = TRI_OF(r.cuo.name) || ['', ''];
    const zongTri = TRI_OF(r.zong.name) || ['', ''];
    return `<div class="pp mp-mh">
      <div class="mp-mh-main">
        ${mainBox}
        ${mini('互卦', r.hu.name, r.hu.upper, r.hu.lower, '中藏之象')}
        ${mini('变卦', r.bian.name, r.bian.upper, r.bian.lower, `动 ${r.movingName} 后`)}
        ${mini('错卦', r.cuo.name, cuoTri[0], cuoTri[1], '六爻全变')}
        ${mini('综卦', r.zong.name, zongTri[0], zongTri[1], '整卦倒转')}
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
  const TRI_OF = (name) => HEX_TABLE[name] || null; // [上卦, 下卦]

  pp.daliurenHTML = function (r) {
    const sc = r.sanChuan;
    const cbox = (c, k) => `<div class="mp-dl-sc-c">
      <div class="mp-dl-sc-k">${k}</div>
      <div class="mp-dl-sc-z">${c.zhi}</div>
      <div class="mp-dl-sc-j">${c.jiangFull || c.jiang}</div>
      <div class="mp-dl-sc-l">${c.liuQin}${c.xunKong ? ' · 空' : ''}</div>
    </div>`;
    const ge = `<div class="mp-dl-sc-c ge">
      <div class="mp-dl-sc-k">格局</div>
      <div class="mp-dl-sc-gn">${r.geJu.name}</div>
      <div class="mp-dl-sc-l">${r.geJu.detail}</div>
    </div>`;
    const keCells = r.siKe.slice().map((x) => `<div class="mp-dl-sk-c">
      <div class="mp-dl-sk-k">${['一课', '二课', '三课', '四课'][x.position - 1] || x.position + '课'}</div>
      <div class="mp-dl-sk-s">${x.shang}</div>
      <div class="mp-dl-sk-x">${x.xia}</div>
      <div class="mp-dl-sk-r">${x.relation} · ${x.jiangFull || x.jiang}</div>
    </div>`).join('');
    const cells = r.pan.map((p) => {
      const pos = POS[p.di] || [1, 1];
      return `<div class="mp-dl-pc" style="grid-row:${pos[0]};grid-column:${pos[1]}">
        <div class="tz">${p.tian}</div>
        <div class="dz">地盘 ${p.di}</div>
        <div class="jz">${p.jiangFull}</div>
      </div>`;
    }).join('');
    const center = `<div class="mp-dl-c">
      <div class="dl-t1">${r.dayGanZhi}日　${r.hourZhi}时</div>
      <div class="dl-t2">${r.dayNight}贵 · 月将 ${r.yueJiang.name}${r.yueJiang.zhi} · 贵人${r.guiren.reverse ? '逆' : '顺'}行</div>
      <div class="dl-t3">${sc.chu.zhi} → ${sc.zhong.zhi} → ${sc.mo.zhi}</div>
      <div class="dl-t2">节气 ${r.jieqi.name}${r.jieqi.time ? ' ' + r.jieqi.time : ''}</div>
    </div>`;
    return `<div class="pp mp-dl">
      <div class="mp-dl-head">日 ${r.dayGanZhi}　时 ${r.hourZhi}（${r.dayNight}贵）　月将 ${r.yueJiang.name}${r.yueJiang.zhi}　节气 ${r.jieqi.name}　贵人${r.guiren.reverse ? '逆' : '顺'}行</div>
      <div class="mp-dl-sc">${cbox(sc.chu, '初传')}${cbox(sc.zhong, '中传')}${cbox(sc.mo, '末传')}${ge}</div>
      <div class="mp-dl-sk">${keCells}</div>
      <div class="mp-dl-pan2">${cells}${center}</div>
      ${(r.shensha || []).length ? `<div class="mp-dl-ss"><b>神煞</b>${r.shensha.map((x) => `<span title="${esc(x.note || '')}">${x.name}<i>${x.branch}</i></span>`).join('')}</div>` : ''}
      <div class="mp-dl-legend"><span>大字＝天盘支</span><span>小字＝地盘（固定十二支）</span><span>右下＝天将</span></div>
    </div>`;
  };

  pp.tarotHTML = function (r) {
    const cards = r.cards.map((c) => `
      <div class="mp-tt-card ${c.upright ? 'tt-up' : 'tt-rev'}">
        <div class="mp-tt-pos" title="${esc(c.positionHint || '')}">${c.position}</div>
        <div class="mp-tt-name">${c.name}${c.number ? `<span class="mp-tt-no">${c.number}</span>` : ''}</div>
        <div class="mp-tt-ori">${c.orientation}</div>
        ${c.core ? `<div class="mp-tt-core">${c.core}</div>` : ''}
        <div class="mp-tt-kw">${c.keywords.map((k) => `<span>${k}</span>`).join('')}</div>
        <div class="mp-tt-el">${c.arcana} · ${c.element}${c.suit ? ' · ' + c.suit + (c.rankCn ? c.rankCn : '') : ''}${c.domain ? ' · ' + c.domain : ''}</div>
      </div>`).join('');
    // 所问之事是用户原文，必须转义后再进 innerHTML（塔罗面板曾漏这一处）
    const q = r.question ? esc(r.question) : '<span class="pp-dim">（未填写，可在上方输入后重抽）</span>';
    // 解读段落里会回显用户问题（"你问的是「…」"），同样走转义
    const reading = (r.reading || []).map((p) => `<p>${esc(p)}</p>`).join('');
    return `<div class="pp mp-tt">
      <div class="mp-tt-q"><b>所问</b>${q}</div>
      <div class="mp-tt-head">${r.spread}${r.castAt ? `　·　抽牌于 ${r.castAt}` : ''}</div>
      <div class="mp-tt-grid">${cards}</div>
      <div class="mp-tt-read"><div class="mp-tt-rt">牌面解读</div>${reading}</div>
      <div class="mp-tt-note"><div class="mp-tt-rt">你的记录</div>
        <textarea class="mp-tt-ta" rows="4" placeholder="写下判断或对照后的想法……（仅本页可见，不保存）"></textarea>
      </div>
      ${r.systemNote ? `<div class="mp-tt-tip">${r.systemNote}</div>` : ''}
      <div class="mp-tt-tip">塔罗用于自我觉察与娱乐，不作确定性预言。</div>
    </div>`;
  };

  pp.hepanHTML = function (r) {
    const side = (x, who) => `<div class="mp-hp-side">
      <div class="mp-hp-who">${who}</div>
      <div class="mp-hp-gz">${x.pillars.join(' ')}</div>
      <div class="mp-hp-kv"><span>日主</span><b>${x.dayMaster}</b></div>
      <div class="mp-hp-kv"><span>日支</span><b>${x.dayBranch}</b></div>
      <div class="mp-hp-kv"><span>强弱</span><b>${x.strength || '—'}</b></div>
      <div class="mp-hp-kv"><span>喜用</span><b>${x.favor || '—'}</b></div>
    </div>`;
    const dims = r.dimensions.map((d) => `<div class="mp-hp-dim">
      <div class="mp-hp-dimh"><span>${d.label}</span><b class="${d.score >= 10 ? 'good' : d.score < 0 ? 'bad' : ''}">${d.score >= 0 ? '+' : ''}${d.score}</b></div>
      <div class="mp-hp-dimt">${d.text}</div>
    </div>`).join('');
    return `<div class="pp mp-hp">
      <div class="mp-hp-head"><b>${r.score.level}</b><span>${r.score.total}/100</span></div>
      <div class="mp-hp-sides">${side(r.a, '你')}${side(r.b, '对方')}</div>
      <div class="mp-hp-dims">${dims}</div>
      <div class="mp-hp-notes">${r.notes.map((n) => `<p>${n}</p>`).join('')}</div>
    </div>`;
  };

  // 奇门盘面事实：键值型数据用 dl 承载，与解读区的结论分开——
  // 「事实」可复核，「关系/结论」才进解读。
  pp.qimenFactsHTML = function (r) {
    if (!r || !r.palaces) return '';
    const row = (k, v) => `<div class="relation__row"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`;
    const rows = [
      ['局数', `${r.ju}${r.yuan ? `（${r.yuan}）` : ''}`],
      ['节气', `${r.jieqi || '—'}${r.jieqiTime ? `（${r.jieqiTime}）` : ''}`],
      ['四柱', `${r.siZhu ? `${r.siZhu.year} ${r.siZhu.month} ${r.siZhu.day} ${r.siZhu.time}` : '—'}`],
      ['值符', r.zhiFu ? `${r.zhiFu.star} · ${r.zhiFu.gong}宫` : '—'],
      ['值使', r.zhiShi ? `${r.zhiShi.gate} · ${r.zhiShi.gong}宫` : '—'],
      ['旬首', r.xunshou || '—'],
      ['空亡', (r.kongWang || []).join('') || '—'],
      ['驿马', r.ma && r.ma.zhi ? `${r.ma.zhi}${r.ma.gong ? `（${r.ma.gong}宫）` : ''}` : '—'],
      ['换局规则', r.juMethodNote || r.juMethod || '—'],
      ['晚子时', r.lateZiHourMode === 'next-day' ? '23:00 后归次日' : '23:00 后仍归当日'],
      ['击刑', (r.conditions && r.conditions.jiXing && r.conditions.jiXing.length)
        ? r.conditions.jiXing.map((x) => `${x.palace}宫${x.stem}`).join('、') : '本盘无'],
      ['入墓', (r.conditions && r.conditions.ruMu && r.conditions.ruMu.length)
        ? r.conditions.ruMu.map((x) => `${x.palace}宫${x.stem}`).join('、') : '本盘无'],
    ];
    return `<dl class="relation mp-qm-facts" aria-label="奇门盘面事实">${rows.map(([k, v]) => row(k, v)).join('')}</dl>`;
  };

  // 九宫按洛书方位排布：巽4 离9 坤2 / 震3 中5 兑7 / 艮8 坎1 乾6
  const QM_ROWS = [['4', '9', '2'], ['3', '5', '7'], ['8', '1', '6']];
  pp.qimenHTML = function (r) {
    const byGong = {};
    for (const p of r.palaces) byGong[p.palace] = p;
    const cell = (g) => {
      if (g === '5') {
        return `<div class="pp-qm-cell center">
          <div class="pp-qm-ju">${r.ju}</div>
          <div class="pp-qm-kv">${r.siZhu.year} ${r.siZhu.month}</div>
          <div class="pp-qm-kv">${r.siZhu.day} ${r.siZhu.time}</div>
          <div class="pp-qm-kv dim">${r.jieqi} ${r.yuan}</div>
        </div>`;
      }
      const p = byGong[g] || {};
      return `<div class="pp-qm-cell">
        <div class="pp-qm-top"><span class="god">${p.god || ''}</span><span class="mk">${p.kong ? '空' : ''}${p.ma ? '马' : ''}</span></div>
        <div class="pp-qm-mid"><span class="tp">${p.tianPan || ''}</span><span class="star">${p.star || ''}</span></div>
        <div class="pp-qm-mid"><span class="dp">${p.diPan || ''}</span><span class="gate">${p.gate || ''}</span></div>
        <div class="pp-qm-bot"><span>${p.anGan || ''}</span><span class="no">${g}</span></div>
      </div>`;
    };
    return `<div class="pp mp-qm">
      <div class="mp-qm-head">
        <b>${r.ju}</b>
        <span>${r.siZhu.year} ${r.siZhu.month} ${r.siZhu.day} ${r.siZhu.time}</span>
        <span>节气 ${r.jieqi}（${r.jieqiTime}）</span>
        <span>值符 ${r.zhiFu.star}（${r.zhiFu.gong}宫）　值使 ${r.zhiShi.gate}（${r.zhiShi.gong}宫）</span>
        <span>旬首 ${r.xunshou}　空亡 ${r.kongWang.join('') || '—'}　驿马 ${r.ma.zhi || '—'}</span>
      </div>
      <div class="mp-qm-grid">${QM_ROWS.map((row) => row.map(cell).join('')).join('')}</div>
      <div class="mp-qm-legend">上＝九星　中＝天盘干／八门　下＝地盘干／宫号　角落＝八神</div>
      <div class="mp-qm-rules">${r.rules.map((x) => `<p>${x}</p>`).join('')}</div>
    </div>`;
  };

  pp.ziweiHepanHTML = function (r) {
    const side = (x, who) => `<div class="mp-hp-side">
      <div class="mp-hp-who">${who}</div>
      <div class="mp-hp-gz">命宫 ${x.soul.branch}　夫妻 ${x.soul.branch ? '' : ''}${x.spouseStars.length ? '' : ''}</div>
      <div class="mp-hp-kv"><span>命宫主星</span><b>${x.soulStars.join('、') || '无正曜'}</b></div>
      <div class="mp-hp-kv"><span>夫妻宫主星</span><b>${x.spouseStars.join('、') || '无正曜'}</b></div>
      <div class="mp-hp-kv"><span>五行局</span><b>${x.bureau}</b></div>
      <div class="mp-hp-kv"><span>身宫</span><b>${x.body.branch}（${x.body.lands || '—'}）</b></div>
      <div class="mp-hp-kv"><span>生年四化</span><b>${x.natalSihua.join('、')}</b></div>
    </div>`;
    const dims = r.dimensions.map((d) => `<div class="mp-hp-dim">
      <div class="mp-hp-dimh"><span>${d.label}</span><b class="${d.score >= 10 ? 'good' : d.score < 0 ? 'bad' : ''}">${d.score >= 0 ? '+' : ''}${d.score}</b></div>
      <div class="mp-hp-dimt">${d.text}</div>
    </div>`).join('');
    const list = (who) => (r.interactions || []).filter((h) => h.who === who)
      .map((h) => `<li><b class="m-${h.mutagen}">${h.mutagen}</b>${h.star}：本命${h.ownPalace} → 对方${h.landingPalace || '盘外'}${h.strong ? '<i>（强）</i>' : ''}</li>`).join('');
    return `<div class="pp mp-hp">
      <div class="mp-hp-head"><b>${r.score.level}</b><span>${r.score.total}/100　紫微合盘</span></div>
      <div class="mp-hp-sides">${side(r.a, '你')}${side(r.b, '对方')}</div>
      <div class="mp-hp-dims">${dims}</div>
      <div class="mp-hp-inter">
        <div><div class="mp-hp-ith">你的四化 落在对方</div><ul>${list('你') || '<li>无</li>'}</ul></div>
        <div><div class="mp-hp-ith">对方的四化 落在你</div><ul>${list('对方') || '<li>无</li>'}</ul></div>
      </div>
      <div class="mp-hp-notes">${r.notes.map((n) => `<p>${n}</p>`).join('')}</div>
    </div>`;
  };

  /**
   * 人生运势曲线：大运作阶梯（一步十年），流年作折线，叠在同一坐标系。
   * 只吃引擎已算好的 luck.score / luck.tier，不新增任何判断。
   * @param {object} r compute('bazi') 的结果
   * @returns {string} 内联 SVG 区块；数据不足时返回空串（不画半张图）
   */
  pp.curveHTML = function (r) {
    const dyList = (r && r.dayun && Array.isArray(r.dayun.list)) ? r.dayun.list : [];
    const lnList = (r && Array.isArray(r.liunian)) ? r.liunian : [];
    // 至少要两步大运才画得出形状；流年可以有可以没有
    if (dyList.length < 2) return '';

    const num = (v) => (typeof v === 'number' && isFinite(v) ? v : 0);
    const dyScore = (d) => (d.luck ? num(d.luck.score) : 0);

    // ── 坐标范围 ──
    // 量程固定：引擎实测 score ∈ [-2, 4]（含调候修正），固定量程才能让不同盘之间可比
    // （若按各自极值自适应，每个盘的「平」位置都不一样，反而失去参照）
    const VMAX = 4.2;
    const VMIN = -2.2;
    // 起运年龄 → 覆盖到最后一运结束；流年可能超出大运末端，取并集
    const startAge = num(r.dayun.startAge && r.dayun.startAge.years);
    const dyEnd = dyList.length
      ? dyList[dyList.length - 1].startAge + 10
      : startAge + 80;
    const lnAges = lnList.map((l) => num(l.age)).filter((a) => a > 0);
    const a0 = Math.min(startAge, ...(lnAges.length ? lnAges : [startAge]));
    const a1 = Math.max(dyEnd, ...(lnAges.length ? lnAges : [dyEnd]));
    const span = Math.max(1, a1 - a0);

    // ── 画布 ──
    const W = 640, H = 190;
    const M = { t: 14, r: 16, b: 26, l: 30 };
    const pw = W - M.l - M.r;
    const ph = H - M.t - M.b;
    const X = (age) => M.l + ((age - a0) / span) * pw;
    const Y = (v) => M.t + ph - ((Math.max(VMIN, Math.min(VMAX, v)) - VMIN) / (VMAX - VMIN)) * ph;

    // ── 档位色带（背景）：大吉/吉 绿，大忌/忌 红，平 灰 ──
    // 档位实测区间：大吉 1.4~3.2｜吉 0.6~1.1｜平 -0.6~0.5｜忌 -1.3~-1.0｜大忌 -2.0~-1.6
    const BANDS = [
      { from: 1.2, to: VMAX, cls: 'b-good' },
      { from: 0.55, to: 1.2, cls: 'b-good' },
      { from: -0.8, to: 0.55, cls: 'b-flat' },
      { from: -1.45, to: -0.8, cls: 'b-bad' },
      { from: VMIN, to: -1.45, cls: 'b-bad' },
    ];
    const bands = BANDS.map((b) =>
      `<rect class="cv-band ${b.cls}" x="${M.l}" y="${Y(b.to).toFixed(1)}" width="${pw}" height="${(Y(b.from) - Y(b.to)).toFixed(1)}"/>`).join('');

    // ── 大运阶梯：每步占十年，起运点为阶跃左端 ──
    const stepW = (10 / span) * pw;
    const dyPts = [];
    dyList.forEach((d, i) => {
      const a = num(d.startAge);
      const v = dyScore(d);
      const xL = Math.max(M.l, X(a));
      const xR = Math.min(M.l + pw, X(a + 10));
      dyPts.push(`${xL.toFixed(1)},${Y(v).toFixed(1)}`);
      dyPts.push(`${xR.toFixed(1)},${Y(v).toFixed(1)}`);
    });
    // 阶梯折线 + 底部填充
    const dyLine = dyPts.length
      ? `<polyline class="cv-dy" points="${dyPts.join(' ')}"/>` : '';
    const dyFill = dyPts.length
      ? `<polygon class="cv-dyfill" points="${M.l},${(M.t + ph).toFixed(1)} ${dyPts.join(' ')} ${(M.l + pw).toFixed(1)},${(M.t + ph).toFixed(1)}"/>` : '';

    // ── 流年折线 ──
    const lnPts = lnList
      .filter((l) => l.luck && typeof l.luck.score === 'number')
      .map((l) => ({ x: X(num(l.age)), y: Y(num(l.luck.score)), y0: num(l.year), gz: l.ganzhi, tier: l.luck.tier, v: num(l.luck.score), age: num(l.age) }));
    const lnLine = lnPts.length > 1
      ? `<polyline class="cv-ln" points="${lnPts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')}"/>` : '';

    // 流年点：今年（最小年份）加粗描边，其余小点；每点带 tooltip
    const TIER_FILL = { 大吉: 'var(--lu)', 吉: 'var(--lu)', 平: 'var(--muted)', 忌: 'var(--red)', 大忌: 'var(--red)' };
    const curYear = lnPts.length ? Math.min(...lnPts.map((p) => p.y0)) : null;
    const dots = lnPts.map((p) => {
      const isNow = p.y0 === curYear;
      return `<circle class="cv-dot${isNow ? ' now' : ''}" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" fill="${TIER_FILL[p.tier] || 'var(--muted)'}"><title>${esc(`${p.y0}年（${p.age}岁）${p.gz}　${p.tier} ${p.v}`)}</title></circle>`;
    }).join('');

    // ── 轴 ──
    const axes = `<line class="cv-ax zero" x1="${M.l}" y1="${Y(0).toFixed(1)}" x2="${M.l + pw}" y2="${Y(0).toFixed(1)}"/>`
      + `<line class="cv-ax" x1="${M.l}" y1="${M.t}" x2="${M.l}" y2="${M.t + ph}"/>`;
    // 年龄刻度：控制在 8 个以内，避免标签重叠
    const tickStep = span > 60 ? 10 : 5;
    const ticks = [];
    for (let a = Math.ceil(a0 / tickStep) * tickStep; a <= a1; a += tickStep) {
      ticks.push(`<text class="cv-lbl age" x="${X(a).toFixed(1)}" y="${(M.t + ph + 13).toFixed(1)}" text-anchor="middle">${a}岁</text>`);
    }
    // 纵轴刻度只标三个：好 / 平 / 差
    const yLabels = `<text class="cv-lbl" x="${(M.l - 5).toFixed(1)}" y="${(Y(2.4) + 3).toFixed(1)}" text-anchor="end">吉</text>`
      + `<text class="cv-lbl" x="${(M.l - 5).toFixed(1)}" y="${(Y(0) + 3).toFixed(1)}" text-anchor="end">平</text>`
      + `<text class="cv-lbl" x="${(M.l - 5).toFixed(1)}" y="${(Y(-1.8) + 3).toFixed(1)}" text-anchor="end">忌</text>`;

    // 峰值/谷值标注：取自引擎已有 tier，不另算
    const sorted = dyList.slice().sort((a, b) => dyScore(b) - dyScore(a));
    const best = sorted[0];
    const worst = sorted[sorted.length - 1];
    const mark = best && dyScore(best) > 0.55
      ? `<text class="cv-lbl" x="${X(num(best.startAge) + 5).toFixed(1)}" y="${(Y(dyScore(best)) - 5).toFixed(1)}" text-anchor="middle">▲${best.startAge}岁 ${best.luck.tier}</text>` : '';
    const markLo = worst && dyScore(worst) < -0.8
      ? `<text class="cv-lbl" x="${X(num(worst.startAge) + 5).toFixed(1)}" y="${(Y(dyScore(worst)) + 11).toFixed(1)}" text-anchor="middle">▼${worst.startAge}岁 ${worst.luck.tier}</text>` : '';

    const legend = `<div class="cv-legend">
      <span><i style="background:var(--quan)"></i>大运（阶梯，一步十年）</span>
      <span><i style="background:var(--ke)"></i>流年（逐年折线）</span>
      <span>绿带＝吉　灰带＝平　红带＝忌</span>
    </div>`;

    const tip = `<div class="cv-tip">曲线只呈现引擎已给出的行运评分（${VMIN} ~ ${VMAX}），不预测具体事件；档位与依据见下方「大运 / 流年」各节。悬停看逐年详情。</div>`;

    return `<div class="mp-curve">
      <div class="mp-curve-h"><b>人生运势曲线</b><span>${a0}–${a1} 岁　${r.dayun.rule}，${startAge} 岁起运</span></div>
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="人生运势曲线：${a0} 到 ${a1} 岁的大运与流年评分走势">
        ${bands}${axes}${dyFill}${dyLine}${lnLine}${dots}${ticks.join('')}${yLabels}${mark}${markLo}
      </svg>
      ${legend}${tip}
    </div>`;
  };

  /**
   * 人生 K 线：逐年蜡烛图（实体 = 该岁相对上一岁的涨跌，影线 = 高低各 4 分的弹性）。
   * 与 curveHTML 的分工：curveHTML 是八字里的「大运阶梯 + 流年折线」；这张是同一批
   * 评分的 K 线形态，单独成块可直接截图，也嵌在八字结果底部。
   */
  let klineSeq = 0;
  pp.trendChart = function (r) {
    const pts = r && Array.isArray(r.points) ? r.points : [];
    if (pts.length < 2) return '';
    const segs = r && Array.isArray(r.segments) ? r.segments : [];
    const num = (v) => (typeof v === 'number' && isFinite(v) ? v : 0);
    const W = 720, H = 322;
    const M = { t: 34, r: 46, b: 66, l: 36 };
    const pw = W - M.l - M.r, ph = H - M.t - M.b;
    const n = pts.length;
    const step = pw / n;
    const X = (i) => M.l + (i + 0.5) * step;
    const Y = (v) => M.t + ph - (Math.max(0, Math.min(100, v)) / 100) * ph;
    const bodyW = Math.max(1.1, Math.min(10, step * 0.62));
    const sc = (p) => num(p.score);
    const yb = M.t + ph;
    const stripTop = yb + 20, stripH = 22;
    const clipId = `klclip${(klineSeq += 1)}`;

    // 大运交替底色 + 分界虚线 + 底部段名条（段名放条纹里，避开顶部高低岁标记）
    const bands = segs.map((s, i) => {
      const i0 = Math.max(0, s.startAge - 1);
      const i1 = Math.min(n - 1, s.endAge - 1);
      if (i1 < i0) return '';
      const x = M.l + i0 * step;
      const w = Math.max(0.6, (i1 - i0 + 1) * step);
      const tint = i % 2 === 1;
      const rect = tint
        ? `<rect class="kl-band" x="${x.toFixed(1)}" y="${M.t}" width="${w.toFixed(1)}" height="${ph}"/>`
        + `<rect class="kl-stripband" x="${x.toFixed(1)}" y="${stripTop}" width="${w.toFixed(1)}" height="${stripH}"/>` : '';
      const line = i === 0 ? ''
        : `<line class="kl-segline" x1="${x.toFixed(1)}" y1="${M.t}" x2="${x.toFixed(1)}" y2="${yb}"/>`;
      const cx = Math.min(Math.max(M.l + ((i0 + i1 + 1) / 2) * step, M.l + 22), M.l + pw - 22);
      return rect + line
        + `<text class="kl-seg" x="${cx.toFixed(1)}" y="${(stripTop + 15).toFixed(1)}" text-anchor="middle">${esc(s.ganZhi)}</text>`;
    }).join('');

    // 网格与纵轴刻度（0–100 固定量程，跨盘可比）
    const grid = [0, 25, 50, 75, 100].map((v) =>
      `<line class="kl-grid${v === 50 ? ' mid' : ''}" x1="${M.l}" y1="${Y(v).toFixed(1)}" x2="${M.l + pw}" y2="${Y(v).toFixed(1)}"/>`
      + `<text class="kl-lbl" x="${M.l - 6}" y="${(Y(v) + 3).toFixed(1)}" text-anchor="end">${v}</text>`).join('');

    // 蜡烛：影线 + 实体（影线夹在绘图区内，避免贴边溢出）
    const candles = pts.map((p, i) => {
      const k = p.kline || {};
      const o = num(k.open), c = num(k.close), hi = Math.min(100, num(k.high)), lo = Math.max(0, num(k.low));
      const up = c >= o;
      const yO = Y(o), yC = Y(c);
      const top = Math.min(yO, yC);
      const h = Math.max(0.8, Math.abs(yO - yC));
      const x = X(i);
      const title = `${p.age}岁（${p.year}年 ${p.ganZhi}）${c}分${p.dayunGanZhi ? ` · ${p.dayunGanZhi}运` : ''}`;
      return `<g class="kl-c${up ? ' up' : ' down'}"><title>${esc(title)}</title>`
        + `<line x1="${x.toFixed(2)}" y1="${Y(hi).toFixed(1)}" x2="${x.toFixed(2)}" y2="${Y(lo).toFixed(1)}"/>`
        + `<rect x="${(x - bodyW / 2).toFixed(2)}" y="${top.toFixed(1)}" width="${bodyW.toFixed(2)}" height="${h.toFixed(1)}" rx="0.7"/></g>`;
    }).join('');

    // 均线（5 / 10 年）：路径 + 末端数值标注（右端对齐，避免互相压字）
    const maSeries = (win) => {
      const out = [];
      for (let i = 0; i < n; i++) {
        if (i + 1 < win) continue;
        let sum = 0;
        for (let j = i + 1 - win; j <= i; j++) sum += sc(pts[j]);
        out.push({ i, v: sum / win });
      }
      return out;
    };
    const maPath = (win) => maSeries(win)
      .map((q, k) => `${k ? 'L' : 'M'}${X(q.i).toFixed(1)} ${Y(q.v).toFixed(1)}`).join(' ');
    const maLabel = (win, cls) => {
      const s = maSeries(win);
      if (!s.length) return '';
      const last = s[s.length - 1];
      return { cls, y: Y(last.v), text: `<text class="kl-ma-lbl ${cls}" x="${M.l + pw + 5}" y="${Y(last.v).toFixed(1)}" text-anchor="start">${last.v.toFixed(0)}</text>` };
    };
    const lab10 = maLabel(10, 'm10'), lab5 = maLabel(5, 'm5');
    const maLabels = (() => {
      if (!lab5 || !lab10) return `${lab10 ? lab10.text : ''}${lab5 ? lab5.text : ''}`;
      let y5 = lab5.y, y10 = lab10.y;
      if (Math.abs(y5 - y10) < 10) {
        const top = Math.min(y5, y10), bot = Math.max(y5, y10);
        y5 = top - 6; y10 = bot + 6;
      }
      return `<text class="kl-ma-lbl m10" x="${M.l + pw + 5}" y="${y10.toFixed(1)}" text-anchor="start">${maSeries(10).slice(-1)[0].v.toFixed(0)}</text>`
        + `<text class="kl-ma-lbl m5" x="${M.l + pw + 5}" y="${y5.toFixed(1)}" text-anchor="start">${maSeries(5).slice(-1)[0].v.toFixed(0)}</text>`;
    })();

    // 最高 / 最低岁
    let hiP = pts[0], loP = pts[0];
    for (const p of pts) {
      if (sc(p) > sc(hiP)) hiP = p;
      if (sc(p) < sc(loP)) loP = p;
    }
    const mark = (p, cls, dy) => {
      const i = pts.indexOf(p);
      const x = X(i), y = Y(sc(p));
      const tx = Math.min(Math.max(x, M.l + 26), M.l + pw - 26);
      // 最高点贴近顶部时标签改放到点下方，避免压住大运段名
      const d = cls === 'hi' ? (y - 8 < M.t + 6 ? 14 : dy) : (y + 12 > M.t + ph - 2 ? -8 : dy);
      return `<g class="kl-mark ${cls}"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2"/>`
        + `<circle class="ring" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.6"/>`
        + `<text x="${tx.toFixed(1)}" y="${(y + d).toFixed(1)}" text-anchor="middle">${p.age}岁 ${sc(p)}</text></g>`;
    };

    // 年龄刻度：跨度大时 10 岁一格，否则 5 岁；轴名放最底行，避免和刻度过早挤在一起
    const tickStep = n > 60 ? 10 : 5;
    const ages = pts.filter((p) => p.age % tickStep === 0).map((p) =>
      `<text class="kl-lbl age" x="${X(pts.indexOf(p)).toFixed(1)}" y="${(yb + 14).toFixed(1)}" text-anchor="middle">${p.age}</text>`).join('');
    const xNote = `<text class="kl-lbl axis" x="${M.l}" y="${(H - 6).toFixed(1)}">年龄（岁）</text>`
      + `<text class="kl-lbl axis" x="${M.l + pw}" y="${(H - 6).toFixed(1)}" text-anchor="end">每岁一分 · 满分 100</text>`;

    const legend = `<div class="kl-legend"><span><i class="up"></i>阳线：比上一岁高</span>`
      + `<span><i class="down"></i>阴线：比上一岁低</span>`
      + `<span><i class="m5"></i>5 年均线</span><span><i class="m10"></i>10 年均线</span>`
      + '<span>虚线＝大运交界</span></div>';

    return `<div class="mp-kline-fig">
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="人生K线：1 到 ${n} 岁的逐年评分蜡烛图">
        <defs><clipPath id="${clipId}"><rect x="${M.l}" y="${M.t}" width="${pw}" height="${ph}"/></clipPath></defs>
        ${bands}${grid}
        <g clip-path="url(#${clipId})">
          ${candles}
          <path class="kl-ma m10" d="${maPath(10)}"/><path class="kl-ma m5" d="${maPath(5)}"/>
        </g>
        ${maLabels}
        ${mark(hiP, 'hi', -8)}${mark(loP, 'lo', 12)}
        ${ages}${xNote}
      </svg>${legend}</div>`;
  };

  /** 人生 K 线整块：图 + 大运分段 + 高低年份 + 口径说明；数据不足时退回文字摘要 */
  pp.trendHTML = function (r) {
    if (!r) return '';
    const chart = pp.trendChart(r);
    if (!chart) return pp.quickHTML(r);
    const segs = Array.isArray(r.segments) ? r.segments : [];
    const hl = (r.highlights && typeof r.highlights === 'object') ? r.highlights : {};
    const meta = r.meta || {};
    const st = meta.strength || {};
    const chips = segs.map((s) => `<span class="kl-chip">${esc(s.ganZhi)}<em>${s.startAge}–${s.endAge}</em></span>`).join('');
    const best = (Array.isArray(hl.best) ? hl.best : []).map((x) => `<div class="kl-hl hi">${esc(x)}</div>`).join('');
    const worst = (Array.isArray(hl.worst) ? hl.worst : []).map((x) => `<div class="kl-hl lo">${esc(x)}</div>`).join('');
    const note = meta.boundaryNote ? `<div class="mp-kline-note">${esc(meta.boundaryNote)}</div>`
      : (hl.suppressed ? `<div class="mp-kline-note">${esc(hl.suppressed)}</div>` : '');
    // 统计条：全段均值 / 最好大运 / 最差大运 / 波动幅度。旺衰贴阈值时不给「最好/最差大运」顺位
    const pts = Array.isArray(r.points) ? r.points : [];
    const scoreOf = (p) => (typeof p.score === 'number' && isFinite(p.score) ? p.score : 0);
    const scores = pts.map(scoreOf);
    const mean = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    const span = scores.length ? Math.max(...scores) - Math.min(...scores) : 0;
    const segAvg = segs.map((s) => {
      const inside = pts.filter((p) => p.age >= s.startAge && p.age <= s.endAge).map(scoreOf);
      return { ganZhi: s.ganZhi, v: inside.length ? inside.reduce((a, b) => a + b, 0) / inside.length : 0 };
    }).filter((x) => x.v > 0).sort((a, b) => b.v - a.v);
    const blocked = !!(st.boundary || hl.suppressed);
    const statCells = [`<span><em>全段均值</em><b>${mean.toFixed(0)}</b></span>`];
    if (!blocked && segAvg.length) {
      statCells.push(`<span><em>最好大运</em><b class="hi">${esc(segAvg[0].ganZhi)} ${segAvg[0].v.toFixed(0)}</b></span>`);
      statCells.push(`<span><em>最差大运</em><b class="lo">${esc(segAvg[segAvg.length - 1].ganZhi)} ${segAvg[segAvg.length - 1].v.toFixed(0)}</b></span>`);
    }
    statCells.push(`<span><em>波动幅度</em><b>${span.toFixed(0)}</b></span>`);
    const stats = `<div class="kl-stats">${statCells.join('')}</div>`;
    return `<section class="mp-kline" aria-label="人生K线结果">
      <div class="mp-kline-h"><b>人生 K 线</b><span>${esc(meta.birth || '')}　日主 ${esc(meta.dayMaster || '')}　${esc(st.level || '')}${st.score ? `（${st.score}）` : ''}</span></div>
      ${chart}
      ${stats}
      ${chips ? `<div class="kl-segs">${chips}</div>` : ''}
      ${best || worst ? `<div class="kl-hls">${best}${worst}</div>` : ''}
      ${note}
      <div class="mp-kline-tip">逐岁分数由大运与流年十神按固定表确定性计分（1–100），只表五行力量的顺逆，不预测具体事件；旺衰落在换档阈值附近时，不出高低年份结论。</div>
    </section>`;
  };

  /** 称骨：四项骨重 + 合计 + 通行本歌诀原文 + 白话释义 */
  pp.chengguHTML = function (r) {
    if (!r) return '';
    const w = r.weights || {};
    const song = r.song || {};
    const cells = ['year', 'month', 'day', 'hour'].map((k) => {
      const x = w[k] || { label: '', qian: 0 };
      const name = String(x.label || '').split(' ')[0] || '';
      const val = String(x.label || '').split(' ')[1] || '';
      return `<div class="cg-cell"><em>${esc(name)}</em><b>${esc(val)}</b></div>`;
    }).join('');
    const verse = String(song.text || '');
    const lines = verse ? verse.replace(/[。]$/, '').split('；').map((s, i) => `<span>${esc(s)}${i === 0 ? '；' : '。'}</span>`).join('') : '';
    const band = r.verdict && r.verdict.band ? r.verdict.band : '';
    return `<section class="mp-cg" aria-label="称骨结果">
      <div class="mp-cg-h"><b>称骨</b><span>${esc(r.lunar && r.lunar.text ? r.lunar.text : '')}</span></div>
      <div class="mp-cg-w">${cells}</div>
      <div class="mp-cg-tot"><em>骨重合计</em><b>${esc(r.total && r.total.label ? r.total.label : '')}</b>${band ? `<i>${esc(band)}</i>` : ''}</div>
      <div class="mp-cg-song"><div class="mp-cg-song-h">称骨歌 · ${esc(r.total && r.total.label ? r.total.label : '')}</div>
        <div class="mp-cg-verse">${lines || '<span class="mp-cg-miss">该骨重未见通行本歌诀</span>'}</div>
        <div class="mp-cg-plain"><em>释义</em>${esc(song.plain || '')}</div></div>
      ${r.verdict && r.verdict.text ? `<div class="mp-cg-band"><em>分档</em>${esc(r.verdict.text)}</div>` : ''}
      <div class="mp-cg-note">骨重与歌诀为通行本口径（各版本歌诀有异文，断句标点已统一）；释义为白话自撰，只作字面直解，属民俗娱乐参考，不构成命运断言。</div>
    </section>`;
  };

  pp.nameHTML = function (r) {
    if (!r) return '';
    const ELC = { 木: 'wood', 火: 'fire', 土: 'earth', 金: 'metal', 水: 'water' };
    const elChip = (e) => (e === '未收录'
      ? '<span class="mp-nm-el">未收录</span>'
      : `<span class="mp-nm-el wx-${ELC[e] || 'earth'}">${esc(e)}</span>`);
    const head = (title, sub) => `<div class="mp-nm-h"><b>${esc(title)}</b>${sub ? `<i>${esc(sub)}</i>` : ''}</div>`;
    if (r.action === 'generate') {
      const fav = r.bazi && r.bazi.favorable ? r.bazi.favorable.join('、') : '';
      const cands = (r.candidates || []).map((c) => `<div class="mp-nm-c"><b>${esc(c.name)}</b><span class="mp-nm-els">${c.chars.map((x) => elChip(x.element)).join('')}</span><em>${esc(c.chars.map((x) => x.char + '·' + x.meaning).join('　'))}</em></div>`).join('');
      return `<section class="mp-nm" aria-label="候选名">
        ${head('候选名', `姓 ${r.surname}（${r.gender}）${fav ? `　喜用 ${fav}` : ''}`)}
        <div class="mp-nm-cand">${cands}</div>
        <div class="mp-nm-note">${(r.notes || []).map((n) => '※ ' + esc(n)).join('<br>')}</div>
      </section>`;
    }
    const rows = (r.chars || []).map((c) => {
      const fit = c.favorable === true ? '<span class="mp-nm-fit ok">合喜用</span>'
        : c.favorable === false ? '<span class="mp-nm-fit no">不合喜用</span>'
          : '<span class="mp-nm-fit">不判</span>';
      const src = c.source === 'user' ? '用户指定' : c.source === 'lib' ? '字库' : '未收录';
      const sug = c.suggest && c.suggest.length
        ? `<div class="mp-nm-sug"><b>可换</b>${c.suggest.map((x) => `<span class="wx-${ELC[x.element] || 'earth'}">${esc(x.char)}（${esc(x.element)}）</span>`).join('')}</div>`
        : '';
      return `<div class="mp-nm-row"><div class="mp-nm-ch">${esc(c.char)}</div>
        <div class="mp-nm-b"><div class="mp-nm-t">${elChip(c.element)}<span>${esc(src)}</span>${fit}</div>
        <div class="mp-nm-m">${esc(c.meaning)}</div>${sug}</div></div>`;
    }).join('');
    const bz = r.bazi
      ? `<div class="mp-nm-m">八字：${esc(r.bazi.dayMaster && r.bazi.dayMaster.stem ? `${r.bazi.dayMaster.stem}（${r.bazi.dayMaster.element}）` : String(r.bazi.dayMaster || ''))}　${esc(r.bazi.strength ? `${r.bazi.strength.level}（${r.bazi.strength.score}）` : '')}　喜用 ${esc((r.bazi.favorable || []).join('、'))}</div>
         <div class="mp-nm-m">${esc(r.bazi.basis || '')}</div>`
      : '';
    return `<section class="mp-nm" aria-label="名字评估">
      ${head(r.fullName || '', `字库 ${r.stats && r.stats.libSize ? r.stats.libSize : ''} 字${r.stats && r.stats.unknown ? `　未收录 ${r.stats.unknown}` : ''}`)}
      ${rows}
      ${bz}
      <div class="mp-nm-verd">${esc(r.verdict || '')}</div>
      <div class="mp-nm-note">${(r.notes || []).map((n) => '※ ' + esc(n)).join('<br>')}</div>
    </section>`;
  };

  pp.baziHTML = function (r) {
    const cols = [['year', '年柱'], ['month', '月柱'], ['day', '日柱'], ['hour', '时柱']];
    const SHORT = { year: '年', month: '月', day: '日', hour: '时' };
    const ELC = { 木: 'wood', 火: 'fire', 土: 'earth', 金: 'metal', 水: 'water' };
    // 十神按五类分组上色：比劫 / 食伤 / 财 / 官杀 / 印。低饱和，避免抢干支五行主色
    const TG = {
      比肩: 'tg-bi', 劫财: 'tg-bi',
      食神: 'tg-shi', 伤官: 'tg-shi',
      偏财: 'tg-cai', 正财: 'tg-cai',
      七杀: 'tg-guan', 正官: 'tg-guan',
      偏印: 'tg-yin', 正印: 'tg-yin',
    };
    const tg = (name) => `<span class="tg ${TG[name] || ''}">${name}</span>`;
    const el = (e) => `<span class="wx-${ELC[e] || 'earth'}">${wxIcon(e)}${e}</span>`;
    // 神煞：悬停显示「类别·查法来源查目标｜查法口诀」
    const ssTag = (x) => `<span class="ss-s ${x.luck || 'neutral'}" title="${esc(`${x.cat} · ${x.via}查${x.target} ｜ ${x.rule}`)}">${x.name}</span>`;
    // data-c：竖屏 2×2 重排时每格左上角标注柱名（桌面端不显示）
    const line = (label, fn) => `<tr><td class="bz-lbl">${label}</td>${cols.map(([k]) => `<td data-c="${SHORT[k]}">${fn(r.pillars[k], k)}</td>`).join('')}</tr>`;
    const head = `<thead><tr><th></th>${cols.map(([k, n]) => `<th${k === 'day' ? ' class="bz-hdr-day"' : ''}>${n}</th>`).join('')}</tr></thead>`;
    // 五行旺相休囚死：以月令当令五行为基准，沿生克关系把其余四行推出来
    const SEASON_EL = { 寅: '木', 卯: '木', 巳: '火', 午: '火', 申: '金', 酉: '金', 亥: '水', 子: '水', 辰: '土', 戌: '土', 丑: '土', 未: '土' };
    const GEN = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
    const OVR = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };
    const seasonEl = SEASON_EL[r.pillars.month.branch] || '土';
    const WX_ALL = ['木', '火', '土', '金', '水'];
    const stateOf = (e) => (e === seasonEl ? '旺'
      : GEN[seasonEl] === e ? '相'
        : GEN[e] === seasonEl ? '休'
          : OVR[e] === seasonEl ? '囚' : '死');
    const wxRow = `<tr><td class="bz-lbl">五行</td><td class="bz-wxs" colspan="4">${
      ['旺', '相', '休', '囚', '死'].map((st) => {
        const e = WX_ALL.find((x) => stateOf(x) === st) || seasonEl;
        return `<i><b class="wx-${ELC[e]}">${e}</b><em>${st}</em></i>`;
      }).join('')}</td></tr>`;
    const rows = [
      line('十神', (p, k) => (k === 'day'
        ? `<span class="bz-zhuri">${r.input.gender === 'male' ? '元男' : '元女'}</span>`
        : (p.stemTenGod ? tg(p.stemTenGod) : '<span class="pp-dim">—</span>'))),
      line('天干', (p) => `<span class="bz-big ${'wx-' + ELC[p.stemElement]}">${p.stem}</span>`),
      line('地支', (p) => `<span class="bz-big ${'wx-' + ELC[p.branchElement]}">${p.branch}</span>`),
      // 藏干按「干·五行」一行一个，跟着五行上色
      line('藏干', (p) => p.hidden.map((x) => `<i class="bz-cg wx-${ELC[x.element]}">${x.stem}·${x.element}</i>`).join('')),
      line('支神', (p) => p.hidden.map((x) => tg(x.tenGod)).join('<br>')),
      line('纳音', (p) => p.nayin),
      line('空亡', (p) => `<span class="pp-dim">${p.kongwang.join('')}</span>`),
      line('地势', (p) => p.dishi),
      line('自坐', (p) => p.zizuo),
      line('神煞', (p) => (p.shenshaDetail && p.shenshaDetail.length
        ? `<span class="pp-ss">${p.shenshaDetail.map(ssTag).join('')}</span>`
        : '<span class="pp-dim">—</span>')),
      wxRow,
    ].join('');
    const wx = Object.entries(r.wuxing).map(([k, v]) => `<span class="pp-chip wx-${ELC[k]}">${wxIcon(k)}${k} ${v}</span>`).join('');

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
    const cli = r.climate || (fr.yongshen && fr.yongshen.climate) || null;
    const cliCard = cli ? (() => {
      const pct = Math.max(2, Math.min(98, Math.round(((Number(cli.temp) || 0) + 3) / 6 * 100)));
      const need = cli.need ? `<em>调候取</em><b>${esc(cli.need.stem + cli.need.element)}</b>` : '<em>气候平和</em>';
      const avoid = cli.need ? `<em>忌</em><b>${esc(cli.avoidElement)}</b>` : '';
      const ev = (cli.evidence || []).length ? `<em>依据</em><span>${esc(cli.evidence.join('、'))}</span>` : '';
      const pri = cli.priority === '调候优先' ? '<span class="mp-cli-p">调候优先</span>' : '<span class="mp-cli-p">扶抑为主</span>';
      const qt = r.frame && r.frame.yongshen && r.frame.yongshen.qt;
      const qtCard = qt ? `<div class="mp-qt">
          <div class="mp-qt-h"><b>穷通宝鉴</b><span>${esc(qt.label)}</span></div>
          <div class="mp-qt-y"><em>用神</em>${qt.yong.map((y, i) => `<b class="${i === 0 ? 'first' : ''}">${esc(y)}</b>`).join('')}<em>首取 ${esc(qt.primary)}</em></div>
          <div class="mp-qt-q" title="${esc(qt.quote)}">「${esc(qt.quote)}」<span>第 ${qt.chapter} 章${qt.note ? ' · ' + esc(qt.note) : ''}</span></div>
        </div>` : '';
      return `<section class="mp-cli" aria-label="寒暖燥湿">
        <div class="mp-cli-h"><b>寒暖燥湿</b><span class="mp-cli-k">${esc(cli.label || '')}</span>${pri}</div>
        <div class="mp-cli-bar" title="寒 ← → 热"><i style="left:${pct}%"></i></div>
        <div class="mp-cli-axis"><span>寒</span><span>平</span><span>热</span></div>
        <div class="mp-cli-row">${need}${avoid}${ev}</div>
        <div class="mp-cli-narr">${esc(cli.narration || '')}</div>
        ${qtCard}
      </section>`;
    })() : '';
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
        <div class="ssx-h"><b>神煞全览</b><span>共 ${r.shensha.count} 见 · ${ssGroups.length} 类 · 悬停看查法</span></div>
        ${ssGroups.map((g) => `<div class="pp-ssg"><span class="ssg-gt">${g.cat}</span><span class="ssg-gi">${g.items.map((i) => `<span class="pp-ssi ${i.luck || 'neutral'}" title="${esc(`${i.via}查${i.target} ｜ ${i.rule}`)}">${i.name}<em>${i.pillars.map((k) => SHORT[k] || '').join('')}</em></span>`).join('')}</span></div>`).join('')}
        <div class="ssx-h" style="border-top:none;padding-top:4px;margin-top:4px">神煞只作参考，吉凶仍须看格局、旺衰与行运。</div>
      </div>` : '';
    return `<div class="pp" style="padding:12px">
      <table class="pp-bz">${head}<tbody>${rows}</tbody></table>
      <div class="pp-rel"><div><b>天干</b>${(r.relations && r.relations.stems.length) ? r.relations.stems.join(' · ') : '—'}</div>
      <div><b>地支</b>${(r.relations && r.relations.branches.length) ? r.relations.branches.join(' · ') : '—'}</div></div>
      ${str}
      ${sect('格局', gj)}
      ${sect('用神', ys)}
      ${cliCard}
      ${(Array.isArray(r.classics) && r.classics.length) ? `<section class="mp-cl" aria-label="古籍原文">
        <div class="mp-cl-h"><b>古籍原文</b><span>照录通行本，释义为白话自撰</span></div>
        ${r.classics.map((e) => `<div class="mp-cl-e">
          <div class="mp-cl-t"><b>${esc((e.book === 'ziping' ? '子平真诠' : '滴天髓') + '·' + e.chapter)}</b></div>
          <div class="mp-cl-q">「${esc(e.quote)}」</div>
          <div class="mp-cl-p">${esc(e.plain)}</div>
        </div>`).join('')}
      </section>` : ''}
      ${sect('五行与十神', `<div class="pp-chips">${wx}</div>${gods}`)}
      ${sect('大运', `${pp.curveHTML(r)}<div class="pp-chips">${dy}</div>`)}
      ${ln ? sect('流年', ln) : ''}
      ${r.palaces ? sect('胎元与命身宫', `<div class="pp-chips">
        <span class="pp-chip" title="${r.palaces.taiyuan.note}">胎元 ${r.palaces.taiyuan.ganzhi}</span>
        <span class="pp-chip" title="${r.palaces.minggong.note}">命宫 ${r.palaces.minggong.ganzhi}</span>
        <span class="pp-chip" title="${r.palaces.shengong.note}">身宫 ${r.palaces.shengong.ganzhi}</span>
      </div>`) : ''}
      ${ssx}
      <div style="margin-top:8px;font-size:12px;color:var(--muted)">上一节 ${r.jieqi.previous.name} ${r.jieqi.previous.time}　下一节 ${r.jieqi.next.name} ${r.jieqi.next.time}　${r.dayun.rule}，${r.dayun.startAge.years}岁起运</div>
    </div>`;
  };

  // ── 解析与详解：把 interpret() 的结构化结果渲染成卡片 ──
  const MT_LABEL = { natal: '命盘解析', divination: '卦象解析', card: '牌阵解析' };

  /**
   * @param {object} it interpret() 的结果
   * @param {object} [opt] { folded 是否收起 } —— 桌面默认展开、竖屏默认收起由调用方按视口决定
   */
  pp.interpretHTML = function (it, opt) {
    // 解析生成失败时 dimensions 为空但带 error：这种情况也要把壳渲染出来，否则用户只看到"没有解析"
    if (!it) return '';
    const hasBody = (it.dimensions && it.dimensions.length) || (it.sections && it.sections.length);
    if (!hasBody && !it.error && !it.answer) return '';
    const folded = !!(opt && opt.folded);
    const dims = (it.dimensions || []).map((d, i) => `<div class="mp-it-dim${d.focused ? ' focus' : ''}">
      <div class="mp-it-dh"><span class="mp-it-dno">${i + 1}</span><span class="mp-it-dlabel">${esc(d.label)}</span>${d.focused ? '<span class="mp-it-focus">最贴近你的问题</span>' : ''}${d.confidence ? `<span class="mp-it-conf c-${esc(d.confidence)}">置信度 ${esc(d.confidence)}</span>` : ''}</div>
      ${d.plain ? `<div class="mp-it-dplain">${esc(d.plain)}</div>` : ''}
      <div class="mp-it-dtext">${esc(d.text)}</div>
      ${(d.evidence && d.evidence.length) ? `<details class="mp-it-ev"><summary>依据 · ${esc(d.evidence.length)} 条盘面事实</summary><div class="mp-it-ev-body">${d.evidence.map((x) => `<span class="mp-it-ev-item">${esc(x)}</span>`).join('')}<span class="mp-it-ev-tech">技法：${esc(it.technique || it.systemLabel || '')}</span></div></details>` : ''}
      ${(d.knowledge && d.knowledge.length) ? `<div class="mp-it-know">${d.knowledge.map((k) => `<div class="know-row"><span class="know-status ${k.status}">${esc(k.statusLabel)}</span><span class="know-body"><b>${esc(k.gist)}</b>${esc(k.detail)}${k.source ? `<i>出处：${esc(k.source)}</i>` : ''}${k.note ? `<em>注：${esc(k.note)}</em>` : ''}</span></div>`).join('')}</div>` : ''}
      ${d.advice ? `<div class="mp-it-adv"><b>建议</b>${esc(d.advice)}</div>` : ''}
    </div>`).join('');
    // 一页读懂：报告顶部五条结论（整体/事业/财富/感情/节奏）
    const outline = (it.outline && it.outline.length)
      ? `<div class="mp-outline"><div class="mp-outline-h">一页读懂</div>${it.outline.map((o) => `<div class="mp-outline-row"><b>${esc(o.label)}</b><span>${esc(o.text)}</span></div>`).join('')}</div>`
      : '';
    // 目录：点击跳到对应分节（面板内锚点；打印时隐藏）
    const toc = (it.sections && it.sections.length)
      ? `<nav class="mp-toc" aria-label="报告目录">${it.sections.map((s) => `<a href="#mp-sec-${esc(s.key)}">${esc(s.label)}</a>`).join('')}</nav>`
      : '';
    // 三张表：大运 / 流年 / 触发事件（数据由引擎给出，这里只渲染）
    const tables = (it.tables && it.tables.length)
      ? `<div class="mp-tables">${it.tables.filter((t) => Array.isArray(t.rows) && t.rows.length).map((t) => `<div class="mp-table-wrap">
          <div class="mp-table-h">${esc(t.title)}</div>
          <div class="mp-table-scroll"><table class="mp-table">
            <thead><tr>${t.columns.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead>
            <tbody>${t.rows.map((row) => `<tr>${row.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody>
          </table></div>
        </div>`).join('')}</div>`
      : '';
    const secs = (it.sections && it.sections.length)
      ? `<div class="mp-it-secs">${it.sections.map((s) => `<div class="mp-it-sec" id="mp-sec-${esc(s.key)}">
        <div class="mp-it-sh">${esc(s.label)}</div>
        <div class="mp-it-stext">${esc(s.text)}</div>
      </div>`).join('')}</div>`
      : '';
    const tags = [it.systemLabel, MT_LABEL[it.moduleType] || it.moduleType].filter(Boolean);
    // 回显所问之事与询问方向：先让用户确认解读是围绕什么展开的
    const ask = it.ask;
    // 只有真的填了问题、或选了非「综合」方向时才回显；命盘类不问事，不显示这一行
    const askLine = (ask && (ask.question || (ask.direction && ask.direction !== 'general')))
      ? `<div class="mp-it-ask"><span class="ask-q">问题：${ask.question ? esc(ask.question) : '<span class="ask-none">（未填写）</span>'}</span><span class="ask-sep">｜</span><span class="ask-d">询问方向：${esc(ask.directionLabel || '综合')}</span></div>`
      : '';
    // 直答与说人话：放在正文最前，先给结论再给推导
    const answer = it.answer ? `<div class="mp-it-ans"><b>先答所问</b>${esc(it.answer)}</div>` : '';
    const plain = it.plain ? `<div class="mp-it-plain"><b>说人话</b>${esc(it.plain)}</div>` : '';
    const fu = (it.followups && it.followups.length)
      ? `<div class="mp-it-fu"><b>还可以这样追问</b><ul>${it.followups.map((q) => `<li>${esc(q)}</li>`).join('')}</ul></div>`
      : '';
    const gloss = (it.glossary && it.glossary.length)
      ? `<details class="mp-it-gloss"><summary>名词解释（${it.glossary.length} 条）</summary>${it.glossary.map((g) => `<div><span>${esc(g.term)}</span>${esc(g.plain)}</div>`).join('')}</details>`
      : '';
    return `<div class="mp-it${folded ? ' folded' : ''}">
      <button type="button" class="mp-it-head" aria-expanded="${folded ? 'false' : 'true'}">
        <span class="mp-it-arrow" aria-hidden="true">▾</span>
        <span class="mp-it-title">解析与详解</span>${tags.map((t) => `<span class="mp-it-tag">${esc(t)}</span>`).join('')}
        <span class="mp-it-hint">${folded ? '点击展开' : '点击收起'}</span>
      </button>
      <div class="mp-it-wrap">
        ${askLine}
        ${answer}
        ${plain}
        ${it.lead ? `<div class="mp-it-lead">${esc(it.lead)}</div>` : ''}
        ${it.error ? `<div class="mp-it-err"><b>⚠ 解析生成失败</b>${esc(it.error)}——上方盘面数据本身可用</div>` : ''}
        ${outline}
        ${toc}
        <div class="mp-it-body">${dims}</div>
        ${secs}
        ${tables}
        ${fu}
        ${gloss}
        <div class="mp-it-dis">${esc(it.disclaimer)}</div>
      </div>
    </div>`;
  };

  /** 追问结果：只展示问题、答案、依据与置信度；找不到时明确说找不到 */
  pp.followupHTML = function (fx) {
    if (!fx) return '';
    const ev = (fx.evidence && fx.evidence.length)
      ? `<div class="mp-fu-ev">依据：${fx.evidence.map((x) => esc(x)).join('；')}　置信度：${esc(fx.confidence || '弱')}</div>`
      : '';
    return `<div class="mp-fu${fx.ok ? '' : ' miss'}">
      <div class="mp-fu-h">追问 · ${esc(fx.question)}</div>
      <div class="mp-fu-a">${esc(fx.answer)}</div>
      ${ev}
    </div>`;
  };

  /** 结果 + 解析一并渲染；opt 透传给 interpretHTML（折叠初始状态） */
  pp.resultWithInterpret = function (html, it, opt) {
    return (html || '') + pp.interpretHTML(it, opt);
  };

  /**
   * 黄历卡片：日期/农历 + 干支值日 + 宜忌 + 四格（二十八宿/胎神/纳音/冲煞）
   * + 吉神方位 + 时辰吉凶 + 吉配生肖 + 每日一卦。数据全由引擎给，渲染只做排版。
   */
  pp.almanacHTML = function (r) {
    if (!r || !r.meta) return pp.quickHTML(r);
    const g = r.ganzhi || {};
    const god = r.dayGod || null;
    const chips = (list, cls) => (list || []).map((x) => `<span class="mp-al-chip${cls ? ` ${cls}` : ''}">${esc(x)}</span>`).join('');
    const cell = (k, v) => (v ? `<div class="mp-al-cell"><em>${esc(k)}</em><b>${esc(v)}</b></div>` : '');
    const xiu = r.xiu ? `${r.xiu.name}宿（${r.xiu.luck}·${r.xiu.zheng}·${r.xiu.animal}）` : '';
    const nayin = r.nayin && r.nayin.day ? r.nayin.day.name : '';
    const chong = r.chong ? `${r.chong.text}${r.chong.sha ? ` ${r.chong.sha}` : ''}` : '';
    const hours = (r.hours || []).map((h) => `<span class="mp-al-hour ${h.luck === '吉' ? 'good' : 'bad'}">`
      + `<i>${esc(h.zhi)}</i><em>${esc((h.ganZhi || '').slice(0, 1))}</em><b>${esc(h.shen || '')}</b>`
      + `<u>${esc(h.luck || '')}</u></span>`).join('');
    const pos = r.positions || {};
    const posRow = (k, v) => (v ? `<span class="mp-al-chip">${esc(k)}·${esc(typeof v === 'string' ? v : v.dir || '')}</span>` : '');
    const lucky = r.lucky || {};
    const godBadge = god ? `<span class="mp-al-badge ${god.luck === '吉' ? 'good' : 'bad'}">${esc(god.name)}·${esc(god.type)}·${esc(god.luck)}</span>` : '';
    return `<section class="mp-al" aria-label="黄历">
      <div class="mp-al-h"><b>${esc(r.meta.date || '')}</b><i>${esc(r.meta.weekday || '')}　${esc((r.lunar || {}).text || '')}</i></div>
      <div class="mp-al-gz">${esc(g.year || '')}年　${esc(g.month || '')}月　${esc(g.day || '')}日　属${esc(g.shengXiao || '')}　建除 ${esc(r.zhiXing || '')}日　${godBadge}</div>
      <div class="mp-al-yiji">
        <div class="mp-al-col"><em>宜</em><div class="mp-al-chips">${chips(r.yi)}</div></div>
        <div class="mp-al-col"><em>忌</em><div class="mp-al-chips">${chips(r.ji)}</div></div>
      </div>
      <div class="mp-al-grid">${cell('二十八宿', xiu)}${cell('日柱纳音', nayin)}${cell('胎神', r.taiShen)}${cell('冲煞', chong)}</div>
      <div class="mp-al-row"><em>吉神方位</em><div class="mp-al-chips">${posRow('喜神', pos.xiShen)}${posRow('财神', pos.caiShen)}${posRow('福神', pos.fuShen)}${posRow('阳贵', pos.yangGui)}${posRow('阴贵', pos.yinGui)}</div></div>
      <div class="mp-al-row"><em>时刻吉凶</em><div class="mp-al-hours">${hours}</div></div>
      <div class="mp-al-row"><em>吉配生肖</em><div class="mp-al-chips">${lucky.liuhe ? `<span class="mp-al-chip">六合·${esc(lucky.liuhe)}</span>` : ''}${chips(lucky.sanhe || [])}</div></div>
      ${r.dailyHexagram ? `<div class="mp-al-hex">每日一卦：<b>${esc(r.dailyHexagram.name)}</b>　${esc(r.dailyHexagram.meaning || '')}</div>` : ''}
      <div class="mp-al-note">${esc((r.meta && r.meta.scope) || '')}</div>
    </section>`;
  };

  /**
   * 速查类（择日/称骨/小六壬/星座/生命数字/人生K线/风水/起名/公农历）的通用渲染：
   * 这些体系给的是确定性结果，不做命盘式解读，直接把引擎摘要按等宽文本呈现。
   */
  pp.quickHTML = function (r) {
    if (!r) return '';
    const LABEL = {
      almanac: '黄历', zeri: '择日', chenggu: '称骨', xiaoliuren: '小六壬',
      star: '星座', numerology: '生命数字', trend: '人生 K 线', fengshui: '风水', name: '起名', convert: '公农历转换',
    };
    const title = LABEL[r.system] || '速查';
    const text = r.summary || '';
    const body = text ? `<pre class="mp-quick-pre">${esc(text)}</pre>` : '';
    return `<section class="mp-quick" aria-label="${esc(title)}结果">
      <div class="mp-quick-h"><b>${esc(title)}</b></div>
      ${body}
    </section>`;
  };

  /**
   * 生成「摘要卡」PNG（dataURL）。零依赖：用 Canvas 2D 画，不引第三方库、不做 DOM→SVG 截图。
   * 内容：标题 + 一页读懂五条 + 三张表里第一张的前 6 行 + 免责声明。
   * 浏览器不支持 canvas 时返回空串，调用方据此禁用「存为长图」。
   * @param {object} r compute 的结果
   * @param {object} it interpret 的结果（要 outline / tables）
   * @returns {string} data:image/png;base64,… 或 ''
   */
  pp.summaryCardPNG = function (r, it) {
    try {
      if (typeof document === 'undefined' || !document.createElement) return '';
      const outline = (it && it.outline) || [];
      const tables = ((it && it.tables) || []).filter((t) => Array.isArray(t.rows) && t.rows.length);
      const systemLabel = (it && it.systemLabel) || (r && r.system) || '命理报告';
      const W = 900;
      const PAD = 44;
      const line = 26;
      const font = (size, bold) => `${bold ? '600 ' : ''}${size}px "PingFang SC","Microsoft YaHei","Noto Sans CJK SC",sans-serif`;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext ? canvas.getContext('2d') : null;
      if (!ctx) return '';
      const wrap = (text, maxWidth) => {
        const out = [];
        let cur = '';
        for (const ch of String(text)) {
          const test = cur + ch;
          if (ctx.measureText(test).width > maxWidth && cur) { out.push(cur); cur = ch; } else cur = test;
        }
        if (cur) out.push(cur);
        return out.length ? out : [''];
      };
      // 量高度：标题区 + 五条摘要（每条最多两行）+ 表（6 行）+ 页脚
      ctx.font = font(15);
      let bodyH = 0;
      const outlineBlocks = outline.map((o) => {
        const lines = wrap(o.text, W - PAD * 2 - 70);
        bodyH += Math.min(lines.length, 2) * line + 10;
        return { o, lines: lines.slice(0, 2) };
      });
      const table = tables[0] || null;
      const tableRows = table ? table.rows.slice(0, 6) : [];
      const tableH = table ? 54 + tableRows.length * 34 : 0;
      const H = 150 + bodyH + (outlineBlocks.length ? 34 : 0) + tableH + 120;

      canvas.width = W;
      canvas.height = H;
      ctx.fillStyle = 'rgb(255,255,255)';
      ctx.fillRect(0, 0, W, H);
      // 顶部色条
      ctx.fillStyle = 'rgb(31,111,63)';
      ctx.fillRect(0, 0, W, 8);

      let y = 52;
      ctx.fillStyle = 'rgb(27,27,27)';
      ctx.font = font(28, true);
      ctx.fillText(`${systemLabel} · 摘要`, PAD, y);
      y += 30;
      ctx.fillStyle = 'rgb(111,106,96)';
      ctx.font = font(14);
      const meta = [r && r.input && r.input.datetime ? `出生/起局：${r.input.datetime}` : '', '本地计算 · 可复现'].filter(Boolean).join('　');
      ctx.fillText(meta, PAD, y);
      y += 34;

      if (outlineBlocks.length) {
        ctx.fillStyle = 'rgb(31,111,63)';
        ctx.font = font(16, true);
        ctx.fillText('一页读懂', PAD, y);
        y += 26;
        for (const { o, lines } of outlineBlocks) {
          ctx.fillStyle = 'rgb(138,131,120)';
          ctx.font = font(14, true);
          ctx.fillText(o.label, PAD, y);
          ctx.fillStyle = 'rgb(63,58,51)';
          ctx.font = font(15);
          lines.forEach((text, i) => ctx.fillText(text, PAD + 70, y + i * line));
          y += lines.length * line + 10;
        }
        y += 8;
      }

      if (table) {
        ctx.fillStyle = 'rgb(31,111,63)';
        ctx.font = font(16, true);
        ctx.fillText(table.title, PAD, y);
        y += 24;
        ctx.fillStyle = 'rgb(138,131,120)';
        ctx.font = font(13);
        ctx.fillText(table.columns.join(' · '), PAD, y);
        y += 8;
        ctx.strokeStyle = 'rgb(229,225,216)';
        ctx.beginPath(); ctx.moveTo(PAD, y); ctx.lineTo(W - PAD, y); ctx.stroke();
        y += 22;
        ctx.fillStyle = 'rgb(63,58,51)';
        ctx.font = font(14);
        for (const row of tableRows) {
          const text = row.filter(Boolean).join(' · ');
          const clipped = wrap(text, W - PAD * 2)[0];
          ctx.fillText(clipped, PAD, y);
          y += 34;
        }
      }

      y = H - 62;
      ctx.strokeStyle = 'rgb(229,225,216)';
      ctx.beginPath(); ctx.moveTo(PAD, y - 18); ctx.lineTo(W - PAD, y - 18); ctx.stroke();
      ctx.fillStyle = 'rgb(138,131,120)';
      ctx.font = font(12);
      ctx.fillText('内容用于传统文化学习与自我探索，不构成医疗、投资、法律或人事决策依据。', PAD, y + 6);
      ctx.fillText('dsh-metaphysics · 本机计算，未上传任何数据', PAD, y + 26);

      return canvas.toDataURL ? canvas.toDataURL('image/png') : '';
    } catch (e) {
      return '';
    }
  };
})();






