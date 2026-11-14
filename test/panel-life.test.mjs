// 面板渲染函数（panel-kit）里的婚姻卡与人生六面卡：面板与独立页共用这一份 HTML，
// 独立页那条链已经被 e2e 守住，这里补一条纯 node 的，免得面板那条线靠肉眼。
import fs from 'node:fs';
import vm from 'node:vm';
import { buildBazi } from '../engine/index.js';
import { buildMarriage } from '../engine/marriage.js';
import { buildFacets } from '../engine/facets.js';
import { ok } from './_harness.mjs';

const kitSrc = fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8');
const sandbox = { window: {}, console };
vm.runInNewContext(kitSrc, sandbox, { filename: 'panel-kit.js' });
const PP = sandbox.window.__PP;

const A = buildBazi({ year: 1990, month: 5, day: 12, hour: 14, minute: 30, gender: 'female', trueSolar: false, dst: false, lateZi: true, nowYear: 2026 });
const ma = buildMarriage(A);
const fa = buildFacets(A);

const full = PP.baziHTML(A, { marriage: ma, life: fa });
ok('有了婚姻与六面，八字卡里出现婚姻段', full.includes('mp-mar'), full.slice(0, 60));
ok('出现六面段', full.includes('mp-life'));
ok('六面是六张卡', (full.match(/data-face="/g) || []).length === 6, String((full.match(/data-face="/g) || []).length));
ok('六张卡的面名齐全', ['career', 'wealth', 'study', 'health', 'children', 'kin'].every((k) => full.includes('data-face="' + k + '"')));
ok('婚姻卡写在六面之前', full.indexOf('mp-mar') < full.indexOf('mp-life'));
ok('婚姻段的字是婚姻层的原话', full.includes(ma.lines[0].slice(0, 12)));

const plain = PP.baziHTML(A);
ok('不传婚姻与六面时不出空壳', !plain.includes('mp-life') && !plain.includes('mp-mar'));

const half = PP.baziHTML(A, { marriage: ma });
ok('只给婚姻时六面不出现', half.includes('mp-mar') && !half.includes('mp-life'));

const bad = PP.baziHTML(A, { marriage: null, life: null });
ok('传 null 不炸也不出空壳', !bad.includes('mp-life') && !bad.includes('mp-mar'));

ok('渲染结果里没有 [object Object]', !full.includes('[object Object]'));
ok('渲染结果里没有 undefined', !full.includes('undefined'));

const B = buildBazi({ year: 1972, month: 9, day: 15, hour: 21, minute: 30, gender: 'male', trueSolar: false, dst: false, lateZi: true, nowYear: 2026 });
const fullB = PP.baziHTML(B, { marriage: buildMarriage(B), life: buildFacets(B) });
ok('换一张盘，婚姻段跟着变', fullB !== full);
