(function () {
  const TYPE_CLASS = { 主星: 'main', 吉星: 'good', 煞星: 'bad', 辅星: 'aux', 杂曜: 'aux' };
  const MUT_CLASS = { 禄: 'm-lu', 权: 'm-quan', 科: 'm-ke', 忌: 'm-ji' };
  let tab = 'ziwei';
  // 排盘代次：每次点「排盘」自增。地址解析要等网络，回来时若代次已变，说明用户换过 tab
  // 或又点了一次，这一次作废（之后所有 el() 读到的都是新 tab 的控件，接着拼会排出错盘）
  let runSeq = 0;
  let mhMode = 'time';
  let xlrMode = 'time';
  let fsMode = 'natal';
  let fsPeriod = '9';
  let nnMode = 'assess';
  let convMode = 'solar2lunar';

  const el = (id) => document.getElementById(id);
  const pad = (n) => String(n).padStart(2, '0');

  // ── 公历日期输入：固定「年-月-日」 ─────────────────────────────
  // 原生 date 控件的顺序跟随浏览器区域，容易出现月/日/年或日/月/年。
  // 改成文本输入 + 数字掩码：显示始终是 YYYY-MM-DD，也认 1990/5/12、1990年5月12日。
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
    const iso = `${ymd[1]}-${pad(ymd[2])}-${pad(ymd[3])}`;
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
  /** 程序填值（示例 / 切 tab）：同步掩码与「最近一次有效值」 */
  function setDateField(id, iso) {
    const input = el(id);
    if (!input) return;
    const v = normalizeDateText(iso) || '';
    input.value = v;
    input.dataset.last = v;
    input.setAttribute('aria-invalid', 'false');
  }
  function bindDateInput(id) {
    const input = el(id);
    if (!input) return;
    const initial = normalizeDateText(input.value);
    if (initial) input.value = initial;
    input.dataset.last = initial || '';
    input.setAttribute('type', 'text');
    input.setAttribute('inputmode', 'numeric');
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('placeholder', '年-月-日，如 1990-05-12');
    input.addEventListener('input', () => {
      const next = maskDateText(input.value);
      if (input.value !== next) input.value = next;
      const iso = normalizeDateText(next);
      if (iso) input.dataset.last = iso;
      input.setAttribute('aria-invalid', iso || !next.trim() ? 'false' : 'true');
    });
    input.addEventListener('blur', () => {
      const raw = input.value.trim();
      if (!raw) { input.setAttribute('aria-invalid', 'false'); return; }
      const iso = normalizeDateText(raw);
      if (iso) {
        input.value = iso;
        input.dataset.last = iso;
        input.setAttribute('aria-invalid', 'false');
        return;
      }
      // 写错了就退回最近一次有效值，别把一个非法日期留在框里等着排盘
      input.value = input.dataset.last || '';
      input.setAttribute('aria-invalid', 'false');
    });
  }
  function bindDateInputs() {
    ['date', 'pdate', 'p2date', 'fsdate'].forEach(bindDateInput);
  }
  // 首屏耗时只在本机显示，不上报
  const mpNow = () => (typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now());

  // ── 首屏：最近用过 / 分组 ↔ 平铺 ────────────────────────────────
  // 只记「点过哪个入口」，不存任何输入内容；读写失败（隐私模式、禁用存储）就降级成不记。
  const RECENT_KEY = 'mp.recent.tabs';
  const VIEW_KEY = 'mp.first.view';
  const RECENT_MAX = 6;

  /**
   * 收集这次排盘的输入：按控件 id 存，表单新增字段自动带上，不用维护白名单。
   *
   * 只收**当前体系看得见**的控件。切到黄历后再点「存卦例」，DOM 里还留着上一次
   * 排八字填的性别、出生地、晚子时换日——不收这道闸，深链和历史条目里就会带着
   * 一堆这张盘根本没用过的参数，回填时还会把别的体系的输入改掉。
   * 可见性用 getClientRects()：`.grp` 是 display:contents（自身没有盒子，
   * offsetParent 靠不住），父级 display:none 时子树一个矩形都拿不到。
   */
  function collectArgs() {
    const out = {};
    document.querySelectorAll('.bar input, .bar select, .bar textarea').forEach((n) => {
      if (!n.id) return;
      if (!n.getClientRects().length) return;
      if (n.type === 'checkbox') { if (n.checked) out[n.id] = true; return; }
      const v = String(n.value == null ? '' : n.value);
      if (v) out[n.id] = v.slice(0, 120);
    });
    return out;
  }

  /** 把一条历史记录写回表单：写了几个字段就返几，0 表示这条是旧格式、只有 tab 名 */
  function applyArgs(args) {
    if (!args) return 0;
    let hit = 0;
    Object.keys(args).forEach((id) => {
      const n = document.getElementById(id);
      if (!n) return;
      if (n.type === 'checkbox') n.checked = !!args[id];
      else n.value = String(args[id]);
      hit += 1;
    });
    return hit;
  }

  /** 一行话说明这次排的是什么：命盘看时间，问事看所问，起名看名字 */
  function argSummary(args) {
    if (!args) return '';
    const d = args.date || '';
    const t = args.time || '';
    if (d && t) return `${d} ${t}`;
    if (d) return d;
    if (args.question) return String(args.question).replace(/\s+/g, ' ').slice(0, 16);
    if (args.givenname) return `${args.surname || ''}${args.givenname}`;
    return '';
  }

  function storeGet(key) {
    try { return JSON.parse(window.localStorage.getItem(key) || 'null'); } catch (e) { return null; }
  }
  function storeSet(key, val) {
    try { window.localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* 存不了不影响使用 */ }
  }

  // ── 排盘结果的本机缓存（任务书 A 线 1.2④ / 1.4）─────────────────
  // 两套键各管一件事：
  //   chartKeyOf() —— 全表单参数，管「同参数再点一次排盘」；
  //   defaultChart —— 设默认盘时记下当时那张盘的 chartKey，管「重开直接读」。
  // 后者不重新用表单算哈希：刷新后「所问之事」「交叉验证」这些框会回到 HTML
  // 默认值，全参数哈希必然对不上，默认盘会退化成每次重排（1.5 第四条）。
  const CACHE_KEY = 'mp.chartResult.v1';
  const DEFAULT_KEY = 'mp.defaultChart.v1';
  const CACHE_SCHEMA = 1;
  const CACHE_MAX = 6;        // 每条带一整份盘面，留六张够用
  const CACHE_ITEM_MAX = 400000;

  function hash36(s) {
    let h = 0x811c9dc5;
    for (let i = 0; i < s.length; i += 1) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return (h >>> 0).toString(36);
  }
  function chartKeyOf(param) {
    // 可传「出盘那刻的参数指纹」求键：默认盘设缓存键时要的是上一张盘的键，
    // 不是此刻表单的键（表单可能已经改了）。
    return hash36(`${CACHE_SCHEMA}|${param != null ? param : paramKey()}`);
  }
  function defaultGet() {
    const d = storeGet(DEFAULT_KEY);
    return d && d.profileId ? d : null;
  }
  function defaultSet(d) { storeSet(DEFAULT_KEY, d); }
  /** 表单此刻是不是默认档案这个人：不是就别把别人的盘记到默认盘名下 */
  function defaultMatchesForm(d) {
    const p = (window.__PP.profilesLoad() || []).find((x) => x && x.id === d.profileId);
    if (!p) return false;
    const g = (id) => { const n = el(id); return n ? String(n.value).trim() : ''; };
    return g('date') === (p.date || '')
      && (p.hourUnknown || g('time') === (p.time || ''))
      && g('gender') === (p.gender || '')
      && g('addr') === (p.address || '');
  }
  function cacheMap() {
    const m = storeGet(CACHE_KEY);
    return m && typeof m === 'object' && !Array.isArray(m) ? m : {};
  }
  function cacheRead(id) {
    const hit = cacheMap()[id];
    return hit && hit.last && hit.last.r ? hit : null;
  }
  function cacheWrite(id, entry) {
    try {
      if (JSON.stringify(entry).length > CACHE_ITEM_MAX) return;
      const m = cacheMap();
      m[id] = entry;
      const ids = Object.keys(m);
      if (ids.length > CACHE_MAX) {
        ids.sort((x, y) => (m[x].createdAt || 0) - (m[y].createdAt || 0));
        for (let i = 0; i < ids.length - CACHE_MAX; i += 1) delete m[ids[i]];
      }
      storeSet(CACHE_KEY, m);
    } catch (e) { /* 存不下就当没有缓存，不影响这次排盘 */ }
  }

  /** 顶部「当前盘」条：文字与按钮全走文本节点，不拼 HTML */
  function paintDefaultBar(p) {
    const box = el('cur-chart');
    if (!box) return;
    box.replaceChildren();
    if (!p) { box.hidden = true; return; }
    const labels = entryLabels();
    const txt = document.createElement('span');
    txt.className = 'cur-txt';
    txt.textContent = `当前盘：${p.label || '未命名'} · ${p.date || ''} · ${labels[p.kind] || p.kind || ''}`;
    box.appendChild(txt);
    const off = document.createElement('button');
    off.type = 'button';
    off.className = 'cur-off';
    off.textContent = '取消默认';
    off.addEventListener('click', () => {
      if (window.__PP && p.pinned) window.__PP.profilesPin(p.id);
      defaultSet(null);
      paintDefaultBar(null);
      renderProfiles();
    });
    box.appendChild(off);
    box.hidden = false;
  }

  /** 默认盘：启动或切换时走这里。只回填 + 读缓存，绝不 compute（任务书 1.5 第四条） */
  function restoreDefault(p) {
    if (!p || !profFill(p)) { paintDefaultBar(null); refreshFlow(); return; }
    // 回填当成用户填的：否则切走再切回出生类体系时会被自动值顶掉
    onManualEdit();
    const d = defaultGet();
    const hit = d && d.profileId === p.id ? cacheRead(d.cacheKey) : null;
    paintDefaultBar(hit ? p : null);
    if (hit) {
      last = makeLast(hit.last);
      paint();
      flowState = FLOW.LOCKED;
      castKey = paramKey();
      paintFlowNote({ ok: true, missing: [] });
    } else {
      // 缓存里没这张盘：停在待排盘，等用户自己点那一下
      refreshFlow();
    }
  }

  /** 今天 / 昨天 / 月-日：让「最近用过」能看出是哪次 */
  function dayLabel(ts) {
    const d = new Date(ts);
    if (Number.isNaN(d.getTime())) return '';
    const day = (x) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
    const diff = Math.round((day(new Date()) - day(d)) / 86400000);
    if (diff <= 0) return '今天';
    if (diff === 1) return '昨天';
    return `${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  /** 当前页面上真实存在的入口 → 名称。存储里的 tab 值先过这张表，避免脏数据被当选择器用 */
  function entryLabels() {
    const map = {};
    document.querySelectorAll('.tab[data-tab]').forEach((b) => { map[b.dataset.tab] = b.textContent.trim(); });
    return map;
  }

  function renderRecent() {
    const row = el('recent');
    const box = el('recent-list');
    if (!row || !box) return;
    const labels = entryLabels();
    const list = (storeGet(RECENT_KEY) || []).filter((x) => x && labels[x.tab]).slice(0, RECENT_MAX);
    box.replaceChildren();
    list.forEach((x) => {
      const item = document.createElement('div');
      item.className = 'rc-item';

      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'rc-main';
      b.dataset.tab = x.tab;
      const nm = document.createElement('b');
      nm.textContent = labels[x.tab];
      b.appendChild(nm);
      const sub = [argSummary(x.args), x.shortId ? `盘号 ${x.shortId}` : ''].filter(Boolean).join(' · ');
      if (sub) {
        const s = document.createElement('span');
        s.textContent = sub;
        b.appendChild(s);
      }
      const when = dayLabel(x.at);
      if (when) {
        const i = document.createElement('i');
        i.textContent = when;
        b.appendChild(i);
      }
      // 点回来不是「切到那个 tab」而是「按那次的条件再排一遍」：
      // 只切 tab 的话表单还停在上一次的输入上，点开看到的不是那条记录对应的盘
      b.addEventListener('click', () => {
        setTab(x.tab);
        applyArgs(x.args);
        run();
      });
      item.appendChild(b);

      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'rc-del';
      del.title = '删掉这条';
      del.setAttribute('aria-label', '删掉这条');
      del.textContent = '×';
      del.addEventListener('click', () => {
        storeSet(RECENT_KEY, (storeGet(RECENT_KEY) || []).filter((y) => !(y && y.tab === x.tab && y.at === x.at)));
        renderRecent();
      });
      item.appendChild(del);
      box.appendChild(item);
    });
    row.hidden = list.length === 0;
  }

  /**
   * 排完一次盘才记一条——切 tab 不算用过（那样历史里全是点过没排过的空条目）。
   * 问卷（人格/体质）不进历史：答案只在内存里，恢复不回来；存半份答案比不存更误导。
   */
  function recordRecent(t, r) {
    if (!entryLabels()[t]) return;
    if (t === 'mbti' || t === 'constitution') return;
    const args = collectArgs();
    // 盘号剥掉 LY- 前缀再存：和结果页上的显示一致，用户嘴里的盘号就是那六位
    const shortId = String((r && r.shortId) || '').replace(/^LY-/, '');
    const item = { tab: t, at: Date.now(), args, shortId };
    // 表单字段太多时宁可只留体系名：localStorage 满了会整条静默存不进去
    if (JSON.stringify(item).length > 3000) item.args = {};
    const list = (storeGet(RECENT_KEY) || []).filter((x) => x && x.tab);
    const rest = list.filter((x) => !(x.tab === t && x.shortId === item.shortId && argSummary(x.args) === argSummary(item.args)));
    rest.unshift(item);
    storeSet(RECENT_KEY, rest.slice(0, RECENT_MAX));
    renderRecent();
  }

  /** 点入口：切 tab + 立刻算；人格问卷例外，答够 12 题才出结果 */
  function activate(next) {
    setTab(next);
    if (next === 'mbti') mbEnter();
    else if (next === 'constitution') csEnter();
    // 切体系只换表单，不排盘（任务书 1.2 第一条）。要看得点主按钮。
    else { flowState = flowState === FLOW.LOCKED ? FLOW.READY : flowState; refreshFlow(); }
  }

  // ── 我的命盘（本机档案）────────────────────────────────────────
  // 存的是「输入」而不是结果，点卡回填 + 直接出盘。存储、清洗、卡片渲染都取自
  // panel-kit 那一份实现：宿主面板里存的档案，在这个单页里同样看得见、同样能一点出盘。
  const PROF_TABS = ['bazi', 'ziwei', 'trend'];
  let profEditing = '';
  let profArmed = '';
  let profTip = '';
  // 称呼框是裸 DOM，重渲染会整块换掉：把用户敲的字存在这里，才不会因为点别的按钮被抹掉
  let profName = '';

  function renderProfiles() {
    const box = el('profwrap');
    const PP = window.__PP;
    if (!box || !PP || !PP.profilesHTML) return;
    const list = PP.profilesLoad();
    // 档案描述的是「一个人」，占事与合盘类没有可复用的出生信息，不给存入条
    const bar = PROF_TABS.indexOf(tab) >= 0 && PP.profilesBarHTML
      ? PP.profilesBarHTML({ editingId: profEditing, name: profName, tip: profTip }) : '';
    box.innerHTML = PP.profilesHTML(list, { editingId: profEditing, armedDel: profArmed, bar });
  }

  /** 回填出生信息：顺序与深链还原一致（先 setTab 再填，setTab 会按体系改可见性）。
   *  只回填，不排盘——默认盘启动走这里，绝不触发 compute（任务书 1.5 第四条）。 */
  function profFill(p) {
    // 外部改坏 / 旧版本留下的「有日期没时刻」卡：别拿当前表单里的时刻顶上，那会排成另一个人
    if (!window.__PP.profUsable(p)) {
      profTip = '这张档案没有出生时刻，先补上时刻再存一次。';
      renderProfiles();
      return false;
    }
    profName = '';
    setTab(p.kind);
    const puts = [['date', p.date], ['time', p.hourUnknown ? '' : p.time], ['gender', p.gender], ['addr', p.address]];
    for (const pair of puts) {
      const node = el(pair[0]);
      // 空出生地也要写回去：留着上一个地址，这张盘的真太阳时就会按别人的地方算
      if (node) node.value = pair[1] || '';
    }
    const hu = el('hourunknown');
    if (hu) hu.checked = !!p.hourUnknown;
    // 旧档案没存开关：按默认（都开）处理，别沿用表单此刻的勾选
    const tsBox = el('ts');
    if (tsBox) tsBox.checked = p.trueSolar !== false;
    const lzBox = el('latezi');
    if (lzBox) lzBox.checked = p.lateZi !== false;
    return true;
  }

  /** 档案卡点「用这张」：回填完当次就排（显式点击，不进历史） */
  function profApply(p) {
    if (!profFill(p)) return false;
    // 把这次回填当成「用户填的」：否则切走再切回出生类体系时会被上一次的自动值顶掉
    onManualEdit();
    run({ record: false });
    return true;
  }

  function profReadForm() {
    const PP = window.__PP;
    const v = (id) => { const n = el(id); return n ? n.value : ''; };
    const hu = el('hourunknown');
    const box = el('profwrap');
    const nameEl = box ? box.querySelector('.mp-prof-name') : null;
    const tsBox = el('ts');
    const lzBox = el('latezi');
    return PP.profFromForm({
      kind: tab, date: v('date'), time: v('time'), gender: v('gender'), address: v('addr'),
      hourUnknown: !!(hu && hu.checked),
      // 两个开关决定时柱：随档案存下来，载入才能回到当初那张盘
      trueSolar: !(tsBox && !tsBox.checked),
      lateZi: !(lzBox && !lzBox.checked),
    }, nameEl ? nameEl.value : '', profEditing || undefined);
  }

  function onProfClick(e) {
    const PP = window.__PP;
    if (!PP || !PP.profEvent) return;
    const ev = PP.profEvent(e.target);
    if (!ev) return;
    const of = (id) => PP.profilesLoad().find((x) => x.id === id);
    if (ev.action === 'use') {
      const p = of(ev.id);
      if (!p) return;
      // 没排出来就不算「排过一次」：否则缺时刻的坏卡会顶着「1 次」跳到列表最前
      profTip = '';
      if (!profApply(p)) { renderProfiles(); return; }
      PP.profilesTouch(p.id);
      renderProfiles();
      return;
    }
    if (ev.action === 'edit') {
      const p = of(ev.id);
      if (!p) return;
      profEditing = p.id;
      profName = p.label;
      profTip = '';
      renderProfiles();
      // 改名要连着能改出生信息：把档案读回输入框，用户调完再点「更新这张档案」
      const puts = [['date', p.date], ['time', p.hourUnknown ? '' : p.time], ['gender', p.gender], ['addr', p.address]];
      for (const pair of puts) {
        const node = el(pair[0]);
        // 同上：这张档案没存地址就把框清空，别让「更新」把别人的地址存进来
        if (node) node.value = pair[1] || '';
      }
      const hu = el('hourunknown');
      if (hu) hu.checked = !!p.hourUnknown;
      return;
    }
    if (ev.action === 'cancel') { profEditing = ''; profName = ''; profTip = ''; renderProfiles(); return; }
    if (ev.action === 'pin') {
      PP.profilesPin(ev.id);
      profTip = '';
      const p2 = of(ev.id);
      if (p2 && p2.pinned) {
        // 设默认：记下「上一次排出来那张盘」的键。用 castKey 反推而不是此刻表单——
        // 表单可能已经改了还没重排，那个键在缓存里根本不存在。
        const key = last && last.r && castKey ? chartKeyOf(castKey) : '';
        defaultSet({ profileId: p2.id, system: p2.kind, setAt: Date.now(), cacheKey: key });
        paintDefaultBar(p2);
      } else {
        defaultSet(null);
        paintDefaultBar(null);
      }
      renderProfiles();
      return;
    }
    if (ev.action === 'del') {
      // 删除点两次才算：第一次只把按钮变成「确认删除」，误触不会丢档案
      if (profArmed !== ev.id) { profArmed = ev.id; profTip = ''; renderProfiles(); return; }
      PP.profilesRemove(ev.id);
      // 删掉的正好是默认盘：那条记录指向的档案已经没了，留着只会让下次启动找不到人。
      // 缓存条目和页面上这张盘都不动——档案是「输入」，盘是「结果」。
      const d0 = defaultGet();
      if (d0 && d0.profileId === ev.id) {
        defaultSet(null);
        paintDefaultBar(null);
      }
      if (profEditing === ev.id) { profEditing = ''; profName = ''; }
      profArmed = '';
      profTip = '已从本机删除这张档案卡（不影响已经排出来的盘）。';
      renderProfiles();
      return;
    }
    if (ev.action === 'put') {
      const wasEditing = profEditing;
      const entry = profReadForm();
      if (!entry) { profTip = '先填好出生日期（和时刻），再存档案。'; renderProfiles(); return; }
      const res = PP.profilesPut(entry);
      if (!res.ok) { profTip = '档案没能存进本机（存储被禁用或已满），排盘不受影响。'; renderProfiles(); return; }
      profEditing = '';
      profArmed = '';
      profName = '';
      profTip = `${wasEditing ? '已更新档案' : '已存入我的命盘'}「${res.item.label}」。`;
      renderProfiles();
    }
  }

  /** 分组 / 平铺：只切显示，19 个 tab 与分组卡片两套入口始终可用 */
  function applyView(v) {
    const flat = v === 'flat';
    document.body.classList.toggle('view-flat', flat);
    document.body.classList.toggle('view-group', !flat);
    document.querySelectorAll('.view-switch [data-view]').forEach((b) => {
      const on = b.dataset.view === (flat ? 'flat' : 'group');
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    if (flat) {
      const cur = document.querySelector('.tab.on');
      if (cur) setTimeout(() => scrollTabIntoView(cur), 0);
    }
  }

  // ── 时间语义分类 ────────────────────────────────────────────────
  // birth：八字 / 紫微 —— 要的是「出生时间」，必然是过去，用示例默认，不取当前时刻
  // cast ：六爻 / 梅花 / 大六壬 —— 要的是「起卦时刻」，占的就是当下，自动取本机当前时刻
  // none ：塔罗 —— 不看时间，日期时间字段整个隐藏
  const TIME_KIND = {
    ziwei: 'birth', bazi: 'birth', hepan: 'birth',
    liuyao: 'cast', meihua: 'cast', daliuren: 'cast', qimen: 'cast',
    tarot: 'none',
    almanac: 'date', zeri: 'date', star: 'date', numerology: 'date', convert: 'date',
    trend: 'birth', fengshui: 'birth', name: 'birth',
    xiaoliuren: 'cast',
    mbti: 'none',
  constitution: 'none',
    wuyunliuqi: 'date',
    taiyi: 'date',
  };
  const SAMPLE = { date: '1990-05-12', time: '14:30' };
  const kindOf = (t) => TIME_KIND[t] || 'none';
  const isBirthTab = (t) => kindOf(t) === 'birth';

  // 用户手动改过的日期/时刻，按语义分类分别记忆；null = 没改过，跟随自动值。
  // 分两类记的原因：出生时间与起卦时刻语义不同，跨类别时上一次的输入已无意义，
  // 所以从「八字」切到「六爻」会自动换成当前时刻，而切回「八字」仍是你填的出生时间。
  // 落盘：刷新后填的东西还在（任务书验收「未设默认盘也要保留上次输入」）。
  const INPUT_KEY = 'mp.input.v1';
  const savedInput = storeGet(INPUT_KEY) || {};
  const manual = {
    birth: savedInput.birth || null,
    cast: savedInput.cast || null,
  };
  function saveManual() {
    try { storeSet(INPUT_KEY, { birth: manual.birth, cast: manual.cast }); } catch (e) { /* 存不了不影响排盘 */ }
  }

  // ── 交互状态机（任务书 A 线 1.3）─────────────────────────────
  // 六态：未填完整 / 已填未排 / 排盘中 / 已出盘锁定 / 改参数中 / 出错。
  // 一条硬规矩：参数怎么改都不进 CALCULATING，只有点主按钮才排。
  const FLOW = {
    UNFILLED: 'IDLE_UNFILLED',
    READY: 'IDLE_READY',
    CALC: 'CALCULATING',
    LOCKED: 'RESULT_LOCKED',
    EDITING: 'EDITING',
    ERROR: 'ERROR',
  };
  let flowState = FLOW.READY;
  // 出结果时记下当时的参数指纹；与此刻表单不一致 = 参数已变更、结果待更新
  let castKey = '';
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
    xiaoliuren: '小六壬用农历月/日/时掐指，也可用三个随机数起课。',    star: '星座按公历日期给出太阳星座与当日基调；同日同星座结果固定。',
    numerology: '生命数字按公历生日归约出生命路径数、生日数与态度数。',
    trend: '人生 K 线按大运与流年十神给逐年运势分，画成走势图。',
    fengshui: '风水看八宅命卦、大游年四吉四凶与流年九宫飞星；也可按坐向看门主灶倾向，或按运与坐向排玄空下卦盘。',
    name: '起名按八字喜用匹配字库五行，可评估现有名字或生成候选名。',
    mbti: '十六型人格是一份 MBTI 风格问卷：24 题分 6 页，每题按 1（完全不像）到 5（很像我）打分；答满 12 题就能出结果。',
  constitution: '中医体质是九种体质各 5 题的自评问卷：45 题分 9 页，每题按 1（没有）到 5（总是）打分；答满 27 题就能出结果，按转化分判主次体质并给调养方向，不是医学诊断。',
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
    setDateField('date', v.date);
    el('time').value = v.time;
    autoDate = v.date;
    autoTime = v.time;
  }

  /** 切 tab 时决定日期/时刻：用户填过的一律优先，都没有才给语义默认值。
   *  这里曾经是 fillDateTime(manual[k] || defaultFor(k))——切一次体系就把用户
   *  刚填的日期冲回示例默认值，任务书 1.1 说的「输入被重置回默认值」就是这一行。 */
  function applyDateTime(k) {
    if (k === 'none') return;
    const cur = { date: el('date').value, time: el('time').value };
    const same = k === ctxKind;
    const typed = same && (cur.date !== autoDate || cur.time !== autoTime) && isoDateOk(cur.date);
    if (typed) manual[k] = cur;
    const v = manual[k] || (same && typed ? cur : defaultFor(k));
    fillDateTime(v);
    saveManual();
  }

  /** 必填项校验：缺什么报什么，不给一句笼统的「参数不完整」 */
  function validateForm() {
    const miss = [];
    if (usesTimeInput() && !isoDateOk(el('date').value)) {
      miss.push(isBirthTab(tab) || tab === 'hepan' ? '出生日期' : '日期');
    }
    if (tab === 'hepan') {
      if (!isoDateOk(el('pdate').value)) miss.push('对方出生日期');
      if (el('h3on') && el('h3on').checked && !isoDateOk(el('p2date').value)) miss.push('第三方出生日期');
    }
    if (needAsk(tab) && !el('question').value.trim()) miss.push('所问之事');
    // 起名：评名字要姓 + 名；生成候选只要姓
    if (tab === 'name') {
      if (el('surname') && !el('surname').value.trim()) miss.push('姓氏');
      if (nnMode === 'assess' && el('givenname') && !el('givenname').value.trim()) miss.push('名字');
    }
    // 报数起课：三个 1–99 的数，缺一个就起不了课
    if (tab === 'xiaoliuren' && xlrMode === 'number') {
      const cn = ['第一个数', '第二个数', '第三个数'];
      ['num1', 'num2', 'num3'].forEach((id, i) => {
        if (el(id) && !String(el(id).value).trim()) miss.push(cn[i]);
      });
    }
    // 梅花数字起卦：上卦数 + 下卦数（缺了会按 0 静默出一张盘，比报错更难发现）
    if (tab === 'meihua' && mhMode === 'number') {
      if (el('upper') && !String(el('upper').value).trim()) miss.push('上卦数');
      if (el('lower') && !String(el('lower').value).trim()) miss.push('下卦数');
    }
    // 农历转公历：农历日期是唯一输入
    if (tab === 'convert' && convMode === 'lunar2solar') {
      if (el('lunardate') && !String(el('lunardate').value).trim()) miss.push('农历日期');
    }
    return { ok: miss.length === 0, missing: miss };
  }

  /** 参数指纹：只用于判断「表单与已出的结果是不是同一份参数」，不进 chart_id */
  function paramKey() {
    let a = {};
    try { a = collectArgs() || {}; } catch (e) { a = {}; }
    return JSON.stringify([tab, a]);
  }

  const goLabel = () => (el('go') ? el('go').textContent : '排盘');

  /**
   * 出盘后参数区切只读：值还在，只是不能随手改。
   * 要改只能点「修改参数」走 EDITING —— 任务书 1.3 不允许别的路。
   * select / checkbox 没有 readOnly，只能 disabled；但 disabled 不影响 value，
   * collectArgs() 读到的参数不会失真，paramKey() 也就不会莫名漂移。
   */
  function syncInputLock() {
    const bar = document.querySelector('.bar');
    if (!bar) return;
    const locked = flowState === FLOW.LOCKED;
    bar.classList.toggle('is-locked', locked);
    bar.querySelectorAll('input, select, textarea').forEach((n) => {
      // 问事层里只有「所问之事」和「询问方向」不算排盘参数：改它们只重绘解读，不动盘面。
      // 跟着参数一起锁死，出盘以后就再也改不了问法、方向选择器也点不动，等于白做。
      // 牌阵（#tcount）决定抽几张牌，仍然是参数，继续锁。
      if (n.id === 'question' || n.id === 'direction') { n.disabled = false; n.readOnly = false; return; }
      const tag = n.tagName;
      if (tag === 'SELECT' || n.type === 'checkbox' || n.type === 'radio' || n.type === 'button') n.disabled = locked;
      else n.readOnly = locked;
    });
    const eb = el('edit');
    if (eb) eb.hidden = !locked;
  }

  /** 缺项与过期的说明写在提示区，不占用结果区（结果区是给盘和解读的） */
  function paintFlowNote(v) {
    // 输入区跟着状态走：所有状态迁移最后都汇到这里，挂这一处就够，
    // 不用在每个 setState 的地方各写一遍（漏一处就是锁不住或者解不开）
    syncInputLock();
    const tip = el('tip');
    if (!tip) return;
    let note = tip.querySelector('.flow-note');
    if (!note) {
      note = document.createElement('div');
      note.className = 'flow-note';
      tip.appendChild(note);
    }
    let txt = '';
    if (flowState === FLOW.UNFILLED) txt = `还差：${v.missing.join('、')}。填好后点「${goLabel()}」。`;
    else if (flowState === FLOW.EDITING) {
      // 刚点完「修改参数」还没动参数，和真改了参数，是两件事，别用同一句话
      txt = castKey && paramKey() === castKey
        ? `改完点「${goLabel()}」更新结果，旧盘先留着。`
        : `参数已变更，结果待更新——点「${goLabel()}」重排。`;
    }
    note.textContent = txt;
    note.hidden = !txt;
  }

  /** 主按钮可用性 + 缺项提示 + 结果是否过期，一处算清 */
  function refreshFlow() {
    const v = validateForm();
    const go = el('go');
    // 问卷自带提交按钮，主按钮是隐藏的，别去动它
    if (go && go.style.display !== 'none') go.disabled = !v.ok;
    if (flowState === FLOW.CALC) {
      // 排盘中：只更新按钮与提示，状态由 run 自己收尾，别在这里抢
      paintFlowNote(v);
      return;
    }
    // 缺项优先于一切——参数都不全，谈不上「结果过期」还是「已出结果」
    if (!v.ok) {
      // 参数被删空时把旧盘收起来：标题底下挂着上一张盘，比空白更误导
      if (flowState !== FLOW.UNFILLED) {
        last = null;
        castKey = '';
        const box = el('out');
        if (box) box.innerHTML = `<div class="note">参数填完整后点「${goLabel()}」出结果。</div>`; // html-sink:ok goLabel 只返回固定按钮名（排盘/填空答案），不含任何输入
      }
      flowState = FLOW.UNFILLED;
    } else if (flowState === FLOW.UNFILLED || flowState === FLOW.ERROR) flowState = FLOW.READY;
    else if (flowState === FLOW.LOCKED && castKey && paramKey() !== castKey) flowState = FLOW.EDITING;
    paintFlowNote(v);
  }

  /** 参数变了：只更新按钮与过期标记，绝不排盘（任务书 1.5 第二条禁止项） */
  function onParamChange() {
    // 排盘中改参数也照样更新按钮与提示——CALCULATING 由 run 自己收尾
    refreshFlow();
  }

  /** 排盘前的拦停：参数不合法就停在这里，状态退到「未填完整」而不是卡在排盘中 */
  function bail(msg) {
    last = null;
    flowState = FLOW.UNFILLED;
    castKey = '';
    const out = el('out');
    if (out) out.innerHTML = `<div class="note">${msg}</div>`; // html-sink:ok msg 只有本文件里的固定文案（日期格式 / 合盘缺对方 / 缺所问之事 / 数字起卦缺数 / 农历日期 / 飞星日期），不含输入
    const go = el('go');
    if (go) go.removeAttribute('aria-busy');
    refreshFlow();
  }

  /** 当前 tab 是否真的用到日期/时刻（塔罗、人格不看时间；梅花「数字起卦」也不用）
   *  与 syncMhMode 里的显隐共用这一处判断：字段既然藏起来了，run() 就不能拿它拦人。 */
  function usesTimeInput() {
    return tab !== 'tarot' && tab !== 'mbti' && tab !== 'constitution' && !(tab === 'meihua' && mhMode === 'number');
  }

  /** 用户手动改了日期或时刻 */
  function onManualEdit() {
    const k = kindOf(tab);
    if (k === 'none') return;
    manual[k] = { date: el('date').value, time: el('time').value };
    saveManual();
    renderTip();
    // 改了日期不是要立刻重排，而是「按钮能不能点」和「旧结果过期了」要跟着变
    onParamChange();
    renderProfiles();
  }

  /** 结果头部的一行「起卦时刻」，只在真正用到时间的起卦 tab 显示 */
  function castAtHTML(k, timed, date, time) {
    if (!timed) return '';
    const d = /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : '';
    const t = /^\d{2}:\d{2}(:\d{2})?$/.test(time) ? time.slice(0, 5) : '';
    if (!d || !t) return '';
    return `<div class="cast-at">起卦时刻：<b>${d} ${t}</b>　<span>（来自本机时间，点「此刻」可重新取当下）</span></div>`;
  }

  /** 推导链整条复制：内容取自抽屉里的隐藏 textarea（与引擎 traceText 同源，不在这里重排） */
  function copyTraceMarkdown(btn) {
    const layer = btn.closest('.mp-trace-layer') || document.getElementById('mp-trace-layer');
    const box = layer && layer.querySelector('[data-trace-md]');
    const text = box ? box.value : '';
    if (!text) return;
    const done = (ok) => {
      btn.textContent = ok ? '已复制' : '复制失败';
      setTimeout(() => { btn.textContent = '复制 Markdown'; }, 1400);
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
  }

  /** 任意文本一键复制：优先 Clipboard API，失败退回 textarea + execCommand */
  function copyPlain(btn, text, idle) {
    if (!text) return;
    const done = (ok) => {
      btn.textContent = ok ? '已复制' : '复制失败';
      setTimeout(() => { btn.textContent = idle; }, 1400);
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
  }
  function copyAttr(btn, attr, idle) { return copyPlain(btn, btn.getAttribute(attr) || '', idle); }
  const copyShadow = (btn) => copyAttr(btn, 'data-shadow-copy', '复制 ID');
  const copyHandle = (btn) => copyAttr(btn, 'data-handle-copy', '复制句柄');

  // ── C3 桥替代（独立页）：复制提问 / 深链 ────────────────────────
  // 独立页没有对话输入框，这几档就是「把盘交给助手」的全部出口：
  // 完整提问贴进任意对话窗、深链发给自己或别人。
  const pageBase = () => {
    try { return String(location.href).split('#')[0]; } catch (e) { return ''; }
  };
  function bridgePackages() {
    if (!last || !last.r || !window.Engine || !window.Engine.askPackages) return null;
    // 追问框就在按钮旁边，用户刚写下的那句必须进包；没写追问时才退回「所问之事」。
    // 只读 #question 的话，命盘类根本没有这个输入框，复制出去的「所问」永远是默认开场句。
    const follow = el('askq') ? el('askq').value.trim() : '';
    const main = el('question') ? el('question').value.trim() : '';
    try {
      // interpret 一并交出去：面板已算过「直答 / 说人话」，别的模型开场就该沿用同一口径
      return window.Engine.askPackages(last.r, { question: follow || main, interpret: last.it || null, base: pageBase() });
    } catch (e) { return null; }
  }

  // ── C3 深链：打开带 #mp= 的链接时还原同一张盘 ──────────────────
  /** 读链接里的 #mp=；没有或不合法的返回 null（不报错，照旧排默认盘） */
  function readDeepLink() {
    try {
      const href = String(location.href || '');
      if (href.indexOf('mp=') < 0 || !window.Engine || !window.Engine.parseAskLink) return null;
      const deep = window.Engine.parseAskLink(href);
      if (!deep || !deep.ok) return null;
      const form = window.Engine.formOf ? window.Engine.formOf(deep) : null;
      if (!form || !form.tab) return null;
      if (!document.querySelector('.tab[data-tab="' + form.tab + '"], .tool[data-tab="' + form.tab + '"]')) return null;
      return { tab: form.tab, form, label: deep.label, question: deep.question };
    } catch (e) { return null; }
  }
  /** 把链接里的参数填进表单（在 setTab 之后调用：setTab 会按体系改字段可见性） */
  function fillDeepForm(form) {
    if (!form) return;
    const puts = [['date', form.date], ['time', form.time], ['gender', form.gender],
      ['addr', typeof form.address === 'string' ? form.address : '']];
    for (const pair of puts) {
      const node = el(pair[0]);
      if (node && pair[1]) node.value = pair[1];
    }
    if (typeof form.trueSolar === 'boolean' && el('ts')) el('ts').checked = form.trueSolar;
    if (typeof form.lateZi === 'boolean' && el('latezi')) el('latezi').checked = form.lateZi;
    if (form.lines !== undefined && el('lines')) {
      el('lines').value = Array.isArray(form.lines) ? form.lines.join(' ') : String(form.lines);
    }
    if (form.question && el('question')) el('question').value = form.question;
  }
  /** 还原提示：写明哪张盘、什么问题，以及哪些参数没填回表单（不悄悄丢参数） */
  function deepNote(deep) {
    const out = el('out');
    if (!out || !deep) return;
    const rest = window.Engine && window.Engine.restNote ? window.Engine.restNote(deep.form) : '';
    const line = '已按链接还原：' + deep.label + (deep.question ? '｜' + deep.question : '') + (rest ? '　' + rest : '');
    // 用文本节点而不是拼 HTML：链接里的问题原样显示，也不会被当成标签解析
    const note = document.createElement('div');
    note.className = 'note';
    note.textContent = line;
    out.insertBefore(note, out.firstChild);
  }

  /** 推导链抽屉：打开时把焦点交给关闭按钮，关闭后回到入口 */
  function traceOpen() {
    const layer = document.getElementById('mp-trace-layer');
    if (!layer) return;
    layer.classList.add('open');
    layer.setAttribute('aria-hidden', 'false');
    const close = layer.querySelector('[data-trace-close]');
    if (close && close.focus) close.focus();
  }
  function traceClose() {
    const layer = document.getElementById('mp-trace-layer');
    if (!layer) return;
    layer.classList.remove('open');
    layer.setAttribute('aria-hidden', 'true');
    const trigger = document.querySelector('[data-trace-open]');
    if (trigger && trigger.focus) trigger.focus();
  }

  // 上一次的卦象：改「所问之事 / 询问方向」时用它重出解读，不重摇一卦
  //
  // 这张对象以前是「谁想挂什么就挂什么」：算完先赋十来个字段，paint 里回填 it，
  // paint 回来再回填 perf。加字段不留痕迹，读到没赋过值的字段只会得到 undefined，
  // 而 paint 里的 undefined 不会报错，只会渲染出空白——错误被吃掉。
  // 所以字段在这里一次声明（LAST_FIELDS 就是白名单），谁要加字段先加进表里。
  // 分三类：结果（r/it/html/perf）、这一盘的输入（date/time/gender/address/
  // trueSolar/lateZi）、附加块（trend/caliber/shadowDiff/chenggu/marriage/life）。
  // 输入必须随盘存：档案/表单在排完之后还能改，只读表单会把生时校正贴到另一张盘上。
  const LAST_FIELDS = [
    'r', 'it', 'html', 'perf',
    'tab', 'timed', 'date', 'time', 'gender', 'address', 'trueSolar', 'lateZi',
    'trend', 'caliber', 'shadowDiff', 'chenggu', 'marriage', 'life'
  ];
  function makeLast(p) {
    const o = {};
    for (const k of LAST_FIELDS) {
      if (p && Object.prototype.hasOwnProperty.call(p, k)) o[k] = p[k];
      else if (k === 'it' || k === 'perf' || k === 'html' || k === 'r') o[k] = k === 'r' ? null : '';
      else if (k === 'trueSolar' || k === 'lateZi') o[k] = true;
      else if (k === 'timed') o[k] = false;
      else o[k] = '';
    }
    return o;
  }
  let last = null;
  /** 把当前盘 + 问题打包成问事提示并复制：方向映射到问事类型，时间默认已知（盘已起出） */
  function copyAskPrompt(btn) {
    if (!last || !last.r || !window.Engine || !window.Engine.buildEventPrompt) return;
    const Core = window.__MPCore || {};
    const q = (el('question') && el('question').value || '').trim();
    const dir = (askArgs && askArgs().direction) || 'general';
    const kind = Core.kindOfDirection ? Core.kindOfDirection(dir) : 'other';
    const gender = (el('gender') && el('gender').value) || 'male';
    let p;
    try { p = window.Engine.buildEventPrompt(last.r, { question: q, kind, gender, timeKnown: true }); }
    catch (e) { p = null; }
    if (p && p.text) copyPlain(btn, p.text, '已复制问事提示');
  }

  /**
   * 重绘前的现场快照。
   *
   * paint 换掉整个 #out，DOM 里那些「用户拨出来的状态」会一起没：展开的折叠区合上、
   * 手拨的显示开关回到 HTML 默认（改个询问方向，刚调好的简洁预设就复位成标准）、
   * 滚动位置跳到结果区顶上。这些都是重绘的副作用，不是数据变化，所以要救回来。
   *
   * 只记三类，且都按 id 记（没 id 的走序号兜底）：折叠区 open、checkbox checked、
   * 滚动位置。别的状态（输入框里的字）在 paint 里另有处理。
   */
  function snapViewState() {
    const out = el('out');
    if (!out) return null;
    const det = [];
    out.querySelectorAll('details').forEach((d, i) => {
      if (d.open) det.push(d.id || ('#' + i));
    });
    const chk = [];
    out.querySelectorAll('input[type=checkbox]').forEach((c) => {
      if (c.checked && c.id) chk.push(c.id);
    });
    return { det, chk, y: window.scrollY || 0 };
  }

  function restoreViewState(s) {
    if (!s) return;
    const out = el('out');
    if (!out) return;
    out.querySelectorAll('details').forEach((d, i) => {
      const key = d.id || ('#' + i);
      d.open = s.det.indexOf(key) >= 0;
    });
    out.querySelectorAll('input[type=checkbox]').forEach((c) => {
      if (c.id) c.checked = s.chk.indexOf(c.id) >= 0;
    });
    // 预设高亮跟着复选框走：手拨过就不是「标准」了，别让按钮亮着骗人
    const PP2 = window.__PP;
    if (PP2 && PP2.DISP_ALL) {
      const on = PP2.DISP_ALL.filter((id) => {
        const n = out.querySelector('#' + id);
        return n && n.checked;
      });
      const presets = PP2.DISP_PRESETS || {};
      let hit = '';
      Object.keys(presets).forEach((k) => {
        const set = presets[k];
        if (set.length === on.length && set.every((id) => on.indexOf(id) >= 0)) hit = k;
      });
      out.querySelectorAll('[data-pp-preset]').forEach((b) => {
        b.classList.toggle('on', !!hit && b.getAttribute('data-pp-preset') === hit);
      });
    }
    if (s.y) window.scrollTo(0, s.y);
  }

  /** 用缓存的卦象重新渲染：解读按当前的问题与方向重出，卦面本身不动 */
  function paint() {
    if (!last) return;
    // 重绘会换掉整个 #out：先记下追问框里的字，否则切方向 / 刷新推导链时用户刚打的问题会凭空消失
    const askBefore = el('askq') ? el('askq').value : '';
    const viewState = snapViewState();
    let it = null;
    try {
      it = window.Engine.interpret ? window.Engine.interpret(last.r, askArgs()) : (last.r.interpret || null);
    } catch (e) { it = null; }
    // 解析失败只在控制台留全文，用户侧看到的是「这段没生出来 + 编号」
    if (it && it.error) console.warn('[metaphysics] 解读未生成 ' + (it.errorId || ''), it.error);
    // 交叉验证结果由 compute 挂在盘面对象上，这里补进解析分节，保证与真实报告同一渲染路径
    if (it && last.r && last.r.cross && window.Engine.crossSection) {
      it.sections = [...(it.sections || []), window.Engine.crossSection(last.r.cross)];
    }
    // 段序与取舍交给 __MPCompose：与宿主面板共用同一份，不再各自拼一遍
    el('out').innerHTML = window.__MPCompose.composeResult({ // html-sink:ok 拼装入口，以下每段都出自 *HTML() 渲染器或已转义文本
      // 黄历、择日、称骨这类没有解读信封（连 it 都是 null），位置交给事实型头卡
      head: window.__PP.envHeadHTML(it, { folded: defaultFolded() }) || window.__PP.factHeadHTML(last.r && last.r.factHead),
      body: window.__PP.envBodyHTML(it, { folded: defaultFolded() }),
      chart: last.html || '',
      shortId: window.__MPCompose.shortIdHTML(last.r.shortId),
      castAt: castAtHTML(last.tab, last.timed, last.date, last.time),
      solar: window.__PP.solarLineHTML(last.r),
      interpret: window.__PP.resultWithInterpret('', it, { folded: defaultFolded(), noHead: true, noBody: true }),
      followup: followupBar(),
      extra: last.tab === 'bazi' ? `<div id="vbox">${verifyHTML()}</div><div id="rectbox">${rectifyHTML()}</div>` : '',
      revision: window.__PP.revisionHTML(last.r.revision),
      handle: window.__PP.handleHTML(last.r.handle),
      shadow: window.__PP.shadowHTML(last.r.shadow, last.shadowDiff),
      trace: window.__PP.traceHTML(last.r.trace, last.r.system, last.r.traceText),
      caliber: window.__PP.caliberHTML(last.caliber),
      perf: last.perf ? window.__PP.perfHTML(last.perf) : '',
      exportBar: exportBar(),
    }, { system: last.r && last.r.system });
    last.it = it;
    restoreViewState(viewState);
    const askNow = el('askq');
    if (askNow && askBefore) askNow.value = askBefore;
     // 问事体系的「复制问事提示」按钮：paint 重绘后重新挂一次（innerHTML 会清掉旧监听）
    const askBtn = el('out').querySelector('.mp-askcopy');
    if (askBtn) askBtn.addEventListener('click', () => copyAskPrompt(askBtn));
  }

  /** 追问区：只对已算好的盘发问，不重新起盘 */
  function followupBar() {
    return `<div class="askbox no-print">
      <input id="askq" maxlength="120" placeholder="追问：如 2027 年事业怎么样（回车提交）">
      <button type="button" data-act="ask">追问</button>
      <button type="button" data-act="copyask" title="把这张盘和上面输入的问题整理成一段提问，粘到任意 AI 对话窗都能用">复制提问</button>
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
    return `<div class="mp-verify"><div class="mp-verify-h">先核对过去几年：这盘说的事，对得上吗</div>
      ${rows.map(row).join('')}
      <div class="mp-verify-foot"><button type="button" class="mp-btn ghost" data-calfit="1">算贴合度</button>
      <span id="fitout" class="mp-verify-fit">${pastFit ? `命中 ${pastFit.yes}/${pastFit.answered}（${pastFit.level}）：${pastFit.advice}` : ''}</span></div></div>`;
  }

  function rectifyHTML() {
    const rows = rectEvents.map((ev, i) => `<div class="mp-rect-row">
      <input id="ry${i}" type="number" min="1900" max="2100" value="${ev.year}" class="mp-input" style="flex:1">
      <select id="rk${i}" class="mp-input" style="flex:1">
        ${[['career', '事业变动'], ['wealth', '财运'], ['love', '感情'], ['move', '搬迁/出行'], ['health', '健康'], ['other', '其他']]
    .map(([v, l]) => `<option value="${v}"${ev.kind === v ? ' selected' : ''}>${l}</option>`).join('')}
      </select></div>`).join('');
    return `<div class="mp-rect"><div class="mp-verify-h">不确定几点出生？填几件过去的事，反推时辰</div>${rows}
      <button type="button" class="mp-btn ghost" data-rectify="1">反推时辰</button>
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
        gender: last.gender,
        events,
        lateZi: last.lateZi !== false,
        trueSolar: last.trueSolar !== false,
        address: last.address || undefined,
      }) : { error: '当前页面未加载生时校正模块' };
    } catch (e) { rectOut = { error: e && e.message ? e.message : String(e) }; }
    const out = el('rectout');
    if (out) out.innerHTML = rectOutHTML();
  }

  // 导出：走浏览器自带打印 → 另存 PDF。不引第三方库，盘面是纯 DOM+CSS，打印保真度够。
  // 打印样式在 build-html.mjs 的 @media print 里（隐藏输入区与按钮，只留抬头与结果）。
  /** 反馈分类：不在页面上摆按钮（入口只留一个「有疑问？」），写进邮件正文让用户打勾 */
  const FB_KINDS = ['排错了', '看不懂', '建议', '其他'];

  function feedbackMail() {
    const v = typeof window.__MP_VER === 'string' ? window.__MP_VER : '';
    const shortId = String((last && last.r && last.r.shortId) || '').replace(/^LY-/, '');
    const input = [
      (last && last.date) || '',
      (last && last.time) || '',
      (last && last.gender) || '',
    ].filter(Boolean).join(' ');
    const ts = el('ts');
    const lz = el('latezi');
    const hu = el('hourunknown');
    const body = [
      '版本：' + (v || '未知'),
      '体系：' + ((last && (entryLabels()[last.tab] || last.tab)) || '无'),
      '盘号：' + (shortId || '无'),
      '输入：' + (input || '无'),
      '出生地：' + ((last && last.address) || '未填')
        + (ts ? '（真太阳时 ' + (ts.checked ? '开' : '关') + '）' : ''),
      '开关：晚子时换日 ' + (lz ? (lz.checked ? '开' : '关') : '—')
        + '／时辰未知 ' + (hu && hu.checked ? '是' : '否'),
      '',
      '分类（留一个，其余删掉）：' + FB_KINDS.join(' / '),
      '',
      '哪里不对 / 哪里没看懂：',
      '',
      '（截图可以直接贴在附件里）',
    ].join('\n');
    return 'mailto:1129440028@qq.com'
      + '?subject=' + encodeURIComponent('[反馈] 烛微命盘' + (v ? ' v' + v : '') + (shortId ? ' ' + shortId : ''))
      + '&body=' + encodeURIComponent(body);
  }

  /**
   * 应验提示：命理是私事，所以只问不催——不自动存、不上传，点「不再提示」就永远别再出现。
   * 存的是「别再提」这件事本身，也只在本地。
   */
  function nudgeHTML() {
    let off = false;
    try { off = window.localStorage.getItem('dsh-metaphysics/nudge-off') === '1'; } catch (e) { off = false; }
    if (off) return '';
    return `<p class="nudge no-print">这张盘只在你自己的设备上算，<b>不上传、不联网</b>。过些天回头想看看它准不准，上面「记准 / 记不准」点一下就行——愿意记就记，不记也能照常用。<button type="button" data-act="nudge-off" title="以后不再出现这行">不再提示</button></p>`;
  }

  function exportBar() {
    // 按钮统一「动词 + 对象」、四字以内：手机上这一排会折成两行，
    // 「存长图」三个字，一行能并两个；原来六字写法把后面的按钮挤出屏幕。
    return `<div class="exp no-print">
      <button type="button" data-act="reform" title="回到上面的条件，改完再排一次">改条件</button>
      <button type="button" data-act="pdf">存 PDF</button>
      <button type="button" data-act="print">打印</button>
      <button type="button" data-act="md">存 .md</button>
      <button type="button" data-act="png">存长图</button>
      <button type="button" data-act="link" title="把这张盘的参数编进链接：打开就还原同一张盘，也能直接发给别人">复制链接</button>
      <button type="button" data-act="case" title="把这张盘存进本机卦例库，日后可回看">存卦例</button>
      <button type="button" data-act="hit" title="觉得这张盘说得准：记一条「应验」进卦例库">记准</button>
      <button type="button" data-act="miss" title="觉得这张盘不准：记一条「未应」进卦例库">记不准</button>
      <span class="hint">长图是 PNG 摘要卡（一页读懂 + 首张表）；.md 存档；深链还原同一张盘（编码不是加密，别公开贴）<br>有疑问？<a href="${feedbackMail()}" title="邮件里已经带好版本、盘号、输入与开关，直接写哪里不对就行">1129440028@qq.com</a></span>
    </div>${nudgeHTML()}`;
  }

  /** 从 last 与表单拼卦例 entry：只存参数，不存盘面（与面板卦例库同构） */
  function caseEntryFromLast() {
    if (!last || !last.r) return null;
    const hu = el('hourunknown');
    return {
      kind: last.tab || '',
      date: last.date || '',
      // 时辰未知时 time 是占位值，不能存成假正午
      time: hu && hu.checked ? '' : (last.time || ''),
      hourUnknown: !!(hu && hu.checked),
      gender: last.gender || '',
      address: last.address || '',
      trueSolar: last.trueSolar !== false,
      lateZi: last.lateZi !== false,
      at: Date.now(),
    };
  }

  function caseMark(btn, act) {
    const PP = window.__PP;
    if (!PP || !PP.casesAdd || !btn) return;
    const entry = caseEntryFromLast();
    if (!entry) return;
    const status = act === 'hit' ? 'hit' : act === 'miss' ? 'miss' : 'pending';
    const done = act === 'hit' ? '已记「准」' : act === 'miss' ? '已记「不准」' : '已存卦例库';
    const idle = act === 'hit' ? '记准' : act === 'miss' ? '记不准' : '存入卦例库';
    let okSaved = false;
    try {
      const r = PP.casesAdd(entry, { status });
      okSaved = !!(r && r.ok);
    } catch (e) { /* 存储被禁用也不打断排盘 */ }
    btn.textContent = okSaved ? done : '存储不可用';
    setTimeout(() => { btn.textContent = idle; }, 1600);
  }

  function onExportClick(e) {
    const b = e.target && e.target.closest ? e.target.closest('.exp [data-act], .nudge [data-act]') : null;
    if (!b) return;
    if (b.dataset.act === 'nudge-off') {
      try { window.localStorage.setItem('dsh-metaphysics/nudge-off', '1'); } catch (err) { /* 存储被禁用也照样收起这一行 */ }
      const p = b.closest('.nudge');
      if (p) p.remove();
      return;
    }
    if (b.dataset.act === 'md') { downloadReport(); return; }
    if (b.dataset.act === 'png') { downloadCard(); return; }
    // 改条件重排：手机上看完结果要改日期，得一路滚回顶部找输入框；这一下直接带回去。
    // 只滚动不改值——参数留着，用户可能只想动一项。
    if (b.dataset.act === 'reform') {
      const bar = document.querySelector('.bar');
      if (bar && bar.scrollIntoView) bar.scrollIntoView({ block: 'start', behavior: 'smooth' });
      const d = el('date');
      if (d && d.focus) d.focus({ preventScroll: true });
      return;
    }
    if (b.dataset.act === 'case' || b.dataset.act === 'hit' || b.dataset.act === 'miss') {
      caseMark(b, b.dataset.act);
      return;
    }
    if (b.dataset.act === 'link') {
      const pkg = bridgePackages();
      if (!pkg || !pkg.link) {
        b.textContent = '没有深链';
        setTimeout(() => { b.textContent = '复制深链'; }, 1400);
        return;
      }
      copyPlain(b, pkg.link, '复制深链');
      return;
    }
    window.print();
  }

  /** 存长图：Canvas 直出 PNG，零依赖；不支持时提示 */
  function downloadCard() {
    if (!last || !last.r) return;
    const url = window.__PP.summaryCardPNG ? window.__PP.summaryCardPNG(last.r, last.it || null) : '';
    if (!url) { alert('当前浏览器不支持 Canvas 导出，请改用「存 PDF」'); return; }
    const a = document.createElement('a');
    a.href = url;
    a.download = `烛微命盘摘要-${last.r.system}-${last.date || ''}.png`;
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
    a.download = `烛微命盘报告-${last.r.system}-${last.date || ''}.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }

  async function run(opts) {
    // 切 tab / 恢复档案 / 开页面自动排的那一版不进历史：那不是用户要的那次
    const keepRecent = !(opts && opts.record === false);
    // 同参数再点一次：连盘面 HTML 一起从本机读出来，不进 CALC、不调 compute。
    // force 留给「重设」这种显式动作，跳过缓存真算一遍。
    const ck = chartKeyOf();
    if (!(opts && opts.force)) {
      const hit = cacheRead(ck);
      if (hit) {
        last = makeLast(hit.last);
        paint();
        flowState = FLOW.LOCKED;
        castKey = paramKey();
        paintFlowNote({ ok: true, missing: [] });
        return;
      }
    }
    // 进入 CALCULATING：按钮在这期间不可点，避免连点排出两张盘
    flowState = FLOW.CALC;
    const goBtn0 = el('go');
    if (goBtn0) { goBtn0.disabled = true; goBtn0.setAttribute('aria-busy', 'true'); }
    const runStart = mpNow();
    const myRun = ++runSeq;
    const startTab = tab;
    const date = el('date').value;
    if (usesTimeInput() && !isoDateOk(date)) {
      return bail('<div class="err">请填写公历日期，按「年-月-日」输入，例如 1990-05-12。</div>');
    }
    if (tab === 'hepan' && !isoDateOk(el('pdate').value)) {
      return bail('<div class="err">请填写对方的公历出生日期，按「年-月-日」输入，例如 1992-08-15。</div>');
    }
    if (tab === 'hepan' && el('h3on') && el('h3on').checked && !isoDateOk(el('p2date').value)) {
      return bail('<div class="err">请填写第三方的公历出生日期，按「年-月-日」输入，例如 1990-01-01。</div>');
    }
    // 勾了「时辰未知」就不读钟点：读出来的只是占位值，用它排出来的时柱是编的
    const hourUnknown = !!(el('hourunknown') && el('hourunknown').checked) && (tab === 'bazi' || tab === 'trend');
    const time = hourUnknown ? '12:00' : el('time').value;
    let lineWarn = '';
    const timed = kindOf(tab) === 'cast' && usesTimeInput();
    // 所问之事必填：不给一份没有落点的解读
    if (needAsk(tab) && !el('question').value.trim()) {
      markAskInvalid(true);
      return bail('<div class="err">请先填写「所问之事」——一句话即可，例如：今年是否适合换工作？</div>');
    }
    markAskInvalid(false);
    const args = { system: tab };
    // 人格问卷不是盘：不挂影子盘 ID，避免把「第几次答到第几题」当成一张盘存档
    args.shadow = tab !== 'mbti' && tab !== 'constitution';
    // 推导链只覆盖六爻 / 八字 / 紫微
    args.trace = tab === 'liuyao' || tab === 'bazi' || tab === 'ziwei' || tab === 'qimen' || tab === 'daliuren';
    if (tab !== 'tarot') args.datetime = `${date}T${time}`;
    // 人生K线也是出生盘：出生地决定真太阳时，落进时柱后会改变整条运程
    if (tab === 'bazi' || tab === 'ziwei' || tab === 'hepan' || tab === 'trend') {
      // 合盘主方同样要性别与出生地：引擎里合盘的性别是必填，地址决定真太阳时
      args.gender = el('gender').value;
      if (hourUnknown) args.hourUnknown = true;
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
        // 换过 tab 或又点了一次：这一次作废，让最新那次去排（下面读的全是新 tab 的控件）
        if (myRun !== runSeq || startTab !== tab) return;
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
      if (el('h3on') && el('h3on').checked) {
        args.partner2 = {
          datetime: `${el('p2date').value}T${el('p2time').value}`,
          gender: el('p2gender').value,
          address: el('p2addr').value.trim() || undefined,
          trueSolar: el('ts').checked,
        };
      }
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
          return bail('数字起卦要填两个数：第一个数定上卦，第二个数定下卦。');
        }
        args.upper = Number(u);
        args.lower = Number(l);
        if (el('changing').value !== '') args.changing = Number(el('changing').value);
      }
    }
    if (tab === 'tarot') args.spread = (el('tcount') && el('tcount').value) || 'three';
    // 速查类：各体系自己的最小输入
    if (tab === 'zeri') {
      args.startDate = date;
      args.task = el('ztask').value;
      args.days = Number(el('zdays').value) || 30;
      if (el('zsheng').value) args.shengXiao = el('zsheng').value;
      const cand = el('zcand') ? el('zcand').value.split(/[,，、\s]+/).filter(Boolean) : [];
      if (cand.length) args.candidates = cand;
    }
    if (tab === 'xiaoliuren') {
      args.mode = xlrMode;
      if (xlrMode === 'number') {
        args.num1 = Number(el('num1').value) || undefined;
        args.num2 = Number(el('num2').value) || undefined;
        args.num3 = Number(el('num3').value) || undefined;
      } else {
        args.date = date;
        // Number('') 是 0：时刻框被清空时不能悄悄按子时起课，退回正午
        const hm = /^(\d{1,2}):/.exec(String(time));
        args.hour = hm ? Number(hm[1]) : 12;
      }
    }
    if (tab === 'convert') {
      args.mode = convMode;
      if (convMode === 'lunar2solar') {
        const m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(el('lunardate').value).trim());
        // 走 bail 而不是直接 return：直接 return 会把状态停在 CALCULATING，
        // 按钮的 disabled / aria-busy 再也没人恢复，用户只能刷新页面。
        if (!m) return bail('农历日期要按「年-月-日」填，例如 2026-9-17；闰月单独勾选。');
        args.lunarYear = Number(m[1]); args.lunarMonth = Number(m[2]); args.lunarDay = Number(m[3]);
        args.isLeapMonth = !!(el('leapm') && el('leapm').checked);
        delete args.datetime;
      }
    }
    if (tab === 'mbti') {
      delete args.datetime;
      const nums = mbAnswersForEngine();
      if (nums.length) args.answers = nums;
    }
    if (tab === 'constitution') {
      // 体质问卷不剪尾：引擎按题位对齐九种体质，null 表示跳过，长度必须还是 45
      delete args.datetime;
      args.answers = csAns.slice();
    }
    if (tab === 'trend' && hourUnknown) args.hourUnknown = true;
    // 性别 / 出生地 / 两个开关已在上面的出生盘分支里给齐，这里只补 K 线自己的参数
    if (tab === 'trend') args.toAge = Number(el('toage').value) || 60;
    if (tab === 'fengshui') {
      args.action = fsMode;
      if (fsMode === 'natal') { args.gender = el('gender').value; }
      else {
        args.sitting = el('sitting').value.trim();
        args.facing = el('facing').value.trim();
        delete args.datetime;
        if (fsMode === 'xuankong') {
          args.period = Number(el('fsperiod').value) || 9;
          const off = el('fsoffset') ? el('fsoffset').value.trim() : '';
          if (off !== '') args.sittingOffset = Number(off);
          const fd = el('fsdate') ? el('fsdate').value.trim() : '';
          if (fd && !isoDateOk(fd)) {
            return bail('飞星日期要按「年-月-日」填，例如 2026-11-03。');
          }
          if (fd) args.fortuneDate = fd;
          const ft = el('fstime') ? el('fstime').value.trim() : '';
          if (ft) args.fortuneTime = ft;
        }
      }
    }
    if (tab === 'name') {
      args.action = nnMode;
      args.surname = el('surname').value.trim();
      if (nnMode === 'generate') {
        args.gender = el('gender').value; args.limit = Number(el('nlimit').value) || 6;
        args.trueSolar = el('ts').checked; args.lateZi = el('latezi') ? el('latezi').checked : true;
      } else {
        args.givenName = el('givenname').value.trim();
        // 生辰留着：填了就按喜用判、空着 engine 自己只评字面五行
        if (!date || !time) delete args.datetime;
      }
    }
    // 问题与卦象一起交给解读：解读按它展开，并在开头回显供你确认
    if (needAsk(tab)) args.question = el('question').value.trim();
    // 六爻的用神由「询问方向」定；不传给 compute 的话，盘面与推导链都会退成综合
    if (tab === 'liuyao') args.direction = el('direction').value;
    // 奇门的用神同样由方向定，推导链的「用神落宫」层要用到
    if (tab === 'qimen') args.direction = el('qdir').value;
    try {
      const computeStart = mpNow();
      // 同面板：当前日期由界面给，引擎不读挂钟（保证同一条线可复现）
      if (tab === 'trend' && !args.asOf && Core.todayStamp) args.asOf = Core.todayStamp();
      const r = window.Engine.compute(args);
      const computeMs = mpNow() - computeStart;
      // 影子盘：先与本地上一张同 baseId 的盘比对，再存档；失败不影响主结果
      let shadowDiff = null;
      try { shadowDiff = window.__PP.shadowTrack ? window.__PP.shadowTrack(r) : null; } catch (e) { shadowDiff = null; }
      // 八字结果里直接嵌人：同一份出生信息再排一次称骨与 trend（确定性、无网络）。
      // 时辰未知时不嵌称骨：称骨四柱缺时辰不可算，拿正午占位会编出一个假骨重。
      let chenggu = null;
      if (tab === 'bazi' && !hourUnknown && window.Engine.buildChenggu) {
        try {
          chenggu = window.Engine.buildChenggu({ year: Number(date.slice(0, 4)), month: Number(date.slice(5, 7)), day: Number(date.slice(8, 10)), hour: Number(time.slice(0, 2)), minute: Number(time.slice(3, 5)), lateZi: args.lateZi !== false });
        } catch (e) { chenggu = null; }
      }
      // 婚姻层：吃上面这张盘，不重排；失败不影响主结果
      let marriage = null;
      if (tab === 'bazi' && window.Engine.buildMarriage) {
        try { marriage = window.Engine.buildMarriage(r); } catch (e) { marriage = null; }
      }
      let life = null;
      if (tab === 'bazi' && window.Engine.buildFacets) {
        try { life = window.Engine.buildFacets(r); } catch (e) { life = null; }
      }
      let trend = null;
      if (tab === 'bazi') {
        try {
          trend = window.Engine.compute({
            system: 'trend', datetime: `${date}T${time}`, gender: args.gender, toAge: 100,
            trueSolar: args.trueSolar, lateZi: args.lateZi !== false,
            ...(Core.todayStamp ? { asOf: args.asOf || Core.todayStamp() } : {}),
            ...(args.address ? { address: args.address } : {}),
            ...(typeof args.longitude === 'number' ? { longitude: args.longitude } : {}),
            ...(args.geo ? { geo: args.geo } : {}),
          });
        } catch (e) { trend = null; }
      }
      // 口径对照：只对 bazi / ziwei / qimen 有开关表；额外排 2–3 张盘，失败不影响主结果
      let caliber = null;
      if (window.Engine.caliberCompare) {
        try { caliber = window.Engine.caliberCompare(args); } catch (e) { caliber = null; }
      }
      const chart0 = (tab === 'ziwei' ? window.__PP.ziweiHTML(r)
        : tab === 'bazi' ? (window.__PP.baziHTML(r, { chenggu, marriage, life }) + (trend ? window.__PP.trendHTML(trend, { brief: false }) : ''))
          : tab === 'hepan' ? (r.chart === 'ziwei' ? window.__PP.ziweiHepanHTML(r) : window.__PP.hepanHTML(r))
            : tab === 'qimen' ? (window.__PP.qimenHTML(r) + window.__PP.qimenFactsHTML(r))
              : tab === 'meihua' ? window.__PP.meihuaHTML(r)
                : tab === 'daliuren' ? window.__PP.daliurenHTML(r)
                  : tab === 'tarot' ? window.__PP.tarotHTML(r)
                    : tab === 'liuyao' ? window.__PP.liuyaoHTML(r)
                      : tab === 'almanac' ? window.__PP.almanacHTML(r)
                      : tab === 'zeri' ? window.__PP.zeriHTML(r)
                        : tab === 'trend' ? window.__PP.trendHTML(r)
                          : tab === 'name' ? window.__PP.nameHTML(r)
                          : tab === 'mbti' ? window.__PP.mbtiHTML(r)
                          : tab === 'constitution' ? window.__PP.constitutionHTML(r)
                            : tab === 'wuyunliuqi' ? window.__PP.wuyunliuqiHTML(r)
                            : tab === 'taiyi' ? window.__PP.taiyiHTML(r)
                          : tab === 'fengshui' ? window.__PP.fengshuiHTML(r)
                          : window.__PP.quickHTML(r));
      // 独立页按和面板一样的口径：盘面第一、白话其次、结论方框最后（早前只在 app.js 做，独立页没跟上）。
      const cut = chart0.startsWith('<section class="mp-br"') ? chart0.indexOf('</section>') : -1;
      const html = (lineWarn ? `<div class="note">${lineWarn}</div>` : '')
        + (cut < 0 ? chart0 : chart0.slice(cut + 10))
        + window.__PP.plainHTML(r)
        + (cut < 0 ? '' : chart0.slice(0, cut + 10));
      // 新盘就是新的一轮：上一次的自评、贴合度、候选时辰不能跟着贴到这张盘上
      // （它们只在模块里存着，重绘不会自己清）。
      pastMarks = {}; pastFit = null; rectOut = null;
      // 生时校正要按「这张盘自己的输入」反推：档案/表单在排完之后还能改，
      // 只读 last.date 而性别、出生地读表单，候选时辰就会贴到另一张盘上
      last = makeLast({ r, html, tab, date, time, timed, trend, caliber, shadowDiff, chenggu, marriage, life,
        gender: args.gender || el('gender').value,
        address: typeof args.address === 'string' ? args.address : '',
        trueSolar: typeof args.trueSolar === 'boolean' ? args.trueSolar : true,
        lateZi: typeof args.lateZi === 'boolean' ? args.lateZi : true });
      const paintStart = mpNow();
      paint();
      // 历史在这里记：这是「排完一次盘」的唯一出口，带上盘号与这次用的表单值
      if (keepRecent) recordRecent(startTab, r);
      // 出盘了：锁成「已出结果」，记下这次用的参数指纹；之后改参数只标过期、不重排
      flowState = FLOW.LOCKED;
      castKey = paramKey();
      const goBtn = el('go');
      if (goBtn) { goBtn.disabled = false; goBtn.removeAttribute('aria-busy'); }
      paintFlowNote({ ok: true, missing: [] });
      // 渲染＝组 HTML + 写入 DOM 的同步时间；浏览器真正绘制在下一帧，这里不假装量到
      const renderMs = mpNow() - paintStart;
      last.perf = { computeMs, renderMs, totalMs: mpNow() - runStart };
      // 排成功就落一份本机缓存：整份 last（含 r / html）都存，下次同参数直出，不重算。
      // 键复用 run 开头算好的 ck，不在末尾二次哈希。
      try {
        const snap = collectArgs();
        cacheWrite(ck, { chartId: (r && r.chart_id) || ck, system: tab,
          profileSnapshot: snap, envelope: r, createdAt: Date.now(), last: makeLast(last) });
        // 设过默认盘但还没记下键：此刻表单正是这个人，把这张盘的键补上
        const d = defaultGet();
        if (d && !d.cacheKey && defaultMatchesForm(d)) { d.cacheKey = ck; defaultSet(d); }
      } catch (e) { /* 缓存写失败不影响这次排盘 */ }
      // 耗时行已经是 composeResult 的一个 parts 键，只有 dev 视图才会被拼进去；
      // 用户视图里连生成都不生成（不再用 insertAdjacentHTML 事后补插——那会把技术行
      // 塞进用户视图，且打印/导出时跟着走）。dev 视图下重绘一次让它出现。
      if (window.__MPCompose.devOn()) paint();
    } catch (e) {
      last = null;
      // 出错也是终态：按钮要能再点一次（ERROR → READY 由 refreshFlow 在参数合法时放行）
      flowState = FLOW.ERROR;
      castKey = '';
      const goBtn1 = el('go');
      if (goBtn1) { goBtn1.disabled = false; goBtn1.removeAttribute('aria-busy'); }
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
    // 人格问卷没有时间可补：先看答够没有，再走同一套计算
    if (tab === 'mbti') { mbSubmit(); return; }
    if (tab === 'constitution') { csSubmit(); return; }
    const k = kindOf(tab);
    // 只有起卦类（六爻/奇门/塔罗/梅花/小六壬…）才「没手动填就取当下」——
    // 起卦问的是此刻的场，补当下是对的。
    // 命盘类（八字/紫微/合盘）与日期类（黄历/择日/农历）不能这样补：
    // 页面上明明写着 1990-05-12，点一下排盘却按今天算，用户看到的和排到的不是一个东西。
    if (k === 'cast' && usesTimeInput() && !manual[k]) fillDateTime(nowParts());
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

  const QUICK = ['almanac', 'convert', 'zeri', 'xiaoliuren', 'star', 'numerology', 'trend', 'fengshui', 'name', 'mbti', 'constitution', 'wuyunliuqi', 'taiyi'];

  // 窄屏下 tab 栏是单行横滑：切到靠后的 tab 时把它滚到可视区中间，
  // 否则点了「人格」页面变了、高亮却停在屏幕外，看着像没响应
  function scrollTabIntoView(tabEl) {
    const strip = tabEl && tabEl.parentElement;
    if (!strip || strip.scrollWidth <= strip.clientWidth + 1) return;
    const t = tabEl.getBoundingClientRect();
    const s = strip.getBoundingClientRect();
    const left = strip.scrollLeft + (t.left - s.left) - (s.width - t.width) / 2;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    if (strip.scrollTo) strip.scrollTo({ left, behavior: reduce ? 'auto' : 'smooth' });
    else strip.scrollLeft = left;
  }

  function setTab(next) {
    tab = next;
    const k = kindOf(tab);
    const birth = isBirthTab(tab);
    document.querySelectorAll('.tab').forEach((b) => b.classList.toggle('on', b.dataset.tab === tab));
    document.querySelectorAll('.tool').forEach((b) => b.classList.toggle('on', b.dataset.tab === tab));
    scrollTabIntoView(document.querySelector('.tab.on'));
    // 出生信息块拆成两层：出生地/真太阳时/联网所有 birth 类都要；
    // 晚子时换日与八字×紫微交叉验证只对八字有意义，别让选风水、起名的人也看到它们。
    const solar = el('for-solar');
    if (solar) solar.style.display = birth ? '' : 'none';
    // 出生信息共用这件事要写在看得见的地方：它不只是一个字段，是六个体系读的同一份值
    const share = el('for-share');
    if (share) share.style.display = birth ? '' : 'none';
    el('for-bazi').style.display = tab === 'bazi' ? '' : 'none';
    // 高级选项：整块只在「有出生信息或要交叉验证」时露；里面两项各自还按体系分
    const adv = el('for-adv');
    if (adv) adv.style.display = (birth || tab === 'bazi' || tab === 'ziwei') ? '' : 'none';
    const advOnline = el('adv-online');
    if (advOnline) advOnline.style.display = birth ? '' : 'none';
    const advCross = el('adv-cross');
    if (advCross) advCross.style.display = (tab === 'bazi' || tab === 'ziwei') ? '' : 'none';
    el('for-gender').style.display = birth ? '' : 'none';
    el('for-liuyao').style.display = tab === 'liuyao' ? '' : 'none';
    el('for-meihua').style.display = tab === 'meihua' ? '' : 'none';
    el('for-hepan').style.display = tab === 'hepan' ? '' : 'none';
    el('for-qimen').style.display = tab === 'qimen' ? '' : 'none';
    const fm = el('for-mbti');
    if (fm) fm.style.display = tab === 'mbti' ? '' : 'none';
    const csForm = el('for-constitution');
    if (csForm) csForm.style.display = tab === 'constitution' ? '' : 'none';
    const fq = el('for-quick');
    if (fq) fq.style.display = QUICK.indexOf(tab) >= 0 ? '' : 'none';
    // 所问之事 + 询问方向：六爻 / 梅花 / 六壬 / 塔罗这些问事的体系才显示
    el('for-ask').style.display = needAsk(tab) ? '' : 'none';
    const fc = el('for-count');
    if (fc) fc.style.display = tab === 'tarot' ? '' : 'none';
    const castLabel = tab === 'qimen';
    // 与 TIME_KIND 的 date 类共用一处口径：农历（convert）原先漏在名单外，标签错写成「起卦日期」
    const dateLabel = kindOf(tab) === 'date';
    el('lbl-date').textContent = birth ? '出生日期（公历）' : dateLabel ? '日期（公历）' : (castLabel ? '起局日期（公历）' : '起卦日期（公历）');
    el('lbl-time').textContent = birth ? '出生时刻' : (castLabel ? '起局时刻' : '起卦时刻');
    const qk = el('for-quick');
    if (qk) {
      el('qk-zeri').style.display = tab === 'zeri' ? '' : 'none';
      el('qk-convert').style.display = tab === 'convert' ? '' : 'none';
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
    // 人格问卷自带「看结果」和「清空」：底部再放一个主按钮就是两个一样的入口
    const quizOn = tab === 'mbti' || tab === 'constitution';
    el('go').style.display = quizOn ? 'none' : '';
    // 「看示例」在问卷下也留：第一次进来面对 24 / 45 道题，没有样例就不知道
    // 这道题在问什么程度。问卷模式下它填一组示例答案并直接出结果。
    const sampleBtn = el('sample');
    if (sampleBtn) {
      sampleBtn.style.display = '';
      sampleBtn.textContent = quizOn ? '填空答案' : '看示例';
      sampleBtn.title = quizOn ? '把整份问卷按一组示例答案填好，直接看结果' : '用固定示例盘看完整报告';
    }
    const clearBtn = el('clear');
    if (clearBtn) clearBtn.style.display = '';
    syncMhMode();      // 内含 for-date / for-time 的显隐（塔罗、梅花数字起卦都隐藏）
    applyDateTime(k);  // 用户填过的优先，没填过才给语义默认值
    ctxKind = k;
    renderTip();
    renderProfiles();  // 档案条只在命盘类体系出现，切 tab 要跟着换
    // 切体系换的是「要排的东西」：上一个体系的结果要收起来，否则新体系的标题底下
    // 挂着旧盘，比空白更误导。出生信息不动——跨体系共用同一份（任务书 1.2 第六条）。
    last = null;
    flowState = FLOW.READY;
    castKey = '';
    const outBox = el('out');
    if (outBox) outBox.innerHTML = `<div class="note">参数填好后点「${goLabel()}」出结果。</div>`; // html-sink:ok goLabel 只返回固定按钮名（排盘/填空答案），不含任何输入
    refreshFlow();
  }

  function syncMhMode() {
    document.querySelectorAll('#for-meihua .seg button').forEach((b) => b.classList.toggle('on', b.dataset.mode === mhMode));
    const mhNum = tab === 'meihua' && mhMode === 'number';
    el('mh-num').style.display = mhNum ? '' : 'none';
    // 梅花「数字起卦」不参与时间计算，日期/时刻在此模式下隐藏，避免误导；人格问卷同样与日期无关
    const showDT = usesTimeInput();
    el('for-date').style.display = showDT ? '' : 'none';
    // 「时辰未知」只对八字与人生K线开放：紫微/合盘没有时支就没有盘，不提供这个勾选
    const canUnknown = tab === 'bazi' || tab === 'trend';
    const hu = el('hourunknown');
    if (hu) {
      const box = el('for-hourunknown');
      if (box) box.style.display = showDT && canUnknown ? '' : 'none';
      if (!canUnknown && hu.checked) hu.checked = false;
    }
    const hideTime = showDT && kindOf(tab) !== 'date' && !(canUnknown && hu && hu.checked);
    el('for-time').style.display = hideTime ? '' : 'none';
  }

  /** 速查类子表单：择日/小六壬/人生K/风水/起名各自的小块与分段按钮 */
  function syncQuick() {
    if (!el('qk-xiaoliuren')) return;
    document.querySelectorAll('#xlrmode button').forEach((b) => b.classList.toggle('on', b.dataset.mode === xlrMode));
    el('xlr-num').style.display = xlrMode === 'number' ? '' : 'none';
    document.querySelectorAll('#fsmode button').forEach((b) => b.classList.toggle('on', b.dataset.mode === fsMode));
    el('fs-advise').style.display = fsMode !== 'natal' ? '' : 'none';
    el('fs-advise2').style.display = fsMode !== 'natal' ? '' : 'none';
    for (const id of ['fs-period', 'fs-offset', 'fs-date', 'fs-time']) {
      if (el(id)) el(id).style.display = fsMode === 'xuankong' ? '' : 'none';
    }
    document.querySelectorAll('#nnmode button').forEach((b) => b.classList.toggle('on', b.dataset.mode === nnMode));
    el('nn-assess').style.display = nnMode === 'assess' ? '' : 'none';
    el('nn-generate').style.display = nnMode === 'generate' ? '' : 'none';
    document.querySelectorAll('#convertmode button').forEach((b) => b.classList.toggle('on', b.dataset.mode === convMode));
    if (el('qk-convert-lunar')) el('qk-convert-lunar').style.display = convMode === 'lunar2solar' ? '' : 'none';
  }

  // ── 中医体质（P4）：9 种体质各 5 题、一页 5 题的分页问卷 ─────────
  // 题面与 1–5 的说法都从引擎卷子取；答案按题位存在 csAns 里（长度固定 45，null = 跳过）。
  const CS_PER_PAGE = 5;
  const CS_MIN = 27;
  let csPaper = null;
  let csAns = [];
  let csPage = 0;

  function ensureCsPaper() {
    if (csPaper) return csPaper;
    let p = null;
    try { p = window.Engine.compute({ system: 'constitution' }); } catch (e) { p = null; }
    const questions = (p && p.questions) || [];
    csPaper = { total: (p && p.total) || questions.length, questions, scale: (p && p.scale) || [] };
    csAns = new Array(csPaper.total).fill(null);
    return csPaper;
  }

  function csAnswered() {
    let n = 0;
    for (let i = 0; i < csAns.length; i += 1) if (csAns[i] != null) n += 1;
    return n;
  }

  function csScaleSay(n) {
    const hit = (csPaper && csPaper.scale ? csPaper.scale : []).filter((x) => x && x.v === n)[0];
    return hit ? hit.label : String(n);
  }

  function csPageCount() {
    return Math.max(1, Math.ceil((csPaper ? csPaper.total : 0) / CS_PER_PAGE));
  }

  function refreshCsMeta() {
    const total = csPaper ? csPaper.total : 0;
    const answered = csAnswered();
    const pages = csPageCount();
    const count = el('cs-count');
    if (count) count.textContent = `第 ${csPage + 1} / ${pages} 页 · 已答 ${answered} / ${total}`;
    const fill = el('cs-fill');
    if (fill) fill.style.width = total ? `${Math.round((answered / total) * 100)}%` : '0%';
    const prev = el('cs-prev');
    if (prev) prev.disabled = csPage <= 0;
    const next = el('cs-next');
    if (next) next.style.display = csPage >= pages - 1 ? 'none' : '';
    const sub = el('cs-submit');
    if (sub) sub.disabled = answered < CS_MIN;
    const hint = el('cs-hint');
    if (hint) {
      hint.classList.remove('warn');
      hint.textContent = answered >= CS_MIN
        ? `已够 ${CS_MIN} 题，可以看结果；答完 ${total} 题会更准。`
        : `答满 ${CS_MIN} 题可先看结果（还差 ${CS_MIN - answered} 题）。`;
    }
  }

  /** 用 createElement 拼题干：题面来自引擎，少一层 innerHTML 就少一个注入面 */
  function renderCs() {
    const host = el('cs-qs');
    if (!host) return;
    const paper = ensureCsPaper();
    csPage = Math.min(Math.max(0, csPage), csPageCount() - 1);
    const start = csPage * CS_PER_PAGE;
    host.textContent = '';
    paper.questions.slice(start, start + CS_PER_PAGE).forEach((q, k) => {
      const i = start + k;
      const row = document.createElement('div');
      row.className = 'mb-q';
      const qt = document.createElement('div');
      qt.className = 'mb-qt';
      const no = document.createElement('b');
      no.textContent = pad(i + 1);
      const tx = document.createElement('span');
      tx.textContent = q.text;
      qt.append(no, tx);
      const opts = document.createElement('div');
      opts.className = 'mb-opts';
      opts.setAttribute('role', 'radiogroup');
      opts.setAttribute('aria-label', `第 ${i + 1} 题`);
      [1, 2, 3, 4, 5].forEach((n) => {
        const lab = document.createElement('label');
        lab.className = 'mb-o' + (csAns[i] === n ? ' on' : '');
        const inp = document.createElement('input');
        inp.type = 'radio';
        inp.name = `csq${i}`;
        inp.value = String(n);
        inp.checked = csAns[i] === n;
        const b = document.createElement('b');
        b.textContent = String(n);
        const say = document.createElement('span');
        say.textContent = csScaleSay(n);
        lab.append(inp, b, say);
        opts.appendChild(lab);
      });
      row.append(qt, opts);
      host.appendChild(row);
    });
    refreshCsMeta();
  }

  function onCsPick(e) {
    const inp = e.target;
    if (!inp || inp.type !== 'radio' || String(inp.name || '').indexOf('csq') !== 0) return;
    const i = Number(String(inp.name).slice(3));
    if (!Number.isInteger(i) || i < 0 || i >= csAns.length) return;
    csAns[i] = Number(inp.value) || null;
    const row = inp.closest('.mb-q');
    if (row) row.querySelectorAll('.mb-o').forEach((lab) => lab.classList.toggle('on', lab.contains(inp)));
    refreshCsMeta();
  }

  function csTurn(delta) {
    csPage = Math.min(Math.max(0, csPage + delta), csPageCount() - 1);
    renderCs();
    const box = el('for-constitution');
    if (box && box.scrollIntoView) box.scrollIntoView({ block: 'nearest' });
  }

  function csNudge() {
    const hint = el('cs-hint');
    if (hint) {
      hint.classList.add('warn');
      hint.textContent = `至少答 ${CS_MIN} 题才能出结果，还差 ${Math.max(0, CS_MIN - csAnswered())} 题。`;
    }
    const host = el('cs-qs');
    if (host) {
      const rows = host.querySelectorAll('.mb-q');
      for (let k = 0; k < rows.length; k += 1) {
        if (csAns[csPage * CS_PER_PAGE + k] == null) {
          const inp = rows[k].querySelector('input');
          if (inp && inp.focus) inp.focus({ preventScroll: true });
          break;
        }
      }
    }
    const box = el('for-constitution');
    if (box && box.scrollIntoView) box.scrollIntoView({ block: 'nearest' });
  }

  function csClear() {
    csAns = new Array(csPaper ? csPaper.total : 0).fill(null);
    csPage = 0;
    renderCs();
    if (last && last.tab === 'constitution') { last = null; el('out').replaceChildren(); }
  }

  /** 示例答案：多数取 4、夹杂 5/3/2，既有倾向又有噪音。
   *  不用全 3（量表全 3 分八个维度都平，看不出人形），也不用全 5（那是假人）。 */
  const SAMPLE_SCALE = [4, 4, 5, 3, 4, 4, 2, 4];
  function sampleAnswers(total) {
    const out = [];
    for (let i = 0; i < total; i += 1) out.push(SAMPLE_SCALE[i % SAMPLE_SCALE.length]);
    return out;
  }

  /** MBTI 示例：按每题的 side 造一份「挑得出人形」的答卷，落成 INFP。
   *  统一给分会在维度内被正反题抵消（引擎按 side 正负计分），所以必须看 side 分侧给分。 */
  const SAMPLE_MBTI = { EI: 'I', SN: 'N', TF: 'F', JP: 'P' };
  function mbtiSampleAnswers(paper) {
    const qs = (paper && paper.questions) || [];
    if (!qs.length || qs[0].side == null) return sampleAnswers(mbAns.length);
    return qs.map((q, i) => {
      const mine = q.side === SAMPLE_MBTI[q.dim];
      if (mine) return i % 5 === 0 ? 5 : 4;
      return i % 7 === 0 ? 1 : 2;
    });
  }

  /** 体质示例：气郁为主、气虚兼夹，其余低分——只出一个「全是 3 分」的平盘看不出主次。
   *  选这两型是因为它们是最常见的一对，示例本身也得像一份真问卷。 */
  const SAMPLE_CS_MAIN = 'qiyu';
  const SAMPLE_CS_NEXT = 'qixu';
  function csSampleAnswers(paper) {
    const qs = (paper && paper.questions) || [];
    if (!qs.length || qs[0].key == null) return sampleAnswers(csAns.length);
    return qs.map((q, i) => {
      if (q.key === SAMPLE_CS_MAIN) return i % 2 ? 4 : 5;
      if (q.key === SAMPLE_CS_NEXT) return 4;
      return i % 3 === 0 ? 3 : 2;
    });
  }

  function csSubmit() {
    if (csAnswered() < CS_MIN) { csNudge(); return; }
    run();
  }

  /** 切到体质 tab：答够了就直接出结果，否则清空结果区，只留问卷 */
  function csEnter() {
    renderCs();
    if (csAnswered() >= CS_MIN) { run(); return; }
    last = null;
    el('out').replaceChildren();
  }
  // ── 十六型人格：4 题一页的分页问卷 ──────────────────────────────
  // 题目与 1–5 的说法都从引擎取（compute 不带 answers 就回问卷），
  // 前端不再抄一份题目表；答案按题序存在 mbAns 里，null = 未答。
  const MBTI_PER_PAGE = 4;
  const MBTI_MIN = 12;
  let mbPaper = null;
  let mbAns = [];
  let mbPage = 0;

  function ensureMbtiPaper() {
    if (mbPaper) return mbPaper;
    let p = null;
    try { p = window.Engine.compute({ system: 'mbti' }); } catch (e) { p = null; }
    const questions = (p && p.questions) || [];
    mbPaper = { total: (p && p.total) || questions.length, questions, scale: (p && p.scale) || {} };
    mbAns = new Array(mbPaper.total).fill(null);
    return mbPaper;
  }

  function mbAnswered() {
    let n = 0;
    for (let i = 0; i < mbAns.length; i += 1) if (mbAns[i] != null) n += 1;
    return n;
  }

  /** 末尾连着没答的先去掉：引擎把 null 当「跳过」，但没必要把整段空位传过去 */
  function mbAnswersForEngine() {
    const out = mbAns.slice();
    while (out.length && out[out.length - 1] == null) out.pop();
    return out;
  }

  function mbPageCount() {
    return Math.max(1, Math.ceil((mbPaper ? mbPaper.total : 0) / MBTI_PER_PAGE));
  }

  function refreshMbtiMeta() {
    const total = mbPaper ? mbPaper.total : 0;
    const answered = mbAnswered();
    const pages = mbPageCount();
    const count = el('mbti-count');
    if (count) count.textContent = `第 ${mbPage + 1} / ${pages} 页 · 已答 ${answered} / ${total}`;
    const fill = el('mbti-fill');
    if (fill) fill.style.width = total ? `${Math.round((answered / total) * 100)}%` : '0%';
    const prev = el('mbti-prev');
    if (prev) prev.disabled = mbPage <= 0;
    const next = el('mbti-next');
    if (next) next.style.display = mbPage >= pages - 1 ? 'none' : '';
    const sub = el('mbti-submit');
    if (sub) sub.disabled = answered < MBTI_MIN;
    const hint = el('mbti-hint');
    if (hint) {
      hint.classList.remove('warn');
      hint.textContent = answered >= MBTI_MIN
        ? `已够 ${MBTI_MIN} 题，可以看结果；答完 ${total} 题会更准。`
        : `答满 ${MBTI_MIN} 题可先看结果（还差 ${MBTI_MIN - answered} 题）。`;
    }
  }

  /** 渲染当前页 4 题。用 createElement 而不是 innerHTML：题面来自引擎，
   *  但少一层拼接就少一个注入面，也免得转义漏一处就出问题 */
  function renderMbti() {
    const host = el('mbti-qs');
    if (!host) return;
    const paper = ensureMbtiPaper();
    mbPage = Math.min(Math.max(0, mbPage), mbPageCount() - 1);
    const start = mbPage * MBTI_PER_PAGE;
    host.textContent = '';
    paper.questions.slice(start, start + MBTI_PER_PAGE).forEach((q, k) => {
      const i = start + k;
      const row = document.createElement('div');
      row.className = 'mb-q';
      const qt = document.createElement('div');
      qt.className = 'mb-qt';
      const no = document.createElement('b');
      no.textContent = pad(i + 1);
      const tx = document.createElement('span');
      tx.textContent = q.text;
      qt.append(no, tx);
      const opts = document.createElement('div');
      opts.className = 'mb-opts';
      opts.setAttribute('role', 'radiogroup');
      opts.setAttribute('aria-label', `第 ${i + 1} 题`);
      [1, 2, 3, 4, 5].forEach((n) => {
        const lab = document.createElement('label');
        lab.className = 'mb-o' + (mbAns[i] === n ? ' on' : '');
        const inp = document.createElement('input');
        inp.type = 'radio';
        inp.name = `mbq${i}`;
        inp.value = String(n);
        inp.checked = mbAns[i] === n;
        const b = document.createElement('b');
        b.textContent = String(n);
        const say = document.createElement('span');
        say.textContent = (paper.scale && paper.scale[n]) || '';
        lab.append(inp, b, say);
        opts.appendChild(lab);
      });
      row.append(qt, opts);
      host.appendChild(row);
    });
    refreshMbtiMeta();
  }

  function onMbtiPick(e) {
    const inp = e.target;
    if (!inp || inp.type !== 'radio' || String(inp.name || '').indexOf('mbq') !== 0) return;
    const i = Number(String(inp.name).slice(3));
    if (!Number.isInteger(i) || i < 0 || i >= mbAns.length) return;
    mbAns[i] = Number(inp.value) || null;
    // 只改这一题的选中态，不整页重渲染：键盘刚选完还能继续按方向键换选项
    const row = inp.closest('.mb-q');
    if (row) row.querySelectorAll('.mb-o').forEach((lab) => lab.classList.toggle('on', lab.contains(inp)));
    refreshMbtiMeta();
  }

  function mbTurn(delta) {
    mbPage = Math.min(Math.max(0, mbPage + delta), mbPageCount() - 1);
    renderMbti();
    const stepper = el('for-mbti');
    if (stepper && stepper.scrollIntoView) stepper.scrollIntoView({ block: 'nearest' });
  }

  /** 不够 12 题时：提示差几题，并把光标放到本页第一个没答的题上 */
  function mbNudge() {
    const hint = el('mbti-hint');
    if (hint) {
      hint.classList.add('warn');
      hint.textContent = `至少答 ${MBTI_MIN} 题才能出结果，还差 ${Math.max(0, MBTI_MIN - mbAnswered())} 题。`;
    }
    const host = el('mbti-qs');
    if (host) {
      const rows = host.querySelectorAll('.mb-q');
      for (let k = 0; k < rows.length; k += 1) {
        if (mbAns[mbPage * MBTI_PER_PAGE + k] == null) {
          const inp = rows[k].querySelector('input');
          if (inp && inp.focus) inp.focus({ preventScroll: true });
          break;
        }
      }
    }
    const stepper = el('for-mbti');
    if (stepper && stepper.scrollIntoView) stepper.scrollIntoView({ block: 'nearest' });
  }

  function mbClear() {
    mbAns = new Array(mbPaper ? mbPaper.total : 0).fill(null);
    mbPage = 0;
    renderMbti();
    // 清空是「重新答」：旧结果留在下面会让人以为答案还在
    if (last && last.tab === 'mbti') { last = null; el('out').replaceChildren(); }
  }

  function mbSubmit() {
    if (mbAnswered() < MBTI_MIN) { mbNudge(); return; }
    run();
  }

  /** 切到人格 tab：答够了就直接出结果，否则清空结果区，只留问卷 */
  function mbEnter() {
    renderMbti();
    if (mbAnswered() >= MBTI_MIN) { run(); return; }
    last = null;
    el('out').replaceChildren();
  }

  window.addEventListener('DOMContentLoaded', () => {
    bindDateInputs();
    // 两套入口（平铺 tab 与分组卡片）走同一条激活路径，避免行为分叉
    document.querySelectorAll('.tab, .tool').forEach((b) => b.addEventListener('click', () => activate(b.dataset.tab)));
    document.querySelectorAll('.view-switch [data-view]').forEach((b) => b.addEventListener('click', () => {
      applyView(b.dataset.view);
      storeSet(VIEW_KEY, b.dataset.view);
    }));
    // 分组卡片：窄屏每组只露 4 个，余下的折在「还有 N 个」后面（展开态由 CSS 控制）
    document.querySelectorAll('.tgroup').forEach((g) => {
      const more = g.querySelector('.tmore');
      if (!more) return;
      const extra = g.querySelectorAll('.ttools>.tool').length - 4;
      if (extra <= 0) { more.style.display = 'none'; return; }
      more.textContent = `还有 ${extra} 个`;
      more.addEventListener('click', () => {
        const open = g.classList.toggle('open');
        more.textContent = open ? '收起' : `还有 ${extra} 个`;
        more.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
    applyView(storeGet(VIEW_KEY) === 'flat' ? 'flat' : 'group');
    renderRecent();
    const profBox = el('profwrap');
    if (profBox) {
      profBox.addEventListener('click', onProfClick);
      // 只记名字、不重绘：每敲一个字重绘会把光标踢走
      profBox.addEventListener('input', (e) => {
        const nm = e.target && e.target.closest ? e.target.closest('.mp-prof-name') : null;
        if (nm) profName = nm.value;
      });
    }
    const mbHost = el('mbti-qs');
    if (mbHost) {
      renderMbti();
      mbHost.addEventListener('change', onMbtiPick);
      const mbPrev = el('mbti-prev');
      if (mbPrev) mbPrev.addEventListener('click', () => mbTurn(-1));
      const mbNext = el('mbti-next');
      if (mbNext) mbNext.addEventListener('click', () => mbTurn(1));
      const mbSub = el('mbti-submit');
      if (mbSub) mbSub.addEventListener('click', mbSubmit);
      const mbClr = el('mbti-clear');
      if (mbClr) mbClr.addEventListener('click', mbClear);
    }
    const csHost = el('cs-qs');
    if (csHost) {
      renderCs();
      csHost.addEventListener('change', onCsPick);
      const csPrev = el('cs-prev');
      if (csPrev) csPrev.addEventListener('click', () => csTurn(-1));
      const csNext = el('cs-next');
      if (csNext) csNext.addEventListener('click', () => csTurn(1));
      const csSub = el('cs-submit');
      if (csSub) csSub.addEventListener('click', csSubmit);
      const csClr = el('cs-clear');
      if (csClr) csClr.addEventListener('click', csClear);
    }
    document.querySelectorAll('#for-meihua .seg button').forEach((b) => b.addEventListener('click', () => {
      mhMode = b.dataset.mode;
      syncMhMode();
      renderTip();
      // 切起卦方式是参数变化：只标过期，不自动重起一卦（旧结果头部的「起卦时刻」跟新参数不符，
    // 过期提示会说明这件事——重起一卦得用户点按钮，否则摇出来的卦又变了）
    onParamChange();
    }));
    ['date', 'time'].forEach((id) => {
      const node = el(id);
      if (!node) return;
      node.addEventListener('change', onManualEdit);
      node.addEventListener('input', onManualEdit);
    });
    el('go').addEventListener('click', goCast);
    // 修改参数：只解开输入区，不动结果。旧盘继续挂着，等用户真改完再点「排盘」才换。
    // 这里不排盘、不清值 —— 任务书 1.3 的 RESULT_LOCKED → EDITING 只走这一条路。
    const editBtn = el('edit');
    if (editBtn) editBtn.addEventListener('click', () => {
      if (flowState !== FLOW.LOCKED) return;
      flowState = FLOW.EDITING;
      refreshFlow();
      const d = el('date');
      if (d && !d.readOnly) d.focus({ preventScroll: true });
    });
    // 看示例：填固定示例盘并切到八字，走与真实排盘完全相同的渲染路径。
    // 问卷下同一个按钮改叫「填空答案」：第一次进来面对 24 / 45 道题的人，
    // 需要先看一份填好的卷子长什么样，而不是先读一整页题。
    const sampleBtn = el('sample');
    if (sampleBtn) sampleBtn.addEventListener('click', () => {
      if (tab === 'constitution') {
        csAns = csSampleAnswers(csPaper);
        csPage = 0;
        renderCs();
        refreshCsMeta();
        csSubmit();
        return;
      }
      if (tab === 'mbti') {
        mbAns = mbtiSampleAnswers(mbPaper);
        mbPage = 0;
        renderMbti();
        refreshMbtiMeta();
        mbSubmit();
        return;
      }
      setDateField('date', SAMPLE.date);
      el('time').value = SAMPLE.time;
      el('gender').value = 'male';
      el('addr').value = '河北石家庄';
      setTab('bazi');
      run();
    });
    // 清空：条件与结果一起回到初始态。只清结果不清条件，下一次点排盘还是同一张盘，
    // 用户会以为按钮没生效。
    const clearBtn = el('clear');
    if (clearBtn) clearBtn.addEventListener('click', () => {
      ['question', 'addr', 'paddr', 'p2addr', 'surname', 'givenname'].forEach((id) => {
        const n = el(id);
        if (n) n.value = '';
      });
      if (el('ts')) el('ts').checked = true;
      if (el('latezi')) el('latezi').checked = true;
      if (el('online')) el('online').checked = false;
      if (el('cross')) el('cross').checked = false;
      if (el('h3on')) { el('h3on').checked = false; const b = el('for-hepan3'); if (b) b.style.display = 'none'; }
      csClear();
      mbClear();
      last = null;
      el('out').replaceChildren();
      el('tip').textContent = '';
      // 清空是显式动作，连记忆一起清：否则切一次体系又把你刚清掉的日期填回来
      manual.birth = null;
      manual.cast = null;
      saveManual();
      flowState = FLOW.READY;
      castKey = '';
      applyDateTime(ctxKind);
      refreshFlow();
      el('date').focus({ preventScroll: true });
    });
    el('gender').addEventListener('change', onParamChange);
    // 换牌阵张数是参数，排不排由用户点主按钮决定（任务书 1.2 第一条：不自动排盘）
    const tc = el('tcount');
    if (tc) tc.addEventListener('change', onParamChange);
    // 合盘：合盘方式切换与对方信息改动都只更新可用性与过期标记
    document.querySelectorAll('#hpchart button').forEach((b) => b.addEventListener('click', () => {
      document.querySelectorAll('#hpchart button').forEach((x) => x.classList.toggle('on', x === b));
      onParamChange();
    }));
    ['pdate', 'ptime', 'pgender', 'paddr', 'p2date', 'p2time', 'p2gender', 'p2addr'].forEach((id) => {
      const node = el(id);
      if (node) node.addEventListener('change', onParamChange);
    });
    // 三方合盘：勾选后才展开第三人的四个字段
    const h3 = el('h3on');
    if (h3) h3.addEventListener('change', () => {
      const box = el('for-hepan3');
      if (box) box.style.display = h3.checked ? '' : 'none';
      onParamChange();
    });
    // 奇门：换局规则是参数，改了只标过期
    document.querySelectorAll('input[name="qimen_rule"]').forEach((n) => n.addEventListener('change', onParamChange));
    const qdir = el('qdir');
    if (qdir) qdir.addEventListener('change', () => {
      if (tab !== 'qimen') return;
      // 方向决定用神：只重建「用神落宫」所在的推导链，不重新起局
      if (last && last.r && last.r.trace && window.Engine.buildTrace) {
        try {
          const trace = window.Engine.buildTrace(last.r, { direction: qdir.value });
          if (trace) last.r.trace = trace;
        } catch (e) { /* 保留起局时的推导链 */ }
      }
      // 只换方向不是重新排盘：卦没变，重出的是解读，所以这里仍可直接刷新
      if (last) paint();
      castKey = paramKey();
    });
    // 速查类：分段按钮只切模式，排不排由主按钮决定
    const seg = (sel, set) => document.querySelectorAll(sel).forEach((b) => b.addEventListener('click', () => {
      set(b.dataset.mode); syncQuick(); onParamChange();
    }));
    seg('#xlrmode button', (v) => { xlrMode = v; });
    seg('#fsmode button', (v) => { fsMode = v; });
    seg('#nnmode button', (v) => { nnMode = v; });
    seg('#convertmode button', (v) => { convMode = v; syncQuick(); onParamChange(); });
    ['ztask', 'zdays', 'zsheng', 'zcand', 'num1', 'num2', 'num3', 'toage', 'sitting', 'facing', 'fsperiod', 'fsoffset', 'fsdate', 'fstime', 'surname', 'givenname', 'nlimit', 'lunardate', 'leapm', 'upper', 'lower']
      .forEach((id) => {
        const n = el(id);
        if (!n) return;
        n.addEventListener('change', onParamChange);
        // 文本框在失焦之前不派发 change：只挂 change 时，用户填完最后一个必填数字、
        // 直接去点主按钮，发现按钮还是灰的（梅花数字起卦的上下卦数就是这么漏的）。
        if (n.tagName === 'INPUT') n.addEventListener('input', onParamChange);
      });
    // 方法页：按钮开合（静态内容，无网络）
    const mOpen = el('method-open');
    const mClose = el('method-close');
    const mSec = el('method');
    if (mOpen && mSec) mOpen.addEventListener('click', () => { mSec.hidden = false; mSec.scrollIntoView({ behavior: 'smooth' }); });
    if (mClose && mSec) mClose.addEventListener('click', () => { mSec.hidden = true; });
    // 改问题或方向：只重出解读，不重摇一卦（不算重新排盘，卦还是那一卦）
    el('question').addEventListener('change', () => { if (needAsk(tab) && last) { paint(); castKey = paramKey(); } });
    // 第一次填「所问之事」时必须重算按钮能不能点。
    // 原来只挂了 change，而那条回调只在已出结果时才动——于是填完问题按钮还是灰的，
    // 提示还写着「还差：所问之事」，塔罗/六爻/梅花/奇门全卡在第一步。
    // 已经出过结果时不走 refreshFlow：改问题只重绘解读，不该把结果标成「参数已变更」。
    el('question').addEventListener('input', () => {
      if (flowState === FLOW.LOCKED || flowState === FLOW.CALC) return;
      refreshFlow();
    });
    // 改方向：只重出解读、不重摇一卦；六爻推导链按新方向重算用神相关层
    el('direction').addEventListener('change', () => {
      if (!needAsk(tab)) return;
      if (tab === 'liuyao' && last && last.r && last.r.trace && window.Engine.buildTrace) {
        try {
          const trace = window.Engine.buildTrace(last.r, {
            direction: el('direction').value,
            gender: (last.r.useGod && last.r.useGod.gender) || 'male',
            refresh: true,
          });
          if (trace) last.r.trace = trace;
        } catch (e) { /* 保留起卦时的推导链 */ }
      }
      if (last) paint();
      castKey = paramKey();
    });
    // 解析模块折叠：标题栏整栏可点，容器内委托一次即可
    el('out').addEventListener('click', (e) => {
      const copyBtn = e.target && e.target.closest ? e.target.closest('[data-shadow-copy]') : null;
      if (copyBtn) { copyShadow(copyBtn); return; }
      const handleCopy = e.target && e.target.closest ? e.target.closest('[data-handle-copy]') : null;
      if (handleCopy) { copyHandle(handleCopy); return; }
      const traceBtn = e.target && e.target.closest ? e.target.closest('[data-trace-open]') : null;
      if (traceBtn) { traceOpen(); return; }
      const traceCopy = e.target && e.target.closest ? e.target.closest('[data-trace-copy]') : null;
      if (traceCopy) { copyTraceMarkdown(traceCopy); return; }
      const traceBack = e.target && e.target.closest ? e.target.closest('[data-trace-close]') : null;
      if (traceBack) { traceClose(); return; }
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
      const copyAsk = e.target && e.target.closest ? e.target.closest('[data-act="copyask"]') : null;
      if (copyAsk) {
        const pkg = bridgePackages();
        // 打包失败时按钮不能毫无反应：用户会以为点了没生效，再点、再粘贴，最后贴进去一段旧内容
        if (!pkg || !pkg.full) {
          copyAsk.textContent = '暂无可复制内容';
          setTimeout(() => { copyAsk.textContent = '复制提问'; }, 1400);
          return;
        }
        copyPlain(copyAsk, pkg.full, '复制提问');
        return;
      }
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
    // 推导链抽屉：Esc 关闭（点遮罩与关闭按钮走上面的委托）
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      const layer = document.getElementById('mp-trace-layer');
      if (layer && layer.classList.contains('open')) traceClose();
    });
    // 追问输入框回车提交
    el('out').addEventListener('keydown', (e) => {
      if (e.target && e.target.id === 'askq' && e.key === 'Enter') { e.preventDefault(); doAsk(); }
    });
    // 切到问事的体系时把光标放进「所问之事」
    document.querySelectorAll('.tab, .tool').forEach((b) => b.addEventListener('click', () => {
      if (needAsk(tab) && !el('question').value.trim() && el('question').focus) el('question').focus();
    }));
    // 开发者视图的暗门：页头印章连点五下切换（或 URL 加 ?dev=1，或本机记着 mp.view）。
    // 普通用户撞不到这五下，但要在别人机器上排障时不必先解释「加个参数」。
    window.__MPRepaint = () => { if (last && last.r) paint(); };
    // 状态机与校验暴露给测试：单页里没有别的办法观测「现在处于哪个态」。
    // 这不是给用户的功能入口，只读不改盘（改状态仍然只能靠按钮与输入）。
    window.__MPFlow = {
      FLOW,
      state: () => flowState,
      castKey: () => castKey,
      validateForm,
      paramKey,
      refreshFlow,
      onParamChange,
      applyDateTime,
      cacheKey: chartKeyOf,
      restoreDefault,
      defaultGet,
      syncInputLock,
    };
    if (window.__MPCompose && window.__MPCompose.bindDevSwitch) {
      window.__MPCompose.bindDevSwitch(document.querySelector('.seal'));
    }
    // C3 深链：带 #mp= 打开时先还原那张盘；没有就照旧是默认示例盘
    const deep = readDeepLink();
    setTab(deep ? deep.tab : 'ziwei');
  // 勾「时辰未知」当场收起时刻框：不让人以为还要填个点
  if (el('hourunknown')) el('hourunknown').addEventListener('change', syncMhMode);
    if (deep) fillDeepForm(deep.form);
    // 开页面不自动排盘（任务书 1.2 第一条）。只有两个显式入口会直接出结果：
    // 深链（URL 里点了具体那一张盘）、以及用户自己设过的默认盘（读缓存，不重算）。
    // 默认盘以 defaultChart 为准；老数据只置过顶、没记过 defaultChart 时回退到 pin
    const d0 = defaultGet();
    const list0 = window.__PP && window.__PP.profilesLoad ? (window.__PP.profilesLoad() || []) : [];
    const pinned = d0 ? list0.find((x) => x && x.id === d0.profileId) : list0.find((x) => x && x.pinned);
    if (deep) Promise.resolve(run({ record: false })).then(() => deepNote(deep));
    else if (pinned) restoreDefault(pinned);
    else refreshFlow();
  });
})();
