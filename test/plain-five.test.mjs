// 「说人话」层在这五个体系上的守卫（engine/interpret-plain.js 的 buildPlain）。
//
// 背景：这个函数长期只写 bazi / ziwei / liuyao 三个分支，其余 return ''。
// 后果不是报错，是**静默少一块**——奇门、塔罗、大六壬、梅花、合盘的用户在结果页
// 看不到「说人话」，只有满屏术语的 brief.lead。测试全绿，因为没人断言它得有。
// 所以这里盯四件事：有内容 / 说人话 / 指得回盘面 / 不越界。
import { compute } from '../engine/index.js';
import { interpret } from '../engine/index.js';
import { buildPlain } from '../engine/interpret-plain.js';
import { ok } from './_harness.mjs';

// 与 tools/lint-copy.mjs 同一批禁词：绝对化、推销腔、客服腔
const BANNED = ['必然', '一定会', '注定', '必定', '铁定', '百分百', '毫无疑问', '肯定会', '保证', '包准', '绝不失手', '希望对你有帮助', '随时找我', '作为 AI', '综上所述', '值得注意的是', '总而言之'];

const SAY = [
  ['奇门', { system: 'qimen', datetime: '2026-11-15T10:00' }, ['阴遁', '门']],
  ['塔罗', { system: 'tarot', spread: 'three', seed: 20261115 }, ['张牌']],
  ['大六壬', { system: 'daliuren', datetime: '2026-11-15T10:00' }, ['起手', '落点']],
  ['梅花', { system: 'meihua', mode: 'time', datetime: '2026-10-24T11:43' }, ['本卦', '体']],
  ['合盘', { system: 'hepan', datetime: '1990-05-12T14:30', gender: 'male', partner: { datetime: '1992-08-03T09:00', gender: 'female' } }, ['你们是', '合盘']],
];

for (const [name, args, mustSay] of SAY) {
  const r = compute(args);
  const plain = buildPlain(r, {}, {});
  ok(`${name}：有说人话这一层`, typeof plain === 'string' && plain.length >= 80, `${plain.length} 字`);
  ok(`${name}：长度在 M2 的 400 字上限内`, plain.length <= 400, `${plain.length} 字`);
  ok(`${name}：不输出 undefined / null / NaN`, !/undefined|null|NaN/.test(plain), plain.slice(0, 60));
  for (const w of mustSay) ok(`${name}：说到「${w}」`, plain.includes(w));
  const hit = BANNED.filter((w) => plain.includes(w));
  ok(`${name}：没有绝对化或客服腔`, hit.length === 0, hit.join(','));
  // 同一盘两次必须一字不差：内容里不许掺时间戳或随机
  ok(`${name}：同盘同文`, buildPlain(compute(args), {}, {}) === plain);
}

// 每个分支都得指回盘面上的具体值，不能是通用套话
{
  const r = compute({ system: 'daliuren', datetime: '2026-11-15T10:00' });
  const p = buildPlain(r, {}, {});
  ok('大六壬点到初传地支', p.includes(r.sanChuan.chu.zhi));
  ok('大六壬点到末传地支', p.includes(r.sanChuan.mo.zhi));
  ok('大六壬把六亲翻成生活语言（不直接写「官鬼」当解释）', /压力|职位/.test(p));
}
{
  const r = compute({ system: 'meihua', mode: 'time', datetime: '2026-10-24T11:43' });
  const p = buildPlain(r, {}, {});
  ok('梅花点出本卦名', p.includes(r.ben.name));
  ok('梅花点出变卦名', p.includes(r.bian.name));
  ok('梅花给出体用两个五行', p.includes(r.bodyUse.body.element) && p.includes(r.bodyUse.use.element));
}
{
  const r = compute({ system: 'qimen', datetime: '2026-11-15T10:00' });
  const p = buildPlain(r, {}, {});
  ok('奇门点出值符星', p.includes(r.zhiFu.star));
  ok('奇门点出值使门', p.includes(r.zhiShi.gate));
  ok('奇门点出局数', p.includes(r.ju));
}
{
  const r = compute({ system: 'tarot', spread: 'three', seed: 20261115 });
  const p = buildPlain(r, {}, {});
  ok('塔罗把三张牌名都说到', r.cards.every((c) => p.includes(c.name)));
  ok('塔罗点出正逆位', /正位|逆位/.test(p));
}
{
  const r = compute({ system: 'hepan', datetime: '1990-05-12T14:30', gender: 'male', partner: { datetime: '1992-08-03T09:00', gender: 'female' } });
  const p = buildPlain(r, {}, {});
  ok('合盘点出双方日主', p.includes(r.a.dayMaster) && p.includes(r.b.dayMaster));
  ok('合盘带上分数但不把分数说成及格线', p.includes(String(r.score.total)) && /不是及格线/.test(p));
  ok('合盘明确不判合不合', /不判合不合|不决定关系成败/.test(p));
}

// 缺数据时整句不出，绝不输出半个句子
{
  const bare = { system: 'daliuren' };
  ok('大六壬没三传时返回空串而不是半个句子', buildPlain(bare, {}, {}) === '');
  ok('合盘没双方日主时返回空串', buildPlain({ system: 'hepan' }, {}, {}) === '');
  ok('塔罗没牌时返回空串', buildPlain({ system: 'tarot', cards: [] }, {}, {}) === '');
}
