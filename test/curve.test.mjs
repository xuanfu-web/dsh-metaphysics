// 人生运势曲线（.mp-curve）：只验结构与几何，不验像素。
// 曲线是「最容易截图传播」的一张图，所以它最需要防的是画飞、画错、画崩。
import fs from 'node:fs';
import vm from 'node:vm';
import { compute } from '../engine/index.js';
import { ok } from './_harness.mjs';

// 取渲染器（panel-kit 挂到 window.__PP）
const sandbox = { window: { Engine: { compute } }, console };
vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
const PP = sandbox.window.__PP;
ok('渲染器暴露 curveHTML', typeof PP.curveHTML === 'function');

const R = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'female', address: '河北石家庄' });
const C = PP.curveHTML(R);

// ── 一、基本形态 ────────────────────────────────────────────
ok('生成 SVG', C.includes('<svg') && C.includes('</svg>'));
ok('带档位色带', (C.match(/cv-band/g) || []).length === 5, String((C.match(/cv-band/g) || []).length));
ok('带大运阶梯', C.includes('cv-dy'));
ok('带流年折线', C.includes('cv-ln'));
ok('带图例', C.includes('cv-legend'));
ok('带读数说明', C.includes('cv-tip'));

// ── 二、几何不能画飞 ────────────────────────────────────────
{
  const W = 640, H = 190;
  let checked = 0, out = 0;
  for (const m of C.matchAll(/points="([^"]+)"/g)) {
    for (const pair of m[1].trim().split(/\s+/)) {
      const [x, y] = pair.split(',').map(Number);
      checked++;
      if (!(x >= -1 && x <= W + 1 && y >= -1 && y <= H + 1)) out++;
    }
  }
  for (const m of C.matchAll(/cx="([-\d.]+)"/g)) { checked++; const v = +m[1]; if (!(v >= -1 && v <= W + 1)) out++; }
  for (const m of C.matchAll(/cy="([-\d.]+)"/g)) { checked++; const v = +m[1]; if (!(v >= -1 && v <= H + 1)) out++; }
  ok('坐标量足够', checked >= 20, String(checked));
  ok('全部坐标落在画布内', out === 0, `越界 ${out}/${checked}`);
  ok('无 NaN/Infinity', !/NaN|Infinity|undefined/.test(C));
}

// ── 三、档位色带纵向连续（有缝就是漏画一档）──────────────────
{
  const b = [...C.matchAll(/class="cv-band (\w[\w-]*)" x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/g)];
  let gap = 0;
  for (let i = 0; i < b.length - 1; i++) {
    const bottom = +b[i][3] + +b[i][5];
    if (Math.abs(bottom - +b[i + 1][3]) > 0.2) gap++;
  }
  ok('色带拼接无缝', gap === 0, `缝隙 ${gap} 处`);
  ok('色带横向铺满', b.every((x) => Math.abs(+x[4] - (+b[0][4])) < 0.01));
}

// ── 四、大运是阶梯 ──────────────────────────────────────────
{
  const pts = (C.match(/class="cv-dy" points="([^"]+)"/) || [, ''])[1].trim().split(/\s+/).map((p) => p.split(',').map(Number));
  ok('顶点数 = 步数×2', pts.length === R.dayun.list.length * 2, `${pts.length} vs ${R.dayun.list.length * 2}`);
  let stair = true;
  for (let i = 0; i < pts.length - 1; i += 2) if (Math.abs(pts[i][1] - pts[i + 1][1]) > 0.01) stair = false;
  ok('每步内水平（阶梯而非斜线）', stair);
  // 横轴单调
  let inc = true;
  for (let i = 1; i < pts.length; i++) if (pts[i][0] < pts[i - 1][0] - 0.01) inc = false;
  ok('大运 x 随年龄递增', inc);
}

// ── 五、流年点与引擎数据对齐 ────────────────────────────────
{
  const dots = (C.match(/class="cv-dot/g) || []).length;
  ok('流年点数 = liunian 条数', dots === R.liunian.length, `${dots} vs ${R.liunian.length}`);
  const cxs = [...C.matchAll(/class="cv-dot(?: now)?" cx="([\d.]+)"/g)].map((m) => +m[1]);
  let inc = true;
  for (let i = 1; i < cxs.length; i++) if (cxs[i] <= cxs[i - 1]) inc = false;
  ok('流年 x 随年份递增', inc);
  ok('「今年」标记唯一', (C.match(/cv-dot now/g) || []).length === 1);
  // 悬停信息带年份与档位
  const t = (C.match(/<title>([^<]+)<\/title>/) || [, ''])[1];
  ok('点带 tooltip（年份+档位）', /\d{4}年/.test(t) && /大吉|吉|平|忌/.test(t), t);
}

// ── 六、刻度不挤 ────────────────────────────────────────────
{
  const ticks = [...C.matchAll(/class="cv-lbl age" x="([\d.]+)"/g)].map((m) => +m[1]);
  let near = 0;
  for (let i = 1; i < ticks.length; i++) if (ticks[i] - ticks[i - 1] < 24) near++;
  ok('年龄标签不重叠', near === 0, `过近 ${near} 处 / 共 ${ticks.length}`);
  ok('至少有刻度', ticks.length >= 3, String(ticks.length));
}

// ── 七、安全与无障碍 ────────────────────────────────────────
ok('不含 script', !/<script/i.test(C));
ok('不含事件属性', !/on(error|load|click)=/i.test(C));
ok('SVG 有 role=img', /role="img"/.test(C));
ok('SVG 有 aria-label', /aria-label="[^"]{10,}"/.test(C));

// ── 八、边界：数据不足不画半张图 ────────────────────────────
ok('单步大运不画图', PP.curveHTML({ dayun: { list: [{ startAge: 5 }], startAge: { years: 5 }, rule: 'x' } }) === '');
ok('无 liunian 也能画（只画大运）', PP.curveHTML({ ...R, liunian: [] }).includes('cv-dy'));
ok('null 不崩', PP.curveHTML(null) === '');
ok('空对象不崩', PP.curveHTML({}) === '');
ok('缺 luck 字段不崩', PP.curveHTML({ dayun: { list: [{ startAge: 2 }, { startAge: 12 }], startAge: { years: 2 }, rule: 'x' }, liunian: [] }).includes('cv-dy'));

// ── 九、挂在八字盘上 ────────────────────────────────────────
ok('八字盘包含曲线', PP.baziHTML(R).includes('mp-curve'));
ok('曲线在大运节内', (() => {
  const h = PP.baziHTML(R);
  return h.indexOf('mp-curve') > h.indexOf('>大运<') && h.indexOf('mp-curve') < h.indexOf('pp-chips', h.indexOf('mp-curve'));
})());

// ── 十、多盘稳定 ────────────────────────────────────────────
for (const [dt, g] of [['1985-03-21T08:15', 'male'], ['1978-11-02T23:40', 'female'], ['1962-01-30T17:45', 'female'], ['2001-09-14T12:00', 'male']]) {
  const c = PP.curveHTML(compute({ system: 'bazi', datetime: dt, gender: g }));
  ok(`${dt} 曲线完整`, c.includes('cv-dy') && c.includes('cv-band') && !/NaN/.test(c));
}
