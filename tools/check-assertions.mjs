// 断言数基线守护：防止「删断言/改断言」让回归悄悄失效。
//
// 只看退出码还不够——把一条断言注释掉、或者把一个文件里的 20 条断言删到 2 条，
// 退出码依旧全是 0。这里把每个文件的 PASS 条数锁进 test/assertion-baseline.json，
// 少于基线即失败。
//
// 用法：
//   node tools/check-assertions.mjs            # 对比基线（CI 用）
//   node tools/check-assertions.mjs --update   # 断言数确实要减少时，显式重建基线
import { readdirSync, readFileSync, writeFileSync, existsSync, copyFileSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { listTests, runAll } from './run-tests.mjs';

const root = path.resolve(import.meta.dirname, '..');
const testDir = path.join(root, 'test');
const baselinePath = path.join(testDir, 'assertion-baseline.json');
const update = process.argv.includes('--update');

const files = listTests(testDir);

const result = {};
const broken = [];
// 并发跑：串行 spawnSync 在本机要二十多分钟（每次启动 node 都被安全软件扫一遍），
// 结果按 files 顺序返回，所以下面的统计与基线文件顺序不受完成顺序影响。
const runs = await runAll(files.map((f) => path.join(testDir, f)), { cwd: root });
for (const r of runs) {
  const f = path.basename(r.file);
  const out = `${r.out || ''}\n${r.err || ''}`;
  const pass = (out.match(/^PASS /gm) || []).length;
  const fail = (out.match(/^FAIL /gm) || []).length;
  result[f] = { pass, fail };
  if (r.code !== 0 || fail > 0) broken.push(`${f}（退出码 ${r.code}，FAIL ${fail}）`);
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

  // 页面里内嵌「N 个测试文件 / M 条断言」（build-html 读的正是这份基线）。
  // 基线一改，已经构建好的命理排盘.html 与 docs/index.html 就陈旧了，
  // standalone.test 会比出「字节相同内容不同」——2026-11-15 就是这么又红了一次。
  // 与其让人记住「update 完还要 build」，不如让 update 自己把页面刷掉。
  const root = path.resolve(import.meta.dirname, '..');
  const built = spawnSync(process.execPath, ['tools/build-html.mjs'], { cwd: root, encoding: 'utf8' });
  if (built.status !== 0) {
    console.error('✗ 基线更新后重建页面失败：');
    console.error(built.stderr || built.stdout);
    process.exit(1);
  }
  const pagePath = path.join(root, '命理排盘.html');
  const docsPath = path.join(root, 'docs', 'index.html');
  if (existsSync(pagePath) && existsSync(path.dirname(docsPath))) {
    copyFileSync(pagePath, docsPath);
    console.log('✓ 页面已同步重建：命理排盘.html → docs/index.html（内嵌的测试数/断言数跟着基线走）');
  }
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
