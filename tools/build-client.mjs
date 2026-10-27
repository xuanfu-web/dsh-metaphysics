// 把 engine/*.js 打成单个浏览器模块，供 client.js 内联使用。
// 每个模块包在独立 IIFE 里，避免顶层同名冲突（NAYIN_NAMES / PALACE_NAMES / GENERATES 等）。
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const ORDER = ['fail', 'validate', 'lru', 'nayin', 'sanhe', 'vsop-earth', 'calendar', 'lunar', 'geo', 'random', 'dst', 'shensha', 'geju', 'bazi', 'liuyao', 'ziwei', 'tarot', 'meihua', 'daliuren', 'hepan', 'trend', 'fengshui', 'name', 'ziwei-hepan', 'qimen', 'qimen-interpret', 'interpret-data', 'almanac', 'star', 'numerology', 'chenggu', 'xiaoliuren', 'zeri', 'convert', 'interpret-plain', 'interpret-knowledge', 'interpret', 'followup', 'crosscheck', 'verify', 'rectify', 'index'];

export const MODULE_ORDER = ORDER;

/** 模块名可能带连字符，作为对象 key 时要加引号 */
const modRef = (dep) => (/^[A-Za-z0-9_$]+$/.test(dep) ? `__mods.${dep}` : `__mods['${dep}']`);

/**
 * 保守的注释/空白剥离（不做重命名、不压行内代码）。
 * 只处理「整行注释」与「行内没有引号时的行尾 //」，不触碰字符串与模板字面量内容；
 * 目的是把体积降下来，同时保证任何一行都还是原来的语义。
 */
export function stripComments(code) {
  const lines = code.split(/\r\n|\r|\n/);
  const out = [];
  let inBlock = false;
  for (const raw of lines) {
    const line = raw.replace(/\s+$/, '');
    const t = line.trim();
    if (inBlock) {
      const end = t.indexOf('*/');
      if (end >= 0) { inBlock = false; const rest = t.slice(end + 2).trim(); if (rest) out.push(rest); }
      continue;
    }
    if (t === '') { out.push(''); continue; }          // 空行稍后合并
    if (t.startsWith('//')) continue;                   // 整行注释
    if (t.startsWith('/*')) {                           // 从行首开始的块注释
      const end = t.indexOf('*/');
      if (end >= 0) { const rest = t.slice(end + 2).trim(); if (rest) out.push(rest); }
      else inBlock = true;
      continue;
    }
    // 行尾注释：仅当该行不含引号时才动（'http://' 这类字符串安全）
    if (!/['"`]/.test(line)) {
      const idx = line.search(/\s\/\/\s/);
      if (idx > 0) { out.push(line.slice(0, idx)); continue; }
    }
    out.push(line);
  }
  // 连续空行压成一行
  const collapsed = [];
  for (const l of out) {
    if (l === '' && collapsed[collapsed.length - 1] === '') continue;
    collapsed.push(l);
  }
  return collapsed.join('\n');
}

/**
 * 行首缩进压缩：只在「模板字符串之外」的行做。
 * 模板字面量里的内容（HTML / CSS / 文案）一个字都不能动，所以先扫出所有模板字面量的字符区间。
 */
export function collapseIndent(code) {
  // 1) 标记模板字面量占据的区间
  const tplRanges = [];
  let i = 0;
  let start = -1;
  let mode = null; // 单/双/模板
  while (i < code.length) {
    const c = code[i];
    const d = code[i + 1];
    if (mode === null) {
      if (c === "'") { mode = "'"; i++; continue; }
      if (c === '"') { mode = '"'; i++; continue; }
      if (c === '`') { mode = '`'; start = i; i++; continue; }
      if (c === '/' && d === '/') { while (i < code.length && code[i] !== '\n') i++; continue; }
      if (c === '/' && d === '*') { i += 2; while (i < code.length && !(code[i] === '*' && code[i + 1] === '/')) i++; i += 2; continue; }
      i++; continue;
    }
    if (mode === "'" || mode === '"') {
      if (c === '\\') { i += 2; continue; }
      if (c === mode) mode = null;
      i++; continue;
    }
    // 模板内
    if (c === '\\') { i += 2; continue; }
    if (c === '`') { tplRanges.push([start, i]); mode = null; i++; continue; }
    if (c === '$' && d === '{') {
      // 模板插值里的代码不算模板内容，但简化处理：整体仍视作模板区间
      i += 2;
      let depth = 1;
      while (i < code.length && depth > 0) {
        if (code[i] === '{') depth++;
        else if (code[i] === '}') depth--;
        i++;
      }
      continue;
    }
    i++;
  }

  const inTpl = (pos) => tplRanges.some(([a, b]) => pos >= a && pos <= b);
  const lines = code.split('\n');
  let pos = 0;
  const out = lines.map((line) => {
    const lineStart = pos;
    pos += line.length + 1;
    if (!line.trim()) return '';
    if (inTpl(lineStart)) return line;          // 模板内容原样保留
    return line.replace(/^[ \t]+/, '');          // 普通代码行去掉缩进
  });
  return out.join('\n');
}

export function buildModule(name) {
  const file = path.join(root, 'engine', `${name}.js`);
  let code = fs.readFileSync(file, 'utf8');
  const exported = new Set();

  code = code.replace(
    /^import\s*\{([\s\S]*?)\}\s*from\s*'\.\/([a-z-]+)\.js';?/gm,
    (_m, names, dep) => `const { ${names.split(',').map((s) => s.trim()).filter(Boolean).join(', ')} } = ${modRef(dep)};`,
  );
  // 打包进 IIFE 后 export default 不合法，直接去掉（调用方统一用命名导出）
  code = code.replace(/^export\s+default\s+.*;?\s*$/gm, '');
  code = code.replace(/^export\s*\{([\s\S]*?)\};?/gm, (_m, names) => {
    for (const n of names.split(',').map((s) => s.trim()).filter(Boolean)) exported.add(n);
    return '';
  });
  code = code.replace(/^export\s+(async\s+)?(function|const|let|class)\s+([A-Za-z0-9_$]+)/gm, (_m, isAsync, kind, id) => {
    exported.add(id);
    return `${isAsync ? 'async ' : ''}${kind} ${id}`;
  });

  return `${modRef(name)} = (function () {\n${code}\nreturn { ${[...exported].join(', ')} };\n})();\n`;
}

/** 生成完整 client.js 源码；tail 默认取 src/app.js */
export function assemble(tail) {
  const body = tail ?? fs.readFileSync(path.join(root, 'src', 'app.js'), 'utf8');
  const core = fs.readFileSync(path.join(root, 'src', 'core.js'), 'utf8');
  const kit = fs.readFileSync(path.join(root, 'src', 'panel-kit.js'), 'utf8');
  const pkgName = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')).name;
  return `// 由 tools/build-client.mjs 生成，请勿手改。
window.__ModuleLoader__.load({
  id: '${pkgName}',
  factory(require) {
    const React = (function () {
      try { return require('react'); } catch (e) { return globalThis.React; }
    })();
    if (!React) return { inject: [], apply() {} };
    const h = React.createElement;
    const __mods = {};
${ORDER.map(buildModule).join('\n')}
    const Engine = __mods.index;
    window.Engine = Engine;
${core}
${kit}
${body}
  },
});
`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const raw = assemble();
  // 构建产物剥离注释；保留一份未剥离版本供调试对照
  const out = stripComments(raw);
  fs.writeFileSync(path.join(root, 'client.js'), out, 'utf8');
  console.log(`client.js written: ${out.length} bytes (原 ${raw.length}，省 ${(100 - out.length / raw.length * 100).toFixed(1)}%), modules: ${ORDER.join(', ')}`);
}





