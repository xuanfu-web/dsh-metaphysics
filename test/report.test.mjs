// 报告化改版（R1/R2/R4）的结构断言：
//   R1 一页读懂 + 目录 + 三张表；R2 证据卡 + 置信度；R4 示例报告入口。
// 这里只验「结构与数据形状」，不验视觉；视觉由打印/窄屏脚本另行覆盖。
import fs from 'node:fs';
import vm from 'node:vm';
import { compute, interpretText } from '../engine/index.js';
import { page } from '../tools/build-html.mjs';
import { ok } from './_harness.mjs';

const BZ = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '河北石家庄', withInterpret: true });
const ZW = compute({ system: 'ziwei', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州', withInterpret: true });

// ── R1：一页读懂 ───────────────────────────────────────────
for (const [label, r] of [['八字', BZ], ['紫微', ZW]]) {
  const o = r.interpret.outline;
  ok(`${label}有一页读懂`, Array.isArray(o) && o.length === 5, String(o && o.length));
  ok(`${label}五条摘要齐全`, ['整体', '事业', '财富', '感情', '节奏'].every((k) => o.some((x) => x.label === k)), o.map((x) => x.label).join(','));
  ok(`${label}摘要都非空`, o.every((x) => x.text && x.text.length > 2));
}

// ── R1：三张表 ─────────────────────────────────────────────
{
  const t = BZ.interpret.tables;
  const keys = t.map((x) => x.key);
  ok('八字有三张表', ['dayun', 'liunian', 'triggers'].every((k) => keys.includes(k)), keys.join(','));
  for (const table of t) {
    ok(`八字·${table.title} 有行`, table.rows.length > 0, String(table.rows.length));
    ok(`八字·${table.title} 列数对齐`, table.rows.every((row) => row.length === table.columns.length), `${table.columns.length} vs ${table.rows[0] && table.rows[0].length}`);
  }
  ok('大运表含档位与理由', t[0].rows.some((row) => /大吉|吉|平|忌/.test(row[3]) && row[4].length > 0));
  const z = ZW.interpret.tables.map((x) => x.key);
  ok('紫微有大限/流年/触发表', ['daxian', 'liunian', 'triggers'].every((k) => z.includes(k)), z.join(','));
  ok('紫微大限表 12 行', ZW.interpret.tables.find((x) => x.key === 'daxian').rows.length === 12);
}

// ── R2：证据卡与置信度 ─────────────────────────────────────
for (const [label, r] of [['八字', BZ], ['紫微', ZW]]) {
  const dims = r.interpret.dimensions;
  ok(`${label}维度都有置信度`, dims.every((d) => ['强', '中', '弱'].includes(d.confidence)), dims.map((d) => d.confidence).join(','));
  ok(`${label}置信度有强项`, dims.some((d) => d.confidence === '强'));
  ok(`${label}有技法标签`, r.interpret.technique && r.interpret.technique.length > 2, r.interpret.technique);
}

// ── R1/R2：文本输出 ────────────────────────────────────────
{
  const txt = interpretText(BZ.interpret);
  ok('文本含一页读懂', txt.includes('一页读懂：'));
  ok('文本含三张表', txt.includes('【大运表】') && txt.includes('【流年表（近十年）】') && txt.includes('【触发事件表】'));
  ok('文本依据行带置信度', /依据：.*置信度：/.test(txt));
}

// ── R1/R2：面板渲染结构 ────────────────────────────────────
{
  const sandbox = { window: {}, console };
  vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
  const PP = sandbox.window.__PP;
  const html = PP.interpretHTML(BZ.interpret);
  ok('面板有一页读懂', (html.match(/class="mp-outline-row"/g) || []).length === 5);
  ok('面板有目录且锚点可达', (html.match(/class="mp-toc"/g) || []).length === 1 && (html.match(/href="#mp-sec-/g) || []).length >= 5);
  ok('面板有表格', (html.match(/class="mp-table"/g) || []).length >= 3);
  ok('面板证据卡 5 张', (html.match(/mp-it-ev"/g) || []).length === 5);
  ok('面板置信度标签', (html.match(/mp-it-conf/g) || []).length === 5);
  // 表格内容必须转义
  const evil = JSON.parse(JSON.stringify(BZ.interpret));
  evil.tables[0].rows[0][0] = '<img src=x onerror=alert(1)>';
  const evilHtml = PP.interpretHTML(evil);
  ok('表格内容被转义', !/<img/i.test(evilHtml) && evilHtml.includes('&lt;img'));
  ok('面板 CSS 含打印规则', /@media print\{/.test(PP.CSS) && /break-inside:avoid/.test(PP.CSS));
}

// ── R4：示例入口（面板 + 独立页）───────────────────────────
{
  const htmlPage = page();
  ok('独立页有「看示例」按钮', /id="sample"/.test(htmlPage) && /看示例/.test(htmlPage));
  const ui = fs.readFileSync(new URL('../src/web-ui.js', import.meta.url), 'utf8');
  ok('独立页示例按钮已接线', /el\('sample'\)/.test(ui) && /setTab\('bazi'\)/.test(ui));
  const app = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
  ok('面板有示例入口', /openSample/.test(app) && /看示例/.test(app));
  ok('示例走同一渲染路径（无示例专用分支）', !/sampleHTML|EXAMPLE_HTML/.test(app));
}
