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
  // 旺衰改三要素判定后，本盘由偏强转中和：水在扶抑里是印（喜），与调候的「寒湿忌水」冲突，
  // 按既有口径保留在喜用并单列 disputed（见 engine/geju.js 的争议表），不当实忌删掉。
  ok('寒湿之水列入有争议', ys.disputed.some((d) => d.element === '水' && d.climate === '寒湿'), JSON.stringify(ys.disputed));
  ok('detail 写明调候与取舍', /调候：/.test(ys.detail) && /同向|调候优先/.test(ys.detail), ys.detail.slice(0, 60));
  ok('tiaohou 保留 element 兼容字段', ys.tiaohou.element === '火', String(ys.tiaohou.element));
}

{
  // 2020 庚子：官星坐寒水，应判忌，且理由点出「加重寒湿」
  const y2020 = compute({ system: 'bazi', datetime: '1996-01-19T07:30', gender: 'male', asOf: '2020-06-01T00:00' })
    .liunian.find((x) => x.year === 2020);
  ok('2020 庚子判为忌', y2020.luck.tier === '忌' || y2020.luck.tier === '大忌', `${y2020.luck.tier} ${y2020.luck.score}`);
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

// ── 湿热单列一档：接通死分支不能靠复用「湿滞」 ─────────────────────
// 上一轮指出「hot && damp>=0.8」永不可达，本轮把它接通时直接判成湿滞（取丙火、忌水），
// 于是所有偏热且带湿土的盘喜用从「水」翻成「火」——往蒸笼下添柴。现在单列「湿热」档取壬水。
const WET_HOT = judgeClimate({ monthBranch: '午', dayStem: '甲', wuxing: { 火: 2, 水: 2.5 }, branches: ['丑', '辰'] });
ok('热且湿判湿热', WET_HOT.kind === '湿热', WET_HOT.kind);
ok('湿热调候取壬水（不复用湿滞的丙火）', WET_HOT.need.element === '水' && WET_HOT.need.stem === '壬', JSON.stringify(WET_HOT.need));
ok('湿热忌火', WET_HOT.avoidElement === '火', WET_HOT.avoidElement);
const WET_ONLY = judgeClimate({ monthBranch: '辰', dayStem: '甲', wuxing: { 火: 0, 水: 2 }, branches: ['丑', '辰'] });
ok('不热之湿仍判湿滞取丙火', WET_ONLY.kind === '湿滞' && WET_ONLY.need.element === '火', `${WET_ONLY.kind}/${WET_ONLY.need.element}`);
// 报告点名的两张盘：翻档即改喜用，这里锁「喜水忌火」回到上一轮口径
for (const [dt, label] of [['1935-06-06T11:00', '1935-06-06 巳月'], ['1995-06-12T23:00', '1995-06-12 午月']]) {
  const hot = compute({ system: 'bazi', datetime: dt, gender: 'male' });
  const ys = hot.frame.yongshen;
  ok(`${label} 判湿热且调候取水`, hot.climate.kind === '湿热' && hot.climate.need.element === '水', `${hot.climate.kind}/${hot.climate.need.element}`);
  ok(`${label} 喜用仍含水、火没被顶到首位`, ys.favor.includes('水') && ys.favor[0] !== '火', ys.favor.join(''));
  ok(`${label} 水没被删成忌神`, !ys.avoid.includes('水'), ys.avoid.join(''));
}
// 旁白里「不该再多的是什么」必须与忌神同源：早先模板按「档名含不含寒」猜，
// 湿滞（忌水、取丙火）会念成「要的不是更多的火，而是丙火」。
const TIAOHOU_SRC = read('engine/tiaohou.js');
ok('旁白不再按档名猜忌神', !/kind\.includes\('寒'\)\s*\?\s*'水'/.test(TIAOHOU_SRC));
for (const c of [COLD.climate, WET_HOT, WET_ONLY, compute({ system: 'bazi', datetime: '1990-06-15T12:00', gender: 'male' }).climate]) {
  const got = /要的不是更多的(.)，而是/.exec(c.narration);
  ok(`旁白忌神与 avoidElement 同源（${c.kind}）`, !!got && got[1] === c.avoidElement, `${c.kind}: ${c.narration.slice(-30)}`);
}
// 档位表不许有缺口：KIND_NAME / NEED / DAY_FEEL 三处同档，且每档写满五种日主
const blockOf = (name) => {
  const s = TIAOHOU_SRC.indexOf(`const ${name} = {`);
  return TIAOHOU_SRC.slice(s, TIAOHOU_SRC.indexOf('\n};', s));
};
const objKeys = (block) => [...block.matchAll(/^ {2}([^:\s]+): \{/gm)].map((m) => m[1]);
const nameKeys = (block) => [...block.matchAll(/([^\s,:{}'"]+):\s*'[^']*'/g)].map((m) => m[1]);
const needKeys = objKeys(blockOf('NEED'));
const kindKeys = nameKeys(blockOf('KIND_NAME'));
const feelKeys = objKeys(blockOf('DAY_FEEL'));
ok('NEED 与 KIND_NAME 同档', needKeys.length === kindKeys.length && kindKeys.every((k) => needKeys.includes(k)), `${kindKeys.join('/')} vs ${needKeys.join('/')}`);
ok('DAY_FEEL 与 KIND_NAME 同档', feelKeys.length === kindKeys.length && kindKeys.every((k) => feelKeys.includes(k)), `${kindKeys.join('/')} vs ${feelKeys.join('/')}`);
const feelBlock = blockOf('DAY_FEEL');
ok('每档写满五行日主', (feelBlock.match(/^ {4}(木|火|土|金|水):/gm) || []).length === kindKeys.length * 5, String((feelBlock.match(/^ {4}(木|火|土|金|水):/gm) || []).length));
