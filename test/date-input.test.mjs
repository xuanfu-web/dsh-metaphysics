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

// 面板是受控输入：打字时只改草稿。若在 input 事件里就 props.onChange，
// 父组件的 value 回写会覆盖草稿——敲到「1990-05-1」被补成 1990-05-01，
// 再敲 2 就丢位，最终静默排成 1 日。提交只允许发生在失焦 / 回车。
{
  const a = APP.indexOf('function DateInput(props)');
  const b = APP.indexOf('\n}', a);
  const node = APP.slice(a, b > a ? b : a + 3000);
  ok('面板日期框打字只写草稿', /setDraft\(maskDateText\(/.test(node), node.slice(0, 40));
  ok('面板日期框打字时不向上提交', !/props\.onChange/.test(node.slice(node.indexOf('onChange:'), node.indexOf('onBlur:'))));
  ok('面板日期框只在失焦 / 回车提交', /onBlur: commit/.test(node) && /e\.key === 'Enter'/.test(node));
}

// 独立页：日期框藏起来了就不能再拿它拦人（塔罗 / 人格不看日期）
ok('独立页显隐与校验共用一处判断', /const showDT = usesTimeInput\(\);/.test(UI));
ok('独立页不看日期的体系不校验日期', /return tab !== 'tarot' && tab !== 'mbti'/.test(UI));

// 生时校正 / 验前事的模块级状态：新盘要清空，不能把上一张盘的自评贴过来
ok('独立页新盘清空验前事与候选时辰', /pastMarks = \{\}; pastFit = null; rectOut = null;/.test(UI));

// 历史条目记「这次实际用的输入」：切体系 / 看示例 / 载入档案都是先 setState 再 run
ok('历史条目用本次生效的日期', /date: dt\.date/.test(APP));
ok('历史条目用本次生效的性别与出生地', /gender: genderV, address: addressV/.test(APP));
ok('时辰未知记进历史而不是 12:00 占位', /hourUnknown: huV2/.test(APP) && /time: huV2 \? '' : dt\.time/.test(APP));
ok('历史去重认得时辰未知', /!!a\.hourUnknown === !!b\.hourUnknown/.test(APP));
ok('重放历史会恢复时辰未知', /setHourUnknown\(!!x\.hourUnknown\)/.test(APP));
ok('生时校正按这张盘自己的输入反推', /const at = result\.at \|\| \{ date, time \};/.test(APP));
ok('独立页生时校正也按这张盘自己的输入', /gender: last\.gender/.test(UI) && /trueSolar: last\.trueSolar !== false/.test(UI));
ok('独立页缓存盘带上性别与出生地', /last = \{ r, html, tab, date, time, timed, trend, caliber, shadowDiff,\s*gender: args\.gender/.test(UI));
// 人生K线也是出生盘：出生地 / 真太阳时不能只对八字生效
ok('独立页人生K线也传出生地', /tab === 'bazi' \|\| tab === 'ziwei' \|\| tab === 'hepan' \|\| tab === 'trend'/.test(UI));
ok('面板人生K线也传出生地', /k === 'bazi' \|\| k === 'ziwei' \|\| k === 'hepan' \|\| k === 'trend'/.test(APP));

// 档案里没存出生地：载入 / 改名都要清掉表单里上一个地址，否则真太阳时按别人的地方算
ok('独立页载入与改名都清掉残留出生地', (UI.match(/if \(node\) node\.value = pair\[1\] \|\| '';/g) || []).length === 2);
ok('面板载入档案用空字符串清残留出生地', /setAddress\(p\.address \|\| ''\)/.test(APP));

// 历史来自 localStorage：非对象条目要在读入时丢掉，别让 x.date.slice 把面板打白
ok('读历史时过滤坏条目', /filter\(\(x\) => x && typeof x === 'object' && typeof x\.kind === 'string'\)/.test(APP));
