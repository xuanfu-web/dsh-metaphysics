window.__ModuleLoader__.load({id:"dsh-metaphysics",version:"0.60.0",factory(Na){const ua=(function(){try{return Na("react")}catch{return globalThis.React}})();if(!ua)return{inject:[],apply(){}};const p=ua.createElement,Nt={bazi:"client.bazi.js",ziwei:"client.ziwei.js",hepan:"client.hepan.js",trend:"client.trend.js",name:"client.name.js",fengshui:"client.fengshui.js",liuyao:"client.liuyao.js",meihua:"client.liuyao.js",qimen:"client.qimen.js",daliuren:"client.daliuren.js",tarot:"client.tarot.js",almanac:"client.almanac.js",convert:"client.convert.js",zeri:"client.zeri.js",chenggu:"client.chenggu.js",xiaoliuren:"client.xiaoliuren.js",star:"client.star.js",numerology:"client.numerology.js",mbti:"client.mbti.js"},Mt=[{key:"general",label:"综合",dim:null,focus:""},{key:"wealth",label:"财运",dim:"work",focus:"钱财进出的落点主要看「工作与职业选择」与「事业发展」这两条。"},{key:"career",label:"事业",dim:"career",focus:"事业发展这条与你的问题最直接。"},{key:"love",label:"感情",dim:"love",focus:"感情这条与你的问题最直接。"},{key:"health",label:"健康",dim:"health",focus:"健康这条与你的问题最直接；下面只作提醒，不作任何诊断。"},{key:"study",label:"学业",dim:"career",focus:"学业与考试更贴近「事业发展」这条，讲的是长期积累与阶段进展。"},{key:"travel",label:"出行",dim:"overall",focus:"出行与迁动更贴近「整体运势」这条，看的是当下这一段的大环境。"}];window.__MP_VER="0.60.0",window.__MPGroups=[{title:"问一件事",hint:"心里有一件具体的事，起一卦再决定",items:[{k:"liuyao",label:"六爻",tip:"摇六次，问一件事"},{k:"meihua",label:"梅花",tip:"见闻起卦，看当下"},{k:"tarot",label:"塔罗",tip:"抽牌，看关系与选择"},{k:"qimen",label:"奇门",tip:"看方位、时机与取舍"},{k:"daliuren",label:"六壬",tip:"占事，断来意与结果"},{k:"xiaoliuren",label:"小六壬",tip:"掐指一算，快速断"}]},{title:"看一个人",hint:"看自己或身边人的性情、格局与运程",items:[{k:"bazi",label:"八字",tip:"四柱看一生格局"},{k:"ziwei",label:"紫微",tip:"十二宫细看"},{k:"hepan",label:"合盘",tip:"两个人合不合"},{k:"mbti",label:"人格",tip:"16 型性格问卷"},{k:"chenggu",label:"称骨",tip:"按生辰称命重"},{k:"numerology",label:"数字",tip:"生日数字看性格"},{k:"trend",label:"人生K",tip:"一生高低走势",wide:!0}]},{title:"查日子",hint:"挑时间、换农历，顺带看看家里和名字",items:[{k:"almanac",label:"黄历",tip:"今天宜忌、时辰吉凶"},{k:"zeri",label:"择日",tip:"挑个办事的好日子"},{k:"convert",label:"农历",tip:"公历农历互转"},{k:"star",label:"星座",tip:"星座性格与今日运"},{k:"fengshui",label:"风水",tip:"房屋朝向与布置"},{k:"name",label:"起名",tip:"按八字选字"}]}];const K={};K.DIRECTIONS=Mt,K.compute=()=>{throw new Error("命理引擎尚未加载")};const St=Object.create(null),ot=Object.create(null);function ji(r){return Nt[r]||Nt.bazi||"client.bazi.js"}const Lt=()=>typeof performance<"u"&&performance.now?performance.now():Date.now();async function qi(r){const o=ji(r);let E=St[o];const ee=!!E,ae=Lt();if(!E){if(!Na||typeof Na.async!="function")throw new Error("当前宿主不支持客户端分块加载（require.async 缺失），请升级 DeepSeek Harness");let ne=ot[o];ne||(ne=Na.async(`./${o}`).then(ce=>{const re=ce&&(ce.Engine||ce.default);if(!re||typeof re.compute!="function")throw new Error(`命理引擎分块 ${o} 未返回 Engine`);return St[o]=re,re}),ot[o]=ne,ne.catch(()=>{}).then(()=>{delete ot[o]})),E=await ne}for(const ne of Object.keys(E))E[ne]!==void 0&&(K[ne]=E[ne]);return Array.isArray(K.DIRECTIONS)||(K.DIRECTIONS=Mt),window.Engine=K,window.__MP_ENGINE_READY__=!0,window.__MP_LAST_LOAD={tab:r,chunk:o,cached:ee,ms:Math.round((Lt()-ae)*10)/10},K}window.__mpEnsureEngine=qi,window.Engine=K,(function(){const r={liuyao:!0,meihua:!0,daliuren:!0,tarot:!0},o=W=>!!r[W],E={general:"other",wealth:"business",career:"career",love:"love",health:"other",study:"career",travel:"action"},ee=W=>E[W]||"other",ae="#ffffff",ne="#1c1a15";function ce(W){const J=String(W??"").match(/rgba?\(([^)]+)\)/i);if(!J)return null;const B=J[1].split(/[,\s/]+/).filter(Boolean).map(Number);return B.length<3||B.slice(0,3).some(U=>!Number.isFinite(U))||B.length>3&&Number.isFinite(B[3])&&B[3]<.95?null:[B[0],B[1],B[2]]}function re(W){const J=String(W||"").replace("#",""),B=J.length===3?J.split("").map(U=>U+U).join(""):J;return/^[0-9a-f]{6}$/i.test(B)?[0,2,4].map(U=>parseInt(B.slice(U,U+2),16)):null}function a(W){const J=B=>{const U=B/255;return U<=.03928?U/12.92:Math.pow((U+.055)/1.055,2.4)};return .2126*J(W[0])+.7152*J(W[1])+.0722*J(W[2])}function le(W,J){const B=a(W),U=a(J),ge=Math.max(B,U),xa=Math.min(B,U);return(ge+.05)/(xa+.05)}function I(W){const J=typeof W=="string"?ce(W):W;return J?le(J,re(ae))>=le(J,re(ne))?ae:ne:""}function pe(W){const J=String(W??"").trim();if(!J)return{lines:null,warning:""};const B=J.split(/[^0-9]+/).filter(Boolean).map(Number),U=B.filter(ge=>![6,7,8,9].includes(ge));return B.length===6&&U.length===0?{lines:B,warning:""}:{lines:null,warning:B.length!==6?`爻值需要正好 6 个数字（当前 ${B.length} 个），本次按随机摇卦。`:`爻值只能是 6/7/8/9（收到 ${U.join("/")}），本次按随机摇卦。`}}function me(W){const J=String(W??"").trim();if(!J)return null;const B=Number(J);return Number.isFinite(B)?B:null}function ye(W){const J=W instanceof Date?W:new Date,B=U=>String(U).padStart(2,"0");return`${J.getFullYear()}-${B(J.getMonth()+1)}-${B(J.getDate())}`}window.__MPCore={NEED_ASK:r,needAsk:o,parseLines:pe,toNumber:me,parseRGB:ce,hexToRGB:re,luminance:a,contrastRatio:le,pickOnColor:I,ON_DARK:ae,ON_LIGHT:ne,kindOfDirection:ee,todayStamp:ye}})(),(function(){const r=`
.pp,.mp-it,.mp-al,.mp-cg,.mp-cl,.mp-cli,.mp-kline,.mp-mb,.mp-mb-paper,.mp-nm,.mp-quick,.mp-cdiff,.mp-shadow,.mp-trace-card,.mp-trace-layer,.mp-prof{--ink:#1b1b1b;--ink2:#3f3a33;--muted:#6f6a60;--label:#8a8378;--faint:#a9a296;
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
  .pp,.mp-it,.mp-al,.mp-cg,.mp-cl,.mp-cli,.mp-kline,.mp-mb,.mp-mb-paper,.mp-nm,.mp-quick,.mp-cdiff,.mp-shadow,.mp-trace-card,.mp-trace-layer,.mp-prof{--ink:#eae5d9;--ink2:#d5cfc2;--muted:#aca598;--label:#a49c8e;--faint:#928b7e;
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
/* ── 我的命盘（本机档案）──
   照市面排盘 App 的「命盘列表」做：一张卡一个人，点卡直接出盘，
   改名/置顶/删除收在卡片右上角，hover 或键盘聚焦才出现——平时不占视觉。 */
.mp-prof{margin:0 0 14px;font-family:system-ui,-apple-system,"Microsoft YaHei",sans-serif}
.mp-prof-h{display:flex;align-items:center;gap:8px;margin-bottom:7px}
.mp-prof-h b{font-size:13.5px;color:var(--ink);letter-spacing:.02em}
.mp-prof-h .mp-prof-sub{font-size:11.5px;color:var(--muted)}
.mp-prof-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(164px,1fr));gap:8px}
.mp-prof-card{position:relative;border:1px solid var(--line);border-radius:12px;background:var(--card);transition:border-color .12s,box-shadow .12s}
.mp-prof-card:hover,.mp-prof-card:focus-within{border-color:var(--red);box-shadow:0 1px 2px rgba(35,28,18,.06)}
.mp-prof-card.pinned{border-color:var(--quan)}
.mp-prof-use{display:flex;flex-direction:column;gap:2px;width:100%;text-align:left;background:transparent;border:none;
  padding:9px 10px;cursor:pointer;color:inherit;font:inherit;line-height:1.4}
.mp-prof-nm{display:flex;align-items:center;gap:5px;font-size:13.5px;font-weight:600;color:var(--ink);
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-right:52px}
.mp-prof-nm .sx{font-size:11px;font-weight:400;color:var(--muted)}
.mp-prof-sys{align-self:flex-start;font-size:10.5px;line-height:16px;padding:0 6px;border-radius:8px;
  background:var(--tri);color:var(--quan);border:1px solid color-mix(in srgb,var(--quan) 28%,transparent)}
.mp-prof-bd{font-size:11.5px;color:var(--ink2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mp-prof-at{font-size:11px;color:var(--faint)}
.mp-prof-ops{position:absolute;top:6px;right:6px;display:none;gap:4px}
.mp-prof-card:hover .mp-prof-ops,.mp-prof-card:focus-within .mp-prof-ops{display:flex}
.mp-prof-ops button{font:inherit;font-size:10.5px;line-height:18px;padding:0 6px;border-radius:6px;cursor:pointer;
  border:1px solid var(--line);background:var(--card);color:var(--muted)}
.mp-prof-ops button:hover{color:var(--red);border-color:var(--red)}
.mp-prof-ops button.on{color:var(--quan);border-color:var(--quan)}
/* 触屏没有 hover：改名/置顶/删除若只靠悬停出现，手机上永远点不到，所以常驻 */
@media (hover:none){.mp-prof-ops{display:flex}.mp-prof-nm{padding-right:0}}
.mp-prof-empty{margin:0;padding:10px 12px;border:1px dashed var(--line);border-radius:10px;
  font-size:12px;color:var(--muted);background:var(--band)}
.mp-prof-bar{display:flex;align-items:center;gap:8px;margin-top:9px;flex-wrap:wrap}
.mp-prof-bar input{font:inherit;font-size:12.5px;padding:6px 9px;border-radius:9px;border:1px solid var(--line);
  background:var(--card);color:var(--ink);min-width:0;flex:1 1 150px;max-width:220px}
.mp-prof-bar button{font:inherit;font-size:12.5px;padding:6px 12px;border-radius:9px;cursor:pointer;
  border:1px solid var(--red);background:var(--red);color:var(--on-accent)}
.mp-prof-bar button.ghost{background:transparent;color:var(--muted);border-color:var(--line)}
.mp-prof-bar .mp-prof-tip{font-size:11.5px;color:var(--muted)}
@media (max-width:360px){.mp-prof-list{grid-template-columns:repeat(auto-fill,minmax(140px,1fr))}}
`,o=window.__PP=window.__PP||{};o.CSS=r;const E={主星:"main",吉星:"good",煞星:"bad",辅星:"aux",杂曜:"aux"},ee={禄:"lu",权:"quan",科:"ke",忌:"ji"},ae={庙:"good",旺:"good",得:"mid",利:"mid",平:"mid",不:"bad",陷:"bad"},ne={巳:[1,1],午:[1,2],未:[1,3],申:[1,4],辰:[2,1],酉:[2,4],卯:[3,1],戌:[3,4],寅:[4,1],丑:[4,2],子:[4,3],亥:[4,4]},ce={乾:[1,1,1],兑:[1,1,0],离:[1,0,1],震:[1,0,0],巽:[0,1,1],坎:[0,1,0],艮:[0,0,1],坤:[0,0,0]},re=["初爻","二爻","三爻","四爻","五爻","上爻"],a=e=>String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),le=(e,i,s)=>{const b=Math.round(43),h=e?`<rect x="0" y="${2.5}" width="104" height="7" rx="${1.6}" fill="currentColor"/>`:`<rect x="0" y="${2.5}" width="${b}" height="7" rx="${1.6}" fill="currentColor"/><rect x="${b+18}" y="${2.5}" width="${104-b-18}" height="7" rx="${1.6}" fill="currentColor"/>`;return`<svg class="mp-hex${i?" hex-on":""}${s?" "+s:""}" viewBox="0 0 104 12" preserveAspectRatio="none" aria-hidden="true" focusable="false">${h}</svg>`},I={木:"M6 1.6V10.8M6 5.2 2.6 2.2M6 7.4 9.4 4.4",火:"M6 1.4C7.6 3.6 9.2 5.4 9.2 7.6A3.2 3.2 0 0 1 2.8 7.6C2.8 5.4 4.4 3.6 6 1.4Z",土:"M1.6 9.6h8.8M6 2.4v7.2M3.4 5.6h5.2",金:"M6 1.2 10.6 6 6 10.8 1.4 6Z",水:"M1.4 7.2C2.9 4.2 4.5 10.2 6 7.2 7.5 4.2 9.1 10.2 10.6 7.2"},pe=e=>{const i=I[e];return i?`<svg class="mp-wxi" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="${i}" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`:""},me=e=>`<svg class="mp-trig" viewBox="0 0 14 10" aria-hidden="true" focusable="false">${(ce[e]||[0,0,0]).slice().reverse().map((d,n)=>{const c=n*4;return d?`<rect x="0" y="${c}" width="14" height="2" rx="0.6" fill="currentColor"/>`:`<rect x="0" y="${c}" width="5.6" height="2" rx="0.6" fill="currentColor"/><rect x="8.4" y="${c}" width="5.6" height="2" rx="0.6" fill="currentColor"/>`}).join("")}</svg>`;o._hexBar=le,o._wxIcon=pe,o._triGlyph=me;function ye(e,i){return!e||!e.length?"":e.map(s=>{const d=E[s.type]||"aux",n=s.mutagen?`<i class="pp-m ${ee[s.mutagen]}">${s.mutagen}</i>`:"",c=i&&i[s.name],l=c?`<i class="pp-m view ${ee[c]}">${c}</i>`:"",u=s.brightness?`<em class="pp-b ${ae[s.brightness]||"mid"}">${s.brightness}</em>`:"";return`<span class="pp-st ${d}">${s.name}${u}${n}${l}</span>`}).join("")}function W(e){const i=[];for(let s=0;s<6;s++)i.push(e+s*12);return i.join(",")}const J=["命宫","兄弟","夫妻","子女","财帛","疾厄","迁移","交友","官禄","田宅","福德","父母"],B=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],U=e=>(e%12+12)%12,ge=(e,i)=>e!==i&&[U(i+4),U(i+8),U(i+6)].includes(e);function xa(e,i,s,d,n){const c=ne[e.branch]||[1,1],l=B.indexOf(e.branch),u=["pp-cell"];l===i?u.push("pp-soul"):ge(l,i)&&u.push("pp-tri"),e.isBody&&u.push("pp-shen"),c[0]===4&&u.push("pp-lastrow"),c[1]===4&&u.push("pp-lastcol");const g=e.shensha||{},b=J[U(i-l)],h=e.selfHua&&e.selfHua.length?`<span class="pp-zh">${e.selfHua.map(j=>`<i class="pp-m self ${ee[j.type]}" title="自化：宫干化回本宫">${j.type}</i>`).join("")}</span>`:"";let T="";if(l===i&&d){const j=k=>(E[k.type]||"")==="main";if(!(e.stars||[]).some(j)){const k=d.find(C=>B.indexOf(C.branch)===U(l+6)),q=k?(k.stars||[]).filter(j):[];q.length&&(T=`<div class="pp-borrow" title="命宫无主星，借对宫（迁移宫）主星">借 ${q.map(C=>C.name).join(" ")}</div>`)}}return`<div class="${u.join(" ")}" data-pi="${l}" data-view="${s}" role="button" tabindex="0" aria-expanded="false" style="grid-row:${c[0]};grid-column:${c[1]}">
      <div class="pp-stars">${ye(e.stars,n)}${h}</div>
      ${T}
      <div class="pp-ages">${W(e.xiaoxian.age)}</div>
      <div class="pp-foot">
        <div class="ft-l">
          <span class="ft-dx">${g.boshi} ${e.daxian.start}-${e.daxian.end}</span>
          <span>${g.jiangqian}</span>
          <span>${g.suiqi}</span>
        </div>
        <div class="ft-r">
          <span>${g.changsheng}</span>
          <span>${e.ganzhi}</span>
          <span class="ft-pn">${b}</span>
        </div>
      </div>
    </div>`}function sa(e){try{const i=window.Engine||window.__PP&&window.__PP.Engine;if(!i||!i.buildBazi||!e.input)return"";const s=i.buildBazi({year:e.input.year,month:e.input.month,day:e.input.day,hour:e.input.hour,minute:e.input.minute,gender:e.input.gender,trueSolar:!1});return["year","month","day","hour"].map(d=>s.pillars[d].ganzhi).join(" ")}catch{return""}}o.ziweiHTML=function(e){const i=B.indexOf(e.soul.branch),s=e.liunian&&e.liunian[0]||null,d=s?s.age:1,n=e.palaces.find(L=>d>=L.daxian.start&&d<=L.daxian.end)||e.palaces[0],c=B.indexOf(n.branch),l=s?B.indexOf(s.lifePalace.branch):i,u=L=>{const x={};for(const R of L||[])R&&R.star&&(x[R.star]=R.type);return x},g=(e.daxianList||[]).find(L=>L.branch===n.branch)||null,b={da:u(g&&g.mutagenHits),ln:u(s&&s.mutagenHits)},h=(L,x)=>e.palaces.map(R=>xa(R,L,x,e.palaces,b[x]||null)).join(""),T=(L,x)=>`<div class="pp-center">
        ${x==="da"?`<div class="ct-t1">大限 ${n.ganzhi}　${n.daxian.start}-${n.daxian.end}岁</div>`:x==="ln"&&s?`<div class="ct-t1">流年 ${s.ganzhi}　${s.age}岁</div>`:`<div class="ct-t1">${e.daxian.rule.slice(0,2)}　${e.bureau.name}</div>`}
        <div class="ct-t2">公历 ${e.input.year}-${String(e.input.month).padStart(2,"0")}-${String(e.input.day).padStart(2,"0")} ${String(e.input.hour).padStart(2,"0")}:${String(e.input.minute).padStart(2,"0")}</div>
        <div class="ct-t2">农历 ${e.lunar.year}年${e.lunar.isLeap?`闰${e.lunar.monthRaw||e.lunar.month}`:e.lunar.month}月${e.lunar.day}日${e.hourBranch}时${e.lunar.isLeap&&e.lunar.monthRaw&&e.lunar.month!==e.lunar.monthRaw?`（按${e.lunar.month}月起盘）`:""}</div>
        ${sa(e)?`<div class="ct-t3">${sa(e)}</div>`:""}
        <div class="ct-t4">命主 ${e.lifeMaster}　身主 ${e.bodyMaster}${e.bodyMasterNote?`<span class="pp-dim" title="${a(e.bodyMasterNote)}">＊</span>`:""}</div>
        <div class="ct-t4">命宫 ${e.soul.branch}　身宫 ${e.body.branch}　五行局 ${e.bureau.name}</div>
        <div class="ct-t4">子年斗君 ${e.doujun?e.doujun.zinian:"—"}　流年斗君 ${s&&s.doujun?s.doujun:"—"}</div>
        <div class="ct-t4">紫微 ${e.ziwei}　天府 ${e.tianfu}　${x==="da"?"大限命宫 "+B[c]:x==="ln"?"流年命宫 "+B[l]:"本命命宫 "+e.soul.branch}</div>
        ${x==="da"||x==="ln"?`<div class="ct-t4 pp-viewhua">${x==="da"?"大限":"流年"}四化　${(x==="da"?b.da:b.ln)&&Object.keys(x==="da"?b.da:b.ln).length?Object.entries(x==="da"?b.da:b.ln).map(([G,oe])=>`${G}化${oe}`).join("　"):'<span class="pp-dim">未飞四化</span>'}</div>`:""}
        <div class="pp-legend"><span class="pp-m lu">禄</span><span class="pp-m quan">权</span><span class="pp-m ke">科</span><span class="pp-m ji">忌</span><span>实心=生年四化　空心=大限/流年四化　虚下划线=自化　红框=命宫　浅底=三方四正</span></div>
      </div>`,j=(L,x,R)=>`<div class="pp-body ${L}" data-view="${R}" data-soul="${x}"><div class="pp-grid">${h(x,R)}${T(x,R)}</div><div class="pp-detail"></div></div>`,k=e.changqu,q=k?`<div class="pp-chips">
      <span class="pp-chip">昌 ${k.wenchang.branch}（${k.wenchang.palace}）</span>
      <span class="pp-chip">曲 ${k.wenqu.branch}（${k.wenqu.palace}）</span>
      <span class="pp-chip">${k.relation}</span>
      <span class="pp-chip">入命三方 ${k.inSoulSanfang?"是":"否"}</span>
      <span class="pp-chip ${k.absorb.label==="杂"?"warn":"ok"}">吸收·${k.absorb.label}</span>
    </div>`:"",C=(e.patterns||[]).length?`<div class="pp-chips">${e.patterns.map(L=>{const x=L.status==="broken"&&Array.isArray(L.breaks)&&L.breaks.length,R=`${L.evidence||""}${x?`；破格：${L.breaks.join("；")}`:""}`;return`<span class="pp-chip ${x?"broken":L.tone==="good"?"ok":L.tone==="bad"?"warn":""}" title="${a(R)}">${L.name}${x?"（破格）":""}</span>`}).join("")}</div>`:"",Q=(e.daxianList||[]).length?`<div class="pp-chips">${e.daxianList.slice(0,8).map(L=>`<span class="pp-chip" title="${a(`${L.ganzhi} 宫干四化：`+L.mutagenHits.map(x=>`${x.star}化${x.type}→${x.palace||"未上盘"}`).join("、"))}">${L.branch} ${L.ages[0]}-${L.ages[1]}</span>`).join("")}</div>`:"",P=s&&s.mutagenHits&&s.mutagenHits.length?`<div class="pp-chips">${s.mutagenHits.map(L=>`<span class="pp-chip ${L.type==="忌"?"warn":L.type==="禄"?"ok":""}">${L.star}化${L.type}→${L.palace||"未上盘"}</span>`).join("")}</div>`:"",$=e.flyChains?(()=>{const L=["禄","权","科","忌"].map(x=>{const R=e.flyChains[x];if(!R||!R.steps.length)return"";const G=R.path.map(ue=>String(ue).replace(/宫$/,"")).join("→"),oe=R.steps.map(ue=>`${ue.from}（${ue.fromStem}）化${x}${ue.star}→${ue.to}`).join("；");return`<span class="pp-chip ${x==="忌"?"warn":x==="禄"?"ok":""}" title="${a(oe)}">飞${x} ${a(G)}${R.closed?"↺":""}</span>`}).join("");return L?`<div class="pp-chips">${L}</div>`:""})():"",N=e.flyComposite&&Array.isArray(e.flyComposite.labels)&&e.flyComposite.labels.length?`<div class="pp-chips">${e.flyComposite.labels.map(L=>{const x=/忌/.test(L)?"warn":/自化/.test(L)?"":"ok",R=se=>String(se).replace(/^.*?会/,"").replace(/^禄忌同宫/,"").replace(/自化$/,""),G=(e.flyComposite.targets||[]).find(se=>se.palace===R(L)),oe=G?G.incoming.map(se=>`${se.from}化${se.type}${se.star}`).join("、"):e.flyComposite.note;return`<span class="pp-chip ${x}" title="${a(oe)}">三方四正 ${a(L)}</span>`}).join("")}</div>`:"",Z=e.flow,F=Z?(()=>{const L=oe=>(oe.mutagenHits||[]).length?oe.mutagenHits.map(se=>`<i>${se.star}化${se.type}<em>→${se.palace||"未上盘"}</em></i>`).join(""):'<i class="dim">宫干无四化</i>',x=(oe,se,ue)=>`<div class="flow-row"><b>${oe}</b><span class="flow-p"><span class="flow-k">${se.ganzhi||"—"}　落${se.palace||"未上盘"}（${se.branch}）</span>${ue?`<em class="flow-same">${ue}</em>`:""}</span><span class="flow-m">${L(se)}</span></div>`,G=Z.day.branch===Z.month.branch?"（日数走满一圈，故同宫）":"";return`<div class="pp-flow">
        <div class="flow-row"><b>基准</b><span class="flow-p">${Z.asOf.solar}</span><span class="flow-m">农历 ${Z.asOf.lunar}　流年 ${Z.asOf.yearGanzhi}（斗君 ${Z.year.doujun}）</span></div>
        ${x(`流月 ${Z.month.index} 月`,Z.month)}
        ${x(`流日 ${Z.day.index} 日`,Z.day,G)}
        ${x(`流时 ${B[Z.hour.hourIndex]}时`,Z.hour)}
      </div>`})():"";return o._zw=e,o.briefHTML(e)+`<div class="pp">
      <input type="radio" name="ppm" id="ppm-ben" class="pp-r" checked>
      <input type="radio" name="ppm" id="ppm-da" class="pp-r">
      <input type="radio" name="ppm" id="ppm-ln" class="pp-r">
      <div class="pp-modes">
        <label for="ppm-ben">本命</label><label for="ppm-da">大限</label><label for="ppm-ln">流年</label>
        <span class="pp-soon">点任一宫位看详情</span>
      </div>
      ${j("ben",i,"ben")}
      ${j("da",c,"da")}
      ${j("ln",l,"ln")}
    </div>${F}${q}${$}${N}${C}${Q}${P}`};function Ye(e){return e.length?e.map(i=>{const s=E[i.type]||"aux",d=i.brightness?`<em class="dt-br ${ae[i.brightness]||"mid"}">${i.brightness}</em>`:"",n=i.mutagen?`<i class="pp-m ${ee[i.mutagen]}">${i.mutagen}</i>`:"";return`<span class="dt-st ${s}">${i.name}${d}${n}</span>`}).join(""):'<span class="dt-empty">无</span>'}function Ce(e,i){const s=o._zw;if(!s)return"";const d=$=>s.palaces.find(N=>B.indexOf(N.branch)===$),n=d(e)||s.palaces.find($=>B.indexOf($.branch)===e);if(!n)return"";const c=B.indexOf(n.branch),l=J[U(i-c)],u=n.shensha||{},g=n.stars.filter($=>$.type==="主星"),b=n.stars.filter($=>$.type==="吉星"||$.type==="辅星"),h=n.stars.filter($=>$.type==="煞星"),T=n.stars.filter($=>!["主星","吉星","辅星","煞星"].includes($.type)),j=(n.selfHua||[]).length?n.selfHua.map($=>`<i class="pp-m self ${ee[$.type]}" title="自化：宫干化回本宫">${$.type}</i>`).join(""):'<span class="dt-empty">无</span>',k=[U(c+4),U(c+8),U(c+6)].map($=>{const N=d($),Z=J[U(i-$)],F=N?N.stars.filter(x=>x.type==="主星").map(x=>x.name).join("、"):"",L=$===U(c+6)?"对宫":"三合";return`<span class="dt-st">${Z}[${B[$]}]<b>${F||"无主星"}</b><em>${L}</em></span>`}).join(""),q=d(U(c+6)),C=q?q.stars.filter($=>$.type==="主星"):[],Q=g.length?Ye(g):`<span class="dt-empty">无主星</span><span class="dt-tri">　借对宫 <b>${C.length?C.map($=>$.name).join("、"):"亦无主星"}</b></span>`,P=($,N)=>`<div class="dt-dr"><span class="dt-k">${$}</span><div class="dt-v">${N}</div></div>`;return`<div class="dt-dh">
        <b>${l}</b><span>${n.branch}宫 · ${n.ganzhi}</span>
        <span>大限 ${n.daxian.start}-${n.daxian.end}</span>
        <span>小限起 ${n.xiaoxian.age} 岁</span>
        ${n.isBody?"<span>· 身宫</span>":""}
        <span class="dt-x" data-pp-close="1">收起</span>
      </div>
      ${P("主星",Q)}
      ${P("吉辅",Ye(b))}
      ${h.length?P("煞星",Ye(h)):""}
      ${T.length?P("杂曜",Ye(T)):""}
      ${P("宫干四化",j)}
      ${P("十二神",`<span class="dt-tri">长生 ${u.changsheng||"—"}　博士 ${u.boshi||"—"}　将前 ${u.jiangqian||"—"}　岁前 ${u.suiqi||"—"}</span>`)}
      ${P("三方四正",`<span class="dt-tri">${k}</span>`)}
      <div class="hint">三方四正在盘上已同步标出（浅红描边）。再点一次本宫可收起。</div>`}function ba(e){e.querySelectorAll(".pp-cell.pp-sel,.pp-cell.pp-link").forEach(i=>{i.classList.remove("pp-sel"),i.classList.remove("pp-link")}),e.querySelectorAll('.pp-cell[aria-expanded="true"]').forEach(i=>i.setAttribute("aria-expanded","false"))}function Ve(){if(Ve.done||typeof document>"u"||!document.addEventListener)return;Ve.done=!0;const e=i=>{const s=i.closest(".pp-body");if(!s)return;const d=s.querySelector(".pp-detail");if(!d)return;if(i.classList.contains("pp-sel")){ba(s),d.classList.remove("open"),d.innerHTML="";return}ba(s);const n=Number(i.dataset.pi),c=Number(s.dataset.soul);s.querySelectorAll(".pp-cell").forEach(u=>{const g=Number(u.dataset.pi);(g===U(n+4)||g===U(n+8)||g===U(n+6))&&u.classList.add("pp-link")}),i.classList.add("pp-sel"),i.setAttribute("aria-expanded","true"),d.innerHTML=Ce(n,c),d.classList.add("open")};document.addEventListener("click",i=>{const s=i.target;if(s&&s.closest&&s.closest("[data-pp-close]")){const n=s.closest(".pp-body");if(n){ba(n);const c=n.querySelector(".pp-detail");c&&(c.classList.remove("open"),c.innerHTML="");return}}const d=s&&s.closest?s.closest(".pp-cell[data-pi]"):null;d&&e(d)}),document.addEventListener("keydown",i=>{if(i.key!=="Enter"&&i.key!==" ")return;const s=i.target&&i.target.closest?i.target.closest(".pp-cell[data-pi]"):null;s&&(i.preventDefault(),e(s))})}o.bindZiwei=Ve,o._palaceDetailHTML=Ce,Ve();function Aa(e,i){const s=i||{},d=e.slice().sort((n,c)=>c.position-n.position);return s.plain?d.map(n=>`<div class="mp-hy-row hy-plain">
        <span class="mp-hy-nm">${n.name||re[n.position-1]}</span>
        ${le(n.yinYang==="阳",n.moving)}
      </div>`).join(""):d.map(n=>{const c=n.yinYang==="阳",l=s.shiYing?n.position===s.shi?'<span class="mp-hy-sy">世</span>':n.position===s.ying?'<span class="mp-hy-sy">应</span>':"<span></span>":"<span></span>",u=n.moving?`<i class="mp-hy-mv" title="动爻">${c?"○":"×"}</i>`:'<i class="mp-hy-mv"></i>';return`<div class="mp-hy-row">
        ${l}
        <span class="mp-hy-nm">${n.name||re[n.position-1]}</span>
        <span class="mp-hy-ln">${le(c,n.moving)}${u}</span>
        <span class="mp-hy-gz">${a(n.ganzhi||"")}</span>
        <span class="mp-hy-lq">${a(n.liuqin||"")}</span>
        <span class="mp-hy-ls">${a(n.liushen||"")}</span>
      </div>`}).join("")}o.liuyaoHTML=function(e){const i=($,N,Z,F)=>`<div class="mp-hy-box">
      <div class="mp-hy-h"><b>${$}</b><span>${N}</span></div>
      <div class="mp-hy">${Aa(F,{shiYing:!0,shi:Z.shi,ying:Z.ying})}</div>
    </div>`,s=i(`本卦 ${e.ben.name}`,`${e.ben.palace} · ${e.ben.palaceElement}`,e.ben,e.ben.lines),d=e.bian?i(`变卦 ${e.bian.name}`,`${e.bian.palace} · ${e.bian.palaceElement}`,e.bian,e.bian.lines):`<div class="mp-hy-box"><div class="mp-hy-h"><b>六爻安静</b><span>无动爻，不取变卦</span></div>
          <div class="pp-dim" style="font-size:12px;line-height:1.9">断卦以本卦卦辞与世应生克为主。</div></div>`,n=e.body&&Array.isArray(e.body.labels)?e.body.labels:[],c=n.length?`<div class="pp-chips">${n.map($=>`<span class="pp-chip ${/伏吟/.test($)||/反吟/.test($)||/化退神/.test($)?"warn":/六冲|散/.test($)?"":"ok"}">${a($)}</span>`).join("")}</div>`:'<div class="pp-chips"><span class="pp-chip">卦体无六冲、六合、伏吟、反吟</span></div>',l=e.useGod&&e.useGod.liuqin?e.useGod:null,u=l?`<div class="pp-chips">${l.labels.map($=>`<span class="pp-chip ${/空亡|退神|受克|泄气|不上卦/.test($)?"warn":/持世|化进|六合|得飞神生/.test($)?"ok":""}">${a($)}</span>`).join("")}</div>`:'<div class="pp-chips"><span class="pp-chip">用神未取（未指明所问之事）</span></div>',g=e.useGodStrength&&Array.isArray(e.useGodStrength.labels)?e.useGodStrength:null,b=g&&g.labels.length?`<div class="pp-chips">${g.labels.map($=>`<span class="pp-chip ${/死|囚|月破|受日辰克|泄|耗/.test($)?"warn":/旺|相|得日辰生|比和/.test($)?"ok":""}">${a($)}</span>`).join("")}</div>`:"",h=e.fushenAccess&&Array.isArray(e.fushenAccess.labels)?e.fushenAccess:null,T=h&&h.labels.length?`<div class="pp-chips">${h.labels.map($=>`<span class="pp-chip ${/可出/.test($)?"ok":/受压难出|有助有压/.test($)?"warn":""}">伏神${a($)}</span>`).join("")}</div>`:"",j=e.yingqi&&Array.isArray(e.yingqi.labels)?e.yingqi:null,k=j&&j.labels.length?`<div class="pp-chips">${j.labels.map($=>`<span class="pp-chip ${/应期偏速/.test($)?"ok":/应期待解/.test($)?"warn":""}" title="只列地支，不出日期">${a($)}</span>`).join("")}</div>`:"",q=e.jinTuiPower&&Array.isArray(e.jinTuiPower.labels)?e.jinTuiPower:null,C=q&&q.labels.length?`<div class="pp-chips">${q.labels.map($=>`<span class="pp-chip ${/后劲足|退得缓/.test($)?"ok":/有限|进得虚|退得实|月破|未定/.test($)?"warn":""}">${a($)}</span>`).join("")}</div>`:"",Q=e.hexStrength&&Array.isArray(e.hexStrength.labels)?e.hexStrength:null,P=Q&&Q.labels.length?`<div class="pp-chips">${Q.labels.map($=>`<span class="pp-chip ${/死|囚|月破|冲空/.test($)?"warn":/旺|相/.test($)?"ok":""}">${a($)}</span>`).join("")}</div>`:"";return o.briefHTML(e)+`<div class="pp" style="padding:14px">
      <div class="mp-mh-head">起卦 ${e.cast.notation.join("、")}（自下而上）　日辰 ${e.dayGanZhi.name}</div>
      <div class="mp-hy-wrap">${s}${d}</div>
      ${c}
      ${u}
      ${b}
      ${T}
      ${k}
      ${C}
      ${P}
    </div>`},o.meihuaHTML=function(e){const i=(k,q,C,Q,P)=>{const N=[...ce[Q]||[0,0,0],...ce[C]||[0,0,0]].slice().reverse().map(Z=>le(!!Z,!1,"sm")).join("");return`<div class="mp-hexbox hb-mini">
        <div class="hb-h">${k}</div>
        <div class="hb-n">${q}</div>
        <div class="mp-mh-mini">${N}</div>
        <div class="hb-s">${P||`上${C} 下${Q}`}</div>
      </div>`},s=e.lines.slice().sort((k,q)=>q.position-k.position),d=s.slice(0,3),n=s.slice(3),c=e.moving>=4,l=(k,q,C,Q)=>`<div class="mp-trib">
      <div class="mp-trib-h">${k} ${me(q)}${q}${Ha(q)}<span class="mp-tritag ${Q?"tritag-ti":"tritag-yong"}">${Q?"体":"用"}</span></div>
      <div class="mp-hy" style="gap:5px">${Aa(C,{plain:!0})}</div>
    </div>`,u=`<div class="mp-hexbox">
      <div class="hb-h"><span>本卦</span><span>动 ${e.movingName}</span></div>
      <div class="hb-n">${e.ben.name}</div>
      ${l("上卦",e.ben.upper,d,!c)}
      ${l("下卦",e.ben.lower,n,c)}
      <div class="hb-s">${e.source}</div>
    </div>`,g=e.bodyUse.level,b=g.includes("凶")?"bad":g.includes("吉")?"good":"flat",h=`<div class="mp-mh-rel">
      <div><b>体</b>${e.bodyUse.body.trigram}（${e.bodyUse.body.element}）　<b>用</b>${e.bodyUse.use.trigram}（${e.bodyUse.use.element}）</div>
      <div><span class="mh-lv ${b}">${g}</span>　${e.bodyUse.relation}</div>
    </div>`,T=_a(e.cuo.name)||["",""],j=_a(e.zong.name)||["",""];return o.briefHTML(e)+`<div class="pp mp-mh">
      <div class="mp-mh-main">
        ${u}
        ${i("互卦",e.hu.name,e.hu.upper,e.hu.lower,"中藏之象")}
        ${i("变卦",e.bian.name,e.bian.upper,e.bian.lower,`动 ${e.movingName} 后`)}
        ${i("错卦",e.cuo.name,T[0],T[1],"六爻全变")}
        ${i("综卦",e.zong.name,j[0],j[1],"整卦倒转")}
      </div>
      ${h}
    </div>`};const Ta={乾为天:["乾","乾"],天风姤:["乾","巽"],天山遁:["乾","艮"],天地否:["乾","坤"],风地观:["巽","坤"],山地剥:["艮","坤"],火地晋:["离","坤"],火天大有:["离","乾"],坎为水:["坎","坎"],水泽节:["坎","兑"],水雷屯:["坎","震"],水火既济:["坎","离"],泽火革:["兑","离"],雷火丰:["震","离"],地火明夷:["坤","离"],地水师:["坤","坎"],艮为山:["艮","艮"],山火贲:["艮","离"],山天大畜:["艮","乾"],山泽损:["艮","兑"],火泽睽:["离","兑"],天泽履:["乾","兑"],风泽中孚:["巽","兑"],风山渐:["巽","艮"],震为雷:["震","震"],雷地豫:["震","坤"],雷水解:["震","坎"],雷风恒:["震","巽"],地风升:["坤","巽"],水风井:["坎","巽"],泽风大过:["兑","巽"],泽雷随:["兑","震"],巽为风:["巽","巽"],风天小畜:["巽","乾"],风火家人:["巽","离"],风雷益:["巽","震"],天雷无妄:["乾","震"],火雷噬嗑:["离","震"],山雷颐:["艮","震"],山风蛊:["艮","巽"],离为火:["离","离"],火山旅:["离","艮"],火风鼎:["离","巽"],火水未济:["离","坎"],山水蒙:["艮","坎"],风水涣:["巽","坎"],天水讼:["乾","坎"],天火同人:["乾","离"],坤为地:["坤","坤"],地雷复:["坤","震"],地泽临:["坤","兑"],地天泰:["坤","乾"],雷天大壮:["震","乾"],泽天夬:["兑","乾"],水天需:["坎","乾"],水地比:["坎","坤"],兑为泽:["兑","兑"],泽水困:["兑","坎"],泽地萃:["兑","坤"],泽山咸:["兑","艮"],水山蹇:["坎","艮"],地山谦:["坤","艮"],雷山小过:["震","艮"],雷泽归妹:["震","兑"]},Ca={乾:"金",兑:"金",离:"火",震:"木",巽:"木",坎:"水",艮:"土",坤:"土"},Ha=e=>Ca[e]?` ${Ca[e]}`:"",_a=e=>Ta[e]||null;o.daliurenHTML=function(e){const i=e.sanChuan,s=(u,g)=>`<div class="mp-dl-sc-c">
      <div class="mp-dl-sc-k">${g}</div>
      <div class="mp-dl-sc-z">${u.zhi}</div>
      <div class="mp-dl-sc-j">${u.jiangFull||u.jiang}</div>
      <div class="mp-dl-sc-l">${u.liuQin}${u.xunKong?" · 空":""}</div>
    </div>`,d=`<div class="mp-dl-sc-c ge">
      <div class="mp-dl-sc-k">格局</div>
      <div class="mp-dl-sc-gn">${e.geJu.name}</div>
      <div class="mp-dl-sc-l">${e.geJu.detail}</div>
    </div>`,n=e.siKe.slice().map(u=>`<div class="mp-dl-sk-c">
      <div class="mp-dl-sk-k">${["一课","二课","三课","四课"][u.position-1]||u.position+"课"}</div>
      <div class="mp-dl-sk-s">${u.shang}</div>
      <div class="mp-dl-sk-x">${u.xia}</div>
      <div class="mp-dl-sk-r">${u.relation} · ${u.jiangFull||u.jiang}</div>
    </div>`).join(""),c=e.pan.map(u=>{const g=ne[u.di]||[1,1];return`<div class="mp-dl-pc" style="grid-row:${g[0]};grid-column:${g[1]}">
        <div class="tz">${u.tian}</div>
        <div class="dz">地盘 ${u.di}</div>
        <div class="jz">${u.jiangFull}</div>
      </div>`}).join(""),l=`<div class="mp-dl-c">
      <div class="dl-t1">${e.dayGanZhi}日　${e.hourZhi}时</div>
      <div class="dl-t2">${e.dayNight}贵 · 月将 ${e.yueJiang.name}${e.yueJiang.zhi} · 贵人${e.guiren.reverse?"逆":"顺"}行</div>
      <div class="dl-t3">${i.chu.zhi} → ${i.zhong.zhi} → ${i.mo.zhi}</div>
      <div class="dl-t2">节气 ${e.jieqi.name}${e.jieqi.time?" "+e.jieqi.time:""}</div>
    </div>`;return o.briefHTML(e)+`<div class="pp mp-dl">
      <div class="mp-dl-head">日 ${e.dayGanZhi}　时 ${e.hourZhi}（${e.dayNight}贵）　月将 ${e.yueJiang.name}${e.yueJiang.zhi}　节气 ${e.jieqi.name}　贵人${e.guiren.reverse?"逆":"顺"}行</div>
      <div class="mp-dl-sc">${s(i.chu,"初传")}${s(i.zhong,"中传")}${s(i.mo,"末传")}${d}</div>
      <div class="mp-dl-sk">${n}</div>
      <div class="mp-dl-pan2">${c}${l}</div>
      ${(e.shensha||[]).length?`<div class="mp-dl-ss"><b>神煞</b>${e.shensha.map(u=>`<span title="${a(u.note||"")}">${u.name}<i>${u.branch}</i></span>`).join("")}</div>`:""}
      <div class="mp-dl-legend"><span>大字＝天盘支</span><span>小字＝地盘（固定十二支）</span><span>右下＝天将</span></div>
    </div>`},o.tarotHTML=function(e){const i=e.cards.map(n=>`
      <div class="mp-tt-card ${n.upright?"tt-up":"tt-rev"}">
        <div class="mp-tt-pos" title="${a(n.positionHint||"")}">${n.position}</div>
        <div class="mp-tt-name">${n.name}${n.number?`<span class="mp-tt-no">${n.number}</span>`:""}</div>
        <div class="mp-tt-ori">${n.orientation}</div>
        ${n.core?`<div class="mp-tt-core">${n.core}</div>`:""}
        <div class="mp-tt-kw">${n.keywords.map(c=>`<span>${c}</span>`).join("")}</div>
        <div class="mp-tt-el">${n.arcana} · ${n.element}${n.suit?" · "+n.suit+(n.rankCn?n.rankCn:""):""}${n.domain?" · "+n.domain:""}</div>
      </div>`).join(""),s=e.question?a(e.question):'<span class="pp-dim">（未填写，可在上方输入后重抽）</span>',d=(e.reading||[]).map(n=>`<p>${a(n)}</p>`).join("");return o.briefHTML(e)+`<div class="pp mp-tt">
      <div class="mp-tt-q"><b>所问</b>${s}</div>
      <div class="mp-tt-head">${e.spread}${e.castAt?`　·　抽牌于 ${e.castAt}`:""}</div>
      <div class="mp-tt-grid">${i}</div>
      <div class="mp-tt-read"><div class="mp-tt-rt">牌面解读</div>${d}</div>
      <div class="mp-tt-note"><div class="mp-tt-rt">你的记录</div>
        <textarea class="mp-tt-ta" rows="4" placeholder="写下判断或对照后的想法……（仅本页可见，不保存）"></textarea>
      </div>
      ${e.systemNote?`<div class="mp-tt-tip">${e.systemNote}</div>`:""}
      <div class="mp-tt-tip">塔罗用于自我觉察与娱乐，不作确定性预言。</div>
    </div>`};const ha=e=>{if(!e||!Array.isArray(e.pairs)||!e.pairs.length)return"";const s='<tr><th scope="col">一对</th><th scope="col">契合度</th>'+(e.pairs[0].dimensions||[]).map(l=>`<th scope="col">${a(l.label)}</th>`).join("")+"</tr>",d=e.pairs.map(l=>`<tr><th scope="row">${a(l.a)} × ${a(l.b)}</th><td>${l.total==null?"—":`${a(l.total)}/100`}<span class="mp-hp-lv">${a(l.level||"")}</span></td>`+(l.dimensions||[]).map(u=>`<td>${u.score>=0?"+":""}${a(u.score)}</td>`).join("")+"</tr>").join(""),n=e.spread>=3&&e.best?`最顺：<b>${a(e.best.a)} × ${a(e.best.b)}</b>（${a(e.best.total)}/100）`+(e.hardest?`；最需磨合：<b>${a(e.hardest.a)} × ${a(e.hardest.b)}</b>（${a(e.hardest.total)}/100）`:""):`三对分数接近（相差 ${a(e.spread)} 分），不排名`,c=e.focus&&e.focus.spread>=3?`<p>差异最大的一维：<b>${a(e.focus.label)}</b>（三对相差 ${a(e.focus.spread)} 分）</p>`:"";return`<div class="mp-hp-triple">
      <div class="mp-hp-ith">三方合盘 · 三对并列</div>
      <table><thead>${s}</thead><tbody>${d}</tbody></table>
      <p>${n}</p>${c}
      <p>${a(e.note||"")}</p>
    </div>`};o.hepanHTML=function(e){const i=(d,n)=>`<div class="mp-hp-side">
      <div class="mp-hp-who">${n}</div>
      <div class="mp-hp-gz">${d.pillars.join(" ")}</div>
      <div class="mp-hp-kv"><span>日主</span><b>${d.dayMaster}</b></div>
      <div class="mp-hp-kv"><span>日支</span><b>${d.dayBranch}</b></div>
      <div class="mp-hp-kv"><span>强弱</span><b>${d.strength||"—"}</b></div>
      <div class="mp-hp-kv"><span>喜用</span><b>${d.favor||"—"}</b></div>
    </div>`,s=e.dimensions.map(d=>`<div class="mp-hp-dim">
      <div class="mp-hp-dimh"><span>${d.label}</span><b class="${d.score>=10?"good":d.score<0?"bad":""}">${d.score>=0?"+":""}${d.score}</b></div>
      <div class="mp-hp-dimt">${d.text}</div>
    </div>`).join("");return o.briefHTML(e)+`<div class="pp mp-hp">
      <div class="mp-hp-head"><b>${e.score.level}</b><span>${e.score.total}/100</span></div>
      <div class="mp-hp-sides">${i(e.a,"你")}${i(e.b,"对方")}</div>
      <div class="mp-hp-dims">${s}</div>
      ${ha(e.triple)}
      <div class="mp-hp-notes">${e.notes.map(d=>`<p>${d}</p>`).join("")}</div>
    </div>`},o.qimenFactsHTML=function(e){if(!e||!e.palaces)return"";const i=(n,c)=>`<div class="relation__row"><dt>${a(n)}</dt><dd>${a(c)}</dd></div>`,s=n=>n&&["旺","相","休","囚","死"].filter(l=>Array.isArray(n[l])&&n[l].length).map(l=>`${l} ${n[l].join("、")}`).join("；")||"—";return`<dl class="relation mp-qm-facts" aria-label="奇门盘面事实">${[["局数",`${e.ju}${e.yuan?`（${e.yuan}）`:""}`],["节气",`${e.jieqi||"—"}${e.jieqiTime?`（${e.jieqiTime}）`:""}`],["四柱",`${e.siZhu?`${e.siZhu.year} ${e.siZhu.month} ${e.siZhu.day} ${e.siZhu.time}`:"—"}`],["值符",e.zhiFu?`${e.zhiFu.star} · ${e.zhiFu.gong}宫`:"—"],["值使",e.zhiShi?`${e.zhiShi.gate} · ${e.zhiShi.gong}宫`:"—"],["旬首",e.xunshou||"—"],["空亡",(e.kongWang||[]).join("")||"—"],["驿马",e.ma&&e.ma.zhi?`${e.ma.zhi}${e.ma.gong?`（${e.ma.gong}宫）`:""}`:"—"],["换局规则",e.juMethodNote||e.juMethod||"—"],["晚子时",e.lateZiHourMode==="next-day"?"23:00 后归次日":"23:00 后仍归当日"],["击刑",e.conditions&&e.conditions.jiXing&&e.conditions.jiXing.length?e.conditions.jiXing.map(n=>`${n.palace}宫${n.stem}`).join("、"):"本盘无"],["三奇入墓",e.conditions&&e.conditions.ruMu&&e.conditions.ruMu.length?e.conditions.ruMu.map(n=>`${n.palace}宫${n.stem}`).join("、"):"本盘无"],["六仪入墓",e.conditions&&e.conditions.liuYiRuMu&&e.conditions.liuYiRuMu.length?e.conditions.liuYiRuMu.map(n=>`${n.palace}宫${n.stem}`).join("、"):"本盘无"],["十干克应",[...e.palaces||[],e.centerPalace].filter(c=>c&&c.ganYing).map(c=>`${c.palace}宫 ${c.ganYing.tian}加${c.ganYing.di}「${c.ganYing.name}」`).join("；")||"—"],["月令",e.month&&e.month.branch?`${e.month.branch}（${e.month.element}）`:"—"],["门旺衰",s(e.states&&e.states.gate)],["星旺衰",s(e.states&&e.states.star)],["干旺衰",s(e.states&&e.states.stem)],["干宫生克",(()=>{const n=["干克宫","宫克干","干生宫","宫生干","比和"],c={};for(const l of e.palaces||[]){const u=l.stemRelation||null;!u||u.type==="unknown"||!l.tianPan||(c[u.type]=c[u.type]||[]).push(l.tianPan)}return n.filter(l=>c[l]).map(l=>l+" "+c[l].join("、")).join("；")||"—"})()]].map(([n,c])=>i(n,c)).join("")}</dl>`};const mt=[["4","9","2"],["3","5","7"],["8","1","6"]];o.qimenHTML=function(e){const i={};for(const d of e.palaces)i[d.palace]=d;const s=d=>{if(d==="5")return`<div class="pp-qm-cell center">
          <div class="pp-qm-ju">${e.ju}</div>
          <div class="pp-qm-kv">${e.siZhu.year} ${e.siZhu.month}</div>
          <div class="pp-qm-kv">${e.siZhu.day} ${e.siZhu.time}</div>
          <div class="pp-qm-kv dim">${e.jieqi} ${e.yuan}</div>
        </div>`;const n=i[d]||{};return`<div class="pp-qm-cell">
        <div class="pp-qm-top"><span class="god">${n.god||""}</span><span class="mk">${n.kong?"空":""}${n.ma?"马":""}</span></div>
        <div class="pp-qm-mid"><span class="tp">${n.tianPan||""}</span><span class="star">${n.star||""}</span></div>
        <div class="pp-qm-mid"><span class="dp">${n.diPan||""}</span><span class="gate">${n.gate||""}</span></div>
        <div class="pp-qm-bot"><span>${n.anGan||""}</span><span class="no">${d}</span></div>
        <div class="pp-qm-bot"><span class="dim">${n.stemRelation&&n.stemRelation.type!=="unknown"?n.stemRelation.type:""}</span><span class="dim">${n.stemState||""}</span></div>
        <div class="pp-qm-bot"><span class="dim">${n.ganYing?a(`${n.ganYing.tian}加${n.ganYing.di} ${n.ganYing.name}`):""}</span></div>
      </div>`};return o.briefHTML(e)+`<div class="pp mp-qm">
      <div class="mp-qm-head">
        <b>${e.ju}</b>
        <span>${e.siZhu.year} ${e.siZhu.month} ${e.siZhu.day} ${e.siZhu.time}</span>
        <span>节气 ${e.jieqi}（${e.jieqiTime}）</span>
        <span>值符 ${e.zhiFu.star}（${e.zhiFu.gong}宫）　值使 ${e.zhiShi.gate}（${e.zhiShi.gong}宫）</span>
        <span>旬首 ${e.xunshou}　空亡 ${e.kongWang.join("")||"—"}　驿马 ${e.ma.zhi||"—"}</span>
      </div>
      <div class="mp-qm-grid">${mt.map(d=>d.map(s).join("")).join("")}</div>
      <div class="mp-qm-legend">上＝九星　中＝天盘干／八门　下＝地盘干／宫号　角落＝八神</div>
      <div class="mp-qm-rules">${e.rules.map(d=>`<p>${d}</p>`).join("")}</div>
    </div>`},o.ziweiHepanHTML=function(e){const i=(n,c)=>`<div class="mp-hp-side">
      <div class="mp-hp-who">${c}</div>
      <div class="mp-hp-gz">命宫 ${n.soul.branch}　夫妻 ${n.soul.branch,""}${n.spouseStars.length,""}</div>
      <div class="mp-hp-kv"><span>命宫主星</span><b>${n.soulStars.join("、")||"无正曜"}</b></div>
      <div class="mp-hp-kv"><span>夫妻宫主星</span><b>${n.spouseStars.join("、")||"无正曜"}</b></div>
      <div class="mp-hp-kv"><span>五行局</span><b>${n.bureau}</b></div>
      <div class="mp-hp-kv"><span>身宫</span><b>${n.body.branch}（${n.body.lands||"—"}）</b></div>
      <div class="mp-hp-kv"><span>生年四化</span><b>${n.natalSihua.join("、")}</b></div>
    </div>`,s=e.dimensions.map(n=>`<div class="mp-hp-dim">
      <div class="mp-hp-dimh"><span>${n.label}</span><b class="${n.score>=10?"good":n.score<0?"bad":""}">${n.score>=0?"+":""}${n.score}</b></div>
      <div class="mp-hp-dimt">${n.text}</div>
    </div>`).join(""),d=n=>(e.interactions||[]).filter(c=>c.who===n).map(c=>`<li><b class="m-${c.mutagen}">${c.mutagen}</b>${c.star}：本命${c.ownPalace} → 对方${c.landingPalace||"盘外"}${c.strong?"<i>（强）</i>":""}</li>`).join("");return o.briefHTML(e)+`<div class="pp mp-hp">
      <div class="mp-hp-head"><b>${e.score.level}</b><span>${e.score.total}/100　紫微合盘</span></div>
      <div class="mp-hp-sides">${i(e.a,"你")}${i(e.b,"对方")}</div>
      <div class="mp-hp-dims">${s}</div>
      <div class="mp-hp-inter">
        <div><div class="mp-hp-ith">你的四化 落在对方</div><ul>${d("你")||"<li>无</li>"}</ul></div>
        <div><div class="mp-hp-ith">对方的四化 落在你</div><ul>${d("对方")||"<li>无</li>"}</ul></div>
      </div>
      ${ha(e.triple)}
      <div class="mp-hp-notes">${e.notes.map(n=>`<p>${n}</p>`).join("")}</div>
    </div>`},o.curveHTML=function(e){const i=e&&e.dayun&&Array.isArray(e.dayun.list)?e.dayun.list:[],s=e&&Array.isArray(e.liunian)?e.liunian:[];if(i.length<2)return"";const d=A=>typeof A=="number"&&isFinite(A)?A:0,n=A=>A.luck?d(A.luck.score):0,c=4.2,l=-2.2,u=d(e.dayun.startAge&&e.dayun.startAge.years),g=i.length?i[i.length-1].startAge+10:u+80,b=s.map(A=>d(A.age)).filter(A=>A>0),h=Math.min(u,...b.length?b:[u]),T=Math.max(g,...b.length?b:[g]),j=Math.max(1,T-h),k=640,q=190,C={t:14,r:16,b:26,l:30},Q=k-C.l-C.r,P=q-C.t-C.b,$=A=>C.l+(A-h)/j*Q,N=A=>C.t+P-(Math.max(l,Math.min(c,A))-l)/(c-l)*P,F=[{from:1.2,to:c,cls:"b-good"},{from:.55,to:1.2,cls:"b-good"},{from:-.8,to:.55,cls:"b-flat"},{from:-1.45,to:-.8,cls:"b-bad"},{from:l,to:-1.45,cls:"b-bad"}].map(A=>`<rect class="cv-band ${A.cls}" x="${C.l}" y="${N(A.to).toFixed(1)}" width="${Q}" height="${(N(A.from)-N(A.to)).toFixed(1)}"/>`).join(""),L=10/j*Q,x=[];i.forEach((A,de)=>{const ze=d(A.startAge),he=n(A),Ge=Math.max(C.l,$(ze)),Le=Math.min(C.l+Q,$(ze+10));x.push(`${Ge.toFixed(1)},${N(he).toFixed(1)}`),x.push(`${Le.toFixed(1)},${N(he).toFixed(1)}`)});const R=x.length?`<polyline class="cv-dy" points="${x.join(" ")}"/>`:"",G=x.length?`<polygon class="cv-dyfill" points="${C.l},${(C.t+P).toFixed(1)} ${x.join(" ")} ${(C.l+Q).toFixed(1)},${(C.t+P).toFixed(1)}"/>`:"",oe=s.filter(A=>A.luck&&typeof A.luck.score=="number").map(A=>({x:$(d(A.age)),y:N(d(A.luck.score)),y0:d(A.year),gz:A.ganzhi,tier:A.luck.tier,v:d(A.luck.score),age:d(A.age)})),se=oe.length>1?`<polyline class="cv-ln" points="${oe.map(A=>`${A.x.toFixed(1)},${A.y.toFixed(1)}`).join(" ")}"/>`:"",ue={大吉:"var(--lu)",吉:"var(--lu)",平:"var(--muted)",忌:"var(--red)",大忌:"var(--red)"},xe=oe.length?Math.min(...oe.map(A=>A.y0)):null,Ne=oe.map(A=>`<circle class="cv-dot${A.y0===xe?" now":""}" cx="${A.x.toFixed(1)}" cy="${A.y.toFixed(1)}" fill="${ue[A.tier]||"var(--muted)"}"><title>${a(`${A.y0}年（${A.age}岁）${A.gz}　${A.tier} ${A.v}`)}</title></circle>`).join(""),we=`<line class="cv-ax zero" x1="${C.l}" y1="${N(0).toFixed(1)}" x2="${C.l+Q}" y2="${N(0).toFixed(1)}"/><line class="cv-ax" x1="${C.l}" y1="${C.t}" x2="${C.l}" y2="${C.t+P}"/>`,He=j>60?10:5,_e=[];for(let A=Math.ceil(h/He)*He;A<=T;A+=He)_e.push(`<text class="cv-lbl age" x="${$(A).toFixed(1)}" y="${(C.t+P+13).toFixed(1)}" text-anchor="middle">${A}岁</text>`);const ea=`<text class="cv-lbl" x="${(C.l-5).toFixed(1)}" y="${(N(2.4)+3).toFixed(1)}" text-anchor="end">吉</text><text class="cv-lbl" x="${(C.l-5).toFixed(1)}" y="${(N(0)+3).toFixed(1)}" text-anchor="end">平</text><text class="cv-lbl" x="${(C.l-5).toFixed(1)}" y="${(N(-1.8)+3).toFixed(1)}" text-anchor="end">忌</text>`,Me=i.slice().sort((A,de)=>n(de)-n(A)),H=Me[0],m=Me[Me.length-1],w=H&&n(H)>.55?`<text class="cv-lbl" x="${$(d(H.startAge)+5).toFixed(1)}" y="${(N(n(H))-5).toFixed(1)}" text-anchor="middle">▲${H.startAge}岁 ${H.luck.tier}</text>`:"",V=m&&n(m)<-.8?`<text class="cv-lbl" x="${$(d(m.startAge)+5).toFixed(1)}" y="${(N(n(m))+11).toFixed(1)}" text-anchor="middle">▼${m.startAge}岁 ${m.luck.tier}</text>`:"",Y=`<div class="cv-legend">
      <span><i style="background:var(--quan)"></i>大运（阶梯，一步十年）</span>
      <span><i style="background:var(--ke)"></i>流年（逐年折线）</span>
      <span>绿带＝吉　灰带＝平　红带＝忌</span>
    </div>`,v=`<div class="cv-tip">曲线只呈现引擎已给出的行运评分（${l} ~ ${c}），不预测具体事件；档位与依据见下方「大运 / 流年」各节。悬停看逐年详情。</div>`;return`<div class="mp-curve">
      <div class="mp-curve-h"><b>人生运势曲线</b><span>${h}–${T} 岁　${e.dayun.rule}，${u} 岁起运${e.dayun.jiao&&e.dayun.jiao.at?`，交运 ${e.dayun.jiao.at}`:""}</span></div>
      <svg viewBox="0 0 ${k} ${q}" role="img" aria-label="人生运势曲线：${h} 到 ${T} 岁的大运与流年评分走势">
        ${F}${we}${G}${R}${se}${Ne}${_e.join("")}${ea}${w}${V}
      </svg>
      ${Y}${v}
    </div>`},o.trendChart=function(e){const i=e&&Array.isArray(e.points)?e.points:[];if(i.length<2)return"";const s=e&&Array.isArray(e.segments)?e.segments:[],d=H=>typeof H=="number"&&isFinite(H)?H:0,n=720,c=322,l={t:34,r:46,b:66,l:36},u=n-l.l-l.r,g=c-l.t-l.b,b=i.length,h=u/b,T=H=>l.l+(H+.5)*h,j=H=>l.t+g-Math.max(0,Math.min(100,H))/100*g,k=Math.max(1.1,Math.min(10,h*.62)),q=H=>d(H.score),C=l.t+g,Q=C+20,P=22,N=`klclip${(()=>{let H=2166136261;const m=w=>{const V=String(w??"");for(let Y=0;Y<V.length;Y++)H^=V.charCodeAt(Y),H=Math.imul(H,16777619)};m(b),m(i[0]&&i[0].age),m(i[b-1]&&i[b-1].age);for(const w of i)m(w&&w.score);return(H>>>0).toString(36)})()}`,Z=s.map((H,m)=>{const w=Math.max(0,H.startAge-1),V=Math.min(b-1,H.endAge-1);if(V<w)return"";const Y=l.l+w*h,v=Math.max(.6,(V-w+1)*h),de=m%2===1?`<rect class="kl-band" x="${Y.toFixed(1)}" y="${l.t}" width="${v.toFixed(1)}" height="${g}"/><rect class="kl-stripband" x="${Y.toFixed(1)}" y="${Q}" width="${v.toFixed(1)}" height="${P}"/>`:"",ze=m===0?"":`<line class="kl-segline" x1="${Y.toFixed(1)}" y1="${l.t}" x2="${Y.toFixed(1)}" y2="${C}"/>`,he=Math.min(Math.max(l.l+(w+V+1)/2*h,l.l+22),l.l+u-22);return de+ze+`<text class="kl-seg" x="${he.toFixed(1)}" y="${(Q+15).toFixed(1)}" text-anchor="middle">${a(H.ganZhi)}</text>`}).join(""),F=[0,25,50,75,100].map(H=>`<line class="kl-grid${H===50?" mid":""}" x1="${l.l}" y1="${j(H).toFixed(1)}" x2="${l.l+u}" y2="${j(H).toFixed(1)}"/><text class="kl-lbl" x="${l.l-6}" y="${(j(H)+3).toFixed(1)}" text-anchor="end">${H}</text>`).join(""),L=i.map((H,m)=>{const w=H.kline||{},V=d(w.open),Y=d(w.close),v=Math.min(100,d(w.high)),A=Math.max(0,d(w.low)),de=Y>=V,ze=j(V),he=j(Y),Ge=Math.min(ze,he),Le=Math.max(.8,Math.abs(ze-he)),ka=T(m),bt=`${H.age}岁（${H.year}年 ${H.ganZhi}）${Y}分${H.dayunGanZhi?` · ${H.dayunGanZhi}运`:""}`;return`<g class="kl-c${de?" up":" down"}"><title>${a(bt)}</title><line x1="${ka.toFixed(2)}" y1="${j(v).toFixed(1)}" x2="${ka.toFixed(2)}" y2="${j(A).toFixed(1)}"/><rect x="${(ka-k/2).toFixed(2)}" y="${Ge.toFixed(1)}" width="${k.toFixed(2)}" height="${Le.toFixed(1)}" rx="0.7"/></g>`}).join(""),x=H=>{const m=[];for(let w=0;w<b;w++){if(w+1<H)continue;let V=0;for(let Y=w+1-H;Y<=w;Y++)V+=q(i[Y]);m.push({i:w,v:V/H})}return m},R=H=>x(H).map((m,w)=>`${w?"L":"M"}${T(m.i).toFixed(1)} ${j(m.v).toFixed(1)}`).join(" "),G=(H,m)=>{const w=x(H);if(!w.length)return"";const V=w[w.length-1];return{cls:m,y:j(V.v),text:`<text class="kl-ma-lbl ${m}" x="${l.l+u+5}" y="${j(V.v).toFixed(1)}" text-anchor="start">${V.v.toFixed(0)}</text>`}},oe=G(10,"m10"),se=G(5,"m5"),ue=(()=>{if(!se||!oe)return`${oe?oe.text:""}${se?se.text:""}`;let H=se.y,m=oe.y;if(Math.abs(H-m)<10){const w=Math.min(H,m),V=Math.max(H,m);H=w-6,m=V+6}return`<text class="kl-ma-lbl m10" x="${l.l+u+5}" y="${m.toFixed(1)}" text-anchor="start">${x(10).slice(-1)[0].v.toFixed(0)}</text><text class="kl-ma-lbl m5" x="${l.l+u+5}" y="${H.toFixed(1)}" text-anchor="start">${x(5).slice(-1)[0].v.toFixed(0)}</text>`})();let xe=i[0],Ne=i[0];for(const H of i)q(H)>q(xe)&&(xe=H),q(H)<q(Ne)&&(Ne=H);const we=(H,m,w)=>{const V=i.indexOf(H),Y=T(V),v=j(q(H)),A=Math.min(Math.max(Y,l.l+26),l.l+u-26),de=m==="hi"?v-8<l.t+6?14:w:v+12>l.t+g-2?-8:w;return`<g class="kl-mark ${m}"><circle cx="${Y.toFixed(1)}" cy="${v.toFixed(1)}" r="2"/><circle class="ring" cx="${Y.toFixed(1)}" cy="${v.toFixed(1)}" r="4.6"/><text x="${A.toFixed(1)}" y="${(v+de).toFixed(1)}" text-anchor="middle">${H.age}岁 ${q(H)}</text></g>`},He=b>60?10:5,_e=i.filter(H=>H.age%He===0).map(H=>`<text class="kl-lbl age" x="${T(i.indexOf(H)).toFixed(1)}" y="${(C+14).toFixed(1)}" text-anchor="middle">${H.age}</text>`).join(""),ea=`<text class="kl-lbl axis" x="${l.l}" y="${(c-6).toFixed(1)}">年龄（岁）</text><text class="kl-lbl axis" x="${l.l+u}" y="${(c-6).toFixed(1)}" text-anchor="end">每岁一分 · 满分 100</text>`;return`<div class="mp-kline-fig">
      <svg viewBox="0 0 ${n} ${c}" role="img" aria-label="人生K线：1 到 ${b} 岁的逐年评分蜡烛图">
        <defs><clipPath id="${N}"><rect x="${l.l}" y="${l.t}" width="${u}" height="${g}"/></clipPath></defs>
        ${Z}${F}
        <g clip-path="url(#${N})">
          ${L}
          <path class="kl-ma m10" d="${R(10)}"/><path class="kl-ma m5" d="${R(5)}"/>
        </g>
        ${ue}
        ${we(xe,"hi",-8)}${we(Ne,"lo",12)}
        ${_e}${ea}
      </svg><div class="kl-legend"><span><i class="up"></i>阳线：比上一岁高</span><span><i class="down"></i>阴线：比上一岁低</span><span><i class="m5"></i>5 年均线</span><span><i class="m10"></i>10 年均线</span><span>虚线＝大运交界</span></div></div>`},o.trendHTML=function(e,i){if(!e)return"";const s=!(i&&i.brief===!1),d=o.trendChart(e);if(!d)return o.quickHTML(e);const n=Array.isArray(e.segments)?e.segments:[],c=e.highlights&&typeof e.highlights=="object"?e.highlights:{},l=e.meta||{},u=l.strength||{},g=n.map(F=>`<span class="kl-chip">${a(F.ganZhi)}<em>${F.startAge}–${F.endAge}</em></span>`).join(""),b=(Array.isArray(c.best)?c.best:[]).map(F=>`<div class="kl-hl hi">${a(F)}</div>`).join(""),h=(Array.isArray(c.worst)?c.worst:[]).map(F=>`<div class="kl-hl lo">${a(F)}</div>`).join(""),T=l.boundaryNote?`<div class="mp-kline-note">${a(l.boundaryNote)}</div>`:c.suppressed?`<div class="mp-kline-note">${a(c.suppressed)}</div>`:"",j=Array.isArray(e.points)?e.points:[],k=F=>typeof F.score=="number"&&isFinite(F.score)?F.score:0,q=j.map(k),C=q.length?q.reduce((F,L)=>F+L,0)/q.length:0,Q=q.length?Math.max(...q)-Math.min(...q):0,P=n.map(F=>{const L=j.filter(x=>x.age>=F.startAge&&x.age<=F.endAge).map(k);return{ganZhi:F.ganZhi,v:L.length?L.reduce((x,R)=>x+R,0)/L.length:0}}).filter(F=>F.v>0).sort((F,L)=>L.v-F.v),$=!!(u.boundary||c.suppressed),N=[`<span><em>全段均值</em><b>${C.toFixed(0)}</b></span>`];!$&&P.length&&(N.push(`<span><em>最好大运</em><b class="hi">${a(P[0].ganZhi)} ${P[0].v.toFixed(0)}</b></span>`),N.push(`<span><em>最差大运</em><b class="lo">${a(P[P.length-1].ganZhi)} ${P[P.length-1].v.toFixed(0)}</b></span>`)),N.push(`<span><em>波动幅度</em><b>${Q.toFixed(0)}</b></span>`);const Z=`<div class="kl-stats">${N.join("")}</div>`;return(s?o.briefHTML(e):"")+`<section class="mp-kline" aria-label="人生K线结果">
      <div class="mp-kline-h"><b>人生 K 线</b><span>${a(l.birth||"")}　日主 ${a(l.dayMaster||"")}　${a(u.level||"")}${u.score?`（${u.score}）`:""}</span></div>
      ${d}
      ${Z}
      ${g?`<div class="kl-segs">${g}</div>`:""}
      ${b||h?`<div class="kl-hls">${b}${h}</div>`:""}
      ${T}
      <div class="mp-kline-tip">逐岁分数由大运与流年十神按固定表确定性计分（1–100），只表五行力量的顺逆，不预测具体事件；旺衰落在换档阈值附近时，不出高低年份结论。</div>
    </section>`},o.chengguHTML=function(e){if(!e)return"";const i=e.weights||{},s=e.song||{},d=["year","month","day","hour"].map(u=>{const g=i[u]||{label:"",qian:0},b=String(g.label||"").split(" ")[0]||"",h=String(g.label||"").split(" ")[1]||"";return`<div class="cg-cell"><em>${a(b)}</em><b>${a(h)}</b></div>`}).join(""),n=String(s.text||""),c=n?n.replace(/[。]$/,"").split("；").map((u,g)=>`<span>${a(u)}${g===0?"；":"。"}</span>`).join(""):"",l=e.verdict&&e.verdict.band?e.verdict.band:"";return`<section class="mp-cg" aria-label="称骨结果">
      <div class="mp-cg-h"><b>称骨</b><span>${a(e.lunar&&e.lunar.text?e.lunar.text:"")}</span></div>
      <div class="mp-cg-w">${d}</div>
      <div class="mp-cg-tot"><em>骨重合计</em><b>${a(e.total&&e.total.label?e.total.label:"")}</b>${l?`<i>${a(l)}</i>`:""}</div>
      <div class="mp-cg-song"><div class="mp-cg-song-h">称骨歌 · ${a(e.total&&e.total.label?e.total.label:"")}</div>
        <div class="mp-cg-verse">${c||'<span class="mp-cg-miss">该骨重未见通行本歌诀</span>'}</div>
        <div class="mp-cg-plain"><em>释义</em>${a(s.plain||"")}</div></div>
      ${e.verdict&&e.verdict.text?`<div class="mp-cg-band"><em>分档</em>${a(e.verdict.text)}</div>`:""}
      <div class="mp-cg-note">骨重与歌诀为通行本口径（各版本歌诀有异文，断句标点已统一）；释义为白话自撰，只作字面直解，属民俗娱乐参考，不构成命运断言。</div>
    </section>`},o.nameHTML=function(e){if(!e)return"";const i={木:"wood",火:"fire",土:"earth",金:"metal",水:"water"},s=b=>b==="未收录"?'<span class="mp-nm-el">未收录</span>':`<span class="mp-nm-el wx-${i[b]||"earth"}">${a(b)}</span>`,d=(b,h)=>`<div class="mp-nm-h"><b>${a(b)}</b>${h?`<i>${a(h)}</i>`:""}</div>`;if(e.action==="generate"){const b=e.bazi&&e.bazi.favorable?e.bazi.favorable.join("、"):"",h=(e.candidates||[]).map(T=>{const j=T.wuge&&T.wuge.available?(()=>{const q=T.wuge.rows.filter(P=>P.level==="吉").length,C=T.wuge.rows.filter(P=>P.level==="凶").length;return`<span class="mp-nm-fit${C===0&&q>=4?" ok":C>=2?" no":""}" title="${a(T.wuge.summary)}">五格 ${q}/5 吉</span>`})():"",k=T.phonetics&&T.phonetics.available?`<span class="mp-nm-fit${T.phonetics.level==="拗口"?" no":T.phonetics.level==="顺口"?" ok":""}" title="${a((T.phonetics.issues||[]).map(q=>q.text).join("；"))}">${a(T.phonetics.level)}</span>`:"";return`<div class="mp-nm-c"><b>${a(T.name)}</b><span class="mp-nm-els">${T.chars.map(q=>s(q.element)).join("")}${j}${k}</span><em>${a(T.chars.map(q=>q.char+"·"+q.meaning).join("　"))}</em></div>`}).join("");return`<section class="mp-nm" aria-label="候选名">
        ${d("候选名",`姓 ${e.surname}（${e.gender}）${b?`　喜用 ${b}`:""}`)}
        <div class="mp-nm-cand">${h}</div>
        <div class="mp-nm-note">${(e.notes||[]).map(T=>"※ "+a(T)).join("<br>")}</div>
      </section>`}const n=(e.chars||[]).map(b=>{const h=b.favorable===!0?'<span class="mp-nm-fit ok">合喜用</span>':b.favorable===!1?'<span class="mp-nm-fit no">不合喜用</span>':'<span class="mp-nm-fit">不判</span>',T=b.source==="user"?"用户指定":b.source==="lib"?"字库":"未收录",j=b.suggest&&b.suggest.length?`<div class="mp-nm-sug"><b>可换</b>${b.suggest.map(k=>`<span class="wx-${i[k.element]||"earth"}">${a(k.char)}（${a(k.element)}）</span>`).join("")}</div>`:"";return`<div class="mp-nm-row"><div class="mp-nm-ch">${a(b.char)}</div>
        <div class="mp-nm-b"><div class="mp-nm-t">${s(b.element)}<span>${a(T)}</span>${h}</div>
        <div class="mp-nm-m">${a(b.meaning)}</div>${j}</div></div>`}).join(""),c=e.bazi?`<div class="mp-nm-m">八字：${a(e.bazi.dayMaster&&e.bazi.dayMaster.stem?`${e.bazi.dayMaster.stem}（${e.bazi.dayMaster.element}）`:String(e.bazi.dayMaster||""))}　${a(e.bazi.strength?`${e.bazi.strength.level}（${e.bazi.strength.score}）`:"")}　喜用 ${a((e.bazi.favorable||[]).join("、"))}</div>
         <div class="mp-nm-m">${a(e.bazi.basis||"")}</div>`:"",l=b=>b==="吉"?"is-ok":b==="半吉"?"is-half":"is-bad",u=e.wuge&&e.wuge.available?`<div class="mp-nm-wu">
          <div class="mp-nm-wu-h"><b>五格</b><i>康熙笔画 · 通行本 81 数理</i></div>
          <div class="mp-nm-wu-rows">${e.wuge.rows.map(b=>`<div class="mp-nm-wu-c ${l(b.level)}"><em>${a(b.key)}</em><b>${b.strokes}</b><i>${a(`${b.level} · ${b.name}`)}</i></div>`).join("")}</div>
          <div class="mp-nm-m">笔画：${e.wuge.strokes.map(b=>`${a(b.char)}${b.strokes}${b.source==="user"?"（指定）":""}`).join(" ＋ ")}</div>
          <div class="mp-nm-m">三才：${a(e.wuge.sancai.text)}</div>
        </div>`:`<div class="mp-nm-wu"><div class="mp-nm-wu-h"><b>五格</b><i>这一版算不了</i></div><div class="mp-nm-m">${a(e.wuge?e.wuge.reason:"未算")}</div></div>`,g=e.phonetics&&e.phonetics.available?`<div class="mp-nm-ph"><b>音韵</b><span class="mp-nm-ph-lv${e.phonetics.level==="顺口"?" ok":e.phonetics.level==="拗口"?" bad":" warn"}">${a(e.phonetics.level)}</span><em>${a(e.phonetics.chars.map(b=>`${b.py}${b.tone}`).join(" "))}　声调 ${a(e.phonetics.tonePattern)}</em>${(e.phonetics.issues||[]).map(b=>`<span class="mp-nm-ph-i">${a(b.text)}</span>`).join("")}</div>`:`<div class="mp-nm-ph"><b>音韵</b><em>${a(e.phonetics?e.phonetics.reason:"未算")}</em></div>`;return`<section class="mp-nm" aria-label="名字评估">
      ${d(e.fullName||"",`字库 ${e.stats&&e.stats.libSize?e.stats.libSize:""} 字${e.stats&&e.stats.unknown?`　未收录 ${e.stats.unknown}`:""}`)}
      ${n}
      ${c}
      ${u}
      ${g}
      <div class="mp-nm-verd">${a(e.verdict||"")}</div>
      <div class="mp-nm-note">${(e.notes||[]).map(b=>"※ "+a(b)).join("<br>")}</div>
    </section>`},o.briefHTML=function(e){return e&&e.brief?o.summaryHTML(e.brief):""},o.summaryHTML=function(e){if(!e||!e.lead)return"";const i=(e.sections||[]).map(n=>`<div class="mp-br-sec"><b>${a(n.h)}</b><p>${a(n.t)}</p></div>`).join(""),s=e.advice&&e.advice.length?`<div class="mp-br-adv"><b>可以试着做的</b><ul>${e.advice.map(n=>`<li>${a(n)}</li>`).join("")}</ul></div>`:"",d=e.chips&&e.chips.length?`<div class="mp-br-chips">${e.chips.map(n=>`<span>${a(n)}</span>`).join("")}</div>`:"";return`<section class="mp-br" aria-label="先说结论">
      <div class="mp-br-h"><b>${a(e.title||"先看这一张")}</b>${d}</div>
      <p class="mp-br-lead">${a(e.lead)}</p>
      ${i}
      ${s}
      ${e.caveat?`<p class="mp-br-cav">※ ${a(e.caveat)}</p>`:""}
      ${e.footer?`<p class="mp-br-foot">${a(e.footer)}</p>`:""}
    </section>`},o.baziHTML=function(e){const i=[["year","年柱"],["month","月柱"],["day","日柱"],["hour","时柱"]].filter(([m])=>e.pillars[m]),s={year:"年",month:"月",day:"日",hour:"时"},d={木:"wood",火:"fire",土:"earth",金:"metal",水:"water"},n={比肩:"tg-bi",劫财:"tg-bi",食神:"tg-shi",伤官:"tg-shi",偏财:"tg-cai",正财:"tg-cai",七杀:"tg-guan",正官:"tg-guan",偏印:"tg-yin",正印:"tg-yin"},c=m=>`<span class="tg ${n[m]||""}">${m}</span>`,l=m=>`<span class="wx-${d[m]||"earth"}">${pe(m)}${m}</span>`,u=m=>`<span class="ss-s ${m.luck||"neutral"}" title="${a(`${m.cat} · ${m.via}查${m.target} ｜ ${m.rule}`)}">${m.name}</span>`,g=(m,w)=>`<tr><td class="bz-lbl">${m}</td>${i.map(([V])=>`<td data-c="${s[V]}">${w(e.pillars[V],V)}</td>`).join("")}</tr>`,b=`<thead><tr><th></th>${i.map(([m,w])=>`<th${m==="day"?' class="bz-hdr-day"':""}>${w}</th>`).join("")}</tr></thead>`,h={寅:"木",卯:"木",巳:"火",午:"火",申:"金",酉:"金",亥:"水",子:"水",辰:"土",戌:"土",丑:"土",未:"土"},T={木:"火",火:"土",土:"金",金:"水",水:"木"},j={木:"土",土:"水",水:"火",火:"金",金:"木"},k=h[e.pillars.month.branch]||"土",q=["木","火","土","金","水"],C=m=>m===k?"旺":T[k]===m?"相":T[m]===k?"休":j[m]===k?"囚":"死",Q=`<tr><td class="bz-lbl">五行</td><td class="bz-wxs" colspan="${i.length}">${["旺","相","休","囚","死"].map(m=>{const w=q.find(V=>C(V)===m)||k;return`<i><b class="wx-${d[w]}">${w}</b><em>${m}</em></i>`}).join("")}</td></tr>`,P=[g("十神",(m,w)=>w==="day"?`<span class="bz-zhuri">${e.input.gender==="male"?"元男":"元女"}</span>`:m.stemTenGod?c(m.stemTenGod):'<span class="pp-dim">—</span>'),g("天干",m=>`<span class="bz-big ${"wx-"+d[m.stemElement]}">${m.stem}</span>`),g("地支",m=>`<span class="bz-big ${"wx-"+d[m.branchElement]}">${m.branch}</span>`),g("藏干",m=>m.hidden.map(w=>`<i class="bz-cg wx-${d[w.element]}">${w.stem}·${w.element}</i>`).join("")),g("支神",m=>m.hidden.map(w=>c(w.tenGod)).join("<br>")),g("纳音",m=>m.nayin),g("空亡",m=>`<span class="pp-dim">${m.kongwang.join("")}</span>`),g("地势",m=>m.dishi),g("自坐",m=>m.zizuo),g("神煞",m=>m.shenshaDetail&&m.shenshaDetail.length?`<span class="pp-ss">${m.shenshaDetail.map(u).join("")}</span>`:'<span class="pp-dim">—</span>'),Q].join(""),$=Object.entries(e.wuxing).map(([m,w])=>`<span class="pp-chip wx-${d[m]}">${pe(m)}${m} ${w}</span>`).join(""),N=e.frame||{},Z=m=>m==="大吉"||m==="吉"?"ok":m==="大忌"||m==="忌"?"warn":"",F=(m,w)=>w?`<div class="pp-sec"><div class="pp-sec-h">${m}</div>${w}</div>`:"",L=N.geju&&N.geju.length?`
      <div class="pp-tl">${N.primary?`主格 <b>${a(N.primary.name)}</b>　${a(N.primary.evidence)}`:""}</div>
      <div class="pp-chips">${N.geju.map(m=>{const w=m.status==="破格",V=m.status==="待定"||m.status==="假从",Y=`${m.evidence||""}${Array.isArray(m.breaks)&&m.breaks.length?`；破：${m.breaks.join("；")}`:""}`;return`<span class="pp-chip ${w?"broken":V?"warn":""}" title="${a(Y)}">${a(m.name)}<i class="pp-drel">${a(m.kind)}${m.status?`·${a(m.status)}`:""}</i></span>`}).join("")}</div>`:"",x=(()=>{const m=Array.isArray(N.yongshen&&N.yongshen.neutral)?N.yongshen.neutral:[],w=new Set(N.yongshen&&N.yongshen.neutralTenGods||[]);return`${(N.yongshen&&N.yongshen.avoidTenGods||[]).filter(Y=>!w.has(Y)).map(Y=>`<span class="pp-chip warn">${a(Y)}</span>`).join("")}${[...w].map(Y=>`<span class="pp-chip neu" title="局中分量近零，按中性偏忌看">${a(Y)}</span>`).join("")}${m.length?`<span class="pp-chip neu" title="忌神中全局不足 0.5 分的那几行；仍在忌里参与行运评分">中性偏忌 ${m.map(Y=>`${a(Y.element)} ${a(Y.weight)} 分`).join("、")}</span>`:""}`})(),R=N.yongshen?`
      <div class="pp-tl">喜 ${N.yongshen.favor.map(l).join("")}　忌 ${N.yongshen.avoid.map(l).join("")}　<span class="pp-dim">${a(N.yongshen.method)}</span></div>
      <div class="pp-chips">${N.yongshen.favorTenGods.map(m=>`<span class="pp-chip ok">${a(m)}</span>`).join("")}${x}</div>
      ${(N.yongshen.disputed||[]).length?`<div class="pp-tl pp-dim">有争议：${N.yongshen.disputed.map(m=>`${a(m.element)}（扶抑为${a(m.favorRole)}·${a(m.favorVerb)}，${a(m.climate)}盘调候忌${a(m.element)}）`).join("、")}　保留在喜用，不列入忌</div>`:""}
      <div class="pp-tl pp-dim">${a(N.yongshen.detail)}</div>`:"",G=e.climate||N.yongshen&&N.yongshen.climate||null,oe=G?(()=>{const m=Math.max(2,Math.min(98,Math.round(((Number(G.temp)||0)+3)/6*100))),w=G.need?`<em>调候取</em><b>${a(G.need.stem+G.need.element)}</b>`:"<em>气候平和</em>",V=!!(N.yongshen&&Array.isArray(N.yongshen.disputed))&&N.yongshen.disputed.some(he=>he.element===G.avoidElement),Y=G.need?`<em>忌</em><b>${a(G.avoidElement)}</b>${V?'<span class="pp-dim">（有争议）</span>':""}`:"",v=(G.evidence||[]).length?`<em>依据</em><span>${a(G.evidence.join("、"))}</span>`:"",A=G.priority==="调候优先"?'<span class="mp-cli-p">调候优先</span>':'<span class="mp-cli-p">扶抑为主</span>',de=e.frame&&e.frame.yongshen&&e.frame.yongshen.qt,ze=de?`<div class="mp-qt">
          <div class="mp-qt-h"><b>穷通宝鉴</b><span>${a(de.label)}</span></div>
          <div class="mp-qt-y"><em>用神</em>${de.yong.map((he,Ge)=>`<b class="${Ge===0?"first":""}">${a(he)}</b>`).join("")}<em>首取 ${a(de.primary)}</em></div>
          <div class="mp-qt-q" title="${a(de.quote)}">「${a(de.quote)}」<span>第 ${de.chapter} 章${de.note?" · "+a(de.note):""}</span></div>
        </div>`:"";return`<section class="mp-cli" aria-label="寒暖燥湿">
        <div class="mp-cli-h"><b>寒暖燥湿</b><span class="mp-cli-k">${a(G.label||"")}</span>${A}</div>
        <div class="mp-cli-bar" title="寒 ← → 热"><i style="left:${m}%"></i></div>
        <div class="mp-cli-axis"><span>寒</span><span>平</span><span>热</span></div>
        <div class="mp-cli-row">${w}${Y}${v}</div>
        <div class="mp-cli-narr">${a(G.narration||"")}</div>
        ${ze}
      </section>`})():"",se=N.godStats?`<div class="pp-chips">${Object.entries(N.godStats.groups).map(([m,w])=>`<span class="pp-chip">${m} ${w}</span>`).join("")}</div>`:"",ue=e.dayun.list.map(m=>{const w=m.luck||null;return`<span class="pp-chip ${w?Z(w.tier):""}" title="${a(`${m.fromDate?`${m.fromDate} 交运；`:""}${w?`${w.tier} ${w.score}｜${(w.reasons||[]).join("；")}`:""}`)}">${m.startAge} ${m.ganzhi}${m.relations&&m.relations.length?` <i class="pp-drel">${m.relations.join("")}</i>`:""}${w?` ${w.tier}`:""}</span>`}).join(""),xe=e.liunian&&e.liunian.length?`<div class="pp-chips">${e.liunian.slice(0,8).map(m=>{const w=m.luck||null,V=m.suiyun&&Array.isArray(m.suiyun.signals)?m.suiyun.signals:[],Y=V.length?`｜${V.map(v=>v.detail).join("；")}`:"";return`<span class="pp-chip ${w?Z(w.tier):""}" title="${a(w?`${w.tier} ${w.score}｜${(w.reasons||[]).join("；")}${Y}`:Y.replace(/^｜/,""))}">${m.year} ${m.ganzhi}${w?` ${w.tier}`:""}</span>`}).join("")}</div>`:"",Ne=(e.liunian||[]).filter(m=>m.suiyun&&Array.isArray(m.suiyun.signals)&&m.suiyun.signals.length),we=e.suiyunClassic,He=we?`<div class="pp-dim pp-sy-src" title="${a(we.plain||"")}">《${a(we.bookName||"")}·${a(we.chapter||"")}》「${a(we.quote||"")}」</div>`:"",_e=Ne.length?`<div class="pp-tl pp-dim">岁运提示（只标干支变动，不判吉凶）</div><div class="pp-chips">${Ne.map(m=>`<span class="pp-chip" title="${a(`${m.suiyun.signals.map(w=>w.detail).join("；")}｜${m.suiyun.note||""}`)}">${m.year} ${a(m.suiyun.signals.map(w=>`${w.type}${(w.type.startsWith("流年")||w.type.startsWith("大运"))&&w.target?`·${w.target}`:""}`).join("/"))}</span>`).join("")}</div>${He}`:"",ea=e.strength?`<div class="pp-str">日主强弱：<b>${e.strength.level}</b>${e.strength.score}　<span class="pp-dim">${e.strength.detail}</span></div>`:"",Me=e.shensha&&e.shensha.groups||[],H=Me.length?`
      <div class="pp-ssx">
        <div class="ssx-h"><b>神煞全览</b><span>共 ${e.shensha.count} 见 · ${Me.length} 类 · 悬停看查法</span></div>
        ${Me.map(m=>`<div class="pp-ssg"><span class="ssg-gt">${m.cat}</span><span class="ssg-gi">${m.items.map(w=>`<span class="pp-ssi ${w.luck||"neutral"}" title="${a(`${w.via}查${w.target} ｜ ${w.rule}`)}">${w.name}<em>${w.pillars.map(V=>s[V]||"").join("")}</em></span>`).join("")}</span></div>`).join("")}
        <div class="ssx-h" style="border-top:none;padding-top:4px;margin-top:4px">神煞只作参考，吉凶仍须看格局、旺衰与行运。</div>
      </div>`:"";return o.briefHTML(e)+`<div class="pp" style="padding:12px">
      <table class="pp-bz">${b}<tbody>${P}</tbody></table>
      ${e.hourUnknown?'<div class="pp-warn" role="note">时柱暂缺：只排年/月/日三柱，起运与交运按日估算。时柱按正午暂算，涉及时柱的结论仅供参考。</div>':""}
      <div class="pp-rel"><div><b>天干</b>${e.relations&&e.relations.stems.length?e.relations.stems.join(" · "):"—"}</div>
      <div><b>地支</b>${e.relations&&e.relations.branches.length?e.relations.branches.join(" · "):"—"}</div></div>
      ${ea}
      ${F("格局",L)}
      ${F("用神",R)}
      ${oe}
      ${Array.isArray(e.classics)&&e.classics.length?`<section class="mp-cl" aria-label="古籍原文">
        <div class="mp-cl-h"><b>古籍原文</b><span>照录通行本，释义为白话自撰</span></div>
        ${e.classics.map(m=>`<div class="mp-cl-e">
          <div class="mp-cl-t"><b>${a(({ziping:"子平真诠",ditian:"滴天髓",sanming:"三命通会"}[m.book]||m.book)+"·"+m.chapter)}</b></div>
          <div class="mp-cl-q">「${a(m.quote)}」</div>
          <div class="mp-cl-p">${a(m.plain)}</div>
        </div>`).join("")}
      </section>`:""}
      ${F("五行与十神",`<div class="pp-chips">${$}</div>${se}`)}
      ${F("大运",`${o.curveHTML(e)}<div class="pp-chips">${ue}</div>`)}
      ${xe?F("流年",xe+_e):""}
      ${e.palaces?F("胎命身",`<div class="pp-chips">
        <span class="pp-chip" title="${a(e.palaces.taiyuan.note)}">胎元 ${a(e.palaces.taiyuan.ganzhi)}</span>
        ${e.palaces.taixi?`<span class="pp-chip" title="${a(e.palaces.taixi.note)}">胎息 ${a(e.palaces.taixi.ganzhi)}</span>`:""}
        ${e.palaces.minggong?`<span class="pp-chip" title="${a(e.palaces.minggong.note)}">命宫 ${a(e.palaces.minggong.ganzhi)}</span>`:""}
        ${e.palaces.shengong?`<span class="pp-chip" title="${a(e.palaces.shengong.note)}">身宫 ${a(e.palaces.shengong.ganzhi)}</span>`:""}
        ${!e.palaces.minggong||!e.palaces.shengong?'<span class="pp-chip" title="命宫与身宫由生月与生时支合数定宫；时柱暂缺，这两宫不排">命宫·身宫 时柱暂缺不排</span>':""}
      </div>`):""}
      ${H}
      <div style="margin-top:8px;font-size:12px;color:var(--muted)">上一节 ${e.jieqi.previous.name} ${e.jieqi.previous.time}　下一节 ${e.jieqi.next.name} ${e.jieqi.next.time}　${e.dayun.rule}，${e.dayun.startAge.years}岁起运${e.dayun.jiao&&e.dayun.jiao.at?`（交运 ${e.dayun.jiao.at}，${e.dayun.jiao.frame}）`:""}</div>
    </div>`};const Ea={natal:"命盘解析",divination:"卦象解析",card:"牌阵解析"},ut={同向:"good",有张力:"watch",互补:"alt"},Xe=e=>`<div class="mp-cross">${e.map(i=>{const s=ut[i.stance]||"plain";return`<div class="mp-cross-row">
      <div class="mp-cross-h"><span class="mp-cross-l">${a(i.label)}</span><span class="mp-cross-tag t-${s}">${a(i.stance||"—")}</span></div>
      <div class="mp-cross-b">
        <div class="mp-cross-cell"><b>八字</b><span>${a(i.bazi||"—")}</span></div>
        <div class="mp-cross-cell"><b>紫微</b><span>${a(i.ziwei||"—")}</span></div>
      </div>
      ${i.note?`<div class="mp-cross-note">${a(i.note)}</div>`:""}
    </div>`}).join("")}</div>`;o.interpretHTML=function(e,i){if(!e||!(e.dimensions&&e.dimensions.length||e.sections&&e.sections.length)&&!e.error&&!e.answer)return"";const d=!!(i&&i.folded);let n=-1;(e.dimensions||[]).forEach((x,R)=>{x.knowledge&&x.knowledge.length&&(n=R)});const c=(e.dimensions||[]).map((x,R)=>`<div class="mp-it-dim${x.focused?" focus":""}">
      <div class="mp-it-dh"><span class="mp-it-dno">${R+1}</span><span class="mp-it-dlabel">${a(x.label)}</span>${x.focused?'<span class="mp-it-focus">最贴近你的问题</span>':""}${x.confidence?`<span class="mp-it-conf c-${a(x.confidence)}">置信度 ${a(x.confidence)}</span>`:""}</div>
      ${x.plain?`<div class="mp-it-dplain">${a(x.plain)}</div>`:""}
      <div class="mp-it-dtext">${a(x.text)}</div>
      ${x.evidence&&x.evidence.length?`<details class="mp-it-ev"><summary>依据 · ${a(x.evidence.length)} 条盘面事实</summary><div class="mp-it-ev-body">${x.evidence.map(G=>`<span class="mp-it-ev-item">${a(G)}</span>`).join("")}<span class="mp-it-ev-tech">技法：${a(e.technique||e.systemLabel||"")}</span></div></details>`:""}
      ${x.knowledge&&x.knowledge.length?`<div class="mp-it-know">${x.knowledge.map(G=>`<div class="know-row"><span class="know-status ${G.status}">${a(G.statusLabel)}</span><span class="know-body"><b>${a(G.gist)}</b>${a(G.detail)}${G.source?`<i>出处：${a(G.source)}</i>`:""}${G.note?`<em>注：${a(G.note)}</em>`:""}</span></div>`).join("")}${R===n&&e.knowledgeNote?`<div class="know-disc">${a(e.knowledgeNote)}</div>`:""}</div>`:""}
      ${x.advice?`<div class="mp-it-adv"><b>建议</b>${a(x.advice)}</div>`:""}
    </div>`).join(""),l=e.outline&&e.outline.length?`<div class="mp-outline"><div class="mp-outline-h">一页读懂</div>${e.outline.map(x=>`<div class="mp-outline-row"><b>${a(x.label)}</b><span>${a(x.text)}</span></div>`).join("")}</div>`:"",u=e.sections&&e.sections.length?`<nav class="mp-toc" aria-label="报告目录">${e.sections.map(x=>`<a href="#mp-sec-${a(x.key)}">${a(x.label)}</a>`).join("")}</nav>`:"",g=e.tables&&e.tables.length?`<div class="mp-tables">${e.tables.filter(x=>Array.isArray(x.rows)&&x.rows.length).map(x=>`<div class="mp-table-wrap">
          <div class="mp-table-h">${a(x.title)}</div>
          <div class="mp-table-scroll"><table class="mp-table">
            <thead><tr>${x.columns.map(R=>`<th scope="col">${a(R)}</th>`).join("")}</tr></thead>
            <tbody>${x.rows.map(R=>`<tr>${R.map((G,oe)=>`<td data-label="${a(x.columns[oe]||"")}">${a(G)}</td>`).join("")}</tr>`).join("")}</tbody>
          </table></div>
        </div>`).join("")}</div>`:"",b=x=>String(x||"").split(`
`).map(R=>`<div class="mp-it-p">${a(R).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>")}</div>`).join(""),h=e.sections&&e.sections.length?`<div class="mp-it-secs">${e.sections.map(x=>`<div class="mp-it-sec${x.tone?` tone-${a(x.tone)}`:""}" id="mp-sec-${a(x.key)}">
        <div class="mp-it-sh">${a(x.label)}</div>
        <div class="mp-it-stext">${Array.isArray(x.items)&&x.items.length?Xe(x.items):b(x.text)}</div>
      </div>`).join("")}</div>`:"",T=[e.systemLabel,Ea[e.moduleType]||e.moduleType].filter(Boolean),j=e.ask,k=j&&j.question?a(j.question):"",q=j&&(k||j.direction&&j.direction!=="general")?`<div class="mp-it-ask">${k?`<span class="ask-q">问题：${k}</span><span class="ask-sep">｜</span>`:""}<span class="ask-d">询问方向：${a(j.directionLabel||"综合")}</span></div>`:"",C=e.answer?`<div class="mp-it-ans"><b>${k?"先答所问":"先看结论"}</b>${a(e.answer)}</div>`:"",Q=e.plain?`<div class="mp-it-plain"><b>说人话</b>${a(e.plain)}</div>`:"",P=e.followups&&e.followups.length?`<div class="mp-it-fu"><b>还可以这样追问</b><ul>${e.followups.map(x=>`<li>${a(x)}</li>`).join("")}</ul></div>`:"",$=e.glossary&&e.glossary.length?`<details class="mp-it-gloss"><summary>名词解释（${e.glossary.length} 条）</summary>${e.glossary.map(x=>`<div><span>${a(x.term)}</span>${a(x.plain)}</div>`).join("")}</details>`:"",N=e.limits&&e.limits.length?`<details class="mp-it-limits"><summary>本插件不回答什么（${e.limits.length} 条）</summary>${e.limits.map(x=>`<div><b>${a(x.title)}</b>${a(x.text)}</div>`).join("")}</details>`:"",F=e.system&&/^(liuyao|meihua|daliuren|qimen|tarot|xiaoliuren)$/.test(e.system)?`<div class="mp-askcopy-row"><button type="button" class="mp-askcopy" data-mp-askcopy="${a(e.system)}">复制问事提示</button><span class="mp-askcopy-hint">把这张盘和你的问题打包成一段提示，粘到任何对话里都能用</span></div>`:"",L=e.guide?`<details class="mp-guide">
      <summary><b>${a(e.guide.title)}</b><span class="mp-guide-sub">数 / 象 / 辞</span></summary>
      <div class="mp-guide-body">
        <p class="mp-guide-lead">${a(e.guide.lead)}</p>
        <ol class="mp-guide-layers">${(e.guide.layers||[]).map(x=>`<li><b>${a(x.name)}<i>${a(x.sub)}</i></b><span>${a(x.text)}</span><em>${a(x.hint)}</em></li>`).join("")}</ol>
        <div class="mp-guide-check"><b>${a(e.guide.check.title)}</b><ol>${(e.guide.check.items||[]).map(x=>`<li>${a(x)}</li>`).join("")}</ol><p>${a(e.guide.check.tail)}</p></div>
        <div class="mp-guide-parts"><b>${a(e.guide.parts.title)}</b><ul>${(e.guide.parts.rows||[]).map(x=>`<li><span>${a(x[0])}</span>${a(x[1])}</li>`).join("")}</ul><p>${a(e.guide.parts.tail)}</p></div>
        <p class="mp-guide-close">${a(e.guide.closing)}</p>
      </div></details>`:"";return`<div class="mp-it${d?" folded":""}">
      <button type="button" class="mp-it-head" aria-expanded="${d?"false":"true"}">
        <span class="mp-it-arrow" aria-hidden="true">▾</span>
        <span class="mp-it-title">解析与详解</span>${T.map(x=>`<span class="mp-it-tag">${a(x)}</span>`).join("")}
        <span class="mp-it-hint">${d?"点击展开":"点击收起"}</span>
      </button>
      <div class="mp-it-wrap">
        ${F}
        ${q}
        ${C}
        ${Q}
        ${e.lead?`<div class="mp-it-lead">${a(e.lead)}</div>`:""}
        ${e.error?`<div class="mp-it-err"><b>⚠ 解析生成失败</b>${a(e.error)}——上方盘面数据本身可用</div>`:""}
    ${L}
    ${l}
        ${u}
        <div class="mp-it-body">${c}</div>
        ${h}
        ${g}
        ${P}
        ${$}
        ${N}
        <div class="mp-it-dis">${a(e.disclaimer)}</div>
      </div>
    </div>`},o.followupHTML=function(e){if(!e)return"";const i=e.evidence&&e.evidence.length?`<div class="mp-fu-ev">依据：${e.evidence.map(s=>a(s)).join("；")}　置信度：${a(e.confidence||"弱")}</div>`:"";return`<div class="mp-fu${e.ok?"":" miss"}">
      <div class="mp-fu-h">追问 · ${a(e.question)}</div>
      <div class="mp-fu-a">${a(e.answer)}</div>
      ${i}
    </div>`},o.resultWithInterpret=function(e,i,s){return(e||"")+o.interpretHTML(i,s)},o.caliberHTML=function(e){const i=e&&Array.isArray(e.switches)?e.switches.filter(g=>g&&g.key):[];if(!i.length)return"";const s=i.filter(g=>!g.error&&g.total>0),d=s.length?`${i.length} 组开关中 ${s.length} 组影响此盘：${s.map(g=>g.short||g.title).join("、")}。`:`本盘对 ${i.length} 组开关都不敏感：换成另一档也不变。`,n=g=>{if(g.error)return`<div class="mp-cdiff-same">未能对照：${a(g.error)}</div>`;if(!g.total)return'<div class="mp-cdiff-same">无变化 · 此盘不受这一开关影响</div>';const b=Array.isArray(g.roots)?g.roots:[];return b.length?`<div class="mp-cdiff-roots">${b.map(h=>`<div class="mp-cdiff-root"><span class="mp-cdiff-k">${a(h.label)}</span><span class="mp-cdiff-from">${a(h.from)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-to">${a(h.to)}</span></div>`).join("")}</div>`:`<div class="mp-cdiff-same">无单一根因；逐字段差异 ${Number(g.total)||0} 处</div>`},c=g=>{const b=(Array.isArray(g.views)?g.views:[]).filter(h=>h&&h.changed);return g.error||!g.total||!b.length?"":`<table class="mp-cview"><thead><tr><th scope="col">项</th><th scope="col">${a(g.currentLabel)}</th><th scope="col">${a(g.altLabel)}</th></tr></thead><tbody>`+b.map(h=>`<tr><th scope="row">${a(h.label)}</th><td>${a(h.current)}</td><td>${a(h.alt)}</td></tr>`).join("")+"</tbody></table>"},l=g=>{const b=Array.isArray(g.categories)?g.categories:[];if(g.error||!g.total||!b.length)return"";const h=b.slice(0,6);return`<div class="mp-cdiff-cats">${h.map(T=>`<span class="mp-cdiff-cat">${a(T.name)} ${Number(T.count)||0} 处</span>`).join("")}`+(b.length>h.length?`<span class="mp-cdiff-cat">另 ${b.length-h.length} 类</span>`:"")+"</div>"},u=i.map(g=>`<div class="mp-cdiff-row"><div class="mp-cdiff-h"><b>${a(g.title)}</b><span class="mp-cdiff-count${g.total>0?" on":""}">${g.error?"未能对照":g.total?`${Number(g.total)||0} 处`:"无变化"}</span></div><div class="mp-cdiff-ab"><span class="mp-cdiff-pill now">当前 · ${a(g.currentLabel)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-pill alt">换成 · ${a(g.altLabel)}</span></div>${n(g)}${c(g)}${l(g)}</div>`).join("");return`<details class="mp-cdiff" aria-label="口径对照">
      <summary><span class="mp-cdiff-title">口径对照</span><span class="mp-cdiff-lead">${a(d)}</span><span class="mp-cdiff-more">展开逐字差异</span></summary>
      <div class="mp-cdiff-body">${u}
        <div class="mp-cdiff-note">同一组输入、只换一个开关；只列变化字段与根因，不判哪套口径更准，也不改上方盘面。</div>
      </div>
    </details>`},o.handleHTML=function(e){return typeof e!="string"||!e?"":`<section class="mp-handle" aria-label="排盘句柄">
      <span class="mp-handle-title">排盘句柄</span>
      <code class="mp-handle-code" title="${a(e)}">${a(e)}</code>
      <button type="button" class="mp-handle-copy" data-handle-copy="${a(e)}" aria-label="复制排盘句柄">复制句柄</button>
      <span class="mp-handle-hint">追问同一张盘时把它连同增量参数（年份、方向、所问之事）一并交给助手，不必重报出生信息。句柄是编码不是加密，含出生时间与出生地，别公开贴出。</span>
    </section>`},o.revisionHTML=function(e){if(!e||typeof e!="object")return"";const i=Array.isArray(e.applied)?e.applied:[],s=Array.isArray(e.ignored)?e.ignored:[];if(!i.length&&!s.length)return"";const d=i.map(n=>{const c=n.fromDisplay==null?"（未设）":n.fromDisplay;return`<li><span class="k">${a(n.label||n.key)}</span><span class="v"><span class="old">${a(c)}</span> → <span class="new">${a(n.display)}</span></span></li>`}).join("");return`<section class="mp-revise" aria-label="一句话改参">
      <div class="mp-revise-head"><span class="mp-revise-title">一句话改参</span><span class="mp-revise-text">「${a(e.text||"")}」</span></div>
      ${d?`<ul class="mp-revise-list">${d}</ul>`:'<p class="mp-revise-ignored">没有识别到可改的参数，仍按原参数排盘。</p>'}
      ${s.length?`<p class="mp-revise-ignored">未处理：${a(s.join("；"))}</p>`:""}
    </section>`},o.shadowHTML=function(e,i){if(!e||!e.id)return"";const s=[];e.version&&s.push(`版本 <b>${a(e.version)}</b>`),e.baseId&&s.push(`基础指纹 <b>${a(e.baseId)}</b>`),s.push("同参数同 ID");const d=[];e.reproducible===!1&&d.push(`不可复算：${a(e.reason||"参数不足")}`);const n=e.reproducible===!0&&e.asOfPinned===!1&&(e.system==="bazi"||e.system==="ziwei")?'<div class="mp-shadow-hint">未固定 asOf：流年 / 流月随「此刻」变化；要逐字比对请在输入里固定 asOf。</div>':"",c=i&&i.sameId!==!1&&(i.versionChanged||Number(i.total)>0);let l="";if(c){const u=Number(i.total)||0,g=a(i.fromVersion||"—"),b=a(i.toVersion||e.version||"—"),h=Array.isArray(i.roots)?i.roots:[],T=h.slice(0,8),j=T.length?`<div class="mp-cdiff-roots">${T.map(C=>`<div class="mp-cdiff-root"><span class="mp-cdiff-k">${a(C.label)}</span><span class="mp-cdiff-from">${a(C.from)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-to">${a(C.to)}</span></div>`).join("")}`+(h.length>T.length?`<div class="same">另 ${h.length-T.length} 处根因</div>`:"")+"</div>":`<div class="same">${u?"无单一根因；逐字段变化 "+u+" 处":"字段 0 处变化：同一张盘跨版本逐字一致"}</div>`,k=Array.isArray(i.categories)?i.categories:[],q=k.length?`<div class="mp-cdiff-cats">${k.slice(0,6).map(C=>`<span class="mp-cdiff-cat">${a(C.name)} ${Number(C.count)||0} 处</span>`).join("")}`+(k.length>6?`<span class="mp-cdiff-cat">另 ${k.length-6} 类</span>`:"")+"</div>":"";l=`<details class="mp-shadow-diff"${u>0?" open":""}>
        <summary><b>与上次同盘比对</b><span class="tag">${g} → ${b} · ${u?`${u} 处变化`:"0 处变化"}</span></summary>
        ${j}${q}
        <div class="note">同一 baseId（同一组归一化参数）的两次结果；只比盘面字段，不含摘要、解析与古籍等文本层。</div>
      </details>`}return`<section class="mp-shadow" aria-label="影子盘">
      <div class="mp-shadow-head"><span class="mp-shadow-title">影子盘</span><code class="mp-shadow-id">${a(e.id)}</code>
        <button type="button" class="mp-shadow-copy" data-shadow-copy="${a(e.id)}" aria-label="复制影子盘 ID">复制 ID</button></div>
      <div class="mp-shadow-meta">${s.join('<span aria-hidden="true">·</span>')}</div>
      ${d.map(u=>`<div class="mp-shadow-warn">⚠ ${u}</div>`).join("")}
      ${n}
      ${l}
    </section>`},o.shadowTrack=function(e){const i=window.Engine||window.__PP&&window.__PP.Engine;if(!i||!i.shadowSnapshot||!i.shadowDiff)return null;let s=null;try{s=i.shadowSnapshot(e)}catch{return null}if(!s||!s.shadow||!s.shadow.baseId)return null;const d="mp-shadow-v1";let n={};try{const u=window.localStorage?window.localStorage.getItem(d):null,g=u?JSON.parse(u):{};g&&typeof g=="object"&&!Array.isArray(g)&&(n=g)}catch{n={}}const c=n[s.shadow.baseId];let l=null;if(c)try{l=i.shadowDiff(c,s)}catch{l=null}s.at=Date.now(),n[s.shadow.baseId]=s;try{const u=Object.keys(n);if(u.length>24){u.sort((g,b)=>(Number(n[g]&&n[g].at)||0)-(Number(n[b]&&n[b].at)||0));for(const g of u.slice(0,u.length-24))delete n[g]}window.localStorage&&window.localStorage.setItem(d,JSON.stringify(n))}catch{}return l};const oa="dsh-metaphysics/profiles-v1",Ie=24,ra=16,Fa=40,gt=60,va=["bazi","ziwei","liuyao","tarot","meihua","daliuren","hepan","qimen","almanac","zeri","chenggu","xiaoliuren","star","numerology","mbti","trend","fengshui","name","convert"];o.PROF_KEY=oa,o.PROF_MAX=Ie,o.PROF_KINDS=va;const ft={bazi:"八字",ziwei:"紫微",liuyao:"六爻",tarot:"塔罗",meihua:"梅花",daliuren:"六壬",hepan:"合盘",qimen:"奇门",almanac:"黄历",zeri:"择日",chenggu:"称骨",xiaoliuren:"小六壬",star:"星座",numerology:"生命数字",mbti:"人格",trend:"人生K线",fengshui:"风水",name:"起名",convert:"农历"};o.profKindLabel=e=>ft[e]||String(e||"");const $e=e=>typeof e=="string";function pa(e){if(!e||typeof e!="object"||Array.isArray(e)||!$e(e.id)||!e.id||e.id.length>40||!$e(e.kind)||va.indexOf(e.kind)<0)return null;const i=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e.date||""));if(!i)return null;const s=Number(i[1]),d=Number(i[2]),n=Number(i[3]);if(d<1||d>12||n<1||n>new Date(s,d,0).getDate())return null;const c=$e(e.time)&&/^([01]?\d|2[0-3]):[0-5]\d$/.test(e.time)?e.time:"";return{id:e.id,kind:e.kind,label:$e(e.label)?e.label.slice(0,ra):"",date:e.date,time:e.hourUnknown===!0?"":c,hourUnknown:e.hourUnknown===!0,gender:e.gender==="male"||e.gender==="female"?e.gender:"",address:$e(e.address)?e.address.slice(0,Fa):"",note:$e(e.note)?e.note.slice(0,gt):"",pinned:e.pinned===!0,createdAt:Number(e.createdAt)||0,lastUsedAt:Number(e.lastUsedAt)||0,uses:Number(e.uses)||0}}function Oa(){try{const e=window.localStorage?window.localStorage.getItem(oa):null,i=e?JSON.parse(e):[];return Array.isArray(i)?i:[]}catch{return[]}}function fe(e){return e.slice().sort((i,s)=>(s.pinned?1:0)-(i.pinned?1:0)||(s.lastUsedAt||s.createdAt||0)-(i.lastUsedAt||i.createdAt||0)||(s.createdAt||0)-(i.createdAt||0))}o.profilesLoad=function(){const e=[],i=Object.create(null);for(const s of Oa()){const d=pa(s);d&&!i[d.id]&&(i[d.id]=1,e.push(d))}return fe(e)},o.profilesSave=function(e){const i=fe(Array.isArray(e)?e.slice(0,Ie):[]);try{return window.localStorage?(window.localStorage.setItem(oa,JSON.stringify(i)),!0):!1}catch{return!1}};let Pa=0;o.profilesNewId=function(){const e=Object.create(null);for(const s of o.profilesLoad())e[s.id]=1;let i;do i=`p${Date.now().toString(36)}${(Pa++).toString(36)}`;while(e[i]);return i},o.profilesPut=function(e){const i=pa(Object.assign({id:o.profilesNewId(),createdAt:Date.now(),lastUsedAt:Date.now()},e));if(!i)return{ok:!1,list:o.profilesLoad()};const s=o.profilesLoad(),d=s.findIndex(n=>n.id===i.id);if(d>=0){const n=s[d];i.createdAt=n.createdAt||i.createdAt,i.lastUsedAt=n.lastUsedAt,i.uses=n.uses,i.pinned=n.pinned,s.splice(d,1,i)}else s.push(i);if(s.length>Ie){const n=s.slice().sort((u,g)=>(u.lastUsedAt||u.createdAt)-(g.lastUsedAt||g.createdAt)),c=n.find(u=>u.id!==i.id)||n[0],l=s.indexOf(c);l>=0&&s.splice(l,1)}return o.profilesSave(s)?{ok:!0,list:fe(s),item:i}:{ok:!1,list:o.profilesLoad()}},o.profilesRemove=function(e){const i=o.profilesLoad().filter(s=>s.id!==e);return o.profilesSave(i)?i:o.profilesLoad()},o.profilesPin=function(e){const i=o.profilesLoad().map(s=>s.id===e?Object.assign({},s,{pinned:!s.pinned}):s);return o.profilesSave(i)?fe(i):o.profilesLoad()},o.profilesTouch=function(e){let i=!1;const s=o.profilesLoad().map(d=>d.id!==e?d:(i=!0,Object.assign({},d,{lastUsedAt:Date.now(),uses:(d.uses||0)+1})));return i?o.profilesSave(s)?fe(s):o.profilesLoad():s};const ya=864e5;function la(e){const i=Number(e)||0;if(!i)return"未排过";const s=Math.floor((Date.now()-i)/ya);if(s<=0)return"今天排过";if(s===1)return"昨天排过";if(s<30)return`${s} 天前排过`;const d=new Date(i);return`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")} 排过`}o.profilesAgo=la;const Da={male:"♂",female:"♀"};o.profilesHTML=function(e,i){const s=i||{},d=(Array.isArray(e)?e:[]).map(c=>{const l=pa(c);if(!l)return"";const u=[l.date,l.hourUnknown?"时辰未知":l.time,l.address].filter(Boolean).join(" "),g=s.editingId&&l.id===s.editingId,b=s.armedDel&&l.id===s.armedDel;return`<div class="mp-prof-card${l.pinned?" pinned":""}${g?" editing":""}" data-id="${a(l.id)}">
        <button type="button" class="mp-prof-use" data-mp-prof="use" data-id="${a(l.id)}"
          title="${a(`用「${l.label||l.kind}」的出生信息直接排盘`)}">
          <span class="mp-prof-nm">${a(l.label||"未命名")}${l.gender?`<i class="sx">${Da[l.gender]||""}</i>`:""}</span>
          <span class="mp-prof-sys">${a(o.profKindLabel?o.profKindLabel(l.kind):l.kind)}</span>
          <span class="mp-prof-bd">${a(u)}</span>
          <span class="mp-prof-at">${a(la(l.lastUsedAt||l.createdAt))}${l.uses?` · ${l.uses} 次`:""}${l.pinned?" · 置顶":""}</span>
        </button>
        <span class="mp-prof-ops">
          <button type="button" data-mp-prof="pin" data-id="${a(l.id)}" class="${l.pinned?"on":""}"
            aria-pressed="${l.pinned?"true":"false"}" title="置顶这张档案">${l.pinned?"已置顶":"置顶"}</button>
          <button type="button" data-mp-prof="edit" data-id="${a(l.id)}" title="把这张档案读回输入框，改完再存">改名</button>
          <button type="button" data-mp-prof="del" data-id="${a(l.id)}" class="${b?"on":""}"
            title="${b?"再点一次就从本机删除这张档案":"从本机删除这张档案（点两次确认）"}">${b?"确认删除":"删除"}</button>
        </span>
      </div>`}).join(""),n=d?`<div class="mp-prof-list">${d}</div>`:'<p class="mp-prof-empty">还没有存过命盘。填好出生信息，给这张盘起个称呼，点「存为我的命盘」——下次进来一点就出盘，不必重报。</p>';return`<section class="mp-prof" aria-label="我的命盘">
      <div class="mp-prof-h"><b>我的命盘</b><span class="mp-prof-sub">只存本机 · 不上传${e&&e.length?` · ${e.length}/${Ie}`:""}</span></div>
      ${n}
      ${s.bar||""}
    </section>`},o.profilesBarHTML=function(e){const i=e||{};return`<div class="mp-prof-bar">
        <input class="mp-prof-name" type="text" maxlength="${ra}" placeholder="称呼，如「我」「妈妈」" aria-label="档案称呼" value="${a(i.name||"")}">
        <button type="button" data-mp-prof="put"${i.canAdd===!1?" disabled":""}>${a(i.editingId?"更新这张档案":"存为我的命盘")}</button>
        ${i.editingId?'<button type="button" class="ghost" data-mp-prof="cancel">取消改名</button>':""}
        <span class="mp-prof-tip">${a(i.tip||(i.editingId?"改完出生信息或称呼，点「更新这张档案」覆盖原档。":"存的是出生时间与出生地这些输入，不是结果。"))}</span>
      </div>`},o.profEvent=function(e){let i=e&&e.closest?e.closest("[data-mp-prof]"):null;if(!i)return null;const s=i.getAttribute("data-mp-prof");return i.tagName==="BUTTON"&&i.disabled?null:{action:s,id:i.getAttribute("data-id")||"",name:i}};const We=["bazi","trend"],Ra=["bazi","ziwei","liuyao","meihua","daliuren","qimen","hepan","chenggu","trend","fengshui","name","xiaoliuren"];o.profUsable=function(e){return!e||typeof e!="object"?!1:e.hourUnknown===!0||e.time?!0:Ra.indexOf(String(e.kind||""))<0},o.profFromForm=function(e,i,s){const d=e||{},n=d.hourUnknown===!0&&We.indexOf(String(d.kind||""))>=0;return!n&&!/^([01]?\d|2[0-3]):[0-5]\d$/.test(String(d.time||"").trim())?null:pa(Object.assign({id:s||o.profilesNewId(),kind:String(d.kind||""),label:String(i||"").trim().slice(0,ra)||(o.profKindLabel?o.profKindLabel(d.kind):String(d.kind||"")),date:String(d.date||""),time:String(d.time||""),hourUnknown:n,gender:String(d.gender||""),address:String(d.address||""),pinned:!1,createdAt:Date.now(),lastUsedAt:0,uses:0}))},o.traceHTML=function(e,i,s){if(!Array.isArray(e)||!e.length)return"";const d={liuyao:"六爻",bazi:"八字",ziwei:"紫微",qimen:"奇门",daliuren:"大六壬"}[i]||"命盘",n=e.map(g=>g&&g.field).filter(Boolean).join(" → "),c=typeof s=="string"?s:"",l=(g,b)=>{const h=String(g??"");return h.length>b?`${h.slice(0,b)}…`:h},u=e.map((g,b)=>{const h=Array.isArray(g.inputs)?g.inputs:[];return`<details class="mp-trace-step"${b===0?" open":""}>
        <summary><span class="mp-trace-no">${b+1}</span><span class="mp-trace-field">${a(g.field)}</span><span class="mp-trace-res">${a(l(g.result,44))}</span></summary>
        <div class="mp-trace-detail">
          <div class="mp-trace-rule"><b>规则</b>${a(g.rule)}</div>
          ${h.length?`<dl class="mp-trace-inputs">${h.map(T=>`<dt>${a(T.label)}</dt><dd>${a(T.value)}</dd>`).join("")}</dl>`:""}
          <div class="mp-trace-result"><b>结果</b>${a(g.result)}</div>
          ${g.source?`<div class="mp-trace-src"><b>出处</b>${a(g.source)}</div>`:""}
        </div>
      </details>`}).join("");return`<button type="button" class="mp-trace-card" data-trace-open aria-haspopup="dialog" aria-controls="mp-trace-layer">
        <span class="mp-trace-title">推导链</span><span class="mp-trace-flow">${a(n)}</span><span class="mp-trace-count">${e.length} 层 · 查看</span>
      </button>
      <div class="mp-trace-layer" id="mp-trace-layer" data-trace-layer aria-hidden="true">
        <div class="mp-trace-back" data-trace-close></div>
        <aside class="mp-trace-drawer" role="dialog" aria-modal="true" aria-labelledby="mp-trace-title">
          <div class="mp-trace-head">
            <div><b id="mp-trace-title">推导链 · ${a(d)}</b><span>${e.length} 层 · 每层给出规则、输入、结果与出处；只读，不重算</span></div>
            ${c?'<button type="button" class="mp-trace-copy" data-trace-copy aria-label="复制整条推导链的 Markdown">复制 Markdown</button>':""}
            <button type="button" class="mp-trace-close" data-trace-close aria-label="关闭推导链">✕</button>
          </div>
          <div class="mp-trace-body">${u}</div>
          ${c?`<textarea class="mp-trace-md" data-trace-md readonly hidden>${a(c)}</textarea>`:""}
        </aside>
      </div>`},o.almanacHTML=function(e){if(!e||!e.meta)return o.quickHTML(e);const i=e.ganzhi||{},s=e.dayGod||null,d=(k,q)=>(k||[]).map(C=>`<span class="mp-al-chip${q?` ${q}`:""}">${a(C)}</span>`).join(""),n=(k,q)=>q?`<div class="mp-al-cell"><em>${a(k)}</em><b>${a(q)}</b></div>`:"",c=e.xiu?`${e.xiu.name}宿（${e.xiu.luck}·${e.xiu.zheng}·${e.xiu.animal}）`:"",l=e.nayin&&e.nayin.day?e.nayin.day.name:"",u=e.chong?`${e.chong.text}${e.chong.sha?` ${e.chong.sha}`:""}`:"",g=(e.hours||[]).map(k=>`<span class="mp-al-hour ${k.luck==="吉"?"good":"bad"}"><i>${a(k.zhi)}</i><em>${a((k.ganZhi||"").slice(0,1))}</em><b>${a(k.shen||"")}</b><u>${a(k.luck||"")}</u></span>`).join(""),b=e.positions||{},h=(k,q)=>q?`<span class="mp-al-chip">${a(k)}·${a(typeof q=="string"?q:q.dir||"")}</span>`:"",T=e.lucky||{},j=s?`<span class="mp-al-badge ${s.luck==="吉"?"good":"bad"}">${a(s.name)}·${a(s.type)}·${a(s.luck)}</span>`:"";return`<section class="mp-al" aria-label="黄历">
      <div class="mp-al-h"><b>${a(e.meta.date||"")}</b><i>${a(e.meta.weekday||"")}　${a((e.lunar||{}).text||"")}</i></div>
      <div class="mp-al-gz">${a(i.year||"")}年　${a(i.month||"")}月　${a(i.day||"")}日　属${a(i.shengXiao||"")}　建除 ${a(e.zhiXing||"")}日　${j}</div>
      <div class="mp-al-yiji">
        <div class="mp-al-col"><em>宜</em><div class="mp-al-chips">${d(e.yi)}</div></div>
        <div class="mp-al-col"><em>忌</em><div class="mp-al-chips">${d(e.ji)}</div></div>
      </div>
      <div class="mp-al-grid">${n("二十八宿",c)}${n("日柱纳音",l)}${n("胎神",e.taiShen)}${n("冲煞",u)}</div>
      <div class="mp-al-row"><em>吉神方位</em><div class="mp-al-chips">${h("喜神",b.xiShen)}${h("财神",b.caiShen)}${h("福神",b.fuShen)}${h("阳贵",b.yangGui)}${h("阴贵",b.yinGui)}</div></div>
      <div class="mp-al-row"><em>时刻吉凶</em><div class="mp-al-hours">${g}</div></div>
      <div class="mp-al-row"><em>吉配生肖</em><div class="mp-al-chips">${T.liuhe?`<span class="mp-al-chip">六合·${a(T.liuhe)}</span>`:""}${d(T.sanhe||[])}</div></div>
      ${e.dailyHexagram?`<div class="mp-al-hex">每日一卦：<b>${a(e.dailyHexagram.name)}</b>　${a(e.dailyHexagram.meaning||"")}</div>`:""}
      <div class="mp-al-note">${a(e.meta&&e.meta.scope||"")}</div>
    </section>`},o.mbtiHTML=function(e){if(!e)return"";if(e.needAnswers&&Array.isArray(e.questions)){const n=e.questions.map(c=>`<li>${a(c.text)}</li>`).join("");return`<section class="mp-mb-paper" aria-label="十六型人格问卷">
        <div class="mp-mb-h">
          <span class="mp-mb-meta"><b>十六型人格问卷</b><i>${e.total} 题 · 每题 1 完全不像 / 5 很像我</i></span>
          <span class="mp-mb-count">填完分数再看结果</span>
        </div>
        <ol>${n}</ol>
        <div class="mp-mb-note">${a(e.note||"")}</div>
      </section>`}const i=(e.dims||[]).map(n=>{const c=Math.round((n.pct||0)*100),l=n.picked===n.left,u=Math.max(2,c),g=l?n.leftSay:n.rightSay;return`<div class="mp-mb-dim">
        <div class="mp-mb-dh"><b class="${l?"on":""}">${a(n.left)}</b><em>${a(n.name)}</em><b class="${l?"":"on"}">${a(n.right)}</b></div>
        <div class="mp-mb-bar ${l?"l":"r"}"><em style="width:${u}%"></em></div>
        <div class="mp-mb-df">取 ${a(n.picked)} · ${a(n.strength)} ${c}%</div>
        <div class="mp-mb-ds">${a(g)}</div>
      </div>`}).join(""),s=e.profile||{},d=(s.stack||[]).map((n,c)=>`<span class="${c===0?"lead":""}"><b>${a(n.code)}</b>${a(n.say)}</span>`).join("");return`<section class="mp-mb" aria-label="十六型人格结果">
      <div class="mp-mb-h">
        <span class="mp-mb-code">${a(e.type||"")}</span>
        <span class="mp-mb-meta"><b>${a(s.title||"")}</b><i>${a(s.keywords||"")}</i></span>
        <span class="mp-mb-count">已答 ${e.answered||0}/${e.total||0} 题</span>
      </div>
      <div class="mp-mb-body">
        <div class="mp-mb-dims">${i}</div>
        <div class="mp-mb-sec"><em>一句</em>${a(s.oneLine||"")}</div>
        <div class="mp-mb-two">
          <div><b>优势</b>${(s.strengths||[]).map(n=>a(n)).join("；")}</div>
          <div><b>留意</b>${(s.blindspots||[]).map(n=>a(n)).join("；")}</div>
        </div>
        ${d?`<div class="mp-mb-sec"><em>认知功能</em>主导 ${a((s.stack[0]||{}).code||"")} → 依次展开</div><div class="mp-mb-fn">${d}</div>`:""}
        <div class="mp-mb-sec"><em>工作</em>${a(s.work||"")}</div>
        <div class="mp-mb-sec"><em>关系</em>${a(s.love||"")}</div>
        <div class="mp-mb-sec"><em>学习</em>${a(s.study||"")}</div>
        <div class="mp-mb-sec"><em>课题</em>${a(s.growth||"")}</div>
      </div>
      <div class="mp-mb-note">${a(e.note||"")}</div>
    </section>`};const Je=[["巽","离","坤"],["震","中","兑"],["艮","坎","乾"]],Ia={坎:"正北",艮:"东北",震:"正东",巽:"东南",离:"正南",坤:"西南",兑:"正西",乾:"西北",中:"中宫"},Be=["生气","延年","天医","伏位"],be=(e,i)=>`<span class="mp-fs-chip${i?" "+i:""}">${a(e)}</span>`,Qe=(e,i,s)=>`<div class="mp-fs-cell${e==="中"?" center":""}"><div class="mp-fs-top"><span class="mp-fs-gua">${a(e)}</span><span class="mp-fs-dir">${a(Ia[e]||"")}</span>${i||""}</div>`+(s||"")+"</div>",$a=e=>e.length?`<dl class="mp-fs-facts">${e.map(([i,s])=>`<div class="mp-fs-row"><dt>${a(i)}</dt><dd>${a(s)}</dd></div>`).join("")}</dl>`:"",da=(e,i,s,d,n,c)=>`<section class="mp-quick mp-fs" aria-label="风水结果"><div class="mp-quick-h"><b>${a(e)}</b>${i?`<span class="mp-fs-sub">${a(i)}</span>`:""}</div>`+(s.length?`<div class="mp-fs-chips">${s.join("")}</div>`:"")+d+n+c.filter(Boolean).map(l=>`<div class="mp-fs-note">${a(l)}</div>`).join("")+"</section>",Ba=(e,i)=>`<div class="mp-fs-grid" role="group" aria-label="${a(i)}">`+Je.map(s=>s.map(d=>{const n=e.find(u=>u&&u.palace===d);if(!n)return Qe(d,"","");const c=Be.includes(n.star),l=`<span class="mp-fs-star"${n.role?` title="${a(n.role)}"`:""}>${a(n.star)}<em class="${c?"ok":"bad"}">${c?"吉":"凶"}</em></span>`;return Qe(d,l,"")}).join("")).join("")+"</div>";function wa(e,i){const s=i.period,d={};for(const j of e.palaces||[])d[j.palace]=j;const n=`<div class="mp-fs-key">每宫依次为 <b>运</b>／<b>山</b>／<b>向</b> 三星；底色高亮＝当运（${a(s)}运）</div><div class="mp-fs-grid" role="group" aria-label="玄空九宫（运/山/向）">`+Je.map(j=>j.map(k=>{const q=d[k];if(!q)return Qe(k,"","");const C=[["运",q.yun],["山",q.shan],["向",q.xiang]].map(([Q,P])=>`<span class="${P===s?"on":""}" title="${a(Q)}星 ${a(P)}">${a(P)}</span>`).join("");return Qe(k,"",`<div class="mp-fs-nums">${C}</div>`)}).join("")).join("")+"</div>",c=e.wangShanWangXiang||{},l=i.jianXiang||{},u=e.timeFlying||null,g=[be(l.active?`兼${l.jian} ${l.offset}° · 替卦`:"正向 · 下卦",l.active?"ok":""),be(`山盘 ${i.shanCenter.star}${i.shanCenter.name} · ${i.shanCenter.fly}`),be(`向盘 ${i.xiangCenter.star}${i.xiangCenter.name} · ${i.xiangCenter.fly}`),be(c.byChart?"盘面：到山到向":"盘面：未到山到向",c.byChart?"ok":""),be(c.byTable===null?"表法：替卦不套":c.byTable?"表法：在列":"表法：未列",c.byTable?"ok":"")],b=(j,k)=>`${k} ${j.star}${j.name}（${j.fly}，${j.basis}${j.mode==="替卦"?`；原运星 ${j.original}${j.replaced?"，已替":"，用替而未替"}`:""}）`,h=u?[["year","年"],["month","月"],["day","日"],["hour","时"]].filter(([j])=>u[j]).map(([j,k])=>`${k}${u[j].centerName}（${u[j].fly}）`).join("　"):"",T=$a([...l.active?[["替卦",`${l.note}${c.byTable===null?" 正向旺山旺向表不适用于替卦。":""}`]]:[],["入中",`${b(i.shanCenter,"山盘")}；${b(i.xiangCenter,"向盘")}`],["当运",`山星${s}落 ${e.dangYun.shan.text}；向星${s}落 ${e.dangYun.xiang.text}`],["合十",`山星：${(e.heshi.shan||[]).join("、")||"无"}；向星：${(e.heshi.xiang||[]).join("、")||"无"}`],["表法",`${c.note||""}${(c.table||[]).length?` 本运所列：${c.table.join("、")}。`:" 本运表法无局。"}`],...h?[["年月日时",`${h}${u.meta&&u.meta.note?`　${u.meta.note}`:""}`]]:[]]);return da(l.active?"玄空替卦":"玄空下卦",`${i.periodLabel} · 坐${i.sitting} · 向${i.facing}`,g,n,T,[i.note,e.disclaimer])}function xt(e,i){const s=e.mingGua||{},d=Ba([...e.luckyDirections||[],...e.unluckyDirections||[]],"八宅八向（吉凶）"),n=[be(s.compatible||"—"),be(`${i.gender}命 · ${i.guaYear} 年立春界`)],c=[];if(e.yearlyFlying){const l=e.yearlyFlying;c.push(["年紫白",`${l.centerName}入中；${l.palaces.filter(u=>u.palace!=="中").map(u=>`${u.palace}${u.name}`).join("、")}`])}return da("八宅命卦",`${s.num}${s.gua}（${s.group}）· ${s.direction}`,n,d,$a(c),[i.note,e.disclaimer])}function Ga(e,i){const s=e.layout||{},d=Ba(e.houseStars||[],"宅卦八向（吉凶）"),n=[be(`${i.houseGua}宅 · ${i.houseGroup}`),be(`坐${i.sitting}`),be(`向${i.facing}`)],c=[["门",s.door],["灶",s.stove],["床",s.bed],["厕",s.toilet]];return e.mingMatch&&c.push(["命宅配",e.mingMatch.text]),da("门主灶",`${i.houseGua}宅 · 坐${i.sitting} · 向${i.facing}`,n,d,$a(c),[i.birthNote,e.disclaimer])}o.fengshuiHTML=function(e){if(!e||e.system!=="fengshui")return o.quickHTML(e);const i=e.meta||{};return i.action==="xuankong"?wa(e,i):i.action==="advise"?Ga(e,i):xt(e,i)},o.perfHTML=function(e){if(!e)return"";const i=u=>typeof u=="number"&&isFinite(u)?`${Math.max(0,Math.round(u))}ms`:"",s=e.cached===!0?"（已缓存）":e.cached===!1?"（首次加载）":"",d=[];i(e.engineMs)&&d.push(`引擎 ${i(e.engineMs)}${s}`),i(e.computeMs)&&d.push(`排盘 ${i(e.computeMs)}`),i(e.renderMs)&&d.push(`渲染 ${i(e.renderMs)}`);const n=i(e.totalMs);if(!d.length&&!n)return"";const c=n?`首屏 ${n}`:"耗时";return`<div class="mp-perf" title="本机这一次的实测耗时，不含网络与服务端；换机器、首次加载与已缓存会不同">${d.length?`${c}｜${d.join(" · ")}`:c}</div>`},o.zeriHTML=function(e){if(!e||!e.compare||e.compare.mode!=="candidates"||!Array.isArray(e.days))return o.quickHTML(e);const i=e.meta||{},s=e.compare.best?e.compare.best.date:"",d=e.days.map(l=>{const u=l.date===s,g=l.excluded||l.verdict==="回避"?"bad":l.verdict==="推荐"?"good":"";return`<tr class="mp-zr-row${u?" top":""}${l.excluded?" off":""}">
        <th scope="row"><b>${a(l.date)}</b>${u?'<i class="mp-zr-best">最优</i>':""}
          <em>${a(l.weekday)}　${a(l.lunar)}</em></th>
        <td><b>${a(l.dayGanZhi)}</b><em>${a(l.zhiXing)}日</em></td>
        <td class="mp-zr-score">${a(l.score)}</td>
        <td><span class="mp-zr-v ${g}">${a(l.verdict)}</span></td>
        <td class="mp-zr-why">${a(l.reasons.join("；")||"无特别加减分")}</td>
      </tr>`}).join(""),n=(l,u)=>`<span><em>${a(l)}</em>${u.length?a(u.join("、")):"无"}</span>`,c=e.compare.best?`这一组最优：<b>${a(e.compare.best.date)}</b>（${a(e.compare.best.score)} 分 · ${a(e.compare.best.verdict)}）`+(e.compare.best.ties.length>1?`；同分 ${a(e.compare.best.ties.filter(l=>l!==e.compare.best.date).join("、"))}`:""):"这一组都因冲属相被排除，没有可用的日子";return`<section class="mp-zr" aria-label="择日候选比较">
      <div class="mp-zr-h"><b>择日 · ${a(i.task||"")}</b>
        <span>候选 ${a(i.days)} 天${i.shengXiao?`　当事人属${a(i.shengXiao)}`:"（未给属相，未做冲煞排除）"}</span></div>
      <div class="mp-zr-lead">${c}</div>
      <table class="mp-zr-t"><thead><tr>
        <th scope="col">日期</th><th scope="col">日干支 / 建除</th><th scope="col">分</th><th scope="col">结论</th><th scope="col">理由</th>
      </tr></thead><tbody>${d}</tbody></table>
      <div class="mp-zr-lists">
        ${n("推荐",e.best)}${n("可用",e.usable)}${n("回避",e.avoid)}
      </div>
      <p class="mp-zr-note">${a(e.compare.note||"")}</p>
      <p class="mp-zr-note">${a(i.scope||"")}</p>
      <p class="mp-zr-note">${a(e.disclaimer||"")}</p>
    </section>`},o.quickHTML=function(e){if(!e)return"";const s={almanac:"黄历",zeri:"择日",chenggu:"称骨",xiaoliuren:"小六壬",star:"星座",numerology:"生命数字",trend:"人生 K 线",fengshui:"风水",name:"起名",convert:"公农历转换",mbti:"十六型人格"}[e.system]||"速查",d=e.summary||"",n=d?`<pre class="mp-quick-pre">${a(d)}</pre>`:"";return`<section class="mp-quick" aria-label="${a(s)}结果">
      <div class="mp-quick-h"><b>${a(s)}</b></div>
      ${n}
    </section>`},o.summaryCardPNG=function(e,i){try{if(typeof document>"u"||!document.createElement)return"";const s=i&&i.outline||[],d=(i&&i.tables||[]).filter(Z=>Array.isArray(Z.rows)&&Z.rows.length),n=i&&i.systemLabel||e&&e.system||"命理报告",c=900,l=44,u=26,g=(Z,F)=>`${F?"600 ":""}${Z}px "PingFang SC","Microsoft YaHei","Noto Sans CJK SC",sans-serif`,b=document.createElement("canvas"),h=b.getContext?b.getContext("2d"):null;if(!h)return"";const T=(Z,F)=>{const L=[];let x="";for(const R of String(Z)){const G=x+R;h.measureText(G).width>F&&x?(L.push(x),x=R):x=G}return x&&L.push(x),L.length?L:[""]};h.font=g(15);let j=0;const k=s.map(Z=>{const F=T(Z.text,c-l*2-70);return j+=Math.min(F.length,2)*u+10,{o:Z,lines:F.slice(0,2)}}),q=d[0]||null,C=q?q.rows.slice(0,6):[],Q=q?54+C.length*34:0,P=150+j+(k.length?34:0)+Q+120;b.width=c,b.height=P,h.fillStyle="rgb(255,255,255)",h.fillRect(0,0,c,P),h.fillStyle="rgb(31,111,63)",h.fillRect(0,0,c,8);let $=52;h.fillStyle="rgb(27,27,27)",h.font=g(28,!0),h.fillText(`${n} · 摘要`,l,$),$+=30,h.fillStyle="rgb(111,106,96)",h.font=g(14);const N=[e&&e.input&&e.input.datetime?`出生/起局：${e.input.datetime}`:"","本地计算 · 可复现"].filter(Boolean).join("　");if(h.fillText(N,l,$),$+=34,k.length){h.fillStyle="rgb(31,111,63)",h.font=g(16,!0),h.fillText("一页读懂",l,$),$+=26;for(const{o:Z,lines:F}of k)h.fillStyle="rgb(138,131,120)",h.font=g(14,!0),h.fillText(Z.label,l,$),h.fillStyle="rgb(63,58,51)",h.font=g(15),F.forEach((L,x)=>h.fillText(L,l+70,$+x*u)),$+=F.length*u+10;$+=8}if(q){h.fillStyle="rgb(31,111,63)",h.font=g(16,!0),h.fillText(q.title,l,$),$+=24,h.fillStyle="rgb(138,131,120)",h.font=g(13),h.fillText(q.columns.join(" · "),l,$),$+=8,h.strokeStyle="rgb(229,225,216)",h.beginPath(),h.moveTo(l,$),h.lineTo(c-l,$),h.stroke(),$+=22,h.fillStyle="rgb(63,58,51)",h.font=g(14);for(const Z of C){const F=Z.filter(Boolean).join(" · "),L=T(F,c-l*2)[0];h.fillText(L,l,$),$+=34}}return $=P-62,h.strokeStyle="rgb(229,225,216)",h.beginPath(),h.moveTo(l,$-18),h.lineTo(c-l,$-18),h.stroke(),h.fillStyle="rgb(138,131,120)",h.font=g(12),h.fillText("内容用于传统文化学习与自我探索，不构成医疗、投资、法律或人事决策依据。",l,$+6),h.fillText("dsh-metaphysics · 本机计算，未上传任何数据",l,$+26),b.toDataURL?b.toDataURL("image/png"):""}catch{return""}}})();const At="dsh-metaphysics/history-v1";function Ni(){try{const r=window.localStorage&&window.localStorage.getItem(At),o=r?JSON.parse(r):[];return Array.isArray(o)?o.slice(0,20):[]}catch{return[]}}function Tt(r){try{window.localStorage&&window.localStorage.setItem(At,JSON.stringify(r.slice(0,20)))}catch{}}const Mi=(r,o)=>r.kind===o.kind&&r.date===o.date&&r.time===o.time&&r.gender===o.gender&&r.address===o.address&&r.lines===o.lines&&r.question===o.question&&r.mhMode===o.mhMode&&r.upper===o.upper&&r.lower===o.lower;function Si(r,o){if(r==="bazi"){const ee=["year","month","day","hour"].map(ae=>o.pillars&&o.pillars[ae]).filter(Boolean).map(ae=>ae.ganzhi).join(" ");return o.hourUnknown||o.pillars&&!o.pillars.hour?`${ee}（时柱暂缺）`:ee}return r==="ziwei"?`${o.soul?o.soul.branch:""}宫 ${o.bureau?o.bureau.name:""} ${o.lunar?o.lunar.year+"年":""}`.trim():r==="liuyao"?o.ben&&o.ben.name?o.ben.name:"":r==="meihua"?o.ben&&o.ben.name?`${o.ben.name} 动${o.moving}`:"":r==="daliuren"?`${o.dayGanZhi||""} ${o.geJu?o.geJu.name:""}`:""}const D=window.__PP,ga=()=>typeof performance<"u"&&performance.now?performance.now():Date.now();let Oe=0;const rt=typeof window.__mpEnsureEngine=="function"?window.__mpEnsureEngine:async()=>window.Engine,Li=`
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
`,{useState:M,useEffect:fa}=ua,Ma=4,Pe=12;let Sa=null;function La(){if(Sa)return Sa;let r=null;try{r=K.compute({system:"mbti"})}catch{r=null}const o=r&&r.questions||[];return o.length?(Sa={total:r&&r.total||o.length,questions:o,scale:r&&r.scale||{}},Sa):{total:0,questions:[],scale:{}}}function Ai(r){const{answers:o,page:E,onPick:ee,onPage:ae,onSubmit:ne,onClear:ce}=r,re=La(),a=Math.max(1,Math.ceil(re.total/Ma)),le=E*Ma,I=re.questions.slice(le,le+Ma),pe=o.filter(J=>J!=null).length,me=re.total?Math.round(pe/re.total*100):0,ye=E>=a-1,W=pe>=Pe;return p("div",{className:"mp-quiz"},p("div",{className:"mp-quiz-top"},p("div",{className:"mp-quiz-bar","aria-hidden":"true"},p("i",{style:{width:me+"%"}})),p("span",{className:"mp-quiz-count"},`第 ${E+1} / ${a} 页 · 已答 ${pe} / ${re.total}`)),p("div",{className:"mp-quiz-list"},I.map((J,B)=>{const U=le+B;return p("div",{key:J.id||U,className:"mp-quiz-q"},p("div",{className:"mp-quiz-qt"},p("b",null,String(U+1).padStart(2,"0")),p("span",null,J.text)),p("div",{className:"mp-quiz-opts",role:"radiogroup","aria-label":`第 ${U+1} 题`},[1,2,3,4,5].map(ge=>p("label",{key:ge,className:"mp-quiz-o"+(o[U]===ge?" on":"")},p("input",{type:"radio",name:`mpmbq${U}`,value:String(ge),checked:o[U]===ge,onChange:()=>ee(U,ge)}),p("b",null,String(ge)),p("span",null,re.scale[ge]||"")))))})),p("div",{className:"mp-quiz-nav"},p("button",{className:"mp-quiz-btn",disabled:E<=0,onClick:()=>ae(-1)},"上一页"),ye?null:p("button",{className:"mp-quiz-btn",onClick:()=>ae(1)},"下一页"),p("button",{className:"mp-quiz-btn primary",disabled:!W,onClick:ne},"看结果"),p("button",{className:"mp-quiz-btn",onClick:ce},"清空"),p("span",{className:"mp-quiz-hint"},W?`已够 ${Pe} 题，可以看结果；答完 ${re.total} 题会更准。`:`答满 ${Pe} 题可先看结果（还差 ${Pe-pe} 题）。`)))}class Ti extends(ua.Component||Object){constructor(o){super(o),this.state={err:null}}static getDerivedStateFromError(o){return{err:o}}componentDidCatch(o,E){console.error("[metaphysics] 面板渲染异常",o,E)}render(){if(!this.state.err)return this.props.children;const o=this.state.err,E=String(o&&o.stack||"").split(`
`).slice(0,14).join(`
`);return p("div",{className:"mp-wrap"},p("div",{className:"mp-panel"},p("div",{className:"mp-lbl"},"命理面板渲染出错——把下面这段发给我"),p("pre",{style:{whiteSpace:"pre-wrap",fontSize:12,lineHeight:1.5,maxHeight:320,overflow:"auto",margin:"8px 0"}},String(o&&o.message||o)+`

`+E),p("div",{className:"mp-lbl"},"环境：__PP "+typeof D+" · Engine "+typeof window.Engine+" · React "+typeof ua+" · 版本 "+(typeof D=="object"&&D&&(window.__MP_VER||"?")))))}}function Ci(r){const o=r&&r.size?r.size:20,E=r&&r.active;return p("svg",{width:o,height:o,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.6,strokeLinecap:"round","aria-hidden":!0,style:{opacity:E?1:.72}},p("circle",{cx:12,cy:12,r:8.2}),p("path",{d:"M12 3.8a4.1 4.1 0 0 1 0 8.2 4.1 4.1 0 0 0 0 8.2"}),p("circle",{cx:12,cy:8,r:1.1,fill:"currentColor",stroke:"none"}),p("circle",{cx:12,cy:16,r:1.1,fill:"currentColor",stroke:"none"}))}const De=[{k:"ziwei",label:"紫微",timeLabel:"出生时刻",hint:"紫微斗数需要出生日期、时刻与性别；出生地只影响真太阳时修正。"},{k:"bazi",label:"八字",timeLabel:"出生时刻",hint:"四柱八字按节气与真太阳时定时柱，出生地越准，时柱越稳。"},{k:"liuyao",label:"六爻",timeLabel:"起卦时刻",hint:"六爻不需要出生时间：只用起卦当下的日辰定六神、月建定旺衰，卦由摇出。"},{k:"meihua",label:"梅花",timeLabel:"起卦时刻",hint:"梅花用起卦时刻的年月日时数成卦，也可直接给两个数字起卦；与出生时间无关。"},{k:"daliuren",label:"六壬",timeLabel:"起卦时刻",hint:"大六壬用起卦时刻的日干支、时支与月将起天地盘；同样与出生时间无关。"},{k:"qimen",label:"奇门",timeLabel:"起局时刻",hint:"奇门时家转盘：用起局时刻定节气、三元与局数；换局规则决定符头与节气如何对齐。"},{k:"hepan",label:"合盘",timeLabel:"你的出生时刻",hint:"合盘按「日主 + 夫妻宫 + 五行互补」看两个人的相处与互补，需要双方出生信息。"},{k:"tarot",label:"塔罗",timeLabel:"",hint:"塔罗不看时间，只记录抽牌时刻与你的提问。"},{k:"almanac",label:"黄历",timeLabel:"",hint:"黄历按公历日期查农历、干支、宜忌、时辰吉凶、二十八宿与吉神方位；只做本地计算。"},{k:"convert",label:"农历",timeLabel:"",hint:"公农历互转：公历生日可反查农历；只知道农历生日时，可转成公历再排盘。"},{k:"zeri",label:"择日",timeLabel:"",hint:"择日把区间内每天的建除宜忌与事项适配打分排序，并按属相排除冲煞日。"},{k:"chenggu",label:"称骨",timeLabel:"出生时刻",hint:"称骨按农历年、月、日、时的骨重求和；时辰必填。"},{k:"xiaoliuren",label:"小六壬",timeLabel:"起课时刻",hint:"小六壬用农历月/日/时掐指，也可用三个随机数起课。"},{k:"star",label:"星座",timeLabel:"",hint:"星座按公历日期给出太阳星座与当日基调；同日同星座结果固定。"},{k:"numerology",label:"生命数字",timeLabel:"",hint:"生命数字按公历生日归约出生命路径数、生日数与态度数。"},{k:"mbti",label:"人格",timeLabel:"",hint:"十六型人格是 24 道自我报告题的 MBTI 风格测算：4 题一页，按 1–5 打分，答满 12 题即可看结果；只作自我参照，不是官方量表。"},{k:"trend",label:"人生K线",timeLabel:"出生时刻",hint:"人生 K 线按大运与流年十神给逐年运势分，画成走势图。"},{k:"fengshui",label:"风水",timeLabel:"",hint:"风水看八宅命卦、大游年四吉四凶与流年九宫飞星；也可按坐向看门主灶倾向，或按运与坐向排玄空下卦盘。"},{k:"name",label:"起名",timeLabel:"",hint:"起名按八字喜用匹配字库五行，可评估现有名字或生成候选名。"}];function na(r){return String(r).padStart(2,"0")}const pt=["almanac","convert","zeri","chenggu","xiaoliuren","star","numerology","trend","fengshui","name"],Hi=Array.isArray(window.__MPGroups)?window.__MPGroups:[],Ct="mp.recent.tabs",Ht="mp.first.view",_t=3;function Et(r){try{return JSON.parse(window.localStorage.getItem(r)||"null")}catch{return null}}function Ft(r,o){try{window.localStorage.setItem(r,JSON.stringify(o))}catch{}}function _i(r){const o=new Date(r);if(Number.isNaN(o.getTime()))return"";const E=ae=>new Date(ae.getFullYear(),ae.getMonth(),ae.getDate()).getTime(),ee=Math.round((E(new Date)-E(o))/864e5);return ee<=0?"今天":ee===1?"昨天":`${na(o.getMonth()+1)}-${na(o.getDate())}`}function lt(){const r=new Date;return{date:`${r.getFullYear()}-${na(r.getMonth()+1)}-${na(r.getDate())}`,time:`${na(r.getHours())}:${na(r.getMinutes())}`}}const Ei={ziwei:"birth",bazi:"birth",hepan:"birth",liuyao:"cast",meihua:"cast",daliuren:"cast",qimen:"cast",tarot:"none",almanac:"date",zeri:"date",star:"date",numerology:"date",convert:"date",chenggu:"birth",trend:"birth",fengshui:"birth",name:"birth",xiaoliuren:"cast",mbti:"none"},Ot={date:"1990-05-12",time:"14:30"},dt=r=>Ei[r]||"none",ke=window.__MPCore||{},Te=ke.needAsk||(r=>!1),ie={ref:null,seats:[],seatOk:{},keys:"",injectType:"",spec:"",errs:[],regs:0,mounted:0},Ke={r:null,q:"",it:null};let Re="";function Pt(){const r=[];return r.push("inputActions "+(ie.ref?"已拿到":"未拿到")),r.push("渲染 "+ie.mounted+" 次"),r.push("注册 "+ie.regs+" 次"),r.push("inject "+(ie.injectType||"?")),r.push("槽位 "+(ie.spec||"?")),ie.errs.length&&r.push("错误："+ie.errs.join(" / ")),"桥自检："+r.join("；")}function Dt(r){if(ie.errs.length>=3)return;const o=r&&r.message?String(r.message):String(r);ie.errs.push(o.slice(0,90))}function Fi(r){if(!r)return null;const o=r.inputActions;if(o&&typeof o.setDraft=="function"&&typeof o.submit=="function")return o;const E=r.actions&&r.actions.input;return E&&typeof E.setDraft=="function"&&typeof E.submit=="function"?E:null}function Rt(r,o){const E=Fi(r);return fa(()=>{if(ie.seats.indexOf(o)<0&&ie.seats.push(o),ie.keys=r?Object.keys(r).join(","):"",E){ie.ref=E;try{window.__MPComposer=E}catch{}}return()=>{ie.ref===E&&(ie.ref=null)}},[E,o]),E}function Oi(){const r=Ke.r;if(!r)return"";try{const o=K.askPrompt?K.askPrompt(r,{question:Ke.q,interpret:Ke.it}):null;return o&&o.text||String(r.summary||"")}catch{return String(r.summary||"")}}function It(r){return ie.mounted+=1,Rt(r,"input.right")?p("button",{type:"button",className:"mp-chip ok",title:Ke.r?"把上一张盘的摘要和问题发进对话窗":"先在侧栏「命理」里排一张盘",onClick:()=>{const E=Oi();E&&Gt(E)}},"命理·问"):p("span",{className:"mp-chip warn",title:"命理：已占住输入框槽位，但没拿到 inputActions；把这句话告诉作者"},"命理·未就绪")}function Bt(r){return ie.mounted+=1,Rt(r,"composer.dock"),null}function Gt(r){let o=ie.ref;if(!o)try{o=window.__MPComposer||null}catch{o=null}return!o||typeof o.setDraft!="function"||typeof o.submit!="function"?!1:(o.setDraft(r),o.submit(),!0)}function Pi(){const[r,o]=M("ziwei"),[E,ee]=M("1990-05-12"),[ae,ne]=M("14:30"),[ce,re]=M(!1),[a,le]=M("female"),[I,pe]=M(""),[me,ye]=M("1992-08-15"),[W,J]=M("10:00"),[B,U]=M("female"),[ge,xa]=M(""),[sa,Ye]=M("bazi"),[Ce,ba]=M(!1),[Ve,Aa]=M("1990-01-01"),[Ta,Ca]=M("12:00"),[Ha,_a]=M("male"),[ha,mt]=M(""),[Ea,ut]=M("chaibu"),[Xe,oa]=M(!0),[Ie,ra]=M(!0),[Fa,gt]=M("same-day"),[va,ft]=M(!1),[$e,pa]=M(""),[Oa,fe]=M(""),[Pa,ya]=M(null),[la,Da]=M({}),[We,Ra]=M(null),[Je,Ia]=M([{year:"2019",kind:"career"},{year:"2022",kind:"love"}]),[Be,be]=M(null),[Qe,$a]=M("开业"),[da,Ba]=M("30"),[wa,xt]=M(""),[Ga,e]=M(""),[i,s]=M("solar2lunar"),[d,n]=M(""),[c,l]=M(!1),[u,g]=M("time"),[b,h]=M(""),[T,j]=M(""),[k,q]=M(""),[C,Q]=M(()=>new Array(La().total).fill(null)),[P,$]=M(0),[N,Z]=M("60"),[F,L]=M("natal"),[x,R]=M("9"),[G,oe]=M("子"),[se,ue]=M("午"),[xe,Ne]=M("assess"),[we,He]=M("李"),[_e,ea]=M(""),[Me,H]=M("6"),[m,w]=M(!1),[V,Y]=M(""),[v,A]=M(null),[de,ze]=M(null),[he,Ge]=M(()=>Ni()),[Le,ka]=M(()=>Et(Ht)==="flat"?"flat":"group"),[bt,Bi]=M(()=>{const t=Et(Ct);return Array.isArray(t)?t:[]}),[Gi,Ui]=M({}),[ht,Zt]=M(null),[Kt,Ua]=M(()=>D.profilesLoad()),[za,Za]=M(null),[Yt,Vt]=M(""),[Ka,Ee]=M(""),[Xt,Fe]=M(""),[Zi,Ya]=M(!1),[vt,Wt]=M("3"),[ca,yt]=M(""),[aa,Jt]=M("general");function $t(){return $e.trim()||(v&&Te(v.kind)?String(ca||"").trim():"")}fa(()=>{v&&v.r&&(Ke.r=v.r,Ke.q=$t(),Ke.it=v.it||null)},[v,$e,ca]);const[Qt,Ki]=M(null),[Yi,Va]=M(!1),[Ue,ei]=M("time"),[Xa,ai]=M(""),[Wa,ti]=M(""),[Ja,ii]=M(""),[Vi,ta]=M(""),[wt,Qa]=M({birth:null,cast:null}),Xi=De.find(t=>t.k===r)||De[0],ja=r==="bazi"||r==="ziwei"||r==="hepan"||r==="chenggu"||r==="trend"||r==="fengshui"||r==="name",Se=dt(r),ni=!(r==="meihua"&&Ue==="number"),si=r!=="tarot"&&r!=="mbti"&&ni,oi=si&&Se!=="date",En=oi,ve=async(t,f,S,_)=>{const y=t||r,te=S||Ue,je=y==="bazi"||y==="trend",Ze=_&&typeof _.hourUnknown=="boolean"?_.hourUnknown:ce,qe=f||(je&&Ze?{date:E,time:"12:00"}:{date:E,time:ae}),Ae=_&&_.gender?_.gender:a,qa=_&&typeof _.address=="string"?_.address:I,at=_&&typeof _.trueSolar=="boolean"?_.trueSolar:Xe,tt=_&&typeof _.lateZi=="boolean"?_.lateZi:Ie,bi=_&&typeof _.lines=="string"?_.lines:V,it=_&&typeof _.question=="string"?_.question:ca,hi=ga(),vi=++Oe,nt=()=>vi!==Oe;ze(null),Fe("");try{let ia=0,yi=null;Ya(!0);try{await rt(y);const O=window.__MP_LAST_LOAD;ia=O&&typeof O.ms=="number"?O.ms:ga()-hi,yi=O&&typeof O.cached=="boolean"?O.cached:null}catch(O){if(nt())return;Ee(O&&O.message?O.message:String(O)),A(null);return}finally{Ya(!1)}if(nt())return;const $i=`${qe.date}T${qe.time}`,z={system:y};if(z.shadow=y!=="mbti",z.trace=y==="liuyao"||y==="bazi"||y==="ziwei"||y==="qimen"||y==="daliuren",y!=="tarot"&&(z.datetime=$i),y==="bazi"||y==="ziwei"||y==="hepan"){if(z.gender=Ae,z.trueSolar=at,qa.trim()){z.address=qa.trim();try{const O=await K.geocodeAddress(z.address,{online:m});O&&typeof O.lon=="number"&&(z.longitude=O.lon,z.geo=O)}catch(O){console.error("[metaphysics] 地址解析失败，退回内置表",O)}if(nt())return}y!=="hepan"&&(z.cross=va),z.lateZi=tt,je&&Ze&&(z.hourUnknown=!0)}if(y==="liuyao"){const O=ke.parseLines(bi);O.lines?z.lines=O.lines:O.warning&&Fe(O.warning)}if(y==="qimen"&&(z.juMethod=Ea,z.lateZiHourMode=Fa,z.direction=aa),y==="bazi"&&(z.verifyPast=6),y==="zeri"){z.startDate=qe.date,z.task=Qe,z.days=Number(da)||30,wa&&(z.shengXiao=wa);const O=Ga.split(/[,，、\s]+/).filter(Boolean);O.length&&(z.candidates=O)}if(y==="xiaoliuren")if(z.mode=u,u==="number")z.num1=Number(b)||void 0,z.num2=Number(T)||void 0,z.num3=Number(k)||void 0;else{z.date=qe.date;const O=Number(String(qe.time).split(":")[0]);z.hour=Number.isFinite(O)?O:12}if(y==="mbti"){delete z.datetime;const O=C.slice();for(;O.length&&O[O.length-1]==null;)O.pop();O.length&&(z.answers=O)}if(y==="trend"&&je&&Ze&&(z.hourUnknown=!0),y==="trend"&&(z.gender=Ae,z.toAge=Number(N)||60,z.trueSolar=at,z.lateZi=tt),y==="fengshui"&&(z.action=F,F==="natal"?z.gender=Ae:(z.sitting=G,z.facing=se,delete z.datetime,F==="xuankong"&&(z.period=Number(x)||9))),y==="name"&&(z.action=xe,z.surname=we.trim(),xe==="generate"?(z.gender=Ae,z.limit=Number(Me)||6,z.trueSolar=at,z.lateZi=tt):(z.givenName=_e.trim(),(!qe.date||!qe.time)&&delete z.datetime)),y==="convert")if(z.system="convert",i==="lunar2solar"){const O=/^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(d).trim());if(!O){Ee("农历转公历请按「农历年-月-日」填写，例如 2026-9-17；闰月单独勾选。");return}z.mode="lunar2solar",z.lunarYear=Number(O[1]),z.lunarMonth=Number(O[2]),z.lunarDay=Number(O[3]),z.isLeapMonth=c,delete z.datetime}else z.mode="solar2lunar";if(y==="tarot"&&(z.count=Number(vt)),y==="hepan"&&(z.chart=sa,z.partner={datetime:`${me}T${W}`,gender:B,address:ge.trim()||void 0,trueSolar:Xe},Ce&&(z.partner2={datetime:`${Ve}T${Ta}`,gender:Ha,address:ha.trim()||void 0,trueSolar:Xe})),Te(y)){if(!it.trim()){Ee("请先填写「所问之事」——一句话即可，例如：今年是否适合换工作？"),Va(!0),A(null);return}Va(!1),z.question=it.trim(),y==="liuyao"&&(z.direction=aa)}if(y==="meihua"&&(z.mode=te,te==="number")){if(Xa.trim()===""||Wa.trim()===""){Ee("数字起卦需要填两个数（第一个数定上卦、第二个数定下卦）。"),A(null);return}if(z.upper=Number(Xa),z.lower=Number(Wa),!Number.isFinite(z.upper)||!Number.isFinite(z.lower)){Ee("两个数都要是数字，例如 17 和 29。"),A(null);return}Ja!==""&&(z.changing=Number(Ja))}const Ln=ga();y==="trend"&&!z.asOf&&ke.todayStamp&&(z.asOf=ke.todayStamp());const ma=K.compute(z),An=ga()-Ln;let zt=null;try{zt=D.shadowTrack?D.shadowTrack(ma):null}catch{zt=null}let jt=null;if(y==="bazi")try{jt=K.compute({system:"trend",datetime:$i,gender:Ae,toAge:100,trueSolar:at,lateZi:tt,...ke.todayStamp?{asOf:z.asOf||ke.todayStamp()}:{},...z.dst!==void 0?{dst:z.dst}:{},...z.address?{address:z.address}:{},...typeof z.longitude=="number"?{longitude:z.longitude}:{},...z.geo?{geo:z.geo}:{}})}catch{jt=null}let qt=null;if(K.caliberCompare)try{qt=K.caliberCompare(z)}catch{qt=null}const Tn=Te(y)||y==="qimen"?{question:Te(y)?it.trim():"",direction:aa}:void 0,st=K.interpret?K.interpret(ma,Tn):null;st&&ma.cross&&K.crossSection&&(st.sections=[...st.sections||[],K.crossSection(ma.cross)]);const Cn=dt(y)==="cast"&&(y!=="meihua"||te==="time");A({kind:y,r:ma,it:st,at:qe,timed:Cn,trend:jt,caliber:qt,shadowDiff:zt});const wi=O=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>O>1?wi(O-1):ki()):setTimeout(ki,0)},ki=()=>{vi===Oe&&ze({engineMs:ia,computeMs:An,cached:yi,totalMs:ga()-hi,renderMs:null})};if(wi(2),ya(null),Ra(null),Da({}),be(null),Ee(""),ta(""),y!=="tarot"&&y!=="mbti"){const O={kind:y,date:E,time:ae,gender:a,address:I,lines:y==="liuyao"?bi:"",question:Te(y)?it.trim():"",direction:aa,count:vt,mhMode:Ue,upper:Xa,lower:Wa,changing:Ja,label:Si(y,ma),at:Date.now()};Ge(Hn=>{const zi=[O,...Hn.filter(_n=>!Mi(_n,O))].slice(0,20);return Tt(zi),zi})}}catch(ia){if(nt())return;Ee(ia&&ia.message?ia.message:String(ia)),A(null)}},Wi=async t=>{const f=dt(t),S=++Oe;if(Ee(""),t==="mbti"){Fe(""),Ya(!0);try{await rt(t)}catch(y){S===Oe&&Ee(y&&y.message?y.message:String(y))}finally{Ya(!1)}if(S!==Oe)return;o(t),C.filter(y=>y!=null).length>=Pe?ve(t):A(null);return}if(o(t),f==="none"){ve(t);return}const _=wt[f]||(f==="cast"?lt():{date:Ot.date,time:Ot.time});ee(_.date),ne(_.time),ve(t,_)},Ji=t=>{De.some(f=>f.k===t)&&Bi(f=>{const S=(f||[]).filter(y=>y&&y.tab&&y.tab!==t),_=[{tab:t,at:Date.now()}].concat(S).slice(0,_t);return Ft(Ct,_),_})},ri=t=>{const f=t==="flat"?"flat":"group";ka(f),Ft(Ht,f)},kt=t=>{Ji(t),Wi(t)},Qi=t=>{ee(t),Se!=="none"&&Qa(f=>Object.assign({},f,{[Se]:{date:t,time:ae}}))},en=t=>{ne(t),Se!=="none"&&Qa(f=>Object.assign({},f,{[Se]:{date:E,time:t}}))},Fn=()=>{const t=lt();ee(t.date),ne(t.time),Se!=="none"&&Qa(f=>Object.assign({},f,{[Se]:null})),ve(r,t)},pi=()=>{if(r==="mbti"){const t=C.filter(f=>f!=null).length;if(t<Pe){Fe(`先答满 ${Pe} 题再看结果（现答 ${t} 题，还差 ${Pe-t} 题）。`);return}ve(r);return}if(Se!=="none"&&!wt[Se]){const t=lt();ee(t.date),ne(t.time),ve(r,t);return}ve(r)},an=()=>{const t={date:"1990-05-12",time:"14:30"};o("bazi"),le("male"),pe("河北石家庄"),Qa(f=>Object.assign({},f,{birth:t})),ee(t.date),ne(t.time),ve("bazi",t,null,{gender:"male",address:"河北石家庄"})},li=t=>{ei(t),ve(r,{date:E,time:ae},t)},tn=()=>!!(window.matchMedia&&window.matchMedia("(max-width: 640px)").matches),nn=()=>Qt===null?tn():Qt,et=(t,f,S)=>{if(!f)return;const _=te=>{t.textContent=te?"已复制":"复制失败",setTimeout(()=>{t.textContent=S},1400)},y=()=>{try{const te=document.createElement("textarea");te.value=f,te.setAttribute("readonly",""),te.style.position="fixed",te.style.opacity="0",document.body.appendChild(te),te.select();const je=!!(document.execCommand&&document.execCommand("copy"));return document.body.removeChild(te),je}catch{return!1}};try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(f).then(()=>_(!0),()=>_(y()));return}}catch{}_(y())},sn=t=>et(t,t.getAttribute("data-shadow-copy")||"","复制 ID"),on=t=>et(t,t.getAttribute("data-handle-copy")||"","复制句柄"),rn=t=>{const f=t.closest(".mp-trace-layer")||document.getElementById("mp-trace-layer"),S=f&&f.querySelector("[data-trace-md]");et(t,S?S.value:"","复制 Markdown")},pn=()=>{try{return String(location.href).split("#")[0]}catch{return""}},ln=()=>{if(!v||!v.r)return null;try{return K.askPackages?K.askPackages(v.r,{question:$t(),interpret:v.it,base:pn()}):null}catch{return null}},di=[["full","复制提问","完整提问：盘面摘要 + 阅读层次 + 回答骨架，粘进任何对话窗都能用"],["brief","复制精简","一句话版：体系 + 排盘句柄 + 你的问题，够助手认出是哪张盘"],["structured","复制参数","结构化参数（JSON）：助手可直接照 args 调 compute，不必解析自然语言"],["link","复制深链","深链：把这张盘的参数编进链接，打开即还原同一张盘（换台机器、发给朋友都行）"]],dn=(t,f)=>{const S=ln();if(!S){fe("还没有可以复制的盘：先排一张。");return}const _=t==="link"?S.link:S[t];if(!_){fe(t==="link"?"这张盘没拿到句柄（随机抽牌只复现参数、不复现牌面），深链做不出来；用「复制提问」那一档。":"这一档暂时是空的，换一档试试。");return}et(f,_,di.find(y=>y[0]===t)[1]),t==="link"&&fe("深链已复制：打开就还原这张盘，也可以直接发给别人。链接里是编码不是加密，别公开贴。")},cn=()=>{const t=document.getElementById("mp-trace-layer");if(!t)return;t.classList.add("open"),t.setAttribute("aria-hidden","false");const f=t.querySelector("[data-trace-close]");f&&f.focus&&f.focus()},ci=()=>{const t=document.getElementById("mp-trace-layer");if(!t)return;t.classList.remove("open"),t.setAttribute("aria-hidden","true");const f=document.querySelector("[data-trace-open]");f&&f.focus&&f.focus()},mn=t=>{const f=t.target&&t.target.closest?t.target.closest("[data-shadow-copy]"):null;if(f){sn(f);return}const S=t.target&&t.target.closest?t.target.closest("[data-handle-copy]"):null;if(S){on(S);return}if(t.target&&t.target.closest?t.target.closest("[data-trace-open]"):null){cn();return}const y=t.target&&t.target.closest?t.target.closest("[data-trace-copy]"):null;if(y){rn(y);return}if(t.target&&t.target.closest?t.target.closest("[data-mp-askcopy]"):null){fn();return}if(t.target&&t.target.closest?t.target.closest("[data-trace-close]"):null){ci();return}const Ze=t.target&&t.target.closest?t.target.closest(".mp-it-head"):null;if(!Ze)return;const qe=Ze.closest(".mp-it");if(!qe)return;const Ae=!qe.classList.contains("folded");qe.classList.toggle("folded",Ae),Ze.setAttribute("aria-expanded",Ae?"false":"true");const qa=Ze.querySelector(".mp-it-hint");qa&&(qa.textContent=Ae?"点击展开":"点击收起"),Ki(Ae)},mi=(t,f)=>{if(!v||!(Te(r)||r==="qimen"))return;const S={question:Te(r)?(f===void 0?ca:f).trim():"",direction:t===void 0?aa:t},_=K.interpret?K.interpret(v.r,S):null;let y=v.r;if((r==="liuyao"||r==="qimen")&&y&&y.trace&&K.buildTrace)try{const te=r==="liuyao"?K.buildTrace(y,{direction:S.direction,gender:y.useGod&&y.useGod.gender||"male",refresh:!0}):K.buildTrace(y,{direction:S.direction});te&&(y=Object.assign({},y,{trace:te}))}catch{}A(Object.assign({},v,{r:y,it:_}))},un=t=>!t||!t.timed||!t.at?"":`<div class="mp-cast">起卦时刻：<b>${t.at.date} ${t.at.time}</b>　（来自你的本机时间，点「此刻」可重新取当下）</div>`,gn=()=>{try{const t=v&&v.r&&v.r.summary?v.r.summary:"";if(!t)return;navigator.clipboard.writeText(t).then(()=>ta("已复制"),()=>ta("复制失败"))}catch{ta("复制失败")}},fn=()=>{if(!v||!v.r||!window.Engine||!window.Engine.buildEventPrompt)return;const t=ke&&ke.kindOfDirection?ke.kindOfDirection(aa):"other";let f;try{f=window.Engine.buildEventPrompt(v.r,{question:(ca||"").trim(),kind:t,gender:a,timeKnown:!0})}catch{f=null}f&&f.text&&navigator.clipboard.writeText(f.text).then(()=>ta("已复制问事提示"),()=>ta("复制失败"))},ui=()=>{if(!(!v||!v.r||!$e.trim()))try{ya(K.followup?K.followup(v.r,$e.trim()):null)}catch(t){ya({question:$e.trim(),ok:!1,answer:"追问失败："+(t&&t.message?t.message:t),evidence:[],confidence:"弱"})}},xn=()=>{if(!(!v||!v.r))try{const t=K.askPrompt?K.askPrompt(v.r,{question:$t(),interpret:v.it}):null,f=t&&t.text?t.text:String(v.r.summary||"");if(Gt(f)){fe("已发到对话窗，往下看回复。");return}const S="（"+Pt()+"）";navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(f).then(()=>fe("对话输入框还没就绪"+S+"，已复制提问；粘进对话窗回车即可。"),()=>fe("对话输入框还没就绪"+S+"，复制也没成功；先点「复制文字结果」再贴。")):fe("对话输入框还没就绪"+S+"；先点「复制文字结果」再贴进对话窗。")}catch(t){fe("发到对话窗失败："+(t&&t.message?t.message:t))}},bn=()=>{if(!(!v||!v.r))try{const t=K.renderText?K.renderText(v.r):v.r.summary||"",f=new Blob([t],{type:"text/markdown;charset=utf-8"}),S=document.createElement("a");S.href=URL.createObjectURL(f),S.download=`命理报告-${v.r.system}.md`,document.body.appendChild(S),S.click(),S.remove(),setTimeout(()=>URL.revokeObjectURL(S.href),2e3)}catch(t){console.error("[metaphysics] 导出失败",t)}},hn=()=>{if(!(!v||!v.r))try{const t=D.summaryCardPNG?D.summaryCardPNG(v.r,v.it):"";if(!t){ta("当前环境不支持 Canvas 导出");return}const f=document.createElement("a");f.href=t,f.download=`命理摘要-${v.r.system}.png`,document.body.appendChild(f),f.click(),f.remove()}catch(t){console.error("[metaphysics] 长图导出失败",t)}},gi={fontSize:12,padding:"5px 12px"},vn=()=>{!v||!v.r||!v.r.past||Ra(K.verifyFit?K.verifyFit(v.r.past.rows,la):null)},yn=()=>{if(!(!v||v.kind!=="bazi"))try{const[t,f,S]=String(E).split("-").map(Number),[,_]=String(ae).split(":").map(Number),y=Je.filter(te=>Number(te.year)).map(te=>({year:Number(te.year),kind:te.kind}));be(K.rectifyBirth?K.rectifyBirth({base:{year:t,month:f,day:S,minute:Number.isFinite(_)?_:0},gender:a,events:y,lateZi:Ie,trueSolar:Xe,address:I.trim()||void 0}):{error:"当前客户端未加载生时校正模块"})}catch(t){be({error:t&&t.message?t.message:String(t)})}},X=(t,f)=>p("label",{className:"mp-field"},p("span",{className:"mp-lbl"},t),f),$n=t=>{o(t.kind),t.date&&ee(t.date),t.time&&ne(t.time),t.gender&&le(t.gender),pe(t.address||""),Y(t.lines||""),yt(t.question||""),Jt(t.direction||"general"),Wt(t.count||"3"),ei(t.mhMode||"time"),ai(t.upper||""),ti(t.lower||""),ii(t.changing||""),Va(!1),Zt(t)},wn=()=>{Ge([]),Tt([])},kn=["bazi","ziwei","trend","chenggu"],fi=t=>{o(t.kind),ee(t.date),t.time&&ne(t.time),re(!!t.hourUnknown),t.gender&&le(t.gender),pe(t.address||"")},zn=t=>{const f=D.profEvent(t.target);if(!f)return;const S=y=>Kt.find(te=>te.id===y),_=t.currentTarget.querySelector(".mp-prof-name");if(Vt(""),f.action==="use"){const y=S(f.id);if(!y)return;if(!D.profUsable(y)){Fe("这张档案没有出生时刻，先补上时刻再存一次。");return}Re="",Ua(D.profilesTouch(y.id)),fi(y),ve(y.kind,{date:y.date,time:y.hourUnknown?"12:00":y.time},void 0,{gender:y.gender||void 0,address:y.address,hourUnknown:!!y.hourUnknown});return}if(f.action==="edit"){const y=S(f.id);if(!y)return;fi(y),Re=y.label,Za(y.id);return}if(f.action==="cancel"){Re="",Za(null);return}if(f.action==="pin"){Ua(D.profilesPin(f.id));return}if(f.action==="del"){if(Yt!==f.id){Vt(f.id);return}Ua(D.profilesRemove(f.id)),za===f.id&&(Re="",Za(null)),Fe("已从本机删除这张档案卡（不影响已经排出来的盘）。");return}if(f.action==="put"){const y=za,te=D.profFromForm({kind:r,date:E,time:ae,hourUnknown:ce,gender:a,address:I},_?_.value:Re,za||void 0);if(!te){Fe("先填好出生日期（和时刻），再存档案。");return}const je=D.profilesPut(te);if(!je.ok){Fe("档案没能存进本机（存储被禁用或已满），排盘不受影响。");return}Ua(je.list),Re="",Za(null),_&&(_.value=""),Fe(`${y?"已更新档案":"已存入我的命盘"}「${je.item.label}」。`)}},jn=t=>{const f=t.target&&t.target.closest?t.target.closest(".mp-prof-name"):null;f&&(Re=f.value)},qn=t=>{const f=K.formOf?K.formOf(t):null;if(!f){ve("ziwei");return}const S=De.some(je=>je.k===f.tab)?f.tab:"ziwei",_={date:f.date||E,time:f.time||ae},y=f.lines===void 0?void 0:Array.isArray(f.lines)?f.lines.join(" "):String(f.lines);f.date&&ee(f.date),f.time&&ne(f.time),f.gender&&le(f.gender),typeof f.address=="string"&&pe(f.address),typeof f.trueSolar=="boolean"&&oa(f.trueSolar),typeof f.lateZi=="boolean"&&ra(f.lateZi),y!==void 0&&Y(y),f.question&&yt(f.question),o(S);const te=K.restNote?K.restNote(f):"";fe(`已按深链还原：${t.label}${f.question?`｜${f.question}`:""}${te?`　${te}`:""}`),ve(S,_,void 0,{gender:f.gender,address:f.address,trueSolar:f.trueSolar,lateZi:f.lateZi,lines:y,question:f.question})};fa(()=>{let t=!1;const f=Oe;return(async()=>{let S=null;try{await rt("bazi");const _=typeof location<"u"?String(location.href):"";_&&_.indexOf("mp=")>=0&&window.Engine&&window.Engine.parseAskLink&&(S=window.Engine.parseAskLink(_))}catch{S=null}if(!(t||Oe!==f)){if(S&&S.ok)try{qn(S);return}catch{}ve("ziwei")}})(),()=>{t=!0}},[]),fa(()=>{if(!ht)return;const t=ht.kind;Zt(null),ve(t)},[ht]),fa(()=>{const t=f=>{if(f.key!=="Escape")return;const S=document.getElementById("mp-trace-layer");S&&S.classList.contains("open")&&ci()};return document.addEventListener("keydown",t),()=>document.removeEventListener("keydown",t)},[]);const xi=(bt||[]).filter(t=>t&&De.some(f=>f.k===t.tab)).slice(0,_t),Nn=t=>(De.find(f=>f.k===t)||{}).label||t,Mn=({k:t,label:f,tip:S,wide:_})=>p("button",{key:t,type:"button",className:"mp-tool"+(_?" wide":"")+(r===t?" on":""),"data-tab":t,onClick:()=>kt(t)},p("b",null,f),p("span",null,S)),Sn=[p("div",{key:"profiles",className:"mp-profwrap",onClick:zn,onInput:jn,dangerouslySetInnerHTML:{__html:D.profilesHTML(Kt,{editingId:za,armedDel:Yt,bar:kn.indexOf(r)>=0?D.profilesBarHTML({editingId:za,name:Re}):""})}}),p("section",{key:"start",className:"mp-start","aria-label":"选择要算的事"},p("div",{className:"mp-start-top"},p("div",{className:"mp-recent",hidden:xi.length===0},p("span",{className:"mp-recent-lbl"},"最近用过"),p("span",{className:"mp-recent-list"},xi.map(t=>p("button",{key:t.tab,type:"button",className:"mp-rc",onClick:()=>kt(t.tab)},Nn(t.tab),p("i",null,_i(t.at)))))),p("div",{className:"mp-viewsw",role:"group","aria-label":"首屏视图"},p("button",{type:"button",className:Le==="group"?"on":"","aria-pressed":Le==="group"?"true":"false",onClick:()=>ri("group")},"分组"),p("button",{type:"button",className:Le==="flat"?"on":"","aria-pressed":Le==="flat"?"true":"false",onClick:()=>ri("flat")},"平铺"))),Le==="group"?p("div",{className:"mp-groups"},Hi.map(t=>{const f=!!Gi[t.title],S=Math.max(0,t.items.length-4);return p("section",{key:t.title,className:"mp-tgroup"+(f?" open":"")},p("div",{className:"mp-tgroup-head"},p("h2",null,t.title),p("p",null,t.hint)),p("div",{className:"mp-ttools"},t.items.map(Mn),S>0?p("button",{key:"more",type:"button",className:"mp-tmore","aria-expanded":f?"true":"false",onClick:()=>Ui(_=>Object.assign({},_,{[t.title]:!f}))},f?"收起":`还有 ${S} 个`):null))})):null),p("div",{key:"tabs",className:"mp-tabs"+(Le==="flat"?"":" hide"),role:"tablist","aria-label":"命理体系"},De.map(t=>p("button",{key:t.k,role:"tab","aria-selected":r===t.k?"true":"false",tabIndex:r===t.k?0:-1,className:"mp-tab"+(r===t.k?" on":""),onClick:()=>kt(t.k)},t.label))),p("div",{key:"head",className:"mp-panel"},p("div",{className:"mp-row"},si?X(ja?"出生日期（公历）":Se==="date"?"日期（公历）":"起卦日期（公历）",p("input",{className:"mp-input",type:"date",value:E,onChange:t=>Qi(t.target.value)})):null,oi?X(ja?"出生时刻":"起卦时刻",p("input",{className:"mp-input",type:"time",value:ae,disabled:ce&&(r==="bazi"||r==="trend"),onChange:t=>en(t.target.value)})):null,r==="bazi"||r==="trend"?p("label",{className:"mp-chk",title:"不知道出生时辰时勾这里：不排时柱，起运按日估算，结果首行会写明"},p("input",{type:"checkbox",checked:ce,onChange:t=>re(t.target.checked)})," 时辰未知"):null,ja?X("性别",p("select",{className:"mp-input",value:a,onChange:t=>le(t.target.value)},p("option",{value:"female"},"女"),p("option",{value:"male"},"男"))):null,ja?X("出生地（省/市即可）",p("input",{className:"mp-input",placeholder:"如 河北石家庄 / 成都",value:I,onChange:t=>pe(t.target.value)})):null,r==="bazi"||r==="ziwei"?p("label",{className:"mp-field mp-checks"},p("input",{type:"checkbox",checked:va,onChange:t=>ft(t.target.checked)}),p("span",{className:"mp-lbl"},"八字 × 紫微 交叉验证")):null,r==="hepan"?X("对方出生日期",p("input",{className:"mp-input",type:"date",value:me,onChange:t=>ye(t.target.value)})):null,r==="hepan"?X("对方出生时刻",p("input",{className:"mp-input",type:"time",value:W,onChange:t=>J(t.target.value)})):null,r==="hepan"?X("对方性别",p("select",{className:"mp-input",value:B,onChange:t=>U(t.target.value)},p("option",{value:"female"},"女"),p("option",{value:"male"},"男"))):null,r==="hepan"?X("合盘方式",p("div",{className:"mp-seg"},p("button",{className:sa==="bazi"?"on":"",onClick:()=>Ye("bazi")},"八字"),p("button",{className:sa==="ziwei"?"on":"",onClick:()=>Ye("ziwei")},"紫微"))):null,r==="hepan"?X("对方出生地（可空）",p("input",{className:"mp-input",placeholder:"如 四川成都",value:ge,onChange:t=>xa(t.target.value)})):null,r==="hepan"?p("label",{className:"mp-field mp-checks"},p("input",{type:"checkbox",checked:Ce,onChange:t=>ba(t.target.checked)}),p("span",{className:"mp-lbl"},"三方合盘（加入第三人）")):null,r==="hepan"&&Ce?X("第三方出生日期",p("input",{className:"mp-input",type:"date",value:Ve,onChange:t=>Aa(t.target.value)})):null,r==="hepan"&&Ce?X("第三方出生时刻",p("input",{className:"mp-input",type:"time",value:Ta,onChange:t=>Ca(t.target.value)})):null,r==="hepan"&&Ce?X("第三方性别",p("select",{className:"mp-input",value:Ha,onChange:t=>_a(t.target.value)},p("option",{value:"female"},"女"),p("option",{value:"male"},"男"))):null,r==="hepan"&&Ce?X("第三方出生地（可空）",p("input",{className:"mp-input",placeholder:"如 广东广州",value:ha,onChange:t=>mt(t.target.value)})):null,r==="qimen"?p("fieldset",{key:"qmr",className:"mp-qmrule"},p("legend",{className:"mp-lbl"},"换局规则"),p("div",{className:"mp-qmopts",role:"radiogroup","aria-label":"奇门换局规则"},[["chaibu","拆补"],["chaoshen","超神接气"],["zhirun","置闰"]].map(([t,f])=>p("label",{key:t,className:"mp-qmopt"},p("input",{type:"radio",name:"qimen_rule",value:t,checked:Ea===t,onChange:()=>ut(t)}),p("span",null,f)))),p("div",{className:"mp-field"},p("span",{className:"mp-lbl"},"晚子时"),p("select",{className:"mp-input",value:Fa,onChange:t=>gt(t.target.value)},p("option",{value:"same-day"},"23:00 后归当日"),p("option",{value:"next-day"},"23:00 后归次日"))),p("details",{className:"mp-qmhelp"},p("summary",null,"三种规则有什么区别？"),p("p",null,"决定符头与节气如何对齐、是否插入闰局；同一个时刻在不同规则下可能得到不同局数。默认「拆补」与工具层一致。"))):null,Te(r)||r==="qimen"?X(r==="qimen"?"询问方向（定用神）":"询问方向",p("select",{className:"mp-input",value:aa,onChange:t=>{Jt(t.target.value),mi(t.target.value)}},(K.DIRECTIONS||[]).map(t=>p("option",{key:t.key,value:t.key},t.label)))):null,r==="tarot"?X("张数",p("select",{className:"mp-input",value:vt,onChange:t=>Wt(t.target.value)},p("option",{value:"1"},"1 张 · 指引"),p("option",{value:"3"},"3 张 · 过去现在未来"),p("option",{value:"5"},"5 张 · 十字牌阵"))):null,r==="liuyao"?X("六爻（可空）",p("input",{className:"mp-input",placeholder:"空则随机，如 9 7 8 8 7 6",value:V,onChange:t=>Y(t.target.value)})):null,r==="meihua"?X("起卦方式",p("div",{className:"mp-seg"},p("button",{className:Ue==="time"?"on":"",onClick:()=>li("time")},"时间"),p("button",{className:Ue==="number"?"on":"",onClick:()=>li("number")},"数字"))):null,r==="meihua"&&Ue==="number"?X("第一个数",p("input",{className:"mp-input",value:Xa,placeholder:"如 17",onChange:t=>ai(t.target.value)})):null,r==="meihua"&&Ue==="number"?X("第二个数",p("input",{className:"mp-input",value:Wa,placeholder:"如 29",onChange:t=>ti(t.target.value)})):null,r==="meihua"&&Ue==="number"?X("动爻（可空）",p("input",{className:"mp-input",value:Ja,placeholder:"1-6",onChange:t=>ii(t.target.value)})):null,r==="zeri"?X("所办事项",p("select",{className:"mp-input",value:Qe,onChange:t=>$a(t.target.value)},[["常用",["嫁娶","搬家入宅","出行","开业","签订合同","祭祀"]],["婚嫁",["嫁娶","订婚","领证","提亲","收送聘金","满月酒"]],["生活",["搬家","入宅","旅行","访亲友","入学","求医","祭祀"]],["建造",["动土","装修","装修建造","安葬","试车买车"]],["工商",["开业","交易","投资","签订合同","签约","纳财","赴任"]]].map(([t,f])=>p("optgroup",{key:t,label:t},f.map(S=>p("option",{key:`${t}-${S}`,value:S},S)))))):null,r==="convert"?X("转换方向",p("div",{className:"mp-seg"},p("button",{className:i==="solar2lunar"?"on":"",onClick:()=>s("solar2lunar")},"公历 → 农历"),p("button",{className:i==="lunar2solar"?"on":"",onClick:()=>s("lunar2solar")},"农历 → 公历"))):null,r==="convert"&&i==="lunar2solar"?X("农历日期",p("input",{className:"mp-input",value:d,placeholder:"如 2026-9-17",onChange:t=>n(t.target.value)})):null,r==="convert"&&i==="lunar2solar"?p("label",{className:"mp-check"},p("input",{type:"checkbox",checked:c,onChange:t=>l(t.target.checked)})," 闰月"):null,r==="zeri"?X("看多少天",p("input",{className:"mp-input",type:"number",min:1,max:60,value:da,onChange:t=>Ba(t.target.value)})):null,r==="zeri"?X("候选日（可空，只比这几天）",p("input",{className:"mp-input",placeholder:"如 2026-12-01, 2026-12-08, 2026-12-15",value:Ga,onChange:t=>e(t.target.value)})):null,r==="zeri"?X("当事人属相（可空）",p("select",{className:"mp-input",value:wa,onChange:t=>xt(t.target.value)},p("option",{value:""},"不排除"),["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"].map(t=>p("option",{key:t,value:t},t)))):null,r==="xiaoliuren"?X("起课方式",p("div",{className:"mp-seg"},p("button",{className:u==="time"?"on":"",onClick:()=>g("time")},"时间"),p("button",{className:u==="number"?"on":"",onClick:()=>g("number")},"报数"))):null,r==="xiaoliuren"&&u==="number"?X("第一个数",p("input",{className:"mp-input",type:"number",min:1,max:99,value:b,onChange:t=>h(t.target.value)})):null,r==="xiaoliuren"&&u==="number"?X("第二个数",p("input",{className:"mp-input",type:"number",min:1,max:99,value:T,onChange:t=>j(t.target.value)})):null,r==="xiaoliuren"&&u==="number"?X("第三个数",p("input",{className:"mp-input",type:"number",min:1,max:99,value:k,onChange:t=>q(t.target.value)})):null,r==="mbti"?p("div",{className:"mp-quiz-wrap"},p("div",{className:"mp-lbl"},"十六型人格问卷 · 4 题一页，按 1（完全不像）到 5（很像我）打分"),p(Ai,{answers:C,page:P,onPick:(t,f)=>Q(S=>{const _=S.slice();return _[t]=f,_}),onPage:t=>$(f=>Math.max(0,Math.min(f+t,Math.max(0,Math.ceil(La().total/Ma)-1)))),onSubmit:pi,onClear:()=>{Q(new Array(La().total).fill(null)),$(0),A(null)}})):null,r==="trend"?X("算到几岁",p("input",{className:"mp-input",type:"number",min:10,max:100,value:N,onChange:t=>Z(t.target.value)})):null,r==="fengshui"?X("看什么",p("div",{className:"mp-seg"},p("button",{className:F==="natal"?"on":"",onClick:()=>L("natal")},"命卦"),p("button",{className:F==="advise"?"on":"",onClick:()=>L("advise")},"门主灶"),p("button",{className:F==="xuankong"?"on":"",onClick:()=>L("xuankong")},"玄空"))):null,r==="fengshui"&&F!=="natal"?X("坐山（24 山）",p("input",{className:"mp-input",value:G,placeholder:"如 子 / 乾",onChange:t=>oe(t.target.value)})):null,r==="fengshui"&&F!=="natal"?X("朝向（24 山）",p("input",{className:"mp-input",value:se,placeholder:"如 午 / 巽",onChange:t=>ue(t.target.value)})):null,r==="fengshui"&&F==="xuankong"?X("运（1–9）",p("input",{className:"mp-input",type:"number",min:1,max:9,value:x,onChange:t=>R(t.target.value)})):null,r==="name"?X("看什么",p("div",{className:"mp-seg"},p("button",{className:xe==="assess"?"on":"",onClick:()=>Ne("assess")},"评名字"),p("button",{className:xe==="generate"?"on":"",onClick:()=>Ne("generate")},"生成候选"))):null,r==="name"?X("姓",p("input",{className:"mp-input",value:we,placeholder:"如 李",onChange:t=>He(t.target.value)})):null,r==="name"&&xe==="assess"?X("名字",p("input",{className:"mp-input",value:_e,placeholder:"如 沐宸",onChange:t=>ea(t.target.value)})):null,r==="name"&&xe==="generate"?X("候选个数",p("input",{className:"mp-input",type:"number",min:1,max:20,value:Me,onChange:t=>H(t.target.value)})):null),ja?p("div",{className:"mp-checks"},p("label",{title:"按出生地经度把钟表时间换算成真太阳时"},p("input",{type:"checkbox",checked:Xe,onChange:t=>oa(t.target.checked)}),"真太阳时"),p("label",{title:"23:00–23:59 出生时：勾选=按次日日柱起时柱；不勾=仍用当日日柱"},p("input",{type:"checkbox",checked:Ie,onChange:t=>ra(t.target.checked)}),"晚子时换日"),p("label",{title:"开启后会请求 OpenStreetMap，把区县/村落到更精确的坐标"},p("input",{type:"checkbox",checked:m,onChange:t=>w(t.target.checked)}),"联网精确到区县")):null,Te(r)?p("div",{className:"mp-askblock"},p("span",{className:"mp-lbl"},"所问之事（必填）"),p("textarea",{className:"mp-textarea"+(Yi?" invalid":""),rows:2,value:ca,placeholder:"用一句话描述所问之事，例如：今年是否适合换工作？",onChange:t=>{yt(t.target.value),Va(!1)},onBlur:t=>mi(void 0,t.target.value)})):null,r==="mbti"?null:p("div",{key:"actions",className:"mp-actions"},p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginRight:8},onClick:an,title:"用固定示例盘看完整报告（不改动你已填的数据）"},"看示例"),p("button",{className:"mp-btn",onClick:pi,title:"时间仍为自动时，点它会取当下再起卦"},r==="tarot"?"抽牌":r==="bazi"||r==="ziwei"?"排盘":r==="hepan"?"合盘":r==="qimen"?"起局":pt.indexOf(r)>=0?"看结果":"起卦"))),p("div",{key:"hint",className:"mp-hint"},Xi.hint),he.length?p("div",{key:"hist",className:"mp-hist"},p("div",{className:"mp-hist-h"},p("span",null,"最近排过"),p("button",{className:"mp-hist-clear",onClick:wn},"清空")),p("div",{className:"mp-hist-list"},he.map((t,f)=>p("button",{key:f,className:"mp-hist-item",title:`${t.date} ${t.time}`,onClick:()=>$n(t)},p("b",null,(De.find(S=>S.k===t.kind)||{}).label||t.kind),p("span",null,t.label||"—"),p("i",null,`${t.date.slice(5)} ${t.time}`))))):null,Se==="cast"&&ni?p("div",{key:"auto",className:"mp-auto"},wt.cast?`起卦时刻用的是你手动填的（${ae}）；想跟随当下，把时间改回或清空即可。`:`起卦时刻已自动取本机时间（${ae}），每次点起卦都会重新取当下；想固定时刻就在上面改。`):null,Ka?p("div",{key:"err",className:"mp-err",role:"alert"},Ka):null,Xt?p("div",{key:"ntc",className:"mp-note",role:"status"},Xt):null,Zi?p("div",{key:"load",className:"mp-note",role:"status"},"正在加载本页需要的引擎…"):null,!v&&!Ka?p("div",{key:"empty",className:"mp-empty"},p("b",null,r==="ziwei"||r==="bazi"?"填好出生信息，点「排盘」":r==="tarot"?"写下想问的事，点「抽牌」":r==="mbti"?"按 1–5 给题目打分，答满 12 题就能看结果":pt.indexOf(r)>=0?"填好参数，点「看结果」":"写下所问之事，点「起卦」"),r==="ziwei"||r==="bazi"?"出生日期、时刻与性别即可；出生地只影响真太阳时。":r==="mbti"?"4 题一页，答案只在本地参与计算，不会上传。":pt.indexOf(r)>=0?"按上面的选项填好参数即可；全部在本机计算，不上传。":"起卦时刻已自动取当下，也可以手动改。"):null,v?p("div",{key:"card",className:"mp-card mp-flat",role:"region","aria-label":"排盘结果","aria-live":"polite",onClick:mn,dangerouslySetInnerHTML:{__html:un(v)+D.perfHTML(de)+D.revisionHTML(v.r.revision)+D.handleHTML(v.r.handle)+D.shadowHTML(v.r.shadow,v.shadowDiff)+D.traceHTML(v.r.trace,v.r.system,v.r.traceText)+D.resultWithInterpret(v.kind==="ziwei"?D.ziweiHTML(v.r):v.kind==="bazi"?D.baziHTML(v.r)+(v.trend?D.trendHTML(v.trend,{brief:!1}):""):v.kind==="meihua"?D.meihuaHTML(v.r):v.kind==="daliuren"?D.daliurenHTML(v.r):v.kind==="qimen"?D.qimenHTML(v.r)+D.qimenFactsHTML(v.r):v.kind==="hepan"?v.r.chart==="ziwei"?D.ziweiHepanHTML(v.r):D.hepanHTML(v.r):v.kind==="tarot"?D.tarotHTML(v.r):v.kind==="liuyao"?D.liuyaoHTML(v.r):v.kind==="chenggu"?D.chengguHTML(v.r):v.kind==="almanac"?D.almanacHTML(v.r):v.kind==="zeri"?D.zeriHTML(v.r):v.kind==="trend"?D.trendHTML(v.r):v.kind==="name"?D.nameHTML(v.r):v.kind==="mbti"?D.mbtiHTML(v.r):v.kind==="fengshui"?D.fengshuiHTML(v.r):D.quickHTML(v.r),v.it,{folded:nn()})+D.caliberHTML(v.caliber)}}):null,v?p("div",{key:"bar",className:"mp-bar"},p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px"},onClick:gn},Vi||"复制文字结果"),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:bn,title:"导出盘面 + 解析（含一页读懂、三张表）为 Markdown"},"导出 .md"),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:hn,title:"生成 PNG 摘要卡（一页读懂 + 首张表），适合直接分享"},"存为摘要长图")):null,v?p("div",{key:"ask",className:"mp-askbox",style:{flexWrap:"wrap"}},p("input",{className:"mp-input",value:$e,maxLength:120,placeholder:"追问：如 2027 年事业怎么样（回车提交）",onChange:t=>pa(t.target.value),onKeyDown:t=>{t.key==="Enter"&&ui()}}),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px"},onClick:ui},"追问"),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:xn,title:"把这张盘的摘要和你的问题一起发进 DSH 对话窗，由对话里的模型接着答"},"问进对话"),ie.ref?null:p("div",{key:"bridgediag",className:"mp-note",style:{marginTop:6,fontSize:11,flexBasis:"100%"}},Pt()),Oa?p("div",{key:"chatnote",className:"mp-note",style:{marginTop:6,fontSize:12,flexBasis:"100%"}},Oa):null):null,v?p("div",{key:"bridge",className:"mp-bridge"},p("span",{className:"mp-bridge-lbl"},ie.ref?"桥可用；也可以：":"桥未就绪，改走这几档："),di.map(([t,f,S])=>p("button",{key:t,type:"button",className:"mp-chip","data-bridge-copy":t,title:S,onClick:_=>dn(t,_.currentTarget)},f))):null,Pa?p("div",{key:"fx",className:"mp-fx",dangerouslySetInnerHTML:{__html:D.followupHTML(Pa)}}):null,v&&v.kind==="bazi"&&v.r.past?p("div",{key:"verify",className:"mp-verify"},p("div",{className:"mp-verify-h"},"验前事 · 过去几年的信号（只读，不改盘）"),v.r.past.rows.map(t=>p("div",{key:t.year,className:"mp-verify-row"},p("span",{className:"mp-verify-txt"},`${t.year} ${t.ganzhi} · ${t.theme}`),p("span",{className:"mp-verify-btns"},["yes","no","unsure"].map(f=>p("button",{key:f,className:"mp-chip"+(la[t.year]===f?" on":""),onClick:()=>Da(Object.assign({},la,{[t.year]:f}))},f==="yes"?"准":f==="no"?"不准":"不确定"))))),p("div",{className:"mp-verify-foot"},p("button",{className:"mp-btn ghost",style:gi,onClick:vn},"算贴合度"),We?p("span",{className:"mp-verify-fit"},`命中 ${We.yes}/${We.answered}（${We.level}）：${We.advice}`):null)):null,v&&v.kind==="bazi"?p("div",{key:"rect",className:"mp-rect"},p("div",{className:"mp-verify-h"},"生时校正 · 用过去的事反推时辰"),Je.map((t,f)=>p("div",{key:f,className:"mp-rect-row"},p("input",{className:"mp-input",type:"number",min:1900,max:2100,value:t.year,onChange:S=>Ia(Je.map((_,y)=>y===f?Object.assign({},_,{year:S.target.value}):_))}),p("select",{className:"mp-input",value:t.kind,onChange:S=>Ia(Je.map((_,y)=>y===f?Object.assign({},_,{kind:S.target.value}):_))},[["career","事业变动"],["wealth","财运"],["love","感情"],["move","搬迁/出行"],["health","健康"],["other","其他"]].map(([S,_])=>p("option",{key:S,value:S},_))))),p("button",{className:"mp-btn ghost",style:gi,onClick:yn},"计算候选时辰"),Be?Be.error?p("div",{className:"mp-rect-err"},Be.error):p("div",{className:"mp-rect-out"},p("div",{className:"mp-verify-fit"},Be.note),Be.candidates.slice(0,6).map(t=>p("div",{key:t.hour,className:"mp-rect-cand"+(t===Be.best?" best":"")},`${t.label} · 时柱 ${t.hourGanzhi} · 日柱 ${t.dayGanzhi} · 命中 ${t.hits}/${t.total}`))):null):null,!v&&!Ka?p("div",{key:"ph",className:"mp-dim",style:{marginTop:24,fontSize:12}},"选择体系后点「排盘」。所有计算在本机完成，不上传任何数据。"):null];return p("div",{className:"mp-wrap"},Sn)}function Di(r){try{if(typeof styles<"u"&&styles&&typeof styles.insert=="function")return styles.insert(r)}catch(o){console.error("[metaphysics] styles.insert 不可用，改用 DOM 注入",o)}try{const o=document.createElement("style");return o.setAttribute("data-plugin","@local/metaphysics"),o.textContent=r,document.head.appendChild(o),()=>o.remove()}catch(o){return console.error("[metaphysics] DOM 注入样式也失败",o),()=>{}}}let Ut=!1;function ct(){try{const r=document.documentElement;if(!r||!document.body)return;const o=document.createElement("span");o.setAttribute("aria-hidden","true"),o.style.cssText="position:absolute;left:-9999px;top:0;width:0;height:0;pointer-events:none;background:var(--dsw-alias-brand-primary)",document.body.appendChild(o);const E=getComputedStyle(o).backgroundColor;o.remove();const ee=ke&&typeof ke.pickOnColor=="function"?ke.pickOnColor(E):"";ee&&r.style&&r.style.getPropertyValue("--mp-on-brand")!==ee&&r.style.setProperty("--mp-on-brand",ee)}catch{}}function Ri(){if(!Ut){Ut=!0,ct();try{const r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)");r&&typeof r.addEventListener=="function"&&r.addEventListener("change",ct)}catch{}try{typeof MutationObserver=="function"&&document.documentElement&&new MutationObserver(ct).observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]})}catch{}}}function Ii(r){try{const I=Di(Li+(D&&D.CSS?D.CSS:""));typeof r.effect=="function"&&typeof I=="function"&&r.effect(()=>I)}catch(I){console.error("[metaphysics] 样式注入失败",I)}try{Ri()}catch(I){console.error("[metaphysics] 字色同步失败",I)}let o=null;try{o=r&&r.slots||(r&&typeof r.get=="function"?r.get("slots"):null)}catch(I){console.error("[metaphysics] 取 slots 服务失败",I)}if(!o||typeof o.register!="function"){console.error("[metaphysics] slots 服务不可用，面板未注册");return}try{ie.injectType=typeof o.inject;const I=typeof o.spec=="function"?o.spec("conversation.input.right"):null;ie.spec=I?I.kind+"/"+I.scope:"未声明"}catch(I){ie.spec="取声明失败",Dt(I)}const E=(I,pe)=>{try{const me=o.register(I,pe);return ie.regs+=1,ie.seatOk[I.name]=!0,me}catch(me){return Dt(me),null}},ee=(I,pe)=>{try{typeof o.inject=="function"?o.inject(I,pe):pe()}catch(me){console.error("[metaphysics] 等待槽位失败："+I,me);try{pe()}catch(ye){console.error("[metaphysics] 直接注册也失败："+I,ye)}}};ee("sidebar.panellist",()=>E({name:"sidebar.panellist",id:"metaphysics",order:20,label:()=>"命理 v"+(window.__MP_VER||"")},Ci)),ee("main",()=>E({name:"main",key:"metaphysics"},I=>p(Ti,null,p(Pi,I))));const ae=(I,pe)=>{const me=()=>{try{o.inject(I,pe)}catch(ye){console.error("[metaphysics] 槽位注册失败："+I,ye);try{pe()}catch(W){console.error("[metaphysics] 直接注册也失败："+I,W)}}};try{typeof r.effect=="function"?r.effect(me,"metaphysics: "+I):me()}catch(ye){console.error("[metaphysics] effect 包裹失败："+I,ye),me()}};ae("conversation.input.right",()=>E({name:"conversation.input.right",id:"metaphysics-ask",order:40},It)),ae("conversation.composer.dock",()=>E({name:"conversation.composer.dock",id:"metaphysics-dock",order:60},Bt));let ne=0;const ce=()=>{if(ie.ref)return;ne+=1;const I="-"+ne;ie.seatOk["conversation.input.right"]||E({name:"conversation.input.right",id:"metaphysics-ask"+I,order:40},It),ie.seatOk["conversation.composer.dock"]||E({name:"conversation.composer.dock",id:"metaphysics-dock"+I,order:60},Bt)};let re=20;const a=()=>ie.seatOk["conversation.input.right"]&&ie.seatOk["conversation.composer.dock"],le=()=>{ie.ref||re<=0||a()||(re-=1,ce(),!a()&&setTimeout(le,700))};try{setTimeout(le,700)}catch{}try{document.addEventListener("pointerdown",()=>ce(),{once:!0,capture:!0})}catch{}}return{inject:["slots"],apply(r){try{Ii(r)}catch(o){console.error("[metaphysics] apply 异常",o)}}}}});
