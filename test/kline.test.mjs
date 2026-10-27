// 人生 K 线（.mp-kline）：只验结构与几何，不验像素。
// 这张图会被截图传播，所以最需要防的是画飞、画错、画崩，以及「没数据时崩掉」。
import fs from 'node:fs';
import vm from 'node:vm';
import { compute } from '../engine/index.js';
import { ok } from './_harness.mjs';

const sandbox = { window: { Engine: { compute } }, console };
vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
const PP = sandbox.window.__PP;

ok('渲染器暴露 trendChart / trendHTML', typeof PP.trendChart === 'function' && typeof PP.trendHTML === 'function');

const R = compute({ system: 'trend', datetime: '1990-05-12T14:30', gender: 'female', toAge: 100, address: '河北石家庄' });
const C = PP.trendChart(R);

// ── 一、基本形态 ────────────────────────────────────────────
ok('生成 SVG', C.includes('<svg') && C.includes('</svg>'));
ok('蜡烛数量 = 逐年点数', (C.match(/class="kl-c /g) || []).length === R.points.length, String((C.match(/class="kl-c /g) || []).length));
ok('大运分段名齐全', (C.match(/class="kl-seg"/g) || []).length === R.segments.length, String((C.match(/class="kl-seg"/g) || []).length));
ok('带 5 年与 10 年均线', C.includes('kl-ma m5') && C.includes('kl-ma m10'));
ok('带高低年份标记', C.includes('kl-mark hi') && C.includes('kl-mark lo'));
ok('带图例', C.includes('kl-legend') && C.includes('虚线＝大运交界'));
ok('带年龄刻度', (C.match(/class="kl-lbl age"/g) || []).length >= 3);

// ── 二、几何不能画飞 ────────────────────────────────────────
{
  const W = 720, H = 300;
  let checked = 0, out = 0;
  for (const m of C.matchAll(/<rect[^>]*x="([-\d.]+)"[^>]*y="([-\d.]+)"[^>]*width="([\d.]+)"[^>]*height="([\d.]+)"/g)) {
    const [x, y, w, h] = m.slice(1).map(Number);
    checked++;
    if (!(x >= -1 && y >= -1 && x + w <= W + 1 && y + h <= H + 1)) out++;
  }
  for (const m of C.matchAll(/<line[^>]*x1="([-\d.]+)"[^>]*y1="([-\d.]+)"[^>]*x2="([-\d.]+)"[^>]*y2="([-\d.]+)"/g)) {
    const p = m.slice(1).map(Number);
    checked++;
    if (p.some((v, i) => v < -1 || v > (i % 2 === 0 ? W : H) + 1)) out++;
  }
  ok('坐标量足够', checked >= 80, String(checked));
  ok('全部坐标落在画布内', out === 0, `越界 ${out}/${checked}`);
  ok('无 NaN/Infinity/undefined', !/NaN|Infinity|undefined/.test(C));
}

// ── 三、数据不足与空值 ──────────────────────────────────────
ok('无点返回空串', PP.trendChart({ points: [] }) === '');
ok('null 安全', PP.trendHTML(null) === '');
ok('单点不画（画不出涨跌）', PP.trendChart({ points: [{ age: 1, score: 50, kline: { open: 50, close: 50, high: 54, low: 46 } }] }) === '');

// ── 四、整块渲染与口径 ──────────────────────────────────────
const H2 = PP.trendHTML(R);
ok('整块含标题与图', H2.includes('mp-kline') && H2.includes('人生 K 线'));
ok('大运 chips 与分段数一致', (H2.match(/kl-chip/g) || []).length === R.segments.length, String((H2.match(/kl-chip/g) || []).length));
ok('含口径说明（不预测具体事件）', H2.includes('不预测具体事件'));
ok('旺衰边界时不给高低结论', (() => {
  const B = compute({ system: 'trend', datetime: '1988-07-01T00:30', gender: 'female', toAge: 40 });
  const HH = PP.trendHTML(B);
  return B.meta.strength.boundary ? (HH.includes('旺衰') && !HH.includes('kl-hl hi')) : true;
})());

// ── 五、八字结果里确实嵌了这一块 ────────────────────────────
{
  const src = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
  ok('面板八字渲染拼接 K 线', /PP\.baziHTML\(result\.r\) \+ \(result\.trend \? PP\.trendHTML\(result\.trend\)/.test(src));
  ok('面板八字会再算一次 trend', /system: 'trend'/.test(src));
  ok('趋势 tab 用 trendHTML', /result\.kind === 'trend' \? PP\.trendHTML/.test(src));
  const wsrc = fs.readFileSync(new URL('../src/web-ui.js', import.meta.url), 'utf8');
  ok('独立页八字也嵌 K 线', /baziHTML\(r\) \+ \(trend \? window\.__PP\.trendHTML\(trend\)/.test(wsrc));
  ok('独立页 trend tab 用 trendHTML', /tab === 'trend' \? window\.__PP\.trendHTML/.test(wsrc));
}
