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
    ziwei: 'birth', bazi: 'birth',
    liuyao: 'cast', meihua: 'cast', daliuren: 'cast',
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
    tarot: '塔罗不看时间，只记录抽牌时刻与你的提问。',
  };

  // 问事的体系必须写清「所问之事」，解读才有落点；命盘类（八字/紫微）不问事，不显示这两项
  const NEED_ASK = { liuyao: true, meihua: true, daliuren: true, tarot: true };
  const needAsk = (t) => !!NEED_ASK[t];
  const ASK_PLACEHOLDER = '用一句话描述所问之事，例如：今年是否适合换工作？';

  /** 本次要交给解读的「问题 + 方向」；命盘类不传 */
  function askArgs() {
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
      + window.__PP.resultWithInterpret(last.html, it, { folded: defaultFolded() });
  }

  async function run() {
    const date = el('date').value;
    const time = el('time').value;
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
    if (tab === 'bazi' || tab === 'ziwei') {
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
    if (tab === 'liuyao') {
      const v = el('lines').value.split(/[^0-9]+/).filter(Boolean).map(Number);
      if (v.length === 6) args.lines = v;
    }
    if (tab === 'meihua') {
      args.mode = mhMode;
      if (mhMode === 'number') {
        args.upper = Number(el('upper').value);
        args.lower = Number(el('lower').value);
        if (el('changing').value !== '') args.changing = Number(el('changing').value);
      }
    }
    if (tab === 'tarot') args.count = Number(el('tcount') ? el('tcount').value : 3) || 3;
    // 问题与卦象一起交给解读：解读按它展开，并在开头回显供你确认
    if (needAsk(tab)) args.question = el('question').value.trim();
    try {
      const r = window.Engine.compute(args);
      const html = tab === 'ziwei' ? window.__PP.ziweiHTML(r)
        : tab === 'bazi' ? window.__PP.baziHTML(r)
          : tab === 'meihua' ? window.__PP.meihuaHTML(r)
            : tab === 'daliuren' ? window.__PP.daliurenHTML(r)
              : tab === 'tarot' ? window.__PP.tarotHTML(r)
                : window.__PP.liuyaoHTML(r);
      last = { r, html, tab, date, time, timed };
      paint();
    } catch (e) {
      last = null;
      el('out').innerHTML = `<div class="err">${(e && e.message) || e}</div>`;
    }
  }

  function runNow() {
    const k = kindOf(tab);
    fillDateTime(nowParts());
    // 「此刻」是明确的「回到自动」：清掉该类下的手动值，以后切 tab 仍会跟随当前时刻
    if (k !== 'none') manual[k] = null;
    renderTip();
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
        ? `起卦时刻现在用的是你手动填的（${el('time').value}）；点「此刻」可回到自动取当下。`
        : `起卦时刻已自动取你的本机时间（${el('time').value}）；想用别的时刻可以直接改，或点「此刻」重新取当下。`;
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
    // 所问之事 + 询问方向：六爻 / 梅花 / 六壬 / 塔罗这些问事的体系才显示
    el('for-ask').style.display = needAsk(tab) ? '' : 'none';
    const fc = el('for-count');
    if (fc) fc.style.display = tab === 'tarot' ? '' : 'none';
    el('now').style.display = tab === 'tarot' ? 'none' : '';
    el('lbl-date').textContent = birth ? '出生日期（公历）' : '起卦日期（公历）';
    el('lbl-time').textContent = birth ? '出生时刻' : '起卦时刻';
    el('go').textContent = tab === 'tarot' ? '抽牌' : birth ? '排盘' : '起卦';
    syncMhMode();      // 内含 for-date / for-time 的显隐（塔罗、梅花数字起卦都隐藏）
    applyDateTime(k);  // 起卦类 → 当前时刻；命盘类 → 示例默认；用户改过则保留
    ctxKind = k;
    renderTip();
  }

  function syncMhMode() {
    document.querySelectorAll('#for-meihua .seg button').forEach((b) => b.classList.toggle('on', b.dataset.mode === mhMode));
    const mhNum = tab === 'meihua' && mhMode === 'number';
    el('mh-num').style.display = mhNum ? '' : 'none';
    const mhTime = el('mh-time');
    if (mhTime) mhTime.style.display = (tab === 'meihua' && mhMode === 'time') ? '' : 'none';
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
    el('go').addEventListener('click', run);
    el('now').addEventListener('click', runNow);
    el('gender').addEventListener('change', run);
    // 换牌阵张数要重新抽牌（1/3/5 张是不同牌阵，不是同一组牌换个显示）
    const tc = el('tcount');
    if (tc) tc.addEventListener('change', run);
    // 改问题或方向：只重出解读，不重摇一卦
    el('question').addEventListener('change', () => { if (needAsk(tab)) paint(); });
    el('direction').addEventListener('change', () => { if (needAsk(tab)) paint(); });
    // 解析模块折叠：标题栏整栏可点，容器内委托一次即可
    el('out').addEventListener('click', (e) => {
      const head = e.target && e.target.closest ? e.target.closest('.it-head') : null;
      if (!head) return;
      const box = head.closest('.it');
      if (!box) return;
      const folded = !box.classList.contains('folded');
      box.classList.toggle('folded', folded);
      head.setAttribute('aria-expanded', folded ? 'false' : 'true');
      const hint = head.querySelector('.it-hint');
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
