// 盘面顶部的人话总结（engine/plain-summary.js）。
//
// 这块东西的价值全在「第一屏」：它必须在盘面之前、必须说人话、必须每句都指得回盘上的一个事实。
// 所以断言盯三件事——确定性（同盘同文）、不越界（不下吉凶断语）、顺序（真的在最前）。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compute, renderText } from '../engine/index.js';
import { plainSummary } from '../engine/plain-summary.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let pass = 0;
const fails = [];
const ok = (c, name, extra = '') => { if (c) { pass++; console.log('PASS ', name); } else { fails.push(`${name}${extra ? ' -> ' + extra : ''}`); console.log('FAIL ', name, extra); } };
const eq = (a, b, name) => ok(a === b, name, `期望 ${b}，实际 ${a}`);

const SHE = { system: 'bazi', datetime: '1996-12-14T08:00', gender: 'female', address: '安徽池州' };

// ── 一、八字：结构齐全、每句都有落点 ─────────────────────
{
  const r = compute({ ...SHE, hourUnknown: true });
  const b = r.brief;
  ok(!!b && !!b.lead, '生成了总结');
  ok(/乙木/.test(b.lead), '总纲点到日主');
  ok(/火/.test(b.lead), '总纲点出最需要的五行（这一盘寒湿需火）');
  eq(b.sections.length, 3, '三段：底色 / 感情 / 卡点');
  ok(b.sections.every((s) => s.h && s.t.length >= 15), '每段都有标题且不是一句话敷衍');
  ok(b.advice.length >= 2, '至少两条可执行建议');
  ok(b.advice.every((a) => a.length >= 8), '建议不是空话');
  ok(b.chips.includes('时柱暂缺'), '时辰未知时，标签里先标出来');
  ok(/时柱暂缺/.test(b.caveat) && /七成/.test(b.caveat), '补充说明讲清「只有六个字、约七成信息」');
  ok(/官杀/.test(b.sections[1].t), '女命感情看官杀');
  ok(/配偶宫|日支/.test(b.sections[1].t), '感情落到配偶宫这一处');
}

// ── 二、男命取财星，不能套用女命说法 ─────────────────────
{
  const m = compute({ ...SHE, gender: 'male' });
  const t = m.brief.sections[1].t;
  ok(/财星/.test(t), '男命配偶星取财星');
  ok(!/女命看配偶星/.test(t), '男命不写「女命」');
}

// ── 三、确定性：同一张盘必须逐字一致 ─────────────────────
{
  const a = compute({ ...SHE, hourUnknown: true }).brief;
  const b = compute({ ...SHE, hourUnknown: true }).brief;
  eq(JSON.stringify(a), JSON.stringify(b), '同一输入两次生成完全一致（不许有随机成分）');
}

// ── 四、不越界：不下吉凶断语、不给死时间 ─────────────────
{
  const b = compute({ ...SHE, hourUnknown: true }).brief;
  const all = JSON.stringify(b);
  const absolute = (all.match(/一定会|必然|注定|肯定会|百分之百|保证会|绝对会/g) || []);
  eq(absolute.length, 0, '不得出现绝对化断语');
  ok(!/12:00/.test(all), '不得出现 12:00 占位');
  ok(/不是断语/.test(b.footer), '结尾写明「不是断语」');
}

// ── 五、时柱齐全时不留那句补充说明 ───────────────────────
{
  const b = compute(SHE).brief;   // 带时辰
  eq(b.caveat, '', '时辰齐全时不给「只有七成信息」的补充说明');
  ok(!b.chips.includes('时柱暂缺'), '时辰齐全时标签里不出现时柱暂缺');
}

// ── 六、紫微：命宫/身宫落到具体位置 ─────────────────────
{
  const r = compute({ system: 'ziwei', datetime: '1996-12-14T08:00', gender: 'female', address: '安徽池州' });
  const b = r.brief;
  ok(!!b && b.sections.length === 3, '紫微也出三段');
  ok(b.chips.some((c) => /命宫在/.test(c)), '标签标出命宫位置');
  ok(b.lead.includes(r.soul.branch), '总纲里的命宫支与盘面一致');
  ok(/夫妻宫/.test(b.sections[1].t), '感情落到夫妻宫');
  const all = JSON.stringify(b);
  eq((all.match(/一定会|必然|注定|肯定会/g) || []).length, 0, '紫微总结同样不下断语');
}

// ── 六·五、对话侧也先给人话（模型照这段复述，就不会一开口是术语表）──
{
  const r = compute({ ...SHE, hourUnknown: true });
  const txt = renderText(r);
  ok(txt.startsWith('【先说结论】'), '对话文本以「先说结论」开头');
  ok(txt.indexOf('先说结论') < txt.indexOf('【四柱】'), '人话在四柱之前');
  ok(!/12:00/.test(txt), '对话文本同样不含 12:00');
}

// ── 七、异常输入不产出半成品 ─────────────────────────────
{
  ok(plainSummary(null) === null, '空输入返回 null');
  ok(plainSummary({ system: 'liuyao' }) === null, '连卦都没有时不硬凑总结');
}

// ── 七·五、问事五类 + 合盘 + 走势：都要有第一屏，且不许出现 undefined ──
// 这一组以前根本没有：八字紫微之外七个体系一律不给总结，用户点开六爻先看到的是
// 一整屏术语。断言盯三件事——给得出来、字段不留 undefined、结论不越界。
{
  const CASES = {
    liuyao: { system: 'liuyao', datetime: '2026-11-01T22:10', lines: [9, 7, 8, 8, 7, 6], question: '这份工作要不要接', direction: 'career' },
    meihua: { system: 'meihua', mode: 'time', datetime: '2026-11-01T22:10', question: '这周能不能谈成' },
    daliuren: { system: 'daliuren', datetime: '2026-11-01T22:10', question: '这笔钱能不能收回来' },
    qimen: { system: 'qimen', datetime: '2026-11-01T22:10', question: '下周出差顺不顺利' },
    tarot: { system: 'tarot', count: 3, question: '要不要换工作' },
    hepan: { system: 'hepan', datetime: '1990-05-12T14:30', gender: 'male', partner: { datetime: '1992-08-03T09:20', gender: 'female' } },
    trend: { system: 'trend', datetime: '1990-05-12T14:30', gender: 'female', asOf: '2026-11-02' },
  };
  for (const [name, input] of Object.entries(CASES)) {
    const r = compute(input);
    const b = r.brief;
    ok(!!b && !!b.lead, `${name}：生成了第一屏总结`);
    if (!b) continue;
    const all = JSON.stringify(b);
    ok(!/undefined|null|NaN/.test(all), `${name}：文字里没有 undefined / null / NaN 漏出来`);
    ok((b.sections || []).length >= 1 && b.sections.every((s) => s.h && s.t && s.t.length >= 10), `${name}：每段都有标题且不是一句敷衍`);
    ok((b.advice || []).length >= 1, `${name}：至少给一条可做的事`);
    ok(/不是断语/.test(b.footer || ''), `${name}：结尾写明「不是断语」`);
    ok(!/一定会|必然|注定|百分之百/.test(all), `${name}：不下绝对化断语`);
    // 问事类必须回显用户问的那句话，否则第一屏读起来和用户没关系
    if (input.question) ok(b.lead.includes(input.question), `${name}：总纲回显了用户的问题`);
  }
}

// ── 七·六、六爻停在「综合」：没有用神也要给世应版，并说清为什么 ──
{
  const base = { system: 'liuyao', datetime: '2026-11-01T22:10', lines: [9, 7, 8, 8, 7, 6], question: '今年能换个岗位吗' };
  const gen = compute(base);            // 默认 direction = general，取不到用神
  ok(!gen.useGod, '综合方向确实不取用神（前提成立）');
  const g = gen.brief;
  ok(!!g && !!g.lead, '没有用神时仍给出世应版总结');
  ok(/世爻/.test(g.sections[0].t) && /应爻/.test(g.sections[1].t), '世应各占一段');
  ok(/没有取用神|未指定所问之事/.test(g.lead + g.caveat), '把「为什么没有结论」写明白');
  ok(/询问方向/.test(g.advice[0]), '第一条建议是让用户补选方向（下一步明确）');
  // 爻位是「第几爻」，不是「几爻动」——写成 "1、6 爻动" 会被读成六个爻在动
  ok(/第 1、6 爻动/.test(g.lead), '动爻写清是第几爻', g.lead);
  ok(g.chips.includes('2 爻动'), '标签里的动爻数量与爻位对得上', g.chips.join('/'));

  // 选上方向之后必须切换到用神版，两种版本不能同时出现
  const car = compute({ ...base, direction: 'career' }).brief;
  ok(/官鬼/.test(car.lead), '选定方向后改看用神（官鬼）');
  ok(!/没有取用神/.test(car.lead), '用神版不再说「没有取用神」');
}

// ── 七·七、命盘方向与问事类型的映射：财运/学业也要取到现实核对清单 ──
{
  const base = { system: 'liuyao', datetime: '2026-11-01T22:10', lines: [9, 7, 8, 8, 7, 6] };
  for (const [dir, word] of [['wealth', '合同'], ['career', '职责'], ['study', '职责']]) {
    const b = compute({ ...base, direction: dir }).brief;
    ok(!!b, `${dir}：有总结`);
    if (!b) continue;
    ok(b.advice.length >= 2, `${dir}：带上了现实核对清单（不止一条空建议）`);
    ok(new RegExp(word).test(b.advice.join('')), `${dir}：清单落到「${word}」这类具体事上`);
  }
}

// ── 七·八、走势的「现在」由 asOf 决定，引擎不许读挂钟 ──────────
{
  const base = { system: 'trend', datetime: '1990-05-12T14:30', gender: 'female' };
  const a = compute({ ...base, asOf: '2026-11-02' }).brief;
  const b = compute({ ...base, asOf: '2026-11-02' }).brief;
  eq(JSON.stringify(a), JSON.stringify(b), '同一条线两次生成完全一致（不依赖当下时刻）');
  ok(/你现在 37 岁（2026 年）/.test(a.lead), '按 asOf 标出当前年龄与年份');
  ok(/第 \d+ 年/.test(a.lead), '写清在这一步里走到第几年');
  // 换一个 asOf，位置必须跟着变——否则等于又把年份写死了
  const c = compute({ ...base, asOf: '2031-06-01' }).brief;
  ok(/你现在 42 岁（2031 年）/.test(c.lead), '换 asOf 位置随之变化');
  // 不给 asOf：不许猜「现在」，并且要说明为什么不标
  const d = compute(base).brief;
  ok(!/你现在/.test(d.lead), '没给 asOf 时不假装知道现在几点');
  ok(/没给当前日期/.test(d.lead), '没给 asOf 时说明原因（不让读者以为是漏写）');
}

// ── 八、渲染：方框必须在盘面之前，且只出现一次 ───────────
{
  const sandboxWindow = {};
  new Function('window', fs.readFileSync(path.join(root, 'src', 'panel-kit.js'), 'utf8'))(sandboxWindow);
  const PP = sandboxWindow.__PP;

  const RENDER = [
    ['bazi', 'baziHTML', { system: 'bazi', datetime: '1996-12-14T08:00', gender: 'female', address: '安徽池州', hourUnknown: true }],
    ['ziwei', 'ziweiHTML', { system: 'ziwei', datetime: '1996-12-14T08:00', gender: 'female', address: '安徽池州' }],
    ['liuyao', 'liuyaoHTML', { system: 'liuyao', datetime: '2026-11-01T22:10', lines: [9, 7, 8, 8, 7, 6], question: '要不要接', direction: 'career' }],
    ['meihua', 'meihuaHTML', { system: 'meihua', mode: 'time', datetime: '2026-11-01T22:10', question: '能不能成' }],
    ['daliuren', 'daliurenHTML', { system: 'daliuren', datetime: '2026-11-01T22:10', question: '钱能不能回来' }],
    ['qimen', 'qimenHTML', { system: 'qimen', datetime: '2026-11-01T22:10', question: '出差顺不顺' }],
    ['tarot', 'tarotHTML', { system: 'tarot', count: 3, question: '换不换工作' }],
    ['hepan', 'hepanHTML', { system: 'hepan', datetime: '1990-05-12T14:30', gender: 'male', partner: { datetime: '1992-08-03T09:20', gender: 'female' } }],
    ['trend', 'trendHTML', { system: 'trend', datetime: '1990-05-12T14:30', gender: 'female', asOf: '2026-11-02' }],
  ];
  for (const [sys, fn, input] of RENDER) {
    const r = compute(input);
    const html = PP[fn](r);
    const bi = html.indexOf('class="mp-br"');
    const pi = html.search(/<div class="pp|<section class="mp-kline/);
    ok(bi >= 0, `${sys}：渲染出总结方框`);
    ok(bi < pi, `${sys}：方框在盘面之前（先给结论，再给依据）`);
    eq((html.match(/class="mp-br"/g) || []).length, 1, `${sys}：方框只渲染一次`);
    ok(html.includes('不是断语'), `${sys}：方框带免责尾句`);
    ok(!/undefined/.test(html), `${sys}：渲染结果里不许有 undefined`);
  }
  // 没有 brief 时不渲染空壳
  ok(PP.summaryHTML(null) === '' && PP.summaryHTML({}) === '', '没有总结时不渲染空壳');
  ok(PP.briefHTML(null) === '' && PP.briefHTML({}) === '', 'briefHTML 对空结果返回空串');

  // 八字页把 K 线整块接在下面：那一页最上面已经有八字本人话，K 线不能再顶一个方框
  {
    const t = compute({ system: 'trend', datetime: '1990-05-12T14:30', gender: 'female', asOf: '2026-11-02' });
    ok(PP.trendHTML(t).includes('class="mp-br"'), '单独看走势：K 线自带人话方框');
    const inline = PP.trendHTML(t, { brief: false });
    ok(!inline.includes('class="mp-br"') && inline.includes('mp-kline'), '嵌在八字页：K 线不再重复方框');
  }
}

if (fails.length) {
  console.log(`\nFAIL ${fails.length} 项：`);
  for (const f of fails.slice(0, 12)) console.log('  -', f);
  process.exit(1);
}
console.log(`\nPASS 顶部人话总结 ${pass} 项断言`);
