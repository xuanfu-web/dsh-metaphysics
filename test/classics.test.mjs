// 与公开经典通例对拍：八宫卦序 / 世应、日干寄宫、中气换将、纳音定局、紫微天府对照。
//
// 与 invariants（盘面自洽）和 golden（历法数据）互补：这一组验的是"流派规则有没有按典籍实现"。
// 期望值来自 test/fixtures/classics.json，由 tools/gen-classics-fixture.mjs 按典籍条目录入，
// 每条都带出处；不是从引擎输出反推的。
import fs from 'node:fs';
import { hexagramFromBits, buildLiuyao } from '../engine/liuyao.js';
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

// ── ⑦ 卦例：《增删卜易》里明确写出的「本卦 → 变卦」对 ────────
// 期望值只取原文写明的卦名对；动爻位置原文（PDF）不可靠，不录。
// 验的是：引擎能否用 64 卦表如实还原这一对（名字、翻爻方向、变卦生成）。
{
  const ALL = [];
  for (let b = 0; b < 64; b++) {
    const bits = Array.from({ length: 6 }, (_, i) => (b >> i) & 1);
    ALL.push({ name: hexagramFromBits(bits).name, bits });
  }
  const variants = FIX.meta.variants || {};
  const resolve = (raw) => {
    let name = String(raw);
    for (const [k, v] of Object.entries(variants)) name = name.split(k).join(v);
    const exact = ALL.find((x) => x.name === name);
    if (exact) return exact;
    // 原文常只写卦名（如「艮」「困」「明夷」），按唯一包含匹配补全
    for (const test of [(x) => x.name.endsWith(name), (x) => x.name.includes(name)]) {
      const cands = ALL.filter(test);
      if (cands.length === 1) return cands[0];
    }
    return null;
  };

  const misses = [];
  for (const ex of FIX.liuyaoExamples || []) {
    const A = resolve(ex.ben);
    const B = resolve(ex.bian);
    if (!A || !B) { misses.push(`${ex.chapter}「${ex.ben}→${ex.bian}」名字无法唯一解析`); continue; }
    const moving = A.bits.map((bit, i) => (bit !== B.bits[i] ? i : -1)).filter((i) => i >= 0);
    if (!moving.length) { misses.push(`${ex.chapter} 本卦与变卦相同`); continue; }
    // 按动爻构造六爻值：阳动 9、阴动 6，静爻 7/8
    const lines = A.bits.map((bit, i) => (moving.includes(i) ? (bit ? 9 : 6) : (bit ? 7 : 8)));
    const r = buildLiuyao({ lines });
    if (r.ben.name !== A.name) misses.push(`${ex.chapter} 本卦 ${r.ben.name} ≠ ${A.name}`);
    else if (!r.bian || r.bian.name !== B.name) misses.push(`${ex.chapter} 变卦 ${r.bian && r.bian.name} ≠ ${B.name}`);
  }
  ok(`卦例本变卦对（${(FIX.liuyaoExamples || []).length} 例）`, misses.length === 0, misses.slice(0, 3).join('｜'));
}

// ── ⑧ 卦例：《卜筮正宗》成对 / 静卦（docx 文字层）──────────────
// 每条的 expected 都取自原书表格：占事 / 卦名 / 卦宫 / 空亡 / 缺爻。
// 动爻个数先由「本卦→变卦」推出，再与原文的 x/○ 标记数核对过（不符的已排除）。
// 卦名讹字与异体在 tools/data-boshizhengzong.mjs 的 FIX 表里归一，排除项连同理由写进 fixture。
{
  const ALL = [];
  for (let b = 0; b < 64; b++) {
    const bits = Array.from({ length: 6 }, (_, i) => (b >> i) & 1);
    ALL.push({ name: hexagramFromBits(bits).name, bits });
  }
  const VAR = [['干', '乾'], ['遯', '遁'], ['兌', '兑'], ['離', '离'], ['異', '巽'], ['风泽中乎孚', '风泽中孚'], ['天火同火', '天火同人'], ['火泽暌', '火泽睽'], ['艮天大畜', '山天大畜'], ['天地比', '水地比'], ['风雷颐', '山雷颐'], ['震为木', '震为雷'], ['兑为金', '兑为泽'], ['山地观', '风地观']];
  const norm = (s) => { let x = String(s).replace(/[。．.、\s]/g, ''); for (const [a, b] of VAR) x = x.split(a).join(b); return x; };
  const resolve = (raw) => {
    const name = norm(raw);
    const exact = ALL.find((x) => x.name === name);
    if (exact) return exact;
    const cands = ALL.filter((x) => x.name.endsWith(name));
    return cands.length === 1 ? cands[0] : null;
  };
  const EL = { 乾: '金', 坎: '水', 艮: '土', 震: '木', 巽: '木', 离: '火', 坤: '土', 兑: '金' };
  const WU = ['父母', '兄弟', '子孙', '妻财', '官鬼'];
  const dayOf = (date) => {
    const m = String(date || '').match(/月([甲乙丙丁戊己庚辛壬癸])([子丑寅卯辰巳午未申酉戌亥])日/);
    return m ? { stem: m[1], branch: m[2], name: m[1] + m[2] } : undefined;
  };
  const missingOf = (r) => {
    const present = new Set(r.ben.lines.map((l) => l.liuqin));
    return WU.filter((q) => !present.has(q));
  };
  const misses = [];
  let pairChecked = 0, kongChecked = 0;

  for (const ex of FIX.boshizhengzong || []) {
    const parts = String(ex.name).split('之');
    const A = resolve(parts[0]);
    const B = resolve(parts[1] || '');
    if (!A || !B) { misses.push(`${ex.zhan}「${ex.name}」名字无法解析`); continue; }
    const movingPos = A.bits.map((bit, i) => (bit !== B.bits[i] ? i : -1)).filter((i) => i >= 0);
    if (movingPos.length !== ex.moving) { misses.push(`${ex.zhan} 动爻 ${movingPos.length} ≠ 记录 ${ex.moving}`); continue; }
    const lines = A.bits.map((bit, i) => (movingPos.includes(i) ? (bit ? 9 : 6) : (bit ? 7 : 8)));
    const dayGanZhi = dayOf(ex.date);
    const r = buildLiuyao({ lines, dayGanZhi });
    pairChecked += 1;
    if (r.ben.name !== A.name) misses.push(`${ex.zhan} 本卦 ${r.ben.name} ≠ ${A.name}`);
    else if (!r.bian || r.bian.name !== B.name) misses.push(`${ex.zhan} 变卦 ${r.bian && r.bian.name} ≠ ${B.name}`);
    else if (r.ben.palace !== `${ex.gong[0]}宫` || r.ben.palaceElement !== EL[ex.gong[0]]) {
      misses.push(`${ex.zhan} 卦宫 ${r.ben.palace}${r.ben.palaceElement} ≠ ${ex.gong}`);
    } else if ((ex.que || []).length && missingOf(r).sort().join() !== ex.que.slice().sort().join()) {
      misses.push(`${ex.zhan} 缺爻 ${missingOf(r).join('、') || '无'} ≠ 书 ${ex.que.join('、')}`);
    } else if (ex.kong && dayGanZhi) {
      const k = (r.xunKong || []).slice().sort().join('');
      if (k !== ex.kong.split('').sort().join('')) misses.push(`${ex.zhan} 旬空 ${k} ≠ 书 ${ex.kong}`);
      else kongChecked += 1;
    }
  }
  ok(`卜筮正宗成对卦例（${pairChecked} 条：本变卦 / 动爻数 / 卦宫 / 缺爻 / 旬空）`, misses.length === 0, misses.slice(0, 3).join('｜'));
  ok('成对卦例不少于 80 条', pairChecked >= 80, String(pairChecked));

  // 静卦：原文只给一个卦名，核卦名 / 卦宫 / 缺爻
  let staticChecked = 0;
  const staticMiss = [];
  for (const ex of FIX.boshizhengzongStatic || []) {
    const one = resolve(ex.name);
    if (!one) { staticMiss.push(`${ex.zhan}「${ex.name}」名字无法解析`); continue; }
    const r = buildLiuyao({ lines: one.bits.map((bit) => (bit ? 7 : 8)), dayGanZhi: dayOf(ex.date) });
    staticChecked += 1;
    if (r.ben.name !== one.name) staticMiss.push(`${ex.zhan} ${r.ben.name} ≠ ${one.name}`);
    else if (r.ben.palace !== `${ex.gong[0]}宫` || r.ben.palaceElement !== EL[ex.gong[0]]) {
      staticMiss.push(`${ex.zhan} 卦宫 ${r.ben.palace}${r.ben.palaceElement} ≠ ${ex.gong}`);
    } else if ((ex.que || []).length && missingOf(r).sort().join() !== ex.que.slice().sort().join()) {
      staticMiss.push(`${ex.zhan} 缺爻 ≠ 书`);
    }
  }
  ok(`卜筮正宗静卦（${staticChecked} 条：卦名 / 卦宫 / 缺爻）`, staticMiss.length === 0, staticMiss.slice(0, 3).join('｜'));
  ok('静卦不少于 25 条', staticChecked >= 25, String(staticChecked));

  // 排除项必须带理由（不静默丢弃）
  const ex = FIX.boshizhengzongExcluded || [];
  ok('排除项有记录与理由', ex.length >= 3 && ex.every((x) => x && x.zhan && x.why), ex.map((x) => x.why).join('｜'));
}

// ── ⑨ 旬空：六旬的通用表（甲子旬戌亥 … 甲寅旬子丑）──────────
{
  const XUN = [['甲子', '戌亥'], ['甲戌', '申酉'], ['甲申', '午未'], ['甲午', '辰巳'], ['甲辰', '寅卯'], ['甲寅', '子丑']];
  const bad = [];
  for (const [xun, kong] of XUN) {
    const r = buildLiuyao({ lines: [7, 7, 7, 7, 7, 7], dayGanZhi: { stem: xun[0], branch: xun[1], name: xun } });
    const got = (r.xunKong || []).join('');
    if (got !== kong || r.xunShou !== xun) bad.push(`${xun} → ${r.xunShou}${got} ≠ ${xun}${kong}`);
  }
  ok('六旬旬空与旬首', bad.length === 0, bad.join('｜'));
  const chen = buildLiuyao({ lines: [7, 7, 7, 7, 7, 7], dayGanZhi: { stem: '丙', branch: '辰', name: '丙辰' } });
  ok('丙辰日属甲寅旬、空子丑', chen.xunShou === '甲寅' && chen.xunKong.join('') === '子丑', `${chen.xunShou}${chen.xunKong.join('')}`);
}

function parse(text) {
  const m = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})T(\d{1,2}):(\d{1,2})$/);
  return { year: +m[1], month: +m[2], day: +m[3], hour: +m[4], minute: +m[5] };
}
