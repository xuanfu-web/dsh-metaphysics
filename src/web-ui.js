(function () {
  const TYPE_CLASS = { 主星: 'main', 吉星: 'good', 煞星: 'bad', 辅星: 'aux', 杂曜: 'aux' };
  const MUT_CLASS = { 禄: 'm-lu', 权: 'm-quan', 科: 'm-ke', 忌: 'm-ji' };
  let tab = 'ziwei';
  let mhMode = 'time';
  let xlrMode = 'time';
  let fsMode = 'natal';
  let nnMode = 'assess';
  let convMode = 'solar2lunar';

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
    almanac: 'date', zeri: 'date', star: 'date', numerology: 'date', convert: 'date',
    chenggu: 'birth', trend: 'birth', fengshui: 'birth', name: 'birth',
    xiaoliuren: 'cast',
    mbti: 'none',
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
    almanac: '黄历按公历日期查农历、干支、建除、宜忌与冲煞；只做本地计算。',
    zeri: '择日把区间内每天的建除宜忌与事项适配打分排序，并按属相排除冲煞日。',
    chenggu: '称骨按农历年、月、日、时的骨重求和；时辰必填。',
    xiaoliuren: '小六壬用农历月/日/时掐指，也可用三个随机数起课。',
    star: '星座按公历日期给出太阳星座与当日基调；同日同星座结果固定。',
    numerology: '生命数字按公历生日归约出生命路径数、生日数与态度数。',
    trend: '人生 K 线按大运与流年十神给逐年运势分，画成走势图。',
    fengshui: '风水看八宅命卦、大游年四吉四凶与流年九宫飞星；也可按坐向看门主灶倾向。',
    name: '起名按八字喜用匹配字库五行，可评估现有名字或生成候选名。',
    mbti: '十六型人格是一份 MBTI 风格问卷：24 题按 1（完全不像）到 5（很像我）打分，四维度各取一侧；留空先出题目。',
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
    if (k === 'date') return nowParts();
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
    // 交叉验证结果由 compute 挂在盘面对象上，这里补进解析分节，保证与真实报告同一渲染路径
    if (it && last.r && last.r.cross && window.Engine.crossText) {
      it.sections = [...(it.sections || []), { key: 'crossSystem', label: '八字 × 紫微 交叉验证', text: window.Engine.crossText(last.r.cross) }];
    }
    el('out').innerHTML = castAtHTML(last.tab, last.timed, last.date, last.time)
      + window.__PP.resultWithInterpret(last.html, it, { folded: defaultFolded() })
      + followupBar()
      + (last.tab === 'bazi' ? `<div id="vbox">${verifyHTML()}</div><div id="rectbox">${rectifyHTML()}</div>` : '')
      + exportBar();
    last.it = it;
  }

  /** 追问区：只对已算好的盘发问，不重新起盘 */
  function followupBar() {
    return `<div class="askbox no-print">
      <input id="askq" maxlength="120" placeholder="追问：如 2027 年事业怎么样（回车提交）">
      <button type="button" data-act="ask">追问</button>
      <span class="hint">只回答盘面能支持的部分；找不到会说找不到</span>
    </div><div id="fout"></div>`;
  }

  function doAsk() {
    if (!last || !last.r) return;
    const box = el('askq');
    const q = box && box.value ? box.value.trim() : '';
    if (!q) return;
    const fx = window.Engine.followup ? window.Engine.followup(last.r, q) : null;
    const out = el('fout');
    if (out) out.innerHTML = fx ? window.__PP.followupHTML(fx) : '';
  }

  // ── 验前事 / 生时校正（仅八字）─────────────────────────────
  let pastMarks = {};
  let pastFit = null;
  let rectOut = null;
  const rectEvents = [{ year: '2019', kind: 'career' }, { year: '2022', kind: 'love' }];

  function verifyHTML() {
    const rows = (last && last.r && last.r.past && last.r.past.rows) || [];
    if (!rows.length) return '';
    const row = (r) => `<div class="mp-verify-row"><span class="mp-verify-txt">${r.year} ${r.ganzhi} · ${r.theme}</span>
      <span class="mp-verify-btns">${[['yes', '准'], ['no', '不准'], ['unsure', '不确定']].map(([m, l]) =>
    `<button type="button" class="mp-chip${pastMarks[r.year] === m ? ' on' : ''}" data-pmark="${r.year}" data-mark="${m}">${l}</button>`).join('')}</span></div>`;
    return `<div class="mp-verify"><div class="mp-verify-h">验前事 · 过去几年的信号（只读，不改盘）</div>
      ${rows.map(row).join('')}
      <div class="mp-verify-foot"><button type="button" class="mp-btn ghost" data-calfit="1" style="font-size:12px;padding:5px 12px">算贴合度</button>
      <span id="fitout" class="mp-verify-fit">${pastFit ? `命中 ${pastFit.yes}/${pastFit.answered}（${pastFit.level}）：${pastFit.advice}` : ''}</span></div></div>`;
  }

  function rectifyHTML() {
    const rows = rectEvents.map((ev, i) => `<div class="mp-rect-row">
      <input id="ry${i}" type="number" min="1900" max="2100" value="${ev.year}" class="mp-input" style="flex:1">
      <select id="rk${i}" class="mp-input" style="flex:1">
        ${[['career', '事业变动'], ['wealth', '财运'], ['love', '感情'], ['move', '搬迁/出行'], ['health', '健康'], ['other', '其他']]
    .map(([v, l]) => `<option value="${v}"${ev.kind === v ? ' selected' : ''}>${l}</option>`).join('')}
      </select></div>`).join('');
    return `<div class="mp-rect"><div class="mp-verify-h">生时校正 · 用过去的事反推时辰</div>${rows}
      <button type="button" class="mp-btn ghost" data-rectify="1" style="font-size:12px;padding:5px 12px">计算候选时辰</button>
      <div id="rectout">${rectOutHTML()}</div></div>`;
  }

  function rectOutHTML() {
    if (!rectOut) return '';
    if (rectOut.error) return `<div class="mp-rect-err">${rectOut.error}</div>`;
    return `<div class="mp-verify-fit">${rectOut.note}</div>${rectOut.candidates.slice(0, 6)
      .map((c) => `<div class="mp-rect-cand${c === rectOut.best ? ' best' : ''}">${c.label} · 时柱 ${c.hourGanzhi} · 日柱 ${c.dayGanzhi} · 命中 ${c.hits}/${c.total}</div>`).join('')}`;
  }

  function doRectify() {
    if (!last || !last.r || last.tab !== 'bazi') return;
    const events = rectEvents
      .map((ev, i) => ({ year: Number(el('ry' + i) && el('ry' + i).value), kind: el('rk' + i) ? el('rk' + i).value : 'other' }))
      .filter((e) => Number.isInteger(e.year) && e.year > 1900);
    try {
      rectOut = window.Engine.rectifyBirth ? window.Engine.rectifyBirth({
        base: {
          year: Number(last.date.slice(0, 4)),
          month: Number(last.date.slice(5, 7)),
          day: Number(last.date.slice(8, 10)),
          minute: Number(last.time.slice(3, 5)) || 0,
        },
        gender: el('gender').value,
        events,
        lateZi: el('latezi') ? el('latezi').checked : true,
        trueSolar: el('ts') ? el('ts').checked : true,
        address: el('addr') && el('addr').value.trim() ? el('addr').value.trim() : undefined,
      }) : { error: '当前页面未加载生时校正模块' };
    } catch (e) { rectOut = { error: e && e.message ? e.message : String(e) }; }
    const out = el('rectout');
    if (out) out.innerHTML = rectOutHTML();
  }

  // 导出：走浏览器自带打印 → 另存为 PDF。不引第三方库，盘面是纯 DOM+CSS，打印保真度够。
  // 打印样式在 build-html.mjs 的 @media print 里（隐藏输入区与按钮，只留抬头与结果）。
  function exportBar() {
    return `<div class="exp no-print">
      <button type="button" data-act="pdf">存为 PDF</button>
      <button type="button" data-act="print">打印</button>
      <button type="button" data-act="md">导出 .md</button>
      <button type="button" data-act="png">存为摘要长图</button>
      <span class="hint">长图是 PNG 摘要卡（一页读懂 + 首张表），适合直接发给别人；.md 可直接存档</span>
    </div>`;
  }

  function onExportClick(e) {
    const b = e.target && e.target.closest ? e.target.closest('.exp [data-act]') : null;
    if (!b) return;
    if (b.dataset.act === 'md') { downloadReport(); return; }
    if (b.dataset.act === 'png') { downloadCard(); return; }
    window.print();
  }

  /** 存为摘要长图：Canvas 直出 PNG，零依赖；不支持时提示 */
  function downloadCard() {
    if (!last || !last.r) return;
    const url = window.__PP.summaryCardPNG ? window.__PP.summaryCardPNG(last.r, last.it || null) : '';
    if (!url) { alert('当前浏览器不支持 Canvas 导出，请改用「存为 PDF」'); return; }
    const a = document.createElement('a');
    a.href = url;
    a.download = `命理摘要-${last.r.system}-${last.date || ''}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  /** 导出 Markdown：盘面 + 解析（含一页读懂、三张表、交叉验证）与追问 */
  function downloadReport() {
    if (!last || !last.r) return;
    const text = window.Engine.renderText ? window.Engine.renderText(last.r) : String(last.r.summary || '');
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `命理报告-${last.r.system}-${last.date || ''}.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
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
      if (el('latezi')) args.lateZi = el('latezi').checked;
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
    // 八字/紫微可勾选「交叉验证」：同一份出生信息再排另一套盘并列对照
    if ((tab === 'bazi' || tab === 'ziwei') && el('cross') && el('cross').checked) args.cross = true;
    if (tab === 'qimen') {
      const picked = document.querySelector('input[name="qimen_rule"]:checked');
      args.juMethod = picked ? picked.value : 'chaibu';
      if (el('qlatezi')) args.lateZiHourMode = el('qlatezi').value;
    }
    if (tab === 'bazi') args.verifyPast = 6;
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
    // 速查类：各体系自己的最小输入
    if (tab === 'zeri') {
      args.startDate = date;
      args.task = el('ztask').value;
      args.days = Number(el('zdays').value) || 30;
      if (el('zsheng').value) args.shengXiao = el('zsheng').value;
    }
    if (tab === 'xiaoliuren') {
      args.mode = xlrMode;
      if (xlrMode === 'number') {
        args.num1 = Number(el('num1').value) || undefined;
        args.num2 = Number(el('num2').value) || undefined;
        args.num3 = Number(el('num3').value) || undefined;
      } else {
        args.date = date;
        const hh = Number(String(time).split(':')[0]);
        args.hour = Number.isFinite(hh) ? hh : 12;
      }
    }
    if (tab === 'convert') {
      args.mode = convMode;
      if (convMode === 'lunar2solar') {
        const m = /^(d{4})-(d{1,2})-(d{1,2})$/.exec(String(el('lunardate').value).trim());
        if (!m) { el('out').innerHTML = '<div class="err">农历转公历请按「农历年-月-日」填写，例如 2026-9-17；闰月单独勾选。</div>'; return; }
        args.lunarYear = Number(m[1]); args.lunarMonth = Number(m[2]); args.lunarDay = Number(m[3]);
        args.isLeapMonth = !!(el('leapm') && el('leapm').checked);
        delete args.datetime;
      }
    }
    if (tab === 'mbti') {
      delete args.datetime;
      const box = el('mbtianswers');
      const nums = box ? String(box.value).split(/[^0-9]+/).filter((x) => x !== '').map((x) => Number(x)) : [];
      if (nums.length) args.answers = nums;
    }
    if (tab === 'trend') { args.gender = el('gender').value; args.toAge = Number(el('toage').value) || 60; args.trueSolar = el('ts').checked; args.lateZi = el('latezi') ? el('latezi').checked : true; }
    if (tab === 'fengshui') {
      args.action = fsMode;
      if (fsMode === 'advise') { args.sitting = el('sitting').value.trim(); args.facing = el('facing').value.trim(); delete args.datetime; }
      else { args.gender = el('gender').value; }
    }
    if (tab === 'name') {
      args.action = nnMode;
      args.surname = el('surname').value.trim();
      if (nnMode === 'generate') {
        args.gender = el('gender').value; args.limit = Number(el('nlimit').value) || 6;
        args.trueSolar = el('ts').checked; args.lateZi = el('latezi') ? el('latezi').checked : true;
      } else {
        args.givenName = el('givenname').value.trim();
        delete args.datetime;
      }
    }
    // 问题与卦象一起交给解读：解读按它展开，并在开头回显供你确认
    if (needAsk(tab)) args.question = el('question').value.trim();
    try {
      const r = window.Engine.compute(args);
      // 八字结果里直接嵌人生 K 线：同一份出生信息再排一次 trend（确定性、无网络）
      let trend = null;
      if (tab === 'bazi') {
        try {
          trend = window.Engine.compute({
            system: 'trend', datetime: `${date}T${time}`, gender: args.gender, toAge: 100,
            trueSolar: args.trueSolar, lateZi: args.lateZi !== false,
            ...(args.address ? { address: args.address } : {}),
            ...(typeof args.longitude === 'number' ? { longitude: args.longitude } : {}),
            ...(args.geo ? { geo: args.geo } : {}),
          });
        } catch (e) { trend = null; }
      }
      const html = (lineWarn ? `<div class="note">${lineWarn}</div>` : '') + (tab === 'ziwei' ? window.__PP.ziweiHTML(r)
        : tab === 'bazi' ? (window.__PP.baziHTML(r) + (trend ? window.__PP.trendHTML(trend) : ''))
          : tab === 'hepan' ? (r.chart === 'ziwei' ? window.__PP.ziweiHepanHTML(r) : window.__PP.hepanHTML(r))
            : tab === 'qimen' ? (window.__PP.qimenHTML(r) + window.__PP.qimenFactsHTML(r))
              : tab === 'meihua' ? window.__PP.meihuaHTML(r)
                : tab === 'daliuren' ? window.__PP.daliurenHTML(r)
                  : tab === 'tarot' ? window.__PP.tarotHTML(r)
                    : tab === 'liuyao' ? window.__PP.liuyaoHTML(r)
                      : tab === 'almanac' ? window.__PP.almanacHTML(r)
                      : tab === 'chenggu' ? window.__PP.chengguHTML(r)
                        : tab === 'trend' ? window.__PP.trendHTML(r)
                          : tab === 'name' ? window.__PP.nameHTML(r)
                          : tab === 'mbti' ? window.__PP.mbtiHTML(r)
                          : window.__PP.quickHTML(r));
      last = { r, html, tab, date, time, timed, trend };
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

  const QUICK = ['almanac', 'convert', 'zeri', 'chenggu', 'xiaoliuren', 'star', 'numerology', 'trend', 'fengshui', 'name', 'mbti'];

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
    const fm = el('for-mbti');
    if (fm) fm.style.display = tab === 'mbti' ? '' : 'none';
    const fq = el('for-quick');
    if (fq) fq.style.display = QUICK.indexOf(tab) >= 0 ? '' : 'none';
    // 所问之事 + 询问方向：六爻 / 梅花 / 六壬 / 塔罗这些问事的体系才显示
    el('for-ask').style.display = needAsk(tab) ? '' : 'none';
    const fc = el('for-count');
    if (fc) fc.style.display = tab === 'tarot' ? '' : 'none';
    const castLabel = tab === 'qimen';
    const dateLabel = tab === 'almanac' || tab === 'zeri' || tab === 'star' || tab === 'numerology';
    el('lbl-date').textContent = birth ? '出生日期（公历）' : dateLabel ? '日期（公历）' : (castLabel ? '起局日期（公历）' : '起卦日期（公历）');
    el('lbl-time').textContent = birth ? '出生时刻' : (castLabel ? '起局时刻' : '起卦时刻');
    const qk = el('for-quick');
    if (qk) {
      el('qk-zeri').style.display = tab === 'zeri' ? '' : 'none';
      el('qk-xiaoliuren').style.display = tab === 'xiaoliuren' ? '' : 'none';
      el('qk-trend').style.display = tab === 'trend' ? '' : 'none';
      el('qk-fengshui').style.display = tab === 'fengshui' ? '' : 'none';
      el('qk-name').style.display = tab === 'name' ? '' : 'none';
    }
    syncQuick();
    el('go').textContent = tab === 'tarot' ? '抽牌'
      : tab === 'hepan' ? '合盘'
        : tab === 'qimen' ? '起局'
          : QUICK.indexOf(tab) >= 0 ? '看结果'
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
    el('for-time').style.display = showDT && kindOf(tab) !== 'date' ? '' : 'none';
  }

  /** 速查类子表单：择日/小六壬/人生K/风水/起名各自的小块与分段按钮 */
  function syncQuick() {
    if (!el('qk-xiaoliuren')) return;
    document.querySelectorAll('#xlrmode button').forEach((b) => b.classList.toggle('on', b.dataset.mode === xlrMode));
    el('xlr-num').style.display = xlrMode === 'number' ? '' : 'none';
    document.querySelectorAll('#fsmode button').forEach((b) => b.classList.toggle('on', b.dataset.mode === fsMode));
    el('fs-advise').style.display = fsMode === 'advise' ? '' : 'none';
    el('fs-advise2').style.display = fsMode === 'advise' ? '' : 'none';
    document.querySelectorAll('#nnmode button').forEach((b) => b.classList.toggle('on', b.dataset.mode === nnMode));
    el('nn-assess').style.display = nnMode === 'assess' ? '' : 'none';
    el('nn-generate').style.display = nnMode === 'generate' ? '' : 'none';
    document.querySelectorAll('#convertmode button').forEach((b) => b.classList.toggle('on', b.dataset.mode === convMode));
    if (el('qk-convert-lunar')) el('qk-convert-lunar').style.display = convMode === 'lunar2solar' ? '' : 'none';
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
    // 速查类：分段按钮与输入改动都直接重算
    const seg = (sel, set) => document.querySelectorAll(sel).forEach((b) => b.addEventListener('click', () => {
      set(b.dataset.mode); syncQuick(); run();
    }));
    seg('#xlrmode button', (v) => { xlrMode = v; });
    seg('#fsmode button', (v) => { fsMode = v; });
    seg('#nnmode button', (v) => { nnMode = v; });
    seg('#convertmode button', (v) => { convMode = v; syncQuick(); run(); });
    ['ztask', 'zdays', 'zsheng', 'num1', 'num2', 'num3', 'toage', 'sitting', 'facing', 'surname', 'givenname', 'nlimit', 'lunardate', 'leapm']
      .forEach((id) => { const n = el(id); if (n) n.addEventListener('change', run); });
    // 方法页：按钮开合（静态内容，无网络）
    const mOpen = el('method-open');
    const mClose = el('method-close');
    const mSec = el('method');
    if (mOpen && mSec) mOpen.addEventListener('click', () => { mSec.hidden = false; mSec.scrollIntoView({ behavior: 'smooth' }); });
    if (mClose && mSec) mClose.addEventListener('click', () => { mSec.hidden = true; });
    // 改问题或方向：只重出解读，不重摇一卦
    el('question').addEventListener('change', () => { if (needAsk(tab)) paint(); });
    el('direction').addEventListener('change', () => { if (needAsk(tab)) paint(); });
    // 解析模块折叠：标题栏整栏可点，容器内委托一次即可
    el('out').addEventListener('click', (e) => {
      const pm = e.target && e.target.closest ? e.target.closest('[data-pmark]') : null;
      if (pm) { pastMarks[pm.dataset.pmark] = pm.dataset.mark; const vb = el('vbox'); if (vb) vb.innerHTML = verifyHTML(); return; }
      const cf = e.target && e.target.closest ? e.target.closest('[data-calfit]') : null;
      if (cf) {
        if (last && last.r && last.r.past && window.Engine.verifyFit) {
          pastFit = window.Engine.verifyFit(last.r.past.rows, pastMarks);
          const fo = el('fitout');
          if (fo) fo.textContent = `命中 ${pastFit.yes}/${pastFit.answered}（${pastFit.level}）：${pastFit.advice}`;
        }
        return;
      }
      const rc = e.target && e.target.closest ? e.target.closest('[data-rectify]') : null;
      if (rc) { doRectify(); return; }
      const askBtn = e.target && e.target.closest ? e.target.closest('[data-act="ask"]') : null;
      if (askBtn) { doAsk(); return; }
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
    // 追问输入框回车提交
    el('out').addEventListener('keydown', (e) => {
      if (e.target && e.target.id === 'askq' && e.key === 'Enter') { e.preventDefault(); doAsk(); }
    });
    // 切到问事的体系时把光标放进「所问之事」
    document.querySelectorAll('.tab').forEach((b) => b.addEventListener('click', () => {
      if (needAsk(tab) && !el('question').value.trim() && el('question').focus) el('question').focus();
    }));
    setTab('ziwei');
    run();
  });
})();
