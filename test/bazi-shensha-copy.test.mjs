// 神煞降权文案（炳祥初级第 11 课 / 高级第 16 课口径）：
// 真正取象只用驿马、羊刃、桃花、华盖；天乙贵人单独准确率 <30%，只作锦上添花。
// 只改解读文案，不改 shensha.js 的表与查法。
import { compute } from '../engine/index.js';
import { ok } from './_harness.mjs';

const bazi = (datetime) => compute({ system: 'bazi', datetime, gender: 'male', trueSolar: false, withInterpret: true });
const sec = (r, key) => (r.interpret.sections || []).find((s) => s.key === key) || { text: '' };

// ── 一、有天乙贵人的盘：明确降权 ───────────────────────────────
{
  const r = bazi('1990-05-12T14:30');
  const s = sec(r, 'shensha');
  ok('解读新增神煞段', !!s.text, s.text);
  ok('列出命中神煞明细', s.text.includes('天乙贵人') && s.text.includes('桃花') && s.text.includes('羊刃'), s.text.slice(0, 120));
  ok('点名课里只取四颗', s.text.includes('驿马') && s.text.includes('羊刃') && s.text.includes('桃花') && s.text.includes('华盖'), s.text);
  ok('其余标为锦上添花', s.text.includes('锦上添花'), s.text);
  ok('天乙单独准确率 <30%', s.text.includes('天乙贵人') && s.text.includes('<30%'), s.text);
  ok('写明神煞是枝叶', s.text.includes('枝叶'), s.text);
  ok('明确不参与旺衰与格局', s.text.includes('不参与本盘的旺衰与格局判定'), s.text);
}

// ── 二、没有天乙的盘：也要把降权口径说清 ───────────────────────
{
  const r = bazi('2018-02-13T10:00');
  ok('本盘确实没有天乙贵人', !r.shensha.names.includes('天乙贵人'), r.shensha.names.join(','));
  const s = sec(r, 'shensha');
  ok('无天乙时仍说明其准确率 <30%', s.text.includes('天乙贵人') && s.text.includes('<30%'), s.text);
  ok('无天乙时仍保留锦上添花口径', s.text.includes('锦上添花'), s.text);
  ok('列出本盘实际四神煞', s.text.includes('华盖') && s.text.includes('驿马'), s.text);
}

// ── 三、「未纳入」不再声称神煞加权未做，改为分值折算边界 ───────
{
  const r = bazi('1990-05-12T14:30');
  const lim = sec(r, 'limits');
  ok('未纳入改写神煞分值口径', lim.text.includes('神煞的分值折算'), lim.text);
  ok('未纳入不再写旧口径「神煞的加权轻重」', !lim.text.includes('神煞的加权轻重'), lim.text);
  ok('未纳入仍保留流派边界', lim.text.includes('扶抑') && lim.text.includes('调候'), lim.text);
}

console.log('\n===== 神煞降权文案 =====');
