// 紫微合盘：10 组回归断言（按阶段验收标准）
import { compute } from '../engine/index.js';
import { buildZiwei } from '../engine/ziwei.js';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
let pass = 0;
let fail = 0;
const ok = (n, c, d = '') => { if (c) { pass++; console.log(`PASS  ${n}${d ? '  -> ' + d : ''}`); } else { fail++; console.log(`FAIL  ${n}${d ? '  -> ' + d : ''}`); } };

const A = { datetime: '1996-01-19T07:40', gender: 'male' };
const B = { datetime: '1998-05-20T10:30', gender: 'female' };
const r = compute({ system: 'hepan', chart: 'ziwei', datetime: A.datetime, gender: A.gender, partner: B });

// 1 结构：两盘并排所需字段
ok('两盘都有命宫/夫妻宫/四化',
  !!(r.a.soul.branch && r.b.soul.branch && Array.isArray(r.a.spouseStars) && Array.isArray(r.b.natalSihua)),
  `${r.a.soul.branch} / ${r.b.soul.branch}`);

// 2 互落宫：A 的命宫地支必须能在 B 盘找到同支宫位
const zA = buildZiwei({ year: 1996, month: 1, day: 19, hour: 7, minute: 40, gender: 'male', trueSolar: false });
const zB = buildZiwei({ year: 1998, month: 5, day: 20, hour: 10, minute: 30, gender: 'female', trueSolar: false });
const landB = zB.palaces.find((p) => p.branch === zA.soul.branch);
ok('互落宫：命宫按地支落到对方盘', !!landB && r.dimensions.some((d) => d.key === 'soul' && d.text.includes(landB.palace)),
  landB ? `${zA.soul.branch} → 对方${landB.palace}` : '未找到');

// 2.5 主星不能丢：buildZiwei 的星型是中文「主星」，旧代码拿 'main' 比较，十四主星全被滤掉
const mainAt = (chart, palace) => {
  const p = chart.palaces.find((x) => x.palace === palace) || { stars: [] };
  return (p.stars || []).filter((s) => s.type === '主星').map((s) => s.name);
};
const aSpouseMain = mainAt(zA, '夫妻');
const bSoulMain = mainAt(zB, '命宫');
ok('合盘保留夫妻宫主星', aSpouseMain.length > 0 && aSpouseMain.every((n) => r.a.spouseStars.includes(n)),
  `${aSpouseMain.join(',')} ⊆ [${r.a.spouseStars.join(',')}]`);
ok('合盘保留命宫主星', bSoulMain.every((n) => r.b.soulStars.includes(n)),
  `${bSoulMain.join(',')} ⊆ [${r.b.soulStars.join(',')}]`);

// 3 四化引动条数 = 双方生年四化数量之和
const cntA = zA.palaces.reduce((n, p) => n + (p.stars || []).filter((s) => s.mutagen).length, 0);
const cntB = zB.palaces.reduce((n, p) => n + (p.stars || []).filter((s) => s.mutagen).length, 0);
ok('四化引动条数等于双方四化数之和', r.interactions.length === cntA + cntB, `${r.interactions.length} = ${cntA} + ${cntB}`);

// 4 每条引动都标明落宫或以「盘外」收尾
ok('每条四化都有落宫判定', r.interactions.every((h) => h.landingPalace || h.text.includes('盘外')));

// 5 分数区间
ok('总分在 0-100', r.score.total >= 0 && r.score.total <= 100, String(r.score.total));

// 6 档位取值
ok('档位取四档之一', ['契合度较高', '中等偏顺', '需要磨合', '差异较大'].includes(r.score.level), r.score.level);

// 7 三个维度齐全
ok('三维度：命宫互落 / 夫妻宫互落 / 四化引动',
  ['soul', 'spouse', 'mutagen'].every((k) => r.dimensions.some((d) => d.key === k)),
  r.dimensions.map((d) => d.key).join(','));

// 8 文本摘要
ok('文本摘要标注紫微合盘', r.summary.includes('紫微合盘') && r.summary.includes('命宫'));

// 9 渲染：两栏 + 四化列表
const code = fs.readFileSync(path.join(root, 'client.js'), 'utf8');
let mod = null;
const sb = { window: { __ModuleLoader__: { load: (m) => { mod = m; }, localStorage: { getItem: () => null, setItem() {} } } }, console, setTimeout,
  document: { createElement: () => ({ style: {}, setAttribute() {}, appendChild() {}, remove() {} }), head: { appendChild() {} } } };
vm.runInNewContext(code, sb, { filename: 'client.js' });
if (mod) mod.factory((n) => (n === 'react' ? { createElement: () => null, useState: (v) => [typeof v === 'function' ? v() : v, () => {}], useEffect() {}, useRef: (v) => ({ current: v }) } : {}));
const PP = sb.window.__PP;
const html = PP.ziweiHepanHTML(r);
ok('面板渲染两栏与四化列表', html.includes('命宫互落') && html.includes('你的四化') && html.includes('对方的四化'), `${html.length} 字节`);

// 10 两种合盘共存且可区分
const bz = compute({ system: 'hepan', datetime: A.datetime, gender: A.gender, partner: B });
ok('八字合盘与紫微合盘可区分', bz.chart !== 'ziwei' && r.chart === 'ziwei' && bz.summary.includes('合盘') && r.summary.includes('紫微合盘'));

// 11 晚子时口径随合盘透传：lateZi 要映射成紫微的 lateZishi
{
  const pair = (lateZi) => compute({
    system: 'hepan', chart: 'ziwei',
    datetime: '2026-02-16T23:30', gender: 'male',
    partner: { datetime: '1995-02-10T09:00', gender: 'female' },
    trueSolar: false, lateZi,
  });
  const off = pair(false);
  const on = pair(true);
  const zOff = buildZiwei({
    year: 2026, month: 2, day: 16, hour: 23, minute: 30,
    gender: 'male', trueSolar: false, lateZishi: 'current-day',
  });
  const zOn = buildZiwei({
    year: 2026, month: 2, day: 16, hour: 23, minute: 30,
    gender: 'male', trueSolar: false, lateZishi: 'next-day',
  });
  ok('合盘转发 lateZi:false（current-day 同命宫）',
    off.a.soul.branch === zOff.soul.branch && off.a.soul.branch !== on.a.soul.branch,
    `${off.a.soul.branch} / ${on.a.soul.branch}`);
  ok('合盘转发 lateZi:true（next-day 同命宫）',
    on.a.soul.branch === zOn.soul.branch, `${on.a.soul.branch} vs ${zOn.soul.branch}`);
}

// 12 闰月口径随合盘透传：split 与 next 的命宫不同，漏传就会与单盘差一个月
{
  const pair = (extra) => compute({
    system: 'hepan', chart: 'ziwei',
    datetime: '2023-03-25T10:00', gender: 'male', partner: B,
    trueSolar: false, ...extra,
  });
  const split = pair({ leapMonth: 'split' });
  const next = pair({ leapMonth: 'next' });
  const asNext = pair({ leapAsNext: true });
  const zSplit = buildZiwei({
    year: 2023, month: 3, day: 25, hour: 10, minute: 0,
    gender: 'male', trueSolar: false, leapMonth: 'split',
  });
  const zNext = buildZiwei({
    year: 2023, month: 3, day: 25, hour: 10, minute: 0,
    gender: 'male', trueSolar: false, leapMonth: 'next',
  });
  ok('合盘转发 leapMonth:split',
    split.a.soul.branch === zSplit.soul.branch && split.a.soul.branch !== next.a.soul.branch,
    `${split.a.soul.branch} / ${next.a.soul.branch}`);
  ok('合盘转发 leapMonth:next', next.a.soul.branch === zNext.soul.branch,
    `${next.a.soul.branch} vs ${zNext.soul.branch}`);
  ok('合盘转发 leapAsNext:true 等同 leapMonth:next',
    asNext.a.soul.branch === next.a.soul.branch, `${asNext.a.soul.branch} / ${next.a.soul.branch}`);
}

if (fail > 0) { console.log(`FAIL ${fail} 项`); process.exit(1); }
console.log(`\n紫微合盘 ${pass} 项全部通过`);
