// Client 半：命理排盘面板。由 build-client.mjs 注入 React / h / Engine / __PP。
const PP = window.__PP;
const CSS = `
.mp-wrap{height:100%;overflow:auto;padding:20px 24px 40px;color:var(--dsw-alias-label-primary);font-size:14px}
.mp-head{display:flex;gap:14px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px}
.mp-tabs{display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap}
.mp-tab{padding:7px 17px;border-radius:999px;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;font-size:14px;transition:background .12s,color .12s}
.mp-tab:hover{background:var(--dsw-alias-bg-layer-2)}
.mp-tab.on{background:var(--dsw-alias-brand-primary);border-color:transparent;color:#fff}
.mp-field{display:flex;flex-direction:column;gap:5px;font-size:13px;color:var(--dsw-alias-label-secondary)}
.mp-input{background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-primary);border-radius:8px;padding:7px 11px;font-size:14px;outline:none;min-width:132px}
.mp-input:focus{border-color:var(--dsw-alias-brand-primary)}
/* 所问之事：多行文本，视觉与其他输入框一致 */
.mp-textarea{background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-primary);border-radius:8px;padding:7px 11px;font-size:14px;outline:none;width:100%;min-width:180px;resize:vertical;line-height:1.5;font-family:inherit}
.mp-textarea:focus{border-color:var(--dsw-alias-brand-primary)}
.mp-textarea.invalid{border-color:var(--dsw-alias-state-error-primary)}
.mp-ask{flex:1 1 240px;min-width:0}
.mp-dir{min-width:104px}
.mp-btn{padding:8px 20px;border-radius:8px;border:none;background:var(--dsw-alias-brand-primary);color:#fff;cursor:pointer;font-size:14px}
.mp-btn.ghost{background:transparent;border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-secondary)}
.mp-seg{display:inline-flex;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;overflow:hidden}
.mp-seg button{padding:6px 13px;background:transparent;border:none;color:var(--dsw-alias-label-secondary);font-size:13px;cursor:pointer}
.mp-seg button.on{background:var(--dsw-alias-brand-primary);color:#fff}
.mp-hint{font-size:12.5px;color:var(--dsw-alias-label-secondary);line-height:1.7;margin:0 0 14px;padding-left:2px}
.mp-card{margin-top:18px;padding:16px 18px;border-radius:14px;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1)}
.mp-flat{margin-top:16px;padding:0;border:none;background:transparent;border-radius:0}
.mp-dim{color:var(--dsw-alias-label-secondary)}
.mp-err{margin-top:16px;padding:10px 14px;border-radius:10px;background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 14%,transparent);color:var(--dsw-alias-state-error-primary)}
.mp-bar{display:flex;gap:8px;align-items:center;margin-top:14px}
/* 起卦类 tab 的「已自动取当前时刻」提示（.mp-hint 的补充行，不额外占横向空间） */
.mp-auto{margin:-8px 0 14px;padding-left:2px;font-size:12.5px;line-height:1.7;color:var(--dsw-alias-label-secondary)}
/* 结果头部的「起卦时刻」一行 */
.mp-cast{margin:0 0 14px;padding-left:2px;font-size:12.5px;line-height:1.7;color:var(--dsw-alias-label-secondary)}
.mp-cast b{color:var(--dsw-alias-label-primary);font-weight:600}
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
  { k: 'tarot', label: '塔罗', timeLabel: '', hint: '塔罗不看时间，只记录抽牌时刻与你的提问。' },
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
  ziwei: 'birth', bazi: 'birth',
  liuyao: 'cast', meihua: 'cast', daliuren: 'cast',
  tarot: 'none',
};
const SAMPLE = { date: '1990-05-12', time: '14:30' };
const kindOf = (t) => TIME_KIND[t] || 'none';

// 问事的体系（六爻 / 梅花 / 六壬 / 塔罗）必须填「所问之事」；命盘类不问事
const NEED_ASK = { liuyao: true, meihua: true, daliuren: true, tarot: true };
const needAsk = (t) => !!NEED_ASK[t];

function App() {
  const [tab, setTab] = useState('ziwei');
  const [date, setDate] = useState('1990-05-12');
  const [time, setTime] = useState('14:30');
  const [gender, setGender] = useState('female');
  const [address, setAddress] = useState('');
  const [trueSolar, setTrueSolar] = useState(true);
  const [onlineGeo, setOnlineGeo] = useState(false);
  const [lines, setLines] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
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
  const isBirth = tab === 'bazi' || tab === 'ziwei';
  const timeKind = kindOf(tab);
  const usesTimeInput = !(tab === 'meihua' && mhMode === 'number');
  const showDT = tab !== 'tarot' && usesTimeInput;

  const run = async (kind, override, modeOverride) => {
    const k = kind || tab;
    const mh = modeOverride || mhMode;
    const dt = override ? override : { date, time };
    try {
      const datetime = `${dt.date}T${dt.time}`;
      const args = { system: k };
      if (k !== 'tarot') args.datetime = datetime;
      if (k === 'bazi' || k === 'ziwei') {
        args.gender = gender;
        args.trueSolar = trueSolar;
        if (address.trim()) {
          args.address = address.trim();
          try {
            const g = await Engine.geocodeAddress(args.address, { online: onlineGeo });
            if (g && typeof g.lon === 'number') { args.longitude = g.lon; args.geo = g; }
          } catch (e) {
            console.error('[metaphysics] 地址解析失败，退回内置表', e);
          }
        }
      }
      if (k === 'liuyao') {
        const parsed = lines.split(/[^0-9]+/).filter(Boolean).map(Number);
        if (parsed.length === 6) args.lines = parsed;
      }
      if (k === 'tarot') args.count = Number(count);
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
          args.upper = Number(upper);
          args.lower = Number(lower);
          if (changing !== '') args.changing = Number(changing);
        }
      }
      const r = Engine.compute(args);
      // 问题与方向一并与卦象交给解读：解读按它展开，并在开头回显供确认
      const it = Engine.interpret
        ? Engine.interpret(r, needAsk(k) ? { question: question.trim(), direction } : undefined)
        : null;
      // timed：这次结果是否真的用到了「起卦时刻」（梅花数字起卦不用）
      const timed = kindOf(k) === 'cast' && (k !== 'meihua' || mh === 'time');
      setResult({ kind: k, r, it, at: dt, timed });
      setError('');
      setCopied('');
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

  /** 切起卦方式（时间/数字）：立刻重起一卦，避免结果头部留着上一模式的「起卦时刻」 */
  const switchMode = (m) => {
    setMhMode(m);
    run(tab, { date, time }, m);
  };

  const isNarrow = () => !!(window.matchMedia && window.matchMedia('(max-width: 640px)').matches);
  const defaultFolded = () => (foldPref === null ? isNarrow() : foldPref);

  /** 解析模块折叠：标题栏整栏可点（内容由 innerHTML 渲染，用委托处理） */
  const onFoldClick = (e) => {
    const head = e.target && e.target.closest ? e.target.closest('.it-head') : null;
    if (!head) return;
    const box = head.closest('.it');
    if (!box) return;
    const folded = !box.classList.contains('folded');
    box.classList.toggle('folded', folded);
    head.setAttribute('aria-expanded', folded ? 'false' : 'true');
    const hint = head.querySelector('.it-hint');
    if (hint) hint.textContent = folded ? '点击展开' : '点击收起';
    setFoldPref(folded);
  };

  /** 改问题或方向：拿缓存的卦象重出解读，不重摇一卦 */
  const refreshInterpret = (dir, q) => {
    if (!result || !needAsk(tab)) return;
    const ask = { question: (q === undefined ? question : q).trim(), direction: dir === undefined ? direction : dir };
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

  const field = (label, node) => h('label', { className: 'mp-field' }, label, node);

  useEffect(() => { run('ziwei'); }, []);

  const children = [
    h('div', { key: 'tabs', className: 'mp-tabs' }, TABS.map((t) =>
      h('button', {
        key: t.k,
        className: 'mp-tab' + (tab === t.k ? ' on' : ''),
        onClick: () => switchTo(t.k),
      }, t.label))),

    h('div', { key: 'head', className: 'mp-head' },
      showDT ? field(isBirth ? '出生日期（公历）' : '起卦日期（公历）',
        h('input', { className: 'mp-input', type: 'date', value: date, onChange: (e) => editDate(e.target.value) })) : null,
      showDT ? field(isBirth ? '出生时刻' : '起卦时刻',
        h('input', { className: 'mp-input', type: 'time', value: time, onChange: (e) => editTime(e.target.value) })) : null,
      isBirth ? field('性别', h('select', {
        className: 'mp-input', value: gender, onChange: (e) => setGender(e.target.value),
      }, h('option', { value: 'female' }, '女'), h('option', { value: 'male' }, '男'))) : null,
      isBirth ? field('出生地（省/市即可）', h('input', {
        className: 'mp-input', style: { minWidth: 200 }, placeholder: '如 河北石家庄 / 成都', value: address,
        onChange: (e) => setAddress(e.target.value),
      })) : null,
      isBirth ? h('label', { key: 'ts', className: 'mp-field', style: { flexDirection: 'row', alignItems: 'center', gap: 6 } },
        h('input', { type: 'checkbox', checked: trueSolar, onChange: (e) => setTrueSolar(e.target.checked) }), '真太阳时') : null,
      isBirth ? h('label', { key: 'og', className: 'mp-field', style: { flexDirection: 'row', alignItems: 'center', gap: 6 }, title: '开启后会请求 OpenStreetMap，把区县/村落到更精确的坐标' },
        h('input', { type: 'checkbox', checked: onlineGeo, onChange: (e) => setOnlineGeo(e.target.checked) }), '联网精确到区县') : null,
      tab === 'liuyao' ? field('六爻（可空，空则随机）', h('input', {
        className: 'mp-input', placeholder: '9 7 8 8 7 6', value: lines,
        onChange: (e) => setLines(e.target.value),
      })) : null,
      tab === 'meihua' ? field('起卦方式', h('div', { className: 'mp-seg' },
        h('button', { className: mhMode === 'time' ? 'on' : '', onClick: () => switchMode('time') }, '时间起卦'),
        h('button', { className: mhMode === 'number' ? 'on' : '', onClick: () => switchMode('number') }, '数字起卦'))) : null,
      (tab === 'meihua' && mhMode === 'number') ? field('第一个数', h('input', {
        className: 'mp-input', style: { minWidth: 88 }, value: upper, placeholder: '如 17',
        onChange: (e) => setUpper(e.target.value),
      })) : null,
      (tab === 'meihua' && mhMode === 'number') ? field('第二个数', h('input', {
        className: 'mp-input', style: { minWidth: 88 }, value: lower, placeholder: '如 29',
        onChange: (e) => setLower(e.target.value),
      })) : null,
      (tab === 'meihua' && mhMode === 'number') ? field('动爻（可空）', h('input', {
        className: 'mp-input', style: { minWidth: 88 }, value: changing, placeholder: '1-6',
        onChange: (e) => setChanging(e.target.value),
      })) : null,
      // 所问之事 + 询问方向：问事的体系共用，问题必填，两者都会交给下方解读
      needAsk(tab) ? field('所问之事（必填）', h('textarea', {
        className: 'mp-textarea' + (askInvalid ? ' invalid' : ''),
        rows: 2, value: question,
        placeholder: '用一句话描述所问之事，例如：今年是否适合换工作？',
        onChange: (e) => { setQuestion(e.target.value); setAskInvalid(false); },
        onBlur: (e) => refreshInterpret(undefined, e.target.value),
      })) : null,
      needAsk(tab) ? field('询问方向', h('select', {
        className: 'mp-input mp-dir', value: direction,
        onChange: (e) => { setDirection(e.target.value); refreshInterpret(e.target.value); },
      }, (Engine.DIRECTIONS || []).map((d) => h('option', { key: d.key, value: d.key }, d.label)))) : null,
      tab === 'tarot' ? field('张数', h('select', {
        className: 'mp-input', value: count, onChange: (e) => setCount(e.target.value),
      }, h('option', { value: '1' }, '1 张 · 指引'), h('option', { value: '3' }, '3 张 · 过去现在未来'), h('option', { value: '5' }, '5 张 · 十字牌阵'))) : null,
      tab !== 'tarot' ? h('button', {
        key: 'now', className: 'mp-btn ghost', style: { padding: '7px 14px' }, title: '把时间换成此刻并立即起卦',
        onClick: runNow,
      }, '此刻') : null,
      h('button', { key: 'go', className: 'mp-btn', onClick: () => run(tab) },
        tab === 'tarot' ? '抽牌' : tab === 'bazi' || tab === 'ziwei' ? '排盘' : '起卦')),

    h('div', { key: 'hint', className: 'mp-hint' }, meta.hint),

    (timeKind === 'cast' && usesTimeInput) ? h('div', { key: 'auto', className: 'mp-auto' },
      // 文案分清「自动取的」和「你手动填的」，免得明明改过还说自动取
      manual.cast
        ? `起卦时刻现在用的是你手动填的（${time}）；点「此刻」可回到自动取当下。`
        : `起卦时刻已自动取你的本机时间（${time}）；想用别的时刻可以直接改，或点「此刻」重新取当下。`) : null,

    error ? h('div', { key: 'err', className: 'mp-err' }, error) : null,

    result ? h('div', {
      key: 'card',
      className: 'mp-card mp-flat',
      onClick: onFoldClick,
      dangerouslySetInnerHTML: {
        __html: castAtHTML(result) + PP.resultWithInterpret(
          result.kind === 'ziwei' ? PP.ziweiHTML(result.r)
            : result.kind === 'bazi' ? PP.baziHTML(result.r)
              : result.kind === 'meihua' ? PP.meihuaHTML(result.r)
                : result.kind === 'daliuren' ? PP.daliurenHTML(result.r)
                  : result.kind === 'tarot' ? PP.tarotHTML(result.r)
                    : PP.liuyaoHTML(result.r),
          result.it,
          { folded: defaultFolded() },
        ),
      },
    }) : null,

    result ? h('div', { key: 'bar', className: 'mp-bar' },
      h('button', { className: 'mp-btn ghost', style: { fontSize: 12, padding: '5px 12px' }, onClick: copyResult },
        copied || '复制文字结果')) : null,

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
