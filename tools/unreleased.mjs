// 「不发版本号，但要说清改了什么」的唯一来源：CHANGELOG 的「未发布」段。
// 单文件页的徽标、「方法与验证」段与面板的报错行都从这里取同一份清单，
// 免得手写第二份说明，日后两边漂。
import fs from 'node:fs';

const SECTION = /^##\s*未发布\s*$/;
const NEXT_SECTION = /^##\s/;
const TOP_ITEM = /^-\s+\*\*(.+?)\*\*/;

/** 取「未发布」段的顶层粗体条目标题；遇到下一个 ## 即止，嵌套子条目不算一条。 */
export function unreleasedItems(md) {
  const lines = String(md == null ? '' : md).split(/\r?\n/);
  const start = lines.findIndex((l) => SECTION.test(l.trim()));
  if (start < 0) return [];
  const out = [];
  for (let i = start + 1; i < lines.length; i++) {
    if (NEXT_SECTION.test(lines[i])) break;
    const m = TOP_ITEM.exec(lines[i]);
    if (m) out.push(m[1].trim());
  }
  return out;
}

export function unreleasedFromChangelog(file) {
  if (!fs.existsSync(file)) return [];
  return unreleasedItems(fs.readFileSync(file, 'utf8'));
}

export function escHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** 徽标旁的小牌：只在真有未发版改动时出现，空清单渲染成空串（不留「另含 0 项」这种话）。 */
export function badgeHtml(list) {
  const items = list || [];
  if (!items.length) return '';
  return `<span class="ver-note" title="本版之后又改了 ${items.length} 项（版本号未变）：${escHtml(items.join('；'))}">另含 ${items.length} 项未发版改动</span>`;
}

/** 「方法与验证」里的一段：逐条写出改了什么，并指回 CHANGELOG。 */
export function methodBlockHtml(list) {
  const items = list || [];
  if (!items.length) return '';
  return `<h3>本版之后又改了什么（版本号未变）</h3>
    <ul>${items.map((t) => `<li>${escHtml(t)}</li>`).join('')}</ul>
    <p class="note">以上改动记在 CHANGELOG 的「未发布」段里，每条都写明起因、改法与验证；正式发版后并入版本号。</p>`;
}
