// ── 历史记录（localStorage，只存参数，最多 20 条） ──
const HIST_KEY = 'dsh-metaphysics/history-v1';
function loadHistory() {
  try {
    const raw = window.localStorage && window.localStorage.getItem(HIST_KEY);
    const list = raw ? JSON.parse(raw) : [];
    // 存储是外部输入：旧版本 / 手改 / 半截写入都可能留下不是对象的条目，
    // 直接渲染会在 x.date.slice 上抛错，整个面板一起白掉。
    return Array.isArray(list)
      ? list.filter((x) => x && typeof x === 'object' && typeof x.kind === 'string').slice(0, 20)
      : [];
  } catch (e) { return []; }
}
function saveHistory(list) {
  try {
    if (window.localStorage) window.localStorage.setItem(HIST_KEY, JSON.stringify(list.slice(0, 20)));
  } catch (e) { /* 隐私模式或配额满：静默降级，不影响排盘 */ }
}
const sameEntry = (a, b) =>
  a.kind === b.kind && a.date === b.date && a.time === b.time && a.gender === b.gender
  && !!a.hourUnknown === !!b.hourUnknown
  // 真太阳时 / 晚子时也换一张盘：缺字段的旧条目按默认（都开）处理
  && (a.trueSolar !== false) === (b.trueSolar !== false)
  && (a.lateZi !== false) === (b.lateZi !== false)
  && a.address === b.address && a.lines === b.lines && a.question === b.question
  && a.mhMode === b.mhMode && a.upper === b.upper && a.lower === b.lower
  // 方向 / 牌阵 / 动爻也换一张结果：漏比就会把两条不同的盘当成重复条目顶掉
  && a.direction === b.direction && a.spread === b.spread && a.changing === b.changing
  // 各体系自己的参数（流派、事项、起卦方式等）各比各的；旧条目缺字段时两边都是 undefined
  && (a.kind !== 'qimen' || (a.qimenRule === b.qimenRule && a.qLateZi === b.qLateZi))
  && (a.kind !== 'zeri' || (a.task === b.task && a.days === b.days
    && a.shengXiao === b.shengXiao && a.zCand === b.zCand))
  && (a.kind !== 'xiaoliuren' || (a.xlrMode === b.xlrMode
    && a.num1 === b.num1 && a.num2 === b.num2 && a.num3 === b.num3))
  && (a.kind !== 'trend' || a.toAge === b.toAge)
  && (a.kind !== 'fengshui' || (a.fsMode === b.fsMode && a.fsPeriod === b.fsPeriod
    && a.sitting === b.sitting && a.facing === b.facing))
  && (a.kind !== 'name' || (a.nnMode === b.nnMode && a.surname === b.surname
    && a.givenName === b.givenName && a.limitN === b.limitN))
  && (a.kind !== 'convert' || (a.convMode === b.convMode
    && a.lunarDate === b.lunarDate && !!a.leapMonth === !!b.leapMonth))
  // 合盘换了对方的生日就是另一张盘，不能被当成重复条目顶掉
  && (a.kind !== 'hepan' || (a.hpChart === b.hpChart
    && a.partnerDate === b.partnerDate && a.partnerTime === b.partnerTime
    && a.partnerGender === b.partnerGender && a.partnerAddress === b.partnerAddress
    && !!a.thirdOn === !!b.thirdOn
    && a.p2Date === b.p2Date && a.p2Time === b.p2Time
    && a.p2Gender === b.p2Gender && a.p2Address === b.p2Address));

/** 历史条目的显示文案：一屏能看出是哪个盘 */
function HISTORY_LABEL(kind, r) {
  // 时辰未知时 pillars.hour 是 null：直接 map 会在存历史这一步抛错，
  // 表现为「三柱盘一点排盘就报 Cannot read properties of null」。
  // 三柱就把缺的那一柱写出来，别让历史条目看起来像四柱。
  if (kind === 'bazi') {
    const cols = ['year', 'month', 'day', 'hour'].map((k) => r.pillars && r.pillars[k]).filter(Boolean);
    const text = cols.map((p) => p.ganzhi).join(' ');
    return r.hourUnknown || (r.pillars && !r.pillars.hour) ? `${text}（时柱暂缺）` : text;
  }
  if (kind === 'ziwei') return `${r.soul ? r.soul.branch : ''}宫 ${r.bureau ? r.bureau.name : ''} ${r.lunar ? r.lunar.year + '年' : ''}`.trim();
  if (kind === 'liuyao') return r.ben && r.ben.name ? r.ben.name : '';
  if (kind === 'meihua') return r.ben && r.ben.name ? `${r.ben.name} 动${r.moving}` : '';
  if (kind === 'daliuren') return `${r.dayGanZhi || ''} ${r.geJu ? r.geJu.name : ''}`;
  return '';
}
// Client 半：命理排盘面板。由 build-client.mjs 注入 React / h / Engine / __PP。
const PP = window.__PP;
// 计时统一走 performance.now，缺省退回 Date.now（老宿主 / vm 沙箱）
const mpNow = () => (typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now());
// 界面代次：每次点排盘 / 切 tab 都自增。await 之后拿它比对一次，过期的一次不再写结果与历史。
// 只用来丢弃过期回调；不上报、不落盘
let perfSeq = 0;
// 独立页与旧宿主没有分块加载器：把现成的完整 Engine 当作已加载
const ensureEngine = typeof window.__mpEnsureEngine === 'function'
  ? window.__mpEnsureEngine
  : async () => window.Engine;
const CSS = `
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
`;

const { useState, useEffect, useRef } = React;

// ── 公历日期输入：固定「年-月-日」 ─────────────────────────────────
// 原生 <input type="date"> 的显示顺序由浏览器区域决定，非中文区域会显示成
// 月/日/年，用户很容易填反。这里统一成文本输入 + 数字掩码：
// 只接受数字，自动补成 YYYY-MM-DD；也认 1990/5/12、1990年5月12日 这类写法。
const pad2 = (n) => String(n).padStart(2, '0');
function isoDateOk(s) {
  const ymd = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || ''));
  if (!ymd) return false;
  const y = Number(ymd[1]);
  const mo = Number(ymd[2]);
  const d = Number(ymd[3]);
  if (mo < 1 || mo > 12 || d < 1) return false;
  const leap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return d <= days[mo - 1];
}
function normalizeDateText(raw) {
  const ymd = /^(\d{4})\s*[年./-]\s*(\d{1,2})\s*[月./-]\s*(\d{1,2})\s*日?$/.exec(String(raw || '').trim());
  if (!ymd) return '';
  const iso = `${ymd[1]}-${pad2(ymd[2])}-${pad2(ymd[3])}`;
  return isoDateOk(iso) ? iso : '';
}
function maskDateText(raw) {
  const s = String(raw || '').trim();
  // 连字符日期在输入过程中原样保留（含只打出「1990-5-」的中间态）：刚敲下「1」
  // 就补成「01」，再敲「2」会变成 012 被截掉。等失焦时再统一补零；
  // 斜杠/中文/点号视为粘贴，直接归一。
  if (/^\d{0,4}(-\d{0,2}){0,2}$/.test(s)) return s;
  if (/[年月日/.]/.test(s)) {
    const full = normalizeDateText(s);
    if (full) return full;
  }
  const digits = s.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`;
}

function DateInput(props) {
  const value = props.value || '';
  const [draft, setDraft] = useState(value);
  const last = useRef(value);
  useEffect(() => {
    last.current = value;
    setDraft(value);
  }, [value]);
  const commit = () => {
    const raw = draft.trim();
    if (!raw) {
      setDraft(last.current);
      if (props.onInvalid) props.onInvalid('');
      return;
    }
    const iso = normalizeDateText(raw);
    if (iso) {
      last.current = iso;
      setDraft(iso);
      if (iso !== value) props.onChange(iso);
      return;
    }
    setDraft(last.current);
    if (props.onInvalid) props.onInvalid(raw);
  };
  return h('input', {
    className: 'mp-input',
    type: 'text',
    inputMode: 'numeric',
    autoComplete: 'off',
    placeholder: '年-月-日，如 1990-05-12',
    value: draft,
    onChange: (e) => {
      // 打字过程中只改草稿，不往上报：中间态「1990-05-1」也能解析成 1990-05-01，
      // 一旦上报，父组件回写 value 会把刚敲的「2」冲掉，最终日期静默变成 1 号。
      setDraft(maskDateText(e.target.value));
    },
    onBlur: commit,
    onKeyDown: (e) => {
      if (e.key === 'Enter') { e.preventDefault(); commit(); }
    },
  });
}

// ── 十六型人格问卷：题目由引擎给，前端不再抄一份 ──────────────────
// compute 不带 answers 时回的就是问卷（needAnswers + questions + 1–5 的说法），
// 只在第一次取一次；答案按题序放在 App 的 mbAns 里，null = 未答。
const MBTI_PER_PAGE = 4;
const MBTI_MIN = 12;
// 中医体质（P4）：九种体质各 5 题，共 45 题；一页 5 题，题面由引擎的卷子给。
// 答满 27 题（60%）可先看结果——剩余题按「有时」补齐，引擎会在 note 里说清。
const CS_PER_PAGE = 5;
const CS_MIN = 27;
const CS_TOTAL = 45;
let MBTI_INFO = null;
function mbtiInfo() {
  if (MBTI_INFO) return MBTI_INFO;
  let p = null;
  try { p = Engine.compute({ system: 'mbti' }); } catch (e) { p = null; }
  const questions = (p && p.questions) || [];
  // 分块还没加载时先不缓存空题，加载完成后下一次渲染能重新取到题面
  if (!questions.length) return { total: 0, questions: [], scale: {} };
  MBTI_INFO = { total: (p && p.total) || questions.length, questions, scale: (p && p.scale) || {} };
  return MBTI_INFO;
}

/** 一页 4 题：进度条 + 题面 + 1–5 单选 + 翻页。状态留在 App，组件只发回调 */
function MbtiQuiz(props) {
  const { answers, page, onPick, onPage, onSubmit, onClear } = props;
  const info = mbtiInfo();
  const pages = Math.max(1, Math.ceil(info.total / MBTI_PER_PAGE));
  const start = page * MBTI_PER_PAGE;
  const slice = info.questions.slice(start, start + MBTI_PER_PAGE);
  const answered = answers.filter((v) => v != null).length;
  const pct = info.total ? Math.round((answered / info.total) * 100) : 0;
  const last = page >= pages - 1;
  const ready = answered >= MBTI_MIN;
  return h('div', { className: 'mp-quiz' },
    h('div', { className: 'mp-quiz-top' },
      h('div', { className: 'mp-quiz-bar', 'aria-hidden': 'true' }, h('i', { style: { width: pct + '%' } })),
      h('span', { className: 'mp-quiz-count' }, `第 ${page + 1} / ${pages} 页 · 已答 ${answered} / ${info.total}`)),
    h('div', { className: 'mp-quiz-list' }, slice.map((q, k) => {
      const i = start + k;
      return h('div', { key: q.id || i, className: 'mp-quiz-q' },
        h('div', { className: 'mp-quiz-qt' }, h('b', null, String(i + 1).padStart(2, '0')), h('span', null, q.text)),
        h('div', { className: 'mp-quiz-opts', role: 'radiogroup', 'aria-label': `第 ${i + 1} 题` },
          [1, 2, 3, 4, 5].map((n) => h('label', { key: n, className: 'mp-quiz-o' + (answers[i] === n ? ' on' : '') },
            h('input', {
              type: 'radio', name: `mpmbq${i}`, value: String(n), checked: answers[i] === n,
              onChange: () => onPick(i, n),
            }),
            h('b', null, String(n)),
            h('span', null, info.scale[n] || '')))));
    })),
    h('div', { className: 'mp-quiz-nav' },
      h('button', { className: 'mp-quiz-btn', disabled: page <= 0, onClick: () => onPage(-1) }, '上一页'),
      last ? null : h('button', { className: 'mp-quiz-btn', onClick: () => onPage(1) }, '下一页'),
      h('button', { className: 'mp-quiz-btn primary', disabled: !ready, onClick: onSubmit }, '看结果'),
      h('button', { className: 'mp-quiz-btn', onClick: onClear }, '清空'),
      h('span', { className: 'mp-quiz-hint' }, ready
        ? `已够 ${MBTI_MIN} 题，可以看结果；答完 ${info.total} 题会更准。`
        : `答满 ${MBTI_MIN} 题可先看结果（还差 ${MBTI_MIN - answered} 题）。`)),
  );
}

/** 体质问卷：九种体质各 5 题、一页 5 题；题面由引擎的卷子（paper）给，状态留在 App */
function CsQuiz(props) {
  const { paper, answers, page, onPick, onPage, onSubmit, onClear } = props;
  if (!paper || !Array.isArray(paper.questions)) {
    return h('div', { className: 'mp-quiz' }, h('div', { className: 'mp-quiz-hint' }, '正在加载问卷题面…'));
  }
  const total = paper.questions.length;
  const pages = Math.max(1, Math.ceil(total / CS_PER_PAGE));
  const start = page * CS_PER_PAGE;
  const slice = paper.questions.slice(start, start + CS_PER_PAGE);
  const answered = answers.filter((v) => v != null).length;
  const pct = total ? Math.round((answered / total) * 100) : 0;
  const last = page >= pages - 1;
  const ready = answered >= CS_MIN;
  // 量表文案从卷子里取，别在面板里再抄一份：改引擎的 1–5 措辞时两边不会走散
  const say = (n) => {
    const hit = (paper.scale || []).filter((x) => x && x.v === n)[0];
    return hit ? hit.label : String(n);
  };
  return h('div', { className: 'mp-quiz' },
    h('div', { className: 'mp-quiz-top' },
      h('div', { className: 'mp-quiz-bar', 'aria-hidden': 'true' }, h('i', { style: { width: pct + '%' } })),
      h('span', { className: 'mp-quiz-count' }, `第 ${page + 1} / ${pages} 页 · 已答 ${answered} / ${total}`)),
    h('div', { className: 'mp-quiz-list' }, slice.map((q, k) => {
      const i = start + k;
      return h('div', { key: q.no || i, className: 'mp-quiz-q' },
        h('div', { className: 'mp-quiz-qt' }, h('b', null, String(i + 1).padStart(2, '0')), h('span', null, q.text)),
        h('div', { className: 'mp-quiz-opts', role: 'radiogroup', 'aria-label': `第 ${i + 1} 题` },
          [1, 2, 3, 4, 5].map((n) => h('label', { key: n, className: 'mp-quiz-o' + (answers[i] === n ? ' on' : '') },
            h('input', {
              type: 'radio', name: `mpcsq${i}`, value: String(n), checked: answers[i] === n,
              onChange: () => onPick(i, n),
            }),
            h('b', null, String(n)),
            h('span', null, say(n))))));
    })),
    h('div', { className: 'mp-quiz-nav' },
      h('button', { className: 'mp-quiz-btn', disabled: page <= 0, onClick: () => onPage(-1) }, '上一页'),
      last ? null : h('button', { className: 'mp-quiz-btn', onClick: () => onPage(1) }, '下一页'),
      h('button', { className: 'mp-quiz-btn primary', disabled: !ready, onClick: onSubmit }, '看结果'),
      h('button', { className: 'mp-quiz-btn', onClick: onClear }, '清空'),
      h('span', { className: 'mp-quiz-hint' }, ready
        ? `已够 ${CS_MIN} 题，可以看结果；答完 ${total} 题会更准。`
        : `答满 ${CS_MIN} 题可先看结果（还差 ${CS_MIN - answered} 题）。`)),
  );
}
/** 渲染兜底：面板里任何一层组件抛错时，把错误原文摊在面板上，
 *  而不是留给用户一片空白（桌面端不一定开得了 devtools）。 */
class PanelGuard extends (React.Component || Object) {
  constructor(props) { super(props); this.state = { err: null }; }
  static getDerivedStateFromError(err) { return { err }; }
  componentDidCatch(err, info) { console.error('[metaphysics] 面板渲染异常', err, info); }
  render() {
    if (!this.state.err) return this.props.children;
    const e = this.state.err;
    const stack = String((e && e.stack) || '').split('\n').slice(0, 14).join('\n');
    return h('div', { className: 'mp-wrap' }, h('div', { className: 'mp-panel' },
      h('div', { className: 'mp-lbl' }, '命理面板渲染出错——把下面这段发给我'),
      h('pre', { style: { whiteSpace: 'pre-wrap', fontSize: 12, lineHeight: 1.5, maxHeight: 320, overflow: 'auto', margin: '8px 0' } },
        String((e && e.message) || e) + '\n\n' + stack),
      h('div', { className: 'mp-lbl' }, '环境：__PP ' + (typeof PP) + ' · Engine ' + (typeof window.Engine) + ' · React ' + (typeof React) + ' · 版本 ' + (typeof PP === 'object' && PP && (window.__MP_VER || '?'))
        // 版本号没动时，靠「未发版改动 N 项」判断这份产物新不新——报错的人不用先猜自己装的是哪一版
        + ((window.__MP_UNRELEASED || []).length ? ' · 未发版改动 ' + window.__MP_UNRELEASED.length + ' 项' : '')),
    ));
  }
}

function PanelIcon(props) {
  const size = props && props.size ? props.size : 20;
  const active = props && props.active;
  return h('svg', {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round',
    'aria-hidden': true, style: { opacity: active ? 1 : 0.72 },
  },
  h('circle', { cx: 12, cy: 12, r: 8.2 }),
  h('path', { d: 'M12 3.8a4.1 4.1 0 0 1 0 8.2 4.1 4.1 0 0 0 0 8.2' }),
  h('circle', { cx: 12, cy: 8, r: 1.1, fill: 'currentColor', stroke: 'none' }),
  h('circle', { cx: 12, cy: 16, r: 1.1, fill: 'currentColor', stroke: 'none' }));
}

// 每个体系对「时间」的语义不同：八字/紫微要出生时间，其余三类只要起卦时刻
const TABS = [
  { k: 'ziwei', label: '紫微', timeLabel: '出生时刻', hint: '紫微斗数需要出生日期、时刻与性别；出生地只影响真太阳时修正。' },
  { k: 'bazi', label: '八字', timeLabel: '出生时刻', hint: '四柱八字按节气与真太阳时定时柱，出生地越准，时柱越稳。' },
  { k: 'liuyao', label: '六爻', timeLabel: '起卦时刻', hint: '六爻不需要出生时间：只用起卦当下的日辰定六神、月建定旺衰，卦由摇出。' },
  { k: 'meihua', label: '梅花', timeLabel: '起卦时刻', hint: '梅花用起卦时刻的年月日时数成卦，也可直接给两个数字起卦；与出生时间无关。' },
  { k: 'daliuren', label: '六壬', timeLabel: '起卦时刻', hint: '大六壬用起卦时刻的日干支、时支与月将起天地盘；同样与出生时间无关。' },
  { k: 'qimen', label: '奇门', timeLabel: '起局时刻', hint: '奇门时家转盘：用起局时刻定节气、三元与局数；换局规则决定符头与节气如何对齐。' },
  { k: 'hepan', label: '合盘', timeLabel: '你的出生时刻', hint: '合盘按「日主 + 夫妻宫 + 五行互补」看两个人的相处与互补，需要双方出生信息。' },
    { k: 'tarot', label: '塔罗', timeLabel: '', hint: '塔罗不看时间，只记录抽牌时刻与你的提问。' },
  // 速查类：不做完整报告，只给当日/当天的确定性结果
  { k: 'almanac', label: '黄历', timeLabel: '', hint: '黄历按公历日期查农历、干支、宜忌、时辰吉凶、二十八宿与吉神方位；只做本地计算。' },
  { k: 'convert', label: '农历', timeLabel: '', hint: '公农历互转：公历生日可反查农历；只知道农历生日时，可转成公历再排盘。' },
  { k: 'zeri', label: '择日', timeLabel: '', hint: '择日把区间内每天的建除宜忌与事项适配打分排序，并按属相排除冲煞日。' },
  { k: 'chenggu', label: '称骨', timeLabel: '出生时刻', hint: '称骨按农历年、月、日、时的骨重求和；时辰必填。' },
  { k: 'xiaoliuren', label: '小六壬', timeLabel: '起课时刻', hint: '小六壬用农历月/日/时掐指，也可用三个随机数起课。' },
  { k: 'star', label: '星座', timeLabel: '', hint: '星座按公历日期给出太阳星座与当日基调；同日同星座结果固定。' },
  { k: 'numerology', label: '生命数字', timeLabel: '', hint: '生命数字按公历生日归约出生命路径数、生日数与态度数。' },
  { k: 'mbti', label: '人格', timeLabel: '', hint: '十六型人格是 24 道自我报告题的 MBTI 风格测算：4 题一页，按 1–5 打分，答满 12 题即可看结果；只作自我参照，不是官方量表。' },
  { k: 'constitution', label: '体质', timeLabel: '', hint: '中医体质是九种体质各 5 题的自评问卷（共 45 题，1 没有 / 5 总是），按转化分判主次体质并给调养方向；不是医学诊断。' },
    { k: 'wuyunliuqi', label: '运气', timeLabel: '', hint: '五运六气按大寒分年：中运、司天在泉、六步。' },
  { k: 'taiyi', label: '太乙', timeLabel: '', hint: '太乙神数按积年推局：太乙落宫、八门、文昌、计神、始击、主客算与四将。' },
  { k: 'trend', label: '人生K线', timeLabel: '出生时刻', hint: '人生 K 线按大运与流年十神给逐年运势分，画成走势图。' },
  { k: 'fengshui', label: '风水', timeLabel: '', hint: '风水看八宅命卦、大游年四吉四凶与流年九宫飞星；也可按坐向看门主灶倾向，或按运与坐向排玄空下卦盘。' },
  { k: 'name', label: '起名', timeLabel: '', hint: '起名按八字喜用匹配字库五行，可评估现有名字或生成候选名。' },
];

function pad(n) { return String(n).padStart(2, '0'); }

// 速查类：不算完整命盘，主按钮统一叫「看结果」；与独立页（web-ui）保持同一套文案
const QUICK_TABS = ['almanac', 'convert', 'zeri', 'chenggu', 'xiaoliuren', 'star', 'numerology', 'trend', 'fengshui', 'name', 'constitution', 'wuyunliuqi', 'taiyi'];

// ── 起卦快捷行（P3）────────────────────────────────────────────
// 六个占卜体系一键起卦：点一下 = 切到该体系 + 用当前时刻起卦，走的是与主按钮
// 完全相同的 activate/switchTo/run 通路——这里只提供入口，不复制任何排盘逻辑。
// 顺序按上手难度排：摇卦/按时刻成卦的四项在前，报数类（小六壬）最后。
// 折叠状态只记一个「开/关」，不落任何输入内容，与 RECENT_KEY 同一套降级逻辑。
const CAST_CHIPS = [
  { sys: 'liuyao', label: '六爻', tip: '摇一卦：只用起卦当下定六神旺衰，所问之事写下面（必填）' },
  { sys: 'meihua', label: '梅花', tip: '梅花易数：按起卦时刻的年月日时成卦，也可改成两个数字起卦' },
  { sys: 'daliuren', label: '六壬', tip: '大六壬：按起卦时刻的日干支、时支与月将起天地盘' },
  { sys: 'qimen', label: '奇门', tip: '奇门遁甲：时家转盘，默认拆补取局，可换超神接气/置闰' },
  { sys: 'tarot', label: '塔罗', tip: '塔罗：不看时间，点一下就抽牌；牌阵在下面选' },
  { sys: 'xiaoliuren', label: '小六壬', tip: '小六壬：按起课时刻推算，也可切报数起课' },
];
const CHIP_KEY = 'mp.cast.open';

// 首屏分组：与独立页（命理排盘.html）同一套「问一件事 / 看一个人 / 查日子」。
// 卡片只是另一套入口——19 个 tab 原样保留，两套入口都走 switchTo，分组不改变任何排盘行为。
// 首屏分组：与独立页（命理排盘.html）共用 src/groups.mjs；构建时由 tools/build-client.mjs
// 注入 window.__MPGroups（同一份数据也生成页面的分组卡片，改一处两边一起变）。
// 卡片只是另一套入口——19 个 tab 原样保留，两套入口都走 switchTo，分组不改变任何排盘行为。
const GROUPS = Array.isArray(window.__MPGroups) ? window.__MPGroups : [];

// 首屏记忆：只记「点过哪个入口」，不存任何输入内容；读写失败（隐私模式、禁用存储）就降级成不记。
const RECENT_KEY = 'mp.recent.tabs';
const VIEW_KEY = 'mp.first.view';
const RECENT_MAX = 3;

function storeGet(key) {
  try { return JSON.parse(window.localStorage.getItem(key) || 'null'); } catch (e) { return null; }
}
function storeSet(key, val) {
  try { window.localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* 存不了不影响使用 */ }
}
function dayLabel(ts) {
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return '';
  const day = (x) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const diff = Math.round((day(new Date()) - day(d)) / 86400000);
  if (diff <= 0) return '今天';
  if (diff === 1) return '昨天';
  return `${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function nowParts() {
  const d = new Date();
  return { date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`, time: `${pad(d.getHours())}:${pad(d.getMinutes())}` };
}

// ── 时间语义分类 ────────────────────────────────────────────────
// birth：八字 / 紫微 —— 要的是「出生时间」，必然是过去，用示例默认，不取当前时刻
// cast ：六爻 / 梅花 / 大六壬 —— 要的是「起卦时刻」，占的就是当下，自动取本机当前时刻
// none ：塔罗 —— 不看时间，日期时间字段整个隐藏
const TIME_KIND = {
  ziwei: 'birth', bazi: 'birth', hepan: 'birth',
  liuyao: 'cast', meihua: 'cast', daliuren: 'cast', qimen: 'cast',
  tarot: 'none',
  // 速查类：date=只用日期；birth=出生信息；cast=起课时刻
  almanac: 'date', zeri: 'date', star: 'date', numerology: 'date', convert: 'date',
  chenggu: 'birth', trend: 'birth', fengshui: 'birth', name: 'birth',
  xiaoliuren: 'cast',
  mbti: 'none',
  constitution: 'none',
  wuyunliuqi: 'date',
  taiyi: 'date',
};
const SAMPLE = { date: '1990-05-12', time: '14:30' };
const kindOf = (t) => TIME_KIND[t] || 'none';

// 问事的体系（六爻 / 梅花 / 六壬 / 塔罗）必须填「所问之事」；命盘类不问事
// 表单规则与独立页共用一份（src/core.js，由构建注入 window.__MPCore）
const Core = window.__MPCore || {};
const needAsk = Core.needAsk || ((t) => false);

// ── 对话桥：把面板里的提问送进 DSH 对话窗口 ──────────────────────
// conversation.input.right 是会话作用域槽位，props 带 inputActions：
// setDraft 写草稿、submit 走输入框正常的回车路径（有回合在跑时排队，不打断）。
// 面板与桥在同一个客户端模块里，用一个模块级引用互相找到；桥没挂上时退回复制。
const COMPOSER = { ref: null, seats: [], seatOk: {}, seatDisposers: [], contribution: '', keys: '', injectType: '', spec: '', errs: [], regs: 0, mounted: 0 };
const LAST = { r: null, q: '', it: null, entry: null };
// 档案称呼框在 dangerouslySetInnerHTML 里，重绘会整块换掉；存在模块级，
// 改日期等任意 state 变化重绘时才能把它带回输入框（不 setState，避免每键重绘丢光标）
let PROF_NAME = '';

// 桥自检：把「门面有没有 inject、槽位声明成什么样、注册抛没抛错、组件被渲染过几次」
// 拼成一行给面板显示——用户不用开控制台，把这一行截回来就能定位。
function bridgeDiagText() {
  const bits = [];
  bits.push('inputActions ' + (COMPOSER.ref ? '已拿到' : '未拿到'));
  bits.push('渲染 ' + COMPOSER.mounted + ' 次');
  bits.push('注册 ' + COMPOSER.regs + ' 次');
  bits.push('inject ' + (COMPOSER.injectType || '?'));
  bits.push('槽位 ' + (COMPOSER.spec || '?'));
  // 「注册成功」不等于「贡献生效」：slots.inject 的 callback 必须返回可调用的 disposer。
  // 这段文案会出现在结果卡里，所以不用 undefined/object 这类词——面板有一条
  // 「结果里不许出现 null / undefined / NaN」的闸，技术词会把闸打红。
  if (COMPOSER.contribution) bits.push('贡献 ' + COMPOSER.contribution);
  if (COMPOSER.errs.length) bits.push('错误：' + COMPOSER.errs.join(' / '));
  return '桥自检：' + bits.join('；');
}

function noteRegError(e) {
  if (COMPOSER.errs.length >= 3) return;
  const s = e && e.message ? String(e.message) : String(e);
  COMPOSER.errs.push(s.slice(0, 90));
}
// 槽位给的标准 props 里，inputActions 是对象；不同版本也可能挂在 actions.input 上。
function bridgeActions(props) {
  if (!props) return null;
  const a = props.inputActions;
  if (a && typeof a.setDraft === 'function' && typeof a.submit === 'function') return a;
  const b = props.actions && props.actions.input;
  if (b && typeof b.setDraft === 'function' && typeof b.submit === 'function') return b;
  return null;
}

// 记录座位与拿到的 props；挂在两个槽位（输入框右侧 + 输入区 dock），任一座位可用即可。
function useBridge(props, name) {
  const actions = bridgeActions(props);
  useEffect(() => {
    if (COMPOSER.seats.indexOf(name) < 0) COMPOSER.seats.push(name);
    COMPOSER.keys = props ? Object.keys(props).join(',') : '';
    if (actions) {
      COMPOSER.ref = actions;
      // 面板与桥万一被装成两份模块实例，靠 window 兜底也能互通
      try { window.__MPComposer = actions; } catch (e) { /* 非浏览器环境忽略 */ }
    }
    return () => { if (COMPOSER.ref === actions) COMPOSER.ref = null; };
  }, [actions, name]);
  return actions;
}

function askTextForLast() {
  const r = LAST.r;
  if (!r) return '';
  try {
    const p = Engine.askPrompt ? Engine.askPrompt(r, { question: LAST.q, interpret: LAST.it }) : null;
    return (p && p.text) || String(r.summary || '');
  } catch (e) { return String(r.summary || ''); }
}

// 输入框右侧的可见座位：挂上了就有按钮，拿不到 inputActions 就显式说一句，
// 这样「桥没挂上」与「挂上了但没给 actions」能一眼分开。
function ComposerBridge(props) {
  COMPOSER.mounted += 1;
  const actions = useBridge(props, 'input.right');
  if (!actions) {
    return h('span', { className: 'mp-chip warn', title: '命理：已占住输入框槽位，但没拿到 inputActions；把这句话告诉作者' }, '命理·未就绪');
  }
  return h('button', {
    type: 'button', className: 'mp-chip ok',
    title: LAST.r ? '把上一张盘的摘要和问题发进对话窗' : '先在侧栏「烛微命盘」里排一张盘',
    onClick: () => { const t = askTextForLast(); if (t) sendToComposer(t); },
  }, '命理·问');
}

// 输入区 dock 的安静座位：不画界面，只为在 input.right 缺席时仍能拿到 actions。
function ComposerProbe(props) {
  COMPOSER.mounted += 1;
  useBridge(props, 'composer.dock');
  return null;
}

function sendToComposer(text) {
  let ia = COMPOSER.ref;
  if (!ia) { try { ia = window.__MPComposer || null; } catch (e) { ia = null; } }
  if (!ia || typeof ia.setDraft !== 'function' || typeof ia.submit !== 'function') return false;
  ia.setDraft(text);
  ia.submit();
  return true;
}

/**
 * 起卦快捷行：输入区最上面的一条折叠面板。
 *
 * 只做入口，不做计算：onCast 由 App 接到 activate()（= recordRecent + switchTo），
 * switchTo 本来就会「起卦类自动取当前时刻 → run」，所以点一下就等于切过去并起好卦。
 * 折叠时只留一行文字（六个名字并排），展开才出 chip——窄侧栏里不该白占一行高度。
 * 展开后若已有结果，再给一个「把这张盘问进对话」：它直接复用底部的 askInChat
 * （同 Engine.askPrompt + sendToComposer 通路），不另写一份 handoff。
 */
/**
 * 盘面本体：结果区第一个块。22 个体系各写各的渲染器，这里只做分派；
 * 单独抽出来，是为了让「盘面在最前」在拼接处一眼可见，
 * 不用在几十个 + 号里找盘面到底排第几。
 */
function chartHTML(result) {
  const html = result.kind === 'ziwei' ? PP.ziweiHTML(result.r)
  : result.kind === 'bazi' ? (PP.baziHTML(result.r) + (result.trend ? PP.trendHTML(result.trend, { brief: false }) : ''))
    : result.kind === 'meihua' ? PP.meihuaHTML(result.r)
      : result.kind === 'daliuren' ? PP.daliurenHTML(result.r)
        : result.kind === 'qimen' ? (PP.qimenHTML(result.r) + PP.qimenFactsHTML(result.r))
        : result.kind === 'hepan' ? (result.r.chart === 'ziwei' ? PP.ziweiHepanHTML(result.r) : PP.hepanHTML(result.r))
        : result.kind === 'tarot' ? PP.tarotHTML(result.r)
          : result.kind === 'liuyao' ? PP.liuyaoHTML(result.r)
            : result.kind === 'chenggu' ? PP.chengguHTML(result.r)
              : result.kind === 'almanac' ? PP.almanacHTML(result.r)
              : result.kind === 'zeri' ? PP.zeriHTML(result.r)
              : result.kind === 'trend' ? PP.trendHTML(result.r)
              : result.kind === 'name' ? PP.nameHTML(result.r)
              : result.kind === 'mbti' ? PP.mbtiHTML(result.r)
              : result.kind === 'constitution' ? PP.constitutionHTML(result.r)
              : result.kind === 'wuyunliuqi' ? PP.wuyunliuqiHTML(result.r)
              : result.kind === 'taiyi' ? PP.taiyiHTML(result.r)
              : result.kind === 'fengshui' ? PP.fengshuiHTML(result.r)
              : PP.quickHTML(result.r);

  // 各体系渲染器都把「先说结论」方框摆在盘面前面（panel-kit 侧这么设计，测试也钉着）；
  // 结果卡要的是盘面第一，所以把开头那段 <section class="mp-br">…</section> 剥下来，
  // 挪到盘面之后：先看牌 / 卦，再看一句人话，然后才是技术信息。
  // 方框内容全部经过 esc，内部不可能出现 </section>，找第一处就是它的结尾。
  const end = html.startsWith('<section class="mp-br"') ? html.indexOf('</section>') : -1;
  const body = end < 0 ? html : html.slice(end + 10);
  const tail = end < 0 ? '' : html.slice(0, end + 10);
  // 盘面之后插一段「说人话」，再是「先说结论」方框；太乙自带白话层，不重复插。
  return body + PP.plainHTML(result.r) + tail;
}

function castRow(props) {
  const open = !!props.open;
  const head = h('button', {
    type: 'button', className: 'mp-castrow-h',
    'aria-expanded': open ? 'true' : 'false',
    'aria-controls': 'mp-castlist',
    onClick: props.onToggle,
    title: '展开六个占卜体系的起卦入口：点一个就切过去，并用当前时刻起卦',
  },
    h('span', { className: 'mp-castrow-t' }, '起卦'),
    h('span', { className: 'mp-castrow-l' }, open ? '六个占卜体系，点一下就起' : CAST_CHIPS.map((x) => x.label).join(' · ')),
    h('i', { className: 'mp-castrow-i', 'aria-hidden': 'true' }, open ? '▴' : '▾'));
  if (!open) return h('div', { key: 'cast', className: 'mp-castrow' }, head);
  return h('div', { key: 'cast', className: 'mp-castrow open' },
    head,
    h('div', { key: 'list', id: 'mp-castlist', className: 'mp-castlist' },
      CAST_CHIPS.map((x) => h('button', {
        key: x.sys, type: 'button',
        className: 'mp-castchip' + (props.tab === x.sys ? ' on' : ''),
        'data-cast': x.sys,
        'aria-pressed': props.tab === x.sys ? 'true' : 'false',
        title: x.tip,
        onClick: () => props.onCast(x.sys),
      }, x.label))),
    props.hasResult ? h('div', { key: 'ask', className: 'mp-castask' },
      h('button', {
        type: 'button', className: 'mp-castgo', onClick: props.onAsk,
        title: '把这张盘和所问之事发进 DSH 对话窗（与下面的「问进对话」同一个通路）',
      }, '把这张盘问进对话')) : null);
}

function App() {
  const [tab, setTab] = useState('ziwei');
  const [date, setDate] = useState('1990-05-12');
  const [time, setTime] = useState('14:30');
  // 时辰未知：只对八字与人生 K 线开放；勾上则不排时柱、起运降到按日
  const [hourUnknown, setHourUnknown] = useState(false);
  const [gender, setGender] = useState('female');
  const [address, setAddress] = useState('');
  // 合盘用的第二个人
  const [pDate, setPDate] = useState('1992-08-15');
  const [pTime, setPTime] = useState('10:00');
  const [pGender, setPGender] = useState('female');
  const [pAddress, setPAddress] = useState('');
  const [hpChart, setHpChart] = useState('bazi');
  // 三方合盘：勾选后才把第三人交给引擎，避免多两个人口时表单无故多出一排空位
  const [thirdOn, setThirdOn] = useState(false);
  const [p2Date, setP2Date] = useState('1990-01-01');
  const [p2Time, setP2Time] = useState('12:00');
  const [p2Gender, setP2Gender] = useState('male');
  const [p2Address, setP2Address] = useState('');
  // 奇门换局规则：chaibu 拆补 / chaoshen 超神接气 / zhirun 置闰（引擎三种取局口径）
  const [qimenRule, setQimenRule] = useState('chaibu');
  const [trueSolar, setTrueSolar] = useState(true);
  // 晚子时：23:00–23:59 出生时，日柱算次日还是当日（通用排盘规则里的一个可调口径）
  const [lateZi, setLateZi] = useState(true);
  const [qLateZi, setQLateZi] = useState('same-day');
  // 八字 × 紫微交叉验证；追问输入与结果
  const [crossOn, setCrossOn] = useState(false);
  const [askText, setAskText] = useState('');
  const [chatNote, setChatNote] = useState('');
  const [fx, setFx] = useState(null);
  // 验前事 / 生时校正
  const [pastMarks, setPastMarks] = useState({});
  const [fit, setFit] = useState(null);
  const [rectEvents, setRectEvents] = useState([{ year: '2019', kind: 'career' }, { year: '2022', kind: 'love' }]);
  const [rectRes, setRectRes] = useState(null);
  // 速查类（黄历/择日/称骨/小六壬/星座/生命数字/人生K线/风水/起名）专用输入
  const [task, setTask] = useState('开业');
  const [days, setDays] = useState('30');
  const [shengXiao, setShengXiao] = useState('');
  // 择日候选日：用逗号/顿号/空格分隔；填了就不扫区间，只比这几天
  const [zCand, setZCand] = useState('');
  const [convMode, setConvMode] = useState('solar2lunar');
  const [lunarDate, setLunarDate] = useState('');
  const [leapMonth, setLeapMonth] = useState(false);
  const [xlrMode, setXlrMode] = useState('time');
  const [num1, setNum1] = useState(''); const [num2, setNum2] = useState(''); const [num3, setNum3] = useState('');
  // 十六型人格：24 个 1–5 的分数（null = 未答）+ 当前页；题目按引擎给的长度初始化
  const [mbAns, setMbAns] = useState(() => new Array(mbtiInfo().total).fill(null));
  const [mbPage, setMbPage] = useState(0);
  // 体质问卷：题面从引擎卷子来（首次进 tab 时取一次），答案按题位存 45 个 null
  const [csPaper, setCsPaper] = useState(null);
  const [csAns, setCsAns] = useState(() => new Array(CS_TOTAL).fill(null));
  const [csPage, setCsPage] = useState(0);
  const [toAge, setToAge] = useState('60');
  const [fsMode, setFsMode] = useState('natal');
  const [fsPeriod, setFsPeriod] = useState('9');
  const [sitting, setSitting] = useState('子');
  const [facing, setFacing] = useState('午');
  const [nnMode, setNnMode] = useState('assess');
  const [surname, setSurname] = useState('李');
  const [givenName, setGivenName] = useState('');
  const [limitN, setLimitN] = useState('6');
  const [onlineGeo, setOnlineGeo] = useState(false);
  const [lines, setLines] = useState('');
  const [result, setResult] = useState(null);
  // 反馈入口的两处瞬时状态：复制结果提示、附加说明（4 秒后自动清空）
  const [fbCopied, setFbCopied] = useState('');
  const [fbNote, setFbNote] = useState('');
  // 首屏耗时：引擎取块、排盘、首帧（rAF 两次）三段实测；只在本机显示
  const [perf, setPerf] = useState(null);
  const [hist, setHist] = useState(() => loadHistory());
  // 首屏视图与「最近用过」：与独立页同一套存储键，分组视图下隐藏平铺 tab 条
  const [view, setView] = useState(() => (storeGet(VIEW_KEY) === 'flat' ? 'flat' : 'group'));
  const [recent, setRecent] = useState(() => {
    const v = storeGet(RECENT_KEY);
    return Array.isArray(v) ? v : [];
  });
  const [openGroups, setOpenGroups] = useState({});
  const [replayArgs, setReplayArgs] = useState(null);
  // 我的命盘（本机档案）：列表 / 改名中的那一张 / 等第二次点击确认的删除
  const [profiles, setProfiles] = useState(() => PP.profilesLoad());
  const [profEditing, setProfEditing] = useState(null);
  const [profArmed, setProfArmed] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [engineLoading, setEngineLoading] = useState(false);
  const [spread, setSpread] = useState('three');
  const [question, setQuestion] = useState('');
  const [direction, setDirection] = useState('general');
  // 对外打包的「所问」：追问优先，其次「所问之事」。复制提问 / 问进对话 / 对话桥
  // 三个出口共用这一份口径，否则问事类只填主问题时，发出去的永远是默认开场句。
  function packedQuestion() {
    return askText.trim() || (result && needAsk(result.kind) ? String(question || '').trim() : '');
  }
  // 对话桥（输入条右侧的「命理·问」）读的是 LAST.q，这里跟着结果一起更新
  useEffect(() => {
    if (result && result.r) { LAST.r = result.r; LAST.q = packedQuestion(); LAST.it = result.it || null; }
  }, [result, askText, question]);
  // 解析模块较长：窄屏默认收起、宽屏默认展开；用户手动切过就以他的选择为准
  const [foldPref, setFoldPref] = useState(null);
  // 起卦快捷行：默认折叠（只占一行），切过就记住——只存布尔，不存任何输入内容
  const [chipOpen, setChipOpen] = useState(storeGet(CHIP_KEY) === true);
  // 「所问之事」未填就起卦时，输入框转红提示
  const [askInvalid, setAskInvalid] = useState(false);
  const [mhMode, setMhMode] = useState('time');
  const [upper, setUpper] = useState('');
  const [lower, setLower] = useState('');
  const [changing, setChanging] = useState('');
  const [copied, setCopied] = useState('');
  // 用户手动改过的日期/时刻，按语义分类分别记忆；null = 没改过，跟随自动值。
  // 分两类记的原因：出生时间与起卦时刻语义不同，跨类别时上一次的输入已无意义，
  // 所以从「八字」切到「六爻」会自动换成当前时刻，而切回「八字」仍是你填的出生时间。
  const [manual, setManual] = useState({ birth: null, cast: null });

  const meta = TABS.find((t) => t.k === tab) || TABS[0];
  const isBirth = tab === 'bazi' || tab === 'ziwei' || tab === 'hepan'
    || tab === 'chenggu' || tab === 'trend' || tab === 'fengshui' || tab === 'name';
  const timeKind = kindOf(tab);
  const usesTimeInput = !(tab === 'meihua' && mhMode === 'number');
  // 人格问卷与日期无关：留着起卦日期/时刻只会让人以为要填生辰
  const showDate = tab !== 'tarot' && tab !== 'mbti' && tab !== 'constitution' && usesTimeInput;
  const showTime = showDate && timeKind !== 'date';
  const showDT = showTime;

  const run = async (kind, override, modeOverride, over) => {
    const k = kind || tab;
    const mh = modeOverride || mhMode;
    // 勾了「时辰未知」就不读钟点：读出来的只是占位值，用它排出来的时柱是编的
    const canUnknown = k === 'bazi' || k === 'trend';
    const huV = over && typeof over.hourUnknown === 'boolean' ? over.hourUnknown : hourUnknown;
    const dt = override ? override : (canUnknown && huV ? { date, time: '12:00' } : { date, time });
    // over：示例等「临时覆盖」用，避免依赖 React 状态更新后再读（同一个 handler 里 setState 还没生效）
    const genderV = over && over.gender ? over.gender : gender;
    const addressV = over && typeof over.address === 'string' ? over.address : address;
    // 深链还原：表单状态要等下一次渲染才生效，所以这几个值也允许经 over 直传（与 gender/address 同理）
    const tsV = over && typeof over.trueSolar === 'boolean' ? over.trueSolar : trueSolar;
    const lateZiV = over && typeof over.lateZi === 'boolean' ? over.lateZi : lateZi;
    const linesV = over && typeof over.lines === 'string' ? over.lines : lines;
    const questionV = over && typeof over.question === 'string' ? over.question : question;
    // 首屏计时从点按钮这一刻起；runToken 防止连续点两次时旧的一次把新数字覆盖掉
    const runStart = mpNow();
    const runToken = ++perfSeq;
    // 同一次「点排盘」在 await 之后还要写结果、错误、历史：只要期间用户又点了一次或换了 tab，
    // 这次就是过期的一次。过期只影响本次是否落笔，不影响排盘正确性——但不能让旧盘盖掉新盘。
    const stale = () => runToken !== perfSeq;
    setPerf(null);
    setNotice('');   // 上一次的提示（如「先答满 12 题」）不该跟着新结果一起留下
    try {
      let engineMs = 0;
      let engineCached = null;
      setEngineLoading(true);
      try {
        await ensureEngine(k);
        const load = window.__MP_LAST_LOAD;
        engineMs = load && typeof load.ms === 'number' ? load.ms : mpNow() - runStart;
        engineCached = load && typeof load.cached === 'boolean' ? load.cached : null;
      } catch (e) {
        if (stale()) return;
        setError(e && e.message ? e.message : String(e));
        setResult(null);
        return;
      } finally {
        // 过期的一次不能关掉新一次的开机状态：A 的 ensureEngine 晚于 B 落定时，
        // 这里无条件置 false 会让 B 还在加载时转圈先消失。
        if (!stale()) setEngineLoading(false);
      }
      if (stale()) return;
      const datetime = `${dt.date}T${dt.time}`;
      const args = { system: k };
      // 人格问卷不是盘：不挂影子盘 ID，避免把「第几次答到第几题」当成一张盘存档
      args.shadow = k !== 'mbti' && k !== 'constitution';
      // 推导链只覆盖六爻 / 八字 / 紫微；其余体系没有中间层可摊
      args.trace = k === 'liuyao' || k === 'bazi' || k === 'ziwei' || k === 'qimen' || k === 'daliuren';
      if (k !== 'tarot') args.datetime = datetime;
      // 人生K线也是出生盘：出生地决定真太阳时，落进时柱后会改变整条运程
      if (k === 'bazi' || k === 'ziwei' || k === 'hepan' || k === 'trend') {
        // 合盘的主方同样需要性别与出生地：漏掉这两个字段会让合盘拿不到性别（引擎已改为必填），
        // 或者在没有真太阳时的情况下排出与单盘不一致的四柱
        args.gender = genderV;
        args.trueSolar = tsV;
        if (addressV.trim()) {
          args.address = addressV.trim();
          try {
            const g = await Engine.geocodeAddress(args.address, { online: onlineGeo });
            if (g && typeof g.lon === 'number') { args.longitude = g.lon; args.geo = g; }
          } catch (e) {
            console.error('[metaphysics] 地址解析失败，退回内置表', e);
          }
          // 联网解析可能几百毫秒，期间足够用户改日期再点一次：过期就不必接着排这张旧盘
          if (stale()) return;
        }
        // 交叉验证只对八字/紫微有意义：引擎会用同一份出生信息再排另一套盘
        if (k === 'bazi' || k === 'ziwei') args.cross = crossOn;
        args.lateZi = lateZiV;
        if (canUnknown && huV) args.hourUnknown = true;
      }
      if (k === 'liuyao') {
        const parsed = Core.parseLines(linesV);
        if (parsed.lines) args.lines = parsed.lines;
        else if (parsed.warning) setNotice(parsed.warning);
      }
      if (k === 'qimen') { args.juMethod = qimenRule; args.lateZiHourMode = qLateZi; args.direction = direction; }
      // 八字：验前事只读信号随盘一起算（不改盘）
      if (k === 'bazi') args.verifyPast = 6;
      // 速查类：各体系自己的最小输入
      if (k === 'zeri') {
        args.startDate = dt.date;
        args.task = task;
        args.days = Number(days) || 30;
        if (shengXiao) args.shengXiao = shengXiao;
        const cand = zCand.split(/[,，、\s]+/).filter(Boolean);
        if (cand.length) args.candidates = cand;
      }
      if (k === 'xiaoliuren') {
        args.mode = xlrMode;
        if (xlrMode === 'number') {
          args.num1 = Number(num1) || undefined;
          args.num2 = Number(num2) || undefined;
          args.num3 = Number(num3) || undefined;
        } else {
          args.date = dt.date;
          const hh = Number(String(dt.time).split(':')[0]);
          args.hour = Number.isFinite(hh) ? hh : 12;
        }
      }
      if (k === 'mbti') {
        delete args.datetime;
        // 末尾连着没答的先去掉了再交给引擎：引擎把 null 当跳过，但没必要传一整段空位
        const nums = mbAns.slice();
        while (nums.length && nums[nums.length - 1] == null) nums.pop();
        if (nums.length) args.answers = nums;
      }
      if (k === 'constitution') {
        delete args.datetime;
        // 体质问卷必须传满 45 个：引擎按题位对齐体质，null 表示跳过，缩短数组会直接报错
        args.answers = csAns.slice();
      }
      if (k === 'trend' && canUnknown && huV) args.hourUnknown = true;
      // 性别 / 出生地 / 两个开关已在上面的出生盘分支里给齐，这里只补 K 线自己的参数
      if (k === 'trend') args.toAge = Number(toAge) || 60;
      if (k === 'fengshui') {
        args.action = fsMode;
        if (fsMode === 'natal') { args.gender = genderV; }
        else {
          args.sitting = sitting;
          args.facing = facing;
          delete args.datetime;
          if (fsMode === 'xuankong') args.period = Number(fsPeriod) || 9;
        }
      }
      if (k === 'name') {
        args.action = nnMode;
        args.surname = surname.trim();
        if (nnMode === 'generate') {
          args.gender = genderV; args.limit = Number(limitN) || 6;
          args.trueSolar = tsV; args.lateZi = lateZiV;
        } else {
          args.givenName = givenName.trim();
          // 生辰留着：填了就按喜用判、空着 engine 自己只评字面五行
          if (!dt.date || !dt.time) delete args.datetime;
        }
      }
      if (k === 'convert') {
        args.system = 'convert';
        if (convMode === 'lunar2solar') {
          const m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(lunarDate).trim());
          if (!m) {
            setError('农历转公历请按「农历年-月-日」填写，例如 2026-9-17；闰月单独勾选。');
            return;
          }
          args.mode = 'lunar2solar';
          args.lunarYear = Number(m[1]);
          args.lunarMonth = Number(m[2]);
          args.lunarDay = Number(m[3]);
          args.isLeapMonth = leapMonth;
          delete args.datetime;
        } else {
          args.mode = 'solar2lunar';
        }
      }
      if (k === 'tarot') args.spread = spread;
      if (k === 'hepan') {
        args.chart = hpChart;
        args.partner = {
          datetime: `${pDate}T${pTime}`,
          gender: pGender,
          address: pAddress.trim() || undefined,
          trueSolar,
        };
        if (thirdOn) {
          args.partner2 = {
            datetime: `${p2Date}T${p2Time}`,
            gender: p2Gender,
            address: p2Address.trim() || undefined,
            trueSolar,
          };
        }
      }
      // 所问之事必填：问事的体系不给一份没有落点的解读
      if (needAsk(k)) {
        if (!questionV.trim()) {
          setError('请先填写「所问之事」——一句话即可，例如：今年是否适合换工作？');
          setAskInvalid(true);
          setResult(null);
          return;
        }
        setAskInvalid(false);
        args.question = questionV.trim();
        // 六爻的用神由「询问方向」定；不传给 compute 的话，盘面与推导链都会退成综合
        if (k === 'liuyao') args.direction = direction;
      }
      if (k === 'meihua') {
        args.mode = mh;
        if (mh === 'number') {
          // 空输入会被 Number('') 变成 0，进而余 8 起成坤为地——必须挡掉
          if (upper.trim() === '' || lower.trim() === '') {
            setError('数字起卦需要填两个数（第一个数定上卦、第二个数定下卦）。');
            setResult(null);
            return;
          }
          args.upper = Number(upper);
          args.lower = Number(lower);
          if (!Number.isFinite(args.upper) || !Number.isFinite(args.lower)) {
            setError('两个数都要是数字，例如 17 和 29。');
            setResult(null);
            return;
          }
          if (changing !== '') args.changing = Number(changing);
        }
      }
      const computeStart = mpNow();
      // 「现在走到第几步」要有当前日期；引擎不读挂钟，由界面以 asOf 传入
      if (k === 'trend' && !args.asOf && Core.todayStamp) args.asOf = Core.todayStamp();
      const r = Engine.compute(args);
      const computeMs = mpNow() - computeStart;
      // 影子盘：先与本地上一张同 baseId 的盘比对，再存档；失败不影响主结果
      let shadowDiff = null;
      try { shadowDiff = PP.shadowTrack ? PP.shadowTrack(r) : null; } catch (e) { shadowDiff = null; }
      // 八字结果里直接嵌人生 K 线：同一份出生信息再排一次 trend，确定性、无网络
      let trend = null;
      if (k === 'bazi') {
        try {
          trend = Engine.compute({
            system: 'trend', datetime, gender: genderV, toAge: 100,
            trueSolar: tsV, lateZi: lateZiV,
            // K 线里的「你现在」要落在正确的大运上：默认取界面当天
            ...(Core.todayStamp ? { asOf: args.asOf || Core.todayStamp() } : {}),
            ...(args.dst !== undefined ? { dst: args.dst } : {}),
            ...(args.address ? { address: args.address } : {}),
            ...(typeof args.longitude === 'number' ? { longitude: args.longitude } : {}),
            ...(args.geo ? { geo: args.geo } : {}),
          });
        } catch (e) { trend = null; }
      }
      // 口径对照：只对 bazi / ziwei / qimen 有开关表；额外排 2–3 张盘，失败不影响主结果
      let caliber = null;
      if (Engine.caliberCompare) {
        try { caliber = Engine.caliberCompare(args); } catch (e) { caliber = null; }
      }
      // 问题与方向一并与卦象交给解读：解读按它展开，并在开头回显供确认。
      // 奇门虽然不问事，但「询问方向」决定取哪个门/星作用神，所以也要传。
      const ask = (needAsk(k) || k === 'qimen')
        ? { question: needAsk(k) ? questionV.trim() : '', direction }
        : undefined;
      const it = Engine.interpret ? Engine.interpret(r, ask) : null;
      // 交叉验证结果由 compute 挂在盘面对象上，这里补进解析分节（与独立页同一渲染路径）
      if (it && r.cross && Engine.crossSection) {
        it.sections = [...(it.sections || []), Engine.crossSection(r.cross)];
      }
      // timed：这次结果是否真的用到了「起卦时刻」（梅花数字起卦不用）
      const timed = kindOf(k) === 'cast' && (k !== 'meihua' || mh === 'time');
      // 生时校正要按「这张盘用的出生信息」反推，而不是表单此刻的值：用户改完没重排时
      // 两者可能不同，拿表单值算出来的候选时辰就贴到了另一张盘上。
      setResult({ kind: k, r, it, at: dt, timed, trend, caliber, shadowDiff,
        gender: genderV, address: addressV, trueSolar: tsV, lateZi: lateZiV });
      // 首帧：等 React 提交并绘制两帧后再记总时长，避免把「还没画出来」算进渲染
      const draw = (n) => {
        if (typeof requestAnimationFrame === 'function') requestAnimationFrame(() => (n > 1 ? draw(n - 1) : commitPerf()));
        else setTimeout(commitPerf, 0);
      };
      const commitPerf = () => {
        if (runToken !== perfSeq) return;
        setPerf({ engineMs, computeMs, cached: engineCached, totalMs: mpNow() - runStart, renderMs: null });
      };
      draw(2);
      setFx(null); setFit(null); setPastMarks({}); setRectRes(null);
      setError('');      setCopied('');
      // 历史记录：塔罗是随机抽牌，重放会变成另一副牌；人格的输入是 24 个答案、没存进来，重放也没法还原。两者都不入历史
      if (k !== 'tarot' && k !== 'mbti' && k !== 'constitution') {
        // 记「这次实际用的输入」，不是渲染闭包里的旧 state：切换体系 / 看示例 / 载入档案
        // 都是在同一个 handler 里先 setState 再 run，闭包读到的还是上一张盘的日期。
        const huV2 = !!(canUnknown && huV);
        const entry = {
          kind: k,
          date: dt.date,
          // 时辰未知时 dt.time 是 12:00 占位值，不能写进历史（会显示成假的正午出生）
          time: huV2 ? '' : dt.time,
          hourUnknown: huV2,
          gender: genderV, address: addressV,
          // 两个开关同样换个排法：不存下来，重放就只能跟着表单此刻的勾选走
          trueSolar: tsV, lateZi: lateZiV,
          lines: k === 'liuyao' ? linesV : '',
          question: needAsk(k) ? questionV.trim() : '',
          direction, spread,
          mhMode: mh, upper, lower, changing,
          // 各体系自己的输入也是这张结果的输入：只存日期，重放就会按表单此刻的
          // 流派 / 事项 / 起卦方式重算，看到的已不是当初那一张
          ...(k === 'qimen' ? { qimenRule, qLateZi } : {}),
          ...(k === 'zeri' ? { task, days, shengXiao, zCand } : {}),
          ...(k === 'xiaoliuren' ? { xlrMode, num1, num2, num3 } : {}),
          ...(k === 'trend' ? { toAge } : {}),
          ...(k === 'fengshui' ? { fsMode, fsPeriod, sitting, facing } : {}),
          ...(k === 'name' ? { nnMode, surname, givenName, limitN } : {}),
          ...(k === 'convert' ? { convMode, lunarDate, leapMonth } : {}),
          // 合盘的对方（及第三方）出生信息也是这张盘的输入：不存，重放就会拿表单里
          // 此刻的对方生日重排，排出来的已不是当初看的那一张
          ...(k === 'hepan' ? {
            hpChart,
            partnerDate: pDate, partnerTime: pTime, partnerGender: pGender, partnerAddress: pAddress,
            thirdOn, p2Date, p2Time, p2Gender, p2Address,
          } : {}),
          label: HISTORY_LABEL(k, r),
          at: Date.now(),
        };
        setHist((prev) => {
          const next = [entry, ...prev.filter((x) => !sameEntry(x, entry))].slice(0, 20);
          saveHistory(next);
          return next;
        });
        // 卦例库改手动保存（用户反馈「点点就自动存根本不需要」）：只把这次的 entry
        // 记到 LAST 供「存入卦例库」按钮用；真存要等用户点按钮才发生。
        // tarot/mbti/constitution 与历史同一条不存线——重放还原不了当初那张。
        if (k !== 'tarot' && k !== 'mbti' && k !== 'constitution') LAST.entry = entry;
        setCaseSaved(false);
      }
    } catch (e) {
      if (stale()) return;
      setError(e && e.message ? e.message : String(e));
      setResult(null);
    }
  };

  /** 切 tab：起卦类自动取当前时刻、命盘类回到示例默认；用户在这类下改过则保留他的值 */
  const switchTo = async (next) => {
    const k = kindOf(next);
    // 换 tab 就是把上一张在途的盘作废：连点两个 tab 时，先完成的那次不该把 tab 拨回去
    const switchSeq = ++perfSeq;
    setError('');
    // 人格 tab 的输入就是问卷本身：题面在引擎分块里，先加载再切，避免先渲染出空问卷
    if (next === 'mbti') {
      setNotice('');
      setEngineLoading(true);
      try { await ensureEngine(next); } catch (e) {
        if (switchSeq === perfSeq) setError(e && e.message ? e.message : String(e));
      } finally {
        if (switchSeq === perfSeq) setEngineLoading(false);
      }
      if (switchSeq !== perfSeq) return;
      setTab(next);
      if (mbAns.filter((v) => v != null).length >= MBTI_MIN) run(next);
      else setResult(null);
      return;
    }
    // 体质问卷的题面也在引擎分块里：与人格一样先加载再切，题面到了才渲染
    if (next === 'constitution') {
      setNotice('');
      setEngineLoading(true);
      try {
        await ensureEngine(next);
        if (switchSeq === perfSeq && !csPaper) {
          const p = Engine.compute({ system: 'constitution' });
          if (p && p.paper) setCsPaper(p);
        }
      } catch (e) {
        if (switchSeq === perfSeq) setError(e && e.message ? e.message : String(e));
      } finally {
        if (switchSeq === perfSeq) setEngineLoading(false);
      }
      if (switchSeq !== perfSeq) return;
      setTab(next);
      if (csAns.filter((v) => v != null).length >= CS_MIN) run(next);
      else setResult(null);
      return;
    }
    setTab(next);
    if (k === 'none') { run(next); return; } // 塔罗不看时间，直接抽牌（与 web-ui 一致）
    const v = manual[k] || (k === 'cast' || k === 'date' ? nowParts() : { date: SAMPLE.date, time: SAMPLE.time });
    setDate(v.date);
    setTime(v.time);
    run(next, v);
  };

  /** 「最近用过」：只在用户点入口时记，初始化不写；存储失败静默降级 */
  const recordRecent = (k) => {
    if (!TABS.some((t) => t.k === k)) return;
    setRecent((prev) => {
      const list = (prev || []).filter((x) => x && x.tab && x.tab !== k);
      const next = [{ tab: k, at: Date.now() }].concat(list).slice(0, RECENT_MAX);
      storeSet(RECENT_KEY, next);
      return next;
    });
  };
  const changeView = (v) => {
    const next = v === 'flat' ? 'flat' : 'group';
    setView(next);
    storeSet(VIEW_KEY, next);
  };
  /** 两套入口共用：先记录，再走 switchTo（与独立页 activate 同一路径） */
  const activate = (k) => {
    recordRecent(k);
    switchTo(k);
  };

  /**
   * 起卦快捷行：折叠开关 + 一键起卦。
   * onCast 与 tab 卡、tabs 条走同一个 activate——起卦类 tab 在 switchTo 里会自动
   * 取当前时刻再 run，所以这里不需要（也不该）自己调 run：多一条排盘路径就多一处
   * 「自动取当下」的口径分叉。
   */
  const toggleChips = () => {
    const next = !chipOpen;
    setChipOpen(next);
    storeSet(CHIP_KEY, next);
  };
  const castChip = (k) => {
    activate(k);
  };

  /** 手动改日期/时刻：记进当前语义分类，之后切同类 tab 会保留 */
  const editDate = (value) => {
    setDate(value);
    if (timeKind !== 'none') setManual((m) => Object.assign({}, m, { [timeKind]: { date: value, time } }));
  };
  const editTime = (value) => {
    setTime(value);
    if (timeKind !== 'none') setManual((m) => Object.assign({}, m, { [timeKind]: { date, time: value } }));
  };

  const runNow = () => {
    const t = nowParts();
    setDate(t.date);
    setTime(t.time);
    // 「此刻」是明确的「回到自动」：清掉该类下的手动值，以后切 tab 仍会跟随当前时刻
    if (timeKind !== 'none') setManual((m) => Object.assign({}, m, { [timeKind]: null }));
    run(tab, t);
  };

  /**
   * 主按钮：时间仍是「自动」状态（没手动改过）时，点它就取当下再起卦；
   * 手动改过则用你填的时刻。这样不必再单独放一个「此刻」按钮。
   */
  const go = () => {
    // 人格问卷不看时间：先确认答够，再走同一套计算
    if (tab === 'mbti') {
      const n = mbAns.filter((v) => v != null).length;
      if (n < MBTI_MIN) {
        setNotice(`先答满 ${MBTI_MIN} 题再看结果（现答 ${n} 题，还差 ${MBTI_MIN - n} 题）。`);
        return;
      }
      run(tab);
      return;
    }
    // 体质问卷同样不看时间：先确认答够，再走同一套计算
    if (tab === 'constitution') {
      const n = csAns.filter((v) => v != null).length;
      if (n < CS_MIN) {
        setNotice(`先答满 ${CS_MIN} 题再看结果（现答 ${n} 题，还差 ${CS_MIN - n} 题）。`);
        return;
      }
      run(tab);
      return;
    }
    if (timeKind !== 'none' && !manual[timeKind]) {
      const t = nowParts();
      setDate(t.date);
      setTime(t.time);
      run(tab, t);
      return;
    }
    run(tab);
  };

  /** 看示例：固定一份示例盘，走与真实排盘完全相同的渲染路径（不新增任何「示例专用」分支） */
  const openSample = () => {
    const sample = { date: '1990-05-12', time: '14:30' };
    setTab('bazi');
    setGender('male');
    setAddress('河北石家庄');
    setManual((m) => Object.assign({}, m, { birth: sample }));
    setDate(sample.date);
    setTime(sample.time);
    run('bazi', sample, null, { gender: 'male', address: '河北石家庄' });
  };

  /** 切起卦方式（时间/数字）：立刻重起一卦，避免结果头部留着上一模式的「起卦时刻」 */
  const switchMode = (m) => {
    setMhMode(m);
    run(tab, { date, time }, m);
  };

  const isNarrow = () => !!(window.matchMedia && window.matchMedia('(max-width: 640px)').matches);
  const defaultFolded = () => (foldPref === null ? isNarrow() : foldPref);

  /** 一键复制：优先 Clipboard API，失败退回 textarea + execCommand；按钮文案复制后 1.4s 复位 */
  const copyTextTo = (btn, text, idleLabel) => {
    if (!text) return;
    const done = (ok) => {
      btn.textContent = ok ? '已复制' : '复制失败';
      setTimeout(() => { btn.textContent = idleLabel; }, 1400);
    };
    const legacy = () => {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        const ok = !!(document.execCommand && document.execCommand('copy'));
        document.body.removeChild(ta);
        return ok;
      } catch (e) { return false; }
    };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => done(true), () => done(legacy()));
        return;
      }
    } catch (e) { /* 走下面的兜底 */ }
    done(legacy());
  };

  /** 影子盘 ID 一键复制 */
  const copyShadowId = (btn) => copyTextTo(btn, btn.getAttribute('data-shadow-copy') || '', '复制 ID');

  /** 排盘句柄一键复制：给助手追问同一张盘时直接粘贴 */
  const copyHandle = (btn) => copyTextTo(btn, btn.getAttribute('data-handle-copy') || '', '复制句柄');

  /** 推导链整条复制：内容取自抽屉里的隐藏 textarea（与引擎 traceText 同源，不在这里重排） */
  const copyTraceMarkdown = (btn) => {
    const layer = btn.closest('.mp-trace-layer') || document.getElementById('mp-trace-layer');
    const box = layer && layer.querySelector('[data-trace-md]');
    copyTextTo(btn, box ? box.value : '', '复制 Markdown');
  };

  // ── C3 桥替代：三档复制 + 深链 ────────────────────────────────
  // 桥（conversation.input.right）能用就先用桥；这几档是桥缺席时的退路，平时也在，
  // 因为「复制参数给助手自己调」「发条链接给朋友」本身就是正经用法，不是只有坏掉时才想起来的东西。
  const pageBase = () => {
    try { return String(location.href).split('#')[0]; } catch (e) { return ''; }
  };
  const bridgePackages = () => {
    if (!result || !result.r) return null;
    try {
      if (!Engine.askPackages) return null;
      return Engine.askPackages(result.r, { question: packedQuestion(), interpret: result.it, base: pageBase() });
    } catch (e) { return null; }
  };
  const BRIDGE_KINDS = [
    ['full', '复制提问', '完整提问：盘面摘要 + 阅读层次 + 回答骨架，粘进任何对话窗都能用'],
    ['brief', '复制精简', '一句话版：体系 + 排盘句柄 + 你的问题，够助手认出是哪张盘'],
    ['structured', '复制参数', '结构化参数（JSON）：助手可直接照 args 调 compute，不必解析自然语言'],
    ['link', '复制深链', '深链：把这张盘的参数编进链接，打开即还原同一张盘（换台机器、发给朋友都行）'],
  ];
  const copyBridge = (kind, btn) => {
    const pkg = bridgePackages();
    if (!pkg) { setChatNote('还没有可以复制的盘：先排一张。'); return; }
    const text = kind === 'link' ? pkg.link : pkg[kind];
    if (!text) {
      setChatNote(kind === 'link'
        ? '这张盘没拿到句柄（随机抽牌只复现参数、不复现牌面），深链做不出来；用「复制提问」那一档。'
        : '这一档暂时是空的，换一档试试。');
      return;
    }
    copyTextTo(btn, text, BRIDGE_KINDS.find((x) => x[0] === kind)[1]);
    if (kind === 'link') setChatNote('深链已复制：打开就还原这张盘，也可以直接发给别人。链接里是编码不是加密，别公开贴。');
  };

  /** 推导链抽屉：打开时锁住背景滚动并把焦点交给关闭按钮；关闭后焦点回入口 */
  const traceOpen = () => {
    const layer = document.getElementById('mp-trace-layer');
    if (!layer) return;
    layer.classList.add('open');
    layer.setAttribute('aria-hidden', 'false');
    const close = layer.querySelector('[data-trace-close]');
    if (close && close.focus) close.focus();
  };
  const traceClose = () => {
    const layer = document.getElementById('mp-trace-layer');
    if (!layer) return;
    layer.classList.remove('open');
    layer.setAttribute('aria-hidden', 'true');
    const trigger = document.querySelector('[data-trace-open]');
    if (trigger && trigger.focus) trigger.focus();
  };

  /** 解析模块折叠：标题栏整栏可点（内容由 innerHTML 渲染，用委托处理） */
  const onFoldClick = (e) => {
    const copyBtn = e.target && e.target.closest ? e.target.closest('[data-shadow-copy]') : null;
    if (copyBtn) { copyShadowId(copyBtn); return; }
    const handleCopy = e.target && e.target.closest ? e.target.closest('[data-handle-copy]') : null;
    if (handleCopy) { copyHandle(handleCopy); return; }
    const traceBtn = e.target && e.target.closest ? e.target.closest('[data-trace-open]') : null;
    if (traceBtn) { traceOpen(); return; }
    const traceCopy = e.target && e.target.closest ? e.target.closest('[data-trace-copy]') : null;
    if (traceCopy) { copyTraceMarkdown(traceCopy); return; }
    const askCopyBtn = e.target && e.target.closest ? e.target.closest('[data-mp-askcopy]') : null;
    if (askCopyBtn) { copyAskPrompt(); return; }
    const traceBack = e.target && e.target.closest ? e.target.closest('[data-trace-close]') : null;
    if (traceBack) { traceClose(); return; }
    const head = e.target && e.target.closest ? e.target.closest('.mp-it-head') : null;
    if (!head) return;
    const box = head.closest('.mp-it');
    if (!box) return;
    const folded = !box.classList.contains('folded');
    box.classList.toggle('folded', folded);
    head.setAttribute('aria-expanded', folded ? 'false' : 'true');
    const hint = head.querySelector('.mp-it-hint');
    if (hint) hint.textContent = folded ? '点击展开' : '点击收起';
    setFoldPref(folded);
  };

  /** 改问题或方向：拿缓存的卦象重出解读，不重摇一卦 */
  const refreshInterpret = (dir, q) => {
    if (!result || !(needAsk(tab) || tab === 'qimen')) return;
    const ask = {
      question: needAsk(tab) ? (q === undefined ? question : q).trim() : '',
      direction: dir === undefined ? direction : dir,
    };
    const it = Engine.interpret ? Engine.interpret(result.r, ask) : null;
    // 六爻改方向只重出解读、不重摇；推导链里的用神 / 旺衰 / 伏神也要按新方向重算
    // 奇门的用神落宫同理由方向决定，重排这一层即可，不必重新起局
    let r = result.r;
    if ((tab === 'liuyao' || tab === 'qimen') && r && r.trace && Engine.buildTrace) {
      try {
        const trace = tab === 'liuyao'
          ? Engine.buildTrace(r, { direction: ask.direction, gender: (r.useGod && r.useGod.gender) || 'male', refresh: true })
          : Engine.buildTrace(r, { direction: ask.direction });
        if (trace) r = Object.assign({}, r, { trace });
      } catch (e) { /* 保留起卦时的推导链 */ }
    }
    setResult(Object.assign({}, result, { r, it }));
  };

  /** 结果头部的一行「起卦时刻」，只在真正用到时间的起卦 tab 显示 */
  const castAtHTML = (res) => {
    if (!res || !res.timed || !res.at) return '';
    return `<div class="mp-cast">起卦时刻：<b>${res.at.date} ${res.at.time}</b>　（来自你的本机时间，点「此刻」可重新取当下）</div>`;
  };

  const copyResult = () => {
    try {
      const text = result && result.r && result.r.summary ? result.r.summary : '';
      if (!text) return;
      navigator.clipboard.writeText(text).then(() => setCopied('已复制'), () => setCopied('复制失败'));
    } catch (e) { setCopied('复制失败'); }
  };
  /** 复制问事提示：把当前盘 + 问题打包，方向映射到问事类型；命盘类不会渲染这个按钮 */
  const copyAskPrompt = () => {
    if (!result || !result.r || !window.Engine || !window.Engine.buildEventPrompt) return;
    const kind = (Core && Core.kindOfDirection ? Core.kindOfDirection(direction) : 'other');
    let p;
    try { p = window.Engine.buildEventPrompt(result.r, { question: (question || '').trim(), kind, gender, timeKnown: true }); }
    catch (e) { p = null; }
    if (p && p.text) navigator.clipboard.writeText(p.text).then(() => setCopied('已复制问事提示'), () => setCopied('复制失败'));
  };

  /** 追问：只从已算好的盘面取数，不重排 */
  const doAsk = () => {
    if (!result || !result.r || !askText.trim()) return;
    try {
      setFx(Engine.followup ? Engine.followup(result.r, askText.trim()) : null);
    } catch (e) { setFx({ question: askText.trim(), ok: false, answer: '追问失败：' + (e && e.message ? e.message : e), evidence: [], confidence: '弱' }); }
  };

  /** 问进对话：把当前盘与问题整理成一段提问，写进 DSH 输入框并提交 */
  const askInChat = () => {
    if (!result || !result.r) return;
    try {
      const p = Engine.askPrompt ? Engine.askPrompt(result.r, { question: packedQuestion(), interpret: result.it }) : null;
      const text = p && p.text ? p.text : String(result.r.summary || '');
      if (sendToComposer(text)) { setChatNote('已发到对话窗，往下看回复。'); return; }
      const diag = '（' + bridgeDiagText() + '）';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          () => setChatNote('对话输入框还没就绪' + diag + '，已复制提问；粘进对话窗回车即可。'),
          () => setChatNote('对话输入框还没就绪' + diag + '，复制也没成功；先点「复制文字结果」再贴。'));
      } else { setChatNote('对话输入框还没就绪' + diag + '；先点「复制文字结果」再贴进对话窗。'); }
    } catch (e) { setChatNote('发到对话窗失败：' + (e && e.message ? e.message : e)); }
  };

  /**
   * 反馈报告：把「开发者要反复追问的那几项」自动拼好——版本、环境、体系、完整输入、结果摘要、报错。
   *
   * 为什么要有它：反馈里最缺的从来不是意见，是复现信息。用户说「八字算得不对」，
   * 没有出生时间、没有开关状态、没有版本号，就没法复现；来回问三轮，多半人就走了。
   * 这里点一下就把这些全填好，用户只需补一句「哪里不对」。
   *
   * 隐私边界：只带盘面参数与引擎自己的输出，不带命盘档案、不带追问原文以外的任何本机信息：
   *  - 出生时间/地点是用户自己主动要反馈的那张盘，属于必要信息；
   *  - 不带 localStorage 里的「我的命盘」列表（那是别人的盘）；
   *  - 不带设备信息、浏览器指纹、IP、安装路径。
   */
  const feedbackReport = () => {
    const L = [];
    const ver = window.__MP_VER || '未知';
    L.push('# 命理插件反馈');
    L.push('');
    L.push('## 我遇到的情况');
    L.push('');
    L.push('（在这里写一句就好：哪里不对 / 读不懂哪一段 / 算得和别人不一样 / 想加什么。下面这些是自动带的复现信息，不用改。）');
    L.push('');
    L.push('## 复现信息');
    L.push('');
    L.push('- 插件版本：v' + ver);
    {
      const un = Array.isArray(window.__MP_UNRELEASED) ? window.__MP_UNRELEASED : [];
      if (un.length) L.push('- 未发版改动：' + un.length + ' 项（版本号未变，说明这份产物比 v' + ver + ' 新）');
    }
    const tabName = TABS.find((x) => x.k === tab)?.label || tab;
    L.push('- 体系：' + tabName + (tabName === tab ? '' : '（' + tab + '）'));
    if (question) L.push('- 所问之事：' + question);
    if (direction && direction !== 'general') {
      const dl = (Array.isArray(Engine.DIRECTIONS) ? Engine.DIRECTIONS : []).find((x) => x.key === direction);
      L.push('- 询问方向：' + (dl ? dl.label : direction));
    }
    L.push('');
    L.push('### 输入');
    L.push('');
    L.push('```');
    if (kindOf(tab) === 'time' || kindOf(tab) === 'date') {
      L.push(`日期：${date}`);
      if (kindOf(tab) === 'time') L.push(`时刻：${hourUnknown ? '（未知，按三柱排）' : time}`);
      L.push(`性别：${gender === 'male' ? '男' : '女'}`);
      if (address) L.push(`出生地：${address}`);
      L.push(`真太阳时：${trueSolar ? '开' : '关'}　晚子时换日：${lateZi ? '开' : '关'}`);
      if (tab === 'qimen') L.push(`奇门取局：${qimenRule}`);
      if (crossOn) L.push('交叉验证：开');
    }
    // 各体系自己的输入项：直接摊出当前表单值，省得逐个体系手写
    const extras = {
      合盘: () => { L.push(`对方：${pDate} ${pTime} ${pGender === 'male' ? '男' : '女'}${pAddress ? ' ' + pAddress : ''}（${hpChart} 盘）`);
        if (thirdOn) L.push(`第三方：${p2Date} ${p2Time} ${p2Gender === 'male' ? '男' : '女'}${p2Address ? ' ' + p2Address : ''}`); },
      择日: () => { L.push(`事项：${task}　起算：${date}　天数：${days}${shengXiao ? '　属相：' + shengXiao : ''}${zCand ? '　候选日：' + zCand : ''}`); },
      起名: () => { L.push(`姓：${surname || '（未填）'}　名：${givenName || '（未填）'}　模式：${nnMode}${nnMode === 'generate' ? '　候选数：' + (limitN || '默认') : ''}`); },
      公农历: () => { L.push(`模式：${convMode}${lunarDate ? '　农历输入：' + lunarDate : ''}${leapMonth ? '（闰月）' : ''}`); },
      小六壬: () => { L.push(`模式：${xlrMode}${xlrMode === 'number' ? `　报数：${num1}/${num2}/${num3}` : ''}`); },
      风水: () => { L.push(`动作：${fsMode}${fsMode === 'natal' ? '' : `　坐：${sitting}　向：${facing}`}${fsMode === 'xuankong' ? `　运：${fsPeriod}` : ''}`); },
    };
    if (extras[tabName]) extras[tabName]();
    L.push('```');
    L.push('');
    if (error) {
      L.push('### 报错原文');
      L.push('');
      L.push('```');
      L.push(String(error));
      L.push('```');
      L.push('');
    }
    if (result && result.r) {
      L.push('### 结果摘要（引擎原文，前 40 行）');
      L.push('');
      L.push('```');
      const sum = String(result.r.summary || (Engine.renderText ? Engine.renderText(result.r) : '') || '');
      L.push(sum.split('\n').slice(0, 40).join('\n'));
      L.push('```');
      if (result.r.handle) {
        L.push('');
        L.push('排盘句柄（开发者可据此复现同一张盘）：`' + result.r.handle + '`');
      }
    } else {
      L.push('### 结果摘要');
      L.push('');
      L.push('（这次没有生成盘面——如果是在排盘过程中出错，上面的「报错原文」就是关键。）');
    }
    L.push('');
    L.push('## 联系渠道');
    L.push('');
    L.push('- GitHub issue：https://github.com/xuanfu-web/dsh-metaphysics/issues');
    L.push('- 邮件：1129440028@qq.com');
    L.push('- 微信群：dsh-metaphysics');
    return L.join('\n');
  };

  const copyFeedbackReport = () => {
    const text = feedbackReport();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => { setFbCopied('已复制'); setFbNote('粘到 issue / 邮件 / 群里即可'); })
          .catch(() => { setFbCopied('复制失败'); setFbNote('可改用「导出 .md」或手动选中'); });
      } else {
        // 旧宿主 / 非安全上下文没有 clipboard：退回到隐藏 textarea + execCommand
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;left:-9999px;top:0';
        document.body.appendChild(ta);
        ta.select();
        const okCopy = document.execCommand && document.execCommand('copy');
        ta.remove();
        setFbCopied(okCopy ? '已复制' : '复制失败');
        setFbNote(okCopy ? '粘到 issue / 邮件 / 群里即可' : '可改用「导出 .md」或手动选中');
      }
    } catch (e) {
      setFbCopied('复制失败');
      setFbNote('可改用「导出 .md」');
    }
    setTimeout(() => { setFbCopied(''); setFbNote(''); }, 4000);
  };

  /** 开 issue：先把报告复制好，用户新建 issue 时直接粘 */
  const openFeedbackIssue = () => {
    try { copyFeedbackReport(); } catch (e) { /* 复制失败也要能开页面 */ }
    const title = encodeURIComponent('[反馈] ' + (TABS.find((t) => t.k === tab)?.label || tab) + (error ? '：报错' : '：使用问题'));
    try {
      window.open('https://github.com/xuanfu-web/dsh-metaphysics/issues/new?title=' + title, '_blank', 'noopener');
    } catch (e) {
      setFbNote('浏览器拦了弹窗，请手动打开 GitHub issues');
    }
  };

  /** 发邮件：mailto 对正文长度有限制，只带主题与一句话提示，报告已在剪贴板里直接粘 */
  const openFeedbackMail = () => {
    try { copyFeedbackReport(); } catch (e) { /* 同上 */ }
    const subject = encodeURIComponent('[反馈] ' + (TABS.find((t) => t.k === tab)?.label || tab) + (error ? '：报错' : '：使用问题'));
    const body = encodeURIComponent('（反馈报告已复制到剪贴板，直接粘贴在这里）\n\n我遇到的情况：\n');
    try { window.open('mailto:1129440028@qq.com?subject=' + subject + '&body=' + body, '_self'); } catch (e) { /* 忽略 */ }
  };

  /** 导出 Markdown：盘面 + 解析（一页读懂 / 三张表 / 交叉验证） */
  const downloadReport = () => {
    if (!result || !result.r) return;
    try {
      const text = Engine.renderText ? Engine.renderText(result.r) : (result.r.summary || '');
      const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `烛微命盘报告-${result.r.system}.md`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    } catch (e) {
      console.error('[metaphysics] 导出失败', e);
    }
  };

  /** 存为摘要长图：Canvas 直出 PNG（一页读懂 + 首张表），零依赖 */
  const downloadCard = () => {
    if (!result || !result.r) return;
    try {
      const url = PP.summaryCardPNG ? PP.summaryCardPNG(result.r, result.it) : '';
      if (!url) { setCopied('当前环境不支持 Canvas 导出'); return; }
      const a = document.createElement('a');
      a.href = url;
      a.download = `烛微命盘摘要-${result.r.system}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      console.error('[metaphysics] 长图导出失败', e);
    }
  };

  const btnStyle = { fontSize: 12, padding: '5px 12px' };

  /** 验前事：只算用户自评的贴合度，不改盘 */
  const calcFit = () => {
    if (!result || !result.r || !result.r.past) return;
    setFit(Engine.verifyFit ? Engine.verifyFit(result.r.past.rows, pastMarks) : null);
  };

  /** 生时校正：候选时辰 × 过去事件（固定规则打分），仅缩小范围 */
  const runRectify = () => {
    if (!result || result.kind !== 'bazi') return;
    try {
      // 用「这张盘自己的输入」反推，而不是表单此刻的值：改完日期没重排时两者不同，
      // 按表单值算出来的候选时辰会贴到另一张盘上。
      const at = result.at || { date, time };
      const [y, m, d] = String(at.date).split('-').map(Number);
      const [, mm] = String(at.time).split(':').map(Number);
      const events = rectEvents
        .filter((e) => Number(e.year))
        .map((e) => ({ year: Number(e.year), kind: e.kind }));
      setRectRes(Engine.rectifyBirth ? Engine.rectifyBirth({
        base: { year: y, month: m, day: d, minute: Number.isFinite(mm) ? mm : 0 },
        gender: result.gender || gender,
        events,
        lateZi: typeof result.lateZi === 'boolean' ? result.lateZi : lateZi,
        trueSolar: typeof result.trueSolar === 'boolean' ? result.trueSolar : trueSolar,
        address: String(result.address || '').trim() || undefined,
      }) : { error: '当前客户端未加载生时校正模块' });
    } catch (e) {
      setRectRes({ error: e && e.message ? e.message : String(e) });
    }
  };

  const field = (label, node) => h('label', { className: 'mp-field' }, h('span', { className: 'mp-lbl' }, label), node);

  /** 点历史条目：先把参数回填到表单，再交给一个 effect 触发重排（避免闭包读到旧 state） */
  const replay = (x) => {
    setTab(x.kind);
    if (x.date) setDate(x.date);
    if (x.time) setTime(x.time);
    setHourUnknown(!!x.hourUnknown);
    if (x.gender) setGender(x.gender);
    setAddress(x.address || '');
    // 旧条目没这两个字段：保持表单现状，不能凭空把它们拨成 true
    if (typeof x.trueSolar === 'boolean') setTrueSolar(x.trueSolar);
    if (typeof x.lateZi === 'boolean') setLateZi(x.lateZi);
    setLines(x.lines || '');
    setQuestion(x.question || '');
    setDirection(x.direction || 'general');
    // 旧条目只存了张数（1/3/5）：折成牌阵名，别让重放退回默认的三张
    setSpread(x.spread || ({ 1: 'one', 3: 'three', 5: 'five' })[x.count] || 'three');
    setMhMode(x.mhMode || 'time');
    setUpper(x.upper || '');
    setLower(x.lower || '');
    setChanging(x.changing || '');
    // 各体系自己的参数：旧条目没存过就保持表单现状（不能凭空拨回默认值）
    if (x.kind === 'qimen') {
      if (typeof x.qimenRule === 'string') setQimenRule(x.qimenRule);
      if (typeof x.qLateZi === 'string') setQLateZi(x.qLateZi);
    }
    if (x.kind === 'zeri') {
      if (typeof x.task === 'string') setTask(x.task);
      if (x.days != null) setDays(String(x.days));
      if (typeof x.shengXiao === 'string') setShengXiao(x.shengXiao);
      if (typeof x.zCand === 'string') setZCand(x.zCand);
    }
    if (x.kind === 'xiaoliuren') {
      setXlrMode(x.xlrMode === 'number' ? 'number' : 'time');
      if (x.num1 != null) setNum1(String(x.num1));
      if (x.num2 != null) setNum2(String(x.num2));
      if (x.num3 != null) setNum3(String(x.num3));
    }
    if (x.kind === 'trend' && x.toAge != null) setToAge(String(x.toAge));
    if (x.kind === 'fengshui') {
      if (typeof x.fsMode === 'string') setFsMode(x.fsMode);
      if (x.fsPeriod != null) setFsPeriod(String(x.fsPeriod));
      if (typeof x.sitting === 'string') setSitting(x.sitting);
      if (typeof x.facing === 'string') setFacing(x.facing);
    }
    if (x.kind === 'name') {
      if (typeof x.nnMode === 'string') setNnMode(x.nnMode);
      if (typeof x.surname === 'string') setSurname(x.surname);
      if (typeof x.givenName === 'string') setGivenName(x.givenName);
      if (x.limitN != null) setLimitN(String(x.limitN));
    }
    if (x.kind === 'convert') {
      if (typeof x.convMode === 'string') setConvMode(x.convMode);
      if (typeof x.lunarDate === 'string') setLunarDate(x.lunarDate);
      if (typeof x.leapMonth === 'boolean') setLeapMonth(x.leapMonth);
    }
    // 合盘：连对方 / 第三方一起还原，否则重排放的是表单里此刻的另一个人
    if (x.kind === 'hepan') {
      if (x.hpChart) setHpChart(x.hpChart);
      if (typeof x.partnerDate === 'string') setPDate(x.partnerDate);
      if (typeof x.partnerTime === 'string') setPTime(x.partnerTime);
      if (typeof x.partnerGender === 'string') setPGender(x.partnerGender);
      if (typeof x.partnerAddress === 'string') setPAddress(x.partnerAddress);
      if (typeof x.thirdOn === 'boolean') setThirdOn(x.thirdOn);
      if (typeof x.p2Date === 'string') setP2Date(x.p2Date);
      if (typeof x.p2Time === 'string') setP2Time(x.p2Time);
      if (typeof x.p2Gender === 'string') setP2Gender(x.p2Gender);
      if (typeof x.p2Address === 'string') setP2Address(x.p2Address);
    }
    setAskInvalid(false);
    setReplayArgs(x);
  };
  const clearHist = () => { setHist([]); saveHistory([]); };

  // ── 卦例库：长期攒、带应验状态（history 只有 20 条且随排随换，只为重放）
  // 存储层在 panel-kit 的 PP.cases* 里，面板只管渲染与交互。
  const [cases, setCases] = useState(() => {
    try { return PP.casesLoad(); } catch (e) { return []; }
  });
  const [casesOpen, setCasesOpen] = useState(false);
  const [caseFilter, setCaseFilter] = useState('all');
  // 手动保存：这张盘是否已存进卦例库（按本次 entry 查，不按 id——重排后 id 会变）
  const [caseSaved, setCaseSaved] = useState(false);

  const openCases = () => {
    try { setCases(PP.casesLoad()); } catch (e) { /* 读不出来就按空列表开 */ }
    setCaseFilter('all');
    setCasesOpen(true);
  };
  const closeCases = () => setCasesOpen(false);
  const caseCount = (s) => (s === 'all' ? cases.length : cases.filter((x) => x.status === s).length);
  const caseList = caseFilter === 'all' ? cases : cases.filter((x) => x.status === caseFilter);

  /** 「存入卦例库」按钮：用户主动选这张盘才存。参数就是这次排盘的 entry，重放走 replay 同一条路 */
  const saveToCases = () => {
    if (!LAST.entry) { setNotice('这张盘没有可存的参数，重排一次再存。'); return; }
    try {
      const r = PP.casesAdd(LAST.entry);
      if (r && r.ok) { setCases(r.list); setCaseSaved(true); }
      else setNotice('卦例没能存进本机（存储被禁用或已满），排盘不受影响。');
    } catch (e) { setNotice('卦例没能存进本机（存储被禁用或已满），排盘不受影响。'); }
  };

  const exportCases = (masked) => {
    const text = masked ? PP.casesExportMasked(cases) : PP.casesExport(cases);
    if (!text) { setNotice('还没有可导出的卦例'); return; }
    try {
      const blob = new Blob([text], { type: 'application/x-ndjson;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = masked
        ? `metaphysics-cases-masked-${new Date().toISOString().slice(0, 10)}.jsonl`
        : `metaphysics-cases-${new Date().toISOString().slice(0, 10)}.jsonl`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => { try { URL.revokeObjectURL(url); } catch (e) { /* 已释放 */ } }, 1000);
      setNotice(masked
        ? `已导出 ${cases.length} 条卦例（脱敏：去年份、时刻整点化、去出生地）`
        : `已导出 ${cases.length} 条卦例（JSONL）`);
    } catch (e) {
      setNotice('导出失败：' + (e && e.message ? e.message : '当前环境不支持下载'));
    }
  };

  /** 一条卦例：左半边点了回填重排，右边是应验状态与本条删除 */
  const caseRow = (x) => {
    const e = x.entry || {};
    const d = new Date(x.at);
    const p2 = (n) => String(n).padStart(2, '0');
    return h('div', { key: x.id, className: 'mp-case' },
      h('button', {
        className: 'mp-case-main',
        onClick: () => { replay(Object.assign({}, e)); closeCases(); },
        title: [e.date, e.hourUnknown ? '时辰未知' : e.time, e.address].filter(Boolean).join(' ') || '点一下回填这组参数并重排',
      },
        h('b', null, PP.profKindLabel(e.kind)),
        h('span', null, e.label || x.question || '—'),
        h('i', null, `${p2(d.getMonth() + 1)}-${p2(d.getDate())} ${p2(d.getHours())}:${p2(d.getMinutes())}`)),
      h('select', {
        className: 'mp-case-sel', value: x.status, title: '标应验状态',
        onChange: (ev) => setCases(PP.casesSetStatus(x.id, ev.target.value)),
      }, PP.CASE_STATUS.map((s) => h('option', { key: s, value: s }, PP.caseStatusLabel(s)))),
      h('button', { className: 'mp-case-del', title: '删除这条', onClick: () => setCases(PP.casesRemove(x.id)) }, '删'));
  };


  /**
   * 我的命盘：一张卡一个人，点卡直接出盘，不必每次重报出生信息。
   * 存本机 localStorage，存的是输入（生日/时刻/性别/出生地），不是结果；
   * 合盘与占事类不入档（档案只描述一个人），所以只在单人体系下给「存入」条。
   */
  const PROF_TABS = ['bazi', 'ziwei', 'trend', 'chenggu'];
  const profFill = (p) => {
    setTab(p.kind);
    setDate(p.date);
    if (p.time) setTime(p.time);
    setHourUnknown(!!p.hourUnknown);
    if (p.gender) setGender(p.gender);
    setAddress(p.address || '');
    // 旧档案没存开关：按默认（都开）处理，不能沿用表单此刻的勾选
    setTrueSolar(p.trueSolar !== false);
    setLateZi(p.lateZi !== false);
  };
  const onProf = (e) => {
    const ev = PP.profEvent(e.target);
    if (!ev) return;
    const of = (id) => profiles.find((x) => x.id === id);
    const nameEl = e.currentTarget.querySelector('.mp-prof-name');
    setProfArmed('');
    if (ev.action === 'use') {
      const p = of(ev.id);
      if (!p) return;
      // 外部改坏 / 旧版本留下的「有日期没时刻」卡：别拿当前表单里的时刻顶上
      if (!PP.profUsable(p)) {
        setNotice('这张档案没有出生时刻，先补上时刻再存一次。');
        return;
      }
      PROF_NAME = '';
      setProfiles(PP.profilesTouch(p.id));
      profFill(p);
      // 出生信息同时经 run 的覆盖参数直传：表单 state 要下一次渲染才生效，
      // 只靠 setState 会先按旧参数排一张、再按新参数排一张，用户看见闪一下别的盘。
      // address 传字符串而不是 undefined：档案里没存出生地时要按「空」排，
      // 不能因为 p.address 不存在就退回表单里上一张盘留下的地址。
      run(p.kind, { date: p.date, time: p.hourUnknown ? '12:00' : p.time }, undefined, {
        gender: p.gender || undefined, address: p.address || '', hourUnknown: !!p.hourUnknown,
        // 档案里的两个开关同样要直传：只靠 setState 会先按旧勾选排一张、再闪成新的
        trueSolar: p.trueSolar !== false, lateZi: p.lateZi !== false,
      });
      return;
    }
    if (ev.action === 'edit') {
      const p = of(ev.id);
      if (!p) return;
      profFill(p);
      PROF_NAME = p.label;
      setProfEditing(p.id);
      return;
    }
    if (ev.action === 'cancel') { PROF_NAME = ''; setProfEditing(null); return; }
    if (ev.action === 'pin') { setProfiles(PP.profilesPin(ev.id)); return; }
    if (ev.action === 'del') {
      // 删除点两次才算：第一次只是把按钮变成「确认删除」，误触不会丢档案
      if (profArmed !== ev.id) { setProfArmed(ev.id); return; }
      setProfiles(PP.profilesRemove(ev.id));
      if (profEditing === ev.id) { PROF_NAME = ''; setProfEditing(null); }
      setNotice('已从本机删除这张档案卡（不影响已经排出来的盘）。');
      return;
    }
    if (ev.action === 'put') {
      const wasEditing = profEditing;
      const entry = PP.profFromForm(
        { kind: tab, date, time, hourUnknown, gender, address, trueSolar, lateZi },
        nameEl ? nameEl.value : PROF_NAME,
        profEditing || undefined,
      );
      if (!entry) { setNotice('先填好出生日期（和时刻），再存档案。'); return; }
      // 排过几次 / 置顶 / 创建时间由档案层自己保留，这里只交输入
      const res = PP.profilesPut(entry);
      if (!res.ok) { setNotice('档案没能存进本机（存储被禁用或已满），排盘不受影响。'); return; }
      setProfiles(res.list);
      PROF_NAME = '';
      setProfEditing(null);
      if (nameEl) nameEl.value = '';
      setNotice(`${wasEditing ? '已更新档案' : '已存入我的命盘'}「${res.item.label}」。`);
    }
  };
  /** 称呼框输入：只记在模块级，不触发重绘（每键重绘会丢光标） */
  const onProfInput = (e) => {
    const nm = e.target && e.target.closest ? e.target.closest('.mp-prof-name') : null;
    if (nm) PROF_NAME = nm.value;
  };

  /**
   * C3 深链还原：把链接里的参数填回表单并立刻排一次。
   * 表单 state 要等下一次渲染才生效，所以同一批值经 run 的 over 直传——
   * 否则会「先按旧参数排一张，再按新参数排一张」，用户看到闪一下另一张盘。
   */
  const applyDeep = (deep) => {
    const form = Engine.formOf ? Engine.formOf(deep) : null;
    if (!form) { run('ziwei'); return; }
    const k = TABS.some((t) => t.k === form.tab) ? form.tab : 'ziwei';
    const dt = { date: form.date || date, time: form.time || time };
    const linesStr = form.lines === undefined ? undefined
      : (Array.isArray(form.lines) ? form.lines.join(' ') : String(form.lines));
    if (form.date) setDate(form.date);
    if (form.time) setTime(form.time);
    if (form.gender) setGender(form.gender);
    if (typeof form.address === 'string') setAddress(form.address);
    if (typeof form.trueSolar === 'boolean') setTrueSolar(form.trueSolar);
    if (typeof form.lateZi === 'boolean') setLateZi(form.lateZi);
    if (linesStr !== undefined) setLines(linesStr);
    if (form.question) setQuestion(form.question);
    setTab(k);
    const rest = Engine.restNote ? Engine.restNote(form) : '';
    setChatNote(`已按深链还原：${deep.label}${form.question ? `｜${form.question}` : ''}${rest ? `　${rest}` : ''}`);
    run(k, dt, undefined, {
      gender: form.gender,
      address: form.address,
      trueSolar: form.trueSolar,
      lateZi: form.lateZi,
      lines: linesStr,
      question: form.question,
    });
  };

  // 首次打开：带 #mp= 的链接先还原那张盘；没有深链就照旧排默认示例盘。
  // 解析放在引擎加载之后：链接解析要用到句柄编解码，那是引擎分块里的东西。
  useEffect(() => {
    let cancelled = false;
    // 载入分块那几秒里用户可能已经点了别的体系：默认盘只在他还没动过的时候补上，
    // 否则这条迟到的 run 会把他刚点的那一张作废
    const bootSeq = perfSeq;
    (async () => {
      let deep = null;
      try {
        // 预热当前 tab（首屏默认 ziwei），不再无条件先载 bazi：
        // 下面默认盘就是 run('ziwei')，先取 bazi 会让首屏白背一块 200KB+ 的引擎。
        await ensureEngine(tab);
        const href = typeof location !== 'undefined' ? String(location.href) : '';
        if (href && href.indexOf('mp=') >= 0 && window.Engine && window.Engine.parseAskLink) {
          deep = window.Engine.parseAskLink(href);
        }
      } catch (e) { deep = null; }
      if (cancelled || perfSeq !== bootSeq) return;
      if (deep && deep.ok) {
        try { applyDeep(deep); return; } catch (e) { /* 还原失败就走默认盘 */ }
      }
      run('ziwei');
    })();
    return () => { cancelled = true; };
  }, []);
  useEffect(() => {
    if (!replayArgs) return;
    const k = replayArgs.kind;
    setReplayArgs(null);
    run(k);
  }, [replayArgs]);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      const layer = document.getElementById('mp-trace-layer');
      if (layer && layer.classList.contains('open')) traceClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const recentList = (recent || []).filter((x) => x && TABS.some((t) => t.k === x.tab)).slice(0, RECENT_MAX);
  const tabLabel = (k) => (TABS.find((t) => t.k === k) || {}).label || k;
  const toolOf = ({ k, label, tip, wide }) => h('button', {
    key: k, type: 'button', title: tip, className: 'mp-tool' + (wide ? ' wide' : '') + (tab === k ? ' on' : ''), 'data-tab': k,
    onClick: () => activate(k),
  }, h('b', null, label), h('span', null, tip));

  const children = [
    h('div', {
      key: 'profiles', className: 'mp-profwrap', onClick: onProf, onInput: onProfInput,
      dangerouslySetInnerHTML: {
        __html: PP.profilesHTML(profiles, {
          editingId: profEditing,
          armedDel: profArmed,
          bar: PROF_TABS.indexOf(tab) >= 0 ? PP.profilesBarHTML({ editingId: profEditing, name: PROF_NAME }) : '',
        }),
      },
    }),
    h('section', { key: 'start', className: 'mp-start', 'aria-label': '选择要算的事' },
      h('div', { className: 'mp-start-top' },
        h('div', { className: 'mp-recent', hidden: recentList.length === 0 },
          h('span', { className: 'mp-recent-lbl' }, '最近用过'),
          h('span', { className: 'mp-recent-list' }, recentList.map((x) => h('button', {
            key: x.tab, type: 'button', className: 'mp-rc', onClick: () => activate(x.tab),
          }, tabLabel(x.tab), h('i', null, dayLabel(x.at)))))),
        h('div', { className: 'mp-viewsw', role: 'group', 'aria-label': '首屏视图' },
          h('button', {
            type: 'button', className: view === 'group' ? 'on' : '',
            'aria-pressed': view === 'group' ? 'true' : 'false',
            onClick: () => changeView('group'),
          }, '分组'),
          h('button', {
            type: 'button', className: view === 'flat' ? 'on' : '',
            'aria-pressed': view === 'flat' ? 'true' : 'false',
            onClick: () => changeView('flat'),
          }, '平铺'))),
      view === 'group' ? h('div', { className: 'mp-groups' },
        GROUPS.map((g) => {
          const open = !!openGroups[g.title];
          const extra = Math.max(0, g.items.length - 4);
          return h('section', { key: g.title, className: 'mp-tgroup' + (open ? ' open' : '') },
            h('div', { className: 'mp-tgroup-head' }, h('h2', null, g.title), h('p', null, g.hint)),
            h('div', { className: 'mp-ttools' },
              g.items.map(toolOf),
              extra > 0 ? h('button', {
                key: 'more', type: 'button', className: 'mp-tmore',
                'aria-expanded': open ? 'true' : 'false',
                onClick: () => setOpenGroups((o) => Object.assign({}, o, { [g.title]: !open })),
              }, open ? '收起' : `还有 ${extra} 个`) : null));
        })) : null),

    h('div', { key: 'tabs', className: 'mp-tabs' + (view === 'flat' ? '' : ' hide'), role: 'tablist', 'aria-label': '命理体系' }, TABS.map((t) =>
      h('button', {
        key: t.k,
        role: 'tab',
        'aria-selected': tab === t.k ? 'true' : 'false',
        tabIndex: tab === t.k ? 0 : -1,
        className: 'mp-tab' + (tab === t.k ? ' on' : ''),
        onClick: () => activate(t.k),
      }, t.label))),

    h('div', { key: 'head', className: 'mp-panel' },
      // 起卦快捷行排在所有输入之前：占卜是「当下就问」，先选体系比先填时刻顺手
      castRow({
        tab, open: chipOpen, onToggle: toggleChips, onCast: castChip,
        onAsk: askInChat, hasResult: !!result,
      }),
      h('div', { className: 'mp-row' },
        showDate ? field(isBirth ? '出生日期（公历）' : timeKind === 'date' ? '日期（公历）' : '起卦日期（公历）',
          h(DateInput, {
            value: date,
            onChange: editDate,
            onInvalid: () => setNotice('日期请按「年-月-日」填写，例如 1990-05-12。'),
          })) : null,
        // 勾了「时辰未知」就把钟点灰掉：run 里用的是写死的 12:00，
        // 灰掉之前只判 bazi 会让 trend 上的钟点看着能改、改了却不进盘
        showTime ? field(isBirth ? '出生时刻' : '起卦时刻',
          h('input', { className: 'mp-input', type: 'time', value: time, disabled: hourUnknown && (tab === 'bazi' || tab === 'trend'), onChange: (e) => editTime(e.target.value) })) : null,
        // 时辰未知：只给八字与人生 K 线。紫微/合盘没有时支整盘不成立，不提供这个勾选
        (tab === 'bazi' || tab === 'trend') ? h('label', { className: 'mp-chk', title: '不知道出生时辰时勾这里：不排时柱，起运按日估算，结果首行会写明' },
          h('input', {
            type: 'checkbox', checked: hourUnknown,
            onChange: (e) => setHourUnknown(e.target.checked),
          }), ' 时辰未知') : null,
        isBirth ? field('性别', h('select', {
          className: 'mp-input', value: gender, onChange: (e) => setGender(e.target.value),
        }, h('option', { value: 'female' }, '女'), h('option', { value: 'male' }, '男'))) : null,
        isBirth ? field('出生地（省/市即可）', h('input', {
          className: 'mp-input', placeholder: '如 河北石家庄 / 成都', value: address,
          onChange: (e) => setAddress(e.target.value),
        })) : null,
        (tab === 'bazi' || tab === 'ziwei') ? h('label', { className: 'mp-field mp-checks' },
          h('input', {
            type: 'checkbox', checked: crossOn,
            onChange: (e) => setCrossOn(e.target.checked),
          }),
          h('span', { className: 'mp-lbl' }, '八字 × 紫微 交叉验证')) : null,
        tab === 'hepan' ? field('对方出生日期', h(DateInput, {
          value: pDate,
          onChange: setPDate,
          onInvalid: () => setNotice('对方出生日期请按「年-月-日」填写，例如 1992-08-15。'),
        })) : null,
        tab === 'hepan' ? field('对方出生时刻', h('input', {
          className: 'mp-input', type: 'time', value: pTime, onChange: (e) => setPTime(e.target.value),
        })) : null,
        tab === 'hepan' ? field('对方性别', h('select', {
          className: 'mp-input', value: pGender, onChange: (e) => setPGender(e.target.value),
        }, h('option', { value: 'female' }, '女'), h('option', { value: 'male' }, '男'))) : null,
        tab === 'hepan' ? field('合盘方式', h('div', { className: 'mp-seg' },
          h('button', { className: hpChart === 'bazi' ? 'on' : '', onClick: () => setHpChart('bazi') }, '八字'),
          h('button', { className: hpChart === 'ziwei' ? 'on' : '', onClick: () => setHpChart('ziwei') }, '紫微'))) : null,
        tab === 'hepan' ? field('对方出生地（可空）', h('input', {
          className: 'mp-input', placeholder: '如 四川成都', value: pAddress,
          onChange: (e) => setPAddress(e.target.value),
        })) : null,
        tab === 'hepan' ? h('label', { className: 'mp-field mp-checks' },
          h('input', {
            type: 'checkbox', checked: thirdOn,
            onChange: (e) => setThirdOn(e.target.checked),
          }),
          h('span', { className: 'mp-lbl' }, '三方合盘（加入第三人）')) : null,
        (tab === 'hepan' && thirdOn) ? field('第三方出生日期', h(DateInput, {
          value: p2Date,
          onChange: setP2Date,
          onInvalid: () => setNotice('第三方出生日期请按「年-月-日」填写，例如 1990-01-01。'),
        })) : null,
        (tab === 'hepan' && thirdOn) ? field('第三方出生时刻', h('input', {
          className: 'mp-input', type: 'time', value: p2Time, onChange: (e) => setP2Time(e.target.value),
        })) : null,
        (tab === 'hepan' && thirdOn) ? field('第三方性别', h('select', {
          className: 'mp-input', value: p2Gender, onChange: (e) => setP2Gender(e.target.value),
        }, h('option', { value: 'female' }, '女'), h('option', { value: 'male' }, '男'))) : null,
        (tab === 'hepan' && thirdOn) ? field('第三方出生地（可空）', h('input', {
          className: 'mp-input', placeholder: '如 广东广州', value: p2Address,
          onChange: (e) => setP2Address(e.target.value),
        })) : null,
        tab === 'qimen' ? h('fieldset', { key: 'qmr', className: 'mp-qmrule' },
          h('legend', { className: 'mp-lbl' }, '换局规则'),
          h('div', { className: 'mp-qmopts', role: 'radiogroup', 'aria-label': '奇门换局规则' },
            [['chaibu', '拆补'], ['chaoshen', '超神接气'], ['zhirun', '置闰']].map(([value, label]) => h('label', {
              key: value, className: 'mp-qmopt',
            },
            h('input', {
              type: 'radio', name: 'qimen_rule', value,
              checked: qimenRule === value,
              onChange: () => setQimenRule(value),
            }),
            h('span', null, label)))),
          h('div', { className: 'mp-field' }, h('span', { className: 'mp-lbl' }, '晚子时'),
            h('select', { className: 'mp-input', value: qLateZi, onChange: (e) => setQLateZi(e.target.value) },
              h('option', { value: 'same-day' }, '23:00 后归当日'),
              h('option', { value: 'next-day' }, '23:00 后归次日'))),
          h('details', { className: 'mp-qmhelp' },
            h('summary', null, '三种规则有什么区别？'),
            h('p', null, '决定符头与节气如何对齐、是否插入闰局；同一个时刻在不同规则下可能得到不同局数。默认「拆补」与工具层一致。'))) : null,
        needAsk(tab) || tab === 'qimen' ? field(tab === 'qimen' ? '询问方向（定用神）' : '询问方向', h('select', {
          className: 'mp-input', value: direction,
          onChange: (e) => { setDirection(e.target.value); refreshInterpret(e.target.value); },
        }, (Engine.DIRECTIONS || []).map((d) => h('option', { key: d.key, value: d.key }, d.label)))) : null,
        tab === 'tarot' ? field('牌阵', h('select', {
          className: 'mp-input', value: spread, onChange: (e) => setSpread(e.target.value),
        }, h('option', { value: 'one' }, '1 张 · 单张指引'),
        h('option', { value: 'three' }, '3 张 · 过去现在未来'),
        h('option', { value: 'five' }, '5 张 · 五张局势'),
        h('option', { value: 'celtic' }, '10 张 · 凯尔特十字'),
        h('option', { value: 'either' }, '5 张 · 二选一'),
        h('option', { value: 'relation' }, '7 张 · 关系阵'),
        h('option', { value: 'timeflow' }, '3 张 · 时间流'))) : null,
        tab === 'liuyao' ? field('六爻（可空）', h('input', {
          className: 'mp-input', placeholder: '空则随机，如 9 7 8 8 7 6', value: lines,
          onChange: (e) => setLines(e.target.value),
        })) : null,
        tab === 'meihua' ? field('起卦方式', h('div', { className: 'mp-seg' },
          h('button', { className: mhMode === 'time' ? 'on' : '', onClick: () => switchMode('time') }, '时间'),
          h('button', { className: mhMode === 'number' ? 'on' : '', onClick: () => switchMode('number') }, '数字'))) : null,
        (tab === 'meihua' && mhMode === 'number') ? field('第一个数', h('input', {
          className: 'mp-input', value: upper, placeholder: '如 17',
          onChange: (e) => setUpper(e.target.value),
        })) : null,
        (tab === 'meihua' && mhMode === 'number') ? field('第二个数', h('input', {
          className: 'mp-input', value: lower, placeholder: '如 29',
          onChange: (e) => setLower(e.target.value),
        })) : null,
        (tab === 'meihua' && mhMode === 'number') ? field('动爻（可空）', h('input', {
          className: 'mp-input', value: changing, placeholder: '1-6',
          onChange: (e) => setChanging(e.target.value),
        })) : null,
        tab === 'zeri' ? field('所办事项', h('select', {
          className: 'mp-input', value: task, onChange: (e) => setTask(e.target.value),
        }, [
          ['常用', ['嫁娶', '搬家入宅', '出行', '开业', '签订合同', '祭祀']],
          ['婚嫁', ['嫁娶', '订婚', '领证', '提亲', '收送聘金', '满月酒']],
          ['生活', ['搬家', '入宅', '旅行', '访亲友', '入学', '求医', '祭祀']],
          ['建造', ['动土', '装修', '装修建造', '安葬', '试车买车']],
          ['工商', ['开业', '交易', '投资', '签订合同', '签约', '纳财', '赴任']],
        ].map(([g, items]) => h('optgroup', { key: g, label: g },
          items.map((t) => h('option', { key: `${g}-${t}`, value: t }, t)))))) : null,
        tab === 'convert' ? field('转换方向', h('div', { className: 'mp-seg' },
          h('button', { className: convMode === 'solar2lunar' ? 'on' : '', onClick: () => setConvMode('solar2lunar') }, '公历 → 农历'),
          h('button', { className: convMode === 'lunar2solar' ? 'on' : '', onClick: () => setConvMode('lunar2solar') }, '农历 → 公历'))) : null,
        (tab === 'convert' && convMode === 'lunar2solar') ? field('农历日期', h('input', {
          className: 'mp-input', value: lunarDate, placeholder: '如 2026-9-17',
          onChange: (e) => setLunarDate(e.target.value),
        })) : null,
        (tab === 'convert' && convMode === 'lunar2solar') ? h('label', {
          className: 'mp-check',
        }, h('input', { type: 'checkbox', checked: leapMonth, onChange: (e) => setLeapMonth(e.target.checked) }), ' 闰月') : null,
        tab === 'zeri' ? field('看多少天', h('input', {
          className: 'mp-input', type: 'number', min: 1, max: 60, value: days,
          onChange: (e) => setDays(e.target.value),
        })) : null,
        tab === 'zeri' ? field('候选日（可空，只比这几天）', h('input', {
          className: 'mp-input', placeholder: '如 2026-12-01, 2026-12-08, 2026-12-15',
          value: zCand, onChange: (e) => setZCand(e.target.value),
        })) : null,
        tab === 'zeri' ? field('当事人属相（可空）', h('select', {
          className: 'mp-input', value: shengXiao, onChange: (e) => setShengXiao(e.target.value),
        }, h('option', { value: '' }, '不排除'), ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
          .map((s) => h('option', { key: s, value: s }, s)))) : null,
        tab === 'xiaoliuren' ? field('起课方式', h('div', { className: 'mp-seg' },
          h('button', { className: xlrMode === 'time' ? 'on' : '', onClick: () => setXlrMode('time') }, '时间'),
          h('button', { className: xlrMode === 'number' ? 'on' : '', onClick: () => setXlrMode('number') }, '报数'))) : null,
        (tab === 'xiaoliuren' && xlrMode === 'number') ? field('第一个数', h('input', {
          className: 'mp-input', type: 'number', min: 1, max: 99, value: num1,
          onChange: (e) => setNum1(e.target.value),
        })) : null,
        (tab === 'xiaoliuren' && xlrMode === 'number') ? field('第二个数', h('input', {
          className: 'mp-input', type: 'number', min: 1, max: 99, value: num2,
          onChange: (e) => setNum2(e.target.value),
        })) : null,
        (tab === 'xiaoliuren' && xlrMode === 'number') ? field('第三个数', h('input', {
          className: 'mp-input', type: 'number', min: 1, max: 99, value: num3,
          onChange: (e) => setNum3(e.target.value),
        })) : null,
        tab === 'mbti' ? h('div', { className: 'mp-quiz-wrap' },
          h('div', { className: 'mp-lbl' }, '十六型人格问卷 · 4 题一页，按 1（完全不像）到 5（很像我）打分'),
          h(MbtiQuiz, {
            answers: mbAns,
            page: mbPage,
            onPick: (i, n) => setMbAns((prev) => {
              const next = prev.slice();
              next[i] = n;
              return next;
            }),
            onPage: (d) => setMbPage((p) => Math.max(0, Math.min(
              p + d,
              Math.max(0, Math.ceil(mbtiInfo().total / MBTI_PER_PAGE) - 1),
            ))),
            onSubmit: go,
            onClear: () => {
              setMbAns(new Array(mbtiInfo().total).fill(null));
              setMbPage(0);
              setResult(null);   // 重新答时旧结果不该留在下面
            },
          })) : null,
        tab === 'constitution' ? h('div', { className: 'mp-quiz-wrap' },
          h('div', { className: 'mp-lbl' }, '中医体质问卷 · 9 种体质各 5 题，共 45 题 · 5 题一页，按 1（没有）到 5（总是）打分'),
          h(CsQuiz, {
            paper: csPaper,
            answers: csAns,
            page: csPage,
            onPick: (i, n) => setCsAns((prev) => {
              const next = prev.slice();
              next[i] = n;
              return next;
            }),
            onPage: (d) => setCsPage((p) => Math.max(0, Math.min(
              p + d,
              Math.max(0, Math.ceil((csPaper && csPaper.questions ? csPaper.questions.length : CS_TOTAL) / CS_PER_PAGE) - 1),
            ))),
            onSubmit: go,
            onClear: () => {
              setCsAns(new Array(CS_TOTAL).fill(null));
              setCsPage(0);
              setResult(null);   // 重新答时旧结果不该留在下面
            },
          })) : null,
        tab === 'trend' ? field('算到几岁', h('input', {
          className: 'mp-input', type: 'number', min: 10, max: 100, value: toAge,
          onChange: (e) => setToAge(e.target.value),
        })) : null,
        tab === 'fengshui' ? field('看什么', h('div', { className: 'mp-seg' },
          h('button', { className: fsMode === 'natal' ? 'on' : '', onClick: () => setFsMode('natal') }, '命卦'),
          h('button', { className: fsMode === 'advise' ? 'on' : '', onClick: () => setFsMode('advise') }, '门主灶'),
          h('button', { className: fsMode === 'xuankong' ? 'on' : '', onClick: () => setFsMode('xuankong') }, '玄空'))) : null,
        (tab === 'fengshui' && fsMode !== 'natal') ? field('坐山（24 山）', h('input', {
          className: 'mp-input', value: sitting, placeholder: '如 子 / 乾',
          onChange: (e) => setSitting(e.target.value),
        })) : null,
        (tab === 'fengshui' && fsMode !== 'natal') ? field('朝向（24 山）', h('input', {
          className: 'mp-input', value: facing, placeholder: '如 午 / 巽',
          onChange: (e) => setFacing(e.target.value),
        })) : null,
        (tab === 'fengshui' && fsMode === 'xuankong') ? field('运（1–9）', h('input', {
          className: 'mp-input', type: 'number', min: 1, max: 9, value: fsPeriod,
          onChange: (e) => setFsPeriod(e.target.value),
        })) : null,
        tab === 'name' ? field('看什么', h('div', { className: 'mp-seg' },
          h('button', { className: nnMode === 'assess' ? 'on' : '', onClick: () => setNnMode('assess') }, '评名字'),
          h('button', { className: nnMode === 'generate' ? 'on' : '', onClick: () => setNnMode('generate') }, '生成候选'))) : null,
        tab === 'name' ? field('姓', h('input', {
          className: 'mp-input', value: surname, placeholder: '如 李',
          onChange: (e) => setSurname(e.target.value),
        })) : null,
        (tab === 'name' && nnMode === 'assess') ? field('名字', h('input', {
          className: 'mp-input', value: givenName, placeholder: '如 沐宸',
          onChange: (e) => setGivenName(e.target.value),
        })) : null,
        (tab === 'name' && nnMode === 'generate') ? field('候选个数', h('input', {
          className: 'mp-input', type: 'number', min: 1, max: 20, value: limitN,
          onChange: (e) => setLimitN(e.target.value),
        })) : null,
      ),
      isBirth ? h('div', { className: 'mp-checks' },
        h('label', { title: '按出生地经度把钟表时间换算成真太阳时' },
          h('input', { type: 'checkbox', checked: trueSolar, onChange: (e) => setTrueSolar(e.target.checked) }), '真太阳时'),
        h('label', { title: '23:00–23:59 出生时：勾选=按次日日柱起时柱；不勾=仍用当日日柱' },
          h('input', { type: 'checkbox', checked: lateZi, onChange: (e) => setLateZi(e.target.checked) }), '晚子时换日'),
        h('label', { title: '开启后会请求 OpenStreetMap，把区县/村落到更精确的坐标' },
          h('input', { type: 'checkbox', checked: onlineGeo, onChange: (e) => setOnlineGeo(e.target.checked) }), '联网精确到区县')) : null,
      // 所问之事独占一行：它是问事体系的核心输入，不该挤在字段堆里
      needAsk(tab) ? h('div', { className: 'mp-askblock' },
        h('span', { className: 'mp-lbl' }, '所问之事（必填）'),
        h('textarea', {
          className: 'mp-textarea' + (askInvalid ? ' invalid' : ''),
          rows: 2, value: question,
          placeholder: '用一句话描述所问之事，例如：今年是否适合换工作？',
          onChange: (e) => { setQuestion(e.target.value); setAskInvalid(false); },
          onBlur: (e) => refreshInterpret(undefined, e.target.value),
        })) : null,
      // 人格问卷的「看结果 / 清空」在问卷自己的翻页条里，底部不再重复放一个主按钮
      tab === 'mbti' || tab === 'constitution' ? null : h('div', { key: 'actions', className: 'mp-actions' },
        h('button', {
          className: 'mp-btn ghost', style: { fontSize: 12, padding: '5px 12px', marginRight: 8 },
          onClick: openSample, title: '用固定示例盘看完整报告（不改动你已填的数据）',
        }, '看示例'),
        h('button', { className: 'mp-btn', onClick: go, title: '时间仍为自动时，点它会取当下再起卦' },
          tab === 'tarot' ? '抽牌'
            : tab === 'bazi' || tab === 'ziwei' ? '排盘'
              : tab === 'hepan' ? '合盘'
                : tab === 'qimen' ? '起局'
                  : QUICK_TABS.indexOf(tab) >= 0 ? '看结果' : '起卦'))),

    h('div', { key: 'hint', className: 'mp-hint' }, meta.hint),

    (hist.length || cases.length) ? h('div', { key: 'hist', className: 'mp-hist' },
      h('div', { className: 'mp-hist-h' },
        h('span', null, hist.length ? '最近排过' : '卦例库'),
        h('span', { className: 'mp-hist-acts' },
          hist.length ? h('button', { className: 'mp-hist-clear', onClick: clearHist }, '清空') : null,
          h('button', { className: 'mp-hist-clear mp-hist-more', onClick: openCases },
            cases.length ? `卦例库 ${cases.length}` : '卦例库'))),
      h('div', { className: 'mp-hist-list' }, hist.map((x, i) =>
        h('button', {
          key: i, className: 'mp-hist-item',
          title: `${String(x.date || '')} ${x.hourUnknown ? '时辰未知' : String(x.time || '')}`,
          onClick: () => replay(x),
        },
          h('b', null, (TABS.find((t) => t.k === x.kind) || {}).label || x.kind),
          h('span', null, x.label || '—'),
          h('i', null, `${String(x.date || '').slice(5)} ${x.hourUnknown ? '时辰未知' : String(x.time || '')}`))))) : null,

    (timeKind === 'cast' && usesTimeInput) ? h('div', { key: 'auto', className: 'mp-auto' },
      // 文案分清「自动取的」和「你手动填的」，免得明明改过还说自动取
      manual.cast
        ? `起卦时刻用的是你手动填的（${time}）；想跟随当下，把时间改回或清空即可。`
        : `起卦时刻已自动取本机时间（${time}），每次点起卦都会重新取当下；想固定时刻就在上面改。`) : null,

    error ? h('div', { key: 'err', className: 'mp-err', role: 'alert' }, error) : null,
    notice ? h('div', { key: 'ntc', className: 'mp-note', role: 'status' }, notice) : null,
    engineLoading ? h('div', { key: 'load', className: 'mp-note', role: 'status' }, '正在加载本页需要的引擎…') : null,

    (!result && !error) ? h('div', { key: 'empty', className: 'mp-empty' },
      h('b', null, tab === 'ziwei' || tab === 'bazi' ? '填好出生信息，点「排盘」'
        : tab === 'tarot' ? '写下想问的事，点「抽牌」'
          : tab === 'mbti' ? '按 1–5 给题目打分，答满 12 题就能看结果'
            : tab === 'constitution' ? '按 1–5 给题目打分，答满 27 题就能看结果'
            : QUICK_TABS.indexOf(tab) >= 0 ? '填好参数，点「看结果」'
              : '写下所问之事，点「起卦」'),
      tab === 'ziwei' || tab === 'bazi' ? '出生日期、时刻与性别即可；出生地只影响真太阳时。'
        : tab === 'mbti' ? '4 题一页，答案只在本地参与计算，不会上传。'
          : tab === 'constitution' ? '5 题一页，答案只在本地参与计算，不会上传；这是自评问卷，不是医学诊断。'
          : QUICK_TABS.indexOf(tab) >= 0 ? '按上面的选项填好参数即可；全部在本机计算，不上传。'
            : '起卦时刻已自动取当下，也可以手动改。') : null,

    result ? h('div', {
      key: 'card',
      className: 'mp-card mp-flat',
      role: 'region',
      'aria-label': '排盘结果',
      'aria-live': 'polite',
      onClick: onFoldClick,
      dangerouslySetInnerHTML: {
        __html: chartHTML(result) + castAtHTML(result) + PP.resultWithInterpret('', result.it, { folded: defaultFolded() })
          // 盘面（卦象 / 牌面 / 星盘）先出：先让人看见盘，性能与修订这些技术信息往后排
          + PP.perfHTML(perf) + PP.revisionHTML(result.r.revision) + PP.handleHTML(result.r.handle) + PP.shadowHTML(result.r.shadow, result.shadowDiff)
          + PP.traceHTML(result.r.trace, result.r.system, result.r.traceText) + PP.caliberHTML(result.caliber),
      },
    }) : null,

    result ? h('div', { key: 'bar', className: 'mp-bar' },
      h('button', { className: 'mp-btn ghost', style: { fontSize: 12, padding: '5px 12px' }, onClick: copyResult },
        copied || '复制文字结果'),
      h('button', {
        className: 'mp-btn ghost', style: { fontSize: 12, padding: '5px 12px', marginLeft: 8 },
        onClick: downloadReport, title: '导出盘面 + 解析（含一页读懂、三张表）为 Markdown',
      }, '导出 .md'),
      h('button', {
        className: 'mp-btn ghost', style: { fontSize: 12, padding: '5px 12px', marginLeft: 8 },
        onClick: downloadCard, title: '生成 PNG 摘要卡（一页读懂 + 首张表），适合直接分享',
      }, '存为摘要长图'),
      h('button', {
        className: 'mp-btn ghost', style: { fontSize: 12, padding: '5px 12px', marginLeft: 8 },
        onClick: saveToCases, title: '把这张盘的参数存进卦例库，日后可回填重排、标应验',
      }, caseSaved ? '已存入卦例库' : '存入卦例库')) : null,

    result ? h('div', { key: 'ask', className: 'mp-askbox', style: { flexWrap: 'wrap' } },
      h('input', {
        className: 'mp-input', value: askText, maxLength: 120,
        placeholder: '追问：如 2027 年事业怎么样（回车提交）',
        onChange: (e) => setAskText(e.target.value),
        onKeyDown: (e) => { if (e.key === 'Enter') doAsk(); },
      }),
      h('button', { className: 'mp-btn ghost', style: { fontSize: 12, padding: '5px 12px' }, onClick: doAsk }, '追问'),
      h('button', {
        className: 'mp-btn ghost', style: { fontSize: 12, padding: '5px 12px', marginLeft: 8 },
        onClick: askInChat, title: '把这张盘的摘要和你的问题一起发进 DSH 对话窗，由对话里的模型接着答',
      }, '问进对话'),
      (COMPOSER.ref ? null : h('div', { key: 'bridgediag', className: 'mp-note', style: { marginTop: 6, fontSize: 11, flexBasis: '100%' } }, bridgeDiagText())),
      chatNote ? h('div', { key: 'chatnote', className: 'mp-note', style: { marginTop: 6, fontSize: 12, flexBasis: '100%' } }, chatNote) : null) : null,

    // C3 桥替代：桥能用也留着——复制参数、发深链本身就是正经用法，不是只有桥坏掉才想起来
    result ? h('div', { key: 'bridge', className: 'mp-bridge' },
      h('span', { className: 'mp-bridge-lbl' }, COMPOSER.ref ? '桥可用；也可以：' : '桥未就绪，改走这几档：'),
      BRIDGE_KINDS.map(([k, label, tip]) => h('button', {
        key: k, type: 'button', className: 'mp-chip', 'data-bridge-copy': k, title: tip,
        onClick: (e) => copyBridge(k, e.currentTarget),
      }, label))) : null,

    fx ? h('div', { key: 'fx', className: 'mp-fx', dangerouslySetInnerHTML: { __html: PP.followupHTML(fx) } }) : null,

    // 验前事：只读信号 + 用户自评，不改盘
    (result && result.kind === 'bazi' && result.r.past) ? h('div', { key: 'verify', className: 'mp-verify' },
      h('div', { className: 'mp-verify-h' }, '验前事 · 过去几年的信号（只读，不改盘）'),
      result.r.past.rows.map((row) => h('div', { key: row.year, className: 'mp-verify-row' },
        h('span', { className: 'mp-verify-txt' }, `${row.year} ${row.ganzhi} · ${row.theme}`),
        h('span', { className: 'mp-verify-btns' }, ['yes', 'no', 'unsure'].map((m) => h('button', {
          key: m,
          className: 'mp-chip' + (pastMarks[row.year] === m ? ' on' : ''),
          onClick: () => setPastMarks(Object.assign({}, pastMarks, { [row.year]: m })),
        }, m === 'yes' ? '准' : m === 'no' ? '不准' : '不确定'))))),
      h('div', { className: 'mp-verify-foot' },
        h('button', { className: 'mp-btn ghost', style: btnStyle, onClick: calcFit }, '算贴合度'),
        fit ? h('span', { className: 'mp-verify-fit' }, `命中 ${fit.yes}/${fit.answered}（${fit.level}）：${fit.advice}`) : null)) : null,

    // 生时校正：候选时辰 × 过去事件
    (result && result.kind === 'bazi') ? h('div', { key: 'rect', className: 'mp-rect' },
      h('div', { className: 'mp-verify-h' }, '生时校正 · 用过去的事反推时辰'),
      rectEvents.map((ev, i) => h('div', { key: i, className: 'mp-rect-row' },
        h('input', {
          className: 'mp-input', type: 'number', min: 1900, max: 2100, value: ev.year,
          onChange: (e) => setRectEvents(rectEvents.map((x, j) => (j === i ? Object.assign({}, x, { year: e.target.value }) : x))),
        }),
        h('select', {
          className: 'mp-input', value: ev.kind,
          onChange: (e) => setRectEvents(rectEvents.map((x, j) => (j === i ? Object.assign({}, x, { kind: e.target.value }) : x))),
        }, [['career', '事业变动'], ['wealth', '财运'], ['love', '感情'], ['move', '搬迁/出行'], ['health', '健康'], ['other', '其他']]
          .map(([v, l]) => h('option', { key: v, value: v }, l))))),
      h('button', { className: 'mp-btn ghost', style: btnStyle, onClick: runRectify }, '计算候选时辰'),
      rectRes ? (rectRes.error
        ? h('div', { className: 'mp-rect-err' }, rectRes.error)
        : h('div', { className: 'mp-rect-out' },
          h('div', { className: 'mp-verify-fit' }, rectRes.note),
          rectRes.candidates.slice(0, 6).map((c) => h('div', {
            key: c.hour, className: 'mp-rect-cand' + (c === rectRes.best ? ' best' : ''),
          }, `${c.label} · 时柱 ${c.hourGanzhi} · 日柱 ${c.dayGanzhi} · 命中 ${c.hits}/${c.total}`)))) : null) : null,

    (!result && !error) ? h('div', { key: 'ph', className: 'mp-dim', style: { marginTop: 24, fontSize: 12 } },
      '选择体系后点「排盘」。所有计算在本机完成，不上传任何数据。') : null,

    // 反馈入口：常驻在面板底部（不是只有出错才出现——口径分歧、读不懂、想要什么功能都算）。
    // 设计目标是「用户不用组织语言」：点一下就得到一份写好输入、版本、环境与结果摘要的报告，
    // 直接粘贴到 issue / 邮件 / 群里即可。复现信息缺一项，开发者就得来回问一轮。
    h('div', { key: 'fb', className: 'mp-fb' },
      h('div', { className: 'mp-fb-h' },
        h('span', { className: 'mp-fb-t' }, '用得不对、读不懂、或算得跟别家不一样？'),
        h('button', {
          className: 'mp-btn ghost', style: { fontSize: 12, padding: '4px 10px' },
          onClick: copyFeedbackReport,
          title: '生成一份含输入、版本、环境与结果摘要的报告，粘贴到 issue / 邮件 / 群聊即可',
        }, fbCopied || '复制反馈报告'),
        h('button', {
          className: 'mp-btn ghost', style: { fontSize: 12, padding: '4px 10px', marginLeft: 6 },
          onClick: () => openFeedbackIssue(),
          title: '在浏览器打开 GitHub issue（报告已复制到剪贴板，粘进去即可）',
        }, '开 issue'),
        h('button', {
          className: 'mp-btn ghost', style: { fontSize: 12, padding: '4px 10px', marginLeft: 6 },
          onClick: () => openFeedbackMail(),
          title: '打开邮件客户端（报告已复制到剪贴板，粘进正文即可）',
        }, '发邮件')),
      h('div', { className: 'mp-fb-b' },
        '邮件 1129440028@qq.com　·　GitHub issues　·　微信群 dsh-metaphysics',
        fbNote ? h('span', { className: 'mp-fb-note' }, '　' + fbNote) : null)),
    // 卦例抽屉：不占 tab——tab 是「排盘体系」，卦例是查看类入口，混进 TABS 会被当成要出生时辰的体系
    casesOpen ? h('div', {
      key: 'cases',
      className: 'mp-cases-layer',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-label': '卦例库',
      onClick: (e) => { if (e.target === e.currentTarget) closeCases(); },
    },
      h('div', { className: 'mp-cases-box' },
        h('div', { className: 'mp-cases-h' },
          h('b', null, `卦例库 · ${caseList.length}/${cases.length}`),
          h('button', { className: 'mp-cases-x', onClick: closeCases, 'aria-label': '关闭' }, '✕')),
        h('div', { className: 'mp-cases-tabs' },
          [['all', '全部']].concat(PP.CASE_STATUS.map((s) => [s, PP.caseStatusLabel(s)]))
            .map((pair) => h('button', {
              key: pair[0],
              className: 'mp-chip' + (caseFilter === pair[0] ? ' on' : ''),
              onClick: () => setCaseFilter(pair[0]),
            }, `${pair[1]} ${caseCount(pair[0])}`))),
        h('div', { className: 'mp-cases-list' }, caseList.length
          ? caseList.map((x) => caseRow(x))
          : h('div', { className: 'mp-empty' },
            '这一栏还空着。看结果时点「存入卦例库」，想要的盘才会记进来；过些天回来标应验。')),
        h('div', { className: 'mp-cases-f' },
          h('button', {
            className: 'mp-btn ghost', style: { fontSize: 12, padding: '4px 10px' }, onClick: () => exportCases(false),
          }, '导出 JSONL'),
          h('button', {
            className: 'mp-btn ghost', style: { fontSize: 12, padding: '4px 10px', marginLeft: 6 },
            onClick: () => exportCases(true),
            title: '去掉出生年份（只留月日）、时刻整点化、去掉出生地——发给群里也不露个人信息',
          }, '导出脱敏版'),
          h('span', { className: 'mp-cases-tip' }, '只存参数与一句摘要，不存盘面；点条目回填重排。')))) : null,
  ];

  return h('div', { className: 'mp-wrap' }, children);
}

// 样式注入：优先用宿主 styles 服务，取不到就直接写 <style>（两条路都必须成功一条）
function injectStyle(css) {
  try {
    if (typeof styles !== 'undefined' && styles && typeof styles.insert === 'function') {
      return styles.insert(css);
    }
  } catch (e) {
    console.error('[metaphysics] styles.insert 不可用，改用 DOM 注入', e);
  }
  try {
    const el = document.createElement('style');
    el.setAttribute('data-plugin', '@local/metaphysics');
    el.textContent = css;
    document.head.appendChild(el);
    return () => el.remove();
  } catch (e) {
    console.error('[metaphysics] DOM 注入样式也失败', e);
    return () => {};
  }
}

// 品牌色上的字色：深色主题下品牌色本身常是浅色，选中块写死 #fff 就等于没有字。
// 所以运行时量一次真实的品牌色，按 WCAG 对比度挑白或近黑，写进 --mp-on-brand；
// CSS 只读这个变量（带 #fff 兜底），量不到也不会比原来更差。
let onBrandWatched = false;
function syncOnBrand() {
  try {
    const root = document.documentElement;
    if (!root || !document.body) return;
    const probe = document.createElement('span');
    probe.setAttribute('aria-hidden', 'true');
    probe.style.cssText = 'position:absolute;left:-9999px;top:0;width:0;height:0;pointer-events:none;'
      + 'background:var(--dsw-alias-brand-primary)';
    document.body.appendChild(probe);
    const bg = getComputedStyle(probe).backgroundColor;
    probe.remove();
    const on = (Core && typeof Core.pickOnColor === 'function') ? Core.pickOnColor(bg) : '';
    if (on && root.style && root.style.getPropertyValue('--mp-on-brand') !== on) {
      root.style.setProperty('--mp-on-brand', on);
    }
  } catch (e) {
    // 量不到（无 body / getComputedStyle 不可用）就让 CSS 的 #fff 兜底，不抛
  }
}
function watchOnBrand() {
  if (onBrandWatched) return;
  onBrandWatched = true;
  syncOnBrand();
  try {
    const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    if (mq && typeof mq.addEventListener === 'function') mq.addEventListener('change', syncOnBrand);
  } catch (e) { /* 老宿主没有 matchMedia，忽略 */ }
  // 宿主切换主题不一定是改系统偏好，也可能换 html 上的 class / data-theme
  try {
    if (typeof MutationObserver === 'function' && document.documentElement) {
      new MutationObserver(syncOnBrand).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class', 'data-theme'],
      });
    }
  } catch (e) { /* 没有 MutationObserver 就只在首次与系统偏好变化时同步 */ }
}

// 客户端插件绝不能因为自身异常拖垮应用启动：注册失败只记日志。
function safeApply(ctx) {  try {
    const dispose = injectStyle(CSS + (PP && PP.CSS ? PP.CSS : ''));
    if (typeof ctx.effect === 'function' && typeof dispose === 'function') ctx.effect(() => dispose);
  } catch (e) {
    console.error('[metaphysics] 样式注入失败', e);
  }
  // 样式进页面之后再量品牌色：此刻 var(--dsw-alias-brand-primary) 才解析得出来
  try { watchOnBrand(); } catch (e) { console.error('[metaphysics] 字色同步失败', e); }

  let slots = null;
  try {
    slots = (ctx && ctx.slots) || (ctx && typeof ctx.get === 'function' ? ctx.get('slots') : null);
  } catch (e) {
    console.error('[metaphysics] 取 slots 服务失败', e);
  }
  if (!slots || typeof slots.register !== 'function') {
    console.error('[metaphysics] slots 服务不可用，面板未注册');
    return;
  }

  // 槽位门面必须有 inject（它等「声明提交」后再注册）；没有就只能直接注册。
  try {
    COMPOSER.injectType = typeof slots.inject;
    const sp = typeof slots.spec === 'function' ? slots.spec('conversation.input.right') : null;
    COMPOSER.spec = sp ? sp.kind + '/' + sp.scope : '未声明';
  } catch (e) {
    COMPOSER.spec = '取声明失败';
    noteRegError(e);
  }
  /**
   * 把 slots.register 的返回值归一成「清理函数」。
   *
   * 宿主文档说 register 返回 "the idempotent definition disposer"，实测返回的是
   * **对象**而不是函数（可能是带 dispose() 的句柄，也可能是别的形状）。
   * 而 slots.inject 的 callback 契约要求返回 `SlotInjectionEffect`——即一个可调用清理器。
   * 直接 `return d` 会让宿主拿到 object，判这次贡献无效：座位占住了、register 不抛错、
   * 组件却永远不渲染。这正是「输入框右侧看不到 chip」的根因。
   *
   * 这里按能力探测，不猜具体形状：函数直接用；有 dispose/off/cancel 方法的包一层；
   * 都认不出就退化成空清理器（仍然满足「可调用」契约，不静默失效）。
   */
  const asDisposer = (d) => {
    if (typeof d === 'function') return d;
    if (d && typeof d === 'object') {
      for (const m of ['dispose', 'off', 'cancel', 'unregister']) {
        if (typeof d[m] === 'function') return () => { try { d[m](); } catch (e) { /* 清理失败不影响主流程 */ } };
      }
    }
    return () => {};
  };

  const tryReg = (options, component) => {
    try {
      const d = slots.register(options, component);
      COMPOSER.regs += 1;
      // 宿主收下即算「这个槽位已申报」：组件什么时候挂载由外壳决定，
      // 拿 ref 当唯一判据会在挂载空窗里反复补注册，输入条长出两个同款按钮
      COMPOSER.seatOk[options.name] = true;
      return asDisposer(d);
    } catch (e) {
      noteRegError(e);
      return () => {};
    }
  };

  // 关键：槽位由外壳（ui-layout）声明，可能晚于本插件激活。
  // 用 slots.inject 等声明提交后再注册，直接 register 会抛 "slot is not declared"。
  // 与 sessionSeat 同理：callback 必须把 disposer 返回给宿主，否则贡献无效。
  const waitFor = (key, install) => {
    const guarded = () => {
      const d = install();
      COMPOSER.contribution = (COMPOSER.contribution ? COMPOSER.contribution + ',' : '')
        + (key + (typeof d === 'function' ? ' 已挂上' : ' 未挂上'));
      return d;
    };
    try {
      if (typeof slots.inject === 'function') {
        slots.inject(key, guarded);
      } else {
        guarded();
      }
    } catch (e) {
      console.error('[metaphysics] 等待槽位失败：' + key, e);
      try { guarded(); } catch (e2) { console.error('[metaphysics] 直接注册也失败：' + key, e2); }
    }
  };

  waitFor('sidebar.panellist', () => tryReg(
    { name: 'sidebar.panellist', id: 'metaphysics', order: 20, label: () => '烛微命盘 v' + (window.__MP_VER || '') },
    PanelIcon,
  ));

  waitFor('main', () => tryReg({ name: 'main', key: 'metaphysics' }, (p) => h(PanelGuard, null, h(App, p))));

  // 会话输入框右侧的小桥：拿到 inputActions 后把提问送进输入框。
  //
  // 宿主契约（slots.inject）：`inject(key, callback)` 的 callback 必须**返回 disposer**
  // （signature 写作 `() => SlotInjectionEffect`）——它被当作「这段贡献」的清理器。
  // 旧实现把 inject 包在 ctx.effect(run) 里、而 run 什么都不返回，宿主拿到 undefined
  // 就认为这次贡献没有效果，槽位虽声明成功、注册也不抛错，但这条贡献等于没挂上。
  // 这与「问进对话看不到 chip」的症状一致：组件压根没被渲染。
  //
  // 现在两层都返回 disposer：inject 的 callback 返回 tryReg 的注销器，
  // 外层 ctx.effect 也返回同一个，插件的 fiber 卸载时两层都能收干净。
  const sessionSeat = (key, install) => {
    const run = () => {
      try {
        // 槽位已声明时宿主会同步跑 callback；未声明时先挂起，声明提交后再重放。
        // 两种情况下 callback 的返回值都是本座位的注销器，必须一路传回去。
        const d = slots.inject(key, install);
        // 自检用：只记「有没有拿到注销器」，这是宿主判定贡献有效性的唯一依据。
        COMPOSER.contribution = (COMPOSER.contribution ? COMPOSER.contribution + ',' : '')
          + (key.replace('conversation.', '') + (typeof d === 'function' ? ' 已挂上' : ' 未挂上'));
        return d;
      } catch (e) {
        console.error('[metaphysics] 槽位注册失败：' + key, e);
        try { return install(); } catch (e2) {
          console.error('[metaphysics] 直接注册也失败：' + key, e2);
          return undefined;
        }
      }
    };
    let dispose;
    try {
      if (typeof ctx.effect === 'function') dispose = ctx.effect(run, 'metaphysics: ' + key);
      else dispose = run();
    } catch (e) {
      console.error('[metaphysics] effect 包裹失败：' + key, e);
      dispose = run();
    }
    // effect 返回的是「清理这次 effect」的函数；把它们留一份，插件卸载时统一收
    if (typeof dispose === 'function') COMPOSER.seatDisposers.push(dispose);
  };

  sessionSeat('conversation.input.right', () => tryReg(
    { name: 'conversation.input.right', id: 'metaphysics-ask', order: 40 },
    ComposerBridge,
  ));

  sessionSeat('conversation.composer.dock', () => tryReg(
    { name: 'conversation.composer.dock', id: 'metaphysics-dock', order: 60 },
    ComposerProbe,
  ));

  // 补注册的真实需求：slots.inject 只在「槽位声明提交」时重放 callback。
  // 如果本插件激活时会话槽位**已经**声明过、而 inject 的挂起机制没接上（宿主版本差异），
  // 就永远等不到重放——这时才需要补一次。
  //
  // 关键约束（旧实现踩过两次）：
  //  ① 不能换新 id。`conversation.input.right` 是 list 槽，换 id 补注册会在输入条上
  //     长出好几个同款 chip（metaphysics-ask-1 / -2 …）。
  //  ② 不能和 sessionSeat 撞车。两处都用同一个 id 注册，宿主要么抛错要么覆盖，
  //     都会把先落地的那份注册挤掉——这正是「座位占了、chip 却看不到」的直接原因。
  //  ③ 只在「确实还没注册成功」时补，且一辈子只补一次。
  //
  // 因此在 tryReg 成功时就地把「已注册」记进 seatOk，补注册只看这个标记。
  let seatRetryDone = false;
  const trySeatNow = () => {
    if (COMPOSER.ref || seatRetryDone) return;
    seatRetryDone = true;
    if (!COMPOSER.seatOk['conversation.input.right']) {
      tryReg({ name: 'conversation.input.right', id: 'metaphysics-ask', order: 40 }, ComposerBridge);
    }
    if (!COMPOSER.seatOk['conversation.composer.dock']) {
      tryReg({ name: 'conversation.composer.dock', id: 'metaphysics-dock', order: 60 }, ComposerProbe);
    }
  };
  // 会话输入条要等会话视图打开才声明槽位：启动后短轮询几次，用户第一次点页面时再补一次。
  // 一旦两格都被宿主收下就停——不再无限补注册。
  let seatTriesLeft = 20;
  const seatBothSeated = () => !!(COMPOSER.seatOk['conversation.input.right'] && COMPOSER.seatOk['conversation.composer.dock']);
  const seatRetry = () => {
    if (COMPOSER.ref || seatTriesLeft <= 0 || seatBothSeated()) return;
    seatTriesLeft -= 1;
    trySeatNow();
    if (seatBothSeated()) return;
    setTimeout(seatRetry, 700);
  };
  try { setTimeout(seatRetry, 700); } catch (e) { /* 无计时器环境 */ }
  try {
    document.addEventListener('pointerdown', () => { seatRetryDone = false; trySeatNow(); }, { once: true, capture: true });
  } catch (e) { /* 非 DOM 环境 */ }
}

return {
  inject: ['slots'],
  apply(ctx) {
    try {
      safeApply(ctx);
    } catch (e) {
      console.error('[metaphysics] apply 异常', e);
    }
  },
};







