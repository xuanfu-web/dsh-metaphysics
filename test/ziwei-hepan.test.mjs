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

if (fail > 0) { console.log(`FAIL ${fail} 项`); process.exit(1); }
console.log(`\n紫微合盘 ${pass} 项全部通过`);
