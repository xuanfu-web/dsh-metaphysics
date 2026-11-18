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
import { assemble, assembleEntry, assembleChunk, assembleShared, minifyBundle, CHUNKS, SHARED_CHUNK_FILE, SHARED_TIER_FILE, SHARED_TIERS, MODULE_ORDER as ORDER } from './build-client.mjs';

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

// 引擎产物的常驻 realm：宿主的每个分块都跑在同一台「页面」里，共享表 globalThis.__MP_SHARED__
// 必须在多次执行之间存活。每块各用一个新 context 的话，共享表必然读成 0 个模块——
// 这正是 0.84 抽共享块时踩过的坑，所以这里直接把运行时语义搬过来。
const bundleRealm = vm.createContext({ window: { __ModuleLoader__: {} }, console });
function registrationInRealm(code, filename) {
  let captured = null;
  bundleRealm.window.__ModuleLoader__ = { load: (m) => { captured = m; } };
  try {
    vm.runInContext(code, bundleRealm, { filename });
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
const sharedCountIn = () => vm.runInContext('Object.keys(globalThis.__MP_SHARED__ || {}).length', bundleRealm);

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
// 分块体积预算：每块自带整套引擎导出，往引擎里加一张大表会同时抬高所有块。
// 2026-11-07：引文库还要继续补，逐批新增的卡片文案／CHANGELOG 条目会把 bazi 慢慢顶到 232KB 旧线。
// 原文与白话都在不打包的 citations-fuwen.js 侧，进分块的只是定位字段与文案，所以这里统一放宽，
// 并把 test/chunks.test.mjs 的硬编码 232KB 改成读本文件的 CAP——体积只留这一套事实源。
// 单块 288KB（约为当时最大块 231.2KB 的 1.25 倍，仍在 bundle-budget 的 1.3 倍上限内），
// 总量 3.2MB；两道墙都由 test/bundle-budget.test.mjs 盯着，不许继续抬成空闸。
// 2026-11-14：288 → 320KB。chart 块 281KB 同样贴线（婚姻层 + 人生六面进来后），
// 留出约 39KB 再谈下一步；合计上限 3.2MB 未动，整体膨胀仍被卡住。
// 2026-11-16：320 → 360KB。chart 块（八字/紫微/合盘/趋势四 tab 合并）已经 310KB，
// 贴线到只剩 10KB，正文改写一动就爆。抬到 360 只是留出正常增长空间，不是解绑：
// 真正逐块卡体积的是 tools/chunk-budget.json（每块一份独立上限，按现状 +8% 生成），
// CHUNK_GZIP_CAP 退化成「任何块都不许超过的硬顶」。
// 2026-11-17：360 → 200KB。抽共享块之后，最大的单个文件变成 client.shared-interpret.js
// （169KB，五块共用），普通分块全在 30–70KB；再留着 360 就是一道没人碰得到的空墙。
// 200 仍是「最大文件 × 1.18」，bundle-budget.test.mjs 的「不许抬成空闸」照旧盯得住。
const CHUNK_GZIP_CAP = 200 * 1024;
const CHUNKS_TOTAL_GZIP_CAP = 3.2 * 1024 * 1024;

// 每块独立预算：分块各自有加载与体积约束，不能只有一道统一墙。
const BUDGET_FILE = path.join(root, "tools", "chunk-budget.json");
const UPDATE_BUDGET = process.argv.includes("--update-budget");
let chunkCaps = {};
try {
  chunkCaps = (JSON.parse(fs.readFileSync(BUDGET_FILE, "utf8")) || {}).caps || {};
} catch (e) {
  chunkCaps = {};
}
const nextCaps = {};
let chunksGzip = 0;
const chunkFiles = fs.readdirSync(root).filter((f) => /^client\..+\.js$/.test(f) && f !== 'client.debug.js').sort();
const expected = [...Object.keys(CHUNKS).map((n) => `client.${n}.js`), ...Object.values(SHARED_TIER_FILE)].sort();
for (const f of chunkFiles) if (!expected.includes(f)) problems.push(`存在未声明的分块文件：${f}`);

// 共享块先逐层载一次：各分块的 factory 同步读 globalThis.__MP_SHARED__，这就是运行时的顺序。
// 顺序也必须照 SHARED_TIER_FILE 来——核心层建表，解释层往里补。
for (const tier of Object.keys(SHARED_TIER_FILE)) {
  const file = SHARED_TIER_FILE[tier];
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    problems.push(`缺少共享分块 ${file}（请先跑 npm run build）`);
    continue;
  }
  const code = fs.readFileSync(full, 'utf8');
  checkSyntax(code, file);
  checkChars(code, file);
  const gz = zlib.gzipSync(Buffer.from(code, 'utf8')).length;
  chunksGzip += gz;
  nextCaps[`shared-${tier}`] = Math.ceil((gz / 1024) * 1.08);
  const reg = registrationInRealm(code, file);
  if (!reg) problems.push(`${file} 没有注册 factory`);
  else {
    if (reg.id !== pkg.name) problems.push(`${file} 模块 id 异常：${reg.id}`);
    if (reg.chunk !== file) problems.push(`${file} 注册的 chunk 名异常：${reg.chunk}`);
    const before = sharedCountIn();
    try {
      reg.factory(() => reactStub);
      const after = sharedCountIn();
      if (after - before < SHARED_TIERS[tier].length) {
        problems.push(`${file} 只登记了 ${after - before} 个模块（应 ${SHARED_TIERS[tier].length} 个）`);
      }
      const ready = vm.runInContext('globalThis.__MP_SHARED_READY__ || null', bundleRealm);
      if (!ready || ready[tier] !== true) problems.push(`${file} 没有置 __MP_SHARED_READY__.${tier}`);
    } catch (e) {
      problems.push(`${file} factory 执行失败：${e.message}`);
    }
  }
  try {
    const rebuilt = await minifyBundle(assembleShared(tier));
    if (rebuilt !== code) problems.push(`${file} 与源码不一致——请先跑 npm run build`);
  } catch (e) {
    problems.push(`无法重新构建 ${file}：${e.message}`);
  }
}

for (const name of Object.keys(CHUNKS)) {
  const file = `client.${name}.js`;
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    problems.push(`缺少分块 ${file}（请先跑 npm run build）`);
    continue;
  }
  const code = fs.readFileSync(full, 'utf8');
  const gz = zlib.gzipSync(Buffer.from(code, 'utf8')).length;
  chunksGzip += gz;
  const gzKb = gz / 1024;
  nextCaps[name] = Math.ceil(gzKb * 1.08);
  if (gzKb > CHUNK_GZIP_CAP) problems.push(`${file} gzip ${Math.round(gzKb)}KB 超出单块预算 ${Math.round(CHUNK_GZIP_CAP / 1024)}KB`);
  const capKb = chunkCaps[name];
  if (capKb === undefined) {
    problems.push(`${file} 没有独立预算（跑 node tools/check-bundle.mjs --update-budget 生成）`);
  } else if (gzKb > capKb) {
    problems.push(`${file} gzip ${gzKb.toFixed(1)}KB 超出本块预算 ${capKb}KB（先把内容挪出这一块，别直接抬预算）`);
  }
  checkSyntax(code, file);
  checkChars(code, file);
  const reg = registrationInRealm(code, file);
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

// 入口体积预算：首屏不背引擎，界线是「入口只装界面」——引擎全在 client.<name>.js 里。
// 2026-11-12 由 105KB 抬到 110KB：三个 P4 体系（体质 / 运气 / 太乙）都是「界面 +1、引擎进分块」，
// 入口每加一个体系约 +0.6–0.9KB gzip，太乙是最后一个。抬的是界面预算，不是架构：
// 入口只由 src/app.js + core.js + panel-kit.js + engine-lazy.js 拼成，这条由
// test/client-bundle.test.mjs 的「入口不含引擎源码」守着，比字节数更靠得住。
// 0.76.0：称骨嵌入八字卡后入口微涨；预算抬 2KB（抬的是界面预算不是架构，
// 引擎仍全部走分块，入口不含引擎源码由 client-bundle.test.mjs 守着）。
// 2026-11-14：112 → 128KB。上一版 114668 / 114688 只剩 20 字节，任何一处小改都要先做
// 体积战（CHANGELOG 加三条中文标题就把它顶破了），成本远大于收益。这是本地宿主读的文件、
// 不经网络，多 16KB gzip 约合 50KB 源码，解析差 1～2ms，用户感知不到。
// 放宽的是界面预算不是架构：入口仍只装界面，引擎全部走分块，这条由 client-bundle.test.mjs 守着。
const ENTRY_GZIP_CAP = 128 * 1024;
const entryGzip = zlib.gzipSync(Buffer.from(raw, 'utf8')).length;
if (entryGzip >= ENTRY_GZIP_CAP) problems.push(`client.js gzip ${Math.round(entryGzip / 1024)}KB 超出 ${Math.round(ENTRY_GZIP_CAP / 1024)}KB 预算`);
if (entryGzip < ENTRY_GZIP_CAP) {
  const slack = Math.round((ENTRY_GZIP_CAP - entryGzip) / 1024);
  if (slack <= 8) {
    console.log(`  · 提示：client.js 距上限只剩 ${slack}KB（${Math.round(entryGzip / 1024)}/${Math.round(ENTRY_GZIP_CAP / 1024)}KB），再加东西前先考虑拆分块`);
  }
}
if (chunksGzip > CHUNKS_TOTAL_GZIP_CAP) {
  problems.push(`引擎分块合计 gzip ${(chunksGzip / 1024 / 1024).toFixed(2)}MB 超出 ${(CHUNKS_TOTAL_GZIP_CAP / 1024 / 1024).toFixed(2)}MB 预算`);
}

// ---- 7. 模块顺序：被依赖的模块必须排在依赖者之前 ----
// 打包后每个模块是一条 IIFE 赋值，按 ORDER 顺序执行；`const { x } = (__mods.dep || {})`
// 在初始化时就把值取走了。dep 排在后面 → 取到的是空对象 → x 永远 undefined，
// 不报错，只在结果里静默少一块内容（新加数据表时最容易踩）。
// 分块缺依赖不能一概而论（index 跨体系引用、interpret 引用 liuyao 都是故意落空的），
// 所以这里只锁全局顺序这一条硬事实。
const IMPORT_RE = /^import\s*\{([\s\S]*?)\}\s*from\s*'\.\/([a-z-]+)\.js';?/gm;
const rankOf = new Map(ORDER.map((n, i) => [n, i]));
for (const name of ORDER) {
  const src = fs.readFileSync(path.join(root, 'engine', `${name}.js`), 'utf8');
  for (const m of src.matchAll(IMPORT_RE)) {
    const dep = m[2];
    const ri = rankOf.get(dep);
    if (ri === undefined) { problems.push(`${name}.js 引用了未登记的模块 ./${dep}.js（ORDER 里没有）`); continue; }
    if (ri < rankOf.get(name)) continue;
    problems.push(`模块顺序倒置：${name}.js 依赖 ${dep}.js，但 ORDER 里 ${dep} 排在 ${name} 之后或同位——分块里会取到 undefined`);
  }
}

// ---- 6.5 每块预算的基线：只由 --update-budget 写，日常跑只读 ----
if (UPDATE_BUDGET) {
  const data = {
    _doc: "每个引擎分块的 gzip 上限（KB）。按当时产物 +8% 自动生成，只增不减要有理由；改内容后重跑 node tools/check-bundle.mjs --update-budget。",
    updatedAt: new Date().toISOString().slice(0, 10),
    caps: Object.fromEntries(Object.keys(nextCaps).sort().map((k) => [k, nextCaps[k]])),
  };
  fs.writeFileSync(BUDGET_FILE, JSON.stringify(data, null, 2) + "\n");
  console.log(`✓ 已重建每块预算：${Object.keys(data.caps).length} 块（${BUDGET_FILE}）`);
  if (problems.length) {
    for (const p of problems) console.log(`  · 仍存在的问题：${p}`);
  }
  process.exit(0);
}

if (problems.length) {
  console.error(`✗ 产物自检未通过（${problems.length} 处）：`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`✓ 产物自检通过：client.js ${(Buffer.byteLength(raw, 'utf8') / 1024).toFixed(0)}KB / gzip ${Math.round(entryGzip / 1024)}KB`
  + ` / 引擎分块 ${chunkFiles.length} 个（gzip 合计 ${(chunksGzip / 1024 / 1024).toFixed(2)}MB，单块硬顶 ${Math.round(CHUNK_GZIP_CAP / 1024)}KB / 每块预算 ${Object.keys(chunkCaps).length} 份）`
  + ` / 逐模块编译 ${starts.length} 个 / 宿主形态可执行 / 与源码一致`);
