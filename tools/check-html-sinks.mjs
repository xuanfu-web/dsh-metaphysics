// HTML 注入面扫描：src/ 里所有 innerHTML / insertAdjacentHTML / outerHTML / document.write
// 写进去的 HTML，以及 React 的 dangerouslySetInnerHTML，逐插值核对——只要表达式里有
// 「无法证明已转义」的部分就报错。
//
// 背景：0.14.0 的塔罗面板把用户填的「所问之事」直接拼进 innerHTML，独立页的错误提示
// 又把 e.message（含用户原文）拼进去。这两处靠人眼 review 漏掉了，所以做成 CI 闸。
//
// 旧版（≤0.59.1）按「整条语句里出现过 esc( 」放行，实测漏四类：
//   1. `el('x').innerHTML = untrusted;`      —— 没有 ${ 也没有 + ，被当成静态
//   2. `= '<b>' + esc(name) + raw + '</b>'`  —— 一个 esc( 救全条，raw 没人管
//   3. `insertAdjacentHTML('beforeend', html)` —— 载荷是第二个实参，旧版只看赋值右侧
//   4. `dangerouslySetInnerHTML`             —— 不在名单里（app.js 用得最多）
// 现在按**每个拼接操作数 / 每个 ${...} 插值**单独判。
//
// 判定规则（保守、可解释；判不出来就是问题，宁可让人来加豁免）：
//   · 纯字面量、数字、true/false/null → 放行
//   · 模板串的静态文本不算，逐个 ${...} 递归判
//   · 调用名以 HTML 结尾（baziHTML / palaceDetailHTML / castAtHTML …）或以 Bar 结尾
//     （exportBar / followupBar），或在渲染器例外表里 → 放行；转义是渲染器自己的责任，
//     这是本仓的分工，新加渲染器不必改这个文件（命名即契约）
//   · 既不是渲染器也不是数据变换的调用（String(x)、window.prompt()、toHtml()）→ 报错；
//     实参为空也照报，否则 `foo()` 就成了万能通行证
//   · 非白名单调用（arr.map(...) 这种）→ 钻进实参继续判
//   · 三元只判两个分支（条件是布尔，不该被当成 HTML）；`a && b` 只判 b；`a || b` 两个都判
//   · 裸标识符 / 属性访问（perfHtml、last.html）→ 只有当它在本文件里只被赋值过一次、
//     且那个赋值表达式本身可证明安全时才放行；否则报错
//   · 行末 `// html-sink:ok 理由` → 人工豁免（与 check-patterns 的白名单同思路）
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
// 缺省扫 src/；测试可以把「已知会漏的四种写法」复制到临时目录喂给它，验证它真的会红
const SRC = path.resolve(process.argv[2] || path.join(root, 'src'));

// 约定之外的两个放行项：resultWithInterpret 是拼装入口，esc 就是转义函数本身
// （旧版靠语句里出现 'esc(' 放行，是整条放行；现在它只在**自己那一段**算安全）
const SAFE_FNS = new Set(['resultWithInterpret', 'esc']);
// 明确安全的裸值：整页样式常量等
const SAFE_VARS = new Set(['CSS']);
// 名字落在约定里但不是渲染器的（DOM 方法）
const NOT_RENDERERS = new Set(['insertAdjacentHTML']);
// 可核对的数据变换：实参（回调 / 分隔符）里若拼了 HTML，仍会被逐插值判到
const DATA_FNS = new Set([
  'map', 'flatMap', 'filter', 'join', 'reduce', 'concat', 'slice', 'split', 'sort', 'reverse',
  'forEach', 'fill', 'at', 'find', 'findIndex', 'some', 'every', 'includes', 'indexOf',
  'trim', 'replace', 'replaceAll', 'padStart', 'padEnd', 'toLowerCase', 'toUpperCase', 'toString',
]);

/** 本仓约定：以 HTML 结尾的是转义渲染器，以 Bar 结尾的是工具条构造器 */
function isRenderer(name) {
  return SAFE_FNS.has(name)
    || !NOT_RENDERERS.has(name) && (name.endsWith('HTML') || name.endsWith('Bar'));
}

const SINKS = [
  { re: /\.innerHTML\s*\+?=/, kind: 'assign' },
  { re: /\.outerHTML\s*\+?=/, kind: 'assign' },
  { re: /insertAdjacentHTML\s*\(/, kind: 'adjacent' },
  { re: /document\.write(?:ln)?\s*\(/, kind: 'call' },
  { re: /dangerouslySetInnerHTML/, kind: 'react' },
];

const problems = [];
const squeeze = (s) => String(s).replace(/\s+/g, ' ').trim().slice(0, 110);

/** 从 pos（指向 open）按平衡括号取出片段，字符串里的括号不计 */
function balanced(text, pos, open = '(', close = ')') {
  let depth = 0;
  let str = null;
  for (let i = pos; i < text.length; i++) {
    const ch = text[i];
    if (str) {
      if (ch === '\\') { i += 1; continue; }
      if (ch === str) str = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { str = ch; continue; }
    if (ch === open) depth += 1;
    else if (ch === close) {
      depth -= 1;
      if (depth === 0) return text.slice(pos, i + 1);
    }
  }
  return text.slice(pos);
}

/** 模板串里所有 ${...} 的表达式体 */
function interpolations(expr) {
  const out = [];
  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (ch === '"' || ch === "'") {
      const close = expr.indexOf(ch, i + 1);
      i = close < 0 ? expr.length : close;
      continue;
    }
    if (ch === '$' && expr[i + 1] === '{') {
      const body = balanced(expr, i + 1, '{', '}');
      out.push(body.slice(1, -1));
      i += body.length;
    }
  }
  return out;
}

/** 顶层（字符串与括号之外）按给定分隔符切分 */
function splitTop(expr, sep) {
  const parts = [];
  let buf = '';
  let depth = 0;
  let str = null;
  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (str) {
      buf += ch;
      if (ch === '\\') { buf += expr[++i] ?? ''; continue; }
      if (ch === str) str = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { str = ch; buf += ch; continue; }
    if ('({['.includes(ch)) depth += 1;
    else if (')}]'.includes(ch)) depth -= 1;
    const unary = sep === '+' && isUnary(expr, i);
    const doubled = (sep === '|' || sep === '&') && expr[i + 1] === sep;
    if (depth === 0 && ch === sep && !unary && !doubled) {
      if (sep === '&' || sep === '|') { i += 1; } // 逻辑运算符整体跳过
      parts.push(buf);
      buf = '';
      continue;
    }
    buf += ch;
  }
  parts.push(buf);
  return parts.map((p) => p.trim()).filter(Boolean);
}

/** `+` 是否是一元正号（前一个非空字符是运算符 / ( / , / = 等） */
function isUnary(expr, i) {
  let k = i - 1;
  while (k >= 0 && /\s/.test(expr[k])) k -= 1;
  if (k < 0) return true;
  return /[([{,;:=&|+*/%!?<>-]/.test(expr[k]);
}

/** 顶层三元：返回 [真分支, 假分支]（条件丢掉——它是布尔，不是 HTML）。嵌套三元交给递归。 */
function ternary(expr) {
  const q = topIndex(expr, '?');
  if (q < 0) return null;
  let depth = 0;
  let str = null;
  let pending = 0;
  for (let i = q + 1; i < expr.length; i++) {
    const ch = expr[i];
    if (str) { if (ch === '\\') { i += 1; continue; } if (ch === str) str = null; continue; }
    if (ch === '"' || ch === "'" || ch === '`') { str = ch; continue; }
    if ('({['.includes(ch)) depth += 1;
    else if (')}]'.includes(ch)) depth -= 1;
    else if (depth === 0) {
      if (ch === '?' && expr[i + 1] !== '.' && expr[i + 1] !== '?') pending += 1;
      else if (ch === ':' && expr[i + 1] !== ':' && expr[i - 1] !== ':') {
        if (pending === 0) return [expr.slice(q + 1, i).trim(), expr.slice(i + 1).trim()];
        pending -= 1;
      }
    }
  }
  return null;
}

/** 顶层第一个给定字符的位置（跳过字符串、注释性冒号、可选链） */
function topIndex(expr, ch) {
  let depth = 0;
  let str = null;
  for (let i = 0; i < expr.length; i++) {
    const c = expr[i];
    if (str) { if (c === '\\') { i += 1; continue; } if (c === str) str = null; continue; }
    if (c === '"' || c === "'" || c === '`') { str = c; continue; }
    if ('({['.includes(c)) depth += 1;
    else if (')}]'.includes(c)) depth -= 1;
    else if (c === ch && depth === 0) {
      if (ch === '?' && (expr[i + 1] === '.' || expr[i + 1] === '?')) continue;
      if (ch === ':' && (expr[i + 1] === ':' || expr[i - 1] === ':')) continue;
      return i;
    }
  }
  return -1;
}

/**
 * 整个表达式就是**一个**字符串字面量。
 * 不能用 `^(['"]).*\1$` 判：'<b>' + esc(a) + raw + '</b>' 首尾同为单引号，
 * 那条正则会把它当字面量放过——这正是旧闸漏检 ② 的成因。
 */
function isBareLiteral(s) {
  const t = s.trim();
  const q = t[0];
  if (q !== "'" && q !== '"' && q !== '`') return false;
  if (q === '`' && t.includes('${')) return false;
  for (let i = 1; i < t.length; i++) {
    if (t[i] === '\\') { i += 1; continue; }
    if (t[i] === q) return i === t.length - 1;
  }
  return false;
}

/** 剥掉最外层的成对圆括号：`(a ? b : c) + d` 要先剥才看得见里面的三元 */
function stripParens(text) {
  let t = text.trim();
  while (t.startsWith('(') && t.endsWith(')')) {
    const blk = balanced(t, 0, '(', ')');
    if (blk.length !== t.length) break;
    t = blk.slice(1, -1).trim();
  }
  return t;
}

function isConstant(expr) {
  const s = expr.trim();
  return /^-?[\d._]+$/.test(s) || /^(true|false|null|undefined)$/.test(s);
}

/** 顶层调用名：`window.__PP.baziHTML(r)` → { head: 'window.__PP.baziHTML', name: 'baziHTML' }；不是调用返回 null */
function callInfo(expr) {
  const at = findCallParen(expr);
  if (at < 0) return null;
  const head = expr.slice(0, at).trim();
  if (!/^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*)*$/.test(head)) return null;
  const m = /([A-Za-z_$][\w$]*)$/.exec(head);
  return m ? { head, name: m[1] } : null;
}

function findCallParen(expr) {
  let depth = 0;
  let str = null;
  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (str) { if (ch === '\\') { i += 1; continue; } if (ch === str) str = null; continue; }
    if (ch === '"' || ch === "'" || ch === '`') { str = ch; continue; }
    // 顶层左圆括号就是要找的调用括号，必须先判再入栈（早先写反了，导致所有渲染器都认不出来）
    if (ch === '(' && depth === 0 && expr[i - 1] !== '.') return i;
    if ('({['.includes(ch)) depth += 1;
    else if (')}]'.includes(ch)) depth -= 1;
  }
  return -1;
}

/**
 * 这段表达式能否证明「写进 DOM 的内容都过过转义」。
 * @param {string} expr
 * @param {Map<string,string[]>} env 本文件的赋值表：名字 → 该名字的全部赋值表达式
 */
function unproven(expr, env, depth = 0) {
  const s = stripParens(String(expr).trim());
  if (!s) return [];
  if (depth > 8) return [`递归过深，判不动：${squeeze(s)}`];
  const out = [];

  // 一个整块字面量（含无插值模板）：直接安全
  if (isBareLiteral(s)) return [];
  if (isConstant(s)) return [];
  // 含插值的字面量 / 模板：只看插值
  if (s.includes('${') && findCallParen(s) < 0) {
    const plus = splitTop(s, '+');
    const pieces = plus.length > 1 ? plus : [s];
    for (const p of pieces) {
      if (p.includes('${')) for (const inner of interpolations(p)) out.push(...unproven(inner, env, depth + 1));
      else out.push(...unproven(p, env, depth + 1));
    }
    return out;
  }
  const ter = ternary(s);
  if (ter) {
    for (const branch of ter) out.push(...unproven(branch, env, depth + 1));
    return out;
  }
  const or = splitTop(s, '|');
  if (or.length > 1) {
    for (const part of or) out.push(...unproven(part, env, depth + 1));
    return out;
  }
  const and = splitTop(s, '&');
  if (and.length > 1) return unproven(and[and.length - 1], env, depth + 1);
  const plus = splitTop(s, '+');
  if (plus.length > 1) {
    for (const part of plus) out.push(...unproven(part, env, depth + 1));
    return out;
  }

  const call = callInfo(s);
  if (call) {
    if (isRenderer(call.name)) return []; // 渲染器自己负责转义，这是本仓的分工
    const args = balanced(s, findCallParen(s), '(', ')').slice(1, -1);
    // 数组/字符串上的数据变换（arr.map(x => `<i>${esc(x)}</i>`）：钻进实参继续判
    if (call.head.includes('.') && DATA_FNS.has(call.name)) return unproven(args, env, depth + 1);
    // 其余调用（String(x)、window.prompt()、自造的 toHtml()…）：既不是渲染器也不是
    // 可核对的数据变换，一律当未转义——空实参也算，否则 foo() 就成了万能通行证
    return [`不是渲染器、也无法核对：${squeeze(s)}`];
  }
  if (/^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*)*$/.test(s)) {
    if (SAFE_VARS.has(s) || /^(window|document|this)$/.test(s)) return [];
    if (env.has(s)) {
      // 同一个名字被赋值多次时每一次都要干净，否则这里就是注入点
      for (const init of env.get(s)) out.push(...unproven(init, env, depth + 1));
      return out;
    }
    return [`未证明已转义：${squeeze(s)}`];
  }
  // 下标 / 对象 / 箭头函数等写法：能钻插值就钻，钻不动就报
  for (const inner of interpolations(s)) out.push(...unproven(inner, env, depth + 1));
  if (s.includes('${')) return out; // 整块由模板拼成，插值已逐个查过
  return [`写法超出本闸能力：${squeeze(s)}`];
}

/** 收集本文件的赋值表：名字（含 `x.y` 属性）→ 该名字在本文件里的全部赋值表达式 */
function buildEnv(text) {
  const env = new Map();
  const lines = text.split(/\r?\n/);
  const re = /^\s*(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=(?!=)|^\s*([A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)+)\s*=(?!=)/;
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const m = re.exec(raw);
    if (!m) continue;
    const key = m[1] || m[2];
    const eq = raw.indexOf('=', raw.indexOf(key) + key.length);
    if (/[-+*/%]=/.test(raw.slice(eq, eq + 2))) continue; // 复合赋值（+=、||=）不认
    let stmt = raw.slice(eq + 1);
    let depth = 0;
    const scan = () => {
      for (const ch of stmt) {
        if ('({['.includes(ch)) depth += 1;
        else if (')}]'.includes(ch)) depth -= 1;
      }
    };
    scan();
    let j = i;
    while (j < lines.length - 1 && !(depth <= 0 && /[;}]\s*$/.test(stmt))) {
      j += 1;
      stmt += `\n${lines[j]}`;
      depth = 0;
      scan();
      if (stmt.length > 6000) break;
    }
    const body = stmt.replace(/[;}\s]+$/, '').trim();
    if (!body) continue;
    if (body.startsWith('function') || body.startsWith('async')) continue;
    const list = env.get(key) || [];
    if (list.length < 8) list.push(body);
    env.set(key, list);
  }
  return env;
}

/** 截到顶层的第一个 stop 字符（或提前闭合）为止，去掉后面同句的其它语句 */
function cutExpr(text, stops = [';']) {
  let depth = 0;
  let str = null;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (str) { if (ch === '\\') { i += 1; continue; } if (ch === str) str = null; continue; }
    if (ch === '"' || ch === "'" || ch === '`') { str = ch; continue; }
    if ('({['.includes(ch)) depth += 1;
    else if (')}]'.includes(ch)) { if (depth === 0) return text.slice(0, i); depth -= 1; }
    else if (depth === 0 && stops.includes(ch)) return text.slice(0, i);
  }
  return text;
}

/** 取出真正会被写进 DOM 的那段表达式 */
function payload(full, kind) {
  if (kind === 'assign') {
    const at = /\.innerHTML\s*\+?=|\.outerHTML\s*\+?=/.exec(full);
    return cutExpr(full.slice(at.index + at[0].length), [';']);
  }
  if (kind === 'react') {
    const m = /__html\s*:/.exec(full);
    if (!m) return '';
    let rest = full.slice(m.index + m[0].length).trimStart();
    if (rest.startsWith('{')) rest = balanced(rest, 0, '{', '}').slice(1, -1);
    else rest = cutExpr(rest, [',']);
    return rest.trim();
  }
  const at = /insertAdjacentHTML\s*\(|document\.write(?:ln)?\s*\(/.exec(full);
  const args = balanced(full, at.index + at[0].length - 1, '(', ')').slice(1, -1);
  const parts = splitTop(args, ',');
  return parts.length > 1 ? parts[parts.length - 1] : args;
}

const files = fs.readdirSync(SRC).filter((f) => f.endsWith('.js')).sort();
for (const f of files) {
  const text = fs.readFileSync(path.join(SRC, f), 'utf8');
  const env = buildEnv(text);
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const hit = SINKS.find((k) => k.re.test(lines[i]));
    if (!hit) continue;
    if (/html-sink:ok/.test(lines[i])) continue;
    let stmt = lines[i];
    let depth = 0;
    const scan = () => {
      for (const ch of stmt) {
        if ('({['.includes(ch)) depth += 1;
        else if (')}]'.includes(ch)) depth -= 1;
      }
    };
    scan();
    let j = i;
    while (j < lines.length - 1 && !(depth <= 0 && /[;}]\s*$/.test(stmt))) {
      j += 1;
      stmt += `\n${lines[j]}`;
      depth = 0;
      scan();
      if (stmt.length > 6000) break;
    }
    let rhs;
    try {
      rhs = payload(stmt, hit.kind);
    } catch (e) {
      problems.push(`${f}:${i + 1}  取不出载荷（${e.message}）\n      ${squeeze(stmt)}`);
      continue;
    }
    for (const b of unproven(rhs, env)) {
      problems.push(`${f}:${i + 1}  ${b}\n      ${squeeze(stmt)}`);
    }
  }
}

if (problems.length) {
  console.error(`✗ ${problems.length} 处 HTML 注入面无法证明已转义：`);
  for (const p of problems) console.error(`  - ${p}`);
  console.error('  处理方式：用 esc(...)（src/panel-kit.js）包一层，或走 *HTML() 渲染器，');
  console.error('  或改 textContent / createElement。确实需要裸写时在该行末加 `// html-sink:ok 理由`。');
  process.exit(1);
}

console.log(`✓ HTML 注入面扫描通过：${files.length} 个文件，逐插值核对（含 dangerouslySetInnerHTML / insertAdjacentHTML / 裸变量赋值）`);
