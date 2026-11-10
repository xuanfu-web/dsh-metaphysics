window.__ModuleLoader__.load({id:"dsh-metaphysics",version:"0.62.5",factory(Gt){const At=(function(){try{return Gt("react")}catch{return globalThis.React}})();if(!At)return{inject:[],apply(){}};const l=At.createElement,Aa={bazi:"client.chart.js",ziwei:"client.chart.js",hepan:"client.chart.js",trend:"client.chart.js",name:"client.name.js",fengshui:"client.fengshui.js",liuyao:"client.liuyao.js",meihua:"client.liuyao.js",qimen:"client.qimen.js",daliuren:"client.daliuren.js",tarot:"client.tarot.js",almanac:"client.almanac.js",convert:"client.convert.js",zeri:"client.zeri.js",chenggu:"client.chenggu.js",xiaoliuren:"client.xiaoliuren.js",star:"client.star.js",numerology:"client.numerology.js",mbti:"client.mbti.js"},Ta=[{key:"general",label:"综合",dim:null,focus:""},{key:"wealth",label:"财运",dim:"work",focus:"钱财进出的落点主要看「工作与职业选择」与「事业发展」这两条。"},{key:"career",label:"事业",dim:"career",focus:"事业发展这条与你的问题最直接。"},{key:"love",label:"感情",dim:"love",focus:"感情这条与你的问题最直接。"},{key:"health",label:"健康",dim:"health",focus:"健康这条与你的问题最直接；下面只作提醒，不作任何诊断。"},{key:"study",label:"学业",dim:"career",focus:"学业与考试更贴近「事业发展」这条，讲的是长期积累与阶段进展。"},{key:"travel",label:"出行",dim:"overall",focus:"出行与迁动更贴近「整体运势」这条，看的是当下这一段的大环境。"}];window.__MP_VER="0.62.5",window.__MPGroups=[{title:"问一件事",hint:"心里有一件具体的事，起一卦再决定",items:[{k:"liuyao",label:"六爻",tip:"摇六次，问一件事"},{k:"meihua",label:"梅花",tip:"见闻起卦，看当下"},{k:"tarot",label:"塔罗",tip:"抽牌，看关系与选择"},{k:"qimen",label:"奇门",tip:"看方位、时机与取舍"},{k:"daliuren",label:"六壬",tip:"占事，断来意与结果"},{k:"xiaoliuren",label:"小六壬",tip:"掐指一算，快速断"}]},{title:"看一个人",hint:"看自己或身边人的性情、格局与运程",items:[{k:"bazi",label:"八字",tip:"四柱看一生格局"},{k:"ziwei",label:"紫微",tip:"十二宫细看"},{k:"hepan",label:"合盘",tip:"两个人合不合"},{k:"mbti",label:"人格",tip:"16 型性格问卷"},{k:"chenggu",label:"称骨",tip:"按生辰称命重"},{k:"numerology",label:"数字",tip:"生日数字看性格"},{k:"trend",label:"人生K",tip:"一生高低走势",wide:!0}]},{title:"查日子",hint:"挑时间、换农历，顺带看看家里和名字",items:[{k:"almanac",label:"黄历",tip:"今天宜忌、时辰吉凶"},{k:"zeri",label:"择日",tip:"挑个办事的好日子"},{k:"convert",label:"农历",tip:"公历农历互转"},{k:"star",label:"星座",tip:"星座性格与今日运"},{k:"fengshui",label:"风水",tip:"房屋朝向与布置"},{k:"name",label:"起名",tip:"按八字选字"}]}],window.__MP_UNRELEASED=["根因：`slots.register` 实测返回对象，不是函数","修法","第二处缺陷：补注册与正式注册撞 id","第三处缺陷：补注册换新 id 会长出多个 chip","`sessionSeat` 的 run 现在透传返回值","自检文案去掉技术词","测试补了三条能守住根因的断言","边界（必须说明）","命盘四 tab 合并：18 块 → 15 块，分块合计 gzip 2.56MB → 1.89MB","这不是「抽共享块」","单块预算不用动","尺寸底线改成与声明同源","懒加载器的兜底改指 chart","测试补了「只下载一次」这条真断言","验证","顺带修的引用","八大地支结构接进四处，并说清与旺衰分的关系","三柱模式不把占位时支冒充实有","暗合接进三处，并明确「另列不并」","起运岁精确值接进三处","旧结果兼容","验证","一处已知的取舍（已随 D1+ 解决）"];const Z={};Z.DIRECTIONS=Ta,Z.compute=()=>{throw new Error("命理引擎尚未加载")};const La=Object.create(null),ga=Object.create(null);function Li(n){return Aa[n]||Aa.bazi||"client.chart.js"}const Ca=()=>typeof performance<"u"&&performance.now?performance.now():Date.now();async function Ci(n){const s=Li(n);let k=La[s];const O=!!k,V=Ca();if(!k){if(!Gt||typeof Gt.async!="function")throw new Error("当前宿主不支持客户端分块加载（require.async 缺失），请升级 DeepSeek Harness");let ie=ga[s];ie||(ie=Gt.async(`./${s}`).then(se=>{const re=se&&(se.Engine||se.default);if(!re||typeof re.compute!="function")throw new Error(`命理引擎分块 ${s} 未返回 Engine`);return La[s]=re,re}),ga[s]=ie,ie.catch(()=>{}).then(()=>{delete ga[s]})),k=await ie}for(const ie of Object.keys(k))k[ie]!==void 0&&(Z[ie]=k[ie]);return Array.isArray(Z.DIRECTIONS)||(Z.DIRECTIONS=Ta),window.Engine=Z,window.__MP_ENGINE_READY__=!0,window.__MP_LAST_LOAD={tab:n,chunk:s,cached:O,ms:Math.round((Ca()-V)*10)/10},Z}window.__mpEnsureEngine=Ci,window.Engine=Z,(function(){const n={liuyao:!0,meihua:!0,daliuren:!0,tarot:!0},s=R=>!!n[R],k={general:"other",wealth:"business",career:"career",love:"love",health:"other",study:"career",travel:"action"},O=R=>k[R]||"other",V="#ffffff",ie="#1c1a15";function se(R){const B=String(R??"").match(/rgba?\(([^)]+)\)/i);if(!B)return null;const D=B[1].split(/[,\s/]+/).filter(Boolean).map(Number);return D.length<3||D.slice(0,3).some(U=>!Number.isFinite(U))||D.length>3&&Number.isFinite(D[3])&&D[3]<.95?null:[D[0],D[1],D[2]]}function re(R){const B=String(R||"").replace("#",""),D=B.length===3?B.split("").map(U=>U+U).join(""):B;return/^[0-9a-f]{6}$/i.test(D)?[0,2,4].map(U=>parseInt(D.slice(U,U+2),16)):null}function a(R){const B=D=>{const U=D/255;return U<=.03928?U/12.92:Math.pow((U+.055)/1.055,2.4)};return .2126*B(R[0])+.7152*B(R[1])+.0722*B(R[2])}function ge(R,B){const D=a(R),U=a(B),be=Math.max(D,U),vt=Math.min(D,U);return(be+.05)/(vt+.05)}function je(R){const B=typeof R=="string"?se(R):R;return B?ge(B,re(V))>=ge(B,re(ie))?V:ie:""}function F(R){const B=String(R??"").trim();if(!B)return{lines:null,warning:""};const D=B.split(/[^0-9]+/).filter(Boolean).map(Number),U=D.filter(be=>![6,7,8,9].includes(be));return D.length===6&&U.length===0?{lines:D,warning:""}:{lines:null,warning:D.length!==6?`爻值需要正好 6 个数字（当前 ${D.length} 个），本次按随机摇卦。`:`爻值只能是 6/7/8/9（收到 ${U.join("/")}），本次按随机摇卦。`}}function fe(R){const B=String(R??"").trim();if(!B)return null;const D=Number(B);return Number.isFinite(D)?D:null}function xe(R){const B=R instanceof Date?R:new Date,D=U=>String(U).padStart(2,"0");return`${B.getFullYear()}-${D(B.getMonth()+1)}-${D(B.getDate())}`}window.__MPCore={NEED_ASK:n,needAsk:s,parseLines:F,toNumber:fe,parseRGB:se,hexToRGB:re,luminance:a,contrastRatio:ge,pickOnColor:je,ON_DARK:V,ON_LIGHT:ie,kindOfDirection:O,todayStamp:xe}})(),(function(){const n=`
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
  --shadow:0 1px 2px rgba(35,28,18,.05),0 18px 40px -30px rgba(35,28,18,.42),
    /* 动效与圆角令牌：全站同一节奏（借鉴 wallpaper-engine 的 --we-dur/--we-ease 约定），
       reduced-motion 时整体关停，见文件尾的全局 @media。 */
    --dur:150ms;--dur-fast:100ms;--ease:cubic-bezier(.32,.72,.24,1);
    --r-sm:6px;--r-md:10px;--r-lg:14px;
    --glow:0 0 0 1px rgba(var(--lu-rgb),.25),0 0 12px rgba(var(--lu-rgb),.12)}
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
    --ink3:#8b8478;
    --dur:150ms;--dur-fast:100ms;--ease:cubic-bezier(.32,.72,.24,1);
    --r-sm:6px;--r-md:10px;--r-lg:14px;
    --glow:0 0 0 1px rgba(var(--lu-rgb),.3),0 0 14px rgba(var(--lu-rgb),.16);
    --shadow:0 1px 2px rgba(0,0,0,.5),0 18px 40px -30px rgba(0,0,0,.9)}
}
.pp *{box-sizing:border-box}
.pp-grid{display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,minmax(150px,auto));gap:0;border:1px solid var(--line)}
.pp-cell{border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:7px 8px;display:flex;flex-direction:column;position:relative;min-height:150px;background:var(--bg);
  transition:background var(--dur) var(--ease),box-shadow var(--dur) var(--ease)}
.pp-cell:hover,.pp-cell:focus-visible{background:var(--card);box-shadow:var(--glow);z-index:1}
/* 命宫：双环选中态（借鉴 wallpaper-engine 色板的「发丝内环 + accent 外环」，比裸描边读得清） */
.pp-soul{box-shadow:inset 0 0 0 2px rgba(var(--red-rgb),.35);background:linear-gradient(180deg,rgba(var(--red-rgb),.05),transparent 60%)}
.pp-soul:hover,.pp-soul:focus-visible{background:var(--card);box-shadow:inset 0 0 0 2px rgba(var(--red-rgb),.4),var(--glow)}
/* 右边框按「视觉列」去，不能按 nth-child：格子用 grid-column 绝对定位，DOM 顺序不等于列序 */
.pp-cell.pp-lastcol{border-right:none}
.pp-cell.pp-lastrow{border-bottom:none}
.pp-center{grid-column:2/4;grid-row:2/4;border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:16px 18px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;text-align:center;position:relative;
  background:var(--bg)}
.pp-center::before{content:"";position:absolute;inset:12px 16px;border:1px solid var(--hair);border-radius:var(--r-md);pointer-events:none}
.pp-center::after{content:"";position:absolute;inset:13px 17px;border:1px solid var(--line);border-radius:var(--r-md);opacity:.4;pointer-events:none}
.pp-center .ct-t1{font-size:17px;font-weight:700;letter-spacing:.05em;margin-bottom:6px}
.pp-center .ct-t2{font-size:12.5px;color:var(--ink)}
.pp-center .ct-t3{font-size:14px;letter-spacing:.35em;margin:6px 0;font-weight:600}
.pp-center .ct-t4{font-size:12.5px;color:var(--muted)}
.pp-stars{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:0 6px;font-size:13px;line-height:1.6;min-height:36px}
.pp-st{white-space:nowrap}
.pp-st.main{font-weight:700;font-size:13px;letter-spacing:.04em;text-shadow:0 0 .5px currentColor}
.pp-st.good{color:var(--lu)}
.pp-st.bad{color:var(--ji)}
.pp-st.bad::before{content:"·";font-weight:900;margin-right:1px}
.pp-st.aux{color:var(--muted);font-size:11.5px}
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
.pp-b{font-style:normal;font-size:10px;margin-left:3px;padding:0 3px;border-radius:999px;color:var(--muted);letter-spacing:0;opacity:.92;background:var(--band)}
.pp-b.good{color:var(--br-good)}
.pp-b.bad{color:var(--br-bad)}
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
/* 八大地支结构：与日主强弱并列的第二套口径，用中性色，不与主结论抢色 */
.pp-struct{margin-top:6px;font-size:12.5px;line-height:1.75;color:var(--ink2)}
.pp-struct .pp-st-code{font-weight:700;letter-spacing:.06em;color:var(--ink);margin-right:6px}
.pp-struct .pp-st-odd{color:var(--quan)}
.pp-anhe{margin-top:6px;font-size:12.5px;line-height:1.75;color:var(--ink2)}
.pp-anhe b{color:var(--muted);font-weight:400;margin-right:8px}
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
/* 杂曜全表：诀文整段默认折起来，点开才摊——一行一条，行高比正文松一点好对着盘看 */
.pp-zy{margin-top:6px;font-family:system-ui,sans-serif}
.pp-zy summary{font-size:12px;color:var(--label);cursor:pointer;list-style:none}
.pp-zy summary::-webkit-details-marker{display:none}
.pp-zy summary::before{content:'＋ ';color:var(--muted)}
.pp-zy[open] summary::before{content:'－ '}
.pp-zy-v{font-size:12px;line-height:1.85;color:var(--muted);margin-top:5px;padding-left:9px;border-left:2px solid var(--hair)}
.pp-zy-s{font-size:11.5px;line-height:1.7;color:var(--faint);margin-top:5px}
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
.mp-tt-en{font-size:11.5px;color:var(--muted);margin-top:-5px}
.mp-tt-img{font-size:12px;color:var(--muted);line-height:1.65}
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

/* 减少动态效果偏好：本面板所有过渡一律退化为即时（不覆盖用户系统设置） */
@media (prefers-reduced-motion: reduce){
  .pp *,.mp-it *,.mp-al *,.mp-btn,.mp-chip{transition:none!important;animation:none!important}
}
/* 大表行 hover：只提底色不加位移，行高稳定不被打断 */
.pp table tbody tr{transition:background var(--dur-fast) var(--ease)}
.pp table tbody tr:hover{background:var(--hover)}
/* 结果卡阴影分层：默认最轻，hover 时浮起一档（只对可交互的卡，避免整页抖动） */
.pp{transition:box-shadow var(--dur) var(--ease)}
`,s=window.__PP=window.__PP||{};s.CSS=n;const k={主星:"main",吉星:"good",煞星:"bad",辅星:"aux",杂曜:"aux"},O={禄:"lu",权:"quan",科:"ke",忌:"ji"},V={庙:"good",旺:"good",得:"mid",利:"mid",平:"mid",不:"bad",陷:"bad"},ie={巳:[1,1],午:[1,2],未:[1,3],申:[1,4],辰:[2,1],酉:[2,4],卯:[3,1],戌:[3,4],寅:[4,1],丑:[4,2],子:[4,3],亥:[4,4]},se={乾:[1,1,1],兑:[1,1,0],离:[1,0,1],震:[1,0,0],巽:[0,1,1],坎:[0,1,0],艮:[0,0,1],坤:[0,0,0]},re=["初爻","二爻","三爻","四爻","五爻","上爻"],a=e=>String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),ge=(e,i,p)=>{const x=Math.round(43),b=e?`<rect x="0" y="${2.5}" width="104" height="7" rx="${1.6}" fill="currentColor"/>`:`<rect x="0" y="${2.5}" width="${x}" height="7" rx="${1.6}" fill="currentColor"/><rect x="${x+18}" y="${2.5}" width="${104-x-18}" height="7" rx="${1.6}" fill="currentColor"/>`;return`<svg class="mp-hex${i?" hex-on":""}${p?" "+p:""}" viewBox="0 0 104 12" preserveAspectRatio="none" aria-hidden="true" focusable="false">${b}</svg>`},je={木:"M6 1.6V10.8M6 5.2 2.6 2.2M6 7.4 9.4 4.4",火:"M6 1.4C7.6 3.6 9.2 5.4 9.2 7.6A3.2 3.2 0 0 1 2.8 7.6C2.8 5.4 4.4 3.6 6 1.4Z",土:"M1.6 9.6h8.8M6 2.4v7.2M3.4 5.6h5.2",金:"M6 1.2 10.6 6 6 10.8 1.4 6Z",水:"M1.4 7.2C2.9 4.2 4.5 10.2 6 7.2 7.5 4.2 9.1 10.2 10.6 7.2"},F=e=>{const i=je[e];return i?`<svg class="mp-wxi" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="${i}" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`:""},fe=e=>`<svg class="mp-trig" viewBox="0 0 14 10" aria-hidden="true" focusable="false">${(se[e]||[0,0,0]).slice().reverse().map((d,o)=>{const u=o*4;return d?`<rect x="0" y="${u}" width="14" height="2" rx="0.6" fill="currentColor"/>`:`<rect x="0" y="${u}" width="5.6" height="2" rx="0.6" fill="currentColor"/><rect x="8.4" y="${u}" width="5.6" height="2" rx="0.6" fill="currentColor"/>`}).join("")}</svg>`;s._hexBar=ge,s._wxIcon=F,s._triGlyph=fe;function xe(e,i){return!e||!e.length?"":e.map(p=>{const d=k[p.type]||"aux",o=p.mutagen?`<i class="pp-m ${O[p.mutagen]}">${p.mutagen}</i>`:"",u=i&&i[p.name],c=u?`<i class="pp-m view ${O[u]}">${u}</i>`:"",m=p.brightness?`<em class="pp-b ${V[p.brightness]||"mid"}">${p.brightness}</em>`:"",f=p.inTemple?'<em class="pp-b good">庙</em>':"";return`<span class="pp-st ${d}">${p.name}${m}${f}${o}${c}</span>`}).join("")}function R(e){const i=[];for(let p=0;p<6;p++)i.push(e+p*12);return i.join(",")}const B=["命宫","兄弟","夫妻","子女","财帛","疾厄","迁移","交友","官禄","田宅","福德","父母"],D=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],U=e=>(e%12+12)%12,be=(e,i)=>e!==i&&[U(i+4),U(i+8),U(i+6)].includes(e);function vt(e,i,p,d,o){const u=ie[e.branch]||[1,1],c=D.indexOf(e.branch),m=["pp-cell"];c===i?m.push("pp-soul"):be(c,i)&&m.push("pp-tri"),e.isBody&&m.push("pp-shen"),u[0]===4&&m.push("pp-lastrow"),u[1]===4&&m.push("pp-lastcol");const f=e.shensha||{},x=B[U(i-c)],b=e.selfHua&&e.selfHua.length?`<span class="pp-zh">${e.selfHua.map(S=>`<i class="pp-m self ${O[S.type]}" title="自化：宫干化回本宫">${S.type}</i>`).join("")}</span>`:"";let L="";if(c===i&&d){const S=w=>(k[w.type]||"")==="main";if(!(e.stars||[]).some(S)){const w=d.find(_=>D.indexOf(_.branch)===U(c+6)),N=w?(w.stars||[]).filter(S):[];N.length&&(L=`<div class="pp-borrow" title="命宫无主星，借对宫（迁移宫）主星">借 ${N.map(_=>_.name).join(" ")}</div>`)}}return`<div class="${m.join(" ")}" data-pi="${c}" data-view="${p}" role="button" tabindex="0" aria-expanded="false" style="grid-row:${u[0]};grid-column:${u[1]}">
      <div class="pp-stars">${xe(e.stars,o)}${b}</div>
      ${L}
      <div class="pp-ages">${R(e.xiaoxian.age)}</div>
      <div class="pp-foot">
        <div class="ft-l">
          <span class="ft-dx">${f.boshi} ${e.daxian.start}-${e.daxian.end}</span>
          <span>${f.jiangqian}</span>
          <span>${f.suiqi}</span>
        </div>
        <div class="ft-r">
          <span>${f.changsheng}</span>
          <span>${e.ganzhi}</span>
          <span class="ft-pn">${x}</span>
        </div>
      </div>
    </div>`}function Ve(e){try{const i=window.Engine||window.__PP&&window.__PP.Engine;if(!i||!i.buildBazi||!e.input)return"";const p=i.buildBazi({year:e.input.year,month:e.input.month,day:e.input.day,hour:e.input.hour,minute:e.input.minute,gender:e.input.gender,trueSolar:!1});return["year","month","day","hour"].map(d=>p.pillars[d].ganzhi).join(" ")}catch{return""}}s.ziweiHTML=function(e){const i=D.indexOf(e.soul.branch),p=e.liunian&&e.liunian[0]||null,d=p?p.age:1,o=e.palaces.find(M=>d>=M.daxian.start&&d<=M.daxian.end)||e.palaces[0],u=D.indexOf(o.branch),c=p?D.indexOf(p.lifePalace.branch):i,m=M=>{const j={};for(const W of M||[])W&&W.star&&(j[W.star]=W.type);return j},f=(e.daxianList||[]).find(M=>M.branch===o.branch)||null,x={da:m(f&&f.mutagenHits),ln:m(p&&p.mutagenHits)},b=(M,j)=>e.palaces.map(W=>vt(W,M,j,e.palaces,x[j]||null)).join(""),L=(M,j)=>`<div class="pp-center">
        ${j==="da"?`<div class="ct-t1">大限 ${o.ganzhi}　${o.daxian.start}-${o.daxian.end}岁</div>`:j==="ln"&&p?`<div class="ct-t1">流年 ${p.ganzhi}　${p.age}岁</div>`:`<div class="ct-t1">${e.daxian.rule.slice(0,2)}　${e.bureau.name}</div>`}
        <div class="ct-t2">公历 ${e.input.year}-${String(e.input.month).padStart(2,"0")}-${String(e.input.day).padStart(2,"0")} ${String(e.input.hour).padStart(2,"0")}:${String(e.input.minute).padStart(2,"0")}</div>
        <div class="ct-t2">农历 ${e.lunar.year}年${e.lunar.isLeap?`闰${e.lunar.monthRaw||e.lunar.month}`:e.lunar.month}月${e.lunar.day}日${e.hourBranch}时${e.lunar.isLeap&&e.lunar.monthRaw&&e.lunar.month!==e.lunar.monthRaw?`（按${e.lunar.month}月起盘）`:""}</div>
        ${Ve(e)?`<div class="ct-t3">${Ve(e)}</div>`:""}
        <div class="ct-t4">命主 ${e.lifeMaster}　身主 ${e.bodyMaster}${e.bodyMasterNote?`<span class="pp-dim" title="${a(e.bodyMasterNote)}">＊</span>`:""}</div>
        <div class="ct-t4">命宫 ${e.soul.branch}　身宫 ${e.body.branch}　五行局 ${e.bureau.name}</div>
        <div class="ct-t4">子年斗君 ${e.doujun?e.doujun.zinian:"—"}　流年斗君 ${p&&p.doujun?p.doujun:"—"}</div>
        <div class="ct-t4">紫微 ${e.ziwei}　天府 ${e.tianfu}　${j==="da"?"大限命宫 "+D[u]:j==="ln"?"流年命宫 "+D[c]:"本命命宫 "+e.soul.branch}</div>
        ${j==="da"||j==="ln"?`<div class="ct-t4 pp-viewhua">${j==="da"?"大限":"流年"}四化　${(j==="da"?x.da:x.ln)&&Object.keys(j==="da"?x.da:x.ln).length?Object.entries(j==="da"?x.da:x.ln).map(([ce,ve])=>`${ce}化${ve}`).join("　"):'<span class="pp-dim">未飞四化</span>'}</div>`:""}
        <div class="pp-legend"><span class="pp-m lu">禄</span><span class="pp-m quan">权</span><span class="pp-m ke">科</span><span class="pp-m ji">忌</span><span>实心=生年四化　空心=大限/流年四化　虚下划线=自化　红框=命宫　浅底=三方四正</span></div>
      </div>`,S=(M,j,W)=>`<div class="pp-body ${M}" data-view="${W}" data-soul="${j}"><div class="pp-grid">${b(j,W)}${L(j,W)}</div><div class="pp-detail"></div></div>`,w=e.changqu,N=w?`<div class="pp-chips">
      <span class="pp-chip">昌 ${w.wenchang.branch}（${w.wenchang.palace}）</span>
      <span class="pp-chip">曲 ${w.wenqu.branch}（${w.wenqu.palace}）</span>
      <span class="pp-chip">${w.relation}</span>
      <span class="pp-chip">入命三方 ${w.inSoulSanfang?"是":"否"}</span>
      <span class="pp-chip ${w.absorb.label==="杂"?"warn":"ok"}">吸收·${w.absorb.label}</span>
    </div>`:"",_=(e.patterns||[]).length?`<div class="pp-chips">${e.patterns.map(M=>{const j=M.status==="broken"&&Array.isArray(M.breaks)&&M.breaks.length,W=`${M.evidence||""}${j?`；破格：${M.breaks.join("；")}`:""}`;return`<span class="pp-chip ${j?"broken":M.tone==="good"?"ok":M.tone==="bad"?"warn":""}" title="${a(W)}">${M.name}${j?"（破格）":""}</span>`}).join("")}</div>`:"",ee=(e.daxianList||[]).length?`<div class="pp-chips">${e.daxianList.slice(0,8).map(M=>`<span class="pp-chip" title="${a(`${M.ganzhi} 宫干四化：`+M.mutagenHits.map(j=>`${j.star}化${j.type}→${j.palace||"未上盘"}`).join("、"))}">${M.branch} ${M.ages[0]}-${M.ages[1]}</span>`).join("")}</div>`:"",I=p&&p.mutagenHits&&p.mutagenHits.length?`<div class="pp-chips">${p.mutagenHits.map(M=>`<span class="pp-chip ${M.type==="忌"?"warn":M.type==="禄"?"ok":""}">${M.star}化${M.type}→${M.palace||"未上盘"}</span>`).join("")}</div>`:"",y=e.zuoyao,T=y?y.placed&&y.placed.length?`<div class="pp-sec"><div class="pp-sec-h">杂曜全表 · 已排 ${y.placed.length} 颗（${y.starTotal} 颗盘）</div>
        <div class="pp-chips">${y.placed.map(M=>`<span class="pp-chip${M.inTemple?" ok":""}" title="${a(M.meaning||"")}">${a(M.name)} ${a(M.branch)}（${a(M.palace)}）${M.inTemple?"·庙":""}</span>`).join("")}</div>
        <details class="pp-zy"><summary>逐颗安星诀（${y.placed.length} 条 · 出多处近代通行辑本并核，属通行说，不是《全书》原文）</summary><div class="pp-zy-v">${a(y.verses).replace(/\n/g,"<br>")}</div></div></details>
        ${y.skipped&&y.skipped.length?`<div class="pp-zy-s">${y.skipped.map(M=>a(M)).join("")}</div>`:""}</div>`:`<div class="pp-sec"><div class="pp-sec-h">杂曜 · 本盘 ${y.starTotal} 颗（通行简盘）</div>
        <div class="pp-zy-s">开「杂曜全表」追加十二颗：解神·天巫·天月·阴煞（生月）／天官·天福·天厨（生年干）／蜚廉·天德·年解（生年支）／天才（命宫＋生年支）·天寿（身宫＋生年支）。${y.skipped&&y.skipped.length?`不另立：${y.skipped.map(M=>a(M)).join("")}`:""}</div></div>`:"",ne=e.flyChains?(()=>{const M=["禄","权","科","忌"].map(j=>{const W=e.flyChains[j];if(!W||!W.steps.length)return"";const ce=W.path.map(me=>String(me).replace(/宫$/,"")).join("→"),ve=W.steps.map(me=>`${me.from}（${me.fromStem}）化${j}${me.star}→${me.to}`).join("；");return`<span class="pp-chip ${j==="忌"?"warn":j==="禄"?"ok":""}" title="${a(ve)}">飞${j} ${a(ce)}${W.closed?"↺":""}</span>`}).join("");return M?`<div class="pp-chips">${M}</div>`:""})():"",H=e.flyComposite&&Array.isArray(e.flyComposite.labels)&&e.flyComposite.labels.length?`<div class="pp-chips">${e.flyComposite.labels.map(M=>{const j=/忌/.test(M)?"warn":/自化/.test(M)?"":"ok",W=te=>String(te).replace(/^.*?会/,"").replace(/^禄忌同宫/,"").replace(/自化$/,""),ce=(e.flyComposite.targets||[]).find(te=>te.palace===W(M)),ve=ce?ce.incoming.map(te=>`${te.from}化${te.type}${te.star}`).join("、"):e.flyComposite.note;return`<span class="pp-chip ${j}" title="${a(ve)}">三方四正 ${a(M)}</span>`}).join("")}</div>`:"",K=e.flow,$=K?(()=>{const M=ve=>(ve.mutagenHits||[]).length?ve.mutagenHits.map(te=>`<i>${te.star}化${te.type}<em>→${te.palace||"未上盘"}</em></i>`).join(""):'<i class="dim">宫干无四化</i>',j=(ve,te,me)=>`<div class="flow-row"><b>${ve}</b><span class="flow-p"><span class="flow-k">${te.ganzhi||"—"}　落${te.palace||"未上盘"}（${te.branch}）</span>${me?`<em class="flow-same">${me}</em>`:""}</span><span class="flow-m">${M(te)}</span></div>`,ce=K.day.branch===K.month.branch?"（日数走满一圈，故同宫）":"";return`<div class="pp-flow">
        <div class="flow-row"><b>基准</b><span class="flow-p">${K.asOf.solar}</span><span class="flow-m">农历 ${K.asOf.lunar}　流年 ${K.asOf.yearGanzhi}（斗君 ${K.year.doujun}）</span></div>
        ${j(`流月 ${K.month.index} 月`,K.month)}
        ${j(`流日 ${K.day.index} 日`,K.day,ce)}
        ${j(`流时 ${D[K.hour.hourIndex]}时`,K.hour)}
      </div>`})():"";return s._zw=e,s.briefHTML(e)+`<div class="pp">
      <input type="radio" name="ppm" id="ppm-ben" class="pp-r" checked>
      <input type="radio" name="ppm" id="ppm-da" class="pp-r">
      <input type="radio" name="ppm" id="ppm-ln" class="pp-r">
      <div class="pp-modes">
        <label for="ppm-ben">本命</label><label for="ppm-da">大限</label><label for="ppm-ln">流年</label>
        <span class="pp-soon">点任一宫位看详情</span>
      </div>
      ${S("ben",i,"ben")}
      ${S("da",u,"da")}
      ${S("ln",c,"ln")}
    </div>${$}${N}${ne}${H}${_}${ee}${I}${T}`};function Xe(e){return e.length?e.map(i=>{const p=k[i.type]||"aux",d=i.brightness?`<em class="dt-br ${V[i.brightness]||"mid"}">${i.brightness}</em>`:"",o=i.inTemple?'<em class="dt-br good">庙</em>':"",u=i.mutagen?`<i class="pp-m ${O[i.mutagen]}">${i.mutagen}</i>`:"";return`<span class="dt-st ${p}">${i.name}${d}${o}${u}</span>`}).join(""):'<span class="dt-empty">无</span>'}function Le(e,i){const p=s._zw;if(!p)return"";const d=y=>p.palaces.find(T=>D.indexOf(T.branch)===y),o=d(e)||p.palaces.find(y=>D.indexOf(y.branch)===e);if(!o)return"";const u=D.indexOf(o.branch),c=B[U(i-u)],m=o.shensha||{},f=o.stars.filter(y=>y.type==="主星"),x=o.stars.filter(y=>y.type==="吉星"||y.type==="辅星"),b=o.stars.filter(y=>y.type==="煞星"),L=o.stars.filter(y=>!["主星","吉星","辅星","煞星"].includes(y.type)),S=(o.selfHua||[]).length?o.selfHua.map(y=>`<i class="pp-m self ${O[y.type]}" title="自化：宫干化回本宫">${y.type}</i>`).join(""):'<span class="dt-empty">无</span>',w=[U(u+4),U(u+8),U(u+6)].map(y=>{const T=d(y),ne=B[U(i-y)],H=T?T.stars.filter($=>$.type==="主星").map($=>$.name).join("、"):"",K=y===U(u+6)?"对宫":"三合";return`<span class="dt-st">${ne}[${D[y]}]<b>${H||"无主星"}</b><em>${K}</em></span>`}).join(""),N=d(U(u+6)),_=N?N.stars.filter(y=>y.type==="主星"):[],ee=f.length?Xe(f):`<span class="dt-empty">无主星</span><span class="dt-tri">　借对宫 <b>${_.length?_.map(y=>y.name).join("、"):"亦无主星"}</b></span>`,I=(y,T)=>`<div class="dt-dr"><span class="dt-k">${y}</span><div class="dt-v">${T}</div></div>`;return`<div class="dt-dh">
        <b>${c}</b><span>${o.branch}宫 · ${o.ganzhi}</span>
        <span>大限 ${o.daxian.start}-${o.daxian.end}</span>
        <span>小限起 ${o.xiaoxian.age} 岁</span>
        ${o.isBody?"<span>· 身宫</span>":""}
        <span class="dt-x" data-pp-close="1">收起</span>
      </div>
      ${I("主星",ee)}
      ${I("吉辅",Xe(x))}
      ${b.length?I("煞星",Xe(b)):""}
      ${L.length?I("杂曜",Xe(L)):""}
      ${I("宫干四化",S)}
      ${I("十二神",`<span class="dt-tri">长生 ${m.changsheng||"—"}　博士 ${m.boshi||"—"}　将前 ${m.jiangqian||"—"}　岁前 ${m.suiqi||"—"}</span>`)}
      ${I("三方四正",`<span class="dt-tri">${w}</span>`)}
      <div class="hint">三方四正在盘上已同步标出（浅红描边）。再点一次本宫可收起。</div>`}function yt(e){e.querySelectorAll(".pp-cell.pp-sel,.pp-cell.pp-link").forEach(i=>{i.classList.remove("pp-sel"),i.classList.remove("pp-link")}),e.querySelectorAll('.pp-cell[aria-expanded="true"]').forEach(i=>i.setAttribute("aria-expanded","false"))}function Ie(){if(Ie.done||typeof document>"u"||!document.addEventListener)return;Ie.done=!0;const e=i=>{const p=i.closest(".pp-body");if(!p)return;const d=p.querySelector(".pp-detail");if(!d)return;if(i.classList.contains("pp-sel")){yt(p),d.classList.remove("open"),d.innerHTML="";return}yt(p);const o=Number(i.dataset.pi),u=Number(p.dataset.soul);p.querySelectorAll(".pp-cell").forEach(m=>{const f=Number(m.dataset.pi);(f===U(o+4)||f===U(o+8)||f===U(o+6))&&m.classList.add("pp-link")}),i.classList.add("pp-sel"),i.setAttribute("aria-expanded","true"),d.innerHTML=Le(o,u),d.classList.add("open")};document.addEventListener("click",i=>{const p=i.target;if(p&&p.closest&&p.closest("[data-pp-close]")){const o=p.closest(".pp-body");if(o){yt(o);const u=o.querySelector(".pp-detail");u&&(u.classList.remove("open"),u.innerHTML="");return}}const d=p&&p.closest?p.closest(".pp-cell[data-pi]"):null;d&&e(d)}),document.addEventListener("keydown",i=>{if(i.key!=="Enter"&&i.key!==" ")return;const p=i.target&&i.target.closest?i.target.closest(".pp-cell[data-pi]"):null;p&&(i.preventDefault(),e(p))})}s.bindZiwei=Ie,s._palaceDetailHTML=Le,Ie();function Lt(e,i){const p=i||{},d=e.slice().sort((o,u)=>u.position-o.position);return p.plain?d.map(o=>`<div class="mp-hy-row hy-plain">
        <span class="mp-hy-nm">${o.name||re[o.position-1]}</span>
        ${ge(o.yinYang==="阳",o.moving)}
      </div>`).join(""):d.map(o=>{const u=o.yinYang==="阳",c=p.shiYing?o.position===p.shi?'<span class="mp-hy-sy">世</span>':o.position===p.ying?'<span class="mp-hy-sy">应</span>':"<span></span>":"<span></span>",m=o.moving?`<i class="mp-hy-mv" title="动爻">${u?"○":"×"}</i>`:'<i class="mp-hy-mv"></i>';return`<div class="mp-hy-row">
        ${c}
        <span class="mp-hy-nm">${o.name||re[o.position-1]}</span>
        <span class="mp-hy-ln">${ge(u,o.moving)}${m}</span>
        <span class="mp-hy-gz">${a(o.ganzhi||"")}</span>
        <span class="mp-hy-lq">${a(o.liuqin||"")}</span>
        <span class="mp-hy-ls">${a(o.liushen||"")}</span>
      </div>`}).join("")}s.liuyaoHTML=function(e){const i=(y,T,ne,H)=>`<div class="mp-hy-box">
      <div class="mp-hy-h"><b>${y}</b><span>${T}</span></div>
      <div class="mp-hy">${Lt(H,{shiYing:!0,shi:ne.shi,ying:ne.ying})}</div>
    </div>`,p=i(`本卦 ${e.ben.name}`,`${e.ben.palace} · ${e.ben.palaceElement}`,e.ben,e.ben.lines),d=e.bian?i(`变卦 ${e.bian.name}`,`${e.bian.palace} · ${e.bian.palaceElement}`,e.bian,e.bian.lines):`<div class="mp-hy-box"><div class="mp-hy-h"><b>六爻安静</b><span>无动爻，不取变卦</span></div>
          <div class="pp-dim" style="font-size:12px;line-height:1.9">断卦以本卦卦辞与世应生克为主。</div></div>`,o=e.body&&Array.isArray(e.body.labels)?e.body.labels:[],u=o.length?`<div class="pp-chips">${o.map(y=>`<span class="pp-chip ${/伏吟/.test(y)||/反吟/.test(y)||/化退神/.test(y)?"warn":/六冲|散/.test(y)?"":"ok"}">${a(y)}</span>`).join("")}</div>`:'<div class="pp-chips"><span class="pp-chip">卦体无六冲、六合、伏吟、反吟</span></div>',c=e.useGod&&e.useGod.liuqin?e.useGod:null,m=c?`<div class="pp-chips">${c.labels.map(y=>`<span class="pp-chip ${/空亡|退神|受克|泄气|不上卦/.test(y)?"warn":/持世|化进|六合|得飞神生/.test(y)?"ok":""}">${a(y)}</span>`).join("")}</div>`:'<div class="pp-chips"><span class="pp-chip">用神未取（未指明所问之事）</span></div>',f=e.useGodStrength&&Array.isArray(e.useGodStrength.labels)?e.useGodStrength:null,x=f&&f.labels.length?`<div class="pp-chips">${f.labels.map(y=>`<span class="pp-chip ${/死|囚|月破|受日辰克|泄|耗/.test(y)?"warn":/旺|相|得日辰生|比和/.test(y)?"ok":""}">${a(y)}</span>`).join("")}</div>`:"",b=e.fushenAccess&&Array.isArray(e.fushenAccess.labels)?e.fushenAccess:null,L=b&&b.labels.length?`<div class="pp-chips">${b.labels.map(y=>`<span class="pp-chip ${/可出/.test(y)?"ok":/受压难出|有助有压/.test(y)?"warn":""}">伏神${a(y)}</span>`).join("")}</div>`:"",S=e.yingqi&&Array.isArray(e.yingqi.labels)?e.yingqi:null,w=S&&S.labels.length?`<div class="pp-chips">${S.labels.map(y=>`<span class="pp-chip ${/应期偏速/.test(y)?"ok":/应期待解/.test(y)?"warn":""}" title="只列地支，不出日期">${a(y)}</span>`).join("")}</div>`:"",N=e.jinTuiPower&&Array.isArray(e.jinTuiPower.labels)?e.jinTuiPower:null,_=N&&N.labels.length?`<div class="pp-chips">${N.labels.map(y=>`<span class="pp-chip ${/后劲足|退得缓/.test(y)?"ok":/有限|进得虚|退得实|月破|未定/.test(y)?"warn":""}">${a(y)}</span>`).join("")}</div>`:"",ee=e.hexStrength&&Array.isArray(e.hexStrength.labels)?e.hexStrength:null,I=ee&&ee.labels.length?`<div class="pp-chips">${ee.labels.map(y=>`<span class="pp-chip ${/死|囚|月破|冲空/.test(y)?"warn":/旺|相/.test(y)?"ok":""}">${a(y)}</span>`).join("")}</div>`:"";return s.briefHTML(e)+`<div class="pp" style="padding:14px">
      <div class="mp-mh-head">起卦 ${e.cast.notation.join("、")}（自下而上）　日辰 ${e.dayGanZhi.name}</div>
      <div class="mp-hy-wrap">${p}${d}</div>
      ${u}
      ${m}
      ${x}
      ${L}
      ${w}
      ${_}
      ${I}
    </div>`},s.meihuaHTML=function(e){const i=(w,N,_,ee,I)=>{const T=[...se[ee]||[0,0,0],...se[_]||[0,0,0]].slice().reverse().map(ne=>ge(!!ne,!1,"sm")).join("");return`<div class="mp-hexbox hb-mini">
        <div class="hb-h">${w}</div>
        <div class="hb-n">${N}</div>
        <div class="mp-mh-mini">${T}</div>
        <div class="hb-s">${I||`上${_} 下${ee}`}</div>
      </div>`},p=e.lines.slice().sort((w,N)=>N.position-w.position),d=p.slice(0,3),o=p.slice(3),u=e.moving>=4,c=(w,N,_,ee)=>`<div class="mp-trib">
      <div class="mp-trib-h">${w} ${fe(N)}${N}${wt(N)}<span class="mp-tritag ${ee?"tritag-ti":"tritag-yong"}">${ee?"体":"用"}</span></div>
      <div class="mp-hy" style="gap:5px">${Lt(_,{plain:!0})}</div>
    </div>`,m=`<div class="mp-hexbox">
      <div class="hb-h"><span>本卦</span><span>动 ${e.movingName}</span></div>
      <div class="hb-n">${e.ben.name}</div>
      ${c("上卦",e.ben.upper,d,!u)}
      ${c("下卦",e.ben.lower,o,u)}
      <div class="hb-s">${e.source}</div>
    </div>`,f=e.bodyUse.level,x=f.includes("凶")?"bad":f.includes("吉")?"good":"flat",b=`<div class="mp-mh-rel">
      <div><b>体</b>${e.bodyUse.body.trigram}（${e.bodyUse.body.element}）　<b>用</b>${e.bodyUse.use.trigram}（${e.bodyUse.use.element}）</div>
      <div><span class="mh-lv ${x}">${f}</span>　${e.bodyUse.relation}</div>
    </div>`,L=Et(e.cuo.name)||["",""],S=Et(e.zong.name)||["",""];return s.briefHTML(e)+`<div class="pp mp-mh">
      <div class="mp-mh-main">
        ${m}
        ${i("互卦",e.hu.name,e.hu.upper,e.hu.lower,"中藏之象")}
        ${i("变卦",e.bian.name,e.bian.upper,e.bian.lower,`动 ${e.movingName} 后`)}
        ${i("错卦",e.cuo.name,L[0],L[1],"六爻全变")}
        ${i("综卦",e.zong.name,S[0],S[1],"整卦倒转")}
      </div>
      ${b}
    </div>`};const $t={乾为天:["乾","乾"],天风姤:["乾","巽"],天山遁:["乾","艮"],天地否:["乾","坤"],风地观:["巽","坤"],山地剥:["艮","坤"],火地晋:["离","坤"],火天大有:["离","乾"],坎为水:["坎","坎"],水泽节:["坎","兑"],水雷屯:["坎","震"],水火既济:["坎","离"],泽火革:["兑","离"],雷火丰:["震","离"],地火明夷:["坤","离"],地水师:["坤","坎"],艮为山:["艮","艮"],山火贲:["艮","离"],山天大畜:["艮","乾"],山泽损:["艮","兑"],火泽睽:["离","兑"],天泽履:["乾","兑"],风泽中孚:["巽","兑"],风山渐:["巽","艮"],震为雷:["震","震"],雷地豫:["震","坤"],雷水解:["震","坎"],雷风恒:["震","巽"],地风升:["坤","巽"],水风井:["坎","巽"],泽风大过:["兑","巽"],泽雷随:["兑","震"],巽为风:["巽","巽"],风天小畜:["巽","乾"],风火家人:["巽","离"],风雷益:["巽","震"],天雷无妄:["乾","震"],火雷噬嗑:["离","震"],山雷颐:["艮","震"],山风蛊:["艮","巽"],离为火:["离","离"],火山旅:["离","艮"],火风鼎:["离","巽"],火水未济:["离","坎"],山水蒙:["艮","坎"],风水涣:["巽","坎"],天水讼:["乾","坎"],天火同人:["乾","离"],坤为地:["坤","坤"],地雷复:["坤","震"],地泽临:["坤","兑"],地天泰:["坤","乾"],雷天大壮:["震","乾"],泽天夬:["兑","乾"],水天需:["坎","乾"],水地比:["坎","坤"],兑为泽:["兑","兑"],泽水困:["兑","坎"],泽地萃:["兑","坤"],泽山咸:["兑","艮"],水山蹇:["坎","艮"],地山谦:["坤","艮"],雷山小过:["震","艮"],雷泽归妹:["震","兑"]},Ct={乾:"金",兑:"金",离:"火",震:"木",巽:"木",坎:"水",艮:"土",坤:"土"},wt=e=>Ct[e]?` ${Ct[e]}`:"",Et=e=>$t[e]||null;s.daliurenHTML=function(e){const i=e.sanChuan,p=(m,f)=>`<div class="mp-dl-sc-c">
      <div class="mp-dl-sc-k">${f}</div>
      <div class="mp-dl-sc-z">${m.zhi}</div>
      <div class="mp-dl-sc-j">${m.jiangFull||m.jiang}</div>
      <div class="mp-dl-sc-l">${m.liuQin}${m.xunKong?" · 空":""}</div>
    </div>`,d=`<div class="mp-dl-sc-c ge">
      <div class="mp-dl-sc-k">格局</div>
      <div class="mp-dl-sc-gn">${e.geJu.name}</div>
      <div class="mp-dl-sc-l">${e.geJu.detail}</div>
    </div>`,o=e.siKe.slice().map(m=>`<div class="mp-dl-sk-c">
      <div class="mp-dl-sk-k">${["一课","二课","三课","四课"][m.position-1]||m.position+"课"}</div>
      <div class="mp-dl-sk-s">${m.shang}</div>
      <div class="mp-dl-sk-x">${m.xia}</div>
      <div class="mp-dl-sk-r">${m.relation} · ${m.jiangFull||m.jiang}</div>
    </div>`).join(""),u=e.pan.map(m=>{const f=ie[m.di]||[1,1];return`<div class="mp-dl-pc" style="grid-row:${f[0]};grid-column:${f[1]}">
        <div class="tz">${m.tian}</div>
        <div class="dz">地盘 ${m.di}</div>
        <div class="jz">${m.jiangFull}</div>
      </div>`}).join(""),c=`<div class="mp-dl-c">
      <div class="dl-t1">${e.dayGanZhi}日　${e.hourZhi}时</div>
      <div class="dl-t2">${e.dayNight}贵 · 月将 ${e.yueJiang.name}${e.yueJiang.zhi} · 贵人${e.guiren.reverse?"逆":"顺"}行</div>
      <div class="dl-t3">${i.chu.zhi} → ${i.zhong.zhi} → ${i.mo.zhi}</div>
      <div class="dl-t2">节气 ${e.jieqi.name}${e.jieqi.time?" "+e.jieqi.time:""}</div>
    </div>`;return s.briefHTML(e)+`<div class="pp mp-dl">
      <div class="mp-dl-head">日 ${e.dayGanZhi}　时 ${e.hourZhi}（${e.dayNight}贵）　月将 ${e.yueJiang.name}${e.yueJiang.zhi}　节气 ${e.jieqi.name}　贵人${e.guiren.reverse?"逆":"顺"}行</div>
      <div class="mp-dl-sc">${p(i.chu,"初传")}${p(i.zhong,"中传")}${p(i.mo,"末传")}${d}</div>
      <div class="mp-dl-sk">${o}</div>
      <div class="mp-dl-pan2">${u}${c}</div>
      ${(e.shensha||[]).length?`<div class="mp-dl-ss"><b>神煞</b>${e.shensha.map(m=>`<span title="${a(m.note||"")}">${m.name}<i>${m.branch}</i></span>`).join("")}</div>`:""}
      <div class="mp-dl-legend"><span>大字＝天盘支</span><span>小字＝地盘（固定十二支）</span><span>右下＝天将</span></div>
    </div>`},s.tarotHTML=function(e){const i=e.cards.map(o=>`
      <div class="mp-tt-card ${o.upright?"tt-up":"tt-rev"}">
        <div class="mp-tt-pos" title="${a(o.positionHint||"")}">${o.position}</div>
        <div class="mp-tt-name">${o.name}${o.number?`<span class="mp-tt-no">${o.number}</span>`:""}</div>
        ${o.en?`<div class="mp-tt-en">${o.en}</div>`:""}
        <div class="mp-tt-ori">${o.orientation}</div>
        ${o.image?`<div class="mp-tt-img">牌面：${o.image}</div>`:""}
        ${o.core?`<div class="mp-tt-core">${o.core}</div>`:""}
        <div class="mp-tt-kw">${o.keywords.map(u=>`<span>${u}</span>`).join("")}</div>
        <div class="mp-tt-el">${o.arcana} · ${o.element}${o.suit?" · "+o.suit+(o.rankCn?o.rankCn:""):""}${o.domain?" · "+o.domain:""}${o.astro?` · ${o.astro}`:o.role?` · ${o.role}`:""}</div>
      </div>`).join(""),p=e.question?a(e.question):'<span class="pp-dim">（未填写，可在上方输入后重抽）</span>',d=(e.reading||[]).map(o=>`<p>${a(o)}</p>`).join("");return s.briefHTML(e)+`<div class="pp mp-tt">
      <div class="mp-tt-q"><b>所问</b>${p}</div>
      <div class="mp-tt-head">${e.spread}${e.castAt?`　·　抽牌于 ${e.castAt}`:""}</div>
      <div class="mp-tt-grid">${i}</div>
      <div class="mp-tt-read"><div class="mp-tt-rt">牌面解读</div>${d}</div>
      <div class="mp-tt-note"><div class="mp-tt-rt">你的记录</div>
        <textarea class="mp-tt-ta" rows="4" placeholder="写下判断或对照后的想法……（仅本页可见，不保存）"></textarea>
      </div>
      ${e.systemNote?`<div class="mp-tt-tip">${e.systemNote}</div>`:""}
      <div class="mp-tt-tip">塔罗用于自我觉察与娱乐，不作确定性预言。</div>
    </div>`};const We=e=>{if(!e||!Array.isArray(e.pairs)||!e.pairs.length)return"";const p='<tr><th scope="col">一对</th><th scope="col">契合度</th>'+(e.pairs[0].dimensions||[]).map(c=>`<th scope="col">${a(c.label)}</th>`).join("")+"</tr>",d=e.pairs.map(c=>`<tr><th scope="row">${a(c.a)} × ${a(c.b)}</th><td>${c.total==null?"—":`${a(c.total)}/100`}<span class="mp-hp-lv">${a(c.level||"")}</span></td>`+(c.dimensions||[]).map(m=>`<td>${m.score>=0?"+":""}${a(m.score)}</td>`).join("")+"</tr>").join(""),o=e.spread>=3&&e.best?`最顺：<b>${a(e.best.a)} × ${a(e.best.b)}</b>（${a(e.best.total)}/100）`+(e.hardest?`；最需磨合：<b>${a(e.hardest.a)} × ${a(e.hardest.b)}</b>（${a(e.hardest.total)}/100）`:""):`三对分数接近（相差 ${a(e.spread)} 分），不排名`,u=e.focus&&e.focus.spread>=3?`<p>差异最大的一维：<b>${a(e.focus.label)}</b>（三对相差 ${a(e.focus.spread)} 分）</p>`:"";return`<div class="mp-hp-triple">
      <div class="mp-hp-ith">三方合盘 · 三对并列</div>
      <table><thead>${p}</thead><tbody>${d}</tbody></table>
      <p>${o}</p>${u}
      <p>${a(e.note||"")}</p>
    </div>`};s.hepanHTML=function(e){const i=(d,o)=>`<div class="mp-hp-side">
      <div class="mp-hp-who">${o}</div>
      <div class="mp-hp-gz">${d.pillars.join(" ")}</div>
      <div class="mp-hp-kv"><span>日主</span><b>${d.dayMaster}</b></div>
      <div class="mp-hp-kv"><span>日支</span><b>${d.dayBranch}</b></div>
      <div class="mp-hp-kv"><span>强弱</span><b>${d.strength||"—"}</b></div>
      <div class="mp-hp-kv"><span>喜用</span><b>${d.favor||"—"}</b></div>
    </div>`,p=e.dimensions.map(d=>`<div class="mp-hp-dim">
      <div class="mp-hp-dimh"><span>${d.label}</span><b class="${d.score>=10?"good":d.score<0?"bad":""}">${d.score>=0?"+":""}${d.score}</b></div>
      <div class="mp-hp-dimt">${d.text}</div>
    </div>`).join("");return s.briefHTML(e)+`<div class="pp mp-hp">
      <div class="mp-hp-head"><b>${e.score.level}</b><span>${e.score.total}/100</span></div>
      <div class="mp-hp-sides">${i(e.a,"你")}${i(e.b,"对方")}</div>
      <div class="mp-hp-dims">${p}</div>
      ${We(e.triple)}
      <div class="mp-hp-notes">${e.notes.map(d=>`<p>${d}</p>`).join("")}</div>
    </div>`},s.qimenFactsHTML=function(e){if(!e||!e.palaces)return"";const i=(o,u)=>`<div class="relation__row"><dt>${a(o)}</dt><dd>${a(u)}</dd></div>`,p=o=>o&&["旺","相","休","囚","死"].filter(c=>Array.isArray(o[c])&&o[c].length).map(c=>`${c} ${o[c].join("、")}`).join("；")||"—";return`<dl class="relation mp-qm-facts" aria-label="奇门盘面事实">${[["局数",`${e.ju}${e.yuan?`（${e.yuan}）`:""}`],["节气",`${e.jieqi||"—"}${e.jieqiTime?`（${e.jieqiTime}）`:""}`],["四柱",`${e.siZhu?`${e.siZhu.year} ${e.siZhu.month} ${e.siZhu.day} ${e.siZhu.time}`:"—"}`],["值符",e.zhiFu?`${e.zhiFu.star} · ${e.zhiFu.gong}宫`:"—"],["值使",e.zhiShi?`${e.zhiShi.gate} · ${e.zhiShi.gong}宫`:"—"],["旬首",e.xunshou||"—"],["空亡",(e.kongWang||[]).join("")||"—"],["驿马",e.ma&&e.ma.zhi?`${e.ma.zhi}${e.ma.gong?`（${e.ma.gong}宫）`:""}`:"—"],["换局规则",e.juMethodNote||e.juMethod||"—"],["晚子时",e.lateZiHourMode==="next-day"?"23:00 后归次日":"23:00 后仍归当日"],["击刑",e.conditions&&e.conditions.jiXing&&e.conditions.jiXing.length?e.conditions.jiXing.map(o=>`${o.palace}宫${o.stem}`).join("、"):"本盘无"],["三奇入墓",e.conditions&&e.conditions.ruMu&&e.conditions.ruMu.length?e.conditions.ruMu.map(o=>`${o.palace}宫${o.stem}`).join("、"):"本盘无"],["六仪入墓",e.conditions&&e.conditions.liuYiRuMu&&e.conditions.liuYiRuMu.length?e.conditions.liuYiRuMu.map(o=>`${o.palace}宫${o.stem}`).join("、"):"本盘无"],["十干克应",[...e.palaces||[],e.centerPalace].filter(u=>u&&u.ganYing).map(u=>`${u.palace}宫 ${u.ganYing.tian}加${u.ganYing.di}「${u.ganYing.name}」`).join("；")||"—"],["月令",e.month&&e.month.branch?`${e.month.branch}（${e.month.element}）`:"—"],["门旺衰",p(e.states&&e.states.gate)],["星旺衰",p(e.states&&e.states.star)],["干旺衰",p(e.states&&e.states.stem)],["干宫生克",(()=>{const o=["干克宫","宫克干","干生宫","宫生干","比和"],u={};for(const c of e.palaces||[]){const m=c.stemRelation||null;!m||m.type==="unknown"||!c.tianPan||(u[m.type]=u[m.type]||[]).push(c.tianPan)}return o.filter(c=>u[c]).map(c=>c+" "+u[c].join("、")).join("；")||"—"})()]].map(([o,u])=>i(o,u)).join("")}</dl>`};const Kt=[["4","9","2"],["3","5","7"],["8","1","6"]];s.qimenHTML=function(e){const i={};for(const d of e.palaces)i[d.palace]=d;const p=d=>{if(d==="5")return`<div class="pp-qm-cell center">
          <div class="pp-qm-ju">${e.ju}</div>
          <div class="pp-qm-kv">${e.siZhu.year} ${e.siZhu.month}</div>
          <div class="pp-qm-kv">${e.siZhu.day} ${e.siZhu.time}</div>
          <div class="pp-qm-kv dim">${e.jieqi} ${e.yuan}</div>
        </div>`;const o=i[d]||{};return`<div class="pp-qm-cell">
        <div class="pp-qm-top"><span class="god">${o.god||""}</span><span class="mk">${o.kong?"空":""}${o.ma?"马":""}</span></div>
        <div class="pp-qm-mid"><span class="tp">${o.tianPan||""}</span><span class="star">${o.star||""}</span></div>
        <div class="pp-qm-mid"><span class="dp">${o.diPan||""}</span><span class="gate">${o.gate||""}</span></div>
        <div class="pp-qm-bot"><span>${o.anGan||""}</span><span class="no">${d}</span></div>
        <div class="pp-qm-bot"><span class="dim">${o.stemRelation&&o.stemRelation.type!=="unknown"?o.stemRelation.type:""}</span><span class="dim">${o.stemState||""}</span></div>
        <div class="pp-qm-bot"><span class="dim">${o.ganYing?a(`${o.ganYing.tian}加${o.ganYing.di} ${o.ganYing.name}`):""}</span></div>
      </div>`};return s.briefHTML(e)+`<div class="pp mp-qm">
      <div class="mp-qm-head">
        <b>${e.ju}</b>
        <span>${e.siZhu.year} ${e.siZhu.month} ${e.siZhu.day} ${e.siZhu.time}</span>
        <span>节气 ${e.jieqi}（${e.jieqiTime}）</span>
        <span>值符 ${e.zhiFu.star}（${e.zhiFu.gong}宫）　值使 ${e.zhiShi.gate}（${e.zhiShi.gong}宫）</span>
        <span>旬首 ${e.xunshou}　空亡 ${e.kongWang.join("")||"—"}　驿马 ${e.ma.zhi||"—"}</span>
      </div>
      <div class="mp-qm-grid">${Kt.map(d=>d.map(p).join("")).join("")}</div>
      <div class="mp-qm-legend">上＝九星　中＝天盘干／八门　下＝地盘干／宫号　角落＝八神</div>
      <div class="mp-qm-rules">${e.rules.map(d=>`<p>${d}</p>`).join("")}</div>
    </div>`},s.ziweiHepanHTML=function(e){const i=(o,u)=>`<div class="mp-hp-side">
      <div class="mp-hp-who">${u}</div>
      <div class="mp-hp-gz">命宫 ${o.soul.branch}　夫妻 ${o.soul.branch,""}${o.spouseStars.length,""}</div>
      <div class="mp-hp-kv"><span>命宫主星</span><b>${o.soulStars.join("、")||"无正曜"}</b></div>
      <div class="mp-hp-kv"><span>夫妻宫主星</span><b>${o.spouseStars.join("、")||"无正曜"}</b></div>
      <div class="mp-hp-kv"><span>五行局</span><b>${o.bureau}</b></div>
      <div class="mp-hp-kv"><span>身宫</span><b>${o.body.branch}（${o.body.lands||"—"}）</b></div>
      <div class="mp-hp-kv"><span>生年四化</span><b>${o.natalSihua.join("、")}</b></div>
    </div>`,p=e.dimensions.map(o=>`<div class="mp-hp-dim">
      <div class="mp-hp-dimh"><span>${o.label}</span><b class="${o.score>=10?"good":o.score<0?"bad":""}">${o.score>=0?"+":""}${o.score}</b></div>
      <div class="mp-hp-dimt">${o.text}</div>
    </div>`).join(""),d=o=>(e.interactions||[]).filter(u=>u.who===o).map(u=>`<li><b class="m-${u.mutagen}">${u.mutagen}</b>${u.star}：本命${u.ownPalace} → 对方${u.landingPalace||"盘外"}${u.strong?"<i>（强）</i>":""}</li>`).join("");return s.briefHTML(e)+`<div class="pp mp-hp">
      <div class="mp-hp-head"><b>${e.score.level}</b><span>${e.score.total}/100　紫微合盘</span></div>
      <div class="mp-hp-sides">${i(e.a,"你")}${i(e.b,"对方")}</div>
      <div class="mp-hp-dims">${p}</div>
      <div class="mp-hp-inter">
        <div><div class="mp-hp-ith">你的四化 落在对方</div><ul>${d("你")||"<li>无</li>"}</ul></div>
        <div><div class="mp-hp-ith">对方的四化 落在你</div><ul>${d("对方")||"<li>无</li>"}</ul></div>
      </div>
      ${We(e.triple)}
      <div class="mp-hp-notes">${e.notes.map(o=>`<p>${o}</p>`).join("")}</div>
    </div>`},s.curveHTML=function(e){const i=e&&e.dayun&&Array.isArray(e.dayun.list)?e.dayun.list:[],p=e&&Array.isArray(e.liunian)?e.liunian:[];if(i.length<2)return"";const d=h=>typeof h=="number"&&isFinite(h)?h:0,o=h=>h.luck?d(h.luck.score):0,u=4.2,c=-2.2,m=d(e.dayun.startAge&&e.dayun.startAge.years),f=i.length?i[i.length-1].startAge+10:m+80,x=p.map(h=>d(h.age)).filter(h=>h>0),b=Math.min(m,...x.length?x:[m]),L=Math.max(f,...x.length?x:[f]),S=Math.max(1,L-b),w=640,N=190,_={t:14,r:16,b:26,l:30},ee=w-_.l-_.r,I=N-_.t-_.b,y=h=>_.l+(h-b)/S*ee,T=h=>_.t+I-(Math.max(c,Math.min(u,h))-c)/(u-c)*I,H=[{from:1.2,to:u,cls:"b-good"},{from:.55,to:1.2,cls:"b-good"},{from:-.8,to:.55,cls:"b-flat"},{from:-1.45,to:-.8,cls:"b-bad"},{from:c,to:-1.45,cls:"b-bad"}].map(h=>`<rect class="cv-band ${h.cls}" x="${_.l}" y="${T(h.to).toFixed(1)}" width="${ee}" height="${(T(h.from)-T(h.to)).toFixed(1)}"/>`).join(""),K=10/S*ee,$=[];i.forEach((h,le)=>{const ae=d(h.startAge),$e=o(h),he=Math.max(_.l,y(ae)),we=Math.min(_.l+ee,y(ae+10));$.push(`${he.toFixed(1)},${T($e).toFixed(1)}`),$.push(`${we.toFixed(1)},${T($e).toFixed(1)}`)});const M=$.length?`<polyline class="cv-dy" points="${$.join(" ")}"/>`:"",j=$.length?`<polygon class="cv-dyfill" points="${_.l},${(_.t+I).toFixed(1)} ${$.join(" ")} ${(_.l+ee).toFixed(1)},${(_.t+I).toFixed(1)}"/>`:"",W=p.filter(h=>h.luck&&typeof h.luck.score=="number").map(h=>({x:y(d(h.age)),y:T(d(h.luck.score)),y0:d(h.year),gz:h.ganzhi,tier:h.luck.tier,v:d(h.luck.score),age:d(h.age)})),ce=W.length>1?`<polyline class="cv-ln" points="${W.map(h=>`${h.x.toFixed(1)},${h.y.toFixed(1)}`).join(" ")}"/>`:"",ve={大吉:"var(--lu)",吉:"var(--lu)",平:"var(--muted)",忌:"var(--red)",大忌:"var(--red)"},te=W.length?Math.min(...W.map(h=>h.y0)):null,me=W.map(h=>`<circle class="cv-dot${h.y0===te?" now":""}" cx="${h.x.toFixed(1)}" cy="${h.y.toFixed(1)}" fill="${ve[h.tier]||"var(--muted)"}"><title>${a(`${h.y0}年（${h.age}岁）${h.gz}　${h.tier} ${h.v}`)}</title></circle>`).join(""),ze=`<line class="cv-ax zero" x1="${_.l}" y1="${T(0).toFixed(1)}" x2="${_.l+ee}" y2="${T(0).toFixed(1)}"/><line class="cv-ax" x1="${_.l}" y1="${_.t}" x2="${_.l}" y2="${_.t+I}"/>`,De=S>60?10:5,Ce=[];for(let h=Math.ceil(b/De)*De;h<=L;h+=De)Ce.push(`<text class="cv-lbl age" x="${y(h).toFixed(1)}" y="${(_.t+I+13).toFixed(1)}" text-anchor="middle">${h}岁</text>`);const it=`<text class="cv-lbl" x="${(_.l-5).toFixed(1)}" y="${(T(2.4)+3).toFixed(1)}" text-anchor="end">吉</text><text class="cv-lbl" x="${(_.l-5).toFixed(1)}" y="${(T(0)+3).toFixed(1)}" text-anchor="end">平</text><text class="cv-lbl" x="${(_.l-5).toFixed(1)}" y="${(T(-1.8)+3).toFixed(1)}" text-anchor="end">忌</text>`,ue=i.slice().sort((h,le)=>o(le)-o(h)),E=ue[0],Y=ue[ue.length-1],J=E&&o(E)>.55?`<text class="cv-lbl" x="${y(d(E.startAge)+5).toFixed(1)}" y="${(T(o(E))-5).toFixed(1)}" text-anchor="middle">▲${E.startAge}岁 ${E.luck.tier}</text>`:"",pe=Y&&o(Y)<-.8?`<text class="cv-lbl" x="${y(d(Y.startAge)+5).toFixed(1)}" y="${(T(o(Y))+11).toFixed(1)}" text-anchor="middle">▼${Y.startAge}岁 ${Y.luck.tier}</text>`:"",de=`<div class="cv-legend">
      <span><i style="background:var(--quan)"></i>大运（阶梯，一步十年）</span>
      <span><i style="background:var(--ke)"></i>流年（逐年折线）</span>
      <span>绿带＝吉　灰带＝平　红带＝忌</span>
    </div>`,r=`<div class="cv-tip">曲线只呈现引擎已给出的行运评分（${c} ~ ${u}），不预测具体事件；档位与依据见下方「大运 / 流年」各节。悬停看逐年详情。</div>`;return`<div class="mp-curve">
      <div class="mp-curve-h"><b>人生运势曲线</b><span>${b}–${L} 岁　${e.dayun.rule}，${m} 岁起运${e.dayun.jiao&&e.dayun.jiao.at?`，交运 ${e.dayun.jiao.at}`:""}</span></div>
      <svg viewBox="0 0 ${w} ${N}" role="img" aria-label="人生运势曲线：${b} 到 ${L} 岁的大运与流年评分走势">
        ${H}${ze}${j}${M}${ce}${me}${Ce.join("")}${it}${J}${pe}
      </svg>
      ${de}${r}
    </div>`},s.trendChart=function(e){const i=e&&Array.isArray(e.points)?e.points:[];if(i.length<2)return"";const p=e&&Array.isArray(e.segments)?e.segments:[],d=E=>typeof E=="number"&&isFinite(E)?E:0,o=720,u=322,c={t:34,r:46,b:66,l:36},m=o-c.l-c.r,f=u-c.t-c.b,x=i.length,b=m/x,L=E=>c.l+(E+.5)*b,S=E=>c.t+f-Math.max(0,Math.min(100,E))/100*f,w=Math.max(1.1,Math.min(10,b*.62)),N=E=>d(E.score),_=c.t+f,ee=_+20,I=22,T=`klclip${(()=>{let E=2166136261;const Y=J=>{const pe=String(J??"");for(let de=0;de<pe.length;de++)E^=pe.charCodeAt(de),E=Math.imul(E,16777619)};Y(x),Y(i[0]&&i[0].age),Y(i[x-1]&&i[x-1].age);for(const J of i)Y(J&&J.score);return(E>>>0).toString(36)})()}`,ne=p.map((E,Y)=>{const J=Math.max(0,E.startAge-1),pe=Math.min(x-1,E.endAge-1);if(pe<J)return"";const de=c.l+J*b,r=Math.max(.6,(pe-J+1)*b),le=Y%2===1?`<rect class="kl-band" x="${de.toFixed(1)}" y="${c.t}" width="${r.toFixed(1)}" height="${f}"/><rect class="kl-stripband" x="${de.toFixed(1)}" y="${ee}" width="${r.toFixed(1)}" height="${I}"/>`:"",ae=Y===0?"":`<line class="kl-segline" x1="${de.toFixed(1)}" y1="${c.t}" x2="${de.toFixed(1)}" y2="${_}"/>`,$e=Math.min(Math.max(c.l+(J+pe+1)/2*b,c.l+22),c.l+m-22);return le+ae+`<text class="kl-seg" x="${$e.toFixed(1)}" y="${(ee+15).toFixed(1)}" text-anchor="middle">${a(E.ganZhi)}</text>`}).join(""),H=[0,25,50,75,100].map(E=>`<line class="kl-grid${E===50?" mid":""}" x1="${c.l}" y1="${S(E).toFixed(1)}" x2="${c.l+m}" y2="${S(E).toFixed(1)}"/><text class="kl-lbl" x="${c.l-6}" y="${(S(E)+3).toFixed(1)}" text-anchor="end">${E}</text>`).join(""),K=i.map((E,Y)=>{const J=E.kline||{},pe=d(J.open),de=d(J.close),r=Math.min(100,d(J.high)),h=Math.max(0,d(J.low)),le=de>=pe,ae=S(pe),$e=S(de),he=Math.min(ae,$e),we=Math.max(.8,Math.abs(ae-$e)),nt=L(Y),st=`${E.age}岁（${E.year}年 ${E.ganZhi}）${de}分${E.dayunGanZhi?` · ${E.dayunGanZhi}运`:""}`;return`<g class="kl-c${le?" up":" down"}"><title>${a(st)}</title><line x1="${nt.toFixed(2)}" y1="${S(r).toFixed(1)}" x2="${nt.toFixed(2)}" y2="${S(h).toFixed(1)}"/><rect x="${(nt-w/2).toFixed(2)}" y="${he.toFixed(1)}" width="${w.toFixed(2)}" height="${we.toFixed(1)}" rx="0.7"/></g>`}).join(""),$=E=>{const Y=[];for(let J=0;J<x;J++){if(J+1<E)continue;let pe=0;for(let de=J+1-E;de<=J;de++)pe+=N(i[de]);Y.push({i:J,v:pe/E})}return Y},M=E=>$(E).map((Y,J)=>`${J?"L":"M"}${L(Y.i).toFixed(1)} ${S(Y.v).toFixed(1)}`).join(" "),j=(E,Y)=>{const J=$(E);if(!J.length)return"";const pe=J[J.length-1];return{cls:Y,y:S(pe.v),text:`<text class="kl-ma-lbl ${Y}" x="${c.l+m+5}" y="${S(pe.v).toFixed(1)}" text-anchor="start">${pe.v.toFixed(0)}</text>`}},W=j(10,"m10"),ce=j(5,"m5"),ve=(()=>{if(!ce||!W)return`${W?W.text:""}${ce?ce.text:""}`;let E=ce.y,Y=W.y;if(Math.abs(E-Y)<10){const J=Math.min(E,Y),pe=Math.max(E,Y);E=J-6,Y=pe+6}return`<text class="kl-ma-lbl m10" x="${c.l+m+5}" y="${Y.toFixed(1)}" text-anchor="start">${$(10).slice(-1)[0].v.toFixed(0)}</text><text class="kl-ma-lbl m5" x="${c.l+m+5}" y="${E.toFixed(1)}" text-anchor="start">${$(5).slice(-1)[0].v.toFixed(0)}</text>`})();let te=i[0],me=i[0];for(const E of i)N(E)>N(te)&&(te=E),N(E)<N(me)&&(me=E);const ze=(E,Y,J)=>{const pe=i.indexOf(E),de=L(pe),r=S(N(E)),h=Math.min(Math.max(de,c.l+26),c.l+m-26),le=Y==="hi"?r-8<c.t+6?14:J:r+12>c.t+f-2?-8:J;return`<g class="kl-mark ${Y}"><circle cx="${de.toFixed(1)}" cy="${r.toFixed(1)}" r="2"/><circle class="ring" cx="${de.toFixed(1)}" cy="${r.toFixed(1)}" r="4.6"/><text x="${h.toFixed(1)}" y="${(r+le).toFixed(1)}" text-anchor="middle">${E.age}岁 ${N(E)}</text></g>`},De=x>60?10:5,Ce=i.filter(E=>E.age%De===0).map(E=>`<text class="kl-lbl age" x="${L(i.indexOf(E)).toFixed(1)}" y="${(_+14).toFixed(1)}" text-anchor="middle">${E.age}</text>`).join(""),it=`<text class="kl-lbl axis" x="${c.l}" y="${(u-6).toFixed(1)}">年龄（岁）</text><text class="kl-lbl axis" x="${c.l+m}" y="${(u-6).toFixed(1)}" text-anchor="end">每岁一分 · 满分 100</text>`;return`<div class="mp-kline-fig">
      <svg viewBox="0 0 ${o} ${u}" role="img" aria-label="人生K线：1 到 ${x} 岁的逐年评分蜡烛图">
        <defs><clipPath id="${T}"><rect x="${c.l}" y="${c.t}" width="${m}" height="${f}"/></clipPath></defs>
        ${ne}${H}
        <g clip-path="url(#${T})">
          ${K}
          <path class="kl-ma m10" d="${M(10)}"/><path class="kl-ma m5" d="${M(5)}"/>
        </g>
        ${ve}
        ${ze(te,"hi",-8)}${ze(me,"lo",12)}
        ${Ce}${it}
      </svg><div class="kl-legend"><span><i class="up"></i>阳线：比上一岁高</span><span><i class="down"></i>阴线：比上一岁低</span><span><i class="m5"></i>5 年均线</span><span><i class="m10"></i>10 年均线</span><span>虚线＝大运交界</span></div></div>`},s.trendHTML=function(e,i){if(!e)return"";const p=!(i&&i.brief===!1),d=s.trendChart(e);if(!d)return s.quickHTML(e);const o=Array.isArray(e.segments)?e.segments:[],u=e.highlights&&typeof e.highlights=="object"?e.highlights:{},c=e.meta||{},m=c.strength||{},f=o.map(H=>`<span class="kl-chip">${a(H.ganZhi)}<em>${H.startAge}–${H.endAge}</em></span>`).join(""),x=(Array.isArray(u.best)?u.best:[]).map(H=>`<div class="kl-hl hi">${a(H)}</div>`).join(""),b=(Array.isArray(u.worst)?u.worst:[]).map(H=>`<div class="kl-hl lo">${a(H)}</div>`).join(""),L=c.boundaryNote?`<div class="mp-kline-note">${a(c.boundaryNote)}</div>`:u.suppressed?`<div class="mp-kline-note">${a(u.suppressed)}</div>`:"",S=Array.isArray(e.points)?e.points:[],w=H=>typeof H.score=="number"&&isFinite(H.score)?H.score:0,N=S.map(w),_=N.length?N.reduce((H,K)=>H+K,0)/N.length:0,ee=N.length?Math.max(...N)-Math.min(...N):0,I=o.map(H=>{const K=S.filter($=>$.age>=H.startAge&&$.age<=H.endAge).map(w);return{ganZhi:H.ganZhi,v:K.length?K.reduce(($,M)=>$+M,0)/K.length:0}}).filter(H=>H.v>0).sort((H,K)=>K.v-H.v),y=!!(m.boundary||u.suppressed),T=[`<span><em>全段均值</em><b>${_.toFixed(0)}</b></span>`];!y&&I.length&&(T.push(`<span><em>最好大运</em><b class="hi">${a(I[0].ganZhi)} ${I[0].v.toFixed(0)}</b></span>`),T.push(`<span><em>最差大运</em><b class="lo">${a(I[I.length-1].ganZhi)} ${I[I.length-1].v.toFixed(0)}</b></span>`)),T.push(`<span><em>波动幅度</em><b>${ee.toFixed(0)}</b></span>`);const ne=`<div class="kl-stats">${T.join("")}</div>`;return(p?s.briefHTML(e):"")+`<section class="mp-kline" aria-label="人生K线结果">
      <div class="mp-kline-h"><b>人生 K 线</b><span>${a(c.birth||"")}　日主 ${a(c.dayMaster||"")}　${a(m.level||"")}${m.score?`（${m.score}）`:""}</span></div>
      ${d}
      ${ne}
      ${f?`<div class="kl-segs">${f}</div>`:""}
      ${x||b?`<div class="kl-hls">${x}${b}</div>`:""}
      ${L}
      <div class="mp-kline-tip">逐岁分数由大运与流年十神按固定表确定性计分（1–100），只表五行力量的顺逆，不预测具体事件；旺衰落在换档阈值附近时，不出高低年份结论。</div>
    </section>`},s.chengguHTML=function(e){if(!e)return"";const i=e.weights||{},p=e.song||{},d=["year","month","day","hour"].map(m=>{const f=i[m]||{label:"",qian:0},x=String(f.label||"").split(" ")[0]||"",b=String(f.label||"").split(" ")[1]||"";return`<div class="cg-cell"><em>${a(x)}</em><b>${a(b)}</b></div>`}).join(""),o=String(p.text||""),u=o?o.replace(/[。]$/,"").split("；").map((m,f)=>`<span>${a(m)}${f===0?"；":"。"}</span>`).join(""):"",c=e.verdict&&e.verdict.band?e.verdict.band:"";return`<section class="mp-cg" aria-label="称骨结果">
      <div class="mp-cg-h"><b>称骨</b><span>${a(e.lunar&&e.lunar.text?e.lunar.text:"")}</span></div>
      <div class="mp-cg-w">${d}</div>
      <div class="mp-cg-tot"><em>骨重合计</em><b>${a(e.total&&e.total.label?e.total.label:"")}</b>${c?`<i>${a(c)}</i>`:""}</div>
      <div class="mp-cg-song"><div class="mp-cg-song-h">称骨歌 · ${a(e.total&&e.total.label?e.total.label:"")}</div>
        <div class="mp-cg-verse">${u||'<span class="mp-cg-miss">该骨重未见通行本歌诀</span>'}</div>
        <div class="mp-cg-plain"><em>释义</em>${a(p.plain||"")}</div></div>
      ${e.verdict&&e.verdict.text?`<div class="mp-cg-band"><em>分档</em>${a(e.verdict.text)}</div>`:""}
      <div class="mp-cg-note">骨重与歌诀为通行本口径（各版本歌诀有异文，断句标点已统一）；释义为白话自撰，只作字面直解，属民俗娱乐参考，不构成命运断言。</div>
    </section>`},s.nameHTML=function(e){if(!e)return"";const i={木:"wood",火:"fire",土:"earth",金:"metal",水:"water"},p=x=>x==="未收录"?'<span class="mp-nm-el">未收录</span>':`<span class="mp-nm-el wx-${i[x]||"earth"}">${a(x)}</span>`,d=(x,b)=>`<div class="mp-nm-h"><b>${a(x)}</b>${b?`<i>${a(b)}</i>`:""}</div>`;if(e.action==="generate"){const x=e.bazi&&e.bazi.favorable?e.bazi.favorable.join("、"):"",b=(e.candidates||[]).map(L=>{const S=L.wuge&&L.wuge.available?(()=>{const N=L.wuge.rows.filter(I=>I.level==="吉").length,_=L.wuge.rows.filter(I=>I.level==="凶").length;return`<span class="mp-nm-fit${_===0&&N>=4?" ok":_>=2?" no":""}" title="${a(L.wuge.summary)}">五格 ${N}/5 吉</span>`})():"",w=L.phonetics&&L.phonetics.available?`<span class="mp-nm-fit${L.phonetics.level==="拗口"?" no":L.phonetics.level==="顺口"?" ok":""}" title="${a((L.phonetics.issues||[]).map(N=>N.text).join("；"))}">${a(L.phonetics.level)}</span>`:"";return`<div class="mp-nm-c"><b>${a(L.name)}</b><span class="mp-nm-els">${L.chars.map(N=>p(N.element)).join("")}${S}${w}</span><em>${a(L.chars.map(N=>N.char+"·"+N.meaning).join("　"))}</em></div>`}).join("");return`<section class="mp-nm" aria-label="候选名">
        ${d("候选名",`姓 ${e.surname}（${e.gender}）${x?`　喜用 ${x}`:""}`)}
        <div class="mp-nm-cand">${b}</div>
        <div class="mp-nm-note">${(e.notes||[]).map(L=>"※ "+a(L)).join("<br>")}</div>
      </section>`}const o=(e.chars||[]).map(x=>{const b=x.favorable===!0?'<span class="mp-nm-fit ok">合喜用</span>':x.favorable===!1?'<span class="mp-nm-fit no">不合喜用</span>':'<span class="mp-nm-fit">不判</span>',L=x.source==="user"?"用户指定":x.source==="lib"?"字库":"未收录",S=x.suggest&&x.suggest.length?`<div class="mp-nm-sug"><b>可换</b>${x.suggest.map(w=>`<span class="wx-${i[w.element]||"earth"}">${a(w.char)}（${a(w.element)}）</span>`).join("")}</div>`:"";return`<div class="mp-nm-row"><div class="mp-nm-ch">${a(x.char)}</div>
        <div class="mp-nm-b"><div class="mp-nm-t">${p(x.element)}<span>${a(L)}</span>${b}</div>
        <div class="mp-nm-m">${a(x.meaning)}</div>${S}</div></div>`}).join(""),u=e.bazi?`<div class="mp-nm-m">八字：${a(e.bazi.dayMaster&&e.bazi.dayMaster.stem?`${e.bazi.dayMaster.stem}（${e.bazi.dayMaster.element}）`:String(e.bazi.dayMaster||""))}　${a(e.bazi.strength?`${e.bazi.strength.level}（${e.bazi.strength.score}）`:"")}　喜用 ${a((e.bazi.favorable||[]).join("、"))}</div>
         <div class="mp-nm-m">${a(e.bazi.basis||"")}</div>`:"",c=x=>x==="吉"?"is-ok":x==="半吉"?"is-half":"is-bad",m=e.wuge&&e.wuge.available?`<div class="mp-nm-wu">
          <div class="mp-nm-wu-h"><b>五格</b><i>康熙笔画 · 通行本 81 数理</i></div>
          <div class="mp-nm-wu-rows">${e.wuge.rows.map(x=>`<div class="mp-nm-wu-c ${c(x.level)}"><em>${a(x.key)}</em><b>${x.strokes}</b><i>${a(`${x.level} · ${x.name}`)}</i></div>`).join("")}</div>
          <div class="mp-nm-m">笔画：${e.wuge.strokes.map(x=>`${a(x.char)}${x.strokes}${x.source==="user"?"（指定）":""}`).join(" ＋ ")}</div>
          <div class="mp-nm-m">三才：${a(e.wuge.sancai.text)}</div>
        </div>`:`<div class="mp-nm-wu"><div class="mp-nm-wu-h"><b>五格</b><i>这一版算不了</i></div><div class="mp-nm-m">${a(e.wuge?e.wuge.reason:"未算")}</div></div>`,f=e.phonetics&&e.phonetics.available?`<div class="mp-nm-ph"><b>音韵</b><span class="mp-nm-ph-lv${e.phonetics.level==="顺口"?" ok":e.phonetics.level==="拗口"?" bad":" warn"}">${a(e.phonetics.level)}</span><em>${a(e.phonetics.chars.map(x=>`${x.py}${x.tone}`).join(" "))}　声调 ${a(e.phonetics.tonePattern)}${(e.phonetics.alt||[]).length?`　又读 ${a(e.phonetics.alt.map(x=>`${x.char} ${x.py}${x.tone}`).join("、"))}`:""}</em>${(e.phonetics.issues||[]).map(x=>`<span class="mp-nm-ph-i">${a(x.text)}</span>`).join("")}</div>`:`<div class="mp-nm-ph"><b>音韵</b><em>${a(e.phonetics?e.phonetics.reason:"未算")}</em></div>`;return`<section class="mp-nm" aria-label="名字评估">
      ${d(e.fullName||"",`字库 ${e.stats&&e.stats.libSize?e.stats.libSize:""} 字${e.stats&&e.stats.unknown?`　未收录 ${e.stats.unknown}`:""}`)}
      ${o}
      ${u}
      ${m}
      ${f}
      <div class="mp-nm-verd">${a(e.verdict||"")}</div>
      <div class="mp-nm-note">${(e.notes||[]).map(x=>"※ "+a(x)).join("<br>")}</div>
    </section>`},s.briefHTML=function(e){return e&&e.brief?s.summaryHTML(e.brief):""},s.summaryHTML=function(e){if(!e||!e.lead)return"";const i=(e.sections||[]).map(o=>`<div class="mp-br-sec"><b>${a(o.h)}</b><p>${a(o.t)}</p></div>`).join(""),p=e.advice&&e.advice.length?`<div class="mp-br-adv"><b>可以试着做的</b><ul>${e.advice.map(o=>`<li>${a(o)}</li>`).join("")}</ul></div>`:"",d=e.chips&&e.chips.length?`<div class="mp-br-chips">${e.chips.map(o=>`<span>${a(o)}</span>`).join("")}</div>`:"";return`<section class="mp-br" aria-label="先说结论">
      <div class="mp-br-h"><b>${a(e.title||"先看这一张")}</b>${d}</div>
      <p class="mp-br-lead">${a(e.lead)}</p>
      ${i}
      ${p}
      ${e.caveat?`<p class="mp-br-cav">※ ${a(e.caveat)}</p>`:""}
      ${e.footer?`<p class="mp-br-foot">${a(e.footer)}</p>`:""}
    </section>`},s.baziHTML=function(e){const i=[["year","年柱"],["month","月柱"],["day","日柱"],["hour","时柱"]].filter(([r])=>e.pillars[r]),p={year:"年",month:"月",day:"日",hour:"时"},d={木:"wood",火:"fire",土:"earth",金:"metal",水:"water"},o={比肩:"tg-bi",劫财:"tg-bi",食神:"tg-shi",伤官:"tg-shi",偏财:"tg-cai",正财:"tg-cai",七杀:"tg-guan",正官:"tg-guan",偏印:"tg-yin",正印:"tg-yin"},u=r=>`<span class="tg ${o[r]||""}">${r}</span>`,c=r=>`<span class="wx-${d[r]||"earth"}">${F(r)}${r}</span>`,m=r=>`<span class="ss-s ${r.luck||"neutral"}" title="${a(`${r.cat} · ${r.via}查${r.target} ｜ ${r.rule}`)}">${r.name}</span>`,f=(r,h)=>`<tr><td class="bz-lbl">${r}</td>${i.map(([le])=>`<td data-c="${p[le]}">${h(e.pillars[le],le)}</td>`).join("")}</tr>`,x=`<thead><tr><th></th>${i.map(([r,h])=>`<th${r==="day"?' class="bz-hdr-day"':""}>${h}</th>`).join("")}</tr></thead>`,b={寅:"木",卯:"木",巳:"火",午:"火",申:"金",酉:"金",亥:"水",子:"水",辰:"土",戌:"土",丑:"土",未:"土"},L={木:"火",火:"土",土:"金",金:"水",水:"木"},S={木:"土",土:"水",水:"火",火:"金",金:"木"},w=b[e.pillars.month.branch]||"土",N=["木","火","土","金","水"],_=r=>r===w?"旺":L[w]===r?"相":L[r]===w?"休":S[r]===w?"囚":"死",ee=`<tr><td class="bz-lbl">五行</td><td class="bz-wxs" colspan="${i.length}">${["旺","相","休","囚","死"].map(r=>{const h=N.find(le=>_(le)===r)||w;return`<i><b class="wx-${d[h]}">${h}</b><em>${r}</em></i>`}).join("")}</td></tr>`,I=[f("十神",(r,h)=>h==="day"?`<span class="bz-zhuri">${e.input.gender==="male"?"元男":"元女"}</span>`:r.stemTenGod?u(r.stemTenGod):'<span class="pp-dim">—</span>'),f("天干",r=>`<span class="bz-big ${"wx-"+d[r.stemElement]}">${r.stem}</span>`),f("地支",r=>`<span class="bz-big ${"wx-"+d[r.branchElement]}">${r.branch}</span>`),f("藏干",r=>r.hidden.map(h=>`<i class="bz-cg wx-${d[h.element]}">${h.stem}·${h.element}</i>`).join("")),f("支神",r=>r.hidden.map(h=>u(h.tenGod)).join("<br>")),f("纳音",r=>r.nayin),f("空亡",r=>`<span class="pp-dim">${r.kongwang.join("")}</span>`),f("地势",r=>r.dishi),f("自坐",r=>r.zizuo),f("神煞",r=>r.shenshaDetail&&r.shenshaDetail.length?`<span class="pp-ss">${r.shenshaDetail.map(m).join("")}</span>`:'<span class="pp-dim">—</span>'),ee].join(""),y=Object.entries(e.wuxing).map(([r,h])=>`<span class="pp-chip wx-${d[r]}">${F(r)}${r} ${h}</span>`).join(""),T=e.frame||{},ne=r=>r==="大吉"||r==="吉"?"ok":r==="大忌"||r==="忌"?"warn":"",H=(r,h)=>h?`<div class="pp-sec"><div class="pp-sec-h">${r}</div>${h}</div>`:"",K=T.geju&&T.geju.length?`
      <div class="pp-tl">${T.primary?`主格 <b>${a(T.primary.name)}</b>　${a(T.primary.evidence)}`:""}</div>
      <div class="pp-chips">${T.geju.map(r=>{const h=r.status==="破格",le=r.status==="待定"||r.status==="假从",ae=`${r.evidence||""}${Array.isArray(r.breaks)&&r.breaks.length?`；破：${r.breaks.join("；")}`:""}`;return`<span class="pp-chip ${h?"broken":le?"warn":""}" title="${a(ae)}">${a(r.name)}<i class="pp-drel">${a(r.kind)}${r.status?`·${a(r.status)}`:""}</i></span>`}).join("")}</div>`:"",$=(()=>{const r=Array.isArray(T.yongshen&&T.yongshen.neutral)?T.yongshen.neutral:[],h=new Set(T.yongshen&&T.yongshen.neutralTenGods||[]);return`${(T.yongshen&&T.yongshen.avoidTenGods||[]).filter(ae=>!h.has(ae)).map(ae=>`<span class="pp-chip warn">${a(ae)}</span>`).join("")}${[...h].map(ae=>`<span class="pp-chip neu" title="局中分量近零，按中性偏忌看">${a(ae)}</span>`).join("")}${r.length?`<span class="pp-chip neu" title="忌神中全局不足 0.5 分的那几行；仍在忌里参与行运评分">中性偏忌 ${r.map(ae=>`${a(ae.element)} ${a(ae.weight)} 分`).join("、")}</span>`:""}`})(),M=T.yongshen?`
      <div class="pp-tl">喜 ${T.yongshen.favor.map(c).join("")}　忌 ${T.yongshen.avoid.map(c).join("")}　<span class="pp-dim">${a(T.yongshen.method)}</span></div>
      <div class="pp-chips">${T.yongshen.favorTenGods.map(r=>`<span class="pp-chip ok">${a(r)}</span>`).join("")}${$}</div>
      ${(T.yongshen.disputed||[]).length?`<div class="pp-tl pp-dim">有争议：${T.yongshen.disputed.map(r=>`${a(r.element)}（扶抑为${a(r.favorRole)}·${a(r.favorVerb)}，${a(r.climate)}盘调候忌${a(r.element)}）`).join("、")}　保留在喜用，不列入忌</div>`:""}
      <div class="pp-tl pp-dim">${a(T.yongshen.detail)}</div>`:"",j=e.climate||T.yongshen&&T.yongshen.climate||null,W=j?(()=>{const r=Math.max(2,Math.min(98,Math.round(((Number(j.temp)||0)+3)/6*100))),h=j.need?`<em>调候取</em><b>${a(j.need.stem+j.need.element)}</b>`:"<em>气候平和</em>",le=!!(T.yongshen&&Array.isArray(T.yongshen.disputed))&&T.yongshen.disputed.some(st=>st.element===j.avoidElement),ae=j.need?`<em>忌</em><b>${a(j.avoidElement)}</b>${le?'<span class="pp-dim">（有争议）</span>':""}`:"",$e=(j.evidence||[]).length?`<em>依据</em><span>${a(j.evidence.join("、"))}</span>`:"",he=j.priority==="调候优先"?'<span class="mp-cli-p">调候优先</span>':'<span class="mp-cli-p">扶抑为主</span>',we=e.frame&&e.frame.yongshen&&e.frame.yongshen.qt,nt=we?`<div class="mp-qt">
          <div class="mp-qt-h"><b>穷通宝鉴</b><span>${a(we.label)}</span></div>
          <div class="mp-qt-y"><em>用神</em>${we.yong.map((st,aa)=>`<b class="${aa===0?"first":""}">${a(st)}</b>`).join("")}<em>首取 ${a(we.primary)}</em></div>
          <div class="mp-qt-q" title="${a(we.quote)}">「${a(we.quote)}」<span>第 ${we.chapter} 章${we.truncated?" · 首段更长，摘句下略":""}${we.note?" · "+a(we.note):""}</span></div>
        </div>`:"";return`<section class="mp-cli" aria-label="寒暖燥湿">
        <div class="mp-cli-h"><b>寒暖燥湿</b><span class="mp-cli-k">${a(j.label||"")}</span>${he}</div>
        <div class="mp-cli-bar" title="寒 ← → 热"><i style="left:${r}%"></i></div>
        <div class="mp-cli-axis"><span>寒</span><span>平</span><span>热</span></div>
        <div class="mp-cli-row">${h}${ae}${$e}</div>
        <div class="mp-cli-narr">${a(j.narration||"")}</div>
        ${nt}
      </section>`})():"",ce=T.godStats?`<div class="pp-chips">${Object.entries(T.godStats.groups).map(([r,h])=>`<span class="pp-chip">${r} ${h}</span>`).join("")}</div>`:"",ve=e.dayun.list.map(r=>{const h=r.luck||null;return`<span class="pp-chip ${h?ne(h.tier):""}" title="${a(`${r.fromDate?`${r.fromDate} 交运；`:""}${h?`${h.tier} ${h.score}｜${(h.reasons||[]).join("；")}`:""}`)}">${r.startAge} ${r.ganzhi}${r.relations&&r.relations.length?` <i class="pp-drel">${r.relations.join("")}</i>`:""}${h?` ${h.tier}`:""}</span>`}).join(""),te=e.liunian&&e.liunian.length?`<div class="pp-chips">${e.liunian.slice(0,8).map(r=>{const h=r.luck||null,le=r.suiyun&&Array.isArray(r.suiyun.signals)?r.suiyun.signals:[],ae=le.length?`｜${le.map($e=>$e.detail).join("；")}`:"";return`<span class="pp-chip ${h?ne(h.tier):""}" title="${a(h?`${h.tier} ${h.score}｜${(h.reasons||[]).join("；")}${ae}`:ae.replace(/^｜/,""))}">${r.year} ${r.ganzhi}${h?` ${h.tier}`:""}</span>`}).join("")}</div>`:"",me=(e.liunian||[]).filter(r=>r.suiyun&&Array.isArray(r.suiyun.signals)&&r.suiyun.signals.length),ze=e.suiyunClassic,De=ze?`<div class="pp-dim pp-sy-src" title="${a(ze.plain||"")}">《${a(ze.bookName||"")}·${a(ze.chapter||"")}》「${a(ze.quote||"")}」</div>`:"",Ce=me.length?`<div class="pp-tl pp-dim">岁运提示（只标干支变动，不判吉凶）</div><div class="pp-chips">${me.map(r=>`<span class="pp-chip" title="${a(`${r.suiyun.signals.map(h=>h.detail).join("；")}｜${r.suiyun.note||""}`)}">${r.year} ${a(r.suiyun.signals.map(h=>`${h.type}${(h.type.startsWith("流年")||h.type.startsWith("大运"))&&h.target?`·${h.target}`:""}`).join("/"))}</span>`).join("")}</div>${De}`:"",it=e.strength?`<div class="pp-str">日主强弱：<b>${e.strength.level}</b>${e.strength.score}　<span class="pp-dim">${e.strength.detail}</span></div>`:"",ue=e.strength&&e.strength.branchStructure,E=ue?(()=>{const r=ue.branches.map(he=>`${a(he.label)}${a(he.branch)}<i class="pp-drel">·${a(he.camp)}</i>${ue.placeholderHour&&he.key==="hour"?'<span class="pp-dim">占位</span>':""}`).join(" "),h=ue.odd&&ue.odd.length?`<span class="pp-st-odd">异类 ${ue.odd.map(he=>`${a(he.label)}${a(he.branch)}（${he.weight}分）`).join("、")}</span>`:'<span class="pp-st-odd">无异类</span>',le=ue.congProb!=null?`　从格 ${a(ue.congRange)}`:"　不套从格概率",ae=ue.balance||{},$e=ae.branch?`　支 ${ae.branch.A}:${ae.branch.B}　合干 ${ae.total?`${ae.total.A}:${ae.total.B}`:"—"}`:"";return`<div class="pp-struct" title="${a(`${ue.method}；${ue.note}`)}"><span class="pp-st-code">${a(ue.code)}</span>${r}　${h}${le}${$e}<span class="pp-dim">　静态结构，只作标注，不改上面的旺衰评分</span></div>`})():"",Y=e.relations&&Array.isArray(e.relations.anhe)?e.relations.anhe:[],J=Y.length?`<div class="pp-anhe" title="${a(e.relations.anheNote||"")}"><b>暗合</b>${Y.map(r=>a(r)).join("　")}<span class="pp-dim">　另列，不并入上面的合冲刑害；${Y.length===1?"只一对，按口径可忽略":`共 ${Y.length} 对`}</span></div>`:"",pe=e.shensha&&e.shensha.groups||[],de=pe.length?`
      <div class="pp-ssx">
        <div class="ssx-h"><b>神煞全览</b><span>共 ${e.shensha.count} 见 · ${pe.length} 类 · 悬停看查法</span></div>
        ${pe.map(r=>`<div class="pp-ssg"><span class="ssg-gt">${r.cat}</span><span class="ssg-gi">${r.items.map(h=>`<span class="pp-ssi ${h.luck||"neutral"}" title="${a(`${h.via}查${h.target} ｜ ${h.rule}`)}">${h.name}<em>${h.pillars.map(le=>p[le]||"").join("")}</em></span>`).join("")}</span></div>`).join("")}
        <div class="ssx-h" style="border-top:none;padding-top:4px;margin-top:4px">神煞只作参考，吉凶仍须看格局、旺衰与行运。</div>
      </div>`:"";return s.briefHTML(e)+`<div class="pp" style="padding:12px">
      <table class="pp-bz">${x}<tbody>${I}</tbody></table>
      ${e.hourUnknown?'<div class="pp-warn" role="note">时柱暂缺：只排年/月/日三柱，起运与交运按日估算。时柱按正午暂算，涉及时柱的结论仅供参考。</div>':""}
      <div class="pp-rel"><div><b>天干</b>${e.relations&&e.relations.stems.length?e.relations.stems.join(" · "):"—"}</div>
      <div><b>地支</b>${e.relations&&e.relations.branches.length?e.relations.branches.join(" · "):"—"}</div></div>
      ${it}
      ${E}
      ${J}
      ${H("格局",K)}
      ${H("用神",M)}
      ${W}
      ${Array.isArray(e.classics)&&e.classics.length?`<section class="mp-cl" aria-label="古籍原文">
        <div class="mp-cl-h"><b>古籍原文</b><span>照录通行本，释义为白话自撰</span></div>
        ${e.classics.map(r=>`<div class="mp-cl-e">
          <div class="mp-cl-t"><b>${a(({ziping:"子平真诠",ditian:"滴天髓",sanming:"三命通会"}[r.book]||r.book)+"·"+r.chapter)}</b></div>
          <div class="mp-cl-q">「${a(r.quote)}」</div>
          <div class="mp-cl-p">${a(r.plain)}</div>
        </div>`).join("")}
      </section>`:""}
      ${H("五行与十神",`<div class="pp-chips">${y}</div>${ce}`)}
      ${H("大运",`${s.curveHTML(e)}<div class="pp-chips">${ve}</div>`)}
      ${te?H("流年",te+Ce):""}
      ${e.palaces?H("胎命身",`<div class="pp-chips">
        <span class="pp-chip" title="${a(e.palaces.taiyuan.note)}">胎元 ${a(e.palaces.taiyuan.ganzhi)}</span>
        ${e.palaces.taixi?`<span class="pp-chip" title="${a(e.palaces.taixi.note)}">胎息 ${a(e.palaces.taixi.ganzhi)}</span>`:""}
        ${e.palaces.minggong?`<span class="pp-chip" title="${a(e.palaces.minggong.note)}">命宫 ${a(e.palaces.minggong.ganzhi)}</span>`:""}
        ${e.palaces.shengong?`<span class="pp-chip" title="${a(e.palaces.shengong.note)}">身宫 ${a(e.palaces.shengong.ganzhi)}</span>`:""}
        ${!e.palaces.minggong||!e.palaces.shengong?'<span class="pp-chip" title="命宫与身宫由生月与生时支合数定宫；时柱暂缺，这两宫不排">命宫·身宫 时柱暂缺不排</span>':""}
      </div>`):""}
      ${de}
      <div style="margin-top:8px;font-size:12px;color:var(--muted)">上一节 ${e.jieqi.previous.name} ${e.jieqi.previous.time}　下一节 ${e.jieqi.next.name} ${e.jieqi.next.time}　${e.dayun.rule}，${e.dayun.startAge.years}岁起运${e.dayun.jiao&&e.dayun.jiao.at?`（交运 ${e.dayun.jiao.at}，${e.dayun.jiao.frame}）`:""}${e.dayun.startAgeExact&&Number.isInteger(e.dayun.startAgeExact.years)?`　精确 ${e.dayun.startAgeExact.years}年${e.dayun.startAgeExact.months}月${e.dayun.startAgeExact.days}天${e.dayun.startAgeExact.hours}时（截断到日时；上面是四舍五入到月）`:""}</div>
    </div>`};const kt={natal:"命盘解析",divination:"卦象解析",card:"牌阵解析"},Yt={同向:"good",有张力:"watch",互补:"alt"},Ge=e=>`<div class="mp-cross">${e.map(i=>{const p=Yt[i.stance]||"plain";return`<div class="mp-cross-row">
      <div class="mp-cross-h"><span class="mp-cross-l">${a(i.label)}</span><span class="mp-cross-tag t-${p}">${a(i.stance||"—")}</span></div>
      <div class="mp-cross-b">
        <div class="mp-cross-cell"><b>八字</b><span>${a(i.bazi||"—")}</span></div>
        <div class="mp-cross-cell"><b>紫微</b><span>${a(i.ziwei||"—")}</span></div>
      </div>
      ${i.note?`<div class="mp-cross-note">${a(i.note)}</div>`:""}
    </div>`}).join("")}</div>`;s.interpretHTML=function(e,i){if(!e||!(e.dimensions&&e.dimensions.length||e.sections&&e.sections.length)&&!e.error&&!e.answer)return"";const d=!!(i&&i.folded);let o=-1;(e.dimensions||[]).forEach(($,M)=>{$.knowledge&&$.knowledge.length&&(o=M)});const u=(e.dimensions||[]).map(($,M)=>`<div class="mp-it-dim${$.focused?" focus":""}">
      <div class="mp-it-dh"><span class="mp-it-dno">${M+1}</span><span class="mp-it-dlabel">${a($.label)}</span>${$.focused?'<span class="mp-it-focus">最贴近你的问题</span>':""}${$.confidence?`<span class="mp-it-conf c-${a($.confidence)}">置信度 ${a($.confidence)}</span>`:""}</div>
      ${$.plain?`<div class="mp-it-dplain">${a($.plain)}</div>`:""}
      <div class="mp-it-dtext">${a($.text)}</div>
      ${$.evidence&&$.evidence.length?`<details class="mp-it-ev"><summary>依据 · ${a($.evidence.length)} 条盘面事实</summary><div class="mp-it-ev-body">${$.evidence.map(j=>`<span class="mp-it-ev-item">${a(j)}</span>`).join("")}<span class="mp-it-ev-tech">技法：${a(e.technique||e.systemLabel||"")}</span></div></details>`:""}
      ${$.knowledge&&$.knowledge.length?`<div class="mp-it-know">${$.knowledge.map(j=>`<div class="know-row"><span class="know-status ${j.status}">${a(j.statusLabel)}</span><span class="know-body"><b>${a(j.gist)}</b>${a(j.detail)}${j.source?`<i>出处：${a(j.source)}</i>`:""}${j.note?`<em>注：${a(j.note)}</em>`:""}</span></div>`).join("")}${M===o&&e.knowledgeNote?`<div class="know-disc">${a(e.knowledgeNote)}</div>`:""}</div>`:""}
      ${$.advice?`<div class="mp-it-adv"><b>建议</b>${a($.advice)}</div>`:""}
    </div>`).join(""),c=e.outline&&e.outline.length?`<div class="mp-outline"><div class="mp-outline-h">一页读懂</div>${e.outline.map($=>`<div class="mp-outline-row"><b>${a($.label)}</b><span>${a($.text)}</span></div>`).join("")}</div>`:"",m=e.sections&&e.sections.length?`<nav class="mp-toc" aria-label="报告目录">${e.sections.map($=>`<a href="#mp-sec-${a($.key)}">${a($.label)}</a>`).join("")}</nav>`:"",f=e.tables&&e.tables.length?`<div class="mp-tables">${e.tables.filter($=>Array.isArray($.rows)&&$.rows.length).map($=>`<div class="mp-table-wrap">
          <div class="mp-table-h">${a($.title)}</div>
          <div class="mp-table-scroll"><table class="mp-table">
            <thead><tr>${$.columns.map(M=>`<th scope="col">${a(M)}</th>`).join("")}</tr></thead>
            <tbody>${$.rows.map(M=>`<tr>${M.map((j,W)=>`<td data-label="${a($.columns[W]||"")}">${a(j)}</td>`).join("")}</tr>`).join("")}</tbody>
          </table></div>
        </div>`).join("")}</div>`:"",x=$=>String($||"").split(`
`).map(M=>`<div class="mp-it-p">${a(M).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>")}</div>`).join(""),b=e.sections&&e.sections.length?`<div class="mp-it-secs">${e.sections.map($=>`<div class="mp-it-sec${$.tone?` tone-${a($.tone)}`:""}" id="mp-sec-${a($.key)}">
        <div class="mp-it-sh">${a($.label)}</div>
        <div class="mp-it-stext">${Array.isArray($.items)&&$.items.length?Ge($.items):x($.text)}</div>
      </div>`).join("")}</div>`:"",L=[e.systemLabel,kt[e.moduleType]||e.moduleType].filter(Boolean),S=e.ask,w=S&&S.question?a(S.question):"",N=S&&(w||S.direction&&S.direction!=="general")?`<div class="mp-it-ask">${w?`<span class="ask-q">问题：${w}</span><span class="ask-sep">｜</span>`:""}<span class="ask-d">询问方向：${a(S.directionLabel||"综合")}</span></div>`:"",_=e.answer?`<div class="mp-it-ans"><b>${w?"先答所问":"先看结论"}</b>${a(e.answer)}</div>`:"",ee=e.plain?`<div class="mp-it-plain"><b>说人话</b>${a(e.plain)}</div>`:"",I=e.followups&&e.followups.length?`<div class="mp-it-fu"><b>还可以这样追问</b><ul>${e.followups.map($=>`<li>${a($)}</li>`).join("")}</ul></div>`:"",y=e.glossary&&e.glossary.length?`<details class="mp-it-gloss"><summary>名词解释（${e.glossary.length} 条）</summary>${e.glossary.map($=>`<div><span>${a($.term)}</span>${a($.plain)}</div>`).join("")}</details>`:"",T=e.limits&&e.limits.length?`<details class="mp-it-limits"><summary>本插件不回答什么（${e.limits.length} 条）</summary>${e.limits.map($=>`<div><b>${a($.title)}</b>${a($.text)}</div>`).join("")}</details>`:"",H=e.system&&/^(liuyao|meihua|daliuren|qimen|tarot|xiaoliuren)$/.test(e.system)?`<div class="mp-askcopy-row"><button type="button" class="mp-askcopy" data-mp-askcopy="${a(e.system)}">复制问事提示</button><span class="mp-askcopy-hint">把这张盘和你的问题打包成一段提示，粘到任何对话里都能用</span></div>`:"",K=e.guide?`<details class="mp-guide">
      <summary><b>${a(e.guide.title)}</b><span class="mp-guide-sub">数 / 象 / 辞</span></summary>
      <div class="mp-guide-body">
        <p class="mp-guide-lead">${a(e.guide.lead)}</p>
        <ol class="mp-guide-layers">${(e.guide.layers||[]).map($=>`<li><b>${a($.name)}<i>${a($.sub)}</i></b><span>${a($.text)}</span><em>${a($.hint)}</em></li>`).join("")}</ol>
        <div class="mp-guide-check"><b>${a(e.guide.check.title)}</b><ol>${(e.guide.check.items||[]).map($=>`<li>${a($)}</li>`).join("")}</ol><p>${a(e.guide.check.tail)}</p></div>
        <div class="mp-guide-parts"><b>${a(e.guide.parts.title)}</b><ul>${(e.guide.parts.rows||[]).map($=>`<li><span>${a($[0])}</span>${a($[1])}</li>`).join("")}</ul><p>${a(e.guide.parts.tail)}</p></div>
        <p class="mp-guide-close">${a(e.guide.closing)}</p>
      </div></details>`:"";return`<div class="mp-it${d?" folded":""}">
      <button type="button" class="mp-it-head" aria-expanded="${d?"false":"true"}">
        <span class="mp-it-arrow" aria-hidden="true">▾</span>
        <span class="mp-it-title">解析与详解</span>${L.map($=>`<span class="mp-it-tag">${a($)}</span>`).join("")}
        <span class="mp-it-hint">${d?"点击展开":"点击收起"}</span>
      </button>
      <div class="mp-it-wrap">
        ${H}
        ${N}
        ${_}
        ${ee}
        ${e.lead?`<div class="mp-it-lead">${a(e.lead)}</div>`:""}
        ${e.error?`<div class="mp-it-err"><b>⚠ 解析生成失败</b>${a(e.error)}——上方盘面数据本身可用</div>`:""}
    ${K}
    ${c}
        ${m}
        <div class="mp-it-body">${u}</div>
        ${b}
        ${f}
        ${I}
        ${y}
        ${T}
        <div class="mp-it-dis">${a(e.disclaimer)}</div>
      </div>
    </div>`},s.followupHTML=function(e){if(!e)return"";const i=e.evidence&&e.evidence.length?`<div class="mp-fu-ev">依据：${e.evidence.map(p=>a(p)).join("；")}　置信度：${a(e.confidence||"弱")}</div>`:"";return`<div class="mp-fu${e.ok?"":" miss"}">
      <div class="mp-fu-h">追问 · ${a(e.question)}</div>
      <div class="mp-fu-a">${a(e.answer)}</div>
      ${i}
    </div>`},s.resultWithInterpret=function(e,i,p){return(e||"")+s.interpretHTML(i,p)},s.caliberHTML=function(e){const i=e&&Array.isArray(e.switches)?e.switches.filter(f=>f&&f.key):[];if(!i.length)return"";const p=i.filter(f=>!f.error&&f.total>0),d=p.length?`${i.length} 组开关中 ${p.length} 组影响此盘：${p.map(f=>f.short||f.title).join("、")}。`:`本盘对 ${i.length} 组开关都不敏感：换成另一档也不变。`,o=f=>{if(f.error)return`<div class="mp-cdiff-same">未能对照：${a(f.error)}</div>`;if(!f.total)return'<div class="mp-cdiff-same">无变化 · 此盘不受这一开关影响</div>';const x=Array.isArray(f.roots)?f.roots:[];return x.length?`<div class="mp-cdiff-roots">${x.map(b=>`<div class="mp-cdiff-root"><span class="mp-cdiff-k">${a(b.label)}</span><span class="mp-cdiff-from">${a(b.from)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-to">${a(b.to)}</span></div>`).join("")}</div>`:`<div class="mp-cdiff-same">无单一根因；逐字段差异 ${Number(f.total)||0} 处</div>`},u=f=>{const x=(Array.isArray(f.views)?f.views:[]).filter(b=>b&&b.changed);return f.error||!f.total||!x.length?"":`<table class="mp-cview"><thead><tr><th scope="col">项</th><th scope="col">${a(f.currentLabel)}</th><th scope="col">${a(f.altLabel)}</th></tr></thead><tbody>`+x.map(b=>`<tr><th scope="row">${a(b.label)}</th><td>${a(b.current)}</td><td>${a(b.alt)}</td></tr>`).join("")+"</tbody></table>"},c=f=>{const x=Array.isArray(f.categories)?f.categories:[];if(f.error||!f.total||!x.length)return"";const b=x.slice(0,6);return`<div class="mp-cdiff-cats">${b.map(L=>`<span class="mp-cdiff-cat">${a(L.name)} ${Number(L.count)||0} 处</span>`).join("")}`+(x.length>b.length?`<span class="mp-cdiff-cat">另 ${x.length-b.length} 类</span>`:"")+"</div>"},m=i.map(f=>`<div class="mp-cdiff-row"><div class="mp-cdiff-h"><b>${a(f.title)}</b><span class="mp-cdiff-count${f.total>0?" on":""}">${f.error?"未能对照":f.total?`${Number(f.total)||0} 处`:"无变化"}</span></div><div class="mp-cdiff-ab"><span class="mp-cdiff-pill now">当前 · ${a(f.currentLabel)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-pill alt">换成 · ${a(f.altLabel)}</span></div>${o(f)}${u(f)}${c(f)}</div>`).join("");return`<details class="mp-cdiff" aria-label="口径对照">
      <summary><span class="mp-cdiff-title">口径对照</span><span class="mp-cdiff-lead">${a(d)}</span><span class="mp-cdiff-more">展开逐字差异</span></summary>
      <div class="mp-cdiff-body">${m}
        <div class="mp-cdiff-note">同一组输入、只换一个开关；只列变化字段与根因，不判哪套口径更准，也不改上方盘面。</div>
      </div>
    </details>`},s.handleHTML=function(e){return typeof e!="string"||!e?"":`<section class="mp-handle" aria-label="排盘句柄">
      <span class="mp-handle-title">排盘句柄</span>
      <code class="mp-handle-code" title="${a(e)}">${a(e)}</code>
      <button type="button" class="mp-handle-copy" data-handle-copy="${a(e)}" aria-label="复制排盘句柄">复制句柄</button>
      <span class="mp-handle-hint">追问同一张盘时把它连同增量参数（年份、方向、所问之事）一并交给助手，不必重报出生信息。句柄是编码不是加密，含出生时间与出生地，别公开贴出。</span>
    </section>`},s.revisionHTML=function(e){if(!e||typeof e!="object")return"";const i=Array.isArray(e.applied)?e.applied:[],p=Array.isArray(e.ignored)?e.ignored:[];if(!i.length&&!p.length)return"";const d=i.map(o=>{const u=o.fromDisplay==null?"（未设）":o.fromDisplay;return`<li><span class="k">${a(o.label||o.key)}</span><span class="v"><span class="old">${a(u)}</span> → <span class="new">${a(o.display)}</span></span></li>`}).join("");return`<section class="mp-revise" aria-label="一句话改参">
      <div class="mp-revise-head"><span class="mp-revise-title">一句话改参</span><span class="mp-revise-text">「${a(e.text||"")}」</span></div>
      ${d?`<ul class="mp-revise-list">${d}</ul>`:'<p class="mp-revise-ignored">没有识别到可改的参数，仍按原参数排盘。</p>'}
      ${p.length?`<p class="mp-revise-ignored">未处理：${a(p.join("；"))}</p>`:""}
    </section>`},s.shadowHTML=function(e,i){if(!e||!e.id)return"";const p=[];e.version&&p.push(`版本 <b>${a(e.version)}</b>`),e.baseId&&p.push(`基础指纹 <b>${a(e.baseId)}</b>`),p.push("同参数同 ID");const d=[];e.reproducible===!1&&d.push(`不可复算：${a(e.reason||"参数不足")}`);const o=e.reproducible===!0&&e.asOfPinned===!1&&(e.system==="bazi"||e.system==="ziwei")?'<div class="mp-shadow-hint">未固定 asOf：流年 / 流月随「此刻」变化；要逐字比对请在输入里固定 asOf。</div>':"",u=i&&i.sameId!==!1&&(i.versionChanged||Number(i.total)>0);let c="";if(u){const m=Number(i.total)||0,f=a(i.fromVersion||"—"),x=a(i.toVersion||e.version||"—"),b=Array.isArray(i.roots)?i.roots:[],L=b.slice(0,8),S=L.length?`<div class="mp-cdiff-roots">${L.map(_=>`<div class="mp-cdiff-root"><span class="mp-cdiff-k">${a(_.label)}</span><span class="mp-cdiff-from">${a(_.from)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-to">${a(_.to)}</span></div>`).join("")}`+(b.length>L.length?`<div class="same">另 ${b.length-L.length} 处根因</div>`:"")+"</div>":`<div class="same">${m?"无单一根因；逐字段变化 "+m+" 处":"字段 0 处变化：同一张盘跨版本逐字一致"}</div>`,w=Array.isArray(i.categories)?i.categories:[],N=w.length?`<div class="mp-cdiff-cats">${w.slice(0,6).map(_=>`<span class="mp-cdiff-cat">${a(_.name)} ${Number(_.count)||0} 处</span>`).join("")}`+(w.length>6?`<span class="mp-cdiff-cat">另 ${w.length-6} 类</span>`:"")+"</div>":"";c=`<details class="mp-shadow-diff"${m>0?" open":""}>
        <summary><b>与上次同盘比对</b><span class="tag">${f} → ${x} · ${m?`${m} 处变化`:"0 处变化"}</span></summary>
        ${S}${N}
        <div class="note">同一 baseId（同一组归一化参数）的两次结果；只比盘面字段，不含摘要、解析与古籍等文本层。</div>
      </details>`}return`<section class="mp-shadow" aria-label="影子盘">
      <div class="mp-shadow-head"><span class="mp-shadow-title">影子盘</span><code class="mp-shadow-id">${a(e.id)}</code>
        <button type="button" class="mp-shadow-copy" data-shadow-copy="${a(e.id)}" aria-label="复制影子盘 ID">复制 ID</button></div>
      <div class="mp-shadow-meta">${p.join('<span aria-hidden="true">·</span>')}</div>
      ${d.map(m=>`<div class="mp-shadow-warn">⚠ ${m}</div>`).join("")}
      ${o}
      ${c}
    </section>`},s.shadowTrack=function(e){const i=window.Engine||window.__PP&&window.__PP.Engine;if(!i||!i.shadowSnapshot||!i.shadowDiff)return null;let p=null;try{p=i.shadowSnapshot(e)}catch{return null}if(!p||!p.shadow||!p.shadow.baseId)return null;const d="mp-shadow-v1";let o={};try{const m=window.localStorage?window.localStorage.getItem(d):null,f=m?JSON.parse(m):{};f&&typeof f=="object"&&!Array.isArray(f)&&(o=f)}catch{o={}}const u=o[p.shadow.baseId];let c=null;if(u)try{c=i.shadowDiff(u,p)}catch{c=null}p.at=Date.now(),o[p.shadow.baseId]=p;try{const m=Object.keys(o);if(m.length>24){m.sort((f,x)=>(Number(o[f]&&o[f].at)||0)-(Number(o[x]&&o[x].at)||0));for(const f of m.slice(0,m.length-24))delete o[f]}window.localStorage&&window.localStorage.setItem(d,JSON.stringify(o))}catch{}return c};const Je="dsh-metaphysics/profiles-v1",Oe=24,Qe=16,_t=40,Vt=60,zt=["bazi","ziwei","liuyao","tarot","meihua","daliuren","hepan","qimen","almanac","zeri","chenggu","xiaoliuren","star","numerology","mbti","trend","fengshui","name","convert"];s.PROF_KEY=Je,s.PROF_MAX=Oe,s.PROF_KINDS=zt;const ya={bazi:"八字",ziwei:"紫微",liuyao:"六爻",tarot:"塔罗",meihua:"梅花",daliuren:"六壬",hepan:"合盘",qimen:"奇门",almanac:"黄历",zeri:"择日",chenggu:"称骨",xiaoliuren:"小六壬",star:"星座",numerology:"生命数字",mbti:"人格",trend:"人生K线",fengshui:"风水",name:"起名",convert:"农历"};s.profKindLabel=e=>ya[e]||String(e||"");const Me=e=>typeof e=="string";function jt(e){if(!e||typeof e!="object"||Array.isArray(e)||!Me(e.id)||!e.id||e.id.length>40||!Me(e.kind)||zt.indexOf(e.kind)<0)return null;const i=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e.date||""));if(!i)return null;const p=Number(i[1]),d=Number(i[2]),o=Number(i[3]);if(d<1||d>12||o<1||o>new Date(p,d,0).getDate())return null;const u=Me(e.time)&&/^([01]?\d|2[0-3]):[0-5]\d$/.test(e.time)?e.time:"";return{id:e.id,kind:e.kind,label:Me(e.label)?e.label.slice(0,Qe):"",date:e.date,time:e.hourUnknown===!0?"":u,hourUnknown:e.hourUnknown===!0,trueSolar:e.trueSolar!==!1,lateZi:e.lateZi!==!1,gender:e.gender==="male"||e.gender==="female"?e.gender:"",address:Me(e.address)?e.address.slice(0,_t):"",note:Me(e.note)?e.note.slice(0,Vt):"",pinned:e.pinned===!0,createdAt:Number(e.createdAt)||0,lastUsedAt:Number(e.lastUsedAt)||0,uses:Number(e.uses)||0}}function Xt(){try{const e=window.localStorage?window.localStorage.getItem(Je):null,i=e?JSON.parse(e):[];return Array.isArray(i)?i:[]}catch{return[]}}function ke(e){return e.slice().sort((i,p)=>(p.pinned?1:0)-(i.pinned?1:0)||(p.lastUsedAt||p.createdAt||0)-(i.lastUsedAt||i.createdAt||0)||(p.createdAt||0)-(i.createdAt||0))}s.profilesLoad=function(){const e=[],i=Object.create(null);for(const p of Xt()){const d=jt(p);d&&!i[d.id]&&(i[d.id]=1,e.push(d))}return ke(e)},s.profilesSave=function(e){const i=ke(Array.isArray(e)?e.slice(0,Oe):[]);try{return window.localStorage?(window.localStorage.setItem(Je,JSON.stringify(i)),!0):!1}catch{return!1}};let Wt=0;s.profilesNewId=function(){const e=Object.create(null);for(const p of s.profilesLoad())e[p.id]=1;let i;do i=`p${Date.now().toString(36)}${(Wt++).toString(36)}`;while(e[i]);return i},s.profilesPut=function(e){const i=jt(Object.assign({id:s.profilesNewId(),createdAt:Date.now(),lastUsedAt:Date.now()},e));if(!i)return{ok:!1,list:s.profilesLoad()};const p=s.profilesLoad(),d=p.findIndex(o=>o.id===i.id);if(d>=0){const o=p[d];i.createdAt=o.createdAt||i.createdAt,i.lastUsedAt=o.lastUsedAt,i.uses=o.uses,i.pinned=o.pinned,p.splice(d,1,i)}else p.push(i);if(p.length>Oe){const o=p.slice().sort((m,f)=>(m.lastUsedAt||m.createdAt)-(f.lastUsedAt||f.createdAt)),u=o.find(m=>m.id!==i.id)||o[0],c=p.indexOf(u);c>=0&&p.splice(c,1)}return s.profilesSave(p)?{ok:!0,list:ke(p),item:i}:{ok:!1,list:s.profilesLoad()}},s.profilesRemove=function(e){const i=s.profilesLoad().filter(p=>p.id!==e);return s.profilesSave(i)?i:s.profilesLoad()},s.profilesPin=function(e){const i=s.profilesLoad().map(p=>p.id===e?Object.assign({},p,{pinned:!p.pinned}):p);return s.profilesSave(i)?ke(i):s.profilesLoad()},s.profilesTouch=function(e){let i=!1;const p=s.profilesLoad().map(d=>d.id!==e?d:(i=!0,Object.assign({},d,{lastUsedAt:Date.now(),uses:(d.uses||0)+1})));return i?s.profilesSave(p)?ke(p):s.profilesLoad():p};const Ht=864e5;function qt(e){const i=Number(e)||0;if(!i)return"未排过";const p=Math.floor((Date.now()-i)/Ht);if(p<=0)return"今天排过";if(p===1)return"昨天排过";if(p<30)return`${p} 天前排过`;const d=new Date(i);return`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")} 排过`}s.profilesAgo=qt;const Jt={male:"♂",female:"♀"};s.profilesHTML=function(e,i){const p=i||{},d=(Array.isArray(e)?e:[]).map(u=>{const c=jt(u);if(!c)return"";const m=[c.date,c.hourUnknown?"时辰未知":c.time,c.address].filter(Boolean).join(" "),f=p.editingId&&c.id===p.editingId,x=p.armedDel&&c.id===p.armedDel;return`<div class="mp-prof-card${c.pinned?" pinned":""}${f?" editing":""}" data-id="${a(c.id)}">
        <button type="button" class="mp-prof-use" data-mp-prof="use" data-id="${a(c.id)}"
          title="${a(`用「${c.label||c.kind}」的出生信息直接排盘`)}">
          <span class="mp-prof-nm">${a(c.label||"未命名")}${c.gender?`<i class="sx">${Jt[c.gender]||""}</i>`:""}</span>
          <span class="mp-prof-sys">${a(s.profKindLabel?s.profKindLabel(c.kind):c.kind)}</span>
          <span class="mp-prof-bd">${a(m)}</span>
          <span class="mp-prof-at">${a(qt(c.lastUsedAt||c.createdAt))}${c.uses?` · ${c.uses} 次`:""}${c.pinned?" · 置顶":""}</span>
        </button>
        <span class="mp-prof-ops">
          <button type="button" data-mp-prof="pin" data-id="${a(c.id)}" class="${c.pinned?"on":""}"
            aria-pressed="${c.pinned?"true":"false"}" title="置顶这张档案">${c.pinned?"已置顶":"置顶"}</button>
          <button type="button" data-mp-prof="edit" data-id="${a(c.id)}" title="把这张档案读回输入框，改完再存">改名</button>
          <button type="button" data-mp-prof="del" data-id="${a(c.id)}" class="${x?"on":""}"
            title="${x?"再点一次就从本机删除这张档案":"从本机删除这张档案（点两次确认）"}">${x?"确认删除":"删除"}</button>
        </span>
      </div>`}).join(""),o=d?`<div class="mp-prof-list">${d}</div>`:'<p class="mp-prof-empty">还没有存过命盘。填好出生信息，给这张盘起个称呼，点「存为我的命盘」——下次进来一点就出盘，不必重报。</p>';return`<section class="mp-prof" aria-label="我的命盘">
      <div class="mp-prof-h"><b>我的命盘</b><span class="mp-prof-sub">只存本机 · 不上传${e&&e.length?` · ${e.length}/${Oe}`:""}</span></div>
      ${o}
      ${p.bar||""}
    </section>`},s.profilesBarHTML=function(e){const i=e||{};return`<div class="mp-prof-bar">
        <input class="mp-prof-name" type="text" maxlength="${Qe}" placeholder="称呼，如「我」「妈妈」" aria-label="档案称呼" value="${a(i.name||"")}">
        <button type="button" data-mp-prof="put"${i.canAdd===!1?" disabled":""}>${a(i.editingId?"更新这张档案":"存为我的命盘")}</button>
        ${i.editingId?'<button type="button" class="ghost" data-mp-prof="cancel">取消改名</button>':""}
        <span class="mp-prof-tip">${a(i.tip||(i.editingId?"改完出生信息或称呼，点「更新这张档案」覆盖原档。":"存的是出生时间与出生地这些输入，不是结果。"))}</span>
      </div>`},s.profEvent=function(e){let i=e&&e.closest?e.closest("[data-mp-prof]"):null;if(!i)return null;const p=i.getAttribute("data-mp-prof");return i.tagName==="BUTTON"&&i.disabled?null:{action:p,id:i.getAttribute("data-id")||"",name:i}};const pt=["bazi","trend"],Qt=["bazi","ziwei","liuyao","meihua","daliuren","qimen","hepan","chenggu","trend","fengshui","name","xiaoliuren"];s.profUsable=function(e){return!e||typeof e!="object"?!1:e.hourUnknown===!0||e.time?!0:Qt.indexOf(String(e.kind||""))<0},s.profFromForm=function(e,i,p){const d=e||{},o=d.hourUnknown===!0&&pt.indexOf(String(d.kind||""))>=0;return!o&&!/^([01]?\d|2[0-3]):[0-5]\d$/.test(String(d.time||"").trim())?null:jt(Object.assign({id:p||s.profilesNewId(),kind:String(d.kind||""),label:String(i||"").trim().slice(0,Qe)||(s.profKindLabel?s.profKindLabel(d.kind):String(d.kind||"")),date:String(d.date||""),time:String(d.time||""),hourUnknown:o,gender:String(d.gender||""),address:String(d.address||""),trueSolar:d.trueSolar!==!1,lateZi:d.lateZi!==!1,pinned:!1,createdAt:Date.now(),lastUsedAt:0,uses:0}))},s.traceHTML=function(e,i,p){if(!Array.isArray(e)||!e.length)return"";const d={liuyao:"六爻",bazi:"八字",ziwei:"紫微",qimen:"奇门",daliuren:"大六壬"}[i]||"命盘",o=e.map(f=>f&&f.field).filter(Boolean).join(" → "),u=typeof p=="string"?p:"",c=(f,x)=>{const b=String(f??"");return b.length>x?`${b.slice(0,x)}…`:b},m=e.map((f,x)=>{const b=Array.isArray(f.inputs)?f.inputs:[];return`<details class="mp-trace-step"${x===0?" open":""}>
        <summary><span class="mp-trace-no">${x+1}</span><span class="mp-trace-field">${a(f.field)}</span><span class="mp-trace-res">${a(c(f.result,44))}</span></summary>
        <div class="mp-trace-detail">
          <div class="mp-trace-rule"><b>规则</b>${a(f.rule)}</div>
          ${b.length?`<dl class="mp-trace-inputs">${b.map(L=>`<dt>${a(L.label)}</dt><dd>${a(L.value)}</dd>`).join("")}</dl>`:""}
          <div class="mp-trace-result"><b>结果</b>${a(f.result)}</div>
          ${f.source?`<div class="mp-trace-src"><b>出处</b>${a(f.source)}</div>`:""}
        </div>
      </details>`}).join("");return`<button type="button" class="mp-trace-card" data-trace-open aria-haspopup="dialog" aria-controls="mp-trace-layer">
        <span class="mp-trace-title">推导链</span><span class="mp-trace-flow">${a(o)}</span><span class="mp-trace-count">${e.length} 层 · 查看</span>
      </button>
      <div class="mp-trace-layer" id="mp-trace-layer" data-trace-layer aria-hidden="true">
        <div class="mp-trace-back" data-trace-close></div>
        <aside class="mp-trace-drawer" role="dialog" aria-modal="true" aria-labelledby="mp-trace-title">
          <div class="mp-trace-head">
            <div><b id="mp-trace-title">推导链 · ${a(d)}</b><span>${e.length} 层 · 每层给出规则、输入、结果与出处；只读，不重算</span></div>
            ${u?'<button type="button" class="mp-trace-copy" data-trace-copy aria-label="复制整条推导链的 Markdown">复制 Markdown</button>':""}
            <button type="button" class="mp-trace-close" data-trace-close aria-label="关闭推导链">✕</button>
          </div>
          <div class="mp-trace-body">${m}</div>
          ${u?`<textarea class="mp-trace-md" data-trace-md readonly hidden>${a(u)}</textarea>`:""}
        </aside>
      </div>`},s.almanacHTML=function(e){if(!e||!e.meta)return s.quickHTML(e);const i=e.ganzhi||{},p=e.dayGod||null,d=(w,N)=>(w||[]).map(_=>`<span class="mp-al-chip${N?` ${N}`:""}">${a(_)}</span>`).join(""),o=(w,N)=>N?`<div class="mp-al-cell"><em>${a(w)}</em><b>${a(N)}</b></div>`:"",u=e.xiu?`${e.xiu.name}宿（${e.xiu.luck}·${e.xiu.zheng}·${e.xiu.animal}）`:"",c=e.nayin&&e.nayin.day?e.nayin.day.name:"",m=e.chong?`${e.chong.text}${e.chong.sha?` ${e.chong.sha}`:""}`:"",f=(e.hours||[]).map(w=>`<span class="mp-al-hour ${w.luck==="吉"?"good":"bad"}"><i>${a(w.zhi)}</i><em>${a((w.ganZhi||"").slice(0,1))}</em><b>${a(w.shen||"")}</b><u>${a(w.luck||"")}</u></span>`).join(""),x=e.positions||{},b=(w,N)=>N?`<span class="mp-al-chip">${a(w)}·${a(typeof N=="string"?N:N.dir||"")}</span>`:"",L=e.lucky||{},S=p?`<span class="mp-al-badge ${p.luck==="吉"?"good":"bad"}">${a(p.name)}·${a(p.type)}·${a(p.luck)}</span>`:"";return`<section class="mp-al" aria-label="黄历">
      <div class="mp-al-h"><b>${a(e.meta.date||"")}</b><i>${a(e.meta.weekday||"")}　${a((e.lunar||{}).text||"")}</i></div>
      <div class="mp-al-gz">${a(i.year||"")}年　${a(i.month||"")}月　${a(i.day||"")}日　属${a(i.shengXiao||"")}　建除 ${a(e.zhiXing||"")}日　${S}</div>
      <div class="mp-al-yiji">
        <div class="mp-al-col"><em>宜</em><div class="mp-al-chips">${d(e.yi)}</div></div>
        <div class="mp-al-col"><em>忌</em><div class="mp-al-chips">${d(e.ji)}</div></div>
      </div>
      <div class="mp-al-grid">${o("二十八宿",u)}${o("日柱纳音",c)}${o("胎神",e.taiShen)}${o("冲煞",m)}</div>
      <div class="mp-al-row"><em>吉神方位</em><div class="mp-al-chips">${b("喜神",x.xiShen)}${b("财神",x.caiShen)}${b("福神",x.fuShen)}${b("阳贵",x.yangGui)}${b("阴贵",x.yinGui)}</div></div>
      <div class="mp-al-row"><em>时刻吉凶</em><div class="mp-al-hours">${f}</div></div>
      <div class="mp-al-row"><em>吉配生肖</em><div class="mp-al-chips">${L.liuhe?`<span class="mp-al-chip">六合·${a(L.liuhe)}</span>`:""}${d(L.sanhe||[])}</div></div>
      ${e.dailyHexagram?`<div class="mp-al-hex">每日一卦：<b>${a(e.dailyHexagram.name)}</b>　${a(e.dailyHexagram.meaning||"")}</div>`:""}
      <div class="mp-al-note">${a(e.meta&&e.meta.scope||"")}</div>
    </section>`},s.mbtiHTML=function(e){if(!e)return"";if(e.needAnswers&&Array.isArray(e.questions)){const o=e.questions.map(u=>`<li>${a(u.text)}</li>`).join("");return`<section class="mp-mb-paper" aria-label="十六型人格问卷">
        <div class="mp-mb-h">
          <span class="mp-mb-meta"><b>十六型人格问卷</b><i>${e.total} 题 · 每题 1 完全不像 / 5 很像我</i></span>
          <span class="mp-mb-count">填完分数再看结果</span>
        </div>
        <ol>${o}</ol>
        <div class="mp-mb-note">${a(e.note||"")}</div>
      </section>`}const i=(e.dims||[]).map(o=>{const u=Math.round((o.pct||0)*100),c=o.picked===o.left,m=Math.max(2,u),f=c?o.leftSay:o.rightSay;return`<div class="mp-mb-dim">
        <div class="mp-mb-dh"><b class="${c?"on":""}">${a(o.left)}</b><em>${a(o.name)}</em><b class="${c?"":"on"}">${a(o.right)}</b></div>
        <div class="mp-mb-bar ${c?"l":"r"}"><em style="width:${m}%"></em></div>
        <div class="mp-mb-df">取 ${a(o.picked)} · ${a(o.strength)} ${u}%</div>
        <div class="mp-mb-ds">${a(f)}</div>
      </div>`}).join(""),p=e.profile||{},d=(p.stack||[]).map((o,u)=>`<span class="${u===0?"lead":""}"><b>${a(o.code)}</b>${a(o.say)}</span>`).join("");return`<section class="mp-mb" aria-label="十六型人格结果">
      <div class="mp-mb-h">
        <span class="mp-mb-code">${a(e.type||"")}</span>
        <span class="mp-mb-meta"><b>${a(p.title||"")}</b><i>${a(p.keywords||"")}</i></span>
        <span class="mp-mb-count">已答 ${e.answered||0}/${e.total||0} 题</span>
      </div>
      <div class="mp-mb-body">
        <div class="mp-mb-dims">${i}</div>
        <div class="mp-mb-sec"><em>一句</em>${a(p.oneLine||"")}</div>
        <div class="mp-mb-two">
          <div><b>优势</b>${(p.strengths||[]).map(o=>a(o)).join("；")}</div>
          <div><b>留意</b>${(p.blindspots||[]).map(o=>a(o)).join("；")}</div>
        </div>
        ${d?`<div class="mp-mb-sec"><em>认知功能</em>主导 ${a((p.stack[0]||{}).code||"")} → 依次展开</div><div class="mp-mb-fn">${d}</div>`:""}
        <div class="mp-mb-sec"><em>工作</em>${a(p.work||"")}</div>
        <div class="mp-mb-sec"><em>关系</em>${a(p.love||"")}</div>
        <div class="mp-mb-sec"><em>学习</em>${a(p.study||"")}</div>
        <div class="mp-mb-sec"><em>课题</em>${a(p.growth||"")}</div>
      </div>
      <div class="mp-mb-note">${a(e.note||"")}</div>
    </section>`};const lt=[["巽","离","坤"],["震","中","兑"],["艮","坎","乾"]],ea={坎:"正北",艮:"东北",震:"正东",巽:"东南",离:"正南",坤:"西南",兑:"正西",乾:"西北",中:"中宫"},et=["生气","延年","天医","伏位"],qe=(e,i)=>`<span class="mp-fs-chip${i?" "+i:""}">${a(e)}</span>`,Be=(e,i,p)=>`<div class="mp-fs-cell${e==="中"?" center":""}"><div class="mp-fs-top"><span class="mp-fs-gua">${a(e)}</span><span class="mp-fs-dir">${a(ea[e]||"")}</span>${i||""}</div>`+(p||"")+"</div>",St=e=>e.length?`<dl class="mp-fs-facts">${e.map(([i,p])=>`<div class="mp-fs-row"><dt>${a(i)}</dt><dd>${a(p)}</dd></div>`).join("")}</dl>`:"",tt=(e,i,p,d,o,u)=>`<section class="mp-quick mp-fs" aria-label="风水结果"><div class="mp-quick-h"><b>${a(e)}</b>${i?`<span class="mp-fs-sub">${a(i)}</span>`:""}</div>`+(p.length?`<div class="mp-fs-chips">${p.join("")}</div>`:"")+d+o+u.filter(Boolean).map(c=>`<div class="mp-fs-note">${a(c)}</div>`).join("")+"</section>",Ft=(e,i)=>`<div class="mp-fs-grid" role="group" aria-label="${a(i)}">`+lt.map(p=>p.map(d=>{const o=e.find(m=>m&&m.palace===d);if(!o)return Be(d,"","");const u=et.includes(o.star),c=`<span class="mp-fs-star"${o.role?` title="${a(o.role)}"`:""}>${a(o.star)}<em class="${u?"ok":"bad"}">${u?"吉":"凶"}</em></span>`;return Be(d,c,"")}).join("")).join("")+"</div>";function at(e,i){const p=i.period,d={};for(const S of e.palaces||[])d[S.palace]=S;const o=`<div class="mp-fs-key">每宫依次为 <b>运</b>／<b>山</b>／<b>向</b> 三星；底色高亮＝当运（${a(p)}运）</div><div class="mp-fs-grid" role="group" aria-label="玄空九宫（运/山/向）">`+lt.map(S=>S.map(w=>{const N=d[w];if(!N)return Be(w,"","");const _=[["运",N.yun],["山",N.shan],["向",N.xiang]].map(([ee,I])=>`<span class="${I===p?"on":""}" title="${a(ee)}星 ${a(I)}">${a(I)}</span>`).join("");return Be(w,"",`<div class="mp-fs-nums">${_}</div>`)}).join("")).join("")+"</div>",u=e.wangShanWangXiang||{},c=i.jianXiang||{},m=e.timeFlying||null,f=[qe(c.active?`兼${c.jian} ${c.offset}° · 替卦`:"正向 · 下卦",c.active?"ok":""),qe(`山盘 ${i.shanCenter.star}${i.shanCenter.name} · ${i.shanCenter.fly}`),qe(`向盘 ${i.xiangCenter.star}${i.xiangCenter.name} · ${i.xiangCenter.fly}`),qe(u.byChart?"盘面：到山到向":"盘面：未到山到向",u.byChart?"ok":""),qe(u.byTable===null?"表法：替卦不套":u.byTable?"表法：在列":"表法：未列",u.byTable?"ok":"")],x=(S,w)=>`${w} ${S.star}${S.name}（${S.fly}，${S.basis}${S.mode==="替卦"?`；原运星 ${S.original}${S.replaced?"，已替":"，用替而未替"}`:""}）`,b=m?[["year","年"],["month","月"],["day","日"],["hour","时"]].filter(([S])=>m[S]).map(([S,w])=>`${w}${m[S].centerName}（${m[S].fly}）`).join("　"):"",L=St([...c.active?[["替卦",`${c.note}${u.byTable===null?" 正向旺山旺向表不适用于替卦。":""}`]]:[],["入中",`${x(i.shanCenter,"山盘")}；${x(i.xiangCenter,"向盘")}`],["当运",`山星${p}落 ${e.dangYun.shan.text}；向星${p}落 ${e.dangYun.xiang.text}`],["合十",`山星：${(e.heshi.shan||[]).join("、")||"无"}；向星：${(e.heshi.xiang||[]).join("、")||"无"}`],["表法",`${u.note||""}${(u.table||[]).length?` 本运所列：${u.table.join("、")}。`:" 本运表法无局。"}`],...b?[["年月日时",`${b}${m.meta&&m.meta.note?`　${m.meta.note}`:""}`]]:[]]);return tt(c.active?"玄空替卦":"玄空下卦",`${i.periodLabel} · 坐${i.sitting} · 向${i.facing}`,f,o,L,[i.note,e.disclaimer])}function ta(e,i){const p=e.mingGua||{},d=Ft([...e.luckyDirections||[],...e.unluckyDirections||[]],"八宅八向（吉凶）"),o=[qe(p.compatible||"—"),qe(`${i.gender}命 · ${i.guaYear} 年立春界`)],u=[];if(e.yearlyFlying){const c=e.yearlyFlying;u.push(["年紫白",`${c.centerName}入中；${c.palaces.filter(m=>m.palace!=="中").map(m=>`${m.palace}${m.name}`).join("、")}`])}return tt("八宅命卦",`${p.num}${p.gua}（${p.group}）· ${p.direction}`,o,d,St(u),[i.note,e.disclaimer])}function dt(e,i){const p=e.layout||{},d=Ft(e.houseStars||[],"宅卦八向（吉凶）"),o=[qe(`${i.houseGua}宅 · ${i.houseGroup}`),qe(`坐${i.sitting}`),qe(`向${i.facing}`)],u=[["门",p.door],["灶",p.stove],["床",p.bed],["厕",p.toilet]];return e.mingMatch&&u.push(["命宅配",e.mingMatch.text]),tt("门主灶",`${i.houseGua}宅 · 坐${i.sitting} · 向${i.facing}`,o,d,St(u),[i.birthNote,e.disclaimer])}s.fengshuiHTML=function(e){if(!e||e.system!=="fengshui")return s.quickHTML(e);const i=e.meta||{};return i.action==="xuankong"?at(e,i):i.action==="advise"?dt(e,i):ta(e,i)},s.perfHTML=function(e){if(!e)return"";const i=m=>typeof m=="number"&&isFinite(m)?`${Math.max(0,Math.round(m))}ms`:"",p=e.cached===!0?"（已缓存）":e.cached===!1?"（首次加载）":"",d=[];i(e.engineMs)&&d.push(`引擎 ${i(e.engineMs)}${p}`),i(e.computeMs)&&d.push(`排盘 ${i(e.computeMs)}`),i(e.renderMs)&&d.push(`渲染 ${i(e.renderMs)}`);const o=i(e.totalMs);if(!d.length&&!o)return"";const u=o?`首屏 ${o}`:"耗时";return`<div class="mp-perf" title="本机这一次的实测耗时，不含网络与服务端；换机器、首次加载与已缓存会不同">${d.length?`${u}｜${d.join(" · ")}`:u}</div>`},s.zeriHTML=function(e){if(!e||!e.compare||e.compare.mode!=="candidates"||!Array.isArray(e.days))return s.quickHTML(e);const i=e.meta||{},p=e.shenshaRef||{},d=e.compare.best?e.compare.best.date:"",o=e.days.map(m=>{const f=m.date===d,x=m.excluded||m.verdict==="回避"?"bad":m.verdict==="推荐"?"good":"",b=m.grade||{},L=b.label?`<b>${a(b.label)}</b><em>吉${a(b.ji)} / 凶${a(b.xiong)}　${a(b.decision||"")}</em>`:"—";return`<tr class="mp-zr-row${f?" top":""}${m.excluded?" off":""}">
        <th scope="row"><b>${a(m.date)}</b>${f?'<i class="mp-zr-best">最优</i>':""}
          <em>${a(m.weekday)}　${a(m.lunar)}</em></th>
        <td><b>${a(m.dayGanZhi)}</b><em>${a(m.zhiXing)}日</em></td>
        <td class="mp-zr-score">${a(m.score)}</td>
        <td class="mp-zr-grade">${L}</td>
        <td><span class="mp-zr-v ${x}">${a(m.verdict)}</span></td>
        <td class="mp-zr-why">${a(m.reasons.join("；")||"无特别加减分")}</td>
      </tr>`}).join(""),u=(m,f)=>`<span><em>${a(m)}</em>${f.length?a(f.join("、")):"无"}</span>`,c=e.compare.best?`这一组最优：<b>${a(e.compare.best.date)}</b>（${a(e.compare.best.score)} 分 · ${a(e.compare.best.verdict)}）`+(e.compare.best.ties.length>1?`；同分 ${a(e.compare.best.ties.filter(m=>m!==e.compare.best.date).join("、"))}`:""):"这一组都因冲属相被排除，没有可用的日子";return`<section class="mp-zr" aria-label="择日候选比较">
      <div class="mp-zr-h"><b>择日 · ${a(i.task||"")}</b>
        <span>候选 ${a(i.days)} 天${i.shengXiao?`　当事人属${a(i.shengXiao)}`:"（未给属相，未做冲煞排除）"}</span></div>
      <div class="mp-zr-lead">${c}</div>
      <table class="mp-zr-t"><thead><tr>
        <th scope="col">日期</th><th scope="col">日干支 / 建除</th><th scope="col">分</th><th scope="col">卷十等第</th><th scope="col">结论</th><th scope="col">理由</th>
      </tr></thead><tbody>${o}</tbody></table>
      <div class="mp-zr-lists">
        ${u("推荐",e.best)}${u("可用",e.usable)}${u("回避",e.avoid)}
      </div>
      <p class="mp-zr-note">${a(e.compare.note||"")}</p>
      ${p.text?`<p class="mp-zr-note">神煞依据：${a(p.text)}（${a(p.edition||"")}）；起法 ${a((p.volumes||[]).join("、"))}。未实现起法：${a((p.unsupported||[]).join("、"))}（不计分）。</p>`:""}
      ${p.juan10?`<p class="mp-zr-note">卷十依据：${a(p.juan10.text)}（${a(p.juan10.corpusLines||"")}）；${a(p.juan10.thresholdsNote||"")}${a(p.juan10.note||"")}</p>`:""}
      <p class="mp-zr-note">${a(i.scope||"")}</p>
      <p class="mp-zr-note">${a(e.disclaimer||"")}</p>
    </section>`},s.quickHTML=function(e){if(!e)return"";const p={almanac:"黄历",zeri:"择日",chenggu:"称骨",xiaoliuren:"小六壬",star:"星座",numerology:"生命数字",trend:"人生 K 线",fengshui:"风水",name:"起名",convert:"公农历转换",mbti:"十六型人格"}[e.system]||"速查",d=e.summary||"",o=d?`<pre class="mp-quick-pre">${a(d)}</pre>`:"";return`<section class="mp-quick" aria-label="${a(p)}结果">
      <div class="mp-quick-h"><b>${a(p)}</b></div>
      ${o}
    </section>`},s.summaryCardPNG=function(e,i){try{if(typeof document>"u"||!document.createElement)return"";const p=i&&i.outline||[],d=(i&&i.tables||[]).filter(ne=>Array.isArray(ne.rows)&&ne.rows.length),o=i&&i.systemLabel||e&&e.system||"命理报告",u=900,c=44,m=26,f=(ne,H)=>`${H?"600 ":""}${ne}px "PingFang SC","Microsoft YaHei","Noto Sans CJK SC",sans-serif`,x=document.createElement("canvas"),b=x.getContext?x.getContext("2d"):null;if(!b)return"";const L=(ne,H)=>{const K=[];let $="";for(const M of String(ne)){const j=$+M;b.measureText(j).width>H&&$?(K.push($),$=M):$=j}return $&&K.push($),K.length?K:[""]};b.font=f(15);let S=0;const w=p.map(ne=>{const H=L(ne.text,u-c*2-70);return S+=Math.min(H.length,2)*m+10,{o:ne,lines:H.slice(0,2)}}),N=d[0]||null,_=N?N.rows.slice(0,6):[],ee=N?54+_.length*34:0,I=150+S+(w.length?34:0)+ee+120;x.width=u,x.height=I,b.fillStyle="rgb(255,255,255)",b.fillRect(0,0,u,I),b.fillStyle="rgb(31,111,63)",b.fillRect(0,0,u,8);let y=52;b.fillStyle="rgb(27,27,27)",b.font=f(28,!0),b.fillText(`${o} · 摘要`,c,y),y+=30,b.fillStyle="rgb(111,106,96)",b.font=f(14);const T=[e&&e.input&&e.input.datetime?`出生/起局：${e.input.datetime}`:"","本地计算 · 可复现"].filter(Boolean).join("　");if(b.fillText(T,c,y),y+=34,w.length){b.fillStyle="rgb(31,111,63)",b.font=f(16,!0),b.fillText("一页读懂",c,y),y+=26;for(const{o:ne,lines:H}of w)b.fillStyle="rgb(138,131,120)",b.font=f(14,!0),b.fillText(ne.label,c,y),b.fillStyle="rgb(63,58,51)",b.font=f(15),H.forEach((K,$)=>b.fillText(K,c+70,y+$*m)),y+=H.length*m+10;y+=8}if(N){b.fillStyle="rgb(31,111,63)",b.font=f(16,!0),b.fillText(N.title,c,y),y+=24,b.fillStyle="rgb(138,131,120)",b.font=f(13),b.fillText(N.columns.join(" · "),c,y),y+=8,b.strokeStyle="rgb(229,225,216)",b.beginPath(),b.moveTo(c,y),b.lineTo(u-c,y),b.stroke(),y+=22,b.fillStyle="rgb(63,58,51)",b.font=f(14);for(const ne of _){const H=ne.filter(Boolean).join(" · "),K=L(H,u-c*2)[0];b.fillText(K,c,y),y+=34}}return y=I-62,b.strokeStyle="rgb(229,225,216)",b.beginPath(),b.moveTo(c,y-18),b.lineTo(u-c,y-18),b.stroke(),b.fillStyle="rgb(138,131,120)",b.font=f(12),b.fillText("内容用于传统文化学习与自我探索，不构成医疗、投资、法律或人事决策依据。",c,y+6),b.fillText("dsh-metaphysics · 本机计算，未上传任何数据",c,y+26),x.toDataURL?x.toDataURL("image/png"):""}catch{return""}}})();const Ea="dsh-metaphysics/history-v1";function Ei(){try{const n=window.localStorage&&window.localStorage.getItem(Ea),s=n?JSON.parse(n):[];return Array.isArray(s)?s.filter(k=>k&&typeof k=="object"&&typeof k.kind=="string").slice(0,20):[]}catch{return[]}}function _a(n){try{window.localStorage&&window.localStorage.setItem(Ea,JSON.stringify(n.slice(0,20)))}catch{}}const _i=(n,s)=>n.kind===s.kind&&n.date===s.date&&n.time===s.time&&n.gender===s.gender&&!!n.hourUnknown==!!s.hourUnknown&&n.trueSolar!==!1==(s.trueSolar!==!1)&&n.lateZi!==!1==(s.lateZi!==!1)&&n.address===s.address&&n.lines===s.lines&&n.question===s.question&&n.mhMode===s.mhMode&&n.upper===s.upper&&n.lower===s.lower&&n.direction===s.direction&&n.count===s.count&&n.changing===s.changing&&(n.kind!=="qimen"||n.qimenRule===s.qimenRule&&n.qLateZi===s.qLateZi)&&(n.kind!=="zeri"||n.task===s.task&&n.days===s.days&&n.shengXiao===s.shengXiao&&n.zCand===s.zCand)&&(n.kind!=="xiaoliuren"||n.xlrMode===s.xlrMode&&n.num1===s.num1&&n.num2===s.num2&&n.num3===s.num3)&&(n.kind!=="trend"||n.toAge===s.toAge)&&(n.kind!=="fengshui"||n.fsMode===s.fsMode&&n.fsPeriod===s.fsPeriod&&n.sitting===s.sitting&&n.facing===s.facing)&&(n.kind!=="name"||n.nnMode===s.nnMode&&n.surname===s.surname&&n.givenName===s.givenName&&n.limitN===s.limitN)&&(n.kind!=="convert"||n.convMode===s.convMode&&n.lunarDate===s.lunarDate&&!!n.leapMonth==!!s.leapMonth)&&(n.kind!=="hepan"||n.hpChart===s.hpChart&&n.partnerDate===s.partnerDate&&n.partnerTime===s.partnerTime&&n.partnerGender===s.partnerGender&&n.partnerAddress===s.partnerAddress&&!!n.thirdOn==!!s.thirdOn&&n.p2Date===s.p2Date&&n.p2Time===s.p2Time&&n.p2Gender===s.p2Gender&&n.p2Address===s.p2Address);function Hi(n,s){if(n==="bazi"){const O=["year","month","day","hour"].map(V=>s.pillars&&s.pillars[V]).filter(Boolean).map(V=>V.ganzhi).join(" ");return s.hourUnknown||s.pillars&&!s.pillars.hour?`${O}（时柱暂缺）`:O}return n==="ziwei"?`${s.soul?s.soul.branch:""}宫 ${s.bureau?s.bureau.name:""} ${s.lunar?s.lunar.year+"年":""}`.trim():n==="liuyao"?s.ben&&s.ben.name?s.ben.name:"":n==="meihua"?s.ben&&s.ben.name?`${s.ben.name} 动${s.moving}`:"":n==="daliuren"?`${s.dayGanZhi||""} ${s.geJu?s.geJu.name:""}`:""}const G=window.__PP,Tt=()=>typeof performance<"u"&&performance.now?performance.now():Date.now();let Pe=0;const fa=typeof window.__mpEnsureEngine=="function"?window.__mpEnsureEngine:async()=>window.Engine,Fi=`
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
.mp-chip{font-size:11.5px;padding:2px 8px;border-radius:999px;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer}.mp-chip.on{background:var(--dsw-alias-brand-primary);color:var(--mp-on-brand,#fff);border-color:transparent}
.mp-verify-foot{display:flex;align-items:flex-start;gap:8px;margin-top:8px;flex-wrap:wrap}
/* 反馈入口：常驻底部，低调但不隐藏；窄栏下按钮换行不挤压 */
.mp-fb{margin-top:26px;padding-top:12px;border-top:1px solid var(--dsw-alias-border-l1)}
.mp-fb-h{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.mp-fb-t{font-size:12px;color:var(--dsw-alias-label-secondary);flex:1;min-width:180px}
.mp-fb-b{margin-top:8px;font-size:11.5px;color:var(--dsw-alias-label-secondary);opacity:.85;line-height:1.7}
.mp-fb-note{color:var(--dsw-alias-brand-primary)}
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
`,{useState:q,useEffect:xt,useRef:Oi}=At,Ha=n=>String(n).padStart(2,"0");function Di(n){const s=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(n||""));if(!s)return!1;const k=Number(s[1]),O=Number(s[2]),V=Number(s[3]);if(O<1||O>12||V<1)return!1;const se=[31,k%4===0&&k%100!==0||k%400===0?29:28,31,30,31,30,31,31,30,31,30,31];return V<=se[O-1]}function Fa(n){const s=/^(\d{4})\s*[年./-]\s*(\d{1,2})\s*[月./-]\s*(\d{1,2})\s*日?$/.exec(String(n||"").trim());if(!s)return"";const k=`${s[1]}-${Ha(s[2])}-${Ha(s[3])}`;return Di(k)?k:""}function Pi(n){const s=String(n||"").trim();if(/^\d{0,4}(-\d{0,2}){0,2}$/.test(s))return s;if(/[年月日/.]/.test(s)){const O=Fa(s);if(O)return O}const k=s.replace(/\D/g,"").slice(0,8);return k.length<=4?k:k.length<=6?`${k.slice(0,4)}-${k.slice(4)}`:`${k.slice(0,4)}-${k.slice(4,6)}-${k.slice(6)}`}function xa(n){const s=n.value||"",[k,O]=q(s),V=Oi(s);xt(()=>{V.current=s,O(s)},[s]);const ie=()=>{const se=k.trim();if(!se){O(V.current),n.onInvalid&&n.onInvalid("");return}const re=Fa(se);if(re){V.current=re,O(re),re!==s&&n.onChange(re);return}O(V.current),n.onInvalid&&n.onInvalid(se)};return l("input",{className:"mp-input",type:"text",inputMode:"numeric",autoComplete:"off",placeholder:"年-月-日，如 1990-05-12",value:k,onChange:se=>{O(Pi(se.target.value))},onBlur:ie,onKeyDown:se=>{se.key==="Enter"&&(se.preventDefault(),ie())}})}const Bt=4,Ke=12;let Zt=null;function Ut(){if(Zt)return Zt;let n=null;try{n=Z.compute({system:"mbti"})}catch{n=null}const s=n&&n.questions||[];return s.length?(Zt={total:n&&n.total||s.length,questions:s,scale:n&&n.scale||{}},Zt):{total:0,questions:[],scale:{}}}function Ri(n){const{answers:s,page:k,onPick:O,onPage:V,onSubmit:ie,onClear:se}=n,re=Ut(),a=Math.max(1,Math.ceil(re.total/Bt)),ge=k*Bt,je=re.questions.slice(ge,ge+Bt),F=s.filter(B=>B!=null).length,fe=re.total?Math.round(F/re.total*100):0,xe=k>=a-1,R=F>=Ke;return l("div",{className:"mp-quiz"},l("div",{className:"mp-quiz-top"},l("div",{className:"mp-quiz-bar","aria-hidden":"true"},l("i",{style:{width:fe+"%"}})),l("span",{className:"mp-quiz-count"},`第 ${k+1} / ${a} 页 · 已答 ${F} / ${re.total}`)),l("div",{className:"mp-quiz-list"},je.map((B,D)=>{const U=ge+D;return l("div",{key:B.id||U,className:"mp-quiz-q"},l("div",{className:"mp-quiz-qt"},l("b",null,String(U+1).padStart(2,"0")),l("span",null,B.text)),l("div",{className:"mp-quiz-opts",role:"radiogroup","aria-label":`第 ${U+1} 题`},[1,2,3,4,5].map(be=>l("label",{key:be,className:"mp-quiz-o"+(s[U]===be?" on":"")},l("input",{type:"radio",name:`mpmbq${U}`,value:String(be),checked:s[U]===be,onChange:()=>O(U,be)}),l("b",null,String(be)),l("span",null,re.scale[be]||"")))))})),l("div",{className:"mp-quiz-nav"},l("button",{className:"mp-quiz-btn",disabled:k<=0,onClick:()=>V(-1)},"上一页"),xe?null:l("button",{className:"mp-quiz-btn",onClick:()=>V(1)},"下一页"),l("button",{className:"mp-quiz-btn primary",disabled:!R,onClick:ie},"看结果"),l("button",{className:"mp-quiz-btn",onClick:se},"清空"),l("span",{className:"mp-quiz-hint"},R?`已够 ${Ke} 题，可以看结果；答完 ${re.total} 题会更准。`:`答满 ${Ke} 题可先看结果（还差 ${Ke-F} 题）。`)))}class Ii extends(At.Component||Object){constructor(s){super(s),this.state={err:null}}static getDerivedStateFromError(s){return{err:s}}componentDidCatch(s,k){console.error("[metaphysics] 面板渲染异常",s,k)}render(){if(!this.state.err)return this.props.children;const s=this.state.err,k=String(s&&s.stack||"").split(`
`).slice(0,14).join(`
`);return l("div",{className:"mp-wrap"},l("div",{className:"mp-panel"},l("div",{className:"mp-lbl"},"命理面板渲染出错——把下面这段发给我"),l("pre",{style:{whiteSpace:"pre-wrap",fontSize:12,lineHeight:1.5,maxHeight:320,overflow:"auto",margin:"8px 0"}},String(s&&s.message||s)+`

`+k),l("div",{className:"mp-lbl"},"环境：__PP "+typeof G+" · Engine "+typeof window.Engine+" · React "+typeof At+" · 版本 "+(typeof G=="object"&&G&&(window.__MP_VER||"?"))+((window.__MP_UNRELEASED||[]).length?" · 未发版改动 "+window.__MP_UNRELEASED.length+" 项":""))))}}function Gi(n){const s=n&&n.size?n.size:20,k=n&&n.active;return l("svg",{width:s,height:s,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.6,strokeLinecap:"round","aria-hidden":!0,style:{opacity:k?1:.72}},l("circle",{cx:12,cy:12,r:8.2}),l("path",{d:"M12 3.8a4.1 4.1 0 0 1 0 8.2 4.1 4.1 0 0 0 0 8.2"}),l("circle",{cx:12,cy:8,r:1.1,fill:"currentColor",stroke:"none"}),l("circle",{cx:12,cy:16,r:1.1,fill:"currentColor",stroke:"none"}))}const Fe=[{k:"ziwei",label:"紫微",timeLabel:"出生时刻",hint:"紫微斗数需要出生日期、时刻与性别；出生地只影响真太阳时修正。"},{k:"bazi",label:"八字",timeLabel:"出生时刻",hint:"四柱八字按节气与真太阳时定时柱，出生地越准，时柱越稳。"},{k:"liuyao",label:"六爻",timeLabel:"起卦时刻",hint:"六爻不需要出生时间：只用起卦当下的日辰定六神、月建定旺衰，卦由摇出。"},{k:"meihua",label:"梅花",timeLabel:"起卦时刻",hint:"梅花用起卦时刻的年月日时数成卦，也可直接给两个数字起卦；与出生时间无关。"},{k:"daliuren",label:"六壬",timeLabel:"起卦时刻",hint:"大六壬用起卦时刻的日干支、时支与月将起天地盘；同样与出生时间无关。"},{k:"qimen",label:"奇门",timeLabel:"起局时刻",hint:"奇门时家转盘：用起局时刻定节气、三元与局数；换局规则决定符头与节气如何对齐。"},{k:"hepan",label:"合盘",timeLabel:"你的出生时刻",hint:"合盘按「日主 + 夫妻宫 + 五行互补」看两个人的相处与互补，需要双方出生信息。"},{k:"tarot",label:"塔罗",timeLabel:"",hint:"塔罗不看时间，只记录抽牌时刻与你的提问。"},{k:"almanac",label:"黄历",timeLabel:"",hint:"黄历按公历日期查农历、干支、宜忌、时辰吉凶、二十八宿与吉神方位；只做本地计算。"},{k:"convert",label:"农历",timeLabel:"",hint:"公农历互转：公历生日可反查农历；只知道农历生日时，可转成公历再排盘。"},{k:"zeri",label:"择日",timeLabel:"",hint:"择日把区间内每天的建除宜忌与事项适配打分排序，并按属相排除冲煞日。"},{k:"chenggu",label:"称骨",timeLabel:"出生时刻",hint:"称骨按农历年、月、日、时的骨重求和；时辰必填。"},{k:"xiaoliuren",label:"小六壬",timeLabel:"起课时刻",hint:"小六壬用农历月/日/时掐指，也可用三个随机数起课。"},{k:"star",label:"星座",timeLabel:"",hint:"星座按公历日期给出太阳星座与当日基调；同日同星座结果固定。"},{k:"numerology",label:"生命数字",timeLabel:"",hint:"生命数字按公历生日归约出生命路径数、生日数与态度数。"},{k:"mbti",label:"人格",timeLabel:"",hint:"十六型人格是 24 道自我报告题的 MBTI 风格测算：4 题一页，按 1–5 打分，答满 12 题即可看结果；只作自我参照，不是官方量表。"},{k:"trend",label:"人生K线",timeLabel:"出生时刻",hint:"人生 K 线按大运与流年十神给逐年运势分，画成走势图。"},{k:"fengshui",label:"风水",timeLabel:"",hint:"风水看八宅命卦、大游年四吉四凶与流年九宫飞星；也可按坐向看门主灶倾向，或按运与坐向排玄空下卦盘。"},{k:"name",label:"起名",timeLabel:"",hint:"起名按八字喜用匹配字库五行，可评估现有名字或生成候选名。"}];function ht(n){return String(n).padStart(2,"0")}const ha=["almanac","convert","zeri","chenggu","xiaoliuren","star","numerology","trend","fengshui","name"],Bi=Array.isArray(window.__MPGroups)?window.__MPGroups:[],Oa="mp.recent.tabs",Da="mp.first.view",Pa=3;function Ra(n){try{return JSON.parse(window.localStorage.getItem(n)||"null")}catch{return null}}function Ia(n,s){try{window.localStorage.setItem(n,JSON.stringify(s))}catch{}}function Zi(n){const s=new Date(n);if(Number.isNaN(s.getTime()))return"";const k=V=>new Date(V.getFullYear(),V.getMonth(),V.getDate()).getTime(),O=Math.round((k(new Date)-k(s))/864e5);return O<=0?"今天":O===1?"昨天":`${ht(s.getMonth()+1)}-${ht(s.getDate())}`}function ba(){const n=new Date;return{date:`${n.getFullYear()}-${ht(n.getMonth()+1)}-${ht(n.getDate())}`,time:`${ht(n.getHours())}:${ht(n.getMinutes())}`}}const Ui={ziwei:"birth",bazi:"birth",hepan:"birth",liuyao:"cast",meihua:"cast",daliuren:"cast",qimen:"cast",tarot:"none",almanac:"date",zeri:"date",star:"date",numerology:"date",convert:"date",chenggu:"birth",trend:"birth",fengshui:"birth",name:"birth",xiaoliuren:"cast",mbti:"none"},Ga={date:"1990-05-12",time:"14:30"},bt=n=>Ui[n]||"none",Ae=window.__MPCore||{},Re=Ae.needAsk||(n=>!1),X={ref:null,seats:[],seatOk:{},seatDisposers:[],contribution:"",keys:"",injectType:"",spec:"",errs:[],regs:0,mounted:0},rt={r:null,q:"",it:null};let Ye="";function Ba(){const n=[];return n.push("inputActions "+(X.ref?"已拿到":"未拿到")),n.push("渲染 "+X.mounted+" 次"),n.push("注册 "+X.regs+" 次"),n.push("inject "+(X.injectType||"?")),n.push("槽位 "+(X.spec||"?")),X.contribution&&n.push("贡献 "+X.contribution),X.errs.length&&n.push("错误："+X.errs.join(" / ")),"桥自检："+n.join("；")}function Za(n){if(X.errs.length>=3)return;const s=n&&n.message?String(n.message):String(n);X.errs.push(s.slice(0,90))}function Ki(n){if(!n)return null;const s=n.inputActions;if(s&&typeof s.setDraft=="function"&&typeof s.submit=="function")return s;const k=n.actions&&n.actions.input;return k&&typeof k.setDraft=="function"&&typeof k.submit=="function"?k:null}function Ua(n,s){const k=Ki(n);return xt(()=>{if(X.seats.indexOf(s)<0&&X.seats.push(s),X.keys=n?Object.keys(n).join(","):"",k){X.ref=k;try{window.__MPComposer=k}catch{}}return()=>{X.ref===k&&(X.ref=null)}},[k,s]),k}function Yi(){const n=rt.r;if(!n)return"";try{const s=Z.askPrompt?Z.askPrompt(n,{question:rt.q,interpret:rt.it}):null;return s&&s.text||String(n.summary||"")}catch{return String(n.summary||"")}}function Ka(n){return X.mounted+=1,Ua(n,"input.right")?l("button",{type:"button",className:"mp-chip ok",title:rt.r?"把上一张盘的摘要和问题发进对话窗":"先在侧栏「命理」里排一张盘",onClick:()=>{const k=Yi();k&&Va(k)}},"命理·问"):l("span",{className:"mp-chip warn",title:"命理：已占住输入框槽位，但没拿到 inputActions；把这句话告诉作者"},"命理·未就绪")}function Ya(n){return X.mounted+=1,Ua(n,"composer.dock"),null}function Va(n){let s=X.ref;if(!s)try{s=window.__MPComposer||null}catch{s=null}return!s||typeof s.setDraft!="function"||typeof s.submit!="function"?!1:(s.setDraft(n),s.submit(),!0)}function Vi(){const[n,s]=q("ziwei"),[k,O]=q("1990-05-12"),[V,ie]=q("14:30"),[se,re]=q(!1),[a,ge]=q("female"),[je,F]=q(""),[fe,xe]=q("1992-08-15"),[R,B]=q("10:00"),[D,U]=q("female"),[be,vt]=q(""),[Ve,Xe]=q("bazi"),[Le,yt]=q(!1),[Ie,Lt]=q("1990-01-01"),[$t,Ct]=q("12:00"),[wt,Et]=q("male"),[We,Kt]=q(""),[kt,Yt]=q("chaibu"),[Ge,Je]=q(!0),[Oe,Qe]=q(!0),[_t,Vt]=q("same-day"),[zt,ya]=q(!1),[Me,jt]=q(""),[Xt,ke]=q(""),[Wt,Ht]=q(null),[qt,Jt]=q({}),[pt,Qt]=q(null),[lt,ea]=q([{year:"2019",kind:"career"},{year:"2022",kind:"love"}]),[et,qe]=q(null),[Be,St]=q("开业"),[tt,Ft]=q("30"),[at,ta]=q(""),[dt,e]=q(""),[i,p]=q("solar2lunar"),[d,o]=q(""),[u,c]=q(!1),[m,f]=q("time"),[x,b]=q(""),[L,S]=q(""),[w,N]=q(""),[_,ee]=q(()=>new Array(Ut().total).fill(null)),[I,y]=q(0),[T,ne]=q("60"),[H,K]=q("natal"),[$,M]=q("9"),[j,W]=q("子"),[ce,ve]=q("午"),[te,me]=q("assess"),[ze,De]=q("李"),[Ce,it]=q(""),[ue,E]=q("6"),[Y,J]=q(!1),[pe,de]=q(""),[r,h]=q(null),[le,ae]=q(""),[$e,he]=q(""),[we,nt]=q(null),[st,aa]=q(()=>Ei()),[Nt,Qi]=q(()=>Ra(Da)==="flat"?"flat":"group"),[en,tn]=q(()=>{const t=Ra(Oa);return Array.isArray(t)?t:[]}),[an,nn]=q({}),[$a,Wa]=q(null),[Ja,ia]=q(()=>G.profilesLoad()),[Ot,na]=q(null),[Qa,ei]=q(""),[ct,Ze]=q(""),[ti,Te]=q(""),[sn,sa]=q(!1),[wa,ai]=q("3"),[ot,ka]=q(""),[Ee,ii]=q("general");function za(){return Me.trim()||(r&&Re(r.kind)?String(ot||"").trim():"")}xt(()=>{r&&r.r&&(rt.r=r.r,rt.q=za(),rt.it=r.it||null)},[r,Me,ot]);const[ni,on]=q(null),[rn,oa]=q(!1),[mt,si]=q("time"),[ra,oi]=q(""),[pa,ri]=q(""),[la,pi]=q(""),[pn,ut]=q(""),[ja,da]=q({birth:null,cast:null}),ln=Fe.find(t=>t.k===n)||Fe[0],Dt=n==="bazi"||n==="ziwei"||n==="hepan"||n==="chenggu"||n==="trend"||n==="fengshui"||n==="name",_e=bt(n),li=!(n==="meihua"&&mt==="number"),di=n!=="tarot"&&n!=="mbti"&&li,ci=di&&_e!=="date",Xn=ci,Se=async(t,g,z,C)=>{const v=t||n,oe=z||mt,ye=v==="bazi"||v==="trend",Ue=C&&typeof C.hourUnknown=="boolean"?C.hourUnknown:se,Ne=g||(ye&&Ue?{date:k,time:"12:00"}:{date:k,time:V}),He=C&&C.gender?C.gender:a,gt=C&&typeof C.address=="string"?C.address:je,Pt=C&&typeof C.trueSolar=="boolean"?C.trueSolar:Ge,Rt=C&&typeof C.lateZi=="boolean"?C.lateZi:Oe,ki=C&&typeof C.lines=="string"?C.lines:pe,ma=C&&typeof C.question=="string"?C.question:ot,zi=Tt(),ji=++Pe,It=()=>ji!==Pe;nt(null),Te("");try{let ft=0,qi=null;sa(!0);try{await fa(v);const P=window.__MP_LAST_LOAD;ft=P&&typeof P.ms=="number"?P.ms:Tt()-zi,qi=P&&typeof P.cached=="boolean"?P.cached:null}catch(P){if(It())return;Ze(P&&P.message?P.message:String(P)),h(null);return}finally{It()||sa(!1)}if(It())return;const Si=`${Ne.date}T${Ne.time}`,A={system:v};if(A.shadow=v!=="mbti",A.trace=v==="liuyao"||v==="bazi"||v==="ziwei"||v==="qimen"||v==="daliuren",v!=="tarot"&&(A.datetime=Si),v==="bazi"||v==="ziwei"||v==="hepan"||v==="trend"){if(A.gender=He,A.trueSolar=Pt,gt.trim()){A.address=gt.trim();try{const P=await Z.geocodeAddress(A.address,{online:Y});P&&typeof P.lon=="number"&&(A.longitude=P.lon,A.geo=P)}catch(P){console.error("[metaphysics] 地址解析失败，退回内置表",P)}if(It())return}(v==="bazi"||v==="ziwei")&&(A.cross=zt),A.lateZi=Rt,ye&&Ue&&(A.hourUnknown=!0)}if(v==="liuyao"){const P=Ae.parseLines(ki);P.lines?A.lines=P.lines:P.warning&&Te(P.warning)}if(v==="qimen"&&(A.juMethod=kt,A.lateZiHourMode=_t,A.direction=Ee),v==="bazi"&&(A.verifyPast=6),v==="zeri"){A.startDate=Ne.date,A.task=Be,A.days=Number(tt)||30,at&&(A.shengXiao=at);const P=dt.split(/[,，、\s]+/).filter(Boolean);P.length&&(A.candidates=P)}if(v==="xiaoliuren")if(A.mode=m,m==="number")A.num1=Number(x)||void 0,A.num2=Number(L)||void 0,A.num3=Number(w)||void 0;else{A.date=Ne.date;const P=Number(String(Ne.time).split(":")[0]);A.hour=Number.isFinite(P)?P:12}if(v==="mbti"){delete A.datetime;const P=_.slice();for(;P.length&&P[P.length-1]==null;)P.pop();P.length&&(A.answers=P)}if(v==="trend"&&ye&&Ue&&(A.hourUnknown=!0),v==="trend"&&(A.toAge=Number(T)||60),v==="fengshui"&&(A.action=H,H==="natal"?A.gender=He:(A.sitting=j,A.facing=ce,delete A.datetime,H==="xuankong"&&(A.period=Number($)||9))),v==="name"&&(A.action=te,A.surname=ze.trim(),te==="generate"?(A.gender=He,A.limit=Number(ue)||6,A.trueSolar=Pt,A.lateZi=Rt):(A.givenName=Ce.trim(),(!Ne.date||!Ne.time)&&delete A.datetime)),v==="convert")if(A.system="convert",i==="lunar2solar"){const P=/^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(d).trim());if(!P){Ze("农历转公历请按「农历年-月-日」填写，例如 2026-9-17；闰月单独勾选。");return}A.mode="lunar2solar",A.lunarYear=Number(P[1]),A.lunarMonth=Number(P[2]),A.lunarDay=Number(P[3]),A.isLeapMonth=u,delete A.datetime}else A.mode="solar2lunar";if(v==="tarot"&&(A.count=Number(wa)),v==="hepan"&&(A.chart=Ve,A.partner={datetime:`${fe}T${R}`,gender:D,address:be.trim()||void 0,trueSolar:Ge},Le&&(A.partner2={datetime:`${Ie}T${$t}`,gender:wt,address:We.trim()||void 0,trueSolar:Ge})),Re(v)){if(!ma.trim()){Ze("请先填写「所问之事」——一句话即可，例如：今年是否适合换工作？"),oa(!0),h(null);return}oa(!1),A.question=ma.trim(),v==="liuyao"&&(A.direction=Ee)}if(v==="meihua"&&(A.mode=oe,oe==="number")){if(ra.trim()===""||pa.trim()===""){Ze("数字起卦需要填两个数（第一个数定上卦、第二个数定下卦）。"),h(null);return}if(A.upper=Number(ra),A.lower=Number(pa),!Number.isFinite(A.upper)||!Number.isFinite(A.lower)){Ze("两个数都要是数字，例如 17 和 29。"),h(null);return}la!==""&&(A.changing=Number(la))}const Bn=Tt();v==="trend"&&!A.asOf&&Ae.todayStamp&&(A.asOf=Ae.todayStamp());const Mt=Z.compute(A),Zn=Tt()-Bn;let Sa=null;try{Sa=G.shadowTrack?G.shadowTrack(Mt):null}catch{Sa=null}let Na=null;if(v==="bazi")try{Na=Z.compute({system:"trend",datetime:Si,gender:He,toAge:100,trueSolar:Pt,lateZi:Rt,...Ae.todayStamp?{asOf:A.asOf||Ae.todayStamp()}:{},...A.dst!==void 0?{dst:A.dst}:{},...A.address?{address:A.address}:{},...typeof A.longitude=="number"?{longitude:A.longitude}:{},...A.geo?{geo:A.geo}:{}})}catch{Na=null}let Ma=null;if(Z.caliberCompare)try{Ma=Z.caliberCompare(A)}catch{Ma=null}const Un=Re(v)||v==="qimen"?{question:Re(v)?ma.trim():"",direction:Ee}:void 0,ua=Z.interpret?Z.interpret(Mt,Un):null;ua&&Mt.cross&&Z.crossSection&&(ua.sections=[...ua.sections||[],Z.crossSection(Mt.cross)]);const Kn=bt(v)==="cast"&&(v!=="meihua"||oe==="time");h({kind:v,r:Mt,it:ua,at:Ne,timed:Kn,trend:Na,caliber:Ma,shadowDiff:Sa,gender:He,address:gt,trueSolar:Pt,lateZi:Rt});const Ni=P=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>P>1?Ni(P-1):Mi()):setTimeout(Mi,0)},Mi=()=>{ji===Pe&&nt({engineMs:ft,computeMs:Zn,cached:qi,totalMs:Tt()-zi,renderMs:null})};if(Ni(2),Ht(null),Qt(null),Jt({}),qe(null),Ze(""),ut(""),v!=="tarot"&&v!=="mbti"){const P=!!(ye&&Ue),Ai={kind:v,date:Ne.date,time:P?"":Ne.time,hourUnknown:P,gender:He,address:gt,trueSolar:Pt,lateZi:Rt,lines:v==="liuyao"?ki:"",question:Re(v)?ma.trim():"",direction:Ee,count:wa,mhMode:oe,upper:ra,lower:pa,changing:la,...v==="qimen"?{qimenRule:kt,qLateZi:_t}:{},...v==="zeri"?{task:Be,days:tt,shengXiao:at,zCand:dt}:{},...v==="xiaoliuren"?{xlrMode:m,num1:x,num2:L,num3:w}:{},...v==="trend"?{toAge:T}:{},...v==="fengshui"?{fsMode:H,fsPeriod:$,sitting:j,facing:ce}:{},...v==="name"?{nnMode:te,surname:ze,givenName:Ce,limitN:ue}:{},...v==="convert"?{convMode:i,lunarDate:d,leapMonth:u}:{},...v==="hepan"?{hpChart:Ve,partnerDate:fe,partnerTime:R,partnerGender:D,partnerAddress:be,thirdOn:Le,p2Date:Ie,p2Time:$t,p2Gender:wt,p2Address:We}:{},label:Hi(v,Mt),at:Date.now()};aa(Yn=>{const Ti=[Ai,...Yn.filter(Vn=>!_i(Vn,Ai))].slice(0,20);return _a(Ti),Ti})}}catch(ft){if(It())return;Ze(ft&&ft.message?ft.message:String(ft)),h(null)}},dn=async t=>{const g=bt(t),z=++Pe;if(Ze(""),t==="mbti"){Te(""),sa(!0);try{await fa(t)}catch(v){z===Pe&&Ze(v&&v.message?v.message:String(v))}finally{z===Pe&&sa(!1)}if(z!==Pe)return;s(t),_.filter(v=>v!=null).length>=Ke?Se(t):h(null);return}if(s(t),g==="none"){Se(t);return}const C=ja[g]||(g==="cast"||g==="date"?ba():{date:Ga.date,time:Ga.time});O(C.date),ie(C.time),Se(t,C)},cn=t=>{Fe.some(g=>g.k===t)&&tn(g=>{const z=(g||[]).filter(v=>v&&v.tab&&v.tab!==t),C=[{tab:t,at:Date.now()}].concat(z).slice(0,Pa);return Ia(Oa,C),C})},mi=t=>{const g=t==="flat"?"flat":"group";Qi(g),Ia(Da,g)},qa=t=>{cn(t),dn(t)},mn=t=>{O(t),_e!=="none"&&da(g=>Object.assign({},g,{[_e]:{date:t,time:V}}))},un=t=>{ie(t),_e!=="none"&&da(g=>Object.assign({},g,{[_e]:{date:k,time:t}}))},Wn=()=>{const t=ba();O(t.date),ie(t.time),_e!=="none"&&da(g=>Object.assign({},g,{[_e]:null})),Se(n,t)},ui=()=>{if(n==="mbti"){const t=_.filter(g=>g!=null).length;if(t<Ke){Te(`先答满 ${Ke} 题再看结果（现答 ${t} 题，还差 ${Ke-t} 题）。`);return}Se(n);return}if(_e!=="none"&&!ja[_e]){const t=ba();O(t.date),ie(t.time),Se(n,t);return}Se(n)},gn=()=>{const t={date:"1990-05-12",time:"14:30"};s("bazi"),ge("male"),F("河北石家庄"),da(g=>Object.assign({},g,{birth:t})),O(t.date),ie(t.time),Se("bazi",t,null,{gender:"male",address:"河北石家庄"})},gi=t=>{si(t),Se(n,{date:k,time:V},t)},fn=()=>!!(window.matchMedia&&window.matchMedia("(max-width: 640px)").matches),xn=()=>ni===null?fn():ni,ca=(t,g,z)=>{if(!g)return;const C=oe=>{t.textContent=oe?"已复制":"复制失败",setTimeout(()=>{t.textContent=z},1400)},v=()=>{try{const oe=document.createElement("textarea");oe.value=g,oe.setAttribute("readonly",""),oe.style.position="fixed",oe.style.opacity="0",document.body.appendChild(oe),oe.select();const ye=!!(document.execCommand&&document.execCommand("copy"));return document.body.removeChild(oe),ye}catch{return!1}};try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(g).then(()=>C(!0),()=>C(v()));return}}catch{}C(v())},hn=t=>ca(t,t.getAttribute("data-shadow-copy")||"","复制 ID"),bn=t=>ca(t,t.getAttribute("data-handle-copy")||"","复制句柄"),vn=t=>{const g=t.closest(".mp-trace-layer")||document.getElementById("mp-trace-layer"),z=g&&g.querySelector("[data-trace-md]");ca(t,z?z.value:"","复制 Markdown")},yn=()=>{try{return String(location.href).split("#")[0]}catch{return""}},$n=()=>{if(!r||!r.r)return null;try{return Z.askPackages?Z.askPackages(r.r,{question:za(),interpret:r.it,base:yn()}):null}catch{return null}},fi=[["full","复制提问","完整提问：盘面摘要 + 阅读层次 + 回答骨架，粘进任何对话窗都能用"],["brief","复制精简","一句话版：体系 + 排盘句柄 + 你的问题，够助手认出是哪张盘"],["structured","复制参数","结构化参数（JSON）：助手可直接照 args 调 compute，不必解析自然语言"],["link","复制深链","深链：把这张盘的参数编进链接，打开即还原同一张盘（换台机器、发给朋友都行）"]],wn=(t,g)=>{const z=$n();if(!z){ke("还没有可以复制的盘：先排一张。");return}const C=t==="link"?z.link:z[t];if(!C){ke(t==="link"?"这张盘没拿到句柄（随机抽牌只复现参数、不复现牌面），深链做不出来；用「复制提问」那一档。":"这一档暂时是空的，换一档试试。");return}ca(g,C,fi.find(v=>v[0]===t)[1]),t==="link"&&ke("深链已复制：打开就还原这张盘，也可以直接发给别人。链接里是编码不是加密，别公开贴。")},kn=()=>{const t=document.getElementById("mp-trace-layer");if(!t)return;t.classList.add("open"),t.setAttribute("aria-hidden","false");const g=t.querySelector("[data-trace-close]");g&&g.focus&&g.focus()},xi=()=>{const t=document.getElementById("mp-trace-layer");if(!t)return;t.classList.remove("open"),t.setAttribute("aria-hidden","true");const g=document.querySelector("[data-trace-open]");g&&g.focus&&g.focus()},zn=t=>{const g=t.target&&t.target.closest?t.target.closest("[data-shadow-copy]"):null;if(g){hn(g);return}const z=t.target&&t.target.closest?t.target.closest("[data-handle-copy]"):null;if(z){bn(z);return}if(t.target&&t.target.closest?t.target.closest("[data-trace-open]"):null){kn();return}const v=t.target&&t.target.closest?t.target.closest("[data-trace-copy]"):null;if(v){vn(v);return}if(t.target&&t.target.closest?t.target.closest("[data-mp-askcopy]"):null){Sn();return}if(t.target&&t.target.closest?t.target.closest("[data-trace-close]"):null){xi();return}const Ue=t.target&&t.target.closest?t.target.closest(".mp-it-head"):null;if(!Ue)return;const Ne=Ue.closest(".mp-it");if(!Ne)return;const He=!Ne.classList.contains("folded");Ne.classList.toggle("folded",He),Ue.setAttribute("aria-expanded",He?"false":"true");const gt=Ue.querySelector(".mp-it-hint");gt&&(gt.textContent=He?"点击展开":"点击收起"),on(He)},hi=(t,g)=>{if(!r||!(Re(n)||n==="qimen"))return;const z={question:Re(n)?(g===void 0?ot:g).trim():"",direction:t===void 0?Ee:t},C=Z.interpret?Z.interpret(r.r,z):null;let v=r.r;if((n==="liuyao"||n==="qimen")&&v&&v.trace&&Z.buildTrace)try{const oe=n==="liuyao"?Z.buildTrace(v,{direction:z.direction,gender:v.useGod&&v.useGod.gender||"male",refresh:!0}):Z.buildTrace(v,{direction:z.direction});oe&&(v=Object.assign({},v,{trace:oe}))}catch{}h(Object.assign({},r,{r:v,it:C}))},jn=t=>!t||!t.timed||!t.at?"":`<div class="mp-cast">起卦时刻：<b>${t.at.date} ${t.at.time}</b>　（来自你的本机时间，点「此刻」可重新取当下）</div>`,qn=()=>{try{const t=r&&r.r&&r.r.summary?r.r.summary:"";if(!t)return;navigator.clipboard.writeText(t).then(()=>ut("已复制"),()=>ut("复制失败"))}catch{ut("复制失败")}},Sn=()=>{if(!r||!r.r||!window.Engine||!window.Engine.buildEventPrompt)return;const t=Ae&&Ae.kindOfDirection?Ae.kindOfDirection(Ee):"other";let g;try{g=window.Engine.buildEventPrompt(r.r,{question:(ot||"").trim(),kind:t,gender:a,timeKnown:!0})}catch{g=null}g&&g.text&&navigator.clipboard.writeText(g.text).then(()=>ut("已复制问事提示"),()=>ut("复制失败"))},bi=()=>{if(!(!r||!r.r||!Me.trim()))try{Ht(Z.followup?Z.followup(r.r,Me.trim()):null)}catch(t){Ht({question:Me.trim(),ok:!1,answer:"追问失败："+(t&&t.message?t.message:t),evidence:[],confidence:"弱"})}},Nn=()=>{if(!(!r||!r.r))try{const t=Z.askPrompt?Z.askPrompt(r.r,{question:za(),interpret:r.it}):null,g=t&&t.text?t.text:String(r.r.summary||"");if(Va(g)){ke("已发到对话窗，往下看回复。");return}const z="（"+Ba()+"）";navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(g).then(()=>ke("对话输入框还没就绪"+z+"，已复制提问；粘进对话窗回车即可。"),()=>ke("对话输入框还没就绪"+z+"，复制也没成功；先点「复制文字结果」再贴。")):ke("对话输入框还没就绪"+z+"；先点「复制文字结果」再贴进对话窗。")}catch(t){ke("发到对话窗失败："+(t&&t.message?t.message:t))}},Mn=()=>{const t=[],g=window.__MP_VER||"未知";t.push("# 命理插件反馈"),t.push(""),t.push("## 我遇到的情况"),t.push(""),t.push("（在这里写一句就好：哪里不对 / 读不懂哪一段 / 算得和别人不一样 / 想加什么。下面这些是自动带的复现信息，不用改。）"),t.push(""),t.push("## 复现信息"),t.push(""),t.push("- 插件版本：v"+g);{const v=Array.isArray(window.__MP_UNRELEASED)?window.__MP_UNRELEASED:[];v.length&&t.push("- 未发版改动："+v.length+" 项（版本号未变，说明这份产物比 v"+g+" 新）")}const z=Fe.find(v=>v.k===n)?.label||n;if(t.push("- 体系："+z+(z===n?"":"（"+n+"）")),ot&&t.push("- 所问之事："+ot),Ee&&Ee!=="general"){const v=(Array.isArray(Z.DIRECTIONS)?Z.DIRECTIONS:[]).find(oe=>oe.key===Ee);t.push("- 询问方向："+(v?v.label:Ee))}t.push(""),t.push("### 输入"),t.push(""),t.push("```"),(bt(n)==="time"||bt(n)==="date")&&(t.push(`日期：${k}`),bt(n)==="time"&&t.push(`时刻：${se?"（未知，按三柱排）":V}`),t.push(`性别：${a==="male"?"男":"女"}`),je&&t.push(`出生地：${je}`),t.push(`真太阳时：${Ge?"开":"关"}　晚子时换日：${Oe?"开":"关"}`),n==="qimen"&&t.push(`奇门取局：${kt}`),zt&&t.push("交叉验证：开"));const C={合盘:()=>{t.push(`对方：${fe} ${R} ${D==="male"?"男":"女"}${be?" "+be:""}（${Ve} 盘）`),Le&&t.push(`第三方：${Ie} ${$t} ${wt==="male"?"男":"女"}${We?" "+We:""}`)},择日:()=>{t.push(`事项：${Be}　起算：${k}　天数：${tt}${at?"　属相："+at:""}${dt?"　候选日："+dt:""}`)},起名:()=>{t.push(`姓：${ze||"（未填）"}　名：${Ce||"（未填）"}　模式：${te}${te==="generate"?"　候选数："+(ue||"默认"):""}`)},公农历:()=>{t.push(`模式：${i}${d?"　农历输入："+d:""}${u?"（闰月）":""}`)},小六壬:()=>{t.push(`模式：${m}${m==="number"?`　报数：${x}/${L}/${w}`:""}`)},风水:()=>{t.push(`动作：${H}${H==="natal"?"":`　坐：${j}　向：${ce}`}${H==="xuankong"?`　运：${$}`:""}`)}};if(C[z]&&C[z](),t.push("```"),t.push(""),ct&&(t.push("### 报错原文"),t.push(""),t.push("```"),t.push(String(ct)),t.push("```"),t.push("")),r&&r.r){t.push("### 结果摘要（引擎原文，前 40 行）"),t.push(""),t.push("```");const v=String(r.r.summary||(Z.renderText?Z.renderText(r.r):"")||"");t.push(v.split(`
`).slice(0,40).join(`
`)),t.push("```"),r.r.handle&&(t.push(""),t.push("排盘句柄（开发者可据此复现同一张盘）：`"+r.r.handle+"`"))}else t.push("### 结果摘要"),t.push(""),t.push("（这次没有生成盘面——如果是在排盘过程中出错，上面的「报错原文」就是关键。）");return t.push(""),t.push("## 联系渠道"),t.push(""),t.push("- GitHub issue：https://github.com/xuanfu-web/dsh-metaphysics/issues"),t.push("- 邮件：1129440028@qq.com"),t.push("- 微信群：dsh-metaphysics"),t.join(`
`)},vi=()=>{const t=Mn();try{if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(()=>{ae("已复制"),he("粘到 issue / 邮件 / 群里即可")}).catch(()=>{ae("复制失败"),he("可改用「导出 .md」或手动选中")});else{const g=document.createElement("textarea");g.value=t,g.style.cssText="position:fixed;left:-9999px;top:0",document.body.appendChild(g),g.select();const z=document.execCommand&&document.execCommand("copy");g.remove(),ae(z?"已复制":"复制失败"),he(z?"粘到 issue / 邮件 / 群里即可":"可改用「导出 .md」或手动选中")}}catch{ae("复制失败"),he("可改用「导出 .md」")}setTimeout(()=>{ae(""),he("")},4e3)},An=()=>{try{vi()}catch{}const t=encodeURIComponent("[反馈] "+(Fe.find(g=>g.k===n)?.label||n)+(ct?"：报错":"：使用问题"));try{window.open("https://github.com/xuanfu-web/dsh-metaphysics/issues/new?title="+t,"_blank","noopener")}catch{he("浏览器拦了弹窗，请手动打开 GitHub issues")}},Tn=()=>{if(!(!r||!r.r))try{const t=Z.renderText?Z.renderText(r.r):r.r.summary||"",g=new Blob([t],{type:"text/markdown;charset=utf-8"}),z=document.createElement("a");z.href=URL.createObjectURL(g),z.download=`命理报告-${r.r.system}.md`,document.body.appendChild(z),z.click(),z.remove(),setTimeout(()=>URL.revokeObjectURL(z.href),2e3)}catch(t){console.error("[metaphysics] 导出失败",t)}},Ln=()=>{if(!(!r||!r.r))try{const t=G.summaryCardPNG?G.summaryCardPNG(r.r,r.it):"";if(!t){ut("当前环境不支持 Canvas 导出");return}const g=document.createElement("a");g.href=t,g.download=`命理摘要-${r.r.system}.png`,document.body.appendChild(g),g.click(),g.remove()}catch(t){console.error("[metaphysics] 长图导出失败",t)}},yi={fontSize:12,padding:"5px 12px"},Cn=()=>{!r||!r.r||!r.r.past||Qt(Z.verifyFit?Z.verifyFit(r.r.past.rows,qt):null)},En=()=>{if(!(!r||r.kind!=="bazi"))try{const t=r.at||{date:k,time:V},[g,z,C]=String(t.date).split("-").map(Number),[,v]=String(t.time).split(":").map(Number),oe=lt.filter(ye=>Number(ye.year)).map(ye=>({year:Number(ye.year),kind:ye.kind}));qe(Z.rectifyBirth?Z.rectifyBirth({base:{year:g,month:z,day:C,minute:Number.isFinite(v)?v:0},gender:r.gender||a,events:oe,lateZi:typeof r.lateZi=="boolean"?r.lateZi:Oe,trueSolar:typeof r.trueSolar=="boolean"?r.trueSolar:Ge,address:String(r.address||"").trim()||void 0}):{error:"当前客户端未加载生时校正模块"})}catch(t){qe({error:t&&t.message?t.message:String(t)})}},Q=(t,g)=>l("label",{className:"mp-field"},l("span",{className:"mp-lbl"},t),g),_n=t=>{s(t.kind),t.date&&O(t.date),t.time&&ie(t.time),re(!!t.hourUnknown),t.gender&&ge(t.gender),F(t.address||""),typeof t.trueSolar=="boolean"&&Je(t.trueSolar),typeof t.lateZi=="boolean"&&Qe(t.lateZi),de(t.lines||""),ka(t.question||""),ii(t.direction||"general"),ai(t.count||"3"),si(t.mhMode||"time"),oi(t.upper||""),ri(t.lower||""),pi(t.changing||""),t.kind==="qimen"&&(typeof t.qimenRule=="string"&&Yt(t.qimenRule),typeof t.qLateZi=="string"&&Vt(t.qLateZi)),t.kind==="zeri"&&(typeof t.task=="string"&&St(t.task),t.days!=null&&Ft(String(t.days)),typeof t.shengXiao=="string"&&ta(t.shengXiao),typeof t.zCand=="string"&&e(t.zCand)),t.kind==="xiaoliuren"&&(f(t.xlrMode==="number"?"number":"time"),t.num1!=null&&b(String(t.num1)),t.num2!=null&&S(String(t.num2)),t.num3!=null&&N(String(t.num3))),t.kind==="trend"&&t.toAge!=null&&ne(String(t.toAge)),t.kind==="fengshui"&&(typeof t.fsMode=="string"&&K(t.fsMode),t.fsPeriod!=null&&M(String(t.fsPeriod)),typeof t.sitting=="string"&&W(t.sitting),typeof t.facing=="string"&&ve(t.facing)),t.kind==="name"&&(typeof t.nnMode=="string"&&me(t.nnMode),typeof t.surname=="string"&&De(t.surname),typeof t.givenName=="string"&&it(t.givenName),t.limitN!=null&&E(String(t.limitN))),t.kind==="convert"&&(typeof t.convMode=="string"&&p(t.convMode),typeof t.lunarDate=="string"&&o(t.lunarDate),typeof t.leapMonth=="boolean"&&c(t.leapMonth)),t.kind==="hepan"&&(t.hpChart&&Xe(t.hpChart),typeof t.partnerDate=="string"&&xe(t.partnerDate),typeof t.partnerTime=="string"&&B(t.partnerTime),typeof t.partnerGender=="string"&&U(t.partnerGender),typeof t.partnerAddress=="string"&&vt(t.partnerAddress),typeof t.thirdOn=="boolean"&&yt(t.thirdOn),typeof t.p2Date=="string"&&Lt(t.p2Date),typeof t.p2Time=="string"&&Ct(t.p2Time),typeof t.p2Gender=="string"&&Et(t.p2Gender),typeof t.p2Address=="string"&&Kt(t.p2Address)),oa(!1),Wa(t)},Hn=()=>{aa([]),_a([])},Fn=["bazi","ziwei","trend","chenggu"],$i=t=>{s(t.kind),O(t.date),t.time&&ie(t.time),re(!!t.hourUnknown),t.gender&&ge(t.gender),F(t.address||""),Je(t.trueSolar!==!1),Qe(t.lateZi!==!1)},On=t=>{const g=G.profEvent(t.target);if(!g)return;const z=v=>Ja.find(oe=>oe.id===v),C=t.currentTarget.querySelector(".mp-prof-name");if(ei(""),g.action==="use"){const v=z(g.id);if(!v)return;if(!G.profUsable(v)){Te("这张档案没有出生时刻，先补上时刻再存一次。");return}Ye="",ia(G.profilesTouch(v.id)),$i(v),Se(v.kind,{date:v.date,time:v.hourUnknown?"12:00":v.time},void 0,{gender:v.gender||void 0,address:v.address||"",hourUnknown:!!v.hourUnknown,trueSolar:v.trueSolar!==!1,lateZi:v.lateZi!==!1});return}if(g.action==="edit"){const v=z(g.id);if(!v)return;$i(v),Ye=v.label,na(v.id);return}if(g.action==="cancel"){Ye="",na(null);return}if(g.action==="pin"){ia(G.profilesPin(g.id));return}if(g.action==="del"){if(Qa!==g.id){ei(g.id);return}ia(G.profilesRemove(g.id)),Ot===g.id&&(Ye="",na(null)),Te("已从本机删除这张档案卡（不影响已经排出来的盘）。");return}if(g.action==="put"){const v=Ot,oe=G.profFromForm({kind:n,date:k,time:V,hourUnknown:se,gender:a,address:je,trueSolar:Ge,lateZi:Oe},C?C.value:Ye,Ot||void 0);if(!oe){Te("先填好出生日期（和时刻），再存档案。");return}const ye=G.profilesPut(oe);if(!ye.ok){Te("档案没能存进本机（存储被禁用或已满），排盘不受影响。");return}ia(ye.list),Ye="",na(null),C&&(C.value=""),Te(`${v?"已更新档案":"已存入我的命盘"}「${ye.item.label}」。`)}},Dn=t=>{const g=t.target&&t.target.closest?t.target.closest(".mp-prof-name"):null;g&&(Ye=g.value)},Pn=t=>{const g=Z.formOf?Z.formOf(t):null;if(!g){Se("ziwei");return}const z=Fe.some(ye=>ye.k===g.tab)?g.tab:"ziwei",C={date:g.date||k,time:g.time||V},v=g.lines===void 0?void 0:Array.isArray(g.lines)?g.lines.join(" "):String(g.lines);g.date&&O(g.date),g.time&&ie(g.time),g.gender&&ge(g.gender),typeof g.address=="string"&&F(g.address),typeof g.trueSolar=="boolean"&&Je(g.trueSolar),typeof g.lateZi=="boolean"&&Qe(g.lateZi),v!==void 0&&de(v),g.question&&ka(g.question),s(z);const oe=Z.restNote?Z.restNote(g):"";ke(`已按深链还原：${t.label}${g.question?`｜${g.question}`:""}${oe?`　${oe}`:""}`),Se(z,C,void 0,{gender:g.gender,address:g.address,trueSolar:g.trueSolar,lateZi:g.lateZi,lines:v,question:g.question})};xt(()=>{let t=!1;const g=Pe;return(async()=>{let z=null;try{await fa(n);const C=typeof location<"u"?String(location.href):"";C&&C.indexOf("mp=")>=0&&window.Engine&&window.Engine.parseAskLink&&(z=window.Engine.parseAskLink(C))}catch{z=null}if(!(t||Pe!==g)){if(z&&z.ok)try{Pn(z);return}catch{}Se("ziwei")}})(),()=>{t=!0}},[]),xt(()=>{if(!$a)return;const t=$a.kind;Wa(null),Se(t)},[$a]),xt(()=>{const t=g=>{if(g.key!=="Escape")return;const z=document.getElementById("mp-trace-layer");z&&z.classList.contains("open")&&xi()};return document.addEventListener("keydown",t),()=>document.removeEventListener("keydown",t)},[]);const wi=(en||[]).filter(t=>t&&Fe.some(g=>g.k===t.tab)).slice(0,Pa),Rn=t=>(Fe.find(g=>g.k===t)||{}).label||t,In=({k:t,label:g,tip:z,wide:C})=>l("button",{key:t,type:"button",className:"mp-tool"+(C?" wide":"")+(n===t?" on":""),"data-tab":t,onClick:()=>qa(t)},l("b",null,g),l("span",null,z)),Gn=[l("div",{key:"profiles",className:"mp-profwrap",onClick:On,onInput:Dn,dangerouslySetInnerHTML:{__html:G.profilesHTML(Ja,{editingId:Ot,armedDel:Qa,bar:Fn.indexOf(n)>=0?G.profilesBarHTML({editingId:Ot,name:Ye}):""})}}),l("section",{key:"start",className:"mp-start","aria-label":"选择要算的事"},l("div",{className:"mp-start-top"},l("div",{className:"mp-recent",hidden:wi.length===0},l("span",{className:"mp-recent-lbl"},"最近用过"),l("span",{className:"mp-recent-list"},wi.map(t=>l("button",{key:t.tab,type:"button",className:"mp-rc",onClick:()=>qa(t.tab)},Rn(t.tab),l("i",null,Zi(t.at)))))),l("div",{className:"mp-viewsw",role:"group","aria-label":"首屏视图"},l("button",{type:"button",className:Nt==="group"?"on":"","aria-pressed":Nt==="group"?"true":"false",onClick:()=>mi("group")},"分组"),l("button",{type:"button",className:Nt==="flat"?"on":"","aria-pressed":Nt==="flat"?"true":"false",onClick:()=>mi("flat")},"平铺"))),Nt==="group"?l("div",{className:"mp-groups"},Bi.map(t=>{const g=!!an[t.title],z=Math.max(0,t.items.length-4);return l("section",{key:t.title,className:"mp-tgroup"+(g?" open":"")},l("div",{className:"mp-tgroup-head"},l("h2",null,t.title),l("p",null,t.hint)),l("div",{className:"mp-ttools"},t.items.map(In),z>0?l("button",{key:"more",type:"button",className:"mp-tmore","aria-expanded":g?"true":"false",onClick:()=>nn(C=>Object.assign({},C,{[t.title]:!g}))},g?"收起":`还有 ${z} 个`):null))})):null),l("div",{key:"tabs",className:"mp-tabs"+(Nt==="flat"?"":" hide"),role:"tablist","aria-label":"命理体系"},Fe.map(t=>l("button",{key:t.k,role:"tab","aria-selected":n===t.k?"true":"false",tabIndex:n===t.k?0:-1,className:"mp-tab"+(n===t.k?" on":""),onClick:()=>qa(t.k)},t.label))),l("div",{key:"head",className:"mp-panel"},l("div",{className:"mp-row"},di?Q(Dt?"出生日期（公历）":_e==="date"?"日期（公历）":"起卦日期（公历）",l(xa,{value:k,onChange:mn,onInvalid:()=>Te("日期请按「年-月-日」填写，例如 1990-05-12。")})):null,ci?Q(Dt?"出生时刻":"起卦时刻",l("input",{className:"mp-input",type:"time",value:V,disabled:se&&(n==="bazi"||n==="trend"),onChange:t=>un(t.target.value)})):null,n==="bazi"||n==="trend"?l("label",{className:"mp-chk",title:"不知道出生时辰时勾这里：不排时柱，起运按日估算，结果首行会写明"},l("input",{type:"checkbox",checked:se,onChange:t=>re(t.target.checked)})," 时辰未知"):null,Dt?Q("性别",l("select",{className:"mp-input",value:a,onChange:t=>ge(t.target.value)},l("option",{value:"female"},"女"),l("option",{value:"male"},"男"))):null,Dt?Q("出生地（省/市即可）",l("input",{className:"mp-input",placeholder:"如 河北石家庄 / 成都",value:je,onChange:t=>F(t.target.value)})):null,n==="bazi"||n==="ziwei"?l("label",{className:"mp-field mp-checks"},l("input",{type:"checkbox",checked:zt,onChange:t=>ya(t.target.checked)}),l("span",{className:"mp-lbl"},"八字 × 紫微 交叉验证")):null,n==="hepan"?Q("对方出生日期",l(xa,{value:fe,onChange:xe,onInvalid:()=>Te("对方出生日期请按「年-月-日」填写，例如 1992-08-15。")})):null,n==="hepan"?Q("对方出生时刻",l("input",{className:"mp-input",type:"time",value:R,onChange:t=>B(t.target.value)})):null,n==="hepan"?Q("对方性别",l("select",{className:"mp-input",value:D,onChange:t=>U(t.target.value)},l("option",{value:"female"},"女"),l("option",{value:"male"},"男"))):null,n==="hepan"?Q("合盘方式",l("div",{className:"mp-seg"},l("button",{className:Ve==="bazi"?"on":"",onClick:()=>Xe("bazi")},"八字"),l("button",{className:Ve==="ziwei"?"on":"",onClick:()=>Xe("ziwei")},"紫微"))):null,n==="hepan"?Q("对方出生地（可空）",l("input",{className:"mp-input",placeholder:"如 四川成都",value:be,onChange:t=>vt(t.target.value)})):null,n==="hepan"?l("label",{className:"mp-field mp-checks"},l("input",{type:"checkbox",checked:Le,onChange:t=>yt(t.target.checked)}),l("span",{className:"mp-lbl"},"三方合盘（加入第三人）")):null,n==="hepan"&&Le?Q("第三方出生日期",l(xa,{value:Ie,onChange:Lt,onInvalid:()=>Te("第三方出生日期请按「年-月-日」填写，例如 1990-01-01。")})):null,n==="hepan"&&Le?Q("第三方出生时刻",l("input",{className:"mp-input",type:"time",value:$t,onChange:t=>Ct(t.target.value)})):null,n==="hepan"&&Le?Q("第三方性别",l("select",{className:"mp-input",value:wt,onChange:t=>Et(t.target.value)},l("option",{value:"female"},"女"),l("option",{value:"male"},"男"))):null,n==="hepan"&&Le?Q("第三方出生地（可空）",l("input",{className:"mp-input",placeholder:"如 广东广州",value:We,onChange:t=>Kt(t.target.value)})):null,n==="qimen"?l("fieldset",{key:"qmr",className:"mp-qmrule"},l("legend",{className:"mp-lbl"},"换局规则"),l("div",{className:"mp-qmopts",role:"radiogroup","aria-label":"奇门换局规则"},[["chaibu","拆补"],["chaoshen","超神接气"],["zhirun","置闰"]].map(([t,g])=>l("label",{key:t,className:"mp-qmopt"},l("input",{type:"radio",name:"qimen_rule",value:t,checked:kt===t,onChange:()=>Yt(t)}),l("span",null,g)))),l("div",{className:"mp-field"},l("span",{className:"mp-lbl"},"晚子时"),l("select",{className:"mp-input",value:_t,onChange:t=>Vt(t.target.value)},l("option",{value:"same-day"},"23:00 后归当日"),l("option",{value:"next-day"},"23:00 后归次日"))),l("details",{className:"mp-qmhelp"},l("summary",null,"三种规则有什么区别？"),l("p",null,"决定符头与节气如何对齐、是否插入闰局；同一个时刻在不同规则下可能得到不同局数。默认「拆补」与工具层一致。"))):null,Re(n)||n==="qimen"?Q(n==="qimen"?"询问方向（定用神）":"询问方向",l("select",{className:"mp-input",value:Ee,onChange:t=>{ii(t.target.value),hi(t.target.value)}},(Z.DIRECTIONS||[]).map(t=>l("option",{key:t.key,value:t.key},t.label)))):null,n==="tarot"?Q("张数",l("select",{className:"mp-input",value:wa,onChange:t=>ai(t.target.value)},l("option",{value:"1"},"1 张 · 指引"),l("option",{value:"3"},"3 张 · 过去现在未来"),l("option",{value:"5"},"5 张 · 十字牌阵"))):null,n==="liuyao"?Q("六爻（可空）",l("input",{className:"mp-input",placeholder:"空则随机，如 9 7 8 8 7 6",value:pe,onChange:t=>de(t.target.value)})):null,n==="meihua"?Q("起卦方式",l("div",{className:"mp-seg"},l("button",{className:mt==="time"?"on":"",onClick:()=>gi("time")},"时间"),l("button",{className:mt==="number"?"on":"",onClick:()=>gi("number")},"数字"))):null,n==="meihua"&&mt==="number"?Q("第一个数",l("input",{className:"mp-input",value:ra,placeholder:"如 17",onChange:t=>oi(t.target.value)})):null,n==="meihua"&&mt==="number"?Q("第二个数",l("input",{className:"mp-input",value:pa,placeholder:"如 29",onChange:t=>ri(t.target.value)})):null,n==="meihua"&&mt==="number"?Q("动爻（可空）",l("input",{className:"mp-input",value:la,placeholder:"1-6",onChange:t=>pi(t.target.value)})):null,n==="zeri"?Q("所办事项",l("select",{className:"mp-input",value:Be,onChange:t=>St(t.target.value)},[["常用",["嫁娶","搬家入宅","出行","开业","签订合同","祭祀"]],["婚嫁",["嫁娶","订婚","领证","提亲","收送聘金","满月酒"]],["生活",["搬家","入宅","旅行","访亲友","入学","求医","祭祀"]],["建造",["动土","装修","装修建造","安葬","试车买车"]],["工商",["开业","交易","投资","签订合同","签约","纳财","赴任"]]].map(([t,g])=>l("optgroup",{key:t,label:t},g.map(z=>l("option",{key:`${t}-${z}`,value:z},z)))))):null,n==="convert"?Q("转换方向",l("div",{className:"mp-seg"},l("button",{className:i==="solar2lunar"?"on":"",onClick:()=>p("solar2lunar")},"公历 → 农历"),l("button",{className:i==="lunar2solar"?"on":"",onClick:()=>p("lunar2solar")},"农历 → 公历"))):null,n==="convert"&&i==="lunar2solar"?Q("农历日期",l("input",{className:"mp-input",value:d,placeholder:"如 2026-9-17",onChange:t=>o(t.target.value)})):null,n==="convert"&&i==="lunar2solar"?l("label",{className:"mp-check"},l("input",{type:"checkbox",checked:u,onChange:t=>c(t.target.checked)})," 闰月"):null,n==="zeri"?Q("看多少天",l("input",{className:"mp-input",type:"number",min:1,max:60,value:tt,onChange:t=>Ft(t.target.value)})):null,n==="zeri"?Q("候选日（可空，只比这几天）",l("input",{className:"mp-input",placeholder:"如 2026-12-01, 2026-12-08, 2026-12-15",value:dt,onChange:t=>e(t.target.value)})):null,n==="zeri"?Q("当事人属相（可空）",l("select",{className:"mp-input",value:at,onChange:t=>ta(t.target.value)},l("option",{value:""},"不排除"),["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"].map(t=>l("option",{key:t,value:t},t)))):null,n==="xiaoliuren"?Q("起课方式",l("div",{className:"mp-seg"},l("button",{className:m==="time"?"on":"",onClick:()=>f("time")},"时间"),l("button",{className:m==="number"?"on":"",onClick:()=>f("number")},"报数"))):null,n==="xiaoliuren"&&m==="number"?Q("第一个数",l("input",{className:"mp-input",type:"number",min:1,max:99,value:x,onChange:t=>b(t.target.value)})):null,n==="xiaoliuren"&&m==="number"?Q("第二个数",l("input",{className:"mp-input",type:"number",min:1,max:99,value:L,onChange:t=>S(t.target.value)})):null,n==="xiaoliuren"&&m==="number"?Q("第三个数",l("input",{className:"mp-input",type:"number",min:1,max:99,value:w,onChange:t=>N(t.target.value)})):null,n==="mbti"?l("div",{className:"mp-quiz-wrap"},l("div",{className:"mp-lbl"},"十六型人格问卷 · 4 题一页，按 1（完全不像）到 5（很像我）打分"),l(Ri,{answers:_,page:I,onPick:(t,g)=>ee(z=>{const C=z.slice();return C[t]=g,C}),onPage:t=>y(g=>Math.max(0,Math.min(g+t,Math.max(0,Math.ceil(Ut().total/Bt)-1)))),onSubmit:ui,onClear:()=>{ee(new Array(Ut().total).fill(null)),y(0),h(null)}})):null,n==="trend"?Q("算到几岁",l("input",{className:"mp-input",type:"number",min:10,max:100,value:T,onChange:t=>ne(t.target.value)})):null,n==="fengshui"?Q("看什么",l("div",{className:"mp-seg"},l("button",{className:H==="natal"?"on":"",onClick:()=>K("natal")},"命卦"),l("button",{className:H==="advise"?"on":"",onClick:()=>K("advise")},"门主灶"),l("button",{className:H==="xuankong"?"on":"",onClick:()=>K("xuankong")},"玄空"))):null,n==="fengshui"&&H!=="natal"?Q("坐山（24 山）",l("input",{className:"mp-input",value:j,placeholder:"如 子 / 乾",onChange:t=>W(t.target.value)})):null,n==="fengshui"&&H!=="natal"?Q("朝向（24 山）",l("input",{className:"mp-input",value:ce,placeholder:"如 午 / 巽",onChange:t=>ve(t.target.value)})):null,n==="fengshui"&&H==="xuankong"?Q("运（1–9）",l("input",{className:"mp-input",type:"number",min:1,max:9,value:$,onChange:t=>M(t.target.value)})):null,n==="name"?Q("看什么",l("div",{className:"mp-seg"},l("button",{className:te==="assess"?"on":"",onClick:()=>me("assess")},"评名字"),l("button",{className:te==="generate"?"on":"",onClick:()=>me("generate")},"生成候选"))):null,n==="name"?Q("姓",l("input",{className:"mp-input",value:ze,placeholder:"如 李",onChange:t=>De(t.target.value)})):null,n==="name"&&te==="assess"?Q("名字",l("input",{className:"mp-input",value:Ce,placeholder:"如 沐宸",onChange:t=>it(t.target.value)})):null,n==="name"&&te==="generate"?Q("候选个数",l("input",{className:"mp-input",type:"number",min:1,max:20,value:ue,onChange:t=>E(t.target.value)})):null),Dt?l("div",{className:"mp-checks"},l("label",{title:"按出生地经度把钟表时间换算成真太阳时"},l("input",{type:"checkbox",checked:Ge,onChange:t=>Je(t.target.checked)}),"真太阳时"),l("label",{title:"23:00–23:59 出生时：勾选=按次日日柱起时柱；不勾=仍用当日日柱"},l("input",{type:"checkbox",checked:Oe,onChange:t=>Qe(t.target.checked)}),"晚子时换日"),l("label",{title:"开启后会请求 OpenStreetMap，把区县/村落到更精确的坐标"},l("input",{type:"checkbox",checked:Y,onChange:t=>J(t.target.checked)}),"联网精确到区县")):null,Re(n)?l("div",{className:"mp-askblock"},l("span",{className:"mp-lbl"},"所问之事（必填）"),l("textarea",{className:"mp-textarea"+(rn?" invalid":""),rows:2,value:ot,placeholder:"用一句话描述所问之事，例如：今年是否适合换工作？",onChange:t=>{ka(t.target.value),oa(!1)},onBlur:t=>hi(void 0,t.target.value)})):null,n==="mbti"?null:l("div",{key:"actions",className:"mp-actions"},l("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginRight:8},onClick:gn,title:"用固定示例盘看完整报告（不改动你已填的数据）"},"看示例"),l("button",{className:"mp-btn",onClick:ui,title:"时间仍为自动时，点它会取当下再起卦"},n==="tarot"?"抽牌":n==="bazi"||n==="ziwei"?"排盘":n==="hepan"?"合盘":n==="qimen"?"起局":ha.indexOf(n)>=0?"看结果":"起卦"))),l("div",{key:"hint",className:"mp-hint"},ln.hint),st.length?l("div",{key:"hist",className:"mp-hist"},l("div",{className:"mp-hist-h"},l("span",null,"最近排过"),l("button",{className:"mp-hist-clear",onClick:Hn},"清空")),l("div",{className:"mp-hist-list"},st.map((t,g)=>l("button",{key:g,className:"mp-hist-item",title:`${String(t.date||"")} ${t.hourUnknown?"时辰未知":String(t.time||"")}`,onClick:()=>_n(t)},l("b",null,(Fe.find(z=>z.k===t.kind)||{}).label||t.kind),l("span",null,t.label||"—"),l("i",null,`${String(t.date||"").slice(5)} ${t.hourUnknown?"时辰未知":String(t.time||"")}`))))):null,_e==="cast"&&li?l("div",{key:"auto",className:"mp-auto"},ja.cast?`起卦时刻用的是你手动填的（${V}）；想跟随当下，把时间改回或清空即可。`:`起卦时刻已自动取本机时间（${V}），每次点起卦都会重新取当下；想固定时刻就在上面改。`):null,ct?l("div",{key:"err",className:"mp-err",role:"alert"},ct):null,ti?l("div",{key:"ntc",className:"mp-note",role:"status"},ti):null,sn?l("div",{key:"load",className:"mp-note",role:"status"},"正在加载本页需要的引擎…"):null,!r&&!ct?l("div",{key:"empty",className:"mp-empty"},l("b",null,n==="ziwei"||n==="bazi"?"填好出生信息，点「排盘」":n==="tarot"?"写下想问的事，点「抽牌」":n==="mbti"?"按 1–5 给题目打分，答满 12 题就能看结果":ha.indexOf(n)>=0?"填好参数，点「看结果」":"写下所问之事，点「起卦」"),n==="ziwei"||n==="bazi"?"出生日期、时刻与性别即可；出生地只影响真太阳时。":n==="mbti"?"4 题一页，答案只在本地参与计算，不会上传。":ha.indexOf(n)>=0?"按上面的选项填好参数即可；全部在本机计算，不上传。":"起卦时刻已自动取当下，也可以手动改。"):null,r?l("div",{key:"card",className:"mp-card mp-flat",role:"region","aria-label":"排盘结果","aria-live":"polite",onClick:zn,dangerouslySetInnerHTML:{__html:jn(r)+G.perfHTML(we)+G.revisionHTML(r.r.revision)+G.handleHTML(r.r.handle)+G.shadowHTML(r.r.shadow,r.shadowDiff)+G.traceHTML(r.r.trace,r.r.system,r.r.traceText)+G.resultWithInterpret(r.kind==="ziwei"?G.ziweiHTML(r.r):r.kind==="bazi"?G.baziHTML(r.r)+(r.trend?G.trendHTML(r.trend,{brief:!1}):""):r.kind==="meihua"?G.meihuaHTML(r.r):r.kind==="daliuren"?G.daliurenHTML(r.r):r.kind==="qimen"?G.qimenHTML(r.r)+G.qimenFactsHTML(r.r):r.kind==="hepan"?r.r.chart==="ziwei"?G.ziweiHepanHTML(r.r):G.hepanHTML(r.r):r.kind==="tarot"?G.tarotHTML(r.r):r.kind==="liuyao"?G.liuyaoHTML(r.r):r.kind==="chenggu"?G.chengguHTML(r.r):r.kind==="almanac"?G.almanacHTML(r.r):r.kind==="zeri"?G.zeriHTML(r.r):r.kind==="trend"?G.trendHTML(r.r):r.kind==="name"?G.nameHTML(r.r):r.kind==="mbti"?G.mbtiHTML(r.r):r.kind==="fengshui"?G.fengshuiHTML(r.r):G.quickHTML(r.r),r.it,{folded:xn()})+G.caliberHTML(r.caliber)}}):null,r?l("div",{key:"bar",className:"mp-bar"},l("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px"},onClick:qn},pn||"复制文字结果"),l("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:Tn,title:"导出盘面 + 解析（含一页读懂、三张表）为 Markdown"},"导出 .md"),l("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:Ln,title:"生成 PNG 摘要卡（一页读懂 + 首张表），适合直接分享"},"存为摘要长图")):null,r?l("div",{key:"ask",className:"mp-askbox",style:{flexWrap:"wrap"}},l("input",{className:"mp-input",value:Me,maxLength:120,placeholder:"追问：如 2027 年事业怎么样（回车提交）",onChange:t=>jt(t.target.value),onKeyDown:t=>{t.key==="Enter"&&bi()}}),l("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px"},onClick:bi},"追问"),l("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:Nn,title:"把这张盘的摘要和你的问题一起发进 DSH 对话窗，由对话里的模型接着答"},"问进对话"),X.ref?null:l("div",{key:"bridgediag",className:"mp-note",style:{marginTop:6,fontSize:11,flexBasis:"100%"}},Ba()),Xt?l("div",{key:"chatnote",className:"mp-note",style:{marginTop:6,fontSize:12,flexBasis:"100%"}},Xt):null):null,r?l("div",{key:"bridge",className:"mp-bridge"},l("span",{className:"mp-bridge-lbl"},X.ref?"桥可用；也可以：":"桥未就绪，改走这几档："),fi.map(([t,g,z])=>l("button",{key:t,type:"button",className:"mp-chip","data-bridge-copy":t,title:z,onClick:C=>wn(t,C.currentTarget)},g))):null,Wt?l("div",{key:"fx",className:"mp-fx",dangerouslySetInnerHTML:{__html:G.followupHTML(Wt)}}):null,r&&r.kind==="bazi"&&r.r.past?l("div",{key:"verify",className:"mp-verify"},l("div",{className:"mp-verify-h"},"验前事 · 过去几年的信号（只读，不改盘）"),r.r.past.rows.map(t=>l("div",{key:t.year,className:"mp-verify-row"},l("span",{className:"mp-verify-txt"},`${t.year} ${t.ganzhi} · ${t.theme}`),l("span",{className:"mp-verify-btns"},["yes","no","unsure"].map(g=>l("button",{key:g,className:"mp-chip"+(qt[t.year]===g?" on":""),onClick:()=>Jt(Object.assign({},qt,{[t.year]:g}))},g==="yes"?"准":g==="no"?"不准":"不确定"))))),l("div",{className:"mp-verify-foot"},l("button",{className:"mp-btn ghost",style:yi,onClick:Cn},"算贴合度"),pt?l("span",{className:"mp-verify-fit"},`命中 ${pt.yes}/${pt.answered}（${pt.level}）：${pt.advice}`):null)):null,r&&r.kind==="bazi"?l("div",{key:"rect",className:"mp-rect"},l("div",{className:"mp-verify-h"},"生时校正 · 用过去的事反推时辰"),lt.map((t,g)=>l("div",{key:g,className:"mp-rect-row"},l("input",{className:"mp-input",type:"number",min:1900,max:2100,value:t.year,onChange:z=>ea(lt.map((C,v)=>v===g?Object.assign({},C,{year:z.target.value}):C))}),l("select",{className:"mp-input",value:t.kind,onChange:z=>ea(lt.map((C,v)=>v===g?Object.assign({},C,{kind:z.target.value}):C))},[["career","事业变动"],["wealth","财运"],["love","感情"],["move","搬迁/出行"],["health","健康"],["other","其他"]].map(([z,C])=>l("option",{key:z,value:z},C))))),l("button",{className:"mp-btn ghost",style:yi,onClick:En},"计算候选时辰"),et?et.error?l("div",{className:"mp-rect-err"},et.error):l("div",{className:"mp-rect-out"},l("div",{className:"mp-verify-fit"},et.note),et.candidates.slice(0,6).map(t=>l("div",{key:t.hour,className:"mp-rect-cand"+(t===et.best?" best":"")},`${t.label} · 时柱 ${t.hourGanzhi} · 日柱 ${t.dayGanzhi} · 命中 ${t.hits}/${t.total}`))):null):null,!r&&!ct?l("div",{key:"ph",className:"mp-dim",style:{marginTop:24,fontSize:12}},"选择体系后点「排盘」。所有计算在本机完成，不上传任何数据。"):null,l("div",{key:"fb",className:"mp-fb"},l("div",{className:"mp-fb-h"},l("span",{className:"mp-fb-t"},"用得不对、读不懂、或算得跟别家不一样？"),l("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"4px 10px"},onClick:vi,title:"生成一份含输入、版本、环境与结果摘要的报告，粘贴到 issue / 邮件 / 群聊即可"},le||"复制反馈报告"),l("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"4px 10px",marginLeft:6},onClick:()=>An(),title:"在浏览器打开 GitHub issue（报告已复制到剪贴板，粘进去即可）"},"开 issue")),l("div",{className:"mp-fb-b"},"邮件 1129440028@qq.com　·　GitHub issues　·　微信群 dsh-metaphysics",$e?l("span",{className:"mp-fb-note"},"　"+$e):null))];return l("div",{className:"mp-wrap"},Gn)}function Xi(n){try{if(typeof styles<"u"&&styles&&typeof styles.insert=="function")return styles.insert(n)}catch(s){console.error("[metaphysics] styles.insert 不可用，改用 DOM 注入",s)}try{const s=document.createElement("style");return s.setAttribute("data-plugin","@local/metaphysics"),s.textContent=n,document.head.appendChild(s),()=>s.remove()}catch(s){return console.error("[metaphysics] DOM 注入样式也失败",s),()=>{}}}let Xa=!1;function va(){try{const n=document.documentElement;if(!n||!document.body)return;const s=document.createElement("span");s.setAttribute("aria-hidden","true"),s.style.cssText="position:absolute;left:-9999px;top:0;width:0;height:0;pointer-events:none;background:var(--dsw-alias-brand-primary)",document.body.appendChild(s);const k=getComputedStyle(s).backgroundColor;s.remove();const O=Ae&&typeof Ae.pickOnColor=="function"?Ae.pickOnColor(k):"";O&&n.style&&n.style.getPropertyValue("--mp-on-brand")!==O&&n.style.setProperty("--mp-on-brand",O)}catch{}}function Wi(){if(!Xa){Xa=!0,va();try{const n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)");n&&typeof n.addEventListener=="function"&&n.addEventListener("change",va)}catch{}try{typeof MutationObserver=="function"&&document.documentElement&&new MutationObserver(va).observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]})}catch{}}}function Ji(n){try{const F=Xi(Fi+(G&&G.CSS?G.CSS:""));typeof n.effect=="function"&&typeof F=="function"&&n.effect(()=>F)}catch(F){console.error("[metaphysics] 样式注入失败",F)}try{Wi()}catch(F){console.error("[metaphysics] 字色同步失败",F)}let s=null;try{s=n&&n.slots||(n&&typeof n.get=="function"?n.get("slots"):null)}catch(F){console.error("[metaphysics] 取 slots 服务失败",F)}if(!s||typeof s.register!="function"){console.error("[metaphysics] slots 服务不可用，面板未注册");return}try{X.injectType=typeof s.inject;const F=typeof s.spec=="function"?s.spec("conversation.input.right"):null;X.spec=F?F.kind+"/"+F.scope:"未声明"}catch(F){X.spec="取声明失败",Za(F)}const k=F=>{if(typeof F=="function")return F;if(F&&typeof F=="object"){for(const fe of["dispose","off","cancel","unregister"])if(typeof F[fe]=="function")return()=>{try{F[fe]()}catch{}}}return()=>{}},O=(F,fe)=>{try{const xe=s.register(F,fe);return X.regs+=1,X.seatOk[F.name]=!0,k(xe)}catch(xe){return Za(xe),()=>{}}},V=(F,fe)=>{const xe=()=>{const R=fe();return X.contribution=(X.contribution?X.contribution+",":"")+(F+(typeof R=="function"?" 已挂上":" 未挂上")),R};try{typeof s.inject=="function"?s.inject(F,xe):xe()}catch(R){console.error("[metaphysics] 等待槽位失败："+F,R);try{xe()}catch(B){console.error("[metaphysics] 直接注册也失败："+F,B)}}};V("sidebar.panellist",()=>O({name:"sidebar.panellist",id:"metaphysics",order:20,label:()=>"命理 v"+(window.__MP_VER||"")},Gi)),V("main",()=>O({name:"main",key:"metaphysics"},F=>l(Ii,null,l(Vi,F))));const ie=(F,fe)=>{const xe=()=>{try{const B=s.inject(F,fe);return X.contribution=(X.contribution?X.contribution+",":"")+(F.replace("conversation.","")+(typeof B=="function"?" 已挂上":" 未挂上")),B}catch(B){console.error("[metaphysics] 槽位注册失败："+F,B);try{return fe()}catch(D){console.error("[metaphysics] 直接注册也失败："+F,D);return}}};let R;try{typeof n.effect=="function"?R=n.effect(xe,"metaphysics: "+F):R=xe()}catch(B){console.error("[metaphysics] effect 包裹失败："+F,B),R=xe()}typeof R=="function"&&X.seatDisposers.push(R)};ie("conversation.input.right",()=>O({name:"conversation.input.right",id:"metaphysics-ask",order:40},Ka)),ie("conversation.composer.dock",()=>O({name:"conversation.composer.dock",id:"metaphysics-dock",order:60},Ya));let se=!1;const re=()=>{X.ref||se||(se=!0,X.seatOk["conversation.input.right"]||O({name:"conversation.input.right",id:"metaphysics-ask",order:40},Ka),X.seatOk["conversation.composer.dock"]||O({name:"conversation.composer.dock",id:"metaphysics-dock",order:60},Ya))};let a=20;const ge=()=>!!(X.seatOk["conversation.input.right"]&&X.seatOk["conversation.composer.dock"]),je=()=>{X.ref||a<=0||ge()||(a-=1,re(),!ge()&&setTimeout(je,700))};try{setTimeout(je,700)}catch{}try{document.addEventListener("pointerdown",()=>{se=!1,re()},{once:!0,capture:!0})}catch{}}return{inject:["slots"],apply(n){try{Ji(n)}catch(s){console.error("[metaphysics] apply 异常",s)}}}}});
