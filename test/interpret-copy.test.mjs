// 解析文案回归：模板拼接出来的病句 / 重复句 / 无效值。
//
// 0.14.0 的实际输出里出现过：
//   · 「命局身强」被拼成「命局身身强」（level 本身已含"身"）
//   · 「，调候上还初夏火旺」（"还"是硬拼的连接词）
//   · 同一份解读里「调候上…」出现两次（用神 detail 与维度各拼一次）
//   · 「起伏不大，更适合打基础。」后面紧跟「给自己留出缓冲」（大运档位 + 流年档位混成一句）
import { compute } from '../engine/index.js';
import { ok } from './_harness.mjs';

const CASES = [
  ['男命 石家庄', { system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '河北石家庄' }, true],
  ['女命 喀什 23:40', { system: 'bazi', datetime: '1985-12-31T23:30', gender: 'female', address: '新疆喀什' }, true],
  ['无地址', { system: 'bazi', datetime: '2000-01-01T00:00', gender: 'male' }, true],
  ['紫微', { system: 'ziwei', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州' }, true],
  ['六爻', { system: 'liuyao', datetime: '2026-03-03T08:00', lines: [7, 8, 9, 6, 7, 8], question: '这件事能成吗' }, true],
  ['梅花', { system: 'meihua', datetime: '2026-03-03T08:00', mode: 'time' }, true],
  ['六壬', { system: 'daliuren', datetime: '2026-10-24T11:43' }, true],
  ['奇门', { system: 'qimen', datetime: '2026-10-24T11:43' }, true],
];

const BAD = [
  ['重复的"身"', /身身/],
  ['硬拼的"还"', /调候上还/],
  ['未定义值', /\bundefined\b|\bNaN\b/],
  ['空的括号', /（）/],
  ['占位符残留', /\$\{/],
];

for (const [name, args] of CASES) {
  const r = compute({ ...args, withInterpret: true, question: '今年整体如何', direction: 'general' });
  const it = r.interpret;
  // 奇门走的是「按宫位分节」的形态（没有五维度），其余体系都是五维度
  if (args.system === 'qimen') {
    ok(`${name}：解析有分节`, !!it && Array.isArray(it.sections) && it.sections.length > 0, `${it && it.sections ? it.sections.length : 0} 节`);
  } else {
    ok(`${name}：解析非空`, !!it && Array.isArray(it.dimensions) && it.dimensions.length === 5, `${it && it.dimensions ? it.dimensions.length : 0} 维`);
  }
  const text = JSON.stringify(it);
  for (const [label, re] of BAD) ok(`${name}：不含${label}`, !re.test(text), (text.match(re) || [''])[0]);

  const ices = (text.match(/调候上/g) || []).length;
  ok(`${name}：调候句不重复（${ices} 次）`, ices <= 1);

  if (args.system === 'bazi') {
    const overall = it.dimensions.find((d) => d.key === 'overall');
    ok(`${name}：大运与流年分别给建议`, /大运看：/.test(overall.advice) && /流年看：/.test(overall.advice));
    ok(`${name}：档位句不再并成"同样是…"`, !/同样是.*的档位/.test(overall.text));
  }
}

// 解析层的免责声明必须始终在
const one = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', withInterpret: true });
ok('免责声明存在', typeof one.interpret.disclaimer === 'string' && one.interpret.disclaimer.length > 10);
