// D3 性能门槛：基准形状、阈值余量、慢机放大与 CI 接线
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CASES, runBench } from '../tools/bench.mjs';
import { LIMITS, limitOf, judgeBench } from '../tools/check-perf.mjs';
import { ok, eq } from './_harness.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');

// ── ① 基准覆盖八个主力体系，形状稳定 ───────────────────────────
eq('基准覆盖体系数', Object.keys(CASES).length, 8);
ok('八个体系齐全', ['bazi', 'ziwei', 'liuyao', 'meihua', 'daliuren', 'qimen', 'tarot', 'hepan']
  .every((k) => CASES[k] && CASES[k].system === k));

const s = runBench(3);
eq('结果表行数', s.table.length, 8);
ok('每行有数值字段', s.table.every((r) => ['firstMs', 'p50', 'p95', 'bytes'].every((k) => Number.isFinite(r[k]))));
ok('文本体积为正', s.table.every((r) => r.bytes > 0));
eq('批量盘数', s.batch.charts, 1000);
ok('批量耗时为有限正数', Number.isFinite(s.batch.ms) && s.batch.ms > 0);
ok('解析覆盖三体系', ['bazi', 'ziwei', 'liuyao'].every((k) => s.interpret[k] && s.interpret[k].ms > 0));
ok('RSS 为正', s.rssMb > 0);

// ── ② 判定是纯函数：真实样本通过、超限样本判失败 ────────────────
ok('真实样本判定全通过（放宽 10 倍）', judgeBench(s, 10).every((c) => c.ok));
const blown = {
  table: [{ system: 'x', firstMs: 1e6, p50: 1e6, p95: 1e6, bytes: 1 }],
  interpret: { bazi: { ms: 1e6 } },
  batch: { charts: 1000, ms: 1e6 },
  rssMb: 1e6,
};
const blownChecks = judgeBench(blown);
eq('超限样本逐项计数', blownChecks.length, 6);
ok('超限样本全部判失败', blownChecks.every((c) => !c.ok));
eq('超限项带单位与上限', blownChecks[0].unit, 'ms');
ok('RSS 超限按 MB 判', blownChecks.at(-1).unit === 'MB' && !blownChecks.at(-1).ok);

// ── ③ 阈值比文档目标留出余量，避免这道闸变成毫秒级抖动测试 ──────
// 文档目标：bazi p50 < 1.5ms、1000 盘 < 400ms
ok('p50 门槛留 3 倍余量', LIMITS.p50 >= 1.5 * 3);
ok('批量门槛留 3 倍余量', LIMITS.batchMs >= 400 * 3);
ok('解析门槛宽于热路径', LIMITS.interpret >= LIMITS.p95 * 5);
ok('首次门槛宽于热路径', LIMITS.firstMs >= LIMITS.p95 * 5);
ok('门限全为正', Object.values(LIMITS).every((v) => v > 0));

// ── ④ 慢机放大只放大上限，不改基准 ────────────────────────────
eq('放大 3 倍', limitOf('p50', 3), LIMITS.p50 * 3);
eq('默认不放大', limitOf('batchMs'), LIMITS.batchMs);
ok('放大后仍大于原值', limitOf('firstMs', 2) > LIMITS.firstMs);

// ── ⑤ 接线：npm 脚本、CI 与文档都提到这道闸 ───────────────────
const pkg = JSON.parse(read('package.json'));
ok('npm 有 bench 脚本', /tools\/bench\.mjs/.test(pkg.scripts.bench || ''));
ok('npm 有 check:perf 脚本', /tools\/check-perf\.mjs/.test(pkg.scripts['check:perf'] || ''));
ok('test:ci 串上性能门槛', /check-perf\.mjs/.test(pkg.scripts['test:ci'] || ''));
const workflow = read('.github/workflows/test.yml');
ok('CI 跑性能门槛', /node tools\/check-perf\.mjs/.test(workflow));
ok('自动发布也跑性能门槛', /'check-perf', \['tools\/check-perf\.mjs'\]/.test(read('tools/autopublish.mjs')));

const readme = read('README.md');
ok('README 说明性能门槛', /性能门槛/.test(readme) && /DSH_PERF_SCALE/.test(readme));
const checker = read('tools/check-perf.mjs');
ok('阈值来源在代码里写明', /阈值依据内部性能方案的目标/.test(checker));
