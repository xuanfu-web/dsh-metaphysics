// 解析文本分档（detail: 'full' | 'lean'）：只砍回给模型的文本，不动盘面、不动解析对象。
// 立档的理由是一次 withInterpret 的八字文本约 12k token，其中长论述与「规则·出处」占一半以上——
// 而多数对话只要结论。默认必须仍是 full，且与不传 detail 逐字节一致。
import fs from 'node:fs';
import { compute, renderText, interpretText } from '../engine/index.js';
import { ok, eq } from './_harness.mjs';

const ASK = { withInterpret: true, question: '今年能否换工作', direction: 'career' };
const BAZI = { system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '安徽池州' };
const ZIWEI = { system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male' };
const LIUYAO = { system: 'liuyao', datetime: '2026-03-01T10:00', seed: 7 };

const text = (a) => renderText(compute(a));
const code = (fn) => { try { fn(); return ''; } catch (e) { return e.code || 'ERR'; } };

// ── ① 默认档逐字节不变 ───────────────────────────────────────
for (const [label, base] of [['bazi', BAZI], ['ziwei', ZIWEI], ['liuyao', LIUYAO]]) {
  const plain = text({ ...base, ...ASK });
  const explicit = text({ ...base, ...ASK, detail: 'full' });
  ok(`${label}：不传 detail 与 detail:'full' 逐字节一致`, plain === explicit, `${plain.length} vs ${explicit.length}`);
  const lean = text({ ...base, ...ASK, detail: 'lean' });
  ok(`${label}：lean 更短`, lean.length < plain.length, `${plain.length} → ${lean.length}`);
}
{
  const full = text({ ...BAZI, ...ASK, detail: 'full' }).length;
  const lean = text({ ...BAZI, ...ASK, detail: 'lean' }).length;
  ok('bazi lean 至少省三成', (full - lean) / full >= 0.3, `省 ${(((full - lean) / full) * 100).toFixed(0)}%`);
}
ok('缺省结果里没有档位键', compute({ ...BAZI, ...ASK }).interpretTier === undefined);
ok('lean 才回显档位', compute({ ...BAZI, ...ASK, detail: 'lean' }).interpretTier === 'lean');
// 不带解析时档位不产出任何键（否则盘面 JSON 白多一项）
ok('不附解析时档位不落进结果', compute({ ...BAZI, detail: 'lean' }).interpretTier === undefined);

// ── ② lean 砍掉的是哪两块 ───────────────────────────────────
{
  const it = compute({ ...BAZI, ...ASK, detail: 'lean' }).interpret;
  const lean = interpretText(it, 'lean');
  const full = interpretText(it);
  ok('lean 不展开规则出处', !lean.includes('规则·'), lean.slice(0, 80));
  ok('full 仍带规则出处', full.includes('规则·'));
  ok('lean 说明规则被折叠', /规则 \d+ 条未展开/.test(lean), lean.match(/。规则[^\n]*/)?.[0]);
  ok('lean 点名未展开的长节', /另有 \d+ 节长论述未展开：.+需要原文与出处时传 detail:"full"/.test(lean));
  ok('lean 仍给结论', lean.includes('先答所问'));
  ok('lean 仍给人话', lean.includes('▶ 说人话：'));
  ok('lean 仍给一页读懂', lean.includes('一页读懂：'));
  ok('lean 仍给三张表', lean.includes('【大运表】') && lean.includes('【流年表'));
  ok('lean 仍给能力边界', lean.includes('【本插件不回答什么】'));
  ok('lean 仍给免责声明', lean.includes('仅供参考') || lean.includes('不是预言'));
}

// ── ③ 只留所问那一条维度；综合问题不留偏食 ──────────────────
{
  const it = compute({ ...BAZI, ...ASK, detail: 'lean' }).interpret;
  const lean = interpretText(it, 'lean');
  const dims = it.dimensions || [];
  const focused = dims.filter((d) => d.focused);
  eq('问了方向就有一条聚焦', focused.length, 1);
  ok('lean 保留聚焦那条', lean.includes(focused[0].text.slice(0, 24)), focused[0].label);
  const other = dims.find((d) => !d.focused && d.text && d.text.length > 12);
  ok('lean 不铺开其余维度', !other || !lean.includes(other.text.slice(0, 12)), other && other.label);
  const gen = interpretText(compute({ ...BAZI, withInterpret: true, question: '整体如何', detail: 'lean' }).interpret, 'lean');
  ok('综合问题仍给五条维度', ['整体运势', '工作与职业选择', '事业发展', '爱情与感情', '健康状况'].every((l) => gen.includes(`${l}：`)), gen.slice(0, 60));
}

// ── ④ 档位不改盘面、不改解析对象、不改句柄与影子盘 ──────────
{
  const a = compute({ ...BAZI, ...ASK, detail: 'lean', shadow: true });
  const b = compute({ ...BAZI, ...ASK, detail: 'full', shadow: true });
  eq('四柱不受档位影响', JSON.stringify(a.pillars), JSON.stringify(b.pillars));
  eq('摘要不受档位影响', a.summary, b.summary);
  eq('句柄不受档位影响', a.handle, b.handle);
  eq('影子盘 ID 不受档位影响', a.shadow.id, b.shadow.id);
  eq('解析分节数不受档位影响', a.interpret.sections.length, b.interpret.sections.length);
  eq('解析维度数不受档位影响', a.interpret.dimensions.length, b.interpret.dimensions.length);
  const rule = compute({ ...LIUYAO, ...ASK, detail: 'lean' });
  ok('lean 的解析对象仍带规则原文', (rule.interpret.dimensions[0].knowledge || []).length > 0);
}

// ── ⑤ 非法档位要报错，不能静默按全文发 ──────────────────────
eq('detail 非法值报 E_INPUT', code(() => compute({ ...BAZI, ...ASK, detail: 'brief' })), 'E_INPUT');
eq('detail 传 true 也报 E_INPUT', code(() => compute({ ...BAZI, ...ASK, detail: true })), 'E_INPUT');
eq('空串按缺省处理', code(() => compute({ ...BAZI, ...ASK, detail: '' })), '');
ok('interpretText 只传对象仍是全文档', interpretText(compute({ ...BAZI, ...ASK }).interpret).includes('规则·'));

// ── ⑥ 工具面要把档位说清楚，模型才知道何时该省 ──────────────
const TOOL = fs.readFileSync(new URL('../index.js', import.meta.url), 'utf8');
ok('schema 里有 detail 参数', /detail: \{\s*type: 'string',\s*enum: \['full', 'lean'\]/.test(TOOL));
ok('工具说明提到 lean 与何时改回 full', TOOL.includes('detail: "lean"') && TOOL.includes('追问「为什么/依据」时改回 full'));
