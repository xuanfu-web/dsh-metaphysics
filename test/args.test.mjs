// 入参校验回归：非法输入必须明确报错（带错误码），而不是静默改成另一个盘。
//
// 0.14.0 及以前的几个静默降级：
//   · 1990-02-30 / 2026-04-31 被接受并滚到下个月
//   · 不填性别按男命排（大运/大限方向直接反了）
//   · 六爻爻数不对 → 悄悄换成随机摇卦
//   · 塔罗张数不支持 → 悄悄按 3 张
//   · asOf 解析不了 → 悄悄用「此刻」
import { compute, parseDateTime } from '../engine/index.js';
import { ok } from './_harness.mjs';

/** 断言"必须抛错"，并核对错误码 */
function throws(label, fn, expectCode) {
  let err = null;
  try {
    fn();
  } catch (e) {
    err = e;
  }
  if (!err) return ok(label, false, '没有抛错');
  const codeOk = !expectCode || err.code === expectCode;
  return ok(label, codeOk, `${err.code || '(无码)'}：${err.message}`);
}

function notThrows(label, fn) {
  try {
    fn();
    return ok(label, true);
  } catch (e) {
    return ok(label, false, `${e.code || ''} ${e.message}`);
  }
}

// ── ① 日期合法性（月份天数 + 闰年）────────────────────────────
throws('1990-02-30 报错', () => parseDateTime('1990-02-30T10:00'), 'E_INPUT');
throws('2026-04-31 报错', () => parseDateTime('2026-04-31T10:00'), 'E_INPUT');
throws('2000-02-30 报错', () => parseDateTime('2000-02-30'), 'E_INPUT');
throws('1900-02-29（非闰年）报错', () => parseDateTime('1900-02-29'), 'E_INPUT');
throws('月份 13 报错', () => parseDateTime('1990-13-01'), 'E_INPUT');
throws('25:00 报错', () => parseDateTime('1990-05-12T25:00'), 'E_INPUT');
throws('年份 1500 报错', () => parseDateTime('1500-01-01'), 'E_RANGE');
const leap = parseDateTime('2000-02-29');
ok('2000-02-29 被接受', leap.day === 29 && leap.month === 2);
ok('秒被接受（忽略）', parseDateTime('1990-05-12T14:30:45').minute === 30);

// ── ② 性别必填 ───────────────────────────────────────────────
throws('bazi 缺 gender 报错', () => compute({ system: 'bazi', datetime: '1990-05-12T14:30' }), 'E_INPUT');
throws('ziwei 缺 gender 报错', () => compute({ system: 'ziwei', datetime: '1990-05-12T14:30' }), 'E_INPUT');
throws('gender 用中文值报错', () => compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: '男' }), 'E_INPUT');
notThrows('bazi 带 gender 正常', () => compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male' }));

// ── ③ 合盘 partner ───────────────────────────────────────────
throws('合盘缺 partner 报错', () => compute({ system: 'hepan', datetime: '1990-05-12T14:30', gender: 'male' }), 'E_PARTNER');
throws('partner 缺 datetime 报错', () => compute({
  system: 'hepan', datetime: '1990-05-12T14:30', gender: 'male',
  partner: { gender: 'female' },
}), 'E_PARTNER');
throws('partner 缺 gender 报错', () => compute({
  system: 'hepan', datetime: '1990-05-12T14:30', gender: 'male',
  partner: { datetime: '1992-03-03T10:00' },
}), 'E_INPUT');
throws('主方缺 gender 报错', () => compute({
  system: 'hepan', datetime: '1990-05-12T14:30',
  partner: { datetime: '1992-03-03T10:00', gender: 'female' },
}), 'E_INPUT');
notThrows('合盘参数齐全正常', () => compute({
  system: 'hepan', datetime: '1990-05-12T14:30', gender: 'male',
  partner: { datetime: '1992-03-03T10:00', gender: 'female' },
}));

// ── ④ 六爻爻值 ───────────────────────────────────────────────
throws('六爻 5 个爻值报错', () => compute({ system: 'liuyao', lines: [7, 7, 7, 7, 7] }), 'E_LINES');
throws('六爻 7 个爻值报错', () => compute({ system: 'liuyao', lines: [7, 7, 7, 7, 7, 7, 7] }), 'E_LINES');
throws('六爻 非数组报错', () => compute({ system: 'liuyao', lines: 'abc' }), 'E_LINES');
throws('六爻 值越界报错', () => compute({ system: 'liuyao', lines: [1, 2, 3, 4, 5, 6] }), 'E_LINES');
notThrows('六爻 不填爻值 = 随机摇卦', () => compute({ system: 'liuyao' }));

// ── ⑤ 塔罗张数 ───────────────────────────────────────────────
throws('塔罗 4 张报错', () => compute({ system: 'tarot', count: 4 }), 'E_COUNT');
throws('塔罗 2 张报错', () => compute({ system: 'tarot', count: 2 }), 'E_COUNT');
notThrows('塔罗 1/3/5 正常', () => {
  for (const n of [1, 3, 5]) compute({ system: 'tarot', count: n });
});
notThrows('塔罗 不填 = 3 张', () => compute({ system: 'tarot' }));

// ── ⑥ asOf（紫微流月/流日/流时基准）──────────────────────────
throws('asOf 乱码报错', () => compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male', asOf: 'not-a-date' }), 'E_ASOF');
throws('asOf 日期不存在报错', () => compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male', asOf: '2026-02-30' }), 'E_ASOF');
notThrows('asOf 合法正常', () => compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male', asOf: '2026-10-22T16:00' }));

// ── ⑦ 奇门参数枚举 ───────────────────────────────────────────
throws('juMethod 非法报错', () => compute({ system: 'qimen', datetime: '2026-10-24T11:43', juMethod: 'foo' }), 'E_INPUT');
throws('lateZiHourMode 非法报错', () => compute({ system: 'qimen', datetime: '2026-10-24T11:43', lateZiHourMode: 'x' }), 'E_INPUT');
notThrows('奇门三派取局正常', () => {
  for (const m of ['chaibu', 'chaoshen', 'zhirun']) compute({ system: 'qimen', datetime: '2026-10-24T11:43', juMethod: m });
});

// ── ⑧ 体系名 ─────────────────────────────────────────────────
throws('缺 system 报错', () => compute({}), 'E_INPUT');
throws('未知体系报错', () => compute({ system: 'fengshui' }), 'E_SYSTEM');
const unknown = (() => { try { compute({ system: 'fengshui' }); } catch (e) { return e.message; } return ''; })();
ok('未知体系提示列出八种', ['bazi', 'ziwei', 'qimen', 'tarot'].every((k) => unknown.includes(k)), unknown);

// ── ⑨ 梅花起卦参数 ───────────────────────────────────────────
throws('梅花数字起卦缺数字报错', () => compute({ system: 'meihua', mode: 'number' }), 'E_INPUT');

// ── ⑩ 工具层：错误面统一带错误码前缀（回归：曾因 `return run(args)` 少了 await 而漏包）──
const { apply } = await import('../index.js');
let def = null;
apply({ tools: { register: (d) => { def = d; return () => {}; } }, effect: (fn) => fn() });
ok('工具定义已注册', !!def && typeof def.execute === 'function');

let toolErr = '';
try {
  await def.execute({ system: 'tarot', count: 4 });
} catch (e) {
  toolErr = e.message;
}
ok('工具层错误带 [E_COUNT] 前缀', toolErr.startsWith('[E_COUNT]'), toolErr);

const okRes = await def.execute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male' });
ok('工具层正常路径返回摘要', typeof okRes.summary === 'string' && okRes.summary.includes('【四柱】'));
