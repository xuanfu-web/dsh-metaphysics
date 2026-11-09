// 宫位权重百分比视图（炳祥课程第 2.1 节）。
//
// 课程口径：天干 2/5/0/3、地支 11/36/27/16，两张表相加正好 100。
// 本层只把这张固定表换算成「年 13% / 月 41% / 日 27% / 时 19%」的展示值，
// 不参与 bazi.js 的旺衰评分，也不参与取格与喜忌。
//
// 三柱模式（未给出生时刻）时，时柱是正午占位：权重照表列出，但不计入合计
// （本盘 81%），也不重新归一化——归一化会把占位时柱洗成实有。
import { compute } from '../engine/index.js';
import { weightPctOf, PILLAR_WEIGHT } from '../engine/structure.js';
import { ok, eq } from './_harness.mjs';

const bazi = (datetime, extra = {}) => compute({ system: 'bazi', datetime, gender: 'male', trueSolar: false, ...extra });

// ── 一、固定权重表：干 10 + 支 90 = 100 ────────────────────────
const s = (k) => PILLAR_WEIGHT.stem[k];
const b = (k) => PILLAR_WEIGHT.branch[k];
eq('天干权重 年2/月5/日0/时3', [s('year'), s('month'), s('day'), s('hour')].join(','), '2,5,0,3');
eq('地支权重 年11/月36/日27/时16', [b('year'), b('month'), b('day'), b('hour')].join(','), '11,36,27,16');
eq('天干合计 10', s('year') + s('month') + s('day') + s('hour'), 10);
eq('地支合计 90', b('year') + b('month') + b('day') + b('hour'), 90);
eq('干支合计 100', s('year') + s('month') + s('day') + s('hour') + b('year') + b('month') + b('day') + b('hour'), 100);

// ── 二、四柱齐全：按柱合计就是百分比 ──────────────────────────
const full = weightPctOf({
  year: { branch: '子' }, month: { branch: '丑' }, day: { branch: '寅' }, hour: { branch: '卯' },
});
eq('四柱齐全标记 complete', full.complete, true);
eq('年柱 13%（干2+支11）', full.pct.year, 13);
eq('月柱 41%（干5+支36）', full.pct.month, 41);
eq('日柱 27%（干0+支27）', full.pct.day, 27);
eq('时柱 19%（干3+支16）', full.pct.hour, 19);
eq('四柱百分比合计 100', Object.values(full.pct).reduce((n, v) => n + v, 0), 100);
eq('月令是四柱之首（41%）', Math.max(...Object.values(full.pct)), full.pct.month);
eq('原始权重表也回传（干）', full.stem.month, 5);
eq('原始权重表也回传（支）', full.branch.month, 36);
eq('合计对象含干/支/总', [full.total.stem, full.total.branch, full.total.all].join(','), '10,90,100');
ok('detail 点明月令 41%', full.detail.includes('月 41%'), full.detail);
ok('method 声明不改旺衰评分', full.method.includes('不改旺衰评分'), full.method);

// ── 三、三柱模式：占位时柱不计入合计，也不归一化 ────────────────
const three = weightPctOf({
  year: { branch: '子' }, month: { branch: '丑' }, day: { branch: '寅' }, hour: { branch: '午' },
}, { hourUnknown: true });
eq('三柱不标 complete', three.complete, false);
eq('三柱时柱百分比记 0', three.pct.hour, 0);
eq('三柱合计 81（100 − 时柱 19）', three.total.all, 81);
eq('三柱干合计 7（10 − 时柱 3）', three.total.stem, 7);
eq('三柱支合计 74（90 − 时柱 16）', three.total.branch, 74);
ok('三柱 detail 写明时柱未计', three.detail.includes('时柱未计'), three.detail);
ok('三柱 note 写明不重新归一化', three.note.includes('不重新归一化'), three.note);

// ── 四、接进真实排盘：字段在 strength 下，旺衰分不受影响 ────────
const r = bazi('1996-01-19T07:31');
const wp = r.strength.weightPct;
eq('真实盘带上 weightPct', !!wp, true);
eq('真实盘四柱齐全', wp.complete, true);
eq('真实盘年/月/日/时 = 13/41/27/19', [wp.pct.year, wp.pct.month, wp.pct.day, wp.pct.hour].join(','), '13,41,27,19');
ok('旺衰评分仍是数值', typeof r.strength.score === 'number' && Number.isFinite(r.strength.score), String(r.strength.score));
ok('旺衰 level 未被权重视图改写', ['身强', '偏强', '中和', '偏弱', '身弱'].includes(r.strength.level), r.strength.level);
eq('frame 不接收 weightPct（只读展示，不进格局层）', r.frame.weightPct, undefined);
eq('同一盘两次换算一致', JSON.stringify(bazi('1996-01-19T07:31').strength.weightPct.pct), JSON.stringify(wp.pct));

// ── 五、三柱真实盘：占位标记与合计同步 ──────────────────────────
const r3 = bazi('1996-01-19T07:31', { hourUnknown: true });
const wp3 = r3.strength.weightPct;
eq('三柱真实盘 complete=false', wp3.complete, false);
eq('三柱真实盘合计 81', wp3.total.all, 81);
eq('三柱真实盘打占位标记', wp3.placeholderHour, true);
ok('三柱真实盘 note 点明补时后按 100% 看', wp3.note.includes('100%'), wp3.note);

// ── 六、解析层可见：量化口径一节带上这条换算 ────────────────────
const it = compute({ system: 'bazi', datetime: '1996-01-19T07:31', gender: 'male', trueSolar: false, withInterpret: true, question: '今年怎么样' }).interpret;
const quant = (it.sections || []).find((x) => x.key === 'quant');
ok('解析层有量化口径一节', !!quant, (it.sections || []).map((x) => x.key).join(','));
ok('量化口径带上宫位权重百分比', /宫位权重/.test(quant.text) && /月 41%/.test(quant.text), quant.text);
