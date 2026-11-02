// 两个 UI 共用的表单规则：宿主面板（src/app.js）与独立页（src/web-ui.js）。
//
// 为什么单独成文件：爻值解析与「哪些体系要先填所问之事」这两条规则以前在两个 UI 里
// 各写一遍，改一处漏一处。这里只放纯函数（不碰 DOM、不碰 React），既能在浏览器里用，
// 也能被 node:vm 直接加载做单测。
(function () {
  // 问事的体系：不填「所问之事」就不出解读
  const NEED_ASK = { liuyao: true, meihua: true, daliuren: true, tarot: true };
  const needAsk = (kind) => !!NEED_ASK[kind];

  // 询问方向（命盘用的七向）→ 问事类型（问事提示用的六类）。
  // 命盘的「健康/学业」没有对应的问事类型：健康不越界、学业归到工作类。
  const KIND_OF_DIR = { general: 'other', wealth: 'business', career: 'career', love: 'love', health: 'other', study: 'career', travel: 'action' };
  const kindOfDirection = (d) => KIND_OF_DIR[d] || 'other';

  // ── 高亮块上的字色 ──────────────────────────────────────
  // 选中态一直是「品牌色底 + 白字」。深色主题下品牌色本身通常是浅色，
  // 白字压上去对比度掉到 1.x，等于没有字。所以不再写死，改由这里按对比度挑一侧。
  const ON_DARK = '#ffffff';
  const ON_LIGHT = '#1c1a15';

  /** "rgb(…)"/"rgba(…)" → [r,g,b]；半透明或解析不了返回 null（当没有实底） */
  function parseRGB(text) {
    const m = String(text == null ? '' : text).match(/rgba?\(([^)]+)\)/i);
    if (!m) return null;
    const p = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
    if (p.length < 3 || p.slice(0, 3).some((n) => !Number.isFinite(n))) return null;
    if (p.length > 3 && Number.isFinite(p[3]) && p[3] < 0.95) return null;
    return [p[0], p[1], p[2]];
  }

  function hexToRGB(hex) {
    const h = String(hex || '').replace('#', '');
    const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    if (!/^[0-9a-f]{6}$/i.test(n)) return null;
    return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
  }

  /** WCAG 相对亮度 */
  function luminance(rgb) {
    const f = (v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(rgb[0]) + 0.7152 * f(rgb[1]) + 0.0722 * f(rgb[2]);
  }

  /** WCAG 对比度，1–21 */
  function contrastRatio(a, b) {
    const l1 = luminance(a); const l2 = luminance(b);
    const hi = Math.max(l1, l2); const lo = Math.min(l1, l2);
    return (hi + 0.05) / (lo + 0.05);
  }

  /**
   * 挑一个压在 bg 上的字色：白或近黑。
   * 拿不准（解析失败/半透明）时返回空串，交给 CSS 的 var(--mp-on-brand,#fff) 兜底。
   */
  function pickOnColor(bg) {
    const rgb = typeof bg === 'string' ? parseRGB(bg) : bg;
    if (!rgb) return '';
    return contrastRatio(rgb, hexToRGB(ON_DARK)) >= contrastRatio(rgb, hexToRGB(ON_LIGHT)) ? ON_DARK : ON_LIGHT;
  }

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

  /**
   * 本机今天的日期（YYYY-MM-DD）。
   * 只给「现在走到第几步」这类需要当前位置的展示用：引擎不读挂钟，
   * 当前时间一律由界面以 asOf 传入，这样同一条线任何时候重新生成都一字不差。
   */
  function todayStamp(date) {
    const d = date instanceof Date ? date : new Date();
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }

  window.__MPCore = { NEED_ASK, needAsk, parseLines, toNumber, parseRGB, hexToRGB, luminance, contrastRatio, pickOnColor, ON_DARK, ON_LIGHT, kindOfDirection, todayStamp };
})();
