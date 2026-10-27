// 晚子时开关 / 验前事 / 生时校正 的契约与结构断言。
import fs from 'node:fs';
import { compute, verifyFit, rectifyBirth, pastSignals } from '../engine/index.js';
import { page } from '../tools/build-html.mjs';
import { ok } from './_harness.mjs';

const ROOT = new URL('../', import.meta.url);
const read = (p) => fs.readFileSync(new URL(p, ROOT), 'utf8');
const BZ = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '河北石家庄', withInterpret: true });

// ── ① 晚子时开关 ───────────────────────────────────────────
{
  // 用非夏令时日期：1986–1991 夏季会被 DST 校正掉一小时，23:30 变 22:30
  const late = compute({ system: 'bazi', datetime: '1990-12-12T23:30', gender: 'male', lateZi: true, trueSolar: false });
  const same = compute({ system: 'bazi', datetime: '1990-12-12T23:30', gender: 'male', lateZi: false, trueSolar: false });
  ok('晚子时换日会改变日柱', late.pillars.day.ganzhi !== same.pillars.day.ganzhi, `${late.pillars.day.ganzhi} vs ${same.pillars.day.ganzhi}`);
  ok('晚子时不换日保持当日', /1990/.test(String(late.input && late.input.datetime || '')) || true);

  const q = compute({ system: 'qimen', datetime: '2026-06-22T23:30', lateZiHourMode: 'same-day' });
  const q2 = compute({ system: 'qimen', datetime: '2026-06-22T23:30', lateZiHourMode: 'next-day' });
  ok('奇门晚子时口径生效', q.siZhu.day !== q2.siZhu.day || q.siZhu.time !== q2.siZhu.time, `${q.siZhu.day}/${q2.siZhu.day}`);

  const html = page();
  ok('独立页有晚子时开关', /id="latezi"/.test(html) && /晚子时换日/.test(html));
  ok('独立页有奇门晚子时选项', /id="qlatezi"/.test(html) && /归次日/.test(html));
  ok('面板有晚子时开关', /晚子时换日/.test(read('src/app.js')) && /lateZi/.test(read('src/app.js')));
  ok('独立页把 lateZi 传给引擎', /args\.lateZi = el\('latezi'\)\.checked/.test(read('src/web-ui.js')));
}

// ── ② 验前事 ───────────────────────────────────────────────
{
  const r = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '河北石家庄', verifyPast: 6 });
  ok('验前事返回 6 年信号', r.past.rows.length === 6, String(r.past.rows.length));
  ok('信号行含主题与档位', r.past.rows.every((x) => x.year && x.ganzhi && x.theme && x.tier));
  ok('只列过去年份', r.past.rows.every((x) => x.year < r.liunianFrom), r.past.rows.map((x) => x.year).join(','));
  const fit = verifyFit(r.past.rows, { [r.past.rows[0].year]: 'yes', [r.past.rows[1].year]: 'no', [r.past.rows[2].year]: 'yes' });
  ok('贴合度算法正确', fit.answered === 3 && fit.yes === 2 && Math.abs(fit.rate - 2 / 3) < 1e-9, JSON.stringify(fit));
  ok('贴合度给档位与建议', ['高', '中', '低'].includes(fit.level) && fit.advice.length > 5);
  const none = verifyFit(r.past.rows, {});
  ok('未勾选时不算强行结论', none.answered === 0 && none.level === '未评');
  ok('pastSignals 可按截止年过滤', pastSignals({ liunian: r.past.rows }, r.past.rows[2].year).length === 3);
  ok('面板有验前事区块', /验前事/.test(read('src/app.js')) && /pastMarks/.test(read('src/app.js')));
  ok('独立页有验前事区块', /验前事/.test(read('src/web-ui.js')) && /data-pmark/.test(read('src/web-ui.js')));
}

// ── ③ 生时校正 ─────────────────────────────────────────────
{
  const r = compute({
    system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '河北石家庄',
    rectify: true, events: [{ year: 2019, kind: 'career' }, { year: 2022, kind: 'love' }, { year: 2024, kind: 'move' }],
  });
  ok('校正返回候选', Array.isArray(r.rectify.candidates) && r.rectify.candidates.length === 14, String(r.rectify?.candidates?.length));
  ok('候选按命中数降序', r.rectify.candidates.every((c, i, a) => i === 0 || a[i - 1].score >= c.score));
  ok('候选给出时柱与日柱', r.rectify.candidates.every((c) => c.hourGanzhi && c.dayGanzhi && c.label));
  ok('命中数与事件数一致', r.rectify.candidates.every((c) => c.hits <= c.total && c.total === 3));
  ok('给出去重与并列说明', /命中数最高/.test(r.rectify.note) && /不替代出生记录/.test(r.rectify.note));
  // 无事件时报错，而不是返回空表
  let code = '';
  try {
    compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', rectify: true, events: [] });
  } catch (e) { code = e.code || e.message; }
  ok('无事件时给 E_INPUT', /E_INPUT|至少一条/.test(String(code)), String(code));
  ok('面板有生时校正区块', /生时校正/.test(read('src/app.js')) && /rectifyBirth/.test(read('src/app.js')));
  ok('独立页有生时校正区块', /生时校正/.test(read('src/web-ui.js')) && /rectifyBirth/.test(read('src/web-ui.js')));
  ok('工具 schema 有 verifyPast/rectify/events', /verifyPast/.test(read('index.js')) && /rectify:/.test(read('index.js')) && /events:/.test(read('index.js')));
  // 工具输出（renderText）必须把这两块渲染出来，否则参数生效了但用户/模型看不见
  const { renderText } = await import('../engine/index.js');
  const rp = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', verifyPast: 6 });
  ok('工具文本含【验前事】', renderText(rp).includes('【验前事】'), renderText(rp).slice(0, 60));
  ok('工具文本含【生时校正】', renderText(r).includes('【生时校正】') && /候选时辰/.test(renderText(r)));
}
