// 跑测试的并发池。
//
// 为什么不是「一个 for 循环 + spawnSync」：那套写法假设启动一个 node 只要几十毫秒。
// 这台机器上 `node -e 1` 要 2~8 秒（安全软件逐次扫描新进程），199 个测试文件串行
// 就是二十多分钟，一轮全闸跑不完就被当成挂了。
//
// 那段等待发生在进程创建上（IO / 扫描），不是 CPU 计算，所以并发能直接摊掉它：
// 6 路并发下，等待从「199 次 × 4 秒」压成「34 次 × 4 秒」。
// CPU 计算本身不会因此变快，也不会更慢（并发度封顶在核数附近）。
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

/** test/ 下所有 *.test.mjs，按文件名排序，跳过 _ 开头的公共模块 */
export function listTests(dir) {
  return readdirSync(dir)
    .filter((f) => f.endsWith('.test.mjs') && !f.startsWith('_'))
    .sort();
}

/** 并发度：默认 6，TEST_CONCURRENCY 可覆盖，封顶 32 */
export function concurrencyOf(env = process.env) {
  const v = Number(env.TEST_CONCURRENCY || 0);
  if (Number.isFinite(v) && v > 0) return Math.min(32, Math.floor(v));
  return 6;
}

/** 跑一个测试文件，收全 stdout/stderr，不抛 */
export function runOne(file, cwd) {
  return new Promise((resolve) => {
    const t = Date.now();
    let out = '';
    let err = '';
    let p;
    try {
      p = spawn(process.execPath, [file], { cwd, stdio: ['ignore', 'pipe', 'pipe'] });
    } catch (e) {
      resolve({ file, code: 1, signal: null, out, err: String((e && e.message) || e), ms: Date.now() - t });
      return;
    }
    p.stdout.on('data', (d) => { out += d; });
    p.stderr.on('data', (d) => { err += d; });
    p.on('error', (e) => { err += String((e && e.message) || e); });
    p.on('close', (code, signal) => resolve({ file, code, signal, out, err, ms: Date.now() - t }));
  });
}

/**
 * 按并发度跑一批文件，返回值与 files 同序（结果不因完成顺序而错位）。
 * onDone(r, index) 在每完成一个时调用，用于进度显示；最终打印仍走返回值。
 */
export async function runAll(files, opts = {}) {
  const cwd = opts.cwd || process.cwd();
  const limit = Math.max(1, Math.min(opts.limit || concurrencyOf(), files.length || 1));
  const results = new Array(files.length);
  let next = 0;
  const worker = async () => {
    for (;;) {
      const i = next;
      next += 1;
      if (i >= files.length) return;
      const r = await runOne(files[i], cwd);
      results[i] = r;
      if (opts.onDone) opts.onDone(r, i);
    }
  };
  await Promise.all(Array.from({ length: limit }, worker));
  return results;
}

export { path };
