#!/usr/bin/env node
// 产物自检：确认 client.js 在宿主形态下能编译、能跑，而不是只在 Node 的宽松解析下能过。
//
// 背景（2026-10-25 启动崩溃）：client.js 在 Chromium（V8 + 宿主脚本加载器）里报
// `SyntaxError: Unexpected identifier 'as'`，而 `node --check client.js`、`vm.runInNewContext`
// 与当时全部 53 个测试文件都是绿的——Node 侧走的是 Node 的解析路径与 `new Function`，
// 与宿主「把 N 个插件拼成一条 modules 队列、逐个执行 factory」的加载方式不同；
// 且测试里多数断言编译的是 `assemble()` 的内存结果，不是真正发出去的 client.js 文件。
//
// 这道闸零依赖，做五件事：
//   1. 真实文件形态：读 client.js 原文（不经 ESM 导入，绕开 Node 的类型剥离），new Function 编译。
//   2. 宿主形态：模拟 __ModuleLoader__，真正执行 factory，检查返回的 inject/apply。
//   3. 逐模块编译：定位到具体是哪个引擎模块坏（而不是只说"整文件坏"）。
//   4. 结构断言：IIFE 收口数量、不可见行分隔符、CRLF、BOM。
//   5. 一致性：client.js 必须与源码重新构建的结果逐字节相同（防止改了源码忘记 build）。
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const file = path.join(root, 'client.js');
const raw = fs.readFileSync(file, 'utf8');
const problems = [];

// ---- 1. 整文件编译（真实文件形态，不经 ESM 导入） ----
try {
  new Function(raw);
} catch (e) {
  problems.push(`整文件编译失败：${e.message}`);
}

// ---- 3. 逐模块编译：定位到引擎模块 ----
const modStart = /^__mods\.(?:([A-Za-z0-9_$]+)|'([^']+)') = \(function \(\) \{$/gm;
const starts = [];
let m;
while ((m = modStart.exec(raw)) !== null) starts.push({ name: m[1] ?? m[2], index: m.index });
for (let i = 0; i < starts.length; i++) {
  // 只取到下一个模块起点；末尾 index 模块之后还接着 core/kit/app，不能吃到文件尾。
  // IIFE 收口取「段内最后一条行首 })();」——模块内部可能有更浅层的嵌套 IIFE（如 geo 的坐标表构建），
  // 取首条会误判为截断，所以以本模块结尾的那条为准。
  const limit = i + 1 < starts.length ? starts[i + 1].index : raw.length;
  const seg = raw.slice(starts[i].index, limit);
  const closes = [...seg.matchAll(/^\}\)\(\);$/gm)];
  const chunk = closes.length ? seg.slice(0, closes[closes.length - 1].index + 5) : seg;
  try {
    new Function(chunk);
  } catch (e) {
    problems.push(`模块 ${starts[i].name} 编译失败：${e.message}`);
  }
}

// ---- 2. 宿主形态：真正跑一遍 factory ----
try {
  let captured = null;
  const sandbox = {
    window: { __ModuleLoader__: { load: (mod) => { captured = mod; } } },
    console,
  };
  vm.runInNewContext(raw, sandbox, { filename: 'client.js' });
  if (!captured) throw new Error('__ModuleLoader__.load 未被调用');
  const reactStub = { createElement: () => null, useState: () => [null, () => {}], useEffect: () => {}, useRef: () => ({ current: null }) };
  const mod = captured.factory((name) => {
    if (name === 'react') return reactStub;
    throw new Error(`意外的 require：${name}`);
  });
  if (typeof mod.apply !== 'function') problems.push('factory 未返回 apply');
  if (!Array.isArray(mod.inject) || mod.inject.includes('tools')) problems.push(`inject 结构异常：${JSON.stringify(mod.inject)}`);
} catch (e) {
  problems.push(`宿主形态执行失败：${e.message}`);
}

// ---- 4. 结构断言 ----
const openCount = (raw.match(/^__mods\.[^\n]+ = \(function \(\) \{$/gm) || []).length;
const closeCount = (raw.match(/^\}\)\(\);$/gm) || []).length;
if (closeCount < openCount) problems.push(`IIFE 收口不足：开 ${openCount} / 闭 ${closeCount}`);
if (raw.includes('\u2028') || raw.includes('\u2029')) problems.push('产物含不可见行分隔符 U+2028/U+2029（Chromium 视为换行，会截断字符串）');
if (raw.includes('\r\n')) problems.push('产物含 CRLF（宿主按 \\n 记行号，混用会让报错定位偏移）');
if (raw.charCodeAt(0) === 0xFEFF) problems.push('产物含 BOM');

// ---- 5. 产物与源码一致（防止改了源码忘记 build） ----
try {
  const { assemble, stripComments } = await import('./build-client.mjs');
  const rebuilt = stripComments(assemble());
  if (rebuilt !== raw) {
    problems.push(`client.js 与源码不一致（重建 ${rebuilt.length}B / 现有 ${raw.length}B）——请先跑 npm run build`);
  }
} catch (e) {
  problems.push(`无法重新构建：${e.message}`);
}

if (problems.length) {
  console.error(`✗ 产物自检未通过（${problems.length} 处）：`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

console.log(`✓ 产物自检通过：client.js ${(raw.length / 1024).toFixed(0)}KB / 逐模块编译 ${starts.length} 个 / 宿主形态可执行 / 与源码一致`);
