// 解析文本分档（detail: 'full' | 'lean' | 'brief'）：只砍回给模型的文本，不动盘面、不动解析对象。
// 立档的理由是一次 withInterpret 的八字全文约 16KB，其中长论述与「规则·出处」占一半以上——
// 而多数对话只要结论。引擎/面板缺省仍是 full，且与不传 detail 逐字节一致；
// 工具面对模型缺省 brief（只做结构性收敛，不按体积截断），要依据时请显式传 lean / full。
import fs from 'node:fs';
import { compute, renderText, interpretText } from '../engine/index.js';
import { apply } from '../index.js';
import { ok, eq } from './_harness.mjs';

const ASK = { withInterpret: true, question: '今年能否换工作', direction: 'career' };
const BAZI = { system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '安徽池州' };
const ZIWEI = { system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male' };
const LIUYAO = { system: 'liuyao', datetime: '2026-03-01T10:00', seed: 7 };

const text = (a) => renderText(compute(a));
const code = (fn) => { try { fn(); return ''; } catch (e) { return e.code || 'ERR'; } };
// bytes 只用来比较档位之间的体积差；解析段没有体积闸门了
const bytes = (s) => new TextEncoder().encode(String(s)).length;

// ── ① 默认档逐字节不变 ───────────────────────────────────────
for (const [label, base] of [['bazi', BAZI], ['ziwei', ZIWEI], ['liuyao', LIUYAO]]) {
  const plain = text({ ...base, ...ASK });
  const explicit = text({ ...base, ...ASK, detail: 'full' });
  ok(`${label}：不传 detail 与 detail:'full' 逐字节一致`, plain === explicit, `${plain.length} vs ${explicit.length}`);
  const lean = text({ ...base, ...ASK, detail: 'lean' });
  ok(`${label}：lean 更短`, lean.length < plain.length, `${plain.length} → ${lean.length}`);
  const brief = text({ ...base, ...ASK, detail: 'brief' });
  ok(`${label}：brief 更短`, brief.length < plain.length, `${plain.length} → ${brief.length}`);
  ok(`${label}：brief 不长于 lean`, brief.length <= lean.length, `${lean.length} vs ${brief.length}`);
}
{
  const full = text({ ...BAZI, ...ASK, detail: 'full' }).length;
  const lean = text({ ...BAZI, ...ASK, detail: 'lean' }).length;
  ok('bazi lean 至少省三成', (full - lean) / full >= 0.3, `省 ${(((full - lean) / full) * 100).toFixed(0)}%`);
}
ok('缺省结果里没有档位键', compute({ ...BAZI, ...ASK }).interpretTier === undefined);
ok('lean 回显档位', compute({ ...BAZI, ...ASK, detail: 'lean' }).interpretTier === 'lean');
ok('brief 回显档位', compute({ ...BAZI, ...ASK, detail: 'brief' }).interpretTier === 'brief');
// 不带解析时档位不产出任何键（否则盘面 JSON 白多一项）
ok('不附解析时档位不落进结果', compute({ ...BAZI, detail: 'lean' }).interpretTier === undefined);
ok('无解析模块的体系不留档位键', compute({ system: 'star', datetime: '2026-03-01', withInterpret: true, detail: 'brief' }).interpretTier === undefined);

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

// ── ②b brief：在 lean 上再限表行、丢名词解释，不压体积 ────────
{
  const b = compute({ ...BAZI, ...ASK, detail: 'brief' });
  const it = b.interpret;
  const brief = interpretText(it, 'brief');
  ok('brief 仍给结论', brief.includes('先答所问'));
  ok('brief 仍给人话', brief.includes('▶ 说人话：'));
  ok('brief 仍给一页读懂', brief.includes('一页读懂：'));
  ok('brief 仍给三张表', brief.includes('【大运表】') && brief.includes('【流年表'));
  ok('brief 仍给能力边界', brief.includes('【本插件不回答什么】'));
  ok('brief 仍给免责声明', brief.includes('仅供参考') || brief.includes('不是预言'));
  ok('brief 不带名词解释', !brief.includes('名词解释：'));
  ok('brief 表格只列前 8 行', /共 10 行，仅列前 8 行；全表传 detail:"lean"/.test(brief), brief.match(/共 \d+ 行[^\n]*/)?.[0]);
  // 这里不再有「解析段压到 12KB」：brief 只是少给维度和表行，给了的内容一字不删
  ok('brief 不出现截断提示', !brief.includes('已截到') && !brief.includes('未展开的解析'), `${bytes(brief)}B / ${brief.length}字`);
}

// ── ②c 超长解析也不截：不设体积上限，超长就超长 ──────────────
// 按字节腰斩会把结论、依据和必要交代一起砍掉，读到的还是半句话；
// brief 已经用「少给维度、表限行数」控过长度，够用的收敛在结构层，不在字节层。
{
  const long = {
    title: '压力盘',
    answer: '一'.repeat(2000),
    plain: '二'.repeat(1500),
    dimensions: [{ label: '事业', text: '三'.repeat(1000), evidence: ['四'.repeat(200)] }],
    limits: [{ title: '本插件不回答什么', text: '五'.repeat(80) }],
    disclaimer: '六'.repeat(60),
  };
  const full = interpretText(long, 'full');
  const brief = interpretText(long, 'brief');
  ok('构造的长解析已远超 12KB', bytes(full) > 12 * 1024, `${bytes(full)}B`);
  ok('brief 与 full 对同一份内容逐字一致', brief === full, `${brief.length} vs ${full.length}`);
  ok('brief 完整保留结论（2000 字一字不少）', brief.includes('一'.repeat(2000)));
  ok('brief 完整保留说人话（1500 字一字不少）', brief.includes('二'.repeat(1500)));
  ok('brief 完整保留维度正文', brief.includes('三'.repeat(1000)));
  ok('brief 超长也没有截断提示', !brief.includes('已截到') && !brief.includes('12KB'));
  ok('超长时仍留能力边界', brief.includes('【本插件不回答什么】'));
  ok('超长时仍留免责声明', brief.includes('六六六'));
  ok('没有把汉字截成半个', !brief.includes('\uFFFD'));

  // 没有能力边界/免责声明时同样不截：正文多长就多长
  const bare = interpretText({ title: '无边界盘', answer: '一'.repeat(6000) }, 'brief');
  ok('无边界/免责声明时正文也完整保留', bare.includes('一'.repeat(6000)), `${bare.length}字 / ${bytes(bare)}B`);
  ok('无边界解析也没有截断提示', !bare.includes('已截到'));
  // 超长单行（整段没有换行）更不该被「最后一个换行」截成只剩标题
  ok('超长单行不会只剩标题', bare.length > 6000, `${bare.length}字`);

  // 多行正文整段保留，不在任何行尾断开
  const multi = interpretText({
    title: '多行', answer: Array.from({ length: 900 }, (_, i) => `第${i}行内容示例`).join('\n'),
  }, 'brief');
  ok('多行正文 900 行整段保留', multi.includes('第899行内容示例') && multi.includes('第0行内容示例'), `${multi.length}字`);
  ok('多行正文没有补尾注', !multi.includes('（detail:"brief"'), multi.slice(-40).replace(/\n/g, '⏎'));
}

// ── ②d 解析段与盘面一样不裁 ────────────────────────────────
// 盘面、句柄、能力边界是「看盘必须有的」，解析段同样：brief 只在结构上少给东西，
// 给了就完整给。任何一段都不该为了凑体积被砍。
{
  const cases = [
    ['bazi', { ...BAZI, ...ASK }],
    ['ziwei', { ...ZIWEI, ...ASK }],
    ['liuyao', { ...LIUYAO, withInterpret: true, question: '这卦成不成', direction: 'career' }],
    ['tarot', { system: 'tarot', seed: 3, withInterpret: true, question: '今年能换工作吗' }],
  ];
  for (const [label, args] of cases) {
    const r = compute({ ...args, detail: 'brief' });
    const full = renderText(r);
    const leanSeg = interpretText(r.interpret, 'lean');
    const seg = interpretText(r.interpret, 'brief');
    eq(`${label} brief 档位落到结果里`, r.interpretTier, 'brief');
    // brief 的输出就是 lean 的逐字子集（brief 只减不加），且没有任何截断痕迹
    ok(`${label} 解析段不含截断提示`, !seg.includes('已截到'), `${bytes(seg)}B`);
    ok(`${label} 解析段不比 lean 长`, seg.length <= leanSeg.length, `${seg.length} vs ${leanSeg.length}`);
    ok(`${label} 盘面完整保留`, full.includes(String(r.summary)));
    ok(`${label} 句柄完整保留`, !r.handle || full.includes(r.handle));
    const hasLimits = Array.isArray(r.interpret && r.interpret.limits) && r.interpret.limits.length > 0;
    ok(`${label} 能力边界完整保留`, !hasLimits || full.includes('【本插件不回答什么】'));
  }
  // 盘面本身就大的体系（八字/紫微），整段超 12KB 是正常的，不该被压
  const big = renderText(compute({ ...BAZI, ...ASK, detail: 'brief' }));
  ok('八字整段可超过 12KB', bytes(big) > 12 * 1024, `${bytes(big)}B`);
  // lean / full 更长：要依据时本来就得给足篇幅
  const lean = renderText(compute({ ...BAZI, ...ASK, detail: 'lean' }));
  const full = renderText(compute({ ...BAZI, ...ASK, detail: 'full' }));
  ok('full 比 lean 更长', bytes(full) > bytes(lean), `${bytes(full)}B vs ${bytes(lean)}B`);
}

// ── ②e 源码里不该再留下体积闸门的残留 ───────────────────────
// 去掉上限就要去干净：常量、截断函数、那句「已截到 12KB」的尾注都不能留，
// 否则下一次改档位的人会以为还有一道闸在。
{
  const SRC = fs.readFileSync(new URL('../engine/index.js', import.meta.url), 'utf8');
  ok('引擎里没有 BRIEF_CAP', !SRC.includes('BRIEF_CAP'));
  ok('引擎里没有按字节截断的 cutByBytes', !SRC.includes('cutByBytes'));
  ok('引擎里没有「已截到 12KB」尾注', !SRC.includes('已截到 12KB'));
  // 短盘与长盘都不该出现任何截断痕迹
  for (const [label, args] of [['短盘', { ...BAZI, ...ASK }], ['无问题盘', { ...BAZI, detail: 'brief' }]]) {
    const t = interpretText(compute(args).interpret, 'brief');
    ok(`${label} 不出现截断提示`, !t.includes('已截到') && !t.includes('12KB'), `${bytes(t)}B`);
  }
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
eq('detail 非法值报 E_INPUT', code(() => compute({ ...BAZI, ...ASK, detail: 'tiny' })), 'E_INPUT');
eq('detail 传 true 也报 E_INPUT', code(() => compute({ ...BAZI, ...ASK, detail: true })), 'E_INPUT');
eq('brief 是合法档位', code(() => compute({ ...BAZI, ...ASK, detail: 'brief' })), '');
eq('空串按缺省处理', code(() => compute({ ...BAZI, ...ASK, detail: '' })), '');
ok('interpretText 只传对象仍是全文档', interpretText(compute({ ...BAZI, ...ASK }).interpret).includes('规则·'));

// ── ⑥ 工具面要把档位说清楚，模型才知道何时该省 ──────────────
const TOOL = fs.readFileSync(new URL('../index.js', import.meta.url), 'utf8');
ok('schema 里有 detail 参数', /detail: \{\s*type: 'string',\s*enum: \['brief', 'lean', 'full'\]/.test(TOOL));
ok('工具说明提到 brief 缺省与何时改回 full', TOOL.includes('缺省 detail: "brief"') && TOOL.includes('追问「为什么/依据」时改回 full'));

// ── ⑦ 工具层缺省 brief：模型不写档位也拿不到全文 ──────────────
let chart = null;
apply({ effect: (fn) => fn(), tools: { register: (d) => { chart = d; return () => {}; } } });
const renderOf = (def, value) => def.output.render({}, value)[0].text;
const toolBrief = await chart.execute({ ...BAZI, withInterpret: true, question: '今年能否换工作', direction: 'career' });
eq('工具缺省档位 brief', toolBrief.interpretTier, 'brief');
// 工具面同样不按体积截：缺省 brief 只少给维度与表行，给到的内容完整
const toolInterpret = (v) => interpretText(v.interpret, v.interpretTier);
ok('工具缺省档的解析文本完整（无截断痕迹）',
  !toolInterpret(toolBrief).includes('已截到') && !toolInterpret(toolBrief).includes('12KB'),
  `${bytes(toolInterpret(toolBrief))}B / ${toolInterpret(toolBrief).length}字`);
ok('工具缺省档保留完整结论与能力边界',
  toolInterpret(toolBrief).includes(String(toolBrief.interpret.answer))
  && toolInterpret(toolBrief).includes('【本插件不回答什么】'));
ok('工具缺省文本仍保留盘面摘要', renderOf(chart, toolBrief).includes('【先说结论】'));
ok('工具缺省文本仍保留排盘句柄', renderOf(chart, toolBrief).includes('【排盘句柄】'));
eq('字符串 true 也触发缺省 brief', (await chart.execute({ ...BAZI, withInterpret: 'true' })).interpretTier, 'brief');
eq('不开解析时没有档位键', (await chart.execute({ ...BAZI })).interpretTier, undefined);
const toolLean = await chart.execute({ ...BAZI, withInterpret: true, detail: 'lean' });
eq('显式 lean 不被缺省覆盖', toolLean.interpretTier, 'lean');
const toolFull = await chart.execute({ ...BAZI, withInterpret: true, detail: 'full' });
eq('显式 full 不被缺省覆盖', toolFull.interpretTier, undefined);
ok('显式 full 比缺省更长', renderOf(chart, toolFull).length > renderOf(chart, toolBrief).length,
  `${renderOf(chart, toolFull).length} vs ${renderOf(chart, toolBrief).length}`);
