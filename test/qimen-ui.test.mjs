// 奇门面板：换局规则的可访问结构 + 盘面事实的 dl 渲染。
//
// 面板是 React（app.js），没有 DOM 环境做不了端到端；这里分两层验证：
//   1. 渲染层（panel-kit，可直接在 vm 里跑）：事实必须是 dl/dt/dd，且全部转义；
//   2. 接线层（app.js 源码）：奇门 tab、radiogroup、radio name、juMethod 透传、合盘性别分支。
import fs from 'node:fs';
import vm from 'node:vm';
import { compute } from '../engine/index.js';
import { ok } from './_harness.mjs';

const sandbox = { window: {}, console };
vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
const PP = sandbox.window.__PP;

const r = compute({ system: 'qimen', datetime: '2026-10-24T11:43' });
const html = PP.qimenFactsHTML(r);

// ── ① 结构：dl > div > dt/dd ───────────────────────────────
ok('事实区是 dl', /^<dl class="relation[^"]*"[^>]*>/.test(html), html.slice(0, 60));
ok('事实区带 aria-label', /aria-label="奇门盘面事实"/.test(html));
ok('事实行是 div 包裹的 dt/dd', (html.match(/<div class="relation__row"><dt>/g) || []).length >= 8,
  String((html.match(/<div class="relation__row"><dt>/g) || []).length));
for (const label of ['局数', '节气', '值符', '值使', '空亡', '驿马', '换局规则', '晚子时']) {
  ok(`事实含「${label}」`, html.includes(`<dt>${label}</dt>`));
}
// 值必须来自盘面数据，不是空的
ok('值符值非空', new RegExp(`<dt>值符</dt><dd>${r.zhiFu.star}`).test(html), r.zhiFu.star);
ok('换局规则写明', /<dt>换局规则<\/dt><dd>[^<]+<\/dd>/.test(html));

// ── ② 转义：任一字段被污染都不能变成标签 ────────────────────
const evil = JSON.parse(JSON.stringify(r));
evil.ju = '<img src=x onerror=alert(1)>';
const evilHtml = PP.qimenFactsHTML(evil);
ok('局数里的标签被转义', !/<img/i.test(evilHtml) && evilHtml.includes('&lt;img'));

// ── ③ 接线：app.js 的奇门 tab 与参数透传 ────────────────────
const app = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
ok("有奇门 tab", /k: 'qimen'/.test(app) && /label: '奇门'/.test(app));
ok('换局规则用 fieldset + legend', /<fieldset|h\('fieldset'/.test(app) && /h\('legend'/.test(app));
ok('规则组是 radiogroup', /role: 'radiogroup'/.test(app) && /'aria-label': '奇门换局规则'/.test(app));
ok('三个取值都用原生 radio 且同 name', /name: 'qimen_rule'/.test(app) && /'chaibu', '拆补'/.test(app) && /'chaoshen', '超神接气'/.test(app) && /'zhirun', '置闰'/.test(app));
ok('juMethod 透传到 compute', /args\.juMethod = qimenRule/.test(app));
ok('结果区渲染盘面 + 事实', /result\.kind === 'qimen'/.test(app) && /qimenFactsHTML/.test(app));
ok('奇门按起局时刻处理', /qimen: 'cast'/.test(app));
ok('奇门可选询问方向（定用神）', /询问方向（定用神）/.test(app) && /needAsk\(tab\) \|\| tab === 'qimen'/.test(app));
ok('奇门解读透传 direction', /needAsk\(k\) \|\| k === 'qimen'/.test(app) && /direction \}/.test(app));

// ── ④ 合盘回归：主方性别/出生地必须与八字同一分支 ───────────
ok('合盘主方也带性别与经度', /k === 'bazi' \|\| k === 'ziwei' \|\| k === 'hepan'/.test(app),
  (app.match(/k === 'bazi'[^\n]*/) || [''])[0]);
