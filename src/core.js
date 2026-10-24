// 两个 UI 共用的表单规则：宿主面板（src/app.js）与独立页（src/web-ui.js）。
//
// 为什么单独成文件：爻值解析与「哪些体系要先填所问之事」这两条规则以前在两个 UI 里
// 各写一遍，改一处漏一处。这里只放纯函数（不碰 DOM、不碰 React），既能在浏览器里用，
// 也能被 node:vm 直接加载做单测。
(function () {
  // 问事的体系：不填「所问之事」就不出解读
  const NEED_ASK = { liuyao: true, meihua: true, daliuren: true, tarot: true };
  const needAsk = (kind) => !!NEED_ASK[kind];

  /**
   * 解析六爻输入（自下而上 6 个 6/7/8/9）。
   * @returns {{lines: number[]|null, warning: string}} lines 为 null 表示交给引擎随机摇卦
   */
  function parseLines(text) {
    const raw = String(text == null ? '' : text).trim();
    if (!raw) return { lines: null, warning: '' };
    const v = raw.split(/[^0-9]+/).filter(Boolean).map(Number);
    const bad = v.filter((n) => ![6, 7, 8, 9].includes(n));
    if (v.length === 6 && bad.length === 0) return { lines: v, warning: '' };
    return {
      lines: null,
      warning: v.length !== 6
        ? `爻值需要正好 6 个数字（当前 ${v.length} 个），本次按随机摇卦。`
        : `爻值只能是 6/7/8/9（收到 ${bad.join('/')}），本次按随机摇卦。`,
    };
  }

  /** 纯数字输入（梅花 upper/lower/changing、塔罗张数）——空串不能当 0 */
  function toNumber(text) {
    const raw = String(text == null ? '' : text).trim();
    if (!raw) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  }

  window.__MPCore = { NEED_ASK, needAsk, parseLines, toNumber };
})();
