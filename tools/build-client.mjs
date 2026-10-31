// 把 engine/*.js 打进浏览器产物：入口 client.js 只带界面，引擎按 tab 拆成 client.<name>.js。
// 每个模块包在独立 IIFE 里，避免顶层同名冲突（NAYIN_NAMES / PALACE_NAMES / GENERATES 等）。
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { GROUPS } from '../src/groups.mjs';
import { DIRECTIONS } from '../engine/interpret.js';

const root = path.resolve(import.meta.dirname, '..');
const ORDER = ['fail', 'diff', 'fingerprint', 'validate', 'lru', 'nayin', 'sanhe', 'vsop-earth', 'calendar', 'lunar', 'geo', 'random', 'dst', 'shensha', 'tiaohou', 'qiongtong',
  'classics', 'geju', 'bazi', 'liuyao', 'ziwei', 'tarot', 'meihua', 'daliuren', 'hepan', 'trend', 'fengshui', 'name-data', 'name', 'ziwei-hepan', 'qimen', 'qimen-interpret', 'interpret-data', 'almanac', 'star', 'numerology', 'mbti', 'chenggu', 'xiaoliuren', 'zeri', 'convert', 'interpret-plain', 'interpret-knowledge', 'citations', 'ziwei-words', 'bazi-words', 'interpret', 'followup', 'crosscheck', 'verify', 'rectify', 'trace', 'index'];

export const MODULE_ORDER = ORDER;

// 拆包：入口只带界面与懒加载器，各 tab 的引擎按组落到 client.<name>.js。
// 分块之间不共享代码（宿主的 chunk 协议只支持自包含分块），所以公共模块按需重复。
const COMMON = ['fail', 'validate', 'diff', 'fingerprint', 'lru', 'vsop-earth', 'calendar', 'lunar', 'geo', 'dst', 'nayin', 'sanhe', 'random'];
const INTERPRET = ['interpret-data', 'interpret-knowledge', 'interpret-plain', 'citations', 'interpret'];
const ASK = ['followup'];
// 八字/紫微的公共栈：交叉验证让两边都要能排另一套盘，所以各自带上对方的引擎
const BAZI_STACK = [...COMMON, 'shensha', 'tiaohou', 'qiongtong', 'geju', 'bazi', 'bazi-words', 'classics', ...INTERPRET];
const ZIWEI_STACK = [...COMMON, 'shensha', 'tiaohou', 'qiongtong', 'geju', 'bazi', 'bazi-words', 'ziwei', 'ziwei-words', 'classics', ...INTERPRET];

export const CHUNKS = {
  bazi: {
    tabs: ['bazi'],
    // 八字页内嵌人生 K 线、可开紫微交叉验证；两项都在本块内完成
    modules: [...BAZI_STACK, 'trend', 'ziwei', 'ziwei-words', 'crosscheck', 'verify', 'rectify', 'trace', ...ASK],
  },
  ziwei: {
    tabs: ['ziwei'],
    // 紫微页可开八字交叉验证；不带人生 K 线与验证/校正
    modules: [...ZIWEI_STACK, 'crosscheck', 'trace', ...ASK],
  },
  hepan: {
    tabs: ['hepan'],
    // 合盘双方可能是八字或紫微，两套引擎 + 合盘模板都在本块内
    modules: [...ZIWEI_STACK, 'ziwei-hepan', 'hepan', 'trace', ...ASK],
  },
  trend: {
    tabs: ['trend'],
    // 人生 K 线只需要八字与流年，不背紫微
    modules: [...BAZI_STACK, 'trend', 'trace', ...ASK],
  },
  name: {
    tabs: ['name'],
    modules: [...COMMON, 'shensha', 'tiaohou', 'qiongtong', 'geju', 'bazi', 'bazi-words',
      'classics', 'name-data', 'name', ...ASK],
  },
  fengshui: { tabs: ['fengshui'], modules: [...COMMON, 'fengshui', ...ASK] },
  liuyao: { tabs: ['liuyao', 'meihua'], modules: [...COMMON, 'classics', 'liuyao', 'meihua', ...INTERPRET, ...ASK, 'trace'] },
  qimen: { tabs: ['qimen'], modules: [...COMMON, 'classics', 'qimen', 'qimen-interpret', ...INTERPRET, ...ASK, 'trace'] },
  daliuren: { tabs: ['daliuren'], modules: [...COMMON, 'classics', 'daliuren', ...INTERPRET, ...ASK, 'trace'] },
  tarot: { tabs: ['tarot'], modules: [...COMMON, 'classics', 'tarot', ...INTERPRET, ...ASK] },
  almanac: { tabs: ['almanac'], modules: [...COMMON, 'interpret-data', 'classics', 'almanac', ...ASK] },
  convert: { tabs: ['convert'], modules: [...COMMON, 'interpret-data', 'classics', 'almanac', 'convert', ...ASK] },
  zeri: { tabs: ['zeri'], modules: [...COMMON, 'interpret-data', 'classics', 'almanac', 'zeri', ...ASK] },
  chenggu: { tabs: ['chenggu'], modules: [...COMMON, 'interpret-data', 'classics', 'almanac', 'chenggu', ...ASK] },
  xiaoliuren: { tabs: ['xiaoliuren'], modules: [...COMMON, 'interpret-data', 'classics', 'almanac', 'xiaoliuren', ...ASK] },
  star: { tabs: ['star'], modules: [...COMMON, 'classics', 'star', ...ASK] },
  numerology: { tabs: ['numerology'], modules: [...COMMON, 'classics', 'numerology', ...ASK] },
  mbti: { tabs: ['mbti'], modules: [...COMMON, 'classics', 'mbti', ...ASK] },
};

/** tab → 分块文件名；未列出的 tab 回落到 bazi（19 个 tab 全覆盖由测试兜底） */
export const CHUNK_OF_TAB = Object.fromEntries(
  Object.entries(CHUNKS).flatMap(([name, def]) => def.tabs.map((tab) => [tab, `client.${name}.js`])),
);

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
    // 缺失模块给空对象：分块只带本组用到的模块，统一入口对其它体系的引用必须能安全落空
    (_m, names, dep) => `const { ${names.split(',').map((s) => s.trim()).filter(Boolean).join(', ')} } = (${modRef(dep)} || {});`,
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

const readSrc = (name) => fs.readFileSync(path.join(root, 'src', name), 'utf8');
const readPkg = () => JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));

/** 生成完整单包产物（测试与单文件页对照用，不是发出去的 client.js） */
export function assemble(tail) {
  const body = tail ?? readSrc('app.js');
  const core = readSrc('core.js');
  const kit = readSrc('panel-kit.js');
  const pkg = readPkg();
  return `// 由 tools/build-client.mjs 生成，请勿手改。
window.__ModuleLoader__.load({
  id: '${pkg.name}',
  version: '${pkg.version}',
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
    window.__MP_VER = '${pkg.version}';
    window.__MPGroups = ${JSON.stringify(GROUPS)};
${core}
${kit}
${body}
  },
});
`;
}

/** 正式入口：界面 + 懒加载器；引擎按 tab 落到 client.<name>.js */
export function assembleEntry(tail) {
  const body = tail ?? readSrc('app.js');
  const core = readSrc('core.js');
  const kit = readSrc('panel-kit.js');
  const lazy = readSrc('engine-lazy.js');
  const pkg = readPkg();
  return `// 由 tools/build-client.mjs 生成，请勿手改。
window.__ModuleLoader__.load({
  id: '${pkg.name}',
  version: '${pkg.version}',
  factory(require) {
    const React = (function () {
      try { return require('react'); } catch (e) { return globalThis.React; }
    })();
    if (!React) return { inject: [], apply() {} };
    const h = React.createElement;
    const __MP_CHUNKS__ = ${JSON.stringify(CHUNK_OF_TAB)};
    const __MP_DIRECTIONS__ = ${JSON.stringify(DIRECTIONS)};
    window.__MP_VER = '${pkg.version}';
    window.__MPGroups = ${JSON.stringify(GROUPS)};
${lazy}
${core}
${kit}
${body}
  },
});
`;
}

/** 单个引擎分块：自包含，只注册 factory，不碰界面 */
export function assembleChunk(name) {
  const def = CHUNKS[name];
  if (!def) throw new Error(`未知分块：${name}`);
  const pkg = readPkg();
  const set = new Set([...def.modules, 'index']);
  const order = ORDER.filter((m) => set.has(m));
  return `// 由 tools/build-client.mjs 生成，请勿手改。
window.__ModuleLoader__.load({
  id: '${pkg.name}',
  chunk: 'client.${name}.js',
  factory(require) {
    const __mods = {};
${order.map(buildModule).join('\n')}
    return { Engine: __mods.index };
  },
});
`;
}

/**
 * 产物压缩：优先 esbuild（保留 UTF-8 中文，不转 \uXXXX），
 * 未安装 esbuild 时退回保守的 stripComments，保证构建永远能出产物。
 */
export async function minifyBundle(code) {
  let esbuild;
  try {
    esbuild = await import('esbuild');
  } catch (e) {
    // 只吞「没装 esbuild」；装了却压缩失败要直接报错，不能悄悄退回大体积产物
    if (e && (e.code === 'ERR_MODULE_NOT_FOUND' || e.code === 'MODULE_NOT_FOUND')) return stripComments(code);
    throw e;
  }
  const out = await esbuild.transform(code, {
    minify: true,
    target: 'es2020',
    legalComments: 'none',
    charset: 'utf8',
  });
  return out.code;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const zlib = await import('node:zlib');
  const bytes = (s) => Buffer.byteLength(s, 'utf8');
  const raw = assembleEntry();
  const out = await minifyBundle(raw);
  fs.writeFileSync(path.join(root, 'client.js'), out, 'utf8');
  if (process.argv.includes('--debug')) fs.writeFileSync(path.join(root, 'client.debug.js'), raw, 'utf8');

  const written = new Set();
  let chunkGzip = 0;
  const lines = [];
  for (const name of Object.keys(CHUNKS)) {
    const chunkRaw = assembleChunk(name);
    const chunkOut = await minifyBundle(chunkRaw);
    const file = `client.${name}.js`;
    fs.writeFileSync(path.join(root, file), chunkOut, 'utf8');
    written.add(file);
    const gz = zlib.gzipSync(Buffer.from(chunkOut, 'utf8')).length;
    chunkGzip += gz;
    lines.push(`  ${file}: ${bytes(chunkOut)} bytes / gzip ${gz}`);
  }
  // 清掉改名/下线分块留下的旧文件，避免宿主按旧 URL 取到过期代码
  for (const f of fs.readdirSync(root)) {
    if (/^client\..+\.js$/.test(f) && f !== 'client.debug.js' && !written.has(f)) fs.unlinkSync(path.join(root, f));
  }
  const gzip = zlib.gzipSync(Buffer.from(out, 'utf8')).length;
  console.log(`client.js written: ${bytes(out)} bytes / gzip ${gzip} (原 ${bytes(raw)}，省 ${(100 - bytes(out) / bytes(raw) * 100).toFixed(1)}%), engine modules: ${ORDER.length}`);
  console.log(`chunks: ${written.size} 个，合计 gzip ${chunkGzip}\n${lines.join('\n')}`);
}





