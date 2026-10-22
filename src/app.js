// Client 半：命理排盘面板。由 build-client.mjs 注入 React / h / Engine / __PP。
const PP = window.__PP;
const CSS = `
.mp-wrap{height:100%;overflow:auto;padding:20px 24px 40px;color:var(--dsw-alias-label-primary);font-size:13px}
.mp-head{display:flex;gap:14px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px}
.mp-tabs{display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap}
.mp-tab{padding:6px 16px;border-radius:999px;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;font-size:13px;transition:background .12s,color .12s}
.mp-tab:hover{background:var(--dsw-alias-bg-layer-2)}
.mp-tab.on{background:var(--dsw-alias-brand-primary);border-color:transparent;color:#fff}
.mp-field{display:flex;flex-direction:column;gap:5px;font-size:12px;color:var(--dsw-alias-label-secondary)}
.mp-input{background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-primary);border-radius:8px;padding:6px 10px;font-size:13px;outline:none;min-width:132px}
.mp-input:focus{border-color:var(--dsw-alias-brand-primary)}
.mp-btn{padding:7px 18px;border-radius:8px;border:none;background:var(--dsw-alias-brand-primary);color:#fff;cursor:pointer;font-size:13px}
.mp-btn.ghost{background:transparent;border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-secondary)}
.mp-seg{display:inline-flex;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;overflow:hidden}
.mp-seg button{padding:5px 12px;background:transparent;border:none;color:var(--dsw-alias-label-secondary);font-size:12px;cursor:pointer}
.mp-seg button.on{background:var(--dsw-alias-brand-primary);color:#fff}
.mp-hint{font-size:11.5px;color:var(--dsw-alias-label-secondary);line-height:1.7;margin:0 0 14px;padding-left:2px}
.mp-card{margin-top:18px;padding:16px 18px;border-radius:14px;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1)}
.mp-flat{margin-top:16px;padding:0;border:none;background:transparent;border-radius:0}
.mp-dim{color:var(--dsw-alias-label-secondary)}
.mp-err{margin-top:16px;padding:10px 14px;border-radius:10px;background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 14%,transparent);color:var(--dsw-alias-state-error-primary)}
.mp-bar{display:flex;gap:8px;align-items:center;margin-top:14px}
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
  const [mhMode, setMhMode] = useState('time');
  const [upper, setUpper] = useState('');
  const [lower, setLower] = useState('');
  const [changing, setChanging] = useState('');
  const [copied, setCopied] = useState('');

  const meta = TABS.find((t) => t.k === tab) || TABS[0];
  const isBirth = tab === 'bazi' || tab === 'ziwei';

  const run = async (kind, override) => {
    const k = kind || tab;
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
        args.question = '手动起卦';
      }
      if (k === 'tarot') {
        args.count = Number(count);
        if (question.trim()) args.question = question.trim();
      }
      if (k === 'meihua') {
        args.mode = mhMode;
        if (mhMode === 'number') {
          args.upper = Number(upper);
          args.lower = Number(lower);
          if (changing !== '') args.changing = Number(changing);
        }
      }
      const r = Engine.compute(args);
      setResult({ kind: k, r });
      setError('');
      setCopied('');
    } catch (e) {
      setError(e && e.message ? e.message : String(e));
      setResult(null);
    }
  };

  const runNow = () => {
    const t = nowParts();
    setDate(t.date);
    setTime(t.time);
    run(tab, t);
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
        onClick: () => { setTab(t.k); setError(''); },
      }, t.label))),

    h('div', { key: 'head', className: 'mp-head' },
      tab !== 'tarot' ? field(isBirth ? '出生日期（公历）' : '起卦日期（公历）',
        h('input', { className: 'mp-input', type: 'date', value: date, onChange: (e) => setDate(e.target.value) })) : null,
      tab !== 'tarot' ? field(isBirth ? '出生时刻' : '起卦时刻',
        h('input', { className: 'mp-input', type: 'time', value: time, onChange: (e) => setTime(e.target.value) })) : null,
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
        h('button', { className: mhMode === 'time' ? 'on' : '', onClick: () => setMhMode('time') }, '时间起卦'),
        h('button', { className: mhMode === 'number' ? 'on' : '', onClick: () => setMhMode('number') }, '数字起卦'))) : null,
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
      tab === 'tarot' ? field('提问（可空）', h('input', {
        className: 'mp-input', style: { minWidth: 260 }, value: question,
        placeholder: '例如：这份工作要不要接？',
        onChange: (e) => setQuestion(e.target.value),
      })) : null,
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

    error ? h('div', { key: 'err', className: 'mp-err' }, error) : null,

    result ? h('div', {
      key: 'card',
      className: 'mp-card mp-flat',
      dangerouslySetInnerHTML: {
        __html: result.kind === 'ziwei' ? PP.ziweiHTML(result.r)
          : result.kind === 'bazi' ? PP.baziHTML(result.r)
            : result.kind === 'meihua' ? PP.meihuaHTML(result.r)
              : result.kind === 'daliuren' ? PP.daliurenHTML(result.r)
                : result.kind === 'tarot' ? PP.tarotHTML(result.r)
                  : PP.liuyaoHTML(result.r),
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
