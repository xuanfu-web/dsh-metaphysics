window.__ModuleLoader__.load({id:"dsh-metaphysics",version:"0.56.0",factory(ra){const ea=(function(){try{return ra("react")}catch{return globalThis.React}})();if(!ea)return{inject:[],apply(){}};const s=ea.createElement,Ga={bazi:"client.bazi.js",ziwei:"client.ziwei.js",hepan:"client.hepan.js",trend:"client.trend.js",name:"client.name.js",fengshui:"client.fengshui.js",liuyao:"client.liuyao.js",meihua:"client.liuyao.js",qimen:"client.qimen.js",daliuren:"client.daliuren.js",tarot:"client.tarot.js",almanac:"client.almanac.js",convert:"client.convert.js",zeri:"client.zeri.js",chenggu:"client.chenggu.js",xiaoliuren:"client.xiaoliuren.js",star:"client.star.js",numerology:"client.numerology.js",mbti:"client.mbti.js"},Ba=[{key:"general",label:"综合",dim:null,focus:""},{key:"wealth",label:"财运",dim:"work",focus:"钱财进出的落点主要看「工作与职业选择」与「事业发展」这两条。"},{key:"career",label:"事业",dim:"career",focus:"事业发展这条与你的问题最直接。"},{key:"love",label:"感情",dim:"love",focus:"感情这条与你的问题最直接。"},{key:"health",label:"健康",dim:"health",focus:"健康这条与你的问题最直接；下面只作提醒，不作任何诊断。"},{key:"study",label:"学业",dim:"career",focus:"学业与考试更贴近「事业发展」这条，讲的是长期积累与阶段进展。"},{key:"travel",label:"出行",dim:"overall",focus:"出行与迁动更贴近「整体运势」这条，看的是当下这一段的大环境。"}];window.__MP_VER="0.56.0",window.__MPGroups=[{title:"问一件事",hint:"心里有一件具体的事，起一卦再决定",items:[{k:"liuyao",label:"六爻",tip:"摇六次，问一件事"},{k:"meihua",label:"梅花",tip:"见闻起卦，看当下"},{k:"tarot",label:"塔罗",tip:"抽牌，看关系与选择"},{k:"qimen",label:"奇门",tip:"看方位、时机与取舍"},{k:"daliuren",label:"六壬",tip:"占事，断来意与结果"},{k:"xiaoliuren",label:"小六壬",tip:"掐指一算，快速断"}]},{title:"看一个人",hint:"看自己或身边人的性情、格局与运程",items:[{k:"bazi",label:"八字",tip:"四柱看一生格局"},{k:"ziwei",label:"紫微",tip:"十二宫细看"},{k:"hepan",label:"合盘",tip:"两个人合不合"},{k:"mbti",label:"人格",tip:"16 型性格问卷"},{k:"chenggu",label:"称骨",tip:"按生辰称命重"},{k:"numerology",label:"数字",tip:"生日数字看性格"},{k:"trend",label:"人生K",tip:"一生高低走势",wide:!0}]},{title:"查日子",hint:"挑时间、换农历，顺带看看家里和名字",items:[{k:"almanac",label:"黄历",tip:"今天宜忌、时辰吉凶"},{k:"zeri",label:"择日",tip:"挑个办事的好日子"},{k:"convert",label:"农历",tip:"公历农历互转"},{k:"star",label:"星座",tip:"星座性格与今日运"},{k:"fengshui",label:"风水",tip:"房屋朝向与布置"},{k:"name",label:"起名",tip:"按八字选字"}]}];const Z={};Z.DIRECTIONS=Ba,Z.compute=()=>{throw new Error("命理引擎尚未加载")};const Za=Object.create(null);function Lt(o){return Ga[o]||Ga.bazi||"client.bazi.js"}async function Tt(o){const l=Lt(o);let F=Za[l];if(!F){if(!ra||typeof ra.async!="function")throw new Error("当前宿主不支持客户端分块加载（require.async 缺失），请升级 DeepSeek Harness");const V=await ra.async(`./${l}`);if(F=V&&(V.Engine||V.default),!F||typeof F.compute!="function")throw new Error(`命理引擎分块 ${l} 未返回 Engine`);Za[l]=F}for(const V of Object.keys(F))F[V]!==void 0&&(Z[V]=F[V]);return Array.isArray(Z.DIRECTIONS)||(Z.DIRECTIONS=Ba),window.Engine=Z,window.__MP_ENGINE_READY__=!0,Z}window.__mpEnsureEngine=Tt,window.Engine=Z,(function(){const o={liuyao:!0,meihua:!0,daliuren:!0,tarot:!0},l=W=>!!o[W];function F(W){const ne=String(W??"").trim();if(!ne)return{lines:null,warning:""};const te=ne.split(/[^0-9]+/).filter(Boolean).map(Number),se=te.filter(t=>![6,7,8,9].includes(t));return te.length===6&&se.length===0?{lines:te,warning:""}:{lines:null,warning:te.length!==6?`爻值需要正好 6 个数字（当前 ${te.length} 个），本次按随机摇卦。`:`爻值只能是 6/7/8/9（收到 ${se.join("/")}），本次按随机摇卦。`}}function V(W){const ne=String(W??"").trim();if(!ne)return null;const te=Number(ne);return Number.isFinite(te)?te:null}window.__MPCore={NEED_ASK:o,needAsk:l,parseLines:F,toNumber:V}})(),(function(){const o=`
.pp,.mp-it,.mp-al,.mp-cg,.mp-cl,.mp-cli,.mp-kline,.mp-mb,.mp-mb-paper,.mp-nm,.mp-quick,.mp-cdiff,.mp-shadow,.mp-trace-card,.mp-trace-layer{--ink:#1b1b1b;--ink2:#3f3a33;--muted:#6f6a60;--label:#8a8378;--faint:#a9a296;
  --line:#c8c1b2;--dimline:#b9b2a4;--hair:#e9e2d3;
  /* 底色略沉作「桌面」，--card 跳到近白：原先 bg 与 card 只差 1/255，卡片感等于零。
     同一色相里塞 9 个几乎相等的浅色，谁都浮不起来。 */
  --bg:#f6f1e6;--card:#fffdf8;--band:#fbf7ee;--hover:#f3ede1;--hover2:#ece5d6;
  --tri:#f3e8cd;--soul:#fae4dc;--sel:#fceee7;--link:#f9ece0;
  --red:#b3261e;--red-rgb:179,38,30;--lu:#1f6f3f;--lu-rgb:31,111,63;
  --quan:#8a5a00;--quan-rgb:138,90,0;--ke:#1f4e79;--ke-rgb:31,78,121;--ji:#b3261e;
  --br-good:#4c7a5c;--br-bad:#9c5b56;--on-accent:#fff;--wx-metal:#8a6b1f;
  --tg-bi:#4a6f8a;--tg-shi:#4c7a5c;--tg-cai:#8a6b1f;--tg-guan:#9c5b56;--tg-yin:#6d5f83;
  /* 之前 mp-cli / mp-qt / mp-cl / 起名卡里引用了 --ink3、--fx、--sans，却从未定义：
     var() 取不到值 → 整条声明作废，字色与字形全靠继承，楷体、弱化灰都成了摆设。 */
  --ink3:#8a8378;--fx:"Kaiti SC",KaiTi,"STKaiti","Songti SC",serif;--sans:system-ui,-apple-system,"Microsoft YaHei",sans-serif;--kai:"Kaiti SC",KaiTi,"STKaiti",serif;
  --shadow:0 1px 2px rgba(35,28,18,.05),0 18px 40px -30px rgba(35,28,18,.42)}
/* 变量与 .mp-it 共享 —— 「解析与详解」是 .pp 的兄弟节点、不在 .pp 内部，
   变量只挂在 .pp 上时它拿不到 --card/--muted/--red，头部底色会变透明、边框会退回黑色。 */
.pp{border:1px solid var(--line);background:var(--bg);color:var(--ink);font-family:"Songti SC","SimSun","Microsoft YaHei",serif;font-size:12.5px;line-height:1.55;
  border-radius:12px;overflow:hidden;box-shadow:var(--shadow);container-type:inline-size}
/* 深色：只换变量，不动任何一条选择器。用 @media screen 限定，
   打印永远走浅色 —— 深色主题下直接打印会得到一整页耗墨的深底 PDF。 */
@media screen and (prefers-color-scheme:dark){
  .pp,.mp-it,.mp-al,.mp-cg,.mp-cl,.mp-cli,.mp-kline,.mp-mb,.mp-mb-paper,.mp-nm,.mp-quick,.mp-cdiff,.mp-shadow,.mp-trace-card,.mp-trace-layer{--ink:#eae5d9;--ink2:#d5cfc2;--muted:#aca598;--label:#a49c8e;--faint:#928b7e;
    --line:#514a3e;--dimline:#5f5849;--hair:#2f2b23;
  /* 与浅色同理：底更沉、卡片更亮，让层级在深底上也能立起来 */
    --bg:#12110c;--card:#211f18;--band:#282419;--hover:#2e2a1f;--hover2:#383322;
    --tri:#332913;--soul:#3a231c;--sel:#43271f;--link:#33241c;
    --red:#f08569;--red-rgb:240,133,105;--lu:#74c795;--lu-rgb:116,199,149;
    --quan:#e2a95c;--quan-rgb:226,169,92;--ke:#86bcea;--ke-rgb:134,188,234;--ji:#f08569;
    --br-good:#79c79a;--br-bad:#e09a8c;--on-accent:#14130f;--wx-metal:#dcb273;
    --tg-bi:#93b7cf;--tg-shi:#8fbb9d;--tg-cai:#d3ae62;--tg-guan:#d98d84;--tg-yin:#b4a4d0;
    --ink3:#8b8478;--shadow:0 1px 2px rgba(0,0,0,.5),0 18px 40px -30px rgba(0,0,0,.9)}
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
/* 自化：宫干化回本宫。只留色字 + 虚下划线，与生年实心、大限/流年空心分三层 */
.pp-m.self{background:transparent;box-shadow:none;padding:0;text-decoration:underline dotted;text-underline-offset:2px}
.pp-m.self.lu{color:var(--lu)}.pp-m.self.quan{color:var(--quan)}.pp-m.self.ke{color:var(--ke)}.pp-m.self.ji{color:var(--ji)}
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
.pp-chip.broken{color:var(--quan);border-color:var(--quan);border-style:dashed}
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
/* 岁运提示下的原文：比正文再轻一档，只做出处，不抢结论 */
.pp-sy-src{margin-top:6px;font-size:11.5px;line-height:1.55}
.pp-r{display:none}
.pp-modes{display:flex;align-items:center;border-bottom:1px solid var(--line);font-family:system-ui,sans-serif}
/* min-height:44px —— 视图切换是本盘唯一的主要控件，触摸目标必须够。
   原先 6px 上下内边距只有 31px 高，手机上是实打实的误触来源 */
.pp-modes label{min-height:44px;display:inline-flex;align-items:center;padding:3px 20px;font-size:12.5px;color:var(--muted);cursor:pointer;border-right:1px solid var(--line);user-select:none}
.pp-modes label:hover{background:var(--hover2)}
/* 提示条是「宫位可点」的唯一说明，--faint 在浅色下只有 2.3:1，换 --muted 才读得清 */
.pp-soon{margin-left:auto;padding-right:10px;font-size:12px;color:var(--muted)}
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
/* 键盘可达：宫格是 div+tabindex，焦点必须看得见（原先把 outline 关了却没补替代） */
.pp-cell:focus-visible{box-shadow:inset 0 0 0 2px var(--red)}
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
.mp-hy-box{border:1px solid var(--line);border-radius:10px;background:var(--card);padding:12px 16px 14px;min-width:250px}
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
.mp-hexbox{border:1px solid var(--line);border-radius:10px;background:var(--card);padding:12px 15px 13px}
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
.mp-tt-card{border:1px solid var(--line);border-radius:10px;background:var(--card);padding:13px 14px;display:flex;flex-direction:column;gap:7px;min-height:168px}
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
/* container-type：dsh 侧栏是「窗口宽、报告窄」，@media 不触发；下面 ≤640 的表格/目录规则另挂一份 @container */
.mp-it{margin-top:14px;border:1px solid var(--line);background:var(--bg);color:var(--ink);border-radius:12px;overflow:hidden;box-shadow:var(--shadow);container-type:inline-size;
  font-family:"Songti SC","SimSun","Microsoft YaHei",serif;font-size:13px;line-height:1.75}
.mp-it *{box-sizing:border-box}
/* 标题栏即折叠开关：整栏可点，箭头旋转表示状态 */
.mp-it-head{display:flex;align-items:center;gap:9px;flex-wrap:wrap;width:100%;padding:12px 16px;border:none;border-bottom:1px solid var(--line);background:var(--card);color:inherit;font:inherit;font-family:inherit;text-align:left;cursor:pointer;-webkit-appearance:none;appearance:none}
.mp-it-head:hover{background:var(--band)}
.mp-it-head:focus-visible{outline:2px solid var(--red);outline-offset:-3px}
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
/* 分节按「吉 / 留意 / 忌」分层：只改标题色与左侧细线，不换版式 */
.mp-it-sec.tone-good,.mp-it-sec.tone-watch,.mp-it-sec.tone-bad{padding-left:8px}
.mp-it-sec.tone-good{border-left:2px solid var(--lu)}
.mp-it-sec.tone-watch{border-left:2px solid var(--quan)}
.mp-it-sec.tone-bad{border-left:2px solid var(--red)}
.mp-it-sec.tone-good .mp-it-sh{color:var(--lu)}
.mp-it-sec.tone-watch .mp-it-sh{color:var(--quan)}
.mp-it-sec.tone-bad .mp-it-sh{color:var(--red)}
/* 长节按行分段：一行一段，行内**加粗**只强化术语，不引入其它标记 */
.mp-it-p{margin:0 0 5px}
.mp-it-p:last-child{margin-bottom:0}
.mp-it-p b{color:var(--ink);font-weight:700;letter-spacing:.02em}
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
/* 交叉验证：一个方面一张对照卡，八字与紫微左右并列，判断做成语气标签 */
.mp-cross{display:flex;flex-direction:column;gap:8px;font-family:system-ui,sans-serif}
.mp-cross-row{border:1px solid var(--line);border-radius:8px;background:var(--card);padding:9px 11px}
.mp-cross-h{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.mp-cross-l{font-size:13px;font-weight:700;color:var(--ink);letter-spacing:.02em}
.mp-cross-tag{font-size:11px;line-height:1.5;padding:1px 8px;border:1px solid currentColor;border-radius:999px;color:var(--muted)}
.mp-cross-tag.t-good{color:var(--lu)}
.mp-cross-tag.t-watch{color:var(--quan)}
.mp-cross-tag.t-alt{color:var(--ke)}
.mp-cross-b{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:4px 14px;margin-top:7px}
.mp-cross-cell{font-size:12.5px;line-height:1.75;color:var(--ink2)}
.mp-cross-cell b{display:block;font-size:10.5px;letter-spacing:.1em;color:var(--muted);font-weight:600;margin-bottom:1px}
.mp-cross-note{margin-top:7px;padding-top:6px;border-top:1px dashed var(--line);font-size:12px;line-height:1.7;color:var(--muted)}
/* 口径对照：结果下方一块可折叠的「换一个开关会变哪几个字」。
   默认收起，summary 一行给出「几组影响此盘」；展开后先列根因，再列连带分类。
   与盘面同一套变量，深色下只换变量；summary 保持 44px 触摸目标。 */
.mp-cdiff{margin:12px 0 0;border:1px solid var(--line);border-radius:10px;background:var(--card);overflow:hidden;font-family:system-ui,sans-serif}
.mp-cdiff>summary{display:flex;align-items:center;gap:8px;flex-wrap:wrap;min-height:44px;padding:8px 13px;cursor:pointer;list-style:none;color:var(--ink2);font-size:12.5px;line-height:1.6}
.mp-cdiff>summary::-webkit-details-marker{display:none}
.mp-cdiff>summary::before{content:'▸';color:var(--red);font-size:12px}
.mp-cdiff[open]>summary::before{content:'▾'}
.mp-cdiff-title{font-size:13px;font-weight:700;letter-spacing:.06em;color:var(--red)}
.mp-cdiff-lead{color:var(--muted)}
.mp-cdiff-more{margin-left:auto;color:var(--label);font-size:11.5px;white-space:nowrap}
.mp-cdiff[open] .mp-cdiff-more{display:none}
.mp-cdiff-body{padding:0 13px 12px;border-top:1px dashed var(--line)}
.mp-cdiff-row{padding:9px 0;border-bottom:1px dashed var(--line)}
.mp-cdiff-row:last-of-type{border-bottom:none}
.mp-cdiff-h{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}
.mp-cdiff-h b{font-size:12.5px;color:var(--ink);font-weight:700}
.mp-cdiff-count{margin-left:auto;font-size:11px;color:var(--muted);font-variant-numeric:tabular-nums}
.mp-cdiff-count.on{color:var(--red)}
.mp-cdiff-ab{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:5px;font-size:11.5px;color:var(--muted)}
.mp-cdiff-pill{border:1px solid var(--line);border-radius:999px;padding:1px 8px;background:var(--band)}
.mp-cdiff-pill.now{color:var(--lu);border-color:rgba(var(--lu-rgb),.4);background:color-mix(in srgb,var(--lu) 10%,transparent)}
.mp-cdiff-pill.alt{color:var(--red);border-color:rgba(var(--red-rgb),.4);background:color-mix(in srgb,var(--red) 8%,transparent)}
.mp-cdiff-arrow{color:var(--dimline)}
.mp-cdiff-roots{display:flex;flex-direction:column;gap:3px;margin-top:6px;font-size:12.5px;line-height:1.7}
.mp-cdiff-root{display:flex;align-items:baseline;gap:6px;flex-wrap:wrap}
.mp-cdiff-k{color:var(--label);font-size:11px;letter-spacing:.08em;min-width:2.2em}
.mp-cdiff-from{color:var(--ink2)}
.mp-cdiff-to{color:var(--ink);font-weight:700}
.mp-cdiff-cats{display:flex;flex-wrap:wrap;gap:4px 6px;margin-top:6px}
.mp-cdiff-cat{font-size:11px;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:0 7px;background:var(--band)}
.mp-cdiff-same{font-size:12px;color:var(--muted);margin-top:4px}
.mp-cdiff-note{margin-top:8px;padding-top:7px;border-top:1px dashed var(--line);font-size:11.5px;line-height:1.7;color:var(--muted)}
@media (max-width:640px){
  .mp-cdiff>summary{padding:8px 11px}
  /* 窄屏收起态只留标题与一句话总结；「展开」提示折行会把 summary 撑到 91px */
  .mp-cdiff-more{display:none}
  .mp-cdiff-body{padding:0 11px 10px}
  .mp-cdiff-h b{font-size:12px}
  .mp-cdiff-count{margin-left:0}
}
@media print{
  .mp-cdiff:not([open])>*{display:block!important}
  .mp-cdiff>summary{cursor:auto}
  .mp-cdiff-more{display:none}
  .mp-cdiff{break-inside:avoid}
}
/* 影子盘：ID + 版本 + 与上次同盘（同 baseId）的自动比对。
   ID 用等宽字体、可一键复制；比对默认只在版本变化或真有字段变化时展开。 */
.mp-shadow{margin:12px 0 0;border:1px solid var(--line);border-radius:10px;background:var(--card);padding:9px 13px;font-family:system-ui,sans-serif}
.mp-shadow-head{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.mp-shadow-title{font-size:13px;font-weight:700;letter-spacing:.06em;color:var(--ke)}
.mp-shadow-id{font:600 13px/1.5 ui-monospace,SFMono-Regular,Consolas,monospace;color:var(--ink);letter-spacing:.04em;background:var(--band);border:1px solid var(--line);border-radius:6px;padding:1px 7px}
.mp-shadow-copy{margin-left:auto;min-height:40px;padding:0 12px;border:1px solid var(--line);border-radius:8px;background:var(--card);color:var(--ink2);font:inherit;font-size:12px;cursor:pointer}
.mp-shadow-copy:hover{border-color:var(--ke);color:var(--ke)}
.mp-shadow-copy:focus-visible{outline:2px solid var(--ke);outline-offset:2px}
.mp-shadow-meta{display:flex;flex-wrap:wrap;gap:2px 12px;margin-top:3px;font-size:11.5px;line-height:1.6;color:var(--muted)}
.mp-shadow-meta b{font-weight:600;color:var(--ink2)}
.mp-shadow-warn{margin-top:6px;padding:5px 8px;border-left:3px solid var(--quan);background:color-mix(in srgb,var(--quan) 8%,transparent);font-size:11.5px;line-height:1.65;color:var(--ink2)}
.mp-shadow-hint{margin-top:4px;font-size:11.5px;line-height:1.6;color:var(--muted)}
.mp-shadow-diff{margin-top:8px;border-top:1px dashed var(--line)}
.mp-shadow-diff>summary{display:flex;align-items:center;gap:8px;flex-wrap:wrap;min-height:44px;padding:4px 0 0;cursor:pointer;list-style:none;font-size:12.5px;color:var(--ink2)}
.mp-shadow-diff>summary::-webkit-details-marker{display:none}
.mp-shadow-diff>summary::before{content:'▸';color:var(--ke);font-size:12px}
.mp-shadow-diff[open]>summary::before{content:'▾'}
.mp-shadow-diff b{color:var(--ink);font-weight:700}
.mp-shadow-diff .tag{margin-left:auto;color:var(--muted);font-size:11px;white-space:nowrap}
.mp-shadow-diff .same{margin-top:4px;font-size:12px;color:var(--muted)}
.mp-shadow-diff .note{margin-top:8px;padding-top:6px;border-top:1px dashed var(--line);font-size:11.5px;line-height:1.7;color:var(--muted)}
@media (max-width:640px){
  .mp-shadow{padding:8px 11px}
  .mp-shadow-copy{margin-left:0;min-height:44px}
  .mp-shadow-diff b{font-size:12px}
}
@media print{
  .mp-shadow-diff:not([open])>*{display:block!important}
  .mp-shadow-diff>summary{cursor:auto}
  .mp-shadow-copy{display:none}
  .mp-shadow{break-inside:avoid}
}
/* 推导链：结果顶部的入口，点开是右侧抽屉；每层可单独展开规则 / 输入 / 结果 / 出处。 */
.mp-trace-card{display:flex;align-items:center;gap:8px;flex-wrap:wrap;width:100%;margin:12px 0 0;padding:9px 13px;min-height:44px;border:1px solid var(--line);border-radius:10px;background:var(--band);color:var(--ink2);font:inherit;font-size:12.5px;line-height:1.6;text-align:left;cursor:pointer}
.mp-trace-card:hover{border-color:var(--ke)}
.mp-trace-card:focus-visible{outline:2px solid var(--ke);outline-offset:2px}
.mp-trace-title{font-size:13px;font-weight:700;letter-spacing:.06em;color:var(--ke)}
.mp-trace-flow{color:var(--muted)}
.mp-trace-count{margin-left:auto;color:var(--label);font-size:11.5px;white-space:nowrap}
.mp-trace-layer{position:fixed;inset:0;z-index:2147483000;display:none;font-family:system-ui,sans-serif;color:var(--ink)}
.mp-trace-layer.open{display:block}
.mp-trace-back{position:absolute;inset:0;background:rgba(20,18,12,.46)}
.mp-trace-drawer{position:absolute;top:0;right:0;bottom:0;width:min(440px,92vw);display:flex;flex-direction:column;background:var(--card);border-left:1px solid var(--line);box-shadow:-18px 0 40px -30px rgba(0,0,0,.6)}
.mp-trace-head{display:flex;align-items:flex-start;gap:10px;padding:14px 16px;border-bottom:1px solid var(--line);background:var(--band)}
.mp-trace-head b{display:block;font-size:15px;color:var(--ink);letter-spacing:.03em}
.mp-trace-head span{display:block;margin-top:2px;font-size:11.5px;line-height:1.6;color:var(--muted)}
.mp-trace-close{margin-left:auto;flex:0 0 auto;min-width:44px;min-height:44px;border:1px solid var(--line);border-radius:8px;background:var(--card);color:var(--ink2);font:inherit;font-size:16px;cursor:pointer}
.mp-trace-close:hover{border-color:var(--ke);color:var(--ke)}
.mp-trace-close:focus-visible{outline:2px solid var(--ke);outline-offset:2px}
.mp-trace-body{flex:1;overflow:auto;padding:10px 14px 24px;overscroll-behavior:contain}
.mp-trace-step{margin:0 0 8px;border:1px solid var(--line);border-radius:10px;background:var(--bg);overflow:hidden}
.mp-trace-step>summary{display:flex;align-items:center;gap:8px;min-height:44px;padding:8px 11px;cursor:pointer;list-style:none}
.mp-trace-step>summary::-webkit-details-marker{display:none}
.mp-trace-step>summary::after{content:'▸';margin-left:8px;color:var(--dimline)}
.mp-trace-step[open]>summary::after{content:'▾'}
.mp-trace-no{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:999px;background:color-mix(in srgb,var(--ke) 14%,transparent);color:var(--ke);font-size:11.5px;font-weight:700}
.mp-trace-field{flex:0 0 auto;font-size:13px;font-weight:700;color:var(--ink)}
.mp-trace-res{min-width:0;margin-left:auto;max-width:56%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--muted);font-size:11.5px}
.mp-trace-detail{padding:0 11px 11px;border-top:1px dashed var(--line);font-size:12.5px;line-height:1.75}
.mp-trace-rule{margin-top:8px;color:var(--ink2)}
.mp-trace-rule b,.mp-trace-result b,.mp-trace-src b{display:inline-block;margin-right:6px;color:var(--label);font-size:10.5px;letter-spacing:.1em}
.mp-trace-inputs{display:grid;grid-template-columns:auto minmax(0,1fr);gap:2px 10px;margin:8px 0;padding:7px 9px;border:1px solid var(--hair);border-radius:8px;background:var(--band)}
.mp-trace-inputs dt{color:var(--label);font-size:11px}
.mp-trace-inputs dd{margin:0;color:var(--ink2);word-break:break-word}
.mp-trace-result{margin-top:8px;padding-top:7px;border-top:1px dashed var(--line);color:var(--ink)}
.mp-trace-src{margin-top:6px;color:var(--muted);font-size:11.5px}
@media (max-width:640px){
  .mp-trace-card{padding:8px 11px}
  .mp-trace-drawer{width:100vw;border-left:none}
  .mp-trace-head{padding:12px}
  .mp-trace-body{padding:8px 10px 24px}
  .mp-trace-res{max-width:46%}
}
@media print{
  .mp-trace-layer{display:none!important}
  .mp-trace-card{break-inside:avoid}
}
/* 三张表：横向可滚动，避免窄栏撑破 */
.mp-tables{border-top:1px solid var(--line);padding:12px 16px 4px;background:var(--card)}
.mp-table-wrap{margin-bottom:12px}
.mp-table-h{font-size:12px;font-weight:700;letter-spacing:.1em;color:var(--lu);margin-bottom:5px;font-family:system-ui,sans-serif}
.mp-table-scroll{overflow-x:auto;border:1px solid var(--line);border-radius:8px}
.mp-table{width:100%;border-collapse:collapse;font-size:12px;line-height:1.6;color:var(--ink2);font-family:system-ui,sans-serif}
.mp-table th,.mp-table td{padding:5px 9px;text-align:left;vertical-align:top;border-bottom:1px solid var(--line);white-space:nowrap}
/* 表头 11px 小字：用 ink2 而不是 label，浅色下 label 对 band 只有 3.5:1，读不清 */
.mp-table th{background:var(--band);color:var(--ink2);font-weight:600;font-size:11px;letter-spacing:.06em}
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
/* —— ≤640px：大运表 6 列排到 748px，窄屏只能看到左边一段且没有「还能滑」的提示，
   这里改成一列一张卡；目录横滑成胶囊、证据摘要与名词解释的点击区抬到 44px —— */
@media (max-width:640px){
  .mp-tables{padding:10px 11px 2px}
  .mp-table-wrap{margin-bottom:14px}
  .mp-table-scroll{overflow:visible;border:0;border-radius:0}
  .mp-table{display:block;width:100%}
  .mp-table thead{display:none}
  .mp-table tbody{display:block}
  .mp-table tr{display:block;border:1px solid var(--line);border-radius:8px;background:var(--card);padding:7px 10px;margin:0 0 8px}
  .mp-table td{display:grid;grid-template-columns:56px minmax(0,1fr);gap:8px;border-bottom:0;padding:2px 0;white-space:normal;font-size:12.5px;line-height:1.65}
  .mp-table td::before{content:attr(data-label);color:var(--muted);font-size:11px;line-height:1.9}
  .mp-table td:first-child{display:block;padding-bottom:3px;font-size:13px;font-weight:700;color:var(--ink)}
  .mp-table td:first-child::before{content:none}
  .mp-table tbody tr:nth-child(even) td{background:none}
  .mp-table tbody tr:last-child{margin-bottom:0}
  /* 对照卡：两列并排在 342px 里每边只剩 164px，竖排后标签跟正文走 */
  .mp-cross-b{grid-template-columns:1fr;gap:6px}
  .mp-cross-cell b{display:inline;margin-right:6px;letter-spacing:.06em}
  .mp-toc{flex-wrap:nowrap;overflow-x:auto;gap:8px;margin:10px 0 0;padding:6px 11px;border:0;border-bottom:1px solid var(--line);border-radius:0;scrollbar-width:none}
  .mp-toc::-webkit-scrollbar{display:none}
  .mp-toc a{flex:0 0 auto;display:inline-flex;align-items:center;min-height:44px;padding:0 12px;border:1px solid var(--line);border-radius:999px;color:var(--lu);text-decoration:none}
  .mp-toc a:hover{color:var(--ink)}
  .mp-it-ev>summary{display:flex;align-items:center;min-height:44px;padding:0 9px}
  .mp-it-gloss summary{display:flex;align-items:center;min-height:44px;margin-bottom:2px}
}
/* 容器查询版（dsh 侧栏 420px、窗口 1400px 时 @media 不会触发）：与上面同规则，不另立一套口径 */
@container (max-width:640px){
  .mp-tables{padding:10px 11px 2px}
  .mp-table-wrap{margin-bottom:14px}
  .mp-table-scroll{overflow:visible;border:0;border-radius:0}
  .mp-table{display:block;width:100%}
  .mp-table thead{display:none}
  .mp-table tbody{display:block}
  .mp-table tr{display:block;border:1px solid var(--line);border-radius:8px;background:var(--card);padding:7px 10px;margin:0 0 8px}
  .mp-table td{display:grid;grid-template-columns:56px minmax(0,1fr);gap:8px;border-bottom:0;padding:2px 0;white-space:normal;font-size:12.5px;line-height:1.65}
  .mp-table td::before{content:attr(data-label);color:var(--muted);font-size:11px;line-height:1.9}
  .mp-table td:first-child{display:block;padding-bottom:3px;font-size:13px;font-weight:700;color:var(--ink)}
  .mp-table td:first-child::before{content:none}
  .mp-table tbody tr:nth-child(even) td{background:none}
  .mp-table tbody tr:last-child{margin-bottom:0}
  .mp-cross-b{grid-template-columns:1fr;gap:6px}
  .mp-cross-cell b{display:inline;margin-right:6px;letter-spacing:.06em}
  .mp-toc{flex-wrap:nowrap;overflow-x:auto;gap:8px;margin:10px 0 0;padding:6px 11px;border:0;border-bottom:1px solid var(--line);border-radius:0;scrollbar-width:none}
  .mp-toc::-webkit-scrollbar{display:none}
  .mp-toc a{flex:0 0 auto;display:inline-flex;align-items:center;min-height:44px;padding:0 12px;border:1px solid var(--line);border-radius:999px;color:var(--lu);text-decoration:none}
  .mp-toc a:hover{color:var(--ink)}
  .mp-it-ev>summary{display:flex;align-items:center;min-height:44px;padding:0 9px}
  .mp-it-gloss summary{display:flex;align-items:center;min-height:44px;margin-bottom:2px}
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
.mp-cl{margin-top:12px;padding:10px 12px 8px;border-left:2px solid var(--quan);border-radius:0 8px 8px 0;
  background:color-mix(in srgb,var(--band) 72%,transparent)}
.mp-cl-h{display:flex;gap:8px;align-items:baseline;font-size:12.5px;margin-bottom:7px}
.mp-cl-h b{color:var(--ink);letter-spacing:.06em}
.mp-cl-h span{color:var(--ink3);font-size:11.5px}
.mp-cl-e{padding:8px 0;border-top:1px dashed var(--hair)}
.mp-cl-e:first-of-type{border-top:0;padding-top:0}
.mp-cl-t b{font-family:var(--fx);font-size:13px;color:var(--lu);font-weight:600;letter-spacing:.03em}
.mp-cl-q{font-family:var(--fx);font-size:14px;line-height:2;color:var(--ink);margin-top:3px;letter-spacing:.02em;
  padding-left:1.05em;text-indent:-1.05em}
.mp-cl-p{font-size:12px;line-height:1.9;color:var(--ink2);margin-top:3px}
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
.mp-nm-wu{margin-top:10px;border-top:1px solid var(--hair);padding-top:9px}
.mp-nm-wu-h{display:flex;align-items:baseline;gap:9px;font-size:12.5px;color:var(--ink2)}
.mp-nm-wu-h b{font-weight:700;letter-spacing:.18em}
.mp-nm-wu-h i{font-style:normal;font-size:11px;color:var(--faint)}
.mp-nm-wu-rows{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px;margin:7px 0 6px}
.mp-nm-wu-c{border:1px solid var(--line);border-radius:6px;padding:5px 6px;text-align:center;background:var(--band)}
.mp-nm-wu-c em{display:block;font-style:normal;font-size:10.5px;color:var(--muted);letter-spacing:.06em}
.mp-nm-wu-c b{display:block;font-size:16px;line-height:1.35;color:var(--ink);font-family:var(--sans)}
.mp-nm-wu-c i{display:block;font-style:normal;font-size:10px;line-height:1.5;color:var(--faint);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mp-nm-wu-c.is-ok{border-color:var(--lu)}
.mp-nm-wu-c.is-ok b{color:var(--lu)}
.mp-nm-wu-c.is-half{border-color:var(--quan)}
.mp-nm-wu-c.is-half b{color:var(--quan)}
.mp-nm-wu-c.is-bad b{color:var(--ji)}
.mp-nm-ph{margin-top:9px;font-size:12.5px;line-height:1.8;color:var(--ink2)}
.mp-nm-ph b{font-weight:700;letter-spacing:.18em;margin-right:6px}
.mp-nm-ph em{font-style:normal;color:var(--muted);margin-left:6px;font-family:var(--sans);font-size:11.5px}
.mp-nm-ph-lv{font-size:11px;border-radius:999px;padding:0 7px;line-height:1.7;border:1px solid var(--line);color:var(--muted)}
.mp-nm-ph-lv.ok{color:var(--lu);border-color:var(--lu)}
.mp-nm-ph-lv.warn{color:var(--quan);border-color:var(--quan)}
.mp-nm-ph-lv.bad{color:var(--ji);border-color:var(--ji)}
.mp-nm-ph-i{display:inline-block;margin:2px 6px 0 0;font-size:11.5px;color:var(--muted)}
.mp-nm-ph-i:before{content:'·';margin-right:3px;color:var(--faint)}
@media print{.mp-nm{break-inside:avoid}}
.mp-quick-pre{margin:0;white-space:pre-wrap;word-break:break-word;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:13px;line-height:1.9;color:var(--ink2)}
/* —— 风水卡片：八宅八向 / 门主灶 / 玄空九宫 ——
   此前风水结果只是一段等宽文本，「巽8/6/3」要靠读的人自己脑补方位。
   现在摆成后天八卦 3×3：玄空每宫依次是运/山/向三星，当运高亮；
   八宅每宫是星名与吉凶。颜色只取共享变量，深色与打印不另写规则。 */
.mp-fs .mp-quick-h{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}
.mp-fs-sub{font-size:11.5px;color:var(--muted);font-family:var(--sans)}
.mp-fs-chips{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 10px}
.mp-fs-chip{font-size:11.5px;line-height:1.8;border:1px solid var(--line);border-radius:999px;padding:0 9px;color:var(--muted);background:var(--band);font-family:var(--sans)}
.mp-fs-chip.ok{color:var(--lu);border-color:color-mix(in srgb,var(--lu) 40%,var(--line))}
.mp-fs-key{margin:0 0 6px;font-size:11px;color:var(--faint);font-family:var(--sans)}
.mp-fs-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:var(--line);border:1px solid var(--line);border-radius:6px;overflow:hidden;margin-bottom:10px}
.mp-fs-cell{background:var(--card);padding:7px 9px;display:flex;flex-direction:column;gap:6px;min-height:56px}
.mp-fs-cell.center{background:var(--band)}
.mp-fs-top{display:flex;align-items:baseline;gap:6px;min-width:0}
.mp-fs-gua{font-family:var(--fx);font-size:15px;font-weight:700;line-height:1;color:var(--ink)}
.mp-fs-dir{font-size:10.5px;color:var(--muted);font-family:var(--sans);white-space:nowrap}
.mp-fs-star{margin-left:auto;font-size:12px;color:var(--ink2);font-family:var(--sans);white-space:nowrap}
.mp-fs-star em{font-style:normal;font-size:10px;margin-left:4px;padding:0 5px;border:1px solid currentColor;border-radius:999px;line-height:1.6;vertical-align:1px}
.mp-fs-star em.ok{color:var(--lu)}
.mp-fs-star em.bad{color:var(--ji)}
.mp-fs-nums{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;font-family:var(--sans);font-variant-numeric:tabular-nums}
.mp-fs-nums span{text-align:center;font-size:13px;line-height:1.7;border:1px solid var(--hair);border-radius:4px;color:var(--ink2)}
.mp-fs-nums span.on{background:var(--tri);border-color:var(--quan);color:var(--quan);font-weight:700}
.mp-fs-facts{margin:0;display:flex;flex-direction:column;gap:4px}
.mp-fs-row{display:grid;grid-template-columns:64px minmax(0,1fr);gap:8px;font-size:12px;line-height:1.75}
.mp-fs-row dt{margin:0;color:var(--muted);font-family:var(--sans)}
.mp-fs-row dd{margin:0;color:var(--ink2);word-break:break-word}
.mp-fs-note{margin-top:9px;padding-top:8px;border-top:1px dashed var(--line);font-size:11px;line-height:1.7;color:var(--muted)}
@media print{.mp-fs{break-inside:avoid}}
@media (max-width:420px){.mp-fs-cell{padding:6px}.mp-fs-gua{font-size:14px}.mp-fs-nums span{font-size:12px}}
/* —— 十六型人格卡片 ——
   旧版是「四行细条 + 段落堆叠」：字小、无层级，看着像一份导出的文档。
   现在按「类型抬头 → 四维瓦片 → 一句 → 优势/留意 → 功能链 → 场景段」分层，
   四维用左右双极加取值条，颜色只取共享变量，深色与打印都不用另写规则。 */
.mp-mb{margin:12px 16px;border:1px solid var(--line);border-radius:12px;background:var(--card);box-shadow:var(--shadow);overflow:hidden;font-family:var(--sans)}
.mp-mb-h{display:flex;flex-direction:row;align-items:center;gap:14px;flex-wrap:wrap;padding:15px 18px 14px;
  background:linear-gradient(135deg,var(--sel),var(--band) 64%,var(--card));border-bottom:1px solid var(--hair)}
.mp-mb-code{font-family:var(--fx);font-size:32px;font-weight:700;line-height:1;letter-spacing:.12em;color:var(--ink)}
.mp-mb-meta{display:flex;flex-direction:column;gap:3px;min-width:0}
.mp-mb-meta b{font-size:14.5px;font-weight:600;color:var(--ink);letter-spacing:.04em}
.mp-mb-meta i{font-style:normal;font-size:12px;line-height:1.5;color:var(--muted)}
.mp-mb-count{margin-left:auto;padding:3px 10px;border:1px solid var(--line);border-radius:999px;background:var(--card);color:var(--muted);font-size:11.5px;white-space:nowrap}
.mp-mb-body{padding:14px 18px 16px}
.mp-mb-dims{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.mp-mb-dim{border:1px solid var(--hair);border-radius:10px;background:var(--band);padding:9px 11px 10px}
.mp-mb-dh{display:flex;align-items:baseline;gap:6px;font-size:11.5px;color:var(--muted)}
.mp-mb-dh b{font-family:var(--fx);font-size:17px;font-weight:600;line-height:1.1;letter-spacing:.08em;color:var(--faint)}
.mp-mb-dh b.on{color:var(--ink)}
.mp-mb-dh em{font-style:normal;margin:0 auto;font-size:11.5px;letter-spacing:.06em}
.mp-mb-bar{position:relative;height:7px;border-radius:4px;background:var(--hair);margin:7px 0 6px;overflow:hidden}
.mp-mb-bar::after{content:"";position:absolute;left:50%;top:-1px;bottom:-1px;width:1px;background:color-mix(in srgb,var(--line) 70%,transparent)}
.mp-mb-bar em{position:absolute;top:0;bottom:0;background:linear-gradient(90deg,var(--quan),color-mix(in srgb,var(--quan) 55%,var(--card)));border-radius:4px}
.mp-mb-bar.l em{left:0}
.mp-mb-bar.r em{right:0;background:linear-gradient(270deg,var(--quan),color-mix(in srgb,var(--quan) 55%,var(--card)))}
.mp-mb-df{font-size:11.5px;color:var(--ink2);font-variant-numeric:tabular-nums}
.mp-mb-ds{margin-top:2px;font-size:11.5px;line-height:1.7;color:var(--muted)}
.mp-mb-sec{margin-top:11px;font-size:12.5px;line-height:1.85;color:var(--ink2)}
.mp-mb-sec em{display:inline-block;margin-right:7px;padding:0 7px;border:1px solid var(--hair);border-radius:5px;background:var(--band);color:var(--muted);font-size:11px;font-style:normal;letter-spacing:.08em}
.mp-mb-two{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:11px}
.mp-mb-two>div{border:1px solid var(--hair);border-left:3px solid var(--br-good);border-radius:8px;background:var(--card);padding:8px 10px;font-size:12.5px;line-height:1.8;color:var(--ink2)}
.mp-mb-two>div+div{border-left-color:var(--br-bad)}
.mp-mb-two b{display:block;margin-bottom:2px;font-size:11.5px;font-weight:600;letter-spacing:.08em;color:var(--br-good)}
.mp-mb-two>div+div b{color:var(--br-bad)}
.mp-mb-fn{display:flex;flex-wrap:wrap;gap:6px;margin-top:7px}
.mp-mb-fn span{font-size:11.5px;border:1px solid var(--line);border-radius:999px;background:var(--card);padding:2px 9px;color:var(--ink2)}
.mp-mb-fn span.lead{border-color:var(--quan);background:color-mix(in srgb,var(--quan) 9%,var(--card));color:var(--quan);font-weight:600}
.mp-mb-fn span b{font-weight:600;margin-right:4px}
.mp-mb-note{margin:12px 18px 14px;padding-top:10px;font-size:11px;line-height:1.7;color:var(--muted);border-top:1px solid var(--hair)}
.mp-mb-paper{margin:12px 16px;border:1px solid var(--line);border-radius:12px;background:var(--card);box-shadow:var(--shadow);overflow:hidden;font-family:var(--sans)}
.mp-mb-paper ol{counter-reset:q;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px 20px;
  margin:0;padding:12px 18px 14px;list-style:none;font-size:12.5px;line-height:1.7;color:var(--ink2)}
.mp-mb-paper li{counter-increment:q;position:relative;padding:0 0 6px 26px;border-bottom:1px dashed var(--hair)}
.mp-mb-paper li::before{content:counter(q);position:absolute;left:0;top:1px;display:flex;align-items:center;justify-content:center;
  width:19px;height:19px;border:1px solid var(--hair);border-radius:50%;background:var(--band);color:var(--muted);font-size:10.5px;font-variant-numeric:tabular-nums}
.mp-mb-paper .mp-mb-note{margin:0 18px 14px}
@media (max-width:640px){.mp-mb-dims,.mp-mb-two,.mp-mb-paper ol{grid-template-columns:1fr}.mp-mb-code{font-size:26px}.mp-mb-body{padding:12px 14px 14px}.mp-mb-h{padding:13px 14px 12px}}
@media print{.mp-mb{break-inside:avoid}}
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
`,l=window.__PP=window.__PP||{};l.CSS=o;const F={主星:"main",吉星:"good",煞星:"bad",辅星:"aux",杂曜:"aux"},V={禄:"lu",权:"quan",科:"ke",忌:"ji"},W={庙:"good",旺:"good",得:"mid",利:"mid",平:"mid",不:"bad",陷:"bad"},ne={巳:[1,1],午:[1,2],未:[1,3],申:[1,4],辰:[2,1],酉:[2,4],卯:[3,1],戌:[3,4],寅:[4,1],丑:[4,2],子:[4,3],亥:[4,4]},te={乾:[1,1,1],兑:[1,1,0],离:[1,0,1],震:[1,0,0],巽:[0,1,1],坎:[0,1,0],艮:[0,0,1],坤:[0,0,0]},se=["初爻","二爻","三爻","四爻","五爻","上爻"],t=e=>String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),O=(e,n,p)=>{const x=Math.round(43),f=e?`<rect x="0" y="${2.5}" width="104" height="7" rx="${1.6}" fill="currentColor"/>`:`<rect x="0" y="${2.5}" width="${x}" height="7" rx="${1.6}" fill="currentColor"/><rect x="${x+18}" y="${2.5}" width="${104-x-18}" height="7" rx="${1.6}" fill="currentColor"/>`;return`<svg class="mp-hex${n?" hex-on":""}${p?" "+p:""}" viewBox="0 0 104 12" preserveAspectRatio="none" aria-hidden="true" focusable="false">${f}</svg>`},me={木:"M6 1.6V10.8M6 5.2 2.6 2.2M6 7.4 9.4 4.4",火:"M6 1.4C7.6 3.6 9.2 5.4 9.2 7.6A3.2 3.2 0 0 1 2.8 7.6C2.8 5.4 4.4 3.6 6 1.4Z",土:"M1.6 9.6h8.8M6 2.4v7.2M3.4 5.6h5.2",金:"M6 1.2 10.6 6 6 10.8 1.4 6Z",水:"M1.4 7.2C2.9 4.2 4.5 10.2 6 7.2 7.5 4.2 9.1 10.2 10.6 7.2"},oe=e=>{const n=me[e];return n?`<svg class="mp-wxi" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="${n}" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`:""},ue=e=>`<svg class="mp-trig" viewBox="0 0 14 10" aria-hidden="true" focusable="false">${(te[e]||[0,0,0]).slice().reverse().map((g,i)=>{const u=i*4;return g?`<rect x="0" y="${u}" width="14" height="2" rx="0.6" fill="currentColor"/>`:`<rect x="0" y="${u}" width="5.6" height="2" rx="0.6" fill="currentColor"/><rect x="8.4" y="${u}" width="5.6" height="2" rx="0.6" fill="currentColor"/>`}).join("")}</svg>`;l._hexBar=O,l._wxIcon=oe,l._triGlyph=ue;function Re(e,n){return!e||!e.length?"":e.map(p=>{const g=F[p.type]||"aux",i=p.mutagen?`<i class="pp-m ${V[p.mutagen]}">${p.mutagen}</i>`:"",u=n&&n[p.name],m=u?`<i class="pp-m view ${V[u]}">${u}</i>`:"",r=p.brightness?`<em class="pp-b ${W[p.brightness]||"mid"}">${p.brightness}</em>`:"";return`<span class="pp-st ${g}">${p.name}${r}${i}${m}</span>`}).join("")}function Ie(e){const n=[];for(let p=0;p<6;p++)n.push(e+p*12);return n.join(",")}const we=["命宫","兄弟","夫妻","子女","财帛","疾厄","迁移","交友","官禄","田宅","福德","父母"],le=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],Q=e=>(e%12+12)%12,xe=(e,n)=>e!==n&&[Q(n+4),Q(n+8),Q(n+6)].includes(e);function ma(e,n,p,g,i){const u=ne[e.branch]||[1,1],m=le.indexOf(e.branch),r=["pp-cell"];m===n?r.push("pp-soul"):xe(m,n)&&r.push("pp-tri"),e.isBody&&r.push("pp-shen"),u[0]===4&&r.push("pp-lastrow"),u[1]===4&&r.push("pp-lastcol");const b=e.shensha||{},x=we[Q(n-m)],f=e.selfHua&&e.selfHua.length?`<span class="pp-zh">${e.selfHua.map(w=>`<i class="pp-m self ${V[w.type]}" title="自化：宫干化回本宫">${w.type}</i>`).join("")}</span>`:"";let S="";if(m===n&&g){const w=z=>(F[z.type]||"")==="main";if(!(e.stars||[]).some(w)){const z=g.find(M=>le.indexOf(M.branch)===Q(m+6)),N=z?(z.stars||[]).filter(w):[];N.length&&(S=`<div class="pp-borrow" title="命宫无主星，借对宫（迁移宫）主星">借 ${N.map(M=>M.name).join(" ")}</div>`)}}return`<div class="${r.join(" ")}" data-pi="${m}" data-view="${p}" role="button" tabindex="0" aria-expanded="false" style="grid-row:${u[0]};grid-column:${u[1]}">
      <div class="pp-stars">${Re(e.stars,i)}${f}</div>
      ${S}
      <div class="pp-ages">${Ie(e.xiaoxian.age)}</div>
      <div class="pp-foot">
        <div class="ft-l">
          <span class="ft-dx">${b.boshi} ${e.daxian.start}-${e.daxian.end}</span>
          <span>${b.jiangqian}</span>
          <span>${b.suiqi}</span>
        </div>
        <div class="ft-r">
          <span>${b.changsheng}</span>
          <span>${e.ganzhi}</span>
          <span class="ft-pn">${x}</span>
        </div>
      </div>
    </div>`}function ta(e){try{const n=window.Engine||window.__PP&&window.__PP.Engine;if(!n||!n.buildBazi||!e.input)return"";const p=n.buildBazi({year:e.input.year,month:e.input.month,day:e.input.day,hour:e.input.hour,minute:e.input.minute,gender:e.input.gender,trueSolar:!1});return["year","month","day","hour"].map(g=>p.pillars[g].ganzhi).join(" ")}catch{return""}}l.ziweiHTML=function(e){const n=le.indexOf(e.soul.branch),p=e.liunian&&e.liunian[0]||null,g=p?p.age:1,i=e.palaces.find(L=>g>=L.daxian.start&&g<=L.daxian.end)||e.palaces[0],u=le.indexOf(i.branch),m=p?le.indexOf(p.lifePalace.branch):n,r=L=>{const C={};for(const _ of L||[])_&&_.star&&(C[_.star]=_.type);return C},b=(e.daxianList||[]).find(L=>L.branch===i.branch)||null,x={da:r(b&&b.mutagenHits),ln:r(p&&p.mutagenHits)},f=(L,C)=>e.palaces.map(_=>ma(_,L,C,e.palaces,x[C]||null)).join(""),S=(L,C)=>`<div class="pp-center">
        ${C==="da"?`<div class="ct-t1">大限 ${i.ganzhi}　${i.daxian.start}-${i.daxian.end}岁</div>`:C==="ln"&&p?`<div class="ct-t1">流年 ${p.ganzhi}　${p.age}岁</div>`:`<div class="ct-t1">${e.daxian.rule.slice(0,2)}　${e.bureau.name}</div>`}
        <div class="ct-t2">公历 ${e.input.year}-${String(e.input.month).padStart(2,"0")}-${String(e.input.day).padStart(2,"0")} ${String(e.input.hour).padStart(2,"0")}:${String(e.input.minute).padStart(2,"0")}</div>
        <div class="ct-t2">农历 ${e.lunar.year}年${e.lunar.isLeap?`闰${e.lunar.monthRaw||e.lunar.month}`:e.lunar.month}月${e.lunar.day}日${e.hourBranch}时${e.lunar.isLeap&&e.lunar.monthRaw&&e.lunar.month!==e.lunar.monthRaw?`（按${e.lunar.month}月起盘）`:""}</div>
        ${ta(e)?`<div class="ct-t3">${ta(e)}</div>`:""}
        <div class="ct-t4">命主 ${e.lifeMaster}　身主 ${e.bodyMaster}${e.bodyMasterNote?`<span class="pp-dim" title="${t(e.bodyMasterNote)}">＊</span>`:""}</div>
        <div class="ct-t4">命宫 ${e.soul.branch}　身宫 ${e.body.branch}　五行局 ${e.bureau.name}</div>
        <div class="ct-t4">子年斗君 ${e.doujun?e.doujun.zinian:"—"}　流年斗君 ${p&&p.doujun?p.doujun:"—"}</div>
        <div class="ct-t4">紫微 ${e.ziwei}　天府 ${e.tianfu}　${C==="da"?"大限命宫 "+le[u]:C==="ln"?"流年命宫 "+le[m]:"本命命宫 "+e.soul.branch}</div>
        ${C==="da"||C==="ln"?`<div class="ct-t4 pp-viewhua">${C==="da"?"大限":"流年"}四化　${(C==="da"?x.da:x.ln)&&Object.keys(C==="da"?x.da:x.ln).length?Object.entries(C==="da"?x.da:x.ln).map(([ae,X])=>`${ae}化${X}`).join("　"):'<span class="pp-dim">未飞四化</span>'}</div>`:""}
        <div class="pp-legend"><span class="pp-m lu">禄</span><span class="pp-m quan">权</span><span class="pp-m ke">科</span><span class="pp-m ji">忌</span><span>实心=生年四化　空心=大限/流年四化　虚下划线=自化　红框=命宫　浅底=三方四正</span></div>
      </div>`,w=(L,C,_)=>`<div class="pp-body ${L}" data-view="${_}" data-soul="${C}"><div class="pp-grid">${f(C,_)}${S(C,_)}</div><div class="pp-detail"></div></div>`,z=e.changqu,N=z?`<div class="pp-chips">
      <span class="pp-chip">昌 ${z.wenchang.branch}（${z.wenchang.palace}）</span>
      <span class="pp-chip">曲 ${z.wenqu.branch}（${z.wenqu.palace}）</span>
      <span class="pp-chip">${z.relation}</span>
      <span class="pp-chip">入命三方 ${z.inSoulSanfang?"是":"否"}</span>
      <span class="pp-chip ${z.absorb.label==="杂"?"warn":"ok"}">吸收·${z.absorb.label}</span>
    </div>`:"",M=(e.patterns||[]).length?`<div class="pp-chips">${e.patterns.map(L=>{const C=L.status==="broken"&&Array.isArray(L.breaks)&&L.breaks.length,_=`${L.evidence||""}${C?`；破格：${L.breaks.join("；")}`:""}`;return`<span class="pp-chip ${C?"broken":L.tone==="good"?"ok":L.tone==="bad"?"warn":""}" title="${t(_)}">${L.name}${C?"（破格）":""}</span>`}).join("")}</div>`:"",D=(e.daxianList||[]).length?`<div class="pp-chips">${e.daxianList.slice(0,8).map(L=>`<span class="pp-chip" title="${t(`${L.ganzhi} 宫干四化：`+L.mutagenHits.map(C=>`${C.star}化${C.type}→${C.palace||"未上盘"}`).join("、"))}">${L.branch} ${L.ages[0]}-${L.ages[1]}</span>`).join("")}</div>`:"",P=p&&p.mutagenHits&&p.mutagenHits.length?`<div class="pp-chips">${p.mutagenHits.map(L=>`<span class="pp-chip ${L.type==="忌"?"warn":L.type==="禄"?"ok":""}">${L.star}化${L.type}→${L.palace||"未上盘"}</span>`).join("")}</div>`:"",d=e.flyChains?(()=>{const L=["禄","权","科","忌"].map(C=>{const _=e.flyChains[C];if(!_||!_.steps.length)return"";const ae=_.path.map(ie=>String(ie).replace(/宫$/,"")).join("→"),X=_.steps.map(ie=>`${ie.from}（${ie.fromStem}）化${C}${ie.star}→${ie.to}`).join("；");return`<span class="pp-chip ${C==="忌"?"warn":C==="禄"?"ok":""}" title="${t(X)}">飞${C} ${t(ae)}${_.closed?"↺":""}</span>`}).join("");return L?`<div class="pp-chips">${L}</div>`:""})():"",y=e.flyComposite&&Array.isArray(e.flyComposite.labels)&&e.flyComposite.labels.length?`<div class="pp-chips">${e.flyComposite.labels.map(L=>{const C=/忌/.test(L)?"warn":/自化/.test(L)?"":"ok",_=ee=>String(ee).replace(/^.*?会/,"").replace(/^禄忌同宫/,"").replace(/自化$/,""),ae=(e.flyComposite.targets||[]).find(ee=>ee.palace===_(L)),X=ae?ae.incoming.map(ee=>`${ee.from}化${ee.type}${ee.star}`).join("、"):e.flyComposite.note;return`<span class="pp-chip ${C}" title="${t(X)}">三方四正 ${t(L)}</span>`}).join("")}</div>`:"",A=e.flow,I=A?(()=>{const L=X=>(X.mutagenHits||[]).length?X.mutagenHits.map(ee=>`<i>${ee.star}化${ee.type}<em>→${ee.palace||"未上盘"}</em></i>`).join(""):'<i class="dim">宫干无四化</i>',C=(X,ee,ie)=>`<div class="flow-row"><b>${X}</b><span class="flow-p"><span class="flow-k">${ee.ganzhi||"—"}　落${ee.palace||"未上盘"}（${ee.branch}）</span>${ie?`<em class="flow-same">${ie}</em>`:""}</span><span class="flow-m">${L(ee)}</span></div>`,ae=A.day.branch===A.month.branch?"（日数走满一圈，故同宫）":"";return`<div class="pp-flow">
        <div class="flow-row"><b>基准</b><span class="flow-p">${A.asOf.solar}</span><span class="flow-m">农历 ${A.asOf.lunar}　流年 ${A.asOf.yearGanzhi}（斗君 ${A.year.doujun}）</span></div>
        ${C(`流月 ${A.month.index} 月`,A.month)}
        ${C(`流日 ${A.day.index} 日`,A.day,ae)}
        ${C(`流时 ${le[A.hour.hourIndex]}时`,A.hour)}
      </div>`})():"";return l._zw=e,`<div class="pp">
      <input type="radio" name="ppm" id="ppm-ben" class="pp-r" checked>
      <input type="radio" name="ppm" id="ppm-da" class="pp-r">
      <input type="radio" name="ppm" id="ppm-ln" class="pp-r">
      <div class="pp-modes">
        <label for="ppm-ben">本命</label><label for="ppm-da">大限</label><label for="ppm-ln">流年</label>
        <span class="pp-soon">点任一宫位看详情</span>
      </div>
      ${w("ben",n,"ben")}
      ${w("da",u,"da")}
      ${w("ln",m,"ln")}
    </div>${I}${N}${d}${y}${M}${D}${P}`};function Ke(e){return e.length?e.map(n=>{const p=F[n.type]||"aux",g=n.brightness?`<em class="dt-br ${W[n.brightness]||"mid"}">${n.brightness}</em>`:"",i=n.mutagen?`<i class="pp-m ${V[n.mutagen]}">${n.mutagen}</i>`:"";return`<span class="dt-st ${p}">${n.name}${g}${i}</span>`}).join(""):'<span class="dt-empty">无</span>'}function ke(e,n){const p=l._zw;if(!p)return"";const g=d=>p.palaces.find(y=>le.indexOf(y.branch)===d),i=g(e)||p.palaces.find(d=>le.indexOf(d.branch)===e);if(!i)return"";const u=le.indexOf(i.branch),m=we[Q(n-u)],r=i.shensha||{},b=i.stars.filter(d=>d.type==="主星"),x=i.stars.filter(d=>d.type==="吉星"||d.type==="辅星"),f=i.stars.filter(d=>d.type==="煞星"),S=i.stars.filter(d=>!["主星","吉星","辅星","煞星"].includes(d.type)),w=(i.selfHua||[]).length?i.selfHua.map(d=>`<i class="pp-m self ${V[d.type]}" title="自化：宫干化回本宫">${d.type}</i>`).join(""):'<span class="dt-empty">无</span>',z=[Q(u+4),Q(u+8),Q(u+6)].map(d=>{const y=g(d),A=we[Q(n-d)],I=y?y.stars.filter(C=>C.type==="主星").map(C=>C.name).join("、"):"",L=d===Q(u+6)?"对宫":"三合";return`<span class="dt-st">${A}[${le[d]}]<b>${I||"无主星"}</b><em>${L}</em></span>`}).join(""),N=g(Q(u+6)),M=N?N.stars.filter(d=>d.type==="主星"):[],D=b.length?Ke(b):`<span class="dt-empty">无主星</span><span class="dt-tri">　借对宫 <b>${M.length?M.map(d=>d.name).join("、"):"亦无主星"}</b></span>`,P=(d,y)=>`<div class="dt-dr"><span class="dt-k">${d}</span><div class="dt-v">${y}</div></div>`;return`<div class="dt-dh">
        <b>${m}</b><span>${i.branch}宫 · ${i.ganzhi}</span>
        <span>大限 ${i.daxian.start}-${i.daxian.end}</span>
        <span>小限起 ${i.xiaoxian.age} 岁</span>
        ${i.isBody?"<span>· 身宫</span>":""}
        <span class="dt-x" data-pp-close="1">收起</span>
      </div>
      ${P("主星",D)}
      ${P("吉辅",Ke(x))}
      ${f.length?P("煞星",Ke(f)):""}
      ${S.length?P("杂曜",Ke(S)):""}
      ${P("宫干四化",w)}
      ${P("十二神",`<span class="dt-tri">长生 ${r.changsheng||"—"}　博士 ${r.boshi||"—"}　将前 ${r.jiangqian||"—"}　岁前 ${r.suiqi||"—"}</span>`)}
      ${P("三方四正",`<span class="dt-tri">${z}</span>`)}
      <div class="hint">三方四正在盘上已同步标出（浅红描边）。再点一次本宫可收起。</div>`}function ia(e){e.querySelectorAll(".pp-cell.pp-sel,.pp-cell.pp-link").forEach(n=>{n.classList.remove("pp-sel"),n.classList.remove("pp-link")}),e.querySelectorAll('.pp-cell[aria-expanded="true"]').forEach(n=>n.setAttribute("aria-expanded","false"))}function ve(){if(ve.done||typeof document>"u"||!document.addEventListener)return;ve.done=!0;const e=n=>{const p=n.closest(".pp-body");if(!p)return;const g=p.querySelector(".pp-detail");if(!g)return;if(n.classList.contains("pp-sel")){ia(p),g.classList.remove("open"),g.innerHTML="";return}ia(p);const i=Number(n.dataset.pi),u=Number(p.dataset.soul);p.querySelectorAll(".pp-cell").forEach(r=>{const b=Number(r.dataset.pi);(b===Q(i+4)||b===Q(i+8)||b===Q(i+6))&&r.classList.add("pp-link")}),n.classList.add("pp-sel"),n.setAttribute("aria-expanded","true"),g.innerHTML=ke(i,u),g.classList.add("open")};document.addEventListener("click",n=>{const p=n.target;if(p&&p.closest&&p.closest("[data-pp-close]")){const i=p.closest(".pp-body");if(i){ia(i);const u=i.querySelector(".pp-detail");u&&(u.classList.remove("open"),u.innerHTML="");return}}const g=p&&p.closest?p.closest(".pp-cell[data-pi]"):null;g&&e(g)}),document.addEventListener("keydown",n=>{if(n.key!=="Enter"&&n.key!==" ")return;const p=n.target&&n.target.closest?n.target.closest(".pp-cell[data-pi]"):null;p&&(n.preventDefault(),e(p))})}l.bindZiwei=ve,l._palaceDetailHTML=ke,ve();function ga(e,n){const p=n||{},g=e.slice().sort((i,u)=>u.position-i.position);return p.plain?g.map(i=>`<div class="mp-hy-row hy-plain">
        <span class="mp-hy-nm">${i.name||se[i.position-1]}</span>
        ${O(i.yinYang==="阳",i.moving)}
      </div>`).join(""):g.map(i=>{const u=i.yinYang==="阳",m=p.shiYing?i.position===p.shi?'<span class="mp-hy-sy">世</span>':i.position===p.ying?'<span class="mp-hy-sy">应</span>':"<span></span>":"<span></span>",r=i.moving?`<i class="mp-hy-mv" title="动爻">${u?"○":"×"}</i>`:'<i class="mp-hy-mv"></i>';return`<div class="mp-hy-row">
        ${m}
        <span class="mp-hy-nm">${i.name||se[i.position-1]}</span>
        <span class="mp-hy-ln">${O(u,i.moving)}${r}</span>
        <span class="mp-hy-gz">${t(i.ganzhi||"")}</span>
        <span class="mp-hy-lq">${t(i.liuqin||"")}</span>
        <span class="mp-hy-ls">${t(i.liushen||"")}</span>
      </div>`}).join("")}l.liuyaoHTML=function(e){const n=(d,y,A,I)=>`<div class="mp-hy-box">
      <div class="mp-hy-h"><b>${d}</b><span>${y}</span></div>
      <div class="mp-hy">${ga(I,{shiYing:!0,shi:A.shi,ying:A.ying})}</div>
    </div>`,p=n(`本卦 ${e.ben.name}`,`${e.ben.palace} · ${e.ben.palaceElement}`,e.ben,e.ben.lines),g=e.bian?n(`变卦 ${e.bian.name}`,`${e.bian.palace} · ${e.bian.palaceElement}`,e.bian,e.bian.lines):`<div class="mp-hy-box"><div class="mp-hy-h"><b>六爻安静</b><span>无动爻，不取变卦</span></div>
          <div class="pp-dim" style="font-size:12px;line-height:1.9">断卦以本卦卦辞与世应生克为主。</div></div>`,i=e.body&&Array.isArray(e.body.labels)?e.body.labels:[],u=i.length?`<div class="pp-chips">${i.map(d=>`<span class="pp-chip ${/伏吟/.test(d)||/反吟/.test(d)||/化退神/.test(d)?"warn":/六冲|散/.test(d)?"":"ok"}">${t(d)}</span>`).join("")}</div>`:'<div class="pp-chips"><span class="pp-chip">卦体无六冲、六合、伏吟、反吟</span></div>',m=e.useGod&&e.useGod.liuqin?e.useGod:null,r=m?`<div class="pp-chips">${m.labels.map(d=>`<span class="pp-chip ${/空亡|退神|受克|泄气|不上卦/.test(d)?"warn":/持世|化进|六合|得飞神生/.test(d)?"ok":""}">${t(d)}</span>`).join("")}</div>`:'<div class="pp-chips"><span class="pp-chip">用神未取（未指明所问之事）</span></div>',b=e.useGodStrength&&Array.isArray(e.useGodStrength.labels)?e.useGodStrength:null,x=b&&b.labels.length?`<div class="pp-chips">${b.labels.map(d=>`<span class="pp-chip ${/死|囚|月破|受日辰克|泄|耗/.test(d)?"warn":/旺|相|得日辰生|比和/.test(d)?"ok":""}">${t(d)}</span>`).join("")}</div>`:"",f=e.fushenAccess&&Array.isArray(e.fushenAccess.labels)?e.fushenAccess:null,S=f&&f.labels.length?`<div class="pp-chips">${f.labels.map(d=>`<span class="pp-chip ${/可出/.test(d)?"ok":/受压难出|有助有压/.test(d)?"warn":""}">伏神${t(d)}</span>`).join("")}</div>`:"",w=e.yingqi&&Array.isArray(e.yingqi.labels)?e.yingqi:null,z=w&&w.labels.length?`<div class="pp-chips">${w.labels.map(d=>`<span class="pp-chip ${/应期偏速/.test(d)?"ok":/应期待解/.test(d)?"warn":""}" title="只列地支，不出日期">${t(d)}</span>`).join("")}</div>`:"",N=e.jinTuiPower&&Array.isArray(e.jinTuiPower.labels)?e.jinTuiPower:null,M=N&&N.labels.length?`<div class="pp-chips">${N.labels.map(d=>`<span class="pp-chip ${/后劲足|退得缓/.test(d)?"ok":/有限|进得虚|退得实|月破|未定/.test(d)?"warn":""}">${t(d)}</span>`).join("")}</div>`:"",D=e.hexStrength&&Array.isArray(e.hexStrength.labels)?e.hexStrength:null,P=D&&D.labels.length?`<div class="pp-chips">${D.labels.map(d=>`<span class="pp-chip ${/死|囚|月破|冲空/.test(d)?"warn":/旺|相/.test(d)?"ok":""}">${t(d)}</span>`).join("")}</div>`:"";return`<div class="pp" style="padding:14px">
      <div class="mp-mh-head">起卦 ${e.cast.notation.join("、")}（自下而上）　日辰 ${e.dayGanZhi.name}</div>
      <div class="mp-hy-wrap">${p}${g}</div>
      ${u}
      ${r}
      ${x}
      ${S}
      ${z}
      ${M}
      ${P}
    </div>`},l.meihuaHTML=function(e){const n=(z,N,M,D,P)=>{const y=[...te[D]||[0,0,0],...te[M]||[0,0,0]].slice().reverse().map(A=>O(!!A,!1,"sm")).join("");return`<div class="mp-hexbox hb-mini">
        <div class="hb-h">${z}</div>
        <div class="hb-n">${N}</div>
        <div class="mp-mh-mini">${y}</div>
        <div class="hb-s">${P||`上${M} 下${D}`}</div>
      </div>`},p=e.lines.slice().sort((z,N)=>N.position-z.position),g=p.slice(0,3),i=p.slice(3),u=e.moving>=4,m=(z,N,M,D)=>`<div class="mp-trib">
      <div class="mp-trib-h">${z} ${ue(N)}${N}${fa(N)}<span class="mp-tritag ${D?"tritag-ti":"tritag-yong"}">${D?"体":"用"}</span></div>
      <div class="mp-hy" style="gap:5px">${ga(M,{plain:!0})}</div>
    </div>`,r=`<div class="mp-hexbox">
      <div class="hb-h"><span>本卦</span><span>动 ${e.movingName}</span></div>
      <div class="hb-n">${e.ben.name}</div>
      ${m("上卦",e.ben.upper,g,!u)}
      ${m("下卦",e.ben.lower,i,u)}
      <div class="hb-s">${e.source}</div>
    </div>`,b=e.bodyUse.level,x=b.includes("凶")?"bad":b.includes("吉")?"good":"flat",f=`<div class="mp-mh-rel">
      <div><b>体</b>${e.bodyUse.body.trigram}（${e.bodyUse.body.element}）　<b>用</b>${e.bodyUse.use.trigram}（${e.bodyUse.use.element}）</div>
      <div><span class="mh-lv ${x}">${b}</span>　${e.bodyUse.relation}</div>
    </div>`,S=ba(e.cuo.name)||["",""],w=ba(e.zong.name)||["",""];return`<div class="pp mp-mh">
      <div class="mp-mh-main">
        ${r}
        ${n("互卦",e.hu.name,e.hu.upper,e.hu.lower,"中藏之象")}
        ${n("变卦",e.bian.name,e.bian.upper,e.bian.lower,`动 ${e.movingName} 后`)}
        ${n("错卦",e.cuo.name,S[0],S[1],"六爻全变")}
        ${n("综卦",e.zong.name,w[0],w[1],"整卦倒转")}
      </div>
      ${f}
    </div>`};const ua={乾为天:["乾","乾"],天风姤:["乾","巽"],天山遁:["乾","艮"],天地否:["乾","坤"],风地观:["巽","坤"],山地剥:["艮","坤"],火地晋:["离","坤"],火天大有:["离","乾"],坎为水:["坎","坎"],水泽节:["坎","兑"],水雷屯:["坎","震"],水火既济:["坎","离"],泽火革:["兑","离"],雷火丰:["震","离"],地火明夷:["坤","离"],地水师:["坤","坎"],艮为山:["艮","艮"],山火贲:["艮","离"],山天大畜:["艮","乾"],山泽损:["艮","兑"],火泽睽:["离","兑"],天泽履:["乾","兑"],风泽中孚:["巽","兑"],风山渐:["巽","艮"],震为雷:["震","震"],雷地豫:["震","坤"],雷水解:["震","坎"],雷风恒:["震","巽"],地风升:["坤","巽"],水风井:["坎","巽"],泽风大过:["兑","巽"],泽雷随:["兑","震"],巽为风:["巽","巽"],风天小畜:["巽","乾"],风火家人:["巽","离"],风雷益:["巽","震"],天雷无妄:["乾","震"],火雷噬嗑:["离","震"],山雷颐:["艮","震"],山风蛊:["艮","巽"],离为火:["离","离"],火山旅:["离","艮"],火风鼎:["离","巽"],火水未济:["离","坎"],山水蒙:["艮","坎"],风水涣:["巽","坎"],天水讼:["乾","坎"],天火同人:["乾","离"],坤为地:["坤","坤"],地雷复:["坤","震"],地泽临:["坤","兑"],地天泰:["坤","乾"],雷天大壮:["震","乾"],泽天夬:["兑","乾"],水天需:["坎","乾"],水地比:["坎","坤"],兑为泽:["兑","兑"],泽水困:["兑","坎"],泽地萃:["兑","坤"],泽山咸:["兑","艮"],水山蹇:["坎","艮"],地山谦:["坤","艮"],雷山小过:["震","艮"],雷泽归妹:["震","兑"]},xa={乾:"金",兑:"金",离:"火",震:"木",巽:"木",坎:"水",艮:"土",坤:"土"},fa=e=>xa[e]?` ${xa[e]}`:"",ba=e=>ua[e]||null;l.daliurenHTML=function(e){const n=e.sanChuan,p=(r,b)=>`<div class="mp-dl-sc-c">
      <div class="mp-dl-sc-k">${b}</div>
      <div class="mp-dl-sc-z">${r.zhi}</div>
      <div class="mp-dl-sc-j">${r.jiangFull||r.jiang}</div>
      <div class="mp-dl-sc-l">${r.liuQin}${r.xunKong?" · 空":""}</div>
    </div>`,g=`<div class="mp-dl-sc-c ge">
      <div class="mp-dl-sc-k">格局</div>
      <div class="mp-dl-sc-gn">${e.geJu.name}</div>
      <div class="mp-dl-sc-l">${e.geJu.detail}</div>
    </div>`,i=e.siKe.slice().map(r=>`<div class="mp-dl-sk-c">
      <div class="mp-dl-sk-k">${["一课","二课","三课","四课"][r.position-1]||r.position+"课"}</div>
      <div class="mp-dl-sk-s">${r.shang}</div>
      <div class="mp-dl-sk-x">${r.xia}</div>
      <div class="mp-dl-sk-r">${r.relation} · ${r.jiangFull||r.jiang}</div>
    </div>`).join(""),u=e.pan.map(r=>{const b=ne[r.di]||[1,1];return`<div class="mp-dl-pc" style="grid-row:${b[0]};grid-column:${b[1]}">
        <div class="tz">${r.tian}</div>
        <div class="dz">地盘 ${r.di}</div>
        <div class="jz">${r.jiangFull}</div>
      </div>`}).join(""),m=`<div class="mp-dl-c">
      <div class="dl-t1">${e.dayGanZhi}日　${e.hourZhi}时</div>
      <div class="dl-t2">${e.dayNight}贵 · 月将 ${e.yueJiang.name}${e.yueJiang.zhi} · 贵人${e.guiren.reverse?"逆":"顺"}行</div>
      <div class="dl-t3">${n.chu.zhi} → ${n.zhong.zhi} → ${n.mo.zhi}</div>
      <div class="dl-t2">节气 ${e.jieqi.name}${e.jieqi.time?" "+e.jieqi.time:""}</div>
    </div>`;return`<div class="pp mp-dl">
      <div class="mp-dl-head">日 ${e.dayGanZhi}　时 ${e.hourZhi}（${e.dayNight}贵）　月将 ${e.yueJiang.name}${e.yueJiang.zhi}　节气 ${e.jieqi.name}　贵人${e.guiren.reverse?"逆":"顺"}行</div>
      <div class="mp-dl-sc">${p(n.chu,"初传")}${p(n.zhong,"中传")}${p(n.mo,"末传")}${g}</div>
      <div class="mp-dl-sk">${i}</div>
      <div class="mp-dl-pan2">${u}${m}</div>
      ${(e.shensha||[]).length?`<div class="mp-dl-ss"><b>神煞</b>${e.shensha.map(r=>`<span title="${t(r.note||"")}">${r.name}<i>${r.branch}</i></span>`).join("")}</div>`:""}
      <div class="mp-dl-legend"><span>大字＝天盘支</span><span>小字＝地盘（固定十二支）</span><span>右下＝天将</span></div>
    </div>`},l.tarotHTML=function(e){const n=e.cards.map(i=>`
      <div class="mp-tt-card ${i.upright?"tt-up":"tt-rev"}">
        <div class="mp-tt-pos" title="${t(i.positionHint||"")}">${i.position}</div>
        <div class="mp-tt-name">${i.name}${i.number?`<span class="mp-tt-no">${i.number}</span>`:""}</div>
        <div class="mp-tt-ori">${i.orientation}</div>
        ${i.core?`<div class="mp-tt-core">${i.core}</div>`:""}
        <div class="mp-tt-kw">${i.keywords.map(u=>`<span>${u}</span>`).join("")}</div>
        <div class="mp-tt-el">${i.arcana} · ${i.element}${i.suit?" · "+i.suit+(i.rankCn?i.rankCn:""):""}${i.domain?" · "+i.domain:""}</div>
      </div>`).join(""),p=e.question?t(e.question):'<span class="pp-dim">（未填写，可在上方输入后重抽）</span>',g=(e.reading||[]).map(i=>`<p>${t(i)}</p>`).join("");return`<div class="pp mp-tt">
      <div class="mp-tt-q"><b>所问</b>${p}</div>
      <div class="mp-tt-head">${e.spread}${e.castAt?`　·　抽牌于 ${e.castAt}`:""}</div>
      <div class="mp-tt-grid">${n}</div>
      <div class="mp-tt-read"><div class="mp-tt-rt">牌面解读</div>${g}</div>
      <div class="mp-tt-note"><div class="mp-tt-rt">你的记录</div>
        <textarea class="mp-tt-ta" rows="4" placeholder="写下判断或对照后的想法……（仅本页可见，不保存）"></textarea>
      </div>
      ${e.systemNote?`<div class="mp-tt-tip">${e.systemNote}</div>`:""}
      <div class="mp-tt-tip">塔罗用于自我觉察与娱乐，不作确定性预言。</div>
    </div>`},l.hepanHTML=function(e){const n=(g,i)=>`<div class="mp-hp-side">
      <div class="mp-hp-who">${i}</div>
      <div class="mp-hp-gz">${g.pillars.join(" ")}</div>
      <div class="mp-hp-kv"><span>日主</span><b>${g.dayMaster}</b></div>
      <div class="mp-hp-kv"><span>日支</span><b>${g.dayBranch}</b></div>
      <div class="mp-hp-kv"><span>强弱</span><b>${g.strength||"—"}</b></div>
      <div class="mp-hp-kv"><span>喜用</span><b>${g.favor||"—"}</b></div>
    </div>`,p=e.dimensions.map(g=>`<div class="mp-hp-dim">
      <div class="mp-hp-dimh"><span>${g.label}</span><b class="${g.score>=10?"good":g.score<0?"bad":""}">${g.score>=0?"+":""}${g.score}</b></div>
      <div class="mp-hp-dimt">${g.text}</div>
    </div>`).join("");return`<div class="pp mp-hp">
      <div class="mp-hp-head"><b>${e.score.level}</b><span>${e.score.total}/100</span></div>
      <div class="mp-hp-sides">${n(e.a,"你")}${n(e.b,"对方")}</div>
      <div class="mp-hp-dims">${p}</div>
      <div class="mp-hp-notes">${e.notes.map(g=>`<p>${g}</p>`).join("")}</div>
    </div>`},l.qimenFactsHTML=function(e){if(!e||!e.palaces)return"";const n=(i,u)=>`<div class="relation__row"><dt>${t(i)}</dt><dd>${t(u)}</dd></div>`,p=i=>i&&["旺","相","休","囚","死"].filter(m=>Array.isArray(i[m])&&i[m].length).map(m=>`${m} ${i[m].join("、")}`).join("；")||"—";return`<dl class="relation mp-qm-facts" aria-label="奇门盘面事实">${[["局数",`${e.ju}${e.yuan?`（${e.yuan}）`:""}`],["节气",`${e.jieqi||"—"}${e.jieqiTime?`（${e.jieqiTime}）`:""}`],["四柱",`${e.siZhu?`${e.siZhu.year} ${e.siZhu.month} ${e.siZhu.day} ${e.siZhu.time}`:"—"}`],["值符",e.zhiFu?`${e.zhiFu.star} · ${e.zhiFu.gong}宫`:"—"],["值使",e.zhiShi?`${e.zhiShi.gate} · ${e.zhiShi.gong}宫`:"—"],["旬首",e.xunshou||"—"],["空亡",(e.kongWang||[]).join("")||"—"],["驿马",e.ma&&e.ma.zhi?`${e.ma.zhi}${e.ma.gong?`（${e.ma.gong}宫）`:""}`:"—"],["换局规则",e.juMethodNote||e.juMethod||"—"],["晚子时",e.lateZiHourMode==="next-day"?"23:00 后归次日":"23:00 后仍归当日"],["击刑",e.conditions&&e.conditions.jiXing&&e.conditions.jiXing.length?e.conditions.jiXing.map(i=>`${i.palace}宫${i.stem}`).join("、"):"本盘无"],["三奇入墓",e.conditions&&e.conditions.ruMu&&e.conditions.ruMu.length?e.conditions.ruMu.map(i=>`${i.palace}宫${i.stem}`).join("、"):"本盘无"],["六仪入墓",e.conditions&&e.conditions.liuYiRuMu&&e.conditions.liuYiRuMu.length?e.conditions.liuYiRuMu.map(i=>`${i.palace}宫${i.stem}`).join("、"):"本盘无"],["十干克应",[...e.palaces||[],e.centerPalace].filter(u=>u&&u.ganYing).map(u=>`${u.palace}宫 ${u.ganYing.tian}加${u.ganYing.di}「${u.ganYing.name}」`).join("；")||"—"],["月令",e.month&&e.month.branch?`${e.month.branch}（${e.month.element}）`:"—"],["门旺衰",p(e.states&&e.states.gate)],["星旺衰",p(e.states&&e.states.star)],["干旺衰",p(e.states&&e.states.stem)],["干宫生克",(()=>{const i=["干克宫","宫克干","干生宫","宫生干","比和"],u={};for(const m of e.palaces||[]){const r=m.stemRelation||null;!r||r.type==="unknown"||!m.tianPan||(u[r.type]=u[r.type]||[]).push(m.tianPan)}return i.filter(m=>u[m]).map(m=>m+" "+u[m].join("、")).join("；")||"—"})()]].map(([i,u])=>n(i,u)).join("")}</dl>`};const qe=[["4","9","2"],["3","5","7"],["8","1","6"]];l.qimenHTML=function(e){const n={};for(const g of e.palaces)n[g.palace]=g;const p=g=>{if(g==="5")return`<div class="pp-qm-cell center">
          <div class="pp-qm-ju">${e.ju}</div>
          <div class="pp-qm-kv">${e.siZhu.year} ${e.siZhu.month}</div>
          <div class="pp-qm-kv">${e.siZhu.day} ${e.siZhu.time}</div>
          <div class="pp-qm-kv dim">${e.jieqi} ${e.yuan}</div>
        </div>`;const i=n[g]||{};return`<div class="pp-qm-cell">
        <div class="pp-qm-top"><span class="god">${i.god||""}</span><span class="mk">${i.kong?"空":""}${i.ma?"马":""}</span></div>
        <div class="pp-qm-mid"><span class="tp">${i.tianPan||""}</span><span class="star">${i.star||""}</span></div>
        <div class="pp-qm-mid"><span class="dp">${i.diPan||""}</span><span class="gate">${i.gate||""}</span></div>
        <div class="pp-qm-bot"><span>${i.anGan||""}</span><span class="no">${g}</span></div>
        <div class="pp-qm-bot"><span class="dim">${i.stemRelation&&i.stemRelation.type!=="unknown"?i.stemRelation.type:""}</span><span class="dim">${i.stemState||""}</span></div>
        <div class="pp-qm-bot"><span class="dim">${i.ganYing?t(`${i.ganYing.tian}加${i.ganYing.di} ${i.ganYing.name}`):""}</span></div>
      </div>`};return`<div class="pp mp-qm">
      <div class="mp-qm-head">
        <b>${e.ju}</b>
        <span>${e.siZhu.year} ${e.siZhu.month} ${e.siZhu.day} ${e.siZhu.time}</span>
        <span>节气 ${e.jieqi}（${e.jieqiTime}）</span>
        <span>值符 ${e.zhiFu.star}（${e.zhiFu.gong}宫）　值使 ${e.zhiShi.gate}（${e.zhiShi.gong}宫）</span>
        <span>旬首 ${e.xunshou}　空亡 ${e.kongWang.join("")||"—"}　驿马 ${e.ma.zhi||"—"}</span>
      </div>
      <div class="mp-qm-grid">${qe.map(g=>g.map(p).join("")).join("")}</div>
      <div class="mp-qm-legend">上＝九星　中＝天盘干／八门　下＝地盘干／宫号　角落＝八神</div>
      <div class="mp-qm-rules">${e.rules.map(g=>`<p>${g}</p>`).join("")}</div>
    </div>`},l.ziweiHepanHTML=function(e){const n=(i,u)=>`<div class="mp-hp-side">
      <div class="mp-hp-who">${u}</div>
      <div class="mp-hp-gz">命宫 ${i.soul.branch}　夫妻 ${i.soul.branch,""}${i.spouseStars.length,""}</div>
      <div class="mp-hp-kv"><span>命宫主星</span><b>${i.soulStars.join("、")||"无正曜"}</b></div>
      <div class="mp-hp-kv"><span>夫妻宫主星</span><b>${i.spouseStars.join("、")||"无正曜"}</b></div>
      <div class="mp-hp-kv"><span>五行局</span><b>${i.bureau}</b></div>
      <div class="mp-hp-kv"><span>身宫</span><b>${i.body.branch}（${i.body.lands||"—"}）</b></div>
      <div class="mp-hp-kv"><span>生年四化</span><b>${i.natalSihua.join("、")}</b></div>
    </div>`,p=e.dimensions.map(i=>`<div class="mp-hp-dim">
      <div class="mp-hp-dimh"><span>${i.label}</span><b class="${i.score>=10?"good":i.score<0?"bad":""}">${i.score>=0?"+":""}${i.score}</b></div>
      <div class="mp-hp-dimt">${i.text}</div>
    </div>`).join(""),g=i=>(e.interactions||[]).filter(u=>u.who===i).map(u=>`<li><b class="m-${u.mutagen}">${u.mutagen}</b>${u.star}：本命${u.ownPalace} → 对方${u.landingPalace||"盘外"}${u.strong?"<i>（强）</i>":""}</li>`).join("");return`<div class="pp mp-hp">
      <div class="mp-hp-head"><b>${e.score.level}</b><span>${e.score.total}/100　紫微合盘</span></div>
      <div class="mp-hp-sides">${n(e.a,"你")}${n(e.b,"对方")}</div>
      <div class="mp-hp-dims">${p}</div>
      <div class="mp-hp-inter">
        <div><div class="mp-hp-ith">你的四化 落在对方</div><ul>${g("你")||"<li>无</li>"}</ul></div>
        <div><div class="mp-hp-ith">对方的四化 落在你</div><ul>${g("对方")||"<li>无</li>"}</ul></div>
      </div>
      <div class="mp-hp-notes">${e.notes.map(i=>`<p>${i}</p>`).join("")}</div>
    </div>`},l.curveHTML=function(e){const n=e&&e.dayun&&Array.isArray(e.dayun.list)?e.dayun.list:[],p=e&&Array.isArray(e.liunian)?e.liunian:[];if(n.length<2)return"";const g=j=>typeof j=="number"&&isFinite(j)?j:0,i=j=>j.luck?g(j.luck.score):0,u=4.2,m=-2.2,r=g(e.dayun.startAge&&e.dayun.startAge.years),b=n.length?n[n.length-1].startAge+10:r+80,x=p.map(j=>g(j.age)).filter(j=>j>0),f=Math.min(r,...x.length?x:[r]),S=Math.max(b,...x.length?x:[b]),w=Math.max(1,S-f),z=640,N=190,M={t:14,r:16,b:26,l:30},D=z-M.l-M.r,P=N-M.t-M.b,d=j=>M.l+(j-f)/w*D,y=j=>M.t+P-(Math.max(m,Math.min(u,j))-m)/(u-m)*P,I=[{from:1.2,to:u,cls:"b-good"},{from:.55,to:1.2,cls:"b-good"},{from:-.8,to:.55,cls:"b-flat"},{from:-1.45,to:-.8,cls:"b-bad"},{from:m,to:-1.45,cls:"b-bad"}].map(j=>`<rect class="cv-band ${j.cls}" x="${M.l}" y="${y(j.to).toFixed(1)}" width="${D}" height="${(y(j.from)-y(j.to)).toFixed(1)}"/>`).join(""),L=10/w*D,C=[];n.forEach((j,be)=>{const h=g(j.startAge),ce=i(j),Ue=Math.max(M.l,d(h)),He=Math.min(M.l+D,d(h+10));C.push(`${Ue.toFixed(1)},${y(ce).toFixed(1)}`),C.push(`${He.toFixed(1)},${y(ce).toFixed(1)}`)});const _=C.length?`<polyline class="cv-dy" points="${C.join(" ")}"/>`:"",ae=C.length?`<polygon class="cv-dyfill" points="${M.l},${(M.t+P).toFixed(1)} ${C.join(" ")} ${(M.l+D).toFixed(1)},${(M.t+P).toFixed(1)}"/>`:"",X=p.filter(j=>j.luck&&typeof j.luck.score=="number").map(j=>({x:d(g(j.age)),y:y(g(j.luck.score)),y0:g(j.year),gz:j.ganzhi,tier:j.luck.tier,v:g(j.luck.score),age:g(j.age)})),ee=X.length>1?`<polyline class="cv-ln" points="${X.map(j=>`${j.x.toFixed(1)},${j.y.toFixed(1)}`).join(" ")}"/>`:"",ie={大吉:"var(--lu)",吉:"var(--lu)",平:"var(--muted)",忌:"var(--red)",大忌:"var(--red)"},ze=X.length?Math.min(...X.map(j=>j.y0)):null,fe=X.map(j=>`<circle class="cv-dot${j.y0===ze?" now":""}" cx="${j.x.toFixed(1)}" cy="${j.y.toFixed(1)}" fill="${ie[j.tier]||"var(--muted)"}"><title>${t(`${j.y0}年（${j.age}岁）${j.gz}　${j.tier} ${j.v}`)}</title></circle>`).join(""),Be=`<line class="cv-ax zero" x1="${M.l}" y1="${y(0).toFixed(1)}" x2="${M.l+D}" y2="${y(0).toFixed(1)}"/><line class="cv-ax" x1="${M.l}" y1="${M.t}" x2="${M.l}" y2="${M.t+P}"/>`,ge=w>60?10:5,Me=[];for(let j=Math.ceil(f/ge)*ge;j<=S;j+=ge)Me.push(`<text class="cv-lbl age" x="${d(j).toFixed(1)}" y="${(M.t+P+13).toFixed(1)}" text-anchor="middle">${j}岁</text>`);const Se=`<text class="cv-lbl" x="${(M.l-5).toFixed(1)}" y="${(y(2.4)+3).toFixed(1)}" text-anchor="end">吉</text><text class="cv-lbl" x="${(M.l-5).toFixed(1)}" y="${(y(0)+3).toFixed(1)}" text-anchor="end">平</text><text class="cv-lbl" x="${(M.l-5).toFixed(1)}" y="${(y(-1.8)+3).toFixed(1)}" text-anchor="end">忌</text>`,H=n.slice().sort((j,be)=>i(be)-i(j)),c=H[0],v=H[H.length-1],G=c&&i(c)>.55?`<text class="cv-lbl" x="${d(g(c.startAge)+5).toFixed(1)}" y="${(y(i(c))-5).toFixed(1)}" text-anchor="middle">▲${c.startAge}岁 ${c.luck.tier}</text>`:"",U=v&&i(v)<-.8?`<text class="cv-lbl" x="${d(g(v.startAge)+5).toFixed(1)}" y="${(y(i(v))+11).toFixed(1)}" text-anchor="middle">▼${v.startAge}岁 ${v.luck.tier}</text>`:"",pe=`<div class="cv-legend">
      <span><i style="background:var(--quan)"></i>大运（阶梯，一步十年）</span>
      <span><i style="background:var(--ke)"></i>流年（逐年折线）</span>
      <span>绿带＝吉　灰带＝平　红带＝忌</span>
    </div>`,je=`<div class="cv-tip">曲线只呈现引擎已给出的行运评分（${m} ~ ${u}），不预测具体事件；档位与依据见下方「大运 / 流年」各节。悬停看逐年详情。</div>`;return`<div class="mp-curve">
      <div class="mp-curve-h"><b>人生运势曲线</b><span>${f}–${S} 岁　${e.dayun.rule}，${r} 岁起运${e.dayun.jiao&&e.dayun.jiao.at?`，交运 ${e.dayun.jiao.at}`:""}</span></div>
      <svg viewBox="0 0 ${z} ${N}" role="img" aria-label="人生运势曲线：${f} 到 ${S} 岁的大运与流年评分走势">
        ${I}${Be}${ae}${_}${ee}${fe}${Me.join("")}${Se}${G}${U}
      </svg>
      ${pe}${je}
    </div>`};let Ha=0;l.trendChart=function(e){const n=e&&Array.isArray(e.points)?e.points:[];if(n.length<2)return"";const p=e&&Array.isArray(e.segments)?e.segments:[],g=H=>typeof H=="number"&&isFinite(H)?H:0,i=720,u=322,m={t:34,r:46,b:66,l:36},r=i-m.l-m.r,b=u-m.t-m.b,x=n.length,f=r/x,S=H=>m.l+(H+.5)*f,w=H=>m.t+b-Math.max(0,Math.min(100,H))/100*b,z=Math.max(1.1,Math.min(10,f*.62)),N=H=>g(H.score),M=m.t+b,D=M+20,P=22,d=`klclip${Ha+=1}`,y=p.map((H,c)=>{const v=Math.max(0,H.startAge-1),G=Math.min(x-1,H.endAge-1);if(G<v)return"";const U=m.l+v*f,pe=Math.max(.6,(G-v+1)*f),j=c%2===1?`<rect class="kl-band" x="${U.toFixed(1)}" y="${m.t}" width="${pe.toFixed(1)}" height="${b}"/><rect class="kl-stripband" x="${U.toFixed(1)}" y="${D}" width="${pe.toFixed(1)}" height="${P}"/>`:"",be=c===0?"":`<line class="kl-segline" x1="${U.toFixed(1)}" y1="${m.t}" x2="${U.toFixed(1)}" y2="${M}"/>`,h=Math.min(Math.max(m.l+(v+G+1)/2*f,m.l+22),m.l+r-22);return j+be+`<text class="kl-seg" x="${h.toFixed(1)}" y="${(D+15).toFixed(1)}" text-anchor="middle">${t(H.ganZhi)}</text>`}).join(""),A=[0,25,50,75,100].map(H=>`<line class="kl-grid${H===50?" mid":""}" x1="${m.l}" y1="${w(H).toFixed(1)}" x2="${m.l+r}" y2="${w(H).toFixed(1)}"/><text class="kl-lbl" x="${m.l-6}" y="${(w(H)+3).toFixed(1)}" text-anchor="end">${H}</text>`).join(""),I=n.map((H,c)=>{const v=H.kline||{},G=g(v.open),U=g(v.close),pe=Math.min(100,g(v.high)),je=Math.max(0,g(v.low)),j=U>=G,be=w(G),h=w(U),ce=Math.min(be,h),Ue=Math.max(.8,Math.abs(be-h)),He=S(c),Fe=`${H.age}岁（${H.year}年 ${H.ganZhi}）${U}分${H.dayunGanZhi?` · ${H.dayunGanZhi}运`:""}`;return`<g class="kl-c${j?" up":" down"}"><title>${t(Fe)}</title><line x1="${He.toFixed(2)}" y1="${w(pe).toFixed(1)}" x2="${He.toFixed(2)}" y2="${w(je).toFixed(1)}"/><rect x="${(He-z/2).toFixed(2)}" y="${ce.toFixed(1)}" width="${z.toFixed(2)}" height="${Ue.toFixed(1)}" rx="0.7"/></g>`}).join(""),L=H=>{const c=[];for(let v=0;v<x;v++){if(v+1<H)continue;let G=0;for(let U=v+1-H;U<=v;U++)G+=N(n[U]);c.push({i:v,v:G/H})}return c},C=H=>L(H).map((c,v)=>`${v?"L":"M"}${S(c.i).toFixed(1)} ${w(c.v).toFixed(1)}`).join(" "),_=(H,c)=>{const v=L(H);if(!v.length)return"";const G=v[v.length-1];return{cls:c,y:w(G.v),text:`<text class="kl-ma-lbl ${c}" x="${m.l+r+5}" y="${w(G.v).toFixed(1)}" text-anchor="start">${G.v.toFixed(0)}</text>`}},ae=_(10,"m10"),X=_(5,"m5"),ee=(()=>{if(!X||!ae)return`${ae?ae.text:""}${X?X.text:""}`;let H=X.y,c=ae.y;if(Math.abs(H-c)<10){const v=Math.min(H,c),G=Math.max(H,c);H=v-6,c=G+6}return`<text class="kl-ma-lbl m10" x="${m.l+r+5}" y="${c.toFixed(1)}" text-anchor="start">${L(10).slice(-1)[0].v.toFixed(0)}</text><text class="kl-ma-lbl m5" x="${m.l+r+5}" y="${H.toFixed(1)}" text-anchor="start">${L(5).slice(-1)[0].v.toFixed(0)}</text>`})();let ie=n[0],ze=n[0];for(const H of n)N(H)>N(ie)&&(ie=H),N(H)<N(ze)&&(ze=H);const fe=(H,c,v)=>{const G=n.indexOf(H),U=S(G),pe=w(N(H)),je=Math.min(Math.max(U,m.l+26),m.l+r-26),j=c==="hi"?pe-8<m.t+6?14:v:pe+12>m.t+b-2?-8:v;return`<g class="kl-mark ${c}"><circle cx="${U.toFixed(1)}" cy="${pe.toFixed(1)}" r="2"/><circle class="ring" cx="${U.toFixed(1)}" cy="${pe.toFixed(1)}" r="4.6"/><text x="${je.toFixed(1)}" y="${(pe+j).toFixed(1)}" text-anchor="middle">${H.age}岁 ${N(H)}</text></g>`},Be=x>60?10:5,ge=n.filter(H=>H.age%Be===0).map(H=>`<text class="kl-lbl age" x="${S(n.indexOf(H)).toFixed(1)}" y="${(M+14).toFixed(1)}" text-anchor="middle">${H.age}</text>`).join(""),Me=`<text class="kl-lbl axis" x="${m.l}" y="${(u-6).toFixed(1)}">年龄（岁）</text><text class="kl-lbl axis" x="${m.l+r}" y="${(u-6).toFixed(1)}" text-anchor="end">每岁一分 · 满分 100</text>`;return`<div class="mp-kline-fig">
      <svg viewBox="0 0 ${i} ${u}" role="img" aria-label="人生K线：1 到 ${x} 岁的逐年评分蜡烛图">
        <defs><clipPath id="${d}"><rect x="${m.l}" y="${m.t}" width="${r}" height="${b}"/></clipPath></defs>
        ${y}${A}
        <g clip-path="url(#${d})">
          ${I}
          <path class="kl-ma m10" d="${C(10)}"/><path class="kl-ma m5" d="${C(5)}"/>
        </g>
        ${ee}
        ${fe(ie,"hi",-8)}${fe(ze,"lo",12)}
        ${ge}${Me}
      </svg><div class="kl-legend"><span><i class="up"></i>阳线：比上一岁高</span><span><i class="down"></i>阴线：比上一岁低</span><span><i class="m5"></i>5 年均线</span><span><i class="m10"></i>10 年均线</span><span>虚线＝大运交界</span></div></div>`},l.trendHTML=function(e){if(!e)return"";const n=l.trendChart(e);if(!n)return l.quickHTML(e);const p=Array.isArray(e.segments)?e.segments:[],g=e.highlights&&typeof e.highlights=="object"?e.highlights:{},i=e.meta||{},u=i.strength||{},m=p.map(y=>`<span class="kl-chip">${t(y.ganZhi)}<em>${y.startAge}–${y.endAge}</em></span>`).join(""),r=(Array.isArray(g.best)?g.best:[]).map(y=>`<div class="kl-hl hi">${t(y)}</div>`).join(""),b=(Array.isArray(g.worst)?g.worst:[]).map(y=>`<div class="kl-hl lo">${t(y)}</div>`).join(""),x=i.boundaryNote?`<div class="mp-kline-note">${t(i.boundaryNote)}</div>`:g.suppressed?`<div class="mp-kline-note">${t(g.suppressed)}</div>`:"",f=Array.isArray(e.points)?e.points:[],S=y=>typeof y.score=="number"&&isFinite(y.score)?y.score:0,w=f.map(S),z=w.length?w.reduce((y,A)=>y+A,0)/w.length:0,N=w.length?Math.max(...w)-Math.min(...w):0,M=p.map(y=>{const A=f.filter(I=>I.age>=y.startAge&&I.age<=y.endAge).map(S);return{ganZhi:y.ganZhi,v:A.length?A.reduce((I,L)=>I+L,0)/A.length:0}}).filter(y=>y.v>0).sort((y,A)=>A.v-y.v),D=!!(u.boundary||g.suppressed),P=[`<span><em>全段均值</em><b>${z.toFixed(0)}</b></span>`];!D&&M.length&&(P.push(`<span><em>最好大运</em><b class="hi">${t(M[0].ganZhi)} ${M[0].v.toFixed(0)}</b></span>`),P.push(`<span><em>最差大运</em><b class="lo">${t(M[M.length-1].ganZhi)} ${M[M.length-1].v.toFixed(0)}</b></span>`)),P.push(`<span><em>波动幅度</em><b>${N.toFixed(0)}</b></span>`);const d=`<div class="kl-stats">${P.join("")}</div>`;return`<section class="mp-kline" aria-label="人生K线结果">
      <div class="mp-kline-h"><b>人生 K 线</b><span>${t(i.birth||"")}　日主 ${t(i.dayMaster||"")}　${t(u.level||"")}${u.score?`（${u.score}）`:""}</span></div>
      ${n}
      ${d}
      ${m?`<div class="kl-segs">${m}</div>`:""}
      ${r||b?`<div class="kl-hls">${r}${b}</div>`:""}
      ${x}
      <div class="mp-kline-tip">逐岁分数由大运与流年十神按固定表确定性计分（1–100），只表五行力量的顺逆，不预测具体事件；旺衰落在换档阈值附近时，不出高低年份结论。</div>
    </section>`},l.chengguHTML=function(e){if(!e)return"";const n=e.weights||{},p=e.song||{},g=["year","month","day","hour"].map(r=>{const b=n[r]||{label:"",qian:0},x=String(b.label||"").split(" ")[0]||"",f=String(b.label||"").split(" ")[1]||"";return`<div class="cg-cell"><em>${t(x)}</em><b>${t(f)}</b></div>`}).join(""),i=String(p.text||""),u=i?i.replace(/[。]$/,"").split("；").map((r,b)=>`<span>${t(r)}${b===0?"；":"。"}</span>`).join(""):"",m=e.verdict&&e.verdict.band?e.verdict.band:"";return`<section class="mp-cg" aria-label="称骨结果">
      <div class="mp-cg-h"><b>称骨</b><span>${t(e.lunar&&e.lunar.text?e.lunar.text:"")}</span></div>
      <div class="mp-cg-w">${g}</div>
      <div class="mp-cg-tot"><em>骨重合计</em><b>${t(e.total&&e.total.label?e.total.label:"")}</b>${m?`<i>${t(m)}</i>`:""}</div>
      <div class="mp-cg-song"><div class="mp-cg-song-h">称骨歌 · ${t(e.total&&e.total.label?e.total.label:"")}</div>
        <div class="mp-cg-verse">${u||'<span class="mp-cg-miss">该骨重未见通行本歌诀</span>'}</div>
        <div class="mp-cg-plain"><em>释义</em>${t(p.plain||"")}</div></div>
      ${e.verdict&&e.verdict.text?`<div class="mp-cg-band"><em>分档</em>${t(e.verdict.text)}</div>`:""}
      <div class="mp-cg-note">骨重与歌诀为通行本口径（各版本歌诀有异文，断句标点已统一）；释义为白话自撰，只作字面直解，属民俗娱乐参考，不构成命运断言。</div>
    </section>`},l.nameHTML=function(e){if(!e)return"";const n={木:"wood",火:"fire",土:"earth",金:"metal",水:"water"},p=x=>x==="未收录"?'<span class="mp-nm-el">未收录</span>':`<span class="mp-nm-el wx-${n[x]||"earth"}">${t(x)}</span>`,g=(x,f)=>`<div class="mp-nm-h"><b>${t(x)}</b>${f?`<i>${t(f)}</i>`:""}</div>`;if(e.action==="generate"){const x=e.bazi&&e.bazi.favorable?e.bazi.favorable.join("、"):"",f=(e.candidates||[]).map(S=>{const w=S.wuge&&S.wuge.available?(()=>{const N=S.wuge.rows.filter(P=>P.level==="吉").length,M=S.wuge.rows.filter(P=>P.level==="凶").length;return`<span class="mp-nm-fit${M===0&&N>=4?" ok":M>=2?" no":""}" title="${t(S.wuge.summary)}">五格 ${N}/5 吉</span>`})():"",z=S.phonetics&&S.phonetics.available?`<span class="mp-nm-fit${S.phonetics.level==="拗口"?" no":S.phonetics.level==="顺口"?" ok":""}" title="${t((S.phonetics.issues||[]).map(N=>N.text).join("；"))}">${t(S.phonetics.level)}</span>`:"";return`<div class="mp-nm-c"><b>${t(S.name)}</b><span class="mp-nm-els">${S.chars.map(N=>p(N.element)).join("")}${w}${z}</span><em>${t(S.chars.map(N=>N.char+"·"+N.meaning).join("　"))}</em></div>`}).join("");return`<section class="mp-nm" aria-label="候选名">
        ${g("候选名",`姓 ${e.surname}（${e.gender}）${x?`　喜用 ${x}`:""}`)}
        <div class="mp-nm-cand">${f}</div>
        <div class="mp-nm-note">${(e.notes||[]).map(S=>"※ "+t(S)).join("<br>")}</div>
      </section>`}const i=(e.chars||[]).map(x=>{const f=x.favorable===!0?'<span class="mp-nm-fit ok">合喜用</span>':x.favorable===!1?'<span class="mp-nm-fit no">不合喜用</span>':'<span class="mp-nm-fit">不判</span>',S=x.source==="user"?"用户指定":x.source==="lib"?"字库":"未收录",w=x.suggest&&x.suggest.length?`<div class="mp-nm-sug"><b>可换</b>${x.suggest.map(z=>`<span class="wx-${n[z.element]||"earth"}">${t(z.char)}（${t(z.element)}）</span>`).join("")}</div>`:"";return`<div class="mp-nm-row"><div class="mp-nm-ch">${t(x.char)}</div>
        <div class="mp-nm-b"><div class="mp-nm-t">${p(x.element)}<span>${t(S)}</span>${f}</div>
        <div class="mp-nm-m">${t(x.meaning)}</div>${w}</div></div>`}).join(""),u=e.bazi?`<div class="mp-nm-m">八字：${t(e.bazi.dayMaster&&e.bazi.dayMaster.stem?`${e.bazi.dayMaster.stem}（${e.bazi.dayMaster.element}）`:String(e.bazi.dayMaster||""))}　${t(e.bazi.strength?`${e.bazi.strength.level}（${e.bazi.strength.score}）`:"")}　喜用 ${t((e.bazi.favorable||[]).join("、"))}</div>
         <div class="mp-nm-m">${t(e.bazi.basis||"")}</div>`:"",m=x=>x==="吉"?"is-ok":x==="半吉"?"is-half":"is-bad",r=e.wuge&&e.wuge.available?`<div class="mp-nm-wu">
          <div class="mp-nm-wu-h"><b>五格</b><i>康熙笔画 · 通行本 81 数理</i></div>
          <div class="mp-nm-wu-rows">${e.wuge.rows.map(x=>`<div class="mp-nm-wu-c ${m(x.level)}"><em>${t(x.key)}</em><b>${x.strokes}</b><i>${t(`${x.level} · ${x.name}`)}</i></div>`).join("")}</div>
          <div class="mp-nm-m">笔画：${e.wuge.strokes.map(x=>`${t(x.char)}${x.strokes}${x.source==="user"?"（指定）":""}`).join(" ＋ ")}</div>
          <div class="mp-nm-m">三才：${t(e.wuge.sancai.text)}</div>
        </div>`:`<div class="mp-nm-wu"><div class="mp-nm-wu-h"><b>五格</b><i>这一版算不了</i></div><div class="mp-nm-m">${t(e.wuge?e.wuge.reason:"未算")}</div></div>`,b=e.phonetics&&e.phonetics.available?`<div class="mp-nm-ph"><b>音韵</b><span class="mp-nm-ph-lv${e.phonetics.level==="顺口"?" ok":e.phonetics.level==="拗口"?" bad":" warn"}">${t(e.phonetics.level)}</span><em>${t(e.phonetics.chars.map(x=>`${x.py}${x.tone}`).join(" "))}　声调 ${t(e.phonetics.tonePattern)}</em>${(e.phonetics.issues||[]).map(x=>`<span class="mp-nm-ph-i">${t(x.text)}</span>`).join("")}</div>`:`<div class="mp-nm-ph"><b>音韵</b><em>${t(e.phonetics?e.phonetics.reason:"未算")}</em></div>`;return`<section class="mp-nm" aria-label="名字评估">
      ${g(e.fullName||"",`字库 ${e.stats&&e.stats.libSize?e.stats.libSize:""} 字${e.stats&&e.stats.unknown?`　未收录 ${e.stats.unknown}`:""}`)}
      ${i}
      ${u}
      ${r}
      ${b}
      <div class="mp-nm-verd">${t(e.verdict||"")}</div>
      <div class="mp-nm-note">${(e.notes||[]).map(x=>"※ "+t(x)).join("<br>")}</div>
    </section>`},l.baziHTML=function(e){const n=[["year","年柱"],["month","月柱"],["day","日柱"],["hour","时柱"]],p={year:"年",month:"月",day:"日",hour:"时"},g={木:"wood",火:"fire",土:"earth",金:"metal",水:"water"},i={比肩:"tg-bi",劫财:"tg-bi",食神:"tg-shi",伤官:"tg-shi",偏财:"tg-cai",正财:"tg-cai",七杀:"tg-guan",正官:"tg-guan",偏印:"tg-yin",正印:"tg-yin"},u=c=>`<span class="tg ${i[c]||""}">${c}</span>`,m=c=>`<span class="wx-${g[c]||"earth"}">${oe(c)}${c}</span>`,r=c=>`<span class="ss-s ${c.luck||"neutral"}" title="${t(`${c.cat} · ${c.via}查${c.target} ｜ ${c.rule}`)}">${c.name}</span>`,b=(c,v)=>`<tr><td class="bz-lbl">${c}</td>${n.map(([G])=>`<td data-c="${p[G]}">${v(e.pillars[G],G)}</td>`).join("")}</tr>`,x=`<thead><tr><th></th>${n.map(([c,v])=>`<th${c==="day"?' class="bz-hdr-day"':""}>${v}</th>`).join("")}</tr></thead>`,f={寅:"木",卯:"木",巳:"火",午:"火",申:"金",酉:"金",亥:"水",子:"水",辰:"土",戌:"土",丑:"土",未:"土"},S={木:"火",火:"土",土:"金",金:"水",水:"木"},w={木:"土",土:"水",水:"火",火:"金",金:"木"},z=f[e.pillars.month.branch]||"土",N=["木","火","土","金","水"],M=c=>c===z?"旺":S[z]===c?"相":S[c]===z?"休":w[c]===z?"囚":"死",D=`<tr><td class="bz-lbl">五行</td><td class="bz-wxs" colspan="4">${["旺","相","休","囚","死"].map(c=>{const v=N.find(G=>M(G)===c)||z;return`<i><b class="wx-${g[v]}">${v}</b><em>${c}</em></i>`}).join("")}</td></tr>`,P=[b("十神",(c,v)=>v==="day"?`<span class="bz-zhuri">${e.input.gender==="male"?"元男":"元女"}</span>`:c.stemTenGod?u(c.stemTenGod):'<span class="pp-dim">—</span>'),b("天干",c=>`<span class="bz-big ${"wx-"+g[c.stemElement]}">${c.stem}</span>`),b("地支",c=>`<span class="bz-big ${"wx-"+g[c.branchElement]}">${c.branch}</span>`),b("藏干",c=>c.hidden.map(v=>`<i class="bz-cg wx-${g[v.element]}">${v.stem}·${v.element}</i>`).join("")),b("支神",c=>c.hidden.map(v=>u(v.tenGod)).join("<br>")),b("纳音",c=>c.nayin),b("空亡",c=>`<span class="pp-dim">${c.kongwang.join("")}</span>`),b("地势",c=>c.dishi),b("自坐",c=>c.zizuo),b("神煞",c=>c.shenshaDetail&&c.shenshaDetail.length?`<span class="pp-ss">${c.shenshaDetail.map(r).join("")}</span>`:'<span class="pp-dim">—</span>'),D].join(""),d=Object.entries(e.wuxing).map(([c,v])=>`<span class="pp-chip wx-${g[c]}">${oe(c)}${c} ${v}</span>`).join(""),y=e.frame||{},A=c=>c==="大吉"||c==="吉"?"ok":c==="大忌"||c==="忌"?"warn":"",I=(c,v)=>v?`<div class="pp-sec"><div class="pp-sec-h">${c}</div>${v}</div>`:"",L=y.geju&&y.geju.length?`
      <div class="pp-tl">${y.primary?`主格 <b>${t(y.primary.name)}</b>　${t(y.primary.evidence)}`:""}</div>
      <div class="pp-chips">${y.geju.map(c=>{const v=c.status==="破格",G=c.status==="待定"||c.status==="假从",U=`${c.evidence||""}${Array.isArray(c.breaks)&&c.breaks.length?`；破：${c.breaks.join("；")}`:""}`;return`<span class="pp-chip ${v?"broken":G?"warn":""}" title="${t(U)}">${t(c.name)}<i class="pp-drel">${t(c.kind)}${c.status?`·${t(c.status)}`:""}</i></span>`}).join("")}</div>`:"",C=y.yongshen?`
      <div class="pp-tl">喜 ${y.yongshen.favor.map(m).join("")}　忌 ${y.yongshen.avoid.map(m).join("")}　<span class="pp-dim">${t(y.yongshen.method)}</span></div>
      <div class="pp-chips">${y.yongshen.favorTenGods.map(c=>`<span class="pp-chip ok">${t(c)}</span>`).join("")}${y.yongshen.avoidTenGods?y.yongshen.avoidTenGods.map(c=>`<span class="pp-chip warn">${t(c)}</span>`).join(""):""}</div>
      ${(y.yongshen.disputed||[]).length?`<div class="pp-tl pp-dim">有争议：${y.yongshen.disputed.map(c=>`${t(c.element)}（扶抑为${t(c.favorRole)}·${t(c.favorVerb)}，${t(c.climate)}盘调候忌${t(c.element)}）`).join("、")}　保留在喜用，不列入忌</div>`:""}
      <div class="pp-tl pp-dim">${t(y.yongshen.detail)}</div>`:"",_=e.climate||y.yongshen&&y.yongshen.climate||null,ae=_?(()=>{const c=Math.max(2,Math.min(98,Math.round(((Number(_.temp)||0)+3)/6*100))),v=_.need?`<em>调候取</em><b>${t(_.need.stem+_.need.element)}</b>`:"<em>气候平和</em>",G=!!(y.yongshen&&Array.isArray(y.yongshen.disputed))&&y.yongshen.disputed.some(h=>h.element===_.avoidElement),U=_.need?`<em>忌</em><b>${t(_.avoidElement)}</b>${G?'<span class="pp-dim">（有争议）</span>':""}`:"",pe=(_.evidence||[]).length?`<em>依据</em><span>${t(_.evidence.join("、"))}</span>`:"",je=_.priority==="调候优先"?'<span class="mp-cli-p">调候优先</span>':'<span class="mp-cli-p">扶抑为主</span>',j=e.frame&&e.frame.yongshen&&e.frame.yongshen.qt,be=j?`<div class="mp-qt">
          <div class="mp-qt-h"><b>穷通宝鉴</b><span>${t(j.label)}</span></div>
          <div class="mp-qt-y"><em>用神</em>${j.yong.map((h,ce)=>`<b class="${ce===0?"first":""}">${t(h)}</b>`).join("")}<em>首取 ${t(j.primary)}</em></div>
          <div class="mp-qt-q" title="${t(j.quote)}">「${t(j.quote)}」<span>第 ${j.chapter} 章${j.note?" · "+t(j.note):""}</span></div>
        </div>`:"";return`<section class="mp-cli" aria-label="寒暖燥湿">
        <div class="mp-cli-h"><b>寒暖燥湿</b><span class="mp-cli-k">${t(_.label||"")}</span>${je}</div>
        <div class="mp-cli-bar" title="寒 ← → 热"><i style="left:${c}%"></i></div>
        <div class="mp-cli-axis"><span>寒</span><span>平</span><span>热</span></div>
        <div class="mp-cli-row">${v}${U}${pe}</div>
        <div class="mp-cli-narr">${t(_.narration||"")}</div>
        ${be}
      </section>`})():"",X=y.godStats?`<div class="pp-chips">${Object.entries(y.godStats.groups).map(([c,v])=>`<span class="pp-chip">${c} ${v}</span>`).join("")}</div>`:"",ee=e.dayun.list.map(c=>{const v=c.luck||null;return`<span class="pp-chip ${v?A(v.tier):""}" title="${t(`${c.fromDate?`${c.fromDate} 交运；`:""}${v?`${v.tier} ${v.score}｜${(v.reasons||[]).join("；")}`:""}`)}">${c.startAge} ${c.ganzhi}${c.relations&&c.relations.length?` <i class="pp-drel">${c.relations.join("")}</i>`:""}${v?` ${v.tier}`:""}</span>`}).join(""),ie=e.liunian&&e.liunian.length?`<div class="pp-chips">${e.liunian.slice(0,8).map(c=>{const v=c.luck||null,G=c.suiyun&&Array.isArray(c.suiyun.signals)?c.suiyun.signals:[],U=G.length?`｜${G.map(pe=>pe.detail).join("；")}`:"";return`<span class="pp-chip ${v?A(v.tier):""}" title="${t(v?`${v.tier} ${v.score}｜${(v.reasons||[]).join("；")}${U}`:U.replace(/^｜/,""))}">${c.year} ${c.ganzhi}${v?` ${v.tier}`:""}</span>`}).join("")}</div>`:"",ze=(e.liunian||[]).filter(c=>c.suiyun&&Array.isArray(c.suiyun.signals)&&c.suiyun.signals.length),fe=e.suiyunClassic,Be=fe?`<div class="pp-dim pp-sy-src" title="${t(fe.plain||"")}">《${t(fe.bookName||"")}·${t(fe.chapter||"")}》「${t(fe.quote||"")}」</div>`:"",ge=ze.length?`<div class="pp-tl pp-dim">岁运提示（只标干支变动，不判吉凶）</div><div class="pp-chips">${ze.map(c=>`<span class="pp-chip" title="${t(`${c.suiyun.signals.map(v=>v.detail).join("；")}｜${c.suiyun.note||""}`)}">${c.year} ${t(c.suiyun.signals.map(v=>`${v.type}${(v.type.startsWith("流年")||v.type.startsWith("大运"))&&v.target?`·${v.target}`:""}`).join("/"))}</span>`).join("")}</div>${Be}`:"",Me=e.strength?`<div class="pp-str">日主强弱：<b>${e.strength.level}</b>${e.strength.score}　<span class="pp-dim">${e.strength.detail}</span></div>`:"",Se=e.shensha&&e.shensha.groups||[],H=Se.length?`
      <div class="pp-ssx">
        <div class="ssx-h"><b>神煞全览</b><span>共 ${e.shensha.count} 见 · ${Se.length} 类 · 悬停看查法</span></div>
        ${Se.map(c=>`<div class="pp-ssg"><span class="ssg-gt">${c.cat}</span><span class="ssg-gi">${c.items.map(v=>`<span class="pp-ssi ${v.luck||"neutral"}" title="${t(`${v.via}查${v.target} ｜ ${v.rule}`)}">${v.name}<em>${v.pillars.map(G=>p[G]||"").join("")}</em></span>`).join("")}</span></div>`).join("")}
        <div class="ssx-h" style="border-top:none;padding-top:4px;margin-top:4px">神煞只作参考，吉凶仍须看格局、旺衰与行运。</div>
      </div>`:"";return`<div class="pp" style="padding:12px">
      <table class="pp-bz">${x}<tbody>${P}</tbody></table>
      <div class="pp-rel"><div><b>天干</b>${e.relations&&e.relations.stems.length?e.relations.stems.join(" · "):"—"}</div>
      <div><b>地支</b>${e.relations&&e.relations.branches.length?e.relations.branches.join(" · "):"—"}</div></div>
      ${Me}
      ${I("格局",L)}
      ${I("用神",C)}
      ${ae}
      ${Array.isArray(e.classics)&&e.classics.length?`<section class="mp-cl" aria-label="古籍原文">
        <div class="mp-cl-h"><b>古籍原文</b><span>照录通行本，释义为白话自撰</span></div>
        ${e.classics.map(c=>`<div class="mp-cl-e">
          <div class="mp-cl-t"><b>${t(({ziping:"子平真诠",ditian:"滴天髓",sanming:"三命通会"}[c.book]||c.book)+"·"+c.chapter)}</b></div>
          <div class="mp-cl-q">「${t(c.quote)}」</div>
          <div class="mp-cl-p">${t(c.plain)}</div>
        </div>`).join("")}
      </section>`:""}
      ${I("五行与十神",`<div class="pp-chips">${d}</div>${X}`)}
      ${I("大运",`${l.curveHTML(e)}<div class="pp-chips">${ee}</div>`)}
      ${ie?I("流年",ie+ge):""}
      ${e.palaces?I("胎命身",`<div class="pp-chips">
        <span class="pp-chip" title="${t(e.palaces.taiyuan.note)}">胎元 ${t(e.palaces.taiyuan.ganzhi)}</span>
        ${e.palaces.taixi?`<span class="pp-chip" title="${t(e.palaces.taixi.note)}">胎息 ${t(e.palaces.taixi.ganzhi)}</span>`:""}
        <span class="pp-chip" title="${t(e.palaces.minggong.note)}">命宫 ${t(e.palaces.minggong.ganzhi)}</span>
        <span class="pp-chip" title="${t(e.palaces.shengong.note)}">身宫 ${t(e.palaces.shengong.ganzhi)}</span>
      </div>`):""}
      ${H}
      <div style="margin-top:8px;font-size:12px;color:var(--muted)">上一节 ${e.jieqi.previous.name} ${e.jieqi.previous.time}　下一节 ${e.jieqi.next.name} ${e.jieqi.next.time}　${e.dayun.rule}，${e.dayun.startAge.years}岁起运${e.dayun.jiao&&e.dayun.jiao.at?`（交运 ${e.dayun.jiao.at}，${e.dayun.jiao.frame}）`:""}</div>
    </div>`};const ha={natal:"命盘解析",divination:"卦象解析",card:"牌阵解析"},De={同向:"good",有张力:"watch",互补:"alt"},va=e=>`<div class="mp-cross">${e.map(n=>{const p=De[n.stance]||"plain";return`<div class="mp-cross-row">
      <div class="mp-cross-h"><span class="mp-cross-l">${t(n.label)}</span><span class="mp-cross-tag t-${p}">${t(n.stance||"—")}</span></div>
      <div class="mp-cross-b">
        <div class="mp-cross-cell"><b>八字</b><span>${t(n.bazi||"—")}</span></div>
        <div class="mp-cross-cell"><b>紫微</b><span>${t(n.ziwei||"—")}</span></div>
      </div>
      ${n.note?`<div class="mp-cross-note">${t(n.note)}</div>`:""}
    </div>`}).join("")}</div>`;l.interpretHTML=function(e,n){if(!e||!(e.dimensions&&e.dimensions.length||e.sections&&e.sections.length)&&!e.error&&!e.answer)return"";const g=!!(n&&n.folded),i=(e.dimensions||[]).map((d,y)=>`<div class="mp-it-dim${d.focused?" focus":""}">
      <div class="mp-it-dh"><span class="mp-it-dno">${y+1}</span><span class="mp-it-dlabel">${t(d.label)}</span>${d.focused?'<span class="mp-it-focus">最贴近你的问题</span>':""}${d.confidence?`<span class="mp-it-conf c-${t(d.confidence)}">置信度 ${t(d.confidence)}</span>`:""}</div>
      ${d.plain?`<div class="mp-it-dplain">${t(d.plain)}</div>`:""}
      <div class="mp-it-dtext">${t(d.text)}</div>
      ${d.evidence&&d.evidence.length?`<details class="mp-it-ev"><summary>依据 · ${t(d.evidence.length)} 条盘面事实</summary><div class="mp-it-ev-body">${d.evidence.map(A=>`<span class="mp-it-ev-item">${t(A)}</span>`).join("")}<span class="mp-it-ev-tech">技法：${t(e.technique||e.systemLabel||"")}</span></div></details>`:""}
      ${d.knowledge&&d.knowledge.length?`<div class="mp-it-know">${d.knowledge.map(A=>`<div class="know-row"><span class="know-status ${A.status}">${t(A.statusLabel)}</span><span class="know-body"><b>${t(A.gist)}</b>${t(A.detail)}${A.source?`<i>出处：${t(A.source)}</i>`:""}${A.note?`<em>注：${t(A.note)}</em>`:""}</span></div>`).join("")}</div>`:""}
      ${d.advice?`<div class="mp-it-adv"><b>建议</b>${t(d.advice)}</div>`:""}
    </div>`).join(""),u=e.outline&&e.outline.length?`<div class="mp-outline"><div class="mp-outline-h">一页读懂</div>${e.outline.map(d=>`<div class="mp-outline-row"><b>${t(d.label)}</b><span>${t(d.text)}</span></div>`).join("")}</div>`:"",m=e.sections&&e.sections.length?`<nav class="mp-toc" aria-label="报告目录">${e.sections.map(d=>`<a href="#mp-sec-${t(d.key)}">${t(d.label)}</a>`).join("")}</nav>`:"",r=e.tables&&e.tables.length?`<div class="mp-tables">${e.tables.filter(d=>Array.isArray(d.rows)&&d.rows.length).map(d=>`<div class="mp-table-wrap">
          <div class="mp-table-h">${t(d.title)}</div>
          <div class="mp-table-scroll"><table class="mp-table">
            <thead><tr>${d.columns.map(y=>`<th scope="col">${t(y)}</th>`).join("")}</tr></thead>
            <tbody>${d.rows.map(y=>`<tr>${y.map((A,I)=>`<td data-label="${t(d.columns[I]||"")}">${t(A)}</td>`).join("")}</tr>`).join("")}</tbody>
          </table></div>
        </div>`).join("")}</div>`:"",b=d=>String(d||"").split(`
`).map(y=>`<div class="mp-it-p">${t(y).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>")}</div>`).join(""),x=e.sections&&e.sections.length?`<div class="mp-it-secs">${e.sections.map(d=>`<div class="mp-it-sec${d.tone?` tone-${t(d.tone)}`:""}" id="mp-sec-${t(d.key)}">
        <div class="mp-it-sh">${t(d.label)}</div>
        <div class="mp-it-stext">${Array.isArray(d.items)&&d.items.length?va(d.items):b(d.text)}</div>
      </div>`).join("")}</div>`:"",f=[e.systemLabel,ha[e.moduleType]||e.moduleType].filter(Boolean),S=e.ask,w=S&&S.question?t(S.question):"",z=S&&(w||S.direction&&S.direction!=="general")?`<div class="mp-it-ask">${w?`<span class="ask-q">问题：${w}</span><span class="ask-sep">｜</span>`:""}<span class="ask-d">询问方向：${t(S.directionLabel||"综合")}</span></div>`:"",N=e.answer?`<div class="mp-it-ans"><b>${w?"先答所问":"先看结论"}</b>${t(e.answer)}</div>`:"",M=e.plain?`<div class="mp-it-plain"><b>说人话</b>${t(e.plain)}</div>`:"",D=e.followups&&e.followups.length?`<div class="mp-it-fu"><b>还可以这样追问</b><ul>${e.followups.map(d=>`<li>${t(d)}</li>`).join("")}</ul></div>`:"",P=e.glossary&&e.glossary.length?`<details class="mp-it-gloss"><summary>名词解释（${e.glossary.length} 条）</summary>${e.glossary.map(d=>`<div><span>${t(d.term)}</span>${t(d.plain)}</div>`).join("")}</details>`:"";return`<div class="mp-it${g?" folded":""}">
      <button type="button" class="mp-it-head" aria-expanded="${g?"false":"true"}">
        <span class="mp-it-arrow" aria-hidden="true">▾</span>
        <span class="mp-it-title">解析与详解</span>${f.map(d=>`<span class="mp-it-tag">${t(d)}</span>`).join("")}
        <span class="mp-it-hint">${g?"点击展开":"点击收起"}</span>
      </button>
      <div class="mp-it-wrap">
        ${z}
        ${N}
        ${M}
        ${e.lead?`<div class="mp-it-lead">${t(e.lead)}</div>`:""}
        ${e.error?`<div class="mp-it-err"><b>⚠ 解析生成失败</b>${t(e.error)}——上方盘面数据本身可用</div>`:""}
        ${u}
        ${m}
        <div class="mp-it-body">${i}</div>
        ${x}
        ${r}
        ${D}
        ${P}
        <div class="mp-it-dis">${t(e.disclaimer)}</div>
      </div>
    </div>`},l.followupHTML=function(e){if(!e)return"";const n=e.evidence&&e.evidence.length?`<div class="mp-fu-ev">依据：${e.evidence.map(p=>t(p)).join("；")}　置信度：${t(e.confidence||"弱")}</div>`:"";return`<div class="mp-fu${e.ok?"":" miss"}">
      <div class="mp-fu-h">追问 · ${t(e.question)}</div>
      <div class="mp-fu-a">${t(e.answer)}</div>
      ${n}
    </div>`},l.resultWithInterpret=function(e,n,p){return(e||"")+l.interpretHTML(n,p)},l.caliberHTML=function(e){const n=e&&Array.isArray(e.switches)?e.switches.filter(r=>r&&r.key):[];if(!n.length)return"";const p=n.filter(r=>!r.error&&r.total>0),g=p.length?`${n.length} 组开关中 ${p.length} 组影响此盘：${p.map(r=>r.short||r.title).join("、")}。`:`本盘对 ${n.length} 组开关都不敏感：换成另一档也不变。`,i=r=>{if(r.error)return`<div class="mp-cdiff-same">未能对照：${t(r.error)}</div>`;if(!r.total)return'<div class="mp-cdiff-same">无变化 · 此盘不受这一开关影响</div>';const b=Array.isArray(r.roots)?r.roots:[];return b.length?`<div class="mp-cdiff-roots">${b.map(x=>`<div class="mp-cdiff-root"><span class="mp-cdiff-k">${t(x.label)}</span><span class="mp-cdiff-from">${t(x.from)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-to">${t(x.to)}</span></div>`).join("")}</div>`:`<div class="mp-cdiff-same">无单一根因；逐字段差异 ${Number(r.total)||0} 处</div>`},u=r=>{const b=Array.isArray(r.categories)?r.categories:[];if(r.error||!r.total||!b.length)return"";const x=b.slice(0,6);return`<div class="mp-cdiff-cats">${x.map(f=>`<span class="mp-cdiff-cat">${t(f.name)} ${Number(f.count)||0} 处</span>`).join("")}`+(b.length>x.length?`<span class="mp-cdiff-cat">另 ${b.length-x.length} 类</span>`:"")+"</div>"},m=n.map(r=>`<div class="mp-cdiff-row"><div class="mp-cdiff-h"><b>${t(r.title)}</b><span class="mp-cdiff-count${r.total>0?" on":""}">${r.error?"未能对照":r.total?`${Number(r.total)||0} 处`:"无变化"}</span></div><div class="mp-cdiff-ab"><span class="mp-cdiff-pill now">当前 · ${t(r.currentLabel)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-pill alt">换成 · ${t(r.altLabel)}</span></div>${i(r)}${u(r)}</div>`).join("");return`<details class="mp-cdiff" aria-label="口径对照">
      <summary><span class="mp-cdiff-title">口径对照</span><span class="mp-cdiff-lead">${t(g)}</span><span class="mp-cdiff-more">展开逐字差异</span></summary>
      <div class="mp-cdiff-body">${m}
        <div class="mp-cdiff-note">同一组输入、只换一个开关；只列变化字段与根因，不判哪套口径更准，也不改上方盘面。</div>
      </div>
    </details>`},l.shadowHTML=function(e,n){if(!e||!e.id)return"";const p=[];e.version&&p.push(`版本 <b>${t(e.version)}</b>`),e.baseId&&p.push(`基础指纹 <b>${t(e.baseId)}</b>`),p.push("同参数同 ID");const g=[];e.reproducible===!1&&g.push(`不可复算：${t(e.reason||"参数不足")}`);const i=e.reproducible===!0&&e.asOfPinned===!1&&(e.system==="bazi"||e.system==="ziwei")?'<div class="mp-shadow-hint">未固定 asOf：流年 / 流月随「此刻」变化；要逐字比对请在输入里固定 asOf。</div>':"",u=n&&n.sameId!==!1&&(n.versionChanged||Number(n.total)>0);let m="";if(u){const r=Number(n.total)||0,b=t(n.fromVersion||"—"),x=t(n.toVersion||e.version||"—"),f=Array.isArray(n.roots)?n.roots:[],S=f.slice(0,8),w=S.length?`<div class="mp-cdiff-roots">${S.map(M=>`<div class="mp-cdiff-root"><span class="mp-cdiff-k">${t(M.label)}</span><span class="mp-cdiff-from">${t(M.from)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-to">${t(M.to)}</span></div>`).join("")}`+(f.length>S.length?`<div class="same">另 ${f.length-S.length} 处根因</div>`:"")+"</div>":`<div class="same">${r?"无单一根因；逐字段变化 "+r+" 处":"字段 0 处变化：同一张盘跨版本逐字一致"}</div>`,z=Array.isArray(n.categories)?n.categories:[],N=z.length?`<div class="mp-cdiff-cats">${z.slice(0,6).map(M=>`<span class="mp-cdiff-cat">${t(M.name)} ${Number(M.count)||0} 处</span>`).join("")}`+(z.length>6?`<span class="mp-cdiff-cat">另 ${z.length-6} 类</span>`:"")+"</div>":"";m=`<details class="mp-shadow-diff"${r>0?" open":""}>
        <summary><b>与上次同盘比对</b><span class="tag">${b} → ${x} · ${r?`${r} 处变化`:"0 处变化"}</span></summary>
        ${w}${N}
        <div class="note">同一 baseId（同一组归一化参数）的两次结果；只比盘面字段，不含摘要、解析与古籍等文本层。</div>
      </details>`}return`<section class="mp-shadow" aria-label="影子盘">
      <div class="mp-shadow-head"><span class="mp-shadow-title">影子盘</span><code class="mp-shadow-id">${t(e.id)}</code>
        <button type="button" class="mp-shadow-copy" data-shadow-copy="${t(e.id)}" aria-label="复制影子盘 ID">复制 ID</button></div>
      <div class="mp-shadow-meta">${p.join('<span aria-hidden="true">·</span>')}</div>
      ${g.map(r=>`<div class="mp-shadow-warn">⚠ ${r}</div>`).join("")}
      ${i}
      ${m}
    </section>`},l.shadowTrack=function(e){const n=window.Engine||window.__PP&&window.__PP.Engine;if(!n||!n.shadowSnapshot||!n.shadowDiff)return null;let p=null;try{p=n.shadowSnapshot(e)}catch{return null}if(!p||!p.shadow||!p.shadow.baseId)return null;const g="mp-shadow-v1";let i={};try{const r=window.localStorage?window.localStorage.getItem(g):null,b=r?JSON.parse(r):{};b&&typeof b=="object"&&!Array.isArray(b)&&(i=b)}catch{i={}}const u=i[p.shadow.baseId];let m=null;if(u)try{m=n.shadowDiff(u,p)}catch{m=null}p.at=Date.now(),i[p.shadow.baseId]=p;try{const r=Object.keys(i);if(r.length>24){r.sort((b,x)=>(Number(i[b]&&i[b].at)||0)-(Number(i[x]&&i[x].at)||0));for(const b of r.slice(0,r.length-24))delete i[b]}window.localStorage&&window.localStorage.setItem(g,JSON.stringify(i))}catch{}return m},l.traceHTML=function(e,n){if(!Array.isArray(e)||!e.length)return"";const p={liuyao:"六爻",bazi:"八字",ziwei:"紫微"}[n]||"命盘",g=e.map(m=>m&&m.field).filter(Boolean).join(" → "),i=(m,r)=>{const b=String(m??"");return b.length>r?`${b.slice(0,r)}…`:b},u=e.map((m,r)=>{const b=Array.isArray(m.inputs)?m.inputs:[];return`<details class="mp-trace-step"${r===0?" open":""}>
        <summary><span class="mp-trace-no">${r+1}</span><span class="mp-trace-field">${t(m.field)}</span><span class="mp-trace-res">${t(i(m.result,44))}</span></summary>
        <div class="mp-trace-detail">
          <div class="mp-trace-rule"><b>规则</b>${t(m.rule)}</div>
          ${b.length?`<dl class="mp-trace-inputs">${b.map(x=>`<dt>${t(x.label)}</dt><dd>${t(x.value)}</dd>`).join("")}</dl>`:""}
          <div class="mp-trace-result"><b>结果</b>${t(m.result)}</div>
          ${m.source?`<div class="mp-trace-src"><b>出处</b>${t(m.source)}</div>`:""}
        </div>
      </details>`}).join("");return`<button type="button" class="mp-trace-card" data-trace-open aria-haspopup="dialog" aria-controls="mp-trace-layer">
        <span class="mp-trace-title">推导链</span><span class="mp-trace-flow">${t(g)}</span><span class="mp-trace-count">${e.length} 层 · 查看</span>
      </button>
      <div class="mp-trace-layer" id="mp-trace-layer" data-trace-layer aria-hidden="true">
        <div class="mp-trace-back" data-trace-close></div>
        <aside class="mp-trace-drawer" role="dialog" aria-modal="true" aria-labelledby="mp-trace-title">
          <div class="mp-trace-head">
            <div><b id="mp-trace-title">推导链 · ${t(p)}</b><span>${e.length} 层 · 每层给出规则、输入、结果与出处；只读，不重算</span></div>
            <button type="button" class="mp-trace-close" data-trace-close aria-label="关闭推导链">✕</button>
          </div>
          <div class="mp-trace-body">${u}</div>
        </aside>
      </div>`},l.almanacHTML=function(e){if(!e||!e.meta)return l.quickHTML(e);const n=e.ganzhi||{},p=e.dayGod||null,g=(z,N)=>(z||[]).map(M=>`<span class="mp-al-chip${N?` ${N}`:""}">${t(M)}</span>`).join(""),i=(z,N)=>N?`<div class="mp-al-cell"><em>${t(z)}</em><b>${t(N)}</b></div>`:"",u=e.xiu?`${e.xiu.name}宿（${e.xiu.luck}·${e.xiu.zheng}·${e.xiu.animal}）`:"",m=e.nayin&&e.nayin.day?e.nayin.day.name:"",r=e.chong?`${e.chong.text}${e.chong.sha?` ${e.chong.sha}`:""}`:"",b=(e.hours||[]).map(z=>`<span class="mp-al-hour ${z.luck==="吉"?"good":"bad"}"><i>${t(z.zhi)}</i><em>${t((z.ganZhi||"").slice(0,1))}</em><b>${t(z.shen||"")}</b><u>${t(z.luck||"")}</u></span>`).join(""),x=e.positions||{},f=(z,N)=>N?`<span class="mp-al-chip">${t(z)}·${t(typeof N=="string"?N:N.dir||"")}</span>`:"",S=e.lucky||{},w=p?`<span class="mp-al-badge ${p.luck==="吉"?"good":"bad"}">${t(p.name)}·${t(p.type)}·${t(p.luck)}</span>`:"";return`<section class="mp-al" aria-label="黄历">
      <div class="mp-al-h"><b>${t(e.meta.date||"")}</b><i>${t(e.meta.weekday||"")}　${t((e.lunar||{}).text||"")}</i></div>
      <div class="mp-al-gz">${t(n.year||"")}年　${t(n.month||"")}月　${t(n.day||"")}日　属${t(n.shengXiao||"")}　建除 ${t(e.zhiXing||"")}日　${w}</div>
      <div class="mp-al-yiji">
        <div class="mp-al-col"><em>宜</em><div class="mp-al-chips">${g(e.yi)}</div></div>
        <div class="mp-al-col"><em>忌</em><div class="mp-al-chips">${g(e.ji)}</div></div>
      </div>
      <div class="mp-al-grid">${i("二十八宿",u)}${i("日柱纳音",m)}${i("胎神",e.taiShen)}${i("冲煞",r)}</div>
      <div class="mp-al-row"><em>吉神方位</em><div class="mp-al-chips">${f("喜神",x.xiShen)}${f("财神",x.caiShen)}${f("福神",x.fuShen)}${f("阳贵",x.yangGui)}${f("阴贵",x.yinGui)}</div></div>
      <div class="mp-al-row"><em>时刻吉凶</em><div class="mp-al-hours">${b}</div></div>
      <div class="mp-al-row"><em>吉配生肖</em><div class="mp-al-chips">${S.liuhe?`<span class="mp-al-chip">六合·${t(S.liuhe)}</span>`:""}${g(S.sanhe||[])}</div></div>
      ${e.dailyHexagram?`<div class="mp-al-hex">每日一卦：<b>${t(e.dailyHexagram.name)}</b>　${t(e.dailyHexagram.meaning||"")}</div>`:""}
      <div class="mp-al-note">${t(e.meta&&e.meta.scope||"")}</div>
    </section>`},l.mbtiHTML=function(e){if(!e)return"";if(e.needAnswers&&Array.isArray(e.questions)){const i=e.questions.map(u=>`<li>${t(u.text)}</li>`).join("");return`<section class="mp-mb-paper" aria-label="十六型人格问卷">
        <div class="mp-mb-h">
          <span class="mp-mb-meta"><b>十六型人格问卷</b><i>${e.total} 题 · 每题 1 完全不像 / 5 很像我</i></span>
          <span class="mp-mb-count">填完分数再看结果</span>
        </div>
        <ol>${i}</ol>
        <div class="mp-mb-note">${t(e.note||"")}</div>
      </section>`}const n=(e.dims||[]).map(i=>{const u=Math.round((i.pct||0)*100),m=i.picked===i.left,r=Math.max(2,u),b=m?i.leftSay:i.rightSay;return`<div class="mp-mb-dim">
        <div class="mp-mb-dh"><b class="${m?"on":""}">${t(i.left)}</b><em>${t(i.name)}</em><b class="${m?"":"on"}">${t(i.right)}</b></div>
        <div class="mp-mb-bar ${m?"l":"r"}"><em style="width:${r}%"></em></div>
        <div class="mp-mb-df">取 ${t(i.picked)} · ${t(i.strength)} ${u}%</div>
        <div class="mp-mb-ds">${t(b)}</div>
      </div>`}).join(""),p=e.profile||{},g=(p.stack||[]).map((i,u)=>`<span class="${u===0?"lead":""}"><b>${t(i.code)}</b>${t(i.say)}</span>`).join("");return`<section class="mp-mb" aria-label="十六型人格结果">
      <div class="mp-mb-h">
        <span class="mp-mb-code">${t(e.type||"")}</span>
        <span class="mp-mb-meta"><b>${t(p.title||"")}</b><i>${t(p.keywords||"")}</i></span>
        <span class="mp-mb-count">已答 ${e.answered||0}/${e.total||0} 题</span>
      </div>
      <div class="mp-mb-body">
        <div class="mp-mb-dims">${n}</div>
        <div class="mp-mb-sec"><em>一句</em>${t(p.oneLine||"")}</div>
        <div class="mp-mb-two">
          <div><b>优势</b>${(p.strengths||[]).map(i=>t(i)).join("；")}</div>
          <div><b>留意</b>${(p.blindspots||[]).map(i=>t(i)).join("；")}</div>
        </div>
        ${g?`<div class="mp-mb-sec"><em>认知功能</em>主导 ${t((p.stack[0]||{}).code||"")} → 依次展开</div><div class="mp-mb-fn">${g}</div>`:""}
        <div class="mp-mb-sec"><em>工作</em>${t(p.work||"")}</div>
        <div class="mp-mb-sec"><em>关系</em>${t(p.love||"")}</div>
        <div class="mp-mb-sec"><em>学习</em>${t(p.study||"")}</div>
        <div class="mp-mb-sec"><em>课题</em>${t(p.growth||"")}</div>
      </div>
      <div class="mp-mb-note">${t(e.note||"")}</div>
    </section>`};const Ve=[["巽","离","坤"],["震","中","兑"],["艮","坎","乾"]],na={坎:"正北",艮:"东北",震:"正东",巽:"东南",离:"正南",坤:"西南",兑:"正西",乾:"西北",中:"中宫"},ya=["生气","延年","天医","伏位"],de=(e,n)=>`<span class="mp-fs-chip${n?" "+n:""}">${t(e)}</span>`,Ge=(e,n,p)=>`<div class="mp-fs-cell${e==="中"?" center":""}"><div class="mp-fs-top"><span class="mp-fs-gua">${t(e)}</span><span class="mp-fs-dir">${t(na[e]||"")}</span>${n||""}</div>`+(p||"")+"</div>",Ae=e=>e.length?`<dl class="mp-fs-facts">${e.map(([n,p])=>`<div class="mp-fs-row"><dt>${t(n)}</dt><dd>${t(p)}</dd></div>`).join("")}</dl>`:"",We=(e,n,p,g,i,u)=>`<section class="mp-quick mp-fs" aria-label="风水结果"><div class="mp-quick-h"><b>${t(e)}</b>${n?`<span class="mp-fs-sub">${t(n)}</span>`:""}</div>`+(p.length?`<div class="mp-fs-chips">${p.join("")}</div>`:"")+g+i+u.filter(Boolean).map(m=>`<div class="mp-fs-note">${t(m)}</div>`).join("")+"</section>",Ne=(e,n)=>`<div class="mp-fs-grid" role="group" aria-label="${t(n)}">`+Ve.map(p=>p.map(g=>{const i=e.find(r=>r&&r.palace===g);if(!i)return Ge(g,"","");const u=ya.includes(i.star),m=`<span class="mp-fs-star"${i.role?` title="${t(i.role)}"`:""}>${t(i.star)}<em class="${u?"ok":"bad"}">${u?"吉":"凶"}</em></span>`;return Ge(g,m,"")}).join("")).join("")+"</div>";function sa(e,n){const p=n.period,g={};for(const w of e.palaces||[])g[w.palace]=w;const i=`<div class="mp-fs-key">每宫依次为 <b>运</b>／<b>山</b>／<b>向</b> 三星；底色高亮＝当运（${t(p)}运）</div><div class="mp-fs-grid" role="group" aria-label="玄空九宫（运/山/向）">`+Ve.map(w=>w.map(z=>{const N=g[z];if(!N)return Ge(z,"","");const M=[["运",N.yun],["山",N.shan],["向",N.xiang]].map(([D,P])=>`<span class="${P===p?"on":""}" title="${t(D)}星 ${t(P)}">${t(P)}</span>`).join("");return Ge(z,"",`<div class="mp-fs-nums">${M}</div>`)}).join("")).join("")+"</div>",u=e.wangShanWangXiang||{},m=n.jianXiang||{},r=e.timeFlying||null,b=[de(m.active?`兼${m.jian} ${m.offset}° · 替卦`:"正向 · 下卦",m.active?"ok":""),de(`山盘 ${n.shanCenter.star}${n.shanCenter.name} · ${n.shanCenter.fly}`),de(`向盘 ${n.xiangCenter.star}${n.xiangCenter.name} · ${n.xiangCenter.fly}`),de(u.byChart?"盘面：到山到向":"盘面：未到山到向",u.byChart?"ok":""),de(u.byTable===null?"表法：替卦不套":u.byTable?"表法：在列":"表法：未列",u.byTable?"ok":"")],x=(w,z)=>`${z} ${w.star}${w.name}（${w.fly}，${w.basis}${w.mode==="替卦"?`；原运星 ${w.original}${w.replaced?"，已替":"，用替而未替"}`:""}）`,f=r?[["year","年"],["month","月"],["day","日"],["hour","时"]].filter(([w])=>r[w]).map(([w,z])=>`${z}${r[w].centerName}（${r[w].fly}）`).join("　"):"",S=Ae([...m.active?[["替卦",`${m.note}${u.byTable===null?" 正向旺山旺向表不适用于替卦。":""}`]]:[],["入中",`${x(n.shanCenter,"山盘")}；${x(n.xiangCenter,"向盘")}`],["当运",`山星${p}落 ${e.dangYun.shan.text}；向星${p}落 ${e.dangYun.xiang.text}`],["合十",`山星：${(e.heshi.shan||[]).join("、")||"无"}；向星：${(e.heshi.xiang||[]).join("、")||"无"}`],["表法",`${u.note||""}${(u.table||[]).length?` 本运所列：${u.table.join("、")}。`:" 本运表法无局。"}`],...f?[["年月日时",`${f}${r.meta&&r.meta.note?`　${r.meta.note}`:""}`]]:[]]);return We(m.active?"玄空替卦":"玄空下卦",`${n.periodLabel} · 坐${n.sitting} · 向${n.facing}`,b,i,S,[n.note,e.disclaimer])}function $a(e,n){const p=e.mingGua||{},g=Ne([...e.luckyDirections||[],...e.unluckyDirections||[]],"八宅八向（吉凶）"),i=[de(p.compatible||"—"),de(`${n.gender}命 · ${n.guaYear} 年立春界`)],u=[];if(e.yearlyFlying){const m=e.yearlyFlying;u.push(["年紫白",`${m.centerName}入中；${m.palaces.filter(r=>r.palace!=="中").map(r=>`${r.palace}${r.name}`).join("、")}`])}return We("八宅命卦",`${p.num}${p.gua}（${p.group}）· ${p.direction}`,i,g,Ae(u),[n.note,e.disclaimer])}function Fa(e,n){const p=e.layout||{},g=Ne(e.houseStars||[],"宅卦八向（吉凶）"),i=[de(`${n.houseGua}宅 · ${n.houseGroup}`),de(`坐${n.sitting}`),de(`向${n.facing}`)],u=[["门",p.door],["灶",p.stove],["床",p.bed],["厕",p.toilet]];return e.mingMatch&&u.push(["命宅配",e.mingMatch.text]),We("门主灶",`${n.houseGua}宅 · 坐${n.sitting} · 向${n.facing}`,i,g,Ae(u),[n.birthNote,e.disclaimer])}l.fengshuiHTML=function(e){if(!e||e.system!=="fengshui")return l.quickHTML(e);const n=e.meta||{};return n.action==="xuankong"?sa(e,n):n.action==="advise"?Fa(e,n):$a(e,n)},l.quickHTML=function(e){if(!e)return"";const p={almanac:"黄历",zeri:"择日",chenggu:"称骨",xiaoliuren:"小六壬",star:"星座",numerology:"生命数字",trend:"人生 K 线",fengshui:"风水",name:"起名",convert:"公农历转换",mbti:"十六型人格"}[e.system]||"速查",g=e.summary||"",i=g?`<pre class="mp-quick-pre">${t(g)}</pre>`:"";return`<section class="mp-quick" aria-label="${t(p)}结果">
      <div class="mp-quick-h"><b>${t(p)}</b></div>
      ${i}
    </section>`},l.summaryCardPNG=function(e,n){try{if(typeof document>"u"||!document.createElement)return"";const p=n&&n.outline||[],g=(n&&n.tables||[]).filter(A=>Array.isArray(A.rows)&&A.rows.length),i=n&&n.systemLabel||e&&e.system||"命理报告",u=900,m=44,r=26,b=(A,I)=>`${I?"600 ":""}${A}px "PingFang SC","Microsoft YaHei","Noto Sans CJK SC",sans-serif`,x=document.createElement("canvas"),f=x.getContext?x.getContext("2d"):null;if(!f)return"";const S=(A,I)=>{const L=[];let C="";for(const _ of String(A)){const ae=C+_;f.measureText(ae).width>I&&C?(L.push(C),C=_):C=ae}return C&&L.push(C),L.length?L:[""]};f.font=b(15);let w=0;const z=p.map(A=>{const I=S(A.text,u-m*2-70);return w+=Math.min(I.length,2)*r+10,{o:A,lines:I.slice(0,2)}}),N=g[0]||null,M=N?N.rows.slice(0,6):[],D=N?54+M.length*34:0,P=150+w+(z.length?34:0)+D+120;x.width=u,x.height=P,f.fillStyle="rgb(255,255,255)",f.fillRect(0,0,u,P),f.fillStyle="rgb(31,111,63)",f.fillRect(0,0,u,8);let d=52;f.fillStyle="rgb(27,27,27)",f.font=b(28,!0),f.fillText(`${i} · 摘要`,m,d),d+=30,f.fillStyle="rgb(111,106,96)",f.font=b(14);const y=[e&&e.input&&e.input.datetime?`出生/起局：${e.input.datetime}`:"","本地计算 · 可复现"].filter(Boolean).join("　");if(f.fillText(y,m,d),d+=34,z.length){f.fillStyle="rgb(31,111,63)",f.font=b(16,!0),f.fillText("一页读懂",m,d),d+=26;for(const{o:A,lines:I}of z)f.fillStyle="rgb(138,131,120)",f.font=b(14,!0),f.fillText(A.label,m,d),f.fillStyle="rgb(63,58,51)",f.font=b(15),I.forEach((L,C)=>f.fillText(L,m+70,d+C*r)),d+=I.length*r+10;d+=8}if(N){f.fillStyle="rgb(31,111,63)",f.font=b(16,!0),f.fillText(N.title,m,d),d+=24,f.fillStyle="rgb(138,131,120)",f.font=b(13),f.fillText(N.columns.join(" · "),m,d),d+=8,f.strokeStyle="rgb(229,225,216)",f.beginPath(),f.moveTo(m,d),f.lineTo(u-m,d),f.stroke(),d+=22,f.fillStyle="rgb(63,58,51)",f.font=b(14);for(const A of M){const I=A.filter(Boolean).join(" · "),L=S(I,u-m*2)[0];f.fillText(L,m,d),d+=34}}return d=P-62,f.strokeStyle="rgb(229,225,216)",f.beginPath(),f.moveTo(m,d-18),f.lineTo(u-m,d-18),f.stroke(),f.fillStyle="rgb(138,131,120)",f.font=b(12),f.fillText("内容用于传统文化学习与自我探索，不构成医疗、投资、法律或人事决策依据。",m,d+6),f.fillText("dsh-metaphysics · 本机计算，未上传任何数据",m,d+26),x.toDataURL?x.toDataURL("image/png"):""}catch{return""}}})();const Ya="dsh-metaphysics/history-v1";function At(){try{const o=window.localStorage&&window.localStorage.getItem(Ya),l=o?JSON.parse(o):[];return Array.isArray(l)?l.slice(0,20):[]}catch{return[]}}function Ka(o){try{window.localStorage&&window.localStorage.setItem(Ya,JSON.stringify(o.slice(0,20)))}catch{}}const Ht=(o,l)=>o.kind===l.kind&&o.date===l.date&&o.time===l.time&&o.gender===l.gender&&o.address===l.address&&o.lines===l.lines&&o.question===l.question&&o.mhMode===l.mhMode&&o.upper===l.upper&&o.lower===l.lower;function Ft(o,l){return o==="bazi"?Object.values(l.pillars||{}).map(F=>F.ganzhi).join(" "):o==="ziwei"?`${l.soul?l.soul.branch:""}宫 ${l.bureau?l.bureau.name:""} ${l.lunar?l.lunar.year+"年":""}`.trim():o==="liuyao"?l.ben&&l.ben.name?l.ben.name:"":o==="meihua"?l.ben&&l.ben.name?`${l.ben.name} 动${l.moving}`:"":o==="daliuren"?`${l.dayGanZhi||""} ${l.geJu?l.geJu.name:""}`:""}const K=window.__PP,Va=typeof window.__mpEnsureEngine=="function"?window.__mpEnsureEngine:async()=>window.Engine,_t=`
.mp-wrap{height:100%;width:100%;box-sizing:border-box;overflow:auto;padding:20px 24px 40px;color:var(--dsw-alias-label-primary);font-size:14px;container-type:inline-size}
/* 内容统一收在同一列居中，避免宽屏下输入框拉成一条 */
.mp-wrap>*{max-width:940px;margin-left:auto;margin-right:auto}
/* ── 表单卡片：等宽栅格，问题独占一行，按钮落在右下 ── */
.mp-panel{background:linear-gradient(180deg,var(--dsw-alias-bg-layer-2),color-mix(in srgb,var(--dsw-alias-bg-layer-2) 88%,var(--dsw-alias-bg-layer-1)));border:1px solid var(--dsw-alias-border-l1);border-radius:16px;padding:18px 20px 16px;margin-bottom:16px;
  box-shadow:0 1px 2px color-mix(in srgb,var(--dsw-alias-label-primary) 5%,transparent),0 16px 34px -30px color-mix(in srgb,var(--dsw-alias-label-primary) 45%,transparent)}
.mp-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px 14px;align-items:end}
.mp-lbl{display:block;height:18px;line-height:18px;font-size:12.5px;color:var(--dsw-alias-label-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mp-checks{display:flex;gap:20px;flex-wrap:wrap;margin-top:13px;font-size:12.5px;color:var(--dsw-alias-label-secondary)}
.mp-checks label{display:inline-flex;align-items:center;gap:6px;cursor:pointer}
/* 输入区第五项（交叉验证勾选）独占一行：留在四列里会空出半格，窄栏下又把日期挤成一条 */
.mp-row>.mp-checks{grid-column:1/-1;margin-top:0}
.mp-askblock{margin-top:14px;display:flex;flex-direction:column;gap:5px}
.mp-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:14px}
/* ── 首屏：最近用过 / 分组卡片 / 分组↔平铺（与独立页同一套信息架构） ── */
.mp-start{margin-bottom:14px;container-type:inline-size}
.mp-start-top{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:10px}
.mp-recent{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.mp-recent[hidden]{display:none}
.mp-recent-lbl{font-size:11.5px;font-weight:700;letter-spacing:.1em;color:var(--dsw-alias-brand-primary)}
.mp-recent-list{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.mp-rc{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:999px;border:1px solid var(--dsw-alias-border-l1);
  background:color-mix(in srgb,var(--dsw-alias-bg-layer-2) 72%,transparent);color:var(--dsw-alias-label-primary);
  font-family:inherit;font-size:12.5px;cursor:pointer;transition:border-color .14s,background .14s}
.mp-rc:hover{border-color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-layer-2)}
.mp-rc i{font-style:normal;font-size:11px;color:var(--dsw-alias-label-secondary)}
.mp-viewsw{margin-left:auto;display:inline-flex;padding:3px;border:1px solid var(--dsw-alias-border-l1);border-radius:999px;background:var(--dsw-alias-bg-layer-2)}
.mp-viewsw button{border:none;background:transparent;color:var(--dsw-alias-label-secondary);font-family:inherit;font-size:12px;padding:4px 11px;border-radius:999px;cursor:pointer;transition:background .14s,color .14s}
.mp-viewsw button:hover{color:var(--dsw-alias-label-primary)}
.mp-viewsw button.on{background:var(--dsw-alias-brand-primary);color:#fff}
.mp-groups{display:grid;grid-template-columns:repeat(auto-fit,minmax(228px,1fr));gap:10px}
.mp-tgroup{padding:12px 12px 10px;border:1px solid var(--dsw-alias-border-l1);border-radius:14px;
  background:linear-gradient(180deg,var(--dsw-alias-bg-layer-2),color-mix(in srgb,var(--dsw-alias-bg-layer-2) 88%,var(--dsw-alias-bg-layer-1)));
  box-shadow:0 1px 2px color-mix(in srgb,var(--dsw-alias-label-primary) 5%,transparent)}
.mp-tgroup-head h2{display:flex;align-items:center;gap:7px;margin:0;font-size:14px;font-weight:600;color:var(--dsw-alias-label-primary);letter-spacing:.06em}
.mp-tgroup-head h2::before{content:"";flex:none;width:7px;height:7px;border-radius:2px;background:var(--dsw-alias-brand-primary)}
.mp-tgroup-head p{margin:3px 0 9px;font-size:11.5px;line-height:1.55;color:var(--dsw-alias-label-secondary)}
.mp-ttools{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}
.mp-tool{display:flex;flex-direction:column;gap:1px;padding:7px 9px;text-align:left;border:1px solid var(--dsw-alias-border-l1);border-radius:9px;
  background:color-mix(in srgb,var(--dsw-alias-bg-layer-1) 72%,transparent);color:var(--dsw-alias-label-primary);font-family:inherit;cursor:pointer;
  transition:border-color .14s,background .14s,box-shadow .14s}
.mp-tool b{font-size:13px;font-weight:600;letter-spacing:.02em}
.mp-tool span{font-size:11px;line-height:1.4;color:var(--dsw-alias-label-secondary)}
.mp-tool:hover{border-color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-layer-1)}
.mp-tool.on{border-color:transparent;background:var(--dsw-alias-brand-primary);box-shadow:0 8px 18px -12px var(--dsw-alias-brand-primary)}
.mp-tool.on b,.mp-tool.on span{color:#fff}
.mp-tool.wide{grid-column:1/-1}
.mp-tmore{display:none;grid-column:1/-1;align-items:center;justify-content:center;gap:6px;padding:7px;border:1px dashed var(--dsw-alias-border-l1);border-radius:9px;
  background:transparent;color:var(--dsw-alias-label-secondary);font-family:inherit;font-size:12px;cursor:pointer}
.mp-tmore:hover{color:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary)}
/* 侧栏宽度不等于窗口宽度：用容器查询决定每组先露 4 项、其余折在「还有 N 个」后面 */
@container (max-width:560px){
  /* 窄侧栏：视图开关另起一行右对齐，避免和「最近用过」挤在同一行被裁掉 */
  .mp-start-top{flex-direction:column;align-items:stretch;gap:8px}
  .mp-viewsw{margin-left:0;align-self:flex-end}
  .mp-tgroup:not(.open) .mp-ttools>.mp-tool:nth-child(n+5){display:none}
  .mp-tmore{display:flex}
}
.mp-tabs{display:grid;grid-template-columns:repeat(auto-fit,minmax(74px,1fr));gap:6px;margin-bottom:14px;width:100%;max-width:940px}
.mp-tabs.hide{display:none}
.mp-tab{padding:7px 10px;border-radius:999px;border:1px solid transparent;background:color-mix(in srgb,var(--dsw-alias-bg-layer-2) 62%,transparent);color:var(--dsw-alias-label-secondary);cursor:pointer;font-size:13px;white-space:nowrap;
  transition:background .16s,color .16s,border-color .16s,box-shadow .16s}
.mp-tab:hover{background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-border-l1);color:var(--dsw-alias-label-primary)}
.mp-tab.on{background:var(--dsw-alias-brand-primary);border-color:transparent;color:#fff;font-weight:600;box-shadow:0 8px 18px -12px var(--dsw-alias-brand-primary)}
.mp-field{display:flex;flex-direction:column;gap:5px;font-size:13px;color:var(--dsw-alias-label-secondary);min-width:0}
/* box-sizing 必须写明：Chrome 下 select 默认 border-box、input 默认 content-box，同为 36px 时 input 实高 50px，底对齐后性别下拉的顶边比日期框低 14px */
.mp-input{box-sizing:border-box;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-primary);border-radius:9px;padding:7px 11px;font-size:14px;outline:none;width:100%;min-width:0;height:36px;
  transition:border-color .14s,box-shadow .14s,background .14s}
.mp-input:hover{border-color:color-mix(in srgb,var(--dsw-alias-border-l1) 45%,var(--dsw-alias-brand-primary))}
.mp-input:focus{border-color:var(--dsw-alias-brand-primary);box-shadow:0 0 0 3px color-mix(in srgb,var(--dsw-alias-brand-primary) 18%,transparent)}
/* 所问之事：多行文本，视觉与其他输入框一致 */
.mp-textarea{box-sizing:border-box;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-primary);border-radius:9px;padding:8px 11px;font-size:14px;outline:none;width:100%;min-width:0;resize:vertical;line-height:1.5;font-family:inherit;
  transition:border-color .14s,box-shadow .14s}
.mp-textarea:hover{border-color:color-mix(in srgb,var(--dsw-alias-border-l1) 45%,var(--dsw-alias-brand-primary))}
.mp-textarea:focus{border-color:var(--dsw-alias-brand-primary);box-shadow:0 0 0 3px color-mix(in srgb,var(--dsw-alias-brand-primary) 18%,transparent)}
.mp-textarea.invalid{border-color:var(--dsw-alias-state-error-primary)}
/* ── 人格问卷：4 题一页，1–5 单选；题面与刻度说明都来自引擎 ── */
.mp-quiz-wrap{grid-column:1 / -1;display:flex;flex-direction:column;gap:6px}
.mp-quiz-top{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.mp-quiz-bar{flex:1 1 160px;min-width:110px;height:6px;border:1px solid var(--dsw-alias-border-l1);border-radius:999px;background:var(--dsw-alias-bg-layer-1);overflow:hidden}
.mp-quiz-bar i{display:block;height:100%;border-radius:999px;background:var(--dsw-alias-brand-primary);transition:width .18s ease}
.mp-quiz-count{font-size:12px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;white-space:nowrap}
.mp-quiz-list{display:flex;flex-direction:column;gap:8px;margin-top:8px}
.mp-quiz-q{padding:10px 12px;border:1px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-layer-1)}
.mp-quiz-qt{display:flex;gap:8px;align-items:baseline;font-size:13px;line-height:1.6;color:var(--dsw-alias-label-primary)}
.mp-quiz-qt b{flex:none;padding-top:1px;font:600 11px/1.4 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;letter-spacing:.04em;color:var(--dsw-alias-brand-primary)}
.mp-quiz-opts{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px;margin-top:8px}
.mp-quiz-o{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:6px 4px;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);cursor:pointer;text-align:center;
  transition:border-color .14s,background .14s,color .14s}
.mp-quiz-o input{position:absolute;inset:0;margin:0;opacity:0;cursor:pointer}
.mp-quiz-o b{font-size:13px;font-weight:600;color:var(--dsw-alias-label-primary);font-variant-numeric:tabular-nums}
.mp-quiz-o span{font-size:11px;line-height:1.3}
.mp-quiz-o:hover{border-color:var(--dsw-alias-brand-primary)}
.mp-quiz-o.on{border-color:transparent;background:var(--dsw-alias-brand-primary)}
.mp-quiz-o.on b,.mp-quiz-o.on span{color:#fff}
.mp-quiz-o:focus-within{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
.mp-quiz-nav{display:flex;align-items:center;gap:8px;margin-top:10px;flex-wrap:wrap}
.mp-quiz-btn{padding:6px 14px;border-radius:8px;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-primary);font-family:inherit;font-size:12.5px;cursor:pointer;min-height:32px}
.mp-quiz-btn:hover:not(:disabled){border-color:var(--dsw-alias-brand-primary)}
.mp-quiz-btn:disabled{opacity:.42;cursor:not-allowed}
.mp-quiz-btn.primary{border-color:transparent;background:var(--dsw-alias-brand-primary);color:#fff;font-weight:600}
.mp-quiz-hint{margin-left:auto;font-size:12px;color:var(--dsw-alias-label-secondary);line-height:1.6}
.mp-btn{padding:8px 22px;border-radius:9px;border:none;background:var(--dsw-alias-brand-primary);color:#fff;cursor:pointer;font-size:14px;font-weight:600;min-width:132px;
  box-shadow:0 10px 20px -14px var(--dsw-alias-brand-primary);transition:transform .14s,filter .14s,box-shadow .14s}
.mp-btn:hover{filter:brightness(1.06);transform:translateY(-1px)}
.mp-btn:active{transform:none;filter:brightness(.98)}
.mp-btn.ghost{background:transparent;border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-secondary);box-shadow:none}
.mp-btn.ghost:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);filter:none}
.mp-seg{display:flex;width:100%;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;overflow:hidden;height:36px}
.mp-seg button{flex:1;padding:0 8px;background:transparent;border:none;color:var(--dsw-alias-label-secondary);font-size:13px;cursor:pointer}
.mp-seg button.on{background:var(--dsw-alias-brand-primary);color:#fff}
/* 奇门「换局规则」：fieldset + 原生 radio（语义优先，外观沿用面板浅色块） */
.mp-qmrule{grid-column:1 / -1;border:0;margin:0;padding:0;display:flex;flex-wrap:wrap;align-items:center;gap:10px 14px}
.mp-qmrule legend{padding:0}
.mp-qmopts{display:flex;flex-wrap:wrap;gap:8px}
.mp-qmopt{display:inline-flex;align-items:center;gap:7px;padding:7px 12px;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;font-size:13px;cursor:pointer;color:var(--dsw-alias-label-primary)}
.mp-qmopt input{accent-color:var(--dsw-alias-brand-primary);margin:0}
.mp-qmhelp{flex:1 1 100%;font-size:12.5px;color:var(--dsw-alias-label-secondary)}
.mp-qmhelp summary{cursor:pointer}
.mp-qmhelp p{margin:6px 0 0}
/* 奇门盘面事实：dt/dd 键值表，事实与结论分开 */
.relation{display:flex;flex-direction:column;gap:6px;margin:14px 0 0;padding:12px;background:var(--dsw-alias-bg-layer-2);border-left:3px solid var(--dsw-alias-brand-primary);border-radius:8px}
.relation__row{display:grid;grid-template-columns:96px minmax(0,1fr);gap:8px;align-items:baseline}
.relation__row dt{margin:0;font-size:12.5px;color:var(--dsw-alias-label-secondary)}
.relation__row dd{margin:0;font-size:13.5px;color:var(--dsw-alias-label-primary)}
.mp-hist{margin-bottom:14px}
.mp-hist-h{display:flex;align-items:center;justify-content:space-between;font-size:12px;color:var(--dsw-alias-label-secondary);margin-bottom:6px}
.mp-hist-clear{background:transparent;border:none;color:var(--dsw-alias-label-secondary);font-size:12px;cursor:pointer;padding:0}
.mp-hist-clear:hover{color:var(--dsw-alias-state-error-primary)}
.mp-hist-list{display:flex;gap:8px;flex-wrap:wrap}
.mp-hist-item{display:flex;align-items:baseline;gap:6px;padding:6px 10px;border-radius:9px;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-primary);font-size:12px;cursor:pointer;max-width:100%}
.mp-hist-item:hover{border-color:var(--dsw-alias-brand-primary)}
.mp-hist-item b{font-weight:600}
.mp-hist-item span{color:var(--dsw-alias-label-secondary)}
.mp-hist-item i{font-style:normal;color:var(--dsw-alias-label-secondary);opacity:.7;font-size:11px}.mp-hint{font-size:12.5px;color:var(--dsw-alias-label-secondary);line-height:1.7;margin:0 0 14px;padding-left:2px}
.mp-card{margin-top:18px;padding:16px 18px;border-radius:16px;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);
  box-shadow:0 1px 2px color-mix(in srgb,var(--dsw-alias-label-primary) 5%,transparent),0 18px 40px -32px color-mix(in srgb,var(--dsw-alias-label-primary) 42%,transparent)}
.mp-flat{margin-top:16px;padding:0;border:none;background:transparent;border-radius:0}
.mp-dim{color:var(--dsw-alias-label-secondary)}
.mp-err{margin-top:16px;padding:9px 14px;border-radius:8px;border-left:3px solid var(--dsw-alias-state-error-primary);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 8%,transparent);color:var(--dsw-alias-state-error-primary);font-size:13px}
.mp-empty{margin-top:26px;padding:34px 24px;border:1px dashed var(--dsw-alias-border-l1);border-radius:12px;text-align:center;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:2}
.mp-empty b{display:block;font-size:15px;color:var(--dsw-alias-label-primary);margin-bottom:6px;font-weight:600}
.mp-note{margin-top:12px;padding:9px 14px;border-radius:10px;font-size:12px;background:color-mix(in srgb,var(--dsw-alias-state-warning-primary) 14%,transparent);color:var(--dsw-alias-state-warning-primary)}
.mp-bar{display:flex;gap:8px;align-items:center;margin-top:14px}
/* 追问：输入 + 结果卡 */
.mp-askbox{display:flex;gap:8px;align-items:center;margin-top:12px}
.mp-askbox .mp-input{flex:1;min-width:0}
.mp-fx{margin-top:10px}
/* 验前事 / 生时校正 */
.mp-verify,.mp-rect{margin-top:12px;padding:12px;border:1px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-layer-2)}
.mp-verify-h{font-size:12px;font-weight:700;letter-spacing:.08em;color:var(--dsw-alias-label-secondary);margin-bottom:8px}
.mp-verify-row{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:12.5px;padding:3px 0}
.mp-verify-btns{display:flex;gap:4px}
.mp-chip{font-size:11.5px;padding:2px 8px;border-radius:999px;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer}
.mp-chip.on{background:var(--dsw-alias-brand-primary);color:#fff;border-color:transparent}
.mp-verify-foot{display:flex;align-items:flex-start;gap:8px;margin-top:8px;flex-wrap:wrap}
.mp-verify-fit{font-size:12px;color:var(--dsw-alias-label-secondary);line-height:1.7;flex:1;min-width:0}
.mp-rect-row{display:flex;gap:6px;margin-bottom:6px}
.mp-rect-row .mp-input{flex:1;min-width:0}
.mp-rect-cand{font-size:12px;padding:5px 8px;border-radius:6px;background:var(--dsw-alias-bg-layer-1);margin-top:4px;color:var(--dsw-alias-label-secondary)}
.mp-rect-cand.best{border-left:3px solid var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-primary)}
.mp-rect-err{color:var(--dsw-alias-label-secondary);font-size:12px}
.mp-checks{flex-direction:row;align-items:center;gap:7px;font-size:12.5px}
.mp-checks input{width:15px;height:15px;accent-color:var(--dsw-alias-brand-primary)}
/* 起卦类 tab 的「已自动取当前时刻」提示（.mp-hint 的补充行，不额外占横向空间） */
.mp-auto{margin:-8px 0 14px;padding-left:2px;font-size:12.5px;line-height:1.7;color:var(--dsw-alias-label-secondary)}
/* 结果头部的「起卦时刻」一行 */
.mp-cast{margin:0 0 14px;padding-left:2px;font-size:12.5px;line-height:1.7;color:var(--dsw-alias-label-secondary)}
.mp-cast b{color:var(--dsw-alias-label-primary);font-weight:600}
/* ── 窄屏 / 手机：网格降列，按钮占满 ──
   侧栏宽度不等于窗口宽度：面板常被拖到 600px 左右而宿主窗口仍是 1200px，
   用视口媒体查询会继续排四列，输入框被压成 117px、标签截断。
   改按 .mp-wrap 的容器宽度降列（容器查询见下方），媒体查询只保留给整页布局。 */
@container (max-width:860px){
  .mp-row{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@container (max-width:480px){
  .mp-row{grid-template-columns:1fr}
}
@media (max-width:720px){
  .mp-wrap{padding:14px 14px 36px}
  /* 19 个 tab 铺网格要占掉大半个首屏：窄屏改单行横滑，44px 触摸目标、滚动条藏起来 */
  .mp-tabs{display:flex;flex-wrap:nowrap;gap:8px;overflow-x:auto;overscroll-behavior-x:contain;margin:0 -14px 12px;padding:2px 14px 6px;scrollbar-width:none}
  .mp-tabs::-webkit-scrollbar{display:none}
  .mp-tab{flex:0 0 auto;min-height:44px;padding:10px 16px;font-size:13.5px;text-align:center}
  .mp-rc{min-height:36px}
  .mp-input,.mp-textarea{padding:10px 12px;font-size:16px;min-height:44px;height:auto}
  .mp-textarea{min-height:76px}
  .mp-quiz-q{padding:9px 10px}
  .mp-quiz-o{padding:8px 3px;min-height:50px}
  .mp-quiz-o span{font-size:10px}
  .mp-quiz-btn{flex:1 1 auto;min-height:44px}
  .mp-quiz-hint{flex-basis:100%;margin-left:0}
  .mp-actions{margin-top:12px}
  .mp-btn{width:100%;padding:12px;font-size:15px;min-height:46px;min-width:0}
  .mp-hint,.mp-auto,.mp-cast{font-size:12.5px}
  .mp-empty{margin-top:18px;padding:24px 16px;font-size:12.5px}
  .mp-bar{flex-wrap:wrap}
}
@media (max-width:420px){
  .mp-wrap{padding:12px 10px 32px}
  .mp-tabs{margin-left:-10px;margin-right:-10px;padding-left:10px;padding-right:10px}
  .mp-tab{font-size:13px;padding:9px 13px}
}
/* 键盘可达：面板里的按钮/链接都要有可见焦点环 */
:where(.mp-btn,.mp-tab,.mp-chip,.mp-hist-item,.mp-hist-clear,.mp-qmopt,.seg button):focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{transition-duration:.001ms!important;animation-duration:.001ms!important}
}
`,{useState:T,useEffect:aa}=ea,la=4,Le=12;let da=null;function ca(){if(da)return da;let o=null;try{o=Z.compute({system:"mbti"})}catch{o=null}const l=o&&o.questions||[];return l.length?(da={total:o&&o.total||l.length,questions:l,scale:o&&o.scale||{}},da):{total:0,questions:[],scale:{}}}function Et(o){const{answers:l,page:F,onPick:V,onPage:W,onSubmit:ne,onClear:te}=o,se=ca(),t=Math.max(1,Math.ceil(se.total/la)),O=F*la,me=se.questions.slice(O,O+la),oe=l.filter(we=>we!=null).length,ue=se.total?Math.round(oe/se.total*100):0,Re=F>=t-1,Ie=oe>=Le;return s("div",{className:"mp-quiz"},s("div",{className:"mp-quiz-top"},s("div",{className:"mp-quiz-bar","aria-hidden":"true"},s("i",{style:{width:ue+"%"}})),s("span",{className:"mp-quiz-count"},`第 ${F+1} / ${t} 页 · 已答 ${oe} / ${se.total}`)),s("div",{className:"mp-quiz-list"},me.map((we,le)=>{const Q=O+le;return s("div",{key:we.id||Q,className:"mp-quiz-q"},s("div",{className:"mp-quiz-qt"},s("b",null,String(Q+1).padStart(2,"0")),s("span",null,we.text)),s("div",{className:"mp-quiz-opts",role:"radiogroup","aria-label":`第 ${Q+1} 题`},[1,2,3,4,5].map(xe=>s("label",{key:xe,className:"mp-quiz-o"+(l[Q]===xe?" on":"")},s("input",{type:"radio",name:`mpmbq${Q}`,value:String(xe),checked:l[Q]===xe,onChange:()=>V(Q,xe)}),s("b",null,String(xe)),s("span",null,se.scale[xe]||"")))))})),s("div",{className:"mp-quiz-nav"},s("button",{className:"mp-quiz-btn",disabled:F<=0,onClick:()=>W(-1)},"上一页"),Re?null:s("button",{className:"mp-quiz-btn",onClick:()=>W(1)},"下一页"),s("button",{className:"mp-quiz-btn primary",disabled:!Ie,onClick:ne},"看结果"),s("button",{className:"mp-quiz-btn",onClick:te},"清空"),s("span",{className:"mp-quiz-hint"},Ie?`已够 ${Le} 题，可以看结果；答完 ${se.total} 题会更准。`:`答满 ${Le} 题可先看结果（还差 ${Le-oe} 题）。`)))}class Pt extends(ea.Component||Object){constructor(l){super(l),this.state={err:null}}static getDerivedStateFromError(l){return{err:l}}componentDidCatch(l,F){console.error("[metaphysics] 面板渲染异常",l,F)}render(){if(!this.state.err)return this.props.children;const l=this.state.err,F=String(l&&l.stack||"").split(`
`).slice(0,14).join(`
`);return s("div",{className:"mp-wrap"},s("div",{className:"mp-panel"},s("div",{className:"mp-lbl"},"命理面板渲染出错——把下面这段发给我"),s("pre",{style:{whiteSpace:"pre-wrap",fontSize:12,lineHeight:1.5,maxHeight:320,overflow:"auto",margin:"8px 0"}},String(l&&l.message||l)+`

`+F),s("div",{className:"mp-lbl"},"环境：__PP "+typeof K+" · Engine "+typeof window.Engine+" · React "+typeof ea+" · 版本 "+(typeof K=="object"&&K&&(window.__MP_VER||"?")))))}}function Ot(o){const l=o&&o.size?o.size:20,F=o&&o.active;return s("svg",{width:l,height:l,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.6,strokeLinecap:"round","aria-hidden":!0,style:{opacity:F?1:.72}},s("circle",{cx:12,cy:12,r:8.2}),s("path",{d:"M12 3.8a4.1 4.1 0 0 1 0 8.2 4.1 4.1 0 0 0 0 8.2"}),s("circle",{cx:12,cy:8,r:1.1,fill:"currentColor",stroke:"none"}),s("circle",{cx:12,cy:16,r:1.1,fill:"currentColor",stroke:"none"}))}const Pe=[{k:"ziwei",label:"紫微",timeLabel:"出生时刻",hint:"紫微斗数需要出生日期、时刻与性别；出生地只影响真太阳时修正。"},{k:"bazi",label:"八字",timeLabel:"出生时刻",hint:"四柱八字按节气与真太阳时定时柱，出生地越准，时柱越稳。"},{k:"liuyao",label:"六爻",timeLabel:"起卦时刻",hint:"六爻不需要出生时间：只用起卦当下的日辰定六神、月建定旺衰，卦由摇出。"},{k:"meihua",label:"梅花",timeLabel:"起卦时刻",hint:"梅花用起卦时刻的年月日时数成卦，也可直接给两个数字起卦；与出生时间无关。"},{k:"daliuren",label:"六壬",timeLabel:"起卦时刻",hint:"大六壬用起卦时刻的日干支、时支与月将起天地盘；同样与出生时间无关。"},{k:"qimen",label:"奇门",timeLabel:"起局时刻",hint:"奇门时家转盘：用起局时刻定节气、三元与局数；换局规则决定符头与节气如何对齐。"},{k:"hepan",label:"合盘",timeLabel:"你的出生时刻",hint:"合盘按「日主 + 夫妻宫 + 五行互补」看两个人的相处与互补，需要双方出生信息。"},{k:"tarot",label:"塔罗",timeLabel:"",hint:"塔罗不看时间，只记录抽牌时刻与你的提问。"},{k:"almanac",label:"黄历",timeLabel:"",hint:"黄历按公历日期查农历、干支、宜忌、时辰吉凶、二十八宿与吉神方位；只做本地计算。"},{k:"convert",label:"农历",timeLabel:"",hint:"公农历互转：公历生日可反查农历；只知道农历生日时，可转成公历再排盘。"},{k:"zeri",label:"择日",timeLabel:"",hint:"择日把区间内每天的建除宜忌与事项适配打分排序，并按属相排除冲煞日。"},{k:"chenggu",label:"称骨",timeLabel:"出生时刻",hint:"称骨按农历年、月、日、时的骨重求和；时辰必填。"},{k:"xiaoliuren",label:"小六壬",timeLabel:"起课时刻",hint:"小六壬用农历月/日/时掐指，也可用三个随机数起课。"},{k:"star",label:"星座",timeLabel:"",hint:"星座按公历日期给出太阳星座与当日基调；同日同星座结果固定。"},{k:"numerology",label:"生命数字",timeLabel:"",hint:"生命数字按公历生日归约出生命路径数、生日数与态度数。"},{k:"mbti",label:"人格",timeLabel:"",hint:"十六型人格是 24 道自我报告题的 MBTI 风格测算：4 题一页，按 1–5 打分，答满 12 题即可看结果；只作自我参照，不是官方量表。"},{k:"trend",label:"人生K线",timeLabel:"出生时刻",hint:"人生 K 线按大运与流年十神给逐年运势分，画成走势图。"},{k:"fengshui",label:"风水",timeLabel:"",hint:"风水看八宅命卦、大游年四吉四凶与流年九宫飞星；也可按坐向看门主灶倾向，或按运与坐向排玄空下卦盘。"},{k:"name",label:"起名",timeLabel:"",hint:"起名按八字喜用匹配字库五行，可评估现有名字或生成候选名。"}];function Ye(o){return String(o).padStart(2,"0")}const La=["almanac","convert","zeri","chenggu","xiaoliuren","star","numerology","trend","fengshui","name"],Rt=Array.isArray(window.__MPGroups)?window.__MPGroups:[],Wa="mp.recent.tabs",Ua="mp.first.view",Xa=3;function Ja(o){try{return JSON.parse(window.localStorage.getItem(o)||"null")}catch{return null}}function Qa(o,l){try{window.localStorage.setItem(o,JSON.stringify(l))}catch{}}function It(o){const l=new Date(o);if(Number.isNaN(l.getTime()))return"";const F=W=>new Date(W.getFullYear(),W.getMonth(),W.getDate()).getTime(),V=Math.round((F(new Date)-F(l))/864e5);return V<=0?"今天":V===1?"昨天":`${Ye(l.getMonth()+1)}-${Ye(l.getDate())}`}function Ta(){const o=new Date;return{date:`${o.getFullYear()}-${Ye(o.getMonth()+1)}-${Ye(o.getDate())}`,time:`${Ye(o.getHours())}:${Ye(o.getMinutes())}`}}const Dt={ziwei:"birth",bazi:"birth",hepan:"birth",liuyao:"cast",meihua:"cast",daliuren:"cast",qimen:"cast",tarot:"none",almanac:"date",zeri:"date",star:"date",numerology:"date",convert:"date",chenggu:"birth",trend:"birth",fengshui:"birth",name:"birth",xiaoliuren:"cast",mbti:"none"},et={date:"1990-05-12",time:"14:30"},Aa=o=>Dt[o]||"none",at=window.__MPCore||{},Te=at.needAsk||(o=>!1),J={ref:null,seats:[],keys:"",injectType:"",spec:"",errs:[],regs:0,mounted:0},Oe={r:null,q:"",it:null};function tt(){const o=[];return o.push("inputActions "+(J.ref?"已拿到":"未拿到")),o.push("渲染 "+J.mounted+" 次"),o.push("注册 "+J.regs+" 次"),o.push("inject "+(J.injectType||"?")),o.push("槽位 "+(J.spec||"?")),J.errs.length&&o.push("错误："+J.errs.join(" / ")),"桥自检："+o.join("；")}function it(o){if(J.errs.length>=3)return;const l=o&&o.message?String(o.message):String(o);J.errs.push(l.slice(0,90))}function Gt(o){if(!o)return null;const l=o.inputActions;if(l&&typeof l.setDraft=="function"&&typeof l.submit=="function")return l;const F=o.actions&&o.actions.input;return F&&typeof F.setDraft=="function"&&typeof F.submit=="function"?F:null}function nt(o,l){const F=Gt(o);return aa(()=>{if(J.seats.indexOf(l)<0&&J.seats.push(l),J.keys=o?Object.keys(o).join(","):"",F){J.ref=F;try{window.__MPComposer=F}catch{}}return()=>{J.ref===F&&(J.ref=null)}},[F,l]),F}function Bt(){const o=Oe.r;if(!o)return"";try{const l=Z.askPrompt?Z.askPrompt(o,{question:Oe.q,interpret:Oe.it}):null;return l&&l.text||String(o.summary||"")}catch{return String(o.summary||"")}}function st(o){return J.mounted+=1,nt(o,"input.right")?s("button",{type:"button",className:"mp-chip ok",title:Oe.r?"把上一张盘的摘要和问题发进对话窗":"先在侧栏「命理」里排一张盘",onClick:()=>{const F=Bt();F&&pt(F)}},"命理·问"):s("span",{className:"mp-chip warn",title:"命理：已占住输入框槽位，但没拿到 inputActions；把这句话告诉作者"},"命理·未就绪")}function ot(o){return J.mounted+=1,nt(o,"composer.dock"),null}function pt(o){let l=J.ref;if(!l)try{l=window.__MPComposer||null}catch{l=null}return!l||typeof l.setDraft!="function"||typeof l.submit!="function"?!1:(l.setDraft(o),l.submit(),!0)}function Zt(){const[o,l]=T("ziwei"),[F,V]=T("1990-05-12"),[W,ne]=T("14:30"),[te,se]=T("female"),[t,O]=T(""),[me,oe]=T("1992-08-15"),[ue,Re]=T("10:00"),[Ie,we]=T("female"),[le,Q]=T(""),[xe,ma]=T("bazi"),[ta,Ke]=T("chaibu"),[ke,ia]=T(!0),[ve,ga]=T(!0),[ua,xa]=T("same-day"),[fa,ba]=T(!1),[qe,Ha]=T(""),[ha,De]=T(""),[va,Ve]=T(null),[na,ya]=T({}),[de,Ge]=T(null),[Ae,We]=T([{year:"2019",kind:"career"},{year:"2022",kind:"love"}]),[Ne,sa]=T(null),[$a,Fa]=T("开业"),[e,n]=T("30"),[p,g]=T(""),[i,u]=T("solar2lunar"),[m,r]=T(""),[b,x]=T(!1),[f,S]=T("time"),[w,z]=T(""),[N,M]=T(""),[D,P]=T(""),[d,y]=T(()=>new Array(ca().total).fill(null)),[A,I]=T(0),[L,C]=T("60"),[_,ae]=T("natal"),[X,ee]=T("9"),[ie,ze]=T("子"),[fe,Be]=T("午"),[ge,Me]=T("assess"),[Se,H]=T("李"),[c,v]=T(""),[G,U]=T("6"),[pe,je]=T(!1),[j,be]=T(""),[h,ce]=T(null);aa(()=>{h&&h.r&&(Oe.r=h.r,Oe.q=qe.trim(),Oe.it=h.it||null)},[h,qe]);const[Ue,He]=T(()=>At()),[Fe,Vt]=T(()=>Ja(Ua)==="flat"?"flat":"group"),[Wt,Ut]=T(()=>{const a=Ja(Wa);return Array.isArray(a)?a:[]}),[Xt,Jt]=T({}),[_a,rt]=T(null),[wa,Ce]=T(""),[lt,ka]=T(""),[Qt,za]=T(!1),[Ea,dt]=T("3"),[Xe,ct]=T(""),[Je,mt]=T("general"),[gt,ei]=T(null),[ai,ja]=T(!1),[_e,ut]=T("time"),[qa,xt]=T(""),[Na,ft]=T(""),[Ma,bt]=T(""),[ti,oa]=T(""),[Pa,Sa]=T({birth:null,cast:null}),ii=Pe.find(a=>a.k===o)||Pe[0],pa=o==="bazi"||o==="ziwei"||o==="hepan"||o==="chenggu"||o==="trend"||o==="fengshui"||o==="name",ye=Aa(o),ht=!(o==="meihua"&&_e==="number"),vt=o!=="tarot"&&o!=="mbti"&&ht,yt=vt&&ye!=="date",Ci=yt,$e=async(a,$,E,R)=>{const k=a||o,re=E||_e,he=$||{date:F,time:W},Ee=R&&R.gender?R.gender:te,St=R&&typeof R.address=="string"?R.address:t;ka("");try{za(!0);try{await Va(k)}catch(B){Ce(B&&B.message?B.message:String(B)),ce(null);return}finally{za(!1)}const Ze=`${he.date}T${he.time}`,q={system:k};if(q.shadow=k!=="mbti",q.trace=k==="liuyao"||k==="bazi"||k==="ziwei"||k==="qimen"||k==="daliuren",k!=="tarot"&&(q.datetime=Ze),k==="bazi"||k==="ziwei"||k==="hepan"){if(q.gender=Ee,q.trueSolar=ke,St.trim()){q.address=St.trim();try{const B=await Z.geocodeAddress(q.address,{online:pe});B&&typeof B.lon=="number"&&(q.longitude=B.lon,q.geo=B)}catch(B){console.error("[metaphysics] 地址解析失败，退回内置表",B)}}k!=="hepan"&&(q.cross=fa),q.lateZi=ve}if(k==="liuyao"){const B=at.parseLines(j);B.lines?q.lines=B.lines:B.warning&&ka(B.warning)}if(k==="qimen"&&(q.juMethod=ta,q.lateZiHourMode=ua,q.direction=Je),k==="bazi"&&(q.verifyPast=6),k==="zeri"&&(q.startDate=he.date,q.task=$a,q.days=Number(e)||30,p&&(q.shengXiao=p)),k==="xiaoliuren")if(q.mode=f,f==="number")q.num1=Number(w)||void 0,q.num2=Number(N)||void 0,q.num3=Number(D)||void 0;else{q.date=he.date;const B=Number(String(he.time).split(":")[0]);q.hour=Number.isFinite(B)?B:12}if(k==="mbti"){delete q.datetime;const B=d.slice();for(;B.length&&B[B.length-1]==null;)B.pop();B.length&&(q.answers=B)}if(k==="trend"&&(q.gender=Ee,q.toAge=Number(L)||60,q.trueSolar=ke,q.lateZi=ve),k==="fengshui"&&(q.action=_,_==="natal"?q.gender=Ee:(q.sitting=ie,q.facing=fe,delete q.datetime,_==="xuankong"&&(q.period=Number(X)||9))),k==="name"&&(q.action=ge,q.surname=Se.trim(),ge==="generate"?(q.gender=Ee,q.limit=Number(G)||6,q.trueSolar=ke,q.lateZi=ve):(q.givenName=c.trim(),(!he.date||!he.time)&&delete q.datetime)),k==="convert")if(q.system="convert",i==="lunar2solar"){const B=/^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(m).trim());if(!B){Ce("农历转公历请按「农历年-月-日」填写，例如 2026-9-17；闰月单独勾选。");return}q.mode="lunar2solar",q.lunarYear=Number(B[1]),q.lunarMonth=Number(B[2]),q.lunarDay=Number(B[3]),q.isLeapMonth=b,delete q.datetime}else q.mode="solar2lunar";if(k==="tarot"&&(q.count=Number(Ea)),k==="hepan"&&(q.chart=xe,q.partner={datetime:`${me}T${ue}`,gender:Ie,address:le.trim()||void 0,trueSolar:ke}),Te(k)){if(!Xe.trim()){Ce("请先填写「所问之事」——一句话即可，例如：今年是否适合换工作？"),ja(!0),ce(null);return}ja(!1),q.question=Xe.trim(),k==="liuyao"&&(q.direction=Je)}if(k==="meihua"&&(q.mode=re,re==="number")){if(qa.trim()===""||Na.trim()===""){Ce("数字起卦需要填两个数（第一个数定上卦、第二个数定下卦）。"),ce(null);return}if(q.upper=Number(qa),q.lower=Number(Na),!Number.isFinite(q.upper)||!Number.isFinite(q.lower)){Ce("两个数都要是数字，例如 17 和 29。"),ce(null);return}Ma!==""&&(q.changing=Number(Ma))}const Qe=Z.compute(q);let Ra=null;try{Ra=K.shadowTrack?K.shadowTrack(Qe):null}catch{Ra=null}let Ia=null;if(k==="bazi")try{Ia=Z.compute({system:"trend",datetime:Ze,gender:Ee,toAge:100,trueSolar:ke,lateZi:ve,...q.dst!==void 0?{dst:q.dst}:{},...q.address?{address:q.address}:{},...typeof q.longitude=="number"?{longitude:q.longitude}:{},...q.geo?{geo:q.geo}:{}})}catch{Ia=null}let Da=null;if(Z.caliberCompare)try{Da=Z.caliberCompare(q)}catch{Da=null}const qi=Te(k)||k==="qimen"?{question:Te(k)?Xe.trim():"",direction:Je}:void 0,Ca=Z.interpret?Z.interpret(Qe,qi):null;Ca&&Qe.cross&&Z.crossSection&&(Ca.sections=[...Ca.sections||[],Z.crossSection(Qe.cross)]);const Ni=Aa(k)==="cast"&&(k!=="meihua"||re==="time");if(ce({kind:k,r:Qe,it:Ca,at:he,timed:Ni,trend:Ia,caliber:Da,shadowDiff:Ra}),Ve(null),Ge(null),ya({}),sa(null),Ce(""),oa(""),k!=="tarot"&&k!=="mbti"){const B={kind:k,date:F,time:W,gender:te,address:t,lines:k==="liuyao"?j:"",question:Te(k)?Xe.trim():"",direction:Je,count:Ea,mhMode:_e,upper:qa,lower:Na,changing:Ma,label:Ft(k,Qe),at:Date.now()};He(Mi=>{const Ct=[B,...Mi.filter(Si=>!Ht(Si,B))].slice(0,20);return Ka(Ct),Ct})}}catch(Ze){Ce(Ze&&Ze.message?Ze.message:String(Ze)),ce(null)}},ni=async a=>{const $=Aa(a);if(Ce(""),a==="mbti"){ka(""),za(!0);try{await Va(a)}catch(R){Ce(R&&R.message?R.message:String(R))}finally{za(!1)}l(a),d.filter(R=>R!=null).length>=Le?$e(a):ce(null);return}if(l(a),$==="none"){$e(a);return}const E=Pa[$]||($==="cast"?Ta():{date:et.date,time:et.time});V(E.date),ne(E.time),$e(a,E)},si=a=>{Pe.some($=>$.k===a)&&Ut($=>{const E=($||[]).filter(k=>k&&k.tab&&k.tab!==a),R=[{tab:a,at:Date.now()}].concat(E).slice(0,Xa);return Qa(Wa,R),R})},$t=a=>{const $=a==="flat"?"flat":"group";Vt($),Qa(Ua,$)},Oa=a=>{si(a),ni(a)},oi=a=>{V(a),ye!=="none"&&Sa($=>Object.assign({},$,{[ye]:{date:a,time:W}}))},pi=a=>{ne(a),ye!=="none"&&Sa($=>Object.assign({},$,{[ye]:{date:F,time:a}}))},Li=()=>{const a=Ta();V(a.date),ne(a.time),ye!=="none"&&Sa($=>Object.assign({},$,{[ye]:null})),$e(o,a)},wt=()=>{if(o==="mbti"){const a=d.filter($=>$!=null).length;if(a<Le){ka(`先答满 ${Le} 题再看结果（现答 ${a} 题，还差 ${Le-a} 题）。`);return}$e(o);return}if(ye!=="none"&&!Pa[ye]){const a=Ta();V(a.date),ne(a.time),$e(o,a);return}$e(o)},ri=()=>{const a={date:"1990-05-12",time:"14:30"};l("bazi"),se("male"),O("河北石家庄"),Sa($=>Object.assign({},$,{birth:a})),V(a.date),ne(a.time),$e("bazi",a,null,{gender:"male",address:"河北石家庄"})},kt=a=>{ut(a),$e(o,{date:F,time:W},a)},li=()=>!!(window.matchMedia&&window.matchMedia("(max-width: 640px)").matches),di=()=>gt===null?li():gt,ci=a=>{const $=a.getAttribute("data-shadow-copy")||"";if(!$)return;const E=k=>{a.textContent=k?"已复制":"复制失败",setTimeout(()=>{a.textContent="复制 ID"},1400)},R=()=>{try{const k=document.createElement("textarea");k.value=$,k.setAttribute("readonly",""),k.style.position="fixed",k.style.opacity="0",document.body.appendChild(k),k.select();const re=!!(document.execCommand&&document.execCommand("copy"));return document.body.removeChild(k),re}catch{return!1}};try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText($).then(()=>E(!0),()=>E(R()));return}}catch{}E(R())},mi=()=>{const a=document.getElementById("mp-trace-layer");if(!a)return;a.classList.add("open"),a.setAttribute("aria-hidden","false");const $=a.querySelector("[data-trace-close]");$&&$.focus&&$.focus()},zt=()=>{const a=document.getElementById("mp-trace-layer");if(!a)return;a.classList.remove("open"),a.setAttribute("aria-hidden","true");const $=document.querySelector("[data-trace-open]");$&&$.focus&&$.focus()},gi=a=>{const $=a.target&&a.target.closest?a.target.closest("[data-shadow-copy]"):null;if($){ci($);return}if(a.target&&a.target.closest?a.target.closest("[data-trace-open]"):null){mi();return}if(a.target&&a.target.closest?a.target.closest("[data-trace-close]"):null){zt();return}const k=a.target&&a.target.closest?a.target.closest(".mp-it-head"):null;if(!k)return;const re=k.closest(".mp-it");if(!re)return;const he=!re.classList.contains("folded");re.classList.toggle("folded",he),k.setAttribute("aria-expanded",he?"false":"true");const Ee=k.querySelector(".mp-it-hint");Ee&&(Ee.textContent=he?"点击展开":"点击收起"),ei(he)},jt=(a,$)=>{if(!h||!(Te(o)||o==="qimen"))return;const E={question:Te(o)?($===void 0?Xe:$).trim():"",direction:a===void 0?Je:a},R=Z.interpret?Z.interpret(h.r,E):null;let k=h.r;if((o==="liuyao"||o==="qimen")&&k&&k.trace&&Z.buildTrace)try{const re=o==="liuyao"?Z.buildTrace(k,{direction:E.direction,gender:k.useGod&&k.useGod.gender||"male",refresh:!0}):Z.buildTrace(k,{direction:E.direction});re&&(k=Object.assign({},k,{trace:re}))}catch{}ce(Object.assign({},h,{r:k,it:R}))},ui=a=>!a||!a.timed||!a.at?"":`<div class="mp-cast">起卦时刻：<b>${a.at.date} ${a.at.time}</b>　（来自你的本机时间，点「此刻」可重新取当下）</div>`,xi=()=>{try{const a=h&&h.r&&h.r.summary?h.r.summary:"";if(!a)return;navigator.clipboard.writeText(a).then(()=>oa("已复制"),()=>oa("复制失败"))}catch{oa("复制失败")}},qt=()=>{if(!(!h||!h.r||!qe.trim()))try{Ve(Z.followup?Z.followup(h.r,qe.trim()):null)}catch(a){Ve({question:qe.trim(),ok:!1,answer:"追问失败："+(a&&a.message?a.message:a),evidence:[],confidence:"弱"})}},fi=()=>{if(!(!h||!h.r))try{const a=Z.askPrompt?Z.askPrompt(h.r,{question:qe.trim(),interpret:h.it}):null,$=a&&a.text?a.text:String(h.r.summary||"");if(pt($)){De("已发到对话窗，往下看回复。");return}const E="（"+tt()+"）";navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText($).then(()=>De("对话输入框还没就绪"+E+"，已复制提问；粘进对话窗回车即可。"),()=>De("对话输入框还没就绪"+E+"，复制也没成功；先点「复制文字结果」再贴。")):De("对话输入框还没就绪"+E+"；先点「复制文字结果」再贴进对话窗。")}catch(a){De("发到对话窗失败："+(a&&a.message?a.message:a))}},bi=()=>{if(!(!h||!h.r))try{const a=Z.renderText?Z.renderText(h.r):h.r.summary||"",$=new Blob([a],{type:"text/markdown;charset=utf-8"}),E=document.createElement("a");E.href=URL.createObjectURL($),E.download=`命理报告-${h.r.system}.md`,document.body.appendChild(E),E.click(),E.remove(),setTimeout(()=>URL.revokeObjectURL(E.href),2e3)}catch(a){console.error("[metaphysics] 导出失败",a)}},hi=()=>{if(!(!h||!h.r))try{const a=K.summaryCardPNG?K.summaryCardPNG(h.r,h.it):"";if(!a){oa("当前环境不支持 Canvas 导出");return}const $=document.createElement("a");$.href=a,$.download=`命理摘要-${h.r.system}.png`,document.body.appendChild($),$.click(),$.remove()}catch(a){console.error("[metaphysics] 长图导出失败",a)}},Nt={fontSize:12,padding:"5px 12px"},vi=()=>{!h||!h.r||!h.r.past||Ge(Z.verifyFit?Z.verifyFit(h.r.past.rows,na):null)},yi=()=>{if(!(!h||h.kind!=="bazi"))try{const[a,$,E]=String(F).split("-").map(Number),[,R]=String(W).split(":").map(Number),k=Ae.filter(re=>Number(re.year)).map(re=>({year:Number(re.year),kind:re.kind}));sa(Z.rectifyBirth?Z.rectifyBirth({base:{year:a,month:$,day:E,minute:Number.isFinite(R)?R:0},gender:te,events:k,lateZi:ve,trueSolar:ke,address:t.trim()||void 0}):{error:"当前客户端未加载生时校正模块"})}catch(a){sa({error:a&&a.message?a.message:String(a)})}},Y=(a,$)=>s("label",{className:"mp-field"},s("span",{className:"mp-lbl"},a),$),$i=a=>{l(a.kind),a.date&&V(a.date),a.time&&ne(a.time),a.gender&&se(a.gender),O(a.address||""),be(a.lines||""),ct(a.question||""),mt(a.direction||"general"),dt(a.count||"3"),ut(a.mhMode||"time"),xt(a.upper||""),ft(a.lower||""),bt(a.changing||""),ja(!1),rt(a)},wi=()=>{He([]),Ka([])};aa(()=>{$e("ziwei")},[]),aa(()=>{if(!_a)return;const a=_a.kind;rt(null),$e(a)},[_a]),aa(()=>{const a=$=>{if($.key!=="Escape")return;const E=document.getElementById("mp-trace-layer");E&&E.classList.contains("open")&&zt()};return document.addEventListener("keydown",a),()=>document.removeEventListener("keydown",a)},[]);const Mt=(Wt||[]).filter(a=>a&&Pe.some($=>$.k===a.tab)).slice(0,Xa),ki=a=>(Pe.find($=>$.k===a)||{}).label||a,zi=({k:a,label:$,tip:E,wide:R})=>s("button",{key:a,type:"button",className:"mp-tool"+(R?" wide":"")+(o===a?" on":""),"data-tab":a,onClick:()=>Oa(a)},s("b",null,$),s("span",null,E)),ji=[s("section",{key:"start",className:"mp-start","aria-label":"选择要算的事"},s("div",{className:"mp-start-top"},s("div",{className:"mp-recent",hidden:Mt.length===0},s("span",{className:"mp-recent-lbl"},"最近用过"),s("span",{className:"mp-recent-list"},Mt.map(a=>s("button",{key:a.tab,type:"button",className:"mp-rc",onClick:()=>Oa(a.tab)},ki(a.tab),s("i",null,It(a.at)))))),s("div",{className:"mp-viewsw",role:"group","aria-label":"首屏视图"},s("button",{type:"button",className:Fe==="group"?"on":"","aria-pressed":Fe==="group"?"true":"false",onClick:()=>$t("group")},"分组"),s("button",{type:"button",className:Fe==="flat"?"on":"","aria-pressed":Fe==="flat"?"true":"false",onClick:()=>$t("flat")},"平铺"))),Fe==="group"?s("div",{className:"mp-groups"},Rt.map(a=>{const $=!!Xt[a.title],E=Math.max(0,a.items.length-4);return s("section",{key:a.title,className:"mp-tgroup"+($?" open":"")},s("div",{className:"mp-tgroup-head"},s("h2",null,a.title),s("p",null,a.hint)),s("div",{className:"mp-ttools"},a.items.map(zi),E>0?s("button",{key:"more",type:"button",className:"mp-tmore","aria-expanded":$?"true":"false",onClick:()=>Jt(R=>Object.assign({},R,{[a.title]:!$}))},$?"收起":`还有 ${E} 个`):null))})):null),s("div",{key:"tabs",className:"mp-tabs"+(Fe==="flat"?"":" hide"),role:"tablist","aria-label":"命理体系"},Pe.map(a=>s("button",{key:a.k,role:"tab","aria-selected":o===a.k?"true":"false",tabIndex:o===a.k?0:-1,className:"mp-tab"+(o===a.k?" on":""),onClick:()=>Oa(a.k)},a.label))),s("div",{key:"head",className:"mp-panel"},s("div",{className:"mp-row"},vt?Y(pa?"出生日期（公历）":ye==="date"?"日期（公历）":"起卦日期（公历）",s("input",{className:"mp-input",type:"date",value:F,onChange:a=>oi(a.target.value)})):null,yt?Y(pa?"出生时刻":"起卦时刻",s("input",{className:"mp-input",type:"time",value:W,onChange:a=>pi(a.target.value)})):null,pa?Y("性别",s("select",{className:"mp-input",value:te,onChange:a=>se(a.target.value)},s("option",{value:"female"},"女"),s("option",{value:"male"},"男"))):null,pa?Y("出生地（省/市即可）",s("input",{className:"mp-input",placeholder:"如 河北石家庄 / 成都",value:t,onChange:a=>O(a.target.value)})):null,o==="bazi"||o==="ziwei"?s("label",{className:"mp-field mp-checks"},s("input",{type:"checkbox",checked:fa,onChange:a=>ba(a.target.checked)}),s("span",{className:"mp-lbl"},"八字 × 紫微 交叉验证")):null,o==="hepan"?Y("对方出生日期",s("input",{className:"mp-input",type:"date",value:me,onChange:a=>oe(a.target.value)})):null,o==="hepan"?Y("对方出生时刻",s("input",{className:"mp-input",type:"time",value:ue,onChange:a=>Re(a.target.value)})):null,o==="hepan"?Y("对方性别",s("select",{className:"mp-input",value:Ie,onChange:a=>we(a.target.value)},s("option",{value:"female"},"女"),s("option",{value:"male"},"男"))):null,o==="hepan"?Y("合盘方式",s("div",{className:"mp-seg"},s("button",{className:xe==="bazi"?"on":"",onClick:()=>ma("bazi")},"八字"),s("button",{className:xe==="ziwei"?"on":"",onClick:()=>ma("ziwei")},"紫微"))):null,o==="hepan"?Y("对方出生地（可空）",s("input",{className:"mp-input",placeholder:"如 四川成都",value:le,onChange:a=>Q(a.target.value)})):null,o==="qimen"?s("fieldset",{key:"qmr",className:"mp-qmrule"},s("legend",{className:"mp-lbl"},"换局规则"),s("div",{className:"mp-qmopts",role:"radiogroup","aria-label":"奇门换局规则"},[["chaibu","拆补"],["chaoshen","超神接气"],["zhirun","置闰"]].map(([a,$])=>s("label",{key:a,className:"mp-qmopt"},s("input",{type:"radio",name:"qimen_rule",value:a,checked:ta===a,onChange:()=>Ke(a)}),s("span",null,$)))),s("div",{className:"mp-field"},s("span",{className:"mp-lbl"},"晚子时"),s("select",{className:"mp-input",value:ua,onChange:a=>xa(a.target.value)},s("option",{value:"same-day"},"23:00 后归当日"),s("option",{value:"next-day"},"23:00 后归次日"))),s("details",{className:"mp-qmhelp"},s("summary",null,"三种规则有什么区别？"),s("p",null,"决定符头与节气如何对齐、是否插入闰局；同一个时刻在不同规则下可能得到不同局数。默认「拆补」与工具层一致。"))):null,Te(o)||o==="qimen"?Y(o==="qimen"?"询问方向（定用神）":"询问方向",s("select",{className:"mp-input",value:Je,onChange:a=>{mt(a.target.value),jt(a.target.value)}},(Z.DIRECTIONS||[]).map(a=>s("option",{key:a.key,value:a.key},a.label)))):null,o==="tarot"?Y("张数",s("select",{className:"mp-input",value:Ea,onChange:a=>dt(a.target.value)},s("option",{value:"1"},"1 张 · 指引"),s("option",{value:"3"},"3 张 · 过去现在未来"),s("option",{value:"5"},"5 张 · 十字牌阵"))):null,o==="liuyao"?Y("六爻（可空）",s("input",{className:"mp-input",placeholder:"空则随机，如 9 7 8 8 7 6",value:j,onChange:a=>be(a.target.value)})):null,o==="meihua"?Y("起卦方式",s("div",{className:"mp-seg"},s("button",{className:_e==="time"?"on":"",onClick:()=>kt("time")},"时间"),s("button",{className:_e==="number"?"on":"",onClick:()=>kt("number")},"数字"))):null,o==="meihua"&&_e==="number"?Y("第一个数",s("input",{className:"mp-input",value:qa,placeholder:"如 17",onChange:a=>xt(a.target.value)})):null,o==="meihua"&&_e==="number"?Y("第二个数",s("input",{className:"mp-input",value:Na,placeholder:"如 29",onChange:a=>ft(a.target.value)})):null,o==="meihua"&&_e==="number"?Y("动爻（可空）",s("input",{className:"mp-input",value:Ma,placeholder:"1-6",onChange:a=>bt(a.target.value)})):null,o==="zeri"?Y("所办事项",s("select",{className:"mp-input",value:$a,onChange:a=>Fa(a.target.value)},[["常用",["嫁娶","搬家入宅","出行","开业","签订合同","祭祀"]],["婚嫁",["嫁娶","订婚","领证","提亲","收送聘金","满月酒"]],["生活",["搬家","入宅","旅行","访亲友","入学","求医","祭祀"]],["建造",["动土","装修","装修建造","安葬","试车买车"]],["工商",["开业","交易","投资","签订合同","签约","纳财","赴任"]]].map(([a,$])=>s("optgroup",{key:a,label:a},$.map(E=>s("option",{key:`${a}-${E}`,value:E},E)))))):null,o==="convert"?Y("转换方向",s("div",{className:"mp-seg"},s("button",{className:i==="solar2lunar"?"on":"",onClick:()=>u("solar2lunar")},"公历 → 农历"),s("button",{className:i==="lunar2solar"?"on":"",onClick:()=>u("lunar2solar")},"农历 → 公历"))):null,o==="convert"&&i==="lunar2solar"?Y("农历日期",s("input",{className:"mp-input",value:m,placeholder:"如 2026-9-17",onChange:a=>r(a.target.value)})):null,o==="convert"&&i==="lunar2solar"?s("label",{className:"mp-check"},s("input",{type:"checkbox",checked:b,onChange:a=>x(a.target.checked)})," 闰月"):null,o==="zeri"?Y("看多少天",s("input",{className:"mp-input",type:"number",min:1,max:60,value:e,onChange:a=>n(a.target.value)})):null,o==="zeri"?Y("当事人属相（可空）",s("select",{className:"mp-input",value:p,onChange:a=>g(a.target.value)},s("option",{value:""},"不排除"),["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"].map(a=>s("option",{key:a,value:a},a)))):null,o==="xiaoliuren"?Y("起课方式",s("div",{className:"mp-seg"},s("button",{className:f==="time"?"on":"",onClick:()=>S("time")},"时间"),s("button",{className:f==="number"?"on":"",onClick:()=>S("number")},"报数"))):null,o==="xiaoliuren"&&f==="number"?Y("第一个数",s("input",{className:"mp-input",type:"number",min:1,max:99,value:w,onChange:a=>z(a.target.value)})):null,o==="xiaoliuren"&&f==="number"?Y("第二个数",s("input",{className:"mp-input",type:"number",min:1,max:99,value:N,onChange:a=>M(a.target.value)})):null,o==="xiaoliuren"&&f==="number"?Y("第三个数",s("input",{className:"mp-input",type:"number",min:1,max:99,value:D,onChange:a=>P(a.target.value)})):null,o==="mbti"?s("div",{className:"mp-quiz-wrap"},s("div",{className:"mp-lbl"},"十六型人格问卷 · 4 题一页，按 1（完全不像）到 5（很像我）打分"),s(Et,{answers:d,page:A,onPick:(a,$)=>y(E=>{const R=E.slice();return R[a]=$,R}),onPage:a=>I($=>Math.max(0,Math.min($+a,Math.max(0,Math.ceil(ca().total/la)-1)))),onSubmit:wt,onClear:()=>{y(new Array(ca().total).fill(null)),I(0),ce(null)}})):null,o==="trend"?Y("算到几岁",s("input",{className:"mp-input",type:"number",min:10,max:100,value:L,onChange:a=>C(a.target.value)})):null,o==="fengshui"?Y("看什么",s("div",{className:"mp-seg"},s("button",{className:_==="natal"?"on":"",onClick:()=>ae("natal")},"命卦"),s("button",{className:_==="advise"?"on":"",onClick:()=>ae("advise")},"门主灶"),s("button",{className:_==="xuankong"?"on":"",onClick:()=>ae("xuankong")},"玄空"))):null,o==="fengshui"&&_!=="natal"?Y("坐山（24 山）",s("input",{className:"mp-input",value:ie,placeholder:"如 子 / 乾",onChange:a=>ze(a.target.value)})):null,o==="fengshui"&&_!=="natal"?Y("朝向（24 山）",s("input",{className:"mp-input",value:fe,placeholder:"如 午 / 巽",onChange:a=>Be(a.target.value)})):null,o==="fengshui"&&_==="xuankong"?Y("运（1–9）",s("input",{className:"mp-input",type:"number",min:1,max:9,value:X,onChange:a=>ee(a.target.value)})):null,o==="name"?Y("看什么",s("div",{className:"mp-seg"},s("button",{className:ge==="assess"?"on":"",onClick:()=>Me("assess")},"评名字"),s("button",{className:ge==="generate"?"on":"",onClick:()=>Me("generate")},"生成候选"))):null,o==="name"?Y("姓",s("input",{className:"mp-input",value:Se,placeholder:"如 李",onChange:a=>H(a.target.value)})):null,o==="name"&&ge==="assess"?Y("名字",s("input",{className:"mp-input",value:c,placeholder:"如 沐宸",onChange:a=>v(a.target.value)})):null,o==="name"&&ge==="generate"?Y("候选个数",s("input",{className:"mp-input",type:"number",min:1,max:20,value:G,onChange:a=>U(a.target.value)})):null),pa?s("div",{className:"mp-checks"},s("label",{title:"按出生地经度把钟表时间换算成真太阳时"},s("input",{type:"checkbox",checked:ke,onChange:a=>ia(a.target.checked)}),"真太阳时"),s("label",{title:"23:00–23:59 出生时：勾选=按次日日柱起时柱；不勾=仍用当日日柱"},s("input",{type:"checkbox",checked:ve,onChange:a=>ga(a.target.checked)}),"晚子时换日"),s("label",{title:"开启后会请求 OpenStreetMap，把区县/村落到更精确的坐标"},s("input",{type:"checkbox",checked:pe,onChange:a=>je(a.target.checked)}),"联网精确到区县")):null,Te(o)?s("div",{className:"mp-askblock"},s("span",{className:"mp-lbl"},"所问之事（必填）"),s("textarea",{className:"mp-textarea"+(ai?" invalid":""),rows:2,value:Xe,placeholder:"用一句话描述所问之事，例如：今年是否适合换工作？",onChange:a=>{ct(a.target.value),ja(!1)},onBlur:a=>jt(void 0,a.target.value)})):null,o==="mbti"?null:s("div",{key:"actions",className:"mp-actions"},s("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginRight:8},onClick:ri,title:"用固定示例盘看完整报告（不改动你已填的数据）"},"看示例"),s("button",{className:"mp-btn",onClick:wt,title:"时间仍为自动时，点它会取当下再起卦"},o==="tarot"?"抽牌":o==="bazi"||o==="ziwei"?"排盘":o==="hepan"?"合盘":o==="qimen"?"起局":La.indexOf(o)>=0?"看结果":"起卦"))),s("div",{key:"hint",className:"mp-hint"},ii.hint),Ue.length?s("div",{key:"hist",className:"mp-hist"},s("div",{className:"mp-hist-h"},s("span",null,"最近排过"),s("button",{className:"mp-hist-clear",onClick:wi},"清空")),s("div",{className:"mp-hist-list"},Ue.map((a,$)=>s("button",{key:$,className:"mp-hist-item",title:`${a.date} ${a.time}`,onClick:()=>$i(a)},s("b",null,(Pe.find(E=>E.k===a.kind)||{}).label||a.kind),s("span",null,a.label||"—"),s("i",null,`${a.date.slice(5)} ${a.time}`))))):null,ye==="cast"&&ht?s("div",{key:"auto",className:"mp-auto"},Pa.cast?`起卦时刻用的是你手动填的（${W}）；想跟随当下，把时间改回或清空即可。`:`起卦时刻已自动取本机时间（${W}），每次点起卦都会重新取当下；想固定时刻就在上面改。`):null,wa?s("div",{key:"err",className:"mp-err",role:"alert"},wa):null,lt?s("div",{key:"ntc",className:"mp-note",role:"status"},lt):null,Qt?s("div",{key:"load",className:"mp-note",role:"status"},"正在加载本页需要的引擎…"):null,!h&&!wa?s("div",{key:"empty",className:"mp-empty"},s("b",null,o==="ziwei"||o==="bazi"?"填好出生信息，点「排盘」":o==="tarot"?"写下想问的事，点「抽牌」":o==="mbti"?"按 1–5 给题目打分，答满 12 题就能看结果":La.indexOf(o)>=0?"填好参数，点「看结果」":"写下所问之事，点「起卦」"),o==="ziwei"||o==="bazi"?"出生日期、时刻与性别即可；出生地只影响真太阳时。":o==="mbti"?"4 题一页，答案只在本地参与计算，不会上传。":La.indexOf(o)>=0?"按上面的选项填好参数即可；全部在本机计算，不上传。":"起卦时刻已自动取当下，也可以手动改。"):null,h?s("div",{key:"card",className:"mp-card mp-flat",role:"region","aria-label":"排盘结果","aria-live":"polite",onClick:gi,dangerouslySetInnerHTML:{__html:ui(h)+K.shadowHTML(h.r.shadow,h.shadowDiff)+K.traceHTML(h.r.trace,h.r.system)+K.resultWithInterpret(h.kind==="ziwei"?K.ziweiHTML(h.r):h.kind==="bazi"?K.baziHTML(h.r)+(h.trend?K.trendHTML(h.trend):""):h.kind==="meihua"?K.meihuaHTML(h.r):h.kind==="daliuren"?K.daliurenHTML(h.r):h.kind==="qimen"?K.qimenHTML(h.r)+K.qimenFactsHTML(h.r):h.kind==="hepan"?h.r.chart==="ziwei"?K.ziweiHepanHTML(h.r):K.hepanHTML(h.r):h.kind==="tarot"?K.tarotHTML(h.r):h.kind==="liuyao"?K.liuyaoHTML(h.r):h.kind==="chenggu"?K.chengguHTML(h.r):h.kind==="almanac"?K.almanacHTML(h.r):h.kind==="trend"?K.trendHTML(h.r):h.kind==="name"?K.nameHTML(h.r):h.kind==="mbti"?K.mbtiHTML(h.r):h.kind==="fengshui"?K.fengshuiHTML(h.r):K.quickHTML(h.r),h.it,{folded:di()})+K.caliberHTML(h.caliber)}}):null,h?s("div",{key:"bar",className:"mp-bar"},s("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px"},onClick:xi},ti||"复制文字结果"),s("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:bi,title:"导出盘面 + 解析（含一页读懂、三张表）为 Markdown"},"导出 .md"),s("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:hi,title:"生成 PNG 摘要卡（一页读懂 + 首张表），适合直接分享"},"存为摘要长图")):null,h?s("div",{key:"ask",className:"mp-askbox",style:{flexWrap:"wrap"}},s("input",{className:"mp-input",value:qe,maxLength:120,placeholder:"追问：如 2027 年事业怎么样（回车提交）",onChange:a=>Ha(a.target.value),onKeyDown:a=>{a.key==="Enter"&&qt()}}),s("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px"},onClick:qt},"追问"),s("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:fi,title:"把这张盘的摘要和你的问题一起发进 DSH 对话窗，由对话里的模型接着答"},"问进对话"),J.ref?null:s("div",{key:"bridgediag",className:"mp-note",style:{marginTop:6,fontSize:11,flexBasis:"100%"}},tt()),ha?s("div",{key:"chatnote",className:"mp-note",style:{marginTop:6,fontSize:12,flexBasis:"100%"}},ha):null):null,va?s("div",{key:"fx",className:"mp-fx",dangerouslySetInnerHTML:{__html:K.followupHTML(va)}}):null,h&&h.kind==="bazi"&&h.r.past?s("div",{key:"verify",className:"mp-verify"},s("div",{className:"mp-verify-h"},"验前事 · 过去几年的信号（只读，不改盘）"),h.r.past.rows.map(a=>s("div",{key:a.year,className:"mp-verify-row"},s("span",{className:"mp-verify-txt"},`${a.year} ${a.ganzhi} · ${a.theme}`),s("span",{className:"mp-verify-btns"},["yes","no","unsure"].map($=>s("button",{key:$,className:"mp-chip"+(na[a.year]===$?" on":""),onClick:()=>ya(Object.assign({},na,{[a.year]:$}))},$==="yes"?"准":$==="no"?"不准":"不确定"))))),s("div",{className:"mp-verify-foot"},s("button",{className:"mp-btn ghost",style:Nt,onClick:vi},"算贴合度"),de?s("span",{className:"mp-verify-fit"},`命中 ${de.yes}/${de.answered}（${de.level}）：${de.advice}`):null)):null,h&&h.kind==="bazi"?s("div",{key:"rect",className:"mp-rect"},s("div",{className:"mp-verify-h"},"生时校正 · 用过去的事反推时辰"),Ae.map((a,$)=>s("div",{key:$,className:"mp-rect-row"},s("input",{className:"mp-input",type:"number",min:1900,max:2100,value:a.year,onChange:E=>We(Ae.map((R,k)=>k===$?Object.assign({},R,{year:E.target.value}):R))}),s("select",{className:"mp-input",value:a.kind,onChange:E=>We(Ae.map((R,k)=>k===$?Object.assign({},R,{kind:E.target.value}):R))},[["career","事业变动"],["wealth","财运"],["love","感情"],["move","搬迁/出行"],["health","健康"],["other","其他"]].map(([E,R])=>s("option",{key:E,value:E},R))))),s("button",{className:"mp-btn ghost",style:Nt,onClick:yi},"计算候选时辰"),Ne?Ne.error?s("div",{className:"mp-rect-err"},Ne.error):s("div",{className:"mp-rect-out"},s("div",{className:"mp-verify-fit"},Ne.note),Ne.candidates.slice(0,6).map(a=>s("div",{key:a.hour,className:"mp-rect-cand"+(a===Ne.best?" best":"")},`${a.label} · 时柱 ${a.hourGanzhi} · 日柱 ${a.dayGanzhi} · 命中 ${a.hits}/${a.total}`))):null):null,!h&&!wa?s("div",{key:"ph",className:"mp-dim",style:{marginTop:24,fontSize:12}},"选择体系后点「排盘」。所有计算在本机完成，不上传任何数据。"):null];return s("div",{className:"mp-wrap"},ji)}function Yt(o){try{if(typeof styles<"u"&&styles&&typeof styles.insert=="function")return styles.insert(o)}catch(l){console.error("[metaphysics] styles.insert 不可用，改用 DOM 注入",l)}try{const l=document.createElement("style");return l.setAttribute("data-plugin","@local/metaphysics"),l.textContent=o,document.head.appendChild(l),()=>l.remove()}catch(l){return console.error("[metaphysics] DOM 注入样式也失败",l),()=>{}}}function Kt(o){try{const O=Yt(_t+(K&&K.CSS?K.CSS:""));typeof o.effect=="function"&&typeof O=="function"&&o.effect(()=>O)}catch(O){console.error("[metaphysics] 样式注入失败",O)}let l=null;try{l=o&&o.slots||(o&&typeof o.get=="function"?o.get("slots"):null)}catch(O){console.error("[metaphysics] 取 slots 服务失败",O)}if(!l||typeof l.register!="function"){console.error("[metaphysics] slots 服务不可用，面板未注册");return}try{J.injectType=typeof l.inject;const O=typeof l.spec=="function"?l.spec("conversation.input.right"):null;J.spec=O?O.kind+"/"+O.scope:"未声明"}catch(O){J.spec="取声明失败",it(O)}const F=(O,me)=>{try{const oe=l.register(O,me);return J.regs+=1,oe}catch(oe){return it(oe),null}},V=(O,me)=>{try{typeof l.inject=="function"?l.inject(O,me):me()}catch(oe){console.error("[metaphysics] 等待槽位失败："+O,oe);try{me()}catch(ue){console.error("[metaphysics] 直接注册也失败："+O,ue)}}};V("sidebar.panellist",()=>F({name:"sidebar.panellist",id:"metaphysics",order:20,label:()=>"命理 v"+(window.__MP_VER||"")},Ot)),V("main",()=>F({name:"main",key:"metaphysics"},O=>s(Pt,null,s(Zt,O))));const W=(O,me)=>{const oe=()=>{try{l.inject(O,me)}catch(ue){console.error("[metaphysics] 槽位注册失败："+O,ue);try{me()}catch(Re){console.error("[metaphysics] 直接注册也失败："+O,Re)}}};try{typeof o.effect=="function"?o.effect(oe,"metaphysics: "+O):oe()}catch(ue){console.error("[metaphysics] effect 包裹失败："+O,ue),oe()}};W("conversation.input.right",()=>F({name:"conversation.input.right",id:"metaphysics-ask",order:40},st)),W("conversation.composer.dock",()=>F({name:"conversation.composer.dock",id:"metaphysics-dock",order:60},ot));let ne=0;const te=()=>{if(J.ref)return;ne+=1;const O="-"+ne;F({name:"conversation.input.right",id:"metaphysics-ask"+O,order:40},st),F({name:"conversation.composer.dock",id:"metaphysics-dock"+O,order:60},ot)};let se=20;const t=()=>{J.ref||se<=0||(se-=1,te(),setTimeout(t,700))};try{setTimeout(t,700)}catch{}try{document.addEventListener("pointerdown",()=>te(),{once:!0,capture:!0})}catch{}}return{inject:["slots"],apply(o){try{Kt(o)}catch(l){console.error("[metaphysics] apply 异常",l)}}}}});
