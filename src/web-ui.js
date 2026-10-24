(function () {
  const TYPE_CLASS = { 主星: 'main', 吉星: 'good', 煞星: 'bad', 辅星: 'aux', 杂曜: 'aux' };
  const MUT_CLASS = { 禄: 'm-lu', 权: 'm-quan', 科: 'm-ke', 忌: 'm-ji' };
  let tab = 'ziwei';
  let mhMode = 'time';

  const el = (id) => document.getElementById(id);
  const pad = (n) => String(n).padStart(2, '0');

  // ── 时间语义分类 ────────────────────────────────────────────────
  // birth：八字 / 紫微 —— 要的是「出生时间」，必然是过去，用示例默认，不取当前时刻
  // cast ：六爻 / 梅花 / 大六壬 —— 要的是「起卦时刻」，占的就是当下，自动取本机当前时刻
  // none ：塔罗 —— 不看时间，日期时间字段整个隐藏
  const TIME_KIND = {
    ziwei: 'birth', bazi: 'birth', hepan: 'birth',
    liuyao: 'cast', meihua: 'cast', daliuren: 'cast', qimen: 'cast',
    tarot: 'none',
  };
  const SAMPLE = { date: '1990-05-12', time: '14:30' };
  const kindOf = (t) => TIME_KIND[t] || 'none';
  const isBirthTab = (t) => kindOf(t) === 'birth';

  // 用户手动改过的日期/时刻，按语义分类分别记忆；null = 没改过，跟随自动值。
  // 分两类记的原因：出生时间与起卦时刻语义不同，跨类别时上一次的输入已无意义，
  // 所以从「八字」切到「六爻」会自动换成当前时刻，而切回「八字」仍是你填的出生时间。
  const manual = { birth: null, cast: null };
  // 程序最近一次自动填入的值，用来判断用户是否手动动过（程序填值不会触发 change/input）
  let autoDate = '';
  let autoTime = '';
  // 上一次填值所处的语义分类。只有「前后同类」时值对不上才算用户手动改过，
  // 否则跨类别切换（八字→六爻）会把命盘类填的出生时间误判成起卦时刻的手动值。
  let ctxKind = '';

  const TIPS = {
    ziwei: '紫微斗数需要出生日期、时刻与性别；出生地只影响真太阳时修正。',
    bazi: '四柱八字按节气与真太阳时定时柱，出生地越准，时柱越稳。',
    liuyao: '六爻不需要出生时间：只用起卦当下的日辰定六神、月建定旺衰，卦由摇出。',
    meihua: '梅花用起卦时刻的年月日时数成卦，也可直接给两个数字起卦；与出生时间无关。',
    daliuren: '大六壬用起卦时刻的日干支、时支与月将起天地盘；同样与出生时间无关。',
    qimen: '奇门时家转盘：用起局时刻定节气、三元与局数；「换局规则」决定符头与节气如何对齐。',
    hepan: '合盘按「日主 + 夫妻宫 + 五行互补」看两个人的相处与互补，需要双方出生信息。',
    tarot: '塔罗不看时间，只记录抽牌时刻与你的提问。',
  };

  // 问事的体系必须写清「所问之事」，解读才有落点；命盘类（八字/紫微）不问事，不显示这两项
  // 表单规则与宿主面板共用一份（src/core.js，由构建注入 window.__MPCore）
  const Core = window.__MPCore || {};
  const needAsk = Core.needAsk || (() => false);
  const ASK_PLACEHOLDER = '用一句话描述所问之事，例如：今年是否适合换工作？';

  /** 本次要交给解读的「问题 + 方向」；命盘类不传。奇门不问事，但方向决定取哪门作用神 */
  function askArgs() {
    if (tab === 'qimen') return { question: '', direction: el('qdir').value };
    if (!needAsk(tab)) return undefined;
    return { question: el('question').value.trim(), direction: el('direction').value };
  }

  /** 必填校验的视觉反馈：边框转红，提示文案与 .err 同一口径 */
  function markAskInvalid(on) {
    const box = el('ask-wrap');
    if (box) box.classList.toggle('invalid', !!on);
  }

  // 解析模块较长（五维度 + 体系模块）：竖屏默认收起，桌面默认展开；用户手动切过就以他的选择为准
  let foldPref = null;
  const isNarrow = () => !!(window.matchMedia && window.matchMedia('(max-width: 640px)').matches);
  const defaultFolded = () => (foldPref === null ? isNarrow() : foldPref);

  /** 本机当前时刻（本地时区，不需要任何权限或联网） */
  function nowParts() {
    const d = new Date();
    return {
      date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
      time: `${pad(d.getHours())}:${pad(d.getMinutes())}`,
    };
  }

  /** 某类时间的自动默认值：起卦类 = 当前时刻；命盘类 = 示例默认 */
  function defaultFor(k) {
    return k === 'cast' ? nowParts() : { date: SAMPLE.date, time: SAMPLE.time };
  }

  /** 程序填值：写入 input 并记下「这是程序填的」，不置手动标记 */
  function fillDateTime(v) {
    el('date').value = v.date;
    el('time').value = v.time;
    autoDate = v.date;
    autoTime = v.time;
  }

  /** 切 tab 时决定日期/时刻：用户在这类下改过就保留，否则按语义自动填 */
  function applyDateTime(k) {
    if (k === 'none') return;
    const cur = { date: el('date').value, time: el('time').value };
    if (k === ctxKind && (cur.date !== autoDate || cur.time !== autoTime)) manual[k] = cur;
    fillDateTime(manual[k] || defaultFor(k));
  }

  /** 当前 tab 是否真的用到日期/时刻（梅花「数字起卦」不用） */
  function usesTimeInput() {
    return !(tab === 'meihua' && mhMode === 'number');
  }

  /** 用户手动改了日期或时刻 */
  function onManualEdit() {
    const k = kindOf(tab);
    if (k === 'none') return;
    manual[k] = { date: el('date').value, time: el('time').value };
    renderTip();
  }

  /** 结果头部的一行「起卦时刻」，只在真正用到时间的起卦 tab 显示 */
  function castAtHTML(k, timed, date, time) {
    if (!timed) return '';
    const d = /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : '';
    const t = /^\d{2}:\d{2}(:\d{2})?$/.test(time) ? time.slice(0, 5) : '';
    if (!d || !t) return '';
    return `<div class="cast-at">起卦时刻：<b>${d} ${t}</b>　<span>（来自本机时间，点「此刻」可重新取当下）</span></div>`;
  }

  // 上一次的卦象：改「所问之事 / 询问方向」时用它重出解读，不重摇一卦
  let last = null;

  /** 用缓存的卦象重新渲染：解读按当前的问题与方向重出，卦面本身不动 */
  function paint() {
    if (!last) return;
    let it = null;
    try {
      it = window.Engine.interpret ? window.Engine.interpret(last.r, askArgs()) : (last.r.interpret || null);
    } catch (e) { it = null; }
    el('out').innerHTML = castAtHTML(last.tab, last.timed, last.date, last.time)
      + window.__PP.resultWithInterpret(last.html, it, { folded: defaultFolded() })
      + exportBar();
  }

  // 导出：走浏览器自带打印 → 另存为 PDF。不引第三方库，盘面是纯 DOM+CSS，打印保真度够。
  // 打印样式在 build-html.mjs 的 @media print 里（隐藏输入区与按钮，只留抬头与结果）。
  function exportBar() {
    return `<div class="exp no-print">
      <button type="button" data-act="pdf">存为 PDF</button>
      <button type="button" data-act="print">打印</button>
      <span class="hint">在打印对话框里选「另存为 PDF」，纸张 A4 纵向</span>
    </div>`;
  }

  function onExportClick(e) {
    const b = e.target && e.target.closest ? e.target.closest('.exp [data-act]') : null;
    if (!b) return;
    window.print();
  }

  async function run() {
    const date = el('date').value;
    const time = el('time').value;
    let lineWarn = '';
    const timed = kindOf(tab) === 'cast' && usesTimeInput();
    // 所问之事必填：不给一份没有落点的解读
    if (needAsk(tab) && !el('question').value.trim()) {
      markAskInvalid(true);
      last = null;
      el('out').innerHTML = '<div class="err">请先填写「所问之事」——一句话即可，例如：今年是否适合换工作？</div>';
      return;
    }
    markAskInvalid(false);
    const args = { system: tab };
    if (tab !== 'tarot') args.datetime = `${date}T${time}`;
    if (tab === 'bazi' || tab === 'ziwei' || tab === 'hepan') {
      // 合盘主方同样要性别与出生地：引擎里合盘的性别是必填，地址决定真太阳时
      args.gender = el('gender').value;
      args.trueSolar = el('ts').checked;
      const addr = el('addr').value.trim();
      if (addr) {
        args.address = addr;
        el('out').innerHTML = '<div class="note">正在解析地址…</div>';
        try {
          const g = await window.Engine.geocodeAddress(addr, { online: el('online').checked });
          if (g && typeof g.lon === 'number') { args.longitude = g.lon; args.geo = g; }
        } catch (e) { /* 退回内置表 */ }
      }
    }
    if (tab === 'hepan') {
      const chartBtn = document.querySelector('#hpchart .on');
      args.chart = chartBtn && chartBtn.dataset.chart === 'ziwei' ? 'ziwei' : 'bazi';
      args.partner = {
        datetime: `${el('pdate').value}T${el('ptime').value}`,
        gender: el('pgender').value,
        address: el('paddr').value.trim() || undefined,
        trueSolar: el('ts').checked,
      };
    }
    if (tab === 'qimen') {
      const picked = document.querySelector('input[name="qimen_rule"]:checked');
      args.juMethod = picked ? picked.value : 'chaibu';
    }
    if (tab === 'liuyao') {
      const parsed = Core.parseLines(el('lines').value);
      if (parsed.lines) args.lines = parsed.lines;
      else if (parsed.warning) lineWarn = parsed.warning;
    }
    if (tab === 'meihua') {
      args.mode = mhMode;
      if (mhMode === 'number') {
        const u = el('upper').value.trim();
        const l = el('lower').value.trim();
        // 空输入 Number('') === 0，会余成 8（坤为地）——直接挡掉
        if (!u || !l) {
          el('out').innerHTML = '<div class="err">数字起卦需要填两个数（第一个数定上卦、第二个数定下卦）。</div>';
          return;
        }
        args.upper = Number(u);
        args.lower = Number(l);
        if (el('changing').value !== '') args.changing = Number(el('changing').value);
      }
    }
    if (tab === 'tarot') args.count = Number(el('tcount') ? el('tcount').value : 3) || 3;
    // 问题与卦象一起交给解读：解读按它展开，并在开头回显供你确认
    if (needAsk(tab)) args.question = el('question').value.trim();
    try {
      const r = window.Engine.compute(args);
      const html = (lineWarn ? `<div class="note">${lineWarn}</div>` : '') + (tab === 'ziwei' ? window.__PP.ziweiHTML(r)
        : tab === 'bazi' ? window.__PP.baziHTML(r)
          : tab === 'hepan' ? (r.chart === 'ziwei' ? window.__PP.ziweiHepanHTML(r) : window.__PP.hepanHTML(r))
            : tab === 'qimen' ? (window.__PP.qimenHTML(r) + window.__PP.qimenFactsHTML(r))
              : tab === 'meihua' ? window.__PP.meihuaHTML(r)
                : tab === 'daliuren' ? window.__PP.daliurenHTML(r)
                  : tab === 'tarot' ? window.__PP.tarotHTML(r)
                    : window.__PP.liuyaoHTML(r));
      last = { r, html, tab, date, time, timed };
      paint();
    } catch (e) {
      last = null;
      // 错误文案里会带出用户输入的原文（如非法的 datetime），只能走 textContent，不能拼进 innerHTML
      const out = el('out');
      const box = document.createElement('div');
      box.className = 'err';
      box.textContent = String((e && e.message) || e);
      out.replaceChildren(box);
    }
  }

  /**
   * 主按钮：时间仍为「自动」时先取当下再起卦；手动改过就用你填的时刻。
   * 「此刻」按钮据此取消。
   */
  function goCast() {
    const k = kindOf(tab);
    if (k !== 'none' && usesTimeInput() && !manual[k]) fillDateTime(nowParts());
    run();
  }

  function renderTip() {
    const tip = el('tip');
    if (!tip) return;
    tip.textContent = '';
    const main = document.createElement('div');
    main.textContent = TIPS[tab] || '';
    tip.appendChild(main);
    if (kindOf(tab) === 'cast' && usesTimeInput()) {
      const note = document.createElement('div');
      note.className = 'auto-note';
      // 文案分清「自动取的」和「你手动填的」，免得明明改过还说自动取
      note.textContent = manual.cast
        ? `起卦时刻用的是你手动填的（${el('time').value}）；想跟随当下，把时间改回或清空即可。`
        : `起卦时刻已自动取本机时间（${el('time').value}），每次点起卦都会重新取当下；想固定时刻就在上面改。`;
      tip.appendChild(note);
    }
  }

  function setTab(next) {
    tab = next;
    const k = kindOf(tab);
    const birth = isBirthTab(tab);
    document.querySelectorAll('.tab').forEach((b) => b.classList.toggle('on', b.dataset.tab === tab));
    el('for-bazi').style.display = birth ? '' : 'none';
    el('for-gender').style.display = birth ? '' : 'none';
    el('for-liuyao').style.display = tab === 'liuyao' ? '' : 'none';
    el('for-meihua').style.display = tab === 'meihua' ? '' : 'none';
    el('for-hepan').style.display = tab === 'hepan' ? '' : 'none';
    el('for-qimen').style.display = tab === 'qimen' ? '' : 'none';
    // 所问之事 + 询问方向：六爻 / 梅花 / 六壬 / 塔罗这些问事的体系才显示
    el('for-ask').style.display = needAsk(tab) ? '' : 'none';
    const fc = el('for-count');
    if (fc) fc.style.display = tab === 'tarot' ? '' : 'none';
    const castLabel = tab === 'qimen';
    el('lbl-date').textContent = birth ? '出生日期（公历）' : (castLabel ? '起局日期（公历）' : '起卦日期（公历）');
    el('lbl-time').textContent = birth ? '出生时刻' : (castLabel ? '起局时刻' : '起卦时刻');
    el('go').textContent = tab === 'tarot' ? '抽牌'
      : tab === 'hepan' ? '合盘'
        : tab === 'qimen' ? '起局'
          : birth ? '排盘' : '起卦';
    syncMhMode();      // 内含 for-date / for-time 的显隐（塔罗、梅花数字起卦都隐藏）
    applyDateTime(k);  // 起卦类 → 当前时刻；命盘类 → 示例默认；用户改过则保留
    ctxKind = k;
    renderTip();
  }

  function syncMhMode() {
    document.querySelectorAll('#for-meihua .seg button').forEach((b) => b.classList.toggle('on', b.dataset.mode === mhMode));
    const mhNum = tab === 'meihua' && mhMode === 'number';
    el('mh-num').style.display = mhNum ? '' : 'none';
    // 梅花「数字起卦」不参与时间计算，日期/时刻在此模式下隐藏，避免误导
    const showDT = tab !== 'tarot' && !mhNum;
    el('for-date').style.display = showDT ? '' : 'none';
    el('for-time').style.display = showDT ? '' : 'none';
  }

  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tab').forEach((b) => b.addEventListener('click', () => {
      setTab(b.dataset.tab);
      run();
    }));
    document.querySelectorAll('#for-meihua .seg button').forEach((b) => b.addEventListener('click', () => {
      mhMode = b.dataset.mode;
      syncMhMode();
      renderTip();
      run(); // 切起卦方式后立刻重起一卦，避免结果头部留着上一模式的「起卦时刻」
    }));
    ['date', 'time'].forEach((id) => {
      const node = el(id);
      if (!node) return;
      node.addEventListener('change', onManualEdit);
      node.addEventListener('input', onManualEdit);
    });
    el('go').addEventListener('click', goCast);
    // 看示例：填固定示例盘并切到八字，走与真实排盘完全相同的渲染路径
    const sampleBtn = el('sample');
    if (sampleBtn) sampleBtn.addEventListener('click', () => {
      el('date').value = SAMPLE.date;
      el('time').value = SAMPLE.time;
      el('gender').value = 'male';
      el('addr').value = '河北石家庄';
      setTab('bazi');
      run();
    });
    el('gender').addEventListener('change', run);
    // 换牌阵张数要重新抽牌（1/3/5 张是不同牌阵，不是同一组牌换个显示）
    const tc = el('tcount');
    if (tc) tc.addEventListener('change', run);
    // 合盘：合盘方式切换与对方信息改动都要重算
    document.querySelectorAll('#hpchart button').forEach((b) => b.addEventListener('click', () => {
      document.querySelectorAll('#hpchart button').forEach((x) => x.classList.toggle('on', x === b));
      run();
    }));
    ['pdate', 'ptime', 'pgender', 'paddr'].forEach((id) => {
      const node = el(id);
      if (node) node.addEventListener('change', run);
    });
    // 奇门：换局规则改动重起局；询问方向改动只重出解读（用神跟着方向走）
    document.querySelectorAll('input[name="qimen_rule"]').forEach((n) => n.addEventListener('change', run));
    const qdir = el('qdir');
    if (qdir) qdir.addEventListener('change', () => { if (tab === 'qimen') paint(); });
    // 改问题或方向：只重出解读，不重摇一卦
    el('question').addEventListener('change', () => { if (needAsk(tab)) paint(); });
    el('direction').addEventListener('change', () => { if (needAsk(tab)) paint(); });
    // 解析模块折叠：标题栏整栏可点，容器内委托一次即可
    el('out').addEventListener('click', (e) => {
      onExportClick(e);
      const head = e.target && e.target.closest ? e.target.closest('.mp-it-head') : null;
      if (!head) return;
      const box = head.closest('.mp-it');
      if (!box) return;
      const folded = !box.classList.contains('folded');
      box.classList.toggle('folded', folded);
      head.setAttribute('aria-expanded', folded ? 'false' : 'true');
      const hint = head.querySelector('.mp-it-hint');
      if (hint) hint.textContent = folded ? '点击展开' : '点击收起';
      foldPref = folded;
    });
    // 切到问事的体系时把光标放进「所问之事」
    document.querySelectorAll('.tab').forEach((b) => b.addEventListener('click', () => {
      if (needAsk(tab) && !el('question').value.trim() && el('question').focus) el('question').focus();
    }));
    setTab('ziwei');
    run();
  });
})();
