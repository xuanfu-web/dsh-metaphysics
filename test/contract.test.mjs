// 引擎边界契约：导出的 build* 遇到坏入参必须给 E_INPUT（带修复提示），不能抛裸 TypeError。
//
// 背景：buildBazi({ datetime: '1970-06-15T03:20' }) 以前会在内部某行崩成
// "Cannot read properties of null (reading 'index')"——调用方只能看见堆栈。
// 现在入口统一过 assertCivil()，这里把常见的 12 类坏输入钉住。
import { buildBazi } from '../engine/bazi.js';
import { buildZiwei } from '../engine/ziwei.js';
import { buildDaliuren } from '../engine/daliuren.js';
import { buildQimen, buildSnapshot } from '../engine/qimen.js';
import { buildHepan } from '../engine/hepan.js';
import { buildZiweiHepan } from '../engine/ziwei-hepan.js';
import { buildMeihua } from '../engine/meihua.js';
import { ok } from './_harness.mjs';

const codes = (fn) => {
  try { fn(); return 'NO_THROW'; } catch (e) { return e && e.code ? e.code : `NO_CODE(${e && e.message})`; }
};

const CASES = [
  ['buildBazi 传 datetime 字符串', () => buildBazi({ datetime: '1970-06-15T03:20' })],
  ['buildBazi 传空对象', () => buildBazi({})],
  ['buildBazi 月份越界', () => buildBazi({ year: 1990, month: 13, day: 1 })],
  ['buildBazi 日期不存在（2 月 30）', () => buildBazi({ year: 1990, month: 2, day: 30 })],
  ['buildBazi 时分越界', () => buildBazi({ year: 1990, month: 5, day: 12, hour: 24, minute: 60 })],
  ['buildBazi 年份是字符串', () => buildBazi({ year: '1990', month: 5, day: 12 })],
  ['buildBazi 年份超范围', () => buildBazi({ year: 1200, month: 5, day: 12 })],
  ['buildZiwei 传 datetime 字符串', () => buildZiwei({ datetime: '1996-01-19T07:31' })],
  ['buildDaliuren 传 null', () => buildDaliuren(null)],
  ['buildQimen 传数组', () => buildQimen([])],
  ['buildHepan 缺对方', () => buildHepan({ a: { year: 1990, month: 5, day: 12 } })],
  ['buildZiweiHepan 缺双方', () => buildZiweiHepan({})],
  ['buildMeihua 时间起卦 datetime 不合法', () => buildMeihua({ mode: 'time', datetime: '不是日期' })],
  ['buildMeihua 数字起卦缺数字', () => buildMeihua({ mode: 'number', upper: 'x', lower: 2 })],
  ['buildSnapshot 缺字段', () => buildSnapshot({ year: 1990 })],
];

for (const [name, fn] of CASES) {
  const code = codes(fn);
  ok(`${name} → E_INPUT`, code === 'E_INPUT', code);
}

// 文案要能指导修复：对象形状错说明该传什么；日期错说明哪一天不存在
try { buildBazi({ datetime: '1970-06-15T03:20' }); } catch (e) {
  ok('形状错误提示里写了该传什么', /year|month|day|parseDateTime/.test(e.message), e.message);
}
try { buildBazi({ year: 1990, month: 2, day: 30 }); } catch (e) {
  ok('日期错误提示里写了该月只有几天', /只有 28 天/.test(e.message), e.message);
}

// 合法入参不能被守卫误伤
const good = buildBazi({ year: 1990, month: 5, day: 12, hour: 14, minute: 30, gender: 'male' });
ok('合法八字入参正常返回', good.system === 'bazi' && !!good.pillars, JSON.stringify(good.system));
const goodZw = buildZiwei({ year: 1996, month: 1, day: 19, hour: 7, minute: 31, gender: 'male' });
ok('合法紫微入参正常返回', goodZw.system === 'ziwei' && Array.isArray(goodZw.palaces));
const goodMh = buildMeihua({ mode: 'time', datetime: '2026-10-24T11:43' });
ok('合法梅花时间入参正常返回', goodMh.system === 'meihua');
const goodHp = buildHepan({
  a: { year: 1990, month: 5, day: 12, hour: 14, minute: 30, gender: 'male' },
  b: { year: 1992, month: 8, day: 15, hour: 10, minute: 0, gender: 'female' },
});
ok('合法合盘入参正常返回', goodHp.system === 'hepan' && !!goodHp.a, JSON.stringify(goodHp.system));
