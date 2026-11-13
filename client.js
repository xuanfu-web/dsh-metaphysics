window.__ModuleLoader__.load({id:"dsh-metaphysics",version:"0.74.0",factory(dt){const Ja=(function(){try{return dt("react")}catch{return globalThis.React}})();if(!Ja)return{inject:[],apply(){}};const r=Ja.createElement,ni={bazi:"client.chart.js",ziwei:"client.chart.js",hepan:"client.chart.js",trend:"client.chart.js",name:"client.name.js",fengshui:"client.fengshui.js",liuyao:"client.liuyao.js",meihua:"client.liuyao.js",qimen:"client.qimen.js",daliuren:"client.daliuren.js",tarot:"client.tarot.js",almanac:"client.almanac.js",convert:"client.convert.js",zeri:"client.zeri.js",chenggu:"client.chenggu.js",xiaoliuren:"client.xiaoliuren.js",star:"client.star.js",numerology:"client.numerology.js",mbti:"client.mbti.js",constitution:"client.constitution.js",wuyunliuqi:"client.wuyunliuqi.js",taiyi:"client.taiyi.js"},si=[{key:"general",label:"综合",dim:null,focus:""},{key:"wealth",label:"财运",dim:"work",focus:"钱财进出的落点主要看「工作与职业选择」与「事业发展」这两条。"},{key:"career",label:"事业",dim:"career",focus:"事业发展这条与你的问题最直接。"},{key:"love",label:"感情",dim:"love",focus:"感情这条与你的问题最直接。"},{key:"health",label:"健康",dim:"health",focus:"健康这条与你的问题最直接；下面只作提醒，不作任何诊断。"},{key:"study",label:"学业",dim:"career",focus:"学业与考试更贴近「事业发展」这条，讲的是长期积累与阶段进展。"},{key:"travel",label:"出行",dim:"overall",focus:"出行与迁动更贴近「整体运势」这条，看的是当下这一段的大环境。"}];window.__MP_VER="0.74.0",window.__MPGroups=[{title:"问一件事",hint:"心里有一件具体的事，起一卦再决定",items:[{k:"liuyao",label:"六爻",tip:"摇六次问事"},{k:"tarot",label:"塔罗",tip:"抽牌看选择"},{k:"meihua",label:"梅花",tip:"见闻起卦"},{k:"qimen",label:"奇门",tip:"看方位时机"},{k:"daliuren",label:"六壬",tip:"占事断来意"},{k:"xiaoliuren",label:"小六壬",tip:"掐指一算"}]},{title:"看一个人",hint:"看自己或身边人的性情与格局",items:[{k:"bazi",label:"八字",tip:"四柱看格局"},{k:"ziwei",label:"紫微",tip:"十二宫细看"},{k:"hepan",label:"合盘",tip:"两人合不合"},{k:"mbti",label:"人格",tip:"16 型问卷"},{k:"constitution",label:"体质",tip:"九种体质"},{k:"chenggu",label:"称骨",tip:"生辰称命重"},{k:"trend",label:"人生K",tip:"一生走势",wide:!0}]},{title:"查日子",hint:"挑时间、换农历，看一年的气与方位",items:[{k:"almanac",label:"黄历",tip:"今日宜忌"},{k:"zeri",label:"择日",tip:"挑好日子"},{k:"convert",label:"农历",tip:"公历农历"},{k:"wuyunliuqi",label:"运气",tip:"一年大势"},{k:"taiyi",label:"太乙",tip:"积年推局"},{k:"fengshui",label:"风水",tip:"房屋朝向"},{k:"name",label:"起名",tip:"八字选字"}]}],window.__MP_UNRELEASED=[];const K={};K.DIRECTIONS=si,K.compute=()=>{throw new Error("命理引擎尚未加载")};const oi=Object.create(null),_t=Object.create(null);function pn(n){return ni[n]||ni.bazi||"client.chart.js"}const pi=()=>typeof performance<"u"&&performance.now?performance.now():Date.now();async function rn(n){const s=pn(n);let z=oi[s];const P=!!z,W=pi();if(!z){if(!dt||typeof dt.async!="function")throw new Error("当前宿主不支持客户端分块加载（require.async 缺失），请升级 DeepSeek Harness");let pe=_t[s];pe||(pe=dt.async(`./${s}`).then(me=>{const re=me&&(me.Engine||me.default);if(!re||typeof re.compute!="function")throw new Error(`命理引擎分块 ${s} 未返回 Engine`);return oi[s]=re,re}),_t[s]=pe,pe.catch(()=>{}).then(()=>{delete _t[s]})),z=await pe}for(const pe of Object.keys(z))z[pe]!==void 0&&(K[pe]=z[pe]);return Array.isArray(K.DIRECTIONS)||(K.DIRECTIONS=si),window.Engine=K,window.__MP_ENGINE_READY__=!0,window.__MP_LAST_LOAD={tab:n,chunk:s,cached:P,ms:Math.round((pi()-W)*10)/10},K}window.__mpEnsureEngine=rn,window.Engine=K,(function(){const n={liuyao:!0,meihua:!0,daliuren:!0,tarot:!0},s=G=>!!n[G],z={general:"other",wealth:"business",career:"career",love:"love",health:"other",study:"career",travel:"action"},P=G=>z[G]||"other",W="#ffffff",pe="#1c1a15";function me(G){const Z=String(G??"").match(/rgba?\(([^)]+)\)/i);if(!Z)return null;const X=Z[1].split(/[,\s/]+/).filter(Boolean).map(Number);return X.length<3||X.slice(0,3).some(B=>!Number.isFinite(B))||X.length>3&&Number.isFinite(X[3])&&X[3]<.95?null:[X[0],X[1],X[2]]}function re(G){const Z=String(G||"").replace("#",""),X=Z.length===3?Z.split("").map(B=>B+B).join(""):Z;return/^[0-9a-f]{6}$/i.test(X)?[0,2,4].map(B=>parseInt(X.slice(B,B+2),16)):null}function xe(G){const Z=X=>{const B=X/255;return B<=.03928?B/12.92:Math.pow((B+.055)/1.055,2.4)};return .2126*Z(G[0])+.7152*Z(G[1])+.0722*Z(G[2])}function t(G,Z){const X=xe(G),B=xe(Z),te=Math.max(X,B),qe=Math.min(X,B);return(te+.05)/(qe+.05)}function ke(G){const Z=typeof G=="string"?me(G):G;return Z?t(Z,re(W))>=t(Z,re(pe))?W:pe:""}function R(G){const Z=String(G??"").trim();if(!Z)return{lines:null,warning:""};const X=Z.split(/[^0-9]+/).filter(Boolean).map(Number),B=X.filter(te=>![6,7,8,9].includes(te));return X.length===6&&B.length===0?{lines:X,warning:""}:{lines:null,warning:X.length!==6?`爻值需要正好 6 个数字（当前 ${X.length} 个），本次按随机摇卦。`:`爻值只能是 6/7/8/9（收到 ${B.join("/")}），本次按随机摇卦。`}}function he(G){const Z=String(G??"").trim();if(!Z)return null;const X=Number(Z);return Number.isFinite(X)?X:null}function ve(G){const Z=G instanceof Date?G:new Date,X=B=>String(B).padStart(2,"0");return`${Z.getFullYear()}-${X(Z.getMonth()+1)}-${X(Z.getDate())}`}window.__MPCore={NEED_ASK:n,needAsk:s,parseLines:R,toNumber:he,parseRGB:me,hexToRGB:re,luminance:xe,contrastRatio:t,pickOnColor:ke,ON_DARK:W,ON_LIGHT:pe,kindOfDirection:P,todayStamp:ve}})(),(function(){const n=`
.pp,.mp-it,.mp-al,.mp-cg,.mp-cl,.mp-cli,.mp-kline,.mp-mb,.mp-mb-paper,.mp-nm,.mp-quick,.mp-cdiff,.mp-shadow,.mp-trace-card,.mp-trace-layer,.mp-prof{--ink:#1b1b1b;--ink2:#3f3a33;--muted:#6f6a60;--label:#8a8378;--faint:#a9a296;
  --line:#c8c1b2;--dimline:#b9b2a4;--hair:#e9e2d3;
  /* 底色略沉作「桌面」，--card 跳到近白：原先 bg 与 card 只差 1/255，卡片感等于零。
     同一色相里塞 9 个几乎相等的浅色，谁都浮不起来。 */
  /* 水墨风：宣纸白为底、淡墨分层；米黄系整体降饱和，纸感靠 --band 的微暖留一点 */
  --bg:#f4f2ec;--card:#fdfdfb;--band:#f7f5ef;--hover:#eeece5;--hover2:#e6e4dc;
  --tri:#eef0ea;--soul:#f7ece9;--sel:#f5efe9;--link:#f0efe9;
  --red:#a02c26;--red-rgb:160,44,38;--lu:#3d5a52;--lu-rgb:61,90,82;
  --quan:#6e5a2e;--quan-rgb:110,90,46;--ke:#3a5568;--ke-rgb:58,85,104;--ji:#a02c26;
  --br-good:#4c7a5c;--br-bad:#9c5b56;--on-accent:var(--on-accent);--wx-metal:#8a6b1f;
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
/* 自化：宫干化回本宫。0.64.0 起不再用徽章，改在星名后画彩色小箭头（见 .pp-zha），
   与生年实心块、大限/流年空心框分成三层——所以这里不再保留 .pp-m.self 样式 */
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
/* 来因宫角标：右上角「因」，与身宫左上角对称；开关 ppm-d-laiyin 控显隐（默认勾） */
.pp-laiyin::after{content:"因";position:absolute;top:4px;right:4px;font-size:12px;color:var(--on-accent);background:var(--ji);padding:0 3px;border-radius:2px;z-index:1}
#ppm-d-laiyin:not(:checked)~.pp-body .pp-laiyin::after{display:none}
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
/* 三视图切换（三视图：飞星/三合/四化）——真分派，不是同一张盘的显隐开关：
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
/* 运曜/流曜行：默认隐藏，勾选「显示运曜和流曜」才显示（限流盘显示组，纯增强） */
.pp-hs{display:none;margin-top:3px;font-size:10.5px;line-height:1.55;color:var(--muted);border-top:1px dashed var(--hair);padding-top:2px}
.pp-hs i{font-style:normal;white-space:nowrap;margin-right:4px}
.pp-hs i em{font-style:normal;color:var(--faint)}
#ppm-d-hs:checked~.pp-body .pp-hs{display:block}
/* 日干四化：宫格下方一行小字（禄权科忌四颗化星落宫），默认隐藏，勾 ppm-d-rigan 才显示 */
.pp-rigan{display:none;margin-top:6px;padding:5px 11px;border:1px solid var(--line);background:var(--band);font-size:12px;line-height:1.7;color:var(--muted)}
.pp-rigan b{color:var(--ink);font-weight:600;margin-right:8px}
.pp-rigan i{font-style:normal;margin-right:10px;white-space:nowrap}
.pp-rigan i em{font-style:normal}
.pp-rigan i .rl{color:var(--lu)}.pp-rigan i .rq{color:var(--quan)}.pp-rigan i .rk{color:var(--ke)}.pp-rigan i .rj{color:var(--ji)}
#ppm-d-rigan:checked~.pp-rigan{display:block}
#ppm-sc-feixing:checked~.pp-body .pp-m.view,
#ppm-sc-feixing:checked~.pp-body .pp-viewhua{display:none}
/* 三合派：四化信息整体退场（生年/自化/大限流年/图例/飞星链 chips/自化箭头） */
#ppm-sc-sanhe:checked~.pp-body .pp-m,
#ppm-sc-sanhe:checked~.pp-body .pp-zha,
#ppm-sc-sanhe:checked~.pp-body .pp-viewhua,
#ppm-sc-sanhe:checked~.pp-flywrap{display:none}
/* 自化箭头：自化是「宫干化回本宫」，箭头画在星名左边、箭头尖顶住星名，
   由左向右弧着落回这颗星——读成「这笔化飞出去又落回自己」。
   为什么必须放星名左边：放右边箭头就朝外，视觉上成了「从本宫飞出去」，意思正好反了。
   为什么 inline 在星名旁而不是绝对定位：宫格左侧会被满星曜的宫撞上（实测压住「紫微 庙」）。 */
.pp-zha{display:inline-block;margin-right:3px;vertical-align:-1px;line-height:0;cursor:help}
.pp-zha .z-a{width:19px;height:8px;display:block;overflow:visible}
.pp-zha .z-shaft{fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round}
.pp-zha .z-head{fill:currentColor;stroke:none}
.pp-zha.lu{color:var(--lu)}.pp-zha.quan{color:var(--quan)}
.pp-zha.ke{color:var(--ke)}.pp-zha.ji{color:var(--ji)}
#ppm-sc-sihe:checked~.pp-flywrap{display:block}
#ppm-sc-feixing:checked~.pp-flywrap{display:block}
/* 自化图例行：箭头颜色跟四化色走 */
.pp-zhlegend{display:flex;gap:10px;align-items:center;justify-content:center;font-size:12px;color:var(--muted);margin-top:4px}
.pp-zhlegend i{font-style:normal;font-weight:600}
.pp-zhlegend .z-lu{color:var(--lu)}.pp-zhlegend .z-quan{color:var(--quan)}
.pp-zhlegend .z-ke{color:var(--ke)}.pp-zhlegend .z-ji{color:var(--ji)}
/* 纸纹：feTurbulence 纤维噪点叠加在盘面底色上，浅色偏灰纤维、暗色同用（低透明度不抢字） */
.pp-paper{position:relative}
.pp::before{content:"";position:absolute;inset:0;pointer-events:none;z-index:0;opacity:.5;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='2' seed='7'/%3E%3CfeColorMatrix values='0 0 0 0 0.32 0 0 0 0 0.29 0 0 0 0 0.24 0 0 0 0.10 0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23p)'/%3E%3C/svg%3E")}
.pp>*{position:relative;z-index:1}
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
.pp-detail .dt-self{margin-right:10px;white-space:nowrap}
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
.mp-wl-h{display:flex;flex-wrap:wrap;gap:8px;padding-bottom:7px}
.mp-wl-y{font-size:15px;font-weight:700}
.mp-wl-z{font-weight:600;color:var(--lu)}
.mp-wl-m,.mp-wl-tm,.mp-wl-tg,.mp-wl-no{font-size:11px;color:var(--label)}
.mp-wl-tag{display:inline-block;margin:0 6px 4px 0;padding:1px 8px;border-radius:999px;background:var(--band)}
.mp-wl-tag.on{background:var(--lu);color:var(--on-accent)}
.mp-wl-sec,.mp-wl-note{font-size:13px;line-height:1.6;padding-bottom:5px}
.mp-wl-sec em{font-style:normal;margin-right:6px}
.mp-wl-steps{display:flex;flex-direction:column;gap:3px}
.mp-wl-step{display:grid;grid-template-columns:16px 1fr 34px auto;gap:7px;font-size:12px;padding:3px 7px;border-radius:7px}
.mp-wl-step.on{background:var(--band);font-weight:600}
.mp-ty-h{display:flex;flex-wrap:wrap;gap:8px;align-items:baseline;padding-bottom:7px}
.mp-ty-y{font-size:15px;font-weight:700}
.mp-ty-j{font-weight:600;color:var(--lu)}
.mp-ty-m{font-size:11px;color:var(--label)}
.mp-pl{padding:8px 2px 2px;margin-top:6px}
.mp-pl-lead{margin:0 0 4px;font-size:14px;font-weight:600;color:var(--ink)}
.mp-pl-how{margin:0;font-size:13px;line-height:1.6;color:var(--ink2)}
.mp-ty-plain{padding:9px 2px 10px;border-top:1px solid var(--hair);margin-top:8px}
.mp-ty-plain p{margin:0 0 6px;font-size:13px;line-height:1.65;color:var(--ink2)}
.mp-ty-plain .mp-ty-lead{font-size:14px;font-weight:600;color:var(--ink)}
.mp-ty-plain .mp-ty-close{font-size:12px;color:var(--label);margin-bottom:0}
.mp-ty-det{margin-top:4px}
.mp-ty-det summary{cursor:pointer;font-size:12px;color:var(--label);padding:4px 0}
.mp-ty-g{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin:2px 0 8px}
.mp-ty-cell{position:relative;border-radius:8px;background:var(--band);padding:7px 6px;text-align:center;font-size:12px;min-height:50px}
.mp-ty-cell b{display:block;font-size:13px}
.mp-ty-cell em{font-style:normal;font-size:11px;color:var(--label)}
.mp-ty-cell.on{background:var(--lu);color:var(--on-accent)}
.mp-ty-cell.on em{color:rgba(255,255,255,.82)}
.mp-ty-cell.mid{opacity:.5}
.mp-ty-mark{position:absolute;top:3px;right:4px;font-style:normal;font-size:10px;padding:0 4px;border-radius:999px;background:var(--on-accent);color:var(--lu)}
.mp-ty-jx{font-weight:600}
.mp-ty-jx.xiong{color:var(--red)}
.mp-ty-jx.buhe{color:var(--quan)}
.mp-ty-jx.daji{color:var(--lu);font-weight:700}
.mp-ty-jx.ji{color:var(--lu)}
.mp-ty-mark.s{top:19px;background:var(--band);color:var(--ink2)}
.mp-ty-mark.w{right:auto;left:4px;color:var(--ink2)}
.mp-ty-sec{font-size:13px;line-height:1.6;padding-bottom:4px}
.mp-ty-sec em{font-style:normal;margin-right:6px;color:var(--label)}
.mp-ty-note{font-size:11px;line-height:1.6;color:var(--label)}
.mp-cs{border-radius:12px;overflow:hidden;background:var(--label);border:1px solid var(--hair)}
.mp-cs-h{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:10px 12px;border-bottom:1px solid var(--hair)}
.mp-cs-main{font-size:20px;font-weight:800;letter-spacing:.04em}
.mp-cs-meta{display:flex;flex-direction:column;gap:1px;flex:1 1 160px;min-width:0}
.mp-cs-meta b{font-size:13px;font-weight:600;line-height:1.5}
.mp-cs-meta i{font-size:12px;font-style:normal;color:var(--ink2)}
.mp-cs-count{font-size:12px;color:var(--ink2);white-space:nowrap}
.mp-cs-bars{display:flex;flex-direction:column;gap:5px;padding:10px 12px 8px}
.mp-cs-row{display:grid;grid-template-columns:52px 1fr 30px 52px;align-items:center;gap:8px;font-size:12px;line-height:1.4}
.mp-cs-row.main{font-weight:700}
.mp-cs-n{white-space:nowrap}
.mp-cs-track{position:relative;height:8px;border-radius:999px;background:var(--band)}
.mp-cs-track i{display:block;height:100%;border-radius:999px;background:var(--dimline)}
.mp-cs-track i.on{background:var(--lu)}
.mp-cs-tick{position:absolute;top:0;bottom:0;width:1px;background:var(--label)}
.mp-cs-v{text-align:right;color:var(--ink)}
.mp-cs-l{color:var(--ink2);font-size:11px}
.mp-cs-sec{padding:2px 12px 6px;font-size:13px;line-height:1.7}
.mp-cs-sec em{display:inline-block;margin-right:6px;padding:0 6px;border-radius:4px;font-style:normal;font-size:11px;background:var(--band);color:var(--ink2)}
.mp-cs-care{padding:4px 12px 8px;font-size:13px;line-height:1.7}
.mp-cs-care b{display:block;margin-bottom:2px}
.mp-cs-care ul{margin:0;padding-left:18px}
.mp-cs-note{padding:6px 12px 10px;font-size:12px;line-height:1.6;color:var(--ink2)}
.mp-cs-paper{padding:8px 12px;font-size:13px;line-height:1.7}
.mp-cs-paper ol{margin:6px 0;padding-left:20px}
.mp-cs-paper li{margin:2px 0}
.mp-cs-no{display:inline-block;min-width:22px;color:var(--ink2);font-variant-numeric:tabular-nums}
.mp-cs-paper li em{margin-left:6px;font-style:normal;font-size:11px;color:var(--ink2)}
.mp-cs-paper .mp-cs-h{display:flex;align-items:center;gap:10px;padding:0 0 6px}
.mp-cs-paper .mp-cs-h i{font-size:12px;font-style:normal;color:var(--ink2)}
.mp-cs-paper .mp-cs-count{font-size:12px;color:var(--ink2)}
.mp-cs-paper .mp-cs-note{font-size:12px;color:var(--ink2)}
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

/* —— 「显示设置」分组（group_fxp / group_4hb / group_3hp）——
   纯 CSS 显隐：勾了盘面立刻变，不重排盘、不进引擎、不进工具 schema。
   复选框必须是 .pp 的直接子元素，才能用 ~ 命中后面的 .pp-body / .pp-zhlegend。
   组1/组2 默认勾（:not(:checked) 才隐藏），组3 默认不勾（:checked 才增强，默认盘观感不变）。 */
.pp-disp{font-family:var(--sans);border-bottom:1px solid var(--line);background:var(--band);font-size:12px}
.pp-disp>summary{cursor:pointer;padding:5px 12px;color:var(--muted);user-select:none;list-style:none;min-height:32px;display:flex;align-items:center}
.pp-disp>summary::-webkit-details-marker{display:none}
.pp-disp>summary::before{content:"▸";margin-right:6px;font-size:10px;color:var(--label)}
.pp-disp[open]>summary::before{content:"▾"}
.pp-disp-g{display:flex;flex-wrap:wrap;gap:2px 14px;padding:3px 12px 8px;border-top:1px dashed var(--hair)}
.pp-disp-g>span{width:100%;font-size:11px;color:var(--label);letter-spacing:.06em;margin-bottom:1px}
.pp-disp label{display:inline-flex;align-items:center;gap:5px;cursor:pointer;color:var(--ink2);user-select:none;padding:2px 0;min-height:26px}
.pp-disp-box{width:13px;height:13px;border:1px solid var(--line);border-radius:3px;background:var(--card);display:inline-block;flex:none}
.pp-disp label:hover .pp-disp-box{border-color:var(--lu)}
/* 勾选态：17 条 :checked 各自点亮自己 label 的方框（复选框与 .pp-disp 同为 .pp 直接子元素） */
#ppm-d-ss:checked~.pp-disp label[for="ppm-d-ss"] .pp-disp-box,
#ppm-d-sbg:checked~.pp-disp label[for="ppm-d-sbg"] .pp-disp-box,
#ppm-d-zha:checked~.pp-disp label[for="ppm-d-zha"] .pp-disp-box,
#ppm-d-ages:checked~.pp-disp label[for="ppm-d-ages"] .pp-disp-box,
#ppm-d-sizhu:checked~.pp-disp label[for="ppm-d-sizhu"] .pp-disp-box,
#ppm-d-small:checked~.pp-disp label[for="ppm-d-small"] .pp-disp-box,
#ppm-d-shen:checked~.pp-disp label[for="ppm-d-shen"] .pp-disp-box,
#ppm-d-hua:checked~.pp-disp label[for="ppm-d-hua"] .pp-disp-box,
#ppm-d-sf:checked~.pp-disp label[for="ppm-d-sf"] .pp-disp-box,
#ppm-d-laiyin:checked~.pp-disp label[for="ppm-d-laiyin"] .pp-disp-box,
#ppm-d-zha-bold:checked~.pp-disp label[for="ppm-d-zha-bold"] .pp-disp-box,
#ppm-d-bad-ink:checked~.pp-disp label[for="ppm-d-bad-ink"] .pp-disp-box,
#ppm-d-bold:checked~.pp-disp label[for="ppm-d-bold"] .pp-disp-box,
#ppm-d-hs:checked~.pp-disp label[for="ppm-d-hs"] .pp-disp-box,
#ppm-d-rigan:checked~.pp-disp label[for="ppm-d-rigan"] .pp-disp-box,
#ppm-d-njq:checked~.pp-disp label[for="ppm-d-njq"] .pp-disp-box,
#ppm-d-tjz:checked~.pp-disp label[for="ppm-d-tjz"] .pp-disp-box{background:var(--lu);border-color:var(--lu);box-shadow:inset 0 0 0 2px var(--card)}
/* 组1 飞星派显示（默认全勾，取消才隐藏） */
#ppm-d-ss:not(:checked)~.pp-body .pp-ss-txt{display:none}
#ppm-d-sbg:not(:checked)~.pp-body .pp-st.st-sbg{display:none}
#ppm-d-zha:not(:checked)~.pp-body .pp-zha{display:none}
#ppm-d-zha:not(:checked)~.pp-zhlegend{display:none}
#ppm-d-ages:not(:checked)~.pp-body .pp-ages{display:none}
#ppm-d-sizhu:not(:checked)~.pp-body .ct-t3{display:none}
/* 非节气四柱行：默认隐藏，勾 ppm-d-njq 才显示（纯增强，不改默认观感） */
.ct-t3nj{font-size:11.5px;letter-spacing:.2em;font-weight:500;color:var(--muted)}
.ct-t3nj .nj-tag{font-style:normal;letter-spacing:.08em;font-size:10px;color:var(--lu);border:1px solid currentColor;border-radius:3px;padding:0 3px;margin-left:6px;vertical-align:1px}
#ppm-d-njq:not(:checked)~.pp-body .ct-t3nj{display:none}
/* 太极点转换信息：详情面板「太极转换」行，默认隐藏，勾 ppm-d-tjz 才显示 */
#ppm-d-tjz:not(:checked)~.pp-body .pp-detail .dt-taiji{display:none}
/* 组2 四化派显示（默认全勾，取消才隐藏） */
#ppm-d-small:not(:checked)~.pp-body .pp-st.aux{display:none}
#ppm-d-shen:not(:checked)~.pp-body .pp-shen::after{display:none}
#ppm-d-hua:not(:checked)~.pp-body .pp-m{display:none}
#ppm-d-sf:not(:checked)~.pp-body .pp-cell.pp-tri{background:var(--bg)}
#ppm-d-sf:not(:checked)~.pp-body .pp-cell.pp-link{background:var(--bg);box-shadow:none}
#ppm-d-sf:not(:checked)~.pp-body svg.pp-sf{display:none}
/* 组3 限流盘增强（默认不勾，勾了才生效；不改默认盘观感） */
#ppm-d-zha-bold:checked~.pp-body .pp-zha .z-shaft{stroke-width:2.8}
#ppm-d-bad-ink:checked~.pp-body .pp-st.bad{color:var(--ink)}
#ppm-d-bad-ink:checked~.pp-body .pp-st.bad::before{content:none}
#ppm-d-bold:checked~.pp-body .pp-st.main,#ppm-d-bold:checked~.pp-body .pp-st.good{font-weight:700}
`,s=window.__PP=window.__PP||{};s.CSS=n;const z={主星:"main",吉星:"good",煞星:"bad",辅星:"aux",杂曜:"aux"},P={禄:"lu",权:"quan",科:"ke",忌:"ji"},W=new Set(["三台","八座","恩光","天贵"]),pe={庙:"good",旺:"good",得:"mid",利:"mid",平:"mid",不:"bad",陷:"bad"},me={巳:[1,1],午:[1,2],未:[1,3],申:[1,4],辰:[2,1],酉:[2,4],卯:[3,1],戌:[3,4],寅:[4,1],丑:[4,2],子:[4,3],亥:[4,4]},re={乾:[1,1,1],兑:[1,1,0],离:[1,0,1],震:[1,0,0],巽:[0,1,1],坎:[0,1,0],艮:[0,0,1],坤:[0,0,0]},xe=["初爻","二爻","三爻","四爻","五爻","上爻"],t=e=>String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),ke=(e,i,p)=>{const b=Math.round(43),x=e?`<rect x="0" y="${2.5}" width="104" height="7" rx="${1.6}" fill="currentColor"/>`:`<rect x="0" y="${2.5}" width="${b}" height="7" rx="${1.6}" fill="currentColor"/><rect x="${b+18}" y="${2.5}" width="${104-b-18}" height="7" rx="${1.6}" fill="currentColor"/>`;return`<svg class="mp-hex${i?" hex-on":""}${p?" "+p:""}" viewBox="0 0 104 12" preserveAspectRatio="none" aria-hidden="true" focusable="false">${x}</svg>`},R={木:"M6 1.6V10.8M6 5.2 2.6 2.2M6 7.4 9.4 4.4",火:"M6 1.4C7.6 3.6 9.2 5.4 9.2 7.6A3.2 3.2 0 0 1 2.8 7.6C2.8 5.4 4.4 3.6 6 1.4Z",土:"M1.6 9.6h8.8M6 2.4v7.2M3.4 5.6h5.2",金:"M6 1.2 10.6 6 6 10.8 1.4 6Z",水:"M1.4 7.2C2.9 4.2 4.5 10.2 6 7.2 7.5 4.2 9.1 10.2 10.6 7.2"},he=e=>{const i=R[e];return i?`<svg class="mp-wxi" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="${i}" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`:""},ve=e=>`<svg class="mp-trig" viewBox="0 0 14 10" aria-hidden="true" focusable="false">${(re[e]||[0,0,0]).slice().reverse().map((l,o)=>{const d=o*4;return l?`<rect x="0" y="${d}" width="14" height="2" rx="0.6" fill="currentColor"/>`:`<rect x="0" y="${d}" width="5.6" height="2" rx="0.6" fill="currentColor"/><rect x="8.4" y="${d}" width="5.6" height="2" rx="0.6" fill="currentColor"/>`}).join("")}</svg>`;s._hexBar=ke,s._wxIcon=he,s._triGlyph=ve;function G(e,i,p){return!e||!e.length?"":e.map(l=>{const o=z[l.type]||"aux",d=l.mutagen?`<i class="pp-m ${P[l.mutagen]}">${l.mutagen}</i>`:"",c=i&&i[l.name],g=c?`<i class="pp-m view ${P[c]}">${c}</i>`:"",m=l.brightness?`<em class="pp-b ${pe[l.brightness]||"mid"}">${l.brightness}</em>`:"",b=l.inTemple?'<em class="pp-b good">庙</em>':"",x=p&&p[l.name]?ma(p[l.name],l.name):"",w=W.has(l.name)?" st-sbg":"";return`<span class="pp-st ${o}${w}">${x}${l.name}${m}${b}${d}${g}</span>`}).join("")}function Z(e){const i=[];for(let p=0;p<6;p++)i.push(e+p*12);return i.join(",")}const X=["命宫","兄弟","夫妻","子女","财帛","疾厄","迁移","交友","官禄","田宅","福德","父母"],B=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],te=e=>(e%12+12)%12,qe=(e,i)=>e!==i&&[te(i+4),te(i+8),te(i+6)].includes(e);function Le(e,i,p,l,o,d,c,g){const m=me[e.branch]||[1,1],b=B.indexOf(e.branch),x=["pp-cell"];b===i?x.push("pp-soul"):qe(b,i)&&x.push("pp-tri"),e.isBody&&x.push("pp-shen"),g&&e.branch===g&&x.push("pp-laiyin"),m[0]===4&&x.push("pp-lastrow"),m[1]===4&&x.push("pp-lastcol");const w=e.shensha||{},$=X[te(i-b)];let C="";if(b===i&&l){const A=_=>(z[_.type]||"")==="main";if(!(e.stars||[]).some(A)){const _=l.find(F=>B.indexOf(F.branch)===te(b+6)),Q=_?(_.stars||[]).filter(A):[];Q.length&&(C=`<div class="pp-borrow" title="命宫无主星，借对宫（迁移宫）主星">借 ${Q.map(F=>F.name).join(" ")}</div>`)}}return`<div class="${x.join(" ")}" data-pi="${b}" data-view="${p}" role="button" tabindex="0" aria-expanded="false" style="grid-row:${m[0]};grid-column:${m[1]}">
      <div class="pp-stars">${G(e.stars,o,Ke(e))}</div>
      ${C}
      <div class="pp-ages">${Z(e.xiaoxian.age)}</div>
      ${bt(e,d)}
      ${qa(e,c)}
      <div class="pp-foot">
        <div class="ft-l">
          <span class="ft-dx"><span class="pp-ss-txt">${w.boshi}</span> ${e.daxian.start}-${e.daxian.end}</span>
          <span class="pp-ss-txt">${w.jiangqian}</span>
          <span class="pp-ss-txt">${w.suiqi}</span>
        </div>
        <div class="ft-r">
          <span class="pp-ss-txt">${w.changsheng}</span>
          <span>${e.ganzhi}</span>
          <span class="ft-pn">${$}</span>
        </div>
      </div>
    </div>`}function ma(e,i){return`<span class="pp-zha ${P[e]}" title="自化${t(e)}：${t(i)}·宫干化回本宫"><svg class="z-a" viewBox="0 0 22 9" role="img" aria-label="自化${t(e)}">
        <path class="z-shaft" d="M1 7C6.6 7 11.4 5.6 17.2 3.2"/>
        <path class="z-head" d="M20.2 2 17.8 4.9 16.6 1.9Z"/>
      </svg></span>`}s._zhaMark=ma;function Ke(e){const i={};for(const p of e.selfHua||[])!p||!p.star||!P[p.type]||i[p.star]||(i[p.star]=p.type);return i}function bt(e,i){const p=i&&i[e.branch]||[];if(!p.length)return"";const l=p.map(o=>`<i class="${P[o.type]||""}" title="${t(o.star)}化${t(o.type)}">${t(o.type)}<em>→${t(o.palace||"未上盘")}</em></i>`).join("");return`<div class="pp-fx">${t(e.ganzhi)}宫干 ${l}</div>`}function qa(e,i){const p=i&&i[e.branch]||null;return p?`<div class="pp-hs">${Object.entries(p).map(([o,d])=>`<i>${t(o)}<em>${t(d)}</em></i>`).join("")}</div>`:""}function Va(e){try{const i=window.Engine||window.__PP&&window.__PP.Engine;if(!i||!i.buildBazi||!e.input)return"";const p=i.buildBazi({year:e.input.year,month:e.input.month,day:e.input.day,hour:e.input.hour,minute:e.input.minute,gender:e.input.gender,trueSolar:!1});return["year","month","day","hour"].map(l=>p.pillars[l].ganzhi).join(" ")}catch{return""}}function Na(e){try{const i=window.Engine||window.__PP&&window.__PP.Engine;return!i||!i.buildBazi||!e.input?null:i.buildBazi({year:e.input.year,month:e.input.month,day:e.input.day,hour:e.input.hour,minute:e.input.minute,gender:e.input.gender,trueSolar:!1}).pillars.day.stem}catch{return null}}s.ziweiHTML=function(e){const i=B.indexOf(e.soul.branch),p=e.liunian&&e.liunian[0]||null,l=p?p.age:1,o=e.palaces.find(j=>l>=j.daxian.start&&l<=j.daxian.end)||e.palaces[0],d=B.indexOf(o.branch),c=p?B.indexOf(p.lifePalace.branch):i,g=j=>{const q={};for(const E of j||[])E&&E.star&&(q[E.star]=E.type);return q},m=(e.daxianList||[]).find(j=>j.branch===o.branch)||null,b={da:g(m&&m.mutagenHits),ln:g(p&&p.mutagenHits)},x={};for(const j of e.daxianList||[])x[j.branch]=j.mutagenHits||[];const w=(()=>{const j=Na(e);if(!j)return null;const q=(e.daxianList||[]).find(ne=>ne.stem===j);if(!q)return null;const E={};for(const ne of e.palaces)for(const be of ne.stars||[])be.name in E||(E[be.name]=ne.branch);return{stem:j,items:(q.mutagenHits||[]).map(ne=>({type:ne.type,star:ne.star,branch:E[ne.star]||null,palace:E[ne.star]?(e.palaces.find(be=>be.branch===E[ne.star])||{}).palace:null}))}})();let $=null;if(p){$={};for(const[j,q]of Object.entries(p))/^(流|年解)/.test(j)&&typeof q=="string"&&B.includes(q)&&($[q]=$[q]||{},$[q][j]=q)}const C={da:m&&m.yunStars?(()=>{const j={};for(const[q,E]of Object.entries(m.yunStars))(j[E]=j[E]||{})[q]=E;if(m.yunSuiqi)for(const[q,E]of Object.entries(m.yunSuiqi))(j[E]=j[E]||{})[q]=E;if(m.yunJiangqian)for(const[q,E]of Object.entries(m.yunJiangqian))(j[E]=j[E]||{})[q]=E;return j})():null,ln:$};if(e.liunian&&e.liunian.length){const j=e.liunian.find(q=>q.ganzhi===(e._lnSel||e.liunian[0].ganzhi))||e.liunian[0];if(j.lnSuiqi)for(const[q,E]of Object.entries(j.lnSuiqi))($[E]=$[E]||{})[q]=E;if(j.lnJiangqian)for(const[q,E]of Object.entries(j.lnJiangqian))($[E]=$[E]||{})[q]=E}const A=(j,q)=>e.palaces.map(E=>Le(E,j,q,e.palaces,b[q]||null,x,C[q]||null,e.laiyin&&e.laiyin.branch)).join(""),_=(j,q)=>`<div class="pp-center">
        ${q==="da"?`<div class="ct-t1">大限 ${o.ganzhi}　${o.daxian.start}-${o.daxian.end}岁</div>`:q==="ln"&&p?`<div class="ct-t1">流年 ${p.ganzhi}　${p.age}岁</div>`:`<div class="ct-t1">${e.daxian.rule.slice(0,2)}　${e.bureau.name}</div>`}
        <div class="ct-t2">公历 ${e.input.year}-${String(e.input.month).padStart(2,"0")}-${String(e.input.day).padStart(2,"0")} ${String(e.input.hour).padStart(2,"0")}:${String(e.input.minute).padStart(2,"0")}</div>
        <div class="ct-t2">农历 ${e.lunar.year}年${e.lunar.isLeap?`闰${e.lunar.monthRaw||e.lunar.month}`:e.lunar.month}月${e.lunar.day}日${e.hourBranch}时${e.lunar.isLeap&&e.lunar.monthRaw&&e.lunar.month!==e.lunar.monthRaw?`（按${e.lunar.month}月起盘）`:""}</div>
        ${Va(e)?`<div class="ct-t3">${Va(e)}</div>`:""}
        ${e.nonJieqi?`<div class="ct-t3 ct-t3nj" title="${t(e.nonJieqi.note)}">${e.nonJieqi.year} ${e.nonJieqi.month} ${e.nonJieqi.day} ${e.nonJieqi.hour}<em class="nj-tag">非节气</em></div>`:""}
        <div class="ct-t4">命主 ${e.lifeMaster}${e.lifeMasterNote?`<span class="pp-dim" title="${t(e.lifeMasterNote)}">＊</span>`:""}　身主 ${e.bodyMaster}${e.bodyMasterNote?`<span class="pp-dim" title="${t(e.bodyMasterNote)}">＊</span>`:""}</div>
        <div class="ct-t4">命宫 ${e.soul.branch}　身宫 ${e.body.branch}　五行局 ${e.bureau.name}</div>
        <div class="ct-t4">子年斗君 ${e.doujun?e.doujun.zinian:"—"}　流年斗君 ${p&&p.doujun?p.doujun:"—"}</div>
        <div class="ct-t4">紫微 ${e.ziwei}　天府 ${e.tianfu}　${q==="da"?"大限命宫 "+B[d]:q==="ln"?"流年命宫 "+B[c]:"本命命宫 "+e.soul.branch}</div>
        ${q==="da"||q==="ln"?`<div class="ct-t4 pp-viewhua">${q==="da"?"大限":"流年"}四化　${(q==="da"?b.da:b.ln)&&Object.keys(q==="da"?b.da:b.ln).length?Object.entries(q==="da"?b.da:b.ln).map(([ne,be])=>`${ne}化${be}`).join("　"):'<span class="pp-dim">未飞四化</span>'}</div>`:""}
        <div class="pp-legend"><span class="pp-m lu">禄</span><span class="pp-m quan">权</span><span class="pp-m ke">科</span><span class="pp-m ji">忌</span><span>实心=生年四化　空心=大限/流年四化　箭头=自化　红框=命宫　浅底=三方四正</span></div>
      </div>`,Q=(j,q,E)=>`<div class="pp-body ${j}" data-view="${E}" data-soul="${q}"><div class="pp-grid">${A(q,E)}${_(q,E)}</div><div class="pp-detail"></div></div>`,F=e.changqu,L=F?`<div class="pp-chips">
      <span class="pp-chip">昌 ${F.wenchang.branch}（${F.wenchang.palace}）</span>
      <span class="pp-chip">曲 ${F.wenqu.branch}（${F.wenqu.palace}）</span>
      <span class="pp-chip">${F.relation}</span>
      <span class="pp-chip">入命三方 ${F.inSoulSanfang?"是":"否"}</span>
      <span class="pp-chip ${F.absorb.label==="杂"?"warn":"ok"}">吸收·${F.absorb.label}</span>
    </div>`:"",O=(e.patterns||[]).length?`<div class="pp-chips">${e.patterns.map(j=>{const q=j.status==="broken"&&Array.isArray(j.breaks)&&j.breaks.length,E=`${j.evidence||""}${q?`；破格：${j.breaks.join("；")}`:""}`;return`<span class="pp-chip ${q?"broken":j.tone==="good"?"ok":j.tone==="bad"?"warn":""}" title="${t(E)}">${j.name}${q?"（破格）":""}</span>`}).join("")}</div>`:"",le=(e.daxianList||[]).length?`<div class="pp-chips">${e.daxianList.slice(0,8).map(j=>`<span class="pp-chip" title="${t(`${j.ganzhi} 宫干四化：`+j.mutagenHits.map(q=>`${q.star}化${q.type}→${q.palace||"未上盘"}`).join("、"))}">${j.branch} ${j.ages[0]}-${j.ages[1]}</span>`).join("")}</div>`:"",N=p&&p.mutagenHits&&p.mutagenHits.length?`<div class="pp-chips">${p.mutagenHits.map(j=>`<span class="pp-chip ${j.type==="忌"?"warn":j.type==="禄"?"ok":""}">${j.star}化${j.type}→${j.palace||"未上盘"}</span>`).join("")}</div>`:"",I=e.zuoyao,f=I?I.placed&&I.placed.length?`<div class="pp-sec"><div class="pp-sec-h">杂曜全表 · 已排 ${I.placed.length} 颗（${I.starTotal} 颗盘）</div>
        <div class="pp-chips">${I.placed.map(j=>`<span class="pp-chip${j.inTemple?" ok":""}" title="${t(j.meaning||"")}">${t(j.name)} ${t(j.branch)}（${t(j.palace)}）${j.inTemple?"·庙":""}</span>`).join("")}</div>
        <details class="pp-zy"><summary>逐颗安星诀（${I.placed.length} 条 · 出多处近代通行辑本并核，属通行说，不是《全书》原文）</summary><div class="pp-zy-v">${t(I.verses).replace(/\n/g,"<br>")}</div></div></details>
        ${I.skipped&&I.skipped.length?`<div class="pp-zy-s">${I.skipped.map(j=>t(j)).join("")}</div>`:""}</div>`:`<div class="pp-sec"><div class="pp-sec-h">杂曜 · 本盘 ${I.starTotal} 颗（通行简盘）</div>
        <div class="pp-zy-s">开「杂曜全表」追加十二颗：解神·天巫·天月·阴煞（生月）／天官·天福·天厨（生年干）／蜚廉·天德·年解（生年支）／天才（命宫＋生年支）·天寿（身宫＋生年支）。${I.skipped&&I.skipped.length?`不另立：${I.skipped.map(j=>t(j)).join("")}`:""}</div></div>`:"",ie=e.flyChains?(()=>{const j=["禄","权","科","忌"].map(q=>{const E=e.flyChains[q];if(!E||!E.steps.length)return"";const ne=E.path.map(je=>String(je).replace(/宫$/,"")).join("→"),be=E.steps.map(je=>`${je.from}（${je.fromStem}）化${q}${je.star}→${je.to}`).join("；");return`<span class="pp-chip ${q==="忌"?"warn":q==="禄"?"ok":""}" title="${t(be)}">飞${q} ${t(ne)}${E.closed?"↺":""}</span>`}).join("");return j?`<div class="pp-chips">${j}</div>`:""})():"",V=e.flyComposite&&Array.isArray(e.flyComposite.labels)&&e.flyComposite.labels.length?`<div class="pp-chips">${e.flyComposite.labels.map(j=>{const q=/忌/.test(j)?"warn":/自化/.test(j)?"":"ok",E=se=>String(se).replace(/^.*?会/,"").replace(/^禄忌同宫/,"").replace(/自化$/,""),ne=(e.flyComposite.targets||[]).find(se=>se.palace===E(j)),be=ne?ne.incoming.map(se=>`${se.from}化${se.type}${se.star}`).join("、"):e.flyComposite.note;return`<span class="pp-chip ${q}" title="${t(be)}">三方四正 ${t(j)}</span>`}).join("")}</div>`:"",ee=e.flow,Te=ee?(()=>{const j=be=>(be.mutagenHits||[]).length?be.mutagenHits.map(se=>`<i>${se.star}化${se.type}<em>→${se.palace||"未上盘"}</em></i>`).join(""):'<i class="dim">宫干无四化</i>',q=(be,se,je)=>`<div class="flow-row"><b>${be}</b><span class="flow-p"><span class="flow-k">${se.ganzhi||"—"}　落${se.palace||"未上盘"}（${se.branch}）</span>${je?`<em class="flow-same">${je}</em>`:""}</span><span class="flow-m">${j(se)}</span></div>`,ne=ee.day.branch===ee.month.branch?"（日数走满一圈，故同宫）":"";return`<div class="pp-flow">
        <div class="flow-row"><b>基准</b><span class="flow-p">${ee.asOf.solar}</span><span class="flow-m">农历 ${ee.asOf.lunar}　流年 ${ee.asOf.yearGanzhi}（斗君 ${ee.year.doujun}）</span></div>
        ${q(`流月 ${ee.month.index} 月`,ee.month)}
        ${q(`流日 ${ee.day.index} 日`,ee.day,ne)}
        ${q(`流时 ${B[ee.hour.hourIndex]}时`,ee.hour)}
      </div>`})():"";return s._zw=e,s.briefHTML(e)+`<div class="pp">
      <input type="radio" name="ppm" id="ppm-ben" class="pp-r" checked>
      <input type="radio" name="ppm" id="ppm-da" class="pp-r">
      <input type="radio" name="ppm" id="ppm-ln" class="pp-r">
      <input type="radio" name="ppm-sc" id="ppm-sc-sihe" class="pp-r" checked>
      <input type="radio" name="ppm-sc" id="ppm-sc-feixing" class="pp-r">
      <input type="radio" name="ppm-sc" id="ppm-sc-sanhe" class="pp-r">
      <!-- 显示设置：14 个复选框必须与 .pp-body / .pp-zhlegend 同层（.pp 的直接子元素）。
           组1/组2 默认勾（观感与旧版一致），组3 默认不勾（纯增强）。不重排盘、不进引擎。 -->
      <input type="checkbox" id="ppm-d-ss" class="pp-r" checked>
      <input type="checkbox" id="ppm-d-sbg" class="pp-r" checked>
      <input type="checkbox" id="ppm-d-zha" class="pp-r" checked>
      <input type="checkbox" id="ppm-d-ages" class="pp-r" checked>
      <input type="checkbox" id="ppm-d-sizhu" class="pp-r" checked>
      <input type="checkbox" id="ppm-d-small" class="pp-r" checked>
      <input type="checkbox" id="ppm-d-shen" class="pp-r" checked>
      <input type="checkbox" id="ppm-d-hua" class="pp-r" checked>
      <input type="checkbox" id="ppm-d-sf" class="pp-r" checked>
      <input type="checkbox" id="ppm-d-laiyin" class="pp-r" checked>
      <input type="checkbox" id="ppm-d-zha-bold" class="pp-r">
      <input type="checkbox" id="ppm-d-bad-ink" class="pp-r">
      <input type="checkbox" id="ppm-d-bold" class="pp-r">
      <input type="checkbox" id="ppm-d-hs" class="pp-r">
      <input type="checkbox" id="ppm-d-rigan" class="pp-r">
      <input type="checkbox" id="ppm-d-njq" class="pp-r">
      <input type="checkbox" id="ppm-d-tjz" class="pp-r">
      <details class="pp-disp">
        <summary>显示设置 · 17 项</summary>
        <div class="pp-disp-g"><span>飞星派显示</span>
          <label for="ppm-d-ss"><i class="pp-disp-box"></i>显示神煞</label>
          <label for="ppm-d-sbg"><i class="pp-disp-box"></i>三台八座恩光天贵</label>
          <label for="ppm-d-zha"><i class="pp-disp-box"></i>彩色箭头标识自化</label>
          <label for="ppm-d-ages"><i class="pp-disp-box"></i>流年虚岁年龄</label>
          <label for="ppm-d-sizhu"><i class="pp-disp-box"></i>中宫八字</label>
          <label for="ppm-d-rigan"><i class="pp-disp-box"></i>显示日干四化</label>
          <label for="ppm-d-njq"><i class="pp-disp-box"></i>显示非节气四柱</label>
          <label for="ppm-d-tjz"><i class="pp-disp-box"></i>显示太极点转换信息</label>
        </div>
        <div class="pp-disp-g"><span>四化派显示</span>
          <label for="ppm-d-small"><i class="pp-disp-box"></i>显示小星</label>
          <label for="ppm-d-shen"><i class="pp-disp-box"></i>显示身宫</label>
          <label for="ppm-d-hua"><i class="pp-disp-box"></i>显示命宫四化</label>
          <label for="ppm-d-sf"><i class="pp-disp-box"></i>显示三方四正</label>
          <label for="ppm-d-laiyin"><i class="pp-disp-box"></i>显示来因宫</label>
        </div>
        <div class="pp-disp-g"><span>限流盘显示</span>
          <label for="ppm-d-zha-bold"><i class="pp-disp-box"></i>自化箭头加粗</label>
          <label for="ppm-d-bad-ink"><i class="pp-disp-box"></i>六煞星黑字</label>
          <label for="ppm-d-bold"><i class="pp-disp-box"></i>主辅星加粗</label>
          <label for="ppm-d-hs"><i class="pp-disp-box"></i>显示运曜和流曜</label>
        </div>
      </details>
      <div class="pp-modes">
        <label for="ppm-ben">本命</label><label for="ppm-da">大限</label><label for="ppm-ln">流年</label>
        <span class="pp-soon">点任一宫位看详情</span>
      </div>
      <div class="pp-modes pp-schools">
        <label for="ppm-sc-sihe">四化</label><label for="ppm-sc-feixing">飞星</label><label for="ppm-sc-sanhe">三合</label>
      </div>
      ${Q("ben",i,"ben")}
      ${Q("da",d,"da")}
      ${Q("ln",c,"ln")}
      ${(()=>{if(!w)return"";const j={禄:"rl",权:"rq",科:"rk",忌:"rj"},q=w.items.map(E=>`<i><em class="${j[E.type]||""}">${E.type}</em>${t(E.star)}<em>${t(E.branch||"?")}${E.palace?`·${t(E.palace)}`:""}</em></i>`).join("");return`<div class="pp-rigan"><b>日干${t(w.stem)}四化</b>${q}</div>`})()}      ${(()=>{if(!w)return"";const j={禄:"rl",权:"rq",科:"rk",忌:"rj"},q=w.items.map(E=>`<i><em class="${j[E.type]||""}">${E.type}</em>${t(E.star)}<em>${t(E.branch||"?")}${E.palace?`·${t(E.palace)}`:""}</em></i>`).join("");return`<div class="pp-rigan"><b>日干${t(w.stem)}四化</b>${q}</div>`})()}
      <div class="pp-zhlegend">自化图示　<span class="z-lu">${s._zhaMark("禄","本宫")}禄</span><span class="z-quan">${s._zhaMark("权","本宫")}权</span><span class="z-ke">${s._zhaMark("科","本宫")}科</span><span class="z-ji">${s._zhaMark("忌","本宫")}忌</span></div>
      <div class="pp-flywrap">${ie}${V}</div>
    </div>${Te}${L}${O}${le}${N}${f}`};function ua(e){return e.length?e.map(i=>{const p=z[i.type]||"aux",l=i.brightness?`<em class="dt-br ${pe[i.brightness]||"mid"}">${i.brightness}</em>`:"",o=i.inTemple?'<em class="dt-br good">庙</em>':"",d=i.mutagen?`<i class="pp-m ${P[i.mutagen]}">${i.mutagen}</i>`:"";return`<span class="dt-st ${p}">${i.name}${l}${o}${d}</span>`}).join(""):'<span class="dt-empty">无</span>'}function ga(e,i){const p=s._zw;if(!p)return"";const l=N=>p.palaces.find(I=>B.indexOf(I.branch)===N),o=l(e)||p.palaces.find(N=>B.indexOf(N.branch)===e);if(!o)return"";const d=B.indexOf(o.branch),c=X[te(i-d)],g=o.shensha||{},m=o.stars.filter(N=>N.type==="主星"),b=o.stars.filter(N=>N.type==="吉星"||N.type==="辅星"),x=o.stars.filter(N=>N.type==="煞星"),w=o.stars.filter(N=>!["主星","吉星","辅星","煞星"].includes(N.type)),$=(o.selfHua||[]).length?o.selfHua.map(N=>`<span class="dt-self">${ma(N.type,N.star||"本宫")}${t(N.star||"")}</span>`).join(""):'<span class="dt-empty">无</span>',C=[te(d+4),te(d+8),te(d+6)].map(N=>{const I=l(N),f=X[te(i-N)],ie=I?I.stars.filter(ee=>ee.type==="主星").map(ee=>ee.name).join("、"):"",V=N===te(d+6)?"对宫":"三合";return`<span class="dt-st">${f}[${B[N]}]<b>${ie||"无主星"}</b><em>${V}</em></span>`}).join(""),A=l(te(d+6)),_=A?A.stars.filter(N=>N.type==="主星"):[],Q=m.length?ua(m):`<span class="dt-empty">无主星</span><span class="dt-tri">　借对宫 <b>${_.length?_.map(N=>N.name).join("、"):"亦无主星"}</b></span>`,F=(N,I)=>`<div class="dt-dr"><span class="dt-k">${N}</span><div class="dt-v">${I}</div></div>`,L=X.length,O=te(i-d),le=X.map((N,I)=>{const f=te(d+(I-O+L)%L);return`<span class="dt-st">${X[I]}[${B[f]}]</span>`}).join("");return`<div class="dt-dh">
        <b>${c}</b><span>${o.branch}宫 · ${o.ganzhi}</span>
        <span>大限 ${o.daxian.start}-${o.daxian.end}</span>
        <span>小限起 ${o.xiaoxian.age} 岁</span>
        ${o.isBody?"<span>· 身宫</span>":""}
        <span class="dt-x" data-pp-close="1">收起</span>
      </div>
      ${F("主星",Q)}
      ${F("吉辅",ua(b))}
      ${x.length?F("煞星",ua(x)):""}
      ${w.length?F("杂曜",ua(w)):""}
      ${F("宫干四化",$)}
      ${F("十二神",`<span class="dt-tri">长生 ${g.changsheng||"—"}　博士 ${g.boshi||"—"}　将前 ${g.jiangqian||"—"}　岁前 ${g.suiqi||"—"}</span>`)}
      ${F("三方四正",`<span class="dt-tri">${C}</span>`)}
      ${F("太极转换",`<span class="dt-tri dt-taiji">以${c}[${o.branch}]立太极${le}</span>`)}
      <div class="hint">三方四正在盘上已同步标出（浅红描边）。再点一次本宫可收起。</div>`}function Ma(e){e.querySelectorAll(".pp-cell.pp-sel,.pp-cell.pp-link").forEach(i=>{i.classList.remove("pp-sel"),i.classList.remove("pp-link")}),e.querySelectorAll('.pp-cell[aria-expanded="true"]').forEach(i=>i.setAttribute("aria-expanded","false"))}const Ca={};function ht(e,i){oa(e);const p=e.querySelector(".pp-grid");if(!p)return;const l=[i,(i+6)%12,(i+4)%12,(i+8)%12],o=m=>{const b=e.querySelector('.pp-cell[data-pi="'+m+'"]');if(!b)return null;const x=Number(b.style.gridRow),w=Number(b.style.gridColumn),$=Math.min(75,Math.max(25,(x-.5)*25));return w===1?[25,$]:[75,$]},d=l.map(o);if(d.some(m=>!m))return;const c=document.createElementNS("http://www.w3.org/2000/svg","svg");c.setAttribute("class","pp-sf"),c.setAttribute("viewBox","0 0 100 100"),c.setAttribute("preserveAspectRatio","none");const g=(m,b,x,w)=>{const $=document.createElementNS("http://www.w3.org/2000/svg","line");$.setAttribute("x1",m),$.setAttribute("y1",b),$.setAttribute("x2",x),$.setAttribute("y2",w),c.appendChild($)};g(d[0][0],d[0][1],d[1][0],d[1][1]),g(d[1][0],d[1][1],d[2][0],d[2][1]),g(d[2][0],d[2][1],d[3][0],d[3][1]),g(d[3][0],d[3][1],d[0][0],d[0][1]);for(let m=0;m<4;m++){const b=document.createElementNS("http://www.w3.org/2000/svg","circle");b.setAttribute("cx",d[m][0]),b.setAttribute("cy",d[m][1]),b.setAttribute("r",m===0?.9:.7),m===0&&b.setAttribute("style","fill:var(--red);opacity:.85"),c.appendChild(b)}p.style.position="relative",p.appendChild(c)}function oa(e){const i=e.querySelector("svg.pp-sf");i&&i.remove()}function fa(){if(fa.done||typeof document>"u"||!document.addEventListener)return;fa.done=!0;const e=i=>{const p=i.closest(".pp-body");if(!p)return;const l=p.querySelector(".pp-detail");if(!l)return;if(i.classList.contains("pp-sel")){Ma(p),oa(p),l.classList.remove("open"),l.innerHTML="";return}Ma(p);const o=Number(i.dataset.pi),d=Number(p.dataset.soul);ht(p,o),p.querySelectorAll(".pp-cell").forEach(g=>{const m=Number(g.dataset.pi);(m===te(o+4)||m===te(o+8)||m===te(o+6))&&g.classList.add("pp-link")}),i.classList.add("pp-sel"),i.setAttribute("aria-expanded","true"),l.innerHTML=ga(o,d),l.classList.add("open")};document.addEventListener("click",i=>{const p=i.target;if(p&&p.closest&&p.closest("[data-pp-close]")){const o=p.closest(".pp-body");if(o){Ma(o),oa(o);const d=o.querySelector(".pp-detail");d&&(d.classList.remove("open"),d.innerHTML="");return}}const l=p&&p.closest?p.closest(".pp-cell[data-pi]"):null;l&&e(l)}),document.addEventListener("keydown",i=>{if(i.key!=="Enter"&&i.key!==" ")return;const p=i.target&&i.target.closest?i.target.closest(".pp-cell[data-pi]"):null;p&&(i.preventDefault(),e(p))})}s.bindZiwei=fa,s._palaceDetailHTML=ga,fa();function Je(e,i){const p=i||{},l=e.slice().sort((o,d)=>d.position-o.position);return p.plain?l.map(o=>`<div class="mp-hy-row hy-plain">
        <span class="mp-hy-nm">${o.name||xe[o.position-1]}</span>
        ${ke(o.yinYang==="阳",o.moving)}
      </div>`).join(""):l.map(o=>{const d=o.yinYang==="阳",c=p.shiYing?o.position===p.shi?'<span class="mp-hy-sy">世</span>':o.position===p.ying?'<span class="mp-hy-sy">应</span>':"<span></span>":"<span></span>",g=o.moving?`<i class="mp-hy-mv" title="动爻">${d?"○":"×"}</i>`:'<i class="mp-hy-mv"></i>';return`<div class="mp-hy-row">
        ${c}
        <span class="mp-hy-nm">${o.name||xe[o.position-1]}</span>
        <span class="mp-hy-ln">${ke(d,o.moving)}${g}</span>
        <span class="mp-hy-gz">${t(o.ganzhi||"")}</span>
        <span class="mp-hy-lq">${t(o.liuqin||"")}</span>
        <span class="mp-hy-ls">${t(o.liushen||"")}</span>
      </div>`}).join("")}s.liuyaoHTML=function(e){const i=(L,O,le,N)=>`<div class="mp-hy-box">
      <div class="mp-hy-h"><b>${L}</b><span>${O}</span></div>
      <div class="mp-hy">${Je(N,{shiYing:!0,shi:le.shi,ying:le.ying})}</div>
    </div>`,p=i(`本卦 ${e.ben.name}`,`${e.ben.palace} · ${e.ben.palaceElement}`,e.ben,e.ben.lines),l=e.bian?i(`变卦 ${e.bian.name}`,`${e.bian.palace} · ${e.bian.palaceElement}`,e.bian,e.bian.lines):`<div class="mp-hy-box"><div class="mp-hy-h"><b>六爻安静</b><span>无动爻，不取变卦</span></div>
          <div class="pp-dim" style="font-size:12px;line-height:1.9">断卦以本卦卦辞与世应生克为主。</div></div>`,o=e.body&&Array.isArray(e.body.labels)?e.body.labels:[],d=o.length?`<div class="pp-chips">${o.map(L=>`<span class="pp-chip ${/伏吟/.test(L)||/反吟/.test(L)||/化退神/.test(L)?"warn":/六冲|散/.test(L)?"":"ok"}">${t(L)}</span>`).join("")}</div>`:'<div class="pp-chips"><span class="pp-chip">卦体无六冲、六合、伏吟、反吟</span></div>',c=e.useGod&&e.useGod.liuqin?e.useGod:null,g=c?`<div class="pp-chips">${c.labels.map(L=>`<span class="pp-chip ${/空亡|退神|受克|泄气|不上卦/.test(L)?"warn":/持世|化进|六合|得飞神生/.test(L)?"ok":""}">${t(L)}</span>`).join("")}</div>`:'<div class="pp-chips"><span class="pp-chip">用神未取（未指明所问之事）</span></div>',m=e.useGodStrength&&Array.isArray(e.useGodStrength.labels)?e.useGodStrength:null,b=m&&m.labels.length?`<div class="pp-chips">${m.labels.map(L=>`<span class="pp-chip ${/死|囚|月破|受日辰克|泄|耗/.test(L)?"warn":/旺|相|得日辰生|比和/.test(L)?"ok":""}">${t(L)}</span>`).join("")}</div>`:"",x=e.fushenAccess&&Array.isArray(e.fushenAccess.labels)?e.fushenAccess:null,w=x&&x.labels.length?`<div class="pp-chips">${x.labels.map(L=>`<span class="pp-chip ${/可出/.test(L)?"ok":/受压难出|有助有压/.test(L)?"warn":""}">伏神${t(L)}</span>`).join("")}</div>`:"",$=e.yingqi&&Array.isArray(e.yingqi.labels)?e.yingqi:null,C=$&&$.labels.length?`<div class="pp-chips">${$.labels.map(L=>`<span class="pp-chip ${/应期偏速/.test(L)?"ok":/应期待解/.test(L)?"warn":""}" title="只列地支，不出日期">${t(L)}</span>`).join("")}</div>`:"",A=e.jinTuiPower&&Array.isArray(e.jinTuiPower.labels)?e.jinTuiPower:null,_=A&&A.labels.length?`<div class="pp-chips">${A.labels.map(L=>`<span class="pp-chip ${/后劲足|退得缓/.test(L)?"ok":/有限|进得虚|退得实|月破|未定/.test(L)?"warn":""}">${t(L)}</span>`).join("")}</div>`:"",Q=e.hexStrength&&Array.isArray(e.hexStrength.labels)?e.hexStrength:null,F=Q&&Q.labels.length?`<div class="pp-chips">${Q.labels.map(L=>`<span class="pp-chip ${/死|囚|月破|冲空/.test(L)?"warn":/旺|相/.test(L)?"ok":""}">${t(L)}</span>`).join("")}</div>`:"";return s.briefHTML(e)+`<div class="pp" style="padding:14px">
      <div class="mp-mh-head">起卦 ${e.cast.notation.join("、")}（自下而上）　日辰 ${e.dayGanZhi.name}</div>
      <div class="mp-hy-wrap">${p}${l}</div>
      ${d}
      ${g}
      ${b}
      ${w}
      ${C}
      ${_}
      ${F}
    </div>`},s.meihuaHTML=function(e){const i=(C,A,_,Q,F)=>{const O=[...re[Q]||[0,0,0],...re[_]||[0,0,0]].slice().reverse().map(le=>ke(!!le,!1,"sm")).join("");return`<div class="mp-hexbox hb-mini">
        <div class="hb-h">${C}</div>
        <div class="hb-n">${A}</div>
        <div class="mp-mh-mini">${O}</div>
        <div class="hb-s">${F||`上${_} 下${Q}`}</div>
      </div>`},p=e.lines.slice().sort((C,A)=>A.position-C.position),l=p.slice(0,3),o=p.slice(3),d=e.moving>=4,c=(C,A,_,Q)=>`<div class="mp-trib">
      <div class="mp-trib-h">${C} ${ve(A)}${A}${La(A)}<span class="mp-tritag ${Q?"tritag-ti":"tritag-yong"}">${Q?"体":"用"}</span></div>
      <div class="mp-hy" style="gap:5px">${Je(_,{plain:!0})}</div>
    </div>`,g=`<div class="mp-hexbox">
      <div class="hb-h"><span>本卦</span><span>动 ${e.movingName}</span></div>
      <div class="hb-n">${e.ben.name}</div>
      ${c("上卦",e.ben.upper,l,!d)}
      ${c("下卦",e.ben.lower,o,d)}
      <div class="hb-s">${e.source}</div>
    </div>`,m=e.bodyUse.level,b=m.includes("凶")?"bad":m.includes("吉")?"good":"flat",x=`<div class="mp-mh-rel">
      <div><b>体</b>${e.bodyUse.body.trigram}（${e.bodyUse.body.element}）　<b>用</b>${e.bodyUse.use.trigram}（${e.bodyUse.use.element}）</div>
      <div><span class="mh-lv ${b}">${m}</span>　${e.bodyUse.relation}</div>
    </div>`,w=Ta(e.cuo.name)||["",""],$=Ta(e.zong.name)||["",""];return s.briefHTML(e)+`<div class="pp mp-mh">
      <div class="mp-mh-main">
        ${g}
        ${i("互卦",e.hu.name,e.hu.upper,e.hu.lower,"中藏之象")}
        ${i("变卦",e.bian.name,e.bian.upper,e.bian.lower,`动 ${e.movingName} 后`)}
        ${i("错卦",e.cuo.name,w[0],w[1],"六爻全变")}
        ${i("综卦",e.zong.name,$[0],$[1],"整卦倒转")}
      </div>
      ${x}
    </div>`};const Aa={乾为天:["乾","乾"],天风姤:["乾","巽"],天山遁:["乾","艮"],天地否:["乾","坤"],风地观:["巽","坤"],山地剥:["艮","坤"],火地晋:["离","坤"],火天大有:["离","乾"],坎为水:["坎","坎"],水泽节:["坎","兑"],水雷屯:["坎","震"],水火既济:["坎","离"],泽火革:["兑","离"],雷火丰:["震","离"],地火明夷:["坤","离"],地水师:["坤","坎"],艮为山:["艮","艮"],山火贲:["艮","离"],山天大畜:["艮","乾"],山泽损:["艮","兑"],火泽睽:["离","兑"],天泽履:["乾","兑"],风泽中孚:["巽","兑"],风山渐:["巽","艮"],震为雷:["震","震"],雷地豫:["震","坤"],雷水解:["震","坎"],雷风恒:["震","巽"],地风升:["坤","巽"],水风井:["坎","巽"],泽风大过:["兑","巽"],泽雷随:["兑","震"],巽为风:["巽","巽"],风天小畜:["巽","乾"],风火家人:["巽","离"],风雷益:["巽","震"],天雷无妄:["乾","震"],火雷噬嗑:["离","震"],山雷颐:["艮","震"],山风蛊:["艮","巽"],离为火:["离","离"],火山旅:["离","艮"],火风鼎:["离","巽"],火水未济:["离","坎"],山水蒙:["艮","坎"],风水涣:["巽","坎"],天水讼:["乾","坎"],天火同人:["乾","离"],坤为地:["坤","坤"],地雷复:["坤","震"],地泽临:["坤","兑"],地天泰:["坤","乾"],雷天大壮:["震","乾"],泽天夬:["兑","乾"],水天需:["坎","乾"],水地比:["坎","坤"],兑为泽:["兑","兑"],泽水困:["兑","坎"],泽地萃:["兑","坤"],泽山咸:["兑","艮"],水山蹇:["坎","艮"],地山谦:["坤","艮"],雷山小过:["震","艮"],雷泽归妹:["震","兑"]},pa={乾:"金",兑:"金",离:"火",震:"木",巽:"木",坎:"水",艮:"土",坤:"土"},La=e=>pa[e]?` ${pa[e]}`:"",Ta=e=>Aa[e]||null;s.daliurenHTML=function(e){const i=e.sanChuan,p=(g,m)=>`<div class="mp-dl-sc-c">
      <div class="mp-dl-sc-k">${m}</div>
      <div class="mp-dl-sc-z">${g.zhi}</div>
      <div class="mp-dl-sc-j">${g.jiangFull||g.jiang}</div>
      <div class="mp-dl-sc-l">${g.liuQin}${g.xunKong?" · 空":""}</div>
    </div>`,l=`<div class="mp-dl-sc-c ge">
      <div class="mp-dl-sc-k">格局</div>
      <div class="mp-dl-sc-gn">${e.geJu.name}</div>
      <div class="mp-dl-sc-l">${e.geJu.detail}</div>
    </div>`,o=e.siKe.slice().map(g=>`<div class="mp-dl-sk-c">
      <div class="mp-dl-sk-k">${["一课","二课","三课","四课"][g.position-1]||g.position+"课"}</div>
      <div class="mp-dl-sk-s">${g.shang}</div>
      <div class="mp-dl-sk-x">${g.xia}</div>
      <div class="mp-dl-sk-r">${g.relation} · ${g.jiangFull||g.jiang}</div>
    </div>`).join(""),d=e.pan.map(g=>{const m=me[g.di]||[1,1];return`<div class="mp-dl-pc" style="grid-row:${m[0]};grid-column:${m[1]}">
        <div class="tz">${g.tian}</div>
        <div class="dz">地盘 ${g.di}</div>
        <div class="jz">${g.jiangFull}</div>
      </div>`}).join(""),c=`<div class="mp-dl-c">
      <div class="dl-t1">${e.dayGanZhi}日　${e.hourZhi}时</div>
      <div class="dl-t2">${e.dayNight}贵 · 月将 ${e.yueJiang.name}${e.yueJiang.zhi} · 贵人${e.guiren.reverse?"逆":"顺"}行</div>
      <div class="dl-t3">${i.chu.zhi} → ${i.zhong.zhi} → ${i.mo.zhi}</div>
      <div class="dl-t2">节气 ${e.jieqi.name}${e.jieqi.time?" "+e.jieqi.time:""}</div>
    </div>`;return s.briefHTML(e)+`<div class="pp mp-dl">
      <div class="mp-dl-head">日 ${e.dayGanZhi}　时 ${e.hourZhi}（${e.dayNight}贵）　月将 ${e.yueJiang.name}${e.yueJiang.zhi}　节气 ${e.jieqi.name}　贵人${e.guiren.reverse?"逆":"顺"}行</div>
      <div class="mp-dl-sc">${p(i.chu,"初传")}${p(i.zhong,"中传")}${p(i.mo,"末传")}${l}</div>
      <div class="mp-dl-sk">${o}</div>
      <div class="mp-dl-pan2">${d}${c}</div>
      ${(e.shensha||[]).length?`<div class="mp-dl-ss"><b>神煞</b>${e.shensha.map(g=>`<span title="${t(g.note||"")}">${g.name}<i>${g.branch}</i></span>`).join("")}</div>`:""}
      <div class="mp-dl-legend"><span>大字＝天盘支</span><span>小字＝地盘（固定十二支）</span><span>右下＝天将</span></div>
    </div>`},s.tarotHTML=function(e){const i=e.cards.map(o=>`
      <div class="mp-tt-card ${o.upright?"tt-up":"tt-rev"}">
        <div class="mp-tt-pos" title="${t(o.positionHint||"")}">${o.position}</div>
        <div class="mp-tt-name">${o.name}${o.number?`<span class="mp-tt-no">${o.number}</span>`:""}</div>
        ${o.en?`<div class="mp-tt-en">${o.en}</div>`:""}
        <div class="mp-tt-ori">${o.orientation}</div>
        ${o.image?`<div class="mp-tt-img">牌面：${o.image}</div>`:""}
        ${o.core?`<div class="mp-tt-core">${o.core}</div>`:""}
        <div class="mp-tt-kw">${o.keywords.map(d=>`<span>${d}</span>`).join("")}</div>
        <div class="mp-tt-el">${o.arcana} · ${o.element}${o.suit?" · "+o.suit+(o.rankCn?o.rankCn:""):""}${o.domain?" · "+o.domain:""}${o.astro?` · ${o.astro}`:o.role?` · ${o.role}`:""}</div>
      </div>`).join(""),p=e.question?t(e.question):'<span class="pp-dim">（未填写，可在上方输入后重抽）</span>',l=(e.reading||[]).map(o=>`<p>${t(o)}</p>`).join("");return s.briefHTML(e)+`<div class="pp mp-tt">
      <div class="mp-tt-q"><b>所问</b>${p}</div>
      <div class="mp-tt-head">${e.spread}${e.castAt?`　·　抽牌于 ${e.castAt}`:""}</div>
      <div class="mp-tt-grid">${i}</div>
      <div class="mp-tt-read"><div class="mp-tt-rt">牌面解读</div>${l}</div>
      <div class="mp-tt-note"><div class="mp-tt-rt">你的记录</div>
        <textarea class="mp-tt-ta" rows="4" placeholder="写下判断或对照后的想法……（仅本页可见，不保存）"></textarea>
      </div>
      ${e.systemNote?`<div class="mp-tt-tip">${e.systemNote}</div>`:""}
      <div class="mp-tt-tip">塔罗用于自我觉察与娱乐，不作确定性预言。</div>
    </div>`};const Wa=e=>{if(!e||!Array.isArray(e.pairs)||!e.pairs.length)return"";const p='<tr><th scope="col">一对</th><th scope="col">契合度</th>'+(e.pairs[0].dimensions||[]).map(c=>`<th scope="col">${t(c.label)}</th>`).join("")+"</tr>",l=e.pairs.map(c=>`<tr><th scope="row">${t(c.a)} × ${t(c.b)}</th><td>${c.total==null?"—":`${t(c.total)}/100`}<span class="mp-hp-lv">${t(c.level||"")}</span></td>`+(c.dimensions||[]).map(g=>`<td>${g.score>=0?"+":""}${t(g.score)}</td>`).join("")+"</tr>").join(""),o=e.spread>=3&&e.best?`最顺：<b>${t(e.best.a)} × ${t(e.best.b)}</b>（${t(e.best.total)}/100）`+(e.hardest?`；最需磨合：<b>${t(e.hardest.a)} × ${t(e.hardest.b)}</b>（${t(e.hardest.total)}/100）`:""):`三对分数接近（相差 ${t(e.spread)} 分），不排名`,d=e.focus&&e.focus.spread>=3?`<p>差异最大的一维：<b>${t(e.focus.label)}</b>（三对相差 ${t(e.focus.spread)} 分）</p>`:"";return`<div class="mp-hp-triple">
      <div class="mp-hp-ith">三方合盘 · 三对并列</div>
      <table><thead>${p}</thead><tbody>${l}</tbody></table>
      <p>${o}</p>${d}
      <p>${t(e.note||"")}</p>
    </div>`};s.hepanHTML=function(e){const i=(l,o)=>`<div class="mp-hp-side">
      <div class="mp-hp-who">${o}</div>
      <div class="mp-hp-gz">${l.pillars.join(" ")}</div>
      <div class="mp-hp-kv"><span>日主</span><b>${l.dayMaster}</b></div>
      <div class="mp-hp-kv"><span>日支</span><b>${l.dayBranch}</b></div>
      <div class="mp-hp-kv"><span>强弱</span><b>${l.strength||"—"}</b></div>
      <div class="mp-hp-kv"><span>喜用</span><b>${l.favor||"—"}</b></div>
    </div>`,p=e.dimensions.map(l=>`<div class="mp-hp-dim">
      <div class="mp-hp-dimh"><span>${l.label}</span><b class="${l.score>=10?"good":l.score<0?"bad":""}">${l.score>=0?"+":""}${l.score}</b></div>
      <div class="mp-hp-dimt">${l.text}</div>
    </div>`).join("");return s.briefHTML(e)+`<div class="pp mp-hp">
      <div class="mp-hp-head"><b>${e.score.level}</b><span>${e.score.total}/100</span></div>
      <div class="mp-hp-sides">${i(e.a,"你")}${i(e.b,"对方")}</div>
      <div class="mp-hp-dims">${p}</div>
      ${Wa(e.triple)}
      <div class="mp-hp-notes">${e.notes.map(l=>`<p>${l}</p>`).join("")}</div>
    </div>`},s.qimenFactsHTML=function(e){if(!e||!e.palaces)return"";const i=(o,d)=>`<div class="relation__row"><dt>${t(o)}</dt><dd>${t(d)}</dd></div>`,p=o=>o&&["旺","相","休","囚","死"].filter(c=>Array.isArray(o[c])&&o[c].length).map(c=>`${c} ${o[c].join("、")}`).join("；")||"—";return`<dl class="relation mp-qm-facts" aria-label="奇门盘面事实">${[["局数",`${e.ju}${e.yuan?`（${e.yuan}）`:""}`],["节气",`${e.jieqi||"—"}${e.jieqiTime?`（${e.jieqiTime}）`:""}`],["四柱",`${e.siZhu?`${e.siZhu.year} ${e.siZhu.month} ${e.siZhu.day} ${e.siZhu.time}`:"—"}`],["值符",e.zhiFu?`${e.zhiFu.star} · ${e.zhiFu.gong}宫`:"—"],["值使",e.zhiShi?`${e.zhiShi.gate} · ${e.zhiShi.gong}宫`:"—"],["旬首",e.xunshou||"—"],["空亡",(e.kongWang||[]).join("")||"—"],["驿马",e.ma&&e.ma.zhi?`${e.ma.zhi}${e.ma.gong?`（${e.ma.gong}宫）`:""}`:"—"],["换局规则",e.juMethodNote||e.juMethod||"—"],["晚子时",e.lateZiHourMode==="next-day"?"23:00 后归次日":"23:00 后仍归当日"],["击刑",e.conditions&&e.conditions.jiXing&&e.conditions.jiXing.length?e.conditions.jiXing.map(o=>`${o.palace}宫${o.stem}`).join("、"):"本盘无"],["三奇入墓",e.conditions&&e.conditions.ruMu&&e.conditions.ruMu.length?e.conditions.ruMu.map(o=>`${o.palace}宫${o.stem}`).join("、"):"本盘无"],["六仪入墓",e.conditions&&e.conditions.liuYiRuMu&&e.conditions.liuYiRuMu.length?e.conditions.liuYiRuMu.map(o=>`${o.palace}宫${o.stem}`).join("、"):"本盘无"],["十干克应",[...e.palaces||[],e.centerPalace].filter(d=>d&&d.ganYing).map(d=>`${d.palace}宫 ${d.ganYing.tian}加${d.ganYing.di}「${d.ganYing.name}」`).join("；")||"—"],["月令",e.month&&e.month.branch?`${e.month.branch}（${e.month.element}）`:"—"],["门旺衰",p(e.states&&e.states.gate)],["星旺衰",p(e.states&&e.states.star)],["干旺衰",p(e.states&&e.states.stem)],["干宫生克",(()=>{const o=["干克宫","宫克干","干生宫","宫生干","比和"],d={};for(const c of e.palaces||[]){const g=c.stemRelation||null;!g||g.type==="unknown"||!c.tianPan||(d[g.type]=d[g.type]||[]).push(c.tianPan)}return o.filter(c=>d[c]).map(c=>c+" "+d[c].join("、")).join("；")||"—"})()]].map(([o,d])=>i(o,d)).join("")}</dl>`};const Qa=[["4","9","2"],["3","5","7"],["8","1","6"]];s.qimenHTML=function(e){const i={};for(const l of e.palaces)i[l.palace]=l;const p=l=>{if(l==="5")return`<div class="pp-qm-cell center">
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
        <div class="pp-qm-bot"><span class="dim">${o.ganYing?t(`${o.ganYing.tian}加${o.ganYing.di} ${o.ganYing.name}`):""}</span></div>
      </div>`};return s.briefHTML(e)+`<div class="pp mp-qm">
      <div class="mp-qm-head">
        <b>${e.ju}</b>
        <span>${e.siZhu.year} ${e.siZhu.month} ${e.siZhu.day} ${e.siZhu.time}</span>
        <span>节气 ${e.jieqi}（${e.jieqiTime}）</span>
        <span>值符 ${e.zhiFu.star}（${e.zhiFu.gong}宫）　值使 ${e.zhiShi.gate}（${e.zhiShi.gong}宫）</span>
        <span>旬首 ${e.xunshou}　空亡 ${e.kongWang.join("")||"—"}　驿马 ${e.ma.zhi||"—"}</span>
      </div>
      <div class="mp-qm-grid">${Qa.map(l=>l.map(p).join("")).join("")}</div>
      <div class="mp-qm-legend">上＝九星　中＝天盘干／八门　下＝地盘干／宫号　角落＝八神</div>
      <div class="mp-qm-rules">${e.rules.map(l=>`<p>${l}</p>`).join("")}</div>
    </div>`},s.ziweiHepanHTML=function(e){const i=(o,d)=>`<div class="mp-hp-side">
      <div class="mp-hp-who">${d}</div>
      <div class="mp-hp-gz">命宫 ${o.soul.branch}　夫妻 ${o.soul.branch,""}${o.spouseStars.length,""}</div>
      <div class="mp-hp-kv"><span>命宫主星</span><b>${o.soulStars.join("、")||"无正曜"}</b></div>
      <div class="mp-hp-kv"><span>夫妻宫主星</span><b>${o.spouseStars.join("、")||"无正曜"}</b></div>
      <div class="mp-hp-kv"><span>五行局</span><b>${o.bureau}</b></div>
      <div class="mp-hp-kv"><span>身宫</span><b>${o.body.branch}（${o.body.lands||"—"}）</b></div>
      <div class="mp-hp-kv"><span>生年四化</span><b>${o.natalSihua.join("、")}</b></div>
    </div>`,p=e.dimensions.map(o=>`<div class="mp-hp-dim">
      <div class="mp-hp-dimh"><span>${o.label}</span><b class="${o.score>=10?"good":o.score<0?"bad":""}">${o.score>=0?"+":""}${o.score}</b></div>
      <div class="mp-hp-dimt">${o.text}</div>
    </div>`).join(""),l=o=>(e.interactions||[]).filter(d=>d.who===o).map(d=>`<li><b class="m-${d.mutagen}">${d.mutagen}</b>${d.star}：本命${d.ownPalace} → 对方${d.landingPalace||"盘外"}${d.strong?"<i>（强）</i>":""}</li>`).join("");return s.briefHTML(e)+`<div class="pp mp-hp">
      <div class="mp-hp-head"><b>${e.score.level}</b><span>${e.score.total}/100　紫微合盘</span></div>
      <div class="mp-hp-sides">${i(e.a,"你")}${i(e.b,"对方")}</div>
      <div class="mp-hp-dims">${p}</div>
      <div class="mp-hp-inter">
        <div><div class="mp-hp-ith">你的四化 落在对方</div><ul>${l("你")||"<li>无</li>"}</ul></div>
        <div><div class="mp-hp-ith">对方的四化 落在你</div><ul>${l("对方")||"<li>无</li>"}</ul></div>
      </div>
      ${Wa(e.triple)}
      <div class="mp-hp-notes">${e.notes.map(o=>`<p>${o}</p>`).join("")}</div>
    </div>`},s.curveHTML=function(e){const i=e&&e.dayun&&Array.isArray(e.dayun.list)?e.dayun.list:[],p=e&&Array.isArray(e.liunian)?e.liunian:[];if(i.length<2)return"";const l=y=>typeof y=="number"&&isFinite(y)?y:0,o=y=>y.luck?l(y.luck.score):0,d=4.2,c=-2.2,g=l(e.dayun.startAge&&e.dayun.startAge.years),m=i.length?i[i.length-1].startAge+10:g+80,b=p.map(y=>l(y.age)).filter(y=>y>0),x=Math.min(g,...b.length?b:[g]),w=Math.max(m,...b.length?b:[m]),$=Math.max(1,w-x),C=640,A=190,_={t:14,r:16,b:26,l:30},Q=C-_.l-_.r,F=A-_.t-_.b,L=y=>_.l+(y-x)/$*Q,O=y=>_.t+F-(Math.max(c,Math.min(d,y))-c)/(d-c)*F,N=[{from:1.2,to:d,cls:"b-good"},{from:.55,to:1.2,cls:"b-good"},{from:-.8,to:.55,cls:"b-flat"},{from:-1.45,to:-.8,cls:"b-bad"},{from:c,to:-1.45,cls:"b-bad"}].map(y=>`<rect class="cv-band ${y.cls}" x="${_.l}" y="${O(y.to).toFixed(1)}" width="${Q}" height="${(O(y.from)-O(y.to)).toFixed(1)}"/>`).join(""),I=10/$*Q,f=[];i.forEach((y,de)=>{const ce=l(y.startAge),Me=o(y),Ne=Math.max(_.l,L(ce)),we=Math.min(_.l+Q,L(ce+10));f.push(`${Ne.toFixed(1)},${O(Me).toFixed(1)}`),f.push(`${we.toFixed(1)},${O(Me).toFixed(1)}`)});const ie=f.length?`<polyline class="cv-dy" points="${f.join(" ")}"/>`:"",V=f.length?`<polygon class="cv-dyfill" points="${_.l},${(_.t+F).toFixed(1)} ${f.join(" ")} ${(_.l+Q).toFixed(1)},${(_.t+F).toFixed(1)}"/>`:"",ee=p.filter(y=>y.luck&&typeof y.luck.score=="number").map(y=>({x:L(l(y.age)),y:O(l(y.luck.score)),y0:l(y.year),gz:y.ganzhi,tier:y.luck.tier,v:l(y.luck.score),age:l(y.age)})),Te=ee.length>1?`<polyline class="cv-ln" points="${ee.map(y=>`${y.x.toFixed(1)},${y.y.toFixed(1)}`).join(" ")}"/>`:"",j={大吉:"var(--lu)",吉:"var(--lu)",平:"var(--muted)",忌:"var(--red)",大忌:"var(--red)"},q=ee.length?Math.min(...ee.map(y=>y.y0)):null,E=ee.map(y=>`<circle class="cv-dot${y.y0===q?" now":""}" cx="${y.x.toFixed(1)}" cy="${y.y.toFixed(1)}" fill="${j[y.tier]||"var(--muted)"}"><title>${t(`${y.y0}年（${y.age}岁）${y.gz}　${y.tier} ${y.v}`)}</title></circle>`).join(""),ne=`<line class="cv-ax zero" x1="${_.l}" y1="${O(0).toFixed(1)}" x2="${_.l+Q}" y2="${O(0).toFixed(1)}"/><line class="cv-ax" x1="${_.l}" y1="${_.t}" x2="${_.l}" y2="${_.t+F}"/>`,be=$>60?10:5,se=[];for(let y=Math.ceil(x/be)*be;y<=w;y+=be)se.push(`<text class="cv-lbl age" x="${L(y).toFixed(1)}" y="${(_.t+F+13).toFixed(1)}" text-anchor="middle">${y}岁</text>`);const je=`<text class="cv-lbl" x="${(_.l-5).toFixed(1)}" y="${(O(2.4)+3).toFixed(1)}" text-anchor="end">吉</text><text class="cv-lbl" x="${(_.l-5).toFixed(1)}" y="${(O(0)+3).toFixed(1)}" text-anchor="end">平</text><text class="cv-lbl" x="${(_.l-5).toFixed(1)}" y="${(O(-1.8)+3).toFixed(1)}" text-anchor="end">忌</text>`,ye=i.slice().sort((y,de)=>o(de)-o(y)),H=ye[0],J=ye[ye.length-1],Y=H&&o(H)>.55?`<text class="cv-lbl" x="${L(l(H.startAge)+5).toFixed(1)}" y="${(O(o(H))-5).toFixed(1)}" text-anchor="middle">▲${H.startAge}岁 ${H.luck.tier}</text>`:"",ge=J&&o(J)<-.8?`<text class="cv-lbl" x="${L(l(J.startAge)+5).toFixed(1)}" y="${(O(o(J))+11).toFixed(1)}" text-anchor="middle">▼${J.startAge}岁 ${J.luck.tier}</text>`:"",fe=`<div class="cv-legend">
      <span><i style="background:var(--quan)"></i>大运（阶梯，一步十年）</span>
      <span><i style="background:var(--ke)"></i>流年（逐年折线）</span>
      <span>绿带＝吉　灰带＝平　红带＝忌</span>
    </div>`,v=`<div class="cv-tip">曲线只呈现引擎已给出的行运评分（${c} ~ ${d}），不预测具体事件；档位与依据见下方「大运 / 流年」各节。悬停看逐年详情。</div>`;return`<div class="mp-curve">
      <div class="mp-curve-h"><b>人生运势曲线</b><span>${x}–${w} 岁　${e.dayun.rule}，${g} 岁起运${e.dayun.jiao&&e.dayun.jiao.at?`，交运 ${e.dayun.jiao.at}`:""}</span></div>
      <svg viewBox="0 0 ${C} ${A}" role="img" aria-label="人生运势曲线：${x} 到 ${w} 岁的大运与流年评分走势">
        ${N}${ne}${V}${ie}${Te}${E}${se.join("")}${je}${Y}${ge}
      </svg>
      ${fe}${v}
    </div>`},s.trendChart=function(e){const i=e&&Array.isArray(e.points)?e.points:[];if(i.length<2)return"";const p=e&&Array.isArray(e.segments)?e.segments:[],l=H=>typeof H=="number"&&isFinite(H)?H:0,o=720,d=322,c={t:34,r:46,b:66,l:36},g=o-c.l-c.r,m=d-c.t-c.b,b=i.length,x=g/b,w=H=>c.l+(H+.5)*x,$=H=>c.t+m-Math.max(0,Math.min(100,H))/100*m,C=Math.max(1.1,Math.min(10,x*.62)),A=H=>l(H.score),_=c.t+m,Q=_+20,F=22,O=`klclip${(()=>{let H=2166136261;const J=Y=>{const ge=String(Y??"");for(let fe=0;fe<ge.length;fe++)H^=ge.charCodeAt(fe),H=Math.imul(H,16777619)};J(b),J(i[0]&&i[0].age),J(i[b-1]&&i[b-1].age);for(const Y of i)J(Y&&Y.score);return(H>>>0).toString(36)})()}`,le=p.map((H,J)=>{const Y=Math.max(0,H.startAge-1),ge=Math.min(b-1,H.endAge-1);if(ge<Y)return"";const fe=c.l+Y*x,v=Math.max(.6,(ge-Y+1)*x),de=J%2===1?`<rect class="kl-band" x="${fe.toFixed(1)}" y="${c.t}" width="${v.toFixed(1)}" height="${m}"/><rect class="kl-stripband" x="${fe.toFixed(1)}" y="${Q}" width="${v.toFixed(1)}" height="${F}"/>`:"",ce=J===0?"":`<line class="kl-segline" x1="${fe.toFixed(1)}" y1="${c.t}" x2="${fe.toFixed(1)}" y2="${_}"/>`,Me=Math.min(Math.max(c.l+(Y+ge+1)/2*x,c.l+22),c.l+g-22);return de+ce+`<text class="kl-seg" x="${Me.toFixed(1)}" y="${(Q+15).toFixed(1)}" text-anchor="middle">${t(H.ganZhi)}</text>`}).join(""),N=[0,25,50,75,100].map(H=>`<line class="kl-grid${H===50?" mid":""}" x1="${c.l}" y1="${$(H).toFixed(1)}" x2="${c.l+g}" y2="${$(H).toFixed(1)}"/><text class="kl-lbl" x="${c.l-6}" y="${($(H)+3).toFixed(1)}" text-anchor="end">${H}</text>`).join(""),I=i.map((H,J)=>{const Y=H.kline||{},ge=l(Y.open),fe=l(Y.close),v=Math.min(100,l(Y.high)),y=Math.max(0,l(Y.low)),de=fe>=ge,ce=$(ge),Me=$(fe),Ne=Math.min(ce,Me),we=Math.max(.8,Math.abs(ce-Me)),Ce=w(J),da=`${H.age}岁（${H.year}年 ${H.ganZhi}）${fe}分${H.dayunGanZhi?` · ${H.dayunGanZhi}运`:""}`;return`<g class="kl-c${de?" up":" down"}"><title>${t(da)}</title><line x1="${Ce.toFixed(2)}" y1="${$(v).toFixed(1)}" x2="${Ce.toFixed(2)}" y2="${$(y).toFixed(1)}"/><rect x="${(Ce-C/2).toFixed(2)}" y="${Ne.toFixed(1)}" width="${C.toFixed(2)}" height="${we.toFixed(1)}" rx="0.7"/></g>`}).join(""),f=H=>{const J=[];for(let Y=0;Y<b;Y++){if(Y+1<H)continue;let ge=0;for(let fe=Y+1-H;fe<=Y;fe++)ge+=A(i[fe]);J.push({i:Y,v:ge/H})}return J},ie=H=>f(H).map((J,Y)=>`${Y?"L":"M"}${w(J.i).toFixed(1)} ${$(J.v).toFixed(1)}`).join(" "),V=(H,J)=>{const Y=f(H);if(!Y.length)return"";const ge=Y[Y.length-1];return{cls:J,y:$(ge.v),text:`<text class="kl-ma-lbl ${J}" x="${c.l+g+5}" y="${$(ge.v).toFixed(1)}" text-anchor="start">${ge.v.toFixed(0)}</text>`}},ee=V(10,"m10"),Te=V(5,"m5"),j=(()=>{if(!Te||!ee)return`${ee?ee.text:""}${Te?Te.text:""}`;let H=Te.y,J=ee.y;if(Math.abs(H-J)<10){const Y=Math.min(H,J),ge=Math.max(H,J);H=Y-6,J=ge+6}return`<text class="kl-ma-lbl m10" x="${c.l+g+5}" y="${J.toFixed(1)}" text-anchor="start">${f(10).slice(-1)[0].v.toFixed(0)}</text><text class="kl-ma-lbl m5" x="${c.l+g+5}" y="${H.toFixed(1)}" text-anchor="start">${f(5).slice(-1)[0].v.toFixed(0)}</text>`})();let q=i[0],E=i[0];for(const H of i)A(H)>A(q)&&(q=H),A(H)<A(E)&&(E=H);const ne=(H,J,Y)=>{const ge=i.indexOf(H),fe=w(ge),v=$(A(H)),y=Math.min(Math.max(fe,c.l+26),c.l+g-26),de=J==="hi"?v-8<c.t+6?14:Y:v+12>c.t+m-2?-8:Y;return`<g class="kl-mark ${J}"><circle cx="${fe.toFixed(1)}" cy="${v.toFixed(1)}" r="2"/><circle class="ring" cx="${fe.toFixed(1)}" cy="${v.toFixed(1)}" r="4.6"/><text x="${y.toFixed(1)}" y="${(v+de).toFixed(1)}" text-anchor="middle">${H.age}岁 ${A(H)}</text></g>`},be=b>60?10:5,se=i.filter(H=>H.age%be===0).map(H=>`<text class="kl-lbl age" x="${w(i.indexOf(H)).toFixed(1)}" y="${(_+14).toFixed(1)}" text-anchor="middle">${H.age}</text>`).join(""),je=`<text class="kl-lbl axis" x="${c.l}" y="${(d-6).toFixed(1)}">年龄（岁）</text><text class="kl-lbl axis" x="${c.l+g}" y="${(d-6).toFixed(1)}" text-anchor="end">每岁一分 · 满分 100</text>`;return`<div class="mp-kline-fig">
      <svg viewBox="0 0 ${o} ${d}" role="img" aria-label="人生K线：1 到 ${b} 岁的逐年评分蜡烛图">
        <defs><clipPath id="${O}"><rect x="${c.l}" y="${c.t}" width="${g}" height="${m}"/></clipPath></defs>
        ${le}${N}
        <g clip-path="url(#${O})">
          ${I}
          <path class="kl-ma m10" d="${ie(10)}"/><path class="kl-ma m5" d="${ie(5)}"/>
        </g>
        ${j}
        ${ne(q,"hi",-8)}${ne(E,"lo",12)}
        ${se}${je}
      </svg><div class="kl-legend"><span><i class="up"></i>阳线：比上一岁高</span><span><i class="down"></i>阴线：比上一岁低</span><span><i class="m5"></i>5 年均线</span><span><i class="m10"></i>10 年均线</span><span>虚线＝大运交界</span></div></div>`},s.trendHTML=function(e,i){if(!e)return"";const p=!(i&&i.brief===!1),l=s.trendChart(e);if(!l)return s.quickHTML(e);const o=Array.isArray(e.segments)?e.segments:[],d=e.highlights&&typeof e.highlights=="object"?e.highlights:{},c=e.meta||{},g=c.strength||{},m=o.map(N=>`<span class="kl-chip">${t(N.ganZhi)}<em>${N.startAge}–${N.endAge}</em></span>`).join(""),b=(Array.isArray(d.best)?d.best:[]).map(N=>`<div class="kl-hl hi">${t(N)}</div>`).join(""),x=(Array.isArray(d.worst)?d.worst:[]).map(N=>`<div class="kl-hl lo">${t(N)}</div>`).join(""),w=c.boundaryNote?`<div class="mp-kline-note">${t(c.boundaryNote)}</div>`:d.suppressed?`<div class="mp-kline-note">${t(d.suppressed)}</div>`:"",$=Array.isArray(e.points)?e.points:[],C=N=>typeof N.score=="number"&&isFinite(N.score)?N.score:0,A=$.map(C),_=A.length?A.reduce((N,I)=>N+I,0)/A.length:0,Q=A.length?Math.max(...A)-Math.min(...A):0,F=o.map(N=>{const I=$.filter(f=>f.age>=N.startAge&&f.age<=N.endAge).map(C);return{ganZhi:N.ganZhi,v:I.length?I.reduce((f,ie)=>f+ie,0)/I.length:0}}).filter(N=>N.v>0).sort((N,I)=>I.v-N.v),L=!!(g.boundary||d.suppressed),O=[`<span><em>全段均值</em><b>${_.toFixed(0)}</b></span>`];!L&&F.length&&(O.push(`<span><em>最好大运</em><b class="hi">${t(F[0].ganZhi)} ${F[0].v.toFixed(0)}</b></span>`),O.push(`<span><em>最差大运</em><b class="lo">${t(F[F.length-1].ganZhi)} ${F[F.length-1].v.toFixed(0)}</b></span>`)),O.push(`<span><em>波动幅度</em><b>${Q.toFixed(0)}</b></span>`);const le=`<div class="kl-stats">${O.join("")}</div>`;return(p?s.briefHTML(e):"")+`<section class="mp-kline" aria-label="人生K线结果">
      <div class="mp-kline-h"><b>人生 K 线</b><span>${t(c.birth||"")}　日主 ${t(c.dayMaster||"")}　${t(g.level||"")}${g.score?`（${g.score}）`:""}</span></div>
      ${l}
      ${le}
      ${m?`<div class="kl-segs">${m}</div>`:""}
      ${b||x?`<div class="kl-hls">${b}${x}</div>`:""}
      ${w}
      <div class="mp-kline-tip">逐岁分数由大运与流年十神按固定表确定性计分（1–100），只表五行力量的顺逆，不预测具体事件；旺衰落在换档阈值附近时，不出高低年份结论。</div>
    </section>`},s.chengguHTML=function(e){if(!e)return"";const i=e.weights||{},p=e.song||{},l=["year","month","day","hour"].map(g=>{const m=i[g]||{label:"",qian:0},b=String(m.label||"").split(" ")[0]||"",x=String(m.label||"").split(" ")[1]||"";return`<div class="cg-cell"><em>${t(b)}</em><b>${t(x)}</b></div>`}).join(""),o=String(p.text||""),d=o?o.replace(/[。]$/,"").split("；").map((g,m)=>`<span>${t(g)}${m===0?"；":"。"}</span>`).join(""):"",c=e.verdict&&e.verdict.band?e.verdict.band:"";return`<section class="mp-cg" aria-label="称骨结果">
      <div class="mp-cg-h"><b>称骨</b><span>${t(e.lunar&&e.lunar.text?e.lunar.text:"")}</span></div>
      <div class="mp-cg-w">${l}</div>
      <div class="mp-cg-tot"><em>骨重合计</em><b>${t(e.total&&e.total.label?e.total.label:"")}</b>${c?`<i>${t(c)}</i>`:""}</div>
      <div class="mp-cg-song"><div class="mp-cg-song-h">称骨歌 · ${t(e.total&&e.total.label?e.total.label:"")}</div>
        <div class="mp-cg-verse">${d||'<span class="mp-cg-miss">该骨重未见通行本歌诀</span>'}</div>
        <div class="mp-cg-plain"><em>释义</em>${t(p.plain||"")}</div></div>
      ${e.verdict&&e.verdict.text?`<div class="mp-cg-band"><em>分档</em>${t(e.verdict.text)}</div>`:""}
      <div class="mp-cg-note">骨重与歌诀为通行本口径（各版本歌诀有异文，断句标点已统一）；释义为白话自撰，只作字面直解，属民俗娱乐参考，不构成命运断言。</div>
    </section>`},s.nameHTML=function(e){if(!e)return"";const i={木:"wood",火:"fire",土:"earth",金:"metal",水:"water"},p=b=>b==="未收录"?'<span class="mp-nm-el">未收录</span>':`<span class="mp-nm-el wx-${i[b]||"earth"}">${t(b)}</span>`,l=(b,x)=>`<div class="mp-nm-h"><b>${t(b)}</b>${x?`<i>${t(x)}</i>`:""}</div>`;if(e.action==="generate"){const b=e.bazi&&e.bazi.favorable?e.bazi.favorable.join("、"):"",x=(e.candidates||[]).map(w=>{const $=w.wuge&&w.wuge.available?(()=>{const A=w.wuge.rows.filter(F=>F.level==="吉").length,_=w.wuge.rows.filter(F=>F.level==="凶").length;return`<span class="mp-nm-fit${_===0&&A>=4?" ok":_>=2?" no":""}" title="${t(w.wuge.summary)}">五格 ${A}/5 吉</span>`})():"",C=w.phonetics&&w.phonetics.available?`<span class="mp-nm-fit${w.phonetics.level==="拗口"?" no":w.phonetics.level==="顺口"?" ok":""}" title="${t((w.phonetics.issues||[]).map(A=>A.text).join("；"))}">${t(w.phonetics.level)}</span>`:"";return`<div class="mp-nm-c"><b>${t(w.name)}</b><span class="mp-nm-els">${w.chars.map(A=>p(A.element)).join("")}${$}${C}</span><em>${t(w.chars.map(A=>A.char+"·"+A.meaning).join("　"))}</em></div>`}).join("");return`<section class="mp-nm" aria-label="候选名">
        ${l("候选名",`姓 ${e.surname}（${e.gender}）${b?`　喜用 ${b}`:""}`)}
        <div class="mp-nm-cand">${x}</div>
        <div class="mp-nm-note">${(e.notes||[]).map(w=>"※ "+t(w)).join("<br>")}</div>
      </section>`}const o=(e.chars||[]).map(b=>{const x=b.favorable===!0?'<span class="mp-nm-fit ok">合喜用</span>':b.favorable===!1?'<span class="mp-nm-fit no">不合喜用</span>':'<span class="mp-nm-fit">不判</span>',w=b.source==="user"?"用户指定":b.source==="lib"?"字库":"未收录",$=b.suggest&&b.suggest.length?`<div class="mp-nm-sug"><b>可换</b>${b.suggest.map(C=>`<span class="wx-${i[C.element]||"earth"}">${t(C.char)}（${t(C.element)}）</span>`).join("")}</div>`:"";return`<div class="mp-nm-row"><div class="mp-nm-ch">${t(b.char)}</div>
        <div class="mp-nm-b"><div class="mp-nm-t">${p(b.element)}<span>${t(w)}</span>${x}</div>
        <div class="mp-nm-m">${t(b.meaning)}</div>${$}</div></div>`}).join(""),d=e.bazi?`<div class="mp-nm-m">八字：${t(e.bazi.dayMaster&&e.bazi.dayMaster.stem?`${e.bazi.dayMaster.stem}（${e.bazi.dayMaster.element}）`:String(e.bazi.dayMaster||""))}　${t(e.bazi.strength?`${e.bazi.strength.level}（${e.bazi.strength.score}）`:"")}　喜用 ${t((e.bazi.favorable||[]).join("、"))}</div>
         <div class="mp-nm-m">${t(e.bazi.basis||"")}</div>`:"",c=b=>b==="吉"?"is-ok":b==="半吉"?"is-half":"is-bad",g=e.wuge&&e.wuge.available?`<div class="mp-nm-wu">
          <div class="mp-nm-wu-h"><b>五格</b><i>康熙笔画 · 通行本 81 数理</i></div>
          <div class="mp-nm-wu-rows">${e.wuge.rows.map(b=>`<div class="mp-nm-wu-c ${c(b.level)}"><em>${t(b.key)}</em><b>${b.strokes}</b><i>${t(`${b.level} · ${b.name}`)}</i></div>`).join("")}</div>
          <div class="mp-nm-m">笔画：${e.wuge.strokes.map(b=>`${t(b.char)}${b.strokes}${b.source==="user"?"（指定）":""}`).join(" ＋ ")}</div>
          <div class="mp-nm-m">三才：${t(e.wuge.sancai.text)}</div>
        </div>`:`<div class="mp-nm-wu"><div class="mp-nm-wu-h"><b>五格</b><i>这一版算不了</i></div><div class="mp-nm-m">${t(e.wuge?e.wuge.reason:"未算")}</div></div>`,m=e.phonetics&&e.phonetics.available?`<div class="mp-nm-ph"><b>音韵</b><span class="mp-nm-ph-lv${e.phonetics.level==="顺口"?" ok":e.phonetics.level==="拗口"?" bad":" warn"}">${t(e.phonetics.level)}</span><em>${t(e.phonetics.chars.map(b=>`${b.py}${b.tone}`).join(" "))}　声调 ${t(e.phonetics.tonePattern)}${(e.phonetics.alt||[]).length?`　又读 ${t(e.phonetics.alt.map(b=>`${b.char} ${b.py}${b.tone}`).join("、"))}`:""}</em>${(e.phonetics.issues||[]).map(b=>`<span class="mp-nm-ph-i">${t(b.text)}</span>`).join("")}</div>`:`<div class="mp-nm-ph"><b>音韵</b><em>${t(e.phonetics?e.phonetics.reason:"未算")}</em></div>`;return`<section class="mp-nm" aria-label="名字评估">
      ${l(e.fullName||"",`字库 ${e.stats&&e.stats.libSize?e.stats.libSize:""} 字${e.stats&&e.stats.unknown?`　未收录 ${e.stats.unknown}`:""}`)}
      ${o}
      ${d}
      ${g}
      ${m}
      <div class="mp-nm-verd">${t(e.verdict||"")}</div>
      <div class="mp-nm-note">${(e.notes||[]).map(b=>"※ "+t(b)).join("<br>")}</div>
    </section>`},s.briefHTML=function(e){return e&&e.brief?s.summaryHTML(e.brief):""},s.summaryHTML=function(e){if(!e||!e.lead)return"";const i=(e.sections||[]).map(o=>`<div class="mp-br-sec"><b>${t(o.h)}</b><p>${t(o.t)}</p></div>`).join(""),p=e.advice&&e.advice.length?`<div class="mp-br-adv"><b>可以试着做的</b><ul>${e.advice.map(o=>`<li>${t(o)}</li>`).join("")}</ul></div>`:"",l=e.chips&&e.chips.length?`<div class="mp-br-chips">${e.chips.map(o=>`<span>${t(o)}</span>`).join("")}</div>`:"";return`<section class="mp-br" aria-label="先说结论">
      <div class="mp-br-h"><b>${t(e.title||"先看这一张")}</b>${l}</div>
      <p class="mp-br-lead">${t(e.lead)}</p>
      ${i}
      ${p}
      ${e.caveat?`<p class="mp-br-cav">※ ${t(e.caveat)}</p>`:""}
      ${e.footer?`<p class="mp-br-foot">${t(e.footer)}</p>`:""}
    </section>`},s.baziHTML=function(e){const i=[["year","年柱"],["month","月柱"],["day","日柱"],["hour","时柱"]].filter(([v])=>e.pillars[v]),p={year:"年",month:"月",day:"日",hour:"时"},l={木:"wood",火:"fire",土:"earth",金:"metal",水:"water"},o={比肩:"tg-bi",劫财:"tg-bi",食神:"tg-shi",伤官:"tg-shi",偏财:"tg-cai",正财:"tg-cai",七杀:"tg-guan",正官:"tg-guan",偏印:"tg-yin",正印:"tg-yin"},d=v=>`<span class="tg ${o[v]||""}">${v}</span>`,c=v=>`<span class="wx-${l[v]||"earth"}">${he(v)}${v}</span>`,g=v=>`<span class="ss-s ${v.luck||"neutral"}" title="${t(`${v.cat} · ${v.via}查${v.target} ｜ ${v.rule}`)}">${v.name}</span>`,m=(v,y)=>`<tr><td class="bz-lbl">${v}</td>${i.map(([de])=>`<td data-c="${p[de]}">${y(e.pillars[de],de)}</td>`).join("")}</tr>`,b=`<thead><tr><th></th>${i.map(([v,y])=>`<th${v==="day"?' class="bz-hdr-day"':""}>${y}</th>`).join("")}</tr></thead>`,x={寅:"木",卯:"木",巳:"火",午:"火",申:"金",酉:"金",亥:"水",子:"水",辰:"土",戌:"土",丑:"土",未:"土"},w={木:"火",火:"土",土:"金",金:"水",水:"木"},$={木:"土",土:"水",水:"火",火:"金",金:"木"},C=x[e.pillars.month.branch]||"土",A=["木","火","土","金","水"],_=v=>v===C?"旺":w[C]===v?"相":w[v]===C?"休":$[v]===C?"囚":"死",Q=`<tr><td class="bz-lbl">五行</td><td class="bz-wxs" colspan="${i.length}">${["旺","相","休","囚","死"].map(v=>{const y=A.find(de=>_(de)===v)||C;return`<i><b class="wx-${l[y]}">${y}</b><em>${v}</em></i>`}).join("")}</td></tr>`,F=[m("十神",(v,y)=>y==="day"?`<span class="bz-zhuri">${e.input.gender==="male"?"元男":"元女"}</span>`:v.stemTenGod?d(v.stemTenGod):'<span class="pp-dim">—</span>'),m("天干",v=>`<span class="bz-big ${"wx-"+l[v.stemElement]}">${v.stem}</span>`),m("地支",v=>`<span class="bz-big ${"wx-"+l[v.branchElement]}">${v.branch}</span>`),m("藏干",v=>v.hidden.map(y=>`<i class="bz-cg wx-${l[y.element]}">${y.stem}·${y.element}</i>`).join("")),m("支神",v=>v.hidden.map(y=>d(y.tenGod)).join("<br>")),m("纳音",v=>v.nayin),m("空亡",v=>`<span class="pp-dim">${v.kongwang.join("")}</span>`),m("地势",v=>v.dishi),m("自坐",v=>v.zizuo),m("神煞",v=>v.shenshaDetail&&v.shenshaDetail.length?`<span class="pp-ss">${v.shenshaDetail.map(g).join("")}</span>`:'<span class="pp-dim">—</span>'),Q].join(""),L=Object.entries(e.wuxing).map(([v,y])=>`<span class="pp-chip wx-${l[v]}">${he(v)}${v} ${y}</span>`).join(""),O=e.frame||{},le=v=>v==="大吉"||v==="吉"?"ok":v==="大忌"||v==="忌"?"warn":"",N=(v,y)=>y?`<div class="pp-sec"><div class="pp-sec-h">${v}</div>${y}</div>`:"",I=O.geju&&O.geju.length?`
      <div class="pp-tl">${O.primary?`主格 <b>${t(O.primary.name)}</b>　${t(O.primary.evidence)}`:""}</div>
      <div class="pp-chips">${O.geju.map(v=>{const y=v.status==="破格",de=v.status==="待定"||v.status==="假从",ce=`${v.evidence||""}${Array.isArray(v.breaks)&&v.breaks.length?`；破：${v.breaks.join("；")}`:""}`;return`<span class="pp-chip ${y?"broken":de?"warn":""}" title="${t(ce)}">${t(v.name)}<i class="pp-drel">${t(v.kind)}${v.status?`·${t(v.status)}`:""}</i></span>`}).join("")}</div>`:"",f=(()=>{const v=Array.isArray(O.yongshen&&O.yongshen.neutral)?O.yongshen.neutral:[],y=new Set(O.yongshen&&O.yongshen.neutralTenGods||[]);return`${(O.yongshen&&O.yongshen.avoidTenGods||[]).filter(ce=>!y.has(ce)).map(ce=>`<span class="pp-chip warn">${t(ce)}</span>`).join("")}${[...y].map(ce=>`<span class="pp-chip neu" title="局中分量近零，按中性偏忌看">${t(ce)}</span>`).join("")}${v.length?`<span class="pp-chip neu" title="忌神中全局不足 0.5 分的那几行；仍在忌里参与行运评分">中性偏忌 ${v.map(ce=>`${t(ce.element)} ${t(ce.weight)} 分`).join("、")}</span>`:""}`})(),ie=O.yongshen?`
      <div class="pp-tl">喜 ${O.yongshen.favor.map(c).join("")}　忌 ${O.yongshen.avoid.map(c).join("")}　<span class="pp-dim">${t(O.yongshen.method)}</span></div>
      <div class="pp-chips">${O.yongshen.favorTenGods.map(v=>`<span class="pp-chip ok">${t(v)}</span>`).join("")}${f}</div>
      ${(O.yongshen.disputed||[]).length?`<div class="pp-tl pp-dim">有争议：${O.yongshen.disputed.map(v=>`${t(v.element)}（扶抑为${t(v.favorRole)}·${t(v.favorVerb)}，${t(v.climate)}盘调候忌${t(v.element)}）`).join("、")}　保留在喜用，不列入忌</div>`:""}
      <div class="pp-tl pp-dim">${t(O.yongshen.detail)}</div>`:"",V=e.climate||O.yongshen&&O.yongshen.climate||null,ee=V?(()=>{const v=Math.max(2,Math.min(98,Math.round(((Number(V.temp)||0)+3)/6*100))),y=V.need?`<em>调候取</em><b>${t(V.need.stem+V.need.element)}</b>`:"<em>气候平和</em>",de=!!(O.yongshen&&Array.isArray(O.yongshen.disputed))&&O.yongshen.disputed.some(da=>da.element===V.avoidElement),ce=V.need?`<em>忌</em><b>${t(V.avoidElement)}</b>${de?'<span class="pp-dim">（有争议）</span>':""}`:"",Me=(V.evidence||[]).length?`<em>依据</em><span>${t(V.evidence.join("、"))}</span>`:"",Ne=V.priority==="调候优先"?'<span class="mp-cli-p">调候优先</span>':'<span class="mp-cli-p">扶抑为主</span>',we=e.frame&&e.frame.yongshen&&e.frame.yongshen.qt,Ce=we?`<div class="mp-qt">
          <div class="mp-qt-h"><b>穷通宝鉴</b><span>${t(we.label)}</span></div>
          <div class="mp-qt-y"><em>用神</em>${we.yong.map((da,$e)=>`<b class="${$e===0?"first":""}">${t(da)}</b>`).join("")}<em>首取 ${t(we.primary)}</em></div>
          <div class="mp-qt-q" title="${t(we.quote)}">「${t(we.quote)}」<span>第 ${we.chapter} 章${we.truncated?" · 首段更长，摘句下略":""}${we.note?" · "+t(we.note):""}</span></div>
        </div>`:"";return`<section class="mp-cli" aria-label="寒暖燥湿">
        <div class="mp-cli-h"><b>寒暖燥湿</b><span class="mp-cli-k">${t(V.label||"")}</span>${Ne}</div>
        <div class="mp-cli-bar" title="寒 ← → 热"><i style="left:${v}%"></i></div>
        <div class="mp-cli-axis"><span>寒</span><span>平</span><span>热</span></div>
        <div class="mp-cli-row">${y}${ce}${Me}</div>
        <div class="mp-cli-narr">${t(V.narration||"")}</div>
        ${Ce}
      </section>`})():"",Te=O.godStats?`<div class="pp-chips">${Object.entries(O.godStats.groups).map(([v,y])=>`<span class="pp-chip">${v} ${y}</span>`).join("")}</div>`:"",j=e.dayun.list.map(v=>{const y=v.luck||null;return`<span class="pp-chip ${y?le(y.tier):""}" title="${t(`${v.fromDate?`${v.fromDate} 交运；`:""}${y?`${y.tier} ${y.score}｜${(y.reasons||[]).join("；")}`:""}`)}">${v.startAge} ${v.ganzhi}${v.relations&&v.relations.length?` <i class="pp-drel">${v.relations.join("")}</i>`:""}${y?` ${y.tier}`:""}</span>`}).join(""),q=e.liunian&&e.liunian.length?`<div class="pp-chips">${e.liunian.slice(0,8).map(v=>{const y=v.luck||null,de=v.suiyun&&Array.isArray(v.suiyun.signals)?v.suiyun.signals:[],ce=de.length?`｜${de.map(Me=>Me.detail).join("；")}`:"";return`<span class="pp-chip ${y?le(y.tier):""}" title="${t(y?`${y.tier} ${y.score}｜${(y.reasons||[]).join("；")}${ce}`:ce.replace(/^｜/,""))}">${v.year} ${v.ganzhi}${y?` ${y.tier}`:""}</span>`}).join("")}</div>`:"",E=(e.liunian||[]).filter(v=>v.suiyun&&Array.isArray(v.suiyun.signals)&&v.suiyun.signals.length),ne=e.suiyunClassic,be=ne?`<div class="pp-dim pp-sy-src" title="${t(ne.plain||"")}">《${t(ne.bookName||"")}·${t(ne.chapter||"")}》「${t(ne.quote||"")}」</div>`:"",se=E.length?`<div class="pp-tl pp-dim">岁运提示（只标干支变动，不判吉凶）</div><div class="pp-chips">${E.map(v=>`<span class="pp-chip" title="${t(`${v.suiyun.signals.map(y=>y.detail).join("；")}｜${v.suiyun.note||""}`)}">${v.year} ${t(v.suiyun.signals.map(y=>`${y.type}${(y.type.startsWith("流年")||y.type.startsWith("大运"))&&y.target?`·${y.target}`:""}`).join("/"))}</span>`).join("")}</div>${be}`:"",je=e.strength?`<div class="pp-str">日主强弱：<b>${e.strength.level}</b>${e.strength.score}　<span class="pp-dim">${e.strength.detail}</span></div>`:"",ye=e.strength&&e.strength.branchStructure,H=ye?(()=>{const v=ye.branches.map(Ne=>`${t(Ne.label)}${t(Ne.branch)}<i class="pp-drel">·${t(Ne.camp)}</i>${ye.placeholderHour&&Ne.key==="hour"?'<span class="pp-dim">占位</span>':""}`).join(" "),y=ye.odd&&ye.odd.length?`<span class="pp-st-odd">异类 ${ye.odd.map(Ne=>`${t(Ne.label)}${t(Ne.branch)}（${Ne.weight}分）`).join("、")}</span>`:'<span class="pp-st-odd">无异类</span>',de=ye.congProb!=null?`　从格 ${t(ye.congRange)}`:"　不套从格概率",ce=ye.balance||{},Me=ce.branch?`　支 ${ce.branch.A}:${ce.branch.B}　合干 ${ce.total?`${ce.total.A}:${ce.total.B}`:"—"}`:"";return`<div class="pp-struct" title="${t(`${ye.method}；${ye.note}`)}"><span class="pp-st-code">${t(ye.code)}</span>${v}　${y}${de}${Me}<span class="pp-dim">　静态结构，只作标注，不改上面的旺衰评分</span></div>`})():"",J=e.relations&&Array.isArray(e.relations.anhe)?e.relations.anhe:[],Y=J.length?`<div class="pp-anhe" title="${t(e.relations.anheNote||"")}"><b>暗合</b>${J.map(v=>t(v)).join("　")}<span class="pp-dim">　另列，不并入上面的合冲刑害；${J.length===1?"只一对，按口径可忽略":`共 ${J.length} 对`}</span></div>`:"",ge=e.shensha&&e.shensha.groups||[],fe=ge.length?`
      <div class="pp-ssx">
        <div class="ssx-h"><b>神煞全览</b><span>共 ${e.shensha.count} 见 · ${ge.length} 类 · 悬停看查法</span></div>
        ${ge.map(v=>`<div class="pp-ssg"><span class="ssg-gt">${v.cat}</span><span class="ssg-gi">${v.items.map(y=>`<span class="pp-ssi ${y.luck||"neutral"}" title="${t(`${y.via}查${y.target} ｜ ${y.rule}`)}">${y.name}<em>${y.pillars.map(de=>p[de]||"").join("")}</em></span>`).join("")}</span></div>`).join("")}
        <div class="ssx-h" style="border-top:none;padding-top:4px;margin-top:4px">神煞只作参考，吉凶仍须看格局、旺衰与行运。</div>
      </div>`:"";return s.briefHTML(e)+`<div class="pp" style="padding:12px">
      <table class="pp-bz">${b}<tbody>${F}</tbody></table>
      ${e.hourUnknown?'<div class="pp-warn" role="note">时柱暂缺：只排年/月/日三柱，起运与交运按日估算。时柱按正午暂算，涉及时柱的结论仅供参考。</div>':""}
      <div class="pp-rel"><div><b>天干</b>${e.relations&&e.relations.stems.length?e.relations.stems.join(" · "):"—"}</div>
      <div><b>地支</b>${e.relations&&e.relations.branches.length?e.relations.branches.join(" · "):"—"}</div></div>
      ${je}
      ${H}
      ${Y}
      ${N("格局",I)}
      ${N("用神",ie)}
      ${ee}
      ${Array.isArray(e.classics)&&e.classics.length?`<section class="mp-cl" aria-label="古籍原文">
        <div class="mp-cl-h"><b>古籍原文</b><span>照录通行本，释义为白话自撰</span></div>
        ${e.classics.map(v=>`<div class="mp-cl-e">
          <div class="mp-cl-t"><b>${t(({ziping:"子平真诠",ditian:"滴天髓",sanming:"三命通会"}[v.book]||v.book)+"·"+v.chapter)}</b></div>
          <div class="mp-cl-q">「${t(v.quote)}」</div>
          <div class="mp-cl-p">${t(v.plain)}</div>
        </div>`).join("")}
      </section>`:""}
      ${N("五行与十神",`<div class="pp-chips">${L}</div>${Te}`)}
      ${N("大运",`${s.curveHTML(e)}<div class="pp-chips">${j}</div>`)}
      ${q?N("流年",q+se):""}
      ${e.palaces?N("胎命身",`<div class="pp-chips">
        <span class="pp-chip" title="${t(e.palaces.taiyuan.note)}">胎元 ${t(e.palaces.taiyuan.ganzhi)}</span>
        ${e.palaces.taixi?`<span class="pp-chip" title="${t(e.palaces.taixi.note)}">胎息 ${t(e.palaces.taixi.ganzhi)}</span>`:""}
        ${e.palaces.minggong?`<span class="pp-chip" title="${t(e.palaces.minggong.note)}">命宫 ${t(e.palaces.minggong.ganzhi)}</span>`:""}
        ${e.palaces.shengong?`<span class="pp-chip" title="${t(e.palaces.shengong.note)}">身宫 ${t(e.palaces.shengong.ganzhi)}</span>`:""}
        ${!e.palaces.minggong||!e.palaces.shengong?'<span class="pp-chip" title="命宫与身宫由生月与生时支合数定宫；时柱暂缺，这两宫不排">命宫·身宫 时柱暂缺不排</span>':""}
      </div>`):""}
      ${fe}
      <div style="margin-top:8px;font-size:12px;color:var(--muted)">上一节 ${e.jieqi.previous.name} ${e.jieqi.previous.time}　下一节 ${e.jieqi.next.name} ${e.jieqi.next.time}　${e.dayun.rule}，${e.dayun.startAge.years}岁起运${e.dayun.jiao&&e.dayun.jiao.at?`（交运 ${e.dayun.jiao.at}，${e.dayun.jiao.frame}）`:""}${e.dayun.startAgeExact&&Number.isInteger(e.dayun.startAgeExact.years)?`　精确 ${e.dayun.startAgeExact.years}年${e.dayun.startAgeExact.months}月${e.dayun.startAgeExact.days}天${e.dayun.startAgeExact.hours}时（截断到日时；上面是四舍五入到月）`:""}</div>
    </div>`};const Bt={natal:"命盘解析",divination:"卦象解析",card:"牌阵解析"},ra={同向:"good",有张力:"watch",互补:"alt"},Gt=e=>`<div class="mp-cross">${e.map(i=>{const p=ra[i.stance]||"plain";return`<div class="mp-cross-row">
      <div class="mp-cross-h"><span class="mp-cross-l">${t(i.label)}</span><span class="mp-cross-tag t-${p}">${t(i.stance||"—")}</span></div>
      <div class="mp-cross-b">
        <div class="mp-cross-cell"><b>八字</b><span>${t(i.bazi||"—")}</span></div>
        <div class="mp-cross-cell"><b>紫微</b><span>${t(i.ziwei||"—")}</span></div>
      </div>
      ${i.note?`<div class="mp-cross-note">${t(i.note)}</div>`:""}
    </div>`}).join("")}</div>`;s.interpretHTML=function(e,i){if(!e||!(e.dimensions&&e.dimensions.length||e.sections&&e.sections.length)&&!e.error&&!e.answer)return"";const l=!!(i&&i.folded);let o=-1;(e.dimensions||[]).forEach((f,ie)=>{f.knowledge&&f.knowledge.length&&(o=ie)});const d=(e.dimensions||[]).map((f,ie)=>`<div class="mp-it-dim${f.focused?" focus":""}">
      <div class="mp-it-dh"><span class="mp-it-dno">${ie+1}</span><span class="mp-it-dlabel">${t(f.label)}</span>${f.focused?'<span class="mp-it-focus">最贴近你的问题</span>':""}${f.confidence?`<span class="mp-it-conf c-${t(f.confidence)}">置信度 ${t(f.confidence)}</span>`:""}</div>
      ${f.plain?`<div class="mp-it-dplain">${t(f.plain)}</div>`:""}
      <div class="mp-it-dtext">${t(f.text)}</div>
      ${f.evidence&&f.evidence.length?`<details class="mp-it-ev"><summary>依据 · ${t(f.evidence.length)} 条盘面事实</summary><div class="mp-it-ev-body">${f.evidence.map(V=>`<span class="mp-it-ev-item">${t(V)}</span>`).join("")}<span class="mp-it-ev-tech">技法：${t(e.technique||e.systemLabel||"")}</span></div></details>`:""}
      ${f.knowledge&&f.knowledge.length?`<div class="mp-it-know">${f.knowledge.map(V=>`<div class="know-row"><span class="know-status ${V.status}">${t(V.statusLabel)}</span><span class="know-body"><b>${t(V.gist)}</b>${t(V.detail)}${V.source?`<i>出处：${t(V.source)}</i>`:""}${V.note?`<em>注：${t(V.note)}</em>`:""}</span></div>`).join("")}${ie===o&&e.knowledgeNote?`<div class="know-disc">${t(e.knowledgeNote)}</div>`:""}</div>`:""}
      ${f.advice?`<div class="mp-it-adv"><b>建议</b>${t(f.advice)}</div>`:""}
    </div>`).join(""),c=e.outline&&e.outline.length?`<div class="mp-outline"><div class="mp-outline-h">一页读懂</div>${e.outline.map(f=>`<div class="mp-outline-row"><b>${t(f.label)}</b><span>${t(f.text)}</span></div>`).join("")}</div>`:"",g=e.sections&&e.sections.length?`<nav class="mp-toc" aria-label="报告目录">${e.sections.map(f=>`<a href="#mp-sec-${t(f.key)}">${t(f.label)}</a>`).join("")}</nav>`:"",m=e.tables&&e.tables.length?`<div class="mp-tables">${e.tables.filter(f=>Array.isArray(f.rows)&&f.rows.length).map(f=>`<div class="mp-table-wrap">
          <div class="mp-table-h">${t(f.title)}</div>
          <div class="mp-table-scroll"><table class="mp-table">
            <thead><tr>${f.columns.map(ie=>`<th scope="col">${t(ie)}</th>`).join("")}</tr></thead>
            <tbody>${f.rows.map(ie=>`<tr>${ie.map((V,ee)=>`<td data-label="${t(f.columns[ee]||"")}">${t(V)}</td>`).join("")}</tr>`).join("")}</tbody>
          </table></div>
        </div>`).join("")}</div>`:"",b=f=>String(f||"").split(`
`).map(ie=>`<div class="mp-it-p">${t(ie).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>")}</div>`).join(""),x=e.sections&&e.sections.length?`<div class="mp-it-secs">${e.sections.map(f=>`<div class="mp-it-sec${f.tone?` tone-${t(f.tone)}`:""}" id="mp-sec-${t(f.key)}">
        <div class="mp-it-sh">${t(f.label)}</div>
        <div class="mp-it-stext">${Array.isArray(f.items)&&f.items.length?Gt(f.items):b(f.text)}</div>
      </div>`).join("")}</div>`:"",w=[e.systemLabel,Bt[e.moduleType]||e.moduleType].filter(Boolean),$=e.ask,C=$&&$.question?t($.question):"",A=$&&(C||$.direction&&$.direction!=="general")?`<div class="mp-it-ask">${C?`<span class="ask-q">问题：${C}</span><span class="ask-sep">｜</span>`:""}<span class="ask-d">询问方向：${t($.directionLabel||"综合")}</span></div>`:"",_=e.answer?`<div class="mp-it-ans"><b>${C?"先答所问":"先看结论"}</b>${t(e.answer)}</div>`:"",Q=e.plain?`<div class="mp-it-plain"><b>说人话</b>${t(e.plain)}</div>`:"",F=e.followups&&e.followups.length?`<div class="mp-it-fu"><b>还可以这样追问</b><ul>${e.followups.map(f=>`<li>${t(f)}</li>`).join("")}</ul></div>`:"",L=e.glossary&&e.glossary.length?`<details class="mp-it-gloss"><summary>名词解释（${e.glossary.length} 条）</summary>${e.glossary.map(f=>`<div><span>${t(f.term)}</span>${t(f.plain)}</div>`).join("")}</details>`:"",O=e.limits&&e.limits.length?`<details class="mp-it-limits"><summary>本插件不回答什么（${e.limits.length} 条）</summary>${e.limits.map(f=>`<div><b>${t(f.title)}</b>${t(f.text)}</div>`).join("")}</details>`:"",N=e.system&&/^(liuyao|meihua|daliuren|qimen|tarot|xiaoliuren)$/.test(e.system)?`<div class="mp-askcopy-row"><button type="button" class="mp-askcopy" data-mp-askcopy="${t(e.system)}">复制问事提示</button><span class="mp-askcopy-hint">把这张盘和你的问题打包成一段提示，粘到任何对话里都能用</span></div>`:"",I=e.guide?`<details class="mp-guide">
      <summary><b>${t(e.guide.title)}</b><span class="mp-guide-sub">数 / 象 / 辞</span></summary>
      <div class="mp-guide-body">
        <p class="mp-guide-lead">${t(e.guide.lead)}</p>
        <ol class="mp-guide-layers">${(e.guide.layers||[]).map(f=>`<li><b>${t(f.name)}<i>${t(f.sub)}</i></b><span>${t(f.text)}</span><em>${t(f.hint)}</em></li>`).join("")}</ol>
        <div class="mp-guide-check"><b>${t(e.guide.check.title)}</b><ol>${(e.guide.check.items||[]).map(f=>`<li>${t(f)}</li>`).join("")}</ol><p>${t(e.guide.check.tail)}</p></div>
        <div class="mp-guide-parts"><b>${t(e.guide.parts.title)}</b><ul>${(e.guide.parts.rows||[]).map(f=>`<li><span>${t(f[0])}</span>${t(f[1])}</li>`).join("")}</ul><p>${t(e.guide.parts.tail)}</p></div>
        <p class="mp-guide-close">${t(e.guide.closing)}</p>
      </div></details>`:"";return`<div class="mp-it${l?" folded":""}">
      <button type="button" class="mp-it-head" aria-expanded="${l?"false":"true"}">
        <span class="mp-it-arrow" aria-hidden="true">▾</span>
        <span class="mp-it-title">解析与详解</span>${w.map(f=>`<span class="mp-it-tag">${t(f)}</span>`).join("")}
        <span class="mp-it-hint">${l?"点击展开":"点击收起"}</span>
      </button>
      <div class="mp-it-wrap">
        ${N}
        ${A}
        ${_}
        ${Q}
        ${e.lead?`<div class="mp-it-lead">${t(e.lead)}</div>`:""}
        ${e.error?`<div class="mp-it-err"><b>⚠ 解析生成失败</b>${t(e.error)}——上方盘面数据本身可用</div>`:""}
    ${I}
    ${c}
        ${g}
        <div class="mp-it-body">${d}</div>
        ${x}
        ${m}
        ${F}
        ${L}
        ${O}
        <div class="mp-it-dis">${t(e.disclaimer)}</div>
      </div>
    </div>`},s.followupHTML=function(e){if(!e)return"";const i=e.evidence&&e.evidence.length?`<div class="mp-fu-ev">依据：${e.evidence.map(p=>t(p)).join("；")}　置信度：${t(e.confidence||"弱")}</div>`:"";return`<div class="mp-fu${e.ok?"":" miss"}">
      <div class="mp-fu-h">追问 · ${t(e.question)}</div>
      <div class="mp-fu-a">${t(e.answer)}</div>
      ${i}
    </div>`},s.resultWithInterpret=function(e,i,p){return(e||"")+s.interpretHTML(i,p)},s.caliberHTML=function(e){const i=e&&Array.isArray(e.switches)?e.switches.filter(m=>m&&m.key):[];if(!i.length)return"";const p=i.filter(m=>!m.error&&m.total>0),l=p.length?`${i.length} 组开关中 ${p.length} 组影响此盘：${p.map(m=>m.short||m.title).join("、")}。`:`本盘对 ${i.length} 组开关都不敏感：换成另一档也不变。`,o=m=>{if(m.error)return`<div class="mp-cdiff-same">未能对照：${t(m.error)}</div>`;if(!m.total)return'<div class="mp-cdiff-same">无变化 · 此盘不受这一开关影响</div>';const b=Array.isArray(m.roots)?m.roots:[];return b.length?`<div class="mp-cdiff-roots">${b.map(x=>`<div class="mp-cdiff-root"><span class="mp-cdiff-k">${t(x.label)}</span><span class="mp-cdiff-from">${t(x.from)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-to">${t(x.to)}</span></div>`).join("")}</div>`:`<div class="mp-cdiff-same">无单一根因；逐字段差异 ${Number(m.total)||0} 处</div>`},d=m=>{const b=(Array.isArray(m.views)?m.views:[]).filter(x=>x&&x.changed);return m.error||!m.total||!b.length?"":`<table class="mp-cview"><thead><tr><th scope="col">项</th><th scope="col">${t(m.currentLabel)}</th><th scope="col">${t(m.altLabel)}</th></tr></thead><tbody>`+b.map(x=>`<tr><th scope="row">${t(x.label)}</th><td>${t(x.current)}</td><td>${t(x.alt)}</td></tr>`).join("")+"</tbody></table>"},c=m=>{const b=Array.isArray(m.categories)?m.categories:[];if(m.error||!m.total||!b.length)return"";const x=b.slice(0,6);return`<div class="mp-cdiff-cats">${x.map(w=>`<span class="mp-cdiff-cat">${t(w.name)} ${Number(w.count)||0} 处</span>`).join("")}`+(b.length>x.length?`<span class="mp-cdiff-cat">另 ${b.length-x.length} 类</span>`:"")+"</div>"},g=i.map(m=>`<div class="mp-cdiff-row"><div class="mp-cdiff-h"><b>${t(m.title)}</b><span class="mp-cdiff-count${m.total>0?" on":""}">${m.error?"未能对照":m.total?`${Number(m.total)||0} 处`:"无变化"}</span></div><div class="mp-cdiff-ab"><span class="mp-cdiff-pill now">当前 · ${t(m.currentLabel)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-pill alt">换成 · ${t(m.altLabel)}</span></div>${o(m)}${d(m)}${c(m)}</div>`).join("");return`<details class="mp-cdiff" aria-label="口径对照">
      <summary><span class="mp-cdiff-title">口径对照</span><span class="mp-cdiff-lead">${t(l)}</span><span class="mp-cdiff-more">展开逐字差异</span></summary>
      <div class="mp-cdiff-body">${g}
        <div class="mp-cdiff-note">同一组输入、只换一个开关；只列变化字段与根因，不判哪套口径更准，也不改上方盘面。</div>
      </div>
    </details>`},s.handleHTML=function(e){return typeof e!="string"||!e?"":`<section class="mp-handle" aria-label="排盘句柄">
      <span class="mp-handle-title">排盘句柄</span>
      <code class="mp-handle-code" title="${t(e)}">${t(e)}</code>
      <button type="button" class="mp-handle-copy" data-handle-copy="${t(e)}" aria-label="复制排盘句柄">复制句柄</button>
      <span class="mp-handle-hint">追问同一张盘时把它连同增量参数（年份、方向、所问之事）一并交给助手，不必重报出生信息。句柄是编码不是加密，含出生时间与出生地，别公开贴出。</span>
    </section>`},s.revisionHTML=function(e){if(!e||typeof e!="object")return"";const i=Array.isArray(e.applied)?e.applied:[],p=Array.isArray(e.ignored)?e.ignored:[];if(!i.length&&!p.length)return"";const l=i.map(o=>{const d=o.fromDisplay==null?"（未设）":o.fromDisplay;return`<li><span class="k">${t(o.label||o.key)}</span><span class="v"><span class="old">${t(d)}</span> → <span class="new">${t(o.display)}</span></span></li>`}).join("");return`<section class="mp-revise" aria-label="一句话改参">
      <div class="mp-revise-head"><span class="mp-revise-title">一句话改参</span><span class="mp-revise-text">「${t(e.text||"")}」</span></div>
      ${l?`<ul class="mp-revise-list">${l}</ul>`:'<p class="mp-revise-ignored">没有识别到可改的参数，仍按原参数排盘。</p>'}
      ${p.length?`<p class="mp-revise-ignored">未处理：${t(p.join("；"))}</p>`:""}
    </section>`},s.shadowHTML=function(e,i){if(!e||!e.id)return"";const p=[];e.version&&p.push(`版本 <b>${t(e.version)}</b>`),e.baseId&&p.push(`基础指纹 <b>${t(e.baseId)}</b>`),p.push("同参数同 ID");const l=[];e.reproducible===!1&&l.push(`不可复算：${t(e.reason||"参数不足")}`);const o=e.reproducible===!0&&e.asOfPinned===!1&&(e.system==="bazi"||e.system==="ziwei")?'<div class="mp-shadow-hint">未固定 asOf：流年 / 流月随「此刻」变化；要逐字比对请在输入里固定 asOf。</div>':"",d=i&&i.sameId!==!1&&(i.versionChanged||Number(i.total)>0);let c="";if(d){const g=Number(i.total)||0,m=t(i.fromVersion||"—"),b=t(i.toVersion||e.version||"—"),x=Array.isArray(i.roots)?i.roots:[],w=x.slice(0,8),$=w.length?`<div class="mp-cdiff-roots">${w.map(_=>`<div class="mp-cdiff-root"><span class="mp-cdiff-k">${t(_.label)}</span><span class="mp-cdiff-from">${t(_.from)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-to">${t(_.to)}</span></div>`).join("")}`+(x.length>w.length?`<div class="same">另 ${x.length-w.length} 处根因</div>`:"")+"</div>":`<div class="same">${g?"无单一根因；逐字段变化 "+g+" 处":"字段 0 处变化：同一张盘跨版本逐字一致"}</div>`,C=Array.isArray(i.categories)?i.categories:[],A=C.length?`<div class="mp-cdiff-cats">${C.slice(0,6).map(_=>`<span class="mp-cdiff-cat">${t(_.name)} ${Number(_.count)||0} 处</span>`).join("")}`+(C.length>6?`<span class="mp-cdiff-cat">另 ${C.length-6} 类</span>`:"")+"</div>":"";c=`<details class="mp-shadow-diff"${g>0?" open":""}>
        <summary><b>与上次同盘比对</b><span class="tag">${m} → ${b} · ${g?`${g} 处变化`:"0 处变化"}</span></summary>
        ${$}${A}
        <div class="note">同一 baseId（同一组归一化参数）的两次结果；只比盘面字段，不含摘要、解析与古籍等文本层。</div>
      </details>`}return`<section class="mp-shadow" aria-label="影子盘">
      <div class="mp-shadow-head"><span class="mp-shadow-title">影子盘</span><code class="mp-shadow-id">${t(e.id)}</code>
        <button type="button" class="mp-shadow-copy" data-shadow-copy="${t(e.id)}" aria-label="复制影子盘 ID">复制 ID</button></div>
      <div class="mp-shadow-meta">${p.join('<span aria-hidden="true">·</span>')}</div>
      ${l.map(g=>`<div class="mp-shadow-warn">⚠ ${g}</div>`).join("")}
      ${o}
      ${c}
    </section>`},s.shadowTrack=function(e){const i=window.Engine||window.__PP&&window.__PP.Engine;if(!i||!i.shadowSnapshot||!i.shadowDiff)return null;let p=null;try{p=i.shadowSnapshot(e)}catch{return null}if(!p||!p.shadow||!p.shadow.baseId)return null;const l="mp-shadow-v1";let o={};try{const g=window.localStorage?window.localStorage.getItem(l):null,m=g?JSON.parse(g):{};m&&typeof m=="object"&&!Array.isArray(m)&&(o=m)}catch{o={}}const d=o[p.shadow.baseId];let c=null;if(d)try{c=i.shadowDiff(d,p)}catch{c=null}p.at=Date.now(),o[p.shadow.baseId]=p;try{const g=Object.keys(o);if(g.length>24){g.sort((m,b)=>(Number(o[m]&&o[m].at)||0)-(Number(o[b]&&o[b].at)||0));for(const m of g.slice(0,g.length-24))delete o[m]}window.localStorage&&window.localStorage.setItem(l,JSON.stringify(o))}catch{}return c};const Ea="dsh-metaphysics/profiles-v1",Ee=24,_a=16,et=40,at=60,Oa=["bazi","ziwei","liuyao","tarot","meihua","daliuren","hepan","qimen","almanac","zeri","chenggu","xiaoliuren","star","numerology","mbti","trend","fengshui","name","convert"];s.PROF_KEY=Ea,s.PROF_MAX=Ee,s.PROF_KINDS=Oa;const ba={bazi:"八字",ziwei:"紫微",liuyao:"六爻",tarot:"塔罗",meihua:"梅花",daliuren:"六壬",hepan:"合盘",qimen:"奇门",almanac:"黄历",zeri:"择日",chenggu:"称骨",xiaoliuren:"小六壬",star:"星座",numerology:"生命数字",mbti:"人格",trend:"人生K线",fengshui:"风水",name:"起名",convert:"农历"};s.profKindLabel=e=>ba[e]||String(e||"");const ze=e=>typeof e=="string";function We(e){if(!e||typeof e!="object"||Array.isArray(e)||!ze(e.id)||!e.id||e.id.length>40||!ze(e.kind)||Oa.indexOf(e.kind)<0)return null;const i=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e.date||""));if(!i)return null;const p=Number(i[1]),l=Number(i[2]),o=Number(i[3]);if(l<1||l>12||o<1||o>new Date(p,l,0).getDate())return null;const d=ze(e.time)&&/^([01]?\d|2[0-3]):[0-5]\d$/.test(e.time)?e.time:"";return{id:e.id,kind:e.kind,label:ze(e.label)?e.label.slice(0,_a):"",date:e.date,time:e.hourUnknown===!0?"":d,hourUnknown:e.hourUnknown===!0,trueSolar:e.trueSolar!==!1,lateZi:e.lateZi!==!1,gender:e.gender==="male"||e.gender==="female"?e.gender:"",address:ze(e.address)?e.address.slice(0,et):"",note:ze(e.note)?e.note.slice(0,at):"",pinned:e.pinned===!0,createdAt:Number(e.createdAt)||0,lastUsedAt:Number(e.lastUsedAt)||0,uses:Number(e.uses)||0}}function xt(){try{const e=window.localStorage?window.localStorage.getItem(Ea):null,i=e?JSON.parse(e):[];return Array.isArray(i)?i:[]}catch{return[]}}function De(e){return e.slice().sort((i,p)=>(p.pinned?1:0)-(i.pinned?1:0)||(p.lastUsedAt||p.createdAt||0)-(i.lastUsedAt||i.createdAt||0)||(p.createdAt||0)-(i.createdAt||0))}s.profilesLoad=function(){const e=[],i=Object.create(null);for(const p of xt()){const l=We(p);l&&!i[l.id]&&(i[l.id]=1,e.push(l))}return De(e)},s.profilesSave=function(e){const i=De(Array.isArray(e)?e.slice(0,Ee):[]);try{return window.localStorage?(window.localStorage.setItem(Ea,JSON.stringify(i)),!0):!1}catch{return!1}};let tt=0;s.profilesNewId=function(){const e=Object.create(null);for(const p of s.profilesLoad())e[p.id]=1;let i;do i=`p${Date.now().toString(36)}${(tt++).toString(36)}`;while(e[i]);return i},s.profilesPut=function(e){const i=We(Object.assign({id:s.profilesNewId(),createdAt:Date.now(),lastUsedAt:Date.now()},e));if(!i)return{ok:!1,list:s.profilesLoad()};const p=s.profilesLoad(),l=p.findIndex(o=>o.id===i.id);if(l>=0){const o=p[l];i.createdAt=o.createdAt||i.createdAt,i.lastUsedAt=o.lastUsedAt,i.uses=o.uses,i.pinned=o.pinned,p.splice(l,1,i)}else p.push(i);if(p.length>Ee){const o=p.slice().sort((g,m)=>(g.lastUsedAt||g.createdAt)-(m.lastUsedAt||m.createdAt)),d=o.find(g=>g.id!==i.id)||o[0],c=p.indexOf(d);c>=0&&p.splice(c,1)}return s.profilesSave(p)?{ok:!0,list:De(p),item:i}:{ok:!1,list:s.profilesLoad()}},s.profilesRemove=function(e){const i=s.profilesLoad().filter(p=>p.id!==e);return s.profilesSave(i)?i:s.profilesLoad()},s.profilesPin=function(e){const i=s.profilesLoad().map(p=>p.id===e?Object.assign({},p,{pinned:!p.pinned}):p);return s.profilesSave(i)?De(i):s.profilesLoad()},s.profilesTouch=function(e){let i=!1;const p=s.profilesLoad().map(l=>l.id!==e?l:(i=!0,Object.assign({},l,{lastUsedAt:Date.now(),uses:(l.uses||0)+1})));return i?s.profilesSave(p)?De(p):s.profilesLoad():p};const Ha=864e5;function it(e){const i=Number(e)||0;if(!i)return"未排过";const p=Math.floor((Date.now()-i)/Ha);if(p<=0)return"今天排过";if(p===1)return"昨天排过";if(p<30)return`${p} 天前排过`;const l=new Date(i);return`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}-${String(l.getDate()).padStart(2,"0")} 排过`}s.profilesAgo=it;const la="dsh-metaphysics/cases-v1",Pa=480,Xe=["pending","hit","miss","void"],nt={pending:"待验",hit:"应验",miss:"未应",void:"作废"},ha=120;s.CASE_KEY=la,s.CASE_MAX=Pa,s.CASE_STATUS=Xe,s.caseStatusLabel=e=>nt[e]||nt.pending;function Qe(e){if(!e||typeof e!="object"||Array.isArray(e)||!ze(e.id)||!e.id||e.id.length>64)return null;const i=e.entry;if(!i||typeof i!="object"||Array.isArray(i)||!ze(i.kind)||Oa.indexOf(i.kind)<0||!ze(i.date)&&!ze(i.time)&&!ze(i.question))return null;const p=Number(e.at||i.at)||0;return p?{id:e.id,at:p,status:Xe.indexOf(e.status)>=0?e.status:"pending",note:ze(e.note)?e.note.slice(0,ha):"",question:ze(i.question)?i.question.slice(0,80):"",entry:i}:null}function He(){try{const e=window.localStorage?window.localStorage.getItem(la):null,i=e?JSON.parse(e):[];return Array.isArray(i)?i:[]}catch{return[]}}function ea(e){if(!window.localStorage)return!1;try{return window.localStorage.setItem(la,JSON.stringify(e.slice(0,Pa))),!0}catch{return!1}}s.casesSave=ea,s.casesLoad=function(){return He().map(Qe).filter(Boolean).sort((e,i)=>i.at-e.at||(e.id<i.id?1:-1))},s.casesNewId=function(){const e={};He().forEach(p=>{p&&p.id&&(e[p.id]=1)});let i="";for(let p=0;p<8&&(i="c"+Date.now().toString(36)+Math.floor(Math.random()*1296).toString(36),!!e[i]);p+=1);return i},s.casesAdd=function(e,i){const p=i||{};if(!e||typeof e!="object"||Array.isArray(e))return{ok:!1,list:s.casesLoad()};const l=s.casesLoad(),o=Number(e.at)||Date.now();if(l.some(m=>m.at>o-6e4&&m.entry.kind===e.kind&&m.entry.date===e.date&&m.entry.time===e.time&&(m.entry.question||"")===(e.question||"")&&(m.entry.lines||"")===(e.lines||"")))return{ok:!0,dup:!0,list:s.casesLoad()};const c=Qe({id:s.casesNewId(),at:o,status:p.status||"pending",note:p.note||"",entry:e});if(!c)return{ok:!1,list:s.casesLoad()};const g=[c].concat(l.filter(m=>m.id!==c.id)).slice(0,Pa);return ea(g)?{ok:!0,item:c,list:g}:{ok:!1,list:s.casesLoad()}},s.casesSetStatus=function(e,i){if(Xe.indexOf(i)<0)return s.casesLoad();const p=He().map(Qe).filter(Boolean).map(l=>l.id===e?Object.assign({},l,{status:i}):l);return ea(p)?p:s.casesLoad()},s.casesRemove=function(e){const i=He().map(Qe).filter(Boolean).filter(p=>p.id!==e);return ea(i)?i:s.casesLoad()},s.casesExport=function(e){return(Array.isArray(e)?e:s.casesLoad()).map(p=>JSON.stringify({id:p.id,at:p.at,atISO:new Date(p.at).toISOString(),kind:p.entry.kind,label:ze(p.entry.label)?p.entry.label:"",question:p.question,status:p.status,note:p.note,params:p.entry})).join(`
`)};const xa=/^(\d{4})-(\d{2})-(\d{2})$/,vt=/^(\d{1,2}):(\d{2})(:\d{2})?$/;function Fa(e){const i=ze(e)&&xa.exec(e.trim());return i?i[2]+"-"+i[3]:""}function yt(e){const i=ze(e)&&vt.exec(e.trim());return i?i[1]+":00":""}s.casesExportMasked=function(e){return(Array.isArray(e)?e:s.casesLoad()).map(p=>{const l=p.entry||{},o={};return Object.keys(l).forEach(d=>{if(d!=="address"){if(d==="date"){const c=Fa(l[d]);c&&(o.date=c);return}if(d==="time"){const c=yt(l[d]);c&&(o.time=c);return}d!=="question"&&(o[d]=l[d])}}),JSON.stringify({id:p.id,kind:l.kind||"",label:ze(l.label)?l.label:"",status:p.status,note:"",params:o})}).join(`
`)},s.casesMigrate=function(e){const i=Array.isArray(e)?e:[];if(!i.length)return{added:0,list:s.casesLoad()};const p=He().map(Qe).filter(Boolean),l={};p.forEach(d=>{l[d.id]=1});let o=0;for(let d=0;d<i.length;d+=1){const c=i[d];if(!c||typeof c!="object"||!ze(c.kind))continue;const g=Number(c.at)||0,m=`h-${g||"0"}-${d}-${c.kind}`;if(l[m])continue;const b=Qe({id:m,at:g||Date.now(),status:"pending",entry:c});b&&(l[m]=1,p.push(b),o+=1)}return o&&ea(p.sort((d,c)=>c.at-d.at)),{added:o,list:s.casesLoad()}};const Re={male:"♂",female:"♀"};s.profilesHTML=function(e,i){const p=i||{},l=(Array.isArray(e)?e:[]).map(d=>{const c=We(d);if(!c)return"";const g=[c.date,c.hourUnknown?"时辰未知":c.time,c.address].filter(Boolean).join(" "),m=p.editingId&&c.id===p.editingId,b=p.armedDel&&c.id===p.armedDel;return`<div class="mp-prof-card${c.pinned?" pinned":""}${m?" editing":""}" data-id="${t(c.id)}">
        <button type="button" class="mp-prof-use" data-mp-prof="use" data-id="${t(c.id)}"
          title="${t(`用「${c.label||c.kind}」的出生信息直接排盘`)}">
          <span class="mp-prof-nm">${t(c.label||"未命名")}${c.gender?`<i class="sx">${Re[c.gender]||""}</i>`:""}</span>
          <span class="mp-prof-sys">${t(s.profKindLabel?s.profKindLabel(c.kind):c.kind)}</span>
          <span class="mp-prof-bd">${t(g)}</span>
          <span class="mp-prof-at">${t(it(c.lastUsedAt||c.createdAt))}${c.uses?` · ${c.uses} 次`:""}${c.pinned?" · 置顶":""}</span>
        </button>
        <span class="mp-prof-ops">
          <button type="button" data-mp-prof="pin" data-id="${t(c.id)}" class="${c.pinned?"on":""}"
            aria-pressed="${c.pinned?"true":"false"}" title="置顶这张档案">${c.pinned?"已置顶":"置顶"}</button>
          <button type="button" data-mp-prof="edit" data-id="${t(c.id)}" title="把这张档案读回输入框，改完再存">改名</button>
          <button type="button" data-mp-prof="del" data-id="${t(c.id)}" class="${b?"on":""}"
            title="${b?"再点一次就从本机删除这张档案":"从本机删除这张档案（点两次确认）"}">${b?"确认删除":"删除"}</button>
        </span>
      </div>`}).join(""),o=l?`<div class="mp-prof-list">${l}</div>`:'<p class="mp-prof-empty">还没有存过命盘。填好出生信息，给这张盘起个称呼，点「存为我的命盘」——下次进来一点就出盘，不必重报。</p>';return`<section class="mp-prof" aria-label="我的命盘">
      <div class="mp-prof-h"><b>我的命盘</b><span class="mp-prof-sub">只存本机 · 不上传${e&&e.length?` · ${e.length}/${Ee}`:""}</span></div>
      ${o}
      ${p.bar||""}
    </section>`},s.profilesBarHTML=function(e){const i=e||{};return`<div class="mp-prof-bar">
        <input class="mp-prof-name" type="text" maxlength="${_a}" placeholder="称呼，如「我」「妈妈」" aria-label="档案称呼" value="${t(i.name||"")}">
        <button type="button" data-mp-prof="put"${i.canAdd===!1?" disabled":""}>${t(i.editingId?"更新这张档案":"存为我的命盘")}</button>
        ${i.editingId?'<button type="button" class="ghost" data-mp-prof="cancel">取消改名</button>':""}
        <span class="mp-prof-tip">${t(i.tip||(i.editingId?"改完出生信息或称呼，点「更新这张档案」覆盖原档。":"存的是出生时间与出生地这些输入，不是结果。"))}</span>
      </div>`},s.profEvent=function(e){let i=e&&e.closest?e.closest("[data-mp-prof]"):null;if(!i)return null;const p=i.getAttribute("data-mp-prof");return i.tagName==="BUTTON"&&i.disabled?null:{action:p,id:i.getAttribute("data-id")||"",name:i}};const st=["bazi","trend"],Da=["bazi","ziwei","liuyao","meihua","daliuren","qimen","hepan","chenggu","trend","fengshui","name","xiaoliuren"];s.profUsable=function(e){return!e||typeof e!="object"?!1:e.hourUnknown===!0||e.time?!0:Da.indexOf(String(e.kind||""))<0},s.profFromForm=function(e,i,p){const l=e||{},o=l.hourUnknown===!0&&st.indexOf(String(l.kind||""))>=0;return!o&&!/^([01]?\d|2[0-3]):[0-5]\d$/.test(String(l.time||"").trim())?null:We(Object.assign({id:p||s.profilesNewId(),kind:String(l.kind||""),label:String(i||"").trim().slice(0,_a)||(s.profKindLabel?s.profKindLabel(l.kind):String(l.kind||"")),date:String(l.date||""),time:String(l.time||""),hourUnknown:o,gender:String(l.gender||""),address:String(l.address||""),trueSolar:l.trueSolar!==!1,lateZi:l.lateZi!==!1,pinned:!1,createdAt:Date.now(),lastUsedAt:0,uses:0}))},s.traceHTML=function(e,i,p){if(!Array.isArray(e)||!e.length)return"";const l={liuyao:"六爻",bazi:"八字",ziwei:"紫微",qimen:"奇门",daliuren:"大六壬"}[i]||"命盘",o=e.map(m=>m&&m.field).filter(Boolean).join(" → "),d=typeof p=="string"?p:"",c=(m,b)=>{const x=String(m??"");return x.length>b?`${x.slice(0,b)}…`:x},g=e.map((m,b)=>{const x=Array.isArray(m.inputs)?m.inputs:[];return`<details class="mp-trace-step"${b===0?" open":""}>
        <summary><span class="mp-trace-no">${b+1}</span><span class="mp-trace-field">${t(m.field)}</span><span class="mp-trace-res">${t(c(m.result,44))}</span></summary>
        <div class="mp-trace-detail">
          <div class="mp-trace-rule"><b>规则</b>${t(m.rule)}</div>
          ${x.length?`<dl class="mp-trace-inputs">${x.map(w=>`<dt>${t(w.label)}</dt><dd>${t(w.value)}</dd>`).join("")}</dl>`:""}
          <div class="mp-trace-result"><b>结果</b>${t(m.result)}</div>
          ${m.source?`<div class="mp-trace-src"><b>出处</b>${t(m.source)}</div>`:""}
        </div>
      </details>`}).join("");return`<button type="button" class="mp-trace-card" data-trace-open aria-haspopup="dialog" aria-controls="mp-trace-layer">
        <span class="mp-trace-title">推导链</span><span class="mp-trace-flow">${t(o)}</span><span class="mp-trace-count">${e.length} 层 · 查看</span>
      </button>
      <div class="mp-trace-layer" id="mp-trace-layer" data-trace-layer aria-hidden="true">
        <div class="mp-trace-back" data-trace-close></div>
        <aside class="mp-trace-drawer" role="dialog" aria-modal="true" aria-labelledby="mp-trace-title">
          <div class="mp-trace-head">
            <div><b id="mp-trace-title">推导链 · ${t(l)}</b><span>${e.length} 层 · 每层给出规则、输入、结果与出处；只读，不重算</span></div>
            ${d?'<button type="button" class="mp-trace-copy" data-trace-copy aria-label="复制整条推导链的 Markdown">复制 Markdown</button>':""}
            <button type="button" class="mp-trace-close" data-trace-close aria-label="关闭推导链">✕</button>
          </div>
          <div class="mp-trace-body">${g}</div>
          ${d?`<textarea class="mp-trace-md" data-trace-md readonly hidden>${t(d)}</textarea>`:""}
        </aside>
      </div>`},s.almanacHTML=function(e){if(!e||!e.meta)return s.quickHTML(e);const i=e.ganzhi||{},p=e.dayGod||null,l=(C,A)=>(C||[]).map(_=>`<span class="mp-al-chip${A?` ${A}`:""}">${t(_)}</span>`).join(""),o=(C,A)=>A?`<div class="mp-al-cell"><em>${t(C)}</em><b>${t(A)}</b></div>`:"",d=e.xiu?`${e.xiu.name}宿（${e.xiu.luck}·${e.xiu.zheng}·${e.xiu.animal}）`:"",c=e.nayin&&e.nayin.day?e.nayin.day.name:"",g=e.chong?`${e.chong.text}${e.chong.sha?` ${e.chong.sha}`:""}`:"",m=(e.hours||[]).map(C=>`<span class="mp-al-hour ${C.luck==="吉"?"good":"bad"}"><i>${t(C.zhi)}</i><em>${t((C.ganZhi||"").slice(0,1))}</em><b>${t(C.shen||"")}</b><u>${t(C.luck||"")}</u></span>`).join(""),b=e.positions||{},x=(C,A)=>A?`<span class="mp-al-chip">${t(C)}·${t(typeof A=="string"?A:A.dir||"")}</span>`:"",w=e.lucky||{},$=p?`<span class="mp-al-badge ${p.luck==="吉"?"good":"bad"}">${t(p.name)}·${t(p.type)}·${t(p.luck)}</span>`:"";return`<section class="mp-al" aria-label="黄历">
      <div class="mp-al-h"><b>${t(e.meta.date||"")}</b><i>${t(e.meta.weekday||"")}　${t((e.lunar||{}).text||"")}</i></div>
      <div class="mp-al-gz">${t(i.year||"")}年　${t(i.month||"")}月　${t(i.day||"")}日　属${t(i.shengXiao||"")}　建除 ${t(e.zhiXing||"")}日　${$}</div>
      <div class="mp-al-yiji">
        <div class="mp-al-col"><em>宜</em><div class="mp-al-chips">${l(e.yi)}</div></div>
        <div class="mp-al-col"><em>忌</em><div class="mp-al-chips">${l(e.ji)}</div></div>
      </div>
      <div class="mp-al-grid">${o("二十八宿",d)}${o("日柱纳音",c)}${o("胎神",e.taiShen)}${o("冲煞",g)}</div>
      <div class="mp-al-row"><em>吉神方位</em><div class="mp-al-chips">${x("喜神",b.xiShen)}${x("财神",b.caiShen)}${x("福神",b.fuShen)}${x("阳贵",b.yangGui)}${x("阴贵",b.yinGui)}</div></div>
      <div class="mp-al-row"><em>时刻吉凶</em><div class="mp-al-hours">${m}</div></div>
      <div class="mp-al-row"><em>吉配生肖</em><div class="mp-al-chips">${w.liuhe?`<span class="mp-al-chip">六合·${t(w.liuhe)}</span>`:""}${l(w.sanhe||[])}</div></div>
      ${e.dailyHexagram?`<div class="mp-al-hex">每日一卦：<b>${t(e.dailyHexagram.name)}</b>　${t(e.dailyHexagram.meaning||"")}</div>`:""}
      <div class="mp-al-note">${t(e.meta&&e.meta.scope||"")}</div>
    </section>`};const wt=" liuyao tarot meihua daliuren qimen xiaoliuren ",Ra=" almanac zeri convert star numerology wuyunliuqi ",Ia={cast:"先看卦名或牌名——事情此刻的样子；再看动爻、正逆位，变化在那里。",person:"先找「你」那一格（日主、命宫或主质）；再看被强调的字或星。",day:"先看今天值什么，再看宜忌那几栏。"};s.plainHTML=function(e){if(!e||e.system==="taiyi")return"";const i=e.brief&&e.brief.lead||"";if(!i)return"";const p=" "+String(e.system||"")+" ",l=wt.indexOf(p)>=0?Ia.cast:Ra.indexOf(p)>=0?Ia.day:Ia.person;return'<div class="mp-pl"><p class="mp-pl-lead">'+t(i)+'</p><p class="mp-pl-how">'+t(l)+"</p></div>"},s.taiyiHTML=function(e){if(!e||!e.taiyi||!e.meta)return"";const i=e.taiyi,p=e.wenchang||{},l=e.shiji||{},o=e.jishen||{},d=e.suan||{},c=e.jiang||{},g=e.geju||{},b=[[9,"巽"],[2,"离"],[7,"坤"],[4,"震"],[5,"中"],[6,"兑"],[3,"艮"],[8,"坎"],[1,"乾"]].map(J=>{const Y=J[0],ge=J[1],fe=i.palace===Y,v=p.num===Y,y=l.palace===Y,de=(fe?'<i class="mp-ty-mark">太乙</i>':"")+(y?'<i class="mp-ty-mark s">始击</i>':"")+(v?'<i class="mp-ty-mark w">文昌</i>':"");return`<div class="mp-ty-cell${fe?" on":""}${ge==="中"?" mid":""}"><b>${t(ge)}</b><em>${Y}</em>${de}</div>`}).join(""),x=e.scope&&e.scope.notCovered||[],w=e.month||{},$=e.day||{},C=e.hour||{},A=w.taiyi&&w.taiyi.palaceName||"",_=String(w.taiyi&&w.taiyi.unitInPalace||""),Q=w.mu?w.mu.pos+"（"+w.mu.god+"）":"",F=w.jishen&&w.jishen.branch||"",L=$.taiyi&&$.taiyi.palaceName||"",O=String($.taiyi&&$.taiyi.unitInPalace||""),le=$.mu?$.mu.pos+"（"+$.mu.god+"）":"",N=$.jishen&&$.jishen.branch||"",I=C.taiyi&&C.taiyi.palaceName||"",f=String(C.taiyi&&C.taiyi.unitInPalace||""),ie=C.jishen&&C.jishen.branch||"",V=e.jixiong||{},ee=e.verdict||{},Te=ee.grade||V.grade||"xiong",j=ee.label||V.label||"凶",q=e.shenjiang||{},E=q.rows?`${q.stem}日、${q.day?"昼贵":"夜贵"}起${q.startBranch}${q.dir>0?"顺":"逆"}行；吉神下：${(q.goods||[]).join("、")||"无"}；凶神下：${(q.bads||[]).join("、")||"无"}`:"未排",ne=V.grade||"xiong",be=V.label||"凶",se=e.gate&&e.gate.gate||"",je={掩:"客方的目和太乙挤在同一格",击:"始击挨在太乙左右",格:"太乙和始击隔一格正面对上",对:"文昌从对面顶过来",提:"客大将和文昌挤在一格",迫:"有将贴得太近，就在太乙前后一格",囚:"有将被关在太乙那一格里",关:"主客两边的人撞在一处"},ye=(g.list||[]).map(J=>{const Y=String(J).charAt(0);return je[Y]?Y+"——"+je[Y]:String(J)}),H=ne==="xiong"?`太乙站在${i.palaceName}宫（${i.dir}），值${se}门，判凶：主客两边有几样撞到了一起。`:ne==="daji"?`太乙站在${i.palaceName}宫（${i.dir}），值${se}门，判大吉：位置和数都顺，门也在吉道上。`:ne==="buhe"?`太乙站在${i.palaceName}宫（${i.dir}），值${se}门，判不和：位置不冲突，但数上不合。`:`太乙站在${i.palaceName}宫（${i.dir}），值${se}门，判吉：位置不冲突。`;return`<section class="mp-ty" aria-label="太乙神数">
      <div class="mp-ty-h">
        <span class="mp-ty-y">${t(String(e.meta.year))} 年</span>
        <span class="mp-ty-j">${t(e.meta.dunText||"")}${t(String(e.meta.ju))}局</span>
        <span class="mp-ty-m">太乙临 ${t(i.palaceName||"")} 宫</span>
        <span class="mp-ty-m">${t(se)}</span>
      </div>
      <div class="mp-ty-g">${b}</div>
      <div class="mp-ty-plain">
        <p class="mp-ty-lead">${t(H)}</p>
        <p>先看太乙落在哪一格——那是「主」这一年的位置，整张盘围着它转。</p>
        <p>${t(se)}门一值三十年，管的是这三十年的大环境，不是今年单一年的事。</p>
        <p>判${t(be)}，是因为${t(ye.length?ye.join("；"):"八种位置关系一个都没犯")}。</p>
        <p class="mp-ty-close">这一层只摆位置和数，不回答事情成不成；想看每一步怎么来的，展开下面的细目。</p>
      </div>
      <details class="mp-ty-det">
        <summary>细目（想核对推导再展开）</summary>
        <div class="mp-ty-sec"><em>太乙</em>第 ${t(String(i.palace||""))} 宫（${t(i.dir||"")}），三年里的第 ${t(String(i.yearInPalace||""))} 年，${t(i.li||"")}</div>
        <div class="mp-ty-sec"><em>八门</em>${t(se)}　八门三十年一转，1954 年从休门起</div>
        <div class="mp-ty-sec"><em>文昌</em>${t(p.pos||"")}（${t(p.god||"")}，${t(p.palaceName||"")}宫）　十八年一周</div>
        <div class="mp-ty-sec"><em>定目</em>${t(e.dingmu&&e.dingmu.pos||"")}（${t(e.dingmu&&e.dingmu.god||"")}）　<em>三基</em>君${t(e.sanji&&e.sanji.jun||"")} 臣${t(e.sanji&&e.sanji.chen||"")} 民${t(e.sanji&&e.sanji.min||"")}</div>
        <div class="mp-ty-sec"><em>五福</em>${t(e.wufu&&e.wufu.palaceName||"")}宫　<em>大游</em>${t(e.dayou&&e.dayou.palaceName||"")}宫　<em>十精</em>天乙${t(e.shijing&&e.shijing.tianyi||"")} 地乙${t(e.shijing&&e.shijing.diyi||"")} 直符${t(e.shijing&&e.shijing.zhifu||"")}</div>
        <div class="mp-ty-sec"><em>数和</em>主算 ${t(e.heshu&&e.heshu.zhu&&e.heshu.zhu.text||"")}　客算 ${t(e.heshu&&e.heshu.ke&&e.heshu.ke.text||"")}</div>
        <div class="mp-ty-sec"><em>月计</em>太乙在 ${t(A)} 宫（第 ${t(_)} 月）　天目 ${t(Q)}　计神 ${t(F)}</div>
        <div class="mp-ty-sec"><em>日计</em>太乙在 ${t(L)} 宫（第 ${t(O)} 日）　天目 ${t(le)}　计神 ${t(N)}</div>
        <div class="mp-ty-sec"><em>时计</em>太乙在 ${t(I)} 宫（第 ${t(f)} 时）　计神 ${t(ie)}</div>
        <div class="mp-ty-sec"><em>吉凶</em><b class="mp-ty-jx ${t(Te)}">${t(j)}</b> ${t(e.jixiong&&e.jixiong.text||"")}</div>
        <div class="mp-ty-sec"><em>神将</em>${t(E)}</div>
        <div class="mp-ty-sec"><em>计神</em>${t(o.branch||"")}（${t(o.god||"")}）　<em>始击</em>${t(l.pos||"")}（${t(l.god||"")}，${t(l.palaceName||"")}宫）</div>
        <div class="mp-ty-sec"><em>主算</em>${t(String(d.zhu||""))}　主大将${t(c.zhuDaName||"")}宫　主参将${t(c.zhuCanName||"")}宫</div>
        <div class="mp-ty-sec"><em>客算</em>${t(String(d.ke||""))}　客大将${t(c.keDaName||"")}宫　客参将${t(c.keCanName||"")}宫</div>
        <div class="mp-ty-sec"><em>格局</em>${g.list&&g.list.length?t(g.list.join("；")):"四将不相犯，没有掩、迫、囚、格、关"}</div>
        <div class="mp-ty-sec"><em>积年</em>${t(String(e.meta.jinian||""))}　残年 ${t(String(e.meta.rest360||""))}　${t(e.year?e.year.jiName:"")}${t(e.year?String(e.year.jiYear):"")}年　${t(e.year?e.year.yuanName:"")}第 ${t(e.year?String(e.year.yuanYear):"")} 年</div>
        <div class="mp-ty-note">算到太乙、八门、文昌、计神、始击、主客算与四将、五种格局；${t(x.join("、"))}未收录，盘上不显示。将落中五时只标数不加宫名。</div>
      </details>
    </section>`},s.wuyunliuqiHTML=function(e){if(!e||!e.zhongyun||!e.year)return"";const i=e.zhongyun,p=e.current||{},l=[];e.special&&e.special.taiYi&&l.push("太乙天符"),e.special&&e.special.tianFu&&!e.special.taiYi&&l.push("天符"),e.special&&e.special.suiHui&&!e.special.taiYi&&l.push("岁会"),e.special&&e.special.tongTianFu&&l.push("同天符"),e.special&&e.special.tongSuiHui&&l.push("同岁会");const o=(c,g)=>(c||[]).map(m=>{const b=g?m.qi:m.name,x=g?!!(p.keQi&&p.keQi.qi===m.qi):!!(p.keYun&&p.keYun.name===m.name),w=g?m.sitian?"司天":m.zaiquan?"在泉":"":m.taiShao||"";return`<div class="mp-wl-step${x?" on":""}"><span class="mp-wl-no">${m.no}</span><span>${t(b||"")}</span><span class="mp-wl-tg">${t(w)}</span><span class="mp-wl-tm">${t(m.startTime||"")}—${t(m.endTime||"")}</span></div>`}).join(""),d=l.map(c=>`<span class="mp-wl-tag on">${t(c)}</span>`).join("");return`<section class="mp-wl" aria-label="五运六气">
      <div class="mp-wl-h">
        <span class="mp-wl-y">${t(e.year.ganzhi)}</span>
        <span class="mp-wl-z">${t(i.name)}</span>
        <span class="mp-wl-m">${t(e.year.startTime||"")} — ${t(e.year.endTime||"")}</span>
      </div>
      ${d?`<div class="mp-wl-sec"><em>格局</em>${d}</div>`:""}
      <div class="mp-wl-sec"><em>司天在泉</em>${t(e.sitian.qi)}司天　${t(e.zaiquan.qi)}在泉</div>
      <div class="mp-wl-sec"><em>此刻</em>${t(p.text||"")}</div>
      <div class="mp-wl-sec"><em>客运五步</em></div>
      <div class="mp-wl-steps">${o(e.keYun,!1)}</div>
      <div class="mp-wl-sec"><em>客气六步</em></div>
      <div class="mp-wl-steps">${o(e.keQi,!0)}</div>
      <div class="mp-wl-note">${t(e.scope?e.scope.note:"")}</div>
    </section>`},s.constitutionHTML=function(e){if(!e)return"";if(e.paper&&Array.isArray(e.questions)){const o=e.questions.map(d=>`<li><span class="mp-cs-no">${d.no}</span><span class="mp-cs-t">${t(d.text)}</span><em>${t(d.name)}</em></li>`).join("");return`<section class="mp-cs-paper" aria-label="中医体质问卷">
        <div class="mp-cs-h"><span><b>中医体质问卷</b><i>${e.scaleCount} 种体质 × ${e.itemsPerScale} 题 · 1 没有 / 5 总是</i></span>
        <span class="mp-cs-count">填完分数再看结果</span></div>
        <ol>${o}</ol>
        <div class="mp-cs-note">${t(e.note||"")}</div>
      </section>`}const i=e.primary||{},p=(e.scales||[]).map(o=>{const d=Math.max(0,Math.min(100,o.converted||0)),c=o.level&&o.level!=="否";return`<div class="mp-cs-row${i.key===o.key?" main":""}">
        <span class="mp-cs-n">${t(o.name)}</span>
        <span class="mp-cs-track"><i class="${c?"on":""}" style="width:${d}%"></i><b class="mp-cs-tick" style="left:40%"></b></span>
        <span class="mp-cs-v">${d}</span>
        <span class="mp-cs-l">${t(o.level||"")}</span>
      </div>`}).join(""),l=(e.care||[]).map(o=>`<li>${t(o)}</li>`).join("");return`<section class="mp-cs" aria-label="中医体质结果">
      <div class="mp-cs-h">
        <span class="mp-cs-main">${t(i.name||"—")}</span>
        <span class="mp-cs-meta"><b>${t(i.oneLine||"")}</b><i>${e.secondary?`兼夹 ${t(e.secondary.name)}（${Math.round(e.secondary.converted)}）`:"无兼夹"}${e.flat?" · 区分度不足":""}</i></span>
        <span class="mp-cs-count">已答 ${e.meta?e.meta.answered:0}/${e.meta?e.meta.total:0} 题</span>
      </div>
      <div class="mp-cs-bars">${p}</div>
      <div class="mp-cs-sec"><em>这体质</em>${t(i.trait||"")}</div>
      <div class="mp-cs-sec"><em>倾向</em>${t(i.tendency||"")}</div>
      <div class="mp-cs-care"><b>调养方向</b><ul>${l}</ul></div>
      <div class="mp-cs-note">${t(e.note||"")}</div>
    </section>`},s.mbtiHTML=function(e){if(!e)return"";if(e.needAnswers&&Array.isArray(e.questions)){const o=e.questions.map(d=>`<li>${t(d.text)}</li>`).join("");return`<section class="mp-mb-paper" aria-label="十六型人格问卷">
        <div class="mp-mb-h">
          <span class="mp-mb-meta"><b>十六型人格问卷</b><i>${e.total} 题 · 每题 1 完全不像 / 5 很像我</i></span>
          <span class="mp-mb-count">填完分数再看结果</span>
        </div>
        <ol>${o}</ol>
        <div class="mp-mb-note">${t(e.note||"")}</div>
      </section>`}const i=(e.dims||[]).map(o=>{const d=Math.round((o.pct||0)*100),c=o.picked===o.left,g=Math.max(2,d),m=c?o.leftSay:o.rightSay;return`<div class="mp-mb-dim">
        <div class="mp-mb-dh"><b class="${c?"on":""}">${t(o.left)}</b><em>${t(o.name)}</em><b class="${c?"":"on"}">${t(o.right)}</b></div>
        <div class="mp-mb-bar ${c?"l":"r"}"><em style="width:${g}%"></em></div>
        <div class="mp-mb-df">取 ${t(o.picked)} · ${t(o.strength)} ${d}%</div>
        <div class="mp-mb-ds">${t(m)}</div>
      </div>`}).join(""),p=e.profile||{},l=(p.stack||[]).map((o,d)=>`<span class="${d===0?"lead":""}"><b>${t(o.code)}</b>${t(o.say)}</span>`).join("");return`<section class="mp-mb" aria-label="十六型人格结果">
      <div class="mp-mb-h">
        <span class="mp-mb-code">${t(e.type||"")}</span>
        <span class="mp-mb-meta"><b>${t(p.title||"")}</b><i>${t(p.keywords||"")}</i></span>
        <span class="mp-mb-count">已答 ${e.answered||0}/${e.total||0} 题</span>
      </div>
      <div class="mp-mb-body">
        <div class="mp-mb-dims">${i}</div>
        <div class="mp-mb-sec"><em>一句</em>${t(p.oneLine||"")}</div>
        <div class="mp-mb-two">
          <div><b>优势</b>${(p.strengths||[]).map(o=>t(o)).join("；")}</div>
          <div><b>留意</b>${(p.blindspots||[]).map(o=>t(o)).join("；")}</div>
        </div>
        ${l?`<div class="mp-mb-sec"><em>认知功能</em>主导 ${t((p.stack[0]||{}).code||"")} → 依次展开</div><div class="mp-mb-fn">${l}</div>`:""}
        <div class="mp-mb-sec"><em>工作</em>${t(p.work||"")}</div>
        <div class="mp-mb-sec"><em>关系</em>${t(p.love||"")}</div>
        <div class="mp-mb-sec"><em>学习</em>${t(p.study||"")}</div>
        <div class="mp-mb-sec"><em>课题</em>${t(p.growth||"")}</div>
      </div>
      <div class="mp-mb-note">${t(e.note||"")}</div>
    </section>`};const va=[["巽","离","坤"],["震","中","兑"],["艮","坎","乾"]],$t={坎:"正北",艮:"东北",震:"正东",巽:"东南",离:"正南",坤:"西南",兑:"正西",乾:"西北",中:"中宫"},Ba=["生气","延年","天医","伏位"],Pe=(e,i)=>`<span class="mp-fs-chip${i?" "+i:""}">${t(e)}</span>`,Ga=(e,i,p)=>`<div class="mp-fs-cell${e==="中"?" center":""}"><div class="mp-fs-top"><span class="mp-fs-gua">${t(e)}</span><span class="mp-fs-dir">${t($t[e]||"")}</span>${i||""}</div>`+(p||"")+"</div>",Ua=e=>e.length?`<dl class="mp-fs-facts">${e.map(([i,p])=>`<div class="mp-fs-row"><dt>${t(i)}</dt><dd>${t(p)}</dd></div>`).join("")}</dl>`:"",aa=(e,i,p,l,o,d)=>`<section class="mp-quick mp-fs" aria-label="风水结果"><div class="mp-quick-h"><b>${t(e)}</b>${i?`<span class="mp-fs-sub">${t(i)}</span>`:""}</div>`+(p.length?`<div class="mp-fs-chips">${p.join("")}</div>`:"")+l+o+d.filter(Boolean).map(c=>`<div class="mp-fs-note">${t(c)}</div>`).join("")+"</section>",kt=(e,i)=>`<div class="mp-fs-grid" role="group" aria-label="${t(i)}">`+va.map(p=>p.map(l=>{const o=e.find(g=>g&&g.palace===l);if(!o)return Ga(l,"","");const d=Ba.includes(o.star),c=`<span class="mp-fs-star"${o.role?` title="${t(o.role)}"`:""}>${t(o.star)}<em class="${d?"ok":"bad"}">${d?"吉":"凶"}</em></span>`;return Ga(l,c,"")}).join("")).join("")+"</div>";function Za(e,i){const p=i.period,l={};for(const $ of e.palaces||[])l[$.palace]=$;const o=`<div class="mp-fs-key">每宫依次为 <b>运</b>／<b>山</b>／<b>向</b> 三星；底色高亮＝当运（${t(p)}运）</div><div class="mp-fs-grid" role="group" aria-label="玄空九宫（运/山/向）">`+va.map($=>$.map(C=>{const A=l[C];if(!A)return Ga(C,"","");const _=[["运",A.yun],["山",A.shan],["向",A.xiang]].map(([Q,F])=>`<span class="${F===p?"on":""}" title="${t(Q)}星 ${t(F)}">${t(F)}</span>`).join("");return Ga(C,"",`<div class="mp-fs-nums">${_}</div>`)}).join("")).join("")+"</div>",d=e.wangShanWangXiang||{},c=i.jianXiang||{},g=e.timeFlying||null,m=[Pe(c.active?`兼${c.jian} ${c.offset}° · 替卦`:"正向 · 下卦",c.active?"ok":""),Pe(`山盘 ${i.shanCenter.star}${i.shanCenter.name} · ${i.shanCenter.fly}`),Pe(`向盘 ${i.xiangCenter.star}${i.xiangCenter.name} · ${i.xiangCenter.fly}`),Pe(d.byChart?"盘面：到山到向":"盘面：未到山到向",d.byChart?"ok":""),Pe(d.byTable===null?"表法：替卦不套":d.byTable?"表法：在列":"表法：未列",d.byTable?"ok":"")],b=($,C)=>`${C} ${$.star}${$.name}（${$.fly}，${$.basis}${$.mode==="替卦"?`；原运星 ${$.original}${$.replaced?"，已替":"，用替而未替"}`:""}）`,x=g?[["year","年"],["month","月"],["day","日"],["hour","时"]].filter(([$])=>g[$]).map(([$,C])=>`${C}${g[$].centerName}（${g[$].fly}）`).join("　"):"",w=Ua([...c.active?[["替卦",`${c.note}${d.byTable===null?" 正向旺山旺向表不适用于替卦。":""}`]]:[],["入中",`${b(i.shanCenter,"山盘")}；${b(i.xiangCenter,"向盘")}`],["当运",`山星${p}落 ${e.dangYun.shan.text}；向星${p}落 ${e.dangYun.xiang.text}`],["合十",`山星：${(e.heshi.shan||[]).join("、")||"无"}；向星：${(e.heshi.xiang||[]).join("、")||"无"}`],["表法",`${d.note||""}${(d.table||[]).length?` 本运所列：${d.table.join("、")}。`:" 本运表法无局。"}`],...x?[["年月日时",`${x}${g.meta&&g.meta.note?`　${g.meta.note}`:""}`]]:[]]);return aa(c.active?"玄空替卦":"玄空下卦",`${i.periodLabel} · 坐${i.sitting} · 向${i.facing}`,m,o,w,[i.note,e.disclaimer])}function zt(e,i){const p=e.mingGua||{},l=kt([...e.luckyDirections||[],...e.unluckyDirections||[]],"八宅八向（吉凶）"),o=[Pe(p.compatible||"—"),Pe(`${i.gender}命 · ${i.guaYear} 年立春界`)],d=[];if(e.yearlyFlying){const c=e.yearlyFlying;d.push(["年紫白",`${c.centerName}入中；${c.palaces.filter(g=>g.palace!=="中").map(g=>`${g.palace}${g.name}`).join("、")}`])}return aa("八宅命卦",`${p.num}${p.gua}（${p.group}）· ${p.direction}`,o,l,Ua(d),[i.note,e.disclaimer])}function Ut(e,i){const p=e.layout||{},l=kt(e.houseStars||[],"宅卦八向（吉凶）"),o=[Pe(`${i.houseGua}宅 · ${i.houseGroup}`),Pe(`坐${i.sitting}`),Pe(`向${i.facing}`)],d=[["门",p.door],["灶",p.stove],["床",p.bed],["厕",p.toilet]];return e.mingMatch&&d.push(["命宅配",e.mingMatch.text]),aa("门主灶",`${i.houseGua}宅 · 坐${i.sitting} · 向${i.facing}`,o,l,Ua(d),[i.birthNote,e.disclaimer])}s.fengshuiHTML=function(e){if(!e||e.system!=="fengshui")return s.quickHTML(e);const i=e.meta||{};return i.action==="xuankong"?Za(e,i):i.action==="advise"?Ut(e,i):zt(e,i)},s.perfHTML=function(e){if(!e)return"";const i=g=>typeof g=="number"&&isFinite(g)?`${Math.max(0,Math.round(g))}ms`:"",p=e.cached===!0?"（已缓存）":e.cached===!1?"（首次加载）":"",l=[];i(e.engineMs)&&l.push(`引擎 ${i(e.engineMs)}${p}`),i(e.computeMs)&&l.push(`排盘 ${i(e.computeMs)}`),i(e.renderMs)&&l.push(`渲染 ${i(e.renderMs)}`);const o=i(e.totalMs);if(!l.length&&!o)return"";const d=o?`首屏 ${o}`:"耗时";return`<div class="mp-perf" title="本机这一次的实测耗时，不含网络与服务端；换机器、首次加载与已缓存会不同">${l.length?`${d}｜${l.join(" · ")}`:d}</div>`},s.zeriHTML=function(e){if(!e||!e.compare||e.compare.mode!=="candidates"||!Array.isArray(e.days))return s.quickHTML(e);const i=e.meta||{},p=e.shenshaRef||{},l=e.compare.best?e.compare.best.date:"",o=e.days.map(g=>{const m=g.date===l,b=g.excluded||g.verdict==="回避"?"bad":g.verdict==="推荐"?"good":"",x=g.grade||{},w=x.label?`<b>${t(x.label)}</b><em>吉${t(x.ji)} / 凶${t(x.xiong)}　${t(x.decision||"")}</em>`:"—";return`<tr class="mp-zr-row${m?" top":""}${g.excluded?" off":""}">
        <th scope="row"><b>${t(g.date)}</b>${m?'<i class="mp-zr-best">最优</i>':""}
          <em>${t(g.weekday)}　${t(g.lunar)}</em></th>
        <td><b>${t(g.dayGanZhi)}</b><em>${t(g.zhiXing)}日</em></td>
        <td class="mp-zr-score">${t(g.score)}</td>
        <td class="mp-zr-grade">${w}</td>
        <td><span class="mp-zr-v ${b}">${t(g.verdict)}</span></td>
        <td class="mp-zr-why">${t(g.reasons.join("；")||"无特别加减分")}</td>
      </tr>`}).join(""),d=(g,m)=>`<span><em>${t(g)}</em>${m.length?t(m.join("、")):"无"}</span>`,c=e.compare.best?`这一组最优：<b>${t(e.compare.best.date)}</b>（${t(e.compare.best.score)} 分 · ${t(e.compare.best.verdict)}）`+(e.compare.best.ties.length>1?`；同分 ${t(e.compare.best.ties.filter(g=>g!==e.compare.best.date).join("、"))}`:""):"这一组都因冲属相被排除，没有可用的日子";return`<section class="mp-zr" aria-label="择日候选比较">
      <div class="mp-zr-h"><b>择日 · ${t(i.task||"")}</b>
        <span>候选 ${t(i.days)} 天${i.shengXiao?`　当事人属${t(i.shengXiao)}`:"（未给属相，未做冲煞排除）"}</span></div>
      <div class="mp-zr-lead">${c}</div>
      <table class="mp-zr-t"><thead><tr>
        <th scope="col">日期</th><th scope="col">日干支 / 建除</th><th scope="col">分</th><th scope="col">卷十等第</th><th scope="col">结论</th><th scope="col">理由</th>
      </tr></thead><tbody>${o}</tbody></table>
      <div class="mp-zr-lists">
        ${d("推荐",e.best)}${d("可用",e.usable)}${d("回避",e.avoid)}
      </div>
      <p class="mp-zr-note">${t(e.compare.note||"")}</p>
      ${p.text?`<p class="mp-zr-note">神煞依据：${t(p.text)}（${t(p.edition||"")}）；起法 ${t((p.volumes||[]).join("、"))}。未实现起法：${t((p.unsupported||[]).join("、"))}（不计分）。</p>`:""}
      ${p.juan10?`<p class="mp-zr-note">卷十依据：${t(p.juan10.text)}（${t(p.juan10.corpusLines||"")}）；${t(p.juan10.thresholdsNote||"")}${t(p.juan10.note||"")}</p>`:""}
      <p class="mp-zr-note">${t(i.scope||"")}</p>
      <p class="mp-zr-note">${t(e.disclaimer||"")}</p>
    </section>`},s.quickHTML=function(e){if(!e)return"";const p={almanac:"黄历",zeri:"择日",chenggu:"称骨",xiaoliuren:"小六壬",star:"星座",numerology:"生命数字",trend:"人生 K 线",fengshui:"风水",name:"起名",convert:"公农历转换",mbti:"十六型人格"}[e.system]||"速查",l=e.summary||"",o=l?`<pre class="mp-quick-pre">${t(l)}</pre>`:"";return`<section class="mp-quick" aria-label="${t(p)}结果">
      <div class="mp-quick-h"><b>${t(p)}</b></div>
      ${o}
    </section>`},s.summaryCardPNG=function(e,i){try{if(typeof document>"u"||!document.createElement)return"";const p=i&&i.outline||[],l=(i&&i.tables||[]).filter(le=>Array.isArray(le.rows)&&le.rows.length),o=i&&i.systemLabel||e&&e.system||"命理报告",d=900,c=44,g=26,m=(le,N)=>`${N?"600 ":""}${le}px "PingFang SC","Microsoft YaHei","Noto Sans CJK SC",sans-serif`,b=document.createElement("canvas"),x=b.getContext?b.getContext("2d"):null;if(!x)return"";const w=(le,N)=>{const I=[];let f="";for(const ie of String(le)){const V=f+ie;x.measureText(V).width>N&&f?(I.push(f),f=ie):f=V}return f&&I.push(f),I.length?I:[""]};x.font=m(15);let $=0;const C=p.map(le=>{const N=w(le.text,d-c*2-70);return $+=Math.min(N.length,2)*g+10,{o:le,lines:N.slice(0,2)}}),A=l[0]||null,_=A?A.rows.slice(0,6):[],Q=A?54+_.length*34:0,F=150+$+(C.length?34:0)+Q+120;b.width=d,b.height=F,x.fillStyle="rgb(255,255,255)",x.fillRect(0,0,d,F),x.fillStyle="rgb(31,111,63)",x.fillRect(0,0,d,8);let L=52;x.fillStyle="rgb(27,27,27)",x.font=m(28,!0),x.fillText(`${o} · 摘要`,c,L),L+=30,x.fillStyle="rgb(111,106,96)",x.font=m(14);const O=[e&&e.input&&e.input.datetime?`出生/起局：${e.input.datetime}`:"","本地计算 · 可复现"].filter(Boolean).join("　");if(x.fillText(O,c,L),L+=34,C.length){x.fillStyle="rgb(31,111,63)",x.font=m(16,!0),x.fillText("一页读懂",c,L),L+=26;for(const{o:le,lines:N}of C)x.fillStyle="rgb(138,131,120)",x.font=m(14,!0),x.fillText(le.label,c,L),x.fillStyle="rgb(63,58,51)",x.font=m(15),N.forEach((I,f)=>x.fillText(I,c+70,L+f*g)),L+=N.length*g+10;L+=8}if(A){x.fillStyle="rgb(31,111,63)",x.font=m(16,!0),x.fillText(A.title,c,L),L+=24,x.fillStyle="rgb(138,131,120)",x.font=m(13),x.fillText(A.columns.join(" · "),c,L),L+=8,x.strokeStyle="rgb(229,225,216)",x.beginPath(),x.moveTo(c,L),x.lineTo(d-c,L),x.stroke(),L+=22,x.fillStyle="rgb(63,58,51)",x.font=m(14);for(const le of _){const N=le.filter(Boolean).join(" · "),I=w(N,d-c*2)[0];x.fillText(I,c,L),L+=34}}return L=F-62,x.strokeStyle="rgb(229,225,216)",x.beginPath(),x.moveTo(c,L-18),x.lineTo(d-c,L-18),x.stroke(),x.fillStyle="rgb(138,131,120)",x.font=m(12),x.fillText("内容用于传统文化学习与自我探索，不构成医疗、投资、法律或人事决策依据。",c,L+6),x.fillText("dsh-metaphysics · 本机计算，未上传任何数据",c,L+26),b.toDataURL?b.toDataURL("image/png"):""}catch{return""}}})();const ri="dsh-metaphysics/history-v1";function ln(){try{const n=window.localStorage&&window.localStorage.getItem(ri),s=n?JSON.parse(n):[];return Array.isArray(s)?s.filter(z=>z&&typeof z=="object"&&typeof z.kind=="string").slice(0,20):[]}catch{return[]}}function li(n){try{window.localStorage&&window.localStorage.setItem(ri,JSON.stringify(n.slice(0,20)))}catch{}}const dn=(n,s)=>n.kind===s.kind&&n.date===s.date&&n.time===s.time&&n.gender===s.gender&&!!n.hourUnknown==!!s.hourUnknown&&n.trueSolar!==!1==(s.trueSolar!==!1)&&n.lateZi!==!1==(s.lateZi!==!1)&&n.address===s.address&&n.lines===s.lines&&n.question===s.question&&n.mhMode===s.mhMode&&n.upper===s.upper&&n.lower===s.lower&&n.direction===s.direction&&n.spread===s.spread&&n.changing===s.changing&&(n.kind!=="qimen"||n.qimenRule===s.qimenRule&&n.qLateZi===s.qLateZi)&&(n.kind!=="zeri"||n.task===s.task&&n.days===s.days&&n.shengXiao===s.shengXiao&&n.zCand===s.zCand)&&(n.kind!=="xiaoliuren"||n.xlrMode===s.xlrMode&&n.num1===s.num1&&n.num2===s.num2&&n.num3===s.num3)&&(n.kind!=="trend"||n.toAge===s.toAge)&&(n.kind!=="fengshui"||n.fsMode===s.fsMode&&n.fsPeriod===s.fsPeriod&&n.sitting===s.sitting&&n.facing===s.facing)&&(n.kind!=="name"||n.nnMode===s.nnMode&&n.surname===s.surname&&n.givenName===s.givenName&&n.limitN===s.limitN)&&(n.kind!=="convert"||n.convMode===s.convMode&&n.lunarDate===s.lunarDate&&!!n.leapMonth==!!s.leapMonth)&&(n.kind!=="hepan"||n.hpChart===s.hpChart&&n.partnerDate===s.partnerDate&&n.partnerTime===s.partnerTime&&n.partnerGender===s.partnerGender&&n.partnerAddress===s.partnerAddress&&!!n.thirdOn==!!s.thirdOn&&n.p2Date===s.p2Date&&n.p2Time===s.p2Time&&n.p2Gender===s.p2Gender&&n.p2Address===s.p2Address);function cn(n,s){if(n==="bazi"){const P=["year","month","day","hour"].map(W=>s.pillars&&s.pillars[W]).filter(Boolean).map(W=>W.ganzhi).join(" ");return s.hourUnknown||s.pillars&&!s.pillars.hour?`${P}（时柱暂缺）`:P}return n==="ziwei"?`${s.soul?s.soul.branch:""}宫 ${s.bureau?s.bureau.name:""} ${s.lunar?s.lunar.year+"年":""}`.trim():n==="liuyao"?s.ben&&s.ben.name?s.ben.name:"":n==="meihua"?s.ben&&s.ben.name?`${s.ben.name} 动${s.moving}`:"":n==="daliuren"?`${s.dayGanZhi||""} ${s.geJu?s.geJu.name:""}`:""}const D=window.__PP,Xa=()=>typeof performance<"u"&&performance.now?performance.now():Date.now();let Oe=0;const ct=typeof window.__mpEnsureEngine=="function"?window.__mpEnsureEngine:async()=>window.Engine,mn=`
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
.mp-ttools{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;grid-auto-rows:1fr}
.mp-tool{display:flex;flex-direction:column;gap:1px;padding:7px 9px;text-align:left;border:1px solid var(--dsw-alias-border-l1);border-radius:9px;
  background:color-mix(in srgb,var(--dsw-alias-bg-layer-1) 72%,transparent);color:var(--dsw-alias-label-primary);font-family:inherit;cursor:pointer;
  transition:border-color .14s,background .14s,box-shadow .14s}
.mp-tool b{font-size:13px;font-weight:600;letter-spacing:.02em}
.mp-tool span{font-size:11px;line-height:1.4;color:var(--dsw-alias-label-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mp-tool:hover{border-color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-layer-1)}
.mp-tool.on{border-color:transparent;background:var(--dsw-alias-brand-primary);box-shadow:0 8px 18px -12px var(--dsw-alias-brand-primary)}
.mp-tool.on b,.mp-tool.on span{color:var(--mp-on-brand,#fff)}
.mp-tmore{display:flex;grid-column:1/-1;align-items:center;justify-content:center;gap:6px;padding:7px;border:1px dashed var(--dsw-alias-border-l1);border-radius:9px;
  background:transparent;color:var(--dsw-alias-label-secondary);font-family:inherit;font-size:12px;cursor:pointer}
.mp-tmore:hover{color:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary)}
/* 侧栏宽度不等于窗口宽度：用容器查询决定每组先露 4 项、其余折在「还有 N 个」后面 */
/* 首屏每组只露 4 项，其余折在「还有 N 个」后面（宽窄屏同一口径） */
.mp-tgroup:not(.open) .mp-ttools>.mp-tool:nth-child(n+5){display:none}
@container (max-width:560px){
  /* 窄侧栏：视图开关另起一行右对齐，避免和「最近用过」挤在同一行被裁掉 */
  .mp-start-top{flex-direction:column;align-items:stretch;gap:8px}
  .mp-viewsw{margin-left:0;align-self:flex-end}
  .mp-tool.wide{grid-column:1/-1}
}
.mp-tabs{display:grid;grid-template-columns:repeat(auto-fit,minmax(74px,1fr));gap:6px;margin-bottom:14px;width:100%;max-width:940px}
.mp-tabs.hide{display:none}
.mp-tab{padding:7px 10px;border-radius:999px;border:1px solid transparent;background:color-mix(in srgb,var(--dsw-alias-bg-layer-2) 62%,transparent);color:var(--dsw-alias-label-secondary);cursor:pointer;font-size:13px;white-space:nowrap;
  transition:background .16s,color .16s,border-color .16s,box-shadow .16s}
.mp-tab:hover{background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-border-l1);color:var(--dsw-alias-label-primary)}
.mp-tab.on{background:var(--dsw-alias-brand-primary);border-color:transparent;color:var(--mp-on-brand,#fff);font-weight:600;box-shadow:0 8px 18px -12px var(--dsw-alias-brand-primary)}
/* ── 起卦快捷行：折叠一条，展开就是六个占卜体系的一键起卦 ──
   放在输入区最上面：占卜这类是「当下就问」的用法，先选体系再填时刻的路径太长。 */
.mp-castrow{margin:0 0 10px;border:1px solid var(--dsw-alias-border-l1);border-radius:12px;background:color-mix(in srgb,var(--dsw-alias-bg-layer-2) 48%,transparent);overflow:hidden}
.mp-castrow-h{display:flex;align-items:center;gap:8px;width:100%;min-height:34px;padding:6px 10px;border:0;background:none;color:var(--dsw-alias-label-secondary);font-family:inherit;font-size:12.5px;text-align:left;cursor:pointer}
.mp-castrow-h:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
.mp-castrow-t{font-weight:600;color:var(--dsw-alias-label-primary);white-space:nowrap}
.mp-castrow-l{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;opacity:.78}
.mp-castrow-i{font-style:normal;opacity:.6}
.mp-castlist{display:flex;flex-wrap:wrap;gap:6px;padding:0 10px 9px}
.mp-castchip{min-height:30px;padding:5px 11px;border-radius:999px;border:1px solid var(--dsw-alias-border-l1);background:color-mix(in srgb,var(--dsw-alias-bg-layer-2) 62%,transparent);color:var(--dsw-alias-label-primary);font-family:inherit;font-size:12.5px;cursor:pointer;
  transition:background .16s,color .16s,border-color .16s}
.mp-castchip:hover{background:var(--dsw-alias-bg-layer-2);border-color:color-mix(in srgb,var(--dsw-alias-border-l1) 45%,var(--dsw-alias-brand-primary))}
.mp-castchip.on{border-color:transparent;background:var(--dsw-alias-brand-primary);color:var(--mp-on-brand,#fff);font-weight:600}
.mp-wl-h{display:flex;flex-wrap:wrap;gap:8px;padding-bottom:7px}
.mp-wl-y{font-size:15px;font-weight:700}
.mp-wl-z{font-weight:600;color:var(--dsw-alias-brand-primary,#3b6fe0)}
.mp-wl-m,.mp-wl-tm,.mp-wl-tg,.mp-wl-no{font-size:11px;color:var(--dsw-alias-label-tertiary,#8a8f9a)}
.mp-wl-tag{display:inline-block;margin:0 6px 4px 0;padding:1px 8px;border-radius:999px;background:var(--dsw-alias-fill-tertiary,#eceef2)}
.mp-wl-tag.on{background:var(--dsw-alias-brand-primary,#3b6fe0);color:#fff}
.mp-wl-sec,.mp-wl-note{font-size:13px;line-height:1.6;padding-bottom:5px}
.mp-wl-sec em{font-style:normal;margin-right:6px}
.mp-wl-steps{display:flex;flex-direction:column;gap:3px}
.mp-wl-step{display:grid;grid-template-columns:16px 1fr 34px auto;gap:7px;font-size:12px;padding:3px 7px;border-radius:7px}
.mp-wl-step.on{background:var(--dsw-alias-fill-tertiary,#eceef2);font-weight:600}
.mp-ty-h{display:flex;flex-wrap:wrap;gap:8px;align-items:baseline;padding-bottom:7px}
.mp-ty-y{font-size:15px;font-weight:700}
.mp-ty-j{font-weight:600;color:var(--dsw-alias-brand-primary,#3b6fe0)}
.mp-ty-m{font-size:11px;color:var(--dsw-alias-label-tertiary,#8a8f9a)}
.mp-ty-g{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin:2px 0 8px}
.mp-ty-cell{position:relative;border-radius:8px;background:var(--dsw-alias-fill-tertiary,#eceef2);padding:7px 6px;text-align:center;font-size:12px;min-height:50px}
.mp-ty-cell b{display:block;font-size:13px}
.mp-ty-cell em{font-style:normal;font-size:11px;color:var(--dsw-alias-label-tertiary,#8a8f9a)}
.mp-ty-cell.on{background:var(--dsw-alias-brand-primary,#3b6fe0);color:#fff}
.mp-ty-cell.on em{color:rgba(255,255,255,.82)}
.mp-ty-cell.mid{opacity:.5}
.mp-ty-mark{position:absolute;top:3px;right:4px;font-style:normal;font-size:10px;padding:0 4px;border-radius:999px;background:#fff;color:var(--dsw-alias-brand-primary,#3b6fe0)}
.mp-ty-jx{font-weight:600}
.mp-ty-jx.xiong{color:#b3261e}
.mp-ty-jx.buhe{color:#a86a00}
.mp-ty-jx.daji{color:var(--dsw-alias-brand-primary,#3b6fe0);font-weight:700}
.mp-ty-jx.ji{color:var(--dsw-alias-brand-primary,#3b6fe0)}
.mp-ty-mark.s{top:19px;background:var(--dsw-alias-fill-tertiary,#eceef2);color:var(--dsw-alias-label-secondary,#5a6070)}
.mp-ty-plain{padding:9px 2px 10px;border-top:1px solid var(--dsw-alias-line-secondary,#ececf0);margin-top:8px}
.mp-ty-plain p{margin:0 0 6px;font-size:13px;line-height:1.65;color:var(--dsw-alias-label-secondary,#5a6070)}
.mp-ty-plain .mp-ty-lead{font-size:14px;font-weight:600;color:var(--dsw-alias-label-primary,#1f2328)}
.mp-ty-plain .mp-ty-close{font-size:12px;color:var(--dsw-alias-label-tertiary,#8a8f9a);margin-bottom:0}
.mp-ty-det{margin-top:4px}
.mp-ty-det summary{cursor:pointer;font-size:12px;color:var(--dsw-alias-label-tertiary,#8a8f9a);padding:4px 0}
.mp-ty-mark.w{right:auto;left:4px;color:var(--dsw-alias-label-secondary,#5a6070)}
.mp-ty-sec{font-size:13px;line-height:1.6;padding-bottom:4px}
.mp-ty-sec em{font-style:normal;margin-right:6px;color:var(--dsw-alias-label-tertiary,#8a8f9a)}
.mp-ty-note{font-size:11px;line-height:1.6;color:var(--dsw-alias-label-tertiary,#8a8f9a)}
.mp-castask{padding:0 10px 9px}
.mp-castgo{box-sizing:border-box;width:100%;min-height:30px;padding:5px 11px;border-radius:8px;border:1px dashed var(--dsw-alias-border-l1);background:none;color:var(--dsw-alias-label-secondary);font-family:inherit;font-size:12px;cursor:pointer}
.mp-castgo:hover{color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-brand-primary)}
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
/* 中医体质（P4）：九条转化分横条 + 40 分判定线；文字全部来自引擎，字体只负责排版 */
.mp-cs{border-radius:12px;overflow:hidden;background:var(--dsw-alias-bg-base,#fff);border:1px solid var(--dsw-alias-line-secondary,#ececf0)}
.mp-cs-h{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:10px 12px;border-bottom:1px solid var(--dsw-alias-line-secondary,#ececf0)}
.mp-cs-main{font-size:20px;font-weight:800;letter-spacing:.04em}
.mp-cs-meta{display:flex;flex-direction:column;gap:1px;flex:1 1 160px;min-width:0}
.mp-cs-meta b{font-size:13px;font-weight:600;line-height:1.5}
.mp-cs-meta i{font-size:12px;font-style:normal;color:var(--dsw-alias-label-secondary,#8b8f98)}
.mp-cs-count{font-size:12px;color:var(--dsw-alias-label-secondary,#8b8f98);white-space:nowrap}
.mp-cs-bars{display:flex;flex-direction:column;gap:5px;padding:10px 12px 8px}
.mp-cs-row{display:grid;grid-template-columns:52px 1fr 30px 52px;align-items:center;gap:8px;font-size:12px;line-height:1.4}
.mp-cs-row.main{font-weight:700}
.mp-cs-n{white-space:nowrap}
.mp-cs-track{position:relative;height:8px;border-radius:999px;background:var(--dsw-alias-fill-tertiary,#eceef2)}
.mp-cs-track i{display:block;height:100%;border-radius:999px;background:var(--dsw-alias-fill-quaternary,#c9cdd6)}
.mp-cs-track i.on{background:var(--dsw-alias-brand-primary,#3b6fe0)}
.mp-cs-tick{position:absolute;top:0;bottom:0;width:1px;background:var(--dsw-alias-label-tertiary,#b9bec9)}
.mp-cs-v{text-align:right;color:var(--dsw-alias-label-primary,#222)}
.mp-cs-l{color:var(--dsw-alias-label-secondary,#8b8f98);font-size:11px}
.mp-cs-sec{padding:2px 12px 6px;font-size:13px;line-height:1.7}
.mp-cs-sec em{display:inline-block;margin-right:6px;padding:0 6px;border-radius:4px;font-style:normal;font-size:11px;background:var(--dsw-alias-fill-tertiary,#f0f1f4);color:var(--dsw-alias-label-secondary,#666)}
.mp-cs-care{padding:4px 12px 8px;font-size:13px;line-height:1.7}
.mp-cs-care b{display:block;margin-bottom:2px}
.mp-cs-care ul{margin:0;padding-left:18px}
.mp-cs-note{padding:6px 12px 10px;font-size:12px;line-height:1.6;color:var(--dsw-alias-label-secondary,#8b8f98)}
.mp-cs-paper{padding:8px 12px;font-size:13px;line-height:1.7}
.mp-cs-paper ol{margin:6px 0;padding-left:20px}
.mp-cs-paper li{margin:2px 0}
.mp-cs-no{display:inline-block;min-width:22px;color:var(--dsw-alias-label-secondary,#9aa0a6);font-variant-numeric:tabular-nums}
.mp-cs-paper li em{margin-left:6px;font-style:normal;font-size:11px;color:var(--dsw-alias-label-secondary,#9aa0a6)}
.mp-cs-paper .mp-cs-h{display:flex;align-items:center;gap:10px;padding:0 0 6px}
.mp-cs-paper .mp-cs-h i{font-size:12px;font-style:normal;color:var(--dsw-alias-label-secondary,#8b8f98)}
.mp-cs-paper .mp-cs-count{font-size:12px;color:var(--dsw-alias-label-secondary,#8b8f98)}
.mp-cs-paper .mp-cs-note{font-size:12px;color:var(--dsw-alias-label-secondary,#8b8f98)}
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
.mp-hist-acts{display:flex;align-items:center;gap:10px}
.mp-hist-more{color:var(--dsw-alias-brand-primary)}
.mp-cases-layer{position:fixed;inset:0;z-index:60;display:flex;justify-content:flex-end;background:rgba(0,0,0,.28)}
.mp-cases-box{display:flex;flex-direction:column;width:min(540px,100vw);height:100%;background:var(--dsw-alias-bg-layer-1);border-left:1px solid var(--dsw-alias-border-l1)}
.mp-cases-h,.mp-cases-f{display:flex;align-items:center;gap:10px;padding:10px 16px;border:0 solid var(--dsw-alias-border-l1)}
.mp-cases-h{justify-content:space-between;border-bottom-width:1px;font-size:13.5px;color:var(--dsw-alias-label-primary)}
.mp-cases-f{border-top-width:1px}
.mp-cases-x{background:none;border:0;color:var(--dsw-alias-label-secondary);font-size:15px;cursor:pointer;line-height:1}
.mp-cases-tabs{display:flex;gap:6px;flex-wrap:wrap;padding:10px 16px 2px}
.mp-cases-list{flex:1;overflow:auto;padding:8px 12px 12px}
.mp-case{display:flex;align-items:center;gap:8px;padding:7px 10px;border:1px solid var(--dsw-alias-border-l1);border-radius:10px;margin-bottom:8px}
.mp-case-main{flex:1;min-width:0;display:flex;align-items:baseline;gap:7px;background:none;border:0;color:var(--dsw-alias-label-primary);font-size:12.5px;text-align:left;cursor:pointer;padding:0}
.mp-case-main b{font-weight:600;flex:none}
.mp-case-main span{color:var(--dsw-alias-label-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mp-case-main i{font-style:normal;color:var(--dsw-alias-label-secondary);opacity:.65;font-size:11px;flex:none;margin-left:auto}
.mp-case-sel{flex:none;background:none;border:1px solid var(--dsw-alias-border-l1);border-radius:6px;color:var(--dsw-alias-label-secondary);font-size:11px;padding:1px 2px;cursor:pointer}
.mp-case-del{flex:none;background:none;border:0;color:var(--dsw-alias-label-secondary);font-size:11px;cursor:pointer;opacity:.7}
.mp-case-del:hover{color:var(--dsw-alias-state-error-primary);opacity:1}
.mp-cases-tip{font-size:11px;color:var(--dsw-alias-label-secondary);line-height:1.5}
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
`,{useState:S,useEffect:za,useRef:un}=Ja,di=n=>String(n).padStart(2,"0");function gn(n){const s=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(n||""));if(!s)return!1;const z=Number(s[1]),P=Number(s[2]),W=Number(s[3]);if(P<1||P>12||W<1)return!1;const me=[31,z%4===0&&z%100!==0||z%400===0?29:28,31,30,31,30,31,31,30,31,30,31];return W<=me[P-1]}function ci(n){const s=/^(\d{4})\s*[年./-]\s*(\d{1,2})\s*[月./-]\s*(\d{1,2})\s*日?$/.exec(String(n||"").trim());if(!s)return"";const z=`${s[1]}-${di(s[2])}-${di(s[3])}`;return gn(z)?z:""}function fn(n){const s=String(n||"").trim();if(/^\d{0,4}(-\d{0,2}){0,2}$/.test(s))return s;if(/[年月日/.]/.test(s)){const P=ci(s);if(P)return P}const z=s.replace(/\D/g,"").slice(0,8);return z.length<=4?z:z.length<=6?`${z.slice(0,4)}-${z.slice(4)}`:`${z.slice(0,4)}-${z.slice(4,6)}-${z.slice(6)}`}function Ot(n){const s=n.value||"",[z,P]=S(s),W=un(s);za(()=>{W.current=s,P(s)},[s]);const pe=()=>{const me=z.trim();if(!me){P(W.current),n.onInvalid&&n.onInvalid("");return}const re=ci(me);if(re){W.current=re,P(re),re!==s&&n.onChange(re);return}P(W.current),n.onInvalid&&n.onInvalid(me)};return r("input",{className:"mp-input",type:"text",inputMode:"numeric",autoComplete:"off",placeholder:"年-月-日，如 1990-05-12",value:z,onChange:me=>{P(fn(me.target.value))},onBlur:pe,onKeyDown:me=>{me.key==="Enter"&&(me.preventDefault(),pe())}})}const mt=4,ia=12,ut=5,na=27,Ht=45;let gt=null;function ft(){if(gt)return gt;let n=null;try{n=K.compute({system:"mbti"})}catch{n=null}const s=n&&n.questions||[];return s.length?(gt={total:n&&n.total||s.length,questions:s,scale:n&&n.scale||{}},gt):{total:0,questions:[],scale:{}}}function bn(n){const{answers:s,page:z,onPick:P,onPage:W,onSubmit:pe,onClear:me}=n,re=ft(),xe=Math.max(1,Math.ceil(re.total/mt)),t=z*mt,ke=re.questions.slice(t,t+mt),R=s.filter(Z=>Z!=null).length,he=re.total?Math.round(R/re.total*100):0,ve=z>=xe-1,G=R>=ia;return r("div",{className:"mp-quiz"},r("div",{className:"mp-quiz-top"},r("div",{className:"mp-quiz-bar","aria-hidden":"true"},r("i",{style:{width:he+"%"}})),r("span",{className:"mp-quiz-count"},`第 ${z+1} / ${xe} 页 · 已答 ${R} / ${re.total}`)),r("div",{className:"mp-quiz-list"},ke.map((Z,X)=>{const B=t+X;return r("div",{key:Z.id||B,className:"mp-quiz-q"},r("div",{className:"mp-quiz-qt"},r("b",null,String(B+1).padStart(2,"0")),r("span",null,Z.text)),r("div",{className:"mp-quiz-opts",role:"radiogroup","aria-label":`第 ${B+1} 题`},[1,2,3,4,5].map(te=>r("label",{key:te,className:"mp-quiz-o"+(s[B]===te?" on":"")},r("input",{type:"radio",name:`mpmbq${B}`,value:String(te),checked:s[B]===te,onChange:()=>P(B,te)}),r("b",null,String(te)),r("span",null,re.scale[te]||"")))))})),r("div",{className:"mp-quiz-nav"},r("button",{className:"mp-quiz-btn",disabled:z<=0,onClick:()=>W(-1)},"上一页"),ve?null:r("button",{className:"mp-quiz-btn",onClick:()=>W(1)},"下一页"),r("button",{className:"mp-quiz-btn primary",disabled:!G,onClick:pe},"看结果"),r("button",{className:"mp-quiz-btn",onClick:me},"清空"),r("span",{className:"mp-quiz-hint"},G?`已够 ${ia} 题，可以看结果；答完 ${re.total} 题会更准。`:`答满 ${ia} 题可先看结果（还差 ${ia-R} 题）。`)))}function hn(n){const{paper:s,answers:z,page:P,onPick:W,onPage:pe,onSubmit:me,onClear:re}=n;if(!s||!Array.isArray(s.questions))return r("div",{className:"mp-quiz"},r("div",{className:"mp-quiz-hint"},"正在加载问卷题面…"));const xe=s.questions.length,t=Math.max(1,Math.ceil(xe/ut)),ke=P*ut,R=s.questions.slice(ke,ke+ut),he=z.filter(B=>B!=null).length,ve=xe?Math.round(he/xe*100):0,G=P>=t-1,Z=he>=na,X=B=>{const te=(s.scale||[]).filter(qe=>qe&&qe.v===B)[0];return te?te.label:String(B)};return r("div",{className:"mp-quiz"},r("div",{className:"mp-quiz-top"},r("div",{className:"mp-quiz-bar","aria-hidden":"true"},r("i",{style:{width:ve+"%"}})),r("span",{className:"mp-quiz-count"},`第 ${P+1} / ${t} 页 · 已答 ${he} / ${xe}`)),r("div",{className:"mp-quiz-list"},R.map((B,te)=>{const qe=ke+te;return r("div",{key:B.no||qe,className:"mp-quiz-q"},r("div",{className:"mp-quiz-qt"},r("b",null,String(qe+1).padStart(2,"0")),r("span",null,B.text)),r("div",{className:"mp-quiz-opts",role:"radiogroup","aria-label":`第 ${qe+1} 题`},[1,2,3,4,5].map(Le=>r("label",{key:Le,className:"mp-quiz-o"+(z[qe]===Le?" on":"")},r("input",{type:"radio",name:`mpcsq${qe}`,value:String(Le),checked:z[qe]===Le,onChange:()=>W(qe,Le)}),r("b",null,String(Le)),r("span",null,X(Le))))))})),r("div",{className:"mp-quiz-nav"},r("button",{className:"mp-quiz-btn",disabled:P<=0,onClick:()=>pe(-1)},"上一页"),G?null:r("button",{className:"mp-quiz-btn",onClick:()=>pe(1)},"下一页"),r("button",{className:"mp-quiz-btn primary",disabled:!Z,onClick:me},"看结果"),r("button",{className:"mp-quiz-btn",onClick:re},"清空"),r("span",{className:"mp-quiz-hint"},Z?`已够 ${na} 题，可以看结果；答完 ${xe} 题会更准。`:`答满 ${na} 题可先看结果（还差 ${na-he} 题）。`)))}class xn extends(Ja.Component||Object){constructor(s){super(s),this.state={err:null}}static getDerivedStateFromError(s){return{err:s}}componentDidCatch(s,z){console.error("[metaphysics] 面板渲染异常",s,z)}render(){if(!this.state.err)return this.props.children;const s=this.state.err,z=String(s&&s.stack||"").split(`
`).slice(0,14).join(`
`);return r("div",{className:"mp-wrap"},r("div",{className:"mp-panel"},r("div",{className:"mp-lbl"},"命理面板渲染出错——把下面这段发给我"),r("pre",{style:{whiteSpace:"pre-wrap",fontSize:12,lineHeight:1.5,maxHeight:320,overflow:"auto",margin:"8px 0"}},String(s&&s.message||s)+`

`+z),r("div",{className:"mp-lbl"},"环境：__PP "+typeof D+" · Engine "+typeof window.Engine+" · React "+typeof Ja+" · 版本 "+(typeof D=="object"&&D&&(window.__MP_VER||"?"))+((window.__MP_UNRELEASED||[]).length?" · 未发版改动 "+window.__MP_UNRELEASED.length+" 项":""))))}}function vn(n){const s=n&&n.size?n.size:20,z=n&&n.active;return r("svg",{width:s,height:s,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.6,strokeLinecap:"round","aria-hidden":!0,style:{opacity:z?1:.72}},r("circle",{cx:12,cy:12,r:8.2}),r("path",{d:"M12 3.8a4.1 4.1 0 0 1 0 8.2 4.1 4.1 0 0 0 0 8.2"}),r("circle",{cx:12,cy:8,r:1.1,fill:"currentColor",stroke:"none"}),r("circle",{cx:12,cy:16,r:1.1,fill:"currentColor",stroke:"none"}))}const Ze=[{k:"ziwei",label:"紫微",timeLabel:"出生时刻",hint:"紫微斗数需要出生日期、时刻与性别；出生地只影响真太阳时修正。"},{k:"bazi",label:"八字",timeLabel:"出生时刻",hint:"四柱八字按节气与真太阳时定时柱，出生地越准，时柱越稳。"},{k:"liuyao",label:"六爻",timeLabel:"起卦时刻",hint:"六爻不需要出生时间：只用起卦当下的日辰定六神、月建定旺衰，卦由摇出。"},{k:"meihua",label:"梅花",timeLabel:"起卦时刻",hint:"梅花用起卦时刻的年月日时数成卦，也可直接给两个数字起卦；与出生时间无关。"},{k:"daliuren",label:"六壬",timeLabel:"起卦时刻",hint:"大六壬用起卦时刻的日干支、时支与月将起天地盘；同样与出生时间无关。"},{k:"qimen",label:"奇门",timeLabel:"起局时刻",hint:"奇门时家转盘：用起局时刻定节气、三元与局数；换局规则决定符头与节气如何对齐。"},{k:"hepan",label:"合盘",timeLabel:"你的出生时刻",hint:"合盘按「日主 + 夫妻宫 + 五行互补」看两个人的相处与互补，需要双方出生信息。"},{k:"tarot",label:"塔罗",timeLabel:"",hint:"塔罗不看时间，只记录抽牌时刻与你的提问。"},{k:"almanac",label:"黄历",timeLabel:"",hint:"黄历按公历日期查农历、干支、宜忌、时辰吉凶、二十八宿与吉神方位；只做本地计算。"},{k:"convert",label:"农历",timeLabel:"",hint:"公农历互转：公历生日可反查农历；只知道农历生日时，可转成公历再排盘。"},{k:"zeri",label:"择日",timeLabel:"",hint:"择日把区间内每天的建除宜忌与事项适配打分排序，并按属相排除冲煞日。"},{k:"chenggu",label:"称骨",timeLabel:"出生时刻",hint:"称骨按农历年、月、日、时的骨重求和；时辰必填。"},{k:"xiaoliuren",label:"小六壬",timeLabel:"起课时刻",hint:"小六壬用农历月/日/时掐指，也可用三个随机数起课。"},{k:"star",label:"星座",timeLabel:"",hint:"星座按公历日期给出太阳星座与当日基调；同日同星座结果固定。"},{k:"numerology",label:"生命数字",timeLabel:"",hint:"生命数字按公历生日归约出生命路径数、生日数与态度数。"},{k:"mbti",label:"人格",timeLabel:"",hint:"十六型人格是 24 道自我报告题的 MBTI 风格测算：4 题一页，按 1–5 打分，答满 12 题即可看结果；只作自我参照，不是官方量表。"},{k:"constitution",label:"体质",timeLabel:"",hint:"中医体质是九种体质各 5 题的自评问卷（共 45 题，1 没有 / 5 总是），按转化分判主次体质并给调养方向；不是医学诊断。"},{k:"wuyunliuqi",label:"运气",timeLabel:"",hint:"五运六气按大寒分年：中运、司天在泉、六步。"},{k:"taiyi",label:"太乙",timeLabel:"",hint:"太乙神数按积年推局：太乙落宫、八门、文昌、计神、始击、主客算与四将。"},{k:"trend",label:"人生K线",timeLabel:"出生时刻",hint:"人生 K 线按大运与流年十神给逐年运势分，画成走势图。"},{k:"fengshui",label:"风水",timeLabel:"",hint:"风水看八宅命卦、大游年四吉四凶与流年九宫飞星；也可按坐向看门主灶倾向，或按运与坐向排玄空下卦盘。"},{k:"name",label:"起名",timeLabel:"",hint:"起名按八字喜用匹配字库五行，可评估现有名字或生成候选名。"}];function ja(n){return String(n).padStart(2,"0")}const Pt=["almanac","convert","zeri","chenggu","xiaoliuren","star","numerology","trend","fengshui","name","constitution","wuyunliuqi","taiyi"],mi=[{sys:"liuyao",label:"六爻",tip:"摇一卦：只用起卦当下定六神旺衰，所问之事写下面（必填）"},{sys:"meihua",label:"梅花",tip:"梅花易数：按起卦时刻的年月日时成卦，也可改成两个数字起卦"},{sys:"daliuren",label:"六壬",tip:"大六壬：按起卦时刻的日干支、时支与月将起天地盘"},{sys:"qimen",label:"奇门",tip:"奇门遁甲：时家转盘，默认拆补取局，可换超神接气/置闰"},{sys:"tarot",label:"塔罗",tip:"塔罗：不看时间，点一下就抽牌；牌阵在下面选"},{sys:"xiaoliuren",label:"小六壬",tip:"小六壬：按起课时刻推算，也可切报数起课"}],ui="mp.cast.open",yn=Array.isArray(window.__MPGroups)?window.__MPGroups:[],gi="mp.recent.tabs",fi="mp.first.view",bi=3;function Ft(n){try{return JSON.parse(window.localStorage.getItem(n)||"null")}catch{return null}}function Dt(n,s){try{window.localStorage.setItem(n,JSON.stringify(s))}catch{}}function wn(n){const s=new Date(n);if(Number.isNaN(s.getTime()))return"";const z=W=>new Date(W.getFullYear(),W.getMonth(),W.getDate()).getTime(),P=Math.round((z(new Date)-z(s))/864e5);return P<=0?"今天":P===1?"昨天":`${ja(s.getMonth()+1)}-${ja(s.getDate())}`}function Rt(){const n=new Date;return{date:`${n.getFullYear()}-${ja(n.getMonth()+1)}-${ja(n.getDate())}`,time:`${ja(n.getHours())}:${ja(n.getMinutes())}`}}const $n={ziwei:"birth",bazi:"birth",hepan:"birth",liuyao:"cast",meihua:"cast",daliuren:"cast",qimen:"cast",tarot:"none",almanac:"date",zeri:"date",star:"date",numerology:"date",convert:"date",chenggu:"birth",trend:"birth",fengshui:"birth",name:"birth",xiaoliuren:"cast",mbti:"none",constitution:"none",wuyunliuqi:"date",taiyi:"date"},hi={date:"1990-05-12",time:"14:30"},Sa=n=>$n[n]||"none",Fe=window.__MPCore||{},Ve=Fe.needAsk||(n=>!1),ae={ref:null,seats:[],seatOk:{},seatDisposers:[],contribution:"",keys:"",injectType:"",spec:"",errs:[],regs:0,mounted:0},Ye={r:null,q:"",it:null,entry:null};let sa="";function xi(){const n=[];return n.push("inputActions "+(ae.ref?"已拿到":"未拿到")),n.push("渲染 "+ae.mounted+" 次"),n.push("注册 "+ae.regs+" 次"),n.push("inject "+(ae.injectType||"?")),n.push("槽位 "+(ae.spec||"?")),ae.contribution&&n.push("贡献 "+ae.contribution),ae.errs.length&&n.push("错误："+ae.errs.join(" / ")),"桥自检："+n.join("；")}function vi(n){if(ae.errs.length>=3)return;const s=n&&n.message?String(n.message):String(n);ae.errs.push(s.slice(0,90))}function kn(n){if(!n)return null;const s=n.inputActions;if(s&&typeof s.setDraft=="function"&&typeof s.submit=="function")return s;const z=n.actions&&n.actions.input;return z&&typeof z.setDraft=="function"&&typeof z.submit=="function"?z:null}function yi(n,s){const z=kn(n);return za(()=>{if(ae.seats.indexOf(s)<0&&ae.seats.push(s),ae.keys=n?Object.keys(n).join(","):"",z){ae.ref=z;try{window.__MPComposer=z}catch{}}return()=>{ae.ref===z&&(ae.ref=null)}},[z,s]),z}function zn(){const n=Ye.r;if(!n)return"";try{const s=K.askPrompt?K.askPrompt(n,{question:Ye.q,interpret:Ye.it}):null;return s&&s.text||String(n.summary||"")}catch{return String(n.summary||"")}}function wi(n){return ae.mounted+=1,yi(n,"input.right")?r("button",{type:"button",className:"mp-chip ok",title:Ye.r?"把上一张盘的摘要和问题发进对话窗":"先在侧栏「烛微命盘」里排一张盘",onClick:()=>{const z=zn();z&&ki(z)}},"命理·问"):r("span",{className:"mp-chip warn",title:"命理：已占住输入框槽位，但没拿到 inputActions；把这句话告诉作者"},"命理·未就绪")}function $i(n){return ae.mounted+=1,yi(n,"composer.dock"),null}function ki(n){let s=ae.ref;if(!s)try{s=window.__MPComposer||null}catch{s=null}return!s||typeof s.setDraft!="function"||typeof s.submit!="function"?!1:(s.setDraft(n),s.submit(),!0)}function jn(n){const s=n.kind==="ziwei"?D.ziweiHTML(n.r):n.kind==="bazi"?D.baziHTML(n.r)+(n.trend?D.trendHTML(n.trend,{brief:!1}):""):n.kind==="meihua"?D.meihuaHTML(n.r):n.kind==="daliuren"?D.daliurenHTML(n.r):n.kind==="qimen"?D.qimenHTML(n.r)+D.qimenFactsHTML(n.r):n.kind==="hepan"?n.r.chart==="ziwei"?D.ziweiHepanHTML(n.r):D.hepanHTML(n.r):n.kind==="tarot"?D.tarotHTML(n.r):n.kind==="liuyao"?D.liuyaoHTML(n.r):n.kind==="chenggu"?D.chengguHTML(n.r):n.kind==="almanac"?D.almanacHTML(n.r):n.kind==="zeri"?D.zeriHTML(n.r):n.kind==="trend"?D.trendHTML(n.r):n.kind==="name"?D.nameHTML(n.r):n.kind==="mbti"?D.mbtiHTML(n.r):n.kind==="constitution"?D.constitutionHTML(n.r):n.kind==="wuyunliuqi"?D.wuyunliuqiHTML(n.r):n.kind==="taiyi"?D.taiyiHTML(n.r):n.kind==="fengshui"?D.fengshuiHTML(n.r):D.quickHTML(n.r),z=s.startsWith('<section class="mp-br"')?s.indexOf("</section>"):-1,P=z<0?s:s.slice(z+10),W=z<0?"":s.slice(0,z+10);return P+D.plainHTML(n.r)+W}function Sn(n){const s=!!n.open,z=r("button",{type:"button",className:"mp-castrow-h","aria-expanded":s?"true":"false","aria-controls":"mp-castlist",onClick:n.onToggle,title:"展开六个占卜体系的起卦入口：点一个就切过去，并用当前时刻起卦"},r("span",{className:"mp-castrow-t"},"起卦"),r("span",{className:"mp-castrow-l"},s?"六个占卜体系，点一下就起":mi.map(P=>P.label).join(" · ")),r("i",{className:"mp-castrow-i","aria-hidden":"true"},s?"▴":"▾"));return s?r("div",{key:"cast",className:"mp-castrow open"},z,r("div",{key:"list",id:"mp-castlist",className:"mp-castlist"},mi.map(P=>r("button",{key:P.sys,type:"button",className:"mp-castchip"+(n.tab===P.sys?" on":""),"data-cast":P.sys,"aria-pressed":n.tab===P.sys?"true":"false",title:P.tip,onClick:()=>n.onCast(P.sys)},P.label))),n.hasResult?r("div",{key:"ask",className:"mp-castask"},r("button",{type:"button",className:"mp-castgo",onClick:n.onAsk,title:"把这张盘和所问之事发进 DSH 对话窗（与下面的「问进对话」同一个通路）"},"把这张盘问进对话")):null):r("div",{key:"cast",className:"mp-castrow"},z)}function qn(){const[n,s]=S("ziwei"),[z,P]=S("1990-05-12"),[W,pe]=S("14:30"),[me,re]=S(!1),[xe,t]=S("female"),[ke,R]=S(""),[he,ve]=S("1992-08-15"),[G,Z]=S("10:00"),[X,B]=S("female"),[te,qe]=S(""),[Le,ma]=S("bazi"),[Ke,bt]=S(!1),[qa,Va]=S("1990-01-01"),[Na,ua]=S("12:00"),[ga,Ma]=S("male"),[Ca,ht]=S(""),[oa,fa]=S("chaibu"),[Je,Aa]=S(!0),[pa,La]=S(!0),[Ta,Wa]=S("same-day"),[Qa,Bt]=S(!1),[ra,Gt]=S(""),[Ea,Ee]=S(""),[_a,et]=S(null),[at,Oa]=S({}),[ba,ze]=S(null),[We,xt]=S([{year:"2019",kind:"career"},{year:"2022",kind:"love"}]),[De,tt]=S(null),[Ha,it]=S("开业"),[la,Pa]=S("30"),[Xe,nt]=S(""),[ha,Qe]=S(""),[He,ea]=S("solar2lunar"),[xa,vt]=S(""),[Fa,yt]=S(!1),[Re,st]=S("time"),[Da,wt]=S(""),[Ra,Ia]=S(""),[va,$t]=S(""),[Ba,Pe]=S(()=>new Array(ft().total).fill(null)),[Ga,Ua]=S(0),[aa,kt]=S(null),[Za,zt]=S(()=>new Array(Ht).fill(null)),[Ut,e]=S(0),[i,p]=S("60"),[l,o]=S("natal"),[d,c]=S("9"),[g,m]=S("子"),[b,x]=S("午"),[w,$]=S("assess"),[C,A]=S("李"),[_,Q]=S(""),[F,L]=S("6"),[O,le]=S(!1),[N,I]=S(""),[f,ie]=S(null),[V,ee]=S(""),[Te,j]=S(""),[q,E]=S(null),[ne,be]=S(()=>ln()),[se,je]=S(()=>Ft(fi)==="flat"?"flat":"group"),[ye,H]=S(()=>{const a=Ft(gi);return Array.isArray(a)?a:[]}),[J,Y]=S({}),[ge,fe]=S(null),[v,y]=S(()=>D.profilesLoad()),[de,ce]=S(null),[Me,Ne]=S(""),[we,Ce]=S(""),[da,$e]=S(""),[An,Ya]=S(!1),[Zt,ji]=S("three"),[ca,Yt]=S(""),[Be,Si]=S("general");function Kt(){return ra.trim()||(f&&Ve(f.kind)?String(ca||"").trim():"")}za(()=>{f&&f.r&&(Ye.r=f.r,Ye.q=Kt(),Ye.it=f.it||null)},[f,ra,ca]);const[qi,Ln]=S(null),[Ni,Tn]=S(Ft(ui)===!0),[En,jt]=S(!1),[ya,Mi]=S("time"),[St,Ci]=S(""),[qt,Ai]=S(""),[Nt,Li]=S(""),[_n,wa]=S(""),[Jt,Mt]=S({birth:null,cast:null}),On=Ze.find(a=>a.k===n)||Ze[0],ot=n==="bazi"||n==="ziwei"||n==="hepan"||n==="chenggu"||n==="trend"||n==="fengshui"||n==="name",Ge=Sa(n),Ti=!(n==="meihua"&&ya==="number"),Ei=n!=="tarot"&&n!=="mbti"&&n!=="constitution"&&Ti,_i=Ei&&Ge!=="date",Ms=_i,Ae=async(a,u,k,M)=>{const h=a||n,ue=k||ya,Se=h==="bazi"||h==="trend",ta=M&&typeof M.hourUnknown=="boolean"?M.hourUnknown:me,_e=u||(Se&&ta?{date:z,time:"12:00"}:{date:z,time:W}),Ue=M&&M.gender?M.gender:xe,$a=M&&typeof M.address=="string"?M.address:ke,pt=M&&typeof M.trueSolar=="boolean"?M.trueSolar:Je,rt=M&&typeof M.lateZi=="boolean"?M.lateZi:pa,Wi=M&&typeof M.lines=="string"?M.lines:N,Tt=M&&typeof M.question=="string"?M.question:ca,Qi=Xa(),en=++Oe,lt=()=>en!==Oe;E(null),$e("");try{let ka=0,an=null;Ya(!0);try{await ct(h);const U=window.__MP_LAST_LOAD;ka=U&&typeof U.ms=="number"?U.ms:Xa()-Qi,an=U&&typeof U.cached=="boolean"?U.cached:null}catch(U){if(lt())return;Ce(U&&U.message?U.message:String(U)),ie(null);return}finally{lt()||Ya(!1)}if(lt())return;const tn=`${_e.date}T${_e.time}`,T={system:h};if(T.shadow=h!=="mbti"&&h!=="constitution",T.trace=h==="liuyao"||h==="bazi"||h==="ziwei"||h==="qimen"||h==="daliuren",h!=="tarot"&&(T.datetime=tn),h==="bazi"||h==="ziwei"||h==="hepan"||h==="trend"){if(T.gender=Ue,T.trueSolar=pt,$a.trim()){T.address=$a.trim();try{const U=await K.geocodeAddress(T.address,{online:O});U&&typeof U.lon=="number"&&(T.longitude=U.lon,T.geo=U)}catch(U){console.error("[metaphysics] 地址解析失败，退回内置表",U)}if(lt())return}(h==="bazi"||h==="ziwei")&&(T.cross=Qa),T.lateZi=rt,Se&&ta&&(T.hourUnknown=!0)}if(h==="liuyao"){const U=Fe.parseLines(Wi);U.lines?T.lines=U.lines:U.warning&&$e(U.warning)}if(h==="qimen"&&(T.juMethod=oa,T.lateZiHourMode=Ta,T.direction=Be),h==="bazi"&&(T.verifyPast=6),h==="zeri"){T.startDate=_e.date,T.task=Ha,T.days=Number(la)||30,Xe&&(T.shengXiao=Xe);const U=ha.split(/[,，、\s]+/).filter(Boolean);U.length&&(T.candidates=U)}if(h==="xiaoliuren")if(T.mode=Re,Re==="number")T.num1=Number(Da)||void 0,T.num2=Number(Ra)||void 0,T.num3=Number(va)||void 0;else{T.date=_e.date;const U=Number(String(_e.time).split(":")[0]);T.hour=Number.isFinite(U)?U:12}if(h==="mbti"){delete T.datetime;const U=Ba.slice();for(;U.length&&U[U.length-1]==null;)U.pop();U.length&&(T.answers=U)}if(h==="constitution"&&(delete T.datetime,T.answers=Za.slice()),h==="trend"&&Se&&ta&&(T.hourUnknown=!0),h==="trend"&&(T.toAge=Number(i)||60),h==="fengshui"&&(T.action=l,l==="natal"?T.gender=Ue:(T.sitting=g,T.facing=b,delete T.datetime,l==="xuankong"&&(T.period=Number(d)||9))),h==="name"&&(T.action=w,T.surname=C.trim(),w==="generate"?(T.gender=Ue,T.limit=Number(F)||6,T.trueSolar=pt,T.lateZi=rt):(T.givenName=_.trim(),(!_e.date||!_e.time)&&delete T.datetime)),h==="convert")if(T.system="convert",He==="lunar2solar"){const U=/^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(xa).trim());if(!U){Ce("农历转公历请按「农历年-月-日」填写，例如 2026-9-17；闰月单独勾选。");return}T.mode="lunar2solar",T.lunarYear=Number(U[1]),T.lunarMonth=Number(U[2]),T.lunarDay=Number(U[3]),T.isLeapMonth=Fa,delete T.datetime}else T.mode="solar2lunar";if(h==="tarot"&&(T.spread=Zt),h==="hepan"&&(T.chart=Le,T.partner={datetime:`${he}T${G}`,gender:X,address:te.trim()||void 0,trueSolar:Je},Ke&&(T.partner2={datetime:`${qa}T${Na}`,gender:ga,address:Ca.trim()||void 0,trueSolar:Je})),Ve(h)){if(!Tt.trim()){Ce("请先填写「所问之事」——一句话即可，例如：今年是否适合换工作？"),jt(!0),ie(null);return}jt(!1),T.question=Tt.trim(),h==="liuyao"&&(T.direction=Be)}if(h==="meihua"&&(T.mode=ue,ue==="number")){if(St.trim()===""||qt.trim()===""){Ce("数字起卦需要填两个数（第一个数定上卦、第二个数定下卦）。"),ie(null);return}if(T.upper=Number(St),T.lower=Number(qt),!Number.isFinite(T.upper)||!Number.isFinite(T.lower)){Ce("两个数都要是数字，例如 17 和 29。"),ie(null);return}Nt!==""&&(T.changing=Number(Nt))}const ks=Xa();h==="trend"&&!T.asOf&&Fe.todayStamp&&(T.asOf=Fe.todayStamp());const Ka=K.compute(T),zs=Xa()-ks;let ei=null;try{ei=D.shadowTrack?D.shadowTrack(Ka):null}catch{ei=null}let ai=null;if(h==="bazi")try{ai=K.compute({system:"trend",datetime:tn,gender:Ue,toAge:100,trueSolar:pt,lateZi:rt,...Fe.todayStamp?{asOf:T.asOf||Fe.todayStamp()}:{},...T.dst!==void 0?{dst:T.dst}:{},...T.address?{address:T.address}:{},...typeof T.longitude=="number"?{longitude:T.longitude}:{},...T.geo?{geo:T.geo}:{}})}catch{ai=null}let ti=null;if(K.caliberCompare)try{ti=K.caliberCompare(T)}catch{ti=null}const js=Ve(h)||h==="qimen"?{question:Ve(h)?Tt.trim():"",direction:Be}:void 0,Et=K.interpret?K.interpret(Ka,js):null;Et&&Ka.cross&&K.crossSection&&(Et.sections=[...Et.sections||[],K.crossSection(Ka.cross)]);const Ss=Sa(h)==="cast"&&(h!=="meihua"||ue==="time");ie({kind:h,r:Ka,it:Et,at:_e,timed:Ss,trend:ai,caliber:ti,shadowDiff:ei,gender:Ue,address:$a,trueSolar:pt,lateZi:rt});const nn=U=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>U>1?nn(U-1):sn()):setTimeout(sn,0)},sn=()=>{en===Oe&&E({engineMs:ka,computeMs:zs,cached:an,totalMs:Xa()-Qi,renderMs:null})};if(nn(2),et(null),ze(null),Oa({}),tt(null),Ce(""),wa(""),h!=="tarot"&&h!=="mbti"&&h!=="constitution"){const U=!!(Se&&ta),ii={kind:h,date:_e.date,time:U?"":_e.time,hourUnknown:U,gender:Ue,address:$a,trueSolar:pt,lateZi:rt,lines:h==="liuyao"?Wi:"",question:Ve(h)?Tt.trim():"",direction:Be,spread:Zt,mhMode:ue,upper:St,lower:qt,changing:Nt,...h==="qimen"?{qimenRule:oa,qLateZi:Ta}:{},...h==="zeri"?{task:Ha,days:la,shengXiao:Xe,zCand:ha}:{},...h==="xiaoliuren"?{xlrMode:Re,num1:Da,num2:Ra,num3:va}:{},...h==="trend"?{toAge:i}:{},...h==="fengshui"?{fsMode:l,fsPeriod:d,sitting:g,facing:b}:{},...h==="name"?{nnMode:w,surname:C,givenName:_,limitN:F}:{},...h==="convert"?{convMode:He,lunarDate:xa,leapMonth:Fa}:{},...h==="hepan"?{hpChart:Le,partnerDate:he,partnerTime:G,partnerGender:X,partnerAddress:te,thirdOn:Ke,p2Date:qa,p2Time:Na,p2Gender:ga,p2Address:Ca}:{},label:cn(h,Ka),at:Date.now()};be(qs=>{const on=[ii,...qs.filter(Ns=>!dn(Ns,ii))].slice(0,20);return li(on),on}),h!=="tarot"&&h!=="mbti"&&h!=="constitution"&&(Ye.entry=ii),Ki(!1)}}catch(ka){if(lt())return;Ce(ka&&ka.message?ka.message:String(ka)),ie(null)}},Hn=async a=>{const u=Sa(a),k=++Oe;if(Ce(""),a==="mbti"){$e(""),Ya(!0);try{await ct(a)}catch(h){k===Oe&&Ce(h&&h.message?h.message:String(h))}finally{k===Oe&&Ya(!1)}if(k!==Oe)return;s(a),Ba.filter(h=>h!=null).length>=ia?Ae(a):ie(null);return}if(a==="constitution"){$e(""),Ya(!0);try{if(await ct(a),k===Oe&&!aa){const h=K.compute({system:"constitution"});h&&h.paper&&kt(h)}}catch(h){k===Oe&&Ce(h&&h.message?h.message:String(h))}finally{k===Oe&&Ya(!1)}if(k!==Oe)return;s(a),Za.filter(h=>h!=null).length>=na?Ae(a):ie(null);return}if(s(a),u==="none"){Ae(a);return}const M=Jt[u]||(u==="cast"||u==="date"?Rt():{date:hi.date,time:hi.time});P(M.date),pe(M.time),Ae(a,M)},Pn=a=>{Ze.some(u=>u.k===a)&&H(u=>{const k=(u||[]).filter(h=>h&&h.tab&&h.tab!==a),M=[{tab:a,at:Date.now()}].concat(k).slice(0,bi);return Dt(gi,M),M})},Oi=a=>{const u=a==="flat"?"flat":"group";je(u),Dt(fi,u)},Ct=a=>{Pn(a),Hn(a)},Fn=()=>{const a=!Ni;Tn(a),Dt(ui,a)},Dn=a=>{Ct(a)},Rn=a=>{P(a),Ge!=="none"&&Mt(u=>Object.assign({},u,{[Ge]:{date:a,time:W}}))},In=a=>{pe(a),Ge!=="none"&&Mt(u=>Object.assign({},u,{[Ge]:{date:z,time:a}}))},Cs=()=>{const a=Rt();P(a.date),pe(a.time),Ge!=="none"&&Mt(u=>Object.assign({},u,{[Ge]:null})),Ae(n,a)},Xt=()=>{if(n==="mbti"){const a=Ba.filter(u=>u!=null).length;if(a<ia){$e(`先答满 ${ia} 题再看结果（现答 ${a} 题，还差 ${ia-a} 题）。`);return}Ae(n);return}if(n==="constitution"){const a=Za.filter(u=>u!=null).length;if(a<na){$e(`先答满 ${na} 题再看结果（现答 ${a} 题，还差 ${na-a} 题）。`);return}Ae(n);return}if(Ge!=="none"&&!Jt[Ge]){const a=Rt();P(a.date),pe(a.time),Ae(n,a);return}Ae(n)},Bn=()=>{const a={date:"1990-05-12",time:"14:30"};s("bazi"),t("male"),R("河北石家庄"),Mt(u=>Object.assign({},u,{birth:a})),P(a.date),pe(a.time),Ae("bazi",a,null,{gender:"male",address:"河北石家庄"})},Hi=a=>{Mi(a),Ae(n,{date:z,time:W},a)},Gn=()=>!!(window.matchMedia&&window.matchMedia("(max-width: 640px)").matches),Un=()=>qi===null?Gn():qi,At=(a,u,k)=>{if(!u)return;const M=ue=>{a.textContent=ue?"已复制":"复制失败",setTimeout(()=>{a.textContent=k},1400)},h=()=>{try{const ue=document.createElement("textarea");ue.value=u,ue.setAttribute("readonly",""),ue.style.position="fixed",ue.style.opacity="0",document.body.appendChild(ue),ue.select();const Se=!!(document.execCommand&&document.execCommand("copy"));return document.body.removeChild(ue),Se}catch{return!1}};try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(u).then(()=>M(!0),()=>M(h()));return}}catch{}M(h())},Zn=a=>At(a,a.getAttribute("data-shadow-copy")||"","复制 ID"),Yn=a=>At(a,a.getAttribute("data-handle-copy")||"","复制句柄"),Kn=a=>{const u=a.closest(".mp-trace-layer")||document.getElementById("mp-trace-layer"),k=u&&u.querySelector("[data-trace-md]");At(a,k?k.value:"","复制 Markdown")},Jn=()=>{try{return String(location.href).split("#")[0]}catch{return""}},Xn=()=>{if(!f||!f.r)return null;try{return K.askPackages?K.askPackages(f.r,{question:Kt(),interpret:f.it,base:Jn()}):null}catch{return null}},Pi=[["full","复制提问","完整提问：盘面摘要 + 阅读层次 + 回答骨架，粘进任何对话窗都能用"],["brief","复制精简","一句话版：体系 + 排盘句柄 + 你的问题，够助手认出是哪张盘"],["structured","复制参数","结构化参数（JSON）：助手可直接照 args 调 compute，不必解析自然语言"],["link","复制深链","深链：把这张盘的参数编进链接，打开即还原同一张盘（换台机器、发给朋友都行）"]],Vn=(a,u)=>{const k=Xn();if(!k){Ee("还没有可以复制的盘：先排一张。");return}const M=a==="link"?k.link:k[a];if(!M){Ee(a==="link"?"这张盘没拿到句柄（随机抽牌只复现参数、不复现牌面），深链做不出来；用「复制提问」那一档。":"这一档暂时是空的，换一档试试。");return}At(u,M,Pi.find(h=>h[0]===a)[1]),a==="link"&&Ee("深链已复制：打开就还原这张盘，也可以直接发给别人。链接里是编码不是加密，别公开贴。")},Wn=()=>{const a=document.getElementById("mp-trace-layer");if(!a)return;a.classList.add("open"),a.setAttribute("aria-hidden","false");const u=a.querySelector("[data-trace-close]");u&&u.focus&&u.focus()},Fi=()=>{const a=document.getElementById("mp-trace-layer");if(!a)return;a.classList.remove("open"),a.setAttribute("aria-hidden","true");const u=document.querySelector("[data-trace-open]");u&&u.focus&&u.focus()},Qn=a=>{const u=a.target&&a.target.closest?a.target.closest("[data-shadow-copy]"):null;if(u){Zn(u);return}const k=a.target&&a.target.closest?a.target.closest("[data-handle-copy]"):null;if(k){Yn(k);return}if(a.target&&a.target.closest?a.target.closest("[data-trace-open]"):null){Wn();return}const h=a.target&&a.target.closest?a.target.closest("[data-trace-copy]"):null;if(h){Kn(h);return}if(a.target&&a.target.closest?a.target.closest("[data-mp-askcopy]"):null){ts();return}if(a.target&&a.target.closest?a.target.closest("[data-trace-close]"):null){Fi();return}const ta=a.target&&a.target.closest?a.target.closest(".mp-it-head"):null;if(!ta)return;const _e=ta.closest(".mp-it");if(!_e)return;const Ue=!_e.classList.contains("folded");_e.classList.toggle("folded",Ue),ta.setAttribute("aria-expanded",Ue?"false":"true");const $a=ta.querySelector(".mp-it-hint");$a&&($a.textContent=Ue?"点击展开":"点击收起"),Ln(Ue)},Di=(a,u)=>{if(!f||!(Ve(n)||n==="qimen"))return;const k={question:Ve(n)?(u===void 0?ca:u).trim():"",direction:a===void 0?Be:a},M=K.interpret?K.interpret(f.r,k):null;let h=f.r;if((n==="liuyao"||n==="qimen")&&h&&h.trace&&K.buildTrace)try{const ue=n==="liuyao"?K.buildTrace(h,{direction:k.direction,gender:h.useGod&&h.useGod.gender||"male",refresh:!0}):K.buildTrace(h,{direction:k.direction});ue&&(h=Object.assign({},h,{trace:ue}))}catch{}ie(Object.assign({},f,{r:h,it:M}))},es=a=>!a||!a.timed||!a.at?"":`<div class="mp-cast">起卦时刻：<b>${a.at.date} ${a.at.time}</b>　（来自你的本机时间，点「此刻」可重新取当下）</div>`,as=()=>{try{const a=f&&f.r&&f.r.summary?f.r.summary:"";if(!a)return;navigator.clipboard.writeText(a).then(()=>wa("已复制"),()=>wa("复制失败"))}catch{wa("复制失败")}},ts=()=>{if(!f||!f.r||!window.Engine||!window.Engine.buildEventPrompt)return;const a=Fe&&Fe.kindOfDirection?Fe.kindOfDirection(Be):"other";let u;try{u=window.Engine.buildEventPrompt(f.r,{question:(ca||"").trim(),kind:a,gender:xe,timeKnown:!0})}catch{u=null}u&&u.text&&navigator.clipboard.writeText(u.text).then(()=>wa("已复制问事提示"),()=>wa("复制失败"))},Ri=()=>{if(!(!f||!f.r||!ra.trim()))try{et(K.followup?K.followup(f.r,ra.trim()):null)}catch(a){et({question:ra.trim(),ok:!1,answer:"追问失败："+(a&&a.message?a.message:a),evidence:[],confidence:"弱"})}},Ii=()=>{if(!(!f||!f.r))try{const a=K.askPrompt?K.askPrompt(f.r,{question:Kt(),interpret:f.it}):null,u=a&&a.text?a.text:String(f.r.summary||"");if(ki(u)){Ee("已发到对话窗，往下看回复。");return}const k="（"+xi()+"）";navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(u).then(()=>Ee("对话输入框还没就绪"+k+"，已复制提问；粘进对话窗回车即可。"),()=>Ee("对话输入框还没就绪"+k+"，复制也没成功；先点「复制文字结果」再贴。")):Ee("对话输入框还没就绪"+k+"；先点「复制文字结果」再贴进对话窗。")}catch(a){Ee("发到对话窗失败："+(a&&a.message?a.message:a))}},is=()=>{const a=[],u=window.__MP_VER||"未知";a.push("# 命理插件反馈"),a.push(""),a.push("## 我遇到的情况"),a.push(""),a.push("（在这里写一句就好：哪里不对 / 读不懂哪一段 / 算得和别人不一样 / 想加什么。下面这些是自动带的复现信息，不用改。）"),a.push(""),a.push("## 复现信息"),a.push(""),a.push("- 插件版本：v"+u);{const h=Array.isArray(window.__MP_UNRELEASED)?window.__MP_UNRELEASED:[];h.length&&a.push("- 未发版改动："+h.length+" 项（版本号未变，说明这份产物比 v"+u+" 新）")}const k=Ze.find(h=>h.k===n)?.label||n;if(a.push("- 体系："+k+(k===n?"":"（"+n+"）")),ca&&a.push("- 所问之事："+ca),Be&&Be!=="general"){const h=(Array.isArray(K.DIRECTIONS)?K.DIRECTIONS:[]).find(ue=>ue.key===Be);a.push("- 询问方向："+(h?h.label:Be))}a.push(""),a.push("### 输入"),a.push(""),a.push("```"),(Sa(n)==="time"||Sa(n)==="date")&&(a.push(`日期：${z}`),Sa(n)==="time"&&a.push(`时刻：${me?"（未知，按三柱排）":W}`),a.push(`性别：${xe==="male"?"男":"女"}`),ke&&a.push(`出生地：${ke}`),a.push(`真太阳时：${Je?"开":"关"}　晚子时换日：${pa?"开":"关"}`),n==="qimen"&&a.push(`奇门取局：${oa}`),Qa&&a.push("交叉验证：开"));const M={合盘:()=>{a.push(`对方：${he} ${G} ${X==="male"?"男":"女"}${te?" "+te:""}（${Le} 盘）`),Ke&&a.push(`第三方：${qa} ${Na} ${ga==="male"?"男":"女"}${Ca?" "+Ca:""}`)},择日:()=>{a.push(`事项：${Ha}　起算：${z}　天数：${la}${Xe?"　属相："+Xe:""}${ha?"　候选日："+ha:""}`)},起名:()=>{a.push(`姓：${C||"（未填）"}　名：${_||"（未填）"}　模式：${w}${w==="generate"?"　候选数："+(F||"默认"):""}`)},公农历:()=>{a.push(`模式：${He}${xa?"　农历输入："+xa:""}${Fa?"（闰月）":""}`)},小六壬:()=>{a.push(`模式：${Re}${Re==="number"?`　报数：${Da}/${Ra}/${va}`:""}`)},风水:()=>{a.push(`动作：${l}${l==="natal"?"":`　坐：${g}　向：${b}`}${l==="xuankong"?`　运：${d}`:""}`)}};if(M[k]&&M[k](),a.push("```"),a.push(""),we&&(a.push("### 报错原文"),a.push(""),a.push("```"),a.push(String(we)),a.push("```"),a.push("")),f&&f.r){a.push("### 结果摘要（引擎原文，前 40 行）"),a.push(""),a.push("```");const h=String(f.r.summary||(K.renderText?K.renderText(f.r):"")||"");a.push(h.split(`
`).slice(0,40).join(`
`)),a.push("```"),f.r.handle&&(a.push(""),a.push("排盘句柄（开发者可据此复现同一张盘）：`"+f.r.handle+"`"))}else a.push("### 结果摘要"),a.push(""),a.push("（这次没有生成盘面——如果是在排盘过程中出错，上面的「报错原文」就是关键。）");return a.push(""),a.push("## 联系渠道"),a.push(""),a.push("- GitHub issue：https://github.com/xuanfu-web/dsh-metaphysics/issues"),a.push("- 邮件：1129440028@qq.com"),a.push("- 微信群：dsh-metaphysics"),a.join(`
`)},Bi=()=>{const a=is();try{if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(a).then(()=>{ee("已复制"),j("粘到 issue / 邮件 / 群里即可")}).catch(()=>{ee("复制失败"),j("可改用「导出 .md」或手动选中")});else{const u=document.createElement("textarea");u.value=a,u.style.cssText="position:fixed;left:-9999px;top:0",document.body.appendChild(u),u.select();const k=document.execCommand&&document.execCommand("copy");u.remove(),ee(k?"已复制":"复制失败"),j(k?"粘到 issue / 邮件 / 群里即可":"可改用「导出 .md」或手动选中")}}catch{ee("复制失败"),j("可改用「导出 .md」")}setTimeout(()=>{ee(""),j("")},4e3)},ns=()=>{try{Bi()}catch{}const a=encodeURIComponent("[反馈] "+(Ze.find(u=>u.k===n)?.label||n)+(we?"：报错":"：使用问题"));try{window.open("https://github.com/xuanfu-web/dsh-metaphysics/issues/new?title="+a,"_blank","noopener")}catch{j("浏览器拦了弹窗，请手动打开 GitHub issues")}},ss=()=>{if(!(!f||!f.r))try{const a=K.renderText?K.renderText(f.r):f.r.summary||"",u=new Blob([a],{type:"text/markdown;charset=utf-8"}),k=document.createElement("a");k.href=URL.createObjectURL(u),k.download=`烛微命盘报告-${f.r.system}.md`,document.body.appendChild(k),k.click(),k.remove(),setTimeout(()=>URL.revokeObjectURL(k.href),2e3)}catch(a){console.error("[metaphysics] 导出失败",a)}},os=()=>{if(!(!f||!f.r))try{const a=D.summaryCardPNG?D.summaryCardPNG(f.r,f.it):"";if(!a){wa("当前环境不支持 Canvas 导出");return}const u=document.createElement("a");u.href=a,u.download=`烛微命盘摘要-${f.r.system}.png`,document.body.appendChild(u),u.click(),u.remove()}catch(a){console.error("[metaphysics] 长图导出失败",a)}},Gi={fontSize:12,padding:"5px 12px"},ps=()=>{!f||!f.r||!f.r.past||ze(K.verifyFit?K.verifyFit(f.r.past.rows,at):null)},rs=()=>{if(!(!f||f.kind!=="bazi"))try{const a=f.at||{date:z,time:W},[u,k,M]=String(a.date).split("-").map(Number),[,h]=String(a.time).split(":").map(Number),ue=We.filter(Se=>Number(Se.year)).map(Se=>({year:Number(Se.year),kind:Se.kind}));tt(K.rectifyBirth?K.rectifyBirth({base:{year:u,month:k,day:M,minute:Number.isFinite(h)?h:0},gender:f.gender||xe,events:ue,lateZi:typeof f.lateZi=="boolean"?f.lateZi:pa,trueSolar:typeof f.trueSolar=="boolean"?f.trueSolar:Je,address:String(f.address||"").trim()||void 0}):{error:"当前客户端未加载生时校正模块"})}catch(a){tt({error:a&&a.message?a.message:String(a)})}},oe=(a,u)=>r("label",{className:"mp-field"},r("span",{className:"mp-lbl"},a),u),Ui=a=>{s(a.kind),a.date&&P(a.date),a.time&&pe(a.time),re(!!a.hourUnknown),a.gender&&t(a.gender),R(a.address||""),typeof a.trueSolar=="boolean"&&Aa(a.trueSolar),typeof a.lateZi=="boolean"&&La(a.lateZi),I(a.lines||""),Yt(a.question||""),Si(a.direction||"general"),ji(a.spread||{1:"one",3:"three",5:"five"}[a.count]||"three"),Mi(a.mhMode||"time"),Ci(a.upper||""),Ai(a.lower||""),Li(a.changing||""),a.kind==="qimen"&&(typeof a.qimenRule=="string"&&fa(a.qimenRule),typeof a.qLateZi=="string"&&Wa(a.qLateZi)),a.kind==="zeri"&&(typeof a.task=="string"&&it(a.task),a.days!=null&&Pa(String(a.days)),typeof a.shengXiao=="string"&&nt(a.shengXiao),typeof a.zCand=="string"&&Qe(a.zCand)),a.kind==="xiaoliuren"&&(st(a.xlrMode==="number"?"number":"time"),a.num1!=null&&wt(String(a.num1)),a.num2!=null&&Ia(String(a.num2)),a.num3!=null&&$t(String(a.num3))),a.kind==="trend"&&a.toAge!=null&&p(String(a.toAge)),a.kind==="fengshui"&&(typeof a.fsMode=="string"&&o(a.fsMode),a.fsPeriod!=null&&c(String(a.fsPeriod)),typeof a.sitting=="string"&&m(a.sitting),typeof a.facing=="string"&&x(a.facing)),a.kind==="name"&&(typeof a.nnMode=="string"&&$(a.nnMode),typeof a.surname=="string"&&A(a.surname),typeof a.givenName=="string"&&Q(a.givenName),a.limitN!=null&&L(String(a.limitN))),a.kind==="convert"&&(typeof a.convMode=="string"&&ea(a.convMode),typeof a.lunarDate=="string"&&vt(a.lunarDate),typeof a.leapMonth=="boolean"&&yt(a.leapMonth)),a.kind==="hepan"&&(a.hpChart&&ma(a.hpChart),typeof a.partnerDate=="string"&&ve(a.partnerDate),typeof a.partnerTime=="string"&&Z(a.partnerTime),typeof a.partnerGender=="string"&&B(a.partnerGender),typeof a.partnerAddress=="string"&&qe(a.partnerAddress),typeof a.thirdOn=="boolean"&&bt(a.thirdOn),typeof a.p2Date=="string"&&Va(a.p2Date),typeof a.p2Time=="string"&&ua(a.p2Time),typeof a.p2Gender=="string"&&Ma(a.p2Gender),typeof a.p2Address=="string"&&ht(a.p2Address)),jt(!1),fe(a)},ls=()=>{be([]),li([])},[Ie,Lt]=S(()=>{try{return D.casesLoad()}catch{return[]}}),[ds,Zi]=S(!1),[Vt,Yi]=S("all"),[cs,Ki]=S(!1),ms=()=>{try{Lt(D.casesLoad())}catch{}Yi("all"),Zi(!0)},Wt=()=>Zi(!1),us=a=>a==="all"?Ie.length:Ie.filter(u=>u.status===a).length,Qt=Vt==="all"?Ie:Ie.filter(a=>a.status===Vt),gs=()=>{if(!Ye.entry){$e("这张盘没有可存的参数，重排一次再存。");return}try{const a=D.casesAdd(Ye.entry);a&&a.ok?(Lt(a.list),Ki(!0)):$e("卦例没能存进本机（存储被禁用或已满），排盘不受影响。")}catch{$e("卦例没能存进本机（存储被禁用或已满），排盘不受影响。")}},Ji=a=>{const u=a?D.casesExportMasked(Ie):D.casesExport(Ie);if(!u){$e("还没有可导出的卦例");return}try{const k=new Blob([u],{type:"application/x-ndjson;charset=utf-8"}),M=URL.createObjectURL(k),h=document.createElement("a");h.href=M,h.download=a?`metaphysics-cases-masked-${new Date().toISOString().slice(0,10)}.jsonl`:`metaphysics-cases-${new Date().toISOString().slice(0,10)}.jsonl`,document.body.appendChild(h),h.click(),h.remove(),setTimeout(()=>{try{URL.revokeObjectURL(M)}catch{}},1e3),$e(a?`已导出 ${Ie.length} 条卦例（脱敏：去年份、时刻整点化、去出生地）`:`已导出 ${Ie.length} 条卦例（JSONL）`)}catch(k){$e("导出失败："+(k&&k.message?k.message:"当前环境不支持下载"))}},fs=a=>{const u=a.entry||{},k=new Date(a.at),M=h=>String(h).padStart(2,"0");return r("div",{key:a.id,className:"mp-case"},r("button",{className:"mp-case-main",onClick:()=>{Ui(Object.assign({},u)),Wt()},title:[u.date,u.hourUnknown?"时辰未知":u.time,u.address].filter(Boolean).join(" ")||"点一下回填这组参数并重排"},r("b",null,D.profKindLabel(u.kind)),r("span",null,u.label||a.question||"—"),r("i",null,`${M(k.getMonth()+1)}-${M(k.getDate())} ${M(k.getHours())}:${M(k.getMinutes())}`)),r("select",{className:"mp-case-sel",value:a.status,title:"标应验状态",onChange:h=>Lt(D.casesSetStatus(a.id,h.target.value))},D.CASE_STATUS.map(h=>r("option",{key:h,value:h},D.caseStatusLabel(h)))),r("button",{className:"mp-case-del",title:"删除这条",onClick:()=>Lt(D.casesRemove(a.id))},"删"))},bs=["bazi","ziwei","trend","chenggu"],Xi=a=>{s(a.kind),P(a.date),a.time&&pe(a.time),re(!!a.hourUnknown),a.gender&&t(a.gender),R(a.address||""),Aa(a.trueSolar!==!1),La(a.lateZi!==!1)},hs=a=>{const u=D.profEvent(a.target);if(!u)return;const k=h=>v.find(ue=>ue.id===h),M=a.currentTarget.querySelector(".mp-prof-name");if(Ne(""),u.action==="use"){const h=k(u.id);if(!h)return;if(!D.profUsable(h)){$e("这张档案没有出生时刻，先补上时刻再存一次。");return}sa="",y(D.profilesTouch(h.id)),Xi(h),Ae(h.kind,{date:h.date,time:h.hourUnknown?"12:00":h.time},void 0,{gender:h.gender||void 0,address:h.address||"",hourUnknown:!!h.hourUnknown,trueSolar:h.trueSolar!==!1,lateZi:h.lateZi!==!1});return}if(u.action==="edit"){const h=k(u.id);if(!h)return;Xi(h),sa=h.label,ce(h.id);return}if(u.action==="cancel"){sa="",ce(null);return}if(u.action==="pin"){y(D.profilesPin(u.id));return}if(u.action==="del"){if(Me!==u.id){Ne(u.id);return}y(D.profilesRemove(u.id)),de===u.id&&(sa="",ce(null)),$e("已从本机删除这张档案卡（不影响已经排出来的盘）。");return}if(u.action==="put"){const h=de,ue=D.profFromForm({kind:n,date:z,time:W,hourUnknown:me,gender:xe,address:ke,trueSolar:Je,lateZi:pa},M?M.value:sa,de||void 0);if(!ue){$e("先填好出生日期（和时刻），再存档案。");return}const Se=D.profilesPut(ue);if(!Se.ok){$e("档案没能存进本机（存储被禁用或已满），排盘不受影响。");return}y(Se.list),sa="",ce(null),M&&(M.value=""),$e(`${h?"已更新档案":"已存入我的命盘"}「${Se.item.label}」。`)}},xs=a=>{const u=a.target&&a.target.closest?a.target.closest(".mp-prof-name"):null;u&&(sa=u.value)},vs=a=>{const u=K.formOf?K.formOf(a):null;if(!u){Ae("ziwei");return}const k=Ze.some(Se=>Se.k===u.tab)?u.tab:"ziwei",M={date:u.date||z,time:u.time||W},h=u.lines===void 0?void 0:Array.isArray(u.lines)?u.lines.join(" "):String(u.lines);u.date&&P(u.date),u.time&&pe(u.time),u.gender&&t(u.gender),typeof u.address=="string"&&R(u.address),typeof u.trueSolar=="boolean"&&Aa(u.trueSolar),typeof u.lateZi=="boolean"&&La(u.lateZi),h!==void 0&&I(h),u.question&&Yt(u.question),s(k);const ue=K.restNote?K.restNote(u):"";Ee(`已按深链还原：${a.label}${u.question?`｜${u.question}`:""}${ue?`　${ue}`:""}`),Ae(k,M,void 0,{gender:u.gender,address:u.address,trueSolar:u.trueSolar,lateZi:u.lateZi,lines:h,question:u.question})};za(()=>{let a=!1;const u=Oe;return(async()=>{let k=null;try{await ct(n);const M=typeof location<"u"?String(location.href):"";M&&M.indexOf("mp=")>=0&&window.Engine&&window.Engine.parseAskLink&&(k=window.Engine.parseAskLink(M))}catch{k=null}if(!(a||Oe!==u)){if(k&&k.ok)try{vs(k);return}catch{}Ae("ziwei")}})(),()=>{a=!0}},[]),za(()=>{if(!ge)return;const a=ge.kind;fe(null),Ae(a)},[ge]),za(()=>{const a=u=>{if(u.key!=="Escape")return;const k=document.getElementById("mp-trace-layer");k&&k.classList.contains("open")&&Fi()};return document.addEventListener("keydown",a),()=>document.removeEventListener("keydown",a)},[]);const Vi=(ye||[]).filter(a=>a&&Ze.some(u=>u.k===a.tab)).slice(0,bi),ys=a=>(Ze.find(u=>u.k===a)||{}).label||a,ws=({k:a,label:u,tip:k,wide:M})=>r("button",{key:a,type:"button",title:k,className:"mp-tool"+(M?" wide":"")+(n===a?" on":""),"data-tab":a,onClick:()=>Ct(a)},r("b",null,u),r("span",null,k)),$s=[r("div",{key:"profiles",className:"mp-profwrap",onClick:hs,onInput:xs,dangerouslySetInnerHTML:{__html:D.profilesHTML(v,{editingId:de,armedDel:Me,bar:bs.indexOf(n)>=0?D.profilesBarHTML({editingId:de,name:sa}):""})}}),r("section",{key:"start",className:"mp-start","aria-label":"选择要算的事"},r("div",{className:"mp-start-top"},r("div",{className:"mp-recent",hidden:Vi.length===0},r("span",{className:"mp-recent-lbl"},"最近用过"),r("span",{className:"mp-recent-list"},Vi.map(a=>r("button",{key:a.tab,type:"button",className:"mp-rc",onClick:()=>Ct(a.tab)},ys(a.tab),r("i",null,wn(a.at)))))),r("div",{className:"mp-viewsw",role:"group","aria-label":"首屏视图"},r("button",{type:"button",className:se==="group"?"on":"","aria-pressed":se==="group"?"true":"false",onClick:()=>Oi("group")},"分组"),r("button",{type:"button",className:se==="flat"?"on":"","aria-pressed":se==="flat"?"true":"false",onClick:()=>Oi("flat")},"平铺"))),se==="group"?r("div",{className:"mp-groups"},yn.map(a=>{const u=!!J[a.title],k=Math.max(0,a.items.length-4);return r("section",{key:a.title,className:"mp-tgroup"+(u?" open":"")},r("div",{className:"mp-tgroup-head"},r("h2",null,a.title),r("p",null,a.hint)),r("div",{className:"mp-ttools"},a.items.map(ws),k>0?r("button",{key:"more",type:"button",className:"mp-tmore","aria-expanded":u?"true":"false",onClick:()=>Y(M=>Object.assign({},M,{[a.title]:!u}))},u?"收起":`还有 ${k} 个`):null))})):null),r("div",{key:"tabs",className:"mp-tabs"+(se==="flat"?"":" hide"),role:"tablist","aria-label":"命理体系"},Ze.map(a=>r("button",{key:a.k,role:"tab","aria-selected":n===a.k?"true":"false",tabIndex:n===a.k?0:-1,className:"mp-tab"+(n===a.k?" on":""),onClick:()=>Ct(a.k)},a.label))),r("div",{key:"head",className:"mp-panel"},Sn({tab:n,open:Ni,onToggle:Fn,onCast:Dn,onAsk:Ii,hasResult:!!f}),r("div",{className:"mp-row"},Ei?oe(ot?"出生日期（公历）":Ge==="date"?"日期（公历）":"起卦日期（公历）",r(Ot,{value:z,onChange:Rn,onInvalid:()=>$e("日期请按「年-月-日」填写，例如 1990-05-12。")})):null,_i?oe(ot?"出生时刻":"起卦时刻",r("input",{className:"mp-input",type:"time",value:W,disabled:me&&(n==="bazi"||n==="trend"),onChange:a=>In(a.target.value)})):null,n==="bazi"||n==="trend"?r("label",{className:"mp-chk",title:"不知道出生时辰时勾这里：不排时柱，起运按日估算，结果首行会写明"},r("input",{type:"checkbox",checked:me,onChange:a=>re(a.target.checked)})," 时辰未知"):null,ot?oe("性别",r("select",{className:"mp-input",value:xe,onChange:a=>t(a.target.value)},r("option",{value:"female"},"女"),r("option",{value:"male"},"男"))):null,ot?oe("出生地（省/市即可）",r("input",{className:"mp-input",placeholder:"如 河北石家庄 / 成都",value:ke,onChange:a=>R(a.target.value)})):null,n==="bazi"||n==="ziwei"?r("label",{className:"mp-field mp-checks"},r("input",{type:"checkbox",checked:Qa,onChange:a=>Bt(a.target.checked)}),r("span",{className:"mp-lbl"},"八字 × 紫微 交叉验证")):null,n==="hepan"?oe("对方出生日期",r(Ot,{value:he,onChange:ve,onInvalid:()=>$e("对方出生日期请按「年-月-日」填写，例如 1992-08-15。")})):null,n==="hepan"?oe("对方出生时刻",r("input",{className:"mp-input",type:"time",value:G,onChange:a=>Z(a.target.value)})):null,n==="hepan"?oe("对方性别",r("select",{className:"mp-input",value:X,onChange:a=>B(a.target.value)},r("option",{value:"female"},"女"),r("option",{value:"male"},"男"))):null,n==="hepan"?oe("合盘方式",r("div",{className:"mp-seg"},r("button",{className:Le==="bazi"?"on":"",onClick:()=>ma("bazi")},"八字"),r("button",{className:Le==="ziwei"?"on":"",onClick:()=>ma("ziwei")},"紫微"))):null,n==="hepan"?oe("对方出生地（可空）",r("input",{className:"mp-input",placeholder:"如 四川成都",value:te,onChange:a=>qe(a.target.value)})):null,n==="hepan"?r("label",{className:"mp-field mp-checks"},r("input",{type:"checkbox",checked:Ke,onChange:a=>bt(a.target.checked)}),r("span",{className:"mp-lbl"},"三方合盘（加入第三人）")):null,n==="hepan"&&Ke?oe("第三方出生日期",r(Ot,{value:qa,onChange:Va,onInvalid:()=>$e("第三方出生日期请按「年-月-日」填写，例如 1990-01-01。")})):null,n==="hepan"&&Ke?oe("第三方出生时刻",r("input",{className:"mp-input",type:"time",value:Na,onChange:a=>ua(a.target.value)})):null,n==="hepan"&&Ke?oe("第三方性别",r("select",{className:"mp-input",value:ga,onChange:a=>Ma(a.target.value)},r("option",{value:"female"},"女"),r("option",{value:"male"},"男"))):null,n==="hepan"&&Ke?oe("第三方出生地（可空）",r("input",{className:"mp-input",placeholder:"如 广东广州",value:Ca,onChange:a=>ht(a.target.value)})):null,n==="qimen"?r("fieldset",{key:"qmr",className:"mp-qmrule"},r("legend",{className:"mp-lbl"},"换局规则"),r("div",{className:"mp-qmopts",role:"radiogroup","aria-label":"奇门换局规则"},[["chaibu","拆补"],["chaoshen","超神接气"],["zhirun","置闰"]].map(([a,u])=>r("label",{key:a,className:"mp-qmopt"},r("input",{type:"radio",name:"qimen_rule",value:a,checked:oa===a,onChange:()=>fa(a)}),r("span",null,u)))),r("div",{className:"mp-field"},r("span",{className:"mp-lbl"},"晚子时"),r("select",{className:"mp-input",value:Ta,onChange:a=>Wa(a.target.value)},r("option",{value:"same-day"},"23:00 后归当日"),r("option",{value:"next-day"},"23:00 后归次日"))),r("details",{className:"mp-qmhelp"},r("summary",null,"三种规则有什么区别？"),r("p",null,"决定符头与节气如何对齐、是否插入闰局；同一个时刻在不同规则下可能得到不同局数。默认「拆补」与工具层一致。"))):null,Ve(n)||n==="qimen"?oe(n==="qimen"?"询问方向（定用神）":"询问方向",r("select",{className:"mp-input",value:Be,onChange:a=>{Si(a.target.value),Di(a.target.value)}},(K.DIRECTIONS||[]).map(a=>r("option",{key:a.key,value:a.key},a.label)))):null,n==="tarot"?oe("牌阵",r("select",{className:"mp-input",value:Zt,onChange:a=>ji(a.target.value)},r("option",{value:"one"},"1 张 · 单张指引"),r("option",{value:"three"},"3 张 · 过去现在未来"),r("option",{value:"five"},"5 张 · 五张局势"),r("option",{value:"celtic"},"10 张 · 凯尔特十字"),r("option",{value:"either"},"5 张 · 二选一"),r("option",{value:"relation"},"7 张 · 关系阵"),r("option",{value:"timeflow"},"3 张 · 时间流"))):null,n==="liuyao"?oe("六爻（可空）",r("input",{className:"mp-input",placeholder:"空则随机，如 9 7 8 8 7 6",value:N,onChange:a=>I(a.target.value)})):null,n==="meihua"?oe("起卦方式",r("div",{className:"mp-seg"},r("button",{className:ya==="time"?"on":"",onClick:()=>Hi("time")},"时间"),r("button",{className:ya==="number"?"on":"",onClick:()=>Hi("number")},"数字"))):null,n==="meihua"&&ya==="number"?oe("第一个数",r("input",{className:"mp-input",value:St,placeholder:"如 17",onChange:a=>Ci(a.target.value)})):null,n==="meihua"&&ya==="number"?oe("第二个数",r("input",{className:"mp-input",value:qt,placeholder:"如 29",onChange:a=>Ai(a.target.value)})):null,n==="meihua"&&ya==="number"?oe("动爻（可空）",r("input",{className:"mp-input",value:Nt,placeholder:"1-6",onChange:a=>Li(a.target.value)})):null,n==="zeri"?oe("所办事项",r("select",{className:"mp-input",value:Ha,onChange:a=>it(a.target.value)},[["常用",["嫁娶","搬家入宅","出行","开业","签订合同","祭祀"]],["婚嫁",["嫁娶","订婚","领证","提亲","收送聘金","满月酒"]],["生活",["搬家","入宅","旅行","访亲友","入学","求医","祭祀"]],["建造",["动土","装修","装修建造","安葬","试车买车"]],["工商",["开业","交易","投资","签订合同","签约","纳财","赴任"]]].map(([a,u])=>r("optgroup",{key:a,label:a},u.map(k=>r("option",{key:`${a}-${k}`,value:k},k)))))):null,n==="convert"?oe("转换方向",r("div",{className:"mp-seg"},r("button",{className:He==="solar2lunar"?"on":"",onClick:()=>ea("solar2lunar")},"公历 → 农历"),r("button",{className:He==="lunar2solar"?"on":"",onClick:()=>ea("lunar2solar")},"农历 → 公历"))):null,n==="convert"&&He==="lunar2solar"?oe("农历日期",r("input",{className:"mp-input",value:xa,placeholder:"如 2026-9-17",onChange:a=>vt(a.target.value)})):null,n==="convert"&&He==="lunar2solar"?r("label",{className:"mp-check"},r("input",{type:"checkbox",checked:Fa,onChange:a=>yt(a.target.checked)})," 闰月"):null,n==="zeri"?oe("看多少天",r("input",{className:"mp-input",type:"number",min:1,max:60,value:la,onChange:a=>Pa(a.target.value)})):null,n==="zeri"?oe("候选日（可空，只比这几天）",r("input",{className:"mp-input",placeholder:"如 2026-12-01, 2026-12-08, 2026-12-15",value:ha,onChange:a=>Qe(a.target.value)})):null,n==="zeri"?oe("当事人属相（可空）",r("select",{className:"mp-input",value:Xe,onChange:a=>nt(a.target.value)},r("option",{value:""},"不排除"),["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"].map(a=>r("option",{key:a,value:a},a)))):null,n==="xiaoliuren"?oe("起课方式",r("div",{className:"mp-seg"},r("button",{className:Re==="time"?"on":"",onClick:()=>st("time")},"时间"),r("button",{className:Re==="number"?"on":"",onClick:()=>st("number")},"报数"))):null,n==="xiaoliuren"&&Re==="number"?oe("第一个数",r("input",{className:"mp-input",type:"number",min:1,max:99,value:Da,onChange:a=>wt(a.target.value)})):null,n==="xiaoliuren"&&Re==="number"?oe("第二个数",r("input",{className:"mp-input",type:"number",min:1,max:99,value:Ra,onChange:a=>Ia(a.target.value)})):null,n==="xiaoliuren"&&Re==="number"?oe("第三个数",r("input",{className:"mp-input",type:"number",min:1,max:99,value:va,onChange:a=>$t(a.target.value)})):null,n==="mbti"?r("div",{className:"mp-quiz-wrap"},r("div",{className:"mp-lbl"},"十六型人格问卷 · 4 题一页，按 1（完全不像）到 5（很像我）打分"),r(bn,{answers:Ba,page:Ga,onPick:(a,u)=>Pe(k=>{const M=k.slice();return M[a]=u,M}),onPage:a=>Ua(u=>Math.max(0,Math.min(u+a,Math.max(0,Math.ceil(ft().total/mt)-1)))),onSubmit:Xt,onClear:()=>{Pe(new Array(ft().total).fill(null)),Ua(0),ie(null)}})):null,n==="constitution"?r("div",{className:"mp-quiz-wrap"},r("div",{className:"mp-lbl"},"中医体质问卷 · 9 种体质各 5 题，共 45 题 · 5 题一页，按 1（没有）到 5（总是）打分"),r(hn,{paper:aa,answers:Za,page:Ut,onPick:(a,u)=>zt(k=>{const M=k.slice();return M[a]=u,M}),onPage:a=>e(u=>Math.max(0,Math.min(u+a,Math.max(0,Math.ceil((aa&&aa.questions?aa.questions.length:Ht)/ut)-1)))),onSubmit:Xt,onClear:()=>{zt(new Array(Ht).fill(null)),e(0),ie(null)}})):null,n==="trend"?oe("算到几岁",r("input",{className:"mp-input",type:"number",min:10,max:100,value:i,onChange:a=>p(a.target.value)})):null,n==="fengshui"?oe("看什么",r("div",{className:"mp-seg"},r("button",{className:l==="natal"?"on":"",onClick:()=>o("natal")},"命卦"),r("button",{className:l==="advise"?"on":"",onClick:()=>o("advise")},"门主灶"),r("button",{className:l==="xuankong"?"on":"",onClick:()=>o("xuankong")},"玄空"))):null,n==="fengshui"&&l!=="natal"?oe("坐山（24 山）",r("input",{className:"mp-input",value:g,placeholder:"如 子 / 乾",onChange:a=>m(a.target.value)})):null,n==="fengshui"&&l!=="natal"?oe("朝向（24 山）",r("input",{className:"mp-input",value:b,placeholder:"如 午 / 巽",onChange:a=>x(a.target.value)})):null,n==="fengshui"&&l==="xuankong"?oe("运（1–9）",r("input",{className:"mp-input",type:"number",min:1,max:9,value:d,onChange:a=>c(a.target.value)})):null,n==="name"?oe("看什么",r("div",{className:"mp-seg"},r("button",{className:w==="assess"?"on":"",onClick:()=>$("assess")},"评名字"),r("button",{className:w==="generate"?"on":"",onClick:()=>$("generate")},"生成候选"))):null,n==="name"?oe("姓",r("input",{className:"mp-input",value:C,placeholder:"如 李",onChange:a=>A(a.target.value)})):null,n==="name"&&w==="assess"?oe("名字",r("input",{className:"mp-input",value:_,placeholder:"如 沐宸",onChange:a=>Q(a.target.value)})):null,n==="name"&&w==="generate"?oe("候选个数",r("input",{className:"mp-input",type:"number",min:1,max:20,value:F,onChange:a=>L(a.target.value)})):null),ot?r("div",{className:"mp-checks"},r("label",{title:"按出生地经度把钟表时间换算成真太阳时"},r("input",{type:"checkbox",checked:Je,onChange:a=>Aa(a.target.checked)}),"真太阳时"),r("label",{title:"23:00–23:59 出生时：勾选=按次日日柱起时柱；不勾=仍用当日日柱"},r("input",{type:"checkbox",checked:pa,onChange:a=>La(a.target.checked)}),"晚子时换日"),r("label",{title:"开启后会请求 OpenStreetMap，把区县/村落到更精确的坐标"},r("input",{type:"checkbox",checked:O,onChange:a=>le(a.target.checked)}),"联网精确到区县")):null,Ve(n)?r("div",{className:"mp-askblock"},r("span",{className:"mp-lbl"},"所问之事（必填）"),r("textarea",{className:"mp-textarea"+(En?" invalid":""),rows:2,value:ca,placeholder:"用一句话描述所问之事，例如：今年是否适合换工作？",onChange:a=>{Yt(a.target.value),jt(!1)},onBlur:a=>Di(void 0,a.target.value)})):null,n==="mbti"||n==="constitution"?null:r("div",{key:"actions",className:"mp-actions"},r("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginRight:8},onClick:Bn,title:"用固定示例盘看完整报告（不改动你已填的数据）"},"看示例"),r("button",{className:"mp-btn",onClick:Xt,title:"时间仍为自动时，点它会取当下再起卦"},n==="tarot"?"抽牌":n==="bazi"||n==="ziwei"?"排盘":n==="hepan"?"合盘":n==="qimen"?"起局":Pt.indexOf(n)>=0?"看结果":"起卦"))),r("div",{key:"hint",className:"mp-hint"},On.hint),ne.length||Ie.length?r("div",{key:"hist",className:"mp-hist"},r("div",{className:"mp-hist-h"},r("span",null,ne.length?"最近排过":"卦例库"),r("span",{className:"mp-hist-acts"},ne.length?r("button",{className:"mp-hist-clear",onClick:ls},"清空"):null,r("button",{className:"mp-hist-clear mp-hist-more",onClick:ms},Ie.length?`卦例库 ${Ie.length}`:"卦例库"))),r("div",{className:"mp-hist-list"},ne.map((a,u)=>r("button",{key:u,className:"mp-hist-item",title:`${String(a.date||"")} ${a.hourUnknown?"时辰未知":String(a.time||"")}`,onClick:()=>Ui(a)},r("b",null,(Ze.find(k=>k.k===a.kind)||{}).label||a.kind),r("span",null,a.label||"—"),r("i",null,`${String(a.date||"").slice(5)} ${a.hourUnknown?"时辰未知":String(a.time||"")}`))))):null,Ge==="cast"&&Ti?r("div",{key:"auto",className:"mp-auto"},Jt.cast?`起卦时刻用的是你手动填的（${W}）；想跟随当下，把时间改回或清空即可。`:`起卦时刻已自动取本机时间（${W}），每次点起卦都会重新取当下；想固定时刻就在上面改。`):null,we?r("div",{key:"err",className:"mp-err",role:"alert"},we):null,da?r("div",{key:"ntc",className:"mp-note",role:"status"},da):null,An?r("div",{key:"load",className:"mp-note",role:"status"},"正在加载本页需要的引擎…"):null,!f&&!we?r("div",{key:"empty",className:"mp-empty"},r("b",null,n==="ziwei"||n==="bazi"?"填好出生信息，点「排盘」":n==="tarot"?"写下想问的事，点「抽牌」":n==="mbti"?"按 1–5 给题目打分，答满 12 题就能看结果":n==="constitution"?"按 1–5 给题目打分，答满 27 题就能看结果":Pt.indexOf(n)>=0?"填好参数，点「看结果」":"写下所问之事，点「起卦」"),n==="ziwei"||n==="bazi"?"出生日期、时刻与性别即可；出生地只影响真太阳时。":n==="mbti"?"4 题一页，答案只在本地参与计算，不会上传。":n==="constitution"?"5 题一页，答案只在本地参与计算，不会上传；这是自评问卷，不是医学诊断。":Pt.indexOf(n)>=0?"按上面的选项填好参数即可；全部在本机计算，不上传。":"起卦时刻已自动取当下，也可以手动改。"):null,f?r("div",{key:"card",className:"mp-card mp-flat",role:"region","aria-label":"排盘结果","aria-live":"polite",onClick:Qn,dangerouslySetInnerHTML:{__html:jn(f)+es(f)+D.resultWithInterpret("",f.it,{folded:Un()})+D.perfHTML(q)+D.revisionHTML(f.r.revision)+D.handleHTML(f.r.handle)+D.shadowHTML(f.r.shadow,f.shadowDiff)+D.traceHTML(f.r.trace,f.r.system,f.r.traceText)+D.caliberHTML(f.caliber)}}):null,f?r("div",{key:"bar",className:"mp-bar"},r("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px"},onClick:as},_n||"复制文字结果"),r("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:ss,title:"导出盘面 + 解析（含一页读懂、三张表）为 Markdown"},"导出 .md"),r("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:os,title:"生成 PNG 摘要卡（一页读懂 + 首张表），适合直接分享"},"存为摘要长图"),r("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:gs,title:"把这张盘的参数存进卦例库，日后可回填重排、标应验"},cs?"已存入卦例库":"存入卦例库")):null,f?r("div",{key:"ask",className:"mp-askbox",style:{flexWrap:"wrap"}},r("input",{className:"mp-input",value:ra,maxLength:120,placeholder:"追问：如 2027 年事业怎么样（回车提交）",onChange:a=>Gt(a.target.value),onKeyDown:a=>{a.key==="Enter"&&Ri()}}),r("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px"},onClick:Ri},"追问"),r("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:Ii,title:"把这张盘的摘要和你的问题一起发进 DSH 对话窗，由对话里的模型接着答"},"问进对话"),ae.ref?null:r("div",{key:"bridgediag",className:"mp-note",style:{marginTop:6,fontSize:11,flexBasis:"100%"}},xi()),Ea?r("div",{key:"chatnote",className:"mp-note",style:{marginTop:6,fontSize:12,flexBasis:"100%"}},Ea):null):null,f?r("div",{key:"bridge",className:"mp-bridge"},r("span",{className:"mp-bridge-lbl"},ae.ref?"桥可用；也可以：":"桥未就绪，改走这几档："),Pi.map(([a,u,k])=>r("button",{key:a,type:"button",className:"mp-chip","data-bridge-copy":a,title:k,onClick:M=>Vn(a,M.currentTarget)},u))):null,_a?r("div",{key:"fx",className:"mp-fx",dangerouslySetInnerHTML:{__html:D.followupHTML(_a)}}):null,f&&f.kind==="bazi"&&f.r.past?r("div",{key:"verify",className:"mp-verify"},r("div",{className:"mp-verify-h"},"验前事 · 过去几年的信号（只读，不改盘）"),f.r.past.rows.map(a=>r("div",{key:a.year,className:"mp-verify-row"},r("span",{className:"mp-verify-txt"},`${a.year} ${a.ganzhi} · ${a.theme}`),r("span",{className:"mp-verify-btns"},["yes","no","unsure"].map(u=>r("button",{key:u,className:"mp-chip"+(at[a.year]===u?" on":""),onClick:()=>Oa(Object.assign({},at,{[a.year]:u}))},u==="yes"?"准":u==="no"?"不准":"不确定"))))),r("div",{className:"mp-verify-foot"},r("button",{className:"mp-btn ghost",style:Gi,onClick:ps},"算贴合度"),ba?r("span",{className:"mp-verify-fit"},`命中 ${ba.yes}/${ba.answered}（${ba.level}）：${ba.advice}`):null)):null,f&&f.kind==="bazi"?r("div",{key:"rect",className:"mp-rect"},r("div",{className:"mp-verify-h"},"生时校正 · 用过去的事反推时辰"),We.map((a,u)=>r("div",{key:u,className:"mp-rect-row"},r("input",{className:"mp-input",type:"number",min:1900,max:2100,value:a.year,onChange:k=>xt(We.map((M,h)=>h===u?Object.assign({},M,{year:k.target.value}):M))}),r("select",{className:"mp-input",value:a.kind,onChange:k=>xt(We.map((M,h)=>h===u?Object.assign({},M,{kind:k.target.value}):M))},[["career","事业变动"],["wealth","财运"],["love","感情"],["move","搬迁/出行"],["health","健康"],["other","其他"]].map(([k,M])=>r("option",{key:k,value:k},M))))),r("button",{className:"mp-btn ghost",style:Gi,onClick:rs},"计算候选时辰"),De?De.error?r("div",{className:"mp-rect-err"},De.error):r("div",{className:"mp-rect-out"},r("div",{className:"mp-verify-fit"},De.note),De.candidates.slice(0,6).map(a=>r("div",{key:a.hour,className:"mp-rect-cand"+(a===De.best?" best":"")},`${a.label} · 时柱 ${a.hourGanzhi} · 日柱 ${a.dayGanzhi} · 命中 ${a.hits}/${a.total}`))):null):null,!f&&!we?r("div",{key:"ph",className:"mp-dim",style:{marginTop:24,fontSize:12}},"选择体系后点「排盘」。所有计算在本机完成，不上传任何数据。"):null,r("div",{key:"fb",className:"mp-fb"},r("div",{className:"mp-fb-h"},r("span",{className:"mp-fb-t"},"用得不对、读不懂、或算得跟别家不一样？"),r("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"4px 10px"},onClick:Bi,title:"生成一份含输入、版本、环境与结果摘要的报告，粘贴到 issue / 邮件 / 群聊即可"},V||"复制反馈报告"),r("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"4px 10px",marginLeft:6},onClick:()=>ns(),title:"在浏览器打开 GitHub issue（报告已复制到剪贴板，粘进去即可）"},"开 issue")),r("div",{className:"mp-fb-b"},"邮件 1129440028@qq.com　·　GitHub issues　·　微信群 dsh-metaphysics",Te?r("span",{className:"mp-fb-note"},"　"+Te):null)),ds?r("div",{key:"cases",className:"mp-cases-layer",role:"dialog","aria-modal":"true","aria-label":"卦例库",onClick:a=>{a.target===a.currentTarget&&Wt()}},r("div",{className:"mp-cases-box"},r("div",{className:"mp-cases-h"},r("b",null,`卦例库 · ${Qt.length}/${Ie.length}`),r("button",{className:"mp-cases-x",onClick:Wt,"aria-label":"关闭"},"✕")),r("div",{className:"mp-cases-tabs"},[["all","全部"]].concat(D.CASE_STATUS.map(a=>[a,D.caseStatusLabel(a)])).map(a=>r("button",{key:a[0],className:"mp-chip"+(Vt===a[0]?" on":""),onClick:()=>Yi(a[0])},`${a[1]} ${us(a[0])}`))),r("div",{className:"mp-cases-list"},Qt.length?Qt.map(a=>fs(a)):r("div",{className:"mp-empty"},"这一栏还空着。看结果时点「存入卦例库」，想要的盘才会记进来；过些天回来标应验。")),r("div",{className:"mp-cases-f"},r("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"4px 10px"},onClick:()=>Ji(!1)},"导出 JSONL"),r("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"4px 10px",marginLeft:6},onClick:()=>Ji(!0),title:"去掉出生年份（只留月日）、时刻整点化、去掉出生地——发给群里也不露个人信息"},"导出脱敏版"),r("span",{className:"mp-cases-tip"},"只存参数与一句摘要，不存盘面；点条目回填重排。")))):null];return r("div",{className:"mp-wrap"},$s)}function Nn(n){try{if(typeof styles<"u"&&styles&&typeof styles.insert=="function")return styles.insert(n)}catch(s){console.error("[metaphysics] styles.insert 不可用，改用 DOM 注入",s)}try{const s=document.createElement("style");return s.setAttribute("data-plugin","@local/metaphysics"),s.textContent=n,document.head.appendChild(s),()=>s.remove()}catch(s){return console.error("[metaphysics] DOM 注入样式也失败",s),()=>{}}}let zi=!1;function It(){try{const n=document.documentElement;if(!n||!document.body)return;const s=document.createElement("span");s.setAttribute("aria-hidden","true"),s.style.cssText="position:absolute;left:-9999px;top:0;width:0;height:0;pointer-events:none;background:var(--dsw-alias-brand-primary)",document.body.appendChild(s);const z=getComputedStyle(s).backgroundColor;s.remove();const P=Fe&&typeof Fe.pickOnColor=="function"?Fe.pickOnColor(z):"";P&&n.style&&n.style.getPropertyValue("--mp-on-brand")!==P&&n.style.setProperty("--mp-on-brand",P)}catch{}}function Mn(){if(!zi){zi=!0,It();try{const n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)");n&&typeof n.addEventListener=="function"&&n.addEventListener("change",It)}catch{}try{typeof MutationObserver=="function"&&document.documentElement&&new MutationObserver(It).observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]})}catch{}}}function Cn(n){try{const R=Nn(mn+(D&&D.CSS?D.CSS:""));typeof n.effect=="function"&&typeof R=="function"&&n.effect(()=>R)}catch(R){console.error("[metaphysics] 样式注入失败",R)}try{Mn()}catch(R){console.error("[metaphysics] 字色同步失败",R)}let s=null;try{s=n&&n.slots||(n&&typeof n.get=="function"?n.get("slots"):null)}catch(R){console.error("[metaphysics] 取 slots 服务失败",R)}if(!s||typeof s.register!="function"){console.error("[metaphysics] slots 服务不可用，面板未注册");return}try{ae.injectType=typeof s.inject;const R=typeof s.spec=="function"?s.spec("conversation.input.right"):null;ae.spec=R?R.kind+"/"+R.scope:"未声明"}catch(R){ae.spec="取声明失败",vi(R)}const z=R=>{if(typeof R=="function")return R;if(R&&typeof R=="object"){for(const he of["dispose","off","cancel","unregister"])if(typeof R[he]=="function")return()=>{try{R[he]()}catch{}}}return()=>{}},P=(R,he)=>{try{const ve=s.register(R,he);return ae.regs+=1,ae.seatOk[R.name]=!0,z(ve)}catch(ve){return vi(ve),()=>{}}},W=(R,he)=>{const ve=()=>{const G=he();return ae.contribution=(ae.contribution?ae.contribution+",":"")+(R+(typeof G=="function"?" 已挂上":" 未挂上")),G};try{typeof s.inject=="function"?s.inject(R,ve):ve()}catch(G){console.error("[metaphysics] 等待槽位失败："+R,G);try{ve()}catch(Z){console.error("[metaphysics] 直接注册也失败："+R,Z)}}};W("sidebar.panellist",()=>P({name:"sidebar.panellist",id:"metaphysics",order:20,label:()=>"烛微命盘 v"+(window.__MP_VER||"")},vn)),W("main",()=>P({name:"main",key:"metaphysics"},R=>r(xn,null,r(qn,R))));const pe=(R,he)=>{const ve=()=>{try{const Z=s.inject(R,he);return ae.contribution=(ae.contribution?ae.contribution+",":"")+(R.replace("conversation.","")+(typeof Z=="function"?" 已挂上":" 未挂上")),Z}catch(Z){console.error("[metaphysics] 槽位注册失败："+R,Z);try{return he()}catch(X){console.error("[metaphysics] 直接注册也失败："+R,X);return}}};let G;try{typeof n.effect=="function"?G=n.effect(ve,"metaphysics: "+R):G=ve()}catch(Z){console.error("[metaphysics] effect 包裹失败："+R,Z),G=ve()}typeof G=="function"&&ae.seatDisposers.push(G)};pe("conversation.input.right",()=>P({name:"conversation.input.right",id:"metaphysics-ask",order:40},wi)),pe("conversation.composer.dock",()=>P({name:"conversation.composer.dock",id:"metaphysics-dock",order:60},$i));let me=!1;const re=()=>{ae.ref||me||(me=!0,ae.seatOk["conversation.input.right"]||P({name:"conversation.input.right",id:"metaphysics-ask",order:40},wi),ae.seatOk["conversation.composer.dock"]||P({name:"conversation.composer.dock",id:"metaphysics-dock",order:60},$i))};let xe=20;const t=()=>!!(ae.seatOk["conversation.input.right"]&&ae.seatOk["conversation.composer.dock"]),ke=()=>{ae.ref||xe<=0||t()||(xe-=1,re(),!t()&&setTimeout(ke,700))};try{setTimeout(ke,700)}catch{}try{document.addEventListener("pointerdown",()=>{me=!1,re()},{once:!0,capture:!0})}catch{}}return{inject:["slots"],apply(n){try{Cn(n)}catch(s){console.error("[metaphysics] apply 异常",s)}}}}});
