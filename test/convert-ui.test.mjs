// 0.49.3：离线页「农历」tab 有两处断链——
//   ① 转换方向所在的 #qk-convert 从来没被 setTab 显示过（HTML 里带着 display:none），
//      用户切到农历只看得到公历日期框，永远切不到「农历 → 公历」；
//   ② 农历日期正则写成 /^(d{4})-(d{1,2})-(d{1,2})$/，少了反斜杠，
//      于是 dddd-9-17 反能过、2026-9-17 反而被判断成格式错误。
// 宿主面板（src/app.js）两处都是对的；这里钉住离线页与面板同一套解析口径，
// 并要求每个速查子表单都真的被接线（防止再出现「有 DOM、没人显示」）。
import fs from 'node:fs';
import { ok, eq } from './_harness.mjs';
import { compute } from '../engine/index.js';
import { page } from '../tools/build-html.mjs';

const UI = fs.readFileSync(new URL('../src/web-ui.js', import.meta.url), 'utf8');
const APP = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
const HTML = page();

// ── ① 农历日期解析：两个入口同一套正则，且真的能匹配 ─────────────
const grab = (src) => (src.match(/const m = (\/\^[^\n]+?\/)\.exec/) || [])[1];
const uiRe = grab(UI);
const appRe = grab(APP);
ok('离线页能从源码里找到农历日期正则', !!uiRe, uiRe);
ok('面板能从源码里找到农历日期正则', !!appRe, appRe);
eq('两个入口使用同一套正则（口径不许分叉）', uiRe, appRe);

const re = new RegExp(uiRe.slice(1, uiRe.lastIndexOf('/')));
eq('2026-9-17 解析出年月日', JSON.stringify(re.exec('2026-9-17').slice(1)), JSON.stringify(['2026', '9', '17']));
ok('两位月日同样可解析', re.test('2026-09-17'));
ok('前后带空格时先 trim 再匹配', re.test('2026-9-17 '.trim()));
// 旧写法的假阳性：d{4} 会匹配字面量 dddd —— 这条断言就是用来证伪的
ok('不接受 dddd-9-17（旧正则的假阳性）', !re.test('dddd-9-17'));
ok('不接受斜杠日期', !re.test('2026/9/17'));
ok('不接受缺日', !re.test('2026-9'));
ok('不接受中文前缀', !re.test('农历2026-9-17'));
ok('不接受非数字的「年」', !re.test('abcd-9-17'));

// ── ② 解析出来的三个分组直接喂引擎，结果要对 ───────────────────
{
  const m = re.exec('2026-9-17');
  const r = compute({ system: 'convert', mode: 'lunar2solar', lunarYear: Number(m[1]), lunarMonth: Number(m[2]), lunarDay: Number(m[3]) });
  eq('离线页口径的输入转出 2026-10-26', r.solar.text, '2026-10-26');
  eq('转换结果带回农历原文', r.lunar.text, '农历2026年九月十七');
  const leap = compute({ system: 'convert', mode: 'lunar2solar', lunarYear: 2025, lunarMonth: 6, lunarDay: 1, isLeapMonth: true });
  eq('闰月参数照样能转', leap.solar.text, '2025-07-25');
  let msg = '';
  try {
    compute({ system: 'convert', mode: 'lunar2solar', lunarYear: 2025, lunarMonth: 6, lunarDay: 30, isLeapMonth: true });
  } catch (e) { msg = String(e && e.message ? e.message : e); }
  ok('非法农历日由引擎报错（不在界面瞎猜）', msg.includes('29'), msg);
}

// ── ③ 接线：每个速查子表单都必须被显隐控制 ──────────────────────
{
  const qkIds = [...new Set([...HTML.matchAll(/id="(qk-[a-z0-9-]+)"/g)].map((m) => m[1]))];
  ok('页面里的速查子表单不止一个', qkIds.length >= 6, String(qkIds.length));
  for (const id of qkIds) ok(`#${id} 有显隐接线`, UI.includes(`el('${id}')`));

  ok('#qk-convert 随农历 tab 显示', /el\('qk-convert'\)\.style\.display = tab === 'convert'/.test(UI));
  ok('农历 tab 里有转换方向分段按钮', /id="convertmode"/.test(HTML) && /data-mode="lunar2solar"/.test(HTML));
  ok('农历 tab 里有农历日期与闰月输入', /id="lunardate"/.test(HTML) && /id="leapm"/.test(HTML));
  ok('方向切换只重算不重排其它盘', /convMode = 'solar2lunar'/.test(UI) && /args\.mode = convMode/.test(UI));
  ok('闰月显式传给引擎', /args\.isLeapMonth = !!\(el\('leapm'\)/.test(UI));
  ok('农历模式不带 datetime（不让公历日期混进来）', /args\.lunarDay = Number\(m\[3\]\);\s*args\.isLeapMonth[\s\S]{0,120}delete args\.datetime;/.test(UI));
  ok('格式不符时给出可照抄的示例', UI.includes('农历转公历请按「农历年-月-日」填写'));
  ok('引擎报错走 textContent，不拼 innerHTML', /box\.textContent = String\(\(e && e\.message\) \|\| e\)/.test(UI));
}
