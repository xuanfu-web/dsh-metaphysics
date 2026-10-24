// 统一断言工具：任何一条断言失败，都必须让进程以非零退出码结束。
//
// 背景：此前 9 个测试文件把 ok() 写成纯 console.log（bazi / calendar / liuyao /
// lunar / shensha / tarot / ziwei / e2e / layout），断言 FAIL 之后进程仍然 exit 0，
// 而 tools/test-all.mjs 只按退出码判定，于是 `npm test` 恒报「27/27 通过」，
// 这些文件的防回归能力实际为零。见 README「测试」一节。
//
// 用法：
//   import { ok, eq } from './_harness.mjs';
//   ok('标签', 条件, '失败时展示的实值');
//   eq('标签', 实际值, 期望值);
// 不需要手动调用 done()：模块在进程退出时统一打印计数并设置退出码。

let pass = 0;
let fail = 0;

const fmt = (v) => {
  if (typeof v === 'string') return v;
  try {
    return JSON.stringify(v);
  } catch (e) {
    return String(v);
  }
};

export function ok(label, cond, extra = '') {
  const line = `${label}${extra ? '  -> ' + extra : ''}`;
  if (cond) {
    pass += 1;
    console.log(`PASS  ${line}`);
    return true;
  }
  fail += 1;
  console.log(`FAIL  ${line}`);
  return false;
}

export function eq(label, actual, expected) {
  const same = actual === expected || JSON.stringify(actual) === JSON.stringify(expected);
  return ok(label, same, same ? '' : `期望 ${fmt(expected)}，实际 ${fmt(actual)}`);
}

export function counts() {
  return { pass, fail };
}

process.on('exit', () => {
  if (!pass && !fail) return;
  console.log(`\n${pass} PASS / ${fail} FAIL`);
  if (fail > 0) process.exitCode = 1;
});
