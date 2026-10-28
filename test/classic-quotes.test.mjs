// 古籍原文库（子平真诠 / 滴天髓）：数据完整性 + 匹配规则 + 解释层/面板接线。
// 与 test/classics.test.mjs（六爻八宫、大六壬寄宫等典籍对拍）互补：这里验的是"原文库本身"。
import fs from 'node:fs';
import vm from 'node:vm';
import { compute } from '../engine/index.js';
import { CLASSICS, CLASSIC_BOOKS, classicOf, classicsFor, classicsText } from '../engine/classics.js';

let pass = 0; let fail = 0;
const ok = (name, cond) => { if (cond) { pass++; console.log('PASS  ' + name); } else { fail++; console.log('FAIL  ' + name); } };

const R = compute({ system: 'bazi', datetime: '1996-01-19T07:30', gender: 'male' });

// —— 数据完整性
ok('books 两部', Object.keys(CLASSIC_BOOKS).length === 2 && CLASSIC_BOOKS.ziping.name === '子平真诠' && CLASSIC_BOOKS.ditian.name === '滴天髓');
ok('条目数 ≥ 19', CLASSICS.length >= 19);
ok('id 唯一', new Set(CLASSICS.map((e) => e.id)).size === CLASSICS.length);
ok('每条都有书名/章名/原文/释义/出处', CLASSICS.every((e) => CLASSIC_BOOKS[e.book] && e.chapter.length >= 2 && e.quote.length >= 12 && e.plain.length >= 8 && /^https:\/\//.test(e.url)));
ok('scene 取值合法', CLASSICS.every((e) => ['格局', '十神', '调候', '用神'].includes(e.scene)));
ok('tags 都是字符串数组', CLASSICS.every((e) => Array.isArray(e.tags) && e.tags.every((t) => typeof t === 'string')));
ok('原文不带省略号占位（不伪造断句）', CLASSICS.every((e) => !e.quote.includes('…') && !e.quote.includes('...')));

// —— 定值抽检（与抓取到的通行本一致）
ok('论正官原文含「刑冲破害」', classicOf('zp-zhenguan').quote.includes('刑冲破害'));
ok('论财原文含「财为我克」', classicOf('zp-cai').quote.includes('财为我克'));
ok('论印绶原文含「印绶喜其生身」', classicOf('zp-yin').quote.includes('印绶喜其生身'));
ok('论食神原文含「食神生财」', classicOf('zp-shishen').quote.includes('食神生财'));
ok('论偏官原文含「多存七煞」', classicOf('zp-pianguan').quote.includes('多存七煞'));
ok('论伤官原文含「实为秀气」', classicOf('zp-shangguan').quote.includes('实为秀气'));
ok('论阳刃原文含「劫之甚也」', classicOf('zp-yangren').quote.includes('劫之甚也'));
ok('论建禄月劫原文含「别取财官煞食为用」', classicOf('zp-lujie').quote.includes('别取财官煞食为用'));
ok('滴天髓寒暖原文含「不可过也」', classicOf('dt-hannuan').quote.includes('不可过也'));
ok('滴天髓官杀原文含「有可有不可」', classicOf('dt-guansha').quote.includes('有可有不可'));
ok('未知 id 返回 null', classicOf('no-such') === null);

// —— 匹配规则
const rows = classicsFor(R);
ok('1996 盘取到 2–4 条', rows.length >= 2 && rows.length <= 4);
ok('偏财格取《论财》', rows.some((e) => e.id === 'zp-cai'));
ok('寒湿盘取滴天髓寒暖', rows.some((e) => e.id === 'dt-hannuan'));
ok('配气候一条在列', rows.some((e) => e.id === 'zp-qihou'));
ok('每条都有 why（为什么取这条）', rows.every((e) => typeof e.why === 'string' && e.why.length >= 6));
ok('不重复', new Set(rows.map((e) => e.id)).size === rows.length);
ok('正官格 → 论正官', classicsFor({ geju: [{ name: '正官格', kind: '月令格' }], climate: { kind: '平和' } }).some((e) => e.id === 'zp-zhenguan'));
ok('无输入返回空数组', classicsFor(null).length === 0);
ok('classicsText 带书名与章名', classicsText(rows).includes('《子平真诠·') && classicsText(rows).includes('》「'));

// —— 解释层与摘要
const it = compute({ system: 'bazi', datetime: '1996-01-19T07:30', gender: 'male', withInterpret: true }).interpret;
const sec = (it.sections || []).find((s) => s.key === 'classics');
ok('解释层有「古籍原文」节', !!sec && sec.label === '古籍原文');
ok('解释层原文带出处与释义', !!sec && sec.text.includes('《子平真诠·') && sec.text.includes('——'));
ok('摘要含【古籍】与书名', R.summary.includes('【古籍】') && R.summary.includes('子平真诠'));
ok('r.classics 是数组', Array.isArray(R.classics) && R.classics.length > 0);

// —— 面板渲染
const box = { window: {}, console };
vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), box, { filename: 'panel-kit.js' });
const PP = box.window.__PP;
const html = PP.baziHTML(R);
ok('面板含 mp-cl 块', html.includes('class="mp-cl"'));
ok('面板含书名与释义说明', html.includes('子平真诠') && html.includes('照录通行本'));
ok('面板条目数与匹配数一致', (html.match(/mp-cl-e/g) || []).length === R.classics.length);

console.log(`\n${pass} PASS / ${fail} FAIL`);
if (fail) process.exit(1);
