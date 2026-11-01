// A5 推导链导出：同一份层另出一份 Markdown（traceText），面板抽屉一键复制。
//
// 约束：
//   1. 导出只做排版——层数、层序、每层结果/规则/出处与 r.trace 一致，不新增字段；
//   2. 表格单元格里的 | 与换行必须转义，否则一格写坏整张表；
//   3. 没开 trace 的盘不该多出 traceText；重算两次文本逐字相同；
//   4. 面板与独立页都从引擎拿这份文本（不各自重排），抽屉里没文本时不出现复制按钮。
import fs from 'node:fs';
import vm from 'node:vm';
import { compute, traceMarkdown } from '../engine/index.js';
import { ok, eq } from './_harness.mjs';

const html = (url) => fs.readFileSync(url, 'utf8');
const appSrc = html(new URL('../src/app.js', import.meta.url));
const webSrc = html(new URL('../src/web-ui.js', import.meta.url));

const sandbox = { window: {}, console };
vm.runInNewContext(html(new URL('../src/panel-kit.js', import.meta.url)), sandbox, { filename: 'panel-kit.js' });
const PP = sandbox.window.__PP;

// ── ① 五个有推导链的体系：都能导出，且与 r.trace 同源 ──────────────
const CASES = {
  liuyao: { system: 'liuyao', lines: [9, 7, 8, 8, 7, 6], datetime: '2026-10-31T10:00', direction: 'career' },
  bazi: { system: 'bazi', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州' },
  ziwei: { system: 'ziwei', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州' },
  qimen: { system: 'qimen', datetime: '2026-10-31T10:00' },
  daliuren: { system: 'daliuren', datetime: '2026-10-31T10:00' },
};
const LABEL = { liuyao: '六爻', bazi: '八字', ziwei: '紫微', qimen: '奇门', daliuren: '大六壬' };

for (const [system, base] of Object.entries(CASES)) {
  const r = compute({ ...base, trace: true });
  const md = r.traceText || '';
  ok(`${system}: 有推导链也有导出文本`, Array.isArray(r.trace) && r.trace.length > 0 && md.length > 100, `${r.trace && r.trace.length} 层 / ${md.length} 字`);
  ok(`${system}: 标题带体系名`, md.startsWith(`# 推导链 · ${LABEL[system]}`), md.split('\n')[0]);
  ok(`${system}: 声明层数`, md.includes(`${r.trace.length} 层`), md.split('\n')[2]);
  const heads = r.trace.map((t, i) => md.includes(`## ${i + 1}. ${t.field}`));
  ok(`${system}: 每层一个二级标题且序号连续`, heads.every(Boolean), heads.join(','));
  const order = r.trace.map((t) => md.indexOf(`## ${r.trace.indexOf(t) + 1}. ${t.field}`));
  ok(`${system}: 层序与 r.trace 一致`, order.every((v, i) => v >= 0 && (i === 0 || v > order[i - 1])), order.join(','));
  ok(`${system}: 每层都有结果/规则/出处`,
    r.trace.every((t) => md.includes(`**结果**：${t.result}`) && md.includes(`**规则**：${t.rule}`) && md.includes(`**出处**：${t.source}`)));
  ok(`${system}: 有输入的层出表格`, r.trace.every((t) => !(t.inputs && t.inputs.length) || md.includes('| 项 | 值 |')));
  ok(`${system}: 不残留占位串`, !/undefined|null|\[object Object\]|NaN/.test(md), (md.match(/undefined|null|\[object Object\]|NaN/) || [''])[0]);
}

// ── ② 确定性：同参数重算，导出逐字相同 ────────────────────────────
const a1 = compute({ ...CASES.bazi, trace: true }).traceText;
const a2 = compute({ ...CASES.bazi, trace: true }).traceText;
eq('重算两次导出逐字一致', a1, a2);

// ── ③ 没开 trace 不挂导出文本 ─────────────────────────────────────
const plain = compute({ ...CASES.bazi });
ok('未要推导链时不产出 traceText', plain.traceText === undefined && plain.trace === undefined);

// ── ④ 转义：| 与换行不能写坏表格 ──────────────────────────────────
const crafted = [{
  key: 'x', field: '甲|乙', rule: '第一行\n第二行', result: '值 A\n值 B',
  inputs: [{ label: '横|竖', value: '上\n下' }], source: 'engine/test.js',
}];
const mdCrafted = traceMarkdown(crafted, { system: 'bazi' });
ok('标题里的竖线转义', mdCrafted.includes('## 1. 甲|乙'), mdCrafted.split('\n')[2]);
ok('表格竖线转义', mdCrafted.includes('| 横\\|竖 | 上<br>下 |'), mdCrafted.split('\n').find((l) => l.includes('横')));
ok('单元格换行转成 <br>', !/上\n下/.test(mdCrafted));
ok('结果换行照原样保留（不在单元格里）', mdCrafted.includes('**结果**：值 A\n值 B'));

// ── ⑤ 空输入 ──────────────────────────────────────────────────────
eq('空层返回空串', traceMarkdown([], { system: 'bazi' }), '');
eq('非数组返回空串', traceMarkdown(null, { system: 'bazi' }), '');
eq('未知体系退回「命盘」', traceMarkdown(crafted, { system: 'nope' }).split('\n')[0], '# 推导链 · 命盘');

// ── ⑥ 面板抽屉：有文本才出复制按钮，内容进隐藏 textarea ───────────
const r = compute({ ...CASES.bazi, trace: true });
const withMd = PP.traceHTML(r.trace, 'bazi', r.traceText);
ok('抽屉有复制按钮', withMd.includes('data-trace-copy') && withMd.includes('复制 Markdown'));
ok('按钮文案可复位（idle 文案一致）', appSrc.includes("'复制 Markdown'"));
const box = (withMd.match(/<textarea class="mp-trace-md" data-trace-md readonly hidden>([\s\S]*?)<\/textarea>/) || [])[1] || '';
ok('隐藏 textarea 带导出文本', box.length > 100 && box.includes('推导链'), String(box.length));
ok('textarea 内容已转义', !box.includes('<') || box.includes('&lt;'), box.slice(0, 60));
const withoutMd = PP.traceHTML(r.trace, 'bazi');
ok('无文本时不渲染复制按钮与 textarea', !withoutMd.includes('data-trace-copy') && !withoutMd.includes('data-trace-md'));
ok('抽屉标题按五体系给名', PP.traceHTML(r.trace, 'qimen', 'x').includes('推导链 · 奇门'), '奇门');

// ── ⑦ 接线：面板与独立页都把 traceText 传进渲染层 ─────────────────
ok('面板传 traceText', /PP\.traceHTML\(result\.r\.trace, result\.r\.system, result\.r\.traceText\)/.test(appSrc));
ok('独立页传 traceText', /__PP\.traceHTML\(last\.r\.trace, last\.r\.system, last\.r\.traceText\)/.test(webSrc));
ok('面板复制走委托', /data-trace-copy/.test(appSrc) && /copyTraceMarkdown/.test(appSrc));
ok('独立页复制走委托', /data-trace-copy/.test(webSrc) && /copyTraceMarkdown/.test(webSrc));
ok('复制内容取自隐藏 textarea', /data-trace-md/.test(appSrc) && /data-trace-md/.test(webSrc));
