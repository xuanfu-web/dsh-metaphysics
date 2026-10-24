// R3 追问 / R5 交叉验证 / R6 量化 / R7 方法页 / R8 导出的结构与接线断言。
import fs from 'node:fs';
import vm from 'node:vm';
import { compute, renderText, followup } from '../engine/index.js';
import { page } from '../tools/build-html.mjs';
import { ok } from './_harness.mjs';

const ROOT = new URL('../', import.meta.url);
const read = (p) => fs.readFileSync(new URL(p, ROOT), 'utf8');
const BZ = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '河北石家庄', withInterpret: true });

// ── R3 追问 ────────────────────────────────────────────────
{
  const fx = followup(BZ, '2027 年事业怎么样');
  ok('追问识别年份与方面', fx.year === 2027 && fx.topic?.label === '事业', `${fx.year}/${fx.topic?.label}`);
  ok('追问答案带流年与档位', /2027.*丁未/.test(fx.answer) && /档位/.test(fx.answer), fx.answer.slice(0, 40));
  ok('追问带依据与置信度', fx.evidence.length >= 2 && ['强', '中', '弱'].includes(fx.confidence), fx.confidence);
  const miss = followup(BZ, '2050 年事业');
  ok('超范围年份明确说找不到', miss.ok === false && /已排的流年范围|没有 2050/.test(miss.answer), miss.answer.slice(0, 40));
  const topic = followup(BZ, '财运如何');
  ok('只问方面也能答', topic.ok === true && topic.answer.length > 10);
  const r = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '河北石家庄', ask: '今年事业怎么样' });
  ok('compute 带 ask 时挂 followup', !!r.followup && r.followup.ok, JSON.stringify(r.followup && r.followup.ok));
  ok('文本输出含追问段', renderText(r).includes('【追问】'));
  // 追问结果必须被转义
  const sandbox = { window: {}, console };
  vm.runInNewContext(read('src/panel-kit.js'), sandbox, { filename: 'panel-kit.js' });
  const PP = sandbox.window.__PP;
  const evil = PP.followupHTML({ question: '<img>', ok: true, answer: '<script>alert(1)</script>', evidence: [], confidence: '中' });
  ok('追问结果被转义', !/<img|<script/i.test(evil) && evil.includes('&lt;'));
}

// ── R5 交叉验证 ────────────────────────────────────────────
{
  const r = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '河北石家庄', withInterpret: true, cross: true });
  ok('交叉验证有结论条目', Array.isArray(r.cross?.items) && r.cross.items.length === 5, String(r.cross?.items?.length));
  ok('条目含两边依据与判断', r.cross.items.every((x) => x.bazi && x.ziwei && ['同向', '有张力', '互补'].includes(x.stance)));
  ok('解析里有交叉验证分节', r.interpret.sections.some((s) => s.key === 'crossSystem' && s.text.includes('八字')));
  ok('文本输出含交叉验证', renderText(r).includes('【八字 × 紫微 交叉验证】'));
  const z = compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male', address: '河北石家庄', cross: true });
  ok('紫微侧也能交叉', z.cross.items.length === 5);
  const l = compute({ system: 'liuyao', lines: [7, 7, 7, 7, 7, 7], cross: true });
  ok('非命盘类忽略 cross', l.cross === undefined);
}

// ── R6 量化口径 ────────────────────────────────────────────
{
  for (const [label, r] of [['八字', BZ], ['紫微', compute({ system: 'ziwei', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州', withInterpret: true })]]) {
    const q = r.interpret.sections.find((s) => s.key === 'quant');
    ok(`${label}有量化口径段`, !!q && /量化口径/.test(q.label));
    ok(`${label}量化只到档位`, q && /档位|计数/.test(q.text));
    const all = JSON.stringify(r.interpret);
    ok(`${label}不出现金额区间`, !/\d+\s*万/.test(all));
    ok(`${label}不宣称疾病诊断`, !/诊断为|必定患病/.test(all));
  }
}

// ── R7 方法与验证页 ────────────────────────────────────────
{
  const html = page();
  ok('方法页存在且默认隐藏', /id="method"[^>]*hidden/.test(html));
  ok('方法页写明对拍与测试', /128 条/.test(html) && /52 个测试文件|1335 条断言/.test(html));
  ok('方法页写明已知边界', /已知边界/.test(html) && /应期|金额/.test(html));
  ok('有打开方法页的入口', /id="method-open"/.test(html) && /方法与验证/.test(html));
  const ui = read('src/web-ui.js');
  ok('方法页按钮已接线', /method-open/.test(ui) && /mSec\.hidden/.test(ui));
}

// ── R8 导出与分享 ──────────────────────────────────────────
{
  const html = page();
  ok('独立页有导出 .md 按钮', /data-act="md"/.test(html) || /data-act="md"/.test(read('src/web-ui.js')));
  const ui = read('src/web-ui.js');
  ok('独立页导出走 renderText', /downloadReport/.test(ui) && /renderText/.test(ui));
  const app = read('src/app.js');
  ok('面板有导出 .md', /downloadReport/.test(app) && /导出 \.md/.test(app));
  ok('导出文件名带体系', /命理报告-/.test(app));
  ok('独立页有存为长图按钮', /data-act="png"/.test(ui) && /downloadCard/.test(ui));
  ok('面板有存为长图按钮', /存为摘要长图/.test(app) && /summaryCardPNG/.test(app));

  // Canvas 桩：验证 summaryCardPNG 真的画了摘要与首张表，而不是返回空
  const drawn = [];
  const ctx = {
    font: '', fillStyle: '', strokeStyle: '',
    measureText: (t) => ({ width: String(t).length * 8 }),
    fillRect() {}, beginPath() {}, moveTo() {}, lineTo() {}, stroke() {},
    fillText: (t) => { drawn.push(String(t)); },
  };
  const canvas = { width: 0, height: 0, getContext: () => ctx, toDataURL: () => 'data:image/png;base64,TEST' };
  const sandbox = { window: {}, console, document: { createElement: (tag) => (tag === 'canvas' ? canvas : {}) } };
  vm.runInNewContext(read('src/panel-kit.js'), sandbox, { filename: 'panel-kit.js' });
  const PP = sandbox.window.__PP;
  const url = PP.summaryCardPNG(BZ, BZ.interpret);
  ok('摘要长图返回 PNG dataURL', url === 'data:image/png;base64,TEST', String(url).slice(0, 30));
  ok('长图有尺寸', canvas.width > 0 && canvas.height > 0, `${canvas.width}x${canvas.height}`);
  ok('长图画了一页读懂与摘要', drawn.some((t) => t.includes('一页读懂')) && drawn.some((t) => t.includes('摘要')));
  ok('长图画了首张表', drawn.some((t) => t.includes('大运表')), drawn.join('|').slice(0, 60));
  ok('长图带免责声明', drawn.some((t) => t.includes('不构成医疗')));
  // 没有 document 时必须安全返回空串
  const noDoc = { window: {}, console };
  vm.runInNewContext(read('src/panel-kit.js'), noDoc, { filename: 'panel-kit.js' });
  ok('无 canvas 环境安全降级', noDoc.window.__PP.summaryCardPNG(BZ, BZ.interpret) === '');
}
