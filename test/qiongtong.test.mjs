// 《穷通宝鉴》120 格：数据完整性、口径标注、以及接入用神/评分/解释/面板的契约断言。
import fs from 'node:fs';
import vm from 'node:vm';
import { compute, interpret } from '../engine/index.js';
import { QT, qtOf, qtLine } from '../engine/qiongtong.js';
import * as QT_MOD from '../engine/qiongtong.js';
import { ok } from './_harness.mjs';

const ROOT = new URL('../', import.meta.url);
const read = (p) => fs.readFileSync(new URL(p, ROOT), 'utf8');
const STEMS = '甲乙丙丁戊己庚辛壬癸';
const BRANCHES = ['寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑'];

// ── 数据完整性 ──
const cells = [];
for (const s of STEMS) for (const b of BRANCHES) cells.push(qtOf(s, b));

ok('120 格齐全', cells.length === 120 && cells.every(Boolean), String(cells.filter(Boolean).length));
ok('十天干各 12 格', STEMS.split('').every((s) => QT[s].length === 12));
ok('用神字全部为天干', cells.every((c) => c.yong.length >= 1 && c.yong.every((y) => STEMS.includes(y))), cells.filter((c) => !c.yong.every((y) => STEMS.includes(y))).length + ' 格异常');
ok('首取即用神第一位', cells.every((c) => c.primary === c.yong[0]));
ok('每格都有原文摘句', cells.every((c) => typeof c.quote === 'string' && c.quote.length >= 10), Math.min(...cells.map((c) => c.quote.length)) + ' 字最短');
ok('章节号落在 002–113', cells.every((c) => c.chapter >= 2 && c.chapter <= 113));
ok('原文所举天干取自天干集', cells.every((c) => c.quoteStems.every((x) => STEMS.includes(x))));
ok('月令与月名对应', cells.every((c) => QT_MOD.QT_MONTHS[BRANCHES.indexOf(c.branch)] === c.month));

// ── 定值：与原文对读过的几格 ──
{
  const e = qtOf('乙', '丑');
  ok('十二月乙木取丙', e.yong.join('') === '丙' && e.primary === '丙', e.yong.join(''));
  ok('丑月乙木原文含「木寒宜丙」', /木寒宜丙/.test(e.quote), e.quote.slice(0, 24));
  ok('标签写明十二月丑月', /十二月/.test(e.label) && /丑/.test(e.label), e.label);
}
ok('正月甲木首取丙', qtOf('甲', '寅').primary === '丙');
ok('正月庚金首取戊（整理表口径）', qtOf('庚', '寅').primary === '戊');
ok('正月庚金原文先举丙，可与表对照', qtOf('庚', '寅').quoteStems[0] === '丙', qtOf('庚', '寅').quoteStems.join(''));
ok('六月癸水原文未提「壬」→ 标 note', /壬/.test(qtOf('癸', '未').note), qtOf('癸', '未').note);
ok('八月丁火原文未提「丙」→ 标 note', /丙/.test(qtOf('丁', '酉').note), qtOf('丁', '酉').note);
ok('未知天干/月令返回 null', qtOf('子', '寅') === null && qtOf('甲', 'X') === null);
ok('qtLine 写出用神与首取', /用神/.test(qtLine(qtOf('乙', '丑'))) && /首取 丙/.test(qtLine(qtOf('乙', '丑'))));

// ── 接入：1996 寒湿盘 ──
const COLD = compute({ system: 'bazi', datetime: '1996-01-19T07:30', gender: 'male', withInterpret: true, asOf: '2026-06-01T00:00' });
{
  const ys = COLD.frame.yongshen;
  ok('命盘挂上穷通格', ys.qt && ys.qt.primary === '丙' && ys.qt.branch === '丑', JSON.stringify(ys.qt && ys.qt.primary));
  ok('climate 仍由调候判定（不被书覆盖）', COLD.climate.need.stem === '丙' && COLD.climate.need.element === '火');
  ok('detail 写出穷通取用', /穷通宝鉴：十二月乙木/.test(ys.detail), ys.detail.slice(-60));
  const ln = COLD.liunian.find((x) => x.year === 2026);
  ok('丙年得到「按书首取」加分', ln.luck.reasons.some((r) => /首取/.test(r)), ln.luck.reasons.join('；'));
  ok('加分不越界（仍 ≤ 4）', ln.luck.score <= 4, String(ln.luck.score));
}

{
  const it = interpret(COLD);
  const sec = (it.sections || []).find((s) => s.key === 'qiongtong');
  ok('解释层有「穷通宝鉴」一节', !!sec, JSON.stringify((it.sections || []).map((s) => s.key)));
  ok('解释层引原文与首取', /用神/.test(sec.text) && /原文/.test(sec.text) && /首取/.test(sec.text), sec.text.slice(0, 60));
  ok('未纳入一栏写明 120 格已录', /120 格/.test((it.sections || []).find((s) => s.key === 'limits').text));
  ok('摘要含穷通一行', /穷通：/.test(COLD.summary), COLD.summary.split('\n').slice(-3).join(' / '));
}

// ── 面板 ──
{
  const box = { window: {}, console };
  vm.runInNewContext(read('src/panel-kit.js'), box, { filename: 'panel-kit.js' });
  const PP = box.window.__PP;
  const html = PP.baziHTML(COLD);
  ok('面板有穷通宝鉴卡', /mp-qt/.test(html) && /穷通宝鉴/.test(html));
  ok('面板显示用神与首取', /mp-qt-y/.test(html) && /首取 丙/.test(html));
    ok('面板引原文与章号', /mp-qt-q/.test(html) && html.includes('第 ' + COLD.frame.yongshen.qt.chapter + ' 章'), (html.match(/第 d+ 章/) || [''])[0]);
  ok('面板文本做过转义（无裸引号注入）', !/mp-qt-q[^>]*>「[^」]*<script/.test(html));
}
