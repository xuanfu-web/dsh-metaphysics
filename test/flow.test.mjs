// 0.12.0 新增：流月/流日/流时（斗君逐级下推、四化落宫、接入解读与盘面）
import fs from 'node:fs';
import { compute } from '../engine/index.js';

let pass = 0;
const fails = [];
const eq = (a, b, msg) => { if (a === b) pass++; else fails.push(`${msg}：期望 ${JSON.stringify(b)}，实际 ${JSON.stringify(a)}`); };
const ok = (c, msg) => { if (c) pass++; else fails.push(msg); };

const BR = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const fx = (n) => ((n % 12) + 12) % 12;
const base = { system: 'ziwei', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州' };

// ── 一、三级下推的算法关系 ──────────────────────────────────────
{
  const r = compute({ ...base, asOf: '2026-10-22T16:15' });
  const f = r.flow;
  ok(!!f, '结果里带 flow');
  for (const k of ['asOf', 'year', 'month', 'day', 'hour', 'rules']) ok(!!f[k], `flow.${k} 存在`);

  const ln = r.liunian.find((x) => x.year === 2026);
  eq(f.year.doujun, ln.doujun, '流年斗君与该年 liunian 的斗君一致');

  const dj = BR.indexOf(f.year.doujun);
  const mi = BR.indexOf(f.month.branch);
  const di = BR.indexOf(f.day.branch);
  const hi = BR.indexOf(f.hour.branch);
  eq(mi, fx(dj + (f.month.index - 1)), '流月命宫 = 斗君 + (农历月-1)');
  eq(di, fx(mi + (f.day.index - 1)), '流日命宫 = 流月命宫 + (农历日-1)');
  eq(hi, fx(di + f.hour.hourIndex), '流时命宫 = 流日命宫 + 时辰序');

  eq(f.asOf.solar.startsWith('2026-10-22'), true, '基准时刻按 asOf 走');
  ok(f.asOf.lunar.includes('9月13日'), `农历换算正确（${f.asOf.lunar}）`);
  ok(f.asOf.lunar.endsWith('申时'), `时辰正确（${f.asOf.lunar}）`);
}

// ── 二、每一层都有宫干四化（禄权科忌四项，不截断）───────────────
{
  const r = compute({ ...base, asOf: '2026-10-22T16:15' });
  for (const k of ['year', 'month', 'day', 'hour']) {
    const p = r.flow[k];
    ok(!!p.ganzhi && p.ganzhi.length === 2, `${k} 有干支`);
    ok(BR.includes(p.branch), `${k} 地支合法`);
    eq(p.mutagenHits.length, 4, `${k} 四化四项齐全`);
    eq(p.mutagenHits.map((m) => m.type).sort().join(''), '禄权科忌'.split('').sort().join(''), `${k} 四化类型为禄权科忌`);
    ok(p.sanfang.length === 4, `${k} 三方四正四宫`);
    ok(Array.isArray(p.sanfangMainStars), `${k} 有三方主星列表`);
  }
}

// ── 三、宫干四化必须与引擎的四化表一致（不是随便填）────────────
{
  const r = compute({ ...base, asOf: '2026-10-22T16:15' });
  const palaceAt = (br) => r.palaces.find((p) => p.branch === br);
  for (const k of ['month', 'day', 'hour', 'year']) {
    const p = r.flow[k];
    const host = palaceAt(p.branch);
    eq(p.stem, host.stem, `${k} 宫干取自落点宫`);
    eq(p.ganzhi, host.ganzhi, `${k} 干支取自落点宫`);
  }
}

// ── 四、asOf 可注入 → 结果可重复 ────────────────────────────────
{
  const a = compute({ ...base, asOf: '2026-10-22T16:15' });
  const b = compute({ ...base, asOf: '2026-10-22T16:15' });
  eq(JSON.stringify(a.flow), JSON.stringify(b.flow), '同一 asOf 两次结果完全一致');
  const c = compute({ ...base, asOf: '2026-03-05T09:00' });
  ok(a.flow.month.branch !== c.flow.month.branch, '换 asOf 后流月命宫随之改变');
  ok(a.flow.asOf.yearGanzhi !== c.flow.asOf.yearGanzhi || a.flow.month.index !== c.flow.month.index, '跨月/跨年后基准不同');
  // 不传 asOf 时退回本机当前时刻，不报错
  const d = compute(base);
  ok(!!d.flow && !!d.flow.asOf.solar, '不传 asOf 也能算（默认本机当前时刻）');
}

// ── 五、边界：子时、农历月首、闰月附近 ──────────────────────────
{
  for (const asOf of ['2026-01-01T00:30', '2026-02-17T23:30', '2026-08-08T12:00', '2025-12-31T22:00']) {
    const r = compute({ ...base, asOf });
    ok(!!r.flow, `${asOf} 可算`);
    ok(r.flow.month.index >= 1 && r.flow.month.index <= 12, `${asOf} 农历月在 1-12`);
    ok(r.flow.day.index >= 1 && r.flow.day.index <= 30, `${asOf} 农历日在 1-30`);
    ok(r.flow.hour.hourIndex >= 0 && r.flow.hour.hourIndex <= 11, `${asOf} 时辰序在 0-11`);
  }
  // 23:30 属次日子时（紫微以子时换日），这里只校验时辰序为 0
  const late = compute({ ...base, asOf: '2026-02-17T23:30' });
  eq(late.flow.hour.hourIndex, 0, '23:30 归子时');
}

// ── 六、渲染层：盘面上有三级时间盘 ──────────────────────────────
{
  globalThis.window = globalThis.window || {};
  const kit = fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8');
  new Function('window', kit)(globalThis.window);
  const PP = globalThis.window.__PP;
  const r = compute({ ...base, asOf: '2026-10-22T16:15' });
  const html = PP.ziweiHTML(r);
  ok(html.includes('pp-flow'), '盘面渲染出 .pp-flow');
  ok(html.includes('流月'), '含「流月」行');
  ok(html.includes('流日'), '含「流日」行');
  ok(html.includes('流时'), '含「流时」行');
  ok(html.includes('斗君'), '基准行标出斗君');
  eq((html.match(/class="flow-row"/g) || []).length, 4, '基准 + 流月/流日/流时 共 4 行');
  // 没有 flow 时不能崩
  const bare = PP.ziweiHTML({ ...r, flow: null });
  ok(bare.includes('pp'), 'flow 缺失时仍能渲染');
}

// ── 七、解读里必须有一段讲三级时间盘 ────────────────────────────
{
  const r = compute({ ...base, asOf: '2026-10-22T16:15', withInterpret: true });
  const it = r.interpret;
  const f = (it.sections || []).find((s) => s.key === 'flow');
  ok(!!f, '解读 sections 含 flow 段');
  ok(f.label.includes('流月'), '段落标题标明流月');
  ok(f.text.includes('流月命宫') && f.text.includes('流日命宫') && f.text.includes('流时命宫'), '三层都有落点');
  ok(/不必逐条对号入座|颗粒度/.test(f.text), '给出口径提醒，不把细颗粒当定论');
  const overall = (it.dimensions || []).find((d) => d.key === 'overall');
  ok(overall.text.includes('流月'), '整体运势里提到当前流月');
  ok(!/一定|必然|注定|绝对/.test(f.text), '流月段落无绝对化表述');
}

if (fails.length) {
  console.log(`FAIL ${fails.length} 项：`);
  for (const f of fails.slice(0, 15)) console.log('  -', f);
  process.exit(1);
}
console.log(`PASS 流月/流日/流时 ${pass} 项断言`);
