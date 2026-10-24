// 结构不变量：不依赖外部权威数据，用"盘面自身必须成立的性质"守住算法。
//
// 这类断言的价值在于：金标准只能覆盖少量样盘，而不变量对每一张盘都成立——
// 12 宫的地支必须互不相同、八门必须各出现一次、六十四卦必须一一对应。
// 一旦重排逻辑写错，这里会立刻红。
import { compute } from '../engine/index.js';
import { buildZiwei } from '../engine/ziwei.js';
import { buildQimen } from '../engine/qimen.js';
import { hexagramFromBits, HEXAGRAM_COUNT } from '../engine/liuyao.js';
import { mulberry32 } from '../engine/random.js';
import { ok } from './_harness.mjs';

const rand = mulberry32(7);
const int = (lo, hi) => lo + Math.floor(rand() * (hi - lo + 1));
const pad = (n) => String(n).padStart(2, '0');
const days = (y, m) => (m === 2 ? ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? 29 : 28)
  : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1]);

function randomChart() {
  const year = int(1930, 2020);
  const month = int(1, 12);
  const day = int(1, days(year, month));
  return { year, month, day, hour: int(0, 23), minute: int(0, 59) };
}

const ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const NAMES = ['命宫', '兄弟', '夫妻', '子女', '财帛', '疾厄', '迁移', '交友', '官禄', '田宅', '福德', '父母'];

// ── ① 紫微：12 宫 / 大限 / 五行局 ───────────────────────────
{
  const bad = [];
  for (let i = 0; i < 10; i++) {
    const c = randomChart();
    const r = buildZiwei({ ...c, gender: i % 2 ? 'male' : 'female' });
    if (r.palaces.length !== 12) bad.push('宫数不为 12');
    if (new Set(r.palaces.map((p) => p.branch)).size !== 12) bad.push('宫支重复');
    if (new Set(r.palaces.map((p) => p.palace)).size !== 12) bad.push('宫名重复');
    if (r.palaces.map((p) => p.palace).sort().join() !== NAMES.slice().sort().join()) bad.push('宫名不是十二宫全名');
    if (!r.palaces.some((p) => p.isSoul)) bad.push('没有命宫');
    if (!ZHI.includes(r.soul.branch) || !ZHI.includes(r.body.branch)) bad.push('命/身宫支非法');
    // 大限：12 限连续覆盖 12 个宫，每限 10 年
    const list = r.daxianList || [];
    if (list.length !== 12) bad.push(`大限 ${list.length} 条`);
    else {
      const spans = list.map((d) => ({ s: d.ages[0], e: d.ages[1] })).sort((a, b) => a.s - b.s);
      spans.forEach((s, k) => {
        if (s.e - s.s !== 9) bad.push('大限跨度不是 10 年');
        if (k > 0 && s.s !== spans[k - 1].e + 1) bad.push('大限不连续');
      });
      if (new Set(list.map((d) => d.branch)).size !== 12) bad.push('大限宫支重复');
    }
  }
  ok('紫微 10 张盘结构自洽', bad.length === 0, [...new Set(bad)].slice(0, 3).join('｜'));
}

// ── ② 奇门：八宫 + 中五宫，星/门/神各出现一次 ────────────────
{
  const bad = [];
  for (let i = 0; i < 10; i++) {
    const c = randomChart();
    const r = buildQimen({ ...c });
    if (r.palaces.length !== 8) bad.push('外八宫数量不对');
    if (!r.centerPalace) bad.push('缺中五宫');
    const grid = [...r.palaces, r.centerPalace];
    if (new Set(grid.map((p) => p.palace)).size !== 9) bad.push('九宫编号重复');
    const gates = r.palaces.map((p) => p.gate).filter(Boolean);
    if (new Set(gates).size !== gates.length) bad.push('八门重复');
    const gods = r.palaces.map((p) => p.god).filter(Boolean);
    if (new Set(gods).size !== gods.length) bad.push('八神重复');
    if (!r.siZhu || !/^[甲乙丙丁戊己庚辛壬癸][子丑寅卯辰巳午未申酉戌亥]$/.test(r.siZhu.day)) bad.push('日柱格式不对');
    if ((r.kongWang || []).some((z) => !ZHI.includes(z))) bad.push('空亡含非法地支');
    if (r.ma && r.ma.zhi && !ZHI.includes(r.ma.zhi)) bad.push('驿马非法');
  }
  ok('奇门 10 张盘结构自洽', bad.length === 0, [...new Set(bad)].slice(0, 3).join('｜'));
}

// ── ③ 六爻：64 卦一一对应，世应相差三位 ─────────────────────
{
  const names = new Set();
  for (let bits = 0; bits < 64; bits++) {
    const arr = Array.from({ length: 6 }, (_, i) => (bits >> i) & 1);
    const hex = hexagramFromBits(arr);
    if (!hex || !hex.name) names.add(`缺失@${bits}`);
    else names.add(hex.name);
  }
  ok('六十四卦表完整且唯一', HEXAGRAM_COUNT === 64 && names.size === 64, String(names.size));

  const r = compute({ system: 'liuyao', seed: 5 });
  const shi = r.ben.shi;
  const ying = r.ben.ying;
  ok('世应在 1..6 且相差三位', shi >= 1 && shi <= 6 && ying >= 1 && ying <= 6 && Math.abs(shi - ying) === 3, `${shi}/${ying}`);
  ok('六爻六亲六神齐全', r.ben.lines.every((l) => l.liuqin && l.liushen && l.ganzhi));
}

// ── ④ 四柱：藏干与十神齐全，纳音在表内 ──────────────────────
{
  const r = compute({ system: 'bazi', datetime: '1988-08-08T08:08', gender: 'female', trueSolar: false });
  const NAYIN = new Set(['海中金', '炉中火', '大林木', '路旁土', '剑锋金', '山头火', '涧下水', '城头土', '白蜡金', '杨柳木',
    '泉中水', '屋上土', '霹雳火', '松柏木', '长流水', '沙中金', '山下火', '平地木', '壁上土', '金箔金',
    '覆灯火', '天河水', '大驿土', '钗钏金', '桑柘木', '大溪水', '沙中土', '天上火', '石榴木', '大海水']);
  const bad = [];
  for (const k of ['year', 'month', 'day', 'hour']) {
    const p = r.pillars[k];
    if (!p.hidden.length) bad.push(`${k} 无藏干`);
    if (!NAYIN.has(p.nayin)) bad.push(`${k} 纳音非法`);
    if (!p.dishi || !p.zizuo) bad.push(`${k} 缺地势/自坐`);
    if (!Array.isArray(p.kongwang) || p.kongwang.length !== 2) bad.push(`${k} 空亡不是两位`);
  }
  ok('四柱字段齐全且纳音合法', bad.length === 0, bad.slice(0, 3).join('｜'));
}
