window.__ModuleLoader__.load({id:"dsh-metaphysics",version:"0.62.5",factory(Wt){const Lt=(function(){try{return Wt("react")}catch{return globalThis.React}})();if(!Lt)return{inject:[],apply(){}};const p=Lt.createElement,La={bazi:"client.chart.js",ziwei:"client.chart.js",hepan:"client.chart.js",trend:"client.chart.js",name:"client.name.js",fengshui:"client.fengshui.js",liuyao:"client.liuyao.js",meihua:"client.liuyao.js",qimen:"client.qimen.js",daliuren:"client.daliuren.js",tarot:"client.tarot.js",almanac:"client.almanac.js",convert:"client.convert.js",zeri:"client.zeri.js",chenggu:"client.chenggu.js",xiaoliuren:"client.xiaoliuren.js",star:"client.star.js",numerology:"client.numerology.js",mbti:"client.mbti.js"},Ea=[{key:"general",label:"综合",dim:null,focus:""},{key:"wealth",label:"财运",dim:"work",focus:"钱财进出的落点主要看「工作与职业选择」与「事业发展」这两条。"},{key:"career",label:"事业",dim:"career",focus:"事业发展这条与你的问题最直接。"},{key:"love",label:"感情",dim:"love",focus:"感情这条与你的问题最直接。"},{key:"health",label:"健康",dim:"health",focus:"健康这条与你的问题最直接；下面只作提醒，不作任何诊断。"},{key:"study",label:"学业",dim:"career",focus:"学业与考试更贴近「事业发展」这条，讲的是长期积累与阶段进展。"},{key:"travel",label:"出行",dim:"overall",focus:"出行与迁动更贴近「整体运势」这条，看的是当下这一段的大环境。"}];window.__MP_VER="0.62.5",window.__MPGroups=[{title:"问一件事",hint:"心里有一件具体的事，起一卦再决定",items:[{k:"liuyao",label:"六爻",tip:"摇六次，问一件事"},{k:"meihua",label:"梅花",tip:"见闻起卦，看当下"},{k:"tarot",label:"塔罗",tip:"抽牌，看关系与选择"},{k:"qimen",label:"奇门",tip:"看方位、时机与取舍"},{k:"daliuren",label:"六壬",tip:"占事，断来意与结果"},{k:"xiaoliuren",label:"小六壬",tip:"掐指一算，快速断"}]},{title:"看一个人",hint:"看自己或身边人的性情、格局与运程",items:[{k:"bazi",label:"八字",tip:"四柱看一生格局"},{k:"ziwei",label:"紫微",tip:"十二宫细看"},{k:"hepan",label:"合盘",tip:"两个人合不合"},{k:"mbti",label:"人格",tip:"16 型性格问卷"},{k:"chenggu",label:"称骨",tip:"按生辰称命重"},{k:"numerology",label:"数字",tip:"生日数字看性格"},{k:"trend",label:"人生K",tip:"一生高低走势",wide:!0}]},{title:"查日子",hint:"挑时间、换农历，顺带看看家里和名字",items:[{k:"almanac",label:"黄历",tip:"今天宜忌、时辰吉凶"},{k:"zeri",label:"择日",tip:"挑个办事的好日子"},{k:"convert",label:"农历",tip:"公历农历互转"},{k:"star",label:"星座",tip:"星座性格与今日运"},{k:"fengshui",label:"风水",tip:"房屋朝向与布置"},{k:"name",label:"起名",tip:"按八字选字"}]}],window.__MP_UNRELEASED=["根因：`slots.register` 实测返回对象，不是函数","修法","第二处缺陷：补注册与正式注册撞 id","第三处缺陷：补注册换新 id 会长出多个 chip","`sessionSeat` 的 run 现在透传返回值","自检文案去掉技术词","测试补了三条能守住根因的断言","边界（必须说明）","命盘四 tab 合并：18 块 → 15 块，分块合计 gzip 2.56MB → 1.89MB","这不是「抽共享块」","单块预算不用动","尺寸底线改成与声明同源","懒加载器的兜底改指 chart","测试补了「只下载一次」这条真断言","验证","顺带修的引用","八大地支结构接进四处，并说清与旺衰分的关系","三柱模式不把占位时支冒充实有","暗合接进三处，并明确「另列不并」","起运岁精确值接进三处","旧结果兼容","验证","一处已知的取舍（已随 D1+ 解决）"];const K={};K.DIRECTIONS=Ea,K.compute=()=>{throw new Error("命理引擎尚未加载")};const _a=Object.create(null),fa=Object.create(null);function _i(n){return La[n]||La.bazi||"client.chart.js"}const Ha=()=>typeof performance<"u"&&performance.now?performance.now():Date.now();async function Hi(n){const s=_i(n);let S=_a[s];const P=!!S,V=Ha();if(!S){if(!Wt||typeof Wt.async!="function")throw new Error("当前宿主不支持客户端分块加载（require.async 缺失），请升级 DeepSeek Harness");let ee=fa[s];ee||(ee=Wt.async(`./${s}`).then(ae=>{const se=ae&&(ae.Engine||ae.default);if(!se||typeof se.compute!="function")throw new Error(`命理引擎分块 ${s} 未返回 Engine`);return _a[s]=se,se}),fa[s]=ee,ee.catch(()=>{}).then(()=>{delete fa[s]})),S=await ee}for(const ee of Object.keys(S))S[ee]!==void 0&&(K[ee]=S[ee]);return Array.isArray(K.DIRECTIONS)||(K.DIRECTIONS=Ea),window.Engine=K,window.__MP_ENGINE_READY__=!0,window.__MP_LAST_LOAD={tab:n,chunk:s,cached:P,ms:Math.round((Ha()-V)*10)/10},K}window.__mpEnsureEngine=Hi,window.Engine=K,(function(){const n={liuyao:!0,meihua:!0,daliuren:!0,tarot:!0},s=B=>!!n[B],S={general:"other",wealth:"business",career:"career",love:"love",health:"other",study:"career",travel:"action"},P=B=>S[B]||"other",V="#ffffff",ee="#1c1a15";function ae(B){const Z=String(B??"").match(/rgba?\(([^)]+)\)/i);if(!Z)return null;const R=Z[1].split(/[,\s/]+/).filter(Boolean).map(Number);return R.length<3||R.slice(0,3).some(Y=>!Number.isFinite(Y))||R.length>3&&Number.isFinite(R[3])&&R[3]<.95?null:[R[0],R[1],R[2]]}function se(B){const Z=String(B||"").replace("#",""),R=Z.length===3?Z.split("").map(Y=>Y+Y).join(""):Z;return/^[0-9a-f]{6}$/i.test(R)?[0,2,4].map(Y=>parseInt(R.slice(Y,Y+2),16)):null}function a(B){const Z=R=>{const Y=R/255;return Y<=.03928?Y/12.92:Math.pow((Y+.055)/1.055,2.4)};return .2126*Z(B[0])+.7152*Z(B[1])+.0722*Z(B[2])}function ge(B,Z){const R=a(B),Y=a(Z),ve=Math.max(R,Y),wt=Math.min(R,Y);return(ve+.05)/(wt+.05)}function ze(B){const Z=typeof B=="string"?ae(B):B;return Z?ge(Z,se(V))>=ge(Z,se(ee))?V:ee:""}function F(B){const Z=String(B??"").trim();if(!Z)return{lines:null,warning:""};const R=Z.split(/[^0-9]+/).filter(Boolean).map(Number),Y=R.filter(ve=>![6,7,8,9].includes(ve));return R.length===6&&Y.length===0?{lines:R,warning:""}:{lines:null,warning:R.length!==6?`爻值需要正好 6 个数字（当前 ${R.length} 个），本次按随机摇卦。`:`爻值只能是 6/7/8/9（收到 ${Y.join("/")}），本次按随机摇卦。`}}function fe(B){const Z=String(B??"").trim();if(!Z)return null;const R=Number(Z);return Number.isFinite(R)?R:null}function he(B){const Z=B instanceof Date?B:new Date,R=Y=>String(Y).padStart(2,"0");return`${Z.getFullYear()}-${R(Z.getMonth()+1)}-${R(Z.getDate())}`}window.__MPCore={NEED_ASK:n,needAsk:s,parseLines:F,toNumber:fe,parseRGB:ae,hexToRGB:se,luminance:a,contrastRatio:ge,pickOnColor:ze,ON_DARK:V,ON_LIGHT:ee,kindOfDirection:P,todayStamp:he}})(),(function(){const n=`
.pp,.mp-it,.mp-al,.mp-cg,.mp-cl,.mp-cli,.mp-kline,.mp-mb,.mp-mb-paper,.mp-nm,.mp-quick,.mp-cdiff,.mp-shadow,.mp-trace-card,.mp-trace-layer,.mp-prof{--ink:#1b1b1b;--ink2:#3f3a33;--muted:#6f6a60;--label:#8a8378;--faint:#a9a296;
  --line:#c8c1b2;--dimline:#b9b2a4;--hair:#e9e2d3;
  /* 底色略沉作「桌面」，--card 跳到近白：原先 bg 与 card 只差 1/255，卡片感等于零。
     同一色相里塞 9 个几乎相等的浅色，谁都浮不起来。 */
  /* 水墨风：宣纸白为底、淡墨分层；米黄系整体降饱和，纸感靠 --band 的微暖留一点 */
  --bg:#f4f2ec;--card:#fdfdfb;--band:#f7f5ef;--hover:#eeece5;--hover2:#e6e4dc;
  --tri:#eef0ea;--soul:#f7ece9;--sel:#f5efe9;--link:#f0efe9;
  --red:#a02c26;--red-rgb:160,44,38;--lu:#3d5a52;--lu-rgb:61,90,82;
  --quan:#6e5a2e;--quan-rgb:110,90,46;--ke:#3a5568;--ke-rgb:58,85,104;--ji:#a02c26;
  --br-good:#4c7a5c;--br-bad:#9c5b56;--on-accent:#fff;--wx-metal:#8a6b1f;
  --tg-bi:#4e5d6b;--tg-shi:#55685c;--tg-cai:#6e5a2e;--tg-guan:#8a4a42;--tg-yin:#5d5570;
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
    /* 暗色水墨：墨底宣纸灰字，降暖提灰 */
    --bg:#131311;--card:#1f1f1c;--band:#26261f;--hover:#2c2c26;--hover2:#35352c;
    --tri:#2a2e28;--soul:#332521;--sel:#322d27;--link:#2c2b25;
    --red:#e08a7a;--red-rgb:224,138,122;--lu:#8fb8a8;--lu-rgb:143,184,168;
    --quan:#c9a96a;--quan-rgb:201,169,106;--ke:#8aadc0;--ke-rgb:138,173,192;--ji:#e08a7a;
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
/* 三视图切换（学文墨天机：飞星/三合/四化）——真分派，不是同一张盘的显隐开关：
   四化派（默认）：生年四化实心 + 大限/流年空心 + 自化 + 飞星链 chips；
   飞星派：每宫格内显示「宫干四化飞出」逐条（禄→某宫…），图例藏大限/流年四化；
   三合派：只看星曜庙旺与宫位结构，所有四化徽章（含生年）、自化、飞星链全部藏起。 */
.pp-schools{border-top:none}
.pp-schools label{min-height:38px;padding:2px 16px;font-size:12px}
#ppm-sc-sihe:checked~.pp-schools label[for="ppm-sc-sihe"],
#ppm-sc-feixing:checked~.pp-schools label[for="ppm-sc-feixing"],
#ppm-sc-sanhe:checked~.pp-schools label[for="ppm-sc-sanhe"]{background:var(--lu);color:var(--on-accent)}
/* 飞星派专属：宫内宫干四化行，只在飞星模式展开 */
.pp-fx{display:none;margin-top:3px;font-size:10.5px;line-height:1.55;color:var(--muted);border-top:1px dashed var(--hair);padding-top:2px}
.pp-fx i{font-style:normal;white-space:nowrap;margin-right:4px}
.pp-fx i em{font-style:normal;color:var(--faint)}
#ppm-sc-feixing:checked~.pp-body .pp-fx{display:block}
#ppm-sc-feixing:checked~.pp-body .pp-m.view,
#ppm-sc-feixing:checked~.pp-body .pp-viewhua{display:none}
/* 三合派：四化信息整体退场（生年/自化/大限流年/图例/飞星链 chips） */
#ppm-sc-sanhe:checked~.pp-body .pp-m,
#ppm-sc-sanhe:checked~.pp-body .pp-zh,
#ppm-sc-sanhe:checked~.pp-body .pp-viewhua,
#ppm-sc-sanhe:checked~.pp-flywrap{display:none}
#ppm-sc-sihe:checked~.pp-flywrap{display:block}
#ppm-sc-feixing:checked~.pp-flywrap{display:block}
/* 自化图示（文墨式图例行）：箭头颜色跟四化色走 */
.pp-zhlegend{display:flex;gap:10px;align-items:center;justify-content:center;font-size:12px;color:var(--muted);margin-top:4px}
.pp-zhlegend i{font-style:normal;font-weight:600}
.pp-zhlegend .z-lu{color:var(--lu)}.pp-zhlegend .z-quan{color:var(--quan)}
.pp-zhlegend .z-ke{color:var(--ke)}.pp-zhlegend .z-ji{color:var(--ji)}
/* 纸纹：feTurbulence 纤维噪点叠加在盘面底色上，浅色偏灰纤维、暗色同用（低透明度不抢字） */
.pp-paper{position:relative}
.pp::before{content:"";position:absolute;inset:0;pointer-events:none;z-index:0;opacity:.5;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='2' seed='7'/%3E%3CfeColorMatrix values='0 0 0 0 0.32 0 0 0 0 0.29 0 0 0 0 0.24 0 0 0 0.10 0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23p)'/%3E%3C/svg%3E")}
.pp>*{position:relative;z-index:1}
.pp-zh{margin-left:4px;white-space:nowrap}
.pp-borrow{font-size:9.5px;color:var(--muted);margin-top:1px;letter-spacing:.02em}

/* —— 宫位点击展开详情 + 三方四正联动 ——
   宫格信息密度太高（尤其竖屏 10px），宫内必然有挤掉的东西。
   点开后把该宫的完整星曜、四化、十二神、三方四正摊平看。 */
.pp-cell{cursor:pointer;transition:background .14s ease,box-shadow .14s ease;outline:none}
.pp-cell:hover{background:var(--hover)}
/* 键盘可达：宫格是 div+tabindex，焦点必须看得见（原先把 outline 关了却没补替代） */
.pp-cell:focus-visible{box-shadow:inset 0 0 0 2px var(--red)}
.pp-cell.pp-sel{background:var(--sel);box-shadow:inset 0 0 0 2px rgba(var(--red-rgb),.55)}
/* 三方四正虚线：ink 色细虚线，端点宫由 pp-sel/pp-link 底色呼应 */
.pp-sf{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2}
.pp-sf line{stroke:var(--ink);stroke-width:1.2px;stroke-dasharray:3 2.4;opacity:.38;vector-effect:non-scaling-stroke}
.pp-sf circle{fill:var(--ink);opacity:.45}
/* 选中宫的财帛/官禄/迁移三宫：能一眼看出命宫牵着哪几宫 */
.pp-cell.pp-link{background:var(--link);box-shadow:inset 0 0 0 1.5px rgba(var(--red-rgb),.3)}
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
`,s=window.__PP=window.__PP||{};s.CSS=n;const S={主星:"main",吉星:"good",煞星:"bad",辅星:"aux",杂曜:"aux"},P={禄:"lu",权:"quan",科:"ke",忌:"ji"},V={庙:"good",旺:"good",得:"mid",利:"mid",平:"mid",不:"bad",陷:"bad"},ee={巳:[1,1],午:[1,2],未:[1,3],申:[1,4],辰:[2,1],酉:[2,4],卯:[3,1],戌:[3,4],寅:[4,1],丑:[4,2],子:[4,3],亥:[4,4]},ae={乾:[1,1,1],兑:[1,1,0],离:[1,0,1],震:[1,0,0],巽:[0,1,1],坎:[0,1,0],艮:[0,0,1],坤:[0,0,0]},se=["初爻","二爻","三爻","四爻","五爻","上爻"],a=e=>String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),ge=(e,i,r)=>{const h=Math.round(43),b=e?`<rect x="0" y="${2.5}" width="104" height="7" rx="${1.6}" fill="currentColor"/>`:`<rect x="0" y="${2.5}" width="${h}" height="7" rx="${1.6}" fill="currentColor"/><rect x="${h+18}" y="${2.5}" width="${104-h-18}" height="7" rx="${1.6}" fill="currentColor"/>`;return`<svg class="mp-hex${i?" hex-on":""}${r?" "+r:""}" viewBox="0 0 104 12" preserveAspectRatio="none" aria-hidden="true" focusable="false">${b}</svg>`},ze={木:"M6 1.6V10.8M6 5.2 2.6 2.2M6 7.4 9.4 4.4",火:"M6 1.4C7.6 3.6 9.2 5.4 9.2 7.6A3.2 3.2 0 0 1 2.8 7.6C2.8 5.4 4.4 3.6 6 1.4Z",土:"M1.6 9.6h8.8M6 2.4v7.2M3.4 5.6h5.2",金:"M6 1.2 10.6 6 6 10.8 1.4 6Z",水:"M1.4 7.2C2.9 4.2 4.5 10.2 6 7.2 7.5 4.2 9.1 10.2 10.6 7.2"},F=e=>{const i=ze[e];return i?`<svg class="mp-wxi" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="${i}" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`:""},fe=e=>`<svg class="mp-trig" viewBox="0 0 14 10" aria-hidden="true" focusable="false">${(ae[e]||[0,0,0]).slice().reverse().map((l,o)=>{const c=o*4;return l?`<rect x="0" y="${c}" width="14" height="2" rx="0.6" fill="currentColor"/>`:`<rect x="0" y="${c}" width="5.6" height="2" rx="0.6" fill="currentColor"/><rect x="8.4" y="${c}" width="5.6" height="2" rx="0.6" fill="currentColor"/>`}).join("")}</svg>`;s._hexBar=ge,s._wxIcon=F,s._triGlyph=fe;function he(e,i){return!e||!e.length?"":e.map(r=>{const l=S[r.type]||"aux",o=r.mutagen?`<i class="pp-m ${P[r.mutagen]}">${r.mutagen}</i>`:"",c=i&&i[r.name],d=c?`<i class="pp-m view ${P[c]}">${c}</i>`:"",m=r.brightness?`<em class="pp-b ${V[r.brightness]||"mid"}">${r.brightness}</em>`:"",u=r.inTemple?'<em class="pp-b good">庙</em>':"";return`<span class="pp-st ${l}">${r.name}${m}${u}${o}${d}</span>`}).join("")}function B(e){const i=[];for(let r=0;r<6;r++)i.push(e+r*12);return i.join(",")}const Z=["命宫","兄弟","夫妻","子女","财帛","疾厄","迁移","交友","官禄","田宅","福德","父母"],R=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],Y=e=>(e%12+12)%12,ve=(e,i)=>e!==i&&[Y(i+4),Y(i+8),Y(i+6)].includes(e);function wt(e,i,r,l,o,c){const d=ee[e.branch]||[1,1],m=R.indexOf(e.branch),u=["pp-cell"];m===i?u.push("pp-soul"):ve(m,i)&&u.push("pp-tri"),e.isBody&&u.push("pp-shen"),d[0]===4&&u.push("pp-lastrow"),d[1]===4&&u.push("pp-lastcol");const h=e.shensha||{},b=Z[Y(i-m)],C=e.selfHua&&e.selfHua.length?`<span class="pp-zh">${e.selfHua.map(T=>`<i class="pp-m self ${P[T.type]}" title="自化：宫干化回本宫">${T.type}</i>`).join("")}</span>`:"";let q="";if(m===i&&l){const T=j=>(S[j.type]||"")==="main";if(!(e.stars||[]).some(T)){const j=l.find(X=>R.indexOf(X.branch)===Y(m+6)),_=j?(j.stars||[]).filter(T):[];_.length&&(q=`<div class="pp-borrow" title="命宫无主星，借对宫（迁移宫）主星">借 ${_.map(X=>X.name).join(" ")}</div>`)}}return`<div class="${u.join(" ")}" data-pi="${m}" data-view="${r}" role="button" tabindex="0" aria-expanded="false" style="grid-row:${d[0]};grid-column:${d[1]}">
      <div class="pp-stars">${he(e.stars,o)}${C}</div>
      ${q}
      <div class="pp-ages">${B(e.xiaoxian.age)}</div>
      ${nt(e,c)}
      <div class="pp-foot">
        <div class="ft-l">
          <span class="ft-dx">${h.boshi} ${e.daxian.start}-${e.daxian.end}</span>
          <span>${h.jiangqian}</span>
          <span>${h.suiqi}</span>
        </div>
        <div class="ft-r">
          <span>${h.changsheng}</span>
          <span>${e.ganzhi}</span>
          <span class="ft-pn">${b}</span>
        </div>
      </div>
    </div>`}function nt(e,i){const r=i&&i[e.branch]||[];if(!r.length)return"";const l=r.map(o=>`<i class="${P[o.type]||""}" title="${a(o.star)}化${a(o.type)}">${a(o.type)}<em>→${a(o.palace||"未上盘")}</em></i>`).join("");return`<div class="pp-fx">${a(e.ganzhi)}宫干 ${l}</div>`}function kt(e){try{const i=window.Engine||window.__PP&&window.__PP.Engine;if(!i||!i.buildBazi||!e.input)return"";const r=i.buildBazi({year:e.input.year,month:e.input.month,day:e.input.day,hour:e.input.hour,minute:e.input.minute,gender:e.input.gender,trueSolar:!1});return["year","month","day","hour"].map(l=>r.pillars[l].ganzhi).join(" ")}catch{return""}}s.ziweiHTML=function(e){const i=R.indexOf(e.soul.branch),r=e.liunian&&e.liunian[0]||null,l=r?r.age:1,o=e.palaces.find(k=>l>=k.daxian.start&&l<=k.daxian.end)||e.palaces[0],c=R.indexOf(o.branch),d=r?R.indexOf(r.lifePalace.branch):i,m=k=>{const O={};for(const Q of k||[])Q&&Q.star&&(O[Q.star]=Q.type);return O},u=(e.daxianList||[]).find(k=>k.branch===o.branch)||null,h={da:m(u&&u.mutagenHits),ln:m(r&&r.mutagenHits)},b={};for(const k of e.daxianList||[])b[k.branch]=k.mutagenHits||[];const C=(k,O)=>e.palaces.map(Q=>wt(Q,k,O,e.palaces,h[O]||null,b)).join(""),q=(k,O)=>`<div class="pp-center">
        ${O==="da"?`<div class="ct-t1">大限 ${o.ganzhi}　${o.daxian.start}-${o.daxian.end}岁</div>`:O==="ln"&&r?`<div class="ct-t1">流年 ${r.ganzhi}　${r.age}岁</div>`:`<div class="ct-t1">${e.daxian.rule.slice(0,2)}　${e.bureau.name}</div>`}
        <div class="ct-t2">公历 ${e.input.year}-${String(e.input.month).padStart(2,"0")}-${String(e.input.day).padStart(2,"0")} ${String(e.input.hour).padStart(2,"0")}:${String(e.input.minute).padStart(2,"0")}</div>
        <div class="ct-t2">农历 ${e.lunar.year}年${e.lunar.isLeap?`闰${e.lunar.monthRaw||e.lunar.month}`:e.lunar.month}月${e.lunar.day}日${e.hourBranch}时${e.lunar.isLeap&&e.lunar.monthRaw&&e.lunar.month!==e.lunar.monthRaw?`（按${e.lunar.month}月起盘）`:""}</div>
        ${kt(e)?`<div class="ct-t3">${kt(e)}</div>`:""}
        <div class="ct-t4">命主 ${e.lifeMaster}　身主 ${e.bodyMaster}${e.bodyMasterNote?`<span class="pp-dim" title="${a(e.bodyMasterNote)}">＊</span>`:""}</div>
        <div class="ct-t4">命宫 ${e.soul.branch}　身宫 ${e.body.branch}　五行局 ${e.bureau.name}</div>
        <div class="ct-t4">子年斗君 ${e.doujun?e.doujun.zinian:"—"}　流年斗君 ${r&&r.doujun?r.doujun:"—"}</div>
        <div class="ct-t4">紫微 ${e.ziwei}　天府 ${e.tianfu}　${O==="da"?"大限命宫 "+R[c]:O==="ln"?"流年命宫 "+R[d]:"本命命宫 "+e.soul.branch}</div>
        ${O==="da"||O==="ln"?`<div class="ct-t4 pp-viewhua">${O==="da"?"大限":"流年"}四化　${(O==="da"?h.da:h.ln)&&Object.keys(O==="da"?h.da:h.ln).length?Object.entries(O==="da"?h.da:h.ln).map(([$e,ue])=>`${$e}化${ue}`).join("　"):'<span class="pp-dim">未飞四化</span>'}</div>`:""}
        <div class="pp-legend"><span class="pp-m lu">禄</span><span class="pp-m quan">权</span><span class="pp-m ke">科</span><span class="pp-m ji">忌</span><span>实心=生年四化　空心=大限/流年四化　虚下划线=自化　红框=命宫　浅底=三方四正</span></div>
      </div>`,T=(k,O,Q)=>`<div class="pp-body ${k}" data-view="${Q}" data-soul="${O}"><div class="pp-grid">${C(O,Q)}${q(O,Q)}</div><div class="pp-detail"></div></div>`,j=e.changqu,_=j?`<div class="pp-chips">
      <span class="pp-chip">昌 ${j.wenchang.branch}（${j.wenchang.palace}）</span>
      <span class="pp-chip">曲 ${j.wenqu.branch}（${j.wenqu.palace}）</span>
      <span class="pp-chip">${j.relation}</span>
      <span class="pp-chip">入命三方 ${j.inSoulSanfang?"是":"否"}</span>
      <span class="pp-chip ${j.absorb.label==="杂"?"warn":"ok"}">吸收·${j.absorb.label}</span>
    </div>`:"",X=(e.patterns||[]).length?`<div class="pp-chips">${e.patterns.map(k=>{const O=k.status==="broken"&&Array.isArray(k.breaks)&&k.breaks.length,Q=`${k.evidence||""}${O?`；破格：${k.breaks.join("；")}`:""}`;return`<span class="pp-chip ${O?"broken":k.tone==="good"?"ok":k.tone==="bad"?"warn":""}" title="${a(Q)}">${k.name}${O?"（破格）":""}</span>`}).join("")}</div>`:"",H=(e.daxianList||[]).length?`<div class="pp-chips">${e.daxianList.slice(0,8).map(k=>`<span class="pp-chip" title="${a(`${k.ganzhi} 宫干四化：`+k.mutagenHits.map(O=>`${O.star}化${O.type}→${O.palace||"未上盘"}`).join("、"))}">${k.branch} ${k.ages[0]}-${k.ages[1]}</span>`).join("")}</div>`:"",w=r&&r.mutagenHits&&r.mutagenHits.length?`<div class="pp-chips">${r.mutagenHits.map(k=>`<span class="pp-chip ${k.type==="忌"?"warn":k.type==="禄"?"ok":""}">${k.star}化${k.type}→${k.palace||"未上盘"}</span>`).join("")}</div>`:"",z=e.zuoyao,te=z?z.placed&&z.placed.length?`<div class="pp-sec"><div class="pp-sec-h">杂曜全表 · 已排 ${z.placed.length} 颗（${z.starTotal} 颗盘）</div>
        <div class="pp-chips">${z.placed.map(k=>`<span class="pp-chip${k.inTemple?" ok":""}" title="${a(k.meaning||"")}">${a(k.name)} ${a(k.branch)}（${a(k.palace)}）${k.inTemple?"·庙":""}</span>`).join("")}</div>
        <details class="pp-zy"><summary>逐颗安星诀（${z.placed.length} 条 · 出多处近代通行辑本并核，属通行说，不是《全书》原文）</summary><div class="pp-zy-v">${a(z.verses).replace(/\n/g,"<br>")}</div></div></details>
        ${z.skipped&&z.skipped.length?`<div class="pp-zy-s">${z.skipped.map(k=>a(k)).join("")}</div>`:""}</div>`:`<div class="pp-sec"><div class="pp-sec-h">杂曜 · 本盘 ${z.starTotal} 颗（通行简盘）</div>
        <div class="pp-zy-s">开「杂曜全表」追加十二颗：解神·天巫·天月·阴煞（生月）／天官·天福·天厨（生年干）／蜚廉·天德·年解（生年支）／天才（命宫＋生年支）·天寿（身宫＋生年支）。${z.skipped&&z.skipped.length?`不另立：${z.skipped.map(k=>a(k)).join("")}`:""}</div></div>`:"",D=e.flyChains?(()=>{const k=["禄","权","科","忌"].map(O=>{const Q=e.flyChains[O];if(!Q||!Q.steps.length)return"";const $e=Q.path.map(me=>String(me).replace(/宫$/,"")).join("→"),ue=Q.steps.map(me=>`${me.from}（${me.fromStem}）化${O}${me.star}→${me.to}`).join("；");return`<span class="pp-chip ${O==="忌"?"warn":O==="禄"?"ok":""}" title="${a(ue)}">飞${O} ${a($e)}${Q.closed?"↺":""}</span>`}).join("");return k?`<div class="pp-chips">${k}</div>`:""})():"",oe=e.flyComposite&&Array.isArray(e.flyComposite.labels)&&e.flyComposite.labels.length?`<div class="pp-chips">${e.flyComposite.labels.map(k=>{const O=/忌/.test(k)?"warn":/自化/.test(k)?"":"ok",Q=pe=>String(pe).replace(/^.*?会/,"").replace(/^禄忌同宫/,"").replace(/自化$/,""),$e=(e.flyComposite.targets||[]).find(pe=>pe.palace===Q(k)),ue=$e?$e.incoming.map(pe=>`${pe.from}化${pe.type}${pe.star}`).join("、"):e.flyComposite.note;return`<span class="pp-chip ${O}" title="${a(ue)}">三方四正 ${a(k)}</span>`}).join("")}</div>`:"",$=e.flow,ce=$?(()=>{const k=ue=>(ue.mutagenHits||[]).length?ue.mutagenHits.map(pe=>`<i>${pe.star}化${pe.type}<em>→${pe.palace||"未上盘"}</em></i>`).join(""):'<i class="dim">宫干无四化</i>',O=(ue,pe,me)=>`<div class="flow-row"><b>${ue}</b><span class="flow-p"><span class="flow-k">${pe.ganzhi||"—"}　落${pe.palace||"未上盘"}（${pe.branch}）</span>${me?`<em class="flow-same">${me}</em>`:""}</span><span class="flow-m">${k(pe)}</span></div>`,$e=$.day.branch===$.month.branch?"（日数走满一圈，故同宫）":"";return`<div class="pp-flow">
        <div class="flow-row"><b>基准</b><span class="flow-p">${$.asOf.solar}</span><span class="flow-m">农历 ${$.asOf.lunar}　流年 ${$.asOf.yearGanzhi}（斗君 ${$.year.doujun}）</span></div>
        ${O(`流月 ${$.month.index} 月`,$.month)}
        ${O(`流日 ${$.day.index} 日`,$.day,$e)}
        ${O(`流时 ${R[$.hour.hourIndex]}时`,$.hour)}
      </div>`})():"";return s._zw=e,s.briefHTML(e)+`<div class="pp">
      <input type="radio" name="ppm" id="ppm-ben" class="pp-r" checked>
      <input type="radio" name="ppm" id="ppm-da" class="pp-r">
      <input type="radio" name="ppm" id="ppm-ln" class="pp-r">
      <input type="radio" name="ppm-sc" id="ppm-sc-sihe" class="pp-r" checked>
      <input type="radio" name="ppm-sc" id="ppm-sc-feixing" class="pp-r">
      <input type="radio" name="ppm-sc" id="ppm-sc-sanhe" class="pp-r">
      <div class="pp-modes">
        <label for="ppm-ben">本命</label><label for="ppm-da">大限</label><label for="ppm-ln">流年</label>
        <span class="pp-soon">点任一宫位看详情</span>
      </div>
      <div class="pp-modes pp-schools">
        <label for="ppm-sc-sihe">四化</label><label for="ppm-sc-feixing">飞星</label><label for="ppm-sc-sanhe">三合</label>
      </div>
      ${T("ben",i,"ben")}
      ${T("da",c,"da")}
      ${T("ln",d,"ln")}
      <div class="pp-zhlegend">自化图示　<i class="z-lu">→禄</i><i class="z-quan">→权</i><i class="z-ke">→科</i><i class="z-ji">→忌</i></div>
      <div class="pp-flywrap">${D}${oe}</div>
    </div>${ce}${_}${X}${H}${w}${te}`};function qe(e){return e.length?e.map(i=>{const r=S[i.type]||"aux",l=i.brightness?`<em class="dt-br ${V[i.brightness]||"mid"}">${i.brightness}</em>`:"",o=i.inTemple?'<em class="dt-br good">庙</em>':"",c=i.mutagen?`<i class="pp-m ${P[i.mutagen]}">${i.mutagen}</i>`:"";return`<span class="dt-st ${r}">${i.name}${l}${o}${c}</span>`}).join(""):'<span class="dt-empty">无</span>'}function _t(e,i){const r=s._zw;if(!r)return"";const l=w=>r.palaces.find(z=>R.indexOf(z.branch)===w),o=l(e)||r.palaces.find(w=>R.indexOf(w.branch)===e);if(!o)return"";const c=R.indexOf(o.branch),d=Z[Y(i-c)],m=o.shensha||{},u=o.stars.filter(w=>w.type==="主星"),h=o.stars.filter(w=>w.type==="吉星"||w.type==="辅星"),b=o.stars.filter(w=>w.type==="煞星"),C=o.stars.filter(w=>!["主星","吉星","辅星","煞星"].includes(w.type)),q=(o.selfHua||[]).length?o.selfHua.map(w=>`<i class="pp-m self ${P[w.type]}" title="自化：宫干化回本宫">${w.type}</i>`).join(""):'<span class="dt-empty">无</span>',T=[Y(c+4),Y(c+8),Y(c+6)].map(w=>{const z=l(w),te=Z[Y(i-w)],D=z?z.stars.filter($=>$.type==="主星").map($=>$.name).join("、"):"",oe=w===Y(c+6)?"对宫":"三合";return`<span class="dt-st">${te}[${R[w]}]<b>${D||"无主星"}</b><em>${oe}</em></span>`}).join(""),j=l(Y(c+6)),_=j?j.stars.filter(w=>w.type==="主星"):[],X=u.length?qe(u):`<span class="dt-empty">无主星</span><span class="dt-tri">　借对宫 <b>${_.length?_.map(w=>w.name).join("、"):"亦无主星"}</b></span>`,H=(w,z)=>`<div class="dt-dr"><span class="dt-k">${w}</span><div class="dt-v">${z}</div></div>`;return`<div class="dt-dh">
        <b>${d}</b><span>${o.branch}宫 · ${o.ganzhi}</span>
        <span>大限 ${o.daxian.start}-${o.daxian.end}</span>
        <span>小限起 ${o.xiaoxian.age} 岁</span>
        ${o.isBody?"<span>· 身宫</span>":""}
        <span class="dt-x" data-pp-close="1">收起</span>
      </div>
      ${H("主星",X)}
      ${H("吉辅",qe(h))}
      ${b.length?H("煞星",qe(b)):""}
      ${C.length?H("杂曜",qe(C)):""}
      ${H("宫干四化",q)}
      ${H("十二神",`<span class="dt-tri">长生 ${m.changsheng||"—"}　博士 ${m.boshi||"—"}　将前 ${m.jiangqian||"—"}　岁前 ${m.suiqi||"—"}</span>`)}
      ${H("三方四正",`<span class="dt-tri">${T}</span>`)}
      <div class="hint">三方四正在盘上已同步标出（浅红描边）。再点一次本宫可收起。</div>`}function Xe(e){e.querySelectorAll(".pp-cell.pp-sel,.pp-cell.pp-link").forEach(i=>{i.classList.remove("pp-sel"),i.classList.remove("pp-link")}),e.querySelectorAll('.pp-cell[aria-expanded="true"]').forEach(i=>i.setAttribute("aria-expanded","false"))}const $a={};function zt(e,i){jt(e);const r=e.querySelector(".pp-grid");if(!r)return;const l=[i,(i+6)%12,(i+4)%12,(i+8)%12],o=u=>{const h=e.querySelector('.pp-cell[data-pi="'+u+'"]');if(!h)return null;const b=Number(h.style.gridRow),C=Number(h.style.gridColumn),q=Math.min(75,Math.max(25,(b-.5)*25));return C===1?[25,q]:[75,q]},c=l.map(o);if(c.some(u=>!u))return;const d=document.createElementNS("http://www.w3.org/2000/svg","svg");d.setAttribute("class","pp-sf"),d.setAttribute("viewBox","0 0 100 100"),d.setAttribute("preserveAspectRatio","none");const m=(u,h,b,C)=>{const q=document.createElementNS("http://www.w3.org/2000/svg","line");q.setAttribute("x1",u),q.setAttribute("y1",h),q.setAttribute("x2",b),q.setAttribute("y2",C),d.appendChild(q)};m(c[0][0],c[0][1],c[1][0],c[1][1]),m(c[1][0],c[1][1],c[2][0],c[2][1]),m(c[2][0],c[2][1],c[3][0],c[3][1]),m(c[3][0],c[3][1],c[0][0],c[0][1]);for(let u=0;u<4;u++){const h=document.createElementNS("http://www.w3.org/2000/svg","circle");h.setAttribute("cx",c[u][0]),h.setAttribute("cy",c[u][1]),h.setAttribute("r",u===0?.9:.7),u===0&&h.setAttribute("style","fill:var(--red);opacity:.85"),d.appendChild(h)}r.style.position="relative",r.appendChild(d)}function jt(e){const i=e.querySelector("svg.pp-sf");i&&i.remove()}function Re(){if(Re.done||typeof document>"u"||!document.addEventListener)return;Re.done=!0;const e=i=>{const r=i.closest(".pp-body");if(!r)return;const l=r.querySelector(".pp-detail");if(!l)return;if(i.classList.contains("pp-sel")){Xe(r),jt(r),l.classList.remove("open"),l.innerHTML="";return}Xe(r);const o=Number(i.dataset.pi),c=Number(r.dataset.soul);zt(r,o),r.querySelectorAll(".pp-cell").forEach(m=>{const u=Number(m.dataset.pi);(u===Y(o+4)||u===Y(o+8)||u===Y(o+6))&&m.classList.add("pp-link")}),i.classList.add("pp-sel"),i.setAttribute("aria-expanded","true"),l.innerHTML=_t(o,c),l.classList.add("open")};document.addEventListener("click",i=>{const r=i.target;if(r&&r.closest&&r.closest("[data-pp-close]")){const o=r.closest(".pp-body");if(o){Xe(o),jt(o);const c=o.querySelector(".pp-detail");c&&(c.classList.remove("open"),c.innerHTML="");return}}const l=r&&r.closest?r.closest(".pp-cell[data-pi]"):null;l&&e(l)}),document.addEventListener("keydown",i=>{if(i.key!=="Enter"&&i.key!==" ")return;const r=i.target&&i.target.closest?i.target.closest(".pp-cell[data-pi]"):null;r&&(i.preventDefault(),e(r))})}s.bindZiwei=Re,s._palaceDetailHTML=_t,Re();function Ht(e,i){const r=i||{},l=e.slice().sort((o,c)=>c.position-o.position);return r.plain?l.map(o=>`<div class="mp-hy-row hy-plain">
        <span class="mp-hy-nm">${o.name||se[o.position-1]}</span>
        ${ge(o.yinYang==="阳",o.moving)}
      </div>`).join(""):l.map(o=>{const c=o.yinYang==="阳",d=r.shiYing?o.position===r.shi?'<span class="mp-hy-sy">世</span>':o.position===r.ying?'<span class="mp-hy-sy">应</span>':"<span></span>":"<span></span>",m=o.moving?`<i class="mp-hy-mv" title="动爻">${c?"○":"×"}</i>`:'<i class="mp-hy-mv"></i>';return`<div class="mp-hy-row">
        ${d}
        <span class="mp-hy-nm">${o.name||se[o.position-1]}</span>
        <span class="mp-hy-ln">${ge(c,o.moving)}${m}</span>
        <span class="mp-hy-gz">${a(o.ganzhi||"")}</span>
        <span class="mp-hy-lq">${a(o.liuqin||"")}</span>
        <span class="mp-hy-ls">${a(o.liushen||"")}</span>
      </div>`}).join("")}s.liuyaoHTML=function(e){const i=(w,z,te,D)=>`<div class="mp-hy-box">
      <div class="mp-hy-h"><b>${w}</b><span>${z}</span></div>
      <div class="mp-hy">${Ht(D,{shiYing:!0,shi:te.shi,ying:te.ying})}</div>
    </div>`,r=i(`本卦 ${e.ben.name}`,`${e.ben.palace} · ${e.ben.palaceElement}`,e.ben,e.ben.lines),l=e.bian?i(`变卦 ${e.bian.name}`,`${e.bian.palace} · ${e.bian.palaceElement}`,e.bian,e.bian.lines):`<div class="mp-hy-box"><div class="mp-hy-h"><b>六爻安静</b><span>无动爻，不取变卦</span></div>
          <div class="pp-dim" style="font-size:12px;line-height:1.9">断卦以本卦卦辞与世应生克为主。</div></div>`,o=e.body&&Array.isArray(e.body.labels)?e.body.labels:[],c=o.length?`<div class="pp-chips">${o.map(w=>`<span class="pp-chip ${/伏吟/.test(w)||/反吟/.test(w)||/化退神/.test(w)?"warn":/六冲|散/.test(w)?"":"ok"}">${a(w)}</span>`).join("")}</div>`:'<div class="pp-chips"><span class="pp-chip">卦体无六冲、六合、伏吟、反吟</span></div>',d=e.useGod&&e.useGod.liuqin?e.useGod:null,m=d?`<div class="pp-chips">${d.labels.map(w=>`<span class="pp-chip ${/空亡|退神|受克|泄气|不上卦/.test(w)?"warn":/持世|化进|六合|得飞神生/.test(w)?"ok":""}">${a(w)}</span>`).join("")}</div>`:'<div class="pp-chips"><span class="pp-chip">用神未取（未指明所问之事）</span></div>',u=e.useGodStrength&&Array.isArray(e.useGodStrength.labels)?e.useGodStrength:null,h=u&&u.labels.length?`<div class="pp-chips">${u.labels.map(w=>`<span class="pp-chip ${/死|囚|月破|受日辰克|泄|耗/.test(w)?"warn":/旺|相|得日辰生|比和/.test(w)?"ok":""}">${a(w)}</span>`).join("")}</div>`:"",b=e.fushenAccess&&Array.isArray(e.fushenAccess.labels)?e.fushenAccess:null,C=b&&b.labels.length?`<div class="pp-chips">${b.labels.map(w=>`<span class="pp-chip ${/可出/.test(w)?"ok":/受压难出|有助有压/.test(w)?"warn":""}">伏神${a(w)}</span>`).join("")}</div>`:"",q=e.yingqi&&Array.isArray(e.yingqi.labels)?e.yingqi:null,T=q&&q.labels.length?`<div class="pp-chips">${q.labels.map(w=>`<span class="pp-chip ${/应期偏速/.test(w)?"ok":/应期待解/.test(w)?"warn":""}" title="只列地支，不出日期">${a(w)}</span>`).join("")}</div>`:"",j=e.jinTuiPower&&Array.isArray(e.jinTuiPower.labels)?e.jinTuiPower:null,_=j&&j.labels.length?`<div class="pp-chips">${j.labels.map(w=>`<span class="pp-chip ${/后劲足|退得缓/.test(w)?"ok":/有限|进得虚|退得实|月破|未定/.test(w)?"warn":""}">${a(w)}</span>`).join("")}</div>`:"",X=e.hexStrength&&Array.isArray(e.hexStrength.labels)?e.hexStrength:null,H=X&&X.labels.length?`<div class="pp-chips">${X.labels.map(w=>`<span class="pp-chip ${/死|囚|月破|冲空/.test(w)?"warn":/旺|相/.test(w)?"ok":""}">${a(w)}</span>`).join("")}</div>`:"";return s.briefHTML(e)+`<div class="pp" style="padding:14px">
      <div class="mp-mh-head">起卦 ${e.cast.notation.join("、")}（自下而上）　日辰 ${e.dayGanZhi.name}</div>
      <div class="mp-hy-wrap">${r}${l}</div>
      ${c}
      ${m}
      ${h}
      ${C}
      ${T}
      ${_}
      ${H}
    </div>`},s.meihuaHTML=function(e){const i=(T,j,_,X,H)=>{const z=[...ae[X]||[0,0,0],...ae[_]||[0,0,0]].slice().reverse().map(te=>ge(!!te,!1,"sm")).join("");return`<div class="mp-hexbox hb-mini">
        <div class="hb-h">${T}</div>
        <div class="hb-n">${j}</div>
        <div class="mp-mh-mini">${z}</div>
        <div class="hb-s">${H||`上${_} 下${X}`}</div>
      </div>`},r=e.lines.slice().sort((T,j)=>j.position-T.position),l=r.slice(0,3),o=r.slice(3),c=e.moving>=4,d=(T,j,_,X)=>`<div class="mp-trib">
      <div class="mp-trib-h">${T} ${fe(j)}${j}${St(j)}<span class="mp-tritag ${X?"tritag-ti":"tritag-yong"}">${X?"体":"用"}</span></div>
      <div class="mp-hy" style="gap:5px">${Ht(_,{plain:!0})}</div>
    </div>`,m=`<div class="mp-hexbox">
      <div class="hb-h"><span>本卦</span><span>动 ${e.movingName}</span></div>
      <div class="hb-n">${e.ben.name}</div>
      ${d("上卦",e.ben.upper,l,!c)}
      ${d("下卦",e.ben.lower,o,c)}
      <div class="hb-s">${e.source}</div>
    </div>`,u=e.bodyUse.level,h=u.includes("凶")?"bad":u.includes("吉")?"good":"flat",b=`<div class="mp-mh-rel">
      <div><b>体</b>${e.bodyUse.body.trigram}（${e.bodyUse.body.element}）　<b>用</b>${e.bodyUse.use.trigram}（${e.bodyUse.use.element}）</div>
      <div><span class="mh-lv ${h}">${u}</span>　${e.bodyUse.relation}</div>
    </div>`,C=Ft(e.cuo.name)||["",""],q=Ft(e.zong.name)||["",""];return s.briefHTML(e)+`<div class="pp mp-mh">
      <div class="mp-mh-main">
        ${m}
        ${i("互卦",e.hu.name,e.hu.upper,e.hu.lower,"中藏之象")}
        ${i("变卦",e.bian.name,e.bian.upper,e.bian.lower,`动 ${e.movingName} 后`)}
        ${i("错卦",e.cuo.name,C[0],C[1],"六爻全变")}
        ${i("综卦",e.zong.name,q[0],q[1],"整卦倒转")}
      </div>
      ${b}
    </div>`};const st={乾为天:["乾","乾"],天风姤:["乾","巽"],天山遁:["乾","艮"],天地否:["乾","坤"],风地观:["巽","坤"],山地剥:["艮","坤"],火地晋:["离","坤"],火天大有:["离","乾"],坎为水:["坎","坎"],水泽节:["坎","兑"],水雷屯:["坎","震"],水火既济:["坎","离"],泽火革:["兑","离"],雷火丰:["震","离"],地火明夷:["坤","离"],地水师:["坤","坎"],艮为山:["艮","艮"],山火贲:["艮","离"],山天大畜:["艮","乾"],山泽损:["艮","兑"],火泽睽:["离","兑"],天泽履:["乾","兑"],风泽中孚:["巽","兑"],风山渐:["巽","艮"],震为雷:["震","震"],雷地豫:["震","坤"],雷水解:["震","坎"],雷风恒:["震","巽"],地风升:["坤","巽"],水风井:["坎","巽"],泽风大过:["兑","巽"],泽雷随:["兑","震"],巽为风:["巽","巽"],风天小畜:["巽","乾"],风火家人:["巽","离"],风雷益:["巽","震"],天雷无妄:["乾","震"],火雷噬嗑:["离","震"],山雷颐:["艮","震"],山风蛊:["艮","巽"],离为火:["离","离"],火山旅:["离","艮"],火风鼎:["离","巽"],火水未济:["离","坎"],山水蒙:["艮","坎"],风水涣:["巽","坎"],天水讼:["乾","坎"],天火同人:["乾","离"],坤为地:["坤","坤"],地雷复:["坤","震"],地泽临:["坤","兑"],地天泰:["坤","乾"],雷天大壮:["震","乾"],泽天夬:["兑","乾"],水天需:["坎","乾"],水地比:["坎","坤"],兑为泽:["兑","兑"],泽水困:["兑","坎"],泽地萃:["兑","坤"],泽山咸:["兑","艮"],水山蹇:["坎","艮"],地山谦:["坤","艮"],雷山小过:["震","艮"],雷泽归妹:["震","兑"]},Ot={乾:"金",兑:"金",离:"火",震:"木",巽:"木",坎:"水",艮:"土",坤:"土"},St=e=>Ot[e]?` ${Ot[e]}`:"",Ft=e=>st[e]||null;s.daliurenHTML=function(e){const i=e.sanChuan,r=(m,u)=>`<div class="mp-dl-sc-c">
      <div class="mp-dl-sc-k">${u}</div>
      <div class="mp-dl-sc-z">${m.zhi}</div>
      <div class="mp-dl-sc-j">${m.jiangFull||m.jiang}</div>
      <div class="mp-dl-sc-l">${m.liuQin}${m.xunKong?" · 空":""}</div>
    </div>`,l=`<div class="mp-dl-sc-c ge">
      <div class="mp-dl-sc-k">格局</div>
      <div class="mp-dl-sc-gn">${e.geJu.name}</div>
      <div class="mp-dl-sc-l">${e.geJu.detail}</div>
    </div>`,o=e.siKe.slice().map(m=>`<div class="mp-dl-sk-c">
      <div class="mp-dl-sk-k">${["一课","二课","三课","四课"][m.position-1]||m.position+"课"}</div>
      <div class="mp-dl-sk-s">${m.shang}</div>
      <div class="mp-dl-sk-x">${m.xia}</div>
      <div class="mp-dl-sk-r">${m.relation} · ${m.jiangFull||m.jiang}</div>
    </div>`).join(""),c=e.pan.map(m=>{const u=ee[m.di]||[1,1];return`<div class="mp-dl-pc" style="grid-row:${u[0]};grid-column:${u[1]}">
        <div class="tz">${m.tian}</div>
        <div class="dz">地盘 ${m.di}</div>
        <div class="jz">${m.jiangFull}</div>
      </div>`}).join(""),d=`<div class="mp-dl-c">
      <div class="dl-t1">${e.dayGanZhi}日　${e.hourZhi}时</div>
      <div class="dl-t2">${e.dayNight}贵 · 月将 ${e.yueJiang.name}${e.yueJiang.zhi} · 贵人${e.guiren.reverse?"逆":"顺"}行</div>
      <div class="dl-t3">${i.chu.zhi} → ${i.zhong.zhi} → ${i.mo.zhi}</div>
      <div class="dl-t2">节气 ${e.jieqi.name}${e.jieqi.time?" "+e.jieqi.time:""}</div>
    </div>`;return s.briefHTML(e)+`<div class="pp mp-dl">
      <div class="mp-dl-head">日 ${e.dayGanZhi}　时 ${e.hourZhi}（${e.dayNight}贵）　月将 ${e.yueJiang.name}${e.yueJiang.zhi}　节气 ${e.jieqi.name}　贵人${e.guiren.reverse?"逆":"顺"}行</div>
      <div class="mp-dl-sc">${r(i.chu,"初传")}${r(i.zhong,"中传")}${r(i.mo,"末传")}${l}</div>
      <div class="mp-dl-sk">${o}</div>
      <div class="mp-dl-pan2">${c}${d}</div>
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
        <div class="mp-tt-kw">${o.keywords.map(c=>`<span>${c}</span>`).join("")}</div>
        <div class="mp-tt-el">${o.arcana} · ${o.element}${o.suit?" · "+o.suit+(o.rankCn?o.rankCn:""):""}${o.domain?" · "+o.domain:""}${o.astro?` · ${o.astro}`:o.role?` · ${o.role}`:""}</div>
      </div>`).join(""),r=e.question?a(e.question):'<span class="pp-dim">（未填写，可在上方输入后重抽）</span>',l=(e.reading||[]).map(o=>`<p>${a(o)}</p>`).join("");return s.briefHTML(e)+`<div class="pp mp-tt">
      <div class="mp-tt-q"><b>所问</b>${r}</div>
      <div class="mp-tt-head">${e.spread}${e.castAt?`　·　抽牌于 ${e.castAt}`:""}</div>
      <div class="mp-tt-grid">${i}</div>
      <div class="mp-tt-read"><div class="mp-tt-rt">牌面解读</div>${l}</div>
      <div class="mp-tt-note"><div class="mp-tt-rt">你的记录</div>
        <textarea class="mp-tt-ta" rows="4" placeholder="写下判断或对照后的想法……（仅本页可见，不保存）"></textarea>
      </div>
      ${e.systemNote?`<div class="mp-tt-tip">${e.systemNote}</div>`:""}
      <div class="mp-tt-tip">塔罗用于自我觉察与娱乐，不作确定性预言。</div>
    </div>`};const Oe=e=>{if(!e||!Array.isArray(e.pairs)||!e.pairs.length)return"";const r='<tr><th scope="col">一对</th><th scope="col">契合度</th>'+(e.pairs[0].dimensions||[]).map(d=>`<th scope="col">${a(d.label)}</th>`).join("")+"</tr>",l=e.pairs.map(d=>`<tr><th scope="row">${a(d.a)} × ${a(d.b)}</th><td>${d.total==null?"—":`${a(d.total)}/100`}<span class="mp-hp-lv">${a(d.level||"")}</span></td>`+(d.dimensions||[]).map(m=>`<td>${m.score>=0?"+":""}${a(m.score)}</td>`).join("")+"</tr>").join(""),o=e.spread>=3&&e.best?`最顺：<b>${a(e.best.a)} × ${a(e.best.b)}</b>（${a(e.best.total)}/100）`+(e.hardest?`；最需磨合：<b>${a(e.hardest.a)} × ${a(e.hardest.b)}</b>（${a(e.hardest.total)}/100）`:""):`三对分数接近（相差 ${a(e.spread)} 分），不排名`,c=e.focus&&e.focus.spread>=3?`<p>差异最大的一维：<b>${a(e.focus.label)}</b>（三对相差 ${a(e.focus.spread)} 分）</p>`:"";return`<div class="mp-hp-triple">
      <div class="mp-hp-ith">三方合盘 · 三对并列</div>
      <table><thead>${r}</thead><tbody>${l}</tbody></table>
      <p>${o}</p>${c}
      <p>${a(e.note||"")}</p>
    </div>`};s.hepanHTML=function(e){const i=(l,o)=>`<div class="mp-hp-side">
      <div class="mp-hp-who">${o}</div>
      <div class="mp-hp-gz">${l.pillars.join(" ")}</div>
      <div class="mp-hp-kv"><span>日主</span><b>${l.dayMaster}</b></div>
      <div class="mp-hp-kv"><span>日支</span><b>${l.dayBranch}</b></div>
      <div class="mp-hp-kv"><span>强弱</span><b>${l.strength||"—"}</b></div>
      <div class="mp-hp-kv"><span>喜用</span><b>${l.favor||"—"}</b></div>
    </div>`,r=e.dimensions.map(l=>`<div class="mp-hp-dim">
      <div class="mp-hp-dimh"><span>${l.label}</span><b class="${l.score>=10?"good":l.score<0?"bad":""}">${l.score>=0?"+":""}${l.score}</b></div>
      <div class="mp-hp-dimt">${l.text}</div>
    </div>`).join("");return s.briefHTML(e)+`<div class="pp mp-hp">
      <div class="mp-hp-head"><b>${e.score.level}</b><span>${e.score.total}/100</span></div>
      <div class="mp-hp-sides">${i(e.a,"你")}${i(e.b,"对方")}</div>
      <div class="mp-hp-dims">${r}</div>
      ${Oe(e.triple)}
      <div class="mp-hp-notes">${e.notes.map(l=>`<p>${l}</p>`).join("")}</div>
    </div>`},s.qimenFactsHTML=function(e){if(!e||!e.palaces)return"";const i=(o,c)=>`<div class="relation__row"><dt>${a(o)}</dt><dd>${a(c)}</dd></div>`,r=o=>o&&["旺","相","休","囚","死"].filter(d=>Array.isArray(o[d])&&o[d].length).map(d=>`${d} ${o[d].join("、")}`).join("；")||"—";return`<dl class="relation mp-qm-facts" aria-label="奇门盘面事实">${[["局数",`${e.ju}${e.yuan?`（${e.yuan}）`:""}`],["节气",`${e.jieqi||"—"}${e.jieqiTime?`（${e.jieqiTime}）`:""}`],["四柱",`${e.siZhu?`${e.siZhu.year} ${e.siZhu.month} ${e.siZhu.day} ${e.siZhu.time}`:"—"}`],["值符",e.zhiFu?`${e.zhiFu.star} · ${e.zhiFu.gong}宫`:"—"],["值使",e.zhiShi?`${e.zhiShi.gate} · ${e.zhiShi.gong}宫`:"—"],["旬首",e.xunshou||"—"],["空亡",(e.kongWang||[]).join("")||"—"],["驿马",e.ma&&e.ma.zhi?`${e.ma.zhi}${e.ma.gong?`（${e.ma.gong}宫）`:""}`:"—"],["换局规则",e.juMethodNote||e.juMethod||"—"],["晚子时",e.lateZiHourMode==="next-day"?"23:00 后归次日":"23:00 后仍归当日"],["击刑",e.conditions&&e.conditions.jiXing&&e.conditions.jiXing.length?e.conditions.jiXing.map(o=>`${o.palace}宫${o.stem}`).join("、"):"本盘无"],["三奇入墓",e.conditions&&e.conditions.ruMu&&e.conditions.ruMu.length?e.conditions.ruMu.map(o=>`${o.palace}宫${o.stem}`).join("、"):"本盘无"],["六仪入墓",e.conditions&&e.conditions.liuYiRuMu&&e.conditions.liuYiRuMu.length?e.conditions.liuYiRuMu.map(o=>`${o.palace}宫${o.stem}`).join("、"):"本盘无"],["十干克应",[...e.palaces||[],e.centerPalace].filter(c=>c&&c.ganYing).map(c=>`${c.palace}宫 ${c.ganYing.tian}加${c.ganYing.di}「${c.ganYing.name}」`).join("；")||"—"],["月令",e.month&&e.month.branch?`${e.month.branch}（${e.month.element}）`:"—"],["门旺衰",r(e.states&&e.states.gate)],["星旺衰",r(e.states&&e.states.star)],["干旺衰",r(e.states&&e.states.stem)],["干宫生克",(()=>{const o=["干克宫","宫克干","干生宫","宫生干","比和"],c={};for(const d of e.palaces||[]){const m=d.stemRelation||null;!m||m.type==="unknown"||!d.tianPan||(c[m.type]=c[m.type]||[]).push(d.tianPan)}return o.filter(d=>c[d]).map(d=>d+" "+c[d].join("、")).join("；")||"—"})()]].map(([o,c])=>i(o,c)).join("")}</dl>`};const qt=[["4","9","2"],["3","5","7"],["8","1","6"]];s.qimenHTML=function(e){const i={};for(const l of e.palaces)i[l.palace]=l;const r=l=>{if(l==="5")return`<div class="pp-qm-cell center">
          <div class="pp-qm-ju">${e.ju}</div>
          <div class="pp-qm-kv">${e.siZhu.year} ${e.siZhu.month}</div>
          <div class="pp-qm-kv">${e.siZhu.day} ${e.siZhu.time}</div>
          <div class="pp-qm-kv dim">${e.jieqi} ${e.yuan}</div>
        </div>`;const o=i[l]||{};return`<div class="pp-qm-cell">
        <div class="pp-qm-top"><span class="god">${o.god||""}</span><span class="mk">${o.kong?"空":""}${o.ma?"马":""}</span></div>
        <div class="pp-qm-mid"><span class="tp">${o.tianPan||""}</span><span class="star">${o.star||""}</span></div>
        <div class="pp-qm-mid"><span class="dp">${o.diPan||""}</span><span class="gate">${o.gate||""}</span></div>
        <div class="pp-qm-bot"><span>${o.anGan||""}</span><span class="no">${l}</span></div>
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
      <div class="mp-qm-grid">${qt.map(l=>l.map(r).join("")).join("")}</div>
      <div class="mp-qm-legend">上＝九星　中＝天盘干／八门　下＝地盘干／宫号　角落＝八神</div>
      <div class="mp-qm-rules">${e.rules.map(l=>`<p>${l}</p>`).join("")}</div>
    </div>`},s.ziweiHepanHTML=function(e){const i=(o,c)=>`<div class="mp-hp-side">
      <div class="mp-hp-who">${c}</div>
      <div class="mp-hp-gz">命宫 ${o.soul.branch}　夫妻 ${o.soul.branch,""}${o.spouseStars.length,""}</div>
      <div class="mp-hp-kv"><span>命宫主星</span><b>${o.soulStars.join("、")||"无正曜"}</b></div>
      <div class="mp-hp-kv"><span>夫妻宫主星</span><b>${o.spouseStars.join("、")||"无正曜"}</b></div>
      <div class="mp-hp-kv"><span>五行局</span><b>${o.bureau}</b></div>
      <div class="mp-hp-kv"><span>身宫</span><b>${o.body.branch}（${o.body.lands||"—"}）</b></div>
      <div class="mp-hp-kv"><span>生年四化</span><b>${o.natalSihua.join("、")}</b></div>
    </div>`,r=e.dimensions.map(o=>`<div class="mp-hp-dim">
      <div class="mp-hp-dimh"><span>${o.label}</span><b class="${o.score>=10?"good":o.score<0?"bad":""}">${o.score>=0?"+":""}${o.score}</b></div>
      <div class="mp-hp-dimt">${o.text}</div>
    </div>`).join(""),l=o=>(e.interactions||[]).filter(c=>c.who===o).map(c=>`<li><b class="m-${c.mutagen}">${c.mutagen}</b>${c.star}：本命${c.ownPalace} → 对方${c.landingPalace||"盘外"}${c.strong?"<i>（强）</i>":""}</li>`).join("");return s.briefHTML(e)+`<div class="pp mp-hp">
      <div class="mp-hp-head"><b>${e.score.level}</b><span>${e.score.total}/100　紫微合盘</span></div>
      <div class="mp-hp-sides">${i(e.a,"你")}${i(e.b,"对方")}</div>
      <div class="mp-hp-dims">${r}</div>
      <div class="mp-hp-inter">
        <div><div class="mp-hp-ith">你的四化 落在对方</div><ul>${l("你")||"<li>无</li>"}</ul></div>
        <div><div class="mp-hp-ith">对方的四化 落在你</div><ul>${l("对方")||"<li>无</li>"}</ul></div>
      </div>
      ${Oe(e.triple)}
      <div class="mp-hp-notes">${e.notes.map(o=>`<p>${o}</p>`).join("")}</div>
    </div>`},s.curveHTML=function(e){const i=e&&e.dayun&&Array.isArray(e.dayun.list)?e.dayun.list:[],r=e&&Array.isArray(e.liunian)?e.liunian:[];if(i.length<2)return"";const l=v=>typeof v=="number"&&isFinite(v)?v:0,o=v=>v.luck?l(v.luck.score):0,c=4.2,d=-2.2,m=l(e.dayun.startAge&&e.dayun.startAge.years),u=i.length?i[i.length-1].startAge+10:m+80,h=r.map(v=>l(v.age)).filter(v=>v>0),b=Math.min(m,...h.length?h:[m]),C=Math.max(u,...h.length?h:[u]),q=Math.max(1,C-b),T=640,j=190,_={t:14,r:16,b:26,l:30},X=T-_.l-_.r,H=j-_.t-_.b,w=v=>_.l+(v-b)/q*X,z=v=>_.t+H-(Math.max(d,Math.min(c,v))-d)/(c-d)*H,D=[{from:1.2,to:c,cls:"b-good"},{from:.55,to:1.2,cls:"b-good"},{from:-.8,to:.55,cls:"b-flat"},{from:-1.45,to:-.8,cls:"b-bad"},{from:d,to:-1.45,cls:"b-bad"}].map(v=>`<rect class="cv-band ${v.cls}" x="${_.l}" y="${z(v.to).toFixed(1)}" width="${X}" height="${(z(v.from)-z(v.to)).toFixed(1)}"/>`).join(""),oe=10/q*X,$=[];i.forEach((v,le)=>{const ie=l(v.startAge),ke=o(v),we=Math.max(_.l,w(ie)),xe=Math.min(_.l+X,w(ie+10));$.push(`${we.toFixed(1)},${z(ke).toFixed(1)}`),$.push(`${xe.toFixed(1)},${z(ke).toFixed(1)}`)});const ce=$.length?`<polyline class="cv-dy" points="${$.join(" ")}"/>`:"",k=$.length?`<polygon class="cv-dyfill" points="${_.l},${(_.t+H).toFixed(1)} ${$.join(" ")} ${(_.l+X).toFixed(1)},${(_.t+H).toFixed(1)}"/>`:"",O=r.filter(v=>v.luck&&typeof v.luck.score=="number").map(v=>({x:w(l(v.age)),y:z(l(v.luck.score)),y0:l(v.year),gz:v.ganzhi,tier:v.luck.tier,v:l(v.luck.score),age:l(v.age)})),Q=O.length>1?`<polyline class="cv-ln" points="${O.map(v=>`${v.x.toFixed(1)},${v.y.toFixed(1)}`).join(" ")}"/>`:"",$e={大吉:"var(--lu)",吉:"var(--lu)",平:"var(--muted)",忌:"var(--red)",大忌:"var(--red)"},ue=O.length?Math.min(...O.map(v=>v.y0)):null,pe=O.map(v=>`<circle class="cv-dot${v.y0===ue?" now":""}" cx="${v.x.toFixed(1)}" cy="${v.y.toFixed(1)}" fill="${$e[v.tier]||"var(--muted)"}"><title>${a(`${v.y0}年（${v.age}岁）${v.gz}　${v.tier} ${v.v}`)}</title></circle>`).join(""),me=`<line class="cv-ax zero" x1="${_.l}" y1="${z(0).toFixed(1)}" x2="${_.l+X}" y2="${z(0).toFixed(1)}"/><line class="cv-ax" x1="${_.l}" y1="${_.t}" x2="${_.l}" y2="${_.t+H}"/>`,Fe=q>60?10:5,Ze=[];for(let v=Math.ceil(b/Fe)*Fe;v<=C;v+=Fe)Ze.push(`<text class="cv-lbl age" x="${w(v).toFixed(1)}" y="${(_.t+H+13).toFixed(1)}" text-anchor="middle">${v}岁</text>`);const ct=`<text class="cv-lbl" x="${(_.l-5).toFixed(1)}" y="${(z(2.4)+3).toFixed(1)}" text-anchor="end">吉</text><text class="cv-lbl" x="${(_.l-5).toFixed(1)}" y="${(z(0)+3).toFixed(1)}" text-anchor="end">平</text><text class="cv-lbl" x="${(_.l-5).toFixed(1)}" y="${(z(-1.8)+3).toFixed(1)}" text-anchor="end">忌</text>`,be=i.slice().sort((v,le)=>o(le)-o(v)),L=be[0],f=be[be.length-1],U=L&&o(L)>.55?`<text class="cv-lbl" x="${w(l(L.startAge)+5).toFixed(1)}" y="${(z(o(L))-5).toFixed(1)}" text-anchor="middle">▲${L.startAge}岁 ${L.luck.tier}</text>`:"",de=f&&o(f)<-.8?`<text class="cv-lbl" x="${w(l(f.startAge)+5).toFixed(1)}" y="${(z(o(f))+11).toFixed(1)}" text-anchor="middle">▼${f.startAge}岁 ${f.luck.tier}</text>`:"",re=`<div class="cv-legend">
      <span><i style="background:var(--quan)"></i>大运（阶梯，一步十年）</span>
      <span><i style="background:var(--ke)"></i>流年（逐年折线）</span>
      <span>绿带＝吉　灰带＝平　红带＝忌</span>
    </div>`,x=`<div class="cv-tip">曲线只呈现引擎已给出的行运评分（${d} ~ ${c}），不预测具体事件；档位与依据见下方「大运 / 流年」各节。悬停看逐年详情。</div>`;return`<div class="mp-curve">
      <div class="mp-curve-h"><b>人生运势曲线</b><span>${b}–${C} 岁　${e.dayun.rule}，${m} 岁起运${e.dayun.jiao&&e.dayun.jiao.at?`，交运 ${e.dayun.jiao.at}`:""}</span></div>
      <svg viewBox="0 0 ${T} ${j}" role="img" aria-label="人生运势曲线：${b} 到 ${C} 岁的大运与流年评分走势">
        ${D}${me}${k}${ce}${Q}${pe}${Ze.join("")}${ct}${U}${de}
      </svg>
      ${re}${x}
    </div>`},s.trendChart=function(e){const i=e&&Array.isArray(e.points)?e.points:[];if(i.length<2)return"";const r=e&&Array.isArray(e.segments)?e.segments:[],l=L=>typeof L=="number"&&isFinite(L)?L:0,o=720,c=322,d={t:34,r:46,b:66,l:36},m=o-d.l-d.r,u=c-d.t-d.b,h=i.length,b=m/h,C=L=>d.l+(L+.5)*b,q=L=>d.t+u-Math.max(0,Math.min(100,L))/100*u,T=Math.max(1.1,Math.min(10,b*.62)),j=L=>l(L.score),_=d.t+u,X=_+20,H=22,z=`klclip${(()=>{let L=2166136261;const f=U=>{const de=String(U??"");for(let re=0;re<de.length;re++)L^=de.charCodeAt(re),L=Math.imul(L,16777619)};f(h),f(i[0]&&i[0].age),f(i[h-1]&&i[h-1].age);for(const U of i)f(U&&U.score);return(L>>>0).toString(36)})()}`,te=r.map((L,f)=>{const U=Math.max(0,L.startAge-1),de=Math.min(h-1,L.endAge-1);if(de<U)return"";const re=d.l+U*b,x=Math.max(.6,(de-U+1)*b),le=f%2===1?`<rect class="kl-band" x="${re.toFixed(1)}" y="${d.t}" width="${x.toFixed(1)}" height="${u}"/><rect class="kl-stripband" x="${re.toFixed(1)}" y="${X}" width="${x.toFixed(1)}" height="${H}"/>`:"",ie=f===0?"":`<line class="kl-segline" x1="${re.toFixed(1)}" y1="${d.t}" x2="${re.toFixed(1)}" y2="${_}"/>`,ke=Math.min(Math.max(d.l+(U+de+1)/2*b,d.l+22),d.l+m-22);return le+ie+`<text class="kl-seg" x="${ke.toFixed(1)}" y="${(X+15).toFixed(1)}" text-anchor="middle">${a(L.ganZhi)}</text>`}).join(""),D=[0,25,50,75,100].map(L=>`<line class="kl-grid${L===50?" mid":""}" x1="${d.l}" y1="${q(L).toFixed(1)}" x2="${d.l+m}" y2="${q(L).toFixed(1)}"/><text class="kl-lbl" x="${d.l-6}" y="${(q(L)+3).toFixed(1)}" text-anchor="end">${L}</text>`).join(""),oe=i.map((L,f)=>{const U=L.kline||{},de=l(U.open),re=l(U.close),x=Math.min(100,l(U.high)),v=Math.max(0,l(U.low)),le=re>=de,ie=q(de),ke=q(re),we=Math.min(ie,ke),xe=Math.max(.8,Math.abs(ie-ke)),mt=C(f),ut=`${L.age}岁（${L.year}年 ${L.ganZhi}）${re}分${L.dayunGanZhi?` · ${L.dayunGanZhi}运`:""}`;return`<g class="kl-c${le?" up":" down"}"><title>${a(ut)}</title><line x1="${mt.toFixed(2)}" y1="${q(x).toFixed(1)}" x2="${mt.toFixed(2)}" y2="${q(v).toFixed(1)}"/><rect x="${(mt-T/2).toFixed(2)}" y="${we.toFixed(1)}" width="${T.toFixed(2)}" height="${xe.toFixed(1)}" rx="0.7"/></g>`}).join(""),$=L=>{const f=[];for(let U=0;U<h;U++){if(U+1<L)continue;let de=0;for(let re=U+1-L;re<=U;re++)de+=j(i[re]);f.push({i:U,v:de/L})}return f},ce=L=>$(L).map((f,U)=>`${U?"L":"M"}${C(f.i).toFixed(1)} ${q(f.v).toFixed(1)}`).join(" "),k=(L,f)=>{const U=$(L);if(!U.length)return"";const de=U[U.length-1];return{cls:f,y:q(de.v),text:`<text class="kl-ma-lbl ${f}" x="${d.l+m+5}" y="${q(de.v).toFixed(1)}" text-anchor="start">${de.v.toFixed(0)}</text>`}},O=k(10,"m10"),Q=k(5,"m5"),$e=(()=>{if(!Q||!O)return`${O?O.text:""}${Q?Q.text:""}`;let L=Q.y,f=O.y;if(Math.abs(L-f)<10){const U=Math.min(L,f),de=Math.max(L,f);L=U-6,f=de+6}return`<text class="kl-ma-lbl m10" x="${d.l+m+5}" y="${f.toFixed(1)}" text-anchor="start">${$(10).slice(-1)[0].v.toFixed(0)}</text><text class="kl-ma-lbl m5" x="${d.l+m+5}" y="${L.toFixed(1)}" text-anchor="start">${$(5).slice(-1)[0].v.toFixed(0)}</text>`})();let ue=i[0],pe=i[0];for(const L of i)j(L)>j(ue)&&(ue=L),j(L)<j(pe)&&(pe=L);const me=(L,f,U)=>{const de=i.indexOf(L),re=C(de),x=q(j(L)),v=Math.min(Math.max(re,d.l+26),d.l+m-26),le=f==="hi"?x-8<d.t+6?14:U:x+12>d.t+u-2?-8:U;return`<g class="kl-mark ${f}"><circle cx="${re.toFixed(1)}" cy="${x.toFixed(1)}" r="2"/><circle class="ring" cx="${re.toFixed(1)}" cy="${x.toFixed(1)}" r="4.6"/><text x="${v.toFixed(1)}" y="${(x+le).toFixed(1)}" text-anchor="middle">${L.age}岁 ${j(L)}</text></g>`},Fe=h>60?10:5,Ze=i.filter(L=>L.age%Fe===0).map(L=>`<text class="kl-lbl age" x="${C(i.indexOf(L)).toFixed(1)}" y="${(_+14).toFixed(1)}" text-anchor="middle">${L.age}</text>`).join(""),ct=`<text class="kl-lbl axis" x="${d.l}" y="${(c-6).toFixed(1)}">年龄（岁）</text><text class="kl-lbl axis" x="${d.l+m}" y="${(c-6).toFixed(1)}" text-anchor="end">每岁一分 · 满分 100</text>`;return`<div class="mp-kline-fig">
      <svg viewBox="0 0 ${o} ${c}" role="img" aria-label="人生K线：1 到 ${h} 岁的逐年评分蜡烛图">
        <defs><clipPath id="${z}"><rect x="${d.l}" y="${d.t}" width="${m}" height="${u}"/></clipPath></defs>
        ${te}${D}
        <g clip-path="url(#${z})">
          ${oe}
          <path class="kl-ma m10" d="${ce(10)}"/><path class="kl-ma m5" d="${ce(5)}"/>
        </g>
        ${$e}
        ${me(ue,"hi",-8)}${me(pe,"lo",12)}
        ${Ze}${ct}
      </svg><div class="kl-legend"><span><i class="up"></i>阳线：比上一岁高</span><span><i class="down"></i>阴线：比上一岁低</span><span><i class="m5"></i>5 年均线</span><span><i class="m10"></i>10 年均线</span><span>虚线＝大运交界</span></div></div>`},s.trendHTML=function(e,i){if(!e)return"";const r=!(i&&i.brief===!1),l=s.trendChart(e);if(!l)return s.quickHTML(e);const o=Array.isArray(e.segments)?e.segments:[],c=e.highlights&&typeof e.highlights=="object"?e.highlights:{},d=e.meta||{},m=d.strength||{},u=o.map(D=>`<span class="kl-chip">${a(D.ganZhi)}<em>${D.startAge}–${D.endAge}</em></span>`).join(""),h=(Array.isArray(c.best)?c.best:[]).map(D=>`<div class="kl-hl hi">${a(D)}</div>`).join(""),b=(Array.isArray(c.worst)?c.worst:[]).map(D=>`<div class="kl-hl lo">${a(D)}</div>`).join(""),C=d.boundaryNote?`<div class="mp-kline-note">${a(d.boundaryNote)}</div>`:c.suppressed?`<div class="mp-kline-note">${a(c.suppressed)}</div>`:"",q=Array.isArray(e.points)?e.points:[],T=D=>typeof D.score=="number"&&isFinite(D.score)?D.score:0,j=q.map(T),_=j.length?j.reduce((D,oe)=>D+oe,0)/j.length:0,X=j.length?Math.max(...j)-Math.min(...j):0,H=o.map(D=>{const oe=q.filter($=>$.age>=D.startAge&&$.age<=D.endAge).map(T);return{ganZhi:D.ganZhi,v:oe.length?oe.reduce(($,ce)=>$+ce,0)/oe.length:0}}).filter(D=>D.v>0).sort((D,oe)=>oe.v-D.v),w=!!(m.boundary||c.suppressed),z=[`<span><em>全段均值</em><b>${_.toFixed(0)}</b></span>`];!w&&H.length&&(z.push(`<span><em>最好大运</em><b class="hi">${a(H[0].ganZhi)} ${H[0].v.toFixed(0)}</b></span>`),z.push(`<span><em>最差大运</em><b class="lo">${a(H[H.length-1].ganZhi)} ${H[H.length-1].v.toFixed(0)}</b></span>`)),z.push(`<span><em>波动幅度</em><b>${X.toFixed(0)}</b></span>`);const te=`<div class="kl-stats">${z.join("")}</div>`;return(r?s.briefHTML(e):"")+`<section class="mp-kline" aria-label="人生K线结果">
      <div class="mp-kline-h"><b>人生 K 线</b><span>${a(d.birth||"")}　日主 ${a(d.dayMaster||"")}　${a(m.level||"")}${m.score?`（${m.score}）`:""}</span></div>
      ${l}
      ${te}
      ${u?`<div class="kl-segs">${u}</div>`:""}
      ${h||b?`<div class="kl-hls">${h}${b}</div>`:""}
      ${C}
      <div class="mp-kline-tip">逐岁分数由大运与流年十神按固定表确定性计分（1–100），只表五行力量的顺逆，不预测具体事件；旺衰落在换档阈值附近时，不出高低年份结论。</div>
    </section>`},s.chengguHTML=function(e){if(!e)return"";const i=e.weights||{},r=e.song||{},l=["year","month","day","hour"].map(m=>{const u=i[m]||{label:"",qian:0},h=String(u.label||"").split(" ")[0]||"",b=String(u.label||"").split(" ")[1]||"";return`<div class="cg-cell"><em>${a(h)}</em><b>${a(b)}</b></div>`}).join(""),o=String(r.text||""),c=o?o.replace(/[。]$/,"").split("；").map((m,u)=>`<span>${a(m)}${u===0?"；":"。"}</span>`).join(""):"",d=e.verdict&&e.verdict.band?e.verdict.band:"";return`<section class="mp-cg" aria-label="称骨结果">
      <div class="mp-cg-h"><b>称骨</b><span>${a(e.lunar&&e.lunar.text?e.lunar.text:"")}</span></div>
      <div class="mp-cg-w">${l}</div>
      <div class="mp-cg-tot"><em>骨重合计</em><b>${a(e.total&&e.total.label?e.total.label:"")}</b>${d?`<i>${a(d)}</i>`:""}</div>
      <div class="mp-cg-song"><div class="mp-cg-song-h">称骨歌 · ${a(e.total&&e.total.label?e.total.label:"")}</div>
        <div class="mp-cg-verse">${c||'<span class="mp-cg-miss">该骨重未见通行本歌诀</span>'}</div>
        <div class="mp-cg-plain"><em>释义</em>${a(r.plain||"")}</div></div>
      ${e.verdict&&e.verdict.text?`<div class="mp-cg-band"><em>分档</em>${a(e.verdict.text)}</div>`:""}
      <div class="mp-cg-note">骨重与歌诀为通行本口径（各版本歌诀有异文，断句标点已统一）；释义为白话自撰，只作字面直解，属民俗娱乐参考，不构成命运断言。</div>
    </section>`},s.nameHTML=function(e){if(!e)return"";const i={木:"wood",火:"fire",土:"earth",金:"metal",水:"water"},r=h=>h==="未收录"?'<span class="mp-nm-el">未收录</span>':`<span class="mp-nm-el wx-${i[h]||"earth"}">${a(h)}</span>`,l=(h,b)=>`<div class="mp-nm-h"><b>${a(h)}</b>${b?`<i>${a(b)}</i>`:""}</div>`;if(e.action==="generate"){const h=e.bazi&&e.bazi.favorable?e.bazi.favorable.join("、"):"",b=(e.candidates||[]).map(C=>{const q=C.wuge&&C.wuge.available?(()=>{const j=C.wuge.rows.filter(H=>H.level==="吉").length,_=C.wuge.rows.filter(H=>H.level==="凶").length;return`<span class="mp-nm-fit${_===0&&j>=4?" ok":_>=2?" no":""}" title="${a(C.wuge.summary)}">五格 ${j}/5 吉</span>`})():"",T=C.phonetics&&C.phonetics.available?`<span class="mp-nm-fit${C.phonetics.level==="拗口"?" no":C.phonetics.level==="顺口"?" ok":""}" title="${a((C.phonetics.issues||[]).map(j=>j.text).join("；"))}">${a(C.phonetics.level)}</span>`:"";return`<div class="mp-nm-c"><b>${a(C.name)}</b><span class="mp-nm-els">${C.chars.map(j=>r(j.element)).join("")}${q}${T}</span><em>${a(C.chars.map(j=>j.char+"·"+j.meaning).join("　"))}</em></div>`}).join("");return`<section class="mp-nm" aria-label="候选名">
        ${l("候选名",`姓 ${e.surname}（${e.gender}）${h?`　喜用 ${h}`:""}`)}
        <div class="mp-nm-cand">${b}</div>
        <div class="mp-nm-note">${(e.notes||[]).map(C=>"※ "+a(C)).join("<br>")}</div>
      </section>`}const o=(e.chars||[]).map(h=>{const b=h.favorable===!0?'<span class="mp-nm-fit ok">合喜用</span>':h.favorable===!1?'<span class="mp-nm-fit no">不合喜用</span>':'<span class="mp-nm-fit">不判</span>',C=h.source==="user"?"用户指定":h.source==="lib"?"字库":"未收录",q=h.suggest&&h.suggest.length?`<div class="mp-nm-sug"><b>可换</b>${h.suggest.map(T=>`<span class="wx-${i[T.element]||"earth"}">${a(T.char)}（${a(T.element)}）</span>`).join("")}</div>`:"";return`<div class="mp-nm-row"><div class="mp-nm-ch">${a(h.char)}</div>
        <div class="mp-nm-b"><div class="mp-nm-t">${r(h.element)}<span>${a(C)}</span>${b}</div>
        <div class="mp-nm-m">${a(h.meaning)}</div>${q}</div></div>`}).join(""),c=e.bazi?`<div class="mp-nm-m">八字：${a(e.bazi.dayMaster&&e.bazi.dayMaster.stem?`${e.bazi.dayMaster.stem}（${e.bazi.dayMaster.element}）`:String(e.bazi.dayMaster||""))}　${a(e.bazi.strength?`${e.bazi.strength.level}（${e.bazi.strength.score}）`:"")}　喜用 ${a((e.bazi.favorable||[]).join("、"))}</div>
         <div class="mp-nm-m">${a(e.bazi.basis||"")}</div>`:"",d=h=>h==="吉"?"is-ok":h==="半吉"?"is-half":"is-bad",m=e.wuge&&e.wuge.available?`<div class="mp-nm-wu">
          <div class="mp-nm-wu-h"><b>五格</b><i>康熙笔画 · 通行本 81 数理</i></div>
          <div class="mp-nm-wu-rows">${e.wuge.rows.map(h=>`<div class="mp-nm-wu-c ${d(h.level)}"><em>${a(h.key)}</em><b>${h.strokes}</b><i>${a(`${h.level} · ${h.name}`)}</i></div>`).join("")}</div>
          <div class="mp-nm-m">笔画：${e.wuge.strokes.map(h=>`${a(h.char)}${h.strokes}${h.source==="user"?"（指定）":""}`).join(" ＋ ")}</div>
          <div class="mp-nm-m">三才：${a(e.wuge.sancai.text)}</div>
        </div>`:`<div class="mp-nm-wu"><div class="mp-nm-wu-h"><b>五格</b><i>这一版算不了</i></div><div class="mp-nm-m">${a(e.wuge?e.wuge.reason:"未算")}</div></div>`,u=e.phonetics&&e.phonetics.available?`<div class="mp-nm-ph"><b>音韵</b><span class="mp-nm-ph-lv${e.phonetics.level==="顺口"?" ok":e.phonetics.level==="拗口"?" bad":" warn"}">${a(e.phonetics.level)}</span><em>${a(e.phonetics.chars.map(h=>`${h.py}${h.tone}`).join(" "))}　声调 ${a(e.phonetics.tonePattern)}${(e.phonetics.alt||[]).length?`　又读 ${a(e.phonetics.alt.map(h=>`${h.char} ${h.py}${h.tone}`).join("、"))}`:""}</em>${(e.phonetics.issues||[]).map(h=>`<span class="mp-nm-ph-i">${a(h.text)}</span>`).join("")}</div>`:`<div class="mp-nm-ph"><b>音韵</b><em>${a(e.phonetics?e.phonetics.reason:"未算")}</em></div>`;return`<section class="mp-nm" aria-label="名字评估">
      ${l(e.fullName||"",`字库 ${e.stats&&e.stats.libSize?e.stats.libSize:""} 字${e.stats&&e.stats.unknown?`　未收录 ${e.stats.unknown}`:""}`)}
      ${o}
      ${c}
      ${m}
      ${u}
      <div class="mp-nm-verd">${a(e.verdict||"")}</div>
      <div class="mp-nm-note">${(e.notes||[]).map(h=>"※ "+a(h)).join("<br>")}</div>
    </section>`},s.briefHTML=function(e){return e&&e.brief?s.summaryHTML(e.brief):""},s.summaryHTML=function(e){if(!e||!e.lead)return"";const i=(e.sections||[]).map(o=>`<div class="mp-br-sec"><b>${a(o.h)}</b><p>${a(o.t)}</p></div>`).join(""),r=e.advice&&e.advice.length?`<div class="mp-br-adv"><b>可以试着做的</b><ul>${e.advice.map(o=>`<li>${a(o)}</li>`).join("")}</ul></div>`:"",l=e.chips&&e.chips.length?`<div class="mp-br-chips">${e.chips.map(o=>`<span>${a(o)}</span>`).join("")}</div>`:"";return`<section class="mp-br" aria-label="先说结论">
      <div class="mp-br-h"><b>${a(e.title||"先看这一张")}</b>${l}</div>
      <p class="mp-br-lead">${a(e.lead)}</p>
      ${i}
      ${r}
      ${e.caveat?`<p class="mp-br-cav">※ ${a(e.caveat)}</p>`:""}
      ${e.footer?`<p class="mp-br-foot">${a(e.footer)}</p>`:""}
    </section>`},s.baziHTML=function(e){const i=[["year","年柱"],["month","月柱"],["day","日柱"],["hour","时柱"]].filter(([x])=>e.pillars[x]),r={year:"年",month:"月",day:"日",hour:"时"},l={木:"wood",火:"fire",土:"earth",金:"metal",水:"water"},o={比肩:"tg-bi",劫财:"tg-bi",食神:"tg-shi",伤官:"tg-shi",偏财:"tg-cai",正财:"tg-cai",七杀:"tg-guan",正官:"tg-guan",偏印:"tg-yin",正印:"tg-yin"},c=x=>`<span class="tg ${o[x]||""}">${x}</span>`,d=x=>`<span class="wx-${l[x]||"earth"}">${F(x)}${x}</span>`,m=x=>`<span class="ss-s ${x.luck||"neutral"}" title="${a(`${x.cat} · ${x.via}查${x.target} ｜ ${x.rule}`)}">${x.name}</span>`,u=(x,v)=>`<tr><td class="bz-lbl">${x}</td>${i.map(([le])=>`<td data-c="${r[le]}">${v(e.pillars[le],le)}</td>`).join("")}</tr>`,h=`<thead><tr><th></th>${i.map(([x,v])=>`<th${x==="day"?' class="bz-hdr-day"':""}>${v}</th>`).join("")}</tr></thead>`,b={寅:"木",卯:"木",巳:"火",午:"火",申:"金",酉:"金",亥:"水",子:"水",辰:"土",戌:"土",丑:"土",未:"土"},C={木:"火",火:"土",土:"金",金:"水",水:"木"},q={木:"土",土:"水",水:"火",火:"金",金:"木"},T=b[e.pillars.month.branch]||"土",j=["木","火","土","金","水"],_=x=>x===T?"旺":C[T]===x?"相":C[x]===T?"休":q[x]===T?"囚":"死",X=`<tr><td class="bz-lbl">五行</td><td class="bz-wxs" colspan="${i.length}">${["旺","相","休","囚","死"].map(x=>{const v=j.find(le=>_(le)===x)||T;return`<i><b class="wx-${l[v]}">${v}</b><em>${x}</em></i>`}).join("")}</td></tr>`,H=[u("十神",(x,v)=>v==="day"?`<span class="bz-zhuri">${e.input.gender==="male"?"元男":"元女"}</span>`:x.stemTenGod?c(x.stemTenGod):'<span class="pp-dim">—</span>'),u("天干",x=>`<span class="bz-big ${"wx-"+l[x.stemElement]}">${x.stem}</span>`),u("地支",x=>`<span class="bz-big ${"wx-"+l[x.branchElement]}">${x.branch}</span>`),u("藏干",x=>x.hidden.map(v=>`<i class="bz-cg wx-${l[v.element]}">${v.stem}·${v.element}</i>`).join("")),u("支神",x=>x.hidden.map(v=>c(v.tenGod)).join("<br>")),u("纳音",x=>x.nayin),u("空亡",x=>`<span class="pp-dim">${x.kongwang.join("")}</span>`),u("地势",x=>x.dishi),u("自坐",x=>x.zizuo),u("神煞",x=>x.shenshaDetail&&x.shenshaDetail.length?`<span class="pp-ss">${x.shenshaDetail.map(m).join("")}</span>`:'<span class="pp-dim">—</span>'),X].join(""),w=Object.entries(e.wuxing).map(([x,v])=>`<span class="pp-chip wx-${l[x]}">${F(x)}${x} ${v}</span>`).join(""),z=e.frame||{},te=x=>x==="大吉"||x==="吉"?"ok":x==="大忌"||x==="忌"?"warn":"",D=(x,v)=>v?`<div class="pp-sec"><div class="pp-sec-h">${x}</div>${v}</div>`:"",oe=z.geju&&z.geju.length?`
      <div class="pp-tl">${z.primary?`主格 <b>${a(z.primary.name)}</b>　${a(z.primary.evidence)}`:""}</div>
      <div class="pp-chips">${z.geju.map(x=>{const v=x.status==="破格",le=x.status==="待定"||x.status==="假从",ie=`${x.evidence||""}${Array.isArray(x.breaks)&&x.breaks.length?`；破：${x.breaks.join("；")}`:""}`;return`<span class="pp-chip ${v?"broken":le?"warn":""}" title="${a(ie)}">${a(x.name)}<i class="pp-drel">${a(x.kind)}${x.status?`·${a(x.status)}`:""}</i></span>`}).join("")}</div>`:"",$=(()=>{const x=Array.isArray(z.yongshen&&z.yongshen.neutral)?z.yongshen.neutral:[],v=new Set(z.yongshen&&z.yongshen.neutralTenGods||[]);return`${(z.yongshen&&z.yongshen.avoidTenGods||[]).filter(ie=>!v.has(ie)).map(ie=>`<span class="pp-chip warn">${a(ie)}</span>`).join("")}${[...v].map(ie=>`<span class="pp-chip neu" title="局中分量近零，按中性偏忌看">${a(ie)}</span>`).join("")}${x.length?`<span class="pp-chip neu" title="忌神中全局不足 0.5 分的那几行；仍在忌里参与行运评分">中性偏忌 ${x.map(ie=>`${a(ie.element)} ${a(ie.weight)} 分`).join("、")}</span>`:""}`})(),ce=z.yongshen?`
      <div class="pp-tl">喜 ${z.yongshen.favor.map(d).join("")}　忌 ${z.yongshen.avoid.map(d).join("")}　<span class="pp-dim">${a(z.yongshen.method)}</span></div>
      <div class="pp-chips">${z.yongshen.favorTenGods.map(x=>`<span class="pp-chip ok">${a(x)}</span>`).join("")}${$}</div>
      ${(z.yongshen.disputed||[]).length?`<div class="pp-tl pp-dim">有争议：${z.yongshen.disputed.map(x=>`${a(x.element)}（扶抑为${a(x.favorRole)}·${a(x.favorVerb)}，${a(x.climate)}盘调候忌${a(x.element)}）`).join("、")}　保留在喜用，不列入忌</div>`:""}
      <div class="pp-tl pp-dim">${a(z.yongshen.detail)}</div>`:"",k=e.climate||z.yongshen&&z.yongshen.climate||null,O=k?(()=>{const x=Math.max(2,Math.min(98,Math.round(((Number(k.temp)||0)+3)/6*100))),v=k.need?`<em>调候取</em><b>${a(k.need.stem+k.need.element)}</b>`:"<em>气候平和</em>",le=!!(z.yongshen&&Array.isArray(z.yongshen.disputed))&&z.yongshen.disputed.some(ut=>ut.element===k.avoidElement),ie=k.need?`<em>忌</em><b>${a(k.avoidElement)}</b>${le?'<span class="pp-dim">（有争议）</span>':""}`:"",ke=(k.evidence||[]).length?`<em>依据</em><span>${a(k.evidence.join("、"))}</span>`:"",we=k.priority==="调候优先"?'<span class="mp-cli-p">调候优先</span>':'<span class="mp-cli-p">扶抑为主</span>',xe=e.frame&&e.frame.yongshen&&e.frame.yongshen.qt,mt=xe?`<div class="mp-qt">
          <div class="mp-qt-h"><b>穷通宝鉴</b><span>${a(xe.label)}</span></div>
          <div class="mp-qt-y"><em>用神</em>${xe.yong.map((ut,ka)=>`<b class="${ka===0?"first":""}">${a(ut)}</b>`).join("")}<em>首取 ${a(xe.primary)}</em></div>
          <div class="mp-qt-q" title="${a(xe.quote)}">「${a(xe.quote)}」<span>第 ${xe.chapter} 章${xe.truncated?" · 首段更长，摘句下略":""}${xe.note?" · "+a(xe.note):""}</span></div>
        </div>`:"";return`<section class="mp-cli" aria-label="寒暖燥湿">
        <div class="mp-cli-h"><b>寒暖燥湿</b><span class="mp-cli-k">${a(k.label||"")}</span>${we}</div>
        <div class="mp-cli-bar" title="寒 ← → 热"><i style="left:${x}%"></i></div>
        <div class="mp-cli-axis"><span>寒</span><span>平</span><span>热</span></div>
        <div class="mp-cli-row">${v}${ie}${ke}</div>
        <div class="mp-cli-narr">${a(k.narration||"")}</div>
        ${mt}
      </section>`})():"",Q=z.godStats?`<div class="pp-chips">${Object.entries(z.godStats.groups).map(([x,v])=>`<span class="pp-chip">${x} ${v}</span>`).join("")}</div>`:"",$e=e.dayun.list.map(x=>{const v=x.luck||null;return`<span class="pp-chip ${v?te(v.tier):""}" title="${a(`${x.fromDate?`${x.fromDate} 交运；`:""}${v?`${v.tier} ${v.score}｜${(v.reasons||[]).join("；")}`:""}`)}">${x.startAge} ${x.ganzhi}${x.relations&&x.relations.length?` <i class="pp-drel">${x.relations.join("")}</i>`:""}${v?` ${v.tier}`:""}</span>`}).join(""),ue=e.liunian&&e.liunian.length?`<div class="pp-chips">${e.liunian.slice(0,8).map(x=>{const v=x.luck||null,le=x.suiyun&&Array.isArray(x.suiyun.signals)?x.suiyun.signals:[],ie=le.length?`｜${le.map(ke=>ke.detail).join("；")}`:"";return`<span class="pp-chip ${v?te(v.tier):""}" title="${a(v?`${v.tier} ${v.score}｜${(v.reasons||[]).join("；")}${ie}`:ie.replace(/^｜/,""))}">${x.year} ${x.ganzhi}${v?` ${v.tier}`:""}</span>`}).join("")}</div>`:"",pe=(e.liunian||[]).filter(x=>x.suiyun&&Array.isArray(x.suiyun.signals)&&x.suiyun.signals.length),me=e.suiyunClassic,Fe=me?`<div class="pp-dim pp-sy-src" title="${a(me.plain||"")}">《${a(me.bookName||"")}·${a(me.chapter||"")}》「${a(me.quote||"")}」</div>`:"",Ze=pe.length?`<div class="pp-tl pp-dim">岁运提示（只标干支变动，不判吉凶）</div><div class="pp-chips">${pe.map(x=>`<span class="pp-chip" title="${a(`${x.suiyun.signals.map(v=>v.detail).join("；")}｜${x.suiyun.note||""}`)}">${x.year} ${a(x.suiyun.signals.map(v=>`${v.type}${(v.type.startsWith("流年")||v.type.startsWith("大运"))&&v.target?`·${v.target}`:""}`).join("/"))}</span>`).join("")}</div>${Fe}`:"",ct=e.strength?`<div class="pp-str">日主强弱：<b>${e.strength.level}</b>${e.strength.score}　<span class="pp-dim">${e.strength.detail}</span></div>`:"",be=e.strength&&e.strength.branchStructure,L=be?(()=>{const x=be.branches.map(we=>`${a(we.label)}${a(we.branch)}<i class="pp-drel">·${a(we.camp)}</i>${be.placeholderHour&&we.key==="hour"?'<span class="pp-dim">占位</span>':""}`).join(" "),v=be.odd&&be.odd.length?`<span class="pp-st-odd">异类 ${be.odd.map(we=>`${a(we.label)}${a(we.branch)}（${we.weight}分）`).join("、")}</span>`:'<span class="pp-st-odd">无异类</span>',le=be.congProb!=null?`　从格 ${a(be.congRange)}`:"　不套从格概率",ie=be.balance||{},ke=ie.branch?`　支 ${ie.branch.A}:${ie.branch.B}　合干 ${ie.total?`${ie.total.A}:${ie.total.B}`:"—"}`:"";return`<div class="pp-struct" title="${a(`${be.method}；${be.note}`)}"><span class="pp-st-code">${a(be.code)}</span>${x}　${v}${le}${ke}<span class="pp-dim">　静态结构，只作标注，不改上面的旺衰评分</span></div>`})():"",f=e.relations&&Array.isArray(e.relations.anhe)?e.relations.anhe:[],U=f.length?`<div class="pp-anhe" title="${a(e.relations.anheNote||"")}"><b>暗合</b>${f.map(x=>a(x)).join("　")}<span class="pp-dim">　另列，不并入上面的合冲刑害；${f.length===1?"只一对，按口径可忽略":`共 ${f.length} 对`}</span></div>`:"",de=e.shensha&&e.shensha.groups||[],re=de.length?`
      <div class="pp-ssx">
        <div class="ssx-h"><b>神煞全览</b><span>共 ${e.shensha.count} 见 · ${de.length} 类 · 悬停看查法</span></div>
        ${de.map(x=>`<div class="pp-ssg"><span class="ssg-gt">${x.cat}</span><span class="ssg-gi">${x.items.map(v=>`<span class="pp-ssi ${v.luck||"neutral"}" title="${a(`${v.via}查${v.target} ｜ ${v.rule}`)}">${v.name}<em>${v.pillars.map(le=>r[le]||"").join("")}</em></span>`).join("")}</span></div>`).join("")}
        <div class="ssx-h" style="border-top:none;padding-top:4px;margin-top:4px">神煞只作参考，吉凶仍须看格局、旺衰与行运。</div>
      </div>`:"";return s.briefHTML(e)+`<div class="pp" style="padding:12px">
      <table class="pp-bz">${h}<tbody>${H}</tbody></table>
      ${e.hourUnknown?'<div class="pp-warn" role="note">时柱暂缺：只排年/月/日三柱，起运与交运按日估算。时柱按正午暂算，涉及时柱的结论仅供参考。</div>':""}
      <div class="pp-rel"><div><b>天干</b>${e.relations&&e.relations.stems.length?e.relations.stems.join(" · "):"—"}</div>
      <div><b>地支</b>${e.relations&&e.relations.branches.length?e.relations.branches.join(" · "):"—"}</div></div>
      ${ct}
      ${L}
      ${U}
      ${D("格局",oe)}
      ${D("用神",ce)}
      ${O}
      ${Array.isArray(e.classics)&&e.classics.length?`<section class="mp-cl" aria-label="古籍原文">
        <div class="mp-cl-h"><b>古籍原文</b><span>照录通行本，释义为白话自撰</span></div>
        ${e.classics.map(x=>`<div class="mp-cl-e">
          <div class="mp-cl-t"><b>${a(({ziping:"子平真诠",ditian:"滴天髓",sanming:"三命通会"}[x.book]||x.book)+"·"+x.chapter)}</b></div>
          <div class="mp-cl-q">「${a(x.quote)}」</div>
          <div class="mp-cl-p">${a(x.plain)}</div>
        </div>`).join("")}
      </section>`:""}
      ${D("五行与十神",`<div class="pp-chips">${w}</div>${Q}`)}
      ${D("大运",`${s.curveHTML(e)}<div class="pp-chips">${$e}</div>`)}
      ${ue?D("流年",ue+Ze):""}
      ${e.palaces?D("胎命身",`<div class="pp-chips">
        <span class="pp-chip" title="${a(e.palaces.taiyuan.note)}">胎元 ${a(e.palaces.taiyuan.ganzhi)}</span>
        ${e.palaces.taixi?`<span class="pp-chip" title="${a(e.palaces.taixi.note)}">胎息 ${a(e.palaces.taixi.ganzhi)}</span>`:""}
        ${e.palaces.minggong?`<span class="pp-chip" title="${a(e.palaces.minggong.note)}">命宫 ${a(e.palaces.minggong.ganzhi)}</span>`:""}
        ${e.palaces.shengong?`<span class="pp-chip" title="${a(e.palaces.shengong.note)}">身宫 ${a(e.palaces.shengong.ganzhi)}</span>`:""}
        ${!e.palaces.minggong||!e.palaces.shengong?'<span class="pp-chip" title="命宫与身宫由生月与生时支合数定宫；时柱暂缺，这两宫不排">命宫·身宫 时柱暂缺不排</span>':""}
      </div>`):""}
      ${re}
      <div style="margin-top:8px;font-size:12px;color:var(--muted)">上一节 ${e.jieqi.previous.name} ${e.jieqi.previous.time}　下一节 ${e.jieqi.next.name} ${e.jieqi.next.time}　${e.dayun.rule}，${e.dayun.startAge.years}岁起运${e.dayun.jiao&&e.dayun.jiao.at?`（交运 ${e.dayun.jiao.at}，${e.dayun.jiao.frame}）`:""}${e.dayun.startAgeExact&&Number.isInteger(e.dayun.startAgeExact.years)?`　精确 ${e.dayun.startAgeExact.years}年${e.dayun.startAgeExact.months}月${e.dayun.startAgeExact.days}天${e.dayun.startAgeExact.hours}时（截断到日时；上面是四舍五入到月）`:""}</div>
    </div>`};const ot={natal:"命盘解析",divination:"卦象解析",card:"牌阵解析"},Nt={同向:"good",有张力:"watch",互补:"alt"},Dt=e=>`<div class="mp-cross">${e.map(i=>{const r=Nt[i.stance]||"plain";return`<div class="mp-cross-row">
      <div class="mp-cross-h"><span class="mp-cross-l">${a(i.label)}</span><span class="mp-cross-tag t-${r}">${a(i.stance||"—")}</span></div>
      <div class="mp-cross-b">
        <div class="mp-cross-cell"><b>八字</b><span>${a(i.bazi||"—")}</span></div>
        <div class="mp-cross-cell"><b>紫微</b><span>${a(i.ziwei||"—")}</span></div>
      </div>
      ${i.note?`<div class="mp-cross-note">${a(i.note)}</div>`:""}
    </div>`}).join("")}</div>`;s.interpretHTML=function(e,i){if(!e||!(e.dimensions&&e.dimensions.length||e.sections&&e.sections.length)&&!e.error&&!e.answer)return"";const l=!!(i&&i.folded);let o=-1;(e.dimensions||[]).forEach(($,ce)=>{$.knowledge&&$.knowledge.length&&(o=ce)});const c=(e.dimensions||[]).map(($,ce)=>`<div class="mp-it-dim${$.focused?" focus":""}">
      <div class="mp-it-dh"><span class="mp-it-dno">${ce+1}</span><span class="mp-it-dlabel">${a($.label)}</span>${$.focused?'<span class="mp-it-focus">最贴近你的问题</span>':""}${$.confidence?`<span class="mp-it-conf c-${a($.confidence)}">置信度 ${a($.confidence)}</span>`:""}</div>
      ${$.plain?`<div class="mp-it-dplain">${a($.plain)}</div>`:""}
      <div class="mp-it-dtext">${a($.text)}</div>
      ${$.evidence&&$.evidence.length?`<details class="mp-it-ev"><summary>依据 · ${a($.evidence.length)} 条盘面事实</summary><div class="mp-it-ev-body">${$.evidence.map(k=>`<span class="mp-it-ev-item">${a(k)}</span>`).join("")}<span class="mp-it-ev-tech">技法：${a(e.technique||e.systemLabel||"")}</span></div></details>`:""}
      ${$.knowledge&&$.knowledge.length?`<div class="mp-it-know">${$.knowledge.map(k=>`<div class="know-row"><span class="know-status ${k.status}">${a(k.statusLabel)}</span><span class="know-body"><b>${a(k.gist)}</b>${a(k.detail)}${k.source?`<i>出处：${a(k.source)}</i>`:""}${k.note?`<em>注：${a(k.note)}</em>`:""}</span></div>`).join("")}${ce===o&&e.knowledgeNote?`<div class="know-disc">${a(e.knowledgeNote)}</div>`:""}</div>`:""}
      ${$.advice?`<div class="mp-it-adv"><b>建议</b>${a($.advice)}</div>`:""}
    </div>`).join(""),d=e.outline&&e.outline.length?`<div class="mp-outline"><div class="mp-outline-h">一页读懂</div>${e.outline.map($=>`<div class="mp-outline-row"><b>${a($.label)}</b><span>${a($.text)}</span></div>`).join("")}</div>`:"",m=e.sections&&e.sections.length?`<nav class="mp-toc" aria-label="报告目录">${e.sections.map($=>`<a href="#mp-sec-${a($.key)}">${a($.label)}</a>`).join("")}</nav>`:"",u=e.tables&&e.tables.length?`<div class="mp-tables">${e.tables.filter($=>Array.isArray($.rows)&&$.rows.length).map($=>`<div class="mp-table-wrap">
          <div class="mp-table-h">${a($.title)}</div>
          <div class="mp-table-scroll"><table class="mp-table">
            <thead><tr>${$.columns.map(ce=>`<th scope="col">${a(ce)}</th>`).join("")}</tr></thead>
            <tbody>${$.rows.map(ce=>`<tr>${ce.map((k,O)=>`<td data-label="${a($.columns[O]||"")}">${a(k)}</td>`).join("")}</tr>`).join("")}</tbody>
          </table></div>
        </div>`).join("")}</div>`:"",h=$=>String($||"").split(`
`).map(ce=>`<div class="mp-it-p">${a(ce).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>")}</div>`).join(""),b=e.sections&&e.sections.length?`<div class="mp-it-secs">${e.sections.map($=>`<div class="mp-it-sec${$.tone?` tone-${a($.tone)}`:""}" id="mp-sec-${a($.key)}">
        <div class="mp-it-sh">${a($.label)}</div>
        <div class="mp-it-stext">${Array.isArray($.items)&&$.items.length?Dt($.items):h($.text)}</div>
      </div>`).join("")}</div>`:"",C=[e.systemLabel,ot[e.moduleType]||e.moduleType].filter(Boolean),q=e.ask,T=q&&q.question?a(q.question):"",j=q&&(T||q.direction&&q.direction!=="general")?`<div class="mp-it-ask">${T?`<span class="ask-q">问题：${T}</span><span class="ask-sep">｜</span>`:""}<span class="ask-d">询问方向：${a(q.directionLabel||"综合")}</span></div>`:"",_=e.answer?`<div class="mp-it-ans"><b>${T?"先答所问":"先看结论"}</b>${a(e.answer)}</div>`:"",X=e.plain?`<div class="mp-it-plain"><b>说人话</b>${a(e.plain)}</div>`:"",H=e.followups&&e.followups.length?`<div class="mp-it-fu"><b>还可以这样追问</b><ul>${e.followups.map($=>`<li>${a($)}</li>`).join("")}</ul></div>`:"",w=e.glossary&&e.glossary.length?`<details class="mp-it-gloss"><summary>名词解释（${e.glossary.length} 条）</summary>${e.glossary.map($=>`<div><span>${a($.term)}</span>${a($.plain)}</div>`).join("")}</details>`:"",z=e.limits&&e.limits.length?`<details class="mp-it-limits"><summary>本插件不回答什么（${e.limits.length} 条）</summary>${e.limits.map($=>`<div><b>${a($.title)}</b>${a($.text)}</div>`).join("")}</details>`:"",D=e.system&&/^(liuyao|meihua|daliuren|qimen|tarot|xiaoliuren)$/.test(e.system)?`<div class="mp-askcopy-row"><button type="button" class="mp-askcopy" data-mp-askcopy="${a(e.system)}">复制问事提示</button><span class="mp-askcopy-hint">把这张盘和你的问题打包成一段提示，粘到任何对话里都能用</span></div>`:"",oe=e.guide?`<details class="mp-guide">
      <summary><b>${a(e.guide.title)}</b><span class="mp-guide-sub">数 / 象 / 辞</span></summary>
      <div class="mp-guide-body">
        <p class="mp-guide-lead">${a(e.guide.lead)}</p>
        <ol class="mp-guide-layers">${(e.guide.layers||[]).map($=>`<li><b>${a($.name)}<i>${a($.sub)}</i></b><span>${a($.text)}</span><em>${a($.hint)}</em></li>`).join("")}</ol>
        <div class="mp-guide-check"><b>${a(e.guide.check.title)}</b><ol>${(e.guide.check.items||[]).map($=>`<li>${a($)}</li>`).join("")}</ol><p>${a(e.guide.check.tail)}</p></div>
        <div class="mp-guide-parts"><b>${a(e.guide.parts.title)}</b><ul>${(e.guide.parts.rows||[]).map($=>`<li><span>${a($[0])}</span>${a($[1])}</li>`).join("")}</ul><p>${a(e.guide.parts.tail)}</p></div>
        <p class="mp-guide-close">${a(e.guide.closing)}</p>
      </div></details>`:"";return`<div class="mp-it${l?" folded":""}">
      <button type="button" class="mp-it-head" aria-expanded="${l?"false":"true"}">
        <span class="mp-it-arrow" aria-hidden="true">▾</span>
        <span class="mp-it-title">解析与详解</span>${C.map($=>`<span class="mp-it-tag">${a($)}</span>`).join("")}
        <span class="mp-it-hint">${l?"点击展开":"点击收起"}</span>
      </button>
      <div class="mp-it-wrap">
        ${D}
        ${j}
        ${_}
        ${X}
        ${e.lead?`<div class="mp-it-lead">${a(e.lead)}</div>`:""}
        ${e.error?`<div class="mp-it-err"><b>⚠ 解析生成失败</b>${a(e.error)}——上方盘面数据本身可用</div>`:""}
    ${oe}
    ${d}
        ${m}
        <div class="mp-it-body">${c}</div>
        ${b}
        ${u}
        ${H}
        ${w}
        ${z}
        <div class="mp-it-dis">${a(e.disclaimer)}</div>
      </div>
    </div>`},s.followupHTML=function(e){if(!e)return"";const i=e.evidence&&e.evidence.length?`<div class="mp-fu-ev">依据：${e.evidence.map(r=>a(r)).join("；")}　置信度：${a(e.confidence||"弱")}</div>`:"";return`<div class="mp-fu${e.ok?"":" miss"}">
      <div class="mp-fu-h">追问 · ${a(e.question)}</div>
      <div class="mp-fu-a">${a(e.answer)}</div>
      ${i}
    </div>`},s.resultWithInterpret=function(e,i,r){return(e||"")+s.interpretHTML(i,r)},s.caliberHTML=function(e){const i=e&&Array.isArray(e.switches)?e.switches.filter(u=>u&&u.key):[];if(!i.length)return"";const r=i.filter(u=>!u.error&&u.total>0),l=r.length?`${i.length} 组开关中 ${r.length} 组影响此盘：${r.map(u=>u.short||u.title).join("、")}。`:`本盘对 ${i.length} 组开关都不敏感：换成另一档也不变。`,o=u=>{if(u.error)return`<div class="mp-cdiff-same">未能对照：${a(u.error)}</div>`;if(!u.total)return'<div class="mp-cdiff-same">无变化 · 此盘不受这一开关影响</div>';const h=Array.isArray(u.roots)?u.roots:[];return h.length?`<div class="mp-cdiff-roots">${h.map(b=>`<div class="mp-cdiff-root"><span class="mp-cdiff-k">${a(b.label)}</span><span class="mp-cdiff-from">${a(b.from)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-to">${a(b.to)}</span></div>`).join("")}</div>`:`<div class="mp-cdiff-same">无单一根因；逐字段差异 ${Number(u.total)||0} 处</div>`},c=u=>{const h=(Array.isArray(u.views)?u.views:[]).filter(b=>b&&b.changed);return u.error||!u.total||!h.length?"":`<table class="mp-cview"><thead><tr><th scope="col">项</th><th scope="col">${a(u.currentLabel)}</th><th scope="col">${a(u.altLabel)}</th></tr></thead><tbody>`+h.map(b=>`<tr><th scope="row">${a(b.label)}</th><td>${a(b.current)}</td><td>${a(b.alt)}</td></tr>`).join("")+"</tbody></table>"},d=u=>{const h=Array.isArray(u.categories)?u.categories:[];if(u.error||!u.total||!h.length)return"";const b=h.slice(0,6);return`<div class="mp-cdiff-cats">${b.map(C=>`<span class="mp-cdiff-cat">${a(C.name)} ${Number(C.count)||0} 处</span>`).join("")}`+(h.length>b.length?`<span class="mp-cdiff-cat">另 ${h.length-b.length} 类</span>`:"")+"</div>"},m=i.map(u=>`<div class="mp-cdiff-row"><div class="mp-cdiff-h"><b>${a(u.title)}</b><span class="mp-cdiff-count${u.total>0?" on":""}">${u.error?"未能对照":u.total?`${Number(u.total)||0} 处`:"无变化"}</span></div><div class="mp-cdiff-ab"><span class="mp-cdiff-pill now">当前 · ${a(u.currentLabel)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-pill alt">换成 · ${a(u.altLabel)}</span></div>${o(u)}${c(u)}${d(u)}</div>`).join("");return`<details class="mp-cdiff" aria-label="口径对照">
      <summary><span class="mp-cdiff-title">口径对照</span><span class="mp-cdiff-lead">${a(l)}</span><span class="mp-cdiff-more">展开逐字差异</span></summary>
      <div class="mp-cdiff-body">${m}
        <div class="mp-cdiff-note">同一组输入、只换一个开关；只列变化字段与根因，不判哪套口径更准，也不改上方盘面。</div>
      </div>
    </details>`},s.handleHTML=function(e){return typeof e!="string"||!e?"":`<section class="mp-handle" aria-label="排盘句柄">
      <span class="mp-handle-title">排盘句柄</span>
      <code class="mp-handle-code" title="${a(e)}">${a(e)}</code>
      <button type="button" class="mp-handle-copy" data-handle-copy="${a(e)}" aria-label="复制排盘句柄">复制句柄</button>
      <span class="mp-handle-hint">追问同一张盘时把它连同增量参数（年份、方向、所问之事）一并交给助手，不必重报出生信息。句柄是编码不是加密，含出生时间与出生地，别公开贴出。</span>
    </section>`},s.revisionHTML=function(e){if(!e||typeof e!="object")return"";const i=Array.isArray(e.applied)?e.applied:[],r=Array.isArray(e.ignored)?e.ignored:[];if(!i.length&&!r.length)return"";const l=i.map(o=>{const c=o.fromDisplay==null?"（未设）":o.fromDisplay;return`<li><span class="k">${a(o.label||o.key)}</span><span class="v"><span class="old">${a(c)}</span> → <span class="new">${a(o.display)}</span></span></li>`}).join("");return`<section class="mp-revise" aria-label="一句话改参">
      <div class="mp-revise-head"><span class="mp-revise-title">一句话改参</span><span class="mp-revise-text">「${a(e.text||"")}」</span></div>
      ${l?`<ul class="mp-revise-list">${l}</ul>`:'<p class="mp-revise-ignored">没有识别到可改的参数，仍按原参数排盘。</p>'}
      ${r.length?`<p class="mp-revise-ignored">未处理：${a(r.join("；"))}</p>`:""}
    </section>`},s.shadowHTML=function(e,i){if(!e||!e.id)return"";const r=[];e.version&&r.push(`版本 <b>${a(e.version)}</b>`),e.baseId&&r.push(`基础指纹 <b>${a(e.baseId)}</b>`),r.push("同参数同 ID");const l=[];e.reproducible===!1&&l.push(`不可复算：${a(e.reason||"参数不足")}`);const o=e.reproducible===!0&&e.asOfPinned===!1&&(e.system==="bazi"||e.system==="ziwei")?'<div class="mp-shadow-hint">未固定 asOf：流年 / 流月随「此刻」变化；要逐字比对请在输入里固定 asOf。</div>':"",c=i&&i.sameId!==!1&&(i.versionChanged||Number(i.total)>0);let d="";if(c){const m=Number(i.total)||0,u=a(i.fromVersion||"—"),h=a(i.toVersion||e.version||"—"),b=Array.isArray(i.roots)?i.roots:[],C=b.slice(0,8),q=C.length?`<div class="mp-cdiff-roots">${C.map(_=>`<div class="mp-cdiff-root"><span class="mp-cdiff-k">${a(_.label)}</span><span class="mp-cdiff-from">${a(_.from)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-to">${a(_.to)}</span></div>`).join("")}`+(b.length>C.length?`<div class="same">另 ${b.length-C.length} 处根因</div>`:"")+"</div>":`<div class="same">${m?"无单一根因；逐字段变化 "+m+" 处":"字段 0 处变化：同一张盘跨版本逐字一致"}</div>`,T=Array.isArray(i.categories)?i.categories:[],j=T.length?`<div class="mp-cdiff-cats">${T.slice(0,6).map(_=>`<span class="mp-cdiff-cat">${a(_.name)} ${Number(_.count)||0} 处</span>`).join("")}`+(T.length>6?`<span class="mp-cdiff-cat">另 ${T.length-6} 类</span>`:"")+"</div>":"";d=`<details class="mp-shadow-diff"${m>0?" open":""}>
        <summary><b>与上次同盘比对</b><span class="tag">${u} → ${h} · ${m?`${m} 处变化`:"0 处变化"}</span></summary>
        ${q}${j}
        <div class="note">同一 baseId（同一组归一化参数）的两次结果；只比盘面字段，不含摘要、解析与古籍等文本层。</div>
      </details>`}return`<section class="mp-shadow" aria-label="影子盘">
      <div class="mp-shadow-head"><span class="mp-shadow-title">影子盘</span><code class="mp-shadow-id">${a(e.id)}</code>
        <button type="button" class="mp-shadow-copy" data-shadow-copy="${a(e.id)}" aria-label="复制影子盘 ID">复制 ID</button></div>
      <div class="mp-shadow-meta">${r.join('<span aria-hidden="true">·</span>')}</div>
      ${l.map(m=>`<div class="mp-shadow-warn">⚠ ${m}</div>`).join("")}
      ${o}
      ${d}
    </section>`},s.shadowTrack=function(e){const i=window.Engine||window.__PP&&window.__PP.Engine;if(!i||!i.shadowSnapshot||!i.shadowDiff)return null;let r=null;try{r=i.shadowSnapshot(e)}catch{return null}if(!r||!r.shadow||!r.shadow.baseId)return null;const l="mp-shadow-v1";let o={};try{const m=window.localStorage?window.localStorage.getItem(l):null,u=m?JSON.parse(m):{};u&&typeof u=="object"&&!Array.isArray(u)&&(o=u)}catch{o={}}const c=o[r.shadow.baseId];let d=null;if(c)try{d=i.shadowDiff(c,r)}catch{d=null}r.at=Date.now(),o[r.shadow.baseId]=r;try{const m=Object.keys(o);if(m.length>24){m.sort((u,h)=>(Number(o[u]&&o[u].at)||0)-(Number(o[h]&&o[h].at)||0));for(const u of m.slice(0,m.length-24))delete o[u]}window.localStorage&&window.localStorage.setItem(l,JSON.stringify(o))}catch{}return d};const Mt="dsh-metaphysics/profiles-v1",We=24,Pt=16,Je=40,wa=60,Rt=["bazi","ziwei","liuyao","tarot","meihua","daliuren","hepan","qimen","almanac","zeri","chenggu","xiaoliuren","star","numerology","mbti","trend","fengshui","name","convert"];s.PROF_KEY=Mt,s.PROF_MAX=We,s.PROF_KINDS=Rt;const Ce={bazi:"八字",ziwei:"紫微",liuyao:"六爻",tarot:"塔罗",meihua:"梅花",daliuren:"六壬",hepan:"合盘",qimen:"奇门",almanac:"黄历",zeri:"择日",chenggu:"称骨",xiaoliuren:"小六壬",star:"星座",numerology:"生命数字",mbti:"人格",trend:"人生K线",fengshui:"风水",name:"起名",convert:"农历"};s.profKindLabel=e=>Ce[e]||String(e||"");const Ie=e=>typeof e=="string";function Qe(e){if(!e||typeof e!="object"||Array.isArray(e)||!Ie(e.id)||!e.id||e.id.length>40||!Ie(e.kind)||Rt.indexOf(e.kind)<0)return null;const i=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e.date||""));if(!i)return null;const r=Number(i[1]),l=Number(i[2]),o=Number(i[3]);if(l<1||l>12||o<1||o>new Date(r,l,0).getDate())return null;const c=Ie(e.time)&&/^([01]?\d|2[0-3]):[0-5]\d$/.test(e.time)?e.time:"";return{id:e.id,kind:e.kind,label:Ie(e.label)?e.label.slice(0,Pt):"",date:e.date,time:e.hourUnknown===!0?"":c,hourUnknown:e.hourUnknown===!0,trueSolar:e.trueSolar!==!1,lateZi:e.lateZi!==!1,gender:e.gender==="male"||e.gender==="female"?e.gender:"",address:Ie(e.address)?e.address.slice(0,Je):"",note:Ie(e.note)?e.note.slice(0,wa):"",pinned:e.pinned===!0,createdAt:Number(e.createdAt)||0,lastUsedAt:Number(e.lastUsedAt)||0,uses:Number(e.uses)||0}}function It(){try{const e=window.localStorage?window.localStorage.getItem(Mt):null,i=e?JSON.parse(e):[];return Array.isArray(i)?i:[]}catch{return[]}}function et(e){return e.slice().sort((i,r)=>(r.pinned?1:0)-(i.pinned?1:0)||(r.lastUsedAt||r.createdAt||0)-(i.lastUsedAt||i.createdAt||0)||(r.createdAt||0)-(i.createdAt||0))}s.profilesLoad=function(){const e=[],i=Object.create(null);for(const r of It()){const l=Qe(r);l&&!i[l.id]&&(i[l.id]=1,e.push(l))}return et(e)},s.profilesSave=function(e){const i=et(Array.isArray(e)?e.slice(0,We):[]);try{return window.localStorage?(window.localStorage.setItem(Mt,JSON.stringify(i)),!0):!1}catch{return!1}};let rt=0;s.profilesNewId=function(){const e=Object.create(null);for(const r of s.profilesLoad())e[r.id]=1;let i;do i=`p${Date.now().toString(36)}${(rt++).toString(36)}`;while(e[i]);return i},s.profilesPut=function(e){const i=Qe(Object.assign({id:s.profilesNewId(),createdAt:Date.now(),lastUsedAt:Date.now()},e));if(!i)return{ok:!1,list:s.profilesLoad()};const r=s.profilesLoad(),l=r.findIndex(o=>o.id===i.id);if(l>=0){const o=r[l];i.createdAt=o.createdAt||i.createdAt,i.lastUsedAt=o.lastUsedAt,i.uses=o.uses,i.pinned=o.pinned,r.splice(l,1,i)}else r.push(i);if(r.length>We){const o=r.slice().sort((m,u)=>(m.lastUsedAt||m.createdAt)-(u.lastUsedAt||u.createdAt)),c=o.find(m=>m.id!==i.id)||o[0],d=r.indexOf(c);d>=0&&r.splice(d,1)}return s.profilesSave(r)?{ok:!0,list:et(r),item:i}:{ok:!1,list:s.profilesLoad()}},s.profilesRemove=function(e){const i=s.profilesLoad().filter(r=>r.id!==e);return s.profilesSave(i)?i:s.profilesLoad()},s.profilesPin=function(e){const i=s.profilesLoad().map(r=>r.id===e?Object.assign({},r,{pinned:!r.pinned}):r);return s.profilesSave(i)?et(i):s.profilesLoad()},s.profilesTouch=function(e){let i=!1;const r=s.profilesLoad().map(l=>l.id!==e?l:(i=!0,Object.assign({},l,{lastUsedAt:Date.now(),uses:(l.uses||0)+1})));return i?s.profilesSave(r)?et(r):s.profilesLoad():r};const ta=864e5;function pt(e){const i=Number(e)||0;if(!i)return"未排过";const r=Math.floor((Date.now()-i)/ta);if(r<=0)return"今天排过";if(r===1)return"昨天排过";if(r<30)return`${r} 天前排过`;const l=new Date(i);return`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}-${String(l.getDate()).padStart(2,"0")} 排过`}s.profilesAgo=pt;const aa={male:"♂",female:"♀"};s.profilesHTML=function(e,i){const r=i||{},l=(Array.isArray(e)?e:[]).map(c=>{const d=Qe(c);if(!d)return"";const m=[d.date,d.hourUnknown?"时辰未知":d.time,d.address].filter(Boolean).join(" "),u=r.editingId&&d.id===r.editingId,h=r.armedDel&&d.id===r.armedDel;return`<div class="mp-prof-card${d.pinned?" pinned":""}${u?" editing":""}" data-id="${a(d.id)}">
        <button type="button" class="mp-prof-use" data-mp-prof="use" data-id="${a(d.id)}"
          title="${a(`用「${d.label||d.kind}」的出生信息直接排盘`)}">
          <span class="mp-prof-nm">${a(d.label||"未命名")}${d.gender?`<i class="sx">${aa[d.gender]||""}</i>`:""}</span>
          <span class="mp-prof-sys">${a(s.profKindLabel?s.profKindLabel(d.kind):d.kind)}</span>
          <span class="mp-prof-bd">${a(m)}</span>
          <span class="mp-prof-at">${a(pt(d.lastUsedAt||d.createdAt))}${d.uses?` · ${d.uses} 次`:""}${d.pinned?" · 置顶":""}</span>
        </button>
        <span class="mp-prof-ops">
          <button type="button" data-mp-prof="pin" data-id="${a(d.id)}" class="${d.pinned?"on":""}"
            aria-pressed="${d.pinned?"true":"false"}" title="置顶这张档案">${d.pinned?"已置顶":"置顶"}</button>
          <button type="button" data-mp-prof="edit" data-id="${a(d.id)}" title="把这张档案读回输入框，改完再存">改名</button>
          <button type="button" data-mp-prof="del" data-id="${a(d.id)}" class="${h?"on":""}"
            title="${h?"再点一次就从本机删除这张档案":"从本机删除这张档案（点两次确认）"}">${h?"确认删除":"删除"}</button>
        </span>
      </div>`}).join(""),o=l?`<div class="mp-prof-list">${l}</div>`:'<p class="mp-prof-empty">还没有存过命盘。填好出生信息，给这张盘起个称呼，点「存为我的命盘」——下次进来一点就出盘，不必重报。</p>';return`<section class="mp-prof" aria-label="我的命盘">
      <div class="mp-prof-h"><b>我的命盘</b><span class="mp-prof-sub">只存本机 · 不上传${e&&e.length?` · ${e.length}/${We}`:""}</span></div>
      ${o}
      ${r.bar||""}
    </section>`},s.profilesBarHTML=function(e){const i=e||{};return`<div class="mp-prof-bar">
        <input class="mp-prof-name" type="text" maxlength="${Pt}" placeholder="称呼，如「我」「妈妈」" aria-label="档案称呼" value="${a(i.name||"")}">
        <button type="button" data-mp-prof="put"${i.canAdd===!1?" disabled":""}>${a(i.editingId?"更新这张档案":"存为我的命盘")}</button>
        ${i.editingId?'<button type="button" class="ghost" data-mp-prof="cancel">取消改名</button>':""}
        <span class="mp-prof-tip">${a(i.tip||(i.editingId?"改完出生信息或称呼，点「更新这张档案」覆盖原档。":"存的是出生时间与出生地这些输入，不是结果。"))}</span>
      </div>`},s.profEvent=function(e){let i=e&&e.closest?e.closest("[data-mp-prof]"):null;if(!i)return null;const r=i.getAttribute("data-mp-prof");return i.tagName==="BUTTON"&&i.disabled?null:{action:r,id:i.getAttribute("data-id")||"",name:i}};const tt=["bazi","trend"],Bt=["bazi","ziwei","liuyao","meihua","daliuren","qimen","hepan","chenggu","trend","fengshui","name","xiaoliuren"];s.profUsable=function(e){return!e||typeof e!="object"?!1:e.hourUnknown===!0||e.time?!0:Bt.indexOf(String(e.kind||""))<0},s.profFromForm=function(e,i,r){const l=e||{},o=l.hourUnknown===!0&&tt.indexOf(String(l.kind||""))>=0;return!o&&!/^([01]?\d|2[0-3]):[0-5]\d$/.test(String(l.time||"").trim())?null:Qe(Object.assign({id:r||s.profilesNewId(),kind:String(l.kind||""),label:String(i||"").trim().slice(0,Pt)||(s.profKindLabel?s.profKindLabel(l.kind):String(l.kind||"")),date:String(l.date||""),time:String(l.time||""),hourUnknown:o,gender:String(l.gender||""),address:String(l.address||""),trueSolar:l.trueSolar!==!1,lateZi:l.lateZi!==!1,pinned:!1,createdAt:Date.now(),lastUsedAt:0,uses:0}))},s.traceHTML=function(e,i,r){if(!Array.isArray(e)||!e.length)return"";const l={liuyao:"六爻",bazi:"八字",ziwei:"紫微",qimen:"奇门",daliuren:"大六壬"}[i]||"命盘",o=e.map(u=>u&&u.field).filter(Boolean).join(" → "),c=typeof r=="string"?r:"",d=(u,h)=>{const b=String(u??"");return b.length>h?`${b.slice(0,h)}…`:b},m=e.map((u,h)=>{const b=Array.isArray(u.inputs)?u.inputs:[];return`<details class="mp-trace-step"${h===0?" open":""}>
        <summary><span class="mp-trace-no">${h+1}</span><span class="mp-trace-field">${a(u.field)}</span><span class="mp-trace-res">${a(d(u.result,44))}</span></summary>
        <div class="mp-trace-detail">
          <div class="mp-trace-rule"><b>规则</b>${a(u.rule)}</div>
          ${b.length?`<dl class="mp-trace-inputs">${b.map(C=>`<dt>${a(C.label)}</dt><dd>${a(C.value)}</dd>`).join("")}</dl>`:""}
          <div class="mp-trace-result"><b>结果</b>${a(u.result)}</div>
          ${u.source?`<div class="mp-trace-src"><b>出处</b>${a(u.source)}</div>`:""}
        </div>
      </details>`}).join("");return`<button type="button" class="mp-trace-card" data-trace-open aria-haspopup="dialog" aria-controls="mp-trace-layer">
        <span class="mp-trace-title">推导链</span><span class="mp-trace-flow">${a(o)}</span><span class="mp-trace-count">${e.length} 层 · 查看</span>
      </button>
      <div class="mp-trace-layer" id="mp-trace-layer" data-trace-layer aria-hidden="true">
        <div class="mp-trace-back" data-trace-close></div>
        <aside class="mp-trace-drawer" role="dialog" aria-modal="true" aria-labelledby="mp-trace-title">
          <div class="mp-trace-head">
            <div><b id="mp-trace-title">推导链 · ${a(l)}</b><span>${e.length} 层 · 每层给出规则、输入、结果与出处；只读，不重算</span></div>
            ${c?'<button type="button" class="mp-trace-copy" data-trace-copy aria-label="复制整条推导链的 Markdown">复制 Markdown</button>':""}
            <button type="button" class="mp-trace-close" data-trace-close aria-label="关闭推导链">✕</button>
          </div>
          <div class="mp-trace-body">${m}</div>
          ${c?`<textarea class="mp-trace-md" data-trace-md readonly hidden>${a(c)}</textarea>`:""}
        </aside>
      </div>`},s.almanacHTML=function(e){if(!e||!e.meta)return s.quickHTML(e);const i=e.ganzhi||{},r=e.dayGod||null,l=(T,j)=>(T||[]).map(_=>`<span class="mp-al-chip${j?` ${j}`:""}">${a(_)}</span>`).join(""),o=(T,j)=>j?`<div class="mp-al-cell"><em>${a(T)}</em><b>${a(j)}</b></div>`:"",c=e.xiu?`${e.xiu.name}宿（${e.xiu.luck}·${e.xiu.zheng}·${e.xiu.animal}）`:"",d=e.nayin&&e.nayin.day?e.nayin.day.name:"",m=e.chong?`${e.chong.text}${e.chong.sha?` ${e.chong.sha}`:""}`:"",u=(e.hours||[]).map(T=>`<span class="mp-al-hour ${T.luck==="吉"?"good":"bad"}"><i>${a(T.zhi)}</i><em>${a((T.ganZhi||"").slice(0,1))}</em><b>${a(T.shen||"")}</b><u>${a(T.luck||"")}</u></span>`).join(""),h=e.positions||{},b=(T,j)=>j?`<span class="mp-al-chip">${a(T)}·${a(typeof j=="string"?j:j.dir||"")}</span>`:"",C=e.lucky||{},q=r?`<span class="mp-al-badge ${r.luck==="吉"?"good":"bad"}">${a(r.name)}·${a(r.type)}·${a(r.luck)}</span>`:"";return`<section class="mp-al" aria-label="黄历">
      <div class="mp-al-h"><b>${a(e.meta.date||"")}</b><i>${a(e.meta.weekday||"")}　${a((e.lunar||{}).text||"")}</i></div>
      <div class="mp-al-gz">${a(i.year||"")}年　${a(i.month||"")}月　${a(i.day||"")}日　属${a(i.shengXiao||"")}　建除 ${a(e.zhiXing||"")}日　${q}</div>
      <div class="mp-al-yiji">
        <div class="mp-al-col"><em>宜</em><div class="mp-al-chips">${l(e.yi)}</div></div>
        <div class="mp-al-col"><em>忌</em><div class="mp-al-chips">${l(e.ji)}</div></div>
      </div>
      <div class="mp-al-grid">${o("二十八宿",c)}${o("日柱纳音",d)}${o("胎神",e.taiShen)}${o("冲煞",m)}</div>
      <div class="mp-al-row"><em>吉神方位</em><div class="mp-al-chips">${b("喜神",h.xiShen)}${b("财神",h.caiShen)}${b("福神",h.fuShen)}${b("阳贵",h.yangGui)}${b("阴贵",h.yinGui)}</div></div>
      <div class="mp-al-row"><em>时刻吉凶</em><div class="mp-al-hours">${u}</div></div>
      <div class="mp-al-row"><em>吉配生肖</em><div class="mp-al-chips">${C.liuhe?`<span class="mp-al-chip">六合·${a(C.liuhe)}</span>`:""}${l(C.sanhe||[])}</div></div>
      ${e.dailyHexagram?`<div class="mp-al-hex">每日一卦：<b>${a(e.dailyHexagram.name)}</b>　${a(e.dailyHexagram.meaning||"")}</div>`:""}
      <div class="mp-al-note">${a(e.meta&&e.meta.scope||"")}</div>
    </section>`},s.mbtiHTML=function(e){if(!e)return"";if(e.needAnswers&&Array.isArray(e.questions)){const o=e.questions.map(c=>`<li>${a(c.text)}</li>`).join("");return`<section class="mp-mb-paper" aria-label="十六型人格问卷">
        <div class="mp-mb-h">
          <span class="mp-mb-meta"><b>十六型人格问卷</b><i>${e.total} 题 · 每题 1 完全不像 / 5 很像我</i></span>
          <span class="mp-mb-count">填完分数再看结果</span>
        </div>
        <ol>${o}</ol>
        <div class="mp-mb-note">${a(e.note||"")}</div>
      </section>`}const i=(e.dims||[]).map(o=>{const c=Math.round((o.pct||0)*100),d=o.picked===o.left,m=Math.max(2,c),u=d?o.leftSay:o.rightSay;return`<div class="mp-mb-dim">
        <div class="mp-mb-dh"><b class="${d?"on":""}">${a(o.left)}</b><em>${a(o.name)}</em><b class="${d?"":"on"}">${a(o.right)}</b></div>
        <div class="mp-mb-bar ${d?"l":"r"}"><em style="width:${m}%"></em></div>
        <div class="mp-mb-df">取 ${a(o.picked)} · ${a(o.strength)} ${c}%</div>
        <div class="mp-mb-ds">${a(u)}</div>
      </div>`}).join(""),r=e.profile||{},l=(r.stack||[]).map((o,c)=>`<span class="${c===0?"lead":""}"><b>${a(o.code)}</b>${a(o.say)}</span>`).join("");return`<section class="mp-mb" aria-label="十六型人格结果">
      <div class="mp-mb-h">
        <span class="mp-mb-code">${a(e.type||"")}</span>
        <span class="mp-mb-meta"><b>${a(r.title||"")}</b><i>${a(r.keywords||"")}</i></span>
        <span class="mp-mb-count">已答 ${e.answered||0}/${e.total||0} 题</span>
      </div>
      <div class="mp-mb-body">
        <div class="mp-mb-dims">${i}</div>
        <div class="mp-mb-sec"><em>一句</em>${a(r.oneLine||"")}</div>
        <div class="mp-mb-two">
          <div><b>优势</b>${(r.strengths||[]).map(o=>a(o)).join("；")}</div>
          <div><b>留意</b>${(r.blindspots||[]).map(o=>a(o)).join("；")}</div>
        </div>
        ${l?`<div class="mp-mb-sec"><em>认知功能</em>主导 ${a((r.stack[0]||{}).code||"")} → 依次展开</div><div class="mp-mb-fn">${l}</div>`:""}
        <div class="mp-mb-sec"><em>工作</em>${a(r.work||"")}</div>
        <div class="mp-mb-sec"><em>关系</em>${a(r.love||"")}</div>
        <div class="mp-mb-sec"><em>学习</em>${a(r.study||"")}</div>
        <div class="mp-mb-sec"><em>课题</em>${a(r.growth||"")}</div>
      </div>
      <div class="mp-mb-note">${a(e.note||"")}</div>
    </section>`};const lt=[["巽","离","坤"],["震","中","兑"],["艮","坎","乾"]],ia={坎:"正北",艮:"东北",震:"正东",巽:"东南",离:"正南",坤:"西南",兑:"正西",乾:"西北",中:"中宫"},At=["生气","延年","天医","伏位"],Ne=(e,i)=>`<span class="mp-fs-chip${i?" "+i:""}">${a(e)}</span>`,Te=(e,i,r)=>`<div class="mp-fs-cell${e==="中"?" center":""}"><div class="mp-fs-top"><span class="mp-fs-gua">${a(e)}</span><span class="mp-fs-dir">${a(ia[e]||"")}</span>${i||""}</div>`+(r||"")+"</div>",Ct=e=>e.length?`<dl class="mp-fs-facts">${e.map(([i,r])=>`<div class="mp-fs-row"><dt>${a(i)}</dt><dd>${a(r)}</dd></div>`).join("")}</dl>`:"",Be=(e,i,r,l,o,c)=>`<section class="mp-quick mp-fs" aria-label="风水结果"><div class="mp-quick-h"><b>${a(e)}</b>${i?`<span class="mp-fs-sub">${a(i)}</span>`:""}</div>`+(r.length?`<div class="mp-fs-chips">${r.join("")}</div>`:"")+l+o+c.filter(Boolean).map(d=>`<div class="mp-fs-note">${a(d)}</div>`).join("")+"</section>",Gt=(e,i)=>`<div class="mp-fs-grid" role="group" aria-label="${a(i)}">`+lt.map(r=>r.map(l=>{const o=e.find(m=>m&&m.palace===l);if(!o)return Te(l,"","");const c=At.includes(o.star),d=`<span class="mp-fs-star"${o.role?` title="${a(o.role)}"`:""}>${a(o.star)}<em class="${c?"ok":"bad"}">${c?"吉":"凶"}</em></span>`;return Te(l,d,"")}).join("")).join("")+"</div>";function Ge(e,i){const r=i.period,l={};for(const q of e.palaces||[])l[q.palace]=q;const o=`<div class="mp-fs-key">每宫依次为 <b>运</b>／<b>山</b>／<b>向</b> 三星；底色高亮＝当运（${a(r)}运）</div><div class="mp-fs-grid" role="group" aria-label="玄空九宫（运/山/向）">`+lt.map(q=>q.map(T=>{const j=l[T];if(!j)return Te(T,"","");const _=[["运",j.yun],["山",j.shan],["向",j.xiang]].map(([X,H])=>`<span class="${H===r?"on":""}" title="${a(X)}星 ${a(H)}">${a(H)}</span>`).join("");return Te(T,"",`<div class="mp-fs-nums">${_}</div>`)}).join("")).join("")+"</div>",c=e.wangShanWangXiang||{},d=i.jianXiang||{},m=e.timeFlying||null,u=[Ne(d.active?`兼${d.jian} ${d.offset}° · 替卦`:"正向 · 下卦",d.active?"ok":""),Ne(`山盘 ${i.shanCenter.star}${i.shanCenter.name} · ${i.shanCenter.fly}`),Ne(`向盘 ${i.xiangCenter.star}${i.xiangCenter.name} · ${i.xiangCenter.fly}`),Ne(c.byChart?"盘面：到山到向":"盘面：未到山到向",c.byChart?"ok":""),Ne(c.byTable===null?"表法：替卦不套":c.byTable?"表法：在列":"表法：未列",c.byTable?"ok":"")],h=(q,T)=>`${T} ${q.star}${q.name}（${q.fly}，${q.basis}${q.mode==="替卦"?`；原运星 ${q.original}${q.replaced?"，已替":"，用替而未替"}`:""}）`,b=m?[["year","年"],["month","月"],["day","日"],["hour","时"]].filter(([q])=>m[q]).map(([q,T])=>`${T}${m[q].centerName}（${m[q].fly}）`).join("　"):"",C=Ct([...d.active?[["替卦",`${d.note}${c.byTable===null?" 正向旺山旺向表不适用于替卦。":""}`]]:[],["入中",`${h(i.shanCenter,"山盘")}；${h(i.xiangCenter,"向盘")}`],["当运",`山星${r}落 ${e.dangYun.shan.text}；向星${r}落 ${e.dangYun.xiang.text}`],["合十",`山星：${(e.heshi.shan||[]).join("、")||"无"}；向星：${(e.heshi.xiang||[]).join("、")||"无"}`],["表法",`${c.note||""}${(c.table||[]).length?` 本运所列：${c.table.join("、")}。`:" 本运表法无局。"}`],...b?[["年月日时",`${b}${m.meta&&m.meta.note?`　${m.meta.note}`:""}`]]:[]]);return Be(d.active?"玄空替卦":"玄空下卦",`${i.periodLabel} · 坐${i.sitting} · 向${i.facing}`,u,o,C,[i.note,e.disclaimer])}function Zt(e,i){const r=e.mingGua||{},l=Gt([...e.luckyDirections||[],...e.unluckyDirections||[]],"八宅八向（吉凶）"),o=[Ne(r.compatible||"—"),Ne(`${i.gender}命 · ${i.guaYear} 年立春界`)],c=[];if(e.yearlyFlying){const d=e.yearlyFlying;c.push(["年紫白",`${d.centerName}入中；${d.palaces.filter(m=>m.palace!=="中").map(m=>`${m.palace}${m.name}`).join("、")}`])}return Be("八宅命卦",`${r.num}${r.gua}（${r.group}）· ${r.direction}`,o,l,Ct(c),[i.note,e.disclaimer])}function dt(e,i){const r=e.layout||{},l=Gt(e.houseStars||[],"宅卦八向（吉凶）"),o=[Ne(`${i.houseGua}宅 · ${i.houseGroup}`),Ne(`坐${i.sitting}`),Ne(`向${i.facing}`)],c=[["门",r.door],["灶",r.stove],["床",r.bed],["厕",r.toilet]];return e.mingMatch&&c.push(["命宅配",e.mingMatch.text]),Be("门主灶",`${i.houseGua}宅 · 坐${i.sitting} · 向${i.facing}`,o,l,Ct(c),[i.birthNote,e.disclaimer])}s.fengshuiHTML=function(e){if(!e||e.system!=="fengshui")return s.quickHTML(e);const i=e.meta||{};return i.action==="xuankong"?Ge(e,i):i.action==="advise"?dt(e,i):Zt(e,i)},s.perfHTML=function(e){if(!e)return"";const i=m=>typeof m=="number"&&isFinite(m)?`${Math.max(0,Math.round(m))}ms`:"",r=e.cached===!0?"（已缓存）":e.cached===!1?"（首次加载）":"",l=[];i(e.engineMs)&&l.push(`引擎 ${i(e.engineMs)}${r}`),i(e.computeMs)&&l.push(`排盘 ${i(e.computeMs)}`),i(e.renderMs)&&l.push(`渲染 ${i(e.renderMs)}`);const o=i(e.totalMs);if(!l.length&&!o)return"";const c=o?`首屏 ${o}`:"耗时";return`<div class="mp-perf" title="本机这一次的实测耗时，不含网络与服务端；换机器、首次加载与已缓存会不同">${l.length?`${c}｜${l.join(" · ")}`:c}</div>`},s.zeriHTML=function(e){if(!e||!e.compare||e.compare.mode!=="candidates"||!Array.isArray(e.days))return s.quickHTML(e);const i=e.meta||{},r=e.shenshaRef||{},l=e.compare.best?e.compare.best.date:"",o=e.days.map(m=>{const u=m.date===l,h=m.excluded||m.verdict==="回避"?"bad":m.verdict==="推荐"?"good":"",b=m.grade||{},C=b.label?`<b>${a(b.label)}</b><em>吉${a(b.ji)} / 凶${a(b.xiong)}　${a(b.decision||"")}</em>`:"—";return`<tr class="mp-zr-row${u?" top":""}${m.excluded?" off":""}">
        <th scope="row"><b>${a(m.date)}</b>${u?'<i class="mp-zr-best">最优</i>':""}
          <em>${a(m.weekday)}　${a(m.lunar)}</em></th>
        <td><b>${a(m.dayGanZhi)}</b><em>${a(m.zhiXing)}日</em></td>
        <td class="mp-zr-score">${a(m.score)}</td>
        <td class="mp-zr-grade">${C}</td>
        <td><span class="mp-zr-v ${h}">${a(m.verdict)}</span></td>
        <td class="mp-zr-why">${a(m.reasons.join("；")||"无特别加减分")}</td>
      </tr>`}).join(""),c=(m,u)=>`<span><em>${a(m)}</em>${u.length?a(u.join("、")):"无"}</span>`,d=e.compare.best?`这一组最优：<b>${a(e.compare.best.date)}</b>（${a(e.compare.best.score)} 分 · ${a(e.compare.best.verdict)}）`+(e.compare.best.ties.length>1?`；同分 ${a(e.compare.best.ties.filter(m=>m!==e.compare.best.date).join("、"))}`:""):"这一组都因冲属相被排除，没有可用的日子";return`<section class="mp-zr" aria-label="择日候选比较">
      <div class="mp-zr-h"><b>择日 · ${a(i.task||"")}</b>
        <span>候选 ${a(i.days)} 天${i.shengXiao?`　当事人属${a(i.shengXiao)}`:"（未给属相，未做冲煞排除）"}</span></div>
      <div class="mp-zr-lead">${d}</div>
      <table class="mp-zr-t"><thead><tr>
        <th scope="col">日期</th><th scope="col">日干支 / 建除</th><th scope="col">分</th><th scope="col">卷十等第</th><th scope="col">结论</th><th scope="col">理由</th>
      </tr></thead><tbody>${o}</tbody></table>
      <div class="mp-zr-lists">
        ${c("推荐",e.best)}${c("可用",e.usable)}${c("回避",e.avoid)}
      </div>
      <p class="mp-zr-note">${a(e.compare.note||"")}</p>
      ${r.text?`<p class="mp-zr-note">神煞依据：${a(r.text)}（${a(r.edition||"")}）；起法 ${a((r.volumes||[]).join("、"))}。未实现起法：${a((r.unsupported||[]).join("、"))}（不计分）。</p>`:""}
      ${r.juan10?`<p class="mp-zr-note">卷十依据：${a(r.juan10.text)}（${a(r.juan10.corpusLines||"")}）；${a(r.juan10.thresholdsNote||"")}${a(r.juan10.note||"")}</p>`:""}
      <p class="mp-zr-note">${a(i.scope||"")}</p>
      <p class="mp-zr-note">${a(e.disclaimer||"")}</p>
    </section>`},s.quickHTML=function(e){if(!e)return"";const r={almanac:"黄历",zeri:"择日",chenggu:"称骨",xiaoliuren:"小六壬",star:"星座",numerology:"生命数字",trend:"人生 K 线",fengshui:"风水",name:"起名",convert:"公农历转换",mbti:"十六型人格"}[e.system]||"速查",l=e.summary||"",o=l?`<pre class="mp-quick-pre">${a(l)}</pre>`:"";return`<section class="mp-quick" aria-label="${a(r)}结果">
      <div class="mp-quick-h"><b>${a(r)}</b></div>
      ${o}
    </section>`},s.summaryCardPNG=function(e,i){try{if(typeof document>"u"||!document.createElement)return"";const r=i&&i.outline||[],l=(i&&i.tables||[]).filter(te=>Array.isArray(te.rows)&&te.rows.length),o=i&&i.systemLabel||e&&e.system||"命理报告",c=900,d=44,m=26,u=(te,D)=>`${D?"600 ":""}${te}px "PingFang SC","Microsoft YaHei","Noto Sans CJK SC",sans-serif`,h=document.createElement("canvas"),b=h.getContext?h.getContext("2d"):null;if(!b)return"";const C=(te,D)=>{const oe=[];let $="";for(const ce of String(te)){const k=$+ce;b.measureText(k).width>D&&$?(oe.push($),$=ce):$=k}return $&&oe.push($),oe.length?oe:[""]};b.font=u(15);let q=0;const T=r.map(te=>{const D=C(te.text,c-d*2-70);return q+=Math.min(D.length,2)*m+10,{o:te,lines:D.slice(0,2)}}),j=l[0]||null,_=j?j.rows.slice(0,6):[],X=j?54+_.length*34:0,H=150+q+(T.length?34:0)+X+120;h.width=c,h.height=H,b.fillStyle="rgb(255,255,255)",b.fillRect(0,0,c,H),b.fillStyle="rgb(31,111,63)",b.fillRect(0,0,c,8);let w=52;b.fillStyle="rgb(27,27,27)",b.font=u(28,!0),b.fillText(`${o} · 摘要`,d,w),w+=30,b.fillStyle="rgb(111,106,96)",b.font=u(14);const z=[e&&e.input&&e.input.datetime?`出生/起局：${e.input.datetime}`:"","本地计算 · 可复现"].filter(Boolean).join("　");if(b.fillText(z,d,w),w+=34,T.length){b.fillStyle="rgb(31,111,63)",b.font=u(16,!0),b.fillText("一页读懂",d,w),w+=26;for(const{o:te,lines:D}of T)b.fillStyle="rgb(138,131,120)",b.font=u(14,!0),b.fillText(te.label,d,w),b.fillStyle="rgb(63,58,51)",b.font=u(15),D.forEach((oe,$)=>b.fillText(oe,d+70,w+$*m)),w+=D.length*m+10;w+=8}if(j){b.fillStyle="rgb(31,111,63)",b.font=u(16,!0),b.fillText(j.title,d,w),w+=24,b.fillStyle="rgb(138,131,120)",b.font=u(13),b.fillText(j.columns.join(" · "),d,w),w+=8,b.strokeStyle="rgb(229,225,216)",b.beginPath(),b.moveTo(d,w),b.lineTo(c-d,w),b.stroke(),w+=22,b.fillStyle="rgb(63,58,51)",b.font=u(14);for(const te of _){const D=te.filter(Boolean).join(" · "),oe=C(D,c-d*2)[0];b.fillText(oe,d,w),w+=34}}return w=H-62,b.strokeStyle="rgb(229,225,216)",b.beginPath(),b.moveTo(d,w-18),b.lineTo(c-d,w-18),b.stroke(),b.fillStyle="rgb(138,131,120)",b.font=u(12),b.fillText("内容用于传统文化学习与自我探索，不构成医疗、投资、法律或人事决策依据。",d,w+6),b.fillText("dsh-metaphysics · 本机计算，未上传任何数据",d,w+26),h.toDataURL?h.toDataURL("image/png"):""}catch{return""}}})();const Oa="dsh-metaphysics/history-v1";function Oi(){try{const n=window.localStorage&&window.localStorage.getItem(Oa),s=n?JSON.parse(n):[];return Array.isArray(s)?s.filter(S=>S&&typeof S=="object"&&typeof S.kind=="string").slice(0,20):[]}catch{return[]}}function Fa(n){try{window.localStorage&&window.localStorage.setItem(Oa,JSON.stringify(n.slice(0,20)))}catch{}}const Fi=(n,s)=>n.kind===s.kind&&n.date===s.date&&n.time===s.time&&n.gender===s.gender&&!!n.hourUnknown==!!s.hourUnknown&&n.trueSolar!==!1==(s.trueSolar!==!1)&&n.lateZi!==!1==(s.lateZi!==!1)&&n.address===s.address&&n.lines===s.lines&&n.question===s.question&&n.mhMode===s.mhMode&&n.upper===s.upper&&n.lower===s.lower&&n.direction===s.direction&&n.count===s.count&&n.changing===s.changing&&(n.kind!=="qimen"||n.qimenRule===s.qimenRule&&n.qLateZi===s.qLateZi)&&(n.kind!=="zeri"||n.task===s.task&&n.days===s.days&&n.shengXiao===s.shengXiao&&n.zCand===s.zCand)&&(n.kind!=="xiaoliuren"||n.xlrMode===s.xlrMode&&n.num1===s.num1&&n.num2===s.num2&&n.num3===s.num3)&&(n.kind!=="trend"||n.toAge===s.toAge)&&(n.kind!=="fengshui"||n.fsMode===s.fsMode&&n.fsPeriod===s.fsPeriod&&n.sitting===s.sitting&&n.facing===s.facing)&&(n.kind!=="name"||n.nnMode===s.nnMode&&n.surname===s.surname&&n.givenName===s.givenName&&n.limitN===s.limitN)&&(n.kind!=="convert"||n.convMode===s.convMode&&n.lunarDate===s.lunarDate&&!!n.leapMonth==!!s.leapMonth)&&(n.kind!=="hepan"||n.hpChart===s.hpChart&&n.partnerDate===s.partnerDate&&n.partnerTime===s.partnerTime&&n.partnerGender===s.partnerGender&&n.partnerAddress===s.partnerAddress&&!!n.thirdOn==!!s.thirdOn&&n.p2Date===s.p2Date&&n.p2Time===s.p2Time&&n.p2Gender===s.p2Gender&&n.p2Address===s.p2Address);function Di(n,s){if(n==="bazi"){const P=["year","month","day","hour"].map(V=>s.pillars&&s.pillars[V]).filter(Boolean).map(V=>V.ganzhi).join(" ");return s.hourUnknown||s.pillars&&!s.pillars.hour?`${P}（时柱暂缺）`:P}return n==="ziwei"?`${s.soul?s.soul.branch:""}宫 ${s.bureau?s.bureau.name:""} ${s.lunar?s.lunar.year+"年":""}`.trim():n==="liuyao"?s.ben&&s.ben.name?s.ben.name:"":n==="meihua"?s.ben&&s.ben.name?`${s.ben.name} 动${s.moving}`:"":n==="daliuren"?`${s.dayGanZhi||""} ${s.geJu?s.geJu.name:""}`:""}const G=window.__PP,Et=()=>typeof performance<"u"&&performance.now?performance.now():Date.now();let De=0;const ha=typeof window.__mpEnsureEngine=="function"?window.__mpEnsureEngine:async()=>window.Engine,Pi=`
/* 整个侧栏面板铺宣纸：暖白渐变为底 + feTurbulence 纤维噪点平铺。
   background-attachment:local 让纹理跟着滚动内容走，长页面不会下半截露白。
   噪点用 colorMatrix 压到很低的 alpha（0.09），只做纸感不糊字。 */
.mp-wrap{height:100%;width:100%;box-sizing:border-box;overflow:auto;padding:20px 24px 40px;color:var(--dsw-alias-label-primary);font-size:14px;container-type:inline-size;
  background-color:#f5f1e8;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='w'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='2' seed='7'/%3E%3CfeColorMatrix values='0 0 0 0 0.28 0 0 0 0 0.25 0 0 0 0 0.20 0 0 0 0.09 0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23w)'/%3E%3C/svg%3E"),linear-gradient(180deg,#f8f5ee,#f1ede3);
  background-attachment:local,local}
/* 暗色主题：纸换成墨底，纹理改浅色纤维，别把整侧栏刷成白纸 */
@media screen and (prefers-color-scheme:dark){
  .mp-wrap{background-color:#171714;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='w'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='2' seed='7'/%3E%3CfeColorMatrix values='0 0 0 0 0.82 0 0 0 0 0.80 0 0 0 0 0.75 0 0 0 0.07 0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23w)'/%3E%3C/svg%3E"),linear-gradient(180deg,#1c1b18,#141311)}
}
/* 内容统一收在同一列居中，避免宽屏下输入框拉成一条 */
.mp-wrap>*{max-width:940px;margin-left:auto;margin-right:auto}
/* ── 表单卡片：等宽栅格，问题独占一行，按钮落在右下 ── */
.mp-panel{position:relative;background:
  linear-gradient(180deg,#f7f4ec,color-mix(in srgb,#f2eee4 88%,#ece7da));border:1px solid #d8d2c2;border-radius:16px;padding:18px 20px 16px;margin-bottom:16px;
  box-shadow:0 1px 2px color-mix(in srgb,var(--dsw-alias-label-primary) 5%,transparent),0 16px 34px -30px color-mix(in srgb,var(--dsw-alias-label-primary) 45%,transparent)}
.mp-panel>*{position:relative;z-index:1}
@media screen and (prefers-color-scheme:dark){.mp-panel{background:linear-gradient(180deg,#1c1b18,#24221d);border-color:#4a453a}}
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
.mp-tgroup{padding:12px 12px 10px;border:1px solid #ded7c7;border-radius:14px;
  background:linear-gradient(180deg,rgba(253,251,246,.82),rgba(247,243,234,.72));
  box-shadow:0 1px 2px color-mix(in srgb,var(--dsw-alias-label-primary) 5%,transparent)}
@media screen and (prefers-color-scheme:dark){.mp-tgroup{border-color:#4a453a;background:linear-gradient(180deg,rgba(38,37,32,.82),rgba(30,29,25,.72))}}
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
`,{useState:M,useEffect:vt,useRef:Ri}=Lt,Da=n=>String(n).padStart(2,"0");function Ii(n){const s=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(n||""));if(!s)return!1;const S=Number(s[1]),P=Number(s[2]),V=Number(s[3]);if(P<1||P>12||V<1)return!1;const ae=[31,S%4===0&&S%100!==0||S%400===0?29:28,31,30,31,30,31,31,30,31,30,31];return V<=ae[P-1]}function Pa(n){const s=/^(\d{4})\s*[年./-]\s*(\d{1,2})\s*[月./-]\s*(\d{1,2})\s*日?$/.exec(String(n||"").trim());if(!s)return"";const S=`${s[1]}-${Da(s[2])}-${Da(s[3])}`;return Ii(S)?S:""}function Bi(n){const s=String(n||"").trim();if(/^\d{0,4}(-\d{0,2}){0,2}$/.test(s))return s;if(/[年月日/.]/.test(s)){const P=Pa(s);if(P)return P}const S=s.replace(/\D/g,"").slice(0,8);return S.length<=4?S:S.length<=6?`${S.slice(0,4)}-${S.slice(4)}`:`${S.slice(0,4)}-${S.slice(4,6)}-${S.slice(6)}`}function xa(n){const s=n.value||"",[S,P]=M(s),V=Ri(s);vt(()=>{V.current=s,P(s)},[s]);const ee=()=>{const ae=S.trim();if(!ae){P(V.current),n.onInvalid&&n.onInvalid("");return}const se=Pa(ae);if(se){V.current=se,P(se),se!==s&&n.onChange(se);return}P(V.current),n.onInvalid&&n.onInvalid(ae)};return p("input",{className:"mp-input",type:"text",inputMode:"numeric",autoComplete:"off",placeholder:"年-月-日，如 1990-05-12",value:S,onChange:ae=>{P(Bi(ae.target.value))},onBlur:ee,onKeyDown:ae=>{ae.key==="Enter"&&(ae.preventDefault(),ee())}})}const Jt=4,Ye=12;let Qt=null;function ea(){if(Qt)return Qt;let n=null;try{n=K.compute({system:"mbti"})}catch{n=null}const s=n&&n.questions||[];return s.length?(Qt={total:n&&n.total||s.length,questions:s,scale:n&&n.scale||{}},Qt):{total:0,questions:[],scale:{}}}function Gi(n){const{answers:s,page:S,onPick:P,onPage:V,onSubmit:ee,onClear:ae}=n,se=ea(),a=Math.max(1,Math.ceil(se.total/Jt)),ge=S*Jt,ze=se.questions.slice(ge,ge+Jt),F=s.filter(Z=>Z!=null).length,fe=se.total?Math.round(F/se.total*100):0,he=S>=a-1,B=F>=Ye;return p("div",{className:"mp-quiz"},p("div",{className:"mp-quiz-top"},p("div",{className:"mp-quiz-bar","aria-hidden":"true"},p("i",{style:{width:fe+"%"}})),p("span",{className:"mp-quiz-count"},`第 ${S+1} / ${a} 页 · 已答 ${F} / ${se.total}`)),p("div",{className:"mp-quiz-list"},ze.map((Z,R)=>{const Y=ge+R;return p("div",{key:Z.id||Y,className:"mp-quiz-q"},p("div",{className:"mp-quiz-qt"},p("b",null,String(Y+1).padStart(2,"0")),p("span",null,Z.text)),p("div",{className:"mp-quiz-opts",role:"radiogroup","aria-label":`第 ${Y+1} 题`},[1,2,3,4,5].map(ve=>p("label",{key:ve,className:"mp-quiz-o"+(s[Y]===ve?" on":"")},p("input",{type:"radio",name:`mpmbq${Y}`,value:String(ve),checked:s[Y]===ve,onChange:()=>P(Y,ve)}),p("b",null,String(ve)),p("span",null,se.scale[ve]||"")))))})),p("div",{className:"mp-quiz-nav"},p("button",{className:"mp-quiz-btn",disabled:S<=0,onClick:()=>V(-1)},"上一页"),he?null:p("button",{className:"mp-quiz-btn",onClick:()=>V(1)},"下一页"),p("button",{className:"mp-quiz-btn primary",disabled:!B,onClick:ee},"看结果"),p("button",{className:"mp-quiz-btn",onClick:ae},"清空"),p("span",{className:"mp-quiz-hint"},B?`已够 ${Ye} 题，可以看结果；答完 ${se.total} 题会更准。`:`答满 ${Ye} 题可先看结果（还差 ${Ye-F} 题）。`)))}class Zi extends(Lt.Component||Object){constructor(s){super(s),this.state={err:null}}static getDerivedStateFromError(s){return{err:s}}componentDidCatch(s,S){console.error("[metaphysics] 面板渲染异常",s,S)}render(){if(!this.state.err)return this.props.children;const s=this.state.err,S=String(s&&s.stack||"").split(`
`).slice(0,14).join(`
`);return p("div",{className:"mp-wrap"},p("div",{className:"mp-panel"},p("div",{className:"mp-lbl"},"命理面板渲染出错——把下面这段发给我"),p("pre",{style:{whiteSpace:"pre-wrap",fontSize:12,lineHeight:1.5,maxHeight:320,overflow:"auto",margin:"8px 0"}},String(s&&s.message||s)+`

`+S),p("div",{className:"mp-lbl"},"环境：__PP "+typeof G+" · Engine "+typeof window.Engine+" · React "+typeof Lt+" · 版本 "+(typeof G=="object"&&G&&(window.__MP_VER||"?"))+((window.__MP_UNRELEASED||[]).length?" · 未发版改动 "+window.__MP_UNRELEASED.length+" 项":""))))}}function Ui(n){const s=n&&n.size?n.size:20,S=n&&n.active;return p("svg",{width:s,height:s,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.6,strokeLinecap:"round","aria-hidden":!0,style:{opacity:S?1:.72}},p("circle",{cx:12,cy:12,r:8.2}),p("path",{d:"M12 3.8a4.1 4.1 0 0 1 0 8.2 4.1 4.1 0 0 0 0 8.2"}),p("circle",{cx:12,cy:8,r:1.1,fill:"currentColor",stroke:"none"}),p("circle",{cx:12,cy:16,r:1.1,fill:"currentColor",stroke:"none"}))}const He=[{k:"ziwei",label:"紫微",timeLabel:"出生时刻",hint:"紫微斗数需要出生日期、时刻与性别；出生地只影响真太阳时修正。"},{k:"bazi",label:"八字",timeLabel:"出生时刻",hint:"四柱八字按节气与真太阳时定时柱，出生地越准，时柱越稳。"},{k:"liuyao",label:"六爻",timeLabel:"起卦时刻",hint:"六爻不需要出生时间：只用起卦当下的日辰定六神、月建定旺衰，卦由摇出。"},{k:"meihua",label:"梅花",timeLabel:"起卦时刻",hint:"梅花用起卦时刻的年月日时数成卦，也可直接给两个数字起卦；与出生时间无关。"},{k:"daliuren",label:"六壬",timeLabel:"起卦时刻",hint:"大六壬用起卦时刻的日干支、时支与月将起天地盘；同样与出生时间无关。"},{k:"qimen",label:"奇门",timeLabel:"起局时刻",hint:"奇门时家转盘：用起局时刻定节气、三元与局数；换局规则决定符头与节气如何对齐。"},{k:"hepan",label:"合盘",timeLabel:"你的出生时刻",hint:"合盘按「日主 + 夫妻宫 + 五行互补」看两个人的相处与互补，需要双方出生信息。"},{k:"tarot",label:"塔罗",timeLabel:"",hint:"塔罗不看时间，只记录抽牌时刻与你的提问。"},{k:"almanac",label:"黄历",timeLabel:"",hint:"黄历按公历日期查农历、干支、宜忌、时辰吉凶、二十八宿与吉神方位；只做本地计算。"},{k:"convert",label:"农历",timeLabel:"",hint:"公农历互转：公历生日可反查农历；只知道农历生日时，可转成公历再排盘。"},{k:"zeri",label:"择日",timeLabel:"",hint:"择日把区间内每天的建除宜忌与事项适配打分排序，并按属相排除冲煞日。"},{k:"chenggu",label:"称骨",timeLabel:"出生时刻",hint:"称骨按农历年、月、日、时的骨重求和；时辰必填。"},{k:"xiaoliuren",label:"小六壬",timeLabel:"起课时刻",hint:"小六壬用农历月/日/时掐指，也可用三个随机数起课。"},{k:"star",label:"星座",timeLabel:"",hint:"星座按公历日期给出太阳星座与当日基调；同日同星座结果固定。"},{k:"numerology",label:"生命数字",timeLabel:"",hint:"生命数字按公历生日归约出生命路径数、生日数与态度数。"},{k:"mbti",label:"人格",timeLabel:"",hint:"十六型人格是 24 道自我报告题的 MBTI 风格测算：4 题一页，按 1–5 打分，答满 12 题即可看结果；只作自我参照，不是官方量表。"},{k:"trend",label:"人生K线",timeLabel:"出生时刻",hint:"人生 K 线按大运与流年十神给逐年运势分，画成走势图。"},{k:"fengshui",label:"风水",timeLabel:"",hint:"风水看八宅命卦、大游年四吉四凶与流年九宫飞星；也可按坐向看门主灶倾向，或按运与坐向排玄空下卦盘。"},{k:"name",label:"起名",timeLabel:"",hint:"起名按八字喜用匹配字库五行，可评估现有名字或生成候选名。"}];function yt(n){return String(n).padStart(2,"0")}const ba=["almanac","convert","zeri","chenggu","xiaoliuren","star","numerology","trend","fengshui","name"],Ki=Array.isArray(window.__MPGroups)?window.__MPGroups:[],Ra="mp.recent.tabs",Ia="mp.first.view",Ba=3;function Ga(n){try{return JSON.parse(window.localStorage.getItem(n)||"null")}catch{return null}}function Za(n,s){try{window.localStorage.setItem(n,JSON.stringify(s))}catch{}}function Yi(n){const s=new Date(n);if(Number.isNaN(s.getTime()))return"";const S=V=>new Date(V.getFullYear(),V.getMonth(),V.getDate()).getTime(),P=Math.round((S(new Date)-S(s))/864e5);return P<=0?"今天":P===1?"昨天":`${yt(s.getMonth()+1)}-${yt(s.getDate())}`}function va(){const n=new Date;return{date:`${n.getFullYear()}-${yt(n.getMonth()+1)}-${yt(n.getDate())}`,time:`${yt(n.getHours())}:${yt(n.getMinutes())}`}}const Vi={ziwei:"birth",bazi:"birth",hepan:"birth",liuyao:"cast",meihua:"cast",daliuren:"cast",qimen:"cast",tarot:"none",almanac:"date",zeri:"date",star:"date",numerology:"date",convert:"date",chenggu:"birth",trend:"birth",fengshui:"birth",name:"birth",xiaoliuren:"cast",mbti:"none"},Ua={date:"1990-05-12",time:"14:30"},$t=n=>Vi[n]||"none",Me=window.__MPCore||{},Pe=Me.needAsk||(n=>!1),W={ref:null,seats:[],seatOk:{},seatDisposers:[],contribution:"",keys:"",injectType:"",spec:"",errs:[],regs:0,mounted:0},it={r:null,q:"",it:null};let Ve="";function Ka(){const n=[];return n.push("inputActions "+(W.ref?"已拿到":"未拿到")),n.push("渲染 "+W.mounted+" 次"),n.push("注册 "+W.regs+" 次"),n.push("inject "+(W.injectType||"?")),n.push("槽位 "+(W.spec||"?")),W.contribution&&n.push("贡献 "+W.contribution),W.errs.length&&n.push("错误："+W.errs.join(" / ")),"桥自检："+n.join("；")}function Ya(n){if(W.errs.length>=3)return;const s=n&&n.message?String(n.message):String(n);W.errs.push(s.slice(0,90))}function Xi(n){if(!n)return null;const s=n.inputActions;if(s&&typeof s.setDraft=="function"&&typeof s.submit=="function")return s;const S=n.actions&&n.actions.input;return S&&typeof S.setDraft=="function"&&typeof S.submit=="function"?S:null}function Va(n,s){const S=Xi(n);return vt(()=>{if(W.seats.indexOf(s)<0&&W.seats.push(s),W.keys=n?Object.keys(n).join(","):"",S){W.ref=S;try{window.__MPComposer=S}catch{}}return()=>{W.ref===S&&(W.ref=null)}},[S,s]),S}function Wi(){const n=it.r;if(!n)return"";try{const s=K.askPrompt?K.askPrompt(n,{question:it.q,interpret:it.it}):null;return s&&s.text||String(n.summary||"")}catch{return String(n.summary||"")}}function Xa(n){return W.mounted+=1,Va(n,"input.right")?p("button",{type:"button",className:"mp-chip ok",title:it.r?"把上一张盘的摘要和问题发进对话窗":"先在侧栏「命理」里排一张盘",onClick:()=>{const S=Wi();S&&Ja(S)}},"命理·问"):p("span",{className:"mp-chip warn",title:"命理：已占住输入框槽位，但没拿到 inputActions；把这句话告诉作者"},"命理·未就绪")}function Wa(n){return W.mounted+=1,Va(n,"composer.dock"),null}function Ja(n){let s=W.ref;if(!s)try{s=window.__MPComposer||null}catch{s=null}return!s||typeof s.setDraft!="function"||typeof s.submit!="function"?!1:(s.setDraft(n),s.submit(),!0)}function Ji(){const[n,s]=M("ziwei"),[S,P]=M("1990-05-12"),[V,ee]=M("14:30"),[ae,se]=M(!1),[a,ge]=M("female"),[ze,F]=M(""),[fe,he]=M("1992-08-15"),[B,Z]=M("10:00"),[R,Y]=M("female"),[ve,wt]=M(""),[nt,kt]=M("bazi"),[qe,_t]=M(!1),[Xe,$a]=M("1990-01-01"),[zt,jt]=M("12:00"),[Re,Ht]=M("male"),[st,Ot]=M(""),[St,Ft]=M("chaibu"),[Oe,qt]=M(!0),[ot,Nt]=M(!0),[Dt,Mt]=M("same-day"),[We,Pt]=M(!1),[Je,wa]=M(""),[Rt,Ce]=M(""),[Ie,Qe]=M(null),[It,et]=M({}),[rt,ta]=M(null),[pt,aa]=M([{year:"2019",kind:"career"},{year:"2022",kind:"love"}]),[tt,Bt]=M(null),[lt,ia]=M("开业"),[At,Ne]=M("30"),[Te,Ct]=M(""),[Be,Gt]=M(""),[Ge,Zt]=M("solar2lunar"),[dt,e]=M(""),[i,r]=M(!1),[l,o]=M("time"),[c,d]=M(""),[m,u]=M(""),[h,b]=M(""),[C,q]=M(()=>new Array(ea().total).fill(null)),[T,j]=M(0),[_,X]=M("60"),[H,w]=M("natal"),[z,te]=M("9"),[D,oe]=M("子"),[$,ce]=M("午"),[k,O]=M("assess"),[Q,$e]=M("李"),[ue,pe]=M(""),[me,Fe]=M("6"),[Ze,ct]=M(!1),[be,L]=M(""),[f,U]=M(null),[de,re]=M(""),[x,v]=M(""),[le,ie]=M(null),[ke,we]=M(()=>Oi()),[xe,mt]=M(()=>Ga(Ia)==="flat"?"flat":"group"),[ut,ka]=M(()=>{const t=Ga(Ra);return Array.isArray(t)?t:[]}),[an,nn]=M({}),[za,ei]=M(null),[ti,na]=M(()=>G.profilesLoad()),[Ut,sa]=M(null),[ai,ii]=M(""),[gt,Ue]=M(""),[ni,Ae]=M(""),[sn,oa]=M(!1),[ja,si]=M("3"),[at,Sa]=M(""),[Le,oi]=M("general");function qa(){return Je.trim()||(f&&Pe(f.kind)?String(at||"").trim():"")}vt(()=>{f&&f.r&&(it.r=f.r,it.q=qa(),it.it=f.it||null)},[f,Je,at]);const[ri,on]=M(null),[rn,ra]=M(!1),[ft,pi]=M("time"),[pa,li]=M(""),[la,di]=M(""),[da,ci]=M(""),[pn,ht]=M(""),[Na,ca]=M({birth:null,cast:null}),ln=He.find(t=>t.k===n)||He[0],Kt=n==="bazi"||n==="ziwei"||n==="hepan"||n==="chenggu"||n==="trend"||n==="fengshui"||n==="name",Ee=$t(n),mi=!(n==="meihua"&&ft==="number"),ui=n!=="tarot"&&n!=="mbti"&&mi,gi=ui&&Ee!=="date",Xn=gi,je=async(t,g,N,E)=>{const y=t||n,ne=N||ft,ye=y==="bazi"||y==="trend",Ke=E&&typeof E.hourUnknown=="boolean"?E.hourUnknown:ae,Se=g||(ye&&Ke?{date:S,time:"12:00"}:{date:S,time:V}),_e=E&&E.gender?E.gender:a,xt=E&&typeof E.address=="string"?E.address:ze,Yt=E&&typeof E.trueSolar=="boolean"?E.trueSolar:Oe,Vt=E&&typeof E.lateZi=="boolean"?E.lateZi:ot,Si=E&&typeof E.lines=="string"?E.lines:be,ua=E&&typeof E.question=="string"?E.question:at,qi=Et(),Ni=++De,Xt=()=>Ni!==De;ie(null),Ae("");try{let bt=0,Mi=null;oa(!0);try{await ha(y);const I=window.__MP_LAST_LOAD;bt=I&&typeof I.ms=="number"?I.ms:Et()-qi,Mi=I&&typeof I.cached=="boolean"?I.cached:null}catch(I){if(Xt())return;Ue(I&&I.message?I.message:String(I)),U(null);return}finally{Xt()||oa(!1)}if(Xt())return;const Ai=`${Se.date}T${Se.time}`,A={system:y};if(A.shadow=y!=="mbti",A.trace=y==="liuyao"||y==="bazi"||y==="ziwei"||y==="qimen"||y==="daliuren",y!=="tarot"&&(A.datetime=Ai),y==="bazi"||y==="ziwei"||y==="hepan"||y==="trend"){if(A.gender=_e,A.trueSolar=Yt,xt.trim()){A.address=xt.trim();try{const I=await K.geocodeAddress(A.address,{online:Ze});I&&typeof I.lon=="number"&&(A.longitude=I.lon,A.geo=I)}catch(I){console.error("[metaphysics] 地址解析失败，退回内置表",I)}if(Xt())return}(y==="bazi"||y==="ziwei")&&(A.cross=We),A.lateZi=Vt,ye&&Ke&&(A.hourUnknown=!0)}if(y==="liuyao"){const I=Me.parseLines(Si);I.lines?A.lines=I.lines:I.warning&&Ae(I.warning)}if(y==="qimen"&&(A.juMethod=St,A.lateZiHourMode=Dt,A.direction=Le),y==="bazi"&&(A.verifyPast=6),y==="zeri"){A.startDate=Se.date,A.task=lt,A.days=Number(At)||30,Te&&(A.shengXiao=Te);const I=Be.split(/[,，、\s]+/).filter(Boolean);I.length&&(A.candidates=I)}if(y==="xiaoliuren")if(A.mode=l,l==="number")A.num1=Number(c)||void 0,A.num2=Number(m)||void 0,A.num3=Number(h)||void 0;else{A.date=Se.date;const I=Number(String(Se.time).split(":")[0]);A.hour=Number.isFinite(I)?I:12}if(y==="mbti"){delete A.datetime;const I=C.slice();for(;I.length&&I[I.length-1]==null;)I.pop();I.length&&(A.answers=I)}if(y==="trend"&&ye&&Ke&&(A.hourUnknown=!0),y==="trend"&&(A.toAge=Number(_)||60),y==="fengshui"&&(A.action=H,H==="natal"?A.gender=_e:(A.sitting=D,A.facing=$,delete A.datetime,H==="xuankong"&&(A.period=Number(z)||9))),y==="name"&&(A.action=k,A.surname=Q.trim(),k==="generate"?(A.gender=_e,A.limit=Number(me)||6,A.trueSolar=Yt,A.lateZi=Vt):(A.givenName=ue.trim(),(!Se.date||!Se.time)&&delete A.datetime)),y==="convert")if(A.system="convert",Ge==="lunar2solar"){const I=/^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(dt).trim());if(!I){Ue("农历转公历请按「农历年-月-日」填写，例如 2026-9-17；闰月单独勾选。");return}A.mode="lunar2solar",A.lunarYear=Number(I[1]),A.lunarMonth=Number(I[2]),A.lunarDay=Number(I[3]),A.isLeapMonth=i,delete A.datetime}else A.mode="solar2lunar";if(y==="tarot"&&(A.count=Number(ja)),y==="hepan"&&(A.chart=nt,A.partner={datetime:`${fe}T${B}`,gender:R,address:ve.trim()||void 0,trueSolar:Oe},qe&&(A.partner2={datetime:`${Xe}T${zt}`,gender:Re,address:st.trim()||void 0,trueSolar:Oe})),Pe(y)){if(!ua.trim()){Ue("请先填写「所问之事」——一句话即可，例如：今年是否适合换工作？"),ra(!0),U(null);return}ra(!1),A.question=ua.trim(),y==="liuyao"&&(A.direction=Le)}if(y==="meihua"&&(A.mode=ne,ne==="number")){if(pa.trim()===""||la.trim()===""){Ue("数字起卦需要填两个数（第一个数定上卦、第二个数定下卦）。"),U(null);return}if(A.upper=Number(pa),A.lower=Number(la),!Number.isFinite(A.upper)||!Number.isFinite(A.lower)){Ue("两个数都要是数字，例如 17 和 29。"),U(null);return}da!==""&&(A.changing=Number(da))}const Gn=Et();y==="trend"&&!A.asOf&&Me.todayStamp&&(A.asOf=Me.todayStamp());const Tt=K.compute(A),Zn=Et()-Gn;let Aa=null;try{Aa=G.shadowTrack?G.shadowTrack(Tt):null}catch{Aa=null}let Ca=null;if(y==="bazi")try{Ca=K.compute({system:"trend",datetime:Ai,gender:_e,toAge:100,trueSolar:Yt,lateZi:Vt,...Me.todayStamp?{asOf:A.asOf||Me.todayStamp()}:{},...A.dst!==void 0?{dst:A.dst}:{},...A.address?{address:A.address}:{},...typeof A.longitude=="number"?{longitude:A.longitude}:{},...A.geo?{geo:A.geo}:{}})}catch{Ca=null}let Ta=null;if(K.caliberCompare)try{Ta=K.caliberCompare(A)}catch{Ta=null}const Un=Pe(y)||y==="qimen"?{question:Pe(y)?ua.trim():"",direction:Le}:void 0,ga=K.interpret?K.interpret(Tt,Un):null;ga&&Tt.cross&&K.crossSection&&(ga.sections=[...ga.sections||[],K.crossSection(Tt.cross)]);const Kn=$t(y)==="cast"&&(y!=="meihua"||ne==="time");U({kind:y,r:Tt,it:ga,at:Se,timed:Kn,trend:Ca,caliber:Ta,shadowDiff:Aa,gender:_e,address:xt,trueSolar:Yt,lateZi:Vt});const Ci=I=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>I>1?Ci(I-1):Ti()):setTimeout(Ti,0)},Ti=()=>{Ni===De&&ie({engineMs:bt,computeMs:Zn,cached:Mi,totalMs:Et()-qi,renderMs:null})};if(Ci(2),Qe(null),ta(null),et({}),Bt(null),Ue(""),ht(""),y!=="tarot"&&y!=="mbti"){const I=!!(ye&&Ke),Li={kind:y,date:Se.date,time:I?"":Se.time,hourUnknown:I,gender:_e,address:xt,trueSolar:Yt,lateZi:Vt,lines:y==="liuyao"?Si:"",question:Pe(y)?ua.trim():"",direction:Le,count:ja,mhMode:ne,upper:pa,lower:la,changing:da,...y==="qimen"?{qimenRule:St,qLateZi:Dt}:{},...y==="zeri"?{task:lt,days:At,shengXiao:Te,zCand:Be}:{},...y==="xiaoliuren"?{xlrMode:l,num1:c,num2:m,num3:h}:{},...y==="trend"?{toAge:_}:{},...y==="fengshui"?{fsMode:H,fsPeriod:z,sitting:D,facing:$}:{},...y==="name"?{nnMode:k,surname:Q,givenName:ue,limitN:me}:{},...y==="convert"?{convMode:Ge,lunarDate:dt,leapMonth:i}:{},...y==="hepan"?{hpChart:nt,partnerDate:fe,partnerTime:B,partnerGender:R,partnerAddress:ve,thirdOn:qe,p2Date:Xe,p2Time:zt,p2Gender:Re,p2Address:st}:{},label:Di(y,Tt),at:Date.now()};we(Yn=>{const Ei=[Li,...Yn.filter(Vn=>!Fi(Vn,Li))].slice(0,20);return Fa(Ei),Ei})}}catch(bt){if(Xt())return;Ue(bt&&bt.message?bt.message:String(bt)),U(null)}},dn=async t=>{const g=$t(t),N=++De;if(Ue(""),t==="mbti"){Ae(""),oa(!0);try{await ha(t)}catch(y){N===De&&Ue(y&&y.message?y.message:String(y))}finally{N===De&&oa(!1)}if(N!==De)return;s(t),C.filter(y=>y!=null).length>=Ye?je(t):U(null);return}if(s(t),g==="none"){je(t);return}const E=Na[g]||(g==="cast"||g==="date"?va():{date:Ua.date,time:Ua.time});P(E.date),ee(E.time),je(t,E)},cn=t=>{He.some(g=>g.k===t)&&ka(g=>{const N=(g||[]).filter(y=>y&&y.tab&&y.tab!==t),E=[{tab:t,at:Date.now()}].concat(N).slice(0,Ba);return Za(Ra,E),E})},fi=t=>{const g=t==="flat"?"flat":"group";mt(g),Za(Ia,g)},Ma=t=>{cn(t),dn(t)},mn=t=>{P(t),Ee!=="none"&&ca(g=>Object.assign({},g,{[Ee]:{date:t,time:V}}))},un=t=>{ee(t),Ee!=="none"&&ca(g=>Object.assign({},g,{[Ee]:{date:S,time:t}}))},Wn=()=>{const t=va();P(t.date),ee(t.time),Ee!=="none"&&ca(g=>Object.assign({},g,{[Ee]:null})),je(n,t)},hi=()=>{if(n==="mbti"){const t=C.filter(g=>g!=null).length;if(t<Ye){Ae(`先答满 ${Ye} 题再看结果（现答 ${t} 题，还差 ${Ye-t} 题）。`);return}je(n);return}if(Ee!=="none"&&!Na[Ee]){const t=va();P(t.date),ee(t.time),je(n,t);return}je(n)},gn=()=>{const t={date:"1990-05-12",time:"14:30"};s("bazi"),ge("male"),F("河北石家庄"),ca(g=>Object.assign({},g,{birth:t})),P(t.date),ee(t.time),je("bazi",t,null,{gender:"male",address:"河北石家庄"})},xi=t=>{pi(t),je(n,{date:S,time:V},t)},fn=()=>!!(window.matchMedia&&window.matchMedia("(max-width: 640px)").matches),hn=()=>ri===null?fn():ri,ma=(t,g,N)=>{if(!g)return;const E=ne=>{t.textContent=ne?"已复制":"复制失败",setTimeout(()=>{t.textContent=N},1400)},y=()=>{try{const ne=document.createElement("textarea");ne.value=g,ne.setAttribute("readonly",""),ne.style.position="fixed",ne.style.opacity="0",document.body.appendChild(ne),ne.select();const ye=!!(document.execCommand&&document.execCommand("copy"));return document.body.removeChild(ne),ye}catch{return!1}};try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(g).then(()=>E(!0),()=>E(y()));return}}catch{}E(y())},xn=t=>ma(t,t.getAttribute("data-shadow-copy")||"","复制 ID"),bn=t=>ma(t,t.getAttribute("data-handle-copy")||"","复制句柄"),vn=t=>{const g=t.closest(".mp-trace-layer")||document.getElementById("mp-trace-layer"),N=g&&g.querySelector("[data-trace-md]");ma(t,N?N.value:"","复制 Markdown")},yn=()=>{try{return String(location.href).split("#")[0]}catch{return""}},$n=()=>{if(!f||!f.r)return null;try{return K.askPackages?K.askPackages(f.r,{question:qa(),interpret:f.it,base:yn()}):null}catch{return null}},bi=[["full","复制提问","完整提问：盘面摘要 + 阅读层次 + 回答骨架，粘进任何对话窗都能用"],["brief","复制精简","一句话版：体系 + 排盘句柄 + 你的问题，够助手认出是哪张盘"],["structured","复制参数","结构化参数（JSON）：助手可直接照 args 调 compute，不必解析自然语言"],["link","复制深链","深链：把这张盘的参数编进链接，打开即还原同一张盘（换台机器、发给朋友都行）"]],wn=(t,g)=>{const N=$n();if(!N){Ce("还没有可以复制的盘：先排一张。");return}const E=t==="link"?N.link:N[t];if(!E){Ce(t==="link"?"这张盘没拿到句柄（随机抽牌只复现参数、不复现牌面），深链做不出来；用「复制提问」那一档。":"这一档暂时是空的，换一档试试。");return}ma(g,E,bi.find(y=>y[0]===t)[1]),t==="link"&&Ce("深链已复制：打开就还原这张盘，也可以直接发给别人。链接里是编码不是加密，别公开贴。")},kn=()=>{const t=document.getElementById("mp-trace-layer");if(!t)return;t.classList.add("open"),t.setAttribute("aria-hidden","false");const g=t.querySelector("[data-trace-close]");g&&g.focus&&g.focus()},vi=()=>{const t=document.getElementById("mp-trace-layer");if(!t)return;t.classList.remove("open"),t.setAttribute("aria-hidden","true");const g=document.querySelector("[data-trace-open]");g&&g.focus&&g.focus()},zn=t=>{const g=t.target&&t.target.closest?t.target.closest("[data-shadow-copy]"):null;if(g){xn(g);return}const N=t.target&&t.target.closest?t.target.closest("[data-handle-copy]"):null;if(N){bn(N);return}if(t.target&&t.target.closest?t.target.closest("[data-trace-open]"):null){kn();return}const y=t.target&&t.target.closest?t.target.closest("[data-trace-copy]"):null;if(y){vn(y);return}if(t.target&&t.target.closest?t.target.closest("[data-mp-askcopy]"):null){qn();return}if(t.target&&t.target.closest?t.target.closest("[data-trace-close]"):null){vi();return}const Ke=t.target&&t.target.closest?t.target.closest(".mp-it-head"):null;if(!Ke)return;const Se=Ke.closest(".mp-it");if(!Se)return;const _e=!Se.classList.contains("folded");Se.classList.toggle("folded",_e),Ke.setAttribute("aria-expanded",_e?"false":"true");const xt=Ke.querySelector(".mp-it-hint");xt&&(xt.textContent=_e?"点击展开":"点击收起"),on(_e)},yi=(t,g)=>{if(!f||!(Pe(n)||n==="qimen"))return;const N={question:Pe(n)?(g===void 0?at:g).trim():"",direction:t===void 0?Le:t},E=K.interpret?K.interpret(f.r,N):null;let y=f.r;if((n==="liuyao"||n==="qimen")&&y&&y.trace&&K.buildTrace)try{const ne=n==="liuyao"?K.buildTrace(y,{direction:N.direction,gender:y.useGod&&y.useGod.gender||"male",refresh:!0}):K.buildTrace(y,{direction:N.direction});ne&&(y=Object.assign({},y,{trace:ne}))}catch{}U(Object.assign({},f,{r:y,it:E}))},jn=t=>!t||!t.timed||!t.at?"":`<div class="mp-cast">起卦时刻：<b>${t.at.date} ${t.at.time}</b>　（来自你的本机时间，点「此刻」可重新取当下）</div>`,Sn=()=>{try{const t=f&&f.r&&f.r.summary?f.r.summary:"";if(!t)return;navigator.clipboard.writeText(t).then(()=>ht("已复制"),()=>ht("复制失败"))}catch{ht("复制失败")}},qn=()=>{if(!f||!f.r||!window.Engine||!window.Engine.buildEventPrompt)return;const t=Me&&Me.kindOfDirection?Me.kindOfDirection(Le):"other";let g;try{g=window.Engine.buildEventPrompt(f.r,{question:(at||"").trim(),kind:t,gender:a,timeKnown:!0})}catch{g=null}g&&g.text&&navigator.clipboard.writeText(g.text).then(()=>ht("已复制问事提示"),()=>ht("复制失败"))},$i=()=>{if(!(!f||!f.r||!Je.trim()))try{Qe(K.followup?K.followup(f.r,Je.trim()):null)}catch(t){Qe({question:Je.trim(),ok:!1,answer:"追问失败："+(t&&t.message?t.message:t),evidence:[],confidence:"弱"})}},Nn=()=>{if(!(!f||!f.r))try{const t=K.askPrompt?K.askPrompt(f.r,{question:qa(),interpret:f.it}):null,g=t&&t.text?t.text:String(f.r.summary||"");if(Ja(g)){Ce("已发到对话窗，往下看回复。");return}const N="（"+Ka()+"）";navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(g).then(()=>Ce("对话输入框还没就绪"+N+"，已复制提问；粘进对话窗回车即可。"),()=>Ce("对话输入框还没就绪"+N+"，复制也没成功；先点「复制文字结果」再贴。")):Ce("对话输入框还没就绪"+N+"；先点「复制文字结果」再贴进对话窗。")}catch(t){Ce("发到对话窗失败："+(t&&t.message?t.message:t))}},Mn=()=>{const t=[],g=window.__MP_VER||"未知";t.push("# 命理插件反馈"),t.push(""),t.push("## 我遇到的情况"),t.push(""),t.push("（在这里写一句就好：哪里不对 / 读不懂哪一段 / 算得和别人不一样 / 想加什么。下面这些是自动带的复现信息，不用改。）"),t.push(""),t.push("## 复现信息"),t.push(""),t.push("- 插件版本：v"+g);{const y=Array.isArray(window.__MP_UNRELEASED)?window.__MP_UNRELEASED:[];y.length&&t.push("- 未发版改动："+y.length+" 项（版本号未变，说明这份产物比 v"+g+" 新）")}const N=He.find(y=>y.k===n)?.label||n;if(t.push("- 体系："+N+(N===n?"":"（"+n+"）")),at&&t.push("- 所问之事："+at),Le&&Le!=="general"){const y=(Array.isArray(K.DIRECTIONS)?K.DIRECTIONS:[]).find(ne=>ne.key===Le);t.push("- 询问方向："+(y?y.label:Le))}t.push(""),t.push("### 输入"),t.push(""),t.push("```"),($t(n)==="time"||$t(n)==="date")&&(t.push(`日期：${S}`),$t(n)==="time"&&t.push(`时刻：${ae?"（未知，按三柱排）":V}`),t.push(`性别：${a==="male"?"男":"女"}`),ze&&t.push(`出生地：${ze}`),t.push(`真太阳时：${Oe?"开":"关"}　晚子时换日：${ot?"开":"关"}`),n==="qimen"&&t.push(`奇门取局：${St}`),We&&t.push("交叉验证：开"));const E={合盘:()=>{t.push(`对方：${fe} ${B} ${R==="male"?"男":"女"}${ve?" "+ve:""}（${nt} 盘）`),qe&&t.push(`第三方：${Xe} ${zt} ${Re==="male"?"男":"女"}${st?" "+st:""}`)},择日:()=>{t.push(`事项：${lt}　起算：${S}　天数：${At}${Te?"　属相："+Te:""}${Be?"　候选日："+Be:""}`)},起名:()=>{t.push(`姓：${Q||"（未填）"}　名：${ue||"（未填）"}　模式：${k}${k==="generate"?"　候选数："+(me||"默认"):""}`)},公农历:()=>{t.push(`模式：${Ge}${dt?"　农历输入："+dt:""}${i?"（闰月）":""}`)},小六壬:()=>{t.push(`模式：${l}${l==="number"?`　报数：${c}/${m}/${h}`:""}`)},风水:()=>{t.push(`动作：${H}${H==="natal"?"":`　坐：${D}　向：${$}`}${H==="xuankong"?`　运：${z}`:""}`)}};if(E[N]&&E[N](),t.push("```"),t.push(""),gt&&(t.push("### 报错原文"),t.push(""),t.push("```"),t.push(String(gt)),t.push("```"),t.push("")),f&&f.r){t.push("### 结果摘要（引擎原文，前 40 行）"),t.push(""),t.push("```");const y=String(f.r.summary||(K.renderText?K.renderText(f.r):"")||"");t.push(y.split(`
`).slice(0,40).join(`
`)),t.push("```"),f.r.handle&&(t.push(""),t.push("排盘句柄（开发者可据此复现同一张盘）：`"+f.r.handle+"`"))}else t.push("### 结果摘要"),t.push(""),t.push("（这次没有生成盘面——如果是在排盘过程中出错，上面的「报错原文」就是关键。）");return t.push(""),t.push("## 联系渠道"),t.push(""),t.push("- GitHub issue：https://github.com/xuanfu-web/dsh-metaphysics/issues"),t.push("- 邮件：1129440028@qq.com"),t.push("- 微信群：dsh-metaphysics"),t.join(`
`)},wi=()=>{const t=Mn();try{if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(()=>{re("已复制"),v("粘到 issue / 邮件 / 群里即可")}).catch(()=>{re("复制失败"),v("可改用「导出 .md」或手动选中")});else{const g=document.createElement("textarea");g.value=t,g.style.cssText="position:fixed;left:-9999px;top:0",document.body.appendChild(g),g.select();const N=document.execCommand&&document.execCommand("copy");g.remove(),re(N?"已复制":"复制失败"),v(N?"粘到 issue / 邮件 / 群里即可":"可改用「导出 .md」或手动选中")}}catch{re("复制失败"),v("可改用「导出 .md」")}setTimeout(()=>{re(""),v("")},4e3)},An=()=>{try{wi()}catch{}const t=encodeURIComponent("[反馈] "+(He.find(g=>g.k===n)?.label||n)+(gt?"：报错":"：使用问题"));try{window.open("https://github.com/xuanfu-web/dsh-metaphysics/issues/new?title="+t,"_blank","noopener")}catch{v("浏览器拦了弹窗，请手动打开 GitHub issues")}},Cn=()=>{if(!(!f||!f.r))try{const t=K.renderText?K.renderText(f.r):f.r.summary||"",g=new Blob([t],{type:"text/markdown;charset=utf-8"}),N=document.createElement("a");N.href=URL.createObjectURL(g),N.download=`命理报告-${f.r.system}.md`,document.body.appendChild(N),N.click(),N.remove(),setTimeout(()=>URL.revokeObjectURL(N.href),2e3)}catch(t){console.error("[metaphysics] 导出失败",t)}},Tn=()=>{if(!(!f||!f.r))try{const t=G.summaryCardPNG?G.summaryCardPNG(f.r,f.it):"";if(!t){ht("当前环境不支持 Canvas 导出");return}const g=document.createElement("a");g.href=t,g.download=`命理摘要-${f.r.system}.png`,document.body.appendChild(g),g.click(),g.remove()}catch(t){console.error("[metaphysics] 长图导出失败",t)}},ki={fontSize:12,padding:"5px 12px"},Ln=()=>{!f||!f.r||!f.r.past||ta(K.verifyFit?K.verifyFit(f.r.past.rows,It):null)},En=()=>{if(!(!f||f.kind!=="bazi"))try{const t=f.at||{date:S,time:V},[g,N,E]=String(t.date).split("-").map(Number),[,y]=String(t.time).split(":").map(Number),ne=pt.filter(ye=>Number(ye.year)).map(ye=>({year:Number(ye.year),kind:ye.kind}));Bt(K.rectifyBirth?K.rectifyBirth({base:{year:g,month:N,day:E,minute:Number.isFinite(y)?y:0},gender:f.gender||a,events:ne,lateZi:typeof f.lateZi=="boolean"?f.lateZi:ot,trueSolar:typeof f.trueSolar=="boolean"?f.trueSolar:Oe,address:String(f.address||"").trim()||void 0}):{error:"当前客户端未加载生时校正模块"})}catch(t){Bt({error:t&&t.message?t.message:String(t)})}},J=(t,g)=>p("label",{className:"mp-field"},p("span",{className:"mp-lbl"},t),g),_n=t=>{s(t.kind),t.date&&P(t.date),t.time&&ee(t.time),se(!!t.hourUnknown),t.gender&&ge(t.gender),F(t.address||""),typeof t.trueSolar=="boolean"&&qt(t.trueSolar),typeof t.lateZi=="boolean"&&Nt(t.lateZi),L(t.lines||""),Sa(t.question||""),oi(t.direction||"general"),si(t.count||"3"),pi(t.mhMode||"time"),li(t.upper||""),di(t.lower||""),ci(t.changing||""),t.kind==="qimen"&&(typeof t.qimenRule=="string"&&Ft(t.qimenRule),typeof t.qLateZi=="string"&&Mt(t.qLateZi)),t.kind==="zeri"&&(typeof t.task=="string"&&ia(t.task),t.days!=null&&Ne(String(t.days)),typeof t.shengXiao=="string"&&Ct(t.shengXiao),typeof t.zCand=="string"&&Gt(t.zCand)),t.kind==="xiaoliuren"&&(o(t.xlrMode==="number"?"number":"time"),t.num1!=null&&d(String(t.num1)),t.num2!=null&&u(String(t.num2)),t.num3!=null&&b(String(t.num3))),t.kind==="trend"&&t.toAge!=null&&X(String(t.toAge)),t.kind==="fengshui"&&(typeof t.fsMode=="string"&&w(t.fsMode),t.fsPeriod!=null&&te(String(t.fsPeriod)),typeof t.sitting=="string"&&oe(t.sitting),typeof t.facing=="string"&&ce(t.facing)),t.kind==="name"&&(typeof t.nnMode=="string"&&O(t.nnMode),typeof t.surname=="string"&&$e(t.surname),typeof t.givenName=="string"&&pe(t.givenName),t.limitN!=null&&Fe(String(t.limitN))),t.kind==="convert"&&(typeof t.convMode=="string"&&Zt(t.convMode),typeof t.lunarDate=="string"&&e(t.lunarDate),typeof t.leapMonth=="boolean"&&r(t.leapMonth)),t.kind==="hepan"&&(t.hpChart&&kt(t.hpChart),typeof t.partnerDate=="string"&&he(t.partnerDate),typeof t.partnerTime=="string"&&Z(t.partnerTime),typeof t.partnerGender=="string"&&Y(t.partnerGender),typeof t.partnerAddress=="string"&&wt(t.partnerAddress),typeof t.thirdOn=="boolean"&&_t(t.thirdOn),typeof t.p2Date=="string"&&$a(t.p2Date),typeof t.p2Time=="string"&&jt(t.p2Time),typeof t.p2Gender=="string"&&Ht(t.p2Gender),typeof t.p2Address=="string"&&Ot(t.p2Address)),ra(!1),ei(t)},Hn=()=>{we([]),Fa([])},On=["bazi","ziwei","trend","chenggu"],zi=t=>{s(t.kind),P(t.date),t.time&&ee(t.time),se(!!t.hourUnknown),t.gender&&ge(t.gender),F(t.address||""),qt(t.trueSolar!==!1),Nt(t.lateZi!==!1)},Fn=t=>{const g=G.profEvent(t.target);if(!g)return;const N=y=>ti.find(ne=>ne.id===y),E=t.currentTarget.querySelector(".mp-prof-name");if(ii(""),g.action==="use"){const y=N(g.id);if(!y)return;if(!G.profUsable(y)){Ae("这张档案没有出生时刻，先补上时刻再存一次。");return}Ve="",na(G.profilesTouch(y.id)),zi(y),je(y.kind,{date:y.date,time:y.hourUnknown?"12:00":y.time},void 0,{gender:y.gender||void 0,address:y.address||"",hourUnknown:!!y.hourUnknown,trueSolar:y.trueSolar!==!1,lateZi:y.lateZi!==!1});return}if(g.action==="edit"){const y=N(g.id);if(!y)return;zi(y),Ve=y.label,sa(y.id);return}if(g.action==="cancel"){Ve="",sa(null);return}if(g.action==="pin"){na(G.profilesPin(g.id));return}if(g.action==="del"){if(ai!==g.id){ii(g.id);return}na(G.profilesRemove(g.id)),Ut===g.id&&(Ve="",sa(null)),Ae("已从本机删除这张档案卡（不影响已经排出来的盘）。");return}if(g.action==="put"){const y=Ut,ne=G.profFromForm({kind:n,date:S,time:V,hourUnknown:ae,gender:a,address:ze,trueSolar:Oe,lateZi:ot},E?E.value:Ve,Ut||void 0);if(!ne){Ae("先填好出生日期（和时刻），再存档案。");return}const ye=G.profilesPut(ne);if(!ye.ok){Ae("档案没能存进本机（存储被禁用或已满），排盘不受影响。");return}na(ye.list),Ve="",sa(null),E&&(E.value=""),Ae(`${y?"已更新档案":"已存入我的命盘"}「${ye.item.label}」。`)}},Dn=t=>{const g=t.target&&t.target.closest?t.target.closest(".mp-prof-name"):null;g&&(Ve=g.value)},Pn=t=>{const g=K.formOf?K.formOf(t):null;if(!g){je("ziwei");return}const N=He.some(ye=>ye.k===g.tab)?g.tab:"ziwei",E={date:g.date||S,time:g.time||V},y=g.lines===void 0?void 0:Array.isArray(g.lines)?g.lines.join(" "):String(g.lines);g.date&&P(g.date),g.time&&ee(g.time),g.gender&&ge(g.gender),typeof g.address=="string"&&F(g.address),typeof g.trueSolar=="boolean"&&qt(g.trueSolar),typeof g.lateZi=="boolean"&&Nt(g.lateZi),y!==void 0&&L(y),g.question&&Sa(g.question),s(N);const ne=K.restNote?K.restNote(g):"";Ce(`已按深链还原：${t.label}${g.question?`｜${g.question}`:""}${ne?`　${ne}`:""}`),je(N,E,void 0,{gender:g.gender,address:g.address,trueSolar:g.trueSolar,lateZi:g.lateZi,lines:y,question:g.question})};vt(()=>{let t=!1;const g=De;return(async()=>{let N=null;try{await ha(n);const E=typeof location<"u"?String(location.href):"";E&&E.indexOf("mp=")>=0&&window.Engine&&window.Engine.parseAskLink&&(N=window.Engine.parseAskLink(E))}catch{N=null}if(!(t||De!==g)){if(N&&N.ok)try{Pn(N);return}catch{}je("ziwei")}})(),()=>{t=!0}},[]),vt(()=>{if(!za)return;const t=za.kind;ei(null),je(t)},[za]),vt(()=>{const t=g=>{if(g.key!=="Escape")return;const N=document.getElementById("mp-trace-layer");N&&N.classList.contains("open")&&vi()};return document.addEventListener("keydown",t),()=>document.removeEventListener("keydown",t)},[]);const ji=(ut||[]).filter(t=>t&&He.some(g=>g.k===t.tab)).slice(0,Ba),Rn=t=>(He.find(g=>g.k===t)||{}).label||t,In=({k:t,label:g,tip:N,wide:E})=>p("button",{key:t,type:"button",className:"mp-tool"+(E?" wide":"")+(n===t?" on":""),"data-tab":t,onClick:()=>Ma(t)},p("b",null,g),p("span",null,N)),Bn=[p("div",{key:"profiles",className:"mp-profwrap",onClick:Fn,onInput:Dn,dangerouslySetInnerHTML:{__html:G.profilesHTML(ti,{editingId:Ut,armedDel:ai,bar:On.indexOf(n)>=0?G.profilesBarHTML({editingId:Ut,name:Ve}):""})}}),p("section",{key:"start",className:"mp-start","aria-label":"选择要算的事"},p("div",{className:"mp-start-top"},p("div",{className:"mp-recent",hidden:ji.length===0},p("span",{className:"mp-recent-lbl"},"最近用过"),p("span",{className:"mp-recent-list"},ji.map(t=>p("button",{key:t.tab,type:"button",className:"mp-rc",onClick:()=>Ma(t.tab)},Rn(t.tab),p("i",null,Yi(t.at)))))),p("div",{className:"mp-viewsw",role:"group","aria-label":"首屏视图"},p("button",{type:"button",className:xe==="group"?"on":"","aria-pressed":xe==="group"?"true":"false",onClick:()=>fi("group")},"分组"),p("button",{type:"button",className:xe==="flat"?"on":"","aria-pressed":xe==="flat"?"true":"false",onClick:()=>fi("flat")},"平铺"))),xe==="group"?p("div",{className:"mp-groups"},Ki.map(t=>{const g=!!an[t.title],N=Math.max(0,t.items.length-4);return p("section",{key:t.title,className:"mp-tgroup"+(g?" open":"")},p("div",{className:"mp-tgroup-head"},p("h2",null,t.title),p("p",null,t.hint)),p("div",{className:"mp-ttools"},t.items.map(In),N>0?p("button",{key:"more",type:"button",className:"mp-tmore","aria-expanded":g?"true":"false",onClick:()=>nn(E=>Object.assign({},E,{[t.title]:!g}))},g?"收起":`还有 ${N} 个`):null))})):null),p("div",{key:"tabs",className:"mp-tabs"+(xe==="flat"?"":" hide"),role:"tablist","aria-label":"命理体系"},He.map(t=>p("button",{key:t.k,role:"tab","aria-selected":n===t.k?"true":"false",tabIndex:n===t.k?0:-1,className:"mp-tab"+(n===t.k?" on":""),onClick:()=>Ma(t.k)},t.label))),p("div",{key:"head",className:"mp-panel"},p("div",{className:"mp-row"},ui?J(Kt?"出生日期（公历）":Ee==="date"?"日期（公历）":"起卦日期（公历）",p(xa,{value:S,onChange:mn,onInvalid:()=>Ae("日期请按「年-月-日」填写，例如 1990-05-12。")})):null,gi?J(Kt?"出生时刻":"起卦时刻",p("input",{className:"mp-input",type:"time",value:V,disabled:ae&&(n==="bazi"||n==="trend"),onChange:t=>un(t.target.value)})):null,n==="bazi"||n==="trend"?p("label",{className:"mp-chk",title:"不知道出生时辰时勾这里：不排时柱，起运按日估算，结果首行会写明"},p("input",{type:"checkbox",checked:ae,onChange:t=>se(t.target.checked)})," 时辰未知"):null,Kt?J("性别",p("select",{className:"mp-input",value:a,onChange:t=>ge(t.target.value)},p("option",{value:"female"},"女"),p("option",{value:"male"},"男"))):null,Kt?J("出生地（省/市即可）",p("input",{className:"mp-input",placeholder:"如 河北石家庄 / 成都",value:ze,onChange:t=>F(t.target.value)})):null,n==="bazi"||n==="ziwei"?p("label",{className:"mp-field mp-checks"},p("input",{type:"checkbox",checked:We,onChange:t=>Pt(t.target.checked)}),p("span",{className:"mp-lbl"},"八字 × 紫微 交叉验证")):null,n==="hepan"?J("对方出生日期",p(xa,{value:fe,onChange:he,onInvalid:()=>Ae("对方出生日期请按「年-月-日」填写，例如 1992-08-15。")})):null,n==="hepan"?J("对方出生时刻",p("input",{className:"mp-input",type:"time",value:B,onChange:t=>Z(t.target.value)})):null,n==="hepan"?J("对方性别",p("select",{className:"mp-input",value:R,onChange:t=>Y(t.target.value)},p("option",{value:"female"},"女"),p("option",{value:"male"},"男"))):null,n==="hepan"?J("合盘方式",p("div",{className:"mp-seg"},p("button",{className:nt==="bazi"?"on":"",onClick:()=>kt("bazi")},"八字"),p("button",{className:nt==="ziwei"?"on":"",onClick:()=>kt("ziwei")},"紫微"))):null,n==="hepan"?J("对方出生地（可空）",p("input",{className:"mp-input",placeholder:"如 四川成都",value:ve,onChange:t=>wt(t.target.value)})):null,n==="hepan"?p("label",{className:"mp-field mp-checks"},p("input",{type:"checkbox",checked:qe,onChange:t=>_t(t.target.checked)}),p("span",{className:"mp-lbl"},"三方合盘（加入第三人）")):null,n==="hepan"&&qe?J("第三方出生日期",p(xa,{value:Xe,onChange:$a,onInvalid:()=>Ae("第三方出生日期请按「年-月-日」填写，例如 1990-01-01。")})):null,n==="hepan"&&qe?J("第三方出生时刻",p("input",{className:"mp-input",type:"time",value:zt,onChange:t=>jt(t.target.value)})):null,n==="hepan"&&qe?J("第三方性别",p("select",{className:"mp-input",value:Re,onChange:t=>Ht(t.target.value)},p("option",{value:"female"},"女"),p("option",{value:"male"},"男"))):null,n==="hepan"&&qe?J("第三方出生地（可空）",p("input",{className:"mp-input",placeholder:"如 广东广州",value:st,onChange:t=>Ot(t.target.value)})):null,n==="qimen"?p("fieldset",{key:"qmr",className:"mp-qmrule"},p("legend",{className:"mp-lbl"},"换局规则"),p("div",{className:"mp-qmopts",role:"radiogroup","aria-label":"奇门换局规则"},[["chaibu","拆补"],["chaoshen","超神接气"],["zhirun","置闰"]].map(([t,g])=>p("label",{key:t,className:"mp-qmopt"},p("input",{type:"radio",name:"qimen_rule",value:t,checked:St===t,onChange:()=>Ft(t)}),p("span",null,g)))),p("div",{className:"mp-field"},p("span",{className:"mp-lbl"},"晚子时"),p("select",{className:"mp-input",value:Dt,onChange:t=>Mt(t.target.value)},p("option",{value:"same-day"},"23:00 后归当日"),p("option",{value:"next-day"},"23:00 后归次日"))),p("details",{className:"mp-qmhelp"},p("summary",null,"三种规则有什么区别？"),p("p",null,"决定符头与节气如何对齐、是否插入闰局；同一个时刻在不同规则下可能得到不同局数。默认「拆补」与工具层一致。"))):null,Pe(n)||n==="qimen"?J(n==="qimen"?"询问方向（定用神）":"询问方向",p("select",{className:"mp-input",value:Le,onChange:t=>{oi(t.target.value),yi(t.target.value)}},(K.DIRECTIONS||[]).map(t=>p("option",{key:t.key,value:t.key},t.label)))):null,n==="tarot"?J("张数",p("select",{className:"mp-input",value:ja,onChange:t=>si(t.target.value)},p("option",{value:"1"},"1 张 · 指引"),p("option",{value:"3"},"3 张 · 过去现在未来"),p("option",{value:"5"},"5 张 · 十字牌阵"))):null,n==="liuyao"?J("六爻（可空）",p("input",{className:"mp-input",placeholder:"空则随机，如 9 7 8 8 7 6",value:be,onChange:t=>L(t.target.value)})):null,n==="meihua"?J("起卦方式",p("div",{className:"mp-seg"},p("button",{className:ft==="time"?"on":"",onClick:()=>xi("time")},"时间"),p("button",{className:ft==="number"?"on":"",onClick:()=>xi("number")},"数字"))):null,n==="meihua"&&ft==="number"?J("第一个数",p("input",{className:"mp-input",value:pa,placeholder:"如 17",onChange:t=>li(t.target.value)})):null,n==="meihua"&&ft==="number"?J("第二个数",p("input",{className:"mp-input",value:la,placeholder:"如 29",onChange:t=>di(t.target.value)})):null,n==="meihua"&&ft==="number"?J("动爻（可空）",p("input",{className:"mp-input",value:da,placeholder:"1-6",onChange:t=>ci(t.target.value)})):null,n==="zeri"?J("所办事项",p("select",{className:"mp-input",value:lt,onChange:t=>ia(t.target.value)},[["常用",["嫁娶","搬家入宅","出行","开业","签订合同","祭祀"]],["婚嫁",["嫁娶","订婚","领证","提亲","收送聘金","满月酒"]],["生活",["搬家","入宅","旅行","访亲友","入学","求医","祭祀"]],["建造",["动土","装修","装修建造","安葬","试车买车"]],["工商",["开业","交易","投资","签订合同","签约","纳财","赴任"]]].map(([t,g])=>p("optgroup",{key:t,label:t},g.map(N=>p("option",{key:`${t}-${N}`,value:N},N)))))):null,n==="convert"?J("转换方向",p("div",{className:"mp-seg"},p("button",{className:Ge==="solar2lunar"?"on":"",onClick:()=>Zt("solar2lunar")},"公历 → 农历"),p("button",{className:Ge==="lunar2solar"?"on":"",onClick:()=>Zt("lunar2solar")},"农历 → 公历"))):null,n==="convert"&&Ge==="lunar2solar"?J("农历日期",p("input",{className:"mp-input",value:dt,placeholder:"如 2026-9-17",onChange:t=>e(t.target.value)})):null,n==="convert"&&Ge==="lunar2solar"?p("label",{className:"mp-check"},p("input",{type:"checkbox",checked:i,onChange:t=>r(t.target.checked)})," 闰月"):null,n==="zeri"?J("看多少天",p("input",{className:"mp-input",type:"number",min:1,max:60,value:At,onChange:t=>Ne(t.target.value)})):null,n==="zeri"?J("候选日（可空，只比这几天）",p("input",{className:"mp-input",placeholder:"如 2026-12-01, 2026-12-08, 2026-12-15",value:Be,onChange:t=>Gt(t.target.value)})):null,n==="zeri"?J("当事人属相（可空）",p("select",{className:"mp-input",value:Te,onChange:t=>Ct(t.target.value)},p("option",{value:""},"不排除"),["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"].map(t=>p("option",{key:t,value:t},t)))):null,n==="xiaoliuren"?J("起课方式",p("div",{className:"mp-seg"},p("button",{className:l==="time"?"on":"",onClick:()=>o("time")},"时间"),p("button",{className:l==="number"?"on":"",onClick:()=>o("number")},"报数"))):null,n==="xiaoliuren"&&l==="number"?J("第一个数",p("input",{className:"mp-input",type:"number",min:1,max:99,value:c,onChange:t=>d(t.target.value)})):null,n==="xiaoliuren"&&l==="number"?J("第二个数",p("input",{className:"mp-input",type:"number",min:1,max:99,value:m,onChange:t=>u(t.target.value)})):null,n==="xiaoliuren"&&l==="number"?J("第三个数",p("input",{className:"mp-input",type:"number",min:1,max:99,value:h,onChange:t=>b(t.target.value)})):null,n==="mbti"?p("div",{className:"mp-quiz-wrap"},p("div",{className:"mp-lbl"},"十六型人格问卷 · 4 题一页，按 1（完全不像）到 5（很像我）打分"),p(Gi,{answers:C,page:T,onPick:(t,g)=>q(N=>{const E=N.slice();return E[t]=g,E}),onPage:t=>j(g=>Math.max(0,Math.min(g+t,Math.max(0,Math.ceil(ea().total/Jt)-1)))),onSubmit:hi,onClear:()=>{q(new Array(ea().total).fill(null)),j(0),U(null)}})):null,n==="trend"?J("算到几岁",p("input",{className:"mp-input",type:"number",min:10,max:100,value:_,onChange:t=>X(t.target.value)})):null,n==="fengshui"?J("看什么",p("div",{className:"mp-seg"},p("button",{className:H==="natal"?"on":"",onClick:()=>w("natal")},"命卦"),p("button",{className:H==="advise"?"on":"",onClick:()=>w("advise")},"门主灶"),p("button",{className:H==="xuankong"?"on":"",onClick:()=>w("xuankong")},"玄空"))):null,n==="fengshui"&&H!=="natal"?J("坐山（24 山）",p("input",{className:"mp-input",value:D,placeholder:"如 子 / 乾",onChange:t=>oe(t.target.value)})):null,n==="fengshui"&&H!=="natal"?J("朝向（24 山）",p("input",{className:"mp-input",value:$,placeholder:"如 午 / 巽",onChange:t=>ce(t.target.value)})):null,n==="fengshui"&&H==="xuankong"?J("运（1–9）",p("input",{className:"mp-input",type:"number",min:1,max:9,value:z,onChange:t=>te(t.target.value)})):null,n==="name"?J("看什么",p("div",{className:"mp-seg"},p("button",{className:k==="assess"?"on":"",onClick:()=>O("assess")},"评名字"),p("button",{className:k==="generate"?"on":"",onClick:()=>O("generate")},"生成候选"))):null,n==="name"?J("姓",p("input",{className:"mp-input",value:Q,placeholder:"如 李",onChange:t=>$e(t.target.value)})):null,n==="name"&&k==="assess"?J("名字",p("input",{className:"mp-input",value:ue,placeholder:"如 沐宸",onChange:t=>pe(t.target.value)})):null,n==="name"&&k==="generate"?J("候选个数",p("input",{className:"mp-input",type:"number",min:1,max:20,value:me,onChange:t=>Fe(t.target.value)})):null),Kt?p("div",{className:"mp-checks"},p("label",{title:"按出生地经度把钟表时间换算成真太阳时"},p("input",{type:"checkbox",checked:Oe,onChange:t=>qt(t.target.checked)}),"真太阳时"),p("label",{title:"23:00–23:59 出生时：勾选=按次日日柱起时柱；不勾=仍用当日日柱"},p("input",{type:"checkbox",checked:ot,onChange:t=>Nt(t.target.checked)}),"晚子时换日"),p("label",{title:"开启后会请求 OpenStreetMap，把区县/村落到更精确的坐标"},p("input",{type:"checkbox",checked:Ze,onChange:t=>ct(t.target.checked)}),"联网精确到区县")):null,Pe(n)?p("div",{className:"mp-askblock"},p("span",{className:"mp-lbl"},"所问之事（必填）"),p("textarea",{className:"mp-textarea"+(rn?" invalid":""),rows:2,value:at,placeholder:"用一句话描述所问之事，例如：今年是否适合换工作？",onChange:t=>{Sa(t.target.value),ra(!1)},onBlur:t=>yi(void 0,t.target.value)})):null,n==="mbti"?null:p("div",{key:"actions",className:"mp-actions"},p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginRight:8},onClick:gn,title:"用固定示例盘看完整报告（不改动你已填的数据）"},"看示例"),p("button",{className:"mp-btn",onClick:hi,title:"时间仍为自动时，点它会取当下再起卦"},n==="tarot"?"抽牌":n==="bazi"||n==="ziwei"?"排盘":n==="hepan"?"合盘":n==="qimen"?"起局":ba.indexOf(n)>=0?"看结果":"起卦"))),p("div",{key:"hint",className:"mp-hint"},ln.hint),ke.length?p("div",{key:"hist",className:"mp-hist"},p("div",{className:"mp-hist-h"},p("span",null,"最近排过"),p("button",{className:"mp-hist-clear",onClick:Hn},"清空")),p("div",{className:"mp-hist-list"},ke.map((t,g)=>p("button",{key:g,className:"mp-hist-item",title:`${String(t.date||"")} ${t.hourUnknown?"时辰未知":String(t.time||"")}`,onClick:()=>_n(t)},p("b",null,(He.find(N=>N.k===t.kind)||{}).label||t.kind),p("span",null,t.label||"—"),p("i",null,`${String(t.date||"").slice(5)} ${t.hourUnknown?"时辰未知":String(t.time||"")}`))))):null,Ee==="cast"&&mi?p("div",{key:"auto",className:"mp-auto"},Na.cast?`起卦时刻用的是你手动填的（${V}）；想跟随当下，把时间改回或清空即可。`:`起卦时刻已自动取本机时间（${V}），每次点起卦都会重新取当下；想固定时刻就在上面改。`):null,gt?p("div",{key:"err",className:"mp-err",role:"alert"},gt):null,ni?p("div",{key:"ntc",className:"mp-note",role:"status"},ni):null,sn?p("div",{key:"load",className:"mp-note",role:"status"},"正在加载本页需要的引擎…"):null,!f&&!gt?p("div",{key:"empty",className:"mp-empty"},p("b",null,n==="ziwei"||n==="bazi"?"填好出生信息，点「排盘」":n==="tarot"?"写下想问的事，点「抽牌」":n==="mbti"?"按 1–5 给题目打分，答满 12 题就能看结果":ba.indexOf(n)>=0?"填好参数，点「看结果」":"写下所问之事，点「起卦」"),n==="ziwei"||n==="bazi"?"出生日期、时刻与性别即可；出生地只影响真太阳时。":n==="mbti"?"4 题一页，答案只在本地参与计算，不会上传。":ba.indexOf(n)>=0?"按上面的选项填好参数即可；全部在本机计算，不上传。":"起卦时刻已自动取当下，也可以手动改。"):null,f?p("div",{key:"card",className:"mp-card mp-flat",role:"region","aria-label":"排盘结果","aria-live":"polite",onClick:zn,dangerouslySetInnerHTML:{__html:jn(f)+G.perfHTML(le)+G.revisionHTML(f.r.revision)+G.handleHTML(f.r.handle)+G.shadowHTML(f.r.shadow,f.shadowDiff)+G.traceHTML(f.r.trace,f.r.system,f.r.traceText)+G.resultWithInterpret(f.kind==="ziwei"?G.ziweiHTML(f.r):f.kind==="bazi"?G.baziHTML(f.r)+(f.trend?G.trendHTML(f.trend,{brief:!1}):""):f.kind==="meihua"?G.meihuaHTML(f.r):f.kind==="daliuren"?G.daliurenHTML(f.r):f.kind==="qimen"?G.qimenHTML(f.r)+G.qimenFactsHTML(f.r):f.kind==="hepan"?f.r.chart==="ziwei"?G.ziweiHepanHTML(f.r):G.hepanHTML(f.r):f.kind==="tarot"?G.tarotHTML(f.r):f.kind==="liuyao"?G.liuyaoHTML(f.r):f.kind==="chenggu"?G.chengguHTML(f.r):f.kind==="almanac"?G.almanacHTML(f.r):f.kind==="zeri"?G.zeriHTML(f.r):f.kind==="trend"?G.trendHTML(f.r):f.kind==="name"?G.nameHTML(f.r):f.kind==="mbti"?G.mbtiHTML(f.r):f.kind==="fengshui"?G.fengshuiHTML(f.r):G.quickHTML(f.r),f.it,{folded:hn()})+G.caliberHTML(f.caliber)}}):null,f?p("div",{key:"bar",className:"mp-bar"},p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px"},onClick:Sn},pn||"复制文字结果"),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:Cn,title:"导出盘面 + 解析（含一页读懂、三张表）为 Markdown"},"导出 .md"),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:Tn,title:"生成 PNG 摘要卡（一页读懂 + 首张表），适合直接分享"},"存为摘要长图")):null,f?p("div",{key:"ask",className:"mp-askbox",style:{flexWrap:"wrap"}},p("input",{className:"mp-input",value:Je,maxLength:120,placeholder:"追问：如 2027 年事业怎么样（回车提交）",onChange:t=>wa(t.target.value),onKeyDown:t=>{t.key==="Enter"&&$i()}}),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px"},onClick:$i},"追问"),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:Nn,title:"把这张盘的摘要和你的问题一起发进 DSH 对话窗，由对话里的模型接着答"},"问进对话"),W.ref?null:p("div",{key:"bridgediag",className:"mp-note",style:{marginTop:6,fontSize:11,flexBasis:"100%"}},Ka()),Rt?p("div",{key:"chatnote",className:"mp-note",style:{marginTop:6,fontSize:12,flexBasis:"100%"}},Rt):null):null,f?p("div",{key:"bridge",className:"mp-bridge"},p("span",{className:"mp-bridge-lbl"},W.ref?"桥可用；也可以：":"桥未就绪，改走这几档："),bi.map(([t,g,N])=>p("button",{key:t,type:"button",className:"mp-chip","data-bridge-copy":t,title:N,onClick:E=>wn(t,E.currentTarget)},g))):null,Ie?p("div",{key:"fx",className:"mp-fx",dangerouslySetInnerHTML:{__html:G.followupHTML(Ie)}}):null,f&&f.kind==="bazi"&&f.r.past?p("div",{key:"verify",className:"mp-verify"},p("div",{className:"mp-verify-h"},"验前事 · 过去几年的信号（只读，不改盘）"),f.r.past.rows.map(t=>p("div",{key:t.year,className:"mp-verify-row"},p("span",{className:"mp-verify-txt"},`${t.year} ${t.ganzhi} · ${t.theme}`),p("span",{className:"mp-verify-btns"},["yes","no","unsure"].map(g=>p("button",{key:g,className:"mp-chip"+(It[t.year]===g?" on":""),onClick:()=>et(Object.assign({},It,{[t.year]:g}))},g==="yes"?"准":g==="no"?"不准":"不确定"))))),p("div",{className:"mp-verify-foot"},p("button",{className:"mp-btn ghost",style:ki,onClick:Ln},"算贴合度"),rt?p("span",{className:"mp-verify-fit"},`命中 ${rt.yes}/${rt.answered}（${rt.level}）：${rt.advice}`):null)):null,f&&f.kind==="bazi"?p("div",{key:"rect",className:"mp-rect"},p("div",{className:"mp-verify-h"},"生时校正 · 用过去的事反推时辰"),pt.map((t,g)=>p("div",{key:g,className:"mp-rect-row"},p("input",{className:"mp-input",type:"number",min:1900,max:2100,value:t.year,onChange:N=>aa(pt.map((E,y)=>y===g?Object.assign({},E,{year:N.target.value}):E))}),p("select",{className:"mp-input",value:t.kind,onChange:N=>aa(pt.map((E,y)=>y===g?Object.assign({},E,{kind:N.target.value}):E))},[["career","事业变动"],["wealth","财运"],["love","感情"],["move","搬迁/出行"],["health","健康"],["other","其他"]].map(([N,E])=>p("option",{key:N,value:N},E))))),p("button",{className:"mp-btn ghost",style:ki,onClick:En},"计算候选时辰"),tt?tt.error?p("div",{className:"mp-rect-err"},tt.error):p("div",{className:"mp-rect-out"},p("div",{className:"mp-verify-fit"},tt.note),tt.candidates.slice(0,6).map(t=>p("div",{key:t.hour,className:"mp-rect-cand"+(t===tt.best?" best":"")},`${t.label} · 时柱 ${t.hourGanzhi} · 日柱 ${t.dayGanzhi} · 命中 ${t.hits}/${t.total}`))):null):null,!f&&!gt?p("div",{key:"ph",className:"mp-dim",style:{marginTop:24,fontSize:12}},"选择体系后点「排盘」。所有计算在本机完成，不上传任何数据。"):null,p("div",{key:"fb",className:"mp-fb"},p("div",{className:"mp-fb-h"},p("span",{className:"mp-fb-t"},"用得不对、读不懂、或算得跟别家不一样？"),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"4px 10px"},onClick:wi,title:"生成一份含输入、版本、环境与结果摘要的报告，粘贴到 issue / 邮件 / 群聊即可"},de||"复制反馈报告"),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"4px 10px",marginLeft:6},onClick:()=>An(),title:"在浏览器打开 GitHub issue（报告已复制到剪贴板，粘进去即可）"},"开 issue")),p("div",{className:"mp-fb-b"},"邮件 1129440028@qq.com　·　GitHub issues　·　微信群 dsh-metaphysics",x?p("span",{className:"mp-fb-note"},"　"+x):null))];return p("div",{className:"mp-wrap"},Bn)}function Qi(n){try{if(typeof styles<"u"&&styles&&typeof styles.insert=="function")return styles.insert(n)}catch(s){console.error("[metaphysics] styles.insert 不可用，改用 DOM 注入",s)}try{const s=document.createElement("style");return s.setAttribute("data-plugin","@local/metaphysics"),s.textContent=n,document.head.appendChild(s),()=>s.remove()}catch(s){return console.error("[metaphysics] DOM 注入样式也失败",s),()=>{}}}let Qa=!1;function ya(){try{const n=document.documentElement;if(!n||!document.body)return;const s=document.createElement("span");s.setAttribute("aria-hidden","true"),s.style.cssText="position:absolute;left:-9999px;top:0;width:0;height:0;pointer-events:none;background:var(--dsw-alias-brand-primary)",document.body.appendChild(s);const S=getComputedStyle(s).backgroundColor;s.remove();const P=Me&&typeof Me.pickOnColor=="function"?Me.pickOnColor(S):"";P&&n.style&&n.style.getPropertyValue("--mp-on-brand")!==P&&n.style.setProperty("--mp-on-brand",P)}catch{}}function en(){if(!Qa){Qa=!0,ya();try{const n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)");n&&typeof n.addEventListener=="function"&&n.addEventListener("change",ya)}catch{}try{typeof MutationObserver=="function"&&document.documentElement&&new MutationObserver(ya).observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]})}catch{}}}function tn(n){try{const F=Qi(Pi+(G&&G.CSS?G.CSS:""));typeof n.effect=="function"&&typeof F=="function"&&n.effect(()=>F)}catch(F){console.error("[metaphysics] 样式注入失败",F)}try{en()}catch(F){console.error("[metaphysics] 字色同步失败",F)}let s=null;try{s=n&&n.slots||(n&&typeof n.get=="function"?n.get("slots"):null)}catch(F){console.error("[metaphysics] 取 slots 服务失败",F)}if(!s||typeof s.register!="function"){console.error("[metaphysics] slots 服务不可用，面板未注册");return}try{W.injectType=typeof s.inject;const F=typeof s.spec=="function"?s.spec("conversation.input.right"):null;W.spec=F?F.kind+"/"+F.scope:"未声明"}catch(F){W.spec="取声明失败",Ya(F)}const S=F=>{if(typeof F=="function")return F;if(F&&typeof F=="object"){for(const fe of["dispose","off","cancel","unregister"])if(typeof F[fe]=="function")return()=>{try{F[fe]()}catch{}}}return()=>{}},P=(F,fe)=>{try{const he=s.register(F,fe);return W.regs+=1,W.seatOk[F.name]=!0,S(he)}catch(he){return Ya(he),()=>{}}},V=(F,fe)=>{const he=()=>{const B=fe();return W.contribution=(W.contribution?W.contribution+",":"")+(F+(typeof B=="function"?" 已挂上":" 未挂上")),B};try{typeof s.inject=="function"?s.inject(F,he):he()}catch(B){console.error("[metaphysics] 等待槽位失败："+F,B);try{he()}catch(Z){console.error("[metaphysics] 直接注册也失败："+F,Z)}}};V("sidebar.panellist",()=>P({name:"sidebar.panellist",id:"metaphysics",order:20,label:()=>"命理 v"+(window.__MP_VER||"")},Ui)),V("main",()=>P({name:"main",key:"metaphysics"},F=>p(Zi,null,p(Ji,F))));const ee=(F,fe)=>{const he=()=>{try{const Z=s.inject(F,fe);return W.contribution=(W.contribution?W.contribution+",":"")+(F.replace("conversation.","")+(typeof Z=="function"?" 已挂上":" 未挂上")),Z}catch(Z){console.error("[metaphysics] 槽位注册失败："+F,Z);try{return fe()}catch(R){console.error("[metaphysics] 直接注册也失败："+F,R);return}}};let B;try{typeof n.effect=="function"?B=n.effect(he,"metaphysics: "+F):B=he()}catch(Z){console.error("[metaphysics] effect 包裹失败："+F,Z),B=he()}typeof B=="function"&&W.seatDisposers.push(B)};ee("conversation.input.right",()=>P({name:"conversation.input.right",id:"metaphysics-ask",order:40},Xa)),ee("conversation.composer.dock",()=>P({name:"conversation.composer.dock",id:"metaphysics-dock",order:60},Wa));let ae=!1;const se=()=>{W.ref||ae||(ae=!0,W.seatOk["conversation.input.right"]||P({name:"conversation.input.right",id:"metaphysics-ask",order:40},Xa),W.seatOk["conversation.composer.dock"]||P({name:"conversation.composer.dock",id:"metaphysics-dock",order:60},Wa))};let a=20;const ge=()=>!!(W.seatOk["conversation.input.right"]&&W.seatOk["conversation.composer.dock"]),ze=()=>{W.ref||a<=0||ge()||(a-=1,se(),!ge()&&setTimeout(ze,700))};try{setTimeout(ze,700)}catch{}try{document.addEventListener("pointerdown",()=>{ae=!1,se()},{once:!0,capture:!0})}catch{}}return{inject:["slots"],apply(n){try{tn(n)}catch(s){console.error("[metaphysics] apply 异常",s)}}}}});
