// 「问进对话」的提问模板：只组装文本，不调模型、不改盘。
//
// 这一层的价值在于「发出去的那段话」本身要可核对：体系名要翻成人话、
// 问题要原样带进去、摘要要带得动又别太长、绝对化表述不能混进去。
import { askPrompt, readingOrderOf, READING_ORDERS } from '../engine/followup.js';
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

// ② 内容：体系翻译、问题、摘要、回答要求都在，且回答要求给的是「能读懂」的骨架
{
  const p = askPrompt(bazi, { question: '2027 年事业怎么样' });
  ok('体系翻成中文名', p.text.includes('体系：八字（四柱）') && p.label === '八字（四柱）');
  ok('问题出现在【所问】那行', p.text.includes('所问：2027 年事业怎么样'));
  ok('带【盘面摘要】小节', p.text.includes('——盘面摘要——'));
  ok('摘要真的搬进来了（取盘面首句片段）', p.text.includes('【四柱】'));
  ok('带【回答要求】小节与 1–5 编号', p.text.includes('——回答要求——') && /1\)/.test(p.text) && /2\)/.test(p.text) && /3\)/.test(p.text) && /4\)/.test(p.text) && /5\)/.test(p.text));
  ok('先给盘面层次，再给摘要', p.text.includes('——盘面层次（从上到下读，别跳层）——') && p.text.indexOf('——盘面层次') < p.text.indexOf('——盘面摘要——'));
  ok('层次行写的是本体系的阅读顺序', p.text.includes('八字（四柱）：基本信息 → 四柱（日主/十神/藏干）'), p.text.split('\n').find((l) => l.startsWith('八字（四柱）：')));
  ok('层次要求不跳层', /上一层没交代清楚，不要跳到下一层/.test(p.text));
  ok('第二段先复述骨架再判断', /只复述盘面骨架/.test(p.text) && /按上面的层次/.test(p.text) && /不掺倾向/.test(p.text));
  ok('先交代读者不懂命理', /读者不懂命理/.test(p.text));
  ok('四行骨架齐全（盘面/白话/倾向/边界）', ['盘面｜', '白话｜', '倾向｜', '边界｜'].every((k) => p.text.includes(k)));
  ok('骨架里先要一句无术语的结论', /开头一句结论/.test(p.text) && /不用术语/.test(p.text));
  ok('要求把难词当场翻成日常话', /调候 \/ 化气 \/ 通关 \/ 空亡 \/ 争合/.test(p.text));
  ok('要求收尾给一句「如果只记一件事」', /如果只记一件事/.test(p.text));
  ok('要求里点明要引到柱/宫/爻', /柱、宫或爻/.test(p.text));
  ok('要求里点明看不出来就说', /这盘里看不出来/.test(p.text));
  ok('要求里禁「没有信息的空话」（举例给了两条）', /格局很好/.test(p.text) && /运程不顺/.test(p.text));
  ok('不含绝对化表述', noBanned(p.text));
  ok('不以句号外的裸换行结尾', !/\n\s*$/.test(p.text), JSON.stringify(p.text.slice(-3)));
}

// ③ 空问题 → 默认请它先讲白话主线，再讲依据
{
  const p = askPrompt(bazi, { question: '   ' });
  ok('空问题退到默认问法（先白话主线）', p.question.includes('一句白话') && p.question.includes('主线'));
  ok('默认问法也要依据', p.question.includes('依据'));
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
  // 受控的是「摘要那一段」，不是整段提问：固定抬头与回答要求是常量，随 maxChars 不变
  const kept = (p.text.match(/甲/g) || []).length;
  ok('摘要正文真的截到 maxChars（只多一个省略号位）', kept <= 401, String(kept));
  ok('固定骨架本身不超过 900 字（别把提问写成小作文）', p.chars - kept < 900, String(p.chars - kept));

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

// ⑧ 白话层接进模板：面板已算好的「直答 / 说人话」原样交给模型，开场不再另起一套
{
  const rich = compute({ system: 'bazi', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州', withInterpret: true, question: '今年考运', direction: 'study' });
  const it = rich.interpret;
  const p = askPrompt(rich, { question: '今年考运', interpret: it });
  ok('传解析时带「开场结论」小节', p.text.includes('——开场结论（插件已按同一套规则算好'), p.text.slice(0, 100));
  ok('直答原样进模板', p.text.includes(`直答：${it.answer}`), it.answer.slice(0, 40));
  ok('说人话原样进模板', p.text.includes(`说人话：${it.plain}`), it.plain.slice(0, 40));
  ok('开场结论排在盘面摘要之前', p.text.indexOf('——开场结论') < p.text.indexOf('——盘面摘要——'));
  ok('回答要求改为先沿用开场结论', /先沿用上面的「开场结论」/.test(p.text) && /不用术语/.test(p.text));
  const noDraft = askPrompt({ system: rich.system, summary: rich.summary }, { question: '今年考运' });
  const extra = p.chars - noDraft.chars;
  ok('底稿只多出一小段、不撑成小作文', extra > 0 && extra < 700, `+${extra}`);

  // 不传 interpret、盘面也没有 r.interpret 时保持原样，别硬凑一段空白话
  const plainOnly = askPrompt(bazi, { question: '2027 年事业怎么样' });
  ok('没有解析时不加「开场结论」小节', !plainOnly.text.includes('——开场结论'));
  ok('没有解析时回答要求保持原文', plainOnly.text.includes('1) 开头一句结论：不用术语'));
  ok('空解析对象不生成空小节', !askPrompt(bazi, { question: 'x', interpret: {} }).text.includes('——开场结论'));

  // compute 已带 interpret 时自动采用，调用方忘了传也不会退回老口径
  const auto = askPrompt(rich, { question: '今年考运' });
  ok('r.interpret 存在时自动带底稿', auto.text.includes('——开场结论') && auto.text.includes(`直答：${it.answer}`));

  // 没问事时，底稿也不该出现「先答所问」
  const silent = compute({ system: 'bazi', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州', withInterpret: true });
  const sp = askPrompt(silent, { interpret: silent.interpret });
  ok('没问事时底稿不说「答所问」', sp.text.includes('——开场结论') && !sp.text.includes('先答所问'), sp.text.slice(0, 80));
  ok('没问事时直答落在「没指定问题」', /没指定问题/.test(sp.text));

  // 传了解析也要保持确定性（同一盘同一问逐字相同）
  const again = askPrompt(rich, { question: '今年考运', interpret: it });
  eq('带底稿时输出仍逐字相同', again.text, p.text);
}

// ⑨ 阅读层次：先事实、再结构、后时间与依据；参考 ziwei.pub/bazi 的分区顺序
{
  eq('八字层次固定', readingOrderOf('bazi').join(' → '), '基本信息 → 四柱（日主/十神/藏干） → 旺衰·格局·用神 → 合冲·神煞 → 起运·大运·流年 → 古籍依据');
  eq('紫微层次先命身再十二宫', readingOrderOf('ziwei').slice(0, 3).join(' → '), '基本信息 → 命宫/身宫与五行局 → 十二宫（主星/辅煞/四化）');
  eq('紫微层次收在古籍', readingOrderOf('ziwei').slice(-1)[0], '古籍依据');
  eq('六爻先定用神', readingOrderOf('liuyao')[0], '所问与用神');
  ok('奇门层次含九宫与克应', readingOrderOf('qimen').some((x) => x.includes('九宫')) && readingOrderOf('qimen').some((x) => x.includes('十干克应')));
  eq('大六壬按天地盘→四课→三传', readingOrderOf('daliuren').slice(0, 3).join(' → '), '天地盘（月将/贵人） → 四课 → 三传');

  ok('每个已登记体系都有非空层次', Object.values(READING_ORDERS).every((a) => Array.isArray(a) && a.length >= 4 && a.every((x) => typeof x === 'string' && x.length)));
  ok('同一体系层次不重复', Object.values(READING_ORDERS).every((a) => new Set(a).size === a.length));
  eq('未知体系走通用兜底', readingOrderOf('no-such-system').join(' → '), '基本信息 → 盘面事实 → 结构与关系 → 倾向 → 边界');

  const unknown = askPrompt({ system: 'no-such-system', summary: 'x' }, { question: 'q' });
  ok('未知体系的提问也带层次行', unknown.text.includes('no-such-system：基本信息 → 盘面事实'));
}
