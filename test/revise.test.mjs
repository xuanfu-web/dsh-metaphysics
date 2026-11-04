// C2 一句话改参：把明确的改参句式翻成参数补丁；识别不到就原样排，绝不猜。
// 约束：出生时间/经度这类需要精确值的字段不在这里改；回显要写清改了哪些、没认哪些。
import fs from 'node:fs';
import vm from 'node:vm';
import { compute, renderText } from '../engine/index.js';
import { decodeHandle } from '../engine/handle.js';
import { parseRevision } from '../engine/revise.js';
import { apply as hostApply } from '../index.js';
import { ok } from './_harness.mjs';

const BASE = { system: 'bazi', datetime: '1990-05-06T08:30', gender: 'male', address: '安徽池州' };

// ── ① 解析层：每条规则单独能用 ─────────────────────────────────
const p = (t) => parseRevision(t);
ok('换体系', p('换成紫微看').patch.system === 'ziwei');
ok('换体系带方向与年份', (() => {
  const r = p('换成紫微看 2030 年事业');
  return r.patch.system === 'ziwei' && r.patch.asOf === '2030-01-01T00:00' && r.patch.direction === 'career';
})());
ok('没有切换词不换体系', p('紫微里怎么说').patch.system === undefined, JSON.stringify(p('紫微里怎么说').patch));
ok('女命', p('换成女命').patch.gender === 'female');
ok('男命', p('这是男命').patch.gender === 'male');
ok('晚子时算次日', p('晚子时算次日').patch.lateZi === true);
ok('晚子时不换日', p('晚子时不换日').patch.lateZi === false);
ok('晚子时没说得罪不补', p('晚子时是什么').patch.lateZi === undefined);
ok('真太阳时关闭', p('不用真太阳时').patch.trueSolar === false);
ok('真太阳时打开', p('按真太阳时排').patch.trueSolar === true);
ok('夏令时关闭', p('关闭夏令时').patch.dst === false);
ok('出生在 X', p('出生在成都').patch.address === '成都');
ok('出生地改成 X', p('出生地改成乌鲁木齐').patch.address === '乌鲁木齐');
ok('看某年', p('看看 2028 年的运势').patch.asOf === '2028-01-01T00:00');
ok('出生年份不当作流年', p('改成 1993 年出生').patch.asOf === undefined && p('改成 1993 年出生').ignored.length === 1);
ok('方向：感情', p('重点看感情').patch.direction === 'love');
ok('方向：学业', p('看看考试').patch.direction === 'study');
ok('开解读', p('详细解读一下').patch.withInterpret === true);
ok('明确不要解读时不强开', p('不要解读').patch.withInterpret === undefined);
ok('空串无补丁', parseRevision('   ').patch && Object.keys(parseRevision('   ').patch).length === 0);
ok('识别不到的语句无补丁', Object.keys(p('随便说点什么').patch).length === 0);
ok('不改调用方文本', (() => { const t = '换成女命'; p(t); return t === '换成女命'; })());
ok('labels 与 patch 同步', (() => {
  const r = p('换成女命，晚子时算次日');
  return r.labels.length === 2 && r.labels.every((l) => l.key in r.patch);
})());

// ── ② 排盘层：改参真的落到盘上 ─────────────────────────────────
const base = compute(BASE);
const zw = compute({ ...BASE, revise: '换成紫微看 2030 年事业' });
ok('revise 换体系', zw.system === 'ziwei' && !!zw.palaces);
ok('revise 换年份', /^2030/.test(zw.flow.asOf.solar) && zw.flow.year.ganzhi === '乙酉', JSON.stringify(zw.flow.asOf));
ok('revise 换方向', zw.revision.applied.some((a) => a.key === 'direction' && a.value === 'career'));
ok('revise 回显文本', zw.revision.text === '换成紫微看 2030 年事业');
ok('revise 回显 from', zw.revision.applied.find((a) => a.key === 'system').from === 'bazi');
ok('revise 不写进盘面', !JSON.stringify(zw.palaces).includes('revise'));

const female = compute({ ...BASE, revise: '女命' });
ok('revise 改性别', female.input.gender === 'female');
ok('改性别后大运方向与原盘不同', JSON.stringify(female.dayun) !== JSON.stringify(base.dayun));
ok('改性别回显', female.revision.applied[0].label === '性别' && female.revision.applied[0].display === '女');

// 原值没有时回显「未设」，而不是编一个默认值出来
const baziYear = compute({ ...BASE, revise: '看 2028 年的事业' });
ok('改流年回显旧值为空', baziYear.revision.applied.find((a) => a.key === 'asOf').from === null);
ok('改流年后基准落在 2028', baziYear.asOf && baziYear.asOf.year === 2028, JSON.stringify(baziYear.asOf));
ok('旧值翻成中文再回显', baziYear.revision.applied.find((a) => a.key === 'asOf').fromDisplay === null);

const place = compute({ ...BASE, revise: '出生在成都' });
ok('revise 改出生地', place.input.address === '成都' && place.revision.applied.some((a) => a.key === 'address'));
ok('改出生地后经度变化', Math.abs(place.input.longitude - base.input.longitude) > 1, `${place.input.longitude} / ${base.input.longitude}`);
const solar = compute({ ...BASE, revise: '不用真太阳时' });
ok('revise 关真太阳时', solar.input.trueSolar === false);
ok('关真太阳时后时柱可能变化', solar.input.trueSolar === false && !!solar.pillars);

// 1990-05 在夏令时区间内，先关掉夏令时校正，才真正落在 23:30
const late = compute({ system: 'bazi', datetime: '1990-05-06T23:30', gender: 'male', dst: false, revise: '晚子时算次日' });
const sameDay = compute({ system: 'bazi', datetime: '1990-05-06T23:30', gender: 'male', dst: false, revise: '晚子时不换日' });
ok('晚子时算次日', late.input.lateZi === true && late.pillars.day.ganzhi !== sameDay.pillars.day.ganzhi,
  `${late.pillars.day.ganzhi} / ${sameDay.pillars.day.ganzhi}`);

// 紫微只认历史参数名 lateZishi；revise 写的是 lateZi。不归一就会出现
// 「回执说已应用、盘仍按 current-day」——农历日差一天，命宫/身宫整盘错位。
const zLate = compute({ system: 'ziwei', datetime: '1990-05-06T23:30', gender: 'male', dst: false, revise: '晚子时算次日' });
const zSame = compute({ system: 'ziwei', datetime: '1990-05-06T23:30', gender: 'male', dst: false, revise: '晚子时不换日' });
ok('紫微 revise 晚子时真正换日', zLate.input.schools.lateZishi === 'next-day' && zLate.lunar.day !== zSame.lunar.day,
  `${zLate.lunar.day} / ${zSame.lunar.day}`);
ok('紫微 revise 回执与盘面同源', zLate.revision.applied.some((a) => a.key === 'lateZi') && zLate.input.schools.lateZishi === 'next-day', JSON.stringify(zLate.revision.applied));
ok('紫微默认仍是当日', zSame.input.schools.lateZishi === 'current-day' && zSame.lunar.day === compute({ system: 'ziwei', datetime: '1990-05-06T23:30', gender: 'male', dst: false }).lunar.day);

const nothing = compute({ ...BASE, revise: '随便说点什么' });
ok('识别不到时盘面不变', JSON.stringify(nothing.pillars) === JSON.stringify(base.pillars));
ok('识别不到时 applied 为空', nothing.revision.applied.length === 0);
const withNote = compute({ ...BASE, revise: '改成 1993 年出生' });
ok('出生年份改动有明确提示', withNote.revision.ignored.length === 1 && /datetime/.test(withNote.revision.ignored[0]));
ok('提示时仍按原时间排盘', JSON.stringify(withNote.pillars) === JSON.stringify(base.pillars));

// ── ③ 与句柄配合：先排盘、下一句话改 ───────────────────────────
const first = compute(BASE);
ok('首轮有句柄', typeof first.handle === 'string');
const reviseWithHandle = compute({ handle: first.handle, revise: '换成紫微看事业' });
ok('句柄 + 一句话改参可排另一套盘', reviseWithHandle.system === 'ziwei');
ok('改参保留原出生信息', reviseWithHandle.input.year === 1990 && reviseWithHandle.input.longitude === first.input.longitude);
ok('改参后的句柄记的是改后参数', (() => {
  const h = decodeHandle(reviseWithHandle.handle);
  return h.system === 'ziwei' && !('revise' in h) && h.datetime === BASE.datetime;
})());
ok('同一张盘换个说法得到同一句柄', compute({ ...BASE, revise: '换成紫微看事业' }).handle === reviseWithHandle.handle);

// ── ④ 文本层与宿主工具 ─────────────────────────────────────────
const text = renderText(zw);
ok('文本摘要含改参回显', text.includes('【改参】') && text.includes('体系：八字 → 紫微'), text.slice(0, 120));
ok('改参不顶掉句柄行', text.includes('【排盘句柄】'));

let def = null;
hostApply({ tools: { register: (d) => { def = d; } }, effect: (fn) => fn() });
ok('工具 schema 暴露 revise', !!(def && def.parameters.properties.revise && def.parameters.properties.revise.type === 'string'));
ok('工具说明提到 revise', /revise/.test(def.description));
const hostFirst = await def.execute({ system: 'bazi', datetime: '1990-05-06T08:30', gender: 'male' });
const hostRev = await def.execute({ handle: hostFirst.handle, revise: '换成紫微看 2030 年事业' });
ok('宿主接受句柄 + revise', hostRev.system === 'ziwei' && /^2030/.test(hostRev.flow.asOf.solar));
ok('宿主回显 from 是原体系', hostRev.revision.applied.find((a) => a.key === 'system').from === 'bazi');
ok('宿主改参后仍带经度', hostRev.input.longitude === hostFirst.input.longitude);
const hostBad = await def.execute({ system: 'bazi', datetime: '1990-05-06T08:30', gender: 'male', revise: '随便说点什么' });
ok('宿主识别不到时不改盘', hostBad.revision.applied.length === 0 && !!hostBad.pillars);

// ── ⑤ 面板与独立页：改参卡与接线 ───────────────────────────────
const sandbox = { window: {}, console };
sandbox.window.window = sandbox.window;
vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
const PP = sandbox.window.__PP;
ok('面板导出 revisionHTML', typeof PP.revisionHTML === 'function');
const revCard = PP.revisionHTML(zw.revision);
ok('面板渲染改动内容', revCard.includes('换成紫微看 2030 年事业') && revCard.includes('八字') && revCard.includes('紫微'));
ok('面板逐条列出改动', (revCard.match(/<li>/g) || []).length === 3, revCard);
ok('面板标出流年旧值为未设', revCard.includes('（未设）'));
ok('面板没有改动时渲染空串', PP.revisionHTML(null) === '' && PP.revisionHTML({ applied: [], ignored: [], text: 'x' }) === '');
const revEmpty = PP.revisionHTML({ text: '随便说说', applied: [], ignored: [] });
ok('面板对识别不到的语句不显示', revEmpty === '');
const revNote = PP.revisionHTML({ text: '改成 1993 年出生', applied: [], ignored: ['出生年份没改：…'] });
ok('面板显示未处理项', revNote.includes('未处理') && revNote.includes('出生年份没改'));
const revEvil = PP.revisionHTML({ text: '"><img src=x onerror=alert(1)>', applied: [{ key: 'gender', label: '性别', display: '<b>女</b>', fromDisplay: null }], ignored: [] });
ok('改参回显转义', !revEvil.includes('<img src=x') && !revEvil.includes('<b>女</b>') && revEvil.includes('&lt;b&gt;女'));

const appSrc = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
const webSrc = fs.readFileSync(new URL('../src/web-ui.js', import.meta.url), 'utf8');
ok('面板渲染改参卡', /PP\.revisionHTML\(result\.r\.revision\)/.test(appSrc));
ok('独立页渲染改参卡', /__PP\.revisionHTML\(last\.r\.revision\)/.test(webSrc));
ok('改参卡与句柄卡的顺序（先改动后句柄）', appSrc.indexOf('PP.revisionHTML') < appSrc.indexOf('PP.handleHTML'));
