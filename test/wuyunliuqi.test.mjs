// 五运六气（P4-2）：规则对拍 + 接入 + 渲染
// 这套断言盯的是真有对错的地方：十干化运、大寒分年、主客气次序、天符岁会那几个格局。
// 文案好不好读不在这里钉，钉的是「数字与映射不许漂」。
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ok, eq } from './_harness.mjs';
import {
  ZHU_QI_ORDER, QI_ORDER, ZHU_YUN_ORDER, YUN_OF_STEM, SITIAN_INDEX_OF_BRANCH,
  YUN_DAYS, QI_DAYS, WUYUNLIUQI_SCOPE, buildWuyunliuqi,
} from '../engine/wuyunliuqi.js';
import { plainSummary } from '../engine/plain-summary.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const read = (p) => readFileSync(path.join(ROOT, p), 'utf8');
const APP = read('src/app.js');
const UI = read('src/web-ui.js');
const KIT = read('src/panel-kit.js');
const HTML = read('tools/build-html.mjs');
const BC = read('tools/build-client.mjs');
const GROUPS = read('src/groups.mjs');
const SUMMARY = read('engine/plain-summary.js');
const BRIDGE = read('engine/bridge.js');
const ENGINE = read('engine/index.js');
const ROOTJS = read('index.js');

const at = (y, m = 6, d = 1, h = 12) => buildWuyunliuqi({ year: y, month: m, day: d, hour: h, minute: 0 });

// ── 一、数据表：次序不许合并、十干化运不许错 ──────────────────────
eq('主气次序按五行相生', ZHU_QI_ORDER.join(','), '厥阴风木,少阴君火,少阳相火,太阴湿土,阳明燥金,太阳寒水');
eq('客气次序（少阴→太阴→少阳）', QI_ORDER.join(','), '厥阴风木,少阴君火,太阴湿土,少阳相火,阳明燥金,太阳寒水');
ok('主客次序不是同一张表', ZHU_QI_ORDER.join() !== QI_ORDER.join());
eq('主运五步', ZHU_YUN_ORDER.join(','), '木,火,土,金,水');
eq('十干化运', Object.entries(YUN_OF_STEM).map(([k, v]) => k + v).join(','),
  '甲土,己土,乙金,庚金,丙水,辛水,丁木,壬木,戊火,癸火');
eq('司天由年支定（子午少阴…巳亥厥阴）', SITIAN_INDEX_OF_BRANCH.join(','), '1,2,3,4,5,0');
ok('一运 73.05 日', Math.abs(YUN_DAYS - 73.05) < 0.01);
ok('一气 60.875 日', Math.abs(QI_DAYS - 60.875) < 0.01);

// ── 二、年干支与中运 ─────────────────────────────────────────
eq('2024 年干支', at(2024).year.ganzhi, '甲辰');
eq('2020 年干支', at(2020).year.ganzhi, '庚子');
eq('2023 年干支', at(2023).year.ganzhi, '癸卯');
ok('阳干为太过', at(2024).zhongyun.tai === true && at(2024).zhongyun.taiShao === '太宫');
ok('阴干为不及', at(2025).zhongyun.tai === false && at(2025).zhongyun.taiShao === '少商');
eq('2024 中运五行', at(2024).zhongyun.wuxing, '土');
eq('2025 中运五行', at(2025).zhongyun.wuxing, '金');
ok('中运文案不重复五音', !/（太宫宫）|（少商商）/.test(at(2024).zhongyun.text + at(2025).zhongyun.text));
ok('中运文案带脏腑', /脾/.test(at(2024).zhongyun.text));

// ── 三、司天在泉 ─────────────────────────────────────────────
const sit = (y) => `${at(y).sitian.qi}/${at(y).zaiquan.qi}`;
eq('2024 司天在泉', sit(2024), '太阳寒水/太阴湿土');
eq('2020 司天在泉', sit(2020), '少阴君火/阳明燥金');
eq('2021 司天在泉', sit(2021), '太阴湿土/太阳寒水');
eq('2022 司天在泉', sit(2022), '少阳相火/厥阴风木');
eq('2023 司天在泉', sit(2023), '阳明燥金/少阴君火');
eq('2025 司天在泉', sit(2025), '厥阴风木/少阳相火');
eq('2026 司天在泉', sit(2026), '少阴君火/阳明燥金');
ok('在泉恒为司天后三位', QI_ORDER.every((q, i) => {
  const za = QI_ORDER[(i + 3) % 6];
  return [2020, 2021, 2022, 2023, 2024, 2025, 2026].every((y) => {
    const r = at(y);
    return r.sitian.qi !== q || r.zaiquan.qi === za;
  });
}));

// ── 四、大寒分界 ─────────────────────────────────────────────
const before = at(2024, 1, 20, 6);
const after = at(2024, 1, 21, 6);
eq('大寒前仍算上一年', before.year.ganzhi, '癸卯');
eq('大寒后进当年', after.year.ganzhi, '甲辰');
ok('运气年起点是大寒', /01-20|01-21/.test(at(2024).year.startTime));
ok('运气年终点是次年大寒', at(2024).year.endTime.startsWith('2025-01-'));
ok('年界说明写明与立春不同', /立春/.test(at(2024).year.note));

// ── 五、五步与六步 ───────────────────────────────────────────
for (const y of [2020, 2024, 2025]) {
  const r = at(y);
  eq(`${y} 主运五步`, r.zhuYun.length, 5);
  eq(`${y} 客运五步`, r.keYun.length, 5);
  eq(`${y} 主气六步`, r.zhuQi.length, 6);
  eq(`${y} 客气六步`, r.keQi.length, 6);
}
const r24 = at(2024);
ok('初运即岁运', r24.keYun[0].name === r24.zhongyun.name && r24.keYun[0].taiShao === r24.zhongyun.taiShao);
ok('客运太少交替', r24.keYun.every((s, i) => (i === 0 ? s.tai === r24.zhongyun.tai : s.tai === !r24.keYun[i - 1].tai)));
ok('客气第三步是司天', r24.keQi[2].sitian === true && r24.keQi[2].qi === r24.sitian.qi);
ok('客气第六步是在泉', r24.keQi[5].zaiquan === true && r24.keQi[5].qi === r24.zaiquan.qi);
ok('主气第一步是厥阴风木', r24.zhuQi[0].qi === '厥阴风木');
ok('五步首尾相接', r24.keYun.every((s, i) => i === 0 || s.startTime === r24.keYun[i - 1].endTime));
ok('六步首尾相接', r24.keQi.every((s, i) => i === 0 || s.startTime === r24.keQi[i - 1].endTime));
ok('每步都带起止时刻', r24.keQi.every((s) => /^\d{4}-\d{2}-\d{2} /.test(s.startTime) && /^\d{4}-\d{2}-\d{2} /.test(s.endTime)));
ok('主运每步约 73 日', r24.zhuYun.every((s) => Math.abs(s.days - 73.05) < 0.2));
ok('主气每步约 60.9 日', r24.zhuQi.every((s) => Math.abs(s.days - 60.875) < 0.2));

// ── 六、天符岁会那一类 ───────────────────────────────────────
const sp = (y) => at(y).special;
ok('2005 乙酉 太乙天符', sp(2005).taiYi === true);
ok('2009 己丑 太乙天符', sp(2009).taiYi === true);
ok('1998 戊寅 天符', sp(1998).tianFu === true);
ok('1996 丙子 岁会', sp(1996).suiHui === true);
ok('2022 壬寅 同天符', sp(2022).tongTianFu === true);
ok('2021 辛丑 同岁会', sp(2021).tongSuiHui === true);
ok('2024 甲辰 岁会 + 同天符', sp(2024).suiHui === true && sp(2024).tongTianFu === true && sp(2024).taiYi === false);
ok('2026 丙午 无格局', !sp(2026).tianFu && !sp(2026).suiHui && !sp(2026).tongTianFu && !sp(2026).tongSuiHui && !sp(2026).taiYi);
ok('太乙天符必同时是天符与岁会', [2005, 2009].every((y) => { const s = sp(y); return s.taiYi && s.tianFu && s.suiHui; }));
ok('格局都有白话说明', sp(2005).notes.length >= 2 && sp(2005).notes.every((n) => n.length > 10));
ok('没格局时 notes 为空', sp(2026).notes.length === 0);

// ── 七、当前时刻落在哪一步 ───────────────────────────────────
const cur = r24.current;
eq('2024-06-01 是第 2 运', cur.yunNo, 2);
eq('2024-06-01 是第 3 气', cur.qiNo, 3);
ok('当前时刻文案带主客', /主运.*客运.*主气.*客气/.test(cur.text));
ok('客主加临只给五类之一', ['同气', '客生主（顺）', '主生客（泄）', '客克主（逆）', '主克客（从）'].includes(cur.lin));
ok('当前步与列表同源', cur.keQi.qi === r24.keQi[2].qi && cur.zhuYun.no === r24.zhuYun[1].no);

// ── 八、能力边界 ─────────────────────────────────────────────
ok('边界写了覆盖', WUYUNLIUQI_SCOPE.covered.length >= 5);
ok('边界写了未覆盖', WUYUNLIUQI_SCOPE.notCovered.length >= 3);
ok('边界说明不是诊断', /不是诊断/.test(WUYUNLIUQI_SCOPE.note));

// ── 九、顶部人话总结 ─────────────────────────────────────────
const brief = plainSummary(r24);
ok('brief 认得出五运六气', brief && brief.system === 'wuyunliuqi');
ok('brief 三条 chips', Array.isArray(brief.chips) && brief.chips.length === 3);
ok('brief 首条是年干支', /甲辰/.test(brief.chips[0]));
ok('brief 四段', brief.sections.length === 4);
ok('brief 三条建议', brief.advice.length === 3);
ok('brief 有格局时点出来', /岁会|同天符/.test(brief.caveat));
ok('brief 页脚写大寒界', /大寒/.test(brief.footer));

// ── 十、引擎接入 ─────────────────────────────────────────────
ok('index.js 引入引擎', /import \{ buildWuyunliuqi \} from '\.\/wuyunliuqi\.js';/.test(ENGINE));
ok('index.js 有分派分支', /if \(system === 'wuyunliuqi'\) \{/.test(ENGINE));
ok('分支用 parseDateTime', /buildWuyunliuqi\(\{[\s\S]{0,120}parseDateTime/.test(ENGINE.replace(/\n/g, '\n')) || /const dt = parseDateTime\(args\.datetime\);[\s\S]{0,200}buildWuyunliuqi/.test(ENGINE));
ok('有纯文本版', /function wuyunliuqiText\(r\)/.test(ENGINE));
ok('纯文本含六步', /【客运五步】/.test(ENGINE) && /【客气六步】/.test(ENGINE));
ok('对外导出', /export \{ buildWuyunliuqi \};/.test(ENGINE));
ok('错误清单提到这个体系', /wuyunliuqi（五运六气）/.test(ENGINE));
ok('bridge 有短标签', /wuyunliuqi: '运气',/.test(BRIDGE));
ok('plain-summary 有分派', /if \(r\.system === 'wuyunliuqi'\) return wuyunliuqiSummary\(r\);/.test(SUMMARY));
ok('plain-summary 有实现', /function wuyunliuqiSummary\(r\)/.test(SUMMARY));
ok('schema 枚举含它', /'constitution', 'wuyunliuqi', 'taiyi'/.test(ROOTJS));
ok('schema 参数含 datetime/shadow', /wuyunliuqi: \['datetime', 'shadow'\],/.test(ROOTJS));
ok('schema 必填说明', /wuyunliuqi: '无（省略则用今天/.test(ROOTJS));
ok('工具描述列了五运六气', /五运六气（wuyunliuqi/.test(ROOTJS));
ok('触发词含运气盘', /五运六气 \/ 运气盘/.test(ROOTJS));

// ── 十一、面板与独立页 ───────────────────────────────────────
ok('面板 TIME_KIND 用日期类', /wuyunliuqi: 'date',/.test(APP));
ok('面板有 tab 项', /k: 'wuyunliuqi', label: '运气'/.test(APP));
ok('tab 说明写明按大寒分年', /五运六气按大寒分年/.test(APP));
ok('结果卡按体系分派', /result\.kind === 'wuyunliuqi' \? PP\.wuyunliuqiHTML\(result\.r\)/.test(APP));
ok('面板有 mp-wl 样式', /\.mp-wl-step\{/.test(APP) && /\.mp-wl-tag\.on\{/.test(APP));
ok('独立页 TIME_KIND 同步', /wuyunliuqi: 'date',/.test(UI));
ok('独立页结果分派', /tab === 'wuyunliuqi' \? window\.__PP\.wuyunliuqiHTML\(r\)/.test(UI));
ok('独立页快捷入口含它', /'constitution', 'wuyunliuqi', 'taiyi'\]/.test(UI));
ok('分组卡片含它', /k: 'wuyunliuqi', label: '运气'/.test(GROUPS));
ok('离线页有 tab 按钮', /data-tab="wuyunliuqi">运气</.test(HTML));
ok('分块顺序在 index 之前', BC.indexOf("'wuyunliuqi'") > 0 && BC.indexOf("'wuyunliuqi'") < BC.indexOf("'plain-summary', 'index'"));
ok('分块表有它', /wuyunliuqi: \{ tabs: \['wuyunliuqi'\]/.test(BC));

// ── 十二、渲染层 ─────────────────────────────────────────────
ok('panel-kit 有渲染器', /pp\.wuyunliuqiHTML = function \(r\) \{/.test(KIT));
const body = (KIT.match(/pp\.wuyunliuqiHTML = function \(r\) \{[\s\S]*?\n  \};/) || [''])[0];
ok('渲染器取到源码', body.length > 800);
ok('渲染器带无障碍标签', /aria-label="五运六气"/.test(body));
ok('渲染器输出六步与五步', /rows\(r\.keQi, true\)/.test(body) && /rows\(r\.keYun, false\)/.test(body));
ok('渲染器给当前步高亮', /mp-wl-step\$\{on \? ' on' : ''\}/.test(body));
ok('渲染器标出司天在泉', /s\.sitian \? '司天'/.test(body));
ok('渲染器全部走 esc', !/innerHTML/.test(body) && (body.match(/esc\(/g) || []).length >= 10);
ok('渲染器带能力边界', /r\.scope \? r\.scope\.note/.test(body));
ok('渲染器不碰 window', !/\bwindow\b|localStorage|document\./.test(body));