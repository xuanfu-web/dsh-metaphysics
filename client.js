window.__ModuleLoader__.load({id:"dsh-metaphysics",version:"0.64.0",factory(Ya){const _a=(function(){try{return Ya("react")}catch{return globalThis.React}})();if(!_a)return{inject:[],apply(){}};const p=_a.createElement,_t={bazi:"client.chart.js",ziwei:"client.chart.js",hepan:"client.chart.js",trend:"client.chart.js",name:"client.name.js",fengshui:"client.fengshui.js",liuyao:"client.liuyao.js",meihua:"client.liuyao.js",qimen:"client.qimen.js",daliuren:"client.daliuren.js",tarot:"client.tarot.js",almanac:"client.almanac.js",convert:"client.convert.js",zeri:"client.zeri.js",chenggu:"client.chenggu.js",xiaoliuren:"client.xiaoliuren.js",star:"client.star.js",numerology:"client.numerology.js",mbti:"client.mbti.js"},Ht=[{key:"general",label:"综合",dim:null,focus:""},{key:"wealth",label:"财运",dim:"work",focus:"钱财进出的落点主要看「工作与职业选择」与「事业发展」这两条。"},{key:"career",label:"事业",dim:"career",focus:"事业发展这条与你的问题最直接。"},{key:"love",label:"感情",dim:"love",focus:"感情这条与你的问题最直接。"},{key:"health",label:"健康",dim:"health",focus:"健康这条与你的问题最直接；下面只作提醒，不作任何诊断。"},{key:"study",label:"学业",dim:"career",focus:"学业与考试更贴近「事业发展」这条，讲的是长期积累与阶段进展。"},{key:"travel",label:"出行",dim:"overall",focus:"出行与迁动更贴近「整体运势」这条，看的是当下这一段的大环境。"}];window.__MP_VER="0.64.0",window.__MPGroups=[{title:"问一件事",hint:"心里有一件具体的事，起一卦再决定",items:[{k:"liuyao",label:"六爻",tip:"摇六次，问一件事"},{k:"meihua",label:"梅花",tip:"见闻起卦，看当下"},{k:"tarot",label:"塔罗",tip:"抽牌，看关系与选择"},{k:"qimen",label:"奇门",tip:"看方位、时机与取舍"},{k:"daliuren",label:"六壬",tip:"占事，断来意与结果"},{k:"xiaoliuren",label:"小六壬",tip:"掐指一算，快速断"}]},{title:"看一个人",hint:"看自己或身边人的性情、格局与运程",items:[{k:"bazi",label:"八字",tip:"四柱看一生格局"},{k:"ziwei",label:"紫微",tip:"十二宫细看"},{k:"hepan",label:"合盘",tip:"两个人合不合"},{k:"mbti",label:"人格",tip:"16 型性格问卷"},{k:"chenggu",label:"称骨",tip:"按生辰称命重"},{k:"numerology",label:"数字",tip:"生日数字看性格"},{k:"trend",label:"人生K",tip:"一生高低走势",wide:!0}]},{title:"查日子",hint:"挑时间、换农历，顺带看看家里和名字",items:[{k:"almanac",label:"黄历",tip:"今天宜忌、时辰吉凶"},{k:"zeri",label:"择日",tip:"挑个办事的好日子"},{k:"convert",label:"农历",tip:"公历农历互转"},{k:"star",label:"星座",tip:"星座性格与今日运"},{k:"fengshui",label:"风水",tip:"房屋朝向与布置"},{k:"name",label:"起名",tip:"按八字选字"}]}],window.__MP_UNRELEASED=[];const B={};B.DIRECTIONS=Ht,B.compute=()=>{throw new Error("命理引擎尚未加载")};const Ot=Object.create(null),yt=Object.create(null);function Oi(s){return _t[s]||_t.bazi||"client.chart.js"}const Ft=()=>typeof performance<"u"&&performance.now?performance.now():Date.now();async function Fi(s){const n=Oi(s);let q=Ot[n];const D=!!q,X=Ft();if(!q){if(!Ya||typeof Ya.async!="function")throw new Error("当前宿主不支持客户端分块加载（require.async 缺失），请升级 DeepSeek Harness");let ie=yt[n];ie||(ie=Ya.async(`./${n}`).then(le=>{const se=le&&(le.Engine||le.default);if(!se||typeof se.compute!="function")throw new Error(`命理引擎分块 ${n} 未返回 Engine`);return Ot[n]=se,se}),yt[n]=ie,ie.catch(()=>{}).then(()=>{delete yt[n]})),q=await ie}for(const ie of Object.keys(q))q[ie]!==void 0&&(B[ie]=q[ie]);return Array.isArray(B.DIRECTIONS)||(B.DIRECTIONS=Ht),window.Engine=B,window.__MP_ENGINE_READY__=!0,window.__MP_LAST_LOAD={tab:s,chunk:n,cached:D,ms:Math.round((Ft()-X)*10)/10},B}window.__mpEnsureEngine=Fi,window.Engine=B,(function(){const s={liuyao:!0,meihua:!0,daliuren:!0,tarot:!0},n=I=>!!s[I],q={general:"other",wealth:"business",career:"career",love:"love",health:"other",study:"career",travel:"action"},D=I=>q[I]||"other",X="#ffffff",ie="#1c1a15";function le(I){const Z=String(I??"").match(/rgba?\(([^)]+)\)/i);if(!Z)return null;const Y=Z[1].split(/[,\s/]+/).filter(Boolean).map(Number);return Y.length<3||Y.slice(0,3).some(K=>!Number.isFinite(K))||Y.length>3&&Number.isFinite(Y[3])&&Y[3]<.95?null:[Y[0],Y[1],Y[2]]}function se(I){const Z=String(I||"").replace("#",""),Y=Z.length===3?Z.split("").map(K=>K+K).join(""):Z;return/^[0-9a-f]{6}$/i.test(Y)?[0,2,4].map(K=>parseInt(Y.slice(K,K+2),16)):null}function ve(I){const Z=Y=>{const K=Y/255;return K<=.03928?K/12.92:Math.pow((K+.055)/1.055,2.4)};return .2126*Z(I[0])+.7152*Z(I[1])+.0722*Z(I[2])}function t(I,Z){const Y=ve(I),K=ve(Z),oe=Math.max(Y,K),za=Math.min(Y,K);return(oe+.05)/(za+.05)}function we(I){const Z=typeof I=="string"?le(I):I;return Z?t(Z,se(X))>=t(Z,se(ie))?X:ie:""}function O(I){const Z=String(I??"").trim();if(!Z)return{lines:null,warning:""};const Y=Z.split(/[^0-9]+/).filter(Boolean).map(Number),K=Y.filter(oe=>![6,7,8,9].includes(oe));return Y.length===6&&K.length===0?{lines:Y,warning:""}:{lines:null,warning:Y.length!==6?`爻值需要正好 6 个数字（当前 ${Y.length} 个），本次按随机摇卦。`:`爻值只能是 6/7/8/9（收到 ${K.join("/")}），本次按随机摇卦。`}}function fe(I){const Z=String(I??"").trim();if(!Z)return null;const Y=Number(Z);return Number.isFinite(Y)?Y:null}function he(I){const Z=I instanceof Date?I:new Date,Y=K=>String(K).padStart(2,"0");return`${Z.getFullYear()}-${Y(Z.getMonth()+1)}-${Y(Z.getDate())}`}window.__MPCore={NEED_ASK:s,needAsk:n,parseLines:O,toNumber:fe,parseRGB:le,hexToRGB:se,luminance:ve,contrastRatio:t,pickOnColor:we,ON_DARK:X,ON_LIGHT:ie,kindOfDirection:D,todayStamp:he}})(),(function(){const s=`
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
/* 三合派：四化信息整体退场（生年/自化/大限流年/图例/飞星链 chips/自化箭头） */
#ppm-sc-sanhe:checked~.pp-body .pp-m,
#ppm-sc-sanhe:checked~.pp-body .pp-zha,
#ppm-sc-sanhe:checked~.pp-body .pp-viewhua,
#ppm-sc-sanhe:checked~.pp-flywrap{display:none}
/* 自化箭头（学文墨天机）：自化是「宫干化回本宫」，箭头画在星名左边、箭头尖顶住星名，
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

/* —— 文墨式「显示设置」12 项（学文墨天机 group_fxp / group_4hb / group_3hp）——
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
/* 勾选态：12 条 :checked 各自点亮自己 label 的方框（复选框与 .pp-disp 同为 .pp 直接子元素） */
#ppm-d-ss:checked~.pp-disp label[for="ppm-d-ss"] .pp-disp-box,
#ppm-d-sbg:checked~.pp-disp label[for="ppm-d-sbg"] .pp-disp-box,
#ppm-d-zha:checked~.pp-disp label[for="ppm-d-zha"] .pp-disp-box,
#ppm-d-ages:checked~.pp-disp label[for="ppm-d-ages"] .pp-disp-box,
#ppm-d-sizhu:checked~.pp-disp label[for="ppm-d-sizhu"] .pp-disp-box,
#ppm-d-small:checked~.pp-disp label[for="ppm-d-small"] .pp-disp-box,
#ppm-d-shen:checked~.pp-disp label[for="ppm-d-shen"] .pp-disp-box,
#ppm-d-hua:checked~.pp-disp label[for="ppm-d-hua"] .pp-disp-box,
#ppm-d-sf:checked~.pp-disp label[for="ppm-d-sf"] .pp-disp-box,
#ppm-d-zha-bold:checked~.pp-disp label[for="ppm-d-zha-bold"] .pp-disp-box,
#ppm-d-bad-ink:checked~.pp-disp label[for="ppm-d-bad-ink"] .pp-disp-box,
#ppm-d-bold:checked~.pp-disp label[for="ppm-d-bold"] .pp-disp-box{background:var(--lu);border-color:var(--lu);box-shadow:inset 0 0 0 2px var(--card)}
/* 组1 飞星派显示（默认全勾，取消才隐藏） */
#ppm-d-ss:not(:checked)~.pp-body .pp-ss-txt{display:none}
#ppm-d-sbg:not(:checked)~.pp-body .pp-st.st-sbg{display:none}
#ppm-d-zha:not(:checked)~.pp-body .pp-zha{display:none}
#ppm-d-zha:not(:checked)~.pp-zhlegend{display:none}
#ppm-d-ages:not(:checked)~.pp-body .pp-ages{display:none}
#ppm-d-sizhu:not(:checked)~.pp-body .ct-t3{display:none}
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
`,n=window.__PP=window.__PP||{};n.CSS=s;const q={主星:"main",吉星:"good",煞星:"bad",辅星:"aux",杂曜:"aux"},D={禄:"lu",权:"quan",科:"ke",忌:"ji"},X=new Set(["三台","八座","恩光","天贵"]),ie={庙:"good",旺:"good",得:"mid",利:"mid",平:"mid",不:"bad",陷:"bad"},le={巳:[1,1],午:[1,2],未:[1,3],申:[1,4],辰:[2,1],酉:[2,4],卯:[3,1],戌:[3,4],寅:[4,1],丑:[4,2],子:[4,3],亥:[4,4]},se={乾:[1,1,1],兑:[1,1,0],离:[1,0,1],震:[1,0,0],巽:[0,1,1],坎:[0,1,0],艮:[0,0,1],坤:[0,0,0]},ve=["初爻","二爻","三爻","四爻","五爻","上爻"],t=e=>String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),we=(e,i,r)=>{const f=Math.round(43),b=e?`<rect x="0" y="${2.5}" width="104" height="7" rx="${1.6}" fill="currentColor"/>`:`<rect x="0" y="${2.5}" width="${f}" height="7" rx="${1.6}" fill="currentColor"/><rect x="${f+18}" y="${2.5}" width="${104-f-18}" height="7" rx="${1.6}" fill="currentColor"/>`;return`<svg class="mp-hex${i?" hex-on":""}${r?" "+r:""}" viewBox="0 0 104 12" preserveAspectRatio="none" aria-hidden="true" focusable="false">${b}</svg>`},O={木:"M6 1.6V10.8M6 5.2 2.6 2.2M6 7.4 9.4 4.4",火:"M6 1.4C7.6 3.6 9.2 5.4 9.2 7.6A3.2 3.2 0 0 1 2.8 7.6C2.8 5.4 4.4 3.6 6 1.4Z",土:"M1.6 9.6h8.8M6 2.4v7.2M3.4 5.6h5.2",金:"M6 1.2 10.6 6 6 10.8 1.4 6Z",水:"M1.4 7.2C2.9 4.2 4.5 10.2 6 7.2 7.5 4.2 9.1 10.2 10.6 7.2"},fe=e=>{const i=O[e];return i?`<svg class="mp-wxi" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="${i}" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`:""},he=e=>`<svg class="mp-trig" viewBox="0 0 14 10" aria-hidden="true" focusable="false">${(se[e]||[0,0,0]).slice().reverse().map((l,o)=>{const c=o*4;return l?`<rect x="0" y="${c}" width="14" height="2" rx="0.6" fill="currentColor"/>`:`<rect x="0" y="${c}" width="5.6" height="2" rx="0.6" fill="currentColor"/><rect x="8.4" y="${c}" width="5.6" height="2" rx="0.6" fill="currentColor"/>`}).join("")}</svg>`;n._hexBar=we,n._wxIcon=fe,n._triGlyph=he;function I(e,i,r){return!e||!e.length?"":e.map(l=>{const o=q[l.type]||"aux",c=l.mutagen?`<i class="pp-m ${D[l.mutagen]}">${l.mutagen}</i>`:"",d=i&&i[l.name],u=d?`<i class="pp-m view ${D[d]}">${d}</i>`:"",m=l.brightness?`<em class="pp-b ${ie[l.brightness]||"mid"}">${l.brightness}</em>`:"",f=l.inTemple?'<em class="pp-b good">庙</em>':"",b=r&&r[l.name]?sa(r[l.name],l.name):"",C=X.has(l.name)?" st-sbg":"";return`<span class="pp-st ${o}${C}">${b}${l.name}${m}${f}${c}${u}</span>`}).join("")}function Z(e){const i=[];for(let r=0;r<6;r++)i.push(e+r*12);return i.join(",")}const Y=["命宫","兄弟","夫妻","子女","财帛","疾厄","迁移","交友","官禄","田宅","福德","父母"],K=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],oe=e=>(e%12+12)%12,za=(e,i)=>e!==i&&[oe(i+4),oe(i+8),oe(i+6)].includes(e);function na(e,i,r,l,o,c){const d=le[e.branch]||[1,1],u=K.indexOf(e.branch),m=["pp-cell"];u===i?m.push("pp-soul"):za(u,i)&&m.push("pp-tri"),e.isBody&&m.push("pp-shen"),d[0]===4&&m.push("pp-lastrow"),d[1]===4&&m.push("pp-lastcol");const f=e.shensha||{},b=Y[oe(i-u)];let C="";if(u===i&&l){const S=T=>(q[T.type]||"")==="main";if(!(e.stars||[]).some(S)){const T=l.find(E=>K.indexOf(E.branch)===oe(u+6)),k=T?(T.stars||[]).filter(S):[];k.length&&(C=`<div class="pp-borrow" title="命宫无主星，借对宫（迁移宫）主星">借 ${k.map(E=>E.name).join(" ")}</div>`)}}return`<div class="${m.join(" ")}" data-pi="${u}" data-view="${r}" role="button" tabindex="0" aria-expanded="false" style="grid-row:${d[0]};grid-column:${d[1]}">
      <div class="pp-stars">${I(e.stars,o,Oe(e))}</div>
      ${C}
      <div class="pp-ages">${Z(e.xiaoxian.age)}</div>
      ${Ja(e,c)}
      <div class="pp-foot">
        <div class="ft-l">
          <span class="ft-dx"><span class="pp-ss-txt">${f.boshi}</span> ${e.daxian.start}-${e.daxian.end}</span>
          <span class="pp-ss-txt">${f.jiangqian}</span>
          <span class="pp-ss-txt">${f.suiqi}</span>
        </div>
        <div class="ft-r">
          <span class="pp-ss-txt">${f.changsheng}</span>
          <span>${e.ganzhi}</span>
          <span class="ft-pn">${b}</span>
        </div>
      </div>
    </div>`}function sa(e,i){return`<span class="pp-zha ${D[e]}" title="自化${t(e)}：${t(i)}·宫干化回本宫"><svg class="z-a" viewBox="0 0 22 9" role="img" aria-label="自化${t(e)}">
        <path class="z-shaft" d="M1 7C6.6 7 11.4 5.6 17.2 3.2"/>
        <path class="z-head" d="M20.2 2 17.8 4.9 16.6 1.9Z"/>
      </svg></span>`}n._zhaMark=sa;function Oe(e){const i={};for(const r of e.selfHua||[])!r||!r.star||!D[r.type]||i[r.star]||(i[r.star]=r.type);return i}function Ja(e,i){const r=i&&i[e.branch]||[];if(!r.length)return"";const l=r.map(o=>`<i class="${D[o.type]||""}" title="${t(o.star)}化${t(o.type)}">${t(o.type)}<em>→${t(o.palace||"未上盘")}</em></i>`).join("");return`<div class="pp-fx">${t(e.ganzhi)}宫干 ${l}</div>`}function oa(e){try{const i=window.Engine||window.__PP&&window.__PP.Engine;if(!i||!i.buildBazi||!e.input)return"";const r=i.buildBazi({year:e.input.year,month:e.input.month,day:e.input.day,hour:e.input.hour,minute:e.input.minute,gender:e.input.gender,trueSolar:!1});return["year","month","day","hour"].map(l=>r.pillars[l].ganzhi).join(" ")}catch{return""}}n.ziweiHTML=function(e){const i=K.indexOf(e.soul.branch),r=e.liunian&&e.liunian[0]||null,l=r?r.age:1,o=e.palaces.find(z=>l>=z.daxian.start&&l<=z.daxian.end)||e.palaces[0],c=K.indexOf(o.branch),d=r?K.indexOf(r.lifePalace.branch):i,u=z=>{const H={};for(const ne of z||[])ne&&ne.star&&(H[ne.star]=ne.type);return H},m=(e.daxianList||[]).find(z=>z.branch===o.branch)||null,f={da:u(m&&m.mutagenHits),ln:u(r&&r.mutagenHits)},b={};for(const z of e.daxianList||[])b[z.branch]=z.mutagenHits||[];const C=(z,H)=>e.palaces.map(ne=>na(ne,z,H,e.palaces,f[H]||null,b)).join(""),S=(z,H)=>`<div class="pp-center">
        ${H==="da"?`<div class="ct-t1">大限 ${o.ganzhi}　${o.daxian.start}-${o.daxian.end}岁</div>`:H==="ln"&&r?`<div class="ct-t1">流年 ${r.ganzhi}　${r.age}岁</div>`:`<div class="ct-t1">${e.daxian.rule.slice(0,2)}　${e.bureau.name}</div>`}
        <div class="ct-t2">公历 ${e.input.year}-${String(e.input.month).padStart(2,"0")}-${String(e.input.day).padStart(2,"0")} ${String(e.input.hour).padStart(2,"0")}:${String(e.input.minute).padStart(2,"0")}</div>
        <div class="ct-t2">农历 ${e.lunar.year}年${e.lunar.isLeap?`闰${e.lunar.monthRaw||e.lunar.month}`:e.lunar.month}月${e.lunar.day}日${e.hourBranch}时${e.lunar.isLeap&&e.lunar.monthRaw&&e.lunar.month!==e.lunar.monthRaw?`（按${e.lunar.month}月起盘）`:""}</div>
        ${oa(e)?`<div class="ct-t3">${oa(e)}</div>`:""}
        <div class="ct-t4">命主 ${e.lifeMaster}${e.lifeMasterNote?`<span class="pp-dim" title="${t(e.lifeMasterNote)}">＊</span>`:""}　身主 ${e.bodyMaster}${e.bodyMasterNote?`<span class="pp-dim" title="${t(e.bodyMasterNote)}">＊</span>`:""}</div>
        <div class="ct-t4">命宫 ${e.soul.branch}　身宫 ${e.body.branch}　五行局 ${e.bureau.name}</div>
        <div class="ct-t4">子年斗君 ${e.doujun?e.doujun.zinian:"—"}　流年斗君 ${r&&r.doujun?r.doujun:"—"}</div>
        <div class="ct-t4">紫微 ${e.ziwei}　天府 ${e.tianfu}　${H==="da"?"大限命宫 "+K[c]:H==="ln"?"流年命宫 "+K[d]:"本命命宫 "+e.soul.branch}</div>
        ${H==="da"||H==="ln"?`<div class="ct-t4 pp-viewhua">${H==="da"?"大限":"流年"}四化　${(H==="da"?f.da:f.ln)&&Object.keys(H==="da"?f.da:f.ln).length?Object.entries(H==="da"?f.da:f.ln).map(([ye,be])=>`${ye}化${be}`).join("　"):'<span class="pp-dim">未飞四化</span>'}</div>`:""}
        <div class="pp-legend"><span class="pp-m lu">禄</span><span class="pp-m quan">权</span><span class="pp-m ke">科</span><span class="pp-m ji">忌</span><span>实心=生年四化　空心=大限/流年四化　箭头=自化　红框=命宫　浅底=三方四正</span></div>
      </div>`,T=(z,H,ne)=>`<div class="pp-body ${z}" data-view="${ne}" data-soul="${H}"><div class="pp-grid">${C(H,ne)}${S(H,ne)}</div><div class="pp-detail"></div></div>`,k=e.changqu,E=k?`<div class="pp-chips">
      <span class="pp-chip">昌 ${k.wenchang.branch}（${k.wenchang.palace}）</span>
      <span class="pp-chip">曲 ${k.wenqu.branch}（${k.wenqu.palace}）</span>
      <span class="pp-chip">${k.relation}</span>
      <span class="pp-chip">入命三方 ${k.inSoulSanfang?"是":"否"}</span>
      <span class="pp-chip ${k.absorb.label==="杂"?"warn":"ok"}">吸收·${k.absorb.label}</span>
    </div>`:"",J=(e.patterns||[]).length?`<div class="pp-chips">${e.patterns.map(z=>{const H=z.status==="broken"&&Array.isArray(z.breaks)&&z.breaks.length,ne=`${z.evidence||""}${H?`；破格：${z.breaks.join("；")}`:""}`;return`<span class="pp-chip ${H?"broken":z.tone==="good"?"ok":z.tone==="bad"?"warn":""}" title="${t(ne)}">${z.name}${H?"（破格）":""}</span>`}).join("")}</div>`:"",R=(e.daxianList||[]).length?`<div class="pp-chips">${e.daxianList.slice(0,8).map(z=>`<span class="pp-chip" title="${t(`${z.ganzhi} 宫干四化：`+z.mutagenHits.map(H=>`${H.star}化${H.type}→${H.palace||"未上盘"}`).join("、"))}">${z.branch} ${z.ages[0]}-${z.ages[1]}</span>`).join("")}</div>`:"",w=r&&r.mutagenHits&&r.mutagenHits.length?`<div class="pp-chips">${r.mutagenHits.map(z=>`<span class="pp-chip ${z.type==="忌"?"warn":z.type==="禄"?"ok":""}">${z.star}化${z.type}→${z.palace||"未上盘"}</span>`).join("")}</div>`:"",j=e.zuoyao,te=j?j.placed&&j.placed.length?`<div class="pp-sec"><div class="pp-sec-h">杂曜全表 · 已排 ${j.placed.length} 颗（${j.starTotal} 颗盘）</div>
        <div class="pp-chips">${j.placed.map(z=>`<span class="pp-chip${z.inTemple?" ok":""}" title="${t(z.meaning||"")}">${t(z.name)} ${t(z.branch)}（${t(z.palace)}）${z.inTemple?"·庙":""}</span>`).join("")}</div>
        <details class="pp-zy"><summary>逐颗安星诀（${j.placed.length} 条 · 出多处近代通行辑本并核，属通行说，不是《全书》原文）</summary><div class="pp-zy-v">${t(j.verses).replace(/\n/g,"<br>")}</div></div></details>
        ${j.skipped&&j.skipped.length?`<div class="pp-zy-s">${j.skipped.map(z=>t(z)).join("")}</div>`:""}</div>`:`<div class="pp-sec"><div class="pp-sec-h">杂曜 · 本盘 ${j.starTotal} 颗（通行简盘）</div>
        <div class="pp-zy-s">开「杂曜全表」追加十二颗：解神·天巫·天月·阴煞（生月）／天官·天福·天厨（生年干）／蜚廉·天德·年解（生年支）／天才（命宫＋生年支）·天寿（身宫＋生年支）。${j.skipped&&j.skipped.length?`不另立：${j.skipped.map(z=>t(z)).join("")}`:""}</div></div>`:"",F=e.flyChains?(()=>{const z=["禄","权","科","忌"].map(H=>{const ne=e.flyChains[H];if(!ne||!ne.steps.length)return"";const ye=ne.path.map(xe=>String(xe).replace(/宫$/,"")).join("→"),be=ne.steps.map(xe=>`${xe.from}（${xe.fromStem}）化${H}${xe.star}→${xe.to}`).join("；");return`<span class="pp-chip ${H==="忌"?"warn":H==="禄"?"ok":""}" title="${t(be)}">飞${H} ${t(ye)}${ne.closed?"↺":""}</span>`}).join("");return z?`<div class="pp-chips">${z}</div>`:""})():"",ee=e.flyComposite&&Array.isArray(e.flyComposite.labels)&&e.flyComposite.labels.length?`<div class="pp-chips">${e.flyComposite.labels.map(z=>{const H=/忌/.test(z)?"warn":/自化/.test(z)?"":"ok",ne=me=>String(me).replace(/^.*?会/,"").replace(/^禄忌同宫/,"").replace(/自化$/,""),ye=(e.flyComposite.targets||[]).find(me=>me.palace===ne(z)),be=ye?ye.incoming.map(me=>`${me.from}化${me.type}${me.star}`).join("、"):e.flyComposite.note;return`<span class="pp-chip ${H}" title="${t(be)}">三方四正 ${t(z)}</span>`}).join("")}</div>`:"",$=e.flow,ce=$?(()=>{const z=be=>(be.mutagenHits||[]).length?be.mutagenHits.map(me=>`<i>${me.star}化${me.type}<em>→${me.palace||"未上盘"}</em></i>`).join(""):'<i class="dim">宫干无四化</i>',H=(be,me,xe)=>`<div class="flow-row"><b>${be}</b><span class="flow-p"><span class="flow-k">${me.ganzhi||"—"}　落${me.palace||"未上盘"}（${me.branch}）</span>${xe?`<em class="flow-same">${xe}</em>`:""}</span><span class="flow-m">${z(me)}</span></div>`,ye=$.day.branch===$.month.branch?"（日数走满一圈，故同宫）":"";return`<div class="pp-flow">
        <div class="flow-row"><b>基准</b><span class="flow-p">${$.asOf.solar}</span><span class="flow-m">农历 ${$.asOf.lunar}　流年 ${$.asOf.yearGanzhi}（斗君 ${$.year.doujun}）</span></div>
        ${H(`流月 ${$.month.index} 月`,$.month)}
        ${H(`流日 ${$.day.index} 日`,$.day,ye)}
        ${H(`流时 ${K[$.hour.hourIndex]}时`,$.hour)}
      </div>`})():"";return n._zw=e,n.briefHTML(e)+`<div class="pp">
      <input type="radio" name="ppm" id="ppm-ben" class="pp-r" checked>
      <input type="radio" name="ppm" id="ppm-da" class="pp-r">
      <input type="radio" name="ppm" id="ppm-ln" class="pp-r">
      <input type="radio" name="ppm-sc" id="ppm-sc-sihe" class="pp-r" checked>
      <input type="radio" name="ppm-sc" id="ppm-sc-feixing" class="pp-r">
      <input type="radio" name="ppm-sc" id="ppm-sc-sanhe" class="pp-r">
      <!-- 文墨式显示设置：12 个复选框必须与 .pp-body / .pp-zhlegend 同层（.pp 的直接子元素）。
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
      <input type="checkbox" id="ppm-d-zha-bold" class="pp-r">
      <input type="checkbox" id="ppm-d-bad-ink" class="pp-r">
      <input type="checkbox" id="ppm-d-bold" class="pp-r">
      <details class="pp-disp">
        <summary>显示设置 · 12 项（学文墨天机）</summary>
        <div class="pp-disp-g"><span>飞星派显示</span>
          <label for="ppm-d-ss"><i class="pp-disp-box"></i>显示神煞</label>
          <label for="ppm-d-sbg"><i class="pp-disp-box"></i>三台八座恩光天贵</label>
          <label for="ppm-d-zha"><i class="pp-disp-box"></i>彩色箭头标识自化</label>
          <label for="ppm-d-ages"><i class="pp-disp-box"></i>流年虚岁年龄</label>
          <label for="ppm-d-sizhu"><i class="pp-disp-box"></i>中宫八字</label>
        </div>
        <div class="pp-disp-g"><span>四化派显示</span>
          <label for="ppm-d-small"><i class="pp-disp-box"></i>显示小星</label>
          <label for="ppm-d-shen"><i class="pp-disp-box"></i>显示身宫</label>
          <label for="ppm-d-hua"><i class="pp-disp-box"></i>显示命宫四化</label>
          <label for="ppm-d-sf"><i class="pp-disp-box"></i>显示三方四正</label>
        </div>
        <div class="pp-disp-g"><span>限流盘显示</span>
          <label for="ppm-d-zha-bold"><i class="pp-disp-box"></i>自化箭头加粗</label>
          <label for="ppm-d-bad-ink"><i class="pp-disp-box"></i>六煞星黑字</label>
          <label for="ppm-d-bold"><i class="pp-disp-box"></i>主辅星加粗</label>
        </div>
      </details>
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
      <div class="pp-zhlegend">自化图示　<span class="z-lu">${n._zhaMark("禄","本宫")}禄</span><span class="z-quan">${n._zhaMark("权","本宫")}权</span><span class="z-ke">${n._zhaMark("科","本宫")}科</span><span class="z-ji">${n._zhaMark("忌","本宫")}忌</span></div>
      <div class="pp-flywrap">${F}${ee}</div>
    </div>${ce}${E}${J}${R}${w}${te}`};function ra(e){return e.length?e.map(i=>{const r=q[i.type]||"aux",l=i.brightness?`<em class="dt-br ${ie[i.brightness]||"mid"}">${i.brightness}</em>`:"",o=i.inTemple?'<em class="dt-br good">庙</em>':"",c=i.mutagen?`<i class="pp-m ${D[i.mutagen]}">${i.mutagen}</i>`:"";return`<span class="dt-st ${r}">${i.name}${l}${o}${c}</span>`}).join(""):'<span class="dt-empty">无</span>'}function pa(e,i){const r=n._zw;if(!r)return"";const l=w=>r.palaces.find(j=>K.indexOf(j.branch)===w),o=l(e)||r.palaces.find(w=>K.indexOf(w.branch)===e);if(!o)return"";const c=K.indexOf(o.branch),d=Y[oe(i-c)],u=o.shensha||{},m=o.stars.filter(w=>w.type==="主星"),f=o.stars.filter(w=>w.type==="吉星"||w.type==="辅星"),b=o.stars.filter(w=>w.type==="煞星"),C=o.stars.filter(w=>!["主星","吉星","辅星","煞星"].includes(w.type)),S=(o.selfHua||[]).length?o.selfHua.map(w=>`<span class="dt-self">${sa(w.type,w.star||"本宫")}${t(w.star||"")}</span>`).join(""):'<span class="dt-empty">无</span>',T=[oe(c+4),oe(c+8),oe(c+6)].map(w=>{const j=l(w),te=Y[oe(i-w)],F=j?j.stars.filter($=>$.type==="主星").map($=>$.name).join("、"):"",ee=w===oe(c+6)?"对宫":"三合";return`<span class="dt-st">${te}[${K[w]}]<b>${F||"无主星"}</b><em>${ee}</em></span>`}).join(""),k=l(oe(c+6)),E=k?k.stars.filter(w=>w.type==="主星"):[],J=m.length?ra(m):`<span class="dt-empty">无主星</span><span class="dt-tri">　借对宫 <b>${E.length?E.map(w=>w.name).join("、"):"亦无主星"}</b></span>`,R=(w,j)=>`<div class="dt-dr"><span class="dt-k">${w}</span><div class="dt-v">${j}</div></div>`;return`<div class="dt-dh">
        <b>${d}</b><span>${o.branch}宫 · ${o.ganzhi}</span>
        <span>大限 ${o.daxian.start}-${o.daxian.end}</span>
        <span>小限起 ${o.xiaoxian.age} 岁</span>
        ${o.isBody?"<span>· 身宫</span>":""}
        <span class="dt-x" data-pp-close="1">收起</span>
      </div>
      ${R("主星",J)}
      ${R("吉辅",ra(f))}
      ${b.length?R("煞星",ra(b)):""}
      ${C.length?R("杂曜",ra(C)):""}
      ${R("宫干四化",S)}
      ${R("十二神",`<span class="dt-tri">长生 ${u.changsheng||"—"}　博士 ${u.boshi||"—"}　将前 ${u.jiangqian||"—"}　岁前 ${u.suiqi||"—"}</span>`)}
      ${R("三方四正",`<span class="dt-tri">${T}</span>`)}
      <div class="hint">三方四正在盘上已同步标出（浅红描边）。再点一次本宫可收起。</div>`}function ja(e){e.querySelectorAll(".pp-cell.pp-sel,.pp-cell.pp-link").forEach(i=>{i.classList.remove("pp-sel"),i.classList.remove("pp-link")}),e.querySelectorAll('.pp-cell[aria-expanded="true"]').forEach(i=>i.setAttribute("aria-expanded","false"))}const Oa={};function Qa(e,i){Ue(e);const r=e.querySelector(".pp-grid");if(!r)return;const l=[i,(i+6)%12,(i+4)%12,(i+8)%12],o=m=>{const f=e.querySelector('.pp-cell[data-pi="'+m+'"]');if(!f)return null;const b=Number(f.style.gridRow),C=Number(f.style.gridColumn),S=Math.min(75,Math.max(25,(b-.5)*25));return C===1?[25,S]:[75,S]},c=l.map(o);if(c.some(m=>!m))return;const d=document.createElementNS("http://www.w3.org/2000/svg","svg");d.setAttribute("class","pp-sf"),d.setAttribute("viewBox","0 0 100 100"),d.setAttribute("preserveAspectRatio","none");const u=(m,f,b,C)=>{const S=document.createElementNS("http://www.w3.org/2000/svg","line");S.setAttribute("x1",m),S.setAttribute("y1",f),S.setAttribute("x2",b),S.setAttribute("y2",C),d.appendChild(S)};u(c[0][0],c[0][1],c[1][0],c[1][1]),u(c[1][0],c[1][1],c[2][0],c[2][1]),u(c[2][0],c[2][1],c[3][0],c[3][1]),u(c[3][0],c[3][1],c[0][0],c[0][1]);for(let m=0;m<4;m++){const f=document.createElementNS("http://www.w3.org/2000/svg","circle");f.setAttribute("cx",c[m][0]),f.setAttribute("cy",c[m][1]),f.setAttribute("r",m===0?.9:.7),m===0&&f.setAttribute("style","fill:var(--red);opacity:.85"),d.appendChild(f)}r.style.position="relative",r.appendChild(d)}function Ue(e){const i=e.querySelector("svg.pp-sf");i&&i.remove()}function la(){if(la.done||typeof document>"u"||!document.addEventListener)return;la.done=!0;const e=i=>{const r=i.closest(".pp-body");if(!r)return;const l=r.querySelector(".pp-detail");if(!l)return;if(i.classList.contains("pp-sel")){ja(r),Ue(r),l.classList.remove("open"),l.innerHTML="";return}ja(r);const o=Number(i.dataset.pi),c=Number(r.dataset.soul);Qa(r,o),r.querySelectorAll(".pp-cell").forEach(u=>{const m=Number(u.dataset.pi);(m===oe(o+4)||m===oe(o+8)||m===oe(o+6))&&u.classList.add("pp-link")}),i.classList.add("pp-sel"),i.setAttribute("aria-expanded","true"),l.innerHTML=pa(o,c),l.classList.add("open")};document.addEventListener("click",i=>{const r=i.target;if(r&&r.closest&&r.closest("[data-pp-close]")){const o=r.closest(".pp-body");if(o){ja(o),Ue(o);const c=o.querySelector(".pp-detail");c&&(c.classList.remove("open"),c.innerHTML="");return}}const l=r&&r.closest?r.closest(".pp-cell[data-pi]"):null;l&&e(l)}),document.addEventListener("keydown",i=>{if(i.key!=="Enter"&&i.key!==" ")return;const r=i.target&&i.target.closest?i.target.closest(".pp-cell[data-pi]"):null;r&&(i.preventDefault(),e(r))})}n.bindZiwei=la,n._palaceDetailHTML=pa,la();function da(e,i){const r=i||{},l=e.slice().sort((o,c)=>c.position-o.position);return r.plain?l.map(o=>`<div class="mp-hy-row hy-plain">
        <span class="mp-hy-nm">${o.name||ve[o.position-1]}</span>
        ${we(o.yinYang==="阳",o.moving)}
      </div>`).join(""):l.map(o=>{const c=o.yinYang==="阳",d=r.shiYing?o.position===r.shi?'<span class="mp-hy-sy">世</span>':o.position===r.ying?'<span class="mp-hy-sy">应</span>':"<span></span>":"<span></span>",u=o.moving?`<i class="mp-hy-mv" title="动爻">${c?"○":"×"}</i>`:'<i class="mp-hy-mv"></i>';return`<div class="mp-hy-row">
        ${d}
        <span class="mp-hy-nm">${o.name||ve[o.position-1]}</span>
        <span class="mp-hy-ln">${we(c,o.moving)}${u}</span>
        <span class="mp-hy-gz">${t(o.ganzhi||"")}</span>
        <span class="mp-hy-lq">${t(o.liuqin||"")}</span>
        <span class="mp-hy-ls">${t(o.liushen||"")}</span>
      </div>`}).join("")}n.liuyaoHTML=function(e){const i=(w,j,te,F)=>`<div class="mp-hy-box">
      <div class="mp-hy-h"><b>${w}</b><span>${j}</span></div>
      <div class="mp-hy">${da(F,{shiYing:!0,shi:te.shi,ying:te.ying})}</div>
    </div>`,r=i(`本卦 ${e.ben.name}`,`${e.ben.palace} · ${e.ben.palaceElement}`,e.ben,e.ben.lines),l=e.bian?i(`变卦 ${e.bian.name}`,`${e.bian.palace} · ${e.bian.palaceElement}`,e.bian,e.bian.lines):`<div class="mp-hy-box"><div class="mp-hy-h"><b>六爻安静</b><span>无动爻，不取变卦</span></div>
          <div class="pp-dim" style="font-size:12px;line-height:1.9">断卦以本卦卦辞与世应生克为主。</div></div>`,o=e.body&&Array.isArray(e.body.labels)?e.body.labels:[],c=o.length?`<div class="pp-chips">${o.map(w=>`<span class="pp-chip ${/伏吟/.test(w)||/反吟/.test(w)||/化退神/.test(w)?"warn":/六冲|散/.test(w)?"":"ok"}">${t(w)}</span>`).join("")}</div>`:'<div class="pp-chips"><span class="pp-chip">卦体无六冲、六合、伏吟、反吟</span></div>',d=e.useGod&&e.useGod.liuqin?e.useGod:null,u=d?`<div class="pp-chips">${d.labels.map(w=>`<span class="pp-chip ${/空亡|退神|受克|泄气|不上卦/.test(w)?"warn":/持世|化进|六合|得飞神生/.test(w)?"ok":""}">${t(w)}</span>`).join("")}</div>`:'<div class="pp-chips"><span class="pp-chip">用神未取（未指明所问之事）</span></div>',m=e.useGodStrength&&Array.isArray(e.useGodStrength.labels)?e.useGodStrength:null,f=m&&m.labels.length?`<div class="pp-chips">${m.labels.map(w=>`<span class="pp-chip ${/死|囚|月破|受日辰克|泄|耗/.test(w)?"warn":/旺|相|得日辰生|比和/.test(w)?"ok":""}">${t(w)}</span>`).join("")}</div>`:"",b=e.fushenAccess&&Array.isArray(e.fushenAccess.labels)?e.fushenAccess:null,C=b&&b.labels.length?`<div class="pp-chips">${b.labels.map(w=>`<span class="pp-chip ${/可出/.test(w)?"ok":/受压难出|有助有压/.test(w)?"warn":""}">伏神${t(w)}</span>`).join("")}</div>`:"",S=e.yingqi&&Array.isArray(e.yingqi.labels)?e.yingqi:null,T=S&&S.labels.length?`<div class="pp-chips">${S.labels.map(w=>`<span class="pp-chip ${/应期偏速/.test(w)?"ok":/应期待解/.test(w)?"warn":""}" title="只列地支，不出日期">${t(w)}</span>`).join("")}</div>`:"",k=e.jinTuiPower&&Array.isArray(e.jinTuiPower.labels)?e.jinTuiPower:null,E=k&&k.labels.length?`<div class="pp-chips">${k.labels.map(w=>`<span class="pp-chip ${/后劲足|退得缓/.test(w)?"ok":/有限|进得虚|退得实|月破|未定/.test(w)?"warn":""}">${t(w)}</span>`).join("")}</div>`:"",J=e.hexStrength&&Array.isArray(e.hexStrength.labels)?e.hexStrength:null,R=J&&J.labels.length?`<div class="pp-chips">${J.labels.map(w=>`<span class="pp-chip ${/死|囚|月破|冲空/.test(w)?"warn":/旺|相/.test(w)?"ok":""}">${t(w)}</span>`).join("")}</div>`:"";return n.briefHTML(e)+`<div class="pp" style="padding:14px">
      <div class="mp-mh-head">起卦 ${e.cast.notation.join("、")}（自下而上）　日辰 ${e.dayGanZhi.name}</div>
      <div class="mp-hy-wrap">${r}${l}</div>
      ${c}
      ${u}
      ${f}
      ${C}
      ${T}
      ${E}
      ${R}
    </div>`},n.meihuaHTML=function(e){const i=(T,k,E,J,R)=>{const j=[...se[J]||[0,0,0],...se[E]||[0,0,0]].slice().reverse().map(te=>we(!!te,!1,"sm")).join("");return`<div class="mp-hexbox hb-mini">
        <div class="hb-h">${T}</div>
        <div class="hb-n">${k}</div>
        <div class="mp-mh-mini">${j}</div>
        <div class="hb-s">${R||`上${E} 下${J}`}</div>
      </div>`},r=e.lines.slice().sort((T,k)=>k.position-T.position),l=r.slice(0,3),o=r.slice(3),c=e.moving>=4,d=(T,k,E,J)=>`<div class="mp-trib">
      <div class="mp-trib-h">${T} ${he(k)}${k}${Sa(k)}<span class="mp-tritag ${J?"tritag-ti":"tritag-yong"}">${J?"体":"用"}</span></div>
      <div class="mp-hy" style="gap:5px">${da(E,{plain:!0})}</div>
    </div>`,u=`<div class="mp-hexbox">
      <div class="hb-h"><span>本卦</span><span>动 ${e.movingName}</span></div>
      <div class="hb-n">${e.ben.name}</div>
      ${d("上卦",e.ben.upper,l,!c)}
      ${d("下卦",e.ben.lower,o,c)}
      <div class="hb-s">${e.source}</div>
    </div>`,m=e.bodyUse.level,f=m.includes("凶")?"bad":m.includes("吉")?"good":"flat",b=`<div class="mp-mh-rel">
      <div><b>体</b>${e.bodyUse.body.trigram}（${e.bodyUse.body.element}）　<b>用</b>${e.bodyUse.use.trigram}（${e.bodyUse.use.element}）</div>
      <div><span class="mh-lv ${f}">${m}</span>　${e.bodyUse.relation}</div>
    </div>`,C=Je(e.cuo.name)||["",""],S=Je(e.zong.name)||["",""];return n.briefHTML(e)+`<div class="pp mp-mh">
      <div class="mp-mh-main">
        ${u}
        ${i("互卦",e.hu.name,e.hu.upper,e.hu.lower,"中藏之象")}
        ${i("变卦",e.bian.name,e.bian.upper,e.bian.lower,`动 ${e.movingName} 后`)}
        ${i("错卦",e.cuo.name,C[0],C[1],"六爻全变")}
        ${i("综卦",e.zong.name,S[0],S[1],"整卦倒转")}
      </div>
      ${b}
    </div>`};const et={乾为天:["乾","乾"],天风姤:["乾","巽"],天山遁:["乾","艮"],天地否:["乾","坤"],风地观:["巽","坤"],山地剥:["艮","坤"],火地晋:["离","坤"],火天大有:["离","乾"],坎为水:["坎","坎"],水泽节:["坎","兑"],水雷屯:["坎","震"],水火既济:["坎","离"],泽火革:["兑","离"],雷火丰:["震","离"],地火明夷:["坤","离"],地水师:["坤","坎"],艮为山:["艮","艮"],山火贲:["艮","离"],山天大畜:["艮","乾"],山泽损:["艮","兑"],火泽睽:["离","兑"],天泽履:["乾","兑"],风泽中孚:["巽","兑"],风山渐:["巽","艮"],震为雷:["震","震"],雷地豫:["震","坤"],雷水解:["震","坎"],雷风恒:["震","巽"],地风升:["坤","巽"],水风井:["坎","巽"],泽风大过:["兑","巽"],泽雷随:["兑","震"],巽为风:["巽","巽"],风天小畜:["巽","乾"],风火家人:["巽","离"],风雷益:["巽","震"],天雷无妄:["乾","震"],火雷噬嗑:["离","震"],山雷颐:["艮","震"],山风蛊:["艮","巽"],离为火:["离","离"],火山旅:["离","艮"],火风鼎:["离","巽"],火水未济:["离","坎"],山水蒙:["艮","坎"],风水涣:["巽","坎"],天水讼:["乾","坎"],天火同人:["乾","离"],坤为地:["坤","坤"],地雷复:["坤","震"],地泽临:["坤","兑"],地天泰:["坤","乾"],雷天大壮:["震","乾"],泽天夬:["兑","乾"],水天需:["坎","乾"],水地比:["坎","坤"],兑为泽:["兑","兑"],泽水困:["兑","坎"],泽地萃:["兑","坤"],泽山咸:["兑","艮"],水山蹇:["坎","艮"],地山谦:["坤","艮"],雷山小过:["震","艮"],雷泽归妹:["震","兑"]},Fe={乾:"金",兑:"金",离:"火",震:"木",巽:"木",坎:"水",艮:"土",坤:"土"},Sa=e=>Fe[e]?` ${Fe[e]}`:"",Je=e=>et[e]||null;n.daliurenHTML=function(e){const i=e.sanChuan,r=(u,m)=>`<div class="mp-dl-sc-c">
      <div class="mp-dl-sc-k">${m}</div>
      <div class="mp-dl-sc-z">${u.zhi}</div>
      <div class="mp-dl-sc-j">${u.jiangFull||u.jiang}</div>
      <div class="mp-dl-sc-l">${u.liuQin}${u.xunKong?" · 空":""}</div>
    </div>`,l=`<div class="mp-dl-sc-c ge">
      <div class="mp-dl-sc-k">格局</div>
      <div class="mp-dl-sc-gn">${e.geJu.name}</div>
      <div class="mp-dl-sc-l">${e.geJu.detail}</div>
    </div>`,o=e.siKe.slice().map(u=>`<div class="mp-dl-sk-c">
      <div class="mp-dl-sk-k">${["一课","二课","三课","四课"][u.position-1]||u.position+"课"}</div>
      <div class="mp-dl-sk-s">${u.shang}</div>
      <div class="mp-dl-sk-x">${u.xia}</div>
      <div class="mp-dl-sk-r">${u.relation} · ${u.jiangFull||u.jiang}</div>
    </div>`).join(""),c=e.pan.map(u=>{const m=le[u.di]||[1,1];return`<div class="mp-dl-pc" style="grid-row:${m[0]};grid-column:${m[1]}">
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
      <div class="mp-dl-sc">${r(i.chu,"初传")}${r(i.zhong,"中传")}${r(i.mo,"末传")}${l}</div>
      <div class="mp-dl-sk">${o}</div>
      <div class="mp-dl-pan2">${c}${d}</div>
      ${(e.shensha||[]).length?`<div class="mp-dl-ss"><b>神煞</b>${e.shensha.map(u=>`<span title="${t(u.note||"")}">${u.name}<i>${u.branch}</i></span>`).join("")}</div>`:""}
      <div class="mp-dl-legend"><span>大字＝天盘支</span><span>小字＝地盘（固定十二支）</span><span>右下＝天将</span></div>
    </div>`},n.tarotHTML=function(e){const i=e.cards.map(o=>`
      <div class="mp-tt-card ${o.upright?"tt-up":"tt-rev"}">
        <div class="mp-tt-pos" title="${t(o.positionHint||"")}">${o.position}</div>
        <div class="mp-tt-name">${o.name}${o.number?`<span class="mp-tt-no">${o.number}</span>`:""}</div>
        ${o.en?`<div class="mp-tt-en">${o.en}</div>`:""}
        <div class="mp-tt-ori">${o.orientation}</div>
        ${o.image?`<div class="mp-tt-img">牌面：${o.image}</div>`:""}
        ${o.core?`<div class="mp-tt-core">${o.core}</div>`:""}
        <div class="mp-tt-kw">${o.keywords.map(c=>`<span>${c}</span>`).join("")}</div>
        <div class="mp-tt-el">${o.arcana} · ${o.element}${o.suit?" · "+o.suit+(o.rankCn?o.rankCn:""):""}${o.domain?" · "+o.domain:""}${o.astro?` · ${o.astro}`:o.role?` · ${o.role}`:""}</div>
      </div>`).join(""),r=e.question?t(e.question):'<span class="pp-dim">（未填写，可在上方输入后重抽）</span>',l=(e.reading||[]).map(o=>`<p>${t(o)}</p>`).join("");return n.briefHTML(e)+`<div class="pp mp-tt">
      <div class="mp-tt-q"><b>所问</b>${r}</div>
      <div class="mp-tt-head">${e.spread}${e.castAt?`　·　抽牌于 ${e.castAt}`:""}</div>
      <div class="mp-tt-grid">${i}</div>
      <div class="mp-tt-read"><div class="mp-tt-rt">牌面解读</div>${l}</div>
      <div class="mp-tt-note"><div class="mp-tt-rt">你的记录</div>
        <textarea class="mp-tt-ta" rows="4" placeholder="写下判断或对照后的想法……（仅本页可见，不保存）"></textarea>
      </div>
      ${e.systemNote?`<div class="mp-tt-tip">${e.systemNote}</div>`:""}
      <div class="mp-tt-tip">塔罗用于自我觉察与娱乐，不作确定性预言。</div>
    </div>`};const ca=e=>{if(!e||!Array.isArray(e.pairs)||!e.pairs.length)return"";const r='<tr><th scope="col">一对</th><th scope="col">契合度</th>'+(e.pairs[0].dimensions||[]).map(d=>`<th scope="col">${t(d.label)}</th>`).join("")+"</tr>",l=e.pairs.map(d=>`<tr><th scope="row">${t(d.a)} × ${t(d.b)}</th><td>${d.total==null?"—":`${t(d.total)}/100`}<span class="mp-hp-lv">${t(d.level||"")}</span></td>`+(d.dimensions||[]).map(u=>`<td>${u.score>=0?"+":""}${t(u.score)}</td>`).join("")+"</tr>").join(""),o=e.spread>=3&&e.best?`最顺：<b>${t(e.best.a)} × ${t(e.best.b)}</b>（${t(e.best.total)}/100）`+(e.hardest?`；最需磨合：<b>${t(e.hardest.a)} × ${t(e.hardest.b)}</b>（${t(e.hardest.total)}/100）`:""):`三对分数接近（相差 ${t(e.spread)} 分），不排名`,c=e.focus&&e.focus.spread>=3?`<p>差异最大的一维：<b>${t(e.focus.label)}</b>（三对相差 ${t(e.focus.spread)} 分）</p>`:"";return`<div class="mp-hp-triple">
      <div class="mp-hp-ith">三方合盘 · 三对并列</div>
      <table><thead>${r}</thead><tbody>${l}</tbody></table>
      <p>${o}</p>${c}
      <p>${t(e.note||"")}</p>
    </div>`};n.hepanHTML=function(e){const i=(l,o)=>`<div class="mp-hp-side">
      <div class="mp-hp-who">${o}</div>
      <div class="mp-hp-gz">${l.pillars.join(" ")}</div>
      <div class="mp-hp-kv"><span>日主</span><b>${l.dayMaster}</b></div>
      <div class="mp-hp-kv"><span>日支</span><b>${l.dayBranch}</b></div>
      <div class="mp-hp-kv"><span>强弱</span><b>${l.strength||"—"}</b></div>
      <div class="mp-hp-kv"><span>喜用</span><b>${l.favor||"—"}</b></div>
    </div>`,r=e.dimensions.map(l=>`<div class="mp-hp-dim">
      <div class="mp-hp-dimh"><span>${l.label}</span><b class="${l.score>=10?"good":l.score<0?"bad":""}">${l.score>=0?"+":""}${l.score}</b></div>
      <div class="mp-hp-dimt">${l.text}</div>
    </div>`).join("");return n.briefHTML(e)+`<div class="pp mp-hp">
      <div class="mp-hp-head"><b>${e.score.level}</b><span>${e.score.total}/100</span></div>
      <div class="mp-hp-sides">${i(e.a,"你")}${i(e.b,"对方")}</div>
      <div class="mp-hp-dims">${r}</div>
      ${ca(e.triple)}
      <div class="mp-hp-notes">${e.notes.map(l=>`<p>${l}</p>`).join("")}</div>
    </div>`},n.qimenFactsHTML=function(e){if(!e||!e.palaces)return"";const i=(o,c)=>`<div class="relation__row"><dt>${t(o)}</dt><dd>${t(c)}</dd></div>`,r=o=>o&&["旺","相","休","囚","死"].filter(d=>Array.isArray(o[d])&&o[d].length).map(d=>`${d} ${o[d].join("、")}`).join("；")||"—";return`<dl class="relation mp-qm-facts" aria-label="奇门盘面事实">${[["局数",`${e.ju}${e.yuan?`（${e.yuan}）`:""}`],["节气",`${e.jieqi||"—"}${e.jieqiTime?`（${e.jieqiTime}）`:""}`],["四柱",`${e.siZhu?`${e.siZhu.year} ${e.siZhu.month} ${e.siZhu.day} ${e.siZhu.time}`:"—"}`],["值符",e.zhiFu?`${e.zhiFu.star} · ${e.zhiFu.gong}宫`:"—"],["值使",e.zhiShi?`${e.zhiShi.gate} · ${e.zhiShi.gong}宫`:"—"],["旬首",e.xunshou||"—"],["空亡",(e.kongWang||[]).join("")||"—"],["驿马",e.ma&&e.ma.zhi?`${e.ma.zhi}${e.ma.gong?`（${e.ma.gong}宫）`:""}`:"—"],["换局规则",e.juMethodNote||e.juMethod||"—"],["晚子时",e.lateZiHourMode==="next-day"?"23:00 后归次日":"23:00 后仍归当日"],["击刑",e.conditions&&e.conditions.jiXing&&e.conditions.jiXing.length?e.conditions.jiXing.map(o=>`${o.palace}宫${o.stem}`).join("、"):"本盘无"],["三奇入墓",e.conditions&&e.conditions.ruMu&&e.conditions.ruMu.length?e.conditions.ruMu.map(o=>`${o.palace}宫${o.stem}`).join("、"):"本盘无"],["六仪入墓",e.conditions&&e.conditions.liuYiRuMu&&e.conditions.liuYiRuMu.length?e.conditions.liuYiRuMu.map(o=>`${o.palace}宫${o.stem}`).join("、"):"本盘无"],["十干克应",[...e.palaces||[],e.centerPalace].filter(c=>c&&c.ganYing).map(c=>`${c.palace}宫 ${c.ganYing.tian}加${c.ganYing.di}「${c.ganYing.name}」`).join("；")||"—"],["月令",e.month&&e.month.branch?`${e.month.branch}（${e.month.element}）`:"—"],["门旺衰",r(e.states&&e.states.gate)],["星旺衰",r(e.states&&e.states.star)],["干旺衰",r(e.states&&e.states.stem)],["干宫生克",(()=>{const o=["干克宫","宫克干","干生宫","宫生干","比和"],c={};for(const d of e.palaces||[]){const u=d.stemRelation||null;!u||u.type==="unknown"||!d.tianPan||(c[u.type]=c[u.type]||[]).push(d.tianPan)}return o.filter(d=>c[d]).map(d=>d+" "+c[d].join("、")).join("；")||"—"})()]].map(([o,c])=>i(o,c)).join("")}</dl>`};const Fa=[["4","9","2"],["3","5","7"],["8","1","6"]];n.qimenHTML=function(e){const i={};for(const l of e.palaces)i[l.palace]=l;const r=l=>{if(l==="5")return`<div class="pp-qm-cell center">
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
      </div>`};return n.briefHTML(e)+`<div class="pp mp-qm">
      <div class="mp-qm-head">
        <b>${e.ju}</b>
        <span>${e.siZhu.year} ${e.siZhu.month} ${e.siZhu.day} ${e.siZhu.time}</span>
        <span>节气 ${e.jieqi}（${e.jieqiTime}）</span>
        <span>值符 ${e.zhiFu.star}（${e.zhiFu.gong}宫）　值使 ${e.zhiShi.gate}（${e.zhiShi.gong}宫）</span>
        <span>旬首 ${e.xunshou}　空亡 ${e.kongWang.join("")||"—"}　驿马 ${e.ma.zhi||"—"}</span>
      </div>
      <div class="mp-qm-grid">${Fa.map(l=>l.map(r).join("")).join("")}</div>
      <div class="mp-qm-legend">上＝九星　中＝天盘干／八门　下＝地盘干／宫号　角落＝八神</div>
      <div class="mp-qm-rules">${e.rules.map(l=>`<p>${l}</p>`).join("")}</div>
    </div>`},n.ziweiHepanHTML=function(e){const i=(o,c)=>`<div class="mp-hp-side">
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
    </div>`).join(""),l=o=>(e.interactions||[]).filter(c=>c.who===o).map(c=>`<li><b class="m-${c.mutagen}">${c.mutagen}</b>${c.star}：本命${c.ownPalace} → 对方${c.landingPalace||"盘外"}${c.strong?"<i>（强）</i>":""}</li>`).join("");return n.briefHTML(e)+`<div class="pp mp-hp">
      <div class="mp-hp-head"><b>${e.score.level}</b><span>${e.score.total}/100　紫微合盘</span></div>
      <div class="mp-hp-sides">${i(e.a,"你")}${i(e.b,"对方")}</div>
      <div class="mp-hp-dims">${r}</div>
      <div class="mp-hp-inter">
        <div><div class="mp-hp-ith">你的四化 落在对方</div><ul>${l("你")||"<li>无</li>"}</ul></div>
        <div><div class="mp-hp-ith">对方的四化 落在你</div><ul>${l("对方")||"<li>无</li>"}</ul></div>
      </div>
      ${ca(e.triple)}
      <div class="mp-hp-notes">${e.notes.map(o=>`<p>${o}</p>`).join("")}</div>
    </div>`},n.curveHTML=function(e){const i=e&&e.dayun&&Array.isArray(e.dayun.list)?e.dayun.list:[],r=e&&Array.isArray(e.liunian)?e.liunian:[];if(i.length<2)return"";const l=v=>typeof v=="number"&&isFinite(v)?v:0,o=v=>v.luck?l(v.luck.score):0,c=4.2,d=-2.2,u=l(e.dayun.startAge&&e.dayun.startAge.years),m=i.length?i[i.length-1].startAge+10:u+80,f=r.map(v=>l(v.age)).filter(v=>v>0),b=Math.min(u,...f.length?f:[u]),C=Math.max(m,...f.length?f:[m]),S=Math.max(1,C-b),T=640,k=190,E={t:14,r:16,b:26,l:30},J=T-E.l-E.r,R=k-E.t-E.b,w=v=>E.l+(v-b)/S*J,j=v=>E.t+R-(Math.max(d,Math.min(c,v))-d)/(c-d)*R,F=[{from:1.2,to:c,cls:"b-good"},{from:.55,to:1.2,cls:"b-good"},{from:-.8,to:.55,cls:"b-flat"},{from:-1.45,to:-.8,cls:"b-bad"},{from:d,to:-1.45,cls:"b-bad"}].map(v=>`<rect class="cv-band ${v.cls}" x="${E.l}" y="${j(v.to).toFixed(1)}" width="${J}" height="${(j(v.from)-j(v.to)).toFixed(1)}"/>`).join(""),ee=10/S*J,$=[];i.forEach((v,de)=>{const ae=l(v.startAge),Se=o(v),ze=Math.max(E.l,w(ae)),je=Math.min(E.l+J,w(ae+10));$.push(`${ze.toFixed(1)},${j(Se).toFixed(1)}`),$.push(`${je.toFixed(1)},${j(Se).toFixed(1)}`)});const ce=$.length?`<polyline class="cv-dy" points="${$.join(" ")}"/>`:"",z=$.length?`<polygon class="cv-dyfill" points="${E.l},${(E.t+R).toFixed(1)} ${$.join(" ")} ${(E.l+J).toFixed(1)},${(E.t+R).toFixed(1)}"/>`:"",H=r.filter(v=>v.luck&&typeof v.luck.score=="number").map(v=>({x:w(l(v.age)),y:j(l(v.luck.score)),y0:l(v.year),gz:v.ganzhi,tier:v.luck.tier,v:l(v.luck.score),age:l(v.age)})),ne=H.length>1?`<polyline class="cv-ln" points="${H.map(v=>`${v.x.toFixed(1)},${v.y.toFixed(1)}`).join(" ")}"/>`:"",ye={大吉:"var(--lu)",吉:"var(--lu)",平:"var(--muted)",忌:"var(--red)",大忌:"var(--red)"},be=H.length?Math.min(...H.map(v=>v.y0)):null,me=H.map(v=>`<circle class="cv-dot${v.y0===be?" now":""}" cx="${v.x.toFixed(1)}" cy="${v.y.toFixed(1)}" fill="${ye[v.tier]||"var(--muted)"}"><title>${t(`${v.y0}年（${v.age}岁）${v.gz}　${v.tier} ${v.v}`)}</title></circle>`).join(""),xe=`<line class="cv-ax zero" x1="${E.l}" y1="${j(0).toFixed(1)}" x2="${E.l+J}" y2="${j(0).toFixed(1)}"/><line class="cv-ax" x1="${E.l}" y1="${E.t}" x2="${E.l}" y2="${E.t+R}"/>`,Ie=S>60?10:5,Ge=[];for(let v=Math.ceil(b/Ie)*Ie;v<=C;v+=Ie)Ge.push(`<text class="cv-lbl age" x="${w(v).toFixed(1)}" y="${(E.t+R+13).toFixed(1)}" text-anchor="middle">${v}岁</text>`);const y=`<text class="cv-lbl" x="${(E.l-5).toFixed(1)}" y="${(j(2.4)+3).toFixed(1)}" text-anchor="end">吉</text><text class="cv-lbl" x="${(E.l-5).toFixed(1)}" y="${(j(0)+3).toFixed(1)}" text-anchor="end">平</text><text class="cv-lbl" x="${(E.l-5).toFixed(1)}" y="${(j(-1.8)+3).toFixed(1)}" text-anchor="end">忌</text>`,ue=i.slice().sort((v,de)=>o(de)-o(v)),_=ue[0],U=ue[ue.length-1],W=_&&o(_)>.55?`<text class="cv-lbl" x="${w(l(_.startAge)+5).toFixed(1)}" y="${(j(o(_))-5).toFixed(1)}" text-anchor="middle">▲${_.startAge}岁 ${_.luck.tier}</text>`:"",re=U&&o(U)<-.8?`<text class="cv-lbl" x="${w(l(U.startAge)+5).toFixed(1)}" y="${(j(o(U))+11).toFixed(1)}" text-anchor="middle">▼${U.startAge}岁 ${U.luck.tier}</text>`:"",ge=`<div class="cv-legend">
      <span><i style="background:var(--quan)"></i>大运（阶梯，一步十年）</span>
      <span><i style="background:var(--ke)"></i>流年（逐年折线）</span>
      <span>绿带＝吉　灰带＝平　红带＝忌</span>
    </div>`,h=`<div class="cv-tip">曲线只呈现引擎已给出的行运评分（${d} ~ ${c}），不预测具体事件；档位与依据见下方「大运 / 流年」各节。悬停看逐年详情。</div>`;return`<div class="mp-curve">
      <div class="mp-curve-h"><b>人生运势曲线</b><span>${b}–${C} 岁　${e.dayun.rule}，${u} 岁起运${e.dayun.jiao&&e.dayun.jiao.at?`，交运 ${e.dayun.jiao.at}`:""}</span></div>
      <svg viewBox="0 0 ${T} ${k}" role="img" aria-label="人生运势曲线：${b} 到 ${C} 岁的大运与流年评分走势">
        ${F}${xe}${z}${ce}${ne}${me}${Ge.join("")}${y}${W}${re}
      </svg>
      ${ge}${h}
    </div>`},n.trendChart=function(e){const i=e&&Array.isArray(e.points)?e.points:[];if(i.length<2)return"";const r=e&&Array.isArray(e.segments)?e.segments:[],l=_=>typeof _=="number"&&isFinite(_)?_:0,o=720,c=322,d={t:34,r:46,b:66,l:36},u=o-d.l-d.r,m=c-d.t-d.b,f=i.length,b=u/f,C=_=>d.l+(_+.5)*b,S=_=>d.t+m-Math.max(0,Math.min(100,_))/100*m,T=Math.max(1.1,Math.min(10,b*.62)),k=_=>l(_.score),E=d.t+m,J=E+20,R=22,j=`klclip${(()=>{let _=2166136261;const U=W=>{const re=String(W??"");for(let ge=0;ge<re.length;ge++)_^=re.charCodeAt(ge),_=Math.imul(_,16777619)};U(f),U(i[0]&&i[0].age),U(i[f-1]&&i[f-1].age);for(const W of i)U(W&&W.score);return(_>>>0).toString(36)})()}`,te=r.map((_,U)=>{const W=Math.max(0,_.startAge-1),re=Math.min(f-1,_.endAge-1);if(re<W)return"";const ge=d.l+W*b,h=Math.max(.6,(re-W+1)*b),de=U%2===1?`<rect class="kl-band" x="${ge.toFixed(1)}" y="${d.t}" width="${h.toFixed(1)}" height="${m}"/><rect class="kl-stripband" x="${ge.toFixed(1)}" y="${J}" width="${h.toFixed(1)}" height="${R}"/>`:"",ae=U===0?"":`<line class="kl-segline" x1="${ge.toFixed(1)}" y1="${d.t}" x2="${ge.toFixed(1)}" y2="${E}"/>`,Se=Math.min(Math.max(d.l+(W+re+1)/2*b,d.l+22),d.l+u-22);return de+ae+`<text class="kl-seg" x="${Se.toFixed(1)}" y="${(J+15).toFixed(1)}" text-anchor="middle">${t(_.ganZhi)}</text>`}).join(""),F=[0,25,50,75,100].map(_=>`<line class="kl-grid${_===50?" mid":""}" x1="${d.l}" y1="${S(_).toFixed(1)}" x2="${d.l+u}" y2="${S(_).toFixed(1)}"/><text class="kl-lbl" x="${d.l-6}" y="${(S(_)+3).toFixed(1)}" text-anchor="end">${_}</text>`).join(""),ee=i.map((_,U)=>{const W=_.kline||{},re=l(W.open),ge=l(W.close),h=Math.min(100,l(W.high)),v=Math.max(0,l(W.low)),de=ge>=re,ae=S(re),Se=S(ge),ze=Math.min(ae,Se),je=Math.max(.8,Math.abs(ae-Se)),ga=C(U),fa=`${_.age}岁（${_.year}年 ${_.ganZhi}）${ge}分${_.dayunGanZhi?` · ${_.dayunGanZhi}运`:""}`;return`<g class="kl-c${de?" up":" down"}"><title>${t(fa)}</title><line x1="${ga.toFixed(2)}" y1="${S(h).toFixed(1)}" x2="${ga.toFixed(2)}" y2="${S(v).toFixed(1)}"/><rect x="${(ga-T/2).toFixed(2)}" y="${ze.toFixed(1)}" width="${T.toFixed(2)}" height="${je.toFixed(1)}" rx="0.7"/></g>`}).join(""),$=_=>{const U=[];for(let W=0;W<f;W++){if(W+1<_)continue;let re=0;for(let ge=W+1-_;ge<=W;ge++)re+=k(i[ge]);U.push({i:W,v:re/_})}return U},ce=_=>$(_).map((U,W)=>`${W?"L":"M"}${C(U.i).toFixed(1)} ${S(U.v).toFixed(1)}`).join(" "),z=(_,U)=>{const W=$(_);if(!W.length)return"";const re=W[W.length-1];return{cls:U,y:S(re.v),text:`<text class="kl-ma-lbl ${U}" x="${d.l+u+5}" y="${S(re.v).toFixed(1)}" text-anchor="start">${re.v.toFixed(0)}</text>`}},H=z(10,"m10"),ne=z(5,"m5"),ye=(()=>{if(!ne||!H)return`${H?H.text:""}${ne?ne.text:""}`;let _=ne.y,U=H.y;if(Math.abs(_-U)<10){const W=Math.min(_,U),re=Math.max(_,U);_=W-6,U=re+6}return`<text class="kl-ma-lbl m10" x="${d.l+u+5}" y="${U.toFixed(1)}" text-anchor="start">${$(10).slice(-1)[0].v.toFixed(0)}</text><text class="kl-ma-lbl m5" x="${d.l+u+5}" y="${_.toFixed(1)}" text-anchor="start">${$(5).slice(-1)[0].v.toFixed(0)}</text>`})();let be=i[0],me=i[0];for(const _ of i)k(_)>k(be)&&(be=_),k(_)<k(me)&&(me=_);const xe=(_,U,W)=>{const re=i.indexOf(_),ge=C(re),h=S(k(_)),v=Math.min(Math.max(ge,d.l+26),d.l+u-26),de=U==="hi"?h-8<d.t+6?14:W:h+12>d.t+m-2?-8:W;return`<g class="kl-mark ${U}"><circle cx="${ge.toFixed(1)}" cy="${h.toFixed(1)}" r="2"/><circle class="ring" cx="${ge.toFixed(1)}" cy="${h.toFixed(1)}" r="4.6"/><text x="${v.toFixed(1)}" y="${(h+de).toFixed(1)}" text-anchor="middle">${_.age}岁 ${k(_)}</text></g>`},Ie=f>60?10:5,Ge=i.filter(_=>_.age%Ie===0).map(_=>`<text class="kl-lbl age" x="${C(i.indexOf(_)).toFixed(1)}" y="${(E+14).toFixed(1)}" text-anchor="middle">${_.age}</text>`).join(""),y=`<text class="kl-lbl axis" x="${d.l}" y="${(c-6).toFixed(1)}">年龄（岁）</text><text class="kl-lbl axis" x="${d.l+u}" y="${(c-6).toFixed(1)}" text-anchor="end">每岁一分 · 满分 100</text>`;return`<div class="mp-kline-fig">
      <svg viewBox="0 0 ${o} ${c}" role="img" aria-label="人生K线：1 到 ${f} 岁的逐年评分蜡烛图">
        <defs><clipPath id="${j}"><rect x="${d.l}" y="${d.t}" width="${u}" height="${m}"/></clipPath></defs>
        ${te}${F}
        <g clip-path="url(#${j})">
          ${ee}
          <path class="kl-ma m10" d="${ce(10)}"/><path class="kl-ma m5" d="${ce(5)}"/>
        </g>
        ${ye}
        ${xe(be,"hi",-8)}${xe(me,"lo",12)}
        ${Ge}${y}
      </svg><div class="kl-legend"><span><i class="up"></i>阳线：比上一岁高</span><span><i class="down"></i>阴线：比上一岁低</span><span><i class="m5"></i>5 年均线</span><span><i class="m10"></i>10 年均线</span><span>虚线＝大运交界</span></div></div>`},n.trendHTML=function(e,i){if(!e)return"";const r=!(i&&i.brief===!1),l=n.trendChart(e);if(!l)return n.quickHTML(e);const o=Array.isArray(e.segments)?e.segments:[],c=e.highlights&&typeof e.highlights=="object"?e.highlights:{},d=e.meta||{},u=d.strength||{},m=o.map(F=>`<span class="kl-chip">${t(F.ganZhi)}<em>${F.startAge}–${F.endAge}</em></span>`).join(""),f=(Array.isArray(c.best)?c.best:[]).map(F=>`<div class="kl-hl hi">${t(F)}</div>`).join(""),b=(Array.isArray(c.worst)?c.worst:[]).map(F=>`<div class="kl-hl lo">${t(F)}</div>`).join(""),C=d.boundaryNote?`<div class="mp-kline-note">${t(d.boundaryNote)}</div>`:c.suppressed?`<div class="mp-kline-note">${t(c.suppressed)}</div>`:"",S=Array.isArray(e.points)?e.points:[],T=F=>typeof F.score=="number"&&isFinite(F.score)?F.score:0,k=S.map(T),E=k.length?k.reduce((F,ee)=>F+ee,0)/k.length:0,J=k.length?Math.max(...k)-Math.min(...k):0,R=o.map(F=>{const ee=S.filter($=>$.age>=F.startAge&&$.age<=F.endAge).map(T);return{ganZhi:F.ganZhi,v:ee.length?ee.reduce(($,ce)=>$+ce,0)/ee.length:0}}).filter(F=>F.v>0).sort((F,ee)=>ee.v-F.v),w=!!(u.boundary||c.suppressed),j=[`<span><em>全段均值</em><b>${E.toFixed(0)}</b></span>`];!w&&R.length&&(j.push(`<span><em>最好大运</em><b class="hi">${t(R[0].ganZhi)} ${R[0].v.toFixed(0)}</b></span>`),j.push(`<span><em>最差大运</em><b class="lo">${t(R[R.length-1].ganZhi)} ${R[R.length-1].v.toFixed(0)}</b></span>`)),j.push(`<span><em>波动幅度</em><b>${J.toFixed(0)}</b></span>`);const te=`<div class="kl-stats">${j.join("")}</div>`;return(r?n.briefHTML(e):"")+`<section class="mp-kline" aria-label="人生K线结果">
      <div class="mp-kline-h"><b>人生 K 线</b><span>${t(d.birth||"")}　日主 ${t(d.dayMaster||"")}　${t(u.level||"")}${u.score?`（${u.score}）`:""}</span></div>
      ${l}
      ${te}
      ${m?`<div class="kl-segs">${m}</div>`:""}
      ${f||b?`<div class="kl-hls">${f}${b}</div>`:""}
      ${C}
      <div class="mp-kline-tip">逐岁分数由大运与流年十神按固定表确定性计分（1–100），只表五行力量的顺逆，不预测具体事件；旺衰落在换档阈值附近时，不出高低年份结论。</div>
    </section>`},n.chengguHTML=function(e){if(!e)return"";const i=e.weights||{},r=e.song||{},l=["year","month","day","hour"].map(u=>{const m=i[u]||{label:"",qian:0},f=String(m.label||"").split(" ")[0]||"",b=String(m.label||"").split(" ")[1]||"";return`<div class="cg-cell"><em>${t(f)}</em><b>${t(b)}</b></div>`}).join(""),o=String(r.text||""),c=o?o.replace(/[。]$/,"").split("；").map((u,m)=>`<span>${t(u)}${m===0?"；":"。"}</span>`).join(""):"",d=e.verdict&&e.verdict.band?e.verdict.band:"";return`<section class="mp-cg" aria-label="称骨结果">
      <div class="mp-cg-h"><b>称骨</b><span>${t(e.lunar&&e.lunar.text?e.lunar.text:"")}</span></div>
      <div class="mp-cg-w">${l}</div>
      <div class="mp-cg-tot"><em>骨重合计</em><b>${t(e.total&&e.total.label?e.total.label:"")}</b>${d?`<i>${t(d)}</i>`:""}</div>
      <div class="mp-cg-song"><div class="mp-cg-song-h">称骨歌 · ${t(e.total&&e.total.label?e.total.label:"")}</div>
        <div class="mp-cg-verse">${c||'<span class="mp-cg-miss">该骨重未见通行本歌诀</span>'}</div>
        <div class="mp-cg-plain"><em>释义</em>${t(r.plain||"")}</div></div>
      ${e.verdict&&e.verdict.text?`<div class="mp-cg-band"><em>分档</em>${t(e.verdict.text)}</div>`:""}
      <div class="mp-cg-note">骨重与歌诀为通行本口径（各版本歌诀有异文，断句标点已统一）；释义为白话自撰，只作字面直解，属民俗娱乐参考，不构成命运断言。</div>
    </section>`},n.nameHTML=function(e){if(!e)return"";const i={木:"wood",火:"fire",土:"earth",金:"metal",水:"water"},r=f=>f==="未收录"?'<span class="mp-nm-el">未收录</span>':`<span class="mp-nm-el wx-${i[f]||"earth"}">${t(f)}</span>`,l=(f,b)=>`<div class="mp-nm-h"><b>${t(f)}</b>${b?`<i>${t(b)}</i>`:""}</div>`;if(e.action==="generate"){const f=e.bazi&&e.bazi.favorable?e.bazi.favorable.join("、"):"",b=(e.candidates||[]).map(C=>{const S=C.wuge&&C.wuge.available?(()=>{const k=C.wuge.rows.filter(R=>R.level==="吉").length,E=C.wuge.rows.filter(R=>R.level==="凶").length;return`<span class="mp-nm-fit${E===0&&k>=4?" ok":E>=2?" no":""}" title="${t(C.wuge.summary)}">五格 ${k}/5 吉</span>`})():"",T=C.phonetics&&C.phonetics.available?`<span class="mp-nm-fit${C.phonetics.level==="拗口"?" no":C.phonetics.level==="顺口"?" ok":""}" title="${t((C.phonetics.issues||[]).map(k=>k.text).join("；"))}">${t(C.phonetics.level)}</span>`:"";return`<div class="mp-nm-c"><b>${t(C.name)}</b><span class="mp-nm-els">${C.chars.map(k=>r(k.element)).join("")}${S}${T}</span><em>${t(C.chars.map(k=>k.char+"·"+k.meaning).join("　"))}</em></div>`}).join("");return`<section class="mp-nm" aria-label="候选名">
        ${l("候选名",`姓 ${e.surname}（${e.gender}）${f?`　喜用 ${f}`:""}`)}
        <div class="mp-nm-cand">${b}</div>
        <div class="mp-nm-note">${(e.notes||[]).map(C=>"※ "+t(C)).join("<br>")}</div>
      </section>`}const o=(e.chars||[]).map(f=>{const b=f.favorable===!0?'<span class="mp-nm-fit ok">合喜用</span>':f.favorable===!1?'<span class="mp-nm-fit no">不合喜用</span>':'<span class="mp-nm-fit">不判</span>',C=f.source==="user"?"用户指定":f.source==="lib"?"字库":"未收录",S=f.suggest&&f.suggest.length?`<div class="mp-nm-sug"><b>可换</b>${f.suggest.map(T=>`<span class="wx-${i[T.element]||"earth"}">${t(T.char)}（${t(T.element)}）</span>`).join("")}</div>`:"";return`<div class="mp-nm-row"><div class="mp-nm-ch">${t(f.char)}</div>
        <div class="mp-nm-b"><div class="mp-nm-t">${r(f.element)}<span>${t(C)}</span>${b}</div>
        <div class="mp-nm-m">${t(f.meaning)}</div>${S}</div></div>`}).join(""),c=e.bazi?`<div class="mp-nm-m">八字：${t(e.bazi.dayMaster&&e.bazi.dayMaster.stem?`${e.bazi.dayMaster.stem}（${e.bazi.dayMaster.element}）`:String(e.bazi.dayMaster||""))}　${t(e.bazi.strength?`${e.bazi.strength.level}（${e.bazi.strength.score}）`:"")}　喜用 ${t((e.bazi.favorable||[]).join("、"))}</div>
         <div class="mp-nm-m">${t(e.bazi.basis||"")}</div>`:"",d=f=>f==="吉"?"is-ok":f==="半吉"?"is-half":"is-bad",u=e.wuge&&e.wuge.available?`<div class="mp-nm-wu">
          <div class="mp-nm-wu-h"><b>五格</b><i>康熙笔画 · 通行本 81 数理</i></div>
          <div class="mp-nm-wu-rows">${e.wuge.rows.map(f=>`<div class="mp-nm-wu-c ${d(f.level)}"><em>${t(f.key)}</em><b>${f.strokes}</b><i>${t(`${f.level} · ${f.name}`)}</i></div>`).join("")}</div>
          <div class="mp-nm-m">笔画：${e.wuge.strokes.map(f=>`${t(f.char)}${f.strokes}${f.source==="user"?"（指定）":""}`).join(" ＋ ")}</div>
          <div class="mp-nm-m">三才：${t(e.wuge.sancai.text)}</div>
        </div>`:`<div class="mp-nm-wu"><div class="mp-nm-wu-h"><b>五格</b><i>这一版算不了</i></div><div class="mp-nm-m">${t(e.wuge?e.wuge.reason:"未算")}</div></div>`,m=e.phonetics&&e.phonetics.available?`<div class="mp-nm-ph"><b>音韵</b><span class="mp-nm-ph-lv${e.phonetics.level==="顺口"?" ok":e.phonetics.level==="拗口"?" bad":" warn"}">${t(e.phonetics.level)}</span><em>${t(e.phonetics.chars.map(f=>`${f.py}${f.tone}`).join(" "))}　声调 ${t(e.phonetics.tonePattern)}${(e.phonetics.alt||[]).length?`　又读 ${t(e.phonetics.alt.map(f=>`${f.char} ${f.py}${f.tone}`).join("、"))}`:""}</em>${(e.phonetics.issues||[]).map(f=>`<span class="mp-nm-ph-i">${t(f.text)}</span>`).join("")}</div>`:`<div class="mp-nm-ph"><b>音韵</b><em>${t(e.phonetics?e.phonetics.reason:"未算")}</em></div>`;return`<section class="mp-nm" aria-label="名字评估">
      ${l(e.fullName||"",`字库 ${e.stats&&e.stats.libSize?e.stats.libSize:""} 字${e.stats&&e.stats.unknown?`　未收录 ${e.stats.unknown}`:""}`)}
      ${o}
      ${c}
      ${u}
      ${m}
      <div class="mp-nm-verd">${t(e.verdict||"")}</div>
      <div class="mp-nm-note">${(e.notes||[]).map(f=>"※ "+t(f)).join("<br>")}</div>
    </section>`},n.briefHTML=function(e){return e&&e.brief?n.summaryHTML(e.brief):""},n.summaryHTML=function(e){if(!e||!e.lead)return"";const i=(e.sections||[]).map(o=>`<div class="mp-br-sec"><b>${t(o.h)}</b><p>${t(o.t)}</p></div>`).join(""),r=e.advice&&e.advice.length?`<div class="mp-br-adv"><b>可以试着做的</b><ul>${e.advice.map(o=>`<li>${t(o)}</li>`).join("")}</ul></div>`:"",l=e.chips&&e.chips.length?`<div class="mp-br-chips">${e.chips.map(o=>`<span>${t(o)}</span>`).join("")}</div>`:"";return`<section class="mp-br" aria-label="先说结论">
      <div class="mp-br-h"><b>${t(e.title||"先看这一张")}</b>${l}</div>
      <p class="mp-br-lead">${t(e.lead)}</p>
      ${i}
      ${r}
      ${e.caveat?`<p class="mp-br-cav">※ ${t(e.caveat)}</p>`:""}
      ${e.footer?`<p class="mp-br-foot">${t(e.footer)}</p>`:""}
    </section>`},n.baziHTML=function(e){const i=[["year","年柱"],["month","月柱"],["day","日柱"],["hour","时柱"]].filter(([h])=>e.pillars[h]),r={year:"年",month:"月",day:"日",hour:"时"},l={木:"wood",火:"fire",土:"earth",金:"metal",水:"water"},o={比肩:"tg-bi",劫财:"tg-bi",食神:"tg-shi",伤官:"tg-shi",偏财:"tg-cai",正财:"tg-cai",七杀:"tg-guan",正官:"tg-guan",偏印:"tg-yin",正印:"tg-yin"},c=h=>`<span class="tg ${o[h]||""}">${h}</span>`,d=h=>`<span class="wx-${l[h]||"earth"}">${fe(h)}${h}</span>`,u=h=>`<span class="ss-s ${h.luck||"neutral"}" title="${t(`${h.cat} · ${h.via}查${h.target} ｜ ${h.rule}`)}">${h.name}</span>`,m=(h,v)=>`<tr><td class="bz-lbl">${h}</td>${i.map(([de])=>`<td data-c="${r[de]}">${v(e.pillars[de],de)}</td>`).join("")}</tr>`,f=`<thead><tr><th></th>${i.map(([h,v])=>`<th${h==="day"?' class="bz-hdr-day"':""}>${v}</th>`).join("")}</tr></thead>`,b={寅:"木",卯:"木",巳:"火",午:"火",申:"金",酉:"金",亥:"水",子:"水",辰:"土",戌:"土",丑:"土",未:"土"},C={木:"火",火:"土",土:"金",金:"水",水:"木"},S={木:"土",土:"水",水:"火",火:"金",金:"木"},T=b[e.pillars.month.branch]||"土",k=["木","火","土","金","水"],E=h=>h===T?"旺":C[T]===h?"相":C[h]===T?"休":S[h]===T?"囚":"死",J=`<tr><td class="bz-lbl">五行</td><td class="bz-wxs" colspan="${i.length}">${["旺","相","休","囚","死"].map(h=>{const v=k.find(de=>E(de)===h)||T;return`<i><b class="wx-${l[v]}">${v}</b><em>${h}</em></i>`}).join("")}</td></tr>`,R=[m("十神",(h,v)=>v==="day"?`<span class="bz-zhuri">${e.input.gender==="male"?"元男":"元女"}</span>`:h.stemTenGod?c(h.stemTenGod):'<span class="pp-dim">—</span>'),m("天干",h=>`<span class="bz-big ${"wx-"+l[h.stemElement]}">${h.stem}</span>`),m("地支",h=>`<span class="bz-big ${"wx-"+l[h.branchElement]}">${h.branch}</span>`),m("藏干",h=>h.hidden.map(v=>`<i class="bz-cg wx-${l[v.element]}">${v.stem}·${v.element}</i>`).join("")),m("支神",h=>h.hidden.map(v=>c(v.tenGod)).join("<br>")),m("纳音",h=>h.nayin),m("空亡",h=>`<span class="pp-dim">${h.kongwang.join("")}</span>`),m("地势",h=>h.dishi),m("自坐",h=>h.zizuo),m("神煞",h=>h.shenshaDetail&&h.shenshaDetail.length?`<span class="pp-ss">${h.shenshaDetail.map(u).join("")}</span>`:'<span class="pp-dim">—</span>'),J].join(""),w=Object.entries(e.wuxing).map(([h,v])=>`<span class="pp-chip wx-${l[h]}">${fe(h)}${h} ${v}</span>`).join(""),j=e.frame||{},te=h=>h==="大吉"||h==="吉"?"ok":h==="大忌"||h==="忌"?"warn":"",F=(h,v)=>v?`<div class="pp-sec"><div class="pp-sec-h">${h}</div>${v}</div>`:"",ee=j.geju&&j.geju.length?`
      <div class="pp-tl">${j.primary?`主格 <b>${t(j.primary.name)}</b>　${t(j.primary.evidence)}`:""}</div>
      <div class="pp-chips">${j.geju.map(h=>{const v=h.status==="破格",de=h.status==="待定"||h.status==="假从",ae=`${h.evidence||""}${Array.isArray(h.breaks)&&h.breaks.length?`；破：${h.breaks.join("；")}`:""}`;return`<span class="pp-chip ${v?"broken":de?"warn":""}" title="${t(ae)}">${t(h.name)}<i class="pp-drel">${t(h.kind)}${h.status?`·${t(h.status)}`:""}</i></span>`}).join("")}</div>`:"",$=(()=>{const h=Array.isArray(j.yongshen&&j.yongshen.neutral)?j.yongshen.neutral:[],v=new Set(j.yongshen&&j.yongshen.neutralTenGods||[]);return`${(j.yongshen&&j.yongshen.avoidTenGods||[]).filter(ae=>!v.has(ae)).map(ae=>`<span class="pp-chip warn">${t(ae)}</span>`).join("")}${[...v].map(ae=>`<span class="pp-chip neu" title="局中分量近零，按中性偏忌看">${t(ae)}</span>`).join("")}${h.length?`<span class="pp-chip neu" title="忌神中全局不足 0.5 分的那几行；仍在忌里参与行运评分">中性偏忌 ${h.map(ae=>`${t(ae.element)} ${t(ae.weight)} 分`).join("、")}</span>`:""}`})(),ce=j.yongshen?`
      <div class="pp-tl">喜 ${j.yongshen.favor.map(d).join("")}　忌 ${j.yongshen.avoid.map(d).join("")}　<span class="pp-dim">${t(j.yongshen.method)}</span></div>
      <div class="pp-chips">${j.yongshen.favorTenGods.map(h=>`<span class="pp-chip ok">${t(h)}</span>`).join("")}${$}</div>
      ${(j.yongshen.disputed||[]).length?`<div class="pp-tl pp-dim">有争议：${j.yongshen.disputed.map(h=>`${t(h.element)}（扶抑为${t(h.favorRole)}·${t(h.favorVerb)}，${t(h.climate)}盘调候忌${t(h.element)}）`).join("、")}　保留在喜用，不列入忌</div>`:""}
      <div class="pp-tl pp-dim">${t(j.yongshen.detail)}</div>`:"",z=e.climate||j.yongshen&&j.yongshen.climate||null,H=z?(()=>{const h=Math.max(2,Math.min(98,Math.round(((Number(z.temp)||0)+3)/6*100))),v=z.need?`<em>调候取</em><b>${t(z.need.stem+z.need.element)}</b>`:"<em>气候平和</em>",de=!!(j.yongshen&&Array.isArray(j.yongshen.disputed))&&j.yongshen.disputed.some(fa=>fa.element===z.avoidElement),ae=z.need?`<em>忌</em><b>${t(z.avoidElement)}</b>${de?'<span class="pp-dim">（有争议）</span>':""}`:"",Se=(z.evidence||[]).length?`<em>依据</em><span>${t(z.evidence.join("、"))}</span>`:"",ze=z.priority==="调候优先"?'<span class="mp-cli-p">调候优先</span>':'<span class="mp-cli-p">扶抑为主</span>',je=e.frame&&e.frame.yongshen&&e.frame.yongshen.qt,ga=je?`<div class="mp-qt">
          <div class="mp-qt-h"><b>穷通宝鉴</b><span>${t(je.label)}</span></div>
          <div class="mp-qt-y"><em>用神</em>${je.yong.map((fa,Ia)=>`<b class="${Ia===0?"first":""}">${t(fa)}</b>`).join("")}<em>首取 ${t(je.primary)}</em></div>
          <div class="mp-qt-q" title="${t(je.quote)}">「${t(je.quote)}」<span>第 ${je.chapter} 章${je.truncated?" · 首段更长，摘句下略":""}${je.note?" · "+t(je.note):""}</span></div>
        </div>`:"";return`<section class="mp-cli" aria-label="寒暖燥湿">
        <div class="mp-cli-h"><b>寒暖燥湿</b><span class="mp-cli-k">${t(z.label||"")}</span>${ze}</div>
        <div class="mp-cli-bar" title="寒 ← → 热"><i style="left:${h}%"></i></div>
        <div class="mp-cli-axis"><span>寒</span><span>平</span><span>热</span></div>
        <div class="mp-cli-row">${v}${ae}${Se}</div>
        <div class="mp-cli-narr">${t(z.narration||"")}</div>
        ${ga}
      </section>`})():"",ne=j.godStats?`<div class="pp-chips">${Object.entries(j.godStats.groups).map(([h,v])=>`<span class="pp-chip">${h} ${v}</span>`).join("")}</div>`:"",ye=e.dayun.list.map(h=>{const v=h.luck||null;return`<span class="pp-chip ${v?te(v.tier):""}" title="${t(`${h.fromDate?`${h.fromDate} 交运；`:""}${v?`${v.tier} ${v.score}｜${(v.reasons||[]).join("；")}`:""}`)}">${h.startAge} ${h.ganzhi}${h.relations&&h.relations.length?` <i class="pp-drel">${h.relations.join("")}</i>`:""}${v?` ${v.tier}`:""}</span>`}).join(""),be=e.liunian&&e.liunian.length?`<div class="pp-chips">${e.liunian.slice(0,8).map(h=>{const v=h.luck||null,de=h.suiyun&&Array.isArray(h.suiyun.signals)?h.suiyun.signals:[],ae=de.length?`｜${de.map(Se=>Se.detail).join("；")}`:"";return`<span class="pp-chip ${v?te(v.tier):""}" title="${t(v?`${v.tier} ${v.score}｜${(v.reasons||[]).join("；")}${ae}`:ae.replace(/^｜/,""))}">${h.year} ${h.ganzhi}${v?` ${v.tier}`:""}</span>`}).join("")}</div>`:"",me=(e.liunian||[]).filter(h=>h.suiyun&&Array.isArray(h.suiyun.signals)&&h.suiyun.signals.length),xe=e.suiyunClassic,Ie=xe?`<div class="pp-dim pp-sy-src" title="${t(xe.plain||"")}">《${t(xe.bookName||"")}·${t(xe.chapter||"")}》「${t(xe.quote||"")}」</div>`:"",Ge=me.length?`<div class="pp-tl pp-dim">岁运提示（只标干支变动，不判吉凶）</div><div class="pp-chips">${me.map(h=>`<span class="pp-chip" title="${t(`${h.suiyun.signals.map(v=>v.detail).join("；")}｜${h.suiyun.note||""}`)}">${h.year} ${t(h.suiyun.signals.map(v=>`${v.type}${(v.type.startsWith("流年")||v.type.startsWith("大运"))&&v.target?`·${v.target}`:""}`).join("/"))}</span>`).join("")}</div>${Ie}`:"",y=e.strength?`<div class="pp-str">日主强弱：<b>${e.strength.level}</b>${e.strength.score}　<span class="pp-dim">${e.strength.detail}</span></div>`:"",ue=e.strength&&e.strength.branchStructure,_=ue?(()=>{const h=ue.branches.map(ze=>`${t(ze.label)}${t(ze.branch)}<i class="pp-drel">·${t(ze.camp)}</i>${ue.placeholderHour&&ze.key==="hour"?'<span class="pp-dim">占位</span>':""}`).join(" "),v=ue.odd&&ue.odd.length?`<span class="pp-st-odd">异类 ${ue.odd.map(ze=>`${t(ze.label)}${t(ze.branch)}（${ze.weight}分）`).join("、")}</span>`:'<span class="pp-st-odd">无异类</span>',de=ue.congProb!=null?`　从格 ${t(ue.congRange)}`:"　不套从格概率",ae=ue.balance||{},Se=ae.branch?`　支 ${ae.branch.A}:${ae.branch.B}　合干 ${ae.total?`${ae.total.A}:${ae.total.B}`:"—"}`:"";return`<div class="pp-struct" title="${t(`${ue.method}；${ue.note}`)}"><span class="pp-st-code">${t(ue.code)}</span>${h}　${v}${de}${Se}<span class="pp-dim">　静态结构，只作标注，不改上面的旺衰评分</span></div>`})():"",U=e.relations&&Array.isArray(e.relations.anhe)?e.relations.anhe:[],W=U.length?`<div class="pp-anhe" title="${t(e.relations.anheNote||"")}"><b>暗合</b>${U.map(h=>t(h)).join("　")}<span class="pp-dim">　另列，不并入上面的合冲刑害；${U.length===1?"只一对，按口径可忽略":`共 ${U.length} 对`}</span></div>`:"",re=e.shensha&&e.shensha.groups||[],ge=re.length?`
      <div class="pp-ssx">
        <div class="ssx-h"><b>神煞全览</b><span>共 ${e.shensha.count} 见 · ${re.length} 类 · 悬停看查法</span></div>
        ${re.map(h=>`<div class="pp-ssg"><span class="ssg-gt">${h.cat}</span><span class="ssg-gi">${h.items.map(v=>`<span class="pp-ssi ${v.luck||"neutral"}" title="${t(`${v.via}查${v.target} ｜ ${v.rule}`)}">${v.name}<em>${v.pillars.map(de=>r[de]||"").join("")}</em></span>`).join("")}</span></div>`).join("")}
        <div class="ssx-h" style="border-top:none;padding-top:4px;margin-top:4px">神煞只作参考，吉凶仍须看格局、旺衰与行运。</div>
      </div>`:"";return n.briefHTML(e)+`<div class="pp" style="padding:12px">
      <table class="pp-bz">${f}<tbody>${R}</tbody></table>
      ${e.hourUnknown?'<div class="pp-warn" role="note">时柱暂缺：只排年/月/日三柱，起运与交运按日估算。时柱按正午暂算，涉及时柱的结论仅供参考。</div>':""}
      <div class="pp-rel"><div><b>天干</b>${e.relations&&e.relations.stems.length?e.relations.stems.join(" · "):"—"}</div>
      <div><b>地支</b>${e.relations&&e.relations.branches.length?e.relations.branches.join(" · "):"—"}</div></div>
      ${y}
      ${_}
      ${W}
      ${F("格局",ee)}
      ${F("用神",ce)}
      ${H}
      ${Array.isArray(e.classics)&&e.classics.length?`<section class="mp-cl" aria-label="古籍原文">
        <div class="mp-cl-h"><b>古籍原文</b><span>照录通行本，释义为白话自撰</span></div>
        ${e.classics.map(h=>`<div class="mp-cl-e">
          <div class="mp-cl-t"><b>${t(({ziping:"子平真诠",ditian:"滴天髓",sanming:"三命通会"}[h.book]||h.book)+"·"+h.chapter)}</b></div>
          <div class="mp-cl-q">「${t(h.quote)}」</div>
          <div class="mp-cl-p">${t(h.plain)}</div>
        </div>`).join("")}
      </section>`:""}
      ${F("五行与十神",`<div class="pp-chips">${w}</div>${ne}`)}
      ${F("大运",`${n.curveHTML(e)}<div class="pp-chips">${ye}</div>`)}
      ${be?F("流年",be+Ge):""}
      ${e.palaces?F("胎命身",`<div class="pp-chips">
        <span class="pp-chip" title="${t(e.palaces.taiyuan.note)}">胎元 ${t(e.palaces.taiyuan.ganzhi)}</span>
        ${e.palaces.taixi?`<span class="pp-chip" title="${t(e.palaces.taixi.note)}">胎息 ${t(e.palaces.taixi.ganzhi)}</span>`:""}
        ${e.palaces.minggong?`<span class="pp-chip" title="${t(e.palaces.minggong.note)}">命宫 ${t(e.palaces.minggong.ganzhi)}</span>`:""}
        ${e.palaces.shengong?`<span class="pp-chip" title="${t(e.palaces.shengong.note)}">身宫 ${t(e.palaces.shengong.ganzhi)}</span>`:""}
        ${!e.palaces.minggong||!e.palaces.shengong?'<span class="pp-chip" title="命宫与身宫由生月与生时支合数定宫；时柱暂缺，这两宫不排">命宫·身宫 时柱暂缺不排</span>':""}
      </div>`):""}
      ${ge}
      <div style="margin-top:8px;font-size:12px;color:var(--muted)">上一节 ${e.jieqi.previous.name} ${e.jieqi.previous.time}　下一节 ${e.jieqi.next.name} ${e.jieqi.next.time}　${e.dayun.rule}，${e.dayun.startAge.years}岁起运${e.dayun.jiao&&e.dayun.jiao.at?`（交运 ${e.dayun.jiao.at}，${e.dayun.jiao.frame}）`:""}${e.dayun.startAgeExact&&Number.isInteger(e.dayun.startAgeExact.years)?`　精确 ${e.dayun.startAgeExact.years}年${e.dayun.startAgeExact.months}月${e.dayun.startAgeExact.days}天${e.dayun.startAgeExact.hours}时（截断到日时；上面是四舍五入到月）`:""}</div>
    </div>`};const at={natal:"命盘解析",divination:"卦象解析",card:"牌阵解析"},Da={同向:"good",有张力:"watch",互补:"alt"},St=e=>`<div class="mp-cross">${e.map(i=>{const r=Da[i.stance]||"plain";return`<div class="mp-cross-row">
      <div class="mp-cross-h"><span class="mp-cross-l">${t(i.label)}</span><span class="mp-cross-tag t-${r}">${t(i.stance||"—")}</span></div>
      <div class="mp-cross-b">
        <div class="mp-cross-cell"><b>八字</b><span>${t(i.bazi||"—")}</span></div>
        <div class="mp-cross-cell"><b>紫微</b><span>${t(i.ziwei||"—")}</span></div>
      </div>
      ${i.note?`<div class="mp-cross-note">${t(i.note)}</div>`:""}
    </div>`}).join("")}</div>`;n.interpretHTML=function(e,i){if(!e||!(e.dimensions&&e.dimensions.length||e.sections&&e.sections.length)&&!e.error&&!e.answer)return"";const l=!!(i&&i.folded);let o=-1;(e.dimensions||[]).forEach(($,ce)=>{$.knowledge&&$.knowledge.length&&(o=ce)});const c=(e.dimensions||[]).map(($,ce)=>`<div class="mp-it-dim${$.focused?" focus":""}">
      <div class="mp-it-dh"><span class="mp-it-dno">${ce+1}</span><span class="mp-it-dlabel">${t($.label)}</span>${$.focused?'<span class="mp-it-focus">最贴近你的问题</span>':""}${$.confidence?`<span class="mp-it-conf c-${t($.confidence)}">置信度 ${t($.confidence)}</span>`:""}</div>
      ${$.plain?`<div class="mp-it-dplain">${t($.plain)}</div>`:""}
      <div class="mp-it-dtext">${t($.text)}</div>
      ${$.evidence&&$.evidence.length?`<details class="mp-it-ev"><summary>依据 · ${t($.evidence.length)} 条盘面事实</summary><div class="mp-it-ev-body">${$.evidence.map(z=>`<span class="mp-it-ev-item">${t(z)}</span>`).join("")}<span class="mp-it-ev-tech">技法：${t(e.technique||e.systemLabel||"")}</span></div></details>`:""}
      ${$.knowledge&&$.knowledge.length?`<div class="mp-it-know">${$.knowledge.map(z=>`<div class="know-row"><span class="know-status ${z.status}">${t(z.statusLabel)}</span><span class="know-body"><b>${t(z.gist)}</b>${t(z.detail)}${z.source?`<i>出处：${t(z.source)}</i>`:""}${z.note?`<em>注：${t(z.note)}</em>`:""}</span></div>`).join("")}${ce===o&&e.knowledgeNote?`<div class="know-disc">${t(e.knowledgeNote)}</div>`:""}</div>`:""}
      ${$.advice?`<div class="mp-it-adv"><b>建议</b>${t($.advice)}</div>`:""}
    </div>`).join(""),d=e.outline&&e.outline.length?`<div class="mp-outline"><div class="mp-outline-h">一页读懂</div>${e.outline.map($=>`<div class="mp-outline-row"><b>${t($.label)}</b><span>${t($.text)}</span></div>`).join("")}</div>`:"",u=e.sections&&e.sections.length?`<nav class="mp-toc" aria-label="报告目录">${e.sections.map($=>`<a href="#mp-sec-${t($.key)}">${t($.label)}</a>`).join("")}</nav>`:"",m=e.tables&&e.tables.length?`<div class="mp-tables">${e.tables.filter($=>Array.isArray($.rows)&&$.rows.length).map($=>`<div class="mp-table-wrap">
          <div class="mp-table-h">${t($.title)}</div>
          <div class="mp-table-scroll"><table class="mp-table">
            <thead><tr>${$.columns.map(ce=>`<th scope="col">${t(ce)}</th>`).join("")}</tr></thead>
            <tbody>${$.rows.map(ce=>`<tr>${ce.map((z,H)=>`<td data-label="${t($.columns[H]||"")}">${t(z)}</td>`).join("")}</tr>`).join("")}</tbody>
          </table></div>
        </div>`).join("")}</div>`:"",f=$=>String($||"").split(`
`).map(ce=>`<div class="mp-it-p">${t(ce).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>")}</div>`).join(""),b=e.sections&&e.sections.length?`<div class="mp-it-secs">${e.sections.map($=>`<div class="mp-it-sec${$.tone?` tone-${t($.tone)}`:""}" id="mp-sec-${t($.key)}">
        <div class="mp-it-sh">${t($.label)}</div>
        <div class="mp-it-stext">${Array.isArray($.items)&&$.items.length?St($.items):f($.text)}</div>
      </div>`).join("")}</div>`:"",C=[e.systemLabel,at[e.moduleType]||e.moduleType].filter(Boolean),S=e.ask,T=S&&S.question?t(S.question):"",k=S&&(T||S.direction&&S.direction!=="general")?`<div class="mp-it-ask">${T?`<span class="ask-q">问题：${T}</span><span class="ask-sep">｜</span>`:""}<span class="ask-d">询问方向：${t(S.directionLabel||"综合")}</span></div>`:"",E=e.answer?`<div class="mp-it-ans"><b>${T?"先答所问":"先看结论"}</b>${t(e.answer)}</div>`:"",J=e.plain?`<div class="mp-it-plain"><b>说人话</b>${t(e.plain)}</div>`:"",R=e.followups&&e.followups.length?`<div class="mp-it-fu"><b>还可以这样追问</b><ul>${e.followups.map($=>`<li>${t($)}</li>`).join("")}</ul></div>`:"",w=e.glossary&&e.glossary.length?`<details class="mp-it-gloss"><summary>名词解释（${e.glossary.length} 条）</summary>${e.glossary.map($=>`<div><span>${t($.term)}</span>${t($.plain)}</div>`).join("")}</details>`:"",j=e.limits&&e.limits.length?`<details class="mp-it-limits"><summary>本插件不回答什么（${e.limits.length} 条）</summary>${e.limits.map($=>`<div><b>${t($.title)}</b>${t($.text)}</div>`).join("")}</details>`:"",F=e.system&&/^(liuyao|meihua|daliuren|qimen|tarot|xiaoliuren)$/.test(e.system)?`<div class="mp-askcopy-row"><button type="button" class="mp-askcopy" data-mp-askcopy="${t(e.system)}">复制问事提示</button><span class="mp-askcopy-hint">把这张盘和你的问题打包成一段提示，粘到任何对话里都能用</span></div>`:"",ee=e.guide?`<details class="mp-guide">
      <summary><b>${t(e.guide.title)}</b><span class="mp-guide-sub">数 / 象 / 辞</span></summary>
      <div class="mp-guide-body">
        <p class="mp-guide-lead">${t(e.guide.lead)}</p>
        <ol class="mp-guide-layers">${(e.guide.layers||[]).map($=>`<li><b>${t($.name)}<i>${t($.sub)}</i></b><span>${t($.text)}</span><em>${t($.hint)}</em></li>`).join("")}</ol>
        <div class="mp-guide-check"><b>${t(e.guide.check.title)}</b><ol>${(e.guide.check.items||[]).map($=>`<li>${t($)}</li>`).join("")}</ol><p>${t(e.guide.check.tail)}</p></div>
        <div class="mp-guide-parts"><b>${t(e.guide.parts.title)}</b><ul>${(e.guide.parts.rows||[]).map($=>`<li><span>${t($[0])}</span>${t($[1])}</li>`).join("")}</ul><p>${t(e.guide.parts.tail)}</p></div>
        <p class="mp-guide-close">${t(e.guide.closing)}</p>
      </div></details>`:"";return`<div class="mp-it${l?" folded":""}">
      <button type="button" class="mp-it-head" aria-expanded="${l?"false":"true"}">
        <span class="mp-it-arrow" aria-hidden="true">▾</span>
        <span class="mp-it-title">解析与详解</span>${C.map($=>`<span class="mp-it-tag">${t($)}</span>`).join("")}
        <span class="mp-it-hint">${l?"点击展开":"点击收起"}</span>
      </button>
      <div class="mp-it-wrap">
        ${F}
        ${k}
        ${E}
        ${J}
        ${e.lead?`<div class="mp-it-lead">${t(e.lead)}</div>`:""}
        ${e.error?`<div class="mp-it-err"><b>⚠ 解析生成失败</b>${t(e.error)}——上方盘面数据本身可用</div>`:""}
    ${ee}
    ${d}
        ${u}
        <div class="mp-it-body">${c}</div>
        ${b}
        ${m}
        ${R}
        ${w}
        ${j}
        <div class="mp-it-dis">${t(e.disclaimer)}</div>
      </div>
    </div>`},n.followupHTML=function(e){if(!e)return"";const i=e.evidence&&e.evidence.length?`<div class="mp-fu-ev">依据：${e.evidence.map(r=>t(r)).join("；")}　置信度：${t(e.confidence||"弱")}</div>`:"";return`<div class="mp-fu${e.ok?"":" miss"}">
      <div class="mp-fu-h">追问 · ${t(e.question)}</div>
      <div class="mp-fu-a">${t(e.answer)}</div>
      ${i}
    </div>`},n.resultWithInterpret=function(e,i,r){return(e||"")+n.interpretHTML(i,r)},n.caliberHTML=function(e){const i=e&&Array.isArray(e.switches)?e.switches.filter(m=>m&&m.key):[];if(!i.length)return"";const r=i.filter(m=>!m.error&&m.total>0),l=r.length?`${i.length} 组开关中 ${r.length} 组影响此盘：${r.map(m=>m.short||m.title).join("、")}。`:`本盘对 ${i.length} 组开关都不敏感：换成另一档也不变。`,o=m=>{if(m.error)return`<div class="mp-cdiff-same">未能对照：${t(m.error)}</div>`;if(!m.total)return'<div class="mp-cdiff-same">无变化 · 此盘不受这一开关影响</div>';const f=Array.isArray(m.roots)?m.roots:[];return f.length?`<div class="mp-cdiff-roots">${f.map(b=>`<div class="mp-cdiff-root"><span class="mp-cdiff-k">${t(b.label)}</span><span class="mp-cdiff-from">${t(b.from)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-to">${t(b.to)}</span></div>`).join("")}</div>`:`<div class="mp-cdiff-same">无单一根因；逐字段差异 ${Number(m.total)||0} 处</div>`},c=m=>{const f=(Array.isArray(m.views)?m.views:[]).filter(b=>b&&b.changed);return m.error||!m.total||!f.length?"":`<table class="mp-cview"><thead><tr><th scope="col">项</th><th scope="col">${t(m.currentLabel)}</th><th scope="col">${t(m.altLabel)}</th></tr></thead><tbody>`+f.map(b=>`<tr><th scope="row">${t(b.label)}</th><td>${t(b.current)}</td><td>${t(b.alt)}</td></tr>`).join("")+"</tbody></table>"},d=m=>{const f=Array.isArray(m.categories)?m.categories:[];if(m.error||!m.total||!f.length)return"";const b=f.slice(0,6);return`<div class="mp-cdiff-cats">${b.map(C=>`<span class="mp-cdiff-cat">${t(C.name)} ${Number(C.count)||0} 处</span>`).join("")}`+(f.length>b.length?`<span class="mp-cdiff-cat">另 ${f.length-b.length} 类</span>`:"")+"</div>"},u=i.map(m=>`<div class="mp-cdiff-row"><div class="mp-cdiff-h"><b>${t(m.title)}</b><span class="mp-cdiff-count${m.total>0?" on":""}">${m.error?"未能对照":m.total?`${Number(m.total)||0} 处`:"无变化"}</span></div><div class="mp-cdiff-ab"><span class="mp-cdiff-pill now">当前 · ${t(m.currentLabel)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-pill alt">换成 · ${t(m.altLabel)}</span></div>${o(m)}${c(m)}${d(m)}</div>`).join("");return`<details class="mp-cdiff" aria-label="口径对照">
      <summary><span class="mp-cdiff-title">口径对照</span><span class="mp-cdiff-lead">${t(l)}</span><span class="mp-cdiff-more">展开逐字差异</span></summary>
      <div class="mp-cdiff-body">${u}
        <div class="mp-cdiff-note">同一组输入、只换一个开关；只列变化字段与根因，不判哪套口径更准，也不改上方盘面。</div>
      </div>
    </details>`},n.handleHTML=function(e){return typeof e!="string"||!e?"":`<section class="mp-handle" aria-label="排盘句柄">
      <span class="mp-handle-title">排盘句柄</span>
      <code class="mp-handle-code" title="${t(e)}">${t(e)}</code>
      <button type="button" class="mp-handle-copy" data-handle-copy="${t(e)}" aria-label="复制排盘句柄">复制句柄</button>
      <span class="mp-handle-hint">追问同一张盘时把它连同增量参数（年份、方向、所问之事）一并交给助手，不必重报出生信息。句柄是编码不是加密，含出生时间与出生地，别公开贴出。</span>
    </section>`},n.revisionHTML=function(e){if(!e||typeof e!="object")return"";const i=Array.isArray(e.applied)?e.applied:[],r=Array.isArray(e.ignored)?e.ignored:[];if(!i.length&&!r.length)return"";const l=i.map(o=>{const c=o.fromDisplay==null?"（未设）":o.fromDisplay;return`<li><span class="k">${t(o.label||o.key)}</span><span class="v"><span class="old">${t(c)}</span> → <span class="new">${t(o.display)}</span></span></li>`}).join("");return`<section class="mp-revise" aria-label="一句话改参">
      <div class="mp-revise-head"><span class="mp-revise-title">一句话改参</span><span class="mp-revise-text">「${t(e.text||"")}」</span></div>
      ${l?`<ul class="mp-revise-list">${l}</ul>`:'<p class="mp-revise-ignored">没有识别到可改的参数，仍按原参数排盘。</p>'}
      ${r.length?`<p class="mp-revise-ignored">未处理：${t(r.join("；"))}</p>`:""}
    </section>`},n.shadowHTML=function(e,i){if(!e||!e.id)return"";const r=[];e.version&&r.push(`版本 <b>${t(e.version)}</b>`),e.baseId&&r.push(`基础指纹 <b>${t(e.baseId)}</b>`),r.push("同参数同 ID");const l=[];e.reproducible===!1&&l.push(`不可复算：${t(e.reason||"参数不足")}`);const o=e.reproducible===!0&&e.asOfPinned===!1&&(e.system==="bazi"||e.system==="ziwei")?'<div class="mp-shadow-hint">未固定 asOf：流年 / 流月随「此刻」变化；要逐字比对请在输入里固定 asOf。</div>':"",c=i&&i.sameId!==!1&&(i.versionChanged||Number(i.total)>0);let d="";if(c){const u=Number(i.total)||0,m=t(i.fromVersion||"—"),f=t(i.toVersion||e.version||"—"),b=Array.isArray(i.roots)?i.roots:[],C=b.slice(0,8),S=C.length?`<div class="mp-cdiff-roots">${C.map(E=>`<div class="mp-cdiff-root"><span class="mp-cdiff-k">${t(E.label)}</span><span class="mp-cdiff-from">${t(E.from)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-to">${t(E.to)}</span></div>`).join("")}`+(b.length>C.length?`<div class="same">另 ${b.length-C.length} 处根因</div>`:"")+"</div>":`<div class="same">${u?"无单一根因；逐字段变化 "+u+" 处":"字段 0 处变化：同一张盘跨版本逐字一致"}</div>`,T=Array.isArray(i.categories)?i.categories:[],k=T.length?`<div class="mp-cdiff-cats">${T.slice(0,6).map(E=>`<span class="mp-cdiff-cat">${t(E.name)} ${Number(E.count)||0} 处</span>`).join("")}`+(T.length>6?`<span class="mp-cdiff-cat">另 ${T.length-6} 类</span>`:"")+"</div>":"";d=`<details class="mp-shadow-diff"${u>0?" open":""}>
        <summary><b>与上次同盘比对</b><span class="tag">${m} → ${f} · ${u?`${u} 处变化`:"0 处变化"}</span></summary>
        ${S}${k}
        <div class="note">同一 baseId（同一组归一化参数）的两次结果；只比盘面字段，不含摘要、解析与古籍等文本层。</div>
      </details>`}return`<section class="mp-shadow" aria-label="影子盘">
      <div class="mp-shadow-head"><span class="mp-shadow-title">影子盘</span><code class="mp-shadow-id">${t(e.id)}</code>
        <button type="button" class="mp-shadow-copy" data-shadow-copy="${t(e.id)}" aria-label="复制影子盘 ID">复制 ID</button></div>
      <div class="mp-shadow-meta">${r.join('<span aria-hidden="true">·</span>')}</div>
      ${l.map(u=>`<div class="mp-shadow-warn">⚠ ${u}</div>`).join("")}
      ${o}
      ${d}
    </section>`},n.shadowTrack=function(e){const i=window.Engine||window.__PP&&window.__PP.Engine;if(!i||!i.shadowSnapshot||!i.shadowDiff)return null;let r=null;try{r=i.shadowSnapshot(e)}catch{return null}if(!r||!r.shadow||!r.shadow.baseId)return null;const l="mp-shadow-v1";let o={};try{const u=window.localStorage?window.localStorage.getItem(l):null,m=u?JSON.parse(u):{};m&&typeof m=="object"&&!Array.isArray(m)&&(o=m)}catch{o={}}const c=o[r.shadow.baseId];let d=null;if(c)try{d=i.shadowDiff(c,r)}catch{d=null}r.at=Date.now(),o[r.shadow.baseId]=r;try{const u=Object.keys(o);if(u.length>24){u.sort((m,f)=>(Number(o[m]&&o[m].at)||0)-(Number(o[f]&&o[f].at)||0));for(const m of u.slice(0,u.length-24))delete o[m]}window.localStorage&&window.localStorage.setItem(l,JSON.stringify(o))}catch{}return d};const De="dsh-metaphysics/profiles-v1",qa=24,Na=16,Ae=40,tt=60,Ma=["bazi","ziwei","liuyao","tarot","meihua","daliuren","hepan","qimen","almanac","zeri","chenggu","xiaoliuren","star","numerology","mbti","trend","fengshui","name","convert"];n.PROF_KEY=De,n.PROF_MAX=qa,n.PROF_KINDS=Ma;const Pa={bazi:"八字",ziwei:"紫微",liuyao:"六爻",tarot:"塔罗",meihua:"梅花",daliuren:"六壬",hepan:"合盘",qimen:"奇门",almanac:"黄历",zeri:"择日",chenggu:"称骨",xiaoliuren:"小六壬",star:"星座",numerology:"生命数字",mbti:"人格",trend:"人生K线",fengshui:"风水",name:"起名",convert:"农历"};n.profKindLabel=e=>Pa[e]||String(e||"");const Ke=e=>typeof e=="string";function Pe(e){if(!e||typeof e!="object"||Array.isArray(e)||!Ke(e.id)||!e.id||e.id.length>40||!Ke(e.kind)||Ma.indexOf(e.kind)<0)return null;const i=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e.date||""));if(!i)return null;const r=Number(i[1]),l=Number(i[2]),o=Number(i[3]);if(l<1||l>12||o<1||o>new Date(r,l,0).getDate())return null;const c=Ke(e.time)&&/^([01]?\d|2[0-3]):[0-5]\d$/.test(e.time)?e.time:"";return{id:e.id,kind:e.kind,label:Ke(e.label)?e.label.slice(0,Na):"",date:e.date,time:e.hourUnknown===!0?"":c,hourUnknown:e.hourUnknown===!0,trueSolar:e.trueSolar!==!1,lateZi:e.lateZi!==!1,gender:e.gender==="male"||e.gender==="female"?e.gender:"",address:Ke(e.address)?e.address.slice(0,Ae):"",note:Ke(e.note)?e.note.slice(0,tt):"",pinned:e.pinned===!0,createdAt:Number(e.createdAt)||0,lastUsedAt:Number(e.lastUsedAt)||0,uses:Number(e.uses)||0}}function it(){try{const e=window.localStorage?window.localStorage.getItem(De):null,i=e?JSON.parse(e):[];return Array.isArray(i)?i:[]}catch{return[]}}function Re(e){return e.slice().sort((i,r)=>(r.pinned?1:0)-(i.pinned?1:0)||(r.lastUsedAt||r.createdAt||0)-(i.lastUsedAt||i.createdAt||0)||(r.createdAt||0)-(i.createdAt||0))}n.profilesLoad=function(){const e=[],i=Object.create(null);for(const r of it()){const l=Pe(r);l&&!i[l.id]&&(i[l.id]=1,e.push(l))}return Re(e)},n.profilesSave=function(e){const i=Re(Array.isArray(e)?e.slice(0,qa):[]);try{return window.localStorage?(window.localStorage.setItem(De,JSON.stringify(i)),!0):!1}catch{return!1}};let nt=0;n.profilesNewId=function(){const e=Object.create(null);for(const r of n.profilesLoad())e[r.id]=1;let i;do i=`p${Date.now().toString(36)}${(nt++).toString(36)}`;while(e[i]);return i},n.profilesPut=function(e){const i=Pe(Object.assign({id:n.profilesNewId(),createdAt:Date.now(),lastUsedAt:Date.now()},e));if(!i)return{ok:!1,list:n.profilesLoad()};const r=n.profilesLoad(),l=r.findIndex(o=>o.id===i.id);if(l>=0){const o=r[l];i.createdAt=o.createdAt||i.createdAt,i.lastUsedAt=o.lastUsedAt,i.uses=o.uses,i.pinned=o.pinned,r.splice(l,1,i)}else r.push(i);if(r.length>qa){const o=r.slice().sort((u,m)=>(u.lastUsedAt||u.createdAt)-(m.lastUsedAt||m.createdAt)),c=o.find(u=>u.id!==i.id)||o[0],d=r.indexOf(c);d>=0&&r.splice(d,1)}return n.profilesSave(r)?{ok:!0,list:Re(r),item:i}:{ok:!1,list:n.profilesLoad()}},n.profilesRemove=function(e){const i=n.profilesLoad().filter(r=>r.id!==e);return n.profilesSave(i)?i:n.profilesLoad()},n.profilesPin=function(e){const i=n.profilesLoad().map(r=>r.id===e?Object.assign({},r,{pinned:!r.pinned}):r);return n.profilesSave(i)?Re(i):n.profilesLoad()},n.profilesTouch=function(e){let i=!1;const r=n.profilesLoad().map(l=>l.id!==e?l:(i=!0,Object.assign({},l,{lastUsedAt:Date.now(),uses:(l.uses||0)+1})));return i?n.profilesSave(r)?Re(r):n.profilesLoad():r};const Qe=864e5;function Ca(e){const i=Number(e)||0;if(!i)return"未排过";const r=Math.floor((Date.now()-i)/Qe);if(r<=0)return"今天排过";if(r===1)return"昨天排过";if(r<30)return`${r} 天前排过`;const l=new Date(i);return`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}-${String(l.getDate()).padStart(2,"0")} 排过`}n.profilesAgo=Ca;const Aa={male:"♂",female:"♀"};n.profilesHTML=function(e,i){const r=i||{},l=(Array.isArray(e)?e:[]).map(c=>{const d=Pe(c);if(!d)return"";const u=[d.date,d.hourUnknown?"时辰未知":d.time,d.address].filter(Boolean).join(" "),m=r.editingId&&d.id===r.editingId,f=r.armedDel&&d.id===r.armedDel;return`<div class="mp-prof-card${d.pinned?" pinned":""}${m?" editing":""}" data-id="${t(d.id)}">
        <button type="button" class="mp-prof-use" data-mp-prof="use" data-id="${t(d.id)}"
          title="${t(`用「${d.label||d.kind}」的出生信息直接排盘`)}">
          <span class="mp-prof-nm">${t(d.label||"未命名")}${d.gender?`<i class="sx">${Aa[d.gender]||""}</i>`:""}</span>
          <span class="mp-prof-sys">${t(n.profKindLabel?n.profKindLabel(d.kind):d.kind)}</span>
          <span class="mp-prof-bd">${t(u)}</span>
          <span class="mp-prof-at">${t(Ca(d.lastUsedAt||d.createdAt))}${d.uses?` · ${d.uses} 次`:""}${d.pinned?" · 置顶":""}</span>
        </button>
        <span class="mp-prof-ops">
          <button type="button" data-mp-prof="pin" data-id="${t(d.id)}" class="${d.pinned?"on":""}"
            aria-pressed="${d.pinned?"true":"false"}" title="置顶这张档案">${d.pinned?"已置顶":"置顶"}</button>
          <button type="button" data-mp-prof="edit" data-id="${t(d.id)}" title="把这张档案读回输入框，改完再存">改名</button>
          <button type="button" data-mp-prof="del" data-id="${t(d.id)}" class="${f?"on":""}"
            title="${f?"再点一次就从本机删除这张档案":"从本机删除这张档案（点两次确认）"}">${f?"确认删除":"删除"}</button>
        </span>
      </div>`}).join(""),o=l?`<div class="mp-prof-list">${l}</div>`:'<p class="mp-prof-empty">还没有存过命盘。填好出生信息，给这张盘起个称呼，点「存为我的命盘」——下次进来一点就出盘，不必重报。</p>';return`<section class="mp-prof" aria-label="我的命盘">
      <div class="mp-prof-h"><b>我的命盘</b><span class="mp-prof-sub">只存本机 · 不上传${e&&e.length?` · ${e.length}/${qa}`:""}</span></div>
      ${o}
      ${r.bar||""}
    </section>`},n.profilesBarHTML=function(e){const i=e||{};return`<div class="mp-prof-bar">
        <input class="mp-prof-name" type="text" maxlength="${Na}" placeholder="称呼，如「我」「妈妈」" aria-label="档案称呼" value="${t(i.name||"")}">
        <button type="button" data-mp-prof="put"${i.canAdd===!1?" disabled":""}>${t(i.editingId?"更新这张档案":"存为我的命盘")}</button>
        ${i.editingId?'<button type="button" class="ghost" data-mp-prof="cancel">取消改名</button>':""}
        <span class="mp-prof-tip">${t(i.tip||(i.editingId?"改完出生信息或称呼，点「更新这张档案」覆盖原档。":"存的是出生时间与出生地这些输入，不是结果。"))}</span>
      </div>`},n.profEvent=function(e){let i=e&&e.closest?e.closest("[data-mp-prof]"):null;if(!i)return null;const r=i.getAttribute("data-mp-prof");return i.tagName==="BUTTON"&&i.disabled?null:{action:r,id:i.getAttribute("data-id")||"",name:i}};const st=["bazi","trend"],Ta=["bazi","ziwei","liuyao","meihua","daliuren","qimen","hepan","chenggu","trend","fengshui","name","xiaoliuren"];n.profUsable=function(e){return!e||typeof e!="object"?!1:e.hourUnknown===!0||e.time?!0:Ta.indexOf(String(e.kind||""))<0},n.profFromForm=function(e,i,r){const l=e||{},o=l.hourUnknown===!0&&st.indexOf(String(l.kind||""))>=0;return!o&&!/^([01]?\d|2[0-3]):[0-5]\d$/.test(String(l.time||"").trim())?null:Pe(Object.assign({id:r||n.profilesNewId(),kind:String(l.kind||""),label:String(i||"").trim().slice(0,Na)||(n.profKindLabel?n.profKindLabel(l.kind):String(l.kind||"")),date:String(l.date||""),time:String(l.time||""),hourUnknown:o,gender:String(l.gender||""),address:String(l.address||""),trueSolar:l.trueSolar!==!1,lateZi:l.lateZi!==!1,pinned:!1,createdAt:Date.now(),lastUsedAt:0,uses:0}))},n.traceHTML=function(e,i,r){if(!Array.isArray(e)||!e.length)return"";const l={liuyao:"六爻",bazi:"八字",ziwei:"紫微",qimen:"奇门",daliuren:"大六壬"}[i]||"命盘",o=e.map(m=>m&&m.field).filter(Boolean).join(" → "),c=typeof r=="string"?r:"",d=(m,f)=>{const b=String(m??"");return b.length>f?`${b.slice(0,f)}…`:b},u=e.map((m,f)=>{const b=Array.isArray(m.inputs)?m.inputs:[];return`<details class="mp-trace-step"${f===0?" open":""}>
        <summary><span class="mp-trace-no">${f+1}</span><span class="mp-trace-field">${t(m.field)}</span><span class="mp-trace-res">${t(d(m.result,44))}</span></summary>
        <div class="mp-trace-detail">
          <div class="mp-trace-rule"><b>规则</b>${t(m.rule)}</div>
          ${b.length?`<dl class="mp-trace-inputs">${b.map(C=>`<dt>${t(C.label)}</dt><dd>${t(C.value)}</dd>`).join("")}</dl>`:""}
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
            ${c?'<button type="button" class="mp-trace-copy" data-trace-copy aria-label="复制整条推导链的 Markdown">复制 Markdown</button>':""}
            <button type="button" class="mp-trace-close" data-trace-close aria-label="关闭推导链">✕</button>
          </div>
          <div class="mp-trace-body">${u}</div>
          ${c?`<textarea class="mp-trace-md" data-trace-md readonly hidden>${t(c)}</textarea>`:""}
        </aside>
      </div>`},n.almanacHTML=function(e){if(!e||!e.meta)return n.quickHTML(e);const i=e.ganzhi||{},r=e.dayGod||null,l=(T,k)=>(T||[]).map(E=>`<span class="mp-al-chip${k?` ${k}`:""}">${t(E)}</span>`).join(""),o=(T,k)=>k?`<div class="mp-al-cell"><em>${t(T)}</em><b>${t(k)}</b></div>`:"",c=e.xiu?`${e.xiu.name}宿（${e.xiu.luck}·${e.xiu.zheng}·${e.xiu.animal}）`:"",d=e.nayin&&e.nayin.day?e.nayin.day.name:"",u=e.chong?`${e.chong.text}${e.chong.sha?` ${e.chong.sha}`:""}`:"",m=(e.hours||[]).map(T=>`<span class="mp-al-hour ${T.luck==="吉"?"good":"bad"}"><i>${t(T.zhi)}</i><em>${t((T.ganZhi||"").slice(0,1))}</em><b>${t(T.shen||"")}</b><u>${t(T.luck||"")}</u></span>`).join(""),f=e.positions||{},b=(T,k)=>k?`<span class="mp-al-chip">${t(T)}·${t(typeof k=="string"?k:k.dir||"")}</span>`:"",C=e.lucky||{},S=r?`<span class="mp-al-badge ${r.luck==="吉"?"good":"bad"}">${t(r.name)}·${t(r.type)}·${t(r.luck)}</span>`:"";return`<section class="mp-al" aria-label="黄历">
      <div class="mp-al-h"><b>${t(e.meta.date||"")}</b><i>${t(e.meta.weekday||"")}　${t((e.lunar||{}).text||"")}</i></div>
      <div class="mp-al-gz">${t(i.year||"")}年　${t(i.month||"")}月　${t(i.day||"")}日　属${t(i.shengXiao||"")}　建除 ${t(e.zhiXing||"")}日　${S}</div>
      <div class="mp-al-yiji">
        <div class="mp-al-col"><em>宜</em><div class="mp-al-chips">${l(e.yi)}</div></div>
        <div class="mp-al-col"><em>忌</em><div class="mp-al-chips">${l(e.ji)}</div></div>
      </div>
      <div class="mp-al-grid">${o("二十八宿",c)}${o("日柱纳音",d)}${o("胎神",e.taiShen)}${o("冲煞",u)}</div>
      <div class="mp-al-row"><em>吉神方位</em><div class="mp-al-chips">${b("喜神",f.xiShen)}${b("财神",f.caiShen)}${b("福神",f.fuShen)}${b("阳贵",f.yangGui)}${b("阴贵",f.yinGui)}</div></div>
      <div class="mp-al-row"><em>时刻吉凶</em><div class="mp-al-hours">${m}</div></div>
      <div class="mp-al-row"><em>吉配生肖</em><div class="mp-al-chips">${C.liuhe?`<span class="mp-al-chip">六合·${t(C.liuhe)}</span>`:""}${l(C.sanhe||[])}</div></div>
      ${e.dailyHexagram?`<div class="mp-al-hex">每日一卦：<b>${t(e.dailyHexagram.name)}</b>　${t(e.dailyHexagram.meaning||"")}</div>`:""}
      <div class="mp-al-note">${t(e.meta&&e.meta.scope||"")}</div>
    </section>`},n.mbtiHTML=function(e){if(!e)return"";if(e.needAnswers&&Array.isArray(e.questions)){const o=e.questions.map(c=>`<li>${t(c.text)}</li>`).join("");return`<section class="mp-mb-paper" aria-label="十六型人格问卷">
        <div class="mp-mb-h">
          <span class="mp-mb-meta"><b>十六型人格问卷</b><i>${e.total} 题 · 每题 1 完全不像 / 5 很像我</i></span>
          <span class="mp-mb-count">填完分数再看结果</span>
        </div>
        <ol>${o}</ol>
        <div class="mp-mb-note">${t(e.note||"")}</div>
      </section>`}const i=(e.dims||[]).map(o=>{const c=Math.round((o.pct||0)*100),d=o.picked===o.left,u=Math.max(2,c),m=d?o.leftSay:o.rightSay;return`<div class="mp-mb-dim">
        <div class="mp-mb-dh"><b class="${d?"on":""}">${t(o.left)}</b><em>${t(o.name)}</em><b class="${d?"":"on"}">${t(o.right)}</b></div>
        <div class="mp-mb-bar ${d?"l":"r"}"><em style="width:${u}%"></em></div>
        <div class="mp-mb-df">取 ${t(o.picked)} · ${t(o.strength)} ${c}%</div>
        <div class="mp-mb-ds">${t(m)}</div>
      </div>`}).join(""),r=e.profile||{},l=(r.stack||[]).map((o,c)=>`<span class="${c===0?"lead":""}"><b>${t(o.code)}</b>${t(o.say)}</span>`).join("");return`<section class="mp-mb" aria-label="十六型人格结果">
      <div class="mp-mb-h">
        <span class="mp-mb-code">${t(e.type||"")}</span>
        <span class="mp-mb-meta"><b>${t(r.title||"")}</b><i>${t(r.keywords||"")}</i></span>
        <span class="mp-mb-count">已答 ${e.answered||0}/${e.total||0} 题</span>
      </div>
      <div class="mp-mb-body">
        <div class="mp-mb-dims">${i}</div>
        <div class="mp-mb-sec"><em>一句</em>${t(r.oneLine||"")}</div>
        <div class="mp-mb-two">
          <div><b>优势</b>${(r.strengths||[]).map(o=>t(o)).join("；")}</div>
          <div><b>留意</b>${(r.blindspots||[]).map(o=>t(o)).join("；")}</div>
        </div>
        ${l?`<div class="mp-mb-sec"><em>认知功能</em>主导 ${t((r.stack[0]||{}).code||"")} → 依次展开</div><div class="mp-mb-fn">${l}</div>`:""}
        <div class="mp-mb-sec"><em>工作</em>${t(r.work||"")}</div>
        <div class="mp-mb-sec"><em>关系</em>${t(r.love||"")}</div>
        <div class="mp-mb-sec"><em>学习</em>${t(r.study||"")}</div>
        <div class="mp-mb-sec"><em>课题</em>${t(r.growth||"")}</div>
      </div>
      <div class="mp-mb-note">${t(e.note||"")}</div>
    </section>`};const Ra=[["巽","离","坤"],["震","中","兑"],["艮","坎","乾"]],ea={坎:"正北",艮:"东北",震:"正东",巽:"东南",离:"正南",坤:"西南",兑:"正西",乾:"西北",中:"中宫"},ot=["生气","延年","天医","伏位"],ke=(e,i)=>`<span class="mp-fs-chip${i?" "+i:""}">${t(e)}</span>`,ma=(e,i,r)=>`<div class="mp-fs-cell${e==="中"?" center":""}"><div class="mp-fs-top"><span class="mp-fs-gua">${t(e)}</span><span class="mp-fs-dir">${t(ea[e]||"")}</span>${i||""}</div>`+(r||"")+"</div>",Te=e=>e.length?`<dl class="mp-fs-facts">${e.map(([i,r])=>`<div class="mp-fs-row"><dt>${t(i)}</dt><dd>${t(r)}</dd></div>`).join("")}</dl>`:"",ua=(e,i,r,l,o,c)=>`<section class="mp-quick mp-fs" aria-label="风水结果"><div class="mp-quick-h"><b>${t(e)}</b>${i?`<span class="mp-fs-sub">${t(i)}</span>`:""}</div>`+(r.length?`<div class="mp-fs-chips">${r.join("")}</div>`:"")+l+o+c.filter(Boolean).map(d=>`<div class="mp-fs-note">${t(d)}</div>`).join("")+"</section>",aa=(e,i)=>`<div class="mp-fs-grid" role="group" aria-label="${t(i)}">`+Ra.map(r=>r.map(l=>{const o=e.find(u=>u&&u.palace===l);if(!o)return ma(l,"","");const c=ot.includes(o.star),d=`<span class="mp-fs-star"${o.role?` title="${t(o.role)}"`:""}>${t(o.star)}<em class="${c?"ok":"bad"}">${c?"吉":"凶"}</em></span>`;return ma(l,d,"")}).join("")).join("")+"</div>";function rt(e,i){const r=i.period,l={};for(const S of e.palaces||[])l[S.palace]=S;const o=`<div class="mp-fs-key">每宫依次为 <b>运</b>／<b>山</b>／<b>向</b> 三星；底色高亮＝当运（${t(r)}运）</div><div class="mp-fs-grid" role="group" aria-label="玄空九宫（运/山/向）">`+Ra.map(S=>S.map(T=>{const k=l[T];if(!k)return ma(T,"","");const E=[["运",k.yun],["山",k.shan],["向",k.xiang]].map(([J,R])=>`<span class="${R===r?"on":""}" title="${t(J)}星 ${t(R)}">${t(R)}</span>`).join("");return ma(T,"",`<div class="mp-fs-nums">${E}</div>`)}).join("")).join("")+"</div>",c=e.wangShanWangXiang||{},d=i.jianXiang||{},u=e.timeFlying||null,m=[ke(d.active?`兼${d.jian} ${d.offset}° · 替卦`:"正向 · 下卦",d.active?"ok":""),ke(`山盘 ${i.shanCenter.star}${i.shanCenter.name} · ${i.shanCenter.fly}`),ke(`向盘 ${i.xiangCenter.star}${i.xiangCenter.name} · ${i.xiangCenter.fly}`),ke(c.byChart?"盘面：到山到向":"盘面：未到山到向",c.byChart?"ok":""),ke(c.byTable===null?"表法：替卦不套":c.byTable?"表法：在列":"表法：未列",c.byTable?"ok":"")],f=(S,T)=>`${T} ${S.star}${S.name}（${S.fly}，${S.basis}${S.mode==="替卦"?`；原运星 ${S.original}${S.replaced?"，已替":"，用替而未替"}`:""}）`,b=u?[["year","年"],["month","月"],["day","日"],["hour","时"]].filter(([S])=>u[S]).map(([S,T])=>`${T}${u[S].centerName}（${u[S].fly}）`).join("　"):"",C=Te([...d.active?[["替卦",`${d.note}${c.byTable===null?" 正向旺山旺向表不适用于替卦。":""}`]]:[],["入中",`${f(i.shanCenter,"山盘")}；${f(i.xiangCenter,"向盘")}`],["当运",`山星${r}落 ${e.dangYun.shan.text}；向星${r}落 ${e.dangYun.xiang.text}`],["合十",`山星：${(e.heshi.shan||[]).join("、")||"无"}；向星：${(e.heshi.xiang||[]).join("、")||"无"}`],["表法",`${c.note||""}${(c.table||[]).length?` 本运所列：${c.table.join("、")}。`:" 本运表法无局。"}`],...b?[["年月日时",`${b}${u.meta&&u.meta.note?`　${u.meta.note}`:""}`]]:[]]);return ua(d.active?"玄空替卦":"玄空下卦",`${i.periodLabel} · 坐${i.sitting} · 向${i.facing}`,m,o,C,[i.note,e.disclaimer])}function La(e,i){const r=e.mingGua||{},l=aa([...e.luckyDirections||[],...e.unluckyDirections||[]],"八宅八向（吉凶）"),o=[ke(r.compatible||"—"),ke(`${i.gender}命 · ${i.guaYear} 年立春界`)],c=[];if(e.yearlyFlying){const d=e.yearlyFlying;c.push(["年紫白",`${d.centerName}入中；${d.palaces.filter(u=>u.palace!=="中").map(u=>`${u.palace}${u.name}`).join("、")}`])}return ua("八宅命卦",`${r.num}${r.gua}（${r.group}）· ${r.direction}`,o,l,Te(c),[i.note,e.disclaimer])}function pt(e,i){const r=e.layout||{},l=aa(e.houseStars||[],"宅卦八向（吉凶）"),o=[ke(`${i.houseGua}宅 · ${i.houseGroup}`),ke(`坐${i.sitting}`),ke(`向${i.facing}`)],c=[["门",r.door],["灶",r.stove],["床",r.bed],["厕",r.toilet]];return e.mingMatch&&c.push(["命宅配",e.mingMatch.text]),ua("门主灶",`${i.houseGua}宅 · 坐${i.sitting} · 向${i.facing}`,o,l,Te(c),[i.birthNote,e.disclaimer])}n.fengshuiHTML=function(e){if(!e||e.system!=="fengshui")return n.quickHTML(e);const i=e.meta||{};return i.action==="xuankong"?rt(e,i):i.action==="advise"?pt(e,i):La(e,i)},n.perfHTML=function(e){if(!e)return"";const i=u=>typeof u=="number"&&isFinite(u)?`${Math.max(0,Math.round(u))}ms`:"",r=e.cached===!0?"（已缓存）":e.cached===!1?"（首次加载）":"",l=[];i(e.engineMs)&&l.push(`引擎 ${i(e.engineMs)}${r}`),i(e.computeMs)&&l.push(`排盘 ${i(e.computeMs)}`),i(e.renderMs)&&l.push(`渲染 ${i(e.renderMs)}`);const o=i(e.totalMs);if(!l.length&&!o)return"";const c=o?`首屏 ${o}`:"耗时";return`<div class="mp-perf" title="本机这一次的实测耗时，不含网络与服务端；换机器、首次加载与已缓存会不同">${l.length?`${c}｜${l.join(" · ")}`:c}</div>`},n.zeriHTML=function(e){if(!e||!e.compare||e.compare.mode!=="candidates"||!Array.isArray(e.days))return n.quickHTML(e);const i=e.meta||{},r=e.shenshaRef||{},l=e.compare.best?e.compare.best.date:"",o=e.days.map(u=>{const m=u.date===l,f=u.excluded||u.verdict==="回避"?"bad":u.verdict==="推荐"?"good":"",b=u.grade||{},C=b.label?`<b>${t(b.label)}</b><em>吉${t(b.ji)} / 凶${t(b.xiong)}　${t(b.decision||"")}</em>`:"—";return`<tr class="mp-zr-row${m?" top":""}${u.excluded?" off":""}">
        <th scope="row"><b>${t(u.date)}</b>${m?'<i class="mp-zr-best">最优</i>':""}
          <em>${t(u.weekday)}　${t(u.lunar)}</em></th>
        <td><b>${t(u.dayGanZhi)}</b><em>${t(u.zhiXing)}日</em></td>
        <td class="mp-zr-score">${t(u.score)}</td>
        <td class="mp-zr-grade">${C}</td>
        <td><span class="mp-zr-v ${f}">${t(u.verdict)}</span></td>
        <td class="mp-zr-why">${t(u.reasons.join("；")||"无特别加减分")}</td>
      </tr>`}).join(""),c=(u,m)=>`<span><em>${t(u)}</em>${m.length?t(m.join("、")):"无"}</span>`,d=e.compare.best?`这一组最优：<b>${t(e.compare.best.date)}</b>（${t(e.compare.best.score)} 分 · ${t(e.compare.best.verdict)}）`+(e.compare.best.ties.length>1?`；同分 ${t(e.compare.best.ties.filter(u=>u!==e.compare.best.date).join("、"))}`:""):"这一组都因冲属相被排除，没有可用的日子";return`<section class="mp-zr" aria-label="择日候选比较">
      <div class="mp-zr-h"><b>择日 · ${t(i.task||"")}</b>
        <span>候选 ${t(i.days)} 天${i.shengXiao?`　当事人属${t(i.shengXiao)}`:"（未给属相，未做冲煞排除）"}</span></div>
      <div class="mp-zr-lead">${d}</div>
      <table class="mp-zr-t"><thead><tr>
        <th scope="col">日期</th><th scope="col">日干支 / 建除</th><th scope="col">分</th><th scope="col">卷十等第</th><th scope="col">结论</th><th scope="col">理由</th>
      </tr></thead><tbody>${o}</tbody></table>
      <div class="mp-zr-lists">
        ${c("推荐",e.best)}${c("可用",e.usable)}${c("回避",e.avoid)}
      </div>
      <p class="mp-zr-note">${t(e.compare.note||"")}</p>
      ${r.text?`<p class="mp-zr-note">神煞依据：${t(r.text)}（${t(r.edition||"")}）；起法 ${t((r.volumes||[]).join("、"))}。未实现起法：${t((r.unsupported||[]).join("、"))}（不计分）。</p>`:""}
      ${r.juan10?`<p class="mp-zr-note">卷十依据：${t(r.juan10.text)}（${t(r.juan10.corpusLines||"")}）；${t(r.juan10.thresholdsNote||"")}${t(r.juan10.note||"")}</p>`:""}
      <p class="mp-zr-note">${t(i.scope||"")}</p>
      <p class="mp-zr-note">${t(e.disclaimer||"")}</p>
    </section>`},n.quickHTML=function(e){if(!e)return"";const r={almanac:"黄历",zeri:"择日",chenggu:"称骨",xiaoliuren:"小六壬",star:"星座",numerology:"生命数字",trend:"人生 K 线",fengshui:"风水",name:"起名",convert:"公农历转换",mbti:"十六型人格"}[e.system]||"速查",l=e.summary||"",o=l?`<pre class="mp-quick-pre">${t(l)}</pre>`:"";return`<section class="mp-quick" aria-label="${t(r)}结果">
      <div class="mp-quick-h"><b>${t(r)}</b></div>
      ${o}
    </section>`},n.summaryCardPNG=function(e,i){try{if(typeof document>"u"||!document.createElement)return"";const r=i&&i.outline||[],l=(i&&i.tables||[]).filter(te=>Array.isArray(te.rows)&&te.rows.length),o=i&&i.systemLabel||e&&e.system||"命理报告",c=900,d=44,u=26,m=(te,F)=>`${F?"600 ":""}${te}px "PingFang SC","Microsoft YaHei","Noto Sans CJK SC",sans-serif`,f=document.createElement("canvas"),b=f.getContext?f.getContext("2d"):null;if(!b)return"";const C=(te,F)=>{const ee=[];let $="";for(const ce of String(te)){const z=$+ce;b.measureText(z).width>F&&$?(ee.push($),$=ce):$=z}return $&&ee.push($),ee.length?ee:[""]};b.font=m(15);let S=0;const T=r.map(te=>{const F=C(te.text,c-d*2-70);return S+=Math.min(F.length,2)*u+10,{o:te,lines:F.slice(0,2)}}),k=l[0]||null,E=k?k.rows.slice(0,6):[],J=k?54+E.length*34:0,R=150+S+(T.length?34:0)+J+120;f.width=c,f.height=R,b.fillStyle="rgb(255,255,255)",b.fillRect(0,0,c,R),b.fillStyle="rgb(31,111,63)",b.fillRect(0,0,c,8);let w=52;b.fillStyle="rgb(27,27,27)",b.font=m(28,!0),b.fillText(`${o} · 摘要`,d,w),w+=30,b.fillStyle="rgb(111,106,96)",b.font=m(14);const j=[e&&e.input&&e.input.datetime?`出生/起局：${e.input.datetime}`:"","本地计算 · 可复现"].filter(Boolean).join("　");if(b.fillText(j,d,w),w+=34,T.length){b.fillStyle="rgb(31,111,63)",b.font=m(16,!0),b.fillText("一页读懂",d,w),w+=26;for(const{o:te,lines:F}of T)b.fillStyle="rgb(138,131,120)",b.font=m(14,!0),b.fillText(te.label,d,w),b.fillStyle="rgb(63,58,51)",b.font=m(15),F.forEach((ee,$)=>b.fillText(ee,d+70,w+$*u)),w+=F.length*u+10;w+=8}if(k){b.fillStyle="rgb(31,111,63)",b.font=m(16,!0),b.fillText(k.title,d,w),w+=24,b.fillStyle="rgb(138,131,120)",b.font=m(13),b.fillText(k.columns.join(" · "),d,w),w+=8,b.strokeStyle="rgb(229,225,216)",b.beginPath(),b.moveTo(d,w),b.lineTo(c-d,w),b.stroke(),w+=22,b.fillStyle="rgb(63,58,51)",b.font=m(14);for(const te of E){const F=te.filter(Boolean).join(" · "),ee=C(F,c-d*2)[0];b.fillText(ee,d,w),w+=34}}return w=R-62,b.strokeStyle="rgb(229,225,216)",b.beginPath(),b.moveTo(d,w-18),b.lineTo(c-d,w-18),b.stroke(),b.fillStyle="rgb(138,131,120)",b.font=m(12),b.fillText("内容用于传统文化学习与自我探索，不构成医疗、投资、法律或人事决策依据。",d,w+6),b.fillText("dsh-metaphysics · 本机计算，未上传任何数据",d,w+26),f.toDataURL?f.toDataURL("image/png"):""}catch{return""}}})();const Dt="dsh-metaphysics/history-v1";function Di(){try{const s=window.localStorage&&window.localStorage.getItem(Dt),n=s?JSON.parse(s):[];return Array.isArray(n)?n.filter(q=>q&&typeof q=="object"&&typeof q.kind=="string").slice(0,20):[]}catch{return[]}}function Pt(s){try{window.localStorage&&window.localStorage.setItem(Dt,JSON.stringify(s.slice(0,20)))}catch{}}const Pi=(s,n)=>s.kind===n.kind&&s.date===n.date&&s.time===n.time&&s.gender===n.gender&&!!s.hourUnknown==!!n.hourUnknown&&s.trueSolar!==!1==(n.trueSolar!==!1)&&s.lateZi!==!1==(n.lateZi!==!1)&&s.address===n.address&&s.lines===n.lines&&s.question===n.question&&s.mhMode===n.mhMode&&s.upper===n.upper&&s.lower===n.lower&&s.direction===n.direction&&s.count===n.count&&s.changing===n.changing&&(s.kind!=="qimen"||s.qimenRule===n.qimenRule&&s.qLateZi===n.qLateZi)&&(s.kind!=="zeri"||s.task===n.task&&s.days===n.days&&s.shengXiao===n.shengXiao&&s.zCand===n.zCand)&&(s.kind!=="xiaoliuren"||s.xlrMode===n.xlrMode&&s.num1===n.num1&&s.num2===n.num2&&s.num3===n.num3)&&(s.kind!=="trend"||s.toAge===n.toAge)&&(s.kind!=="fengshui"||s.fsMode===n.fsMode&&s.fsPeriod===n.fsPeriod&&s.sitting===n.sitting&&s.facing===n.facing)&&(s.kind!=="name"||s.nnMode===n.nnMode&&s.surname===n.surname&&s.givenName===n.givenName&&s.limitN===n.limitN)&&(s.kind!=="convert"||s.convMode===n.convMode&&s.lunarDate===n.lunarDate&&!!s.leapMonth==!!n.leapMonth)&&(s.kind!=="hepan"||s.hpChart===n.hpChart&&s.partnerDate===n.partnerDate&&s.partnerTime===n.partnerTime&&s.partnerGender===n.partnerGender&&s.partnerAddress===n.partnerAddress&&!!s.thirdOn==!!n.thirdOn&&s.p2Date===n.p2Date&&s.p2Time===n.p2Time&&s.p2Gender===n.p2Gender&&s.p2Address===n.p2Address);function Ri(s,n){if(s==="bazi"){const D=["year","month","day","hour"].map(X=>n.pillars&&n.pillars[X]).filter(Boolean).map(X=>X.ganzhi).join(" ");return n.hourUnknown||n.pillars&&!n.pillars.hour?`${D}（时柱暂缺）`:D}return s==="ziwei"?`${n.soul?n.soul.branch:""}宫 ${n.bureau?n.bureau.name:""} ${n.lunar?n.lunar.year+"年":""}`.trim():s==="liuyao"?n.ben&&n.ben.name?n.ben.name:"":s==="meihua"?n.ben&&n.ben.name?`${n.ben.name} 动${n.moving}`:"":s==="daliuren"?`${n.dayGanZhi||""} ${n.geJu?n.geJu.name:""}`:""}const G=window.__PP,Ha=()=>typeof performance<"u"&&performance.now?performance.now():Date.now();let Be=0;const $t=typeof window.__mpEnsureEngine=="function"?window.__mpEnsureEngine:async()=>window.Engine,Ii=`
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
`,{useState:M,useEffect:$a,useRef:Gi}=_a,Rt=s=>String(s).padStart(2,"0");function Bi(s){const n=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s||""));if(!n)return!1;const q=Number(n[1]),D=Number(n[2]),X=Number(n[3]);if(D<1||D>12||X<1)return!1;const le=[31,q%4===0&&q%100!==0||q%400===0?29:28,31,30,31,30,31,31,30,31,30,31];return X<=le[D-1]}function It(s){const n=/^(\d{4})\s*[年./-]\s*(\d{1,2})\s*[月./-]\s*(\d{1,2})\s*日?$/.exec(String(s||"").trim());if(!n)return"";const q=`${n[1]}-${Rt(n[2])}-${Rt(n[3])}`;return Bi(q)?q:""}function Zi(s){const n=String(s||"").trim();if(/^\d{0,4}(-\d{0,2}){0,2}$/.test(n))return n;if(/[年月日/.]/.test(n)){const D=It(n);if(D)return D}const q=n.replace(/\D/g,"").slice(0,8);return q.length<=4?q:q.length<=6?`${q.slice(0,4)}-${q.slice(4)}`:`${q.slice(0,4)}-${q.slice(4,6)}-${q.slice(6)}`}function wt(s){const n=s.value||"",[q,D]=M(n),X=Gi(n);$a(()=>{X.current=n,D(n)},[n]);const ie=()=>{const le=q.trim();if(!le){D(X.current),s.onInvalid&&s.onInvalid("");return}const se=It(le);if(se){X.current=se,D(se),se!==n&&s.onChange(se);return}D(X.current),s.onInvalid&&s.onInvalid(le)};return p("input",{className:"mp-input",type:"text",inputMode:"numeric",autoComplete:"off",placeholder:"年-月-日，如 1990-05-12",value:q,onChange:le=>{D(Zi(le.target.value))},onBlur:ie,onKeyDown:le=>{le.key==="Enter"&&(le.preventDefault(),ie())}})}const Va=4,Xe=12;let Xa=null;function Wa(){if(Xa)return Xa;let s=null;try{s=B.compute({system:"mbti"})}catch{s=null}const n=s&&s.questions||[];return n.length?(Xa={total:s&&s.total||n.length,questions:n,scale:s&&s.scale||{}},Xa):{total:0,questions:[],scale:{}}}function Ui(s){const{answers:n,page:q,onPick:D,onPage:X,onSubmit:ie,onClear:le}=s,se=Wa(),ve=Math.max(1,Math.ceil(se.total/Va)),t=q*Va,we=se.questions.slice(t,t+Va),O=n.filter(Z=>Z!=null).length,fe=se.total?Math.round(O/se.total*100):0,he=q>=ve-1,I=O>=Xe;return p("div",{className:"mp-quiz"},p("div",{className:"mp-quiz-top"},p("div",{className:"mp-quiz-bar","aria-hidden":"true"},p("i",{style:{width:fe+"%"}})),p("span",{className:"mp-quiz-count"},`第 ${q+1} / ${ve} 页 · 已答 ${O} / ${se.total}`)),p("div",{className:"mp-quiz-list"},we.map((Z,Y)=>{const K=t+Y;return p("div",{key:Z.id||K,className:"mp-quiz-q"},p("div",{className:"mp-quiz-qt"},p("b",null,String(K+1).padStart(2,"0")),p("span",null,Z.text)),p("div",{className:"mp-quiz-opts",role:"radiogroup","aria-label":`第 ${K+1} 题`},[1,2,3,4,5].map(oe=>p("label",{key:oe,className:"mp-quiz-o"+(n[K]===oe?" on":"")},p("input",{type:"radio",name:`mpmbq${K}`,value:String(oe),checked:n[K]===oe,onChange:()=>D(K,oe)}),p("b",null,String(oe)),p("span",null,se.scale[oe]||"")))))})),p("div",{className:"mp-quiz-nav"},p("button",{className:"mp-quiz-btn",disabled:q<=0,onClick:()=>X(-1)},"上一页"),he?null:p("button",{className:"mp-quiz-btn",onClick:()=>X(1)},"下一页"),p("button",{className:"mp-quiz-btn primary",disabled:!I,onClick:ie},"看结果"),p("button",{className:"mp-quiz-btn",onClick:le},"清空"),p("span",{className:"mp-quiz-hint"},I?`已够 ${Xe} 题，可以看结果；答完 ${se.total} 题会更准。`:`答满 ${Xe} 题可先看结果（还差 ${Xe-O} 题）。`)))}class Ki extends(_a.Component||Object){constructor(n){super(n),this.state={err:null}}static getDerivedStateFromError(n){return{err:n}}componentDidCatch(n,q){console.error("[metaphysics] 面板渲染异常",n,q)}render(){if(!this.state.err)return this.props.children;const n=this.state.err,q=String(n&&n.stack||"").split(`
`).slice(0,14).join(`
`);return p("div",{className:"mp-wrap"},p("div",{className:"mp-panel"},p("div",{className:"mp-lbl"},"命理面板渲染出错——把下面这段发给我"),p("pre",{style:{whiteSpace:"pre-wrap",fontSize:12,lineHeight:1.5,maxHeight:320,overflow:"auto",margin:"8px 0"}},String(n&&n.message||n)+`

`+q),p("div",{className:"mp-lbl"},"环境：__PP "+typeof G+" · Engine "+typeof window.Engine+" · React "+typeof _a+" · 版本 "+(typeof G=="object"&&G&&(window.__MP_VER||"?"))+((window.__MP_UNRELEASED||[]).length?" · 未发版改动 "+window.__MP_UNRELEASED.length+" 项":""))))}}function Yi(s){const n=s&&s.size?s.size:20,q=s&&s.active;return p("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.6,strokeLinecap:"round","aria-hidden":!0,style:{opacity:q?1:.72}},p("circle",{cx:12,cy:12,r:8.2}),p("path",{d:"M12 3.8a4.1 4.1 0 0 1 0 8.2 4.1 4.1 0 0 0 0 8.2"}),p("circle",{cx:12,cy:8,r:1.1,fill:"currentColor",stroke:"none"}),p("circle",{cx:12,cy:16,r:1.1,fill:"currentColor",stroke:"none"}))}const He=[{k:"ziwei",label:"紫微",timeLabel:"出生时刻",hint:"紫微斗数需要出生日期、时刻与性别；出生地只影响真太阳时修正。"},{k:"bazi",label:"八字",timeLabel:"出生时刻",hint:"四柱八字按节气与真太阳时定时柱，出生地越准，时柱越稳。"},{k:"liuyao",label:"六爻",timeLabel:"起卦时刻",hint:"六爻不需要出生时间：只用起卦当下的日辰定六神、月建定旺衰，卦由摇出。"},{k:"meihua",label:"梅花",timeLabel:"起卦时刻",hint:"梅花用起卦时刻的年月日时数成卦，也可直接给两个数字起卦；与出生时间无关。"},{k:"daliuren",label:"六壬",timeLabel:"起卦时刻",hint:"大六壬用起卦时刻的日干支、时支与月将起天地盘；同样与出生时间无关。"},{k:"qimen",label:"奇门",timeLabel:"起局时刻",hint:"奇门时家转盘：用起局时刻定节气、三元与局数；换局规则决定符头与节气如何对齐。"},{k:"hepan",label:"合盘",timeLabel:"你的出生时刻",hint:"合盘按「日主 + 夫妻宫 + 五行互补」看两个人的相处与互补，需要双方出生信息。"},{k:"tarot",label:"塔罗",timeLabel:"",hint:"塔罗不看时间，只记录抽牌时刻与你的提问。"},{k:"almanac",label:"黄历",timeLabel:"",hint:"黄历按公历日期查农历、干支、宜忌、时辰吉凶、二十八宿与吉神方位；只做本地计算。"},{k:"convert",label:"农历",timeLabel:"",hint:"公农历互转：公历生日可反查农历；只知道农历生日时，可转成公历再排盘。"},{k:"zeri",label:"择日",timeLabel:"",hint:"择日把区间内每天的建除宜忌与事项适配打分排序，并按属相排除冲煞日。"},{k:"chenggu",label:"称骨",timeLabel:"出生时刻",hint:"称骨按农历年、月、日、时的骨重求和；时辰必填。"},{k:"xiaoliuren",label:"小六壬",timeLabel:"起课时刻",hint:"小六壬用农历月/日/时掐指，也可用三个随机数起课。"},{k:"star",label:"星座",timeLabel:"",hint:"星座按公历日期给出太阳星座与当日基调；同日同星座结果固定。"},{k:"numerology",label:"生命数字",timeLabel:"",hint:"生命数字按公历生日归约出生命路径数、生日数与态度数。"},{k:"mbti",label:"人格",timeLabel:"",hint:"十六型人格是 24 道自我报告题的 MBTI 风格测算：4 题一页，按 1–5 打分，答满 12 题即可看结果；只作自我参照，不是官方量表。"},{k:"trend",label:"人生K线",timeLabel:"出生时刻",hint:"人生 K 线按大运与流年十神给逐年运势分，画成走势图。"},{k:"fengshui",label:"风水",timeLabel:"",hint:"风水看八宅命卦、大游年四吉四凶与流年九宫飞星；也可按坐向看门主灶倾向，或按运与坐向排玄空下卦盘。"},{k:"name",label:"起名",timeLabel:"",hint:"起名按八字喜用匹配字库五行，可评估现有名字或生成候选名。"}];function wa(s){return String(s).padStart(2,"0")}const kt=["almanac","convert","zeri","chenggu","xiaoliuren","star","numerology","trend","fengshui","name"],Vi=Array.isArray(window.__MPGroups)?window.__MPGroups:[],Gt="mp.recent.tabs",Bt="mp.first.view",Zt=3;function Ut(s){try{return JSON.parse(window.localStorage.getItem(s)||"null")}catch{return null}}function Kt(s,n){try{window.localStorage.setItem(s,JSON.stringify(n))}catch{}}function Xi(s){const n=new Date(s);if(Number.isNaN(n.getTime()))return"";const q=X=>new Date(X.getFullYear(),X.getMonth(),X.getDate()).getTime(),D=Math.round((q(new Date)-q(n))/864e5);return D<=0?"今天":D===1?"昨天":`${wa(n.getMonth()+1)}-${wa(n.getDate())}`}function zt(){const s=new Date;return{date:`${s.getFullYear()}-${wa(s.getMonth()+1)}-${wa(s.getDate())}`,time:`${wa(s.getHours())}:${wa(s.getMinutes())}`}}const Wi={ziwei:"birth",bazi:"birth",hepan:"birth",liuyao:"cast",meihua:"cast",daliuren:"cast",qimen:"cast",tarot:"none",almanac:"date",zeri:"date",star:"date",numerology:"date",convert:"date",chenggu:"birth",trend:"birth",fengshui:"birth",name:"birth",xiaoliuren:"cast",mbti:"none"},Yt={date:"1990-05-12",time:"14:30"},ka=s=>Wi[s]||"none",Me=window.__MPCore||{},Ze=Me.needAsk||(s=>!1),V={ref:null,seats:[],seatOk:{},seatDisposers:[],contribution:"",keys:"",injectType:"",spec:"",errs:[],regs:0,mounted:0},ia={r:null,q:"",it:null};let We="";function Vt(){const s=[];return s.push("inputActions "+(V.ref?"已拿到":"未拿到")),s.push("渲染 "+V.mounted+" 次"),s.push("注册 "+V.regs+" 次"),s.push("inject "+(V.injectType||"?")),s.push("槽位 "+(V.spec||"?")),V.contribution&&s.push("贡献 "+V.contribution),V.errs.length&&s.push("错误："+V.errs.join(" / ")),"桥自检："+s.join("；")}function Xt(s){if(V.errs.length>=3)return;const n=s&&s.message?String(s.message):String(s);V.errs.push(n.slice(0,90))}function Ji(s){if(!s)return null;const n=s.inputActions;if(n&&typeof n.setDraft=="function"&&typeof n.submit=="function")return n;const q=s.actions&&s.actions.input;return q&&typeof q.setDraft=="function"&&typeof q.submit=="function"?q:null}function Wt(s,n){const q=Ji(s);return $a(()=>{if(V.seats.indexOf(n)<0&&V.seats.push(n),V.keys=s?Object.keys(s).join(","):"",q){V.ref=q;try{window.__MPComposer=q}catch{}}return()=>{V.ref===q&&(V.ref=null)}},[q,n]),q}function Qi(){const s=ia.r;if(!s)return"";try{const n=B.askPrompt?B.askPrompt(s,{question:ia.q,interpret:ia.it}):null;return n&&n.text||String(s.summary||"")}catch{return String(s.summary||"")}}function Jt(s){return V.mounted+=1,Wt(s,"input.right")?p("button",{type:"button",className:"mp-chip ok",title:ia.r?"把上一张盘的摘要和问题发进对话窗":"先在侧栏「命理」里排一张盘",onClick:()=>{const q=Qi();q&&ei(q)}},"命理·问"):p("span",{className:"mp-chip warn",title:"命理：已占住输入框槽位，但没拿到 inputActions；把这句话告诉作者"},"命理·未就绪")}function Qt(s){return V.mounted+=1,Wt(s,"composer.dock"),null}function ei(s){let n=V.ref;if(!n)try{n=window.__MPComposer||null}catch{n=null}return!n||typeof n.setDraft!="function"||typeof n.submit!="function"?!1:(n.setDraft(s),n.submit(),!0)}function en(){const[s,n]=M("ziwei"),[q,D]=M("1990-05-12"),[X,ie]=M("14:30"),[le,se]=M(!1),[ve,t]=M("female"),[we,O]=M(""),[fe,he]=M("1992-08-15"),[I,Z]=M("10:00"),[Y,K]=M("female"),[oe,za]=M(""),[na,sa]=M("bazi"),[Oe,Ja]=M(!1),[oa,ra]=M("1990-01-01"),[pa,ja]=M("12:00"),[Oa,Qa]=M("male"),[Ue,la]=M(""),[da,et]=M("chaibu"),[Fe,Sa]=M(!0),[Je,ca]=M(!0),[Fa,at]=M("same-day"),[Da,St]=M(!1),[De,qa]=M(""),[Na,Ae]=M(""),[tt,Ma]=M(null),[Pa,Ke]=M({}),[Pe,it]=M(null),[Re,nt]=M([{year:"2019",kind:"career"},{year:"2022",kind:"love"}]),[Qe,Ca]=M(null),[Aa,st]=M("开业"),[Ta,Ra]=M("30"),[ea,ot]=M(""),[ke,ma]=M(""),[Te,ua]=M("solar2lunar"),[aa,rt]=M(""),[La,pt]=M(!1),[e,i]=M("time"),[r,l]=M(""),[o,c]=M(""),[d,u]=M(""),[m,f]=M(()=>new Array(Wa().total).fill(null)),[b,C]=M(0),[S,T]=M("60"),[k,E]=M("natal"),[J,R]=M("9"),[w,j]=M("子"),[te,F]=M("午"),[ee,$]=M("assess"),[ce,z]=M("李"),[H,ne]=M(""),[ye,be]=M("6"),[me,xe]=M(!1),[Ie,Ge]=M(""),[y,ue]=M(null),[_,U]=M(""),[W,re]=M(""),[ge,h]=M(null),[v,de]=M(()=>Di()),[ae,Se]=M(()=>Ut(Bt)==="flat"?"flat":"group"),[ze,je]=M(()=>{const a=Ut(Gt);return Array.isArray(a)?a:[]}),[ga,fa]=M({}),[Ia,ti]=M(null),[ii,lt]=M(()=>G.profilesLoad()),[Ga,dt]=M(null),[ni,si]=M(""),[ha,Ye]=M(""),[oi,Ce]=M(""),[sn,ct]=M(!1),[qt,ri]=M("3"),[ta,Nt]=M(""),[Le,pi]=M("general");function Mt(){return De.trim()||(y&&Ze(y.kind)?String(ta||"").trim():"")}$a(()=>{y&&y.r&&(ia.r=y.r,ia.q=Mt(),ia.it=y.it||null)},[y,De,ta]);const[li,on]=M(null),[rn,mt]=M(!1),[ba,di]=M("time"),[ut,ci]=M(""),[gt,mi]=M(""),[ft,ui]=M(""),[pn,xa]=M(""),[Ct,ht]=M({birth:null,cast:null}),ln=He.find(a=>a.k===s)||He[0],Ba=s==="bazi"||s==="ziwei"||s==="hepan"||s==="chenggu"||s==="trend"||s==="fengshui"||s==="name",Ee=ka(s),gi=!(s==="meihua"&&ba==="number"),fi=s!=="tarot"&&s!=="mbti"&&gi,hi=fi&&Ee!=="date",Xn=hi,qe=async(a,g,N,L)=>{const x=a||s,pe=N||ba,$e=x==="bazi"||x==="trend",Ve=L&&typeof L.hourUnknown=="boolean"?L.hourUnknown:le,Ne=g||($e&&Ve?{date:q,time:"12:00"}:{date:q,time:X}),_e=L&&L.gender?L.gender:ve,va=L&&typeof L.address=="string"?L.address:we,Za=L&&typeof L.trueSolar=="boolean"?L.trueSolar:Fe,Ua=L&&typeof L.lateZi=="boolean"?L.lateZi:Je,Ni=L&&typeof L.lines=="string"?L.lines:Ie,xt=L&&typeof L.question=="string"?L.question:ta,Mi=Ha(),Ci=++Be,Ka=()=>Ci!==Be;h(null),Ce("");try{let ya=0,Ai=null;ct(!0);try{await $t(x);const P=window.__MP_LAST_LOAD;ya=P&&typeof P.ms=="number"?P.ms:Ha()-Mi,Ai=P&&typeof P.cached=="boolean"?P.cached:null}catch(P){if(Ka())return;Ye(P&&P.message?P.message:String(P)),ue(null);return}finally{Ka()||ct(!1)}if(Ka())return;const Ti=`${Ne.date}T${Ne.time}`,A={system:x};if(A.shadow=x!=="mbti",A.trace=x==="liuyao"||x==="bazi"||x==="ziwei"||x==="qimen"||x==="daliuren",x!=="tarot"&&(A.datetime=Ti),x==="bazi"||x==="ziwei"||x==="hepan"||x==="trend"){if(A.gender=_e,A.trueSolar=Za,va.trim()){A.address=va.trim();try{const P=await B.geocodeAddress(A.address,{online:me});P&&typeof P.lon=="number"&&(A.longitude=P.lon,A.geo=P)}catch(P){console.error("[metaphysics] 地址解析失败，退回内置表",P)}if(Ka())return}(x==="bazi"||x==="ziwei")&&(A.cross=Da),A.lateZi=Ua,$e&&Ve&&(A.hourUnknown=!0)}if(x==="liuyao"){const P=Me.parseLines(Ni);P.lines?A.lines=P.lines:P.warning&&Ce(P.warning)}if(x==="qimen"&&(A.juMethod=da,A.lateZiHourMode=Fa,A.direction=Le),x==="bazi"&&(A.verifyPast=6),x==="zeri"){A.startDate=Ne.date,A.task=Aa,A.days=Number(Ta)||30,ea&&(A.shengXiao=ea);const P=ke.split(/[,，、\s]+/).filter(Boolean);P.length&&(A.candidates=P)}if(x==="xiaoliuren")if(A.mode=e,e==="number")A.num1=Number(r)||void 0,A.num2=Number(o)||void 0,A.num3=Number(d)||void 0;else{A.date=Ne.date;const P=Number(String(Ne.time).split(":")[0]);A.hour=Number.isFinite(P)?P:12}if(x==="mbti"){delete A.datetime;const P=m.slice();for(;P.length&&P[P.length-1]==null;)P.pop();P.length&&(A.answers=P)}if(x==="trend"&&$e&&Ve&&(A.hourUnknown=!0),x==="trend"&&(A.toAge=Number(S)||60),x==="fengshui"&&(A.action=k,k==="natal"?A.gender=_e:(A.sitting=w,A.facing=te,delete A.datetime,k==="xuankong"&&(A.period=Number(J)||9))),x==="name"&&(A.action=ee,A.surname=ce.trim(),ee==="generate"?(A.gender=_e,A.limit=Number(ye)||6,A.trueSolar=Za,A.lateZi=Ua):(A.givenName=H.trim(),(!Ne.date||!Ne.time)&&delete A.datetime)),x==="convert")if(A.system="convert",Te==="lunar2solar"){const P=/^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(aa).trim());if(!P){Ye("农历转公历请按「农历年-月-日」填写，例如 2026-9-17；闰月单独勾选。");return}A.mode="lunar2solar",A.lunarYear=Number(P[1]),A.lunarMonth=Number(P[2]),A.lunarDay=Number(P[3]),A.isLeapMonth=La,delete A.datetime}else A.mode="solar2lunar";if(x==="tarot"&&(A.count=Number(qt)),x==="hepan"&&(A.chart=na,A.partner={datetime:`${fe}T${I}`,gender:Y,address:oe.trim()||void 0,trueSolar:Fe},Oe&&(A.partner2={datetime:`${oa}T${pa}`,gender:Oa,address:Ue.trim()||void 0,trueSolar:Fe})),Ze(x)){if(!xt.trim()){Ye("请先填写「所问之事」——一句话即可，例如：今年是否适合换工作？"),mt(!0),ue(null);return}mt(!1),A.question=xt.trim(),x==="liuyao"&&(A.direction=Le)}if(x==="meihua"&&(A.mode=pe,pe==="number")){if(ut.trim()===""||gt.trim()===""){Ye("数字起卦需要填两个数（第一个数定上卦、第二个数定下卦）。"),ue(null);return}if(A.upper=Number(ut),A.lower=Number(gt),!Number.isFinite(A.upper)||!Number.isFinite(A.lower)){Ye("两个数都要是数字，例如 17 和 29。"),ue(null);return}ft!==""&&(A.changing=Number(ft))}const Bn=Ha();x==="trend"&&!A.asOf&&Me.todayStamp&&(A.asOf=Me.todayStamp());const Ea=B.compute(A),Zn=Ha()-Bn;let Tt=null;try{Tt=G.shadowTrack?G.shadowTrack(Ea):null}catch{Tt=null}let Lt=null;if(x==="bazi")try{Lt=B.compute({system:"trend",datetime:Ti,gender:_e,toAge:100,trueSolar:Za,lateZi:Ua,...Me.todayStamp?{asOf:A.asOf||Me.todayStamp()}:{},...A.dst!==void 0?{dst:A.dst}:{},...A.address?{address:A.address}:{},...typeof A.longitude=="number"?{longitude:A.longitude}:{},...A.geo?{geo:A.geo}:{}})}catch{Lt=null}let Et=null;if(B.caliberCompare)try{Et=B.caliberCompare(A)}catch{Et=null}const Un=Ze(x)||x==="qimen"?{question:Ze(x)?xt.trim():"",direction:Le}:void 0,vt=B.interpret?B.interpret(Ea,Un):null;vt&&Ea.cross&&B.crossSection&&(vt.sections=[...vt.sections||[],B.crossSection(Ea.cross)]);const Kn=ka(x)==="cast"&&(x!=="meihua"||pe==="time");ue({kind:x,r:Ea,it:vt,at:Ne,timed:Kn,trend:Lt,caliber:Et,shadowDiff:Tt,gender:_e,address:va,trueSolar:Za,lateZi:Ua});const Li=P=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>P>1?Li(P-1):Ei()):setTimeout(Ei,0)},Ei=()=>{Ci===Be&&h({engineMs:ya,computeMs:Zn,cached:Ai,totalMs:Ha()-Mi,renderMs:null})};if(Li(2),Ma(null),it(null),Ke({}),Ca(null),Ye(""),xa(""),x!=="tarot"&&x!=="mbti"){const P=!!($e&&Ve),_i={kind:x,date:Ne.date,time:P?"":Ne.time,hourUnknown:P,gender:_e,address:va,trueSolar:Za,lateZi:Ua,lines:x==="liuyao"?Ni:"",question:Ze(x)?xt.trim():"",direction:Le,count:qt,mhMode:pe,upper:ut,lower:gt,changing:ft,...x==="qimen"?{qimenRule:da,qLateZi:Fa}:{},...x==="zeri"?{task:Aa,days:Ta,shengXiao:ea,zCand:ke}:{},...x==="xiaoliuren"?{xlrMode:e,num1:r,num2:o,num3:d}:{},...x==="trend"?{toAge:S}:{},...x==="fengshui"?{fsMode:k,fsPeriod:J,sitting:w,facing:te}:{},...x==="name"?{nnMode:ee,surname:ce,givenName:H,limitN:ye}:{},...x==="convert"?{convMode:Te,lunarDate:aa,leapMonth:La}:{},...x==="hepan"?{hpChart:na,partnerDate:fe,partnerTime:I,partnerGender:Y,partnerAddress:oe,thirdOn:Oe,p2Date:oa,p2Time:pa,p2Gender:Oa,p2Address:Ue}:{},label:Ri(x,Ea),at:Date.now()};de(Yn=>{const Hi=[_i,...Yn.filter(Vn=>!Pi(Vn,_i))].slice(0,20);return Pt(Hi),Hi})}}catch(ya){if(Ka())return;Ye(ya&&ya.message?ya.message:String(ya)),ue(null)}},dn=async a=>{const g=ka(a),N=++Be;if(Ye(""),a==="mbti"){Ce(""),ct(!0);try{await $t(a)}catch(x){N===Be&&Ye(x&&x.message?x.message:String(x))}finally{N===Be&&ct(!1)}if(N!==Be)return;n(a),m.filter(x=>x!=null).length>=Xe?qe(a):ue(null);return}if(n(a),g==="none"){qe(a);return}const L=Ct[g]||(g==="cast"||g==="date"?zt():{date:Yt.date,time:Yt.time});D(L.date),ie(L.time),qe(a,L)},cn=a=>{He.some(g=>g.k===a)&&je(g=>{const N=(g||[]).filter(x=>x&&x.tab&&x.tab!==a),L=[{tab:a,at:Date.now()}].concat(N).slice(0,Zt);return Kt(Gt,L),L})},bi=a=>{const g=a==="flat"?"flat":"group";Se(g),Kt(Bt,g)},At=a=>{cn(a),dn(a)},mn=a=>{D(a),Ee!=="none"&&ht(g=>Object.assign({},g,{[Ee]:{date:a,time:X}}))},un=a=>{ie(a),Ee!=="none"&&ht(g=>Object.assign({},g,{[Ee]:{date:q,time:a}}))},Wn=()=>{const a=zt();D(a.date),ie(a.time),Ee!=="none"&&ht(g=>Object.assign({},g,{[Ee]:null})),qe(s,a)},xi=()=>{if(s==="mbti"){const a=m.filter(g=>g!=null).length;if(a<Xe){Ce(`先答满 ${Xe} 题再看结果（现答 ${a} 题，还差 ${Xe-a} 题）。`);return}qe(s);return}if(Ee!=="none"&&!Ct[Ee]){const a=zt();D(a.date),ie(a.time),qe(s,a);return}qe(s)},gn=()=>{const a={date:"1990-05-12",time:"14:30"};n("bazi"),t("male"),O("河北石家庄"),ht(g=>Object.assign({},g,{birth:a})),D(a.date),ie(a.time),qe("bazi",a,null,{gender:"male",address:"河北石家庄"})},vi=a=>{di(a),qe(s,{date:q,time:X},a)},fn=()=>!!(window.matchMedia&&window.matchMedia("(max-width: 640px)").matches),hn=()=>li===null?fn():li,bt=(a,g,N)=>{if(!g)return;const L=pe=>{a.textContent=pe?"已复制":"复制失败",setTimeout(()=>{a.textContent=N},1400)},x=()=>{try{const pe=document.createElement("textarea");pe.value=g,pe.setAttribute("readonly",""),pe.style.position="fixed",pe.style.opacity="0",document.body.appendChild(pe),pe.select();const $e=!!(document.execCommand&&document.execCommand("copy"));return document.body.removeChild(pe),$e}catch{return!1}};try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(g).then(()=>L(!0),()=>L(x()));return}}catch{}L(x())},bn=a=>bt(a,a.getAttribute("data-shadow-copy")||"","复制 ID"),xn=a=>bt(a,a.getAttribute("data-handle-copy")||"","复制句柄"),vn=a=>{const g=a.closest(".mp-trace-layer")||document.getElementById("mp-trace-layer"),N=g&&g.querySelector("[data-trace-md]");bt(a,N?N.value:"","复制 Markdown")},yn=()=>{try{return String(location.href).split("#")[0]}catch{return""}},$n=()=>{if(!y||!y.r)return null;try{return B.askPackages?B.askPackages(y.r,{question:Mt(),interpret:y.it,base:yn()}):null}catch{return null}},yi=[["full","复制提问","完整提问：盘面摘要 + 阅读层次 + 回答骨架，粘进任何对话窗都能用"],["brief","复制精简","一句话版：体系 + 排盘句柄 + 你的问题，够助手认出是哪张盘"],["structured","复制参数","结构化参数（JSON）：助手可直接照 args 调 compute，不必解析自然语言"],["link","复制深链","深链：把这张盘的参数编进链接，打开即还原同一张盘（换台机器、发给朋友都行）"]],wn=(a,g)=>{const N=$n();if(!N){Ae("还没有可以复制的盘：先排一张。");return}const L=a==="link"?N.link:N[a];if(!L){Ae(a==="link"?"这张盘没拿到句柄（随机抽牌只复现参数、不复现牌面），深链做不出来；用「复制提问」那一档。":"这一档暂时是空的，换一档试试。");return}bt(g,L,yi.find(x=>x[0]===a)[1]),a==="link"&&Ae("深链已复制：打开就还原这张盘，也可以直接发给别人。链接里是编码不是加密，别公开贴。")},kn=()=>{const a=document.getElementById("mp-trace-layer");if(!a)return;a.classList.add("open"),a.setAttribute("aria-hidden","false");const g=a.querySelector("[data-trace-close]");g&&g.focus&&g.focus()},$i=()=>{const a=document.getElementById("mp-trace-layer");if(!a)return;a.classList.remove("open"),a.setAttribute("aria-hidden","true");const g=document.querySelector("[data-trace-open]");g&&g.focus&&g.focus()},zn=a=>{const g=a.target&&a.target.closest?a.target.closest("[data-shadow-copy]"):null;if(g){bn(g);return}const N=a.target&&a.target.closest?a.target.closest("[data-handle-copy]"):null;if(N){xn(N);return}if(a.target&&a.target.closest?a.target.closest("[data-trace-open]"):null){kn();return}const x=a.target&&a.target.closest?a.target.closest("[data-trace-copy]"):null;if(x){vn(x);return}if(a.target&&a.target.closest?a.target.closest("[data-mp-askcopy]"):null){qn();return}if(a.target&&a.target.closest?a.target.closest("[data-trace-close]"):null){$i();return}const Ve=a.target&&a.target.closest?a.target.closest(".mp-it-head"):null;if(!Ve)return;const Ne=Ve.closest(".mp-it");if(!Ne)return;const _e=!Ne.classList.contains("folded");Ne.classList.toggle("folded",_e),Ve.setAttribute("aria-expanded",_e?"false":"true");const va=Ve.querySelector(".mp-it-hint");va&&(va.textContent=_e?"点击展开":"点击收起"),on(_e)},wi=(a,g)=>{if(!y||!(Ze(s)||s==="qimen"))return;const N={question:Ze(s)?(g===void 0?ta:g).trim():"",direction:a===void 0?Le:a},L=B.interpret?B.interpret(y.r,N):null;let x=y.r;if((s==="liuyao"||s==="qimen")&&x&&x.trace&&B.buildTrace)try{const pe=s==="liuyao"?B.buildTrace(x,{direction:N.direction,gender:x.useGod&&x.useGod.gender||"male",refresh:!0}):B.buildTrace(x,{direction:N.direction});pe&&(x=Object.assign({},x,{trace:pe}))}catch{}ue(Object.assign({},y,{r:x,it:L}))},jn=a=>!a||!a.timed||!a.at?"":`<div class="mp-cast">起卦时刻：<b>${a.at.date} ${a.at.time}</b>　（来自你的本机时间，点「此刻」可重新取当下）</div>`,Sn=()=>{try{const a=y&&y.r&&y.r.summary?y.r.summary:"";if(!a)return;navigator.clipboard.writeText(a).then(()=>xa("已复制"),()=>xa("复制失败"))}catch{xa("复制失败")}},qn=()=>{if(!y||!y.r||!window.Engine||!window.Engine.buildEventPrompt)return;const a=Me&&Me.kindOfDirection?Me.kindOfDirection(Le):"other";let g;try{g=window.Engine.buildEventPrompt(y.r,{question:(ta||"").trim(),kind:a,gender:ve,timeKnown:!0})}catch{g=null}g&&g.text&&navigator.clipboard.writeText(g.text).then(()=>xa("已复制问事提示"),()=>xa("复制失败"))},ki=()=>{if(!(!y||!y.r||!De.trim()))try{Ma(B.followup?B.followup(y.r,De.trim()):null)}catch(a){Ma({question:De.trim(),ok:!1,answer:"追问失败："+(a&&a.message?a.message:a),evidence:[],confidence:"弱"})}},Nn=()=>{if(!(!y||!y.r))try{const a=B.askPrompt?B.askPrompt(y.r,{question:Mt(),interpret:y.it}):null,g=a&&a.text?a.text:String(y.r.summary||"");if(ei(g)){Ae("已发到对话窗，往下看回复。");return}const N="（"+Vt()+"）";navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(g).then(()=>Ae("对话输入框还没就绪"+N+"，已复制提问；粘进对话窗回车即可。"),()=>Ae("对话输入框还没就绪"+N+"，复制也没成功；先点「复制文字结果」再贴。")):Ae("对话输入框还没就绪"+N+"；先点「复制文字结果」再贴进对话窗。")}catch(a){Ae("发到对话窗失败："+(a&&a.message?a.message:a))}},Mn=()=>{const a=[],g=window.__MP_VER||"未知";a.push("# 命理插件反馈"),a.push(""),a.push("## 我遇到的情况"),a.push(""),a.push("（在这里写一句就好：哪里不对 / 读不懂哪一段 / 算得和别人不一样 / 想加什么。下面这些是自动带的复现信息，不用改。）"),a.push(""),a.push("## 复现信息"),a.push(""),a.push("- 插件版本：v"+g);{const x=Array.isArray(window.__MP_UNRELEASED)?window.__MP_UNRELEASED:[];x.length&&a.push("- 未发版改动："+x.length+" 项（版本号未变，说明这份产物比 v"+g+" 新）")}const N=He.find(x=>x.k===s)?.label||s;if(a.push("- 体系："+N+(N===s?"":"（"+s+"）")),ta&&a.push("- 所问之事："+ta),Le&&Le!=="general"){const x=(Array.isArray(B.DIRECTIONS)?B.DIRECTIONS:[]).find(pe=>pe.key===Le);a.push("- 询问方向："+(x?x.label:Le))}a.push(""),a.push("### 输入"),a.push(""),a.push("```"),(ka(s)==="time"||ka(s)==="date")&&(a.push(`日期：${q}`),ka(s)==="time"&&a.push(`时刻：${le?"（未知，按三柱排）":X}`),a.push(`性别：${ve==="male"?"男":"女"}`),we&&a.push(`出生地：${we}`),a.push(`真太阳时：${Fe?"开":"关"}　晚子时换日：${Je?"开":"关"}`),s==="qimen"&&a.push(`奇门取局：${da}`),Da&&a.push("交叉验证：开"));const L={合盘:()=>{a.push(`对方：${fe} ${I} ${Y==="male"?"男":"女"}${oe?" "+oe:""}（${na} 盘）`),Oe&&a.push(`第三方：${oa} ${pa} ${Oa==="male"?"男":"女"}${Ue?" "+Ue:""}`)},择日:()=>{a.push(`事项：${Aa}　起算：${q}　天数：${Ta}${ea?"　属相："+ea:""}${ke?"　候选日："+ke:""}`)},起名:()=>{a.push(`姓：${ce||"（未填）"}　名：${H||"（未填）"}　模式：${ee}${ee==="generate"?"　候选数："+(ye||"默认"):""}`)},公农历:()=>{a.push(`模式：${Te}${aa?"　农历输入："+aa:""}${La?"（闰月）":""}`)},小六壬:()=>{a.push(`模式：${e}${e==="number"?`　报数：${r}/${o}/${d}`:""}`)},风水:()=>{a.push(`动作：${k}${k==="natal"?"":`　坐：${w}　向：${te}`}${k==="xuankong"?`　运：${J}`:""}`)}};if(L[N]&&L[N](),a.push("```"),a.push(""),ha&&(a.push("### 报错原文"),a.push(""),a.push("```"),a.push(String(ha)),a.push("```"),a.push("")),y&&y.r){a.push("### 结果摘要（引擎原文，前 40 行）"),a.push(""),a.push("```");const x=String(y.r.summary||(B.renderText?B.renderText(y.r):"")||"");a.push(x.split(`
`).slice(0,40).join(`
`)),a.push("```"),y.r.handle&&(a.push(""),a.push("排盘句柄（开发者可据此复现同一张盘）：`"+y.r.handle+"`"))}else a.push("### 结果摘要"),a.push(""),a.push("（这次没有生成盘面——如果是在排盘过程中出错，上面的「报错原文」就是关键。）");return a.push(""),a.push("## 联系渠道"),a.push(""),a.push("- GitHub issue：https://github.com/xuanfu-web/dsh-metaphysics/issues"),a.push("- 邮件：1129440028@qq.com"),a.push("- 微信群：dsh-metaphysics"),a.join(`
`)},zi=()=>{const a=Mn();try{if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(a).then(()=>{U("已复制"),re("粘到 issue / 邮件 / 群里即可")}).catch(()=>{U("复制失败"),re("可改用「导出 .md」或手动选中")});else{const g=document.createElement("textarea");g.value=a,g.style.cssText="position:fixed;left:-9999px;top:0",document.body.appendChild(g),g.select();const N=document.execCommand&&document.execCommand("copy");g.remove(),U(N?"已复制":"复制失败"),re(N?"粘到 issue / 邮件 / 群里即可":"可改用「导出 .md」或手动选中")}}catch{U("复制失败"),re("可改用「导出 .md」")}setTimeout(()=>{U(""),re("")},4e3)},Cn=()=>{try{zi()}catch{}const a=encodeURIComponent("[反馈] "+(He.find(g=>g.k===s)?.label||s)+(ha?"：报错":"：使用问题"));try{window.open("https://github.com/xuanfu-web/dsh-metaphysics/issues/new?title="+a,"_blank","noopener")}catch{re("浏览器拦了弹窗，请手动打开 GitHub issues")}},An=()=>{if(!(!y||!y.r))try{const a=B.renderText?B.renderText(y.r):y.r.summary||"",g=new Blob([a],{type:"text/markdown;charset=utf-8"}),N=document.createElement("a");N.href=URL.createObjectURL(g),N.download=`命理报告-${y.r.system}.md`,document.body.appendChild(N),N.click(),N.remove(),setTimeout(()=>URL.revokeObjectURL(N.href),2e3)}catch(a){console.error("[metaphysics] 导出失败",a)}},Tn=()=>{if(!(!y||!y.r))try{const a=G.summaryCardPNG?G.summaryCardPNG(y.r,y.it):"";if(!a){xa("当前环境不支持 Canvas 导出");return}const g=document.createElement("a");g.href=a,g.download=`命理摘要-${y.r.system}.png`,document.body.appendChild(g),g.click(),g.remove()}catch(a){console.error("[metaphysics] 长图导出失败",a)}},ji={fontSize:12,padding:"5px 12px"},Ln=()=>{!y||!y.r||!y.r.past||it(B.verifyFit?B.verifyFit(y.r.past.rows,Pa):null)},En=()=>{if(!(!y||y.kind!=="bazi"))try{const a=y.at||{date:q,time:X},[g,N,L]=String(a.date).split("-").map(Number),[,x]=String(a.time).split(":").map(Number),pe=Re.filter($e=>Number($e.year)).map($e=>({year:Number($e.year),kind:$e.kind}));Ca(B.rectifyBirth?B.rectifyBirth({base:{year:g,month:N,day:L,minute:Number.isFinite(x)?x:0},gender:y.gender||ve,events:pe,lateZi:typeof y.lateZi=="boolean"?y.lateZi:Je,trueSolar:typeof y.trueSolar=="boolean"?y.trueSolar:Fe,address:String(y.address||"").trim()||void 0}):{error:"当前客户端未加载生时校正模块"})}catch(a){Ca({error:a&&a.message?a.message:String(a)})}},Q=(a,g)=>p("label",{className:"mp-field"},p("span",{className:"mp-lbl"},a),g),_n=a=>{n(a.kind),a.date&&D(a.date),a.time&&ie(a.time),se(!!a.hourUnknown),a.gender&&t(a.gender),O(a.address||""),typeof a.trueSolar=="boolean"&&Sa(a.trueSolar),typeof a.lateZi=="boolean"&&ca(a.lateZi),Ge(a.lines||""),Nt(a.question||""),pi(a.direction||"general"),ri(a.count||"3"),di(a.mhMode||"time"),ci(a.upper||""),mi(a.lower||""),ui(a.changing||""),a.kind==="qimen"&&(typeof a.qimenRule=="string"&&et(a.qimenRule),typeof a.qLateZi=="string"&&at(a.qLateZi)),a.kind==="zeri"&&(typeof a.task=="string"&&st(a.task),a.days!=null&&Ra(String(a.days)),typeof a.shengXiao=="string"&&ot(a.shengXiao),typeof a.zCand=="string"&&ma(a.zCand)),a.kind==="xiaoliuren"&&(i(a.xlrMode==="number"?"number":"time"),a.num1!=null&&l(String(a.num1)),a.num2!=null&&c(String(a.num2)),a.num3!=null&&u(String(a.num3))),a.kind==="trend"&&a.toAge!=null&&T(String(a.toAge)),a.kind==="fengshui"&&(typeof a.fsMode=="string"&&E(a.fsMode),a.fsPeriod!=null&&R(String(a.fsPeriod)),typeof a.sitting=="string"&&j(a.sitting),typeof a.facing=="string"&&F(a.facing)),a.kind==="name"&&(typeof a.nnMode=="string"&&$(a.nnMode),typeof a.surname=="string"&&z(a.surname),typeof a.givenName=="string"&&ne(a.givenName),a.limitN!=null&&be(String(a.limitN))),a.kind==="convert"&&(typeof a.convMode=="string"&&ua(a.convMode),typeof a.lunarDate=="string"&&rt(a.lunarDate),typeof a.leapMonth=="boolean"&&pt(a.leapMonth)),a.kind==="hepan"&&(a.hpChart&&sa(a.hpChart),typeof a.partnerDate=="string"&&he(a.partnerDate),typeof a.partnerTime=="string"&&Z(a.partnerTime),typeof a.partnerGender=="string"&&K(a.partnerGender),typeof a.partnerAddress=="string"&&za(a.partnerAddress),typeof a.thirdOn=="boolean"&&Ja(a.thirdOn),typeof a.p2Date=="string"&&ra(a.p2Date),typeof a.p2Time=="string"&&ja(a.p2Time),typeof a.p2Gender=="string"&&Qa(a.p2Gender),typeof a.p2Address=="string"&&la(a.p2Address)),mt(!1),ti(a)},Hn=()=>{de([]),Pt([])},On=["bazi","ziwei","trend","chenggu"],Si=a=>{n(a.kind),D(a.date),a.time&&ie(a.time),se(!!a.hourUnknown),a.gender&&t(a.gender),O(a.address||""),Sa(a.trueSolar!==!1),ca(a.lateZi!==!1)},Fn=a=>{const g=G.profEvent(a.target);if(!g)return;const N=x=>ii.find(pe=>pe.id===x),L=a.currentTarget.querySelector(".mp-prof-name");if(si(""),g.action==="use"){const x=N(g.id);if(!x)return;if(!G.profUsable(x)){Ce("这张档案没有出生时刻，先补上时刻再存一次。");return}We="",lt(G.profilesTouch(x.id)),Si(x),qe(x.kind,{date:x.date,time:x.hourUnknown?"12:00":x.time},void 0,{gender:x.gender||void 0,address:x.address||"",hourUnknown:!!x.hourUnknown,trueSolar:x.trueSolar!==!1,lateZi:x.lateZi!==!1});return}if(g.action==="edit"){const x=N(g.id);if(!x)return;Si(x),We=x.label,dt(x.id);return}if(g.action==="cancel"){We="",dt(null);return}if(g.action==="pin"){lt(G.profilesPin(g.id));return}if(g.action==="del"){if(ni!==g.id){si(g.id);return}lt(G.profilesRemove(g.id)),Ga===g.id&&(We="",dt(null)),Ce("已从本机删除这张档案卡（不影响已经排出来的盘）。");return}if(g.action==="put"){const x=Ga,pe=G.profFromForm({kind:s,date:q,time:X,hourUnknown:le,gender:ve,address:we,trueSolar:Fe,lateZi:Je},L?L.value:We,Ga||void 0);if(!pe){Ce("先填好出生日期（和时刻），再存档案。");return}const $e=G.profilesPut(pe);if(!$e.ok){Ce("档案没能存进本机（存储被禁用或已满），排盘不受影响。");return}lt($e.list),We="",dt(null),L&&(L.value=""),Ce(`${x?"已更新档案":"已存入我的命盘"}「${$e.item.label}」。`)}},Dn=a=>{const g=a.target&&a.target.closest?a.target.closest(".mp-prof-name"):null;g&&(We=g.value)},Pn=a=>{const g=B.formOf?B.formOf(a):null;if(!g){qe("ziwei");return}const N=He.some($e=>$e.k===g.tab)?g.tab:"ziwei",L={date:g.date||q,time:g.time||X},x=g.lines===void 0?void 0:Array.isArray(g.lines)?g.lines.join(" "):String(g.lines);g.date&&D(g.date),g.time&&ie(g.time),g.gender&&t(g.gender),typeof g.address=="string"&&O(g.address),typeof g.trueSolar=="boolean"&&Sa(g.trueSolar),typeof g.lateZi=="boolean"&&ca(g.lateZi),x!==void 0&&Ge(x),g.question&&Nt(g.question),n(N);const pe=B.restNote?B.restNote(g):"";Ae(`已按深链还原：${a.label}${g.question?`｜${g.question}`:""}${pe?`　${pe}`:""}`),qe(N,L,void 0,{gender:g.gender,address:g.address,trueSolar:g.trueSolar,lateZi:g.lateZi,lines:x,question:g.question})};$a(()=>{let a=!1;const g=Be;return(async()=>{let N=null;try{await $t(s);const L=typeof location<"u"?String(location.href):"";L&&L.indexOf("mp=")>=0&&window.Engine&&window.Engine.parseAskLink&&(N=window.Engine.parseAskLink(L))}catch{N=null}if(!(a||Be!==g)){if(N&&N.ok)try{Pn(N);return}catch{}qe("ziwei")}})(),()=>{a=!0}},[]),$a(()=>{if(!Ia)return;const a=Ia.kind;ti(null),qe(a)},[Ia]),$a(()=>{const a=g=>{if(g.key!=="Escape")return;const N=document.getElementById("mp-trace-layer");N&&N.classList.contains("open")&&$i()};return document.addEventListener("keydown",a),()=>document.removeEventListener("keydown",a)},[]);const qi=(ze||[]).filter(a=>a&&He.some(g=>g.k===a.tab)).slice(0,Zt),Rn=a=>(He.find(g=>g.k===a)||{}).label||a,In=({k:a,label:g,tip:N,wide:L})=>p("button",{key:a,type:"button",className:"mp-tool"+(L?" wide":"")+(s===a?" on":""),"data-tab":a,onClick:()=>At(a)},p("b",null,g),p("span",null,N)),Gn=[p("div",{key:"profiles",className:"mp-profwrap",onClick:Fn,onInput:Dn,dangerouslySetInnerHTML:{__html:G.profilesHTML(ii,{editingId:Ga,armedDel:ni,bar:On.indexOf(s)>=0?G.profilesBarHTML({editingId:Ga,name:We}):""})}}),p("section",{key:"start",className:"mp-start","aria-label":"选择要算的事"},p("div",{className:"mp-start-top"},p("div",{className:"mp-recent",hidden:qi.length===0},p("span",{className:"mp-recent-lbl"},"最近用过"),p("span",{className:"mp-recent-list"},qi.map(a=>p("button",{key:a.tab,type:"button",className:"mp-rc",onClick:()=>At(a.tab)},Rn(a.tab),p("i",null,Xi(a.at)))))),p("div",{className:"mp-viewsw",role:"group","aria-label":"首屏视图"},p("button",{type:"button",className:ae==="group"?"on":"","aria-pressed":ae==="group"?"true":"false",onClick:()=>bi("group")},"分组"),p("button",{type:"button",className:ae==="flat"?"on":"","aria-pressed":ae==="flat"?"true":"false",onClick:()=>bi("flat")},"平铺"))),ae==="group"?p("div",{className:"mp-groups"},Vi.map(a=>{const g=!!ga[a.title],N=Math.max(0,a.items.length-4);return p("section",{key:a.title,className:"mp-tgroup"+(g?" open":"")},p("div",{className:"mp-tgroup-head"},p("h2",null,a.title),p("p",null,a.hint)),p("div",{className:"mp-ttools"},a.items.map(In),N>0?p("button",{key:"more",type:"button",className:"mp-tmore","aria-expanded":g?"true":"false",onClick:()=>fa(L=>Object.assign({},L,{[a.title]:!g}))},g?"收起":`还有 ${N} 个`):null))})):null),p("div",{key:"tabs",className:"mp-tabs"+(ae==="flat"?"":" hide"),role:"tablist","aria-label":"命理体系"},He.map(a=>p("button",{key:a.k,role:"tab","aria-selected":s===a.k?"true":"false",tabIndex:s===a.k?0:-1,className:"mp-tab"+(s===a.k?" on":""),onClick:()=>At(a.k)},a.label))),p("div",{key:"head",className:"mp-panel"},p("div",{className:"mp-row"},fi?Q(Ba?"出生日期（公历）":Ee==="date"?"日期（公历）":"起卦日期（公历）",p(wt,{value:q,onChange:mn,onInvalid:()=>Ce("日期请按「年-月-日」填写，例如 1990-05-12。")})):null,hi?Q(Ba?"出生时刻":"起卦时刻",p("input",{className:"mp-input",type:"time",value:X,disabled:le&&(s==="bazi"||s==="trend"),onChange:a=>un(a.target.value)})):null,s==="bazi"||s==="trend"?p("label",{className:"mp-chk",title:"不知道出生时辰时勾这里：不排时柱，起运按日估算，结果首行会写明"},p("input",{type:"checkbox",checked:le,onChange:a=>se(a.target.checked)})," 时辰未知"):null,Ba?Q("性别",p("select",{className:"mp-input",value:ve,onChange:a=>t(a.target.value)},p("option",{value:"female"},"女"),p("option",{value:"male"},"男"))):null,Ba?Q("出生地（省/市即可）",p("input",{className:"mp-input",placeholder:"如 河北石家庄 / 成都",value:we,onChange:a=>O(a.target.value)})):null,s==="bazi"||s==="ziwei"?p("label",{className:"mp-field mp-checks"},p("input",{type:"checkbox",checked:Da,onChange:a=>St(a.target.checked)}),p("span",{className:"mp-lbl"},"八字 × 紫微 交叉验证")):null,s==="hepan"?Q("对方出生日期",p(wt,{value:fe,onChange:he,onInvalid:()=>Ce("对方出生日期请按「年-月-日」填写，例如 1992-08-15。")})):null,s==="hepan"?Q("对方出生时刻",p("input",{className:"mp-input",type:"time",value:I,onChange:a=>Z(a.target.value)})):null,s==="hepan"?Q("对方性别",p("select",{className:"mp-input",value:Y,onChange:a=>K(a.target.value)},p("option",{value:"female"},"女"),p("option",{value:"male"},"男"))):null,s==="hepan"?Q("合盘方式",p("div",{className:"mp-seg"},p("button",{className:na==="bazi"?"on":"",onClick:()=>sa("bazi")},"八字"),p("button",{className:na==="ziwei"?"on":"",onClick:()=>sa("ziwei")},"紫微"))):null,s==="hepan"?Q("对方出生地（可空）",p("input",{className:"mp-input",placeholder:"如 四川成都",value:oe,onChange:a=>za(a.target.value)})):null,s==="hepan"?p("label",{className:"mp-field mp-checks"},p("input",{type:"checkbox",checked:Oe,onChange:a=>Ja(a.target.checked)}),p("span",{className:"mp-lbl"},"三方合盘（加入第三人）")):null,s==="hepan"&&Oe?Q("第三方出生日期",p(wt,{value:oa,onChange:ra,onInvalid:()=>Ce("第三方出生日期请按「年-月-日」填写，例如 1990-01-01。")})):null,s==="hepan"&&Oe?Q("第三方出生时刻",p("input",{className:"mp-input",type:"time",value:pa,onChange:a=>ja(a.target.value)})):null,s==="hepan"&&Oe?Q("第三方性别",p("select",{className:"mp-input",value:Oa,onChange:a=>Qa(a.target.value)},p("option",{value:"female"},"女"),p("option",{value:"male"},"男"))):null,s==="hepan"&&Oe?Q("第三方出生地（可空）",p("input",{className:"mp-input",placeholder:"如 广东广州",value:Ue,onChange:a=>la(a.target.value)})):null,s==="qimen"?p("fieldset",{key:"qmr",className:"mp-qmrule"},p("legend",{className:"mp-lbl"},"换局规则"),p("div",{className:"mp-qmopts",role:"radiogroup","aria-label":"奇门换局规则"},[["chaibu","拆补"],["chaoshen","超神接气"],["zhirun","置闰"]].map(([a,g])=>p("label",{key:a,className:"mp-qmopt"},p("input",{type:"radio",name:"qimen_rule",value:a,checked:da===a,onChange:()=>et(a)}),p("span",null,g)))),p("div",{className:"mp-field"},p("span",{className:"mp-lbl"},"晚子时"),p("select",{className:"mp-input",value:Fa,onChange:a=>at(a.target.value)},p("option",{value:"same-day"},"23:00 后归当日"),p("option",{value:"next-day"},"23:00 后归次日"))),p("details",{className:"mp-qmhelp"},p("summary",null,"三种规则有什么区别？"),p("p",null,"决定符头与节气如何对齐、是否插入闰局；同一个时刻在不同规则下可能得到不同局数。默认「拆补」与工具层一致。"))):null,Ze(s)||s==="qimen"?Q(s==="qimen"?"询问方向（定用神）":"询问方向",p("select",{className:"mp-input",value:Le,onChange:a=>{pi(a.target.value),wi(a.target.value)}},(B.DIRECTIONS||[]).map(a=>p("option",{key:a.key,value:a.key},a.label)))):null,s==="tarot"?Q("张数",p("select",{className:"mp-input",value:qt,onChange:a=>ri(a.target.value)},p("option",{value:"1"},"1 张 · 指引"),p("option",{value:"3"},"3 张 · 过去现在未来"),p("option",{value:"5"},"5 张 · 十字牌阵"))):null,s==="liuyao"?Q("六爻（可空）",p("input",{className:"mp-input",placeholder:"空则随机，如 9 7 8 8 7 6",value:Ie,onChange:a=>Ge(a.target.value)})):null,s==="meihua"?Q("起卦方式",p("div",{className:"mp-seg"},p("button",{className:ba==="time"?"on":"",onClick:()=>vi("time")},"时间"),p("button",{className:ba==="number"?"on":"",onClick:()=>vi("number")},"数字"))):null,s==="meihua"&&ba==="number"?Q("第一个数",p("input",{className:"mp-input",value:ut,placeholder:"如 17",onChange:a=>ci(a.target.value)})):null,s==="meihua"&&ba==="number"?Q("第二个数",p("input",{className:"mp-input",value:gt,placeholder:"如 29",onChange:a=>mi(a.target.value)})):null,s==="meihua"&&ba==="number"?Q("动爻（可空）",p("input",{className:"mp-input",value:ft,placeholder:"1-6",onChange:a=>ui(a.target.value)})):null,s==="zeri"?Q("所办事项",p("select",{className:"mp-input",value:Aa,onChange:a=>st(a.target.value)},[["常用",["嫁娶","搬家入宅","出行","开业","签订合同","祭祀"]],["婚嫁",["嫁娶","订婚","领证","提亲","收送聘金","满月酒"]],["生活",["搬家","入宅","旅行","访亲友","入学","求医","祭祀"]],["建造",["动土","装修","装修建造","安葬","试车买车"]],["工商",["开业","交易","投资","签订合同","签约","纳财","赴任"]]].map(([a,g])=>p("optgroup",{key:a,label:a},g.map(N=>p("option",{key:`${a}-${N}`,value:N},N)))))):null,s==="convert"?Q("转换方向",p("div",{className:"mp-seg"},p("button",{className:Te==="solar2lunar"?"on":"",onClick:()=>ua("solar2lunar")},"公历 → 农历"),p("button",{className:Te==="lunar2solar"?"on":"",onClick:()=>ua("lunar2solar")},"农历 → 公历"))):null,s==="convert"&&Te==="lunar2solar"?Q("农历日期",p("input",{className:"mp-input",value:aa,placeholder:"如 2026-9-17",onChange:a=>rt(a.target.value)})):null,s==="convert"&&Te==="lunar2solar"?p("label",{className:"mp-check"},p("input",{type:"checkbox",checked:La,onChange:a=>pt(a.target.checked)})," 闰月"):null,s==="zeri"?Q("看多少天",p("input",{className:"mp-input",type:"number",min:1,max:60,value:Ta,onChange:a=>Ra(a.target.value)})):null,s==="zeri"?Q("候选日（可空，只比这几天）",p("input",{className:"mp-input",placeholder:"如 2026-12-01, 2026-12-08, 2026-12-15",value:ke,onChange:a=>ma(a.target.value)})):null,s==="zeri"?Q("当事人属相（可空）",p("select",{className:"mp-input",value:ea,onChange:a=>ot(a.target.value)},p("option",{value:""},"不排除"),["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"].map(a=>p("option",{key:a,value:a},a)))):null,s==="xiaoliuren"?Q("起课方式",p("div",{className:"mp-seg"},p("button",{className:e==="time"?"on":"",onClick:()=>i("time")},"时间"),p("button",{className:e==="number"?"on":"",onClick:()=>i("number")},"报数"))):null,s==="xiaoliuren"&&e==="number"?Q("第一个数",p("input",{className:"mp-input",type:"number",min:1,max:99,value:r,onChange:a=>l(a.target.value)})):null,s==="xiaoliuren"&&e==="number"?Q("第二个数",p("input",{className:"mp-input",type:"number",min:1,max:99,value:o,onChange:a=>c(a.target.value)})):null,s==="xiaoliuren"&&e==="number"?Q("第三个数",p("input",{className:"mp-input",type:"number",min:1,max:99,value:d,onChange:a=>u(a.target.value)})):null,s==="mbti"?p("div",{className:"mp-quiz-wrap"},p("div",{className:"mp-lbl"},"十六型人格问卷 · 4 题一页，按 1（完全不像）到 5（很像我）打分"),p(Ui,{answers:m,page:b,onPick:(a,g)=>f(N=>{const L=N.slice();return L[a]=g,L}),onPage:a=>C(g=>Math.max(0,Math.min(g+a,Math.max(0,Math.ceil(Wa().total/Va)-1)))),onSubmit:xi,onClear:()=>{f(new Array(Wa().total).fill(null)),C(0),ue(null)}})):null,s==="trend"?Q("算到几岁",p("input",{className:"mp-input",type:"number",min:10,max:100,value:S,onChange:a=>T(a.target.value)})):null,s==="fengshui"?Q("看什么",p("div",{className:"mp-seg"},p("button",{className:k==="natal"?"on":"",onClick:()=>E("natal")},"命卦"),p("button",{className:k==="advise"?"on":"",onClick:()=>E("advise")},"门主灶"),p("button",{className:k==="xuankong"?"on":"",onClick:()=>E("xuankong")},"玄空"))):null,s==="fengshui"&&k!=="natal"?Q("坐山（24 山）",p("input",{className:"mp-input",value:w,placeholder:"如 子 / 乾",onChange:a=>j(a.target.value)})):null,s==="fengshui"&&k!=="natal"?Q("朝向（24 山）",p("input",{className:"mp-input",value:te,placeholder:"如 午 / 巽",onChange:a=>F(a.target.value)})):null,s==="fengshui"&&k==="xuankong"?Q("运（1–9）",p("input",{className:"mp-input",type:"number",min:1,max:9,value:J,onChange:a=>R(a.target.value)})):null,s==="name"?Q("看什么",p("div",{className:"mp-seg"},p("button",{className:ee==="assess"?"on":"",onClick:()=>$("assess")},"评名字"),p("button",{className:ee==="generate"?"on":"",onClick:()=>$("generate")},"生成候选"))):null,s==="name"?Q("姓",p("input",{className:"mp-input",value:ce,placeholder:"如 李",onChange:a=>z(a.target.value)})):null,s==="name"&&ee==="assess"?Q("名字",p("input",{className:"mp-input",value:H,placeholder:"如 沐宸",onChange:a=>ne(a.target.value)})):null,s==="name"&&ee==="generate"?Q("候选个数",p("input",{className:"mp-input",type:"number",min:1,max:20,value:ye,onChange:a=>be(a.target.value)})):null),Ba?p("div",{className:"mp-checks"},p("label",{title:"按出生地经度把钟表时间换算成真太阳时"},p("input",{type:"checkbox",checked:Fe,onChange:a=>Sa(a.target.checked)}),"真太阳时"),p("label",{title:"23:00–23:59 出生时：勾选=按次日日柱起时柱；不勾=仍用当日日柱"},p("input",{type:"checkbox",checked:Je,onChange:a=>ca(a.target.checked)}),"晚子时换日"),p("label",{title:"开启后会请求 OpenStreetMap，把区县/村落到更精确的坐标"},p("input",{type:"checkbox",checked:me,onChange:a=>xe(a.target.checked)}),"联网精确到区县")):null,Ze(s)?p("div",{className:"mp-askblock"},p("span",{className:"mp-lbl"},"所问之事（必填）"),p("textarea",{className:"mp-textarea"+(rn?" invalid":""),rows:2,value:ta,placeholder:"用一句话描述所问之事，例如：今年是否适合换工作？",onChange:a=>{Nt(a.target.value),mt(!1)},onBlur:a=>wi(void 0,a.target.value)})):null,s==="mbti"?null:p("div",{key:"actions",className:"mp-actions"},p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginRight:8},onClick:gn,title:"用固定示例盘看完整报告（不改动你已填的数据）"},"看示例"),p("button",{className:"mp-btn",onClick:xi,title:"时间仍为自动时，点它会取当下再起卦"},s==="tarot"?"抽牌":s==="bazi"||s==="ziwei"?"排盘":s==="hepan"?"合盘":s==="qimen"?"起局":kt.indexOf(s)>=0?"看结果":"起卦"))),p("div",{key:"hint",className:"mp-hint"},ln.hint),v.length?p("div",{key:"hist",className:"mp-hist"},p("div",{className:"mp-hist-h"},p("span",null,"最近排过"),p("button",{className:"mp-hist-clear",onClick:Hn},"清空")),p("div",{className:"mp-hist-list"},v.map((a,g)=>p("button",{key:g,className:"mp-hist-item",title:`${String(a.date||"")} ${a.hourUnknown?"时辰未知":String(a.time||"")}`,onClick:()=>_n(a)},p("b",null,(He.find(N=>N.k===a.kind)||{}).label||a.kind),p("span",null,a.label||"—"),p("i",null,`${String(a.date||"").slice(5)} ${a.hourUnknown?"时辰未知":String(a.time||"")}`))))):null,Ee==="cast"&&gi?p("div",{key:"auto",className:"mp-auto"},Ct.cast?`起卦时刻用的是你手动填的（${X}）；想跟随当下，把时间改回或清空即可。`:`起卦时刻已自动取本机时间（${X}），每次点起卦都会重新取当下；想固定时刻就在上面改。`):null,ha?p("div",{key:"err",className:"mp-err",role:"alert"},ha):null,oi?p("div",{key:"ntc",className:"mp-note",role:"status"},oi):null,sn?p("div",{key:"load",className:"mp-note",role:"status"},"正在加载本页需要的引擎…"):null,!y&&!ha?p("div",{key:"empty",className:"mp-empty"},p("b",null,s==="ziwei"||s==="bazi"?"填好出生信息，点「排盘」":s==="tarot"?"写下想问的事，点「抽牌」":s==="mbti"?"按 1–5 给题目打分，答满 12 题就能看结果":kt.indexOf(s)>=0?"填好参数，点「看结果」":"写下所问之事，点「起卦」"),s==="ziwei"||s==="bazi"?"出生日期、时刻与性别即可；出生地只影响真太阳时。":s==="mbti"?"4 题一页，答案只在本地参与计算，不会上传。":kt.indexOf(s)>=0?"按上面的选项填好参数即可；全部在本机计算，不上传。":"起卦时刻已自动取当下，也可以手动改。"):null,y?p("div",{key:"card",className:"mp-card mp-flat",role:"region","aria-label":"排盘结果","aria-live":"polite",onClick:zn,dangerouslySetInnerHTML:{__html:jn(y)+G.perfHTML(ge)+G.revisionHTML(y.r.revision)+G.handleHTML(y.r.handle)+G.shadowHTML(y.r.shadow,y.shadowDiff)+G.traceHTML(y.r.trace,y.r.system,y.r.traceText)+G.resultWithInterpret(y.kind==="ziwei"?G.ziweiHTML(y.r):y.kind==="bazi"?G.baziHTML(y.r)+(y.trend?G.trendHTML(y.trend,{brief:!1}):""):y.kind==="meihua"?G.meihuaHTML(y.r):y.kind==="daliuren"?G.daliurenHTML(y.r):y.kind==="qimen"?G.qimenHTML(y.r)+G.qimenFactsHTML(y.r):y.kind==="hepan"?y.r.chart==="ziwei"?G.ziweiHepanHTML(y.r):G.hepanHTML(y.r):y.kind==="tarot"?G.tarotHTML(y.r):y.kind==="liuyao"?G.liuyaoHTML(y.r):y.kind==="chenggu"?G.chengguHTML(y.r):y.kind==="almanac"?G.almanacHTML(y.r):y.kind==="zeri"?G.zeriHTML(y.r):y.kind==="trend"?G.trendHTML(y.r):y.kind==="name"?G.nameHTML(y.r):y.kind==="mbti"?G.mbtiHTML(y.r):y.kind==="fengshui"?G.fengshuiHTML(y.r):G.quickHTML(y.r),y.it,{folded:hn()})+G.caliberHTML(y.caliber)}}):null,y?p("div",{key:"bar",className:"mp-bar"},p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px"},onClick:Sn},pn||"复制文字结果"),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:An,title:"导出盘面 + 解析（含一页读懂、三张表）为 Markdown"},"导出 .md"),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:Tn,title:"生成 PNG 摘要卡（一页读懂 + 首张表），适合直接分享"},"存为摘要长图")):null,y?p("div",{key:"ask",className:"mp-askbox",style:{flexWrap:"wrap"}},p("input",{className:"mp-input",value:De,maxLength:120,placeholder:"追问：如 2027 年事业怎么样（回车提交）",onChange:a=>qa(a.target.value),onKeyDown:a=>{a.key==="Enter"&&ki()}}),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px"},onClick:ki},"追问"),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:Nn,title:"把这张盘的摘要和你的问题一起发进 DSH 对话窗，由对话里的模型接着答"},"问进对话"),V.ref?null:p("div",{key:"bridgediag",className:"mp-note",style:{marginTop:6,fontSize:11,flexBasis:"100%"}},Vt()),Na?p("div",{key:"chatnote",className:"mp-note",style:{marginTop:6,fontSize:12,flexBasis:"100%"}},Na):null):null,y?p("div",{key:"bridge",className:"mp-bridge"},p("span",{className:"mp-bridge-lbl"},V.ref?"桥可用；也可以：":"桥未就绪，改走这几档："),yi.map(([a,g,N])=>p("button",{key:a,type:"button",className:"mp-chip","data-bridge-copy":a,title:N,onClick:L=>wn(a,L.currentTarget)},g))):null,tt?p("div",{key:"fx",className:"mp-fx",dangerouslySetInnerHTML:{__html:G.followupHTML(tt)}}):null,y&&y.kind==="bazi"&&y.r.past?p("div",{key:"verify",className:"mp-verify"},p("div",{className:"mp-verify-h"},"验前事 · 过去几年的信号（只读，不改盘）"),y.r.past.rows.map(a=>p("div",{key:a.year,className:"mp-verify-row"},p("span",{className:"mp-verify-txt"},`${a.year} ${a.ganzhi} · ${a.theme}`),p("span",{className:"mp-verify-btns"},["yes","no","unsure"].map(g=>p("button",{key:g,className:"mp-chip"+(Pa[a.year]===g?" on":""),onClick:()=>Ke(Object.assign({},Pa,{[a.year]:g}))},g==="yes"?"准":g==="no"?"不准":"不确定"))))),p("div",{className:"mp-verify-foot"},p("button",{className:"mp-btn ghost",style:ji,onClick:Ln},"算贴合度"),Pe?p("span",{className:"mp-verify-fit"},`命中 ${Pe.yes}/${Pe.answered}（${Pe.level}）：${Pe.advice}`):null)):null,y&&y.kind==="bazi"?p("div",{key:"rect",className:"mp-rect"},p("div",{className:"mp-verify-h"},"生时校正 · 用过去的事反推时辰"),Re.map((a,g)=>p("div",{key:g,className:"mp-rect-row"},p("input",{className:"mp-input",type:"number",min:1900,max:2100,value:a.year,onChange:N=>nt(Re.map((L,x)=>x===g?Object.assign({},L,{year:N.target.value}):L))}),p("select",{className:"mp-input",value:a.kind,onChange:N=>nt(Re.map((L,x)=>x===g?Object.assign({},L,{kind:N.target.value}):L))},[["career","事业变动"],["wealth","财运"],["love","感情"],["move","搬迁/出行"],["health","健康"],["other","其他"]].map(([N,L])=>p("option",{key:N,value:N},L))))),p("button",{className:"mp-btn ghost",style:ji,onClick:En},"计算候选时辰"),Qe?Qe.error?p("div",{className:"mp-rect-err"},Qe.error):p("div",{className:"mp-rect-out"},p("div",{className:"mp-verify-fit"},Qe.note),Qe.candidates.slice(0,6).map(a=>p("div",{key:a.hour,className:"mp-rect-cand"+(a===Qe.best?" best":"")},`${a.label} · 时柱 ${a.hourGanzhi} · 日柱 ${a.dayGanzhi} · 命中 ${a.hits}/${a.total}`))):null):null,!y&&!ha?p("div",{key:"ph",className:"mp-dim",style:{marginTop:24,fontSize:12}},"选择体系后点「排盘」。所有计算在本机完成，不上传任何数据。"):null,p("div",{key:"fb",className:"mp-fb"},p("div",{className:"mp-fb-h"},p("span",{className:"mp-fb-t"},"用得不对、读不懂、或算得跟别家不一样？"),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"4px 10px"},onClick:zi,title:"生成一份含输入、版本、环境与结果摘要的报告，粘贴到 issue / 邮件 / 群聊即可"},_||"复制反馈报告"),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"4px 10px",marginLeft:6},onClick:()=>Cn(),title:"在浏览器打开 GitHub issue（报告已复制到剪贴板，粘进去即可）"},"开 issue")),p("div",{className:"mp-fb-b"},"邮件 1129440028@qq.com　·　GitHub issues　·　微信群 dsh-metaphysics",W?p("span",{className:"mp-fb-note"},"　"+W):null))];return p("div",{className:"mp-wrap"},Gn)}function an(s){try{if(typeof styles<"u"&&styles&&typeof styles.insert=="function")return styles.insert(s)}catch(n){console.error("[metaphysics] styles.insert 不可用，改用 DOM 注入",n)}try{const n=document.createElement("style");return n.setAttribute("data-plugin","@local/metaphysics"),n.textContent=s,document.head.appendChild(n),()=>n.remove()}catch(n){return console.error("[metaphysics] DOM 注入样式也失败",n),()=>{}}}let ai=!1;function jt(){try{const s=document.documentElement;if(!s||!document.body)return;const n=document.createElement("span");n.setAttribute("aria-hidden","true"),n.style.cssText="position:absolute;left:-9999px;top:0;width:0;height:0;pointer-events:none;background:var(--dsw-alias-brand-primary)",document.body.appendChild(n);const q=getComputedStyle(n).backgroundColor;n.remove();const D=Me&&typeof Me.pickOnColor=="function"?Me.pickOnColor(q):"";D&&s.style&&s.style.getPropertyValue("--mp-on-brand")!==D&&s.style.setProperty("--mp-on-brand",D)}catch{}}function tn(){if(!ai){ai=!0,jt();try{const s=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)");s&&typeof s.addEventListener=="function"&&s.addEventListener("change",jt)}catch{}try{typeof MutationObserver=="function"&&document.documentElement&&new MutationObserver(jt).observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]})}catch{}}}function nn(s){try{const O=an(Ii+(G&&G.CSS?G.CSS:""));typeof s.effect=="function"&&typeof O=="function"&&s.effect(()=>O)}catch(O){console.error("[metaphysics] 样式注入失败",O)}try{tn()}catch(O){console.error("[metaphysics] 字色同步失败",O)}let n=null;try{n=s&&s.slots||(s&&typeof s.get=="function"?s.get("slots"):null)}catch(O){console.error("[metaphysics] 取 slots 服务失败",O)}if(!n||typeof n.register!="function"){console.error("[metaphysics] slots 服务不可用，面板未注册");return}try{V.injectType=typeof n.inject;const O=typeof n.spec=="function"?n.spec("conversation.input.right"):null;V.spec=O?O.kind+"/"+O.scope:"未声明"}catch(O){V.spec="取声明失败",Xt(O)}const q=O=>{if(typeof O=="function")return O;if(O&&typeof O=="object"){for(const fe of["dispose","off","cancel","unregister"])if(typeof O[fe]=="function")return()=>{try{O[fe]()}catch{}}}return()=>{}},D=(O,fe)=>{try{const he=n.register(O,fe);return V.regs+=1,V.seatOk[O.name]=!0,q(he)}catch(he){return Xt(he),()=>{}}},X=(O,fe)=>{const he=()=>{const I=fe();return V.contribution=(V.contribution?V.contribution+",":"")+(O+(typeof I=="function"?" 已挂上":" 未挂上")),I};try{typeof n.inject=="function"?n.inject(O,he):he()}catch(I){console.error("[metaphysics] 等待槽位失败："+O,I);try{he()}catch(Z){console.error("[metaphysics] 直接注册也失败："+O,Z)}}};X("sidebar.panellist",()=>D({name:"sidebar.panellist",id:"metaphysics",order:20,label:()=>"命理 v"+(window.__MP_VER||"")},Yi)),X("main",()=>D({name:"main",key:"metaphysics"},O=>p(Ki,null,p(en,O))));const ie=(O,fe)=>{const he=()=>{try{const Z=n.inject(O,fe);return V.contribution=(V.contribution?V.contribution+",":"")+(O.replace("conversation.","")+(typeof Z=="function"?" 已挂上":" 未挂上")),Z}catch(Z){console.error("[metaphysics] 槽位注册失败："+O,Z);try{return fe()}catch(Y){console.error("[metaphysics] 直接注册也失败："+O,Y);return}}};let I;try{typeof s.effect=="function"?I=s.effect(he,"metaphysics: "+O):I=he()}catch(Z){console.error("[metaphysics] effect 包裹失败："+O,Z),I=he()}typeof I=="function"&&V.seatDisposers.push(I)};ie("conversation.input.right",()=>D({name:"conversation.input.right",id:"metaphysics-ask",order:40},Jt)),ie("conversation.composer.dock",()=>D({name:"conversation.composer.dock",id:"metaphysics-dock",order:60},Qt));let le=!1;const se=()=>{V.ref||le||(le=!0,V.seatOk["conversation.input.right"]||D({name:"conversation.input.right",id:"metaphysics-ask",order:40},Jt),V.seatOk["conversation.composer.dock"]||D({name:"conversation.composer.dock",id:"metaphysics-dock",order:60},Qt))};let ve=20;const t=()=>!!(V.seatOk["conversation.input.right"]&&V.seatOk["conversation.composer.dock"]),we=()=>{V.ref||ve<=0||t()||(ve-=1,se(),!t()&&setTimeout(we,700))};try{setTimeout(we,700)}catch{}try{document.addEventListener("pointerdown",()=>{le=!1,se()},{once:!0,capture:!0})}catch{}}return{inject:["slots"],apply(s){try{nn(s)}catch(n){console.error("[metaphysics] apply 异常",n)}}}}});
