// 问事解读提示（engine/event-prompt.js）：把「先问清事、再取用神、后回现实」推广到全部问事体系。
//
// 这里盯的不是文笔，而是三条会让人误判的东西：
//   1. 时间不明时到底有没有真的拦住（不许默认拿现在起课）；
//   2. 每个体系的「我」与「事」有没有自己的取法，而不是六爻那一套硬套到梅花、塔罗上；
//   3. 用神两现、盘上无此符号这类「说不清」的情况，有没有被写出来而不是糊过去。
import { compute } from '../engine/index.js';
import { buildEventPrompt, ASK_KINDS, EVENT_PROMPT_VERSION } from '../engine/event-prompt.js';
import { buildQimenPrompt } from '../engine/qimen-prompt.js';

let pass = 0;
const fails = [];
const ok = (c, name, extra = '') => { if (c) { pass++; console.log('PASS ', name); } else { fails.push(`${name}${extra ? ' -> ' + extra : ''}`); console.log('FAIL ', name, extra); } };
const eq = (a, b, name) => ok(a === b, name, `期望 ${b}，实际 ${a}`);

const Q = '下周三前能不能拿到书面 offer';

// ── 一、六个问事体系都要能出提示 ─────────────────────────
const CASES = {
  liuyao: { system: 'liuyao', datetime: '2026-11-01T22:10', lines: [9, 7, 8, 8, 7, 6] },
  meihua: { system: 'meihua', mode: 'time', datetime: '2026-11-01T22:10' },
  daliuren: { system: 'daliuren', datetime: '2026-11-01T22:10' },
  qimen: { system: 'qimen', datetime: '2026-11-01T22:10' },
  tarot: { system: 'tarot', count: 3 },
  xiaoliuren: { system: 'xiaoliuren', datetime: '2026-11-01T22:10' },
};

for (const [name, input] of Object.entries(CASES)) {
  const r = compute({ ...input, withInterpret: false });
  const p = buildEventPrompt(r, { kind: 'career', question: Q, gender: 'male', timeKnown: true });
  ok(!p.blocked && p.text.length > 500, `${name}：提示已生成`);
  // 骨架五件套，缺一件就不是这套方法了
  ok(/先确认问的是哪一件事/.test(p.text), `${name}：先确认问的是什么`);
  ok(/取哪个符号代表什么/.test(p.text), `${name}：取用神并给理由`);
  ok(/先自检这三问/.test(p.text), `${name}：三追问自检`);
  ok(/回到现实核对/.test(p.text), `${name}：回到现实核对`);
  ok(p.text.includes(Q), `${name}：把他的原问题带进提示`);
}

// ── 二、时间不明要真的拦住 ───────────────────────────────
{
  const p = buildEventPrompt({ system: 'liuyao' }, { kind: 'career', question: Q, timeKnown: false });
  ok(p.blocked, '时间不明：标记为 blocked');
  ok(/先别起课/.test(p.text), '时间不明：第一句就是先别起');
  ok(/钟表时间还是农历/.test(p.text) && /城市/.test(p.text), '时间不明：问清历法与地点（真太阳时）');
  ok(!/世爻|应爻|四柱|值符/.test(p.text), '时间不明：不得给出任何盘面符号（没盘就没有符号）');
  // 奇门支路同样要拦住
  const q = buildEventPrompt({ system: 'qimen' }, { kind: 'career', timeKnown: false });
  ok(q.blocked && /先别起局/.test(q.text), '奇门：时间不明时先别起局');
}

// ── 三、体系不同，取用神就不同（不能一套硬套）─────────────
{
  const r = compute({ ...CASES.liuyao, withInterpret: false });
  const p = buildEventPrompt(r, { kind: 'career', question: Q, gender: 'male' });
  ok(/世爻/.test(p.text) && /应爻/.test(p.text), '六爻：世应分别代表我与对方');
  ok(/官鬼/.test(p.text), '六爻问工作取官鬼');
  // 用神两现是真实存在的情况：两处官鬼就必须提示「不能随手挑一个」
  const hits = r.ben.lines.filter((l) => l.liuqin === '官鬼').length;
  if (hits > 1) ok(/用神两现/.test(p.text) && /两现未定/.test(p.text), '六爻：用神两现要说明未定');

  const m = compute({ ...CASES.meihua, withInterpret: false });
  const pm = buildEventPrompt(m, { kind: 'career' });
  ok(/体卦/.test(pm.text) && /用卦/.test(pm.text), '梅花：体为我、用为事');
  ok(/不直接把「大吉」当结论/.test(pm.text), '梅花：本盘标了「大吉」也要提醒不能当结论');

  const d = compute({ ...CASES.daliuren, withInterpret: false });
  const pd = buildEventPrompt(d, { kind: 'career' });
  ok(/日干/.test(pd.text) && /日支/.test(pd.text), '六壬：日干为我、日支为事');
  ok(/初传/.test(pd.text) && /末传/.test(pd.text), '六壬：三传看过程，末传更近结果');

  const t = compute({ ...CASES.tarot, withInterpret: false });
  const pt = buildEventPrompt(t, { kind: 'career' });
  ok(/牌位决定它代表什么/.test(pt.text), '塔罗：牌位决定含义，不是牌名决定');

  const x = compute({ ...CASES.xiaoliuren, withInterpret: false });
  const px = buildEventPrompt(x, { kind: 'career' });
  ok(/没有「我」的独立符号/.test(px.text) && /别硬补/.test(px.text), '小六壬：口径限制要说明，不许补一个「我」出来');
}

// ── 四、奇门委派：两套提示不能各说一套 ───────────────────
{
  const r = compute({ ...CASES.qimen, withInterpret: false });
  const a = buildEventPrompt(r, { kind: 'business', question: Q });
  const b = buildQimenPrompt(r, { kind: 'business', question: Q, timeKnown: true });
  eq(a.text, b.text, '奇门走自己的取用神表，内容与 qimen-prompt 完全一致');
}

// ── 五、类型与现实核对 ───────────────────────────────────
{
  eq(Object.keys(ASK_KINDS).length, 6, '六类问事');
  ok(Object.values(ASK_KINDS).every((k) => k.reality.length >= 4), '每类的现实核对都有四条以上具体项');
  // 空话检测：不允许「结合现实」「具体情况具体分析」这类不可执行的条目
  const vague = Object.values(ASK_KINDS).flatMap((k) => k.reality).filter((x) => /结合现实|具体分析|综合考虑|视情况而定/.test(x));
  eq(vague.length, 0, '现实核对不许写空话');
  const p = buildEventPrompt(compute({ ...CASES.liuyao, withInterpret: false }), { kind: '不存在', question: Q });
  eq(p.kind, 'other', '未知类型落到「其他具体事」');
}

// ── 六、提示自身的要求不能自相矛盾 ───────────────────────
{
  const p = buildEventPrompt(compute({ ...CASES.liuyao, withInterpret: false }), { kind: 'career', question: Q });
  ok(/不写「吉\/凶」二字当结论/.test(p.text), '明确禁止把吉凶当结论');
  ok(/不许「旺相所以好」/.test(p.text), '明确禁止「旺相所以好」这种一句话断语');
  ok(/不给公历日期/.test(p.text), '不给公历日期');
  ok(/不给医疗、法律、投资的具体结论/.test(p.text), '医疗法律投资不越界');
  ok(p.version === EVENT_PROMPT_VERSION, '版本号写进提示，便于日后对账');
  // 长问题截断，避免把一整段聊天塞进提示
  const long = buildEventPrompt(compute({ ...CASES.liuyao, withInterpret: false }), { kind: 'career', question: '啊'.repeat(400) });
  ok(long.text.includes('啊'.repeat(200)) && !long.text.includes('啊'.repeat(201)), '问题超过 200 字会截断');
}

if (fails.length) {
  console.log(`\nFAIL ${fails.length} 项：`);
  for (const f of fails.slice(0, 12)) console.log('  -', f);
  process.exit(1);
}
console.log(`\nPASS 问事解读提示 ${pass} 项断言`);
