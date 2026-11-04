// 奇门回归：以参照实现（qimendunjia-standalone 0.1.0，MIT）的实跑输出为验收基准。
// 历法层已换成本插件自己的 calendar/lunar，故只需核对排盘结果是否一致。
import { compute } from '../engine/index.js';
import { buildQimen } from '../engine/qimen.js';
import { interpretQimen } from '../engine/qimen-interpret.js';
import { resolveSubject } from '../engine/qimen-prompt.js';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
let pass = 0;
let fail = 0;
const ok = (n, c, d = '') => { if (c) { pass++; console.log(`PASS  ${n}${d ? '  -> ' + d : ''}`); } else { fail++; console.log(`FAIL  ${n}${d ? '  -> ' + d : ''}`); } };

const run = (dt, opt = {}) => {
  const m = dt.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  return compute({ system: 'qimen', datetime: dt, ...opt });
};

// ① 参照实跑用例：2026-06-22T03:00:15+08:00
const r1 = run('2026-06-22T03:00:15');
ok('参照用例四柱', `${r1.siZhu.year} ${r1.siZhu.month} ${r1.siZhu.day} ${r1.siZhu.time}` === '丙午 甲午 丁卯 壬寅',
  `${r1.siZhu.year} ${r1.siZhu.month} ${r1.siZhu.day} ${r1.siZhu.time}`);
ok('参照用例局数', r1.ju === '阴遁九局 (上元)', r1.ju);
ok('参照用例值符', r1.zhiFu.star === '天心', r1.zhiFu.star);
ok('参照用例值使', r1.zhiShi.gate === '开门', r1.zhiShi.gate);

// ② 晚子时两种口径（参照 README：same-day 日柱辛丑、next-day 日柱壬寅，时柱均庚子）
const sameDay = run('2026-05-27T23:30', { lateZiHourMode: 'same-day' });
const nextDay = run('2026-05-27T23:30', { lateZiHourMode: 'next-day' });
ok('晚子时 same-day 日柱辛丑', sameDay.siZhu.day === '辛丑' && sameDay.siZhu.time === '庚子',
  `${sameDay.siZhu.day} ${sameDay.siZhu.time}`);
ok('晚子时 next-day 日柱壬寅', nextDay.siZhu.day === '壬寅' && nextDay.siZhu.time === '庚子',
  `${nextDay.siZhu.day} ${nextDay.siZhu.time}`);

// ③ 排盘结构不变量
const r3 = run('2024-06-21T10:30');
ok('九宫齐备且每宫有地盘干', r3.palaces.length === 8 && r3.palaces.every((p) => p.diPan),
  r3.palaces.map((p) => p.palace + p.diPan).join(' '));
ok('八门八星八神各一', new Set(r3.palaces.map((p) => p.star)).size === 8
  && new Set(r3.palaces.map((p) => p.gate)).size === 8
  && new Set(r3.palaces.map((p) => p.god)).size === 8);
ok('值符值使落在九宫内', r3.palaces.some((p) => p.star === r3.zhiFu.star) && r3.palaces.some((p) => p.gate === r3.zhiShi.gate));
ok('阳遁/阴遁与节气一致', (r3.jieqi === '夏至' ? r3.dun === '阴遁' : true), `${r3.jieqi} ${r3.dun}`);

// ④ 与本插件八字引擎的四柱一致（同一历法底座，不能自相矛盾）
const bz = compute({ system: 'bazi', datetime: '1996-01-19T07:40', gender: 'male', trueSolar: false });
const qm = run('1996-01-19T07:40');
ok('四柱与八字引擎一致', qm.siZhu.day === bz.pillars.day.ganzhi && qm.siZhu.month === bz.pillars.month.ganzhi,
  `奇门 ${qm.siZhu.month}/${qm.siZhu.day}　八字 ${bz.pillars.month.ganzhi}/${bz.pillars.day.ganzhi}`);

// ⑤ 面板渲染
const code = fs.readFileSync(path.join(root, 'client.js'), 'utf8');
let mod = null;
const sb = { window: { __ModuleLoader__: { load: (m) => { mod = m; }, localStorage: { getItem: () => null, setItem() {} } } }, console, setTimeout,
  document: { createElement: () => ({ style: {}, setAttribute() {}, appendChild() {}, remove() {} }), head: { appendChild() {} } } };
vm.runInNewContext(code, sb, { filename: 'client.js' });
if (mod) mod.factory((n) => (n === 'react' ? { createElement: () => null, useState: (v) => [typeof v === 'function' ? v() : v, () => {}], useEffect() {}, useRef: (v) => ({ current: v }) } : {}));
const PP = sb.window.__PP;
const html = PP.qimenHTML(r1);
ok('面板渲染九宫与四柱', html.includes('九宫') || html.includes('宫') ? html.includes('值符') && html.includes('值使') : false, `${html.length} 字节`);


// ⑥ 流派参数：三种取局口径都能出盘，且拆补结果与参照一致
for (const m of ['chaibu', 'chaoshen', 'zhirun']) {
  const rr = run('2026-06-22T03:00:15', { juMethod: m });
  ok(`取局流派 ${m} 可出盘`, Boolean(rr.ju) && Boolean(rr.juMethodNote), `${rr.ju}｜${rr.juMethodNote}`);
}
const cb = run('2026-06-22T03:00:15', { juMethod: 'chaibu' });
ok('拆补法与参照实现一致', cb.ju === '阴遁九局 (上元)' && cb.zhiFu.star === '天心' && cb.zhiShi.gate === '开门', cb.ju);

// ⑦ 奇门解读
const ri = compute({ system: 'qimen', datetime: '2026-06-22T03:00:15', withInterpret: true, direction: 'career', question: '项目能否成' });
const it = ri.interpret;
ok('解读分段齐备', Array.isArray(it.sections) && it.sections.length >= 7, it.sections.map((s) => s.key).join(','));
ok('解读含值符落宫与用神', it.sections.some((s) => s.key === 'zhifu') && it.sections.some((s) => s.key === 'yongshen'));
ok('用神随询问方向切换', (() => {
  const love = compute({ system: 'qimen', datetime: '2026-06-22T03:00:15', withInterpret: true, direction: 'love' });
  const w = it.sections.find((s) => s.key === 'yongshen').label;
  const l = love.interpret.sections.find((s) => s.key === 'yongshen').label;
  return w !== l;
})(), '事业 vs 感情 用神不同');
ok('解读带免责声明', /传统术数|不是.*判决/.test(it.disclaimer + it.sections.map((s) => s.text).join('')));

// ⑦.5 用神定位：天芮在中宫寄坤时盘面写作「禽芮」，表里按通行名写，必须折叠别名；
// 驿马不在 palaces[].star 上，走 r.ma.gong。两处原先一个永远落空、一个从不解析。
const hq = compute({ system: 'qimen', datetime: '2024-01-01T00:00', withInterpret: true, direction: 'health' });
const hRow = hq.interpret.sections.find((s) => s.key === 'yongshen').text;
ok('健康主用神天芮能定位到禽芮那宫', hq.palaces.some((p) => p.star === '禽芮')
  && hRow.includes('天芮 →'), hRow);
ok('天芮定位与盘面同一宫', (() => {
  const p = hq.palaces.find((x) => x.star === '禽芮');
  return hRow.includes(`天芮 → ${p.palace}宫`);
})());
const tq = compute({ system: 'qimen', datetime: '2024-01-01T00:00', withInterpret: true, direction: 'travel' });
const tRow = tq.interpret.sections.find((s) => s.key === 'yongshen').text;
ok('出行次级用神驿马按 ma.gong 解析', !!tq.ma.gong && tRow.includes(`驿马 → ${tq.ma.gong}宫`), tRow);

// ⑦.6 甲日/甲时：甲不上天盘，改按旬首六仪代查并在文案里标明寄仪；不能定位不到还装作没事
const jia = buildQimen({ year: 2024, month: 3, day: 1, hour: 10, minute: 0 });
ok('样本确为甲日', jia.siZhu.day.startsWith('甲'), jia.siZhu.day);
const sub = resolveSubject(jia, { how: 'dayStem' });
ok('甲日按旬首六仪定位到宫', !!sub.palace, sub.symbol);
ok('甲日文案标明寄仪', /甲（寄./.test(sub.symbol), sub.symbol);
ok('定位成功时不报缺失', sub.missing === '', sub.missing);

// ⑦.7 置闰：超九日落在芒种窗口时，局数必须跟着置闰后的「下元」走，而不是未覆盖位的旧局
const zhiRun = buildQimen({ year: 2024, month: 12, day: 11, hour: 0, minute: 0, juMethod: 'zhirun' });
const chaiBu = buildQimen({ year: 2024, month: 12, day: 11, hour: 0, minute: 0, juMethod: 'chaibu' });
ok('置闰样本走的是置闰分支', /置闰下元/.test(zhiRun.juMethodNote), zhiRun.juMethodNote);
ok('置闰后局数为大雪下元一局', zhiRun.ju === '阴遁一局 (下元)', zhiRun.ju);
ok('置闰与拆补在此时取局不同', zhiRun.ju !== chaiBu.ju, `${zhiRun.ju} / ${chaiBu.ju}`);

// ⑧ 换局事件枚举出来的「分裂样本」（由 tools/qimen-divergence.mjs 生成，非手挑）
// 每条都锁定两种口径的具体输出，任一套改坏都会立刻报错。
const SPLITS = [
  { date: '2024-01-06', time: '03:30', chaibu: { term: '冬至', ju: '阳遁七局' }, other: { name: 'zhirun', term: '小寒', ju: '阳遁八局' } },
  { date: '2024-01-20', time: '23:30', chaibu: { term: '大寒', ju: '阳遁三局' }, other: { name: 'chaoshen', term: '小寒', ju: '阳遁二局' } },
  { date: '2024-02-04', time: '21:30', chaibu: { term: '立春', ju: '阳遁八局' }, other: { name: 'chaoshen', term: '大寒', ju: '阳遁三局' } },
];
for (const s of SPLITS) {
  const a = run(`${s.date}T${s.time}`, { juMethod: 'chaibu' });
  const b = run(`${s.date}T${s.time}`, { juMethod: s.other.name });
  const okA = a.jieqi === s.chaibu.term && a.ju.startsWith(s.chaibu.ju);
  const okB = b.jieqi === s.other.term && b.ju.startsWith(s.other.ju);
  ok(`分裂样本 ${s.date} ${s.time} 两口径锁定`, okA && okB,
    `拆补 ${a.ju}/${a.jieqi}　${s.other.name} ${b.ju}/${b.jieqi}`);
}

// ⑨ 置闰窗口约束：置闰只允许落在「芒种后～夏至前」「大雪后～冬至前」
const zr = run('2024-01-06T03:30', { juMethod: 'zhirun' });
ok('超九日但非芒种/大雪窗口不置闰', /不在芒种\/大雪窗口/.test(zr.juMethodNote), zr.juMethodNote);

// ⑩ 二至分界：夏至后取阴遁、冬至后取阳遁
const beforeXz = run('2024-06-20T12:00');
const afterXz = run('2024-06-22T12:00');
ok('夏至前后阴阳遁切换', beforeXz.dun === '阳遁' && afterXz.dun === '阴遁', `${beforeXz.jieqi}/${beforeXz.dun} → ${afterXz.jieqi}/${afterXz.dun}`);

// ⑪ 门迫严格边界（报告 B06/B07）
import { gatePalaceRelation } from '../engine/qimen.js';
ok('B06 门宫比和不得称门迫', gatePalaceRelation('休门', '1').type === '比和', gatePalaceRelation('休门', '1').type);
ok('B06b 宫生门不得称门迫', gatePalaceRelation('休门', '6').type === '宫生门', gatePalaceRelation('休门', '6').type);
ok('B07 宫克门是「宫制门」不是门迫', gatePalaceRelation('生门', '3').type === '宫制门', gatePalaceRelation('生门', '3').type);
ok('门迫严格为门克宫', gatePalaceRelation('生门', '1').type === '门迫' && gatePalaceRelation('伤门', '2').type === '门迫',
  `${gatePalaceRelation('生门', '1').type}/${gatePalaceRelation('伤门', '2').type}`);

// ⑫ 门迫只在同宫成立（不得跨宫）
const rGate = run('2026-06-22T03:00:15');
ok('门迫事件都带同宫的门与宫', rGate.palaces.every((p) => !p.gateRelation || p.gateRelation.type !== '门迫' || (p.gate && p.palace)),
  rGate.palaces.filter((p) => p.gateRelation && p.gateRelation.type === '门迫').map((p) => p.palace + '宫').join(' '));

// ⑬ 断语分层与条件式措辞
const ri2 = compute({ system: 'qimen', datetime: '2026-06-22T03:00:15', withInterpret: true, direction: 'career' });
const keys2 = ri2.interpret.sections.map((x) => x.key);
ok('断语分四层：事实/单宫/关系/条件/倾向',
  ['facts', 'zhifu', 'zhishi', 'yongshen', 'conditions', 'tendency', 'checklist'].every((k) => keys2.includes(k)),
  keys2.join(','));
const allText = ri2.interpret.sections.map((x) => x.text).join('');
ok('禁止绝对措辞', !/必成|必败|绝对吉|绝对凶|铁断|注定|百分百/.test(allText));
// 「用神多候选就不给单一倾向」是上一轮的口径，实测等于恒不判决策：YONG_SHEN 每个方向都是
// 「主用神 + 辅用神」，辅用神必然落宫，7 个方向 7 次退回「暂不给」。改为只看主用神是否上盘。
const SEVEN = ['general', 'wealth', 'career', 'love', 'health', 'study', 'travel'];
const tendencies = SEVEN.map((d) => {
  const x = compute({ system: 'qimen', datetime: '2026-06-22T03:00:15', withInterpret: true, direction: d });
  return { d, text: x.interpret.sections.find((s) => s.key === 'tendency').text, un: x.interpret.unresolved };
});
ok('七个方向都给出倾向', tendencies.every((t) => /整体(偏向顺|偏向滞|中性)/.test(t.text)),
  tendencies.filter((t) => !/整体(偏向顺|偏向滞|中性)/.test(t.text)).map((t) => t.d).join(','));
ok('辅用神同盘不再算未决项', tendencies.every((t) => t.un.length === 0),
  tendencies.map((t) => `${t.d}:${t.un.join('/')}`).join(' | '));
ok('倾向仍留条件式措辞', tendencies.every((t) => /若.*实际取另一个候选/.test(t.text)) && !/必成|注定/.test(tendencies.map((t) => t.text).join('')));
// 主用神真缺位时仍要退回未决：把开门从盘上摘掉，career（主用神开门）就该没有对照
const bareQimen = compute({ system: 'qimen', datetime: '2026-06-22T03:00:15' });
const noKaimen = { ...bareQimen, palaces: bareQimen.palaces.map((p) => (p.gate === '开门' ? { ...p, gate: '惊门' } : p)) };
const heldBack = interpretQimen(noKaimen, { direction: 'career' });
ok('主用神缺位仍退回未决',
  /暂不给单一倾向/.test(heldBack.sections.find((s) => s.key === 'tendency').text) && /主用神开门未上盘/.test(heldBack.unresolved.join('')),
  heldBack.unresolved.join('；'));
ok('无输入错误时返回规则集版本', !!ri2.interpret.ruleset && typeof ri2.interpret.ruleset.juMethod === 'string', JSON.stringify(ri2.interpret.ruleset));
if (fail > 0) { console.log(`FAIL ${fail} 项`); process.exit(1); }
console.log(`\n奇门 ${pass} 项全部通过`);




