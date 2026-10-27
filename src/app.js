// ── 历史记录（localStorage，只存参数，最多 20 条） ──
const HIST_KEY = 'dsh-metaphysics/history-v1';
function loadHistory() {
  try {
    const raw = window.localStorage && window.localStorage.getItem(HIST_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list.slice(0, 20) : [];
  } catch (e) { return []; }
}
function saveHistory(list) {
  try {
    if (window.localStorage) window.localStorage.setItem(HIST_KEY, JSON.stringify(list.slice(0, 20)));
  } catch (e) { /* 隐私模式或配额满：静默降级，不影响排盘 */ }
}
const sameEntry = (a, b) =>
  a.kind === b.kind && a.date === b.date && a.time === b.time && a.gender === b.gender
  && a.address === b.address && a.lines === b.lines && a.question === b.question
  && a.mhMode === b.mhMode && a.upper === b.upper && a.lower === b.lower;

/** 历史条目的显示文案：一屏能看出是哪个盘 */
function HISTORY_LABEL(kind, r) {
  if (kind === 'bazi') return Object.values(r.pillars || {}).map((p) => p.ganzhi).join(' ');
  if (kind === 'ziwei') return `${r.soul ? r.soul.branch : ''}宫 ${r.bureau ? r.bureau.name : ''} ${r.lunar ? r.lunar.year + '年' : ''}`.trim();
  if (kind === 'liuyao') return r.ben && r.ben.name ? r.ben.name : '';
  if (kind === 'meihua') return r.ben && r.ben.name ? `${r.ben.name} 动${r.moving}` : '';
  if (kind === 'daliuren') return `${r.dayGanZhi || ''} ${r.geJu ? r.geJu.name : ''}`;
  return '';
}
// Client 半：命理排盘面板。由 build-client.mjs 注入 React / h / Engine / __PP。
const PP = window.__PP;
const CSS = `
.mp-wrap{height:100%;overflow:auto;padding:20px 24px 40px;color:var(--dsw-alias-label-primary);font-size:14px}
/* 内容统一收在同一列居中，避免宽屏下输入框拉成一条 */
.mp-wrap>*{max-width:940px;margin-left:auto;margin-right:auto}
/* ── 表单卡片：等宽栅格，问题独占一行，按钮落在右下 ── */
.mp-panel{background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:14px;padding:16px 18px 14px;margin-bottom:14px}
.mp-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px 14px;align-items:end}
.mp-lbl{display:block;height:18px;line-height:18px;font-size:12.5px;color:var(--dsw-alias-label-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mp-checks{display:flex;gap:20px;flex-wrap:wrap;margin-top:13px;font-size:12.5px;color:var(--dsw-alias-label-secondary)}
.mp-checks label{display:inline-flex;align-items:center;gap:6px;cursor:pointer}
.mp-askblock{margin-top:14px;display:flex;flex-direction:column;gap:5px}
.mp-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:14px}
.mp-tabs{display:inline-flex;gap:4px;margin-bottom:14px;flex-wrap:wrap;padding:4px;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:11px;width:100%;max-width:940px}
.mp-tab{padding:7px 15px;border-radius:8px;border:none;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;font-size:13.5px;transition:background .12s,color .12s}
.mp-tab:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
.mp-tab.on{background:var(--dsw-alias-brand-primary);color:#fff}
.mp-field{display:flex;flex-direction:column;gap:5px;font-size:13px;color:var(--dsw-alias-label-secondary);min-width:0}
.mp-input{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-primary);border-radius:8px;padding:7px 11px;font-size:14px;outline:none;width:100%;min-width:0;height:36px}
.mp-input:focus{border-color:var(--dsw-alias-brand-primary)}
/* 所问之事：多行文本，视觉与其他输入框一致 */
.mp-textarea{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-primary);border-radius:8px;padding:8px 11px;font-size:14px;outline:none;width:100%;min-width:0;resize:vertical;line-height:1.5;font-family:inherit}
.mp-textarea:focus{border-color:var(--dsw-alias-brand-primary)}
.mp-textarea.invalid{border-color:var(--dsw-alias-state-error-primary)}
.mp-btn{padding:8px 22px;border-radius:8px;border:none;background:var(--dsw-alias-brand-primary);color:#fff;cursor:pointer;font-size:14px;font-weight:600;min-width:132px}
.mp-btn.ghost{background:transparent;border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-secondary)}
.mp-seg{display:flex;width:100%;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;overflow:hidden;height:36px}
.mp-seg button{flex:1;padding:0 8px;background:transparent;border:none;color:var(--dsw-alias-label-secondary);font-size:13px;cursor:pointer}
.mp-seg button.on{background:var(--dsw-alias-brand-primary);color:#fff}
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
.mp-card{margin-top:18px;padding:16px 18px;border-radius:14px;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1)}
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
.mp-fx{margin-top:10px}
/* 验前事 / 生时校正 */
.mp-verify,.mp-rect{margin-top:12px;padding:12px;border:1px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-layer-2)}
.mp-verify-h{font-size:12px;font-weight:700;letter-spacing:.08em;color:var(--dsw-alias-label-secondary);margin-bottom:8px}
.mp-verify-row{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:12.5px;padding:3px 0}
.mp-verify-btns{display:flex;gap:4px}
.mp-chip{font-size:11.5px;padding:2px 8px;border-radius:999px;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer}
.mp-chip.on{background:var(--dsw-alias-brand-primary);color:#fff;border-color:transparent}
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
/* ── 窄屏 / 手机：网格降列，按钮占满 ── */
@media (max-width:860px){
  .mp-row{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (max-width:720px){
  .mp-wrap{padding:14px 14px 36px}
  .mp-tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-bottom:12px}
  .mp-tab{padding:9px 4px;font-size:13.5px;text-align:center}
  .mp-input,.mp-textarea{padding:10px 12px;font-size:16px;min-height:44px;height:auto}
  .mp-textarea{min-height:76px}
  .mp-actions{margin-top:12px}
  .mp-btn{width:100%;padding:12px;font-size:15px;min-height:46px;min-width:0}
  .mp-hint,.mp-auto,.mp-cast{font-size:12.5px}
  .mp-empty{margin-top:18px;padding:24px 16px;font-size:12.5px}
  .mp-bar{flex-wrap:wrap}
}
@media (max-width:480px){
  .mp-row{grid-template-columns:1fr}
}
@media (max-width:420px){
  .mp-wrap{padding:12px 10px 32px}
  .mp-tab{font-size:13px;padding:8px 2px}
}
`;

const { useState, useEffect } = React;

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
  { k: 'trend', label: '人生K线', timeLabel: '出生时刻', hint: '人生 K 线按大运与流年十神给逐年运势分，画成走势图。' },
  { k: 'fengshui', label: '风水', timeLabel: '', hint: '风水看八宅命卦、大游年四吉四凶与流年九宫飞星；也可按坐向看门主灶倾向。' },
  { k: 'name', label: '起名', timeLabel: '', hint: '起名按八字喜用匹配字库五行，可评估现有名字或生成候选名。' },
];

function pad(n) { return String(n).padStart(2, '0'); }

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
};
const SAMPLE = { date: '1990-05-12', time: '14:30' };
const kindOf = (t) => TIME_KIND[t] || 'none';

// 问事的体系（六爻 / 梅花 / 六壬 / 塔罗）必须填「所问之事」；命盘类不问事
// 表单规则与独立页共用一份（src/core.js，由构建注入 window.__MPCore）
const Core = window.__MPCore || {};
const needAsk = Core.needAsk || ((t) => false);

function App() {
  const [tab, setTab] = useState('ziwei');
  const [date, setDate] = useState('1990-05-12');
  const [time, setTime] = useState('14:30');
  const [gender, setGender] = useState('female');
  const [address, setAddress] = useState('');
  // 合盘用的第二个人
  const [pDate, setPDate] = useState('1992-08-15');
  const [pTime, setPTime] = useState('10:00');
  const [pGender, setPGender] = useState('female');
  const [pAddress, setPAddress] = useState('');
  const [hpChart, setHpChart] = useState('bazi');
  // 奇门换局规则：chaibu 拆补 / chaoshen 超神接气 / zhirun 置闰（引擎三种取局口径）
  const [qimenRule, setQimenRule] = useState('chaibu');
  const [trueSolar, setTrueSolar] = useState(true);
  // 晚子时：23:00–23:59 出生时，日柱算次日还是当日（通用排盘规则里的一个可调口径）
  const [lateZi, setLateZi] = useState(true);
  const [qLateZi, setQLateZi] = useState('same-day');
  // 八字 × 紫微交叉验证；追问输入与结果
  const [crossOn, setCrossOn] = useState(false);
  const [askText, setAskText] = useState('');
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
  const [convMode, setConvMode] = useState('solar2lunar');
  const [lunarDate, setLunarDate] = useState('');
  const [leapMonth, setLeapMonth] = useState(false);
  const [xlrMode, setXlrMode] = useState('time');
  const [num1, setNum1] = useState(''); const [num2, setNum2] = useState(''); const [num3, setNum3] = useState('');
  const [toAge, setToAge] = useState('60');
  const [fsMode, setFsMode] = useState('natal');
  const [sitting, setSitting] = useState('子');
  const [facing, setFacing] = useState('午');
  const [nnMode, setNnMode] = useState('assess');
  const [surname, setSurname] = useState('李');
  const [givenName, setGivenName] = useState('');
  const [limitN, setLimitN] = useState('6');
  const [onlineGeo, setOnlineGeo] = useState(false);
  const [lines, setLines] = useState('');
  const [result, setResult] = useState(null);
  const [hist, setHist] = useState(() => loadHistory());
  const [replayArgs, setReplayArgs] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [count, setCount] = useState('3');
  const [question, setQuestion] = useState('');
  const [direction, setDirection] = useState('general');
  // 解析模块较长：窄屏默认收起、宽屏默认展开；用户手动切过就以他的选择为准
  const [foldPref, setFoldPref] = useState(null);
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
  const showDate = tab !== 'tarot' && usesTimeInput;
  const showTime = showDate && timeKind !== 'date';
  const showDT = showTime;

  const run = async (kind, override, modeOverride, over) => {
    const k = kind || tab;
    const mh = modeOverride || mhMode;
    const dt = override ? override : { date, time };
    // over：示例等「临时覆盖」用，避免依赖 React 状态更新后再读（同一个 handler 里 setState 还没生效）
    const genderV = over && over.gender ? over.gender : gender;
    const addressV = over && typeof over.address === 'string' ? over.address : address;
    try {
      const datetime = `${dt.date}T${dt.time}`;
      const args = { system: k };
      if (k !== 'tarot') args.datetime = datetime;
      if (k === 'bazi' || k === 'ziwei' || k === 'hepan') {
        // 合盘的主方同样需要性别与出生地：漏掉这两个字段会让合盘拿不到性别（引擎已改为必填），
        // 或者在没有真太阳时的情况下排出与单盘不一致的四柱
        args.gender = genderV;
        args.trueSolar = trueSolar;
        if (addressV.trim()) {
          args.address = addressV.trim();
          try {
            const g = await Engine.geocodeAddress(args.address, { online: onlineGeo });
            if (g && typeof g.lon === 'number') { args.longitude = g.lon; args.geo = g; }
          } catch (e) {
            console.error('[metaphysics] 地址解析失败，退回内置表', e);
          }
        }
        // 交叉验证只对八字/紫微有意义：引擎会用同一份出生信息再排另一套盘
        if (k !== 'hepan') args.cross = crossOn;
        args.lateZi = lateZi;
      }
      if (k === 'liuyao') {
        const parsed = Core.parseLines(lines);
        if (parsed.lines) args.lines = parsed.lines;
        else if (parsed.warning) setNotice(parsed.warning);
      }
      if (k === 'qimen') { args.juMethod = qimenRule; args.lateZiHourMode = qLateZi; }
      // 八字：验前事只读信号随盘一起算（不改盘）
      if (k === 'bazi') args.verifyPast = 6;
      // 速查类：各体系自己的最小输入
      if (k === 'zeri') {
        args.startDate = dt.date;
        args.task = task;
        args.days = Number(days) || 30;
        if (shengXiao) args.shengXiao = shengXiao;
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
      if (k === 'trend') { args.gender = genderV; args.toAge = Number(toAge) || 60; args.trueSolar = trueSolar; args.lateZi = lateZi; }
      if (k === 'fengshui') {
        args.action = fsMode;
        if (fsMode === 'advise') { args.sitting = sitting; args.facing = facing; delete args.datetime; }
        else { args.gender = genderV; }
      }
      if (k === 'name') {
        args.action = nnMode;
        args.surname = surname.trim();
        if (nnMode === 'generate') {
          args.gender = genderV; args.limit = Number(limitN) || 6;
          args.trueSolar = trueSolar; args.lateZi = lateZi;
        } else {
          args.givenName = givenName.trim();
          delete args.datetime; // 评估名字时生辰可空：空着只评字面五行
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
      if (k === 'tarot') args.count = Number(count);
      if (k === 'hepan') {
        args.chart = hpChart;
        args.partner = {
          datetime: `${pDate}T${pTime}`,
          gender: pGender,
          address: pAddress.trim() || undefined,
          trueSolar,
        };
      }
      // 所问之事必填：问事的体系不给一份没有落点的解读
      if (needAsk(k)) {
        if (!question.trim()) {
          setError('请先填写「所问之事」——一句话即可，例如：今年是否适合换工作？');
          setAskInvalid(true);
          setResult(null);
          return;
        }
        setAskInvalid(false);
        args.question = question.trim();
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
      const r = Engine.compute(args);
      // 八字结果里直接嵌人生 K 线：同一份出生信息再排一次 trend，确定性、无网络
      let trend = null;
      if (k === 'bazi') {
        try {
          trend = Engine.compute({
            system: 'trend', datetime, gender: genderV, toAge: 100,
            trueSolar, lateZi,
            ...(args.dst !== undefined ? { dst: args.dst } : {}),
            ...(args.address ? { address: args.address } : {}),
            ...(typeof args.longitude === 'number' ? { longitude: args.longitude } : {}),
            ...(args.geo ? { geo: args.geo } : {}),
          });
        } catch (e) { trend = null; }
      }
      // 问题与方向一并与卦象交给解读：解读按它展开，并在开头回显供确认。
      // 奇门虽然不问事，但「询问方向」决定取哪个门/星作用神，所以也要传。
      const ask = (needAsk(k) || k === 'qimen')
        ? { question: needAsk(k) ? question.trim() : '', direction }
        : undefined;
      const it = Engine.interpret ? Engine.interpret(r, ask) : null;
      // 交叉验证结果由 compute 挂在盘面对象上，这里补进解析分节（与独立页同一渲染路径）
      if (it && r.cross && Engine.crossText) {
        it.sections = [...(it.sections || []), { key: 'crossSystem', label: '八字 × 紫微 交叉验证', text: Engine.crossText(r.cross) }];
      }
      // timed：这次结果是否真的用到了「起卦时刻」（梅花数字起卦不用）
      const timed = kindOf(k) === 'cast' && (k !== 'meihua' || mh === 'time');
      setResult({ kind: k, r, it, at: dt, timed, trend });
      setFx(null); setFit(null); setPastMarks({}); setRectRes(null);
      setError('');      setCopied('');
      // 历史记录：塔罗是随机抽牌，重放会变成另一副牌，不入历史
      if (k !== 'tarot') {
        const entry = {
          kind: k, date, time, gender, address,
          lines: k === 'liuyao' ? lines : '',
          question: needAsk(k) ? question.trim() : '',
          direction, count,
          mhMode, upper, lower, changing,
          label: HISTORY_LABEL(k, r),
          at: Date.now(),
        };
        setHist((prev) => {
          const next = [entry, ...prev.filter((x) => !sameEntry(x, entry))].slice(0, 20);
          saveHistory(next);
          return next;
        });
      }
    } catch (e) {
      setError(e && e.message ? e.message : String(e));
      setResult(null);
    }
  };

  /** 切 tab：起卦类自动取当前时刻、命盘类回到示例默认；用户在这类下改过则保留他的值 */
  const switchTo = (next) => {
    const k = kindOf(next);
    setTab(next);
    setError('');
    if (k === 'none') { run(next); return; } // 塔罗不看时间，直接抽牌（与 web-ui 一致）
    const v = manual[k] || (k === 'cast' ? nowParts() : { date: SAMPLE.date, time: SAMPLE.time });
    setDate(v.date);
    setTime(v.time);
    run(next, v);
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

  /** 解析模块折叠：标题栏整栏可点（内容由 innerHTML 渲染，用委托处理） */
  const onFoldClick = (e) => {
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
    setResult(Object.assign({}, result, { it }));
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

  /** 追问：只从已算好的盘面取数，不重排 */
  const doAsk = () => {
    if (!result || !result.r || !askText.trim()) return;
    try {
      setFx(Engine.followup ? Engine.followup(result.r, askText.trim()) : null);
    } catch (e) { setFx({ question: askText.trim(), ok: false, answer: '追问失败：' + (e && e.message ? e.message : e), evidence: [], confidence: '弱' }); }
  };

  /** 导出 Markdown：盘面 + 解析（一页读懂 / 三张表 / 交叉验证） */
  const downloadReport = () => {
    if (!result || !result.r) return;
    try {
      const text = Engine.renderText ? Engine.renderText(result.r) : (result.r.summary || '');
      const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `命理报告-${result.r.system}.md`;
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
      a.download = `命理摘要-${result.r.system}.png`;
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
      const [y, m, d] = String(date).split('-').map(Number);
      const [, mm] = String(time).split(':').map(Number);
      const events = rectEvents
        .filter((e) => Number(e.year))
        .map((e) => ({ year: Number(e.year), kind: e.kind }));
      setRectRes(Engine.rectifyBirth ? Engine.rectifyBirth({
        base: { year: y, month: m, day: d, minute: Number.isFinite(mm) ? mm : 0 },
        gender,
        events,
        lateZi,
        trueSolar,
        address: address.trim() || undefined,
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
    if (x.gender) setGender(x.gender);
    setAddress(x.address || '');
    setLines(x.lines || '');
    setQuestion(x.question || '');
    setDirection(x.direction || 'general');
    setCount(x.count || '3');
    setMhMode(x.mhMode || 'time');
    setUpper(x.upper || '');
    setLower(x.lower || '');
    setChanging(x.changing || '');
    setAskInvalid(false);
    setReplayArgs(x);
  };
  const clearHist = () => { setHist([]); saveHistory([]); };

  useEffect(() => { run('ziwei'); }, []);
  useEffect(() => {
    if (!replayArgs) return;
    const k = replayArgs.kind;
    setReplayArgs(null);
    run(k);
  }, [replayArgs]);

  const children = [
    h('div', { key: 'tabs', className: 'mp-tabs', role: 'tablist', 'aria-label': '命理体系' }, TABS.map((t) =>
      h('button', {
        key: t.k,
        role: 'tab',
        'aria-selected': tab === t.k ? 'true' : 'false',
        tabIndex: tab === t.k ? 0 : -1,
        className: 'mp-tab' + (tab === t.k ? ' on' : ''),
        onClick: () => switchTo(t.k),
      }, t.label))),

    h('div', { key: 'head', className: 'mp-panel' },
      h('div', { className: 'mp-row' },
        showDate ? field(isBirth ? '出生日期（公历）' : timeKind === 'date' ? '日期（公历）' : '起卦日期（公历）',
          h('input', { className: 'mp-input', type: 'date', value: date, onChange: (e) => editDate(e.target.value) })) : null,
        showTime ? field(isBirth ? '出生时刻' : '起卦时刻',
          h('input', { className: 'mp-input', type: 'time', value: time, onChange: (e) => editTime(e.target.value) })) : null,
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
        tab === 'hepan' ? field('对方出生日期', h('input', {
          className: 'mp-input', type: 'date', value: pDate, onChange: (e) => setPDate(e.target.value),
        })) : null,
        tab === 'hepan' ? field('对方出生时刻', h('input', {
          className: 'mp-input', type: 'time', value: pTime, onChange: (e) => setPTime(e.target.value),
        })) : null,
        tab === 'hepan' ? field('对方性别', h('select', {
          className: 'mp-input', value: pGender, onChange: (e) => setPGender(e.target.value),
        }, h('option', { value: 'female' }, '女'), h('option', { value: 'male' }, '男'))) : null,
        tab === 'hepan' ? field('合盘方式', h('div', { className: 'mp-seg' },
          h('button', { className: hpChart === 'bazi' ? 'on' : '', onClick: () => setHpChart('bazi') }, '八字'),
          h('button', { className: hpChart === 'ziwei' ? 'on' : '', onClick: () => setHpChart('ziwei') }, '紫微'))) : null,        tab === 'hepan' ? field('对方出生地（可空）', h('input', {
          className: 'mp-input', placeholder: '如 四川成都', value: pAddress,
          onChange: (e) => setPAddress(e.target.value),
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
        tab === 'tarot' ? field('张数', h('select', {
          className: 'mp-input', value: count, onChange: (e) => setCount(e.target.value),
        }, h('option', { value: '1' }, '1 张 · 指引'), h('option', { value: '3' }, '3 张 · 过去现在未来'), h('option', { value: '5' }, '5 张 · 十字牌阵'))) : null,
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
        tab === 'trend' ? field('算到几岁', h('input', {
          className: 'mp-input', type: 'number', min: 10, max: 100, value: toAge,
          onChange: (e) => setToAge(e.target.value),
        })) : null,
        tab === 'fengshui' ? field('看什么', h('div', { className: 'mp-seg' },
          h('button', { className: fsMode === 'natal' ? 'on' : '', onClick: () => setFsMode('natal') }, '命卦'),
          h('button', { className: fsMode === 'advise' ? 'on' : '', onClick: () => setFsMode('advise') }, '门主灶'))) : null,
        (tab === 'fengshui' && fsMode === 'advise') ? field('坐山（24 山）', h('input', {
          className: 'mp-input', value: sitting, placeholder: '如 子 / 乾',
          onChange: (e) => setSitting(e.target.value),
        })) : null,
        (tab === 'fengshui' && fsMode === 'advise') ? field('朝向（24 山）', h('input', {
          className: 'mp-input', value: facing, placeholder: '如 午 / 巽',
          onChange: (e) => setFacing(e.target.value),
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
        isBirth ? h('label', { className: 'mp-field mp-checks' },
          h('input', { type: 'checkbox', checked: lateZi, onChange: (e) => setLateZi(e.target.checked) }),
          h('span', { className: 'mp-lbl' }, '晚子时换日')) : null,
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
      h('div', { key: 'actions', className: 'mp-actions' },
        h('button', {
          className: 'mp-btn ghost', style: { fontSize: 12, padding: '5px 12px', marginRight: 8 },
          onClick: openSample, title: '用固定示例盘看完整报告（不改动你已填的数据）',
        }, '看示例'),
        h('button', { className: 'mp-btn', onClick: go, title: '时间仍为自动时，点它会取当下再起卦' },
          tab === 'tarot' ? '抽牌' : tab === 'bazi' || tab === 'ziwei' ? '排盘' : tab === 'hepan' ? '合盘' : '起卦'))),

    h('div', { key: 'hint', className: 'mp-hint' }, meta.hint),

    hist.length ? h('div', { key: 'hist', className: 'mp-hist' },
      h('div', { className: 'mp-hist-h' },
        h('span', null, '最近排过'),
        h('button', { className: 'mp-hist-clear', onClick: clearHist }, '清空')),
      h('div', { className: 'mp-hist-list' }, hist.map((x, i) =>
        h('button', {
          key: i, className: 'mp-hist-item', title: `${x.date} ${x.time}`,
          onClick: () => replay(x),
        },
          h('b', null, (TABS.find((t) => t.k === x.kind) || {}).label || x.kind),
          h('span', null, x.label || '—'),
          h('i', null, `${x.date.slice(5)} ${x.time}`))))) : null,

    (timeKind === 'cast' && usesTimeInput) ? h('div', { key: 'auto', className: 'mp-auto' },
      // 文案分清「自动取的」和「你手动填的」，免得明明改过还说自动取
      manual.cast
        ? `起卦时刻用的是你手动填的（${time}）；想跟随当下，把时间改回或清空即可。`
        : `起卦时刻已自动取本机时间（${time}），每次点起卦都会重新取当下；想固定时刻就在上面改。`) : null,

    error ? h('div', { key: 'err', className: 'mp-err', role: 'alert' }, error) : null,
    notice ? h('div', { key: 'ntc', className: 'mp-note', role: 'status' }, notice) : null,

    (!result && !error) ? h('div', { key: 'empty', className: 'mp-empty' },
      h('b', null, tab === 'ziwei' ? '填好出生信息，点「排盘」' : tab === 'bazi' ? '填好出生信息，点「排盘」'
        : tab === 'tarot' ? '写下想问的事，点「抽牌」' : '写下所问之事，点「起卦」'),
      tab === 'ziwei' || tab === 'bazi' ? '出生日期、时刻与性别即可；出生地只影响真太阳时。' : '起卦时刻已自动取当下，也可以手动改。') : null,

    result ? h('div', {
      key: 'card',
      className: 'mp-card mp-flat',
      role: 'region',
      'aria-label': '排盘结果',
      'aria-live': 'polite',
      onClick: onFoldClick,
      dangerouslySetInnerHTML: {
        __html: castAtHTML(result) + PP.resultWithInterpret(
          result.kind === 'ziwei' ? PP.ziweiHTML(result.r)
            : result.kind === 'bazi' ? (PP.baziHTML(result.r) + (result.trend ? PP.trendHTML(result.trend) : ''))
              : result.kind === 'meihua' ? PP.meihuaHTML(result.r)
                : result.kind === 'daliuren' ? PP.daliurenHTML(result.r)
                  : result.kind === 'qimen' ? (PP.qimenHTML(result.r) + PP.qimenFactsHTML(result.r))
                  : result.kind === 'hepan' ? (result.r.chart === 'ziwei' ? PP.ziweiHepanHTML(result.r) : PP.hepanHTML(result.r))
                  : result.kind === 'tarot' ? PP.tarotHTML(result.r)
                    : result.kind === 'liuyao' ? PP.liuyaoHTML(result.r)
                      : result.kind === 'chenggu' ? PP.chengguHTML(result.r)
                        : result.kind === 'almanac' ? PP.almanacHTML(result.r)
                        : result.kind === 'trend' ? PP.trendHTML(result.r)
                        : result.kind === 'name' ? PP.nameHTML(result.r)
                        : PP.quickHTML(result.r),
          result.it,
          { folded: defaultFolded() },
        ),
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
      }, '存为摘要长图')) : null,

    result ? h('div', { key: 'ask', className: 'mp-askbox' },
      h('input', {
        className: 'mp-input', value: askText, maxLength: 120,
        placeholder: '追问：如 2027 年事业怎么样（回车提交）',
        onChange: (e) => setAskText(e.target.value),
        onKeyDown: (e) => { if (e.key === 'Enter') doAsk(); },
      }),
      h('button', { className: 'mp-btn ghost', style: { fontSize: 12, padding: '5px 12px' }, onClick: doAsk }, '追问')) : null,

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

// 客户端插件绝不能因为自身异常拖垮应用启动：注册失败只记日志。
function safeApply(ctx) {
  try {
    const dispose = injectStyle(CSS + (PP && PP.CSS ? PP.CSS : ''));
    if (typeof ctx.effect === 'function' && typeof dispose === 'function') ctx.effect(() => dispose);
  } catch (e) {
    console.error('[metaphysics] 样式注入失败', e);
  }

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

  // 关键：槽位由外壳（ui-layout）声明，可能晚于本插件激活。
  // 用 slots.inject 等声明提交后再注册，直接 register 会抛 "slot is not declared"。
  const waitFor = (key, install) => {
    try {
      if (typeof slots.inject === 'function') {
        slots.inject(key, install);
      } else {
        install();
      }
    } catch (e) {
      console.error('[metaphysics] 等待槽位失败：' + key, e);
      try { install(); } catch (e2) { console.error('[metaphysics] 直接注册也失败：' + key, e2); }
    }
  };

  waitFor('sidebar.panellist', () => slots.register(
    { name: 'sidebar.panellist', id: 'metaphysics', order: 20, label: () => '命理' },
    PanelIcon,
  ));

  waitFor('main', () => slots.register({ name: 'main', key: 'metaphysics' }, App));
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







