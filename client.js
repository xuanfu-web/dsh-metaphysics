window.__ModuleLoader__.load({id:"dsh-metaphysics",version:"0.59.0",factory(xa){const sa=(function(){try{return xa("react")}catch{return globalThis.React}})();if(!sa)return{inject:[],apply(){}};const o=sa.createElement,ot={bazi:"client.bazi.js",ziwei:"client.ziwei.js",hepan:"client.hepan.js",trend:"client.trend.js",name:"client.name.js",fengshui:"client.fengshui.js",liuyao:"client.liuyao.js",meihua:"client.liuyao.js",qimen:"client.qimen.js",daliuren:"client.daliuren.js",tarot:"client.tarot.js",almanac:"client.almanac.js",convert:"client.convert.js",zeri:"client.zeri.js",chenggu:"client.chenggu.js",xiaoliuren:"client.xiaoliuren.js",star:"client.star.js",numerology:"client.numerology.js",mbti:"client.mbti.js"},rt=[{key:"general",label:"综合",dim:null,focus:""},{key:"wealth",label:"财运",dim:"work",focus:"钱财进出的落点主要看「工作与职业选择」与「事业发展」这两条。"},{key:"career",label:"事业",dim:"career",focus:"事业发展这条与你的问题最直接。"},{key:"love",label:"感情",dim:"love",focus:"感情这条与你的问题最直接。"},{key:"health",label:"健康",dim:"health",focus:"健康这条与你的问题最直接；下面只作提醒，不作任何诊断。"},{key:"study",label:"学业",dim:"career",focus:"学业与考试更贴近「事业发展」这条，讲的是长期积累与阶段进展。"},{key:"travel",label:"出行",dim:"overall",focus:"出行与迁动更贴近「整体运势」这条，看的是当下这一段的大环境。"}];window.__MP_VER="0.59.0",window.__MPGroups=[{title:"问一件事",hint:"心里有一件具体的事，起一卦再决定",items:[{k:"liuyao",label:"六爻",tip:"摇六次，问一件事"},{k:"meihua",label:"梅花",tip:"见闻起卦，看当下"},{k:"tarot",label:"塔罗",tip:"抽牌，看关系与选择"},{k:"qimen",label:"奇门",tip:"看方位、时机与取舍"},{k:"daliuren",label:"六壬",tip:"占事，断来意与结果"},{k:"xiaoliuren",label:"小六壬",tip:"掐指一算，快速断"}]},{title:"看一个人",hint:"看自己或身边人的性情、格局与运程",items:[{k:"bazi",label:"八字",tip:"四柱看一生格局"},{k:"ziwei",label:"紫微",tip:"十二宫细看"},{k:"hepan",label:"合盘",tip:"两个人合不合"},{k:"mbti",label:"人格",tip:"16 型性格问卷"},{k:"chenggu",label:"称骨",tip:"按生辰称命重"},{k:"numerology",label:"数字",tip:"生日数字看性格"},{k:"trend",label:"人生K",tip:"一生高低走势",wide:!0}]},{title:"查日子",hint:"挑时间、换农历，顺带看看家里和名字",items:[{k:"almanac",label:"黄历",tip:"今天宜忌、时辰吉凶"},{k:"zeri",label:"择日",tip:"挑个办事的好日子"},{k:"convert",label:"农历",tip:"公历农历互转"},{k:"star",label:"星座",tip:"星座性格与今日运"},{k:"fengshui",label:"风水",tip:"房屋朝向与布置"},{k:"name",label:"起名",tip:"按八字选字"}]}];const B={};B.DIRECTIONS=rt,B.compute=()=>{throw new Error("命理引擎尚未加载")};const pt=Object.create(null);function ri(s){return ot[s]||ot.bazi||"client.bazi.js"}const lt=()=>typeof performance<"u"&&performance.now?performance.now():Date.now();async function pi(s){const p=ri(s);let A=pt[p];const J=!!A,Q=lt();if(!A){if(!xa||typeof xa.async!="function")throw new Error("当前宿主不支持客户端分块加载（require.async 缺失），请升级 DeepSeek Harness");const oe=await xa.async(`./${p}`);if(A=oe&&(oe.Engine||oe.default),!A||typeof A.compute!="function")throw new Error(`命理引擎分块 ${p} 未返回 Engine`);pt[p]=A}for(const oe of Object.keys(A))A[oe]!==void 0&&(B[oe]=A[oe]);return Array.isArray(B.DIRECTIONS)||(B.DIRECTIONS=rt),window.Engine=B,window.__MP_ENGINE_READY__=!0,window.__MP_LAST_LOAD={tab:s,chunk:p,cached:J,ms:Math.round((lt()-Q)*10)/10},B}window.__mpEnsureEngine=pi,window.Engine=B,(function(){const s={liuyao:!0,meihua:!0,daliuren:!0,tarot:!0},p=ee=>!!s[ee],A={general:"other",wealth:"business",career:"career",love:"love",health:"other",study:"career",travel:"action"},J=ee=>A[ee]||"other",Q="#ffffff",oe="#1c1a15";function ue(ee){const ae=String(ee??"").match(/rgba?\(([^)]+)\)/i);if(!ae)return null;const W=ae[1].split(/[,\s/]+/).filter(Boolean).map(Number);return W.length<3||W.slice(0,3).some(X=>!Number.isFinite(X))||W.length>3&&Number.isFinite(W[3])&&W[3]<.95?null:[W[0],W[1],W[2]]}function de(ee){const ae=String(ee||"").replace("#",""),W=ae.length===3?ae.split("").map(X=>X+X).join(""):ae;return/^[0-9a-f]{6}$/i.test(W)?[0,2,4].map(X=>parseInt(W.slice(X,X+2),16)):null}function a(ee){const ae=W=>{const X=W/255;return X<=.03928?X/12.92:Math.pow((X+.055)/1.055,2.4)};return .2126*ae(ee[0])+.7152*ae(ee[1])+.0722*ae(ee[2])}function P(ee,ae){const W=a(ee),X=a(ae),te=Math.max(W,X),fe=Math.min(W,X);return(te+.05)/(fe+.05)}function ce(ee){const ae=typeof ee=="string"?ue(ee):ee;return ae?P(ae,de(Q))>=P(ae,de(oe))?Q:oe:""}function pe(ee){const ae=String(ee??"").trim();if(!ae)return{lines:null,warning:""};const W=ae.split(/[^0-9]+/).filter(Boolean).map(Number),X=W.filter(te=>![6,7,8,9].includes(te));return W.length===6&&X.length===0?{lines:W,warning:""}:{lines:null,warning:W.length!==6?`爻值需要正好 6 个数字（当前 ${W.length} 个），本次按随机摇卦。`:`爻值只能是 6/7/8/9（收到 ${X.join("/")}），本次按随机摇卦。`}}function xe(ee){const ae=String(ee??"").trim();if(!ae)return null;const W=Number(ae);return Number.isFinite(W)?W:null}window.__MPCore={NEED_ASK:s,needAsk:p,parseLines:pe,toNumber:xe,parseRGB:ue,hexToRGB:de,luminance:a,contrastRatio:P,pickOnColor:ce,ON_DARK:Q,ON_LIGHT:oe,kindOfDirection:J}})(),(function(){const s=`
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
.pp-chip.neu{color:var(--muted);border-style:dashed}
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
.mp-hp-notes p{margin:2px 0}
/* 三方合盘：三对并列的小表。不合并总分，所以没有「三人合计」那一行 */
.mp-hp-triple{margin-top:12px;border-top:1px solid var(--line);padding-top:10px}
.mp-hp-triple table{width:100%;border-collapse:collapse;font-size:12px;line-height:1.7;margin-top:6px}
.mp-hp-triple th,.mp-hp-triple td{text-align:left;padding:4px 6px;border-bottom:1px dashed var(--line);white-space:nowrap}
.mp-hp-triple thead th{font-size:11px;color:var(--muted);font-weight:600}
.mp-hp-triple tbody th{font-weight:600;color:var(--ink)}
.mp-hp-triple tbody td{font-variant-numeric:tabular-nums;color:var(--ink2)}
.mp-hp-triple tbody td:first-of-type{font-weight:700;color:var(--red)}
.mp-hp-lv{margin-left:6px;font-size:11px;color:var(--muted);font-weight:400}
.mp-hp-triple p{margin:6px 0 0;font-size:11px;color:var(--muted);line-height:1.7}
.mp-hp-triple p b{color:var(--ink)}
.mp-dl-ss{margin-top:10px;display:flex;gap:10px;flex-wrap:wrap;align-items:baseline;font-size:12px}
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
/* 三层导读（数 / 象 / 辞）：默认收起，展开是一篇能独立读懂的小文；深色只换变量，不另写一套 */
.mp-guide{margin:10px 0 0;border:1px solid var(--line);border-radius:10px;background:var(--band);overflow:hidden}
.mp-guide>summary{cursor:pointer;padding:8px 11px;font-size:12.5px;color:var(--ink);list-style:none;display:flex;align-items:center;gap:8px}
.mp-guide>summary::-webkit-details-marker{display:none}
.mp-guide>summary::before{content:"▸";color:var(--red);font-size:11px;line-height:1;transition:transform .16s}
.mp-guide[open]>summary::before{transform:rotate(90deg)}
.mp-guide>summary:hover{background:var(--hover)}
.mp-guide-sub{margin-left:auto;color:var(--label);font-size:11.5px;letter-spacing:.08em}
.mp-guide-body{padding:2px 12px 12px;border-top:1px solid var(--hair)}
.mp-guide-lead{margin:9px 0;color:var(--ink2);font-size:12.5px}
.mp-guide-layers{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:8px}
.mp-guide-layers li{border-left:2px solid var(--line);padding-left:9px}
.mp-guide-layers b{font-size:13px;color:var(--ink)}
.mp-guide-layers b i{font-style:normal;margin-left:6px;font-size:11px;color:var(--label);letter-spacing:.1em}
.mp-guide-layers span{display:block;color:var(--ink2);font-size:12px;margin-top:2px}
.mp-guide-layers em{display:block;font-style:normal;color:var(--muted);font-size:11.5px;margin-top:3px}
.mp-guide-check,.mp-guide-parts{margin-top:11px;padding-top:9px;border-top:1px dashed var(--line)}
.mp-guide-check b,.mp-guide-parts b{font-size:12.5px;color:var(--ink)}
.mp-guide-check ol{margin:5px 0 0;padding-left:18px;color:var(--ink2);font-size:12px}
.mp-guide-check ol li{margin:2px 0}
.mp-guide-check p,.mp-guide-parts p{margin:5px 0 0;color:var(--muted);font-size:11.5px}
.mp-guide-parts ul{margin:5px 0 0;padding:0;list-style:none;font-size:12px;color:var(--ink2)}
.mp-guide-parts li{margin:3px 0}
.mp-guide-parts li span{display:inline-block;min-width:44px;color:var(--ink);font-weight:600}
.mp-guide-close{margin:11px 0 0;color:var(--ink2);font-size:12px}
/* 复制问事提示：只有问事体系渲染；命盘类不显示按钮本身 */
.mp-askcopy-row{display:flex;align-items:center;gap:8px;margin:8px 0 0;padding:0;flex-wrap:wrap}
.mp-askcopy{border:1px solid var(--red);background:transparent;color:var(--red);font:inherit;font-size:12px;padding:4px 11px;border-radius:999px;cursor:pointer;transition:background .14s,color .14s}
.mp-askcopy:hover{background:var(--red);color:var(--on-accent)}
.mp-askcopy-hint{color:var(--muted);font-size:11.5px}
/* 三柱盘提示：表下一行，别让人以为漏画了一列 */
.pp-warn{margin:8px 0 0;padding:7px 10px;border:1px solid color-mix(in srgb,var(--quan) 34%,var(--line));border-radius:8px;background:color-mix(in srgb,var(--quan) 10%,transparent);color:var(--ink2);font-size:11.5px;line-height:1.55}
/* 顶部人话总结：第一屏唯一的「先说结论」块，边框与留白都比盘面重一档 */
.mp-br{margin:0 0 12px;padding:14px 16px 12px;border:1px solid color-mix(in srgb,var(--red) 26%,var(--line));border-radius:12px;
  background:linear-gradient(180deg,color-mix(in srgb,var(--red) 6%,var(--card)),var(--card));color:var(--ink)}
.mp-br-h{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px}
.mp-br-h>b{font-size:13.5px;letter-spacing:.04em;color:var(--red)}
.mp-br-chips{display:flex;gap:5px;flex-wrap:wrap;margin-left:auto}
.mp-br-chips span{font-size:11px;padding:1px 7px;border-radius:999px;background:var(--band);border:1px solid var(--hair);color:var(--label)}
.mp-br-lead{margin:0 0 10px;font-size:13.5px;line-height:1.75;color:var(--ink)}
.mp-br-sec{margin:9px 0 0;padding-top:8px;border-top:1px dashed var(--hair)}
.mp-br-sec b{display:block;font-size:12.5px;color:var(--ink2);margin-bottom:3px}
.mp-br-sec p{margin:0;font-size:12.5px;line-height:1.75;color:var(--ink2)}
.mp-br-adv{margin:10px 0 0;padding-top:8px;border-top:1px dashed var(--hair)}
.mp-br-adv b{display:block;font-size:12.5px;color:var(--ink2);margin-bottom:4px}
.mp-br-adv ul{margin:0;padding-left:17px;font-size:12.5px;line-height:1.7;color:var(--ink2)}
.mp-br-adv li{margin:2px 0}
.mp-br-cav{margin:10px 0 0;padding:7px 9px;border-radius:8px;background:color-mix(in srgb,var(--quan) 12%,transparent);color:var(--ink2);font-size:11.5px;line-height:1.6}
.mp-br-foot{margin:8px 0 0;color:var(--muted);font-size:11px}
/* 能力边界：与名词解释同款轻量折叠，但每条要能读到「为什么不答」 */
.mp-it-limits{margin:0 16px 12px;font-size:12px;line-height:1.85;color:var(--muted);border-top:1px dashed var(--line);padding-top:8px}
.mp-it-limits summary{cursor:pointer;font-family:system-ui,sans-serif;letter-spacing:.06em;color:var(--label);margin-bottom:6px}
.mp-it-limits div{margin-bottom:7px}
.mp-it-limits b{display:block;color:var(--ink2);font-weight:600;margin-bottom:1px}
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
/* 效度声明：标签讲的是文本一致度，这句把边界钉在区块末尾（全报告只出现一次） */
.know-disc{margin-top:2px;padding-top:8px;border-top:1px dashed var(--line);font-size:11.5px;line-height:1.7;color:var(--muted)}
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
.mp-cview{width:100%;margin-top:7px;border-collapse:collapse;font-size:12px;line-height:1.6}
.mp-cview th,.mp-cview td{text-align:left;padding:3px 6px;border-bottom:1px dashed var(--line);vertical-align:top}
.mp-cview thead th{font-size:11px;font-weight:600;color:var(--label);letter-spacing:.04em;white-space:nowrap}
.mp-cview tbody th{font-weight:400;color:var(--muted);white-space:nowrap}
.mp-cview tbody td{color:var(--ink2);font-variant-numeric:tabular-nums}
.mp-cview tbody td:last-child{color:var(--ink);font-weight:700}
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
/* 排盘句柄：追问同一张盘时复制给助手；本体是编码，提示不要公开贴出 */
.mp-handle{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:12px 0 0;padding:8px 13px;border:1px dashed var(--line);border-radius:10px;background:var(--band);font-family:system-ui,sans-serif}
.mp-handle-title{font-size:12.5px;font-weight:700;letter-spacing:.06em;color:var(--ink2)}
.mp-handle-code{flex:1 1 220px;min-width:0;font:12px/1.5 ui-monospace,SFMono-Regular,Consolas,monospace;color:var(--muted);overflow-wrap:anywhere}
.mp-handle-copy{flex:0 0 auto;min-height:40px;padding:0 12px;border:1px solid var(--line);border-radius:8px;background:var(--card);color:var(--ink2);font:inherit;font-size:12px;cursor:pointer}
.mp-handle-copy:hover{border-color:var(--ke);color:var(--ke)}
.mp-handle-copy:focus-visible{outline:2px solid var(--ke);outline-offset:2px}
.mp-handle-hint{flex-basis:100%;font-size:11.5px;line-height:1.6;color:var(--muted)}
.mp-revise{margin:12px 0 0;padding:9px 13px;border:1px solid var(--line);border-radius:10px;background:var(--band);font-family:system-ui,sans-serif}
.mp-revise-head{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}
.mp-revise-title{font-size:12.5px;font-weight:700;letter-spacing:.06em;color:var(--ke)}
.mp-revise-text{font-size:12px;line-height:1.6;color:var(--muted);overflow-wrap:anywhere}
.mp-revise-list{list-style:none;margin:6px 0 0;padding:0;display:grid;gap:3px}
.mp-revise-list li{display:flex;gap:8px;font-size:12.5px;line-height:1.6}
.mp-revise-list .k{flex:0 0 5.5em;color:var(--muted)}
.mp-revise-list .old{color:var(--muted)}
.mp-revise-list .new{color:var(--ink2);font-weight:600}
.mp-revise-ignored{margin:6px 0 0;font-size:11.5px;line-height:1.6;color:var(--muted)}
@media (max-width:640px){
  .mp-revise{padding:8px 11px}
  .mp-revise-list .k{flex-basis:4.5em}
}
@media print{
  .mp-revise{break-inside:avoid}
}
@media (max-width:640px){
  .mp-handle{padding:8px 11px}
  .mp-handle-copy{margin-left:0;min-height:44px}
}
@media print{
  .mp-handle-copy{display:none}
  .mp-handle{break-inside:avoid}
}
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
.mp-trace-copy{margin-left:auto;flex:0 0 auto;min-height:44px;padding:0 12px;border:1px solid var(--line);border-radius:8px;background:var(--card);color:var(--ink2);font:inherit;font-size:12px;cursor:pointer}
.mp-trace-copy:hover{border-color:var(--ke);color:var(--ke)}
.mp-trace-copy:focus-visible{outline:2px solid var(--ke);outline-offset:2px}
.mp-trace-copy+.mp-trace-close{margin-left:0}
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
/* 择日候选比较：只在给了候选日时出表；窄屏横向滚动，不把理由挤成竖排 */
.mp-zr{margin:12px 16px;border:1px solid var(--line);border-radius:8px;background:var(--card);padding:12px 14px;font-family:system-ui,sans-serif}
.mp-zr-h{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;margin-bottom:8px}
.mp-zr-h b{font-size:14px;color:var(--red)}
.mp-zr-h span{font-size:12px;color:var(--muted)}
.mp-zr-lead{font-size:13px;color:var(--ink);margin-bottom:8px}
.mp-zr-lead b{color:var(--red)}
.mp-zr-t{width:100%;border-collapse:collapse;font-size:12px;line-height:1.7}
.mp-zr-t th,.mp-zr-t td{text-align:left;padding:5px 7px;border-bottom:1px dashed var(--line);vertical-align:top}
.mp-zr-t thead th{font-size:11px;color:var(--muted);font-weight:600;white-space:nowrap}
.mp-zr-t tbody th{font-weight:600;color:var(--ink);white-space:nowrap}
.mp-zr-t tbody th em,.mp-zr-t tbody td em{display:block;font-style:normal;font-size:11px;color:var(--muted);font-weight:400}
.mp-zr-t tbody td b{color:var(--ink2)}
.mp-zr-t tbody tr.top{background:color-mix(in srgb,var(--red) 7%,transparent)}
.mp-zr-t tbody tr.off{opacity:.72}
.mp-zr-best{display:inline-block;margin-left:6px;padding:0 5px;border-radius:3px;background:var(--red);color:var(--on-accent);font-size:10px;font-style:normal;line-height:16px;vertical-align:1px}
.mp-zr-score{font-variant-numeric:tabular-nums;font-weight:700;color:var(--ink)}
.mp-zr-v{display:inline-block;padding:0 6px;border-radius:3px;border:1px solid var(--line);font-size:11px;white-space:nowrap}
.mp-zr-v.good{color:var(--lu);border-color:var(--lu)}
.mp-zr-v.bad{color:var(--ji);border-color:var(--ji)}
.mp-zr-why{color:var(--ink2);min-width:180px}
.mp-zr-lists{display:flex;flex-wrap:wrap;gap:6px 14px;margin-top:9px;font-size:11.5px;color:var(--ink2)}
.mp-zr-lists em{font-style:normal;color:var(--muted);margin-right:4px}
.mp-zr-note{margin:6px 0 0;font-size:11px;color:var(--muted);line-height:1.7}
/* 首屏耗时：只回显本机实测，低调放在结果底部 */
.mp-perf{margin:10px 0 0;font-size:11px;line-height:1.7;color:var(--muted);font-family:system-ui,sans-serif;font-variant-numeric:tabular-nums}
@media (max-width:640px){.mp-zr{margin:10px;padding:10px;overflow-x:auto}.mp-zr-t{min-width:560px}}
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
`,p=window.__PP=window.__PP||{};p.CSS=s;const A={主星:"main",吉星:"good",煞星:"bad",辅星:"aux",杂曜:"aux"},J={禄:"lu",权:"quan",科:"ke",忌:"ji"},Q={庙:"good",旺:"good",得:"mid",利:"mid",平:"mid",不:"bad",陷:"bad"},oe={巳:[1,1],午:[1,2],未:[1,3],申:[1,4],辰:[2,1],酉:[2,4],卯:[3,1],戌:[3,4],寅:[4,1],丑:[4,2],子:[4,3],亥:[4,4]},ue={乾:[1,1,1],兑:[1,1,0],离:[1,0,1],震:[1,0,0],巽:[0,1,1],坎:[0,1,0],艮:[0,0,1],坤:[0,0,0]},de=["初爻","二爻","三爻","四爻","五爻","上爻"],a=e=>String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),P=(e,n,r)=>{const h=Math.round(43),b=e?`<rect x="0" y="${2.5}" width="104" height="7" rx="${1.6}" fill="currentColor"/>`:`<rect x="0" y="${2.5}" width="${h}" height="7" rx="${1.6}" fill="currentColor"/><rect x="${h+18}" y="${2.5}" width="${104-h-18}" height="7" rx="${1.6}" fill="currentColor"/>`;return`<svg class="mp-hex${n?" hex-on":""}${r?" "+r:""}" viewBox="0 0 104 12" preserveAspectRatio="none" aria-hidden="true" focusable="false">${b}</svg>`},ce={木:"M6 1.6V10.8M6 5.2 2.6 2.2M6 7.4 9.4 4.4",火:"M6 1.4C7.6 3.6 9.2 5.4 9.2 7.6A3.2 3.2 0 0 1 2.8 7.6C2.8 5.4 4.4 3.6 6 1.4Z",土:"M1.6 9.6h8.8M6 2.4v7.2M3.4 5.6h5.2",金:"M6 1.2 10.6 6 6 10.8 1.4 6Z",水:"M1.4 7.2C2.9 4.2 4.5 10.2 6 7.2 7.5 4.2 9.1 10.2 10.6 7.2"},pe=e=>{const n=ce[e];return n?`<svg class="mp-wxi" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="${n}" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`:""},xe=e=>`<svg class="mp-trig" viewBox="0 0 14 10" aria-hidden="true" focusable="false">${(ue[e]||[0,0,0]).slice().reverse().map((d,i)=>{const m=i*4;return d?`<rect x="0" y="${m}" width="14" height="2" rx="0.6" fill="currentColor"/>`:`<rect x="0" y="${m}" width="5.6" height="2" rx="0.6" fill="currentColor"/><rect x="8.4" y="${m}" width="5.6" height="2" rx="0.6" fill="currentColor"/>`}).join("")}</svg>`;p._hexBar=P,p._wxIcon=pe,p._triGlyph=xe;function ee(e,n){return!e||!e.length?"":e.map(r=>{const d=A[r.type]||"aux",i=r.mutagen?`<i class="pp-m ${J[r.mutagen]}">${r.mutagen}</i>`:"",m=n&&n[r.name],l=m?`<i class="pp-m view ${J[m]}">${m}</i>`:"",u=r.brightness?`<em class="pp-b ${Q[r.brightness]||"mid"}">${r.brightness}</em>`:"";return`<span class="pp-st ${d}">${r.name}${u}${i}${l}</span>`}).join("")}function ae(e){const n=[];for(let r=0;r<6;r++)n.push(e+r*12);return n.join(",")}const W=["命宫","兄弟","夫妻","子女","财帛","疾厄","迁移","交友","官禄","田宅","福德","父母"],X=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],te=e=>(e%12+12)%12,fe=(e,n)=>e!==n&&[te(n+4),te(n+8),te(n+6)].includes(e);function Ya(e,n,r,d,i){const m=oe[e.branch]||[1,1],l=X.indexOf(e.branch),u=["pp-cell"];l===n?u.push("pp-soul"):fe(l,n)&&u.push("pp-tri"),e.isBody&&u.push("pp-shen"),m[0]===4&&u.push("pp-lastrow"),m[1]===4&&u.push("pp-lastcol");const g=e.shensha||{},h=W[te(n-l)],b=e.selfHua&&e.selfHua.length?`<span class="pp-zh">${e.selfHua.map(k=>`<i class="pp-m self ${J[k.type]}" title="自化：宫干化回本宫">${k.type}</i>`).join("")}</span>`:"";let T="";if(l===n&&d){const k=z=>(A[z.type]||"")==="main";if(!(e.stars||[]).some(k)){const z=d.find(M=>X.indexOf(M.branch)===te(l+6)),N=z?(z.stars||[]).filter(k):[];N.length&&(T=`<div class="pp-borrow" title="命宫无主星，借对宫（迁移宫）主星">借 ${N.map(M=>M.name).join(" ")}</div>`)}}return`<div class="${u.join(" ")}" data-pi="${l}" data-view="${r}" role="button" tabindex="0" aria-expanded="false" style="grid-row:${m[0]};grid-column:${m[1]}">
      <div class="pp-stars">${ee(e.stars,i)}${b}</div>
      ${T}
      <div class="pp-ages">${ae(e.xiaoxian.age)}</div>
      <div class="pp-foot">
        <div class="ft-l">
          <span class="ft-dx">${g.boshi} ${e.daxian.start}-${e.daxian.end}</span>
          <span>${g.jiangqian}</span>
          <span>${g.suiqi}</span>
        </div>
        <div class="ft-r">
          <span>${g.changsheng}</span>
          <span>${e.ganzhi}</span>
          <span class="ft-pn">${h}</span>
        </div>
      </div>
    </div>`}function Je(e){try{const n=window.Engine||window.__PP&&window.__PP.Engine;if(!n||!n.buildBazi||!e.input)return"";const r=n.buildBazi({year:e.input.year,month:e.input.month,day:e.input.day,hour:e.input.hour,minute:e.input.minute,gender:e.input.gender,trueSolar:!1});return["year","month","day","hour"].map(d=>r.pillars[d].ganzhi).join(" ")}catch{return""}}p.ziweiHTML=function(e){const n=X.indexOf(e.soul.branch),r=e.liunian&&e.liunian[0]||null,d=r?r.age:1,i=e.palaces.find(H=>d>=H.daxian.start&&d<=H.daxian.end)||e.palaces[0],m=X.indexOf(i.branch),l=r?X.indexOf(r.lifePalace.branch):n,u=H=>{const f={};for(const O of H||[])O&&O.star&&(f[O.star]=O.type);return f},g=(e.daxianList||[]).find(H=>H.branch===i.branch)||null,h={da:u(g&&g.mutagenHits),ln:u(r&&r.mutagenHits)},b=(H,f)=>e.palaces.map(O=>Ya(O,H,f,e.palaces,h[f]||null)).join(""),T=(H,f)=>`<div class="pp-center">
        ${f==="da"?`<div class="ct-t1">大限 ${i.ganzhi}　${i.daxian.start}-${i.daxian.end}岁</div>`:f==="ln"&&r?`<div class="ct-t1">流年 ${r.ganzhi}　${r.age}岁</div>`:`<div class="ct-t1">${e.daxian.rule.slice(0,2)}　${e.bureau.name}</div>`}
        <div class="ct-t2">公历 ${e.input.year}-${String(e.input.month).padStart(2,"0")}-${String(e.input.day).padStart(2,"0")} ${String(e.input.hour).padStart(2,"0")}:${String(e.input.minute).padStart(2,"0")}</div>
        <div class="ct-t2">农历 ${e.lunar.year}年${e.lunar.isLeap?`闰${e.lunar.monthRaw||e.lunar.month}`:e.lunar.month}月${e.lunar.day}日${e.hourBranch}时${e.lunar.isLeap&&e.lunar.monthRaw&&e.lunar.month!==e.lunar.monthRaw?`（按${e.lunar.month}月起盘）`:""}</div>
        ${Je(e)?`<div class="ct-t3">${Je(e)}</div>`:""}
        <div class="ct-t4">命主 ${e.lifeMaster}　身主 ${e.bodyMaster}${e.bodyMasterNote?`<span class="pp-dim" title="${a(e.bodyMasterNote)}">＊</span>`:""}</div>
        <div class="ct-t4">命宫 ${e.soul.branch}　身宫 ${e.body.branch}　五行局 ${e.bureau.name}</div>
        <div class="ct-t4">子年斗君 ${e.doujun?e.doujun.zinian:"—"}　流年斗君 ${r&&r.doujun?r.doujun:"—"}</div>
        <div class="ct-t4">紫微 ${e.ziwei}　天府 ${e.tianfu}　${f==="da"?"大限命宫 "+X[m]:f==="ln"?"流年命宫 "+X[l]:"本命命宫 "+e.soul.branch}</div>
        ${f==="da"||f==="ln"?`<div class="ct-t4 pp-viewhua">${f==="da"?"大限":"流年"}四化　${(f==="da"?h.da:h.ln)&&Object.keys(f==="da"?h.da:h.ln).length?Object.entries(f==="da"?h.da:h.ln).map(([D,ie])=>`${D}化${ie}`).join("　"):'<span class="pp-dim">未飞四化</span>'}</div>`:""}
        <div class="pp-legend"><span class="pp-m lu">禄</span><span class="pp-m quan">权</span><span class="pp-m ke">科</span><span class="pp-m ji">忌</span><span>实心=生年四化　空心=大限/流年四化　虚下划线=自化　红框=命宫　浅底=三方四正</span></div>
      </div>`,k=(H,f,O)=>`<div class="pp-body ${H}" data-view="${O}" data-soul="${f}"><div class="pp-grid">${b(f,O)}${T(f,O)}</div><div class="pp-detail"></div></div>`,z=e.changqu,N=z?`<div class="pp-chips">
      <span class="pp-chip">昌 ${z.wenchang.branch}（${z.wenchang.palace}）</span>
      <span class="pp-chip">曲 ${z.wenqu.branch}（${z.wenqu.palace}）</span>
      <span class="pp-chip">${z.relation}</span>
      <span class="pp-chip">入命三方 ${z.inSoulSanfang?"是":"否"}</span>
      <span class="pp-chip ${z.absorb.label==="杂"?"warn":"ok"}">吸收·${z.absorb.label}</span>
    </div>`:"",M=(e.patterns||[]).length?`<div class="pp-chips">${e.patterns.map(H=>{const f=H.status==="broken"&&Array.isArray(H.breaks)&&H.breaks.length,O=`${H.evidence||""}${f?`；破格：${H.breaks.join("；")}`:""}`;return`<span class="pp-chip ${f?"broken":H.tone==="good"?"ok":H.tone==="bad"?"warn":""}" title="${a(O)}">${H.name}${f?"（破格）":""}</span>`}).join("")}</div>`:"",V=(e.daxianList||[]).length?`<div class="pp-chips">${e.daxianList.slice(0,8).map(H=>`<span class="pp-chip" title="${a(`${H.ganzhi} 宫干四化：`+H.mutagenHits.map(f=>`${f.star}化${f.type}→${f.palace||"未上盘"}`).join("、"))}">${H.branch} ${H.ages[0]}-${H.ages[1]}</span>`).join("")}</div>`:"",I=r&&r.mutagenHits&&r.mutagenHits.length?`<div class="pp-chips">${r.mutagenHits.map(H=>`<span class="pp-chip ${H.type==="忌"?"warn":H.type==="禄"?"ok":""}">${H.star}化${H.type}→${H.palace||"未上盘"}</span>`).join("")}</div>`:"",y=e.flyChains?(()=>{const H=["禄","权","科","忌"].map(f=>{const O=e.flyChains[f];if(!O||!O.steps.length)return"";const D=O.path.map(me=>String(me).replace(/宫$/,"")).join("→"),ie=O.steps.map(me=>`${me.from}（${me.fromStem}）化${f}${me.star}→${me.to}`).join("；");return`<span class="pp-chip ${f==="忌"?"warn":f==="禄"?"ok":""}" title="${a(ie)}">飞${f} ${a(D)}${O.closed?"↺":""}</span>`}).join("");return H?`<div class="pp-chips">${H}</div>`:""})():"",w=e.flyComposite&&Array.isArray(e.flyComposite.labels)&&e.flyComposite.labels.length?`<div class="pp-chips">${e.flyComposite.labels.map(H=>{const f=/忌/.test(H)?"warn":/自化/.test(H)?"":"ok",O=ne=>String(ne).replace(/^.*?会/,"").replace(/^禄忌同宫/,"").replace(/自化$/,""),D=(e.flyComposite.targets||[]).find(ne=>ne.palace===O(H)),ie=D?D.incoming.map(ne=>`${ne.from}化${ne.type}${ne.star}`).join("、"):e.flyComposite.note;return`<span class="pp-chip ${f}" title="${a(ie)}">三方四正 ${a(H)}</span>`}).join("")}</div>`:"",F=e.flow,U=F?(()=>{const H=ie=>(ie.mutagenHits||[]).length?ie.mutagenHits.map(ne=>`<i>${ne.star}化${ne.type}<em>→${ne.palace||"未上盘"}</em></i>`).join(""):'<i class="dim">宫干无四化</i>',f=(ie,ne,me)=>`<div class="flow-row"><b>${ie}</b><span class="flow-p"><span class="flow-k">${ne.ganzhi||"—"}　落${ne.palace||"未上盘"}（${ne.branch}）</span>${me?`<em class="flow-same">${me}</em>`:""}</span><span class="flow-m">${H(ne)}</span></div>`,D=F.day.branch===F.month.branch?"（日数走满一圈，故同宫）":"";return`<div class="pp-flow">
        <div class="flow-row"><b>基准</b><span class="flow-p">${F.asOf.solar}</span><span class="flow-m">农历 ${F.asOf.lunar}　流年 ${F.asOf.yearGanzhi}（斗君 ${F.year.doujun}）</span></div>
        ${f(`流月 ${F.month.index} 月`,F.month)}
        ${f(`流日 ${F.day.index} 日`,F.day,D)}
        ${f(`流时 ${X[F.hour.hourIndex]}时`,F.hour)}
      </div>`})():"";return p._zw=e,(e.brief?p.summaryHTML(e.brief):"")+`<div class="pp">
      <input type="radio" name="ppm" id="ppm-ben" class="pp-r" checked>
      <input type="radio" name="ppm" id="ppm-da" class="pp-r">
      <input type="radio" name="ppm" id="ppm-ln" class="pp-r">
      <div class="pp-modes">
        <label for="ppm-ben">本命</label><label for="ppm-da">大限</label><label for="ppm-ln">流年</label>
        <span class="pp-soon">点任一宫位看详情</span>
      </div>
      ${k("ben",n,"ben")}
      ${k("da",m,"da")}
      ${k("ln",l,"ln")}
    </div>${U}${N}${y}${w}${M}${V}${I}`};function Ge(e){return e.length?e.map(n=>{const r=A[n.type]||"aux",d=n.brightness?`<em class="dt-br ${Q[n.brightness]||"mid"}">${n.brightness}</em>`:"",i=n.mutagen?`<i class="pp-m ${J[n.mutagen]}">${n.mutagen}</i>`:"";return`<span class="dt-st ${r}">${n.name}${d}${i}</span>`}).join(""):'<span class="dt-empty">无</span>'}function Le(e,n){const r=p._zw;if(!r)return"";const d=y=>r.palaces.find(w=>X.indexOf(w.branch)===y),i=d(e)||r.palaces.find(y=>X.indexOf(y.branch)===e);if(!i)return"";const m=X.indexOf(i.branch),l=W[te(n-m)],u=i.shensha||{},g=i.stars.filter(y=>y.type==="主星"),h=i.stars.filter(y=>y.type==="吉星"||y.type==="辅星"),b=i.stars.filter(y=>y.type==="煞星"),T=i.stars.filter(y=>!["主星","吉星","辅星","煞星"].includes(y.type)),k=(i.selfHua||[]).length?i.selfHua.map(y=>`<i class="pp-m self ${J[y.type]}" title="自化：宫干化回本宫">${y.type}</i>`).join(""):'<span class="dt-empty">无</span>',z=[te(m+4),te(m+8),te(m+6)].map(y=>{const w=d(y),F=W[te(n-y)],U=w?w.stars.filter(f=>f.type==="主星").map(f=>f.name).join("、"):"",H=y===te(m+6)?"对宫":"三合";return`<span class="dt-st">${F}[${X[y]}]<b>${U||"无主星"}</b><em>${H}</em></span>`}).join(""),N=d(te(m+6)),M=N?N.stars.filter(y=>y.type==="主星"):[],V=g.length?Ge(g):`<span class="dt-empty">无主星</span><span class="dt-tri">　借对宫 <b>${M.length?M.map(y=>y.name).join("、"):"亦无主星"}</b></span>`,I=(y,w)=>`<div class="dt-dr"><span class="dt-k">${y}</span><div class="dt-v">${w}</div></div>`;return`<div class="dt-dh">
        <b>${l}</b><span>${i.branch}宫 · ${i.ganzhi}</span>
        <span>大限 ${i.daxian.start}-${i.daxian.end}</span>
        <span>小限起 ${i.xiaoxian.age} 岁</span>
        ${i.isBody?"<span>· 身宫</span>":""}
        <span class="dt-x" data-pp-close="1">收起</span>
      </div>
      ${I("主星",V)}
      ${I("吉辅",Ge(h))}
      ${b.length?I("煞星",Ge(b)):""}
      ${T.length?I("杂曜",Ge(T)):""}
      ${I("宫干四化",k)}
      ${I("十二神",`<span class="dt-tri">长生 ${u.changsheng||"—"}　博士 ${u.boshi||"—"}　将前 ${u.jiangqian||"—"}　岁前 ${u.suiqi||"—"}</span>`)}
      ${I("三方四正",`<span class="dt-tri">${z}</span>`)}
      <div class="hint">三方四正在盘上已同步标出（浅红描边）。再点一次本宫可收起。</div>`}function pa(e){e.querySelectorAll(".pp-cell.pp-sel,.pp-cell.pp-link").forEach(n=>{n.classList.remove("pp-sel"),n.classList.remove("pp-link")}),e.querySelectorAll('.pp-cell[aria-expanded="true"]').forEach(n=>n.setAttribute("aria-expanded","false"))}function Ze(){if(Ze.done||typeof document>"u"||!document.addEventListener)return;Ze.done=!0;const e=n=>{const r=n.closest(".pp-body");if(!r)return;const d=r.querySelector(".pp-detail");if(!d)return;if(n.classList.contains("pp-sel")){pa(r),d.classList.remove("open"),d.innerHTML="";return}pa(r);const i=Number(n.dataset.pi),m=Number(r.dataset.soul);r.querySelectorAll(".pp-cell").forEach(u=>{const g=Number(u.dataset.pi);(g===te(i+4)||g===te(i+8)||g===te(i+6))&&u.classList.add("pp-link")}),n.classList.add("pp-sel"),n.setAttribute("aria-expanded","true"),d.innerHTML=Le(i,m),d.classList.add("open")};document.addEventListener("click",n=>{const r=n.target;if(r&&r.closest&&r.closest("[data-pp-close]")){const i=r.closest(".pp-body");if(i){pa(i);const m=i.querySelector(".pp-detail");m&&(m.classList.remove("open"),m.innerHTML="");return}}const d=r&&r.closest?r.closest(".pp-cell[data-pi]"):null;d&&e(d)}),document.addEventListener("keydown",n=>{if(n.key!=="Enter"&&n.key!==" ")return;const r=n.target&&n.target.closest?n.target.closest(".pp-cell[data-pi]"):null;r&&(n.preventDefault(),e(r))})}p.bindZiwei=Ze,p._palaceDetailHTML=Le,Ze();function va(e,n){const r=n||{},d=e.slice().sort((i,m)=>m.position-i.position);return r.plain?d.map(i=>`<div class="mp-hy-row hy-plain">
        <span class="mp-hy-nm">${i.name||de[i.position-1]}</span>
        ${P(i.yinYang==="阳",i.moving)}
      </div>`).join(""):d.map(i=>{const m=i.yinYang==="阳",l=r.shiYing?i.position===r.shi?'<span class="mp-hy-sy">世</span>':i.position===r.ying?'<span class="mp-hy-sy">应</span>':"<span></span>":"<span></span>",u=i.moving?`<i class="mp-hy-mv" title="动爻">${m?"○":"×"}</i>`:'<i class="mp-hy-mv"></i>';return`<div class="mp-hy-row">
        ${l}
        <span class="mp-hy-nm">${i.name||de[i.position-1]}</span>
        <span class="mp-hy-ln">${P(m,i.moving)}${u}</span>
        <span class="mp-hy-gz">${a(i.ganzhi||"")}</span>
        <span class="mp-hy-lq">${a(i.liuqin||"")}</span>
        <span class="mp-hy-ls">${a(i.liushen||"")}</span>
      </div>`}).join("")}p.liuyaoHTML=function(e){const n=(y,w,F,U)=>`<div class="mp-hy-box">
      <div class="mp-hy-h"><b>${y}</b><span>${w}</span></div>
      <div class="mp-hy">${va(U,{shiYing:!0,shi:F.shi,ying:F.ying})}</div>
    </div>`,r=n(`本卦 ${e.ben.name}`,`${e.ben.palace} · ${e.ben.palaceElement}`,e.ben,e.ben.lines),d=e.bian?n(`变卦 ${e.bian.name}`,`${e.bian.palace} · ${e.bian.palaceElement}`,e.bian,e.bian.lines):`<div class="mp-hy-box"><div class="mp-hy-h"><b>六爻安静</b><span>无动爻，不取变卦</span></div>
          <div class="pp-dim" style="font-size:12px;line-height:1.9">断卦以本卦卦辞与世应生克为主。</div></div>`,i=e.body&&Array.isArray(e.body.labels)?e.body.labels:[],m=i.length?`<div class="pp-chips">${i.map(y=>`<span class="pp-chip ${/伏吟/.test(y)||/反吟/.test(y)||/化退神/.test(y)?"warn":/六冲|散/.test(y)?"":"ok"}">${a(y)}</span>`).join("")}</div>`:'<div class="pp-chips"><span class="pp-chip">卦体无六冲、六合、伏吟、反吟</span></div>',l=e.useGod&&e.useGod.liuqin?e.useGod:null,u=l?`<div class="pp-chips">${l.labels.map(y=>`<span class="pp-chip ${/空亡|退神|受克|泄气|不上卦/.test(y)?"warn":/持世|化进|六合|得飞神生/.test(y)?"ok":""}">${a(y)}</span>`).join("")}</div>`:'<div class="pp-chips"><span class="pp-chip">用神未取（未指明所问之事）</span></div>',g=e.useGodStrength&&Array.isArray(e.useGodStrength.labels)?e.useGodStrength:null,h=g&&g.labels.length?`<div class="pp-chips">${g.labels.map(y=>`<span class="pp-chip ${/死|囚|月破|受日辰克|泄|耗/.test(y)?"warn":/旺|相|得日辰生|比和/.test(y)?"ok":""}">${a(y)}</span>`).join("")}</div>`:"",b=e.fushenAccess&&Array.isArray(e.fushenAccess.labels)?e.fushenAccess:null,T=b&&b.labels.length?`<div class="pp-chips">${b.labels.map(y=>`<span class="pp-chip ${/可出/.test(y)?"ok":/受压难出|有助有压/.test(y)?"warn":""}">伏神${a(y)}</span>`).join("")}</div>`:"",k=e.yingqi&&Array.isArray(e.yingqi.labels)?e.yingqi:null,z=k&&k.labels.length?`<div class="pp-chips">${k.labels.map(y=>`<span class="pp-chip ${/应期偏速/.test(y)?"ok":/应期待解/.test(y)?"warn":""}" title="只列地支，不出日期">${a(y)}</span>`).join("")}</div>`:"",N=e.jinTuiPower&&Array.isArray(e.jinTuiPower.labels)?e.jinTuiPower:null,M=N&&N.labels.length?`<div class="pp-chips">${N.labels.map(y=>`<span class="pp-chip ${/后劲足|退得缓/.test(y)?"ok":/有限|进得虚|退得实|月破|未定/.test(y)?"warn":""}">${a(y)}</span>`).join("")}</div>`:"",V=e.hexStrength&&Array.isArray(e.hexStrength.labels)?e.hexStrength:null,I=V&&V.labels.length?`<div class="pp-chips">${V.labels.map(y=>`<span class="pp-chip ${/死|囚|月破|冲空/.test(y)?"warn":/旺|相/.test(y)?"ok":""}">${a(y)}</span>`).join("")}</div>`:"";return`<div class="pp" style="padding:14px">
      <div class="mp-mh-head">起卦 ${e.cast.notation.join("、")}（自下而上）　日辰 ${e.dayGanZhi.name}</div>
      <div class="mp-hy-wrap">${r}${d}</div>
      ${m}
      ${u}
      ${h}
      ${T}
      ${z}
      ${M}
      ${I}
    </div>`},p.meihuaHTML=function(e){const n=(z,N,M,V,I)=>{const w=[...ue[V]||[0,0,0],...ue[M]||[0,0,0]].slice().reverse().map(F=>P(!!F,!1,"sm")).join("");return`<div class="mp-hexbox hb-mini">
        <div class="hb-h">${z}</div>
        <div class="hb-n">${N}</div>
        <div class="mp-mh-mini">${w}</div>
        <div class="hb-s">${I||`上${M} 下${V}`}</div>
      </div>`},r=e.lines.slice().sort((z,N)=>N.position-z.position),d=r.slice(0,3),i=r.slice(3),m=e.moving>=4,l=(z,N,M,V)=>`<div class="mp-trib">
      <div class="mp-trib-h">${z} ${xe(N)}${N}${wa(N)}<span class="mp-tritag ${V?"tritag-ti":"tritag-yong"}">${V?"体":"用"}</span></div>
      <div class="mp-hy" style="gap:5px">${va(M,{plain:!0})}</div>
    </div>`,u=`<div class="mp-hexbox">
      <div class="hb-h"><span>本卦</span><span>动 ${e.movingName}</span></div>
      <div class="hb-n">${e.ben.name}</div>
      ${l("上卦",e.ben.upper,d,!m)}
      ${l("下卦",e.ben.lower,i,m)}
      <div class="hb-s">${e.source}</div>
    </div>`,g=e.bodyUse.level,h=g.includes("凶")?"bad":g.includes("吉")?"good":"flat",b=`<div class="mp-mh-rel">
      <div><b>体</b>${e.bodyUse.body.trigram}（${e.bodyUse.body.element}）　<b>用</b>${e.bodyUse.use.trigram}（${e.bodyUse.use.element}）</div>
      <div><span class="mh-lv ${h}">${g}</span>　${e.bodyUse.relation}</div>
    </div>`,T=ka(e.cuo.name)||["",""],k=ka(e.zong.name)||["",""];return`<div class="pp mp-mh">
      <div class="mp-mh-main">
        ${u}
        ${n("互卦",e.hu.name,e.hu.upper,e.hu.lower,"中藏之象")}
        ${n("变卦",e.bian.name,e.bian.upper,e.bian.lower,`动 ${e.movingName} 后`)}
        ${n("错卦",e.cuo.name,T[0],T[1],"六爻全变")}
        ${n("综卦",e.zong.name,k[0],k[1],"整卦倒转")}
      </div>
      ${b}
    </div>`};const ya={乾为天:["乾","乾"],天风姤:["乾","巽"],天山遁:["乾","艮"],天地否:["乾","坤"],风地观:["巽","坤"],山地剥:["艮","坤"],火地晋:["离","坤"],火天大有:["离","乾"],坎为水:["坎","坎"],水泽节:["坎","兑"],水雷屯:["坎","震"],水火既济:["坎","离"],泽火革:["兑","离"],雷火丰:["震","离"],地火明夷:["坤","离"],地水师:["坤","坎"],艮为山:["艮","艮"],山火贲:["艮","离"],山天大畜:["艮","乾"],山泽损:["艮","兑"],火泽睽:["离","兑"],天泽履:["乾","兑"],风泽中孚:["巽","兑"],风山渐:["巽","艮"],震为雷:["震","震"],雷地豫:["震","坤"],雷水解:["震","坎"],雷风恒:["震","巽"],地风升:["坤","巽"],水风井:["坎","巽"],泽风大过:["兑","巽"],泽雷随:["兑","震"],巽为风:["巽","巽"],风天小畜:["巽","乾"],风火家人:["巽","离"],风雷益:["巽","震"],天雷无妄:["乾","震"],火雷噬嗑:["离","震"],山雷颐:["艮","震"],山风蛊:["艮","巽"],离为火:["离","离"],火山旅:["离","艮"],火风鼎:["离","巽"],火水未济:["离","坎"],山水蒙:["艮","坎"],风水涣:["巽","坎"],天水讼:["乾","坎"],天火同人:["乾","离"],坤为地:["坤","坤"],地雷复:["坤","震"],地泽临:["坤","兑"],地天泰:["坤","乾"],雷天大壮:["震","乾"],泽天夬:["兑","乾"],水天需:["坎","乾"],水地比:["坎","坤"],兑为泽:["兑","兑"],泽水困:["兑","坎"],泽地萃:["兑","坤"],泽山咸:["兑","艮"],水山蹇:["坎","艮"],地山谦:["坤","艮"],雷山小过:["震","艮"],雷泽归妹:["震","兑"]},$a={乾:"金",兑:"金",离:"火",震:"木",巽:"木",坎:"水",艮:"土",坤:"土"},wa=e=>$a[e]?` ${$a[e]}`:"",ka=e=>ya[e]||null;p.daliurenHTML=function(e){const n=e.sanChuan,r=(u,g)=>`<div class="mp-dl-sc-c">
      <div class="mp-dl-sc-k">${g}</div>
      <div class="mp-dl-sc-z">${u.zhi}</div>
      <div class="mp-dl-sc-j">${u.jiangFull||u.jiang}</div>
      <div class="mp-dl-sc-l">${u.liuQin}${u.xunKong?" · 空":""}</div>
    </div>`,d=`<div class="mp-dl-sc-c ge">
      <div class="mp-dl-sc-k">格局</div>
      <div class="mp-dl-sc-gn">${e.geJu.name}</div>
      <div class="mp-dl-sc-l">${e.geJu.detail}</div>
    </div>`,i=e.siKe.slice().map(u=>`<div class="mp-dl-sk-c">
      <div class="mp-dl-sk-k">${["一课","二课","三课","四课"][u.position-1]||u.position+"课"}</div>
      <div class="mp-dl-sk-s">${u.shang}</div>
      <div class="mp-dl-sk-x">${u.xia}</div>
      <div class="mp-dl-sk-r">${u.relation} · ${u.jiangFull||u.jiang}</div>
    </div>`).join(""),m=e.pan.map(u=>{const g=oe[u.di]||[1,1];return`<div class="mp-dl-pc" style="grid-row:${g[0]};grid-column:${g[1]}">
        <div class="tz">${u.tian}</div>
        <div class="dz">地盘 ${u.di}</div>
        <div class="jz">${u.jiangFull}</div>
      </div>`}).join(""),l=`<div class="mp-dl-c">
      <div class="dl-t1">${e.dayGanZhi}日　${e.hourZhi}时</div>
      <div class="dl-t2">${e.dayNight}贵 · 月将 ${e.yueJiang.name}${e.yueJiang.zhi} · 贵人${e.guiren.reverse?"逆":"顺"}行</div>
      <div class="dl-t3">${n.chu.zhi} → ${n.zhong.zhi} → ${n.mo.zhi}</div>
      <div class="dl-t2">节气 ${e.jieqi.name}${e.jieqi.time?" "+e.jieqi.time:""}</div>
    </div>`;return`<div class="pp mp-dl">
      <div class="mp-dl-head">日 ${e.dayGanZhi}　时 ${e.hourZhi}（${e.dayNight}贵）　月将 ${e.yueJiang.name}${e.yueJiang.zhi}　节气 ${e.jieqi.name}　贵人${e.guiren.reverse?"逆":"顺"}行</div>
      <div class="mp-dl-sc">${r(n.chu,"初传")}${r(n.zhong,"中传")}${r(n.mo,"末传")}${d}</div>
      <div class="mp-dl-sk">${i}</div>
      <div class="mp-dl-pan2">${m}${l}</div>
      ${(e.shensha||[]).length?`<div class="mp-dl-ss"><b>神煞</b>${e.shensha.map(u=>`<span title="${a(u.note||"")}">${u.name}<i>${u.branch}</i></span>`).join("")}</div>`:""}
      <div class="mp-dl-legend"><span>大字＝天盘支</span><span>小字＝地盘（固定十二支）</span><span>右下＝天将</span></div>
    </div>`},p.tarotHTML=function(e){const n=e.cards.map(i=>`
      <div class="mp-tt-card ${i.upright?"tt-up":"tt-rev"}">
        <div class="mp-tt-pos" title="${a(i.positionHint||"")}">${i.position}</div>
        <div class="mp-tt-name">${i.name}${i.number?`<span class="mp-tt-no">${i.number}</span>`:""}</div>
        <div class="mp-tt-ori">${i.orientation}</div>
        ${i.core?`<div class="mp-tt-core">${i.core}</div>`:""}
        <div class="mp-tt-kw">${i.keywords.map(m=>`<span>${m}</span>`).join("")}</div>
        <div class="mp-tt-el">${i.arcana} · ${i.element}${i.suit?" · "+i.suit+(i.rankCn?i.rankCn:""):""}${i.domain?" · "+i.domain:""}</div>
      </div>`).join(""),r=e.question?a(e.question):'<span class="pp-dim">（未填写，可在上方输入后重抽）</span>',d=(e.reading||[]).map(i=>`<p>${a(i)}</p>`).join("");return`<div class="pp mp-tt">
      <div class="mp-tt-q"><b>所问</b>${r}</div>
      <div class="mp-tt-head">${e.spread}${e.castAt?`　·　抽牌于 ${e.castAt}`:""}</div>
      <div class="mp-tt-grid">${n}</div>
      <div class="mp-tt-read"><div class="mp-tt-rt">牌面解读</div>${d}</div>
      <div class="mp-tt-note"><div class="mp-tt-rt">你的记录</div>
        <textarea class="mp-tt-ta" rows="4" placeholder="写下判断或对照后的想法……（仅本页可见，不保存）"></textarea>
      </div>
      ${e.systemNote?`<div class="mp-tt-tip">${e.systemNote}</div>`:""}
      <div class="mp-tt-tip">塔罗用于自我觉察与娱乐，不作确定性预言。</div>
    </div>`};const la=e=>{if(!e||!Array.isArray(e.pairs)||!e.pairs.length)return"";const r='<tr><th scope="col">一对</th><th scope="col">契合度</th>'+(e.pairs[0].dimensions||[]).map(l=>`<th scope="col">${a(l.label)}</th>`).join("")+"</tr>",d=e.pairs.map(l=>`<tr><th scope="row">${a(l.a)} × ${a(l.b)}</th><td>${l.total==null?"—":`${a(l.total)}/100`}<span class="mp-hp-lv">${a(l.level||"")}</span></td>`+(l.dimensions||[]).map(u=>`<td>${u.score>=0?"+":""}${a(u.score)}</td>`).join("")+"</tr>").join(""),i=e.spread>=3&&e.best?`最顺：<b>${a(e.best.a)} × ${a(e.best.b)}</b>（${a(e.best.total)}/100）`+(e.hardest?`；最需磨合：<b>${a(e.hardest.a)} × ${a(e.hardest.b)}</b>（${a(e.hardest.total)}/100）`:""):`三对分数接近（相差 ${a(e.spread)} 分），不排名`,m=e.focus&&e.focus.spread>=3?`<p>差异最大的一维：<b>${a(e.focus.label)}</b>（三对相差 ${a(e.focus.spread)} 分）</p>`:"";return`<div class="mp-hp-triple">
      <div class="mp-hp-ith">三方合盘 · 三对并列</div>
      <table><thead>${r}</thead><tbody>${d}</tbody></table>
      <p>${i}</p>${m}
      <p>${a(e.note||"")}</p>
    </div>`};p.hepanHTML=function(e){const n=(d,i)=>`<div class="mp-hp-side">
      <div class="mp-hp-who">${i}</div>
      <div class="mp-hp-gz">${d.pillars.join(" ")}</div>
      <div class="mp-hp-kv"><span>日主</span><b>${d.dayMaster}</b></div>
      <div class="mp-hp-kv"><span>日支</span><b>${d.dayBranch}</b></div>
      <div class="mp-hp-kv"><span>强弱</span><b>${d.strength||"—"}</b></div>
      <div class="mp-hp-kv"><span>喜用</span><b>${d.favor||"—"}</b></div>
    </div>`,r=e.dimensions.map(d=>`<div class="mp-hp-dim">
      <div class="mp-hp-dimh"><span>${d.label}</span><b class="${d.score>=10?"good":d.score<0?"bad":""}">${d.score>=0?"+":""}${d.score}</b></div>
      <div class="mp-hp-dimt">${d.text}</div>
    </div>`).join("");return`<div class="pp mp-hp">
      <div class="mp-hp-head"><b>${e.score.level}</b><span>${e.score.total}/100</span></div>
      <div class="mp-hp-sides">${n(e.a,"你")}${n(e.b,"对方")}</div>
      <div class="mp-hp-dims">${r}</div>
      ${la(e.triple)}
      <div class="mp-hp-notes">${e.notes.map(d=>`<p>${d}</p>`).join("")}</div>
    </div>`},p.qimenFactsHTML=function(e){if(!e||!e.palaces)return"";const n=(i,m)=>`<div class="relation__row"><dt>${a(i)}</dt><dd>${a(m)}</dd></div>`,r=i=>i&&["旺","相","休","囚","死"].filter(l=>Array.isArray(i[l])&&i[l].length).map(l=>`${l} ${i[l].join("、")}`).join("；")||"—";return`<dl class="relation mp-qm-facts" aria-label="奇门盘面事实">${[["局数",`${e.ju}${e.yuan?`（${e.yuan}）`:""}`],["节气",`${e.jieqi||"—"}${e.jieqiTime?`（${e.jieqiTime}）`:""}`],["四柱",`${e.siZhu?`${e.siZhu.year} ${e.siZhu.month} ${e.siZhu.day} ${e.siZhu.time}`:"—"}`],["值符",e.zhiFu?`${e.zhiFu.star} · ${e.zhiFu.gong}宫`:"—"],["值使",e.zhiShi?`${e.zhiShi.gate} · ${e.zhiShi.gong}宫`:"—"],["旬首",e.xunshou||"—"],["空亡",(e.kongWang||[]).join("")||"—"],["驿马",e.ma&&e.ma.zhi?`${e.ma.zhi}${e.ma.gong?`（${e.ma.gong}宫）`:""}`:"—"],["换局规则",e.juMethodNote||e.juMethod||"—"],["晚子时",e.lateZiHourMode==="next-day"?"23:00 后归次日":"23:00 后仍归当日"],["击刑",e.conditions&&e.conditions.jiXing&&e.conditions.jiXing.length?e.conditions.jiXing.map(i=>`${i.palace}宫${i.stem}`).join("、"):"本盘无"],["三奇入墓",e.conditions&&e.conditions.ruMu&&e.conditions.ruMu.length?e.conditions.ruMu.map(i=>`${i.palace}宫${i.stem}`).join("、"):"本盘无"],["六仪入墓",e.conditions&&e.conditions.liuYiRuMu&&e.conditions.liuYiRuMu.length?e.conditions.liuYiRuMu.map(i=>`${i.palace}宫${i.stem}`).join("、"):"本盘无"],["十干克应",[...e.palaces||[],e.centerPalace].filter(m=>m&&m.ganYing).map(m=>`${m.palace}宫 ${m.ganYing.tian}加${m.ganYing.di}「${m.ganYing.name}」`).join("；")||"—"],["月令",e.month&&e.month.branch?`${e.month.branch}（${e.month.element}）`:"—"],["门旺衰",r(e.states&&e.states.gate)],["星旺衰",r(e.states&&e.states.star)],["干旺衰",r(e.states&&e.states.stem)],["干宫生克",(()=>{const i=["干克宫","宫克干","干生宫","宫生干","比和"],m={};for(const l of e.palaces||[]){const u=l.stemRelation||null;!u||u.type==="unknown"||!l.tianPan||(m[u.type]=m[u.type]||[]).push(l.tianPan)}return i.filter(l=>m[l]).map(l=>l+" "+m[l].join("、")).join("；")||"—"})()]].map(([i,m])=>n(i,m)).join("")}</dl>`};const Ka=[["4","9","2"],["3","5","7"],["8","1","6"]];p.qimenHTML=function(e){const n={};for(const d of e.palaces)n[d.palace]=d;const r=d=>{if(d==="5")return`<div class="pp-qm-cell center">
          <div class="pp-qm-ju">${e.ju}</div>
          <div class="pp-qm-kv">${e.siZhu.year} ${e.siZhu.month}</div>
          <div class="pp-qm-kv">${e.siZhu.day} ${e.siZhu.time}</div>
          <div class="pp-qm-kv dim">${e.jieqi} ${e.yuan}</div>
        </div>`;const i=n[d]||{};return`<div class="pp-qm-cell">
        <div class="pp-qm-top"><span class="god">${i.god||""}</span><span class="mk">${i.kong?"空":""}${i.ma?"马":""}</span></div>
        <div class="pp-qm-mid"><span class="tp">${i.tianPan||""}</span><span class="star">${i.star||""}</span></div>
        <div class="pp-qm-mid"><span class="dp">${i.diPan||""}</span><span class="gate">${i.gate||""}</span></div>
        <div class="pp-qm-bot"><span>${i.anGan||""}</span><span class="no">${d}</span></div>
        <div class="pp-qm-bot"><span class="dim">${i.stemRelation&&i.stemRelation.type!=="unknown"?i.stemRelation.type:""}</span><span class="dim">${i.stemState||""}</span></div>
        <div class="pp-qm-bot"><span class="dim">${i.ganYing?a(`${i.ganYing.tian}加${i.ganYing.di} ${i.ganYing.name}`):""}</span></div>
      </div>`};return`<div class="pp mp-qm">
      <div class="mp-qm-head">
        <b>${e.ju}</b>
        <span>${e.siZhu.year} ${e.siZhu.month} ${e.siZhu.day} ${e.siZhu.time}</span>
        <span>节气 ${e.jieqi}（${e.jieqiTime}）</span>
        <span>值符 ${e.zhiFu.star}（${e.zhiFu.gong}宫）　值使 ${e.zhiShi.gate}（${e.zhiShi.gong}宫）</span>
        <span>旬首 ${e.xunshou}　空亡 ${e.kongWang.join("")||"—"}　驿马 ${e.ma.zhi||"—"}</span>
      </div>
      <div class="mp-qm-grid">${Ka.map(d=>d.map(r).join("")).join("")}</div>
      <div class="mp-qm-legend">上＝九星　中＝天盘干／八门　下＝地盘干／宫号　角落＝八神</div>
      <div class="mp-qm-rules">${e.rules.map(d=>`<p>${d}</p>`).join("")}</div>
    </div>`},p.ziweiHepanHTML=function(e){const n=(i,m)=>`<div class="mp-hp-side">
      <div class="mp-hp-who">${m}</div>
      <div class="mp-hp-gz">命宫 ${i.soul.branch}　夫妻 ${i.soul.branch,""}${i.spouseStars.length,""}</div>
      <div class="mp-hp-kv"><span>命宫主星</span><b>${i.soulStars.join("、")||"无正曜"}</b></div>
      <div class="mp-hp-kv"><span>夫妻宫主星</span><b>${i.spouseStars.join("、")||"无正曜"}</b></div>
      <div class="mp-hp-kv"><span>五行局</span><b>${i.bureau}</b></div>
      <div class="mp-hp-kv"><span>身宫</span><b>${i.body.branch}（${i.body.lands||"—"}）</b></div>
      <div class="mp-hp-kv"><span>生年四化</span><b>${i.natalSihua.join("、")}</b></div>
    </div>`,r=e.dimensions.map(i=>`<div class="mp-hp-dim">
      <div class="mp-hp-dimh"><span>${i.label}</span><b class="${i.score>=10?"good":i.score<0?"bad":""}">${i.score>=0?"+":""}${i.score}</b></div>
      <div class="mp-hp-dimt">${i.text}</div>
    </div>`).join(""),d=i=>(e.interactions||[]).filter(m=>m.who===i).map(m=>`<li><b class="m-${m.mutagen}">${m.mutagen}</b>${m.star}：本命${m.ownPalace} → 对方${m.landingPalace||"盘外"}${m.strong?"<i>（强）</i>":""}</li>`).join("");return`<div class="pp mp-hp">
      <div class="mp-hp-head"><b>${e.score.level}</b><span>${e.score.total}/100　紫微合盘</span></div>
      <div class="mp-hp-sides">${n(e.a,"你")}${n(e.b,"对方")}</div>
      <div class="mp-hp-dims">${r}</div>
      <div class="mp-hp-inter">
        <div><div class="mp-hp-ith">你的四化 落在对方</div><ul>${d("你")||"<li>无</li>"}</ul></div>
        <div><div class="mp-hp-ith">对方的四化 落在你</div><ul>${d("对方")||"<li>无</li>"}</ul></div>
      </div>
      ${la(e.triple)}
      <div class="mp-hp-notes">${e.notes.map(i=>`<p>${i}</p>`).join("")}</div>
    </div>`},p.curveHTML=function(e){const n=e&&e.dayun&&Array.isArray(e.dayun.list)?e.dayun.list:[],r=e&&Array.isArray(e.liunian)?e.liunian:[];if(n.length<2)return"";const d=E=>typeof E=="number"&&isFinite(E)?E:0,i=E=>E.luck?d(E.luck.score):0,m=4.2,l=-2.2,u=d(e.dayun.startAge&&e.dayun.startAge.years),g=n.length?n[n.length-1].startAge+10:u+80,h=r.map(E=>d(E.age)).filter(E=>E>0),b=Math.min(u,...h.length?h:[u]),T=Math.max(g,...h.length?h:[g]),k=Math.max(1,T-b),z=640,N=190,M={t:14,r:16,b:26,l:30},V=z-M.l-M.r,I=N-M.t-M.b,y=E=>M.l+(E-b)/k*V,w=E=>M.t+I-(Math.max(l,Math.min(m,E))-l)/(m-l)*I,U=[{from:1.2,to:m,cls:"b-good"},{from:.55,to:1.2,cls:"b-good"},{from:-.8,to:.55,cls:"b-flat"},{from:-1.45,to:-.8,cls:"b-bad"},{from:l,to:-1.45,cls:"b-bad"}].map(E=>`<rect class="cv-band ${E.cls}" x="${M.l}" y="${w(E.to).toFixed(1)}" width="${V}" height="${(w(E.from)-w(E.to)).toFixed(1)}"/>`).join(""),H=10/k*V,f=[];n.forEach((E,le)=>{const we=d(E.startAge),he=i(E),ke=Math.max(M.l,y(we)),aa=Math.min(M.l+V,y(we+10));f.push(`${ke.toFixed(1)},${w(he).toFixed(1)}`),f.push(`${aa.toFixed(1)},${w(he).toFixed(1)}`)});const O=f.length?`<polyline class="cv-dy" points="${f.join(" ")}"/>`:"",D=f.length?`<polygon class="cv-dyfill" points="${M.l},${(M.t+I).toFixed(1)} ${f.join(" ")} ${(M.l+V).toFixed(1)},${(M.t+I).toFixed(1)}"/>`:"",ie=r.filter(E=>E.luck&&typeof E.luck.score=="number").map(E=>({x:y(d(E.age)),y:w(d(E.luck.score)),y0:d(E.year),gz:E.ganzhi,tier:E.luck.tier,v:d(E.luck.score),age:d(E.age)})),ne=ie.length>1?`<polyline class="cv-ln" points="${ie.map(E=>`${E.x.toFixed(1)},${E.y.toFixed(1)}`).join(" ")}"/>`:"",me={大吉:"var(--lu)",吉:"var(--lu)",平:"var(--muted)",忌:"var(--red)",大忌:"var(--red)"},Ce=ie.length?Math.min(...ie.map(E=>E.y0)):null,Ne=ie.map(E=>`<circle class="cv-dot${E.y0===Ce?" now":""}" cx="${E.x.toFixed(1)}" cy="${E.y.toFixed(1)}" fill="${me[E.tier]||"var(--muted)"}"><title>${a(`${E.y0}年（${E.age}岁）${E.gz}　${E.tier} ${E.v}`)}</title></circle>`).join(""),ye=`<line class="cv-ax zero" x1="${M.l}" y1="${w(0).toFixed(1)}" x2="${M.l+V}" y2="${w(0).toFixed(1)}"/><line class="cv-ax" x1="${M.l}" y1="${M.t}" x2="${M.l}" y2="${M.t+I}"/>`,$e=k>60?10:5,Ae=[];for(let E=Math.ceil(b/$e)*$e;E<=T;E+=$e)Ae.push(`<text class="cv-lbl age" x="${y(E).toFixed(1)}" y="${(M.t+I+13).toFixed(1)}" text-anchor="middle">${E}岁</text>`);const Ke=`<text class="cv-lbl" x="${(M.l-5).toFixed(1)}" y="${(w(2.4)+3).toFixed(1)}" text-anchor="end">吉</text><text class="cv-lbl" x="${(M.l-5).toFixed(1)}" y="${(w(0)+3).toFixed(1)}" text-anchor="end">平</text><text class="cv-lbl" x="${(M.l-5).toFixed(1)}" y="${(w(-1.8)+3).toFixed(1)}" text-anchor="end">忌</text>`,Me=n.slice().sort((E,le)=>i(le)-i(E)),C=Me[0],c=Me[Me.length-1],v=C&&i(C)>.55?`<text class="cv-lbl" x="${y(d(C.startAge)+5).toFixed(1)}" y="${(w(i(C))-5).toFixed(1)}" text-anchor="middle">▲${C.startAge}岁 ${C.luck.tier}</text>`:"",G=c&&i(c)<-.8?`<text class="cv-lbl" x="${y(d(c.startAge)+5).toFixed(1)}" y="${(w(i(c))+11).toFixed(1)}" text-anchor="middle">▼${c.startAge}岁 ${c.luck.tier}</text>`:"",Z=`<div class="cv-legend">
      <span><i style="background:var(--quan)"></i>大运（阶梯，一步十年）</span>
      <span><i style="background:var(--ke)"></i>流年（逐年折线）</span>
      <span>绿带＝吉　灰带＝平　红带＝忌</span>
    </div>`,ge=`<div class="cv-tip">曲线只呈现引擎已给出的行运评分（${l} ~ ${m}），不预测具体事件；档位与依据见下方「大运 / 流年」各节。悬停看逐年详情。</div>`;return`<div class="mp-curve">
      <div class="mp-curve-h"><b>人生运势曲线</b><span>${b}–${T} 岁　${e.dayun.rule}，${u} 岁起运${e.dayun.jiao&&e.dayun.jiao.at?`，交运 ${e.dayun.jiao.at}`:""}</span></div>
      <svg viewBox="0 0 ${z} ${N}" role="img" aria-label="人生运势曲线：${b} 到 ${T} 岁的大运与流年评分走势">
        ${U}${ye}${D}${O}${ne}${Ne}${Ae.join("")}${Ke}${v}${G}
      </svg>
      ${Z}${ge}
    </div>`},p.trendChart=function(e){const n=e&&Array.isArray(e.points)?e.points:[];if(n.length<2)return"";const r=e&&Array.isArray(e.segments)?e.segments:[],d=C=>typeof C=="number"&&isFinite(C)?C:0,i=720,m=322,l={t:34,r:46,b:66,l:36},u=i-l.l-l.r,g=m-l.t-l.b,h=n.length,b=u/h,T=C=>l.l+(C+.5)*b,k=C=>l.t+g-Math.max(0,Math.min(100,C))/100*g,z=Math.max(1.1,Math.min(10,b*.62)),N=C=>d(C.score),M=l.t+g,V=M+20,I=22,w=`klclip${(()=>{let C=2166136261;const c=v=>{const G=String(v??"");for(let Z=0;Z<G.length;Z++)C^=G.charCodeAt(Z),C=Math.imul(C,16777619)};c(h),c(n[0]&&n[0].age),c(n[h-1]&&n[h-1].age);for(const v of n)c(v&&v.score);return(C>>>0).toString(36)})()}`,F=r.map((C,c)=>{const v=Math.max(0,C.startAge-1),G=Math.min(h-1,C.endAge-1);if(G<v)return"";const Z=l.l+v*b,ge=Math.max(.6,(G-v+1)*b),le=c%2===1?`<rect class="kl-band" x="${Z.toFixed(1)}" y="${l.t}" width="${ge.toFixed(1)}" height="${g}"/><rect class="kl-stripband" x="${Z.toFixed(1)}" y="${V}" width="${ge.toFixed(1)}" height="${I}"/>`:"",we=c===0?"":`<line class="kl-segline" x1="${Z.toFixed(1)}" y1="${l.t}" x2="${Z.toFixed(1)}" y2="${M}"/>`,he=Math.min(Math.max(l.l+(v+G+1)/2*b,l.l+22),l.l+u-22);return le+we+`<text class="kl-seg" x="${he.toFixed(1)}" y="${(V+15).toFixed(1)}" text-anchor="middle">${a(C.ganZhi)}</text>`}).join(""),U=[0,25,50,75,100].map(C=>`<line class="kl-grid${C===50?" mid":""}" x1="${l.l}" y1="${k(C).toFixed(1)}" x2="${l.l+u}" y2="${k(C).toFixed(1)}"/><text class="kl-lbl" x="${l.l-6}" y="${(k(C)+3).toFixed(1)}" text-anchor="end">${C}</text>`).join(""),H=n.map((C,c)=>{const v=C.kline||{},G=d(v.open),Z=d(v.close),ge=Math.min(100,d(v.high)),E=Math.max(0,d(v.low)),le=Z>=G,we=k(G),he=k(Z),ke=Math.min(we,he),aa=Math.max(.8,Math.abs(we-he)),ta=T(c),Wa=`${C.age}岁（${C.year}年 ${C.ganZhi}）${Z}分${C.dayunGanZhi?` · ${C.dayunGanZhi}运`:""}`;return`<g class="kl-c${le?" up":" down"}"><title>${a(Wa)}</title><line x1="${ta.toFixed(2)}" y1="${k(ge).toFixed(1)}" x2="${ta.toFixed(2)}" y2="${k(E).toFixed(1)}"/><rect x="${(ta-z/2).toFixed(2)}" y="${ke.toFixed(1)}" width="${z.toFixed(2)}" height="${aa.toFixed(1)}" rx="0.7"/></g>`}).join(""),f=C=>{const c=[];for(let v=0;v<h;v++){if(v+1<C)continue;let G=0;for(let Z=v+1-C;Z<=v;Z++)G+=N(n[Z]);c.push({i:v,v:G/C})}return c},O=C=>f(C).map((c,v)=>`${v?"L":"M"}${T(c.i).toFixed(1)} ${k(c.v).toFixed(1)}`).join(" "),D=(C,c)=>{const v=f(C);if(!v.length)return"";const G=v[v.length-1];return{cls:c,y:k(G.v),text:`<text class="kl-ma-lbl ${c}" x="${l.l+u+5}" y="${k(G.v).toFixed(1)}" text-anchor="start">${G.v.toFixed(0)}</text>`}},ie=D(10,"m10"),ne=D(5,"m5"),me=(()=>{if(!ne||!ie)return`${ie?ie.text:""}${ne?ne.text:""}`;let C=ne.y,c=ie.y;if(Math.abs(C-c)<10){const v=Math.min(C,c),G=Math.max(C,c);C=v-6,c=G+6}return`<text class="kl-ma-lbl m10" x="${l.l+u+5}" y="${c.toFixed(1)}" text-anchor="start">${f(10).slice(-1)[0].v.toFixed(0)}</text><text class="kl-ma-lbl m5" x="${l.l+u+5}" y="${C.toFixed(1)}" text-anchor="start">${f(5).slice(-1)[0].v.toFixed(0)}</text>`})();let Ce=n[0],Ne=n[0];for(const C of n)N(C)>N(Ce)&&(Ce=C),N(C)<N(Ne)&&(Ne=C);const ye=(C,c,v)=>{const G=n.indexOf(C),Z=T(G),ge=k(N(C)),E=Math.min(Math.max(Z,l.l+26),l.l+u-26),le=c==="hi"?ge-8<l.t+6?14:v:ge+12>l.t+g-2?-8:v;return`<g class="kl-mark ${c}"><circle cx="${Z.toFixed(1)}" cy="${ge.toFixed(1)}" r="2"/><circle class="ring" cx="${Z.toFixed(1)}" cy="${ge.toFixed(1)}" r="4.6"/><text x="${E.toFixed(1)}" y="${(ge+le).toFixed(1)}" text-anchor="middle">${C.age}岁 ${N(C)}</text></g>`},$e=h>60?10:5,Ae=n.filter(C=>C.age%$e===0).map(C=>`<text class="kl-lbl age" x="${T(n.indexOf(C)).toFixed(1)}" y="${(M+14).toFixed(1)}" text-anchor="middle">${C.age}</text>`).join(""),Ke=`<text class="kl-lbl axis" x="${l.l}" y="${(m-6).toFixed(1)}">年龄（岁）</text><text class="kl-lbl axis" x="${l.l+u}" y="${(m-6).toFixed(1)}" text-anchor="end">每岁一分 · 满分 100</text>`;return`<div class="mp-kline-fig">
      <svg viewBox="0 0 ${i} ${m}" role="img" aria-label="人生K线：1 到 ${h} 岁的逐年评分蜡烛图">
        <defs><clipPath id="${w}"><rect x="${l.l}" y="${l.t}" width="${u}" height="${g}"/></clipPath></defs>
        ${F}${U}
        <g clip-path="url(#${w})">
          ${H}
          <path class="kl-ma m10" d="${O(10)}"/><path class="kl-ma m5" d="${O(5)}"/>
        </g>
        ${me}
        ${ye(Ce,"hi",-8)}${ye(Ne,"lo",12)}
        ${Ae}${Ke}
      </svg><div class="kl-legend"><span><i class="up"></i>阳线：比上一岁高</span><span><i class="down"></i>阴线：比上一岁低</span><span><i class="m5"></i>5 年均线</span><span><i class="m10"></i>10 年均线</span><span>虚线＝大运交界</span></div></div>`},p.trendHTML=function(e){if(!e)return"";const n=p.trendChart(e);if(!n)return p.quickHTML(e);const r=Array.isArray(e.segments)?e.segments:[],d=e.highlights&&typeof e.highlights=="object"?e.highlights:{},i=e.meta||{},m=i.strength||{},l=r.map(w=>`<span class="kl-chip">${a(w.ganZhi)}<em>${w.startAge}–${w.endAge}</em></span>`).join(""),u=(Array.isArray(d.best)?d.best:[]).map(w=>`<div class="kl-hl hi">${a(w)}</div>`).join(""),g=(Array.isArray(d.worst)?d.worst:[]).map(w=>`<div class="kl-hl lo">${a(w)}</div>`).join(""),h=i.boundaryNote?`<div class="mp-kline-note">${a(i.boundaryNote)}</div>`:d.suppressed?`<div class="mp-kline-note">${a(d.suppressed)}</div>`:"",b=Array.isArray(e.points)?e.points:[],T=w=>typeof w.score=="number"&&isFinite(w.score)?w.score:0,k=b.map(T),z=k.length?k.reduce((w,F)=>w+F,0)/k.length:0,N=k.length?Math.max(...k)-Math.min(...k):0,M=r.map(w=>{const F=b.filter(U=>U.age>=w.startAge&&U.age<=w.endAge).map(T);return{ganZhi:w.ganZhi,v:F.length?F.reduce((U,H)=>U+H,0)/F.length:0}}).filter(w=>w.v>0).sort((w,F)=>F.v-w.v),V=!!(m.boundary||d.suppressed),I=[`<span><em>全段均值</em><b>${z.toFixed(0)}</b></span>`];!V&&M.length&&(I.push(`<span><em>最好大运</em><b class="hi">${a(M[0].ganZhi)} ${M[0].v.toFixed(0)}</b></span>`),I.push(`<span><em>最差大运</em><b class="lo">${a(M[M.length-1].ganZhi)} ${M[M.length-1].v.toFixed(0)}</b></span>`)),I.push(`<span><em>波动幅度</em><b>${N.toFixed(0)}</b></span>`);const y=`<div class="kl-stats">${I.join("")}</div>`;return`<section class="mp-kline" aria-label="人生K线结果">
      <div class="mp-kline-h"><b>人生 K 线</b><span>${a(i.birth||"")}　日主 ${a(i.dayMaster||"")}　${a(m.level||"")}${m.score?`（${m.score}）`:""}</span></div>
      ${n}
      ${y}
      ${l?`<div class="kl-segs">${l}</div>`:""}
      ${u||g?`<div class="kl-hls">${u}${g}</div>`:""}
      ${h}
      <div class="mp-kline-tip">逐岁分数由大运与流年十神按固定表确定性计分（1–100），只表五行力量的顺逆，不预测具体事件；旺衰落在换档阈值附近时，不出高低年份结论。</div>
    </section>`},p.chengguHTML=function(e){if(!e)return"";const n=e.weights||{},r=e.song||{},d=["year","month","day","hour"].map(u=>{const g=n[u]||{label:"",qian:0},h=String(g.label||"").split(" ")[0]||"",b=String(g.label||"").split(" ")[1]||"";return`<div class="cg-cell"><em>${a(h)}</em><b>${a(b)}</b></div>`}).join(""),i=String(r.text||""),m=i?i.replace(/[。]$/,"").split("；").map((u,g)=>`<span>${a(u)}${g===0?"；":"。"}</span>`).join(""):"",l=e.verdict&&e.verdict.band?e.verdict.band:"";return`<section class="mp-cg" aria-label="称骨结果">
      <div class="mp-cg-h"><b>称骨</b><span>${a(e.lunar&&e.lunar.text?e.lunar.text:"")}</span></div>
      <div class="mp-cg-w">${d}</div>
      <div class="mp-cg-tot"><em>骨重合计</em><b>${a(e.total&&e.total.label?e.total.label:"")}</b>${l?`<i>${a(l)}</i>`:""}</div>
      <div class="mp-cg-song"><div class="mp-cg-song-h">称骨歌 · ${a(e.total&&e.total.label?e.total.label:"")}</div>
        <div class="mp-cg-verse">${m||'<span class="mp-cg-miss">该骨重未见通行本歌诀</span>'}</div>
        <div class="mp-cg-plain"><em>释义</em>${a(r.plain||"")}</div></div>
      ${e.verdict&&e.verdict.text?`<div class="mp-cg-band"><em>分档</em>${a(e.verdict.text)}</div>`:""}
      <div class="mp-cg-note">骨重与歌诀为通行本口径（各版本歌诀有异文，断句标点已统一）；释义为白话自撰，只作字面直解，属民俗娱乐参考，不构成命运断言。</div>
    </section>`},p.nameHTML=function(e){if(!e)return"";const n={木:"wood",火:"fire",土:"earth",金:"metal",水:"water"},r=h=>h==="未收录"?'<span class="mp-nm-el">未收录</span>':`<span class="mp-nm-el wx-${n[h]||"earth"}">${a(h)}</span>`,d=(h,b)=>`<div class="mp-nm-h"><b>${a(h)}</b>${b?`<i>${a(b)}</i>`:""}</div>`;if(e.action==="generate"){const h=e.bazi&&e.bazi.favorable?e.bazi.favorable.join("、"):"",b=(e.candidates||[]).map(T=>{const k=T.wuge&&T.wuge.available?(()=>{const N=T.wuge.rows.filter(I=>I.level==="吉").length,M=T.wuge.rows.filter(I=>I.level==="凶").length;return`<span class="mp-nm-fit${M===0&&N>=4?" ok":M>=2?" no":""}" title="${a(T.wuge.summary)}">五格 ${N}/5 吉</span>`})():"",z=T.phonetics&&T.phonetics.available?`<span class="mp-nm-fit${T.phonetics.level==="拗口"?" no":T.phonetics.level==="顺口"?" ok":""}" title="${a((T.phonetics.issues||[]).map(N=>N.text).join("；"))}">${a(T.phonetics.level)}</span>`:"";return`<div class="mp-nm-c"><b>${a(T.name)}</b><span class="mp-nm-els">${T.chars.map(N=>r(N.element)).join("")}${k}${z}</span><em>${a(T.chars.map(N=>N.char+"·"+N.meaning).join("　"))}</em></div>`}).join("");return`<section class="mp-nm" aria-label="候选名">
        ${d("候选名",`姓 ${e.surname}（${e.gender}）${h?`　喜用 ${h}`:""}`)}
        <div class="mp-nm-cand">${b}</div>
        <div class="mp-nm-note">${(e.notes||[]).map(T=>"※ "+a(T)).join("<br>")}</div>
      </section>`}const i=(e.chars||[]).map(h=>{const b=h.favorable===!0?'<span class="mp-nm-fit ok">合喜用</span>':h.favorable===!1?'<span class="mp-nm-fit no">不合喜用</span>':'<span class="mp-nm-fit">不判</span>',T=h.source==="user"?"用户指定":h.source==="lib"?"字库":"未收录",k=h.suggest&&h.suggest.length?`<div class="mp-nm-sug"><b>可换</b>${h.suggest.map(z=>`<span class="wx-${n[z.element]||"earth"}">${a(z.char)}（${a(z.element)}）</span>`).join("")}</div>`:"";return`<div class="mp-nm-row"><div class="mp-nm-ch">${a(h.char)}</div>
        <div class="mp-nm-b"><div class="mp-nm-t">${r(h.element)}<span>${a(T)}</span>${b}</div>
        <div class="mp-nm-m">${a(h.meaning)}</div>${k}</div></div>`}).join(""),m=e.bazi?`<div class="mp-nm-m">八字：${a(e.bazi.dayMaster&&e.bazi.dayMaster.stem?`${e.bazi.dayMaster.stem}（${e.bazi.dayMaster.element}）`:String(e.bazi.dayMaster||""))}　${a(e.bazi.strength?`${e.bazi.strength.level}（${e.bazi.strength.score}）`:"")}　喜用 ${a((e.bazi.favorable||[]).join("、"))}</div>
         <div class="mp-nm-m">${a(e.bazi.basis||"")}</div>`:"",l=h=>h==="吉"?"is-ok":h==="半吉"?"is-half":"is-bad",u=e.wuge&&e.wuge.available?`<div class="mp-nm-wu">
          <div class="mp-nm-wu-h"><b>五格</b><i>康熙笔画 · 通行本 81 数理</i></div>
          <div class="mp-nm-wu-rows">${e.wuge.rows.map(h=>`<div class="mp-nm-wu-c ${l(h.level)}"><em>${a(h.key)}</em><b>${h.strokes}</b><i>${a(`${h.level} · ${h.name}`)}</i></div>`).join("")}</div>
          <div class="mp-nm-m">笔画：${e.wuge.strokes.map(h=>`${a(h.char)}${h.strokes}${h.source==="user"?"（指定）":""}`).join(" ＋ ")}</div>
          <div class="mp-nm-m">三才：${a(e.wuge.sancai.text)}</div>
        </div>`:`<div class="mp-nm-wu"><div class="mp-nm-wu-h"><b>五格</b><i>这一版算不了</i></div><div class="mp-nm-m">${a(e.wuge?e.wuge.reason:"未算")}</div></div>`,g=e.phonetics&&e.phonetics.available?`<div class="mp-nm-ph"><b>音韵</b><span class="mp-nm-ph-lv${e.phonetics.level==="顺口"?" ok":e.phonetics.level==="拗口"?" bad":" warn"}">${a(e.phonetics.level)}</span><em>${a(e.phonetics.chars.map(h=>`${h.py}${h.tone}`).join(" "))}　声调 ${a(e.phonetics.tonePattern)}</em>${(e.phonetics.issues||[]).map(h=>`<span class="mp-nm-ph-i">${a(h.text)}</span>`).join("")}</div>`:`<div class="mp-nm-ph"><b>音韵</b><em>${a(e.phonetics?e.phonetics.reason:"未算")}</em></div>`;return`<section class="mp-nm" aria-label="名字评估">
      ${d(e.fullName||"",`字库 ${e.stats&&e.stats.libSize?e.stats.libSize:""} 字${e.stats&&e.stats.unknown?`　未收录 ${e.stats.unknown}`:""}`)}
      ${i}
      ${m}
      ${u}
      ${g}
      <div class="mp-nm-verd">${a(e.verdict||"")}</div>
      <div class="mp-nm-note">${(e.notes||[]).map(h=>"※ "+a(h)).join("<br>")}</div>
    </section>`},p.summaryHTML=function(e){if(!e||!e.lead)return"";const n=(e.sections||[]).map(i=>`<div class="mp-br-sec"><b>${a(i.h)}</b><p>${a(i.t)}</p></div>`).join(""),r=e.advice&&e.advice.length?`<div class="mp-br-adv"><b>可以试着做的</b><ul>${e.advice.map(i=>`<li>${a(i)}</li>`).join("")}</ul></div>`:"",d=e.chips&&e.chips.length?`<div class="mp-br-chips">${e.chips.map(i=>`<span>${a(i)}</span>`).join("")}</div>`:"";return`<section class="mp-br" aria-label="先说结论">
      <div class="mp-br-h"><b>${a(e.title||"先看这一张")}</b>${d}</div>
      <p class="mp-br-lead">${a(e.lead)}</p>
      ${n}
      ${r}
      ${e.caveat?`<p class="mp-br-cav">※ ${a(e.caveat)}</p>`:""}
      ${e.footer?`<p class="mp-br-foot">${a(e.footer)}</p>`:""}
    </section>`},p.baziHTML=function(e){const n=[["year","年柱"],["month","月柱"],["day","日柱"],["hour","时柱"]].filter(([c])=>e.pillars[c]),r={year:"年",month:"月",day:"日",hour:"时"},d={木:"wood",火:"fire",土:"earth",金:"metal",水:"water"},i={比肩:"tg-bi",劫财:"tg-bi",食神:"tg-shi",伤官:"tg-shi",偏财:"tg-cai",正财:"tg-cai",七杀:"tg-guan",正官:"tg-guan",偏印:"tg-yin",正印:"tg-yin"},m=c=>`<span class="tg ${i[c]||""}">${c}</span>`,l=c=>`<span class="wx-${d[c]||"earth"}">${pe(c)}${c}</span>`,u=c=>`<span class="ss-s ${c.luck||"neutral"}" title="${a(`${c.cat} · ${c.via}查${c.target} ｜ ${c.rule}`)}">${c.name}</span>`,g=(c,v)=>`<tr><td class="bz-lbl">${c}</td>${n.map(([G])=>`<td data-c="${r[G]}">${v(e.pillars[G],G)}</td>`).join("")}</tr>`,h=`<thead><tr><th></th>${n.map(([c,v])=>`<th${c==="day"?' class="bz-hdr-day"':""}>${v}</th>`).join("")}</tr></thead>`,b={寅:"木",卯:"木",巳:"火",午:"火",申:"金",酉:"金",亥:"水",子:"水",辰:"土",戌:"土",丑:"土",未:"土"},T={木:"火",火:"土",土:"金",金:"水",水:"木"},k={木:"土",土:"水",水:"火",火:"金",金:"木"},z=b[e.pillars.month.branch]||"土",N=["木","火","土","金","水"],M=c=>c===z?"旺":T[z]===c?"相":T[c]===z?"休":k[c]===z?"囚":"死",V=`<tr><td class="bz-lbl">五行</td><td class="bz-wxs" colspan="${n.length}">${["旺","相","休","囚","死"].map(c=>{const v=N.find(G=>M(G)===c)||z;return`<i><b class="wx-${d[v]}">${v}</b><em>${c}</em></i>`}).join("")}</td></tr>`,I=[g("十神",(c,v)=>v==="day"?`<span class="bz-zhuri">${e.input.gender==="male"?"元男":"元女"}</span>`:c.stemTenGod?m(c.stemTenGod):'<span class="pp-dim">—</span>'),g("天干",c=>`<span class="bz-big ${"wx-"+d[c.stemElement]}">${c.stem}</span>`),g("地支",c=>`<span class="bz-big ${"wx-"+d[c.branchElement]}">${c.branch}</span>`),g("藏干",c=>c.hidden.map(v=>`<i class="bz-cg wx-${d[v.element]}">${v.stem}·${v.element}</i>`).join("")),g("支神",c=>c.hidden.map(v=>m(v.tenGod)).join("<br>")),g("纳音",c=>c.nayin),g("空亡",c=>`<span class="pp-dim">${c.kongwang.join("")}</span>`),g("地势",c=>c.dishi),g("自坐",c=>c.zizuo),g("神煞",c=>c.shenshaDetail&&c.shenshaDetail.length?`<span class="pp-ss">${c.shenshaDetail.map(u).join("")}</span>`:'<span class="pp-dim">—</span>'),V].join(""),y=Object.entries(e.wuxing).map(([c,v])=>`<span class="pp-chip wx-${d[c]}">${pe(c)}${c} ${v}</span>`).join(""),w=e.frame||{},F=c=>c==="大吉"||c==="吉"?"ok":c==="大忌"||c==="忌"?"warn":"",U=(c,v)=>v?`<div class="pp-sec"><div class="pp-sec-h">${c}</div>${v}</div>`:"",H=w.geju&&w.geju.length?`
      <div class="pp-tl">${w.primary?`主格 <b>${a(w.primary.name)}</b>　${a(w.primary.evidence)}`:""}</div>
      <div class="pp-chips">${w.geju.map(c=>{const v=c.status==="破格",G=c.status==="待定"||c.status==="假从",Z=`${c.evidence||""}${Array.isArray(c.breaks)&&c.breaks.length?`；破：${c.breaks.join("；")}`:""}`;return`<span class="pp-chip ${v?"broken":G?"warn":""}" title="${a(Z)}">${a(c.name)}<i class="pp-drel">${a(c.kind)}${c.status?`·${a(c.status)}`:""}</i></span>`}).join("")}</div>`:"",f=(()=>{const c=Array.isArray(w.yongshen&&w.yongshen.neutral)?w.yongshen.neutral:[],v=new Set(w.yongshen&&w.yongshen.neutralTenGods||[]);return`${(w.yongshen&&w.yongshen.avoidTenGods||[]).filter(Z=>!v.has(Z)).map(Z=>`<span class="pp-chip warn">${a(Z)}</span>`).join("")}${[...v].map(Z=>`<span class="pp-chip neu" title="局中分量近零，按中性偏忌看">${a(Z)}</span>`).join("")}${c.length?`<span class="pp-chip neu" title="忌神中全局不足 0.5 分的那几行；仍在忌里参与行运评分">中性偏忌 ${c.map(Z=>`${a(Z.element)} ${a(Z.weight)} 分`).join("、")}</span>`:""}`})(),O=w.yongshen?`
      <div class="pp-tl">喜 ${w.yongshen.favor.map(l).join("")}　忌 ${w.yongshen.avoid.map(l).join("")}　<span class="pp-dim">${a(w.yongshen.method)}</span></div>
      <div class="pp-chips">${w.yongshen.favorTenGods.map(c=>`<span class="pp-chip ok">${a(c)}</span>`).join("")}${f}</div>
      ${(w.yongshen.disputed||[]).length?`<div class="pp-tl pp-dim">有争议：${w.yongshen.disputed.map(c=>`${a(c.element)}（扶抑为${a(c.favorRole)}·${a(c.favorVerb)}，${a(c.climate)}盘调候忌${a(c.element)}）`).join("、")}　保留在喜用，不列入忌</div>`:""}
      <div class="pp-tl pp-dim">${a(w.yongshen.detail)}</div>`:"",D=e.climate||w.yongshen&&w.yongshen.climate||null,ie=D?(()=>{const c=Math.max(2,Math.min(98,Math.round(((Number(D.temp)||0)+3)/6*100))),v=D.need?`<em>调候取</em><b>${a(D.need.stem+D.need.element)}</b>`:"<em>气候平和</em>",G=!!(w.yongshen&&Array.isArray(w.yongshen.disputed))&&w.yongshen.disputed.some(he=>he.element===D.avoidElement),Z=D.need?`<em>忌</em><b>${a(D.avoidElement)}</b>${G?'<span class="pp-dim">（有争议）</span>':""}`:"",ge=(D.evidence||[]).length?`<em>依据</em><span>${a(D.evidence.join("、"))}</span>`:"",E=D.priority==="调候优先"?'<span class="mp-cli-p">调候优先</span>':'<span class="mp-cli-p">扶抑为主</span>',le=e.frame&&e.frame.yongshen&&e.frame.yongshen.qt,we=le?`<div class="mp-qt">
          <div class="mp-qt-h"><b>穷通宝鉴</b><span>${a(le.label)}</span></div>
          <div class="mp-qt-y"><em>用神</em>${le.yong.map((he,ke)=>`<b class="${ke===0?"first":""}">${a(he)}</b>`).join("")}<em>首取 ${a(le.primary)}</em></div>
          <div class="mp-qt-q" title="${a(le.quote)}">「${a(le.quote)}」<span>第 ${le.chapter} 章${le.note?" · "+a(le.note):""}</span></div>
        </div>`:"";return`<section class="mp-cli" aria-label="寒暖燥湿">
        <div class="mp-cli-h"><b>寒暖燥湿</b><span class="mp-cli-k">${a(D.label||"")}</span>${E}</div>
        <div class="mp-cli-bar" title="寒 ← → 热"><i style="left:${c}%"></i></div>
        <div class="mp-cli-axis"><span>寒</span><span>平</span><span>热</span></div>
        <div class="mp-cli-row">${v}${Z}${ge}</div>
        <div class="mp-cli-narr">${a(D.narration||"")}</div>
        ${we}
      </section>`})():"",ne=w.godStats?`<div class="pp-chips">${Object.entries(w.godStats.groups).map(([c,v])=>`<span class="pp-chip">${c} ${v}</span>`).join("")}</div>`:"",me=e.dayun.list.map(c=>{const v=c.luck||null;return`<span class="pp-chip ${v?F(v.tier):""}" title="${a(`${c.fromDate?`${c.fromDate} 交运；`:""}${v?`${v.tier} ${v.score}｜${(v.reasons||[]).join("；")}`:""}`)}">${c.startAge} ${c.ganzhi}${c.relations&&c.relations.length?` <i class="pp-drel">${c.relations.join("")}</i>`:""}${v?` ${v.tier}`:""}</span>`}).join(""),Ce=e.liunian&&e.liunian.length?`<div class="pp-chips">${e.liunian.slice(0,8).map(c=>{const v=c.luck||null,G=c.suiyun&&Array.isArray(c.suiyun.signals)?c.suiyun.signals:[],Z=G.length?`｜${G.map(ge=>ge.detail).join("；")}`:"";return`<span class="pp-chip ${v?F(v.tier):""}" title="${a(v?`${v.tier} ${v.score}｜${(v.reasons||[]).join("；")}${Z}`:Z.replace(/^｜/,""))}">${c.year} ${c.ganzhi}${v?` ${v.tier}`:""}</span>`}).join("")}</div>`:"",Ne=(e.liunian||[]).filter(c=>c.suiyun&&Array.isArray(c.suiyun.signals)&&c.suiyun.signals.length),ye=e.suiyunClassic,$e=ye?`<div class="pp-dim pp-sy-src" title="${a(ye.plain||"")}">《${a(ye.bookName||"")}·${a(ye.chapter||"")}》「${a(ye.quote||"")}」</div>`:"",Ae=Ne.length?`<div class="pp-tl pp-dim">岁运提示（只标干支变动，不判吉凶）</div><div class="pp-chips">${Ne.map(c=>`<span class="pp-chip" title="${a(`${c.suiyun.signals.map(v=>v.detail).join("；")}｜${c.suiyun.note||""}`)}">${c.year} ${a(c.suiyun.signals.map(v=>`${v.type}${(v.type.startsWith("流年")||v.type.startsWith("大运"))&&v.target?`·${v.target}`:""}`).join("/"))}</span>`).join("")}</div>${$e}`:"",Ke=e.strength?`<div class="pp-str">日主强弱：<b>${e.strength.level}</b>${e.strength.score}　<span class="pp-dim">${e.strength.detail}</span></div>`:"",Me=e.shensha&&e.shensha.groups||[],C=Me.length?`
      <div class="pp-ssx">
        <div class="ssx-h"><b>神煞全览</b><span>共 ${e.shensha.count} 见 · ${Me.length} 类 · 悬停看查法</span></div>
        ${Me.map(c=>`<div class="pp-ssg"><span class="ssg-gt">${c.cat}</span><span class="ssg-gi">${c.items.map(v=>`<span class="pp-ssi ${v.luck||"neutral"}" title="${a(`${v.via}查${v.target} ｜ ${v.rule}`)}">${v.name}<em>${v.pillars.map(G=>r[G]||"").join("")}</em></span>`).join("")}</span></div>`).join("")}
        <div class="ssx-h" style="border-top:none;padding-top:4px;margin-top:4px">神煞只作参考，吉凶仍须看格局、旺衰与行运。</div>
      </div>`:"";return(e.brief?p.summaryHTML(e.brief):"")+`<div class="pp" style="padding:12px">
      <table class="pp-bz">${h}<tbody>${I}</tbody></table>
      ${e.hourUnknown?'<div class="pp-warn" role="note">时柱暂缺：未提供出生时刻，只排年/月/日三柱；起运与交运按日估算，涉及时柱的结论仅供参考。</div>':""}
      <div class="pp-rel"><div><b>天干</b>${e.relations&&e.relations.stems.length?e.relations.stems.join(" · "):"—"}</div>
      <div><b>地支</b>${e.relations&&e.relations.branches.length?e.relations.branches.join(" · "):"—"}</div></div>
      ${Ke}
      ${U("格局",H)}
      ${U("用神",O)}
      ${ie}
      ${Array.isArray(e.classics)&&e.classics.length?`<section class="mp-cl" aria-label="古籍原文">
        <div class="mp-cl-h"><b>古籍原文</b><span>照录通行本，释义为白话自撰</span></div>
        ${e.classics.map(c=>`<div class="mp-cl-e">
          <div class="mp-cl-t"><b>${a(({ziping:"子平真诠",ditian:"滴天髓",sanming:"三命通会"}[c.book]||c.book)+"·"+c.chapter)}</b></div>
          <div class="mp-cl-q">「${a(c.quote)}」</div>
          <div class="mp-cl-p">${a(c.plain)}</div>
        </div>`).join("")}
      </section>`:""}
      ${U("五行与十神",`<div class="pp-chips">${y}</div>${ne}`)}
      ${U("大运",`${p.curveHTML(e)}<div class="pp-chips">${me}</div>`)}
      ${Ce?U("流年",Ce+Ae):""}
      ${e.palaces?U("胎命身",`<div class="pp-chips">
        <span class="pp-chip" title="${a(e.palaces.taiyuan.note)}">胎元 ${a(e.palaces.taiyuan.ganzhi)}</span>
        ${e.palaces.taixi?`<span class="pp-chip" title="${a(e.palaces.taixi.note)}">胎息 ${a(e.palaces.taixi.ganzhi)}</span>`:""}
        ${e.palaces.minggong?`<span class="pp-chip" title="${a(e.palaces.minggong.note)}">命宫 ${a(e.palaces.minggong.ganzhi)}</span>`:""}
        ${e.palaces.shengong?`<span class="pp-chip" title="${a(e.palaces.shengong.note)}">身宫 ${a(e.palaces.shengong.ganzhi)}</span>`:""}
        ${!e.palaces.minggong||!e.palaces.shengong?'<span class="pp-chip" title="命宫与身宫由生月与生时支合数定宫；时柱暂缺，这两宫不排">命宫·身宫 时柱暂缺不排</span>':""}
      </div>`):""}
      ${C}
      <div style="margin-top:8px;font-size:12px;color:var(--muted)">上一节 ${e.jieqi.previous.name} ${e.jieqi.previous.time}　下一节 ${e.jieqi.next.name} ${e.jieqi.next.time}　${e.dayun.rule}，${e.dayun.startAge.years}岁起运${e.dayun.jiao&&e.dayun.jiao.at?`（交运 ${e.dayun.jiao.at}，${e.dayun.jiao.frame}）`:""}</div>
    </div>`};const za={natal:"命盘解析",divination:"卦象解析",card:"牌阵解析"},Va={同向:"good",有张力:"watch",互补:"alt"},Ye=e=>`<div class="mp-cross">${e.map(n=>{const r=Va[n.stance]||"plain";return`<div class="mp-cross-row">
      <div class="mp-cross-h"><span class="mp-cross-l">${a(n.label)}</span><span class="mp-cross-tag t-${r}">${a(n.stance||"—")}</span></div>
      <div class="mp-cross-b">
        <div class="mp-cross-cell"><b>八字</b><span>${a(n.bazi||"—")}</span></div>
        <div class="mp-cross-cell"><b>紫微</b><span>${a(n.ziwei||"—")}</span></div>
      </div>
      ${n.note?`<div class="mp-cross-note">${a(n.note)}</div>`:""}
    </div>`}).join("")}</div>`;p.interpretHTML=function(e,n){if(!e||!(e.dimensions&&e.dimensions.length||e.sections&&e.sections.length)&&!e.error&&!e.answer)return"";const d=!!(n&&n.folded);let i=-1;(e.dimensions||[]).forEach((f,O)=>{f.knowledge&&f.knowledge.length&&(i=O)});const m=(e.dimensions||[]).map((f,O)=>`<div class="mp-it-dim${f.focused?" focus":""}">
      <div class="mp-it-dh"><span class="mp-it-dno">${O+1}</span><span class="mp-it-dlabel">${a(f.label)}</span>${f.focused?'<span class="mp-it-focus">最贴近你的问题</span>':""}${f.confidence?`<span class="mp-it-conf c-${a(f.confidence)}">置信度 ${a(f.confidence)}</span>`:""}</div>
      ${f.plain?`<div class="mp-it-dplain">${a(f.plain)}</div>`:""}
      <div class="mp-it-dtext">${a(f.text)}</div>
      ${f.evidence&&f.evidence.length?`<details class="mp-it-ev"><summary>依据 · ${a(f.evidence.length)} 条盘面事实</summary><div class="mp-it-ev-body">${f.evidence.map(D=>`<span class="mp-it-ev-item">${a(D)}</span>`).join("")}<span class="mp-it-ev-tech">技法：${a(e.technique||e.systemLabel||"")}</span></div></details>`:""}
      ${f.knowledge&&f.knowledge.length?`<div class="mp-it-know">${f.knowledge.map(D=>`<div class="know-row"><span class="know-status ${D.status}">${a(D.statusLabel)}</span><span class="know-body"><b>${a(D.gist)}</b>${a(D.detail)}${D.source?`<i>出处：${a(D.source)}</i>`:""}${D.note?`<em>注：${a(D.note)}</em>`:""}</span></div>`).join("")}${O===i&&e.knowledgeNote?`<div class="know-disc">${a(e.knowledgeNote)}</div>`:""}</div>`:""}
      ${f.advice?`<div class="mp-it-adv"><b>建议</b>${a(f.advice)}</div>`:""}
    </div>`).join(""),l=e.outline&&e.outline.length?`<div class="mp-outline"><div class="mp-outline-h">一页读懂</div>${e.outline.map(f=>`<div class="mp-outline-row"><b>${a(f.label)}</b><span>${a(f.text)}</span></div>`).join("")}</div>`:"",u=e.sections&&e.sections.length?`<nav class="mp-toc" aria-label="报告目录">${e.sections.map(f=>`<a href="#mp-sec-${a(f.key)}">${a(f.label)}</a>`).join("")}</nav>`:"",g=e.tables&&e.tables.length?`<div class="mp-tables">${e.tables.filter(f=>Array.isArray(f.rows)&&f.rows.length).map(f=>`<div class="mp-table-wrap">
          <div class="mp-table-h">${a(f.title)}</div>
          <div class="mp-table-scroll"><table class="mp-table">
            <thead><tr>${f.columns.map(O=>`<th scope="col">${a(O)}</th>`).join("")}</tr></thead>
            <tbody>${f.rows.map(O=>`<tr>${O.map((D,ie)=>`<td data-label="${a(f.columns[ie]||"")}">${a(D)}</td>`).join("")}</tr>`).join("")}</tbody>
          </table></div>
        </div>`).join("")}</div>`:"",h=f=>String(f||"").split(`
`).map(O=>`<div class="mp-it-p">${a(O).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>")}</div>`).join(""),b=e.sections&&e.sections.length?`<div class="mp-it-secs">${e.sections.map(f=>`<div class="mp-it-sec${f.tone?` tone-${a(f.tone)}`:""}" id="mp-sec-${a(f.key)}">
        <div class="mp-it-sh">${a(f.label)}</div>
        <div class="mp-it-stext">${Array.isArray(f.items)&&f.items.length?Ye(f.items):h(f.text)}</div>
      </div>`).join("")}</div>`:"",T=[e.systemLabel,za[e.moduleType]||e.moduleType].filter(Boolean),k=e.ask,z=k&&k.question?a(k.question):"",N=k&&(z||k.direction&&k.direction!=="general")?`<div class="mp-it-ask">${z?`<span class="ask-q">问题：${z}</span><span class="ask-sep">｜</span>`:""}<span class="ask-d">询问方向：${a(k.directionLabel||"综合")}</span></div>`:"",M=e.answer?`<div class="mp-it-ans"><b>${z?"先答所问":"先看结论"}</b>${a(e.answer)}</div>`:"",V=e.plain?`<div class="mp-it-plain"><b>说人话</b>${a(e.plain)}</div>`:"",I=e.followups&&e.followups.length?`<div class="mp-it-fu"><b>还可以这样追问</b><ul>${e.followups.map(f=>`<li>${a(f)}</li>`).join("")}</ul></div>`:"",y=e.glossary&&e.glossary.length?`<details class="mp-it-gloss"><summary>名词解释（${e.glossary.length} 条）</summary>${e.glossary.map(f=>`<div><span>${a(f.term)}</span>${a(f.plain)}</div>`).join("")}</details>`:"",w=e.limits&&e.limits.length?`<details class="mp-it-limits"><summary>本插件不回答什么（${e.limits.length} 条）</summary>${e.limits.map(f=>`<div><b>${a(f.title)}</b>${a(f.text)}</div>`).join("")}</details>`:"",U=e.system&&/^(liuyao|meihua|daliuren|qimen|tarot|xiaoliuren)$/.test(e.system)?`<div class="mp-askcopy-row"><button type="button" class="mp-askcopy" data-mp-askcopy="${a(e.system)}">复制问事提示</button><span class="mp-askcopy-hint">把这张盘和你的问题打包成一段提示，粘到任何对话里都能用</span></div>`:"",H=e.guide?`<details class="mp-guide">
      <summary><b>${a(e.guide.title)}</b><span class="mp-guide-sub">数 / 象 / 辞</span></summary>
      <div class="mp-guide-body">
        <p class="mp-guide-lead">${a(e.guide.lead)}</p>
        <ol class="mp-guide-layers">${(e.guide.layers||[]).map(f=>`<li><b>${a(f.name)}<i>${a(f.sub)}</i></b><span>${a(f.text)}</span><em>${a(f.hint)}</em></li>`).join("")}</ol>
        <div class="mp-guide-check"><b>${a(e.guide.check.title)}</b><ol>${(e.guide.check.items||[]).map(f=>`<li>${a(f)}</li>`).join("")}</ol><p>${a(e.guide.check.tail)}</p></div>
        <div class="mp-guide-parts"><b>${a(e.guide.parts.title)}</b><ul>${(e.guide.parts.rows||[]).map(f=>`<li><span>${a(f[0])}</span>${a(f[1])}</li>`).join("")}</ul><p>${a(e.guide.parts.tail)}</p></div>
        <p class="mp-guide-close">${a(e.guide.closing)}</p>
      </div></details>`:"";return`<div class="mp-it${d?" folded":""}">
      <button type="button" class="mp-it-head" aria-expanded="${d?"false":"true"}">
        <span class="mp-it-arrow" aria-hidden="true">▾</span>
        <span class="mp-it-title">解析与详解</span>${T.map(f=>`<span class="mp-it-tag">${a(f)}</span>`).join("")}
        <span class="mp-it-hint">${d?"点击展开":"点击收起"}</span>
      </button>
      <div class="mp-it-wrap">
        ${U}
        ${N}
        ${M}
        ${V}
        ${e.lead?`<div class="mp-it-lead">${a(e.lead)}</div>`:""}
        ${e.error?`<div class="mp-it-err"><b>⚠ 解析生成失败</b>${a(e.error)}——上方盘面数据本身可用</div>`:""}
    ${H}
    ${l}
        ${u}
        <div class="mp-it-body">${m}</div>
        ${b}
        ${g}
        ${I}
        ${y}
        ${w}
        <div class="mp-it-dis">${a(e.disclaimer)}</div>
      </div>
    </div>`},p.followupHTML=function(e){if(!e)return"";const n=e.evidence&&e.evidence.length?`<div class="mp-fu-ev">依据：${e.evidence.map(r=>a(r)).join("；")}　置信度：${a(e.confidence||"弱")}</div>`:"";return`<div class="mp-fu${e.ok?"":" miss"}">
      <div class="mp-fu-h">追问 · ${a(e.question)}</div>
      <div class="mp-fu-a">${a(e.answer)}</div>
      ${n}
    </div>`},p.resultWithInterpret=function(e,n,r){return(e||"")+p.interpretHTML(n,r)},p.caliberHTML=function(e){const n=e&&Array.isArray(e.switches)?e.switches.filter(g=>g&&g.key):[];if(!n.length)return"";const r=n.filter(g=>!g.error&&g.total>0),d=r.length?`${n.length} 组开关中 ${r.length} 组影响此盘：${r.map(g=>g.short||g.title).join("、")}。`:`本盘对 ${n.length} 组开关都不敏感：换成另一档也不变。`,i=g=>{if(g.error)return`<div class="mp-cdiff-same">未能对照：${a(g.error)}</div>`;if(!g.total)return'<div class="mp-cdiff-same">无变化 · 此盘不受这一开关影响</div>';const h=Array.isArray(g.roots)?g.roots:[];return h.length?`<div class="mp-cdiff-roots">${h.map(b=>`<div class="mp-cdiff-root"><span class="mp-cdiff-k">${a(b.label)}</span><span class="mp-cdiff-from">${a(b.from)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-to">${a(b.to)}</span></div>`).join("")}</div>`:`<div class="mp-cdiff-same">无单一根因；逐字段差异 ${Number(g.total)||0} 处</div>`},m=g=>{const h=(Array.isArray(g.views)?g.views:[]).filter(b=>b&&b.changed);return g.error||!g.total||!h.length?"":`<table class="mp-cview"><thead><tr><th scope="col">项</th><th scope="col">${a(g.currentLabel)}</th><th scope="col">${a(g.altLabel)}</th></tr></thead><tbody>`+h.map(b=>`<tr><th scope="row">${a(b.label)}</th><td>${a(b.current)}</td><td>${a(b.alt)}</td></tr>`).join("")+"</tbody></table>"},l=g=>{const h=Array.isArray(g.categories)?g.categories:[];if(g.error||!g.total||!h.length)return"";const b=h.slice(0,6);return`<div class="mp-cdiff-cats">${b.map(T=>`<span class="mp-cdiff-cat">${a(T.name)} ${Number(T.count)||0} 处</span>`).join("")}`+(h.length>b.length?`<span class="mp-cdiff-cat">另 ${h.length-b.length} 类</span>`:"")+"</div>"},u=n.map(g=>`<div class="mp-cdiff-row"><div class="mp-cdiff-h"><b>${a(g.title)}</b><span class="mp-cdiff-count${g.total>0?" on":""}">${g.error?"未能对照":g.total?`${Number(g.total)||0} 处`:"无变化"}</span></div><div class="mp-cdiff-ab"><span class="mp-cdiff-pill now">当前 · ${a(g.currentLabel)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-pill alt">换成 · ${a(g.altLabel)}</span></div>${i(g)}${m(g)}${l(g)}</div>`).join("");return`<details class="mp-cdiff" aria-label="口径对照">
      <summary><span class="mp-cdiff-title">口径对照</span><span class="mp-cdiff-lead">${a(d)}</span><span class="mp-cdiff-more">展开逐字差异</span></summary>
      <div class="mp-cdiff-body">${u}
        <div class="mp-cdiff-note">同一组输入、只换一个开关；只列变化字段与根因，不判哪套口径更准，也不改上方盘面。</div>
      </div>
    </details>`},p.handleHTML=function(e){return typeof e!="string"||!e?"":`<section class="mp-handle" aria-label="排盘句柄">
      <span class="mp-handle-title">排盘句柄</span>
      <code class="mp-handle-code" title="${a(e)}">${a(e)}</code>
      <button type="button" class="mp-handle-copy" data-handle-copy="${a(e)}" aria-label="复制排盘句柄">复制句柄</button>
      <span class="mp-handle-hint">追问同一张盘时把它连同增量参数（年份、方向、所问之事）一并交给助手，不必重报出生信息。句柄是编码不是加密，含出生时间与出生地，别公开贴出。</span>
    </section>`},p.revisionHTML=function(e){if(!e||typeof e!="object")return"";const n=Array.isArray(e.applied)?e.applied:[],r=Array.isArray(e.ignored)?e.ignored:[];if(!n.length&&!r.length)return"";const d=n.map(i=>{const m=i.fromDisplay==null?"（未设）":i.fromDisplay;return`<li><span class="k">${a(i.label||i.key)}</span><span class="v"><span class="old">${a(m)}</span> → <span class="new">${a(i.display)}</span></span></li>`}).join("");return`<section class="mp-revise" aria-label="一句话改参">
      <div class="mp-revise-head"><span class="mp-revise-title">一句话改参</span><span class="mp-revise-text">「${a(e.text||"")}」</span></div>
      ${d?`<ul class="mp-revise-list">${d}</ul>`:'<p class="mp-revise-ignored">没有识别到可改的参数，仍按原参数排盘。</p>'}
      ${r.length?`<p class="mp-revise-ignored">未处理：${a(r.join("；"))}</p>`:""}
    </section>`},p.shadowHTML=function(e,n){if(!e||!e.id)return"";const r=[];e.version&&r.push(`版本 <b>${a(e.version)}</b>`),e.baseId&&r.push(`基础指纹 <b>${a(e.baseId)}</b>`),r.push("同参数同 ID");const d=[];e.reproducible===!1&&d.push(`不可复算：${a(e.reason||"参数不足")}`);const i=e.reproducible===!0&&e.asOfPinned===!1&&(e.system==="bazi"||e.system==="ziwei")?'<div class="mp-shadow-hint">未固定 asOf：流年 / 流月随「此刻」变化；要逐字比对请在输入里固定 asOf。</div>':"",m=n&&n.sameId!==!1&&(n.versionChanged||Number(n.total)>0);let l="";if(m){const u=Number(n.total)||0,g=a(n.fromVersion||"—"),h=a(n.toVersion||e.version||"—"),b=Array.isArray(n.roots)?n.roots:[],T=b.slice(0,8),k=T.length?`<div class="mp-cdiff-roots">${T.map(M=>`<div class="mp-cdiff-root"><span class="mp-cdiff-k">${a(M.label)}</span><span class="mp-cdiff-from">${a(M.from)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-to">${a(M.to)}</span></div>`).join("")}`+(b.length>T.length?`<div class="same">另 ${b.length-T.length} 处根因</div>`:"")+"</div>":`<div class="same">${u?"无单一根因；逐字段变化 "+u+" 处":"字段 0 处变化：同一张盘跨版本逐字一致"}</div>`,z=Array.isArray(n.categories)?n.categories:[],N=z.length?`<div class="mp-cdiff-cats">${z.slice(0,6).map(M=>`<span class="mp-cdiff-cat">${a(M.name)} ${Number(M.count)||0} 处</span>`).join("")}`+(z.length>6?`<span class="mp-cdiff-cat">另 ${z.length-6} 类</span>`:"")+"</div>":"";l=`<details class="mp-shadow-diff"${u>0?" open":""}>
        <summary><b>与上次同盘比对</b><span class="tag">${g} → ${h} · ${u?`${u} 处变化`:"0 处变化"}</span></summary>
        ${k}${N}
        <div class="note">同一 baseId（同一组归一化参数）的两次结果；只比盘面字段，不含摘要、解析与古籍等文本层。</div>
      </details>`}return`<section class="mp-shadow" aria-label="影子盘">
      <div class="mp-shadow-head"><span class="mp-shadow-title">影子盘</span><code class="mp-shadow-id">${a(e.id)}</code>
        <button type="button" class="mp-shadow-copy" data-shadow-copy="${a(e.id)}" aria-label="复制影子盘 ID">复制 ID</button></div>
      <div class="mp-shadow-meta">${r.join('<span aria-hidden="true">·</span>')}</div>
      ${d.map(u=>`<div class="mp-shadow-warn">⚠ ${u}</div>`).join("")}
      ${i}
      ${l}
    </section>`},p.shadowTrack=function(e){const n=window.Engine||window.__PP&&window.__PP.Engine;if(!n||!n.shadowSnapshot||!n.shadowDiff)return null;let r=null;try{r=n.shadowSnapshot(e)}catch{return null}if(!r||!r.shadow||!r.shadow.baseId)return null;const d="mp-shadow-v1";let i={};try{const u=window.localStorage?window.localStorage.getItem(d):null,g=u?JSON.parse(u):{};g&&typeof g=="object"&&!Array.isArray(g)&&(i=g)}catch{i={}}const m=i[r.shadow.baseId];let l=null;if(m)try{l=n.shadowDiff(m,r)}catch{l=null}r.at=Date.now(),i[r.shadow.baseId]=r;try{const u=Object.keys(i);if(u.length>24){u.sort((g,h)=>(Number(i[g]&&i[g].at)||0)-(Number(i[h]&&i[h].at)||0));for(const g of u.slice(0,u.length-24))delete i[g]}window.localStorage&&window.localStorage.setItem(d,JSON.stringify(i))}catch{}return l},p.traceHTML=function(e,n,r){if(!Array.isArray(e)||!e.length)return"";const d={liuyao:"六爻",bazi:"八字",ziwei:"紫微",qimen:"奇门",daliuren:"大六壬"}[n]||"命盘",i=e.map(g=>g&&g.field).filter(Boolean).join(" → "),m=typeof r=="string"?r:"",l=(g,h)=>{const b=String(g??"");return b.length>h?`${b.slice(0,h)}…`:b},u=e.map((g,h)=>{const b=Array.isArray(g.inputs)?g.inputs:[];return`<details class="mp-trace-step"${h===0?" open":""}>
        <summary><span class="mp-trace-no">${h+1}</span><span class="mp-trace-field">${a(g.field)}</span><span class="mp-trace-res">${a(l(g.result,44))}</span></summary>
        <div class="mp-trace-detail">
          <div class="mp-trace-rule"><b>规则</b>${a(g.rule)}</div>
          ${b.length?`<dl class="mp-trace-inputs">${b.map(T=>`<dt>${a(T.label)}</dt><dd>${a(T.value)}</dd>`).join("")}</dl>`:""}
          <div class="mp-trace-result"><b>结果</b>${a(g.result)}</div>
          ${g.source?`<div class="mp-trace-src"><b>出处</b>${a(g.source)}</div>`:""}
        </div>
      </details>`}).join("");return`<button type="button" class="mp-trace-card" data-trace-open aria-haspopup="dialog" aria-controls="mp-trace-layer">
        <span class="mp-trace-title">推导链</span><span class="mp-trace-flow">${a(i)}</span><span class="mp-trace-count">${e.length} 层 · 查看</span>
      </button>
      <div class="mp-trace-layer" id="mp-trace-layer" data-trace-layer aria-hidden="true">
        <div class="mp-trace-back" data-trace-close></div>
        <aside class="mp-trace-drawer" role="dialog" aria-modal="true" aria-labelledby="mp-trace-title">
          <div class="mp-trace-head">
            <div><b id="mp-trace-title">推导链 · ${a(d)}</b><span>${e.length} 层 · 每层给出规则、输入、结果与出处；只读，不重算</span></div>
            ${m?'<button type="button" class="mp-trace-copy" data-trace-copy aria-label="复制整条推导链的 Markdown">复制 Markdown</button>':""}
            <button type="button" class="mp-trace-close" data-trace-close aria-label="关闭推导链">✕</button>
          </div>
          <div class="mp-trace-body">${u}</div>
          ${m?`<textarea class="mp-trace-md" data-trace-md readonly hidden>${a(m)}</textarea>`:""}
        </aside>
      </div>`},p.almanacHTML=function(e){if(!e||!e.meta)return p.quickHTML(e);const n=e.ganzhi||{},r=e.dayGod||null,d=(z,N)=>(z||[]).map(M=>`<span class="mp-al-chip${N?` ${N}`:""}">${a(M)}</span>`).join(""),i=(z,N)=>N?`<div class="mp-al-cell"><em>${a(z)}</em><b>${a(N)}</b></div>`:"",m=e.xiu?`${e.xiu.name}宿（${e.xiu.luck}·${e.xiu.zheng}·${e.xiu.animal}）`:"",l=e.nayin&&e.nayin.day?e.nayin.day.name:"",u=e.chong?`${e.chong.text}${e.chong.sha?` ${e.chong.sha}`:""}`:"",g=(e.hours||[]).map(z=>`<span class="mp-al-hour ${z.luck==="吉"?"good":"bad"}"><i>${a(z.zhi)}</i><em>${a((z.ganZhi||"").slice(0,1))}</em><b>${a(z.shen||"")}</b><u>${a(z.luck||"")}</u></span>`).join(""),h=e.positions||{},b=(z,N)=>N?`<span class="mp-al-chip">${a(z)}·${a(typeof N=="string"?N:N.dir||"")}</span>`:"",T=e.lucky||{},k=r?`<span class="mp-al-badge ${r.luck==="吉"?"good":"bad"}">${a(r.name)}·${a(r.type)}·${a(r.luck)}</span>`:"";return`<section class="mp-al" aria-label="黄历">
      <div class="mp-al-h"><b>${a(e.meta.date||"")}</b><i>${a(e.meta.weekday||"")}　${a((e.lunar||{}).text||"")}</i></div>
      <div class="mp-al-gz">${a(n.year||"")}年　${a(n.month||"")}月　${a(n.day||"")}日　属${a(n.shengXiao||"")}　建除 ${a(e.zhiXing||"")}日　${k}</div>
      <div class="mp-al-yiji">
        <div class="mp-al-col"><em>宜</em><div class="mp-al-chips">${d(e.yi)}</div></div>
        <div class="mp-al-col"><em>忌</em><div class="mp-al-chips">${d(e.ji)}</div></div>
      </div>
      <div class="mp-al-grid">${i("二十八宿",m)}${i("日柱纳音",l)}${i("胎神",e.taiShen)}${i("冲煞",u)}</div>
      <div class="mp-al-row"><em>吉神方位</em><div class="mp-al-chips">${b("喜神",h.xiShen)}${b("财神",h.caiShen)}${b("福神",h.fuShen)}${b("阳贵",h.yangGui)}${b("阴贵",h.yinGui)}</div></div>
      <div class="mp-al-row"><em>时刻吉凶</em><div class="mp-al-hours">${g}</div></div>
      <div class="mp-al-row"><em>吉配生肖</em><div class="mp-al-chips">${T.liuhe?`<span class="mp-al-chip">六合·${a(T.liuhe)}</span>`:""}${d(T.sanhe||[])}</div></div>
      ${e.dailyHexagram?`<div class="mp-al-hex">每日一卦：<b>${a(e.dailyHexagram.name)}</b>　${a(e.dailyHexagram.meaning||"")}</div>`:""}
      <div class="mp-al-note">${a(e.meta&&e.meta.scope||"")}</div>
    </section>`},p.mbtiHTML=function(e){if(!e)return"";if(e.needAnswers&&Array.isArray(e.questions)){const i=e.questions.map(m=>`<li>${a(m.text)}</li>`).join("");return`<section class="mp-mb-paper" aria-label="十六型人格问卷">
        <div class="mp-mb-h">
          <span class="mp-mb-meta"><b>十六型人格问卷</b><i>${e.total} 题 · 每题 1 完全不像 / 5 很像我</i></span>
          <span class="mp-mb-count">填完分数再看结果</span>
        </div>
        <ol>${i}</ol>
        <div class="mp-mb-note">${a(e.note||"")}</div>
      </section>`}const n=(e.dims||[]).map(i=>{const m=Math.round((i.pct||0)*100),l=i.picked===i.left,u=Math.max(2,m),g=l?i.leftSay:i.rightSay;return`<div class="mp-mb-dim">
        <div class="mp-mb-dh"><b class="${l?"on":""}">${a(i.left)}</b><em>${a(i.name)}</em><b class="${l?"":"on"}">${a(i.right)}</b></div>
        <div class="mp-mb-bar ${l?"l":"r"}"><em style="width:${u}%"></em></div>
        <div class="mp-mb-df">取 ${a(i.picked)} · ${a(i.strength)} ${m}%</div>
        <div class="mp-mb-ds">${a(g)}</div>
      </div>`}).join(""),r=e.profile||{},d=(r.stack||[]).map((i,m)=>`<span class="${m===0?"lead":""}"><b>${a(i.code)}</b>${a(i.say)}</span>`).join("");return`<section class="mp-mb" aria-label="十六型人格结果">
      <div class="mp-mb-h">
        <span class="mp-mb-code">${a(e.type||"")}</span>
        <span class="mp-mb-meta"><b>${a(r.title||"")}</b><i>${a(r.keywords||"")}</i></span>
        <span class="mp-mb-count">已答 ${e.answered||0}/${e.total||0} 题</span>
      </div>
      <div class="mp-mb-body">
        <div class="mp-mb-dims">${n}</div>
        <div class="mp-mb-sec"><em>一句</em>${a(r.oneLine||"")}</div>
        <div class="mp-mb-two">
          <div><b>优势</b>${(r.strengths||[]).map(i=>a(i)).join("；")}</div>
          <div><b>留意</b>${(r.blindspots||[]).map(i=>a(i)).join("；")}</div>
        </div>
        ${d?`<div class="mp-mb-sec"><em>认知功能</em>主导 ${a((r.stack[0]||{}).code||"")} → 依次展开</div><div class="mp-mb-fn">${d}</div>`:""}
        <div class="mp-mb-sec"><em>工作</em>${a(r.work||"")}</div>
        <div class="mp-mb-sec"><em>关系</em>${a(r.love||"")}</div>
        <div class="mp-mb-sec"><em>学习</em>${a(r.study||"")}</div>
        <div class="mp-mb-sec"><em>课题</em>${a(r.growth||"")}</div>
      </div>
      <div class="mp-mb-note">${a(e.note||"")}</div>
    </section>`};const da=[["巽","离","坤"],["震","中","兑"],["艮","坎","乾"]],ca={坎:"正北",艮:"东北",震:"正东",巽:"东南",离:"正南",坤:"西南",兑:"正西",乾:"西北",中:"中宫"},ja=["生气","延年","天医","伏位"],be=(e,n)=>`<span class="mp-fs-chip${n?" "+n:""}">${a(e)}</span>`,Qe=(e,n,r)=>`<div class="mp-fs-cell${e==="中"?" center":""}"><div class="mp-fs-top"><span class="mp-fs-gua">${a(e)}</span><span class="mp-fs-dir">${a(ca[e]||"")}</span>${n||""}</div>`+(r||"")+"</div>",ea=e=>e.length?`<dl class="mp-fs-facts">${e.map(([n,r])=>`<div class="mp-fs-row"><dt>${a(n)}</dt><dd>${a(r)}</dd></div>`).join("")}</dl>`:"",ma=(e,n,r,d,i,m)=>`<section class="mp-quick mp-fs" aria-label="风水结果"><div class="mp-quick-h"><b>${a(e)}</b>${n?`<span class="mp-fs-sub">${a(n)}</span>`:""}</div>`+(r.length?`<div class="mp-fs-chips">${r.join("")}</div>`:"")+d+i+m.filter(Boolean).map(l=>`<div class="mp-fs-note">${a(l)}</div>`).join("")+"</section>",je=(e,n)=>`<div class="mp-fs-grid" role="group" aria-label="${a(n)}">`+da.map(r=>r.map(d=>{const i=e.find(u=>u&&u.palace===d);if(!i)return Qe(d,"","");const m=ja.includes(i.star),l=`<span class="mp-fs-star"${i.role?` title="${a(i.role)}"`:""}>${a(i.star)}<em class="${m?"ok":"bad"}">${m?"吉":"凶"}</em></span>`;return Qe(d,l,"")}).join("")).join("")+"</div>";function Ua(e,n){const r=n.period,d={};for(const k of e.palaces||[])d[k.palace]=k;const i=`<div class="mp-fs-key">每宫依次为 <b>运</b>／<b>山</b>／<b>向</b> 三星；底色高亮＝当运（${a(r)}运）</div><div class="mp-fs-grid" role="group" aria-label="玄空九宫（运/山/向）">`+da.map(k=>k.map(z=>{const N=d[z];if(!N)return Qe(z,"","");const M=[["运",N.yun],["山",N.shan],["向",N.xiang]].map(([V,I])=>`<span class="${I===r?"on":""}" title="${a(V)}星 ${a(I)}">${a(I)}</span>`).join("");return Qe(z,"",`<div class="mp-fs-nums">${M}</div>`)}).join("")).join("")+"</div>",m=e.wangShanWangXiang||{},l=n.jianXiang||{},u=e.timeFlying||null,g=[be(l.active?`兼${l.jian} ${l.offset}° · 替卦`:"正向 · 下卦",l.active?"ok":""),be(`山盘 ${n.shanCenter.star}${n.shanCenter.name} · ${n.shanCenter.fly}`),be(`向盘 ${n.xiangCenter.star}${n.xiangCenter.name} · ${n.xiangCenter.fly}`),be(m.byChart?"盘面：到山到向":"盘面：未到山到向",m.byChart?"ok":""),be(m.byTable===null?"表法：替卦不套":m.byTable?"表法：在列":"表法：未列",m.byTable?"ok":"")],h=(k,z)=>`${z} ${k.star}${k.name}（${k.fly}，${k.basis}${k.mode==="替卦"?`；原运星 ${k.original}${k.replaced?"，已替":"，用替而未替"}`:""}）`,b=u?[["year","年"],["month","月"],["day","日"],["hour","时"]].filter(([k])=>u[k]).map(([k,z])=>`${z}${u[k].centerName}（${u[k].fly}）`).join("　"):"",T=ea([...l.active?[["替卦",`${l.note}${m.byTable===null?" 正向旺山旺向表不适用于替卦。":""}`]]:[],["入中",`${h(n.shanCenter,"山盘")}；${h(n.xiangCenter,"向盘")}`],["当运",`山星${r}落 ${e.dangYun.shan.text}；向星${r}落 ${e.dangYun.xiang.text}`],["合十",`山星：${(e.heshi.shan||[]).join("、")||"无"}；向星：${(e.heshi.xiang||[]).join("、")||"无"}`],["表法",`${m.note||""}${(m.table||[]).length?` 本运所列：${m.table.join("、")}。`:" 本运表法无局。"}`],...b?[["年月日时",`${b}${u.meta&&u.meta.note?`　${u.meta.note}`:""}`]]:[]]);return ma(l.active?"玄空替卦":"玄空下卦",`${n.periodLabel} · 坐${n.sitting} · 向${n.facing}`,g,i,T,[n.note,e.disclaimer])}function qa(e,n){const r=e.mingGua||{},d=je([...e.luckyDirections||[],...e.unluckyDirections||[]],"八宅八向（吉凶）"),i=[be(r.compatible||"—"),be(`${n.gender}命 · ${n.guaYear} 年立春界`)],m=[];if(e.yearlyFlying){const l=e.yearlyFlying;m.push(["年紫白",`${l.centerName}入中；${l.palaces.filter(u=>u.palace!=="中").map(u=>`${u.palace}${u.name}`).join("、")}`])}return ma("八宅命卦",`${r.num}${r.gua}（${r.group}）· ${r.direction}`,i,d,ea(m),[n.note,e.disclaimer])}function qe(e,n){const r=e.layout||{},d=je(e.houseStars||[],"宅卦八向（吉凶）"),i=[be(`${n.houseGua}宅 · ${n.houseGroup}`),be(`坐${n.sitting}`),be(`向${n.facing}`)],m=[["门",r.door],["灶",r.stove],["床",r.bed],["厕",r.toilet]];return e.mingMatch&&m.push(["命宅配",e.mingMatch.text]),ma("门主灶",`${n.houseGua}宅 · 坐${n.sitting} · 向${n.facing}`,i,d,ea(m),[n.birthNote,e.disclaimer])}p.fengshuiHTML=function(e){if(!e||e.system!=="fengshui")return p.quickHTML(e);const n=e.meta||{};return n.action==="xuankong"?Ua(e,n):n.action==="advise"?qe(e,n):qa(e,n)},p.perfHTML=function(e){if(!e)return"";const n=u=>typeof u=="number"&&isFinite(u)?`${Math.max(0,Math.round(u))}ms`:"",r=e.cached===!0?"（已缓存）":e.cached===!1?"（首次加载）":"",d=[];n(e.engineMs)&&d.push(`引擎 ${n(e.engineMs)}${r}`),n(e.computeMs)&&d.push(`排盘 ${n(e.computeMs)}`),n(e.renderMs)&&d.push(`渲染 ${n(e.renderMs)}`);const i=n(e.totalMs);if(!d.length&&!i)return"";const m=i?`首屏 ${i}`:"耗时";return`<div class="mp-perf" title="本机这一次的实测耗时，不含网络与服务端；换机器、首次加载与已缓存会不同">${d.length?`${m}｜${d.join(" · ")}`:m}</div>`},p.zeriHTML=function(e){if(!e||!e.compare||e.compare.mode!=="candidates"||!Array.isArray(e.days))return p.quickHTML(e);const n=e.meta||{},r=e.compare.best?e.compare.best.date:"",d=e.days.map(l=>{const u=l.date===r,g=l.excluded||l.verdict==="回避"?"bad":l.verdict==="推荐"?"good":"";return`<tr class="mp-zr-row${u?" top":""}${l.excluded?" off":""}">
        <th scope="row"><b>${a(l.date)}</b>${u?'<i class="mp-zr-best">最优</i>':""}
          <em>${a(l.weekday)}　${a(l.lunar)}</em></th>
        <td><b>${a(l.dayGanZhi)}</b><em>${a(l.zhiXing)}日</em></td>
        <td class="mp-zr-score">${a(l.score)}</td>
        <td><span class="mp-zr-v ${g}">${a(l.verdict)}</span></td>
        <td class="mp-zr-why">${a(l.reasons.join("；")||"无特别加减分")}</td>
      </tr>`}).join(""),i=(l,u)=>`<span><em>${a(l)}</em>${u.length?a(u.join("、")):"无"}</span>`,m=e.compare.best?`这一组最优：<b>${a(e.compare.best.date)}</b>（${a(e.compare.best.score)} 分 · ${a(e.compare.best.verdict)}）`+(e.compare.best.ties.length>1?`；同分 ${a(e.compare.best.ties.filter(l=>l!==e.compare.best.date).join("、"))}`:""):"这一组都因冲属相被排除，没有可用的日子";return`<section class="mp-zr" aria-label="择日候选比较">
      <div class="mp-zr-h"><b>择日 · ${a(n.task||"")}</b>
        <span>候选 ${a(n.days)} 天${n.shengXiao?`　当事人属${a(n.shengXiao)}`:"（未给属相，未做冲煞排除）"}</span></div>
      <div class="mp-zr-lead">${m}</div>
      <table class="mp-zr-t"><thead><tr>
        <th scope="col">日期</th><th scope="col">日干支 / 建除</th><th scope="col">分</th><th scope="col">结论</th><th scope="col">理由</th>
      </tr></thead><tbody>${d}</tbody></table>
      <div class="mp-zr-lists">
        ${i("推荐",e.best)}${i("可用",e.usable)}${i("回避",e.avoid)}
      </div>
      <p class="mp-zr-note">${a(e.compare.note||"")}</p>
      <p class="mp-zr-note">${a(n.scope||"")}</p>
      <p class="mp-zr-note">${a(e.disclaimer||"")}</p>
    </section>`},p.quickHTML=function(e){if(!e)return"";const r={almanac:"黄历",zeri:"择日",chenggu:"称骨",xiaoliuren:"小六壬",star:"星座",numerology:"生命数字",trend:"人生 K 线",fengshui:"风水",name:"起名",convert:"公农历转换",mbti:"十六型人格"}[e.system]||"速查",d=e.summary||"",i=d?`<pre class="mp-quick-pre">${a(d)}</pre>`:"";return`<section class="mp-quick" aria-label="${a(r)}结果">
      <div class="mp-quick-h"><b>${a(r)}</b></div>
      ${i}
    </section>`},p.summaryCardPNG=function(e,n){try{if(typeof document>"u"||!document.createElement)return"";const r=n&&n.outline||[],d=(n&&n.tables||[]).filter(F=>Array.isArray(F.rows)&&F.rows.length),i=n&&n.systemLabel||e&&e.system||"命理报告",m=900,l=44,u=26,g=(F,U)=>`${U?"600 ":""}${F}px "PingFang SC","Microsoft YaHei","Noto Sans CJK SC",sans-serif`,h=document.createElement("canvas"),b=h.getContext?h.getContext("2d"):null;if(!b)return"";const T=(F,U)=>{const H=[];let f="";for(const O of String(F)){const D=f+O;b.measureText(D).width>U&&f?(H.push(f),f=O):f=D}return f&&H.push(f),H.length?H:[""]};b.font=g(15);let k=0;const z=r.map(F=>{const U=T(F.text,m-l*2-70);return k+=Math.min(U.length,2)*u+10,{o:F,lines:U.slice(0,2)}}),N=d[0]||null,M=N?N.rows.slice(0,6):[],V=N?54+M.length*34:0,I=150+k+(z.length?34:0)+V+120;h.width=m,h.height=I,b.fillStyle="rgb(255,255,255)",b.fillRect(0,0,m,I),b.fillStyle="rgb(31,111,63)",b.fillRect(0,0,m,8);let y=52;b.fillStyle="rgb(27,27,27)",b.font=g(28,!0),b.fillText(`${i} · 摘要`,l,y),y+=30,b.fillStyle="rgb(111,106,96)",b.font=g(14);const w=[e&&e.input&&e.input.datetime?`出生/起局：${e.input.datetime}`:"","本地计算 · 可复现"].filter(Boolean).join("　");if(b.fillText(w,l,y),y+=34,z.length){b.fillStyle="rgb(31,111,63)",b.font=g(16,!0),b.fillText("一页读懂",l,y),y+=26;for(const{o:F,lines:U}of z)b.fillStyle="rgb(138,131,120)",b.font=g(14,!0),b.fillText(F.label,l,y),b.fillStyle="rgb(63,58,51)",b.font=g(15),U.forEach((H,f)=>b.fillText(H,l+70,y+f*u)),y+=U.length*u+10;y+=8}if(N){b.fillStyle="rgb(31,111,63)",b.font=g(16,!0),b.fillText(N.title,l,y),y+=24,b.fillStyle="rgb(138,131,120)",b.font=g(13),b.fillText(N.columns.join(" · "),l,y),y+=8,b.strokeStyle="rgb(229,225,216)",b.beginPath(),b.moveTo(l,y),b.lineTo(m-l,y),b.stroke(),y+=22,b.fillStyle="rgb(63,58,51)",b.font=g(14);for(const F of M){const U=F.filter(Boolean).join(" · "),H=T(U,m-l*2)[0];b.fillText(H,l,y),y+=34}}return y=I-62,b.strokeStyle="rgb(229,225,216)",b.beginPath(),b.moveTo(l,y-18),b.lineTo(m-l,y-18),b.stroke(),b.fillStyle="rgb(138,131,120)",b.font=g(12),b.fillText("内容用于传统文化学习与自我探索，不构成医疗、投资、法律或人事决策依据。",l,y+6),b.fillText("dsh-metaphysics · 本机计算，未上传任何数据",l,y+26),h.toDataURL?h.toDataURL("image/png"):""}catch{return""}}})();const dt="dsh-metaphysics/history-v1";function li(){try{const s=window.localStorage&&window.localStorage.getItem(dt),p=s?JSON.parse(s):[];return Array.isArray(p)?p.slice(0,20):[]}catch{return[]}}function ct(s){try{window.localStorage&&window.localStorage.setItem(dt,JSON.stringify(s.slice(0,20)))}catch{}}const di=(s,p)=>s.kind===p.kind&&s.date===p.date&&s.time===p.time&&s.gender===p.gender&&s.address===p.address&&s.lines===p.lines&&s.question===p.question&&s.mhMode===p.mhMode&&s.upper===p.upper&&s.lower===p.lower;function ci(s,p){if(s==="bazi"){const J=["year","month","day","hour"].map(Q=>p.pillars&&p.pillars[Q]).filter(Boolean).map(Q=>Q.ganzhi).join(" ");return p.hourUnknown||p.pillars&&!p.pillars.hour?`${J}（时柱暂缺）`:J}return s==="ziwei"?`${p.soul?p.soul.branch:""}宫 ${p.bureau?p.bureau.name:""} ${p.lunar?p.lunar.year+"年":""}`.trim():s==="liuyao"?p.ben&&p.ben.name?p.ben.name:"":s==="meihua"?p.ben&&p.ben.name?`${p.ben.name} 动${p.moving}`:"":s==="daliuren"?`${p.dayGanZhi||""} ${p.geJu?p.geJu.name:""}`:""}const K=window.__PP,oa=()=>typeof performance<"u"&&performance.now?performance.now():Date.now();let mt=0;const Da=typeof window.__mpEnsureEngine=="function"?window.__mpEnsureEngine:async()=>window.Engine,mi=`
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
.mp-viewsw button.on{background:var(--dsw-alias-brand-primary);color:var(--mp-on-brand,#fff)}
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
.mp-tool.on b,.mp-tool.on span{color:var(--mp-on-brand,#fff)}
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
.mp-tab.on{background:var(--dsw-alias-brand-primary);border-color:transparent;color:var(--mp-on-brand,#fff);font-weight:600;box-shadow:0 8px 18px -12px var(--dsw-alias-brand-primary)}
.mp-field{display:flex;flex-direction:column;gap:5px;font-size:13px;color:var(--dsw-alias-label-secondary);min-width:0}
/* 「时辰未知」勾选：与时刻框同一行，字小一号，不抢主操作 */
.mp-chk{display:inline-flex;align-items:center;gap:5px;font-size:12.5px;color:var(--dsw-alias-label-secondary);cursor:pointer;user-select:none;white-space:nowrap}
.mp-chk input{margin:0;accent-color:var(--dsw-alias-brand-primary)}
.mp-input:disabled{opacity:.45;cursor:not-allowed}
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
.mp-quiz-o.on b,.mp-quiz-o.on span{color:var(--mp-on-brand,#fff)}
.mp-quiz-o:focus-within{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
.mp-quiz-nav{display:flex;align-items:center;gap:8px;margin-top:10px;flex-wrap:wrap}
.mp-quiz-btn{padding:6px 14px;border-radius:8px;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-primary);font-family:inherit;font-size:12.5px;cursor:pointer;min-height:32px}
.mp-quiz-btn:hover:not(:disabled){border-color:var(--dsw-alias-brand-primary)}
.mp-quiz-btn:disabled{opacity:.42;cursor:not-allowed}
.mp-quiz-btn.primary{border-color:transparent;background:var(--dsw-alias-brand-primary);color:var(--mp-on-brand,#fff);font-weight:600}
.mp-quiz-hint{margin-left:auto;font-size:12px;color:var(--dsw-alias-label-secondary);line-height:1.6}
.mp-btn{padding:8px 22px;border-radius:9px;border:none;background:var(--dsw-alias-brand-primary);color:var(--mp-on-brand,#fff);cursor:pointer;font-size:14px;font-weight:600;min-width:132px;
  box-shadow:0 10px 20px -14px var(--dsw-alias-brand-primary);transition:transform .14s,filter .14s,box-shadow .14s}
.mp-btn:hover{filter:brightness(1.06);transform:translateY(-1px)}
.mp-btn:active{transform:none;filter:brightness(.98)}
.mp-btn.ghost{background:transparent;border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-secondary);box-shadow:none}
.mp-btn.ghost:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);filter:none}
.mp-seg{display:flex;width:100%;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;overflow:hidden;height:36px}
.mp-seg button{flex:1;padding:0 8px;background:transparent;border:none;color:var(--dsw-alias-label-secondary);font-size:13px;cursor:pointer}
.mp-seg button.on{background:var(--dsw-alias-brand-primary);color:var(--mp-on-brand,#fff)}
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
/* C3 桥替代：一排小芯片（完整提问 / 精简追问 / 参数 / 深链），桥不可用时就是主通道 */
.mp-bridge{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:8px}
.mp-bridge-lbl{font-size:11.5px;color:var(--dsw-alias-label-secondary)}
.mp-bridge .mp-chip{font-size:11.5px;padding:3px 9px}
.mp-fx{margin-top:10px}
/* 验前事 / 生时校正 */
.mp-verify,.mp-rect{margin-top:12px;padding:12px;border:1px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-layer-2)}
.mp-verify-h{font-size:12px;font-weight:700;letter-spacing:.08em;color:var(--dsw-alias-label-secondary);margin-bottom:8px}
.mp-verify-row{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:12.5px;padding:3px 0}
.mp-verify-btns{display:flex;gap:4px}
.mp-chip{font-size:11.5px;padding:2px 8px;border-radius:999px;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer}
.mp-chip.on{background:var(--dsw-alias-brand-primary);color:var(--mp-on-brand,#fff);border-color:transparent}
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
`,{useState:S,useEffect:ra}=sa,fa=4,_e=12;let ba=null;function ha(){if(ba)return ba;let s=null;try{s=B.compute({system:"mbti"})}catch{s=null}const p=s&&s.questions||[];return p.length?(ba={total:s&&s.total||p.length,questions:p,scale:s&&s.scale||{}},ba):{total:0,questions:[],scale:{}}}function gi(s){const{answers:p,page:A,onPick:J,onPage:Q,onSubmit:oe,onClear:ue}=s,de=ha(),a=Math.max(1,Math.ceil(de.total/fa)),P=A*fa,ce=de.questions.slice(P,P+fa),pe=p.filter(W=>W!=null).length,xe=de.total?Math.round(pe/de.total*100):0,ee=A>=a-1,ae=pe>=_e;return o("div",{className:"mp-quiz"},o("div",{className:"mp-quiz-top"},o("div",{className:"mp-quiz-bar","aria-hidden":"true"},o("i",{style:{width:xe+"%"}})),o("span",{className:"mp-quiz-count"},`第 ${A+1} / ${a} 页 · 已答 ${pe} / ${de.total}`)),o("div",{className:"mp-quiz-list"},ce.map((W,X)=>{const te=P+X;return o("div",{key:W.id||te,className:"mp-quiz-q"},o("div",{className:"mp-quiz-qt"},o("b",null,String(te+1).padStart(2,"0")),o("span",null,W.text)),o("div",{className:"mp-quiz-opts",role:"radiogroup","aria-label":`第 ${te+1} 题`},[1,2,3,4,5].map(fe=>o("label",{key:fe,className:"mp-quiz-o"+(p[te]===fe?" on":"")},o("input",{type:"radio",name:`mpmbq${te}`,value:String(fe),checked:p[te]===fe,onChange:()=>J(te,fe)}),o("b",null,String(fe)),o("span",null,de.scale[fe]||"")))))})),o("div",{className:"mp-quiz-nav"},o("button",{className:"mp-quiz-btn",disabled:A<=0,onClick:()=>Q(-1)},"上一页"),ee?null:o("button",{className:"mp-quiz-btn",onClick:()=>Q(1)},"下一页"),o("button",{className:"mp-quiz-btn primary",disabled:!ae,onClick:oe},"看结果"),o("button",{className:"mp-quiz-btn",onClick:ue},"清空"),o("span",{className:"mp-quiz-hint"},ae?`已够 ${_e} 题，可以看结果；答完 ${de.total} 题会更准。`:`答满 ${_e} 题可先看结果（还差 ${_e-pe} 题）。`)))}class ui extends(sa.Component||Object){constructor(p){super(p),this.state={err:null}}static getDerivedStateFromError(p){return{err:p}}componentDidCatch(p,A){console.error("[metaphysics] 面板渲染异常",p,A)}render(){if(!this.state.err)return this.props.children;const p=this.state.err,A=String(p&&p.stack||"").split(`
`).slice(0,14).join(`
`);return o("div",{className:"mp-wrap"},o("div",{className:"mp-panel"},o("div",{className:"mp-lbl"},"命理面板渲染出错——把下面这段发给我"),o("pre",{style:{whiteSpace:"pre-wrap",fontSize:12,lineHeight:1.5,maxHeight:320,overflow:"auto",margin:"8px 0"}},String(p&&p.message||p)+`

`+A),o("div",{className:"mp-lbl"},"环境：__PP "+typeof K+" · Engine "+typeof window.Engine+" · React "+typeof sa+" · 版本 "+(typeof K=="object"&&K&&(window.__MP_VER||"?")))))}}function xi(s){const p=s&&s.size?s.size:20,A=s&&s.active;return o("svg",{width:p,height:p,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.6,strokeLinecap:"round","aria-hidden":!0,style:{opacity:A?1:.72}},o("circle",{cx:12,cy:12,r:8.2}),o("path",{d:"M12 3.8a4.1 4.1 0 0 1 0 8.2 4.1 4.1 0 0 0 0 8.2"}),o("circle",{cx:12,cy:8,r:1.1,fill:"currentColor",stroke:"none"}),o("circle",{cx:12,cy:16,r:1.1,fill:"currentColor",stroke:"none"}))}const Fe=[{k:"ziwei",label:"紫微",timeLabel:"出生时刻",hint:"紫微斗数需要出生日期、时刻与性别；出生地只影响真太阳时修正。"},{k:"bazi",label:"八字",timeLabel:"出生时刻",hint:"四柱八字按节气与真太阳时定时柱，出生地越准，时柱越稳。"},{k:"liuyao",label:"六爻",timeLabel:"起卦时刻",hint:"六爻不需要出生时间：只用起卦当下的日辰定六神、月建定旺衰，卦由摇出。"},{k:"meihua",label:"梅花",timeLabel:"起卦时刻",hint:"梅花用起卦时刻的年月日时数成卦，也可直接给两个数字起卦；与出生时间无关。"},{k:"daliuren",label:"六壬",timeLabel:"起卦时刻",hint:"大六壬用起卦时刻的日干支、时支与月将起天地盘；同样与出生时间无关。"},{k:"qimen",label:"奇门",timeLabel:"起局时刻",hint:"奇门时家转盘：用起局时刻定节气、三元与局数；换局规则决定符头与节气如何对齐。"},{k:"hepan",label:"合盘",timeLabel:"你的出生时刻",hint:"合盘按「日主 + 夫妻宫 + 五行互补」看两个人的相处与互补，需要双方出生信息。"},{k:"tarot",label:"塔罗",timeLabel:"",hint:"塔罗不看时间，只记录抽牌时刻与你的提问。"},{k:"almanac",label:"黄历",timeLabel:"",hint:"黄历按公历日期查农历、干支、宜忌、时辰吉凶、二十八宿与吉神方位；只做本地计算。"},{k:"convert",label:"农历",timeLabel:"",hint:"公农历互转：公历生日可反查农历；只知道农历生日时，可转成公历再排盘。"},{k:"zeri",label:"择日",timeLabel:"",hint:"择日把区间内每天的建除宜忌与事项适配打分排序，并按属相排除冲煞日。"},{k:"chenggu",label:"称骨",timeLabel:"出生时刻",hint:"称骨按农历年、月、日、时的骨重求和；时辰必填。"},{k:"xiaoliuren",label:"小六壬",timeLabel:"起课时刻",hint:"小六壬用农历月/日/时掐指，也可用三个随机数起课。"},{k:"star",label:"星座",timeLabel:"",hint:"星座按公历日期给出太阳星座与当日基调；同日同星座结果固定。"},{k:"numerology",label:"生命数字",timeLabel:"",hint:"生命数字按公历生日归约出生命路径数、生日数与态度数。"},{k:"mbti",label:"人格",timeLabel:"",hint:"十六型人格是 24 道自我报告题的 MBTI 风格测算：4 题一页，按 1–5 打分，答满 12 题即可看结果；只作自我参照，不是官方量表。"},{k:"trend",label:"人生K线",timeLabel:"出生时刻",hint:"人生 K 线按大运与流年十神给逐年运势分，画成走势图。"},{k:"fengshui",label:"风水",timeLabel:"",hint:"风水看八宅命卦、大游年四吉四凶与流年九宫飞星；也可按坐向看门主灶倾向，或按运与坐向排玄空下卦盘。"},{k:"name",label:"起名",timeLabel:"",hint:"起名按八字喜用匹配字库五行，可评估现有名字或生成候选名。"}];function Xe(s){return String(s).padStart(2,"0")}const Ia=["almanac","convert","zeri","chenggu","xiaoliuren","star","numerology","trend","fengshui","name"],fi=Array.isArray(window.__MPGroups)?window.__MPGroups:[],gt="mp.recent.tabs",ut="mp.first.view",xt=3;function ft(s){try{return JSON.parse(window.localStorage.getItem(s)||"null")}catch{return null}}function bt(s,p){try{window.localStorage.setItem(s,JSON.stringify(p))}catch{}}function bi(s){const p=new Date(s);if(Number.isNaN(p.getTime()))return"";const A=Q=>new Date(Q.getFullYear(),Q.getMonth(),Q.getDate()).getTime(),J=Math.round((A(new Date)-A(p))/864e5);return J<=0?"今天":J===1?"昨天":`${Xe(p.getMonth()+1)}-${Xe(p.getDate())}`}function Ba(){const s=new Date;return{date:`${s.getFullYear()}-${Xe(s.getMonth()+1)}-${Xe(s.getDate())}`,time:`${Xe(s.getHours())}:${Xe(s.getMinutes())}`}}const hi={ziwei:"birth",bazi:"birth",hepan:"birth",liuyao:"cast",meihua:"cast",daliuren:"cast",qimen:"cast",tarot:"none",almanac:"date",zeri:"date",star:"date",numerology:"date",convert:"date",chenggu:"birth",trend:"birth",fengshui:"birth",name:"birth",xiaoliuren:"cast",mbti:"none"},ht={date:"1990-05-12",time:"14:30"},Ga=s=>hi[s]||"none",Pe=window.__MPCore||{},Oe=Pe.needAsk||(s=>!1),re={ref:null,seats:[],keys:"",injectType:"",spec:"",errs:[],regs:0,mounted:0},Be={r:null,q:"",it:null};function vt(){const s=[];return s.push("inputActions "+(re.ref?"已拿到":"未拿到")),s.push("渲染 "+re.mounted+" 次"),s.push("注册 "+re.regs+" 次"),s.push("inject "+(re.injectType||"?")),s.push("槽位 "+(re.spec||"?")),re.errs.length&&s.push("错误："+re.errs.join(" / ")),"桥自检："+s.join("；")}function yt(s){if(re.errs.length>=3)return;const p=s&&s.message?String(s.message):String(s);re.errs.push(p.slice(0,90))}function vi(s){if(!s)return null;const p=s.inputActions;if(p&&typeof p.setDraft=="function"&&typeof p.submit=="function")return p;const A=s.actions&&s.actions.input;return A&&typeof A.setDraft=="function"&&typeof A.submit=="function"?A:null}function $t(s,p){const A=vi(s);return ra(()=>{if(re.seats.indexOf(p)<0&&re.seats.push(p),re.keys=s?Object.keys(s).join(","):"",A){re.ref=A;try{window.__MPComposer=A}catch{}}return()=>{re.ref===A&&(re.ref=null)}},[A,p]),A}function yi(){const s=Be.r;if(!s)return"";try{const p=B.askPrompt?B.askPrompt(s,{question:Be.q,interpret:Be.it}):null;return p&&p.text||String(s.summary||"")}catch{return String(s.summary||"")}}function wt(s){return re.mounted+=1,$t(s,"input.right")?o("button",{type:"button",className:"mp-chip ok",title:Be.r?"把上一张盘的摘要和问题发进对话窗":"先在侧栏「命理」里排一张盘",onClick:()=>{const A=yi();A&&zt(A)}},"命理·问"):o("span",{className:"mp-chip warn",title:"命理：已占住输入框槽位，但没拿到 inputActions；把这句话告诉作者"},"命理·未就绪")}function kt(s){return re.mounted+=1,$t(s,"composer.dock"),null}function zt(s){let p=re.ref;if(!p)try{p=window.__MPComposer||null}catch{p=null}return!p||typeof p.setDraft!="function"||typeof p.submit!="function"?!1:(p.setDraft(s),p.submit(),!0)}function $i(){const[s,p]=S("ziwei"),[A,J]=S("1990-05-12"),[Q,oe]=S("14:30"),[ue,de]=S(!1),[a,P]=S("female"),[ce,pe]=S(""),[xe,ee]=S("1992-08-15"),[ae,W]=S("10:00"),[X,te]=S("female"),[fe,Ya]=S(""),[Je,Ge]=S("bazi"),[Le,pa]=S(!1),[Ze,va]=S("1990-01-01"),[ya,$a]=S("12:00"),[wa,ka]=S("male"),[la,Ka]=S(""),[za,Va]=S("chaibu"),[Ye,da]=S(!0),[ca,ja]=S(!0),[be,Qe]=S("same-day"),[ea,ma]=S(!1),[je,Ua]=S(""),[qa,qe]=S(""),[e,n]=S(null),[r,d]=S({}),[i,m]=S(null),[l,u]=S([{year:"2019",kind:"career"},{year:"2022",kind:"love"}]),[g,h]=S(null),[b,T]=S("开业"),[k,z]=S("30"),[N,M]=S(""),[V,I]=S(""),[y,w]=S("solar2lunar"),[F,U]=S(""),[H,f]=S(!1),[O,D]=S("time"),[ie,ne]=S(""),[me,Ce]=S(""),[Ne,ye]=S(""),[$e,Ae]=S(()=>new Array(ha().total).fill(null)),[Ke,Me]=S(0),[C,c]=S("60"),[v,G]=S("natal"),[Z,ge]=S("9"),[E,le]=S("子"),[we,he]=S("午"),[ke,aa]=S("assess"),[ta,Wa]=S("李"),[qt,ji]=S(""),[Nt,qi]=S("6"),[Mt,Ni]=S(!1),[St,Xa]=S(""),[$,He]=S(null),[Mi,Ct]=S(null);ra(()=>{$&&$.r&&(Be.r=$.r,Be.q=je.trim(),Be.it=$.it||null)},[$,je]);const[Tt,Lt]=S(()=>li()),[ia,Si]=S(()=>ft(ut)==="flat"?"flat":"group"),[Ci,Ti]=S(()=>{const t=ft(gt);return Array.isArray(t)?t:[]}),[Li,Ai]=S({}),[Ja,At]=S(null),[Na,Ee]=S(""),[Ht,Ma]=S(""),[Hi,Sa]=S(!1),[Qa,Et]=S("3"),[Ca,et]=S(""),[Ve,_t]=S("general"),[Ft,Ei]=S(null),[_i,Ta]=S(!1),[Re,Pt]=S("time"),[La,Ot]=S(""),[Aa,Rt]=S(""),[Ha,Dt]=S(""),[Fi,Ue]=S(""),[at,Ea]=S({birth:null,cast:null}),Pi=Fe.find(t=>t.k===s)||Fe[0],ga=s==="bazi"||s==="ziwei"||s==="hepan"||s==="chenggu"||s==="trend"||s==="fengshui"||s==="name",Se=Ga(s),It=!(s==="meihua"&&Re==="number"),Bt=s!=="tarot"&&s!=="mbti"&&It,Gt=Bt&&Se!=="date",wn=Gt,ve=async(t,x,L,_)=>{const q=t||s,se=L||Re,De=q==="bazi"||q==="trend",Ie=_&&typeof _.hourUnknown=="boolean"?_.hourUnknown:ue,ze=x||(De&&Ie?{date:A,time:"12:00"}:{date:A,time:Q}),Te=_&&_.gender?_.gender:a,ua=_&&typeof _.address=="string"?_.address:ce,Fa=_&&typeof _.trueSolar=="boolean"?_.trueSolar:Ye,Pa=_&&typeof _.lateZi=="boolean"?_.lateZi:ca,ei=_&&typeof _.lines=="string"?_.lines:St,Oa=_&&typeof _.question=="string"?_.question:Ca,ai=oa(),xn=++mt;Ct(null),Ma("");try{let We=0,ti=null;Sa(!0);try{await Da(q);const R=window.__MP_LAST_LOAD;We=R&&typeof R.ms=="number"?R.ms:oa()-ai,ti=R&&typeof R.cached=="boolean"?R.cached:null}catch(R){Ee(R&&R.message?R.message:String(R)),He(null);return}finally{Sa(!1)}const ii=`${ze.date}T${ze.time}`,j={system:q};if(j.shadow=q!=="mbti",j.trace=q==="liuyao"||q==="bazi"||q==="ziwei"||q==="qimen"||q==="daliuren",q!=="tarot"&&(j.datetime=ii),q==="bazi"||q==="ziwei"||q==="hepan"){if(j.gender=Te,j.trueSolar=Fa,ua.trim()){j.address=ua.trim();try{const R=await B.geocodeAddress(j.address,{online:Mt});R&&typeof R.lon=="number"&&(j.longitude=R.lon,j.geo=R)}catch(R){console.error("[metaphysics] 地址解析失败，退回内置表",R)}}q!=="hepan"&&(j.cross=ea),j.lateZi=Pa,De&&Ie&&(j.hourUnknown=!0)}if(q==="liuyao"){const R=Pe.parseLines(ei);R.lines?j.lines=R.lines:R.warning&&Ma(R.warning)}if(q==="qimen"&&(j.juMethod=za,j.lateZiHourMode=be,j.direction=Ve),q==="bazi"&&(j.verifyPast=6),q==="zeri"){j.startDate=ze.date,j.task=b,j.days=Number(k)||30,N&&(j.shengXiao=N);const R=V.split(/[,，、\s]+/).filter(Boolean);R.length&&(j.candidates=R)}if(q==="xiaoliuren")if(j.mode=O,O==="number")j.num1=Number(ie)||void 0,j.num2=Number(me)||void 0,j.num3=Number(Ne)||void 0;else{j.date=ze.date;const R=Number(String(ze.time).split(":")[0]);j.hour=Number.isFinite(R)?R:12}if(q==="mbti"){delete j.datetime;const R=$e.slice();for(;R.length&&R[R.length-1]==null;)R.pop();R.length&&(j.answers=R)}if(q==="trend"&&De&&Ie&&(j.hourUnknown=!0),q==="trend"&&(j.gender=Te,j.toAge=Number(C)||60,j.trueSolar=Fa,j.lateZi=Pa),q==="fengshui"&&(j.action=v,v==="natal"?j.gender=Te:(j.sitting=E,j.facing=we,delete j.datetime,v==="xuankong"&&(j.period=Number(Z)||9))),q==="name"&&(j.action=ke,j.surname=ta.trim(),ke==="generate"?(j.gender=Te,j.limit=Number(Nt)||6,j.trueSolar=Fa,j.lateZi=Pa):(j.givenName=qt.trim(),(!ze.date||!ze.time)&&delete j.datetime)),q==="convert")if(j.system="convert",y==="lunar2solar"){const R=/^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(F).trim());if(!R){Ee("农历转公历请按「农历年-月-日」填写，例如 2026-9-17；闰月单独勾选。");return}j.mode="lunar2solar",j.lunarYear=Number(R[1]),j.lunarMonth=Number(R[2]),j.lunarDay=Number(R[3]),j.isLeapMonth=H,delete j.datetime}else j.mode="solar2lunar";if(q==="tarot"&&(j.count=Number(Qa)),q==="hepan"&&(j.chart=Je,j.partner={datetime:`${xe}T${ae}`,gender:X,address:fe.trim()||void 0,trueSolar:Ye},Le&&(j.partner2={datetime:`${Ze}T${ya}`,gender:wa,address:la.trim()||void 0,trueSolar:Ye})),Oe(q)){if(!Oa.trim()){Ee("请先填写「所问之事」——一句话即可，例如：今年是否适合换工作？"),Ta(!0),He(null);return}Ta(!1),j.question=Oa.trim(),q==="liuyao"&&(j.direction=Ve)}if(q==="meihua"&&(j.mode=se,se==="number")){if(La.trim()===""||Aa.trim()===""){Ee("数字起卦需要填两个数（第一个数定上卦、第二个数定下卦）。"),He(null);return}if(j.upper=Number(La),j.lower=Number(Aa),!Number.isFinite(j.upper)||!Number.isFinite(j.lower)){Ee("两个数都要是数字，例如 17 和 29。"),He(null);return}Ha!==""&&(j.changing=Number(Ha))}const fn=oa(),na=B.compute(j),bn=oa()-fn;let it=null;try{it=K.shadowTrack?K.shadowTrack(na):null}catch{it=null}let nt=null;if(q==="bazi")try{nt=B.compute({system:"trend",datetime:ii,gender:Te,toAge:100,trueSolar:Fa,lateZi:Pa,...j.dst!==void 0?{dst:j.dst}:{},...j.address?{address:j.address}:{},...typeof j.longitude=="number"?{longitude:j.longitude}:{},...j.geo?{geo:j.geo}:{}})}catch{nt=null}let st=null;if(B.caliberCompare)try{st=B.caliberCompare(j)}catch{st=null}const hn=Oe(q)||q==="qimen"?{question:Oe(q)?Oa.trim():"",direction:Ve}:void 0,Ra=B.interpret?B.interpret(na,hn):null;Ra&&na.cross&&B.crossSection&&(Ra.sections=[...Ra.sections||[],B.crossSection(na.cross)]);const vn=Ga(q)==="cast"&&(q!=="meihua"||se==="time");He({kind:q,r:na,it:Ra,at:ze,timed:vn,trend:nt,caliber:st,shadowDiff:it});const ni=R=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>R>1?ni(R-1):si()):setTimeout(si,0)},si=()=>{xn===mt&&Ct({engineMs:We,computeMs:bn,cached:ti,totalMs:oa()-ai,renderMs:null})};if(ni(2),n(null),m(null),d({}),h(null),Ee(""),Ue(""),q!=="tarot"&&q!=="mbti"){const R={kind:q,date:A,time:Q,gender:a,address:ce,lines:q==="liuyao"?ei:"",question:Oe(q)?Oa.trim():"",direction:Ve,count:Qa,mhMode:Re,upper:La,lower:Aa,changing:Ha,label:ci(q,na),at:Date.now()};Lt(yn=>{const oi=[R,...yn.filter($n=>!di($n,R))].slice(0,20);return ct(oi),oi})}}catch(We){Ee(We&&We.message?We.message:String(We)),He(null)}},Oi=async t=>{const x=Ga(t);if(Ee(""),t==="mbti"){Ma(""),Sa(!0);try{await Da(t)}catch(_){Ee(_&&_.message?_.message:String(_))}finally{Sa(!1)}p(t),$e.filter(_=>_!=null).length>=_e?ve(t):He(null);return}if(p(t),x==="none"){ve(t);return}const L=at[x]||(x==="cast"?Ba():{date:ht.date,time:ht.time});J(L.date),oe(L.time),ve(t,L)},Ri=t=>{Fe.some(x=>x.k===t)&&Ti(x=>{const L=(x||[]).filter(q=>q&&q.tab&&q.tab!==t),_=[{tab:t,at:Date.now()}].concat(L).slice(0,xt);return bt(gt,_),_})},Zt=t=>{const x=t==="flat"?"flat":"group";Si(x),bt(ut,x)},tt=t=>{Ri(t),Oi(t)},Di=t=>{J(t),Se!=="none"&&Ea(x=>Object.assign({},x,{[Se]:{date:t,time:Q}}))},Ii=t=>{oe(t),Se!=="none"&&Ea(x=>Object.assign({},x,{[Se]:{date:A,time:t}}))},kn=()=>{const t=Ba();J(t.date),oe(t.time),Se!=="none"&&Ea(x=>Object.assign({},x,{[Se]:null})),ve(s,t)},Yt=()=>{if(s==="mbti"){const t=$e.filter(x=>x!=null).length;if(t<_e){Ma(`先答满 ${_e} 题再看结果（现答 ${t} 题，还差 ${_e-t} 题）。`);return}ve(s);return}if(Se!=="none"&&!at[Se]){const t=Ba();J(t.date),oe(t.time),ve(s,t);return}ve(s)},Bi=()=>{const t={date:"1990-05-12",time:"14:30"};p("bazi"),P("male"),pe("河北石家庄"),Ea(x=>Object.assign({},x,{birth:t})),J(t.date),oe(t.time),ve("bazi",t,null,{gender:"male",address:"河北石家庄"})},Kt=t=>{Pt(t),ve(s,{date:A,time:Q},t)},Gi=()=>!!(window.matchMedia&&window.matchMedia("(max-width: 640px)").matches),Zi=()=>Ft===null?Gi():Ft,_a=(t,x,L)=>{if(!x)return;const _=se=>{t.textContent=se?"已复制":"复制失败",setTimeout(()=>{t.textContent=L},1400)},q=()=>{try{const se=document.createElement("textarea");se.value=x,se.setAttribute("readonly",""),se.style.position="fixed",se.style.opacity="0",document.body.appendChild(se),se.select();const De=!!(document.execCommand&&document.execCommand("copy"));return document.body.removeChild(se),De}catch{return!1}};try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(x).then(()=>_(!0),()=>_(q()));return}}catch{}_(q())},Yi=t=>_a(t,t.getAttribute("data-shadow-copy")||"","复制 ID"),Ki=t=>_a(t,t.getAttribute("data-handle-copy")||"","复制句柄"),Vi=t=>{const x=t.closest(".mp-trace-layer")||document.getElementById("mp-trace-layer"),L=x&&x.querySelector("[data-trace-md]");_a(t,L?L.value:"","复制 Markdown")},Ui=()=>{try{return String(location.href).split("#")[0]}catch{return""}},Wi=()=>{if(!$||!$.r)return null;try{return B.askPackages?B.askPackages($.r,{question:je.trim(),interpret:$.it,base:Ui()}):null}catch{return null}},Vt=[["full","复制提问","完整提问：盘面摘要 + 阅读层次 + 回答骨架，粘进任何对话窗都能用"],["brief","复制精简","一句话版：体系 + 排盘句柄 + 你的问题，够助手认出是哪张盘"],["structured","复制参数","结构化参数（JSON）：助手可直接照 args 调 compute，不必解析自然语言"],["link","复制深链","深链：把这张盘的参数编进链接，打开即还原同一张盘（换台机器、发给朋友都行）"]],Xi=(t,x)=>{const L=Wi();if(!L){qe("还没有可以复制的盘：先排一张。");return}const _=t==="link"?L.link:L[t];if(!_){qe(t==="link"?"这张盘没拿到句柄（随机抽牌只复现参数、不复现牌面），深链做不出来；用「复制提问」那一档。":"这一档暂时是空的，换一档试试。");return}_a(x,_,Vt.find(q=>q[0]===t)[1]),t==="link"&&qe("深链已复制：打开就还原这张盘，也可以直接发给别人。链接里是编码不是加密，别公开贴。")},Ji=()=>{const t=document.getElementById("mp-trace-layer");if(!t)return;t.classList.add("open"),t.setAttribute("aria-hidden","false");const x=t.querySelector("[data-trace-close]");x&&x.focus&&x.focus()},Ut=()=>{const t=document.getElementById("mp-trace-layer");if(!t)return;t.classList.remove("open"),t.setAttribute("aria-hidden","true");const x=document.querySelector("[data-trace-open]");x&&x.focus&&x.focus()},Qi=t=>{const x=t.target&&t.target.closest?t.target.closest("[data-shadow-copy]"):null;if(x){Yi(x);return}const L=t.target&&t.target.closest?t.target.closest("[data-handle-copy]"):null;if(L){Ki(L);return}if(t.target&&t.target.closest?t.target.closest("[data-trace-open]"):null){Ji();return}const q=t.target&&t.target.closest?t.target.closest("[data-trace-copy]"):null;if(q){Vi(q);return}if(t.target&&t.target.closest?t.target.closest("[data-mp-askcopy]"):null){tn();return}if(t.target&&t.target.closest?t.target.closest("[data-trace-close]"):null){Ut();return}const Ie=t.target&&t.target.closest?t.target.closest(".mp-it-head"):null;if(!Ie)return;const ze=Ie.closest(".mp-it");if(!ze)return;const Te=!ze.classList.contains("folded");ze.classList.toggle("folded",Te),Ie.setAttribute("aria-expanded",Te?"false":"true");const ua=Ie.querySelector(".mp-it-hint");ua&&(ua.textContent=Te?"点击展开":"点击收起"),Ei(Te)},Wt=(t,x)=>{if(!$||!(Oe(s)||s==="qimen"))return;const L={question:Oe(s)?(x===void 0?Ca:x).trim():"",direction:t===void 0?Ve:t},_=B.interpret?B.interpret($.r,L):null;let q=$.r;if((s==="liuyao"||s==="qimen")&&q&&q.trace&&B.buildTrace)try{const se=s==="liuyao"?B.buildTrace(q,{direction:L.direction,gender:q.useGod&&q.useGod.gender||"male",refresh:!0}):B.buildTrace(q,{direction:L.direction});se&&(q=Object.assign({},q,{trace:se}))}catch{}He(Object.assign({},$,{r:q,it:_}))},en=t=>!t||!t.timed||!t.at?"":`<div class="mp-cast">起卦时刻：<b>${t.at.date} ${t.at.time}</b>　（来自你的本机时间，点「此刻」可重新取当下）</div>`,an=()=>{try{const t=$&&$.r&&$.r.summary?$.r.summary:"";if(!t)return;navigator.clipboard.writeText(t).then(()=>Ue("已复制"),()=>Ue("复制失败"))}catch{Ue("复制失败")}},tn=()=>{if(!$||!$.r||!window.Engine||!window.Engine.buildEventPrompt)return;const t=Pe&&Pe.kindOfDirection?Pe.kindOfDirection(Ve):"other";let x;try{x=window.Engine.buildEventPrompt($.r,{question:(Ca||"").trim(),kind:t,gender:a,timeKnown:!0})}catch{x=null}x&&x.text&&navigator.clipboard.writeText(x.text).then(()=>Ue("已复制问事提示"),()=>Ue("复制失败"))},Xt=()=>{if(!(!$||!$.r||!je.trim()))try{n(B.followup?B.followup($.r,je.trim()):null)}catch(t){n({question:je.trim(),ok:!1,answer:"追问失败："+(t&&t.message?t.message:t),evidence:[],confidence:"弱"})}},nn=()=>{if(!(!$||!$.r))try{const t=B.askPrompt?B.askPrompt($.r,{question:je.trim(),interpret:$.it}):null,x=t&&t.text?t.text:String($.r.summary||"");if(zt(x)){qe("已发到对话窗，往下看回复。");return}const L="（"+vt()+"）";navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(x).then(()=>qe("对话输入框还没就绪"+L+"，已复制提问；粘进对话窗回车即可。"),()=>qe("对话输入框还没就绪"+L+"，复制也没成功；先点「复制文字结果」再贴。")):qe("对话输入框还没就绪"+L+"；先点「复制文字结果」再贴进对话窗。")}catch(t){qe("发到对话窗失败："+(t&&t.message?t.message:t))}},sn=()=>{if(!(!$||!$.r))try{const t=B.renderText?B.renderText($.r):$.r.summary||"",x=new Blob([t],{type:"text/markdown;charset=utf-8"}),L=document.createElement("a");L.href=URL.createObjectURL(x),L.download=`命理报告-${$.r.system}.md`,document.body.appendChild(L),L.click(),L.remove(),setTimeout(()=>URL.revokeObjectURL(L.href),2e3)}catch(t){console.error("[metaphysics] 导出失败",t)}},on=()=>{if(!(!$||!$.r))try{const t=K.summaryCardPNG?K.summaryCardPNG($.r,$.it):"";if(!t){Ue("当前环境不支持 Canvas 导出");return}const x=document.createElement("a");x.href=t,x.download=`命理摘要-${$.r.system}.png`,document.body.appendChild(x),x.click(),x.remove()}catch(t){console.error("[metaphysics] 长图导出失败",t)}},Jt={fontSize:12,padding:"5px 12px"},rn=()=>{!$||!$.r||!$.r.past||m(B.verifyFit?B.verifyFit($.r.past.rows,r):null)},pn=()=>{if(!(!$||$.kind!=="bazi"))try{const[t,x,L]=String(A).split("-").map(Number),[,_]=String(Q).split(":").map(Number),q=l.filter(se=>Number(se.year)).map(se=>({year:Number(se.year),kind:se.kind}));h(B.rectifyBirth?B.rectifyBirth({base:{year:t,month:x,day:L,minute:Number.isFinite(_)?_:0},gender:a,events:q,lateZi:ca,trueSolar:Ye,address:ce.trim()||void 0}):{error:"当前客户端未加载生时校正模块"})}catch(t){h({error:t&&t.message?t.message:String(t)})}},Y=(t,x)=>o("label",{className:"mp-field"},o("span",{className:"mp-lbl"},t),x),ln=t=>{p(t.kind),t.date&&J(t.date),t.time&&oe(t.time),t.gender&&P(t.gender),pe(t.address||""),Xa(t.lines||""),et(t.question||""),_t(t.direction||"general"),Et(t.count||"3"),Pt(t.mhMode||"time"),Ot(t.upper||""),Rt(t.lower||""),Dt(t.changing||""),Ta(!1),At(t)},dn=()=>{Lt([]),ct([])},cn=t=>{const x=B.formOf?B.formOf(t):null;if(!x){ve("ziwei");return}const L=Fe.some(De=>De.k===x.tab)?x.tab:"ziwei",_={date:x.date||A,time:x.time||Q},q=x.lines===void 0?void 0:Array.isArray(x.lines)?x.lines.join(" "):String(x.lines);x.date&&J(x.date),x.time&&oe(x.time),x.gender&&P(x.gender),typeof x.address=="string"&&pe(x.address),typeof x.trueSolar=="boolean"&&da(x.trueSolar),typeof x.lateZi=="boolean"&&ja(x.lateZi),q!==void 0&&Xa(q),x.question&&et(x.question),p(L);const se=B.restNote?B.restNote(x):"";qe(`已按深链还原：${t.label}${x.question?`｜${x.question}`:""}${se?`　${se}`:""}`),ve(L,_,void 0,{gender:x.gender,address:x.address,trueSolar:x.trueSolar,lateZi:x.lateZi,lines:q,question:x.question})};ra(()=>{let t=!1;return(async()=>{let x=null;try{await Da("bazi");const L=typeof location<"u"?String(location.href):"";L&&L.indexOf("mp=")>=0&&window.Engine&&window.Engine.parseAskLink&&(x=window.Engine.parseAskLink(L))}catch{x=null}if(!t){if(x&&x.ok)try{cn(x);return}catch{}ve("ziwei")}})(),()=>{t=!0}},[]),ra(()=>{if(!Ja)return;const t=Ja.kind;At(null),ve(t)},[Ja]),ra(()=>{const t=x=>{if(x.key!=="Escape")return;const L=document.getElementById("mp-trace-layer");L&&L.classList.contains("open")&&Ut()};return document.addEventListener("keydown",t),()=>document.removeEventListener("keydown",t)},[]);const Qt=(Ci||[]).filter(t=>t&&Fe.some(x=>x.k===t.tab)).slice(0,xt),mn=t=>(Fe.find(x=>x.k===t)||{}).label||t,gn=({k:t,label:x,tip:L,wide:_})=>o("button",{key:t,type:"button",className:"mp-tool"+(_?" wide":"")+(s===t?" on":""),"data-tab":t,onClick:()=>tt(t)},o("b",null,x),o("span",null,L)),un=[o("section",{key:"start",className:"mp-start","aria-label":"选择要算的事"},o("div",{className:"mp-start-top"},o("div",{className:"mp-recent",hidden:Qt.length===0},o("span",{className:"mp-recent-lbl"},"最近用过"),o("span",{className:"mp-recent-list"},Qt.map(t=>o("button",{key:t.tab,type:"button",className:"mp-rc",onClick:()=>tt(t.tab)},mn(t.tab),o("i",null,bi(t.at)))))),o("div",{className:"mp-viewsw",role:"group","aria-label":"首屏视图"},o("button",{type:"button",className:ia==="group"?"on":"","aria-pressed":ia==="group"?"true":"false",onClick:()=>Zt("group")},"分组"),o("button",{type:"button",className:ia==="flat"?"on":"","aria-pressed":ia==="flat"?"true":"false",onClick:()=>Zt("flat")},"平铺"))),ia==="group"?o("div",{className:"mp-groups"},fi.map(t=>{const x=!!Li[t.title],L=Math.max(0,t.items.length-4);return o("section",{key:t.title,className:"mp-tgroup"+(x?" open":"")},o("div",{className:"mp-tgroup-head"},o("h2",null,t.title),o("p",null,t.hint)),o("div",{className:"mp-ttools"},t.items.map(gn),L>0?o("button",{key:"more",type:"button",className:"mp-tmore","aria-expanded":x?"true":"false",onClick:()=>Ai(_=>Object.assign({},_,{[t.title]:!x}))},x?"收起":`还有 ${L} 个`):null))})):null),o("div",{key:"tabs",className:"mp-tabs"+(ia==="flat"?"":" hide"),role:"tablist","aria-label":"命理体系"},Fe.map(t=>o("button",{key:t.k,role:"tab","aria-selected":s===t.k?"true":"false",tabIndex:s===t.k?0:-1,className:"mp-tab"+(s===t.k?" on":""),onClick:()=>tt(t.k)},t.label))),o("div",{key:"head",className:"mp-panel"},o("div",{className:"mp-row"},Bt?Y(ga?"出生日期（公历）":Se==="date"?"日期（公历）":"起卦日期（公历）",o("input",{className:"mp-input",type:"date",value:A,onChange:t=>Di(t.target.value)})):null,Gt?Y(ga?"出生时刻":"起卦时刻",o("input",{className:"mp-input",type:"time",value:Q,disabled:ue&&s==="bazi",onChange:t=>Ii(t.target.value)})):null,s==="bazi"||s==="trend"?o("label",{className:"mp-chk",title:"不知道出生时辰时勾这里：不排时柱，起运按日估算，结果首行会写明"},o("input",{type:"checkbox",checked:ue,onChange:t=>de(t.target.checked)})," 时辰未知"):null,ga?Y("性别",o("select",{className:"mp-input",value:a,onChange:t=>P(t.target.value)},o("option",{value:"female"},"女"),o("option",{value:"male"},"男"))):null,ga?Y("出生地（省/市即可）",o("input",{className:"mp-input",placeholder:"如 河北石家庄 / 成都",value:ce,onChange:t=>pe(t.target.value)})):null,s==="bazi"||s==="ziwei"?o("label",{className:"mp-field mp-checks"},o("input",{type:"checkbox",checked:ea,onChange:t=>ma(t.target.checked)}),o("span",{className:"mp-lbl"},"八字 × 紫微 交叉验证")):null,s==="hepan"?Y("对方出生日期",o("input",{className:"mp-input",type:"date",value:xe,onChange:t=>ee(t.target.value)})):null,s==="hepan"?Y("对方出生时刻",o("input",{className:"mp-input",type:"time",value:ae,onChange:t=>W(t.target.value)})):null,s==="hepan"?Y("对方性别",o("select",{className:"mp-input",value:X,onChange:t=>te(t.target.value)},o("option",{value:"female"},"女"),o("option",{value:"male"},"男"))):null,s==="hepan"?Y("合盘方式",o("div",{className:"mp-seg"},o("button",{className:Je==="bazi"?"on":"",onClick:()=>Ge("bazi")},"八字"),o("button",{className:Je==="ziwei"?"on":"",onClick:()=>Ge("ziwei")},"紫微"))):null,s==="hepan"?Y("对方出生地（可空）",o("input",{className:"mp-input",placeholder:"如 四川成都",value:fe,onChange:t=>Ya(t.target.value)})):null,s==="hepan"?o("label",{className:"mp-field mp-checks"},o("input",{type:"checkbox",checked:Le,onChange:t=>pa(t.target.checked)}),o("span",{className:"mp-lbl"},"三方合盘（加入第三人）")):null,s==="hepan"&&Le?Y("第三方出生日期",o("input",{className:"mp-input",type:"date",value:Ze,onChange:t=>va(t.target.value)})):null,s==="hepan"&&Le?Y("第三方出生时刻",o("input",{className:"mp-input",type:"time",value:ya,onChange:t=>$a(t.target.value)})):null,s==="hepan"&&Le?Y("第三方性别",o("select",{className:"mp-input",value:wa,onChange:t=>ka(t.target.value)},o("option",{value:"female"},"女"),o("option",{value:"male"},"男"))):null,s==="hepan"&&Le?Y("第三方出生地（可空）",o("input",{className:"mp-input",placeholder:"如 广东广州",value:la,onChange:t=>Ka(t.target.value)})):null,s==="qimen"?o("fieldset",{key:"qmr",className:"mp-qmrule"},o("legend",{className:"mp-lbl"},"换局规则"),o("div",{className:"mp-qmopts",role:"radiogroup","aria-label":"奇门换局规则"},[["chaibu","拆补"],["chaoshen","超神接气"],["zhirun","置闰"]].map(([t,x])=>o("label",{key:t,className:"mp-qmopt"},o("input",{type:"radio",name:"qimen_rule",value:t,checked:za===t,onChange:()=>Va(t)}),o("span",null,x)))),o("div",{className:"mp-field"},o("span",{className:"mp-lbl"},"晚子时"),o("select",{className:"mp-input",value:be,onChange:t=>Qe(t.target.value)},o("option",{value:"same-day"},"23:00 后归当日"),o("option",{value:"next-day"},"23:00 后归次日"))),o("details",{className:"mp-qmhelp"},o("summary",null,"三种规则有什么区别？"),o("p",null,"决定符头与节气如何对齐、是否插入闰局；同一个时刻在不同规则下可能得到不同局数。默认「拆补」与工具层一致。"))):null,Oe(s)||s==="qimen"?Y(s==="qimen"?"询问方向（定用神）":"询问方向",o("select",{className:"mp-input",value:Ve,onChange:t=>{_t(t.target.value),Wt(t.target.value)}},(B.DIRECTIONS||[]).map(t=>o("option",{key:t.key,value:t.key},t.label)))):null,s==="tarot"?Y("张数",o("select",{className:"mp-input",value:Qa,onChange:t=>Et(t.target.value)},o("option",{value:"1"},"1 张 · 指引"),o("option",{value:"3"},"3 张 · 过去现在未来"),o("option",{value:"5"},"5 张 · 十字牌阵"))):null,s==="liuyao"?Y("六爻（可空）",o("input",{className:"mp-input",placeholder:"空则随机，如 9 7 8 8 7 6",value:St,onChange:t=>Xa(t.target.value)})):null,s==="meihua"?Y("起卦方式",o("div",{className:"mp-seg"},o("button",{className:Re==="time"?"on":"",onClick:()=>Kt("time")},"时间"),o("button",{className:Re==="number"?"on":"",onClick:()=>Kt("number")},"数字"))):null,s==="meihua"&&Re==="number"?Y("第一个数",o("input",{className:"mp-input",value:La,placeholder:"如 17",onChange:t=>Ot(t.target.value)})):null,s==="meihua"&&Re==="number"?Y("第二个数",o("input",{className:"mp-input",value:Aa,placeholder:"如 29",onChange:t=>Rt(t.target.value)})):null,s==="meihua"&&Re==="number"?Y("动爻（可空）",o("input",{className:"mp-input",value:Ha,placeholder:"1-6",onChange:t=>Dt(t.target.value)})):null,s==="zeri"?Y("所办事项",o("select",{className:"mp-input",value:b,onChange:t=>T(t.target.value)},[["常用",["嫁娶","搬家入宅","出行","开业","签订合同","祭祀"]],["婚嫁",["嫁娶","订婚","领证","提亲","收送聘金","满月酒"]],["生活",["搬家","入宅","旅行","访亲友","入学","求医","祭祀"]],["建造",["动土","装修","装修建造","安葬","试车买车"]],["工商",["开业","交易","投资","签订合同","签约","纳财","赴任"]]].map(([t,x])=>o("optgroup",{key:t,label:t},x.map(L=>o("option",{key:`${t}-${L}`,value:L},L)))))):null,s==="convert"?Y("转换方向",o("div",{className:"mp-seg"},o("button",{className:y==="solar2lunar"?"on":"",onClick:()=>w("solar2lunar")},"公历 → 农历"),o("button",{className:y==="lunar2solar"?"on":"",onClick:()=>w("lunar2solar")},"农历 → 公历"))):null,s==="convert"&&y==="lunar2solar"?Y("农历日期",o("input",{className:"mp-input",value:F,placeholder:"如 2026-9-17",onChange:t=>U(t.target.value)})):null,s==="convert"&&y==="lunar2solar"?o("label",{className:"mp-check"},o("input",{type:"checkbox",checked:H,onChange:t=>f(t.target.checked)})," 闰月"):null,s==="zeri"?Y("看多少天",o("input",{className:"mp-input",type:"number",min:1,max:60,value:k,onChange:t=>z(t.target.value)})):null,s==="zeri"?Y("候选日（可空，只比这几天）",o("input",{className:"mp-input",placeholder:"如 2026-12-01, 2026-12-08, 2026-12-15",value:V,onChange:t=>I(t.target.value)})):null,s==="zeri"?Y("当事人属相（可空）",o("select",{className:"mp-input",value:N,onChange:t=>M(t.target.value)},o("option",{value:""},"不排除"),["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"].map(t=>o("option",{key:t,value:t},t)))):null,s==="xiaoliuren"?Y("起课方式",o("div",{className:"mp-seg"},o("button",{className:O==="time"?"on":"",onClick:()=>D("time")},"时间"),o("button",{className:O==="number"?"on":"",onClick:()=>D("number")},"报数"))):null,s==="xiaoliuren"&&O==="number"?Y("第一个数",o("input",{className:"mp-input",type:"number",min:1,max:99,value:ie,onChange:t=>ne(t.target.value)})):null,s==="xiaoliuren"&&O==="number"?Y("第二个数",o("input",{className:"mp-input",type:"number",min:1,max:99,value:me,onChange:t=>Ce(t.target.value)})):null,s==="xiaoliuren"&&O==="number"?Y("第三个数",o("input",{className:"mp-input",type:"number",min:1,max:99,value:Ne,onChange:t=>ye(t.target.value)})):null,s==="mbti"?o("div",{className:"mp-quiz-wrap"},o("div",{className:"mp-lbl"},"十六型人格问卷 · 4 题一页，按 1（完全不像）到 5（很像我）打分"),o(gi,{answers:$e,page:Ke,onPick:(t,x)=>Ae(L=>{const _=L.slice();return _[t]=x,_}),onPage:t=>Me(x=>Math.max(0,Math.min(x+t,Math.max(0,Math.ceil(ha().total/fa)-1)))),onSubmit:Yt,onClear:()=>{Ae(new Array(ha().total).fill(null)),Me(0),He(null)}})):null,s==="trend"?Y("算到几岁",o("input",{className:"mp-input",type:"number",min:10,max:100,value:C,onChange:t=>c(t.target.value)})):null,s==="fengshui"?Y("看什么",o("div",{className:"mp-seg"},o("button",{className:v==="natal"?"on":"",onClick:()=>G("natal")},"命卦"),o("button",{className:v==="advise"?"on":"",onClick:()=>G("advise")},"门主灶"),o("button",{className:v==="xuankong"?"on":"",onClick:()=>G("xuankong")},"玄空"))):null,s==="fengshui"&&v!=="natal"?Y("坐山（24 山）",o("input",{className:"mp-input",value:E,placeholder:"如 子 / 乾",onChange:t=>le(t.target.value)})):null,s==="fengshui"&&v!=="natal"?Y("朝向（24 山）",o("input",{className:"mp-input",value:we,placeholder:"如 午 / 巽",onChange:t=>he(t.target.value)})):null,s==="fengshui"&&v==="xuankong"?Y("运（1–9）",o("input",{className:"mp-input",type:"number",min:1,max:9,value:Z,onChange:t=>ge(t.target.value)})):null,s==="name"?Y("看什么",o("div",{className:"mp-seg"},o("button",{className:ke==="assess"?"on":"",onClick:()=>aa("assess")},"评名字"),o("button",{className:ke==="generate"?"on":"",onClick:()=>aa("generate")},"生成候选"))):null,s==="name"?Y("姓",o("input",{className:"mp-input",value:ta,placeholder:"如 李",onChange:t=>Wa(t.target.value)})):null,s==="name"&&ke==="assess"?Y("名字",o("input",{className:"mp-input",value:qt,placeholder:"如 沐宸",onChange:t=>ji(t.target.value)})):null,s==="name"&&ke==="generate"?Y("候选个数",o("input",{className:"mp-input",type:"number",min:1,max:20,value:Nt,onChange:t=>qi(t.target.value)})):null),ga?o("div",{className:"mp-checks"},o("label",{title:"按出生地经度把钟表时间换算成真太阳时"},o("input",{type:"checkbox",checked:Ye,onChange:t=>da(t.target.checked)}),"真太阳时"),o("label",{title:"23:00–23:59 出生时：勾选=按次日日柱起时柱；不勾=仍用当日日柱"},o("input",{type:"checkbox",checked:ca,onChange:t=>ja(t.target.checked)}),"晚子时换日"),o("label",{title:"开启后会请求 OpenStreetMap，把区县/村落到更精确的坐标"},o("input",{type:"checkbox",checked:Mt,onChange:t=>Ni(t.target.checked)}),"联网精确到区县")):null,Oe(s)?o("div",{className:"mp-askblock"},o("span",{className:"mp-lbl"},"所问之事（必填）"),o("textarea",{className:"mp-textarea"+(_i?" invalid":""),rows:2,value:Ca,placeholder:"用一句话描述所问之事，例如：今年是否适合换工作？",onChange:t=>{et(t.target.value),Ta(!1)},onBlur:t=>Wt(void 0,t.target.value)})):null,s==="mbti"?null:o("div",{key:"actions",className:"mp-actions"},o("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginRight:8},onClick:Bi,title:"用固定示例盘看完整报告（不改动你已填的数据）"},"看示例"),o("button",{className:"mp-btn",onClick:Yt,title:"时间仍为自动时，点它会取当下再起卦"},s==="tarot"?"抽牌":s==="bazi"||s==="ziwei"?"排盘":s==="hepan"?"合盘":s==="qimen"?"起局":Ia.indexOf(s)>=0?"看结果":"起卦"))),o("div",{key:"hint",className:"mp-hint"},Pi.hint),Tt.length?o("div",{key:"hist",className:"mp-hist"},o("div",{className:"mp-hist-h"},o("span",null,"最近排过"),o("button",{className:"mp-hist-clear",onClick:dn},"清空")),o("div",{className:"mp-hist-list"},Tt.map((t,x)=>o("button",{key:x,className:"mp-hist-item",title:`${t.date} ${t.time}`,onClick:()=>ln(t)},o("b",null,(Fe.find(L=>L.k===t.kind)||{}).label||t.kind),o("span",null,t.label||"—"),o("i",null,`${t.date.slice(5)} ${t.time}`))))):null,Se==="cast"&&It?o("div",{key:"auto",className:"mp-auto"},at.cast?`起卦时刻用的是你手动填的（${Q}）；想跟随当下，把时间改回或清空即可。`:`起卦时刻已自动取本机时间（${Q}），每次点起卦都会重新取当下；想固定时刻就在上面改。`):null,Na?o("div",{key:"err",className:"mp-err",role:"alert"},Na):null,Ht?o("div",{key:"ntc",className:"mp-note",role:"status"},Ht):null,Hi?o("div",{key:"load",className:"mp-note",role:"status"},"正在加载本页需要的引擎…"):null,!$&&!Na?o("div",{key:"empty",className:"mp-empty"},o("b",null,s==="ziwei"||s==="bazi"?"填好出生信息，点「排盘」":s==="tarot"?"写下想问的事，点「抽牌」":s==="mbti"?"按 1–5 给题目打分，答满 12 题就能看结果":Ia.indexOf(s)>=0?"填好参数，点「看结果」":"写下所问之事，点「起卦」"),s==="ziwei"||s==="bazi"?"出生日期、时刻与性别即可；出生地只影响真太阳时。":s==="mbti"?"4 题一页，答案只在本地参与计算，不会上传。":Ia.indexOf(s)>=0?"按上面的选项填好参数即可；全部在本机计算，不上传。":"起卦时刻已自动取当下，也可以手动改。"):null,$?o("div",{key:"card",className:"mp-card mp-flat",role:"region","aria-label":"排盘结果","aria-live":"polite",onClick:Qi,dangerouslySetInnerHTML:{__html:en($)+K.perfHTML(Mi)+K.revisionHTML($.r.revision)+K.handleHTML($.r.handle)+K.shadowHTML($.r.shadow,$.shadowDiff)+K.traceHTML($.r.trace,$.r.system,$.r.traceText)+K.resultWithInterpret($.kind==="ziwei"?K.ziweiHTML($.r):$.kind==="bazi"?K.baziHTML($.r)+($.trend?K.trendHTML($.trend):""):$.kind==="meihua"?K.meihuaHTML($.r):$.kind==="daliuren"?K.daliurenHTML($.r):$.kind==="qimen"?K.qimenHTML($.r)+K.qimenFactsHTML($.r):$.kind==="hepan"?$.r.chart==="ziwei"?K.ziweiHepanHTML($.r):K.hepanHTML($.r):$.kind==="tarot"?K.tarotHTML($.r):$.kind==="liuyao"?K.liuyaoHTML($.r):$.kind==="chenggu"?K.chengguHTML($.r):$.kind==="almanac"?K.almanacHTML($.r):$.kind==="zeri"?K.zeriHTML($.r):$.kind==="trend"?K.trendHTML($.r):$.kind==="name"?K.nameHTML($.r):$.kind==="mbti"?K.mbtiHTML($.r):$.kind==="fengshui"?K.fengshuiHTML($.r):K.quickHTML($.r),$.it,{folded:Zi()})+K.caliberHTML($.caliber)}}):null,$?o("div",{key:"bar",className:"mp-bar"},o("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px"},onClick:an},Fi||"复制文字结果"),o("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:sn,title:"导出盘面 + 解析（含一页读懂、三张表）为 Markdown"},"导出 .md"),o("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:on,title:"生成 PNG 摘要卡（一页读懂 + 首张表），适合直接分享"},"存为摘要长图")):null,$?o("div",{key:"ask",className:"mp-askbox",style:{flexWrap:"wrap"}},o("input",{className:"mp-input",value:je,maxLength:120,placeholder:"追问：如 2027 年事业怎么样（回车提交）",onChange:t=>Ua(t.target.value),onKeyDown:t=>{t.key==="Enter"&&Xt()}}),o("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px"},onClick:Xt},"追问"),o("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:nn,title:"把这张盘的摘要和你的问题一起发进 DSH 对话窗，由对话里的模型接着答"},"问进对话"),re.ref?null:o("div",{key:"bridgediag",className:"mp-note",style:{marginTop:6,fontSize:11,flexBasis:"100%"}},vt()),qa?o("div",{key:"chatnote",className:"mp-note",style:{marginTop:6,fontSize:12,flexBasis:"100%"}},qa):null):null,$?o("div",{key:"bridge",className:"mp-bridge"},o("span",{className:"mp-bridge-lbl"},re.ref?"桥可用；也可以：":"桥未就绪，改走这几档："),Vt.map(([t,x,L])=>o("button",{key:t,type:"button",className:"mp-chip","data-bridge-copy":t,title:L,onClick:_=>Xi(t,_.currentTarget)},x))):null,e?o("div",{key:"fx",className:"mp-fx",dangerouslySetInnerHTML:{__html:K.followupHTML(e)}}):null,$&&$.kind==="bazi"&&$.r.past?o("div",{key:"verify",className:"mp-verify"},o("div",{className:"mp-verify-h"},"验前事 · 过去几年的信号（只读，不改盘）"),$.r.past.rows.map(t=>o("div",{key:t.year,className:"mp-verify-row"},o("span",{className:"mp-verify-txt"},`${t.year} ${t.ganzhi} · ${t.theme}`),o("span",{className:"mp-verify-btns"},["yes","no","unsure"].map(x=>o("button",{key:x,className:"mp-chip"+(r[t.year]===x?" on":""),onClick:()=>d(Object.assign({},r,{[t.year]:x}))},x==="yes"?"准":x==="no"?"不准":"不确定"))))),o("div",{className:"mp-verify-foot"},o("button",{className:"mp-btn ghost",style:Jt,onClick:rn},"算贴合度"),i?o("span",{className:"mp-verify-fit"},`命中 ${i.yes}/${i.answered}（${i.level}）：${i.advice}`):null)):null,$&&$.kind==="bazi"?o("div",{key:"rect",className:"mp-rect"},o("div",{className:"mp-verify-h"},"生时校正 · 用过去的事反推时辰"),l.map((t,x)=>o("div",{key:x,className:"mp-rect-row"},o("input",{className:"mp-input",type:"number",min:1900,max:2100,value:t.year,onChange:L=>u(l.map((_,q)=>q===x?Object.assign({},_,{year:L.target.value}):_))}),o("select",{className:"mp-input",value:t.kind,onChange:L=>u(l.map((_,q)=>q===x?Object.assign({},_,{kind:L.target.value}):_))},[["career","事业变动"],["wealth","财运"],["love","感情"],["move","搬迁/出行"],["health","健康"],["other","其他"]].map(([L,_])=>o("option",{key:L,value:L},_))))),o("button",{className:"mp-btn ghost",style:Jt,onClick:pn},"计算候选时辰"),g?g.error?o("div",{className:"mp-rect-err"},g.error):o("div",{className:"mp-rect-out"},o("div",{className:"mp-verify-fit"},g.note),g.candidates.slice(0,6).map(t=>o("div",{key:t.hour,className:"mp-rect-cand"+(t===g.best?" best":"")},`${t.label} · 时柱 ${t.hourGanzhi} · 日柱 ${t.dayGanzhi} · 命中 ${t.hits}/${t.total}`))):null):null,!$&&!Na?o("div",{key:"ph",className:"mp-dim",style:{marginTop:24,fontSize:12}},"选择体系后点「排盘」。所有计算在本机完成，不上传任何数据。"):null];return o("div",{className:"mp-wrap"},un)}function wi(s){try{if(typeof styles<"u"&&styles&&typeof styles.insert=="function")return styles.insert(s)}catch(p){console.error("[metaphysics] styles.insert 不可用，改用 DOM 注入",p)}try{const p=document.createElement("style");return p.setAttribute("data-plugin","@local/metaphysics"),p.textContent=s,document.head.appendChild(p),()=>p.remove()}catch(p){return console.error("[metaphysics] DOM 注入样式也失败",p),()=>{}}}let jt=!1;function Za(){try{const s=document.documentElement;if(!s||!document.body)return;const p=document.createElement("span");p.setAttribute("aria-hidden","true"),p.style.cssText="position:absolute;left:-9999px;top:0;width:0;height:0;pointer-events:none;background:var(--dsw-alias-brand-primary)",document.body.appendChild(p);const A=getComputedStyle(p).backgroundColor;p.remove();const J=Pe&&typeof Pe.pickOnColor=="function"?Pe.pickOnColor(A):"";J&&s.style&&s.style.getPropertyValue("--mp-on-brand")!==J&&s.style.setProperty("--mp-on-brand",J)}catch{}}function ki(){if(!jt){jt=!0,Za();try{const s=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)");s&&typeof s.addEventListener=="function"&&s.addEventListener("change",Za)}catch{}try{typeof MutationObserver=="function"&&document.documentElement&&new MutationObserver(Za).observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]})}catch{}}}function zi(s){try{const P=wi(mi+(K&&K.CSS?K.CSS:""));typeof s.effect=="function"&&typeof P=="function"&&s.effect(()=>P)}catch(P){console.error("[metaphysics] 样式注入失败",P)}try{ki()}catch(P){console.error("[metaphysics] 字色同步失败",P)}let p=null;try{p=s&&s.slots||(s&&typeof s.get=="function"?s.get("slots"):null)}catch(P){console.error("[metaphysics] 取 slots 服务失败",P)}if(!p||typeof p.register!="function"){console.error("[metaphysics] slots 服务不可用，面板未注册");return}try{re.injectType=typeof p.inject;const P=typeof p.spec=="function"?p.spec("conversation.input.right"):null;re.spec=P?P.kind+"/"+P.scope:"未声明"}catch(P){re.spec="取声明失败",yt(P)}const A=(P,ce)=>{try{const pe=p.register(P,ce);return re.regs+=1,pe}catch(pe){return yt(pe),null}},J=(P,ce)=>{try{typeof p.inject=="function"?p.inject(P,ce):ce()}catch(pe){console.error("[metaphysics] 等待槽位失败："+P,pe);try{ce()}catch(xe){console.error("[metaphysics] 直接注册也失败："+P,xe)}}};J("sidebar.panellist",()=>A({name:"sidebar.panellist",id:"metaphysics",order:20,label:()=>"命理 v"+(window.__MP_VER||"")},xi)),J("main",()=>A({name:"main",key:"metaphysics"},P=>o(ui,null,o($i,P))));const Q=(P,ce)=>{const pe=()=>{try{p.inject(P,ce)}catch(xe){console.error("[metaphysics] 槽位注册失败："+P,xe);try{ce()}catch(ee){console.error("[metaphysics] 直接注册也失败："+P,ee)}}};try{typeof s.effect=="function"?s.effect(pe,"metaphysics: "+P):pe()}catch(xe){console.error("[metaphysics] effect 包裹失败："+P,xe),pe()}};Q("conversation.input.right",()=>A({name:"conversation.input.right",id:"metaphysics-ask",order:40},wt)),Q("conversation.composer.dock",()=>A({name:"conversation.composer.dock",id:"metaphysics-dock",order:60},kt));let oe=0;const ue=()=>{if(re.ref)return;oe+=1;const P="-"+oe;A({name:"conversation.input.right",id:"metaphysics-ask"+P,order:40},wt),A({name:"conversation.composer.dock",id:"metaphysics-dock"+P,order:60},kt)};let de=20;const a=()=>{re.ref||de<=0||(de-=1,ue(),setTimeout(a,700))};try{setTimeout(a,700)}catch{}try{document.addEventListener("pointerdown",()=>ue(),{once:!0,capture:!0})}catch{}}return{inject:["slots"],apply(s){try{zi(s)}catch(p){console.error("[metaphysics] apply 异常",p)}}}}});
