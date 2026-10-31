// 口径差异引擎：结构化比对 + 根因归纳 + 文本渲染 + 口径对照上界面
import fs from 'node:fs';
import vm from 'node:vm';
import {
  diffObjects, summarize, renderDiff, labelOf, rootOf, categoryOf, CALIBER_SWITCHES,
} from '../engine/diff.js';
import { compute, caliberCompare, renderText } from '../engine/index.js';
import { ZIWEI_SCHOOL_DEFAULTS, ZIWEI_SCHOOL_OPTIONS } from '../engine/ziwei.js';
import { apply as hostApply } from '../index.js';
import { ok, eq } from './_harness.mjs';

// ── 纯函数：diffObjects ──
ok('相同对象无差异', diffObjects({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }).length === 0, '应为空');
const d1 = diffObjects({ pillars: { day: { ganzhi: '丙辰' } } }, { pillars: { day: { ganzhi: '乙卯' } } });
ok('嵌套路径正确', d1.length === 1 && d1[0].path === 'pillars.day.ganzhi', JSON.stringify(d1));
ok('新旧值正确', d1[0].from === '丙辰' && d1[0].to === '乙卯', JSON.stringify(d1[0]));
ok('忽略口径回显 input',
  diffObjects({ input: { lateZi: true } }, { input: { lateZi: false } }).length === 0, 'input 不应计入');
ok('忽略内部儒略日 jd',
  diffObjects({ jieqi: { jd: 19547 } }, { jieqi: { jd: 19569 } }).length === 0, 'jd 不应计入');
ok('数组按整体比较',
  diffObjects({ a: [1, 2] }, { a: [1, 3] }).length === 1, '数组变了应记 1 处');

// ── 标签与归类 ──
ok('日柱标签', labelOf('pillars.day.ganzhi') === '日柱', labelOf('pillars.day.ganzhi'));
ok('大运归类', categoryOf('dayun.list.3.luck.score') === '大运', categoryOf('dayun.list.3.luck.score'));
ok('根因识别：柱干支', rootOf('pillars.month.ganzhi') === '柱', String(rootOf('pillars.month.ganzhi')));
ok('非根因：十神', rootOf('pillars.day.stemTenGod') === '', String(rootOf('pillars.day.stemTenGod')));

// 0.50.4：紫微与奇门原先只落到原始路径（soul.ganzhi / siZhu.day），
// 界面上没法读；这里把「给人看的标签」与「根因判定」一起钉住
eq('奇门日柱标签', labelOf('siZhu.day'), '日柱');
eq('紫微命宫标签', labelOf('soul.ganzhi'), '命宫');
eq('紫微宫位标签', labelOf('palaces.0.ganzhi'), '宫位');
eq('奇门局数标签', labelOf('ju'), '局数');
eq('起运标签', labelOf('dayun.jiao.at'), '起运');
eq('命宫是根因', rootOf('soul.ganzhi'), '命宫');
eq('命宫地支是派生字段（不重复列根因）', rootOf('soul.branch'), '');
eq('起运是根因', rootOf('dayun.jiao.at'), '起运');
eq('奇门四柱是根因', rootOf('siZhu.day'), '柱');
eq('奇门四柱归类', categoryOf('siZhu.day'), '四柱');
eq('紫微命宫归类', categoryOf('soul.ganzhi'), '命身宫');
eq('飞星归类', categoryOf('fly.0.to'), '飞星');
// 口径回显字段不是盘面：换开关时它必然变，不能算成「差异」
eq('取局流派回显不计差异', diffObjects({ juMethod: 'chaibu' }, { juMethod: 'zhirun' }).length, 0);
eq('取局说明不计差异', diffObjects({ juMethodNote: 'a' }, { juMethodNote: 'b' }).length, 0);
eq('晚子时归日回显不计差异', diffObjects({ lateZiHourMode: 'same-day' }, { lateZiHourMode: 'next-day' }).length, 0);
eq('闰月政策回显不计差异', diffObjects({ lunar: { leapPolicy: 'split' } }, { lunar: { leapPolicy: 'next' } }).length, 0);
eq('局数本身仍计差异', diffObjects({ ju: '阳遁三局 (中元)' }, { ju: '阳遁三局 (下元)' }).length, 1);

// ── 归纳语 ──
ok('零差异的文案', summarize([]).includes('不受此口径影响'), summarize([]));
const ds = [
  { path: 'pillars.day.ganzhi', from: '丙辰', to: '乙卯' },
  { path: 'shensha.count', from: 17, to: 15 },
];
const s = summarize(ds);
ok('归纳含根因', s.includes('根因') && s.includes('日柱'), s);
ok('归纳含连带', s.includes('神煞') && s.includes('2 处'), s);
ok('渲染含标题', renderDiff(ds, { title: 'T' }).startsWith('【T】'), '标题应首行');

// ── 开关表：默认值与档位只有一份 ──
eq('三个体系有开关表', Object.keys(CALIBER_SWITCHES).sort().join(','), 'bazi,qimen,ziwei');
for (const sys of ['bazi', 'ziwei', 'qimen']) {
  const list = CALIBER_SWITCHES[sys];
  ok(`${sys} 至少两组开关`, list.length >= 2, String(list.length));
  eq(`${sys} 开关 key 不重复`, new Set(list.map((x) => x.key)).size, list.length);
  for (const sw of list) {
    const cur = sw.read({});
    ok(`${sys}.${sw.key} 有标题与短名`, !!sw.title && !!sw.short, JSON.stringify({ title: sw.title, short: sw.short }));
    ok(`${sys}.${sw.key} 的当前档与另一档不同`, cur !== sw.alt(cur), `${cur} -> ${sw.alt(cur)}`);
    ok(`${sys}.${sw.key} 有给读的档位名`, !!sw.label(cur) && !!sw.label(sw.alt(cur)), `${sw.label(cur)} / ${sw.label(sw.alt(cur))}`);
  }
}

// ── 集成：真实排盘 ──
// 23:40 出生 → 晚子时换日会改日柱，必须能检出
const A = compute({ system: 'bazi', datetime: '1996-01-19T23:40', gender: 'male', address: '安徽池州', lateZi: true });
const B = compute({ system: 'bazi', datetime: '1996-01-19T23:40', gender: 'male', address: '安徽池州', lateZi: false });
const diffs = diffObjects(A, B);
const dayChanged = diffs.some((d) => d.path === 'pillars.day.ganzhi');
ok('晚子时换日能检出日柱变化', dayChanged && diffs.length > 0, `共 ${diffs.length} 处`);
ok('口径差异不改变输入回显', !diffs.some((d) => d.path.startsWith('input.')), '不应出现 input.*');
ok('归纳可读', !summarize(diffs).includes('undefined'), summarize(diffs));

// 正午出生 → 晚子时开关不应有任何影响
const C = compute({ system: 'bazi', datetime: '1996-01-19T12:00', gender: 'male', address: '安徽池州', lateZi: true });
const D = compute({ system: 'bazi', datetime: '1996-01-19T12:00', gender: 'male', address: '安徽池州', lateZi: false });
ok('正午出生不受晚子时口径影响', diffObjects(C, D).length === 0, `${diffObjects(C, D).length} 处`);

// 真太阳时开关：有经度时应有可检出的变化（时柱或大运起运相关）
const E = compute({ system: 'bazi', datetime: '1996-01-19T06:05', gender: 'male', address: '新疆喀什', trueSolar: true });
const F = compute({ system: 'bazi', datetime: '1996-01-19T06:05', gender: 'male', address: '新疆喀什', trueSolar: false });
ok('真太阳时开关有可检出差异', diffObjects(E, F).length > 0, `${diffObjects(E, F).length} 处`);

// ── caliberCompare：当前档 → 另一档，根因与计数可独立复算 ──
const BZ_ARGS = { system: 'bazi', datetime: '1996-01-19T23:40', gender: 'male', address: '安徽池州', lateZi: true };
const bzCmp = caliberCompare(BZ_ARGS);
eq('八字两组开关', bzCmp.switches.length, 2);
const lateRow = bzCmp.switches.find((x) => x.key === 'lateZi');
eq('当前档反映入参', lateRow.current, true);
eq('当前档标签', lateRow.currentLabel, '换日');
eq('另一档标签', lateRow.altLabel, '不换日');
eq('变化数与独立比对一致', lateRow.total, diffs.length);
eq('总结与独立比对一致', lateRow.summary, summarize(diffs));
ok('根因含日柱', lateRow.roots.some((r) => r.path === 'pillars.day.ganzhi'), JSON.stringify(lateRow.roots));
const dayRoot = lateRow.roots.find((r) => r.path === 'pillars.day.ganzhi');
eq('日柱旧值来自当前盘', dayRoot.from, A.pillars.day.ganzhi);
eq('日柱新值来自另一档盘', dayRoot.to, B.pillars.day.ganzhi);
eq('分类计数相加等于总变化', lateRow.categories.reduce((n, c) => n + c.count, 0), lateRow.total);
ok('对照不含 input 回显', !lateRow.roots.some((r) => r.path.startsWith('input.')));

// 当前档不是默认值时，方向要跟着反过来（旧值 = 你当前这张盘）
const rev = caliberCompare({ ...BZ_ARGS, lateZi: false }).switches.find((x) => x.key === 'lateZi');
eq('反向：当前档为不换日', rev.current, false);
eq('反向：旧值是乙卯盘', rev.roots.find((r) => r.path === 'pillars.day.ganzhi').from, B.pillars.day.ganzhi);
eq('反向：新值是丙辰盘', rev.roots.find((r) => r.path === 'pillars.day.ganzhi').to, A.pillars.day.ganzhi);

// 正午：晚子时开关无变化，文案要如实说
const noon = caliberCompare({ ...BZ_ARGS, datetime: '1996-01-19T12:00' });
const noonLate = noon.switches.find((x) => x.key === 'lateZi');
eq('正午晚子时无变化', noonLate.total, 0);
ok('无变化文案', noonLate.summary.includes('不受此口径影响'), noonLate.summary);

// 真太阳时：06:05 喀什会改时柱
const ts = caliberCompare({ system: 'bazi', datetime: '1996-01-19T06:05', gender: 'male', address: '新疆喀什', trueSolar: true })
  .switches.find((x) => x.key === 'trueSolar');
ok('真太阳时根因含时柱', ts.total > 0 && ts.roots.some((r) => r.path === 'pillars.hour.ganzhi'), JSON.stringify(ts.roots));
// 23:40 池州则只改起运时刻，不改柱：根因要落到「起运」，不能落成「大运评分」
const ts2 = caliberCompare(BZ_ARGS).switches.find((x) => x.key === 'trueSolar');
ok('真太阳时可只改起运', ts2.total > 0 && ts2.roots.some((r) => r.path === 'dayun.jiao.at'), ts2.summary);
eq('起运根因标签', ts2.roots.find((r) => r.path === 'dayun.jiao.at').label, '起运');

// 紫微：闰月口径改命宫与身宫，根因只列一次命宫
const ZW_ARGS = { system: 'ziwei', datetime: '2020-05-25T10:00', gender: 'male' };
const zw = caliberCompare(ZW_ARGS).switches.find((x) => x.key === 'leapMonth');
ok('闰月口径改命宫', zw.total > 0, `${zw.total} 处`);
eq('命宫根因只有一条', zw.roots.filter((r) => r.label === '命宫').length, 1);
const soulRoot = zw.roots.find((r) => r.path === 'soul.ganzhi');
eq('命宫旧值', soulRoot.from, compute({ ...ZW_ARGS, leapMonth: 'split' }).soul.ganzhi);
eq('命宫新值', soulRoot.to, compute({ ...ZW_ARGS, leapMonth: 'next' }).soul.ganzhi);
ok('身宫也在根因里', zw.roots.some((r) => r.path === 'body.branch' && r.label === '身宫'), JSON.stringify(zw.roots));
const zwNon = caliberCompare({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'female' })
  .switches.find((x) => x.key === 'leapMonth');
eq('非闰月盘闰月开关无变化', zwNon.total, 0);

// 紫微十类流派开关：默认档与另一档都取自引擎枚举，且每一项真的能改盘
const ZW_SWITCHES = CALIBER_SWITCHES.ziwei;
eq('紫微 12 组口径（2 基础 + 10 流派）', ZW_SWITCHES.length, 12);
const zwKeys = ZW_SWITCHES.map((x) => x.key);
for (const key of Object.keys(ZIWEI_SCHOOL_OPTIONS)) {
  ok(`口径表含 ${key}`, zwKeys.includes(key), zwKeys.join(','));
  const sw = ZW_SWITCHES.find((x) => x.key === key);
  const cur = sw.read({});
  eq(`${key} 默认读引擎默认`, cur, ZIWEI_SCHOOL_DEFAULTS[key]);
  ok(`${key} 另一档在枚举内`, ZIWEI_SCHOOL_OPTIONS[key].includes(sw.alt(cur)), `${cur} -> ${sw.alt(cur)}`);
}
eq('非法流派值回默认', ZW_SWITCHES.find((x) => x.key === 'brightnessSchool').read({ brightnessSchool: 'nope' }), 'default');
eq('嵌套 schools 也能读到当前档', ZW_SWITCHES.find((x) => x.key === 'kuiyueSchool').read({ schools: { kuiyueSchool: 'qs2' } }), 'qs2');
eq('平铺优先于嵌套', ZW_SWITCHES.find((x) => x.key === 'kuiyueSchool').read({ kuiyueSchool: 'qs1', schools: { kuiyueSchool: 'qs2' } }), 'qs1');
eq('流派回显不计盘面差异', diffObjects({ schools: { a: 'x' }, rules: { schools: 'a' } }, { schools: { a: 'y' }, rules: { schools: 'b' } }).length, 0);

const zwBase = caliberCompare({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male' });
eq('紫微对照 12 组', zwBase.switches.length, 12);
const zwBaseRow = (key) => zwBase.switches.find((x) => x.key === key);
for (const key of ['brightnessSchool', 'gengYearSihua', 'tianmaSchool', 'tiankongSchool', 'jiekongSchool', 'kuiyueSchool']) {
  ok(`${key} 能检出盘面变化`, zwBaseRow(key).total > 0, `${zwBaseRow(key).currentLabel} → ${zwBaseRow(key).altLabel}：${zwBaseRow(key).total} 处`);
}
ok('流派回显不进根因', !zwBaseRow('kuiyueSchool').roots.some((r) => r.path.startsWith('schools') || r.path.startsWith('rules.schools')),
  JSON.stringify(zwBaseRow('kuiyueSchool').roots.slice(0, 3)));
ok('流派回显不进总结', !zwBaseRow('kuiyueSchool').summary.includes('schools'), zwBaseRow('kuiyueSchool').summary);

const zwTianshi = caliberCompare({ system: 'ziwei', datetime: '1991-05-12T10:00', gender: 'male' })
  .switches.find((x) => x.key === 'tianshiTianshang');
ok('天伤天使中州派能检出变化', zwTianshi.total > 0, `${zwTianshi.total} 处`);
const zwChang = caliberCompare({ system: 'ziwei', datetime: '1990-02-25T10:00', gender: 'male' })
  .switches.find((x) => x.key === 'changshengSchool');
ok('火土派土五局能检出变化', zwChang.total > 0, `${zwChang.total} 处`);
const zwLate = caliberCompare({ system: 'ziwei', datetime: '1990-05-12T23:30', gender: 'male', dst: false })
  .switches.find((x) => x.key === 'lateZishi');
ok('紫微晚子时能检出变化', zwLate.total > 0, `${zwLate.total} 处`);
const zwShenZi = caliberCompare({ system: 'ziwei', datetime: '1996-06-15T10:00', gender: 'male' })
  .switches.find((x) => x.key === 'shenzhuSchool');
ok('子年身主两派能检出变化', zwShenZi.total > 0, `${zwShenZi.total} 处`);
eq('午年身主两派同为火星、无差异', zwBaseRow('shenzhuSchool').total, 0);
const zwNested = caliberCompare({
  system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male', schools: { kuiyueSchool: 'qs2' },
}).switches.find((x) => x.key === 'kuiyueSchool');
eq('嵌套档位反向对照回默认', [zwNested.current, zwNested.alt], ['qs2', 'qs1']);

// 奇门：置闰与拆补可差三元；晚子时改日柱
const QM_ARGS = { system: 'qimen', datetime: '2026-06-09T10:40' };
const qm = caliberCompare(QM_ARGS).switches.find((x) => x.key === 'juMethod');
ok('置闰与拆补可差三元', qm.total > 0, `${qm.total} 处`);
const juRoot = qm.roots.find((r) => r.path === 'ju');
ok('局数根因带旧值新值', !!juRoot && juRoot.from !== juRoot.to, JSON.stringify(juRoot));
ok('取局回显不进根因', !qm.roots.some((r) => r.path === 'juMethod'));
ok('取局回显不进总结', !qm.summary.includes('juMethod'), qm.summary);
const qlate = caliberCompare({ system: 'qimen', datetime: '1996-01-19T23:40' })
  .switches.find((x) => x.key === 'lateZiHourMode');
eq('奇门晚子时改日柱', qlate.total, 1);
eq('奇门日柱标签', qlate.roots[0].label, '日柱');
eq('奇门日柱旧值', qlate.roots[0].from, compute({ system: 'qimen', datetime: '1996-01-19T23:40', lateZiHourMode: 'same-day' }).siZhu.day);
eq('奇门日柱新值', qlate.roots[0].to, compute({ system: 'qimen', datetime: '1996-01-19T23:40', lateZiHourMode: 'next-day' }).siZhu.day);

// 没有开关表的体系：明确返回空，不硬凑
eq('六爻没有口径开关', caliberCompare({ system: 'liuyao', datetime: '2020-01-01T00:00' }).switches.length, 0);
eq('无开关时 affected=0', caliberCompare({ system: 'liuyao' }).affected, 0);

// 解析/交叉参数不参与对照；调用参数不被修改；两次结果一致
const withExtras = caliberCompare({ ...BZ_ARGS, cross: true, verifyPast: 6, withInterpret: true, question: 'x', direction: 'career' });
eq('解析/交叉参数不参与对照', withExtras.switches[0].total, bzCmp.switches[0].total);
const withDerived = caliberCompare({ ...BZ_ARGS, shadow: true, trace: true });
eq('影子盘/推导链不参与对照', JSON.stringify(withDerived), JSON.stringify(bzCmp));
eq('紫微影子盘/推导链不参与对照', JSON.stringify(caliberCompare({
  system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male', shadow: true, trace: true,
})), JSON.stringify(zwBase));
const frozen = { ...BZ_ARGS };
caliberCompare(frozen);
ok('不修改调用参数', frozen.lateZi === true && !('caliber' in frozen), JSON.stringify(frozen));
eq('两次结果逐字一致', JSON.stringify(caliberCompare(BZ_ARGS)), JSON.stringify(bzCmp));

// ── 文本渲染：只在显式要求时附带 ──
const withCal = { ...compute(BZ_ARGS), caliber: bzCmp };
const txt = renderText(withCal);
ok('文本含口径对照标题', txt.includes('【口径对照】'));
ok('文本含当前档与另一档', txt.includes('换日 → 不换日'), txt.slice(-400));
ok('文本含根因日柱', txt.includes('日柱') && txt.includes('丙辰') && txt.includes('乙卯'));
ok('文本无 undefined', !txt.includes('undefined'));
ok('未要求时不出现口径对照', !renderText(compute(BZ_ARGS)).includes('【口径对照】'));

// ── 渲染层：口径对照卡（panel-kit 在 vm 里直接跑）──
const KIT = fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8');
const box = { window: {}, console };
vm.runInNewContext(KIT, box, { filename: 'panel-kit.js' });
const PP = box.window.__PP;
eq('无数据不渲染', PP.caliberHTML(null), '');
eq('空开关不渲染', PP.caliberHTML({ switches: [] }), '');
const html = PP.caliberHTML(bzCmp);
ok('渲染 details 容器', /^<details class="mp-cdiff"/.test(html.trim()), html.slice(0, 60));
ok('summary 先给一句话总结', html.includes('组开关中') && html.includes('影响此盘'), html.slice(0, 300));
eq('两组开关两行', (html.match(/class="mp-cdiff-row"/g) || []).length, 2);
const zwHtml = PP.caliberHTML(zwBase);
eq('紫微口径卡 12 行', (zwHtml.match(/class="mp-cdiff-row"/g) || []).length, 12);
ok('紫微口径卡列全九派', ['亮度表', '庚干四化', '天马', '天空', '截空旬空', '魁钺', '天伤天使', '长生', '晚子时']
  .every((t) => zwHtml.includes(t)), zwHtml.slice(0, 400));
ok('根因旧值→新值', html.includes('丙辰') && html.includes('乙卯') && html.includes('mp-cdiff-to'));
ok('当前档与另一档并排', html.includes('当前 · 换日') && html.includes('换成 · 不换日'));
ok('分类计数', /神煞 \d+ 处/.test(html), html.match(/神煞 \d+ 处/));
ok('口径说明不判优劣', html.includes('不判哪套口径更准'));
ok('无内联事件', !/on(click|load|error)=/.test(html));
const noonHtml = PP.caliberHTML(noon);
ok('无变化行', noonHtml.includes('无变化 · 此盘不受这一开关影响'), noonHtml.slice(0, 300));
const rootless = PP.caliberHTML({
  switches: [{ key: 'x', title: 'X', short: 'X', currentLabel: 'A', altLabel: 'B', total: 3, roots: [], categories: [{ name: '大运', count: 3 }], error: '' }],
});
ok('无根因时如实说', rootless.includes('无单一根因'), rootless);
const manyCats = PP.caliberHTML({
  switches: [{
    key: 'x', title: 'X', short: 'X', currentLabel: 'A', altLabel: 'B', total: 8, roots: [],
    categories: Array.from({ length: 8 }, (_, i) => ({ name: `类${i}`, count: 1 })), error: '',
  }],
});
ok('分类超过 6 类折成「另 N 类」', manyCats.includes('另 2 类'), manyCats);
const errHtml = PP.caliberHTML({
  switches: [{ key: 'x', title: 'X', short: 'X', currentLabel: 'A', altLabel: 'B', total: 0, roots: [], categories: [], error: '算不出来' }],
});
ok('错误如实显示', errHtml.includes('未能对照') && errHtml.includes('算不出来'), errHtml);
const xss = PP.caliberHTML({
  switches: [{
    key: 'x', title: '<script>alert(1)</script>', short: 'x', currentLabel: '<b>', altLabel: '"',
    total: 1, roots: [{ label: '<i>', from: '<', to: '>' }], categories: [], error: '',
  }],
});
ok('标题与档位名转义', !xss.includes('<script>') && xss.includes('&lt;script&gt;'), xss.slice(0, 200));
ok('根因值转义', !xss.includes('<i>') && xss.includes('&lt;') && xss.includes('&gt;'), xss.slice(0, 400));

// ── 接线：面板 / 独立页 / 客户端打包 / 宿主工具 ──
const APP = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
const UI = fs.readFileSync(new URL('../src/web-ui.js', import.meta.url), 'utf8');
const BUILD = fs.readFileSync(new URL('../tools/build-client.mjs', import.meta.url), 'utf8');
ok('面板调 Engine.caliberCompare', APP.includes('Engine.caliberCompare'));
ok('面板渲染 caliberHTML', APP.includes('PP.caliberHTML(result.caliber)'));
ok('独立页调 caliberCompare', UI.includes('window.Engine.caliberCompare'));
ok('独立页渲染 caliberHTML', UI.includes('window.__PP.caliberHTML(last.caliber)'));
ok('客户端打包 diff 模块', BUILD.includes("'fail', 'diff', 'fingerprint', 'validate'"), BUILD.slice(0, 160));

let def = null;
hostApply({ tools: { register: (d) => { def = d; } }, effect: (fn) => fn() });
ok('工具 schema 暴露 diff', !!(def && def.parameters.properties.diff && def.parameters.properties.diff.type === 'boolean'));
const plain = await def.execute({ ...BZ_ARGS });
ok('默认不附口径对照', !plain.caliber);
const withDiff = await def.execute({ ...BZ_ARGS, diff: true });
ok('diff:true 附带口径对照', !!(withDiff.caliber && withDiff.caliber.switches.length === 2), JSON.stringify(withDiff.caliber && withDiff.caliber.switches.map((x) => x.key)));
ok('工具文本带口径对照', renderText(withDiff).includes('【口径对照】'));
