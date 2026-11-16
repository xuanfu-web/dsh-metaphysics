/**
 * 提交前的语法闸，自己不能是坏的。
 *
 * 起因：改完 src/app.js 跑 preflight，报「Illegal return statement」。app.js 是模块片段，
 * build 时才被包进函数里，顶层那个 `return { ... }` 单看文件当然不合法。可闸门一旦这样
 * 误报，人的第一反应就是加 SKIP 或者绕过它——闸就废了，比没装闸更糟。
 *
 * 这份测试守两件事：
 *   ① 片段文件走「包进函数体再解析」，模块文件走 node --check；
 *   ② 真的坏语法仍然要报出来（别为了不误报把闸调成永远绿）。
 */
import { spawnSync } from 'node:child_process';
import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { ok } from './_harness.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const TOOL = readFileSync(join(HERE, '..', 'tools', 'preflight.mjs'), 'utf8');

// ── 一、分工判据 ─────────────────────────────────────────────
ok('有 syntaxErrorOf 这条分岔', /function syntaxErrorOf\(rel\)/.test(TOOL));
ok('按顶层 import/export 判断是不是模块', /\^\\s\*\(import\|export\)\\b\/m\.test\(src\)/.test(TOOL));
ok('模块文件仍然交给 node --check', /spawnSync\(NODE, \['--check', abs\]/.test(TOOL));
ok('片段文件包进函数体再解析', /new Function\(src\)/.test(TOOL));
ok('暂存检查改成一次拿错误文本', /const err = syntaxErrorOf\(f\);/.test(TOOL));
ok('不再对暂存文件一律 --check', !/spawnSync\(NODE, \['--check', f\]/.test(TOOL));

// ── 二、两个方向都得对：片段能过、坏语法要红 ───────────────────
// 把 syntaxErrorOf 从工具里抠出来单跑：不碰仓库文件，写到临时目录再解析。
const body = TOOL.slice(TOOL.indexOf('function syntaxErrorOf(rel)'));
const fnSrc = body.slice(0, body.indexOf('\nconst steps = [];'));
const dir = mkdtempSync(join(tmpdir(), 'mp-preflight-'));
const run = async (name, src) => {
  writeFileSync(join(dir, name), src, 'utf8');
  // REPO / NODE 是工具里的模块级常量：这里换成临时目录与本机 node。
  // probe 自己必须是合法模块——结果用 stdout 带出来，别写顶层 return。
  const file = join(dir, `probe-${Math.random().toString(36).slice(2)}.mjs`);
  writeFileSync(
    file,
    [
      "import { spawnSync } from 'node:child_process';",
      "import path from 'node:path';",
      "import { readFileSync } from 'node:fs';",
      `const REPO = ${JSON.stringify(dir)};`,
      `const NODE = ${JSON.stringify(process.execPath)};`,
      fnSrc,
      `process.stdout.write(syntaxErrorOf(${JSON.stringify(name)}));`,
    ].join('\n'),
    'utf8',
  );
  const r = spawnSync(process.execPath, [file], { encoding: 'utf8' });
  return { out: String(r.stdout || '').trim(), err: String(r.stderr || '').trim(), status: r.status };
};

// 片段：顶层 return 合法，不该报错
const frag = await run('frag.js', "const a = 1;\nif (a) { return { ok: a }; }\n");
ok('片段文件顶层 return 不算语法错', frag.out === '' && frag.status === 0, `out=${frag.out} err=${frag.err}`);

// 模块：正常 export 不该报错
const modOk = await run('good.mjs', "export const x = 1;\n");
ok('模块文件正常 export 通过', modOk.out === '' && modOk.status === 0, `out=${modOk.out} err=${modOk.err}`);

// 片段里的真语法错：必须报
const fragBad = await run('bad.js', "const a = ;\n");
ok('片段里的坏语法仍然报错', fragBad.out !== '', fragBad.out);

// 模块里的真语法错：必须报
const modBad = await run('bad.mjs', "export const a = ;\n");
ok('模块里的坏语法仍然报错', modBad.out !== '', modBad.out);

// 括号没配平（最常见的真错）也要抓到
const unbalanced = await run('unbalanced.js', "function f() {\n  return 1;\n");
ok('括号没配平报错', unbalanced.out !== '', unbalanced.out);

rmSync(dir, { recursive: true, force: true });

// ── 三、闸门本身还在流程里 ───────────────────────────────────
ok('轻量模式仍查文案/行尾/注入面', /文案闸/.test(TOOL) && /行尾必须是 LF/.test(TOOL) && /HTML 注入面/.test(TOOL));
ok('--full 仍然跑全闸', /\['tools\/build-all\.mjs', '--gate'\]/.test(TOOL));
ok('失败时退出码非零', /process\.exitCode = 1/.test(TOOL));

// 顺手守一下真实仓库：app.js 是片段形态，别哪天被人加上 export 头变成模块
const APP = readFileSync(join(HERE, '..', 'src', 'app.js'), 'utf8');
ok('src/app.js 仍是模块片段（顶层 return，无 import/export）', /^return \{/m.test(APP) && !/^\s*(import|export)\b/m.test(APP));
