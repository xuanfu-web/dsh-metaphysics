// A3：公开对拍报告的 CI 同源守卫。
// 报告页、README 徽章与这里都调用同一个 buildVerification()；
// 任何一条判定变了、报告忘记重建，或剔除项丢了理由，都会让这个文件变红。
import fs from 'node:fs';
import { buildVerification, renderVerificationHTML, renderBadgeSVG, verifyClassicCase, verifyQimenCase } from '../tools/verification.mjs';
import { ok, eq } from './_harness.mjs';

const data = buildVerification();
const t = data.totals;
const html = renderVerificationHTML(data);
const badge = renderBadgeSVG(data);
const read = (f) => fs.readFileSync(new URL(`../${f}`, import.meta.url), 'utf8');

eq('卦例 128 条', t.liuyao, 128);
eq('成对卦例 93 条', t.liuyaoPaired, 93);
eq('静卦 35 条', t.liuyaoStatic, 35);
eq('剔除 5 条', t.excluded, 5);
eq('紫微扫描盘 312 张', t.ziweiCharts, 312);
eq('紫微格局 34 条', t.ziweiPatterns, 34);
eq('紫微判定 10,608 条', t.ziweiJudgments, 10608);
eq('奇门时辰 20 个', t.qimen, 20);
eq('奇门宫位 180 个', t.qimenPalaces, 180);
eq('交运案例 12 个', t.jiaoyun, 12);
eq('报告总行数', t.rows, 477);
eq('不一致 0 条', t.mismatch, 0);
eq('格局判定不一致 0 条', t.patternMismatch, 0);
ok('34 条格局每条至少命中一次', data.patternStats.length === 34 && data.patternStats.every((s) => s.hits > 0),
  data.patternStats.filter((s) => !s.hits).map((s) => s.name).join(','));
ok('34 条格局没有不一致', data.patternStats.every((s) => s.mismatch === 0));

const excluded = data.rows.filter((r) => r.status === '剔除');
ok('剔除项都带理由', excluded.length === 5 && excluded.every((r) => r.reason && r.reason.length > 3),
  excluded.map((r) => r.reason).join('｜'));
ok('一致行数为 128 + 312 + 20 + 12', data.rows.filter((r) => r.status === '一致').length === 472);
ok('奇门 20 行全部一致', data.rows.filter((r) => r.system === '奇门').every((r) => r.status === '一致'),
  data.rows.filter((r) => r.system === '奇门' && r.status !== '一致').map((r) => r.case).join('、'));

ok('报告文件与生成器逐字节一致', read('docs/verification.html') === html, `${read('docs/verification.html').length} vs ${html.length}`);
ok('徽章文件与生成器逐字节一致', read('docs/assets/verification-badge.svg') === badge);
ok('报告有四个状态筛选与四个体系筛选', ['全部', '一致', '剔除 + 理由', '不一致'].every((x) => html.includes(x))
  && ['六爻', '紫微', '奇门', '交运'].every((x) => html.includes(`data-system-filter="${x}"`)));
ok('报告数字与 totals 同源', html.includes('10,608') && html.includes('312') && html.includes('128') && html.includes('180'));
ok('报告无未替换占位或 NaN', !/undefined|NaN/.test(html));
ok('报告自包含（无外链脚本/样式）', !/<script[^>]+src=/.test(html) && !/<link[^>]+stylesheet/.test(html));
ok('徽章为 0 处不符的绿色', badge.includes('0 处不符') && badge.includes('#1f6f3f'));
ok('徽章披露 5 条剔除与 20 奇门', badge.includes('5 剔除') && badge.includes('20 奇门'), badge.match(/aria-label="[^"]+"/)?.[0]);

// 故意改坏一条卦例判定：报告校验器必须立刻把它标成不一致
const FIX = JSON.parse(fs.readFileSync(new URL('./fixtures/classics.json', import.meta.url), 'utf8'));
const source = FIX.boshizhengzong[0];
const tampered = { ...source, gong: source.gong === '乾金' ? '坎水' : '乾金' };
const bad = verifyClassicCase(tampered, 'pair');
ok('改坏一条判定会被抓到', bad.status === '不一致', bad.reason);

// 奇门参照盘改一个值符落宫，报告必须标不一致
const QFIX = JSON.parse(fs.readFileSync(new URL('./fixtures/qimen-20.json', import.meta.url), 'utf8'));
const qsource = QFIX[0];
const qbad = verifyQimenCase({
  ...qsource,
  chart: { ...qsource.chart, core: { ...qsource.chart.core, fuGong: Number(qsource.chart.core.fuGong) === 1 ? 2 : 1 } },
});
ok('改坏奇门值符会被抓到', qbad.status === '不一致' && qbad.reason.includes('值符'), qbad.reason);
