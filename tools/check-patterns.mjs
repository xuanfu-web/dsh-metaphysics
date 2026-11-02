// 约定闸（零依赖版 lint）：把几条这个项目反复强调、又最容易破的规矩做成机器检查。
//
// 规则（都能一句话说清为什么）：
//   1. engine/ 必须纯：不碰 document / window / localStorage / process / require
//      —— 它同时被 Host 与浏览器端共用，一旦掺入宿主 API，浏览器端会在运行时报错。
//   2. engine/ 不得有 console.*：排盘是纯计算，调试输出会混进工具结果或刷满用户控制台。
//   3. src/ 不得有 console.log：只允许 console.error（渲染失败要能被看见）。
//   4. 不得留下 debugger。
//   5. 不得用 var（全项目 ESM + const/let）。
//   6. new Date() 只允许出现在白名单文件：时间必须能从 asOf 传进来，否则结果不可复现。
//   7. Math.random 只允许出现在 engine/random.js 与两个"默认随机源"的形参上。
//   8. 全仓不得出现凭据形态的字符串（npm_ / ghp_ / github_pat_ / 私钥头）。
//      —— 发布凭据放在 <用户目录>/.dsh/ 下、只从环境变量喂给脚本；一旦落进仓库，
//         撤回版本也撤不回已推送的历史。命中只报「文件:行」，绝不回显匹配到的内容。
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');
const filesIn = (dir) => fs.readdirSync(path.join(root, dir)).filter((f) => f.endsWith('.js')).sort();

const problems = [];
const add = (file, line, msg) => problems.push(`${file}:${line}  ${msg}`);

// liuyao 的白名单理由：六神要按「起卦日」的日干起，调用方没给日辰时只能取本机当天；
// 工具层已支持 asOf 传入，保证同参数可复现。
const DATE_ALLOW = new Set(['engine/bazi.js', 'engine/ziwei.js', 'engine/tarot.js', 'engine/liuyao.js']);
const RANDOM_ALLOW = new Set(['engine/random.js', 'engine/tarot.js', 'engine/liuyao.js']);

for (const f of filesIn('engine')) {
  const rel = `engine/${f}`;
  const lines = read(rel).split(/\r?\n/);
  lines.forEach((line, i) => {
    const n = i + 1;
    if (/\b(document|window|localStorage|sessionStorage)\b/.test(line)) add(rel, n, 'engine 不得引用浏览器 API');
    if (/\bprocess\.(env|argv|cwd|exit)\b/.test(line)) add(rel, n, 'engine 不得引用 Node process');
    if (/\brequire\(/.test(line)) add(rel, n, 'engine 是 ESM，不得用 require');
    if (/\bconsole\./.test(line)) add(rel, n, 'engine 不得输出日志');
    if (/\bdebugger\b/.test(line)) add(rel, n, '不得留下 debugger');
    if (/^\s*var\s/.test(line)) add(rel, n, '用 const/let，不用 var');
    if (/new Date\(\)/.test(line) && !DATE_ALLOW.has(rel)) add(rel, n, 'new Date() 仅限白名单文件；时间应从 asOf 传入');
    if (/Math\.random/.test(line) && !RANDOM_ALLOW.has(rel)) add(rel, n, 'Math.random 仅限 random.js 与默认随机源形参');
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

// 凭据扫描：npm 的 npm_xxx、GitHub 的 ghp_/gho_/ghu_/ghs_/ghr_/github_pat_、PEM 私钥头。
// 只报位置，不回显内容——这条检查自己也不能成为泄露通道。
const SECRET = [
  [/npm_[A-Za-z0-9]{30,}/, '疑似 npm token 明文'],
  [/gh[pousr]_[A-Za-z0-9]{20,}/, '疑似 GitHub token 明文'],
  [/github_pat_[A-Za-z0-9_]{20,}/, '疑似 GitHub fine-grained token 明文'],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, '疑似私钥明文'],
];
const SKIP_DIR = new Set(['node_modules', '.git', '.workbuddy', 'dist', 'coverage']);
const SCAN_EXT = new Set(['.js', '.mjs', '.cjs', '.json', '.md', '.yml', '.yaml', '.html', '.svg', '.txt']);
const MAX_BYTES = 8 * 1024 * 1024; // 命理排盘.html 有几 MB；再大就不是源码了，跳过

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = path.relative(root, full).split(path.sep).join('/');
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      if (!SKIP_DIR.has(name)) walk(full, out);
    } else if (st.size <= MAX_BYTES && SCAN_EXT.has(path.extname(name).toLowerCase())) {
      out.push(rel);
    }
  }
}

const scanned = [];
walk(root, scanned);
for (const rel of scanned) {
  let text = '';
  try { text = fs.readFileSync(path.join(root, rel), 'utf8'); } catch (e) { continue; }
  text.split(/\r?\n/).forEach((line, i) => {
    for (const [re, msg] of SECRET) {
      // 本文件自己写着这些形态用于匹配，跳过
      if (rel === 'tools/check-patterns.mjs') return;
      if (re.test(line)) { add(rel, i + 1, msg); break; }
    }
  });
}

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
console.log(`✓ 约定检查通过：${total} 个文件（engine 纯净性 / 日志 / var / debugger / 时间与随机源）`);
console.log(`✓ 凭据扫描通过：${scanned.length} 个文件无 token / 私钥明文`);
