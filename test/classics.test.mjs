// 与公开经典通例对拍：八宫卦序 / 世应、日干寄宫、中气换将、纳音定局、紫微天府对照。
//
// 与 invariants（盘面自洽）和 golden（历法数据）互补：这一组验的是"流派规则有没有按典籍实现"。
// 期望值来自 test/fixtures/classics.json，由 tools/gen-classics-fixture.mjs 按典籍条目录入，
// 每条都带出处；不是从引擎输出反推的。
import fs from 'node:fs';
import { hexagramFromBits } from '../engine/liuyao.js';
import { buildDaliuren, GAN_JI_GONG } from '../engine/daliuren.js';
import { buildZiwei } from '../engine/ziwei.js';
import { compute } from '../engine/index.js';
import { ok } from './_harness.mjs';

const FIX = JSON.parse(fs.readFileSync(new URL('./fixtures/classics.json', import.meta.url), 'utf8'));
const ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// ── ① 六爻：六十四卦的宫属与世应（京房八宫卦序）──────────────
{
  const bad = [];
  let hit = 0;
  for (let bits = 0; bits < 64; bits++) {
    const arr = Array.from({ length: 6 }, (_, i) => (bits >> i) & 1);
    const hex = hexagramFromBits(arr);
    const expect = FIX.bajua.find((b) => b.name === hex.name);
    if (!expect) { bad.push(`表里没有 ${hex.name}`); continue; }
    hit += 1;
    if (`${hex.palace}宫` !== expect.palace) bad.push(`${hex.name} 宫属 ${hex.palace}宫 ≠ ${expect.palace}`);
    if (hex.shi !== expect.shi) bad.push(`${hex.name} 世爻 ${hex.shi} ≠ ${expect.shi}`);
    if (hex.ying !== expect.ying) bad.push(`${hex.name} 应爻 ${hex.ying} ≠ ${expect.ying}`);
  }
  ok('八宫卦序与世应全表一致', bad.length === 0 && hit === 64, bad.slice(0, 4).join('｜') || `${hit}/64`);
}

// ── ② 六壬：日干寄宫 ────────────────────────────────────────
{
  const bad = [];
  for (const [gan, gong] of Object.entries(FIX.liuren.ganJiGong)) {
    if (GAN_JI_GONG[gan] !== gong) bad.push(`${gan} 寄${GAN_JI_GONG[gan] || '—'} ≠ ${gong}`);
  }
  ok('日干寄宫与典籍一致', bad.length === 0, bad.join('｜'));
}

// ── ③ 六壬：中气换将（月将随中气更替）───────────────────────
{
  const bad = [];
  for (const s of FIX.liuren.yueJiangSamples) {
    const expect = FIX.liuren.yueJiangByZhongQi.find((x) => x.zhongqi === s.zhongqi);
    const dt = new Date(`${s.date}:00`);
    const [y, m, d] = s.date.split('T')[0].split('-').map(Number);
    const hour = Number(s.date.split('T')[1].split(':')[0]);
    const r = buildDaliuren({ year: y, month: m, day: d, hour, minute: 0 });
    if (!r || !r.yueJiang) { bad.push(`${s.zhongqi} 未取出月将`); continue; }
    if (r.yueJiang.zhi !== expect.jiang) bad.push(`${s.zhongqi} 月将 ${r.yueJiang.zhi} ≠ ${expect.jiang}`);
    void dt;
  }
  ok('中气换将（12 个中气抽样）', bad.length === 0, bad.slice(0, 4).join('｜'));
}

// ── ④ 紫微：纳音定五行局 ───────────────────────────────────
{
  const bad = [];
  for (const [datetime, gender] of [
    ['1990-05-12T14:30', 'male'], ['1996-01-19T07:31', 'male'],
    ['1985-12-31T23:30', 'female'], ['2000-01-01T00:00', 'female'],
    ['1972-06-06T06:06', 'male'], ['2010-06-15T12:00', 'female'],
  ]) {
    const r = buildZiwei({ ...parse(datetime), gender });
    const element = String(r.soul && r.soul.nayin || '').slice(-1);
    const expect = FIX.ziwei.wuxingJu[element];
    if (!expect) { bad.push(`${datetime} 纳音 ${r.soul.nayin} 取不到五行`); continue; }
    if (r.bureau.number !== expect.number || r.bureau.name !== expect.name) {
      bad.push(`${datetime} 命宫${r.soul.ganzhi}纳音${r.soul.nayin} → ${r.bureau.name} ≠ ${expect.name}`);
    }
  }
  ok('纳音定五行局', bad.length === 0, bad.slice(0, 3).join('｜'));
}

// ── ⑤ 紫微：紫微天府以寅申为轴相照 ─────────────────────────
{
  const bad = [];
  for (let i = 0; i < 12; i++) {
    // 用不同农历日/局数组合覆盖紫微落十二宫
    const r = buildZiwei({ year: 1990, month: 1 + (i % 12), day: 1 + (i * 2) % 28, hour: (i * 2) % 24, minute: 0, gender: 'male' });
    const z = ZHI.indexOf(r.ziwei);
    const expect = ZHI[((4 - z) % 12 + 12) % 12];
    if (r.tianfu !== expect) bad.push(`紫微${r.ziwei} → 天府${r.tianfu} ≠ ${expect}`);
  }
  ok('紫微天府相照关系', bad.length === 0, bad.slice(0, 3).join('｜'));
}

// ── ⑥ 端到端：六爻输出里的宫属/世应与典籍一致 ──────────────
{
  const r = compute({ system: 'liuyao', lines: [7, 7, 7, 7, 7, 7] });
  const expect = FIX.bajua.find((b) => b.name === r.ben.name);
  ok('端到端·乾为天属乾宫世六', r.ben.palace === expect.palace && r.ben.shi === expect.shi && r.ben.ying === expect.ying,
    `${r.ben.palace} 世${r.ben.shi} 应${r.ben.ying}`);
}

function parse(text) {
  const m = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})T(\d{1,2}):(\d{1,2})$/);
  return { year: +m[1], month: +m[2], day: +m[3], hour: +m[4], minute: +m[5] };
}
