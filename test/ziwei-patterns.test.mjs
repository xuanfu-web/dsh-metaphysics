// 0.38.2：紫微 34 条格局的目录、成立条件与「夹」的判定方向。
//
// 这一轮修的是三处「看着实现了、其实永远不成立」的判定：
//   ① jia() 按固定左右顺序判夹，但「夹」只要求两星分居命宫前后。
//      后果：昌曲夹命（69,120 张盘里 8 张）与羊陀夹命（1,474 张）一次都没命中，
//      日月夹命 / 左右夹命 / 魁钺夹命也各漏掉约一半（237:231、470:457、283:292）。
//   ② 羊陀夹忌要求「化忌两侧是擎羊、陀罗」，但擎羊 = 禄存 +1、陀罗 = 禄存 −1，
//      两星只能夹禄存那一宫——所以真正的条件是「化忌与禄存同宫」（1,553 张）。
//   ③ 刑囚夹印按「廉贞、擎羊夹天相」判，但廉贞与天相永远隔偶数宫，字面夹法不成立。
//      通行说法取「廉贞天相同守命宫于子午、擎羊同宫」（zhihu 687116207 / ziwei-yun 20211110-2 /
//      sohu a438365722 三处口径一致，ziwei-yun 明说「天相不可能被廉贞和擎羊二星所夹」）。
// 夹局的定义（日月在命宫前后两宫）见 iztro.com/learn/pattern。
//
// 本文件的独立谓词不复用 engine 的任何判定函数：只读 chart.palaces 的星位与四化，
// 从「地支相对位置」重新推一遍 34 条，并要求每条至少命中一次（防止再写出死规则）。
import fs from 'node:fs';
import { buildZiwei, PATTERN_TONE } from '../engine/ziwei.js';
import { compute } from '../engine/index.js';
import { ok, eq } from './_harness.mjs';

const BR = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const fix = (i) => ((i % 12) + 12) % 12;
const readme = fs.readFileSync(new URL('../README.md', import.meta.url), 'utf8');

const chart = (year, month, day, hour) => buildZiwei({
  year, month, day, hour, minute: 0, gender: 'male', trueSolar: false,
});
const namesOf = (z) => z.patterns.map((p) => p.name);

// ── 独立实现：只用星位与四化，按地支相对位置重推 34 条 ─────────────────
function independent(z) {
  const soul = z.palaces.find((p) => p.isSoul);
  const soulIdx = BR.indexOf(soul.branch);
  const at = (i) => z.palaces.find((p) => BR.indexOf(p.branch) === fix(i));
  const pos = (name) => {
    const p = z.palaces.find((x) => x.stars.some((s) => s.name === name));
    return p ? BR.indexOf(p.branch) : -1;
  };
  const soulStars = soul.stars.map((s) => s.name);
  const soulMain = soul.stars.filter((s) => s.type === '主星').map((s) => s.name);
  const sanfang = [soulIdx, fix(soulIdx + 4), fix(soulIdx + 8), fix(soulIdx + 6)];
  const near = new Set(sanfang.flatMap((i) => at(i).stars.map((s) => s.name)));
  const nearStar = (n) => near.has(n);
  const muts = new Set(sanfang.flatMap((i) => at(i).stars.filter((s) => s.mutagen).map((s) => s.mutagen)));
  const hualu = z.palaces.find((p) => p.stars.some((s) => s.mutagen === '禄'));
  const ji = z.palaces.find((p) => p.stars.some((s) => s.mutagen === '忌'));
  const lu = pos('禄存');
  // 「夹」对两星是对称的：谁在命宫前一宫、谁在后一宫都算
  const jia = (a, b) => {
    const pa = pos(a);
    const pb = pos(b);
    if (pa < 0 || pb < 0) return false;
    return (fix(pa + 1) === soulIdx && fix(pb - 1) === soulIdx)
      || (fix(pb + 1) === soulIdx && fix(pa - 1) === soulIdx);
  };
  return {
    命无正曜: soulMain.length === 0,
    杀破狼: soulMain.some((s) => s === '七杀' || s === '破军' || s === '贪狼'),
    机月同梁: ['天机', '太阴', '天同', '天梁'].every(nearStar) && soulMain.some((s) => ['天机', '太阴', '天同', '天梁'].includes(s)),
    月朗天门: soulIdx === 11 && pos('太阴') === 11,
    日出扶桑: soulIdx === 3 && pos('太阳') === 3,
    府相朝垣: nearStar('天府') && nearStar('天相'),
    禄马交驰: lu >= 0 && pos('天马') >= 0 && (pos('天马') === lu || fix(lu - pos('天马')) === 6),
    火铃夹命: jia('火星', '铃星'),
    羊陀夹命: jia('擎羊', '陀罗'),
    羊陀夹忌: !!ji && lu >= 0 && BR.indexOf(ji.branch) === lu,
    铃昌陀武: ['铃星', '文昌', '陀罗', '武曲'].every((n) => pos(n) >= 0 && sanfang.includes(pos(n))),
    双禄交流: !!hualu && lu >= 0 && (BR.indexOf(hualu.branch) === lu || fix(BR.indexOf(hualu.branch) - lu) === 6),
    紫府同宫: soulStars.includes('紫微') && soulStars.includes('天府'),
    紫府朝垣: nearStar('紫微') && nearStar('天府'),
    君臣庆会: (soulStars.includes('紫微') || soulStars.includes('天府'))
      && ['左辅', '右弼', '天魁', '天钺'].filter(nearStar).length >= 2,
    极向离明: soulIdx === 6 && pos('紫微') === 6,
    七杀朝斗: (soulIdx === 0 || soulIdx === 6) && soulStars.includes('七杀'),
    英星入庙: (soulIdx === 0 || soulIdx === 6) && soulStars.includes('破军'),
    石中隐玉: (soulIdx === 0 || soulIdx === 6) && soulStars.includes('巨门'),
    巨日同宫: pos('巨门') >= 0 && pos('巨门') === pos('太阳'),
    日月夹命: jia('太阳', '太阴'),
    日月对照: pos('太阳') >= 0 && pos('太阴') >= 0 && fix(pos('太阳') - pos('太阴')) === 6,
    左右夹命: jia('左辅', '右弼'),
    昌曲夹命: jia('文昌', '文曲'),
    魁钺夹命: jia('天魁', '天钺'),
    三奇嘉会: muts.has('禄') && muts.has('权') && muts.has('科'),
    双禄朝垣: nearStar('禄存') && muts.has('禄'),
    命里逢空: nearStar('地空') && nearStar('地劫') && (soulStars.includes('地空') || soulStars.includes('地劫')),
    马头带箭: soulIdx === 6 && pos('擎羊') === 6,
    天罗地网: soulIdx === 4 || soulIdx === 10,
    刑囚夹印: pos('廉贞') >= 0 && pos('廉贞') === pos('天相') && pos('擎羊') === pos('天相')
      && pos('天相') === soulIdx && (pos('天相') === 0 || pos('天相') === 6),
    火贪铃贪: nearStar('贪狼') && (nearStar('火星') || nearStar('铃星')),
    武贪同行: pos('武曲') >= 0 && pos('武曲') === pos('贪狼'),
    泛水桃花: soulIdx === 0 && soulStars.includes('贪狼'),
  };
}

// 312 张盘：年份、月、日、时错开，覆盖十二命宫与十种年干
const SWEEP = [];
for (let y = 1950; y <= 2025; y += 3) {
  for (let m = 1; m <= 12; m += 1) SWEEP.push([y, m, 1 + ((y + m) % 28), (y + m * 3) % 24]);
}
const hits = new Map();
const misses = new Map();
for (const [y, m, d, h] of SWEEP) {
  const z = chart(y, m, d, h);
  const got = new Set(namesOf(z));
  const exp = independent(z);
  for (const [name, want] of Object.entries(exp)) {
    if (want) hits.set(name, (hits.get(name) || 0) + 1);
    if (want !== got.has(name)) misses.set(name, (misses.get(name) || 0) + 1);
  }
}

console.log('\n[格局目录与 README 一致]');
{
  const catalog = Object.keys(PATTERN_TONE);
  eq('目录 34 条', catalog.length, 34);
  eq('目录无重名', new Set(catalog).size, 34);
  const byTone = (t) => catalog.filter((n) => PATTERN_TONE[n] === t).sort();
  eq('吉格 20 条', byTone('good').length, 20);
  eq('中性 5 条', byTone('neutral').length, 5);
  eq('忌格 9 条', byTone('bad').length, 9);
  eq('中性五条固定', byTone('neutral'), ['命无正曜', '双禄交流', '杀破狼', '火贪铃贪', '武贪同行'].sort());
  ok('倾向只有 good/neutral/bad', catalog.every((n) => ['good', 'neutral', 'bad'].includes(PATTERN_TONE[n])),
    catalog.map((n) => `${n}:${PATTERN_TONE[n]}`).join(' '));

  const bullet = readme.split('\n').find((l) => l.includes('**格局识别（34 条')) || '';
  ok('README 有格局条目', bullet.length > 0);
  ok('README 写明 34 条', bullet.includes('34 条'));
  const group = (label) => {
    const m = new RegExp(`${label}：([^；。]*)`).exec(bullet);
    return m ? m[1].split('、').map((s) => s.trim()).filter(Boolean).sort() : [];
  };
  eq('README 吉格与目录一致', group('吉格'), byTone('good'));
  eq('README 中性条目与目录一致', group('中性'), byTone('neutral'));
  eq('README 忌格与目录一致', group('忌格'), byTone('bad'));
}

console.log('\n[34 条逐条独立复算：312 张盘无一处不符、每条至少命中一次]');
for (const name of Object.keys(PATTERN_TONE)) {
  const n = hits.get(name) || 0;
  const bad = misses.get(name) || 0;
  ok(`${name} 与独立谓词一致且可命中`, bad === 0 && n > 0, `命中 ${n} 张，不符 ${bad} 处`);
}

console.log('\n[回归：夹局方向与三条死规则]');
{
  const a = chart(1955, 1, 2, 22); // 禄存守命
  const soul = a.palaces.find((p) => p.isSoul);
  const at = (i) => a.palaces.find((p) => BR.indexOf(p.branch) === fix(i));
  const pos = (n) => {
    const p = a.palaces.find((x) => x.stars.some((s) => s.name === n));
    return p ? BR.indexOf(p.branch) : -1;
  };
  const si = BR.indexOf(soul.branch);
  ok('禄存守命：羊陀夹命命中', namesOf(a).includes('羊陀夹命'), namesOf(a).join('/'));
  ok('禄存确实在命宫', pos('禄存') === si, `${BR[pos('禄存')]} vs ${soul.branch}`);
  ok('擎羊在命宫前一宫、陀罗在后一宫',
    pos('擎羊') === fix(si + 1) && pos('陀罗') === fix(si - 1),
    `${BR[pos('擎羊')]} / ${BR[pos('陀罗')]} / 命${soul.branch}`);
  ok('擎羊陀罗相距两宫、禄存居中', fix(pos('擎羊') - pos('陀罗')) === 2,
    `${BR[pos('擎羊')]} vs ${BR[pos('陀罗')]}`);

  const b = chart(1955, 1, 2, 0); // 化忌与禄存同宫
  const luPal = b.palaces.find((p) => p.stars.some((s) => s.name === '禄存'));
  const jiPal = b.palaces.find((p) => p.stars.some((s) => s.mutagen === '忌'));
  ok('化忌与禄存同宫：羊陀夹忌命中', namesOf(b).includes('羊陀夹忌'), namesOf(b).join('/'));
  ok('化忌宫与禄存宫相同', !!luPal && !!jiPal && luPal.branch === jiPal.branch,
    `${luPal && luPal.branch} / ${jiPal && jiPal.branch}`);

  const c = chart(1955, 9, 18, 4); // 昌曲夹命：只有镜像方向成立
  const cs = BR.indexOf(c.palaces.find((p) => p.isSoul).branch);
  const cpos = (n) => {
    const p = c.palaces.find((x) => x.stars.some((s) => s.name === n));
    return p ? BR.indexOf(p.branch) : -1;
  };
  ok('昌曲夹命命中（旧写法一条都不认）', namesOf(c).includes('昌曲夹命'), namesOf(c).join('/'));
  ok('昌曲分居命宫两侧', fix(cpos('文昌') - cs) === 1 && fix(cpos('文曲') - cs) === 11,
    `昌${BR[cpos('文昌')]} 曲${BR[cpos('文曲')]} 命${BR[cs]}`);

  const d = chart(1955, 1, 2, 0);
  const ds = BR.indexOf(d.palaces.find((p) => p.isSoul).branch);
  const dpos = (n) => {
    const p = d.palaces.find((x) => x.stars.some((s) => s.name === n));
    return p ? BR.indexOf(p.branch) : -1;
  };
  ok('日月夹命命中（镜像方向）', namesOf(d).includes('日月夹命'), namesOf(d).join('/'));
  ok('太阴在前、太阳在后', fix(dpos('太阴') + 1) === ds && fix(dpos('太阳') - 1) === ds,
    `日${BR[dpos('太阳')]} 月${BR[dpos('太阴')]} 命${BR[ds]}`);

  const e = chart(1955, 6, 22, 22);
  const es = BR.indexOf(e.palaces.find((p) => p.isSoul).branch);
  const epos = (n) => {
    const p = e.palaces.find((x) => x.stars.some((s) => s.name === n));
    return p ? BR.indexOf(p.branch) : -1;
  };
  ok('左右夹命命中（镜像方向）', namesOf(e).includes('左右夹命'), namesOf(e).join('/'));
  ok('右弼在前、左辅在后', fix(epos('右弼') + 1) === es && fix(epos('左辅') - 1) === es,
    `辅${BR[epos('左辅')]} 弼${BR[epos('右弼')]} 命${BR[es]}`);

  const f = chart(1956, 2, 14, 8);
  const fs2 = BR.indexOf(f.palaces.find((p) => p.isSoul).branch);
  const fpos = (n) => {
    const p = f.palaces.find((x) => x.stars.some((s) => s.name === n));
    return p ? BR.indexOf(p.branch) : -1;
  };
  ok('魁钺夹命命中（镜像方向）', namesOf(f).includes('魁钺夹命'), namesOf(f).join('/'));
  ok('天钺在前、天魁在后', fix(fpos('天钺') + 1) === fs2 && fix(fpos('天魁') - 1) === fs2,
    `魁${BR[fpos('天魁')]} 钺${BR[fpos('天钺')]} 命${BR[fs2]}`);

  const g = chart(1952, 2, 8, 4); // 廉贞天相擎羊同守命宫子
  const gs = BR.indexOf(g.palaces.find((p) => p.isSoul).branch);
  const gpos = (n) => {
    const p = g.palaces.find((x) => x.stars.some((s) => s.name === n));
    return p ? BR.indexOf(p.branch) : -1;
  };
  ok('刑囚夹印命中（廉相羊同守命宫）', namesOf(g).includes('刑囚夹印'), namesOf(g).join('/'));
  ok('刑囚夹印：命宫在子或午、三星同宫',
    gpos('廉贞') === gpos('天相') && gpos('擎羊') === gpos('天相')
      && [0, 6].includes(gpos('天相')) && gpos('天相') === gs,
    `廉${BR[gpos('廉贞')]}/相${BR[gpos('天相')]}/羊${BR[gpos('擎羊')]}/命${BR[gs]}`);

  const h = chart(1986, 9, 8, 21); // 廉相羊同宫于午，命宫不在那一宫
  const hs = BR.indexOf(h.palaces.find((p) => p.isSoul).branch);
  const hpos = (n) => {
    const p = h.palaces.find((x) => x.stars.some((s) => s.name === n));
    return p ? BR.indexOf(p.branch) : -1;
  };
  ok('非命宫的廉相羊同宫不报刑囚夹印',
    hpos('廉贞') === hpos('天相') && hpos('擎羊') === hpos('天相')
      && [0, 6].includes(hpos('天相')) && hpos('天相') !== hs && !namesOf(h).includes('刑囚夹印'),
    `廉相羊${BR[hpos('天相')]} 命${BR[hs]} → ${namesOf(h).join('/')}`);

  const plain = chart(1990, 5, 12, 14);
  ok('非禄存守命不误报羊陀夹命', !namesOf(plain).includes('羊陀夹命'), namesOf(plain).join('/'));
  ok('非禄存同宫不误报羊陀夹忌', !namesOf(plain).includes('羊陀夹忌'), namesOf(plain).join('/'));
}

console.log('\n[结构事实：位置关系本身]');
{
  let flank = true;
  let even = true;
  let jiaIffLu = true;
  let jiIffLu = true;
  for (const [y, m, d, h] of SWEEP) {
    const z = chart(y, m, d, h);
    const pos = (n) => {
      const p = z.palaces.find((x) => x.stars.some((s) => s.name === n));
      return p ? BR.indexOf(p.branch) : -1;
    };
    const lu = pos('禄存');
    if (fix(lu + 1) !== pos('擎羊') || fix(lu - 1) !== pos('陀罗')) flank = false;
    if (fix(pos('廉贞') - pos('天相')) % 2 !== 0) even = false;
    const soul = BR.indexOf(z.palaces.find((p) => p.isSoul).branch);
    if ((lu === soul) !== namesOf(z).includes('羊陀夹命')) jiaIffLu = false;
    const ji = z.palaces.find((p) => p.stars.some((s) => s.mutagen === '忌'));
    if ((BR.indexOf(ji.branch) === lu) !== namesOf(z).includes('羊陀夹忌')) jiIffLu = false;
  }
  ok('擎羊恒在禄存 +1、陀罗恒在禄存 −1（故只能夹禄存）', flank);
  ok('廉贞与天相恒隔偶数宫（故字面「夹天相」不成立）', even);
  ok('羊陀夹命 ⇔ 禄存守命（双向）', jiaIffLu);
  ok('羊陀夹忌 ⇔ 化忌与禄存同宫（双向）', jiIffLu);
}

console.log('\n[汇总、可见性与确定性]');
{
  const z = chart(1955, 1, 2, 0);
  const sum = z.patternSummary;
  ok('patternSummary 有中性组', Array.isArray(sum.neutral), JSON.stringify(Object.keys(sum)));
  eq('count 等于三档之和', sum.count, sum.good.length + sum.neutral.length + sum.bad.length);
  eq('中性组与逐条 tone 一致', sum.neutral.slice().sort(),
    z.patterns.filter((p) => p.tone === 'neutral').map((p) => p.name).sort());
  ok('note 写明三档', sum.note.includes('中性'), sum.note);

  const r = compute({ system: 'ziwei', datetime: '1955-01-02T00:00', gender: 'male' });
  const line = r.summary.split('\n').find((l) => l.startsWith('【结构统计】')) || '';
  ok('摘要给出结构统计', line.length > 0, line);
  ok('摘要含「中性」计数', line.includes(`中性 ${r.patternSummary.neutral.length}`), line);
  ok('摘要三档计数与数据一致',
    line.includes(`吉格 ${r.patternSummary.good.length}`) && line.includes(`忌格 ${r.patternSummary.bad.length}`), line);

  const again = chart(1955, 1, 2, 0);
  eq('同输入同格局（确定性）',
    JSON.stringify(again.patterns.map((p) => [p.name, p.tone, p.evidence])),
    JSON.stringify(z.patterns.map((p) => [p.name, p.tone, p.evidence])));
  ok('每条格局都有非空依据', z.patterns.every((p) => typeof p.evidence === 'string' && p.evidence.length > 0),
    z.patterns.map((p) => `${p.name}:${p.evidence}`).join(' | '));
  ok('格局不重复', new Set(namesOf(z)).size === z.patterns.length);
}
