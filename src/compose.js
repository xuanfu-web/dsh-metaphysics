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
    const dev = (opts && typeof opts.mode === 'string') ? opts.mode === 'dev' : devOn();
    const out = [p.head, p.body, p.chart, p.shortId, p.castAt, p.interpret, p.followup, p.extra];
    if (dev) out.push(p.revision, p.handle, p.shadow, p.trace, p.caliber, p.perf);
    out.push(p.exportBar);
    return out.filter(Boolean).join('');
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
    devOn: devOn,
    setDev: setDev,
    bindDevSwitch: bindDevSwitch,
    composeResult: composeResult,
    shortIdHTML: shortIdHTML,
    esc: esc,
  };
})();
