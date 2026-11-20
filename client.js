window.__ModuleLoader__.load({id:"dsh-metaphysics",version:"0.86.2",factory(ht){const bt=(function(){try{return ht("react")}catch{return globalThis.React}})();if(!bt)return{inject:[],apply(){}};const d=bt.createElement,Tn={bazi:"client.chart.js",ziwei:"client.chart.js",hepan:"client.chart.js",trend:"client.chart.js",name:"client.name.js",fengshui:"client.fengshui.js",liuyao:"client.liuyao.js",meihua:"client.liuyao.js",qimen:"client.qimen.js",daliuren:"client.daliuren.js",tarot:"client.tarot.js",almanac:"client.almanac.js",convert:"client.convert.js",zeri:"client.zeri.js",chenggu:"client.chenggu.js",xiaoliuren:"client.xiaoliuren.js",qian:"client.qian.js",guanyin:"client.guanyin.js",star:"client.star.js",numerology:"client.numerology.js",mbti:"client.mbti.js",constitution:"client.constitution.js",wuyunliuqi:"client.wuyunliuqi.js",taiyi:"client.taiyi.js"},En={"client.chart.js":["core","interpret"],"client.name.js":["core"],"client.fengshui.js":["core"],"client.liuyao.js":["core","interpret"],"client.qimen.js":["core","interpret"],"client.daliuren.js":["core","interpret"],"client.tarot.js":["core","interpret"],"client.almanac.js":["core"],"client.convert.js":["core"],"client.zeri.js":["core"],"client.chenggu.js":["core"],"client.xiaoliuren.js":["core"],"client.qian.js":["core"],"client.guanyin.js":["core"],"client.star.js":["core"],"client.numerology.js":["core"],"client.mbti.js":["core"],"client.constitution.js":["core"],"client.wuyunliuqi.js":["core"],"client.taiyi.js":["core"]},Ei={core:"client.shared.js",interpret:"client.shared-interpret.js"},_n=[{key:"general",label:"综合",dim:null,focus:""},{key:"wealth",label:"财运",dim:"work",focus:"钱财进出的落点主要看「工作与职业选择」与「事业发展」这两条。"},{key:"career",label:"事业",dim:"career",focus:"事业发展这条与你的问题最直接。"},{key:"love",label:"感情",dim:"love",focus:"感情这条与你的问题最直接。"},{key:"health",label:"健康",dim:"health",focus:"健康这条与你的问题最直接；下面只作提醒，不作任何诊断。"},{key:"study",label:"学业",dim:"career",focus:"学业与考试更贴近「事业发展」这条，讲的是长期积累与阶段进展。"},{key:"travel",label:"出行",dim:"overall",focus:"出行与迁动更贴近「整体运势」这条，看的是当下这一段的大环境。"}];window.__MP_VER="0.86.2",window.__MPGroups=[{title:"问一件事",hint:"心里有一件具体的事，起一卦再决定",items:[{k:"liuyao",label:"六爻",tip:"问一件具体事，最接地气"},{k:"tarot",label:"塔罗",tip:"抽牌看选择"},{k:"meihua",label:"梅花",tip:"见闻起卦"},{k:"xiaoliuren",label:"小六壬",tip:"掐指一算"},{k:"qian",label:"福签",tip:"今天抽一支"},{k:"guanyin",label:"灵签",tip:"一事一签，可重摇"}]},{title:"看一个人",hint:"看自己或身边人的性情与格局",items:[{k:"bazi",label:"八字",tip:"看这人一辈子的大盘"},{k:"ziwei",label:"紫微",tip:"分宫细看哪方面顺哪方面堵"},{k:"hepan",label:"合盘",tip:"两人合不合"},{k:"mbti",label:"人格",tip:"16 型问卷"},{k:"constitution",label:"体质",tip:"九种体质"},{k:"trend",label:"人生K",tip:"一生走势",wide:!0}]},{title:"查日子",hint:"挑时间、换农历，看一年的气与方位",items:[{k:"almanac",label:"黄历",tip:"今日宜忌"},{k:"zeri",label:"择日",tip:"挑好日子"},{k:"convert",label:"农历",tip:"公历农历"},{k:"wuyunliuqi",label:"运气",tip:"一年大势"},{k:"fengshui",label:"风水",tip:"房屋朝向"},{k:"name",label:"起名",tip:"八字选字"}]},{title:"古籍考据",hint:"古法三式与整年气运：偏研究向，日常咨询少用",items:[{k:"qimen",label:"奇门",tip:"看方位时机"},{k:"daliuren",label:"六壬",tip:"占事断来意"},{k:"taiyi",label:"太乙",tip:"积年推局"}]}],window.__MP_UNRELEASED=0;const V={};V.DIRECTIONS=_n,V.compute=()=>{throw new Error("命理引擎尚未加载")};const Hn=Object.create(null),pn=Object.create(null);function _i(s){return Tn[s]||Tn.bazi||"client.chart.js"}const Pn=()=>typeof performance<"u"&&performance.now?performance.now():Date.now(),On={},St=Object.create(null);function Dn(s){if(On[s])return Promise.resolve();if(!St[s]){const o=Ei[s];St[s]=ht.async(`./${o}`).then(()=>{const A=globalThis.__MP_SHARED_READY__;if(!A||A[s]!==!0)throw new Error(`命理引擎共享分块 ${o} 未注册`);On[s]=!0}).catch(A=>{throw St[s]=null,A})}return St[s]}async function Hi(s){const o=En&&En[s]||["core"];await Dn("core"),o.includes("interpret")&&await Dn("interpret")}async function Pi(s){const o=_i(s);let A=Hn[o];const Y=!!A,me=Pn();if(!A){if(!ht||typeof ht.async!="function")throw new Error("当前宿主不支持客户端分块加载（require.async 缺失），请升级 DeepSeek Harness");await Hi(o);let Q=pn[o];Q||(Q=ht.async(`./${o}`).then(te=>{const ee=te&&(te.Engine||te.default);if(!ee||typeof ee.compute!="function")throw new Error(`命理引擎分块 ${o} 未返回 Engine`);return Hn[o]=ee,ee}),pn[o]=Q,Q.catch(()=>{}).then(()=>{delete pn[o]})),A=await Q}for(const Q of Object.keys(A))A[Q]!==void 0&&(V[Q]=A[Q]);return Array.isArray(V.DIRECTIONS)||(V.DIRECTIONS=_n),window.Engine=V,window.__MP_ENGINE_READY__=!0,window.__MP_LAST_LOAD={tab:s,chunk:o,cached:Y,ms:Math.round((Pn()-me)*10)/10},V}window.__mpEnsureEngine=Pi,window.Engine=V,(function(){const s={liuyao:!0,meihua:!0,daliuren:!0,tarot:!0},o=D=>!!s[D],A={general:"other",wealth:"business",career:"career",love:"love",health:"other",study:"career",travel:"action"},Y=D=>A[D]||"other",me="#ffffff",Q="#1c1a15";function te(D){const F=String(D??"").match(/rgba?\(([^)]+)\)/i);if(!F)return null;const K=F[1].split(/[,\s/]+/).filter(Boolean).map(Number);return K.length<3||K.slice(0,3).some(se=>!Number.isFinite(se))||K.length>3&&Number.isFinite(K[3])&&K[3]<.95?null:[K[0],K[1],K[2]]}function ee(D){const F=String(D||"").replace("#",""),K=F.length===3?F.split("").map(se=>se+se).join(""):F;return/^[0-9a-f]{6}$/i.test(K)?[0,2,4].map(se=>parseInt(K.slice(se,se+2),16)):null}function ve(D){const F=K=>{const se=K/255;return se<=.03928?se/12.92:Math.pow((se+.055)/1.055,2.4)};return .2126*F(D[0])+.7152*F(D[1])+.0722*F(D[2])}function ke(D,F){const K=ve(D),se=ve(F),ze=Math.max(K,se),qe=Math.min(K,se);return(ze+.05)/(qe+.05)}function Te(D){const F=typeof D=="string"?te(D):D;return F?ke(F,ee(me))>=ke(F,ee(Q))?me:Q:""}function G(D){const F=String(D??"").trim();if(!F)return{lines:null,warning:""};const K=F.split(/[^0-9]+/).filter(Boolean).map(Number),se=K.filter(ze=>![6,7,8,9].includes(ze));return K.length===6&&se.length===0?{lines:K,warning:""}:{lines:null,warning:K.length!==6?`爻值需要正好 6 个数字（当前 ${K.length} 个），本次按随机摇卦。`:`爻值只能是 6/7/8/9（收到 ${se.join("/")}），本次按随机摇卦。`}}function we(D){const F=String(D??"").trim();if(!F)return null;const K=Number(F);return Number.isFinite(K)?K:null}function W(D){const F=D instanceof Date?D:new Date,K=se=>String(se).padStart(2,"0");return`${F.getFullYear()}-${K(F.getMonth()+1)}-${K(F.getDate())}`}window.__MPCore={NEED_ASK:s,needAsk:o,parseLines:G,toNumber:we,parseRGB:te,hexToRGB:ee,luminance:ve,contrastRatio:ke,pickOnColor:Te,ON_DARK:me,ON_LIGHT:Q,kindOfDirection:Y,todayStamp:W}})(),(function(){const s=`
.pp,.mp-it,.mp-al,.mp-cg,.mp-cl,.mp-cli,.mp-kline,.mp-mb,.mp-mb-paper,.mp-nm,.mp-quick,.mp-cdiff,.mp-shadow,.mp-trace-card,.mp-trace-layer,.mp-prof{--ink:#1b1b1b;--ink2:#3f3a33;--muted:#6f6a60;--label:#696356;--faint:#726b5c;
  --line:#c8c1b2;--dimline:#b9b2a4;--hair:#e9e2d3;

  --bg:#f4f2ec;--card:#fdfdfb;--band:#f7f5ef;--hover:#eeece5;--hover2:#e6e4dc;
  --tri:#eef0ea;--soul:#f7ece9;--sel:#f5efe9;--link:#f0efe9;
  --red:#a02c26;--red-rgb:160,44,38;--env-good:#2f6b4f;--env-warn:#7d5410;--env-alt:#3a5570;--lu:#3d5a52;--lu-rgb:61,90,82;
  --quan:#6e5a2e;--quan-rgb:110,90,46;--ke:#3a5568;--ke-rgb:58,85,104;--ji:#a02c26;
  --br-good:#4c7a5c;--br-bad:#9c5b56;--on-accent:var(--on-accent);--wx-metal:#8a6b1f;
  --tg-bi:#4e5d6b;--tg-shi:#55685c;--tg-cai:#6e5a2e;--tg-guan:#8a4a42;--tg-yin:#5d5570;

  --ink3:#726b5c;--fx:"Kaiti SC",KaiTi,"STKaiti","Songti SC",serif;--sans:system-ui,-apple-system,"Microsoft YaHei",sans-serif;--kai:"Kaiti SC",KaiTi,"STKaiti",serif;
  --shadow:0 1px 2px rgba(35,28,18,.05),0 18px 40px -30px rgba(35,28,18,.42),

    --dur:150ms;--dur-fast:100ms;--ease:cubic-bezier(.32,.72,.24,1);
    --r-sm:6px;--r-md:10px;--r-lg:14px;

    --cg-top-a:#c9a227;--cg-top-b:#e6b84c;--cg-good-a:#2e7d5b;--cg-good-b:#4caf87;--cg-mid-a:#5b6b9d;--cg-mid-b:#7d8fc4;--cg-weak-a:#a1702d;--cg-weak-b:#c9924f;--cg-low-a:#8a4a4a;--cg-low-b:#b06a6a;
    --glow:0 0 0 1px rgba(var(--lu-rgb),.25),0 0 12px rgba(var(--lu-rgb),.12)}

.pp{border:1px solid var(--line);background:var(--bg);color:var(--ink);font-family:"Songti SC","SimSun","Microsoft YaHei",serif;font-size:12.5px;line-height:1.55;
  border-radius:12px;overflow:hidden;box-shadow:var(--shadow);container-type:inline-size}

@media screen and (prefers-color-scheme:dark){
  .pp,.mp-it,.mp-al,.mp-cg,.mp-cl,.mp-cli,.mp-kline,.mp-mb,.mp-mb-paper,.mp-nm,.mp-quick,.mp-cdiff,.mp-shadow,.mp-trace-card,.mp-trace-layer,.mp-prof{--ink:#eae5d9;--ink2:#d5cfc2;--muted:#aca598;--label:#a49c8e;--faint:#928b7e;
    --line:#514a3e;--dimline:#5f5849;--hair:#2f2b23;

    --bg:#131311;--card:#1f1f1c;--band:#26261f;--hover:#2c2c26;--hover2:#35352c;
    --tri:#2a2e28;--soul:#332521;--sel:#322d27;--link:#2c2b25;
    --red:#e08a7a;--red-rgb:224,138,122;--env-good:#6dc79a;--env-warn:#e0a860;--env-alt:#9aa2ea;--lu:#8fb8a8;--lu-rgb:143,184,168;
    --quan:#c9a96a;--quan-rgb:201,169,106;--ke:#8aadc0;--ke-rgb:138,173,192;--ji:#e08a7a;
    --br-good:#79c79a;--br-bad:#e09a8c;--on-accent:#14130f;--wx-metal:#dcb273;
    --tg-bi:#93b7cf;--tg-shi:#8fbb9d;--tg-cai:#d3ae62;--tg-guan:#d98d84;--tg-yin:#b4a4d0;
    --ink3:#a9a193;
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

.pp-soul{box-shadow:inset 0 0 0 2px rgba(var(--red-rgb),.35);background:linear-gradient(180deg,rgba(var(--red-rgb),.05),transparent 60%)}
.pp-soul:hover,.pp-soul:focus-visible{background:var(--card);box-shadow:inset 0 0 0 2px rgba(var(--red-rgb),.4),var(--glow)}

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

.pp-m.view{background:transparent;box-shadow:inset 0 0 0 1px currentColor}
.pp-m.view.lu{color:var(--lu)}.pp-m.view.quan{color:var(--quan)}.pp-m.view.ke{color:var(--ke)}.pp-m.view.ji{color:var(--ji)}

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

.pp-shen::after{content:"身";position:absolute;top:4px;left:4px;font-size:12px;color:var(--on-accent);background:var(--muted);padding:0 3px;border-radius:2px;z-index:1}

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

.tg-bi{color:var(--tg-bi)}.tg-shi{color:var(--tg-shi)}.tg-cai{color:var(--tg-cai)}.tg-guan{color:var(--tg-guan)}.tg-yin{color:var(--tg-yin)}
.wx-wood{color:var(--lu)}.wx-fire{color:var(--red)}.wx-earth{color:var(--quan)}.wx-metal{color:var(--wx-metal)}.wx-water{color:var(--ke)}
.bz-zhuri{color:var(--red);font-weight:700}
.pp-rel{margin-top:10px;font-size:13px;line-height:1.9}
.pp-rel b{color:var(--muted);font-weight:400;margin-right:10px}
.pp-str{margin-top:10px;font-size:13px;line-height:1.8}
.pp-str b{color:var(--red);font-size:15px;margin:0 4px}
.pp-drel{font-style:normal;color:var(--red);font-size:12px}

.pp-struct{margin-top:6px;font-size:12.5px;line-height:1.75;color:var(--ink2)}
.pp-struct .pp-st-code{font-weight:700;letter-spacing:.06em;color:var(--ink);margin-right:6px}
.pp-struct .pp-st-odd{color:var(--quan)}
.pp-anhe{margin-top:6px;font-size:12.5px;line-height:1.75;color:var(--ink2)}
.pp-anhe b{color:var(--muted);font-weight:400;margin-right:8px}
.pp-dim{color:var(--muted)}

.pp-sy-src{margin-top:6px;font-size:11.5px;line-height:1.55}
.pp-r{display:none}
.pp-modes{display:flex;align-items:center;border-bottom:1px solid var(--line);font-family:system-ui,sans-serif}

.pp-modes label{min-height:44px;display:inline-flex;align-items:center;padding:3px 20px;font-size:12.5px;color:var(--muted);cursor:pointer;border-right:1px solid var(--line);user-select:none}
.pp-modes label:hover{background:var(--hover2)}

.pp-soon{margin-left:auto;padding-right:10px;font-size:12px;color:var(--muted)}
.pp-body{display:none}

.pp-cal{display:flex;align-items:center;gap:5px;font-size:11px;color:var(--muted);padding:2px 2px 4px;line-height:1.5;flex-wrap:wrap}
.pp-cal b{font-weight:600;color:var(--ink2)}
.pp-cal .cal-sep{color:var(--faint)}
.pp-cal .cal-sc::after{content:"四化派"}
#ppm-sc-feixing:checked~.pp-body .pp-cal .cal-sc::after{content:"飞星派"}
#ppm-sc-sanhe:checked~.pp-body .pp-cal .cal-sc::after{content:"三合派"}

#ppm-sc-feixing:checked~.pp-body .pp-grid,
#ppm-sc-sanhe:checked~.pp-body .pp-grid{animation:ppSchoolIn .3s ease-out}
@keyframes ppSchoolIn{from{opacity:.55}to{opacity:1}}
#ppm-ben:checked~.pp-body.ben,#ppm-da:checked~.pp-body.da,#ppm-ln:checked~.pp-body.ln{display:block}
#ppm-ben:checked~.pp-modes label[for="ppm-ben"],#ppm-da:checked~.pp-modes label[for="ppm-da"],#ppm-ln:checked~.pp-modes label[for="ppm-ln"]{background:var(--red);color:var(--on-accent)}

.pp-time{border-top:none}
.pp-time label{min-height:32px;padding:2px 13px;font-size:12px;color:var(--muted)}
#ppm-t-month:checked~.pp-time label[for="ppm-t-month"],
#ppm-t-day:checked~.pp-time label[for="ppm-t-day"],
#ppm-t-hour:checked~.pp-time label[for="ppm-t-hour"]{background:var(--lu);color:var(--on-accent)}
.pp-tri{background:var(--tri)}
.pp-soul{background:var(--soul)}

.pp-schools{border-top:none}
.pp-schools label{min-height:38px;padding:2px 16px;font-size:12px}
#ppm-sc-sihe:checked~.pp-schools label[for="ppm-sc-sihe"],
#ppm-sc-feixing:checked~.pp-schools label[for="ppm-sc-feixing"],
#ppm-sc-sanhe:checked~.pp-schools label[for="ppm-sc-sanhe"]{background:var(--lu);color:var(--on-accent)}

.pp-fx{display:none;margin-top:3px;font-size:10.5px;line-height:1.55;color:var(--muted);border-top:1px dashed var(--hair);padding-top:2px}
.pp-fx i{font-style:normal;white-space:nowrap;margin-right:4px}
.pp-fx i em{font-style:normal;color:var(--faint)}
#ppm-sc-feixing:checked~.pp-body .pp-fx{display:block}

.pp-hs{display:none;margin-top:3px;font-size:10.5px;line-height:1.55;color:var(--muted);border-top:1px dashed var(--hair);padding-top:2px}
.pp-hs i{font-style:normal;white-space:nowrap;margin-right:4px}
.pp-hs i em{font-style:normal;color:var(--faint)}
#ppm-d-hs:checked~.pp-body .pp-hs{display:block}

.pp-rigan{display:none;margin-top:6px;padding:5px 11px;border:1px solid var(--line);background:var(--band);font-size:12px;line-height:1.7;color:var(--muted)}
.pp-rigan b{color:var(--ink);font-weight:600;margin-right:8px}
.pp-rigan i{font-style:normal;margin-right:10px;white-space:nowrap}
.pp-rigan i em{font-style:normal}
.pp-rigan i .rl{color:var(--lu)}.pp-rigan i .rq{color:var(--quan)}.pp-rigan i .rk{color:var(--ke)}.pp-rigan i .rj{color:var(--ji)}
#ppm-d-rigan:checked~.pp-rigan{display:block}
#ppm-sc-feixing:checked~.pp-body .pp-m.view,
#ppm-sc-feixing:checked~.pp-body .pp-viewhua{display:none}

#ppm-sc-sanhe:checked~.pp-body .pp-m,
#ppm-sc-sanhe:checked~.pp-body .pp-zha,
#ppm-sc-sanhe:checked~.pp-body .pp-viewhua,
#ppm-sc-sanhe:checked~.pp-flywrap{display:none}

.pp-zha{display:inline-block;margin-right:3px;vertical-align:-1px;line-height:0;cursor:help}
.pp-zha .z-a{width:19px;height:8px;display:block;overflow:visible}
.pp-zha .z-shaft{fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round}
.pp-zha .z-head{fill:currentColor;stroke:none}
.pp-zha.lu{color:var(--lu)}.pp-zha.quan{color:var(--quan)}
.pp-zha.ke{color:var(--ke)}.pp-zha.ji{color:var(--ji)}
#ppm-sc-sihe:checked~.pp-flywrap{display:block}
#ppm-sc-feixing:checked~.pp-flywrap{display:block}

.pp-zhlegend{display:flex;gap:10px;align-items:center;justify-content:center;font-size:12px;color:var(--muted);margin-top:4px}
.pp-zhlegend i{font-style:normal;font-weight:600}
.pp-zhlegend .z-lu{color:var(--lu)}.pp-zhlegend .z-quan{color:var(--quan)}
.pp-zhlegend .z-ke{color:var(--ke)}.pp-zhlegend .z-ji{color:var(--ji)}

.pp-paper{position:relative}
.pp::before{content:"";position:absolute;inset:0;pointer-events:none;z-index:0;opacity:.5;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='2' seed='7'/%3E%3CfeColorMatrix values='0 0 0 0 0.32 0 0 0 0 0.29 0 0 0 0 0.24 0 0 0 0.10 0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23p)'/%3E%3C/svg%3E")}
.pp>*{position:relative;z-index:1}
.pp-borrow{font-size:9.5px;color:var(--muted);margin-top:1px;letter-spacing:.02em}

.pp-cell{cursor:pointer;transition:background .14s ease,box-shadow .14s ease;outline:none}
.pp-cell:hover{background:var(--hover)}

.pp-cell:focus-visible{box-shadow:inset 0 0 0 2px var(--red)}
.pp-cell.pp-sel{background:var(--sel);box-shadow:inset 0 0 0 2px rgba(var(--red-rgb),.55)}

.pp-sf{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2}
.pp-sf line{stroke:var(--ink);stroke-width:1.2px;stroke-dasharray:3 2.4;opacity:.38;vector-effect:non-scaling-stroke}
.pp-sf circle{fill:var(--ink);opacity:.45}

.pp-cell.pp-link{background:var(--link);box-shadow:inset 0 0 0 1.5px rgba(var(--red-rgb),.3)}
.pp-detail{display:none;border-top:1px solid var(--line);background:var(--card);padding:11px 14px 13px;font-family:system-ui,sans-serif}
.pp-detail.open{display:block}
.pp-detail .dt-dh{display:flex;align-items:center;flex-wrap:wrap;gap:4px 10px;padding-bottom:6px;margin-bottom:7px;border-bottom:1px dashed var(--line)}
.pp-detail .dt-dh b{font-size:15.5px;color:var(--red);letter-spacing:.04em}
.pp-detail .dt-dh span{font-size:12.5px;color:var(--muted)}
.pp-detail .dt-dh .dt-x{margin-left:auto;font-size:12.5px;color:var(--muted);border:none;background:none;text-decoration:underline;text-decoration-style:dotted;text-underline-offset:3px;min-height:44px;min-width:48px;display:inline-flex;align-items:center;justify-content:center;padding:0 10px;cursor:pointer;user-select:none}
.pp-detail .dt-dh .dt-x:hover{color:var(--red)}

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

.mp-hex{display:block;width:104px;height:12px;flex:0 0 auto;color:var(--ink);overflow:visible}
.mp-hex.hex-on{color:var(--red)}
.mp-hex.dim{color:var(--dimline)}
.mp-hex.sm{width:74px;height:9px}
.mp-hex.md{width:88px;height:10px}

.mp-hy-ln{display:flex;align-items:center;gap:4px;min-width:0}
.mp-hy-mv{flex:0 0 10px;font-style:normal;font-size:11px;line-height:1;color:var(--red);text-align:center}

.mp-wxi{display:inline-block;width:12px;height:12px;vertical-align:-2px;margin-right:3px;flex:0 0 auto}

.mp-trig{display:inline-block;width:14px;height:10px;vertical-align:-1px;margin-right:4px;color:currentColor}

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

.mp-curve{margin-top:8px;border:1px solid var(--line);border-radius:8px;background:var(--card);padding:10px 12px 8px}
.mp-curve-h{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;font-size:12px;color:var(--label);font-family:system-ui,sans-serif;margin-bottom:4px}
.mp-curve-h b{font-size:12.5px;color:var(--ink);font-weight:600}
.mp-curve-h span{font-size:11.5px;color:var(--muted)}
.mp-curve svg{display:block;width:100%;height:auto;overflow:visible}

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

@media (max-width:520px){.mp-curve .cv-lbl.age{font-size:9px}}

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

.mp-it{margin-top:14px;border:1px solid var(--line);background:var(--bg);color:var(--ink);border-radius:12px;overflow:hidden;box-shadow:var(--shadow);container-type:inline-size;
  font-family:"Songti SC","SimSun","Microsoft YaHei",serif;font-size:13px;line-height:1.75}
.mp-it *{box-sizing:border-box}

.mp-it-head{display:flex;align-items:center;gap:9px;flex-wrap:wrap;width:100%;padding:12px 16px;border:none;border-bottom:1px solid var(--line);background:var(--card);color:inherit;font:inherit;font-family:inherit;text-align:left;cursor:pointer;-webkit-appearance:none;appearance:none}
.mp-it-head:hover{background:var(--band)}
.mp-it-head:focus-visible{outline:2px solid var(--red);outline-offset:-3px}
.mp-it-arrow{flex:none;font-size:12px;line-height:1;color:var(--red);transition:transform .16s ease}
.mp-it.folded .mp-it-arrow{transform:rotate(-90deg)}
.mp-it.folded .mp-it-wrap{display:none}
.mp-it-hint{margin-left:auto;font-size:12px;color:var(--muted);font-family:system-ui,sans-serif}
.mp-it-title{font-size:15px;font-weight:700;letter-spacing:.08em;color:var(--red)}
.mp-it-tag{font-size:12px;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:1px 9px;font-family:system-ui,sans-serif}

.mp-it-ask{padding:10px 16px;background:var(--band);border-bottom:1px dashed var(--line);font-size:13px;line-height:1.8;color:var(--ink2);font-family:system-ui,sans-serif}
.mp-it-ask .ask-q{font-weight:600;color:var(--ink)}

.mp-it-ask .ask-sep{color:var(--muted);margin:0 7px}
.mp-it-ask .ask-d{color:var(--lu)}

.mp-it-focus{margin-left:6px;font-size:12px;color:var(--lu);border:1px solid rgba(var(--lu-rgb),.35);border-radius:999px;padding:1px 9px;font-family:system-ui,sans-serif}
.mp-it-dim.focus{background:linear-gradient(90deg,rgba(var(--lu-rgb),.06),transparent 60%);border-left:2px solid var(--lu);padding-left:10px}
.mp-it-lead{padding:11px 16px;font-size:13px;color:var(--ink2);border-bottom:1px dashed var(--line)}

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

.mp-askcopy-row{display:flex;align-items:center;gap:8px;margin:8px 0 0;padding:0;flex-wrap:wrap}
.mp-askcopy{border:1px solid var(--red);background:transparent;color:var(--red);font:inherit;font-size:12px;padding:4px 11px;border-radius:999px;cursor:pointer;transition:background .14s,color .14s}
.mp-askcopy:hover{background:var(--red);color:var(--on-accent)}
.mp-askcopy-hint{color:var(--muted);font-size:11.5px}

.pp-warn{margin:8px 0 0;padding:7px 10px;border:1px solid color-mix(in srgb,var(--quan) 34%,var(--line));border-radius:8px;background:color-mix(in srgb,var(--quan) 10%,transparent);color:var(--ink2);font-size:11.5px;line-height:1.55}

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

.mp-it-limits{margin:0 16px 12px;font-size:12px;line-height:1.85;color:var(--muted);border-top:1px dashed var(--line);padding-top:8px}
.mp-it-limits summary{cursor:pointer;font-family:system-ui,sans-serif;letter-spacing:.06em;color:var(--label);margin-bottom:6px}
.mp-it-limits div{margin-bottom:7px}
.mp-it-limits b{display:block;color:var(--ink2);font-weight:600;margin-bottom:1px}

.mp-it-err{margin:12px 16px;padding:9px 12px;border-left:2px solid var(--red);background:var(--soul);font-size:12.5px;line-height:1.8;color:var(--ink2)}
.mp-it-err b{color:var(--red);margin-right:6px}
.mp-it-body{padding:2px 16px 12px}
.mp-it-dim{padding:12px 0;border-bottom:1px dashed var(--line)}
.mp-it-dim:last-of-type{border-bottom:none}
.mp-it-dh{display:flex;align-items:center;gap:8px;margin-bottom:6px}
.mp-it-dno{flex:none;width:20px;height:20px;border-radius:50%;background:var(--red);color:var(--on-accent);font-size:12px;display:flex;align-items:center;justify-content:center;font-family:system-ui,sans-serif}
.mp-it-dlabel{font-size:14.5px;font-weight:700;letter-spacing:.04em}
.mp-it-dtext{font-size:13px;line-height:1.9;text-align:justify}

.mp-it-dev{margin-top:7px;font-size:12px;line-height:1.75;color:var(--muted)}
.mp-it-dev b{color:var(--label);font-weight:600;margin-right:7px;font-family:system-ui,sans-serif;font-size:11px;letter-spacing:.1em}
.mp-it-adv{margin-top:8px;padding:9px 12px;background:var(--band);border-left:2px solid var(--red);font-size:13px;line-height:1.85}

.mp-it-know{margin-top:8px;display:flex;flex-direction:column;gap:6px}
.know-row{display:flex;gap:8px;align-items:flex-start;font-size:12px;line-height:1.8;color:var(--ink2)}
.know-status{flex:none;margin-top:2px;padding:1px 6px;border-radius:4px;font-size:10.5px;letter-spacing:.04em;font-family:system-ui,sans-serif;border:1px solid var(--line);color:var(--muted);white-space:nowrap}

.know-status.settled{color:var(--good)}
.know-status.variant{color:var(--warn)}
.know-status.todo{color:var(--red)}
.know-body b{display:block;font-size:12.5px;color:var(--ink);font-weight:600;margin-bottom:2px}
.know-body i{display:block;font-style:normal;color:var(--muted);font-size:11.5px;margin-top:2px}
.know-body em{display:block;font-style:normal;color:var(--warn);font-size:11.5px;margin-top:2px}

.know-disc{margin-top:2px;padding-top:8px;border-top:1px dashed var(--line);font-size:11.5px;line-height:1.7;color:var(--muted)}
.mp-it-adv b{color:var(--red);font-weight:600;margin-right:7px;font-family:system-ui,sans-serif;font-size:12px;letter-spacing:.1em}
.mp-it-secs{border-top:1px solid var(--line);padding:12px 16px 2px;background:var(--card)}
.mp-it-sec{margin-bottom:11px}
.mp-it-sh{font-size:13px;font-weight:700;color:var(--lu);letter-spacing:.06em;margin-bottom:4px}
.mp-it-stext{font-size:13px;line-height:1.9;color:var(--ink2);text-align:justify}

.mp-it-sec.tone-good,.mp-it-sec.tone-watch,.mp-it-sec.tone-bad{padding-left:8px}
.mp-it-sec.tone-good{border-left:2px solid var(--lu)}
.mp-it-sec.tone-watch{border-left:2px solid var(--quan)}
.mp-it-sec.tone-bad{border-left:2px solid var(--red)}
.mp-it-sec.tone-good .mp-it-sh{color:var(--lu)}
.mp-it-sec.tone-watch .mp-it-sh{color:var(--quan)}
.mp-it-sec.tone-bad .mp-it-sh{color:var(--red)}

.mp-it-p{margin:0 0 5px}
.mp-it-p:last-child{margin-bottom:0}

.mp-it-method{border-top:1px dashed var(--line);padding-top:9px;margin-top:2px}

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

.mp-sig{margin-top:10px;padding-top:9px;border-top:1px solid var(--line);display:flex;flex-wrap:wrap;align-items:center;gap:4px 10px;font-size:11.5px;line-height:1.7;color:var(--muted);font-family:system-ui,sans-serif}
.mp-sig-brand{color:var(--ink2);font-weight:600;letter-spacing:.04em}
.mp-sig-brand i{font-style:normal;color:var(--faint);font-weight:400;margin-left:5px}
.mp-sig-btn{border:0;background:transparent;padding:2px 0;margin:0;font:inherit;color:var(--lu);cursor:pointer;border-bottom:1px dotted rgba(var(--lu-rgb),.5)}
.mp-sig-btn:hover{color:var(--ink)}
.mp-sig-btn[disabled]{color:var(--faint);cursor:default;border-bottom-color:transparent}
.mp-sig-msg{color:var(--muted);min-height:0}
.mp-sig-qr{display:none;flex:0 0 100%;align-items:center;gap:10px;margin-top:2px}
.mp-sig-qr.on{display:flex}
.mp-sig-qr img{width:132px;height:132px;display:block;border:1px solid var(--line);border-radius:4px;flex:none}
.mp-sig-qr span{color:var(--muted);max-width:210px}

.mp-sig-qr[data-qr-for="wx"] img{width:240px;height:240px}
.mp-sig-note{color:var(--faint)}

@media print{.mp-sig-qr{display:none!important}}

.mp-it-knowref{margin-top:7px;font-size:11.5px;font-family:system-ui,sans-serif}
.mp-it-knowref a{color:var(--muted);text-decoration:none;border-bottom:1px dashed var(--line)}
.know-flag{margin-left:8px;color:var(--quan);font-size:11px}
.know-dim{font-style:normal;color:var(--muted);font-size:11px;margin-right:6px;font-family:system-ui,sans-serif}
.mp-it-p b{color:var(--ink);font-weight:700;letter-spacing:.02em}

.mp-outline{margin:12px 16px 0;border:1px solid var(--line);border-left:3px solid var(--lu);border-radius:8px;background:var(--card);padding:10px 12px}
.mp-outline-h{font-size:12px;font-weight:700;letter-spacing:.12em;color:var(--lu);margin-bottom:6px;font-family:system-ui,sans-serif}
.mp-outline-row{display:grid;grid-template-columns:56px minmax(0,1fr);gap:8px;padding:3px 0;font-size:13px;line-height:1.7;color:var(--ink2)}
.mp-outline-row b{color:var(--label);font-weight:600;font-family:system-ui,sans-serif}

.mp-toc{display:flex;flex-wrap:wrap;gap:6px 10px;margin:10px 16px 0;padding:8px 10px;border:1px dashed var(--line);border-radius:8px;font-size:12px;font-family:system-ui,sans-serif}
.mp-toc a{color:var(--lu);text-decoration:none;border-bottom:1px dotted rgba(var(--lu-rgb),.5)}
.mp-toc a:hover{color:var(--ink)}

.mp-it-ev{margin-top:7px;border:1px solid var(--line);border-radius:6px;background:var(--band);font-size:12px;font-family:system-ui,sans-serif}
.mp-it-ev>summary{cursor:pointer;padding:6px 9px;color:var(--muted);list-style:none}
.mp-it-ev>summary::-webkit-details-marker{display:none}
.mp-it-ev>summary::before{content:'▸ ';color:var(--label)}
.mp-it-ev[open]>summary::before{content:'▾ '}
.mp-it-ev-body{padding:2px 9px 8px;display:flex;flex-direction:column;gap:4px}
.mp-it-ev-item{color:var(--ink2);line-height:1.7;padding-left:12px;position:relative}
.mp-it-ev-item::before{content:'·';position:absolute;left:2px;color:var(--label)}
.mp-it-ev-tech{margin-top:4px;color:var(--label);font-size:11px;letter-spacing:.06em}

.mp-it-conf{font-size:11px;font-family:system-ui,sans-serif;border-radius:999px;padding:1px 8px;margin-left:6px;border:1px solid var(--line);color:var(--muted)}
.mp-it-conf.c-强{color:var(--lu);border-color:rgba(var(--lu-rgb),.4)}
.mp-it-conf.c-中{color:var(--label);border-color:var(--line)}
.mp-it-conf.c-弱{color:var(--red);border-color:rgba(var(--red-rgb),.4)}

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

.mp-shortid{margin:6px 0 0;font-size:11.5px;line-height:1.6;color:var(--faint);letter-spacing:.02em;font-family:system-ui,sans-serif}

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

.mp-tables{border-top:1px solid var(--line);padding:12px 16px 4px;background:var(--card)}
.mp-table-wrap{margin-bottom:12px}
.mp-table-h{font-size:12px;font-weight:700;letter-spacing:.1em;color:var(--lu);margin-bottom:5px;font-family:system-ui,sans-serif}
.mp-table-scroll{overflow-x:auto;border:1px solid var(--line);border-radius:8px}
.mp-table{width:100%;border-collapse:collapse;font-size:12px;line-height:1.6;color:var(--ink2);font-family:system-ui,sans-serif}
.mp-table th,.mp-table td{padding:5px 9px;text-align:left;vertical-align:top;border-bottom:1px solid var(--line);white-space:nowrap}

.mp-table th{background:var(--band);color:var(--ink2);font-weight:600;font-size:11px;letter-spacing:.06em}
.mp-table tbody tr:last-child td{border-bottom:none}
.mp-table tbody tr:nth-child(even) td{background:rgba(0,0,0,.02)}

@media print{
  .mp-toc{display:none}
  .mp-it.folded .mp-it-wrap{display:block}
  .mp-table-scroll{overflow:visible}
  .mp-table th,.mp-table td{white-space:normal}
  .mp-table-wrap,.mp-it-sec,.mp-it-dim{break-inside:avoid}
  .mp-table-wrap{page-break-inside:avoid}
}

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

  .mp-cross-b{grid-template-columns:1fr;gap:6px}
  .mp-cross-cell b{display:inline;margin-right:6px;letter-spacing:.06em}
  .mp-toc{flex-wrap:nowrap;overflow-x:auto;gap:8px;margin:10px 0 0;padding:6px 11px;border:0;border-bottom:1px solid var(--line);border-radius:0;scrollbar-width:none}
  .mp-toc::-webkit-scrollbar{display:none}
  .mp-toc a{flex:0 0 auto;display:inline-flex;align-items:center;min-height:44px;padding:0 12px;border:1px solid var(--line);border-radius:999px;color:var(--lu);text-decoration:none}
  .mp-toc a:hover{color:var(--ink)}
  .mp-it-ev>summary{display:flex;align-items:center;min-height:44px;padding:0 9px}
  .mp-it-gloss summary{display:flex;align-items:center;min-height:44px;margin-bottom:2px}
}

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

.mp-fu{margin:12px 16px;border:1px solid var(--line);border-left:3px solid var(--lu);border-radius:8px;background:var(--card);padding:10px 12px;font-size:13px;line-height:1.8;color:var(--ink2)}
.mp-fu.miss{border-left-color:var(--red)}
.mp-fu-h{font-size:12px;font-weight:700;letter-spacing:.08em;color:var(--lu);margin-bottom:4px;font-family:system-ui,sans-serif}
.mp-fu.miss .mp-fu-h{color:var(--red)}
.mp-fu-ev{margin-top:5px;font-size:12px;color:var(--muted);font-family:system-ui,sans-serif}
.mp-quick{margin:12px 16px;border:1px solid var(--line);border-radius:8px;background:var(--card);padding:12px 14px}

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

@media (max-width:640px){
  .pp-modes{flex-wrap:wrap}
  .pp-modes label{padding:6px 16px}
  .pp-soon{margin-left:0;padding:6px 10px;width:100%;border-top:1px solid var(--line)}

  .pp-grid{grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,minmax(0,auto));gap:0;padding:0;--zw-l1:11px;--zw-l2:9.5px;--zw-l3:8.5px;--zw-l4:8.5px}
  .pp-cell{min-height:0;padding:3px 2px 4px;border-radius:0}
  .pp-center{grid-column:2/4;grid-row:2/4;order:0;border-radius:0;padding:5px 3px;gap:2px}
  .pp-center .ct-t1{font-size:12px;margin-bottom:2px;letter-spacing:.02em}
  .pp-center .ct-t2{font-size:9px;line-height:1.4}
  .pp-center .ct-t3{font-size:10.5px;letter-spacing:.16em;margin:2px 0}
  .pp-center .ct-t4{font-size:9px;line-height:1.45}
  .pp-center .pp-legend{font-size:8.5px;gap:4px;margin-top:3px;flex-wrap:wrap;line-height:1.4}

  .pp-stars{flex-direction:column;flex-wrap:nowrap;align-items:flex-start;justify-content:flex-start;gap:1px;line-height:1.4;min-height:0}
  .pp-st.main{font-size:var(--zw-l1)}
  .pp-st.good,.pp-st.bad,.pp-st.aux{font-size:var(--zw-l2)}
  .pp-st.minor{font-size:var(--zw-l3)}
  .pp-m{font-size:8.5px;padding:0 1px;vertical-align:0}
  .pp-b{font-size:10px;margin-left:3px;opacity:.9}
  .pp-ages{font-size:var(--zw-l4);line-height:1.45;margin-top:2px;word-break:break-all}
  .pp-foot{font-size:var(--zw-l4);line-height:1.4;gap:2px}
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

@container (max-width:640px){
  .pp-modes{flex-wrap:wrap}
  .pp-modes label{padding:6px 16px}
  .pp-soon{margin-left:0;padding:6px 10px;width:100%;border-top:1px solid var(--line)}

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

  .pp-cell{padding:2px 1px 3px}
  .pp-st.main{font-size:10px}
  .pp-st.good,.pp-st.bad,.pp-st.aux{font-size:9px}
  .pp-foot .ft-pn{font-size:10px}
  .pp-center .ct-t1{font-size:11px}
  .pp-center .ct-t2,.pp-center .ct-t4{font-size:8.5px}
  .mp-dl-sc-c{min-width:80px}

  .mp-hy-box{padding:10px 10px 12px}
  .mp-hy-row{grid-template-columns:12px 30px minmax(56px,1fr) 42px 38px 28px;gap:4px;font-size:11.5px}
  .mp-hy-row.hy-plain{grid-template-columns:28px minmax(56px,1fr);gap:6px}
}

@container (max-width:430px){
  .pp-cell{padding:2px 1px 3px}
  .pp-st.main{font-size:10px}
  .pp-st.good,.pp-st.bad,.pp-st.aux{font-size:9px}
  .pp-foot .ft-pn{font-size:10px}
  .pp-center .ct-t1{font-size:11px}
  .pp-center .ct-t2,.pp-center .ct-t4{font-size:8.5px}
  .mp-dl-sc-c{min-width:80px}

  .mp-hy-box{padding:10px 10px 12px}
  .mp-hy-row{grid-template-columns:12px 30px minmax(56px,1fr) 42px 38px 28px;gap:4px;font-size:11.5px}
  .mp-hy-row.hy-plain{grid-template-columns:28px minmax(56px,1fr);gap:6px}
}

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

@media (hover:none){.mp-prof-ops{display:flex}.mp-prof-nm{padding-right:0}}
.mp-prof-empty{margin:0;padding:10px 12px;border:1px solid var(--hair,var(--line));border-radius:10px;background:var(--panel2);
  font-size:12px;color:var(--muted);background:var(--band)}
.mp-prof-bar{display:flex;align-items:center;gap:8px;margin-top:9px;flex-wrap:wrap}
.mp-prof-bar input{font:inherit;font-size:12.5px;padding:6px 9px;border-radius:9px;border:1px solid var(--line);
  background:var(--card);color:var(--ink);min-width:0;flex:1 1 150px;max-width:220px}
.mp-prof-bar button{font:inherit;font-size:12.5px;padding:6px 12px;border-radius:9px;cursor:pointer;
  border:1px solid var(--red);background:var(--red);color:var(--on-accent)}
.mp-prof-bar button.ghost{background:transparent;color:var(--muted);border-color:var(--line)}
.mp-prof-bar .mp-prof-tip{font-size:11.5px;color:var(--muted)}
@media (max-width:360px){.mp-prof-list{grid-template-columns:repeat(auto-fill,minmax(140px,1fr))}}

@media (prefers-reduced-motion: reduce){
  .pp *,.mp-it *,.mp-al *,.mp-btn,.mp-chip{transition:none!important;animation:none!important}
}

.pp table tbody tr{transition:background var(--dur-fast) var(--ease)}
.pp table tbody tr:hover{background:var(--hover)}

.pp{transition:box-shadow var(--dur) var(--ease)}

.pp-disp{font-family:var(--sans);border-bottom:1px solid var(--line);background:var(--band);font-size:12px}
.pp-disp>summary{cursor:pointer;padding:5px 12px;color:var(--muted);user-select:none;list-style:none;min-height:32px;display:flex;align-items:center}
.pp-disp>summary::-webkit-details-marker{display:none}
.pp-disp>summary::before{content:"▸";margin-right:6px;font-size:10px;color:var(--label)}
.pp-disp[open]>summary::before{content:"▾"}
.pp-disp-g{display:flex;flex-wrap:wrap;gap:2px 14px;padding:3px 12px 8px;border-top:1px dashed var(--hair)}

.pp-preset{display:flex;align-items:center;gap:6px;flex-wrap:wrap;padding:7px 12px 1px;font-size:11.5px;color:var(--label)}
.pp-preset span{letter-spacing:.06em}
.pp-preset button{font:inherit;font-size:11.5px;padding:2px 11px;border:1px solid var(--line);border-radius:999px;background:var(--card);color:var(--ink2);cursor:pointer;min-height:26px}
.pp-preset button:hover{border-color:var(--lu)}
.pp-preset button.on{background:var(--lu);color:var(--on-accent);border-color:var(--lu)}
.pp-disp-g>span{width:100%;font-size:11px;color:var(--label);letter-spacing:.06em;margin-bottom:1px}
.pp-disp label{display:inline-flex;align-items:center;gap:5px;cursor:pointer;color:var(--ink2);user-select:none;padding:2px 0;min-height:26px}
.pp-disp-box{width:13px;height:13px;border:1px solid var(--line);border-radius:3px;background:var(--card);display:inline-block;flex:none}
.pp-disp label:hover .pp-disp-box{border-color:var(--lu)}

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

#ppm-d-ss:not(:checked)~.pp-body .pp-ss-txt{display:none}
#ppm-d-sbg:not(:checked)~.pp-body .pp-st.st-sbg{display:none}
#ppm-d-zha:not(:checked)~.pp-body .pp-zha{display:none}
#ppm-d-zha:not(:checked)~.pp-zhlegend{display:none}
#ppm-d-ages:not(:checked)~.pp-body .pp-ages{display:none}
#ppm-d-sizhu:not(:checked)~.pp-body .ct-t3{display:none}

.ct-t3nj{font-size:11.5px;letter-spacing:.2em;font-weight:500;color:var(--muted)}
.ct-t3nj .nj-tag{font-style:normal;letter-spacing:.08em;font-size:10px;color:var(--lu);border:1px solid currentColor;border-radius:3px;padding:0 3px;margin-left:6px;vertical-align:1px}
#ppm-d-njq:not(:checked)~.pp-body .ct-t3nj{display:none}

#ppm-d-tjz:not(:checked)~.pp-body .pp-detail .dt-taiji{display:none}

#ppm-d-small:not(:checked)~.pp-body .pp-st.aux,#ppm-d-small:not(:checked)~.pp-body .pp-st.minor{display:none}
#ppm-d-shen:not(:checked)~.pp-body .pp-shen::after{display:none}
#ppm-d-hua:not(:checked)~.pp-body .pp-m{display:none}
#ppm-d-sf:not(:checked)~.pp-body .pp-cell.pp-tri{background:var(--bg)}
#ppm-d-sf:not(:checked)~.pp-body .pp-cell.pp-link{background:var(--bg);box-shadow:none}
#ppm-d-sf:not(:checked)~.pp-body svg.pp-sf{display:none}

#ppm-d-zha-bold:checked~.pp-body .pp-zha .z-shaft{stroke-width:2.8}
#ppm-d-bad-ink:checked~.pp-body .pp-st.bad{color:var(--ink)}
#ppm-d-bad-ink:checked~.pp-body .pp-st.bad::before{content:none}
#ppm-d-bold:checked~.pp-body .pp-st.main,#ppm-d-bold:checked~.pp-body .pp-st.good{font-weight:700}

:root{--env-good:#2f6b4f;--env-warn:#7d5410;--env-alt:#3a5570}
@media screen and (prefers-color-scheme:dark){:root{--env-good:#6dc79a;--env-warn:#e0a860;--env-alt:#9aa2ea}}
.mp-env-head{margin:0 0 14px;padding:20px 20px 18px;border:1px solid var(--hair,var(--line));border-radius:16px;background:var(--card);box-shadow:var(--shadow)}
.mp-env-kicker{margin:0;font-size:11px;letter-spacing:.2em;color:var(--label,var(--muted));font-weight:600}
.mp-env-hl{margin:8px 0 0;font-size:19px;line-height:1.55;letter-spacing:.01em}
.mp-env-row{margin-top:12px;gap:7px}
.mp-env-dir{padding:3px 10px;border-radius:999px;background:color-mix(in srgb,currentColor 7%,transparent)}
.mp-env-conf{font-size:11.5px;letter-spacing:.03em}
.mp-env-confq>summary::after{content:' ？';font-size:11px}
.mp-env-cond{margin-top:12px;padding-top:12px;border:0;border-top:1px solid var(--hair,var(--line));font-size:13px;line-height:1.75;color:var(--ink2)}
.mp-env-sec-h{margin:20px 0 2px;font-size:12px;letter-spacing:.12em;color:var(--label,var(--muted));font-weight:600}
.mp-env-f-row{align-items:flex-start;gap:12px;padding:14px 2px;border-top:1px solid var(--hair,var(--line))}
.mp-env-f-no{width:22px;height:22px;margin-top:2px;border:1px solid var(--line);background:transparent;color:var(--label,var(--muted));font-size:11.5px}
.mp-env-f-top{gap:9px}
.mp-env-f-top b{font-size:14px;letter-spacing:.01em}
.mp-env-f-state{font-size:12px;color:var(--label,var(--muted))}
.mp-env-f-impact{margin-top:5px;font-size:13.5px;line-height:1.8}
.mp-env-why{margin-top:7px}
.mp-env-why summary{font-size:12px;letter-spacing:.02em;color:var(--label,var(--muted))}
.mp-env-why-body{margin-top:8px;padding:10px 12px;border-radius:10px}

.pp{font-size:13px;line-height:1.9;padding:10px 14px 6px}
.pp-bz th{padding:9px 2px 8px;background:var(--band);border-bottom:1px solid var(--line);font-size:12px;letter-spacing:.08em}

.pp-bz th:first-child{background:var(--band)}
.pp-bz td{padding:7px 2px}
.pp-bz tr+tr td{border-top:1px solid var(--hair)}
.pp-bz td.bz-lbl{color:var(--label);font-size:11.5px;letter-spacing:.04em}
.pp-bz .bz-big{font-size:27px;letter-spacing:.02em}
.pp-sec-h{font-size:12px;letter-spacing:.1em;margin-bottom:4px}
.pp-detail .dt-dh{border-bottom:1px solid var(--hair)}
.mp-it-dtext{font-size:13.5px;line-height:1.95;color:var(--ink2)}
.mp-it-dplain{font-size:13px;line-height:1.85}
.mp-it-dim{padding:16px 0;border-bottom:1px solid var(--hair)}
.mp-it-dlabel{font-size:14.5px;letter-spacing:.05em}

.mp-it-sh{margin:0 0 6px}

h3.mp-it-sh{display:block}
.mp-outline-h{margin:0 0 6px}
h3.mp-outline-h{display:block}
.mp-kline-title{margin:0;font-size:12.5px;color:var(--ink);font-weight:600;line-height:inherit}
.mp-yiyan-h{display:inline;margin:0;font:inherit;font-weight:700;letter-spacing:inherit}

.mp-env{margin:0 0 16px;padding:18px 20px 20px;border:1px solid var(--hair,var(--line));border-radius:16px;background:var(--card);box-shadow:var(--shadow)}
.mp-env-f-row:first-child{border-top:none}
.mp-env-adv{margin-top:16px;padding-top:14px}

.mp-env-adv b,.mp-env-adv h3{margin:0;font-size:11.5px;letter-spacing:.14em;color:var(--label,var(--muted));font-weight:600}

h3.mp-env-adv-h{display:block}
.mp-env-adv ol{margin:8px 0 0;padding-left:21px;font-size:13.5px;line-height:1.95}
.mp-env-adv li{margin:5px 0}
.mp-env-adv li::marker{color:var(--red);font-weight:600}

.mp-env-risk{margin-top:14px;padding:11px 13px;border:1px solid color-mix(in srgb,var(--env-warn) 30%,transparent);
  border-radius:10px;background:color-mix(in srgb,var(--env-warn) 7%,var(--card));font-size:13px;line-height:1.75}
.mp-env-risk b,.mp-env-risk h3{display:inline;margin:0 8px 0 0;font-size:12px;font-weight:600;color:var(--env-warn);letter-spacing:.06em}
.mp-env-tl{margin-top:16px;padding-top:14px}
.mp-env-tl-row{gap:10px;padding:4px 0;font-size:13px}
.mp-env-tl-w{font-variant-numeric:tabular-nums}
.mp-env-tl-p{padding:2px 8px;border-radius:999px;background:var(--band);color:var(--ink2);font-size:11.5px;letter-spacing:.04em}
.mp-env-cf{margin-top:14px;padding-top:12px}
.mp-env-cf summary{font-size:12px;color:var(--label,var(--muted))}

#out>section:not([class]){margin:16px 0 6px}

.mp-env-cond,.mp-env-cf-item,.mp-it-ask,.mp-it-lead,.mp-guide-check,.mp-guide-parts,.mp-br-sec,
.mp-hp-triple th,.mp-hp-triple td,.pp-fx,.pp-hs,.pp-detail .dt-dh,.mp-it-dim{border-style:solid;border-color:var(--hair,var(--line))}

.mp-it-plain{margin:12px 16px 0;padding:13px 16px;border:1px solid var(--hair,var(--line));border-radius:12px;background:var(--band)}
.askbox{margin-top:16px;padding:12px 14px;border:1px solid var(--hair,var(--line));border-radius:12px;background:var(--panel2)}

.mp-qn-oracle{display:flex;align-items:center;gap:10px;margin:2px auto 12px;padding:8px 18px 8px 8px;
  border:1px dashed color-mix(in srgb,var(--red) 30%,var(--line));border-radius:999px;
  background:color-mix(in srgb,var(--card) 80%,transparent);color:inherit;font:inherit;cursor:pointer;
  transition:transform .18s,box-shadow .18s,border-color .18s}
.mp-qn-oracle:hover{transform:translateY(-1px);border-color:color-mix(in srgb,var(--red) 55%,var(--line));box-shadow:var(--shadow)}
.mp-qn-oracle:focus-visible{outline:2px solid var(--red);outline-offset:3px}
.mp-qn-o-cup{flex:0 0 auto;display:block;width:42px;height:54px}
.mp-qn-o-cup svg{width:100%;height:100%;overflow:visible;transform-origin:50% 92%}
.mp-qn-oracle.shaking .mp-qn-o-cup svg{animation:mp-qn-shake 1s cubic-bezier(.36,.07,.19,.97) both}
@keyframes mp-qn-shake{0%,100%{transform:rotate(0)}12%{transform:rotate(-7deg)}24%{transform:rotate(6deg)}
  36%{transform:rotate(-5deg)}48%{transform:rotate(4deg)}60%{transform:rotate(-3deg)}72%{transform:rotate(2deg)}84%{transform:rotate(-1deg)}}
.mp-qn-o-tx{display:flex;flex-direction:column;gap:2px;text-align:left;line-height:1.3}
.mp-qn-o-tx b{font-family:var(--kai);font-size:15px;font-weight:400;letter-spacing:.08em}
.mp-qn-o-tx i{font-style:normal;font-family:var(--sans);font-size:11px;color:var(--label);letter-spacing:.05em}
.mp-qn{position:relative;margin:14px 16px 10px;padding:16px 16px 12px;border-radius:16px;overflow:hidden;
  border:1px solid var(--line);
  background:
    radial-gradient(120% 80% at 88% 0%,color-mix(in srgb,var(--red) 5%,transparent),transparent 58%),
    repeating-linear-gradient(90deg,transparent 0 31px,color-mix(in srgb,var(--line) 26%,transparent) 31px 32px),
    linear-gradient(180deg,var(--card),color-mix(in srgb,var(--band) 72%,var(--card)));
  box-shadow:var(--shadow)}
.mp-qn::before{content:'';position:absolute;inset:0 0 auto;height:3px;
  background:linear-gradient(90deg,transparent,var(--red),transparent);opacity:.55}
.mp-qn-stage{display:grid;grid-template-columns:96px minmax(0,1fr);gap:16px;align-items:start}
.mp-qn-cup{width:96px;height:124px}
.mp-qn-cup svg{width:100%;height:100%;overflow:visible;transform-origin:50% 92%;animation:mp-qn-sway 4.2s ease-in-out infinite}
@keyframes mp-qn-sway{0%,100%{transform:rotate(-2.4deg)}50%{transform:rotate(2.4deg)}}
.qn-shadow{fill:color-mix(in srgb,var(--ink) 16%,transparent)}
.qn-body{fill:color-mix(in srgb,var(--band) 70%,var(--card));stroke:var(--line);stroke-width:1.4}
.qn-rim{fill:var(--card);stroke:var(--line);stroke-width:1.4}
.qn-stick{fill:var(--card);stroke:var(--line);stroke-width:1.1}
.qn-stick.hot{fill:color-mix(in srgb,var(--red) 16%,var(--card));stroke:color-mix(in srgb,var(--red) 46%,var(--line))}
.qn-zi{fill:var(--red);font-family:var(--kai);font-size:17px;letter-spacing:.08em}
.mp-qn-card{position:relative;min-width:0;padding:14px 16px 13px;border-radius:12px;border:1px solid color-mix(in srgb,var(--line) 76%,transparent);
  background:var(--card);
  animation:mp-qn-rise .55s var(--ease) both}
@keyframes mp-qn-rise{from{opacity:0;transform:translateY(16px) rotate(-1.2deg)}to{opacity:1;transform:none}}
.mp-qn-top{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}
.mp-qn-kicker{font-family:var(--sans);font-size:11px;letter-spacing:.14em;color:var(--label);line-height:1.5}
.mp-qn-seal{flex:0 0 auto;width:38px;height:46px;display:flex;align-items:center;justify-content:center;
  writing-mode:vertical-rl;font-family:var(--kai);font-size:15px;letter-spacing:.08em;line-height:1;
  color:var(--red);border:1.5px solid var(--red);border-radius:4px;padding:5px 2px;
  background:color-mix(in srgb,var(--red) 7%,transparent);opacity:.92}
.mp-qn-title{margin:2px 0 6px;font-family:var(--kai);font-size:25px;line-height:1.3;letter-spacing:.1em;font-weight:400}
.mp-qn-verse{margin:0 0 12px;font-family:var(--kai);font-size:14.5px;line-height:1.95;letter-spacing:.1em;color:var(--ink2)}
.mp-qn-verse span{display:block}
.mp-qn-verse span::before{content:'「';color:var(--faint)}
.mp-qn-verse span:last-child::after{content:'」';color:var(--faint)}
.mp-qn-blk{display:grid;grid-template-columns:52px minmax(0,1fr);gap:10px;padding:10px 0;
  border-top:1px solid color-mix(in srgb,var(--line) 52%,transparent)}
.mp-qn-blk b{font-family:var(--sans);font-size:11.5px;letter-spacing:.12em;color:var(--label);font-weight:600;padding-top:2px}
.mp-qn-blk p{margin:0;font-size:13.5px;line-height:1.85;color:var(--ink2)}
.mp-qn-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:2px}
.mp-qn-chips span{font-family:var(--sans);font-size:11px;letter-spacing:.06em;padding:3px 9px;border-radius:999px;
  border:1px solid color-mix(in srgb,var(--red) 32%,transparent);color:var(--red);background:color-mix(in srgb,var(--red) 5%,transparent)}
.mp-qn-aside{margin:14px 0 0;padding-left:110px;font-family:var(--kai);font-size:13px;line-height:1.8;color:var(--label)}
.mp-qn-meta{display:flex;flex-wrap:wrap;gap:6px 14px;margin-top:10px;padding-top:10px;
  border-top:1px solid color-mix(in srgb,var(--line) 52%,transparent);font-family:var(--sans);font-size:11.5px;color:var(--label);letter-spacing:.03em}
.mp-qn-hist{margin-top:12px;padding:11px 13px;border-radius:10px;background:color-mix(in srgb,var(--band) 62%,transparent);
  border:1px solid color-mix(in srgb,var(--line) 46%,transparent)}
.mp-qn-histh{display:flex;align-items:baseline;justify-content:space-between;gap:10px;font-family:var(--sans);font-size:11.5px;color:var(--label)}
.mp-qn-histh b{font-size:12px;color:var(--ink2);letter-spacing:.08em}
.mp-qn-hist ol{list-style:none;display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:6px;margin:9px 0 0;padding:0}
.mp-qn-h-row{display:flex;flex-direction:column;gap:3px;padding:6px 5px;border-radius:8px;
  border:1px solid transparent;background:color-mix(in srgb,var(--card) 62%,transparent);min-width:0}
.mp-qn-h-row.on{border-color:color-mix(in srgb,var(--red) 42%,transparent);background:color-mix(in srgb,var(--red) 5%,var(--card))}
.mp-qn-h-d{display:flex;align-items:center;gap:4px;font-family:var(--sans);font-size:10px;color:var(--faint);font-variant-numeric:tabular-nums;white-space:nowrap}
.mp-qn-h-t{font-family:var(--kai);font-size:11.5px;line-height:1.35;color:var(--ink2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mp-qn-h-l{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--faint)}
.mp-qn-lv-ss .mp-qn-h-l,.mp-qn-h-row.lv-ss .mp-qn-h-l{background:var(--red)}
.mp-qn-lv-s .mp-qn-h-l,.mp-qn-h-row.lv-s .mp-qn-h-l{background:var(--br-good)}
.mp-qn-lv-z .mp-qn-h-l,.mp-qn-h-row.lv-z .mp-qn-h-l{background:var(--ke)}
.mp-qn-lv-p .mp-qn-h-l,.mp-qn-h-row.lv-p .mp-qn-h-l{background:var(--faint)}
.mp-qn-tip{margin:10px 0 0;font-family:var(--sans);font-size:11px;line-height:1.7;color:var(--faint)}

.mp-lq .mp-qn-stage{grid-template-columns:88px minmax(0,1fr)}
.mp-lq .mp-qn-cup{width:88px;height:114px}
.mp-lq-verse{margin:0 0 10px;font-size:15px;line-height:2.05;letter-spacing:.14em}
.mp-lq-verse span::before,.mp-lq-verse span::after{content:none}
.mp-lq-omen{margin:0 0 4px;padding:8px 10px;border-radius:8px;background:color-mix(in srgb,var(--band) 54%,transparent);
  font-family:var(--kai);font-size:12.5px;line-height:1.8;letter-spacing:.05em;color:var(--label)}
.mp-lq-ask{margin:0 0 4px;padding:8px 10px;border-left:2px solid color-mix(in srgb,var(--red) 42%,transparent);
  font-family:var(--sans);font-size:12.5px;line-height:1.75;color:var(--ink2)}
.mp-lq-ask b{font-weight:600;color:var(--label);letter-spacing:.08em;margin-right:6px}
.mp-lq-lv-s .mp-qn-seal{border-color:var(--br-good);color:var(--br-good);background:color-mix(in srgb,var(--br-good) 7%,transparent)}
.mp-lq-lv-z .mp-qn-seal{border-color:var(--ke);color:var(--ke);background:color-mix(in srgb,var(--ke) 7%,transparent)}
.mp-lq-lv-x .mp-qn-seal{border-color:var(--label);color:var(--label);background:color-mix(in srgb,var(--label) 6%,transparent)}
.mp-qn-again{margin-top:12px;padding:7px 16px;border-radius:999px;border:1px solid color-mix(in srgb,var(--red) 42%,var(--line));
  background:color-mix(in srgb,var(--red) 6%,var(--card));color:var(--red);font-family:var(--kai);
  font-size:13px;letter-spacing:.1em;cursor:pointer}
.mp-qn-again:hover{background:color-mix(in srgb,var(--red) 11%,var(--card))}
.mp-qn-again:focus-visible{outline:2px solid var(--red);outline-offset:2px}
@container (max-width:430px){
  .mp-qn{margin:10px 10px 8px;padding:12px}
  .mp-qn-stage{grid-template-columns:64px minmax(0,1fr);gap:10px}
  .mp-qn-cup{width:64px;height:88px}
  .mp-qn-title{font-size:21px}
  .mp-qn-aside{padding-left:0}
  .mp-qn-hist ol{grid-template-columns:repeat(4,minmax(0,1fr))}
}
`,o=window.__PP=window.__PP||{};o.CSS=s;const A="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQAQAAAADPPd8VAAAGIUlEQVR42p2WQWwcZxXHf/PtR7ypjHd2S6QWinccmx6QiCw7iAiQd6w6OEJBQkXlbIlIrjjlgLCFSHZEIsWBlJpbD0HxgUNVcTBSDpYS1WM3JSsau1YkpMpyydhrDCKpd7Je4tl45nscZtdxg0/9jn/Ne/O+9/7v//8s4fmj+MKQaBKpIZNRhMuCBxJSjn49Uo5fq1ZN0ZATRcgMAH4APCVCMUOoPVDnHCwn4ikIUYfUambcTMiuBEVESeZIzCefmDX+zEM3GPM9Rad1ET/9vQkWvH6UsXFxQQMZR5H1iUoSyP7pkLiYlurx4YVSX9WFBQ/FkLHj/ctk/UVUFAuXQYELgheEhBFRuZ3KFCnmFOAlXnKGam9vH9JuTgw+gcE865cGlz7Vap4GyHjM8fKnICnkMfl24vG3U3/6uu8+RlBZbeGB/9Q3yDqeYysWFYCrXAUO7hBEpSuBGGPKMlGWcsd6XCQuykL8cTy6dbHXlOSSRCVFiB+f4vaqD2CIUKrBb3AZSWsqseJqK2nqI++qd2U4slwcZ100XjZnvmzehg4X9y/rFhoXO74MLALrWRSKfsae8eEInSAmIweOXxZEROLl7fF/iezuiIiIBoh/SWbtJR6Zzmf88j9HsP8PtCTwv6VO3O+xwZuL+esPxiyZ5rGOKpk5xN2wgvBEqPBa4wAI0kZPh2fp/+EYMHzzRWCa5I/y4JER2RqX3fJ3bs3vid57yOx/o4y3ev2dh/P/+WnX/S4dQbRPk4AuQR+FM0n/JY6MYVsDPLKwDlurqzSbFy6c+bDUR9UZcEDhpbeMAcPHLQJo8D561f0nyilsc2iuJs3p5ukLXlJyq32NOgVUBJP46R3NdoigsjClz+AqFwoFm0Pr0lztaI4MVk4BMnyzu6v+e8Uk0U2v9cF2jdp5xRRZvR+UJ29r3lBO4IQAlvvVbT/WRBKJxKMh5Ko7JSlKUUXgASFEfBYIhIoUCiBGYYFNmx7QposC3lqiArB5knoj5USjVZdsE5oUyp4BXuoEsNs0ERH/la5nuZImS8kKjg00Tj6tz1jS5IoVf/SrIe58n43+gO52XS1pC8FGkljumZp/6pWMyM7gXvOGYu8PyaBlAzTcs5U7ylGw16ZETYKtsSc/bstjxo8PKOaXNIB2yFtjhZkXZpFE5J6IXy5dEint7ckNxR7c9NJSJHjyBG9fahtuq65wP/B8lBEp7ezJjfZoF2azv4vbo21Oc/5yZjhcYfNrPfWgy9HAZKhhhgxICKHGcu/1k1kAsHqOKaYPGYeGqxNXG5lhQNy/d3L/hAK8CBzQsC1IOtqzHjZksQZ6OGojnyb7678rsndLkKlo6m4Lqq7nH+cFIeJKC1pftx4jmimmRtvNs23yh9OXZgeJx8N3Nsn9qL5c72rP0V8Dth8ECG3I1YCyOHwVVHO6+VZyunL3TTm32ddwHRzCXESkR++8Zno3eta7i5JTWY9ruuUwqmCBffhaMdpP8nNgadburDvbCo854B+r12+HZhsEhUf2YJiF5g0UqPciL09B88J70JRrscSj5uK4bJQGB0tFUbvEsQfGXAdZXg5atG0vLQ6AOsoxDVNKnSNvvT4w47RFtGa2ymZipySlZirIkR6N3ZLpDYqmGEpKOTc1iQNupX/bo159WX0l71jO0efFvSQynxr+yKh88EHVHO/uLkpOscLMvkkD2BqfUFcy9IH1k3sEeC3DN7WayMSEyLzMYzKSiUbj0btijh8vSlFyynRyEZ/bqWIKoLFxdYWRPuDFTsthumWGUhPZLcvO9+TWPNFQJpS4fNeUN0qmJ1/MFxVDqTUb30AQUgtVFEsqAa7CGiiQnyaMmCwftLC0OYmXnH7z35vVXrdex9k3/LU1MEHYUjk0uNoBhQ325x8PrVweERUqyM/6qicp4KSG7wO8j1lOFXNRhW0VUQMW2M89akRElA5YTyoVKtJb6jtJvTCjVMhi7EKMIVmG2nlFQzzttnI5kLctsaLcrhXaMJnlF52xrzVeNmctzWbGvXhh5Wyjc3VLMYbNHKxef5/PHiwFuyhsxnDTfikrj4WmK+Pxze9atW9/wz7mNK7Fh5vhF4T+B6GHrkjpLx9zAAAAAElFTkSuQmCC",Y="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADwAQAAAAAWLtQ/AAAF3klEQVR42u2YP4/jxhnGf+TJOKowbpgmJyDAjYj7ALdqnCLIDSQBdp02KVKoteEixRaLaAxLAA/IIvoQSesycJOLAsmQutvOXZbHCMh1R65dcABRk4L6r9097lq+xp5Cojji8MHzPvM+77yO5bbh8vP0T2z6teM4av9+7jiOBy5EwAXkAaQT+aHC+mH8PTAHF4Y7j2Wby8U7313ZXArwkJ9+B87mprVfWLt4ZPdG0rX2C2vd9fp9JcYpeDEjnxhA/cisYe2XEb89hHbGw39bu3p6TN4ApuTKjH4RXrN4srrQ9kjQVqT+hgf/AX7NgyH/PHx6nIZXL7SZXg3AylxdA02T8fb0nqwJAD+8D2sjyZXpSNuAGvSD61i7THgFiT5mQG/S2jY0H4SVVhJX22mhtYPFk6NrTQOH0ABnS2smV4OZscVHeAAtAx1lRKcLdLT9bnULLncrmNvDK76ccl4y9vuKGZPGAEbygDULEMGr03uzJg8wvhvaOO0HAr/feKGB86dyfEVsWn64C63Q2Oki4Vg79N3QphAzY0reqU2vci1t47xjPlbTYnpeEDZkfvmGtwwTLrOXzKPhe4BGmgcv2rVv1Lk2Vg1mTBrhTO4srm025IxCa/NLFsn7YW1MP2BcC2HGpJFrM6YfmJa/o7VsqTWGHC15lNEaiDHh1QC4Otc1yBWk4UHKhbenw+Q9QptyEee6NiXv1KxiJieNAWaimC219jVzmxVai1gk88sMzqIS9v6DodnalHNdm6jBTE6voAYD5OTELu09G3Jms5foy4S3S8NK5tHivQQ0D8BsJWmVK9M9ydVuyl2PaP3xg91gMzKAJ9t3XLASBjMzUYM3AG8M5Fq+wf4JsHbxxNpHo6T3/NEQ4EHWtfPnj0Z2Xt94SRlow2WNdwM0XfC4Cw0uyDUwKB4o3Op/J1YvF/+6yG0r+esoW/CHaDE8Sjn3CRW9vbj0XP5ed9VSa1k80LWJggdWA1P4Fb+0jt7TGhX+CJxFGUsjdfesUdwGTay883rWnv95fg1r6/F8oQ8WH/nEpuX3A7Gpn+Jq1z98t/Nl53bW/qVvgdZddJMdaJW9P2tzmJGh2k6Xx4EKpk0II9kP9t895ELdBm2+d8MtCt2e9Ip99UxDDw8qstkEFz6StvE5DyeNAQkoHn6kPu3U6nhiufgimUe8TPRqm0a8TH4f/eOrw4DeqrVcXDftUpE0heb7OQtA0hR/k83frUn9S/fJxP5V49jMySbW/tcunm3F+8wWBmXJ4AwWNyQPdXtArye156DQQHoBPXBx6uU28EiGmNamhGMkiU3Lz49x4KoAFWerkqtIXJDloFkZIqzMA6EAXNNOixNYcOdScudkuvyh0A6u+OwxwGN6DlDBdcuYxZK19Q41Xb+vhD0Wa59QqdMU67xW95RAuqqsj1XbKbGwjpVQbadhzPg4jYWK59KTHkI7j5Egeo7n8rR0pdkPjIbY6HTiEBexPBJr63RcweMEdzviZQKaB1WdElfbTBwvrnb9XDHyw2N1a3p4iJ6Ek9AVur7e5mUCGq6bD+Bh2uSBGMkjBVRt7ZIQetAUFVm6ZlLVluwHYiSskwdi5BfH6KP1PBwQn9UFJ7hiq5FU5uiQB6ZNHhid8voDxZhcVVs+8bGgrbTmh9/dudJU1ZbsK9OG1x8o0/KJqy15vM6gU6Ra/FCh6+v8W/Zwn4axaWNlHhid5gHWP2LT0lOiIkHSRDs0N24w3K98D2umxMowNjq10isSnemudujwOAEFD/l5qUbSXjk38nNlNFOIzTgNY+yNWtP3Cujqjnbe2X47gEZc7aSkHwaMuV5rESTZfXdo71sPP/y2TGfwAFo/MBorc1V46PjHb5CXhDZOQwYzYxuDohFRbcl9N9BRdsceV2W/x2XvozXSkGrHTBrnTw3kQeFWewHNeHW6uJvWNoc/6XES7ij1pqblPmv0G6bjT4Ga9eHQqBIuk3VrpETTspiWwDNAUH8MIPRd3ODn6Z/Q9P8BHERODr1SoToAAAAASUVORK5CYII=",me="2026-11-27",Q=e=>String(e).padStart(2,"0");function te(e){const n=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e||""));if(!n)return!1;const i=Number(n[1]),p=Number(n[2]),r=Number(n[3]);if(p<1||p>12||r<1)return!1;const u=[31,i%4===0&&i%100!==0||i%400===0?29:28,31,30,31,30,31,31,30,31,30,31];return r<=u[p-1]}function ee(e){const n=/^(\d{4})\s*[年./-]\s*(\d{1,2})\s*[月./-]\s*(\d{1,2})\s*日?$/.exec(String(e||"").trim());if(!n)return"";const i=`${n[1]}-${Q(n[2])}-${Q(n[3])}`;return te(i)?i:""}function ve(e){const n=String(e||"").trim();if(/^\d{0,4}(-\d{0,2}){0,2}$/.test(n))return n;if(/[年月日/.]/.test(n)){const p=ee(n);if(p)return p}const i=n.replace(/\D/g,"").slice(0,8);return i.length<=4?i:i.length<=6?`${i.slice(0,4)}-${i.slice(4)}`:`${i.slice(0,4)}-${i.slice(4,6)}-${i.slice(6)}`}function ke(e){try{return JSON.parse(window.localStorage.getItem(e)||"null")}catch{return null}}function Te(e,n){try{window.localStorage.setItem(e,JSON.stringify(n))}catch{}}function G(e){let n=2166136261;for(let i=0;i<e.length;i+=1)n^=e.charCodeAt(i),n=Math.imul(n,16777619)>>>0;return(n>>>0).toString(36)}function we(e){const n=new Date(e);if(Number.isNaN(n.getTime()))return"";const i=r=>new Date(r.getFullYear(),r.getMonth(),r.getDate()).getTime(),p=Math.round((i(new Date)-i(n))/864e5);return p<=0?"今天":p===1?"昨天":`${Q(n.getMonth()+1)}-${Q(n.getDate())}`}function W(){const e=new Date;return{date:`${e.getFullYear()}-${Q(e.getMonth()+1)}-${Q(e.getDate())}`,time:`${Q(e.getHours())}:${Q(e.getMinutes())}`}}o.isoDateOk=te,o.normalizeDateText=ee,o.maskDateText=ve,o.storeGet=ke,o.storeSet=Te,o.hash36=G,o.dayLabel=we,o.nowParts=W;const D=".mp-askfree,.mp-askbox,.mp-askblock,.mp-askonly";o.ASK_FREE=D,o.lockParams=function(e,n){if(!e||!e.querySelectorAll)return 0;let i=0;return e.querySelectorAll("input, select, textarea").forEach(p=>{if(p.closest(D)){p.disabled=!1,p.readOnly=!1;return}p.tagName==="SELECT"||p.type==="checkbox"||p.type==="radio"||p.type==="button"?p.disabled=!!n:p.readOnly=!!n,i++}),i};const F={主星:"main",吉星:"good",煞星:"bad",辅星:"aux",杂曜:"minor"},K={禄:"lu",权:"quan",科:"ke",忌:"ji"},se=new Set(["三台","八座","恩光","天贵"]),ze={庙:"good",旺:"good",得:"mid",利:"mid",平:"mid",不:"bad",陷:"bad"},qe={巳:[1,1],午:[1,2],未:[1,3],申:[1,4],辰:[2,1],酉:[2,4],卯:[3,1],戌:[3,4],寅:[4,1],丑:[4,2],子:[4,3],亥:[4,4]},Ee={乾:[1,1,1],兑:[1,1,0],离:[1,0,1],震:[1,0,0],巽:[0,1,1],坎:[0,1,0],艮:[0,0,1],坤:[0,0,0]},va=["初爻","二爻","三爻","四爻","五爻","上爻"],a=e=>String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),ta=(e,n,i)=>{const g=Math.round(43),w=e?`<rect x="0" y="${2.5}" width="104" height="7" rx="${1.6}" fill="currentColor"/>`:`<rect x="0" y="${2.5}" width="${g}" height="7" rx="${1.6}" fill="currentColor"/><rect x="${g+18}" y="${2.5}" width="${104-g-18}" height="7" rx="${1.6}" fill="currentColor"/>`;return`<svg class="mp-hex${n?" hex-on":""}${i?" "+i:""}" viewBox="0 0 104 12" preserveAspectRatio="none" aria-hidden="true" focusable="false">${w}</svg>`},vt={木:"M6 1.6V10.8M6 5.2 2.6 2.2M6 7.4 9.4 4.4",火:"M6 1.4C7.6 3.6 9.2 5.4 9.2 7.6A3.2 3.2 0 0 1 2.8 7.6C2.8 5.4 4.4 3.6 6 1.4Z",土:"M1.6 9.6h8.8M6 2.4v7.2M3.4 5.6h5.2",金:"M6 1.2 10.6 6 6 10.8 1.4 6Z",水:"M1.4 7.2C2.9 4.2 4.5 10.2 6 7.2 7.5 4.2 9.1 10.2 10.6 7.2"},Ye=e=>{const n=vt[e];return n?`<svg class="mp-wxi" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="${n}" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`:""},yt=e=>`<svg class="mp-trig" viewBox="0 0 14 10" aria-hidden="true" focusable="false">${(Ee[e]||[0,0,0]).slice().reverse().map((p,r)=>{const c=r*4;return p?`<rect x="0" y="${c}" width="14" height="2" rx="0.6" fill="currentColor"/>`:`<rect x="0" y="${c}" width="5.6" height="2" rx="0.6" fill="currentColor"/><rect x="8.4" y="${c}" width="5.6" height="2" rx="0.6" fill="currentColor"/>`}).join("")}</svg>`;o._hexBar=ta,o._wxIcon=Ye,o._triGlyph=yt;function Xa(e,n,i){return!e||!e.length?"":e.map(p=>{const r=F[p.type]||"aux",c=p.mutagen?`<i class="pp-m ${K[p.mutagen]}">${p.mutagen}</i>`:"",u=n&&n[p.name],m=u?`<i class="pp-m view ${K[u]}">${u}</i>`:"",l=p.brightness?`<em class="pp-b ${ze[p.brightness]||"mid"}">${p.brightness}</em>`:"",g=p.inTemple?'<em class="pp-b good">庙</em>':"",w=i&&i[p.name]?Ja(i[p.name],p.name):"",b=se.has(p.name)?" st-sbg":"";return`<span class="pp-st ${r}${b}">${w}${p.name}${l}${g}${c}${m}</span>`}).join("")}function Ht(e){const n=[];for(let i=0;i<6;i++)n.push(e+i*12);return n.join(",")}const Je=["命宫","兄弟","夫妻","子女","财帛","疾厄","迁移","交友","官禄","田宅","福德","父母"],_e=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],Se=e=>(e%12+12)%12,Pt=(e,n)=>e!==n&&[Se(n+4),Se(n+8),Se(n+6)].includes(e);function Ta(e,n,i,p,r,c,u,m){const l=qe[e.branch]||[1,1],g=_e.indexOf(e.branch),w=["pp-cell"];g===n?w.push("pp-soul"):Pt(g,n)&&w.push("pp-tri"),e.isBody&&w.push("pp-shen"),m&&e.branch===m&&w.push("pp-laiyin"),l[0]===4&&w.push("pp-lastrow"),l[1]===4&&w.push("pp-lastcol");const b=e.shensha||{},k=Je[Se(n-g)];let L="";if(g===n&&p){const C=E=>(F[E.type]||"")==="main";if(!(e.stars||[]).some(C)){const E=p.find(B=>_e.indexOf(B.branch)===Se(g+6)),le=E?(E.stars||[]).filter(C):[];le.length&&(L=`<div class="pp-borrow" title="命宫无主星，借对宫（迁移宫）主星">借 ${le.map(B=>B.name).join(" ")}</div>`)}}return`<div class="${w.join(" ")}" data-pi="${g}" data-view="${i}" role="button" tabindex="0" aria-expanded="false" style="grid-row:${l[0]};grid-column:${l[1]}">
      <div class="pp-stars">${Xa(e.stars,r,Qa(e))}</div>
      ${L}
      <div class="pp-ages">${Ht(e.xiaoxian.age)}</div>
      ${Ot(e,c)}
      ${Ea(e,u)}
      <div class="pp-foot">
        <div class="ft-l">
          <span class="ft-dx"><span class="pp-ss-txt">${b.boshi}</span> ${e.daxian.start}-${e.daxian.end}</span>
          <span class="pp-ss-txt">${b.jiangqian}</span>
          <span class="pp-ss-txt">${b.suiqi}</span>
        </div>
        <div class="ft-r">
          <span class="pp-ss-txt">${b.changsheng}</span>
          <span>${e.ganzhi}</span>
          <span class="ft-pn">${k}</span>
        </div>
      </div>
    </div>`}function Ja(e,n){return`<span class="pp-zha ${K[e]}" title="自化${a(e)}：${a(n)}·宫干化回本宫"><svg class="z-a" viewBox="0 0 22 9" role="img" aria-label="自化${a(e)}">
        <path class="z-shaft" d="M1 7C6.6 7 11.4 5.6 17.2 3.2"/>
        <path class="z-head" d="M20.2 2 17.8 4.9 16.6 1.9Z"/>
      </svg></span>`}o._zhaMark=Ja;function Qa(e){const n={};for(const i of e.selfHua||[])!i||!i.star||!K[i.type]||n[i.star]||(n[i.star]=i.type);return n}function Ot(e,n){const i=n&&n[e.branch]||[];if(!i.length)return"";const p=i.map(r=>`<i class="${K[r.type]||""}" title="${a(r.star)}化${a(r.type)}">${a(r.type)}<em>→${a(r.palace||"未上盘")}</em></i>`).join("");return`<div class="pp-fx">${a(e.ganzhi)}宫干 ${p}</div>`}function Ea(e,n){const i=n&&n[e.branch]||null;return i?`<div class="pp-hs">${Object.entries(i).map(([r,c])=>`<i>${a(r)}<em>${a(c)}</em></i>`).join("")}</div>`:""}function ya(e){try{const n=window.Engine||window.__PP&&window.__PP.Engine;if(!n||!n.buildBazi||!e.input)return"";const i=n.buildBazi({year:e.input.year,month:e.input.month,day:e.input.day,hour:e.input.hour,minute:e.input.minute,gender:e.input.gender,trueSolar:!1});return["year","month","day","hour"].map(p=>i.pillars[p].ganzhi).join(" ")}catch{return""}}function fn(e){try{const n=window.Engine||window.__PP&&window.__PP.Engine;return!n||!n.buildBazi||!e.input?null:n.buildBazi({year:e.input.year,month:e.input.month,day:e.input.day,hour:e.input.hour,minute:e.input.minute,gender:e.input.gender,trueSolar:!1}).pillars.day.stem}catch{return null}}o.ziweiHTML=function(e){const n=_e.indexOf(e.soul.branch),i=e.liunian&&e.liunian[0]||null,p=i?i.age:1,r=e.palaces.find(y=>p>=y.daxian.start&&p<=y.daxian.end)||e.palaces[0],c=_e.indexOf(r.branch),u=i?_e.indexOf(i.lifePalace.branch):n,m=y=>{const z={};for(const q of y||[])q&&q.star&&(z[q.star]=q.type);return z},l=(e.daxianList||[]).find(y=>y.branch===r.branch)||null,g={da:m(l&&l.mutagenHits),ln:m(i&&i.mutagenHits)},w={};for(const y of e.daxianList||[])w[y.branch]=y.mutagenHits||[];const b=(()=>{const y=fn(e);if(!y)return null;const z=(e.daxianList||[]).find(fe=>fe.stem===y);if(!z)return null;const q={};for(const fe of e.palaces)for(const v of fe.stars||[])v.name in q||(q[v.name]=fe.branch);return{stem:y,items:(z.mutagenHits||[]).map(fe=>({type:fe.type,star:fe.star,branch:q[fe.star]||null,palace:q[fe.star]?(e.palaces.find(v=>v.branch===q[fe.star])||{}).palace:null}))}})();let k=null;if(i){k={};for(const[y,z]of Object.entries(i))/^(流|年解)/.test(y)&&typeof z=="string"&&_e.includes(z)&&(k[z]=k[z]||{},k[z][y]=z)}const L={da:l&&l.yunStars?(()=>{const y={};for(const[z,q]of Object.entries(l.yunStars))(y[q]=y[q]||{})[z]=q;if(l.yunSuiqi)for(const[z,q]of Object.entries(l.yunSuiqi))(y[q]=y[q]||{})[z]=q;if(l.yunJiangqian)for(const[z,q]of Object.entries(l.yunJiangqian))(y[q]=y[q]||{})[z]=q;return y})():null,ln:k};if(e.liunian&&e.liunian.length){const y=e.liunian.find(z=>z.ganzhi===(e._lnSel||e.liunian[0].ganzhi))||e.liunian[0];if(y.lnSuiqi)for(const[z,q]of Object.entries(y.lnSuiqi))(k[q]=k[q]||{})[z]=q;if(y.lnJiangqian)for(const[z,q]of Object.entries(y.lnJiangqian))(k[q]=k[q]||{})[z]=q}const C=(y,z)=>e.palaces.map(q=>Ta(q,y,z,e.palaces,g[z]||null,w,L[z]||null,e.laiyin&&e.laiyin.branch)).join(""),E=(y,z)=>`<div class="pp-center">
        ${z==="da"?`<div class="ct-t1">大限 ${r.ganzhi}　${r.daxian.start}-${r.daxian.end}岁</div>`:z==="ln"&&i?`<div class="ct-t1">流年 ${i.ganzhi}　${i.age}岁</div>`:`<div class="ct-t1">${e.daxian.rule.slice(0,2)}　${e.bureau.name}</div>`}
        <div class="ct-t2">公历 ${e.input.year}-${String(e.input.month).padStart(2,"0")}-${String(e.input.day).padStart(2,"0")} ${String(e.input.hour).padStart(2,"0")}:${String(e.input.minute).padStart(2,"0")}</div>
        <div class="ct-t2">农历 ${e.lunar.year}年${e.lunar.isLeap?`闰${e.lunar.monthRaw||e.lunar.month}`:e.lunar.month}月${e.lunar.day}日${e.hourBranch}时${e.lunar.isLeap&&e.lunar.monthRaw&&e.lunar.month!==e.lunar.monthRaw?`（按${e.lunar.month}月起盘）`:""}</div>
        ${ya(e)?`<div class="ct-t3">${ya(e)}</div>`:""}
        ${e.nonJieqi?`<div class="ct-t3 ct-t3nj" title="${a(e.nonJieqi.note)}">${e.nonJieqi.year} ${e.nonJieqi.month} ${e.nonJieqi.day} ${e.nonJieqi.hour}<em class="nj-tag">非节气</em></div>`:""}
        <div class="ct-t4">命主 ${e.lifeMaster}${e.lifeMasterNote?`<span class="pp-dim" title="${a(e.lifeMasterNote)}">＊</span>`:""}　身主 ${e.bodyMaster}${e.bodyMasterNote?`<span class="pp-dim" title="${a(e.bodyMasterNote)}">＊</span>`:""}</div>
        <div class="ct-t4">命宫 ${e.soul.branch}　身宫 ${e.body.branch}　五行局 ${e.bureau.name}</div>
        <div class="ct-t4">子年斗君 ${e.doujun?e.doujun.zinian:"—"}　流年斗君 ${i&&i.doujun?i.doujun:"—"}</div>
        <div class="ct-t4">紫微 ${e.ziwei}　天府 ${e.tianfu}　${z==="da"?"大限命宫 "+_e[c]:z==="ln"?"流年命宫 "+_e[u]:"本命命宫 "+e.soul.branch}</div>
        ${z==="da"||z==="ln"?`<div class="ct-t4 pp-viewhua">${z==="da"?"大限":"流年"}四化　${(z==="da"?g.da:g.ln)&&Object.keys(z==="da"?g.da:g.ln).length?Object.entries(z==="da"?g.da:g.ln).map(([fe,v])=>`${fe}化${v}`).join("　"):'<span class="pp-dim">未飞四化</span>'}</div>`:""}
        <div class="pp-legend"><span class="pp-m lu">禄</span><span class="pp-m quan">权</span><span class="pp-m ke">科</span><span class="pp-m ji">忌</span><span>实心=生年四化　空心=大限/流年四化　箭头=自化　红框=命宫　浅底=三方四正</span></div>
      </div>`,le=y=>{const z=y==="da"?`大限 ${r.ganzhi}`:y==="ln"&&i?`流年 ${i.ganzhi}`:"本命",q=(ya(e)||"").split(" ")[0]||"";return`<div class="pp-cal"><b class="cal-sc"></b><span class="cal-sep">·</span><span>${z}</span>${q?`<span class="cal-sep">·</span><span>${e.input.year} ${q}</span>`:""}</div>`},B=(y,z,q)=>`<div class="pp-body ${y}" data-view="${q}" data-soul="${z}">${le(q)}<div class="pp-grid">${C(z,q)}${E(z,q)}</div><div class="pp-detail"></div></div>`,O=e.changqu,ne=O?`<div class="pp-chips">
      <span class="pp-chip">昌 ${O.wenchang.branch}（${O.wenchang.palace}）</span>
      <span class="pp-chip">曲 ${O.wenqu.branch}（${O.wenqu.palace}）</span>
      <span class="pp-chip">${O.relation}</span>
      <span class="pp-chip">入命三方 ${O.inSoulSanfang?"是":"否"}</span>
      <span class="pp-chip ${O.absorb.label==="杂"?"warn":"ok"}">吸收·${O.absorb.label}</span>
    </div>`:"",Z=(e.patterns||[]).length?`<div class="pp-chips">${e.patterns.map(y=>{const z=y.status==="broken"&&Array.isArray(y.breaks)&&y.breaks.length,q=`${y.evidence||""}${z?`；破格：${y.breaks.join("；")}`:""}`;return`<span class="pp-chip ${z?"broken":y.tone==="good"?"ok":y.tone==="bad"?"warn":""}" title="${a(q)}">${y.name}${z?"（破格）":""}</span>`}).join("")}</div>`:"",T=(e.daxianList||[]).length?`<div class="pp-chips">${e.daxianList.slice(0,8).map(y=>`<span class="pp-chip" title="${a(`${y.ganzhi} 宫干四化：`+y.mutagenHits.map(z=>`${z.star}化${z.type}→${z.palace||"未上盘"}`).join("、"))}">${y.branch} ${y.ages[0]}-${y.ages[1]}</span>`).join("")}</div>`:"",oe=i&&i.mutagenHits&&i.mutagenHits.length?`<div class="pp-chips">${i.mutagenHits.map(y=>`<span class="pp-chip ${y.type==="忌"?"warn":y.type==="禄"?"ok":""}">${y.star}化${y.type}→${y.palace||"未上盘"}</span>`).join("")}</div>`:"",X=e.zuoyao,Ae=X?X.placed&&X.placed.length?`<div class="pp-sec"><div class="pp-sec-h">杂曜全表 · 已排 ${X.placed.length} 颗（${X.starTotal} 颗盘）</div>
        <div class="pp-chips">${X.placed.map(y=>`<span class="pp-chip${y.inTemple?" ok":""}" title="${a(y.meaning||"")}">${a(y.name)} ${a(y.branch)}（${a(y.palace)}）${y.inTemple?"·庙":""}</span>`).join("")}</div>
        <details class="pp-zy"><summary>逐颗安星诀（${X.placed.length} 条 · 出多处近代通行辑本并核，属通行说，不是《全书》原文）</summary><div class="pp-zy-v">${a(X.verses).replace(/\n/g,"<br>")}</div></div></details>
        ${X.skipped&&X.skipped.length?`<div class="pp-zy-s">${X.skipped.map(y=>a(y)).join("")}</div>`:""}</div>`:`<div class="pp-sec"><div class="pp-sec-h">杂曜 · 本盘 ${X.starTotal} 颗（通行简盘）</div>
        <div class="pp-zy-s">开「杂曜全表」追加十二颗：解神·天巫·天月·阴煞（生月）／天官·天福·天厨（生年干）／蜚廉·天德·年解（生年支）／天才（命宫＋生年支）·天寿（身宫＋生年支）。${X.skipped&&X.skipped.length?`不另立：${X.skipped.map(y=>a(y)).join("")}`:""}</div></div>`:"",je=e.flyChains?(()=>{const y=["禄","权","科","忌"].map(z=>{const q=e.flyChains[z];if(!q||!q.steps.length)return"";const fe=q.path.map(pe=>String(pe).replace(/宫$/,"")).join("→"),v=q.steps.map(pe=>`${pe.from}（${pe.fromStem}）化${z}${pe.star}→${pe.to}`).join("；");return`<span class="pp-chip ${z==="忌"?"warn":z==="禄"?"ok":""}" title="${a(v)}">飞${z} ${a(fe)}${q.closed?"↺":""}</span>`}).join("");return y?`<div class="pp-chips">${y}</div>`:""})():"",U=e.flyComposite&&Array.isArray(e.flyComposite.labels)&&e.flyComposite.labels.length?`<div class="pp-chips">${e.flyComposite.labels.map(y=>{const z=/忌/.test(y)?"warn":/自化/.test(y)?"":"ok",q=J=>String(J).replace(/^.*?会/,"").replace(/^禄忌同宫/,"").replace(/自化$/,""),fe=(e.flyComposite.targets||[]).find(J=>J.palace===q(y)),v=fe?fe.incoming.map(J=>`${J.from}化${J.type}${J.star}`).join("、"):e.flyComposite.note;return`<span class="pp-chip ${z}" title="${a(v)}">三方四正 ${a(y)}</span>`}).join("")}</div>`:"",be=e.flow,ie=be?(()=>{const y=v=>(v.mutagenHits||[]).length?v.mutagenHits.map(J=>`<i>${J.star}化${J.type}<em>→${J.palace||"未上盘"}</em></i>`).join(""):'<i class="dim">宫干无四化</i>',z=(v,J,pe,N)=>`<div class="flow-row" data-t="${v}"><b>${J}</b><span class="flow-p"><span class="flow-k">${pe.ganzhi||"—"}　落${pe.palace||"未上盘"}（${pe.branch}）</span>${N?`<em class="flow-same">${N}</em>`:""}</span><span class="flow-m">${y(pe)}</span></div>`,fe=be.day.branch===be.month.branch?"（日数走满一圈，故同宫）":"";return`<div class="pp-flow">
        <div class="flow-row"><b>基准</b><span class="flow-p">${be.asOf.solar}</span><span class="flow-m">农历 ${be.asOf.lunar}　流年 ${be.asOf.yearGanzhi}（斗君 ${be.year.doujun}）</span></div>
        ${z("month",`流月 ${be.month.index} 月`,be.month)}
        ${z("day",`流日 ${be.day.index} 日`,be.day,fe)}
        ${z("hour",`流时 ${_e[be.hour.hourIndex]}时`,be.hour)}
      </div>`})():"";return o._zw=e,o.briefHTML(e)+`<div class="pp">
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
      ${be?'<input type="checkbox" id="ppm-t-month" class="pp-r"><input type="checkbox" id="ppm-t-day" class="pp-r"><input type="checkbox" id="ppm-t-hour" class="pp-r">':""}
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
      ${be?`<div class="pp-modes pp-time">
        <label for="ppm-t-month">＋流月</label><label for="ppm-t-day">＋流日</label><label for="ppm-t-hour">＋流时</label>
        <span class="pp-soon">要落到这个月这几天，再往下一层</span>
      </div>`:""}
      <div class="pp-modes pp-schools">
        <label for="ppm-sc-sihe">四化</label><label for="ppm-sc-feixing">飞星</label><label for="ppm-sc-sanhe">三合</label>
      </div>
      ${B("ben",n,"ben")}
      ${B("da",c,"da")}
      ${B("ln",u,"ln")}
      ${(()=>{if(!b)return"";const y={禄:"rl",权:"rq",科:"rk",忌:"rj"},z=b.items.map(q=>`<i><em class="${y[q.type]||""}">${q.type}</em>${a(q.star)}<em>${a(q.branch||"?")}${q.palace?`·${a(q.palace)}`:""}</em></i>`).join("");return`<div class="pp-rigan"><b>日干${a(b.stem)}四化</b>${z}</div>`})()}      ${(()=>{if(!b)return"";const y={禄:"rl",权:"rq",科:"rk",忌:"rj"},z=b.items.map(q=>`<i><em class="${y[q.type]||""}">${q.type}</em>${a(q.star)}<em>${a(q.branch||"?")}${q.palace?`·${a(q.palace)}`:""}</em></i>`).join("");return`<div class="pp-rigan"><b>日干${a(b.stem)}四化</b>${z}</div>`})()}
      <div class="pp-zhlegend">自化图示　<span class="z-lu">${o._zhaMark("禄","本宫")}禄</span><span class="z-quan">${o._zhaMark("权","本宫")}权</span><span class="z-ke">${o._zhaMark("科","本宫")}科</span><span class="z-ji">${o._zhaMark("忌","本宫")}忌</span></div>
      <div class="pp-flywrap">${je}${U}</div>
      ${ie}
    </div>${ne}${Z}${T}${oe}${Ae}`};function Wa(e){return e.length?e.map(n=>{const i=F[n.type]||"aux",p=n.brightness?`<em class="dt-br ${ze[n.brightness]||"mid"}">${n.brightness}</em>`:"",r=n.inTemple?'<em class="dt-br good">庙</em>':"",c=n.mutagen?`<i class="pp-m ${K[n.mutagen]}">${n.mutagen}</i>`:"";return`<span class="dt-st ${i}">${n.name}${p}${r}${c}</span>`}).join(""):'<span class="dt-empty">无</span>'}function wa(e,n){const i=o._zw;if(!i)return"";const p=T=>i.palaces.find(oe=>_e.indexOf(oe.branch)===T),r=p(e)||i.palaces.find(T=>_e.indexOf(T.branch)===e);if(!r)return"";const c=_e.indexOf(r.branch),u=Je[Se(n-c)],m=r.shensha||{},l=r.stars.filter(T=>T.type==="主星"),g=r.stars.filter(T=>T.type==="吉星"||T.type==="辅星"),w=r.stars.filter(T=>T.type==="煞星"),b=r.stars.filter(T=>!["主星","吉星","辅星","煞星"].includes(T.type)),k=(r.selfHua||[]).length?r.selfHua.map(T=>`<span class="dt-self">${Ja(T.type,T.star||"本宫")}${a(T.star||"")}</span>`).join(""):'<span class="dt-empty">无</span>',L=[Se(c+4),Se(c+8),Se(c+6)].map(T=>{const oe=p(T),X=Je[Se(n-T)],Ae=oe?oe.stars.filter(U=>U.type==="主星").map(U=>U.name).join("、"):"",je=T===Se(c+6)?"对宫":"三合";return`<span class="dt-st">${X}[${_e[T]}]<b>${Ae||"无主星"}</b><em>${je}</em></span>`}).join(""),C=p(Se(c+6)),E=C?C.stars.filter(T=>T.type==="主星"):[],le=l.length?Wa(l):`<span class="dt-empty">无主星</span><span class="dt-tri">　借对宫 <b>${E.length?E.map(T=>T.name).join("、"):"亦无主星"}</b></span>`,B=(T,oe)=>`<div class="dt-dr"><span class="dt-k">${T}</span><div class="dt-v">${oe}</div></div>`,O=Je.length,ne=Se(n-c),Z=Je.map((T,oe)=>{const X=Se(c+(oe-ne+O)%O);return`<span class="dt-st">${Je[oe]}[${_e[X]}]</span>`}).join("");return`<div class="dt-dh">
        <b>${u}</b><span>${r.branch}宫 · ${r.ganzhi}</span>
        <span>大限 ${r.daxian.start}-${r.daxian.end}</span>
        <span>小限起 ${r.xiaoxian.age} 岁</span>
        ${r.isBody?"<span>· 身宫</span>":""}
        <span class="dt-x" data-pp-close="1">收起</span>
      </div>
      ${B("主星",le)}
      ${B("吉辅",Wa(g))}
      ${w.length?B("煞星",Wa(w)):""}
      ${b.length?B("杂曜",Wa(b)):""}
      ${B("宫干四化",k)}
      ${B("十二神",`<span class="dt-tri">长生 ${m.changsheng||"—"}　博士 ${m.boshi||"—"}　将前 ${m.jiangqian||"—"}　岁前 ${m.suiqi||"—"}</span>`)}
      ${B("三方四正",`<span class="dt-tri">${L}</span>`)}
      ${B("太极转换",`<span class="dt-tri dt-taiji">以${u}[${r.branch}]立太极${Z}</span>`)}
      <div class="hint">三方四正在盘上已同步标出（浅红描边）。再点一次本宫可收起。</div>`}function $a(e){e.querySelectorAll(".pp-cell.pp-sel,.pp-cell.pp-link").forEach(n=>{n.classList.remove("pp-sel"),n.classList.remove("pp-link")}),e.querySelectorAll('.pp-cell[aria-expanded="true"]').forEach(n=>n.setAttribute("aria-expanded","false"))}const Dt={};function Rt(e,n){_a(e);const i=e.querySelector(".pp-grid");if(!i)return;const p=[n,(n+6)%12,(n+4)%12,(n+8)%12],r=l=>{const g=e.querySelector('.pp-cell[data-pi="'+l+'"]');if(!g)return null;const w=Number(g.style.gridRow),b=Number(g.style.gridColumn),k=Math.min(75,Math.max(25,(w-.5)*25));return b===1?[25,k]:[75,k]},c=p.map(r);if(c.some(l=>!l))return;const u=document.createElementNS("http://www.w3.org/2000/svg","svg");u.setAttribute("class","pp-sf"),u.setAttribute("viewBox","0 0 100 100"),u.setAttribute("preserveAspectRatio","none");const m=(l,g,w,b)=>{const k=document.createElementNS("http://www.w3.org/2000/svg","line");k.setAttribute("x1",l),k.setAttribute("y1",g),k.setAttribute("x2",w),k.setAttribute("y2",b),u.appendChild(k)};m(c[0][0],c[0][1],c[1][0],c[1][1]),m(c[1][0],c[1][1],c[2][0],c[2][1]),m(c[2][0],c[2][1],c[3][0],c[3][1]),m(c[3][0],c[3][1],c[0][0],c[0][1]);for(let l=0;l<4;l++){const g=document.createElementNS("http://www.w3.org/2000/svg","circle");g.setAttribute("cx",c[l][0]),g.setAttribute("cy",c[l][1]),g.setAttribute("r",l===0?.9:.7),l===0&&g.setAttribute("style","fill:var(--red);opacity:.85"),u.appendChild(g)}i.style.position="relative",i.appendChild(u)}function _a(e){const n=e.querySelector("svg.pp-sf");n&&n.remove()}const et=["ppm-d-ss","ppm-d-sbg","ppm-d-zha","ppm-d-ages","ppm-d-sizhu","ppm-d-rigan","ppm-d-njq","ppm-d-tjz","ppm-d-small","ppm-d-shen","ppm-d-hua","ppm-d-sf","ppm-d-laiyin","ppm-d-zha-bold","ppm-d-bad-ink","ppm-d-bold","ppm-d-hs"],pa={simple:["ppm-d-hua","ppm-d-shen"],std:["ppm-d-ss","ppm-d-sbg","ppm-d-zha","ppm-d-ages","ppm-d-sizhu","ppm-d-small","ppm-d-shen","ppm-d-hua","ppm-d-sf","ppm-d-laiyin"],expert:et.slice()};function Ft(e,n){const i=pa[e];if(!i||typeof document>"u")return!1;const p=n&&n.querySelector?n:document;return et.forEach(r=>{const c=p.querySelector("#"+r);c&&(c.checked=i.indexOf(r)>=0)}),p.querySelectorAll("[data-pp-preset]").forEach(r=>{r.classList.toggle("on",r.getAttribute("data-pp-preset")===e)}),!0}o.DISP_PRESETS=pa,o.DISP_ALL=et,o.applyDispPreset=Ft;function Ha(){if(Ha.done||typeof document>"u"||!document.addEventListener)return;Ha.done=!0;const e=n=>{const i=n.closest(".pp-body");if(!i)return;const p=i.querySelector(".pp-detail");if(!p)return;if(n.classList.contains("pp-sel")){$a(i),_a(i),p.classList.remove("open"),p.innerHTML="";return}$a(i);const r=Number(n.dataset.pi),c=Number(i.dataset.soul);Rt(i,r),i.querySelectorAll(".pp-cell").forEach(m=>{const l=Number(m.dataset.pi);(l===Se(r+4)||l===Se(r+8)||l===Se(r+6))&&m.classList.add("pp-link")}),n.classList.add("pp-sel"),n.setAttribute("aria-expanded","true"),p.innerHTML=wa(r,c),p.classList.add("open")};document.addEventListener("click",n=>{const i=n.target,p=i&&i.closest?i.closest("[data-pp-preset]"):null;if(p){Ft(p.getAttribute("data-pp-preset"),p.closest(".pp"));return}if(i&&i.closest&&i.closest("[data-pp-close]")){const c=i.closest(".pp-body");if(c){$a(c),_a(c);const u=c.querySelector(".pp-detail");u&&(u.classList.remove("open"),u.innerHTML="");return}}const r=i&&i.closest?i.closest(".pp-cell[data-pi]"):null;r&&e(r)}),document.addEventListener("keydown",n=>{if(n.key!=="Enter"&&n.key!==" ")return;const i=n.target&&n.target.closest?n.target.closest(".pp-cell[data-pi]"):null;i&&(n.preventDefault(),e(i))}),document.addEventListener("change",n=>{const i=n.target;if(!i||!i.id||et.indexOf(i.id)<0)return;const p=i.closest?i.closest(".pp"):null;p&&p.querySelectorAll("[data-pp-preset]").forEach(r=>r.classList.remove("on"))})}o.bindZiwei=Ha,o._palaceDetailHTML=wa,Ha();function Ve(e,n){const i=n||{},p=e.slice().sort((r,c)=>c.position-r.position);return i.plain?p.map(r=>`<div class="mp-hy-row hy-plain">
        <span class="mp-hy-nm">${r.name||va[r.position-1]}</span>
        ${ta(r.yinYang==="阳",r.moving)}
      </div>`).join(""):p.map(r=>{const c=r.yinYang==="阳",u=i.shiYing?r.position===i.shi?'<span class="mp-hy-sy">世</span>':r.position===i.ying?'<span class="mp-hy-sy">应</span>':"<span></span>":"<span></span>",m=r.moving?`<i class="mp-hy-mv" title="动爻">${c?"○":"×"}</i>`:'<i class="mp-hy-mv"></i>';return`<div class="mp-hy-row">
        ${u}
        <span class="mp-hy-nm">${r.name||va[r.position-1]}</span>
        <span class="mp-hy-ln">${ta(c,r.moving)}${m}</span>
        <span class="mp-hy-gz">${a(r.ganzhi||"")}</span>
        <span class="mp-hy-lq">${a(r.liuqin||"")}</span>
        <span class="mp-hy-ls">${a(r.liushen||"")}</span>
      </div>`}).join("")}o.liuyaoHTML=function(e){const n=(O,ne,Z,T)=>`<div class="mp-hy-box">
      <div class="mp-hy-h"><b>${O}</b><span>${ne}</span></div>
      <div class="mp-hy">${Ve(T,{shiYing:!0,shi:Z.shi,ying:Z.ying})}</div>
    </div>`,i=n(`本卦 ${e.ben.name}`,`${e.ben.palace} · ${e.ben.palaceElement}`,e.ben,e.ben.lines),p=e.bian?n(`变卦 ${e.bian.name}`,`${e.bian.palace} · ${e.bian.palaceElement}`,e.bian,e.bian.lines):`<div class="mp-hy-box"><div class="mp-hy-h"><b>六爻安静</b><span>无动爻，不取变卦</span></div>
          <div class="pp-dim" style="font-size:12px;line-height:1.9">断卦以本卦卦辞与世应生克为主。</div></div>`,r=e.body&&Array.isArray(e.body.labels)?e.body.labels:[],c=r.length?`<div class="pp-chips">${r.map(O=>`<span class="pp-chip ${/伏吟/.test(O)||/反吟/.test(O)||/化退神/.test(O)?"warn":/六冲|散/.test(O)?"":"ok"}">${a(O)}</span>`).join("")}</div>`:'<div class="pp-chips"><span class="pp-chip">卦体无六冲、六合、伏吟、反吟</span></div>',u=e.useGod&&e.useGod.liuqin?e.useGod:null,m=u?`<div class="pp-chips">${u.labels.map(O=>`<span class="pp-chip ${/空亡|退神|受克|泄气|不上卦/.test(O)?"warn":/持世|化进|六合|得飞神生/.test(O)?"ok":""}">${a(O)}</span>`).join("")}</div>`:'<div class="pp-chips"><span class="pp-chip">用神未取（未指明所问之事）</span></div>',l=e.useGodStrength&&Array.isArray(e.useGodStrength.labels)?e.useGodStrength:null,g=l&&l.labels.length?`<div class="pp-chips">${l.labels.map(O=>`<span class="pp-chip ${/死|囚|月破|受日辰克|泄|耗/.test(O)?"warn":/旺|相|得日辰生|比和/.test(O)?"ok":""}">${a(O)}</span>`).join("")}</div>`:"",w=e.fushenAccess&&Array.isArray(e.fushenAccess.labels)?e.fushenAccess:null,b=w&&w.labels.length?`<div class="pp-chips">${w.labels.map(O=>`<span class="pp-chip ${/可出/.test(O)?"ok":/受压难出|有助有压/.test(O)?"warn":""}">伏神${a(O)}</span>`).join("")}</div>`:"",k=e.yingqi&&Array.isArray(e.yingqi.labels)?e.yingqi:null,L=k&&k.labels.length?`<div class="pp-chips">${k.labels.map(O=>`<span class="pp-chip ${/应期偏速/.test(O)?"ok":/应期待解/.test(O)?"warn":""}" title="只列地支，不出日期">${a(O)}</span>`).join("")}</div>`:"",C=e.jinTuiPower&&Array.isArray(e.jinTuiPower.labels)?e.jinTuiPower:null,E=C&&C.labels.length?`<div class="pp-chips">${C.labels.map(O=>`<span class="pp-chip ${/后劲足|退得缓/.test(O)?"ok":/有限|进得虚|退得实|月破|未定/.test(O)?"warn":""}">${a(O)}</span>`).join("")}</div>`:"",le=e.hexStrength&&Array.isArray(e.hexStrength.labels)?e.hexStrength:null,B=le&&le.labels.length?`<div class="pp-chips">${le.labels.map(O=>`<span class="pp-chip ${/死|囚|月破|冲空/.test(O)?"warn":/旺|相/.test(O)?"ok":""}">${a(O)}</span>`).join("")}</div>`:"";return o.briefHTML(e)+`<div class="pp" style="padding:14px">
      <div class="mp-mh-head">起卦 ${e.cast.notation.join("、")}（自下而上）　日辰 ${e.dayGanZhi.name}</div>
      <div class="mp-hy-wrap">${i}${p}</div>
      ${c}
      ${m}
      ${g}
      ${b}
      ${L}
      ${E}
      ${B}
    </div>`},o.meihuaHTML=function(e){const n=(L,C,E,le,B)=>{const ne=[...Ee[le]||[0,0,0],...Ee[E]||[0,0,0]].slice().reverse().map(Z=>ta(!!Z,!1,"sm")).join("");return`<div class="mp-hexbox hb-mini">
        <div class="hb-h">${L}</div>
        <div class="hb-n">${C}</div>
        <div class="mp-mh-mini">${ne}</div>
        <div class="hb-s">${B||`上${E} 下${le}`}</div>
      </div>`},i=e.lines.slice().sort((L,C)=>C.position-L.position),p=i.slice(0,3),r=i.slice(3),c=e.moving>=4,u=(L,C,E,le)=>`<div class="mp-trib">
      <div class="mp-trib-h">${L} ${yt(C)}${C}${hn(C)}<span class="mp-tritag ${le?"tritag-ti":"tritag-yong"}">${le?"体":"用"}</span></div>
      <div class="mp-hy" style="gap:5px">${Ve(E,{plain:!0})}</div>
    </div>`,m=`<div class="mp-hexbox">
      <div class="hb-h"><span>本卦</span><span>动 ${e.movingName}</span></div>
      <div class="hb-n">${e.ben.name}</div>
      ${u("上卦",e.ben.upper,p,!c)}
      ${u("下卦",e.ben.lower,r,c)}
      <div class="hb-s">${e.source}</div>
    </div>`,l=e.bodyUse.level,g=l.includes("凶")?"bad":l.includes("吉")?"good":"flat",w=`<div class="mp-mh-rel">
      <div><b>体</b>${e.bodyUse.body.trigram}（${e.bodyUse.body.element}）　<b>用</b>${e.bodyUse.use.trigram}（${e.bodyUse.use.element}）</div>
      <div><span class="mh-lv ${g}">${l}</span>　${e.bodyUse.relation}</div>
    </div>`,b=at(e.cuo.name)||["",""],k=at(e.zong.name)||["",""];return o.briefHTML(e)+`<div class="pp mp-mh">
      <div class="mp-mh-main">
        ${m}
        ${n("互卦",e.hu.name,e.hu.upper,e.hu.lower,"中藏之象")}
        ${n("变卦",e.bian.name,e.bian.upper,e.bian.lower,`动 ${e.movingName} 后`)}
        ${n("错卦",e.cuo.name,b[0],b[1],"六爻全变")}
        ${n("综卦",e.zong.name,k[0],k[1],"整卦倒转")}
      </div>
      ${w}
    </div>`};const It={乾为天:["乾","乾"],天风姤:["乾","巽"],天山遁:["乾","艮"],天地否:["乾","坤"],风地观:["巽","坤"],山地剥:["艮","坤"],火地晋:["离","坤"],火天大有:["离","乾"],坎为水:["坎","坎"],水泽节:["坎","兑"],水雷屯:["坎","震"],水火既济:["坎","离"],泽火革:["兑","离"],雷火丰:["震","离"],地火明夷:["坤","离"],地水师:["坤","坎"],艮为山:["艮","艮"],山火贲:["艮","离"],山天大畜:["艮","乾"],山泽损:["艮","兑"],火泽睽:["离","兑"],天泽履:["乾","兑"],风泽中孚:["巽","兑"],风山渐:["巽","艮"],震为雷:["震","震"],雷地豫:["震","坤"],雷水解:["震","坎"],雷风恒:["震","巽"],地风升:["坤","巽"],水风井:["坎","巽"],泽风大过:["兑","巽"],泽雷随:["兑","震"],巽为风:["巽","巽"],风天小畜:["巽","乾"],风火家人:["巽","离"],风雷益:["巽","震"],天雷无妄:["乾","震"],火雷噬嗑:["离","震"],山雷颐:["艮","震"],山风蛊:["艮","巽"],离为火:["离","离"],火山旅:["离","艮"],火风鼎:["离","巽"],火水未济:["离","坎"],山水蒙:["艮","坎"],风水涣:["巽","坎"],天水讼:["乾","坎"],天火同人:["乾","离"],坤为地:["坤","坤"],地雷复:["坤","震"],地泽临:["坤","兑"],地天泰:["坤","乾"],雷天大壮:["震","乾"],泽天夬:["兑","乾"],水天需:["坎","乾"],水地比:["坎","坤"],兑为泽:["兑","兑"],泽水困:["兑","坎"],泽地萃:["兑","坤"],泽山咸:["兑","艮"],水山蹇:["坎","艮"],地山谦:["坤","艮"],雷山小过:["震","艮"],雷泽归妹:["震","兑"]},Pa={乾:"金",兑:"金",离:"火",震:"木",巽:"木",坎:"水",艮:"土",坤:"土"},hn=e=>Pa[e]?` ${Pa[e]}`:"",at=e=>It[e]||null;o.daliurenHTML=function(e){const n=e.sanChuan,i=(m,l)=>`<div class="mp-dl-sc-c">
      <div class="mp-dl-sc-k">${l}</div>
      <div class="mp-dl-sc-z">${m.zhi}</div>
      <div class="mp-dl-sc-j">${m.jiangFull||m.jiang}</div>
      <div class="mp-dl-sc-l">${m.liuQin}${m.xunKong?" · 空":""}</div>
    </div>`,p=`<div class="mp-dl-sc-c ge">
      <div class="mp-dl-sc-k">格局</div>
      <div class="mp-dl-sc-gn">${e.geJu.name}</div>
      <div class="mp-dl-sc-l">${e.geJu.detail}</div>
    </div>`,r=e.siKe.slice().map(m=>`<div class="mp-dl-sk-c">
      <div class="mp-dl-sk-k">${["一课","二课","三课","四课"][m.position-1]||m.position+"课"}</div>
      <div class="mp-dl-sk-s">${m.shang}</div>
      <div class="mp-dl-sk-x">${m.xia}</div>
      <div class="mp-dl-sk-r">${m.relation} · ${m.jiangFull||m.jiang}</div>
    </div>`).join(""),c=e.pan.map(m=>{const l=qe[m.di]||[1,1];return`<div class="mp-dl-pc" style="grid-row:${l[0]};grid-column:${l[1]}">
        <div class="tz">${m.tian}</div>
        <div class="dz">地盘 ${m.di}</div>
        <div class="jz">${m.jiangFull}</div>
      </div>`}).join(""),u=`<div class="mp-dl-c">
      <div class="dl-t1">${e.dayGanZhi}日　${e.hourZhi}时</div>
      <div class="dl-t2">${e.dayNight}贵 · 月将 ${e.yueJiang.name}${e.yueJiang.zhi} · 贵人${e.guiren.reverse?"逆":"顺"}行</div>
      <div class="dl-t3">${n.chu.zhi} → ${n.zhong.zhi} → ${n.mo.zhi}</div>
      <div class="dl-t2">节气 ${e.jieqi.name}${e.jieqi.time?" "+e.jieqi.time:""}</div>
    </div>`;return o.briefHTML(e)+`<div class="pp mp-dl">
      <div class="mp-dl-head">日 ${e.dayGanZhi}　时 ${e.hourZhi}（${e.dayNight}贵）　月将 ${e.yueJiang.name}${e.yueJiang.zhi}　节气 ${e.jieqi.name}　贵人${e.guiren.reverse?"逆":"顺"}行</div>
      <div class="mp-dl-sc">${i(n.chu,"初传")}${i(n.zhong,"中传")}${i(n.mo,"末传")}${p}</div>
      <div class="mp-dl-sk">${r}</div>
      <div class="mp-dl-pan2">${c}${u}</div>
      ${(e.shensha||[]).length?`<div class="mp-dl-ss"><b>神煞</b>${e.shensha.map(m=>`<span title="${a(m.note||"")}">${m.name}<i>${m.branch}</i></span>`).join("")}</div>`:""}
      <div class="mp-dl-legend"><span>大字＝天盘支</span><span>小字＝地盘（固定十二支）</span><span>右下＝天将</span></div>
    </div>`},o.tarotHTML=function(e){const n=e.cards.map(r=>`
      <div class="mp-tt-card ${r.upright?"tt-up":"tt-rev"}">
        <div class="mp-tt-pos" title="${a(r.positionHint||"")}">${r.position}</div>
        <div class="mp-tt-name">${r.name}${r.number?`<span class="mp-tt-no">${r.number}</span>`:""}</div>
        ${r.en?`<div class="mp-tt-en">${r.en}</div>`:""}
        <div class="mp-tt-ori">${r.orientation}</div>
        ${r.image?`<div class="mp-tt-img">牌面：${r.image}</div>`:""}
        ${r.core?`<div class="mp-tt-core">${r.core}</div>`:""}
        <div class="mp-tt-kw">${r.keywords.map(c=>`<span>${c}</span>`).join("")}</div>
        <div class="mp-tt-el">${r.arcana} · ${r.element}${r.suit?" · "+r.suit+(r.rankCn?r.rankCn:""):""}${r.domain?" · "+r.domain:""}${r.astro?` · ${r.astro}`:r.role?` · ${r.role}`:""}</div>
      </div>`).join(""),i=e.question?a(e.question):'<span class="pp-dim">（未填写，可在上方输入后重抽）</span>',p=(e.reading||[]).map(r=>`<p>${a(r)}</p>`).join("");return o.briefHTML(e)+`<div class="pp mp-tt">
      <div class="mp-tt-q"><b>所问</b>${i}</div>
      <div class="mp-tt-head">${e.spread}${e.castAt?`　·　抽牌于 ${e.castAt}`:""}</div>
      <div class="mp-tt-grid">${n}</div>
      <div class="mp-tt-read"><div class="mp-tt-rt">牌面解读</div>${p}</div>
      <div class="mp-tt-note"><div class="mp-tt-rt">你的记录</div>
        <textarea class="mp-tt-ta" rows="4" placeholder="写下判断或对照后的想法……（仅本页可见，不保存）"></textarea>
      </div>
      ${e.systemNote?`<div class="mp-tt-tip">${e.systemNote}</div>`:""}
      <div class="mp-tt-tip">塔罗用于自我觉察与娱乐，不作确定性预言。</div>
    </div>`},o.QIAN_CUP_SVG='<svg viewBox="0 0 96 124" role="presentation" focusable="false"><ellipse class="qn-shadow" cx="48" cy="118" rx="29" ry="5"/><rect class="qn-stick" x="33" y="8" width="7" height="50" rx="3" transform="rotate(-8 36 33)"/><rect class="qn-stick hot" x="43" y="2" width="7" height="58" rx="3" transform="rotate(2 46 31)"/><rect class="qn-stick" x="55" y="10" width="7" height="48" rx="3" transform="rotate(11 58 34)"/><path class="qn-body" d="M20 42h56l-5 64a4 4 0 0 1-4 4H29a4 4 0 0 1-4-4Z"/><ellipse class="qn-rim" cx="48" cy="42" rx="28" ry="8"/><text class="qn-zi" x="48" y="84" text-anchor="middle">签</text></svg>',o.qianOracleHTML=function(){return`<span class="mp-qn-o-cup" aria-hidden="true">${o.QIAN_CUP_SVG}</span><span class="mp-qn-o-tx"><b>轻点一下</b><i>摇一摇 · 抽今日福签</i></span>`},o.qianHTML=function(e){if(!e||e.system!=="qian"||!e.slip)return o.quickHTML(e);const n=e.slip,i={上上:"ss",上:"s",中:"z",平:"p"}[n.level]||"p",p=String(n.no).padStart(2,"0"),r=(e.history||[]).map((c,u)=>`<li class="mp-qn-h-row lv-${{上上:"ss",上:"s",中:"z",平:"p"}[c.level]||"p"}${u===0?" on":""}" title="${a(c.date)} ${a(c.weekday)} · ${a(c.level)} · ${a(c.title)}">
        <span class="mp-qn-h-d"><i class="mp-qn-h-l" aria-hidden="true"></i>${a(c.date.slice(5))}</span>
        <span class="mp-qn-h-t">${a(c.title)}</span>
      </li>`).join("");return o.briefHTML(e)+`<div class="pp mp-qn mp-qn-lv-${i}" aria-label="今日福签">
      <div class="mp-qn-stage">
        <div class="mp-qn-cup" aria-hidden="true">
          ${o.QIAN_CUP_SVG}
        </div>
        <div class="mp-qn-card">
          <div class="mp-qn-top">
            <span class="mp-qn-kicker">第 ${p} 签 · 共 ${a(n.total)} 支 · ${a(n.level)}</span>
            <span class="mp-qn-seal" aria-hidden="true">${a(n.level)}</span>
          </div>
          <h2 class="mp-qn-title">${a(n.title)}</h2>
          <p class="mp-qn-verse"><span>${a(n.verse[0])}</span><span>${a(n.verse[1])}</span></p>
          <div class="mp-qn-blk"><b>签意</b><p>${a(n.meaning)}</p></div>
          <div class="mp-qn-blk"><b>今日可为</b><p>${a(n.advice)}</p></div>
          <div class="mp-qn-chips">${(n.chips||[]).map(c=>`<span>${a(c)}</span>`).join("")}</div>
        </div>
      </div>
      <p class="mp-qn-aside">${a(e.aside)}</p>
      <div class="mp-qn-meta">
        <span>${a(e.meta.date)}</span><span>${a(e.meta.weekday)}</span>
        <span>${a(e.meta.lunar)}</span><span>${a(e.meta.ganzhi)}</span>
      </div>
      <div class="mp-qn-hist">
        <div class="mp-qn-histh"><b>近七日</b><span>一日一签 · 不重摇</span></div>
        <ol>${r}</ol>
      </div>
      <p class="mp-qn-tip">${a(e.rules)}　${a(e.disclaimer)}</p>
    </div>`},o.guanyinOracleHTML=function(){return`<span class="mp-qn-o-cup" aria-hidden="true">${o.QIAN_CUP_SVG}</span><span class="mp-qn-o-tx"><b>轻点一下</b><i>摇一摇 · 抽一支灵签</i></span>`},o.guanyinHTML=function(e){if(!e||e.system!=="guanyin"||!e.slip)return o.quickHTML(e);const n=e.slip,i={上:"s",中:"z",下:"x"}[n.level]||"z",p=String(n.no).padStart(2,"0"),r=String(e.meta&&e.meta.question||"").trim(),c=(n.poem||[]).map(u=>`<span>${a(u)}</span>`).join("");return o.briefHTML(e)+`<div class="pp mp-qn mp-lq mp-lq-lv-${i}" aria-label="观音灵签">
      <div class="mp-qn-stage">
        <div class="mp-qn-cup" aria-hidden="true">
          ${o.QIAN_CUP_SVG}
        </div>
        <div class="mp-qn-card">
          <div class="mp-qn-top">
            <span class="mp-qn-kicker">第 ${p} 签 · 共 ${a(n.total)} 支 · ${a(n.level)}签 · ${a(n.palace)}</span>
            <span class="mp-qn-seal" aria-hidden="true">${a(n.level)}</span>
          </div>
          <h2 class="mp-qn-title">${a(n.title)}</h2>
          <p class="mp-qn-verse mp-lq-verse">${c}</p>
          ${n.omen?`<p class="mp-lq-omen">${a(n.omen)}</p>`:""}
          <div class="mp-qn-blk"><b>签意</b><p>${a(n.meaning)}</p></div>
          <div class="mp-qn-blk"><b>可为</b><p>${a(n.advice)}</p></div>
          <div class="mp-qn-chips">${(n.chips||[]).map(u=>`<span>${a(u)}</span>`).join("")}</div>
        </div>
      </div>
      ${e.aside?`<p class="mp-qn-aside">${a(e.aside)}</p>`:""}
      ${r?`<p class="mp-lq-ask"><b>所问</b>${a(r)}</p>`:""}
      <div class="mp-qn-meta">
        <span>${a(n.level)}签</span><span>${a(n.palace)}</span>
        <span>第 ${n.no} / ${a(n.total)} 签</span><span>${a(e.meta&&e.meta.method||"摇签")}</span>
      </div>
      <button type="button" class="mp-qn-again" data-lq-again>再摇一签</button>
      <p class="mp-qn-tip">${a(e.rules)}　${a(e.disclaimer)}</p>
    </div>`};const tt=e=>{if(!e||!Array.isArray(e.pairs)||!e.pairs.length)return"";const i='<tr><th scope="col">一对</th><th scope="col">契合度</th>'+(e.pairs[0].dimensions||[]).map(u=>`<th scope="col">${a(u.label)}</th>`).join("")+"</tr>",p=e.pairs.map(u=>`<tr><th scope="row">${a(u.a)} × ${a(u.b)}</th><td>${u.total==null?"—":`${a(u.total)}/100`}<span class="mp-hp-lv">${a(u.level||"")}</span></td>`+(u.dimensions||[]).map(m=>`<td>${m.score>=0?"+":""}${a(m.score)}</td>`).join("")+"</tr>").join(""),r=e.spread>=3&&e.best?`最顺：<b>${a(e.best.a)} × ${a(e.best.b)}</b>（${a(e.best.total)}/100）`+(e.hardest?`；最需磨合：<b>${a(e.hardest.a)} × ${a(e.hardest.b)}</b>（${a(e.hardest.total)}/100）`:""):`三对分数接近（相差 ${a(e.spread)} 分），不排名`,c=e.focus&&e.focus.spread>=3?`<p>差异最大的一维：<b>${a(e.focus.label)}</b>（三对相差 ${a(e.focus.spread)} 分）</p>`:"";return`<div class="mp-hp-triple">
      <div class="mp-hp-ith">三方合盘 · 三对并列</div>
      <table><thead>${i}</thead><tbody>${p}</tbody></table>
      <p>${r}</p>${c}
      <p>${a(e.note||"")}</p>
    </div>`};o.hepanHTML=function(e){const n=(p,r)=>`<div class="mp-hp-side">
      <div class="mp-hp-who">${r}</div>
      <div class="mp-hp-gz">${p.pillars.join(" ")}</div>
      <div class="mp-hp-kv"><span>日主</span><b>${p.dayMaster}</b></div>
      <div class="mp-hp-kv"><span>日支</span><b>${p.dayBranch}</b></div>
      <div class="mp-hp-kv"><span>强弱</span><b>${p.strength||"—"}</b></div>
      <div class="mp-hp-kv"><span>喜用</span><b>${p.favor||"—"}</b></div>
    </div>`,i=e.dimensions.map(p=>`<div class="mp-hp-dim">
      <div class="mp-hp-dimh"><span>${p.label}</span><b class="${p.score>=10?"good":p.score<0?"bad":""}">${p.score>=0?"+":""}${p.score}</b></div>
      <div class="mp-hp-dimt">${p.text}</div>
    </div>`).join("");return o.briefHTML(e)+`<div class="pp mp-hp">
      <div class="mp-hp-head"><b>${e.score.level}</b><span>${e.score.total}/100</span></div>
      <div class="mp-hp-sides">${n(e.a,"你")}${n(e.b,"对方")}</div>
      <div class="mp-hp-dims">${i}</div>
      ${tt(e.triple)}
      <div class="mp-hp-notes">${e.notes.map(p=>`<p>${p}</p>`).join("")}</div>
    </div>`},o.qimenFactsHTML=function(e){if(!e||!e.palaces)return"";const n=(r,c)=>`<div class="relation__row"><dt>${a(r)}</dt><dd>${a(c)}</dd></div>`,i=r=>r&&["旺","相","休","囚","死"].filter(u=>Array.isArray(r[u])&&r[u].length).map(u=>`${u} ${r[u].join("、")}`).join("；")||"—";return`<dl class="relation mp-qm-facts" aria-label="奇门盘面事实">${[["局数",`${e.ju}${e.yuan?`（${e.yuan}）`:""}`],["节气",`${e.jieqi||"—"}${e.jieqiTime?`（${e.jieqiTime}）`:""}`],["四柱",`${e.siZhu?`${e.siZhu.year} ${e.siZhu.month} ${e.siZhu.day} ${e.siZhu.time}`:"—"}`],["值符",e.zhiFu?`${e.zhiFu.star} · ${e.zhiFu.gong}宫`:"—"],["值使",e.zhiShi?`${e.zhiShi.gate} · ${e.zhiShi.gong}宫`:"—"],["旬首",e.xunshou||"—"],["空亡",(e.kongWang||[]).join("")||"—"],["驿马",e.ma&&e.ma.zhi?`${e.ma.zhi}${e.ma.gong?`（${e.ma.gong}宫）`:""}`:"—"],["换局规则",e.juMethodNote||e.juMethod||"—"],["晚子时",e.lateZiHourMode==="next-day"?"23:00 后归次日":"23:00 后仍归当日"],["击刑",e.conditions&&e.conditions.jiXing&&e.conditions.jiXing.length?e.conditions.jiXing.map(r=>`${r.palace}宫${r.stem}`).join("、"):"本盘无"],["三奇入墓",e.conditions&&e.conditions.ruMu&&e.conditions.ruMu.length?e.conditions.ruMu.map(r=>`${r.palace}宫${r.stem}`).join("、"):"本盘无"],["六仪入墓",e.conditions&&e.conditions.liuYiRuMu&&e.conditions.liuYiRuMu.length?e.conditions.liuYiRuMu.map(r=>`${r.palace}宫${r.stem}`).join("、"):"本盘无"],["十干克应",[...e.palaces||[],e.centerPalace].filter(c=>c&&c.ganYing).map(c=>`${c.palace}宫 ${c.ganYing.tian}加${c.ganYing.di}「${c.ganYing.name}」`).join("；")||"—"],["月令",e.month&&e.month.branch?`${e.month.branch}（${e.month.element}）`:"—"],["门旺衰",i(e.states&&e.states.gate)],["星旺衰",i(e.states&&e.states.star)],["干旺衰",i(e.states&&e.states.stem)],["干宫生克",(()=>{const r=["干克宫","宫克干","干生宫","宫生干","比和"],c={};for(const u of e.palaces||[]){const m=u.stemRelation||null;!m||m.type==="unknown"||!u.tianPan||(c[m.type]=c[m.type]||[]).push(u.tianPan)}return r.filter(u=>c[u]).map(u=>u+" "+c[u].join("、")).join("；")||"—"})()]].map(([r,c])=>n(r,c)).join("")}</dl>`};const Oa=[["4","9","2"],["3","5","7"],["8","1","6"]];o.qimenHTML=function(e){const n={};for(const p of e.palaces)n[p.palace]=p;const i=p=>{if(p==="5")return`<div class="pp-qm-cell center">
          <div class="pp-qm-ju">${e.ju}</div>
          <div class="pp-qm-kv">${e.siZhu.year} ${e.siZhu.month}</div>
          <div class="pp-qm-kv">${e.siZhu.day} ${e.siZhu.time}</div>
          <div class="pp-qm-kv dim">${e.jieqi} ${e.yuan}</div>
        </div>`;const r=n[p]||{};return`<div class="pp-qm-cell">
        <div class="pp-qm-top"><span class="god">${r.god||""}</span><span class="mk">${r.kong?"空":""}${r.ma?"马":""}</span></div>
        <div class="pp-qm-mid"><span class="tp">${r.tianPan||""}</span><span class="star">${r.star||""}</span></div>
        <div class="pp-qm-mid"><span class="dp">${r.diPan||""}</span><span class="gate">${r.gate||""}</span></div>
        <div class="pp-qm-bot"><span>${r.anGan||""}</span><span class="no">${p}</span></div>
        <div class="pp-qm-bot"><span class="dim">${r.stemRelation&&r.stemRelation.type!=="unknown"?r.stemRelation.type:""}</span><span class="dim">${r.stemState||""}</span></div>
        <div class="pp-qm-bot"><span class="dim">${r.ganYing?a(`${r.ganYing.tian}加${r.ganYing.di} ${r.ganYing.name}`):""}</span></div>
      </div>`};return o.briefHTML(e)+`<div class="pp mp-qm">
      <div class="mp-qm-head">
        <b>${e.ju}</b>
        <span>${e.siZhu.year} ${e.siZhu.month} ${e.siZhu.day} ${e.siZhu.time}</span>
        <span>节气 ${e.jieqi}（${e.jieqiTime}）</span>
        <span>值符 ${e.zhiFu.star}（${e.zhiFu.gong}宫）　值使 ${e.zhiShi.gate}（${e.zhiShi.gong}宫）</span>
        <span>旬首 ${e.xunshou}　空亡 ${e.kongWang.join("")||"—"}　驿马 ${e.ma.zhi||"—"}</span>
      </div>
      <div class="mp-qm-grid">${Oa.map(p=>p.map(i).join("")).join("")}</div>
      <div class="mp-qm-legend">上＝九星　中＝天盘干／八门　下＝地盘干／宫号　角落＝八神</div>
      <div class="mp-qm-rules">${e.rules.map(p=>`<p>${p}</p>`).join("")}</div>
    </div>`},o.ziweiHepanHTML=function(e){const n=(r,c)=>`<div class="mp-hp-side">
      <div class="mp-hp-who">${c}</div>
      <div class="mp-hp-gz">命宫 ${r.soul.branch}　夫妻 ${r.soul.branch,""}${r.spouseStars.length,""}</div>
      <div class="mp-hp-kv"><span>命宫主星</span><b>${r.soulStars.join("、")||"无正曜"}</b></div>
      <div class="mp-hp-kv"><span>夫妻宫主星</span><b>${r.spouseStars.join("、")||"无正曜"}</b></div>
      <div class="mp-hp-kv"><span>五行局</span><b>${r.bureau}</b></div>
      <div class="mp-hp-kv"><span>身宫</span><b>${r.body.branch}（${r.body.lands||"—"}）</b></div>
      <div class="mp-hp-kv"><span>生年四化</span><b>${r.natalSihua.join("、")}</b></div>
    </div>`,i=e.dimensions.map(r=>`<div class="mp-hp-dim">
      <div class="mp-hp-dimh"><span>${r.label}</span><b class="${r.score>=10?"good":r.score<0?"bad":""}">${r.score>=0?"+":""}${r.score}</b></div>
      <div class="mp-hp-dimt">${r.text}</div>
    </div>`).join(""),p=r=>(e.interactions||[]).filter(c=>c.who===r).map(c=>`<li><b class="m-${c.mutagen}">${c.mutagen}</b>${c.star}：本命${c.ownPalace} → 对方${c.landingPalace||"盘外"}${c.strong?"<i>（强）</i>":""}</li>`).join("");return o.briefHTML(e)+`<div class="pp mp-hp">
      <div class="mp-hp-head"><b>${e.score.level}</b><span>${e.score.total}/100　紫微合盘</span></div>
      <div class="mp-hp-sides">${n(e.a,"你")}${n(e.b,"对方")}</div>
      <div class="mp-hp-dims">${i}</div>
      <div class="mp-hp-inter">
        <div><div class="mp-hp-ith">你的四化 落在对方</div><ul>${p("你")||"<li>无</li>"}</ul></div>
        <div><div class="mp-hp-ith">对方的四化 落在你</div><ul>${p("对方")||"<li>无</li>"}</ul></div>
      </div>
      ${tt(e.triple)}
      <div class="mp-hp-notes">${e.notes.map(r=>`<p>${r}</p>`).join("")}</div>
    </div>`},o.curveHTML=function(e){const n=e&&e.dayun&&Array.isArray(e.dayun.list)?e.dayun.list:[],i=e&&Array.isArray(e.liunian)?e.liunian:[];if(n.length<2)return"";const p=P=>typeof P=="number"&&isFinite(P)?P:0,r=P=>P.luck?p(P.luck.score):0,c=4.2,u=-2.2,m=p(e.dayun.startAge&&e.dayun.startAge.years),l=n.length?n[n.length-1].startAge+10:m+80,g=i.map(P=>p(P.age)).filter(P=>P>0),w=Math.min(m,...g.length?g:[m]),b=Math.max(l,...g.length?g:[l]),k=Math.max(1,b-w),L=640,C=190,E={t:14,r:16,b:26,l:30},le=L-E.l-E.r,B=C-E.t-E.b,O=P=>E.l+(P-w)/k*le,ne=P=>E.t+B-(Math.max(u,Math.min(c,P))-u)/(c-u)*B,T=[{from:1.2,to:c,cls:"b-good"},{from:.55,to:1.2,cls:"b-good"},{from:-.8,to:.55,cls:"b-flat"},{from:-1.45,to:-.8,cls:"b-bad"},{from:u,to:-1.45,cls:"b-bad"}].map(P=>`<rect class="cv-band ${P.cls}" x="${E.l}" y="${ne(P.to).toFixed(1)}" width="${le}" height="${(ne(P.from)-ne(P.to)).toFixed(1)}"/>`).join(""),oe=10/k*le,X=[];n.forEach((P,Le)=>{const Ne=p(P.startAge),Ze=r(P),ma=Math.max(E.l,O(Ne)),ua=Math.min(E.l+le,O(Ne+10));X.push(`${ma.toFixed(1)},${ne(Ze).toFixed(1)}`),X.push(`${ua.toFixed(1)},${ne(Ze).toFixed(1)}`)});const Ae=X.length?`<polyline class="cv-dy" points="${X.join(" ")}"/>`:"",je=X.length?`<polygon class="cv-dyfill" points="${E.l},${(E.t+B).toFixed(1)} ${X.join(" ")} ${(E.l+le).toFixed(1)},${(E.t+B).toFixed(1)}"/>`:"",U=i.filter(P=>P.luck&&typeof P.luck.score=="number").map(P=>({x:O(p(P.age)),y:ne(p(P.luck.score)),y0:p(P.year),gz:P.ganzhi,tier:P.luck.tier,v:p(P.luck.score),age:p(P.age)})),be=U.length>1?`<polyline class="cv-ln" points="${U.map(P=>`${P.x.toFixed(1)},${P.y.toFixed(1)}`).join(" ")}"/>`:"",ie={大吉:"var(--lu)",吉:"var(--lu)",平:"var(--muted)",忌:"var(--red)",大忌:"var(--red)"},y=U.length?Math.min(...U.map(P=>P.y0)):null,z=U.map(P=>`<circle class="cv-dot${P.y0===y?" now":""}" cx="${P.x.toFixed(1)}" cy="${P.y.toFixed(1)}" fill="${ie[P.tier]||"var(--muted)"}"><title>${a(`${P.y0}年（${P.age}岁）${P.gz}　${P.tier} ${P.v}`)}</title></circle>`).join(""),q=`<line class="cv-ax zero" x1="${E.l}" y1="${ne(0).toFixed(1)}" x2="${E.l+le}" y2="${ne(0).toFixed(1)}"/><line class="cv-ax" x1="${E.l}" y1="${E.t}" x2="${E.l}" y2="${E.t+B}"/>`,fe=k>60?10:5,v=[];for(let P=Math.ceil(w/fe)*fe;P<=b;P+=fe)v.push(`<text class="cv-lbl age" x="${O(P).toFixed(1)}" y="${(E.t+B+13).toFixed(1)}" text-anchor="middle">${P}岁</text>`);const J=`<text class="cv-lbl" x="${(E.l-5).toFixed(1)}" y="${(ne(2.4)+3).toFixed(1)}" text-anchor="end">吉</text><text class="cv-lbl" x="${(E.l-5).toFixed(1)}" y="${(ne(0)+3).toFixed(1)}" text-anchor="end">平</text><text class="cv-lbl" x="${(E.l-5).toFixed(1)}" y="${(ne(-1.8)+3).toFixed(1)}" text-anchor="end">忌</text>`,pe=n.slice().sort((P,Le)=>r(Le)-r(P)),N=pe[0],I=pe[pe.length-1],ae=N&&r(N)>.55?`<text class="cv-lbl" x="${O(p(N.startAge)+5).toFixed(1)}" y="${(ne(r(N))-5).toFixed(1)}" text-anchor="middle">▲${N.startAge}岁 ${N.luck.tier}</text>`:"",re=I&&r(I)<-.8?`<text class="cv-lbl" x="${O(p(I.startAge)+5).toFixed(1)}" y="${(ne(r(I))+11).toFixed(1)}" text-anchor="middle">▼${I.startAge}岁 ${I.luck.tier}</text>`:"",xe=`<div class="cv-legend">
      <span><i style="background:var(--quan)"></i>大运（阶梯，一步十年）</span>
      <span><i style="background:var(--ke)"></i>流年（逐年折线）</span>
      <span>绿带＝吉　灰带＝平　红带＝忌</span>
    </div>`,Me=`<div class="cv-tip">曲线只呈现引擎已给出的行运评分（${u} ~ ${c}），不预测具体事件；档位与依据见下方「大运 / 流年」各节。悬停看逐年详情。</div>`;return`<div class="mp-curve">
      <div class="mp-curve-h"><b>人生运势曲线</b><span>${w}–${b} 岁　${e.dayun.rule}，${m} 岁起运${e.dayun.jiao&&e.dayun.jiao.at?`，交运 ${e.dayun.jiao.at}`:""}</span></div>
      <svg viewBox="0 0 ${L} ${C}" role="img" aria-label="人生运势曲线：${w} 到 ${b} 岁的大运与流年评分走势">
        ${T}${q}${je}${Ae}${be}${z}${v.join("")}${J}${ae}${re}
      </svg>
      ${xe}${Me}
    </div>`},o.trendChart=function(e){const n=e&&Array.isArray(e.points)?e.points:[];if(n.length<2)return"";const i=e&&Array.isArray(e.segments)?e.segments:[],p=N=>typeof N=="number"&&isFinite(N)?N:0,r=720,c=322,u={t:34,r:46,b:66,l:36},m=r-u.l-u.r,l=c-u.t-u.b,g=n.length,w=m/g,b=N=>u.l+(N+.5)*w,k=N=>u.t+l-Math.max(0,Math.min(100,N))/100*l,L=Math.max(1.1,Math.min(10,w*.62)),C=N=>p(N.score),E=u.t+l,le=E+20,B=22,ne=`klclip${(()=>{let N=2166136261;const I=ae=>{const re=String(ae??"");for(let xe=0;xe<re.length;xe++)N^=re.charCodeAt(xe),N=Math.imul(N,16777619)};I(g),I(n[0]&&n[0].age),I(n[g-1]&&n[g-1].age);for(const ae of n)I(ae&&ae.score);return(N>>>0).toString(36)})()}`,Z=i.map((N,I)=>{const ae=Math.max(0,N.startAge-1),re=Math.min(g-1,N.endAge-1);if(re<ae)return"";const xe=u.l+ae*w,Me=Math.max(.6,(re-ae+1)*w),Le=I%2===1?`<rect class="kl-band" x="${xe.toFixed(1)}" y="${u.t}" width="${Me.toFixed(1)}" height="${l}"/><rect class="kl-stripband" x="${xe.toFixed(1)}" y="${le}" width="${Me.toFixed(1)}" height="${B}"/>`:"",Ne=I===0?"":`<line class="kl-segline" x1="${xe.toFixed(1)}" y1="${u.t}" x2="${xe.toFixed(1)}" y2="${E}"/>`,Ze=Math.min(Math.max(u.l+(ae+re+1)/2*w,u.l+22),u.l+m-22);return Le+Ne+`<text class="kl-seg" x="${Ze.toFixed(1)}" y="${(le+15).toFixed(1)}" text-anchor="middle">${a(N.ganZhi)}</text>`}).join(""),T=[0,25,50,75,100].map(N=>`<line class="kl-grid${N===50?" mid":""}" x1="${u.l}" y1="${k(N).toFixed(1)}" x2="${u.l+m}" y2="${k(N).toFixed(1)}"/><text class="kl-lbl" x="${u.l-6}" y="${(k(N)+3).toFixed(1)}" text-anchor="end">${N}</text>`).join(""),oe=n.map((N,I)=>{const ae=N.kline||{},re=p(ae.open),xe=p(ae.close),Me=Math.min(100,p(ae.high)),P=Math.max(0,p(ae.low)),Le=xe>=re,Ne=k(re),Ze=k(xe),ma=Math.min(Ne,Ze),ua=Math.max(.8,Math.abs(Ne-Ze)),Za=b(I),Ka=`${N.age}岁（${N.year}年 ${N.ganZhi}）${xe}分${N.dayunGanZhi?` · ${N.dayunGanZhi}运`:""}`;return`<g class="kl-c${Le?" up":" down"}"><title>${a(Ka)}</title><line x1="${Za.toFixed(2)}" y1="${k(Me).toFixed(1)}" x2="${Za.toFixed(2)}" y2="${k(P).toFixed(1)}"/><rect x="${(Za-L/2).toFixed(2)}" y="${ma.toFixed(1)}" width="${L.toFixed(2)}" height="${ua.toFixed(1)}" rx="0.7"/></g>`}).join(""),X=N=>{const I=[];for(let ae=0;ae<g;ae++){if(ae+1<N)continue;let re=0;for(let xe=ae+1-N;xe<=ae;xe++)re+=C(n[xe]);I.push({i:ae,v:re/N})}return I},Ae=N=>X(N).map((I,ae)=>`${ae?"L":"M"}${b(I.i).toFixed(1)} ${k(I.v).toFixed(1)}`).join(" "),je=(N,I)=>{const ae=X(N);if(!ae.length)return"";const re=ae[ae.length-1];return{cls:I,y:k(re.v),text:`<text class="kl-ma-lbl ${I}" x="${u.l+m+5}" y="${k(re.v).toFixed(1)}" text-anchor="start">${re.v.toFixed(0)}</text>`}},U=je(10,"m10"),be=je(5,"m5"),ie=(()=>{if(!be||!U)return`${U?U.text:""}${be?be.text:""}`;let N=be.y,I=U.y;if(Math.abs(N-I)<10){const ae=Math.min(N,I),re=Math.max(N,I);N=ae-6,I=re+6}return`<text class="kl-ma-lbl m10" x="${u.l+m+5}" y="${I.toFixed(1)}" text-anchor="start">${X(10).slice(-1)[0].v.toFixed(0)}</text><text class="kl-ma-lbl m5" x="${u.l+m+5}" y="${N.toFixed(1)}" text-anchor="start">${X(5).slice(-1)[0].v.toFixed(0)}</text>`})();let y=n[0],z=n[0];for(const N of n)C(N)>C(y)&&(y=N),C(N)<C(z)&&(z=N);const q=(N,I,ae)=>{const re=n.indexOf(N),xe=b(re),Me=k(C(N)),P=Math.min(Math.max(xe,u.l+26),u.l+m-26),Le=I==="hi"?Me-8<u.t+6?14:ae:Me+12>u.t+l-2?-8:ae;return`<g class="kl-mark ${I}"><circle cx="${xe.toFixed(1)}" cy="${Me.toFixed(1)}" r="2"/><circle class="ring" cx="${xe.toFixed(1)}" cy="${Me.toFixed(1)}" r="4.6"/><text x="${P.toFixed(1)}" y="${(Me+Le).toFixed(1)}" text-anchor="middle">${N.age}岁 ${C(N)}</text></g>`},fe=g>60?10:5,v=n.filter(N=>N.age%fe===0).map(N=>`<text class="kl-lbl age" x="${b(n.indexOf(N)).toFixed(1)}" y="${(E+14).toFixed(1)}" text-anchor="middle">${N.age}</text>`).join(""),J=`<text class="kl-lbl axis" x="${u.l}" y="${(c-6).toFixed(1)}">年龄（岁）</text><text class="kl-lbl axis" x="${u.l+m}" y="${(c-6).toFixed(1)}" text-anchor="end">每岁一分 · 满分 100</text>`;return`<div class="mp-kline-fig">
      <svg viewBox="0 0 ${r} ${c}" role="img" aria-label="人生K线：1 到 ${g} 岁的逐年评分蜡烛图">
        <defs><clipPath id="${ne}"><rect x="${u.l}" y="${u.t}" width="${m}" height="${l}"/></clipPath></defs>
        ${Z}${T}
        <g clip-path="url(#${ne})">
          ${oe}
          <path class="kl-ma m10" d="${Ae(10)}"/><path class="kl-ma m5" d="${Ae(5)}"/>
        </g>
        ${ie}
        ${q(y,"hi",-8)}${q(z,"lo",12)}
        ${v}${J}
      </svg><div class="kl-legend"><span><i class="up"></i>阳线：比上一岁高</span><span><i class="down"></i>阴线：比上一岁低</span><span><i class="m5"></i>5 年均线</span><span><i class="m10"></i>10 年均线</span><span>虚线＝大运交界</span></div></div>`},o.trendHTML=function(e,n){if(!e)return"";const i=!(n&&n.brief===!1),p=o.trendChart(e);if(!p)return o.quickHTML(e);const r=Array.isArray(e.segments)?e.segments:[],c=e.highlights&&typeof e.highlights=="object"?e.highlights:{},u=e.meta||{},m=u.strength||{},l=r.map(T=>`<span class="kl-chip">${a(T.ganZhi)}<em>${T.startAge}–${T.endAge}</em></span>`).join(""),g=(Array.isArray(c.best)?c.best:[]).map(T=>`<div class="kl-hl hi">${a(T)}</div>`).join(""),w=(Array.isArray(c.worst)?c.worst:[]).map(T=>`<div class="kl-hl lo">${a(T)}</div>`).join(""),b=u.boundaryNote?`<div class="mp-kline-note">${a(u.boundaryNote)}</div>`:c.suppressed?`<div class="mp-kline-note">${a(c.suppressed)}</div>`:"",k=Array.isArray(e.points)?e.points:[],L=T=>typeof T.score=="number"&&isFinite(T.score)?T.score:0,C=k.map(L),E=C.length?C.reduce((T,oe)=>T+oe,0)/C.length:0,le=C.length?Math.max(...C)-Math.min(...C):0,B=r.map(T=>{const oe=k.filter(X=>X.age>=T.startAge&&X.age<=T.endAge).map(L);return{ganZhi:T.ganZhi,v:oe.length?oe.reduce((X,Ae)=>X+Ae,0)/oe.length:0}}).filter(T=>T.v>0).sort((T,oe)=>oe.v-T.v),O=!!(m.boundary||c.suppressed),ne=[`<span><em>全段均值</em><b>${E.toFixed(0)}</b></span>`];!O&&B.length&&(ne.push(`<span><em>最好大运</em><b class="hi">${a(B[0].ganZhi)} ${B[0].v.toFixed(0)}</b></span>`),ne.push(`<span><em>最差大运</em><b class="lo">${a(B[B.length-1].ganZhi)} ${B[B.length-1].v.toFixed(0)}</b></span>`)),ne.push(`<span><em>波动幅度</em><b>${le.toFixed(0)}</b></span>`);const Z=`<div class="kl-stats">${ne.join("")}</div>`;return(i?o.briefHTML(e):"")+`<section class="mp-kline" aria-label="人生K线结果">
      <div class="mp-kline-h"><h2 class="mp-kline-title">人生 K 线</h2><span>${a(u.birth||"")}　日主 ${a(u.dayMaster||"")}　${a(m.level||"")}${m.score?`（${m.score}）`:""}</span></div>
      ${p}
      ${Z}
      ${l?`<div class="kl-segs">${l}</div>`:""}
      ${g||w?`<div class="kl-hls">${g}${w}</div>`:""}
      ${b}
      <div class="mp-kline-tip">逐岁分数由大运与流年十神按固定表确定性计分（1–100），只表五行力量的顺逆，不预测具体事件；旺衰落在换档阈值附近时，不出高低年份结论。</div>
    </section>`},o.chengguHTML=function(e){if(!e)return"";const n=e.weights||{},i=e.song||{},p=["year","month","day","hour"].map(m=>{const l=n[m]||{label:"",qian:0},g=String(l.label||"").split(" ")[0]||"",w=String(l.label||"").split(" ")[1]||"";return`<div class="cg-cell"><em>${a(g)}</em><b>${a(w)}</b></div>`}).join(""),r=String(i.text||""),c=r?r.replace(/[。]$/,"").split("；").map((m,l)=>`<span>${a(m)}${l===0?"；":"。"}</span>`).join(""):"",u=e.verdict&&e.verdict.band?e.verdict.band:"";return`<section class="mp-cg" aria-label="称骨结果">
      <div class="mp-cg-h"><b>称骨</b><span>${a(e.lunar&&e.lunar.text?e.lunar.text:"")}</span></div>
      <div class="mp-cg-w">${p}</div>
      <div class="mp-cg-tot"><em>骨重合计</em><b>${a(e.total&&e.total.label?e.total.label:"")}</b>${u?`<i>${a(u)}</i>`:""}</div>
      <div class="mp-cg-song"><div class="mp-cg-song-h">称骨歌 · ${a(e.total&&e.total.label?e.total.label:"")}</div>
        <div class="mp-cg-verse">${c||'<span class="mp-cg-miss">该骨重未见通行本歌诀</span>'}</div>
        <div class="mp-cg-plain"><em>释义</em>${a(i.plain||"")}</div></div>
      ${e.verdict&&e.verdict.text?`<div class="mp-cg-band"><em>分档</em>${a(e.verdict.text)}</div>`:""}
      <div class="mp-cg-note">骨重与歌诀为通行本口径（各版本歌诀有异文，断句标点已统一）；男女同表，本盘只收一套歌诀，旧本另有女命歌诀此处不另出；释义为白话自撰，只作字面直解，属民俗娱乐参考，不构成命运断言。</div>
    </section>`},o.nameHTML=function(e){if(!e)return"";const n={木:"wood",火:"fire",土:"earth",金:"metal",水:"water"},i=g=>g==="未收录"?'<span class="mp-nm-el">未收录</span>':`<span class="mp-nm-el wx-${n[g]||"earth"}">${a(g)}</span>`,p=(g,w)=>`<div class="mp-nm-h"><b>${a(g)}</b>${w?`<i>${a(w)}</i>`:""}</div>`;if(e.action==="generate"){const g=e.bazi&&e.bazi.favorable?e.bazi.favorable.join("、"):"",w=(e.candidates||[]).map(b=>{const k=b.wuge&&b.wuge.available?(()=>{const C=b.wuge.rows.filter(B=>B.level==="吉").length,E=b.wuge.rows.filter(B=>B.level==="凶").length;return`<span class="mp-nm-fit${E===0&&C>=4?" ok":E>=2?" no":""}" title="${a(b.wuge.summary)}">五格 ${C}/5 吉</span>`})():"",L=b.phonetics&&b.phonetics.available?`<span class="mp-nm-fit${b.phonetics.level==="拗口"?" no":b.phonetics.level==="顺口"?" ok":""}" title="${a((b.phonetics.issues||[]).map(C=>C.text).join("；"))}">${a(b.phonetics.level)}</span>`:"";return`<div class="mp-nm-c"><b>${a(b.name)}</b><span class="mp-nm-els">${b.chars.map(C=>i(C.element)).join("")}${k}${L}</span><em>${a(b.chars.map(C=>C.char+"·"+C.meaning).join("　"))}</em></div>`}).join("");return`<section class="mp-nm" aria-label="候选名">
        ${p("候选名",`姓 ${e.surname}（${e.gender}）${g?`　喜用 ${g}`:""}`)}
        <div class="mp-nm-cand">${w}</div>
        <div class="mp-nm-note">${(e.notes||[]).map(b=>"※ "+a(b)).join("<br>")}</div>
      </section>`}const r=(e.chars||[]).map(g=>{const w=g.favorable===!0?'<span class="mp-nm-fit ok">合喜用</span>':g.favorable===!1?'<span class="mp-nm-fit no">不合喜用</span>':'<span class="mp-nm-fit">不判</span>',b=g.source==="user"?"用户指定":g.source==="lib"?"字库":"未收录",k=g.suggest&&g.suggest.length?`<div class="mp-nm-sug"><b>可换</b>${g.suggest.map(L=>`<span class="wx-${n[L.element]||"earth"}">${a(L.char)}（${a(L.element)}）</span>`).join("")}</div>`:"";return`<div class="mp-nm-row"><div class="mp-nm-ch">${a(g.char)}</div>
        <div class="mp-nm-b"><div class="mp-nm-t">${i(g.element)}<span>${a(b)}</span>${w}</div>
        <div class="mp-nm-m">${a(g.meaning)}</div>${k}</div></div>`}).join(""),c=e.bazi?`<div class="mp-nm-m">八字：${a(e.bazi.dayMaster&&e.bazi.dayMaster.stem?`${e.bazi.dayMaster.stem}（${e.bazi.dayMaster.element}）`:String(e.bazi.dayMaster||""))}　${a(e.bazi.strength?`${e.bazi.strength.level}（${e.bazi.strength.score}）`:"")}　喜用 ${a((e.bazi.favorable||[]).join("、"))}</div>
         <div class="mp-nm-m">${a(e.bazi.basis||"")}</div>`:"",u=g=>g==="吉"?"is-ok":g==="半吉"?"is-half":"is-bad",m=e.wuge&&e.wuge.available?`<div class="mp-nm-wu">
          <div class="mp-nm-wu-h"><b>五格</b><i>康熙笔画 · 通行本 81 数理</i></div>
          <div class="mp-nm-wu-rows">${e.wuge.rows.map(g=>`<div class="mp-nm-wu-c ${u(g.level)}"><em>${a(g.key)}</em><b>${g.strokes}</b><i>${a(`${g.level} · ${g.name}`)}</i></div>`).join("")}</div>
          <div class="mp-nm-m">笔画：${e.wuge.strokes.map(g=>`${a(g.char)}${g.strokes}${g.source==="user"?"（指定）":""}`).join(" ＋ ")}</div>
          <div class="mp-nm-m">三才：${a(e.wuge.sancai.text)}</div>
        </div>`:`<div class="mp-nm-wu"><div class="mp-nm-wu-h"><b>五格</b><i>这一版算不了</i></div><div class="mp-nm-m">${a(e.wuge?e.wuge.reason:"未算")}</div></div>`,l=e.phonetics&&e.phonetics.available?`<div class="mp-nm-ph"><b>音韵</b><span class="mp-nm-ph-lv${e.phonetics.level==="顺口"?" ok":e.phonetics.level==="拗口"?" bad":" warn"}">${a(e.phonetics.level)}</span><em>${a(e.phonetics.chars.map(g=>`${g.py}${g.tone}`).join(" "))}　声调 ${a(e.phonetics.tonePattern)}${(e.phonetics.alt||[]).length?`　又读 ${a(e.phonetics.alt.map(g=>`${g.char} ${g.py}${g.tone}`).join("、"))}`:""}</em>${(e.phonetics.issues||[]).map(g=>`<span class="mp-nm-ph-i">${a(g.text)}</span>`).join("")}</div>`:`<div class="mp-nm-ph"><b>音韵</b><em>${a(e.phonetics?e.phonetics.reason:"未算")}</em></div>`;return`<section class="mp-nm" aria-label="名字评估">
      ${p(e.fullName||"",`字库 ${e.stats&&e.stats.libSize?e.stats.libSize:""} 字${e.stats&&e.stats.unknown?`　未收录 ${e.stats.unknown}`:""}`)}
      ${r}
      ${c}
      ${m}
      ${l}
      <div class="mp-nm-verd">${a(e.verdict||"")}</div>
      <div class="mp-nm-note">${(e.notes||[]).map(g=>"※ "+a(g)).join("<br>")}</div>
    </section>`},o.briefHTML=function(e){return e?e.brief?o.summaryHTML(e.brief):o.factHeadHTML(e.factHead):""},o.oneLineHTML=function(e,n){if(!e||!e.strength||!e.strength.level)return"";const i=n||{},p=i.life||null,r=i.marriage||null,c=e.dayMaster||{},u=e.pillars&&e.pillars.month&&e.pillars.month.branch||"",m=`${c.stem||""}${c.element||""}${e.strength.level}${u?`，生${u}月`:""}`,l=[],g=p&&p.career&&p.career.type&&p.career.type.label;if(g&&l.push(`事业偏${String(g).split("、")[0]}`),p&&p.wealth&&p.wealth.tier){const L=String(p.wealth.tier).split("（")[0];l.push(L==="平"?"财平":`财是${L}`)}const w=r&&r.types&&r.types[0];w&&w.label&&l.push(`婚缘${String(w.label).replace(/型$/,"")}`);const b=r&&r.windows?r.windows.filter(L=>!L.past)[0]:null;return b&&l.push(`最可能动在 ${b.year} 年（${b.age}岁）`),`<section aria-label="一眼看" style="margin:10px 0 0;padding:9px 12px;border-left:3px solid var(--gold)"><p style="margin:0;line-height:1.65">${l.length?`<h2 class="mp-yiyan-h">一眼看</h2>　${a(m)}：${a(l.join("；"))}。`:`${a(m)}。`}</p></section>`},o.summaryHTML=function(e){if(!e||!e.lead)return"";const n=(e.sections||[]).map(r=>`<div class="mp-br-sec"><b>${a(r.h)}</b><p>${a(r.t)}</p></div>`).join(""),i=e.advice&&e.advice.length?`<div class="mp-br-adv"><b>可以试着做的</b><ul>${e.advice.map(r=>`<li>${a(r)}</li>`).join("")}</ul></div>`:"",p=e.chips&&e.chips.length?`<div class="mp-br-chips">${e.chips.map(r=>`<span>${a(r)}</span>`).join("")}</div>`:"";return`<section class="mp-br" aria-label="先说结论">
      <div class="mp-br-h"><b>${a(e.title||"先看这一张")}</b>${p}</div>
      <p class="mp-br-lead">${a(e.lead)}</p>
      ${n}
      ${i}
      ${e.caveat?`<p class="mp-br-cav">※ ${a(e.caveat)}</p>`:""}
      ${e.footer?`<p class="mp-br-foot">${a(e.footer)}</p>`:""}
    </section>`},o.factHeadHTML=function(e){if(!e||!e.headline)return"";const n=(e.facts||[]).map(i=>`<div class="mp-br-sec"><b>${a(i.k)}</b><p>${a(i.v)}</p></div>`).join("");return`<section class="mp-br mp-fh" aria-label="先说结论">
      <div class="mp-br-h"><b>${a(e.kicker||"一览")}</b></div>
      <p class="mp-br-lead">${a(e.headline)}</p>
      ${n}
      ${e.note?`<p class="mp-br-cav">※ ${a(e.note)}</p>`:""}
    </section>`},o.baziHTML=function(e,n){const i=[["year","年柱"],["month","月柱"],["day","日柱"],["hour","时柱"]].filter(([h])=>e.pillars[h]),p={year:"年",month:"月",day:"日",hour:"时"},r={木:"wood",火:"fire",土:"earth",金:"metal",水:"water"},c={比肩:"tg-bi",劫财:"tg-bi",食神:"tg-shi",伤官:"tg-shi",偏财:"tg-cai",正财:"tg-cai",七杀:"tg-guan",正官:"tg-guan",偏印:"tg-yin",正印:"tg-yin"},u=h=>`<span class="tg ${c[h]||""}">${h}</span>`,m=h=>`<span class="wx-${r[h]||"earth"}">${Ye(h)}${h}</span>`,l=h=>`<span class="ss-s ${h.luck||"neutral"}" title="${a(`${h.cat} · ${h.via}查${h.target} ｜ ${h.rule}`)}">${h.name}</span>`,g=(h,_)=>`<tr><td class="bz-lbl">${h}</td>${i.map(([de])=>`<td data-c="${p[de]}">${_(e.pillars[de],de)}</td>`).join("")}</tr>`,w=`<thead><tr><th scope="col" aria-label="项目"></th>${i.map(([h,_])=>`<th scope="col"${h==="day"?' class="bz-hdr-day"':""}>${_}</th>`).join("")}</tr></thead>`,b={寅:"木",卯:"木",巳:"火",午:"火",申:"金",酉:"金",亥:"水",子:"水",辰:"土",戌:"土",丑:"土",未:"土"},k={木:"火",火:"土",土:"金",金:"水",水:"木"},L={木:"土",土:"水",水:"火",火:"金",金:"木"},C=b[e.pillars.month.branch]||"土",E=["木","火","土","金","水"],le=h=>h===C?"旺":k[C]===h?"相":k[h]===C?"休":L[h]===C?"囚":"死",B=`<tr><td class="bz-lbl">五行</td><td class="bz-wxs" colspan="${i.length}">${["旺","相","休","囚","死"].map(h=>{const _=E.find(de=>le(de)===h)||C;return`<i><b class="wx-${r[_]}">${_}</b><em>${h}</em></i>`}).join("")}</td></tr>`,O=[g("十神",(h,_)=>_==="day"?`<span class="bz-zhuri">${e.input.gender==="male"?"元男":"元女"}</span>`:h.stemTenGod?u(h.stemTenGod):'<span class="pp-dim">—</span>'),g("天干",h=>`<span class="bz-big ${"wx-"+r[h.stemElement]}">${h.stem}</span>`),g("地支",h=>`<span class="bz-big ${"wx-"+r[h.branchElement]}">${h.branch}</span>`),g("藏干",h=>h.hidden.map(_=>`<i class="bz-cg wx-${r[_.element]}">${_.stem}·${_.element}</i>`).join("")),g("支神",h=>h.hidden.map(_=>u(_.tenGod)).join("<br>")),g("纳音",h=>h.nayin),g("空亡",h=>`<span class="pp-dim">${h.kongwang.join("")}</span>`),g("地势",h=>h.dishi),g("自坐",h=>h.zizuo),g("神煞",h=>h.shenshaDetail&&h.shenshaDetail.length?`<span class="pp-ss">${h.shenshaDetail.map(l).join("")}</span>`:'<span class="pp-dim">—</span>'),B].join(""),ne=Object.entries(e.wuxing).map(([h,_])=>`<span class="pp-chip wx-${r[h]}">${Ye(h)}${h} ${_}</span>`).join(""),Z=e.frame||{},T=h=>h==="大吉"||h==="吉"?"ok":h==="大忌"||h==="忌"?"warn":"",oe=(h,_)=>_?`<div class="pp-sec"><div class="pp-sec-h">${h}</div>${_}</div>`:"",X=Z.patternScore,Ae=X?`<div class="pp-tl pp-dim" title="${a(X.detail||"")}">成格分 ${X.grade?`${a(X.grade)}　${X.score}/100`:"外格不评分"}　${a(X.verdict||"")}</div>`:"",je=Z.geju&&Z.geju.length?`
      <div class="pp-tl">${Z.primary?`主格 <b>${a(Z.primary.name)}</b>　${a(Z.primary.evidence)}`:""}</div>
      <div class="pp-chips">${Z.geju.map(h=>{const _=h.status==="破格",de=h.status==="待定"||h.status==="假从",he=`${h.evidence||""}${Array.isArray(h.breaks)&&h.breaks.length?`；破：${h.breaks.join("；")}`:""}`;return`<span class="pp-chip ${_?"broken":de?"warn":""}" title="${a(he)}">${a(h.name)}<i class="pp-drel">${a(h.kind)}${h.status?`·${a(h.status)}`:""}</i></span>`}).join("")}</div>${Ae}`:"",U=(()=>{const h=Array.isArray(Z.yongshen&&Z.yongshen.neutral)?Z.yongshen.neutral:[],_=new Set(Z.yongshen&&Z.yongshen.neutralTenGods||[]);return`${(Z.yongshen&&Z.yongshen.avoidTenGods||[]).filter(he=>!_.has(he)).map(he=>`<span class="pp-chip warn">${a(he)}</span>`).join("")}${[..._].map(he=>`<span class="pp-chip neu" title="局中分量近零，按中性偏忌看">${a(he)}</span>`).join("")}${h.length?`<span class="pp-chip neu" title="忌神中全局不足 0.5 分的那几行；仍在忌里参与行运评分">中性偏忌 ${h.map(he=>`${a(he.element)} ${a(he.weight)} 分`).join("、")}</span>`:""}`})(),be=Z.yongshen?`
      <div class="pp-tl">喜 ${Z.yongshen.favor.map(m).join("")}　忌 ${Z.yongshen.avoid.map(m).join("")}　<span class="pp-dim">${a(Z.yongshen.method)}</span></div>
      <div class="pp-chips">${Z.yongshen.favorTenGods.map(h=>`<span class="pp-chip ok">${a(h)}</span>`).join("")}${U}</div>
      ${(Z.yongshen.disputed||[]).length?`<div class="pp-tl pp-dim">有争议：${Z.yongshen.disputed.map(h=>`${a(h.element)}（扶抑为${a(h.favorRole)}·${a(h.favorVerb)}，${a(h.climate)}盘调候忌${a(h.element)}）`).join("、")}　保留在喜用，不列入忌</div>`:""}
      ${Z.yongshen.combination?`<div class="pp-tl">组合取舍（官杀该制还是该化）</div><div class="pp-chips">${Z.yongshen.combination.rows.map(h=>`<span class="pp-chip ${/忌|慎用|耗身/.test(h.action)?"warn":/^(用|可化|可用)/.test(h.action)?"ok":"neu"}" title="${a(h.note)}">${a(h.role)} ${a(h.action)}</span>`).join("")}</div>`:""}
      <div class="pp-tl pp-dim">${a(Z.yongshen.detail)}</div>`:"",ie=e.climate||Z.yongshen&&Z.yongshen.climate||null,y=ie?(()=>{const h=Math.max(2,Math.min(98,Math.round(((Number(ie.temp)||0)+3)/6*100))),_=ie.need?`<em>调候取</em><b>${a(ie.need.stem+ie.need.element)}</b>`:"<em>气候平和</em>",de=!!(Z.yongshen&&Array.isArray(Z.yongshen.disputed))&&Z.yongshen.disputed.some(Na=>Na.element===ie.avoidElement),he=ie.need?`<em>忌</em><b>${a(ie.avoidElement)}</b>${de?'<span class="pp-dim">（有争议）</span>':""}`:"",He=(ie.evidence||[]).length?`<em>依据</em><span>${a(ie.evidence.join("、"))}</span>`:"",Pe=ie.priority==="调候优先"?'<span class="mp-cli-p">调候优先</span>':'<span class="mp-cli-p">扶抑为主</span>',Oe=e.frame&&e.frame.yongshen&&e.frame.yongshen.qt,Wt=Oe?`<div class="mp-qt">
          <div class="mp-qt-h"><b>穷通宝鉴</b><span>${a(Oe.label)}</span></div>
          <div class="mp-qt-y"><em>用神</em>${Oe.yong.map((Na,en)=>`<b class="${en===0?"first":""}">${a(Na)}</b>`).join("")}<em>首取 ${a(Oe.primary)}</em></div>
          <div class="mp-qt-q" title="${a(Oe.quote)}">「${a(Oe.quote)}」<span>第 ${Oe.chapter} 章${Oe.truncated?" · 首段更长，摘句下略":""}${Oe.note?" · "+a(Oe.note):""}</span></div>
        </div>`:"";return`<section class="mp-cli" aria-label="寒暖燥湿">
        <div class="mp-cli-h"><b>寒暖燥湿</b><span class="mp-cli-k">${a(ie.label||"")}</span>${Pe}</div>
        <div class="mp-cli-bar" title="寒 ← → 热"><i style="left:${h}%"></i></div>
        <div class="mp-cli-axis"><span>寒</span><span>平</span><span>热</span></div>
        <div class="mp-cli-row">${_}${he}${He}</div>
        <div class="mp-cli-narr">${a(ie.narration||"")}</div>
        ${Wt}
      </section>`})():"",z=Z.godStats?`<div class="pp-chips">${Object.entries(Z.godStats.groups).map(([h,_])=>`<span class="pp-chip">${h} ${_}</span>`).join("")}</div>`:"",q=e.dayun.list.map(h=>{const _=h.luck||null;return`<span class="pp-chip ${_?T(_.tier):""}" title="${a(`${h.fromDate?`${h.fromDate} 交运；`:""}${_?`${_.tier} ${_.score}｜${(_.reasons||[]).join("；")}`:""}`)}">${h.startAge} ${h.ganzhi}${h.relations&&h.relations.length?` <i class="pp-drel">${h.relations.join("")}</i>`:""}${_?` ${_.tier}`:""}</span>`}).join(""),fe=e.liunian&&e.liunian.length?`<div class="pp-chips">${e.liunian.slice(0,8).map(h=>{const _=h.luck||null,de=h.suiyun&&Array.isArray(h.suiyun.signals)?h.suiyun.signals:[],he=de.length?`｜${de.map(He=>He.detail).join("；")}`:"";return`<span class="pp-chip ${_?T(_.tier):""}" title="${a(_?`${_.tier} ${_.score}｜${(_.reasons||[]).join("；")}${he}`:he.replace(/^｜/,""))}">${h.year} ${h.ganzhi}${_?` ${_.tier}`:""}</span>`}).join("")}</div>`:"",v=(e.liunian||[]).filter(h=>h.suiyun&&Array.isArray(h.suiyun.signals)&&h.suiyun.signals.length),J=e.suiyunClassic,pe=J?`<div class="pp-dim pp-sy-src" title="${a(J.plain||"")}">《${a(J.bookName||"")}·${a(J.chapter||"")}》「${a(J.quote||"")}」</div>`:"",N=v.length?`<div class="pp-tl pp-dim">岁运提示（只标干支变动，不判吉凶）</div><div class="pp-chips">${v.map(h=>`<span class="pp-chip" title="${a(`${h.suiyun.signals.map(_=>_.detail).join("；")}｜${h.suiyun.note||""}`)}">${h.year} ${a(h.suiyun.signals.map(_=>`${_.type}${(_.type.startsWith("流年")||_.type.startsWith("大运"))&&_.target?`·${_.target}`:""}`).join("/"))}</span>`).join("")}</div>${pe}`:"",I=e.strength&&e.strength.boundary&&e.strength.boundary.near&&e.strength.boundary.nearest?`<span class="pp-chip warn" title="${a(e.strength.boundary.plain||"")}">临界·离${a(e.strength.boundary.nearest.to)} ${e.strength.boundary.nearest.gap} 分</span>`:"",ae=e.strength?`<div class="pp-str">日主强弱：<b>${e.strength.level}</b>${e.strength.score}${I}　<span class="pp-dim">${e.strength.detail}</span></div>`:"",re=e.strength&&e.strength.branchStructure,xe=re?(()=>{const h=re.branches.map(Pe=>`${a(Pe.label)}${a(Pe.branch)}<i class="pp-drel">·${a(Pe.camp)}</i>${re.placeholderHour&&Pe.key==="hour"?'<span class="pp-dim">占位</span>':""}`).join(" "),_=re.odd&&re.odd.length?`<span class="pp-st-odd">异类 ${re.odd.map(Pe=>`${a(Pe.label)}${a(Pe.branch)}（${Pe.weight}分）`).join("、")}</span>`:'<span class="pp-st-odd">无异类</span>',de=re.congProb!=null?`　从格 ${a(re.congRange)}`:"　不套从格概率",he=re.balance||{},He=he.branch?`　支 ${he.branch.A}:${he.branch.B}　合干 ${he.total?`${he.total.A}:${he.total.B}`:"—"}`:"";return`<div class="pp-struct" title="${a(`${re.method}；${re.note}`)}"><span class="pp-st-code">${a(re.code)}</span>${h}　${_}${de}${He}<span class="pp-dim">　静态结构，只作标注，不改上面的旺衰评分</span></div>`})():"",Me=e.relations&&Array.isArray(e.relations.anhe)?e.relations.anhe:[],P=Me.length?`<div class="pp-anhe" title="${a(e.relations.anheNote||"")}"><b>暗合</b>${Me.map(h=>a(h)).join("　")}<span class="pp-dim">　另列，不并入上面的合冲刑害；${Me.length===1?"只一对，按口径可忽略":`共 ${Me.length} 对`}</span></div>`:"",Le=e.shensha&&e.shensha.groups||[],Ne=Le.length?`
      <div class="pp-ssx">
        <div class="ssx-h"><b>神煞全览</b><span>共 ${e.shensha.count} 见 · ${Le.length} 类 · 悬停看查法</span></div>
        ${Le.map(h=>`<div class="pp-ssg"><span class="ssg-gt">${h.cat}</span><span class="ssg-gi">${h.items.map(_=>`<span class="pp-ssi ${_.luck||"neutral"}" title="${a(`${_.via}查${_.target} ｜ ${_.rule}`)}">${_.name}<em>${_.pillars.map(de=>p[de]||"").join("")}</em></span>`).join("")}</span></div>`).join("")}
        <div class="ssx-h" style="border-top:none;padding-top:4px;margin-top:4px">神煞只作参考，吉凶仍须看格局、旺衰与行运。</div>
      </div>`:"",Ze=n&&n.marriage,ma=Ze?(()=>{const h=Ze,_=(h.windows||[]).map(de=>`<span class="mp-mar-y${de.past?" past":""}" title="${a(`${de.ganzhi}年 · ${de.dayun?de.dayun+"运 · ":""}${(de.reasons||[]).join("；")}`)}">${de.year}<em>${de.age}岁·${de.kind}</em></span>`).join("");return`<section class="mp-mar" aria-label="婚姻">
        <div class="mp-mar-h"><b>婚姻</b><i class="mp-mar-tag">${a(h.type&&h.type.label||"")}</i></div>
        <div class="mp-mar-yrs">${_||'<span class="pp-dim">20–45 岁未见明显动婚年份</span>'}</div>
        <ol class="mp-mar-lines">${(h.lines||[]).map(de=>`<li>${a(de)}</li>`).join("")}</ol>
        <details class="mp-mar-b"><summary>依据与口径</summary><div>${a(h.basis||"")}</div></details>
      </section>`})():"",ua=n&&n.life,Za=ua?(()=>{const h=ua,_=[["career","事业",h.career],["wealth","财运",h.wealth],["study","学业",h.study],["health","健康",h.health],["children","子女",h.children],["kin","六亲",h.kin]].filter(he=>he[2]&&Array.isArray(he[2].lines)&&he[2].lines.length);if(!_.length)return"";const de=(he,He,Pe)=>`<div class="mp-life-f" data-face="${he}"><b>${a(He)}</b>${Pe.lines.map(Oe=>`<p>${a(Oe)}</p>`).join("")}</div>`;return`<section class="mp-life" aria-label="人生六面">
        <div class="mp-life-h"><b>人生六面</b><i class="mp-life-tag">事业 · 财运 · 学业 · 健康 · 子女 · 六亲</i></div>
        <div class="mp-life-grid">${_.map(([he,He,Pe])=>de(he,He,Pe)).join("")}</div>
        <details class="mp-life-b"><summary>口径</summary><div>六面共用同一套原料（十神权重、用神喜忌、大运流年），各自口径见每段末尾说明。属规则化读法，不是对具体事件的断言。</div></details>
      </section>`})():"",Ka=n&&n.chenggu,yn=Ka?(()=>{const h=Ka,_=["year","month","day","hour"].map(he=>{const He=h.weights&&h.weights[he]||{label:""};return`<span class="mp-bzcg-w">${a(String(He.label).split(" ")[0])} <b>${a(String(He.label).split(" ")[1]||"")}</b></span>`}).join(""),de={上上:"band-top",中上:"band-good",中平:"band-mid",中下:"band-weak",下下:"band-low"}[h.verdict&&h.verdict.band]||"band-mid";return`<section class="mp-bzcg open" aria-label="袁天罡称骨">
        <div class="mp-bzcg-h"><b>袁天罡称骨</b><i class="mp-bzcg-tag">民俗参考</i></div>
        <div class="mp-bzcg-hero"><b>${a(h.total&&h.total.label||"")}</b><span class="mp-bzcg-bandchip ${de}">${a(h.verdict&&h.verdict.band||"")}</span></div>
        <div class="mp-bzcg-lunar">${a(h.lunar&&h.lunar.text||"")}</div>
        <div class="mp-bzcg-ws">${_}</div>
        ${h.song&&h.song.text?`<div class="mp-bzcg-song">「${a(h.song.text)}」</div>`:""}
        ${h.song&&h.song.plain?`<div class="mp-bzcg-plain"><em>释义</em>${a(h.song.plain)}</div>`:""}
        ${h.verdict&&h.verdict.text?`<div class="mp-bzcg-band">${a(h.verdict.text)}</div>`:""}
        <div class="mp-bzcg-note">称骨为通行本口径的民俗参考，与上方四柱旺衰是两套独立口径，互不推导。</div>
      </section>`})():"";return o.briefHTML(e)+o.oneLineHTML(e,n)+`<div class="pp" style="padding:12px">
      <table class="pp-bz">${w}<tbody>${O}</tbody></table>
      ${e.hourUnknown?'<div class="pp-warn" role="note">时柱暂缺：只排年/月/日三柱，起运与交运按日估算。时柱按正午暂算，涉及时柱的结论仅供参考。</div>':""}
      <div class="pp-rel"><div><b>天干</b>${e.relations&&e.relations.stems.length?e.relations.stems.join(" · "):"—"}</div>
      <div><b>地支</b>${e.relations&&e.relations.branches.length?e.relations.branches.join(" · "):"—"}</div></div>
      ${ae}
      ${xe}
      ${P}
      ${oe("格局",je)}
      ${oe("用神",be)}
      ${ma}
      ${Za}
      ${y}
      ${Array.isArray(e.classics)&&e.classics.length?`<section class="mp-cl" aria-label="古籍原文">
        <div class="mp-cl-h"><b>古籍原文</b><span>照录通行本，释义为白话自撰</span></div>
        ${e.classics.map(h=>`<div class="mp-cl-e">
          <div class="mp-cl-t"><b>${a(({ziping:"子平真诠",ditian:"滴天髓",sanming:"三命通会"}[h.book]||h.book)+"·"+h.chapter)}</b></div>
          <div class="mp-cl-q">「${a(h.quote)}」</div>
          <div class="mp-cl-p">${a(h.plain)}</div>
        </div>`).join("")}
      </section>`:""}
      ${oe("五行与十神",`<div class="pp-chips">${ne}</div>${z}`)}
      ${oe("大运",`${o.curveHTML(e)}<div class="pp-chips">${q}</div>`)}
      ${fe?oe("流年",fe+N):""}
      ${e.palaces?oe("胎命身",`<div class="pp-chips">
        <span class="pp-chip" title="${a(e.palaces.taiyuan.note)}">胎元 ${a(e.palaces.taiyuan.ganzhi)}</span>
        ${e.palaces.taixi?`<span class="pp-chip" title="${a(e.palaces.taixi.note)}">胎息 ${a(e.palaces.taixi.ganzhi)}</span>`:""}
        ${e.palaces.minggong?`<span class="pp-chip" title="${a(e.palaces.minggong.note)}">命宫 ${a(e.palaces.minggong.ganzhi)}</span>`:""}
        ${e.palaces.shengong?`<span class="pp-chip" title="${a(e.palaces.shengong.note)}">身宫 ${a(e.palaces.shengong.ganzhi)}</span>`:""}
        ${!e.palaces.minggong||!e.palaces.shengong?'<span class="pp-chip" title="命宫与身宫由生月与生时支合数定宫；时柱暂缺，这两宫不排">命宫·身宫 时柱暂缺不排</span>':""}
      </div>`):""}
      ${Ne}
      ${yn}
      <div style="margin-top:8px;font-size:12px;color:var(--muted)">上一节 ${e.jieqi.previous.name} ${e.jieqi.previous.time}　下一节 ${e.jieqi.next.name} ${e.jieqi.next.time}　${e.dayun.rule}，${e.dayun.startAge.years}岁起运${e.dayun.jiao&&e.dayun.jiao.at?`（交运 ${e.dayun.jiao.at}，${e.dayun.jiao.frame}）`:""}${e.dayun.startAgeExact&&Number.isInteger(e.dayun.startAgeExact.years)?`　精确 ${e.dayun.startAgeExact.years}年${e.dayun.startAgeExact.months}月${e.dayun.startAgeExact.days}天${e.dayun.startAgeExact.hours}时（截断到日时；上面是四舍五入到月）`:""}</div>
    </div>`};const wt={natal:"命盘解析",divination:"卦象解析",card:"牌阵解析"},nt={同向:"good",有张力:"watch",互补:"alt"},$t=e=>`<div class="mp-cross">${e.map(n=>{const i=nt[n.stance]||"plain";return`<div class="mp-cross-row">
      <div class="mp-cross-h"><span class="mp-cross-l">${a(n.label)}</span><span class="mp-cross-tag t-${i}">${a(n.stance||"—")}</span></div>
      <div class="mp-cross-b">
        <div class="mp-cross-cell"><b>八字</b><span>${a(n.bazi||"—")}</span></div>
        <div class="mp-cross-cell"><b>紫微</b><span>${a(n.ziwei||"—")}</span></div>
      </div>
      ${n.note?`<div class="mp-cross-note">${a(n.note)}</div>`:""}
    </div>`}).join("")}</div>`,la={positive:["偏顺","good"],negative:["偏卡","watch"],mixed:["两头都有","alt"],undetermined:["暂难定向","plain"]},it={high:"高",medium:"中",low:"低"},kt={木:"木",火:"火",土:"土",金:"金",水:"水"};o.envRatio=function(){try{if(typeof location<"u"&&location.search){const e=/[?&]env=(\d{1,3})/.exec(location.search);if(e)return Math.max(0,Math.min(100,Number(e[1])))}if(typeof localStorage<"u"){const e=localStorage.getItem("mp-env-ratio");if(e!==null&&e!=="")return Math.max(0,Math.min(100,Number(e)))}}catch{}return 100},o.envFor=function(e,n){const i=e&&e.envelope;if(!i||n&&n.envelope===!1)return null;const p=o.envRatio();if(p>=100)return i;if(p<=0)return null;const r=typeof window<"u"&&(window.Engine||window.__PP&&window.__PP.Engine)||null;return r&&typeof r.pickVariant=="function"?r.pickVariant(i.meta&&i.meta.chart_id,p)==="envelope"?i:null:i},o.envelopeHeadHTML=function(e){if(!e||!e.verdict||!e.verdict.headline)return"";const n=e.verdict,[i,p]=la[n.direction]||la.undetermined,r=(e.evidence||[]).length,c=(e.factors||[]).length,u=(e.conflicts||[]).length,m=`按 ${r} 条盘面事实、${c} 条关键因素推出来的${u?`；其中 ${u} 处各家有分歧，已在文末标明`:""}。把握说的是这套规则推得有多一致，不是这件事实际发生的概率。`;return`<div class="mp-env-head">
      <h2 class="mp-env-kicker">结论</h2>
      <div class="mp-env-hl">${a(n.headline)}</div>
      <div class="mp-env-row">
        <span class="mp-env-dir t-${p}">${a(i)}</span>
        <details class="mp-env-confq">
          <summary class="mp-env-conf">把握 ${a(it[n.confidence]||"中")}</summary>
          <div class="mp-env-confq-body">${a(m)}</div>
        </details>
        ${e.degraded?'<span class="mp-env-deg">已简化</span>':""}
      </div>
      ${n.condition?`<div class="mp-env-cond">${a(n.condition)}</div>`:""}
    </div>`},o.envelopeHTML=function(e){if(!e||!Array.isArray(e.factors)||!e.factors.length)return"";const n=new Map((e.evidence||[]).map(m=>[m.id,m])),i=e.factors.map((m,l)=>{const g=(m.evidence_refs||[]).map(k=>n.get(k)).filter(Boolean),w=g.length?`<details class="mp-env-why"><summary>为什么</summary><div class="mp-env-why-body">${g.map(k=>`<div class="mp-env-ev"><b>${a(k.label)}</b><span>${a(k.detail)}</span></div>`).join("")}</div></details>`:"",b=m.duplicate_count?`<span class="mp-env-dup">另有 ${m.duplicate_count} 处同义表述已并入</span>`:"";return`<div class="mp-env-f-row">
        <div class="mp-env-f-no">${l+1}</div>
        <div class="mp-env-f-main">
          <div class="mp-env-f-top"><b>${a(m.name)}</b><span class="mp-env-f-state">${a(m.state)}</span>${b}</div>
          <div class="mp-env-f-impact">${a(m.impact)}</div>
          ${w}
        </div>
      </div>`}).join(""),p=(e.timeline||[]).length?`<div class="mp-env-tl">${e.timeline.map(m=>`<div class="mp-env-tl-row"><span class="mp-env-tl-w">${a(m.window)}</span>${m.pace?`<span class="mp-env-tl-p">${a(m.pace)}</span>`:""}${m.note?`<span class="mp-env-tl-n">${a(m.note)}</span>`:""}</div>`).join("")}</div>`:"",r=(e.advice||[]).length?`<div class="mp-env-adv"><h3 class="mp-env-adv-h">怎么做</h3><ol>${e.advice.map(m=>`<li>${a(m)}</li>`).join("")}</ol></div>`:"",c=e.risk?`<div class="mp-env-risk"><h3 class="mp-env-risk-h">留意</h3>${a(e.risk)}</div>`:"",u=(e.conflicts||[]).length?`<details class="mp-env-cf"><summary>流派说明（${e.conflicts.length} 条）</summary><div class="mp-env-cf-body">${e.conflicts.map(m=>`<div class="mp-env-cf-item"><b>${a(m.topic)}</b>${(m.views||[]).map(l=>`<div class="mp-env-cf-view"><span>${a(l.school)}</span>${a(l.stance)}</div>`).join("")}${m.note?`<em>${a(m.note)}</em>`:""}</div>`).join("")}</div></details>`:"";return`<div class="mp-env">
      <h2 class="mp-env-sec-h">关键几点</h2>
      <div class="mp-env-f">${i}</div>
      ${p}${r}${c}${u}
    </div>`},o.interpretHTML=function(e,n){if(!e||!(e.dimensions&&e.dimensions.length||e.sections&&e.sections.length)&&!e.error&&!e.answer)return"";const p=!!(n&&n.folded),r=(e.dimensions||[]).map((v,J)=>`<div class="mp-it-dim${v.focused?" focus":""}">
      <div class="mp-it-dh"><span class="mp-it-dno">${J+1}</span><span class="mp-it-dlabel">${a(v.label)}</span>${v.focused?'<span class="mp-it-focus">最贴近你的问题</span>':""}${v.confidence?`<span class="mp-it-conf c-${a(v.confidence)}" title="这一维推演的稳定程度，不是这件事发生的概率">把握 ${a(v.confidence)}</span>`:""}</div>
      ${v.plain?`<div class="mp-it-dplain">${a(v.plain)}</div>`:""}
      <div class="mp-it-dtext">${a(v.text)}</div>
      ${v.evidence&&v.evidence.length?`<details class="mp-it-ev"><summary>依据 · ${a(v.evidence.length)} 条盘面事实</summary><div class="mp-it-ev-body">${v.evidence.map(pe=>`<span class="mp-it-ev-item">${a(pe)}</span>`).join("")}<span class="mp-it-ev-tech">技法：${a(e.technique||e.systemLabel||"")}</span></div></details>`:""}
      ${v.knowledge&&v.knowledge.length?`<div class="mp-it-knowref"><a href="#mp-sec-know">依据与出处 ${v.knowledge.length} 条 →</a>${v.knowledge.some(pe=>pe.status!=="settled")?'<span class="know-flag">本维有异说或待核实</span>':""}</div>`:""}
      ${v.advice?`<div class="mp-it-adv"><b>建议</b>${a(v.advice)}</div>`:""}
    </div>`).join(""),c=e.outline&&e.outline.length?`<div class="mp-outline"><h3 class="mp-outline-h">一页读懂</h3>${e.outline.map(v=>`<div class="mp-outline-row"><b>${a(v.label)}</b><span>${a(v.text)}</span></div>`).join("")}</div>`:"",u=e.sections||[],m=u.filter(v=>v.kind!=="method"),l=u.filter(v=>v.kind==="method"),g=u.length?`<nav class="mp-toc" aria-label="报告目录">${m.map(v=>`<a href="#mp-sec-${a(v.key)}">${a(v.label)}</a>`).join("")}${l.length?'<a href="#mp-sec-method">方法与出处</a>':""}</nav>`:"",w=e.tables&&e.tables.length?`<div class="mp-tables">${e.tables.filter(v=>Array.isArray(v.rows)&&v.rows.length).map(v=>`<div class="mp-table-wrap">
          <div class="mp-table-h">${a(v.title)}</div>
          <div class="mp-table-scroll"><table class="mp-table">
            <thead><tr>${v.columns.map(J=>`<th scope="col">${a(J)}</th>`).join("")}</tr></thead>
            <tbody>${v.rows.map(J=>`<tr>${J.map((pe,N)=>`<td data-label="${a(v.columns[N]||"")}">${a(pe)}</td>`).join("")}</tr>`).join("")}</tbody>
          </table></div>
        </div>`).join("")}</div>`:"",b=v=>String(v||"").split(`
`).map(J=>`<div class="mp-it-p">${a(J).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>")}</div>`).join(""),k=(e.dimensions||[]).reduce((v,J)=>v.concat((J.knowledge||[]).map(pe=>({...pe,dimLabel:J.label}))),[]),L=Array.isArray(e.facts)?e.facts:[],C={};for(let v=0;v<L.length;v+=1)C[L[v].id]=v+1;const E=v=>{const J=Array.isArray(v.refs)?v.refs.filter(N=>C[N]):[];return J.length?`<div class="mp-it-refs"><a href="#mp-facts">${J.map(N=>C[N]).sort((N,I)=>N-I).map(N=>`[${N}]`).join("")}</a> 盘面事实</div>`:""},le=L.length?`<details class="mp-it-sec mp-it-facts" id="mp-facts">
        <summary><span class="mp-it-sh">盘面事实</span><span class="mp-it-mnum">${L.length} 条 · 正文里的 [n] 指这里</span></summary>
        <div class="mp-it-sub">${L.map((v,J)=>`<div class="fact-row"><em class="fact-no">[${J+1}]</em>${v.group===v.label?"":`<em class="fact-g">${a(v.group)}</em>`}<b>${a(v.label)}</b><span>${a(v.value)}</span></div>`).join("")}</div>
      </details>`:"",B=v=>`<div class="mp-it-sec${v.tone?` tone-${a(v.tone)}`:""}" id="mp-sec-${a(v.key)}">
        <h3 class="mp-it-sh">${a(v.label)}${E(v)}</h3>
        <div class="mp-it-stext">${Array.isArray(v.items)&&v.items.length?$t(v.items):b(v.text)}</div>
      </div>`,O=l.length||k.length?`<details class="mp-it-sec mp-it-method" id="mp-sec-method">
        <summary><span class="mp-it-sh">方法与出处</span><span class="mp-it-mnum">${l.length?`${l.length} 段`:""}${l.length&&k.length?" · ":""}${k.length?`依据 ${k.length} 条`:""} · 怎么算的、哪里没算、口径分歧</span></summary>
        ${k.length?`<div class="mp-it-sub" id="mp-sec-know"><div class="mp-it-sh">依据与出处</div>${k.map(v=>`<div class="know-row"><span class="know-status ${a(v.status)}">${a(v.statusLabel)}</span><span class="know-body"><em class="know-dim">${a(v.dimLabel)}</em><b>${a(v.gist)}</b>${a(v.detail)}${v.source?`<i>出处：${a(v.source)}</i>`:""}${v.note?`<em>注：${a(v.note)}</em>`:""}</span></div>`).join("")}${e.knowledgeNote?`<div class="know-disc">${a(e.knowledgeNote)}</div>`:""}</div>`:""}
        ${l.map(v=>`<div class="mp-it-sub"><div class="mp-it-sh">${a(v.label)}</div><div class="mp-it-stext">${Array.isArray(v.items)&&v.items.length?$t(v.items):b(v.text)}</div></div>`).join("")}
      </details>`:"",ne=u.length||k.length||L.length?`<div class="mp-it-secs">${m.map(B).join("")}${le}${O}</div>`:"",Z=[e.systemLabel,wt[e.moduleType]||e.moduleType].filter(Boolean),T=e.ask,oe=T&&T.question?a(T.question):"",X=T&&(oe||T.direction&&T.direction!=="general")?`<div class="mp-it-ask">${oe?`<span class="ask-q">问题：${oe}</span><span class="ask-sep">｜</span>`:""}<span class="ask-d">询问方向：${a(T.directionLabel||"综合")}</span></div>`:"",Ae=e.answer?`<div class="mp-it-ans"><b>${oe?"先答所问":"先看结论"}</b>${a(e.answer)}</div>`:"",je=e.plain?`<div class="mp-it-plain"><b>说人话</b>${a(e.plain)}</div>`:"",U=e.followups&&e.followups.length?`<div class="mp-it-fu"><b>还可以这样追问</b><ul>${e.followups.map(v=>`<li>${a(v)}</li>`).join("")}</ul></div>`:"",be=e.glossary&&e.glossary.length?`<details class="mp-it-gloss"><summary>名词解释（${e.glossary.length} 条）</summary>${e.glossary.map(v=>`<div><span>${a(v.term)}</span>${a(v.plain)}</div>`).join("")}</details>`:"",ie=e.limits&&e.limits.length?`<details class="mp-it-limits"><summary>本插件不回答什么（${e.limits.length} 条）</summary>${e.limits.map(v=>`<div><b>${a(v.title)}</b>${a(v.text)}</div>`).join("")}</details>`:"",z=e.system&&/^(liuyao|meihua|daliuren|qimen|tarot|xiaoliuren)$/.test(e.system)?`<div class="mp-askcopy-row"><button type="button" class="mp-askcopy" data-mp-askcopy="${a(e.system)}">复制问事提示</button><span class="mp-askcopy-hint">把这张盘和你的问题打包成一段提示，粘到任何对话里都能用</span></div>`:"",q=e.guide?`<details class="mp-guide">
      <summary><b>${a(e.guide.title)}</b><span class="mp-guide-sub">数 / 象 / 辞</span></summary>
      <div class="mp-guide-body">
        <p class="mp-guide-lead">${a(e.guide.lead)}</p>
        <ol class="mp-guide-layers">${(e.guide.layers||[]).map(v=>`<li><b>${a(v.name)}<i>${a(v.sub)}</i></b><span>${a(v.text)}</span><em>${a(v.hint)}</em></li>`).join("")}</ol>
        <div class="mp-guide-check"><b>${a(e.guide.check.title)}</b><ol>${(e.guide.check.items||[]).map(v=>`<li>${a(v)}</li>`).join("")}</ol><p>${a(e.guide.check.tail)}</p></div>
        <div class="mp-guide-parts"><b>${a(e.guide.parts.title)}</b><ul>${(e.guide.parts.rows||[]).map(v=>`<li><span>${a(v[0])}</span>${a(v[1])}</li>`).join("")}</ul><p>${a(e.guide.parts.tail)}</p></div>
        <p class="mp-guide-close">${a(e.guide.closing)}</p>
      </div></details>`:"",fe=n&&n.noBody?"":o.envelopeHTML(o.envFor(e,n));return`<div class="mp-it${p?" folded":""}">
      <button type="button" class="mp-it-head" aria-expanded="${p?"false":"true"}">
        <span class="mp-it-arrow" aria-hidden="true">▾</span>
        <span class="mp-it-title">解析与详解</span>${Z.map(v=>`<span class="mp-it-tag">${a(v)}</span>`).join("")}
        <span class="mp-it-hint">${p?"点击展开":"点击收起"}</span>
      </button>
      <div class="mp-it-wrap">
        ${fe}
        ${z}
        ${X}
        ${Ae}
        ${je}
        ${e.lead?`<div class="mp-it-lead">${a(e.lead)}</div>`:""}
        ${e.error?`<div class="mp-it-err">这段解读这次没生出来，盘面数据本身是好的${e.errorId?`（编号 ${a(e.errorId)}，反馈时报它）`:""}${window.__MPCompose&&window.__MPCompose.devOn&&window.__MPCompose.devOn()?`<details class="mp-it-errd"><summary>失败原因（只在开发者视图显示）</summary><code>${a(e.error)}</code></details>`:""}</div>`:""}
        ${c}
        ${g}
        <div class="mp-it-body">${r}</div>
        ${ne}
        ${w}
        ${q}
        ${U}
        ${be}
        ${ie}
        <div class="mp-it-dis">${a(e.disclaimer)}</div>
      </div>
    </div>`},o.followupHTML=function(e){if(!e)return"";const n=e.evidence&&e.evidence.length?`<div class="mp-fu-ev">依据：${e.evidence.map(i=>a(i)).join("；")}　置信度：${a(e.confidence||"弱")}</div>`:"";return`<div class="mp-fu${e.ok?"":" miss"}">
      <div class="mp-fu-h">追问 · ${a(e.question)}</div>
      <div class="mp-fu-a">${a(e.answer)}</div>
      ${n}
    </div>`},o.solarLineHTML=function(e){if(!e)return"";const n=e.solarTime||{},i=typeof n.offsetMinutes=="number"?n.offsetMinutes:typeof e.offsetMinutes=="number"?e.offsetMinutes:null;if(i==null||!i)return"";const p=String(n.trueSolarText||e.trueSolarText||"");if(/时辰未知/.test(p))return"";const r=i>0?"+":"−",c=(Math.round(Math.abs(i)*10)/10).toFixed(1),u=/(\d{1,2}:\d{2})/.exec(p),m=String(n.note||""),l=/夏令时/.test(m)?'<b class="mp-solar-dst">已扣夏令时 1 小时</b>':"",g=m?`<details class="mp-solar-why"><summary>怎么算的</summary><div>${a(m)}</div></details>`:"";return`<p class="mp-solar">真太阳时修正 <b>${r}${c} 分</b>${u?`，时柱按 <b>${a(u[1])}</b> 起`:""}${l}${g}<span>（勾掉「真太阳时」就按钟表时间排）</span></p>`},o.envHeadHTML=function(e,n){const i=o.envFor(e,n),p=i?o.envelopeHeadHTML(i):"";return p||o.factHeadHTML(e&&e.factHead)},o.envBodyHTML=function(e,n){return o.envelopeHTML(o.envFor(e,n))},o.resultWithInterpret=function(e,n,i){const p=i&&i.noHead?"":o.envHeadHTML(n,i),r=o.interpretHTML(n,i);return p+(e||"")+r},o.caliberHTML=function(e){const n=e&&Array.isArray(e.switches)?e.switches.filter(l=>l&&l.key):[];if(!n.length)return"";const i=n.filter(l=>!l.error&&l.total>0),p=i.length?`${n.length} 组开关中 ${i.length} 组影响此盘：${i.map(l=>l.short||l.title).join("、")}。`:`本盘对 ${n.length} 组开关都不敏感：换成另一档也不变。`,r=l=>{if(l.error)return`<div class="mp-cdiff-same">未能对照：${a(l.error)}</div>`;if(!l.total)return'<div class="mp-cdiff-same">无变化 · 此盘不受这一开关影响</div>';const g=Array.isArray(l.roots)?l.roots:[];return g.length?`<div class="mp-cdiff-roots">${g.map(w=>`<div class="mp-cdiff-root"><span class="mp-cdiff-k">${a(w.label)}</span><span class="mp-cdiff-from">${a(w.from)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-to">${a(w.to)}</span></div>`).join("")}</div>`:`<div class="mp-cdiff-same">无单一根因；逐字段差异 ${Number(l.total)||0} 处</div>`},c=l=>{const g=(Array.isArray(l.views)?l.views:[]).filter(w=>w&&w.changed);return l.error||!l.total||!g.length?"":`<table class="mp-cview"><thead><tr><th scope="col">项</th><th scope="col">${a(l.currentLabel)}</th><th scope="col">${a(l.altLabel)}</th></tr></thead><tbody>`+g.map(w=>`<tr><th scope="row">${a(w.label)}</th><td>${a(w.current)}</td><td>${a(w.alt)}</td></tr>`).join("")+"</tbody></table>"},u=l=>{const g=Array.isArray(l.categories)?l.categories:[];if(l.error||!l.total||!g.length)return"";const w=g.slice(0,6);return`<div class="mp-cdiff-cats">${w.map(b=>`<span class="mp-cdiff-cat">${a(b.name)} ${Number(b.count)||0} 处</span>`).join("")}`+(g.length>w.length?`<span class="mp-cdiff-cat">另 ${g.length-w.length} 类</span>`:"")+"</div>"},m=n.map(l=>`<div class="mp-cdiff-row"><div class="mp-cdiff-h"><b>${a(l.title)}</b><span class="mp-cdiff-count${l.total>0?" on":""}">${l.error?"未能对照":l.total?`${Number(l.total)||0} 处`:"无变化"}</span></div><div class="mp-cdiff-ab"><span class="mp-cdiff-pill now">当前 · ${a(l.currentLabel)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-pill alt">换成 · ${a(l.altLabel)}</span></div>${r(l)}${c(l)}${u(l)}</div>`).join("");return`<details class="mp-cdiff" aria-label="口径对照">
      <summary><span class="mp-cdiff-title">口径对照</span><span class="mp-cdiff-lead">${a(p)}</span><span class="mp-cdiff-more">展开逐字差异</span></summary>
      <div class="mp-cdiff-body">${m}
        <div class="mp-cdiff-note">同一组输入、只换一个开关；只列变化字段与根因，不判哪套口径更准，也不改上方盘面。</div>
      </div>
    </details>`},o.handleHTML=function(e){return typeof e!="string"||!e?"":`<section class="mp-handle" aria-label="排盘句柄">
      <span class="mp-handle-title">排盘句柄</span>
      <code class="mp-handle-code" title="${a(e)}">${a(e)}</code>
      <button type="button" class="mp-handle-copy" data-handle-copy="${a(e)}" aria-label="复制排盘句柄">复制句柄</button>
      <span class="mp-handle-hint">追问同一张盘时把它连同增量参数（年份、方向、所问之事）一并交给助手，不必重报出生信息。句柄是编码不是加密，含出生时间与出生地，别公开贴出。</span>
    </section>`},o.revisionHTML=function(e){if(!e||typeof e!="object")return"";const n=Array.isArray(e.applied)?e.applied:[],i=Array.isArray(e.ignored)?e.ignored:[];if(!n.length&&!i.length)return"";const p=n.map(r=>{const c=r.fromDisplay==null?"（未设）":r.fromDisplay;return`<li><span class="k">${a(r.label||r.key)}</span><span class="v"><span class="old">${a(c)}</span> → <span class="new">${a(r.display)}</span></span></li>`}).join("");return`<section class="mp-revise" aria-label="一句话改参">
      <div class="mp-revise-head"><span class="mp-revise-title">一句话改参</span><span class="mp-revise-text">「${a(e.text||"")}」</span></div>
      ${p?`<ul class="mp-revise-list">${p}</ul>`:'<p class="mp-revise-ignored">没有识别到可改的参数，仍按原参数排盘。</p>'}
      ${i.length?`<p class="mp-revise-ignored">未处理：${a(i.join("；"))}</p>`:""}
    </section>`},o.shadowHTML=function(e,n){if(!e||!e.id)return"";const i=[];e.version&&i.push(`版本 <b>${a(e.version)}</b>`),e.baseId&&i.push(`基础指纹 <b>${a(e.baseId)}</b>`),i.push("同参数同 ID");const p=[];e.reproducible===!1&&p.push(`不可复算：${a(e.reason||"参数不足")}`);const r=e.reproducible===!0&&e.asOfPinned===!1&&(e.system==="bazi"||e.system==="ziwei")?'<div class="mp-shadow-hint">未固定 asOf：流年 / 流月随「此刻」变化；要逐字比对请在输入里固定 asOf。</div>':"",c=n&&n.sameId!==!1&&(n.versionChanged||Number(n.total)>0);let u="";if(c){const m=Number(n.total)||0,l=a(n.fromVersion||"—"),g=a(n.toVersion||e.version||"—"),w=Array.isArray(n.roots)?n.roots:[],b=w.slice(0,8),k=b.length?`<div class="mp-cdiff-roots">${b.map(E=>`<div class="mp-cdiff-root"><span class="mp-cdiff-k">${a(E.label)}</span><span class="mp-cdiff-from">${a(E.from)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-to">${a(E.to)}</span></div>`).join("")}`+(w.length>b.length?`<div class="same">另 ${w.length-b.length} 处根因</div>`:"")+"</div>":`<div class="same">${m?"无单一根因；逐字段变化 "+m+" 处":"字段 0 处变化：同一张盘跨版本逐字一致"}</div>`,L=Array.isArray(n.categories)?n.categories:[],C=L.length?`<div class="mp-cdiff-cats">${L.slice(0,6).map(E=>`<span class="mp-cdiff-cat">${a(E.name)} ${Number(E.count)||0} 处</span>`).join("")}`+(L.length>6?`<span class="mp-cdiff-cat">另 ${L.length-6} 类</span>`:"")+"</div>":"";u=`<details class="mp-shadow-diff"${m>0?" open":""}>
        <summary><b>与上次同盘比对</b><span class="tag">${l} → ${g} · ${m?`${m} 处变化`:"0 处变化"}</span></summary>
        ${k}${C}
        <div class="note">同一 baseId（同一组归一化参数）的两次结果；只比盘面字段，不含摘要、解析与古籍等文本层。</div>
      </details>`}return`<section class="mp-shadow" aria-label="影子盘">
      <div class="mp-shadow-head"><span class="mp-shadow-title">影子盘</span><code class="mp-shadow-id">${a(e.id)}</code>
        <button type="button" class="mp-shadow-copy" data-shadow-copy="${a(e.id)}" aria-label="复制影子盘 ID">复制 ID</button></div>
      <div class="mp-shadow-meta">${i.join('<span aria-hidden="true">·</span>')}</div>
      ${p.map(m=>`<div class="mp-shadow-warn">⚠ ${m}</div>`).join("")}
      ${r}
      ${u}
    </section>`},o.shadowTrack=function(e){const n=window.Engine||window.__PP&&window.__PP.Engine;if(!n||!n.shadowSnapshot||!n.shadowDiff)return null;let i=null;try{i=n.shadowSnapshot(e)}catch{return null}if(!i||!i.shadow||!i.shadow.baseId)return null;const p="mp-shadow-v1";let r={};try{const m=window.localStorage?window.localStorage.getItem(p):null,l=m?JSON.parse(m):{};l&&typeof l=="object"&&!Array.isArray(l)&&(r=l)}catch{r={}}const c=r[i.shadow.baseId];let u=null;if(c)try{u=n.shadowDiff(c,i)}catch{u=null}i.at=Date.now(),r[i.shadow.baseId]=i;try{const m=Object.keys(r);if(m.length>24){m.sort((l,g)=>(Number(r[l]&&r[l].at)||0)-(Number(r[g]&&r[g].at)||0));for(const l of m.slice(0,m.length-24))delete r[l]}window.localStorage&&window.localStorage.setItem(p,JSON.stringify(r))}catch{}return u};const st="dsh-metaphysics/profiles-v1",da=24,ot=16,ka=40,Bt=60,ca=["bazi","ziwei","liuyao","tarot","meihua","daliuren","hepan","qimen","almanac","zeri","chenggu","xiaoliuren","star","numerology","mbti","trend","fengshui","name","convert"];o.PROF_KEY=st,o.PROF_MAX=da,o.PROF_KINDS=ca;const Gt={bazi:"八字",ziwei:"紫微",liuyao:"六爻",tarot:"塔罗",meihua:"梅花",daliuren:"六壬",hepan:"合盘",qimen:"奇门",almanac:"黄历",zeri:"择日",chenggu:"称骨",xiaoliuren:"小六壬",star:"星座",numerology:"生命数字",mbti:"人格",trend:"人生K线",fengshui:"风水",name:"起名",convert:"农历"};o.profKindLabel=e=>Gt[e]||String(e||"");const $e=e=>typeof e=="string";function za(e){if(!e||typeof e!="object"||Array.isArray(e)||!$e(e.id)||!e.id||e.id.length>40||!$e(e.kind)||ca.indexOf(e.kind)<0)return null;const n=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e.date||""));if(!n)return null;const i=Number(n[1]),p=Number(n[2]),r=Number(n[3]);if(p<1||p>12||r<1||r>new Date(i,p,0).getDate())return null;const c=$e(e.time)&&/^([01]?\d|2[0-3]):[0-5]\d$/.test(e.time)?e.time:"";return{id:e.id,kind:e.kind,label:$e(e.label)?e.label.slice(0,ot):"",date:e.date,time:e.hourUnknown===!0?"":c,hourUnknown:e.hourUnknown===!0,trueSolar:e.trueSolar!==!1,lateZi:e.lateZi!==!1,gender:e.gender==="male"||e.gender==="female"?e.gender:"",address:$e(e.address)?e.address.slice(0,ka):"",note:$e(e.note)?e.note.slice(0,Bt):"",pinned:e.pinned===!0,createdAt:Number(e.createdAt)||0,lastUsedAt:Number(e.lastUsedAt)||0,uses:Number(e.uses)||0}}function Da(){try{const e=window.localStorage?window.localStorage.getItem(st):null,n=e?JSON.parse(e):[];return Array.isArray(n)?n:[]}catch{return[]}}function qa(e){return e.slice().sort((n,i)=>(i.pinned?1:0)-(n.pinned?1:0)||(i.lastUsedAt||i.createdAt||0)-(n.lastUsedAt||n.createdAt||0)||(i.createdAt||0)-(n.createdAt||0))}o.profilesLoad=function(){const e=[],n=Object.create(null);for(const i of Da()){const p=za(i);p&&!n[p.id]&&(n[p.id]=1,e.push(p))}return qa(e)},o.profilesSave=function(e){const n=qa(Array.isArray(e)?e.slice(0,da):[]);try{return window.localStorage?(window.localStorage.setItem(st,JSON.stringify(n)),!0):!1}catch{return!1}};let rt=0;o.profilesNewId=function(){const e=Object.create(null);for(const i of o.profilesLoad())e[i.id]=1;let n;do n=`p${Date.now().toString(36)}${(rt++).toString(36)}`;while(e[n]);return n},o.profilesPut=function(e){const n=za(Object.assign({id:o.profilesNewId(),createdAt:Date.now(),lastUsedAt:Date.now()},e));if(!n)return{ok:!1,list:o.profilesLoad()};const i=o.profilesLoad(),p=i.findIndex(r=>r.id===n.id);if(p>=0){const r=i[p];n.createdAt=r.createdAt||n.createdAt,n.lastUsedAt=r.lastUsedAt,n.uses=r.uses,n.pinned=r.pinned,i.splice(p,1,n)}else i.push(n);if(i.length>da){const r=i.slice().sort((m,l)=>(m.lastUsedAt||m.createdAt)-(l.lastUsedAt||l.createdAt)),c=r.find(m=>m.id!==n.id)||r[0],u=i.indexOf(c);u>=0&&i.splice(u,1)}return o.profilesSave(i)?{ok:!0,list:qa(i),item:n}:{ok:!1,list:o.profilesLoad()}},o.profilesRemove=function(e){const n=o.profilesLoad().filter(i=>i.id!==e);return o.profilesSave(n)?n:o.profilesLoad()},o.profilesPin=function(e){const n=o.profilesLoad().map(i=>i.id===e?Object.assign({},i,{pinned:!i.pinned}):i);return o.profilesSave(n)?qa(n):o.profilesLoad()},o.profilesTouch=function(e){let n=!1;const i=o.profilesLoad().map(p=>p.id!==e?p:(n=!0,Object.assign({},p,{lastUsedAt:Date.now(),uses:(p.uses||0)+1})));return n?o.profilesSave(i)?qa(i):o.profilesLoad():i};const Ut=864e5;function Ge(e){const n=Number(e)||0;if(!n)return"未排过";const i=Math.floor((Date.now()-n)/Ut);if(i<=0)return"今天排过";if(i===1)return"昨天排过";if(i<30)return`${i} 天前排过`;const p=new Date(n);return`${p.getFullYear()}-${String(p.getMonth()+1).padStart(2,"0")}-${String(p.getDate()).padStart(2,"0")} 排过`}o.profilesAgo=Ge;const Ra="dsh-metaphysics/cases-v1",ja=480,pt=["pending","hit","miss","void"],Fa={pending:"待验",hit:"应验",miss:"未应",void:"作废"},Zt=120;o.CASE_KEY=Ra,o.CASE_MAX=ja,o.CASE_STATUS=pt,o.caseStatusLabel=e=>Fa[e]||Fa.pending;function Qe(e){if(!e||typeof e!="object"||Array.isArray(e)||!$e(e.id)||!e.id||e.id.length>64)return null;const n=e.entry;if(!n||typeof n!="object"||Array.isArray(n)||!$e(n.kind)||ca.indexOf(n.kind)<0||!$e(n.date)&&!$e(n.time)&&!$e(n.question))return null;const i=Number(e.at||n.at)||0;return i?{id:e.id,at:i,status:pt.indexOf(e.status)>=0?e.status:"pending",note:$e(e.note)?e.note.slice(0,Zt):"",question:$e(n.question)?n.question.slice(0,80):"",entry:n}:null}function Sa(){try{const e=window.localStorage?window.localStorage.getItem(Ra):null,n=e?JSON.parse(e):[];return Array.isArray(n)?n:[]}catch{return[]}}function na(e){if(!window.localStorage)return!1;try{return window.localStorage.setItem(Ra,JSON.stringify(e.slice(0,ja))),!0}catch{return!1}}o.casesSave=na,o.casesLoad=function(){return Sa().map(Qe).filter(Boolean).sort((e,n)=>n.at-e.at||(e.id<n.id?1:-1))},o.casesNewId=function(){const e={};Sa().forEach(i=>{i&&i.id&&(e[i.id]=1)});let n="";for(let i=0;i<8&&(n="c"+Date.now().toString(36)+Math.floor(Math.random()*1296).toString(36),!!e[n]);i+=1);return n},o.casesAdd=function(e,n){const i=n||{};if(!e||typeof e!="object"||Array.isArray(e))return{ok:!1,list:o.casesLoad()};const p=o.casesLoad(),r=Number(e.at)||Date.now();if(p.some(l=>l.at>r-6e4&&l.entry.kind===e.kind&&l.entry.date===e.date&&l.entry.time===e.time&&(l.entry.question||"")===(e.question||"")&&(l.entry.lines||"")===(e.lines||"")))return{ok:!0,dup:!0,list:o.casesLoad()};const u=Qe({id:o.casesNewId(),at:r,status:i.status||"pending",note:i.note||"",entry:e});if(!u)return{ok:!1,list:o.casesLoad()};const m=[u].concat(p.filter(l=>l.id!==u.id)).slice(0,ja);return na(m)?{ok:!0,item:u,list:m}:{ok:!1,list:o.casesLoad()}},o.casesSetStatus=function(e,n){if(pt.indexOf(n)<0)return o.casesLoad();const i=Sa().map(Qe).filter(Boolean).map(p=>p.id===e?Object.assign({},p,{status:n}):p);return na(i)?i:o.casesLoad()},o.casesRemove=function(e){const n=Sa().map(Qe).filter(Boolean).filter(i=>i.id!==e);return na(n)?n:o.casesLoad()},o.casesExport=function(e){return(Array.isArray(e)?e:o.casesLoad()).map(i=>JSON.stringify({id:i.id,at:i.at,atISO:new Date(i.at).toISOString(),kind:i.entry.kind,label:$e(i.entry.label)?i.entry.label:"",question:i.question,status:i.status,note:i.note,params:i.entry})).join(`
`)};const Kt=/^(\d{4})-(\d{2})-(\d{2})$/,bn=/^(\d{1,2}):(\d{2})(:\d{2})?$/;function Yt(e){const n=$e(e)&&Kt.exec(e.trim());return n?n[2]+"-"+n[3]:""}function Ia(e){const n=$e(e)&&bn.exec(e.trim());return n?n[1]+":00":""}o.casesExportMasked=function(e){return(Array.isArray(e)?e:o.casesLoad()).map(i=>{const p=i.entry||{},r={};return Object.keys(p).forEach(c=>{if(c!=="address"){if(c==="date"){const u=Yt(p[c]);u&&(r.date=u);return}if(c==="time"){const u=Ia(p[c]);u&&(r.time=u);return}c!=="question"&&(r[c]=p[c])}}),JSON.stringify({id:i.id,kind:p.kind||"",label:$e(p.label)?p.label:"",status:i.status,note:"",params:r})}).join(`
`)},o.casesMigrate=function(e){const n=Array.isArray(e)?e:[];if(!n.length)return{added:0,list:o.casesLoad()};const i=Sa().map(Qe).filter(Boolean),p={};i.forEach(c=>{p[c.id]=1});let r=0;for(let c=0;c<n.length;c+=1){const u=n[c];if(!u||typeof u!="object"||!$e(u.kind))continue;const m=Number(u.at)||0,l=`h-${m||"0"}-${c}-${u.kind}`;if(p[l])continue;const g=Qe({id:l,at:m||Date.now(),status:"pending",entry:u});g&&(p[l]=1,i.push(g),r+=1)}return r&&na(i.sort((c,u)=>u.at-c.at)),{added:r,list:o.casesLoad()}};const xn={male:"♂",female:"♀"};o.profilesHTML=function(e,n){const i=n||{},p=(Array.isArray(e)?e:[]).map(c=>{const u=za(c);if(!u)return"";const m=[u.date,u.hourUnknown?"时辰未知":u.time,u.address].filter(Boolean).join(" "),l=i.editingId&&u.id===i.editingId,g=i.armedDel&&u.id===i.armedDel;return`<div class="mp-prof-card${u.pinned?" pinned":""}${l?" editing":""}" data-id="${a(u.id)}">
        <button type="button" class="mp-prof-use" data-mp-prof="use" data-id="${a(u.id)}"
          title="${a(`用「${u.label||u.kind}」的出生信息直接排盘`)}">
          <span class="mp-prof-nm">${a(u.label||"未命名")}${u.gender?`<i class="sx">${xn[u.gender]||""}</i>`:""}</span>
          <span class="mp-prof-sys">${a(o.profKindLabel?o.profKindLabel(u.kind):u.kind)}</span>
          <span class="mp-prof-bd">${a(m)}</span>
          <span class="mp-prof-at">${a(Ge(u.lastUsedAt||u.createdAt))}${u.uses?` · ${u.uses} 次`:""}${u.pinned?" · 置顶":""}</span>
        </button>
        <span class="mp-prof-ops">
          <button type="button" data-mp-prof="pin" data-id="${a(u.id)}" class="${u.pinned?"on":""}"
            aria-pressed="${u.pinned?"true":"false"}" title="置顶这张档案">${u.pinned?"已置顶":"置顶"}</button>
          <button type="button" data-mp-prof="edit" data-id="${a(u.id)}" title="把这张档案读回输入框，改完再存">改名</button>
          <button type="button" data-mp-prof="del" data-id="${a(u.id)}" class="${g?"on":""}"
            title="${g?"再点一次就从本机删除这张档案":"从本机删除这张档案（点两次确认）"}">${g?"确认删除":"删除"}</button>
        </span>
      </div>`}).join(""),r=p?`<div class="mp-prof-list">${p}</div>`:'<p class="mp-prof-empty">还没有存过命盘。填好出生信息，给这张盘起个称呼，点「存为我的命盘」——下次进来一点就出盘，不必重报。</p>';return`<section class="mp-prof" aria-label="我的命盘">
      <div class="mp-prof-h"><b>我的命盘</b><span class="mp-prof-sub">只存本机 · 不上传${e&&e.length?` · ${e.length}/${da}`:""}</span></div>
      ${r}
      ${i.bar||""}
    </section>`},o.profilesBarHTML=function(e){const n=e||{};return`<div class="mp-prof-bar">
        <input class="mp-prof-name" type="text" maxlength="${ot}" placeholder="称呼，如「我」「妈妈」" aria-label="档案称呼" value="${a(n.name||"")}">
        <button type="button" data-mp-prof="put"${n.canAdd===!1?" disabled":""}>${a(n.editingId?"更新这张档案":"存为我的命盘")}</button>
        ${n.editingId?'<button type="button" class="ghost" data-mp-prof="cancel">取消改名</button>':""}
        <span class="mp-prof-tip">${a(n.tip||(n.editingId?"改完出生信息或称呼，点「更新这张档案」覆盖原档。":"存的是出生时间与出生地这些输入，不是结果。"))}</span>
      </div>`},o.profEvent=function(e){let n=e&&e.closest?e.closest("[data-mp-prof]"):null;if(!n)return null;const i=n.getAttribute("data-mp-prof");return n.tagName==="BUTTON"&&n.disabled?null:{action:i,id:n.getAttribute("data-id")||"",name:n}};const lt=["bazi","trend"],Vt=["bazi","ziwei","liuyao","meihua","daliuren","qimen","hepan","chenggu","trend","fengshui","name","xiaoliuren"];o.profUsable=function(e){return!e||typeof e!="object"?!1:e.hourUnknown===!0||e.time?!0:Vt.indexOf(String(e.kind||""))<0},o.profFromForm=function(e,n,i){const p=e||{},r=p.hourUnknown===!0&&lt.indexOf(String(p.kind||""))>=0;return!r&&!/^([01]?\d|2[0-3]):[0-5]\d$/.test(String(p.time||"").trim())?null:za(Object.assign({id:i||o.profilesNewId(),kind:String(p.kind||""),label:String(n||"").trim().slice(0,ot)||(o.profKindLabel?o.profKindLabel(p.kind):String(p.kind||"")),date:String(p.date||""),time:String(p.time||""),hourUnknown:r,gender:String(p.gender||""),address:String(p.address||""),trueSolar:p.trueSolar!==!1,lateZi:p.lateZi!==!1,pinned:!1,createdAt:Date.now(),lastUsedAt:0,uses:0}))},o.traceHTML=function(e,n,i){if(!Array.isArray(e)||!e.length)return"";const p={liuyao:"六爻",bazi:"八字",ziwei:"紫微",qimen:"奇门",daliuren:"大六壬"}[n]||"命盘",r=e.map(l=>l&&l.field).filter(Boolean).join(" → "),c=typeof i=="string"?i:"",u=(l,g)=>{const w=String(l??"");return w.length>g?`${w.slice(0,g)}…`:w},m=e.map((l,g)=>{const w=Array.isArray(l.inputs)?l.inputs:[];return`<details class="mp-trace-step"${g===0?" open":""}>
        <summary><span class="mp-trace-no">${g+1}</span><span class="mp-trace-field">${a(l.field)}</span><span class="mp-trace-res">${a(u(l.result,44))}</span></summary>
        <div class="mp-trace-detail">
          <div class="mp-trace-rule"><b>规则</b>${a(l.rule)}</div>
          ${w.length?`<dl class="mp-trace-inputs">${w.map(b=>`<dt>${a(b.label)}</dt><dd>${a(b.value)}</dd>`).join("")}</dl>`:""}
          <div class="mp-trace-result"><b>结果</b>${a(l.result)}</div>
          ${l.source?`<div class="mp-trace-src"><b>出处</b>${a(l.source)}</div>`:""}
        </div>
      </details>`}).join("");return`<button type="button" class="mp-trace-card" data-trace-open aria-haspopup="dialog" aria-controls="mp-trace-layer">
        <span class="mp-trace-title">推导链</span><span class="mp-trace-flow">${a(r)}</span><span class="mp-trace-count">${e.length} 层 · 查看</span>
      </button>
      <div class="mp-trace-layer" id="mp-trace-layer" data-trace-layer aria-hidden="true">
        <div class="mp-trace-back" data-trace-close></div>
        <aside class="mp-trace-drawer" role="dialog" aria-modal="true" aria-labelledby="mp-trace-title">
          <div class="mp-trace-head">
            <div><b id="mp-trace-title">推导链 · ${a(p)}</b><span>${e.length} 层 · 每层给出规则、输入、结果与出处；只读，不重算</span></div>
            ${c?'<button type="button" class="mp-trace-copy" data-trace-copy aria-label="复制整条推导链的 Markdown">复制 Markdown</button>':""}
            <button type="button" class="mp-trace-close" data-trace-close aria-label="关闭推导链">✕</button>
          </div>
          <div class="mp-trace-body">${m}</div>
          ${c?`<textarea class="mp-trace-md" data-trace-md readonly hidden>${a(c)}</textarea>`:""}
        </aside>
      </div>`},o.almanacHTML=function(e){if(!e||!e.meta)return o.quickHTML(e);const n=e.ganzhi||{},i=e.dayGod||null,p=(L,C)=>(L||[]).map(E=>`<span class="mp-al-chip${C?` ${C}`:""}">${a(E)}</span>`).join(""),r=(L,C)=>C?`<div class="mp-al-cell"><em>${a(L)}</em><b>${a(C)}</b></div>`:"",c=e.xiu?`${e.xiu.name}宿（${e.xiu.luck}·${e.xiu.zheng}·${e.xiu.animal}）`:"",u=e.nayin&&e.nayin.day?e.nayin.day.name:"",m=e.chong?`${e.chong.text}${e.chong.sha?` ${e.chong.sha}`:""}`:"",l=(e.hours||[]).map(L=>`<span class="mp-al-hour ${L.luck==="吉"?"good":"bad"}"><i>${a(L.zhi)}</i><em>${a((L.ganZhi||"").slice(0,1))}</em><b>${a(L.shen||"")}</b><u>${a(L.luck||"")}</u></span>`).join(""),g=e.positions||{},w=(L,C)=>C?`<span class="mp-al-chip">${a(L)}·${a(typeof C=="string"?C:C.dir||"")}</span>`:"",b=e.lucky||{},k=i?`<span class="mp-al-badge ${i.luck==="吉"?"good":"bad"}">${a(i.name)}·${a(i.type)}·${a(i.luck)}</span>`:"";return`<section class="mp-al" aria-label="黄历">
      <div class="mp-al-h"><b>${a(e.meta.date||"")}</b><i>${a(e.meta.weekday||"")}　${a((e.lunar||{}).text||"")}</i></div>
      <div class="mp-al-gz">${a(n.year||"")}年　${a(n.month||"")}月　${a(n.day||"")}日　属${a(n.shengXiao||"")}　建除 ${a(e.zhiXing||"")}日　${k}</div>
      <div class="mp-al-yiji">
        <div class="mp-al-col"><em>宜</em><div class="mp-al-chips">${p(e.yi)}</div></div>
        <div class="mp-al-col"><em>忌</em><div class="mp-al-chips">${p(e.ji)}</div></div>
      </div>
      <div class="mp-al-grid">${r("二十八宿",c)}${r("日柱纳音",u)}${r("胎神",e.taiShen)}${r("冲煞",m)}</div>
      <div class="mp-al-row"><em>吉神方位</em><div class="mp-al-chips">${w("喜神",g.xiShen)}${w("财神",g.caiShen)}${w("福神",g.fuShen)}${w("阳贵",g.yangGui)}${w("阴贵",g.yinGui)}</div></div>
      <div class="mp-al-row"><em>时刻吉凶</em><div class="mp-al-hours">${l}</div></div>
      <div class="mp-al-row"><em>吉配生肖</em><div class="mp-al-chips">${b.liuhe?`<span class="mp-al-chip">六合·${a(b.liuhe)}</span>`:""}${p(b.sanhe||[])}</div></div>
      ${e.dailyHexagram?`<div class="mp-al-hex">每日一卦：<b>${a(e.dailyHexagram.name)}</b>　${a(e.dailyHexagram.meaning||"")}</div>`:""}
      <div class="mp-al-note">${a(e.meta&&e.meta.scope||"")}</div>
    </section>`};const vn=" liuyao tarot meihua daliuren qimen xiaoliuren ",Xt=" almanac zeri convert star numerology wuyunliuqi ",Ba={cast:"先看卦名或牌名——事情此刻的样子；再看动爻、正逆位，变化在那里。",person:"先找「你」那一格（日主、命宫或主质）；再看被强调的字或星。",day:"先看今天值什么，再看宜忌那几栏。"};o.plainHTML=function(e){if(!e||e.system==="taiyi"||e.system==="qian"||e.system==="guanyin")return"";const n=e.brief&&e.brief.lead||"";if(!n)return"";const i=" "+String(e.system||"")+" ",p=vn.indexOf(i)>=0?Ba.cast:Xt.indexOf(i)>=0?Ba.day:Ba.person;return'<div class="mp-pl"><p class="mp-pl-lead">'+a(n)+'</p><p class="mp-pl-how">'+a(p)+"</p></div>"},o.taiyiHTML=function(e){if(!e||!e.taiyi||!e.meta)return"";const n=e.taiyi,i=e.wenchang||{},p=e.shiji||{},r=e.jishen||{},c=e.suan||{},u=e.jiang||{},m=e.geju||{},g=[[9,"巽"],[2,"离"],[7,"坤"],[4,"震"],[5,"中"],[6,"兑"],[3,"艮"],[8,"坎"],[1,"乾"]].map(I=>{const ae=I[0],re=I[1],xe=n.palace===ae,Me=i.num===ae,P=p.palace===ae,Le=(xe?'<i class="mp-ty-mark">太乙</i>':"")+(P?'<i class="mp-ty-mark s">始击</i>':"")+(Me?'<i class="mp-ty-mark w">文昌</i>':"");return`<div class="mp-ty-cell${xe?" on":""}${re==="中"?" mid":""}"><b>${a(re)}</b><em>${ae}</em>${Le}</div>`}).join(""),w=e.scope&&e.scope.notCovered||[],b=e.month||{},k=e.day||{},L=e.hour||{},C=b.taiyi&&b.taiyi.palaceName||"",E=String(b.taiyi&&b.taiyi.unitInPalace||""),le=b.mu?b.mu.pos+"（"+b.mu.god+"）":"",B=b.jishen&&b.jishen.branch||"",O=k.taiyi&&k.taiyi.palaceName||"",ne=String(k.taiyi&&k.taiyi.unitInPalace||""),Z=k.mu?k.mu.pos+"（"+k.mu.god+"）":"",T=k.jishen&&k.jishen.branch||"",oe=L.taiyi&&L.taiyi.palaceName||"",X=String(L.taiyi&&L.taiyi.unitInPalace||""),Ae=L.jishen&&L.jishen.branch||"",je=e.jixiong||{},U=e.verdict||{},be=U.grade||je.grade||"xiong",ie=U.label||je.label||"凶",y=e.shenjiang||{},z=y.rows?`${y.stem}日、${y.day?"昼贵":"夜贵"}起${y.startBranch}${y.dir>0?"顺":"逆"}行；吉神下：${(y.goods||[]).join("、")||"无"}；凶神下：${(y.bads||[]).join("、")||"无"}`:"未排",q=je.grade||"xiong",fe=je.label||"凶",v=e.gate&&e.gate.gate||"",J={掩:"客方的目和太乙挤在同一格",击:"始击挨在太乙左右",格:"太乙和始击隔一格正面对上",对:"文昌从对面顶过来",提:"客大将和文昌挤在一格",迫:"有将贴得太近，就在太乙前后一格",囚:"有将被关在太乙那一格里",关:"主客两边的人撞在一处"},pe=(m.list||[]).map(I=>{const ae=String(I).charAt(0);return J[ae]?ae+"——"+J[ae]:String(I)}),N=q==="xiong"?`太乙站在${n.palaceName}宫（${n.dir}），值${v}门，判凶：主客两边有几样撞到了一起。`:q==="daji"?`太乙站在${n.palaceName}宫（${n.dir}），值${v}门，判大吉：位置和数都顺，门也在吉道上。`:q==="buhe"?`太乙站在${n.palaceName}宫（${n.dir}），值${v}门，判不和：位置不冲突，但数上不合。`:`太乙站在${n.palaceName}宫（${n.dir}），值${v}门，判吉：位置不冲突。`;return`<section class="mp-ty" aria-label="太乙神数">
      <div class="mp-ty-h">
        <span class="mp-ty-y">${a(String(e.meta.year))} 年</span>
        <span class="mp-ty-j">${a(e.meta.dunText||"")}${a(String(e.meta.ju))}局</span>
        <span class="mp-ty-m">太乙临 ${a(n.palaceName||"")} 宫</span>
        <span class="mp-ty-m">${a(v)}</span>
      </div>
      <div class="mp-ty-g">${g}</div>
      <div class="mp-ty-plain">
        <p class="mp-ty-lead">${a(N)}</p>
        <p>先看太乙落在哪一格——那是「主」这一年的位置，整张盘围着它转。</p>
        <p>${a(v)}门一值三十年，管的是这三十年的大环境，不是今年单一年的事。</p>
        <p>判${a(fe)}，是因为${a(pe.length?pe.join("；"):"八种位置关系一个都没犯")}。</p>
        <p class="mp-ty-close">这一层只摆位置和数，不回答事情成不成；想看每一步怎么来的，展开下面的细目。</p>
      </div>
      <details class="mp-ty-det">
        <summary>细目（想核对推导再展开）</summary>
        <div class="mp-ty-sec"><em>太乙</em>第 ${a(String(n.palace||""))} 宫（${a(n.dir||"")}），三年里的第 ${a(String(n.yearInPalace||""))} 年，${a(n.li||"")}</div>
        <div class="mp-ty-sec"><em>八门</em>${a(v)}　八门三十年一转，1954 年从休门起</div>
        <div class="mp-ty-sec"><em>文昌</em>${a(i.pos||"")}（${a(i.god||"")}，${a(i.palaceName||"")}宫）　十八年一周</div>
        <div class="mp-ty-sec"><em>定目</em>${a(e.dingmu&&e.dingmu.pos||"")}（${a(e.dingmu&&e.dingmu.god||"")}）　<em>三基</em>君${a(e.sanji&&e.sanji.jun||"")} 臣${a(e.sanji&&e.sanji.chen||"")} 民${a(e.sanji&&e.sanji.min||"")}</div>
        <div class="mp-ty-sec"><em>五福</em>${a(e.wufu&&e.wufu.palaceName||"")}宫　<em>大游</em>${a(e.dayou&&e.dayou.palaceName||"")}宫　<em>十精</em>天乙${a(e.shijing&&e.shijing.tianyi||"")} 地乙${a(e.shijing&&e.shijing.diyi||"")} 直符${a(e.shijing&&e.shijing.zhifu||"")}</div>
        <div class="mp-ty-sec"><em>数和</em>主算 ${a(e.heshu&&e.heshu.zhu&&e.heshu.zhu.text||"")}　客算 ${a(e.heshu&&e.heshu.ke&&e.heshu.ke.text||"")}</div>
        <div class="mp-ty-sec"><em>月计</em>太乙在 ${a(C)} 宫（第 ${a(E)} 月）　天目 ${a(le)}　计神 ${a(B)}</div>
        <div class="mp-ty-sec"><em>日计</em>太乙在 ${a(O)} 宫（第 ${a(ne)} 日）　天目 ${a(Z)}　计神 ${a(T)}</div>
        <div class="mp-ty-sec"><em>时计</em>太乙在 ${a(oe)} 宫（第 ${a(X)} 时）　计神 ${a(Ae)}</div>
        <div class="mp-ty-sec"><em>吉凶</em><b class="mp-ty-jx ${a(be)}">${a(ie)}</b> ${a(e.jixiong&&e.jixiong.text||"")}</div>
        <div class="mp-ty-sec"><em>神将</em>${a(z)}</div>
        <div class="mp-ty-sec"><em>计神</em>${a(r.branch||"")}（${a(r.god||"")}）　<em>始击</em>${a(p.pos||"")}（${a(p.god||"")}，${a(p.palaceName||"")}宫）</div>
        <div class="mp-ty-sec"><em>主算</em>${a(String(c.zhu||""))}　主大将${a(u.zhuDaName||"")}宫　主参将${a(u.zhuCanName||"")}宫</div>
        <div class="mp-ty-sec"><em>客算</em>${a(String(c.ke||""))}　客大将${a(u.keDaName||"")}宫　客参将${a(u.keCanName||"")}宫</div>
        <div class="mp-ty-sec"><em>格局</em>${m.list&&m.list.length?a(m.list.join("；")):"四将不相犯，没有掩、迫、囚、格、关"}</div>
        <div class="mp-ty-sec"><em>积年</em>${a(String(e.meta.jinian||""))}　残年 ${a(String(e.meta.rest360||""))}　${a(e.year?e.year.jiName:"")}${a(e.year?String(e.year.jiYear):"")}年　${a(e.year?e.year.yuanName:"")}第 ${a(e.year?String(e.year.yuanYear):"")} 年</div>
        <div class="mp-ty-note">算到太乙、八门、文昌、计神、始击、主客算与四将、五种格局；${a(w.join("、"))}未收录，盘上不显示。将落中五时只标数不加宫名。</div>
      </details>
    </section>`},o.wuyunliuqiHTML=function(e){if(!e||!e.zhongyun||!e.year)return"";const n=e.zhongyun,i=e.current||{},p=[];e.special&&e.special.taiYi&&p.push("太乙天符"),e.special&&e.special.tianFu&&!e.special.taiYi&&p.push("天符"),e.special&&e.special.suiHui&&!e.special.taiYi&&p.push("岁会"),e.special&&e.special.tongTianFu&&p.push("同天符"),e.special&&e.special.tongSuiHui&&p.push("同岁会");const r=(u,m)=>(u||[]).map(l=>{const g=m?l.qi:l.name,w=m?!!(i.keQi&&i.keQi.qi===l.qi):!!(i.keYun&&i.keYun.name===l.name),b=m?l.sitian?"司天":l.zaiquan?"在泉":"":l.taiShao||"";return`<div class="mp-wl-step${w?" on":""}"><span class="mp-wl-no">${l.no}</span><span>${a(g||"")}</span><span class="mp-wl-tg">${a(b)}</span><span class="mp-wl-tm">${a(l.startTime||"")}—${a(l.endTime||"")}</span></div>`}).join(""),c=p.map(u=>`<span class="mp-wl-tag on">${a(u)}</span>`).join("");return`<section class="mp-wl" aria-label="五运六气">
      <div class="mp-wl-h">
        <span class="mp-wl-y">${a(e.year.ganzhi)}</span>
        <span class="mp-wl-z">${a(n.name)}</span>
        <span class="mp-wl-m">${a(e.year.startTime||"")} — ${a(e.year.endTime||"")}</span>
      </div>
      ${c?`<div class="mp-wl-sec"><em>格局</em>${c}</div>`:""}
      <div class="mp-wl-sec"><em>司天在泉</em>${a(e.sitian.qi)}司天　${a(e.zaiquan.qi)}在泉</div>
      <div class="mp-wl-sec"><em>此刻</em>${a(i.text||"")}</div>
      <div class="mp-wl-sec"><em>客运五步</em></div>
      <div class="mp-wl-steps">${r(e.keYun,!1)}</div>
      <div class="mp-wl-sec"><em>客气六步</em></div>
      <div class="mp-wl-steps">${r(e.keQi,!0)}</div>
      <div class="mp-wl-note">${a(e.scope?e.scope.note:"")}</div>
    </section>`},o.constitutionHTML=function(e){if(!e)return"";if(e.paper&&Array.isArray(e.questions)){const r=e.questions.map(c=>`<li><span class="mp-cs-no">${c.no}</span><span class="mp-cs-t">${a(c.text)}</span><em>${a(c.name)}</em></li>`).join("");return`<section class="mp-cs-paper" aria-label="中医体质问卷">
        <div class="mp-cs-h"><span><b>中医体质问卷</b><i>${e.scaleCount} 种体质 × ${e.itemsPerScale} 题 · 1 没有 / 5 总是</i></span>
        <span class="mp-cs-count">填完分数再看结果</span></div>
        <ol>${r}</ol>
        <div class="mp-cs-note">${a(e.note||"")}</div>
      </section>`}const n=e.primary||{},i=(e.scales||[]).map(r=>{const c=Math.max(0,Math.min(100,r.converted||0)),u=r.level&&r.level!=="否";return`<div class="mp-cs-row${n.key===r.key?" main":""}">
        <span class="mp-cs-n">${a(r.name)}</span>
        <span class="mp-cs-track"><i class="${u?"on":""}" style="width:${c}%"></i><b class="mp-cs-tick" style="left:40%"></b></span>
        <span class="mp-cs-v">${c}</span>
        <span class="mp-cs-l">${a(r.level||"")}</span>
      </div>`}).join(""),p=(e.care||[]).map(r=>`<li>${a(r)}</li>`).join("");return`<section class="mp-cs" aria-label="中医体质结果">
      <div class="mp-cs-h">
        <span class="mp-cs-main">${a(n.name||"—")}</span>
        <span class="mp-cs-meta"><b>${a(n.oneLine||"")}</b><i>${e.secondary?`兼夹 ${a(e.secondary.name)}（${Math.round(e.secondary.converted)}）`:"无兼夹"}${e.flat?" · 区分度不足":""}</i></span>
        <span class="mp-cs-count">已答 ${e.meta?e.meta.answered:0}/${e.meta?e.meta.total:0} 题</span>
      </div>
      <div class="mp-cs-bars">${i}</div>
      <div class="mp-cs-sec"><em>这体质</em>${a(n.trait||"")}</div>
      <div class="mp-cs-sec"><em>倾向</em>${a(n.tendency||"")}</div>
      <div class="mp-cs-care"><b>调养方向</b><ul>${p}</ul></div>
      <div class="mp-cs-note">${a(e.note||"")}</div>
    </section>`},o.mbtiHTML=function(e){if(!e)return"";if(e.needAnswers&&Array.isArray(e.questions)){const r=e.questions.map(c=>`<li>${a(c.text)}</li>`).join("");return`<section class="mp-mb-paper" aria-label="十六型人格问卷">
        <div class="mp-mb-h">
          <span class="mp-mb-meta"><b>十六型人格问卷</b><i>${e.total} 题 · 每题 1 完全不像 / 5 很像我</i></span>
          <span class="mp-mb-count">填完分数再看结果</span>
        </div>
        <ol>${r}</ol>
        <div class="mp-mb-note">${a(e.note||"")}</div>
      </section>`}const n=(e.dims||[]).map(r=>{const c=Math.round((r.pct||0)*100),u=r.picked===r.left,m=Math.max(2,c),l=u?r.leftSay:r.rightSay;return`<div class="mp-mb-dim">
        <div class="mp-mb-dh"><b class="${u?"on":""}">${a(r.left)}</b><em>${a(r.name)}</em><b class="${u?"":"on"}">${a(r.right)}</b></div>
        <div class="mp-mb-bar ${u?"l":"r"}"><em style="width:${m}%"></em></div>
        <div class="mp-mb-df">取 ${a(r.picked)} · ${a(r.strength)} ${c}%</div>
        <div class="mp-mb-ds">${a(l)}</div>
      </div>`}).join(""),i=e.profile||{},p=(i.stack||[]).map((r,c)=>`<span class="${c===0?"lead":""}"><b>${a(r.code)}</b>${a(r.say)}</span>`).join("");return`<section class="mp-mb" aria-label="十六型人格结果">
      <div class="mp-mb-h">
        <span class="mp-mb-code">${a(e.type||"")}</span>
        <span class="mp-mb-meta"><b>${a(i.title||"")}</b><i>${a(i.keywords||"")}</i></span>
        <span class="mp-mb-count">已答 ${e.answered||0}/${e.total||0} 题</span>
      </div>
      <div class="mp-mb-body">
        <div class="mp-mb-dims">${n}</div>
        <div class="mp-mb-sec"><em>一句</em>${a(i.oneLine||"")}</div>
        <div class="mp-mb-two">
          <div><b>优势</b>${(i.strengths||[]).map(r=>a(r)).join("；")}</div>
          <div><b>留意</b>${(i.blindspots||[]).map(r=>a(r)).join("；")}</div>
        </div>
        ${p?`<div class="mp-mb-sec"><em>认知功能</em>主导 ${a((i.stack[0]||{}).code||"")} → 依次展开</div><div class="mp-mb-fn">${p}</div>`:""}
        <div class="mp-mb-sec"><em>工作</em>${a(i.work||"")}</div>
        <div class="mp-mb-sec"><em>关系</em>${a(i.love||"")}</div>
        <div class="mp-mb-sec"><em>学习</em>${a(i.study||"")}</div>
        <div class="mp-mb-sec"><em>课题</em>${a(i.growth||"")}</div>
      </div>
      <div class="mp-mb-note">${a(e.note||"")}</div>
    </section>`};const zt=[["巽","离","坤"],["震","中","兑"],["艮","坎","乾"]],Re={坎:"正北",艮:"东北",震:"正东",巽:"东南",离:"正南",坤:"西南",兑:"正西",乾:"西北",中:"中宫"},dt=["生气","延年","天医","伏位"],Fe=(e,n)=>`<span class="mp-fs-chip${n?" "+n:""}">${a(e)}</span>`,Ga=(e,n,i)=>`<div class="mp-fs-cell${e==="中"?" center":""}"><div class="mp-fs-top"><span class="mp-fs-gua">${a(e)}</span><span class="mp-fs-dir">${a(Re[e]||"")}</span>${n||""}</div>`+(i||"")+"</div>",Ma=e=>e.length?`<dl class="mp-fs-facts">${e.map(([n,i])=>`<div class="mp-fs-row"><dt>${a(n)}</dt><dd>${a(i)}</dd></div>`).join("")}</dl>`:"",ct=(e,n,i,p,r,c)=>`<section class="mp-quick mp-fs" aria-label="风水结果"><div class="mp-quick-h"><b>${a(e)}</b>${n?`<span class="mp-fs-sub">${a(n)}</span>`:""}</div>`+(i.length?`<div class="mp-fs-chips">${i.join("")}</div>`:"")+p+r+c.filter(Boolean).map(u=>`<div class="mp-fs-note">${a(u)}</div>`).join("")+"</section>",Ua=(e,n)=>`<div class="mp-fs-grid" role="group" aria-label="${a(n)}">`+zt.map(i=>i.map(p=>{const r=e.find(m=>m&&m.palace===p);if(!r)return Ga(p,"","");const c=dt.includes(r.star),u=`<span class="mp-fs-star"${r.role?` title="${a(r.role)}"`:""}>${a(r.star)}<em class="${c?"ok":"bad"}">${c?"吉":"凶"}</em></span>`;return Ga(p,u,"")}).join("")).join("")+"</div>";function Jt(e,n){const i=n.period,p={};for(const k of e.palaces||[])p[k.palace]=k;const r=`<div class="mp-fs-key">每宫依次为 <b>运</b>／<b>山</b>／<b>向</b> 三星；底色高亮＝当运（${a(i)}运）</div><div class="mp-fs-grid" role="group" aria-label="玄空九宫（运/山/向）">`+zt.map(k=>k.map(L=>{const C=p[L];if(!C)return Ga(L,"","");const E=[["运",C.yun],["山",C.shan],["向",C.xiang]].map(([le,B])=>`<span class="${B===i?"on":""}" title="${a(le)}星 ${a(B)}">${a(B)}</span>`).join("");return Ga(L,"",`<div class="mp-fs-nums">${E}</div>`)}).join("")).join("")+"</div>",c=e.wangShanWangXiang||{},u=n.jianXiang||{},m=e.timeFlying||null,l=[Fe(u.active?`兼${u.jian} ${u.offset}° · 替卦`:"正向 · 下卦",u.active?"ok":""),Fe(`山盘 ${n.shanCenter.star}${n.shanCenter.name} · ${n.shanCenter.fly}`),Fe(`向盘 ${n.xiangCenter.star}${n.xiangCenter.name} · ${n.xiangCenter.fly}`),Fe(c.byChart?"盘面：到山到向":"盘面：未到山到向",c.byChart?"ok":""),Fe(c.byTable===null?"表法：替卦不套":c.byTable?"表法：在列":"表法：未列",c.byTable?"ok":"")],g=(k,L)=>`${L} ${k.star}${k.name}（${k.fly}，${k.basis}${k.mode==="替卦"?`；原运星 ${k.original}${k.replaced?"，已替":"，用替而未替"}`:""}）`,w=m?[["year","年"],["month","月"],["day","日"],["hour","时"]].filter(([k])=>m[k]).map(([k,L])=>`${L}${m[k].centerName}（${m[k].fly}）`).join("　"):"",b=Ma([...u.active?[["替卦",`${u.note}${c.byTable===null?" 正向旺山旺向表不适用于替卦。":""}`]]:[],["入中",`${g(n.shanCenter,"山盘")}；${g(n.xiangCenter,"向盘")}`],["当运",`山星${i}落 ${e.dangYun.shan.text}；向星${i}落 ${e.dangYun.xiang.text}`],["合十",`山星：${(e.heshi.shan||[]).join("、")||"无"}；向星：${(e.heshi.xiang||[]).join("、")||"无"}`],["表法",`${c.note||""}${(c.table||[]).length?` 本运所列：${c.table.join("、")}。`:" 本运表法无局。"}`],...w?[["年月日时",`${w}${m.meta&&m.meta.note?`　${m.meta.note}`:""}`]]:[]]);return ct(u.active?"玄空替卦":"玄空下卦",`${n.periodLabel} · 坐${n.sitting} · 向${n.facing}`,l,r,b,[n.note,e.disclaimer])}function Ue(e,n){const i=e.mingGua||{},p=Ua([...e.luckyDirections||[],...e.unluckyDirections||[]],"八宅八向（吉凶）"),r=[Fe(i.compatible||"—"),Fe(`${n.gender}命 · ${n.guaYear} 年立春界`)],c=[];if(e.yearlyFlying){const u=e.yearlyFlying;c.push(["年紫白",`${u.centerName}入中；${u.palaces.filter(m=>m.palace!=="中").map(m=>`${m.palace}${m.name}`).join("、")}`])}return ct("八宅命卦",`${i.num}${i.gua}（${i.group}）· ${i.direction}`,r,p,Ma(c),[n.note,e.disclaimer])}function qt(e,n){const i=e.layout||{},p=Ua(e.houseStars||[],"宅卦八向（吉凶）"),r=[Fe(`${n.houseGua}宅 · ${n.houseGroup}`),Fe(`坐${n.sitting}`),Fe(`向${n.facing}`)],c=[["门",i.door],["灶",i.stove],["床",i.bed],["厕",i.toilet]];return e.mingMatch&&c.push(["命宅配",e.mingMatch.text]),ct("门主灶",`${n.houseGua}宅 · 坐${n.sitting} · 向${n.facing}`,r,p,Ma(c),[n.birthNote,e.disclaimer])}o.fengshuiHTML=function(e){if(!e||e.system!=="fengshui")return o.quickHTML(e);const n=e.meta||{};return n.action==="xuankong"?Jt(e,n):n.action==="advise"?qt(e,n):Ue(e,n)},o.perfHTML=function(e){if(!e)return"";const n=m=>typeof m=="number"&&isFinite(m)?`${Math.max(0,Math.round(m))}ms`:"",i=e.cached===!0?"（已缓存）":e.cached===!1?"（首次加载）":"",p=[];n(e.engineMs)&&p.push(`引擎 ${n(e.engineMs)}${i}`),n(e.computeMs)&&p.push(`排盘 ${n(e.computeMs)}`),n(e.renderMs)&&p.push(`渲染 ${n(e.renderMs)}`);const r=n(e.totalMs);if(!p.length&&!r)return"";const c=r?`首屏 ${r}`:"耗时";return`<div class="mp-perf" title="本机这一次的实测耗时，不含网络与服务端；换机器、首次加载与已缓存会不同">${p.length?`${c}｜${p.join(" · ")}`:c}</div>`},o.zeriHTML=function(e){if(!e||!e.compare||e.compare.mode!=="candidates"||!Array.isArray(e.days))return o.quickHTML(e);const n=e.meta||{},i=e.shenshaRef||{},p=e.compare.best?e.compare.best.date:"",r=e.days.map(m=>{const l=m.date===p,g=m.excluded||m.verdict==="回避"?"bad":m.verdict==="推荐"?"good":"",w=m.grade||{},b=w.label?`<b>${a(w.label)}</b><em>吉${a(w.ji)} / 凶${a(w.xiong)}　${a(w.decision||"")}</em>`:"—";return`<tr class="mp-zr-row${l?" top":""}${m.excluded?" off":""}">
        <th scope="row"><b>${a(m.date)}</b>${l?'<i class="mp-zr-best">最优</i>':""}
          <em>${a(m.weekday)}　${a(m.lunar)}</em></th>
        <td><b>${a(m.dayGanZhi)}</b><em>${a(m.zhiXing)}日</em></td>
        <td class="mp-zr-score">${a(m.score)}</td>
        <td class="mp-zr-grade">${b}</td>
        <td><span class="mp-zr-v ${g}">${a(m.verdict)}</span></td>
        <td class="mp-zr-why">${a(m.reasons.join("；")||"无特别加减分")}</td>
      </tr>`}).join(""),c=(m,l)=>`<span><em>${a(m)}</em>${l.length?a(l.join("、")):"无"}</span>`,u=e.compare.best?`这一组最优：<b>${a(e.compare.best.date)}</b>（${a(e.compare.best.score)} 分 · ${a(e.compare.best.verdict)}）`+(e.compare.best.ties.length>1?`；同分 ${a(e.compare.best.ties.filter(m=>m!==e.compare.best.date).join("、"))}`:""):"这一组都因冲属相被排除，没有可用的日子";return`<section class="mp-zr" aria-label="择日候选比较">
      <div class="mp-zr-h"><b>择日 · ${a(n.task||"")}</b>
        <span>候选 ${a(n.days)} 天${n.shengXiao?`　当事人属${a(n.shengXiao)}`:"（未给属相，未做冲煞排除）"}</span></div>
      <div class="mp-zr-lead">${u}</div>
      <table class="mp-zr-t"><thead><tr>
        <th scope="col">日期</th><th scope="col">日干支 / 建除</th><th scope="col">分</th><th scope="col">卷十等第</th><th scope="col">结论</th><th scope="col">理由</th>
      </tr></thead><tbody>${r}</tbody></table>
      <div class="mp-zr-lists">
        ${c("推荐",e.best)}${c("可用",e.usable)}${c("回避",e.avoid)}
      </div>
      <p class="mp-zr-note">${a(e.compare.note||"")}</p>
      ${i.text?`<p class="mp-zr-note">神煞依据：${a(i.text)}（${a(i.edition||"")}）；起法 ${a((i.volumes||[]).join("、"))}。未实现起法：${a((i.unsupported||[]).join("、"))}（不计分）。</p>`:""}
      ${i.juan10?`<p class="mp-zr-note">卷十依据：${a(i.juan10.text)}（${a(i.juan10.corpusLines||"")}）；${a(i.juan10.thresholdsNote||"")}${a(i.juan10.note||"")}</p>`:""}
      <p class="mp-zr-note">${a(n.scope||"")}</p>
      <p class="mp-zr-note">${a(e.disclaimer||"")}</p>
    </section>`},o.quickHTML=function(e){if(!e)return"";const i={almanac:"黄历",zeri:"择日",chenggu:"称骨",xiaoliuren:"小六壬",star:"星座",numerology:"生命数字",trend:"人生 K 线",fengshui:"风水",name:"起名",convert:"公农历转换",mbti:"十六型人格"}[e.system]||"速查",p=e.summary||"",r=p?`<pre class="mp-quick-pre">${a(p)}</pre>`:"";return`<section class="mp-quick" aria-label="${a(i)}结果">
      <div class="mp-quick-h"><b>${a(i)}</b></div>
      ${r}
    </section>`},o.summaryCardPNG=function(e,n){try{if(typeof document>"u"||!document.createElement)return"";let i=n;if((!i||!i.outline)&&e&&e.system==="guanyin"&&e.brief){const ie=e.brief,y=e.slip||{};i={systemLabel:"观音灵签",outline:(ie.sections||[]).map(z=>({label:z.h,text:z.t})),envelope:{verdict:{headline:y.no?`第 ${y.no} 签「${y.title}」`:String(ie.title||"")}}}}const p=i&&i.outline||[],r=(i&&i.tables||[]).filter(ie=>Array.isArray(ie.rows)&&ie.rows.length),c=i&&i.systemLabel||e&&e.system||"命理报告",u=900,m=44,l=26,g=(ie,y)=>`${y?"600 ":""}${ie}px "PingFang SC","Microsoft YaHei","Noto Sans CJK SC",sans-serif`,w=document.createElement("canvas"),b=w.getContext?w.getContext("2d"):null;if(!b)return"";const k=(ie,y)=>{const z=[];let q="";for(const fe of String(ie)){const v=q+fe;b.measureText(v).width>y&&q?(z.push(q),q=fe):q=v}return q&&z.push(q),z.length?z:[""]},L=i&&i.envelope||null,C=L&&L.verdict||null,E=String(C&&C.headline||e&&e.brief&&e.brief.headline||e&&e.factHead&&e.factHead.headline||"").trim(),le=String(e&&e.brief&&e.brief.lead||C&&C.condition||e&&e.factHead&&e.factHead.note||"").trim();b.font=g(22,!0);const B=E?k(E,u-m*2).slice(0,3):[];b.font=g(14);const O=le?k(le,u-m*2).slice(0,2):[],ne=B.length?26+B.length*32+(O.length?8+O.length*24:0)+16:0;b.font=g(15);let Z=0;const T=p.map(ie=>{const y=k(ie.text,u-m*2-70);return Z+=Math.min(y.length,2)*l+10,{o:ie,lines:y.slice(0,2)}}),oe=r[0]||null,X=oe?oe.rows.slice(0,6):[],Ae=oe?54+X.length*34:0,je=150+ne+Z+(T.length?34:0)+Ae+120;w.width=u,w.height=je,b.fillStyle="rgb(255,255,255)",b.fillRect(0,0,u,je),b.fillStyle="rgb(31,111,63)",b.fillRect(0,0,u,8);let U=52;b.fillStyle="rgb(27,27,27)",b.font=g(28,!0),b.fillText(`${c} · 摘要`,m,U),U+=30,b.fillStyle="rgb(111,106,96)",b.font=g(14);const be=[e&&e.input&&e.input.datetime?`出生/起局：${e.input.datetime}`:"","本地计算 · 可复现"].filter(Boolean).join("　");if(b.fillText(be,m,U),U+=34,B.length&&(b.fillStyle="rgb(31,111,63)",b.font=g(15,!0),b.fillText("结论",m,U),U+=26,b.fillStyle="rgb(27,27,27)",b.font=g(22,!0),B.forEach((ie,y)=>b.fillText(ie,m,U+y*32)),U+=B.length*32,O.length&&(U+=8,b.fillStyle="rgb(111,106,96)",b.font=g(14),O.forEach((ie,y)=>b.fillText(ie,m,U+y*24)),U+=O.length*24),U+=16),T.length){b.fillStyle="rgb(31,111,63)",b.font=g(16,!0),b.fillText("一页读懂",m,U),U+=26;for(const{o:ie,lines:y}of T)b.fillStyle="rgb(138,131,120)",b.font=g(14,!0),b.fillText(ie.label,m,U),b.fillStyle="rgb(63,58,51)",b.font=g(15),y.forEach((z,q)=>b.fillText(z,m+70,U+q*l)),U+=y.length*l+10;U+=8}if(oe){b.fillStyle="rgb(31,111,63)",b.font=g(16,!0),b.fillText(oe.title,m,U),U+=24,b.fillStyle="rgb(138,131,120)",b.font=g(13),b.fillText(oe.columns.join(" · "),m,U),U+=8,b.strokeStyle="rgb(229,225,216)",b.beginPath(),b.moveTo(m,U),b.lineTo(u-m,U),b.stroke(),U+=22,b.fillStyle="rgb(63,58,51)",b.font=g(14);for(const ie of X){const y=ie.filter(Boolean).join(" · "),z=k(y,u-m*2)[0];b.fillText(z,m,U),U+=34}}return U=je-62,b.strokeStyle="rgb(229,225,216)",b.beginPath(),b.moveTo(m,U-18),b.lineTo(u-m,U-18),b.stroke(),b.fillStyle="rgb(138,131,120)",b.font=g(12),b.fillText("内容用于传统文化学习与自我探索，不构成医疗、投资、法律或人事决策依据。",m,U+6),b.fillText("dsh-metaphysics · 本机计算，未上传任何数据",m,U+26),w.toDataURL?w.toDataURL("image/png"):""}catch{return""}};const mt="https://registry.npmjs.org/dsh-metaphysics/latest";o.signatureHTML=function(e){const n=window&&window.__MP_VER?String(window.__MP_VER).trim():"",i=o.wxQrLive(e);return`<div class="mp-sig">
        <span class="mp-sig-brand">烛微命盘${n?`<i>v${a(n)}</i>`:""}</span>
        <button type="button" class="mp-sig-btn" data-mp-qr="qq" aria-expanded="false">腾讯频道 pd48189034 · 看二维码</button>
        ${i?'<button type="button" class="mp-sig-btn" data-mp-qr="wx" aria-expanded="false">微信群 · 看二维码</button>':`<span class="mp-sig-note">微信群二维码已过期（${me} 前有效），更新插件换新码</span>`}
        <button type="button" class="mp-sig-btn" data-mp-chk>检查更新</button>
        <span class="mp-sig-msg" role="status" aria-live="polite"></span>
        <div class="mp-sig-qr" data-qr-for="qq"><img src="${A}" alt="腾讯频道「烛微命盘」二维码，频道号 pd48189034" width="132" height="132" loading="lazy"><span>微信或 QQ 扫一扫，加入频道；也可以在腾讯频道里直接搜 pd48189034。</span></div>
        ${i?`<div class="mp-sig-qr" data-qr-for="wx"><img src="${Y}" alt="微信群「dsh-metaphysics」群二维码，${me} 前有效" width="240" height="240" loading="lazy"><span>微信扫一扫进群；群码 7 天有效，过期后更新插件换新码，长期入口仍是腾讯频道。</span></div>`:""}
      </div>`},o.wxQrLive=function(e){let n;if(typeof e=="string"&&/^\d{4}-\d{2}-\d{2}/.test(e))n=e.slice(0,10);else{const i=e instanceof Date?e:new Date(e===void 0?Date.now():e);if(isNaN(i.getTime()))return!0;n=`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}-${String(i.getDate()).padStart(2,"0")}`}return n<=me};const Qt=(e,n)=>{const i=String(e).split(".").map(r=>parseInt(r,10)||0),p=String(n).split(".").map(r=>parseInt(r,10)||0);for(let r=0;r<Math.max(i.length,p.length);r+=1){const c=(i[r]||0)-(p[r]||0);if(c)return c>0?1:-1}return 0};o.checkUpdate=function(e,n){const i=window&&window.__MP_VER?String(window.__MP_VER).trim():"",p=g=>{e&&(e.textContent=g||"")},r=window&&typeof window.fetch=="function"?window.fetch:typeof fetch=="function"?fetch:null;if(!r)return p("");n&&(n.disabled=!0),p("正在查…");let c=null;try{c=new AbortController}catch{c=null}const u=setTimeout(()=>{try{c&&c.abort()}catch{}},8e3),m=g=>{clearTimeout(u),n&&(n.disabled=!1),p(g)};let l;try{l=r(mt,c?{cache:"no-store",signal:c.signal}:{cache:"no-store"})}catch{return m("")}l.then(g=>g&&g.ok?g.json():null).then(g=>{const w=g&&g.version?String(g.version):"";return w?i?Qt(w,i)>0?m(`v${w} 可用，重装插件后生效`):m(`已是最新（v${i}）`):m(`最新 v${w}`):m("")}).catch(()=>m(""))},typeof document<"u"&&document&&typeof document.addEventListener=="function"&&!window.__MP_SIG_BOUND&&(window.__MP_SIG_BOUND=!0,document.addEventListener("click",e=>{const n=e.target&&e.target.closest?e.target.closest("[data-mp-qr]"):null;if(n){const p=n.parentElement&&n.parentElement.querySelector(`.mp-sig-qr[data-qr-for="${n.getAttribute("data-mp-qr")}"]`);if(p){const r=!p.classList.contains("on");typeof p.classList.toggle=="function"&&p.classList.toggle("on",r),n.setAttribute("aria-expanded",r?"true":"false")}return}const i=e.target&&e.target.closest?e.target.closest("[data-mp-chk]"):null;if(i){const p=i.parentElement&&i.parentElement.querySelector(".mp-sig-msg");o.checkUpdate(p,i)}}))})(),(function(){const s="mp.view",o=["perf","revision","handle","shadow","trace","caliber"],A=["head","body","chart","shortId","castAt","solar","interpret","followup","extra","sign"],Y={chart:["bazi","ziwei","hepan","trend","fengshui","name"],ask:["liuyao","meihua","daliuren","qimen","tarot","xiaoliuren"],judge:["wuyunliuqi","taiyi","zeri"],quiz:["mbti","constitution"],lookup:["almanac","chenggu","qian","guanyin","star","numerology","convert"]},me={quiz:["followup"],lookup:["followup"]};function Q(W){const D=String(W||""),F=Object.keys(Y);for(let K=0;K<F.length;K++)if(Y[F[K]].indexOf(D)>=0)return F[K];return"chart"}const te=()=>{try{return window.localStorage||null}catch{return null}},ee=W=>String(W??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function ve(){try{const W=window.location||{},D=/(?:^|[?&#])dev=([^&]*)/.exec(String((W.search||"")+(W.hash||"")));if(D)return D[1]!=="0"&&D[1]!=="false";const F=te();return!!(F&&F.getItem(s)==="dev")}catch{return!1}}function ke(W){const D=te();if(D)try{D.setItem(s,W?"dev":"user")}catch{}return!!W}function Te(W){if(!W||W.__mpDevBound)return;W.__mpDevBound=!0;let D=0,F=0;W.addEventListener("click",()=>{const K=Date.now();if(D=K-F>1200?1:D+1,F=K,D<5)return;D=0;const se=ke(!ve());W.title=se?"已切到开发者视图（再点五下切回）":"",typeof window.__MPRepaint=="function"&&window.__MPRepaint()})}function G(W,D){const F=W||{},K=D||{},se=typeof K.mode=="string"?K.mode==="dev":ve(),ze=me[Q(K.system)]||[],qe=A.filter(Ee=>ze.indexOf(Ee)<0);return se&&qe.push(...o),qe.push("exportBar"),qe.map(Ee=>F[Ee]).filter(Boolean).join("")}function we(W){const D=typeof W=="string"?W.replace(/^LY-/,""):"";return D?'<p class="mp-shortid" title="同一组参数、同一版本算出来是同一个编号；回看或反馈时报它就行">盘号 '+ee(D)+"</p>":""}window.__MPCompose={DEV_SECTIONS:o,USER_SEGS:A,TIER:Y,TIER_SKIP:me,tierOf:Q,devOn:ve,setDev:ke,bindDevSwitch:Te,composeResult:G,shortIdHTML:we,esc:ee}})();function Oi(s,o){return window.__MPCompose&&window.__MPCompose.composeResult?window.__MPCompose.composeResult(s,{system:o}):Object.keys(s).map(A=>s[A]).filter(Boolean).join("")}const Mt=new Set;function Di(){return!!(window.__MPCompose&&window.__MPCompose.devOn&&window.__MPCompose.devOn())}const Rn="dsh-metaphysics/history-v1";function Ri(){try{const s=window.localStorage&&window.localStorage.getItem(Rn),o=s?JSON.parse(s):[];return Array.isArray(o)?o.filter(A=>A&&typeof A=="object"&&typeof A.kind=="string").slice(0,20):[]}catch{return[]}}function Fn(s){try{window.localStorage&&window.localStorage.setItem(Rn,JSON.stringify(s.slice(0,20)))}catch{}}const Fi=(s,o)=>s.kind===o.kind&&s.date===o.date&&s.time===o.time&&s.gender===o.gender&&!!s.hourUnknown==!!o.hourUnknown&&s.trueSolar!==!1==(o.trueSolar!==!1)&&s.lateZi!==!1==(o.lateZi!==!1)&&s.address===o.address&&s.lines===o.lines&&s.question===o.question&&s.mhMode===o.mhMode&&s.upper===o.upper&&s.lower===o.lower&&s.direction===o.direction&&s.spread===o.spread&&s.changing===o.changing&&(s.kind!=="qimen"||s.qimenRule===o.qimenRule&&s.qLateZi===o.qLateZi)&&(s.kind!=="zeri"||s.task===o.task&&s.days===o.days&&s.shengXiao===o.shengXiao&&s.zCand===o.zCand)&&(s.kind!=="xiaoliuren"||s.xlrMode===o.xlrMode&&s.num1===o.num1&&s.num2===o.num2&&s.num3===o.num3)&&(s.kind!=="trend"||s.toAge===o.toAge)&&(s.kind!=="fengshui"||s.fsMode===o.fsMode&&s.fsPeriod===o.fsPeriod&&s.sitting===o.sitting&&s.facing===o.facing)&&(s.kind!=="name"||s.nnMode===o.nnMode&&s.surname===o.surname&&s.givenName===o.givenName&&s.limitN===o.limitN)&&(s.kind!=="convert"||s.convMode===o.convMode&&s.lunarDate===o.lunarDate&&!!s.leapMonth==!!o.leapMonth)&&(s.kind!=="hepan"||s.hpChart===o.hpChart&&s.partnerDate===o.partnerDate&&s.partnerTime===o.partnerTime&&s.partnerGender===o.partnerGender&&s.partnerAddress===o.partnerAddress&&!!s.thirdOn==!!o.thirdOn&&s.p2Date===o.p2Date&&s.p2Time===o.p2Time&&s.p2Gender===o.p2Gender&&s.p2Address===o.p2Address);function Ii(s,o){if(s==="bazi"){const Y=["year","month","day","hour"].map(me=>o.pillars&&o.pillars[me]).filter(Boolean).map(me=>me.ganzhi).join(" ");return o.hourUnknown||o.pillars&&!o.pillars.hour?`${Y}（时柱暂缺）`:Y}return s==="ziwei"?`${o.soul?o.soul.branch:""}宫 ${o.bureau?o.bureau.name:""} ${o.lunar?o.lunar.year+"年":""}`.trim():s==="liuyao"?o.ben&&o.ben.name?o.ben.name:"":s==="meihua"?o.ben&&o.ben.name?`${o.ben.name} 动${o.moving}`:"":s==="daliuren"?`${o.dayGanZhi||""} ${o.geJu?o.geJu.name:""}`:""}const H=window.__PP,Va=()=>typeof performance<"u"&&performance.now?performance.now():Date.now();let Be=0;const xt=typeof window.__mpEnsureEngine=="function"?window.__mpEnsureEngine:async()=>window.Engine,Bi=`
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
/* 触屏点完按钮会保留 :hover，浅色底一旦盖住选中态的实心品牌底，白字就落在白底上 = 整块空白卡。
   所以 hover 只作用于未选中的；选中态另外钉一遍，避免以后规则顺序一变又复活。 */
.mp-tool:not(.on):hover{border-color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-layer-1)}
.mp-tool.on:hover{background:var(--dsw-alias-brand-primary);border-color:transparent}
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
.mp-tab:not(.on):hover{background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-border-l1);color:var(--dsw-alias-label-primary)}
.mp-tab.on:hover{background:var(--dsw-alias-brand-primary);border-color:transparent;color:var(--mp-on-brand,#fff)}
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
.mp-castchip:not(.on):hover{background:var(--dsw-alias-bg-layer-2);border-color:color-mix(in srgb,var(--dsw-alias-border-l1) 45%,var(--dsw-alias-brand-primary))}
.mp-castchip.on:hover{background:var(--dsw-alias-brand-primary);border-color:transparent;color:var(--mp-on-brand,#fff)}
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
`,{useState:j,useEffect:oa,useRef:In}=bt;function oo(s){return window.__PP.isoDateOk(s)}function Gi(s){return window.__PP.normalizeDateText(s)}function Ui(s){return window.__PP.maskDateText(s)}function ln(s){const o=s.value||"",[A,Y]=j(o),me=In(o);oa(()=>{me.current=o,Y(o)},[o]);const Q=()=>{const te=A.trim();if(!te){Y(me.current),s.onInvalid&&s.onInvalid("");return}const ee=Gi(te);if(ee){me.current=ee,Y(ee),ee!==o&&s.onChange(ee);return}Y(me.current),s.onInvalid&&s.onInvalid(te)};return d("input",{className:"mp-input",type:"text",inputMode:"numeric",autoComplete:"off",placeholder:"年-月-日，如 1990-05-12",value:A,onChange:te=>{Y(Ui(te.target.value))},onBlur:Q,onKeyDown:te=>{te.key==="Enter"&&(te.preventDefault(),Q())}})}const Nt=4,ha=12,At=5,ba=27,dn=45;let Ct=null;function Lt(){if(Ct)return Ct;let s=null;try{s=V.compute({system:"mbti"})}catch{s=null}const o=s&&s.questions||[];return o.length?(Ct={total:s&&s.total||o.length,questions:o,scale:s&&s.scale||{}},Ct):{total:0,questions:[],scale:{}}}function Zi(s){const{answers:o,page:A,onPick:Y,onPage:me,onSubmit:Q,onClear:te}=s,ee=Lt(),ve=Math.max(1,Math.ceil(ee.total/Nt)),ke=A*Nt,Te=ee.questions.slice(ke,ke+Nt),G=o.filter(F=>F!=null).length,we=ee.total?Math.round(G/ee.total*100):0,W=A>=ve-1,D=G>=ha;return d("div",{className:"mp-quiz"},d("div",{className:"mp-quiz-top"},d("div",{className:"mp-quiz-bar","aria-hidden":"true"},d("i",{style:{width:we+"%"}})),d("span",{className:"mp-quiz-count"},`第 ${A+1} / ${ve} 页 · 已答 ${G} / ${ee.total}`)),d("div",{className:"mp-quiz-list"},Te.map((F,K)=>{const se=ke+K;return d("div",{key:F.id||se,className:"mp-quiz-q"},d("div",{className:"mp-quiz-qt"},d("b",null,String(se+1).padStart(2,"0")),d("span",null,F.text)),d("div",{className:"mp-quiz-opts",role:"radiogroup","aria-label":`第 ${se+1} 题`},[1,2,3,4,5].map(ze=>d("label",{key:ze,className:"mp-quiz-o"+(o[se]===ze?" on":"")},d("input",{type:"radio",name:`mpmbq${se}`,value:String(ze),checked:o[se]===ze,onChange:()=>Y(se,ze)}),d("b",null,String(ze)),d("span",null,ee.scale[ze]||"")))))})),d("div",{className:"mp-quiz-nav"},d("button",{className:"mp-quiz-btn",disabled:A<=0,onClick:()=>me(-1)},"上一页"),W?null:d("button",{className:"mp-quiz-btn",onClick:()=>me(1)},"下一页"),d("button",{className:"mp-quiz-btn primary",disabled:!D,onClick:Q},"看结果"),d("button",{className:"mp-quiz-btn",onClick:te},"清空"),d("span",{className:"mp-quiz-hint"},D?`已够 ${ha} 题，可以看结果；答完 ${ee.total} 题会更准。`:`答满 ${ha} 题可先看结果（还差 ${ha-G} 题）。`)))}function Ki(s){const{paper:o,answers:A,page:Y,onPick:me,onPage:Q,onSubmit:te,onClear:ee}=s;if(!o||!Array.isArray(o.questions))return d("div",{className:"mp-quiz"},d("div",{className:"mp-quiz-hint"},"正在加载问卷题面…"));const ve=o.questions.length,ke=Math.max(1,Math.ceil(ve/At)),Te=Y*At,G=o.questions.slice(Te,Te+At),we=A.filter(se=>se!=null).length,W=ve?Math.round(we/ve*100):0,D=Y>=ke-1,F=we>=ba,K=se=>{const ze=(o.scale||[]).filter(qe=>qe&&qe.v===se)[0];return ze?ze.label:String(se)};return d("div",{className:"mp-quiz"},d("div",{className:"mp-quiz-top"},d("div",{className:"mp-quiz-bar","aria-hidden":"true"},d("i",{style:{width:W+"%"}})),d("span",{className:"mp-quiz-count"},`第 ${Y+1} / ${ke} 页 · 已答 ${we} / ${ve}`)),d("div",{className:"mp-quiz-list"},G.map((se,ze)=>{const qe=Te+ze;return d("div",{key:se.no||qe,className:"mp-quiz-q"},d("div",{className:"mp-quiz-qt"},d("b",null,String(qe+1).padStart(2,"0")),d("span",null,se.text)),d("div",{className:"mp-quiz-opts",role:"radiogroup","aria-label":`第 ${qe+1} 题`},[1,2,3,4,5].map(Ee=>d("label",{key:Ee,className:"mp-quiz-o"+(A[qe]===Ee?" on":"")},d("input",{type:"radio",name:`mpcsq${qe}`,value:String(Ee),checked:A[qe]===Ee,onChange:()=>me(qe,Ee)}),d("b",null,String(Ee)),d("span",null,K(Ee))))))})),d("div",{className:"mp-quiz-nav"},d("button",{className:"mp-quiz-btn",disabled:Y<=0,onClick:()=>Q(-1)},"上一页"),D?null:d("button",{className:"mp-quiz-btn",onClick:()=>Q(1)},"下一页"),d("button",{className:"mp-quiz-btn primary",disabled:!F,onClick:te},"看结果"),d("button",{className:"mp-quiz-btn",onClick:ee},"清空"),d("span",{className:"mp-quiz-hint"},F?`已够 ${ba} 题，可以看结果；答完 ${ve} 题会更准。`:`答满 ${ba} 题可先看结果（还差 ${ba-we} 题）。`)))}class Yi extends(bt.Component||Object){constructor(o){super(o),this.state={err:null}}static getDerivedStateFromError(o){return{err:o}}componentDidCatch(o,A){console.error("[metaphysics] 面板渲染异常",o,A)}render(){if(!this.state.err)return this.props.children;const o=this.state.err,A=String(o&&o.stack||"").split(`
`).slice(0,14).join(`
`);return d("div",{className:"mp-wrap"},d("div",{className:"mp-panel"},d("div",{className:"mp-lbl"},"命理面板渲染出错——把下面这段发给我"),d("pre",{style:{whiteSpace:"pre-wrap",fontSize:12,lineHeight:1.5,maxHeight:320,overflow:"auto",margin:"8px 0"}},String(o&&o.message||o)+`

`+A),d("div",{className:"mp-lbl"},"环境：__PP "+typeof H+" · Engine "+typeof window.Engine+" · React "+typeof bt+" · 版本 "+(typeof H=="object"&&H&&(window.__MP_VER||"?"))+(window.__MP_UNRELEASED?" · 未发版改动 "+window.__MP_UNRELEASED+" 项":""))))}}function Vi(s){const o=s&&s.size?s.size:20,A=s&&s.active;return d("svg",{width:o,height:o,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.6,strokeLinecap:"round","aria-hidden":!0,style:{opacity:A?1:.72}},d("circle",{cx:12,cy:12,r:8.2}),d("path",{d:"M12 3.8a4.1 4.1 0 0 1 0 8.2 4.1 4.1 0 0 0 0 8.2"}),d("circle",{cx:12,cy:8,r:1.1,fill:"currentColor",stroke:"none"}),d("circle",{cx:12,cy:16,r:1.1,fill:"currentColor",stroke:"none"}))}const ea=[{k:"ziwei",label:"紫微",timeLabel:"出生时刻",hint:"紫微斗数需要出生日期、时刻与性别；出生地只影响真太阳时修正。"},{k:"bazi",label:"八字",timeLabel:"出生时刻",hint:"四柱八字按节气与真太阳时定时柱，出生地越准，时柱越稳。"},{k:"liuyao",label:"六爻",timeLabel:"起卦时刻",hint:"六爻不需要出生时间：只用起卦当下的日辰定六神、月建定旺衰，卦由摇出。"},{k:"meihua",label:"梅花",timeLabel:"起卦时刻",hint:"梅花用起卦时刻的年月日时数成卦，也可直接给两个数字起卦；与出生时间无关。"},{k:"daliuren",label:"六壬",timeLabel:"起卦时刻",hint:"大六壬用起卦时刻的日干支、时支与月将起天地盘；同样与出生时间无关。"},{k:"qimen",label:"奇门",timeLabel:"起局时刻",hint:"奇门时家转盘：用起局时刻定节气、三元与局数；换局规则决定符头与节气如何对齐。"},{k:"hepan",label:"合盘",timeLabel:"你的出生时刻",hint:"合盘按「日主 + 夫妻宫 + 五行互补」看两个人的相处与互补，需要双方出生信息。"},{k:"tarot",label:"塔罗",timeLabel:"",hint:"塔罗不看时间，只记录抽牌时刻与你的提问。"},{k:"qian",label:"福签",timeLabel:"",hint:"每日福签按公历日期抽一支，同一天结果一致、不设重摇；签文为插件原创。"},{k:"guanyin",label:"灵签",timeLabel:"",hint:"观音灵签一百支，一事一签、可重摇；签诗按民间通行本录入，白话签意与建议为插件自撰。"},{k:"almanac",label:"黄历",timeLabel:"",hint:"黄历按公历日期查农历、干支、宜忌、时辰吉凶、二十八宿与吉神方位；只做本地计算。"},{k:"convert",label:"农历",timeLabel:"",hint:"公农历互转：公历生日可反查农历；只知道农历生日时，可转成公历再排盘。"},{k:"zeri",label:"择日",timeLabel:"",hint:"择日把区间内每天的建除宜忌与事项适配打分排序，并按属相排除冲煞日。"},{k:"xiaoliuren",label:"小六壬",timeLabel:"起课时刻",hint:"小六壬用农历月/日/时掐指，也可用三个随机数起课。"},{k:"star",label:"星座",timeLabel:"",hint:"星座按公历日期给出太阳星座与当日基调；同日同星座结果固定。"},{k:"numerology",label:"生命数字",timeLabel:"",hint:"生命数字按公历生日归约出生命路径数、生日数与态度数。"},{k:"mbti",label:"人格",timeLabel:"",hint:"十六型人格是 24 道自我报告题的 MBTI 风格测算：4 题一页，按 1–5 打分，答满 12 题即可看结果；只作自我参照，不是官方量表。"},{k:"constitution",label:"体质",timeLabel:"",hint:"中医体质是九种体质各 5 题的自评问卷（共 45 题，1 没有 / 5 总是），按转化分判主次体质并给调养方向；不是医学诊断。"},{k:"wuyunliuqi",label:"运气",timeLabel:"",hint:"五运六气按大寒分年：中运、司天在泉、六步。"},{k:"taiyi",label:"太乙",timeLabel:"",hint:"太乙神数按积年推局：太乙落宫、八门、文昌、计神、始击、主客算与四将。"},{k:"trend",label:"人生K线",timeLabel:"出生时刻",hint:"人生 K 线按大运与流年十神给逐年运势分，画成走势图。"},{k:"fengshui",label:"风水",timeLabel:"",hint:"风水看八宅命卦、大游年四吉四凶与流年九宫飞星；也可按坐向看门主灶倾向，或按运与坐向排玄空下卦盘。"},{k:"name",label:"起名",timeLabel:"",hint:"起名按八字喜用匹配字库五行，可评估现有名字或生成候选名。"}];function ro(s){return String(s).padStart(2,"0")}const cn=["almanac","convert","zeri","xiaoliuren","qian","star","numerology","trend","fengshui","name","constitution","wuyunliuqi","taiyi"],Bn=[{sys:"liuyao",label:"六爻",tip:"摇一卦：只用起卦当下定六神旺衰，所问之事写下面（必填）"},{sys:"meihua",label:"梅花",tip:"梅花易数：按起卦时刻的年月日时成卦，也可改成两个数字起卦"},{sys:"daliuren",label:"六壬",tip:"大六壬：按起卦时刻的日干支、时支与月将起天地盘"},{sys:"qimen",label:"奇门",tip:"奇门遁甲：时家转盘，默认拆补取局，可换超神接气/置闰"},{sys:"tarot",label:"塔罗",tip:"塔罗：不看时间，点一下就抽牌；牌阵在下面选"},{sys:"xiaoliuren",label:"小六壬",tip:"小六壬：按起课时刻推算，也可切报数起课"}],Gn="mp.cast.open",Xi=Array.isArray(window.__MPGroups)?window.__MPGroups:[],Un="mp.recent.tabs",Zn="mp.first.view",Kn=3;function Tt(s){return window.__PP.storeGet(s)}function Et(s,o){window.__PP.storeSet(s,o)}const Yn="mp.panel.result.v1",Ji=1,Qi=6,Vn=5e5,Wi=16e5,mn={computeHits:0,cacheHits:0};typeof window<"u"&&(window.__MPStats=mn);function es(s){return window.__PP.hash36(s)}function Xn(){const s=Tt(Yn);return s&&typeof s=="object"&&!Array.isArray(s)?s:{}}function as(s){if(!s)return null;const o=Xn()[s];return o&&o.result&&o.result.r?o:null}function ts(s,o){if(!(!s||!o))try{if(JSON.stringify(o).length>Vn)return;const A=Xn();A[s]=o;const Y=te=>{try{return JSON.stringify(te).length}catch{return Vn}},me=Object.keys(A).sort((te,ee)=>(A[te].at||0)-(A[ee].at||0));let Q=me.reduce((te,ee)=>te+Y(A[ee]),0);for(;me.length&&(me.length>Qi||Q>Wi);){const te=me.shift();Q-=Y(A[te]),delete A[te]}Et(Yn,A)}catch{}}function ns(s){return window.__PP.dayLabel(s)}function un(){return window.__PP.nowParts()}const is={ziwei:"birth",bazi:"birth",hepan:"birth",liuyao:"cast",meihua:"cast",daliuren:"cast",qimen:"cast",tarot:"none",almanac:"date",zeri:"date",star:"date",numerology:"date",convert:"date",trend:"birth",fengshui:"birth",name:"birth",xiaoliuren:"cast",qian:"date",guanyin:"none",mbti:"none",constitution:"none",wuyunliuqi:"date",taiyi:"date"},Jn={date:"1990-05-12",time:"14:30"},_t=s=>is[s]||"none",Ke=window.__MPCore||{},ra=Ke.needAsk||(s=>!1),ce={ref:null,seats:[],seatOk:{},seatDisposers:[],contribution:"",keys:"",injectType:"",spec:"",errs:[],regs:0,mounted:0},aa={r:null,q:"",it:null,entry:null};let xa="";function Qn(){const s=[];return s.push("inputActions "+(ce.ref?"已拿到":"未拿到")),s.push("渲染 "+ce.mounted+" 次"),s.push("注册 "+ce.regs+" 次"),s.push("inject "+(ce.injectType||"?")),s.push("槽位 "+(ce.spec||"?")),ce.contribution&&s.push("贡献 "+ce.contribution),ce.errs.length&&s.push("错误："+ce.errs.join(" / ")),"桥自检："+s.join("；")}function Wn(s){if(ce.errs.length>=3)return;const o=s&&s.message?String(s.message):String(s);ce.errs.push(o.slice(0,90))}function ss(s){if(!s)return null;const o=s.inputActions;if(o&&typeof o.setDraft=="function"&&typeof o.submit=="function")return o;const A=s.actions&&s.actions.input;return A&&typeof A.setDraft=="function"&&typeof A.submit=="function"?A:null}function ei(s,o){const A=ss(s);return oa(()=>{if(ce.seats.indexOf(o)<0&&ce.seats.push(o),ce.keys=s?Object.keys(s).join(","):"",A){ce.ref=A;try{window.__MPComposer=A}catch{}}return()=>{ce.ref===A&&(ce.ref=null)}},[A,o]),A}function os(){const s=aa.r;if(!s)return"";try{const o=V.askPrompt?V.askPrompt(s,{question:aa.q,interpret:aa.it}):null;return o&&o.text||String(s.summary||"")}catch{return String(s.summary||"")}}function ai(s){return ce.mounted+=1,ei(s,"input.right")?d("button",{type:"button",className:"mp-chip ok",title:aa.r?"把上一张盘的摘要和问题发进对话窗":"先在侧栏「烛微命盘」里排一张盘",onClick:()=>{const A=os();A&&ni(A)}},"命理·问"):d("span",{className:"mp-chip warn",title:"命理：已占住输入框槽位，但没拿到 inputActions；把这句话告诉作者"},"命理·未就绪")}function ti(s){return ce.mounted+=1,ei(s,"composer.dock"),null}function ni(s){let o=ce.ref;if(!o)try{o=window.__MPComposer||null}catch{o=null}return!o||typeof o.setDraft!="function"||typeof o.submit!="function"?!1:(o.setDraft(s),o.submit(),!0)}function rs(s){const o=s.kind==="ziwei"?H.ziweiHTML(s.r):s.kind==="bazi"?H.baziHTML(s.r,{chenggu:s.chenggu,marriage:s.marriage,life:s.life})+(s.trend?H.trendHTML(s.trend,{brief:!1}):""):s.kind==="meihua"?H.meihuaHTML(s.r):s.kind==="daliuren"?H.daliurenHTML(s.r):s.kind==="qimen"?H.qimenHTML(s.r)+H.qimenFactsHTML(s.r):s.kind==="hepan"?s.r.chart==="ziwei"?H.ziweiHepanHTML(s.r):H.hepanHTML(s.r):s.kind==="tarot"?H.tarotHTML(s.r):s.kind==="qian"?H.qianHTML(s.r):s.kind==="guanyin"?H.guanyinHTML(s.r):s.kind==="liuyao"?H.liuyaoHTML(s.r):s.kind==="almanac"?H.almanacHTML(s.r):s.kind==="zeri"?H.zeriHTML(s.r):s.kind==="trend"?H.trendHTML(s.r):s.kind==="name"?H.nameHTML(s.r):s.kind==="mbti"?H.mbtiHTML(s.r):s.kind==="constitution"?H.constitutionHTML(s.r):s.kind==="wuyunliuqi"?H.wuyunliuqiHTML(s.r):s.kind==="taiyi"?H.taiyiHTML(s.r):s.kind==="fengshui"?H.fengshuiHTML(s.r):H.quickHTML(s.r),A=o.startsWith('<section class="mp-br"')?o.indexOf("</section>"):-1,Y=A<0?o:o.slice(A+10),me=A<0?"":o.slice(0,A+10);return Y+H.plainHTML(s.r)+me}function ps(s){const o=!!s.open,A=d("button",{type:"button",className:"mp-castrow-h","aria-expanded":o?"true":"false","aria-controls":"mp-castlist",onClick:s.onToggle,title:"展开六个占卜体系的起卦入口：点一个就切过去，并用当前时刻起卦"},d("span",{className:"mp-castrow-t"},"起卦"),d("span",{className:"mp-castrow-l"},o?"六个占卜体系，点一下就起":Bn.map(Y=>Y.label).join(" · ")),d("i",{className:"mp-castrow-i","aria-hidden":"true"},o?"▴":"▾"));return o?d("div",{key:"cast",className:"mp-castrow open"},A,d("div",{key:"list",id:"mp-castlist",className:"mp-castlist"},Bn.map(Y=>d("button",{key:Y.sys,type:"button",className:"mp-castchip"+(s.tab===Y.sys?" on":""),"data-cast":Y.sys,"aria-pressed":s.tab===Y.sys?"true":"false",title:Y.tip,onClick:()=>s.onCast(Y.sys)},Y.label))),s.hasResult?d("div",{key:"ask",className:"mp-castask"},d("button",{type:"button",className:"mp-castgo",onClick:s.onAsk,title:"把这张盘和所问之事发进 DSH 对话窗（与下面的「问进对话」同一个通路）"},"把这张盘问进对话")):null):d("div",{key:"cast",className:"mp-castrow"},A)}function ls(){const[s,o]=j("ziwei"),[A,Y]=j(!1),me=In(s);oa(()=>{me.current=s},[s]);const[Q,te]=j("1990-05-12"),[ee,ve]=j("14:30"),[ke,Te]=j(!1),[G,we]=j("female"),[W,D]=j(""),[F,K]=j("1992-08-15"),[se,ze]=j("10:00"),[qe,Ee]=j("female"),[va,a]=j(""),[ta,vt]=j("bazi"),[Ye,yt]=j(!1),[Xa,Ht]=j("1990-01-01"),[Je,_e]=j("12:00"),[Se,Pt]=j("male"),[Ta,Ja]=j(""),[Qa,Ot]=j("chaibu"),[Ea,ya]=j(!0),[fn,Wa]=j(()=>{try{return window.localStorage.getItem("dsh-metaphysics/nudge-off")==="1"}catch{return!1}}),[wa,$a]=j(!0),[Dt,Rt]=j("same-day"),[_a,et]=j(!1),[pa,Ft]=j(""),[Ha,Ve]=j(""),[It,Pa]=j(null),[,hn]=j(0);oa(()=>{const t=f=>{if(!f.ctrlKey||!f.shiftKey||String(f.key||"").toLowerCase()!=="d")return;const $=window.__MPCompose;!$||!$.setDev||!$.devOn||(f.preventDefault(),$.setDev(!$.devOn()),hn(S=>S+1))};return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)},[]);const[at,tt]=j({}),[Oa,wt]=j(null),[nt,$t]=j([{year:"2019",kind:"career"},{year:"2022",kind:"love"}]),[la,it]=j(null),[kt,st]=j("开业"),[da,ot]=j("30"),[ka,Bt]=j(""),[ca,Gt]=j(""),[$e,za]=j("solar2lunar"),[Da,qa]=j(""),[rt,Ut]=j(!1),[Ge,Ra]=j("time"),[ja,pt]=j(""),[Fa,Zt]=j(""),[Qe,Sa]=j(""),[na,Kt]=j(()=>new Array(Lt().total).fill(null)),[bn,Yt]=j(0),[Ia,xn]=j(null),[lt,Vt]=j(()=>new Array(dn).fill(null)),[vn,Xt]=j(0),[Ba,zt]=j("60"),[Re,dt]=j("natal"),[Fe,Ga]=j("9"),[Ma,ct]=j("子"),[Ua,Jt]=j("午"),[Ue,qt]=j("assess"),[mt,Qt]=j("李"),[e,n]=j(""),[i,p]=j("6"),[r,c]=j(!1),[u,m]=j(""),[l,g]=j(null),[w,b]=j(!1),[k,L]=j(""),[C,E]=j(""),[le,B]=j(null);oa(()=>{const t=document.querySelector(".mp-panel");if(!t)return;const f=!!l&&!w&&s!=="guanyin";t.classList.toggle("mp-locked",f),H&&H.lockParams&&H.lockParams(t,f)},[l,w,s]);const[O,ne]=j(()=>Ri()),[Z,T]=j(()=>Tt(Zn)==="flat"?"flat":"group"),[oe,X]=j(()=>{const t=Tt(Un);return Array.isArray(t)?t:[]}),[Ae,je]=j({}),[U,be]=j(null),[ie,y]=j(()=>H.profilesLoad()),[z,q]=j(null),[fe,v]=j(""),[J,pe]=j(""),[N,I]=j(""),[ae,re]=j(!1),[xe,Me]=j("three"),[P,Le]=j(""),[Ne,Ze]=j("general");function ma(){return pa.trim()||(l&&(ra(l.kind)||l.kind==="guanyin")?String(P||"").trim():"")}oa(()=>{l&&l.r&&(aa.r=l.r,aa.q=ma(),aa.it=l.it||null);const t=l&&l.it;t&&t.error&&!Mt.has(t.errorId||t.error)&&(Mt.size>40&&Mt.clear(),Mt.add(t.errorId||t.error),console.warn("[metaphysics] 解读未生成 "+(t.errorId||""),t.error))},[l,pa,P]);const[ua,Za]=j(null),[Ka,yn]=j(Tt(Gn)===!0),[h,_]=j(!1),[de,he]=j("time"),[He,Pe]=j(""),[Oe,Wt]=j(""),[Na,en]=j(""),[us,Aa]=j(""),[wn,an]=j({birth:null,cast:null}),gs=ea.find(t=>t.k===s)||ea[0],jt=s==="bazi"||s==="ziwei"||s==="hepan"||s==="trend"||s==="fengshui"||s==="name",We=_t(s),si=!(s==="meihua"&&de==="number"),oi=s!=="tarot"&&s!=="mbti"&&s!=="constitution"&&s!=="guanyin"&&si,ri=oi&&We!=="date",po=ri,De=async(t,f,$,S)=>{const x=t||s,ue=$||de,ye=x==="bazi"||x==="trend",Ie=S&&typeof S.hourUnknown=="boolean"?S.hourUnknown:ke,Ce=f||(ye&&Ie?{date:Q,time:"12:00"}:{date:Q,time:ee}),ia=S&&S.gender?S.gender:G,ga=S&&typeof S.address=="string"?S.address:W,sa=S&&typeof S.trueSolar=="boolean"?S.trueSolar:Ea,gt=S&&typeof S.lateZi=="boolean"?S.lateZi:wa,qi=S&&typeof S.lines=="string"?S.lines:u,ft=S&&typeof S.question=="string"?S.question:P,jn=Va(),ji=++Be,Ya=()=>ji!==Be;B(null),I("");try{let Ca=0,Si=null;re(!0);try{await xt(x);const R=window.__MP_LAST_LOAD;Ca=R&&typeof R.ms=="number"?R.ms:Va()-jn,Si=R&&typeof R.cached=="boolean"?R.cached:null}catch(R){if(Ya())return;pe(R&&R.message?R.message:String(R)),g(null);return}finally{Ya()||re(!1)}if(Ya())return;const Mi=`${Ce.date}T${Ce.time}`,M={system:x};if(M.shadow=x!=="mbti"&&x!=="constitution"&&x!=="guanyin",M.trace=x==="liuyao"||x==="bazi"||x==="ziwei"||x==="qimen"||x==="daliuren",x!=="tarot"&&x!=="guanyin"&&(M.datetime=Mi),x==="bazi"||x==="ziwei"||x==="hepan"||x==="trend"){if(M.gender=ia,M.trueSolar=sa,ga.trim()){M.address=ga.trim();try{const R=await V.geocodeAddress(M.address,{online:r});R&&typeof R.lon=="number"&&(M.longitude=R.lon,M.geo=R)}catch(R){console.error("[metaphysics] 地址解析失败，退回内置表",R)}if(Ya())return}(x==="bazi"||x==="ziwei")&&(M.cross=_a),M.lateZi=gt,ye&&Ie&&(M.hourUnknown=!0)}if(x==="liuyao"){const R=Ke.parseLines(qi);R.lines?M.lines=R.lines:R.warning&&I(R.warning)}if(x==="qimen"&&(M.juMethod=Qa,M.lateZiHourMode=Dt,M.direction=Ne),x==="bazi"&&(M.verifyPast=6),x==="zeri"){M.startDate=Ce.date,M.task=kt,M.days=Number(da)||30,ka&&(M.shengXiao=ka);const R=ca.split(/[,，、\s]+/).filter(Boolean);R.length&&(M.candidates=R)}if(x==="xiaoliuren")if(M.mode=Ge,Ge==="number"){const R=[ja,Fa,Qe].map(fa=>String(fa??"").trim());if(R.some(fa=>fa===""||!Number.isFinite(Number(fa)))){pe("报数起课要三个数，1 到 99 随口报就行，比如 7、13、29。"),g(null);return}M.num1=Number(R[0]),M.num2=Number(R[1]),M.num3=Number(R[2])}else{M.date=Ce.date;const R=Number(String(Ce.time).split(":")[0]);M.hour=Number.isFinite(R)?R:12}if(x==="mbti"){delete M.datetime;const R=na.slice();for(;R.length&&R[R.length-1]==null;)R.pop();R.length&&(M.answers=R)}if(x==="constitution"&&(delete M.datetime,M.answers=lt.slice()),x==="trend"&&ye&&Ie&&(M.hourUnknown=!0),x==="trend"&&(M.toAge=Number(Ba)||60),x==="fengshui"&&(M.action=Re,Re==="natal"?M.gender=ia:(M.sitting=Ma,M.facing=Ua,delete M.datetime,Re==="xuankong"&&(M.period=Number(Fe)||9))),x==="name"){if(M.action=Ue,M.surname=mt.trim(),!M.surname||Ue==="assess"&&!e.trim()){pe(Ue==="assess"?"起名要先填姓和名，一个字也行。":"起名要先填姓。"),g(null);return}Ue==="generate"?(M.gender=ia,M.limit=Number(i)||6,M.trueSolar=sa,M.lateZi=gt):(M.givenName=e.trim(),(!Ce.date||!Ce.time)&&delete M.datetime)}if(x==="convert")if(M.system="convert",$e==="lunar2solar"){const R=/^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(Da).trim());if(!R){pe("农历日期要按「年-月-日」填，例如 2026-9-17；闰月单独勾选。"),g(null);return}M.mode="lunar2solar",M.lunarYear=Number(R[1]),M.lunarMonth=Number(R[2]),M.lunarDay=Number(R[3]),M.isLeapMonth=rt,delete M.datetime}else M.mode="solar2lunar";if(x==="tarot"&&(M.spread=xe),x==="guanyin"){const R=S&&S.draw;R?(R.seed!==void 0&&(M.seed=R.seed),R.except!==void 0&&(M.except=R.except),R.no!==void 0&&(M.no=R.no)):(M.seed=Date.now()+Math.random(),l&&l.kind==="guanyin"&&l.r&&l.r.slip&&(M.except=l.r.slip.no)),ft.trim()&&(M.question=ft.trim())}if(x==="hepan"&&(M.chart=ta,M.partner={datetime:`${F}T${se}`,gender:qe,address:va.trim()||void 0,trueSolar:sa},Ye&&(M.partner2={datetime:`${Xa}T${Je}`,gender:Se,address:Ta.trim()||void 0,trueSolar:sa})),ra(x)){if(!ft.trim()){pe("请先填写「所问之事」——一句话即可，例如：今年是否适合换工作？"),_(!0),g(null);return}_(!1),M.question=ft.trim(),x==="liuyao"&&(M.direction=Ne)}if(x==="meihua"&&(M.mode=ue,ue==="number")){if(He.trim()===""||Oe.trim()===""){pe("数字起卦需要填两个数（第一个数定上卦、第二个数定下卦）。"),g(null);return}if(M.upper=Number(He),M.lower=Number(Oe),!Number.isFinite(M.upper)||!Number.isFinite(M.lower)){pe("两个数都要是数字，例如 17 和 29。"),g(null);return}Na!==""&&(M.changing=Number(Na))}x==="trend"&&!M.asOf&&Ke.todayStamp&&(M.asOf=Ke.todayStamp());const Ni=es(`${Ji}|${JSON.stringify(M)}`),on=x==="guanyin"?null:as(Ni);if(on&&on.result&&on.result.kind===x){if(Ya())return;mn.cacheHits++,g(on.result),b(!1),B({engineMs:Ca,computeMs:0,cached:!0,totalMs:Va()-jn,renderMs:null}),Pa(null),wt(null),tt({}),it(null),pe(""),Aa("");return}const eo=Va();mn.computeHits++;const La=V.compute(M),ao=Va()-eo;let Sn=null;try{Sn=H.shadowTrack?H.shadowTrack(La):null}catch{Sn=null}let Mn=null;if(x==="bazi"&&!Ie){if(!V.buildChenggu){try{await xt("chenggu")}catch{}if(Ya())return}if(V.buildChenggu)try{Mn=V.buildChenggu({year:Number(Ce.date.slice(0,4)),month:Number(Ce.date.slice(5,7)),day:Number(Ce.date.slice(8,10)),hour:Number(Ce.time.slice(0,2)),minute:Number(Ce.time.slice(3,5)),lateZi:gt})}catch{Mn=null}}let Nn=null;if(x==="bazi"&&V.buildMarriage)try{Nn=V.buildMarriage(La)}catch{Nn=null}let An=null;if(x==="bazi"&&V.buildFacets)try{An=V.buildFacets(La)}catch{An=null}let Cn=null;if(x==="bazi")try{Cn=V.compute({system:"trend",datetime:Mi,gender:ia,toAge:100,trueSolar:sa,lateZi:gt,...Ke.todayStamp?{asOf:M.asOf||Ke.todayStamp()}:{},...M.dst!==void 0?{dst:M.dst}:{},...M.address?{address:M.address}:{},...typeof M.longitude=="number"?{longitude:M.longitude}:{},...M.geo?{geo:M.geo}:{}})}catch{Cn=null}let Ln=null;if(V.caliberCompare)try{Ln=V.caliberCompare(M)}catch{Ln=null}const to=ra(x)||x==="qimen"?{question:ra(x)?ft.trim():"",direction:Ne}:void 0,rn=V.interpret?V.interpret(La,to):null;rn&&La.cross&&V.crossSection&&(rn.sections=[...rn.sections||[],V.crossSection(La.cross)]);const no=_t(x)==="cast"&&(x!=="meihua"||ue==="time"),Ai={kind:x,r:La,it:rn,at:Ce,timed:no,trend:Cn,caliber:Ln,shadowDiff:Sn,chenggu:Mn,marriage:Nn,life:An,gender:ia,address:ga,trueSolar:sa,lateZi:gt};g(Ai),b(!1),x!=="guanyin"&&ts(Ni,{result:Ai,at:Date.now()});const Ci=R=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>R>1?Ci(R-1):Li()):setTimeout(Li,0)},Li=()=>{ji===Be&&B({engineMs:Ca,computeMs:ao,cached:Si,totalMs:Va()-jn,renderMs:null})};if(Ci(2),Pa(null),wt(null),tt({}),it(null),pe(""),Aa(""),x!=="tarot"&&x!=="guanyin"&&x!=="mbti"&&x!=="constitution"){const R=!!(ye&&Ie),fa={kind:x,date:Ce.date,time:R?"":Ce.time,hourUnknown:R,gender:ia,address:ga,trueSolar:sa,lateZi:gt,lines:x==="liuyao"?qi:"",question:ra(x)?ft.trim():"",direction:Ne,spread:xe,mhMode:ue,upper:He,lower:Oe,changing:Na,...x==="qimen"?{qimenRule:Qa,qLateZi:Dt}:{},...x==="zeri"?{task:kt,days:da,shengXiao:ka,zCand:ca}:{},...x==="xiaoliuren"?{xlrMode:Ge,num1:ja,num2:Fa,num3:Qe}:{},...x==="trend"?{toAge:Ba}:{},...x==="fengshui"?{fsMode:Re,fsPeriod:Fe,sitting:Ma,facing:Ua}:{},...x==="name"?{nnMode:Ue,surname:mt,givenName:e,limitN:i}:{},...x==="convert"?{convMode:$e,lunarDate:Da,leapMonth:rt}:{},...x==="hepan"?{hpChart:ta,partnerDate:F,partnerTime:se,partnerGender:qe,partnerAddress:va,thirdOn:Ye,p2Date:Xa,p2Time:Je,p2Gender:Se,p2Address:Ta}:{},label:Ii(x,La),at:Date.now()};ne(io=>{const Ti=[fa,...io.filter(so=>!Fi(so,fa))].slice(0,20);return Fn(Ti),Ti}),x!=="tarot"&&x!=="guanyin"&&x!=="mbti"&&x!=="constitution"&&(aa.entry=fa),wi(!1)}}catch(Ca){if(Ya())return;pe(Ca&&Ca.message?Ca.message:String(Ca)),g(null)}},fs=async t=>{const f=_t(t),$=++Be;if(pe(""),t==="mbti"){I(""),re(!0);try{await xt(t)}catch(x){$===Be&&pe(x&&x.message?x.message:String(x))}finally{$===Be&&re(!1)}if($!==Be)return;o(t),na.filter(x=>x!=null).length>=ha?De(t):g(null);return}if(t==="constitution"){I(""),re(!0);try{if(await xt(t),$===Be&&!Ia){const x=V.compute({system:"constitution"});x&&x.paper&&xn(x)}}catch(x){$===Be&&pe(x&&x.message?x.message:String(x))}finally{$===Be&&re(!1)}if($!==Be)return;o(t),lt.filter(x=>x!=null).length>=ba?De(t):g(null);return}if(o(t),t==="guanyin"){g(null);return}if(f==="none"){De(t);return}const S=wn[f]||(f==="cast"||f==="date"?un():{date:Jn.date,time:Jn.time});te(S.date),ve(S.time),De(t,S)},hs=t=>{ea.some(f=>f.k===t)&&X(f=>{const $=(f||[]).filter(x=>x&&x.tab&&x.tab!==t),S=[{tab:t,at:Date.now()}].concat($).slice(0,Kn);return Et(Un,S),S})},pi=t=>{const f=t==="flat"?"flat":"group";T(f),Et(Zn,f)},tn=t=>{hs(t),fs(t)},bs=()=>{const t=!Ka;yn(t),Et(Gn,t)},xs=t=>{tn(t)},vs=t=>{te(t),We!=="none"&&an(f=>Object.assign({},f,{[We]:{date:t,time:ee}}))},ys=t=>{ve(t),We!=="none"&&an(f=>Object.assign({},f,{[We]:{date:Q,time:t}}))},lo=()=>{const t=un();te(t.date),ve(t.time),We!=="none"&&an(f=>Object.assign({},f,{[We]:null})),De(s,t)},ut=()=>{if(s==="mbti"){const t=na.filter(f=>f!=null).length;if(t<ha){I(`先答满 ${ha} 题再看结果（现答 ${t} 题，还差 ${ha-t} 题）。`);return}De(s);return}if(s==="constitution"){const t=lt.filter(f=>f!=null).length;if(t<ba){I(`先答满 ${ba} 题再看结果（现答 ${t} 题，还差 ${ba-t} 题）。`);return}De(s);return}if(We==="cast"&&!wn[We]){const t=un();te(t.date),ve(t.time),De(s,t);return}De(s)},li=()=>{if(A)return;if(!!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion:reduce)").matches)){ut();return}Y(!0),window.setTimeout(()=>{Y(!1),(me.current==="qian"||me.current==="guanyin")&&ut()},1050)},ws=()=>{const t={date:"1990-05-12",time:"14:30"};o("bazi"),we("male"),D("河北石家庄"),an(f=>Object.assign({},f,{birth:t})),te(t.date),ve(t.time),De("bazi",t,null,{gender:"male",address:"河北石家庄"})},di=t=>{he(t),De(s,{date:Q,time:ee},t)},$s=()=>!!(window.matchMedia&&window.matchMedia("(max-width: 640px)").matches),$n=()=>ua===null?$s():ua,nn=(t,f,$)=>{if(!f)return;const S=ue=>{t.textContent=ue?"已复制":"复制失败",setTimeout(()=>{t.textContent=$},1400)},x=()=>{try{const ue=document.createElement("textarea");ue.value=f,ue.setAttribute("readonly",""),ue.style.position="fixed",ue.style.opacity="0",document.body.appendChild(ue),ue.select();const ye=!!(document.execCommand&&document.execCommand("copy"));return document.body.removeChild(ue),ye}catch{return!1}};try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(f).then(()=>S(!0),()=>S(x()));return}}catch{}S(x())},ks=t=>nn(t,t.getAttribute("data-shadow-copy")||"","复制 ID"),zs=t=>nn(t,t.getAttribute("data-handle-copy")||"","复制句柄"),qs=t=>{const f=t.closest(".mp-trace-layer")||document.getElementById("mp-trace-layer"),$=f&&f.querySelector("[data-trace-md]");nn(t,$?$.value:"","复制 Markdown")},js=()=>{try{return String(location.href).split("#")[0]}catch{return""}},Ss=()=>{if(!l||!l.r)return null;try{return V.askPackages?V.askPackages(l.r,{question:ma(),interpret:l.it,base:js()}):null}catch{return null}},ci=[["full","复制提问","完整提问：盘面摘要 + 阅读层次 + 回答骨架，粘进任何对话窗都能用"],["brief","复制精简","一句话版：体系 + 盘号 + 你的问题，够助手认出是哪张盘"],["structured","复制参数","结构化参数（JSON）：助手可直接照 args 调 compute，不必解析自然语言"],["link","复制深链","深链：把这张盘的参数编进链接，打开即还原同一张盘（换台机器、发给朋友都行）"]],Ms=(t,f)=>{const $=Ss();if(!$){Ve("还没有可以复制的盘：先排一张。");return}const S=t==="link"?$.link:$[t];if(!S){Ve(t==="link"?"这张盘没拿到盘号（随机抽牌只复现参数、不复现牌面），深链做不出来；用「复制提问」那一档。":"这一档暂时是空的，换一档试试。");return}nn(f,S,ci.find(x=>x[0]===t)[1]),t==="link"&&Ve("深链已复制：打开就还原这张盘，也可以直接发给别人。链接里是编码不是加密，别公开贴。")},Ns=()=>{const t=document.getElementById("mp-trace-layer");if(!t)return;t.classList.add("open"),t.setAttribute("aria-hidden","false");const f=t.querySelector("[data-trace-close]");f&&f.focus&&f.focus()},mi=()=>{const t=document.getElementById("mp-trace-layer");if(!t)return;t.classList.remove("open"),t.setAttribute("aria-hidden","true");const f=document.querySelector("[data-trace-open]");f&&f.focus&&f.focus()},As=t=>{if(t.target&&t.target.closest?t.target.closest("[data-lq-again]"):null){ut();return}const $=t.target&&t.target.closest?t.target.closest("[data-shadow-copy]"):null;if($){ks($);return}const S=t.target&&t.target.closest?t.target.closest("[data-handle-copy]"):null;if(S){zs(S);return}if(t.target&&t.target.closest?t.target.closest("[data-trace-open]"):null){Ns();return}const ue=t.target&&t.target.closest?t.target.closest("[data-trace-copy]"):null;if(ue){qs(ue);return}if(t.target&&t.target.closest?t.target.closest("[data-mp-askcopy]"):null){Ts();return}if(t.target&&t.target.closest?t.target.closest("[data-trace-close]"):null){mi();return}const Ce=t.target&&t.target.closest?t.target.closest(".mp-it-head"):null;if(!Ce)return;const ia=Ce.closest(".mp-it");if(!ia)return;const ga=!ia.classList.contains("folded");ia.classList.toggle("folded",ga),Ce.setAttribute("aria-expanded",ga?"false":"true");const sa=Ce.querySelector(".mp-it-hint");sa&&(sa.textContent=ga?"点击展开":"点击收起"),Za(ga)},ui=(t,f)=>{if(!l||!(ra(s)||s==="qimen"))return;const $={question:ra(s)?(f===void 0?P:f).trim():"",direction:t===void 0?Ne:t},S=V.interpret?V.interpret(l.r,$):null;let x=l.r;if((s==="liuyao"||s==="qimen")&&x&&x.trace&&V.buildTrace)try{const ue=s==="liuyao"?V.buildTrace(x,{direction:$.direction,gender:x.useGod&&x.useGod.gender||"male",refresh:!0}):V.buildTrace(x,{direction:$.direction});ue&&(x=Object.assign({},x,{trace:ue}))}catch{}g(Object.assign({},l,{r:x,it:S}))},Cs=t=>{if(!t||!t.timed||!t.at)return"";const f=/^\d{4}-\d{2}-\d{2}$/.test(String(t.at.date))?t.at.date:"",$=/^\d{2}:\d{2}(:\d{2})?$/.test(String(t.at.time))?String(t.at.time).slice(0,5):"";return!f||!$?"":`<div class="mp-cast">起卦时刻：<b>${f} ${$}</b>　（来自你的本机时间，点「此刻」可重新取当下）</div>`},Ls=()=>{try{const t=l&&l.r&&l.r.summary?l.r.summary:"";if(!t)return;navigator.clipboard.writeText(t).then(()=>Aa("已复制"),()=>Aa("复制失败"))}catch{Aa("复制失败")}},Ts=()=>{if(!l||!l.r||!window.Engine||!window.Engine.buildEventPrompt)return;const t=Ke&&Ke.kindOfDirection?Ke.kindOfDirection(Ne):"other";let f;try{f=window.Engine.buildEventPrompt(l.r,{question:(P||"").trim(),kind:t,gender:G,timeKnown:!0})}catch{f=null}f&&f.text&&navigator.clipboard.writeText(f.text).then(()=>Aa("已复制问事提示"),()=>Aa("复制失败"))},gi=()=>{if(!(!l||!l.r||!pa.trim()))try{Pa(V.followup?V.followup(l.r,pa.trim()):null)}catch(t){Pa({question:pa.trim(),ok:!1,answer:"追问失败："+(t&&t.message?t.message:t),evidence:[],confidence:"弱"})}},fi=()=>{if(!(!l||!l.r))try{const t=V.askPrompt?V.askPrompt(l.r,{question:ma(),interpret:l.it}):null,f=t&&t.text?t.text:String(l.r.summary||"");if(ni(f)){Ve("已发到对话窗，往下看回复。");return}const $="（"+Qn()+"）";navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(f).then(()=>Ve("对话输入框还没就绪"+$+"，已复制提问；粘进对话窗回车即可。"),()=>Ve("对话输入框还没就绪"+$+"，复制也没成功；先点「复制文字结果」再贴。")):Ve("对话输入框还没就绪"+$+"；先点「复制文字结果」再贴进对话窗。")}catch(t){Ve("发到对话窗失败："+(t&&t.message?t.message:t))}},Es=()=>{const t=[],f=window.__MP_VER||"未知";t.push("# 命理插件反馈"),t.push(""),t.push("## 我遇到的情况"),t.push(""),t.push("（在这里写一句就好：哪里不对 / 读不懂哪一段 / 算得和别人不一样 / 想加什么。下面这些是自动带的复现信息，不用改。）"),t.push(""),t.push("## 复现信息"),t.push(""),t.push("- 插件版本：v"+f);{const ye=Number(window.__MP_UNRELEASED)||0;ye&&t.push("- 未发版改动："+ye+" 项（版本号未变，说明这份产物比 v"+f+" 新）")}const $=ea.find(ye=>ye.k===s)?.label||s;if(t.push("- 体系："+$+($===s?"":"（"+s+"）")),P&&t.push("- 所问之事："+P),Ne&&Ne!=="general"){const ye=(Array.isArray(V.DIRECTIONS)?V.DIRECTIONS:[]).find(Ie=>Ie.key===Ne);t.push("- 询问方向："+(ye?ye.label:Ne))}t.push(""),t.push("### 输入"),t.push(""),t.push("```");const S=_t(s);s!=="tarot"&&s!=="mbti"&&s!=="constitution"&&!(s==="meihua"&&de==="number")&&(t.push(`日期：${Q}`),S!=="date"&&t.push(`时刻：${ke?"（未知，按三柱排）":ee}`),S==="birth"&&(t.push(`性别：${G==="male"?"男":"女"}`),W&&t.push(`出生地：${W}`),t.push(`真太阳时：${Ea?"开":"关"}　晚子时换日：${wa?"开":"关"}`)),s==="qimen"&&t.push(`奇门取局：${Qa}`),_a&&t.push("交叉验证：开"));const ue={合盘:()=>{t.push(`对方：${F} ${se} ${qe==="male"?"男":"女"}${va?" "+va:""}（${ta} 盘）`),Ye&&t.push(`第三方：${Xa} ${Je} ${Se==="male"?"男":"女"}${Ta?" "+Ta:""}`)},择日:()=>{t.push(`事项：${kt}　起算：${Q}　天数：${da}${ka?"　属相："+ka:""}${ca?"　候选日："+ca:""}`)},起名:()=>{t.push(`姓：${mt||"（未填）"}　名：${e||"（未填）"}　模式：${Ue}${Ue==="generate"?"　候选数："+(i||"默认"):""}`)},公农历:()=>{t.push(`模式：${$e}${Da?"　农历输入："+Da:""}${rt?"（闰月）":""}`)},小六壬:()=>{t.push(`模式：${Ge}${Ge==="number"?`　报数：${ja}/${Fa}/${Qe}`:""}`)},风水:()=>{t.push(`动作：${Re}${Re==="natal"?"":`　坐：${Ma}　向：${Ua}`}${Re==="xuankong"?`　运：${Fe}`:""}`)}};if(ue[$]&&ue[$](),t.push("```"),t.push(""),J&&(t.push("### 报错原文"),t.push(""),t.push("```"),t.push(String(J)),t.push("```"),t.push("")),l&&l.r){t.push("### 结果摘要（引擎原文，前 40 行）"),t.push(""),t.push("```");const ye=String(l.r.summary||(V.renderText?V.renderText(l.r):"")||"");t.push(ye.split(`
`).slice(0,40).join(`
`)),t.push("```"),l.r.handle&&(t.push(""),t.push("盘号（可据此复现同一张盘）：`"+l.r.handle+"`"))}else t.push("### 结果摘要"),t.push(""),t.push("（这次没有生成盘面——如果是在排盘过程中出错，上面的「报错原文」就是关键。）");return t.push(""),t.push("## 联系渠道"),t.push(""),t.push("- GitHub issue：https://github.com/xuanfu-web/dsh-metaphysics/issues"),t.push("- 邮件：1129440028@qq.com"),t.push("- 腾讯频道：https://pd.qq.com/s/Nb18ikqqfl"),t.push("  （排盘求助 / 命例交流 / 功能与bug / 术语与依据，贴图贴盘都比邮件方便）"),t.push("- 微信群：dsh-metaphysics"),t.join(`
`)},hi=()=>{const t=Es();try{if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(()=>{L("已复制"),E("粘到 issue / 邮件 / 群里即可")}).catch(()=>{L("复制失败"),E("可改用「存 .md」或手动选中")});else{const f=document.createElement("textarea");f.value=t,f.style.cssText="position:fixed;left:-9999px;top:0",document.body.appendChild(f),f.select();const $=document.execCommand&&document.execCommand("copy");f.remove(),L($?"已复制":"复制失败"),E($?"粘到 issue / 邮件 / 群里即可":"可改用「存 .md」或手动选中")}}catch{L("复制失败"),E("可改用「存 .md」")}setTimeout(()=>{L(""),E("")},4e3)},_s=()=>{try{hi()}catch{}const t=encodeURIComponent("[反馈] "+(ea.find(f=>f.k===s)?.label||s)+(J?"：报错":"：使用问题"));try{window.open("https://github.com/xuanfu-web/dsh-metaphysics/issues/new?title="+t,"_blank","noopener")}catch{E("浏览器拦了弹窗，请手动打开 GitHub issues")}},Hs=()=>{if(!(!l||!l.r))try{const t=V.renderText?V.renderText(l.r):l.r.summary||"",f=new Blob([t],{type:"text/markdown;charset=utf-8"}),$=document.createElement("a");$.href=URL.createObjectURL(f),$.download=`烛微命盘报告-${l.r.system}.md`,document.body.appendChild($),$.click(),$.remove(),setTimeout(()=>URL.revokeObjectURL($.href),2e3)}catch(t){console.error("[metaphysics] 导出失败",t)}},Ps=()=>{if(!(!l||!l.r))try{const t=H.summaryCardPNG?H.summaryCardPNG(l.r,l.it):"";if(!t){Aa("当前环境不支持 Canvas 导出");return}const f=document.createElement("a");f.href=t,f.download=`烛微命盘摘要-${l.r.system}.png`,document.body.appendChild(f),f.click(),f.remove()}catch(t){console.error("[metaphysics] 长图导出失败",t)}},bi={fontSize:12,padding:"5px 12px"},Os=()=>{!l||!l.r||!l.r.past||wt(V.verifyFit?V.verifyFit(l.r.past.rows,at):null)},Ds=()=>{if(!(!l||l.kind!=="bazi"))try{const t=l.at||{date:Q,time:ee},[f,$,S]=String(t.date).split("-").map(Number),[,x]=String(t.time).split(":").map(Number),ue=nt.filter(ye=>Number(ye.year)).map(ye=>({year:Number(ye.year),kind:ye.kind}));it(V.rectifyBirth?V.rectifyBirth({base:{year:f,month:$,day:S,minute:Number.isFinite(x)?x:0},gender:l.gender||G,events:ue,lateZi:typeof l.lateZi=="boolean"?l.lateZi:wa,trueSolar:typeof l.trueSolar=="boolean"?l.trueSolar:Ea,address:String(l.address||"").trim()||void 0}):{error:"当前客户端未加载生时校正模块"})}catch(t){it({error:t&&t.message?t.message:String(t)})}},ge=(t,f)=>d("label",{className:"mp-field"},d("span",{className:"mp-lbl"},t),f),xi=t=>{o(t.kind),t.date&&te(t.date),t.time&&ve(t.time),Te(!!t.hourUnknown),t.gender&&we(t.gender),D(t.address||""),typeof t.trueSolar=="boolean"&&ya(t.trueSolar),typeof t.lateZi=="boolean"&&$a(t.lateZi),m(t.lines||""),Le(t.question||""),Ze(t.direction||"general"),Me(t.spread||{1:"one",3:"three",5:"five"}[t.count]||"three"),he(t.mhMode||"time"),Pe(t.upper||""),Wt(t.lower||""),en(t.changing||""),t.kind==="qimen"&&(typeof t.qimenRule=="string"&&Ot(t.qimenRule),typeof t.qLateZi=="string"&&Rt(t.qLateZi)),t.kind==="zeri"&&(typeof t.task=="string"&&st(t.task),t.days!=null&&ot(String(t.days)),typeof t.shengXiao=="string"&&Bt(t.shengXiao),typeof t.zCand=="string"&&Gt(t.zCand)),t.kind==="xiaoliuren"&&(Ra(t.xlrMode==="number"?"number":"time"),t.num1!=null&&pt(String(t.num1)),t.num2!=null&&Zt(String(t.num2)),t.num3!=null&&Sa(String(t.num3))),t.kind==="trend"&&t.toAge!=null&&zt(String(t.toAge)),t.kind==="fengshui"&&(typeof t.fsMode=="string"&&dt(t.fsMode),t.fsPeriod!=null&&Ga(String(t.fsPeriod)),typeof t.sitting=="string"&&ct(t.sitting),typeof t.facing=="string"&&Jt(t.facing)),t.kind==="name"&&(typeof t.nnMode=="string"&&qt(t.nnMode),typeof t.surname=="string"&&Qt(t.surname),typeof t.givenName=="string"&&n(t.givenName),t.limitN!=null&&p(String(t.limitN))),t.kind==="convert"&&(typeof t.convMode=="string"&&za(t.convMode),typeof t.lunarDate=="string"&&qa(t.lunarDate),typeof t.leapMonth=="boolean"&&Ut(t.leapMonth)),t.kind==="hepan"&&(t.hpChart&&vt(t.hpChart),typeof t.partnerDate=="string"&&K(t.partnerDate),typeof t.partnerTime=="string"&&ze(t.partnerTime),typeof t.partnerGender=="string"&&Ee(t.partnerGender),typeof t.partnerAddress=="string"&&a(t.partnerAddress),typeof t.thirdOn=="boolean"&&yt(t.thirdOn),typeof t.p2Date=="string"&&Ht(t.p2Date),typeof t.p2Time=="string"&&_e(t.p2Time),typeof t.p2Gender=="string"&&Pt(t.p2Gender),typeof t.p2Address=="string"&&Ja(t.p2Address)),_(!1),be(t)},Rs=()=>{ne([]),Fn([])},[Xe,sn]=j(()=>{try{return H.casesLoad()}catch{return[]}}),[Fs,vi]=j(!1),[kn,yi]=j("all"),[Is,wi]=j(!1),Bs=()=>{try{sn(H.casesLoad())}catch{}yi("all"),vi(!0)},zn=()=>vi(!1),Gs=t=>t==="all"?Xe.length:Xe.filter(f=>f.status===t).length,qn=kn==="all"?Xe:Xe.filter(t=>t.status===kn),Us=()=>{if(!aa.entry){I("这张盘没有可存的参数，重排一次再存。");return}try{const t=H.casesAdd(aa.entry);t&&t.ok?(sn(t.list),wi(!0)):I("卦例没能存进本机（存储被禁用或已满），排盘不受影响。")}catch{I("卦例没能存进本机（存储被禁用或已满），排盘不受影响。")}},$i=t=>{const f=t?H.casesExportMasked(Xe):H.casesExport(Xe);if(!f){I("还没有可导出的卦例");return}try{const $=new Blob([f],{type:"application/x-ndjson;charset=utf-8"}),S=URL.createObjectURL($),x=document.createElement("a");x.href=S,x.download=t?`metaphysics-cases-masked-${new Date().toISOString().slice(0,10)}.jsonl`:`metaphysics-cases-${new Date().toISOString().slice(0,10)}.jsonl`,document.body.appendChild(x),x.click(),x.remove(),setTimeout(()=>{try{URL.revokeObjectURL(S)}catch{}},1e3),I(t?`已导出 ${Xe.length} 条卦例（脱敏：去年份、时刻整点化、去出生地）`:`已导出 ${Xe.length} 条卦例（JSONL）`)}catch($){I("导出失败："+($&&$.message?$.message:"当前环境不支持下载"))}},Zs=t=>{const f=t.entry||{},$=new Date(t.at),S=x=>String(x).padStart(2,"0");return d("div",{key:t.id,className:"mp-case"},d("button",{className:"mp-case-main",onClick:()=>{xi(Object.assign({},f)),zn()},title:[f.date,f.hourUnknown?"时辰未知":f.time,f.address].filter(Boolean).join(" ")||"点一下回填这组参数并重排"},d("b",null,H.profKindLabel(f.kind)),d("span",null,f.label||t.question||"—"),d("i",null,`${S($.getMonth()+1)}-${S($.getDate())} ${S($.getHours())}:${S($.getMinutes())}`)),d("select",{className:"mp-case-sel",value:t.status,title:"标应验状态",onChange:x=>sn(H.casesSetStatus(t.id,x.target.value))},H.CASE_STATUS.map(x=>d("option",{key:x,value:x},H.caseStatusLabel(x)))),d("button",{className:"mp-case-del",title:"删除这条",onClick:()=>sn(H.casesRemove(t.id))},"删"))},Ks=["bazi","ziwei","trend"],ki=t=>{o(t.kind),te(t.date),t.time&&ve(t.time),Te(!!t.hourUnknown),t.gender&&we(t.gender),D(t.address||""),ya(t.trueSolar!==!1),$a(t.lateZi!==!1)},Ys=t=>{const f=H.profEvent(t.target);if(!f)return;const $=x=>ie.find(ue=>ue.id===x),S=t.currentTarget.querySelector(".mp-prof-name");if(v(""),f.action==="use"){const x=$(f.id);if(!x)return;if(!H.profUsable(x)){I("这张档案没有出生时刻，先补上时刻再存一次。");return}xa="",y(H.profilesTouch(x.id)),ki(x),De(x.kind,{date:x.date,time:x.hourUnknown?"12:00":x.time},void 0,{gender:x.gender||void 0,address:x.address||"",hourUnknown:!!x.hourUnknown,trueSolar:x.trueSolar!==!1,lateZi:x.lateZi!==!1});return}if(f.action==="edit"){const x=$(f.id);if(!x)return;ki(x),xa=x.label,q(x.id);return}if(f.action==="cancel"){xa="",q(null);return}if(f.action==="pin"){y(H.profilesPin(f.id));return}if(f.action==="del"){if(fe!==f.id){v(f.id);return}y(H.profilesRemove(f.id)),z===f.id&&(xa="",q(null)),I("已从本机删除这张档案卡（不影响已经排出来的盘）。");return}if(f.action==="put"){const x=z,ue=H.profFromForm({kind:s,date:Q,time:ee,hourUnknown:ke,gender:G,address:W,trueSolar:Ea,lateZi:wa},S?S.value:xa,z||void 0);if(!ue){I("先填好出生日期（和时刻），再存档案。");return}const ye=H.profilesPut(ue);if(!ye.ok){I("档案没能存进本机（存储被禁用或已满），排盘不受影响。");return}y(ye.list),xa="",q(null),S&&(S.value=""),I(`${x?"已更新档案":"已存入我的命盘"}「${ye.item.label}」。`)}},Vs=t=>{const f=t.target&&t.target.closest?t.target.closest(".mp-prof-name"):null;f&&(xa=f.value)},Xs=t=>{const f=V.formOf?V.formOf(t):null;if(!f){De("ziwei");return}const $=ea.some(Ie=>Ie.k===f.tab)?f.tab:"ziwei",S={date:f.date||Q,time:f.time||ee},x=f.lines===void 0?void 0:Array.isArray(f.lines)?f.lines.join(" "):String(f.lines);f.date&&te(f.date),f.time&&ve(f.time),f.gender&&we(f.gender),typeof f.address=="string"&&D(f.address),typeof f.trueSolar=="boolean"&&ya(f.trueSolar),typeof f.lateZi=="boolean"&&$a(f.lateZi),x!==void 0&&m(x),f.question&&Le(f.question),o($);let ue=null;if($==="guanyin"&&f.rest){ue={};for(const Ie of["no","seed","except"])f.rest[Ie]!==void 0&&(ue[Ie]=f.rest[Ie],delete f.rest[Ie]);Object.keys(ue).length||(ue=null)}const ye=V.restNote?V.restNote(f):"";Ve(`已按深链还原：${t.label}${f.question?`｜${f.question}`:""}${ye?`　${ye}`:""}`),De($,S,void 0,{gender:f.gender,address:f.address,trueSolar:f.trueSolar,lateZi:f.lateZi,lines:x,question:f.question,draw:ue})};oa(()=>{let t=!1;const f=Be;return(async()=>{let $=null;try{await xt(s);const S=typeof location<"u"?String(location.href):"";S&&S.indexOf("mp=")>=0&&window.Engine&&window.Engine.parseAskLink&&($=window.Engine.parseAskLink(S))}catch{$=null}if(!(t||Be!==f)){if($&&$.ok)try{Xs($);return}catch{}De("ziwei")}})(),()=>{t=!0}},[]),oa(()=>{if(!U)return;const t=U.kind;be(null),De(t)},[U]),oa(()=>{const t=f=>{if(f.key!=="Escape")return;const $=document.getElementById("mp-trace-layer");$&&$.classList.contains("open")&&mi()};return document.addEventListener("keydown",t),()=>document.removeEventListener("keydown",t)},[]);const zi=(oe||[]).filter(t=>t&&ea.some(f=>f.k===t.tab)).slice(0,Kn),Js=t=>(ea.find(f=>f.k===t)||{}).label||t,Qs=({k:t,label:f,tip:$,wide:S})=>d("button",{key:t,type:"button",title:$,className:"mp-tool"+(S?" wide":"")+(s===t?" on":""),"data-tab":t,onClick:()=>tn(t)},d("b",null,f),d("span",null,$)),Ws=[d("div",{key:"profiles",className:"mp-profwrap",onClick:Ys,onInput:Vs,dangerouslySetInnerHTML:{__html:H.profilesHTML(ie,{editingId:z,armedDel:fe,bar:Ks.indexOf(s)>=0?H.profilesBarHTML({editingId:z,name:xa}):""})}}),d("section",{key:"start",className:"mp-start","aria-label":"选择要算的事"},d("div",{className:"mp-start-top"},d("div",{className:"mp-recent",hidden:zi.length===0},d("span",{className:"mp-recent-lbl"},"最近用过"),d("span",{className:"mp-recent-list"},zi.map(t=>d("button",{key:t.tab,type:"button",className:"mp-rc",onClick:()=>tn(t.tab)},Js(t.tab),d("i",null,ns(t.at)))))),d("div",{className:"mp-viewsw",role:"group","aria-label":"首屏视图"},d("button",{type:"button",className:Z==="group"?"on":"","aria-pressed":Z==="group"?"true":"false",onClick:()=>pi("group")},"分组"),d("button",{type:"button",className:Z==="flat"?"on":"","aria-pressed":Z==="flat"?"true":"false",onClick:()=>pi("flat")},"平铺"))),Z==="group"?d("div",{className:"mp-groups"},Xi.map(t=>{const f=!!Ae[t.title],$=Math.max(0,t.items.length-4);return d("section",{key:t.title,className:"mp-tgroup"+(f?" open":"")},d("div",{className:"mp-tgroup-head"},d("h2",null,t.title),d("p",null,t.hint)),d("div",{className:"mp-ttools"},t.items.map(Qs),$>0?d("button",{key:"more",type:"button",className:"mp-tmore","aria-expanded":f?"true":"false",onClick:()=>je(S=>Object.assign({},S,{[t.title]:!f}))},f?"收起":`还有 ${$} 个`):null))})):null),d("div",{key:"tabs",className:"mp-tabs"+(Z==="flat"?"":" hide"),role:"tablist","aria-label":"命理体系"},ea.map(t=>d("button",{key:t.k,role:"tab","aria-selected":s===t.k?"true":"false",tabIndex:s===t.k?0:-1,className:"mp-tab"+(s===t.k?" on":""),onClick:()=>tn(t.k)},t.label))),d("div",{key:"head",className:"mp-panel"},ps({tab:s,open:Ka,onToggle:bs,onCast:xs,onAsk:fi,hasResult:!!l}),d("div",{className:"mp-row"},oi?ge(jt?"出生日期（公历）":We==="date"?"日期（公历）":"起卦日期（公历）",d(ln,{value:Q,onChange:vs,onInvalid:()=>I("日期请按「年-月-日」填写，例如 1990-05-12。")})):null,ri?ge(jt?"出生时刻":"起卦时刻",d("input",{className:"mp-input",type:"time",value:ee,disabled:ke&&(s==="bazi"||s==="trend"),onChange:t=>ys(t.target.value)})):null,s==="bazi"||s==="trend"?d("label",{className:"mp-chk",title:"不知道出生时辰时勾这里：不排时柱，起运按日估算，结果首行会写明"},d("input",{type:"checkbox",checked:ke,onChange:t=>Te(t.target.checked)})," 时辰未知"):null,jt?ge("性别",d("select",{className:"mp-input",value:G,onChange:t=>we(t.target.value)},d("option",{value:"female"},"女"),d("option",{value:"male"},"男"))):null,jt?ge("出生地（省/市即可）",d("input",{className:"mp-input",placeholder:"如 河北石家庄 / 成都",value:W,onChange:t=>D(t.target.value)})):null,s==="bazi"||s==="ziwei"?d("label",{className:"mp-field mp-checks"},d("input",{type:"checkbox",checked:_a,onChange:t=>et(t.target.checked)}),d("span",{className:"mp-lbl"},"八字 × 紫微 交叉验证")):null,s==="hepan"?ge("对方出生日期",d(ln,{value:F,onChange:K,onInvalid:()=>I("对方出生日期请按「年-月-日」填写，例如 1992-08-15。")})):null,s==="hepan"?ge("对方出生时刻",d("input",{className:"mp-input",type:"time",value:se,onChange:t=>ze(t.target.value)})):null,s==="hepan"?ge("对方性别",d("select",{className:"mp-input",value:qe,onChange:t=>Ee(t.target.value)},d("option",{value:"female"},"女"),d("option",{value:"male"},"男"))):null,s==="hepan"?ge("合盘方式",d("div",{className:"mp-seg"},d("button",{className:ta==="bazi"?"on":"",onClick:()=>vt("bazi")},"八字"),d("button",{className:ta==="ziwei"?"on":"",onClick:()=>vt("ziwei")},"紫微"))):null,s==="hepan"?ge("对方出生地（可空）",d("input",{className:"mp-input",placeholder:"如 四川成都",value:va,onChange:t=>a(t.target.value)})):null,s==="hepan"?d("label",{className:"mp-field mp-checks"},d("input",{type:"checkbox",checked:Ye,onChange:t=>yt(t.target.checked)}),d("span",{className:"mp-lbl"},"三方合盘（加入第三人）")):null,s==="hepan"&&Ye?ge("第三方出生日期",d(ln,{value:Xa,onChange:Ht,onInvalid:()=>I("第三方出生日期请按「年-月-日」填写，例如 1990-01-01。")})):null,s==="hepan"&&Ye?ge("第三方出生时刻",d("input",{className:"mp-input",type:"time",value:Je,onChange:t=>_e(t.target.value)})):null,s==="hepan"&&Ye?ge("第三方性别",d("select",{className:"mp-input",value:Se,onChange:t=>Pt(t.target.value)},d("option",{value:"female"},"女"),d("option",{value:"male"},"男"))):null,s==="hepan"&&Ye?ge("第三方出生地（可空）",d("input",{className:"mp-input",placeholder:"如 广东广州",value:Ta,onChange:t=>Ja(t.target.value)})):null,s==="qimen"?d("fieldset",{key:"qmr",className:"mp-qmrule"},d("legend",{className:"mp-lbl"},"换局规则"),d("div",{className:"mp-qmopts",role:"radiogroup","aria-label":"奇门换局规则"},[["chaibu","拆补"],["chaoshen","超神接气"],["zhirun","置闰"]].map(([t,f])=>d("label",{key:t,className:"mp-qmopt"},d("input",{type:"radio",name:"qimen_rule",value:t,checked:Qa===t,onChange:()=>Ot(t)}),d("span",null,f)))),d("div",{className:"mp-field"},d("span",{className:"mp-lbl"},"晚子时"),d("select",{className:"mp-input",value:Dt,onChange:t=>Rt(t.target.value)},d("option",{value:"same-day"},"23:00 后归当日"),d("option",{value:"next-day"},"23:00 后归次日"))),d("details",{className:"mp-qmhelp"},d("summary",null,"三种规则有什么区别？"),d("p",null,"决定符头与节气如何对齐、是否插入闰局；同一个时刻在不同规则下可能得到不同局数。默认「拆补」与工具层一致。"))):null,ra(s)||s==="qimen"?ge(s==="qimen"?"询问方向（定用神）":"询问方向",d("select",{className:"mp-input mp-askonly",value:Ne,onChange:t=>{Ze(t.target.value),ui(t.target.value)}},(V.DIRECTIONS||[]).map(t=>d("option",{key:t.key,value:t.key},t.label)))):null,s==="tarot"?ge("牌阵",d("select",{className:"mp-input",value:xe,onChange:t=>Me(t.target.value)},d("option",{value:"one"},"1 张 · 单张指引"),d("option",{value:"three"},"3 张 · 过去现在未来"),d("option",{value:"five"},"5 张 · 五张局势"),d("option",{value:"celtic"},"10 张 · 凯尔特十字"),d("option",{value:"either"},"5 张 · 二选一"),d("option",{value:"relation"},"7 张 · 关系阵"),d("option",{value:"timeflow"},"3 张 · 时间流"))):null,s==="liuyao"?ge("六爻（可空）",d("input",{className:"mp-input",placeholder:"空则随机，如 9 7 8 8 7 6",value:u,onChange:t=>m(t.target.value)})):null,s==="meihua"?ge("起卦方式",d("div",{className:"mp-seg"},d("button",{className:de==="time"?"on":"",onClick:()=>di("time")},"时间"),d("button",{className:de==="number"?"on":"",onClick:()=>di("number")},"数字"))):null,s==="meihua"&&de==="number"?ge("第一个数",d("input",{className:"mp-input",value:He,placeholder:"如 17",onChange:t=>Pe(t.target.value)})):null,s==="meihua"&&de==="number"?ge("第二个数",d("input",{className:"mp-input",value:Oe,placeholder:"如 29",onChange:t=>Wt(t.target.value)})):null,s==="meihua"&&de==="number"?ge("动爻（可空）",d("input",{className:"mp-input",value:Na,placeholder:"1-6",onChange:t=>en(t.target.value)})):null,s==="zeri"?ge("所办事项",d("select",{className:"mp-input",value:kt,onChange:t=>st(t.target.value)},[["常用",["嫁娶","搬家入宅","出行","开业","签订合同","祭祀"]],["婚嫁",["嫁娶","订婚","领证","提亲","收送聘金","满月酒"]],["生活",["搬家","入宅","旅行","访亲友","入学","求医","祭祀"]],["建造",["动土","装修","装修建造","安葬","试车买车"]],["工商",["开业","交易","投资","签订合同","签约","纳财","赴任"]]].map(([t,f])=>d("optgroup",{key:t,label:t},f.map($=>d("option",{key:`${t}-${$}`,value:$},$)))))):null,s==="convert"?ge("转换方向",d("div",{className:"mp-seg"},d("button",{className:$e==="solar2lunar"?"on":"",onClick:()=>za("solar2lunar")},"公历 → 农历"),d("button",{className:$e==="lunar2solar"?"on":"",onClick:()=>za("lunar2solar")},"农历 → 公历"))):null,s==="convert"&&$e==="lunar2solar"?ge("农历日期",d("input",{className:"mp-input",value:Da,placeholder:"如 2026-9-17",onChange:t=>qa(t.target.value)})):null,s==="convert"&&$e==="lunar2solar"?d("label",{className:"mp-check"},d("input",{type:"checkbox",checked:rt,onChange:t=>Ut(t.target.checked)})," 闰月"):null,s==="zeri"?ge("看多少天",d("input",{className:"mp-input",type:"number",min:1,max:60,value:da,onChange:t=>ot(t.target.value)})):null,s==="zeri"?ge("候选日（可空，只比这几天）",d("input",{className:"mp-input",placeholder:"如 2026-12-01, 2026-12-08, 2026-12-15",value:ca,onChange:t=>Gt(t.target.value)})):null,s==="zeri"?ge("当事人属相（可空）",d("select",{className:"mp-input",value:ka,onChange:t=>Bt(t.target.value)},d("option",{value:""},"不排除"),["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"].map(t=>d("option",{key:t,value:t},t)))):null,s==="xiaoliuren"?ge("起课方式",d("div",{className:"mp-seg"},d("button",{className:Ge==="time"?"on":"",onClick:()=>Ra("time")},"时间"),d("button",{className:Ge==="number"?"on":"",onClick:()=>Ra("number")},"报数"))):null,s==="xiaoliuren"&&Ge==="number"?ge("第一个数",d("input",{className:"mp-input",type:"number",min:1,max:99,value:ja,onChange:t=>pt(t.target.value)})):null,s==="xiaoliuren"&&Ge==="number"?ge("第二个数",d("input",{className:"mp-input",type:"number",min:1,max:99,value:Fa,onChange:t=>Zt(t.target.value)})):null,s==="xiaoliuren"&&Ge==="number"?ge("第三个数",d("input",{className:"mp-input",type:"number",min:1,max:99,value:Qe,onChange:t=>Sa(t.target.value)})):null,s==="mbti"?d("div",{className:"mp-quiz-wrap"},d("div",{className:"mp-lbl"},"十六型人格问卷 · 4 题一页，按 1（完全不像）到 5（很像我）打分"),d(Zi,{answers:na,page:bn,onPick:(t,f)=>Kt($=>{const S=$.slice();return S[t]=f,S}),onPage:t=>Yt(f=>Math.max(0,Math.min(f+t,Math.max(0,Math.ceil(Lt().total/Nt)-1)))),onSubmit:ut,onClear:()=>{Kt(new Array(Lt().total).fill(null)),Yt(0),g(null)}})):null,s==="constitution"?d("div",{className:"mp-quiz-wrap"},d("div",{className:"mp-lbl"},"中医体质问卷 · 9 种体质各 5 题，共 45 题 · 5 题一页，按 1（没有）到 5（总是）打分"),d(Ki,{paper:Ia,answers:lt,page:vn,onPick:(t,f)=>Vt($=>{const S=$.slice();return S[t]=f,S}),onPage:t=>Xt(f=>Math.max(0,Math.min(f+t,Math.max(0,Math.ceil((Ia&&Ia.questions?Ia.questions.length:dn)/At)-1)))),onSubmit:ut,onClear:()=>{Vt(new Array(dn).fill(null)),Xt(0),g(null)}})):null,s==="trend"?ge("算到几岁",d("input",{className:"mp-input",type:"number",min:10,max:100,value:Ba,onChange:t=>zt(t.target.value)})):null,s==="fengshui"?ge("看什么",d("div",{className:"mp-seg"},d("button",{className:Re==="natal"?"on":"",onClick:()=>dt("natal")},"命卦"),d("button",{className:Re==="advise"?"on":"",onClick:()=>dt("advise")},"门主灶"),d("button",{className:Re==="xuankong"?"on":"",onClick:()=>dt("xuankong")},"玄空"))):null,s==="fengshui"&&Re!=="natal"?ge("坐山（24 山）",d("input",{className:"mp-input",value:Ma,placeholder:"如 子 / 乾",onChange:t=>ct(t.target.value)})):null,s==="fengshui"&&Re!=="natal"?ge("朝向（24 山）",d("input",{className:"mp-input",value:Ua,placeholder:"如 午 / 巽",onChange:t=>Jt(t.target.value)})):null,s==="fengshui"&&Re==="xuankong"?ge("运（1–9）",d("input",{className:"mp-input",type:"number",min:1,max:9,value:Fe,onChange:t=>Ga(t.target.value)})):null,s==="name"?ge("看什么",d("div",{className:"mp-seg"},d("button",{className:Ue==="assess"?"on":"",onClick:()=>qt("assess")},"评名字"),d("button",{className:Ue==="generate"?"on":"",onClick:()=>qt("generate")},"生成候选"))):null,s==="name"?ge("姓",d("input",{className:"mp-input",value:mt,placeholder:"如 李",onChange:t=>Qt(t.target.value)})):null,s==="name"&&Ue==="assess"?ge("名字",d("input",{className:"mp-input",value:e,placeholder:"如 沐宸",onChange:t=>n(t.target.value)})):null,s==="name"&&Ue==="generate"?ge("候选个数",d("input",{className:"mp-input",type:"number",min:1,max:20,value:i,onChange:t=>p(t.target.value)})):null),jt?d("div",{className:"mp-checks"},d("label",{title:"按出生地经度把钟表时间换算成真太阳时"},d("input",{type:"checkbox",checked:Ea,onChange:t=>ya(t.target.checked)}),"真太阳时"),d("label",{title:"23:00–23:59 出生时：勾选=按次日日柱起时柱；不勾=仍用当日日柱"},d("input",{type:"checkbox",checked:wa,onChange:t=>$a(t.target.checked)}),"晚子时换日"),d("label",{title:"开启后会请求 OpenStreetMap，把区县/村落到更精确的坐标"},d("input",{type:"checkbox",checked:r,onChange:t=>c(t.target.checked)}),"联网精确到区县")):null,ra(s)||s==="guanyin"?d("div",{className:"mp-askblock"},d("span",{className:"mp-lbl"},s==="guanyin"?"所问之事（可留空）":"所问之事（必填）"),d("textarea",{className:"mp-textarea"+(h?" invalid":""),rows:2,value:P,placeholder:s==="guanyin"?"心里那件事，一句话即可；不写也行。":"用一句话描述所问之事，例如：今年是否适合换工作？",onChange:t=>{Le(t.target.value),_(!1)},onBlur:t=>ui(void 0,t.target.value)})):null,s==="mbti"||s==="constitution"?null:d("div",{key:"actions",className:"mp-actions"},d("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginRight:8},onClick:ws,title:"用固定示例盘看完整报告（不改动你已填的数据）"},"看示例"),l&&!w?d("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginRight:8},onClick:()=>b(!0),title:"出盘后参数区是只读的：点这里解锁，改完再点排盘更新结果"},"修改参数"):null,d("button",{className:"mp-btn",onClick:ut,title:"时间仍为自动时，点它会取当下再起卦"},s==="tarot"?"抽牌":s==="qian"||s==="guanyin"?"摇签":s==="bazi"||s==="ziwei"?"排盘":s==="hepan"?"合盘":s==="qimen"?"起局":cn.indexOf(s)>=0?"看结果":"起卦"))),d("div",{key:"hint",className:"mp-hint"},gs.hint),O.length||Xe.length?d("div",{key:"hist",className:"mp-hist"},d("div",{className:"mp-hist-h"},d("span",null,O.length?"最近排过":"卦例库"),d("span",{className:"mp-hist-acts"},O.length?d("button",{className:"mp-hist-clear",onClick:Rs},"清空"):null,d("button",{className:"mp-hist-clear mp-hist-more",onClick:Bs},Xe.length?`卦例库 ${Xe.length}`:"卦例库"))),d("div",{className:"mp-hist-list"},O.map((t,f)=>d("button",{key:f,className:"mp-hist-item",title:`${String(t.date||"")} ${t.hourUnknown?"时辰未知":String(t.time||"")}`,onClick:()=>xi(t)},d("b",null,(ea.find($=>$.k===t.kind)||{}).label||t.kind),d("span",null,t.label||"—"),d("i",null,`${String(t.date||"").slice(5)} ${t.hourUnknown?"时辰未知":String(t.time||"")}`))))):null,We==="cast"&&si?d("div",{key:"auto",className:"mp-auto"},wn.cast?`起卦时刻用的是你手动填的（${ee}）；想跟随当下，把时间改回或清空即可。`:`起卦时刻已自动取本机时间（${ee}），每次点起卦都会重新取当下；想固定时刻就在上面改。`):null,J?d("div",{key:"err",className:"mp-err",role:"alert"},J):null,N?d("div",{key:"ntc",className:"mp-note",role:"status"},N):null,ae?d("div",{key:"load",className:"mp-note",role:"status"},"正在加载本页需要的引擎…"):null,!l&&!J?d("div",{key:"empty",className:"mp-empty"},s==="qian"?d("button",{key:"qoracle",type:"button",className:"mp-qn-oracle"+(A?" shaking":""),title:"点一下，摇一支今日福签",onClick:li,dangerouslySetInnerHTML:{__html:H.qianOracleHTML()}}):s==="guanyin"?d("button",{key:"loracle",type:"button",className:"mp-qn-oracle mp-lq-oracle"+(A?" shaking":""),title:"点一下，摇一支观音灵签",onClick:li,dangerouslySetInnerHTML:{__html:H.guanyinOracleHTML()}}):null,d("b",null,s==="ziwei"||s==="bazi"?"填好出生信息，点「排盘」":s==="tarot"?"写下想问的事，点「抽牌」":s==="qian"?"轻点签筒，摇出今天的福签":s==="guanyin"?"轻点签筒，摇一支观音灵签":s==="mbti"?"按 1–5 给题目打分，答满 12 题就能看结果":s==="constitution"?"按 1–5 给题目打分，答满 27 题就能看结果":cn.indexOf(s)>=0?"填好参数，点「看结果」":"写下所问之事，点「起卦」"),s==="ziwei"||s==="bazi"?"出生日期、时刻与性别即可；出生地只影响真太阳时。":s==="qian"?"同一天只此一签，次日自换；想回看前几天，结果里列了最近七日。":s==="guanyin"?"一事一签，同一件事可以重摇；签号与签文只在本机计算。":s==="mbti"?"4 题一页，答案只在本地参与计算，不会上传。":s==="constitution"?"5 题一页，答案只在本地参与计算，不会上传；这是自评问卷，不是医学诊断。":cn.indexOf(s)>=0?"按上面的选项填好参数即可；全部在本机计算，不上传。":"起卦时刻已自动取当下，也可以手动改。"):null,l?d("div",{key:"card",className:"mp-card mp-flat",role:"region","aria-label":"排盘结果","aria-live":"polite",onClick:As,dangerouslySetInnerHTML:{__html:Oi({head:H.envHeadHTML(l.it,{folded:$n()})||H.factHeadHTML(l.r&&l.r.factHead),body:H.envBodyHTML(l.it,{folded:$n()}),chart:rs(l),shortId:window.__MPCompose?window.__MPCompose.shortIdHTML(l.r.shortId):"",castAt:Cs(l),solar:H.solarLineHTML(l.r),interpret:H.resultWithInterpret("",l.it,{folded:$n(),noHead:!0,noBody:!0}),sign:H.signatureHTML(),revision:H.revisionHTML(l.r.revision),handle:H.handleHTML(l.r.handle),shadow:H.shadowHTML(l.r.shadow,l.shadowDiff),trace:H.traceHTML(l.r.trace,l.r.system,l.r.traceText),caliber:H.caliberHTML(l.caliber),perf:H.perfHTML(le)},l.r&&l.r.system)}}):null,l?d("div",{key:"bar",className:"mp-bar"},d("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px"},onClick:Ls},us||"复制文字结果"),d("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:Hs,title:"导出盘面 + 解析（含一页读懂、三张表）为 Markdown"},"存 .md"),d("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:Ps,title:"生成 PNG 摘要卡（一页读懂 + 首张表），适合直接分享"},"存长图"),l.kind!=="guanyin"?d("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:Us,title:"把这张盘的参数存进卦例库，日后可回填重排、标应验"},Is?"已存入卦例库":"存入卦例库"):null):null,l&&l.kind!=="guanyin"&&!fn?d("p",{key:"nudge",className:"mp-nudge"},"这张盘只在你自己这台设备上算，不上传、不联网。过些天回头想看看它准不准，先「存入卦例库」，之后在卦例库里标应验就行——愿意记就记，不记也能照常用。",d("button",{type:"button",className:"mp-nudge-x",onClick:()=>{try{window.localStorage.setItem("dsh-metaphysics/nudge-off","1")}catch{}Wa(!0)},title:"以后不再出现这行"},"不再提示")):null,l?d("div",{key:"ask",className:"mp-askbox",style:{flexWrap:"wrap"}},d("input",{className:"mp-input",value:pa,maxLength:120,placeholder:"追问：如 2027 年事业怎么样（回车提交）",onChange:t=>Ft(t.target.value),onKeyDown:t=>{t.key==="Enter"&&gi()}}),d("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px"},onClick:gi},"追问"),d("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:fi,title:"把这张盘的摘要和你的问题一起发进 DSH 对话窗，由对话里的模型接着答"},"问进对话"),ce.ref?null:d("div",{key:"bridgediag",className:"mp-note",style:{marginTop:6,fontSize:11,flexBasis:"100%"}},"本机对话窗没接上：点「问进对话」会把提问复制到剪贴板，自己粘进对话窗就行。"+(Di()?"（"+Qn()+"）":"")),Ha?d("div",{key:"chatnote",className:"mp-note",style:{marginTop:6,fontSize:12,flexBasis:"100%"}},Ha):null):null,l?d("div",{key:"bridge",className:"mp-bridge"},d("span",{className:"mp-bridge-lbl"},ce.ref?"桥可用；也可以：":"桥未就绪，改走这几档："),ci.map(([t,f,$])=>d("button",{key:t,type:"button",className:"mp-chip","data-bridge-copy":t,title:$,onClick:S=>Ms(t,S.currentTarget)},f))):null,It?d("div",{key:"fx",className:"mp-fx",dangerouslySetInnerHTML:{__html:H.followupHTML(It)}}):null,l&&l.kind==="bazi"&&l.r.past?d("div",{key:"verify",className:"mp-verify"},d("div",{className:"mp-verify-h"},"先核对过去几年：这盘说的事，对得上吗"),l.r.past.rows.map(t=>d("div",{key:t.year,className:"mp-verify-row"},d("span",{className:"mp-verify-txt"},`${t.year} ${t.ganzhi} · ${t.theme}`),d("span",{className:"mp-verify-btns"},["yes","no","unsure"].map(f=>d("button",{key:f,className:"mp-chip"+(at[t.year]===f?" on":""),onClick:()=>tt(Object.assign({},at,{[t.year]:f}))},f==="yes"?"准":f==="no"?"不准":"不确定"))))),d("div",{className:"mp-verify-foot"},d("button",{className:"mp-btn ghost",style:bi,onClick:Os},"算贴合度"),Oa?d("span",{className:"mp-verify-fit"},`命中 ${Oa.yes}/${Oa.answered}（${Oa.level}）：${Oa.advice}`):null)):null,l&&l.kind==="bazi"?d("div",{key:"rect",className:"mp-rect"},d("div",{className:"mp-verify-h"},"不确定几点出生？填几件过去的事，反推时辰"),nt.map((t,f)=>d("div",{key:f,className:"mp-rect-row"},d("input",{className:"mp-input",type:"number",min:1900,max:2100,value:t.year,onChange:$=>$t(nt.map((S,x)=>x===f?Object.assign({},S,{year:$.target.value}):S))}),d("select",{className:"mp-input",value:t.kind,onChange:$=>$t(nt.map((S,x)=>x===f?Object.assign({},S,{kind:$.target.value}):S))},[["career","事业变动"],["wealth","财运"],["love","感情"],["move","搬迁/出行"],["health","健康"],["other","其他"]].map(([$,S])=>d("option",{key:$,value:$},S))))),d("button",{className:"mp-btn ghost",style:bi,onClick:Ds},"计算候选时辰"),la?la.error?d("div",{className:"mp-rect-err"},la.error):d("div",{className:"mp-rect-out"},d("div",{className:"mp-verify-fit"},la.note),la.candidates.slice(0,6).map(t=>d("div",{key:t.hour,className:"mp-rect-cand"+(t===la.best?" best":"")},`${t.label} · 时柱 ${t.hourGanzhi} · 日柱 ${t.dayGanzhi} · 命中 ${t.hits}/${t.total}`))):null):null,!l&&!J?d("div",{key:"ph",className:"mp-dim",style:{marginTop:24,fontSize:12}},"选择体系后点「排盘」。所有计算在本机完成，不上传任何数据。"):null,d("div",{key:"fb",className:"mp-fb"},d("div",{className:"mp-fb-h"},d("span",{className:"mp-fb-t"},"用得不对、读不懂、或算得跟别家不一样？"),d("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"4px 10px"},onClick:hi,title:"生成一份含输入、版本、环境与结果摘要的报告，粘贴到 issue / 邮件 / 群聊即可"},k||"复制反馈报告"),d("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"4px 10px",marginLeft:6},onClick:()=>_s(),title:"在浏览器打开 GitHub issue（报告已复制到剪贴板，粘进去即可）"},"开 issue")),d("div",{className:"mp-fb-b"},"有疑问？",d("a",{href:"mailto:1129440028@qq.com?subject="+encodeURIComponent("[反馈] 烛微命盘"),style:{color:"inherit"},title:"点开直接写邮件，不用复制任何东西"},"1129440028@qq.com"),"　·　GitHub issues　·　",d("a",{href:"https://pd.qq.com/s/Nb18ikqqfl",target:"_blank",rel:"noopener noreferrer",style:{color:"inherit"},title:"腾讯频道「烛微命盘」：排盘求助、命例交流、功能与bug、术语与依据"},"交流频道"),"　·　微信群 dsh-metaphysics",C?d("span",{className:"mp-fb-note"},"　"+C):null)),Fs?d("div",{key:"cases",className:"mp-cases-layer",role:"dialog","aria-modal":"true","aria-label":"卦例库",onClick:t=>{t.target===t.currentTarget&&zn()}},d("div",{className:"mp-cases-box"},d("div",{className:"mp-cases-h"},d("b",null,`卦例库 · ${qn.length}/${Xe.length}`),d("button",{className:"mp-cases-x",onClick:zn,"aria-label":"关闭"},"✕")),d("div",{className:"mp-cases-tabs"},[["all","全部"]].concat(H.CASE_STATUS.map(t=>[t,H.caseStatusLabel(t)])).map(t=>d("button",{key:t[0],className:"mp-chip"+(kn===t[0]?" on":""),onClick:()=>yi(t[0])},`${t[1]} ${Gs(t[0])}`))),d("div",{className:"mp-cases-list"},qn.length?qn.map(t=>Zs(t)):d("div",{className:"mp-empty"},"这一栏还空着。看结果时点「存入卦例库」，想要的盘才会记进来；过些天回来标应验。")),d("div",{className:"mp-cases-f"},d("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"4px 10px"},onClick:()=>$i(!1)},"导出 JSONL"),d("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"4px 10px",marginLeft:6},onClick:()=>$i(!0),title:"去掉出生年份（只留月日）、时刻整点化、去掉出生地——发给群里也不露个人信息"},"导出脱敏版"),d("span",{className:"mp-cases-tip"},"只存参数与一句摘要，不存盘面；点条目回填重排。")))):null];return d("div",{className:"mp-wrap"},Ws)}function ds(s){try{if(typeof styles<"u"&&styles&&typeof styles.insert=="function")return styles.insert(s)}catch(o){console.error("[metaphysics] styles.insert 不可用，改用 DOM 注入",o)}try{const o=document.createElement("style");return o.setAttribute("data-plugin","@local/metaphysics"),o.textContent=s,document.head.appendChild(o),()=>o.remove()}catch(o){return console.error("[metaphysics] DOM 注入样式也失败",o),()=>{}}}let ii=!1;function gn(){try{const s=document.documentElement;if(!s||!document.body)return;const o=document.createElement("span");o.setAttribute("aria-hidden","true"),o.style.cssText="position:absolute;left:-9999px;top:0;width:0;height:0;pointer-events:none;background:var(--dsw-alias-brand-primary)",document.body.appendChild(o);const A=getComputedStyle(o).backgroundColor;o.remove();const Y=Ke&&typeof Ke.pickOnColor=="function"?Ke.pickOnColor(A):"";Y&&s.style&&s.style.getPropertyValue("--mp-on-brand")!==Y&&s.style.setProperty("--mp-on-brand",Y)}catch{}}function cs(){if(!ii){ii=!0,gn();try{const s=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)");s&&typeof s.addEventListener=="function"&&s.addEventListener("change",gn)}catch{}try{typeof MutationObserver=="function"&&document.documentElement&&new MutationObserver(gn).observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]})}catch{}}}function ms(s){try{const G=ds(Bi+(H&&H.CSS?H.CSS:""));typeof s.effect=="function"&&typeof G=="function"&&s.effect(()=>G)}catch(G){console.error("[metaphysics] 样式注入失败",G)}try{cs()}catch(G){console.error("[metaphysics] 字色同步失败",G)}let o=null;try{o=s&&s.slots||(s&&typeof s.get=="function"?s.get("slots"):null)}catch(G){console.error("[metaphysics] 取 slots 服务失败",G)}if(!o||typeof o.register!="function"){console.error("[metaphysics] slots 服务不可用，面板未注册");return}try{ce.injectType=typeof o.inject;const G=typeof o.spec=="function"?o.spec("conversation.input.right"):null;ce.spec=G?G.kind+"/"+G.scope:"未声明"}catch(G){ce.spec="取声明失败",Wn(G)}const A=G=>{if(typeof G=="function")return G;if(G&&typeof G=="object"){for(const we of["dispose","off","cancel","unregister"])if(typeof G[we]=="function")return()=>{try{G[we]()}catch{}}}return()=>{}},Y=(G,we)=>{try{const W=o.register(G,we);return ce.regs+=1,ce.seatOk[G.name]=!0,A(W)}catch(W){return Wn(W),()=>{}}},me=(G,we)=>{const W=()=>{const D=we();return ce.contribution=(ce.contribution?ce.contribution+",":"")+(G+(typeof D=="function"?" 已挂上":" 未挂上")),D};try{typeof o.inject=="function"?o.inject(G,W):W()}catch(D){console.error("[metaphysics] 等待槽位失败："+G,D);try{W()}catch(F){console.error("[metaphysics] 直接注册也失败："+G,F)}}};me("sidebar.panellist",()=>Y({name:"sidebar.panellist",id:"metaphysics",order:20,label:()=>"烛微命盘 v"+(window.__MP_VER||"")},Vi)),me("main",()=>Y({name:"main",key:"metaphysics"},G=>d(Yi,null,d(ls,G))));const Q=(G,we)=>{const W=()=>{try{const F=o.inject(G,we);return ce.contribution=(ce.contribution?ce.contribution+",":"")+(G.replace("conversation.","")+(typeof F=="function"?" 已挂上":" 未挂上")),F}catch(F){console.error("[metaphysics] 槽位注册失败："+G,F);try{return we()}catch(K){console.error("[metaphysics] 直接注册也失败："+G,K);return}}};let D;try{typeof s.effect=="function"?D=s.effect(W,"metaphysics: "+G):D=W()}catch(F){console.error("[metaphysics] effect 包裹失败："+G,F),D=W()}typeof D=="function"&&ce.seatDisposers.push(D)};Q("conversation.input.right",()=>Y({name:"conversation.input.right",id:"metaphysics-ask",order:40},ai)),Q("conversation.composer.dock",()=>Y({name:"conversation.composer.dock",id:"metaphysics-dock",order:60},ti));let te=!1;const ee=()=>{ce.ref||te||(te=!0,ce.seatOk["conversation.input.right"]||Y({name:"conversation.input.right",id:"metaphysics-ask",order:40},ai),ce.seatOk["conversation.composer.dock"]||Y({name:"conversation.composer.dock",id:"metaphysics-dock",order:60},ti))};let ve=20;const ke=()=>!!(ce.seatOk["conversation.input.right"]&&ce.seatOk["conversation.composer.dock"]),Te=()=>{ce.ref||ve<=0||ke()||(ve-=1,ee(),!ke()&&setTimeout(Te,700))};try{setTimeout(Te,700)}catch{}try{document.addEventListener("pointerdown",()=>{te=!1,ee()},{once:!0,capture:!0})}catch{}}return{inject:["slots"],apply(s){try{ms(s)}catch(o){console.error("[metaphysics] apply 异常",o)}}}}});
