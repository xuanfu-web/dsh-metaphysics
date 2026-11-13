// C3 对话桥替代：深链编解码 / 表单还原 / 三档复制包。
// 约束：深链只带「排盘参数 + 一句问题」，复用 C1 句柄（截断或改字必须报错，不能静默排成另一张盘）；
//      解析任何坏输入都不抛异常，交给调用方决定静默忽略还是提示。
import fs from 'node:fs';
import path from 'node:path';
import { compute, askLink, parseAskLink, formOf, restNote, askPackages, askPrompt } from '../engine/index.js';
import * as engine from '../engine/index.js';
import { ok, eq } from './_harness.mjs';

const root = path.resolve(import.meta.dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

const BASE = {
  system: 'bazi', datetime: '1990-05-12T14:30', gender: 'female',
  address: '安徽池州', trueSolar: true, lateZi: true,
};
const chart = compute(BASE);

// ── ① 深链：生成与形态 ──────────────────────────────────────────
const link = askLink(BASE, { question: '2027 年事业怎么样', base: 'https://example.com/mp.html' });
ok('深链非空', !!link, link);
ok('深链用 # 片段而不是查询串', link.includes('#mp=') && !link.includes('?mp='), link);
ok('深链带问题', link.includes('&q='), link);
ok('链接里不出现中文原文（已百分号编码）', !/[\u4e00-\u9fa5]/.test(link), link);
ok('链接以传入的 base 开头', link.startsWith('https://example.com/mp.html#mp='), link);
ok('句柄原样进链接（含点号与校验位）', link.includes(chart.handle), link);

const withHash = askLink(BASE, { base: 'https://example.com/mp.html#tab=bazi' });
ok('base 里原有的 hash 被替换，不会出现两个 #', (withHash.match(/#/g) || []).length === 1, withHash);
eq('没有可编码参数时给空串', askLink({ trace: true, withInterpret: true }), '');
eq('空参数给空串', askLink({}), '');

// 也接受现成句柄
const fromHandle = askLink({ handle: chart.handle }, { question: '换个年份', base: '' });
ok('可直接用句柄生成深链', fromHandle.startsWith('#mp=') && fromHandle.includes(chart.handle), fromHandle);

// ── ② 深链：解析往返 ────────────────────────────────────────────
const back = parseAskLink(link);
ok('完整链接可解析', back.ok === true, JSON.stringify(back).slice(0, 120));
eq('解析出的体系正确', back.system, 'bazi');
eq('解析出的问题正确', back.question, '2027 年事业怎么样');
eq('解析出的句柄一致', back.handle, chart.handle);
const canon = (o) => JSON.stringify(Object.keys(o).sort().map((k) => [k, o[k]]));
eq('参数往返一致', canon(back.args), canon(BASE));
ok('解析结果带中文体系名', back.label === '八字', back.label);

const fragOnly = parseAskLink(link.slice(link.indexOf('#')));
ok('只给片段也能解析', fragOnly.ok && fragOnly.question === '2027 年事业怎么样');
const queryOnly = parseAskLink(`https://example.com/p?mp=${chart.handle}&q=%E8%B4%A2%E8%BF%90`);
ok('查询串写法也能解析', queryOnly.ok && queryOnly.question === '财运', JSON.stringify(queryOnly).slice(0, 80));
const bare = parseAskLink(`mp=${chart.handle}`);
ok('裸的 mp= 也能解析', bare.ok === true);
ok('片段优先于查询串', parseAskLink(`https://x/y?mp=bad#mp=${chart.handle}`).ok === true);

// 解析出来的参数直接喂 compute，必须得到同一张盘
const replay = compute(back.args);
eq('深链还原后四柱一致', JSON.stringify(replay.pillars), JSON.stringify(chart.pillars));
eq('深链还原后句柄一致', replay.handle, chart.handle);

// ── ③ 坏链接：不抛异常，给出可读原因 ─────────────────────────────
const badCases = [
  ['空字符串', ''],
  ['没有 mp 的链接', 'https://example.com/mp.html'],
  ['只有问题没有盘', 'https://example.com/mp.html#q=hello'],
  ['句柄被改字', `#mp=${chart.handle.slice(0, -4)}aaaa`],
  ['句柄被截断', `#mp=${chart.handle.slice(0, 20)}`],
  ['乱写的 mp', '#mp=not-a-handle'],
];
for (const [name, text] of badCases) {
  let parsed = null;
  let threw = false;
  try { parsed = parseAskLink(text); } catch (e) { threw = true; }
  ok(`坏链接「${name}」不抛异常且有 code`, !threw && parsed && parsed.ok === false && !!parsed.code, threw ? 'threw' : JSON.stringify(parsed).slice(0, 80));
}
eq('截断句柄给 E_HANDLE', parseAskLink(`#mp=${chart.handle.slice(0, 20)}`).code, 'E_HANDLE');
ok('错误带可读提示', parseAskLink('#mp=not-a-handle').message.length > 8, parseAskLink('#mp=not-a-handle').message);

// ── ④ 表单还原 ──────────────────────────────────────────────────
const form = formOf(parseAskLink(link));
eq('还原出 tab', form.tab, 'bazi');
eq('还原出日期', form.date, '1990-05-12');
eq('还原出时刻', form.time, '14:30');
eq('还原出性别', form.gender, 'female');
eq('还原出出生地', form.address, '安徽池州');
eq('还原出真太阳时开关', form.trueSolar, true);
eq('还原出问题', form.question, '2027 年事业怎么样');
ok('restored 里记了这几项', ['system', 'datetime', 'gender', 'address', 'question'].every((k) => form.restored.includes(k)), form.restored.join(','));
eq('没有未还原项时 rest 为空', Object.keys(form.rest).length, 0);
eq('没有未还原项时提示为空串', restNote(form), '');

const hp = compute({
  system: 'hepan', datetime: '1990-05-12T14:30', gender: 'female', address: '安徽池州',
  partner: { datetime: '1992-08-15T10:00', gender: 'female' }, chart: 'bazi',
});
const hpFrag = parseAskLink(askLink(hp.handle ? { handle: hp.handle } : {
  system: 'hepan', datetime: '1990-05-12T14:30', gender: 'female',
  partner: { datetime: '1992-08-15T10:00', gender: 'female' }, chart: 'bazi',
}, { question: '合盘' }));
const hpForm = formOf(hpFrag);
ok('合盘的对方信息不假装填回表单', !!hpForm.rest.partner, JSON.stringify(Object.keys(hpForm.rest)));
ok('未还原项有提示文案', /partner/.test(restNote(hpForm)), restNote(hpForm));

const badForm = formOf({ ok: false });
eq('解析失败时 formOf 不抛，tab 为空', badForm.tab, '');
eq('解析失败时 formOf 不抛，date 为空', badForm.date, '');

// 日期格式：带空格、单位数月日也能认
const loose = formOf({ ok: true, args: { system: 'ziwei', datetime: '1996-1-9 7:31' }, question: '' });
eq('松散的日期被补齐', loose.date, '1996-01-09');
eq('松散的时刻被补齐', loose.time, '07:31');

// ── ⑤ 三档复制包 ────────────────────────────────────────────────
const full = compute(BASE);
const pkg = askPackages(full, { question: '2027 年事业怎么样', base: 'https://example.com/mp.html' });
eq('完整提问与 askPrompt 同源', pkg.full, askPrompt(full, { question: '2027 年事业怎么样' }).text);
ok('完整提问含回答骨架', /回答要求/.test(pkg.full), pkg.full.slice(0, 40));
ok('精简版带体系与句柄', pkg.brief.includes('八字') && pkg.brief.includes(full.handle), pkg.brief);
ok('精简版带问题', pkg.brief.includes('2027 年事业怎么样'), pkg.brief);
ok('精简版是一行', !pkg.brief.includes('\n'), 'has newline');
ok('精简版不超过 200 字', pkg.brief.length <= 200, String(pkg.brief.length));

let structured = null;
try { structured = JSON.parse(pkg.structured); } catch (e) { structured = null; }
ok('结构化参数是合法 JSON', !!structured, pkg.structured.slice(0, 60));
eq('结构化参数指明工具', structured && structured.tool, 'metaphysics');
eq('结构化参数的 args.handle 与盘一致', structured && structured.args.handle, full.handle);
eq('结构化参数的 args.question 一致', structured && structured.args.question, '2027 年事业怎么样');
eq('结构化参数的 args.system 一致', structured && structured.args.system, 'bazi');
ok('结构化参数能被 compute 直接吃下', JSON.stringify(compute(structured.args).pillars) === JSON.stringify(full.pillars));

const pkgLink = parseAskLink(pkg.link);
ok('复制包里的深链可解析', pkgLink.ok === true, pkg.link);
eq('复制包深链回到同一句柄', pkgLink.handle, full.handle);

// 没有句柄的盘：不编深链，但另外两档照给
const noHandle = { system: 'tarot', summary: '三张牌：愚者 / 星星 / 太阳', cards: [] };
const pkg2 = askPackages(noHandle, { question: '这件事的走向' });
eq('没有句柄时深链为空', pkg2.link, '');
ok('没有句柄时精简版仍可用', pkg2.brief.includes('塔罗') && pkg2.brief.includes('这件事的走向'), pkg2.brief);
ok('没有句柄时结构化参数去掉 handle 键', !('handle' in JSON.parse(pkg2.structured).args), pkg2.structured);
eq('空盘不抛异常', askPackages(null, {}).system, '');

// 问题过长时：链接截断，完整提问不截断问题
const longQ = '我想知道'.repeat(60);
const pkg3 = askPackages(full, { question: longQ });
ok('深链里的问题被截断到 200 字以内', parseAskLink(pkg3.link).question.length <= 200, String(parseAskLink(pkg3.link).question.length));
ok('完整提问保留原问题', pkg3.full.includes(longQ.slice(0, 20)), pkg3.full.slice(0, 30));

// ── ⑥ 只读、确定性 ──────────────────────────────────────────────
const snapshot = JSON.stringify(full);
askPackages(full, { question: '再算一次' });
eq('生成复制包不修改盘面对象', JSON.stringify(full), snapshot);
eq('同一张盘两次生成一致', askPackages(full, { question: 'q' }).full, askPackages(full, { question: 'q' }).full);
ok('导出入口齐全', ['askLink', 'parseAskLink', 'formOf', 'restNote', 'askPackages'].every((k) => typeof engine[k] === 'function'));

// ── ⑦ 接线：面板 / 独立页 / 打包 ────────────────────────────────
const app = read('src/app.js');
ok('面板解析深链', /parseAskLink/.test(app));
ok('面板生成复制包', /askPackages/.test(app));
ok('面板有深链还原函数', /const applyDeep = \(deep\)/.test(app));
ok('面板首次打开先看深链', /parseAskLink\(href\)/.test(app));
ok('面板有四个复制芯片', /data-bridge-copy/.test(app) && /BRIDGE_KINDS\.map/.test(app));
ok('面板芯片四档齐全', ['full', 'brief', 'structured', 'link'].every((k) => new RegExp(`\\['${k}',`).test(app)));
ok('面板写清桥不可用时的提示', /桥未就绪，改走这几档/.test(app));
ok('面板有对应样式', /\.mp-bridge\{/.test(app));

const web = read('src/web-ui.js');
ok('独立页读深链', /function readDeepLink/.test(web));
ok('独立页填表单', /function fillDeepForm/.test(web));
ok('独立页给还原提示', /function deepNote/.test(web));
ok('独立页启动时先还原', /const deep = readDeepLink\(\)/.test(web));
ok('独立页有复制深链按钮', /data-act="link"/.test(web));
ok('独立页有复制提问按钮', /data-act="copyask"/.test(web));
ok('独立页有存入卦例库与对错标记按钮',
  /data-act="case"/.test(web) && /data-act="hit"/.test(web) && /data-act="miss"/.test(web));
ok('独立页对错标记走本机卦例库（复用 casesAdd）',
  /function caseMark[\s\S]{0,400}casesAdd/.test(web));
ok('独立页不设显眼的邮件按钮（反馈入口只留面板底部）',
  !/data-act="mail"/.test(web) && !/mailFeedback/.test(web));
ok('独立页复制走同一份包', /window\.Engine\.askPackages/.test(web));

const build = read('tools/build-client.mjs');
ok('bridge 进了打包顺序', /'handle', 'bridge'[^]*?'index'\]/.test(build));
ok('bridge 进了每个分块的公共栈', /'nayin', 'sanhe', 'random', 'handle', 'bridge'/.test(build));

const idx = read('engine/index.js');
ok('引擎导出深链相关函数', /askLink, parseAskLink, formOf, restNote, askPackages/.test(idx));

// 拆分块里也能用（否则面板在分块模式下拿不到 parseAskLink）
// 命盘类四 tab 已合并成 chart 块，八字走的就是它
const chunkFile = path.join(root, 'client.chart.js');
if (fs.existsSync(chunkFile)) {
  const chunk = fs.readFileSync(chunkFile, 'utf8');
  ok('命盘分块里带着深链实现', /parseAskLink/.test(chunk) && /mc1\./.test(chunk));
} else {
  ok('命盘分块存在（先跑 build-client）', false, chunkFile);
}
