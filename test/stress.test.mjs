// 压测：连续排 200 次盘，看四件事——不崩、不漂、不涨、不串。
//
// 为什么单独一个文件：冒烟测的是「每一条路都能走通」，压测测的是「一直走会不会变形」。
// 缓存有上限但没人验过上限；同一份输入隔 200 次之后还该逐字节相同；堆内存该回到原处。
// 这些都不靠肉眼，靠数字。
//
//   1. 不崩：200 次全部出结果，且结果里没有 NaN / undefined / [object Object]
//   2. 不漂：同一份输入，压测前与压测后逐字节一致（防状态泄漏、防隐藏计数）
//   3. 不涨：日历三个 LRU 都不超上限；堆内存（强制 GC 后）增长有界
//   4. 不串：不同体系交替跑，各自的结论不互相污染
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { compute } from '../engine/index.js';
import { cacheMetrics } from '../engine/calendar.js';
import { ok } from './_harness.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ── 200 份不同的输入：按天轮转日期，逼缓存真的淘汰（同一份输入重复 200 次测不出上限）──
function argsOf(i) {
  const d = new Date(Date.UTC(1960, 0, 1));
  d.setUTCDate(d.getUTCDate() + i * 37);
  const dt = d.toISOString().slice(0, 16);
  switch (i % 4) {
    case 0: return { system: 'bazi', datetime: dt, gender: i % 2 ? 'male' : 'female', address: '安徽池州' };
    case 1: return { system: 'ziwei', datetime: dt, gender: 'female' };
    case 2: return { system: 'liuyao', datetime: dt, lines: [7, 8, 9, 7, 8, 6], question: '这件事能不能成' };
    default: return { system: 'qimen', datetime: dt, juMethod: 'chaibu' };
  }
}

const FIXED = { system: 'bazi', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州' };
const snapshot = () => {
  const r = compute({ ...FIXED, withInterpret: false });
  return JSON.stringify({ pillars: r.pillars, summary: r.summary, kong: r.kongwang });
};

// 预热：把首次的模块初始化、常量表摊掉，别把冷启动算进「后 50 次变慢」
for (let i = 0; i < 20; i++) compute(argsOf(i));

const before = snapshot();

// ── 一、跑 200 次 ───────────────────────────────────────────
const per = [];
const dirty = [];
let thrown = 0;
const t0 = Date.now();
for (let i = 0; i < 200; i++) {
  const s = Date.now();
  try {
    const r = compute(argsOf(i + 100));
    if (!r || !r.summary) {
      thrown += 1;
      dirty.push(`#${i} 没结果`);
    } else if (/\bNaN\b|\bundefined\b|\[object Object\]/.test(r.summary)) {
      dirty.push(`#${i} ${(r.summary.match(/.{0,20}(NaN|undefined|\[object Object\]).{0,20}/) || [''])[0]}`);
    }
  } catch (e) {
    thrown += 1;
    dirty.push(`#${i} ${e.message}`);
  }
  per.push(Date.now() - s);
}
const totalMs = Date.now() - t0;

ok('连续 200 次排盘没有一次抛错', thrown === 0, thrown ? `${thrown} 次：${dirty.slice(0, 2).join(' | ')}` : '');
ok('200 份结果里没有 NaN / undefined / [object Object]', dirty.length === 0, dirty.slice(0, 2).join(' | '));

// ── 二、不漂：同一份输入，压测前后必须逐字节一致 ─────────────
// 这条盯的是「有没有藏起来的计数器/缓存污染」：比如某处按调用次数改变输出，
// 单次测试永远看不见，连排 200 次之后才露出来。
{
  const after = snapshot();
  ok('同一份输入压测前后逐字节一致', after === before, before === after ? `${before.length} 字符` : `前 ${before.length} / 后 ${after.length}`);
  ok('四柱盘不带三柱标记', !/hourUnknown|provisionalHour/.test(before));
}

// ── 三、不涨：缓存必须守上限 ─────────────────────────────────
{
  const stats = cacheMetrics();
  ok('日历三个缓存都有统计', stats.length === 3, stats.map((s) => s.name).join(','));
  const over = stats.filter((s) => s.size > s.max);
  ok('没有缓存超过自己的上限', over.length === 0, over.map((s) => `${s.name} ${s.size}/${s.max}`).join(' | '));
  // 上限本身也要被真的逼近过：如果 200 次之后 size 还是个位数，说明缓存没生效（或测试没打中）
  ok('确实踩到了缓存上限（说明压测打中了热点路径）', stats.some((s) => s.size >= s.max), stats.map((s) => `${s.name} ${s.size}/${s.max}`).join(' '));
  ok('三个缓存都被用到', stats.every((s) => s.size > 0), stats.map((s) => `${s.name} ${s.size}`).join(' '));
}

// ── 四、不慢：耗时不随次数上漂 ───────────────────────────────
{
  const sorted = per.slice().sort((a, b) => a - b);
  const p95 = sorted[Math.floor(per.length * 0.95)];
  const avg = totalMs / per.length;
  const mean = (a) => a.reduce((x, y) => x + y, 0) / a.length;
  const first50 = mean(per.slice(0, 50));
  const last50 = mean(per.slice(150));
  ok('200 次平均每次 ≤10ms', avg <= 10, `${avg.toFixed(2)}ms`);
  ok('200 次 p95 ≤40ms', p95 <= 40, `p95 ${p95}ms，最慢 ${Math.max(...per)}ms`);
  // 上漂允许 3 倍 + 2ms 余量：GC、系统调度都会抖，这里只抓「越跑越慢」的量级问题
  ok('后 50 次没有比前 50 次明显变慢', last50 <= first50 * 3 + 2, `前 ${first50.toFixed(2)}ms / 后 ${last50.toFixed(2)}ms`);
}

// ── 五、不涨（内存）：另起一个强制 GC 的进程量，别让未回收的垃圾冒充泄漏 ──
// 本进程没开 --expose-gc，堆里全是待回收对象，量出来只会是噪声。
{
  const script = `
    const { compute } = await import(${JSON.stringify(new URL('../engine/index.js', import.meta.url).href)});
    const argsOf = (i) => {
      const d = new Date(Date.UTC(1960, 0, 1));
      d.setUTCDate(d.getUTCDate() + i * 37);
      const dt = d.toISOString().slice(0, 16);
      return i % 4 === 0 ? { system: 'bazi', datetime: dt, gender: 'male', address: '安徽池州' }
        : i % 4 === 1 ? { system: 'ziwei', datetime: dt, gender: 'female' }
        : i % 4 === 2 ? { system: 'liuyao', datetime: dt, lines: [7, 8, 9, 7, 8, 6], question: '这件事能不能成' }
        : { system: 'qimen', datetime: dt, juMethod: 'chaibu' };
    };
    for (let i = 0; i < 30; i++) compute(argsOf(i));   // 预热，让模块级常量表先建好
    global.gc();
    const base = process.memoryUsage().heapUsed;
    for (let i = 0; i < 200; i++) compute(argsOf(i + 100));
    global.gc();
    const after = process.memoryUsage().heapUsed;
    console.log(JSON.stringify({ base, after, growth: after - base }));
  `;
  let probe = null;
  try {
    const out = execFileSync(process.execPath, ['--expose-gc', '--input-type=module', '-e', script], {
      cwd: root, encoding: 'utf8', timeout: 120000,
    });
    probe = JSON.parse(out.trim().split('\n').pop());
  } catch (e) {
    probe = null;
  }
  const mb = (n) => (n / 1048576).toFixed(2);
  ok('内存探针跑通（--expose-gc + 强制 GC）', !!probe, probe ? '' : '子进程失败');
  // 24MB 是很宽的门：真正的泄漏（每次留一份结果）在 200 次下会是几百 MB
  ok('强制 GC 后堆增长 <24MB', probe && probe.growth < 24 * 1048576, probe ? `${mb(probe.base)}MB → ${mb(probe.after)}MB（+${mb(probe.growth)}MB）` : '');
}

// ── 六、不串：交替跑完之后，各体系的结论仍与单独跑一致 ─────────
{
  const solo = [
    { system: 'bazi', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州' },
    { system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'female' },
    { system: 'liuyao', datetime: '2026-11-01T22:10', lines: [9, 7, 8, 8, 7, 6], question: 'x' },
    { system: 'qimen', datetime: '2026-11-01T22:10', juMethod: 'chaibu' },
  ];
  // 先各跑一遍拿基线（此时缓存里全是压测留下的别的日期）
  const base = solo.map((a) => compute({ ...a, withInterpret: false }).summary);
  // 再交叉跑一轮，最后重取
  for (let i = 0; i < 40; i++) compute(argsOf(i + 400));
  const again = solo.map((a) => compute({ ...a, withInterpret: false }).summary);
  ok('压测后各体系结论与单独跑一致（不串盘）', base.every((s, i) => s === again[i]),
    solo.map((a, i) => (base[i] === again[i] ? '' : a.system)).filter(Boolean).join(',') || '');
}
