// HTML 注入面扫描：src/ 里所有 innerHTML / insertAdjacentHTML / outerHTML 赋值，
// 只要拼接了变量就必须经过转义函数。
//
// 背景：0.14.0 的塔罗面板把用户填的「所问之事」直接拼进 innerHTML，独立页的错误提示
// 又把 e.message（含用户原文）拼进去。这两处靠人眼 review 漏掉了，所以做成 CI 闸。
//
// 判定规则（保守、可解释）：
//   - 赋值右侧是纯字面量（不含 ${ 也不含 +）→ 放行
//   - 含 ${...} 或 + 拼接，但表达式里出现下列白名单调用 → 放行
//   - 其余一律报错，人工确认后把安全写法补上（通常是套一层 esc(...)）
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const SRC = path.join(root, 'src');
const SAFE_CALLS = ['esc(', 'castAtHTML(', 'resultWithInterpret(', 'palaceDetailHTML(', 'exportBar('];
const SINKS = [/\.innerHTML\s*=/, /insertAdjacentHTML\s*\(/, /\.outerHTML\s*=/];

const files = fs.readdirSync(SRC).filter((f) => f.endsWith('.js')).sort();
const problems = [];

for (const f of files) {
  const text = fs.readFileSync(path.join(SRC, f), 'utf8');
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    if (!SINKS.some((re) => re.test(lines[i]))) continue;
    // 把这条语句拼出来（简单括号/引号平衡，够用；本项目的写法都是短语句）
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
    while (j < lines.length - 1 && !(depth <= 0 && /;\s*$/.test(stmt))) {
      j += 1;
      stmt += `\n${lines[j]}`;
      depth = 0;
      scan();
      if (stmt.length > 4000) break;
    }
    const rhs = stmt.slice(stmt.indexOf('=') + 1);
    const dynamic = rhs.includes('${') || /\+\s*[A-Za-z_$]/.test(rhs);
    if (!dynamic) continue;
    if (SAFE_CALLS.some((s) => rhs.includes(s))) continue;
    problems.push(`${f}:${i + 1}  ${lines[i].trim().slice(0, 110)}`);
  }
}

if (problems.length) {
  console.error(`✗ ${problems.length} 处 HTML 注入面未转义：`);
  for (const p of problems) console.error(`  - ${p}`);
  console.error('  处理方式：用 esc(...)（src/panel-kit.js）或改 textContent / 拆成 createElement。');
  process.exit(1);
}

console.log(`✓ HTML 注入面扫描通过：${files.length} 个文件，未发现未转义的 innerHTML 拼接`);
