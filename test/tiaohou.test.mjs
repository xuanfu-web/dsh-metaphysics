// 调候（寒暖燥湿）：判定、仲裁、评分修正、解释与面板的契约断言。
import fs from 'node:fs';
import vm from 'node:vm';
import { compute, interpret } from '../engine/index.js';
import { judgeClimate, arbitrate } from '../engine/tiaohou.js';
import { ok } from './_harness.mjs';

const ROOT = new URL('../', import.meta.url);
const read = (p) => fs.readFileSync(new URL(p, ROOT), 'utf8');

// 1996-01-19 07:30 男：乙亥 己丑 乙卯 庚辰，全局火 0，典型寒湿
const COLD = compute({ system: 'bazi', datetime: '1996-01-19T07:30', gender: 'male', withInterpret: true });

{
  const c = COLD.climate;
  ok('寒盘判为寒湿', c && c.kind === '寒湿', JSON.stringify(c && c.kind));
  ok('寒湿调候取丙火', c.need && c.need.element === '火' && c.need.stem === '丙', JSON.stringify(c.need));
  ok('寒湿忌水', c.avoidElement === '水');
  ok('气候优先于扶抑', c.priority === '调候优先', c.priority);
  ok('依据含月令与火数', (c.evidence || []).join('').includes('丑月') && (c.evidence || []).join('').includes('火0'), (c.evidence || []).join('/'));
  ok('叙述点出解冻之需', /丙火/.test(c.narration) && /太阳|解冻/.test(c.narration), c.narration);
  ok('温度与湿度为数值', typeof c.temp === 'number' && typeof c.damp === 'number', `${c.temp}/${c.damp}`);
}

{
  const ys = COLD.frame.yongshen;
  ok('用神含调候之火', ys.favor.includes('火'), ys.favor.join(''));
  ok('方法标为调候优先', /调候优先/.test(ys.method), ys.method);
  ok('忌神点明水', ys.avoid.includes('水'), ys.avoid.join(''));
  ok('detail 写明调候与取舍', /调候：/.test(ys.detail) && /同向|调候优先/.test(ys.detail), ys.detail.slice(0, 60));
  ok('tiaohou 保留 element 兼容字段', ys.tiaohou.element === '火', String(ys.tiaohou.element));
}

{
  // 2020 庚子：官星坐寒水，应判忌，且理由点出「加重寒湿」
  const y2020 = compute({ system: 'bazi', datetime: '1996-01-19T07:30', gender: 'male', asOf: '2020-06-01T00:00' })
    .liunian.find((x) => x.year === 2020);
  ok('2020 庚子判为忌', y2020.luck.tier === '忌', `${y2020.luck.tier} ${y2020.luck.score}`);
  ok('2020 理由含寒湿之忌', y2020.luck.reasons.some((r) => /寒湿|冻/.test(r)), y2020.luck.reasons.join('；'));

  // 2026 丙午：寒局得火，应判大吉，且理由写「解冻」
  const y2026 = compute({ system: 'bazi', datetime: '1996-01-19T07:30', gender: 'male', asOf: '2026-06-01T00:00' })
    .liunian.find((x) => x.year === 2026);
  ok('2026 丙午判为大吉', y2026.luck.tier === '大吉', `${y2026.luck.tier} ${y2026.luck.score}`);
  ok('2026 理由写解冻', y2026.luck.reasons.join('').includes('解冻'), y2026.luck.reasons.join('；'));
  ok('评分有上限不越界', y2026.luck.score <= 4 && y2026.luck.score >= -4, String(y2026.luck.score));
}

{
  // 夏火之局：燥热取水，与扶抑可能冲突
  const hot = compute({ system: 'bazi', datetime: '1990-06-15T12:00', gender: 'male' });
  ok('夏盘判热/燥', /热|燥/.test(hot.climate.kind), hot.climate.kind);
  ok('夏盘调候取水', hot.climate.need && hot.climate.need.element === '水', JSON.stringify(hot.climate.need));
  ok('夏盘忌火', hot.climate.avoidElement === '火');
}

{
  // 仲裁：调候所需落在扶抑的忌里时要显式说明冲突
  const clashChart = compute({ system: 'bazi', datetime: '2000-01-01T00:00', gender: 'male' });
  const th = clashChart.frame.yongshen.tiaohou;
  ok('戊土子月调候宜火', th.element === '火', String(th.element));
  ok('冲突时给出仲裁文案', th.clash === true && /调候优先/.test(th.text), th.text);
  const arb = arbitrate(COLD.climate, ['火', '土', '金'], ['木', '水']);
  ok('仲裁同向时说明不必取舍', arb.clash === false && /同向/.test(arb.text), arb.text);
}

{
  // 解释层：新增「寒暖燥湿」一节，且与结论区块并存
  const it = interpret(COLD);
  const sec = (it.sections || []).find((s) => s.key === 'climate');
  ok('解释含寒暖燥湿一节', !!sec, (it.sections || []).map((s) => s.key).join(','));
  ok('寒暖文字说人话', /太阳|解冻|冰封/.test(sec.text) && /丙火/.test(sec.text), sec.text.slice(0, 60));
  ok('用神一节同向表述', /调候/.test((it.sections || []).find((s) => s.key === 'yongshen').text));
}

{
  // 文本摘要与面板
  ok('文本摘要含寒暖行', /^寒暖：/m.test(COLD.summary) && /丙火/.test(COLD.summary));
  const box = { window: {}, console };
  vm.runInNewContext(read('src/panel-kit.js'), box);
  const PP = box.window.__PP;
  const html = PP.baziHTML(COLD);
  ok('面板有寒暖卡', /class="mp-cli"/.test(html) && /寒暖燥湿/.test(html));
  ok('面板标出气候与用神', /寒湿/.test(html) && /丙火/.test(html) && /调候优先/.test(html));
  ok('面板有寒暖标尺', /mp-cli-bar/.test(html) && /left:\d+%/.test(html));
  ok('面板含叙述句', /太阳|冰封|抽不出芽/.test(html));
  const w = PP.baziHTML(compute({ system: 'bazi', datetime: '1990-06-15T12:00', gender: 'male' }));
  ok('热盘也渲染寒暖卡', /mp-cli/.test(w) && /壬水/.test(w));
}
