// 模型侧风水入口：schema 要把 action:'xuankong' 与 period 声明出来，
// 且「命卦默认看今年」的年份补全不能漏进玄空（否则缺省九运会悄悄变成按今年定运）。
import { apply } from '../index.js';
import { ok } from './_harness.mjs';

let def = null;
apply({ tools: { register: (d) => { def = d; return () => {}; } }, effect: (fn) => fn() });
ok('工具定义已注册', !!def && typeof def.execute === 'function');

// ── ① schema 自描述 ─────────────────────────────────────────
const props = def.parameters.properties;
ok('action 枚举含 xuankong', props.action.enum.includes('xuankong'), props.action.enum.join(','));
ok('action 枚举保留旧四值', ['natal', 'advise', 'assess', 'generate'].every((x) => props.action.enum.includes(x)));
ok('schema 声明 period 为数字', !!props.period && props.period.type === 'number');
ok('action 说明写到玄空', /xuankong/.test(props.action.description) && /玄空/.test(props.action.description));
ok('坐向说明覆盖玄空', /xuankong/.test(props.sitting.description) && /xuankong/.test(props.facing.description));
ok('fortuneYear 说明覆盖玄空', /xuankong/.test(props.fortuneYear.description));
ok('system 说明含玄空下卦', /玄空/.test(props.system.description));

// ── ② 显式运：直接排九宫 ────────────────────────────────────
const xk = await def.execute({ system: 'fengshui', action: 'xuankong', period: 9, sitting: '子', facing: '午' });
ok('工具层可排玄空', xk.meta.action === 'xuankong' && xk.meta.period === 9, JSON.stringify(xk.meta.action));
ok('九宫齐全且坎宫山9向9', xk.palaces.length === 9 && xk.palaces.find((p) => p.palace === '坎').shan === 9
  && xk.palaces.find((p) => p.palace === '坎').xiang === 9);
ok('显式 period 不加缺省提示', xk.meta.note === undefined, String(xk.meta.note));
ok('显式 period 不注入 fortuneYear', xk.meta.year === undefined && xk.meta.periodStart === undefined);

// ── ③ 运势年份：fortuneYear 可定运 ──────────────────────────
const xkf = await def.execute({ system: 'fengshui', action: 'xuankong', fortuneYear: 2026, sitting: '子' });
ok('玄空可用 fortuneYear 定运', xkf.meta.period === 9 && xkf.meta.year === 2026, `${xkf.meta.period}/${xkf.meta.year}`);
ok('按年份定运带运程起止', xkf.meta.periodStart === 2024 && xkf.meta.periodEnd === 2043, `${xkf.meta.periodStart}-${xkf.meta.periodEnd}`);

// ── ④ 缺省：按九运并注明，且不被今年顶替 ────────────────────
const xkd = await def.execute({ system: 'fengshui', action: 'xuankong', sitting: '子' });
ok('玄空虚拟缺省按九运', xkd.meta.period === 9 && /九运/.test(xkd.meta.note || ''), String(xkd.meta.note));
ok('玄空缺省不被默认年份顶替', xkd.meta.year === undefined, String(xkd.meta.year));

// ── ⑤ 命卦仍默认今年（补年份只限 natal）────────────────────
const nat = await def.execute({ system: 'fengshui', datetime: '1990-05-12T14:30', gender: 'female' });
ok('命卦仍默认今年流年', nat.meta.fortuneYear === new Date().getFullYear(), String(nat.meta.fortuneYear));

// ── ⑥ 入参错误仍明确，且在工具层统一归为 E_INPUT ─────────────
const errorOf = async (args) => {
  try { await def.execute(args); return null; } catch (e) { return e.message; }
};
let periodMsg = '';
try {
  await def.execute({ system: 'fengshui', action: 'xuankong', period: 10, sitting: '子' });
} catch (e) { periodMsg = e.message; }
ok('非法运在工具层报错', /1–9|1-9/.test(periodMsg), periodMsg);
ok('非法运归为 E_INPUT', /^\[E_INPUT\]/.test(periodMsg), periodMsg);

let facingMsg = '';
try {
  await def.execute({ system: 'fengshui', action: 'xuankong', sitting: '子', facing: '子' });
} catch (e) { facingMsg = e.message; }
ok('坐向不自洽在工具层报错', /不自洽/.test(facingMsg), facingMsg);
ok('坐向不自洽归为 E_INPUT', /^\[E_INPUT\]/.test(facingMsg), facingMsg);

const cases = [
  ['缺坐向', { system: 'fengshui', action: 'xuankong' }, /缺少坐向/],
  ['非 24 山', { system: 'fengshui', action: 'xuankong', sitting: '北' }, /24 山/],
  ['运非整数', { system: 'fengshui', action: 'xuankong', sitting: '子', period: 2.5 }, /1–9/],
  ['运为字符串', { system: 'fengshui', action: 'xuankong', sitting: '子', period: '9' }, /1–9/],
  ['命卦缺性别', { system: 'fengshui', datetime: '1990-05-12T14:30' }, /gender|性别/],
  ['命卦缺生日', { system: 'fengshui', gender: 'female' }, /datetime/],
  ['门主灶缺坐向', { system: 'fengshui', action: 'advise' }, /缺少坐向/],
];
for (const [name, args, part] of cases) {
  const msg = await errorOf(args);
  ok(`${name}归为 E_INPUT`, msg !== null && part.test(msg) && /^\[E_INPUT\]/.test(msg), String(msg));
}
