// 约定闸（零依赖版 lint）：把几条这个项目反复强调、又最容易破的规矩做成机器检查。
//
// 规则（都能一句话说清为什么）：
//   1. engine/ 必须纯：不碰 document / window / localStorage / process / require
//      —— 它同时被 Host 与浏览器端共用，一旦掺入宿主 API，浏览器端会在运行时报错。
//   2. engine/ 不得有 console.*：排盘是纯计算，调试输出会混进工具结果或刷满用户控制台。
//   3. src/ 不得有 console.log：只允许 console.error（渲染失败要能被看见）。
//   4. 不得留下 debugger。
//   5. 不得用 var（全项目 ESM + const/let）。
//   6. new Date() 必须就地写 `// allow-clock: 理由`：时间必须能从 asOf 传进来，
//      否则结果不可复现。改成行级是防止「文件进了白名单」之后新增的时钟读取默认豁免。
//   7. Math.random 只允许出现在 engine/random.js 与两个"默认随机源"的形参上。
//   8. 参数布尔值必须经 engine/bool.js 读，不得写 `args.x === true`：
//      字符串 "true" 与数字 1 都是模型真会传的形状，严格比较会把它们当成 false。
//   9. 全仓不得出现凭据形态的字符串（npm_ / ghp_ / github_pat_ / 私钥头 / key=value 形态）。
//      —— 具体规则与文件挑选在 tools/check-secrets.mjs（除已知二进制外全扫，.env 与无后缀文件也扫），
//         这里只并入退出码。发布凭据放在 <用户目录>/.dsh/ 下、只从环境变量喂给脚本；
//         一旦落进仓库，撤回版本也撤不回已推送的历史。命中只报「文件:行」，绝不回显内容。
import fs from 'node:fs';
import path from 'node:path';
import { scanSecrets, listTextFiles } from './check-secrets.mjs';

const root = path.resolve(import.meta.dirname, '..');
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');
const filesIn = (dir) => fs.readdirSync(path.join(root, dir)).filter((f) => f.endsWith('.js')).sort();

const problems = [];
const add = (file, line, msg) => problems.push(`${file}:${line}  ${msg}`);

// 时钟豁免必须写在同一行：`// allow-clock: 理由`，理由至少 3 个字，
// 避免为了过闸写一个空注释。文件级白名单已取消——新增调用不能靠「同文件」蒙混。
const CLOCK_ALLOW = /\/\/\s*allow-clock:\s*(\S.*)$/;
const RANDOM_ALLOW = new Set(['engine/random.js', 'engine/tarot.js', 'engine/liuyao.js']);
// 参数对象的常见名字；只拦这些，避免误伤 `r.hourUnknown === true` 这类对计算结果的比较
const ARG_TRUE = /\b(args|input|opts|params)\.[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*\s*===\s*true\b/;

for (const f of filesIn('engine')) {
  const rel = `engine/${f}`;
  const lines = read(rel).split(/\r?\n/);
  lines.forEach((line, i) => {
    const n = i + 1;
    const commentOnly = /^\s*(\/\/|\*)/.test(line);
    if (/\b(document|window|localStorage|sessionStorage)\b/.test(line)) add(rel, n, 'engine 不得引用浏览器 API');
    if (/\bprocess\.(env|argv|cwd|exit)\b/.test(line)) add(rel, n, 'engine 不得引用 Node process');
    if (/\brequire\(/.test(line)) add(rel, n, 'engine 是 ESM，不得用 require');
    if (/\bconsole\./.test(line)) add(rel, n, 'engine 不得输出日志');
    if (/\bdebugger\b/.test(line)) add(rel, n, '不得留下 debugger');
    if (/^\s*var\s/.test(line)) add(rel, n, '用 const/let，不用 var');
    if (/new Date\(\)/.test(line)) {
      const clock = line.match(CLOCK_ALLOW);
      if (!clock || clock[1].trim().length < 3) add(rel, n, 'new Date() 须写 // allow-clock: 理由；时间应从 asOf 传入');
    }
    if (/Math\.random/.test(line) && !RANDOM_ALLOW.has(rel)) add(rel, n, 'Math.random 仅限 random.js 与默认随机源形参');
    if (!commentOnly && ARG_TRUE.test(line)) add(rel, n, '参数布尔值用 bool() 读，不要 === true（字符串 "true"/数字 1 会被当成 false）');
  });
}

for (const f of filesIn('src')) {
  const rel = `src/${f}`;
  read(rel).split(/\r?\n/).forEach((line, i) => {
    const n = i + 1;
    if (/console\.log/.test(line)) add(rel, n, 'src 不得留 console.log（console.error 可以）');
    if (/\bdebugger\b/.test(line)) add(rel, n, '不得留下 debugger');
    if (/^\s*var\s/.test(line)) add(rel, n, '用 const/let，不用 var');
  });
}

// 凭据扫描已拆到 tools/check-secrets.mjs（那边按「除已知二进制外全扫」，覆盖 .env / 无后缀文件）。
// 这里只负责把结果并进同一次退出码，规则本身不在两处各写一遍。
const secretProblems = scanSecrets(root, { skip: ['tools/check-secrets.mjs', 'tools/check-patterns.mjs', 'test/secrets-gate.test.mjs'] });
for (const p of secretProblems) problems.push(p);

// 宿主入口与工具层：同样的约定
for (const rel of ['index.js', 'tools/build-client.mjs', 'tools/build-html.mjs']) {
  read(rel).split(/\r?\n/).forEach((line, i) => {
    if (/\bdebugger\b/.test(line)) add(rel, i + 1, '不得留下 debugger');
  });
}

if (problems.length) {
  console.error(`✗ 约定检查未通过（${problems.length} 处）：`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

const total = filesIn('engine').length + filesIn('src').length + 3;
console.log(`✓ 约定检查通过：${total} 个文件（engine 纯净性 / 日志 / var / debugger / 时间与随机源 / 布尔读参）`);
console.log(`✓ 凭据扫描通过：${listTextFiles(root).length} 个文件无 token / 私钥明文（含 .env 与无扩展名文件）`);
