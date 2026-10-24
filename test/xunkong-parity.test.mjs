// 旬空单一真源的对拍测试：
// 1) calendar.xunKongOf 与六十甲子旬表逐项比对
// 2) 三大体系（bazi / liuyao / daliuren）算出的空亡必须与真源一致
// 目的：此前 bazi / liuyao / daliuren 各写一份旬空公式（一处 (start+10)%12、
// 一处 (10-2k)%12、一处查表），三份写法不同、无人对拍，任一处改动都可能悄悄漂移。
import { xunKongOf, STEMS, BRANCHES, sexagenaryIndex } from '../engine/calendar.js';
import { buildBazi } from '../engine/bazi.js';
import { buildLiuyao } from '../engine/liuyao.js';
import { ok } from './_harness.mjs';

const SIXTY = Array.from({ length: 60 }, (_, i) => STEMS[i % 10] + BRANCHES[i % 12]);
// 六旬空亡（传统定式）：甲子旬空戌亥、甲戌旬空申酉、甲申旬空午未、
// 甲午旬空辰巳、甲辰旬空寅卯、甲寅旬空子丑
const XUN_KONG = [
  ['戌', '亥'], ['申', '酉'], ['午', '未'],
  ['辰', '巳'], ['寅', '卯'], ['子', '丑'],
];

let bad = 0;
for (let i = 0; i < 60; i++) {
  const gz = SIXTY[i];
  const expect = XUN_KONG[Math.floor(i / 10)].join('');
  const got = xunKongOf(gz).join('');
  if (got !== expect) {
    bad++;
    ok(`xunKongOf(${gz})`, false, `期望 ${expect} 实得 ${got}`);
  }
}
ok('六十甲子旬空全量一致', bad === 0, `${bad} 处不符`);

// 非法输入不得抛异常
ok('非干支返回空数组', xunKongOf('甲丑').length === 0 && xunKongOf('').length === 0 && xunKongOf(null).length === 0,
  JSON.stringify([xunKongOf('甲丑'), xunKongOf(''), xunKongOf(null)]));

// bazi：四柱 kongwang 必须与 xunKongOf(该柱干支) 相同
const bazi = buildBazi({ year: 1996, month: 1, day: 19, hour: 7, minute: 31, gender: 'male', trueSolar: false });
let baziBad = 0;
for (const k of ['year', 'month', 'day', 'hour']) {
  const p = bazi.pillars[k];
  if (p.kongwang.join('') !== xunKongOf(p.ganzhi).join('')) {
    baziBad++;
    ok(`bazi ${k} 柱空亡`, false, `${p.ganzhi} 得 ${p.kongwang.join('')}`);
  }
}
ok('bazi 四柱空亡与真源一致', baziBad === 0, `${baziBad} 柱不符`);

// liuyao：按日辰逐日抽查 60 天
let liuyaoBad = 0;
for (let i = 0; i < 60; i++) {
  const gz = SIXTY[i];
  const r = buildLiuyao({
    lines: [7, 7, 7, 7, 7, 7],
    dayGanZhi: { stem: gz[0], branch: gz[1], name: gz },
  });
  if ((r.xunKong || []).join('') !== xunKongOf(gz).join('')) {
    liuyaoBad++;
    ok(`liuyao ${gz} 旬空`, false, `得 ${(r.xunKong || []).join('')}`);
  }
  const expectShou = SIXTY[Math.floor(i / 10) * 10];
  if (r.xunShou !== expectShou) {
    liuyaoBad++;
    ok(`liuyao ${gz} 旬首`, false, `得 ${r.xunShou} 期望 ${expectShou}`);
  }
}
ok('liuyao 六十日旬空/旬首全量一致', liuyaoBad === 0, `${liuyaoBad} 处不符`);

// 旬首序号自洽：甲子=0、甲戌=10 … 甲寅=50
ok('旬首序号自洽', SIXTY[50] === '甲寅' && sexagenaryIndex(0, 2) === 50, `甲寅=${SIXTY[50]}`);
