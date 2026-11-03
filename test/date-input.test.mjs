// 日期输入固定「年-月-日」：原生 date 控件按浏览器区域显示，容易写成月/日/年。
// 这里钉住两个入口同一套掩码/校验，以及模板里不再出现原生 date 控件。
import fs from 'node:fs';
import { ok, eq } from './_harness.mjs';
import { page } from '../tools/build-html.mjs';

const read = (p) => fs.readFileSync(new URL('../' + p, import.meta.url), 'utf8');
const APP = read('src/app.js');
const UI = read('src/web-ui.js');
const HTML = page();

function helpersFrom(src, start, end, prelude) {
  const a = src.indexOf(start);
  const b = src.indexOf(end, a);
  ok('能定位日期辅助函数', a >= 0 && b > a);
  const block = src.slice(a, b);
  return new Function(`${prelude || ''}\n${block}\nreturn { isoDateOk, normalizeDateText, maskDateText };`)();
}
const appH = helpersFrom(APP, 'const pad2 =', 'function DateInput');
const uiH = helpersFrom(UI, '// ── 公历日期输入', 'function bindDateInput',
  "const pad = (n) => String(n).padStart(2, '0');");

for (const [name, H] of [['面板', appH], ['独立页', uiH]]) {
  eq(`${name}：8 位数字自动补成 年-月-日`, H.maskDateText('19900512'), '1990-05-12');
  eq(`${name}：斜杠写法归一`, H.maskDateText('1990/5/12'), '1990-05-12');
  eq(`${name}：中文写法归一`, H.maskDateText('1990年5月12日'), '1990-05-12');
  eq(`${name}：逐字输入时保留半成品`, H.maskDateText('1990-05-1'), '1990-05-1');
  eq(`${name}：逐字打到一半的「1990-5-」不被吞掉`, H.maskDateText('1990-5-'), '1990-5-');
  eq(`${name}：连字符粘贴不被数字重排打乱`, H.maskDateText('1990-5-12'), '1990-5-12');
  eq(`${name}：多打的数字仍按位置归位`, H.maskDateText('1990-123'), '1990-12-3');
  eq(`${name}：连字符单日失焦补零`, H.normalizeDateText('1990-05-1'), '1990-05-01');
  eq(`${name}：单位数月日补零`, H.normalizeDateText('1990-5-2'), '1990-05-02');
  eq(`${name}：闰日合法`, H.normalizeDateText('2024-02-29'), '2024-02-29');
  eq(`${name}：平年 2-29 拒绝`, H.normalizeDateText('2023-02-29'), '');
  eq(`${name}：13 月拒绝`, H.normalizeDateText('2026-13-01'), '');
  eq(`${name}：空值不算合法`, H.isoDateOk(''), false);
}

// 面板与独立页必须同一口径，不能一个认斜杠一个不认
const cases = ['19900512', '1990/5/12', '1990年5月12日', '1990-05-1', '1990-5-12', '2023-02-29', ''];
for (const c of cases) {
  eq(`两入口对「${c || '空'}」结果一致`,
    JSON.stringify([appH.maskDateText(c), appH.normalizeDateText(c)]),
    JSON.stringify([uiH.maskDateText(c), uiH.normalizeDateText(c)]));
}

// 模板层：日期框是文本输入，顺序写明；不许再出现原生 date
const tag = (HTML.match(/<input id="date"[^>]*>/) || [''])[0];
ok('模板日期框改成文本输入', /type="text"/.test(tag) && !/type="date"/.test(tag), tag);
ok('模板写明年-月-日顺序', /年-月-日/.test(tag), tag);
ok('页面里不再有原生 date 控件', !/type="date"/.test(HTML));
ok('面板不再用原生 date 控件', !/type:\s*'date'/.test(APP));
ok('独立页输入中非法日期会转红', /aria-invalid/.test(UI) && /setAttribute\('aria-invalid'/.test(UI));
ok('失焦时非法值退回最近一次有效值', /dataset\.last/.test(UI) && /input\.value = input\.dataset\.last/.test(UI));
