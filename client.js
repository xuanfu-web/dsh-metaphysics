window.__ModuleLoader__.load({id:"dsh-metaphysics",version:"0.83.0",factory(wt){const dt=(function(){try{return wt("react")}catch{return globalThis.React}})();if(!dt)return{inject:[],apply(){}};const p=dt.createElement,Ni={bazi:"client.chart.js",ziwei:"client.chart.js",hepan:"client.chart.js",trend:"client.chart.js",name:"client.name.js",fengshui:"client.fengshui.js",liuyao:"client.liuyao.js",meihua:"client.liuyao.js",qimen:"client.qimen.js",daliuren:"client.daliuren.js",tarot:"client.tarot.js",almanac:"client.almanac.js",convert:"client.convert.js",zeri:"client.zeri.js",chenggu:"client.chenggu.js",xiaoliuren:"client.xiaoliuren.js",star:"client.star.js",numerology:"client.numerology.js",mbti:"client.mbti.js",constitution:"client.constitution.js",wuyunliuqi:"client.wuyunliuqi.js",taiyi:"client.taiyi.js"},qi=[{key:"general",label:"综合",dim:null,focus:""},{key:"wealth",label:"财运",dim:"work",focus:"钱财进出的落点主要看「工作与职业选择」与「事业发展」这两条。"},{key:"career",label:"事业",dim:"career",focus:"事业发展这条与你的问题最直接。"},{key:"love",label:"感情",dim:"love",focus:"感情这条与你的问题最直接。"},{key:"health",label:"健康",dim:"health",focus:"健康这条与你的问题最直接；下面只作提醒，不作任何诊断。"},{key:"study",label:"学业",dim:"career",focus:"学业与考试更贴近「事业发展」这条，讲的是长期积累与阶段进展。"},{key:"travel",label:"出行",dim:"overall",focus:"出行与迁动更贴近「整体运势」这条，看的是当下这一段的大环境。"}];window.__MP_VER="0.83.0",window.__MPGroups=[{title:"问一件事",hint:"心里有一件具体的事，起一卦再决定",items:[{k:"liuyao",label:"六爻",tip:"问一件具体事，最接地气"},{k:"tarot",label:"塔罗",tip:"抽牌看选择"},{k:"meihua",label:"梅花",tip:"见闻起卦"},{k:"xiaoliuren",label:"小六壬",tip:"掐指一算"}]},{title:"看一个人",hint:"看自己或身边人的性情与格局",items:[{k:"bazi",label:"八字",tip:"看这人一辈子的大盘"},{k:"ziwei",label:"紫微",tip:"分宫细看哪方面顺哪方面堵"},{k:"hepan",label:"合盘",tip:"两人合不合"},{k:"mbti",label:"人格",tip:"16 型问卷"},{k:"constitution",label:"体质",tip:"九种体质"},{k:"trend",label:"人生K",tip:"一生走势",wide:!0}]},{title:"查日子",hint:"挑时间、换农历，看一年的气与方位",items:[{k:"almanac",label:"黄历",tip:"今日宜忌"},{k:"zeri",label:"择日",tip:"挑好日子"},{k:"convert",label:"农历",tip:"公历农历"},{k:"wuyunliuqi",label:"运气",tip:"一年大势"},{k:"fengshui",label:"风水",tip:"房屋朝向"},{k:"name",label:"起名",tip:"八字选字"}]},{title:"古籍考据",hint:"古法三式与整年气运：偏研究向，日常咨询少用",items:[{k:"qimen",label:"奇门",tip:"看方位时机"},{k:"daliuren",label:"六壬",tip:"占事断来意"},{k:"taiyi",label:"太乙",tip:"积年推局"}]}],window.__MP_UNRELEASED=0;const Y={};Y.DIRECTIONS=qi,Y.compute=()=>{throw new Error("命理引擎尚未加载")};const Mi=Object.create(null),ai=Object.create(null);function jn(o){return Ni[o]||Ni.bazi||"client.chart.js"}const Ci=()=>typeof performance<"u"&&performance.now?performance.now():Date.now();async function Sn(o){const s=jn(o);let j=Mi[s];const I=!!j,se=Ci();if(!j){if(!wt||typeof wt.async!="function")throw new Error("当前宿主不支持客户端分块加载（require.async 缺失），请升级 DeepSeek Harness");let le=ai[s];le||(le=wt.async(`./${s}`).then(ge=>{const ue=ge&&(ge.Engine||ge.default);if(!ue||typeof ue.compute!="function")throw new Error(`命理引擎分块 ${s} 未返回 Engine`);return Mi[s]=ue,ue}),ai[s]=le,le.catch(()=>{}).then(()=>{delete ai[s]})),j=await le}for(const le of Object.keys(j))j[le]!==void 0&&(Y[le]=j[le]);return Array.isArray(Y.DIRECTIONS)||(Y.DIRECTIONS=qi),window.Engine=Y,window.__MP_ENGINE_READY__=!0,window.__MP_LAST_LOAD={tab:o,chunk:s,cached:I,ms:Math.round((Ci()-se)*10)/10},Y}window.__mpEnsureEngine=Sn,window.Engine=Y,(function(){const o={liuyao:!0,meihua:!0,daliuren:!0,tarot:!0},s=H=>!!o[H],j={general:"other",wealth:"business",career:"career",love:"love",health:"other",study:"career",travel:"action"},I=H=>j[H]||"other",se="#ffffff",le="#1c1a15";function ge(H){const B=String(H??"").match(/rgba?\(([^)]+)\)/i);if(!B)return null;const J=B[1].split(/[,\s/]+/).filter(Boolean).map(Number);return J.length<3||J.slice(0,3).some(ie=>!Number.isFinite(ie))||J.length>3&&Number.isFinite(J[3])&&J[3]<.95?null:[J[0],J[1],J[2]]}function ue(H){const B=String(H||"").replace("#",""),J=B.length===3?B.split("").map(ie=>ie+ie).join(""):B;return/^[0-9a-f]{6}$/i.test(J)?[0,2,4].map(ie=>parseInt(J.slice(ie,ie+2),16)):null}function ye(H){const B=J=>{const ie=J/255;return ie<=.03928?ie/12.92:Math.pow((ie+.055)/1.055,2.4)};return .2126*B(H[0])+.7152*B(H[1])+.0722*B(H[2])}function je(H,B){const J=ye(H),ie=ye(B),we=Math.max(J,ie),t=Math.min(J,ie);return(we+.05)/(t+.05)}function Me(H){const B=typeof H=="string"?ge(H):H;return B?je(B,ue(se))>=je(B,ue(le))?se:le:""}function G(H){const B=String(H??"").trim();if(!B)return{lines:null,warning:""};const J=B.split(/[^0-9]+/).filter(Boolean).map(Number),ie=J.filter(we=>![6,7,8,9].includes(we));return J.length===6&&ie.length===0?{lines:J,warning:""}:{lines:null,warning:J.length!==6?`爻值需要正好 6 个数字（当前 ${J.length} 个），本次按随机摇卦。`:`爻值只能是 6/7/8/9（收到 ${ie.join("/")}），本次按随机摇卦。`}}function xe(H){const B=String(H??"").trim();if(!B)return null;const J=Number(B);return Number.isFinite(J)?J:null}function V(H){const B=H instanceof Date?H:new Date,J=ie=>String(ie).padStart(2,"0");return`${B.getFullYear()}-${J(B.getMonth()+1)}-${J(B.getDate())}`}window.__MPCore={NEED_ASK:o,needAsk:s,parseLines:G,toNumber:xe,parseRGB:ge,hexToRGB:ue,luminance:ye,contrastRatio:je,pickOnColor:Me,ON_DARK:se,ON_LIGHT:le,kindOfDirection:I,todayStamp:V}})(),(function(){const o=`
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
`,s=window.__PP=window.__PP||{};s.CSS=o;const j=e=>String(e).padStart(2,"0");function I(e){const i=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e||""));if(!i)return!1;const n=Number(i[1]),l=Number(i[2]),r=Number(i[3]);if(l<1||l>12||r<1)return!1;const c=[31,n%4===0&&n%100!==0||n%400===0?29:28,31,30,31,30,31,31,30,31,30,31];return r<=c[l-1]}function se(e){const i=/^(\d{4})\s*[年./-]\s*(\d{1,2})\s*[月./-]\s*(\d{1,2})\s*日?$/.exec(String(e||"").trim());if(!i)return"";const n=`${i[1]}-${j(i[2])}-${j(i[3])}`;return I(n)?n:""}function le(e){const i=String(e||"").trim();if(/^\d{0,4}(-\d{0,2}){0,2}$/.test(i))return i;if(/[年月日/.]/.test(i)){const l=se(i);if(l)return l}const n=i.replace(/\D/g,"").slice(0,8);return n.length<=4?n:n.length<=6?`${n.slice(0,4)}-${n.slice(4)}`:`${n.slice(0,4)}-${n.slice(4,6)}-${n.slice(6)}`}function ge(e){try{return JSON.parse(window.localStorage.getItem(e)||"null")}catch{return null}}function ue(e,i){try{window.localStorage.setItem(e,JSON.stringify(i))}catch{}}function ye(e){let i=2166136261;for(let n=0;n<e.length;n+=1)i^=e.charCodeAt(n),i=Math.imul(i,16777619)>>>0;return(i>>>0).toString(36)}function je(e){const i=new Date(e);if(Number.isNaN(i.getTime()))return"";const n=r=>new Date(r.getFullYear(),r.getMonth(),r.getDate()).getTime(),l=Math.round((n(new Date)-n(i))/864e5);return l<=0?"今天":l===1?"昨天":`${j(i.getMonth()+1)}-${j(i.getDate())}`}function Me(){const e=new Date;return{date:`${e.getFullYear()}-${j(e.getMonth()+1)}-${j(e.getDate())}`,time:`${j(e.getHours())}:${j(e.getMinutes())}`}}s.isoDateOk=I,s.normalizeDateText=se,s.maskDateText=le,s.storeGet=ge,s.storeSet=ue,s.hash36=ye,s.dayLabel=je,s.nowParts=Me;const G=".mp-askfree,.mp-askbox,.mp-askblock,.mp-askonly";s.ASK_FREE=G,s.lockParams=function(e,i){if(!e||!e.querySelectorAll)return 0;let n=0;return e.querySelectorAll("input, select, textarea").forEach(l=>{if(l.closest(G)){l.disabled=!1,l.readOnly=!1;return}l.tagName==="SELECT"||l.type==="checkbox"||l.type==="radio"||l.type==="button"?l.disabled=!!i:l.readOnly=!!i,n++}),n};const xe={主星:"main",吉星:"good",煞星:"bad",辅星:"aux",杂曜:"minor"},V={禄:"lu",权:"quan",科:"ke",忌:"ji"},H=new Set(["三台","八座","恩光","天贵"]),B={庙:"good",旺:"good",得:"mid",利:"mid",平:"mid",不:"bad",陷:"bad"},J={巳:[1,1],午:[1,2],未:[1,3],申:[1,4],辰:[2,1],酉:[2,4],卯:[3,1],戌:[3,4],寅:[4,1],丑:[4,2],子:[4,3],亥:[4,4]},ie={乾:[1,1,1],兑:[1,1,0],离:[1,0,1],震:[1,0,0],巽:[0,1,1],坎:[0,1,0],艮:[0,0,1],坤:[0,0,0]},we=["初爻","二爻","三爻","四爻","五爻","上爻"],t=e=>String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),Se=(e,i,n)=>{const b=Math.round(43),d=e?`<rect x="0" y="${2.5}" width="104" height="7" rx="${1.6}" fill="currentColor"/>`:`<rect x="0" y="${2.5}" width="${b}" height="7" rx="${1.6}" fill="currentColor"/><rect x="${b+18}" y="${2.5}" width="${104-b-18}" height="7" rx="${1.6}" fill="currentColor"/>`;return`<svg class="mp-hex${i?" hex-on":""}${n?" "+n:""}" viewBox="0 0 104 12" preserveAspectRatio="none" aria-hidden="true" focusable="false">${d}</svg>`},mt={木:"M6 1.6V10.8M6 5.2 2.6 2.2M6 7.4 9.4 4.4",火:"M6 1.4C7.6 3.6 9.2 5.4 9.2 7.6A3.2 3.2 0 0 1 2.8 7.6C2.8 5.4 4.4 3.6 6 1.4Z",土:"M1.6 9.6h8.8M6 2.4v7.2M3.4 5.6h5.2",金:"M6 1.2 10.6 6 6 10.8 1.4 6Z",水:"M1.4 7.2C2.9 4.2 4.5 10.2 6 7.2 7.5 4.2 9.1 10.2 10.6 7.2"},Ke=e=>{const i=mt[e];return i?`<svg class="mp-wxi" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="${i}" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`:""},ut=e=>`<svg class="mp-trig" viewBox="0 0 14 10" aria-hidden="true" focusable="false">${(ie[e]||[0,0,0]).slice().reverse().map((l,r)=>{const m=r*4;return l?`<rect x="0" y="${m}" width="14" height="2" rx="0.6" fill="currentColor"/>`:`<rect x="0" y="${m}" width="5.6" height="2" rx="0.6" fill="currentColor"/><rect x="8.4" y="${m}" width="5.6" height="2" rx="0.6" fill="currentColor"/>`}).join("")}</svg>`;s._hexBar=Se,s._wxIcon=Ke,s._triGlyph=ut;function Ka(e,i,n){return!e||!e.length?"":e.map(l=>{const r=xe[l.type]||"aux",m=l.mutagen?`<i class="pp-m ${V[l.mutagen]}">${l.mutagen}</i>`:"",c=i&&i[l.name],g=c?`<i class="pp-m view ${V[c]}">${c}</i>`:"",u=l.brightness?`<em class="pp-b ${B[l.brightness]||"mid"}">${l.brightness}</em>`:"",b=l.inTemple?'<em class="pp-b good">庙</em>':"",d=n&&n[l.name]?Ya(n[l.name],l.name):"",y=H.has(l.name)?" st-sbg":"";return`<span class="pp-st ${r}${y}">${d}${l.name}${u}${b}${m}${g}</span>`}).join("")}function Mt(e){const i=[];for(let n=0;n<6;n++)i.push(e+n*12);return i.join(",")}const Ve=["命宫","兄弟","夫妻","子女","财帛","疾厄","迁移","交友","官禄","田宅","福德","父母"],Ee=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],Ne=e=>(e%12+12)%12,Ct=(e,i)=>e!==i&&[Ne(i+4),Ne(i+8),Ne(i+6)].includes(e);function Ca(e,i,n,l,r,m,c,g){const u=J[e.branch]||[1,1],b=Ee.indexOf(e.branch),d=["pp-cell"];b===i?d.push("pp-soul"):Ct(b,i)&&d.push("pp-tri"),e.isBody&&d.push("pp-shen"),g&&e.branch===g&&d.push("pp-laiyin"),u[0]===4&&d.push("pp-lastrow"),u[1]===4&&d.push("pp-lastcol");const y=e.shensha||{},$=Ve[Ne(i-b)];let M="";if(b===i&&l){const A=_=>(xe[_.type]||"")==="main";if(!(e.stars||[]).some(A)){const _=l.find(F=>Ee.indexOf(F.branch)===Ne(b+6)),ne=_?(_.stars||[]).filter(A):[];ne.length&&(M=`<div class="pp-borrow" title="命宫无主星，借对宫（迁移宫）主星">借 ${ne.map(F=>F.name).join(" ")}</div>`)}}return`<div class="${d.join(" ")}" data-pi="${b}" data-view="${n}" role="button" tabindex="0" aria-expanded="false" style="grid-row:${u[0]};grid-column:${u[1]}">
      <div class="pp-stars">${Ka(e.stars,r,Ja(e))}</div>
      ${M}
      <div class="pp-ages">${Mt(e.xiaoxian.age)}</div>
      ${Lt(e,m)}
      ${sa(e,c)}
      <div class="pp-foot">
        <div class="ft-l">
          <span class="ft-dx"><span class="pp-ss-txt">${y.boshi}</span> ${e.daxian.start}-${e.daxian.end}</span>
          <span class="pp-ss-txt">${y.jiangqian}</span>
          <span class="pp-ss-txt">${y.suiqi}</span>
        </div>
        <div class="ft-r">
          <span class="pp-ss-txt">${y.changsheng}</span>
          <span>${e.ganzhi}</span>
          <span class="ft-pn">${$}</span>
        </div>
      </div>
    </div>`}function Ya(e,i){return`<span class="pp-zha ${V[e]}" title="自化${t(e)}：${t(i)}·宫干化回本宫"><svg class="z-a" viewBox="0 0 22 9" role="img" aria-label="自化${t(e)}">
        <path class="z-shaft" d="M1 7C6.6 7 11.4 5.6 17.2 3.2"/>
        <path class="z-head" d="M20.2 2 17.8 4.9 16.6 1.9Z"/>
      </svg></span>`}s._zhaMark=Ya;function Ja(e){const i={};for(const n of e.selfHua||[])!n||!n.star||!V[n.type]||i[n.star]||(i[n.star]=n.type);return i}function Lt(e,i){const n=i&&i[e.branch]||[];if(!n.length)return"";const l=n.map(r=>`<i class="${V[r.type]||""}" title="${t(r.star)}化${t(r.type)}">${t(r.type)}<em>→${t(r.palace||"未上盘")}</em></i>`).join("");return`<div class="pp-fx">${t(e.ganzhi)}宫干 ${l}</div>`}function sa(e,i){const n=i&&i[e.branch]||null;return n?`<div class="pp-hs">${Object.entries(n).map(([r,m])=>`<i>${t(r)}<em>${t(m)}</em></i>`).join("")}</div>`:""}function ha(e){try{const i=window.Engine||window.__PP&&window.__PP.Engine;if(!i||!i.buildBazi||!e.input)return"";const n=i.buildBazi({year:e.input.year,month:e.input.month,day:e.input.day,hour:e.input.hour,minute:e.input.minute,gender:e.input.gender,trueSolar:!1});return["year","month","day","hour"].map(l=>n.pillars[l].ganzhi).join(" ")}catch{return""}}function pi(e){try{const i=window.Engine||window.__PP&&window.__PP.Engine;return!i||!i.buildBazi||!e.input?null:i.buildBazi({year:e.input.year,month:e.input.month,day:e.input.day,hour:e.input.hour,minute:e.input.minute,gender:e.input.gender,trueSolar:!1}).pillars.day.stem}catch{return null}}s.ziweiHTML=function(e){const i=Ee.indexOf(e.soul.branch),n=e.liunian&&e.liunian[0]||null,l=n?n.age:1,r=e.palaces.find(w=>l>=w.daxian.start&&l<=w.daxian.end)||e.palaces[0],m=Ee.indexOf(r.branch),c=n?Ee.indexOf(n.lifePalace.branch):i,g=w=>{const z={};for(const N of w||[])N&&N.star&&(z[N.star]=N.type);return z},u=(e.daxianList||[]).find(w=>w.branch===r.branch)||null,b={da:g(u&&u.mutagenHits),ln:g(n&&n.mutagenHits)},d={};for(const w of e.daxianList||[])d[w.branch]=w.mutagenHits||[];const y=(()=>{const w=pi(e);if(!w)return null;const z=(e.daxianList||[]).find(v=>v.stem===w);if(!z)return null;const N={};for(const v of e.palaces)for(const W of v.stars||[])W.name in N||(N[W.name]=v.branch);return{stem:w,items:(z.mutagenHits||[]).map(v=>({type:v.type,star:v.star,branch:N[v.star]||null,palace:N[v.star]?(e.palaces.find(W=>W.branch===N[v.star])||{}).palace:null}))}})();let $=null;if(n){$={};for(const[w,z]of Object.entries(n))/^(流|年解)/.test(w)&&typeof z=="string"&&Ee.includes(z)&&($[z]=$[z]||{},$[z][w]=z)}const M={da:u&&u.yunStars?(()=>{const w={};for(const[z,N]of Object.entries(u.yunStars))(w[N]=w[N]||{})[z]=N;if(u.yunSuiqi)for(const[z,N]of Object.entries(u.yunSuiqi))(w[N]=w[N]||{})[z]=N;if(u.yunJiangqian)for(const[z,N]of Object.entries(u.yunJiangqian))(w[N]=w[N]||{})[z]=N;return w})():null,ln:$};if(e.liunian&&e.liunian.length){const w=e.liunian.find(z=>z.ganzhi===(e._lnSel||e.liunian[0].ganzhi))||e.liunian[0];if(w.lnSuiqi)for(const[z,N]of Object.entries(w.lnSuiqi))($[N]=$[N]||{})[z]=N;if(w.lnJiangqian)for(const[z,N]of Object.entries(w.lnJiangqian))($[N]=$[N]||{})[z]=N}const A=(w,z)=>e.palaces.map(N=>Ca(N,w,z,e.palaces,b[z]||null,d,M[z]||null,e.laiyin&&e.laiyin.branch)).join(""),_=(w,z)=>`<div class="pp-center">
        ${z==="da"?`<div class="ct-t1">大限 ${r.ganzhi}　${r.daxian.start}-${r.daxian.end}岁</div>`:z==="ln"&&n?`<div class="ct-t1">流年 ${n.ganzhi}　${n.age}岁</div>`:`<div class="ct-t1">${e.daxian.rule.slice(0,2)}　${e.bureau.name}</div>`}
        <div class="ct-t2">公历 ${e.input.year}-${String(e.input.month).padStart(2,"0")}-${String(e.input.day).padStart(2,"0")} ${String(e.input.hour).padStart(2,"0")}:${String(e.input.minute).padStart(2,"0")}</div>
        <div class="ct-t2">农历 ${e.lunar.year}年${e.lunar.isLeap?`闰${e.lunar.monthRaw||e.lunar.month}`:e.lunar.month}月${e.lunar.day}日${e.hourBranch}时${e.lunar.isLeap&&e.lunar.monthRaw&&e.lunar.month!==e.lunar.monthRaw?`（按${e.lunar.month}月起盘）`:""}</div>
        ${ha(e)?`<div class="ct-t3">${ha(e)}</div>`:""}
        ${e.nonJieqi?`<div class="ct-t3 ct-t3nj" title="${t(e.nonJieqi.note)}">${e.nonJieqi.year} ${e.nonJieqi.month} ${e.nonJieqi.day} ${e.nonJieqi.hour}<em class="nj-tag">非节气</em></div>`:""}
        <div class="ct-t4">命主 ${e.lifeMaster}${e.lifeMasterNote?`<span class="pp-dim" title="${t(e.lifeMasterNote)}">＊</span>`:""}　身主 ${e.bodyMaster}${e.bodyMasterNote?`<span class="pp-dim" title="${t(e.bodyMasterNote)}">＊</span>`:""}</div>
        <div class="ct-t4">命宫 ${e.soul.branch}　身宫 ${e.body.branch}　五行局 ${e.bureau.name}</div>
        <div class="ct-t4">子年斗君 ${e.doujun?e.doujun.zinian:"—"}　流年斗君 ${n&&n.doujun?n.doujun:"—"}</div>
        <div class="ct-t4">紫微 ${e.ziwei}　天府 ${e.tianfu}　${z==="da"?"大限命宫 "+Ee[m]:z==="ln"?"流年命宫 "+Ee[c]:"本命命宫 "+e.soul.branch}</div>
        ${z==="da"||z==="ln"?`<div class="ct-t4 pp-viewhua">${z==="da"?"大限":"流年"}四化　${(z==="da"?b.da:b.ln)&&Object.keys(z==="da"?b.da:b.ln).length?Object.entries(z==="da"?b.da:b.ln).map(([v,W])=>`${v}化${W}`).join("　"):'<span class="pp-dim">未飞四化</span>'}</div>`:""}
        <div class="pp-legend"><span class="pp-m lu">禄</span><span class="pp-m quan">权</span><span class="pp-m ke">科</span><span class="pp-m ji">忌</span><span>实心=生年四化　空心=大限/流年四化　箭头=自化　红框=命宫　浅底=三方四正</span></div>
      </div>`,ne=w=>{const z=w==="da"?`大限 ${r.ganzhi}`:w==="ln"&&n?`流年 ${n.ganzhi}`:"本命",N=(ha(e)||"").split(" ")[0]||"";return`<div class="pp-cal"><b class="cal-sc"></b><span class="cal-sep">·</span><span>${z}</span>${N?`<span class="cal-sep">·</span><span>${e.input.year} ${N}</span>`:""}</div>`},F=(w,z,N)=>`<div class="pp-body ${w}" data-view="${N}" data-soul="${z}">${ne(N)}<div class="pp-grid">${A(z,N)}${_(z,N)}</div><div class="pp-detail"></div></div>`,D=e.changqu,ee=D?`<div class="pp-chips">
      <span class="pp-chip">昌 ${D.wenchang.branch}（${D.wenchang.palace}）</span>
      <span class="pp-chip">曲 ${D.wenqu.branch}（${D.wenqu.palace}）</span>
      <span class="pp-chip">${D.relation}</span>
      <span class="pp-chip">入命三方 ${D.inSoulSanfang?"是":"否"}</span>
      <span class="pp-chip ${D.absorb.label==="杂"?"warn":"ok"}">吸收·${D.absorb.label}</span>
    </div>`:"",R=(e.patterns||[]).length?`<div class="pp-chips">${e.patterns.map(w=>{const z=w.status==="broken"&&Array.isArray(w.breaks)&&w.breaks.length,N=`${w.evidence||""}${z?`；破格：${w.breaks.join("；")}`:""}`;return`<span class="pp-chip ${z?"broken":w.tone==="good"?"ok":w.tone==="bad"?"warn":""}" title="${t(N)}">${w.name}${z?"（破格）":""}</span>`}).join("")}</div>`:"",T=(e.daxianList||[]).length?`<div class="pp-chips">${e.daxianList.slice(0,8).map(w=>`<span class="pp-chip" title="${t(`${w.ganzhi} 宫干四化：`+w.mutagenHits.map(z=>`${z.star}化${z.type}→${z.palace||"未上盘"}`).join("、"))}">${w.branch} ${w.ages[0]}-${w.ages[1]}</span>`).join("")}</div>`:"",oe=n&&n.mutagenHits&&n.mutagenHits.length?`<div class="pp-chips">${n.mutagenHits.map(w=>`<span class="pp-chip ${w.type==="忌"?"warn":w.type==="禄"?"ok":""}">${w.star}化${w.type}→${w.palace||"未上盘"}</span>`).join("")}</div>`:"",Q=e.zuoyao,qe=Q?Q.placed&&Q.placed.length?`<div class="pp-sec"><div class="pp-sec-h">杂曜全表 · 已排 ${Q.placed.length} 颗（${Q.starTotal} 颗盘）</div>
        <div class="pp-chips">${Q.placed.map(w=>`<span class="pp-chip${w.inTemple?" ok":""}" title="${t(w.meaning||"")}">${t(w.name)} ${t(w.branch)}（${t(w.palace)}）${w.inTemple?"·庙":""}</span>`).join("")}</div>
        <details class="pp-zy"><summary>逐颗安星诀（${Q.placed.length} 条 · 出多处近代通行辑本并核，属通行说，不是《全书》原文）</summary><div class="pp-zy-v">${t(Q.verses).replace(/\n/g,"<br>")}</div></div></details>
        ${Q.skipped&&Q.skipped.length?`<div class="pp-zy-s">${Q.skipped.map(w=>t(w)).join("")}</div>`:""}</div>`:`<div class="pp-sec"><div class="pp-sec-h">杂曜 · 本盘 ${Q.starTotal} 颗（通行简盘）</div>
        <div class="pp-zy-s">开「杂曜全表」追加十二颗：解神·天巫·天月·阴煞（生月）／天官·天福·天厨（生年干）／蜚廉·天德·年解（生年支）／天才（命宫＋生年支）·天寿（身宫＋生年支）。${Q.skipped&&Q.skipped.length?`不另立：${Q.skipped.map(w=>t(w)).join("")}`:""}</div></div>`:"",X=e.flyChains?(()=>{const w=["禄","权","科","忌"].map(z=>{const N=e.flyChains[z];if(!N||!N.steps.length)return"";const v=N.path.map(fe=>String(fe).replace(/宫$/,"")).join("→"),W=N.steps.map(fe=>`${fe.from}（${fe.fromStem}）化${z}${fe.star}→${fe.to}`).join("；");return`<span class="pp-chip ${z==="忌"?"warn":z==="禄"?"ok":""}" title="${t(W)}">飞${z} ${t(v)}${N.closed?"↺":""}</span>`}).join("");return w?`<div class="pp-chips">${w}</div>`:""})():"",$e=e.flyComposite&&Array.isArray(e.flyComposite.labels)&&e.flyComposite.labels.length?`<div class="pp-chips">${e.flyComposite.labels.map(w=>{const z=/忌/.test(w)?"warn":/自化/.test(w)?"":"ok",N=de=>String(de).replace(/^.*?会/,"").replace(/^禄忌同宫/,"").replace(/自化$/,""),v=(e.flyComposite.targets||[]).find(de=>de.palace===N(w)),W=v?v.incoming.map(de=>`${de.from}化${de.type}${de.star}`).join("、"):e.flyComposite.note;return`<span class="pp-chip ${z}" title="${t(W)}">三方四正 ${t(w)}</span>`}).join("")}</div>`:"",te=e.flow,re=te?(()=>{const w=W=>(W.mutagenHits||[]).length?W.mutagenHits.map(de=>`<i>${de.star}化${de.type}<em>→${de.palace||"未上盘"}</em></i>`).join(""):'<i class="dim">宫干无四化</i>',z=(W,de,fe,C)=>`<div class="flow-row" data-t="${W}"><b>${de}</b><span class="flow-p"><span class="flow-k">${fe.ganzhi||"—"}　落${fe.palace||"未上盘"}（${fe.branch}）</span>${C?`<em class="flow-same">${C}</em>`:""}</span><span class="flow-m">${w(fe)}</span></div>`,v=te.day.branch===te.month.branch?"（日数走满一圈，故同宫）":"";return`<div class="pp-flow">
        <div class="flow-row"><b>基准</b><span class="flow-p">${te.asOf.solar}</span><span class="flow-m">农历 ${te.asOf.lunar}　流年 ${te.asOf.yearGanzhi}（斗君 ${te.year.doujun}）</span></div>
        ${z("month",`流月 ${te.month.index} 月`,te.month)}
        ${z("day",`流日 ${te.day.index} 日`,te.day,v)}
        ${z("hour",`流时 ${Ee[te.hour.hourIndex]}时`,te.hour)}
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
      <!-- 时间层（P1-18）：流月/流日/流时默认不出，勾哪个出哪个。
           必须在 .pp-time 与 .pp-flow 之前——兄弟选择器只向后找 -->
      ${te?'<input type="checkbox" id="ppm-t-month" class="pp-r"><input type="checkbox" id="ppm-t-day" class="pp-r"><input type="checkbox" id="ppm-t-hour" class="pp-r">':""}
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
      ${te?`<div class="pp-modes pp-time">
        <label for="ppm-t-month">＋流月</label><label for="ppm-t-day">＋流日</label><label for="ppm-t-hour">＋流时</label>
        <span class="pp-soon">要落到这个月这几天，再往下一层</span>
      </div>`:""}
      <div class="pp-modes pp-schools">
        <label for="ppm-sc-sihe">四化</label><label for="ppm-sc-feixing">飞星</label><label for="ppm-sc-sanhe">三合</label>
      </div>
      ${F("ben",i,"ben")}
      ${F("da",m,"da")}
      ${F("ln",c,"ln")}
      ${(()=>{if(!y)return"";const w={禄:"rl",权:"rq",科:"rk",忌:"rj"},z=y.items.map(N=>`<i><em class="${w[N.type]||""}">${N.type}</em>${t(N.star)}<em>${t(N.branch||"?")}${N.palace?`·${t(N.palace)}`:""}</em></i>`).join("");return`<div class="pp-rigan"><b>日干${t(y.stem)}四化</b>${z}</div>`})()}      ${(()=>{if(!y)return"";const w={禄:"rl",权:"rq",科:"rk",忌:"rj"},z=y.items.map(N=>`<i><em class="${w[N.type]||""}">${N.type}</em>${t(N.star)}<em>${t(N.branch||"?")}${N.palace?`·${t(N.palace)}`:""}</em></i>`).join("");return`<div class="pp-rigan"><b>日干${t(y.stem)}四化</b>${z}</div>`})()}
      <div class="pp-zhlegend">自化图示　<span class="z-lu">${s._zhaMark("禄","本宫")}禄</span><span class="z-quan">${s._zhaMark("权","本宫")}权</span><span class="z-ke">${s._zhaMark("科","本宫")}科</span><span class="z-ji">${s._zhaMark("忌","本宫")}忌</span></div>
      <div class="pp-flywrap">${X}${$e}</div>
      ${re}
    </div>${ee}${R}${T}${oe}${qe}`};function Va(e){return e.length?e.map(i=>{const n=xe[i.type]||"aux",l=i.brightness?`<em class="dt-br ${B[i.brightness]||"mid"}">${i.brightness}</em>`:"",r=i.inTemple?'<em class="dt-br good">庙</em>':"",m=i.mutagen?`<i class="pp-m ${V[i.mutagen]}">${i.mutagen}</i>`:"";return`<span class="dt-st ${n}">${i.name}${l}${r}${m}</span>`}).join(""):'<span class="dt-empty">无</span>'}function xa(e,i){const n=s._zw;if(!n)return"";const l=T=>n.palaces.find(oe=>Ee.indexOf(oe.branch)===T),r=l(e)||n.palaces.find(T=>Ee.indexOf(T.branch)===e);if(!r)return"";const m=Ee.indexOf(r.branch),c=Ve[Ne(i-m)],g=r.shensha||{},u=r.stars.filter(T=>T.type==="主星"),b=r.stars.filter(T=>T.type==="吉星"||T.type==="辅星"),d=r.stars.filter(T=>T.type==="煞星"),y=r.stars.filter(T=>!["主星","吉星","辅星","煞星"].includes(T.type)),$=(r.selfHua||[]).length?r.selfHua.map(T=>`<span class="dt-self">${Ya(T.type,T.star||"本宫")}${t(T.star||"")}</span>`).join(""):'<span class="dt-empty">无</span>',M=[Ne(m+4),Ne(m+8),Ne(m+6)].map(T=>{const oe=l(T),Q=Ve[Ne(i-T)],qe=oe?oe.stars.filter($e=>$e.type==="主星").map($e=>$e.name).join("、"):"",X=T===Ne(m+6)?"对宫":"三合";return`<span class="dt-st">${Q}[${Ee[T]}]<b>${qe||"无主星"}</b><em>${X}</em></span>`}).join(""),A=l(Ne(m+6)),_=A?A.stars.filter(T=>T.type==="主星"):[],ne=u.length?Va(u):`<span class="dt-empty">无主星</span><span class="dt-tri">　借对宫 <b>${_.length?_.map(T=>T.name).join("、"):"亦无主星"}</b></span>`,F=(T,oe)=>`<div class="dt-dr"><span class="dt-k">${T}</span><div class="dt-v">${oe}</div></div>`,D=Ve.length,ee=Ne(i-m),R=Ve.map((T,oe)=>{const Q=Ne(m+(oe-ee+D)%D);return`<span class="dt-st">${Ve[oe]}[${Ee[Q]}]</span>`}).join("");return`<div class="dt-dh">
        <b>${c}</b><span>${r.branch}宫 · ${r.ganzhi}</span>
        <span>大限 ${r.daxian.start}-${r.daxian.end}</span>
        <span>小限起 ${r.xiaoxian.age} 岁</span>
        ${r.isBody?"<span>· 身宫</span>":""}
        <span class="dt-x" data-pp-close="1">收起</span>
      </div>
      ${F("主星",ne)}
      ${F("吉辅",Va(b))}
      ${d.length?F("煞星",Va(d)):""}
      ${y.length?F("杂曜",Va(y)):""}
      ${F("宫干四化",$)}
      ${F("十二神",`<span class="dt-tri">长生 ${g.changsheng||"—"}　博士 ${g.boshi||"—"}　将前 ${g.jiangqian||"—"}　岁前 ${g.suiqi||"—"}</span>`)}
      ${F("三方四正",`<span class="dt-tri">${M}</span>`)}
      ${F("太极转换",`<span class="dt-tri dt-taiji">以${c}[${r.branch}]立太极${R}</span>`)}
      <div class="hint">三方四正在盘上已同步标出（浅红描边）。再点一次本宫可收起。</div>`}function va(e){e.querySelectorAll(".pp-cell.pp-sel,.pp-cell.pp-link").forEach(i=>{i.classList.remove("pp-sel"),i.classList.remove("pp-link")}),e.querySelectorAll('.pp-cell[aria-expanded="true"]').forEach(i=>i.setAttribute("aria-expanded","false"))}const At={};function Tt(e,i){La(e);const n=e.querySelector(".pp-grid");if(!n)return;const l=[i,(i+6)%12,(i+4)%12,(i+8)%12],r=u=>{const b=e.querySelector('.pp-cell[data-pi="'+u+'"]');if(!b)return null;const d=Number(b.style.gridRow),y=Number(b.style.gridColumn),$=Math.min(75,Math.max(25,(d-.5)*25));return y===1?[25,$]:[75,$]},m=l.map(r);if(m.some(u=>!u))return;const c=document.createElementNS("http://www.w3.org/2000/svg","svg");c.setAttribute("class","pp-sf"),c.setAttribute("viewBox","0 0 100 100"),c.setAttribute("preserveAspectRatio","none");const g=(u,b,d,y)=>{const $=document.createElementNS("http://www.w3.org/2000/svg","line");$.setAttribute("x1",u),$.setAttribute("y1",b),$.setAttribute("x2",d),$.setAttribute("y2",y),c.appendChild($)};g(m[0][0],m[0][1],m[1][0],m[1][1]),g(m[1][0],m[1][1],m[2][0],m[2][1]),g(m[2][0],m[2][1],m[3][0],m[3][1]),g(m[3][0],m[3][1],m[0][0],m[0][1]);for(let u=0;u<4;u++){const b=document.createElementNS("http://www.w3.org/2000/svg","circle");b.setAttribute("cx",m[u][0]),b.setAttribute("cy",m[u][1]),b.setAttribute("r",u===0?.9:.7),u===0&&b.setAttribute("style","fill:var(--red);opacity:.85"),c.appendChild(b)}n.style.position="relative",n.appendChild(c)}function La(e){const i=e.querySelector("svg.pp-sf");i&&i.remove()}const Xa=["ppm-d-ss","ppm-d-sbg","ppm-d-zha","ppm-d-ages","ppm-d-sizhu","ppm-d-rigan","ppm-d-njq","ppm-d-tjz","ppm-d-small","ppm-d-shen","ppm-d-hua","ppm-d-sf","ppm-d-laiyin","ppm-d-zha-bold","ppm-d-bad-ink","ppm-d-bold","ppm-d-hs"],oa={simple:["ppm-d-hua","ppm-d-shen"],std:["ppm-d-ss","ppm-d-sbg","ppm-d-zha","ppm-d-ages","ppm-d-sizhu","ppm-d-small","ppm-d-shen","ppm-d-hua","ppm-d-sf","ppm-d-laiyin"],expert:Xa.slice()};function _t(e,i){const n=oa[e];if(!n||typeof document>"u")return!1;const l=i&&i.querySelector?i:document;return Xa.forEach(r=>{const m=l.querySelector("#"+r);m&&(m.checked=n.indexOf(r)>=0)}),l.querySelectorAll("[data-pp-preset]").forEach(r=>{r.classList.toggle("on",r.getAttribute("data-pp-preset")===e)}),!0}s.DISP_PRESETS=oa,s.DISP_ALL=Xa,s.applyDispPreset=_t;function Aa(){if(Aa.done||typeof document>"u"||!document.addEventListener)return;Aa.done=!0;const e=i=>{const n=i.closest(".pp-body");if(!n)return;const l=n.querySelector(".pp-detail");if(!l)return;if(i.classList.contains("pp-sel")){va(n),La(n),l.classList.remove("open"),l.innerHTML="";return}va(n);const r=Number(i.dataset.pi),m=Number(n.dataset.soul);Tt(n,r),n.querySelectorAll(".pp-cell").forEach(g=>{const u=Number(g.dataset.pi);(u===Ne(r+4)||u===Ne(r+8)||u===Ne(r+6))&&g.classList.add("pp-link")}),i.classList.add("pp-sel"),i.setAttribute("aria-expanded","true"),l.innerHTML=xa(r,m),l.classList.add("open")};document.addEventListener("click",i=>{const n=i.target,l=n&&n.closest?n.closest("[data-pp-preset]"):null;if(l){_t(l.getAttribute("data-pp-preset"),l.closest(".pp"));return}if(n&&n.closest&&n.closest("[data-pp-close]")){const m=n.closest(".pp-body");if(m){va(m),La(m);const c=m.querySelector(".pp-detail");c&&(c.classList.remove("open"),c.innerHTML="");return}}const r=n&&n.closest?n.closest(".pp-cell[data-pi]"):null;r&&e(r)}),document.addEventListener("keydown",i=>{if(i.key!=="Enter"&&i.key!==" ")return;const n=i.target&&i.target.closest?i.target.closest(".pp-cell[data-pi]"):null;n&&(i.preventDefault(),e(n))}),document.addEventListener("change",i=>{const n=i.target;if(!n||!n.id||Xa.indexOf(n.id)<0)return;const l=n.closest?n.closest(".pp"):null;l&&l.querySelectorAll("[data-pp-preset]").forEach(r=>r.classList.remove("on"))})}s.bindZiwei=Aa,s._palaceDetailHTML=xa,Aa();function Ye(e,i){const n=i||{},l=e.slice().sort((r,m)=>m.position-r.position);return n.plain?l.map(r=>`<div class="mp-hy-row hy-plain">
        <span class="mp-hy-nm">${r.name||we[r.position-1]}</span>
        ${Se(r.yinYang==="阳",r.moving)}
      </div>`).join(""):l.map(r=>{const m=r.yinYang==="阳",c=n.shiYing?r.position===n.shi?'<span class="mp-hy-sy">世</span>':r.position===n.ying?'<span class="mp-hy-sy">应</span>':"<span></span>":"<span></span>",g=r.moving?`<i class="mp-hy-mv" title="动爻">${m?"○":"×"}</i>`:'<i class="mp-hy-mv"></i>';return`<div class="mp-hy-row">
        ${c}
        <span class="mp-hy-nm">${r.name||we[r.position-1]}</span>
        <span class="mp-hy-ln">${Se(m,r.moving)}${g}</span>
        <span class="mp-hy-gz">${t(r.ganzhi||"")}</span>
        <span class="mp-hy-lq">${t(r.liuqin||"")}</span>
        <span class="mp-hy-ls">${t(r.liushen||"")}</span>
      </div>`}).join("")}s.liuyaoHTML=function(e){const i=(D,ee,R,T)=>`<div class="mp-hy-box">
      <div class="mp-hy-h"><b>${D}</b><span>${ee}</span></div>
      <div class="mp-hy">${Ye(T,{shiYing:!0,shi:R.shi,ying:R.ying})}</div>
    </div>`,n=i(`本卦 ${e.ben.name}`,`${e.ben.palace} · ${e.ben.palaceElement}`,e.ben,e.ben.lines),l=e.bian?i(`变卦 ${e.bian.name}`,`${e.bian.palace} · ${e.bian.palaceElement}`,e.bian,e.bian.lines):`<div class="mp-hy-box"><div class="mp-hy-h"><b>六爻安静</b><span>无动爻，不取变卦</span></div>
          <div class="pp-dim" style="font-size:12px;line-height:1.9">断卦以本卦卦辞与世应生克为主。</div></div>`,r=e.body&&Array.isArray(e.body.labels)?e.body.labels:[],m=r.length?`<div class="pp-chips">${r.map(D=>`<span class="pp-chip ${/伏吟/.test(D)||/反吟/.test(D)||/化退神/.test(D)?"warn":/六冲|散/.test(D)?"":"ok"}">${t(D)}</span>`).join("")}</div>`:'<div class="pp-chips"><span class="pp-chip">卦体无六冲、六合、伏吟、反吟</span></div>',c=e.useGod&&e.useGod.liuqin?e.useGod:null,g=c?`<div class="pp-chips">${c.labels.map(D=>`<span class="pp-chip ${/空亡|退神|受克|泄气|不上卦/.test(D)?"warn":/持世|化进|六合|得飞神生/.test(D)?"ok":""}">${t(D)}</span>`).join("")}</div>`:'<div class="pp-chips"><span class="pp-chip">用神未取（未指明所问之事）</span></div>',u=e.useGodStrength&&Array.isArray(e.useGodStrength.labels)?e.useGodStrength:null,b=u&&u.labels.length?`<div class="pp-chips">${u.labels.map(D=>`<span class="pp-chip ${/死|囚|月破|受日辰克|泄|耗/.test(D)?"warn":/旺|相|得日辰生|比和/.test(D)?"ok":""}">${t(D)}</span>`).join("")}</div>`:"",d=e.fushenAccess&&Array.isArray(e.fushenAccess.labels)?e.fushenAccess:null,y=d&&d.labels.length?`<div class="pp-chips">${d.labels.map(D=>`<span class="pp-chip ${/可出/.test(D)?"ok":/受压难出|有助有压/.test(D)?"warn":""}">伏神${t(D)}</span>`).join("")}</div>`:"",$=e.yingqi&&Array.isArray(e.yingqi.labels)?e.yingqi:null,M=$&&$.labels.length?`<div class="pp-chips">${$.labels.map(D=>`<span class="pp-chip ${/应期偏速/.test(D)?"ok":/应期待解/.test(D)?"warn":""}" title="只列地支，不出日期">${t(D)}</span>`).join("")}</div>`:"",A=e.jinTuiPower&&Array.isArray(e.jinTuiPower.labels)?e.jinTuiPower:null,_=A&&A.labels.length?`<div class="pp-chips">${A.labels.map(D=>`<span class="pp-chip ${/后劲足|退得缓/.test(D)?"ok":/有限|进得虚|退得实|月破|未定/.test(D)?"warn":""}">${t(D)}</span>`).join("")}</div>`:"",ne=e.hexStrength&&Array.isArray(e.hexStrength.labels)?e.hexStrength:null,F=ne&&ne.labels.length?`<div class="pp-chips">${ne.labels.map(D=>`<span class="pp-chip ${/死|囚|月破|冲空/.test(D)?"warn":/旺|相/.test(D)?"ok":""}">${t(D)}</span>`).join("")}</div>`:"";return s.briefHTML(e)+`<div class="pp" style="padding:14px">
      <div class="mp-mh-head">起卦 ${e.cast.notation.join("、")}（自下而上）　日辰 ${e.dayGanZhi.name}</div>
      <div class="mp-hy-wrap">${n}${l}</div>
      ${m}
      ${g}
      ${b}
      ${y}
      ${M}
      ${_}
      ${F}
    </div>`},s.meihuaHTML=function(e){const i=(M,A,_,ne,F)=>{const ee=[...ie[ne]||[0,0,0],...ie[_]||[0,0,0]].slice().reverse().map(R=>Se(!!R,!1,"sm")).join("");return`<div class="mp-hexbox hb-mini">
        <div class="hb-h">${M}</div>
        <div class="hb-n">${A}</div>
        <div class="mp-mh-mini">${ee}</div>
        <div class="hb-s">${F||`上${_} 下${ne}`}</div>
      </div>`},n=e.lines.slice().sort((M,A)=>A.position-M.position),l=n.slice(0,3),r=n.slice(3),m=e.moving>=4,c=(M,A,_,ne)=>`<div class="mp-trib">
      <div class="mp-trib-h">${M} ${ut(A)}${A}${li(A)}<span class="mp-tritag ${ne?"tritag-ti":"tritag-yong"}">${ne?"体":"用"}</span></div>
      <div class="mp-hy" style="gap:5px">${Ye(_,{plain:!0})}</div>
    </div>`,g=`<div class="mp-hexbox">
      <div class="hb-h"><span>本卦</span><span>动 ${e.movingName}</span></div>
      <div class="hb-n">${e.ben.name}</div>
      ${c("上卦",e.ben.upper,l,!m)}
      ${c("下卦",e.ben.lower,r,m)}
      <div class="hb-s">${e.source}</div>
    </div>`,u=e.bodyUse.level,b=u.includes("凶")?"bad":u.includes("吉")?"good":"flat",d=`<div class="mp-mh-rel">
      <div><b>体</b>${e.bodyUse.body.trigram}（${e.bodyUse.body.element}）　<b>用</b>${e.bodyUse.use.trigram}（${e.bodyUse.use.element}）</div>
      <div><span class="mh-lv ${b}">${u}</span>　${e.bodyUse.relation}</div>
    </div>`,y=Wa(e.cuo.name)||["",""],$=Wa(e.zong.name)||["",""];return s.briefHTML(e)+`<div class="pp mp-mh">
      <div class="mp-mh-main">
        ${g}
        ${i("互卦",e.hu.name,e.hu.upper,e.hu.lower,"中藏之象")}
        ${i("变卦",e.bian.name,e.bian.upper,e.bian.lower,`动 ${e.movingName} 后`)}
        ${i("错卦",e.cuo.name,y[0],y[1],"六爻全变")}
        ${i("综卦",e.zong.name,$[0],$[1],"整卦倒转")}
      </div>
      ${d}
    </div>`};const Et={乾为天:["乾","乾"],天风姤:["乾","巽"],天山遁:["乾","艮"],天地否:["乾","坤"],风地观:["巽","坤"],山地剥:["艮","坤"],火地晋:["离","坤"],火天大有:["离","乾"],坎为水:["坎","坎"],水泽节:["坎","兑"],水雷屯:["坎","震"],水火既济:["坎","离"],泽火革:["兑","离"],雷火丰:["震","离"],地火明夷:["坤","离"],地水师:["坤","坎"],艮为山:["艮","艮"],山火贲:["艮","离"],山天大畜:["艮","乾"],山泽损:["艮","兑"],火泽睽:["离","兑"],天泽履:["乾","兑"],风泽中孚:["巽","兑"],风山渐:["巽","艮"],震为雷:["震","震"],雷地豫:["震","坤"],雷水解:["震","坎"],雷风恒:["震","巽"],地风升:["坤","巽"],水风井:["坎","巽"],泽风大过:["兑","巽"],泽雷随:["兑","震"],巽为风:["巽","巽"],风天小畜:["巽","乾"],风火家人:["巽","离"],风雷益:["巽","震"],天雷无妄:["乾","震"],火雷噬嗑:["离","震"],山雷颐:["艮","震"],山风蛊:["艮","巽"],离为火:["离","离"],火山旅:["离","艮"],火风鼎:["离","巽"],火水未济:["离","坎"],山水蒙:["艮","坎"],风水涣:["巽","坎"],天水讼:["乾","坎"],天火同人:["乾","离"],坤为地:["坤","坤"],地雷复:["坤","震"],地泽临:["坤","兑"],地天泰:["坤","乾"],雷天大壮:["震","乾"],泽天夬:["兑","乾"],水天需:["坎","乾"],水地比:["坎","坤"],兑为泽:["兑","兑"],泽水困:["兑","坎"],泽地萃:["兑","坤"],泽山咸:["兑","艮"],水山蹇:["坎","艮"],地山谦:["坤","艮"],雷山小过:["震","艮"],雷泽归妹:["震","兑"]},Ta={乾:"金",兑:"金",离:"火",震:"木",巽:"木",坎:"水",艮:"土",坤:"土"},li=e=>Ta[e]?` ${Ta[e]}`:"",Wa=e=>Et[e]||null;s.daliurenHTML=function(e){const i=e.sanChuan,n=(g,u)=>`<div class="mp-dl-sc-c">
      <div class="mp-dl-sc-k">${u}</div>
      <div class="mp-dl-sc-z">${g.zhi}</div>
      <div class="mp-dl-sc-j">${g.jiangFull||g.jiang}</div>
      <div class="mp-dl-sc-l">${g.liuQin}${g.xunKong?" · 空":""}</div>
    </div>`,l=`<div class="mp-dl-sc-c ge">
      <div class="mp-dl-sc-k">格局</div>
      <div class="mp-dl-sc-gn">${e.geJu.name}</div>
      <div class="mp-dl-sc-l">${e.geJu.detail}</div>
    </div>`,r=e.siKe.slice().map(g=>`<div class="mp-dl-sk-c">
      <div class="mp-dl-sk-k">${["一课","二课","三课","四课"][g.position-1]||g.position+"课"}</div>
      <div class="mp-dl-sk-s">${g.shang}</div>
      <div class="mp-dl-sk-x">${g.xia}</div>
      <div class="mp-dl-sk-r">${g.relation} · ${g.jiangFull||g.jiang}</div>
    </div>`).join(""),m=e.pan.map(g=>{const u=J[g.di]||[1,1];return`<div class="mp-dl-pc" style="grid-row:${u[0]};grid-column:${u[1]}">
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
      <div class="mp-dl-sc">${n(i.chu,"初传")}${n(i.zhong,"中传")}${n(i.mo,"末传")}${l}</div>
      <div class="mp-dl-sk">${r}</div>
      <div class="mp-dl-pan2">${m}${c}</div>
      ${(e.shensha||[]).length?`<div class="mp-dl-ss"><b>神煞</b>${e.shensha.map(g=>`<span title="${t(g.note||"")}">${g.name}<i>${g.branch}</i></span>`).join("")}</div>`:""}
      <div class="mp-dl-legend"><span>大字＝天盘支</span><span>小字＝地盘（固定十二支）</span><span>右下＝天将</span></div>
    </div>`},s.tarotHTML=function(e){const i=e.cards.map(r=>`
      <div class="mp-tt-card ${r.upright?"tt-up":"tt-rev"}">
        <div class="mp-tt-pos" title="${t(r.positionHint||"")}">${r.position}</div>
        <div class="mp-tt-name">${r.name}${r.number?`<span class="mp-tt-no">${r.number}</span>`:""}</div>
        ${r.en?`<div class="mp-tt-en">${r.en}</div>`:""}
        <div class="mp-tt-ori">${r.orientation}</div>
        ${r.image?`<div class="mp-tt-img">牌面：${r.image}</div>`:""}
        ${r.core?`<div class="mp-tt-core">${r.core}</div>`:""}
        <div class="mp-tt-kw">${r.keywords.map(m=>`<span>${m}</span>`).join("")}</div>
        <div class="mp-tt-el">${r.arcana} · ${r.element}${r.suit?" · "+r.suit+(r.rankCn?r.rankCn:""):""}${r.domain?" · "+r.domain:""}${r.astro?` · ${r.astro}`:r.role?` · ${r.role}`:""}</div>
      </div>`).join(""),n=e.question?t(e.question):'<span class="pp-dim">（未填写，可在上方输入后重抽）</span>',l=(e.reading||[]).map(r=>`<p>${t(r)}</p>`).join("");return s.briefHTML(e)+`<div class="pp mp-tt">
      <div class="mp-tt-q"><b>所问</b>${n}</div>
      <div class="mp-tt-head">${e.spread}${e.castAt?`　·　抽牌于 ${e.castAt}`:""}</div>
      <div class="mp-tt-grid">${i}</div>
      <div class="mp-tt-read"><div class="mp-tt-rt">牌面解读</div>${l}</div>
      <div class="mp-tt-note"><div class="mp-tt-rt">你的记录</div>
        <textarea class="mp-tt-ta" rows="4" placeholder="写下判断或对照后的想法……（仅本页可见，不保存）"></textarea>
      </div>
      ${e.systemNote?`<div class="mp-tt-tip">${e.systemNote}</div>`:""}
      <div class="mp-tt-tip">塔罗用于自我觉察与娱乐，不作确定性预言。</div>
    </div>`};const Qa=e=>{if(!e||!Array.isArray(e.pairs)||!e.pairs.length)return"";const n='<tr><th scope="col">一对</th><th scope="col">契合度</th>'+(e.pairs[0].dimensions||[]).map(c=>`<th scope="col">${t(c.label)}</th>`).join("")+"</tr>",l=e.pairs.map(c=>`<tr><th scope="row">${t(c.a)} × ${t(c.b)}</th><td>${c.total==null?"—":`${t(c.total)}/100`}<span class="mp-hp-lv">${t(c.level||"")}</span></td>`+(c.dimensions||[]).map(g=>`<td>${g.score>=0?"+":""}${t(g.score)}</td>`).join("")+"</tr>").join(""),r=e.spread>=3&&e.best?`最顺：<b>${t(e.best.a)} × ${t(e.best.b)}</b>（${t(e.best.total)}/100）`+(e.hardest?`；最需磨合：<b>${t(e.hardest.a)} × ${t(e.hardest.b)}</b>（${t(e.hardest.total)}/100）`:""):`三对分数接近（相差 ${t(e.spread)} 分），不排名`,m=e.focus&&e.focus.spread>=3?`<p>差异最大的一维：<b>${t(e.focus.label)}</b>（三对相差 ${t(e.focus.spread)} 分）</p>`:"";return`<div class="mp-hp-triple">
      <div class="mp-hp-ith">三方合盘 · 三对并列</div>
      <table><thead>${n}</thead><tbody>${l}</tbody></table>
      <p>${r}</p>${m}
      <p>${t(e.note||"")}</p>
    </div>`};s.hepanHTML=function(e){const i=(l,r)=>`<div class="mp-hp-side">
      <div class="mp-hp-who">${r}</div>
      <div class="mp-hp-gz">${l.pillars.join(" ")}</div>
      <div class="mp-hp-kv"><span>日主</span><b>${l.dayMaster}</b></div>
      <div class="mp-hp-kv"><span>日支</span><b>${l.dayBranch}</b></div>
      <div class="mp-hp-kv"><span>强弱</span><b>${l.strength||"—"}</b></div>
      <div class="mp-hp-kv"><span>喜用</span><b>${l.favor||"—"}</b></div>
    </div>`,n=e.dimensions.map(l=>`<div class="mp-hp-dim">
      <div class="mp-hp-dimh"><span>${l.label}</span><b class="${l.score>=10?"good":l.score<0?"bad":""}">${l.score>=0?"+":""}${l.score}</b></div>
      <div class="mp-hp-dimt">${l.text}</div>
    </div>`).join("");return s.briefHTML(e)+`<div class="pp mp-hp">
      <div class="mp-hp-head"><b>${e.score.level}</b><span>${e.score.total}/100</span></div>
      <div class="mp-hp-sides">${i(e.a,"你")}${i(e.b,"对方")}</div>
      <div class="mp-hp-dims">${n}</div>
      ${Qa(e.triple)}
      <div class="mp-hp-notes">${e.notes.map(l=>`<p>${l}</p>`).join("")}</div>
    </div>`},s.qimenFactsHTML=function(e){if(!e||!e.palaces)return"";const i=(r,m)=>`<div class="relation__row"><dt>${t(r)}</dt><dd>${t(m)}</dd></div>`,n=r=>r&&["旺","相","休","囚","死"].filter(c=>Array.isArray(r[c])&&r[c].length).map(c=>`${c} ${r[c].join("、")}`).join("；")||"—";return`<dl class="relation mp-qm-facts" aria-label="奇门盘面事实">${[["局数",`${e.ju}${e.yuan?`（${e.yuan}）`:""}`],["节气",`${e.jieqi||"—"}${e.jieqiTime?`（${e.jieqiTime}）`:""}`],["四柱",`${e.siZhu?`${e.siZhu.year} ${e.siZhu.month} ${e.siZhu.day} ${e.siZhu.time}`:"—"}`],["值符",e.zhiFu?`${e.zhiFu.star} · ${e.zhiFu.gong}宫`:"—"],["值使",e.zhiShi?`${e.zhiShi.gate} · ${e.zhiShi.gong}宫`:"—"],["旬首",e.xunshou||"—"],["空亡",(e.kongWang||[]).join("")||"—"],["驿马",e.ma&&e.ma.zhi?`${e.ma.zhi}${e.ma.gong?`（${e.ma.gong}宫）`:""}`:"—"],["换局规则",e.juMethodNote||e.juMethod||"—"],["晚子时",e.lateZiHourMode==="next-day"?"23:00 后归次日":"23:00 后仍归当日"],["击刑",e.conditions&&e.conditions.jiXing&&e.conditions.jiXing.length?e.conditions.jiXing.map(r=>`${r.palace}宫${r.stem}`).join("、"):"本盘无"],["三奇入墓",e.conditions&&e.conditions.ruMu&&e.conditions.ruMu.length?e.conditions.ruMu.map(r=>`${r.palace}宫${r.stem}`).join("、"):"本盘无"],["六仪入墓",e.conditions&&e.conditions.liuYiRuMu&&e.conditions.liuYiRuMu.length?e.conditions.liuYiRuMu.map(r=>`${r.palace}宫${r.stem}`).join("、"):"本盘无"],["十干克应",[...e.palaces||[],e.centerPalace].filter(m=>m&&m.ganYing).map(m=>`${m.palace}宫 ${m.ganYing.tian}加${m.ganYing.di}「${m.ganYing.name}」`).join("；")||"—"],["月令",e.month&&e.month.branch?`${e.month.branch}（${e.month.element}）`:"—"],["门旺衰",n(e.states&&e.states.gate)],["星旺衰",n(e.states&&e.states.star)],["干旺衰",n(e.states&&e.states.stem)],["干宫生克",(()=>{const r=["干克宫","宫克干","干生宫","宫生干","比和"],m={};for(const c of e.palaces||[]){const g=c.stemRelation||null;!g||g.type==="unknown"||!c.tianPan||(m[g.type]=m[g.type]||[]).push(c.tianPan)}return r.filter(c=>m[c]).map(c=>c+" "+m[c].join("、")).join("；")||"—"})()]].map(([r,m])=>i(r,m)).join("")}</dl>`};const _a=[["4","9","2"],["3","5","7"],["8","1","6"]];s.qimenHTML=function(e){const i={};for(const l of e.palaces)i[l.palace]=l;const n=l=>{if(l==="5")return`<div class="pp-qm-cell center">
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
      </div>`};return s.briefHTML(e)+`<div class="pp mp-qm">
      <div class="mp-qm-head">
        <b>${e.ju}</b>
        <span>${e.siZhu.year} ${e.siZhu.month} ${e.siZhu.day} ${e.siZhu.time}</span>
        <span>节气 ${e.jieqi}（${e.jieqiTime}）</span>
        <span>值符 ${e.zhiFu.star}（${e.zhiFu.gong}宫）　值使 ${e.zhiShi.gate}（${e.zhiShi.gong}宫）</span>
        <span>旬首 ${e.xunshou}　空亡 ${e.kongWang.join("")||"—"}　驿马 ${e.ma.zhi||"—"}</span>
      </div>
      <div class="mp-qm-grid">${_a.map(l=>l.map(n).join("")).join("")}</div>
      <div class="mp-qm-legend">上＝九星　中＝天盘干／八门　下＝地盘干／宫号　角落＝八神</div>
      <div class="mp-qm-rules">${e.rules.map(l=>`<p>${l}</p>`).join("")}</div>
    </div>`},s.ziweiHepanHTML=function(e){const i=(r,m)=>`<div class="mp-hp-side">
      <div class="mp-hp-who">${m}</div>
      <div class="mp-hp-gz">命宫 ${r.soul.branch}　夫妻 ${r.soul.branch,""}${r.spouseStars.length,""}</div>
      <div class="mp-hp-kv"><span>命宫主星</span><b>${r.soulStars.join("、")||"无正曜"}</b></div>
      <div class="mp-hp-kv"><span>夫妻宫主星</span><b>${r.spouseStars.join("、")||"无正曜"}</b></div>
      <div class="mp-hp-kv"><span>五行局</span><b>${r.bureau}</b></div>
      <div class="mp-hp-kv"><span>身宫</span><b>${r.body.branch}（${r.body.lands||"—"}）</b></div>
      <div class="mp-hp-kv"><span>生年四化</span><b>${r.natalSihua.join("、")}</b></div>
    </div>`,n=e.dimensions.map(r=>`<div class="mp-hp-dim">
      <div class="mp-hp-dimh"><span>${r.label}</span><b class="${r.score>=10?"good":r.score<0?"bad":""}">${r.score>=0?"+":""}${r.score}</b></div>
      <div class="mp-hp-dimt">${r.text}</div>
    </div>`).join(""),l=r=>(e.interactions||[]).filter(m=>m.who===r).map(m=>`<li><b class="m-${m.mutagen}">${m.mutagen}</b>${m.star}：本命${m.ownPalace} → 对方${m.landingPalace||"盘外"}${m.strong?"<i>（强）</i>":""}</li>`).join("");return s.briefHTML(e)+`<div class="pp mp-hp">
      <div class="mp-hp-head"><b>${e.score.level}</b><span>${e.score.total}/100　紫微合盘</span></div>
      <div class="mp-hp-sides">${i(e.a,"你")}${i(e.b,"对方")}</div>
      <div class="mp-hp-dims">${n}</div>
      <div class="mp-hp-inter">
        <div><div class="mp-hp-ith">你的四化 落在对方</div><ul>${l("你")||"<li>无</li>"}</ul></div>
        <div><div class="mp-hp-ith">对方的四化 落在你</div><ul>${l("对方")||"<li>无</li>"}</ul></div>
      </div>
      ${Qa(e.triple)}
      <div class="mp-hp-notes">${e.notes.map(r=>`<p>${r}</p>`).join("")}</div>
    </div>`},s.curveHTML=function(e){const i=e&&e.dayun&&Array.isArray(e.dayun.list)?e.dayun.list:[],n=e&&Array.isArray(e.liunian)?e.liunian:[];if(i.length<2)return"";const l=P=>typeof P=="number"&&isFinite(P)?P:0,r=P=>P.luck?l(P.luck.score):0,m=4.2,c=-2.2,g=l(e.dayun.startAge&&e.dayun.startAge.years),u=i.length?i[i.length-1].startAge+10:g+80,b=n.map(P=>l(P.age)).filter(P=>P>0),d=Math.min(g,...b.length?b:[g]),y=Math.max(u,...b.length?b:[u]),$=Math.max(1,y-d),M=640,A=190,_={t:14,r:16,b:26,l:30},ne=M-_.l-_.r,F=A-_.t-_.b,D=P=>_.l+(P-d)/$*ne,ee=P=>_.t+F-(Math.max(c,Math.min(m,P))-c)/(m-c)*F,T=[{from:1.2,to:m,cls:"b-good"},{from:.55,to:1.2,cls:"b-good"},{from:-.8,to:.55,cls:"b-flat"},{from:-1.45,to:-.8,cls:"b-bad"},{from:c,to:-1.45,cls:"b-bad"}].map(P=>`<rect class="cv-band ${P.cls}" x="${_.l}" y="${ee(P.to).toFixed(1)}" width="${ne}" height="${(ee(P.from)-ee(P.to)).toFixed(1)}"/>`).join(""),oe=10/$*ne,Q=[];i.forEach((P,Ae)=>{const Te=l(P.startAge),Ie=r(P),Oe=Math.max(_.l,D(Te)),da=Math.min(_.l+ne,D(Te+10));Q.push(`${Oe.toFixed(1)},${ee(Ie).toFixed(1)}`),Q.push(`${da.toFixed(1)},${ee(Ie).toFixed(1)}`)});const qe=Q.length?`<polyline class="cv-dy" points="${Q.join(" ")}"/>`:"",X=Q.length?`<polygon class="cv-dyfill" points="${_.l},${(_.t+F).toFixed(1)} ${Q.join(" ")} ${(_.l+ne).toFixed(1)},${(_.t+F).toFixed(1)}"/>`:"",$e=n.filter(P=>P.luck&&typeof P.luck.score=="number").map(P=>({x:D(l(P.age)),y:ee(l(P.luck.score)),y0:l(P.year),gz:P.ganzhi,tier:P.luck.tier,v:l(P.luck.score),age:l(P.age)})),te=$e.length>1?`<polyline class="cv-ln" points="${$e.map(P=>`${P.x.toFixed(1)},${P.y.toFixed(1)}`).join(" ")}"/>`:"",re={大吉:"var(--lu)",吉:"var(--lu)",平:"var(--muted)",忌:"var(--red)",大忌:"var(--red)"},w=$e.length?Math.min(...$e.map(P=>P.y0)):null,z=$e.map(P=>`<circle class="cv-dot${P.y0===w?" now":""}" cx="${P.x.toFixed(1)}" cy="${P.y.toFixed(1)}" fill="${re[P.tier]||"var(--muted)"}"><title>${t(`${P.y0}年（${P.age}岁）${P.gz}　${P.tier} ${P.v}`)}</title></circle>`).join(""),N=`<line class="cv-ax zero" x1="${_.l}" y1="${ee(0).toFixed(1)}" x2="${_.l+ne}" y2="${ee(0).toFixed(1)}"/><line class="cv-ax" x1="${_.l}" y1="${_.t}" x2="${_.l}" y2="${_.t+F}"/>`,v=$>60?10:5,W=[];for(let P=Math.ceil(d/v)*v;P<=y;P+=v)W.push(`<text class="cv-lbl age" x="${D(P).toFixed(1)}" y="${(_.t+F+13).toFixed(1)}" text-anchor="middle">${P}岁</text>`);const de=`<text class="cv-lbl" x="${(_.l-5).toFixed(1)}" y="${(ee(2.4)+3).toFixed(1)}" text-anchor="end">吉</text><text class="cv-lbl" x="${(_.l-5).toFixed(1)}" y="${(ee(0)+3).toFixed(1)}" text-anchor="end">平</text><text class="cv-lbl" x="${(_.l-5).toFixed(1)}" y="${(ee(-1.8)+3).toFixed(1)}" text-anchor="end">忌</text>`,fe=i.slice().sort((P,Ae)=>r(Ae)-r(P)),C=fe[0],K=fe[fe.length-1],ae=C&&r(C)>.55?`<text class="cv-lbl" x="${D(l(C.startAge)+5).toFixed(1)}" y="${(ee(r(C))-5).toFixed(1)}" text-anchor="middle">▲${C.startAge}岁 ${C.luck.tier}</text>`:"",U=K&&r(K)<-.8?`<text class="cv-lbl" x="${D(l(K.startAge)+5).toFixed(1)}" y="${(ee(r(K))+11).toFixed(1)}" text-anchor="middle">▼${K.startAge}岁 ${K.luck.tier}</text>`:"",ve=`<div class="cv-legend">
      <span><i style="background:var(--quan)"></i>大运（阶梯，一步十年）</span>
      <span><i style="background:var(--ke)"></i>流年（逐年折线）</span>
      <span>绿带＝吉　灰带＝平　红带＝忌</span>
    </div>`,ze=`<div class="cv-tip">曲线只呈现引擎已给出的行运评分（${c} ~ ${m}），不预测具体事件；档位与依据见下方「大运 / 流年」各节。悬停看逐年详情。</div>`;return`<div class="mp-curve">
      <div class="mp-curve-h"><b>人生运势曲线</b><span>${d}–${y} 岁　${e.dayun.rule}，${g} 岁起运${e.dayun.jiao&&e.dayun.jiao.at?`，交运 ${e.dayun.jiao.at}`:""}</span></div>
      <svg viewBox="0 0 ${M} ${A}" role="img" aria-label="人生运势曲线：${d} 到 ${y} 岁的大运与流年评分走势">
        ${T}${N}${X}${qe}${te}${z}${W.join("")}${de}${ae}${U}
      </svg>
      ${ve}${ze}
    </div>`},s.trendChart=function(e){const i=e&&Array.isArray(e.points)?e.points:[];if(i.length<2)return"";const n=e&&Array.isArray(e.segments)?e.segments:[],l=C=>typeof C=="number"&&isFinite(C)?C:0,r=720,m=322,c={t:34,r:46,b:66,l:36},g=r-c.l-c.r,u=m-c.t-c.b,b=i.length,d=g/b,y=C=>c.l+(C+.5)*d,$=C=>c.t+u-Math.max(0,Math.min(100,C))/100*u,M=Math.max(1.1,Math.min(10,d*.62)),A=C=>l(C.score),_=c.t+u,ne=_+20,F=22,ee=`klclip${(()=>{let C=2166136261;const K=ae=>{const U=String(ae??"");for(let ve=0;ve<U.length;ve++)C^=U.charCodeAt(ve),C=Math.imul(C,16777619)};K(b),K(i[0]&&i[0].age),K(i[b-1]&&i[b-1].age);for(const ae of i)K(ae&&ae.score);return(C>>>0).toString(36)})()}`,R=n.map((C,K)=>{const ae=Math.max(0,C.startAge-1),U=Math.min(b-1,C.endAge-1);if(U<ae)return"";const ve=c.l+ae*d,ze=Math.max(.6,(U-ae+1)*d),Ae=K%2===1?`<rect class="kl-band" x="${ve.toFixed(1)}" y="${c.t}" width="${ze.toFixed(1)}" height="${u}"/><rect class="kl-stripband" x="${ve.toFixed(1)}" y="${ne}" width="${ze.toFixed(1)}" height="${F}"/>`:"",Te=K===0?"":`<line class="kl-segline" x1="${ve.toFixed(1)}" y1="${c.t}" x2="${ve.toFixed(1)}" y2="${_}"/>`,Ie=Math.min(Math.max(c.l+(ae+U+1)/2*d,c.l+22),c.l+g-22);return Ae+Te+`<text class="kl-seg" x="${Ie.toFixed(1)}" y="${(ne+15).toFixed(1)}" text-anchor="middle">${t(C.ganZhi)}</text>`}).join(""),T=[0,25,50,75,100].map(C=>`<line class="kl-grid${C===50?" mid":""}" x1="${c.l}" y1="${$(C).toFixed(1)}" x2="${c.l+g}" y2="${$(C).toFixed(1)}"/><text class="kl-lbl" x="${c.l-6}" y="${($(C)+3).toFixed(1)}" text-anchor="end">${C}</text>`).join(""),oe=i.map((C,K)=>{const ae=C.kline||{},U=l(ae.open),ve=l(ae.close),ze=Math.min(100,l(ae.high)),P=Math.max(0,l(ae.low)),Ae=ve>=U,Te=$(U),Ie=$(ve),Oe=Math.min(Te,Ie),da=Math.max(.8,Math.abs(Te-Ie)),ca=y(K),Ia=`${C.age}岁（${C.year}年 ${C.ganZhi}）${ve}分${C.dayunGanZhi?` · ${C.dayunGanZhi}运`:""}`;return`<g class="kl-c${Ae?" up":" down"}"><title>${t(Ia)}</title><line x1="${ca.toFixed(2)}" y1="${$(ze).toFixed(1)}" x2="${ca.toFixed(2)}" y2="${$(P).toFixed(1)}"/><rect x="${(ca-M/2).toFixed(2)}" y="${Oe.toFixed(1)}" width="${M.toFixed(2)}" height="${da.toFixed(1)}" rx="0.7"/></g>`}).join(""),Q=C=>{const K=[];for(let ae=0;ae<b;ae++){if(ae+1<C)continue;let U=0;for(let ve=ae+1-C;ve<=ae;ve++)U+=A(i[ve]);K.push({i:ae,v:U/C})}return K},qe=C=>Q(C).map((K,ae)=>`${ae?"L":"M"}${y(K.i).toFixed(1)} ${$(K.v).toFixed(1)}`).join(" "),X=(C,K)=>{const ae=Q(C);if(!ae.length)return"";const U=ae[ae.length-1];return{cls:K,y:$(U.v),text:`<text class="kl-ma-lbl ${K}" x="${c.l+g+5}" y="${$(U.v).toFixed(1)}" text-anchor="start">${U.v.toFixed(0)}</text>`}},$e=X(10,"m10"),te=X(5,"m5"),re=(()=>{if(!te||!$e)return`${$e?$e.text:""}${te?te.text:""}`;let C=te.y,K=$e.y;if(Math.abs(C-K)<10){const ae=Math.min(C,K),U=Math.max(C,K);C=ae-6,K=U+6}return`<text class="kl-ma-lbl m10" x="${c.l+g+5}" y="${K.toFixed(1)}" text-anchor="start">${Q(10).slice(-1)[0].v.toFixed(0)}</text><text class="kl-ma-lbl m5" x="${c.l+g+5}" y="${C.toFixed(1)}" text-anchor="start">${Q(5).slice(-1)[0].v.toFixed(0)}</text>`})();let w=i[0],z=i[0];for(const C of i)A(C)>A(w)&&(w=C),A(C)<A(z)&&(z=C);const N=(C,K,ae)=>{const U=i.indexOf(C),ve=y(U),ze=$(A(C)),P=Math.min(Math.max(ve,c.l+26),c.l+g-26),Ae=K==="hi"?ze-8<c.t+6?14:ae:ze+12>c.t+u-2?-8:ae;return`<g class="kl-mark ${K}"><circle cx="${ve.toFixed(1)}" cy="${ze.toFixed(1)}" r="2"/><circle class="ring" cx="${ve.toFixed(1)}" cy="${ze.toFixed(1)}" r="4.6"/><text x="${P.toFixed(1)}" y="${(ze+Ae).toFixed(1)}" text-anchor="middle">${C.age}岁 ${A(C)}</text></g>`},v=b>60?10:5,W=i.filter(C=>C.age%v===0).map(C=>`<text class="kl-lbl age" x="${y(i.indexOf(C)).toFixed(1)}" y="${(_+14).toFixed(1)}" text-anchor="middle">${C.age}</text>`).join(""),de=`<text class="kl-lbl axis" x="${c.l}" y="${(m-6).toFixed(1)}">年龄（岁）</text><text class="kl-lbl axis" x="${c.l+g}" y="${(m-6).toFixed(1)}" text-anchor="end">每岁一分 · 满分 100</text>`;return`<div class="mp-kline-fig">
      <svg viewBox="0 0 ${r} ${m}" role="img" aria-label="人生K线：1 到 ${b} 岁的逐年评分蜡烛图">
        <defs><clipPath id="${ee}"><rect x="${c.l}" y="${c.t}" width="${g}" height="${u}"/></clipPath></defs>
        ${R}${T}
        <g clip-path="url(#${ee})">
          ${oe}
          <path class="kl-ma m10" d="${qe(10)}"/><path class="kl-ma m5" d="${qe(5)}"/>
        </g>
        ${re}
        ${N(w,"hi",-8)}${N(z,"lo",12)}
        ${W}${de}
      </svg><div class="kl-legend"><span><i class="up"></i>阳线：比上一岁高</span><span><i class="down"></i>阴线：比上一岁低</span><span><i class="m5"></i>5 年均线</span><span><i class="m10"></i>10 年均线</span><span>虚线＝大运交界</span></div></div>`},s.trendHTML=function(e,i){if(!e)return"";const n=!(i&&i.brief===!1),l=s.trendChart(e);if(!l)return s.quickHTML(e);const r=Array.isArray(e.segments)?e.segments:[],m=e.highlights&&typeof e.highlights=="object"?e.highlights:{},c=e.meta||{},g=c.strength||{},u=r.map(T=>`<span class="kl-chip">${t(T.ganZhi)}<em>${T.startAge}–${T.endAge}</em></span>`).join(""),b=(Array.isArray(m.best)?m.best:[]).map(T=>`<div class="kl-hl hi">${t(T)}</div>`).join(""),d=(Array.isArray(m.worst)?m.worst:[]).map(T=>`<div class="kl-hl lo">${t(T)}</div>`).join(""),y=c.boundaryNote?`<div class="mp-kline-note">${t(c.boundaryNote)}</div>`:m.suppressed?`<div class="mp-kline-note">${t(m.suppressed)}</div>`:"",$=Array.isArray(e.points)?e.points:[],M=T=>typeof T.score=="number"&&isFinite(T.score)?T.score:0,A=$.map(M),_=A.length?A.reduce((T,oe)=>T+oe,0)/A.length:0,ne=A.length?Math.max(...A)-Math.min(...A):0,F=r.map(T=>{const oe=$.filter(Q=>Q.age>=T.startAge&&Q.age<=T.endAge).map(M);return{ganZhi:T.ganZhi,v:oe.length?oe.reduce((Q,qe)=>Q+qe,0)/oe.length:0}}).filter(T=>T.v>0).sort((T,oe)=>oe.v-T.v),D=!!(g.boundary||m.suppressed),ee=[`<span><em>全段均值</em><b>${_.toFixed(0)}</b></span>`];!D&&F.length&&(ee.push(`<span><em>最好大运</em><b class="hi">${t(F[0].ganZhi)} ${F[0].v.toFixed(0)}</b></span>`),ee.push(`<span><em>最差大运</em><b class="lo">${t(F[F.length-1].ganZhi)} ${F[F.length-1].v.toFixed(0)}</b></span>`)),ee.push(`<span><em>波动幅度</em><b>${ne.toFixed(0)}</b></span>`);const R=`<div class="kl-stats">${ee.join("")}</div>`;return(n?s.briefHTML(e):"")+`<section class="mp-kline" aria-label="人生K线结果">
      <div class="mp-kline-h"><h2 class="mp-kline-title">人生 K 线</h2><span>${t(c.birth||"")}　日主 ${t(c.dayMaster||"")}　${t(g.level||"")}${g.score?`（${g.score}）`:""}</span></div>
      ${l}
      ${R}
      ${u?`<div class="kl-segs">${u}</div>`:""}
      ${b||d?`<div class="kl-hls">${b}${d}</div>`:""}
      ${y}
      <div class="mp-kline-tip">逐岁分数由大运与流年十神按固定表确定性计分（1–100），只表五行力量的顺逆，不预测具体事件；旺衰落在换档阈值附近时，不出高低年份结论。</div>
    </section>`},s.chengguHTML=function(e){if(!e)return"";const i=e.weights||{},n=e.song||{},l=["year","month","day","hour"].map(g=>{const u=i[g]||{label:"",qian:0},b=String(u.label||"").split(" ")[0]||"",d=String(u.label||"").split(" ")[1]||"";return`<div class="cg-cell"><em>${t(b)}</em><b>${t(d)}</b></div>`}).join(""),r=String(n.text||""),m=r?r.replace(/[。]$/,"").split("；").map((g,u)=>`<span>${t(g)}${u===0?"；":"。"}</span>`).join(""):"",c=e.verdict&&e.verdict.band?e.verdict.band:"";return`<section class="mp-cg" aria-label="称骨结果">
      <div class="mp-cg-h"><b>称骨</b><span>${t(e.lunar&&e.lunar.text?e.lunar.text:"")}</span></div>
      <div class="mp-cg-w">${l}</div>
      <div class="mp-cg-tot"><em>骨重合计</em><b>${t(e.total&&e.total.label?e.total.label:"")}</b>${c?`<i>${t(c)}</i>`:""}</div>
      <div class="mp-cg-song"><div class="mp-cg-song-h">称骨歌 · ${t(e.total&&e.total.label?e.total.label:"")}</div>
        <div class="mp-cg-verse">${m||'<span class="mp-cg-miss">该骨重未见通行本歌诀</span>'}</div>
        <div class="mp-cg-plain"><em>释义</em>${t(n.plain||"")}</div></div>
      ${e.verdict&&e.verdict.text?`<div class="mp-cg-band"><em>分档</em>${t(e.verdict.text)}</div>`:""}
      <div class="mp-cg-note">骨重与歌诀为通行本口径（各版本歌诀有异文，断句标点已统一）；释义为白话自撰，只作字面直解，属民俗娱乐参考，不构成命运断言。</div>
    </section>`},s.nameHTML=function(e){if(!e)return"";const i={木:"wood",火:"fire",土:"earth",金:"metal",水:"water"},n=b=>b==="未收录"?'<span class="mp-nm-el">未收录</span>':`<span class="mp-nm-el wx-${i[b]||"earth"}">${t(b)}</span>`,l=(b,d)=>`<div class="mp-nm-h"><b>${t(b)}</b>${d?`<i>${t(d)}</i>`:""}</div>`;if(e.action==="generate"){const b=e.bazi&&e.bazi.favorable?e.bazi.favorable.join("、"):"",d=(e.candidates||[]).map(y=>{const $=y.wuge&&y.wuge.available?(()=>{const A=y.wuge.rows.filter(F=>F.level==="吉").length,_=y.wuge.rows.filter(F=>F.level==="凶").length;return`<span class="mp-nm-fit${_===0&&A>=4?" ok":_>=2?" no":""}" title="${t(y.wuge.summary)}">五格 ${A}/5 吉</span>`})():"",M=y.phonetics&&y.phonetics.available?`<span class="mp-nm-fit${y.phonetics.level==="拗口"?" no":y.phonetics.level==="顺口"?" ok":""}" title="${t((y.phonetics.issues||[]).map(A=>A.text).join("；"))}">${t(y.phonetics.level)}</span>`:"";return`<div class="mp-nm-c"><b>${t(y.name)}</b><span class="mp-nm-els">${y.chars.map(A=>n(A.element)).join("")}${$}${M}</span><em>${t(y.chars.map(A=>A.char+"·"+A.meaning).join("　"))}</em></div>`}).join("");return`<section class="mp-nm" aria-label="候选名">
        ${l("候选名",`姓 ${e.surname}（${e.gender}）${b?`　喜用 ${b}`:""}`)}
        <div class="mp-nm-cand">${d}</div>
        <div class="mp-nm-note">${(e.notes||[]).map(y=>"※ "+t(y)).join("<br>")}</div>
      </section>`}const r=(e.chars||[]).map(b=>{const d=b.favorable===!0?'<span class="mp-nm-fit ok">合喜用</span>':b.favorable===!1?'<span class="mp-nm-fit no">不合喜用</span>':'<span class="mp-nm-fit">不判</span>',y=b.source==="user"?"用户指定":b.source==="lib"?"字库":"未收录",$=b.suggest&&b.suggest.length?`<div class="mp-nm-sug"><b>可换</b>${b.suggest.map(M=>`<span class="wx-${i[M.element]||"earth"}">${t(M.char)}（${t(M.element)}）</span>`).join("")}</div>`:"";return`<div class="mp-nm-row"><div class="mp-nm-ch">${t(b.char)}</div>
        <div class="mp-nm-b"><div class="mp-nm-t">${n(b.element)}<span>${t(y)}</span>${d}</div>
        <div class="mp-nm-m">${t(b.meaning)}</div>${$}</div></div>`}).join(""),m=e.bazi?`<div class="mp-nm-m">八字：${t(e.bazi.dayMaster&&e.bazi.dayMaster.stem?`${e.bazi.dayMaster.stem}（${e.bazi.dayMaster.element}）`:String(e.bazi.dayMaster||""))}　${t(e.bazi.strength?`${e.bazi.strength.level}（${e.bazi.strength.score}）`:"")}　喜用 ${t((e.bazi.favorable||[]).join("、"))}</div>
         <div class="mp-nm-m">${t(e.bazi.basis||"")}</div>`:"",c=b=>b==="吉"?"is-ok":b==="半吉"?"is-half":"is-bad",g=e.wuge&&e.wuge.available?`<div class="mp-nm-wu">
          <div class="mp-nm-wu-h"><b>五格</b><i>康熙笔画 · 通行本 81 数理</i></div>
          <div class="mp-nm-wu-rows">${e.wuge.rows.map(b=>`<div class="mp-nm-wu-c ${c(b.level)}"><em>${t(b.key)}</em><b>${b.strokes}</b><i>${t(`${b.level} · ${b.name}`)}</i></div>`).join("")}</div>
          <div class="mp-nm-m">笔画：${e.wuge.strokes.map(b=>`${t(b.char)}${b.strokes}${b.source==="user"?"（指定）":""}`).join(" ＋ ")}</div>
          <div class="mp-nm-m">三才：${t(e.wuge.sancai.text)}</div>
        </div>`:`<div class="mp-nm-wu"><div class="mp-nm-wu-h"><b>五格</b><i>这一版算不了</i></div><div class="mp-nm-m">${t(e.wuge?e.wuge.reason:"未算")}</div></div>`,u=e.phonetics&&e.phonetics.available?`<div class="mp-nm-ph"><b>音韵</b><span class="mp-nm-ph-lv${e.phonetics.level==="顺口"?" ok":e.phonetics.level==="拗口"?" bad":" warn"}">${t(e.phonetics.level)}</span><em>${t(e.phonetics.chars.map(b=>`${b.py}${b.tone}`).join(" "))}　声调 ${t(e.phonetics.tonePattern)}${(e.phonetics.alt||[]).length?`　又读 ${t(e.phonetics.alt.map(b=>`${b.char} ${b.py}${b.tone}`).join("、"))}`:""}</em>${(e.phonetics.issues||[]).map(b=>`<span class="mp-nm-ph-i">${t(b.text)}</span>`).join("")}</div>`:`<div class="mp-nm-ph"><b>音韵</b><em>${t(e.phonetics?e.phonetics.reason:"未算")}</em></div>`;return`<section class="mp-nm" aria-label="名字评估">
      ${l(e.fullName||"",`字库 ${e.stats&&e.stats.libSize?e.stats.libSize:""} 字${e.stats&&e.stats.unknown?`　未收录 ${e.stats.unknown}`:""}`)}
      ${r}
      ${m}
      ${g}
      ${u}
      <div class="mp-nm-verd">${t(e.verdict||"")}</div>
      <div class="mp-nm-note">${(e.notes||[]).map(b=>"※ "+t(b)).join("<br>")}</div>
    </section>`},s.briefHTML=function(e){return e?e.brief?s.summaryHTML(e.brief):s.factHeadHTML(e.factHead):""},s.oneLineHTML=function(e,i){if(!e||!e.strength||!e.strength.level)return"";const n=i||{},l=n.life||null,r=n.marriage||null,m=e.dayMaster||{},c=e.pillars&&e.pillars.month&&e.pillars.month.branch||"",g=`${m.stem||""}${m.element||""}${e.strength.level}${c?`，生${c}月`:""}`,u=[],b=l&&l.career&&l.career.type&&l.career.type.label;if(b&&u.push(`事业偏${String(b).split("、")[0]}`),l&&l.wealth&&l.wealth.tier){const M=String(l.wealth.tier).split("（")[0];u.push(M==="平"?"财平":`财是${M}`)}const d=r&&r.types&&r.types[0];d&&d.label&&u.push(`婚缘${String(d.label).replace(/型$/,"")}`);const y=r&&r.windows?r.windows.filter(M=>!M.past)[0]:null;return y&&u.push(`最可能动在 ${y.year} 年（${y.age}岁）`),`<section aria-label="一眼看" style="margin:10px 0 0;padding:9px 12px;border-left:3px solid var(--gold)"><p style="margin:0;line-height:1.65">${u.length?`<h2 class="mp-yiyan-h">一眼看</h2>　${t(g)}：${t(u.join("；"))}。`:`${t(g)}。`}</p></section>`},s.summaryHTML=function(e){if(!e||!e.lead)return"";const i=(e.sections||[]).map(r=>`<div class="mp-br-sec"><b>${t(r.h)}</b><p>${t(r.t)}</p></div>`).join(""),n=e.advice&&e.advice.length?`<div class="mp-br-adv"><b>可以试着做的</b><ul>${e.advice.map(r=>`<li>${t(r)}</li>`).join("")}</ul></div>`:"",l=e.chips&&e.chips.length?`<div class="mp-br-chips">${e.chips.map(r=>`<span>${t(r)}</span>`).join("")}</div>`:"";return`<section class="mp-br" aria-label="先说结论">
      <div class="mp-br-h"><b>${t(e.title||"先看这一张")}</b>${l}</div>
      <p class="mp-br-lead">${t(e.lead)}</p>
      ${i}
      ${n}
      ${e.caveat?`<p class="mp-br-cav">※ ${t(e.caveat)}</p>`:""}
      ${e.footer?`<p class="mp-br-foot">${t(e.footer)}</p>`:""}
    </section>`},s.factHeadHTML=function(e){if(!e||!e.headline)return"";const i=(e.facts||[]).map(n=>`<div class="mp-br-sec"><b>${t(n.k)}</b><p>${t(n.v)}</p></div>`).join("");return`<section class="mp-br mp-fh" aria-label="先说结论">
      <div class="mp-br-h"><b>${t(e.kicker||"一览")}</b></div>
      <p class="mp-br-lead">${t(e.headline)}</p>
      ${i}
      ${e.note?`<p class="mp-br-cav">※ ${t(e.note)}</p>`:""}
    </section>`},s.baziHTML=function(e,i){const n=[["year","年柱"],["month","月柱"],["day","日柱"],["hour","时柱"]].filter(([h])=>e.pillars[h]),l={year:"年",month:"月",day:"日",hour:"时"},r={木:"wood",火:"fire",土:"earth",金:"metal",水:"water"},m={比肩:"tg-bi",劫财:"tg-bi",食神:"tg-shi",伤官:"tg-shi",偏财:"tg-cai",正财:"tg-cai",七杀:"tg-guan",正官:"tg-guan",偏印:"tg-yin",正印:"tg-yin"},c=h=>`<span class="tg ${m[h]||""}">${h}</span>`,g=h=>`<span class="wx-${r[h]||"earth"}">${Ke(h)}${h}</span>`,u=h=>`<span class="ss-s ${h.luck||"neutral"}" title="${t(`${h.cat} · ${h.via}查${h.target} ｜ ${h.rule}`)}">${h.name}</span>`,b=(h,E)=>`<tr><td class="bz-lbl">${h}</td>${n.map(([be])=>`<td data-c="${l[be]}">${E(e.pillars[be],be)}</td>`).join("")}</tr>`,d=`<thead><tr><th></th>${n.map(([h,E])=>`<th${h==="day"?' class="bz-hdr-day"':""}>${E}</th>`).join("")}</tr></thead>`,y={寅:"木",卯:"木",巳:"火",午:"火",申:"金",酉:"金",亥:"水",子:"水",辰:"土",戌:"土",丑:"土",未:"土"},$={木:"火",火:"土",土:"金",金:"水",水:"木"},M={木:"土",土:"水",水:"火",火:"金",金:"木"},A=y[e.pillars.month.branch]||"土",_=["木","火","土","金","水"],ne=h=>h===A?"旺":$[A]===h?"相":$[h]===A?"休":M[h]===A?"囚":"死",F=`<tr><td class="bz-lbl">五行</td><td class="bz-wxs" colspan="${n.length}">${["旺","相","休","囚","死"].map(h=>{const E=_.find(be=>ne(be)===h)||A;return`<i><b class="wx-${r[E]}">${E}</b><em>${h}</em></i>`}).join("")}</td></tr>`,D=[b("十神",(h,E)=>E==="day"?`<span class="bz-zhuri">${e.input.gender==="male"?"元男":"元女"}</span>`:h.stemTenGod?c(h.stemTenGod):'<span class="pp-dim">—</span>'),b("天干",h=>`<span class="bz-big ${"wx-"+r[h.stemElement]}">${h.stem}</span>`),b("地支",h=>`<span class="bz-big ${"wx-"+r[h.branchElement]}">${h.branch}</span>`),b("藏干",h=>h.hidden.map(E=>`<i class="bz-cg wx-${r[E.element]}">${E.stem}·${E.element}</i>`).join("")),b("支神",h=>h.hidden.map(E=>c(E.tenGod)).join("<br>")),b("纳音",h=>h.nayin),b("空亡",h=>`<span class="pp-dim">${h.kongwang.join("")}</span>`),b("地势",h=>h.dishi),b("自坐",h=>h.zizuo),b("神煞",h=>h.shenshaDetail&&h.shenshaDetail.length?`<span class="pp-ss">${h.shenshaDetail.map(u).join("")}</span>`:'<span class="pp-dim">—</span>'),F].join(""),ee=Object.entries(e.wuxing).map(([h,E])=>`<span class="pp-chip wx-${r[h]}">${Ke(h)}${h} ${E}</span>`).join(""),R=e.frame||{},T=h=>h==="大吉"||h==="吉"?"ok":h==="大忌"||h==="忌"?"warn":"",oe=(h,E)=>E?`<div class="pp-sec"><div class="pp-sec-h">${h}</div>${E}</div>`:"",Q=R.patternScore,qe=Q?`<div class="pp-tl pp-dim" title="${t(Q.detail||"")}">成格分 ${Q.grade?`${t(Q.grade)}　${Q.score}/100`:"外格不评分"}　${t(Q.verdict||"")}</div>`:"",X=R.geju&&R.geju.length?`
      <div class="pp-tl">${R.primary?`主格 <b>${t(R.primary.name)}</b>　${t(R.primary.evidence)}`:""}</div>
      <div class="pp-chips">${R.geju.map(h=>{const E=h.status==="破格",be=h.status==="待定"||h.status==="假从",me=`${h.evidence||""}${Array.isArray(h.breaks)&&h.breaks.length?`；破：${h.breaks.join("；")}`:""}`;return`<span class="pp-chip ${E?"broken":be?"warn":""}" title="${t(me)}">${t(h.name)}<i class="pp-drel">${t(h.kind)}${h.status?`·${t(h.status)}`:""}</i></span>`}).join("")}</div>${qe}`:"",$e=(()=>{const h=Array.isArray(R.yongshen&&R.yongshen.neutral)?R.yongshen.neutral:[],E=new Set(R.yongshen&&R.yongshen.neutralTenGods||[]);return`${(R.yongshen&&R.yongshen.avoidTenGods||[]).filter(me=>!E.has(me)).map(me=>`<span class="pp-chip warn">${t(me)}</span>`).join("")}${[...E].map(me=>`<span class="pp-chip neu" title="局中分量近零，按中性偏忌看">${t(me)}</span>`).join("")}${h.length?`<span class="pp-chip neu" title="忌神中全局不足 0.5 分的那几行；仍在忌里参与行运评分">中性偏忌 ${h.map(me=>`${t(me.element)} ${t(me.weight)} 分`).join("、")}</span>`:""}`})(),te=R.yongshen?`
      <div class="pp-tl">喜 ${R.yongshen.favor.map(g).join("")}　忌 ${R.yongshen.avoid.map(g).join("")}　<span class="pp-dim">${t(R.yongshen.method)}</span></div>
      <div class="pp-chips">${R.yongshen.favorTenGods.map(h=>`<span class="pp-chip ok">${t(h)}</span>`).join("")}${$e}</div>
      ${(R.yongshen.disputed||[]).length?`<div class="pp-tl pp-dim">有争议：${R.yongshen.disputed.map(h=>`${t(h.element)}（扶抑为${t(h.favorRole)}·${t(h.favorVerb)}，${t(h.climate)}盘调候忌${t(h.element)}）`).join("、")}　保留在喜用，不列入忌</div>`:""}
      ${R.yongshen.combination?`<div class="pp-tl">组合取舍（官杀该制还是该化）</div><div class="pp-chips">${R.yongshen.combination.rows.map(h=>`<span class="pp-chip ${/忌|慎用|耗身/.test(h.action)?"warn":/^(用|可化|可用)/.test(h.action)?"ok":"neu"}" title="${t(h.note)}">${t(h.role)} ${t(h.action)}</span>`).join("")}</div>`:""}
      <div class="pp-tl pp-dim">${t(R.yongshen.detail)}</div>`:"",re=e.climate||R.yongshen&&R.yongshen.climate||null,w=re?(()=>{const h=Math.max(2,Math.min(98,Math.round(((Number(re.temp)||0)+3)/6*100))),E=re.need?`<em>调候取</em><b>${t(re.need.stem+re.need.element)}</b>`:"<em>气候平和</em>",be=!!(R.yongshen&&Array.isArray(R.yongshen.disputed))&&R.yongshen.disputed.some(Sa=>Sa.element===re.avoidElement),me=re.need?`<em>忌</em><b>${t(re.avoidElement)}</b>${be?'<span class="pp-dim">（有争议）</span>':""}`:"",Ce=(re.evidence||[]).length?`<em>依据</em><span>${t(re.evidence.join("、"))}</span>`:"",He=re.priority==="调候优先"?'<span class="mp-cli-p">调候优先</span>':'<span class="mp-cli-p">扶抑为主</span>',Pe=e.frame&&e.frame.yongshen&&e.frame.yongshen.qt,Ut=Pe?`<div class="mp-qt">
          <div class="mp-qt-h"><b>穷通宝鉴</b><span>${t(Pe.label)}</span></div>
          <div class="mp-qt-y"><em>用神</em>${Pe.yong.map((Sa,Zt)=>`<b class="${Zt===0?"first":""}">${t(Sa)}</b>`).join("")}<em>首取 ${t(Pe.primary)}</em></div>
          <div class="mp-qt-q" title="${t(Pe.quote)}">「${t(Pe.quote)}」<span>第 ${Pe.chapter} 章${Pe.truncated?" · 首段更长，摘句下略":""}${Pe.note?" · "+t(Pe.note):""}</span></div>
        </div>`:"";return`<section class="mp-cli" aria-label="寒暖燥湿">
        <div class="mp-cli-h"><b>寒暖燥湿</b><span class="mp-cli-k">${t(re.label||"")}</span>${He}</div>
        <div class="mp-cli-bar" title="寒 ← → 热"><i style="left:${h}%"></i></div>
        <div class="mp-cli-axis"><span>寒</span><span>平</span><span>热</span></div>
        <div class="mp-cli-row">${E}${me}${Ce}</div>
        <div class="mp-cli-narr">${t(re.narration||"")}</div>
        ${Ut}
      </section>`})():"",z=R.godStats?`<div class="pp-chips">${Object.entries(R.godStats.groups).map(([h,E])=>`<span class="pp-chip">${h} ${E}</span>`).join("")}</div>`:"",N=e.dayun.list.map(h=>{const E=h.luck||null;return`<span class="pp-chip ${E?T(E.tier):""}" title="${t(`${h.fromDate?`${h.fromDate} 交运；`:""}${E?`${E.tier} ${E.score}｜${(E.reasons||[]).join("；")}`:""}`)}">${h.startAge} ${h.ganzhi}${h.relations&&h.relations.length?` <i class="pp-drel">${h.relations.join("")}</i>`:""}${E?` ${E.tier}`:""}</span>`}).join(""),v=e.liunian&&e.liunian.length?`<div class="pp-chips">${e.liunian.slice(0,8).map(h=>{const E=h.luck||null,be=h.suiyun&&Array.isArray(h.suiyun.signals)?h.suiyun.signals:[],me=be.length?`｜${be.map(Ce=>Ce.detail).join("；")}`:"";return`<span class="pp-chip ${E?T(E.tier):""}" title="${t(E?`${E.tier} ${E.score}｜${(E.reasons||[]).join("；")}${me}`:me.replace(/^｜/,""))}">${h.year} ${h.ganzhi}${E?` ${E.tier}`:""}</span>`}).join("")}</div>`:"",W=(e.liunian||[]).filter(h=>h.suiyun&&Array.isArray(h.suiyun.signals)&&h.suiyun.signals.length),de=e.suiyunClassic,fe=de?`<div class="pp-dim pp-sy-src" title="${t(de.plain||"")}">《${t(de.bookName||"")}·${t(de.chapter||"")}》「${t(de.quote||"")}」</div>`:"",C=W.length?`<div class="pp-tl pp-dim">岁运提示（只标干支变动，不判吉凶）</div><div class="pp-chips">${W.map(h=>`<span class="pp-chip" title="${t(`${h.suiyun.signals.map(E=>E.detail).join("；")}｜${h.suiyun.note||""}`)}">${h.year} ${t(h.suiyun.signals.map(E=>`${E.type}${(E.type.startsWith("流年")||E.type.startsWith("大运"))&&E.target?`·${E.target}`:""}`).join("/"))}</span>`).join("")}</div>${fe}`:"",K=e.strength&&e.strength.boundary&&e.strength.boundary.near&&e.strength.boundary.nearest?`<span class="pp-chip warn" title="${t(e.strength.boundary.plain||"")}">临界·离${t(e.strength.boundary.nearest.to)} ${e.strength.boundary.nearest.gap} 分</span>`:"",ae=e.strength?`<div class="pp-str">日主强弱：<b>${e.strength.level}</b>${e.strength.score}${K}　<span class="pp-dim">${e.strength.detail}</span></div>`:"",U=e.strength&&e.strength.branchStructure,ve=U?(()=>{const h=U.branches.map(He=>`${t(He.label)}${t(He.branch)}<i class="pp-drel">·${t(He.camp)}</i>${U.placeholderHour&&He.key==="hour"?'<span class="pp-dim">占位</span>':""}`).join(" "),E=U.odd&&U.odd.length?`<span class="pp-st-odd">异类 ${U.odd.map(He=>`${t(He.label)}${t(He.branch)}（${He.weight}分）`).join("、")}</span>`:'<span class="pp-st-odd">无异类</span>',be=U.congProb!=null?`　从格 ${t(U.congRange)}`:"　不套从格概率",me=U.balance||{},Ce=me.branch?`　支 ${me.branch.A}:${me.branch.B}　合干 ${me.total?`${me.total.A}:${me.total.B}`:"—"}`:"";return`<div class="pp-struct" title="${t(`${U.method}；${U.note}`)}"><span class="pp-st-code">${t(U.code)}</span>${h}　${E}${be}${Ce}<span class="pp-dim">　静态结构，只作标注，不改上面的旺衰评分</span></div>`})():"",ze=e.relations&&Array.isArray(e.relations.anhe)?e.relations.anhe:[],P=ze.length?`<div class="pp-anhe" title="${t(e.relations.anheNote||"")}"><b>暗合</b>${ze.map(h=>t(h)).join("　")}<span class="pp-dim">　另列，不并入上面的合冲刑害；${ze.length===1?"只一对，按口径可忽略":`共 ${ze.length} 对`}</span></div>`:"",Ae=e.shensha&&e.shensha.groups||[],Te=Ae.length?`
      <div class="pp-ssx">
        <div class="ssx-h"><b>神煞全览</b><span>共 ${e.shensha.count} 见 · ${Ae.length} 类 · 悬停看查法</span></div>
        ${Ae.map(h=>`<div class="pp-ssg"><span class="ssg-gt">${h.cat}</span><span class="ssg-gi">${h.items.map(E=>`<span class="pp-ssi ${E.luck||"neutral"}" title="${t(`${E.via}查${E.target} ｜ ${E.rule}`)}">${E.name}<em>${E.pillars.map(be=>l[be]||"").join("")}</em></span>`).join("")}</span></div>`).join("")}
        <div class="ssx-h" style="border-top:none;padding-top:4px;margin-top:4px">神煞只作参考，吉凶仍须看格局、旺衰与行运。</div>
      </div>`:"",Ie=i&&i.marriage,Oe=Ie?(()=>{const h=Ie,E=(h.windows||[]).map(be=>`<span class="mp-mar-y${be.past?" past":""}" title="${t(`${be.ganzhi}年 · ${be.dayun?be.dayun+"运 · ":""}${(be.reasons||[]).join("；")}`)}">${be.year}<em>${be.age}岁·${be.kind}</em></span>`).join("");return`<section class="mp-mar" aria-label="婚姻">
        <div class="mp-mar-h"><b>婚姻</b><i class="mp-mar-tag">${t(h.type&&h.type.label||"")}</i></div>
        <div class="mp-mar-yrs">${E||'<span class="pp-dim">20–45 岁未见明显动婚年份</span>'}</div>
        <ol class="mp-mar-lines">${(h.lines||[]).map(be=>`<li>${t(be)}</li>`).join("")}</ol>
        <details class="mp-mar-b"><summary>依据与口径</summary><div>${t(h.basis||"")}</div></details>
      </section>`})():"",da=i&&i.life,ca=da?(()=>{const h=da,E=[["career","事业",h.career],["wealth","财运",h.wealth],["study","学业",h.study],["health","健康",h.health],["children","子女",h.children],["kin","六亲",h.kin]].filter(me=>me[2]&&Array.isArray(me[2].lines)&&me[2].lines.length);if(!E.length)return"";const be=(me,Ce,He)=>`<div class="mp-life-f" data-face="${me}"><b>${t(Ce)}</b>${He.lines.map(Pe=>`<p>${t(Pe)}</p>`).join("")}</div>`;return`<section class="mp-life" aria-label="人生六面">
        <div class="mp-life-h"><b>人生六面</b><i class="mp-life-tag">事业 · 财运 · 学业 · 健康 · 子女 · 六亲</i></div>
        <div class="mp-life-grid">${E.map(([me,Ce,He])=>be(me,Ce,He)).join("")}</div>
        <details class="mp-life-b"><summary>口径</summary><div>六面共用同一套原料（十神权重、用神喜忌、大运流年），各自口径见每段末尾说明。属规则化读法，不是对具体事件的断言。</div></details>
      </section>`})():"",Ia=i&&i.chenggu,ui=Ia?(()=>{const h=Ia,E=["year","month","day","hour"].map(me=>{const Ce=h.weights&&h.weights[me]||{label:""};return`<span class="mp-bzcg-w">${t(String(Ce.label).split(" ")[0])} <b>${t(String(Ce.label).split(" ")[1]||"")}</b></span>`}).join(""),be={上上:"band-top",中上:"band-good",中平:"band-mid",中下:"band-weak",下下:"band-low"}[h.verdict&&h.verdict.band]||"band-mid";return`<section class="mp-bzcg open" aria-label="袁天罡称骨">
        <div class="mp-bzcg-h"><b>袁天罡称骨</b><i class="mp-bzcg-tag">民俗参考</i></div>
        <div class="mp-bzcg-hero"><b>${t(h.total&&h.total.label||"")}</b><span class="mp-bzcg-bandchip ${be}">${t(h.verdict&&h.verdict.band||"")}</span></div>
        <div class="mp-bzcg-lunar">${t(h.lunar&&h.lunar.text||"")}</div>
        <div class="mp-bzcg-ws">${E}</div>
        ${h.song&&h.song.text?`<div class="mp-bzcg-song">「${t(h.song.text)}」</div>`:""}
        ${h.song&&h.song.plain?`<div class="mp-bzcg-plain"><em>释义</em>${t(h.song.plain)}</div>`:""}
        ${h.verdict&&h.verdict.text?`<div class="mp-bzcg-band">${t(h.verdict.text)}</div>`:""}
        <div class="mp-bzcg-note">称骨为通行本口径的民俗参考，与上方四柱旺衰是两套独立口径，互不推导。</div>
      </section>`})():"";return s.briefHTML(e)+s.oneLineHTML(e,i)+`<div class="pp" style="padding:12px">
      <table class="pp-bz">${d}<tbody>${D}</tbody></table>
      ${e.hourUnknown?'<div class="pp-warn" role="note">时柱暂缺：只排年/月/日三柱，起运与交运按日估算。时柱按正午暂算，涉及时柱的结论仅供参考。</div>':""}
      <div class="pp-rel"><div><b>天干</b>${e.relations&&e.relations.stems.length?e.relations.stems.join(" · "):"—"}</div>
      <div><b>地支</b>${e.relations&&e.relations.branches.length?e.relations.branches.join(" · "):"—"}</div></div>
      ${ae}
      ${ve}
      ${P}
      ${oe("格局",X)}
      ${oe("用神",te)}
      ${Oe}
      ${ca}
      ${w}
      ${Array.isArray(e.classics)&&e.classics.length?`<section class="mp-cl" aria-label="古籍原文">
        <div class="mp-cl-h"><b>古籍原文</b><span>照录通行本，释义为白话自撰</span></div>
        ${e.classics.map(h=>`<div class="mp-cl-e">
          <div class="mp-cl-t"><b>${t(({ziping:"子平真诠",ditian:"滴天髓",sanming:"三命通会"}[h.book]||h.book)+"·"+h.chapter)}</b></div>
          <div class="mp-cl-q">「${t(h.quote)}」</div>
          <div class="mp-cl-p">${t(h.plain)}</div>
        </div>`).join("")}
      </section>`:""}
      ${oe("五行与十神",`<div class="pp-chips">${ee}</div>${z}`)}
      ${oe("大运",`${s.curveHTML(e)}<div class="pp-chips">${N}</div>`)}
      ${v?oe("流年",v+C):""}
      ${e.palaces?oe("胎命身",`<div class="pp-chips">
        <span class="pp-chip" title="${t(e.palaces.taiyuan.note)}">胎元 ${t(e.palaces.taiyuan.ganzhi)}</span>
        ${e.palaces.taixi?`<span class="pp-chip" title="${t(e.palaces.taixi.note)}">胎息 ${t(e.palaces.taixi.ganzhi)}</span>`:""}
        ${e.palaces.minggong?`<span class="pp-chip" title="${t(e.palaces.minggong.note)}">命宫 ${t(e.palaces.minggong.ganzhi)}</span>`:""}
        ${e.palaces.shengong?`<span class="pp-chip" title="${t(e.palaces.shengong.note)}">身宫 ${t(e.palaces.shengong.ganzhi)}</span>`:""}
        ${!e.palaces.minggong||!e.palaces.shengong?'<span class="pp-chip" title="命宫与身宫由生月与生时支合数定宫；时柱暂缺，这两宫不排">命宫·身宫 时柱暂缺不排</span>':""}
      </div>`):""}
      ${Te}
      ${ui}
      <div style="margin-top:8px;font-size:12px;color:var(--muted)">上一节 ${e.jieqi.previous.name} ${e.jieqi.previous.time}　下一节 ${e.jieqi.next.name} ${e.jieqi.next.time}　${e.dayun.rule}，${e.dayun.startAge.years}岁起运${e.dayun.jiao&&e.dayun.jiao.at?`（交运 ${e.dayun.jiao.at}，${e.dayun.jiao.frame}）`:""}${e.dayun.startAgeExact&&Number.isInteger(e.dayun.startAgeExact.years)?`　精确 ${e.dayun.startAgeExact.years}年${e.dayun.startAgeExact.months}月${e.dayun.startAgeExact.days}天${e.dayun.startAgeExact.hours}时（截断到日时；上面是四舍五入到月）`:""}</div>
    </div>`};const gt={natal:"命盘解析",divination:"卦象解析",card:"牌阵解析"},et={同向:"good",有张力:"watch",互补:"alt"},ft=e=>`<div class="mp-cross">${e.map(i=>{const n=et[i.stance]||"plain";return`<div class="mp-cross-row">
      <div class="mp-cross-h"><span class="mp-cross-l">${t(i.label)}</span><span class="mp-cross-tag t-${n}">${t(i.stance||"—")}</span></div>
      <div class="mp-cross-b">
        <div class="mp-cross-cell"><b>八字</b><span>${t(i.bazi||"—")}</span></div>
        <div class="mp-cross-cell"><b>紫微</b><span>${t(i.ziwei||"—")}</span></div>
      </div>
      ${i.note?`<div class="mp-cross-note">${t(i.note)}</div>`:""}
    </div>`}).join("")}</div>`,ra={positive:["偏顺","good"],negative:["偏卡","watch"],mixed:["两头都有","alt"],undetermined:["暂难定向","plain"]},at={high:"高",medium:"中",low:"低"},bt={木:"木",火:"火",土:"土",金:"金",水:"水"};s.envRatio=function(){try{if(typeof location<"u"&&location.search){const e=/[?&]env=(\d{1,3})/.exec(location.search);if(e)return Math.max(0,Math.min(100,Number(e[1])))}if(typeof localStorage<"u"){const e=localStorage.getItem("mp-env-ratio");if(e!==null&&e!=="")return Math.max(0,Math.min(100,Number(e)))}}catch{}return 100},s.envFor=function(e,i){const n=e&&e.envelope;if(!n||i&&i.envelope===!1)return null;const l=s.envRatio();if(l>=100)return n;if(l<=0)return null;const r=typeof window<"u"&&(window.Engine||window.__PP&&window.__PP.Engine)||null;return r&&typeof r.pickVariant=="function"?r.pickVariant(n.meta&&n.meta.chart_id,l)==="envelope"?n:null:n},s.envelopeHeadHTML=function(e){if(!e||!e.verdict||!e.verdict.headline)return"";const i=e.verdict,[n,l]=ra[i.direction]||ra.undetermined,r=(e.evidence||[]).length,m=(e.factors||[]).length,c=(e.conflicts||[]).length,g=`按 ${r} 条盘面事实、${m} 条关键因素推出来的${c?`；其中 ${c} 处各家有分歧，已在文末标明`:""}。把握说的是这套规则推得有多一致，不是这件事实际发生的概率。`;return`<div class="mp-env-head">
      <h2 class="mp-env-kicker">结论</h2>
      <div class="mp-env-hl">${t(i.headline)}</div>
      <div class="mp-env-row">
        <span class="mp-env-dir t-${l}">${t(n)}</span>
        <details class="mp-env-confq">
          <summary class="mp-env-conf">把握 ${t(at[i.confidence]||"中")}</summary>
          <div class="mp-env-confq-body">${t(g)}</div>
        </details>
        ${e.degraded?'<span class="mp-env-deg">已简化</span>':""}
      </div>
      ${i.condition?`<div class="mp-env-cond">${t(i.condition)}</div>`:""}
    </div>`},s.envelopeHTML=function(e){if(!e||!Array.isArray(e.factors)||!e.factors.length)return"";const i=new Map((e.evidence||[]).map(g=>[g.id,g])),n=e.factors.map((g,u)=>{const b=(g.evidence_refs||[]).map($=>i.get($)).filter(Boolean),d=b.length?`<details class="mp-env-why"><summary>为什么</summary><div class="mp-env-why-body">${b.map($=>`<div class="mp-env-ev"><b>${t($.label)}</b><span>${t($.detail)}</span></div>`).join("")}</div></details>`:"",y=g.duplicate_count?`<span class="mp-env-dup">另有 ${g.duplicate_count} 处同义表述已并入</span>`:"";return`<div class="mp-env-f-row">
        <div class="mp-env-f-no">${u+1}</div>
        <div class="mp-env-f-main">
          <div class="mp-env-f-top"><b>${t(g.name)}</b><span class="mp-env-f-state">${t(g.state)}</span>${y}</div>
          <div class="mp-env-f-impact">${t(g.impact)}</div>
          ${d}
        </div>
      </div>`}).join(""),l=(e.timeline||[]).length?`<div class="mp-env-tl">${e.timeline.map(g=>`<div class="mp-env-tl-row"><span class="mp-env-tl-w">${t(g.window)}</span>${g.pace?`<span class="mp-env-tl-p">${t(g.pace)}</span>`:""}${g.note?`<span class="mp-env-tl-n">${t(g.note)}</span>`:""}</div>`).join("")}</div>`:"",r=(e.advice||[]).length?`<div class="mp-env-adv"><h3 class="mp-env-adv-h">怎么做</h3><ol>${e.advice.map(g=>`<li>${t(g)}</li>`).join("")}</ol></div>`:"",m=e.risk?`<div class="mp-env-risk"><h3 class="mp-env-risk-h">留意</h3>${t(e.risk)}</div>`:"",c=(e.conflicts||[]).length?`<details class="mp-env-cf"><summary>流派说明（${e.conflicts.length} 条）</summary><div class="mp-env-cf-body">${e.conflicts.map(g=>`<div class="mp-env-cf-item"><b>${t(g.topic)}</b>${(g.views||[]).map(u=>`<div class="mp-env-cf-view"><span>${t(u.school)}</span>${t(u.stance)}</div>`).join("")}${g.note?`<em>${t(g.note)}</em>`:""}</div>`).join("")}</div></details>`:"";return`<div class="mp-env">
      <h2 class="mp-env-sec-h">关键几点</h2>
      <div class="mp-env-f">${n}</div>
      ${l}${r}${m}${c}
    </div>`},s.interpretHTML=function(e,i){if(!e||!(e.dimensions&&e.dimensions.length||e.sections&&e.sections.length)&&!e.error&&!e.answer)return"";const l=!!(i&&i.folded),r=(e.dimensions||[]).map((v,W)=>`<div class="mp-it-dim${v.focused?" focus":""}">
      <div class="mp-it-dh"><span class="mp-it-dno">${W+1}</span><span class="mp-it-dlabel">${t(v.label)}</span>${v.focused?'<span class="mp-it-focus">最贴近你的问题</span>':""}${v.confidence?`<span class="mp-it-conf c-${t(v.confidence)}" title="这一维推演的稳定程度，不是这件事发生的概率">把握 ${t(v.confidence)}</span>`:""}</div>
      ${v.plain?`<div class="mp-it-dplain">${t(v.plain)}</div>`:""}
      <div class="mp-it-dtext">${t(v.text)}</div>
      ${v.evidence&&v.evidence.length?`<details class="mp-it-ev"><summary>依据 · ${t(v.evidence.length)} 条盘面事实</summary><div class="mp-it-ev-body">${v.evidence.map(de=>`<span class="mp-it-ev-item">${t(de)}</span>`).join("")}<span class="mp-it-ev-tech">技法：${t(e.technique||e.systemLabel||"")}</span></div></details>`:""}
      ${v.knowledge&&v.knowledge.length?`<div class="mp-it-knowref"><a href="#mp-sec-know">依据与出处 ${v.knowledge.length} 条 →</a>${v.knowledge.some(de=>de.status!=="settled")?'<span class="know-flag">本维有异说或待核实</span>':""}</div>`:""}
      ${v.advice?`<div class="mp-it-adv"><b>建议</b>${t(v.advice)}</div>`:""}
    </div>`).join(""),m=e.outline&&e.outline.length?`<div class="mp-outline"><h3 class="mp-outline-h">一页读懂</h3>${e.outline.map(v=>`<div class="mp-outline-row"><b>${t(v.label)}</b><span>${t(v.text)}</span></div>`).join("")}</div>`:"",c=e.sections||[],g=c.filter(v=>v.kind!=="method"),u=c.filter(v=>v.kind==="method"),b=c.length?`<nav class="mp-toc" aria-label="报告目录">${g.map(v=>`<a href="#mp-sec-${t(v.key)}">${t(v.label)}</a>`).join("")}${u.length?'<a href="#mp-sec-method">方法与出处</a>':""}</nav>`:"",d=e.tables&&e.tables.length?`<div class="mp-tables">${e.tables.filter(v=>Array.isArray(v.rows)&&v.rows.length).map(v=>`<div class="mp-table-wrap">
          <div class="mp-table-h">${t(v.title)}</div>
          <div class="mp-table-scroll"><table class="mp-table">
            <thead><tr>${v.columns.map(W=>`<th scope="col">${t(W)}</th>`).join("")}</tr></thead>
            <tbody>${v.rows.map(W=>`<tr>${W.map((de,fe)=>`<td data-label="${t(v.columns[fe]||"")}">${t(de)}</td>`).join("")}</tr>`).join("")}</tbody>
          </table></div>
        </div>`).join("")}</div>`:"",y=v=>String(v||"").split(`
`).map(W=>`<div class="mp-it-p">${t(W).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>")}</div>`).join(""),$=(e.dimensions||[]).reduce((v,W)=>v.concat((W.knowledge||[]).map(de=>({...de,dimLabel:W.label}))),[]),M=Array.isArray(e.facts)?e.facts:[],A={};for(let v=0;v<M.length;v+=1)A[M[v].id]=v+1;const _=v=>{const W=Array.isArray(v.refs)?v.refs.filter(fe=>A[fe]):[];return W.length?`<div class="mp-it-refs"><a href="#mp-facts">${W.map(fe=>A[fe]).sort((fe,C)=>fe-C).map(fe=>`[${fe}]`).join("")}</a> 盘面事实</div>`:""},ne=M.length?`<details class="mp-it-sec mp-it-facts" id="mp-facts">
        <summary><span class="mp-it-sh">盘面事实</span><span class="mp-it-mnum">${M.length} 条 · 正文里的 [n] 指这里</span></summary>
        <div class="mp-it-sub">${M.map((v,W)=>`<div class="fact-row"><em class="fact-no">[${W+1}]</em>${v.group===v.label?"":`<em class="fact-g">${t(v.group)}</em>`}<b>${t(v.label)}</b><span>${t(v.value)}</span></div>`).join("")}</div>
      </details>`:"",F=v=>`<div class="mp-it-sec${v.tone?` tone-${t(v.tone)}`:""}" id="mp-sec-${t(v.key)}">
        <h3 class="mp-it-sh">${t(v.label)}${_(v)}</h3>
        <div class="mp-it-stext">${Array.isArray(v.items)&&v.items.length?ft(v.items):y(v.text)}</div>
      </div>`,D=c.length||$.length||M.length?`<div class="mp-it-secs">${g.map(F).join("")}${ne}${u.length||$.length?`<details class="mp-it-sec mp-it-method" id="mp-sec-method">
        <summary><span class="mp-it-sh">方法与出处</span><span class="mp-it-mnum">${u.length?`${u.length} 段`:""}${u.length&&$.length?" · ":""}${$.length?`依据 ${$.length} 条`:""} · 怎么算的、哪里没算、口径分歧</span></summary>
        ${$.length?`<div class="mp-it-sub" id="mp-sec-know"><div class="mp-it-sh">依据与出处</div>${$.map(v=>`<div class="know-row"><span class="know-status ${t(v.status)}">${t(v.statusLabel)}</span><span class="know-body"><em class="know-dim">${t(v.dimLabel)}</em><b>${t(v.gist)}</b>${t(v.detail)}${v.source?`<i>出处：${t(v.source)}</i>`:""}${v.note?`<em>注：${t(v.note)}</em>`:""}</span></div>`).join("")}${e.knowledgeNote?`<div class="know-disc">${t(e.knowledgeNote)}</div>`:""}</div>`:""}
        ${u.map(v=>`<div class="mp-it-sub"><div class="mp-it-sh">${t(v.label)}</div><div class="mp-it-stext">${Array.isArray(v.items)&&v.items.length?ft(v.items):y(v.text)}</div></div>`).join("")}
      </details>`:""}</div>`:"",ee=[e.systemLabel,gt[e.moduleType]||e.moduleType].filter(Boolean),R=e.ask,T=R&&R.question?t(R.question):"",oe=R&&(T||R.direction&&R.direction!=="general")?`<div class="mp-it-ask">${T?`<span class="ask-q">问题：${T}</span><span class="ask-sep">｜</span>`:""}<span class="ask-d">询问方向：${t(R.directionLabel||"综合")}</span></div>`:"",Q=e.answer?`<div class="mp-it-ans"><b>${T?"先答所问":"先看结论"}</b>${t(e.answer)}</div>`:"",qe=e.plain?`<div class="mp-it-plain"><b>说人话</b>${t(e.plain)}</div>`:"",X=e.followups&&e.followups.length?`<div class="mp-it-fu"><b>还可以这样追问</b><ul>${e.followups.map(v=>`<li>${t(v)}</li>`).join("")}</ul></div>`:"",$e=e.glossary&&e.glossary.length?`<details class="mp-it-gloss"><summary>名词解释（${e.glossary.length} 条）</summary>${e.glossary.map(v=>`<div><span>${t(v.term)}</span>${t(v.plain)}</div>`).join("")}</details>`:"",te=e.limits&&e.limits.length?`<details class="mp-it-limits"><summary>本插件不回答什么（${e.limits.length} 条）</summary>${e.limits.map(v=>`<div><b>${t(v.title)}</b>${t(v.text)}</div>`).join("")}</details>`:"",w=e.system&&/^(liuyao|meihua|daliuren|qimen|tarot|xiaoliuren)$/.test(e.system)?`<div class="mp-askcopy-row"><button type="button" class="mp-askcopy" data-mp-askcopy="${t(e.system)}">复制问事提示</button><span class="mp-askcopy-hint">把这张盘和你的问题打包成一段提示，粘到任何对话里都能用</span></div>`:"",z=e.guide?`<details class="mp-guide">
      <summary><b>${t(e.guide.title)}</b><span class="mp-guide-sub">数 / 象 / 辞</span></summary>
      <div class="mp-guide-body">
        <p class="mp-guide-lead">${t(e.guide.lead)}</p>
        <ol class="mp-guide-layers">${(e.guide.layers||[]).map(v=>`<li><b>${t(v.name)}<i>${t(v.sub)}</i></b><span>${t(v.text)}</span><em>${t(v.hint)}</em></li>`).join("")}</ol>
        <div class="mp-guide-check"><b>${t(e.guide.check.title)}</b><ol>${(e.guide.check.items||[]).map(v=>`<li>${t(v)}</li>`).join("")}</ol><p>${t(e.guide.check.tail)}</p></div>
        <div class="mp-guide-parts"><b>${t(e.guide.parts.title)}</b><ul>${(e.guide.parts.rows||[]).map(v=>`<li><span>${t(v[0])}</span>${t(v[1])}</li>`).join("")}</ul><p>${t(e.guide.parts.tail)}</p></div>
        <p class="mp-guide-close">${t(e.guide.closing)}</p>
      </div></details>`:"",N=i&&i.noBody?"":s.envelopeHTML(s.envFor(e,i));return`<div class="mp-it${l?" folded":""}">
      <button type="button" class="mp-it-head" aria-expanded="${l?"false":"true"}">
        <span class="mp-it-arrow" aria-hidden="true">▾</span>
        <span class="mp-it-title">解析与详解</span>${ee.map(v=>`<span class="mp-it-tag">${t(v)}</span>`).join("")}
        <span class="mp-it-hint">${l?"点击展开":"点击收起"}</span>
      </button>
      <div class="mp-it-wrap">
        ${N}
        ${w}
        ${oe}
        ${Q}
        ${qe}
        ${e.lead?`<div class="mp-it-lead">${t(e.lead)}</div>`:""}
        ${e.error?`<div class="mp-it-err">这段解读这次没生出来，盘面数据本身是好的${e.errorId?`（编号 ${t(e.errorId)}，反馈时报它）`:""}${window.__MPCompose&&window.__MPCompose.devOn&&window.__MPCompose.devOn()?`<details class="mp-it-errd"><summary>失败原因（只在开发者视图显示）</summary><code>${t(e.error)}</code></details>`:""}</div>`:""}
        ${m}
        ${b}
        <div class="mp-it-body">${r}</div>
        ${D}
        ${d}
        ${z}
        ${X}
        ${$e}
        ${te}
        <div class="mp-it-dis">${t(e.disclaimer)}</div>
      </div>
    </div>`},s.followupHTML=function(e){if(!e)return"";const i=e.evidence&&e.evidence.length?`<div class="mp-fu-ev">依据：${e.evidence.map(n=>t(n)).join("；")}　置信度：${t(e.confidence||"弱")}</div>`:"";return`<div class="mp-fu${e.ok?"":" miss"}">
      <div class="mp-fu-h">追问 · ${t(e.question)}</div>
      <div class="mp-fu-a">${t(e.answer)}</div>
      ${i}
    </div>`},s.solarLineHTML=function(e){if(!e)return"";const i=e.solarTime||{},n=typeof i.offsetMinutes=="number"?i.offsetMinutes:typeof e.offsetMinutes=="number"?e.offsetMinutes:null;if(n==null||!n)return"";const l=String(i.trueSolarText||e.trueSolarText||"");if(/时辰未知/.test(l))return"";const r=n>0?"+":"−",m=(Math.round(Math.abs(n)*10)/10).toFixed(1),c=/(\d{1,2}:\d{2})/.exec(l),g=String(i.note||""),u=/夏令时/.test(g)?'<b class="mp-solar-dst">已扣夏令时 1 小时</b>':"",b=g?`<details class="mp-solar-why"><summary>怎么算的</summary><div>${t(g)}</div></details>`:"";return`<p class="mp-solar">真太阳时修正 <b>${r}${m} 分</b>${c?`，时柱按 <b>${t(c[1])}</b> 起`:""}${u}${b}<span>（勾掉「真太阳时」就按钟表时间排）</span></p>`},s.envHeadHTML=function(e,i){const n=s.envFor(e,i),l=n?s.envelopeHeadHTML(n):"";return l||s.factHeadHTML(e&&e.factHead)},s.envBodyHTML=function(e,i){return s.envelopeHTML(s.envFor(e,i))},s.resultWithInterpret=function(e,i,n){return(n&&n.noHead?"":s.envHeadHTML(i,n))+(e||"")+s.interpretHTML(i,n)},s.caliberHTML=function(e){const i=e&&Array.isArray(e.switches)?e.switches.filter(u=>u&&u.key):[];if(!i.length)return"";const n=i.filter(u=>!u.error&&u.total>0),l=n.length?`${i.length} 组开关中 ${n.length} 组影响此盘：${n.map(u=>u.short||u.title).join("、")}。`:`本盘对 ${i.length} 组开关都不敏感：换成另一档也不变。`,r=u=>{if(u.error)return`<div class="mp-cdiff-same">未能对照：${t(u.error)}</div>`;if(!u.total)return'<div class="mp-cdiff-same">无变化 · 此盘不受这一开关影响</div>';const b=Array.isArray(u.roots)?u.roots:[];return b.length?`<div class="mp-cdiff-roots">${b.map(d=>`<div class="mp-cdiff-root"><span class="mp-cdiff-k">${t(d.label)}</span><span class="mp-cdiff-from">${t(d.from)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-to">${t(d.to)}</span></div>`).join("")}</div>`:`<div class="mp-cdiff-same">无单一根因；逐字段差异 ${Number(u.total)||0} 处</div>`},m=u=>{const b=(Array.isArray(u.views)?u.views:[]).filter(d=>d&&d.changed);return u.error||!u.total||!b.length?"":`<table class="mp-cview"><thead><tr><th scope="col">项</th><th scope="col">${t(u.currentLabel)}</th><th scope="col">${t(u.altLabel)}</th></tr></thead><tbody>`+b.map(d=>`<tr><th scope="row">${t(d.label)}</th><td>${t(d.current)}</td><td>${t(d.alt)}</td></tr>`).join("")+"</tbody></table>"},c=u=>{const b=Array.isArray(u.categories)?u.categories:[];if(u.error||!u.total||!b.length)return"";const d=b.slice(0,6);return`<div class="mp-cdiff-cats">${d.map(y=>`<span class="mp-cdiff-cat">${t(y.name)} ${Number(y.count)||0} 处</span>`).join("")}`+(b.length>d.length?`<span class="mp-cdiff-cat">另 ${b.length-d.length} 类</span>`:"")+"</div>"},g=i.map(u=>`<div class="mp-cdiff-row"><div class="mp-cdiff-h"><b>${t(u.title)}</b><span class="mp-cdiff-count${u.total>0?" on":""}">${u.error?"未能对照":u.total?`${Number(u.total)||0} 处`:"无变化"}</span></div><div class="mp-cdiff-ab"><span class="mp-cdiff-pill now">当前 · ${t(u.currentLabel)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-pill alt">换成 · ${t(u.altLabel)}</span></div>${r(u)}${m(u)}${c(u)}</div>`).join("");return`<details class="mp-cdiff" aria-label="口径对照">
      <summary><span class="mp-cdiff-title">口径对照</span><span class="mp-cdiff-lead">${t(l)}</span><span class="mp-cdiff-more">展开逐字差异</span></summary>
      <div class="mp-cdiff-body">${g}
        <div class="mp-cdiff-note">同一组输入、只换一个开关；只列变化字段与根因，不判哪套口径更准，也不改上方盘面。</div>
      </div>
    </details>`},s.handleHTML=function(e){return typeof e!="string"||!e?"":`<section class="mp-handle" aria-label="排盘句柄">
      <span class="mp-handle-title">排盘句柄</span>
      <code class="mp-handle-code" title="${t(e)}">${t(e)}</code>
      <button type="button" class="mp-handle-copy" data-handle-copy="${t(e)}" aria-label="复制排盘句柄">复制句柄</button>
      <span class="mp-handle-hint">追问同一张盘时把它连同增量参数（年份、方向、所问之事）一并交给助手，不必重报出生信息。句柄是编码不是加密，含出生时间与出生地，别公开贴出。</span>
    </section>`},s.revisionHTML=function(e){if(!e||typeof e!="object")return"";const i=Array.isArray(e.applied)?e.applied:[],n=Array.isArray(e.ignored)?e.ignored:[];if(!i.length&&!n.length)return"";const l=i.map(r=>{const m=r.fromDisplay==null?"（未设）":r.fromDisplay;return`<li><span class="k">${t(r.label||r.key)}</span><span class="v"><span class="old">${t(m)}</span> → <span class="new">${t(r.display)}</span></span></li>`}).join("");return`<section class="mp-revise" aria-label="一句话改参">
      <div class="mp-revise-head"><span class="mp-revise-title">一句话改参</span><span class="mp-revise-text">「${t(e.text||"")}」</span></div>
      ${l?`<ul class="mp-revise-list">${l}</ul>`:'<p class="mp-revise-ignored">没有识别到可改的参数，仍按原参数排盘。</p>'}
      ${n.length?`<p class="mp-revise-ignored">未处理：${t(n.join("；"))}</p>`:""}
    </section>`},s.shadowHTML=function(e,i){if(!e||!e.id)return"";const n=[];e.version&&n.push(`版本 <b>${t(e.version)}</b>`),e.baseId&&n.push(`基础指纹 <b>${t(e.baseId)}</b>`),n.push("同参数同 ID");const l=[];e.reproducible===!1&&l.push(`不可复算：${t(e.reason||"参数不足")}`);const r=e.reproducible===!0&&e.asOfPinned===!1&&(e.system==="bazi"||e.system==="ziwei")?'<div class="mp-shadow-hint">未固定 asOf：流年 / 流月随「此刻」变化；要逐字比对请在输入里固定 asOf。</div>':"",m=i&&i.sameId!==!1&&(i.versionChanged||Number(i.total)>0);let c="";if(m){const g=Number(i.total)||0,u=t(i.fromVersion||"—"),b=t(i.toVersion||e.version||"—"),d=Array.isArray(i.roots)?i.roots:[],y=d.slice(0,8),$=y.length?`<div class="mp-cdiff-roots">${y.map(_=>`<div class="mp-cdiff-root"><span class="mp-cdiff-k">${t(_.label)}</span><span class="mp-cdiff-from">${t(_.from)}</span><span class="mp-cdiff-arrow" aria-hidden="true">→</span><span class="mp-cdiff-to">${t(_.to)}</span></div>`).join("")}`+(d.length>y.length?`<div class="same">另 ${d.length-y.length} 处根因</div>`:"")+"</div>":`<div class="same">${g?"无单一根因；逐字段变化 "+g+" 处":"字段 0 处变化：同一张盘跨版本逐字一致"}</div>`,M=Array.isArray(i.categories)?i.categories:[],A=M.length?`<div class="mp-cdiff-cats">${M.slice(0,6).map(_=>`<span class="mp-cdiff-cat">${t(_.name)} ${Number(_.count)||0} 处</span>`).join("")}`+(M.length>6?`<span class="mp-cdiff-cat">另 ${M.length-6} 类</span>`:"")+"</div>":"";c=`<details class="mp-shadow-diff"${g>0?" open":""}>
        <summary><b>与上次同盘比对</b><span class="tag">${u} → ${b} · ${g?`${g} 处变化`:"0 处变化"}</span></summary>
        ${$}${A}
        <div class="note">同一 baseId（同一组归一化参数）的两次结果；只比盘面字段，不含摘要、解析与古籍等文本层。</div>
      </details>`}return`<section class="mp-shadow" aria-label="影子盘">
      <div class="mp-shadow-head"><span class="mp-shadow-title">影子盘</span><code class="mp-shadow-id">${t(e.id)}</code>
        <button type="button" class="mp-shadow-copy" data-shadow-copy="${t(e.id)}" aria-label="复制影子盘 ID">复制 ID</button></div>
      <div class="mp-shadow-meta">${n.join('<span aria-hidden="true">·</span>')}</div>
      ${l.map(g=>`<div class="mp-shadow-warn">⚠ ${g}</div>`).join("")}
      ${r}
      ${c}
    </section>`},s.shadowTrack=function(e){const i=window.Engine||window.__PP&&window.__PP.Engine;if(!i||!i.shadowSnapshot||!i.shadowDiff)return null;let n=null;try{n=i.shadowSnapshot(e)}catch{return null}if(!n||!n.shadow||!n.shadow.baseId)return null;const l="mp-shadow-v1";let r={};try{const g=window.localStorage?window.localStorage.getItem(l):null,u=g?JSON.parse(g):{};u&&typeof u=="object"&&!Array.isArray(u)&&(r=u)}catch{r={}}const m=r[n.shadow.baseId];let c=null;if(m)try{c=i.shadowDiff(m,n)}catch{c=null}n.at=Date.now(),r[n.shadow.baseId]=n;try{const g=Object.keys(r);if(g.length>24){g.sort((u,b)=>(Number(r[u]&&r[u].at)||0)-(Number(r[b]&&r[b].at)||0));for(const u of g.slice(0,g.length-24))delete r[u]}window.localStorage&&window.localStorage.setItem(l,JSON.stringify(r))}catch{}return c};const tt="dsh-metaphysics/profiles-v1",pa=24,it=16,ya=40,Ot=60,la=["bazi","ziwei","liuyao","tarot","meihua","daliuren","hepan","qimen","almanac","zeri","chenggu","xiaoliuren","star","numerology","mbti","trend","fengshui","name","convert"];s.PROF_KEY=tt,s.PROF_MAX=pa,s.PROF_KINDS=la;const Ht={bazi:"八字",ziwei:"紫微",liuyao:"六爻",tarot:"塔罗",meihua:"梅花",daliuren:"六壬",hepan:"合盘",qimen:"奇门",almanac:"黄历",zeri:"择日",chenggu:"称骨",xiaoliuren:"小六壬",star:"星座",numerology:"生命数字",mbti:"人格",trend:"人生K线",fengshui:"风水",name:"起名",convert:"农历"};s.profKindLabel=e=>Ht[e]||String(e||"");const ke=e=>typeof e=="string";function wa(e){if(!e||typeof e!="object"||Array.isArray(e)||!ke(e.id)||!e.id||e.id.length>40||!ke(e.kind)||la.indexOf(e.kind)<0)return null;const i=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e.date||""));if(!i)return null;const n=Number(i[1]),l=Number(i[2]),r=Number(i[3]);if(l<1||l>12||r<1||r>new Date(n,l,0).getDate())return null;const m=ke(e.time)&&/^([01]?\d|2[0-3]):[0-5]\d$/.test(e.time)?e.time:"";return{id:e.id,kind:e.kind,label:ke(e.label)?e.label.slice(0,it):"",date:e.date,time:e.hourUnknown===!0?"":m,hourUnknown:e.hourUnknown===!0,trueSolar:e.trueSolar!==!1,lateZi:e.lateZi!==!1,gender:e.gender==="male"||e.gender==="female"?e.gender:"",address:ke(e.address)?e.address.slice(0,ya):"",note:ke(e.note)?e.note.slice(0,Ot):"",pinned:e.pinned===!0,createdAt:Number(e.createdAt)||0,lastUsedAt:Number(e.lastUsedAt)||0,uses:Number(e.uses)||0}}function Ea(){try{const e=window.localStorage?window.localStorage.getItem(tt):null,i=e?JSON.parse(e):[];return Array.isArray(i)?i:[]}catch{return[]}}function $a(e){return e.slice().sort((i,n)=>(n.pinned?1:0)-(i.pinned?1:0)||(n.lastUsedAt||n.createdAt||0)-(i.lastUsedAt||i.createdAt||0)||(n.createdAt||0)-(i.createdAt||0))}s.profilesLoad=function(){const e=[],i=Object.create(null);for(const n of Ea()){const l=wa(n);l&&!i[l.id]&&(i[l.id]=1,e.push(l))}return $a(e)},s.profilesSave=function(e){const i=$a(Array.isArray(e)?e.slice(0,pa):[]);try{return window.localStorage?(window.localStorage.setItem(tt,JSON.stringify(i)),!0):!1}catch{return!1}};let nt=0;s.profilesNewId=function(){const e=Object.create(null);for(const n of s.profilesLoad())e[n.id]=1;let i;do i=`p${Date.now().toString(36)}${(nt++).toString(36)}`;while(e[i]);return i},s.profilesPut=function(e){const i=wa(Object.assign({id:s.profilesNewId(),createdAt:Date.now(),lastUsedAt:Date.now()},e));if(!i)return{ok:!1,list:s.profilesLoad()};const n=s.profilesLoad(),l=n.findIndex(r=>r.id===i.id);if(l>=0){const r=n[l];i.createdAt=r.createdAt||i.createdAt,i.lastUsedAt=r.lastUsedAt,i.uses=r.uses,i.pinned=r.pinned,n.splice(l,1,i)}else n.push(i);if(n.length>pa){const r=n.slice().sort((g,u)=>(g.lastUsedAt||g.createdAt)-(u.lastUsedAt||u.createdAt)),m=r.find(g=>g.id!==i.id)||r[0],c=n.indexOf(m);c>=0&&n.splice(c,1)}return s.profilesSave(n)?{ok:!0,list:$a(n),item:i}:{ok:!1,list:s.profilesLoad()}},s.profilesRemove=function(e){const i=s.profilesLoad().filter(n=>n.id!==e);return s.profilesSave(i)?i:s.profilesLoad()},s.profilesPin=function(e){const i=s.profilesLoad().map(n=>n.id===e?Object.assign({},n,{pinned:!n.pinned}):n);return s.profilesSave(i)?$a(i):s.profilesLoad()},s.profilesTouch=function(e){let i=!1;const n=s.profilesLoad().map(l=>l.id!==e?l:(i=!0,Object.assign({},l,{lastUsedAt:Date.now(),uses:(l.uses||0)+1})));return i?s.profilesSave(n)?$a(n):s.profilesLoad():n};const Pt=864e5;function Ge(e){const i=Number(e)||0;if(!i)return"未排过";const n=Math.floor((Date.now()-i)/Pt);if(n<=0)return"今天排过";if(n===1)return"昨天排过";if(n<30)return`${n} 天前排过`;const l=new Date(i);return`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}-${String(l.getDate()).padStart(2,"0")} 排过`}s.profilesAgo=Ge;const Oa="dsh-metaphysics/cases-v1",ka=480,st=["pending","hit","miss","void"],Ha={pending:"待验",hit:"应验",miss:"未应",void:"作废"},Dt=120;s.CASE_KEY=Oa,s.CASE_MAX=ka,s.CASE_STATUS=st,s.caseStatusLabel=e=>Ha[e]||Ha.pending;function Xe(e){if(!e||typeof e!="object"||Array.isArray(e)||!ke(e.id)||!e.id||e.id.length>64)return null;const i=e.entry;if(!i||typeof i!="object"||Array.isArray(i)||!ke(i.kind)||la.indexOf(i.kind)<0||!ke(i.date)&&!ke(i.time)&&!ke(i.question))return null;const n=Number(e.at||i.at)||0;return n?{id:e.id,at:n,status:st.indexOf(e.status)>=0?e.status:"pending",note:ke(e.note)?e.note.slice(0,Dt):"",question:ke(i.question)?i.question.slice(0,80):"",entry:i}:null}function za(){try{const e=window.localStorage?window.localStorage.getItem(Oa):null,i=e?JSON.parse(e):[];return Array.isArray(i)?i:[]}catch{return[]}}function ta(e){if(!window.localStorage)return!1;try{return window.localStorage.setItem(Oa,JSON.stringify(e.slice(0,ka))),!0}catch{return!1}}s.casesSave=ta,s.casesLoad=function(){return za().map(Xe).filter(Boolean).sort((e,i)=>i.at-e.at||(e.id<i.id?1:-1))},s.casesNewId=function(){const e={};za().forEach(n=>{n&&n.id&&(e[n.id]=1)});let i="";for(let n=0;n<8&&(i="c"+Date.now().toString(36)+Math.floor(Math.random()*1296).toString(36),!!e[i]);n+=1);return i},s.casesAdd=function(e,i){const n=i||{};if(!e||typeof e!="object"||Array.isArray(e))return{ok:!1,list:s.casesLoad()};const l=s.casesLoad(),r=Number(e.at)||Date.now();if(l.some(u=>u.at>r-6e4&&u.entry.kind===e.kind&&u.entry.date===e.date&&u.entry.time===e.time&&(u.entry.question||"")===(e.question||"")&&(u.entry.lines||"")===(e.lines||"")))return{ok:!0,dup:!0,list:s.casesLoad()};const c=Xe({id:s.casesNewId(),at:r,status:n.status||"pending",note:n.note||"",entry:e});if(!c)return{ok:!1,list:s.casesLoad()};const g=[c].concat(l.filter(u=>u.id!==c.id)).slice(0,ka);return ta(g)?{ok:!0,item:c,list:g}:{ok:!1,list:s.casesLoad()}},s.casesSetStatus=function(e,i){if(st.indexOf(i)<0)return s.casesLoad();const n=za().map(Xe).filter(Boolean).map(l=>l.id===e?Object.assign({},l,{status:i}):l);return ta(n)?n:s.casesLoad()},s.casesRemove=function(e){const i=za().map(Xe).filter(Boolean).filter(n=>n.id!==e);return ta(i)?i:s.casesLoad()},s.casesExport=function(e){return(Array.isArray(e)?e:s.casesLoad()).map(n=>JSON.stringify({id:n.id,at:n.at,atISO:new Date(n.at).toISOString(),kind:n.entry.kind,label:ke(n.entry.label)?n.entry.label:"",question:n.question,status:n.status,note:n.note,params:n.entry})).join(`
`)};const Ft=/^(\d{4})-(\d{2})-(\d{2})$/,di=/^(\d{1,2}):(\d{2})(:\d{2})?$/;function Rt(e){const i=ke(e)&&Ft.exec(e.trim());return i?i[2]+"-"+i[3]:""}function Pa(e){const i=ke(e)&&di.exec(e.trim());return i?i[1]+":00":""}s.casesExportMasked=function(e){return(Array.isArray(e)?e:s.casesLoad()).map(n=>{const l=n.entry||{},r={};return Object.keys(l).forEach(m=>{if(m!=="address"){if(m==="date"){const c=Rt(l[m]);c&&(r.date=c);return}if(m==="time"){const c=Pa(l[m]);c&&(r.time=c);return}m!=="question"&&(r[m]=l[m])}}),JSON.stringify({id:n.id,kind:l.kind||"",label:ke(l.label)?l.label:"",status:n.status,note:"",params:r})}).join(`
`)},s.casesMigrate=function(e){const i=Array.isArray(e)?e:[];if(!i.length)return{added:0,list:s.casesLoad()};const n=za().map(Xe).filter(Boolean),l={};n.forEach(m=>{l[m.id]=1});let r=0;for(let m=0;m<i.length;m+=1){const c=i[m];if(!c||typeof c!="object"||!ke(c.kind))continue;const g=Number(c.at)||0,u=`h-${g||"0"}-${m}-${c.kind}`;if(l[u])continue;const b=Xe({id:u,at:g||Date.now(),status:"pending",entry:c});b&&(l[u]=1,n.push(b),r+=1)}return r&&ta(n.sort((m,c)=>c.at-m.at)),{added:r,list:s.casesLoad()}};const ci={male:"♂",female:"♀"};s.profilesHTML=function(e,i){const n=i||{},l=(Array.isArray(e)?e:[]).map(m=>{const c=wa(m);if(!c)return"";const g=[c.date,c.hourUnknown?"时辰未知":c.time,c.address].filter(Boolean).join(" "),u=n.editingId&&c.id===n.editingId,b=n.armedDel&&c.id===n.armedDel;return`<div class="mp-prof-card${c.pinned?" pinned":""}${u?" editing":""}" data-id="${t(c.id)}">
        <button type="button" class="mp-prof-use" data-mp-prof="use" data-id="${t(c.id)}"
          title="${t(`用「${c.label||c.kind}」的出生信息直接排盘`)}">
          <span class="mp-prof-nm">${t(c.label||"未命名")}${c.gender?`<i class="sx">${ci[c.gender]||""}</i>`:""}</span>
          <span class="mp-prof-sys">${t(s.profKindLabel?s.profKindLabel(c.kind):c.kind)}</span>
          <span class="mp-prof-bd">${t(g)}</span>
          <span class="mp-prof-at">${t(Ge(c.lastUsedAt||c.createdAt))}${c.uses?` · ${c.uses} 次`:""}${c.pinned?" · 置顶":""}</span>
        </button>
        <span class="mp-prof-ops">
          <button type="button" data-mp-prof="pin" data-id="${t(c.id)}" class="${c.pinned?"on":""}"
            aria-pressed="${c.pinned?"true":"false"}" title="置顶这张档案">${c.pinned?"已置顶":"置顶"}</button>
          <button type="button" data-mp-prof="edit" data-id="${t(c.id)}" title="把这张档案读回输入框，改完再存">改名</button>
          <button type="button" data-mp-prof="del" data-id="${t(c.id)}" class="${b?"on":""}"
            title="${b?"再点一次就从本机删除这张档案":"从本机删除这张档案（点两次确认）"}">${b?"确认删除":"删除"}</button>
        </span>
      </div>`}).join(""),r=l?`<div class="mp-prof-list">${l}</div>`:'<p class="mp-prof-empty">还没有存过命盘。填好出生信息，给这张盘起个称呼，点「存为我的命盘」——下次进来一点就出盘，不必重报。</p>';return`<section class="mp-prof" aria-label="我的命盘">
      <div class="mp-prof-h"><b>我的命盘</b><span class="mp-prof-sub">只存本机 · 不上传${e&&e.length?` · ${e.length}/${pa}`:""}</span></div>
      ${r}
      ${n.bar||""}
    </section>`},s.profilesBarHTML=function(e){const i=e||{};return`<div class="mp-prof-bar">
        <input class="mp-prof-name" type="text" maxlength="${it}" placeholder="称呼，如「我」「妈妈」" aria-label="档案称呼" value="${t(i.name||"")}">
        <button type="button" data-mp-prof="put"${i.canAdd===!1?" disabled":""}>${t(i.editingId?"更新这张档案":"存为我的命盘")}</button>
        ${i.editingId?'<button type="button" class="ghost" data-mp-prof="cancel">取消改名</button>':""}
        <span class="mp-prof-tip">${t(i.tip||(i.editingId?"改完出生信息或称呼，点「更新这张档案」覆盖原档。":"存的是出生时间与出生地这些输入，不是结果。"))}</span>
      </div>`},s.profEvent=function(e){let i=e&&e.closest?e.closest("[data-mp-prof]"):null;if(!i)return null;const n=i.getAttribute("data-mp-prof");return i.tagName==="BUTTON"&&i.disabled?null:{action:n,id:i.getAttribute("data-id")||"",name:i}};const ot=["bazi","trend"],It=["bazi","ziwei","liuyao","meihua","daliuren","qimen","hepan","chenggu","trend","fengshui","name","xiaoliuren"];s.profUsable=function(e){return!e||typeof e!="object"?!1:e.hourUnknown===!0||e.time?!0:It.indexOf(String(e.kind||""))<0},s.profFromForm=function(e,i,n){const l=e||{},r=l.hourUnknown===!0&&ot.indexOf(String(l.kind||""))>=0;return!r&&!/^([01]?\d|2[0-3]):[0-5]\d$/.test(String(l.time||"").trim())?null:wa(Object.assign({id:n||s.profilesNewId(),kind:String(l.kind||""),label:String(i||"").trim().slice(0,it)||(s.profKindLabel?s.profKindLabel(l.kind):String(l.kind||"")),date:String(l.date||""),time:String(l.time||""),hourUnknown:r,gender:String(l.gender||""),address:String(l.address||""),trueSolar:l.trueSolar!==!1,lateZi:l.lateZi!==!1,pinned:!1,createdAt:Date.now(),lastUsedAt:0,uses:0}))},s.traceHTML=function(e,i,n){if(!Array.isArray(e)||!e.length)return"";const l={liuyao:"六爻",bazi:"八字",ziwei:"紫微",qimen:"奇门",daliuren:"大六壬"}[i]||"命盘",r=e.map(u=>u&&u.field).filter(Boolean).join(" → "),m=typeof n=="string"?n:"",c=(u,b)=>{const d=String(u??"");return d.length>b?`${d.slice(0,b)}…`:d},g=e.map((u,b)=>{const d=Array.isArray(u.inputs)?u.inputs:[];return`<details class="mp-trace-step"${b===0?" open":""}>
        <summary><span class="mp-trace-no">${b+1}</span><span class="mp-trace-field">${t(u.field)}</span><span class="mp-trace-res">${t(c(u.result,44))}</span></summary>
        <div class="mp-trace-detail">
          <div class="mp-trace-rule"><b>规则</b>${t(u.rule)}</div>
          ${d.length?`<dl class="mp-trace-inputs">${d.map(y=>`<dt>${t(y.label)}</dt><dd>${t(y.value)}</dd>`).join("")}</dl>`:""}
          <div class="mp-trace-result"><b>结果</b>${t(u.result)}</div>
          ${u.source?`<div class="mp-trace-src"><b>出处</b>${t(u.source)}</div>`:""}
        </div>
      </details>`}).join("");return`<button type="button" class="mp-trace-card" data-trace-open aria-haspopup="dialog" aria-controls="mp-trace-layer">
        <span class="mp-trace-title">推导链</span><span class="mp-trace-flow">${t(r)}</span><span class="mp-trace-count">${e.length} 层 · 查看</span>
      </button>
      <div class="mp-trace-layer" id="mp-trace-layer" data-trace-layer aria-hidden="true">
        <div class="mp-trace-back" data-trace-close></div>
        <aside class="mp-trace-drawer" role="dialog" aria-modal="true" aria-labelledby="mp-trace-title">
          <div class="mp-trace-head">
            <div><b id="mp-trace-title">推导链 · ${t(l)}</b><span>${e.length} 层 · 每层给出规则、输入、结果与出处；只读，不重算</span></div>
            ${m?'<button type="button" class="mp-trace-copy" data-trace-copy aria-label="复制整条推导链的 Markdown">复制 Markdown</button>':""}
            <button type="button" class="mp-trace-close" data-trace-close aria-label="关闭推导链">✕</button>
          </div>
          <div class="mp-trace-body">${g}</div>
          ${m?`<textarea class="mp-trace-md" data-trace-md readonly hidden>${t(m)}</textarea>`:""}
        </aside>
      </div>`},s.almanacHTML=function(e){if(!e||!e.meta)return s.quickHTML(e);const i=e.ganzhi||{},n=e.dayGod||null,l=(M,A)=>(M||[]).map(_=>`<span class="mp-al-chip${A?` ${A}`:""}">${t(_)}</span>`).join(""),r=(M,A)=>A?`<div class="mp-al-cell"><em>${t(M)}</em><b>${t(A)}</b></div>`:"",m=e.xiu?`${e.xiu.name}宿（${e.xiu.luck}·${e.xiu.zheng}·${e.xiu.animal}）`:"",c=e.nayin&&e.nayin.day?e.nayin.day.name:"",g=e.chong?`${e.chong.text}${e.chong.sha?` ${e.chong.sha}`:""}`:"",u=(e.hours||[]).map(M=>`<span class="mp-al-hour ${M.luck==="吉"?"good":"bad"}"><i>${t(M.zhi)}</i><em>${t((M.ganZhi||"").slice(0,1))}</em><b>${t(M.shen||"")}</b><u>${t(M.luck||"")}</u></span>`).join(""),b=e.positions||{},d=(M,A)=>A?`<span class="mp-al-chip">${t(M)}·${t(typeof A=="string"?A:A.dir||"")}</span>`:"",y=e.lucky||{},$=n?`<span class="mp-al-badge ${n.luck==="吉"?"good":"bad"}">${t(n.name)}·${t(n.type)}·${t(n.luck)}</span>`:"";return`<section class="mp-al" aria-label="黄历">
      <div class="mp-al-h"><b>${t(e.meta.date||"")}</b><i>${t(e.meta.weekday||"")}　${t((e.lunar||{}).text||"")}</i></div>
      <div class="mp-al-gz">${t(i.year||"")}年　${t(i.month||"")}月　${t(i.day||"")}日　属${t(i.shengXiao||"")}　建除 ${t(e.zhiXing||"")}日　${$}</div>
      <div class="mp-al-yiji">
        <div class="mp-al-col"><em>宜</em><div class="mp-al-chips">${l(e.yi)}</div></div>
        <div class="mp-al-col"><em>忌</em><div class="mp-al-chips">${l(e.ji)}</div></div>
      </div>
      <div class="mp-al-grid">${r("二十八宿",m)}${r("日柱纳音",c)}${r("胎神",e.taiShen)}${r("冲煞",g)}</div>
      <div class="mp-al-row"><em>吉神方位</em><div class="mp-al-chips">${d("喜神",b.xiShen)}${d("财神",b.caiShen)}${d("福神",b.fuShen)}${d("阳贵",b.yangGui)}${d("阴贵",b.yinGui)}</div></div>
      <div class="mp-al-row"><em>时刻吉凶</em><div class="mp-al-hours">${u}</div></div>
      <div class="mp-al-row"><em>吉配生肖</em><div class="mp-al-chips">${y.liuhe?`<span class="mp-al-chip">六合·${t(y.liuhe)}</span>`:""}${l(y.sanhe||[])}</div></div>
      ${e.dailyHexagram?`<div class="mp-al-hex">每日一卦：<b>${t(e.dailyHexagram.name)}</b>　${t(e.dailyHexagram.meaning||"")}</div>`:""}
      <div class="mp-al-note">${t(e.meta&&e.meta.scope||"")}</div>
    </section>`};const mi=" liuyao tarot meihua daliuren qimen xiaoliuren ",Bt=" almanac zeri convert star numerology wuyunliuqi ",Da={cast:"先看卦名或牌名——事情此刻的样子；再看动爻、正逆位，变化在那里。",person:"先找「你」那一格（日主、命宫或主质）；再看被强调的字或星。",day:"先看今天值什么，再看宜忌那几栏。"};s.plainHTML=function(e){if(!e||e.system==="taiyi")return"";const i=e.brief&&e.brief.lead||"";if(!i)return"";const n=" "+String(e.system||"")+" ",l=mi.indexOf(n)>=0?Da.cast:Bt.indexOf(n)>=0?Da.day:Da.person;return'<div class="mp-pl"><p class="mp-pl-lead">'+t(i)+'</p><p class="mp-pl-how">'+t(l)+"</p></div>"},s.taiyiHTML=function(e){if(!e||!e.taiyi||!e.meta)return"";const i=e.taiyi,n=e.wenchang||{},l=e.shiji||{},r=e.jishen||{},m=e.suan||{},c=e.jiang||{},g=e.geju||{},b=[[9,"巽"],[2,"离"],[7,"坤"],[4,"震"],[5,"中"],[6,"兑"],[3,"艮"],[8,"坎"],[1,"乾"]].map(K=>{const ae=K[0],U=K[1],ve=i.palace===ae,ze=n.num===ae,P=l.palace===ae,Ae=(ve?'<i class="mp-ty-mark">太乙</i>':"")+(P?'<i class="mp-ty-mark s">始击</i>':"")+(ze?'<i class="mp-ty-mark w">文昌</i>':"");return`<div class="mp-ty-cell${ve?" on":""}${U==="中"?" mid":""}"><b>${t(U)}</b><em>${ae}</em>${Ae}</div>`}).join(""),d=e.scope&&e.scope.notCovered||[],y=e.month||{},$=e.day||{},M=e.hour||{},A=y.taiyi&&y.taiyi.palaceName||"",_=String(y.taiyi&&y.taiyi.unitInPalace||""),ne=y.mu?y.mu.pos+"（"+y.mu.god+"）":"",F=y.jishen&&y.jishen.branch||"",D=$.taiyi&&$.taiyi.palaceName||"",ee=String($.taiyi&&$.taiyi.unitInPalace||""),R=$.mu?$.mu.pos+"（"+$.mu.god+"）":"",T=$.jishen&&$.jishen.branch||"",oe=M.taiyi&&M.taiyi.palaceName||"",Q=String(M.taiyi&&M.taiyi.unitInPalace||""),qe=M.jishen&&M.jishen.branch||"",X=e.jixiong||{},$e=e.verdict||{},te=$e.grade||X.grade||"xiong",re=$e.label||X.label||"凶",w=e.shenjiang||{},z=w.rows?`${w.stem}日、${w.day?"昼贵":"夜贵"}起${w.startBranch}${w.dir>0?"顺":"逆"}行；吉神下：${(w.goods||[]).join("、")||"无"}；凶神下：${(w.bads||[]).join("、")||"无"}`:"未排",N=X.grade||"xiong",v=X.label||"凶",W=e.gate&&e.gate.gate||"",de={掩:"客方的目和太乙挤在同一格",击:"始击挨在太乙左右",格:"太乙和始击隔一格正面对上",对:"文昌从对面顶过来",提:"客大将和文昌挤在一格",迫:"有将贴得太近，就在太乙前后一格",囚:"有将被关在太乙那一格里",关:"主客两边的人撞在一处"},fe=(g.list||[]).map(K=>{const ae=String(K).charAt(0);return de[ae]?ae+"——"+de[ae]:String(K)}),C=N==="xiong"?`太乙站在${i.palaceName}宫（${i.dir}），值${W}门，判凶：主客两边有几样撞到了一起。`:N==="daji"?`太乙站在${i.palaceName}宫（${i.dir}），值${W}门，判大吉：位置和数都顺，门也在吉道上。`:N==="buhe"?`太乙站在${i.palaceName}宫（${i.dir}），值${W}门，判不和：位置不冲突，但数上不合。`:`太乙站在${i.palaceName}宫（${i.dir}），值${W}门，判吉：位置不冲突。`;return`<section class="mp-ty" aria-label="太乙神数">
      <div class="mp-ty-h">
        <span class="mp-ty-y">${t(String(e.meta.year))} 年</span>
        <span class="mp-ty-j">${t(e.meta.dunText||"")}${t(String(e.meta.ju))}局</span>
        <span class="mp-ty-m">太乙临 ${t(i.palaceName||"")} 宫</span>
        <span class="mp-ty-m">${t(W)}</span>
      </div>
      <div class="mp-ty-g">${b}</div>
      <div class="mp-ty-plain">
        <p class="mp-ty-lead">${t(C)}</p>
        <p>先看太乙落在哪一格——那是「主」这一年的位置，整张盘围着它转。</p>
        <p>${t(W)}门一值三十年，管的是这三十年的大环境，不是今年单一年的事。</p>
        <p>判${t(v)}，是因为${t(fe.length?fe.join("；"):"八种位置关系一个都没犯")}。</p>
        <p class="mp-ty-close">这一层只摆位置和数，不回答事情成不成；想看每一步怎么来的，展开下面的细目。</p>
      </div>
      <details class="mp-ty-det">
        <summary>细目（想核对推导再展开）</summary>
        <div class="mp-ty-sec"><em>太乙</em>第 ${t(String(i.palace||""))} 宫（${t(i.dir||"")}），三年里的第 ${t(String(i.yearInPalace||""))} 年，${t(i.li||"")}</div>
        <div class="mp-ty-sec"><em>八门</em>${t(W)}　八门三十年一转，1954 年从休门起</div>
        <div class="mp-ty-sec"><em>文昌</em>${t(n.pos||"")}（${t(n.god||"")}，${t(n.palaceName||"")}宫）　十八年一周</div>
        <div class="mp-ty-sec"><em>定目</em>${t(e.dingmu&&e.dingmu.pos||"")}（${t(e.dingmu&&e.dingmu.god||"")}）　<em>三基</em>君${t(e.sanji&&e.sanji.jun||"")} 臣${t(e.sanji&&e.sanji.chen||"")} 民${t(e.sanji&&e.sanji.min||"")}</div>
        <div class="mp-ty-sec"><em>五福</em>${t(e.wufu&&e.wufu.palaceName||"")}宫　<em>大游</em>${t(e.dayou&&e.dayou.palaceName||"")}宫　<em>十精</em>天乙${t(e.shijing&&e.shijing.tianyi||"")} 地乙${t(e.shijing&&e.shijing.diyi||"")} 直符${t(e.shijing&&e.shijing.zhifu||"")}</div>
        <div class="mp-ty-sec"><em>数和</em>主算 ${t(e.heshu&&e.heshu.zhu&&e.heshu.zhu.text||"")}　客算 ${t(e.heshu&&e.heshu.ke&&e.heshu.ke.text||"")}</div>
        <div class="mp-ty-sec"><em>月计</em>太乙在 ${t(A)} 宫（第 ${t(_)} 月）　天目 ${t(ne)}　计神 ${t(F)}</div>
        <div class="mp-ty-sec"><em>日计</em>太乙在 ${t(D)} 宫（第 ${t(ee)} 日）　天目 ${t(R)}　计神 ${t(T)}</div>
        <div class="mp-ty-sec"><em>时计</em>太乙在 ${t(oe)} 宫（第 ${t(Q)} 时）　计神 ${t(qe)}</div>
        <div class="mp-ty-sec"><em>吉凶</em><b class="mp-ty-jx ${t(te)}">${t(re)}</b> ${t(e.jixiong&&e.jixiong.text||"")}</div>
        <div class="mp-ty-sec"><em>神将</em>${t(z)}</div>
        <div class="mp-ty-sec"><em>计神</em>${t(r.branch||"")}（${t(r.god||"")}）　<em>始击</em>${t(l.pos||"")}（${t(l.god||"")}，${t(l.palaceName||"")}宫）</div>
        <div class="mp-ty-sec"><em>主算</em>${t(String(m.zhu||""))}　主大将${t(c.zhuDaName||"")}宫　主参将${t(c.zhuCanName||"")}宫</div>
        <div class="mp-ty-sec"><em>客算</em>${t(String(m.ke||""))}　客大将${t(c.keDaName||"")}宫　客参将${t(c.keCanName||"")}宫</div>
        <div class="mp-ty-sec"><em>格局</em>${g.list&&g.list.length?t(g.list.join("；")):"四将不相犯，没有掩、迫、囚、格、关"}</div>
        <div class="mp-ty-sec"><em>积年</em>${t(String(e.meta.jinian||""))}　残年 ${t(String(e.meta.rest360||""))}　${t(e.year?e.year.jiName:"")}${t(e.year?String(e.year.jiYear):"")}年　${t(e.year?e.year.yuanName:"")}第 ${t(e.year?String(e.year.yuanYear):"")} 年</div>
        <div class="mp-ty-note">算到太乙、八门、文昌、计神、始击、主客算与四将、五种格局；${t(d.join("、"))}未收录，盘上不显示。将落中五时只标数不加宫名。</div>
      </details>
    </section>`},s.wuyunliuqiHTML=function(e){if(!e||!e.zhongyun||!e.year)return"";const i=e.zhongyun,n=e.current||{},l=[];e.special&&e.special.taiYi&&l.push("太乙天符"),e.special&&e.special.tianFu&&!e.special.taiYi&&l.push("天符"),e.special&&e.special.suiHui&&!e.special.taiYi&&l.push("岁会"),e.special&&e.special.tongTianFu&&l.push("同天符"),e.special&&e.special.tongSuiHui&&l.push("同岁会");const r=(c,g)=>(c||[]).map(u=>{const b=g?u.qi:u.name,d=g?!!(n.keQi&&n.keQi.qi===u.qi):!!(n.keYun&&n.keYun.name===u.name),y=g?u.sitian?"司天":u.zaiquan?"在泉":"":u.taiShao||"";return`<div class="mp-wl-step${d?" on":""}"><span class="mp-wl-no">${u.no}</span><span>${t(b||"")}</span><span class="mp-wl-tg">${t(y)}</span><span class="mp-wl-tm">${t(u.startTime||"")}—${t(u.endTime||"")}</span></div>`}).join(""),m=l.map(c=>`<span class="mp-wl-tag on">${t(c)}</span>`).join("");return`<section class="mp-wl" aria-label="五运六气">
      <div class="mp-wl-h">
        <span class="mp-wl-y">${t(e.year.ganzhi)}</span>
        <span class="mp-wl-z">${t(i.name)}</span>
        <span class="mp-wl-m">${t(e.year.startTime||"")} — ${t(e.year.endTime||"")}</span>
      </div>
      ${m?`<div class="mp-wl-sec"><em>格局</em>${m}</div>`:""}
      <div class="mp-wl-sec"><em>司天在泉</em>${t(e.sitian.qi)}司天　${t(e.zaiquan.qi)}在泉</div>
      <div class="mp-wl-sec"><em>此刻</em>${t(n.text||"")}</div>
      <div class="mp-wl-sec"><em>客运五步</em></div>
      <div class="mp-wl-steps">${r(e.keYun,!1)}</div>
      <div class="mp-wl-sec"><em>客气六步</em></div>
      <div class="mp-wl-steps">${r(e.keQi,!0)}</div>
      <div class="mp-wl-note">${t(e.scope?e.scope.note:"")}</div>
    </section>`},s.constitutionHTML=function(e){if(!e)return"";if(e.paper&&Array.isArray(e.questions)){const r=e.questions.map(m=>`<li><span class="mp-cs-no">${m.no}</span><span class="mp-cs-t">${t(m.text)}</span><em>${t(m.name)}</em></li>`).join("");return`<section class="mp-cs-paper" aria-label="中医体质问卷">
        <div class="mp-cs-h"><span><b>中医体质问卷</b><i>${e.scaleCount} 种体质 × ${e.itemsPerScale} 题 · 1 没有 / 5 总是</i></span>
        <span class="mp-cs-count">填完分数再看结果</span></div>
        <ol>${r}</ol>
        <div class="mp-cs-note">${t(e.note||"")}</div>
      </section>`}const i=e.primary||{},n=(e.scales||[]).map(r=>{const m=Math.max(0,Math.min(100,r.converted||0)),c=r.level&&r.level!=="否";return`<div class="mp-cs-row${i.key===r.key?" main":""}">
        <span class="mp-cs-n">${t(r.name)}</span>
        <span class="mp-cs-track"><i class="${c?"on":""}" style="width:${m}%"></i><b class="mp-cs-tick" style="left:40%"></b></span>
        <span class="mp-cs-v">${m}</span>
        <span class="mp-cs-l">${t(r.level||"")}</span>
      </div>`}).join(""),l=(e.care||[]).map(r=>`<li>${t(r)}</li>`).join("");return`<section class="mp-cs" aria-label="中医体质结果">
      <div class="mp-cs-h">
        <span class="mp-cs-main">${t(i.name||"—")}</span>
        <span class="mp-cs-meta"><b>${t(i.oneLine||"")}</b><i>${e.secondary?`兼夹 ${t(e.secondary.name)}（${Math.round(e.secondary.converted)}）`:"无兼夹"}${e.flat?" · 区分度不足":""}</i></span>
        <span class="mp-cs-count">已答 ${e.meta?e.meta.answered:0}/${e.meta?e.meta.total:0} 题</span>
      </div>
      <div class="mp-cs-bars">${n}</div>
      <div class="mp-cs-sec"><em>这体质</em>${t(i.trait||"")}</div>
      <div class="mp-cs-sec"><em>倾向</em>${t(i.tendency||"")}</div>
      <div class="mp-cs-care"><b>调养方向</b><ul>${l}</ul></div>
      <div class="mp-cs-note">${t(e.note||"")}</div>
    </section>`},s.mbtiHTML=function(e){if(!e)return"";if(e.needAnswers&&Array.isArray(e.questions)){const r=e.questions.map(m=>`<li>${t(m.text)}</li>`).join("");return`<section class="mp-mb-paper" aria-label="十六型人格问卷">
        <div class="mp-mb-h">
          <span class="mp-mb-meta"><b>十六型人格问卷</b><i>${e.total} 题 · 每题 1 完全不像 / 5 很像我</i></span>
          <span class="mp-mb-count">填完分数再看结果</span>
        </div>
        <ol>${r}</ol>
        <div class="mp-mb-note">${t(e.note||"")}</div>
      </section>`}const i=(e.dims||[]).map(r=>{const m=Math.round((r.pct||0)*100),c=r.picked===r.left,g=Math.max(2,m),u=c?r.leftSay:r.rightSay;return`<div class="mp-mb-dim">
        <div class="mp-mb-dh"><b class="${c?"on":""}">${t(r.left)}</b><em>${t(r.name)}</em><b class="${c?"":"on"}">${t(r.right)}</b></div>
        <div class="mp-mb-bar ${c?"l":"r"}"><em style="width:${g}%"></em></div>
        <div class="mp-mb-df">取 ${t(r.picked)} · ${t(r.strength)} ${m}%</div>
        <div class="mp-mb-ds">${t(u)}</div>
      </div>`}).join(""),n=e.profile||{},l=(n.stack||[]).map((r,m)=>`<span class="${m===0?"lead":""}"><b>${t(r.code)}</b>${t(r.say)}</span>`).join("");return`<section class="mp-mb" aria-label="十六型人格结果">
      <div class="mp-mb-h">
        <span class="mp-mb-code">${t(e.type||"")}</span>
        <span class="mp-mb-meta"><b>${t(n.title||"")}</b><i>${t(n.keywords||"")}</i></span>
        <span class="mp-mb-count">已答 ${e.answered||0}/${e.total||0} 题</span>
      </div>
      <div class="mp-mb-body">
        <div class="mp-mb-dims">${i}</div>
        <div class="mp-mb-sec"><em>一句</em>${t(n.oneLine||"")}</div>
        <div class="mp-mb-two">
          <div><b>优势</b>${(n.strengths||[]).map(r=>t(r)).join("；")}</div>
          <div><b>留意</b>${(n.blindspots||[]).map(r=>t(r)).join("；")}</div>
        </div>
        ${l?`<div class="mp-mb-sec"><em>认知功能</em>主导 ${t((n.stack[0]||{}).code||"")} → 依次展开</div><div class="mp-mb-fn">${l}</div>`:""}
        <div class="mp-mb-sec"><em>工作</em>${t(n.work||"")}</div>
        <div class="mp-mb-sec"><em>关系</em>${t(n.love||"")}</div>
        <div class="mp-mb-sec"><em>学习</em>${t(n.study||"")}</div>
        <div class="mp-mb-sec"><em>课题</em>${t(n.growth||"")}</div>
      </div>
      <div class="mp-mb-note">${t(e.note||"")}</div>
    </section>`};const ht=[["巽","离","坤"],["震","中","兑"],["艮","坎","乾"]],Fe={坎:"正北",艮:"东北",震:"正东",巽:"东南",离:"正南",坤:"西南",兑:"正西",乾:"西北",中:"中宫"},rt=["生气","延年","天医","伏位"],Re=(e,i)=>`<span class="mp-fs-chip${i?" "+i:""}">${t(e)}</span>`,Fa=(e,i,n)=>`<div class="mp-fs-cell${e==="中"?" center":""}"><div class="mp-fs-top"><span class="mp-fs-gua">${t(e)}</span><span class="mp-fs-dir">${t(Fe[e]||"")}</span>${i||""}</div>`+(n||"")+"</div>",ja=e=>e.length?`<dl class="mp-fs-facts">${e.map(([i,n])=>`<div class="mp-fs-row"><dt>${t(i)}</dt><dd>${t(n)}</dd></div>`).join("")}</dl>`:"",pt=(e,i,n,l,r,m)=>`<section class="mp-quick mp-fs" aria-label="风水结果"><div class="mp-quick-h"><b>${t(e)}</b>${i?`<span class="mp-fs-sub">${t(i)}</span>`:""}</div>`+(n.length?`<div class="mp-fs-chips">${n.join("")}</div>`:"")+l+r+m.filter(Boolean).map(c=>`<div class="mp-fs-note">${t(c)}</div>`).join("")+"</section>",Ra=(e,i)=>`<div class="mp-fs-grid" role="group" aria-label="${t(i)}">`+ht.map(n=>n.map(l=>{const r=e.find(g=>g&&g.palace===l);if(!r)return Fa(l,"","");const m=rt.includes(r.star),c=`<span class="mp-fs-star"${r.role?` title="${t(r.role)}"`:""}>${t(r.star)}<em class="${m?"ok":"bad"}">${m?"吉":"凶"}</em></span>`;return Fa(l,c,"")}).join("")).join("")+"</div>";function Gt(e,i){const n=i.period,l={};for(const $ of e.palaces||[])l[$.palace]=$;const r=`<div class="mp-fs-key">每宫依次为 <b>运</b>／<b>山</b>／<b>向</b> 三星；底色高亮＝当运（${t(n)}运）</div><div class="mp-fs-grid" role="group" aria-label="玄空九宫（运/山/向）">`+ht.map($=>$.map(M=>{const A=l[M];if(!A)return Fa(M,"","");const _=[["运",A.yun],["山",A.shan],["向",A.xiang]].map(([ne,F])=>`<span class="${F===n?"on":""}" title="${t(ne)}星 ${t(F)}">${t(F)}</span>`).join("");return Fa(M,"",`<div class="mp-fs-nums">${_}</div>`)}).join("")).join("")+"</div>",m=e.wangShanWangXiang||{},c=i.jianXiang||{},g=e.timeFlying||null,u=[Re(c.active?`兼${c.jian} ${c.offset}° · 替卦`:"正向 · 下卦",c.active?"ok":""),Re(`山盘 ${i.shanCenter.star}${i.shanCenter.name} · ${i.shanCenter.fly}`),Re(`向盘 ${i.xiangCenter.star}${i.xiangCenter.name} · ${i.xiangCenter.fly}`),Re(m.byChart?"盘面：到山到向":"盘面：未到山到向",m.byChart?"ok":""),Re(m.byTable===null?"表法：替卦不套":m.byTable?"表法：在列":"表法：未列",m.byTable?"ok":"")],b=($,M)=>`${M} ${$.star}${$.name}（${$.fly}，${$.basis}${$.mode==="替卦"?`；原运星 ${$.original}${$.replaced?"，已替":"，用替而未替"}`:""}）`,d=g?[["year","年"],["month","月"],["day","日"],["hour","时"]].filter(([$])=>g[$]).map(([$,M])=>`${M}${g[$].centerName}（${g[$].fly}）`).join("　"):"",y=ja([...c.active?[["替卦",`${c.note}${m.byTable===null?" 正向旺山旺向表不适用于替卦。":""}`]]:[],["入中",`${b(i.shanCenter,"山盘")}；${b(i.xiangCenter,"向盘")}`],["当运",`山星${n}落 ${e.dangYun.shan.text}；向星${n}落 ${e.dangYun.xiang.text}`],["合十",`山星：${(e.heshi.shan||[]).join("、")||"无"}；向星：${(e.heshi.xiang||[]).join("、")||"无"}`],["表法",`${m.note||""}${(m.table||[]).length?` 本运所列：${m.table.join("、")}。`:" 本运表法无局。"}`],...d?[["年月日时",`${d}${g.meta&&g.meta.note?`　${g.meta.note}`:""}`]]:[]]);return pt(c.active?"玄空替卦":"玄空下卦",`${i.periodLabel} · 坐${i.sitting} · 向${i.facing}`,u,r,y,[i.note,e.disclaimer])}function Ue(e,i){const n=e.mingGua||{},l=Ra([...e.luckyDirections||[],...e.unluckyDirections||[]],"八宅八向（吉凶）"),r=[Re(n.compatible||"—"),Re(`${i.gender}命 · ${i.guaYear} 年立春界`)],m=[];if(e.yearlyFlying){const c=e.yearlyFlying;m.push(["年紫白",`${c.centerName}入中；${c.palaces.filter(g=>g.palace!=="中").map(g=>`${g.palace}${g.name}`).join("、")}`])}return pt("八宅命卦",`${n.num}${n.gua}（${n.group}）· ${n.direction}`,r,l,ja(m),[i.note,e.disclaimer])}function xt(e,i){const n=e.layout||{},l=Ra(e.houseStars||[],"宅卦八向（吉凶）"),r=[Re(`${i.houseGua}宅 · ${i.houseGroup}`),Re(`坐${i.sitting}`),Re(`向${i.facing}`)],m=[["门",n.door],["灶",n.stove],["床",n.bed],["厕",n.toilet]];return e.mingMatch&&m.push(["命宅配",e.mingMatch.text]),pt("门主灶",`${i.houseGua}宅 · 坐${i.sitting} · 向${i.facing}`,r,l,ja(m),[i.birthNote,e.disclaimer])}s.fengshuiHTML=function(e){if(!e||e.system!=="fengshui")return s.quickHTML(e);const i=e.meta||{};return i.action==="xuankong"?Gt(e,i):i.action==="advise"?xt(e,i):Ue(e,i)},s.perfHTML=function(e){if(!e)return"";const i=g=>typeof g=="number"&&isFinite(g)?`${Math.max(0,Math.round(g))}ms`:"",n=e.cached===!0?"（已缓存）":e.cached===!1?"（首次加载）":"",l=[];i(e.engineMs)&&l.push(`引擎 ${i(e.engineMs)}${n}`),i(e.computeMs)&&l.push(`排盘 ${i(e.computeMs)}`),i(e.renderMs)&&l.push(`渲染 ${i(e.renderMs)}`);const r=i(e.totalMs);if(!l.length&&!r)return"";const m=r?`首屏 ${r}`:"耗时";return`<div class="mp-perf" title="本机这一次的实测耗时，不含网络与服务端；换机器、首次加载与已缓存会不同">${l.length?`${m}｜${l.join(" · ")}`:m}</div>`},s.zeriHTML=function(e){if(!e||!e.compare||e.compare.mode!=="candidates"||!Array.isArray(e.days))return s.quickHTML(e);const i=e.meta||{},n=e.shenshaRef||{},l=e.compare.best?e.compare.best.date:"",r=e.days.map(g=>{const u=g.date===l,b=g.excluded||g.verdict==="回避"?"bad":g.verdict==="推荐"?"good":"",d=g.grade||{},y=d.label?`<b>${t(d.label)}</b><em>吉${t(d.ji)} / 凶${t(d.xiong)}　${t(d.decision||"")}</em>`:"—";return`<tr class="mp-zr-row${u?" top":""}${g.excluded?" off":""}">
        <th scope="row"><b>${t(g.date)}</b>${u?'<i class="mp-zr-best">最优</i>':""}
          <em>${t(g.weekday)}　${t(g.lunar)}</em></th>
        <td><b>${t(g.dayGanZhi)}</b><em>${t(g.zhiXing)}日</em></td>
        <td class="mp-zr-score">${t(g.score)}</td>
        <td class="mp-zr-grade">${y}</td>
        <td><span class="mp-zr-v ${b}">${t(g.verdict)}</span></td>
        <td class="mp-zr-why">${t(g.reasons.join("；")||"无特别加减分")}</td>
      </tr>`}).join(""),m=(g,u)=>`<span><em>${t(g)}</em>${u.length?t(u.join("、")):"无"}</span>`,c=e.compare.best?`这一组最优：<b>${t(e.compare.best.date)}</b>（${t(e.compare.best.score)} 分 · ${t(e.compare.best.verdict)}）`+(e.compare.best.ties.length>1?`；同分 ${t(e.compare.best.ties.filter(g=>g!==e.compare.best.date).join("、"))}`:""):"这一组都因冲属相被排除，没有可用的日子";return`<section class="mp-zr" aria-label="择日候选比较">
      <div class="mp-zr-h"><b>择日 · ${t(i.task||"")}</b>
        <span>候选 ${t(i.days)} 天${i.shengXiao?`　当事人属${t(i.shengXiao)}`:"（未给属相，未做冲煞排除）"}</span></div>
      <div class="mp-zr-lead">${c}</div>
      <table class="mp-zr-t"><thead><tr>
        <th scope="col">日期</th><th scope="col">日干支 / 建除</th><th scope="col">分</th><th scope="col">卷十等第</th><th scope="col">结论</th><th scope="col">理由</th>
      </tr></thead><tbody>${r}</tbody></table>
      <div class="mp-zr-lists">
        ${m("推荐",e.best)}${m("可用",e.usable)}${m("回避",e.avoid)}
      </div>
      <p class="mp-zr-note">${t(e.compare.note||"")}</p>
      ${n.text?`<p class="mp-zr-note">神煞依据：${t(n.text)}（${t(n.edition||"")}）；起法 ${t((n.volumes||[]).join("、"))}。未实现起法：${t((n.unsupported||[]).join("、"))}（不计分）。</p>`:""}
      ${n.juan10?`<p class="mp-zr-note">卷十依据：${t(n.juan10.text)}（${t(n.juan10.corpusLines||"")}）；${t(n.juan10.thresholdsNote||"")}${t(n.juan10.note||"")}</p>`:""}
      <p class="mp-zr-note">${t(i.scope||"")}</p>
      <p class="mp-zr-note">${t(e.disclaimer||"")}</p>
    </section>`},s.quickHTML=function(e){if(!e)return"";const n={almanac:"黄历",zeri:"择日",chenggu:"称骨",xiaoliuren:"小六壬",star:"星座",numerology:"生命数字",trend:"人生 K 线",fengshui:"风水",name:"起名",convert:"公农历转换",mbti:"十六型人格"}[e.system]||"速查",l=e.summary||"",r=l?`<pre class="mp-quick-pre">${t(l)}</pre>`:"";return`<section class="mp-quick" aria-label="${t(n)}结果">
      <div class="mp-quick-h"><b>${t(n)}</b></div>
      ${r}
    </section>`},s.summaryCardPNG=function(e,i){try{if(typeof document>"u"||!document.createElement)return"";const n=i&&i.outline||[],l=(i&&i.tables||[]).filter(te=>Array.isArray(te.rows)&&te.rows.length),r=i&&i.systemLabel||e&&e.system||"命理报告",m=900,c=44,g=26,u=(te,re)=>`${re?"600 ":""}${te}px "PingFang SC","Microsoft YaHei","Noto Sans CJK SC",sans-serif`,b=document.createElement("canvas"),d=b.getContext?b.getContext("2d"):null;if(!d)return"";const y=(te,re)=>{const w=[];let z="";for(const N of String(te)){const v=z+N;d.measureText(v).width>re&&z?(w.push(z),z=N):z=v}return z&&w.push(z),w.length?w:[""]},$=i&&i.envelope||null,M=$&&$.verdict||null,A=String(M&&M.headline||e&&e.brief&&e.brief.headline||e&&e.factHead&&e.factHead.headline||"").trim(),_=String(e&&e.brief&&e.brief.lead||M&&M.condition||e&&e.factHead&&e.factHead.note||"").trim();d.font=u(22,!0);const ne=A?y(A,m-c*2).slice(0,3):[];d.font=u(14);const F=_?y(_,m-c*2).slice(0,2):[],D=ne.length?26+ne.length*32+(F.length?8+F.length*24:0)+16:0;d.font=u(15);let ee=0;const R=n.map(te=>{const re=y(te.text,m-c*2-70);return ee+=Math.min(re.length,2)*g+10,{o:te,lines:re.slice(0,2)}}),T=l[0]||null,oe=T?T.rows.slice(0,6):[],Q=T?54+oe.length*34:0,qe=150+D+ee+(R.length?34:0)+Q+120;b.width=m,b.height=qe,d.fillStyle="rgb(255,255,255)",d.fillRect(0,0,m,qe),d.fillStyle="rgb(31,111,63)",d.fillRect(0,0,m,8);let X=52;d.fillStyle="rgb(27,27,27)",d.font=u(28,!0),d.fillText(`${r} · 摘要`,c,X),X+=30,d.fillStyle="rgb(111,106,96)",d.font=u(14);const $e=[e&&e.input&&e.input.datetime?`出生/起局：${e.input.datetime}`:"","本地计算 · 可复现"].filter(Boolean).join("　");if(d.fillText($e,c,X),X+=34,ne.length&&(d.fillStyle="rgb(31,111,63)",d.font=u(15,!0),d.fillText("结论",c,X),X+=26,d.fillStyle="rgb(27,27,27)",d.font=u(22,!0),ne.forEach((te,re)=>d.fillText(te,c,X+re*32)),X+=ne.length*32,F.length&&(X+=8,d.fillStyle="rgb(111,106,96)",d.font=u(14),F.forEach((te,re)=>d.fillText(te,c,X+re*24)),X+=F.length*24),X+=16),R.length){d.fillStyle="rgb(31,111,63)",d.font=u(16,!0),d.fillText("一页读懂",c,X),X+=26;for(const{o:te,lines:re}of R)d.fillStyle="rgb(138,131,120)",d.font=u(14,!0),d.fillText(te.label,c,X),d.fillStyle="rgb(63,58,51)",d.font=u(15),re.forEach((w,z)=>d.fillText(w,c+70,X+z*g)),X+=re.length*g+10;X+=8}if(T){d.fillStyle="rgb(31,111,63)",d.font=u(16,!0),d.fillText(T.title,c,X),X+=24,d.fillStyle="rgb(138,131,120)",d.font=u(13),d.fillText(T.columns.join(" · "),c,X),X+=8,d.strokeStyle="rgb(229,225,216)",d.beginPath(),d.moveTo(c,X),d.lineTo(m-c,X),d.stroke(),X+=22,d.fillStyle="rgb(63,58,51)",d.font=u(14);for(const te of oe){const re=te.filter(Boolean).join(" · "),w=y(re,m-c*2)[0];d.fillText(w,c,X),X+=34}}return X=qe-62,d.strokeStyle="rgb(229,225,216)",d.beginPath(),d.moveTo(c,X-18),d.lineTo(m-c,X-18),d.stroke(),d.fillStyle="rgb(138,131,120)",d.font=u(12),d.fillText("内容用于传统文化学习与自我探索，不构成医疗、投资、法律或人事决策依据。",c,X+6),d.fillText("dsh-metaphysics · 本机计算，未上传任何数据",c,X+26),b.toDataURL?b.toDataURL("image/png"):""}catch{return""}}})(),(function(){const o="mp.view",s=["perf","revision","handle","shadow","trace","caliber"],j=["head","body","chart","shortId","castAt","solar","interpret","followup","extra"],I={chart:["bazi","ziwei","hepan","trend","fengshui","name"],ask:["liuyao","meihua","daliuren","qimen","tarot","xiaoliuren"],judge:["wuyunliuqi","taiyi","zeri"],quiz:["mbti","constitution"],lookup:["almanac","chenggu","star","numerology","convert"]},se={quiz:["followup"],lookup:["followup"]};function le(V){const H=String(V||""),B=Object.keys(I);for(let J=0;J<B.length;J++)if(I[B[J]].indexOf(H)>=0)return B[J];return"chart"}const ge=()=>{try{return window.localStorage||null}catch{return null}},ue=V=>String(V??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function ye(){try{const V=window.location||{},H=/(?:^|[?&#])dev=([^&]*)/.exec(String((V.search||"")+(V.hash||"")));if(H)return H[1]!=="0"&&H[1]!=="false";const B=ge();return!!(B&&B.getItem(o)==="dev")}catch{return!1}}function je(V){const H=ge();if(H)try{H.setItem(o,V?"dev":"user")}catch{}return!!V}function Me(V){if(!V||V.__mpDevBound)return;V.__mpDevBound=!0;let H=0,B=0;V.addEventListener("click",()=>{const J=Date.now();if(H=J-B>1200?1:H+1,B=J,H<5)return;H=0;const ie=je(!ye());V.title=ie?"已切到开发者视图（再点五下切回）":"",typeof window.__MPRepaint=="function"&&window.__MPRepaint()})}function G(V,H){const B=V||{},J=H||{},ie=typeof J.mode=="string"?J.mode==="dev":ye(),we=se[le(J.system)]||[],t=j.filter(Se=>we.indexOf(Se)<0);return ie&&t.push(...s),t.push("exportBar"),t.map(Se=>B[Se]).filter(Boolean).join("")}function xe(V){const H=typeof V=="string"?V.replace(/^LY-/,""):"";return H?'<p class="mp-shortid" title="同一组参数、同一版本算出来是同一个编号；回看或反馈时报它就行">盘号 '+ue(H)+"</p>":""}window.__MPCompose={DEV_SECTIONS:s,USER_SEGS:j,TIER:I,TIER_SKIP:se,tierOf:le,devOn:ye,setDev:je,bindDevSwitch:Me,composeResult:G,shortIdHTML:xe,esc:ue}})();function Nn(o,s){return window.__MPCompose&&window.__MPCompose.composeResult?window.__MPCompose.composeResult(o,{system:s}):Object.keys(o).map(j=>o[j]).filter(Boolean).join("")}const $t=new Set;function qn(){return!!(window.__MPCompose&&window.__MPCompose.devOn&&window.__MPCompose.devOn())}const Li="dsh-metaphysics/history-v1";function Mn(){try{const o=window.localStorage&&window.localStorage.getItem(Li),s=o?JSON.parse(o):[];return Array.isArray(s)?s.filter(j=>j&&typeof j=="object"&&typeof j.kind=="string").slice(0,20):[]}catch{return[]}}function Ai(o){try{window.localStorage&&window.localStorage.setItem(Li,JSON.stringify(o.slice(0,20)))}catch{}}const Cn=(o,s)=>o.kind===s.kind&&o.date===s.date&&o.time===s.time&&o.gender===s.gender&&!!o.hourUnknown==!!s.hourUnknown&&o.trueSolar!==!1==(s.trueSolar!==!1)&&o.lateZi!==!1==(s.lateZi!==!1)&&o.address===s.address&&o.lines===s.lines&&o.question===s.question&&o.mhMode===s.mhMode&&o.upper===s.upper&&o.lower===s.lower&&o.direction===s.direction&&o.spread===s.spread&&o.changing===s.changing&&(o.kind!=="qimen"||o.qimenRule===s.qimenRule&&o.qLateZi===s.qLateZi)&&(o.kind!=="zeri"||o.task===s.task&&o.days===s.days&&o.shengXiao===s.shengXiao&&o.zCand===s.zCand)&&(o.kind!=="xiaoliuren"||o.xlrMode===s.xlrMode&&o.num1===s.num1&&o.num2===s.num2&&o.num3===s.num3)&&(o.kind!=="trend"||o.toAge===s.toAge)&&(o.kind!=="fengshui"||o.fsMode===s.fsMode&&o.fsPeriod===s.fsPeriod&&o.sitting===s.sitting&&o.facing===s.facing)&&(o.kind!=="name"||o.nnMode===s.nnMode&&o.surname===s.surname&&o.givenName===s.givenName&&o.limitN===s.limitN)&&(o.kind!=="convert"||o.convMode===s.convMode&&o.lunarDate===s.lunarDate&&!!o.leapMonth==!!s.leapMonth)&&(o.kind!=="hepan"||o.hpChart===s.hpChart&&o.partnerDate===s.partnerDate&&o.partnerTime===s.partnerTime&&o.partnerGender===s.partnerGender&&o.partnerAddress===s.partnerAddress&&!!o.thirdOn==!!s.thirdOn&&o.p2Date===s.p2Date&&o.p2Time===s.p2Time&&o.p2Gender===s.p2Gender&&o.p2Address===s.p2Address);function Ln(o,s){if(o==="bazi"){const I=["year","month","day","hour"].map(se=>s.pillars&&s.pillars[se]).filter(Boolean).map(se=>se.ganzhi).join(" ");return s.hourUnknown||s.pillars&&!s.pillars.hour?`${I}（时柱暂缺）`:I}return o==="ziwei"?`${s.soul?s.soul.branch:""}宫 ${s.bureau?s.bureau.name:""} ${s.lunar?s.lunar.year+"年":""}`.trim():o==="liuyao"?s.ben&&s.ben.name?s.ben.name:"":o==="meihua"?s.ben&&s.ben.name?`${s.ben.name} 动${s.moving}`:"":o==="daliuren"?`${s.dayGanZhi||""} ${s.geJu?s.geJu.name:""}`:""}const O=window.__PP,Ua=()=>typeof performance<"u"&&performance.now?performance.now():Date.now();let Be=0;const ct=typeof window.__mpEnsureEngine=="function"?window.__mpEnsureEngine:async()=>window.Engine,An=`
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
`,{useState:S,useEffect:ua,useRef:Tn}=dt;function Js(o){return window.__PP.isoDateOk(o)}function _n(o){return window.__PP.normalizeDateText(o)}function En(o){return window.__PP.maskDateText(o)}function ti(o){const s=o.value||"",[j,I]=S(s),se=Tn(s);ua(()=>{se.current=s,I(s)},[s]);const le=()=>{const ge=j.trim();if(!ge){I(se.current),o.onInvalid&&o.onInvalid("");return}const ue=_n(ge);if(ue){se.current=ue,I(ue),ue!==s&&o.onChange(ue);return}I(se.current),o.onInvalid&&o.onInvalid(ge)};return p("input",{className:"mp-input",type:"text",inputMode:"numeric",autoComplete:"off",placeholder:"年-月-日，如 1990-05-12",value:j,onChange:ge=>{I(En(ge.target.value))},onBlur:le,onKeyDown:ge=>{ge.key==="Enter"&&(ge.preventDefault(),le())}})}const kt=4,ga=12,zt=5,fa=27,ii=45;let jt=null;function St(){if(jt)return jt;let o=null;try{o=Y.compute({system:"mbti"})}catch{o=null}const s=o&&o.questions||[];return s.length?(jt={total:o&&o.total||s.length,questions:s,scale:o&&o.scale||{}},jt):{total:0,questions:[],scale:{}}}function On(o){const{answers:s,page:j,onPick:I,onPage:se,onSubmit:le,onClear:ge}=o,ue=St(),ye=Math.max(1,Math.ceil(ue.total/kt)),je=j*kt,Me=ue.questions.slice(je,je+kt),G=s.filter(B=>B!=null).length,xe=ue.total?Math.round(G/ue.total*100):0,V=j>=ye-1,H=G>=ga;return p("div",{className:"mp-quiz"},p("div",{className:"mp-quiz-top"},p("div",{className:"mp-quiz-bar","aria-hidden":"true"},p("i",{style:{width:xe+"%"}})),p("span",{className:"mp-quiz-count"},`第 ${j+1} / ${ye} 页 · 已答 ${G} / ${ue.total}`)),p("div",{className:"mp-quiz-list"},Me.map((B,J)=>{const ie=je+J;return p("div",{key:B.id||ie,className:"mp-quiz-q"},p("div",{className:"mp-quiz-qt"},p("b",null,String(ie+1).padStart(2,"0")),p("span",null,B.text)),p("div",{className:"mp-quiz-opts",role:"radiogroup","aria-label":`第 ${ie+1} 题`},[1,2,3,4,5].map(we=>p("label",{key:we,className:"mp-quiz-o"+(s[ie]===we?" on":"")},p("input",{type:"radio",name:`mpmbq${ie}`,value:String(we),checked:s[ie]===we,onChange:()=>I(ie,we)}),p("b",null,String(we)),p("span",null,ue.scale[we]||"")))))})),p("div",{className:"mp-quiz-nav"},p("button",{className:"mp-quiz-btn",disabled:j<=0,onClick:()=>se(-1)},"上一页"),V?null:p("button",{className:"mp-quiz-btn",onClick:()=>se(1)},"下一页"),p("button",{className:"mp-quiz-btn primary",disabled:!H,onClick:le},"看结果"),p("button",{className:"mp-quiz-btn",onClick:ge},"清空"),p("span",{className:"mp-quiz-hint"},H?`已够 ${ga} 题，可以看结果；答完 ${ue.total} 题会更准。`:`答满 ${ga} 题可先看结果（还差 ${ga-G} 题）。`)))}function Hn(o){const{paper:s,answers:j,page:I,onPick:se,onPage:le,onSubmit:ge,onClear:ue}=o;if(!s||!Array.isArray(s.questions))return p("div",{className:"mp-quiz"},p("div",{className:"mp-quiz-hint"},"正在加载问卷题面…"));const ye=s.questions.length,je=Math.max(1,Math.ceil(ye/zt)),Me=I*zt,G=s.questions.slice(Me,Me+zt),xe=j.filter(ie=>ie!=null).length,V=ye?Math.round(xe/ye*100):0,H=I>=je-1,B=xe>=fa,J=ie=>{const we=(s.scale||[]).filter(t=>t&&t.v===ie)[0];return we?we.label:String(ie)};return p("div",{className:"mp-quiz"},p("div",{className:"mp-quiz-top"},p("div",{className:"mp-quiz-bar","aria-hidden":"true"},p("i",{style:{width:V+"%"}})),p("span",{className:"mp-quiz-count"},`第 ${I+1} / ${je} 页 · 已答 ${xe} / ${ye}`)),p("div",{className:"mp-quiz-list"},G.map((ie,we)=>{const t=Me+we;return p("div",{key:ie.no||t,className:"mp-quiz-q"},p("div",{className:"mp-quiz-qt"},p("b",null,String(t+1).padStart(2,"0")),p("span",null,ie.text)),p("div",{className:"mp-quiz-opts",role:"radiogroup","aria-label":`第 ${t+1} 题`},[1,2,3,4,5].map(Se=>p("label",{key:Se,className:"mp-quiz-o"+(j[t]===Se?" on":"")},p("input",{type:"radio",name:`mpcsq${t}`,value:String(Se),checked:j[t]===Se,onChange:()=>se(t,Se)}),p("b",null,String(Se)),p("span",null,J(Se))))))})),p("div",{className:"mp-quiz-nav"},p("button",{className:"mp-quiz-btn",disabled:I<=0,onClick:()=>le(-1)},"上一页"),H?null:p("button",{className:"mp-quiz-btn",onClick:()=>le(1)},"下一页"),p("button",{className:"mp-quiz-btn primary",disabled:!B,onClick:ge},"看结果"),p("button",{className:"mp-quiz-btn",onClick:ue},"清空"),p("span",{className:"mp-quiz-hint"},B?`已够 ${fa} 题，可以看结果；答完 ${ye} 题会更准。`:`答满 ${fa} 题可先看结果（还差 ${fa-xe} 题）。`)))}class Pn extends(dt.Component||Object){constructor(s){super(s),this.state={err:null}}static getDerivedStateFromError(s){return{err:s}}componentDidCatch(s,j){console.error("[metaphysics] 面板渲染异常",s,j)}render(){if(!this.state.err)return this.props.children;const s=this.state.err,j=String(s&&s.stack||"").split(`
`).slice(0,14).join(`
`);return p("div",{className:"mp-wrap"},p("div",{className:"mp-panel"},p("div",{className:"mp-lbl"},"命理面板渲染出错——把下面这段发给我"),p("pre",{style:{whiteSpace:"pre-wrap",fontSize:12,lineHeight:1.5,maxHeight:320,overflow:"auto",margin:"8px 0"}},String(s&&s.message||s)+`

`+j),p("div",{className:"mp-lbl"},"环境：__PP "+typeof O+" · Engine "+typeof window.Engine+" · React "+typeof dt+" · 版本 "+(typeof O=="object"&&O&&(window.__MP_VER||"?"))+(window.__MP_UNRELEASED?" · 未发版改动 "+window.__MP_UNRELEASED+" 项":""))))}}function Dn(o){const s=o&&o.size?o.size:20,j=o&&o.active;return p("svg",{width:s,height:s,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.6,strokeLinecap:"round","aria-hidden":!0,style:{opacity:j?1:.72}},p("circle",{cx:12,cy:12,r:8.2}),p("path",{d:"M12 3.8a4.1 4.1 0 0 1 0 8.2 4.1 4.1 0 0 0 0 8.2"}),p("circle",{cx:12,cy:8,r:1.1,fill:"currentColor",stroke:"none"}),p("circle",{cx:12,cy:16,r:1.1,fill:"currentColor",stroke:"none"}))}const ea=[{k:"ziwei",label:"紫微",timeLabel:"出生时刻",hint:"紫微斗数需要出生日期、时刻与性别；出生地只影响真太阳时修正。"},{k:"bazi",label:"八字",timeLabel:"出生时刻",hint:"四柱八字按节气与真太阳时定时柱，出生地越准，时柱越稳。"},{k:"liuyao",label:"六爻",timeLabel:"起卦时刻",hint:"六爻不需要出生时间：只用起卦当下的日辰定六神、月建定旺衰，卦由摇出。"},{k:"meihua",label:"梅花",timeLabel:"起卦时刻",hint:"梅花用起卦时刻的年月日时数成卦，也可直接给两个数字起卦；与出生时间无关。"},{k:"daliuren",label:"六壬",timeLabel:"起卦时刻",hint:"大六壬用起卦时刻的日干支、时支与月将起天地盘；同样与出生时间无关。"},{k:"qimen",label:"奇门",timeLabel:"起局时刻",hint:"奇门时家转盘：用起局时刻定节气、三元与局数；换局规则决定符头与节气如何对齐。"},{k:"hepan",label:"合盘",timeLabel:"你的出生时刻",hint:"合盘按「日主 + 夫妻宫 + 五行互补」看两个人的相处与互补，需要双方出生信息。"},{k:"tarot",label:"塔罗",timeLabel:"",hint:"塔罗不看时间，只记录抽牌时刻与你的提问。"},{k:"almanac",label:"黄历",timeLabel:"",hint:"黄历按公历日期查农历、干支、宜忌、时辰吉凶、二十八宿与吉神方位；只做本地计算。"},{k:"convert",label:"农历",timeLabel:"",hint:"公农历互转：公历生日可反查农历；只知道农历生日时，可转成公历再排盘。"},{k:"zeri",label:"择日",timeLabel:"",hint:"择日把区间内每天的建除宜忌与事项适配打分排序，并按属相排除冲煞日。"},{k:"xiaoliuren",label:"小六壬",timeLabel:"起课时刻",hint:"小六壬用农历月/日/时掐指，也可用三个随机数起课。"},{k:"star",label:"星座",timeLabel:"",hint:"星座按公历日期给出太阳星座与当日基调；同日同星座结果固定。"},{k:"numerology",label:"生命数字",timeLabel:"",hint:"生命数字按公历生日归约出生命路径数、生日数与态度数。"},{k:"mbti",label:"人格",timeLabel:"",hint:"十六型人格是 24 道自我报告题的 MBTI 风格测算：4 题一页，按 1–5 打分，答满 12 题即可看结果；只作自我参照，不是官方量表。"},{k:"constitution",label:"体质",timeLabel:"",hint:"中医体质是九种体质各 5 题的自评问卷（共 45 题，1 没有 / 5 总是），按转化分判主次体质并给调养方向；不是医学诊断。"},{k:"wuyunliuqi",label:"运气",timeLabel:"",hint:"五运六气按大寒分年：中运、司天在泉、六步。"},{k:"taiyi",label:"太乙",timeLabel:"",hint:"太乙神数按积年推局：太乙落宫、八门、文昌、计神、始击、主客算与四将。"},{k:"trend",label:"人生K线",timeLabel:"出生时刻",hint:"人生 K 线按大运与流年十神给逐年运势分，画成走势图。"},{k:"fengshui",label:"风水",timeLabel:"",hint:"风水看八宅命卦、大游年四吉四凶与流年九宫飞星；也可按坐向看门主灶倾向，或按运与坐向排玄空下卦盘。"},{k:"name",label:"起名",timeLabel:"",hint:"起名按八字喜用匹配字库五行，可评估现有名字或生成候选名。"}];function Vs(o){return String(o).padStart(2,"0")}const ni=["almanac","convert","zeri","xiaoliuren","star","numerology","trend","fengshui","name","constitution","wuyunliuqi","taiyi"],Ti=[{sys:"liuyao",label:"六爻",tip:"摇一卦：只用起卦当下定六神旺衰，所问之事写下面（必填）"},{sys:"meihua",label:"梅花",tip:"梅花易数：按起卦时刻的年月日时成卦，也可改成两个数字起卦"},{sys:"daliuren",label:"六壬",tip:"大六壬：按起卦时刻的日干支、时支与月将起天地盘"},{sys:"qimen",label:"奇门",tip:"奇门遁甲：时家转盘，默认拆补取局，可换超神接气/置闰"},{sys:"tarot",label:"塔罗",tip:"塔罗：不看时间，点一下就抽牌；牌阵在下面选"},{sys:"xiaoliuren",label:"小六壬",tip:"小六壬：按起课时刻推算，也可切报数起课"}],_i="mp.cast.open",Fn=Array.isArray(window.__MPGroups)?window.__MPGroups:[],Ei="mp.recent.tabs",Oi="mp.first.view",Hi=3;function Nt(o){return window.__PP.storeGet(o)}function qt(o,s){window.__PP.storeSet(o,s)}const Pi="mp.panel.result.v1",Rn=1,Di=6,In=5e5,si={computeHits:0,cacheHits:0};typeof window<"u"&&(window.__MPStats=si);function Bn(o){return window.__PP.hash36(o)}function Fi(){const o=Nt(Pi);return o&&typeof o=="object"&&!Array.isArray(o)?o:{}}function Gn(o){if(!o)return null;const s=Fi()[o];return s&&s.result&&s.result.r?s:null}function Un(o,s){if(!(!o||!s))try{if(JSON.stringify(s).length>In)return;const j=Fi();j[o]=s;const I=Object.keys(j);I.length>Di&&I.sort((se,le)=>(j[se].at||0)-(j[le].at||0)).slice(0,I.length-Di).forEach(se=>{delete j[se]}),qt(Pi,j)}catch{}}function Zn(o){return window.__PP.dayLabel(o)}function oi(){return window.__PP.nowParts()}const Kn={ziwei:"birth",bazi:"birth",hepan:"birth",liuyao:"cast",meihua:"cast",daliuren:"cast",qimen:"cast",tarot:"none",almanac:"date",zeri:"date",star:"date",numerology:"date",convert:"date",trend:"birth",fengshui:"birth",name:"birth",xiaoliuren:"cast",mbti:"none",constitution:"none",wuyunliuqi:"date",taiyi:"date"},Ri={date:"1990-05-12",time:"14:30"},Za=o=>Kn[o]||"none",Ze=window.__MPCore||{},na=Ze.needAsk||(o=>!1),pe={ref:null,seats:[],seatOk:{},seatDisposers:[],contribution:"",keys:"",injectType:"",spec:"",errs:[],regs:0,mounted:0},aa={r:null,q:"",it:null,entry:null};let ba="";function Ii(){const o=[];return o.push("inputActions "+(pe.ref?"已拿到":"未拿到")),o.push("渲染 "+pe.mounted+" 次"),o.push("注册 "+pe.regs+" 次"),o.push("inject "+(pe.injectType||"?")),o.push("槽位 "+(pe.spec||"?")),pe.contribution&&o.push("贡献 "+pe.contribution),pe.errs.length&&o.push("错误："+pe.errs.join(" / ")),"桥自检："+o.join("；")}function Bi(o){if(pe.errs.length>=3)return;const s=o&&o.message?String(o.message):String(o);pe.errs.push(s.slice(0,90))}function Yn(o){if(!o)return null;const s=o.inputActions;if(s&&typeof s.setDraft=="function"&&typeof s.submit=="function")return s;const j=o.actions&&o.actions.input;return j&&typeof j.setDraft=="function"&&typeof j.submit=="function"?j:null}function Gi(o,s){const j=Yn(o);return ua(()=>{if(pe.seats.indexOf(s)<0&&pe.seats.push(s),pe.keys=o?Object.keys(o).join(","):"",j){pe.ref=j;try{window.__MPComposer=j}catch{}}return()=>{pe.ref===j&&(pe.ref=null)}},[j,s]),j}function Jn(){const o=aa.r;if(!o)return"";try{const s=Y.askPrompt?Y.askPrompt(o,{question:aa.q,interpret:aa.it}):null;return s&&s.text||String(o.summary||"")}catch{return String(o.summary||"")}}function Ui(o){return pe.mounted+=1,Gi(o,"input.right")?p("button",{type:"button",className:"mp-chip ok",title:aa.r?"把上一张盘的摘要和问题发进对话窗":"先在侧栏「烛微命盘」里排一张盘",onClick:()=>{const j=Jn();j&&Ki(j)}},"命理·问"):p("span",{className:"mp-chip warn",title:"命理：已占住输入框槽位，但没拿到 inputActions；把这句话告诉作者"},"命理·未就绪")}function Zi(o){return pe.mounted+=1,Gi(o,"composer.dock"),null}function Ki(o){let s=pe.ref;if(!s)try{s=window.__MPComposer||null}catch{s=null}return!s||typeof s.setDraft!="function"||typeof s.submit!="function"?!1:(s.setDraft(o),s.submit(),!0)}function Vn(o){const s=o.kind==="ziwei"?O.ziweiHTML(o.r):o.kind==="bazi"?O.baziHTML(o.r,{chenggu:o.chenggu,marriage:o.marriage,life:o.life})+(o.trend?O.trendHTML(o.trend,{brief:!1}):""):o.kind==="meihua"?O.meihuaHTML(o.r):o.kind==="daliuren"?O.daliurenHTML(o.r):o.kind==="qimen"?O.qimenHTML(o.r)+O.qimenFactsHTML(o.r):o.kind==="hepan"?o.r.chart==="ziwei"?O.ziweiHepanHTML(o.r):O.hepanHTML(o.r):o.kind==="tarot"?O.tarotHTML(o.r):o.kind==="liuyao"?O.liuyaoHTML(o.r):o.kind==="almanac"?O.almanacHTML(o.r):o.kind==="zeri"?O.zeriHTML(o.r):o.kind==="trend"?O.trendHTML(o.r):o.kind==="name"?O.nameHTML(o.r):o.kind==="mbti"?O.mbtiHTML(o.r):o.kind==="constitution"?O.constitutionHTML(o.r):o.kind==="wuyunliuqi"?O.wuyunliuqiHTML(o.r):o.kind==="taiyi"?O.taiyiHTML(o.r):o.kind==="fengshui"?O.fengshuiHTML(o.r):O.quickHTML(o.r),j=s.startsWith('<section class="mp-br"')?s.indexOf("</section>"):-1,I=j<0?s:s.slice(j+10),se=j<0?"":s.slice(0,j+10);return I+O.plainHTML(o.r)+se}function Xn(o){const s=!!o.open,j=p("button",{type:"button",className:"mp-castrow-h","aria-expanded":s?"true":"false","aria-controls":"mp-castlist",onClick:o.onToggle,title:"展开六个占卜体系的起卦入口：点一个就切过去，并用当前时刻起卦"},p("span",{className:"mp-castrow-t"},"起卦"),p("span",{className:"mp-castrow-l"},s?"六个占卜体系，点一下就起":Ti.map(I=>I.label).join(" · ")),p("i",{className:"mp-castrow-i","aria-hidden":"true"},s?"▴":"▾"));return s?p("div",{key:"cast",className:"mp-castrow open"},j,p("div",{key:"list",id:"mp-castlist",className:"mp-castlist"},Ti.map(I=>p("button",{key:I.sys,type:"button",className:"mp-castchip"+(o.tab===I.sys?" on":""),"data-cast":I.sys,"aria-pressed":o.tab===I.sys?"true":"false",title:I.tip,onClick:()=>o.onCast(I.sys)},I.label))),o.hasResult?p("div",{key:"ask",className:"mp-castask"},p("button",{type:"button",className:"mp-castgo",onClick:o.onAsk,title:"把这张盘和所问之事发进 DSH 对话窗（与下面的「问进对话」同一个通路）"},"把这张盘问进对话")):null):p("div",{key:"cast",className:"mp-castrow"},j)}function Wn(){const[o,s]=S("ziwei"),[j,I]=S("1990-05-12"),[se,le]=S("14:30"),[ge,ue]=S(!1),[ye,je]=S("female"),[Me,G]=S(""),[xe,V]=S("1992-08-15"),[H,B]=S("10:00"),[J,ie]=S("female"),[we,t]=S(""),[Se,mt]=S("bazi"),[Ke,ut]=S(!1),[Ka,Mt]=S("1990-01-01"),[Ve,Ee]=S("12:00"),[Ne,Ct]=S("male"),[Ca,Ya]=S(""),[Ja,Lt]=S("chaibu"),[sa,ha]=S(!0),[pi,Va]=S(()=>{try{return window.localStorage.getItem("dsh-metaphysics/nudge-off")==="1"}catch{return!1}}),[xa,va]=S(!0),[At,Tt]=S("same-day"),[La,Xa]=S(!1),[oa,_t]=S(""),[Aa,Ye]=S(""),[Et,Ta]=S(null),[,li]=S(0);ua(()=>{const a=f=>{if(!f.ctrlKey||!f.shiftKey||String(f.key||"").toLowerCase()!=="d")return;const k=window.__MPCompose;!k||!k.setDev||!k.devOn||(f.preventDefault(),k.setDev(!k.devOn()),li(q=>q+1))};return window.addEventListener("keydown",a),()=>window.removeEventListener("keydown",a)},[]);const[Wa,Qa]=S({}),[_a,gt]=S(null),[et,ft]=S([{year:"2019",kind:"career"},{year:"2022",kind:"love"}]),[ra,at]=S(null),[bt,tt]=S("开业"),[pa,it]=S("30"),[ya,Ot]=S(""),[la,Ht]=S(""),[ke,wa]=S("solar2lunar"),[Ea,$a]=S(""),[nt,Pt]=S(!1),[Ge,Oa]=S("time"),[ka,st]=S(""),[Ha,Dt]=S(""),[Xe,za]=S(""),[ta,Ft]=S(()=>new Array(St().total).fill(null)),[di,Rt]=S(0),[Pa,ci]=S(null),[ot,It]=S(()=>new Array(ii).fill(null)),[mi,Bt]=S(0),[Da,ht]=S("60"),[Fe,rt]=S("natal"),[Re,Fa]=S("9"),[ja,pt]=S("子"),[Ra,Gt]=S("午"),[Ue,xt]=S("assess"),[e,i]=S("李"),[n,l]=S(""),[r,m]=S("6"),[c,g]=S(!1),[u,b]=S(""),[d,y]=S(null),[$,M]=S(!1),[A,_]=S(""),[ne,F]=S(""),[D,ee]=S(null);ua(()=>{const a=document.querySelector(".mp-panel");if(!a)return;const f=!!d&&!$;a.classList.toggle("mp-locked",f),O&&O.lockParams&&O.lockParams(a,f)},[d,$,o]);const[R,T]=S(()=>Mn()),[oe,Q]=S(()=>Nt(Oi)==="flat"?"flat":"group"),[qe,X]=S(()=>{const a=Nt(Ei);return Array.isArray(a)?a:[]}),[$e,te]=S({}),[re,w]=S(null),[z,N]=S(()=>O.profilesLoad()),[v,W]=S(null),[de,fe]=S(""),[C,K]=S(""),[ae,U]=S(""),[ve,ze]=S(!1),[P,Ae]=S("three"),[Te,Ie]=S(""),[Oe,da]=S("general");function ca(){return oa.trim()||(d&&na(d.kind)?String(Te||"").trim():"")}ua(()=>{d&&d.r&&(aa.r=d.r,aa.q=ca(),aa.it=d.it||null);const a=d&&d.it;a&&a.error&&!$t.has(a.errorId||a.error)&&($t.size>40&&$t.clear(),$t.add(a.errorId||a.error),console.warn("[metaphysics] 解读未生成 "+(a.errorId||""),a.error))},[d,oa,Te]);const[Ia,ui]=S(null),[h,E]=S(Nt(_i)===!0),[be,me]=S(!1),[Ce,He]=S("time"),[Pe,Ut]=S(""),[Sa,Zt]=S(""),[Kt,Ji]=S(""),[ts,Na]=S(""),[gi,Yt]=S({birth:null,cast:null}),is=ea.find(a=>a.k===o)||ea[0],vt=o==="bazi"||o==="ziwei"||o==="hepan"||o==="trend"||o==="fengshui"||o==="name",We=Za(o),Vi=!(o==="meihua"&&Ce==="number"),Xi=o!=="tarot"&&o!=="mbti"&&o!=="constitution"&&Vi,Wi=Xi&&We!=="date",Xs=Wi,De=async(a,f,k,q)=>{const x=a||o,he=k||Ce,_e=x==="bazi"||x==="trend",ia=q&&typeof q.hourUnknown=="boolean"?q.hourUnknown:ge,Le=f||(_e&&ia?{date:j,time:"12:00"}:{date:j,time:se}),Qe=q&&q.gender?q.gender:ye,Ba=q&&typeof q.address=="string"?q.address:Me,yt=q&&typeof q.trueSolar=="boolean"?q.trueSolar:sa,lt=q&&typeof q.lateZi=="boolean"?q.lateZi:xa,bn=q&&typeof q.lines=="string"?q.lines:u,Wt=q&&typeof q.question=="string"?q.question:Te,yi=Ua(),hn=++Be,Ga=()=>hn!==Be;ee(null),U("");try{let qa=0,xn=null;ze(!0);try{await ct(x);const Z=window.__MP_LAST_LOAD;qa=Z&&typeof Z.ms=="number"?Z.ms:Ua()-yi,xn=Z&&typeof Z.cached=="boolean"?Z.cached:null}catch(Z){if(Ga())return;K(Z&&Z.message?Z.message:String(Z)),y(null);return}finally{Ga()||ze(!1)}if(Ga())return;const vn=`${Le.date}T${Le.time}`,L={system:x};if(L.shadow=x!=="mbti"&&x!=="constitution",L.trace=x==="liuyao"||x==="bazi"||x==="ziwei"||x==="qimen"||x==="daliuren",x!=="tarot"&&(L.datetime=vn),x==="bazi"||x==="ziwei"||x==="hepan"||x==="trend"){if(L.gender=Qe,L.trueSolar=yt,Ba.trim()){L.address=Ba.trim();try{const Z=await Y.geocodeAddress(L.address,{online:c});Z&&typeof Z.lon=="number"&&(L.longitude=Z.lon,L.geo=Z)}catch(Z){console.error("[metaphysics] 地址解析失败，退回内置表",Z)}if(Ga())return}(x==="bazi"||x==="ziwei")&&(L.cross=La),L.lateZi=lt,_e&&ia&&(L.hourUnknown=!0)}if(x==="liuyao"){const Z=Ze.parseLines(bn);Z.lines?L.lines=Z.lines:Z.warning&&U(Z.warning)}if(x==="qimen"&&(L.juMethod=Ja,L.lateZiHourMode=At,L.direction=Oe),x==="bazi"&&(L.verifyPast=6),x==="zeri"){L.startDate=Le.date,L.task=bt,L.days=Number(pa)||30,ya&&(L.shengXiao=ya);const Z=la.split(/[,，、\s]+/).filter(Boolean);Z.length&&(L.candidates=Z)}if(x==="xiaoliuren")if(L.mode=Ge,Ge==="number"){const Z=[ka,Ha,Xe].map(ma=>String(ma??"").trim());if(Z.some(ma=>ma===""||!Number.isFinite(Number(ma)))){K("报数起课要三个数，1 到 99 随口报就行，比如 7、13、29。"),y(null);return}L.num1=Number(Z[0]),L.num2=Number(Z[1]),L.num3=Number(Z[2])}else{L.date=Le.date;const Z=Number(String(Le.time).split(":")[0]);L.hour=Number.isFinite(Z)?Z:12}if(x==="mbti"){delete L.datetime;const Z=ta.slice();for(;Z.length&&Z[Z.length-1]==null;)Z.pop();Z.length&&(L.answers=Z)}if(x==="constitution"&&(delete L.datetime,L.answers=ot.slice()),x==="trend"&&_e&&ia&&(L.hourUnknown=!0),x==="trend"&&(L.toAge=Number(Da)||60),x==="fengshui"&&(L.action=Fe,Fe==="natal"?L.gender=Qe:(L.sitting=ja,L.facing=Ra,delete L.datetime,Fe==="xuankong"&&(L.period=Number(Re)||9))),x==="name"){if(L.action=Ue,L.surname=e.trim(),!L.surname||Ue==="assess"&&!n.trim()){K(Ue==="assess"?"起名要先填姓和名，一个字也行。":"起名要先填姓。"),y(null);return}Ue==="generate"?(L.gender=Qe,L.limit=Number(r)||6,L.trueSolar=yt,L.lateZi=lt):(L.givenName=n.trim(),(!Le.date||!Le.time)&&delete L.datetime)}if(x==="convert")if(L.system="convert",ke==="lunar2solar"){const Z=/^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(Ea).trim());if(!Z){K("农历日期要按「年-月-日」填，例如 2026-9-17；闰月单独勾选。");return}L.mode="lunar2solar",L.lunarYear=Number(Z[1]),L.lunarMonth=Number(Z[2]),L.lunarDay=Number(Z[3]),L.isLeapMonth=nt,delete L.datetime}else L.mode="solar2lunar";if(x==="tarot"&&(L.spread=P),x==="hepan"&&(L.chart=Se,L.partner={datetime:`${xe}T${H}`,gender:J,address:we.trim()||void 0,trueSolar:sa},Ke&&(L.partner2={datetime:`${Ka}T${Ve}`,gender:Ne,address:Ca.trim()||void 0,trueSolar:sa})),na(x)){if(!Wt.trim()){K("请先填写「所问之事」——一句话即可，例如：今年是否适合换工作？"),me(!0),y(null);return}me(!1),L.question=Wt.trim(),x==="liuyao"&&(L.direction=Oe)}if(x==="meihua"&&(L.mode=he,he==="number")){if(Pe.trim()===""||Sa.trim()===""){K("数字起卦需要填两个数（第一个数定上卦、第二个数定下卦）。"),y(null);return}if(L.upper=Number(Pe),L.lower=Number(Sa),!Number.isFinite(L.upper)||!Number.isFinite(L.lower)){K("两个数都要是数字，例如 17 和 29。"),y(null);return}Kt!==""&&(L.changing=Number(Kt))}x==="trend"&&!L.asOf&&Ze.todayStamp&&(L.asOf=Ze.todayStamp());const yn=Bn(`${Rn}|${JSON.stringify(L)}`),Qt=Gn(yn);if(Qt&&Qt.result&&Qt.result.kind===x){if(Ga())return;si.cacheHits++,y(Qt.result),M(!1),ee({engineMs:qa,computeMs:0,cached:!0,totalMs:Ua()-yi,renderMs:null}),Ta(null),gt(null),Qa({}),at(null),K(""),Na("");return}const Bs=Ua();si.computeHits++;const Ma=Y.compute(L),Gs=Ua()-Bs;let wi=null;try{wi=O.shadowTrack?O.shadowTrack(Ma):null}catch{wi=null}let $i=null;if(x==="bazi"&&!ia){if(!Y.buildChenggu){try{await ct("chenggu")}catch{}if(Ga())return}if(Y.buildChenggu)try{$i=Y.buildChenggu({year:Number(Le.date.slice(0,4)),month:Number(Le.date.slice(5,7)),day:Number(Le.date.slice(8,10)),hour:Number(Le.time.slice(0,2)),minute:Number(Le.time.slice(3,5)),lateZi:lt})}catch{$i=null}}let ki=null;if(x==="bazi"&&Y.buildMarriage)try{ki=Y.buildMarriage(Ma)}catch{ki=null}let zi=null;if(x==="bazi"&&Y.buildFacets)try{zi=Y.buildFacets(Ma)}catch{zi=null}let ji=null;if(x==="bazi")try{ji=Y.compute({system:"trend",datetime:vn,gender:Qe,toAge:100,trueSolar:yt,lateZi:lt,...Ze.todayStamp?{asOf:L.asOf||Ze.todayStamp()}:{},...L.dst!==void 0?{dst:L.dst}:{},...L.address?{address:L.address}:{},...typeof L.longitude=="number"?{longitude:L.longitude}:{},...L.geo?{geo:L.geo}:{}})}catch{ji=null}let Si=null;if(Y.caliberCompare)try{Si=Y.caliberCompare(L)}catch{Si=null}const Us=na(x)||x==="qimen"?{question:na(x)?Wt.trim():"",direction:Oe}:void 0,ei=Y.interpret?Y.interpret(Ma,Us):null;ei&&Ma.cross&&Y.crossSection&&(ei.sections=[...ei.sections||[],Y.crossSection(Ma.cross)]);const Zs=Za(x)==="cast"&&(x!=="meihua"||he==="time"),wn={kind:x,r:Ma,it:ei,at:Le,timed:Zs,trend:ji,caliber:Si,shadowDiff:wi,chenggu:$i,marriage:ki,life:zi,gender:Qe,address:Ba,trueSolar:yt,lateZi:lt};y(wn),M(!1),Un(yn,{result:wn,at:Date.now()});const $n=Z=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>Z>1?$n(Z-1):kn()):setTimeout(kn,0)},kn=()=>{hn===Be&&ee({engineMs:qa,computeMs:Gs,cached:xn,totalMs:Ua()-yi,renderMs:null})};if($n(2),Ta(null),gt(null),Qa({}),at(null),K(""),Na(""),x!=="tarot"&&x!=="mbti"&&x!=="constitution"){const Z=!!(_e&&ia),ma={kind:x,date:Le.date,time:Z?"":Le.time,hourUnknown:Z,gender:Qe,address:Ba,trueSolar:yt,lateZi:lt,lines:x==="liuyao"?bn:"",question:na(x)?Wt.trim():"",direction:Oe,spread:P,mhMode:he,upper:Pe,lower:Sa,changing:Kt,...x==="qimen"?{qimenRule:Ja,qLateZi:At}:{},...x==="zeri"?{task:bt,days:pa,shengXiao:ya,zCand:la}:{},...x==="xiaoliuren"?{xlrMode:Ge,num1:ka,num2:Ha,num3:Xe}:{},...x==="trend"?{toAge:Da}:{},...x==="fengshui"?{fsMode:Fe,fsPeriod:Re,sitting:ja,facing:Ra}:{},...x==="name"?{nnMode:Ue,surname:e,givenName:n,limitN:r}:{},...x==="convert"?{convMode:ke,lunarDate:Ea,leapMonth:nt}:{},...x==="hepan"?{hpChart:Se,partnerDate:xe,partnerTime:H,partnerGender:J,partnerAddress:we,thirdOn:Ke,p2Date:Ka,p2Time:Ve,p2Gender:Ne,p2Address:Ca}:{},label:Ln(x,Ma),at:Date.now()};T(Ks=>{const zn=[ma,...Ks.filter(Ys=>!Cn(Ys,ma))].slice(0,20);return Ai(zn),zn}),x!=="tarot"&&x!=="mbti"&&x!=="constitution"&&(aa.entry=ma),mn(!1)}}catch(qa){if(Ga())return;K(qa&&qa.message?qa.message:String(qa)),y(null)}},ns=async a=>{const f=Za(a),k=++Be;if(K(""),a==="mbti"){U(""),ze(!0);try{await ct(a)}catch(x){k===Be&&K(x&&x.message?x.message:String(x))}finally{k===Be&&ze(!1)}if(k!==Be)return;s(a),ta.filter(x=>x!=null).length>=ga?De(a):y(null);return}if(a==="constitution"){U(""),ze(!0);try{if(await ct(a),k===Be&&!Pa){const x=Y.compute({system:"constitution"});x&&x.paper&&ci(x)}}catch(x){k===Be&&K(x&&x.message?x.message:String(x))}finally{k===Be&&ze(!1)}if(k!==Be)return;s(a),ot.filter(x=>x!=null).length>=fa?De(a):y(null);return}if(s(a),f==="none"){De(a);return}const q=gi[f]||(f==="cast"||f==="date"?oi():{date:Ri.date,time:Ri.time});I(q.date),le(q.time),De(a,q)},ss=a=>{ea.some(f=>f.k===a)&&X(f=>{const k=(f||[]).filter(x=>x&&x.tab&&x.tab!==a),q=[{tab:a,at:Date.now()}].concat(k).slice(0,Hi);return qt(Ei,q),q})},Qi=a=>{const f=a==="flat"?"flat":"group";Q(f),qt(Oi,f)},Jt=a=>{ss(a),ns(a)},os=()=>{const a=!h;E(a),qt(_i,a)},rs=a=>{Jt(a)},ps=a=>{I(a),We!=="none"&&Yt(f=>Object.assign({},f,{[We]:{date:a,time:se}}))},ls=a=>{le(a),We!=="none"&&Yt(f=>Object.assign({},f,{[We]:{date:j,time:a}}))},Ws=()=>{const a=oi();I(a.date),le(a.time),We!=="none"&&Yt(f=>Object.assign({},f,{[We]:null})),De(o,a)},fi=()=>{if(o==="mbti"){const a=ta.filter(f=>f!=null).length;if(a<ga){U(`先答满 ${ga} 题再看结果（现答 ${a} 题，还差 ${ga-a} 题）。`);return}De(o);return}if(o==="constitution"){const a=ot.filter(f=>f!=null).length;if(a<fa){U(`先答满 ${fa} 题再看结果（现答 ${a} 题，还差 ${fa-a} 题）。`);return}De(o);return}if(We==="cast"&&!gi[We]){const a=oi();I(a.date),le(a.time),De(o,a);return}De(o)},ds=()=>{const a={date:"1990-05-12",time:"14:30"};s("bazi"),je("male"),G("河北石家庄"),Yt(f=>Object.assign({},f,{birth:a})),I(a.date),le(a.time),De("bazi",a,null,{gender:"male",address:"河北石家庄"})},en=a=>{He(a),De(o,{date:j,time:se},a)},cs=()=>!!(window.matchMedia&&window.matchMedia("(max-width: 640px)").matches),bi=()=>Ia===null?cs():Ia,Vt=(a,f,k)=>{if(!f)return;const q=he=>{a.textContent=he?"已复制":"复制失败",setTimeout(()=>{a.textContent=k},1400)},x=()=>{try{const he=document.createElement("textarea");he.value=f,he.setAttribute("readonly",""),he.style.position="fixed",he.style.opacity="0",document.body.appendChild(he),he.select();const _e=!!(document.execCommand&&document.execCommand("copy"));return document.body.removeChild(he),_e}catch{return!1}};try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(f).then(()=>q(!0),()=>q(x()));return}}catch{}q(x())},ms=a=>Vt(a,a.getAttribute("data-shadow-copy")||"","复制 ID"),us=a=>Vt(a,a.getAttribute("data-handle-copy")||"","复制句柄"),gs=a=>{const f=a.closest(".mp-trace-layer")||document.getElementById("mp-trace-layer"),k=f&&f.querySelector("[data-trace-md]");Vt(a,k?k.value:"","复制 Markdown")},fs=()=>{try{return String(location.href).split("#")[0]}catch{return""}},bs=()=>{if(!d||!d.r)return null;try{return Y.askPackages?Y.askPackages(d.r,{question:ca(),interpret:d.it,base:fs()}):null}catch{return null}},an=[["full","复制提问","完整提问：盘面摘要 + 阅读层次 + 回答骨架，粘进任何对话窗都能用"],["brief","复制精简","一句话版：体系 + 盘号 + 你的问题，够助手认出是哪张盘"],["structured","复制参数","结构化参数（JSON）：助手可直接照 args 调 compute，不必解析自然语言"],["link","复制深链","深链：把这张盘的参数编进链接，打开即还原同一张盘（换台机器、发给朋友都行）"]],hs=(a,f)=>{const k=bs();if(!k){Ye("还没有可以复制的盘：先排一张。");return}const q=a==="link"?k.link:k[a];if(!q){Ye(a==="link"?"这张盘没拿到盘号（随机抽牌只复现参数、不复现牌面），深链做不出来；用「复制提问」那一档。":"这一档暂时是空的，换一档试试。");return}Vt(f,q,an.find(x=>x[0]===a)[1]),a==="link"&&Ye("深链已复制：打开就还原这张盘，也可以直接发给别人。链接里是编码不是加密，别公开贴。")},xs=()=>{const a=document.getElementById("mp-trace-layer");if(!a)return;a.classList.add("open"),a.setAttribute("aria-hidden","false");const f=a.querySelector("[data-trace-close]");f&&f.focus&&f.focus()},tn=()=>{const a=document.getElementById("mp-trace-layer");if(!a)return;a.classList.remove("open"),a.setAttribute("aria-hidden","true");const f=document.querySelector("[data-trace-open]");f&&f.focus&&f.focus()},vs=a=>{const f=a.target&&a.target.closest?a.target.closest("[data-shadow-copy]"):null;if(f){ms(f);return}const k=a.target&&a.target.closest?a.target.closest("[data-handle-copy]"):null;if(k){us(k);return}if(a.target&&a.target.closest?a.target.closest("[data-trace-open]"):null){xs();return}const x=a.target&&a.target.closest?a.target.closest("[data-trace-copy]"):null;if(x){gs(x);return}if(a.target&&a.target.closest?a.target.closest("[data-mp-askcopy]"):null){$s();return}if(a.target&&a.target.closest?a.target.closest("[data-trace-close]"):null){tn();return}const ia=a.target&&a.target.closest?a.target.closest(".mp-it-head"):null;if(!ia)return;const Le=ia.closest(".mp-it");if(!Le)return;const Qe=!Le.classList.contains("folded");Le.classList.toggle("folded",Qe),ia.setAttribute("aria-expanded",Qe?"false":"true");const Ba=ia.querySelector(".mp-it-hint");Ba&&(Ba.textContent=Qe?"点击展开":"点击收起"),ui(Qe)},nn=(a,f)=>{if(!d||!(na(o)||o==="qimen"))return;const k={question:na(o)?(f===void 0?Te:f).trim():"",direction:a===void 0?Oe:a},q=Y.interpret?Y.interpret(d.r,k):null;let x=d.r;if((o==="liuyao"||o==="qimen")&&x&&x.trace&&Y.buildTrace)try{const he=o==="liuyao"?Y.buildTrace(x,{direction:k.direction,gender:x.useGod&&x.useGod.gender||"male",refresh:!0}):Y.buildTrace(x,{direction:k.direction});he&&(x=Object.assign({},x,{trace:he}))}catch{}y(Object.assign({},d,{r:x,it:q}))},ys=a=>!a||!a.timed||!a.at?"":`<div class="mp-cast">起卦时刻：<b>${a.at.date} ${a.at.time}</b>　（来自你的本机时间，点「此刻」可重新取当下）</div>`,ws=()=>{try{const a=d&&d.r&&d.r.summary?d.r.summary:"";if(!a)return;navigator.clipboard.writeText(a).then(()=>Na("已复制"),()=>Na("复制失败"))}catch{Na("复制失败")}},$s=()=>{if(!d||!d.r||!window.Engine||!window.Engine.buildEventPrompt)return;const a=Ze&&Ze.kindOfDirection?Ze.kindOfDirection(Oe):"other";let f;try{f=window.Engine.buildEventPrompt(d.r,{question:(Te||"").trim(),kind:a,gender:ye,timeKnown:!0})}catch{f=null}f&&f.text&&navigator.clipboard.writeText(f.text).then(()=>Na("已复制问事提示"),()=>Na("复制失败"))},sn=()=>{if(!(!d||!d.r||!oa.trim()))try{Ta(Y.followup?Y.followup(d.r,oa.trim()):null)}catch(a){Ta({question:oa.trim(),ok:!1,answer:"追问失败："+(a&&a.message?a.message:a),evidence:[],confidence:"弱"})}},on=()=>{if(!(!d||!d.r))try{const a=Y.askPrompt?Y.askPrompt(d.r,{question:ca(),interpret:d.it}):null,f=a&&a.text?a.text:String(d.r.summary||"");if(Ki(f)){Ye("已发到对话窗，往下看回复。");return}const k="（"+Ii()+"）";navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(f).then(()=>Ye("对话输入框还没就绪"+k+"，已复制提问；粘进对话窗回车即可。"),()=>Ye("对话输入框还没就绪"+k+"，复制也没成功；先点「复制文字结果」再贴。")):Ye("对话输入框还没就绪"+k+"；先点「复制文字结果」再贴进对话窗。")}catch(a){Ye("发到对话窗失败："+(a&&a.message?a.message:a))}},ks=()=>{const a=[],f=window.__MP_VER||"未知";a.push("# 命理插件反馈"),a.push(""),a.push("## 我遇到的情况"),a.push(""),a.push("（在这里写一句就好：哪里不对 / 读不懂哪一段 / 算得和别人不一样 / 想加什么。下面这些是自动带的复现信息，不用改。）"),a.push(""),a.push("## 复现信息"),a.push(""),a.push("- 插件版本：v"+f);{const x=Number(window.__MP_UNRELEASED)||0;x&&a.push("- 未发版改动："+x+" 项（版本号未变，说明这份产物比 v"+f+" 新）")}const k=ea.find(x=>x.k===o)?.label||o;if(a.push("- 体系："+k+(k===o?"":"（"+o+"）")),Te&&a.push("- 所问之事："+Te),Oe&&Oe!=="general"){const x=(Array.isArray(Y.DIRECTIONS)?Y.DIRECTIONS:[]).find(he=>he.key===Oe);a.push("- 询问方向："+(x?x.label:Oe))}a.push(""),a.push("### 输入"),a.push(""),a.push("```"),(Za(o)==="time"||Za(o)==="date")&&(a.push(`日期：${j}`),Za(o)==="time"&&a.push(`时刻：${ge?"（未知，按三柱排）":se}`),a.push(`性别：${ye==="male"?"男":"女"}`),Me&&a.push(`出生地：${Me}`),a.push(`真太阳时：${sa?"开":"关"}　晚子时换日：${xa?"开":"关"}`),o==="qimen"&&a.push(`奇门取局：${Ja}`),La&&a.push("交叉验证：开"));const q={合盘:()=>{a.push(`对方：${xe} ${H} ${J==="male"?"男":"女"}${we?" "+we:""}（${Se} 盘）`),Ke&&a.push(`第三方：${Ka} ${Ve} ${Ne==="male"?"男":"女"}${Ca?" "+Ca:""}`)},择日:()=>{a.push(`事项：${bt}　起算：${j}　天数：${pa}${ya?"　属相："+ya:""}${la?"　候选日："+la:""}`)},起名:()=>{a.push(`姓：${e||"（未填）"}　名：${n||"（未填）"}　模式：${Ue}${Ue==="generate"?"　候选数："+(r||"默认"):""}`)},公农历:()=>{a.push(`模式：${ke}${Ea?"　农历输入："+Ea:""}${nt?"（闰月）":""}`)},小六壬:()=>{a.push(`模式：${Ge}${Ge==="number"?`　报数：${ka}/${Ha}/${Xe}`:""}`)},风水:()=>{a.push(`动作：${Fe}${Fe==="natal"?"":`　坐：${ja}　向：${Ra}`}${Fe==="xuankong"?`　运：${Re}`:""}`)}};if(q[k]&&q[k](),a.push("```"),a.push(""),C&&(a.push("### 报错原文"),a.push(""),a.push("```"),a.push(String(C)),a.push("```"),a.push("")),d&&d.r){a.push("### 结果摘要（引擎原文，前 40 行）"),a.push(""),a.push("```");const x=String(d.r.summary||(Y.renderText?Y.renderText(d.r):"")||"");a.push(x.split(`
`).slice(0,40).join(`
`)),a.push("```"),d.r.handle&&(a.push(""),a.push("盘号（可据此复现同一张盘）：`"+d.r.handle+"`"))}else a.push("### 结果摘要"),a.push(""),a.push("（这次没有生成盘面——如果是在排盘过程中出错，上面的「报错原文」就是关键。）");return a.push(""),a.push("## 联系渠道"),a.push(""),a.push("- GitHub issue：https://github.com/xuanfu-web/dsh-metaphysics/issues"),a.push("- 邮件：1129440028@qq.com"),a.push("- 微信群：dsh-metaphysics"),a.join(`
`)},rn=()=>{const a=ks();try{if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(a).then(()=>{_("已复制"),F("粘到 issue / 邮件 / 群里即可")}).catch(()=>{_("复制失败"),F("可改用「存 .md」或手动选中")});else{const f=document.createElement("textarea");f.value=a,f.style.cssText="position:fixed;left:-9999px;top:0",document.body.appendChild(f),f.select();const k=document.execCommand&&document.execCommand("copy");f.remove(),_(k?"已复制":"复制失败"),F(k?"粘到 issue / 邮件 / 群里即可":"可改用「存 .md」或手动选中")}}catch{_("复制失败"),F("可改用「存 .md」")}setTimeout(()=>{_(""),F("")},4e3)},zs=()=>{try{rn()}catch{}const a=encodeURIComponent("[反馈] "+(ea.find(f=>f.k===o)?.label||o)+(C?"：报错":"：使用问题"));try{window.open("https://github.com/xuanfu-web/dsh-metaphysics/issues/new?title="+a,"_blank","noopener")}catch{F("浏览器拦了弹窗，请手动打开 GitHub issues")}},js=()=>{if(!(!d||!d.r))try{const a=Y.renderText?Y.renderText(d.r):d.r.summary||"",f=new Blob([a],{type:"text/markdown;charset=utf-8"}),k=document.createElement("a");k.href=URL.createObjectURL(f),k.download=`烛微命盘报告-${d.r.system}.md`,document.body.appendChild(k),k.click(),k.remove(),setTimeout(()=>URL.revokeObjectURL(k.href),2e3)}catch(a){console.error("[metaphysics] 导出失败",a)}},Ss=()=>{if(!(!d||!d.r))try{const a=O.summaryCardPNG?O.summaryCardPNG(d.r,d.it):"";if(!a){Na("当前环境不支持 Canvas 导出");return}const f=document.createElement("a");f.href=a,f.download=`烛微命盘摘要-${d.r.system}.png`,document.body.appendChild(f),f.click(),f.remove()}catch(a){console.error("[metaphysics] 长图导出失败",a)}},pn={fontSize:12,padding:"5px 12px"},Ns=()=>{!d||!d.r||!d.r.past||gt(Y.verifyFit?Y.verifyFit(d.r.past.rows,Wa):null)},qs=()=>{if(!(!d||d.kind!=="bazi"))try{const a=d.at||{date:j,time:se},[f,k,q]=String(a.date).split("-").map(Number),[,x]=String(a.time).split(":").map(Number),he=et.filter(_e=>Number(_e.year)).map(_e=>({year:Number(_e.year),kind:_e.kind}));at(Y.rectifyBirth?Y.rectifyBirth({base:{year:f,month:k,day:q,minute:Number.isFinite(x)?x:0},gender:d.gender||ye,events:he,lateZi:typeof d.lateZi=="boolean"?d.lateZi:xa,trueSolar:typeof d.trueSolar=="boolean"?d.trueSolar:sa,address:String(d.address||"").trim()||void 0}):{error:"当前客户端未加载生时校正模块"})}catch(a){at({error:a&&a.message?a.message:String(a)})}},ce=(a,f)=>p("label",{className:"mp-field"},p("span",{className:"mp-lbl"},a),f),ln=a=>{s(a.kind),a.date&&I(a.date),a.time&&le(a.time),ue(!!a.hourUnknown),a.gender&&je(a.gender),G(a.address||""),typeof a.trueSolar=="boolean"&&ha(a.trueSolar),typeof a.lateZi=="boolean"&&va(a.lateZi),b(a.lines||""),Ie(a.question||""),da(a.direction||"general"),Ae(a.spread||{1:"one",3:"three",5:"five"}[a.count]||"three"),He(a.mhMode||"time"),Ut(a.upper||""),Zt(a.lower||""),Ji(a.changing||""),a.kind==="qimen"&&(typeof a.qimenRule=="string"&&Lt(a.qimenRule),typeof a.qLateZi=="string"&&Tt(a.qLateZi)),a.kind==="zeri"&&(typeof a.task=="string"&&tt(a.task),a.days!=null&&it(String(a.days)),typeof a.shengXiao=="string"&&Ot(a.shengXiao),typeof a.zCand=="string"&&Ht(a.zCand)),a.kind==="xiaoliuren"&&(Oa(a.xlrMode==="number"?"number":"time"),a.num1!=null&&st(String(a.num1)),a.num2!=null&&Dt(String(a.num2)),a.num3!=null&&za(String(a.num3))),a.kind==="trend"&&a.toAge!=null&&ht(String(a.toAge)),a.kind==="fengshui"&&(typeof a.fsMode=="string"&&rt(a.fsMode),a.fsPeriod!=null&&Fa(String(a.fsPeriod)),typeof a.sitting=="string"&&pt(a.sitting),typeof a.facing=="string"&&Gt(a.facing)),a.kind==="name"&&(typeof a.nnMode=="string"&&xt(a.nnMode),typeof a.surname=="string"&&i(a.surname),typeof a.givenName=="string"&&l(a.givenName),a.limitN!=null&&m(String(a.limitN))),a.kind==="convert"&&(typeof a.convMode=="string"&&wa(a.convMode),typeof a.lunarDate=="string"&&$a(a.lunarDate),typeof a.leapMonth=="boolean"&&Pt(a.leapMonth)),a.kind==="hepan"&&(a.hpChart&&mt(a.hpChart),typeof a.partnerDate=="string"&&V(a.partnerDate),typeof a.partnerTime=="string"&&B(a.partnerTime),typeof a.partnerGender=="string"&&ie(a.partnerGender),typeof a.partnerAddress=="string"&&t(a.partnerAddress),typeof a.thirdOn=="boolean"&&ut(a.thirdOn),typeof a.p2Date=="string"&&Mt(a.p2Date),typeof a.p2Time=="string"&&Ee(a.p2Time),typeof a.p2Gender=="string"&&Ct(a.p2Gender),typeof a.p2Address=="string"&&Ya(a.p2Address)),me(!1),w(a)},Ms=()=>{T([]),Ai([])},[Je,Xt]=S(()=>{try{return O.casesLoad()}catch{return[]}}),[Cs,dn]=S(!1),[hi,cn]=S("all"),[Ls,mn]=S(!1),As=()=>{try{Xt(O.casesLoad())}catch{}cn("all"),dn(!0)},xi=()=>dn(!1),Ts=a=>a==="all"?Je.length:Je.filter(f=>f.status===a).length,vi=hi==="all"?Je:Je.filter(a=>a.status===hi),_s=()=>{if(!aa.entry){U("这张盘没有可存的参数，重排一次再存。");return}try{const a=O.casesAdd(aa.entry);a&&a.ok?(Xt(a.list),mn(!0)):U("卦例没能存进本机（存储被禁用或已满），排盘不受影响。")}catch{U("卦例没能存进本机（存储被禁用或已满），排盘不受影响。")}},un=a=>{const f=a?O.casesExportMasked(Je):O.casesExport(Je);if(!f){U("还没有可导出的卦例");return}try{const k=new Blob([f],{type:"application/x-ndjson;charset=utf-8"}),q=URL.createObjectURL(k),x=document.createElement("a");x.href=q,x.download=a?`metaphysics-cases-masked-${new Date().toISOString().slice(0,10)}.jsonl`:`metaphysics-cases-${new Date().toISOString().slice(0,10)}.jsonl`,document.body.appendChild(x),x.click(),x.remove(),setTimeout(()=>{try{URL.revokeObjectURL(q)}catch{}},1e3),U(a?`已导出 ${Je.length} 条卦例（脱敏：去年份、时刻整点化、去出生地）`:`已导出 ${Je.length} 条卦例（JSONL）`)}catch(k){U("导出失败："+(k&&k.message?k.message:"当前环境不支持下载"))}},Es=a=>{const f=a.entry||{},k=new Date(a.at),q=x=>String(x).padStart(2,"0");return p("div",{key:a.id,className:"mp-case"},p("button",{className:"mp-case-main",onClick:()=>{ln(Object.assign({},f)),xi()},title:[f.date,f.hourUnknown?"时辰未知":f.time,f.address].filter(Boolean).join(" ")||"点一下回填这组参数并重排"},p("b",null,O.profKindLabel(f.kind)),p("span",null,f.label||a.question||"—"),p("i",null,`${q(k.getMonth()+1)}-${q(k.getDate())} ${q(k.getHours())}:${q(k.getMinutes())}`)),p("select",{className:"mp-case-sel",value:a.status,title:"标应验状态",onChange:x=>Xt(O.casesSetStatus(a.id,x.target.value))},O.CASE_STATUS.map(x=>p("option",{key:x,value:x},O.caseStatusLabel(x)))),p("button",{className:"mp-case-del",title:"删除这条",onClick:()=>Xt(O.casesRemove(a.id))},"删"))},Os=["bazi","ziwei","trend"],gn=a=>{s(a.kind),I(a.date),a.time&&le(a.time),ue(!!a.hourUnknown),a.gender&&je(a.gender),G(a.address||""),ha(a.trueSolar!==!1),va(a.lateZi!==!1)},Hs=a=>{const f=O.profEvent(a.target);if(!f)return;const k=x=>z.find(he=>he.id===x),q=a.currentTarget.querySelector(".mp-prof-name");if(fe(""),f.action==="use"){const x=k(f.id);if(!x)return;if(!O.profUsable(x)){U("这张档案没有出生时刻，先补上时刻再存一次。");return}ba="",N(O.profilesTouch(x.id)),gn(x),De(x.kind,{date:x.date,time:x.hourUnknown?"12:00":x.time},void 0,{gender:x.gender||void 0,address:x.address||"",hourUnknown:!!x.hourUnknown,trueSolar:x.trueSolar!==!1,lateZi:x.lateZi!==!1});return}if(f.action==="edit"){const x=k(f.id);if(!x)return;gn(x),ba=x.label,W(x.id);return}if(f.action==="cancel"){ba="",W(null);return}if(f.action==="pin"){N(O.profilesPin(f.id));return}if(f.action==="del"){if(de!==f.id){fe(f.id);return}N(O.profilesRemove(f.id)),v===f.id&&(ba="",W(null)),U("已从本机删除这张档案卡（不影响已经排出来的盘）。");return}if(f.action==="put"){const x=v,he=O.profFromForm({kind:o,date:j,time:se,hourUnknown:ge,gender:ye,address:Me,trueSolar:sa,lateZi:xa},q?q.value:ba,v||void 0);if(!he){U("先填好出生日期（和时刻），再存档案。");return}const _e=O.profilesPut(he);if(!_e.ok){U("档案没能存进本机（存储被禁用或已满），排盘不受影响。");return}N(_e.list),ba="",W(null),q&&(q.value=""),U(`${x?"已更新档案":"已存入我的命盘"}「${_e.item.label}」。`)}},Ps=a=>{const f=a.target&&a.target.closest?a.target.closest(".mp-prof-name"):null;f&&(ba=f.value)},Ds=a=>{const f=Y.formOf?Y.formOf(a):null;if(!f){De("ziwei");return}const k=ea.some(_e=>_e.k===f.tab)?f.tab:"ziwei",q={date:f.date||j,time:f.time||se},x=f.lines===void 0?void 0:Array.isArray(f.lines)?f.lines.join(" "):String(f.lines);f.date&&I(f.date),f.time&&le(f.time),f.gender&&je(f.gender),typeof f.address=="string"&&G(f.address),typeof f.trueSolar=="boolean"&&ha(f.trueSolar),typeof f.lateZi=="boolean"&&va(f.lateZi),x!==void 0&&b(x),f.question&&Ie(f.question),s(k);const he=Y.restNote?Y.restNote(f):"";Ye(`已按深链还原：${a.label}${f.question?`｜${f.question}`:""}${he?`　${he}`:""}`),De(k,q,void 0,{gender:f.gender,address:f.address,trueSolar:f.trueSolar,lateZi:f.lateZi,lines:x,question:f.question})};ua(()=>{let a=!1;const f=Be;return(async()=>{let k=null;try{await ct(o);const q=typeof location<"u"?String(location.href):"";q&&q.indexOf("mp=")>=0&&window.Engine&&window.Engine.parseAskLink&&(k=window.Engine.parseAskLink(q))}catch{k=null}if(!(a||Be!==f)){if(k&&k.ok)try{Ds(k);return}catch{}De("ziwei")}})(),()=>{a=!0}},[]),ua(()=>{if(!re)return;const a=re.kind;w(null),De(a)},[re]),ua(()=>{const a=f=>{if(f.key!=="Escape")return;const k=document.getElementById("mp-trace-layer");k&&k.classList.contains("open")&&tn()};return document.addEventListener("keydown",a),()=>document.removeEventListener("keydown",a)},[]);const fn=(qe||[]).filter(a=>a&&ea.some(f=>f.k===a.tab)).slice(0,Hi),Fs=a=>(ea.find(f=>f.k===a)||{}).label||a,Rs=({k:a,label:f,tip:k,wide:q})=>p("button",{key:a,type:"button",title:k,className:"mp-tool"+(q?" wide":"")+(o===a?" on":""),"data-tab":a,onClick:()=>Jt(a)},p("b",null,f),p("span",null,k)),Is=[p("div",{key:"profiles",className:"mp-profwrap",onClick:Hs,onInput:Ps,dangerouslySetInnerHTML:{__html:O.profilesHTML(z,{editingId:v,armedDel:de,bar:Os.indexOf(o)>=0?O.profilesBarHTML({editingId:v,name:ba}):""})}}),p("section",{key:"start",className:"mp-start","aria-label":"选择要算的事"},p("div",{className:"mp-start-top"},p("div",{className:"mp-recent",hidden:fn.length===0},p("span",{className:"mp-recent-lbl"},"最近用过"),p("span",{className:"mp-recent-list"},fn.map(a=>p("button",{key:a.tab,type:"button",className:"mp-rc",onClick:()=>Jt(a.tab)},Fs(a.tab),p("i",null,Zn(a.at)))))),p("div",{className:"mp-viewsw",role:"group","aria-label":"首屏视图"},p("button",{type:"button",className:oe==="group"?"on":"","aria-pressed":oe==="group"?"true":"false",onClick:()=>Qi("group")},"分组"),p("button",{type:"button",className:oe==="flat"?"on":"","aria-pressed":oe==="flat"?"true":"false",onClick:()=>Qi("flat")},"平铺"))),oe==="group"?p("div",{className:"mp-groups"},Fn.map(a=>{const f=!!$e[a.title],k=Math.max(0,a.items.length-4);return p("section",{key:a.title,className:"mp-tgroup"+(f?" open":"")},p("div",{className:"mp-tgroup-head"},p("h2",null,a.title),p("p",null,a.hint)),p("div",{className:"mp-ttools"},a.items.map(Rs),k>0?p("button",{key:"more",type:"button",className:"mp-tmore","aria-expanded":f?"true":"false",onClick:()=>te(q=>Object.assign({},q,{[a.title]:!f}))},f?"收起":`还有 ${k} 个`):null))})):null),p("div",{key:"tabs",className:"mp-tabs"+(oe==="flat"?"":" hide"),role:"tablist","aria-label":"命理体系"},ea.map(a=>p("button",{key:a.k,role:"tab","aria-selected":o===a.k?"true":"false",tabIndex:o===a.k?0:-1,className:"mp-tab"+(o===a.k?" on":""),onClick:()=>Jt(a.k)},a.label))),p("div",{key:"head",className:"mp-panel"},Xn({tab:o,open:h,onToggle:os,onCast:rs,onAsk:on,hasResult:!!d}),p("div",{className:"mp-row"},Xi?ce(vt?"出生日期（公历）":We==="date"?"日期（公历）":"起卦日期（公历）",p(ti,{value:j,onChange:ps,onInvalid:()=>U("日期请按「年-月-日」填写，例如 1990-05-12。")})):null,Wi?ce(vt?"出生时刻":"起卦时刻",p("input",{className:"mp-input",type:"time",value:se,disabled:ge&&(o==="bazi"||o==="trend"),onChange:a=>ls(a.target.value)})):null,o==="bazi"||o==="trend"?p("label",{className:"mp-chk",title:"不知道出生时辰时勾这里：不排时柱，起运按日估算，结果首行会写明"},p("input",{type:"checkbox",checked:ge,onChange:a=>ue(a.target.checked)})," 时辰未知"):null,vt?ce("性别",p("select",{className:"mp-input",value:ye,onChange:a=>je(a.target.value)},p("option",{value:"female"},"女"),p("option",{value:"male"},"男"))):null,vt?ce("出生地（省/市即可）",p("input",{className:"mp-input",placeholder:"如 河北石家庄 / 成都",value:Me,onChange:a=>G(a.target.value)})):null,o==="bazi"||o==="ziwei"?p("label",{className:"mp-field mp-checks"},p("input",{type:"checkbox",checked:La,onChange:a=>Xa(a.target.checked)}),p("span",{className:"mp-lbl"},"八字 × 紫微 交叉验证")):null,o==="hepan"?ce("对方出生日期",p(ti,{value:xe,onChange:V,onInvalid:()=>U("对方出生日期请按「年-月-日」填写，例如 1992-08-15。")})):null,o==="hepan"?ce("对方出生时刻",p("input",{className:"mp-input",type:"time",value:H,onChange:a=>B(a.target.value)})):null,o==="hepan"?ce("对方性别",p("select",{className:"mp-input",value:J,onChange:a=>ie(a.target.value)},p("option",{value:"female"},"女"),p("option",{value:"male"},"男"))):null,o==="hepan"?ce("合盘方式",p("div",{className:"mp-seg"},p("button",{className:Se==="bazi"?"on":"",onClick:()=>mt("bazi")},"八字"),p("button",{className:Se==="ziwei"?"on":"",onClick:()=>mt("ziwei")},"紫微"))):null,o==="hepan"?ce("对方出生地（可空）",p("input",{className:"mp-input",placeholder:"如 四川成都",value:we,onChange:a=>t(a.target.value)})):null,o==="hepan"?p("label",{className:"mp-field mp-checks"},p("input",{type:"checkbox",checked:Ke,onChange:a=>ut(a.target.checked)}),p("span",{className:"mp-lbl"},"三方合盘（加入第三人）")):null,o==="hepan"&&Ke?ce("第三方出生日期",p(ti,{value:Ka,onChange:Mt,onInvalid:()=>U("第三方出生日期请按「年-月-日」填写，例如 1990-01-01。")})):null,o==="hepan"&&Ke?ce("第三方出生时刻",p("input",{className:"mp-input",type:"time",value:Ve,onChange:a=>Ee(a.target.value)})):null,o==="hepan"&&Ke?ce("第三方性别",p("select",{className:"mp-input",value:Ne,onChange:a=>Ct(a.target.value)},p("option",{value:"female"},"女"),p("option",{value:"male"},"男"))):null,o==="hepan"&&Ke?ce("第三方出生地（可空）",p("input",{className:"mp-input",placeholder:"如 广东广州",value:Ca,onChange:a=>Ya(a.target.value)})):null,o==="qimen"?p("fieldset",{key:"qmr",className:"mp-qmrule"},p("legend",{className:"mp-lbl"},"换局规则"),p("div",{className:"mp-qmopts",role:"radiogroup","aria-label":"奇门换局规则"},[["chaibu","拆补"],["chaoshen","超神接气"],["zhirun","置闰"]].map(([a,f])=>p("label",{key:a,className:"mp-qmopt"},p("input",{type:"radio",name:"qimen_rule",value:a,checked:Ja===a,onChange:()=>Lt(a)}),p("span",null,f)))),p("div",{className:"mp-field"},p("span",{className:"mp-lbl"},"晚子时"),p("select",{className:"mp-input",value:At,onChange:a=>Tt(a.target.value)},p("option",{value:"same-day"},"23:00 后归当日"),p("option",{value:"next-day"},"23:00 后归次日"))),p("details",{className:"mp-qmhelp"},p("summary",null,"三种规则有什么区别？"),p("p",null,"决定符头与节气如何对齐、是否插入闰局；同一个时刻在不同规则下可能得到不同局数。默认「拆补」与工具层一致。"))):null,na(o)||o==="qimen"?ce(o==="qimen"?"询问方向（定用神）":"询问方向",p("select",{className:"mp-input mp-askonly",value:Oe,onChange:a=>{da(a.target.value),nn(a.target.value)}},(Y.DIRECTIONS||[]).map(a=>p("option",{key:a.key,value:a.key},a.label)))):null,o==="tarot"?ce("牌阵",p("select",{className:"mp-input",value:P,onChange:a=>Ae(a.target.value)},p("option",{value:"one"},"1 张 · 单张指引"),p("option",{value:"three"},"3 张 · 过去现在未来"),p("option",{value:"five"},"5 张 · 五张局势"),p("option",{value:"celtic"},"10 张 · 凯尔特十字"),p("option",{value:"either"},"5 张 · 二选一"),p("option",{value:"relation"},"7 张 · 关系阵"),p("option",{value:"timeflow"},"3 张 · 时间流"))):null,o==="liuyao"?ce("六爻（可空）",p("input",{className:"mp-input",placeholder:"空则随机，如 9 7 8 8 7 6",value:u,onChange:a=>b(a.target.value)})):null,o==="meihua"?ce("起卦方式",p("div",{className:"mp-seg"},p("button",{className:Ce==="time"?"on":"",onClick:()=>en("time")},"时间"),p("button",{className:Ce==="number"?"on":"",onClick:()=>en("number")},"数字"))):null,o==="meihua"&&Ce==="number"?ce("第一个数",p("input",{className:"mp-input",value:Pe,placeholder:"如 17",onChange:a=>Ut(a.target.value)})):null,o==="meihua"&&Ce==="number"?ce("第二个数",p("input",{className:"mp-input",value:Sa,placeholder:"如 29",onChange:a=>Zt(a.target.value)})):null,o==="meihua"&&Ce==="number"?ce("动爻（可空）",p("input",{className:"mp-input",value:Kt,placeholder:"1-6",onChange:a=>Ji(a.target.value)})):null,o==="zeri"?ce("所办事项",p("select",{className:"mp-input",value:bt,onChange:a=>tt(a.target.value)},[["常用",["嫁娶","搬家入宅","出行","开业","签订合同","祭祀"]],["婚嫁",["嫁娶","订婚","领证","提亲","收送聘金","满月酒"]],["生活",["搬家","入宅","旅行","访亲友","入学","求医","祭祀"]],["建造",["动土","装修","装修建造","安葬","试车买车"]],["工商",["开业","交易","投资","签订合同","签约","纳财","赴任"]]].map(([a,f])=>p("optgroup",{key:a,label:a},f.map(k=>p("option",{key:`${a}-${k}`,value:k},k)))))):null,o==="convert"?ce("转换方向",p("div",{className:"mp-seg"},p("button",{className:ke==="solar2lunar"?"on":"",onClick:()=>wa("solar2lunar")},"公历 → 农历"),p("button",{className:ke==="lunar2solar"?"on":"",onClick:()=>wa("lunar2solar")},"农历 → 公历"))):null,o==="convert"&&ke==="lunar2solar"?ce("农历日期",p("input",{className:"mp-input",value:Ea,placeholder:"如 2026-9-17",onChange:a=>$a(a.target.value)})):null,o==="convert"&&ke==="lunar2solar"?p("label",{className:"mp-check"},p("input",{type:"checkbox",checked:nt,onChange:a=>Pt(a.target.checked)})," 闰月"):null,o==="zeri"?ce("看多少天",p("input",{className:"mp-input",type:"number",min:1,max:60,value:pa,onChange:a=>it(a.target.value)})):null,o==="zeri"?ce("候选日（可空，只比这几天）",p("input",{className:"mp-input",placeholder:"如 2026-12-01, 2026-12-08, 2026-12-15",value:la,onChange:a=>Ht(a.target.value)})):null,o==="zeri"?ce("当事人属相（可空）",p("select",{className:"mp-input",value:ya,onChange:a=>Ot(a.target.value)},p("option",{value:""},"不排除"),["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"].map(a=>p("option",{key:a,value:a},a)))):null,o==="xiaoliuren"?ce("起课方式",p("div",{className:"mp-seg"},p("button",{className:Ge==="time"?"on":"",onClick:()=>Oa("time")},"时间"),p("button",{className:Ge==="number"?"on":"",onClick:()=>Oa("number")},"报数"))):null,o==="xiaoliuren"&&Ge==="number"?ce("第一个数",p("input",{className:"mp-input",type:"number",min:1,max:99,value:ka,onChange:a=>st(a.target.value)})):null,o==="xiaoliuren"&&Ge==="number"?ce("第二个数",p("input",{className:"mp-input",type:"number",min:1,max:99,value:Ha,onChange:a=>Dt(a.target.value)})):null,o==="xiaoliuren"&&Ge==="number"?ce("第三个数",p("input",{className:"mp-input",type:"number",min:1,max:99,value:Xe,onChange:a=>za(a.target.value)})):null,o==="mbti"?p("div",{className:"mp-quiz-wrap"},p("div",{className:"mp-lbl"},"十六型人格问卷 · 4 题一页，按 1（完全不像）到 5（很像我）打分"),p(On,{answers:ta,page:di,onPick:(a,f)=>Ft(k=>{const q=k.slice();return q[a]=f,q}),onPage:a=>Rt(f=>Math.max(0,Math.min(f+a,Math.max(0,Math.ceil(St().total/kt)-1)))),onSubmit:fi,onClear:()=>{Ft(new Array(St().total).fill(null)),Rt(0),y(null)}})):null,o==="constitution"?p("div",{className:"mp-quiz-wrap"},p("div",{className:"mp-lbl"},"中医体质问卷 · 9 种体质各 5 题，共 45 题 · 5 题一页，按 1（没有）到 5（总是）打分"),p(Hn,{paper:Pa,answers:ot,page:mi,onPick:(a,f)=>It(k=>{const q=k.slice();return q[a]=f,q}),onPage:a=>Bt(f=>Math.max(0,Math.min(f+a,Math.max(0,Math.ceil((Pa&&Pa.questions?Pa.questions.length:ii)/zt)-1)))),onSubmit:fi,onClear:()=>{It(new Array(ii).fill(null)),Bt(0),y(null)}})):null,o==="trend"?ce("算到几岁",p("input",{className:"mp-input",type:"number",min:10,max:100,value:Da,onChange:a=>ht(a.target.value)})):null,o==="fengshui"?ce("看什么",p("div",{className:"mp-seg"},p("button",{className:Fe==="natal"?"on":"",onClick:()=>rt("natal")},"命卦"),p("button",{className:Fe==="advise"?"on":"",onClick:()=>rt("advise")},"门主灶"),p("button",{className:Fe==="xuankong"?"on":"",onClick:()=>rt("xuankong")},"玄空"))):null,o==="fengshui"&&Fe!=="natal"?ce("坐山（24 山）",p("input",{className:"mp-input",value:ja,placeholder:"如 子 / 乾",onChange:a=>pt(a.target.value)})):null,o==="fengshui"&&Fe!=="natal"?ce("朝向（24 山）",p("input",{className:"mp-input",value:Ra,placeholder:"如 午 / 巽",onChange:a=>Gt(a.target.value)})):null,o==="fengshui"&&Fe==="xuankong"?ce("运（1–9）",p("input",{className:"mp-input",type:"number",min:1,max:9,value:Re,onChange:a=>Fa(a.target.value)})):null,o==="name"?ce("看什么",p("div",{className:"mp-seg"},p("button",{className:Ue==="assess"?"on":"",onClick:()=>xt("assess")},"评名字"),p("button",{className:Ue==="generate"?"on":"",onClick:()=>xt("generate")},"生成候选"))):null,o==="name"?ce("姓",p("input",{className:"mp-input",value:e,placeholder:"如 李",onChange:a=>i(a.target.value)})):null,o==="name"&&Ue==="assess"?ce("名字",p("input",{className:"mp-input",value:n,placeholder:"如 沐宸",onChange:a=>l(a.target.value)})):null,o==="name"&&Ue==="generate"?ce("候选个数",p("input",{className:"mp-input",type:"number",min:1,max:20,value:r,onChange:a=>m(a.target.value)})):null),vt?p("div",{className:"mp-checks"},p("label",{title:"按出生地经度把钟表时间换算成真太阳时"},p("input",{type:"checkbox",checked:sa,onChange:a=>ha(a.target.checked)}),"真太阳时"),p("label",{title:"23:00–23:59 出生时：勾选=按次日日柱起时柱；不勾=仍用当日日柱"},p("input",{type:"checkbox",checked:xa,onChange:a=>va(a.target.checked)}),"晚子时换日"),p("label",{title:"开启后会请求 OpenStreetMap，把区县/村落到更精确的坐标"},p("input",{type:"checkbox",checked:c,onChange:a=>g(a.target.checked)}),"联网精确到区县")):null,na(o)?p("div",{className:"mp-askblock"},p("span",{className:"mp-lbl"},"所问之事（必填）"),p("textarea",{className:"mp-textarea"+(be?" invalid":""),rows:2,value:Te,placeholder:"用一句话描述所问之事，例如：今年是否适合换工作？",onChange:a=>{Ie(a.target.value),me(!1)},onBlur:a=>nn(void 0,a.target.value)})):null,o==="mbti"||o==="constitution"?null:p("div",{key:"actions",className:"mp-actions"},p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginRight:8},onClick:ds,title:"用固定示例盘看完整报告（不改动你已填的数据）"},"看示例"),d&&!$?p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginRight:8},onClick:()=>M(!0),title:"出盘后参数区是只读的：点这里解锁，改完再点排盘更新结果"},"修改参数"):null,p("button",{className:"mp-btn",onClick:fi,title:"时间仍为自动时，点它会取当下再起卦"},o==="tarot"?"抽牌":o==="bazi"||o==="ziwei"?"排盘":o==="hepan"?"合盘":o==="qimen"?"起局":ni.indexOf(o)>=0?"看结果":"起卦"))),p("div",{key:"hint",className:"mp-hint"},is.hint),R.length||Je.length?p("div",{key:"hist",className:"mp-hist"},p("div",{className:"mp-hist-h"},p("span",null,R.length?"最近排过":"卦例库"),p("span",{className:"mp-hist-acts"},R.length?p("button",{className:"mp-hist-clear",onClick:Ms},"清空"):null,p("button",{className:"mp-hist-clear mp-hist-more",onClick:As},Je.length?`卦例库 ${Je.length}`:"卦例库"))),p("div",{className:"mp-hist-list"},R.map((a,f)=>p("button",{key:f,className:"mp-hist-item",title:`${String(a.date||"")} ${a.hourUnknown?"时辰未知":String(a.time||"")}`,onClick:()=>ln(a)},p("b",null,(ea.find(k=>k.k===a.kind)||{}).label||a.kind),p("span",null,a.label||"—"),p("i",null,`${String(a.date||"").slice(5)} ${a.hourUnknown?"时辰未知":String(a.time||"")}`))))):null,We==="cast"&&Vi?p("div",{key:"auto",className:"mp-auto"},gi.cast?`起卦时刻用的是你手动填的（${se}）；想跟随当下，把时间改回或清空即可。`:`起卦时刻已自动取本机时间（${se}），每次点起卦都会重新取当下；想固定时刻就在上面改。`):null,C?p("div",{key:"err",className:"mp-err",role:"alert"},C):null,ae?p("div",{key:"ntc",className:"mp-note",role:"status"},ae):null,ve?p("div",{key:"load",className:"mp-note",role:"status"},"正在加载本页需要的引擎…"):null,!d&&!C?p("div",{key:"empty",className:"mp-empty"},p("b",null,o==="ziwei"||o==="bazi"?"填好出生信息，点「排盘」":o==="tarot"?"写下想问的事，点「抽牌」":o==="mbti"?"按 1–5 给题目打分，答满 12 题就能看结果":o==="constitution"?"按 1–5 给题目打分，答满 27 题就能看结果":ni.indexOf(o)>=0?"填好参数，点「看结果」":"写下所问之事，点「起卦」"),o==="ziwei"||o==="bazi"?"出生日期、时刻与性别即可；出生地只影响真太阳时。":o==="mbti"?"4 题一页，答案只在本地参与计算，不会上传。":o==="constitution"?"5 题一页，答案只在本地参与计算，不会上传；这是自评问卷，不是医学诊断。":ni.indexOf(o)>=0?"按上面的选项填好参数即可；全部在本机计算，不上传。":"起卦时刻已自动取当下，也可以手动改。"):null,d?p("div",{key:"card",className:"mp-card mp-flat",role:"region","aria-label":"排盘结果","aria-live":"polite",onClick:vs,dangerouslySetInnerHTML:{__html:Nn({head:O.envHeadHTML(d.it,{folded:bi()})||O.factHeadHTML(d.r&&d.r.factHead),body:O.envBodyHTML(d.it,{folded:bi()}),chart:Vn(d),shortId:window.__MPCompose?window.__MPCompose.shortIdHTML(d.r.shortId):"",castAt:ys(d),solar:O.solarLineHTML(d.r),interpret:O.resultWithInterpret("",d.it,{folded:bi(),noHead:!0,noBody:!0}),revision:O.revisionHTML(d.r.revision),handle:O.handleHTML(d.r.handle),shadow:O.shadowHTML(d.r.shadow,d.shadowDiff),trace:O.traceHTML(d.r.trace,d.r.system,d.r.traceText),caliber:O.caliberHTML(d.caliber),perf:O.perfHTML(D)},d.r&&d.r.system)}}):null,d?p("div",{key:"bar",className:"mp-bar"},p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px"},onClick:ws},ts||"复制文字结果"),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:js,title:"导出盘面 + 解析（含一页读懂、三张表）为 Markdown"},"存 .md"),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:Ss,title:"生成 PNG 摘要卡（一页读懂 + 首张表），适合直接分享"},"存长图"),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:_s,title:"把这张盘的参数存进卦例库，日后可回填重排、标应验"},Ls?"已存入卦例库":"存入卦例库")):null,d&&!pi?p("p",{key:"nudge",className:"mp-nudge"},"这张盘只在你自己这台设备上算，不上传、不联网。过些天回头想看看它准不准，先「存入卦例库」，之后在卦例库里标应验就行——愿意记就记，不记也能照常用。",p("button",{type:"button",className:"mp-nudge-x",onClick:()=>{try{window.localStorage.setItem("dsh-metaphysics/nudge-off","1")}catch{}Va(!0)},title:"以后不再出现这行"},"不再提示")):null,d?p("div",{key:"ask",className:"mp-askbox",style:{flexWrap:"wrap"}},p("input",{className:"mp-input",value:oa,maxLength:120,placeholder:"追问：如 2027 年事业怎么样（回车提交）",onChange:a=>_t(a.target.value),onKeyDown:a=>{a.key==="Enter"&&sn()}}),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px"},onClick:sn},"追问"),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"5px 12px",marginLeft:8},onClick:on,title:"把这张盘的摘要和你的问题一起发进 DSH 对话窗，由对话里的模型接着答"},"问进对话"),pe.ref?null:p("div",{key:"bridgediag",className:"mp-note",style:{marginTop:6,fontSize:11,flexBasis:"100%"}},"本机对话窗没接上：点「问进对话」会把提问复制到剪贴板，自己粘进对话窗就行。"+(qn()?"（"+Ii()+"）":"")),Aa?p("div",{key:"chatnote",className:"mp-note",style:{marginTop:6,fontSize:12,flexBasis:"100%"}},Aa):null):null,d?p("div",{key:"bridge",className:"mp-bridge"},p("span",{className:"mp-bridge-lbl"},pe.ref?"桥可用；也可以：":"桥未就绪，改走这几档："),an.map(([a,f,k])=>p("button",{key:a,type:"button",className:"mp-chip","data-bridge-copy":a,title:k,onClick:q=>hs(a,q.currentTarget)},f))):null,Et?p("div",{key:"fx",className:"mp-fx",dangerouslySetInnerHTML:{__html:O.followupHTML(Et)}}):null,d&&d.kind==="bazi"&&d.r.past?p("div",{key:"verify",className:"mp-verify"},p("div",{className:"mp-verify-h"},"先核对过去几年：这盘说的事，对得上吗"),d.r.past.rows.map(a=>p("div",{key:a.year,className:"mp-verify-row"},p("span",{className:"mp-verify-txt"},`${a.year} ${a.ganzhi} · ${a.theme}`),p("span",{className:"mp-verify-btns"},["yes","no","unsure"].map(f=>p("button",{key:f,className:"mp-chip"+(Wa[a.year]===f?" on":""),onClick:()=>Qa(Object.assign({},Wa,{[a.year]:f}))},f==="yes"?"准":f==="no"?"不准":"不确定"))))),p("div",{className:"mp-verify-foot"},p("button",{className:"mp-btn ghost",style:pn,onClick:Ns},"算贴合度"),_a?p("span",{className:"mp-verify-fit"},`命中 ${_a.yes}/${_a.answered}（${_a.level}）：${_a.advice}`):null)):null,d&&d.kind==="bazi"?p("div",{key:"rect",className:"mp-rect"},p("div",{className:"mp-verify-h"},"不确定几点出生？填几件过去的事，反推时辰"),et.map((a,f)=>p("div",{key:f,className:"mp-rect-row"},p("input",{className:"mp-input",type:"number",min:1900,max:2100,value:a.year,onChange:k=>ft(et.map((q,x)=>x===f?Object.assign({},q,{year:k.target.value}):q))}),p("select",{className:"mp-input",value:a.kind,onChange:k=>ft(et.map((q,x)=>x===f?Object.assign({},q,{kind:k.target.value}):q))},[["career","事业变动"],["wealth","财运"],["love","感情"],["move","搬迁/出行"],["health","健康"],["other","其他"]].map(([k,q])=>p("option",{key:k,value:k},q))))),p("button",{className:"mp-btn ghost",style:pn,onClick:qs},"计算候选时辰"),ra?ra.error?p("div",{className:"mp-rect-err"},ra.error):p("div",{className:"mp-rect-out"},p("div",{className:"mp-verify-fit"},ra.note),ra.candidates.slice(0,6).map(a=>p("div",{key:a.hour,className:"mp-rect-cand"+(a===ra.best?" best":"")},`${a.label} · 时柱 ${a.hourGanzhi} · 日柱 ${a.dayGanzhi} · 命中 ${a.hits}/${a.total}`))):null):null,!d&&!C?p("div",{key:"ph",className:"mp-dim",style:{marginTop:24,fontSize:12}},"选择体系后点「排盘」。所有计算在本机完成，不上传任何数据。"):null,p("div",{key:"fb",className:"mp-fb"},p("div",{className:"mp-fb-h"},p("span",{className:"mp-fb-t"},"用得不对、读不懂、或算得跟别家不一样？"),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"4px 10px"},onClick:rn,title:"生成一份含输入、版本、环境与结果摘要的报告，粘贴到 issue / 邮件 / 群聊即可"},A||"复制反馈报告"),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"4px 10px",marginLeft:6},onClick:()=>zs(),title:"在浏览器打开 GitHub issue（报告已复制到剪贴板，粘进去即可）"},"开 issue")),p("div",{className:"mp-fb-b"},"有疑问？",p("a",{href:"mailto:1129440028@qq.com?subject="+encodeURIComponent("[反馈] 烛微命盘"),style:{color:"inherit"},title:"点开直接写邮件，不用复制任何东西"},"1129440028@qq.com"),"　·　GitHub issues　·　微信群 dsh-metaphysics",ne?p("span",{className:"mp-fb-note"},"　"+ne):null)),Cs?p("div",{key:"cases",className:"mp-cases-layer",role:"dialog","aria-modal":"true","aria-label":"卦例库",onClick:a=>{a.target===a.currentTarget&&xi()}},p("div",{className:"mp-cases-box"},p("div",{className:"mp-cases-h"},p("b",null,`卦例库 · ${vi.length}/${Je.length}`),p("button",{className:"mp-cases-x",onClick:xi,"aria-label":"关闭"},"✕")),p("div",{className:"mp-cases-tabs"},[["all","全部"]].concat(O.CASE_STATUS.map(a=>[a,O.caseStatusLabel(a)])).map(a=>p("button",{key:a[0],className:"mp-chip"+(hi===a[0]?" on":""),onClick:()=>cn(a[0])},`${a[1]} ${Ts(a[0])}`))),p("div",{className:"mp-cases-list"},vi.length?vi.map(a=>Es(a)):p("div",{className:"mp-empty"},"这一栏还空着。看结果时点「存入卦例库」，想要的盘才会记进来；过些天回来标应验。")),p("div",{className:"mp-cases-f"},p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"4px 10px"},onClick:()=>un(!1)},"导出 JSONL"),p("button",{className:"mp-btn ghost",style:{fontSize:12,padding:"4px 10px",marginLeft:6},onClick:()=>un(!0),title:"去掉出生年份（只留月日）、时刻整点化、去掉出生地——发给群里也不露个人信息"},"导出脱敏版"),p("span",{className:"mp-cases-tip"},"只存参数与一句摘要，不存盘面；点条目回填重排。")))):null];return p("div",{className:"mp-wrap"},Is)}function Qn(o){try{if(typeof styles<"u"&&styles&&typeof styles.insert=="function")return styles.insert(o)}catch(s){console.error("[metaphysics] styles.insert 不可用，改用 DOM 注入",s)}try{const s=document.createElement("style");return s.setAttribute("data-plugin","@local/metaphysics"),s.textContent=o,document.head.appendChild(s),()=>s.remove()}catch(s){return console.error("[metaphysics] DOM 注入样式也失败",s),()=>{}}}let Yi=!1;function ri(){try{const o=document.documentElement;if(!o||!document.body)return;const s=document.createElement("span");s.setAttribute("aria-hidden","true"),s.style.cssText="position:absolute;left:-9999px;top:0;width:0;height:0;pointer-events:none;background:var(--dsw-alias-brand-primary)",document.body.appendChild(s);const j=getComputedStyle(s).backgroundColor;s.remove();const I=Ze&&typeof Ze.pickOnColor=="function"?Ze.pickOnColor(j):"";I&&o.style&&o.style.getPropertyValue("--mp-on-brand")!==I&&o.style.setProperty("--mp-on-brand",I)}catch{}}function es(){if(!Yi){Yi=!0,ri();try{const o=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)");o&&typeof o.addEventListener=="function"&&o.addEventListener("change",ri)}catch{}try{typeof MutationObserver=="function"&&document.documentElement&&new MutationObserver(ri).observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]})}catch{}}}function as(o){try{const G=Qn(An+(O&&O.CSS?O.CSS:""));typeof o.effect=="function"&&typeof G=="function"&&o.effect(()=>G)}catch(G){console.error("[metaphysics] 样式注入失败",G)}try{es()}catch(G){console.error("[metaphysics] 字色同步失败",G)}let s=null;try{s=o&&o.slots||(o&&typeof o.get=="function"?o.get("slots"):null)}catch(G){console.error("[metaphysics] 取 slots 服务失败",G)}if(!s||typeof s.register!="function"){console.error("[metaphysics] slots 服务不可用，面板未注册");return}try{pe.injectType=typeof s.inject;const G=typeof s.spec=="function"?s.spec("conversation.input.right"):null;pe.spec=G?G.kind+"/"+G.scope:"未声明"}catch(G){pe.spec="取声明失败",Bi(G)}const j=G=>{if(typeof G=="function")return G;if(G&&typeof G=="object"){for(const xe of["dispose","off","cancel","unregister"])if(typeof G[xe]=="function")return()=>{try{G[xe]()}catch{}}}return()=>{}},I=(G,xe)=>{try{const V=s.register(G,xe);return pe.regs+=1,pe.seatOk[G.name]=!0,j(V)}catch(V){return Bi(V),()=>{}}},se=(G,xe)=>{const V=()=>{const H=xe();return pe.contribution=(pe.contribution?pe.contribution+",":"")+(G+(typeof H=="function"?" 已挂上":" 未挂上")),H};try{typeof s.inject=="function"?s.inject(G,V):V()}catch(H){console.error("[metaphysics] 等待槽位失败："+G,H);try{V()}catch(B){console.error("[metaphysics] 直接注册也失败："+G,B)}}};se("sidebar.panellist",()=>I({name:"sidebar.panellist",id:"metaphysics",order:20,label:()=>"烛微命盘 v"+(window.__MP_VER||"")},Dn)),se("main",()=>I({name:"main",key:"metaphysics"},G=>p(Pn,null,p(Wn,G))));const le=(G,xe)=>{const V=()=>{try{const B=s.inject(G,xe);return pe.contribution=(pe.contribution?pe.contribution+",":"")+(G.replace("conversation.","")+(typeof B=="function"?" 已挂上":" 未挂上")),B}catch(B){console.error("[metaphysics] 槽位注册失败："+G,B);try{return xe()}catch(J){console.error("[metaphysics] 直接注册也失败："+G,J);return}}};let H;try{typeof o.effect=="function"?H=o.effect(V,"metaphysics: "+G):H=V()}catch(B){console.error("[metaphysics] effect 包裹失败："+G,B),H=V()}typeof H=="function"&&pe.seatDisposers.push(H)};le("conversation.input.right",()=>I({name:"conversation.input.right",id:"metaphysics-ask",order:40},Ui)),le("conversation.composer.dock",()=>I({name:"conversation.composer.dock",id:"metaphysics-dock",order:60},Zi));let ge=!1;const ue=()=>{pe.ref||ge||(ge=!0,pe.seatOk["conversation.input.right"]||I({name:"conversation.input.right",id:"metaphysics-ask",order:40},Ui),pe.seatOk["conversation.composer.dock"]||I({name:"conversation.composer.dock",id:"metaphysics-dock",order:60},Zi))};let ye=20;const je=()=>!!(pe.seatOk["conversation.input.right"]&&pe.seatOk["conversation.composer.dock"]),Me=()=>{pe.ref||ye<=0||je()||(ye-=1,ue(),!je()&&setTimeout(Me,700))};try{setTimeout(Me,700)}catch{}try{document.addEventListener("pointerdown",()=>{ge=!1,ue()},{once:!0,capture:!0})}catch{}}return{inject:["slots"],apply(o){try{as(o)}catch(s){console.error("[metaphysics] apply 异常",s)}}}}});
