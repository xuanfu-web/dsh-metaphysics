// 「问进对话」的提问模板：只组装文本，不调模型、不改盘。
//
// 这一层的价值在于「发出去的那段话」本身要可核对：体系名要翻成人话、
// 问题要原样带进去、摘要要带得动又别太长、绝对化表述不能混进去。
import { askPrompt } from '../engine/followup.js';
import { compute } from '../engine/index.js';
import { ok, eq } from './_harness.mjs';

const BAN = /一定|必然|注定|肯定会|绝对会|百分百|铁定|毫无疑问/;
const noBanned = (s) => !BAN.test(String(s));

const bazi = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male' });
const liuyao = compute({ system: 'liuyao', lines: [7, 8, 9, 6, 7, 8], datetime: '2026-10-28T21:00', direction: 'career' });

// ① 结构：字段齐全、类型对
{
  const p = askPrompt(bazi, { question: '2027 年事业怎么样' });
  eq('返回 5 个键', Object.keys(p).sort().join(','), 'chars,label,question,system,text,truncated'.split(',').sort().join(','));
  ok('text 是非空字符串', typeof p.text === 'string' && p.text.length > 200, String(p.text && p.text.length));
  eq('system 原样带出', p.system, 'bazi');
  eq('question 原样带出（去掉首尾空白）', p.question, '2027 年事业怎么样');
  eq('chars 等于 text 长度', p.chars, p.text.length);
  eq('默认不截断', p.truncated, false);
}

// ② 内容：体系翻译、问题、摘要、回答要求三段都在
{
  const p = askPrompt(bazi, { question: '2027 年事业怎么样' });
  ok('体系翻成中文名', p.text.includes('体系：八字（四柱）') && p.label === '八字（四柱）');
  ok('问题出现在【所问】那行', p.text.includes('所问：2027 年事业怎么样'));
  ok('带【盘面摘要】小节', p.text.includes('——盘面摘要——'));
  ok('摘要真的搬进来了（取盘面首句片段）', p.text.includes('【四柱】'));
  ok('带【回答要求】三条', p.text.includes('——回答要求——') && /1\)/.test(p.text) && /2\)/.test(p.text) && /3\)/.test(p.text));
  ok('要求里点明要引到柱/宫/爻', /柱、宫或爻/.test(p.text));
  ok('要求里点明看不出来就说', /这盘里看不出来/.test(p.text));
  ok('不含绝对化表述', noBanned(p.text));
  ok('不以句号外的裸换行结尾', !/\n\s*$/.test(p.text), JSON.stringify(p.text.slice(-3)));
}

// ③ 空问题 → 默认请它总览，且说明依据
{
  const p = askPrompt(bazi, { question: '   ' });
  ok('空问题退到默认问法', p.question.includes('总览这张盘') && p.question.includes('依据'));
  ok('默认问法也进到【所问】行', p.text.includes(`所问：${p.question}`));
  const p2 = askPrompt(bazi, {});
  eq('不传 question 与空串等价', p2.question, p.question);
}

// ④ 各体系都翻得出中文名（不是把内部键直接丢给模型）
{
  const cases = [
    ['bazi', { system: 'bazi', datetime: '1990-05-12T14:30', gender: 'female' }, '八字（四柱）'],
    ['liuyao', { system: 'liuyao', lines: [7, 8, 9, 6, 7, 8], question: 'q' }, '六爻'],
    ['ziwei', { system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male' }, '紫微斗数'],
    ['mbti', { system: 'mbti', answers: [5, 4, 3, 2, 2, 5, 4, 3, 5, 4, 3, 2, 4, 5, 3, 2, 1, 2, 4, 3, 5, 4, 4, 2] }, '十六型人格'],
    ['qimen', { system: 'qimen', datetime: '2024-06-15T15:00' }, '奇门遁甲'],
    ['almanac', { system: 'almanac', datetime: '2026-10-28T12:00' }, '黄历'],
  ];
  for (const [name, args, label] of cases) {
    const r = compute(args);
    const p = askPrompt(r);
    eq(`${name} 体系名翻成 ${label}`, p.label, label);
    ok(`${name} 摘要被带进提问`, p.text.length > 300, String(p.text.length));
    ok(`${name} 不含绝对化表述`, noBanned(p.text));
  }
}

// ⑤ 超长摘要要截断并标明，没摘要要给占位而不是空一段
{
  const long = { system: 'bazi', summary: '甲'.repeat(5000) };
  const p = askPrompt(long, { maxChars: 400 });
  eq('超长摘要标记截断', p.truncated, true);
  ok('截断处带标注', p.text.includes('（摘要已截断）'));
  ok('正文实际长度受控', p.chars < 400 + 400, String(p.chars));

  const bare = askPrompt({ system: 'ziwei' }, { question: '看看命宫' });
  ok('没有摘要时给占位句', bare.text.includes('没有摘要字段'));
  ok('没有摘要也不炸', bare.chars > 100 && bare.truncated === false);
}

// ⑥ 边界与确定性
{
  const a = askPrompt(liuyao, { question: '这盘能换工作吗' });
  const b = askPrompt(liuyao, { question: '这盘能换工作吗' });
  eq('同一盘同一问，输出逐字相同', a.text, b.text);

  const none = askPrompt(null);
  ok('传 null 不抛，体系写未知', none.label === '未知体系' && none.text.includes('体系：未知体系'), none.label);

  const tiny = askPrompt(bazi, { maxChars: 10 });
  eq('maxChars 太小按默认 3000 处理', tiny.truncated, false);
}

// ⑦ 六爻这盘带用神与旺衰，摘要要真的是这一盘
{
  const p = askPrompt(liuyao, { question: '这份工作能成吗' });
  ok('六爻摘要带卦名与用神', /用神|卦体/.test(p.text), p.text.slice(0, 80));
  ok('问题原样出现', p.text.includes('所问：这份工作能成吗'));
}
