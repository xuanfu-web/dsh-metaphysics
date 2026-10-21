// Client 半：命理排盘面板。由 build-client.mjs 注入 React / h / Engine / __PP。
const PP = window.__PP;
const CSS = `
.mp-wrap{height:100%;overflow:auto;padding:20px 24px 40px;color:var(--dsw-alias-label-primary);font-size:13px}
.mp-head{display:flex;gap:14px;align-items:flex-end;flex-wrap:wrap;margin-bottom:14px}
.mp-tabs{display:flex;gap:6px;margin-bottom:16px}
.mp-tab{padding:6px 16px;border-radius:999px;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;font-size:13px;transition:background .12s,color .12s}
.mp-tab:hover{background:var(--dsw-alias-bg-layer-2)}
.mp-tab.on{background:var(--dsw-alias-brand-primary);border-color:transparent;color:#fff}
.mp-field{display:flex;flex-direction:column;gap:5px;font-size:12px;color:var(--dsw-alias-label-secondary)}
.mp-input{background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-primary);border-radius:8px;padding:6px 10px;font-size:13px;outline:none;min-width:132px}
.mp-input:focus{border-color:var(--dsw-alias-brand-primary)}
.mp-btn{padding:7px 18px;border-radius:8px;border:none;background:var(--dsw-alias-brand-primary);color:#fff;cursor:pointer;font-size:13px}
.mp-btn.ghost{background:transparent;border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-secondary)}
.mp-card{margin-top:18px;padding:16px 18px;border-radius:14px;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1)}
.mp-flat{margin-top:16px;padding:0;border:none;background:transparent;border-radius:0}
.mp-dim{color:var(--dsw-alias-label-secondary)}
.mp-err{margin-top:16px;padding:10px 14px;border-radius:10px;background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 14%,transparent);color:var(--dsw-alias-state-error-primary)}
.mp-bz{display:grid;grid-template-columns:56px repeat(4,1fr);gap:6px 10px;align-items:center}
.mp-bz .lbl{font-size:12px;color:var(--dsw-alias-label-secondary)}
.mp-bz .big{font-size:22px;font-weight:600;line-height:1.3}
.mp-bz .cell{font-size:12px;line-height:1.5}
.mp-zv{display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,minmax(96px,auto));gap:6px}
.mp-zc{border:1px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-layer-2);padding:7px 8px;display:flex;flex-direction:column;gap:3px;min-height:96px}
.mp-zc.soul{border-color:var(--dsw-alias-brand-primary);box-shadow:inset 0 0 0 1px var(--dsw-alias-brand-primary)}
.mp-zc .ph{display:flex;justify-content:space-between;font-size:12px;font-weight:600}
.mp-zc .stars{font-size:11px;line-height:1.65;display:flex;flex-wrap:wrap;gap:0 5px}
.mp-zc .foot{font-size:10px;color:var(--dsw-alias-label-secondary);margin-top:auto}
.mp-center{grid-column:2/4;grid-row:2/4;border:1px solid var(--dsw-alias-border-l1);border-radius:12px;padding:12px;display:flex;flex-direction:column;gap:6px;justify-content:center;background:var(--dsw-alias-bg-base)}
.mp-tag{font-size:11px;padding:1px 6px;border-radius:5px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary)}
.mp-ly{display:flex;flex-direction:column;gap:4px;font-family:ui-monospace,Consolas,monospace;font-size:13px;line-height:1.7}
.mp-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.mp-chip{font-size:12px;padding:3px 9px;border-radius:7px;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1)}
`;

const { useState, useEffect } = React;

const BRANCH_POS = {
  巳: [1, 1], 午: [1, 2], 未: [1, 3], 申: [1, 4],
  辰: [2, 1], 酉: [2, 4],
  卯: [3, 1], 戌: [3, 4],
  寅: [4, 1], 丑: [4, 2], 子: [4, 3], 亥: [4, 4],
};

const MUT_COLOR = {
  禄: 'var(--dsw-alias-state-success-primary)',
  权: 'var(--dsw-alias-brand-primary)',
  科: 'var(--dsw-alias-state-warn-primary)',
  忌: 'var(--dsw-alias-state-error-primary)',
};

function starColor(type) {
  if (type === '煞星') return 'var(--dsw-alias-state-error-primary)';
  if (type === '吉星') return 'var(--dsw-alias-state-success-primary)';
  if (type === '主星') return 'var(--dsw-alias-label-primary)';
  return 'var(--dsw-alias-label-secondary)';
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

function BaziView({ r }) {
  const cols = [['year', '年柱'], ['month', '月柱'], ['day', '日柱'], ['hour', '时柱']];
  const rows = [];
  const push = (label, render) => {
    rows.push(h('div', { key: label, className: 'lbl' }, label));
    for (const [k] of cols) rows.push(h('div', { key: label + k, className: 'cell' }, render(r.pillars[k])));
  };
  push('十神', (p) => p.stemTenGod || '—');
  push('天干', (p) => h('span', { className: 'big' }, p.stem));
  push('地支', (p) => h('span', { className: 'big' }, p.branch));
  push('藏干', (p) => p.hidden.map((x) => `${x.stem}·${x.tenGod}`).join(' '));
  push('纳音', (p) => p.nayin);

  const wuxing = Object.entries(r.wuxing).map(([k, v]) =>
    h('div', { key: k, className: 'mp-chip' }, `${k} ${v}`));

  return h('div', null,
    h('div', { className: 'mp-chips', style: { marginTop: 0, marginBottom: 12 } },
      h('span', { className: 'mp-chip' }, `日主 ${r.dayMaster.stem}${r.dayMaster.element}（${r.dayMaster.yinYang}）`),
      h('span', { className: 'mp-chip' }, `空亡 ${r.kongwang.join('')}`),
      h('span', { className: 'mp-chip' }, `五行局 无`)),
    h('div', { className: 'mp-bz' }, rows),
    h('div', { className: 'mp-chips' }, wuxing),
    h('div', { className: 'mp-dim', style: { marginTop: 12, fontSize: 12 } },
      `真太阳时 ${r.solarTime.trueSolarText}　${r.solarTime.note}`),
    h('div', { className: 'mp-dim', style: { marginTop: 4, fontSize: 12 } },
      `上一节 ${r.jieqi.previous.name} ${r.jieqi.previous.time}　下一节 ${r.jieqi.next.name} ${r.jieqi.next.time}`),
    h('div', { style: { marginTop: 14, fontWeight: 600 } }, `${r.dayun.rule}　${r.dayun.startAge.years}岁${r.dayun.startAge.months}个月起运`),
    h('div', { className: 'mp-chips' }, r.dayun.list.map((d) =>
      h('span', { key: d.step, className: 'mp-chip' }, `${d.startAge} ${d.ganzhi} ${d.stemTenGod}`))));
}

function ZiweiView({ r }) {
  const cells = [];
  for (const p of r.palaces) {
    const pos = BRANCH_POS[p.branch] || [1, 1];
    const starNodes = [];
    for (const s of p.stars) {
      starNodes.push(h('span', { key: s.name, style: { color: starColor(s.type) } }, s.name));
      if (s.mutagen) {
        starNodes.push(h('span', { key: s.name + 'm', style: { color: MUT_COLOR[s.mutagen], fontSize: 10 } }, s.mutagen));
      }
    }
    cells.push(h('div', {
      key: p.branch,
      className: 'mp-zc' + (p.isSoul ? ' soul' : ''),
      style: { gridRow: pos[0], gridColumn: pos[1] },
    },
    h('div', { className: 'ph' },
      h('span', null, p.palace, p.isSoul ? ' 命' : '', p.isBody ? ' 身' : ''),
      h('span', { className: 'mp-dim', style: { fontWeight: 400 } }, p.branch + p.ganzhi)),
    h('div', { className: 'stars' }, starNodes.length ? starNodes : [h('span', { key: 'x', className: 'mp-dim' }, '—')]),
    h('div', { className: 'foot' },
      `大限 ${p.daxian.start}-${p.daxian.end} · 小限 ${p.xiaoxian.age}`)));
  }

  const center = h('div', { key: 'center', className: 'mp-center' },
    h('div', { style: { fontSize: 15, fontWeight: 600 } }, `${r.lunar.year}年${r.lunar.isLeap ? '闰' : ''}${r.lunar.month}月${r.lunar.day}日 · ${r.hourBranch}时`),
    h('div', { className: 'mp-dim' }, `${r.yearGanzhi}年　命宫 ${r.soul.branch}　身宫 ${r.body.branch}`),
    h('div', { className: 'mp-dim' }, `${r.bureau.name}　紫微 ${r.ziwei}　天府 ${r.tianfu}`),
    h('div', { className: 'mp-dim' }, `命主 ${r.lifeMaster}　身主 ${r.bodyMaster}`),
    h('div', { className: 'mp-dim' }, `${r.daxian.rule}，${r.daxian.startAge}岁起`));

  const patterns = (r.patterns || []).map((p) => h('span', { key: p.name, className: 'mp-chip' }, `${p.name}`));

  const cq = r.changqu;
  const cqChips = cq ? h('div', { className: 'mp-chips' },
    h('span', { key: 'wc', className: 'mp-chip' }, `文昌 ${cq.wenchang.branch}（${cq.wenchang.palace}${cq.wenchang.mutagen ? '·化' + cq.wenchang.mutagen : ''}）`),
    h('span', { key: 'wq', className: 'mp-chip' }, `文曲 ${cq.wenqu.branch}（${cq.wenqu.palace}${cq.wenqu.mutagen ? '·化' + cq.wenqu.mutagen : ''}）`),
    h('span', { key: 'rel', className: 'mp-chip' }, cq.relation),
    h('span', { key: 'sf', className: 'mp-chip' }, `入命三方 ${cq.inSoulSanfang ? '是' : '否'}`),
    h('span', {
      key: 'tone',
      className: 'mp-chip',
      style: { color: cq.absorb.label === '杂' ? 'var(--dsw-alias-state-warn-primary)' : 'var(--dsw-alias-state-success-primary)' },
    }, `吸收·${cq.absorb.label}`)) : null;

  return h('div', null,
    h('div', { className: 'mp-zv' }, [...cells, center]),
    cqChips,
    h('div', { className: 'mp-chips' }, patterns.length ? patterns : [h('span', { key: 'n', className: 'mp-dim' }, '无明显格局')]));
}

function LiuyaoView({ r }) {
  const line = (l) => h('div', { key: l.position, style: { display: 'flex', gap: 10, alignItems: 'center' } },
    h('span', { className: 'mp-dim', style: { width: 34 } }, l.name),
    h('span', { style: { width: 26, color: l.moving ? 'var(--dsw-alias-state-warn-primary)' : 'inherit' } },
      l.position === r.ben.shi ? '世' : l.position === r.ben.ying ? '应' : ''),
    h('span', { style: { fontFamily: 'monospace', width: 52, color: l.yinYang === '阳' ? 'var(--dsw-alias-label-primary)' : 'var(--dsw-alias-label-secondary)' } }, l.symbol),
    h('span', { style: { width: 62 } }, l.ganzhi),
    h('span', { style: { width: 56 } }, l.liuqin),
    h('span', { className: 'mp-dim', style: { width: 42 } }, l.liushen),
    l.moving ? h('span', { style: { color: 'var(--dsw-alias-state-warn-primary)', fontSize: 11 } }, '动') : null);

  const bian = r.bian ? h('div', { style: { marginTop: 14 } },
    h('div', { style: { fontWeight: 600, marginBottom: 6 } }, `变卦 ${r.bian.name}（${r.bian.palace}·${r.bian.palaceElement}）`),
    h('div', { className: 'mp-ly' }, r.bian.lines.slice().reverse().map(line))) : h('div', { className: 'mp-dim', style: { marginTop: 10 } }, '六爻安静，无变卦');

  return h('div', null,
    h('div', { className: 'mp-dim', style: { marginBottom: 10 } },
      `起卦：${r.cast.notation.join('、')}（自下而上）　日辰 ${r.dayGanZhi.name}`),
    h('div', { style: { fontWeight: 600, marginBottom: 6 } }, `本卦 ${r.ben.name}（${r.ben.palace}·${r.ben.palaceElement}）`),
    h('div', { className: 'mp-ly' }, r.ben.lines.slice().reverse().map(line)),
    bian);
}

function App() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
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

  const run = async (kind) => {
    try {
      const datetime = `${date}T${time}`;
      const args = kind === 'tarot' ? { system: kind } : { system: kind, datetime };
      if (kind !== 'liuyao' && kind !== 'tarot') args.gender = gender;
      if (kind === 'bazi' || kind === 'ziwei') {
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
      if (kind === 'liuyao') {
        const parsed = lines.split(/[^0-9]+/).filter(Boolean).map(Number);
        if (parsed.length === 6) args.lines = parsed;
        args.question = '手动起卦';
      }
      if (kind === 'tarot') {
        args.count = Number(count);
        if (question.trim()) args.question = question.trim();
      }
      if (kind === 'meihua') args.mode = 'time';
      const r = Engine.compute(args);
      setResult({ kind, r });
      setError('');
    } catch (e) {
      setError(e && e.message ? e.message : String(e));
      setResult(null);
    }
  };

  const field = (label, node) => h('label', { className: 'mp-field' }, label, node);
  const tabs = [['ziwei', '紫微'], ['bazi', '八字'], ['liuyao', '六爻'], ['meihua', '梅花'], ['daliuren', '六壬'], ['tarot', '塔罗']];

  useEffect(() => { run('ziwei'); }, []);

  const children = [
    h('div', { key: 'tabs', className: 'mp-tabs' }, tabs.map(([k, label]) =>
      h('button', {
        key: k,
        className: 'mp-tab' + (tab === k ? ' on' : ''),
        onClick: () => { setTab(k); setError(''); },
      }, label))),

    h('div', { key: 'head', className: 'mp-head' },
      tab !== 'tarot' ? field('公历日期', h('input', { className: 'mp-input', type: 'date', value: date, onChange: (e) => setDate(e.target.value) })) : null,
      tab !== 'tarot' ? field('时间', h('input', { className: 'mp-input', type: 'time', value: time, onChange: (e) => setTime(e.target.value) })) : null,
      tab !== 'liuyao' && tab !== 'tarot' ? field('性别', h('select', {
        className: 'mp-input', value: gender, onChange: (e) => setGender(e.target.value),
      }, h('option', { value: 'female' }, '女'), h('option', { value: 'male' }, '男'))) : null,
      (tab === 'bazi' || tab === 'ziwei') ? field('出生地（省/市即可）', h('input', {
        className: 'mp-input', style: { minWidth: 200 }, placeholder: '如 河北石家庄 / 成都', value: address,
        onChange: (e) => setAddress(e.target.value),
      })) : null,
      (tab === 'bazi' || tab === 'ziwei') ? h('label', { key: 'ts', className: 'mp-field', style: { flexDirection: 'row', alignItems: 'center', gap: 6 } },
        h('input', { type: 'checkbox', checked: trueSolar, onChange: (e) => setTrueSolar(e.target.checked) }), '真太阳时') : null,
      (tab === 'bazi' || tab === 'ziwei') ? h('label', { key: 'og', className: 'mp-field', style: { flexDirection: 'row', alignItems: 'center', gap: 6 }, title: '开启后会请求 OpenStreetMap，把区县/村落到更精确的坐标' },
        h('input', { type: 'checkbox', checked: onlineGeo, onChange: (e) => setOnlineGeo(e.target.checked) }), '联网精确到区县') : null,
      tab === 'liuyao' ? field('六爻（可空，空则随机）', h('input', {
        className: 'mp-input', placeholder: '9 7 8 8 7 6', value: lines,
        onChange: (e) => setLines(e.target.value),
      })) : null,
      tab === 'tarot' ? field('提问（可空）', h('input', {
        className: 'mp-input', style: { minWidth: 260 }, value: question,
        placeholder: '例如：这份工作要不要接？',
        onChange: (e) => setQuestion(e.target.value),
      })) : null,
      tab === 'tarot' ? field('张数', h('select', {
        className: 'mp-input', value: count, onChange: (e) => setCount(e.target.value),
      }, h('option', { value: '1' }, '1 张 · 指引'), h('option', { value: '3' }, '3 张 · 过去现在未来'), h('option', { value: '5' }, '5 张 · 十字牌阵'))) : null,
      h('button', { key: 'go', className: 'mp-btn', onClick: () => run(tab) },
        tab === 'liuyao' || tab === 'meihua' ? '起卦' : tab === 'tarot' ? '抽牌' : '排盘')),

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

    (!result && !error) ? h('div', { key: 'hint', className: 'mp-dim', style: { marginTop: 24, fontSize: 12 } },
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
