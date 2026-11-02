// 时辰未知（hourUnknown）：八字走「三柱 + 明确标注」，紫微/合盘阻断，趋势降级为按日。
//
// 这组断言只守一件事：**不许拿占位时刻假装算过**。
// 以前的默认行为是没填时刻就按 12:00 排盘，时柱、紫微命宫、起运日照常出现——
// 看起来像算过，实际是用一个编出来的钟点在推。比算错更糟的是「错得看不出来」。
import { compute } from '../engine/index.js';
import { renderText } from '../engine/index.js';
import { buildBazi } from '../engine/bazi.js';

let pass = 0;
const fails = [];
const ok = (c, name, extra = '') => { if (c) { pass++; console.log('PASS ', name); } else { fails.push(`${name}${extra ? ' -> ' + extra : ''}`); console.log('FAIL ', name, extra); } };
const eq = (a, b, name) => ok(a === b, name, `期望 ${b}，实际 ${a}`);

const BASE = { system: 'bazi', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州' };
const NOTICE = '时柱按正午暂算，涉及时柱的结论仅供参考';

// ── 一、三柱：时柱不排，且不当成已知 ─────────────────────
{
  const r = compute({ ...BASE, hourUnknown: true });
  ok(r.hourUnknown === true, '标记 hourUnknown');
  eq(r.provisionalHour, 'noon', '内部只用语义标记 noon，不落成钟点');
  ok(r.pillars.hour === null, '时柱为 null', JSON.stringify(r.pillars.hour && r.pillars.hour.ganzhi));
  ok(r.pillars.year && r.pillars.month && r.pillars.day, '年/月/日三柱照常');
  ok(r.input.civil.hour === null && r.input.civil.minute === null, '输入回显里不留小时/分钟');
  ok(!/12:00/.test(JSON.stringify(r.input)), '输入回显不得出现 12:00');

  // 全文（含摘要与渲染文本）都不许出现 12:00 这类占位钟点
  ok(!/12:00/.test(JSON.stringify(r)), '结果 JSON 全文无 12:00');
  ok(!/12:00/.test(renderText(r)), '渲染文本全文无 12:00');
  ok(!/12:00/.test(r.summary), '摘要无 12:00');

  // 摘要第一行就是固定提示，逐字一致
  eq(r.summary.split('\n')[0], NOTICE, '摘要首行是固定提示句');
  ok(!/时柱：/.test(r.summary), '摘要不出现「时柱：」这种把它当已知的写法');
  ok(/时柱暂缺/.test(r.summary) || /时柱暂缺/.test(JSON.stringify(r.notes || '')), 'notes 或摘要写明时柱暂缺');

  // 命宫/身宫依赖生时支：时柱没了就不该给
  ok(!r.palaces || (r.palaces.minggong === null && r.palaces.shengong === null), '命宫/身宫随空亡一并置空（依赖生时支）');

  // 大运：起运时刻依赖出生时刻 → 降级为按日，并标出来
  eq(r.dayun.precision, 'day', '大运交运精度降为按日');
  ok(r.dayun.list.every((d) => !d.fromDate || !/:\d{2}/.test(d.fromDate)), '大运交运日只到日，不带时刻');
}

// ── 二、默认路径逐字节不变 ───────────────────────────────
{
  const a = compute(BASE);
  ok(!a.hourUnknown, '不传 hourUnknown 时不带该标记');
  ok(a.pillars.hour && /^[甲乙丙丁戊己庚辛壬癸]/.test(a.pillars.hour.ganzhi), '默认路径时柱照常');
  ok(!a.summary.includes(NOTICE), '默认路径不出现提示句');
  const b = buildBazi({ year: 1996, month: 1, day: 19, hour: 7, minute: 31, gender: 'male' });
  ok(b.pillars.hour.ganzhi === a.pillars.hour.ganzhi, '直接调 buildBazi 与 compute 的时柱一致');
}

// ── 三、下游：紫微/合盘阻断，趋势降级 ─────────────────────
{
  let err = null;
  try { compute({ system: 'ziwei', datetime: '1996-01-19T07:31', gender: 'male', hourUnknown: true }); } catch (e) { err = e; }
  ok(err && err.code === 'HOUR_UNKNOWN', '紫微：时辰未知直接阻断（不是空结果、更不是默认盘）', err && err.code);
  ok(err && /出生时刻/.test(err.message), '紫微：错误信息给出可执行的引导');

  let err2 = null;
  try {
    compute({
      system: 'hepan', datetime: '1996-01-19T07:31', gender: 'male', hourUnknown: true,
      partner: { datetime: '1992-03-03T10:00', gender: 'female' },
    });
  } catch (e) { err2 = e; }
  ok(err2 && err2.code === 'HOUR_UNKNOWN', '合盘：任一方时辰未知即阻断', err2 && err2.code);

  const t = compute({ system: 'trend', datetime: '1996-01-19T07:31', gender: 'male', hourUnknown: true });
  ok(t.hourUnknown === true, '趋势：允许出，但带标记');
  eq(t.hourPrecision, 'day', '趋势：起运降级为按日（顶层 hourPrecision 标记）');
  ok(t.summary.startsWith('时柱暂缺'), '趋势：首行写明起运按日估算');
  ok(!/12:00/.test(JSON.stringify(t)), '趋势：全文无 12:00');
}

if (fails.length) {
  console.log(`\nFAIL ${fails.length} 项：`);
  for (const f of fails.slice(0, 15)) console.log('  -', f);
  process.exit(1);
}
console.log(`\nPASS 时辰未知 ${pass} 项断言`);
