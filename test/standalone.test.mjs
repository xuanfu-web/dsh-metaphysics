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
ok('十九个 tab 齐全（八体系 + 十一速查）', tabs.join(',') === 'ziwei,bazi,liuyao,meihua,daliuren,qimen,hepan,tarot,almanac,convert,zeri,chenggu,xiaoliuren,star,numerology,trend,fengshui,name,mbti', tabs.join(','));
ok('标题栏写明八体系', /奇门 · 合盘/.test(html));
ok('速查块存在', html.includes('id="for-quick"'));
for (const id of ['ztask', 'zdays', 'zsheng', 'num1', 'toage', 'sitting', 'facing', 'surname', 'givenname']) {
  ok('速查字段 ' + id, new RegExp('id="' + id + '"').test(html));
}
ok('页面渲染有速查回退', ui.includes('quickHTML'));

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

// ── ⑥ 接线完整性：脚本里 el('…') 引用的 id 必须真的存在 ─────
{
  const ids = [...new Set([...ui.matchAll(/el\('([^']+)'\)/g)].map((m) => m[1]))];
  const have = new Set([...html.matchAll(/id="([^"]+)"/g)].map((m) => m[1]));
  const missing = ids.filter((id) => !have.has(id));
  ok('引用的 DOM id 全部存在', missing.length === 0, missing.join(',') || `共 ${ids.length} 个`);
}

// ── ⑦ 随包分发：这一份页面真的会被 npm 发出去，且不是过期产物 ──
{
  const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  const NAME = '命理排盘.html';
  ok('files 里带离线页', Array.isArray(pkg.files) && pkg.files.includes(NAME), (pkg.files || []).join(','));
  ok('exports 里能 resolve 离线页', !!(pkg.exports && pkg.exports['./' + NAME] === './' + NAME), JSON.stringify(pkg.exports && pkg.exports['./' + NAME]));
  // 仓库根那份必须与 page() 逐字相同：改了源码忘了重建，订阅者拿到的就是旧页面
  const disk = fs.readFileSync(new URL('../' + NAME, import.meta.url), 'utf8');
  ok('仓库根的离线页与构建结果一致', disk === html, `磁盘 ${disk.length} 字节 / 构建 ${html.length} 字节`);
  const src = fs.readFileSync(new URL('../tools/build-html.mjs', import.meta.url), 'utf8');
  ok('构建默认写进包根（不是仓库外）', /path\.resolve\(root, '命理排盘\.html'\)/.test(src) && !/path\.resolve\(root, '\.\.', '命理排盘\.html'\)/.test(src));
}
