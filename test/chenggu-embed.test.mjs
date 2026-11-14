// 称骨嵌入八字结果卡：引擎独立可算 + 双入口嵌入 + 折叠渲染
import { buildChenggu } from '../engine/index.js';
import fs from 'node:fs';
import { ok, eq } from './_harness.mjs';

const cg = buildChenggu({ year: 1990, month: 5, day: 12, hour: 14, minute: 30 });
eq('称骨独立可算', cg.total.label, '四两四钱');
ok('晚子时口径自带（与八字同源）', typeof cg.input.lateZi === 'boolean');

const pk = fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8');
ok('baziHTML 接受 opt.chenggu', /pp\.baziHTML = function \(r, opt\)/.test(pk));
ok('称骨嵌入段显眼呈现（亮色块、默认展开、骨重大字）', pk.includes('class="mp-bzcg open"') && pk.includes('mp-bzcg-hero') && pk.includes('mp-bzcg-bandchip'));
ok('折叠段标注两套口径互不推导', pk.includes('两套独立口径，互不推导'));
ok('summary 带骨重与分档', pk.includes('袁天罡称骨'));

const app = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
ok('面板只在八字且有时刻时嵌称骨', app.includes("if (k === 'bazi' && !huV) {") && app.includes('if (Engine.buildChenggu) {'));
// 分块加载下 chart 块不带 chenggu 子模块，buildChenggu 会解构成 undefined，
// 且 dn() 合并时 `!==void 0` 守卫会静默跳过——必须显式补载，否则面板不出卡、单页正常。
ok('缺 buildChenggu 时按需补载 chenggu 分块', /!Engine\.buildChenggu[\s\S]{0,160}await ensureEngine\('chenggu'\)/.test(app));
ok('称骨失败静默不影响主盘', app.includes('catch (e) { chenggu = null; }'));
ok('结果对象带 chenggu 字段', /setResult\(\{ kind: k, r, it, at: dt, timed, trend, caliber, shadowDiff, chenggu[,}]/.test(app));
ok('面板渲染传称骨', /PP\.baziHTML\(result\.r, \{ chenggu: result\.chenggu[,}]/.test(app));

const ui = fs.readFileSync(new URL('../src/web-ui.js', import.meta.url), 'utf8');
ok('单页同样只在八字且有时刻时嵌称骨', ui.includes("if (tab === 'bazi' && !hourUnknown && window.Engine.buildChenggu)"));
ok('单页 last 保留 chenggu', /last = \{ r, html, tab, date, time, timed, trend, caliber, shadowDiff, chenggu[,}]/.test(ui));
ok('单页渲染传称骨', /window\.__PP\.baziHTML\(r, \{ chenggu[,}]/.test(ui));
