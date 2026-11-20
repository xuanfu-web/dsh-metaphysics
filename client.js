window.__ModuleLoader__.load({id:"dsh-metaphysics",version:"0.86.0",factory(mt){const ut=(function(){try{return mt("react")}catch{return globalThis.React}})();if(!ut)return{inject:[],apply(){}};const l=ut.createElement,Tn={bazi:"client.chart.js",ziwei:"client.chart.js",hepan:"client.chart.js",trend:"client.chart.js",name:"client.name.js",fengshui:"client.fengshui.js",liuyao:"client.liuyao.js",meihua:"client.liuyao.js",qimen:"client.qimen.js",daliuren:"client.daliuren.js",tarot:"client.tarot.js",almanac:"client.almanac.js",convert:"client.convert.js",zeri:"client.zeri.js",chenggu:"client.chenggu.js",xiaoliuren:"client.xiaoliuren.js",qian:"client.qian.js",guanyin:"client.guanyin.js",star:"client.star.js",numerology:"client.numerology.js",mbti:"client.mbti.js",constitution:"client.constitution.js",wuyunliuqi:"client.wuyunliuqi.js",taiyi:"client.taiyi.js"},Cn={"client.chart.js":["core","interpret"],"client.name.js":["core"],"client.fengshui.js":["core"],"client.liuyao.js":["core","interpret"],"client.qimen.js":["core","interpret"],"client.daliuren.js":["core","interpret"],"client.tarot.js":["core","interpret"],"client.almanac.js":["core"],"client.convert.js":["core"],"client.zeri.js":["core"],"client.chenggu.js":["core"],"client.xiaoliuren.js":["core"],"client.qian.js":["core"],"client.guanyin.js":["core"],"client.star.js":["core"],"client.numerology.js":["core"],"client.mbti.js":["core"],"client.constitution.js":["core"],"client.wuyunliuqi.js":["core"],"client.taiyi.js":["core"]},Ei={core:"client.shared.js",interpret:"client.shared-interpret.js"},En=[{key:"general",label:"综合",dim:null,focus:""},{key:"wealth",label:"财运",dim:"work",focus:"钱财进出的落点主要看「工作与职业选择」与「事业发展」这两条。"},{key:"career",label:"事业",dim:"career",focus:"事业发展这条与你的问题最直接。"},{key:"love",label:"感情",dim:"love",focus:"感情这条与你的问题最直接。"},{key:"health",label:"健康",dim:"health",focus:"健康这条与你的问题最直接；下面只作提醒，不作任何诊断。"},{key:"study",label:"学业",dim:"career",focus:"学业与考试更贴近「事业发展」这条，讲的是长期积累与阶段进展。"},{key:"travel",label:"出行",dim:"overall",focus:"出行与迁动更贴近「整体运势」这条，看的是当下这一段的大环境。"}];window.__MP_VER="0.86.0",window.__MPGroups=[{title:"问一件事",hint:"心里有一件具体的事，起一卦再决定",items:[{k:"liuyao",label:"六爻",tip:"问一件具体事，最接地气"},{k:"tarot",label:"塔罗",tip:"抽牌看选择"},{k:"meihua",label:"梅花",tip:"见闻起卦"},{k:"xiaoliuren",label:"小六壬",tip:"掐指一算"},{k:"qian",label:"福签",tip:"今天抽一支"},{k:"guanyin",label:"灵签",tip:"一事一签，可重摇"}]},{title:"看一个人",hint:"看自己或身边人的性情与格局",items:[{k:"bazi",label:"八字",tip:"看这人一辈子的大盘"},{k:"ziwei",label:"紫微",tip:"分宫细看哪方面顺哪方面堵"},{k:"hepan",label:"合盘",tip:"两人合不合"},{k:"mbti",label:"人格",tip:"16 型问卷"},{k:"constitution",label:"体质",tip:"九种体质"},{k:"trend",label:"人生K",tip:"一生走势",wide:!0}]},{title:"查日子",hint:"挑时间、换农历，看一年的气与方位",items:[{k:"almanac",label:"黄历",tip:"今日宜忌"},{k:"zeri",label:"择日",tip:"挑好日子"},{k:"convert",label:"农历",tip:"公历农历"},{k:"wuyunliuqi",label:"运气",tip:"一年大势"},{k:"fengshui",label:"风水",tip:"房屋朝向"},{k:"name",label:"起名",tip:"八字选字"}]},{title:"古籍考据",hint:"古法三式与整年气运：偏研究向，日常咨询少用",items:[{k:"qimen",label:"奇门",tip:"看方位时机"},{k:"daliuren",label:"六壬",tip:"占事断来意"},{k:"taiyi",label:"太乙",tip:"积年推局"}]}],window.__MP_UNRELEASED=0;const W={};W.DIRECTIONS=En,W.compute=()=>{throw new Error("命理引擎尚未加载")};const _n=Object.create(null),dn=Object.create(null);function _i(s){return Tn[s]||Tn.bazi||"client.chart.js"}const Hn=()=>typeof performance<"u"&&performance.now?performance.now():Date.now(),On={},kt=Object.create(null);function Pn(s){if(On[s])return Promise.resolve();if(!kt[s]){const o=Ei[s];kt[s]=mt.async(`./${o}`).then(()=>{const A=globalThis.__MP_SHARED_READY__;if(!A||A[s]!==!0)throw new Error(`命理引擎共享分块 ${o} 未注册`);On[s]=!0}).catch(A=>{throw kt[s]=null,A})}return kt[s]}async function Hi(s){const o=Cn&&Cn[s]||["core"];await Pn("core"),o.includes("interpret")&&await Pn("interpret")}async function Oi(s){const o=_i(s);let A=_n[o];const U=!!A,ue=Hn();if(!A){if(!mt||typeof mt.async!="function")throw new Error("当前宿主不支持客户端分块加载（require.async 缺失），请升级 DeepSeek Harness");await Hi(o);let oe=dn[o];oe||(oe=mt.async(`./${o}`).then(se=>{const ae=se&&(se.Engine||se.default);if(!ae||typeof ae.compute!="function")throw new Error(`命理引擎分块 ${o} 未返回 Engine`);return _n[o]=ae,ae}),dn[o]=oe,oe.catch(()=>{}).then(()=>{delete dn[o]})),A=await oe}for(const oe of Object.keys(A))A[oe]!==void 0&&(W[oe]=A[oe]);return Array.isArray(W.DIRECTIONS)||(W.DIRECTIONS=En),window.Engine=W,window.__MP_ENGINE_READY__=!0,window.__MP_LAST_LOAD={tab:s,chunk:o,cached:U,ms:Math.round((Hn()-ue)*10)/10},W}window.__mpEnsureEngine=Oi,window.Engine=W,(function(){const s={liuyao:!0,meihua:!0,daliuren:!0,tarot:!0},o=C=>!!s[C],A={general:"other",wealth:"business",career:"career",love:"love",health:"other",study:"career",travel:"action"},U=C=>A[C]||"other",ue="#ffffff",oe="#1c1a15";function se(C){const B=String(C??"").match(/rgba?\(([^)]+)\)/i);if(!B)return null;const Q=B[1].split(/[,\s/]+/).filter(Boolean).map(Number);return Q.length<3||Q.slice(0,3).some(ie=>!Number.isFinite(ie))||Q.length>3&&Number.isFinite(Q[3])&&Q[3]<.95?null:[Q[0],Q[1],Q[2]]}function ae(C){const B=String(C||"").replace("#",""),Q=B.length===3?B.split("").map(ie=>ie+ie).join(""):B;return/^[0-9a-f]{6}$/i.test(Q)?[0,2,4].map(ie=>parseInt(Q.slice(ie,ie+2),16)):null}function xe(C){const B=Q=>{const ie=Q/255;return ie<=.03928?ie/12.92:Math.pow((ie+.055)/1.055,2.4)};return .2126*B(C[0])+.7152*B(C[1])+.0722*B(C[2])}function ze(C,B){const Q=xe(C),ie=xe(B),ke=Math.max(Q,ie),qe=Math.min(Q,ie);return(ke+.05)/(qe+.05)}function Ce(C){const B=typeof C=="string"?se(C):C;return B?ze(B,ae(ue))>=ze(B,ae(oe))?ue:oe:""}function G(C){const B=String(C??"").trim();if(!B)return{lines:null,warning:""};const Q=B.split(/[^0-9]+/).filter(Boolean).map(Number),ie=Q.filter(ke=>![6,7,8,9].includes(ke));return Q.length===6&&ie.length===0?{lines:Q,warning:""}:{lines:null,warning:Q.length!==6?`爻值需要正好 6 个数字（当前 ${Q.length} 个），本次按随机摇卦。`:`爻值只能是 6/7/8/9（收到 ${ie.join("/")}），本次按随机摇卦。`}}function ve(C){const B=String(C??"").trim();if(!B)return null;const Q=Number(B);return Number.isFinite(Q)?Q:null}function X(C){const B=C instanceof Date?C:new Date,Q=ie=>String(ie).padStart(2,"0");return`${B.getFullYear()}-${Q(B.getMonth()+1)}-${Q(B.getDate())}`}window.__MPCore={NEED_ASK:s,needAsk:o,parseLines:G,toNumber:ve,parseRGB:se,hexToRGB:ae,luminance:xe,contrastRatio:ze,pickOnColor:Ce,ON_DARK:ue,ON_LIGHT:oe,kindOfDirection:U,todayStamp:X}})(),(function(){const s=`
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
`,o=window.__PP=window.__PP||{};o.CSS=s;const A="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADwAQAAAAAWLtQ/AAALn0lEQVR42tWZMW8bWZaFv3qsFgtewSwvhN0OpGHBkUOFViKWBw429E/g/IIeddK9gLvrqdWBdxc70mSb2T/BP0AYF5WIWXeoSF1tM2gsBKjINuyiVXxng1ekKMkea8MpAaLAx3p8p+695557FIi/dxn+kZd3YyCdfXgL+o63vGAGjA2AVIPkOlV/INWb2UBtlZkEPQmphJ7qTpmkUhX3Bq6tsqcaOpKBn+Hnpa975V/ewlswkEMFQADAI79cggODLNSYOHpiIXyQEkREKQXIgmp/wOsXQE+Gml6JRXYCBwmTEeg7RKemAJWBajLV3UJa6agYSNVm5uiJjgwYWuTUYOWADChyR04OhnIVbHH9adYBbFYYihj6JYANAHYBqFYgqgkhgRjCJIY7MXHg4UUQQkieAhWtHBhDpwOtY34FjMMAvyYRJMDwYJZORhwkQDyNAIRsu267jqS9dtUtBlrpSEWvCIT/adWtuiPJtKtukbqwI+W9HCFDINxHcibNsRYjHGqSahdg1wcOS44N/YIjBh6vhsm9FndiyAHSV7hWBVlwPWDWQTfP5t+qBEZDmO6Mhp2N9EYil3B6CNXL08N3Z8X1ZYfPDsiyT5WBvcy4a8tmvpDa3aVbwuY1iOH+CkR/nays/ndyfZkC1teh3b67/vDPy5uHPoGm9jWdjXT8+hlMLbuQgAlc86kqL3h3VpRFDVWeAuTWgJkf1id3ZucwUjAowLglLIFfzlOsxQA2JATSIDBh4sGnCUkAIJsV3aot1Xqj/e1s/OZYqlR0q7YLhGxPKjvXI1Z2pDqQIQVKtJFy9KM20vERSvA1bTBQQBG7swJwZ0VpcSVENdRgSH5rcgN971N3HsLfQgxxDTYBCH64jFgoKCIM0YwZqQkTwAMzMRhS0hhU0y2Q/pbp/bm2s4v30itJtCt6Qg4IpFe13usX6ULnelVLFsjkH3RLrltlA7XrXqE9160y5YBkwEKIK6scURdY/3cCARhI4UuWIPmQfAkGDGz66l0koZ2n0SoYuEuQY+IoJYgaYFFKy/JnT3h5Rx+5ypakBR9uP53+fqyeJD132YIbm1e3utkf7LmOJLXr3nx5nsiuLspf/+g8gLr4WBHJ3uCIcOnv3aNPdiKz9uBJgonBw5un7WdbbDJlNDxIppPREIAh3X+fjIZs2AkGlZU9PfymrL46PQTgUP/7P1+dHuosP8fgIJcc5PPqcZBb6yiwtwIWBEvALIA9ArAGE0dp8vhOHD1JHvs7zNqDJ/dDs5bEnwe2v5EyYj+ZWtDGloX9ZPr1aHjAFNBK1NVAK52yJ7kozqSwU/YHe22VmUI5A5KbV06OgPzXwReQf7b7BwYIgqWPBZ78gBTDs7WE+zyLoxTM2oMU/jOO7t1//IzIfh6YNlIYKpna0VAb6XgEsy07ehY3AT0r4NCVVX566M6K8hTqk/y0rvyyWzznhs/9ttkn+Pzad5vQh4Y08CIHSNKmEYcE/5zA4yCO7Ggl+Jf+vRas/JsdrazeKhVjGL9GG1v2NczSMXQ20jHPmG1ZQioo//Q3d/a2/cc/UBdlR+8+tMpOTX3SxuiSF7R0fGtvo9fCRk6YMEkD8OwQJtiQMElB+9L0jbT9VG8kl42l59vZVD/JPZVuEbEte/RjJ2HMZTceH/0Yz7Z2MLizkxzelZTzR+5KSlTVJy+bKlF2HUF29EUTisvmdLNdGUz4ICUwS/E0MdiAMEkt0vZT/X7+vKeLBeP1NH1//ot7eiH0izSVpPrC68Kenrunkud21JYKSar6KgE6atcPM/n3fUgsUOW2BKhEfeJL6So7UADUn1TY+VyDLHLTBEBsgehJAyyIGjF7PdeC5Z6xtPloeJDyYf7ei56FIelC/g72Vjoqmtu0stqT9lxXkmlUg7t8qHJ1AdaVlye3f3d0CHabz5RB0RxwOVOT8E5MPL/lzloCoYmvK3MoW8WVdwwoncBBMp0sibHJaEgynYDmyrzsi0ySlaRisOc6ZV+GhTLP7RUmcI1m+ig9zLldqrqFFHbKxLfE+eZ1s3mjzKMnEI6jgQWI74cmjuJrwIKinV8HNtv6muHyM9xPppbhAdMJBuqTcw6XD/htWcHht1RfgVTFSdbym7eKtsWFnbIn01aZXK2toC4+GjE7B5wAgQFPe6lFqh/u6FiSFKjsWPSXbiUd76sa6wqMQK5jr0KV6p6ku11JtNVxSKoyHbuuShm8UnhXLlUCVc6hKynnuTbP7RebV6JzLWL8dhNY2IAB+NBsl/obrQHTB/4jXg5zZHkcbHLvWsQ6tsfNiO28fqZkauclHjO1r58pYewj9rJfu7LKobLnoIoqL+olYF7AwpTJfNT1wBrt8MP14nrUWgB7kFoMUbrcgRvyQ3JeyNWa1/dz1fr9J/U01S3IY7oDnWRq50OPkunOETHTP2GA6qXVu7LKWfB59dLDu8pr6WV6ZdyMWLIkk+a1JlV9aaVbZXPKdd2qP1BbVV94qtYvvVpzwlavvniv55pdCGk7u3h//stynFx28f5c299JyK32isFee3m57hWDPbe+mcng6uI6rXmVflbMgSm7HhLZG7S3fO0uGtVaEluiK205iRuBFNzCKfoAMGPEixRGvNB3jH6GWUOahSSVmZ/bB2rXm9lgTyqzhs8tzMUsEnWRNwX3Ke2Q2xv63ItZH6vUXB7NN6o04U68aFQhRLcAdpAwGQ3pbk0Yer/loGsnIw5gAt5j2XNR3Nee91tWom4xmHdg77E4yG3mgMy/o4+xw43rcvNEe2FHxUDh5eYhUUwcrLC2/pDH/xUTt7hzN4lbRBDfRsZufT1q+vD+xtbXo+HBLJ2ANrYAuShOBvM+HMX9wV676hZSHcWZvIzNLvtwbrPLGH7enTML8ygIzFyZY/2MGRKsrW/dB+D+yj/9Zf3e/ZXVMLkHrK3b28jY6Q5DzxHxbMtCJ5nujIbxLAVDRfWSQ6heQlV75Ve9PD2s6oJGxtrvAeySmrVX9PkPnxw8fEMCUusJbwEvAbSvaqxjqRpL++5bSfvdavzmeL/ObiFjm6zY2NqBzkYKzzy8mKldlIE7e/tbx7770IK6qk/aH6M9LTHe/8tuNWGS2sCECewSJumc1ZfGc2l/O5OOvU59rtqP5x8b7t9LXsbKEUhu/WFfjTnh1h9mA3WkQgYmKMWdneSNIeEVu6qmiH5u9OsVN/bV4uT51cb7aOm3DcG7sWvrDxpDArO2ni6sqcZQUX0hSTN/5rm5YvhAtxC82gurktQQlS963y9IVBWqydxqTwMvXfdW1jcX+pyqRYvc1YUfOUDurLjU52U4d2ObPmyvhKT4smlg8z68tGy9G5uUZi1pRg6CO3fXvT6P+ZQFdqkd0l+TqIIZDJFlNITZZDR8oe8mCzdWKjPtqe5psCeV/cFeu9rsL9xYqeypparrl5NHP7SrOMluurGyVxuVW/R7ezlL7XqOMGrcWKKUkDAhCSF6koRR+OAJn3JjL4EtWvtoeJBMGXGwsQVDEiaXNVbC6eE3ZWVP+ebsxHKokvOrbqwuvResu8Hn9tNFtOjDQfAxrRjD/cd34ii9z521BymPTcy9zwHDtWpwgeqedCxp/Oa4Uz/cke52NW4IG0NdwCFwfnpY1Sfn8K7kHBQ4AtdS1ZVakorUtKs4yVzYUZEZuO7GXm1UTTpUXWnPjxztKu77/0Bo4cYuHW2/fjiW9rsaK9CuLON/rT5FPWkORNpIx35uf/3MU6A2tnYaN7aM3VlR+rm9qN3ZyUtwZycvMSQlvFiKiLeZ7VztxW/nbiwfmeRVzgu4kFzTjTf7kos2+0IVvRLpD9lYUk/jN8fafjqWtP3tWIFm4TXperMLtmC2ZY/QxtbO0Y/xbMseeVY3BBZCqE/yBoxvVxdVfZITQkpDNFoyJF798EWTY5uwuRQrD+zRosZWIce7K57VGz73fotk25LcU72Rtp9O3/z03D2V/33bRvWPt/x/KhtxdPq9XUoAAAAASUVORK5CYII=",U=e=>String(e).padStart(2,"0");function ue(e){const n=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e||""));if(!n)return!1;const i=Number(n[1]),p=Number(n[2]),r=Number(n[3]);if(p<1||p>12||r<1)return!1;const c=[31,i%4===0&&i%100!==0||i%400===0?29:28,31,30,31,30,31,31,30,31,30,31];return r<=c[p-1]}function oe(e){const n=/^(\d{4})\s*[年./-]\s*(\d{1,2})\s*[月./-]\s*(\d{1,2})\s*日?$/.exec(String(e||"").trim());if(!n)return"";const i=`${n[1]}-${U(n[2])}-${U(n[3])}`;return ue(i)?i:""}function se(e){const n=String(e||"").trim();if(/^\d{0,4}(-\d{0,2}){0,2}$/.test(n))return n;if(/[年月日/.]/.test(n)){const p=oe(n);if(p)return p}const i=n.replace(/\D/g,"").slice(0,8);return i.length<=4?i:i.length<=6?`${i.slice(0,4)}-${i.slice(4)}`:`${i.slice(0,4)}-${i.slice(4,6)}-${i.slice(6)}`}function ae(e){try{return JSON.parse(window.localStorage.getItem(e)||"null")}catch{return null}}function xe(e,n){try{window.localStorage.setItem(e,JSON.stringify(n))}catch{}}function ze(e){let n=2166136261;for(let i=0;i<e.length;i+=1)n^=e.charCodeAt(i),n=Math.imul(n,16777619)>>>0;return(n>>>0).toString(36)}function Ce(e){const n=new Date(e);if(Number.isNaN(n.getTime()))return"";const i=r=>new Date(r.getFullYear(),r.getMonth(),r.getDate()).getTime(),p=Math.round((i(new Date)-i(n))/864e5);return p<=0?"今天":p===1?"昨天":`${U(n.getMonth()+1)}-${U(n.getDate())}`}function G(){const e=new Date;return{date:`${e.getFullYear()}-${U(e.getMonth()+1)}-${U(e.getDate())}`,time:`${U(e.getHours())}:${U(e.getMinutes())}`}}o.isoDateOk=ue,o.normalizeDateText=oe,o.maskDateText=se,o.storeGet=ae,o.storeSet=xe,o.hash36=ze,o.dayLabel=Ce,o.nowParts=G;const ve=".mp-askfree,.mp-askbox,.mp-askblock,.mp-askonly";o.ASK_FREE=ve,o.lockParams=function(e,n){if(!e||!e.querySelectorAll)return 0;let i=0;return e.querySelectorAll("input, select, textarea").forEach(p=>{if(p.closest(ve)){p.disabled=!1,p.readOnly=!1;return}p.tagName==="SELECT"||p.type==="checkbox"||p.type==="radio"||p.type==="button"?p.disabled=!!n:p.readOnly=!!n,i++}),i};const X={主星:"main",吉星:"good",煞星:"bad",辅星:"aux",杂曜:"minor"},C={禄:"lu",权:"quan",科:"ke",忌:"ji"},B=new Set(["三台","八座","恩光","天贵"]),Q={庙:"good",旺:"good",得:"mid",利:"mid",平:"mid",不:"bad",陷:"bad"},ie={巳:[1,1],午:[1,2],未:[1,3],申:[1,4],辰:[2,1],酉:[2,4],卯:[3,1],戌:[3,4],寅:[4,1],丑:[4,2],子:[4,3],亥:[4,4]},ke={乾:[1,1,1],兑:[1,1,0],离:[1,0,1],震:[1,0,0],巽:[0,1,1],坎:[0,1,0],艮:[0,0,1],坤:[0,0,0]},qe=["初爻","二爻","三爻","四爻","五爻","上爻"],a=e=>String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),aa=(e,n,i)=>{const f=Math.round(43),u=e?`<rect x="0" y="${2.5}" width="104" height="7" rx="${1.6}" fill="currentColor"/>`:`<rect x="0" y="${2.5}" width="${f}" height="7" rx="${1.6}" fill="currentColor"/><rect x="${f+18}" y="${2.5}" width="${104-f-18}" height="7" rx="${1.6}" fill="currentColor"/>`;return`<svg class="mp-hex${n?" hex-on":""}${i?" "+i:""}" viewBox="0 0 104 12" preserveAspectRatio="none" aria-hidden="true" focusable="false">${u}</svg>`},Tt={木:"M6 1.6V10.8M6 5.2 2.6 2.2M6 7.4 9.4 4.4",火:"M6 1.4C7.6 3.6 9.2 5.4 9.2 7.6A3.2 3.2 0 0 1 2.8 7.6C2.8 5.4 4.4 3.6 6 1.4Z",土:"M1.6 9.6h8.8M6 2.4v7.2M3.4 5.6h5.2",金:"M6 1.2 10.6 6 6 10.8 1.4 6Z",水:"M1.4 7.2C2.9 4.2 4.5 10.2 6 7.2 7.5 4.2 9.1 10.2 10.6 7.2"},la=e=>{const n=Tt[e];return n?`<svg class="mp-wxi" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="${n}" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`:""},Za=e=>`<svg class="mp-trig" viewBox="0 0 14 10" aria-hidden="true" focusable="false">${(ke[e]||[0,0,0]).slice().reverse().map((p,r)=>{const d=r*4;return p?`<rect x="0" y="${d}" width="14" height="2" rx="0.6" fill="currentColor"/>`:`<rect x="0" y="${d}" width="5.6" height="2" rx="0.6" fill="currentColor"/><rect x="8.4" y="${d}" width="5.6" height="2" rx="0.6" fill="currentColor"/>`}).join("")}</svg>`;o._hexBar=aa,o._wxIcon=la,o._triGlyph=Za;function ta(e,n,i){return!e||!e.length?"":e.map(p=>{const r=X[p.type]||"aux",d=p.mutagen?`<i class="pp-m ${C[p.mutagen]}">${p.mutagen}</i>`:"",c=n&&n[p.name],m=c?`<i class="pp-m view ${C[c]}">${c}</i>`:"",g=p.brightness?`<em class="pp-b ${Q[p.brightness]||"mid"}">${p.brightness}</em>`:"",f=p.inTemple?'<em class="pp-b good">庙</em>':"",u=i&&i[p.name]?Va(i[p.name],p.name):"",h=B.has(p.name)?" st-sbg":"";return`<span class="pp-st ${r}${h}">${u}${p.name}${g}${f}${d}${m}</span>`}).join("")}function Ct(e){const n=[];for(let i=0;i<6;i++)n.push(e+i*12);return n.join(",")}const Ve=["命宫","兄弟","夫妻","子女","财帛","疾厄","迁移","交友","官禄","田宅","福德","父母"],He=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],Ne=e=>(e%12+12)%12,Et=(e,n)=>e!==n&&[Ne(n+4),Ne(n+8),Ne(n+6)].includes(e);function Ka(e,n,i,p,r,d,c,m){const g=ie[e.branch]||[1,1],f=He.indexOf(e.branch),u=["pp-cell"];f===n?u.push("pp-soul"):Et(f,n)&&u.push("pp-tri"),e.isBody&&u.push("pp-shen"),m&&e.branch===m&&u.push("pp-laiyin"),g[0]===4&&u.push("pp-lastrow"),g[1]===4&&u.push("pp-lastcol");const h=e.shensha||{},$=Ve[Ne(n-f)];let T="";if(f===n&&p){const L=E=>(X[E.type]||"")==="main";if(!(e.stars||[]).some(L)){const E=p.find(F=>He.indexOf(F.branch)===Ne(f+6)),re=E?(E.stars||[]).filter(L):[];re.length&&(T=`<div class="pp-borrow" title="命宫无主星，借对宫（迁移宫）主星">借 ${re.map(F=>F.name).join(" ")}</div>`)}}return`<div class="${u.join(" ")}" data-pi="${f}" data-view="${i}" role="button" tabindex="0" aria-expanded="false" style="grid-row:${g[0]};grid-column:${g[1]}">
      <div class="pp-stars">${ta(e.stars,r,Na(e))}</div>
      ${T}
      <div class="pp-ages">${Ct(e.xiaoxian.age)}</div>
      ${_t(e,d)}
      ${Wa(e,c)}
      <div class="pp-foot">
        <div class="ft-l">
          <span class="ft-dx"><span class="pp-ss-txt">${h.boshi}</span> ${e.daxian.start}-${e.daxian.end}</span>
          <span class="pp-ss-txt">${h.jiangqian}</span>
          <span class="pp-ss-txt">${h.suiqi}</span>
        </div>
        <div class="ft-r">
          <span class="pp-ss-txt">${h.changsheng}</span>
          <span>${e.ganzhi}</span>
          <span class="ft-pn">${$}</span>
        </div>
      </div>
    </div>`}function Va(e,n){return`<span class="pp-zha ${C[e]}" title="自化${a(e)}：${a(n)}·宫干化回本宫"><svg class="z-a" viewBox="0 0 22 9" role="img" aria-label="自化${a(e)}">
        <path class="z-shaft" d="M1 7C6.6 7 11.4 5.6 17.2 3.2"/>
        <path class="z-head" d="M20.2 2 17.8 4.9 16.6 1.9Z"/>
      </svg></span>`}o._zhaMark=Va;function Na(e){const n={};for(const i of e.selfHua||[])!i||!i.star||!C[i.type]||n[i.star]||(n[i.star]=i.type);return n}function _t(e,n){const i=n&&n[e.branch]||[];if(!i.length)return"";const p=i.map(r=>`<i class="${C[r.type]||""}" title="${a(r.star)}化${a(r.type)}">${a(r.type)}<em>→${a(r.palace||"未上盘")}</em></i>`).join("");return`<div class="pp-fx">${a(e.ganzhi)}宫干 ${p}</div>`}function Wa(e,n){const i=n&&n[e.branch]||null;return i?`<div class="pp-hs">${Object.entries(i).map(([r,d])=>`<i>${a(r)}<em>${a(d)}</em></i>`).join("")}</div>`:""}function Ja(e){try{const n=window.Engine||window.__PP&&window.__PP.Engine;if(!n||!n.buildBazi||!e.input)return"";const i=n.buildBazi({year:e.input.year,month:e.input.month,day:e.input.day,hour:e.input.hour,minute:e.input.minute,gender:e.input.gender,trueSolar:!1});return["year","month","day","hour"].map(p=>i.pillars[p].ganzhi).join(" ")}catch{return""}}function Aa(e){try{const n=window.Engine||window.__PP&&window.__PP.Engine;return!n||!n.buildBazi||!e.input?null:n.buildBazi({year:e.input.year,month:e.input.month,day:e.input.day,hour:e.input.hour,minute:e.input.minute,gender:e.input.gender,trueSolar:!1}).pillars.day.stem}catch{return null}}o.ziweiHTML=function(e){const n=He.indexOf(e.soul.branch),i=e.liunian&&e.liunian[0]||null,p=i?i.age:1,r=e.palaces.find(w=>p>=w.daxian.start&&p<=w.daxian.end)||e.palaces[0],d=He.indexOf(r.branch),c=i?He.indexOf(i.lifePalace.branch):n,m=w=>{const z={};for(const q of w||[])q&&q.star&&(z[q.star]=q.type);return z},g=(e.daxianList||[]).find(w=>w.branch===r.branch)||null,f={da:m(g&&g.mutagenHits),ln:m(i&&i.mutagenHits)},u={};for(const w of e.daxianList||[])u[w.branch]=w.mutagenHits||[];const h=(()=>{const w=Aa(e);if(!w)return null;const z=(e.daxianList||[]).find(pe=>pe.stem===w);if(!z)return null;const q={};for(const pe of e.palaces)for(const le of pe.stars||[])le.name in q||(q[le.name]=pe.branch);return{stem:w,items:(z.mutagenHits||[]).map(pe=>({type:pe.type,star:pe.star,branch:q[pe.star]||null,palace:q[pe.star]?(e.palaces.find(le=>le.branch===q[pe.star])||{}).palace:null}))}})();let $=null;if(i){$={};for(const[w,z]of Object.entries(i))/^(流|年解)/.test(w)&&typeof z=="string"&&He.includes(z)&&($[z]=$[z]||{},$[z][w]=z)}const T={da:g&&g.yunStars?(()=>{const w={};for(const[z,q]of Object.entries(g.yunStars))(w[q]=w[q]||{})[z]=q;if(g.yunSuiqi)for(const[z,q]of Object.entries(g.yunSuiqi))(w[q]=w[q]||{})[z]=q;if(g.yunJiangqian)for(const[z,q]of Object.entries(g.yunJiangqian))(w[q]=w[q]||{})[z]=q;return w})():null,ln:$};if(e.liunian&&e.liunian.length){const w=e.liunian.find(z=>z.ganzhi===(e._lnSel||e.liunian[0].ganzhi))||e.liunian[0];if(w.lnSuiqi)for(const[z,q]of Object.entries(w.lnSuiqi))($[q]=$[q]||{})[z]=q;if(w.lnJiangqian)for(const[z,q]of Object.entries(w.lnJiangqian))($[q]=$[q]||{})[z]=q}const L=(w,z)=>e.palaces.map(q=>Ka(q,w,z,e.palaces,f[z]||null,u,T[z]||null,e.laiyin&&e.laiyin.branch)).join(""),E=(w,z)=>`<div class="pp-center">
        ${z==="da"?`<div class="ct-t1">大限 ${r.ganzhi}　${r.daxian.start}-${r.daxian.end}岁</div>`:z==="ln"&&i?`<div class="ct-t1">流年 ${i.ganzhi}　${i.age}岁</div>`:`<div class="ct-t1">${e.daxian.rule.slice(0,2)}　${e.bureau.name}</div>`}
        <div class="ct-t2">公历 ${e.input.year}-${String(e.input.month).padStart(2,"0")}-${String(e.input.day).padStart(2,"0")} ${String(e.input.hour).padStart(2,"0")}:${String(e.input.minute).padStart(2,"0")}</div>
        <div class="ct-t2">农历 ${e.lunar.year}年${e.lunar.isLeap?`闰${e.lunar.monthRaw||e.lunar.month}`:e.lunar.month}月${e.lunar.day}日${e.hourBranch}时${e.lunar.isLeap&&e.lunar.monthRaw&&e.lunar.month!==e.lunar.monthRaw?`（按${e.lunar.month}月起盘）`:""}</div>
        ${Ja(e)?`<div class="ct-t3">${Ja(e)}</div>`:""}
        ${e.nonJieqi?`<div class="ct-t3 ct-t3nj" title="${a(e.nonJieqi.note)}">${e.nonJieqi.year} ${e.nonJieqi.month} ${e.nonJieqi.day} ${e.nonJieqi.hour}<em class="nj-tag">非节气</em></div>`:""}
        <div class="ct-t4">命主 ${e.lifeMaster}${e.lifeMasterNote?`<span class="pp-dim" title="${a(e.lifeMasterNote)}">＊</span>`:""}　身主 ${e.bodyMaster}${e.bodyMasterNote?`<span class="pp-dim" title="${a(e.bodyMasterNote)}">＊</span>`:""}</div>
        <div class="ct-t4">命宫 ${e.soul.branch}　身宫 ${e.body.branch}　五行局 ${e.bureau.name}</div>
        <div class="ct-t4">子年斗君 ${e.doujun?e.doujun.zinian:"—"}　流年斗君 ${i&&i.doujun?i.doujun:"—"}</div>
        <div class="ct-t4">紫微 ${e.ziwei}　天府 ${e.tianfu}　${z==="da"?"大限命宫 "+He[d]:z==="ln"?"流年命宫 "+He[c]:"本命命宫 "+e.soul.branch}</div>
        ${z==="da"||z==="ln"?`<div class="ct-t4 pp-viewhua">${z==="da"?"大限":"流年"}四化　${(z==="da"?f.da:f.ln)&&Object.keys(z==="da"?f.da:f.ln).length?Object.entries(z==="da"?f.da:f.ln).map(([pe,le])=>`${pe}化${le}`).join("　"):'<span class="pp-dim">未飞四化</span>'}</div>`:""}
        <div class="pp-legend"><span class="pp-m lu">禄</span><span class="pp-m quan">权</span><span class="pp-m ke">科</span><span class="pp-m ji">忌</span><span>实心=生年四化　空心=大限/流年四化　箭头=自化　红框=命宫　浅底=三方四正</span></div>
      </div>`,re=w=>{const z=w==="da"?`大限 ${r.ganzhi}`:w==="ln"&&i?`流年 ${i.ganzhi}`:"本命",q=(Ja(e)||"").split(" ")[0]||"";return`<div class="pp-cal"><b class="cal-sc"></b><span class="cal-sep">·</span><span>${z}</span>${q?`<span class="cal-sep">·</span><span>${e.input.year} ${q}</span>`:""}</div>`},F=(w,z,q)=>`<div class="pp-body ${w}" data-view="${q}" data-soul="${z}">${re(q)}<div class="pp-grid">${L(z,q)}${E(z,q)}</div><div class="pp-detail"></div></div>`,P=e.changqu,te=P?`<div class="pp-chips">
      <span class="pp-chip">昌 ${P.wenchang.branch}（${P.wenchang.palace}）</span>
      <span class="pp-chip">曲 ${P.wenqu.branch}（${P.wenqu.palace}）</span>
      <span class="pp-chip">${P.relation}</span>
      <span class="pp-chip">入命三方 ${P.inSoulSanfang?"是":"否"}</span>
      <span class="pp-chip ${P.absorb.label==="杂"?"warn":"ok"}">吸收·${P.absorb.label}</span>
    </div>`:"",K=(e.patterns||[]).length?`<div class="pp-chips">${e.patterns.map(w=>{const z=w.status==="broken"&&Array.isArray(w.breaks)&&w.breaks.length,q=`${w.evidence||""}${z?`；破格：${w.breaks.join("；")}`:""}`;return`<span class="pp-chip ${z?"broken":w.tone==="good"?"ok":w.tone==="bad"?"warn":""}" title="${a(q)}">${w.name}${z?"（破格）":""}</span>`}).join("")}</div>`:"",O=(e.daxianList||[]).length?`<div class="pp-chips">${e.daxianList.slice(0,8).map(w=>`<span class="pp-chip" title="${a(`${w.ganzhi} 宫干四化：`+w.mutagenHits.map(z=>`${z.star}化${z.type}→${z.palace||"未上盘"}`).join("、"))}">${w.branch} ${w.ages[0]}-${w.ages[1]}</span>`).join("")}</div>`:"",J=i&&i.mutagenHits&&i.mutagenHits.length?`<div class="pp-chips">${i.mutagenHits.map(w=>`<span class="pp-chip ${w.type==="忌"?"warn":w.type==="禄"?"ok":""}">${w.star}化${w.type}→${w.palace||"未上盘"}</span>`).join("")}</div>`:"",V=e.zuoyao,Le=V?V.placed&&V.placed.length?`<div class="pp-sec"><div class="pp-sec-h">杂曜全表 · 已排 ${V.placed.length} 颗（${V.starTotal} 颗盘）</div>
        <div class="pp-chips">${V.placed.map(w=>`<span class="pp-chip${w.inTemple?" ok":""}" title="${a(w.meaning||"")}">${a(w.name)} ${a(w.branch)}（${a(w.palace)}）${w.inTemple?"·庙":""}</span>`).join("")}</div>
        <details class="pp-zy"><summary>逐颗安星诀（${V.placed.length} 条 · 出多处近代通行辑本并核，属通行说，不是《全书》原文）</summary><div class="pp-zy-v">${a(V.verses).replace(/\n/g,"<br>")}</div></div></details>
        ${V.skipped&&V.skipped.length?`<div class="pp-zy-s">${V.skipped.map(w=>a(w)).join("")}</div>`:""}</div>`:`<div class="pp-sec"><div class="pp-sec-h">杂曜 · 本盘 ${V.starTotal} 颗（通行简盘）</div>
        <div class="pp-zy-s">开「杂曜全表」追加十二颗：解神·天巫·天月·阴煞（生月）／天官·天福·天厨（生年干）／蜚廉·天德·年解（生年支）／天才（命宫＋生年支）·天寿（身宫＋生年支）。${V.skipped&&V.skipped.length?`不另立：${V.skipped.map(w=>a(w)).join("")}`:""}</div></div>`:"",Me=e.flyChains?(()=>{const w=["禄","权","科","忌"].map(z=>{const q=e.flyChains[z];if(!q||!q.steps.length)return"";const pe=q.path.map(ce=>String(ce).replace(/宫$/,"")).join("→"),le=q.steps.map(ce=>`${ce.from}（${ce.fromStem}）化${z}${ce.star}→${ce.to}`).join("；");return`<span class="pp-chip ${z==="忌"?"warn":z==="禄"?"ok":""}" title="${a(le)}">飞${z} ${a(pe)}${q.closed?"↺":""}</span>`}).join("");return w?`<div class="pp-chips">${w}</div>`:""})():"",Z=e.flyComposite&&Array.isArray(e.flyComposite.labels)&&e.flyComposite.labels.length?`<div class="pp-chips">${e.flyComposite.labels.map(w=>{const z=/忌/.test(w)?"warn":/自化/.test(w)?"":"ok",q=y=>String(y).replace(/^.*?会/,"").replace(/^禄忌同宫/,"").replace(/自化$/,""),pe=(e.flyComposite.targets||[]).find(y=>y.palace===q(w)),le=pe?pe.incoming.map(y=>`${y.from}化${y.type}${y.star}`).join("、"):e.flyComposite.note;return`<span class="pp-chip ${z}" title="${a(le)}">三方四正 ${a(w)}</span>`}).join("")}</div>`:"",he=e.flow,ne=he?(()=>{const w=le=>(le.mutagenHits||[]).length?le.mutagenHits.map(y=>`<i>${y.star}化${y.type}<em>→${y.palace||"未上盘"}</em></i>`).join(""):'<i class="dim">宫干无四化</i>',z=(le,y,ce,S)=>`<div class="flow-row" data-t="${le}"><b>${y}</b><span class="flow-p"><span class="flow-k">${ce.ganzhi||"—"}　落${ce.palace||"未上盘"}（${ce.branch}）</span>${S?`<em class="flow-same">${S}</em>`:""}</span><span class="flow-m">${w(ce)}</span></div>`,pe=he.day.branch===he.month.branch?"（日数走满一圈，故同宫）":"";return`<div class="pp-flow">
        <div class="flow-row"><b>基准</b><span class="flow-p">${he.asOf.solar}</span><span class="flow-m">农历 ${he.asOf.lunar}　流年 ${he.asOf.yearGanzhi}（斗君 ${he.year.doujun}）</span></div>
        ${z("month",`流月 ${he.month.index} 月`,he.month)}
        ${z("day",`流日 ${he.day.index} 日`,he.day,pe)}
        ${z("hour",`流时 ${He[he.hour.hourIndex]}时`,he.hour)}
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
      ${he?'<input type="checkbox" id="ppm-t-month" class="pp-r"><input type="checkbox" id="ppm-t-day" class="pp-r"><input type="checkbox" id="ppm-t-hour" class="pp-r">':""}
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
      ${he?`<div class="pp-modes pp-time">
        <label for="ppm-t-month">＋流月</label><label for="ppm-t-day">＋流日</label><label for="ppm-t-hour">＋流时</label>
        <span class="pp-soon">要落到这个月这几天，再往下一层</span>
      </div>`:""}
      <div class="pp-modes pp-schools">
        <label for="ppm-sc-sihe">四化</label><label for="ppm-sc-feixing">飞星</label><label for="ppm-sc-sanhe">三合</label>
      </div>
      ${F("ben",n,"ben")}
      ${F("da",d,"da")}
      ${F("ln",c,"ln")}
      ${(()=>{if(!h)return"";const w={禄:"rl",权:"rq",科:"rk",忌:"rj"},z=h.items.map(q=>`<i><em class="${w[q.type]||""}">${q.type}</em>${a(q.star)}<em>${a(q.branch||"?")}${q.palace?`·${a(q.palace)}`:""}</em></i>`).join("");return`<div class="pp-rigan"><b>日干${a(h.stem)}四化</b>${z}</div>`})()}      ${(()=>{if(!h)return"";const w={禄:"rl",权:"rq",科:"rk",忌:"rj"},z=h.items.map(q=>`<i><em class="${w[q.type]||""}">${q.type}</em>${a(q.star)}<em>${a(q.branch||"?")}${q.palace?`·${a(q.palace)}`:""}</em></i>`).join("");return`<div class="pp-rigan"><b>日干${a(h.stem)}四化</b>${z}</div>`})()}
      <div class="pp-zhlegend">自化图示　<span class="z-lu">${o._zhaMark("禄","本宫")}禄</span><span class="z-quan">${o._zhaMark("权","本宫")}权</span><span class="z-ke">${o._zhaMark("科","本宫")}科</span><span class="z-ji">${o._zhaMark("忌","本宫")}忌</span></div>
      <div class="pp-flywrap">${Me}${Z}</div>
      ${ne}
    </div>${te}${K}${O}${J}${Le}`};function da(e){return e.length?e.map(n=>{const i=X[n.type]||"aux",p=n.brightness?`<em class="dt-br ${Q[n.brightness]||"mid"}">${n.brightness}</em>`:"",r=n.inTemple?'<em class="dt-br good">庙</em>':"",d=n.mutagen?`<i class="pp-m ${C[n.mutagen]}">${n.mutagen}</i>`:"";return`<span class="dt-st ${i}">${n.name}${p}${r}${d}</span>`}).join(""):'<span class="dt-empty">无</span>'}function Ht(e,n){const i=o._zw;if(!i)return"";const p=O=>i.palaces.find(J=>He.indexOf(J.branch)===O),r=p(e)||i.palaces.find(O=>He.indexOf(O.branch)===e);if(!r)return"";const d=He.indexOf(r.branch),c=Ve[Ne(n-d)],m=r.shensha||{},g=r.stars.filter(O=>O.type==="主星"),f=r.stars.filter(O=>O.type==="吉星"||O.type==="辅星"),u=r.stars.filter(O=>O.type==="煞星"),h=r.stars.filter(O=>!["主星","吉星","辅星","煞星"].includes(O.type)),$=(r.selfHua||[]).length?r.selfHua.map(O=>`<span class="dt-self">${Va(O.type,O.star||"本宫")}${a(O.star||"")}</span>`).join(""):'<span class="dt-empty">无</span>',T=[Ne(d+4),Ne(d+8),Ne(d+6)].map(O=>{const J=p(O),V=Ve[Ne(n-O)],Le=J?J.stars.filter(Z=>Z.type==="主星").map(Z=>Z.name).join("、"):"",Me=O===Ne(d+6)?"对宫":"三合";return`<span class="dt-st">${V}[${He[O]}]<b>${Le||"无主星"}</b><em>${Me}</em></span>`}).join(""),L=p(Ne(d+6)),E=L?L.stars.filter(O=>O.type==="主星"):[],re=g.length?da(g):`<span class="dt-empty">无主星</span><span class="dt-tri">　借对宫 <b>${E.length?E.map(O=>O.name).join("、"):"亦无主星"}</b></span>`,F=(O,J)=>`<div class="dt-dr"><span class="dt-k">${O}</span><div class="dt-v">${J}</div></div>`,P=Ve.length,te=Ne(n-d),K=Ve.map((O,J)=>{const V=Ne(d+(J-te+P)%P);return`<span class="dt-st">${Ve[J]}[${He[V]}]</span>`}).join("");return`<div class="dt-dh">
        <b>${c}</b><span>${r.branch}宫 · ${r.ganzhi}</span>
        <span>大限 ${r.daxian.start}-${r.daxian.end}</span>
        <span>小限起 ${r.xiaoxian.age} 岁</span>
        ${r.isBody?"<span>· 身宫</span>":""}
        <span class="dt-x" data-pp-close="1">收起</span>
      </div>
      ${F("主星",re)}
      ${F("吉辅",da(f))}
      ${u.length?F("煞星",da(u)):""}
      ${h.length?F("杂曜",da(h)):""}
      ${F("宫干四化",$)}
      ${F("十二神",`<span class="dt-tri">长生 ${m.changsheng||"—"}　博士 ${m.boshi||"—"}　将前 ${m.jiangqian||"—"}　岁前 ${m.suiqi||"—"}</span>`)}
      ${F("三方四正",`<span class="dt-tri">${T}</span>`)}
      ${F("太极转换",`<span class="dt-tri dt-taiji">以${c}[${r.branch}]立太极${K}</span>`)}
      <div class="hint">三方四正在盘上已同步标出（浅红描边）。再点一次本宫可收起。</div>`}function ft(e){e.querySelectorAll(".pp-cell.pp-sel,.pp-cell.pp-link").forEach(n=>{n.classList.remove("pp-sel"),n.classList.remove("pp-link")}),e.querySelectorAll('.pp-cell[aria-expanded="true"]').forEach(n=>n.setAttribute("aria-expanded","false"))}const Xa={};function Qa(e,n){La(e);const i=e.querySelector(".pp-grid");if(!i)return;const p=[n,(n+6)%12,(n+4)%12,(n+8)%12],r=g=>{const f=e.querySelector('.pp-cell[data-pi="'+g+'"]');if(!f)return null;const u=Number(f.style.gridRow),h=Number(f.style.gridColumn),$=Math.min(75,Math.max(25,(u-.5)*25));return h===1?[25,$]:[75,$]},d=p.map(r);if(d.some(g=>!g))return;const c=document.createElementNS("http://www.w3.org/2000/svg","svg");c.setAttribute("class","pp-sf"),c.setAttribute("viewBox","0 0 100 100"),c.setAttribute("preserveAspectRatio","none");const m=(g,f,u,h)=>{const $=document.createElementNS("http://www.w3.org/2000/svg","line");$.setAttribute("x1",g),$.setAttribute("y1",f),$.setAttribute("x2",u),$.setAttribute("y2",h),c.appendChild($)};m(d[0][0],d[0][1],d[1][0],d[1][1]),m(d[1][0],d[1][1],d[2][0],d[2][1]),m(d[2][0],d[2][1],d[3][0],d[3][1]),m(d[3][0],d[3][1],d[0][0],d[0][1]);for(let g=0;g<4;g++){const f=document.createElementNS("http://www.w3.org/2000/svg","circle");f.setAttribute("cx",d[g][0]),f.setAttribute("cy",d[g][1]),f.setAttribute("r",g===0?.9:.7),g===0&&f.setAttribute("style","fill:var(--red);opacity:.85"),c.appendChild(f)}i.style.position="relative",i.appendChild(c)}function La(e){const n=e.querySelector("svg.pp-sf");n&&n.remove()}const Ta=["ppm-d-ss","ppm-d-sbg","ppm-d-zha","ppm-d-ages","ppm-d-sizhu","ppm-d-rigan","ppm-d-njq","ppm-d-tjz","ppm-d-small","ppm-d-shen","ppm-d-hua","ppm-d-sf","ppm-d-laiyin","ppm-d-zha-bold","ppm-d-bad-ink","ppm-d-bold","ppm-d-hs"],et={simple:["ppm-d-hua","ppm-d-shen"],std:["ppm-d-ss","ppm-d-sbg","ppm-d-zha","ppm-d-ages","ppm-d-sizhu","ppm-d-small","ppm-d-shen","ppm-d-hua","ppm-d-sf","ppm-d-laiyin"],expert:Ta.slice()};function Ot(e,n){const i=et[e];if(!i||typeof document>"u")return!1;const p=n&&n.querySelector?n:document;return Ta.forEach(r=>{const d=p.querySelector("#"+r);d&&(d.checked=i.indexOf(r)>=0)}),p.querySelectorAll("[data-pp-preset]").forEach(r=>{r.classList.toggle("on",r.getAttribute("data-pp-preset")===e)}),!0}o.DISP_PRESETS=et,o.DISP_ALL=Ta,o.applyDispPreset=Ot;function We(){if(We.done||typeof document>"u"||!document.addEventListener)return;We.done=!0;const e=n=>{const i=n.closest(".pp-body");if(!i)return;const p=i.querySelector(".pp-detail");if(!p)return;if(n.classList.contains("pp-sel")){ft(i),La(i),p.classList.remove("open"),p.innerHTML="";return}ft(i);const r=Number(n.dataset.pi),d=Number(i.dataset.soul);Qa(i,r),i.querySelectorAll(".pp-cell").forEach(m=>{const g=Number(m.dataset.pi);(g===Ne(r+4)||g===Ne(r+8)||g===Ne(r+6))&&m.classList.add("pp-link")}),n.classList.add("pp-sel"),n.setAttribute("aria-expanded","true"),p.innerHTML=Ht(r,d),p.classList.add("open")};document.addEventListener("click",n=>{const i=n.target,p=i&&i.closest?i.closest("[data-pp-preset]"):null;if(p){Ot(p.getAttribute("data-pp-preset"),p.closest(".pp"));return}if(i&&i.closest&&i.closest("[data-pp-close]")){const d=i.closest(".pp-body");if(d){ft(d),La(d);const c=d.querySelector(".pp-detail");c&&(c.classList.remove("open"),c.innerHTML="");return}}const r=i&&i.closest?i.closest(".pp-cell[data-pi]"):null;r&&e(r)}),document.addEventListener("keydown",n=>{if(n.key!=="Enter"&&n.key!==" ")return;const i=n.target&&n.target.closest?n.target.closest(".pp-cell[data-pi]"):null;i&&(n.preventDefault(),e(i))}),document.addEventListener("change",n=>{const i=n.target;if(!i||!i.id||Ta.indexOf(i.id)<0)return;const p=i.closest?i.closest(".pp"):null;p&&p.querySelectorAll("[data-pp-preset]").forEach(r=>r.classList.remove("on"))})}o.bindZiwei=We,o._palaceDetailHTML=Ht,We();function Pt(e,n){const i=n||{},p=e.slice().sort((r,d)=>d.position-r.position);return i.plain?p.map(r=>`<div class="mp-hy-row hy-plain">
        <span class="mp-hy-nm">${r.name||qe[r.position-1]}</span>
        ${aa(r.yinYang==="阳",r.moving)}
      </div>`).join(""):p.map(r=>{const d=r.yinYang==="阳",c=i.shiYing?r.position===i.shi?'<span class="mp-hy-sy">世</span>':r.position===i.ying?'<span class="mp-hy-sy">应</span>':"<span></span>":"<span></span>",m=r.moving?`<i class="mp-hy-mv" title="动爻">${d?"○":"×"}</i>`:'<i class="mp-hy-mv"></i>';return`<div class="mp-hy-row">
        ${c}
        <span class="mp-hy-nm">${r.name||qe[r.position-1]}</span>
        <span class="mp-hy-ln">${aa(d,r.moving)}${m}</span>
        <span class="mp-hy-gz">${a(r.ganzhi||"")}</span>
        <span class="mp-hy-lq">${a(r.liuqin||"")}</span>
        <span class="mp-hy-ls">${a(r.liushen||"")}</span>
      </div>`}).join("")}o.liuyaoHTML=function(e){const n=(P,te,K,O)=>`<div class="mp-hy-box">
      <div class="mp-hy-h"><b>${P}</b><span>${te}</span></div>
      <div class="mp-hy">${Pt(O,{shiYing:!0,shi:K.shi,ying:K.ying})}</div>
    </div>`,i=n(`本卦 ${e.ben.name}`,`${e.ben.palace} · ${e.ben.palaceElement}`,e.ben,e.ben.lines),p=e.bian?n(`变卦 ${e.bian.name}`,`${e.bian.palace} · ${e.bian.palaceElement}`,e.bian,e.bian.lines):`<div class="mp-hy-box"><div class="mp-hy-h"><b>六爻安静</b><span>无动爻，不取变卦</span></div>
          <div class="pp-dim" style="font-size:12px;line-height:1.9">断卦以本卦卦辞与世应生克为主。</div></div>`,r=e.body&&Array.isArray(e.body.labels)?e.body.labels:[],d=r.length?`<div class="pp-chips">${r.map(P=>`<span class="pp-chip ${/伏吟/.test(P)||/反吟/.test(P)||/化退神/.test(P)?"warn":/六冲|散/.test(P)?"":"ok"}">${a(P)}</span>`).join("")}</div>`:'<div class="pp-chips"><span class="pp-chip">卦体无六冲、六合、伏吟、反吟</span></div>',c=e.useGod&&e.useGod.liuqin?e.useGod:null,m=c?`<div class="pp-chips">${c.labels.map(P=>`<span class="pp-chip ${/空亡|退神|受克|泄气|不上卦/.test(P)?"warn":/持世|化进|六合|得飞神生/.test(P)?"ok":""}">${a(P)}</span>`).join("")}</div>`:'<div class="pp-chips"><span class="pp-chip">用神未取（未指明所问之事）</span></div>',g=e.useGodStrength&&Array.isArray(e.useGodStrength.labels)?e.useGodStrength:null,f=g&&g.labels.length?`<div class="pp-chips">${g.labels.map(P=>`<span class="pp-chip ${/死|囚|月破|受日辰克|泄|耗/.test(P)?"warn":/旺|相|得日辰生|比和/.test(P)?"ok":""}">${a(P)}</span>`).join("")}</div>`:"",u=e.fushenAccess&&Array.isArray(e.fushenAccess.labels)?e.fushenAccess:null,h=u&&u.labels.length?`<div class="pp-chips">${u.labels.map(P=>`<span class="pp-chip ${/可出/.test(P)?"ok":/受压难出|有助有压/.test(P)?"warn":""}">伏神${a(P)}</span>`).join("")}</div>`:"",$=e.yingqi&&Array.isArray(e.yingqi.labels)?e.yingqi:null,T=$&&$.labels.length?`<div class="pp-chips">${$.labels.map(P=>`<span class="pp-chip ${/应期偏速/.test(P)?"ok":/应期待解/.test(P)?"warn":""}" title="只列地支，不出日期">${a(P)}</span>`).join("")}</div>`:"",L=e.jinTuiPower&&Array.isArray(e.jinTuiPower.labels)?e.jinTuiPower:null,E=L&&L.labels.length?`<div class="pp-chips">${L.labels.map(P=>`<span class="pp-chip ${/后劲足|退得缓/.test(P)?"ok":/有限|进得虚|退得实|月破|未定/.test(P)?"warn":""}">${a(P)}</span>`).join("")}</div>`:"",re=e.hexStrength&&Array.isArray(e.hexStrength.labels)?e.hexStrength:null,F=re&&re.labels.length?`<div class="pp-chips">${re.labels.map(P=>`<span class="pp-chip ${/死|囚|月破|冲空/.test(P)?"warn":/旺|相/.test(P)?"ok":""}">${a(P)}</span>`).join("")}</div>`:"";return o.briefHTML(e)+`<div class="pp" style="padding:14px">
      <div class="mp-mh-head">起卦 ${e.cast.notation.join("、")}（自下而上）　日辰 ${e.dayGanZhi.name}</div>
      <div class="mp-hy-wrap">${i}${p}</div>
      ${d}
      ${m}
      ${f}
      ${h}
      ${T}
      ${E}
      ${F}
    </div>`},o.meihuaHTML=function(e){const n=(T,L,E,re,F)=>{const te=[...ke[re]||[0,0,0],...ke[E]||[0,0,0]].slice().reverse().map(K=>aa(!!K,!1,"sm")).join("");return`<div class="mp-hexbox hb-mini">
        <div class="hb-h">${T}</div>
        <div class="hb-n">${L}</div>
        <div class="mp-mh-mini">${te}</div>
        <div class="hb-s">${F||`上${E} 下${re}`}</div>
      </div>`},i=e.lines.slice().sort((T,L)=>L.position-T.position),p=i.slice(0,3),r=i.slice(3),d=e.moving>=4,c=(T,L,E,re)=>`<div class="mp-trib">
      <div class="mp-trib-h">${T} ${Za(L)}${L}${Dt(L)}<span class="mp-tritag ${re?"tritag-ti":"tritag-yong"}">${re?"体":"用"}</span></div>
      <div class="mp-hy" style="gap:5px">${Pt(E,{plain:!0})}</div>
    </div>`,m=`<div class="mp-hexbox">
      <div class="hb-h"><span>本卦</span><span>动 ${e.movingName}</span></div>
      <div class="hb-n">${e.ben.name}</div>
      ${c("上卦",e.ben.upper,p,!d)}
      ${c("下卦",e.ben.lower,r,d)}
      <div class="hb-s">${e.source}</div>
    </div>`,g=e.bodyUse.level,f=g.includes("凶")?"bad":g.includes("吉")?"good":"flat",u=`<div class="mp-mh-rel">
      <div><b>体</b>${e.bodyUse.body.trigram}（${e.bodyUse.body.element}）　<b>用</b>${e.bodyUse.use.trigram}（${e.bodyUse.use.element}）</div>
      <div><span class="mh-lv ${f}">${g}</span>　${e.bodyUse.relation}</div>
    </div>`,h=Ca(e.cuo.name)||["",""],$=Ca(e.zong.name)||["",""];return o.briefHTML(e)+`<div class="pp mp-mh">
      <div class="mp-mh-main">
        ${m}
        ${n("互卦",e.hu.name,e.hu.upper,e.hu.lower,"中藏之象")}
        ${n("变卦",e.bian.name,e.bian.upper,e.bian.lower,`动 ${e.movingName} 后`)}
        ${n("错卦",e.cuo.name,h[0],h[1],"六爻全变")}
        ${n("综卦",e.zong.name,$[0],$[1],"整卦倒转")}
      </div>
      ${u}
    </div>`};const It={乾为天:["乾","乾"],天风姤:["乾","巽"],天山遁:["乾","艮"],天地否:["乾","坤"],风地观:["巽","坤"],山地剥:["艮","坤"],火地晋:["离","坤"],火天大有:["离","乾"],坎为水:["坎","坎"],水泽节:["坎","兑"],水雷屯:["坎","震"],水火既济:["坎","离"],泽火革:["兑","离"],雷火丰:["震","离"],地火明夷:["坤","离"],地水师:["坤","坎"],艮为山:["艮","艮"],山火贲:["艮","离"],山天大畜:["艮","乾"],山泽损:["艮","兑"],火泽睽:["离","兑"],天泽履:["乾","兑"],风泽中孚:["巽","兑"],风山渐:["巽","艮"],震为雷:["震","震"],雷地豫:["震","坤"],雷水解:["震","坎"],雷风恒:["震","巽"],地风升:["坤","巽"],水风井:["坎","巽"],泽风大过:["兑","巽"],泽雷随:["兑","震"],巽为风:["巽","巽"],风天小畜:["巽","乾"],风火家人:["巽","离"],风雷益:["巽","震"],天雷无妄:["乾","震"],火雷噬嗑:["离","震"],山雷颐:["艮","震"],山风蛊:["艮","巽"],离为火:["离","离"],火山旅:["离","艮"],火风鼎:["离","巽"],火水未济:["离","坎"],山水蒙:["艮","坎"],风水涣:["巽","坎"],天水讼:["乾","坎"],天火同人:["乾","离"],坤为地:["坤","坤"],地雷复:["坤","震"],地泽临:["坤","兑"],地天泰:["坤","乾"],雷天大壮:["震","乾"],泽天夬:["兑","乾"],水天需:["坎","乾"],水地比:["坎","坤"],兑为泽:["兑","兑"],泽水困:["兑","坎"],泽地萃:["兑","坤"],泽山咸:["兑","艮"],水山蹇:["坎","艮"],地山谦:["坤","艮"],雷山小过:["震","艮"],雷泽归妹:["震","兑"]},Ze={乾:"金",兑:"金",离:"火",震:"木",巽:"木",坎:"水",艮:"土",坤:"土"},Dt=e=>Ze[e]?` ${Ze[e]}`:"",Ca=e=>It[e]||null;o.daliurenHTML=function(e){const n=e.sanChuan,i=(m,g)=>`<div class="mp-dl-sc-c">
      <div class="mp-dl-sc-k">${g}</div>
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
    </div>`).join(""),d=e.pan.map(m=>{const g=ie[m.di]||[1,1];return`<div class="mp-dl-pc" style="grid-row:${g[0]};grid-column:${g[1]}">
        <div class="tz">${m.tian}</div>
        <div class="dz">地盘 ${m.di}</div>
        <div class="jz">${m.jiangFull}</div>
      </div>`}).join(""),c=`<div class="mp-dl-c">
      <div class="dl-t1">${e.dayGanZhi}日　${e.hourZhi}时</div>
      <div class="dl-t2">${e.dayNight}贵 · 月将 ${e.yueJiang.name}${e.yueJiang.zhi} · 贵人${e.guiren.reverse?"逆":"顺"}行</div>
      <div class="dl-t3">${n.chu.zhi} → ${n.zhong.zhi} → ${n.mo.zhi}</div>
      <div class="dl-t2">节气 ${e.jieqi.name}${e.jieqi.time?" "+e.jieqi.time:""}</div>
    </div>`;return o.briefHTML(e)+`<div class="pp mp-dl">
      <div class="mp-dl-head">日 ${e.dayGanZhi}　时 ${e.hourZhi}（${e.dayNight}贵）　月将 ${e.yueJiang.name}${e.yueJiang.zhi}　节气 ${e.jieqi.name}　贵人${e.guiren.reverse?"逆":"顺"}行</div>
      <div class="mp-dl-sc">${i(n.chu,"初传")}${i(n.zhong,"中传")}${i(n.mo,"末传")}${p}</div>
      <div class="mp-dl-sk">${r}</div>
      <div class="mp-dl-pan2">${d}${c}</div>
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
        <div class="mp-tt-kw">${r.keywords.map(d=>`<span>${d}</span>`).join("")}</div>
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
    </div>`},o.QIAN_CUP_SVG='<svg viewBox="0 0 96 124" role="presentation" focusable="false"><ellipse class="qn-shadow" cx="48" cy="118" rx="29" ry="5"/><rect class="qn-stick" x="33" y="8" width="7" height="50" rx="3" transform="rotate(-8 36 33)"/><rect class="qn-stick hot" x="43" y="2" width="7" height="58" rx="3" transform="rotate(2 46 31)"/><rect class="qn-stick" x="55" y="10" width="7" height="48" rx="3" transform="rotate(11 58 34)"/><path class="qn-body" d="M20 42h56l-5 64a4 4 0 0 1-4 4H29a4 4 0 0 1-4-4Z"/><ellipse class="qn-rim" cx="48" cy="42" rx="28" ry="8"/><text class="qn-zi" x="48" y="84" text-anchor="middle">签</text></svg>',o.qianOracleHTML=function(){return`<span class="mp-qn-o-cup" aria-hidden="true">${o.QIAN_CUP_SVG}</span><span class="mp-qn-o-tx"><b>轻点一下</b><i>摇一摇 · 抽今日福签</i></span>`},o.qianHTML=function(e){if(!e||e.system!=="qian"||!e.slip)return o.quickHTML(e);const n=e.slip,i={上上:"ss",上:"s",中:"z",平:"p"}[n.level]||"p",p=String(n.no).padStart(2,"0"),r=(e.history||[]).map((d,c)=>`<li class="mp-qn-h-row lv-${{上上:"ss",上:"s",中:"z",平:"p"}[d.level]||"p"}${c===0?" on":""}" title="${a(d.date)} ${a(d.weekday)} · ${a(d.level)} · ${a(d.title)}">
        <span class="mp-qn-h-d"><i class="mp-qn-h-l" aria-hidden="true"></i>${a(d.date.slice(5))}</span>
        <span class="mp-qn-h-t">${a(d.title)}</span>
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
          <div class="mp-qn-chips">${(n.chips||[]).map(d=>`<span>${a(d)}</span>`).join("")}</div>
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
    </div>`},o.guanyinOracleHTML=function(){return`<span class="mp-qn-o-cup" aria-hidden="true">${o.QIAN_CUP_SVG}</span><span class="mp-qn-o-tx"><b>轻点一下</b><i>摇一摇 · 抽一支灵签</i></span>`},o.guanyinHTML=function(e){if(!e||e.system!=="guanyin"||!e.slip)return o.quickHTML(e);const n=e.slip,i={上:"s",中:"z",下:"x"}[n.level]||"z",p=String(n.no).padStart(2,"0"),r=String(e.meta&&e.meta.question||"").trim(),d=(n.poem||[]).map(c=>`<span>${a(c)}</span>`).join("");return o.briefHTML(e)+`<div class="pp mp-qn mp-lq mp-lq-lv-${i}" aria-label="观音灵签">
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
          <p class="mp-qn-verse mp-lq-verse">${d}</p>
          ${n.omen?`<p class="mp-lq-omen">${a(n.omen)}</p>`:""}
          <div class="mp-qn-blk"><b>签意</b><p>${a(n.meaning)}</p></div>
          <div class="mp-qn-blk"><b>可为</b><p>${a(n.advice)}</p></div>
          <div class="mp-qn-chips">${(n.chips||[]).map(c=>`<span>${a(c)}</span>`).join("")}</div>
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
    </div>`};const Rt=e=>{if(!e||!Array.isArray(e.pairs)||!e.pairs.length)return"";const i='<tr><th scope="col">一对</th><th scope="col">契合度</th>'+(e.pairs[0].dimensions||[]).map(c=>`<th scope="col">${a(c.label)}</th>`).join("")+"</tr>",p=e.pairs.map(c=>`<tr><th scope="row">${a(c.a)} × ${a(c.b)}</th><td>${c.total==null?"—":`${a(c.total)}/100`}<span class="mp-hp-lv">${a(c.level||"")}</span></td>`+(c.dimensions||[]).map(m=>`<td>${m.score>=0?"+":""}${a(m.score)}</td>`).join("")+"</tr>").join(""),r=e.spread>=3&&e.best?`最顺：<b>${a(e.best.a)} × ${a(e.best.b)}</b>（${a(e.best.total)}/100）`+(e.hardest?`；最需磨合：<b>${a(e.hardest.a)} × ${a(e.hardest.b)}</b>（${a(e.hardest.total)}/100）`:""):`三对分数接近（相差 ${a(e.spread)} 分），不排名`,d=e.focus&&e.focus.spread>=3?`<p>差异最大的一维：<b>${a(e.focus.label)}</b>（三对相差 ${a(e.focus.spread)} 分）</p>`:"";return`<div class="mp-hp-triple">
      <div class="mp-hp-ith">三方合盘 · 三对并列</div>
      <table><thead>${i}</thead><tbody>${p}</tbody></table>
      <p>${r}</p>${d}
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
      ${Rt(e.triple)}
      <div class="mp-hp-notes">${e.notes.map(p=>`<p>${p}</p>`).join("")}</div>
    </div>`},o.qimenFactsHTML=function(e){if(!e||!e.palaces)return"";const n=(r,d)=>`<div class="relation__row"><dt>${a(r)}</dt><dd>${a(d)}</dd></div>`,i=r=>r&&["旺","相","休","囚","死"].filter(c=>Array.isArray(r[c])&&r[c].length).map(c=>`${c} ${r[c].join("、")}`).join("；")||"—";return`<dl class="relation mp-qm-facts" aria-label="奇门盘面事实">${[["局数",`${e.ju}${e.yuan?`（${e.yuan}）`:""}`],["节气",`${e.jieqi||"—"}${e.jieqiTime?`（${e.jieqiTime}）`:""}`],["四柱",`${e.siZhu?`${e.siZhu.year} ${e.siZhu.month} ${e.siZhu.day} ${e.siZhu.time}`:"—"}`],["值符",e.zhiFu?`${e.zhiFu.star} · ${e.zhiFu.gong}宫`:"—"],["值使",e.zhiShi?`${e.zhiShi.gate} · ${e.zhiShi.gong}宫`:"—"],["旬首",e.xunshou||"—"],["空亡",(e.kongWang||[]).join("")||"—"],["驿马",e.ma&&e.ma.zhi?`${e.ma.zhi}${e.ma.gong?`（${e.ma.gong}宫）`:""}`:"—"],["换局规则",e.juMethodNote||e.juMethod||"—"],["晚子时",e.lateZiHourMode==="next-day"?"23:00 后归次日":"23:00 后仍归当日"],["击刑",e.conditions&&e.conditions.jiXing&&e.conditions.jiXing.length?e.conditions.jiXing.map(r=>`${r.palace}宫${r.stem}`).join("、"):"本盘无"],["三奇入墓",e.conditions&&e.conditions.ruMu&&e.conditions.ruMu.length?e.conditions.ruMu.map(r=>`${r.palace}宫${r.stem}`).join("、"):"本盘无"],["六仪入墓",e.conditions&&e.conditions.liuYiRuMu&&e.conditions.liuYiRuMu.length?e.conditions.liuYiRuMu.map(r=>`${r.palace}宫${r.stem}`).join("、"):"本盘无"],["十干克应",[...e.palaces||[],e.centerPalace].filter(d=>d&&d.ganYing).map(d=>`${d.palace}宫 ${d.ganYing.tian}加${d.ganYing.di}「${d.ganYing.name}」`).join("；")||"—"],["月令",e.month&&e.month.branch?`${e.month.branch}（${e.month.element}）`:"—"],["门旺衰",i(e.states&&e.states.gate)],["星旺衰",i(e.states&&e.states.star)],["干旺衰",i(e.states&&e.states.stem)],["干宫生克",(()=>{const r=["干克宫","宫克干","干生宫","宫生干","比和"],d={};for(const c of e.palaces||[]){const m=c.stemRelation||null;!m||m.type==="unknown"||!c.tianPan||(d[m.type]=d[m.type]||[]).push(c.tianPan)}return r.filter(c=>d[c]).map(c=>c+" "+d[c].join("、")).join("；")||"—"})()]].map(([r,d])=>n(r,d)).join("")}</dl>`};const bt=[["4","9","2"],["3","5","7"],["8","1","6"]];o.qimenHTML=function(e){const n={};for(const p of e.palaces)n[p.palace]=p;const i=p=>{if(p==="5")return`<div class="pp-qm-cell center">
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
      <div class="mp-qm-grid">${bt.map(p=>p.map(i).join("")).join("")}</div>
      <div class="mp-qm-legend">上＝九星　中＝天盘干／八门　下＝地盘干／宫号　角落＝八神</div>
      <div class="mp-qm-rules">${e.rules.map(p=>`<p>${p}</p>`).join("")}</div>
    </div>`},o.ziweiHepanHTML=function(e){const n=(r,d)=>`<div class="mp-hp-side">
      <div class="mp-hp-who">${d}</div>
      <div class="mp-hp-gz">命宫 ${r.soul.branch}　夫妻 ${r.soul.branch,""}${r.spouseStars.length,""}</div>
      <div class="mp-hp-kv"><span>命宫主星</span><b>${r.soulStars.join("、")||"无正曜"}</b></div>
      <div class="mp-hp-kv"><span>夫妻宫主星</span><b>${r.spouseStars.join("、")||"无正曜"}</b></div>
      <div class="mp-hp-kv"><span>五行局</span><b>${r.bureau}</b></div>
      <div class="mp-hp-kv"><span>身宫</span><b>${r.body.branch}（${r.body.lands||"—"}）</b></div>
      <div class="mp-hp-kv"><span>生年四化</span><b>${r.natalSihua.join("、")}</b></div>
    </div>`,i=e.dimensions.map(r=>`<div class="mp-hp-dim">
      <div class="mp-hp-dimh"><span>${r.label}</span><b class="${r.score>=10?"good":r.score<0?"bad":""}">${r.score>=0?"+":""}${r.score}</b></div>
      <div class="mp-hp-dimt">${r.text}</div>
    </div>`).join(""),p=r=>(e.interactions||[]).filter(d=>d.who===r).map(d=>`<li><b class="m-${d.mutagen}">${d.mutagen}</b>${d.star}：本命${d.ownPalace} → 对方${d.landingPalace||"盘外"}${d.strong?"<i>（强）</i>":""}</li>`).join("");return o.briefHTML(e)+`<div class="pp mp-hp">
      <div class="mp-hp-head"><b>${e.score.level}</b><span>${e.score.total}/100　紫微合盘</span></div>
      <div class="mp-hp-sides">${n(e.a,"你")}${n(e.b,"对方")}</div>
      <div class="mp-hp-dims">${i}</div>
      <div class="mp-hp-inter">
        <div><div class="mp-hp-ith">你的四化 落在对方</div><ul>${p("你")||"<li>无</li>"}</ul></div>
        <div><div class="mp-hp-ith">对方的四化 落在你</div><ul>${p("对方")||"<li>无</li>"}</ul></div>
      </div>
      ${Rt(e.triple)}
      <div class="mp-hp-notes">${e.notes.map(r=>`<p>${r}</p>`).join("")}</div>
    </div>`},o.curveHTML=function(e){const n=e&&e.dayun&&Array.isArray(e.dayun.list)?e.dayun.list:[],i=e&&Array.isArray(e.liunian)?e.liunian:[];if(n.length<2)return"";const p=I=>typeof I=="number"&&isFinite(I)?I:0,r=I=>I.luck?p(I.luck.score):0,d=4.2,c=-2.2,m=p(e.dayun.startAge&&e.dayun.startAge.years),g=n.length?n[n.length-1].startAge+10:m+80,f=i.map(I=>p(I.age)).filter(I=>I>0),u=Math.min(m,...f.length?f:[m]),h=Math.max(g,...f.length?f:[g]),$=Math.max(1,h-u),T=640,L=190,E={t:14,r:16,b:26,l:30},re=T-E.l-E.r,F=L-E.t-E.b,P=I=>E.l+(I-u)/$*re,te=I=>E.t+F-(Math.max(c,Math.min(d,I))-c)/(d-c)*F,O=[{from:1.2,to:d,cls:"b-good"},{from:.55,to:1.2,cls:"b-good"},{from:-.8,to:.55,cls:"b-flat"},{from:-1.45,to:-.8,cls:"b-bad"},{from:c,to:-1.45,cls:"b-bad"}].map(I=>`<rect class="cv-band ${I.cls}" x="${E.l}" y="${te(I.to).toFixed(1)}" width="${re}" height="${(te(I.from)-te(I.to)).toFixed(1)}"/>`).join(""),J=10/$*re,V=[];n.forEach((I,Ee)=>{const _e=p(I.startAge),Be=r(I),Oe=Math.max(E.l,P(_e)),fa=Math.min(E.l+re,P(_e+10));V.push(`${Oe.toFixed(1)},${te(Be).toFixed(1)}`),V.push(`${fa.toFixed(1)},${te(Be).toFixed(1)}`)});const Le=V.length?`<polyline class="cv-dy" points="${V.join(" ")}"/>`:"",Me=V.length?`<polygon class="cv-dyfill" points="${E.l},${(E.t+F).toFixed(1)} ${V.join(" ")} ${(E.l+re).toFixed(1)},${(E.t+F).toFixed(1)}"/>`:"",Z=i.filter(I=>I.luck&&typeof I.luck.score=="number").map(I=>({x:P(p(I.age)),y:te(p(I.luck.score)),y0:p(I.year),gz:I.ganzhi,tier:I.luck.tier,v:p(I.luck.score),age:p(I.age)})),he=Z.length>1?`<polyline class="cv-ln" points="${Z.map(I=>`${I.x.toFixed(1)},${I.y.toFixed(1)}`).join(" ")}"/>`:"",ne={大吉:"var(--lu)",吉:"var(--lu)",平:"var(--muted)",忌:"var(--red)",大忌:"var(--red)"},w=Z.length?Math.min(...Z.map(I=>I.y0)):null,z=Z.map(I=>`<circle class="cv-dot${I.y0===w?" now":""}" cx="${I.x.toFixed(1)}" cy="${I.y.toFixed(1)}" fill="${ne[I.tier]||"var(--muted)"}"><title>${a(`${I.y0}年（${I.age}岁）${I.gz}　${I.tier} ${I.v}`)}</title></circle>`).join(""),q=`<line class="cv-ax zero" x1="${E.l}" y1="${te(0).toFixed(1)}" x2="${E.l+re}" y2="${te(0).toFixed(1)}"/><line class="cv-ax" x1="${E.l}" y1="${E.t}" x2="${E.l}" y2="${E.t+F}"/>`,pe=$>60?10:5,le=[];for(let I=Math.ceil(u/pe)*pe;I<=h;I+=pe)le.push(`<text class="cv-lbl age" x="${P(I).toFixed(1)}" y="${(E.t+F+13).toFixed(1)}" text-anchor="middle">${I}岁</text>`);const y=`<text class="cv-lbl" x="${(E.l-5).toFixed(1)}" y="${(te(2.4)+3).toFixed(1)}" text-anchor="end">吉</text><text class="cv-lbl" x="${(E.l-5).toFixed(1)}" y="${(te(0)+3).toFixed(1)}" text-anchor="end">平</text><text class="cv-lbl" x="${(E.l-5).toFixed(1)}" y="${(te(-1.8)+3).toFixed(1)}" text-anchor="end">忌</text>`,ce=n.slice().sort((I,Ee)=>r(Ee)-r(I)),S=ce[0],R=ce[ce.length-1],ee=S&&r(S)>.55?`<text class="cv-lbl" x="${P(p(S.startAge)+5).toFixed(1)}" y="${(te(r(S))-5).toFixed(1)}" text-anchor="middle">▲${S.startAge}岁 ${S.luck.tier}</text>`:"",Y=R&&r(R)<-.8?`<text class="cv-lbl" x="${P(p(R.startAge)+5).toFixed(1)}" y="${(te(r(R))+11).toFixed(1)}" text-anchor="middle">▼${R.startAge}岁 ${R.luck.tier}</text>`:"",ye=`<div class="cv-legend">
      <span><i style="background:var(--quan)"></i>大运（阶梯，一步十年）</span>
      <span><i style="background:var(--ke)"></i>流年（逐年折线）</span>
      <span>绿带＝吉　灰带＝平　红带＝忌</span>
    </div>`,$e=`<div class="cv-tip">曲线只呈现引擎已给出的行运评分（${c} ~ ${d}），不预测具体事件；档位与依据见下方「大运 / 流年」各节。悬停看逐年详情。</div>`;return`<div class="mp-curve">
      <div class="mp-curve-h"><b>人生运势曲线</b><span>${u}–${h} 岁　${e.dayun.rule}，${m} 岁起运${e.dayun.jiao&&e.dayun.jiao.at?`，交运 ${e.dayun.jiao.at}`:""}</span></div>
      <svg viewBox="0 0 ${T} ${L}" role="img" aria-label="人生运势曲线：${u} 到 ${h} 岁的大运与流年评分走势">
        ${O}${q}${Me}${Le}${he}${z}${le.join("")}${y}${ee}${Y}
      </svg>
      ${ye}${$e}
    </div>`},o.trendChart=function(e){const n=e&&Array.isArray(e.points)?e.points:[];if(n.length<2)return"";const i=e&&Array.isArray(e.segments)?e.segments:[],p=S=>typeof S=="number"&&isFinite(S)?S:0,r=720,d=322,c={t:34,r:46,b:66,l:36},m=r-c.l-c.r,g=d-c.t-c.b,f=n.length,u=m/f,h=S=>c.l+(S+.5)*u,$=S=>c.t+g-Math.max(0,Math.min(100,S))/100*g,T=Math.max(1.1,Math.min(10,u*.62)),L=S=>p(S.score),E=c.t+g,re=E+20,F=22,te=`klclip${(()=>{let S=2166136261;const R=ee=>{const Y=String(ee??"");for(let ye=0;ye<Y.length;ye++)S^=Y.charCodeAt(ye),S=Math.imul(S,16777619)};R(f),R(n[0]&&n[0].age),R(n[f-1]&&n[f-1].age);for(const ee of n)R(ee&&ee.score);return(S>>>0).toString(36)})()}`,K=i.map((S,R)=>{const ee=Math.max(0,S.startAge-1),Y=Math.min(f-1,S.endAge-1);if(Y<ee)return"";const ye=c.l+ee*u,$e=Math.max(.6,(Y-ee+1)*u),Ee=R%2===1?`<rect class="kl-band" x="${ye.toFixed(1)}" y="${c.t}" width="${$e.toFixed(1)}" height="${g}"/><rect class="kl-stripband" x="${ye.toFixed(1)}" y="${re}" width="${$e.toFixed(1)}" height="${F}"/>`:"",_e=R===0?"":`<line class="kl-segline" x1="${ye.toFixed(1)}" y1="${c.t}" x2="${ye.toFixed(1)}" y2="${E}"/>`,Be=Math.min(Math.max(c.l+(ee+Y+1)/2*u,c.l+22),c.l+m-22);return Ee+_e+`<text class="kl-seg" x="${Be.toFixed(1)}" y="${(re+15).toFixed(1)}" text-anchor="middle">${a(S.ganZhi)}</text>`}).join(""),O=[0,25,50,75,100].map(S=>`<line class="kl-grid${S===50?" mid":""}" x1="${c.l}" y1="${$(S).toFixed(1)}" x2="${c.l+m}" y2="${$(S).toFixed(1)}"/><text class="kl-lbl" x="${c.l-6}" y="${($(S)+3).toFixed(1)}" text-anchor="end">${S}</text>`).join(""),J=n.map((S,R)=>{const ee=S.kline||{},Y=p(ee.open),ye=p(ee.close),$e=Math.min(100,p(ee.high)),I=Math.max(0,p(ee.low)),Ee=ye>=Y,_e=$(Y),Be=$(ye),Oe=Math.min(_e,Be),fa=Math.max(.8,Math.abs(_e-Be)),ba=h(R),Ua=`${S.age}岁（${S.year}年 ${S.ganZhi}）${ye}分${S.dayunGanZhi?` · ${S.dayunGanZhi}运`:""}`;return`<g class="kl-c${Ee?" up":" down"}"><title>${a(Ua)}</title><line x1="${ba.toFixed(2)}" y1="${$($e).toFixed(1)}" x2="${ba.toFixed(2)}" y2="${$(I).toFixed(1)}"/><rect x="${(ba-T/2).toFixed(2)}" y="${Oe.toFixed(1)}" width="${T.toFixed(2)}" height="${fa.toFixed(1)}" rx="0.7"/></g>`}).join(""),V=S=>{const R=[];for(let ee=0;ee<f;ee++){if(ee+1<S)continue;let Y=0;for(let ye=ee+1-S;ye<=ee;ye++)Y+=L(n[ye]);R.push({i:ee,v:Y/S})}return R},Le=S=>V(S).map((R,ee)=>`${ee?"L":"M"}${h(R.i).toFixed(1)} ${$(R.v).toFixed(1)}`).join(" "),Me=(S,R)=>{const ee=V(S);if(!ee.length)return"";const Y=ee[ee.length-1];return{cls:R,y:$(Y.v),text:`<text class="kl-ma-lbl ${R}" x="${c.l+m+5}" y="${$(Y.v).toFixed(1)}" text-anchor="start">${Y.v.toFixed(0)}</text>`}},Z=Me(10,"m10"),he=Me(5,"m5"),ne=(()=>{if(!he||!Z)return`${Z?Z.text:""}${he?he.text:""}`;let S=he.y,R=Z.y;if(Math.abs(S-R)<10){const ee=Math.min(S,R),Y=Math.max(S,R);S=ee-6,R=Y+6}return`<text class="kl-ma-lbl m10" x="${c.l+m+5}" y="${R.toFixed(1)}" text-anchor="start">${V(10).slice(-1)[0].v.toFixed(0)}</text><text class="kl-ma-lbl m5" x="${c.l+m+5}" y="${S.toFixed(1)}" text-anchor="start">${V(5).slice(-1)[0].v.toFixed(0)}</text>`})();let w=n[0],z=n[0];for(const S of n)L(S)>L(w)&&(w=S),L(S)<L(z)&&(z=S);const q=(S,R,ee)=>{const Y=n.indexOf(S),ye=h(Y),$e=$(L(S)),I=Math.min(Math.max(ye,c.l+26),c.l+m-26),Ee=R==="hi"?$e-8<c.t+6?14:ee:$e+12>c.t+g-2?-8:ee;return`<g class="kl-mark ${R}"><circle cx="${ye.toFixed(1)}" cy="${$e.toFixed(1)}" r="2"/><circle class="ring" cx="${ye.toFixed(1)}" cy="${$e.toFixed(1)}" r="4.6"/><text x="${I.toFixed(1)}" y="${($e+Ee).toFixed(1)}" text-anchor="middle">${S.age}岁 ${L(S)}</text></g>`},pe=f>60?10:5,le=n.filter(S=>S.age%pe===0).map(S=>`<text class="kl-lbl age" x="${h(n.indexOf(S)).toFixed(1)}" y="${(E+14).toFixed(1)}" text-anchor="middle">${S.age}</text>`).join(""),y=`<text class="kl-lbl axis" x="${c.l}" y="${(d-6).toFixed(1)}">年龄（岁）</text><text class="kl-lbl axis" x="${c.l+m}" y="${(d-6).toFixed(1)}" text-anchor="end">每岁一分 · 满分 100</text>`;return`<div class="mp-kline-fig">
      <svg viewBox="0 0 ${r} ${d}" role="img" aria-label="人生K线：1 到 ${f} 岁的逐年评分蜡烛图">
        <defs><clipPath id="${te}"><rect x="${c.l}" y="${c.t}" width="${m}" height="${g}"/></clipPath></defs>
        ${K}${O}
        <g clip-path="url(#${te})">
          ${J}
          <path class="kl-ma m10" d="${Le(10)}"/><path class="kl-ma m5" d="${Le(5)}"/>
        </g>
        ${ne}
        ${q(w,"hi",-8)}${q(z,"lo",12)}
        ${le}${y}
      </svg><div class="kl-legend"><span><i class="up"></i>阳线：比上一岁高</span><span><i class="down"></i>阴线：比上一岁低</span><span><i class="m5"></i>5 年均线</span><span><i class="m10"></i>10 年均线</span><span>虚线＝大运交界</span></div></div>`},o.trendHTML=function(e,n){if(!e)return"";const i=!(n&&n.brief===!1),p=o.trendChart(e);if(!p)return o.quickHTML(e);const r=Array.isArray(e.segments)?e.segments:[],d=e.highlights&&typeof e.highlights=="object"?e.highlights:{},c=e.meta||{},m=c.strength||{},g=r.map(O=>`<span class="kl-chip">${a(O.ganZhi)}<em>${O.startAge}–${O.endAge}</em></span>`).join(""),f=(Array.isArray(d.best)?d.best:[]).map(O=>`<div class="kl-hl hi">${a(O)}</div>`).join(""),u=(Array.isArray(d.worst)?d.worst:[]).map(O=>`<div class="kl-hl lo">${a(O)}</div>`).join(""),h=c.boundaryNote?`<div class="mp-kline-note">${a(c.boundaryNote)}</div>`:d.suppressed?`<div class="mp-kline-note">${a(d.suppressed)}</div>`:"",$=Array.isArray(e.points)?e.points:[],T=O=>typeof O.score=="number"&&isFinite(O.score)?O.score:0,L=$.map(T),E=L.length?L.reduce((O,J)=>O+J,0)/L.length:0,re=L.length?Math.max(...L)-Math.min(...L):0,F=r.map(O=>{const J=$.filter(V=>V.age>=O.startAge&&V.age<=O.endAge).map(T);return{ganZhi:O.ganZhi,v:J.length?J.reduce((V,Le)=>V+Le,0)/J.length:0}}).filter(O=>O.v>0).sort((O,J)=>J.v-O.v),P=!!(m.boundary||d.suppressed),te=[`<span><em>全段均值</em><b>${E.toFixed(0)}</b></span>`];!P&&F.length&&(te.push(`<span><em>最好大运</em><b class="hi">${a(F[0].ganZhi)} ${F[0].v.toFixed(0)}</b></span>`),te.push(`<span><em>最差大运</em><b class="lo">${a(F[F.length-1].ganZhi)} ${F[F.length-1].v.toFixed(0)}</b></span>`)),te.push(`<span><em>波动幅度</em><b>${re.toFixed(0)}</b></span>`);const K=`<div class="kl-stats">${te.join("")}</div>`;return(i?o.briefHTML(e):"")+`<section class="mp-kline" aria-label="人生K线结果">
      <div class="mp-kline-h"><h2 class="mp-kline-title">人生 K 线</h2><span>${a(c.birth||"")}　日主 ${a(c.dayMaster||"")}　${a(m.level||"")}${m.score?`（${m.score}）`:""}</span></div>
      ${p}
      ${K}
      ${g?`<div class="kl-segs">${g}</div>`:""}
      ${f||u?`<div class="kl-hls">${f}${u}</div>`:""}
      ${h}
      <div class="mp-kline-tip">逐岁分数由大运与流年十神按固定表确定性计分（1–100），只表五行力量的顺逆，不预测具体事件；旺衰落在换档阈值附近时，不出高低年份结论。</div>
    </section>`},o.chengguHTML=function(e){if(!e)return"";const n=e.weights||{},i=e.song||{},p=["year","month","day","hour"].map(m=>{const g=n[m]||{label:"",qian:0},f=String(g.label||"").split(" ")[0]||"",u=String(g.label||"").split(" ")[1]||"";return`<div class="cg-cell"><em>${a(f)}</em><b>${a(u)}</b></div>`}).join(""),r=String(i.text||""),d=r?r.replace(/[。]$/,"").split("；").map((m,g)=>`<span>${a(m)}${g===0?"；":"。"}</span>`).join(""):"",c=e.verdict&&e.verdict.band?e.verdict.band:"";return`<section class="mp-cg" aria-label="称骨结果">
      <div class="mp-cg-h"><b>称骨</b><span>${a(e.lunar&&e.lunar.text?e.lunar.text:"")}</span></div>
      <div class="mp-cg-w">${p}</div>
      <div class="mp-cg-tot"><em>骨重合计</em><b>${a(e.total&&e.total.label?e.total.label:"")}</b>${c?`<i>${a(c)}</i>`:""}</div>
      <div class="mp-cg-song"><div class="mp-cg-song-h">称骨歌 · ${a(e.total&&e.total.label?e.total.label:"")}</div>
        <div class="mp-cg-verse">${d||'<span class="mp-cg-miss">该骨重未见通行本歌诀</span>'}</div>
        <div class="mp-cg-plain"><em>释义</em>${a(i.plain||"")}</div></div>
      ${e.verdict&&e.verdict.text?`<div class="mp-cg-band"><em>分档</em>${a(e.verdict.text)}</div>`:""}
      <div class="mp-cg-note">骨重与歌诀为通行本口径（各版本歌诀有异文，断句标点已统一）；男女同表，本盘只收一套歌诀，旧本另有女命歌诀此处不另出；释义为白话自撰，只作字面直解，属民俗娱乐参考，不构成命运断言。</div>
    </section>`},o.nameHTML=function(e){if(!e)return"";const n={木:"wood",火:"fire",土:"earth",金:"metal",水:"water"},i=f=>f==="未收录"?'<span class="mp-nm-el">未收录</span>':`<span class="mp-nm-el wx-${n[f]||"earth"}">${a(f)}</span>`,p=(f,u)=>`<div class="mp-nm-h"><b>${a(f)}</b>${u?`<i>${a(u)}</i>`:""}</div>`;if(e.action==="generate"){const f=e.bazi&&e.bazi.favorable?e.bazi.favorable.join("、"):"",u=(e.candidates||[]).map(h=>{const $=h.wuge&&h.wuge.available?(()=>{const L=h.wuge.rows.filter(F=>F.level==="吉").length,E=h.wuge.rows.filter(F=>F.level==="凶").length;return`<span class="mp-nm-fit${E===0&&L>=4?" ok":E>=2?" no":""}" title="${a(h.wuge.summary)}">五格 ${L}/5 吉</span>`})():"",T=h.phonetics&&h.phonetics.available?`<span class="mp-nm-fit${h.phonetics.level==="拗口"?" no":h.phonetics.level==="顺口"?" ok":""}" title="${a((h.phonetics.issues||[]).map(L=>L.text).join("；"))}">${a(h.phonetics.level)}</span>`:"";return`<div class="mp-nm-c"><b>${a(h.name)}</b><span class="mp-nm-els">${h.chars.map(L=>i(L.element)).join("")}${$}${T}</span><em>${a(h.chars.map(L=>L.char+"·"+L.meaning).join("　"))}</em></div>`}).join("");return`<section class="mp-nm" aria-label="候选名">
        ${p("候选名",`姓 ${e.surname}（${e.gender}）${f?`　喜用 ${f}`:""}`)}
        <div class="mp-nm-cand">${u}</div>
        <div class="mp-nm-note">${(e.notes||[]).map(h=>"※ "+a(h)).join("<br>")}</div>
      </section>`}const r=(e.chars||[]).map(f=>{const u=f.favorable===!0?'<span class="mp-nm-fit ok">合喜用</span>':f.favorable===!1?'<span class="mp-nm-fit no">不合喜用</span>':'<span class="mp-nm-fit">不判</span>',h=f.source==="user"?"用户指定":f.source==="lib"?"字库":"未收录",$=f.suggest&&f.suggest.length?`<div class="mp-nm-sug"><b>可换</b>${f.suggest.map(T=>`<span class="wx-${n[T.element]||"earth"}">${a(T.char)}（${a(T.element)}）</span>`).join("")}</div>`:"";return`<div class="mp-nm-row"><div class="mp-nm-ch">${a(f.char)}</div>
        <div class="mp-nm-b"><div class="mp-nm-t">${i(f.element)}<span>${a(h)}</span>${u}</div>
        <div class="mp-nm-m">${a(f.meaning)}</div>${$}</div></div>`}).join(""),d=e.bazi?`<div class="mp-nm-m">八字：${a(e.bazi.dayMaster&&e.bazi.dayMaster.stem?`${e.bazi.dayMaster.stem}（${e.bazi.dayMaster.element}）`:String(e.bazi.dayMaster||""))}　${a(e.bazi.strength?`${e.bazi.strength.level}（${e.bazi.strength.score}）`:"")}　喜用 ${a((e.bazi.favorable||[]).join("、"))}</div>
         <div class="mp-nm-m">${a(e.bazi.basis||"")}</div>`:"",c=f=>f==="吉"?"is-ok":f==="半吉"?"is-half":"is-bad",m=e.wuge&&e.wuge.available?`<div class="mp-nm-wu">
          <div class="mp-nm-wu-h"><b>五格</b><i>康熙笔画 · 通行本 81 数理</i></div>
          <div class="mp-nm-wu-rows">${e.wuge.rows.map(f=>`<div class="mp-nm-wu-c ${c(f.level)}"><em>${a(f.key)}</em><b>${f.strokes}</b><i>${a(`${f.level} · ${f.name}`)}</i></div>`).join("")}</div>
          <div class="mp-nm-m">笔画：${e.wuge.strokes.map(f=>`${a(f.char)}${f.strokes}${f.source==="user"?"（指定）":""}`).join(" ＋ ")}</div>
          <div class="mp-nm-m">三才：${a(e.wuge.sancai.text)}</div>
        </div>`:`<div class="mp-nm-wu"><div class="mp-nm-wu-h"><b>五格</b><i>这一版算不了</i></div><div class="mp-nm-m">${a(e.wuge?e.wuge.reason:"未算")}</div></div>`,g=e.phonetics&&e.phonetics.available?`<div class="mp-nm-ph"><b>音韵</b><span class="mp-nm-ph-lv${e.phonetics.level==="顺口"?" ok":e.phonetics.level==="拗口"?" bad":" warn"}">${a(e.phonetics.level)}</span><em>${a(e.phonetics.chars.map(f=>`${f.py}${f.tone}`).join(" "))}　声调 ${a(e.phonetics.tonePattern)}${(e.phonetics.alt||[]).length?`　又读 ${a(e.phonetics.alt.map(f=>`${f.char} ${f.py}${f.tone}`).join("、"))}`:""}</em>${(e.phonetics.issues||[]).map(f=>`<span class="mp-nm-ph-i">${a(f.text)}</span>`).join("")}</div>`:`<div class="mp-nm-ph"><b>音韵</b><em>${a(e.phonetics?e.phonetics.reason:"未算")}</em></div>`;return`<section class="mp-nm" aria-label="名字评估">
      ${p(e.fullName||"",`字库 ${e.stats&&e.stats.libSize?e.stats.libSize:""} 字${e.stats&&e.stats.unknown?`　未收录 ${e.stats.unknown}`:""}`)}
      ${r}
      ${d}
      ${m}
      ${g}
      <div class="mp-nm-verd">${a(e.verdict||"")}</div>
      <div class="mp-nm-note">${(e.notes||[]).map(f=>"※ "+a(f)).join("<br>")}</div>
    </section>`},o.briefHTML=function(e){return e?e.brief?o.summaryHTML(e.brief):o.factHeadHTML(e.factHead):""},o.oneLineHTML=function(e,n){if(!e||!e.strength||!e.strength.level)return"";const i=n||{},p=i.life||null,r=i.marriage||null,d=e.dayMaster||{},c=e.pillars&&e.pillars.month&&e.pillars.month.branch||"",m=`${d.stem||""}${d.element||""}${e.strength.level}${c?`，生${c}月`:""}`,g=[],f=p&&p.career&&p.career.type&&p.career.type.label;if(f&&g.push(`事业偏${String(f).split("、")[0]}`),p&&p.wealth&&p.wealth.tier){const T=String(p.wealth.tier).split("（")[0];g.push(T==="平"?"财平":`财是${T}`)}const u=r&&r.types&&r.types[0];u&&u.label&&g.push(`婚缘${String(u.label).replace(/型$/,"")}`);const h=r&&r.windows?r.windows.filter(T=>!T.past)[0]:null;return h&&g.push(`最可能动在 ${h.year} 年（${h.age}岁）`),`<section aria-label="一眼看" style="margin:10px 0 0;padding:9px 12px;border-left:3px solid var(--gold)"><p style="margin:0;line-height:1.65">${g.length?`<h2 class="mp-yiyan-h">一眼看</h2>　${a(m)}：${a(g.join("；"))}。`:`${a(m)}。`}</p></section>`},o.summaryHTML=function(e){if(!e||!e.lead)return"";const n=(e.sections||[]).map(r=>`<div class="mp-br-sec"><b>${a(r.h)}</b><p>${a(r.t)}</p></div>`).join(""),i=e.advice&&e.advice.length?`<div class="mp-br-adv"><b>可以试着做的</b><ul>${e.advice.map(r=>`<li>${a(r)}</li>`).join("")}</ul></div>`:"",p=e.chips&&e.chips.length?`<div class="mp-br-chips">${e.chips.map(r=>`<span>${a(r)}</span>`).join("")}</div>`:"";return`<section class="mp-br" aria-label="先说结论">
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
    </section>`},o.baziHTML=function(e,n){const i=[["year","年柱"],["month","月柱"],["day","日柱"],["hour","时柱"]].filter(([x])=>e.pillars[x]),p={year:"年",month:"月",day:"日",hour:"时"},r={木:"wood",火:"fire",土:"earth",金:"metal",水:"water"},d={比肩:"tg-bi",劫财:"tg-bi",食神:"tg-shi",伤官:"tg-shi",偏财:"tg-cai",正财:"tg-cai",七杀:"tg-guan",正官:"tg-guan",偏印:"tg-yin",正印:"tg-yin"},c=x=>`<span class="tg ${d[x]||""}">${x}</span>`,m=x=>`<span class="wx-${r[x]||"earth"}">${la(x)}${x}</span>`,g=x=>`<span class="ss-s ${x.luck||"neutral"}" title="${a(`${x.cat} · ${x.via}查${x.target} ｜ ${x.rule}`)}">${x.name}</span>`,f=(x,H)=>`<tr><td class="bz-lbl">${x}</td>${i.map(([be])=>`<td data-c="${p[be]}">${H(e.pillars[be],be)}</td>`).join("")}</tr>`,u=`<thead><tr><th scope="col" aria-label="项目"></th>${i.map(([x,H])=>`<th scope="col"${x==="day"?' class="bz-hdr-day"':""}>${H}</th>`).join("")}</tr></thead>`,h={寅:"木",卯:"木",巳:"火",午:"火",申:"金",酉:"金",亥:"水",子:"水",辰:"土",戌:"土",丑:"土",未:"土"},$={木:"火",火:"土",土:"金",金:"水",水:"木"},T={木:"土",土:"水",水:"火",火:"金",金:"木"},L=h[e.pillars.month.branch]||"土",E=["木","火","土","金","水"],re=x=>x===L?"旺":$[L]===x?"相":$[x]===L?"休":T[x]===L?"囚":"死",F=`<tr><td class="bz-lbl">五行</td><td class="bz-wxs" colspan="${i.length}">${["旺","相","休","囚","死"].map(x=>{const H=E.find(be=>re(be)===x)||L;return`<i><b class="wx-${r[H]}">${H}</b><em>${x}</em></i>`}).join("")}</td></tr>`,P=[f("十神",(x,H)=>H==="day"?`<span class="bz-zhuri">${e.input.gender==="male"?"元男":"元女"}</span>`:x.stemTenGod?c(x.stemTenGod):'<span class="pp-dim">—</span>'),f("天干",x=>`<span class="bz-big ${"wx-"+r[x.stemElement]}">${x.stem}</span>`),f("地支",x=>`<span class="bz-big ${"wx-"+r[x.branchElement]}">${x.branch}</span>`),f("藏干",x=>x.hidden.map(H=>`<i class="bz-cg wx-${r[H.element]}">${H.stem}·${H.element}</i>`).join("")),f("支神",x=>x.hidden.map(H=>c(H.tenGod)).join("<br>")),f("纳音",x=>x.nayin),f("空亡",x=>`<span class="pp-dim">${x.kongwang.join("")}</span>`),f("地势",x=>x.dishi),f("自坐",x=>x.zizuo),f("神煞",x=>x.shenshaDetail&&x.shenshaDetail.length?`<span class="pp-ss">${x.shenshaDetail.map(g).join("")}</span>`:'<span class="pp-dim">—</span>'),F].join(""),te=Object.entries(e.wuxing).map(([x,H])=>`<span class="pp-chip wx-${r[x]}">${la(x)}${x} ${H}</span>`).join(""),K=e.frame||{},O=x=>x==="大吉"||x==="吉"?"ok":x==="大忌"||x==="忌"?"warn":"",J=(x,H)=>H?`<div class="pp-sec"><div class="pp-sec-h">${x}</div>${H}</div>`:"",V=K.patternScore,Le=V?`<div class="pp-tl pp-dim" title="${a(V.detail||"")}">成格分 ${V.grade?`${a(V.grade)}　${V.score}/100`:"外格不评分"}　${a(V.verdict||"")}</div>`:"",Me=K.geju&&K.geju.length?`
      <div class="pp-tl">${K.primary?`主格 <b>${a(K.primary.name)}</b>　${a(K.primary.evidence)}`:""}</div>
      <div class="pp-chips">${K.geju.map(x=>{const H=x.status==="破格",be=x.status==="待定"||x.status==="假从",fe=`${x.evidence||""}${Array.isArray(x.breaks)&&x.breaks.length?`；破：${x.breaks.join("；")}`:""}`;return`<span class="pp-chip ${H?"broken":be?"warn":""}" title="${a(fe)}">${a(x.name)}<i class="pp-drel">${a(x.kind)}${x.status?`·${a(x.status)}`:""}</i></span>`}).join("")}</div>${Le}`:"",Z=(()=>{const x=Array.isArray(K.yongshen&&K.yongshen.neutral)?K.yongshen.neutral:[],H=new Set(K.yongshen&&K.yongshen.neutralTenGods||[]);return`${(K.yongshen&&K.yongshen.avoidTenGods||[]).filter(fe=>!H.has(fe)).map(fe=>`<span class="pp-chip warn">${a(fe)}</span>`).join("")}${[...H].map(fe=>`<span class="pp-chip neu" title="局中分量近零，按中性偏忌看">${a(fe)}</span>`).join("")}${x.length?`<span class="pp-chip neu" title="忌神中全局不足 0.5 分的那几行；仍在忌里参与行运评分">中性偏忌 ${x.map(fe=>`${a(fe.element)} ${a(fe.weight)} 分`).join("、")}</span>`:""}`})(),he=K.yongshen?`
      <div class="pp-tl">喜 ${K.yongshen.favor.map(m).join("")}　忌 ${K.yongshen.avoid.map(m).join("")}　<span class="pp-dim">${a(K.yongshen.method)}</span></div>
      <div class="pp-chips">${K.yongshen.favorTenGods.map(x=>`<span class="pp-chip ok">${a(x)}</span>`).join("")}${Z}</div>
      ${(K.yongshen.disputed||[]).length?`<div class="pp-tl pp-dim">有争议：${K.yongshen.disputed.map(x=>`${a(x.element)}（扶抑为${a(x.favorRole)}·${a(x.favorVerb)}，${a(x.climate)}盘调候忌${a(x.element)}）`).join("、")}　保留在喜用，不列入忌</div>`:""}
      ${K.yongshen.combination?`<div class="pp-tl">组合取舍（官杀该制还是该化）</div><div class="pp-chips">${K.yongshen.combination.rows.map(x=>`<span class="pp-chip ${/忌|慎用|耗身/.test(x.action)?"warn":/^(用|可化|可用)/.test(x.action)?"ok":"neu"}" title="${a(x.note)}">${a(x.role)} ${a(x.action)}</span>`).join("")}</div>`:""}
      <div class="pp-tl pp-dim">${a(K.yongshen.detail)}</div>`:"",ne=e.climate||K.yongshen&&K.yongshen.climate||null,w=ne?(()=>{const x=Math.max(2,Math.min(98,Math.round(((Number(ne.temp)||0)+3)/6*100))),H=ne.need?`<em>调候取</em><b>${a(ne.need.stem+ne.need.element)}</b>`:"<em>气候平和</em>",be=!!(K.yongshen&&Array.isArray(K.yongshen.disputed))&&K.yongshen.disputed.some(qa=>qa.element===ne.avoidElement),fe=ne.need?`<em>忌</em><b>${a(ne.avoidElement)}</b>${be?'<span class="pp-dim">（有争议）</span>':""}`:"",Ae=(ne.evidence||[]).length?`<em>依据</em><span>${a(ne.evidence.join("、"))}</span>`:"",Pe=ne.priority==="调候优先"?'<span class="mp-cli-p">调候优先</span>':'<span class="mp-cli-p">扶抑为主</span>',Ie=e.frame&&e.frame.yongshen&&e.frame.yongshen.qt,en=Ie?`<div class="mp-qt">
          <div class="mp-qt-h"><b>穷通宝鉴</b><span>${a(Ie.label)}</span></div>
          <div class="mp-qt-y"><em>用神</em>${Ie.yong.map((qa,an)=>`<b class="${an===0?"first":""}">${a(qa)}</b>`).join("")}<em>首取 ${a(Ie.primary)}</em></div>
          <div class="mp-qt-q" title="${a(Ie.quote)}">「${a(Ie.quote)}」<span>第 ${Ie.chapter} 章${Ie.truncated?" · 首段更长，摘句下略":""}${Ie.note?" · "+a(Ie.note):""}</span></div>
        </div>`:"";return`<section class="mp-cli" aria-label="寒暖燥湿">
        <div class="mp-cli-h"><b>寒暖燥湿</b><span class="mp-cli-k">${a(ne.label||"")}</span>${Pe}</div>
        <div class="mp-cli-bar" title="寒 ← → 热"><i style="left:${x}%"></i></div>
        <div class="mp-cli-axis"><span>寒</span><span>平</span><span>热</span></div>
        <div class="mp-cli-row">${H}${fe}${Ae}</div>
        <div class="mp-cli-narr">${a(ne.narration||"")}</div>
        ${en}
      </section>`})():"",z=K.godStats?`<div class="pp-chips">${Object.entries(K.godStats.groups).map(([x,H])=>`<span class="pp-chip">${x} ${H}</span>`).join("")}</div>`:"",q=e.dayun.list.map(x=>{const H=x.luck||null;return`<span class="pp-chip ${H?O(H.tier):""}" title="${a(`${x.fromDate?`${x.fromDate} 交运；`:""}${H?`${H.tier} ${H.score}｜${(H.reasons||[]).join("；")}`:""}`)}">${x.startAge} ${x.ganzhi}${x.relations&&x.relations.length?` <i class="pp-drel">${x.relations.join("")}</i>`:""}${H?` ${H.tier}`:""}</span>`}).join(""),pe=e.liunian&&e.liunian.length?`<div class="pp-chips">${e.liunian.slice(0,8).map(x=>{const H=x.luck||null,be=x.suiyun&&Array.isArray(x.suiyun.signals)?x.suiyun.signals:[],fe=be.length?`｜${be.map(Ae=>Ae.detail).join("；")}`:"";return`<span class="pp-chip ${H?O(H.tier):""}" title="${a(H?`${H.tier} ${H.score}｜${(H.reasons||[]).join("；")}${fe}`:fe.replace(/^｜/,""))}">${x.year} ${x.ganzhi}${H?` ${H.tier}`:""}</span>`}).join("")}</div>`:"",le=(e.liunian||[]).filter(x=>x.suiyun&&Array.isArray(x.suiyun.signals)&&x.suiyun.signals.length),y=e.suiyunClassic,ce=y?`<div class="pp-dim pp-sy-src" title="${a(y.plain||"")}">《${a(y.bookName||"")}·${a(y.chapter||"")}》「${a(y.quote||"")}」</div>`:"",S=le.length?`<div class="pp-tl pp-dim">岁运提示（只标干支变动，不判吉凶）</div><div class="pp-chips">${le.map(x=>`<span class="pp-chip" title="${a(`${x.suiyun.signals.map(H=>H.detail).join("；")}｜${x.suiyun.note||""}`)}">${x.year} ${a(x.suiyun.signals.map(H=>`${H.type}${(H.type.startsWith("流年")||H.type.startsWith("大运"))&&H.target?`·${H.target}`:""}`).join("/"))}</span>`).join("")}</div>${ce}`:"",R=e.strength&&e.strength.boundary&&e.strength.boundary.near&&e.strength.boundary.nearest?`<span class="pp-chip warn" title="${a(e.strength.boundary.plain||"")}">临界·离${a(e.strength.boundary.nearest.to)} ${e.strength.boundary.nearest.gap} 分</span>`:"",ee=e.strength?`<div class="pp-str">日主强弱：<b>${e.strength.level}</b>${e.strength.score}${R}　<span class="pp-dim">${e.strength.detail}</span></div>`:"",Y=e.strength&&e.strength.branchStructure,ye=Y?(()=>{const x=Y.branches.map(Pe=>`${a(Pe.label)}${a(Pe.branch)}<i class="pp-drel">·${a(Pe.camp)}</i>${Y.placeholderHour&&Pe.key==="hour"?'<span class="pp-dim">占位</span>':""}`).join(" "),H=Y.odd&&Y.odd.length?`<span class="pp-st-odd">异类 ${Y.odd.map(Pe=>`${a(Pe.label)}${a(Pe.branch)}（${Pe.weight}分）`).join("、")}</span>`:'<span class="pp-st-odd">无异类</span>',be=Y.congProb!=null?`　从格 ${a(Y.congRange)}`:"　不套从格概率",fe=Y.balance||{},Ae=fe.branch?`　支 ${fe.branch.A}:${fe.branch.B}　合干 ${fe.total?`${fe.total.A}:${fe.total.B}`:"—"}`:"";return`<div class="pp-struct" title="${a(`${Y.method}；${Y.note}`)}"><span class="pp-st-code">${a(Y.code)}</span>${x}　${H}${be}${Ae}<span class="pp-dim">　静态结构，只作标注，不改上面的旺衰评分</span></div>`})():"",$e=e.relations&&Array.isArray(e.relations.anhe)?e.relations.anhe:[],I=$e.length?`<div class="pp-anhe" title="${a(e.relations.anheNote||"")}"><b>暗合</b>${$e.map(x=>a(x)).join("　")}<span class="pp-dim">　另列，不并入上面的合冲刑害；${$e.length===1?"只一对，按口径可忽略":`共 ${$e.length} 对`}</span></div>`:"",Ee=e.shensha&&e.shensha.groups||[],_e=Ee.length?`
      <div class="pp-ssx">
        <div class="ssx-h"><b>神煞全览</b><span>共 ${e.shensha.count} 见 · ${Ee.length} 类 · 悬停看查法</span></div>
        ${Ee.map(x=>`<div class="pp-ssg"><span class="ssg-gt">${x.cat}</span><span class="ssg-gi">${x.items.map(H=>`<span class="pp-ssi ${H.luck||"neutral"}" title="${a(`${H.via}查${H.target} ｜ ${H.rule}`)}">${H.name}<em>${H.pillars.map(be=>p[be]||"").join("")}</em></span>`).join("")}</span></div>`).join("")}
        <div class="ssx-h" style="border-top:none;padding-top:4px;margin-top:4px">神煞只作参考，吉凶仍须看格局、旺衰与行运。</div>
      </div>`:"",Be=n&&n.marriage,Oe=Be?(()=>{const x=Be,H=(x.windows||[]).map(be=>`<span class="mp-mar-y${be.past?" past":""}" title="${a(`${be.ganzhi}年 · ${be.dayun?be.dayun+"运 · ":""}${(be.reasons||[]).join("；")}`)}">${be.year}<em>${be.age}岁·${be.kind}</em></span>`).join("");return`<section class="mp-mar" aria-label="婚姻">
        <div class="mp-mar-h"><b>婚姻</b><i class="mp-mar-tag">${a(x.type&&x.type.label||"")}</i></div>
        <div class="mp-mar-yrs">${H||'<span class="pp-dim">20–45 岁未见明显动婚年份</span>'}</div>
        <ol class="mp-mar-lines">${(x.lines||[]).map(be=>`<li>${a(be)}</li>`).join("")}</ol>
        <details class="mp-mar-b"><summary>依据与口径</summary><div>${a(x.basis||"")}</div></details>
      </section>`})():"",fa=n&&n.life,ba=fa?(()=>{const x=fa,H=[["career","事业",x.career],["wealth","财运",x.wealth],["study","学业",x.study],["health","健康",x.health],["children","子女",x.children],["kin","六亲",x.kin]].filter(fe=>fe[2]&&Array.isArray(fe[2].lines)&&fe[2].lines.length);if(!H.length)return"";const be=(fe,Ae,Pe)=>`<div class="mp-life-f" data-face="${fe}"><b>${a(Ae)}</b>${Pe.lines.map(Ie=>`<p>${a(Ie)}</p>`).join("")}</div>`;return`<section class="mp-life" aria-label="人生六面">
        <div class="mp-life-h"><b>人生六面</b><i class="mp-life-tag">事业 · 财运 · 学业 · 健康 · 子女 · 六亲</i></div>
        <div class="mp-life-grid">${H.map(([fe,Ae,Pe])=>be(fe,Ae,Pe)).join("")}</div>
        <details class="mp-life-b"><summary>口径</summary><div>六面共用同一套原料（十神权重、用神喜忌、大运流年），各自口径见每段末尾说明。属规则化读法，不是对具体事件的断言。</div></details>
      </section>`})():"",Ua=n&&n.chenggu,vn=Ua?(()=>{const x=Ua,H=["year","month","day","hour"].map(fe=>{const Ae=x.weights&&x.weights[fe]||{label:""};return`<span class="mp-bzcg-w">${a(String(Ae.label).split(" ")[0])} <b>${a(String(Ae.label).split(" ")[1]||"")}</b></span>`}).join(""),be={上上:"band-top",中上:"band-good",中平:"band-mid",中下:"band-weak",下下:"band-low"}[x.verdict&&x.verdict.band]||"band-mid";return`<section class="mp-bzcg open" aria-label="袁天罡称骨">
        <div class="mp-bzcg-h"><b>袁天罡称骨</b><i class="mp-bzcg-tag">民俗参考</i></div>
        <div class="mp-bzcg-hero"><b>${a(x.total&&x.total.label||"")}</b><span class="mp-bzcg-bandchip ${be}">${a(x.verdict&&x.verdict.band||"")}</span></div>
        <div class="mp-bzcg-lunar">${a(x.lunar&&x.lunar.text||"")}</div>
        <div class="mp-bzcg-ws">${H}</div>
        ${x.song&&x.song.text?`<div class="mp-bzcg-song">「${a(x.song.text)}」</div>`:""}
        ${x.song&&x.song.plain?`<div class="mp-bzcg-plain"><em>释义</em>${a(x.song.plain)}</div>`:""}
        ${x.verdict&&x.verdict.text?`<div class="mp-bzcg-band">${a(x.verdict.text)}</div>`:""}
        <div class="mp-bzcg-note">称骨为通行本口径的民俗参考，与上方四柱旺衰是两套独立口径，互不推导。</div>
      </section>`})():"";return o.briefHTML(e)+o.oneLineHTML(e,n)+`<div class="pp" style="padding:12px">
      <table class="pp-bz">${u}<tbody>${P}</tbody></table>
      ${e.hourUnknown?'<div class="pp-warn" role="note">时柱暂缺：只排年/月/日三柱，起运与交运按日估算。时柱按正午暂算，涉及时柱的结论仅供参考。</div>':""}
      <div class="pp-rel"><div><b>天干</b>${e.relations&&e.relations.stems.length?e.relations.stems.join(" · "):"—"}</div>
      <div><b>地支</b>${e.relations&&e.relations.branches.length?e.relations.branches.join(" · "):"—"}</div></div>
      ${ee}
      ${ye}
      ${I}
      ${J("格局",Me)}
      ${J("用神",he)}
      ${Oe}
      ${ba}
      ${w}
      ${Array.isArray(e.classics)&&e.classics.length?`<section class="mp-cl" aria-label="古籍原文">
        <div class="mp-cl-h"><b>古籍原文</b><span>照录通行本，释义为白话自撰</span></div>
        ${e.classics.map(x=>`<div class="mp-cl-e">
          <div class="mp-cl-t"><b>${a(({ziping:"子平真诠",ditian:"滴天髓",sanming:"三命通会"}[x.book]||x.book)+"·"+x.chapter)}</b></div>
          <div class="mp-cl-q">「${a(x.quote)}」</div>
          <div class="mp-cl-p">${a(x.plain)}</div>
        </div>`).join("")}
      </section>`:""}
      ${J("五行与十神",`<div class="pp-chips">${te}</div>${z}`)}
      ${J("大运",`${o.curveHTML(e)}<div class="pp-chips">${q}</div>`)}
      ${pe?J("流年",pe+S):""}
      ${e.palaces?J("胎命身",`<div class="pp-chips">
        <span class="pp-chip" title="${a(e.palaces.taiyuan.note)}">胎元 ${a(e.palaces.taiyuan.ganzhi)}</span>
        ${e.palaces.taixi?`<span class="pp-chip" title="${a(e.palaces.taixi.note)}">胎息 ${a(e.palaces.taixi.ganzhi)}</span>`:""}
        ${e.palaces.minggong?`<span class="pp-chip" title="${a(e.palaces.minggong.note)}">命宫 ${a(e.palaces.minggong.ganzhi)}</span>`:""}
        ${e.palaces.shengong?`<span class="pp-chip" title="${a(e.palaces.shengong.note)}">身宫 ${a(e.palaces.shengong.ganzhi)}</span>`:""}
        ${!e.palaces.minggong||!e.palaces.shengong?'<span class="pp-chip" title="命宫与身宫由生月与生时支合数定宫；时柱暂缺，这两宫不排">命宫·身宫 时柱暂缺不排</span>':""}
      </div>`):""}
      ${_e}
      ${vn}
      <div style="margin-top:8px;font-size:12px;color:var(--muted)">上一节 ${e.jieqi.previous.name} ${e.jieqi.previous.time}　下一节 ${e.jieqi.next.name} ${e.jieqi.next.time}　${e.dayun.rule}，${e.dayun.startAge.years}岁起运${e.dayun.jiao&&e.dayun.jiao.at?`（交运 ${e.dayun.jiao.at}，${e.dayun.jiao.frame}）`:""}${e.dayun.startAgeExact&&Number.isInteger(e.dayun.startAgeExact.years)?`　精确 ${e.dayun.startAgeExact.years}年${e.dayun.startAgeExact.months}月${e.dayun.startAgeExact.days}天${e.dayun.startAgeExact.hours}时（截断到日时；上面是四舍五入到月）`:""}</div>
    </div>`};const ht={natal:"命盘解析",divination:"卦象解析",card:"牌阵解析"},Ea={同向:"good",有张力:"watch",互补:"alt"},at=e=>`<div class="mp-cross">${e.map(n=>{const i=Ea[n.stance]||"plain";return`<div class="mp-cross-row">
      <div class="mp-cross-h"><span class="mp-cross-l">${a(n.label)}</span><span class="mp-cross-tag t-${i}">${a(n.stance||"—")}</span></div>
      <div class="mp-cross-b">
        <div class="mp-cross-cell"><b>八字</b><span>${a(n.bazi||"—")}</span></div>
        <div class="mp-cross-cell"><b>紫微</b><span>${a(n.ziwei||"—")}</span></div>
      </div>
      ${n.note?`<div class="mp-cross-note">${a(n.note)}</div>`:""}
    </div>`}).join("")}</div>`,_a={positive:["偏顺","good"],negative:["偏卡","watch"],mixed:["两头都有","alt"],undetermined:["暂难定向","plain"]},Ft={high:"高",medium:"中",low:"低"},Ha={木:"木",火:"火",土:"土",金:"金",水:"水"};o.envRatio=function(){try{if(typeof location<"u"&&location.search){const e=/[?&]env=(\d{1,3})/.exec(location.search);if(e)return Math.max(0,Math.min(100,Number(e[1])))}if(typeof localStorage<"u"){const e=localStorage.getItem("mp-env-ratio");if(e!==null&&e!=="")return Math.max(0,Math.min(100,Number(e)))}}catch{}return 100},o.envFor=function(e,n){const i=e&&e.envelope;if(!i||n&&n.envelope===!1)return null;const p=o.envRatio();if(p>=100)return i;if(p<=0)return null;const r=typeof window<"u"&&(window.Engine||window.__PP&&window.__PP.Engine)||null;return r&&typeof r.pickVariant=="function"?r.pickVariant(i.meta&&i.meta.chart_id,p)==="envelope"?i:null:i},o.envelopeHeadHTML=function(e){if(!e||!e.verdict||!e.verdict.headline)return"";const n=e.verdict,[i,p]=_a[n.direction]||_a.undetermined,r=(e.evidence||[]).length,d=(e.factors||[]).length,c=(e.conflicts||[]).length,m=`按 ${r} 条盘面事实、${d} 条关键因素推出来的${c?`；其中 ${c} 处各家有分歧，已在文末标明`:""}。把握说的是这套规则推得有多一致，不是这件事实际发生的概率。`;return`<div class="mp-env-head">
      <h2 class="mp-env-kicker">结论</h2>
      <div class="mp-env-hl">${a(n.headline)}</div>
      <div class="mp-env-row">
        <span class="mp-env-dir t-${p}">${a(i)}</span>
        <details class="mp-env-confq">
          <summary class="mp-env-conf">把握 ${a(Ft[n.confidence]||"中")}</summary>
          <div class="mp-env-confq-body">${a(m)}</div>
        </details>
        ${e.degraded?'<span class="mp-env-deg">已简化</span>':""}
      </div>
      ${n.condition?`<div class="mp-env-cond">${a(n.condition)}</div>`:""}
    </div>`},o.envelopeHTML=function(e){if(!e||!Array.isArray(e.factors)||!e.factors.length)return"";const n=new Map((e.evidence||[]).map(m=>[m.id,m])),i=e.factors.map((m,g)=>{const f=(m.evidence_refs||[]).map($=>n.get($)).filter(Boolean),u=f.length?`<details class="mp-env-why"><summary>为什么</summary><div class="mp-env-why-body">${f.map($=>`<div class="mp-env-ev"><b>${a($.label)}</b><span>${a($.detail)}</span></div>`).join("")}</div></details>`:"",h=m.duplicate_count?`<span class="mp-env-dup">另有 ${m.duplicate_count} 处同义表述已并入</span>`:"";return`<div class="mp-env-f-row">
        <div class="mp-env-f-no">${g+1}</div>
        <div class="mp-env-f-main">
          <div class="mp-env-f-top"><b>${a(m.name)}</b><span class="mp-env-f-state">${a(m.state)}</span>${h}</div>
          <div class="mp-env-f-impact">${a(m.impact)}</div>
          ${u}
        </div>
      </div>`}).join(""),p=(e.timeline||[]).length?`<div class="mp-env-tl">${e.timeline.map(m=>`<div class="mp-env-tl-row"><span class="mp-env-tl-w">${a(m.window)}</span>${m.pace?`<span class="mp-env-tl-p">${a(m.pace)}</span>`:""}${m.note?`<span class="mp-env-tl-n">${a(m.note)}</span>`:""}</div>`).join("")}</div>`:"",r=(e.advice||[]).length?`<div class="mp-env-adv"><h3 class="mp-env-adv-h">怎么做</h3><ol>${e.advice.map(m=>`<li>${a(m)}</li>`).join("")}</ol></div>`:"",d=e.risk?`<div class="mp-env-risk"><h3 class="mp-env-risk-h">留意</h3>${a(e.risk)}</div>`:"",c=(e.conflicts||[]).length?`<details class="mp-env-cf"><summary>流派说明（${e.conflicts.length} 条）</summary><div class="mp-env-cf-body">${e.conflicts.map(m=>`<div class="mp-env-cf-item"><b>${a(m.topic)}</b>${(m.views||[]).map(g=>`<div class="mp-env-cf-view"><span>${a(g.school)}</span>${a(g.stance)}</div>`).join("")}${m.note?`<em>${a(m.note)}</em>`:""}</div>`).join("")}</div></details>`:"";return`<div class="mp-env">
      <h2 class="mp-env-sec-h">关键几点</h2>
      <div class="mp-env-f">${i}</div>
      ${p}${r}${d}${c}
    </div>`},o.interpretHTML=function(e,n){if(!e||!(e.dimensions&&e.dimensions.length||e.sections&&e.sections.length)&&!e.error&&!e.answer)return"";const p=!!(n&&n.folded),r=(e.dimensions||[]).map((y,ce)=>`<div class="mp-it-dim${y.focused?" focus":""}">
      <div class="mp-it-dh"><span class="mp-it-dno">${ce+1}</span><span class="mp-it-dlabel">${a(y.label)}</span>${y.focused?'<span class="mp-it-focus">最贴近你的问题</span>':""}${y.confidence?`<span class="mp-it-conf c-${a(y.confidence)}" title="这一维推演的稳定程度，不是这件事发生的概率">把握 ${a(y.confidence)}</span>`:""}</div>
      ${y.plain?`<div class="mp-it-dplain">${a(y.plain)}</div>`:""}
      <div class="mp-it-dtext">${a(y.text)}</div>
      ${y.evidence&&y.evidence.length?`<details class="mp-it-ev"><summary>依据 · ${a(y.evidence.length)} 条盘面事实</summary><div class="mp-it-ev-body">${y.evidence.map(S=>`<span class="mp-it-ev-item">${a(S)}</span>`).join("")}<span class="mp-it-ev-tech">技法：${a(e.technique||e.systemLabel||"")}</span></div></details>`:""}
      ${y.knowledge&&y.knowledge.length?`<div class="mp-it-knowref"><a href="#mp-sec-know">依据与出处 ${y.knowledge.length} 条 →</a>${y.knowledge.some(S=>S.status!=="settled")?'<span class="know-flag">本维有异说或待核实</span>':""}</div>`:""}
      ${y.advice?`<div class="mp-it-adv"><b>建议</b>${a(y.advice)}</div>`:""}
    </div>`).join(""),d=e.outline&&e.outline.length?`<div class="mp-outline"><h3 class="mp-outline-h">一页读懂</h3>${e.outline.map(y=>`<div class="mp-outline-row"><b>${a(y.label)}</b><span>${a(y.text)}</span></div>`).join("")}</div>`:"",c=e.sections||[],m=c.filter(y=>y.kind!=="method"),g=c.filter(y=>y.kind==="method"),f=c.length?`<nav class="mp-toc" aria-label="报告目录">${m.map(y=>`<a href="#mp-sec-${a(y.key)}">${a(y.label)}</a>`).join("")}${g.length?'<a href="#mp-sec-method">方法与出处</a>':""}</nav>`:"",u=e.tables&&e.tables.length?`<div class="mp-tables">${e.tables.filter(y=>Array.isArray(y.rows)&&y.rows.length).map(y=>`<div class="mp-table-wrap">
          <div class="mp-table-h">${a(y.title)}</div>
          <div class="mp-table-scroll"><table class="mp-table">
            <thead><tr>${y.columns.map(ce=>`<th scope="col">${a(ce)}</th>`).join("")}</tr></thead>
            <tbody>${y.rows.map(ce=>`<tr>${ce.map((S,R)=>`<td data-label="${a(y.columns[R]||"")}">${a(S)}</td>`).join("")}</tr>`).join("")}</tbody>
          </table></div>
        </div>`).join("")}</div>`:"",h=y=>String(y||"").split(`
`).map(ce=>`<div class="mp-it-p">${a(ce).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>")}</div>`).join(""),$=(e.dimensions||[]).reduce((y,ce)=>y.concat((ce.knowledge||[]).map(S=>({...S,dimLabel:ce.label}))),[]),T=Array.isArray(e.facts)?e.facts:[],L={};for(let y=0;y<T.length;y+=1)L[T[y].id]=y+1;const E=y=>{const ce=Array.isArray(y.refs)?y.refs.filter(R=>L[R]):[];return ce.length?`<div class="mp-it-refs"><a href="#mp-facts">${ce.map(R=>L[R]).sort((R,ee)=>R-ee).map(R=>`[${R}]`).join("")}</a> 盘面事实</div>`:""},re=T.length?`<details class="mp-it-sec mp-it-facts" id="mp-facts">
        <summary><span class="mp-it-sh">盘面事实</span><span class="mp-it-mnum">${T.length} 条 · 正文里的 [n] 指这里</span></summary>
        <div class="mp-it-sub">${T.map((y,ce)=>`<div class="fact-row"><em class="fact-no">[${ce+1}]</em>${y.group===y.label?"":`<em class="fact-g">${a(y.group)}</em>`}<b>${a(y.label)}</b><span>${a(y.value)}</span></div>`).join("")}</div>
      </details>`:"",F=y=>`<div class="mp-it-sec${y.tone?` tone-${a(y.tone)}`:""}" id="mp-sec-${a(y.key)}">
        <h3 class="mp-it-sh">${a(y.label)}${E(y)}</h3>
        <div class="mp-it-stext">${Array.isArray(y.items)&&y.items.length?at(y.items):h(y.text)}</div>
      </div>`,P=o.signatureHTML(),te=g.length||$.length?`<details class="mp-it-sec mp-it-method" id="mp-sec-method">
        <summary><span class="mp-it-sh">方法与出处</span><span class="mp-it-mnum">${g.length?`${g.length} 段`:""}${g.length&&$.length?" · ":""}${$.length?`依据 ${$.length} 条`:""} · 怎么算的、哪里没算、口径分歧</span></summary>
        ${$.length?`<div class="mp-it-sub" id="mp-sec-know"><div class="mp-it-sh">依据与出处</div>${$.map(y=>`<div class="know-row"><span class="know-status ${a(y.status)}">${a(y.statusLabel)}</span><span class="know-body"><em class="know-dim">${a(y.dimLabel)}</em><b>${a(y.gist)}</b>${a(y.detail)}${y.source?`<i>出处：${a(y.source)}</i>`:""}${y.note?`<em>注：${a(y.note)}</em>`:""}</span></div>`).join("")}${e.knowledgeNote?`<div class="know-disc">${a(e.knowledgeNote)}</div>`:""}</div>`:""}
        ${g.map(y=>`<div class="mp-it-sub"><div class="mp-it-sh">${a(y.label)}</div><div class="mp-it-stext">${Array.isArray(y.items)&&y.items.length?at(y.items):h(y.text)}</div></div>`).join("")}
        ${P}
      </details>`:P,K=c.length||$.length||T.length?`<div class="mp-it-secs">${m.map(F).join("")}${re}${te}</div>`:`<div class="mp-it-secs">${P}</div>`,O=[e.systemLabel,ht[e.moduleType]||e.moduleType].filter(Boolean),J=e.ask,V=J&&J.question?a(J.question):"",Le=J&&(V||J.direction&&J.direction!=="general")?`<div class="mp-it-ask">${V?`<span class="ask-q">问题：${V}</span><span class="ask-sep">｜</span>`:""}<span class="ask-d">询问方向：${a(J.directionLabel||"综合")}</span></div>`:"",Me=e.answer?`<div class="mp-it-ans"><b>${V?"先答所问":"先看结论"}</b>${a(e.answer)}</div>`:"",Z=e.plain?`<div class="mp-it-plain"><b>说人话</b>${a(e.plain)}</div>`:"",he=e.followups&&e.followups.length?`<div class="mp-it-fu"><b>还可以这样追问</b><ul>${e.followups.map(y=>`<li>${a(y)}</li>`).join("")}</ul></div>`:"",ne=e.glossary&&e.glossary.length?`<details class="mp-it-gloss"><summary>名词解释（${e.glossary.length} 条）</summary>${e.glossary.map(y=>`<div><span>${a(y.term)}</span>${a(y.plain)}</div>`).join("")}</details>`:"",w=e.limits&&e.limits.length?`<details class="mp-it-limits"><summary>本插件不回答什么（${e.limits.length} 条）</summary>${e.limits.map(y=>`<div><b>${a(y.title)}</b>${a(y.text)}</div>`).join("")}</details>`:"",q=e.system&&/^(liuyao|meihua|daliuren|qimen|tarot|xiaoliuren)$/.test(e.system)?`<div class="mp-askcopy-row"><button type="button" class="mp-askcopy" data-mp-askcopy="${a(e.system)}">复制问事提示</button><span class="mp-askcopy-hint">把这张盘和你的问题打包成一段提示，粘到任何对话里都能用</span></div>`:"",pe=e.guide?`<details class="mp-guide">
      <summary><b>${a(e.guide.title)}</b><span class="mp-guide-sub">数 / 象 / 辞</span></summary>
      <div class="mp-guide-body">
        <p class="mp-guide-lead">${a(e.guide.lead)}</p>
        <ol class="mp-guide-layers">${(e.guide.layers||[]).map(y=>`<li><b>${a(y.name)}<i>${a(y.sub)}</i></b><span>${a(y.text)}</span><em>${a(y.hint)}</em></li>`).join("")}</ol>
        <div class="mp-guide-check"><b>${a(e.guide.check.title)}</b><ol>${(e.guide.check.items||[]).map(y=>`<li>${a(y)}</li>`).join("")}</ol><p>${a(e.guide.check.tail)}</p></div>
        <div class="mp-guide-parts"><b>${a(e.guide.parts.title)}</b><ul>${(e.guide.parts.rows||[]).map(y=>`<li><span>${a(y[0])}</span>${a(y[1])}</li>`).join("")}</ul><p>${a(e.guide.parts.tail)}</p></div>
        <p class="mp-guide-close">${a(e.guide.closing)}</p>
      </div></details>`:"",le=n&&n.noBody?"":o.envelopeHTML(o.envFor(e,n));return`<div class="mp-it${p?" folded":""}">
      <button type="button" class="mp-it-head" aria-expanded="${p?"false":"true"}">
        <span class="mp-it-arrow" aria-hidden="true">▾</span>
        <span class="mp-it-title">解析与详解</span>${O.map(y=>`<span class="mp-it-tag">${a(y)}</span>`).join("")}
        <span class="mp-it-hint">${p?"点击展开":"点击收起"}</span>
      </button>
      <div class="mp-it-wrap">
        ${le}
        ${q}
        ${Le}
        ${Me}
        ${Z}
        ${e.lead?`<div class="mp-it-lead">${a(e.lead)}</div>`:""}
        ${e.error?`<div class="mp-it-err">这段解读这次没生出来，盘面数据本身是好的${e.errorId?`（编号 ${a(e.errorId)}，反馈时报它）`:""}${window.__MPCompose&&window.__MPCompose.devOn&&window.__MPCompose.devOn()?`<details class="mp-it-errd"><summary>失败原因（只在开发者视图显示）</summary><code>${a(e.error)}</code></details>`:""}</div>`:""}
        ${d}
        ${f}
        <div class="mp-it-body">${r}</div>
        ${K}
        ${u}
        ${pe}
        ${he}
        ${ne}
        ${w}
        <div class="mp-it-dis">${a(e.disclaimer)}</div>
      </div>
    </div>`},o.followupHTML=function(e){if(!e)return"";const n=e.evidence&&e.evidence.length?`<div class="mp-fu-ev">依据：${e.evidence.map(i=>a(i)).join("；")}　置信度：${a(e.confidence||"弱")}</div>`:"";return`<div class="mp-fu${e.ok?"":" miss"}">
      <div class="mp-fu-h">追问 · ${a(e.question)}</div>
      <div class="mp-fu-a">${a(e.answer)}</div>
      ${n}
    </div>`},o.solarLineHTML=function(e){if(!e)return"";const n=e.solarTime||{},i=typeof n.offsetMinutes=="number"?n.offsetMinutes:typeof e.offsetMinutes=="number"?e.offsetMinutes:null;if(i==null||!i)return"";const p=String(n.trueSolarText||e.trueSolarText||"");if(/时辰未知/.test(p))return"";const r=i>0?"+":"−",d=(Math.round(Math.abs(i)*10)/10).toFixed(1),c=/(\d{1,2}:\d{2})/.exec(p),m=String(n.note||""),g=/夏令时/.test(m)?'<b class="mp-solar-dst">已扣夏令时 1 小时</b>':"",f=m?`<details class="mp-solar-why"><summary>怎么算的</summary><div>${a(m)}</div></details>`:"";return`<p class="mp-solar">真太阳时修正 <b>${r}${d} 分</b>${c?`，时柱按 <b>${a(c[1])}</b> 起`:""}${g}${f}<span>（勾掉「真太阳时」就按钟表时间排）</span></p>`},o.envHeadHTML=function(e,n){const i=o.envFor(e,n),p=i?o.envelopeHeadHTML(i):"";return p||o.factHeadHTML(e&&e.factHead)},o.envBodyHTML=function(e,n){return o.envelopeHTML(o.envFor(e,n))},o.resultWithInterpret=function(e,n,i){const p=i&&i.noHead?"":o.envHeadHTML(n,i),r=o.interpretHTML(n,i);return p+(e||"")+(r||o.signatureHTML())},o.caliberHTML=function(e){const n=e&&Array.isArray(e.switches)?e.switches.filter(g=>g&&g.key):[];if(!n.length)return"";const i=n.filter(g=>!g.error&&g.total>0),p=i.length?`${n.length} 组开关中 ${i.length} 组影响此盘：${i.map(g=>g.short||g.title).join("、")}。`:`本盘对 ${n.length} 组开关都不敏感：换成另一档也不变。`,r=g=>{if(g.error)return`<div class="mp-cdiff-same">未能对照：${a(g.error)}</div>`;if(!g.total)return'<div class="mp-cdiff-same">无变化 · 此盘不受这一开关影响</div>';const f=Array.isArray(g.roots)?g.roots:[];return f.length?`<div class="mp-cdiff-roots">${f.map(u=>`<div class="mp-cdiff-root"><span class="mp-cdiff-k">${a(u.label)}</span><span class="mp-cdiff-from">${a(u.from)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-to">${a(u.to)}</span></div>`).join("")}</div>`:`<div class="mp-cdiff-same">无单一根因；逐字段差异 ${Number(g.total)||0} 处</div>`},d=g=>{const f=(Array.isArray(g.views)?g.views:[]).filter(u=>u&&u.changed);return g.error||!g.total||!f.length?"":`<table class="mp-cview"><thead><tr><th scope="col">项</th><th scope="col">${a(g.currentLabel)}</th><th scope="col">${a(g.altLabel)}</th></tr></thead><tbody>`+f.map(u=>`<tr><th scope="row">${a(u.label)}</th><td>${a(u.current)}</td><td>${a(u.alt)}</td></tr>`).join("")+"</tbody></table>"},c=g=>{const f=Array.isArray(g.categories)?g.categories:[];if(g.error||!g.total||!f.length)return"";const u=f.slice(0,6);return`<div class="mp-cdiff-cats">${u.map(h=>`<span class="mp-cdiff-cat">${a(h.name)} ${Number(h.count)||0} 处</span>`).join("")}`+(f.length>u.length?`<span class="mp-cdiff-cat">另 ${f.length-u.length} 类</span>`:"")+"</div>"},m=n.map(g=>`<div class="mp-cdiff-row"><div class="mp-cdiff-h"><b>${a(g.title)}</b><span class="mp-cdiff-count${g.total>0?" on":""}">${g.error?"未能对照":g.total?`${Number(g.total)||0} 处`:"无变化"}</span></div><div class="mp-cdiff-ab"><span class="mp-cdiff-pill now">当前 · ${a(g.currentLabel)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-pill alt">换成 · ${a(g.altLabel)}</span></div>${r(g)}${d(g)}${c(g)}</div>`).join("");return`<details class="mp-cdiff" aria-label="口径对照">
      <summary><span class="mp-cdiff-title">口径对照</span><span class="mp-cdiff-lead">${a(p)}</span><span class="mp-cdiff-more">展开逐字差异</span></summary>
      <div class="mp-cdiff-body">${m}
        <div class="mp-cdiff-note">同一组输入、只换一个开关；只列变化字段与根因，不判哪套口径更准，也不改上方盘面。</div>
      </div>
    </details>`},o.handleHTML=function(e){return typeof e!="string"||!e?"":`<section class="mp-handle" aria-label="排盘句柄">
      <span class="mp-handle-title">排盘句柄</span>
      <code class="mp-handle-code" title="${a(e)}">${a(e)}</code>
      <button type="button" class="mp-handle-copy" data-handle-copy="${a(e)}" aria-label="复制排盘句柄">复制句柄</button>
      <span class="mp-handle-hint">追问同一张盘时把它连同增量参数（年份、方向、所问之事）一并交给助手，不必重报出生信息。句柄是编码不是加密，含出生时间与出生地，别公开贴出。</span>
    </section>`},o.revisionHTML=function(e){if(!e||typeof e!="object")return"";const n=Array.isArray(e.applied)?e.applied:[],i=Array.isArray(e.ignored)?e.ignored:[];if(!n.length&&!i.length)return"";const p=n.map(r=>{const d=r.fromDisplay==null?"（未设）":r.fromDisplay;return`<li><span class="k">${a(r.label||r.key)}</span><span class="v"><span class="old">${a(d)}</span> → <span class="new">${a(r.display)}</span></span></li>`}).join("");return`<section class="mp-revise" aria-label="一句话改参">
      <div class="mp-revise-head"><span class="mp-revise-title">一句话改参</span><span class="mp-revise-text">「${a(e.text||"")}」</span></div>
      ${p?`<ul class="mp-revise-list">${p}</ul>`:'<p class="mp-revise-ignored">没有识别到可改的参数，仍按原参数排盘。</p>'}
      ${i.length?`<p class="mp-revise-ignored">未处理：${a(i.join("；"))}</p>`:""}
    </section>`},o.shadowHTML=function(e,n){if(!e||!e.id)return"";const i=[];e.version&&i.push(`版本 <b>${a(e.version)}</b>`),e.baseId&&i.push(`基础指纹 <b>${a(e.baseId)}</b>`),i.push("同参数同 ID");const p=[];e.reproducible===!1&&p.push(`不可复算：${a(e.reason||"参数不足")}`);const r=e.reproducible===!0&&e.asOfPinned===!1&&(e.system==="bazi"||e.system==="ziwei")?'<div class="mp-shadow-hint">未固定 asOf：流年 / 流月随「此刻」变化；要逐字比对请在输入里固定 asOf。</div>':"",d=n&&n.sameId!==!1&&(n.versionChanged||Number(n.total)>0);let c="";if(d){const m=Number(n.total)||0,g=a(n.fromVersion||"—"),f=a(n.toVersion||e.version||"—"),u=Array.isArray(n.roots)?n.roots:[],h=u.slice(0,8),$=h.length?`<div class="mp-cdiff-roots">${h.map(E=>`<div class="mp-cdiff-root"><span class="mp-cdiff-k">${a(E.label)}</span><span class="mp-cdiff-from">${a(E.from)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-to">${a(E.to)}</span></div>`).join("")}`+(u.length>h.length?`<div class="same">另 ${u.length-h.length} 处根因</div>`:"")+"</div>":`<div class="same">${m?"无单一根因；逐字段变化 "+m+" 处":"字段 0 处变化：同一张盘跨版本逐字一致"}</div>`,T=Array.isArray(n.categories)?n.categories:[],L=T.length?`<div class="mp-cdiff-cats">${T.slice(0,6).map(E=>`<span class="mp-cdiff-cat">${a(E.name)} ${Number(E.count)||0} 处</span>`).join("")}`+(T.length>6?`<span class="mp-cdiff-cat">另 ${T.length-6} 类</span>`:"")+"</div>":"";c=`<details class="mp-shadow-diff"${m>0?" open":""}>
        <summary><b>与上次同盘比对</b><span class="tag">${g} → ${f} · ${m?`${m} 处变化`:"0 处变化"}</span></summary>
        ${$}${L}
        <div class="note">同一 baseId（同一组归一化参数）的两次结果；只比盘面字段，不含摘要、解析与古籍等文本层。</div>
      </details>`}return`<section class="mp-shadow" aria-label="影子盘">
      <div class="mp-shadow-head"><span class="mp-shadow-title">影子盘</span><code class="mp-shadow-id">${a(e.id)}</code>
        <button type="button" class="mp-shadow-copy" data-shadow-copy="${a(e.id)}" aria-label="复制影子盘 ID">复制 ID</button></div>
      <div class="mp-shadow-meta">${i.join('<span aria-hidden="true">·</span>')}</div>
      ${p.map(m=>`<div class="mp-shadow-warn">⚠ ${m}</div>`).join("")}
      ${r}
      ${c}
    </section>`},o.shadowTrack=function(e){const n=window.Engine||window.__PP&&window.__PP.Engine;if(!n||!n.shadowSnapshot||!n.shadowDiff)return null;let i=null;try{i=n.shadowSnapshot(e)}catch{return null}if(!i||!i.shadow||!i.shadow.baseId)return null;const p="mp-shadow-v1";let r={};try{const m=window.localStorage?window.localStorage.getItem(p):null,g=m?JSON.parse(m):{};g&&typeof g=="object"&&!Array.isArray(g)&&(r=g)}catch{r={}}const d=r[i.shadow.baseId];let c=null;if(d)try{c=n.shadowDiff(d,i)}catch{c=null}i.at=Date.now(),r[i.shadow.baseId]=i;try{const m=Object.keys(r);if(m.length>24){m.sort((g,f)=>(Number(r[g]&&r[g].at)||0)-(Number(r[f]&&r[f].at)||0));for(const g of m.slice(0,m.length-24))delete r[g]}window.localStorage&&window.localStorage.setItem(p,JSON.stringify(r))}catch{}return c};const $a="dsh-metaphysics/profiles-v1",ca=24,tt=16,nt=40,Bt=60,na=["bazi","ziwei","liuyao","tarot","meihua","daliuren","hepan","qimen","almanac","zeri","chenggu","xiaoliuren","star","numerology","mbti","trend","fengshui","name","convert"];o.PROF_KEY=$a,o.PROF_MAX=ca,o.PROF_KINDS=na;const Ut={bazi:"八字",ziwei:"紫微",liuyao:"六爻",tarot:"塔罗",meihua:"梅花",daliuren:"六壬",hepan:"合盘",qimen:"奇门",almanac:"黄历",zeri:"择日",chenggu:"称骨",xiaoliuren:"小六壬",star:"星座",numerology:"生命数字",mbti:"人格",trend:"人生K线",fengshui:"风水",name:"起名",convert:"农历"};o.profKindLabel=e=>Ut[e]||String(e||"");const je=e=>typeof e=="string";function Oa(e){if(!e||typeof e!="object"||Array.isArray(e)||!je(e.id)||!e.id||e.id.length>40||!je(e.kind)||na.indexOf(e.kind)<0)return null;const n=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e.date||""));if(!n)return null;const i=Number(n[1]),p=Number(n[2]),r=Number(n[3]);if(p<1||p>12||r<1||r>new Date(i,p,0).getDate())return null;const d=je(e.time)&&/^([01]?\d|2[0-3]):[0-5]\d$/.test(e.time)?e.time:"";return{id:e.id,kind:e.kind,label:je(e.label)?e.label.slice(0,tt):"",date:e.date,time:e.hourUnknown===!0?"":d,hourUnknown:e.hourUnknown===!0,trueSolar:e.trueSolar!==!1,lateZi:e.lateZi!==!1,gender:e.gender==="male"||e.gender==="female"?e.gender:"",address:je(e.address)?e.address.slice(0,nt):"",note:je(e.note)?e.note.slice(0,Bt):"",pinned:e.pinned===!0,createdAt:Number(e.createdAt)||0,lastUsedAt:Number(e.lastUsedAt)||0,uses:Number(e.uses)||0}}function ma(){try{const e=window.localStorage?window.localStorage.getItem($a):null,n=e?JSON.parse(e):[];return Array.isArray(n)?n:[]}catch{return[]}}function ua(e){return e.slice().sort((n,i)=>(i.pinned?1:0)-(n.pinned?1:0)||(i.lastUsedAt||i.createdAt||0)-(n.lastUsedAt||n.createdAt||0)||(i.createdAt||0)-(n.createdAt||0))}o.profilesLoad=function(){const e=[],n=Object.create(null);for(const i of ma()){const p=Oa(i);p&&!n[p.id]&&(n[p.id]=1,e.push(p))}return ua(e)},o.profilesSave=function(e){const n=ua(Array.isArray(e)?e.slice(0,ca):[]);try{return window.localStorage?(window.localStorage.setItem($a,JSON.stringify(n)),!0):!1}catch{return!1}};let Pa=0;o.profilesNewId=function(){const e=Object.create(null);for(const i of o.profilesLoad())e[i.id]=1;let n;do n=`p${Date.now().toString(36)}${(Pa++).toString(36)}`;while(e[n]);return n},o.profilesPut=function(e){const n=Oa(Object.assign({id:o.profilesNewId(),createdAt:Date.now(),lastUsedAt:Date.now()},e));if(!n)return{ok:!1,list:o.profilesLoad()};const i=o.profilesLoad(),p=i.findIndex(r=>r.id===n.id);if(p>=0){const r=i[p];n.createdAt=r.createdAt||n.createdAt,n.lastUsedAt=r.lastUsedAt,n.uses=r.uses,n.pinned=r.pinned,i.splice(p,1,n)}else i.push(n);if(i.length>ca){const r=i.slice().sort((m,g)=>(m.lastUsedAt||m.createdAt)-(g.lastUsedAt||g.createdAt)),d=r.find(m=>m.id!==n.id)||r[0],c=i.indexOf(d);c>=0&&i.splice(c,1)}return o.profilesSave(i)?{ok:!0,list:ua(i),item:n}:{ok:!1,list:o.profilesLoad()}},o.profilesRemove=function(e){const n=o.profilesLoad().filter(i=>i.id!==e);return o.profilesSave(n)?n:o.profilesLoad()},o.profilesPin=function(e){const n=o.profilesLoad().map(i=>i.id===e?Object.assign({},i,{pinned:!i.pinned}):i);return o.profilesSave(n)?ua(n):o.profilesLoad()},o.profilesTouch=function(e){let n=!1;const i=o.profilesLoad().map(p=>p.id!==e?p:(n=!0,Object.assign({},p,{lastUsedAt:Date.now(),uses:(p.uses||0)+1})));return n?o.profilesSave(i)?ua(i):o.profilesLoad():i};const Gt=864e5;function Ia(e){const n=Number(e)||0;if(!n)return"未排过";const i=Math.floor((Date.now()-n)/Gt);if(i<=0)return"今天排过";if(i===1)return"昨天排过";if(i<30)return`${i} 天前排过`;const p=new Date(n);return`${p.getFullYear()}-${String(p.getMonth()+1).padStart(2,"0")}-${String(p.getDate()).padStart(2,"0")} 排过`}o.profilesAgo=Ia;const it="dsh-metaphysics/cases-v1",Fe=480,Da=["pending","hit","miss","void"],Ra={pending:"待验",hit:"应验",miss:"未应",void:"作废"},Yt=120;o.CASE_KEY=it,o.CASE_MAX=Fe,o.CASE_STATUS=Da,o.caseStatusLabel=e=>Ra[e]||Ra.pending;function Je(e){if(!e||typeof e!="object"||Array.isArray(e)||!je(e.id)||!e.id||e.id.length>64)return null;const n=e.entry;if(!n||typeof n!="object"||Array.isArray(n)||!je(n.kind)||na.indexOf(n.kind)<0||!je(n.date)&&!je(n.time)&&!je(n.question))return null;const i=Number(e.at||n.at)||0;return i?{id:e.id,at:i,status:Da.indexOf(e.status)>=0?e.status:"pending",note:je(e.note)?e.note.slice(0,Yt):"",question:je(n.question)?n.question.slice(0,80):"",entry:n}:null}function ka(){try{const e=window.localStorage?window.localStorage.getItem(it):null,n=e?JSON.parse(e):[];return Array.isArray(n)?n:[]}catch{return[]}}function ia(e){if(!window.localStorage)return!1;try{return window.localStorage.setItem(it,JSON.stringify(e.slice(0,Fe))),!0}catch{return!1}}o.casesSave=ia,o.casesLoad=function(){return ka().map(Je).filter(Boolean).sort((e,n)=>n.at-e.at||(e.id<n.id?1:-1))},o.casesNewId=function(){const e={};ka().forEach(i=>{i&&i.id&&(e[i.id]=1)});let n="";for(let i=0;i<8&&(n="c"+Date.now().toString(36)+Math.floor(Math.random()*1296).toString(36),!!e[n]);i+=1);return n},o.casesAdd=function(e,n){const i=n||{};if(!e||typeof e!="object"||Array.isArray(e))return{ok:!1,list:o.casesLoad()};const p=o.casesLoad(),r=Number(e.at)||Date.now();if(p.some(g=>g.at>r-6e4&&g.entry.kind===e.kind&&g.entry.date===e.date&&g.entry.time===e.time&&(g.entry.question||"")===(e.question||"")&&(g.entry.lines||"")===(e.lines||"")))return{ok:!0,dup:!0,list:o.casesLoad()};const c=Je({id:o.casesNewId(),at:r,status:i.status||"pending",note:i.note||"",entry:e});if(!c)return{ok:!1,list:o.casesLoad()};const m=[c].concat(p.filter(g=>g.id!==c.id)).slice(0,Fe);return ia(m)?{ok:!0,item:c,list:m}:{ok:!1,list:o.casesLoad()}},o.casesSetStatus=function(e,n){if(Da.indexOf(n)<0)return o.casesLoad();const i=ka().map(Je).filter(Boolean).map(p=>p.id===e?Object.assign({},p,{status:n}):p);return ia(i)?i:o.casesLoad()},o.casesRemove=function(e){const n=ka().map(Je).filter(Boolean).filter(i=>i.id!==e);return ia(n)?n:o.casesLoad()},o.casesExport=function(e){return(Array.isArray(e)?e:o.casesLoad()).map(i=>JSON.stringify({id:i.id,at:i.at,atISO:new Date(i.at).toISOString(),kind:i.entry.kind,label:je(i.entry.label)?i.entry.label:"",question:i.question,status:i.status,note:i.note,params:i.entry})).join(`
`)};const Zt=/^(\d{4})-(\d{2})-(\d{2})$/,st=/^(\d{1,2}):(\d{2})(:\d{2})?$/;function Kt(e){const n=je(e)&&Zt.exec(e.trim());return n?n[2]+"-"+n[3]:""}function hn(e){const n=je(e)&&st.exec(e.trim());return n?n[1]+":00":""}o.casesExportMasked=function(e){return(Array.isArray(e)?e:o.casesLoad()).map(i=>{const p=i.entry||{},r={};return Object.keys(p).forEach(d=>{if(d!=="address"){if(d==="date"){const c=Kt(p[d]);c&&(r.date=c);return}if(d==="time"){const c=hn(p[d]);c&&(r.time=c);return}d!=="question"&&(r[d]=p[d])}}),JSON.stringify({id:i.id,kind:p.kind||"",label:je(p.label)?p.label:"",status:i.status,note:"",params:r})}).join(`
`)},o.casesMigrate=function(e){const n=Array.isArray(e)?e:[];if(!n.length)return{added:0,list:o.casesLoad()};const i=ka().map(Je).filter(Boolean),p={};i.forEach(d=>{p[d.id]=1});let r=0;for(let d=0;d<n.length;d+=1){const c=n[d];if(!c||typeof c!="object"||!je(c.kind))continue;const m=Number(c.at)||0,g=`h-${m||"0"}-${d}-${c.kind}`;if(p[g])continue;const f=Je({id:g,at:m||Date.now(),status:"pending",entry:c});f&&(p[g]=1,i.push(f),r+=1)}return r&&ia(i.sort((d,c)=>c.at-d.at)),{added:r,list:o.casesLoad()}};const Vt={male:"♂",female:"♀"};o.profilesHTML=function(e,n){const i=n||{},p=(Array.isArray(e)?e:[]).map(d=>{const c=Oa(d);if(!c)return"";const m=[c.date,c.hourUnknown?"时辰未知":c.time,c.address].filter(Boolean).join(" "),g=i.editingId&&c.id===i.editingId,f=i.armedDel&&c.id===i.armedDel;return`<div class="mp-prof-card${c.pinned?" pinned":""}${g?" editing":""}" data-id="${a(c.id)}">
        <button type="button" class="mp-prof-use" data-mp-prof="use" data-id="${a(c.id)}"
          title="${a(`用「${c.label||c.kind}」的出生信息直接排盘`)}">
          <span class="mp-prof-nm">${a(c.label||"未命名")}${c.gender?`<i class="sx">${Vt[c.gender]||""}</i>`:""}</span>
          <span class="mp-prof-sys">${a(o.profKindLabel?o.profKindLabel(c.kind):c.kind)}</span>
          <span class="mp-prof-bd">${a(m)}</span>
          <span class="mp-prof-at">${a(Ia(c.lastUsedAt||c.createdAt))}${c.uses?` · ${c.uses} 次`:""}${c.pinned?" · 置顶":""}</span>
        </button>
        <span class="mp-prof-ops">
          <button type="button" data-mp-prof="pin" data-id="${a(c.id)}" class="${c.pinned?"on":""}"
            aria-pressed="${c.pinned?"true":"false"}" title="置顶这张档案">${c.pinned?"已置顶":"置顶"}</button>
          <button type="button" data-mp-prof="edit" data-id="${a(c.id)}" title="把这张档案读回输入框，改完再存">改名</button>
          <button type="button" data-mp-prof="del" data-id="${a(c.id)}" class="${f?"on":""}"
            title="${f?"再点一次就从本机删除这张档案":"从本机删除这张档案（点两次确认）"}">${f?"确认删除":"删除"}</button>
        </span>
      </div>`}).join(""),r=p?`<div class="mp-prof-list">${p}</div>`:'<p class="mp-prof-empty">还没有存过命盘。填好出生信息，给这张盘起个称呼，点「存为我的命盘」——下次进来一点就出盘，不必重报。</p>';return`<section class="mp-prof" aria-label="我的命盘">
      <div class="mp-prof-h"><b>我的命盘</b><span class="mp-prof-sub">只存本机 · 不上传${e&&e.length?` · ${e.length}/${ca}`:""}</span></div>
      ${r}
      ${i.bar||""}
    </section>`},o.profilesBarHTML=function(e){const n=e||{};return`<div class="mp-prof-bar">
        <input class="mp-prof-name" type="text" maxlength="${tt}" placeholder="称呼，如「我」「妈妈」" aria-label="档案称呼" value="${a(n.name||"")}">
        <button type="button" data-mp-prof="put"${n.canAdd===!1?" disabled":""}>${a(n.editingId?"更新这张档案":"存为我的命盘")}</button>
        ${n.editingId?'<button type="button" class="ghost" data-mp-prof="cancel">取消改名</button>':""}
        <span class="mp-prof-tip">${a(n.tip||(n.editingId?"改完出生信息或称呼，点「更新这张档案」覆盖原档。":"存的是出生时间与出生地这些输入，不是结果。"))}</span>
      </div>`},o.profEvent=function(e){let n=e&&e.closest?e.closest("[data-mp-prof]"):null;if(!n)return null;const i=n.getAttribute("data-mp-prof");return n.tagName==="BUTTON"&&n.disabled?null:{action:i,id:n.getAttribute("data-id")||"",name:n}};const Fa=["bazi","trend"],xn=["bazi","ziwei","liuyao","meihua","daliuren","qimen","hepan","chenggu","trend","fengshui","name","xiaoliuren"];o.profUsable=function(e){return!e||typeof e!="object"?!1:e.hourUnknown===!0||e.time?!0:xn.indexOf(String(e.kind||""))<0},o.profFromForm=function(e,n,i){const p=e||{},r=p.hourUnknown===!0&&Fa.indexOf(String(p.kind||""))>=0;return!r&&!/^([01]?\d|2[0-3]):[0-5]\d$/.test(String(p.time||"").trim())?null:Oa(Object.assign({id:i||o.profilesNewId(),kind:String(p.kind||""),label:String(n||"").trim().slice(0,tt)||(o.profKindLabel?o.profKindLabel(p.kind):String(p.kind||"")),date:String(p.date||""),time:String(p.time||""),hourUnknown:r,gender:String(p.gender||""),address:String(p.address||""),trueSolar:p.trueSolar!==!1,lateZi:p.lateZi!==!1,pinned:!1,createdAt:Date.now(),lastUsedAt:0,uses:0}))},o.traceHTML=function(e,n,i){if(!Array.isArray(e)||!e.length)return"";const p={liuyao:"六爻",bazi:"八字",ziwei:"紫微",qimen:"奇门",daliuren:"大六壬"}[n]||"命盘",r=e.map(g=>g&&g.field).filter(Boolean).join(" → "),d=typeof i=="string"?i:"",c=(g,f)=>{const u=String(g??"");return u.length>f?`${u.slice(0,f)}…`:u},m=e.map((g,f)=>{const u=Array.isArray(g.inputs)?g.inputs:[];return`<details class="mp-trace-step"${f===0?" open":""}>
        <summary><span class="mp-trace-no">${f+1}</span><span class="mp-trace-field">${a(g.field)}</span><span class="mp-trace-res">${a(c(g.result,44))}</span></summary>
        <div class="mp-trace-detail">
          <div class="mp-trace-rule"><b>规则</b>${a(g.rule)}</div>
          ${u.length?`<dl class="mp-trace-inputs">${u.map(h=>`<dt>${a(h.label)}</dt><dd>${a(h.value)}</dd>`).join("")}</dl>`:""}
          <div class="mp-trace-result"><b>结果</b>${a(g.result)}</div>
          ${g.source?`<div class="mp-trace-src"><b>出处</b>${a(g.source)}</div>`:""}
        </div>
      </details>`}).join("");return`<button type="button" class="mp-trace-card" data-trace-open aria-haspopup="dialog" aria-controls="mp-trace-layer">
        <span class="mp-trace-title">推导链</span><span class="mp-trace-flow">${a(r)}</span><span class="mp-trace-count">${e.length} 层 · 查看</span>
      </button>
      <div class="mp-trace-layer" id="mp-trace-layer" data-trace-layer aria-hidden="true">
        <div class="mp-trace-back" data-trace-close></div>
        <aside class="mp-trace-drawer" role="dialog" aria-modal="true" aria-labelledby="mp-trace-title">
          <div class="mp-trace-head">
            <div><b id="mp-trace-title">推导链 · ${a(p)}</b><span>${e.length} 层 · 每层给出规则、输入、结果与出处；只读，不重算</span></div>
            ${d?'<button type="button" class="mp-trace-copy" data-trace-copy aria-label="复制整条推导链的 Markdown">复制 Markdown</button>':""}
            <button type="button" class="mp-trace-close" data-trace-close aria-label="关闭推导链">✕</button>
          </div>
          <div class="mp-trace-body">${m}</div>
          ${d?`<textarea class="mp-trace-md" data-trace-md readonly hidden>${a(d)}</textarea>`:""}
        </aside>
      </div>`},o.almanacHTML=function(e){if(!e||!e.meta)return o.quickHTML(e);const n=e.ganzhi||{},i=e.dayGod||null,p=(T,L)=>(T||[]).map(E=>`<span class="mp-al-chip${L?` ${L}`:""}">${a(E)}</span>`).join(""),r=(T,L)=>L?`<div class="mp-al-cell"><em>${a(T)}</em><b>${a(L)}</b></div>`:"",d=e.xiu?`${e.xiu.name}宿（${e.xiu.luck}·${e.xiu.zheng}·${e.xiu.animal}）`:"",c=e.nayin&&e.nayin.day?e.nayin.day.name:"",m=e.chong?`${e.chong.text}${e.chong.sha?` ${e.chong.sha}`:""}`:"",g=(e.hours||[]).map(T=>`<span class="mp-al-hour ${T.luck==="吉"?"good":"bad"}"><i>${a(T.zhi)}</i><em>${a((T.ganZhi||"").slice(0,1))}</em><b>${a(T.shen||"")}</b><u>${a(T.luck||"")}</u></span>`).join(""),f=e.positions||{},u=(T,L)=>L?`<span class="mp-al-chip">${a(T)}·${a(typeof L=="string"?L:L.dir||"")}</span>`:"",h=e.lucky||{},$=i?`<span class="mp-al-badge ${i.luck==="吉"?"good":"bad"}">${a(i.name)}·${a(i.type)}·${a(i.luck)}</span>`:"";return`<section class="mp-al" aria-label="黄历">
      <div class="mp-al-h"><b>${a(e.meta.date||"")}</b><i>${a(e.meta.weekday||"")}　${a((e.lunar||{}).text||"")}</i></div>
      <div class="mp-al-gz">${a(n.year||"")}年　${a(n.month||"")}月　${a(n.day||"")}日　属${a(n.shengXiao||"")}　建除 ${a(e.zhiXing||"")}日　${$}</div>
      <div class="mp-al-yiji">
        <div class="mp-al-col"><em>宜</em><div class="mp-al-chips">${p(e.yi)}</div></div>
        <div class="mp-al-col"><em>忌</em><div class="mp-al-chips">${p(e.ji)}</div></div>
      </div>
      <div class="mp-al-grid">${r("二十八宿",d)}${r("日柱纳音",c)}${r("胎神",e.taiShen)}${r("冲煞",m)}</div>
      <div class="mp-al-row"><em>吉神方位</em><div class="mp-al-chips">${u("喜神",f.xiShen)}${u("财神",f.caiShen)}${u("福神",f.fuShen)}${u("阳贵",f.yangGui)}${u("阴贵",f.yinGui)}</div></div>
      <div class="mp-al-row"><em>时刻吉凶</em><div class="mp-al-hours">${g}</div></div>
      <div class="mp-al-row"><em>吉配生肖</em><div class="mp-al-chips">${h.liuhe?`<span class="mp-al-chip">六合·${a(h.liuhe)}</span>`:""}${p(h.sanhe||[])}</div></div>
      ${e.dailyHexagram?`<div class="mp-al-hex">每日一卦：<b>${a(e.dailyHexagram.name)}</b>　${a(e.dailyHexagram.meaning||"")}</div>`:""}
      <div class="mp-al-note">${a(e.meta&&e.meta.scope||"")}</div>
    </section>`};const ot=" liuyao tarot meihua daliuren qimen xiaoliuren ",Wt=" almanac zeri convert star numerology wuyunliuqi ",xt={cast:"先看卦名或牌名——事情此刻的样子；再看动爻、正逆位，变化在那里。",person:"先找「你」那一格（日主、命宫或主质）；再看被强调的字或星。",day:"先看今天值什么，再看宜忌那几栏。"};o.plainHTML=function(e){if(!e||e.system==="taiyi"||e.system==="qian"||e.system==="guanyin")return"";const n=e.brief&&e.brief.lead||"";if(!n)return"";const i=" "+String(e.system||"")+" ",p=ot.indexOf(i)>=0?xt.cast:Wt.indexOf(i)>=0?xt.day:xt.person;return'<div class="mp-pl"><p class="mp-pl-lead">'+a(n)+'</p><p class="mp-pl-how">'+a(p)+"</p></div>"},o.taiyiHTML=function(e){if(!e||!e.taiyi||!e.meta)return"";const n=e.taiyi,i=e.wenchang||{},p=e.shiji||{},r=e.jishen||{},d=e.suan||{},c=e.jiang||{},m=e.geju||{},f=[[9,"巽"],[2,"离"],[7,"坤"],[4,"震"],[5,"中"],[6,"兑"],[3,"艮"],[8,"坎"],[1,"乾"]].map(R=>{const ee=R[0],Y=R[1],ye=n.palace===ee,$e=i.num===ee,I=p.palace===ee,Ee=(ye?'<i class="mp-ty-mark">太乙</i>':"")+(I?'<i class="mp-ty-mark s">始击</i>':"")+($e?'<i class="mp-ty-mark w">文昌</i>':"");return`<div class="mp-ty-cell${ye?" on":""}${Y==="中"?" mid":""}"><b>${a(Y)}</b><em>${ee}</em>${Ee}</div>`}).join(""),u=e.scope&&e.scope.notCovered||[],h=e.month||{},$=e.day||{},T=e.hour||{},L=h.taiyi&&h.taiyi.palaceName||"",E=String(h.taiyi&&h.taiyi.unitInPalace||""),re=h.mu?h.mu.pos+"（"+h.mu.god+"）":"",F=h.jishen&&h.jishen.branch||"",P=$.taiyi&&$.taiyi.palaceName||"",te=String($.taiyi&&$.taiyi.unitInPalace||""),K=$.mu?$.mu.pos+"（"+$.mu.god+"）":"",O=$.jishen&&$.jishen.branch||"",J=T.taiyi&&T.taiyi.palaceName||"",V=String(T.taiyi&&T.taiyi.unitInPalace||""),Le=T.jishen&&T.jishen.branch||"",Me=e.jixiong||{},Z=e.verdict||{},he=Z.grade||Me.grade||"xiong",ne=Z.label||Me.label||"凶",w=e.shenjiang||{},z=w.rows?`${w.stem}日、${w.day?"昼贵":"夜贵"}起${w.startBranch}${w.dir>0?"顺":"逆"}行；吉神下：${(w.goods||[]).join("、")||"无"}；凶神下：${(w.bads||[]).join("、")||"无"}`:"未排",q=Me.grade||"xiong",pe=Me.label||"凶",le=e.gate&&e.gate.gate||"",y={掩:"客方的目和太乙挤在同一格",击:"始击挨在太乙左右",格:"太乙和始击隔一格正面对上",对:"文昌从对面顶过来",提:"客大将和文昌挤在一格",迫:"有将贴得太近，就在太乙前后一格",囚:"有将被关在太乙那一格里",关:"主客两边的人撞在一处"},ce=(m.list||[]).map(R=>{const ee=String(R).charAt(0);return y[ee]?ee+"——"+y[ee]:String(R)}),S=q==="xiong"?`太乙站在${n.palaceName}宫（${n.dir}），值${le}门，判凶：主客两边有几样撞到了一起。`:q==="daji"?`太乙站在${n.palaceName}宫（${n.dir}），值${le}门，判大吉：位置和数都顺，门也在吉道上。`:q==="buhe"?`太乙站在${n.palaceName}宫（${n.dir}），值${le}门，判不和：位置不冲突，但数上不合。`:`太乙站在${n.palaceName}宫（${n.dir}），值${le}门，判吉：位置不冲突。`;return`<section class="mp-ty" aria-label="太乙神数">
      <div class="mp-ty-h">
        <span class="mp-ty-y">${a(String(e.meta.year))} 年</span>
        <span class="mp-ty-j">${a(e.meta.dunText||"")}${a(String(e.meta.ju))}局</span>
        <span class="mp-ty-m">太乙临 ${a(n.palaceName||"")} 宫</span>
        <span class="mp-ty-m">${a(le)}</span>
      </div>
      <div class="mp-ty-g">${f}</div>
      <div class="mp-ty-plain">
        <p class="mp-ty-lead">${a(S)}</p>
        <p>先看太乙落在哪一格——那是「主」这一年的位置，整张盘围着它转。</p>
        <p>${a(le)}门一值三十年，管的是这三十年的大环境，不是今年单一年的事。</p>
        <p>判${a(pe)}，是因为${a(ce.length?ce.join("；"):"八种位置关系一个都没犯")}。</p>
        <p class="mp-ty-close">这一层只摆位置和数，不回答事情成不成；想看每一步怎么来的，展开下面的细目。</p>
      </div>
      <details class="mp-ty-det">
        <summary>细目（想核对推导再展开）</summary>
        <div class="mp-ty-sec"><em>太乙</em>第 ${a(String(n.palace||""))} 宫（${a(n.dir||"")}），三年里的第 ${a(String(n.yearInPalace||""))} 年，${a(n.li||"")}</div>
        <div class="mp-ty-sec"><em>八门</em>${a(le)}　八门三十年一转，1954 年从休门起</div>
        <div class="mp-ty-sec"><em>文昌</em>${a(i.pos||"")}（${a(i.god||"")}，${a(i.palaceName||"")}宫）　十八年一周</div>
        <div class="mp-ty-sec"><em>定目</em>${a(e.dingmu&&e.dingmu.pos||"")}（${a(e.dingmu&&e.dingmu.god||"")}）　<em>三基</em>君${a(e.sanji&&e.sanji.jun||"")} 臣${a(e.sanji&&e.sanji.chen||"")} 民${a(e.sanji&&e.sanji.min||"")}</div>
        <div class="mp-ty-sec"><em>五福</em>${a(e.wufu&&e.wufu.palaceName||"")}宫　<em>大游</em>${a(e.dayou&&e.dayou.palaceName||"")}宫　<em>十精</em>天乙${a(e.shijing&&e.shijing.tianyi||"")} 地乙${a(e.shijing&&e.shijing.diyi||"")} 直符${a(e.shijing&&e.shijing.zhifu||"")}</div>
        <div class="mp-ty-sec"><em>数和</em>主算 ${a(e.heshu&&e.heshu.zhu&&e.heshu.zhu.text||"")}　客算 ${a(e.heshu&&e.heshu.ke&&e.heshu.ke.text||"")}</div>
        <div class="mp-ty-sec"><em>月计</em>太乙在 ${a(L)} 宫（第 ${a(E)} 月）　天目 ${a(re)}　计神 ${a(F)}</div>
        <div class="mp-ty-sec"><em>日计</em>太乙在 ${a(P)} 宫（第 ${a(te)} 日）　天目 ${a(K)}　计神 ${a(O)}</div>
        <div class="mp-ty-sec"><em>时计</em>太乙在 ${a(J)} 宫（第 ${a(V)} 时）　计神 ${a(Le)}</div>
        <div class="mp-ty-sec"><em>吉凶</em><b class="mp-ty-jx ${a(he)}">${a(ne)}</b> ${a(e.jixiong&&e.jixiong.text||"")}</div>
        <div class="mp-ty-sec"><em>神将</em>${a(z)}</div>
        <div class="mp-ty-sec"><em>计神</em>${a(r.branch||"")}（${a(r.god||"")}）　<em>始击</em>${a(p.pos||"")}（${a(p.god||"")}，${a(p.palaceName||"")}宫）</div>
        <div class="mp-ty-sec"><em>主算</em>${a(String(d.zhu||""))}　主大将${a(c.zhuDaName||"")}宫　主参将${a(c.zhuCanName||"")}宫</div>
        <div class="mp-ty-sec"><em>客算</em>${a(String(d.ke||""))}　客大将${a(c.keDaName||"")}宫　客参将${a(c.keCanName||"")}宫</div>
        <div class="mp-ty-sec"><em>格局</em>${m.list&&m.list.length?a(m.list.join("；")):"四将不相犯，没有掩、迫、囚、格、关"}</div>
        <div class="mp-ty-sec"><em>积年</em>${a(String(e.meta.jinian||""))}　残年 ${a(String(e.meta.rest360||""))}　${a(e.year?e.year.jiName:"")}${a(e.year?String(e.year.jiYear):"")}年　${a(e.year?e.year.yuanName:"")}第 ${a(e.year?String(e.year.yuanYear):"")} 年</div>
        <div class="mp-ty-note">算到太乙、八门、文昌、计神、始击、主客算与四将、五种格局；${a(u.join("、"))}未收录，盘上不显示。将落中五时只标数不加宫名。</div>
      </details>
    </section>`},o.wuyunliuqiHTML=function(e){if(!e||!e.zhongyun||!e.year)return"";const n=e.zhongyun,i=e.current||{},p=[];e.special&&e.special.taiYi&&p.push("太乙天符"),e.special&&e.special.tianFu&&!e.special.taiYi&&p.push("天符"),e.special&&e.special.suiHui&&!e.special.taiYi&&p.push("岁会"),e.special&&e.special.tongTianFu&&p.push("同天符"),e.special&&e.special.tongSuiHui&&p.push("同岁会");const r=(c,m)=>(c||[]).map(g=>{const f=m?g.qi:g.name,u=m?!!(i.keQi&&i.keQi.qi===g.qi):!!(i.keYun&&i.keYun.name===g.name),h=m?g.sitian?"司天":g.zaiquan?"在泉":"":g.taiShao||"";return`<div class="mp-wl-step${u?" on":""}"><span class="mp-wl-no">${g.no}</span><span>${a(f||"")}</span><span class="mp-wl-tg">${a(h)}</span><span class="mp-wl-tm">${a(g.startTime||"")}—${a(g.endTime||"")}</span></div>`}).join(""),d=p.map(c=>`<span class="mp-wl-tag on">${a(c)}</span>`).join("");return`<section class="mp-wl" aria-label="五运六气">
      <div class="mp-wl-h">
        <span class="mp-wl-y">${a(e.year.ganzhi)}</span>
        <span class="mp-wl-z">${a(n.name)}</span>
        <span class="mp-wl-m">${a(e.year.startTime||"")} — ${a(e.year.endTime||"")}</span>
      </div>
      ${d?`<div class="mp-wl-sec"><em>格局</em>${d}</div>`:""}
      <div class="mp-wl-sec"><em>司天在泉</em>${a(e.sitian.qi)}司天　${a(e.zaiquan.qi)}在泉</div>
      <div class="mp-wl-sec"><em>此刻</em>${a(i.text||"")}</div>
      <div class="mp-wl-sec"><em>客运五步</em></div>
      <div class="mp-wl-steps">${r(e.keYun,!1)}</div>
      <div class="mp-wl-sec"><em>客气六步</em></div>
      <div class="mp-wl-steps">${r(e.keQi,!0)}</div>
      <div class="mp-wl-note">${a(e.scope?e.scope.note:"")}</div>
    </section>`},o.constitutionHTML=function(e){if(!e)return"";if(e.paper&&Array.isArray(e.questions)){const r=e.questions.map(d=>`<li><span class="mp-cs-no">${d.no}</span><span class="mp-cs-t">${a(d.text)}</span><em>${a(d.name)}</em></li>`).join("");return`<section class="mp-cs-paper" aria-label="中医体质问卷">
        <div class="mp-cs-h"><span><b>中医体质问卷</b><i>${e.scaleCount} 种体质 × ${e.itemsPerScale} 题 · 1 没有 / 5 总是</i></span>
        <span class="mp-cs-count">填完分数再看结果</span></div>
        <ol>${r}</ol>
        <div class="mp-cs-note">${a(e.note||"")}</div>
      </section>`}const n=e.primary||{},i=(e.scales||[]).map(r=>{const d=Math.max(0,Math.min(100,r.converted||0)),c=r.level&&r.level!=="否";return`<div class="mp-cs-row${n.key===r.key?" main":""}">
        <span class="mp-cs-n">${a(r.name)}</span>
        <span class="mp-cs-track"><i class="${c?"on":""}" style="width:${d}%"></i><b class="mp-cs-tick" style="left:40%"></b></span>
        <span class="mp-cs-v">${d}</span>
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
    </section>`},o.mbtiHTML=function(e){if(!e)return"";if(e.needAnswers&&Array.isArray(e.questions)){const r=e.questions.map(d=>`<li>${a(d.text)}</li>`).join("");return`<section class="mp-mb-paper" aria-label="十六型人格问卷">
        <div class="mp-mb-h">
          <span class="mp-mb-meta"><b>十六型人格问卷</b><i>${e.total} 题 · 每题 1 完全不像 / 5 很像我</i></span>
          <span class="mp-mb-count">填完分数再看结果</span>
        </div>
        <ol>${r}</ol>
        <div class="mp-mb-note">${a(e.note||"")}</div>
      </section>`}const n=(e.dims||[]).map(r=>{const d=Math.round((r.pct||0)*100),c=r.picked===r.left,m=Math.max(2,d),g=c?r.leftSay:r.rightSay;return`<div class="mp-mb-dim">
        <div class="mp-mb-dh"><b class="${c?"on":""}">${a(r.left)}</b><em>${a(r.name)}</em><b class="${c?"":"on"}">${a(r.right)}</b></div>
        <div class="mp-mb-bar ${c?"l":"r"}"><em style="width:${m}%"></em></div>
        <div class="mp-mb-df">取 ${a(r.picked)} · ${a(r.strength)} ${d}%</div>
        <div class="mp-mb-ds">${a(g)}</div>
      </div>`}).join(""),i=e.profile||{},p=(i.stack||[]).map((r,d)=>`<span class="${d===0?"lead":""}"><b>${a(r.code)}</b>${a(r.say)}</span>`).join("");return`<section class="mp-mb" aria-label="十六型人格结果">
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
    </section>`};const vt=[["巽","离","坤"],["震","中","兑"],["艮","坎","乾"]],yt={坎:"正北",艮:"东北",震:"正东",巽:"东南",离:"正南",坤:"西南",兑:"正西",乾:"西北",中:"中宫"},Jt=["生气","延年","天医","伏位"],Se=(e,n)=>`<span class="mp-fs-chip${n?" "+n:""}">${a(e)}</span>`,ga=(e,n,i)=>`<div class="mp-fs-cell${e==="中"?" center":""}"><div class="mp-fs-top"><span class="mp-fs-gua">${a(e)}</span><span class="mp-fs-dir">${a(yt[e]||"")}</span>${n||""}</div>`+(i||"")+"</div>",za=e=>e.length?`<dl class="mp-fs-facts">${e.map(([n,i])=>`<div class="mp-fs-row"><dt>${a(n)}</dt><dd>${a(i)}</dd></div>`).join("")}</dl>`:"",rt=(e,n,i,p,r,d)=>`<section class="mp-quick mp-fs" aria-label="风水结果"><div class="mp-quick-h"><b>${a(e)}</b>${n?`<span class="mp-fs-sub">${a(n)}</span>`:""}</div>`+(i.length?`<div class="mp-fs-chips">${i.join("")}</div>`:"")+p+r+d.filter(Boolean).map(c=>`<div class="mp-fs-note">${a(c)}</div>`).join("")+"</section>",Ba=(e,n)=>`<div class="mp-fs-grid" role="group" aria-label="${a(n)}">`+vt.map(i=>i.map(p=>{const r=e.find(m=>m&&m.palace===p);if(!r)return ga(p,"","");const d=Jt.includes(r.star),c=`<span class="mp-fs-star"${r.role?` title="${a(r.role)}"`:""}>${a(r.star)}<em class="${d?"ok":"bad"}">${d?"吉":"凶"}</em></span>`;return ga(p,c,"")}).join("")).join("")+"</div>";function Xt(e,n){const i=n.period,p={};for(const $ of e.palaces||[])p[$.palace]=$;const r=`<div class="mp-fs-key">每宫依次为 <b>运</b>／<b>山</b>／<b>向</b> 三星；底色高亮＝当运（${a(i)}运）</div><div class="mp-fs-grid" role="group" aria-label="玄空九宫（运/山/向）">`+vt.map($=>$.map(T=>{const L=p[T];if(!L)return ga(T,"","");const E=[["运",L.yun],["山",L.shan],["向",L.xiang]].map(([re,F])=>`<span class="${F===i?"on":""}" title="${a(re)}星 ${a(F)}">${a(F)}</span>`).join("");return ga(T,"",`<div class="mp-fs-nums">${E}</div>`)}).join("")).join("")+"</div>",d=e.wangShanWangXiang||{},c=n.jianXiang||{},m=e.timeFlying||null,g=[Se(c.active?`兼${c.jian} ${c.offset}° · 替卦`:"正向 · 下卦",c.active?"ok":""),Se(`山盘 ${n.shanCenter.star}${n.shanCenter.name} · ${n.shanCenter.fly}`),Se(`向盘 ${n.xiangCenter.star}${n.xiangCenter.name} · ${n.xiangCenter.fly}`),Se(d.byChart?"盘面：到山到向":"盘面：未到山到向",d.byChart?"ok":""),Se(d.byTable===null?"表法：替卦不套":d.byTable?"表法：在列":"表法：未列",d.byTable?"ok":"")],f=($,T)=>`${T} ${$.star}${$.name}（${$.fly}，${$.basis}${$.mode==="替卦"?`；原运星 ${$.original}${$.replaced?"，已替":"，用替而未替"}`:""}）`,u=m?[["year","年"],["month","月"],["day","日"],["hour","时"]].filter(([$])=>m[$]).map(([$,T])=>`${T}${m[$].centerName}（${m[$].fly}）`).join("　"):"",h=za([...c.active?[["替卦",`${c.note}${d.byTable===null?" 正向旺山旺向表不适用于替卦。":""}`]]:[],["入中",`${f(n.shanCenter,"山盘")}；${f(n.xiangCenter,"向盘")}`],["当运",`山星${i}落 ${e.dangYun.shan.text}；向星${i}落 ${e.dangYun.xiang.text}`],["合十",`山星：${(e.heshi.shan||[]).join("、")||"无"}；向星：${(e.heshi.xiang||[]).join("、")||"无"}`],["表法",`${d.note||""}${(d.table||[]).length?` 本运所列：${d.table.join("、")}。`:" 本运表法无局。"}`],...u?[["年月日时",`${u}${m.meta&&m.meta.note?`　${m.meta.note}`:""}`]]:[]]);return rt(c.active?"玄空替卦":"玄空下卦",`${n.periodLabel} · 坐${n.sitting} · 向${n.facing}`,g,r,h,[n.note,e.disclaimer])}function pt(e,n){const i=e.mingGua||{},p=Ba([...e.luckyDirections||[],...e.unluckyDirections||[]],"八宅八向（吉凶）"),r=[Se(i.compatible||"—"),Se(`${n.gender}命 · ${n.guaYear} 年立春界`)],d=[];if(e.yearlyFlying){const c=e.yearlyFlying;d.push(["年紫白",`${c.centerName}入中；${c.palaces.filter(m=>m.palace!=="中").map(m=>`${m.palace}${m.name}`).join("、")}`])}return rt("八宅命卦",`${i.num}${i.gua}（${i.group}）· ${i.direction}`,r,p,za(d),[n.note,e.disclaimer])}function Qt(e,n){const i=e.layout||{},p=Ba(e.houseStars||[],"宅卦八向（吉凶）"),r=[Se(`${n.houseGua}宅 · ${n.houseGroup}`),Se(`坐${n.sitting}`),Se(`向${n.facing}`)],d=[["门",i.door],["灶",i.stove],["床",i.bed],["厕",i.toilet]];return e.mingMatch&&d.push(["命宅配",e.mingMatch.text]),rt("门主灶",`${n.houseGua}宅 · 坐${n.sitting} · 向${n.facing}`,r,p,za(d),[n.birthNote,e.disclaimer])}o.fengshuiHTML=function(e){if(!e||e.system!=="fengshui")return o.quickHTML(e);const n=e.meta||{};return n.action==="xuankong"?Xt(e,n):n.action==="advise"?Qt(e,n):pt(e,n)},o.perfHTML=function(e){if(!e)return"";const n=m=>typeof m=="number"&&isFinite(m)?`${Math.max(0,Math.round(m))}ms`:"",i=e.cached===!0?"（已缓存）":e.cached===!1?"（首次加载）":"",p=[];n(e.engineMs)&&p.push(`引擎 ${n(e.engineMs)}${i}`),n(e.computeMs)&&p.push(`排盘 ${n(e.computeMs)}`),n(e.renderMs)&&p.push(`渲染 ${n(e.renderMs)}`);const r=n(e.totalMs);if(!p.length&&!r)return"";const d=r?`首屏 ${r}`:"耗时";return`<div class="mp-perf" title="本机这一次的实测耗时，不含网络与服务端；换机器、首次加载与已缓存会不同">${p.length?`${d}｜${p.join(" · ")}`:d}</div>`},o.zeriHTML=function(e){if(!e||!e.compare||e.compare.mode!=="candidates"||!Array.isArray(e.days))return o.quickHTML(e);const n=e.meta||{},i=e.shenshaRef||{},p=e.compare.best?e.compare.best.date:"",r=e.days.map(m=>{const g=m.date===p,f=m.excluded||m.verdict==="回避"?"bad":m.verdict==="推荐"?"good":"",u=m.grade||{},h=u.label?`<b>${a(u.label)}</b><em>吉${a(u.ji)} / 凶${a(u.xiong)}　${a(u.decision||"")}</em>`:"—";return`<tr class="mp-zr-row${g?" top":""}${m.excluded?" off":""}">
        <th scope="row"><b>${a(m.date)}</b>${g?'<i class="mp-zr-best">最优</i>':""}
          <em>${a(m.weekday)}　${a(m.lunar)}</em></th>
        <td><b>${a(m.dayGanZhi)}</b><em>${a(m.zhiXing)}日</em></td>
        <td class="mp-zr-score">${a(m.score)}</td>
        <td class="mp-zr-grade">${h}</td>
        <td><span class="mp-zr-v ${f}">${a(m.verdict)}</span></td>
        <td class="mp-zr-why">${a(m.reasons.join("；")||"无特别加减分")}</td>
      </tr>`}).join(""),d=(m,g)=>`<span><em>${a(m)}</em>${g.length?a(g.join("、")):"无"}</span>`,c=e.compare.best?`这一组最优：<b>${a(e.compare.best.date)}</b>（${a(e.compare.best.score)} 分 · ${a(e.compare.best.verdict)}）`+(e.compare.best.ties.length>1?`；同分 ${a(e.compare.best.ties.filter(m=>m!==e.compare.best.date).join("、"))}`:""):"这一组都因冲属相被排除，没有可用的日子";return`<section class="mp-zr" aria-label="择日候选比较">
      <div class="mp-zr-h"><b>择日 · ${a(n.task||"")}</b>
        <span>候选 ${a(n.days)} 天${n.shengXiao?`　当事人属${a(n.shengXiao)}`:"（未给属相，未做冲煞排除）"}</span></div>
      <div class="mp-zr-lead">${c}</div>
      <table class="mp-zr-t"><thead><tr>
        <th scope="col">日期</th><th scope="col">日干支 / 建除</th><th scope="col">分</th><th scope="col">卷十等第</th><th scope="col">结论</th><th scope="col">理由</th>
      </tr></thead><tbody>${r}</tbody></table>
      <div class="mp-zr-lists">
        ${d("推荐",e.best)}${d("可用",e.usable)}${d("回避",e.avoid)}
      </div>
      <p class="mp-zr-note">${a(e.compare.note||"")}</p>
      ${i.text?`<p class="mp-zr-note">神煞依据：${a(i.text)}（${a(i.edition||"")}）；起法 ${a((i.volumes||[]).join("、"))}。未实现起法：${a((i.unsupported||[]).join("、"))}（不计分）。</p>`:""}
      ${i.juan10?`<p class="mp-zr-note">卷十依据：${a(i.juan10.text)}（${a(i.juan10.corpusLines||"")}）；${a(i.juan10.thresholdsNote||"")}${a(i.juan10.note||"")}</p>`:""}
      <p class="mp-zr-note">${a(n.scope||"")}</p>
      <p class="mp-zr-note">${a(e.disclaimer||"")}</p>
    </section>`},o.quickHTML=function(e){if(!e)return"";const i={almanac:"黄历",zeri:"择日",chenggu:"称骨",xiaoliuren:"小六壬",star:"星座",numerology:"生命数字",trend:"人生 K 线",fengshui:"风水",name:"起名",convert:"公农历转换",mbti:"十六型人格"}[e.system]||"速查",p=e.summary||"",r=p?`<pre class="mp-quick-pre">${a(p)}</pre>`:"";return`<section class="mp-quick" aria-label="${a(i)}结果">
      <div class="mp-quick-h"><b>${a(i)}</b></div>
      ${r}
    </section>`},o.summaryCardPNG=function(e,n){try{if(typeof document>"u"||!document.createElement)return"";let i=n;if((!i||!i.outline)&&e&&e.system==="guanyin"&&e.brief){const ne=e.brief,w=e.slip||{};i={systemLabel:"观音灵签",outline:(ne.sections||[]).map(z=>({label:z.h,text:z.t})),envelope:{verdict:{headline:w.no?`第 ${w.no} 签「${w.title}」`:String(ne.title||"")}}}}const p=i&&i.outline||[],r=(i&&i.tables||[]).filter(ne=>Array.isArray(ne.rows)&&ne.rows.length),d=i&&i.systemLabel||e&&e.system||"命理报告",c=900,m=44,g=26,f=(ne,w)=>`${w?"600 ":""}${ne}px "PingFang SC","Microsoft YaHei","Noto Sans CJK SC",sans-serif`,u=document.createElement("canvas"),h=u.getContext?u.getContext("2d"):null;if(!h)return"";const $=(ne,w)=>{const z=[];let q="";for(const pe of String(ne)){const le=q+pe;h.measureText(le).width>w&&q?(z.push(q),q=pe):q=le}return q&&z.push(q),z.length?z:[""]},T=i&&i.envelope||null,L=T&&T.verdict||null,E=String(L&&L.headline||e&&e.brief&&e.brief.headline||e&&e.factHead&&e.factHead.headline||"").trim(),re=String(e&&e.brief&&e.brief.lead||L&&L.condition||e&&e.factHead&&e.factHead.note||"").trim();h.font=f(22,!0);const F=E?$(E,c-m*2).slice(0,3):[];h.font=f(14);const P=re?$(re,c-m*2).slice(0,2):[],te=F.length?26+F.length*32+(P.length?8+P.length*24:0)+16:0;h.font=f(15);let K=0;const O=p.map(ne=>{const w=$(ne.text,c-m*2-70);return K+=Math.min(w.length,2)*g+10,{o:ne,lines:w.slice(0,2)}}),J=r[0]||null,V=J?J.rows.slice(0,6):[],Le=J?54+V.length*34:0,Me=150+te+K+(O.length?34:0)+Le+120;u.width=c,u.height=Me,h.fillStyle="rgb(255,255,255)",h.fillRect(0,0,c,Me),h.fillStyle="rgb(31,111,63)",h.fillRect(0,0,c,8);let Z=52;h.fillStyle="rgb(27,27,27)",h.font=f(28,!0),h.fillText(`${d} · 摘要`,m,Z),Z+=30,h.fillStyle="rgb(111,106,96)",h.font=f(14);const he=[e&&e.input&&e.input.datetime?`出生/起局：${e.input.datetime}`:"","本地计算 · 可复现"].filter(Boolean).join("　");if(h.fillText(he,m,Z),Z+=34,F.length&&(h.fillStyle="rgb(31,111,63)",h.font=f(15,!0),h.fillText("结论",m,Z),Z+=26,h.fillStyle="rgb(27,27,27)",h.font=f(22,!0),F.forEach((ne,w)=>h.fillText(ne,m,Z+w*32)),Z+=F.length*32,P.length&&(Z+=8,h.fillStyle="rgb(111,106,96)",h.font=f(14),P.forEach((ne,w)=>h.fillText(ne,m,Z+w*24)),Z+=P.length*24),Z+=16),O.length){h.fillStyle="rgb(31,111,63)",h.font=f(16,!0),h.fillText("一页读懂",m,Z),Z+=26;for(const{o:ne,lines:w}of O)h.fillStyle="rgb(138,131,120)",h.font=f(14,!0),h.fillText(ne.label,m,Z),h.fillStyle="rgb(63,58,51)",h.font=f(15),w.forEach((z,q)=>h.fillText(z,m+70,Z+q*g)),Z+=w.length*g+10;Z+=8}if(J){h.fillStyle="rgb(31,111,63)",h.font=f(16,!0),h.fillText(J.title,m,Z),Z+=24,h.fillStyle="rgb(138,131,120)",h.font=f(13),h.fillText(J.columns.join(" · "),m,Z),Z+=8,h.strokeStyle="rgb(229,225,216)",h.beginPath(),h.moveTo(m,Z),h.lineTo(c-m,Z),h.stroke(),Z+=22,h.fillStyle="rgb(63,58,51)",h.font=f(14);for(const ne of V){const w=ne.filter(Boolean).join(" · "),z=$(w,c-m*2)[0];h.fillText(z,m,Z),Z+=34}}return Z=Me-62,h.strokeStyle="rgb(229,225,216)",h.beginPath(),h.moveTo(m,Z-18),h.lineTo(c-m,Z-18),h.stroke(),h.fillStyle="rgb(138,131,120)",h.font=f(12),h.fillText("内容用于传统文化学习与自我探索，不构成医疗、投资、法律或人事决策依据。",m,Z+6),h.fillText("dsh-metaphysics · 本机计算，未上传任何数据",m,Z+26),u.toDataURL?u.toDataURL("image/png"):""}catch{return""}};const Ge="https://registry.npmjs.org/dsh-metaphysics/latest";o.signatureHTML=function(){const e=window&&window.__MP_VER?String(window.__MP_VER).trim():"";return`<div class="mp-sig">
        <span class="mp-sig-brand">烛微命盘${e?`<i>v${a(e)}</i>`:""}</span>
        <button type="button" class="mp-sig-btn" data-mp-qr aria-expanded="false">腾讯频道 pd48189034 · 看二维码</button>
        <button type="button" class="mp-sig-btn" data-mp-chk>检查更新</button>
        <span class="mp-sig-msg" role="status" aria-live="polite"></span>
        <div class="mp-sig-qr"><img src="${A}" alt="腾讯频道「烛微命盘」二维码，频道号 pd48189034" width="132" height="132" loading="lazy"><span>微信或 QQ 扫一扫，加入频道；也可以在腾讯频道里直接搜 pd48189034。</span></div>
      </div>`};const wt=(e,n)=>{const i=String(e).split(".").map(r=>parseInt(r,10)||0),p=String(n).split(".").map(r=>parseInt(r,10)||0);for(let r=0;r<Math.max(i.length,p.length);r+=1){const d=(i[r]||0)-(p[r]||0);if(d)return d>0?1:-1}return 0};o.checkUpdate=function(e,n){const i=window&&window.__MP_VER?String(window.__MP_VER).trim():"",p=f=>{e&&(e.textContent=f||"")},r=window&&typeof window.fetch=="function"?window.fetch:typeof fetch=="function"?fetch:null;if(!r)return p("");n&&(n.disabled=!0),p("正在查…");let d=null;try{d=new AbortController}catch{d=null}const c=setTimeout(()=>{try{d&&d.abort()}catch{}},8e3),m=f=>{clearTimeout(c),n&&(n.disabled=!1),p(f)};let g;try{g=r(Ge,d?{cache:"no-store",signal:d.signal}:{cache:"no-store"})}catch{return m("")}g.then(f=>f&&f.ok?f.json():null).then(f=>{const u=f&&f.version?String(f.version):"";return u?i?wt(u,i)>0?m(`v${u} 可用，重装插件后生效`):m(`已是最新（v${i}）`):m(`最新 v${u}`):m("")}).catch(()=>m(""))},typeof document<"u"&&document&&typeof document.addEventListener=="function"&&!window.__MP_SIG_BOUND&&(window.__MP_SIG_BOUND=!0,document.addEventListener("click",e=>{const n=e.target&&e.target.closest?e.target.closest("[data-mp-qr]"):null;if(n){const p=n.parentElement&&n.parentElement.querySelector(".mp-sig-qr");if(p){const r=!p.classList.contains("on");typeof p.classList.toggle=="function"&&p.classList.toggle("on",r),n.setAttribute("aria-expanded",r?"true":"false")}return}const i=e.target&&e.target.closest?e.target.closest("[data-mp-chk]"):null;if(i){const p=i.parentElement&&i.parentElement.querySelector(".mp-sig-msg");o.checkUpdate(p,i)}}))})(),(function(){const s="mp.view",o=["perf","revision","handle","shadow","trace","caliber"],A=["head","body","chart","shortId","castAt","solar","interpret","followup","extra"],U={chart:["bazi","ziwei","hepan","trend","fengshui","name"],ask:["liuyao","meihua","daliuren","qimen","tarot","xiaoliuren"],judge:["wuyunliuqi","taiyi","zeri"],quiz:["mbti","constitution"],lookup:["almanac","chenggu","qian","guanyin","star","numerology","convert"]},ue={quiz:["followup"],lookup:["followup"]};function oe(X){const C=String(X||""),B=Object.keys(U);for(let Q=0;Q<B.length;Q++)if(U[B[Q]].indexOf(C)>=0)return B[Q];return"chart"}const se=()=>{try{return window.localStorage||null}catch{return null}},ae=X=>String(X??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function xe(){try{const X=window.location||{},C=/(?:^|[?&#])dev=([^&]*)/.exec(String((X.search||"")+(X.hash||"")));if(C)return C[1]!=="0"&&C[1]!=="false";const B=se();return!!(B&&B.getItem(s)==="dev")}catch{return!1}}function ze(X){const C=se();if(C)try{C.setItem(s,X?"dev":"user")}catch{}return!!X}function Ce(X){if(!X||X.__mpDevBound)return;X.__mpDevBound=!0;let C=0,B=0;X.addEventListener("click",()=>{const Q=Date.now();if(C=Q-B>1200?1:C+1,B=Q,C<5)return;C=0;const ie=ze(!xe());X.title=ie?"已切到开发者视图（再点五下切回）":"",typeof window.__MPRepaint=="function"&&window.__MPRepaint()})}function G(X,C){const B=X||{},Q=C||{},ie=typeof Q.mode=="string"?Q.mode==="dev":xe(),ke=ue[oe(Q.system)]||[],qe=A.filter(a=>ke.indexOf(a)<0);return ie&&qe.push(...o),qe.push("exportBar"),qe.map(a=>B[a]).filter(Boolean).join("")}function ve(X){const C=typeof X=="string"?X.replace(/^LY-/,""):"";return C?'<p class="mp-shortid" title="同一组参数、同一版本算出来是同一个编号；回看或反馈时报它就行">盘号 '+ae(C)+"</p>":""}window.__MPCompose={DEV_SECTIONS:o,USER_SEGS:A,TIER:U,TIER_SKIP:ue,tierOf:oe,devOn:xe,setDev:ze,bindDevSwitch:Ce,composeResult:G,shortIdHTML:ve,esc:ae}})();function Pi(s,o){return window.__MPCompose&&window.__MPCompose.composeResult?window.__MPCompose.composeResult(s,{system:o}):Object.keys(s).map(A=>s[A]).filter(Boolean).join("")}const zt=new Set;function Ii(){return!!(window.__MPCompose&&window.__MPCompose.devOn&&window.__MPCompose.devOn())}const In="dsh-metaphysics/history-v1";function Di(){try{const s=window.localStorage&&window.localStorage.getItem(In),o=s?JSON.parse(s):[];return Array.isArray(o)?o.filter(A=>A&&typeof A=="object"&&typeof A.kind=="string").slice(0,20):[]}catch{return[]}}function Dn(s){try{window.localStorage&&window.localStorage.setItem(In,JSON.stringify(s.slice(0,20)))}catch{}}const Ri=(s,o)=>s.kind===o.kind&&s.date===o.date&&s.time===o.time&&s.gender===o.gender&&!!s.hourUnknown==!!o.hourUnknown&&s.trueSolar!==!1==(o.trueSolar!==!1)&&s.lateZi!==!1==(o.lateZi!==!1)&&s.address===o.address&&s.lines===o.lines&&s.question===o.question&&s.mhMode===o.mhMode&&s.upper===o.upper&&s.lower===o.lower&&s.direction===o.direction&&s.spread===o.spread&&s.changing===o.changing&&(s.kind!=="qimen"||s.qimenRule===o.qimenRule&&s.qLateZi===o.qLateZi)&&(s.kind!=="zeri"||s.task===o.task&&s.days===o.days&&s.shengXiao===o.shengXiao&&s.zCand===o.zCand)&&(s.kind!=="xiaoliuren"||s.xlrMode===o.xlrMode&&s.num1===o.num1&&s.num2===o.num2&&s.num3===o.num3)&&(s.kind!=="trend"||s.toAge===o.toAge)&&(s.kind!=="fengshui"||s.fsMode===o.fsMode&&s.fsPeriod===o.fsPeriod&&s.sitting===o.sitting&&s.facing===o.facing)&&(s.kind!=="name"||s.nnMode===o.nnMode&&s.surname===o.surname&&s.givenName===o.givenName&&s.limitN===o.limitN)&&(s.kind!=="convert"||s.convMode===o.convMode&&s.lunarDate===o.lunarDate&&!!s.leapMonth==!!o.leapMonth)&&(s.kind!=="hepan"||s.hpChart===o.hpChart&&s.partnerDate===o.partnerDate&&s.partnerTime===o.partnerTime&&s.partnerGender===o.partnerGender&&s.partnerAddress===o.partnerAddress&&!!s.thirdOn==!!o.thirdOn&&s.p2Date===o.p2Date&&s.p2Time===o.p2Time&&s.p2Gender===o.p2Gender&&s.p2Address===o.p2Address);function Fi(s,o){if(s==="bazi"){const U=["year","month","day","hour"].map(ue=>o.pillars&&o.pillars[ue]).filter(Boolean).map(ue=>ue.ganzhi).join(" ");return o.hourUnknown||o.pillars&&!o.pillars.hour?`${U}（时柱暂缺）`:U}return s==="ziwei"?`${o.soul?o.soul.branch:""}宫 ${o.bureau?o.bureau.name:""} ${o.lunar?o.lunar.year+"年":""}`.trim():s==="liuyao"?o.ben&&o.ben.name?o.ben.name:"":s==="meihua"?o.ben&&o.ben.name?`${o.ben.name} 动${o.moving}`:"":s==="daliuren"?`${o.dayGanZhi||""} ${o.geJu?o.geJu.name:""}`:""}const _=window.__PP,Ya=()=>typeof performance<"u"&&performance.now?performance.now():Date.now();let Ue=0;const gt=typeof window.__mpEnsureEngine=="function"?window.__mpEnsureEngine:async()=>window.Engine,Bi=`
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
`,{useState:j,useEffect:ra,useRef:Rn}=ut;function oo(s){return window.__PP.isoDateOk(s)}function Ui(s){return window.__PP.normalizeDateText(s)}function Gi(s){return window.__PP.maskDateText(s)}function cn(s){const o=s.value||"",[A,U]=j(o),ue=Rn(o);ra(()=>{ue.current=o,U(o)},[o]);const oe=()=>{const se=A.trim();if(!se){U(ue.current),s.onInvalid&&s.onInvalid("");return}const ae=Ui(se);if(ae){ue.current=ae,U(ae),ae!==o&&s.onChange(ae);return}U(ue.current),s.onInvalid&&s.onInvalid(se)};return l("input",{className:"mp-input",type:"text",inputMode:"numeric",autoComplete:"off",placeholder:"年-月-日，如 1990-05-12",value:A,onChange:se=>{U(Gi(se.target.value))},onBlur:oe,onKeyDown:se=>{se.key==="Enter"&&(se.preventDefault(),oe())}})}const qt=4,va=12,jt=5,ya=27,mn=45;let St=null;function Mt(){if(St)return St;let s=null;try{s=W.compute({system:"mbti"})}catch{s=null}const o=s&&s.questions||[];return o.length?(St={total:s&&s.total||o.length,questions:o,scale:s&&s.scale||{}},St):{total:0,questions:[],scale:{}}}function Yi(s){const{answers:o,page:A,onPick:U,onPage:ue,onSubmit:oe,onClear:se}=s,ae=Mt(),xe=Math.max(1,Math.ceil(ae.total/qt)),ze=A*qt,Ce=ae.questions.slice(ze,ze+qt),G=o.filter(B=>B!=null).length,ve=ae.total?Math.round(G/ae.total*100):0,X=A>=xe-1,C=G>=va;return l("div",{className:"mp-quiz"},l("div",{className:"mp-quiz-top"},l("div",{className:"mp-quiz-bar","aria-hidden":"true"},l("i",{style:{width:ve+"%"}})),l("span",{className:"mp-quiz-count"},`第 ${A+1} / ${xe} 页 · 已答 ${G} / ${ae.total}`)),l("div",{className:"mp-quiz-list"},Ce.map((B,Q)=>{const ie=ze+Q;return l("div",{key:B.id||ie,className:"mp-quiz-q"},l("div",{className:"mp-quiz-qt"},l("b",null,String(ie+1).padStart(2,"0")),l("span",null,B.text)),l("div",{className:"mp-quiz-opts",role:"radiogroup","aria-label":`第 ${ie+1} 题`},[1,2,3,4,5].map(ke=>l("label",{key:ke,className:"mp-quiz-o"+(o[ie]===ke?" on":"")},l("input",{type:"radio",name:`mpmbq${ie}`,value:String(ke),checked:o[ie]===ke,onChange:()=>U(ie,ke)}),l("b",null,String(ke)),l("span",null,ae.scale[ke]||"")))))})),l("div",{className:"mp-quiz-nav"},l("button",{className:"mp-quiz-btn",disabled:A<=0,onClick:()=>ue(-1)},"上一页"),X?null:l("button",{className:"mp-quiz-btn",onClick:()=>ue(1)},"下一页"),l("button",{className:"mp-quiz-btn primary",disabled:!C,onClick:oe},"看结果"),l("button",{className:"mp-quiz-btn",onClick:se},"清空"),l("span",{className:"mp-quiz-hint"},C?`已够 ${va} 题，可以看结果；答完 ${ae.total} 题会更准。`:`答满 ${va} 题可先看结果（还差 ${va-G} 题）。`)))}function Zi(s){const{paper:o,answers:A,page:U,onPick:ue,onPage:oe,onSubmit:se,onClear:ae}=s;if(!o||!Array.isArray(o.questions))return l("div",{className:"mp-quiz"},l("div",{className:"mp-quiz-hint"},"正在加载问卷题面…"));const xe=o.questions.length,ze=Math.max(1,Math.ceil(xe/jt)),Ce=U*jt,G=o.questions.slice(Ce,Ce+jt),ve=A.filter(ie=>ie!=null).length,X=xe?Math.round(ve/xe*100):0,C=U>=ze-1,B=ve>=ya,Q=ie=>{const ke=(o.scale||[]).filter(qe=>qe&&qe.v===ie)[0];return ke?ke.label:String(ie)};return l("div",{className:"mp-quiz"},l("div",{className:"mp-quiz-top"},l("div",{className:"mp-quiz-bar","aria-hidden":"true"},l("i",{style:{width:X+"%"}})),l("span",{className:"mp-quiz-count"},`第 ${U+1} / ${ze} 页 · 已答 ${ve} / ${xe}`)),l("div",{className:"mp-quiz-list"},G.map((ie,ke)=>{const qe=Ce+ke;return l("div",{key:ie.no||qe,className:"mp-quiz-q"},l("div",{className:"mp-quiz-qt"},l("b",null,String(qe+1).padStart(2,"0")),l("span",null,ie.text)),l("div",{className:"mp-quiz-opts",role:"radiogroup","aria-label":`第 ${qe+1} 题`},[1,2,3,4,5].map(a=>l("label",{key:a,className:"mp-quiz-o"+(A[qe]===a?" on":"")},l("input",{type:"radio",name:`mpcsq${qe}`,value:String(a),checked:A[qe]===a,onChange:()=>ue(qe,a)}),l("b",null,String(a)),l("span",null,Q(a))))))})),l("div",{className:"mp-quiz-nav"},l("button",{className:"mp-quiz-btn",disabled:U<=0,onClick:()=>oe(-1)},"上一页"),C?null:l("button",{className:"mp-quiz-btn",onClick:()=>oe(1)},"下一页"),l("button",{className:"mp-quiz-btn primary",disabled:!B,onClick:se},"看结果"),l("button",{className:"mp-quiz-btn",onClick:ae},"清空"),l("span",{className:"mp-quiz-hint"},B?`已够 ${ya} 题，可以看结果；答完 ${xe} 题会更准。`:`答满 ${ya} 题可先看结果（还差 ${ya-ve} 题）。`)))}class Ki extends(ut.Component||Object){constructor(o){super(o),this.state={err:null}}static getDerivedStateFromError(o){return{err:o}}componentDidCatch(o,A){console.error("[metaphysics] 面板渲染异常",o,A)}render(){if(!this.state.err)return this.props.children;const o=this.state.err,A=String(o&&o.stack||"").split(`
`).slice(0,14).join(`
`);return l("div",{className:"mp-wrap"},l("div",{className:"mp-panel"},l("div",{className:"mp-lbl"},"命理面板渲染出错——把下面这段发给我"),l("pre",{style:{whiteSpace:"pre-wrap",fontSize:12,lineHeight:1.5,maxHeight:320,overflow:"auto",margin:"8px 0"}},String(o&&o.message||o)+`

`+A),l("div",{className:"mp-lbl"},"环境：__PP "+typeof _+" · Engine "+typeof window.Engine+" · React "+typeof ut+" · 版本 "+(typeof _=="object"&&_&&(window.__MP_VER||"?"))+(window.__MP_UNRELEASED?" · 未发版改动 "+window.__MP_UNRELEASED+" 项":""))))}}function Vi(s){const o=s&&s.size?s.size:20,A=s&&s.active;return l("svg",{width:o,height:o,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.6,strokeLinecap:"round","aria-hidden":!0,style:{opacity:A?1:.72}},l("circle",{cx:12,cy:12,r:8.2}),l("path",{d:"M12 3.8a4.1 4.1 0 0 1 0 8.2 4.1 4.1 0 0 0 0 8.2"}),l("circle",{cx:12,cy:8,r:1.1,fill:"currentColor",stroke:"none"}),l("circle",{cx:12,cy:16,r:1.1,fill:"currentColor",stroke:"none"}))}const Qe=[{k:"ziwei",label:"紫微",timeLabel:"出生时刻",hint:"紫微斗数需要出生日期、时刻与性别；出生地只影响真太阳时修正。"},{k:"bazi",label:"八字",timeLabel:"出生时刻",hint:"四柱八字按节气与真太阳时定时柱，出生地越准，时柱越稳。"},{k:"liuyao",label:"六爻",timeLabel:"起卦时刻",hint:"六爻不需要出生时间：只用起卦当下的日辰定六神、月建定旺衰，卦由摇出。"},{k:"meihua",label:"梅花",timeLabel:"起卦时刻",hint:"梅花用起卦时刻的年月日时数成卦，也可直接给两个数字起卦；与出生时间无关。"},{k:"daliuren",label:"六壬",timeLabel:"起卦时刻",hint:"大六壬用起卦时刻的日干支、时支与月将起天地盘；同样与出生时间无关。"},{k:"qimen",label:"奇门",timeLabel:"起局时刻",hint:"奇门时家转盘：用起局时刻定节气、三元与局数；换局规则决定符头与节气如何对齐。"},{k:"hepan",label:"合盘",timeLabel:"你的出生时刻",hint:"合盘按「日主 + 夫妻宫 + 五行互补」看两个人的相处与互补，需要双方出生信息。"},{k:"tarot",label:"塔罗",timeLabel:"",hint:"塔罗不看时间，只记录抽牌时刻与你的提问。"},{k:"qian",label:"福签",timeLabel:"",hint:"每日福签按公历日期抽一支，同一天结果一致、不设重摇；签文为插件原创。"},{k:"guanyin",label:"灵签",timeLabel:"",hint:"观音灵签一百支，一事一签、可重摇；签诗按民间通行本录入，白话签意与建议为插件自撰。"},{k:"almanac",label:"黄历",timeLabel:"",hint:"黄历按公历日期查农历、干支、宜忌、时辰吉凶、二十八宿与吉神方位；只做本地计算。"},{k:"convert",label:"农历",timeLabel:"",hint:"公农历互转：公历生日可反查农历；只知道农历生日时，可转成公历再排盘。"},{k:"zeri",label:"择日",timeLabel:"",hint:"择日把区间内每天的建除宜忌与事项适配打分排序，并按属相排除冲煞日。"},{k:"xiaoliuren",label:"小六壬",timeLabel:"起课时刻",hint:"小六壬用农历月/日/时掐指，也可用三个随机数起课。"},{k:"star",label:"星座",timeLabel:"",hint:"星座按公历日期给出太阳星座与当日基调；同日同星座结果固定。"},{k:"numerology",label:"生命数字",timeLabel:"",hint:"生命数字按公历生日归约出生命路径数、生日数与态度数。"},{k:"mbti",label:"人格",timeLabel:"",hint:"十六型人格是 24 道自我报告题的 MBTI 风格测算：4 题一页，按 1–5 打分，答满 12 题即可看结果；只作自我参照，不是官方量表。"},{k:"constitution",label:"体质",timeLabel:"",hint:"中医体质是九种体质各 5 题的自评问卷（共 45 题，1 没有 / 5 总是），按转化分判主次体质并给调养方向；不是医学诊断。"},{k:"wuyunliuqi",label:"运气",timeLabel:"",hint:"五运六气按大寒分年：中运、司天在泉、六步。"},{k:"taiyi",label:"太乙",timeLabel:"",hint:"太乙神数按积年推局：太乙落宫、八门、文昌、计神、始击、主客算与四将。"},{k:"trend",label:"人生K线",timeLabel:"出生时刻",hint:"人生 K 线按大运与流年十神给逐年运势分，画成走势图。"},{k:"fengshui",label:"风水",timeLabel:"",hint:"风水看八宅命卦、大游年四吉四凶与流年九宫飞星；也可按坐向看门主灶倾向，或按运与坐向排玄空下卦盘。"},{k:"name",label:"起名",timeLabel:"",hint:"起名按八字喜用匹配字库五行，可评估现有名字或生成候选名。"}];function ro(s){return String(s).padStart(2,"0")}const un=["almanac","convert","zeri","xiaoliuren","qian","star","numerology","trend","fengshui","name","constitution","wuyunliuqi","taiyi"],Fn=[{sys:"liuyao",label:"六爻",tip:"摇一卦：只用起卦当下定六神旺衰，所问之事写下面（必填）"},{sys:"meihua",label:"梅花",tip:"梅花易数：按起卦时刻的年月日时成卦，也可改成两个数字起卦"},{sys:"daliuren",label:"六壬",tip:"大六壬：按起卦时刻的日干支、时支与月将起天地盘"},{sys:"qimen",label:"奇门",tip:"奇门遁甲：时家转盘，默认拆补取局，可换超神接气/置闰"},{sys:"tarot",label:"塔罗",tip:"塔罗：不看时间，点一下就抽牌；牌阵在下面选"},{sys:"xiaoliuren",label:"小六壬",tip:"小六壬：按起课时刻推算，也可切报数起课"}],Bn="mp.cast.open",Wi=Array.isArray(window.__MPGroups)?window.__MPGroups:[],Un="mp.recent.tabs",Gn="mp.first.view",Yn=3;function Nt(s){return window.__PP.storeGet(s)}function At(s,o){window.__PP.storeSet(s,o)}const Zn="mp.panel.result.v1",Ji=1,Xi=6,Kn=5e5,Qi=16e5,gn={computeHits:0,cacheHits:0};typeof window<"u"&&(window.__MPStats=gn);function es(s){return window.__PP.hash36(s)}function Vn(){const s=Nt(Zn);return s&&typeof s=="object"&&!Array.isArray(s)?s:{}}function as(s){if(!s)return null;const o=Vn()[s];return o&&o.result&&o.result.r?o:null}function ts(s,o){if(!(!s||!o))try{if(JSON.stringify(o).length>Kn)return;const A=Vn();A[s]=o;const U=se=>{try{return JSON.stringify(se).length}catch{return Kn}},ue=Object.keys(A).sort((se,ae)=>(A[se].at||0)-(A[ae].at||0));let oe=ue.reduce((se,ae)=>se+U(A[ae]),0);for(;ue.length&&(ue.length>Xi||oe>Qi);){const se=ue.shift();oe-=U(A[se]),delete A[se]}At(Zn,A)}catch{}}function ns(s){return window.__PP.dayLabel(s)}function fn(){return window.__PP.nowParts()}const is={ziwei:"birth",bazi:"birth",hepan:"birth",liuyao:"cast",meihua:"cast",daliuren:"cast",qimen:"cast",tarot:"none",almanac:"date",zeri:"date",star:"date",numerology:"date",convert:"date",trend:"birth",fengshui:"birth",name:"birth",xiaoliuren:"cast",qian:"date",guanyin:"none",mbti:"none",constitution:"none",wuyunliuqi:"date",taiyi:"date"},Wn={date:"1990-05-12",time:"14:30"},Lt=s=>is[s]||"none",Ye=window.__MPCore||{},pa=Ye.needAsk||(s=>!1),de={ref:null,seats:[],seatOk:{},seatDisposers:[],contribution:"",keys:"",injectType:"",spec:"",errs:[],regs:0,mounted:0},ea={r:null,q:"",it:null,entry:null};let wa="";function Jn(){const s=[];return s.push("inputActions "+(de.ref?"已拿到":"未拿到")),s.push("渲染 "+de.mounted+" 次"),s.push("注册 "+de.regs+" 次"),s.push("inject "+(de.injectType||"?")),s.push("槽位 "+(de.spec||"?")),de.contribution&&s.push("贡献 "+de.contribution),de.errs.length&&s.push("错误："+de.errs.join(" / ")),"桥自检："+s.join("；")}function Xn(s){if(de.errs.length>=3)return;const o=s&&s.message?String(s.message):String(s);de.errs.push(o.slice(0,90))}function ss(s){if(!s)return null;const o=s.inputActions;if(o&&typeof o.setDraft=="function"&&typeof o.submit=="function")return o;const A=s.actions&&s.actions.input;return A&&typeof A.setDraft=="function"&&typeof A.submit=="function"?A:null}function Qn(s,o){const A=ss(s);return ra(()=>{if(de.seats.indexOf(o)<0&&de.seats.push(o),de.keys=s?Object.keys(s).join(","):"",A){de.ref=A;try{window.__MPComposer=A}catch{}}return()=>{de.ref===A&&(de.ref=null)}},[A,o]),A}function os(){const s=ea.r;if(!s)return"";try{const o=W.askPrompt?W.askPrompt(s,{question:ea.q,interpret:ea.it}):null;return o&&o.text||String(s.summary||"")}catch{return String(s.summary||"")}}function ei(s){return de.mounted+=1,Qn(s,"input.right")?l("button",{type:"button",className:"mp-chip ok",title:ea.r?"把上一张盘的摘要和问题发进对话窗":"先在侧栏「烛微命盘」里排一张盘",onClick:()=>{const A=os();A&&ti(A)}},"命理·问"):l("span",{className:"mp-chip warn",title:"命理：已占住输入框槽位，但没拿到 inputActions；把这句话告诉作者"},"命理·未就绪")}function ai(s){return de.mounted+=1,Qn(s,"composer.dock"),null}function ti(s){let o=de.ref;if(!o)try{o=window.__MPComposer||null}catch{o=null}return!o||typeof o.setDraft!="function"||typeof o.submit!="function"?!1:(o.setDraft(s),o.submit(),!0)}function rs(s){const o=s.kind==="ziwei"?_.ziweiHTML(s.r):s.kind==="bazi"?_.baziHTML(s.r,{chenggu:s.chenggu,marriage:s.marriage,life:s.life})+(s.trend?_.trendHTML(s.trend,{brief:!1}):""):s.kind==="meihua"?_.meihuaHTML(s.r):s.kind==="daliuren"?_.daliurenHTML(s.r):s.kind==="qimen"?_.qimenHTML(s.r)+_.qimenFactsHTML(s.r):s.kind==="hepan"?s.r.chart==="ziwei"?_.ziweiHepanHTML(s.r):_.hepanHTML(s.r):s.kind==="tarot"?_.tarotHTML(s.r):s.kind==="qian"?_.qianHTML(s.r):s.kind==="guanyin"?_.guanyinHTML(s.r):s.kind==="liuyao"?_.liuyaoHTML(s.r):s.kind==="almanac"?_.almanacHTML(s.r):s.kind==="zeri"?_.zeriHTML(s.r):s.kind==="trend"?_.trendHTML(s.r):s.kind==="name"?_.nameHTML(s.r):s.kind==="mbti"?_.mbtiHTML(s.r):s.kind==="constitution"?_.constitutionHTML(s.r):s.kind==="wuyunliuqi"?_.wuyunliuqiHTML(s.r):s.kind==="taiyi"?_.taiyiHTML(s.r):s.kind==="fengshui"?_.fengshuiHTML(s.r):_.quickHTML(s.r),A=o.startsWith('<section class="mp-br"')?o.indexOf("</section>"):-1,U=A<0?o:o.slice(A+10),ue=A<0?"":o.slice(0,A+10);return U+_.plainHTML(s.r)+ue}function ps(s){const o=!!s.open,A=l("button",{type:"button",className:"mp-castrow-h","aria-expanded":o?"true":"false","aria-controls":"mp-castlist",onClick:s.onToggle,title:"展开六个占卜体系的起卦入口：点一个就切过去，并用当前时刻起卦"},l("span",{className:"mp-castrow-t"},"起卦"),l("span",{className:"mp-castrow-l"},o?"六个占卜体系，点一下就起":Fn.map(U=>U.label).join(" · ")),l("i",{className:"mp-castrow-i","aria-hidden":"true"},o?"▴":"▾"));return o?l("div",{key:"cast",className:"mp-castrow open"},A,l("div",{key:"list",id:"mp-castlist",className:"mp-castlist"},Fn.map(U=>l("button",{key:U.sys,type:"button",className:"mp-castchip"+(s.tab===U.sys?" on":""),"data-cast":U.sys,"aria-pressed":s.tab===U.sys?"true":"false",title:U.tip,onClick:()=>s.onCast(U.sys)},U.label))),s.hasResult?l("div",{key:"ask",className:"mp-castask"},l("button",{type:"button",className:"mp-castgo",onClick:s.onAsk,title:"把这张盘和所问之事发进 DSH 对话窗（与下面的「问进对话」同一个通路）"},"把这张盘问进对话")):null):l("div",{key:"cast",className:"mp-castrow"},A)}function ls(){const[s,o]=j("ziwei"),[A,U]=j(!1),ue=Rn(s);ra(()=>{ue.current=s},[s]);const[oe,se]=j("1990-05-12"),[ae,xe]=j("14:30"),[ze,Ce]=j(!1),[G,ve]=j("female"),[X,C]=j(""),[B,Q]=j("1992-08-15"),[ie,ke]=j("10:00"),[qe,a]=j("female"),[aa,Tt]=j(""),[la,Za]=j("bazi"),[ta,Ct]=j(!1),[Ve,He]=j("1990-01-01"),[Ne,Et]=j("12:00"),[Ka,Va]=j("male"),[Na,_t]=j(""),[Wa,Ja]=j("chaibu"),[Aa,da]=j(!0),[Ht,ft]=j(()=>{try{return window.localStorage.getItem("dsh-metaphysics/nudge-off")==="1"}catch{return!1}}),[Xa,Qa]=j(!0),[La,Ta]=j("same-day"),[et,Ot]=j(!1),[We,Pt]=j(""),[It,Ze]=j(""),[Dt,Ca]=j(null),[,Rt]=j(0);ra(()=>{const t=b=>{if(!b.ctrlKey||!b.shiftKey||String(b.key||"").toLowerCase()!=="d")return;const k=window.__MPCompose;!k||!k.setDev||!k.devOn||(b.preventDefault(),k.setDev(!k.devOn()),Rt(M=>M+1))};return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)},[]);const[bt,ht]=j({}),[Ea,at]=j(null),[_a,Ft]=j([{year:"2019",kind:"career"},{year:"2022",kind:"love"}]),[Ha,$a]=j(null),[ca,tt]=j("开业"),[nt,Bt]=j("30"),[na,Ut]=j(""),[je,Oa]=j(""),[ma,ua]=j("solar2lunar"),[Pa,Gt]=j(""),[Ia,it]=j(!1),[Fe,Da]=j("time"),[Ra,Yt]=j(""),[Je,ka]=j(""),[ia,Zt]=j(""),[st,Kt]=j(()=>new Array(Mt().total).fill(null)),[hn,Vt]=j(0),[Fa,xn]=j(null),[ot,Wt]=j(()=>new Array(mn).fill(null)),[xt,vt]=j(0),[yt,Jt]=j("60"),[Se,ga]=j("natal"),[za,rt]=j("9"),[Ba,Xt]=j("子"),[pt,Qt]=j("午"),[Ge,wt]=j("assess"),[e,n]=j("李"),[i,p]=j(""),[r,d]=j("6"),[c,m]=j(!1),[g,f]=j(""),[u,h]=j(null),[$,T]=j(!1),[L,E]=j(""),[re,F]=j(""),[P,te]=j(null);ra(()=>{const t=document.querySelector(".mp-panel");if(!t)return;const b=!!u&&!$&&s!=="guanyin";t.classList.toggle("mp-locked",b),_&&_.lockParams&&_.lockParams(t,b)},[u,$,s]);const[K,O]=j(()=>Di()),[J,V]=j(()=>Nt(Gn)==="flat"?"flat":"group"),[Le,Me]=j(()=>{const t=Nt(Un);return Array.isArray(t)?t:[]}),[Z,he]=j({}),[ne,w]=j(null),[z,q]=j(()=>_.profilesLoad()),[pe,le]=j(null),[y,ce]=j(""),[S,R]=j(""),[ee,Y]=j(""),[ye,$e]=j(!1),[I,Ee]=j("three"),[_e,Be]=j(""),[Oe,fa]=j("general");function ba(){return We.trim()||(u&&(pa(u.kind)||u.kind==="guanyin")?String(_e||"").trim():"")}ra(()=>{u&&u.r&&(ea.r=u.r,ea.q=ba(),ea.it=u.it||null);const t=u&&u.it;t&&t.error&&!zt.has(t.errorId||t.error)&&(zt.size>40&&zt.clear(),zt.add(t.errorId||t.error),console.warn("[metaphysics] 解读未生成 "+(t.errorId||""),t.error))},[u,We,_e]);const[Ua,vn]=j(null),[x,H]=j(Nt(Bn)===!0),[be,fe]=j(!1),[Ae,Pe]=j("time"),[Ie,en]=j(""),[qa,an]=j(""),[tn,ii]=j(""),[us,ja]=j(""),[yn,nn]=j({birth:null,cast:null}),gs=Qe.find(t=>t.k===s)||Qe[0],$t=s==="bazi"||s==="ziwei"||s==="hepan"||s==="trend"||s==="fengshui"||s==="name",Xe=Lt(s),si=!(s==="meihua"&&Ae==="number"),oi=s!=="tarot"&&s!=="mbti"&&s!=="constitution"&&s!=="guanyin"&&si,ri=oi&&Xe!=="date",po=ri,De=async(t,b,k,M)=>{const v=t||s,me=k||Ae,we=v==="bazi"||v==="trend",Re=M&&typeof M.hourUnknown=="boolean"?M.hourUnknown:ze,Te=b||(we&&Re?{date:oe,time:"12:00"}:{date:oe,time:ae}),sa=M&&M.gender?M.gender:G,ha=M&&typeof M.address=="string"?M.address:X,oa=M&&typeof M.trueSolar=="boolean"?M.trueSolar:Aa,dt=M&&typeof M.lateZi=="boolean"?M.lateZi:Xa,qi=M&&typeof M.lines=="string"?M.lines:g,ct=M&&typeof M.question=="string"?M.question:_e,qn=Ya(),ji=++Ue,Ga=()=>ji!==Ue;te(null),Y("");try{let Sa=0,Si=null;$e(!0);try{await gt(v);const D=window.__MP_LAST_LOAD;Sa=D&&typeof D.ms=="number"?D.ms:Ya()-qn,Si=D&&typeof D.cached=="boolean"?D.cached:null}catch(D){if(Ga())return;R(D&&D.message?D.message:String(D)),h(null);return}finally{Ga()||$e(!1)}if(Ga())return;const Mi=`${Te.date}T${Te.time}`,N={system:v};if(N.shadow=v!=="mbti"&&v!=="constitution"&&v!=="guanyin",N.trace=v==="liuyao"||v==="bazi"||v==="ziwei"||v==="qimen"||v==="daliuren",v!=="tarot"&&v!=="guanyin"&&(N.datetime=Mi),v==="bazi"||v==="ziwei"||v==="hepan"||v==="trend"){if(N.gender=sa,N.trueSolar=oa,ha.trim()){N.address=ha.trim();try{const D=await W.geocodeAddress(N.address,{online:c});D&&typeof D.lon=="number"&&(N.longitude=D.lon,N.geo=D)}catch(D){console.error("[metaphysics] 地址解析失败，退回内置表",D)}if(Ga())return}(v==="bazi"||v==="ziwei")&&(N.cross=et),N.lateZi=dt,we&&Re&&(N.hourUnknown=!0)}if(v==="liuyao"){const D=Ye.parseLines(qi);D.lines?N.lines=D.lines:D.warning&&Y(D.warning)}if(v==="qimen"&&(N.juMethod=Wa,N.lateZiHourMode=La,N.direction=Oe),v==="bazi"&&(N.verifyPast=6),v==="zeri"){N.startDate=Te.date,N.task=ca,N.days=Number(nt)||30,na&&(N.shengXiao=na);const D=je.split(/[,，、\s]+/).filter(Boolean);D.length&&(N.candidates=D)}if(v==="xiaoliuren")if(N.mode=Fe,Fe==="number"){const D=[Ra,Je,ia].map(xa=>String(xa??"").trim());if(D.some(xa=>xa===""||!Number.isFinite(Number(xa)))){R("报数起课要三个数，1 到 99 随口报就行，比如 7、13、29。"),h(null);return}N.num1=Number(D[0]),N.num2=Number(D[1]),N.num3=Number(D[2])}else{N.date=Te.date;const D=Number(String(Te.time).split(":")[0]);N.hour=Number.isFinite(D)?D:12}if(v==="mbti"){delete N.datetime;const D=st.slice();for(;D.length&&D[D.length-1]==null;)D.pop();D.length&&(N.answers=D)}if(v==="constitution"&&(delete N.datetime,N.answers=ot.slice()),v==="trend"&&we&&Re&&(N.hourUnknown=!0),v==="trend"&&(N.toAge=Number(yt)||60),v==="fengshui"&&(N.action=Se,Se==="natal"?N.gender=sa:(N.sitting=Ba,N.facing=pt,delete N.datetime,Se==="xuankong"&&(N.period=Number(za)||9))),v==="name"){if(N.action=Ge,N.surname=e.trim(),!N.surname||Ge==="assess"&&!i.trim()){R(Ge==="assess"?"起名要先填姓和名，一个字也行。":"起名要先填姓。"),h(null);return}Ge==="generate"?(N.gender=sa,N.limit=Number(r)||6,N.trueSolar=oa,N.lateZi=dt):(N.givenName=i.trim(),(!Te.date||!Te.time)&&delete N.datetime)}if(v==="convert")if(N.system="convert",ma==="lunar2solar"){const D=/^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(Pa).trim());if(!D){R("农历日期要按「年-月-日」填，例如 2026-9-17；闰月单独勾选。"),h(null);return}N.mode="lunar2solar",N.lunarYear=Number(D[1]),N.lunarMonth=Number(D[2]),N.lunarDay=Number(D[3]),N.isLeapMonth=Ia,delete N.datetime}else N.mode="solar2lunar";if(v==="tarot"&&(N.spread=I),v==="guanyin"){const D=M&&M.draw;D?(D.seed!==void 0&&(N.seed=D.seed),D.except!==void 0&&(N.except=D.except),D.no!==void 0&&(N.no=D.no)):(N.seed=Date.now()+Math.random(),u&&u.kind==="guanyin"&&u.r&&u.r.slip&&(N.except=u.r.slip.no)),ct.trim()&&(N.question=ct.trim())}if(v==="hepan"&&(N.chart=la,N.partner={datetime:`${B}T${ie}`,gender:qe,address:aa.trim()||void 0,trueSolar:oa},ta&&(N.partner2={datetime:`${Ve}T${Ne}`,gender:Ka,address:Na.trim()||void 0,trueSolar:oa})),pa(v)){if(!ct.trim()){R("请先填写「所问之事」——一句话即可，例如：今年是否适合换工作？"),fe(!0),h(null);return}fe(!1),N.question=ct.trim(),v==="liuyao"&&(N.direction=Oe)}if(v==="meihua"&&(N.mode=me,me==="number")){if(Ie.trim()===""||qa.trim()===""){R("数字起卦需要填两个数（第一个数定上卦、第二个数定下卦）。"),h(null);return}if(N.upper=Number(Ie),N.lower=Number(qa),!Number.isFinite(N.upper)||!Number.isFinite(N.lower)){R("两个数都要是数字，例如 17 和 29。"),h(null);return}tn!==""&&(N.changing=Number(tn))}v==="trend"&&!N.asOf&&Ye.todayStamp&&(N.asOf=Ye.todayStamp());const Ni=es(`${Ji}|${JSON.stringify(N)}`),pn=v==="guanyin"?null:as(Ni);if(pn&&pn.result&&pn.result.kind===v){if(Ga())return;gn.cacheHits++,h(pn.result),T(!1),te({engineMs:Sa,computeMs:0,cached:!0,totalMs:Ya()-qn,renderMs:null}),Ca(null),at(null),ht({}),$a(null),R(""),ja("");return}const eo=Ya();gn.computeHits++;const Ma=W.compute(N),ao=Ya()-eo;let jn=null;try{jn=_.shadowTrack?_.shadowTrack(Ma):null}catch{jn=null}let Sn=null;if(v==="bazi"&&!Re){if(!W.buildChenggu){try{await gt("chenggu")}catch{}if(Ga())return}if(W.buildChenggu)try{Sn=W.buildChenggu({year:Number(Te.date.slice(0,4)),month:Number(Te.date.slice(5,7)),day:Number(Te.date.slice(8,10)),hour:Number(Te.time.slice(0,2)),minute:Number(Te.time.slice(3,5)),lateZi:dt})}catch{Sn=null}}let Mn=null;if(v==="bazi"&&W.buildMarriage)try{Mn=W.buildMarriage(Ma)}catch{Mn=null}let Nn=null;if(v==="bazi"&&W.buildFacets)try{Nn=W.buildFacets(Ma)}catch{Nn=null}let An=null;if(v==="bazi")try{An=W.compute({system:"trend",datetime:Mi,gender:sa,toAge:100,trueSolar:oa,lateZi:dt,...Ye.todayStamp?{asOf:N.asOf||Ye.todayStamp()}:{},...N.dst!==void 0?{dst:N.dst}:{},...N.address?{address:N.address}:{},...typeof N.longitude=="number"?{longitude:N.longitude}:{},...N.geo?{geo:N.geo}:{}})}catch{An=null}let Ln=null;if(W.caliberCompare)try{Ln=W.caliberCompare(N)}catch{Ln=null}const to=pa(v)||v==="qimen"?{question:pa(v)?ct.trim():"",direction:Oe}:void 0,ln=W.interpret?W.interpret(Ma,to):null;ln&&Ma.cross&&W.crossSection&&(ln.sections=[...ln.sections||[],W.crossSection(Ma.cross)]);const no=Lt(v)==="cast"&&(v!=="meihua"||me==="time"),Ai={kind:v,r:Ma,it:ln,at:Te,timed:no,trend:An,caliber:Ln,shadowDiff:jn,chenggu:Sn,marriage:Mn,life:Nn,gender:sa,address:ha,trueSolar:oa,lateZi:dt};h(Ai),T(!1),v!=="guanyin"&&ts(Ni,{result:Ai,at:Date.now()});const Li=D=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>D>1?Li(D-1):Ti()):setTimeout(Ti,0)},Ti=()=>{ji===Ue&&te({engineMs:Sa,computeMs:ao,cached:Si,totalMs:Ya()-qn,renderMs:null})};if(Li(2),Ca(null),at(null),ht({}),$a(null),R(""),ja(""),v!=="tarot"&&v!=="guanyin"&&v!=="mbti"&&v!=="constitution"){const D=!!(we&&Re),xa={kind:v,date:Te.date,time:D?"":Te.time,hourUnknown:D,gender:sa,address:ha,trueSolar:oa,lateZi:dt,lines:v==="liuyao"?qi:"",question:pa(v)?ct.trim():"",direction:Oe,spread:I,mhMode:me,upper:Ie,lower:qa,changing:tn,...v==="qimen"?{qimenRule:Wa,qLateZi:La}:{},...v==="zeri"?{task:ca,days:nt,shengXiao:na,zCand:je}:{},...v==="xiaoliuren"?{xlrMode:Fe,num1:Ra,num2:Je,num3:ia}:{},...v==="trend"?{toAge:yt}:{},...v==="fengshui"?{fsMode:Se,fsPeriod:za,sitting:Ba,facing:pt}:{},...v==="name"?{nnMode:Ge,surname:e,givenName:i,limitN:r}:{},...v==="convert"?{convMode:ma,lunarDate:Pa,leapMonth:Ia}:{},...v==="hepan"?{hpChart:la,partnerDate:B,partnerTime:ie,partnerGender:qe,partnerAddress:aa,thirdOn:ta,p2Date:Ve,p2Time:Ne,p2Gender:Ka,p2Address:Na}:{},label:Fi(v,Ma),at:Date.now()};O(io=>{const Ci=[xa,...io.filter(so=>!Ri(so,xa))].slice(0,20);return Dn(Ci),Ci}),v!=="tarot"&&v!=="guanyin"&&v!=="mbti"&&v!=="constitution"&&(ea.entry=xa),wi(!1)}}catch(Sa){if(Ga())return;R(Sa&&Sa.message?Sa.message:String(Sa)),h(null)}},fs=async t=>{const b=Lt(t),k=++Ue;if(R(""),t==="mbti"){Y(""),$e(!0);try{await gt(t)}catch(v){k===Ue&&R(v&&v.message?v.message:String(v))}finally{k===Ue&&$e(!1)}if(k!==Ue)return;o(t),st.filter(v=>v!=null).length>=va?De(t):h(null);return}if(t==="constitution"){Y(""),$e(!0);try{if(await gt(t),k===Ue&&!Fa){const v=W.compute({system:"constitution"});v&&v.paper&&xn(v)}}catch(v){k===Ue&&R(v&&v.message?v.message:String(v))}finally{k===Ue&&$e(!1)}if(k!==Ue)return;o(t),ot.filter(v=>v!=null).length>=ya?De(t):h(null);return}if(o(t),t==="guanyin"){h(null);return}if(b==="none"){De(t);return}const M=yn[b]||(b==="cast"||b==="date"?fn():{date:Wn.date,time:Wn.time});se(M.date),xe(M.time),De(t,M)},bs=t=>{Qe.some(b=>b.k===t)&&Me(b=>{const k=(b||[]).filter(v=>v&&v.tab&&v.tab!==t),M=[{tab:t,at:Date.now()}].concat(k).slice(0,Yn);return At(Un,M),M})},pi=t=>{const b=t==="flat"?"flat":"group";V(b),At(Gn,b)},sn=t=>{bs(t),fs(t)},hs=()=>{const t=!x;H(t),At(Bn,t)},xs=t=>{sn(t)},vs=t=>{se(t),Xe!=="none"&&nn(b=>Object.assign({},b,{[Xe]:{date:t,time:ae}}))},ys=t=>{xe(t),Xe!=="none"&&nn(b=>Object.assign({},b,{[Xe]:{date:oe,time:t}}))},lo=()=>{const t=fn();se(t.date),xe(t.time),Xe!=="none"&&nn(b=>Object.assign({},b,{[Xe]:null})),De(s,t)},lt=()=>{if(s==="mbti"){const t=st.filter(b=>b!=null).length;if(t<va){Y(`先答满 ${va} 题再看结果（现答 ${t} 题，还差 ${va-t} 题）。`);return}De(s);return}if(s==="constitution"){const t=ot.filter(b=>b!=null).length;if(t<ya){Y(`先答满 ${ya} 题再看结果（现答 ${t} 题，还差 ${ya-t} 题）。`);return}De(s);return}if(Xe==="cast"&&!yn[Xe]){const t=fn();se(t.date),xe(t.time),De(s,t);return}De(s)},li=()=>{if(A)return;if(!!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion:reduce)").matches)){lt();return}U(!0),window.setTimeout(()=>{U(!1),(ue.current==="qian"||ue.current==="guanyin")&&lt()},1050)},ws=()=>{const t={date:"1990-05-12",time:"14:30"};o("bazi"),ve("male"),C("河北石家庄"),nn(b=>Object.assign({},b,{birth:t})),se(t.date),xe(t.time),De("bazi",t,null,{gender:"male",address:"河北石家庄"})},di=t=>{Pe(t),De(s,{date:oe,time:ae},t)},$s=()=>!!(window.matchMedia&&window.matchMedia("(max-width: 640px)").matches),wn=()=>Ua===null?$s():Ua,on=(t,b,k)=>{if(!b)return;const M=me=>{t.textContent=me?"已复制":"复制失败",setTimeout(()=>{t.textContent=k},1400)},v=()=>{try{const me=document.createElement("textarea");me.value=b,me.setAttribute("readonly",""),me.style.position="fixed",me.style.opacity="0",document.body.appendChild(me),me.select();const we=!!(document.execCommand&&document.execCommand("copy"));return document.body.removeChild(me),we}catch{return!1}};try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(b).then(()=>M(!0),()=>M(v()));return}}catch{}M(v())},ks=t=>on(t,t.getAttribute("data-shadow-copy")||"","复制 ID"),zs=t=>on(t,t.getAttribute("data-handle-copy")||"","复制句柄"),qs=t=>{const b=t.closest(".mp-trace-layer")||document.getElementById("mp-trace-layer"),k=b&&b.querySelector("[data-trace-md]");on(t,k?k.value:"","复制 Markdown")},js=()=>{try{return String(location.href).split("#")[0]}catch{return""}},Ss=()=>{if(!u||!u.r)return null;try{return W.askPackages?W.askPackages(u.r,{question:ba(),interpret:u.it,base:js()}):null}catch{return null}},ci=[["full","复制提问","完整提问：盘面摘要 + 阅读层次 + 回答骨架，粘进任何对话窗都能用"],["brief","复制精简","一句话版：体系 + 盘号 + 你的问题，够助手认出是哪张盘"],["structured","复制参数","结构化参数（JSON）：助手可直接照 args 调 compute，不必解析自然语言"],["link","复制深链","深链：把这张盘的参数编进链接，打开即还原同一张盘（换台机器、发给朋友都行）"]],Ms=(t,b)=>{const k=Ss();if(!k){Ze("还没有可以复制的盘：先排一张。");return}const M=t==="link"?k.link:k[t];if(!M){Ze(t==="link"?"这张盘没拿到盘号（随机抽牌只复现参数、不复现牌面），深链做不出来；用「复制提问」那一档。":"这一档暂时是空的，换一档试试。");return}on(b,M,ci.find(v=>v[0]===t)[1]),t==="link"&&Ze("深链已复制：打开就还原这张盘，也可以直接发给别人。链接里是编码不是加密，别公开贴。")},Ns=()=>{const t=document.getElementById("mp-trace-layer");if(!t)return;t.classList.add("open"),t.setAttribute("aria-hidden","false");const b=t.querySelector("[data-trace-close]");b&&b.focus&&b.focus()},mi=()=>{const t=document.getElementById("mp-trace-layer");if(!t)return;t.classList.remove("open"),t.setAttribute("aria-hidden","true");const b=document.querySelector("[data-trace-open]");b&&b.focus&&b.focus()},As=t=>{if(t.target&&t.target.closest?t.target.closest("[data-lq-again]"):null){lt();return}const k=t.target&&t.target.closest?t.target.closest("[data-shadow-copy]"):null;if(k){ks(k);return}const M=t.target&&t.target.closest?t.target.closest("[data-handle-copy]"):null;if(M){zs(M);return}if(t.target&&t.target.closest?t.target.closest("[data-trace-open]"):null){Ns();return}const me=t.target&&t.target.closest?t.target.closest("[data-trace-copy]"):null;if(me){qs(me);return}if(t.target&&t.target.closest?t.target.closest("[data-mp-askcopy]"):null){Cs();return}if(t.target&&t.target.closest?t.target.closest("[data-trace-close]"):null){mi();return}const Te=t.target&&t.target.closest?t.target.closest(".mp-it-head"):null;if(!Te)return;const sa=Te.closest(".mp-it");if(!sa)return;const ha=!sa.classList.contains("folded");sa.classList.toggle("folded",ha),Te.setAttribute("aria-expanded",ha?"false":"true");const oa=Te.querySelector(".mp-it-hint");oa&&(oa.textContent=ha?"点击展开":"点击收起"),vn(ha)},ui=(t,b)=>{if(!u||!(pa(s)||s==="qimen"))return;const k={question:pa(s)?(b===void 0?_e:b).trim():"",direction:t===void 0?Oe:t},M=W.interpret?W.interpret(u.r,k):null;let v=u.r;if((s==="liuyao"||s==="qimen")&&v&&v.trace&&W.buildTrace)try{const me=s==="liuyao"?W.buildTrace(v,{direction:k.direction,gender:v.useGod&&v.useGod.gender||"male",refresh:!0}):W.buildTrace(v,{direction:k.direction});me&&(v=Object.assign({},v,{trace:me}))}catch{}h(Object.assign({},u,{r:v,it:M}))},Ls=t=>{if(!t||!t.timed||!t.at)return"";const b=/^\d{4}-\d{2}-\d{2}$/.test(String(t.at.date))?t.at.date:"",k=/^\d{2}:\d{2}(:\d{2})?$/.test(String(t.at.time))?String(t.at.time).slice(0,5):"";return!b||!k?"":`<div class="mp-cast">起卦时刻：<b>${b} ${k}</b>　（来自你的本机时间，点「此刻」可重新取当下）</div>`},Ts=()=>{try{const t=u&&u.r&&u.r.summary?u.r.summary:"";if(!t)return;navigator.clipboard.writeText(t).then(()=>ja("已复制"),()=>ja("复制失败"))}catch{ja("复制失败")}},Cs=()=>{if(!u||!u.r||!window.Engine||!window.Engine.buildEventPrompt)return;const t=Ye&&Ye.kindOfDirection?Ye.kindOfDirection(Oe):"other";let b;try{b=window.Engine.buildEventPrompt(u.r,{question:(_e||"").trim(),kind:t,gender:G,timeKnown:!0})}catch{b=null}b&&b.text&&navigator.clipboard.writeText(b.text).then(()=>ja("已复制问事提示"),()=>ja("复制失败"))},gi=()=>{if(!(!u||!u.r||!We.trim()))try{Ca(W.followup?W.followup(u.r,We.trim()):null)}catch(t){Ca({question:We.trim(),ok:!1,answer:"追问失败："+(t&&t.message?t.message:t),evidence:[],confidence:"弱"})}},fi=()=>{if(!(!u||!u.r))try{const t=W.askPrompt?W.askPrompt(u.r,{question:ba(),interpret:u.it}):null,b=t&&t.text?t.text:String(u.r.summary||"");if(ti(b)){Ze("已发到对话窗，往下看回复。");return}const k="（"+Jn()+"）";navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(b).then(()=>Ze("对话输入框还没就绪"+k+"，已复制提问；粘进对话窗回车即可。"),()=>Ze("对话输入框还没就绪"+k+"，复制也没成功；先点「复制文字结果」再贴。")):Ze("对话输入框还没就绪"+k+"；先点「复制文字结果」再贴进对话窗。")}catch(t){Ze("发到对话窗失败："+(t&&t.message?t.message:t))}},Es=()=>{const t=[],b=window.__MP_VER||"未知";t.push("# 命理插件反馈"),t.push(""),t.push("## 我遇到的情况"),t.push(""),t.push("（在这里写一句就好：哪里不对 / 读不懂哪一段 / 算得和别人不一样 / 想加什么。下面这些是自动带的复现信息，不用改。）"),t.push(""),t.push("## 复现信息"),t.push(""),t.push("- 插件版本：v"+b);{const we=Number(window.__MP_UNRELEASED)||0;we&&t.push("- 未发版改动："+we+" 项（版本号未变，说明这份产物比 v"+b+" 新）")}const k=Qe.find(we=>we.k===s)?.label||s;if(t.push("- 体系："+k+(k===s?"":"（"+s+"）")),_e&&t.push("- 所问之事："+_e),Oe&&Oe!=="general"){const we=(Array.isArray(W.DIRECTIONS)?W.DIRECTIONS:[]).find(Re=>Re.key===Oe);t.push("- 询问方向："+(we?we.label:Oe))}t.push(""),t.push("### 输入"),t.push(""),t.push("```");const M=Lt(s);s!=="tarot"&&s!=="mbti"&&s!=="constitution"&&!(s==="meihua"&&Ae==="number")&&(t.push(`日期：${oe}`),M!=="date"&&t.push(`时刻：${ze?"（未知，按三柱排）":ae}`),M==="birth"&&(t.push(`性别：${G==="male"?"男":"女"}`),X&&t.push(`出生地：${X}`),t.push(`真太阳时：${Aa?"开":"关"}　晚子时换日：${Xa?"开":"关"}`)),s==="qimen"&&t.push(`奇门取局：${Wa}`),et&&t.push("交叉验证：开"));const me={合盘:()=>{t.push(`对方：${B} ${ie} ${qe==="male"?"男":"女"}${aa?" "+aa:""}（${la} 盘）`),ta&&t.push(`第三方：${Ve} ${Ne} ${Ka==="male"?"男":"女"}${Na?" "+Na:""}`)},择日:()=>{t.push(`事项：${ca}　起算：${oe}　天数：${nt}${na?"　属相："+na:""}${je?"　候选日："+je:""}`)},起名:()=>{t.push(`姓：${e||"（未填）"}　名：${i||"（未填）"}　模式：${Ge}${Ge==="generate"?"　候选数："+(r||"默认"):""}`)},公农历:()=>{t.push(`模式：${ma}${Pa?"　农历输入："+Pa:""}${Ia?"（闰月）":""}`)},小六壬:()=>{t.push(`模式：${Fe}${Fe==="number"?`　报数：${Ra}/${Je}/${ia}`:""}`)},风水:()=>{t.push(`动作：${Se}${Se==="natal"?"":`　坐：${Ba}　向：${pt}`}${Se==="xuankong"?`　运：${za}`:""}`)}};if(me[k]&&me[k](),t.push("```"),t.push(""),S&&(t.push("### 报错原文"),t.push(""),t.push("```"),t.push(String(S)),t.push("```"),t.push("")),u&&u.r){t.push("### 结果摘要（引擎原文，前 40 行）"),t.push(""),t.push("```");const we=String(u.r.summary||(W.renderText?W.renderText(u.r):"")||"");t.push(we.split(`
`).slice(0,40).join(`
`)),t.push("```"),u.r.handle&&(t.push(""),t.push("盘号（可据此复现同一张盘）：`"+u.r.handle+"`"))}else t.push("### 结果摘要"),t.push(""),t.push("（这次没有生成盘面——如果是在排盘过程中出错，上面的「报错原文」就是关键。）");return t.push(""),t.push("## 联系渠道"),t.push(""),t.push("- GitHub issue：https://github.com/xuanfu-web/dsh-metaphysics/issues"),t.push("- 邮件：1129440028@qq.com"),t.push("- 腾讯频道：https://pd.qq.com/s/Nb18ikqqfl"),t.push("  （排盘求助 / 命例交流 / 功能与bug / 术语与依据，贴图贴盘都比邮件方便）"),t.push("- 微信群：dsh-metaphysics"),t.join(`
`)},bi=()=>{const t=Es();try{if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(()=>{E("已复制"),F("粘到 issue / 邮件 / 群里即可")}).catch(()=>{E("复制失败"),F("可改用「存 .md」或手动选中")});else{const b=document.createElement("textarea");b.value=t,b.style.cssText="position:fixed;left:-9999px;top:0",document.body.appendChild(b),b.select();const k=document.execCommand&&document.execCommand("copy");b.remove(),E(k?"已复制":"复制失败"),F(k?"粘到 issue / 邮件 / 群里即可":"可改用「存 .md」或手动选中")}}catch{E("复制失败"),F("可改用「存 .md」")}setTimeout(()=>{E(""),F("")},4e3)},_s=()=>{try{bi()}catch{}const t=encodeURIComponent("[反馈] "+(Qe.find(b=>b.k===s)?.label||s)+(S?"：报错":"：使用问题"));try{window.open("https://github.com/xuanfu-web/dsh-metaphysics/issues/new?title="+t,"_blank","noopener")}catch{F("浏览器拦了弹窗，请手动打开 GitHub issues")}},Hs=()=>{if(!(!u||!u.r))try{const t=W.renderText?W.renderText(u.r):u.r.summary||"",b=new Blob([t],{type:"text/markdown;charset=utf-8"}),k=document.createElement("a");k.href=URL.createObjectURL(b),k.download=`烛微命盘报告-${u.r.system}.md`,document.body.appendChild(k),k.click(),k.remove(),setTimeout(()=>URL.revokeObjectURL(k.href),2e3)}catch(t){console.error("[metaphysics] 导出失败",t)}},Os=()=>{if(!(!u||!u.r))try{const t=_.summaryCardPNG?_.summaryCardPNG(u.r,u.it):"";if(!t){ja("当前环境不支持 Canvas 导出");return}const b=document.createElement("a");b.href=t,b.download=`烛微命盘摘要-${u.r.system}.png`,document.body.appendChild(b),b.click(),b.remove()}catch(t){console.error("[metaphysics] 长图导出失败",t)}},hi={fontSize:12,padding:"5px 12px"},Ps=()=>{!u||!u.r||!u.r.past||at(W.verifyFit?W.verifyFit(u.r.past.rows,bt):null)},Is=()=>{if(!(!u||u.kind!=="bazi"))try{const t=u.at||{date:oe,time:ae},[b,k,M]=String(t.date).split("-").map(Number),[,v]=String(t.time).split(":").map(Number),me=_a.filter(we=>Number(we.year)).map(we=>({year:Number(we.year),kind:we.kind}));$a(W.rectifyBirth?W.rectifyBirth({base:{year:b,month:k,day:M,minute:Number.isFinite(v)?v:0},gender:u.gender||G,events:me,lateZi:typeof u.lateZi=="boolean"?u.lateZi:Xa,trueSolar:typeof u.trueSolar=="boolean"?u.trueSolar:Aa,address:String(u.address||"").trim()||void 0}):{error:"当前客户端未加载生时校正模块"})}catch(t){$a({error:t&&t.message?t.message:String(t)})}},ge=(t,b)=>l("label",{className:"mp-field"},l("span",{className:"mp-lbl"},t),b),xi=t=>{o(t.kind),t.date&&se(t.date),t.time&&xe(t.time),Ce(!!t.hourUnknown),t.gender&&ve(t.gender),C(t.address||""),typeof t.trueSolar=="boolean"&&da(t.trueSolar),typeof t.lateZi=="boolean"&&Qa(t.lateZi),f(t.lines||""),Be(t.question||""),fa(t.direction||"general"),Ee(t.spread||{1:"one",3:"three",5:"five"}[t.count]||"three"),Pe(t.mhMode||"time"),en(t.upper||""),an(t.lower||""),ii(t.changing||""),t.kind==="qimen"&&(typeof t.qimenRule=="string"&&Ja(t.qimenRule),typeof t.qLateZi=="string"&&Ta(t.qLateZi)),t.kind==="zeri"&&(typeof t.task=="string"&&tt(t.task),t.days!=null&&Bt(String(t.days)),typeof t.shengXiao=="string"&&Ut(t.shengXiao),typeof t.zCand=="string"&&Oa(t.zCand)),t.kind==="xiaoliuren"&&(Da(t.xlrMode==="number"?"number":"time"),t.num1!=null&&Yt(String(t.num1)),t.num2!=null&&ka(String(t.num2)),t.num3!=null&&Zt(String(t.num3))),t.kind==="trend"&&t.toAge!=null&&Jt(String(t.toAge)),t.kind==="fengshui"&&(typeof t.fsMode=="string"&&ga(t.fsMode),t.fsPeriod!=null&&rt(String(t.fsPeriod)),typeof t.sitting=="string"&&Xt(t.sitting),typeof t.facing=="string"&&Qt(t.facing)),t.kind==="name"&&(typeof t.nnMode=="string"&&wt(t.nnMode),typeof t.surname=="string"&&n(t.surname),typeof t.givenName=="string"&&p(t.givenName),t.limitN!=null&&d(String(t.limitN))),t.kind==="convert"&&(typeof t.convMode=="string"&&ua(t.convMode),typeof t.lunarDate=="string"&&Gt(t.lunarDate),typeof t.leapMonth=="boolean"&&it(t.leapMonth)),t.kind==="hepan"&&(t.hpChart&&Za(t.hpChart),typeof t.partnerDate=="string"&&Q(t.partnerDate),typeof t.partnerTime=="string"&&ke(t.partnerTime),typeof t.partnerGender=="string"&&a(t.partnerGender),typeof t.partnerAddress=="string"&&Tt(t.partnerAddress),typeof t.thirdOn=="boolean"&&Ct(t.thirdOn),typeof t.p2Date=="string"&&He(t.p2Date),typeof t.p2Time=="string"&&Et(t.p2Time),typeof t.p2Gender=="string"&&Va(t.p2Gender),typeof t.p2Address=="string"&&_t(t.p2Address)),fe(!1),w(t)},Ds=()=>{O([]),Dn([])},[Ke,rn]=j(()=>{try{return _.casesLoad()}catch{return[]}}),[Rs,vi]=j(!1),[$n,yi]=j("all"),[Fs,wi]=j(!1),Bs=()=>{try{rn(_.casesLoad())}catch{}yi("all"),vi(!0)},kn=()=>vi(!1),Us=t=>t==="all"?Ke.length:Ke.filter(b=>b.status===t).length,zn=$n==="all"?Ke:Ke.filter(t=>t.status===$n),Gs=()=>{if(!ea.entry){Y("这张盘没有可存的参数，重排一次再存。");return}try{const t=_.casesAdd(ea.entry);t&&t.ok?(rn(t.list),wi(!0)):Y("卦例没能存进本机（存储被禁用或已满），排盘不受影响。")}catch{Y("卦例没能存进本机（存储被禁用或已满），排盘不受影响。")}},$i=t=>{const b=t?_.casesExportMasked(Ke):_.casesExport(Ke);if(!b){Y("还没有可导出的卦例");return}try{const k=new Blob([b],{type:"application/x-ndjson;charset=utf-8"}),M=URL.createObjectURL(k),v=document.createElement("a");v.href=M,v.download=t?`metaphysics-cases-masked-${new Date().toISOString().slice(0,10)}.jsonl`:`metaphysics-cases-${new Date().toISOString().slice(0,10)}.jsonl`,document.body.appendChild(v),v.click(),v.remove(),setTimeout(()=>{try{URL.revokeObjectURL(M)}catch{}},1e3),Y(t?`已导出 ${Ke.length} 条卦例（脱敏：去年份、时刻整点化、去出生地）`:`已导出 ${Ke.length} 条卦例（JSONL）`)}catch(k){Y("导出失败："+(k&&k.message?k.message:"当前环境不支持下载"))}},Ys=t=>{const b=t.entry||{},k=new Date(t.at),M=v=>String(v).padStart(2,"0");return l("div",{key:t.id,className:"mp-case"},l("button",{className:"mp-case-main",onClick:()=>{xi(Object.assign({},b)),kn()},title:[b.date,b.hourUnknown?"时辰未知":b.time,b.address].filter(Boolean).join(" ")||"点一下回填这组参数并重排"},l("b",null,_.profKindLabel(b.kind)),l("span",null,b.label||t.question||"—"),l("i",null,`${M(k.getMonth()+1)}-${M(k.getDate())} ${M(k.getHours())}:${M(k.getMinutes())}`)),l("select",{className:"mp-case-sel",value:t.status,title:"标应验状态",onChange:v=>rn(_.casesSetStatus(t.id,v.target.value))},_.CASE_STATUS.map(v=>l("option",{key:v,value:v},_.caseStatusLabel(v)))),l("button",{className:"mp-case-del",title:"删除这条",onClick:()=>rn(_.casesRemove(t.id))},"删"))},Zs=["bazi","ziwei","trend"],ki=t=>{o(t.kind),se(t.date),t.time&&xe(t.time),Ce(!!t.hourUnknown),t.gender&&ve(t.gender),C(t.address||""),da(t.trueSolar!==!1),Qa(t.lateZi!==!1)},Ks=t=>{const b=_.profEvent(t.target);if(!b)return;const k=v=>z.find(me=>me.id===v),M=t.currentTarget.querySelector(".mp-prof-name");if(ce(""),b.action==="use"){const v=k(b.id);if(!v)return;if(!_.profUsable(v)){Y("这张档案没有出生时刻，先补上时刻再存一次。");return}wa="",q(_.profilesTouch(v.id)),ki(v),De(v.kind,{date:v.date,time:v.hourUnknown?"12:00":v.time},void 0,{gender:v.gender||void 0,address:v.address||"",hourUnknown:!!v.hourUnknown,trueSolar:v.trueSolar!==!1,lateZi:v.lateZi!==!1});return}if(b.action==="edit"){const v=k(b.id);if(!v)return;ki(v),wa=v.label,le(v.id);return}if(b.action==="cancel"){wa="",le(null);return}if(b.action==="pin"){q(_.profilesPin(b.id));return}if(b.action==="del"){if(y!==b.id){ce(b.id);return}q(_.profilesRemove(b.id)),pe===b.id&&(wa="",le(null)),Y("已从本机删除这张档案卡（不影响已经排出来的盘）。");return}if(b.action==="put"){const v=pe,me=_.profFromForm({kind:s,date:oe,time:ae,hourUnknown:ze,gender:G,address:X,trueSolar:Aa,lateZi:Xa},M?M.value:wa,pe||void 0);if(!me){Y("先填好出生日期（和时刻），再存档案。");return}const we=_.profilesPut(me);if(!we.ok){Y("档案没能存进本机（存储被禁用或已满），排盘不受影响。");return}q(we.list),wa="",le(null),M&&(M.value=""),Y(`${v?"已更新档案":"已存入我的命盘"}「${we.item.label}」。`)}},Vs=t=>{const b=t.target&&t.target.closest?t.target.closest(".mp-prof-name"):null;b&&(wa=b.value)},Ws=t=>{const b=W.formOf?W.formOf(t):null;if(!b){De("ziwei");return}const k=Qe.some(Re=>Re.k===b.tab)?b.tab:"ziwei",M={date:b.date||oe,time:b.time||ae},v=b.lines===void 0?void 0:Array.isArray(b.lines)?b.lines.join(" "):String(b.lines);b.date&&se(b.date),b.time&&xe(b.time),b.gender&&ve(b.gender),typeof b.address=="string"&&C(b.address),typeof b.trueSolar=="boolean"&&da(b.trueSolar),typeof b.lateZi=="boolean"&&Qa(b.lateZi),v!==void 0&&f(v),b.question&&Be(b.question),o(k);let me=null;if(k==="guanyin"&&b.rest){me={};for(const Re of["no","seed","except"])b.rest[Re]!==void 0&&(me[Re]=b.rest[Re],delete b.rest[Re]);Object.keys(me).length||(me=null)}const we=W.restNote?W.restNote(b):"";Ze(`已按深链还原：${t.label}${b.question?`｜${b.question}`:""}${we?`　${we}`:""}`),De(k,M,void 0,{gender:b.gender,address:b.address,trueSolar:b.trueSolar,lateZi:b.lateZi,lines:v,question:b.question,draw:me})};ra(()=>{let t=!1;const b=Ue;return(async()=>{let k=null;try{await gt(s);const M=typeof location<"u"?String(location.href):"";M&&M.indexOf("mp=")>=0&&window.Engine&&window.Engine.parseAskLink&&(k=window.Engine.parseAskLink(M))}catch{k=null}if(!(t||Ue!==b)){if(k&&k.ok)try{Ws(k);return}catch{}De("ziwei")}})(),()=>{t=!0}},[]),ra(()=>{if(!ne)return;const t=ne.kind;w(null),De(t)},[ne]),ra(()=>{const t=b=>{if(b.key!=="Escape")return;const k=document.getElementById("mp-trace-layer");k&&k.classList.contains("open")&&mi()};return document.addEventListener("keydown",t),()=>document.removeEventListener("keydown",t)},[]);const zi=(Le||[]).filter(t=>t&&Qe.some(b=>b.k===t.tab)).slice(0,Yn),Js=t=>(Qe.find(b=>b.k===t)||{}).label||t,Xs=({k:t,label:b,tip:k,wide:M})=>l("button",{key:t,type:"button",title:k,className:"mp-tool"+(M?" wide":"")+(s===t?" on":""),"data-tab":t,onClick:()=>sn(t)},l("b",null,b),l("span",null,k)),Qs=[l("div",{key:"profiles",className:"mp-profwrap",onClick:Ks,onInput:Vs,dangerouslySetInnerHTML:{__html:_.profilesHTML(z,{editingId:pe,armedDel:y,bar:Zs.indexOf(s)>=0?_.profilesBarHTML({editingId:pe,name:wa}):""})}}),l("section",{key:"start",className:"mp-start","aria-label":"选择要算的事"},l("div",{className:"mp-start-top"},l("div",{className:"mp-recent",hidden:zi.length===0},l("span",{className:"mp-recent-lbl"},"最近用过"),l("span",{className:"mp-recent-list"},zi.map(t=>l("button",{key:t.tab,type:"button",className:"mp-rc",onClick:()=>sn(t.tab)},Js(t.tab),l("i",null,ns(t.at)))))),l("div",{className:"mp-viewsw",role:"group","aria-label":"首屏视图"},l("button",{type:"button",className:J==="group"?"on":"","aria-pressed":J==="group"?"true":"false",onClick:()=>pi("group")},"分组"),l("button",{type:"button",className:J==="flat"?"on":"","aria-pressed":J==="flat"?"true":"false",onClick:()=>pi("flat")},"平铺"))),J==="group"?l("div",{className:"mp-groups"},Wi.map(t=>{const b=!!Z[t.title],k=Math.max(0,t.items.length-4);return l("section",{key:t.title,className:"mp-tgroup"+(b?" open":"")},l("div",{className:"mp-tgroup-head"},l("h2",null,t.title),l("p",null,t.hint)),l("div",{className:"mp-ttools"},t.items.map(Xs),k>0?l("button",{key:"more",type:"button",className:"mp-tmore","aria-expanded":b?"true":"false",onClick:()=>he(M=>Object.assign({},M,{[t.title]:!b}))},b?"收起":`还有 ${k} 个`):null))})):null),l("div",{key:"tabs",className:"mp-tabs"+(J==="flat"?"":" hide"),role:"tablist","aria-label":"命理体系"},Qe.map(t=>l("button",{key:t.k,role:"tab","aria-selected":s===t.k?"true":"false",tabIndex:s===t.k?0:-1,className:"mp-tab"+(s===t.k?" on":""),onClick:()=>sn(t.k)},t.label))),l("div",{key:"head",className:"mp-panel"},ps({tab:s,open:x,onToggle:hs,onCast:xs,onAsk:fi,hasResult:!!u}),l("div",{className:"mp-row"},oi?ge($t?"出生日期（公历）":Xe==="date"?"日期（公历）":"起卦日期（公历）",l(cn,{value:oe,onChange:vs,onInvalid:()=>Y("日期请按「年-月-日」填写，例如 1990-05-12。")})):null,ri?ge($t?"出生时刻":"起卦时刻",l("input",{className:"mp-input",type:"time",value:ae,disabled:ze&&(s==="bazi"||s==="trend"),onChange:t=>ys(t.target.value)})):null,s==="bazi"||s==="trend"?l("label",{className:"mp-chk",title:"不知道出生时辰时勾这里：不排时柱，起运按日估算，结果首行会写明"},l("input",{type:"checkbox",checked:ze,onChange:t=>Ce(t.target.checked)})," 时辰未知"):null,$t?ge("性别",l("select",{className:"mp-input",value:G,onChange:t=>ve(t.target.value)},l("option",{value:"female"},"女"),l("option",{value:"male"},"男"))):null,$t?ge("出生地（省/市即可）",l("input",{className:"mp-input",placeholder:"如 河北石家庄 / 成都",value:X,onChange:t=>C(t.target.value)})):null,s==="bazi"||s==="ziwei"?l("label",{className:"mp-field mp-checks"},l("input",{type:"checkbox",checked:et,onChange:t=>Ot(t.target.checked)}),l("span",{className:"mp-lbl"},"八字 × 紫微 交叉验证")):null,s==="hepan"?ge("对方出生日期",l(cn,{value:B,onChange:Q,onInvalid:()=>Y("对方出生日期请按「年-月-日」填写，例如 1992-08-15。")})):null,s==="hepan"?ge("对方出生时刻",l("input",{className:"mp-input",type:"time",value:ie,onChange:t=>ke(t.target.value)})):null,s==="hepan"?ge("对方性别",l("select",{className:"mp-input",value:qe,onChange:t=>a(t.target.value)},l("option",{value:"female"},"女"),l("option",{value:"male"},"男"))):null,s==="hepan"?ge("合盘方式",l("div",{className:"mp-seg"},l("button",{className:la==="bazi"?"on":"",onClick:()=>Za("bazi")},"八字"),l("button",{className:la==="ziwei"?"on":"",onClick:()=>Za("ziwei")},"紫微"))):null,s==="hepan"?ge("对方出生地（可空）",l("input",{className:"mp-input",placeholder:"如 四川成都",value:aa,onChange:t=>Tt(t.target.value)})):null,s==="hepan"?l("label",{className:"mp-field mp-checks"},l("input",{type:"checkbox",checked:ta,onChange:t=>Ct(t.target.checked)}),l("span",{className:"mp-lbl"},"三方合盘（加入第三人）")):null,s==="hepan"&&ta?ge("第三方出生日期",l(cn,{value:Ve,onChange:He,onInvalid:()=>Y("第三方出生日期请按「年-月-日」填写，例如 1990-01-01。")})):null,s==="hepan"&&ta?ge("第三方出生时刻",l("input",{className:"mp-input",type:"time",value:Ne,onChange:t=>Et(t.target.value)})):null,s==="hepan"&&ta?ge("第三方性别",l("select",{className:"mp-input",value:Ka,onChange:t=>Va(t.target.value)},l("option",{value:"female"},"女"),l("option",{value:"male"},"男"))):null,s==="hepan"&&ta?ge("第三方出生地（可空）",l("input",{className:"mp-input",placeholder:"如 广东广州",value:Na,onChange:t=>_t(t.target.value)})):null,s==="qimen"?l("fieldset",{key:"qmr",className:"mp-qmrule"},l("legend",{className:"mp-lbl"},"换局规则"),l("div",{className:"mp-qmopts",role:"radiogroup","aria-label":"奇门换局规则"},[["chaibu","拆补"],["chaoshen","超神接气"],["zhirun","置闰"]].map(([t,b])=>l("label",{key:t,className:"mp-qmopt"},l("input",{type:"radio",name:"qimen_rule",value:t,checked:Wa===t,onChange:()=>Ja(t)}),l("span",null,b)))),l("div",{className:"mp-field"},l("span",{className:"mp-lbl"},"晚子时"),l("select",{className:"mp-input",value:La,onChange:t=>Ta(t.target.value)},l("option",{value:"same-day"},"23:00 后归当日"),l("option",{value:"next-day"},"23:00 后归次日"))),l("details",{className:"mp-qmhelp"},l("summary",null,"三种规则有什么区别？"),l("p",null,"决定符头与节气如何对齐、是否插入闰局；同一个时刻在不同规则下可能得到不同局数。默认「拆补」与工具层一致。"))):null,pa(s)||s==="qimen"?ge(s==="qimen"?"询问方向（定用神）":"询问方向",l("select",{className:"mp-input mp-askonly",value:Oe,onChange:t=>{fa(t.target.value),ui(t.target.value)}},(W.DIRECTIONS||[]).map(t=>l("option",{key:t.key,value:t.key},t.label)))):null,s==="tarot"?ge("牌阵",l("select",{className:"mp-input",value:I,onChange:t=>Ee(t.target.value)},l("option",{value:"one"},"1 张 · 单张指引"),l("option",{value:"three"},"3 张 · 过去现在未来"),l("option",{value:"five"},"5 张 · 五张局势"),l("option",{value:"celtic"},"10 张 · 凯尔特十字"),l("option",{value:"either"},"5 张 · 二选一"),l("option",{value:"relation"},"7 张 · 关系阵"),l("option",{value:"timeflow"},"3 张 · 时间流"))):null,s==="liuyao"?ge("六爻（可空）",l("input",{className:"mp-input",placeholder:"空则随机，如 9 7 8 8 7 6",value:g,onChange:t=>f(t.target.value)})):null,s==="meihua"?ge("起卦方式",l("div",{className:"mp-seg"},l("button",{className:Ae==="time"?"on":"",onClick:()=>di("time")},"时间"),l("button",{className:Ae==="number"?"on":"",onClick:()=>di("number")},"数字"))):null,s==="meihua"&&Ae==="number"?ge("第一个数",l("input",{className:"mp-input",value:Ie,placeholder:"如 17",onChange:t=>en(t.target.value)})):null,s==="meihua"&&Ae==="number"?ge("第二个数",l("input",{className:"mp-input",value:qa,placeholder:"如 29",onChange:t=>an(t.target.value)})):null,s==="meihua"&&Ae==="number"?ge("动爻（可空）",l("input",{className:"mp-input",value:tn,placeholder:"1-6",onChange:t=>ii(t.target.value)})):null,s==="zeri"?ge("所办事项",l("select",{className:"mp-input",value:ca,onChange:t=>tt(t.target.value)},[["常用",["嫁娶","搬家入宅","出行","开业","签订合同","祭祀"]],["婚嫁",["嫁娶","订婚","领证","提亲","收送聘金","满月酒"]],["生活",["搬家","入宅","旅行","访亲友","入学","求医","祭祀"]],["建造",["动土","装修","装修建造","安葬","试车买车"]],["工商",["开业","交易","投资","签订合同","签约","纳财","赴任"]]].map(([t,b])=>l("optgroup",{key:t,label:t},b.map(k=>l("option",{key:`${t}-${k}`,value:k},k)))))):null,s==="convert"?ge("转换方向",l("div",{className:"mp-seg"},l("button",{className:ma==="solar2lunar"?"on":"",onClick:()=>ua("solar2lunar")},"公历 → 农历"),l("button",{className:ma==="lunar2solar"?"on":"",onClick:()=>ua("lunar2solar")},"农历 → 公历"))):null,s==="convert"&&ma==="lunar2solar"?ge("农历日期",l("input",{className:"mp-input",value:Pa,placeholder:"如 2026-9-17",onChange:t=>Gt(t.target.value)})):null,s==="convert"&&ma==="lunar2solar"?l("label",{className:"mp-check"},l("input",{type:"checkbox",checked:Ia,onChange:t=>it(t.target.checked)})," 闰月"):null,s==="zeri"?ge("看多少天",l("input",{className:"mp-input",type:"number",min:1,max:60,value:nt,onChange:t=>Bt(t.target.value)})):null,s==="zeri"?ge("候选日（可空，只比这几天）",l("input",{className:"mp-input",placeholder:"如 2026-12-01, 2026-12-08, 2026-12-15",value:je,onChange:t=>Oa(t.target.value)})):null,s==="zeri"?ge("当事人属相（可空）",l("select",{className:"mp-input",value:na,onChange:t=>Ut(t.target.value)},l("option",{value:""},"不排除"),["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"].map(t=>l("option",{key:t,value:t},t)))):null,s==="xiaoliuren"?ge("起课方式",l("div",{className:"mp-seg"},l("button",{className:Fe==="time"?"on":"",onClick:()=>Da("time")},"时间"),l("button",{className:Fe==="number"?"on":"",onClick:()=>Da("number")},"报数"))):null,s==="xiaoliuren"&&Fe==="number"?ge("第一个数",l("input",{className:"mp-input",type:"number",min:1,max:99,value:Ra,onChange:t=>Yt(t.target.value)})):null,s==="xiaoliuren"&&Fe==="number"?ge("第二个数",l("input",{className:"mp-input",type:"number",min:1,max:99,value:Je,onChange:t=>ka(t.target.value)})):null,s==="xiaoliuren"&&Fe==="number"?ge("第三个数",l("input",{className:"mp-input",type:"number",min:1,max:99,value:ia,onChange:t=>Zt(t.target.value)})):null,s==="mbti"?l("div",{className:"mp-quiz-wrap"},l("div",{className:"mp-lbl"},"十六型人格问卷 · 4 题一页，按 1（完全不像）到 5（很像我）打分"),l(Yi,{answers:st,page:hn,onPick:(t,b)=>Kt(k=>{const M=k.slice();return M[t]=b,M}),onPage:t=>Vt(b=>Math.max(0,Math.min(b+t,Math.max(0,Math.ceil(Mt().total/qt)-1)))),onSubmit:lt,onClear:()=>{Kt(new Array(Mt().total).fill(null)),Vt(0),h(null)}})):null,s==="constitution"?l("div",{className:"mp-quiz-wrap"},l("div",{className:"mp-lbl"},"中医体质问卷 · 9 种体质各 5 题，共 45 题 · 5 题一页，按 1（没有）到 5（总是）打分"),l(Zi,{paper:Fa,answers:ot,page:xt,onPick:(t,b)=>Wt(k=>{const M=k.slice();return M[t]=b,M}),onPage:t=>vt(b=>Math.max(0,Math.min(b+t,Math.max(0,Math.ceil((Fa&&Fa.questions?Fa.questions.length:mn)/jt)-1)))),onSubmit:lt,onClear:()=>{Wt(new Array(mn).fill(null)),vt(0),h(null)}})):null,s==="trend"?ge("算到几岁",l("input",{className:"mp-input",type:"number",min:10,max:100,value:yt,onChange:t=>Jt(t.target.value)})):null,s==="fengshui"?ge("看什么",l("div",{className:"mp-seg"},l("button",{className:Se==="natal"?"on":"",onClick:()=>ga("natal")},"命卦"),l("button",{className:Se==="advise"?"on":"",onClick:()=>ga("advise")},"门主灶"),l("button",{className:Se==="xuankong"?"on":"",onClick:()=>ga("xuankong")},"玄空"))):null,s==="fengshui"&&Se!=="natal"?ge("坐山（24 山）",l("input",{className:"mp-input",value:Ba,placeholder:"如 子 / 乾",onChange:t=>Xt(t.target.value)})):null,s==="fengshui"&&Se!=="natal"?ge("朝向（24 山）",l("input",{className:"mp-input",value:pt,placeholder:"如 午 / 巽",onChange:t=>Qt(t.target.value)})):null,s==="fengshui"&&Se==="xuankong"?ge("运（1–9）",l("input",{className:"mp-input",type:"number",min:1,max:9,value:za,onChange:t=>rt(t.target.value)})):null,s==="name"?ge("看什么",l("div",{className:"mp-seg"},l("button",{className:Ge==="assess"?"on":"",onClick:()=>wt("assess")},"评名字"),l("button",{className:Ge==="generate"?"on":"",onClick:()=>wt("generate")},"生成候选"))):null,s==="name"?ge("姓",l("input",{className:"mp-input",value:e,placeholder:"如 李",onChange:t=>n(t.target.value)})):null,s==="name"&&Ge==="assess"?ge("名字",l("input",{className:"mp-input",value:i,placeholder:"如 沐宸",onChange:t=>p(t.target.value)})):null,s==="name"&&Ge==="generate"?ge("候选个数",l("input",{className:"mp-input",type:"number",min:1,max:20,value:r,onChange:t=>d(t.target.value)})):null),$t?l("div",{className:"mp-checks"},l("label",{title:"按出生地经度把钟表时间换算成真太阳时"},l("input",{type:"checkbox",checked:Aa,onChange:t=>da(t.target.checked)}),"真太阳时"),l("label",{title:"23:00–23:59 出生时：勾选=按次日日柱起时柱；不勾=仍用当日日柱"},l("input",{type:"checkbox",checked:Xa,onChange:t=>Qa(t.target.checked)}),"晚子时换日"),l("label",{title:"开启后会请求 OpenStreetMap，把区县/村落到更精确的坐标"},l("input",{type:"checkbox",checked:c,onChange:t=>m(t.target.checked)}),"联网精确到区县")):null,pa(s)||s==="guanyin"?l("div",{className:"mp-askblock"},l("span",{className:"mp-lbl"},s==="guanyin"?"所问之事（可留空）":"所问之事（必填）"),l("textarea",{className:"mp-textarea"+(be?" invalid":""),rows:2,value:_e,placeholder:s==="guanyin"?"心里那件事，一句话即可；不写也行。":"用一句话描述所问之事，例如：今年是否适合换工作？",onChange:t=>{Be(t.target.value),fe(!1)},onBlur:t=>ui(void 0,t.target.value)})):null,s==="mbti"||s==="constitution"?null:l("div",{key:"actions",className:"mp-actions"},l("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginRight:8},onClick:ws,title:"用固定示例盘看完整报告（不改动你已填的数据）"},"看示例"),u&&!$?l("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginRight:8},onClick:()=>T(!0),title:"出盘后参数区是只读的：点这里解锁，改完再点排盘更新结果"},"修改参数"):null,l("button",{className:"mp-btn",onClick:lt,title:"时间仍为自动时，点它会取当下再起卦"},s==="tarot"?"抽牌":s==="qian"||s==="guanyin"?"摇签":s==="bazi"||s==="ziwei"?"排盘":s==="hepan"?"合盘":s==="qimen"?"起局":un.indexOf(s)>=0?"看结果":"起卦"))),l("div",{key:"hint",className:"mp-hint"},gs.hint),K.length||Ke.length?l("div",{key:"hist",className:"mp-hist"},l("div",{className:"mp-hist-h"},l("span",null,K.length?"最近排过":"卦例库"),l("span",{className:"mp-hist-acts"},K.length?l("button",{className:"mp-hist-clear",onClick:Ds},"清空"):null,l("button",{className:"mp-hist-clear mp-hist-more",onClick:Bs},Ke.length?`卦例库 ${Ke.length}`:"卦例库"))),l("div",{className:"mp-hist-list"},K.map((t,b)=>l("button",{key:b,className:"mp-hist-item",title:`${String(t.date||"")} ${t.hourUnknown?"时辰未知":String(t.time||"")}`,onClick:()=>xi(t)},l("b",null,(Qe.find(k=>k.k===t.kind)||{}).label||t.kind),l("span",null,t.label||"—"),l("i",null,`${String(t.date||"").slice(5)} ${t.hourUnknown?"时辰未知":String(t.time||"")}`))))):null,Xe==="cast"&&si?l("div",{key:"auto",className:"mp-auto"},yn.cast?`起卦时刻用的是你手动填的（${ae}）；想跟随当下，把时间改回或清空即可。`:`起卦时刻已自动取本机时间（${ae}），每次点起卦都会重新取当下；想固定时刻就在上面改。`):null,S?l("div",{key:"err",className:"mp-err",role:"alert"},S):null,ee?l("div",{key:"ntc",className:"mp-note",role:"status"},ee):null,ye?l("div",{key:"load",className:"mp-note",role:"status"},"正在加载本页需要的引擎…"):null,!u&&!S?l("div",{key:"empty",className:"mp-empty"},s==="qian"?l("button",{key:"qoracle",type:"button",className:"mp-qn-oracle"+(A?" shaking":""),title:"点一下，摇一支今日福签",onClick:li,dangerouslySetInnerHTML:{__html:_.qianOracleHTML()}}):s==="guanyin"?l("button",{key:"loracle",type:"button",className:"mp-qn-oracle mp-lq-oracle"+(A?" shaking":""),title:"点一下，摇一支观音灵签",onClick:li,dangerouslySetInnerHTML:{__html:_.guanyinOracleHTML()}}):null,l("b",null,s==="ziwei"||s==="bazi"?"填好出生信息，点「排盘」":s==="tarot"?"写下想问的事，点「抽牌」":s==="qian"?"轻点签筒，摇出今天的福签":s==="guanyin"?"轻点签筒，摇一支观音灵签":s==="mbti"?"按 1–5 给题目打分，答满 12 题就能看结果":s==="constitution"?"按 1–5 给题目打分，答满 27 题就能看结果":un.indexOf(s)>=0?"填好参数，点「看结果」":"写下所问之事，点「起卦」"),s==="ziwei"||s==="bazi"?"出生日期、时刻与性别即可；出生地只影响真太阳时。":s==="qian"?"同一天只此一签，次日自换；想回看前几天，结果里列了最近七日。":s==="guanyin"?"一事一签，同一件事可以重摇；签号与签文只在本机计算。":s==="mbti"?"4 题一页，答案只在本地参与计算，不会上传。":s==="constitution"?"5 题一页，答案只在本地参与计算，不会上传；这是自评问卷，不是医学诊断。":un.indexOf(s)>=0?"按上面的选项填好参数即可；全部在本机计算，不上传。":"起卦时刻已自动取当下，也可以手动改。"):null,u?l("div",{key:"card",className:"mp-card mp-flat",role:"region","aria-label":"排盘结果","aria-live":"polite",onClick:As,dangerouslySetInnerHTML:{__html:Pi({head:_.envHeadHTML(u.it,{folded:wn()})||_.factHeadHTML(u.r&&u.r.factHead),body:_.envBodyHTML(u.it,{folded:wn()}),chart:rs(u),shortId:window.__MPCompose?window.__MPCompose.shortIdHTML(u.r.shortId):"",castAt:Ls(u),solar:_.solarLineHTML(u.r),interpret:_.resultWithInterpret("",u.it,{folded:wn(),noHead:!0,noBody:!0}),revision:_.revisionHTML(u.r.revision),handle:_.handleHTML(u.r.handle),shadow:_.shadowHTML(u.r.shadow,u.shadowDiff),trace:_.traceHTML(u.r.trace,u.r.system,u.r.traceText),caliber:_.caliberHTML(u.caliber),perf:_.perfHTML(P)},u.r&&u.r.system)}}):null,u?l("div",{key:"bar",className:"mp-bar"},l("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px"},onClick:Ts},us||"复制文字结果"),l("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:Hs,title:"导出盘面 + 解析（含一页读懂、三张表）为 Markdown"},"存 .md"),l("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:Os,title:"生成 PNG 摘要卡（一页读懂 + 首张表），适合直接分享"},"存长图"),u.kind!=="guanyin"?l("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:Gs,title:"把这张盘的参数存进卦例库，日后可回填重排、标应验"},Fs?"已存入卦例库":"存入卦例库"):null):null,u&&u.kind!=="guanyin"&&!Ht?l("p",{key:"nudge",className:"mp-nudge"},"这张盘只在你自己这台设备上算，不上传、不联网。过些天回头想看看它准不准，先「存入卦例库」，之后在卦例库里标应验就行——愿意记就记，不记也能照常用。",l("button",{type:"button",className:"mp-nudge-x",onClick:()=>{try{window.localStorage.setItem("dsh-metaphysics/nudge-off","1")}catch{}ft(!0)},title:"以后不再出现这行"},"不再提示")):null,u?l("div",{key:"ask",className:"mp-askbox",style:{flexWrap:"wrap"}},l("input",{className:"mp-input",value:We,maxLength:120,placeholder:"追问：如 2027 年事业怎么样（回车提交）",onChange:t=>Pt(t.target.value),onKeyDown:t=>{t.key==="Enter"&&gi()}}),l("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px"},onClick:gi},"追问"),l("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:fi,title:"把这张盘的摘要和你的问题一起发进 DSH 对话窗，由对话里的模型接着答"},"问进对话"),de.ref?null:l("div",{key:"bridgediag",className:"mp-note",style:{marginTop:6,fontSize:11,flexBasis:"100%"}},"本机对话窗没接上：点「问进对话」会把提问复制到剪贴板，自己粘进对话窗就行。"+(Ii()?"（"+Jn()+"）":"")),It?l("div",{key:"chatnote",className:"mp-note",style:{marginTop:6,fontSize:12,flexBasis:"100%"}},It):null):null,u?l("div",{key:"bridge",className:"mp-bridge"},l("span",{className:"mp-bridge-lbl"},de.ref?"桥可用；也可以：":"桥未就绪，改走这几档："),ci.map(([t,b,k])=>l("button",{key:t,type:"button",className:"mp-chip","data-bridge-copy":t,title:k,onClick:M=>Ms(t,M.currentTarget)},b))):null,Dt?l("div",{key:"fx",className:"mp-fx",dangerouslySetInnerHTML:{__html:_.followupHTML(Dt)}}):null,u&&u.kind==="bazi"&&u.r.past?l("div",{key:"verify",className:"mp-verify"},l("div",{className:"mp-verify-h"},"先核对过去几年：这盘说的事，对得上吗"),u.r.past.rows.map(t=>l("div",{key:t.year,className:"mp-verify-row"},l("span",{className:"mp-verify-txt"},`${t.year} ${t.ganzhi} · ${t.theme}`),l("span",{className:"mp-verify-btns"},["yes","no","unsure"].map(b=>l("button",{key:b,className:"mp-chip"+(bt[t.year]===b?" on":""),onClick:()=>ht(Object.assign({},bt,{[t.year]:b}))},b==="yes"?"准":b==="no"?"不准":"不确定"))))),l("div",{className:"mp-verify-foot"},l("button",{className:"mp-btn ghost",style:hi,onClick:Ps},"算贴合度"),Ea?l("span",{className:"mp-verify-fit"},`命中 ${Ea.yes}/${Ea.answered}（${Ea.level}）：${Ea.advice}`):null)):null,u&&u.kind==="bazi"?l("div",{key:"rect",className:"mp-rect"},l("div",{className:"mp-verify-h"},"不确定几点出生？填几件过去的事，反推时辰"),_a.map((t,b)=>l("div",{key:b,className:"mp-rect-row"},l("input",{className:"mp-input",type:"number",min:1900,max:2100,value:t.year,onChange:k=>Ft(_a.map((M,v)=>v===b?Object.assign({},M,{year:k.target.value}):M))}),l("select",{className:"mp-input",value:t.kind,onChange:k=>Ft(_a.map((M,v)=>v===b?Object.assign({},M,{kind:k.target.value}):M))},[["career","事业变动"],["wealth","财运"],["love","感情"],["move","搬迁/出行"],["health","健康"],["other","其他"]].map(([k,M])=>l("option",{key:k,value:k},M))))),l("button",{className:"mp-btn ghost",style:hi,onClick:Is},"计算候选时辰"),Ha?Ha.error?l("div",{className:"mp-rect-err"},Ha.error):l("div",{className:"mp-rect-out"},l("div",{className:"mp-verify-fit"},Ha.note),Ha.candidates.slice(0,6).map(t=>l("div",{key:t.hour,className:"mp-rect-cand"+(t===Ha.best?" best":"")},`${t.label} · 时柱 ${t.hourGanzhi} · 日柱 ${t.dayGanzhi} · 命中 ${t.hits}/${t.total}`))):null):null,!u&&!S?l("div",{key:"ph",className:"mp-dim",style:{marginTop:24,fontSize:12}},"选择体系后点「排盘」。所有计算在本机完成，不上传任何数据。"):null,l("div",{key:"fb",className:"mp-fb"},l("div",{className:"mp-fb-h"},l("span",{className:"mp-fb-t"},"用得不对、读不懂、或算得跟别家不一样？"),l("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"4px 10px"},onClick:bi,title:"生成一份含输入、版本、环境与结果摘要的报告，粘贴到 issue / 邮件 / 群聊即可"},L||"复制反馈报告"),l("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"4px 10px",marginLeft:6},onClick:()=>_s(),title:"在浏览器打开 GitHub issue（报告已复制到剪贴板，粘进去即可）"},"开 issue")),l("div",{className:"mp-fb-b"},"有疑问？",l("a",{href:"mailto:1129440028@qq.com?subject="+encodeURIComponent("[反馈] 烛微命盘"),style:{color:"inherit"},title:"点开直接写邮件，不用复制任何东西"},"1129440028@qq.com"),"　·　GitHub issues　·　",l("a",{href:"https://pd.qq.com/s/Nb18ikqqfl",target:"_blank",rel:"noopener noreferrer",style:{color:"inherit"},title:"腾讯频道「烛微命盘」：排盘求助、命例交流、功能与bug、术语与依据"},"交流频道"),"　·　微信群 dsh-metaphysics",re?l("span",{className:"mp-fb-note"},"　"+re):null)),Rs?l("div",{key:"cases",className:"mp-cases-layer",role:"dialog","aria-modal":"true","aria-label":"卦例库",onClick:t=>{t.target===t.currentTarget&&kn()}},l("div",{className:"mp-cases-box"},l("div",{className:"mp-cases-h"},l("b",null,`卦例库 · ${zn.length}/${Ke.length}`),l("button",{className:"mp-cases-x",onClick:kn,"aria-label":"关闭"},"✕")),l("div",{className:"mp-cases-tabs"},[["all","全部"]].concat(_.CASE_STATUS.map(t=>[t,_.caseStatusLabel(t)])).map(t=>l("button",{key:t[0],className:"mp-chip"+($n===t[0]?" on":""),onClick:()=>yi(t[0])},`${t[1]} ${Us(t[0])}`))),l("div",{className:"mp-cases-list"},zn.length?zn.map(t=>Ys(t)):l("div",{className:"mp-empty"},"这一栏还空着。看结果时点「存入卦例库」，想要的盘才会记进来；过些天回来标应验。")),l("div",{className:"mp-cases-f"},l("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"4px 10px"},onClick:()=>$i(!1)},"导出 JSONL"),l("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"4px 10px",marginLeft:6},onClick:()=>$i(!0),title:"去掉出生年份（只留月日）、时刻整点化、去掉出生地——发给群里也不露个人信息"},"导出脱敏版"),l("span",{className:"mp-cases-tip"},"只存参数与一句摘要，不存盘面；点条目回填重排。")))):null];return l("div",{className:"mp-wrap"},Qs)}function ds(s){try{if(typeof styles<"u"&&styles&&typeof styles.insert=="function")return styles.insert(s)}catch(o){console.error("[metaphysics] styles.insert 不可用，改用 DOM 注入",o)}try{const o=document.createElement("style");return o.setAttribute("data-plugin","@local/metaphysics"),o.textContent=s,document.head.appendChild(o),()=>o.remove()}catch(o){return console.error("[metaphysics] DOM 注入样式也失败",o),()=>{}}}let ni=!1;function bn(){try{const s=document.documentElement;if(!s||!document.body)return;const o=document.createElement("span");o.setAttribute("aria-hidden","true"),o.style.cssText="position:absolute;left:-9999px;top:0;width:0;height:0;pointer-events:none;background:var(--dsw-alias-brand-primary)",document.body.appendChild(o);const A=getComputedStyle(o).backgroundColor;o.remove();const U=Ye&&typeof Ye.pickOnColor=="function"?Ye.pickOnColor(A):"";U&&s.style&&s.style.getPropertyValue("--mp-on-brand")!==U&&s.style.setProperty("--mp-on-brand",U)}catch{}}function cs(){if(!ni){ni=!0,bn();try{const s=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)");s&&typeof s.addEventListener=="function"&&s.addEventListener("change",bn)}catch{}try{typeof MutationObserver=="function"&&document.documentElement&&new MutationObserver(bn).observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]})}catch{}}}function ms(s){try{const G=ds(Bi+(_&&_.CSS?_.CSS:""));typeof s.effect=="function"&&typeof G=="function"&&s.effect(()=>G)}catch(G){console.error("[metaphysics] 样式注入失败",G)}try{cs()}catch(G){console.error("[metaphysics] 字色同步失败",G)}let o=null;try{o=s&&s.slots||(s&&typeof s.get=="function"?s.get("slots"):null)}catch(G){console.error("[metaphysics] 取 slots 服务失败",G)}if(!o||typeof o.register!="function"){console.error("[metaphysics] slots 服务不可用，面板未注册");return}try{de.injectType=typeof o.inject;const G=typeof o.spec=="function"?o.spec("conversation.input.right"):null;de.spec=G?G.kind+"/"+G.scope:"未声明"}catch(G){de.spec="取声明失败",Xn(G)}const A=G=>{if(typeof G=="function")return G;if(G&&typeof G=="object"){for(const ve of["dispose","off","cancel","unregister"])if(typeof G[ve]=="function")return()=>{try{G[ve]()}catch{}}}return()=>{}},U=(G,ve)=>{try{const X=o.register(G,ve);return de.regs+=1,de.seatOk[G.name]=!0,A(X)}catch(X){return Xn(X),()=>{}}},ue=(G,ve)=>{const X=()=>{const C=ve();return de.contribution=(de.contribution?de.contribution+",":"")+(G+(typeof C=="function"?" 已挂上":" 未挂上")),C};try{typeof o.inject=="function"?o.inject(G,X):X()}catch(C){console.error("[metaphysics] 等待槽位失败："+G,C);try{X()}catch(B){console.error("[metaphysics] 直接注册也失败："+G,B)}}};ue("sidebar.panellist",()=>U({name:"sidebar.panellist",id:"metaphysics",order:20,label:()=>"烛微命盘 v"+(window.__MP_VER||"")},Vi)),ue("main",()=>U({name:"main",key:"metaphysics"},G=>l(Ki,null,l(ls,G))));const oe=(G,ve)=>{const X=()=>{try{const B=o.inject(G,ve);return de.contribution=(de.contribution?de.contribution+",":"")+(G.replace("conversation.","")+(typeof B=="function"?" 已挂上":" 未挂上")),B}catch(B){console.error("[metaphysics] 槽位注册失败："+G,B);try{return ve()}catch(Q){console.error("[metaphysics] 直接注册也失败："+G,Q);return}}};let C;try{typeof s.effect=="function"?C=s.effect(X,"metaphysics: "+G):C=X()}catch(B){console.error("[metaphysics] effect 包裹失败："+G,B),C=X()}typeof C=="function"&&de.seatDisposers.push(C)};oe("conversation.input.right",()=>U({name:"conversation.input.right",id:"metaphysics-ask",order:40},ei)),oe("conversation.composer.dock",()=>U({name:"conversation.composer.dock",id:"metaphysics-dock",order:60},ai));let se=!1;const ae=()=>{de.ref||se||(se=!0,de.seatOk["conversation.input.right"]||U({name:"conversation.input.right",id:"metaphysics-ask",order:40},ei),de.seatOk["conversation.composer.dock"]||U({name:"conversation.composer.dock",id:"metaphysics-dock",order:60},ai))};let xe=20;const ze=()=>!!(de.seatOk["conversation.input.right"]&&de.seatOk["conversation.composer.dock"]),Ce=()=>{de.ref||xe<=0||ze()||(xe-=1,ae(),!ze()&&setTimeout(Ce,700))};try{setTimeout(Ce,700)}catch{}try{document.addEventListener("pointerdown",()=>{se=!1,ae()},{once:!0,capture:!0})}catch{}}return{inject:["slots"],apply(s){try{ms(s)}catch(o){console.error("[metaphysics] apply 异常",o)}}}}});
