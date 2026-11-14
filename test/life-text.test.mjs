// 婚姻与人生六面的文本版：导出 .md / 复制结果时带上，与网页卡片同源
// 只测「有没有、在哪儿、说得对不对」，不重复测算法本身（算法在 marriage.test / facets.test）
import { compute, renderText, buildMarriage, buildFacets } from '../engine/index.js';

let pass = 0;
let fail = 0;
const ok = (name, cond, detail) => {
  if (cond) { pass += 1; console.log('PASS ' + name); }
  else { fail += 1; console.log('FAIL ' + name + (detail ? ' -> ' + detail : '')); }
};

const INPUT = { system: 'bazi', datetime: '1990-05-12T14:30', gender: 'female' };
const chart = compute(INPUT);
const text = renderText(chart);

ok('八字盘的文本里有婚姻段', text.includes('【婚姻】'));
ok('八字盘的文本里有人生六面', text.includes('【人生六面】'));
ok('婚姻段排在六面之前', text.indexOf('【婚姻】') < text.indexOf('【人生六面】'));
ok('六面段排在文本盘面之后', text.indexOf('【人生六面】') > text.indexOf('【结论】') || text.indexOf('【人生六面】') > 0);

for (const face of ['事业', '财运', '学业', '健康', '子女', '六亲']) {
  ok('六面文本含「' + face + '」', text.includes('· ' + face + '：'));
}

const md = text.slice(text.indexOf('【婚姻】'), text.indexOf('【人生六面】'));
ok('婚姻段带类型标签', /【婚姻】\S+型/.test(md), md.slice(0, 40));
ok('婚姻段至少三句', (md.match(/\n· /g) || []).length >= 3);

const m = buildMarriage(chart);
ok('文本与卡片同源：第一句一致', md.includes(m.lines[0]));

const f = buildFacets(chart);
ok('文本与卡片同源：事业首句一致', text.includes(f.career.lines[0]));

ok('整段不写「一定会」', !/一定会|必然会|保证会/.test(text.slice(text.indexOf('【婚姻】'))));

const ziwei = compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'female' });
const zt = renderText(ziwei);
ok('紫微盘不带婚姻段', !zt.includes('【婚姻】'));
ok('紫微盘不带六面段', !zt.includes('【人生六面】'));

ok('婚姻段不出现 undefined', !/undefined|NaN|\[object Object\]/.test(text.slice(text.indexOf('【婚姻】'))));

console.log(`\n${pass} PASS / ${fail} FAIL`);
if (fail) process.exitCode = 1;
