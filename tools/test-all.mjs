// 跑完 test/ 下的全部 *.test.mjs，汇总退出码。
//
// 输出格式与串行版保持逐字一致（每个文件的整块输出 + 一行 ✓/✗），
// 因为 CI 日志和 verify-tests-can-fail 都会读它。
// 差别只在调度：并发池，见 tools/run-tests.mjs 里关于「启动一次 node 要几秒」的说明。
import path from 'node:path';
import { listTests, runAll, concurrencyOf } from './run-tests.mjs';

const root = path.resolve(import.meta.dirname, '..');
const dir = path.join(root, 'test');
const files = listTests(dir);

const started = Date.now();
const runs = await runAll(files.map((f) => path.join(dir, f)), { cwd: root, limit: concurrencyOf() });

let failed = 0;
for (let i = 0; i < runs.length; i += 1) {
  const r = runs[i];
  const f = files[i];
  // 整块打印：交错输出会让日志没法读，也让「哪个文件红了」变成猜谜
  if (r.out) process.stdout.write(r.out);
  if (r.err) process.stderr.write(r.err);
  if (r.code !== 0) {
    failed += 1;
    console.log(`\n✗ ${f} 失败（退出码 ${r.code === null ? r.signal : r.code}，${r.ms} ms）\n`);
  } else {
    console.log(`\n✓ ${f}（${r.ms} ms）\n`);
  }
}

const total = ((Date.now() - started) / 1000).toFixed(1);
console.log(`${runs.length - failed}/${runs.length} 个测试文件通过，用时 ${total}s（${concurrencyOf()} 路并发）`);
process.exit(failed ? 1 : 0);
