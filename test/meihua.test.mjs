// 梅花易数引擎断言（统一 ok()/eq() 风格）
import { buildMeihua, TRI_NAME, TRI_BITS, TRI_ELEMENT } from '../engine/meihua.js';
import { hexagramFromBits } from '../engine/liuyao.js';

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
const throws = (fn, re, name) => {
  try { fn(); } catch (e) {
    if (re && !re.test(String(e.message))) { fail++; console.log(`FAIL  ${name}  -> 报错文案不符：${e.message}`); return; }
    pass++; console.log(`PASS  ${name}`); return;
  }
  fail++; console.log(`FAIL  ${name}  -> 未抛错`);
};

// —— 数字起卦：固定输入必须可复现 ——
const a = buildMeihua({ mode: 'number', upper: 17, lower: 29 });
eq(a.mode, 'number', 'mode=number');
ok(Boolean(a.ben.name), '有本卦名');
eq(a.ben.upper, '乾', '17%8=1 → 上卦乾');
eq(a.ben.lower, '巽', '29%8=5 → 下卦巽');
eq(a.moving, 4, '动爻 (17+29)%6=4');
eq(a.bodyUse.use.trigram, a.ben.upper, '动爻在上卦 → 上卦为用');
eq(a.bodyUse.body.trigram, a.ben.lower, '动爻在上卦 → 下卦为体');

// 手动动爻
const b = buildMeihua({ mode: 'number', upper: 8, lower: 8, changing: 2 });
eq(b.ben.upper, '坤', '8%8 → 上卦坤');
eq(b.ben.lower, '坤', '8%8 → 下卦坤');
eq(b.moving, 2, '手动指定动爻=2');
eq(b.bodyUse.use.trigram, '坤', '动在二爻，用卦为下卦坤');

// —— 错卦：本卦六爻全变 ——
const bits = [...TRI_BITS[b.ben.lower], ...TRI_BITS[b.ben.upper]];
const cuoBits = bits.map((x) => (x ? 0 : 1));
eq(buildMeihua({ mode: 'number', upper: 8, lower: 8 }).cuo.name, hexagramFromBits(cuoBits).name, '错卦=六爻全变');

// —— 时间起卦：结构与来源 ——
const c = buildMeihua({ mode: 'time', datetime: '1996-01-19T07:31' });
eq(c.system, 'meihua', 'system=meihua');
ok(c.source.includes('乙亥年') || c.source.includes('亥年'), '来源含年支');
ok(['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'].includes(c.movingName), '动爻名合法', c.movingName);
eq(c.lines.length, 6, '六爻齐备');
eq(c.lines.filter((l) => l.moving).length, 1, '仅一爻动');
ok(['大吉', '吉', '小凶', '凶'].some((k) => c.bodyUse.level.includes(k)) || c.bodyUse.level === '大吉', '体用判定落档', c.bodyUse.level);

// 缺参数必须报错
throws(() => buildMeihua({ mode: 'time' }), /datetime/, '时间起卦缺 datetime 报错');
throws(() => buildMeihua({ mode: 'number', upper: 1 }), /两个数字/, '数字起卦缺两个数报错');

// —— 常量表自洽 ——
eq(TRI_NAME.length, 9, '八卦名表 9 项（含空位）');
eq(TRI_BITS['乾'].join(''), '111', '乾=111');
eq(TRI_BITS['坤'].join(''), '000', '坤=000');
eq(TRI_ELEMENT['震'], '木', '震属木');

console.log(`\n———— meihua ${pass} PASS / ${fail} FAIL ————`);
if (fail) process.exit(1);
