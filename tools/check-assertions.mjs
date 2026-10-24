// 断言数基线守护：防止「删断言/改断言」让回归悄悄失效。
//
// 只看退出码还不够——把一条断言注释掉、或者把一个文件里的 20 条断言删到 2 条，
// 退出码依旧全是 0。这里把每个文件的 PASS 条数锁进 test/assertion-baseline.json，
// 少于基线即失败。
//
// 用法：
//   node tools/check-assertions.mjs            # 对比基线（CI 用）
//   node tools/check-assertions.mjs --update   # 断言数确实要减少时，显式重建基线
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const testDir = path.join(root, 'test');
const baselinePath = path.join(testDir, 'assertion-baseline.json');
const update = process.argv.includes('--update');

const files = readdirSync(testDir)
  .filter((f) => f.endsWith('.test.mjs') && !f.startsWith('_'))
  .sort();

const result = {};
const broken = [];
for (const f of files) {
  const r = spawnSync(process.execPath, [path.join(testDir, f)], { encoding: 'utf8' });
  const out = `${r.stdout || ''}\n${r.stderr || ''}`;
  const pass = (out.match(/^PASS /gm) || []).length;
  const fail = (out.match(/^FAIL /gm) || []).length;
  result[f] = { pass, fail };
  if (r.status !== 0 || fail > 0) broken.push(`${f}（退出码 ${r.status}，FAIL ${fail}）`);
}

if (broken.length) {
  console.error(`✗ ${broken.length} 个文件有失败断言或非零退出：`);
  for (const b of broken) console.error(`  - ${b}`);
  process.exit(1);
}

const total = Object.values(result).reduce((n, x) => n + x.pass, 0);

if (update) {
  const doc = {
    note: '各测试文件的 PASS 条数基线；少于基线即失败。更新请跑 node tools/check-assertions.mjs --update 并在提交信息里说明理由。',
    total,
    files: result,
  };
  writeFileSync(baselinePath, `${JSON.stringify(doc, null, 2)}\n`, 'utf8');
  console.log(`✓ 已重建基线：${files.length} 个文件，共 ${total} 条 PASS`);
  process.exit(0);
}

if (!existsSync(baselinePath)) {
  console.error('✗ 缺少 test/assertion-baseline.json，先跑 node tools/check-assertions.mjs --update');
  process.exit(1);
}

const baseline = JSON.parse(readFileSync(baselinePath, 'utf8'));
const drops = [];
for (const [f, cur] of Object.entries(result)) {
  const old = baseline.files && baseline.files[f];
  if (!old) continue; // 新文件：不设门槛，等 --update 收进基线
  if (cur.pass < old.pass) drops.push(`${f}：${old.pass} → ${cur.pass}`);
}
const missing = Object.keys(baseline.files || {}).filter((f) => !(f in result));

if (drops.length) {
  console.error('✗ 断言数低于基线（被删掉或被改成不执行的断言）：');
  for (const d of drops) console.error(`  - ${d}`);
  process.exit(1);
}
if (missing.length) {
  console.error(`✗ 基线里的测试文件不见了：${missing.join('、')}`);
  process.exit(1);
}
if (total < Number(baseline.total || 0)) {
  console.error(`✗ PASS 总数 ${total} 低于基线 ${baseline.total}`);
  process.exit(1);
}

console.log(`✓ 断言基线守卫生效：${files.length} 个文件，${total} 条 PASS（基线 ${baseline.total}）`);
