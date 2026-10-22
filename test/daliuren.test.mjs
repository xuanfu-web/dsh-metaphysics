// 大六壬引擎断言（统一 ok()/eq() 风格，便于和其它测试一样统计 PASS/FAIL）
import { buildDaliuren, ZHI } from '../engine/daliuren.js';

let pass = 0;
let fail = 0;
const eq = (a, b, name) => {
  if (a === b) { pass++; console.log(`PASS  ${name}`); return; }
  fail++; console.log(`FAIL  ${name}  -> 期望 ${JSON.stringify(b)}，实际 ${JSON.stringify(a)}`);
};
const ok = (cond, name, extra = '') => {
  if (cond) { pass++; console.log(`PASS  ${name}`); return; }
  fail++; console.log(`FAIL  ${name}${extra ? `  -> ${extra}` : ''}`);
};
const throws = (fn, name) => {
  try { fn(); } catch (e) { pass++; console.log(`PASS  ${name}`); return; }
  fail++; console.log(`FAIL  ${name}  -> 未抛错`);
};

const r = buildDaliuren({ year: 1996, month: 1, day: 19, hour: 7, minute: 31 });

// —— 结构 ——
eq(r.system, 'daliuren', 'system 字段');
eq(r.dayGanZhi, '乙卯', '1996-01-19 日干支=乙卯');
eq(r.hourZhi, '辰', '07:31 辰时');
ok(['昼', '夜'].includes(r.dayNight), '昼贵/夜贵取值合法', r.dayNight);
eq(r.pan.length, 12, '天地盘 12 宫');
ok(r.pan.every((p) => ZHI.includes(p.di)), '地盘都是十二支');
ok(r.pan.every((p) => ZHI.includes(p.tian)), '天盘都是十二支');
ok(r.pan.every((p) => p.jiang && p.jiangFull), '每宫都有天将');
ok(Boolean(r.yueJiang.name && r.yueJiang.zhi), '月将有名称与地支');

// —— 四课 ——
eq(r.siKe.length, 4, '四课齐全');
eq(r.siKe[0].position, 1, '第一课序号=1');
ok(r.siKe.every((k) => ['比和', '克', '被克', '生', '被生', '下贼上', '上克下'].some((x) => k.relation.includes(x) || k.relation === x)),
  '四课关系都在已知集合内', r.siKe.map((k) => k.relation).join('/'));

// —— 三传 ——
ok(['chu', 'zhong', 'mo'].every((k) => ZHI.includes(r.sanChuan[k].zhi)), '三传都是十二支');
ok(['chu', 'zhong', 'mo'].every((k) => r.sanChuan[k].jiang && r.sanChuan[k].liuQin), '三传都有天将与六亲');

// —— 天地盘自洽：天盘 = 地盘 + 月将偏移 ——
const shift = (ZHI.indexOf(r.pan[0].tian) - ZHI.indexOf(r.pan[0].di) + 12) % 12;
ok(r.pan.every((p) => ZHI[(ZHI.indexOf(p.di) + shift) % 12] === p.tian), '天盘按固定偏移落在每个地支上');

// —— 返吟时三传应对冲 ——
if (r.geJu.name === '返吟') {
  const CHONG = { 子: '午', 午: '子', 丑: '未', 未: '丑', 寅: '申', 申: '寅', 卯: '酉', 酉: '卯', 辰: '戌', 戌: '辰', 巳: '亥', 亥: '巳' };
  eq(r.sanChuan.zhong.zhi, CHONG[r.sanChuan.chu.zhi], '返吟：中传与初传对冲');
} else {
  ok(true, '本盘非返吟，跳过对冲自查');
}

// —— 晚子时与缺参 ——
eq(buildDaliuren({ year: 2024, month: 5, day: 1, hour: 23, minute: 5 }).hourZhi, '子', '23:05 属子时');
throws(() => buildDaliuren({}), '缺时间参数应抛错');

console.log(`\n———— daliuren ${pass} PASS / ${fail} FAIL ————`);
if (fail) process.exit(1);
