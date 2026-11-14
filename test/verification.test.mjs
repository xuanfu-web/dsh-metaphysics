// A3：公开对拍报告的 CI 同源守卫。
// 报告页、README 徽章与这里都调用同一个 buildVerification()；
// 任何一条判定变了、报告忘记重建，或剔除项丢了理由，都会让这个文件变红。
import fs from 'node:fs';
import { buildVerification, renderVerificationHTML, renderBadgeSVG, badgeTextWidth, verifyClassicCase, verifyQimenCase, verifyBaziCase, recomputeBaziPillars, verifyBaziqaCase } from '../tools/verification.mjs';
import { ok, eq } from './_harness.mjs';

const data = buildVerification();
const t = data.totals;
const html = renderVerificationHTML(data);
const badge = renderBadgeSVG(data);
const read = (f) => fs.readFileSync(new URL(`../${f}`, import.meta.url), 'utf8');

eq('卦例 128 条', t.liuyao, 128);
eq('成对卦例 93 条', t.liuyaoPaired, 93);
eq('静卦 35 条', t.liuyaoStatic, 35);
eq('剔除 6 条（5 条卦例原文冲突 + 1 条夏令时口径）', t.excluded, 6);
eq('紫微扫描盘 312 张', t.ziweiCharts, 312);
eq('紫微格局 34 条', t.ziweiPatterns, 34);
eq('紫微判定 10,608 条', t.ziweiJudgments, 10608);
eq('奇门时辰 20 个', t.qimen, 20);
eq('奇门宫位 180 个', t.qimenPalaces, 180);
eq('交运案例 12 个', t.jiaoyun, 12);
eq('八字样本 18 个', t.bazi, 18);
eq('真实命例 117 个', t.baziqa, 117);
eq('真实命例剔除 1 例（香港 1974 夏令时）', t.baziqaExcluded, 1);
eq('报告总行数', t.rows, 612);
eq('不一致 0 条', t.mismatch, 0);
eq('格局判定不一致 0 条', t.patternMismatch, 0);
ok('34 条格局每条至少命中一次', data.patternStats.length === 34 && data.patternStats.every((s) => s.hits > 0),
  data.patternStats.filter((s) => !s.hits).map((s) => s.name).join(','));
ok('34 条格局没有不一致', data.patternStats.every((s) => s.mismatch === 0));

const excluded = data.rows.filter((r) => r.status === '剔除');
ok('剔除项都带理由', excluded.length === 6 && excluded.every((r) => r.reason && r.reason.length > 3),
  excluded.map((r) => r.reason).join('｜'));
ok('一致行数为 128 + 312 + 20 + 12 + 18 + 116', data.rows.filter((r) => r.status === '一致').length === 606);
ok('奇门 20 行全部一致', data.rows.filter((r) => r.system === '奇门').every((r) => r.status === '一致'),
  data.rows.filter((r) => r.system === '奇门' && r.status !== '一致').map((r) => r.case).join('、'));

ok('报告文件与生成器逐字节一致', read('docs/verification.html') === html, `${read('docs/verification.html').length} vs ${html.length}`);
ok('徽章文件与生成器逐字节一致', read('docs/assets/verification-badge.svg') === badge);
ok('报告有四个状态筛选与五个体系筛选', ['全部', '一致', '剔除 + 理由', '不一致'].every((x) => html.includes(x))
  && ['六爻', '紫微', '奇门', '交运', '八字'].every((x) => html.includes(`data-system-filter="${x}"`)));
ok('报告数字与 totals 同源', html.includes('10,608') && html.includes('312') && html.includes('128') && html.includes('180'));
ok('报告无未替换占位或 NaN', !/undefined|NaN/.test(html));
ok('报告自包含（无外链脚本/样式）', !/<script[^>]+src=/.test(html) && !/<link[^>]+stylesheet/.test(html));
ok('徽章为 0 处不符的绿色', badge.includes('0 处不符') && badge.includes('#1f6f3f'));
// ── 八字：独立复算层不许偷懒 ────────────────────────────────────────────
// 这一组守的是「报告里多了 18 行八字，但其实什么都没比」这类假绿：
// 复算层必须真按规则推（拿已知盘对），校验器必须真的会红，而且交界日
// 那几条不许把「本层算不准的项」悄悄算成一致。
{
  const bz = data.rows.filter((r) => r.system === '八字' && r.item.includes('纳音'));
  ok('八字 18 行全部一致', bz.length === 18 && bz.every((r) => r.status === '一致'),
    bz.filter((r) => r.status !== '一致').map((r) => `${r.case}：${r.reason}`).join('｜'));
  ok('八字行把六项都写在对拍项里',
    bz.every((r) => ['四柱', '纳音', '藏干', '十神', '旬空'].every((x) => r.item.includes(x)) && r.item.includes('顺逆')));
  ok('八字行给了纳音与旬空的实际值', bz.every((r) => /\｜[^\｜]{2,4}(金|木|水|火|土)｜空[子丑寅卯辰巳午未申酉戌亥]{2}/.test(r.actual)),
    bz.find((r) => !/｜空[子丑寅卯辰巳午未申酉戌亥]{2}/.test(r.actual))?.actual);

  // 复算层对已知盘：1990-01-15 00:30，己巳年、丁丑月、庚辰日、丙子时
  const known = recomputeBaziPillars({ year: 1990, month: 1, day: 15, hour: 0, minute: 30, lateZi: true });
  eq('复算层 年柱', known.pillars.year.ganzhi, '己巳');
  eq('复算层 月柱', known.pillars.month.ganzhi, '丁丑');
  eq('复算层 日柱', known.pillars.day.ganzhi, '庚辰');
  eq('复算层 时柱', known.pillars.hour.ganzhi, '丙子');
  eq('复算层 年柱纳音', known.pillars.year.nayin, '大林木');
  eq('复算层 日柱旬空', known.pillars.day.xunKong, '申酉');
  // 晚子时换日：同一时刻不换日时，日柱退一柱、时柱随之换
  const noLate = recomputeBaziPillars({ year: 1990, month: 1, day: 15, hour: 23, minute: 30, lateZi: false });
  const late = recomputeBaziPillars({ year: 1990, month: 1, day: 15, hour: 23, minute: 30, lateZi: true });
  ok('晚子时两种口径给出不同日柱', noLate.pillars.day.ganzhi !== late.pillars.day.ganzhi,
    `${noLate.pillars.day.ganzhi} vs ${late.pillars.day.ganzhi}`);

  // 校验器会红：把日柱换成别的干支，必须报「日柱」
  const tamperedBazi = verifyBaziCase({ datetime: '1985-06-15T00:30', gender: 'male', note: 't', lateZi: true });
  ok('八字样本本身一致', tamperedBazi.status === '一致', tamperedBazi.reason);
  {
    // 直接拿一个改过的输入（时区偏移 12 小时 → 日柱必变）验证校验器不是恒真
    const shifted = verifyBaziCase({ datetime: '1985-06-15T12:30', gender: 'male', note: 't', lateZi: false });
    ok('换一个时刻结果随之变化（校验器不是恒真）', shifted.actual !== tamperedBazi.actual,
      `${shifted.actual} vs ${tamperedBazi.actual}`);
  }
}
// ── 八字真实命例：外部基准对拍不许恒真 ──────────────────────────────────
// 这一组守的是「报了 117 例，其实只是把上游四柱同时写进 expected 与 actual」。
// 判据：剔除那 1 例必须真是夏令时口径差异；篡改上游年柱必须立刻变红。
{
  const bq = data.rows.filter((r) => r.system === '八字' && !r.item.includes('纳音'));
  ok('真实命例 117 行', bq.length === 117, String(bq.length));
  ok('真实命例 116 一致 + 1 剔除',
    bq.filter((r) => r.status === '一致').length === 116 && bq.filter((r) => r.status === '剔除').length === 1,
    bq.filter((r) => r.status === '不一致').map((r) => `${r.case}：${r.reason}`).join('｜'));
  const gap = bq.find((r) => r.status === '剔除');
  ok('剔除那例的理由写明夏令时口径', Boolean(gap) && gap.reason.includes('夏令时'), gap && gap.reason);
  ok('上游缺时柱的命例写明只比三柱', bq.some((r) => r.item.includes('比三柱')));
  ok('真实命例的期望值是干支四柱', bq.every((r) => /^[甲乙丙丁戊己庚辛壬癸][子丑寅卯辰巳午未申酉戌亥] /.test(r.expected)),
    bq.find((r) => !/^[甲乙丙丁戊己庚辛壬癸][子丑寅卯辰巳午未申酉戌亥] /.test(r.expected))?.expected);

  const source = JSON.parse(fs.readFileSync(new URL('./fixtures/baziqa-pillars.json', import.meta.url), 'utf8')).cases
    .find((c) => c.upstream[3] != null && c.dstMinutes === 0);
  const good = verifyBaziqaCase(source);
  ok('真实命例基准本身一致', good.status === '一致', good.reason);
  const badUp = { ...source, upstream: ['甲子', ...source.upstream.slice(1)] };
  ok('改坏上游年柱会被抓到', verifyBaziqaCase(badUp).status === '不一致', verifyBaziqaCase(badUp).reason);
}
ok('徽章披露 6 条剔除与 20 奇门', badge.includes('6 剔除') && badge.includes('20 奇门'), badge.match(/aria-label="[^"]+"/)?.[0]);
// 「0 处不符」不能替「127 条其实没核」兜着：旬空那一项没有起卦日就无从比对，
// 徽章必须把这个口径写在脸上，否则等于拿没核过的项冒充核过了。
ok('徽章标注 127 项未核', badge.includes('127 未核'), badge.match(/aria-label="[^"]+"/)?.[0]);
ok('未核数与 totals 同源', badge.includes(`${t.unchecked} 未核`) && t.unchecked === 127);
// 徽章是定宽 SVG：宽度要跟着文字长度走，写死就会把新增的「未核」顶出彩色面板。
{
  const width = Number(badge.match(/^<svg[^>]*width="(\d+)"/)?.[1]);
  const panel = Number(badge.match(/<rect x="62" width="(\d+)" height="28" rx="4" fill="#1f6f3f"\/>/)?.[1]);
  const text = (badge.match(/<text x="\d+" y="18">([^<]*)<\/text>/g) || []).pop().replace(/<[^>]+>/g, '');
  eq('徽章总宽 = 左栏 62 + 右栏', width, 62 + panel);
  ok('徽章文字装得进右栏（每侧留白 ≥16px）', badgeTextWidth(text) + 16 * 2 <= panel,
    `${Math.round(badgeTextWidth(text))}px 文字 / ${panel}px 面板`);
  // 数字变长（未核 127 → 1270）时徽章要跟着变宽，而不是把字挤出面板
  const wider = renderBadgeSVG({ totals: { ...t, unchecked: 1270, ziweiCharts: 3120 } });
  const widerWidth = Number(wider.match(/^<svg[^>]*width="(\d+)"/)?.[1]);
  ok('数字变长时徽章跟着变宽', widerWidth > width, `${widerWidth} vs ${width}`);
  // 未核为 0 时不该挂一个「0 未核」的废话
  ok('无未核项时不写「0 未核」', !renderBadgeSVG({ totals: { ...t, unchecked: 0 } }).includes('0 未核'));
}

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

// ── 旬空：只能按起卦日核，没有起卦日就必须说「未核」 ────────────
// 《卜筮正宗》原表 128 条里只有 1 条记了起卦日；以前其余 127 条的旬空是拿
// 「今天」的日干支算出来的，页面上写「空辰巳 → 空午未」却仍标「一致」，
// 而且每换一旬页面内容就变，仓库里的报告注定与源码对不上。
{
  const ly = data.rows.filter((r) => r.system === '六爻');
  const unchecked = ly.filter((r) => r.unchecked);
  ok('无起卦日的卦例被标为未核', unchecked.length === t.unchecked && t.unchecked > 0, `${t.unchecked} / ${ly.length}`);
  ok('未核行的引擎结果不给旬空值', unchecked.every((r) => r.actual.includes('空—（未核）')), unchecked[0] && unchecked[0].actual);
  ok('未核行的期望值与对拍项都写明未核',
    unchecked.every((r) => /（未核）/.test(r.expected) && r.item.includes('未核')), unchecked[0] && unchecked[0].item);
  ok('未核行仍按其余四项判一致', unchecked.every((r) => r.status === '一致'));

  const dated = ly.filter((r) => !r.unchecked && r.status !== '剔除');
  ok('有起卦日的卦例照旧核旬空', dated.length >= 1 && dated.every((r) => /空[子丑寅卯辰巳午未申酉戌亥]{2}/.test(r.actual)),
    `${dated.length} 条`);
  const datedSrc = FIX.boshizhengzong.find((x) => x.kong && /月[甲乙丙丁戊己庚辛壬癸][子丑寅卯辰巳午未申酉戌亥]日/.test(String(x.date || '')));
  ok('找到带日期的原表用例', Boolean(datedSrc), 'fixture 里应有申月甲午日之类');
  const badKong = verifyClassicCase({ ...datedSrc, kong: datedSrc.kong === '子丑' ? '寅卯' : '子丑' }, 'pair');
  ok('改坏旬空会被抓到', badKong.status === '不一致' && badKong.reason.includes('旬空'), badKong.reason);
}

// 报告不能依赖「今天」：冻结成两个不同日期，渲染结果必须逐字节相同。
// 这条锁住的是「跨旬重建 → 报告与源码不一致 → CI 红」那类回归。
{
  const RealDate = Date;
  const at = (iso) => {
    globalThis.Date = class extends RealDate {
      constructor(...a) { if (a.length) super(...a); else super(iso); }
      static now() { return RealDate.parse(iso); }
    };
  };
  at('2026-11-06T10:00:00+08:00');
  const a = renderVerificationHTML(buildVerification());
  at('2027-03-19T10:00:00+08:00');
  const b = renderVerificationHTML(buildVerification());
  globalThis.Date = RealDate;
  ok('报告与系统日期无关（跨日期渲染一致）', a === b, `${a.length} vs ${b.length}`);
}
