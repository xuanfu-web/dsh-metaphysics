#!/usr/bin/env node
// 性能门槛：把 tools/bench.mjs 的实测值对一组宽松上限，超限即失败。
//
// 阈值依据 docs/性能与稳定性-优化方案.md 的目标（bazi p50 < 1.5ms、1000 盘 < 400ms），
// 再留 5–10 倍余量给 CI 机器与冷启动抖动——这道闸拦的是「数量级回退」，
// 不是毫秒级波动。慢机可用 DSH_PERF_SCALE 放大（如 DSH_PERF_SCALE=3），不修改代码。
//
// 用法：node tools/check-perf.mjs [--json]
import { pathToFileURL } from 'node:url';
import { runBench, CASES } from './bench.mjs';

export const LIMITS = {
  firstMs: 150, // 首次（含模块初始化与缓存未热）
  p50: 10, // 热路径中位数
  p95: 25, // 热路径 95 分位
  interpret: 250, // 单体系带解析
  batchMs: 4000, // 1000 盘混体系
  rssMb: 800,
};

export function limitOf(key, scale = 1) {
  return LIMITS[key] * scale;
}

export function perfScale() {
  const v = Number(process.env.DSH_PERF_SCALE);
  return Number.isFinite(v) && v >= 1 ? v : 1;
}

/** 纯函数：把一次基准结果对上限，返回逐项判定（测试可直接构造样本） */
export function judgeBench(summary, scale = 1) {
  const checks = [];
  const add = (name, value, key, unit = 'ms') => {
    const limit = +limitOf(key, scale).toFixed(2);
    checks.push({ name, value, limit, unit, ok: value <= limit });
  };
  for (const row of summary.table) {
    add(`${row.system} 首次`, row.firstMs, 'firstMs');
    add(`${row.system} p50`, row.p50, 'p50');
    add(`${row.system} p95`, row.p95, 'p95');
  }
  for (const [sys, v] of Object.entries(summary.interpret)) add(`${sys} 带解析`, v.ms, 'interpret');
  add('1000 盘混体系', summary.batch.ms, 'batchMs');
  add('RSS', summary.rssMb, 'rssMb', 'MB');
  return checks;
}

function main() {
  const scale = perfScale();
  const summary = runBench(20);
  const checks = judgeBench(summary, scale);
  const failed = checks.filter((c) => !c.ok);
  const asJson = process.argv.includes('--json');

  if (asJson) {
    console.log(JSON.stringify({
      scale,
      systems: Object.keys(CASES).length,
      checks,
      passed: checks.length - failed.length,
      failed: failed.length,
    }, null, 1));
  } else {
    console.log('体系      首次(ms)   p50   p95   文本(B)');
    for (const t of summary.table) {
      console.log(
        `${t.system.padEnd(9)} ${String(t.firstMs).padStart(8)} ${String(t.p50).padStart(6)} ` +
        `${String(t.p95).padStart(5)} ${String(t.bytes).padStart(8)}`
      );
    }
    console.log(`\n1000 盘混体系：${summary.batch.ms}ms，RSS ${summary.rssMb}MB（门槛 ×${scale}）`);
    for (const c of failed) {
      console.log(`✗ ${c.name}：${c.value}${c.unit} > 上限 ${c.limit}${c.unit}`);
    }
    if (failed.length) {
      console.log(`\n性能门槛未通过：${failed.length} 项超限（慢机可设 DSH_PERF_SCALE 放大）`);
    } else {
      console.log(`\n✓ 性能门槛通过：${checks.length} 项均在限内（慢机可设 DSH_PERF_SCALE）`);
    }
  }

  if (failed.length) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
