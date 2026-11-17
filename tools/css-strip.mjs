// 构建期剥掉 CSS 注释：源码里留着（它们是「为什么这么写」的唯一记录），产物里不留。
//
// 为什么值得为这一条单独写个工具：CSS 注释是中文自然语言，压缩率远低于代码——
// 实测 panel-kit 的 CSS 144.6KB 源文本里注释占 20.8KB，去掉后 gzip 从 34.9KB 降到 21.1KB，
// 也就是 10.7KB gzip 全花在「写给人看、不参与渲染」的文字上。
// 入口包（client.js）的预算是 128KB，这条注释就吃掉了将近三分之一余量。
//
// 工具必须认识字符串：`content: "/*"` 这种不该被当成注释起点。CSS 里的字符串不能跨行，
// 所以这里只在遇到引号时按「引号内一路读到同名引号、反斜杠转义」处理，其余按注释语法走。

/** 剥掉 `/* … *\/` 注释；注释原地留一个空格，避免 `a/**\/b` 粘成一个 token */
export function stripCssComments(css) {
  let out = '';
  let i = 0;
  const n = css.length;
  while (i < n) {
    const c = css[i];
    if (c === '/' && css[i + 1] === '*') {
      const end = css.indexOf('*/', i + 2);
      if (end === -1) { out += css.slice(i); break; }
      out += ' ';
      i = end + 2;
      continue;
    }
    if (c === '"' || c === "'") {
      const q = c;
      out += c;
      i += 1;
      while (i < n) {
        const d = css[i];
        out += d;
        i += 1;
        if (d === '\\') { if (i < n) { out += css[i]; i += 1; } continue; }
        if (d === q) break;
      }
      continue;
    }
    out += c;
    i += 1;
  }
  // 注释留下的空行与行尾空白收掉：省的是字节，也让产物 grep 起来清爽
  return out.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').replace(/\n+$/,'\n');
}

/** 把 src/panel-kit.js 里 `const CSS = \`…\`;` 那段剥掉注释；其余代码一字不动 */
export function stripKitCssSource(kitSrc) {
  const marker = 'const CSS = `';
  const start = kitSrc.indexOf(marker);
  if (start === -1) return kitSrc;
  let i = start + marker.length;
  while (i < kitSrc.length) {
    if (kitSrc[i] === '`' && kitSrc[i - 1] !== '\\') break;
    i += 1;
  }
  const body = kitSrc.slice(start + marker.length, i);
  if (body.includes('${')) {
    throw new Error('panel-kit 的 CSS 里出现了 ${…} 插值：模板字符串带插值就不能在构建期改写它');
  }
  return kitSrc.slice(0, start + marker.length) + stripCssComments(body) + kitSrc.slice(i);
}
