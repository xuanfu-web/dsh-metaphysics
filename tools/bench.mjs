// 性能基准：冷启动 / 热路径 / 批量吞吐 / 输出体积
//
// 用法：
//   node tools/bench.mjs            # 默认 40 轮
//   node tools/bench.mjs 200        # 指定轮数
//   node tools/bench.mjs 40 --json  # 机器可读
//
// 用途：改动前后的同机 A/B 对比。基线请用 git worktree 拉 main：
//   git worktree add ../baseline main
//   node ../baseline/tools/bench.mjs 40
import { compute, renderText } from '../engine/index.js';

const rounds = Number(process.argv[2] || 40);
const asJson = process.argv.includes('--json');

const CASES = {
  bazi: { system: 'bazi', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州' },
  ziwei: { system: 'ziwei', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州' },
  liuyao: { system: 'liuyao', datetime: '2026-10-24T19:00', seed: 42, question: '基准' },
  meihua: { system: 'meihua', mode: 'time', datetime: '2026-10-24T19:00' },
  daliuren: { system: 'daliuren', datetime: '2026-10-24T19:00' },
  qimen: { system: 'qimen', datetime: '2026-10-24T19:00' },
  tarot: { system: 'tarot', seed: 42, count: 3, question: '基准' },
  hepan: {
    system: 'hepan', datetime: '1996-01-19T07:31', gender: 'male',
    partner: { datetime: '1998-05-20T10:30', gender: 'female' },
  },
};

const median = (a) => {
  const b = [...a].sort((x, y) => x - y);
  return b[Math.floor(b.length / 2)];
};
const pct = (a, p) => {
  const b = [...a].sort((x, y) => x - y);
  return b[Math.min(b.length - 1, Math.floor(b.length * p))];
};

function timed(fn) {
  const s = process.hrtime.bigint();
  const v = fn();
  return [Number(process.hrtime.bigint() - s) / 1e6, v];
}

const table = [];
for (const [name, args] of Object.entries(CASES)) {
  const [first, result] = timed(() => compute(args));
  const text = renderText(result);
  const samples = [];
  for (let i = 0; i < rounds; i++) samples.push(timed(() => renderText(compute(args)))[0]);
  table.push({
    system: name,
    firstMs: +first.toFixed(2),
    p50: +median(samples).toFixed(2),
    p95: +pct(samples, 0.95).toFixed(2),
    bytes: Buffer.byteLength(text, 'utf8'),
  });
}

// 批量吞吐
const list = Object.values(CASES);
const [batchMs] = timed(() => {
  for (let i = 0; i < 1000; i++) compute(list[i % list.length]);
});

// 带解析
const interpret = {};
for (const sys of ['bazi', 'ziwei', 'liuyao']) {
  const [ms, r] = timed(() =>
    compute({ ...CASES[sys], withInterpret: true, question: '基准问题', direction: 'general' }));
  interpret[sys] = { ms: +ms.toFixed(2), bytes: Buffer.byteLength(renderText(r), 'utf8') };
}

const summary = {
  rounds,
  table,
  batch: { charts: 1000, ms: +batchMs.toFixed(0), perSec: Math.round(1000 / (batchMs / 1000)) },
  interpret,
  rssMb: Math.round(process.memoryUsage().rss / 1048576),
};

if (asJson) {
  console.log(JSON.stringify(summary, null, 1));
} else {
  console.log('体系      首次(ms)   p50   p95   文本(B)');
  for (const t of table) {
    console.log(
      `${t.system.padEnd(9)} ${String(t.firstMs).padStart(8)} ${String(t.p50).padStart(6)} ` +
      `${String(t.p95).padStart(5)} ${String(t.bytes).padStart(8)}`
    );
  }
  console.log(`\n1000 盘混体系：${summary.batch.ms}ms（${summary.batch.perSec} 盘/秒），RSS ${summary.rssMb}MB`);
  console.log('含解析：' + Object.entries(interpret).map(([k, v]) => `${k} ${v.ms}ms/${v.bytes}B`).join('　'));
}
