/* 结果拼接的唯一入口：单页（src/web-ui.js）与宿主面板（src/app.js）都调这里。
 *
 * 以前两边各拼一遍——单页拼十五段、面板拼十二段，顺序还不一样（单页多追问条、
 * 验前事、生时校正、导出条，面板把它们拆成独立组件）。每加一块卡就要改两处，
 * 漏一处就是「面板有、单页没有」，0.76 的称骨卡、0.68 的婚姻卡都栽在这上面。
 *
 * 用户视图只出：结论卡 → 盘面 → 盘号 → 起盘时刻 → 解读 → 追问 → 验前事/生时校正 → 导出
 * dev 视图再追加：性能 / 修订回显 / 句柄 / 影子盘 / 推导链 / 口径对照
 *
 * 白名单之外的东西**不生成**，而不是用 CSS 藏起来。收起只是视觉上的，
 * 存在 DOM 里就还会被 @media print、存为长图、导出 .md 带出去。
 */
(function () {
  // dev 视图偏好存这里；与历史盘、本机档案分开放，清缓存时互不牵连
  const KEY = 'mp.view';

  // dev 专属段落，命名与 composeResult 的 parts 键一致
  const DEV_SECTIONS = ['perf', 'revision', 'handle', 'shadow', 'trace', 'caliber'];

  // 用户视图的段序：结论 → 盘面 → 盘号 → 时刻 → 解读 → 追问 → 附加
  const USER_SEGS = ['head', 'body', 'chart', 'shortId', 'castAt', 'interpret', 'followup', 'extra'];

  /* 22 个体系分五档。档位决定「结果页取哪些段」，不让每个体系各自判断。
   *
   * 分档的唯一依据：这份结果能不能被追问。
   *   盘类 / 问事类 / 判定类——有流年、宫位、三传、局数可追，出追问条。
   *   问卷类（MBTI、中医体质）——结果是量表分数，没有「哪一年」可问。
   *   速查类（黄历、称骨、星座、数字、公农历）——查表结果，追问只能回「找不到」。
   *
   * hepan 归盘类而不是问事类：它是两人生辰的对照，能追到某一年的相处，但要先有双方数据。
   * xiaoliuren 归问事类：时间起课或报数起课，一样有落宫可追。
   */
  const TIER = {
    chart: ['bazi', 'ziwei', 'hepan', 'trend', 'fengshui', 'name'],
    ask: ['liuyao', 'meihua', 'daliuren', 'qimen', 'tarot', 'xiaoliuren'],
    judge: ['wuyunliuqi', 'taiyi', 'zeri'],
    quiz: ['mbti', 'constitution'],
    lookup: ['almanac', 'chenggu', 'star', 'numerology', 'convert'],
  };

  /* 档位不出的段。目前只有「追问」这一条。
   *
   * 起盘时刻不在这里管：那是输入语义的问题，`TIME_KIND`（app.js 里）已经分了三类，
   * 塔罗 / 问卷根本没有时间字段，castAtHTML 自己会返回空串。同一件事不写两处，
   * 否则以后加体系时两边会互相打架。
   */
  const TIER_SKIP = {
    quiz: ['followup'],
    lookup: ['followup'],
  };

  function tierOf(system) {
    const s = String(system || '');
    const keys = Object.keys(TIER);
    for (let i = 0; i < keys.length; i++) {
      if (TIER[keys[i]].indexOf(s) >= 0) return keys[i];
    }
    return 'chart';
  }

  const store = () => {
    try { return window.localStorage || null; } catch (e) { return null; }
  };

  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  /** dev 视图是否开启：?dev=1 优先（便于发给作者复现），其次 localStorage，默认用户视图 */
  function devOn() {
    try {
      const loc = window.location || {};
      const m = /(?:^|[?&#])dev=([^&]*)/.exec(String((loc.search || '') + (loc.hash || '')));
      if (m) return m[1] !== '0' && m[1] !== 'false';
      const s = store();
      return !!(s && s.getItem(KEY) === 'dev');
    } catch (e) { return false; }
  }

  function setDev(on) {
    const s = store();
    if (s) { try { s.setItem(KEY, on ? 'dev' : 'user'); } catch (e) { /* 存不了就只这次生效 */ } }
    return !!on;
  }

  /**
   * 页脚印章连点五下切换视图。给作者用的暗门：普通用户撞不到，
   * 但要在用户机器上排障时又不必记事——URL 加 ?dev=1 也行。
   */
  function bindDevSwitch(node) {
    if (!node || node.__mpDevBound) return;
    node.__mpDevBound = true;
    let n = 0, t = 0;
    node.addEventListener('click', () => {
      const now = Date.now();
      n = now - t > 1200 ? 1 : n + 1;
      t = now;
      if (n < 5) return;
      n = 0;
      const on = setDev(!devOn());
      node.title = on ? '已切到开发者视图（再点五下切回）' : '';
      if (typeof window.__MPRepaint === 'function') window.__MPRepaint();
    });
  }

  /**
   * 拼装。parts 里是已经算好的各段 HTML，这里只决定取哪些、按什么顺序——
   * 渲染仍是各个 *HTML() 的事，本条函数不碰任何未转义文本。
   */
  function composeResult(parts, opts) {
    const p = parts || {};
    const o = opts || {};
    const dev = typeof o.mode === 'string' ? o.mode === 'dev' : devOn();
    const skip = TIER_SKIP[tierOf(o.system)] || [];
    const segs = USER_SEGS.filter((k) => skip.indexOf(k) < 0);
    if (dev) segs.push(...DEV_SECTIONS);
    segs.push('exportBar');
    return segs.map((k) => p[k]).filter(Boolean).join('');
  }

  /**
   * 盘号：同一组参数 + 同一版本得到同一个短串。用户侧唯一保留的复盘凭据——
   * 完整的指纹、baseId、与上次同盘 diff 都只在 dev 出。
   */
  function shortIdHTML(id) {
    const s = typeof id === 'string' ? id.replace(/^LY-/, '') : '';
    if (!s) return '';
    return '<p class="mp-shortid" title="同一组参数、同一版本算出来是同一个编号；回看或反馈时报它就行">盘号 '
      + esc(s) + '</p>';
  }

  window.__MPCompose = {
    DEV_SECTIONS: DEV_SECTIONS,
    USER_SEGS: USER_SEGS,
    TIER: TIER,
    TIER_SKIP: TIER_SKIP,
    tierOf: tierOf,
    devOn: devOn,
    setDev: setDev,
    bindDevSwitch: bindDevSwitch,
    composeResult: composeResult,
    shortIdHTML: shortIdHTML,
    esc: esc,
  };
})();
