window.__ModuleLoader__.load({id:"dsh-metaphysics",version:"0.82.0",factory(xt){const it=(function(){try{return xt("react")}catch{return globalThis.React}})();if(!it)return{inject:[],apply(){}};const p=it.createElement,$i={bazi:"client.chart.js",ziwei:"client.chart.js",hepan:"client.chart.js",trend:"client.chart.js",name:"client.name.js",fengshui:"client.fengshui.js",liuyao:"client.liuyao.js",meihua:"client.liuyao.js",qimen:"client.qimen.js",daliuren:"client.daliuren.js",tarot:"client.tarot.js",almanac:"client.almanac.js",convert:"client.convert.js",zeri:"client.zeri.js",chenggu:"client.chenggu.js",xiaoliuren:"client.xiaoliuren.js",star:"client.star.js",numerology:"client.numerology.js",mbti:"client.mbti.js",constitution:"client.constitution.js",wuyunliuqi:"client.wuyunliuqi.js",taiyi:"client.taiyi.js"},ki=[{key:"general",label:"综合",dim:null,focus:""},{key:"wealth",label:"财运",dim:"work",focus:"钱财进出的落点主要看「工作与职业选择」与「事业发展」这两条。"},{key:"career",label:"事业",dim:"career",focus:"事业发展这条与你的问题最直接。"},{key:"love",label:"感情",dim:"love",focus:"感情这条与你的问题最直接。"},{key:"health",label:"健康",dim:"health",focus:"健康这条与你的问题最直接；下面只作提醒，不作任何诊断。"},{key:"study",label:"学业",dim:"career",focus:"学业与考试更贴近「事业发展」这条，讲的是长期积累与阶段进展。"},{key:"travel",label:"出行",dim:"overall",focus:"出行与迁动更贴近「整体运势」这条，看的是当下这一段的大环境。"}];window.__MP_VER="0.82.0",window.__MPGroups=[{title:"问一件事",hint:"心里有一件具体的事，起一卦再决定",items:[{k:"liuyao",label:"六爻",tip:"问一件具体事，最接地气"},{k:"tarot",label:"塔罗",tip:"抽牌看选择"},{k:"meihua",label:"梅花",tip:"见闻起卦"},{k:"xiaoliuren",label:"小六壬",tip:"掐指一算"}]},{title:"看一个人",hint:"看自己或身边人的性情与格局",items:[{k:"bazi",label:"八字",tip:"看这人一辈子的大盘"},{k:"ziwei",label:"紫微",tip:"分宫细看哪方面顺哪方面堵"},{k:"hepan",label:"合盘",tip:"两人合不合"},{k:"mbti",label:"人格",tip:"16 型问卷"},{k:"constitution",label:"体质",tip:"九种体质"},{k:"trend",label:"人生K",tip:"一生走势",wide:!0}]},{title:"查日子",hint:"挑时间、换农历，看一年的气与方位",items:[{k:"almanac",label:"黄历",tip:"今日宜忌"},{k:"zeri",label:"择日",tip:"挑好日子"},{k:"convert",label:"农历",tip:"公历农历"},{k:"wuyunliuqi",label:"运气",tip:"一年大势"},{k:"fengshui",label:"风水",tip:"房屋朝向"},{k:"name",label:"起名",tip:"八字选字"}]},{title:"古籍考据",hint:"古法三式与整年气运：偏研究向，日常咨询少用",items:[{k:"qimen",label:"奇门",tip:"看方位时机"},{k:"daliuren",label:"六壬",tip:"占事断来意"},{k:"taiyi",label:"太乙",tip:"积年推局"}]}],window.__MP_UNRELEASED=13;const V={};V.DIRECTIONS=ki,V.compute=()=>{throw new Error("命理引擎尚未加载")};const zi=Object.create(null),Xt=Object.create(null);function Sn(s){return $i[s]||$i.bazi||"client.chart.js"}const ji=()=>typeof performance<"u"&&performance.now?performance.now():Date.now();async function Nn(s){const n=Sn(s);let k=zi[n];const _=!!k,W=ji();if(!k){if(!xt||typeof xt.async!="function")throw new Error("当前宿主不支持客户端分块加载（require.async 缺失），请升级 DeepSeek Harness");let se=Xt[n];se||(se=xt.async(`./${n}`).then(fe=>{const ue=fe&&(fe.Engine||fe.default);if(!ue||typeof ue.compute!="function")throw new Error(`命理引擎分块 ${n} 未返回 Engine`);return zi[n]=ue,ue}),Xt[n]=se,se.catch(()=>{}).then(()=>{delete Xt[n]})),k=await se}for(const se of Object.keys(k))k[se]!==void 0&&(V[se]=k[se]);return Array.isArray(V.DIRECTIONS)||(V.DIRECTIONS=ki),window.Engine=V,window.__MP_ENGINE_READY__=!0,window.__MP_LAST_LOAD={tab:s,chunk:n,cached:_,ms:Math.round((ji()-W)*10)/10},V}window.__mpEnsureEngine=Nn,window.Engine=V,(function(){const s={liuyao:!0,meihua:!0,daliuren:!0,tarot:!0},n=D=>!!s[D],k={general:"other",wealth:"business",career:"career",love:"love",health:"other",study:"career",travel:"action"},_=D=>k[D]||"other",W="#ffffff",se="#1c1a15";function fe(D){const I=String(D??"").match(/rgba?\(([^)]+)\)/i);if(!I)return null;const Z=I[1].split(/[,\s/]+/).filter(Boolean).map(Number);return Z.length<3||Z.slice(0,3).some(K=>!Number.isFinite(K))||Z.length>3&&Number.isFinite(Z[3])&&Z[3]<.95?null:[Z[0],Z[1],Z[2]]}function ue(D){const I=String(D||"").replace("#",""),Z=I.length===3?I.split("").map(K=>K+K).join(""):I;return/^[0-9a-f]{6}$/i.test(Z)?[0,2,4].map(K=>parseInt(Z.slice(K,K+2),16)):null}function ye(D){const I=Z=>{const K=Z/255;return K<=.03928?K/12.92:Math.pow((K+.055)/1.055,2.4)};return .2126*I(D[0])+.7152*I(D[1])+.0722*I(D[2])}function t(D,I){const Z=ye(D),K=ye(I),oe=Math.max(Z,K),Me=Math.min(Z,K);return(oe+.05)/(Me+.05)}function Ne(D){const I=typeof D=="string"?fe(D):D;return I?t(I,ue(W))>=t(I,ue(se))?W:se:""}function B(D){const I=String(D??"").trim();if(!I)return{lines:null,warning:""};const Z=I.split(/[^0-9]+/).filter(Boolean).map(Number),K=Z.filter(oe=>![6,7,8,9].includes(oe));return Z.length===6&&K.length===0?{lines:Z,warning:""}:{lines:null,warning:Z.length!==6?`爻值需要正好 6 个数字（当前 ${Z.length} 个），本次按随机摇卦。`:`爻值只能是 6/7/8/9（收到 ${K.join("/")}），本次按随机摇卦。`}}function we(D){const I=String(D??"").trim();if(!I)return null;const Z=Number(I);return Number.isFinite(Z)?Z:null}function te(D){const I=D instanceof Date?D:new Date,Z=K=>String(K).padStart(2,"0");return`${I.getFullYear()}-${Z(I.getMonth()+1)}-${Z(I.getDate())}`}window.__MPCore={NEED_ASK:s,needAsk:n,parseLines:B,toNumber:we,parseRGB:fe,hexToRGB:ue,luminance:ye,contrastRatio:t,pickOnColor:Ne,ON_DARK:W,ON_LIGHT:se,kindOfDirection:_,todayStamp:te}})(),(function(){const s=`
.pp,.mp-it,.mp-al,.mp-cg,.mp-cl,.mp-cli,.mp-kline,.mp-mb,.mp-mb-paper,.mp-nm,.mp-quick,.mp-cdiff,.mp-shadow,.mp-trace-card,.mp-trace-layer,.mp-prof{--ink:#1b1b1b;--ink2:#3f3a33;--muted:#6f6a60;--label:#8a8378;--faint:#a9a296;
  --line:#c8c1b2;--dimline:#b9b2a4;--hair:#e9e2d3;
  /* 底色略沉作「桌面」，--card 跳到近白：原先 bg 与 card 只差 1/255，卡片感等于零。
     同一色相里塞 9 个几乎相等的浅色，谁都浮不起来。 */
  /* 水墨风：宣纸白为底、淡墨分层；米黄系整体降饱和，纸感靠 --band 的微暖留一点 */
  --bg:#f4f2ec;--card:#fdfdfb;--band:#f7f5ef;--hover:#eeece5;--hover2:#e6e4dc;
  --tri:#eef0ea;--soul:#f7ece9;--sel:#f5efe9;--link:#f0efe9;
  --red:#a02c26;--red-rgb:160,44,38;--env-good:var(--env-good);--env-warn:var(--env-warn);--env-alt:var(--env-alt);--lu:#3d5a52;--lu-rgb:61,90,82;
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
    /* 称骨分档徽章五档色（0.77.0 嵌入段显眼化）：亮色渐变两端 */
    --cg-top-a:#c9a227;--cg-top-b:#e6b84c;--cg-good-a:#2e7d5b;--cg-good-b:#4caf87;--cg-mid-a:#5b6b9d;--cg-mid-b:#7d8fc4;--cg-weak-a:#a1702d;--cg-weak-b:#c9924f;--cg-low-a:#8a4a4a;--cg-low-b:#b06a6a;
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
    --red:#e08a7a;--red-rgb:224,138,122;--env-good:#6dc79a;--env-warn:#e0a860;--env-alt:#9aa2ea;--lu:#8fb8a8;--lu-rgb:143,184,168;
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
/* 盘面字号四级（P1-15）：主星 > 辅曜 > 杂曜神煞 > 年龄长生，一处改全盘生效。
   竖屏段另有一套值覆盖，见「竖屏」块的 .pp-grid。 */
.pp-grid{--zw-l1:13px;--zw-l2:11.5px;--zw-l3:10.5px;--zw-l4:9.5px;--zw-l5:12px}
.pp-stars{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:0 6px;font-size:var(--zw-l2);line-height:1.6;min-height:36px}
.pp-st{white-space:nowrap}
.pp-st.main{font-weight:700;font-size:var(--zw-l1);letter-spacing:.04em;text-shadow:0 0 .5px currentColor}
.pp-st.good{color:var(--lu);font-size:var(--zw-l2);font-weight:500}
.pp-st.bad{color:var(--ji);font-size:var(--zw-l2);font-weight:500}
.pp-st.bad::before{content:"·";font-weight:900;margin-right:1px}
.pp-st.aux{color:var(--muted);font-size:var(--zw-l2)}
.pp-st.minor{color:var(--faint);font-size:var(--zw-l3)}
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
.pp-ages{margin-top:2px;font-size:var(--zw-l4);color:var(--faint);letter-spacing:.02em}
.pp-foot{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;gap:4px;font-size:var(--zw-l4);color:var(--muted)}
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
/* 流月/流日/流时：一层层往外推的三级时间盘。
   P1-18：默认整块不出现，勾哪个时间层出哪个——本命盘不需要月日时三行挡在下面。 */
.pp-flow{margin-top:9px;border:1px solid var(--line);background:var(--card);font-family:system-ui,sans-serif;display:none}
#ppm-t-month:checked~.pp-flow,#ppm-t-day:checked~.pp-flow,#ppm-t-hour:checked~.pp-flow{display:block}
.pp-flow .flow-row[data-t]{display:none}
#ppm-t-month:checked~.pp-flow .flow-row[data-t="month"],
#ppm-t-day:checked~.pp-flow .flow-row[data-t="day"],
#ppm-t-hour:checked~.pp-flow .flow-row[data-t="hour"]{display:grid}
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
/* 盘口口径条（P1-16）：学派名由 radio 驱动，层与年份在渲染时写死 */
.pp-cal{display:flex;align-items:center;gap:5px;font-size:11px;color:var(--muted);padding:2px 2px 4px;line-height:1.5;flex-wrap:wrap}
.pp-cal b{font-weight:600;color:var(--ink2)}
.pp-cal .cal-sep{color:var(--faint)}
.pp-cal .cal-sc::after{content:"四化派"}
#ppm-sc-feixing:checked~.pp-body .pp-cal .cal-sc::after{content:"飞星派"}
#ppm-sc-sanhe:checked~.pp-body .pp-cal .cal-sc::after{content:"三合派"}
/* 切学派时盘面淡入一次：换了视角要有个着落，不然像点了没反应 */
#ppm-sc-feixing:checked~.pp-body .pp-grid,
#ppm-sc-sanhe:checked~.pp-body .pp-grid{animation:ppSchoolIn .3s ease-out}
@keyframes ppSchoolIn{from{opacity:.55}to{opacity:1}}
#ppm-ben:checked~.pp-body.ben,#ppm-da:checked~.pp-body.da,#ppm-ln:checked~.pp-body.ln{display:block}
#ppm-ben:checked~.pp-modes label[for="ppm-ben"],#ppm-da:checked~.pp-modes label[for="ppm-da"],#ppm-ln:checked~.pp-modes label[for="ppm-ln"]{background:var(--red);color:var(--on-accent)}
/* 时间层 chips（P1-18）：勾上才亮，与上面三个互斥视图不是一回事 */
.pp-time{border-top:none}
.pp-time label{min-height:32px;padding:2px 13px;font-size:12px;color:var(--muted)}
#ppm-t-month:checked~.pp-time label[for="ppm-t-month"],
#ppm-t-day:checked~.pp-time label[for="ppm-t-day"],
#ppm-t-hour:checked~.pp-time label[for="ppm-t-hour"]{background:var(--lu);color:var(--on-accent)}
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
.pp-detail .dt-st.minor{color:var(--faint);font-size:11.5px}
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

/* —— 三层披露：结论卡 / 因素卡 —— */
/* L0 独立在报告之外，所以自带一套卡片外观，不依赖 .mp-it 的边框 */
.mp-env-head{padding:15px 17px;border:1px solid var(--line);border-radius:14px;background:var(--card);box-shadow:var(--shadow);color:var(--ink);font-family:"Songti SC","SimSun","Microsoft YaHei",serif}
.mp-env-kicker{font-size:11px;letter-spacing:.18em;color:var(--muted);font-family:system-ui,sans-serif}
.mp-env-hl{margin:7px 0 0;font-size:17px;font-weight:700;line-height:1.6}
.mp-env-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:9px;font-size:12px;font-family:system-ui,sans-serif}
.mp-env-dir{padding:2px 9px;border-radius:999px;border:1px solid currentColor;line-height:1.7}
.mp-env-dir.t-good{color:var(--env-good)}
.mp-env-dir.t-watch{color:var(--env-warn)}
.mp-env-dir.t-alt{color:var(--env-alt)}
.mp-env-dir.t-plain{color:var(--muted)}
.mp-env-conf{color:var(--muted)}
/* 把握的口径：点开才展开，但一定能问到。手机上 title 不显示，所以用 details 而不是 tooltip */
.mp-env-confq{display:inline-block}
.mp-env-confq>summary{cursor:pointer;list-style:none}
.mp-env-confq>summary::-webkit-details-marker{display:none}
.mp-env-confq>summary::after{content:' ?';color:var(--muted);font-size:11px}
.mp-env-confq-body{margin-top:8px;padding:8px 10px;border-left:2px solid var(--line);font-size:12px;line-height:1.8;color:var(--muted);max-width:34em}
.mp-env-deg{color:var(--env-warn)}
.mp-env-cond{margin-top:9px;padding-top:9px;border-top:1px dashed var(--line);font-size:12.5px;line-height:1.7;color:var(--muted)}
.mp-env{margin:0 0 14px}
.mp-env-sec-h{font-size:12px;letter-spacing:.1em;color:var(--muted);font-family:system-ui,sans-serif;margin:0 0 8px}
.mp-env-f-row{display:flex;gap:10px;padding:10px 0;border-top:1px solid var(--line)}
.mp-env-f-row:first-child{border-top:none}
.mp-env-f-no{flex:none;width:20px;height:20px;border-radius:50%;background:var(--band);color:var(--muted);font-size:11px;font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;margin-top:2px}
.mp-env-f-main{flex:1;min-width:0}
.mp-env-f-top{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px}
.mp-env-f-top b{font-size:13.5px}
.mp-env-f-state{font-size:12px;color:var(--muted);font-family:system-ui,sans-serif}
.mp-env-dup{font-size:11px;color:var(--muted);opacity:.8}
.mp-env-f-impact{margin-top:3px;font-size:13px;line-height:1.75}
.mp-env-why{margin-top:5px}
.mp-env-why summary{font-size:11.5px;color:var(--muted);cursor:pointer;font-family:system-ui,sans-serif;list-style:none}
.mp-env-why summary::-webkit-details-marker{display:none}
.mp-env-why summary::before{content:"＋ ";color:var(--red)}
.mp-env-why[open] summary::before{content:"－ "}
.mp-env-why-body{margin-top:6px;padding:8px 10px;background:var(--band);border-radius:8px}
.mp-env-ev{display:flex;gap:9px;align-items:baseline;font-size:12px;line-height:1.7;padding:3px 0}
.mp-env-ev b{flex:none;min-width:44px;color:var(--muted);font-weight:600}
.mp-env-ev span{flex:1;min-width:0;color:var(--ink);word-break:break-word}
.mp-env-tl{margin-top:10px;padding-top:10px;border-top:1px solid var(--line)}
.mp-env-tl-row{display:flex;flex-wrap:wrap;gap:8px;align-items:baseline;font-size:12.5px;padding:3px 0}
.mp-env-tl-w{font-weight:600}
.mp-env-tl-p{padding:1px 7px;border-radius:999px;background:var(--band);color:var(--muted);font-size:11px;font-family:system-ui,sans-serif}
.mp-env-tl-n{color:var(--muted)}
.mp-env-adv{margin-top:10px;padding-top:10px;border-top:1px solid var(--line)}
.mp-env-adv b{font-size:12px;letter-spacing:.08em;color:var(--muted);font-family:system-ui,sans-serif}
.mp-env-adv ol{margin:6px 0 0;padding-left:20px;font-size:13px;line-height:1.8}
.mp-env-risk{margin-top:10px;padding:8px 10px;border-radius:8px;background:var(--band);font-size:12.5px;line-height:1.7}
.mp-env-risk b{margin-right:6px;color:var(--env-warn)}
.mp-env-cf{margin-top:10px}
.mp-env-cf summary{font-size:11.5px;color:var(--muted);cursor:pointer;font-family:system-ui,sans-serif}
.mp-env-cf-body{margin-top:7px}
.mp-env-cf-item{padding:7px 0;border-top:1px dashed var(--line);font-size:12.5px;line-height:1.7}
.mp-env-cf-item b{display:block;margin-bottom:3px}
.mp-env-cf-view{padding:2px 0;color:var(--muted)}
.mp-env-cf-view span{display:inline-block;min-width:96px;color:var(--ink)}
.mp-env-cf-item em{display:block;margin-top:4px;font-style:normal;color:var(--muted);font-size:12px}
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
/* 分隔符也用 --muted，别跟 --dimline：深色下 dimline 压在 band 上只有 2.16:1，
   竖线淡到看不见。dimline 是给坐标轴线/网格/进度条底的，那些本就该淡；
   这根是夹在两段文字之间的字符，得读得出来。两条渲染链共用这份 CSS，一起生效。 */
.mp-it-ask .ask-sep{color:var(--muted);margin:0 7px}
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
/* 方法与出处：方法类段落合成一个折叠区，默认收起。summary 里只报段数与用途，不报字数 */
.mp-it-method{border-top:1px dashed var(--line);padding-top:9px;margin-top:2px}
/* 盘面事实：正文角标 [n] 指到这里。清单本身折叠——它是回查用的，不是正文 */
.mp-it-facts{border-top:1px dashed var(--line);padding-top:9px;margin-top:2px}
.mp-it-facts>summary{cursor:pointer;list-style:none;display:flex;gap:7px;align-items:baseline;flex-wrap:wrap}
.mp-it-facts>summary::-webkit-details-marker{display:none}
.mp-it-facts>summary::after{content:'▾';color:var(--faint);font-size:10px}
.mp-it-facts[open]>summary::after{content:'▴'}
.mp-it-facts .mp-it-sub{margin-top:8px;margin-bottom:0}
.fact-row{display:flex;gap:6px;align-items:baseline;font-size:12px;line-height:1.85;color:var(--muted)}
.fact-row .fact-no{font-style:normal;font-family:system-ui,sans-serif;color:var(--faint);min-width:22px;flex:none}
.fact-row .fact-g{font-style:normal;color:var(--faint);min-width:30px;flex:none}
.fact-row b{color:var(--ink2);font-weight:500;flex:none}
.fact-row span{color:var(--muted);word-break:break-word}
.mp-it-refs{display:inline;margin-left:8px;font-size:11px;color:var(--faint);font-family:system-ui,sans-serif;font-weight:400;white-space:nowrap}
.mp-it-refs a{color:var(--faint);text-decoration:none;border-bottom:1px dotted var(--line);letter-spacing:.02em}
.mp-it-refs a:hover{color:var(--ink2)}
.mp-it-method>summary{cursor:pointer;list-style:none;display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}
.mp-it-method>summary::-webkit-details-marker{display:none}
.mp-it-method>summary::after{content:'展开';font-size:11px;color:var(--muted);font-family:system-ui,sans-serif}
.mp-it-method[open]>summary::after{content:'收起'}
.mp-it-method[open]>summary{margin-bottom:8px}
.mp-it-mnum{font-size:11.5px;color:var(--muted);font-family:system-ui,sans-serif}
.mp-it-sub{margin-bottom:9px;padding-left:8px;border-left:2px solid var(--line)}
.mp-it-sub .mp-it-sh{font-size:12px;color:var(--ink2);font-weight:600}
.mp-it-sub .mp-it-stext{font-size:12px;line-height:1.85;color:var(--muted)}
/* 五维正文只留出处入口，卡片本体在文末折叠区 */
.mp-it-knowref{margin-top:7px;font-size:11.5px;font-family:system-ui,sans-serif}
.mp-it-knowref a{color:var(--muted);text-decoration:none;border-bottom:1px dashed var(--line)}
.know-flag{margin-left:8px;color:var(--quan);font-size:11px}
.know-dim{font-style:normal;color:var(--muted);font-size:11px;margin-right:6px;font-family:system-ui,sans-serif}
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
/* 盘号：用户视图里唯一保留的复盘凭据。完整的影子盘（baseId / 指纹 / 同盘 diff）只在开发者视图出，
   这里只要一行小字，不能抢盘面和结论的视线。 */
.mp-shortid{margin:6px 0 0;font-size:11.5px;line-height:1.6;color:var(--faint);letter-spacing:.02em;font-family:system-ui,sans-serif}
/* 真太阳时修正：勾了开关、填了出生地之后，实际按几点起盘必须能看见——
   时柱是四柱里最容易「差一小时换一个盘」的一柱，修正不透明就等于不可核对。 */
.mp-solar{margin:6px 0 0;font-size:12px;line-height:1.75;color:var(--muted);font-family:system-ui,sans-serif}
.mp-solar b{color:var(--ink2);font-weight:600}
.mp-solar span{color:var(--faint)}
.mp-solar-dst{color:var(--env-warn);font-weight:600;margin-left:4px}
.mp-solar-why{display:inline;margin-left:6px}
.mp-solar-why>summary{cursor:pointer;list-style:none;color:var(--muted);border-bottom:1px dotted var(--line)}
.mp-solar-why>summary::-webkit-details-marker{display:none}
.mp-solar-why>div{margin-top:6px;padding:6px 9px;border-left:2px solid var(--line);font-size:11.5px;line-height:1.8;color:var(--muted)}
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
/* 八字卡内嵌称骨：常开亮色卡，金色系压过周围的灰调盘面 */
.mp-bzcg{margin-top:12px;border:2px solid color-mix(in srgb,var(--gold) 72%,var(--lu));border-radius:10px;padding:12px 14px;background:linear-gradient(135deg,color-mix(in srgb,var(--gold) 13%,var(--card)),var(--card) 58%);box-shadow:0 2px 10px color-mix(in srgb,var(--gold) 30%,transparent)}
.mp-bzcg-h{display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-direction:row}
.mp-bzcg-h b{font-size:14px;color:var(--gold);font-weight:700;letter-spacing:.04em}
.mp-bzcg-tag{font-style:normal;font-size:10px;color:var(--on-accent);border:none;background:color-mix(in srgb,var(--gold) 78%,var(--lu));border-radius:99px;padding:1px 8px}
.mp-bzcg-hero{display:flex;align-items:baseline;gap:10px;margin:2px 0 4px}
.mp-bzcg-hero b{font-size:30px;color:var(--gold);font-weight:700;letter-spacing:.02em}
.mp-bzcg-bandchip{font-style:normal;font-size:12px;font-weight:700;color:var(--on-accent);border-radius:99px;padding:3px 12px}
.mp-bzcg-bandchip.band-top{background:linear-gradient(135deg,var(--cg-top-a),var(--cg-top-b))}
.mp-bzcg-bandchip.band-good{background:linear-gradient(135deg,var(--cg-good-a),var(--cg-good-b))}
.mp-bzcg-bandchip.band-mid{background:linear-gradient(135deg,var(--cg-mid-a),var(--cg-mid-b))}
.mp-bzcg-bandchip.band-weak{background:linear-gradient(135deg,var(--cg-weak-a),var(--cg-weak-b))}
.mp-bzcg-bandchip.band-low{background:linear-gradient(135deg,var(--cg-low-a),var(--cg-low-b))}
.mp-bzcg-lunar{font-size:11px;color:var(--muted);margin-top:4px}
.mp-bzcg-ws{display:flex;flex-wrap:wrap;gap:6px 14px;margin-top:5px;font-size:12.5px;color:var(--ink2)}
.mp-bzcg-ws b{color:var(--gold);font-weight:700}
.mp-bzcg-song{margin-top:8px;padding:8px 11px;border-left:3px solid var(--gold);background:color-mix(in srgb,var(--gold) 12%,var(--band));border-radius:0 6px 6px 0;font-family:var(--kai,system-ui),serif;font-size:14px;line-height:1.9;color:var(--ink)}
.mp-bzcg-plain{margin-top:6px;font-size:12px;line-height:1.8;color:var(--ink2)}
.mp-bzcg-plain em{font-style:normal;font-size:10.5px;color:var(--gold);border:1px solid var(--gold);border-radius:99px;padding:1px 7px;margin-right:6px;opacity:.9}
.mp-bzcg-band{margin-top:7px;font-size:12.5px;line-height:1.8;color:var(--ink);font-weight:500}
.mp-bzcg-note{margin-top:7px;font-size:11px;color:var(--muted)}
/* 婚姻层：与称骨的金色区分开，用暖红；过去年份压暗，避免与「往后看」混在一起 */
.mp-mar{margin-top:12px;border:1px solid color-mix(in srgb,var(--red) 42%,var(--line));border-radius:10px;padding:11px 13px;background:color-mix(in srgb,var(--red) 5%,var(--band))}
.mp-mar-h{display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-direction:row}
.mp-mar-h b{font-size:14px;color:var(--red);font-weight:700;letter-spacing:.04em}
.mp-mar-tag{font-style:normal;font-size:11px;font-weight:700;color:var(--on-accent);border-radius:99px;padding:2px 9px;background:color-mix(in srgb,var(--red) 76%,var(--lu))}
.mp-mar-yrs{display:flex;flex-wrap:wrap;gap:6px;margin:7px 0 8px}
.mp-mar-y{font-size:12px;padding:2px 9px;border:1px solid color-mix(in srgb,var(--red) 38%,var(--line));border-radius:99px;color:var(--ink)}
.mp-mar-y em{font-style:normal;font-size:10.5px;color:var(--muted);margin-left:4px}
.mp-mar-y.past{opacity:.5}
.mp-mar-lines{margin:0;padding-left:18px;font-size:12.5px;line-height:1.85;color:var(--ink2)}
.mp-mar-b{margin-top:7px;font-size:11px;color:var(--muted)}
.mp-mar-b summary{cursor:pointer}
.mp-life{margin-top:12px;border:1px solid color-mix(in srgb,var(--ke) 40%,var(--line));border-radius:10px;padding:11px 13px;background:color-mix(in srgb,var(--ke) 5%,var(--band))}
.mp-life-h{display:flex;align-items:center;gap:8px;margin-bottom:7px;flex-direction:row}
.mp-life-h b{font-size:14px;color:var(--ke);font-weight:700;letter-spacing:.04em}
.mp-life-tag{font-style:normal;font-size:11px;color:var(--muted)}
.mp-life-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:8px;align-items:start}
.mp-life-f{padding:8px 10px;border-radius:7px;background:var(--card);border:1px solid var(--hair)}
.mp-life-f>b{display:block;font-size:12px;font-weight:700;color:var(--ke);margin-bottom:4px;letter-spacing:.06em}
.mp-life-f p{margin:0 0 3px;font-size:12px;line-height:1.7;color:var(--ink2)}
.mp-life-f p:last-child{margin-bottom:0}
.mp-life-f p:first-of-type{color:var(--ink)}
.mp-life-b{margin-top:7px;font-size:11px;color:var(--muted)}
.mp-life-b summary{cursor:pointer}
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
  .pp-grid{grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,minmax(0,auto));gap:0;padding:0;--zw-l1:11px;--zw-l2:9.5px;--zw-l3:8.5px;--zw-l4:8.5px}
  .pp-cell{min-height:0;padding:3px 2px 4px;border-radius:0}
  .pp-center{grid-column:2/4;grid-row:2/4;order:0;border-radius:0;padding:5px 3px;gap:2px}
  .pp-center .ct-t1{font-size:12px;margin-bottom:2px;letter-spacing:.02em}
  .pp-center .ct-t2{font-size:9px;line-height:1.4}
  .pp-center .ct-t3{font-size:10.5px;letter-spacing:.16em;margin:2px 0}
  .pp-center .ct-t4{font-size:9px;line-height:1.45}
  .pp-center .pp-legend{font-size:8.5px;gap:4px;margin-top:3px;flex-wrap:wrap;line-height:1.4}
  /* 星曜竖排堆叠：字号走四级变量，竖屏压小一档 */
  .pp-stars{flex-direction:column;flex-wrap:nowrap;align-items:flex-start;justify-content:flex-start;gap:1px;line-height:1.4;min-height:0}
  .pp-st.main{font-size:var(--zw-l1)}
  .pp-st.good,.pp-st.bad,.pp-st.aux{font-size:var(--zw-l2)}
  .pp-st.minor{font-size:var(--zw-l3)}
  .pp-m{font-size:8.5px;padding:0 1px;vertical-align:0}
  .pp-b{font-size:10px;margin-left:3px;opacity:.9}
  .pp-ages{font-size:var(--zw-l4);line-height:1.45;margin-top:2px;word-break:break-all}
  .pp-foot{font-size:var(--zw-l4);line-height:1.4;gap:2px}
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
/* 三档预设（P1-19）：预设只是开关集合的宏，不新增任何渲染逻辑 */
.pp-preset{display:flex;align-items:center;gap:6px;flex-wrap:wrap;padding:7px 12px 1px;font-size:11.5px;color:var(--label)}
.pp-preset span{letter-spacing:.06em}
.pp-preset button{font:inherit;font-size:11.5px;padding:2px 11px;border:1px solid var(--line);border-radius:999px;background:var(--card);color:var(--ink2);cursor:pointer;min-height:26px}
.pp-preset button:hover{border-color:var(--lu)}
.pp-preset button.on{background:var(--lu);color:var(--on-accent);border-color:var(--lu)}
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
#ppm-d-small:not(:checked)~.pp-body .pp-st.aux,#ppm-d-small:not(:checked)~.pp-body .pp-st.minor{display:none}
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
`,n=window.__PP=window.__PP||{};n.CSS=s;const k={主星:"main",吉星:"good",煞星:"bad",辅星:"aux",杂曜:"minor"},_={禄:"lu",权:"quan",科:"ke",忌:"ji"},W=new Set(["三台","八座","恩光","天贵"]),se={庙:"good",旺:"good",得:"mid",利:"mid",平:"mid",不:"bad",陷:"bad"},fe={巳:[1,1],午:[1,2],未:[1,3],申:[1,4],辰:[2,1],酉:[2,4],卯:[3,1],戌:[3,4],寅:[4,1],丑:[4,2],子:[4,3],亥:[4,4]},ue={乾:[1,1,1],兑:[1,1,0],离:[1,0,1],震:[1,0,0],巽:[0,1,1],坎:[0,1,0],艮:[0,0,1],坤:[0,0,0]},ye=["初爻","二爻","三爻","四爻","五爻","上爻"],t=e=>String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),Ne=(e,i,o)=>{const f=Math.round(43),h=e?`<rect x="0" y="${2.5}" width="104" height="7" rx="${1.6}" fill="currentColor"/>`:`<rect x="0" y="${2.5}" width="${f}" height="7" rx="${1.6}" fill="currentColor"/><rect x="${f+18}" y="${2.5}" width="${104-f-18}" height="7" rx="${1.6}" fill="currentColor"/>`;return`<svg class="mp-hex${i?" hex-on":""}${o?" "+o:""}" viewBox="0 0 104 12" preserveAspectRatio="none" aria-hidden="true" focusable="false">${h}</svg>`},B={木:"M6 1.6V10.8M6 5.2 2.6 2.2M6 7.4 9.4 4.4",火:"M6 1.4C7.6 3.6 9.2 5.4 9.2 7.6A3.2 3.2 0 0 1 2.8 7.6C2.8 5.4 4.4 3.6 6 1.4Z",土:"M1.6 9.6h8.8M6 2.4v7.2M3.4 5.6h5.2",金:"M6 1.2 10.6 6 6 10.8 1.4 6Z",水:"M1.4 7.2C2.9 4.2 4.5 10.2 6 7.2 7.5 4.2 9.1 10.2 10.6 7.2"},we=e=>{const i=B[e];return i?`<svg class="mp-wxi" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="${i}" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`:""},te=e=>`<svg class="mp-trig" viewBox="0 0 14 10" aria-hidden="true" focusable="false">${(ue[e]||[0,0,0]).slice().reverse().map((l,r)=>{const c=r*4;return l?`<rect x="0" y="${c}" width="14" height="2" rx="0.6" fill="currentColor"/>`:`<rect x="0" y="${c}" width="5.6" height="2" rx="0.6" fill="currentColor"/><rect x="8.4" y="${c}" width="5.6" height="2" rx="0.6" fill="currentColor"/>`}).join("")}</svg>`;n._hexBar=Ne,n._wxIcon=we,n._triGlyph=te;function D(e,i,o){return!e||!e.length?"":e.map(l=>{const r=k[l.type]||"aux",c=l.mutagen?`<i class="pp-m ${_[l.mutagen]}">${l.mutagen}</i>`:"",d=i&&i[l.name],u=d?`<i class="pp-m view ${_[d]}">${d}</i>`:"",m=l.brightness?`<em class="pp-b ${se[l.brightness]||"mid"}">${l.brightness}</em>`:"",f=l.inTemple?'<em class="pp-b good">庙</em>':"",h=o&&o[l.name]?za(o[l.name],l.name):"",j=W.has(l.name)?" st-sbg":"";return`<span class="pp-st ${r}${j}">${h}${l.name}${m}${f}${c}${u}</span>`}).join("")}function I(e){const i=[];for(let o=0;o<6;o++)i.push(e+o*12);return i.join(",")}const Z=["命宫","兄弟","夫妻","子女","财帛","疾厄","迁移","交友","官禄","田宅","福德","父母"],K=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],oe=e=>(e%12+12)%12,Me=(e,i)=>e!==i&&[oe(i+4),oe(i+8),oe(i+6)].includes(e);function Ae(e,i,o,l,r,c,d,u){const m=fe[e.branch]||[1,1],f=K.indexOf(e.branch),h=["pp-cell"];f===i?h.push("pp-soul"):Me(f,i)&&h.push("pp-tri"),e.isBody&&h.push("pp-shen"),u&&e.branch===u&&h.push("pp-laiyin"),m[0]===4&&h.push("pp-lastrow"),m[1]===4&&h.push("pp-lastcol");const j=e.shensha||{},z=Z[oe(i-f)];let A="";if(f===i&&l){const C=O=>(k[O.type]||"")==="main";if(!(e.stars||[]).some(C)){const O=l.find(G=>K.indexOf(G.branch)===oe(f+6)),ie=O?(O.stars||[]).filter(C):[];ie.length&&(A=`<div class="pp-borrow" title="命宫无主星，借对宫（迁移宫）主星">借 ${ie.map(G=>G.name).join(" ")}</div>`)}}return`<div class="${h.join(" ")}" data-pi="${f}" data-view="${o}" role="button" tabindex="0" aria-expanded="false" style="grid-row:${m[0]};grid-column:${m[1]}">
      <div class="pp-stars">${D(e.stars,r,We(e))}</div>
      ${A}
      <div class="pp-ages">${I(e.xiaoxian.age)}</div>
      ${St(e,c)}
      ${Da(e,d)}
      <div class="pp-foot">
        <div class="ft-l">
          <span class="ft-dx"><span class="pp-ss-txt">${j.boshi}</span> ${e.daxian.start}-${e.daxian.end}</span>
          <span class="pp-ss-txt">${j.jiangqian}</span>
          <span class="pp-ss-txt">${j.suiqi}</span>
        </div>
        <div class="ft-r">
          <span class="pp-ss-txt">${j.changsheng}</span>
          <span>${e.ganzhi}</span>
          <span class="ft-pn">${z}</span>
        </div>
      </div>
    </div>`}function za(e,i){return`<span class="pp-zha ${_[e]}" title="自化${t(e)}：${t(i)}·宫干化回本宫"><svg class="z-a" viewBox="0 0 22 9" role="img" aria-label="自化${t(e)}">
        <path class="z-shaft" d="M1 7C6.6 7 11.4 5.6 17.2 3.2"/>
        <path class="z-head" d="M20.2 2 17.8 4.9 16.6 1.9Z"/>
      </svg></span>`}n._zhaMark=za;function We(e){const i={};for(const o of e.selfHua||[])!o||!o.star||!_[o.type]||i[o.star]||(i[o.star]=o.type);return i}function St(e,i){const o=i&&i[e.branch]||[];if(!o.length)return"";const l=o.map(r=>`<i class="${_[r.type]||""}" title="${t(r.star)}化${t(r.type)}">${t(r.type)}<em>→${t(r.palace||"未上盘")}</em></i>`).join("");return`<div class="pp-fx">${t(e.ganzhi)}宫干 ${l}</div>`}function Da(e,i){const o=i&&i[e.branch]||null;return o?`<div class="pp-hs">${Object.entries(o).map(([r,c])=>`<i>${t(r)}<em>${t(c)}</em></i>`).join("")}</div>`:""}function Fa(e){try{const i=window.Engine||window.__PP&&window.__PP.Engine;if(!i||!i.buildBazi||!e.input)return"";const o=i.buildBazi({year:e.input.year,month:e.input.month,day:e.input.day,hour:e.input.hour,minute:e.input.minute,gender:e.input.gender,trueSolar:!1});return["year","month","day","hour"].map(l=>o.pillars[l].ganzhi).join(" ")}catch{return""}}function Ra(e){try{const i=window.Engine||window.__PP&&window.__PP.Engine;return!i||!i.buildBazi||!e.input?null:i.buildBazi({year:e.input.year,month:e.input.month,day:e.input.day,hour:e.input.hour,minute:e.input.minute,gender:e.input.gender,trueSolar:!1}).pillars.day.stem}catch{return null}}n.ziweiHTML=function(e){const i=K.indexOf(e.soul.branch),o=e.liunian&&e.liunian[0]||null,l=o?o.age:1,r=e.palaces.find(w=>l>=w.daxian.start&&l<=w.daxian.end)||e.palaces[0],c=K.indexOf(r.branch),d=o?K.indexOf(o.lifePalace.branch):i,u=w=>{const S={};for(const L of w||[])L&&L.star&&(S[L.star]=L.type);return S},m=(e.daxianList||[]).find(w=>w.branch===r.branch)||null,f={da:u(m&&m.mutagenHits),ln:u(o&&o.mutagenHits)},h={};for(const w of e.daxianList||[])h[w.branch]=w.mutagenHits||[];const j=(()=>{const w=Ra(e);if(!w)return null;const S=(e.daxianList||[]).find(y=>y.stem===w);if(!S)return null;const L={};for(const y of e.palaces)for(const ae of y.stars||[])ae.name in L||(L[ae.name]=y.branch);return{stem:w,items:(S.mutagenHits||[]).map(y=>({type:y.type,star:y.star,branch:L[y.star]||null,palace:L[y.star]?(e.palaces.find(ae=>ae.branch===L[y.star])||{}).palace:null}))}})();let z=null;if(o){z={};for(const[w,S]of Object.entries(o))/^(流|年解)/.test(w)&&typeof S=="string"&&K.includes(S)&&(z[S]=z[S]||{},z[S][w]=S)}const A={da:m&&m.yunStars?(()=>{const w={};for(const[S,L]of Object.entries(m.yunStars))(w[L]=w[L]||{})[S]=L;if(m.yunSuiqi)for(const[S,L]of Object.entries(m.yunSuiqi))(w[L]=w[L]||{})[S]=L;if(m.yunJiangqian)for(const[S,L]of Object.entries(m.yunJiangqian))(w[L]=w[L]||{})[S]=L;return w})():null,ln:z};if(e.liunian&&e.liunian.length){const w=e.liunian.find(S=>S.ganzhi===(e._lnSel||e.liunian[0].ganzhi))||e.liunian[0];if(w.lnSuiqi)for(const[S,L]of Object.entries(w.lnSuiqi))(z[L]=z[L]||{})[S]=L;if(w.lnJiangqian)for(const[S,L]of Object.entries(w.lnJiangqian))(z[L]=z[L]||{})[S]=L}const C=(w,S)=>e.palaces.map(L=>Ae(L,w,S,e.palaces,f[S]||null,h,A[S]||null,e.laiyin&&e.laiyin.branch)).join(""),O=(w,S)=>`<div class="pp-center">
        ${S==="da"?`<div class="ct-t1">大限 ${r.ganzhi}　${r.daxian.start}-${r.daxian.end}岁</div>`:S==="ln"&&o?`<div class="ct-t1">流年 ${o.ganzhi}　${o.age}岁</div>`:`<div class="ct-t1">${e.daxian.rule.slice(0,2)}　${e.bureau.name}</div>`}
        <div class="ct-t2">公历 ${e.input.year}-${String(e.input.month).padStart(2,"0")}-${String(e.input.day).padStart(2,"0")} ${String(e.input.hour).padStart(2,"0")}:${String(e.input.minute).padStart(2,"0")}</div>
        <div class="ct-t2">农历 ${e.lunar.year}年${e.lunar.isLeap?`闰${e.lunar.monthRaw||e.lunar.month}`:e.lunar.month}月${e.lunar.day}日${e.hourBranch}时${e.lunar.isLeap&&e.lunar.monthRaw&&e.lunar.month!==e.lunar.monthRaw?`（按${e.lunar.month}月起盘）`:""}</div>
        ${Fa(e)?`<div class="ct-t3">${Fa(e)}</div>`:""}
        ${e.nonJieqi?`<div class="ct-t3 ct-t3nj" title="${t(e.nonJieqi.note)}">${e.nonJieqi.year} ${e.nonJieqi.month} ${e.nonJieqi.day} ${e.nonJieqi.hour}<em class="nj-tag">非节气</em></div>`:""}
        <div class="ct-t4">命主 ${e.lifeMaster}${e.lifeMasterNote?`<span class="pp-dim" title="${t(e.lifeMasterNote)}">＊</span>`:""}　身主 ${e.bodyMaster}${e.bodyMasterNote?`<span class="pp-dim" title="${t(e.bodyMasterNote)}">＊</span>`:""}</div>
        <div class="ct-t4">命宫 ${e.soul.branch}　身宫 ${e.body.branch}　五行局 ${e.bureau.name}</div>
        <div class="ct-t4">子年斗君 ${e.doujun?e.doujun.zinian:"—"}　流年斗君 ${o&&o.doujun?o.doujun:"—"}</div>
        <div class="ct-t4">紫微 ${e.ziwei}　天府 ${e.tianfu}　${S==="da"?"大限命宫 "+K[c]:S==="ln"?"流年命宫 "+K[d]:"本命命宫 "+e.soul.branch}</div>
        ${S==="da"||S==="ln"?`<div class="ct-t4 pp-viewhua">${S==="da"?"大限":"流年"}四化　${(S==="da"?f.da:f.ln)&&Object.keys(S==="da"?f.da:f.ln).length?Object.entries(S==="da"?f.da:f.ln).map(([y,ae])=>`${y}化${ae}`).join("　"):'<span class="pp-dim">未飞四化</span>'}</div>`:""}
        <div class="pp-legend"><span class="pp-m lu">禄</span><span class="pp-m quan">权</span><span class="pp-m ke">科</span><span class="pp-m ji">忌</span><span>实心=生年四化　空心=大限/流年四化　箭头=自化　红框=命宫　浅底=三方四正</span></div>
      </div>`,ie=w=>{const S=w==="da"?`大限 ${r.ganzhi}`:w==="ln"&&o?`流年 ${o.ganzhi}`:"本命",L=(Fa(e)||"").split(" ")[0]||"";return`<div class="pp-cal"><b class="cal-sc"></b><span class="cal-sep">·</span><span>${S}</span>${L?`<span class="cal-sep">·</span><span>${e.input.year} ${L}</span>`:""}</div>`},G=(w,S,L)=>`<div class="pp-body ${w}" data-view="${L}" data-soul="${S}">${ie(L)}<div class="pp-grid">${C(S,L)}${O(S,L)}</div><div class="pp-detail"></div></div>`,R=e.changqu,ee=R?`<div class="pp-chips">
      <span class="pp-chip">昌 ${R.wenchang.branch}（${R.wenchang.palace}）</span>
      <span class="pp-chip">曲 ${R.wenqu.branch}（${R.wenqu.palace}）</span>
      <span class="pp-chip">${R.relation}</span>
      <span class="pp-chip">入命三方 ${R.inSoulSanfang?"是":"否"}</span>
      <span class="pp-chip ${R.absorb.label==="杂"?"warn":"ok"}">吸收·${R.absorb.label}</span>
    </div>`:"",v=(e.patterns||[]).length?`<div class="pp-chips">${e.patterns.map(w=>{const S=w.status==="broken"&&Array.isArray(w.breaks)&&w.breaks.length,L=`${w.evidence||""}${S?`；破格：${w.breaks.join("；")}`:""}`;return`<span class="pp-chip ${S?"broken":w.tone==="good"?"ok":w.tone==="bad"?"warn":""}" title="${t(L)}">${w.name}${S?"（破格）":""}</span>`}).join("")}</div>`:"",q=(e.daxianList||[]).length?`<div class="pp-chips">${e.daxianList.slice(0,8).map(w=>`<span class="pp-chip" title="${t(`${w.ganzhi} 宫干四化：`+w.mutagenHits.map(S=>`${S.star}化${S.type}→${S.palace||"未上盘"}`).join("、"))}">${w.branch} ${w.ages[0]}-${w.ages[1]}</span>`).join("")}</div>`:"",de=o&&o.mutagenHits&&o.mutagenHits.length?`<div class="pp-chips">${o.mutagenHits.map(w=>`<span class="pp-chip ${w.type==="忌"?"warn":w.type==="禄"?"ok":""}">${w.star}化${w.type}→${w.palace||"未上盘"}</span>`).join("")}</div>`:"",J=e.zuoyao,qe=J?J.placed&&J.placed.length?`<div class="pp-sec"><div class="pp-sec-h">杂曜全表 · 已排 ${J.placed.length} 颗（${J.starTotal} 颗盘）</div>
        <div class="pp-chips">${J.placed.map(w=>`<span class="pp-chip${w.inTemple?" ok":""}" title="${t(w.meaning||"")}">${t(w.name)} ${t(w.branch)}（${t(w.palace)}）${w.inTemple?"·庙":""}</span>`).join("")}</div>
        <details class="pp-zy"><summary>逐颗安星诀（${J.placed.length} 条 · 出多处近代通行辑本并核，属通行说，不是《全书》原文）</summary><div class="pp-zy-v">${t(J.verses).replace(/\n/g,"<br>")}</div></div></details>
        ${J.skipped&&J.skipped.length?`<div class="pp-zy-s">${J.skipped.map(w=>t(w)).join("")}</div>`:""}</div>`:`<div class="pp-sec"><div class="pp-sec-h">杂曜 · 本盘 ${J.starTotal} 颗（通行简盘）</div>
        <div class="pp-zy-s">开「杂曜全表」追加十二颗：解神·天巫·天月·阴煞（生月）／天官·天福·天厨（生年干）／蜚廉·天德·年解（生年支）／天才（命宫＋生年支）·天寿（身宫＋生年支）。${J.skipped&&J.skipped.length?`不另立：${J.skipped.map(w=>t(w)).join("")}`:""}</div></div>`:"",Y=e.flyChains?(()=>{const w=["禄","权","科","忌"].map(S=>{const L=e.flyChains[S];if(!L||!L.steps.length)return"";const y=L.path.map(xe=>String(xe).replace(/宫$/,"")).join("→"),ae=L.steps.map(xe=>`${xe.from}（${xe.fromStem}）化${S}${xe.star}→${xe.to}`).join("；");return`<span class="pp-chip ${S==="忌"?"warn":S==="禄"?"ok":""}" title="${t(ae)}">飞${S} ${t(y)}${L.closed?"↺":""}</span>`}).join("");return w?`<div class="pp-chips">${w}</div>`:""})():"",$e=e.flyComposite&&Array.isArray(e.flyComposite.labels)&&e.flyComposite.labels.length?`<div class="pp-chips">${e.flyComposite.labels.map(w=>{const S=/忌/.test(w)?"warn":/自化/.test(w)?"":"ok",L=ge=>String(ge).replace(/^.*?会/,"").replace(/^禄忌同宫/,"").replace(/自化$/,""),y=(e.flyComposite.targets||[]).find(ge=>ge.palace===L(w)),ae=y?y.incoming.map(ge=>`${ge.from}化${ge.type}${ge.star}`).join("、"):e.flyComposite.note;return`<span class="pp-chip ${S}" title="${t(ae)}">三方四正 ${t(w)}</span>`}).join("")}</div>`:"",X=e.flow,ce=X?(()=>{const w=ae=>(ae.mutagenHits||[]).length?ae.mutagenHits.map(ge=>`<i>${ge.star}化${ge.type}<em>→${ge.palace||"未上盘"}</em></i>`).join(""):'<i class="dim">宫干无四化</i>',S=(ae,ge,xe,E)=>`<div class="flow-row" data-t="${ae}"><b>${ge}</b><span class="flow-p"><span class="flow-k">${xe.ganzhi||"—"}　落${xe.palace||"未上盘"}（${xe.branch}）</span>${E?`<em class="flow-same">${E}</em>`:""}</span><span class="flow-m">${w(xe)}</span></div>`,y=X.day.branch===X.month.branch?"（日数走满一圈，故同宫）":"";return`<div class="pp-flow">
        <div class="flow-row"><b>基准</b><span class="flow-p">${X.asOf.solar}</span><span class="flow-m">农历 ${X.asOf.lunar}　流年 ${X.asOf.yearGanzhi}（斗君 ${X.year.doujun}）</span></div>
        ${S("month",`流月 ${X.month.index} 月`,X.month)}
        ${S("day",`流日 ${X.day.index} 日`,X.day,y)}
        ${S("hour",`流时 ${K[X.hour.hourIndex]}时`,X.hour)}
      </div>`})():"";return n._zw=e,n.briefHTML(e)+`<div class="pp">
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
      <!-- 时间层（P1-18）：流月/流日/流时默认不出，勾哪个出哪个。
           必须在 .pp-time 与 .pp-flow 之前——兄弟选择器只向后找 -->
      ${X?'<input type="checkbox" id="ppm-t-month" class="pp-r"><input type="checkbox" id="ppm-t-day" class="pp-r"><input type="checkbox" id="ppm-t-hour" class="pp-r">':""}
      <details class="pp-disp">
        <summary>显示设置 · 17 项</summary>
        <div class="pp-preset"><span>预设</span>
          <button type="button" data-pp-preset="simple">简洁</button>
          <button type="button" data-pp-preset="std" class="on">标准</button>
          <button type="button" data-pp-preset="expert">专家</button>
        </div>
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
      ${X?`<div class="pp-modes pp-time">
        <label for="ppm-t-month">＋流月</label><label for="ppm-t-day">＋流日</label><label for="ppm-t-hour">＋流时</label>
        <span class="pp-soon">要落到这个月这几天，再往下一层</span>
      </div>`:""}
      <div class="pp-modes pp-schools">
        <label for="ppm-sc-sihe">四化</label><label for="ppm-sc-feixing">飞星</label><label for="ppm-sc-sanhe">三合</label>
      </div>
      ${G("ben",i,"ben")}
      ${G("da",c,"da")}
      ${G("ln",d,"ln")}
      ${(()=>{if(!j)return"";const w={禄:"rl",权:"rq",科:"rk",忌:"rj"},S=j.items.map(L=>`<i><em class="${w[L.type]||""}">${L.type}</em>${t(L.star)}<em>${t(L.branch||"?")}${L.palace?`·${t(L.palace)}`:""}</em></i>`).join("");return`<div class="pp-rigan"><b>日干${t(j.stem)}四化</b>${S}</div>`})()}      ${(()=>{if(!j)return"";const w={禄:"rl",权:"rq",科:"rk",忌:"rj"},S=j.items.map(L=>`<i><em class="${w[L.type]||""}">${L.type}</em>${t(L.star)}<em>${t(L.branch||"?")}${L.palace?`·${t(L.palace)}`:""}</em></i>`).join("");return`<div class="pp-rigan"><b>日干${t(j.stem)}四化</b>${S}</div>`})()}
      <div class="pp-zhlegend">自化图示　<span class="z-lu">${n._zhaMark("禄","本宫")}禄</span><span class="z-quan">${n._zhaMark("权","本宫")}权</span><span class="z-ke">${n._zhaMark("科","本宫")}科</span><span class="z-ji">${n._zhaMark("忌","本宫")}忌</span></div>
      <div class="pp-flywrap">${Y}${$e}</div>
      ${ce}
    </div>${ee}${v}${q}${de}${qe}`};function ja(e){return e.length?e.map(i=>{const o=k[i.type]||"aux",l=i.brightness?`<em class="dt-br ${se[i.brightness]||"mid"}">${i.brightness}</em>`:"",r=i.inTemple?'<em class="dt-br good">庙</em>':"",c=i.mutagen?`<i class="pp-m ${_[i.mutagen]}">${i.mutagen}</i>`:"";return`<span class="dt-st ${o}">${i.name}${l}${r}${c}</span>`}).join(""):'<span class="dt-empty">无</span>'}function Sa(e,i){const o=n._zw;if(!o)return"";const l=q=>o.palaces.find(de=>K.indexOf(de.branch)===q),r=l(e)||o.palaces.find(q=>K.indexOf(q.branch)===e);if(!r)return"";const c=K.indexOf(r.branch),d=Z[oe(i-c)],u=r.shensha||{},m=r.stars.filter(q=>q.type==="主星"),f=r.stars.filter(q=>q.type==="吉星"||q.type==="辅星"),h=r.stars.filter(q=>q.type==="煞星"),j=r.stars.filter(q=>!["主星","吉星","辅星","煞星"].includes(q.type)),z=(r.selfHua||[]).length?r.selfHua.map(q=>`<span class="dt-self">${za(q.type,q.star||"本宫")}${t(q.star||"")}</span>`).join(""):'<span class="dt-empty">无</span>',A=[oe(c+4),oe(c+8),oe(c+6)].map(q=>{const de=l(q),J=Z[oe(i-q)],qe=de?de.stars.filter($e=>$e.type==="主星").map($e=>$e.name).join("、"):"",Y=q===oe(c+6)?"对宫":"三合";return`<span class="dt-st">${J}[${K[q]}]<b>${qe||"无主星"}</b><em>${Y}</em></span>`}).join(""),C=l(oe(c+6)),O=C?C.stars.filter(q=>q.type==="主星"):[],ie=m.length?ja(m):`<span class="dt-empty">无主星</span><span class="dt-tri">　借对宫 <b>${O.length?O.map(q=>q.name).join("、"):"亦无主星"}</b></span>`,G=(q,de)=>`<div class="dt-dr"><span class="dt-k">${q}</span><div class="dt-v">${de}</div></div>`,R=Z.length,ee=oe(i-c),v=Z.map((q,de)=>{const J=oe(c+(de-ee+R)%R);return`<span class="dt-st">${Z[de]}[${K[J]}]</span>`}).join("");return`<div class="dt-dh">
        <b>${d}</b><span>${r.branch}宫 · ${r.ganzhi}</span>
        <span>大限 ${r.daxian.start}-${r.daxian.end}</span>
        <span>小限起 ${r.xiaoxian.age} 岁</span>
        ${r.isBody?"<span>· 身宫</span>":""}
        <span class="dt-x" data-pp-close="1">收起</span>
      </div>
      ${G("主星",ie)}
      ${G("吉辅",ja(f))}
      ${h.length?G("煞星",ja(h)):""}
      ${j.length?G("杂曜",ja(j)):""}
      ${G("宫干四化",z)}
      ${G("十二神",`<span class="dt-tri">长生 ${u.changsheng||"—"}　博士 ${u.boshi||"—"}　将前 ${u.jiangqian||"—"}　岁前 ${u.suiqi||"—"}</span>`)}
      ${G("三方四正",`<span class="dt-tri">${A}</span>`)}
      ${G("太极转换",`<span class="dt-tri dt-taiji">以${d}[${r.branch}]立太极${v}</span>`)}
      <div class="hint">三方四正在盘上已同步标出（浅红描边）。再点一次本宫可收起。</div>`}function Ia(e){e.querySelectorAll(".pp-cell.pp-sel,.pp-cell.pp-link").forEach(i=>{i.classList.remove("pp-sel"),i.classList.remove("pp-link")}),e.querySelectorAll('.pp-cell[aria-expanded="true"]').forEach(i=>i.setAttribute("aria-expanded","false"))}const Ba={};function Nt(e,i){ma(e);const o=e.querySelector(".pp-grid");if(!o)return;const l=[i,(i+6)%12,(i+4)%12,(i+8)%12],r=m=>{const f=e.querySelector('.pp-cell[data-pi="'+m+'"]');if(!f)return null;const h=Number(f.style.gridRow),j=Number(f.style.gridColumn),z=Math.min(75,Math.max(25,(h-.5)*25));return j===1?[25,z]:[75,z]},c=l.map(r);if(c.some(m=>!m))return;const d=document.createElementNS("http://www.w3.org/2000/svg","svg");d.setAttribute("class","pp-sf"),d.setAttribute("viewBox","0 0 100 100"),d.setAttribute("preserveAspectRatio","none");const u=(m,f,h,j)=>{const z=document.createElementNS("http://www.w3.org/2000/svg","line");z.setAttribute("x1",m),z.setAttribute("y1",f),z.setAttribute("x2",h),z.setAttribute("y2",j),d.appendChild(z)};u(c[0][0],c[0][1],c[1][0],c[1][1]),u(c[1][0],c[1][1],c[2][0],c[2][1]),u(c[2][0],c[2][1],c[3][0],c[3][1]),u(c[3][0],c[3][1],c[0][0],c[0][1]);for(let m=0;m<4;m++){const f=document.createElementNS("http://www.w3.org/2000/svg","circle");f.setAttribute("cx",c[m][0]),f.setAttribute("cy",c[m][1]),f.setAttribute("r",m===0?.9:.7),m===0&&f.setAttribute("style","fill:var(--red);opacity:.85"),d.appendChild(f)}o.style.position="relative",o.appendChild(d)}function ma(e){const i=e.querySelector("svg.pp-sf");i&&i.remove()}const Na=["ppm-d-ss","ppm-d-sbg","ppm-d-zha","ppm-d-ages","ppm-d-sizhu","ppm-d-rigan","ppm-d-njq","ppm-d-tjz","ppm-d-small","ppm-d-shen","ppm-d-hua","ppm-d-sf","ppm-d-laiyin","ppm-d-zha-bold","ppm-d-bad-ink","ppm-d-bold","ppm-d-hs"],Qe={simple:["ppm-d-hua","ppm-d-shen"],std:["ppm-d-ss","ppm-d-sbg","ppm-d-zha","ppm-d-ages","ppm-d-sizhu","ppm-d-small","ppm-d-shen","ppm-d-hua","ppm-d-sf","ppm-d-laiyin"],expert:Na.slice()};function qa(e,i){const o=Qe[e];if(!o||typeof document>"u")return!1;const l=i&&i.querySelector?i:document;return Na.forEach(r=>{const c=l.querySelector("#"+r);c&&(c.checked=o.indexOf(r)>=0)}),l.querySelectorAll("[data-pp-preset]").forEach(r=>{r.classList.toggle("on",r.getAttribute("data-pp-preset")===e)}),!0}n.DISP_PRESETS=Qe,n.DISP_ALL=Na,n.applyDispPreset=qa;function Ga(){if(Ga.done||typeof document>"u"||!document.addEventListener)return;Ga.done=!0;const e=i=>{const o=i.closest(".pp-body");if(!o)return;const l=o.querySelector(".pp-detail");if(!l)return;if(i.classList.contains("pp-sel")){Ia(o),ma(o),l.classList.remove("open"),l.innerHTML="";return}Ia(o);const r=Number(i.dataset.pi),c=Number(o.dataset.soul);Nt(o,r),o.querySelectorAll(".pp-cell").forEach(u=>{const m=Number(u.dataset.pi);(m===oe(r+4)||m===oe(r+8)||m===oe(r+6))&&u.classList.add("pp-link")}),i.classList.add("pp-sel"),i.setAttribute("aria-expanded","true"),l.innerHTML=Sa(r,c),l.classList.add("open")};document.addEventListener("click",i=>{const o=i.target,l=o&&o.closest?o.closest("[data-pp-preset]"):null;if(l){qa(l.getAttribute("data-pp-preset"),l.closest(".pp"));return}if(o&&o.closest&&o.closest("[data-pp-close]")){const c=o.closest(".pp-body");if(c){Ia(c),ma(c);const d=c.querySelector(".pp-detail");d&&(d.classList.remove("open"),d.innerHTML="");return}}const r=o&&o.closest?o.closest(".pp-cell[data-pi]"):null;r&&e(r)}),document.addEventListener("keydown",i=>{if(i.key!=="Enter"&&i.key!==" ")return;const o=i.target&&i.target.closest?i.target.closest(".pp-cell[data-pi]"):null;o&&(i.preventDefault(),e(o))}),document.addEventListener("change",i=>{const o=i.target;if(!o||!o.id||Na.indexOf(o.id)<0)return;const l=o.closest?o.closest(".pp"):null;l&&l.querySelectorAll("[data-pp-preset]").forEach(r=>r.classList.remove("on"))})}n.bindZiwei=Ga,n._palaceDetailHTML=Sa,Ga();function qt(e,i){const o=i||{},l=e.slice().sort((r,c)=>c.position-r.position);return o.plain?l.map(r=>`<div class="mp-hy-row hy-plain">
        <span class="mp-hy-nm">${r.name||ye[r.position-1]}</span>
        ${Ne(r.yinYang==="阳",r.moving)}
      </div>`).join(""):l.map(r=>{const c=r.yinYang==="阳",d=o.shiYing?r.position===o.shi?'<span class="mp-hy-sy">世</span>':r.position===o.ying?'<span class="mp-hy-sy">应</span>':"<span></span>":"<span></span>",u=r.moving?`<i class="mp-hy-mv" title="动爻">${c?"○":"×"}</i>`:'<i class="mp-hy-mv"></i>';return`<div class="mp-hy-row">
        ${d}
        <span class="mp-hy-nm">${r.name||ye[r.position-1]}</span>
        <span class="mp-hy-ln">${Ne(c,r.moving)}${u}</span>
        <span class="mp-hy-gz">${t(r.ganzhi||"")}</span>
        <span class="mp-hy-lq">${t(r.liuqin||"")}</span>
        <span class="mp-hy-ls">${t(r.liushen||"")}</span>
      </div>`}).join("")}n.liuyaoHTML=function(e){const i=(R,ee,v,q)=>`<div class="mp-hy-box">
      <div class="mp-hy-h"><b>${R}</b><span>${ee}</span></div>
      <div class="mp-hy">${qt(q,{shiYing:!0,shi:v.shi,ying:v.ying})}</div>
    </div>`,o=i(`本卦 ${e.ben.name}`,`${e.ben.palace} · ${e.ben.palaceElement}`,e.ben,e.ben.lines),l=e.bian?i(`变卦 ${e.bian.name}`,`${e.bian.palace} · ${e.bian.palaceElement}`,e.bian,e.bian.lines):`<div class="mp-hy-box"><div class="mp-hy-h"><b>六爻安静</b><span>无动爻，不取变卦</span></div>
          <div class="pp-dim" style="font-size:12px;line-height:1.9">断卦以本卦卦辞与世应生克为主。</div></div>`,r=e.body&&Array.isArray(e.body.labels)?e.body.labels:[],c=r.length?`<div class="pp-chips">${r.map(R=>`<span class="pp-chip ${/伏吟/.test(R)||/反吟/.test(R)||/化退神/.test(R)?"warn":/六冲|散/.test(R)?"":"ok"}">${t(R)}</span>`).join("")}</div>`:'<div class="pp-chips"><span class="pp-chip">卦体无六冲、六合、伏吟、反吟</span></div>',d=e.useGod&&e.useGod.liuqin?e.useGod:null,u=d?`<div class="pp-chips">${d.labels.map(R=>`<span class="pp-chip ${/空亡|退神|受克|泄气|不上卦/.test(R)?"warn":/持世|化进|六合|得飞神生/.test(R)?"ok":""}">${t(R)}</span>`).join("")}</div>`:'<div class="pp-chips"><span class="pp-chip">用神未取（未指明所问之事）</span></div>',m=e.useGodStrength&&Array.isArray(e.useGodStrength.labels)?e.useGodStrength:null,f=m&&m.labels.length?`<div class="pp-chips">${m.labels.map(R=>`<span class="pp-chip ${/死|囚|月破|受日辰克|泄|耗/.test(R)?"warn":/旺|相|得日辰生|比和/.test(R)?"ok":""}">${t(R)}</span>`).join("")}</div>`:"",h=e.fushenAccess&&Array.isArray(e.fushenAccess.labels)?e.fushenAccess:null,j=h&&h.labels.length?`<div class="pp-chips">${h.labels.map(R=>`<span class="pp-chip ${/可出/.test(R)?"ok":/受压难出|有助有压/.test(R)?"warn":""}">伏神${t(R)}</span>`).join("")}</div>`:"",z=e.yingqi&&Array.isArray(e.yingqi.labels)?e.yingqi:null,A=z&&z.labels.length?`<div class="pp-chips">${z.labels.map(R=>`<span class="pp-chip ${/应期偏速/.test(R)?"ok":/应期待解/.test(R)?"warn":""}" title="只列地支，不出日期">${t(R)}</span>`).join("")}</div>`:"",C=e.jinTuiPower&&Array.isArray(e.jinTuiPower.labels)?e.jinTuiPower:null,O=C&&C.labels.length?`<div class="pp-chips">${C.labels.map(R=>`<span class="pp-chip ${/后劲足|退得缓/.test(R)?"ok":/有限|进得虚|退得实|月破|未定/.test(R)?"warn":""}">${t(R)}</span>`).join("")}</div>`:"",ie=e.hexStrength&&Array.isArray(e.hexStrength.labels)?e.hexStrength:null,G=ie&&ie.labels.length?`<div class="pp-chips">${ie.labels.map(R=>`<span class="pp-chip ${/死|囚|月破|冲空/.test(R)?"warn":/旺|相/.test(R)?"ok":""}">${t(R)}</span>`).join("")}</div>`:"";return n.briefHTML(e)+`<div class="pp" style="padding:14px">
      <div class="mp-mh-head">起卦 ${e.cast.notation.join("、")}（自下而上）　日辰 ${e.dayGanZhi.name}</div>
      <div class="mp-hy-wrap">${o}${l}</div>
      ${c}
      ${u}
      ${f}
      ${j}
      ${A}
      ${O}
      ${G}
    </div>`},n.meihuaHTML=function(e){const i=(A,C,O,ie,G)=>{const ee=[...ue[ie]||[0,0,0],...ue[O]||[0,0,0]].slice().reverse().map(v=>Ne(!!v,!1,"sm")).join("");return`<div class="mp-hexbox hb-mini">
        <div class="hb-h">${A}</div>
        <div class="hb-n">${C}</div>
        <div class="mp-mh-mini">${ee}</div>
        <div class="hb-s">${G||`上${O} 下${ie}`}</div>
      </div>`},o=e.lines.slice().sort((A,C)=>C.position-A.position),l=o.slice(0,3),r=o.slice(3),c=e.moving>=4,d=(A,C,O,ie)=>`<div class="mp-trib">
      <div class="mp-trib-h">${A} ${te(C)}${C}${st(C)}<span class="mp-tritag ${ie?"tritag-ti":"tritag-yong"}">${ie?"体":"用"}</span></div>
      <div class="mp-hy" style="gap:5px">${qt(O,{plain:!0})}</div>
    </div>`,u=`<div class="mp-hexbox">
      <div class="hb-h"><span>本卦</span><span>动 ${e.movingName}</span></div>
      <div class="hb-n">${e.ben.name}</div>
      ${d("上卦",e.ben.upper,l,!c)}
      ${d("下卦",e.ben.lower,r,c)}
      <div class="hb-s">${e.source}</div>
    </div>`,m=e.bodyUse.level,f=m.includes("凶")?"bad":m.includes("吉")?"good":"flat",h=`<div class="mp-mh-rel">
      <div><b>体</b>${e.bodyUse.body.trigram}（${e.bodyUse.body.element}）　<b>用</b>${e.bodyUse.use.trigram}（${e.bodyUse.use.element}）</div>
      <div><span class="mh-lv ${f}">${m}</span>　${e.bodyUse.relation}</div>
    </div>`,j=ot(e.cuo.name)||["",""],z=ot(e.zong.name)||["",""];return n.briefHTML(e)+`<div class="pp mp-mh">
      <div class="mp-mh-main">
        ${u}
        ${i("互卦",e.hu.name,e.hu.upper,e.hu.lower,"中藏之象")}
        ${i("变卦",e.bian.name,e.bian.upper,e.bian.lower,`动 ${e.movingName} 后`)}
        ${i("错卦",e.cuo.name,j[0],j[1],"六爻全变")}
        ${i("综卦",e.zong.name,z[0],z[1],"整卦倒转")}
      </div>
      ${h}
    </div>`};const Ma={乾为天:["乾","乾"],天风姤:["乾","巽"],天山遁:["乾","艮"],天地否:["乾","坤"],风地观:["巽","坤"],山地剥:["艮","坤"],火地晋:["离","坤"],火天大有:["离","乾"],坎为水:["坎","坎"],水泽节:["坎","兑"],水雷屯:["坎","震"],水火既济:["坎","离"],泽火革:["兑","离"],雷火丰:["震","离"],地火明夷:["坤","离"],地水师:["坤","坎"],艮为山:["艮","艮"],山火贲:["艮","离"],山天大畜:["艮","乾"],山泽损:["艮","兑"],火泽睽:["离","兑"],天泽履:["乾","兑"],风泽中孚:["巽","兑"],风山渐:["巽","艮"],震为雷:["震","震"],雷地豫:["震","坤"],雷水解:["震","坎"],雷风恒:["震","巽"],地风升:["坤","巽"],水风井:["坎","巽"],泽风大过:["兑","巽"],泽雷随:["兑","震"],巽为风:["巽","巽"],风天小畜:["巽","乾"],风火家人:["巽","离"],风雷益:["巽","震"],天雷无妄:["乾","震"],火雷噬嗑:["离","震"],山雷颐:["艮","震"],山风蛊:["艮","巽"],离为火:["离","离"],火山旅:["离","艮"],火风鼎:["离","巽"],火水未济:["离","坎"],山水蒙:["艮","坎"],风水涣:["巽","坎"],天水讼:["乾","坎"],天火同人:["乾","离"],坤为地:["坤","坤"],地雷复:["坤","震"],地泽临:["坤","兑"],地天泰:["坤","乾"],雷天大壮:["震","乾"],泽天夬:["兑","乾"],水天需:["坎","乾"],水地比:["坎","坤"],兑为泽:["兑","兑"],泽水困:["兑","坎"],泽地萃:["兑","坤"],泽山咸:["兑","艮"],水山蹇:["坎","艮"],地山谦:["坤","艮"],雷山小过:["震","艮"],雷泽归妹:["震","兑"]},Ca={乾:"金",兑:"金",离:"火",震:"木",巽:"木",坎:"水",艮:"土",坤:"土"},st=e=>Ca[e]?` ${Ca[e]}`:"",ot=e=>Ma[e]||null;n.daliurenHTML=function(e){const i=e.sanChuan,o=(u,m)=>`<div class="mp-dl-sc-c">
      <div class="mp-dl-sc-k">${m}</div>
      <div class="mp-dl-sc-z">${u.zhi}</div>
      <div class="mp-dl-sc-j">${u.jiangFull||u.jiang}</div>
      <div class="mp-dl-sc-l">${u.liuQin}${u.xunKong?" · 空":""}</div>
    </div>`,l=`<div class="mp-dl-sc-c ge">
      <div class="mp-dl-sc-k">格局</div>
      <div class="mp-dl-sc-gn">${e.geJu.name}</div>
      <div class="mp-dl-sc-l">${e.geJu.detail}</div>
    </div>`,r=e.siKe.slice().map(u=>`<div class="mp-dl-sk-c">
      <div class="mp-dl-sk-k">${["一课","二课","三课","四课"][u.position-1]||u.position+"课"}</div>
      <div class="mp-dl-sk-s">${u.shang}</div>
      <div class="mp-dl-sk-x">${u.xia}</div>
      <div class="mp-dl-sk-r">${u.relation} · ${u.jiangFull||u.jiang}</div>
    </div>`).join(""),c=e.pan.map(u=>{const m=fe[u.di]||[1,1];return`<div class="mp-dl-pc" style="grid-row:${m[0]};grid-column:${m[1]}">
        <div class="tz">${u.tian}</div>
        <div class="dz">地盘 ${u.di}</div>
        <div class="jz">${u.jiangFull}</div>
      </div>`}).join(""),d=`<div class="mp-dl-c">
      <div class="dl-t1">${e.dayGanZhi}日　${e.hourZhi}时</div>
      <div class="dl-t2">${e.dayNight}贵 · 月将 ${e.yueJiang.name}${e.yueJiang.zhi} · 贵人${e.guiren.reverse?"逆":"顺"}行</div>
      <div class="dl-t3">${i.chu.zhi} → ${i.zhong.zhi} → ${i.mo.zhi}</div>
      <div class="dl-t2">节气 ${e.jieqi.name}${e.jieqi.time?" "+e.jieqi.time:""}</div>
    </div>`;return n.briefHTML(e)+`<div class="pp mp-dl">
      <div class="mp-dl-head">日 ${e.dayGanZhi}　时 ${e.hourZhi}（${e.dayNight}贵）　月将 ${e.yueJiang.name}${e.yueJiang.zhi}　节气 ${e.jieqi.name}　贵人${e.guiren.reverse?"逆":"顺"}行</div>
      <div class="mp-dl-sc">${o(i.chu,"初传")}${o(i.zhong,"中传")}${o(i.mo,"末传")}${l}</div>
      <div class="mp-dl-sk">${r}</div>
      <div class="mp-dl-pan2">${c}${d}</div>
      ${(e.shensha||[]).length?`<div class="mp-dl-ss"><b>神煞</b>${e.shensha.map(u=>`<span title="${t(u.note||"")}">${u.name}<i>${u.branch}</i></span>`).join("")}</div>`:""}
      <div class="mp-dl-legend"><span>大字＝天盘支</span><span>小字＝地盘（固定十二支）</span><span>右下＝天将</span></div>
    </div>`},n.tarotHTML=function(e){const i=e.cards.map(r=>`
      <div class="mp-tt-card ${r.upright?"tt-up":"tt-rev"}">
        <div class="mp-tt-pos" title="${t(r.positionHint||"")}">${r.position}</div>
        <div class="mp-tt-name">${r.name}${r.number?`<span class="mp-tt-no">${r.number}</span>`:""}</div>
        ${r.en?`<div class="mp-tt-en">${r.en}</div>`:""}
        <div class="mp-tt-ori">${r.orientation}</div>
        ${r.image?`<div class="mp-tt-img">牌面：${r.image}</div>`:""}
        ${r.core?`<div class="mp-tt-core">${r.core}</div>`:""}
        <div class="mp-tt-kw">${r.keywords.map(c=>`<span>${c}</span>`).join("")}</div>
        <div class="mp-tt-el">${r.arcana} · ${r.element}${r.suit?" · "+r.suit+(r.rankCn?r.rankCn:""):""}${r.domain?" · "+r.domain:""}${r.astro?` · ${r.astro}`:r.role?` · ${r.role}`:""}</div>
      </div>`).join(""),o=e.question?t(e.question):'<span class="pp-dim">（未填写，可在上方输入后重抽）</span>',l=(e.reading||[]).map(r=>`<p>${t(r)}</p>`).join("");return n.briefHTML(e)+`<div class="pp mp-tt">
      <div class="mp-tt-q"><b>所问</b>${o}</div>
      <div class="mp-tt-head">${e.spread}${e.castAt?`　·　抽牌于 ${e.castAt}`:""}</div>
      <div class="mp-tt-grid">${i}</div>
      <div class="mp-tt-read"><div class="mp-tt-rt">牌面解读</div>${l}</div>
      <div class="mp-tt-note"><div class="mp-tt-rt">你的记录</div>
        <textarea class="mp-tt-ta" rows="4" placeholder="写下判断或对照后的想法……（仅本页可见，不保存）"></textarea>
      </div>
      ${e.systemNote?`<div class="mp-tt-tip">${e.systemNote}</div>`:""}
      <div class="mp-tt-tip">塔罗用于自我觉察与娱乐，不作确定性预言。</div>
    </div>`};const Ua=e=>{if(!e||!Array.isArray(e.pairs)||!e.pairs.length)return"";const o='<tr><th scope="col">一对</th><th scope="col">契合度</th>'+(e.pairs[0].dimensions||[]).map(d=>`<th scope="col">${t(d.label)}</th>`).join("")+"</tr>",l=e.pairs.map(d=>`<tr><th scope="row">${t(d.a)} × ${t(d.b)}</th><td>${d.total==null?"—":`${t(d.total)}/100`}<span class="mp-hp-lv">${t(d.level||"")}</span></td>`+(d.dimensions||[]).map(u=>`<td>${u.score>=0?"+":""}${t(u.score)}</td>`).join("")+"</tr>").join(""),r=e.spread>=3&&e.best?`最顺：<b>${t(e.best.a)} × ${t(e.best.b)}</b>（${t(e.best.total)}/100）`+(e.hardest?`；最需磨合：<b>${t(e.hardest.a)} × ${t(e.hardest.b)}</b>（${t(e.hardest.total)}/100）`:""):`三对分数接近（相差 ${t(e.spread)} 分），不排名`,c=e.focus&&e.focus.spread>=3?`<p>差异最大的一维：<b>${t(e.focus.label)}</b>（三对相差 ${t(e.focus.spread)} 分）</p>`:"";return`<div class="mp-hp-triple">
      <div class="mp-hp-ith">三方合盘 · 三对并列</div>
      <table><thead>${o}</thead><tbody>${l}</tbody></table>
      <p>${r}</p>${c}
      <p>${t(e.note||"")}</p>
    </div>`};n.hepanHTML=function(e){const i=(l,r)=>`<div class="mp-hp-side">
      <div class="mp-hp-who">${r}</div>
      <div class="mp-hp-gz">${l.pillars.join(" ")}</div>
      <div class="mp-hp-kv"><span>日主</span><b>${l.dayMaster}</b></div>
      <div class="mp-hp-kv"><span>日支</span><b>${l.dayBranch}</b></div>
      <div class="mp-hp-kv"><span>强弱</span><b>${l.strength||"—"}</b></div>
      <div class="mp-hp-kv"><span>喜用</span><b>${l.favor||"—"}</b></div>
    </div>`,o=e.dimensions.map(l=>`<div class="mp-hp-dim">
      <div class="mp-hp-dimh"><span>${l.label}</span><b class="${l.score>=10?"good":l.score<0?"bad":""}">${l.score>=0?"+":""}${l.score}</b></div>
      <div class="mp-hp-dimt">${l.text}</div>
    </div>`).join("");return n.briefHTML(e)+`<div class="pp mp-hp">
      <div class="mp-hp-head"><b>${e.score.level}</b><span>${e.score.total}/100</span></div>
      <div class="mp-hp-sides">${i(e.a,"你")}${i(e.b,"对方")}</div>
      <div class="mp-hp-dims">${o}</div>
      ${Ua(e.triple)}
      <div class="mp-hp-notes">${e.notes.map(l=>`<p>${l}</p>`).join("")}</div>
    </div>`},n.qimenFactsHTML=function(e){if(!e||!e.palaces)return"";const i=(r,c)=>`<div class="relation__row"><dt>${t(r)}</dt><dd>${t(c)}</dd></div>`,o=r=>r&&["旺","相","休","囚","死"].filter(d=>Array.isArray(r[d])&&r[d].length).map(d=>`${d} ${r[d].join("、")}`).join("；")||"—";return`<dl class="relation mp-qm-facts" aria-label="奇门盘面事实">${[["局数",`${e.ju}${e.yuan?`（${e.yuan}）`:""}`],["节气",`${e.jieqi||"—"}${e.jieqiTime?`（${e.jieqiTime}）`:""}`],["四柱",`${e.siZhu?`${e.siZhu.year} ${e.siZhu.month} ${e.siZhu.day} ${e.siZhu.time}`:"—"}`],["值符",e.zhiFu?`${e.zhiFu.star} · ${e.zhiFu.gong}宫`:"—"],["值使",e.zhiShi?`${e.zhiShi.gate} · ${e.zhiShi.gong}宫`:"—"],["旬首",e.xunshou||"—"],["空亡",(e.kongWang||[]).join("")||"—"],["驿马",e.ma&&e.ma.zhi?`${e.ma.zhi}${e.ma.gong?`（${e.ma.gong}宫）`:""}`:"—"],["换局规则",e.juMethodNote||e.juMethod||"—"],["晚子时",e.lateZiHourMode==="next-day"?"23:00 后归次日":"23:00 后仍归当日"],["击刑",e.conditions&&e.conditions.jiXing&&e.conditions.jiXing.length?e.conditions.jiXing.map(r=>`${r.palace}宫${r.stem}`).join("、"):"本盘无"],["三奇入墓",e.conditions&&e.conditions.ruMu&&e.conditions.ruMu.length?e.conditions.ruMu.map(r=>`${r.palace}宫${r.stem}`).join("、"):"本盘无"],["六仪入墓",e.conditions&&e.conditions.liuYiRuMu&&e.conditions.liuYiRuMu.length?e.conditions.liuYiRuMu.map(r=>`${r.palace}宫${r.stem}`).join("、"):"本盘无"],["十干克应",[...e.palaces||[],e.centerPalace].filter(c=>c&&c.ganYing).map(c=>`${c.palace}宫 ${c.ganYing.tian}加${c.ganYing.di}「${c.ganYing.name}」`).join("；")||"—"],["月令",e.month&&e.month.branch?`${e.month.branch}（${e.month.element}）`:"—"],["门旺衰",o(e.states&&e.states.gate)],["星旺衰",o(e.states&&e.states.star)],["干旺衰",o(e.states&&e.states.stem)],["干宫生克",(()=>{const r=["干克宫","宫克干","干生宫","宫生干","比和"],c={};for(const d of e.palaces||[]){const u=d.stemRelation||null;!u||u.type==="unknown"||!d.tianPan||(c[u.type]=c[u.type]||[]).push(d.tianPan)}return r.filter(d=>c[d]).map(d=>d+" "+c[d].join("、")).join("；")||"—"})()]].map(([r,c])=>i(r,c)).join("")}</dl>`};const ni=[["4","9","2"],["3","5","7"],["8","1","6"]];n.qimenHTML=function(e){const i={};for(const l of e.palaces)i[l.palace]=l;const o=l=>{if(l==="5")return`<div class="pp-qm-cell center">
          <div class="pp-qm-ju">${e.ju}</div>
          <div class="pp-qm-kv">${e.siZhu.year} ${e.siZhu.month}</div>
          <div class="pp-qm-kv">${e.siZhu.day} ${e.siZhu.time}</div>
          <div class="pp-qm-kv dim">${e.jieqi} ${e.yuan}</div>
        </div>`;const r=i[l]||{};return`<div class="pp-qm-cell">
        <div class="pp-qm-top"><span class="god">${r.god||""}</span><span class="mk">${r.kong?"空":""}${r.ma?"马":""}</span></div>
        <div class="pp-qm-mid"><span class="tp">${r.tianPan||""}</span><span class="star">${r.star||""}</span></div>
        <div class="pp-qm-mid"><span class="dp">${r.diPan||""}</span><span class="gate">${r.gate||""}</span></div>
        <div class="pp-qm-bot"><span>${r.anGan||""}</span><span class="no">${l}</span></div>
        <div class="pp-qm-bot"><span class="dim">${r.stemRelation&&r.stemRelation.type!=="unknown"?r.stemRelation.type:""}</span><span class="dim">${r.stemState||""}</span></div>
        <div class="pp-qm-bot"><span class="dim">${r.ganYing?t(`${r.ganYing.tian}加${r.ganYing.di} ${r.ganYing.name}`):""}</span></div>
      </div>`};return n.briefHTML(e)+`<div class="pp mp-qm">
      <div class="mp-qm-head">
        <b>${e.ju}</b>
        <span>${e.siZhu.year} ${e.siZhu.month} ${e.siZhu.day} ${e.siZhu.time}</span>
        <span>节气 ${e.jieqi}（${e.jieqiTime}）</span>
        <span>值符 ${e.zhiFu.star}（${e.zhiFu.gong}宫）　值使 ${e.zhiShi.gate}（${e.zhiShi.gong}宫）</span>
        <span>旬首 ${e.xunshou}　空亡 ${e.kongWang.join("")||"—"}　驿马 ${e.ma.zhi||"—"}</span>
      </div>
      <div class="mp-qm-grid">${ni.map(l=>l.map(o).join("")).join("")}</div>
      <div class="mp-qm-legend">上＝九星　中＝天盘干／八门　下＝地盘干／宫号　角落＝八神</div>
      <div class="mp-qm-rules">${e.rules.map(l=>`<p>${l}</p>`).join("")}</div>
    </div>`},n.ziweiHepanHTML=function(e){const i=(r,c)=>`<div class="mp-hp-side">
      <div class="mp-hp-who">${c}</div>
      <div class="mp-hp-gz">命宫 ${r.soul.branch}　夫妻 ${r.soul.branch,""}${r.spouseStars.length,""}</div>
      <div class="mp-hp-kv"><span>命宫主星</span><b>${r.soulStars.join("、")||"无正曜"}</b></div>
      <div class="mp-hp-kv"><span>夫妻宫主星</span><b>${r.spouseStars.join("、")||"无正曜"}</b></div>
      <div class="mp-hp-kv"><span>五行局</span><b>${r.bureau}</b></div>
      <div class="mp-hp-kv"><span>身宫</span><b>${r.body.branch}（${r.body.lands||"—"}）</b></div>
      <div class="mp-hp-kv"><span>生年四化</span><b>${r.natalSihua.join("、")}</b></div>
    </div>`,o=e.dimensions.map(r=>`<div class="mp-hp-dim">
      <div class="mp-hp-dimh"><span>${r.label}</span><b class="${r.score>=10?"good":r.score<0?"bad":""}">${r.score>=0?"+":""}${r.score}</b></div>
      <div class="mp-hp-dimt">${r.text}</div>
    </div>`).join(""),l=r=>(e.interactions||[]).filter(c=>c.who===r).map(c=>`<li><b class="m-${c.mutagen}">${c.mutagen}</b>${c.star}：本命${c.ownPalace} → 对方${c.landingPalace||"盘外"}${c.strong?"<i>（强）</i>":""}</li>`).join("");return n.briefHTML(e)+`<div class="pp mp-hp">
      <div class="mp-hp-head"><b>${e.score.level}</b><span>${e.score.total}/100　紫微合盘</span></div>
      <div class="mp-hp-sides">${i(e.a,"你")}${i(e.b,"对方")}</div>
      <div class="mp-hp-dims">${o}</div>
      <div class="mp-hp-inter">
        <div><div class="mp-hp-ith">你的四化 落在对方</div><ul>${l("你")||"<li>无</li>"}</ul></div>
        <div><div class="mp-hp-ith">对方的四化 落在你</div><ul>${l("对方")||"<li>无</li>"}</ul></div>
      </div>
      ${Ua(e.triple)}
      <div class="mp-hp-notes">${e.notes.map(r=>`<p>${r}</p>`).join("")}</div>
    </div>`},n.curveHTML=function(e){const i=e&&e.dayun&&Array.isArray(e.dayun.list)?e.dayun.list:[],o=e&&Array.isArray(e.liunian)?e.liunian:[];if(i.length<2)return"";const l=P=>typeof P=="number"&&isFinite(P)?P:0,r=P=>P.luck?l(P.luck.score):0,c=4.2,d=-2.2,u=l(e.dayun.startAge&&e.dayun.startAge.years),m=i.length?i[i.length-1].startAge+10:u+80,f=o.map(P=>l(P.age)).filter(P=>P>0),h=Math.min(u,...f.length?f:[u]),j=Math.max(m,...f.length?f:[m]),z=Math.max(1,j-h),A=640,C=190,O={t:14,r:16,b:26,l:30},ie=A-O.l-O.r,G=C-O.t-O.b,R=P=>O.l+(P-h)/z*ie,ee=P=>O.t+G-(Math.max(d,Math.min(c,P))-d)/(c-d)*G,q=[{from:1.2,to:c,cls:"b-good"},{from:.55,to:1.2,cls:"b-good"},{from:-.8,to:.55,cls:"b-flat"},{from:-1.45,to:-.8,cls:"b-bad"},{from:d,to:-1.45,cls:"b-bad"}].map(P=>`<rect class="cv-band ${P.cls}" x="${O.l}" y="${ee(P.to).toFixed(1)}" width="${ie}" height="${(ee(P.from)-ee(P.to)).toFixed(1)}"/>`).join(""),de=10/z*ie,J=[];i.forEach((P,Ce)=>{const Ze=l(P.startAge),Fe=r(P),Re=Math.max(O.l,R(Ze)),Le=Math.min(O.l+ie,R(Ze+10));J.push(`${Re.toFixed(1)},${ee(Fe).toFixed(1)}`),J.push(`${Le.toFixed(1)},${ee(Fe).toFixed(1)}`)});const qe=J.length?`<polyline class="cv-dy" points="${J.join(" ")}"/>`:"",Y=J.length?`<polygon class="cv-dyfill" points="${O.l},${(O.t+G).toFixed(1)} ${J.join(" ")} ${(O.l+ie).toFixed(1)},${(O.t+G).toFixed(1)}"/>`:"",$e=o.filter(P=>P.luck&&typeof P.luck.score=="number").map(P=>({x:R(l(P.age)),y:ee(l(P.luck.score)),y0:l(P.year),gz:P.ganzhi,tier:P.luck.tier,v:l(P.luck.score),age:l(P.age)})),X=$e.length>1?`<polyline class="cv-ln" points="${$e.map(P=>`${P.x.toFixed(1)},${P.y.toFixed(1)}`).join(" ")}"/>`:"",ce={大吉:"var(--lu)",吉:"var(--lu)",平:"var(--muted)",忌:"var(--red)",大忌:"var(--red)"},w=$e.length?Math.min(...$e.map(P=>P.y0)):null,S=$e.map(P=>`<circle class="cv-dot${P.y0===w?" now":""}" cx="${P.x.toFixed(1)}" cy="${P.y.toFixed(1)}" fill="${ce[P.tier]||"var(--muted)"}"><title>${t(`${P.y0}年（${P.age}岁）${P.gz}　${P.tier} ${P.v}`)}</title></circle>`).join(""),L=`<line class="cv-ax zero" x1="${O.l}" y1="${ee(0).toFixed(1)}" x2="${O.l+ie}" y2="${ee(0).toFixed(1)}"/><line class="cv-ax" x1="${O.l}" y1="${O.t}" x2="${O.l}" y2="${O.t+G}"/>`,y=z>60?10:5,ae=[];for(let P=Math.ceil(h/y)*y;P<=j;P+=y)ae.push(`<text class="cv-lbl age" x="${R(P).toFixed(1)}" y="${(O.t+G+13).toFixed(1)}" text-anchor="middle">${P}岁</text>`);const ge=`<text class="cv-lbl" x="${(O.l-5).toFixed(1)}" y="${(ee(2.4)+3).toFixed(1)}" text-anchor="end">吉</text><text class="cv-lbl" x="${(O.l-5).toFixed(1)}" y="${(ee(0)+3).toFixed(1)}" text-anchor="end">平</text><text class="cv-lbl" x="${(O.l-5).toFixed(1)}" y="${(ee(-1.8)+3).toFixed(1)}" text-anchor="end">忌</text>`,xe=i.slice().sort((P,Ce)=>r(Ce)-r(P)),E=xe[0],ne=xe[xe.length-1],Q=E&&r(E)>.55?`<text class="cv-lbl" x="${R(l(E.startAge)+5).toFixed(1)}" y="${(ee(r(E))-5).toFixed(1)}" text-anchor="middle">▲${E.startAge}岁 ${E.luck.tier}</text>`:"",re=ne&&r(ne)<-.8?`<text class="cv-lbl" x="${R(l(ne.startAge)+5).toFixed(1)}" y="${(ee(r(ne))+11).toFixed(1)}" text-anchor="middle">▼${ne.startAge}岁 ${ne.luck.tier}</text>`:"",ve=`<div class="cv-legend">
      <span><i style="background:var(--quan)"></i>大运（阶梯，一步十年）</span>
      <span><i style="background:var(--ke)"></i>流年（逐年折线）</span>
      <span>绿带＝吉　灰带＝平　红带＝忌</span>
    </div>`,Se=`<div class="cv-tip">曲线只呈现引擎已给出的行运评分（${d} ~ ${c}），不预测具体事件；档位与依据见下方「大运 / 流年」各节。悬停看逐年详情。</div>`;return`<div class="mp-curve">
      <div class="mp-curve-h"><b>人生运势曲线</b><span>${h}–${j} 岁　${e.dayun.rule}，${u} 岁起运${e.dayun.jiao&&e.dayun.jiao.at?`，交运 ${e.dayun.jiao.at}`:""}</span></div>
      <svg viewBox="0 0 ${A} ${C}" role="img" aria-label="人生运势曲线：${h} 到 ${j} 岁的大运与流年评分走势">
        ${q}${L}${Y}${qe}${X}${S}${ae.join("")}${ge}${Q}${re}
      </svg>
      ${ve}${Se}
    </div>`},n.trendChart=function(e){const i=e&&Array.isArray(e.points)?e.points:[];if(i.length<2)return"";const o=e&&Array.isArray(e.segments)?e.segments:[],l=E=>typeof E=="number"&&isFinite(E)?E:0,r=720,c=322,d={t:34,r:46,b:66,l:36},u=r-d.l-d.r,m=c-d.t-d.b,f=i.length,h=u/f,j=E=>d.l+(E+.5)*h,z=E=>d.t+m-Math.max(0,Math.min(100,E))/100*m,A=Math.max(1.1,Math.min(10,h*.62)),C=E=>l(E.score),O=d.t+m,ie=O+20,G=22,ee=`klclip${(()=>{let E=2166136261;const ne=Q=>{const re=String(Q??"");for(let ve=0;ve<re.length;ve++)E^=re.charCodeAt(ve),E=Math.imul(E,16777619)};ne(f),ne(i[0]&&i[0].age),ne(i[f-1]&&i[f-1].age);for(const Q of i)ne(Q&&Q.score);return(E>>>0).toString(36)})()}`,v=o.map((E,ne)=>{const Q=Math.max(0,E.startAge-1),re=Math.min(f-1,E.endAge-1);if(re<Q)return"";const ve=d.l+Q*h,Se=Math.max(.6,(re-Q+1)*h),Ce=ne%2===1?`<rect class="kl-band" x="${ve.toFixed(1)}" y="${d.t}" width="${Se.toFixed(1)}" height="${m}"/><rect class="kl-stripband" x="${ve.toFixed(1)}" y="${ie}" width="${Se.toFixed(1)}" height="${G}"/>`:"",Ze=ne===0?"":`<line class="kl-segline" x1="${ve.toFixed(1)}" y1="${d.t}" x2="${ve.toFixed(1)}" y2="${O}"/>`,Fe=Math.min(Math.max(d.l+(Q+re+1)/2*h,d.l+22),d.l+u-22);return Ce+Ze+`<text class="kl-seg" x="${Fe.toFixed(1)}" y="${(ie+15).toFixed(1)}" text-anchor="middle">${t(E.ganZhi)}</text>`}).join(""),q=[0,25,50,75,100].map(E=>`<line class="kl-grid${E===50?" mid":""}" x1="${d.l}" y1="${z(E).toFixed(1)}" x2="${d.l+u}" y2="${z(E).toFixed(1)}"/><text class="kl-lbl" x="${d.l-6}" y="${(z(E)+3).toFixed(1)}" text-anchor="end">${E}</text>`).join(""),de=i.map((E,ne)=>{const Q=E.kline||{},re=l(Q.open),ve=l(Q.close),Se=Math.min(100,l(Q.high)),P=Math.max(0,l(Q.low)),Ce=ve>=re,Ze=z(re),Fe=z(ve),Re=Math.min(Ze,Fe),Le=Math.max(.8,Math.abs(Ze-Fe)),ya=j(ne),je=`${E.age}岁（${E.year}年 ${E.ganZhi}）${ve}分${E.dayunGanZhi?` · ${E.dayunGanZhi}运`:""}`;return`<g class="kl-c${Ce?" up":" down"}"><title>${t(je)}</title><line x1="${ya.toFixed(2)}" y1="${z(Se).toFixed(1)}" x2="${ya.toFixed(2)}" y2="${z(P).toFixed(1)}"/><rect x="${(ya-A/2).toFixed(2)}" y="${Re.toFixed(1)}" width="${A.toFixed(2)}" height="${Le.toFixed(1)}" rx="0.7"/></g>`}).join(""),J=E=>{const ne=[];for(let Q=0;Q<f;Q++){if(Q+1<E)continue;let re=0;for(let ve=Q+1-E;ve<=Q;ve++)re+=C(i[ve]);ne.push({i:Q,v:re/E})}return ne},qe=E=>J(E).map((ne,Q)=>`${Q?"L":"M"}${j(ne.i).toFixed(1)} ${z(ne.v).toFixed(1)}`).join(" "),Y=(E,ne)=>{const Q=J(E);if(!Q.length)return"";const re=Q[Q.length-1];return{cls:ne,y:z(re.v),text:`<text class="kl-ma-lbl ${ne}" x="${d.l+u+5}" y="${z(re.v).toFixed(1)}" text-anchor="start">${re.v.toFixed(0)}</text>`}},$e=Y(10,"m10"),X=Y(5,"m5"),ce=(()=>{if(!X||!$e)return`${$e?$e.text:""}${X?X.text:""}`;let E=X.y,ne=$e.y;if(Math.abs(E-ne)<10){const Q=Math.min(E,ne),re=Math.max(E,ne);E=Q-6,ne=re+6}return`<text class="kl-ma-lbl m10" x="${d.l+u+5}" y="${ne.toFixed(1)}" text-anchor="start">${J(10).slice(-1)[0].v.toFixed(0)}</text><text class="kl-ma-lbl m5" x="${d.l+u+5}" y="${E.toFixed(1)}" text-anchor="start">${J(5).slice(-1)[0].v.toFixed(0)}</text>`})();let w=i[0],S=i[0];for(const E of i)C(E)>C(w)&&(w=E),C(E)<C(S)&&(S=E);const L=(E,ne,Q)=>{const re=i.indexOf(E),ve=j(re),Se=z(C(E)),P=Math.min(Math.max(ve,d.l+26),d.l+u-26),Ce=ne==="hi"?Se-8<d.t+6?14:Q:Se+12>d.t+m-2?-8:Q;return`<g class="kl-mark ${ne}"><circle cx="${ve.toFixed(1)}" cy="${Se.toFixed(1)}" r="2"/><circle class="ring" cx="${ve.toFixed(1)}" cy="${Se.toFixed(1)}" r="4.6"/><text x="${P.toFixed(1)}" y="${(Se+Ce).toFixed(1)}" text-anchor="middle">${E.age}岁 ${C(E)}</text></g>`},y=f>60?10:5,ae=i.filter(E=>E.age%y===0).map(E=>`<text class="kl-lbl age" x="${j(i.indexOf(E)).toFixed(1)}" y="${(O+14).toFixed(1)}" text-anchor="middle">${E.age}</text>`).join(""),ge=`<text class="kl-lbl axis" x="${d.l}" y="${(c-6).toFixed(1)}">年龄（岁）</text><text class="kl-lbl axis" x="${d.l+u}" y="${(c-6).toFixed(1)}" text-anchor="end">每岁一分 · 满分 100</text>`;return`<div class="mp-kline-fig">
      <svg viewBox="0 0 ${r} ${c}" role="img" aria-label="人生K线：1 到 ${f} 岁的逐年评分蜡烛图">
        <defs><clipPath id="${ee}"><rect x="${d.l}" y="${d.t}" width="${u}" height="${m}"/></clipPath></defs>
        ${v}${q}
        <g clip-path="url(#${ee})">
          ${de}
          <path class="kl-ma m10" d="${qe(10)}"/><path class="kl-ma m5" d="${qe(5)}"/>
        </g>
        ${ce}
        ${L(w,"hi",-8)}${L(S,"lo",12)}
        ${ae}${ge}
      </svg><div class="kl-legend"><span><i class="up"></i>阳线：比上一岁高</span><span><i class="down"></i>阴线：比上一岁低</span><span><i class="m5"></i>5 年均线</span><span><i class="m10"></i>10 年均线</span><span>虚线＝大运交界</span></div></div>`},n.trendHTML=function(e,i){if(!e)return"";const o=!(i&&i.brief===!1),l=n.trendChart(e);if(!l)return n.quickHTML(e);const r=Array.isArray(e.segments)?e.segments:[],c=e.highlights&&typeof e.highlights=="object"?e.highlights:{},d=e.meta||{},u=d.strength||{},m=r.map(q=>`<span class="kl-chip">${t(q.ganZhi)}<em>${q.startAge}–${q.endAge}</em></span>`).join(""),f=(Array.isArray(c.best)?c.best:[]).map(q=>`<div class="kl-hl hi">${t(q)}</div>`).join(""),h=(Array.isArray(c.worst)?c.worst:[]).map(q=>`<div class="kl-hl lo">${t(q)}</div>`).join(""),j=d.boundaryNote?`<div class="mp-kline-note">${t(d.boundaryNote)}</div>`:c.suppressed?`<div class="mp-kline-note">${t(c.suppressed)}</div>`:"",z=Array.isArray(e.points)?e.points:[],A=q=>typeof q.score=="number"&&isFinite(q.score)?q.score:0,C=z.map(A),O=C.length?C.reduce((q,de)=>q+de,0)/C.length:0,ie=C.length?Math.max(...C)-Math.min(...C):0,G=r.map(q=>{const de=z.filter(J=>J.age>=q.startAge&&J.age<=q.endAge).map(A);return{ganZhi:q.ganZhi,v:de.length?de.reduce((J,qe)=>J+qe,0)/de.length:0}}).filter(q=>q.v>0).sort((q,de)=>de.v-q.v),R=!!(u.boundary||c.suppressed),ee=[`<span><em>全段均值</em><b>${O.toFixed(0)}</b></span>`];!R&&G.length&&(ee.push(`<span><em>最好大运</em><b class="hi">${t(G[0].ganZhi)} ${G[0].v.toFixed(0)}</b></span>`),ee.push(`<span><em>最差大运</em><b class="lo">${t(G[G.length-1].ganZhi)} ${G[G.length-1].v.toFixed(0)}</b></span>`)),ee.push(`<span><em>波动幅度</em><b>${ie.toFixed(0)}</b></span>`);const v=`<div class="kl-stats">${ee.join("")}</div>`;return(o?n.briefHTML(e):"")+`<section class="mp-kline" aria-label="人生K线结果">
      <div class="mp-kline-h"><b>人生 K 线</b><span>${t(d.birth||"")}　日主 ${t(d.dayMaster||"")}　${t(u.level||"")}${u.score?`（${u.score}）`:""}</span></div>
      ${l}
      ${v}
      ${m?`<div class="kl-segs">${m}</div>`:""}
      ${f||h?`<div class="kl-hls">${f}${h}</div>`:""}
      ${j}
      <div class="mp-kline-tip">逐岁分数由大运与流年十神按固定表确定性计分（1–100），只表五行力量的顺逆，不预测具体事件；旺衰落在换档阈值附近时，不出高低年份结论。</div>
    </section>`},n.chengguHTML=function(e){if(!e)return"";const i=e.weights||{},o=e.song||{},l=["year","month","day","hour"].map(u=>{const m=i[u]||{label:"",qian:0},f=String(m.label||"").split(" ")[0]||"",h=String(m.label||"").split(" ")[1]||"";return`<div class="cg-cell"><em>${t(f)}</em><b>${t(h)}</b></div>`}).join(""),r=String(o.text||""),c=r?r.replace(/[。]$/,"").split("；").map((u,m)=>`<span>${t(u)}${m===0?"；":"。"}</span>`).join(""):"",d=e.verdict&&e.verdict.band?e.verdict.band:"";return`<section class="mp-cg" aria-label="称骨结果">
      <div class="mp-cg-h"><b>称骨</b><span>${t(e.lunar&&e.lunar.text?e.lunar.text:"")}</span></div>
      <div class="mp-cg-w">${l}</div>
      <div class="mp-cg-tot"><em>骨重合计</em><b>${t(e.total&&e.total.label?e.total.label:"")}</b>${d?`<i>${t(d)}</i>`:""}</div>
      <div class="mp-cg-song"><div class="mp-cg-song-h">称骨歌 · ${t(e.total&&e.total.label?e.total.label:"")}</div>
        <div class="mp-cg-verse">${c||'<span class="mp-cg-miss">该骨重未见通行本歌诀</span>'}</div>
        <div class="mp-cg-plain"><em>释义</em>${t(o.plain||"")}</div></div>
      ${e.verdict&&e.verdict.text?`<div class="mp-cg-band"><em>分档</em>${t(e.verdict.text)}</div>`:""}
      <div class="mp-cg-note">骨重与歌诀为通行本口径（各版本歌诀有异文，断句标点已统一）；释义为白话自撰，只作字面直解，属民俗娱乐参考，不构成命运断言。</div>
    </section>`},n.nameHTML=function(e){if(!e)return"";const i={木:"wood",火:"fire",土:"earth",金:"metal",水:"water"},o=f=>f==="未收录"?'<span class="mp-nm-el">未收录</span>':`<span class="mp-nm-el wx-${i[f]||"earth"}">${t(f)}</span>`,l=(f,h)=>`<div class="mp-nm-h"><b>${t(f)}</b>${h?`<i>${t(h)}</i>`:""}</div>`;if(e.action==="generate"){const f=e.bazi&&e.bazi.favorable?e.bazi.favorable.join("、"):"",h=(e.candidates||[]).map(j=>{const z=j.wuge&&j.wuge.available?(()=>{const C=j.wuge.rows.filter(G=>G.level==="吉").length,O=j.wuge.rows.filter(G=>G.level==="凶").length;return`<span class="mp-nm-fit${O===0&&C>=4?" ok":O>=2?" no":""}" title="${t(j.wuge.summary)}">五格 ${C}/5 吉</span>`})():"",A=j.phonetics&&j.phonetics.available?`<span class="mp-nm-fit${j.phonetics.level==="拗口"?" no":j.phonetics.level==="顺口"?" ok":""}" title="${t((j.phonetics.issues||[]).map(C=>C.text).join("；"))}">${t(j.phonetics.level)}</span>`:"";return`<div class="mp-nm-c"><b>${t(j.name)}</b><span class="mp-nm-els">${j.chars.map(C=>o(C.element)).join("")}${z}${A}</span><em>${t(j.chars.map(C=>C.char+"·"+C.meaning).join("　"))}</em></div>`}).join("");return`<section class="mp-nm" aria-label="候选名">
        ${l("候选名",`姓 ${e.surname}（${e.gender}）${f?`　喜用 ${f}`:""}`)}
        <div class="mp-nm-cand">${h}</div>
        <div class="mp-nm-note">${(e.notes||[]).map(j=>"※ "+t(j)).join("<br>")}</div>
      </section>`}const r=(e.chars||[]).map(f=>{const h=f.favorable===!0?'<span class="mp-nm-fit ok">合喜用</span>':f.favorable===!1?'<span class="mp-nm-fit no">不合喜用</span>':'<span class="mp-nm-fit">不判</span>',j=f.source==="user"?"用户指定":f.source==="lib"?"字库":"未收录",z=f.suggest&&f.suggest.length?`<div class="mp-nm-sug"><b>可换</b>${f.suggest.map(A=>`<span class="wx-${i[A.element]||"earth"}">${t(A.char)}（${t(A.element)}）</span>`).join("")}</div>`:"";return`<div class="mp-nm-row"><div class="mp-nm-ch">${t(f.char)}</div>
        <div class="mp-nm-b"><div class="mp-nm-t">${o(f.element)}<span>${t(j)}</span>${h}</div>
        <div class="mp-nm-m">${t(f.meaning)}</div>${z}</div></div>`}).join(""),c=e.bazi?`<div class="mp-nm-m">八字：${t(e.bazi.dayMaster&&e.bazi.dayMaster.stem?`${e.bazi.dayMaster.stem}（${e.bazi.dayMaster.element}）`:String(e.bazi.dayMaster||""))}　${t(e.bazi.strength?`${e.bazi.strength.level}（${e.bazi.strength.score}）`:"")}　喜用 ${t((e.bazi.favorable||[]).join("、"))}</div>
         <div class="mp-nm-m">${t(e.bazi.basis||"")}</div>`:"",d=f=>f==="吉"?"is-ok":f==="半吉"?"is-half":"is-bad",u=e.wuge&&e.wuge.available?`<div class="mp-nm-wu">
          <div class="mp-nm-wu-h"><b>五格</b><i>康熙笔画 · 通行本 81 数理</i></div>
          <div class="mp-nm-wu-rows">${e.wuge.rows.map(f=>`<div class="mp-nm-wu-c ${d(f.level)}"><em>${t(f.key)}</em><b>${f.strokes}</b><i>${t(`${f.level} · ${f.name}`)}</i></div>`).join("")}</div>
          <div class="mp-nm-m">笔画：${e.wuge.strokes.map(f=>`${t(f.char)}${f.strokes}${f.source==="user"?"（指定）":""}`).join(" ＋ ")}</div>
          <div class="mp-nm-m">三才：${t(e.wuge.sancai.text)}</div>
        </div>`:`<div class="mp-nm-wu"><div class="mp-nm-wu-h"><b>五格</b><i>这一版算不了</i></div><div class="mp-nm-m">${t(e.wuge?e.wuge.reason:"未算")}</div></div>`,m=e.phonetics&&e.phonetics.available?`<div class="mp-nm-ph"><b>音韵</b><span class="mp-nm-ph-lv${e.phonetics.level==="顺口"?" ok":e.phonetics.level==="拗口"?" bad":" warn"}">${t(e.phonetics.level)}</span><em>${t(e.phonetics.chars.map(f=>`${f.py}${f.tone}`).join(" "))}　声调 ${t(e.phonetics.tonePattern)}${(e.phonetics.alt||[]).length?`　又读 ${t(e.phonetics.alt.map(f=>`${f.char} ${f.py}${f.tone}`).join("、"))}`:""}</em>${(e.phonetics.issues||[]).map(f=>`<span class="mp-nm-ph-i">${t(f.text)}</span>`).join("")}</div>`:`<div class="mp-nm-ph"><b>音韵</b><em>${t(e.phonetics?e.phonetics.reason:"未算")}</em></div>`;return`<section class="mp-nm" aria-label="名字评估">
      ${l(e.fullName||"",`字库 ${e.stats&&e.stats.libSize?e.stats.libSize:""} 字${e.stats&&e.stats.unknown?`　未收录 ${e.stats.unknown}`:""}`)}
      ${r}
      ${c}
      ${u}
      ${m}
      <div class="mp-nm-verd">${t(e.verdict||"")}</div>
      <div class="mp-nm-note">${(e.notes||[]).map(f=>"※ "+t(f)).join("<br>")}</div>
    </section>`},n.briefHTML=function(e){return e?e.brief?n.summaryHTML(e.brief):n.factHeadHTML(e.factHead):""},n.oneLineHTML=function(e,i){if(!e||!e.strength||!e.strength.level)return"";const o=i||{},l=o.life||null,r=o.marriage||null,c=e.dayMaster||{},d=e.pillars&&e.pillars.month&&e.pillars.month.branch||"",u=`${c.stem||""}${c.element||""}${e.strength.level}${d?`，生${d}月`:""}`,m=[],f=l&&l.career&&l.career.type&&l.career.type.label;if(f&&m.push(`事业偏${String(f).split("、")[0]}`),l&&l.wealth&&l.wealth.tier){const A=String(l.wealth.tier).split("（")[0];m.push(A==="平"?"财平":`财是${A}`)}const h=r&&r.types&&r.types[0];h&&h.label&&m.push(`婚缘${String(h.label).replace(/型$/,"")}`);const j=r&&r.windows?r.windows.filter(A=>!A.past)[0]:null;return j&&m.push(`最可能动在 ${j.year} 年（${j.age}岁）`),`<section aria-label="一眼看" style="margin:10px 0 0;padding:9px 12px;border-left:3px solid var(--gold)"><p style="margin:0;line-height:1.65">${m.length?`<b>一眼看</b>　${t(u)}：${t(m.join("；"))}。`:`${t(u)}。`}</p></section>`},n.summaryHTML=function(e){if(!e||!e.lead)return"";const i=(e.sections||[]).map(r=>`<div class="mp-br-sec"><b>${t(r.h)}</b><p>${t(r.t)}</p></div>`).join(""),o=e.advice&&e.advice.length?`<div class="mp-br-adv"><b>可以试着做的</b><ul>${e.advice.map(r=>`<li>${t(r)}</li>`).join("")}</ul></div>`:"",l=e.chips&&e.chips.length?`<div class="mp-br-chips">${e.chips.map(r=>`<span>${t(r)}</span>`).join("")}</div>`:"";return`<section class="mp-br" aria-label="先说结论">
      <div class="mp-br-h"><b>${t(e.title||"先看这一张")}</b>${l}</div>
      <p class="mp-br-lead">${t(e.lead)}</p>
      ${i}
      ${o}
      ${e.caveat?`<p class="mp-br-cav">※ ${t(e.caveat)}</p>`:""}
      ${e.footer?`<p class="mp-br-foot">${t(e.footer)}</p>`:""}
    </section>`},n.factHeadHTML=function(e){if(!e||!e.headline)return"";const i=(e.facts||[]).map(o=>`<div class="mp-br-sec"><b>${t(o.k)}</b><p>${t(o.v)}</p></div>`).join("");return`<section class="mp-br mp-fh" aria-label="先说结论">
      <div class="mp-br-h"><b>${t(e.kicker||"一览")}</b></div>
      <p class="mp-br-lead">${t(e.headline)}</p>
      ${i}
      ${e.note?`<p class="mp-br-cav">※ ${t(e.note)}</p>`:""}
    </section>`},n.baziHTML=function(e,i){const o=[["year","年柱"],["month","月柱"],["day","日柱"],["hour","时柱"]].filter(([b])=>e.pillars[b]),l={year:"年",month:"月",day:"日",hour:"时"},r={木:"wood",火:"fire",土:"earth",金:"metal",水:"water"},c={比肩:"tg-bi",劫财:"tg-bi",食神:"tg-shi",伤官:"tg-shi",偏财:"tg-cai",正财:"tg-cai",七杀:"tg-guan",正官:"tg-guan",偏印:"tg-yin",正印:"tg-yin"},d=b=>`<span class="tg ${c[b]||""}">${b}</span>`,u=b=>`<span class="wx-${r[b]||"earth"}">${we(b)}${b}</span>`,m=b=>`<span class="ss-s ${b.luck||"neutral"}" title="${t(`${b.cat} · ${b.via}查${b.target} ｜ ${b.rule}`)}">${b.name}</span>`,f=(b,H)=>`<tr><td class="bz-lbl">${b}</td>${o.map(([be])=>`<td data-c="${l[be]}">${H(e.pillars[be],be)}</td>`).join("")}</tr>`,h=`<thead><tr><th></th>${o.map(([b,H])=>`<th${b==="day"?' class="bz-hdr-day"':""}>${H}</th>`).join("")}</tr></thead>`,j={寅:"木",卯:"木",巳:"火",午:"火",申:"金",酉:"金",亥:"水",子:"水",辰:"土",戌:"土",丑:"土",未:"土"},z={木:"火",火:"土",土:"金",金:"水",水:"木"},A={木:"土",土:"水",水:"火",火:"金",金:"木"},C=j[e.pillars.month.branch]||"土",O=["木","火","土","金","水"],ie=b=>b===C?"旺":z[C]===b?"相":z[b]===C?"休":A[b]===C?"囚":"死",G=`<tr><td class="bz-lbl">五行</td><td class="bz-wxs" colspan="${o.length}">${["旺","相","休","囚","死"].map(b=>{const H=O.find(be=>ie(be)===b)||C;return`<i><b class="wx-${r[H]}">${H}</b><em>${b}</em></i>`}).join("")}</td></tr>`,R=[f("十神",(b,H)=>H==="day"?`<span class="bz-zhuri">${e.input.gender==="male"?"元男":"元女"}</span>`:b.stemTenGod?d(b.stemTenGod):'<span class="pp-dim">—</span>'),f("天干",b=>`<span class="bz-big ${"wx-"+r[b.stemElement]}">${b.stem}</span>`),f("地支",b=>`<span class="bz-big ${"wx-"+r[b.branchElement]}">${b.branch}</span>`),f("藏干",b=>b.hidden.map(H=>`<i class="bz-cg wx-${r[H.element]}">${H.stem}·${H.element}</i>`).join("")),f("支神",b=>b.hidden.map(H=>d(H.tenGod)).join("<br>")),f("纳音",b=>b.nayin),f("空亡",b=>`<span class="pp-dim">${b.kongwang.join("")}</span>`),f("地势",b=>b.dishi),f("自坐",b=>b.zizuo),f("神煞",b=>b.shenshaDetail&&b.shenshaDetail.length?`<span class="pp-ss">${b.shenshaDetail.map(m).join("")}</span>`:'<span class="pp-dim">—</span>'),G].join(""),ee=Object.entries(e.wuxing).map(([b,H])=>`<span class="pp-chip wx-${r[b]}">${we(b)}${b} ${H}</span>`).join(""),v=e.frame||{},q=b=>b==="大吉"||b==="吉"?"ok":b==="大忌"||b==="忌"?"warn":"",de=(b,H)=>H?`<div class="pp-sec"><div class="pp-sec-h">${b}</div>${H}</div>`:"",J=v.patternScore,qe=J?`<div class="pp-tl pp-dim" title="${t(J.detail||"")}">成格分 ${J.grade?`${t(J.grade)}　${J.score}/100`:"外格不评分"}　${t(J.verdict||"")}</div>`:"",Y=v.geju&&v.geju.length?`
      <div class="pp-tl">${v.primary?`主格 <b>${t(v.primary.name)}</b>　${t(v.primary.evidence)}`:""}</div>
      <div class="pp-chips">${v.geju.map(b=>{const H=b.status==="破格",be=b.status==="待定"||b.status==="假从",pe=`${b.evidence||""}${Array.isArray(b.breaks)&&b.breaks.length?`；破：${b.breaks.join("；")}`:""}`;return`<span class="pp-chip ${H?"broken":be?"warn":""}" title="${t(pe)}">${t(b.name)}<i class="pp-drel">${t(b.kind)}${b.status?`·${t(b.status)}`:""}</i></span>`}).join("")}</div>${qe}`:"",$e=(()=>{const b=Array.isArray(v.yongshen&&v.yongshen.neutral)?v.yongshen.neutral:[],H=new Set(v.yongshen&&v.yongshen.neutralTenGods||[]);return`${(v.yongshen&&v.yongshen.avoidTenGods||[]).filter(pe=>!H.has(pe)).map(pe=>`<span class="pp-chip warn">${t(pe)}</span>`).join("")}${[...H].map(pe=>`<span class="pp-chip neu" title="局中分量近零，按中性偏忌看">${t(pe)}</span>`).join("")}${b.length?`<span class="pp-chip neu" title="忌神中全局不足 0.5 分的那几行；仍在忌里参与行运评分">中性偏忌 ${b.map(pe=>`${t(pe.element)} ${t(pe.weight)} 分`).join("、")}</span>`:""}`})(),X=v.yongshen?`
      <div class="pp-tl">喜 ${v.yongshen.favor.map(u).join("")}　忌 ${v.yongshen.avoid.map(u).join("")}　<span class="pp-dim">${t(v.yongshen.method)}</span></div>
      <div class="pp-chips">${v.yongshen.favorTenGods.map(b=>`<span class="pp-chip ok">${t(b)}</span>`).join("")}${$e}</div>
      ${(v.yongshen.disputed||[]).length?`<div class="pp-tl pp-dim">有争议：${v.yongshen.disputed.map(b=>`${t(b.element)}（扶抑为${t(b.favorRole)}·${t(b.favorVerb)}，${t(b.climate)}盘调候忌${t(b.element)}）`).join("、")}　保留在喜用，不列入忌</div>`:""}
      ${v.yongshen.combination?`<div class="pp-tl">组合取舍（官杀该制还是该化）</div><div class="pp-chips">${v.yongshen.combination.rows.map(b=>`<span class="pp-chip ${/忌|慎用|耗身/.test(b.action)?"warn":/^(用|可化|可用)/.test(b.action)?"ok":"neu"}" title="${t(b.note)}">${t(b.role)} ${t(b.action)}</span>`).join("")}</div>`:""}
      <div class="pp-tl pp-dim">${t(v.yongshen.detail)}</div>`:"",ce=e.climate||v.yongshen&&v.yongshen.climate||null,w=ce?(()=>{const b=Math.max(2,Math.min(98,Math.round(((Number(ce.temp)||0)+3)/6*100))),H=ce.need?`<em>调候取</em><b>${t(ce.need.stem+ce.need.element)}</b>`:"<em>气候平和</em>",be=!!(v.yongshen&&Array.isArray(v.yongshen.disputed))&&v.yongshen.disputed.some(at=>at.element===ce.avoidElement),pe=ce.need?`<em>忌</em><b>${t(ce.avoidElement)}</b>${be?'<span class="pp-dim">（有争议）</span>':""}`:"",He=(ce.evidence||[]).length?`<em>依据</em><span>${t(ce.evidence.join("、"))}</span>`:"",ke=ce.priority==="调候优先"?'<span class="mp-cli-p">调候优先</span>':'<span class="mp-cli-p">扶抑为主</span>',Pe=e.frame&&e.frame.yongshen&&e.frame.yongshen.qt,ft=Pe?`<div class="mp-qt">
          <div class="mp-qt-h"><b>穷通宝鉴</b><span>${t(Pe.label)}</span></div>
          <div class="mp-qt-y"><em>用神</em>${Pe.yong.map((at,pi)=>`<b class="${pi===0?"first":""}">${t(at)}</b>`).join("")}<em>首取 ${t(Pe.primary)}</em></div>
          <div class="mp-qt-q" title="${t(Pe.quote)}">「${t(Pe.quote)}」<span>第 ${Pe.chapter} 章${Pe.truncated?" · 首段更长，摘句下略":""}${Pe.note?" · "+t(Pe.note):""}</span></div>
        </div>`:"";return`<section class="mp-cli" aria-label="寒暖燥湿">
        <div class="mp-cli-h"><b>寒暖燥湿</b><span class="mp-cli-k">${t(ce.label||"")}</span>${ke}</div>
        <div class="mp-cli-bar" title="寒 ← → 热"><i style="left:${b}%"></i></div>
        <div class="mp-cli-axis"><span>寒</span><span>平</span><span>热</span></div>
        <div class="mp-cli-row">${H}${pe}${He}</div>
        <div class="mp-cli-narr">${t(ce.narration||"")}</div>
        ${ft}
      </section>`})():"",S=v.godStats?`<div class="pp-chips">${Object.entries(v.godStats.groups).map(([b,H])=>`<span class="pp-chip">${b} ${H}</span>`).join("")}</div>`:"",L=e.dayun.list.map(b=>{const H=b.luck||null;return`<span class="pp-chip ${H?q(H.tier):""}" title="${t(`${b.fromDate?`${b.fromDate} 交运；`:""}${H?`${H.tier} ${H.score}｜${(H.reasons||[]).join("；")}`:""}`)}">${b.startAge} ${b.ganzhi}${b.relations&&b.relations.length?` <i class="pp-drel">${b.relations.join("")}</i>`:""}${H?` ${H.tier}`:""}</span>`}).join(""),y=e.liunian&&e.liunian.length?`<div class="pp-chips">${e.liunian.slice(0,8).map(b=>{const H=b.luck||null,be=b.suiyun&&Array.isArray(b.suiyun.signals)?b.suiyun.signals:[],pe=be.length?`｜${be.map(He=>He.detail).join("；")}`:"";return`<span class="pp-chip ${H?q(H.tier):""}" title="${t(H?`${H.tier} ${H.score}｜${(H.reasons||[]).join("；")}${pe}`:pe.replace(/^｜/,""))}">${b.year} ${b.ganzhi}${H?` ${H.tier}`:""}</span>`}).join("")}</div>`:"",ae=(e.liunian||[]).filter(b=>b.suiyun&&Array.isArray(b.suiyun.signals)&&b.suiyun.signals.length),ge=e.suiyunClassic,xe=ge?`<div class="pp-dim pp-sy-src" title="${t(ge.plain||"")}">《${t(ge.bookName||"")}·${t(ge.chapter||"")}》「${t(ge.quote||"")}」</div>`:"",E=ae.length?`<div class="pp-tl pp-dim">岁运提示（只标干支变动，不判吉凶）</div><div class="pp-chips">${ae.map(b=>`<span class="pp-chip" title="${t(`${b.suiyun.signals.map(H=>H.detail).join("；")}｜${b.suiyun.note||""}`)}">${b.year} ${t(b.suiyun.signals.map(H=>`${H.type}${(H.type.startsWith("流年")||H.type.startsWith("大运"))&&H.target?`·${H.target}`:""}`).join("/"))}</span>`).join("")}</div>${xe}`:"",ne=e.strength&&e.strength.boundary&&e.strength.boundary.near&&e.strength.boundary.nearest?`<span class="pp-chip warn" title="${t(e.strength.boundary.plain||"")}">临界·离${t(e.strength.boundary.nearest.to)} ${e.strength.boundary.nearest.gap} 分</span>`:"",Q=e.strength?`<div class="pp-str">日主强弱：<b>${e.strength.level}</b>${e.strength.score}${ne}　<span class="pp-dim">${e.strength.detail}</span></div>`:"",re=e.strength&&e.strength.branchStructure,ve=re?(()=>{const b=re.branches.map(ke=>`${t(ke.label)}${t(ke.branch)}<i class="pp-drel">·${t(ke.camp)}</i>${re.placeholderHour&&ke.key==="hour"?'<span class="pp-dim">占位</span>':""}`).join(" "),H=re.odd&&re.odd.length?`<span class="pp-st-odd">异类 ${re.odd.map(ke=>`${t(ke.label)}${t(ke.branch)}（${ke.weight}分）`).join("、")}</span>`:'<span class="pp-st-odd">无异类</span>',be=re.congProb!=null?`　从格 ${t(re.congRange)}`:"　不套从格概率",pe=re.balance||{},He=pe.branch?`　支 ${pe.branch.A}:${pe.branch.B}　合干 ${pe.total?`${pe.total.A}:${pe.total.B}`:"—"}`:"";return`<div class="pp-struct" title="${t(`${re.method}；${re.note}`)}"><span class="pp-st-code">${t(re.code)}</span>${b}　${H}${be}${He}<span class="pp-dim">　静态结构，只作标注，不改上面的旺衰评分</span></div>`})():"",Se=e.relations&&Array.isArray(e.relations.anhe)?e.relations.anhe:[],P=Se.length?`<div class="pp-anhe" title="${t(e.relations.anheNote||"")}"><b>暗合</b>${Se.map(b=>t(b)).join("　")}<span class="pp-dim">　另列，不并入上面的合冲刑害；${Se.length===1?"只一对，按口径可忽略":`共 ${Se.length} 对`}</span></div>`:"",Ce=e.shensha&&e.shensha.groups||[],Ze=Ce.length?`
      <div class="pp-ssx">
        <div class="ssx-h"><b>神煞全览</b><span>共 ${e.shensha.count} 见 · ${Ce.length} 类 · 悬停看查法</span></div>
        ${Ce.map(b=>`<div class="pp-ssg"><span class="ssg-gt">${b.cat}</span><span class="ssg-gi">${b.items.map(H=>`<span class="pp-ssi ${H.luck||"neutral"}" title="${t(`${H.via}查${H.target} ｜ ${H.rule}`)}">${H.name}<em>${H.pillars.map(be=>l[be]||"").join("")}</em></span>`).join("")}</span></div>`).join("")}
        <div class="ssx-h" style="border-top:none;padding-top:4px;margin-top:4px">神煞只作参考，吉凶仍须看格局、旺衰与行运。</div>
      </div>`:"",Fe=i&&i.marriage,Re=Fe?(()=>{const b=Fe,H=(b.windows||[]).map(be=>`<span class="mp-mar-y${be.past?" past":""}" title="${t(`${be.ganzhi}年 · ${be.dayun?be.dayun+"运 · ":""}${(be.reasons||[]).join("；")}`)}">${be.year}<em>${be.age}岁·${be.kind}</em></span>`).join("");return`<section class="mp-mar" aria-label="婚姻">
        <div class="mp-mar-h"><b>婚姻</b><i class="mp-mar-tag">${t(b.type&&b.type.label||"")}</i></div>
        <div class="mp-mar-yrs">${H||'<span class="pp-dim">20–45 岁未见明显动婚年份</span>'}</div>
        <ol class="mp-mar-lines">${(b.lines||[]).map(be=>`<li>${t(be)}</li>`).join("")}</ol>
        <details class="mp-mar-b"><summary>依据与口径</summary><div>${t(b.basis||"")}</div></details>
      </section>`})():"",Le=i&&i.life,ya=Le?(()=>{const b=Le,H=[["career","事业",b.career],["wealth","财运",b.wealth],["study","学业",b.study],["health","健康",b.health],["children","子女",b.children],["kin","六亲",b.kin]].filter(pe=>pe[2]&&Array.isArray(pe[2].lines)&&pe[2].lines.length);if(!H.length)return"";const be=(pe,He,ke)=>`<div class="mp-life-f" data-face="${pe}"><b>${t(He)}</b>${ke.lines.map(Pe=>`<p>${t(Pe)}</p>`).join("")}</div>`;return`<section class="mp-life" aria-label="人生六面">
        <div class="mp-life-h"><b>人生六面</b><i class="mp-life-tag">事业 · 财运 · 学业 · 健康 · 子女 · 六亲</i></div>
        <div class="mp-life-grid">${H.map(([pe,He,ke])=>be(pe,He,ke)).join("")}</div>
        <details class="mp-life-b"><summary>口径</summary><div>六面共用同一套原料（十神权重、用神喜忌、大运流年），各自口径见每段末尾说明。属规则化读法，不是对具体事件的断言。</div></details>
      </section>`})():"",je=i&&i.chenggu,ri=je?(()=>{const b=je,H=["year","month","day","hour"].map(pe=>{const He=b.weights&&b.weights[pe]||{label:""};return`<span class="mp-bzcg-w">${t(String(He.label).split(" ")[0])} <b>${t(String(He.label).split(" ")[1]||"")}</b></span>`}).join(""),be={上上:"band-top",中上:"band-good",中平:"band-mid",中下:"band-weak",下下:"band-low"}[b.verdict&&b.verdict.band]||"band-mid";return`<section class="mp-bzcg open" aria-label="袁天罡称骨">
        <div class="mp-bzcg-h"><b>袁天罡称骨</b><i class="mp-bzcg-tag">民俗参考</i></div>
        <div class="mp-bzcg-hero"><b>${t(b.total&&b.total.label||"")}</b><span class="mp-bzcg-bandchip ${be}">${t(b.verdict&&b.verdict.band||"")}</span></div>
        <div class="mp-bzcg-lunar">${t(b.lunar&&b.lunar.text||"")}</div>
        <div class="mp-bzcg-ws">${H}</div>
        ${b.song&&b.song.text?`<div class="mp-bzcg-song">「${t(b.song.text)}」</div>`:""}
        ${b.song&&b.song.plain?`<div class="mp-bzcg-plain"><em>释义</em>${t(b.song.plain)}</div>`:""}
        ${b.verdict&&b.verdict.text?`<div class="mp-bzcg-band">${t(b.verdict.text)}</div>`:""}
        <div class="mp-bzcg-note">称骨为通行本口径的民俗参考，与上方四柱旺衰是两套独立口径，互不推导。</div>
      </section>`})():"";return n.briefHTML(e)+n.oneLineHTML(e,i)+`<div class="pp" style="padding:12px">
      <table class="pp-bz">${h}<tbody>${R}</tbody></table>
      ${e.hourUnknown?'<div class="pp-warn" role="note">时柱暂缺：只排年/月/日三柱，起运与交运按日估算。时柱按正午暂算，涉及时柱的结论仅供参考。</div>':""}
      <div class="pp-rel"><div><b>天干</b>${e.relations&&e.relations.stems.length?e.relations.stems.join(" · "):"—"}</div>
      <div><b>地支</b>${e.relations&&e.relations.branches.length?e.relations.branches.join(" · "):"—"}</div></div>
      ${Q}
      ${ve}
      ${P}
      ${de("格局",Y)}
      ${de("用神",X)}
      ${Re}
      ${ya}
      ${w}
      ${Array.isArray(e.classics)&&e.classics.length?`<section class="mp-cl" aria-label="古籍原文">
        <div class="mp-cl-h"><b>古籍原文</b><span>照录通行本，释义为白话自撰</span></div>
        ${e.classics.map(b=>`<div class="mp-cl-e">
          <div class="mp-cl-t"><b>${t(({ziping:"子平真诠",ditian:"滴天髓",sanming:"三命通会"}[b.book]||b.book)+"·"+b.chapter)}</b></div>
          <div class="mp-cl-q">「${t(b.quote)}」</div>
          <div class="mp-cl-p">${t(b.plain)}</div>
        </div>`).join("")}
      </section>`:""}
      ${de("五行与十神",`<div class="pp-chips">${ee}</div>${S}`)}
      ${de("大运",`${n.curveHTML(e)}<div class="pp-chips">${L}</div>`)}
      ${y?de("流年",y+E):""}
      ${e.palaces?de("胎命身",`<div class="pp-chips">
        <span class="pp-chip" title="${t(e.palaces.taiyuan.note)}">胎元 ${t(e.palaces.taiyuan.ganzhi)}</span>
        ${e.palaces.taixi?`<span class="pp-chip" title="${t(e.palaces.taixi.note)}">胎息 ${t(e.palaces.taixi.ganzhi)}</span>`:""}
        ${e.palaces.minggong?`<span class="pp-chip" title="${t(e.palaces.minggong.note)}">命宫 ${t(e.palaces.minggong.ganzhi)}</span>`:""}
        ${e.palaces.shengong?`<span class="pp-chip" title="${t(e.palaces.shengong.note)}">身宫 ${t(e.palaces.shengong.ganzhi)}</span>`:""}
        ${!e.palaces.minggong||!e.palaces.shengong?'<span class="pp-chip" title="命宫与身宫由生月与生时支合数定宫；时柱暂缺，这两宫不排">命宫·身宫 时柱暂缺不排</span>':""}
      </div>`):""}
      ${Ze}
      ${ri}
      <div style="margin-top:8px;font-size:12px;color:var(--muted)">上一节 ${e.jieqi.previous.name} ${e.jieqi.previous.time}　下一节 ${e.jieqi.next.name} ${e.jieqi.next.time}　${e.dayun.rule}，${e.dayun.startAge.years}岁起运${e.dayun.jiao&&e.dayun.jiao.at?`（交运 ${e.dayun.jiao.at}，${e.dayun.jiao.frame}）`:""}${e.dayun.startAgeExact&&Number.isInteger(e.dayun.startAgeExact.years)?`　精确 ${e.dayun.startAgeExact.years}年${e.dayun.startAgeExact.months}月${e.dayun.startAgeExact.days}天${e.dayun.startAgeExact.hours}时（截断到日时；上面是四舍五入到月）`:""}</div>
    </div>`};const ua={natal:"命盘解析",divination:"卦象解析",card:"牌阵解析"},si={同向:"good",有张力:"watch",互补:"alt"},rt=e=>`<div class="mp-cross">${e.map(i=>{const o=si[i.stance]||"plain";return`<div class="mp-cross-row">
      <div class="mp-cross-h"><span class="mp-cross-l">${t(i.label)}</span><span class="mp-cross-tag t-${o}">${t(i.stance||"—")}</span></div>
      <div class="mp-cross-b">
        <div class="mp-cross-cell"><b>八字</b><span>${t(i.bazi||"—")}</span></div>
        <div class="mp-cross-cell"><b>紫微</b><span>${t(i.ziwei||"—")}</span></div>
      </div>
      ${i.note?`<div class="mp-cross-note">${t(i.note)}</div>`:""}
    </div>`}).join("")}</div>`,Be={positive:["偏顺","good"],negative:["偏卡","watch"],mixed:["两头都有","alt"],undetermined:["暂难定向","plain"]},Mt={high:"高",medium:"中",low:"低"},pt={木:"木",火:"火",土:"土",金:"金",水:"水"};n.envRatio=function(){try{if(typeof location<"u"&&location.search){const e=/[?&]env=(\d{1,3})/.exec(location.search);if(e)return Math.max(0,Math.min(100,Number(e[1])))}if(typeof localStorage<"u"){const e=localStorage.getItem("mp-env-ratio");if(e!==null&&e!=="")return Math.max(0,Math.min(100,Number(e)))}}catch{}return 100},n.envFor=function(e,i){const o=e&&e.envelope;if(!o||i&&i.envelope===!1)return null;const l=n.envRatio();if(l>=100)return o;if(l<=0)return null;const r=typeof window<"u"&&(window.Engine||window.__PP&&window.__PP.Engine)||null;return r&&typeof r.pickVariant=="function"?r.pickVariant(o.meta&&o.meta.chart_id,l)==="envelope"?o:null:o},n.envelopeHeadHTML=function(e){if(!e||!e.verdict||!e.verdict.headline)return"";const i=e.verdict,[o,l]=Be[i.direction]||Be.undetermined,r=(e.evidence||[]).length,c=(e.factors||[]).length,d=(e.conflicts||[]).length,u=`按 ${r} 条盘面事实、${c} 条关键因素推出来的${d?`；其中 ${d} 处各家有分歧，已在文末标明`:""}。把握说的是这套规则推得有多一致，不是这件事实际发生的概率。`;return`<div class="mp-env-head">
      <div class="mp-env-kicker">结论</div>
      <div class="mp-env-hl">${t(i.headline)}</div>
      <div class="mp-env-row">
        <span class="mp-env-dir t-${l}">${t(o)}</span>
        <details class="mp-env-confq">
          <summary class="mp-env-conf">把握 ${t(Mt[i.confidence]||"中")}</summary>
          <div class="mp-env-confq-body">${t(u)}</div>
        </details>
        ${e.degraded?'<span class="mp-env-deg">已简化</span>':""}
      </div>
      ${i.condition?`<div class="mp-env-cond">${t(i.condition)}</div>`:""}
    </div>`},n.envelopeHTML=function(e){if(!e||!Array.isArray(e.factors)||!e.factors.length)return"";const i=new Map((e.evidence||[]).map(u=>[u.id,u])),o=e.factors.map((u,m)=>{const f=(u.evidence_refs||[]).map(z=>i.get(z)).filter(Boolean),h=f.length?`<details class="mp-env-why"><summary>为什么</summary><div class="mp-env-why-body">${f.map(z=>`<div class="mp-env-ev"><b>${t(z.label)}</b><span>${t(z.detail)}</span></div>`).join("")}</div></details>`:"",j=u.duplicate_count?`<span class="mp-env-dup">另有 ${u.duplicate_count} 处同义表述已并入</span>`:"";return`<div class="mp-env-f-row">
        <div class="mp-env-f-no">${m+1}</div>
        <div class="mp-env-f-main">
          <div class="mp-env-f-top"><b>${t(u.name)}</b><span class="mp-env-f-state">${t(u.state)}</span>${j}</div>
          <div class="mp-env-f-impact">${t(u.impact)}</div>
          ${h}
        </div>
      </div>`}).join(""),l=(e.timeline||[]).length?`<div class="mp-env-tl">${e.timeline.map(u=>`<div class="mp-env-tl-row"><span class="mp-env-tl-w">${t(u.window)}</span>${u.pace?`<span class="mp-env-tl-p">${t(u.pace)}</span>`:""}${u.note?`<span class="mp-env-tl-n">${t(u.note)}</span>`:""}</div>`).join("")}</div>`:"",r=(e.advice||[]).length?`<div class="mp-env-adv"><b>怎么做</b><ol>${e.advice.map(u=>`<li>${t(u)}</li>`).join("")}</ol></div>`:"",c=e.risk?`<div class="mp-env-risk"><b>留意</b>${t(e.risk)}</div>`:"",d=(e.conflicts||[]).length?`<details class="mp-env-cf"><summary>流派说明（${e.conflicts.length} 条）</summary><div class="mp-env-cf-body">${e.conflicts.map(u=>`<div class="mp-env-cf-item"><b>${t(u.topic)}</b>${(u.views||[]).map(m=>`<div class="mp-env-cf-view"><span>${t(m.school)}</span>${t(m.stance)}</div>`).join("")}${u.note?`<em>${t(u.note)}</em>`:""}</div>`).join("")}</div></details>`:"";return`<div class="mp-env">
      <div class="mp-env-sec-h">关键几点</div>
      <div class="mp-env-f">${o}</div>
      ${l}${r}${c}${d}
    </div>`},n.interpretHTML=function(e,i){if(!e||!(e.dimensions&&e.dimensions.length||e.sections&&e.sections.length)&&!e.error&&!e.answer)return"";const l=!!(i&&i.folded),r=(e.dimensions||[]).map((y,ae)=>`<div class="mp-it-dim${y.focused?" focus":""}">
      <div class="mp-it-dh"><span class="mp-it-dno">${ae+1}</span><span class="mp-it-dlabel">${t(y.label)}</span>${y.focused?'<span class="mp-it-focus">最贴近你的问题</span>':""}${y.confidence?`<span class="mp-it-conf c-${t(y.confidence)}" title="这一维推演的稳定程度，不是这件事发生的概率">把握 ${t(y.confidence)}</span>`:""}</div>
      ${y.plain?`<div class="mp-it-dplain">${t(y.plain)}</div>`:""}
      <div class="mp-it-dtext">${t(y.text)}</div>
      ${y.evidence&&y.evidence.length?`<details class="mp-it-ev"><summary>依据 · ${t(y.evidence.length)} 条盘面事实</summary><div class="mp-it-ev-body">${y.evidence.map(ge=>`<span class="mp-it-ev-item">${t(ge)}</span>`).join("")}<span class="mp-it-ev-tech">技法：${t(e.technique||e.systemLabel||"")}</span></div></details>`:""}
      ${y.knowledge&&y.knowledge.length?`<div class="mp-it-knowref"><a href="#mp-sec-know">依据与出处 ${y.knowledge.length} 条 →</a>${y.knowledge.some(ge=>ge.status!=="settled")?'<span class="know-flag">本维有异说或待核实</span>':""}</div>`:""}
      ${y.advice?`<div class="mp-it-adv"><b>建议</b>${t(y.advice)}</div>`:""}
    </div>`).join(""),c=e.outline&&e.outline.length?`<div class="mp-outline"><div class="mp-outline-h">一页读懂</div>${e.outline.map(y=>`<div class="mp-outline-row"><b>${t(y.label)}</b><span>${t(y.text)}</span></div>`).join("")}</div>`:"",d=e.sections||[],u=d.filter(y=>y.kind!=="method"),m=d.filter(y=>y.kind==="method"),f=d.length?`<nav class="mp-toc" aria-label="报告目录">${u.map(y=>`<a href="#mp-sec-${t(y.key)}">${t(y.label)}</a>`).join("")}${m.length?'<a href="#mp-sec-method">方法与出处</a>':""}</nav>`:"",h=e.tables&&e.tables.length?`<div class="mp-tables">${e.tables.filter(y=>Array.isArray(y.rows)&&y.rows.length).map(y=>`<div class="mp-table-wrap">
          <div class="mp-table-h">${t(y.title)}</div>
          <div class="mp-table-scroll"><table class="mp-table">
            <thead><tr>${y.columns.map(ae=>`<th scope="col">${t(ae)}</th>`).join("")}</tr></thead>
            <tbody>${y.rows.map(ae=>`<tr>${ae.map((ge,xe)=>`<td data-label="${t(y.columns[xe]||"")}">${t(ge)}</td>`).join("")}</tr>`).join("")}</tbody>
          </table></div>
        </div>`).join("")}</div>`:"",j=y=>String(y||"").split(`
`).map(ae=>`<div class="mp-it-p">${t(ae).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>")}</div>`).join(""),z=(e.dimensions||[]).reduce((y,ae)=>y.concat((ae.knowledge||[]).map(ge=>({...ge,dimLabel:ae.label}))),[]),A=Array.isArray(e.facts)?e.facts:[],C={};for(let y=0;y<A.length;y+=1)C[A[y].id]=y+1;const O=y=>{const ae=Array.isArray(y.refs)?y.refs.filter(xe=>C[xe]):[];return ae.length?`<div class="mp-it-refs"><a href="#mp-facts">${ae.map(xe=>C[xe]).sort((xe,E)=>xe-E).map(xe=>`[${xe}]`).join("")}</a> 盘面事实</div>`:""},ie=A.length?`<details class="mp-it-sec mp-it-facts" id="mp-facts">
        <summary><span class="mp-it-sh">盘面事实</span><span class="mp-it-mnum">${A.length} 条 · 正文里的 [n] 指这里</span></summary>
        <div class="mp-it-sub">${A.map((y,ae)=>`<div class="fact-row"><em class="fact-no">[${ae+1}]</em>${y.group===y.label?"":`<em class="fact-g">${t(y.group)}</em>`}<b>${t(y.label)}</b><span>${t(y.value)}</span></div>`).join("")}</div>
      </details>`:"",G=y=>`<div class="mp-it-sec${y.tone?` tone-${t(y.tone)}`:""}" id="mp-sec-${t(y.key)}">
        <div class="mp-it-sh">${t(y.label)}${O(y)}</div>
        <div class="mp-it-stext">${Array.isArray(y.items)&&y.items.length?rt(y.items):j(y.text)}</div>
      </div>`,R=d.length||z.length||A.length?`<div class="mp-it-secs">${u.map(G).join("")}${ie}${m.length||z.length?`<details class="mp-it-sec mp-it-method" id="mp-sec-method">
        <summary><span class="mp-it-sh">方法与出处</span><span class="mp-it-mnum">${m.length?`${m.length} 段`:""}${m.length&&z.length?" · ":""}${z.length?`依据 ${z.length} 条`:""} · 怎么算的、哪里没算、口径分歧</span></summary>
        ${z.length?`<div class="mp-it-sub" id="mp-sec-know"><div class="mp-it-sh">依据与出处</div>${z.map(y=>`<div class="know-row"><span class="know-status ${t(y.status)}">${t(y.statusLabel)}</span><span class="know-body"><em class="know-dim">${t(y.dimLabel)}</em><b>${t(y.gist)}</b>${t(y.detail)}${y.source?`<i>出处：${t(y.source)}</i>`:""}${y.note?`<em>注：${t(y.note)}</em>`:""}</span></div>`).join("")}${e.knowledgeNote?`<div class="know-disc">${t(e.knowledgeNote)}</div>`:""}</div>`:""}
        ${m.map(y=>`<div class="mp-it-sub"><div class="mp-it-sh">${t(y.label)}</div><div class="mp-it-stext">${Array.isArray(y.items)&&y.items.length?rt(y.items):j(y.text)}</div></div>`).join("")}
      </details>`:""}</div>`:"",ee=[e.systemLabel,ua[e.moduleType]||e.moduleType].filter(Boolean),v=e.ask,q=v&&v.question?t(v.question):"",de=v&&(q||v.direction&&v.direction!=="general")?`<div class="mp-it-ask">${q?`<span class="ask-q">问题：${q}</span><span class="ask-sep">｜</span>`:""}<span class="ask-d">询问方向：${t(v.directionLabel||"综合")}</span></div>`:"",J=e.answer?`<div class="mp-it-ans"><b>${q?"先答所问":"先看结论"}</b>${t(e.answer)}</div>`:"",qe=e.plain?`<div class="mp-it-plain"><b>说人话</b>${t(e.plain)}</div>`:"",Y=e.followups&&e.followups.length?`<div class="mp-it-fu"><b>还可以这样追问</b><ul>${e.followups.map(y=>`<li>${t(y)}</li>`).join("")}</ul></div>`:"",$e=e.glossary&&e.glossary.length?`<details class="mp-it-gloss"><summary>名词解释（${e.glossary.length} 条）</summary>${e.glossary.map(y=>`<div><span>${t(y.term)}</span>${t(y.plain)}</div>`).join("")}</details>`:"",X=e.limits&&e.limits.length?`<details class="mp-it-limits"><summary>本插件不回答什么（${e.limits.length} 条）</summary>${e.limits.map(y=>`<div><b>${t(y.title)}</b>${t(y.text)}</div>`).join("")}</details>`:"",w=e.system&&/^(liuyao|meihua|daliuren|qimen|tarot|xiaoliuren)$/.test(e.system)?`<div class="mp-askcopy-row"><button type="button" class="mp-askcopy" data-mp-askcopy="${t(e.system)}">复制问事提示</button><span class="mp-askcopy-hint">把这张盘和你的问题打包成一段提示，粘到任何对话里都能用</span></div>`:"",S=e.guide?`<details class="mp-guide">
      <summary><b>${t(e.guide.title)}</b><span class="mp-guide-sub">数 / 象 / 辞</span></summary>
      <div class="mp-guide-body">
        <p class="mp-guide-lead">${t(e.guide.lead)}</p>
        <ol class="mp-guide-layers">${(e.guide.layers||[]).map(y=>`<li><b>${t(y.name)}<i>${t(y.sub)}</i></b><span>${t(y.text)}</span><em>${t(y.hint)}</em></li>`).join("")}</ol>
        <div class="mp-guide-check"><b>${t(e.guide.check.title)}</b><ol>${(e.guide.check.items||[]).map(y=>`<li>${t(y)}</li>`).join("")}</ol><p>${t(e.guide.check.tail)}</p></div>
        <div class="mp-guide-parts"><b>${t(e.guide.parts.title)}</b><ul>${(e.guide.parts.rows||[]).map(y=>`<li><span>${t(y[0])}</span>${t(y[1])}</li>`).join("")}</ul><p>${t(e.guide.parts.tail)}</p></div>
        <p class="mp-guide-close">${t(e.guide.closing)}</p>
      </div></details>`:"",L=i&&i.noBody?"":n.envelopeHTML(n.envFor(e,i));return`<div class="mp-it${l?" folded":""}">
      <button type="button" class="mp-it-head" aria-expanded="${l?"false":"true"}">
        <span class="mp-it-arrow" aria-hidden="true">▾</span>
        <span class="mp-it-title">解析与详解</span>${ee.map(y=>`<span class="mp-it-tag">${t(y)}</span>`).join("")}
        <span class="mp-it-hint">${l?"点击展开":"点击收起"}</span>
      </button>
      <div class="mp-it-wrap">
        ${L}
        ${w}
        ${de}
        ${J}
        ${qe}
        ${e.lead?`<div class="mp-it-lead">${t(e.lead)}</div>`:""}
        ${e.error?`<div class="mp-it-err">这段解读这次没生出来，盘面数据本身是好的${e.errorId?`（编号 ${t(e.errorId)}，反馈时报它）`:""}${window.__MPCompose&&window.__MPCompose.devOn&&window.__MPCompose.devOn()?`<details class="mp-it-errd"><summary>失败原因（只在开发者视图显示）</summary><code>${t(e.error)}</code></details>`:""}</div>`:""}
        ${c}
        ${f}
        <div class="mp-it-body">${r}</div>
        ${R}
        ${h}
        ${S}
        ${Y}
        ${$e}
        ${X}
        <div class="mp-it-dis">${t(e.disclaimer)}</div>
      </div>
    </div>`},n.followupHTML=function(e){if(!e)return"";const i=e.evidence&&e.evidence.length?`<div class="mp-fu-ev">依据：${e.evidence.map(o=>t(o)).join("；")}　置信度：${t(e.confidence||"弱")}</div>`:"";return`<div class="mp-fu${e.ok?"":" miss"}">
      <div class="mp-fu-h">追问 · ${t(e.question)}</div>
      <div class="mp-fu-a">${t(e.answer)}</div>
      ${i}
    </div>`},n.solarLineHTML=function(e){if(!e)return"";const i=e.solarTime||{},o=typeof i.offsetMinutes=="number"?i.offsetMinutes:typeof e.offsetMinutes=="number"?e.offsetMinutes:null;if(o==null||!o)return"";const l=String(i.trueSolarText||e.trueSolarText||"");if(/时辰未知/.test(l))return"";const r=o>0?"+":"−",c=(Math.round(Math.abs(o)*10)/10).toFixed(1),d=/(\d{1,2}:\d{2})/.exec(l),u=String(i.note||""),m=/夏令时/.test(u)?'<b class="mp-solar-dst">已扣夏令时 1 小时</b>':"",f=u?`<details class="mp-solar-why"><summary>怎么算的</summary><div>${t(u)}</div></details>`:"";return`<p class="mp-solar">真太阳时修正 <b>${r}${c} 分</b>${d?`，时柱按 <b>${t(d[1])}</b> 起`:""}${m}${f}<span>（勾掉「真太阳时」就按钟表时间排）</span></p>`},n.envHeadHTML=function(e,i){const o=n.envFor(e,i),l=o?n.envelopeHeadHTML(o):"";return l||n.factHeadHTML(e&&e.factHead)},n.envBodyHTML=function(e,i){return n.envelopeHTML(n.envFor(e,i))},n.resultWithInterpret=function(e,i,o){return(o&&o.noHead?"":n.envHeadHTML(i,o))+(e||"")+n.interpretHTML(i,o)},n.caliberHTML=function(e){const i=e&&Array.isArray(e.switches)?e.switches.filter(m=>m&&m.key):[];if(!i.length)return"";const o=i.filter(m=>!m.error&&m.total>0),l=o.length?`${i.length} 组开关中 ${o.length} 组影响此盘：${o.map(m=>m.short||m.title).join("、")}。`:`本盘对 ${i.length} 组开关都不敏感：换成另一档也不变。`,r=m=>{if(m.error)return`<div class="mp-cdiff-same">未能对照：${t(m.error)}</div>`;if(!m.total)return'<div class="mp-cdiff-same">无变化 · 此盘不受这一开关影响</div>';const f=Array.isArray(m.roots)?m.roots:[];return f.length?`<div class="mp-cdiff-roots">${f.map(h=>`<div class="mp-cdiff-root"><span class="mp-cdiff-k">${t(h.label)}</span><span class="mp-cdiff-from">${t(h.from)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-to">${t(h.to)}</span></div>`).join("")}</div>`:`<div class="mp-cdiff-same">无单一根因；逐字段差异 ${Number(m.total)||0} 处</div>`},c=m=>{const f=(Array.isArray(m.views)?m.views:[]).filter(h=>h&&h.changed);return m.error||!m.total||!f.length?"":`<table class="mp-cview"><thead><tr><th scope="col">项</th><th scope="col">${t(m.currentLabel)}</th><th scope="col">${t(m.altLabel)}</th></tr></thead><tbody>`+f.map(h=>`<tr><th scope="row">${t(h.label)}</th><td>${t(h.current)}</td><td>${t(h.alt)}</td></tr>`).join("")+"</tbody></table>"},d=m=>{const f=Array.isArray(m.categories)?m.categories:[];if(m.error||!m.total||!f.length)return"";const h=f.slice(0,6);return`<div class="mp-cdiff-cats">${h.map(j=>`<span class="mp-cdiff-cat">${t(j.name)} ${Number(j.count)||0} 处</span>`).join("")}`+(f.length>h.length?`<span class="mp-cdiff-cat">另 ${f.length-h.length} 类</span>`:"")+"</div>"},u=i.map(m=>`<div class="mp-cdiff-row"><div class="mp-cdiff-h"><b>${t(m.title)}</b><span class="mp-cdiff-count${m.total>0?" on":""}">${m.error?"未能对照":m.total?`${Number(m.total)||0} 处`:"无变化"}</span></div><div class="mp-cdiff-ab"><span class="mp-cdiff-pill now">当前 · ${t(m.currentLabel)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-pill alt">换成 · ${t(m.altLabel)}</span></div>${r(m)}${c(m)}${d(m)}</div>`).join("");return`<details class="mp-cdiff" aria-label="口径对照">
      <summary><span class="mp-cdiff-title">口径对照</span><span class="mp-cdiff-lead">${t(l)}</span><span class="mp-cdiff-more">展开逐字差异</span></summary>
      <div class="mp-cdiff-body">${u}
        <div class="mp-cdiff-note">同一组输入、只换一个开关；只列变化字段与根因，不判哪套口径更准，也不改上方盘面。</div>
      </div>
    </details>`},n.handleHTML=function(e){return typeof e!="string"||!e?"":`<section class="mp-handle" aria-label="排盘句柄">
      <span class="mp-handle-title">排盘句柄</span>
      <code class="mp-handle-code" title="${t(e)}">${t(e)}</code>
      <button type="button" class="mp-handle-copy" data-handle-copy="${t(e)}" aria-label="复制排盘句柄">复制句柄</button>
      <span class="mp-handle-hint">追问同一张盘时把它连同增量参数（年份、方向、所问之事）一并交给助手，不必重报出生信息。句柄是编码不是加密，含出生时间与出生地，别公开贴出。</span>
    </section>`},n.revisionHTML=function(e){if(!e||typeof e!="object")return"";const i=Array.isArray(e.applied)?e.applied:[],o=Array.isArray(e.ignored)?e.ignored:[];if(!i.length&&!o.length)return"";const l=i.map(r=>{const c=r.fromDisplay==null?"（未设）":r.fromDisplay;return`<li><span class="k">${t(r.label||r.key)}</span><span class="v"><span class="old">${t(c)}</span> → <span class="new">${t(r.display)}</span></span></li>`}).join("");return`<section class="mp-revise" aria-label="一句话改参">
      <div class="mp-revise-head"><span class="mp-revise-title">一句话改参</span><span class="mp-revise-text">「${t(e.text||"")}」</span></div>
      ${l?`<ul class="mp-revise-list">${l}</ul>`:'<p class="mp-revise-ignored">没有识别到可改的参数，仍按原参数排盘。</p>'}
      ${o.length?`<p class="mp-revise-ignored">未处理：${t(o.join("；"))}</p>`:""}
    </section>`},n.shadowHTML=function(e,i){if(!e||!e.id)return"";const o=[];e.version&&o.push(`版本 <b>${t(e.version)}</b>`),e.baseId&&o.push(`基础指纹 <b>${t(e.baseId)}</b>`),o.push("同参数同 ID");const l=[];e.reproducible===!1&&l.push(`不可复算：${t(e.reason||"参数不足")}`);const r=e.reproducible===!0&&e.asOfPinned===!1&&(e.system==="bazi"||e.system==="ziwei")?'<div class="mp-shadow-hint">未固定 asOf：流年 / 流月随「此刻」变化；要逐字比对请在输入里固定 asOf。</div>':"",c=i&&i.sameId!==!1&&(i.versionChanged||Number(i.total)>0);let d="";if(c){const u=Number(i.total)||0,m=t(i.fromVersion||"—"),f=t(i.toVersion||e.version||"—"),h=Array.isArray(i.roots)?i.roots:[],j=h.slice(0,8),z=j.length?`<div class="mp-cdiff-roots">${j.map(O=>`<div class="mp-cdiff-root"><span class="mp-cdiff-k">${t(O.label)}</span><span class="mp-cdiff-from">${t(O.from)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-to">${t(O.to)}</span></div>`).join("")}`+(h.length>j.length?`<div class="same">另 ${h.length-j.length} 处根因</div>`:"")+"</div>":`<div class="same">${u?"无单一根因；逐字段变化 "+u+" 处":"字段 0 处变化：同一张盘跨版本逐字一致"}</div>`,A=Array.isArray(i.categories)?i.categories:[],C=A.length?`<div class="mp-cdiff-cats">${A.slice(0,6).map(O=>`<span class="mp-cdiff-cat">${t(O.name)} ${Number(O.count)||0} 处</span>`).join("")}`+(A.length>6?`<span class="mp-cdiff-cat">另 ${A.length-6} 类</span>`:"")+"</div>":"";d=`<details class="mp-shadow-diff"${u>0?" open":""}>
        <summary><b>与上次同盘比对</b><span class="tag">${m} → ${f} · ${u?`${u} 处变化`:"0 处变化"}</span></summary>
        ${z}${C}
        <div class="note">同一 baseId（同一组归一化参数）的两次结果；只比盘面字段，不含摘要、解析与古籍等文本层。</div>
      </details>`}return`<section class="mp-shadow" aria-label="影子盘">
      <div class="mp-shadow-head"><span class="mp-shadow-title">影子盘</span><code class="mp-shadow-id">${t(e.id)}</code>
        <button type="button" class="mp-shadow-copy" data-shadow-copy="${t(e.id)}" aria-label="复制影子盘 ID">复制 ID</button></div>
      <div class="mp-shadow-meta">${o.join('<span aria-hidden="true">·</span>')}</div>
      ${l.map(u=>`<div class="mp-shadow-warn">⚠ ${u}</div>`).join("")}
      ${r}
      ${d}
    </section>`},n.shadowTrack=function(e){const i=window.Engine||window.__PP&&window.__PP.Engine;if(!i||!i.shadowSnapshot||!i.shadowDiff)return null;let o=null;try{o=i.shadowSnapshot(e)}catch{return null}if(!o||!o.shadow||!o.shadow.baseId)return null;const l="mp-shadow-v1";let r={};try{const u=window.localStorage?window.localStorage.getItem(l):null,m=u?JSON.parse(u):{};m&&typeof m=="object"&&!Array.isArray(m)&&(r=m)}catch{r={}}const c=r[o.shadow.baseId];let d=null;if(c)try{d=i.shadowDiff(c,o)}catch{d=null}o.at=Date.now(),r[o.shadow.baseId]=o;try{const u=Object.keys(r);if(u.length>24){u.sort((m,f)=>(Number(r[m]&&r[m].at)||0)-(Number(r[f]&&r[f].at)||0));for(const m of u.slice(0,u.length-24))delete r[m]}window.localStorage&&window.localStorage.setItem(l,JSON.stringify(r))}catch{}return d};const lt="dsh-metaphysics/profiles-v1",ga=24,La=16,Aa=40,dt=60,fa=["bazi","ziwei","liuyao","tarot","meihua","daliuren","hepan","qimen","almanac","zeri","chenggu","xiaoliuren","star","numerology","mbti","trend","fengshui","name","convert"];n.PROF_KEY=lt,n.PROF_MAX=ga,n.PROF_KINDS=fa;const Ct={bazi:"八字",ziwei:"紫微",liuyao:"六爻",tarot:"塔罗",meihua:"梅花",daliuren:"六壬",hepan:"合盘",qimen:"奇门",almanac:"黄历",zeri:"择日",chenggu:"称骨",xiaoliuren:"小六壬",star:"星座",numerology:"生命数字",mbti:"人格",trend:"人生K线",fengshui:"风水",name:"起名",convert:"农历"};n.profKindLabel=e=>Ct[e]||String(e||"");const ze=e=>typeof e=="string";function na(e){if(!e||typeof e!="object"||Array.isArray(e)||!ze(e.id)||!e.id||e.id.length>40||!ze(e.kind)||fa.indexOf(e.kind)<0)return null;const i=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e.date||""));if(!i)return null;const o=Number(i[1]),l=Number(i[2]),r=Number(i[3]);if(l<1||l>12||r<1||r>new Date(o,l,0).getDate())return null;const c=ze(e.time)&&/^([01]?\d|2[0-3]):[0-5]\d$/.test(e.time)?e.time:"";return{id:e.id,kind:e.kind,label:ze(e.label)?e.label.slice(0,La):"",date:e.date,time:e.hourUnknown===!0?"":c,hourUnknown:e.hourUnknown===!0,trueSolar:e.trueSolar!==!1,lateZi:e.lateZi!==!1,gender:e.gender==="male"||e.gender==="female"?e.gender:"",address:ze(e.address)?e.address.slice(0,Aa):"",note:ze(e.note)?e.note.slice(0,dt):"",pinned:e.pinned===!0,createdAt:Number(e.createdAt)||0,lastUsedAt:Number(e.lastUsedAt)||0,uses:Number(e.uses)||0}}function Za(){try{const e=window.localStorage?window.localStorage.getItem(lt):null,i=e?JSON.parse(e):[];return Array.isArray(i)?i:[]}catch{return[]}}function ba(e){return e.slice().sort((i,o)=>(o.pinned?1:0)-(i.pinned?1:0)||(o.lastUsedAt||o.createdAt||0)-(i.lastUsedAt||i.createdAt||0)||(o.createdAt||0)-(i.createdAt||0))}n.profilesLoad=function(){const e=[],i=Object.create(null);for(const o of Za()){const l=na(o);l&&!i[l.id]&&(i[l.id]=1,e.push(l))}return ba(e)},n.profilesSave=function(e){const i=ba(Array.isArray(e)?e.slice(0,ga):[]);try{return window.localStorage?(window.localStorage.setItem(lt,JSON.stringify(i)),!0):!1}catch{return!1}};let Ka=0;n.profilesNewId=function(){const e=Object.create(null);for(const o of n.profilesLoad())e[o.id]=1;let i;do i=`p${Date.now().toString(36)}${(Ka++).toString(36)}`;while(e[i]);return i},n.profilesPut=function(e){const i=na(Object.assign({id:n.profilesNewId(),createdAt:Date.now(),lastUsedAt:Date.now()},e));if(!i)return{ok:!1,list:n.profilesLoad()};const o=n.profilesLoad(),l=o.findIndex(r=>r.id===i.id);if(l>=0){const r=o[l];i.createdAt=r.createdAt||i.createdAt,i.lastUsedAt=r.lastUsedAt,i.uses=r.uses,i.pinned=r.pinned,o.splice(l,1,i)}else o.push(i);if(o.length>ga){const r=o.slice().sort((u,m)=>(u.lastUsedAt||u.createdAt)-(m.lastUsedAt||m.createdAt)),c=r.find(u=>u.id!==i.id)||r[0],d=o.indexOf(c);d>=0&&o.splice(d,1)}return n.profilesSave(o)?{ok:!0,list:ba(o),item:i}:{ok:!1,list:n.profilesLoad()}},n.profilesRemove=function(e){const i=n.profilesLoad().filter(o=>o.id!==e);return n.profilesSave(i)?i:n.profilesLoad()},n.profilesPin=function(e){const i=n.profilesLoad().map(o=>o.id===e?Object.assign({},o,{pinned:!o.pinned}):o);return n.profilesSave(i)?ba(i):n.profilesLoad()},n.profilesTouch=function(e){let i=!1;const o=n.profilesLoad().map(l=>l.id!==e?l:(i=!0,Object.assign({},l,{lastUsedAt:Date.now(),uses:(l.uses||0)+1})));return i?n.profilesSave(o)?ba(o):n.profilesLoad():o};const Lt=864e5;function sa(e){const i=Number(e)||0;if(!i)return"未排过";const o=Math.floor((Date.now()-i)/Lt);if(o<=0)return"今天排过";if(o===1)return"昨天排过";if(o<30)return`${o} 天前排过`;const l=new Date(i);return`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}-${String(l.getDate()).padStart(2,"0")} 排过`}n.profilesAgo=sa;const Ya="dsh-metaphysics/cases-v1",oa=480,Va=["pending","hit","miss","void"],ea={pending:"待验",hit:"应验",miss:"未应",void:"作废"},ct=120;n.CASE_KEY=Ya,n.CASE_MAX=oa,n.CASE_STATUS=Va,n.caseStatusLabel=e=>ea[e]||ea.pending;function Ge(e){if(!e||typeof e!="object"||Array.isArray(e)||!ze(e.id)||!e.id||e.id.length>64)return null;const i=e.entry;if(!i||typeof i!="object"||Array.isArray(i)||!ze(i.kind)||fa.indexOf(i.kind)<0||!ze(i.date)&&!ze(i.time)&&!ze(i.question))return null;const o=Number(e.at||i.at)||0;return o?{id:e.id,at:o,status:Va.indexOf(e.status)>=0?e.status:"pending",note:ze(e.note)?e.note.slice(0,ct):"",question:ze(i.question)?i.question.slice(0,80):"",entry:i}:null}function ha(){try{const e=window.localStorage?window.localStorage.getItem(Ya):null,i=e?JSON.parse(e):[];return Array.isArray(i)?i:[]}catch{return[]}}function aa(e){if(!window.localStorage)return!1;try{return window.localStorage.setItem(Ya,JSON.stringify(e.slice(0,oa))),!0}catch{return!1}}n.casesSave=aa,n.casesLoad=function(){return ha().map(Ge).filter(Boolean).sort((e,i)=>i.at-e.at||(e.id<i.id?1:-1))},n.casesNewId=function(){const e={};ha().forEach(o=>{o&&o.id&&(e[o.id]=1)});let i="";for(let o=0;o<8&&(i="c"+Date.now().toString(36)+Math.floor(Math.random()*1296).toString(36),!!e[i]);o+=1);return i},n.casesAdd=function(e,i){const o=i||{};if(!e||typeof e!="object"||Array.isArray(e))return{ok:!1,list:n.casesLoad()};const l=n.casesLoad(),r=Number(e.at)||Date.now();if(l.some(m=>m.at>r-6e4&&m.entry.kind===e.kind&&m.entry.date===e.date&&m.entry.time===e.time&&(m.entry.question||"")===(e.question||"")&&(m.entry.lines||"")===(e.lines||"")))return{ok:!0,dup:!0,list:n.casesLoad()};const d=Ge({id:n.casesNewId(),at:r,status:o.status||"pending",note:o.note||"",entry:e});if(!d)return{ok:!1,list:n.casesLoad()};const u=[d].concat(l.filter(m=>m.id!==d.id)).slice(0,oa);return aa(u)?{ok:!0,item:d,list:u}:{ok:!1,list:n.casesLoad()}},n.casesSetStatus=function(e,i){if(Va.indexOf(i)<0)return n.casesLoad();const o=ha().map(Ge).filter(Boolean).map(l=>l.id===e?Object.assign({},l,{status:i}):l);return aa(o)?o:n.casesLoad()},n.casesRemove=function(e){const i=ha().map(Ge).filter(Boolean).filter(o=>o.id!==e);return aa(i)?i:n.casesLoad()},n.casesExport=function(e){return(Array.isArray(e)?e:n.casesLoad()).map(o=>JSON.stringify({id:o.id,at:o.at,atISO:new Date(o.at).toISOString(),kind:o.entry.kind,label:ze(o.entry.label)?o.entry.label:"",question:o.question,status:o.status,note:o.note,params:o.entry})).join(`
`)};const At=/^(\d{4})-(\d{2})-(\d{2})$/,Ue=/^(\d{1,2}):(\d{2})(:\d{2})?$/;function mt(e){const i=ze(e)&&At.exec(e.trim());return i?i[2]+"-"+i[3]:""}function Ja(e){const i=ze(e)&&Ue.exec(e.trim());return i?i[1]+":00":""}n.casesExportMasked=function(e){return(Array.isArray(e)?e:n.casesLoad()).map(o=>{const l=o.entry||{},r={};return Object.keys(l).forEach(c=>{if(c!=="address"){if(c==="date"){const d=mt(l[c]);d&&(r.date=d);return}if(c==="time"){const d=Ja(l[c]);d&&(r.time=d);return}c!=="question"&&(r[c]=l[c])}}),JSON.stringify({id:o.id,kind:l.kind||"",label:ze(l.label)?l.label:"",status:o.status,note:"",params:r})}).join(`
`)},n.casesMigrate=function(e){const i=Array.isArray(e)?e:[];if(!i.length)return{added:0,list:n.casesLoad()};const o=ha().map(Ge).filter(Boolean),l={};o.forEach(c=>{l[c.id]=1});let r=0;for(let c=0;c<i.length;c+=1){const d=i[c];if(!d||typeof d!="object"||!ze(d.kind))continue;const u=Number(d.at)||0,m=`h-${u||"0"}-${c}-${d.kind}`;if(l[m])continue;const f=Ge({id:m,at:u||Date.now(),status:"pending",entry:d});f&&(l[m]=1,o.push(f),r+=1)}return r&&aa(o.sort((c,d)=>d.at-c.at)),{added:r,list:n.casesLoad()}};const Tt={male:"♂",female:"♀"};n.profilesHTML=function(e,i){const o=i||{},l=(Array.isArray(e)?e:[]).map(c=>{const d=na(c);if(!d)return"";const u=[d.date,d.hourUnknown?"时辰未知":d.time,d.address].filter(Boolean).join(" "),m=o.editingId&&d.id===o.editingId,f=o.armedDel&&d.id===o.armedDel;return`<div class="mp-prof-card${d.pinned?" pinned":""}${m?" editing":""}" data-id="${t(d.id)}">
        <button type="button" class="mp-prof-use" data-mp-prof="use" data-id="${t(d.id)}"
          title="${t(`用「${d.label||d.kind}」的出生信息直接排盘`)}">
          <span class="mp-prof-nm">${t(d.label||"未命名")}${d.gender?`<i class="sx">${Tt[d.gender]||""}</i>`:""}</span>
          <span class="mp-prof-sys">${t(n.profKindLabel?n.profKindLabel(d.kind):d.kind)}</span>
          <span class="mp-prof-bd">${t(u)}</span>
          <span class="mp-prof-at">${t(sa(d.lastUsedAt||d.createdAt))}${d.uses?` · ${d.uses} 次`:""}${d.pinned?" · 置顶":""}</span>
        </button>
        <span class="mp-prof-ops">
          <button type="button" data-mp-prof="pin" data-id="${t(d.id)}" class="${d.pinned?"on":""}"
            aria-pressed="${d.pinned?"true":"false"}" title="置顶这张档案">${d.pinned?"已置顶":"置顶"}</button>
          <button type="button" data-mp-prof="edit" data-id="${t(d.id)}" title="把这张档案读回输入框，改完再存">改名</button>
          <button type="button" data-mp-prof="del" data-id="${t(d.id)}" class="${f?"on":""}"
            title="${f?"再点一次就从本机删除这张档案":"从本机删除这张档案（点两次确认）"}">${f?"确认删除":"删除"}</button>
        </span>
      </div>`}).join(""),r=l?`<div class="mp-prof-list">${l}</div>`:'<p class="mp-prof-empty">还没有存过命盘。填好出生信息，给这张盘起个称呼，点「存为我的命盘」——下次进来一点就出盘，不必重报。</p>';return`<section class="mp-prof" aria-label="我的命盘">
      <div class="mp-prof-h"><b>我的命盘</b><span class="mp-prof-sub">只存本机 · 不上传${e&&e.length?` · ${e.length}/${ga}`:""}</span></div>
      ${r}
      ${o.bar||""}
    </section>`},n.profilesBarHTML=function(e){const i=e||{};return`<div class="mp-prof-bar">
        <input class="mp-prof-name" type="text" maxlength="${La}" placeholder="称呼，如「我」「妈妈」" aria-label="档案称呼" value="${t(i.name||"")}">
        <button type="button" data-mp-prof="put"${i.canAdd===!1?" disabled":""}>${t(i.editingId?"更新这张档案":"存为我的命盘")}</button>
        ${i.editingId?'<button type="button" class="ghost" data-mp-prof="cancel">取消改名</button>':""}
        <span class="mp-prof-tip">${t(i.tip||(i.editingId?"改完出生信息或称呼，点「更新这张档案」覆盖原档。":"存的是出生时间与出生地这些输入，不是结果。"))}</span>
      </div>`},n.profEvent=function(e){let i=e&&e.closest?e.closest("[data-mp-prof]"):null;if(!i)return null;const o=i.getAttribute("data-mp-prof");return i.tagName==="BUTTON"&&i.disabled?null:{action:o,id:i.getAttribute("data-id")||"",name:i}};const Xa=["bazi","trend"],Et=["bazi","ziwei","liuyao","meihua","daliuren","qimen","hepan","chenggu","trend","fengshui","name","xiaoliuren"];n.profUsable=function(e){return!e||typeof e!="object"?!1:e.hourUnknown===!0||e.time?!0:Et.indexOf(String(e.kind||""))<0},n.profFromForm=function(e,i,o){const l=e||{},r=l.hourUnknown===!0&&Xa.indexOf(String(l.kind||""))>=0;return!r&&!/^([01]?\d|2[0-3]):[0-5]\d$/.test(String(l.time||"").trim())?null:na(Object.assign({id:o||n.profilesNewId(),kind:String(l.kind||""),label:String(i||"").trim().slice(0,La)||(n.profKindLabel?n.profKindLabel(l.kind):String(l.kind||"")),date:String(l.date||""),time:String(l.time||""),hourUnknown:r,gender:String(l.gender||""),address:String(l.address||""),trueSolar:l.trueSolar!==!1,lateZi:l.lateZi!==!1,pinned:!1,createdAt:Date.now(),lastUsedAt:0,uses:0}))},n.traceHTML=function(e,i,o){if(!Array.isArray(e)||!e.length)return"";const l={liuyao:"六爻",bazi:"八字",ziwei:"紫微",qimen:"奇门",daliuren:"大六壬"}[i]||"命盘",r=e.map(m=>m&&m.field).filter(Boolean).join(" → "),c=typeof o=="string"?o:"",d=(m,f)=>{const h=String(m??"");return h.length>f?`${h.slice(0,f)}…`:h},u=e.map((m,f)=>{const h=Array.isArray(m.inputs)?m.inputs:[];return`<details class="mp-trace-step"${f===0?" open":""}>
        <summary><span class="mp-trace-no">${f+1}</span><span class="mp-trace-field">${t(m.field)}</span><span class="mp-trace-res">${t(d(m.result,44))}</span></summary>
        <div class="mp-trace-detail">
          <div class="mp-trace-rule"><b>规则</b>${t(m.rule)}</div>
          ${h.length?`<dl class="mp-trace-inputs">${h.map(j=>`<dt>${t(j.label)}</dt><dd>${t(j.value)}</dd>`).join("")}</dl>`:""}
          <div class="mp-trace-result"><b>结果</b>${t(m.result)}</div>
          ${m.source?`<div class="mp-trace-src"><b>出处</b>${t(m.source)}</div>`:""}
        </div>
      </details>`}).join("");return`<button type="button" class="mp-trace-card" data-trace-open aria-haspopup="dialog" aria-controls="mp-trace-layer">
        <span class="mp-trace-title">推导链</span><span class="mp-trace-flow">${t(r)}</span><span class="mp-trace-count">${e.length} 层 · 查看</span>
      </button>
      <div class="mp-trace-layer" id="mp-trace-layer" data-trace-layer aria-hidden="true">
        <div class="mp-trace-back" data-trace-close></div>
        <aside class="mp-trace-drawer" role="dialog" aria-modal="true" aria-labelledby="mp-trace-title">
          <div class="mp-trace-head">
            <div><b id="mp-trace-title">推导链 · ${t(l)}</b><span>${e.length} 层 · 每层给出规则、输入、结果与出处；只读，不重算</span></div>
            ${c?'<button type="button" class="mp-trace-copy" data-trace-copy aria-label="复制整条推导链的 Markdown">复制 Markdown</button>':""}
            <button type="button" class="mp-trace-close" data-trace-close aria-label="关闭推导链">✕</button>
          </div>
          <div class="mp-trace-body">${u}</div>
          ${c?`<textarea class="mp-trace-md" data-trace-md readonly hidden>${t(c)}</textarea>`:""}
        </aside>
      </div>`},n.almanacHTML=function(e){if(!e||!e.meta)return n.quickHTML(e);const i=e.ganzhi||{},o=e.dayGod||null,l=(A,C)=>(A||[]).map(O=>`<span class="mp-al-chip${C?` ${C}`:""}">${t(O)}</span>`).join(""),r=(A,C)=>C?`<div class="mp-al-cell"><em>${t(A)}</em><b>${t(C)}</b></div>`:"",c=e.xiu?`${e.xiu.name}宿（${e.xiu.luck}·${e.xiu.zheng}·${e.xiu.animal}）`:"",d=e.nayin&&e.nayin.day?e.nayin.day.name:"",u=e.chong?`${e.chong.text}${e.chong.sha?` ${e.chong.sha}`:""}`:"",m=(e.hours||[]).map(A=>`<span class="mp-al-hour ${A.luck==="吉"?"good":"bad"}"><i>${t(A.zhi)}</i><em>${t((A.ganZhi||"").slice(0,1))}</em><b>${t(A.shen||"")}</b><u>${t(A.luck||"")}</u></span>`).join(""),f=e.positions||{},h=(A,C)=>C?`<span class="mp-al-chip">${t(A)}·${t(typeof C=="string"?C:C.dir||"")}</span>`:"",j=e.lucky||{},z=o?`<span class="mp-al-badge ${o.luck==="吉"?"good":"bad"}">${t(o.name)}·${t(o.type)}·${t(o.luck)}</span>`:"";return`<section class="mp-al" aria-label="黄历">
      <div class="mp-al-h"><b>${t(e.meta.date||"")}</b><i>${t(e.meta.weekday||"")}　${t((e.lunar||{}).text||"")}</i></div>
      <div class="mp-al-gz">${t(i.year||"")}年　${t(i.month||"")}月　${t(i.day||"")}日　属${t(i.shengXiao||"")}　建除 ${t(e.zhiXing||"")}日　${z}</div>
      <div class="mp-al-yiji">
        <div class="mp-al-col"><em>宜</em><div class="mp-al-chips">${l(e.yi)}</div></div>
        <div class="mp-al-col"><em>忌</em><div class="mp-al-chips">${l(e.ji)}</div></div>
      </div>
      <div class="mp-al-grid">${r("二十八宿",c)}${r("日柱纳音",d)}${r("胎神",e.taiShen)}${r("冲煞",u)}</div>
      <div class="mp-al-row"><em>吉神方位</em><div class="mp-al-chips">${h("喜神",f.xiShen)}${h("财神",f.caiShen)}${h("福神",f.fuShen)}${h("阳贵",f.yangGui)}${h("阴贵",f.yinGui)}</div></div>
      <div class="mp-al-row"><em>时刻吉凶</em><div class="mp-al-hours">${m}</div></div>
      <div class="mp-al-row"><em>吉配生肖</em><div class="mp-al-chips">${j.liuhe?`<span class="mp-al-chip">六合·${t(j.liuhe)}</span>`:""}${l(j.sanhe||[])}</div></div>
      ${e.dailyHexagram?`<div class="mp-al-hex">每日一卦：<b>${t(e.dailyHexagram.name)}</b>　${t(e.dailyHexagram.meaning||"")}</div>`:""}
      <div class="mp-al-note">${t(e.meta&&e.meta.scope||"")}</div>
    </section>`};const Wa=" liuyao tarot meihua daliuren qimen xiaoliuren ",_t=" almanac zeri convert star numerology wuyunliuqi ",xa={cast:"先看卦名或牌名——事情此刻的样子；再看动爻、正逆位，变化在那里。",person:"先找「你」那一格（日主、命宫或主质）；再看被强调的字或星。",day:"先看今天值什么，再看宜忌那几栏。"};n.plainHTML=function(e){if(!e||e.system==="taiyi")return"";const i=e.brief&&e.brief.lead||"";if(!i)return"";const o=" "+String(e.system||"")+" ",l=Wa.indexOf(o)>=0?xa.cast:_t.indexOf(o)>=0?xa.day:xa.person;return'<div class="mp-pl"><p class="mp-pl-lead">'+t(i)+'</p><p class="mp-pl-how">'+t(l)+"</p></div>"},n.taiyiHTML=function(e){if(!e||!e.taiyi||!e.meta)return"";const i=e.taiyi,o=e.wenchang||{},l=e.shiji||{},r=e.jishen||{},c=e.suan||{},d=e.jiang||{},u=e.geju||{},f=[[9,"巽"],[2,"离"],[7,"坤"],[4,"震"],[5,"中"],[6,"兑"],[3,"艮"],[8,"坎"],[1,"乾"]].map(ne=>{const Q=ne[0],re=ne[1],ve=i.palace===Q,Se=o.num===Q,P=l.palace===Q,Ce=(ve?'<i class="mp-ty-mark">太乙</i>':"")+(P?'<i class="mp-ty-mark s">始击</i>':"")+(Se?'<i class="mp-ty-mark w">文昌</i>':"");return`<div class="mp-ty-cell${ve?" on":""}${re==="中"?" mid":""}"><b>${t(re)}</b><em>${Q}</em>${Ce}</div>`}).join(""),h=e.scope&&e.scope.notCovered||[],j=e.month||{},z=e.day||{},A=e.hour||{},C=j.taiyi&&j.taiyi.palaceName||"",O=String(j.taiyi&&j.taiyi.unitInPalace||""),ie=j.mu?j.mu.pos+"（"+j.mu.god+"）":"",G=j.jishen&&j.jishen.branch||"",R=z.taiyi&&z.taiyi.palaceName||"",ee=String(z.taiyi&&z.taiyi.unitInPalace||""),v=z.mu?z.mu.pos+"（"+z.mu.god+"）":"",q=z.jishen&&z.jishen.branch||"",de=A.taiyi&&A.taiyi.palaceName||"",J=String(A.taiyi&&A.taiyi.unitInPalace||""),qe=A.jishen&&A.jishen.branch||"",Y=e.jixiong||{},$e=e.verdict||{},X=$e.grade||Y.grade||"xiong",ce=$e.label||Y.label||"凶",w=e.shenjiang||{},S=w.rows?`${w.stem}日、${w.day?"昼贵":"夜贵"}起${w.startBranch}${w.dir>0?"顺":"逆"}行；吉神下：${(w.goods||[]).join("、")||"无"}；凶神下：${(w.bads||[]).join("、")||"无"}`:"未排",L=Y.grade||"xiong",y=Y.label||"凶",ae=e.gate&&e.gate.gate||"",ge={掩:"客方的目和太乙挤在同一格",击:"始击挨在太乙左右",格:"太乙和始击隔一格正面对上",对:"文昌从对面顶过来",提:"客大将和文昌挤在一格",迫:"有将贴得太近，就在太乙前后一格",囚:"有将被关在太乙那一格里",关:"主客两边的人撞在一处"},xe=(u.list||[]).map(ne=>{const Q=String(ne).charAt(0);return ge[Q]?Q+"——"+ge[Q]:String(ne)}),E=L==="xiong"?`太乙站在${i.palaceName}宫（${i.dir}），值${ae}门，判凶：主客两边有几样撞到了一起。`:L==="daji"?`太乙站在${i.palaceName}宫（${i.dir}），值${ae}门，判大吉：位置和数都顺，门也在吉道上。`:L==="buhe"?`太乙站在${i.palaceName}宫（${i.dir}），值${ae}门，判不和：位置不冲突，但数上不合。`:`太乙站在${i.palaceName}宫（${i.dir}），值${ae}门，判吉：位置不冲突。`;return`<section class="mp-ty" aria-label="太乙神数">
      <div class="mp-ty-h">
        <span class="mp-ty-y">${t(String(e.meta.year))} 年</span>
        <span class="mp-ty-j">${t(e.meta.dunText||"")}${t(String(e.meta.ju))}局</span>
        <span class="mp-ty-m">太乙临 ${t(i.palaceName||"")} 宫</span>
        <span class="mp-ty-m">${t(ae)}</span>
      </div>
      <div class="mp-ty-g">${f}</div>
      <div class="mp-ty-plain">
        <p class="mp-ty-lead">${t(E)}</p>
        <p>先看太乙落在哪一格——那是「主」这一年的位置，整张盘围着它转。</p>
        <p>${t(ae)}门一值三十年，管的是这三十年的大环境，不是今年单一年的事。</p>
        <p>判${t(y)}，是因为${t(xe.length?xe.join("；"):"八种位置关系一个都没犯")}。</p>
        <p class="mp-ty-close">这一层只摆位置和数，不回答事情成不成；想看每一步怎么来的，展开下面的细目。</p>
      </div>
      <details class="mp-ty-det">
        <summary>细目（想核对推导再展开）</summary>
        <div class="mp-ty-sec"><em>太乙</em>第 ${t(String(i.palace||""))} 宫（${t(i.dir||"")}），三年里的第 ${t(String(i.yearInPalace||""))} 年，${t(i.li||"")}</div>
        <div class="mp-ty-sec"><em>八门</em>${t(ae)}　八门三十年一转，1954 年从休门起</div>
        <div class="mp-ty-sec"><em>文昌</em>${t(o.pos||"")}（${t(o.god||"")}，${t(o.palaceName||"")}宫）　十八年一周</div>
        <div class="mp-ty-sec"><em>定目</em>${t(e.dingmu&&e.dingmu.pos||"")}（${t(e.dingmu&&e.dingmu.god||"")}）　<em>三基</em>君${t(e.sanji&&e.sanji.jun||"")} 臣${t(e.sanji&&e.sanji.chen||"")} 民${t(e.sanji&&e.sanji.min||"")}</div>
        <div class="mp-ty-sec"><em>五福</em>${t(e.wufu&&e.wufu.palaceName||"")}宫　<em>大游</em>${t(e.dayou&&e.dayou.palaceName||"")}宫　<em>十精</em>天乙${t(e.shijing&&e.shijing.tianyi||"")} 地乙${t(e.shijing&&e.shijing.diyi||"")} 直符${t(e.shijing&&e.shijing.zhifu||"")}</div>
        <div class="mp-ty-sec"><em>数和</em>主算 ${t(e.heshu&&e.heshu.zhu&&e.heshu.zhu.text||"")}　客算 ${t(e.heshu&&e.heshu.ke&&e.heshu.ke.text||"")}</div>
        <div class="mp-ty-sec"><em>月计</em>太乙在 ${t(C)} 宫（第 ${t(O)} 月）　天目 ${t(ie)}　计神 ${t(G)}</div>
        <div class="mp-ty-sec"><em>日计</em>太乙在 ${t(R)} 宫（第 ${t(ee)} 日）　天目 ${t(v)}　计神 ${t(q)}</div>
        <div class="mp-ty-sec"><em>时计</em>太乙在 ${t(de)} 宫（第 ${t(J)} 时）　计神 ${t(qe)}</div>
        <div class="mp-ty-sec"><em>吉凶</em><b class="mp-ty-jx ${t(X)}">${t(ce)}</b> ${t(e.jixiong&&e.jixiong.text||"")}</div>
        <div class="mp-ty-sec"><em>神将</em>${t(S)}</div>
        <div class="mp-ty-sec"><em>计神</em>${t(r.branch||"")}（${t(r.god||"")}）　<em>始击</em>${t(l.pos||"")}（${t(l.god||"")}，${t(l.palaceName||"")}宫）</div>
        <div class="mp-ty-sec"><em>主算</em>${t(String(c.zhu||""))}　主大将${t(d.zhuDaName||"")}宫　主参将${t(d.zhuCanName||"")}宫</div>
        <div class="mp-ty-sec"><em>客算</em>${t(String(c.ke||""))}　客大将${t(d.keDaName||"")}宫　客参将${t(d.keCanName||"")}宫</div>
        <div class="mp-ty-sec"><em>格局</em>${u.list&&u.list.length?t(u.list.join("；")):"四将不相犯，没有掩、迫、囚、格、关"}</div>
        <div class="mp-ty-sec"><em>积年</em>${t(String(e.meta.jinian||""))}　残年 ${t(String(e.meta.rest360||""))}　${t(e.year?e.year.jiName:"")}${t(e.year?String(e.year.jiYear):"")}年　${t(e.year?e.year.yuanName:"")}第 ${t(e.year?String(e.year.yuanYear):"")} 年</div>
        <div class="mp-ty-note">算到太乙、八门、文昌、计神、始击、主客算与四将、五种格局；${t(h.join("、"))}未收录，盘上不显示。将落中五时只标数不加宫名。</div>
      </details>
    </section>`},n.wuyunliuqiHTML=function(e){if(!e||!e.zhongyun||!e.year)return"";const i=e.zhongyun,o=e.current||{},l=[];e.special&&e.special.taiYi&&l.push("太乙天符"),e.special&&e.special.tianFu&&!e.special.taiYi&&l.push("天符"),e.special&&e.special.suiHui&&!e.special.taiYi&&l.push("岁会"),e.special&&e.special.tongTianFu&&l.push("同天符"),e.special&&e.special.tongSuiHui&&l.push("同岁会");const r=(d,u)=>(d||[]).map(m=>{const f=u?m.qi:m.name,h=u?!!(o.keQi&&o.keQi.qi===m.qi):!!(o.keYun&&o.keYun.name===m.name),j=u?m.sitian?"司天":m.zaiquan?"在泉":"":m.taiShao||"";return`<div class="mp-wl-step${h?" on":""}"><span class="mp-wl-no">${m.no}</span><span>${t(f||"")}</span><span class="mp-wl-tg">${t(j)}</span><span class="mp-wl-tm">${t(m.startTime||"")}—${t(m.endTime||"")}</span></div>`}).join(""),c=l.map(d=>`<span class="mp-wl-tag on">${t(d)}</span>`).join("");return`<section class="mp-wl" aria-label="五运六气">
      <div class="mp-wl-h">
        <span class="mp-wl-y">${t(e.year.ganzhi)}</span>
        <span class="mp-wl-z">${t(i.name)}</span>
        <span class="mp-wl-m">${t(e.year.startTime||"")} — ${t(e.year.endTime||"")}</span>
      </div>
      ${c?`<div class="mp-wl-sec"><em>格局</em>${c}</div>`:""}
      <div class="mp-wl-sec"><em>司天在泉</em>${t(e.sitian.qi)}司天　${t(e.zaiquan.qi)}在泉</div>
      <div class="mp-wl-sec"><em>此刻</em>${t(o.text||"")}</div>
      <div class="mp-wl-sec"><em>客运五步</em></div>
      <div class="mp-wl-steps">${r(e.keYun,!1)}</div>
      <div class="mp-wl-sec"><em>客气六步</em></div>
      <div class="mp-wl-steps">${r(e.keQi,!0)}</div>
      <div class="mp-wl-note">${t(e.scope?e.scope.note:"")}</div>
    </section>`},n.constitutionHTML=function(e){if(!e)return"";if(e.paper&&Array.isArray(e.questions)){const r=e.questions.map(c=>`<li><span class="mp-cs-no">${c.no}</span><span class="mp-cs-t">${t(c.text)}</span><em>${t(c.name)}</em></li>`).join("");return`<section class="mp-cs-paper" aria-label="中医体质问卷">
        <div class="mp-cs-h"><span><b>中医体质问卷</b><i>${e.scaleCount} 种体质 × ${e.itemsPerScale} 题 · 1 没有 / 5 总是</i></span>
        <span class="mp-cs-count">填完分数再看结果</span></div>
        <ol>${r}</ol>
        <div class="mp-cs-note">${t(e.note||"")}</div>
      </section>`}const i=e.primary||{},o=(e.scales||[]).map(r=>{const c=Math.max(0,Math.min(100,r.converted||0)),d=r.level&&r.level!=="否";return`<div class="mp-cs-row${i.key===r.key?" main":""}">
        <span class="mp-cs-n">${t(r.name)}</span>
        <span class="mp-cs-track"><i class="${d?"on":""}" style="width:${c}%"></i><b class="mp-cs-tick" style="left:40%"></b></span>
        <span class="mp-cs-v">${c}</span>
        <span class="mp-cs-l">${t(r.level||"")}</span>
      </div>`}).join(""),l=(e.care||[]).map(r=>`<li>${t(r)}</li>`).join("");return`<section class="mp-cs" aria-label="中医体质结果">
      <div class="mp-cs-h">
        <span class="mp-cs-main">${t(i.name||"—")}</span>
        <span class="mp-cs-meta"><b>${t(i.oneLine||"")}</b><i>${e.secondary?`兼夹 ${t(e.secondary.name)}（${Math.round(e.secondary.converted)}）`:"无兼夹"}${e.flat?" · 区分度不足":""}</i></span>
        <span class="mp-cs-count">已答 ${e.meta?e.meta.answered:0}/${e.meta?e.meta.total:0} 题</span>
      </div>
      <div class="mp-cs-bars">${o}</div>
      <div class="mp-cs-sec"><em>这体质</em>${t(i.trait||"")}</div>
      <div class="mp-cs-sec"><em>倾向</em>${t(i.tendency||"")}</div>
      <div class="mp-cs-care"><b>调养方向</b><ul>${l}</ul></div>
      <div class="mp-cs-note">${t(e.note||"")}</div>
    </section>`},n.mbtiHTML=function(e){if(!e)return"";if(e.needAnswers&&Array.isArray(e.questions)){const r=e.questions.map(c=>`<li>${t(c.text)}</li>`).join("");return`<section class="mp-mb-paper" aria-label="十六型人格问卷">
        <div class="mp-mb-h">
          <span class="mp-mb-meta"><b>十六型人格问卷</b><i>${e.total} 题 · 每题 1 完全不像 / 5 很像我</i></span>
          <span class="mp-mb-count">填完分数再看结果</span>
        </div>
        <ol>${r}</ol>
        <div class="mp-mb-note">${t(e.note||"")}</div>
      </section>`}const i=(e.dims||[]).map(r=>{const c=Math.round((r.pct||0)*100),d=r.picked===r.left,u=Math.max(2,c),m=d?r.leftSay:r.rightSay;return`<div class="mp-mb-dim">
        <div class="mp-mb-dh"><b class="${d?"on":""}">${t(r.left)}</b><em>${t(r.name)}</em><b class="${d?"":"on"}">${t(r.right)}</b></div>
        <div class="mp-mb-bar ${d?"l":"r"}"><em style="width:${u}%"></em></div>
        <div class="mp-mb-df">取 ${t(r.picked)} · ${t(r.strength)} ${c}%</div>
        <div class="mp-mb-ds">${t(m)}</div>
      </div>`}).join(""),o=e.profile||{},l=(o.stack||[]).map((r,c)=>`<span class="${c===0?"lead":""}"><b>${t(r.code)}</b>${t(r.say)}</span>`).join("");return`<section class="mp-mb" aria-label="十六型人格结果">
      <div class="mp-mb-h">
        <span class="mp-mb-code">${t(e.type||"")}</span>
        <span class="mp-mb-meta"><b>${t(o.title||"")}</b><i>${t(o.keywords||"")}</i></span>
        <span class="mp-mb-count">已答 ${e.answered||0}/${e.total||0} 题</span>
      </div>
      <div class="mp-mb-body">
        <div class="mp-mb-dims">${i}</div>
        <div class="mp-mb-sec"><em>一句</em>${t(o.oneLine||"")}</div>
        <div class="mp-mb-two">
          <div><b>优势</b>${(o.strengths||[]).map(r=>t(r)).join("；")}</div>
          <div><b>留意</b>${(o.blindspots||[]).map(r=>t(r)).join("；")}</div>
        </div>
        ${l?`<div class="mp-mb-sec"><em>认知功能</em>主导 ${t((o.stack[0]||{}).code||"")} → 依次展开</div><div class="mp-mb-fn">${l}</div>`:""}
        <div class="mp-mb-sec"><em>工作</em>${t(o.work||"")}</div>
        <div class="mp-mb-sec"><em>关系</em>${t(o.love||"")}</div>
        <div class="mp-mb-sec"><em>学习</em>${t(o.study||"")}</div>
        <div class="mp-mb-sec"><em>课题</em>${t(o.growth||"")}</div>
      </div>
      <div class="mp-mb-note">${t(e.note||"")}</div>
    </section>`};const ut=[["巽","离","坤"],["震","中","兑"],["艮","坎","乾"]],oi={坎:"正北",艮:"东北",震:"正东",巽:"东南",离:"正南",坤:"西南",兑:"正西",乾:"西北",中:"中宫"},Ht=["生气","延年","天医","伏位"],_e=(e,i)=>`<span class="mp-fs-chip${i?" "+i:""}">${t(e)}</span>`,Qa=(e,i,o)=>`<div class="mp-fs-cell${e==="中"?" center":""}"><div class="mp-fs-top"><span class="mp-fs-gua">${t(e)}</span><span class="mp-fs-dir">${t(oi[e]||"")}</span>${i||""}</div>`+(o||"")+"</div>",va=e=>e.length?`<dl class="mp-fs-facts">${e.map(([i,o])=>`<div class="mp-fs-row"><dt>${t(i)}</dt><dd>${t(o)}</dd></div>`).join("")}</dl>`:"",et=(e,i,o,l,r,c)=>`<section class="mp-quick mp-fs" aria-label="风水结果"><div class="mp-quick-h"><b>${t(e)}</b>${i?`<span class="mp-fs-sub">${t(i)}</span>`:""}</div>`+(o.length?`<div class="mp-fs-chips">${o.join("")}</div>`:"")+l+r+c.filter(Boolean).map(d=>`<div class="mp-fs-note">${t(d)}</div>`).join("")+"</section>",Ot=(e,i)=>`<div class="mp-fs-grid" role="group" aria-label="${t(i)}">`+ut.map(o=>o.map(l=>{const r=e.find(u=>u&&u.palace===l);if(!r)return Qa(l,"","");const c=Ht.includes(r.star),d=`<span class="mp-fs-star"${r.role?` title="${t(r.role)}"`:""}>${t(r.star)}<em class="${c?"ok":"bad"}">${c?"吉":"凶"}</em></span>`;return Qa(l,d,"")}).join("")).join("")+"</div>";function Pt(e,i){const o=i.period,l={};for(const z of e.palaces||[])l[z.palace]=z;const r=`<div class="mp-fs-key">每宫依次为 <b>运</b>／<b>山</b>／<b>向</b> 三星；底色高亮＝当运（${t(o)}运）</div><div class="mp-fs-grid" role="group" aria-label="玄空九宫（运/山/向）">`+ut.map(z=>z.map(A=>{const C=l[A];if(!C)return Qa(A,"","");const O=[["运",C.yun],["山",C.shan],["向",C.xiang]].map(([ie,G])=>`<span class="${G===o?"on":""}" title="${t(ie)}星 ${t(G)}">${t(G)}</span>`).join("");return Qa(A,"",`<div class="mp-fs-nums">${O}</div>`)}).join("")).join("")+"</div>",c=e.wangShanWangXiang||{},d=i.jianXiang||{},u=e.timeFlying||null,m=[_e(d.active?`兼${d.jian} ${d.offset}° · 替卦`:"正向 · 下卦",d.active?"ok":""),_e(`山盘 ${i.shanCenter.star}${i.shanCenter.name} · ${i.shanCenter.fly}`),_e(`向盘 ${i.xiangCenter.star}${i.xiangCenter.name} · ${i.xiangCenter.fly}`),_e(c.byChart?"盘面：到山到向":"盘面：未到山到向",c.byChart?"ok":""),_e(c.byTable===null?"表法：替卦不套":c.byTable?"表法：在列":"表法：未列",c.byTable?"ok":"")],f=(z,A)=>`${A} ${z.star}${z.name}（${z.fly}，${z.basis}${z.mode==="替卦"?`；原运星 ${z.original}${z.replaced?"，已替":"，用替而未替"}`:""}）`,h=u?[["year","年"],["month","月"],["day","日"],["hour","时"]].filter(([z])=>u[z]).map(([z,A])=>`${A}${u[z].centerName}（${u[z].fly}）`).join("　"):"",j=va([...d.active?[["替卦",`${d.note}${c.byTable===null?" 正向旺山旺向表不适用于替卦。":""}`]]:[],["入中",`${f(i.shanCenter,"山盘")}；${f(i.xiangCenter,"向盘")}`],["当运",`山星${o}落 ${e.dangYun.shan.text}；向星${o}落 ${e.dangYun.xiang.text}`],["合十",`山星：${(e.heshi.shan||[]).join("、")||"无"}；向星：${(e.heshi.xiang||[]).join("、")||"无"}`],["表法",`${c.note||""}${(c.table||[]).length?` 本运所列：${c.table.join("、")}。`:" 本运表法无局。"}`],...h?[["年月日时",`${h}${u.meta&&u.meta.note?`　${u.meta.note}`:""}`]]:[]]);return et(d.active?"玄空替卦":"玄空下卦",`${i.periodLabel} · 坐${i.sitting} · 向${i.facing}`,m,r,j,[i.note,e.disclaimer])}function gt(e,i){const o=e.mingGua||{},l=Ot([...e.luckyDirections||[],...e.unluckyDirections||[]],"八宅八向（吉凶）"),r=[_e(o.compatible||"—"),_e(`${i.gender}命 · ${i.guaYear} 年立春界`)],c=[];if(e.yearlyFlying){const d=e.yearlyFlying;c.push(["年紫白",`${d.centerName}入中；${d.palaces.filter(u=>u.palace!=="中").map(u=>`${u.palace}${u.name}`).join("、")}`])}return et("八宅命卦",`${o.num}${o.gua}（${o.group}）· ${o.direction}`,r,l,va(c),[i.note,e.disclaimer])}function Dt(e,i){const o=e.layout||{},l=Ot(e.houseStars||[],"宅卦八向（吉凶）"),r=[_e(`${i.houseGua}宅 · ${i.houseGroup}`),_e(`坐${i.sitting}`),_e(`向${i.facing}`)],c=[["门",o.door],["灶",o.stove],["床",o.bed],["厕",o.toilet]];return e.mingMatch&&c.push(["命宅配",e.mingMatch.text]),et("门主灶",`${i.houseGua}宅 · 坐${i.sitting} · 向${i.facing}`,r,l,va(c),[i.birthNote,e.disclaimer])}n.fengshuiHTML=function(e){if(!e||e.system!=="fengshui")return n.quickHTML(e);const i=e.meta||{};return i.action==="xuankong"?Pt(e,i):i.action==="advise"?Dt(e,i):gt(e,i)},n.perfHTML=function(e){if(!e)return"";const i=u=>typeof u=="number"&&isFinite(u)?`${Math.max(0,Math.round(u))}ms`:"",o=e.cached===!0?"（已缓存）":e.cached===!1?"（首次加载）":"",l=[];i(e.engineMs)&&l.push(`引擎 ${i(e.engineMs)}${o}`),i(e.computeMs)&&l.push(`排盘 ${i(e.computeMs)}`),i(e.renderMs)&&l.push(`渲染 ${i(e.renderMs)}`);const r=i(e.totalMs);if(!l.length&&!r)return"";const c=r?`首屏 ${r}`:"耗时";return`<div class="mp-perf" title="本机这一次的实测耗时，不含网络与服务端；换机器、首次加载与已缓存会不同">${l.length?`${c}｜${l.join(" · ")}`:c}</div>`},n.zeriHTML=function(e){if(!e||!e.compare||e.compare.mode!=="candidates"||!Array.isArray(e.days))return n.quickHTML(e);const i=e.meta||{},o=e.shenshaRef||{},l=e.compare.best?e.compare.best.date:"",r=e.days.map(u=>{const m=u.date===l,f=u.excluded||u.verdict==="回避"?"bad":u.verdict==="推荐"?"good":"",h=u.grade||{},j=h.label?`<b>${t(h.label)}</b><em>吉${t(h.ji)} / 凶${t(h.xiong)}　${t(h.decision||"")}</em>`:"—";return`<tr class="mp-zr-row${m?" top":""}${u.excluded?" off":""}">
        <th scope="row"><b>${t(u.date)}</b>${m?'<i class="mp-zr-best">最优</i>':""}
          <em>${t(u.weekday)}　${t(u.lunar)}</em></th>
        <td><b>${t(u.dayGanZhi)}</b><em>${t(u.zhiXing)}日</em></td>
        <td class="mp-zr-score">${t(u.score)}</td>
        <td class="mp-zr-grade">${j}</td>
        <td><span class="mp-zr-v ${f}">${t(u.verdict)}</span></td>
        <td class="mp-zr-why">${t(u.reasons.join("；")||"无特别加减分")}</td>
      </tr>`}).join(""),c=(u,m)=>`<span><em>${t(u)}</em>${m.length?t(m.join("、")):"无"}</span>`,d=e.compare.best?`这一组最优：<b>${t(e.compare.best.date)}</b>（${t(e.compare.best.score)} 分 · ${t(e.compare.best.verdict)}）`+(e.compare.best.ties.length>1?`；同分 ${t(e.compare.best.ties.filter(u=>u!==e.compare.best.date).join("、"))}`:""):"这一组都因冲属相被排除，没有可用的日子";return`<section class="mp-zr" aria-label="择日候选比较">
      <div class="mp-zr-h"><b>择日 · ${t(i.task||"")}</b>
        <span>候选 ${t(i.days)} 天${i.shengXiao?`　当事人属${t(i.shengXiao)}`:"（未给属相，未做冲煞排除）"}</span></div>
      <div class="mp-zr-lead">${d}</div>
      <table class="mp-zr-t"><thead><tr>
        <th scope="col">日期</th><th scope="col">日干支 / 建除</th><th scope="col">分</th><th scope="col">卷十等第</th><th scope="col">结论</th><th scope="col">理由</th>
      </tr></thead><tbody>${r}</tbody></table>
      <div class="mp-zr-lists">
        ${c("推荐",e.best)}${c("可用",e.usable)}${c("回避",e.avoid)}
      </div>
      <p class="mp-zr-note">${t(e.compare.note||"")}</p>
      ${o.text?`<p class="mp-zr-note">神煞依据：${t(o.text)}（${t(o.edition||"")}）；起法 ${t((o.volumes||[]).join("、"))}。未实现起法：${t((o.unsupported||[]).join("、"))}（不计分）。</p>`:""}
      ${o.juan10?`<p class="mp-zr-note">卷十依据：${t(o.juan10.text)}（${t(o.juan10.corpusLines||"")}）；${t(o.juan10.thresholdsNote||"")}${t(o.juan10.note||"")}</p>`:""}
      <p class="mp-zr-note">${t(i.scope||"")}</p>
      <p class="mp-zr-note">${t(e.disclaimer||"")}</p>
    </section>`},n.quickHTML=function(e){if(!e)return"";const o={almanac:"黄历",zeri:"择日",chenggu:"称骨",xiaoliuren:"小六壬",star:"星座",numerology:"生命数字",trend:"人生 K 线",fengshui:"风水",name:"起名",convert:"公农历转换",mbti:"十六型人格"}[e.system]||"速查",l=e.summary||"",r=l?`<pre class="mp-quick-pre">${t(l)}</pre>`:"";return`<section class="mp-quick" aria-label="${t(o)}结果">
      <div class="mp-quick-h"><b>${t(o)}</b></div>
      ${r}
    </section>`},n.summaryCardPNG=function(e,i){try{if(typeof document>"u"||!document.createElement)return"";const o=i&&i.outline||[],l=(i&&i.tables||[]).filter(X=>Array.isArray(X.rows)&&X.rows.length),r=i&&i.systemLabel||e&&e.system||"命理报告",c=900,d=44,u=26,m=(X,ce)=>`${ce?"600 ":""}${X}px "PingFang SC","Microsoft YaHei","Noto Sans CJK SC",sans-serif`,f=document.createElement("canvas"),h=f.getContext?f.getContext("2d"):null;if(!h)return"";const j=(X,ce)=>{const w=[];let S="";for(const L of String(X)){const y=S+L;h.measureText(y).width>ce&&S?(w.push(S),S=L):S=y}return S&&w.push(S),w.length?w:[""]},z=i&&i.envelope||null,A=z&&z.verdict||null,C=String(A&&A.headline||e&&e.brief&&e.brief.headline||e&&e.factHead&&e.factHead.headline||"").trim(),O=String(e&&e.brief&&e.brief.lead||A&&A.condition||e&&e.factHead&&e.factHead.note||"").trim();h.font=m(22,!0);const ie=C?j(C,c-d*2).slice(0,3):[];h.font=m(14);const G=O?j(O,c-d*2).slice(0,2):[],R=ie.length?26+ie.length*32+(G.length?8+G.length*24:0)+16:0;h.font=m(15);let ee=0;const v=o.map(X=>{const ce=j(X.text,c-d*2-70);return ee+=Math.min(ce.length,2)*u+10,{o:X,lines:ce.slice(0,2)}}),q=l[0]||null,de=q?q.rows.slice(0,6):[],J=q?54+de.length*34:0,qe=150+R+ee+(v.length?34:0)+J+120;f.width=c,f.height=qe,h.fillStyle="rgb(255,255,255)",h.fillRect(0,0,c,qe),h.fillStyle="rgb(31,111,63)",h.fillRect(0,0,c,8);let Y=52;h.fillStyle="rgb(27,27,27)",h.font=m(28,!0),h.fillText(`${r} · 摘要`,d,Y),Y+=30,h.fillStyle="rgb(111,106,96)",h.font=m(14);const $e=[e&&e.input&&e.input.datetime?`出生/起局：${e.input.datetime}`:"","本地计算 · 可复现"].filter(Boolean).join("　");if(h.fillText($e,d,Y),Y+=34,ie.length&&(h.fillStyle="rgb(31,111,63)",h.font=m(15,!0),h.fillText("结论",d,Y),Y+=26,h.fillStyle="rgb(27,27,27)",h.font=m(22,!0),ie.forEach((X,ce)=>h.fillText(X,d,Y+ce*32)),Y+=ie.length*32,G.length&&(Y+=8,h.fillStyle="rgb(111,106,96)",h.font=m(14),G.forEach((X,ce)=>h.fillText(X,d,Y+ce*24)),Y+=G.length*24),Y+=16),v.length){h.fillStyle="rgb(31,111,63)",h.font=m(16,!0),h.fillText("一页读懂",d,Y),Y+=26;for(const{o:X,lines:ce}of v)h.fillStyle="rgb(138,131,120)",h.font=m(14,!0),h.fillText(X.label,d,Y),h.fillStyle="rgb(63,58,51)",h.font=m(15),ce.forEach((w,S)=>h.fillText(w,d+70,Y+S*u)),Y+=ce.length*u+10;Y+=8}if(q){h.fillStyle="rgb(31,111,63)",h.font=m(16,!0),h.fillText(q.title,d,Y),Y+=24,h.fillStyle="rgb(138,131,120)",h.font=m(13),h.fillText(q.columns.join(" · "),d,Y),Y+=8,h.strokeStyle="rgb(229,225,216)",h.beginPath(),h.moveTo(d,Y),h.lineTo(c-d,Y),h.stroke(),Y+=22,h.fillStyle="rgb(63,58,51)",h.font=m(14);for(const X of de){const ce=X.filter(Boolean).join(" · "),w=j(ce,c-d*2)[0];h.fillText(w,d,Y),Y+=34}}return Y=qe-62,h.strokeStyle="rgb(229,225,216)",h.beginPath(),h.moveTo(d,Y-18),h.lineTo(c-d,Y-18),h.stroke(),h.fillStyle="rgb(138,131,120)",h.font=m(12),h.fillText("内容用于传统文化学习与自我探索，不构成医疗、投资、法律或人事决策依据。",d,Y+6),h.fillText("dsh-metaphysics · 本机计算，未上传任何数据",d,Y+26),f.toDataURL?f.toDataURL("image/png"):""}catch{return""}}})(),(function(){const s="mp.view",n=["perf","revision","handle","shadow","trace","caliber"],k=["head","body","chart","shortId","castAt","solar","interpret","followup","extra"],_={chart:["bazi","ziwei","hepan","trend","fengshui","name"],ask:["liuyao","meihua","daliuren","qimen","tarot","xiaoliuren"],judge:["wuyunliuqi","taiyi","zeri"],quiz:["mbti","constitution"],lookup:["almanac","chenggu","star","numerology","convert"]},W={quiz:["followup"],lookup:["followup"]};function se(te){const D=String(te||""),I=Object.keys(_);for(let Z=0;Z<I.length;Z++)if(_[I[Z]].indexOf(D)>=0)return I[Z];return"chart"}const fe=()=>{try{return window.localStorage||null}catch{return null}},ue=te=>String(te??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function ye(){try{const te=window.location||{},D=/(?:^|[?&#])dev=([^&]*)/.exec(String((te.search||"")+(te.hash||"")));if(D)return D[1]!=="0"&&D[1]!=="false";const I=fe();return!!(I&&I.getItem(s)==="dev")}catch{return!1}}function t(te){const D=fe();if(D)try{D.setItem(s,te?"dev":"user")}catch{}return!!te}function Ne(te){if(!te||te.__mpDevBound)return;te.__mpDevBound=!0;let D=0,I=0;te.addEventListener("click",()=>{const Z=Date.now();if(D=Z-I>1200?1:D+1,I=Z,D<5)return;D=0;const K=t(!ye());te.title=K?"已切到开发者视图（再点五下切回）":"",typeof window.__MPRepaint=="function"&&window.__MPRepaint()})}function B(te,D){const I=te||{},Z=D||{},K=typeof Z.mode=="string"?Z.mode==="dev":ye(),oe=W[se(Z.system)]||[],Me=k.filter(Ae=>oe.indexOf(Ae)<0);return K&&Me.push(...n),Me.push("exportBar"),Me.map(Ae=>I[Ae]).filter(Boolean).join("")}function we(te){const D=typeof te=="string"?te.replace(/^LY-/,""):"";return D?'<p class="mp-shortid" title="同一组参数、同一版本算出来是同一个编号；回看或反馈时报它就行">盘号 '+ue(D)+"</p>":""}window.__MPCompose={DEV_SECTIONS:n,USER_SEGS:k,TIER:_,TIER_SKIP:W,tierOf:se,devOn:ye,setDev:t,bindDevSwitch:Ne,composeResult:B,shortIdHTML:we,esc:ue}})();function qn(s,n){return window.__MPCompose&&window.__MPCompose.composeResult?window.__MPCompose.composeResult(s,{system:n}):Object.keys(s).map(k=>s[k]).filter(Boolean).join("")}const vt=new Set;function Mn(){return!!(window.__MPCompose&&window.__MPCompose.devOn&&window.__MPCompose.devOn())}const Si="dsh-metaphysics/history-v1";function Cn(){try{const s=window.localStorage&&window.localStorage.getItem(Si),n=s?JSON.parse(s):[];return Array.isArray(n)?n.filter(k=>k&&typeof k=="object"&&typeof k.kind=="string").slice(0,20):[]}catch{return[]}}function Ni(s){try{window.localStorage&&window.localStorage.setItem(Si,JSON.stringify(s.slice(0,20)))}catch{}}const Ln=(s,n)=>s.kind===n.kind&&s.date===n.date&&s.time===n.time&&s.gender===n.gender&&!!s.hourUnknown==!!n.hourUnknown&&s.trueSolar!==!1==(n.trueSolar!==!1)&&s.lateZi!==!1==(n.lateZi!==!1)&&s.address===n.address&&s.lines===n.lines&&s.question===n.question&&s.mhMode===n.mhMode&&s.upper===n.upper&&s.lower===n.lower&&s.direction===n.direction&&s.spread===n.spread&&s.changing===n.changing&&(s.kind!=="qimen"||s.qimenRule===n.qimenRule&&s.qLateZi===n.qLateZi)&&(s.kind!=="zeri"||s.task===n.task&&s.days===n.days&&s.shengXiao===n.shengXiao&&s.zCand===n.zCand)&&(s.kind!=="xiaoliuren"||s.xlrMode===n.xlrMode&&s.num1===n.num1&&s.num2===n.num2&&s.num3===n.num3)&&(s.kind!=="trend"||s.toAge===n.toAge)&&(s.kind!=="fengshui"||s.fsMode===n.fsMode&&s.fsPeriod===n.fsPeriod&&s.sitting===n.sitting&&s.facing===n.facing)&&(s.kind!=="name"||s.nnMode===n.nnMode&&s.surname===n.surname&&s.givenName===n.givenName&&s.limitN===n.limitN)&&(s.kind!=="convert"||s.convMode===n.convMode&&s.lunarDate===n.lunarDate&&!!s.leapMonth==!!n.leapMonth)&&(s.kind!=="hepan"||s.hpChart===n.hpChart&&s.partnerDate===n.partnerDate&&s.partnerTime===n.partnerTime&&s.partnerGender===n.partnerGender&&s.partnerAddress===n.partnerAddress&&!!s.thirdOn==!!n.thirdOn&&s.p2Date===n.p2Date&&s.p2Time===n.p2Time&&s.p2Gender===n.p2Gender&&s.p2Address===n.p2Address);function An(s,n){if(s==="bazi"){const _=["year","month","day","hour"].map(W=>n.pillars&&n.pillars[W]).filter(Boolean).map(W=>W.ganzhi).join(" ");return n.hourUnknown||n.pillars&&!n.pillars.hour?`${_}（时柱暂缺）`:_}return s==="ziwei"?`${n.soul?n.soul.branch:""}宫 ${n.bureau?n.bureau.name:""} ${n.lunar?n.lunar.year+"年":""}`.trim():s==="liuyao"?n.ben&&n.ben.name?n.ben.name:"":s==="meihua"?n.ben&&n.ben.name?`${n.ben.name} 动${n.moving}`:"":s==="daliuren"?`${n.dayGanZhi||""} ${n.geJu?n.geJu.name:""}`:""}const F=window.__PP,Ha=()=>typeof performance<"u"&&performance.now?performance.now():Date.now();let De=0;const nt=typeof window.__mpEnsureEngine=="function"?window.__mpEnsureEngine:async()=>window.Engine,Tn=`
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
/* 出盘后参数区只读：值还在、看得见，只是不能随手改——要改先点「修改参数」。
   缩进用的是面板自己那一套网格，这里只压视觉，不动布局。 */
.mp-panel.mp-locked .mp-input,.mp-panel.mp-locked .mp-textarea{opacity:.62;cursor:default}
.mp-panel.mp-locked .mp-input:hover,.mp-panel.mp-locked .mp-textarea:hover{border-color:var(--dsw-alias-border-l1)}
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
/* 应验提示：低调一行，可关；说清只在本机，别给人「被收集」的感觉 */
.mp-nudge{margin-top:12px;padding:10px 12px;border-radius:10px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);font-size:12px;line-height:1.75}
.mp-nudge-x{margin-left:8px;padding:2px 8px;border-radius:6px;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-secondary);font-family:inherit;font-size:11.5px;cursor:pointer}
.mp-nudge-x:hover{border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-brand-primary)}
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
`,{useState:N,useEffect:pa,useRef:En}=it,qi=s=>String(s).padStart(2,"0");function _n(s){const n=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s||""));if(!n)return!1;const k=Number(n[1]),_=Number(n[2]),W=Number(n[3]);if(_<1||_>12||W<1)return!1;const fe=[31,k%4===0&&k%100!==0||k%400===0?29:28,31,30,31,30,31,31,30,31,30,31];return W<=fe[_-1]}function Mi(s){const n=/^(\d{4})\s*[年./-]\s*(\d{1,2})\s*[月./-]\s*(\d{1,2})\s*日?$/.exec(String(s||"").trim());if(!n)return"";const k=`${n[1]}-${qi(n[2])}-${qi(n[3])}`;return _n(k)?k:""}function Hn(s){const n=String(s||"").trim();if(/^\d{0,4}(-\d{0,2}){0,2}$/.test(n))return n;if(/[年月日/.]/.test(n)){const _=Mi(n);if(_)return _}const k=n.replace(/\D/g,"").slice(0,8);return k.length<=4?k:k.length<=6?`${k.slice(0,4)}-${k.slice(4)}`:`${k.slice(0,4)}-${k.slice(4,6)}-${k.slice(6)}`}function Wt(s){const n=s.value||"",[k,_]=N(n),W=En(n);pa(()=>{W.current=n,_(n)},[n]);const se=()=>{const fe=k.trim();if(!fe){_(W.current),s.onInvalid&&s.onInvalid("");return}const ue=Mi(fe);if(ue){W.current=ue,_(ue),ue!==n&&s.onChange(ue);return}_(W.current),s.onInvalid&&s.onInvalid(fe)};return p("input",{className:"mp-input",type:"text",inputMode:"numeric",autoComplete:"off",placeholder:"年-月-日，如 1990-05-12",value:k,onChange:fe=>{_(Hn(fe.target.value))},onBlur:se,onKeyDown:fe=>{fe.key==="Enter"&&(fe.preventDefault(),se())}})}const yt=4,la=12,wt=5,da=27,Qt=45;let $t=null;function kt(){if($t)return $t;let s=null;try{s=V.compute({system:"mbti"})}catch{s=null}const n=s&&s.questions||[];return n.length?($t={total:s&&s.total||n.length,questions:n,scale:s&&s.scale||{}},$t):{total:0,questions:[],scale:{}}}function On(s){const{answers:n,page:k,onPick:_,onPage:W,onSubmit:se,onClear:fe}=s,ue=kt(),ye=Math.max(1,Math.ceil(ue.total/yt)),t=k*yt,Ne=ue.questions.slice(t,t+yt),B=n.filter(I=>I!=null).length,we=ue.total?Math.round(B/ue.total*100):0,te=k>=ye-1,D=B>=la;return p("div",{className:"mp-quiz"},p("div",{className:"mp-quiz-top"},p("div",{className:"mp-quiz-bar","aria-hidden":"true"},p("i",{style:{width:we+"%"}})),p("span",{className:"mp-quiz-count"},`第 ${k+1} / ${ye} 页 · 已答 ${B} / ${ue.total}`)),p("div",{className:"mp-quiz-list"},Ne.map((I,Z)=>{const K=t+Z;return p("div",{key:I.id||K,className:"mp-quiz-q"},p("div",{className:"mp-quiz-qt"},p("b",null,String(K+1).padStart(2,"0")),p("span",null,I.text)),p("div",{className:"mp-quiz-opts",role:"radiogroup","aria-label":`第 ${K+1} 题`},[1,2,3,4,5].map(oe=>p("label",{key:oe,className:"mp-quiz-o"+(n[K]===oe?" on":"")},p("input",{type:"radio",name:`mpmbq${K}`,value:String(oe),checked:n[K]===oe,onChange:()=>_(K,oe)}),p("b",null,String(oe)),p("span",null,ue.scale[oe]||"")))))})),p("div",{className:"mp-quiz-nav"},p("button",{className:"mp-quiz-btn",disabled:k<=0,onClick:()=>W(-1)},"上一页"),te?null:p("button",{className:"mp-quiz-btn",onClick:()=>W(1)},"下一页"),p("button",{className:"mp-quiz-btn primary",disabled:!D,onClick:se},"看结果"),p("button",{className:"mp-quiz-btn",onClick:fe},"清空"),p("span",{className:"mp-quiz-hint"},D?`已够 ${la} 题，可以看结果；答完 ${ue.total} 题会更准。`:`答满 ${la} 题可先看结果（还差 ${la-B} 题）。`)))}function Pn(s){const{paper:n,answers:k,page:_,onPick:W,onPage:se,onSubmit:fe,onClear:ue}=s;if(!n||!Array.isArray(n.questions))return p("div",{className:"mp-quiz"},p("div",{className:"mp-quiz-hint"},"正在加载问卷题面…"));const ye=n.questions.length,t=Math.max(1,Math.ceil(ye/wt)),Ne=_*wt,B=n.questions.slice(Ne,Ne+wt),we=k.filter(K=>K!=null).length,te=ye?Math.round(we/ye*100):0,D=_>=t-1,I=we>=da,Z=K=>{const oe=(n.scale||[]).filter(Me=>Me&&Me.v===K)[0];return oe?oe.label:String(K)};return p("div",{className:"mp-quiz"},p("div",{className:"mp-quiz-top"},p("div",{className:"mp-quiz-bar","aria-hidden":"true"},p("i",{style:{width:te+"%"}})),p("span",{className:"mp-quiz-count"},`第 ${_+1} / ${t} 页 · 已答 ${we} / ${ye}`)),p("div",{className:"mp-quiz-list"},B.map((K,oe)=>{const Me=Ne+oe;return p("div",{key:K.no||Me,className:"mp-quiz-q"},p("div",{className:"mp-quiz-qt"},p("b",null,String(Me+1).padStart(2,"0")),p("span",null,K.text)),p("div",{className:"mp-quiz-opts",role:"radiogroup","aria-label":`第 ${Me+1} 题`},[1,2,3,4,5].map(Ae=>p("label",{key:Ae,className:"mp-quiz-o"+(k[Me]===Ae?" on":"")},p("input",{type:"radio",name:`mpcsq${Me}`,value:String(Ae),checked:k[Me]===Ae,onChange:()=>W(Me,Ae)}),p("b",null,String(Ae)),p("span",null,Z(Ae))))))})),p("div",{className:"mp-quiz-nav"},p("button",{className:"mp-quiz-btn",disabled:_<=0,onClick:()=>se(-1)},"上一页"),D?null:p("button",{className:"mp-quiz-btn",onClick:()=>se(1)},"下一页"),p("button",{className:"mp-quiz-btn primary",disabled:!I,onClick:fe},"看结果"),p("button",{className:"mp-quiz-btn",onClick:ue},"清空"),p("span",{className:"mp-quiz-hint"},I?`已够 ${da} 题，可以看结果；答完 ${ye} 题会更准。`:`答满 ${da} 题可先看结果（还差 ${da-we} 题）。`)))}class Dn extends(it.Component||Object){constructor(n){super(n),this.state={err:null}}static getDerivedStateFromError(n){return{err:n}}componentDidCatch(n,k){console.error("[metaphysics] 面板渲染异常",n,k)}render(){if(!this.state.err)return this.props.children;const n=this.state.err,k=String(n&&n.stack||"").split(`
`).slice(0,14).join(`
`);return p("div",{className:"mp-wrap"},p("div",{className:"mp-panel"},p("div",{className:"mp-lbl"},"命理面板渲染出错——把下面这段发给我"),p("pre",{style:{whiteSpace:"pre-wrap",fontSize:12,lineHeight:1.5,maxHeight:320,overflow:"auto",margin:"8px 0"}},String(n&&n.message||n)+`

`+k),p("div",{className:"mp-lbl"},"环境：__PP "+typeof F+" · Engine "+typeof window.Engine+" · React "+typeof it+" · 版本 "+(typeof F=="object"&&F&&(window.__MP_VER||"?"))+(window.__MP_UNRELEASED?" · 未发版改动 "+window.__MP_UNRELEASED+" 项":""))))}}function Fn(s){const n=s&&s.size?s.size:20,k=s&&s.active;return p("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.6,strokeLinecap:"round","aria-hidden":!0,style:{opacity:k?1:.72}},p("circle",{cx:12,cy:12,r:8.2}),p("path",{d:"M12 3.8a4.1 4.1 0 0 1 0 8.2 4.1 4.1 0 0 0 0 8.2"}),p("circle",{cx:12,cy:8,r:1.1,fill:"currentColor",stroke:"none"}),p("circle",{cx:12,cy:16,r:1.1,fill:"currentColor",stroke:"none"}))}const Je=[{k:"ziwei",label:"紫微",timeLabel:"出生时刻",hint:"紫微斗数需要出生日期、时刻与性别；出生地只影响真太阳时修正。"},{k:"bazi",label:"八字",timeLabel:"出生时刻",hint:"四柱八字按节气与真太阳时定时柱，出生地越准，时柱越稳。"},{k:"liuyao",label:"六爻",timeLabel:"起卦时刻",hint:"六爻不需要出生时间：只用起卦当下的日辰定六神、月建定旺衰，卦由摇出。"},{k:"meihua",label:"梅花",timeLabel:"起卦时刻",hint:"梅花用起卦时刻的年月日时数成卦，也可直接给两个数字起卦；与出生时间无关。"},{k:"daliuren",label:"六壬",timeLabel:"起卦时刻",hint:"大六壬用起卦时刻的日干支、时支与月将起天地盘；同样与出生时间无关。"},{k:"qimen",label:"奇门",timeLabel:"起局时刻",hint:"奇门时家转盘：用起局时刻定节气、三元与局数；换局规则决定符头与节气如何对齐。"},{k:"hepan",label:"合盘",timeLabel:"你的出生时刻",hint:"合盘按「日主 + 夫妻宫 + 五行互补」看两个人的相处与互补，需要双方出生信息。"},{k:"tarot",label:"塔罗",timeLabel:"",hint:"塔罗不看时间，只记录抽牌时刻与你的提问。"},{k:"almanac",label:"黄历",timeLabel:"",hint:"黄历按公历日期查农历、干支、宜忌、时辰吉凶、二十八宿与吉神方位；只做本地计算。"},{k:"convert",label:"农历",timeLabel:"",hint:"公农历互转：公历生日可反查农历；只知道农历生日时，可转成公历再排盘。"},{k:"zeri",label:"择日",timeLabel:"",hint:"择日把区间内每天的建除宜忌与事项适配打分排序，并按属相排除冲煞日。"},{k:"xiaoliuren",label:"小六壬",timeLabel:"起课时刻",hint:"小六壬用农历月/日/时掐指，也可用三个随机数起课。"},{k:"star",label:"星座",timeLabel:"",hint:"星座按公历日期给出太阳星座与当日基调；同日同星座结果固定。"},{k:"numerology",label:"生命数字",timeLabel:"",hint:"生命数字按公历生日归约出生命路径数、生日数与态度数。"},{k:"mbti",label:"人格",timeLabel:"",hint:"十六型人格是 24 道自我报告题的 MBTI 风格测算：4 题一页，按 1–5 打分，答满 12 题即可看结果；只作自我参照，不是官方量表。"},{k:"constitution",label:"体质",timeLabel:"",hint:"中医体质是九种体质各 5 题的自评问卷（共 45 题，1 没有 / 5 总是），按转化分判主次体质并给调养方向；不是医学诊断。"},{k:"wuyunliuqi",label:"运气",timeLabel:"",hint:"五运六气按大寒分年：中运、司天在泉、六步。"},{k:"taiyi",label:"太乙",timeLabel:"",hint:"太乙神数按积年推局：太乙落宫、八门、文昌、计神、始击、主客算与四将。"},{k:"trend",label:"人生K线",timeLabel:"出生时刻",hint:"人生 K 线按大运与流年十神给逐年运势分，画成走势图。"},{k:"fengshui",label:"风水",timeLabel:"",hint:"风水看八宅命卦、大游年四吉四凶与流年九宫飞星；也可按坐向看门主灶倾向，或按运与坐向排玄空下卦盘。"},{k:"name",label:"起名",timeLabel:"",hint:"起名按八字喜用匹配字库五行，可评估现有名字或生成候选名。"}];function Oa(s){return String(s).padStart(2,"0")}const ei=["almanac","convert","zeri","xiaoliuren","star","numerology","trend","fengshui","name","constitution","wuyunliuqi","taiyi"],Ci=[{sys:"liuyao",label:"六爻",tip:"摇一卦：只用起卦当下定六神旺衰，所问之事写下面（必填）"},{sys:"meihua",label:"梅花",tip:"梅花易数：按起卦时刻的年月日时成卦，也可改成两个数字起卦"},{sys:"daliuren",label:"六壬",tip:"大六壬：按起卦时刻的日干支、时支与月将起天地盘"},{sys:"qimen",label:"奇门",tip:"奇门遁甲：时家转盘，默认拆补取局，可换超神接气/置闰"},{sys:"tarot",label:"塔罗",tip:"塔罗：不看时间，点一下就抽牌；牌阵在下面选"},{sys:"xiaoliuren",label:"小六壬",tip:"小六壬：按起课时刻推算，也可切报数起课"}],Li="mp.cast.open",Rn=Array.isArray(window.__MPGroups)?window.__MPGroups:[],Ai="mp.recent.tabs",Ti="mp.first.view",Ei=3;function zt(s){try{return JSON.parse(window.localStorage.getItem(s)||"null")}catch{return null}}function jt(s,n){try{window.localStorage.setItem(s,JSON.stringify(n))}catch{}}const _i="mp.panel.result.v1",In=1,Hi=6,Bn=5e5,ai={computeHits:0,cacheHits:0};typeof window<"u"&&(window.__MPStats=ai);function Gn(s){let n=2166136261;for(let k=0;k<s.length;k++)n^=s.charCodeAt(k),n=Math.imul(n,16777619);return(n>>>0).toString(36)}function Oi(){const s=zt(_i);return s&&typeof s=="object"&&!Array.isArray(s)?s:{}}function Un(s){if(!s)return null;const n=Oi()[s];return n&&n.result&&n.result.r?n:null}function Zn(s,n){if(!(!s||!n))try{if(JSON.stringify(n).length>Bn)return;const k=Oi();k[s]=n;const _=Object.keys(k);_.length>Hi&&_.sort((W,se)=>(k[W].at||0)-(k[se].at||0)).slice(0,_.length-Hi).forEach(W=>{delete k[W]}),jt(_i,k)}catch{}}function Kn(s){const n=new Date(s);if(Number.isNaN(n.getTime()))return"";const k=W=>new Date(W.getFullYear(),W.getMonth(),W.getDate()).getTime(),_=Math.round((k(new Date)-k(n))/864e5);return _<=0?"今天":_===1?"昨天":`${Oa(n.getMonth()+1)}-${Oa(n.getDate())}`}function ti(){const s=new Date;return{date:`${s.getFullYear()}-${Oa(s.getMonth()+1)}-${Oa(s.getDate())}`,time:`${Oa(s.getHours())}:${Oa(s.getMinutes())}`}}const Yn={ziwei:"birth",bazi:"birth",hepan:"birth",liuyao:"cast",meihua:"cast",daliuren:"cast",qimen:"cast",tarot:"none",almanac:"date",zeri:"date",star:"date",numerology:"date",convert:"date",trend:"birth",fengshui:"birth",name:"birth",xiaoliuren:"cast",mbti:"none",constitution:"none",wuyunliuqi:"date",taiyi:"date"},Pi={date:"1990-05-12",time:"14:30"},Pa=s=>Yn[s]||"none",Ie=window.__MPCore||{},ia=Ie.needAsk||(s=>!1),le={ref:null,seats:[],seatOk:{},seatDisposers:[],contribution:"",keys:"",injectType:"",spec:"",errs:[],regs:0,mounted:0},Xe={r:null,q:"",it:null,entry:null};let ca="";function Di(){const s=[];return s.push("inputActions "+(le.ref?"已拿到":"未拿到")),s.push("渲染 "+le.mounted+" 次"),s.push("注册 "+le.regs+" 次"),s.push("inject "+(le.injectType||"?")),s.push("槽位 "+(le.spec||"?")),le.contribution&&s.push("贡献 "+le.contribution),le.errs.length&&s.push("错误："+le.errs.join(" / ")),"桥自检："+s.join("；")}function Fi(s){if(le.errs.length>=3)return;const n=s&&s.message?String(s.message):String(s);le.errs.push(n.slice(0,90))}function Vn(s){if(!s)return null;const n=s.inputActions;if(n&&typeof n.setDraft=="function"&&typeof n.submit=="function")return n;const k=s.actions&&s.actions.input;return k&&typeof k.setDraft=="function"&&typeof k.submit=="function"?k:null}function Ri(s,n){const k=Vn(s);return pa(()=>{if(le.seats.indexOf(n)<0&&le.seats.push(n),le.keys=s?Object.keys(s).join(","):"",k){le.ref=k;try{window.__MPComposer=k}catch{}}return()=>{le.ref===k&&(le.ref=null)}},[k,n]),k}function Jn(){const s=Xe.r;if(!s)return"";try{const n=V.askPrompt?V.askPrompt(s,{question:Xe.q,interpret:Xe.it}):null;return n&&n.text||String(s.summary||"")}catch{return String(s.summary||"")}}function Ii(s){return le.mounted+=1,Ri(s,"input.right")?p("button",{type:"button",className:"mp-chip ok",title:Xe.r?"把上一张盘的摘要和问题发进对话窗":"先在侧栏「烛微命盘」里排一张盘",onClick:()=>{const k=Jn();k&&Gi(k)}},"命理·问"):p("span",{className:"mp-chip warn",title:"命理：已占住输入框槽位，但没拿到 inputActions；把这句话告诉作者"},"命理·未就绪")}function Bi(s){return le.mounted+=1,Ri(s,"composer.dock"),null}function Gi(s){let n=le.ref;if(!n)try{n=window.__MPComposer||null}catch{n=null}return!n||typeof n.setDraft!="function"||typeof n.submit!="function"?!1:(n.setDraft(s),n.submit(),!0)}function Xn(s){const n=s.kind==="ziwei"?F.ziweiHTML(s.r):s.kind==="bazi"?F.baziHTML(s.r,{chenggu:s.chenggu,marriage:s.marriage,life:s.life})+(s.trend?F.trendHTML(s.trend,{brief:!1}):""):s.kind==="meihua"?F.meihuaHTML(s.r):s.kind==="daliuren"?F.daliurenHTML(s.r):s.kind==="qimen"?F.qimenHTML(s.r)+F.qimenFactsHTML(s.r):s.kind==="hepan"?s.r.chart==="ziwei"?F.ziweiHepanHTML(s.r):F.hepanHTML(s.r):s.kind==="tarot"?F.tarotHTML(s.r):s.kind==="liuyao"?F.liuyaoHTML(s.r):s.kind==="almanac"?F.almanacHTML(s.r):s.kind==="zeri"?F.zeriHTML(s.r):s.kind==="trend"?F.trendHTML(s.r):s.kind==="name"?F.nameHTML(s.r):s.kind==="mbti"?F.mbtiHTML(s.r):s.kind==="constitution"?F.constitutionHTML(s.r):s.kind==="wuyunliuqi"?F.wuyunliuqiHTML(s.r):s.kind==="taiyi"?F.taiyiHTML(s.r):s.kind==="fengshui"?F.fengshuiHTML(s.r):F.quickHTML(s.r),k=n.startsWith('<section class="mp-br"')?n.indexOf("</section>"):-1,_=k<0?n:n.slice(k+10),W=k<0?"":n.slice(0,k+10);return _+F.plainHTML(s.r)+W}function Wn(s){const n=!!s.open,k=p("button",{type:"button",className:"mp-castrow-h","aria-expanded":n?"true":"false","aria-controls":"mp-castlist",onClick:s.onToggle,title:"展开六个占卜体系的起卦入口：点一个就切过去，并用当前时刻起卦"},p("span",{className:"mp-castrow-t"},"起卦"),p("span",{className:"mp-castrow-l"},n?"六个占卜体系，点一下就起":Ci.map(_=>_.label).join(" · ")),p("i",{className:"mp-castrow-i","aria-hidden":"true"},n?"▴":"▾"));return n?p("div",{key:"cast",className:"mp-castrow open"},k,p("div",{key:"list",id:"mp-castlist",className:"mp-castlist"},Ci.map(_=>p("button",{key:_.sys,type:"button",className:"mp-castchip"+(s.tab===_.sys?" on":""),"data-cast":_.sys,"aria-pressed":s.tab===_.sys?"true":"false",title:_.tip,onClick:()=>s.onCast(_.sys)},_.label))),s.hasResult?p("div",{key:"ask",className:"mp-castask"},p("button",{type:"button",className:"mp-castgo",onClick:s.onAsk,title:"把这张盘和所问之事发进 DSH 对话窗（与下面的「问进对话」同一个通路）"},"把这张盘问进对话")):null):p("div",{key:"cast",className:"mp-castrow"},k)}function Qn(){const[s,n]=N("ziwei"),[k,_]=N("1990-05-12"),[W,se]=N("14:30"),[fe,ue]=N(!1),[ye,t]=N("female"),[Ne,B]=N(""),[we,te]=N("1992-08-15"),[D,I]=N("10:00"),[Z,K]=N("female"),[oe,Me]=N(""),[Ae,za]=N("bazi"),[We,St]=N(!1),[Da,Fa]=N("1990-01-01"),[Ra,ja]=N("12:00"),[Sa,Ia]=N("male"),[Ba,Nt]=N(""),[ma,Na]=N("chaibu"),[Qe,qa]=N(!0),[Ga,qt]=N(()=>{try{return window.localStorage.getItem("dsh-metaphysics/nudge-off")==="1"}catch{return!1}}),[Ma,Ca]=N(!0),[st,ot]=N("same-day"),[Ua,ni]=N(!1),[ua,si]=N(""),[rt,Be]=N(""),[Mt,pt]=N(null),[,lt]=N(0);pa(()=>{const a=g=>{if(!g.ctrlKey||!g.shiftKey||String(g.key||"").toLowerCase()!=="d")return;const $=window.__MPCompose;!$||!$.setDev||!$.devOn||(g.preventDefault(),$.setDev(!$.devOn()),lt(M=>M+1))};return window.addEventListener("keydown",a),()=>window.removeEventListener("keydown",a)},[]);const[ga,La]=N({}),[Aa,dt]=N(null),[fa,Ct]=N([{year:"2019",kind:"career"},{year:"2022",kind:"love"}]),[ze,na]=N(null),[Za,ba]=N("开业"),[Ka,Lt]=N("30"),[sa,Ya]=N(""),[oa,Va]=N(""),[ea,ct]=N("solar2lunar"),[Ge,ha]=N(""),[aa,At]=N(!1),[Ue,mt]=N("time"),[Ja,Tt]=N(""),[Xa,Et]=N(""),[Wa,_t]=N(""),[xa,ut]=N(()=>new Array(kt().total).fill(null)),[oi,Ht]=N(0),[_e,Qa]=N(null),[va,et]=N(()=>new Array(Qt).fill(null)),[Ot,Pt]=N(0),[gt,Dt]=N("60"),[e,i]=N("natal"),[o,l]=N("9"),[r,c]=N("子"),[d,u]=N("午"),[m,f]=N("assess"),[h,j]=N("李"),[z,A]=N(""),[C,O]=N("6"),[ie,G]=N(!1),[R,ee]=N(""),[v,q]=N(null),[de,J]=N(!1),[qe,Y]=N(""),[$e,X]=N(""),[ce,w]=N(null);pa(()=>{const a=document.querySelector(".mp-panel");if(!a)return;const g=!!v&&!de;a.classList.toggle("mp-locked",g),a.querySelectorAll("input, select, textarea").forEach($=>{if($.closest(".mp-askbox, .mp-askblock, .mp-askonly"))return;$.tagName==="SELECT"||$.type==="checkbox"||$.type==="radio"||$.type==="button"?$.disabled=g:$.readOnly=g})},[v,de,s]);const[S,L]=N(()=>Cn()),[y,ae]=N(()=>zt(Ti)==="flat"?"flat":"group"),[ge,xe]=N(()=>{const a=zt(Ai);return Array.isArray(a)?a:[]}),[E,ne]=N({}),[Q,re]=N(null),[ve,Se]=N(()=>F.profilesLoad()),[P,Ce]=N(null),[Ze,Fe]=N(""),[Re,Le]=N(""),[ya,je]=N(""),[ri,b]=N(!1),[H,be]=N("three"),[pe,He]=N(""),[ke,Pe]=N("general");function ft(){return ua.trim()||(v&&ia(v.kind)?String(pe||"").trim():"")}pa(()=>{v&&v.r&&(Xe.r=v.r,Xe.q=ft(),Xe.it=v.it||null);const a=v&&v.it;a&&a.error&&!vt.has(a.errorId||a.error)&&(vt.size>40&&vt.clear(),vt.add(a.errorId||a.error),console.warn("[metaphysics] 解读未生成 "+(a.errorId||""),a.error))},[v,ua,pe]);const[at,pi]=N(null),[Zi,is]=N(zt(Li)===!0),[ns,Ft]=N(!1),[Ta,Ki]=N("time"),[Rt,Yi]=N(""),[It,Vi]=N(""),[Bt,Ji]=N(""),[ss,wa]=N(""),[li,Gt]=N({birth:null,cast:null}),os=Je.find(a=>a.k===s)||Je[0],bt=s==="bazi"||s==="ziwei"||s==="hepan"||s==="trend"||s==="fengshui"||s==="name",Ye=Pa(s),Xi=!(s==="meihua"&&Ta==="number"),Wi=s!=="tarot"&&s!=="mbti"&&s!=="constitution"&&Xi,Qi=Wi&&Ye!=="date",Ws=Qi,Oe=async(a,g,$,M)=>{const x=a||s,he=$||Ta,Ee=x==="bazi"||x==="trend",ta=M&&typeof M.hourUnknown=="boolean"?M.hourUnknown:fe,Te=g||(Ee&&ta?{date:k,time:"12:00"}:{date:k,time:W}),Ve=M&&M.gender?M.gender:ye,Ea=M&&typeof M.address=="string"?M.address:Ne,ht=M&&typeof M.trueSolar=="boolean"?M.trueSolar:Qe,tt=M&&typeof M.lateZi=="boolean"?M.lateZi:Ma,hn=M&&typeof M.lines=="string"?M.lines:R,Yt=M&&typeof M.question=="string"?M.question:pe,fi=Ha(),xn=++De,_a=()=>xn!==De;w(null),je("");try{let $a=0,vn=null;b(!0);try{await nt(x);const U=window.__MP_LAST_LOAD;$a=U&&typeof U.ms=="number"?U.ms:Ha()-fi,vn=U&&typeof U.cached=="boolean"?U.cached:null}catch(U){if(_a())return;Le(U&&U.message?U.message:String(U)),q(null);return}finally{_a()||b(!1)}if(_a())return;const yn=`${Te.date}T${Te.time}`,T={system:x};if(T.shadow=x!=="mbti"&&x!=="constitution",T.trace=x==="liuyao"||x==="bazi"||x==="ziwei"||x==="qimen"||x==="daliuren",x!=="tarot"&&(T.datetime=yn),x==="bazi"||x==="ziwei"||x==="hepan"||x==="trend"){if(T.gender=Ve,T.trueSolar=ht,Ea.trim()){T.address=Ea.trim();try{const U=await V.geocodeAddress(T.address,{online:ie});U&&typeof U.lon=="number"&&(T.longitude=U.lon,T.geo=U)}catch(U){console.error("[metaphysics] 地址解析失败，退回内置表",U)}if(_a())return}(x==="bazi"||x==="ziwei")&&(T.cross=Ua),T.lateZi=tt,Ee&&ta&&(T.hourUnknown=!0)}if(x==="liuyao"){const U=Ie.parseLines(hn);U.lines?T.lines=U.lines:U.warning&&je(U.warning)}if(x==="qimen"&&(T.juMethod=ma,T.lateZiHourMode=st,T.direction=ke),x==="bazi"&&(T.verifyPast=6),x==="zeri"){T.startDate=Te.date,T.task=Za,T.days=Number(Ka)||30,sa&&(T.shengXiao=sa);const U=oa.split(/[,，、\s]+/).filter(Boolean);U.length&&(T.candidates=U)}if(x==="xiaoliuren")if(T.mode=Ue,Ue==="number"){const U=[Ja,Xa,Wa].map(ra=>String(ra??"").trim());if(U.some(ra=>ra===""||!Number.isFinite(Number(ra)))){Le("报数起课要三个数，1 到 99 随口报就行，比如 7、13、29。"),q(null);return}T.num1=Number(U[0]),T.num2=Number(U[1]),T.num3=Number(U[2])}else{T.date=Te.date;const U=Number(String(Te.time).split(":")[0]);T.hour=Number.isFinite(U)?U:12}if(x==="mbti"){delete T.datetime;const U=xa.slice();for(;U.length&&U[U.length-1]==null;)U.pop();U.length&&(T.answers=U)}if(x==="constitution"&&(delete T.datetime,T.answers=va.slice()),x==="trend"&&Ee&&ta&&(T.hourUnknown=!0),x==="trend"&&(T.toAge=Number(gt)||60),x==="fengshui"&&(T.action=e,e==="natal"?T.gender=Ve:(T.sitting=r,T.facing=d,delete T.datetime,e==="xuankong"&&(T.period=Number(o)||9))),x==="name"){if(T.action=m,T.surname=h.trim(),!T.surname||m==="assess"&&!z.trim()){Le(m==="assess"?"起名要先填姓和名，一个字也行。":"起名要先填姓。"),q(null);return}m==="generate"?(T.gender=Ve,T.limit=Number(C)||6,T.trueSolar=ht,T.lateZi=tt):(T.givenName=z.trim(),(!Te.date||!Te.time)&&delete T.datetime)}if(x==="convert")if(T.system="convert",ea==="lunar2solar"){const U=/^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(Ge).trim());if(!U){Le("农历日期要按「年-月-日」填，例如 2026-9-17；闰月单独勾选。");return}T.mode="lunar2solar",T.lunarYear=Number(U[1]),T.lunarMonth=Number(U[2]),T.lunarDay=Number(U[3]),T.isLeapMonth=aa,delete T.datetime}else T.mode="solar2lunar";if(x==="tarot"&&(T.spread=H),x==="hepan"&&(T.chart=Ae,T.partner={datetime:`${we}T${D}`,gender:Z,address:oe.trim()||void 0,trueSolar:Qe},We&&(T.partner2={datetime:`${Da}T${Ra}`,gender:Sa,address:Ba.trim()||void 0,trueSolar:Qe})),ia(x)){if(!Yt.trim()){Le("请先填写「所问之事」——一句话即可，例如：今年是否适合换工作？"),Ft(!0),q(null);return}Ft(!1),T.question=Yt.trim(),x==="liuyao"&&(T.direction=ke)}if(x==="meihua"&&(T.mode=he,he==="number")){if(Rt.trim()===""||It.trim()===""){Le("数字起卦需要填两个数（第一个数定上卦、第二个数定下卦）。"),q(null);return}if(T.upper=Number(Rt),T.lower=Number(It),!Number.isFinite(T.upper)||!Number.isFinite(T.lower)){Le("两个数都要是数字，例如 17 和 29。"),q(null);return}Bt!==""&&(T.changing=Number(Bt))}x==="trend"&&!T.asOf&&Ie.todayStamp&&(T.asOf=Ie.todayStamp());const wn=Gn(`${In}|${JSON.stringify(T)}`),Vt=Un(wn);if(Vt&&Vt.result&&Vt.result.kind===x){if(_a())return;ai.cacheHits++,q(Vt.result),J(!1),w({engineMs:$a,computeMs:0,cached:!0,totalMs:Ha()-fi,renderMs:null}),pt(null),dt(null),La({}),na(null),Le(""),wa("");return}const Zs=Ha();ai.computeHits++;const ka=V.compute(T),Ks=Ha()-Zs;let bi=null;try{bi=F.shadowTrack?F.shadowTrack(ka):null}catch{bi=null}let hi=null;if(x==="bazi"&&!ta){if(!V.buildChenggu){try{await nt("chenggu")}catch{}if(_a())return}if(V.buildChenggu)try{hi=V.buildChenggu({year:Number(Te.date.slice(0,4)),month:Number(Te.date.slice(5,7)),day:Number(Te.date.slice(8,10)),hour:Number(Te.time.slice(0,2)),minute:Number(Te.time.slice(3,5)),lateZi:tt})}catch{hi=null}}let xi=null;if(x==="bazi"&&V.buildMarriage)try{xi=V.buildMarriage(ka)}catch{xi=null}let vi=null;if(x==="bazi"&&V.buildFacets)try{vi=V.buildFacets(ka)}catch{vi=null}let yi=null;if(x==="bazi")try{yi=V.compute({system:"trend",datetime:yn,gender:Ve,toAge:100,trueSolar:ht,lateZi:tt,...Ie.todayStamp?{asOf:T.asOf||Ie.todayStamp()}:{},...T.dst!==void 0?{dst:T.dst}:{},...T.address?{address:T.address}:{},...typeof T.longitude=="number"?{longitude:T.longitude}:{},...T.geo?{geo:T.geo}:{}})}catch{yi=null}let wi=null;if(V.caliberCompare)try{wi=V.caliberCompare(T)}catch{wi=null}const Ys=ia(x)||x==="qimen"?{question:ia(x)?Yt.trim():"",direction:ke}:void 0,Jt=V.interpret?V.interpret(ka,Ys):null;Jt&&ka.cross&&V.crossSection&&(Jt.sections=[...Jt.sections||[],V.crossSection(ka.cross)]);const Vs=Pa(x)==="cast"&&(x!=="meihua"||he==="time"),$n={kind:x,r:ka,it:Jt,at:Te,timed:Vs,trend:yi,caliber:wi,shadowDiff:bi,chenggu:hi,marriage:xi,life:vi,gender:Ve,address:Ea,trueSolar:ht,lateZi:tt};q($n),J(!1),Zn(wn,{result:$n,at:Date.now()});const kn=U=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>U>1?kn(U-1):zn()):setTimeout(zn,0)},zn=()=>{xn===De&&w({engineMs:$a,computeMs:Ks,cached:vn,totalMs:Ha()-fi,renderMs:null})};if(kn(2),pt(null),dt(null),La({}),na(null),Le(""),wa(""),x!=="tarot"&&x!=="mbti"&&x!=="constitution"){const U=!!(Ee&&ta),ra={kind:x,date:Te.date,time:U?"":Te.time,hourUnknown:U,gender:Ve,address:Ea,trueSolar:ht,lateZi:tt,lines:x==="liuyao"?hn:"",question:ia(x)?Yt.trim():"",direction:ke,spread:H,mhMode:he,upper:Rt,lower:It,changing:Bt,...x==="qimen"?{qimenRule:ma,qLateZi:st}:{},...x==="zeri"?{task:Za,days:Ka,shengXiao:sa,zCand:oa}:{},...x==="xiaoliuren"?{xlrMode:Ue,num1:Ja,num2:Xa,num3:Wa}:{},...x==="trend"?{toAge:gt}:{},...x==="fengshui"?{fsMode:e,fsPeriod:o,sitting:r,facing:d}:{},...x==="name"?{nnMode:m,surname:h,givenName:z,limitN:C}:{},...x==="convert"?{convMode:ea,lunarDate:Ge,leapMonth:aa}:{},...x==="hepan"?{hpChart:Ae,partnerDate:we,partnerTime:D,partnerGender:Z,partnerAddress:oe,thirdOn:We,p2Date:Da,p2Time:Ra,p2Gender:Sa,p2Address:Ba}:{},label:An(x,ka),at:Date.now()};L(Js=>{const jn=[ra,...Js.filter(Xs=>!Ln(Xs,ra))].slice(0,20);return Ni(jn),jn}),x!=="tarot"&&x!=="mbti"&&x!=="constitution"&&(Xe.entry=ra),un(!1)}}catch($a){if(_a())return;Le($a&&$a.message?$a.message:String($a)),q(null)}},rs=async a=>{const g=Pa(a),$=++De;if(Le(""),a==="mbti"){je(""),b(!0);try{await nt(a)}catch(x){$===De&&Le(x&&x.message?x.message:String(x))}finally{$===De&&b(!1)}if($!==De)return;n(a),xa.filter(x=>x!=null).length>=la?Oe(a):q(null);return}if(a==="constitution"){je(""),b(!0);try{if(await nt(a),$===De&&!_e){const x=V.compute({system:"constitution"});x&&x.paper&&Qa(x)}}catch(x){$===De&&Le(x&&x.message?x.message:String(x))}finally{$===De&&b(!1)}if($!==De)return;n(a),va.filter(x=>x!=null).length>=da?Oe(a):q(null);return}if(n(a),g==="none"){Oe(a);return}const M=li[g]||(g==="cast"||g==="date"?ti():{date:Pi.date,time:Pi.time});_(M.date),se(M.time),Oe(a,M)},ps=a=>{Je.some(g=>g.k===a)&&xe(g=>{const $=(g||[]).filter(x=>x&&x.tab&&x.tab!==a),M=[{tab:a,at:Date.now()}].concat($).slice(0,Ei);return jt(Ai,M),M})},en=a=>{const g=a==="flat"?"flat":"group";ae(g),jt(Ti,g)},Ut=a=>{ps(a),rs(a)},ls=()=>{const a=!Zi;is(a),jt(Li,a)},ds=a=>{Ut(a)},cs=a=>{_(a),Ye!=="none"&&Gt(g=>Object.assign({},g,{[Ye]:{date:a,time:W}}))},ms=a=>{se(a),Ye!=="none"&&Gt(g=>Object.assign({},g,{[Ye]:{date:k,time:a}}))},Qs=()=>{const a=ti();_(a.date),se(a.time),Ye!=="none"&&Gt(g=>Object.assign({},g,{[Ye]:null})),Oe(s,a)},di=()=>{if(s==="mbti"){const a=xa.filter(g=>g!=null).length;if(a<la){je(`先答满 ${la} 题再看结果（现答 ${a} 题，还差 ${la-a} 题）。`);return}Oe(s);return}if(s==="constitution"){const a=va.filter(g=>g!=null).length;if(a<da){je(`先答满 ${da} 题再看结果（现答 ${a} 题，还差 ${da-a} 题）。`);return}Oe(s);return}if(Ye==="cast"&&!li[Ye]){const a=ti();_(a.date),se(a.time),Oe(s,a);return}Oe(s)},us=()=>{const a={date:"1990-05-12",time:"14:30"};n("bazi"),t("male"),B("河北石家庄"),Gt(g=>Object.assign({},g,{birth:a})),_(a.date),se(a.time),Oe("bazi",a,null,{gender:"male",address:"河北石家庄"})},an=a=>{Ki(a),Oe(s,{date:k,time:W},a)},gs=()=>!!(window.matchMedia&&window.matchMedia("(max-width: 640px)").matches),ci=()=>at===null?gs():at,Zt=(a,g,$)=>{if(!g)return;const M=he=>{a.textContent=he?"已复制":"复制失败",setTimeout(()=>{a.textContent=$},1400)},x=()=>{try{const he=document.createElement("textarea");he.value=g,he.setAttribute("readonly",""),he.style.position="fixed",he.style.opacity="0",document.body.appendChild(he),he.select();const Ee=!!(document.execCommand&&document.execCommand("copy"));return document.body.removeChild(he),Ee}catch{return!1}};try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(g).then(()=>M(!0),()=>M(x()));return}}catch{}M(x())},fs=a=>Zt(a,a.getAttribute("data-shadow-copy")||"","复制 ID"),bs=a=>Zt(a,a.getAttribute("data-handle-copy")||"","复制句柄"),hs=a=>{const g=a.closest(".mp-trace-layer")||document.getElementById("mp-trace-layer"),$=g&&g.querySelector("[data-trace-md]");Zt(a,$?$.value:"","复制 Markdown")},xs=()=>{try{return String(location.href).split("#")[0]}catch{return""}},vs=()=>{if(!v||!v.r)return null;try{return V.askPackages?V.askPackages(v.r,{question:ft(),interpret:v.it,base:xs()}):null}catch{return null}},tn=[["full","复制提问","完整提问：盘面摘要 + 阅读层次 + 回答骨架，粘进任何对话窗都能用"],["brief","复制精简","一句话版：体系 + 盘号 + 你的问题，够助手认出是哪张盘"],["structured","复制参数","结构化参数（JSON）：助手可直接照 args 调 compute，不必解析自然语言"],["link","复制深链","深链：把这张盘的参数编进链接，打开即还原同一张盘（换台机器、发给朋友都行）"]],ys=(a,g)=>{const $=vs();if(!$){Be("还没有可以复制的盘：先排一张。");return}const M=a==="link"?$.link:$[a];if(!M){Be(a==="link"?"这张盘没拿到盘号（随机抽牌只复现参数、不复现牌面），深链做不出来；用「复制提问」那一档。":"这一档暂时是空的，换一档试试。");return}Zt(g,M,tn.find(x=>x[0]===a)[1]),a==="link"&&Be("深链已复制：打开就还原这张盘，也可以直接发给别人。链接里是编码不是加密，别公开贴。")},ws=()=>{const a=document.getElementById("mp-trace-layer");if(!a)return;a.classList.add("open"),a.setAttribute("aria-hidden","false");const g=a.querySelector("[data-trace-close]");g&&g.focus&&g.focus()},nn=()=>{const a=document.getElementById("mp-trace-layer");if(!a)return;a.classList.remove("open"),a.setAttribute("aria-hidden","true");const g=document.querySelector("[data-trace-open]");g&&g.focus&&g.focus()},$s=a=>{const g=a.target&&a.target.closest?a.target.closest("[data-shadow-copy]"):null;if(g){fs(g);return}const $=a.target&&a.target.closest?a.target.closest("[data-handle-copy]"):null;if($){bs($);return}if(a.target&&a.target.closest?a.target.closest("[data-trace-open]"):null){ws();return}const x=a.target&&a.target.closest?a.target.closest("[data-trace-copy]"):null;if(x){hs(x);return}if(a.target&&a.target.closest?a.target.closest("[data-mp-askcopy]"):null){js();return}if(a.target&&a.target.closest?a.target.closest("[data-trace-close]"):null){nn();return}const ta=a.target&&a.target.closest?a.target.closest(".mp-it-head"):null;if(!ta)return;const Te=ta.closest(".mp-it");if(!Te)return;const Ve=!Te.classList.contains("folded");Te.classList.toggle("folded",Ve),ta.setAttribute("aria-expanded",Ve?"false":"true");const Ea=ta.querySelector(".mp-it-hint");Ea&&(Ea.textContent=Ve?"点击展开":"点击收起"),pi(Ve)},sn=(a,g)=>{if(!v||!(ia(s)||s==="qimen"))return;const $={question:ia(s)?(g===void 0?pe:g).trim():"",direction:a===void 0?ke:a},M=V.interpret?V.interpret(v.r,$):null;let x=v.r;if((s==="liuyao"||s==="qimen")&&x&&x.trace&&V.buildTrace)try{const he=s==="liuyao"?V.buildTrace(x,{direction:$.direction,gender:x.useGod&&x.useGod.gender||"male",refresh:!0}):V.buildTrace(x,{direction:$.direction});he&&(x=Object.assign({},x,{trace:he}))}catch{}q(Object.assign({},v,{r:x,it:M}))},ks=a=>!a||!a.timed||!a.at?"":`<div class="mp-cast">起卦时刻：<b>${a.at.date} ${a.at.time}</b>　（来自你的本机时间，点「此刻」可重新取当下）</div>`,zs=()=>{try{const a=v&&v.r&&v.r.summary?v.r.summary:"";if(!a)return;navigator.clipboard.writeText(a).then(()=>wa("已复制"),()=>wa("复制失败"))}catch{wa("复制失败")}},js=()=>{if(!v||!v.r||!window.Engine||!window.Engine.buildEventPrompt)return;const a=Ie&&Ie.kindOfDirection?Ie.kindOfDirection(ke):"other";let g;try{g=window.Engine.buildEventPrompt(v.r,{question:(pe||"").trim(),kind:a,gender:ye,timeKnown:!0})}catch{g=null}g&&g.text&&navigator.clipboard.writeText(g.text).then(()=>wa("已复制问事提示"),()=>wa("复制失败"))},on=()=>{if(!(!v||!v.r||!ua.trim()))try{pt(V.followup?V.followup(v.r,ua.trim()):null)}catch(a){pt({question:ua.trim(),ok:!1,answer:"追问失败："+(a&&a.message?a.message:a),evidence:[],confidence:"弱"})}},rn=()=>{if(!(!v||!v.r))try{const a=V.askPrompt?V.askPrompt(v.r,{question:ft(),interpret:v.it}):null,g=a&&a.text?a.text:String(v.r.summary||"");if(Gi(g)){Be("已发到对话窗，往下看回复。");return}const $="（"+Di()+"）";navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(g).then(()=>Be("对话输入框还没就绪"+$+"，已复制提问；粘进对话窗回车即可。"),()=>Be("对话输入框还没就绪"+$+"，复制也没成功；先点「复制文字结果」再贴。")):Be("对话输入框还没就绪"+$+"；先点「复制文字结果」再贴进对话窗。")}catch(a){Be("发到对话窗失败："+(a&&a.message?a.message:a))}},Ss=()=>{const a=[],g=window.__MP_VER||"未知";a.push("# 命理插件反馈"),a.push(""),a.push("## 我遇到的情况"),a.push(""),a.push("（在这里写一句就好：哪里不对 / 读不懂哪一段 / 算得和别人不一样 / 想加什么。下面这些是自动带的复现信息，不用改。）"),a.push(""),a.push("## 复现信息"),a.push(""),a.push("- 插件版本：v"+g);{const x=Number(window.__MP_UNRELEASED)||0;x&&a.push("- 未发版改动："+x+" 项（版本号未变，说明这份产物比 v"+g+" 新）")}const $=Je.find(x=>x.k===s)?.label||s;if(a.push("- 体系："+$+($===s?"":"（"+s+"）")),pe&&a.push("- 所问之事："+pe),ke&&ke!=="general"){const x=(Array.isArray(V.DIRECTIONS)?V.DIRECTIONS:[]).find(he=>he.key===ke);a.push("- 询问方向："+(x?x.label:ke))}a.push(""),a.push("### 输入"),a.push(""),a.push("```"),(Pa(s)==="time"||Pa(s)==="date")&&(a.push(`日期：${k}`),Pa(s)==="time"&&a.push(`时刻：${fe?"（未知，按三柱排）":W}`),a.push(`性别：${ye==="male"?"男":"女"}`),Ne&&a.push(`出生地：${Ne}`),a.push(`真太阳时：${Qe?"开":"关"}　晚子时换日：${Ma?"开":"关"}`),s==="qimen"&&a.push(`奇门取局：${ma}`),Ua&&a.push("交叉验证：开"));const M={合盘:()=>{a.push(`对方：${we} ${D} ${Z==="male"?"男":"女"}${oe?" "+oe:""}（${Ae} 盘）`),We&&a.push(`第三方：${Da} ${Ra} ${Sa==="male"?"男":"女"}${Ba?" "+Ba:""}`)},择日:()=>{a.push(`事项：${Za}　起算：${k}　天数：${Ka}${sa?"　属相："+sa:""}${oa?"　候选日："+oa:""}`)},起名:()=>{a.push(`姓：${h||"（未填）"}　名：${z||"（未填）"}　模式：${m}${m==="generate"?"　候选数："+(C||"默认"):""}`)},公农历:()=>{a.push(`模式：${ea}${Ge?"　农历输入："+Ge:""}${aa?"（闰月）":""}`)},小六壬:()=>{a.push(`模式：${Ue}${Ue==="number"?`　报数：${Ja}/${Xa}/${Wa}`:""}`)},风水:()=>{a.push(`动作：${e}${e==="natal"?"":`　坐：${r}　向：${d}`}${e==="xuankong"?`　运：${o}`:""}`)}};if(M[$]&&M[$](),a.push("```"),a.push(""),Re&&(a.push("### 报错原文"),a.push(""),a.push("```"),a.push(String(Re)),a.push("```"),a.push("")),v&&v.r){a.push("### 结果摘要（引擎原文，前 40 行）"),a.push(""),a.push("```");const x=String(v.r.summary||(V.renderText?V.renderText(v.r):"")||"");a.push(x.split(`
`).slice(0,40).join(`
`)),a.push("```"),v.r.handle&&(a.push(""),a.push("盘号（可据此复现同一张盘）：`"+v.r.handle+"`"))}else a.push("### 结果摘要"),a.push(""),a.push("（这次没有生成盘面——如果是在排盘过程中出错，上面的「报错原文」就是关键。）");return a.push(""),a.push("## 联系渠道"),a.push(""),a.push("- GitHub issue：https://github.com/xuanfu-web/dsh-metaphysics/issues"),a.push("- 邮件：1129440028@qq.com"),a.push("- 微信群：dsh-metaphysics"),a.join(`
`)},pn=()=>{const a=Ss();try{if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(a).then(()=>{Y("已复制"),X("粘到 issue / 邮件 / 群里即可")}).catch(()=>{Y("复制失败"),X("可改用「存 .md」或手动选中")});else{const g=document.createElement("textarea");g.value=a,g.style.cssText="position:fixed;left:-9999px;top:0",document.body.appendChild(g),g.select();const $=document.execCommand&&document.execCommand("copy");g.remove(),Y($?"已复制":"复制失败"),X($?"粘到 issue / 邮件 / 群里即可":"可改用「存 .md」或手动选中")}}catch{Y("复制失败"),X("可改用「存 .md」")}setTimeout(()=>{Y(""),X("")},4e3)},Ns=()=>{try{pn()}catch{}const a=encodeURIComponent("[反馈] "+(Je.find(g=>g.k===s)?.label||s)+(Re?"：报错":"：使用问题"));try{window.open("https://github.com/xuanfu-web/dsh-metaphysics/issues/new?title="+a,"_blank","noopener")}catch{X("浏览器拦了弹窗，请手动打开 GitHub issues")}},qs=()=>{if(!(!v||!v.r))try{const a=V.renderText?V.renderText(v.r):v.r.summary||"",g=new Blob([a],{type:"text/markdown;charset=utf-8"}),$=document.createElement("a");$.href=URL.createObjectURL(g),$.download=`烛微命盘报告-${v.r.system}.md`,document.body.appendChild($),$.click(),$.remove(),setTimeout(()=>URL.revokeObjectURL($.href),2e3)}catch(a){console.error("[metaphysics] 导出失败",a)}},Ms=()=>{if(!(!v||!v.r))try{const a=F.summaryCardPNG?F.summaryCardPNG(v.r,v.it):"";if(!a){wa("当前环境不支持 Canvas 导出");return}const g=document.createElement("a");g.href=a,g.download=`烛微命盘摘要-${v.r.system}.png`,document.body.appendChild(g),g.click(),g.remove()}catch(a){console.error("[metaphysics] 长图导出失败",a)}},ln={fontSize:12,padding:"5px 12px"},Cs=()=>{!v||!v.r||!v.r.past||dt(V.verifyFit?V.verifyFit(v.r.past.rows,ga):null)},Ls=()=>{if(!(!v||v.kind!=="bazi"))try{const a=v.at||{date:k,time:W},[g,$,M]=String(a.date).split("-").map(Number),[,x]=String(a.time).split(":").map(Number),he=fa.filter(Ee=>Number(Ee.year)).map(Ee=>({year:Number(Ee.year),kind:Ee.kind}));na(V.rectifyBirth?V.rectifyBirth({base:{year:g,month:$,day:M,minute:Number.isFinite(x)?x:0},gender:v.gender||ye,events:he,lateZi:typeof v.lateZi=="boolean"?v.lateZi:Ma,trueSolar:typeof v.trueSolar=="boolean"?v.trueSolar:Qe,address:String(v.address||"").trim()||void 0}):{error:"当前客户端未加载生时校正模块"})}catch(a){na({error:a&&a.message?a.message:String(a)})}},me=(a,g)=>p("label",{className:"mp-field"},p("span",{className:"mp-lbl"},a),g),dn=a=>{n(a.kind),a.date&&_(a.date),a.time&&se(a.time),ue(!!a.hourUnknown),a.gender&&t(a.gender),B(a.address||""),typeof a.trueSolar=="boolean"&&qa(a.trueSolar),typeof a.lateZi=="boolean"&&Ca(a.lateZi),ee(a.lines||""),He(a.question||""),Pe(a.direction||"general"),be(a.spread||{1:"one",3:"three",5:"five"}[a.count]||"three"),Ki(a.mhMode||"time"),Yi(a.upper||""),Vi(a.lower||""),Ji(a.changing||""),a.kind==="qimen"&&(typeof a.qimenRule=="string"&&Na(a.qimenRule),typeof a.qLateZi=="string"&&ot(a.qLateZi)),a.kind==="zeri"&&(typeof a.task=="string"&&ba(a.task),a.days!=null&&Lt(String(a.days)),typeof a.shengXiao=="string"&&Ya(a.shengXiao),typeof a.zCand=="string"&&Va(a.zCand)),a.kind==="xiaoliuren"&&(mt(a.xlrMode==="number"?"number":"time"),a.num1!=null&&Tt(String(a.num1)),a.num2!=null&&Et(String(a.num2)),a.num3!=null&&_t(String(a.num3))),a.kind==="trend"&&a.toAge!=null&&Dt(String(a.toAge)),a.kind==="fengshui"&&(typeof a.fsMode=="string"&&i(a.fsMode),a.fsPeriod!=null&&l(String(a.fsPeriod)),typeof a.sitting=="string"&&c(a.sitting),typeof a.facing=="string"&&u(a.facing)),a.kind==="name"&&(typeof a.nnMode=="string"&&f(a.nnMode),typeof a.surname=="string"&&j(a.surname),typeof a.givenName=="string"&&A(a.givenName),a.limitN!=null&&O(String(a.limitN))),a.kind==="convert"&&(typeof a.convMode=="string"&&ct(a.convMode),typeof a.lunarDate=="string"&&ha(a.lunarDate),typeof a.leapMonth=="boolean"&&At(a.leapMonth)),a.kind==="hepan"&&(a.hpChart&&za(a.hpChart),typeof a.partnerDate=="string"&&te(a.partnerDate),typeof a.partnerTime=="string"&&I(a.partnerTime),typeof a.partnerGender=="string"&&K(a.partnerGender),typeof a.partnerAddress=="string"&&Me(a.partnerAddress),typeof a.thirdOn=="boolean"&&St(a.thirdOn),typeof a.p2Date=="string"&&Fa(a.p2Date),typeof a.p2Time=="string"&&ja(a.p2Time),typeof a.p2Gender=="string"&&Ia(a.p2Gender),typeof a.p2Address=="string"&&Nt(a.p2Address)),Ft(!1),re(a)},As=()=>{L([]),Ni([])},[Ke,Kt]=N(()=>{try{return F.casesLoad()}catch{return[]}}),[Ts,cn]=N(!1),[mi,mn]=N("all"),[Es,un]=N(!1),_s=()=>{try{Kt(F.casesLoad())}catch{}mn("all"),cn(!0)},ui=()=>cn(!1),Hs=a=>a==="all"?Ke.length:Ke.filter(g=>g.status===a).length,gi=mi==="all"?Ke:Ke.filter(a=>a.status===mi),Os=()=>{if(!Xe.entry){je("这张盘没有可存的参数，重排一次再存。");return}try{const a=F.casesAdd(Xe.entry);a&&a.ok?(Kt(a.list),un(!0)):je("卦例没能存进本机（存储被禁用或已满），排盘不受影响。")}catch{je("卦例没能存进本机（存储被禁用或已满），排盘不受影响。")}},gn=a=>{const g=a?F.casesExportMasked(Ke):F.casesExport(Ke);if(!g){je("还没有可导出的卦例");return}try{const $=new Blob([g],{type:"application/x-ndjson;charset=utf-8"}),M=URL.createObjectURL($),x=document.createElement("a");x.href=M,x.download=a?`metaphysics-cases-masked-${new Date().toISOString().slice(0,10)}.jsonl`:`metaphysics-cases-${new Date().toISOString().slice(0,10)}.jsonl`,document.body.appendChild(x),x.click(),x.remove(),setTimeout(()=>{try{URL.revokeObjectURL(M)}catch{}},1e3),je(a?`已导出 ${Ke.length} 条卦例（脱敏：去年份、时刻整点化、去出生地）`:`已导出 ${Ke.length} 条卦例（JSONL）`)}catch($){je("导出失败："+($&&$.message?$.message:"当前环境不支持下载"))}},Ps=a=>{const g=a.entry||{},$=new Date(a.at),M=x=>String(x).padStart(2,"0");return p("div",{key:a.id,className:"mp-case"},p("button",{className:"mp-case-main",onClick:()=>{dn(Object.assign({},g)),ui()},title:[g.date,g.hourUnknown?"时辰未知":g.time,g.address].filter(Boolean).join(" ")||"点一下回填这组参数并重排"},p("b",null,F.profKindLabel(g.kind)),p("span",null,g.label||a.question||"—"),p("i",null,`${M($.getMonth()+1)}-${M($.getDate())} ${M($.getHours())}:${M($.getMinutes())}`)),p("select",{className:"mp-case-sel",value:a.status,title:"标应验状态",onChange:x=>Kt(F.casesSetStatus(a.id,x.target.value))},F.CASE_STATUS.map(x=>p("option",{key:x,value:x},F.caseStatusLabel(x)))),p("button",{className:"mp-case-del",title:"删除这条",onClick:()=>Kt(F.casesRemove(a.id))},"删"))},Ds=["bazi","ziwei","trend"],fn=a=>{n(a.kind),_(a.date),a.time&&se(a.time),ue(!!a.hourUnknown),a.gender&&t(a.gender),B(a.address||""),qa(a.trueSolar!==!1),Ca(a.lateZi!==!1)},Fs=a=>{const g=F.profEvent(a.target);if(!g)return;const $=x=>ve.find(he=>he.id===x),M=a.currentTarget.querySelector(".mp-prof-name");if(Fe(""),g.action==="use"){const x=$(g.id);if(!x)return;if(!F.profUsable(x)){je("这张档案没有出生时刻，先补上时刻再存一次。");return}ca="",Se(F.profilesTouch(x.id)),fn(x),Oe(x.kind,{date:x.date,time:x.hourUnknown?"12:00":x.time},void 0,{gender:x.gender||void 0,address:x.address||"",hourUnknown:!!x.hourUnknown,trueSolar:x.trueSolar!==!1,lateZi:x.lateZi!==!1});return}if(g.action==="edit"){const x=$(g.id);if(!x)return;fn(x),ca=x.label,Ce(x.id);return}if(g.action==="cancel"){ca="",Ce(null);return}if(g.action==="pin"){Se(F.profilesPin(g.id));return}if(g.action==="del"){if(Ze!==g.id){Fe(g.id);return}Se(F.profilesRemove(g.id)),P===g.id&&(ca="",Ce(null)),je("已从本机删除这张档案卡（不影响已经排出来的盘）。");return}if(g.action==="put"){const x=P,he=F.profFromForm({kind:s,date:k,time:W,hourUnknown:fe,gender:ye,address:Ne,trueSolar:Qe,lateZi:Ma},M?M.value:ca,P||void 0);if(!he){je("先填好出生日期（和时刻），再存档案。");return}const Ee=F.profilesPut(he);if(!Ee.ok){je("档案没能存进本机（存储被禁用或已满），排盘不受影响。");return}Se(Ee.list),ca="",Ce(null),M&&(M.value=""),je(`${x?"已更新档案":"已存入我的命盘"}「${Ee.item.label}」。`)}},Rs=a=>{const g=a.target&&a.target.closest?a.target.closest(".mp-prof-name"):null;g&&(ca=g.value)},Is=a=>{const g=V.formOf?V.formOf(a):null;if(!g){Oe("ziwei");return}const $=Je.some(Ee=>Ee.k===g.tab)?g.tab:"ziwei",M={date:g.date||k,time:g.time||W},x=g.lines===void 0?void 0:Array.isArray(g.lines)?g.lines.join(" "):String(g.lines);g.date&&_(g.date),g.time&&se(g.time),g.gender&&t(g.gender),typeof g.address=="string"&&B(g.address),typeof g.trueSolar=="boolean"&&qa(g.trueSolar),typeof g.lateZi=="boolean"&&Ca(g.lateZi),x!==void 0&&ee(x),g.question&&He(g.question),n($);const he=V.restNote?V.restNote(g):"";Be(`已按深链还原：${a.label}${g.question?`｜${g.question}`:""}${he?`　${he}`:""}`),Oe($,M,void 0,{gender:g.gender,address:g.address,trueSolar:g.trueSolar,lateZi:g.lateZi,lines:x,question:g.question})};pa(()=>{let a=!1;const g=De;return(async()=>{let $=null;try{await nt(s);const M=typeof location<"u"?String(location.href):"";M&&M.indexOf("mp=")>=0&&window.Engine&&window.Engine.parseAskLink&&($=window.Engine.parseAskLink(M))}catch{$=null}if(!(a||De!==g)){if($&&$.ok)try{Is($);return}catch{}Oe("ziwei")}})(),()=>{a=!0}},[]),pa(()=>{if(!Q)return;const a=Q.kind;re(null),Oe(a)},[Q]),pa(()=>{const a=g=>{if(g.key!=="Escape")return;const $=document.getElementById("mp-trace-layer");$&&$.classList.contains("open")&&nn()};return document.addEventListener("keydown",a),()=>document.removeEventListener("keydown",a)},[]);const bn=(ge||[]).filter(a=>a&&Je.some(g=>g.k===a.tab)).slice(0,Ei),Bs=a=>(Je.find(g=>g.k===a)||{}).label||a,Gs=({k:a,label:g,tip:$,wide:M})=>p("button",{key:a,type:"button",title:$,className:"mp-tool"+(M?" wide":"")+(s===a?" on":""),"data-tab":a,onClick:()=>Ut(a)},p("b",null,g),p("span",null,$)),Us=[p("div",{key:"profiles",className:"mp-profwrap",onClick:Fs,onInput:Rs,dangerouslySetInnerHTML:{__html:F.profilesHTML(ve,{editingId:P,armedDel:Ze,bar:Ds.indexOf(s)>=0?F.profilesBarHTML({editingId:P,name:ca}):""})}}),p("section",{key:"start",className:"mp-start","aria-label":"选择要算的事"},p("div",{className:"mp-start-top"},p("div",{className:"mp-recent",hidden:bn.length===0},p("span",{className:"mp-recent-lbl"},"最近用过"),p("span",{className:"mp-recent-list"},bn.map(a=>p("button",{key:a.tab,type:"button",className:"mp-rc",onClick:()=>Ut(a.tab)},Bs(a.tab),p("i",null,Kn(a.at)))))),p("div",{className:"mp-viewsw",role:"group","aria-label":"首屏视图"},p("button",{type:"button",className:y==="group"?"on":"","aria-pressed":y==="group"?"true":"false",onClick:()=>en("group")},"分组"),p("button",{type:"button",className:y==="flat"?"on":"","aria-pressed":y==="flat"?"true":"false",onClick:()=>en("flat")},"平铺"))),y==="group"?p("div",{className:"mp-groups"},Rn.map(a=>{const g=!!E[a.title],$=Math.max(0,a.items.length-4);return p("section",{key:a.title,className:"mp-tgroup"+(g?" open":"")},p("div",{className:"mp-tgroup-head"},p("h2",null,a.title),p("p",null,a.hint)),p("div",{className:"mp-ttools"},a.items.map(Gs),$>0?p("button",{key:"more",type:"button",className:"mp-tmore","aria-expanded":g?"true":"false",onClick:()=>ne(M=>Object.assign({},M,{[a.title]:!g}))},g?"收起":`还有 ${$} 个`):null))})):null),p("div",{key:"tabs",className:"mp-tabs"+(y==="flat"?"":" hide"),role:"tablist","aria-label":"命理体系"},Je.map(a=>p("button",{key:a.k,role:"tab","aria-selected":s===a.k?"true":"false",tabIndex:s===a.k?0:-1,className:"mp-tab"+(s===a.k?" on":""),onClick:()=>Ut(a.k)},a.label))),p("div",{key:"head",className:"mp-panel"},Wn({tab:s,open:Zi,onToggle:ls,onCast:ds,onAsk:rn,hasResult:!!v}),p("div",{className:"mp-row"},Wi?me(bt?"出生日期（公历）":Ye==="date"?"日期（公历）":"起卦日期（公历）",p(Wt,{value:k,onChange:cs,onInvalid:()=>je("日期请按「年-月-日」填写，例如 1990-05-12。")})):null,Qi?me(bt?"出生时刻":"起卦时刻",p("input",{className:"mp-input",type:"time",value:W,disabled:fe&&(s==="bazi"||s==="trend"),onChange:a=>ms(a.target.value)})):null,s==="bazi"||s==="trend"?p("label",{className:"mp-chk",title:"不知道出生时辰时勾这里：不排时柱，起运按日估算，结果首行会写明"},p("input",{type:"checkbox",checked:fe,onChange:a=>ue(a.target.checked)})," 时辰未知"):null,bt?me("性别",p("select",{className:"mp-input",value:ye,onChange:a=>t(a.target.value)},p("option",{value:"female"},"女"),p("option",{value:"male"},"男"))):null,bt?me("出生地（省/市即可）",p("input",{className:"mp-input",placeholder:"如 河北石家庄 / 成都",value:Ne,onChange:a=>B(a.target.value)})):null,s==="bazi"||s==="ziwei"?p("label",{className:"mp-field mp-checks"},p("input",{type:"checkbox",checked:Ua,onChange:a=>ni(a.target.checked)}),p("span",{className:"mp-lbl"},"八字 × 紫微 交叉验证")):null,s==="hepan"?me("对方出生日期",p(Wt,{value:we,onChange:te,onInvalid:()=>je("对方出生日期请按「年-月-日」填写，例如 1992-08-15。")})):null,s==="hepan"?me("对方出生时刻",p("input",{className:"mp-input",type:"time",value:D,onChange:a=>I(a.target.value)})):null,s==="hepan"?me("对方性别",p("select",{className:"mp-input",value:Z,onChange:a=>K(a.target.value)},p("option",{value:"female"},"女"),p("option",{value:"male"},"男"))):null,s==="hepan"?me("合盘方式",p("div",{className:"mp-seg"},p("button",{className:Ae==="bazi"?"on":"",onClick:()=>za("bazi")},"八字"),p("button",{className:Ae==="ziwei"?"on":"",onClick:()=>za("ziwei")},"紫微"))):null,s==="hepan"?me("对方出生地（可空）",p("input",{className:"mp-input",placeholder:"如 四川成都",value:oe,onChange:a=>Me(a.target.value)})):null,s==="hepan"?p("label",{className:"mp-field mp-checks"},p("input",{type:"checkbox",checked:We,onChange:a=>St(a.target.checked)}),p("span",{className:"mp-lbl"},"三方合盘（加入第三人）")):null,s==="hepan"&&We?me("第三方出生日期",p(Wt,{value:Da,onChange:Fa,onInvalid:()=>je("第三方出生日期请按「年-月-日」填写，例如 1990-01-01。")})):null,s==="hepan"&&We?me("第三方出生时刻",p("input",{className:"mp-input",type:"time",value:Ra,onChange:a=>ja(a.target.value)})):null,s==="hepan"&&We?me("第三方性别",p("select",{className:"mp-input",value:Sa,onChange:a=>Ia(a.target.value)},p("option",{value:"female"},"女"),p("option",{value:"male"},"男"))):null,s==="hepan"&&We?me("第三方出生地（可空）",p("input",{className:"mp-input",placeholder:"如 广东广州",value:Ba,onChange:a=>Nt(a.target.value)})):null,s==="qimen"?p("fieldset",{key:"qmr",className:"mp-qmrule"},p("legend",{className:"mp-lbl"},"换局规则"),p("div",{className:"mp-qmopts",role:"radiogroup","aria-label":"奇门换局规则"},[["chaibu","拆补"],["chaoshen","超神接气"],["zhirun","置闰"]].map(([a,g])=>p("label",{key:a,className:"mp-qmopt"},p("input",{type:"radio",name:"qimen_rule",value:a,checked:ma===a,onChange:()=>Na(a)}),p("span",null,g)))),p("div",{className:"mp-field"},p("span",{className:"mp-lbl"},"晚子时"),p("select",{className:"mp-input",value:st,onChange:a=>ot(a.target.value)},p("option",{value:"same-day"},"23:00 后归当日"),p("option",{value:"next-day"},"23:00 后归次日"))),p("details",{className:"mp-qmhelp"},p("summary",null,"三种规则有什么区别？"),p("p",null,"决定符头与节气如何对齐、是否插入闰局；同一个时刻在不同规则下可能得到不同局数。默认「拆补」与工具层一致。"))):null,ia(s)||s==="qimen"?me(s==="qimen"?"询问方向（定用神）":"询问方向",p("select",{className:"mp-input mp-askonly",value:ke,onChange:a=>{Pe(a.target.value),sn(a.target.value)}},(V.DIRECTIONS||[]).map(a=>p("option",{key:a.key,value:a.key},a.label)))):null,s==="tarot"?me("牌阵",p("select",{className:"mp-input",value:H,onChange:a=>be(a.target.value)},p("option",{value:"one"},"1 张 · 单张指引"),p("option",{value:"three"},"3 张 · 过去现在未来"),p("option",{value:"five"},"5 张 · 五张局势"),p("option",{value:"celtic"},"10 张 · 凯尔特十字"),p("option",{value:"either"},"5 张 · 二选一"),p("option",{value:"relation"},"7 张 · 关系阵"),p("option",{value:"timeflow"},"3 张 · 时间流"))):null,s==="liuyao"?me("六爻（可空）",p("input",{className:"mp-input",placeholder:"空则随机，如 9 7 8 8 7 6",value:R,onChange:a=>ee(a.target.value)})):null,s==="meihua"?me("起卦方式",p("div",{className:"mp-seg"},p("button",{className:Ta==="time"?"on":"",onClick:()=>an("time")},"时间"),p("button",{className:Ta==="number"?"on":"",onClick:()=>an("number")},"数字"))):null,s==="meihua"&&Ta==="number"?me("第一个数",p("input",{className:"mp-input",value:Rt,placeholder:"如 17",onChange:a=>Yi(a.target.value)})):null,s==="meihua"&&Ta==="number"?me("第二个数",p("input",{className:"mp-input",value:It,placeholder:"如 29",onChange:a=>Vi(a.target.value)})):null,s==="meihua"&&Ta==="number"?me("动爻（可空）",p("input",{className:"mp-input",value:Bt,placeholder:"1-6",onChange:a=>Ji(a.target.value)})):null,s==="zeri"?me("所办事项",p("select",{className:"mp-input",value:Za,onChange:a=>ba(a.target.value)},[["常用",["嫁娶","搬家入宅","出行","开业","签订合同","祭祀"]],["婚嫁",["嫁娶","订婚","领证","提亲","收送聘金","满月酒"]],["生活",["搬家","入宅","旅行","访亲友","入学","求医","祭祀"]],["建造",["动土","装修","装修建造","安葬","试车买车"]],["工商",["开业","交易","投资","签订合同","签约","纳财","赴任"]]].map(([a,g])=>p("optgroup",{key:a,label:a},g.map($=>p("option",{key:`${a}-${$}`,value:$},$)))))):null,s==="convert"?me("转换方向",p("div",{className:"mp-seg"},p("button",{className:ea==="solar2lunar"?"on":"",onClick:()=>ct("solar2lunar")},"公历 → 农历"),p("button",{className:ea==="lunar2solar"?"on":"",onClick:()=>ct("lunar2solar")},"农历 → 公历"))):null,s==="convert"&&ea==="lunar2solar"?me("农历日期",p("input",{className:"mp-input",value:Ge,placeholder:"如 2026-9-17",onChange:a=>ha(a.target.value)})):null,s==="convert"&&ea==="lunar2solar"?p("label",{className:"mp-check"},p("input",{type:"checkbox",checked:aa,onChange:a=>At(a.target.checked)})," 闰月"):null,s==="zeri"?me("看多少天",p("input",{className:"mp-input",type:"number",min:1,max:60,value:Ka,onChange:a=>Lt(a.target.value)})):null,s==="zeri"?me("候选日（可空，只比这几天）",p("input",{className:"mp-input",placeholder:"如 2026-12-01, 2026-12-08, 2026-12-15",value:oa,onChange:a=>Va(a.target.value)})):null,s==="zeri"?me("当事人属相（可空）",p("select",{className:"mp-input",value:sa,onChange:a=>Ya(a.target.value)},p("option",{value:""},"不排除"),["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"].map(a=>p("option",{key:a,value:a},a)))):null,s==="xiaoliuren"?me("起课方式",p("div",{className:"mp-seg"},p("button",{className:Ue==="time"?"on":"",onClick:()=>mt("time")},"时间"),p("button",{className:Ue==="number"?"on":"",onClick:()=>mt("number")},"报数"))):null,s==="xiaoliuren"&&Ue==="number"?me("第一个数",p("input",{className:"mp-input",type:"number",min:1,max:99,value:Ja,onChange:a=>Tt(a.target.value)})):null,s==="xiaoliuren"&&Ue==="number"?me("第二个数",p("input",{className:"mp-input",type:"number",min:1,max:99,value:Xa,onChange:a=>Et(a.target.value)})):null,s==="xiaoliuren"&&Ue==="number"?me("第三个数",p("input",{className:"mp-input",type:"number",min:1,max:99,value:Wa,onChange:a=>_t(a.target.value)})):null,s==="mbti"?p("div",{className:"mp-quiz-wrap"},p("div",{className:"mp-lbl"},"十六型人格问卷 · 4 题一页，按 1（完全不像）到 5（很像我）打分"),p(On,{answers:xa,page:oi,onPick:(a,g)=>ut($=>{const M=$.slice();return M[a]=g,M}),onPage:a=>Ht(g=>Math.max(0,Math.min(g+a,Math.max(0,Math.ceil(kt().total/yt)-1)))),onSubmit:di,onClear:()=>{ut(new Array(kt().total).fill(null)),Ht(0),q(null)}})):null,s==="constitution"?p("div",{className:"mp-quiz-wrap"},p("div",{className:"mp-lbl"},"中医体质问卷 · 9 种体质各 5 题，共 45 题 · 5 题一页，按 1（没有）到 5（总是）打分"),p(Pn,{paper:_e,answers:va,page:Ot,onPick:(a,g)=>et($=>{const M=$.slice();return M[a]=g,M}),onPage:a=>Pt(g=>Math.max(0,Math.min(g+a,Math.max(0,Math.ceil((_e&&_e.questions?_e.questions.length:Qt)/wt)-1)))),onSubmit:di,onClear:()=>{et(new Array(Qt).fill(null)),Pt(0),q(null)}})):null,s==="trend"?me("算到几岁",p("input",{className:"mp-input",type:"number",min:10,max:100,value:gt,onChange:a=>Dt(a.target.value)})):null,s==="fengshui"?me("看什么",p("div",{className:"mp-seg"},p("button",{className:e==="natal"?"on":"",onClick:()=>i("natal")},"命卦"),p("button",{className:e==="advise"?"on":"",onClick:()=>i("advise")},"门主灶"),p("button",{className:e==="xuankong"?"on":"",onClick:()=>i("xuankong")},"玄空"))):null,s==="fengshui"&&e!=="natal"?me("坐山（24 山）",p("input",{className:"mp-input",value:r,placeholder:"如 子 / 乾",onChange:a=>c(a.target.value)})):null,s==="fengshui"&&e!=="natal"?me("朝向（24 山）",p("input",{className:"mp-input",value:d,placeholder:"如 午 / 巽",onChange:a=>u(a.target.value)})):null,s==="fengshui"&&e==="xuankong"?me("运（1–9）",p("input",{className:"mp-input",type:"number",min:1,max:9,value:o,onChange:a=>l(a.target.value)})):null,s==="name"?me("看什么",p("div",{className:"mp-seg"},p("button",{className:m==="assess"?"on":"",onClick:()=>f("assess")},"评名字"),p("button",{className:m==="generate"?"on":"",onClick:()=>f("generate")},"生成候选"))):null,s==="name"?me("姓",p("input",{className:"mp-input",value:h,placeholder:"如 李",onChange:a=>j(a.target.value)})):null,s==="name"&&m==="assess"?me("名字",p("input",{className:"mp-input",value:z,placeholder:"如 沐宸",onChange:a=>A(a.target.value)})):null,s==="name"&&m==="generate"?me("候选个数",p("input",{className:"mp-input",type:"number",min:1,max:20,value:C,onChange:a=>O(a.target.value)})):null),bt?p("div",{className:"mp-checks"},p("label",{title:"按出生地经度把钟表时间换算成真太阳时"},p("input",{type:"checkbox",checked:Qe,onChange:a=>qa(a.target.checked)}),"真太阳时"),p("label",{title:"23:00–23:59 出生时：勾选=按次日日柱起时柱；不勾=仍用当日日柱"},p("input",{type:"checkbox",checked:Ma,onChange:a=>Ca(a.target.checked)}),"晚子时换日"),p("label",{title:"开启后会请求 OpenStreetMap，把区县/村落到更精确的坐标"},p("input",{type:"checkbox",checked:ie,onChange:a=>G(a.target.checked)}),"联网精确到区县")):null,ia(s)?p("div",{className:"mp-askblock"},p("span",{className:"mp-lbl"},"所问之事（必填）"),p("textarea",{className:"mp-textarea"+(ns?" invalid":""),rows:2,value:pe,placeholder:"用一句话描述所问之事，例如：今年是否适合换工作？",onChange:a=>{He(a.target.value),Ft(!1)},onBlur:a=>sn(void 0,a.target.value)})):null,s==="mbti"||s==="constitution"?null:p("div",{key:"actions",className:"mp-actions"},p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginRight:8},onClick:us,title:"用固定示例盘看完整报告（不改动你已填的数据）"},"看示例"),v&&!de?p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginRight:8},onClick:()=>J(!0),title:"出盘后参数区是只读的：点这里解锁，改完再点排盘更新结果"},"修改参数"):null,p("button",{className:"mp-btn",onClick:di,title:"时间仍为自动时，点它会取当下再起卦"},s==="tarot"?"抽牌":s==="bazi"||s==="ziwei"?"排盘":s==="hepan"?"合盘":s==="qimen"?"起局":ei.indexOf(s)>=0?"看结果":"起卦"))),p("div",{key:"hint",className:"mp-hint"},os.hint),S.length||Ke.length?p("div",{key:"hist",className:"mp-hist"},p("div",{className:"mp-hist-h"},p("span",null,S.length?"最近排过":"卦例库"),p("span",{className:"mp-hist-acts"},S.length?p("button",{className:"mp-hist-clear",onClick:As},"清空"):null,p("button",{className:"mp-hist-clear mp-hist-more",onClick:_s},Ke.length?`卦例库 ${Ke.length}`:"卦例库"))),p("div",{className:"mp-hist-list"},S.map((a,g)=>p("button",{key:g,className:"mp-hist-item",title:`${String(a.date||"")} ${a.hourUnknown?"时辰未知":String(a.time||"")}`,onClick:()=>dn(a)},p("b",null,(Je.find($=>$.k===a.kind)||{}).label||a.kind),p("span",null,a.label||"—"),p("i",null,`${String(a.date||"").slice(5)} ${a.hourUnknown?"时辰未知":String(a.time||"")}`))))):null,Ye==="cast"&&Xi?p("div",{key:"auto",className:"mp-auto"},li.cast?`起卦时刻用的是你手动填的（${W}）；想跟随当下，把时间改回或清空即可。`:`起卦时刻已自动取本机时间（${W}），每次点起卦都会重新取当下；想固定时刻就在上面改。`):null,Re?p("div",{key:"err",className:"mp-err",role:"alert"},Re):null,ya?p("div",{key:"ntc",className:"mp-note",role:"status"},ya):null,ri?p("div",{key:"load",className:"mp-note",role:"status"},"正在加载本页需要的引擎…"):null,!v&&!Re?p("div",{key:"empty",className:"mp-empty"},p("b",null,s==="ziwei"||s==="bazi"?"填好出生信息，点「排盘」":s==="tarot"?"写下想问的事，点「抽牌」":s==="mbti"?"按 1–5 给题目打分，答满 12 题就能看结果":s==="constitution"?"按 1–5 给题目打分，答满 27 题就能看结果":ei.indexOf(s)>=0?"填好参数，点「看结果」":"写下所问之事，点「起卦」"),s==="ziwei"||s==="bazi"?"出生日期、时刻与性别即可；出生地只影响真太阳时。":s==="mbti"?"4 题一页，答案只在本地参与计算，不会上传。":s==="constitution"?"5 题一页，答案只在本地参与计算，不会上传；这是自评问卷，不是医学诊断。":ei.indexOf(s)>=0?"按上面的选项填好参数即可；全部在本机计算，不上传。":"起卦时刻已自动取当下，也可以手动改。"):null,v?p("div",{key:"card",className:"mp-card mp-flat",role:"region","aria-label":"排盘结果","aria-live":"polite",onClick:$s,dangerouslySetInnerHTML:{__html:qn({head:F.envHeadHTML(v.it,{folded:ci()})||F.factHeadHTML(v.r&&v.r.factHead),body:F.envBodyHTML(v.it,{folded:ci()}),chart:Xn(v),shortId:window.__MPCompose?window.__MPCompose.shortIdHTML(v.r.shortId):"",castAt:ks(v),solar:F.solarLineHTML(v.r),interpret:F.resultWithInterpret("",v.it,{folded:ci(),noHead:!0,noBody:!0}),revision:F.revisionHTML(v.r.revision),handle:F.handleHTML(v.r.handle),shadow:F.shadowHTML(v.r.shadow,v.shadowDiff),trace:F.traceHTML(v.r.trace,v.r.system,v.r.traceText),caliber:F.caliberHTML(v.caliber),perf:F.perfHTML(ce)},v.r&&v.r.system)}}):null,v?p("div",{key:"bar",className:"mp-bar"},p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px"},onClick:zs},ss||"复制文字结果"),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:qs,title:"导出盘面 + 解析（含一页读懂、三张表）为 Markdown"},"存 .md"),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:Ms,title:"生成 PNG 摘要卡（一页读懂 + 首张表），适合直接分享"},"存长图"),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:Os,title:"把这张盘的参数存进卦例库，日后可回填重排、标应验"},Es?"已存入卦例库":"存入卦例库")):null,v&&!Ga?p("p",{key:"nudge",className:"mp-nudge"},"这张盘只在你自己这台设备上算，不上传、不联网。过些天回头想看看它准不准，先「存入卦例库」，之后在卦例库里标应验就行——愿意记就记，不记也能照常用。",p("button",{type:"button",className:"mp-nudge-x",onClick:()=>{try{window.localStorage.setItem("dsh-metaphysics/nudge-off","1")}catch{}qt(!0)},title:"以后不再出现这行"},"不再提示")):null,v?p("div",{key:"ask",className:"mp-askbox",style:{flexWrap:"wrap"}},p("input",{className:"mp-input",value:ua,maxLength:120,placeholder:"追问：如 2027 年事业怎么样（回车提交）",onChange:a=>si(a.target.value),onKeyDown:a=>{a.key==="Enter"&&on()}}),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px"},onClick:on},"追问"),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:rn,title:"把这张盘的摘要和你的问题一起发进 DSH 对话窗，由对话里的模型接着答"},"问进对话"),le.ref?null:p("div",{key:"bridgediag",className:"mp-note",style:{marginTop:6,fontSize:11,flexBasis:"100%"}},"本机对话窗没接上：点「问进对话」会把提问复制到剪贴板，自己粘进对话窗就行。"+(Mn()?"（"+Di()+"）":"")),rt?p("div",{key:"chatnote",className:"mp-note",style:{marginTop:6,fontSize:12,flexBasis:"100%"}},rt):null):null,v?p("div",{key:"bridge",className:"mp-bridge"},p("span",{className:"mp-bridge-lbl"},le.ref?"桥可用；也可以：":"桥未就绪，改走这几档："),tn.map(([a,g,$])=>p("button",{key:a,type:"button",className:"mp-chip","data-bridge-copy":a,title:$,onClick:M=>ys(a,M.currentTarget)},g))):null,Mt?p("div",{key:"fx",className:"mp-fx",dangerouslySetInnerHTML:{__html:F.followupHTML(Mt)}}):null,v&&v.kind==="bazi"&&v.r.past?p("div",{key:"verify",className:"mp-verify"},p("div",{className:"mp-verify-h"},"先核对过去几年：这盘说的事，对得上吗"),v.r.past.rows.map(a=>p("div",{key:a.year,className:"mp-verify-row"},p("span",{className:"mp-verify-txt"},`${a.year} ${a.ganzhi} · ${a.theme}`),p("span",{className:"mp-verify-btns"},["yes","no","unsure"].map(g=>p("button",{key:g,className:"mp-chip"+(ga[a.year]===g?" on":""),onClick:()=>La(Object.assign({},ga,{[a.year]:g}))},g==="yes"?"准":g==="no"?"不准":"不确定"))))),p("div",{className:"mp-verify-foot"},p("button",{className:"mp-btn ghost",style:ln,onClick:Cs},"算贴合度"),Aa?p("span",{className:"mp-verify-fit"},`命中 ${Aa.yes}/${Aa.answered}（${Aa.level}）：${Aa.advice}`):null)):null,v&&v.kind==="bazi"?p("div",{key:"rect",className:"mp-rect"},p("div",{className:"mp-verify-h"},"不确定几点出生？填几件过去的事，反推时辰"),fa.map((a,g)=>p("div",{key:g,className:"mp-rect-row"},p("input",{className:"mp-input",type:"number",min:1900,max:2100,value:a.year,onChange:$=>Ct(fa.map((M,x)=>x===g?Object.assign({},M,{year:$.target.value}):M))}),p("select",{className:"mp-input",value:a.kind,onChange:$=>Ct(fa.map((M,x)=>x===g?Object.assign({},M,{kind:$.target.value}):M))},[["career","事业变动"],["wealth","财运"],["love","感情"],["move","搬迁/出行"],["health","健康"],["other","其他"]].map(([$,M])=>p("option",{key:$,value:$},M))))),p("button",{className:"mp-btn ghost",style:ln,onClick:Ls},"计算候选时辰"),ze?ze.error?p("div",{className:"mp-rect-err"},ze.error):p("div",{className:"mp-rect-out"},p("div",{className:"mp-verify-fit"},ze.note),ze.candidates.slice(0,6).map(a=>p("div",{key:a.hour,className:"mp-rect-cand"+(a===ze.best?" best":"")},`${a.label} · 时柱 ${a.hourGanzhi} · 日柱 ${a.dayGanzhi} · 命中 ${a.hits}/${a.total}`))):null):null,!v&&!Re?p("div",{key:"ph",className:"mp-dim",style:{marginTop:24,fontSize:12}},"选择体系后点「排盘」。所有计算在本机完成，不上传任何数据。"):null,p("div",{key:"fb",className:"mp-fb"},p("div",{className:"mp-fb-h"},p("span",{className:"mp-fb-t"},"用得不对、读不懂、或算得跟别家不一样？"),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"4px 10px"},onClick:pn,title:"生成一份含输入、版本、环境与结果摘要的报告，粘贴到 issue / 邮件 / 群聊即可"},qe||"复制反馈报告"),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"4px 10px",marginLeft:6},onClick:()=>Ns(),title:"在浏览器打开 GitHub issue（报告已复制到剪贴板，粘进去即可）"},"开 issue")),p("div",{className:"mp-fb-b"},"有疑问？",p("a",{href:"mailto:1129440028@qq.com?subject="+encodeURIComponent("[反馈] 烛微命盘"),style:{color:"inherit"},title:"点开直接写邮件，不用复制任何东西"},"1129440028@qq.com"),"　·　GitHub issues　·　微信群 dsh-metaphysics",$e?p("span",{className:"mp-fb-note"},"　"+$e):null)),Ts?p("div",{key:"cases",className:"mp-cases-layer",role:"dialog","aria-modal":"true","aria-label":"卦例库",onClick:a=>{a.target===a.currentTarget&&ui()}},p("div",{className:"mp-cases-box"},p("div",{className:"mp-cases-h"},p("b",null,`卦例库 · ${gi.length}/${Ke.length}`),p("button",{className:"mp-cases-x",onClick:ui,"aria-label":"关闭"},"✕")),p("div",{className:"mp-cases-tabs"},[["all","全部"]].concat(F.CASE_STATUS.map(a=>[a,F.caseStatusLabel(a)])).map(a=>p("button",{key:a[0],className:"mp-chip"+(mi===a[0]?" on":""),onClick:()=>mn(a[0])},`${a[1]} ${Hs(a[0])}`))),p("div",{className:"mp-cases-list"},gi.length?gi.map(a=>Ps(a)):p("div",{className:"mp-empty"},"这一栏还空着。看结果时点「存入卦例库」，想要的盘才会记进来；过些天回来标应验。")),p("div",{className:"mp-cases-f"},p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"4px 10px"},onClick:()=>gn(!1)},"导出 JSONL"),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"4px 10px",marginLeft:6},onClick:()=>gn(!0),title:"去掉出生年份（只留月日）、时刻整点化、去掉出生地——发给群里也不露个人信息"},"导出脱敏版"),p("span",{className:"mp-cases-tip"},"只存参数与一句摘要，不存盘面；点条目回填重排。")))):null];return p("div",{className:"mp-wrap"},Us)}function es(s){try{if(typeof styles<"u"&&styles&&typeof styles.insert=="function")return styles.insert(s)}catch(n){console.error("[metaphysics] styles.insert 不可用，改用 DOM 注入",n)}try{const n=document.createElement("style");return n.setAttribute("data-plugin","@local/metaphysics"),n.textContent=s,document.head.appendChild(n),()=>n.remove()}catch(n){return console.error("[metaphysics] DOM 注入样式也失败",n),()=>{}}}let Ui=!1;function ii(){try{const s=document.documentElement;if(!s||!document.body)return;const n=document.createElement("span");n.setAttribute("aria-hidden","true"),n.style.cssText="position:absolute;left:-9999px;top:0;width:0;height:0;pointer-events:none;background:var(--dsw-alias-brand-primary)",document.body.appendChild(n);const k=getComputedStyle(n).backgroundColor;n.remove();const _=Ie&&typeof Ie.pickOnColor=="function"?Ie.pickOnColor(k):"";_&&s.style&&s.style.getPropertyValue("--mp-on-brand")!==_&&s.style.setProperty("--mp-on-brand",_)}catch{}}function as(){if(!Ui){Ui=!0,ii();try{const s=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)");s&&typeof s.addEventListener=="function"&&s.addEventListener("change",ii)}catch{}try{typeof MutationObserver=="function"&&document.documentElement&&new MutationObserver(ii).observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]})}catch{}}}function ts(s){try{const B=es(Tn+(F&&F.CSS?F.CSS:""));typeof s.effect=="function"&&typeof B=="function"&&s.effect(()=>B)}catch(B){console.error("[metaphysics] 样式注入失败",B)}try{as()}catch(B){console.error("[metaphysics] 字色同步失败",B)}let n=null;try{n=s&&s.slots||(s&&typeof s.get=="function"?s.get("slots"):null)}catch(B){console.error("[metaphysics] 取 slots 服务失败",B)}if(!n||typeof n.register!="function"){console.error("[metaphysics] slots 服务不可用，面板未注册");return}try{le.injectType=typeof n.inject;const B=typeof n.spec=="function"?n.spec("conversation.input.right"):null;le.spec=B?B.kind+"/"+B.scope:"未声明"}catch(B){le.spec="取声明失败",Fi(B)}const k=B=>{if(typeof B=="function")return B;if(B&&typeof B=="object"){for(const we of["dispose","off","cancel","unregister"])if(typeof B[we]=="function")return()=>{try{B[we]()}catch{}}}return()=>{}},_=(B,we)=>{try{const te=n.register(B,we);return le.regs+=1,le.seatOk[B.name]=!0,k(te)}catch(te){return Fi(te),()=>{}}},W=(B,we)=>{const te=()=>{const D=we();return le.contribution=(le.contribution?le.contribution+",":"")+(B+(typeof D=="function"?" 已挂上":" 未挂上")),D};try{typeof n.inject=="function"?n.inject(B,te):te()}catch(D){console.error("[metaphysics] 等待槽位失败："+B,D);try{te()}catch(I){console.error("[metaphysics] 直接注册也失败："+B,I)}}};W("sidebar.panellist",()=>_({name:"sidebar.panellist",id:"metaphysics",order:20,label:()=>"烛微命盘 v"+(window.__MP_VER||"")},Fn)),W("main",()=>_({name:"main",key:"metaphysics"},B=>p(Dn,null,p(Qn,B))));const se=(B,we)=>{const te=()=>{try{const I=n.inject(B,we);return le.contribution=(le.contribution?le.contribution+",":"")+(B.replace("conversation.","")+(typeof I=="function"?" 已挂上":" 未挂上")),I}catch(I){console.error("[metaphysics] 槽位注册失败："+B,I);try{return we()}catch(Z){console.error("[metaphysics] 直接注册也失败："+B,Z);return}}};let D;try{typeof s.effect=="function"?D=s.effect(te,"metaphysics: "+B):D=te()}catch(I){console.error("[metaphysics] effect 包裹失败："+B,I),D=te()}typeof D=="function"&&le.seatDisposers.push(D)};se("conversation.input.right",()=>_({name:"conversation.input.right",id:"metaphysics-ask",order:40},Ii)),se("conversation.composer.dock",()=>_({name:"conversation.composer.dock",id:"metaphysics-dock",order:60},Bi));let fe=!1;const ue=()=>{le.ref||fe||(fe=!0,le.seatOk["conversation.input.right"]||_({name:"conversation.input.right",id:"metaphysics-ask",order:40},Ii),le.seatOk["conversation.composer.dock"]||_({name:"conversation.composer.dock",id:"metaphysics-dock",order:60},Bi))};let ye=20;const t=()=>!!(le.seatOk["conversation.input.right"]&&le.seatOk["conversation.composer.dock"]),Ne=()=>{le.ref||ye<=0||t()||(ye-=1,ue(),!t()&&setTimeout(Ne,700))};try{setTimeout(Ne,700)}catch{}try{document.addEventListener("pointerdown",()=>{fe=!1,ue()},{once:!0,capture:!0})}catch{}}return{inject:["slots"],apply(s){try{ts(s)}catch(n){console.error("[metaphysics] apply 异常",n)}}}}});
