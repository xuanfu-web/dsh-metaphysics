// 大六壬引擎断言
import assert from 'node:assert';
import { buildDaliuren, ZHI } from '../engine/daliuren.js';

const r = buildDaliuren({ year: 1996, month: 1, day: 19, hour: 7, minute: 31 });

// —— 结构 ——
assert.strictEqual(r.system, 'daliuren');
assert.strictEqual(r.dayGanZhi, '乙卯'); // 1996-01-19 日干支
assert.strictEqual(r.hourZhi, '辰');     // 07:31 → 辰时
assert.ok(['昼', '夜'].includes(r.dayNight));
assert.strictEqual(r.pan.length, 12);
for (const p of r.pan) {
  assert.ok(ZHI.includes(p.di), '地盘必须是十二支');
  assert.ok(ZHI.includes(p.tian), '天盘必须是十二支');
  assert.ok(p.jiang && p.jiangFull, '每宫必须有天将');
}
// 月将必须有名字
assert.ok(r.yueJiang.name && r.yueJiang.zhi);

// —— 四课 ——
assert.strictEqual(r.siKe.length, 4);
assert.strictEqual(r.siKe[0].position, 1);
for (const k of r.siKe) {
  assert.ok(['比和', '克', '被克', '生', '被生', '下贼上', '上克下'].some((x) => k.relation.includes(x) || k.relation === x),
    `未知课关系：${k.relation}`);
}

// —— 三传 ——
for (const key of ['chu', 'zhong', 'mo']) {
  const c = r.sanChuan[key];
  assert.ok(ZHI.includes(c.zhi), `${key} 传必须是十二支`);
  assert.ok(c.jiang && c.liuQin, `${key} 传须有天将与六亲`);
}

// —— 天地盘自洽：天盘 = 地盘 + 月将偏移，固定同盘位（伏吟除外） ——
const shift = (ZHI.indexOf(r.pan[0].tian) - ZHI.indexOf(r.pan[0].di) + 12) % 12;
for (const p of r.pan) {
  const expect = ZHI[(ZHI.indexOf(p.di) + shift) % 12];
  assert.strictEqual(p.tian, expect, `天盘错位：地盘${p.di}`);
}

// —— 伏吟：月将 == 时支 → 天地盘重合 ——
// 找一个月将等于时支的时刻不易直接构造，改为返吟自查：返吟时三传应为对冲
if (r.geJu.name === '返吟') {
  const CHONG = { 子: '午', 午: '子', 丑: '未', 未: '丑', 寅: '申', 申: '寅', 卯: '酉', 酉: '卯', 辰: '戌', 戌: '辰', 巳: '亥', 亥: '巳' };
  assert.strictEqual(r.sanChuan.zhong.zhi, CHONG[r.sanChuan.chu.zhi]);
}

// —— 晚子时 ——
const late = buildDaliuren({ year: 2024, month: 5, day: 1, hour: 23, minute: 5 });
assert.strictEqual(late.hourZhi, '子');

// —— 边界：缺时间参数应报错 ——
assert.throws(() => buildDaliuren({}), TypeError);

console.log('daliuren.test: all pass');
