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
  ok(plainSummary({ system: 'liuyao' }) === null, '非命盘类不产出总结');
}

// ── 八、渲染：方框必须在盘面之前，且只出现一次 ───────────
{
  const sandboxWindow = {};
  new Function('window', fs.readFileSync(path.join(root, 'src', 'panel-kit.js'), 'utf8'))(sandboxWindow);
  const PP = sandboxWindow.__PP;

  for (const [sys, fn] of [['bazi', 'baziHTML'], ['ziwei', 'ziweiHTML']]) {
    const r = compute({ system: sys, datetime: '1996-12-14T08:00', gender: 'female', address: '安徽池州', hourUnknown: sys === 'bazi' });
    const html = PP[fn](r);
    const bi = html.indexOf('class="mp-br"');
    const pi = html.indexOf('<div class="pp');
    ok(bi >= 0, `${sys}：渲染出总结方框`);
    ok(bi < pi, `${sys}：方框在盘面之前（先给结论，再给依据）`);
    eq((html.match(/class="mp-br"/g) || []).length, 1, `${sys}：方框只渲染一次`);
    ok(html.includes('不是断语'), `${sys}：方框带免责尾句`);
  }
  // 没有 brief 时不渲染空壳
  ok(PP.summaryHTML(null) === '' && PP.summaryHTML({}) === '', '没有总结时不渲染空壳');
}

if (fails.length) {
  console.log(`\nFAIL ${fails.length} 项：`);
  for (const f of fails.slice(0, 12)) console.log('  -', f);
  process.exit(1);
}
console.log(`\nPASS 顶部人话总结 ${pass} 项断言`);
