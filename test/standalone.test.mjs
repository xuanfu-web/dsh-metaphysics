// 独立页（命理排盘.html）与宿主面板的能力对齐：八个 tab、合盘双方字段、奇门换局规则。
//
// 通过 tools/build-html.mjs 导出的 page() 直接取页面源码，避免依赖磁盘上那份可能过期的产物。
import fs from 'node:fs';
import { page } from '../tools/build-html.mjs';
import { ok } from './_harness.mjs';

const html = page();
const ui = fs.readFileSync(new URL('../src/web-ui.js', import.meta.url), 'utf8');

// ── ① 八个 tab ─────────────────────────────────────────────
const tabs = [...html.matchAll(/<button class="tab" data-tab="([a-z]+)"/g)].map((m) => m[1]);
ok('八个 tab 齐全', tabs.join(',') === 'ziwei,bazi,liuyao,meihua,daliuren,qimen,hepan,tarot', tabs.join(','));
ok('标题栏写明八体系', /奇门 · 合盘/.test(html));

// ── ② 合盘字段 ─────────────────────────────────────────────
ok('合盘块存在', html.includes('id="for-hepan"'));
for (const id of ['pdate', 'ptime', 'pgender', 'paddr']) {
  ok(`合盘字段 ${id}`, new RegExp(`id="${id}"`).test(html));
}
ok('合盘方式可切换八字/紫微', /id="hpchart"/.test(html) && /data-chart="bazi"/.test(html) && /data-chart="ziwei"/.test(html));

// ── ③ 奇门：换局规则语义化 ─────────────────────────────────
ok('奇门块存在', html.includes('id="for-qimen"'));
ok('规则用 fieldset + legend', /<fieldset class="qmrule">[\s\S]{0,120}<legend>换局规则<\/legend>/.test(html));
ok('规则组是 radiogroup', /role="radiogroup" aria-label="奇门换局规则"/.test(html));
const radios = [...html.matchAll(/name="qimen_rule" value="([a-z]+)"/g)].map((m) => m[1]);
ok('三个规则值齐全且同 name', radios.join(',') === 'chaibu,chaoshen,zhirun', radios.join(','));
ok('默认选中拆补', /value="chaibu" checked/.test(html));
ok('附 details 说明', /<details class="qmhelp">[\s\S]{0,60}<summary>三种规则有什么区别？<\/summary>/.test(html));
ok('奇门有询问方向（定用神）', /id="qdir"/.test(html) && /询问方向（定用神）/.test(html));

// ── ④ 接线（web-ui.js）────────────────────────────────────
ok('合盘按出生时间处理', /hepan: 'birth'/.test(ui));
ok('奇门按起局时刻处理', /qimen: 'cast'/.test(ui));
ok('合盘主方也带性别/地址', /tab === 'bazi' \|\| tab === 'ziwei' \|\| tab === 'hepan'/.test(ui));
ok('合盘透传 partner', /args\.partner = \{/.test(ui) && /chart === 'ziwei'/.test(ui));
ok('奇门透传 juMethod', /args\.juMethod = picked/.test(ui));
ok('奇门渲染盘面 + 事实', /qimenHTML\(r\) \+ window\.__PP\.qimenFactsHTML\(r\)/.test(ui));
ok('合盘渲染两套模板', /ziweiHepanHTML\(r\)/.test(ui) && /hepanHTML\(r\)/.test(ui));

// ── ⑤ 产物自全：不引外部脚本、core 已内联 ──────────────────
ok('没有外部脚本引用', !/<script[^>]+src=/.test(html));
ok('core 已内联', (html.match(/__MPCore/g) || []).length >= 3);
