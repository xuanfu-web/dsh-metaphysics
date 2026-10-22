// 顺序跑完 test/ 下的全部 *.test.mjs，汇总退出码。
// 每个测试都用 stdio: 'inherit'，既能实时看到输出，也不走管道。
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const dir = path.join(root, 'test');
const files = readdirSync(dir)
  .filter((f) => f.endsWith('.test.mjs'))
  .sort();

let failed = 0;
const started = Date.now();
for (const f of files) {
  const t = Date.now();
  const r = spawnSync(process.execPath, [path.join(dir, f)], { stdio: 'inherit' });
  const ms = Date.now() - t;
  if (r.status !== 0) {
    failed += 1;
    console.log(`\n✗ ${f} 失败（退出码 ${r.status === null ? r.signal : r.status}，${ms} ms）\n`);
  } else {
    console.log(`\n✓ ${f}（${ms} ms）\n`);
  }
}

const total = ((Date.now() - started) / 1000).toFixed(1);
console.log(`${files.length - failed}/${files.length} 个测试文件通过，用时 ${total}s`);
process.exit(failed ? 1 : 0);
