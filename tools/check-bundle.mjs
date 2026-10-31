#!/usr/bin/env node
// 产物自检：确认 client.js 与按 tab 拆出的引擎分块在宿主形态下能编译、能跑。
//
// 背景（2026-10-25 启动崩溃）：client.js 在 Chromium（V8 + 宿主脚本加载器）里报
// `SyntaxError: Unexpected identifier 'as'`，而 `node --check client.js`、`vm.runInNewContext`
// 与当时全部 53 个测试文件都是绿的——Node 侧走的是 Node 的解析路径与 `new Function`，
// 与宿主「把 N 个插件拼成一条 modules 队列、逐个执行 factory」的加载方式不同；
// 且测试里多数断言编译的是 `assemble()` 的内存结果，不是真正发出去的 client.js 文件。
//
// 这道闸零依赖，做六件事：
//   1. 真实文件形态：读 client.js 原文（不经 ESM 导入，绕开 Node 的类型剥离），new Function 编译。
//   2. 宿主形态：模拟 __ModuleLoader__，真正执行入口 factory，检查返回的 inject/apply。
//   3. 分块：每个 client.<name>.js 都能编译、按 {id, chunk} 注册、factory 返回 Engine.compute。
//   4. 逐模块编译：在未压缩全量源码上定位到具体是哪个引擎模块坏。
//   5. 结构断言：IIFE 收口数量、不可见行分隔符、CRLF、BOM。
//   6. 一致性：入口与每个分块都必须与源码重新构建的结果逐字节相同（防止改了源码忘记 build）。
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import zlib from 'node:zlib';
import { assemble, assembleEntry, assembleChunk, minifyBundle, CHUNKS } from './build-client.mjs';

const root = path.resolve(import.meta.dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const problems = [];
const reactStub = {
  createElement: () => null,
  useState: (v) => [typeof v === 'function' ? v() : v, () => {}],
  useEffect: () => {},
  useRef: (v) => ({ current: v }),
};

function checkSyntax(code, label) {
  try {
    new Function(code);
  } catch (e) {
    problems.push(`${label} 编译失败：${e.message}`);
  }
}

function checkChars(code, label) {
  if (code.includes('\u2028') || code.includes('\u2029')) problems.push(`${label} 含不可见行分隔符 U+2028/U+2029（Chromium 视为换行，会截断字符串）`);
  if (code.includes('\r\n')) problems.push(`${label} 含 CRLF（宿主按 \\n 记行号，混用会让报错定位偏移）`);
  if (code.charCodeAt(0) === 0xFEFF) problems.push(`${label} 含 BOM`);
}

function registrationOf(code, filename) {
  let captured = null;
  const sandbox = { window: { __ModuleLoader__: { load: (m) => { captured = m; } } }, console };
  try {
    vm.runInNewContext(code, sandbox, { filename });
  } catch (e) {
    problems.push(`${filename} 执行失败：${e.message}`);
    return null;
  }
  if (!captured) {
    problems.push(`${filename} 未调用 __ModuleLoader__.load`);
    return null;
  }
  return captured;
}

// ---- 1. 入口真实文件形态 ----
const entryFile = path.join(root, 'client.js');
const raw = fs.readFileSync(entryFile, 'utf8');
checkSyntax(raw, 'client.js');
checkChars(raw, 'client.js');

// ---- 2. 入口宿主形态 ----
const entryReg = registrationOf(raw, 'client.js');
if (entryReg) {
  if (entryReg.id !== pkg.name) problems.push(`client.js 模块 id 异常：${entryReg.id}`);
  try {
    const mod = entryReg.factory((name) => {
      if (name === 'react') return reactStub;
      throw new Error(`意外的 require：${name}`);
    });
    if (typeof mod.apply !== 'function') problems.push('入口 factory 未返回 apply');
    if (!Array.isArray(mod.inject) || mod.inject.includes('tools')) problems.push(`入口 inject 结构异常：${JSON.stringify(mod.inject)}`);
  } catch (e) {
    problems.push(`入口 factory 执行失败：${e.message}`);
  }
}

// ---- 3. 分块 ----
const chunkFiles = fs.readdirSync(root).filter((f) => /^client\..+\.js$/.test(f) && f !== 'client.debug.js').sort();
const expected = Object.keys(CHUNKS).map((n) => `client.${n}.js`).sort();
for (const f of chunkFiles) if (!expected.includes(f)) problems.push(`存在未声明的分块文件：${f}`);
for (const name of Object.keys(CHUNKS)) {
  const file = `client.${name}.js`;
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    problems.push(`缺少分块 ${file}（请先跑 npm run build）`);
    continue;
  }
  const code = fs.readFileSync(full, 'utf8');
  checkSyntax(code, file);
  checkChars(code, file);
  const reg = registrationOf(code, file);
  if (reg) {
    if (reg.id !== pkg.name) problems.push(`${file} 模块 id 异常：${reg.id}`);
    if (reg.chunk !== file) problems.push(`${file} 注册的 chunk 名异常：${reg.chunk}`);
    try {
      const exp = reg.factory(() => reactStub);
      if (!exp || !exp.Engine || typeof exp.Engine.compute !== 'function') problems.push(`${file} 未返回 Engine.compute`);
    } catch (e) {
      problems.push(`${file} factory 执行失败：${e.message}`);
    }
  }
  try {
    const rebuilt = await minifyBundle(assembleChunk(name));
    if (rebuilt !== code) problems.push(`${file} 与源码不一致（重建 ${rebuilt.length}B / 现有 ${code.length}B）——请先跑 npm run build`);
  } catch (e) {
    problems.push(`无法重新构建 ${file}：${e.message}`);
  }
}

// ---- 4. 逐模块编译（未压缩全量源码）----
const readable = assemble();
checkSyntax(readable, 'assemble()');
const modStart = /^__mods(?:\.([A-Za-z0-9_$-]+)|\['([^'\]]+)'\]) = \(function \(\) \{$/gm;
const starts = [];
let m;
while ((m = modStart.exec(readable)) !== null) starts.push({ name: m[1] ?? m[2], index: m.index });
for (let i = 0; i < starts.length; i++) {
  // 只取到下一个模块起点；末尾 index 模块之后还接着 core/kit/app，不能吃到文件尾。
  // IIFE 收口取「段内最后一条行首 })();」——模块内部可能有更浅层的嵌套 IIFE（如 geo 的坐标表构建），
  // 取首条会误判为截断，所以以本模块结尾的那条为准。
  const limit = i + 1 < starts.length ? starts[i + 1].index : readable.length;
  const seg = readable.slice(starts[i].index, limit);
  const closes = [...seg.matchAll(/^\}\)\(\);$/gm)];
  const chunk = closes.length ? seg.slice(0, closes[closes.length - 1].index + 5) : seg;
  try {
    new Function(chunk);
  } catch (e) {
    problems.push(`模块 ${starts[i].name} 编译失败：${e.message}`);
  }
}

// ---- 5. 结构断言 ----
const openCount = (readable.match(/^__mods(?:\.|\[')[^\n]+ = \(function \(\) \{$/gm) || []).length;
const closeCount = (readable.match(/^\}\)\(\);$/gm) || []).length;
if (closeCount < openCount) problems.push(`IIFE 收口不足：开 ${openCount} / 闭 ${closeCount}`);

// ---- 6. 入口一致性 ----
try {
  const rebuilt = await minifyBundle(assembleEntry());
  if (rebuilt !== raw) problems.push(`client.js 与源码不一致（重建 ${rebuilt.length}B / 现有 ${raw.length}B）——请先跑 npm run build`);
} catch (e) {
  problems.push(`无法重新构建 client.js：${e.message}`);
}

// 入口体积预算：首屏不应再背整套引擎（目标 < 100KB gzip）
const entryGzip = zlib.gzipSync(Buffer.from(raw, 'utf8')).length;
if (entryGzip >= 100 * 1024) problems.push(`client.js gzip ${Math.round(entryGzip / 1024)}KB 超出 100KB 预算`);

if (problems.length) {
  console.error(`✗ 产物自检未通过（${problems.length} 处）：`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`✓ 产物自检通过：client.js ${(Buffer.byteLength(raw, 'utf8') / 1024).toFixed(0)}KB / gzip ${Math.round(entryGzip / 1024)}KB`
  + ` / 引擎分块 ${chunkFiles.length} 个 / 逐模块编译 ${starts.length} 个 / 宿主形态可执行 / 与源码一致`);
