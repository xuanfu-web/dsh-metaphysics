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
ok('books 三部', Object.keys(CLASSIC_BOOKS).length === 3 && CLASSIC_BOOKS.ziping.name === '子平真诠' && CLASSIC_BOOKS.ditian.name === '滴天髓' && CLASSIC_BOOKS.sanming.name === '三命通会');
ok('条目数 ≥ 26', CLASSICS.length >= 26);
ok('id 唯一', new Set(CLASSICS.map((e) => e.id)).size === CLASSICS.length);
ok('每条都有书名/章名/原文/释义/出处', CLASSICS.every((e) => CLASSIC_BOOKS[e.book] && e.chapter.length >= 2 && e.quote.length >= 12 && e.plain.length >= 8 && /^https:\/\//.test(e.url)));
ok('scene 取值合法', CLASSICS.every((e) => ['格局', '十神', '调候', '用神', '岁运'].includes(e.scene)));
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
ok('论用神成败救应含「成中有败」「全凭救应」', classicOf('zp-chengbai').quote.includes('成中有败') && classicOf('zp-chengbai').quote.includes('全凭救应'));
ok('论用神变化含「则化为印」「则化为财」', classicOf('zp-bianhua').quote.includes('则化为印') && classicOf('zp-bianhua').quote.includes('则化为财'));
ok('成败救应出自典藏网第九章', classicOf('zp-chengbai').chapter === '九、论用神成败救应' && classicOf('zp-chengbai').url === 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/53629.html');
ok('用神变化出自典藏网第十章', classicOf('zp-bianhua').chapter === '十、论用神变化' && classicOf('zp-bianhua').url === 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/53630.html');
ok('论杂气如何取用含「透干」「会支」「透而又会」', classicOf('zp-zaji').quote.includes('何谓透干') && classicOf('zp-zaji').quote.includes('何谓会支') && classicOf('zp-zaji').quote.includes('透而又会'));
ok('杂气取用出自典藏网第十六章', classicOf('zp-zaji').chapter === '十六、论杂气如何取用' && classicOf('zp-zaji').url === 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/53636.html');
ok('总论岁运含「谓之返吟」「谓之伏吟」', classicOf('smt-suiyun').quote.includes('谓之返吟') && classicOf('smt-suiyun').quote.includes('谓之伏吟'));
ok('总论岁运出自典藏网卷二', classicOf('smt-suiyun').book === 'sanming' && classicOf('smt-suiyun').chapter === '卷二·总论岁运' && classicOf('smt-suiyun').url === 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7539.html');
ok('岁运条文不冒充原文：plain 点明与本插件口径不同', classicOf('smt-suiyun').plain.includes('不是同一套定义'));
ok('未知 id 返回 null', classicOf('no-such') === null);

// —— 匹配规则
const rows = classicsFor(R);
ok('1996 盘取到 2–5 条', rows.length >= 2 && rows.length <= 5);
ok('偏财格取《论财》', rows.some((e) => e.id === 'zp-cai'));
ok('偏财格的三命对照取《论偏财》而非《论正财》', rows.some((e) => e.id === 'smt-piancai') && !rows.some((e) => e.id === 'smt-zhengcai'));
ok('七杀格的三命对照取《官煞去留杂论》', classicsFor({ geju: [{ name: '七杀格', kind: '月令格' }], climate: { kind: '平和' } }).some((e) => e.id === 'smt-guansha-liu'));
ok('寒湿盘取滴天髓寒暖', rows.some((e) => e.id === 'dt-hannuan'));
ok('配气候一条在列', rows.some((e) => e.id === 'zp-qihou'));
ok('每条都有 why（为什么取这条）', rows.every((e) => typeof e.why === 'string' && e.why.length >= 6));
ok('不重复', new Set(rows.map((e) => e.id)).size === rows.length);
ok('why 不拼出「论论」', rows.every((e) => !e.why.includes('论论')));
ok('总纲位只出一条（总纲/变化/成败/杂气四选一）', ['zp-yongshen', 'zp-bianhua', 'zp-chengbai', 'zp-zaji'].filter((id) => rows.some((e) => e.id === id)).length === 1);
ok('1996 盘有化气格，总纲位取「论用神变化」', rows.some((e) => e.id === 'zp-bianhua') && !rows.some((e) => e.id === 'zp-yongshen'));
ok('1996 盘虽是丑月，化气仍优先于杂气', !rows.some((e) => e.id === 'zp-zaji'));
const huagiRows = classicsFor({ geju: [{ name: '化土格', kind: '化气格' }], climate: { kind: '平和' } });
ok('化气格 → 论用神变化', huagiRows.some((e) => e.id === 'zp-bianhua'));
ok('化气格 why 点明合化', huagiRows.find((e) => e.id === 'zp-bianhua').why.includes('合化'));
const comboRows = classicsFor({ geju: [{ name: '正官格', kind: '月令格' }, { name: '伤官见官', kind: '组合' }], climate: { kind: '平和' } });
ok('有组合无化气 → 论用神成败救应', comboRows.some((e) => e.id === 'zp-chengbai') && !comboRows.some((e) => e.id === 'zp-yongshen'));
ok('组合 why 点明带忌与救应', comboRows.find((e) => e.id === 'zp-chengbai').why.includes('带忌与救应'));
const plainRows = classicsFor({ geju: [{ name: '正官格', kind: '月令格' }], climate: { kind: '平和' } });
ok('无化气无组合 → 回到通用总纲', plainRows.some((e) => e.id === 'zp-yongshen') && !plainRows.some((e) => e.id === 'zp-bianhua') && !plainRows.some((e) => e.id === 'zp-chengbai'));
ok('无月令地支时不猜杂气', !plainRows.some((e) => e.id === 'zp-zaji'));
const zaRows = classicsFor({ geju: [{ name: '偏财格', kind: '月令格' }], climate: { kind: '平和' }, monthBranch: '丑' });
ok('四墓月 → 论杂气如何取用', zaRows.some((e) => e.id === 'zp-zaji') && !zaRows.some((e) => e.id === 'zp-yongshen'));
ok('化气与组合同时出现时只取变化（总纲位不并列）', (() => {
  const both = classicsFor({ geju: [{ name: '偏财格', kind: '月令格' }, { name: '化金格', kind: '化气格' }, { name: '官印相生', kind: '组合' }], climate: { kind: '平和' } });
  return both.some((e) => e.id === 'zp-bianhua') && !both.some((e) => e.id === 'zp-chengbai') && both.length <= 5;
})());
ok('正官格 → 论正官', classicsFor({ geju: [{ name: '正官格', kind: '月令格' }], climate: { kind: '平和' } }).some((e) => e.id === 'zp-zhenguan'));
ok('无输入返回空数组', classicsFor(null).length === 0);
ok('classicsText 带书名与章名', classicsText(rows).includes('《子平真诠·') && classicsText(rows).includes('》「'));

// —— 特殊结构（专旺五格 / 弃命从财从煞）：命中的单章原文排在最前，且不被 5 条上限挤掉
const SPECIAL = [
  ['1960-07-05T21:30', '曲直格', 'smt-quzhi'],
  ['1962-11-05T09:30', '炎上格', 'smt-yanshang'],
  ['1961-08-15T15:30', '从革格', 'smt-congge'],
  ['1960-03-25T21:30', '润下格', 'smt-runxia'],
  ['1961-01-25T09:30', '稼穑格', 'smt-jiasi'],
  ['1972-09-15T21:30', '从财格', 'smt-congcai'],
  ['1969-03-25T21:30', '从杀格', 'smt-congsha'],
];
for (const [datetime, name, id] of SPECIAL) {
  const r = compute({ system: 'bazi', datetime, gender: 'male' });
  ok(`${datetime} 排出${name}`, (r.frame.geju || []).some((g) => g.name === name), (r.frame.geju || []).map((g) => g.name).join(','));
  ok(`${name} → ${id} 且排第一`, r.classics[0] && r.classics[0].id === id, r.classics.map((e) => e.id).join(','));
  ok(`${name} 的 why 点名所命中的格`, r.classics[0] && r.classics[0].why.includes(name));
  ok(`${name} 仍守 5 条上限`, r.classics.length <= 5, String(r.classics.length));
}
const congEr = compute({ system: 'bazi', datetime: '1960-12-15T15:30', gender: 'male' });
const SPECIAL_IDS = ['smt-quzhi', 'smt-yanshang', 'smt-congge', 'smt-runxia', 'smt-jiasi', 'smt-congcai', 'smt-congsha'];
ok('1960-12-15 是从儿格', (congEr.frame.geju || []).some((g) => g.name === '从儿格'));
ok('从儿格没有专章就不硬配', !congEr.classics.some((e) => SPECIAL_IDS.includes(e.id)), congEr.classics.map((e) => e.id).join(','));
ok('从强格同样不硬配', !classicsFor({ geju: [{ name: '从强格', kind: '从格' }], climate: { kind: '平和' } }).some((e) => SPECIAL_IDS.includes(e.id)));
ok('特殊结构原文截断仍受 limit 约束', classicsFor({ geju: [{ name: '润下格', kind: '专旺格' }], climate: { kind: '寒湿' } }, 1).length === 1);
const congCaiR = compute({ system: 'bazi', datetime: '1972-09-15T21:30', gender: 'male', withInterpret: true });
ok('从格原文进摘要', congCaiR.summary.includes('《三命通会·卷六·弃命从财》'));
ok('从格原文进解释层', (congCaiR.interpret.sections || []).some((s) => s.key === 'classics' && s.text.includes('弃命从财')));

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
