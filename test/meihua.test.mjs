// 梅花易数引擎断言
import assert from 'node:assert';
import { buildMeihua, TRI_NAME, TRI_BITS, TRI_ELEMENT } from '../engine/meihua.js';
import { hexagramFromBits } from '../engine/liuyao.js';

// —— 数字起卦：固定输入必须可复现 ——
const a = buildMeihua({ mode: 'number', upper: 17, lower: 29 });
assert.strictEqual(a.mode, 'number');
assert.ok(a.ben.name, '应有本卦名');
// 17 % 8 = 1 乾，29 % 8 = 5 巽（先天数）
assert.strictEqual(a.ben.upper, '乾');
assert.strictEqual(a.ben.lower, '巽');
// 动爻默认 (17+29)%6 = 46%6 = 4
assert.strictEqual(a.moving, 4);
// 动爻在上卦 → 上卦为用、下卦为体
assert.strictEqual(a.bodyUse.use.trigram, a.ben.upper);
assert.strictEqual(a.bodyUse.body.trigram, a.ben.lower);

// 手动动爻
const b = buildMeihua({ mode: 'number', upper: 8, lower: 8, changing: 2 });
assert.strictEqual(b.ben.upper, '坤');
assert.strictEqual(b.ben.lower, '坤');
assert.strictEqual(b.moving, 2);
assert.strictEqual(b.bodyUse.body.trigram, '坤'); // 动在二爻，下卦为用？不——动爻所在为用，二爻在下卦
assert.strictEqual(b.bodyUse.use.trigram, '坤');

// —— 错卦：本卦六爻全变 ——
const bits = [...TRI_BITS[b.ben.lower], ...TRI_BITS[b.ben.upper]];
const cuoBits = bits.map((x) => (x ? 0 : 1));
assert.strictEqual(buildMeihua({ mode: 'number', upper: 8, lower: 8 }).cuo.name,
  hexagramFromBits(cuoBits).name);

// —— 时间起卦：结构与来源 ——
const c = buildMeihua({ mode: 'time', datetime: '1996-01-19T07:31' });
assert.strictEqual(c.system, 'meihua');
assert.ok(c.source.includes('乙亥年') || c.source.includes('亥年'), '来源应含年支');
assert.ok(['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'].includes(c.movingName));
assert.strictEqual(c.lines.length, 6);
assert.strictEqual(c.lines.filter((l) => l.moving).length, 1, '仅一爻动');
assert.ok(['大吉', '吉', '小凶', '凶'].some((k) => c.bodyUse.level.includes(k)) || c.bodyUse.level === '大吉');

// 缺参数必须报错
assert.throws(() => buildMeihua({ mode: 'time' }), /datetime/);
assert.throws(() => buildMeihua({ mode: 'number', upper: 1 }), /两个数字/);

// —— 常量表自洽 ——
assert.strictEqual(TRI_NAME.length, 9);
assert.strictEqual(TRI_BITS['乾'].join(''), '111');
assert.strictEqual(TRI_BITS['坤'].join(''), '000');
assert.strictEqual(TRI_ELEMENT['震'], '木');

console.log('meihua.test: all pass');
