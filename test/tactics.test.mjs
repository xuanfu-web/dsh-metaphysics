// 取用手法（组合层）与调候口径一致性
// 这两件事的由来：真实用户拿着「插件说最需要火、用神行又说忌火」来问到底补不补。
// 所以这里既验组合取用只给一条，也验同一条输出里不会出现两套相反的取用裁决。
import { buildBazi } from '../engine/bazi.js';
import { tacticsOf, combinationOf } from '../engine/geju.js';
import { judgeClimate, arbitrate, climateText } from '../engine/tiaohou.js';
import { chartIdOf, buildEnvelope } from '../engine/envelope.js';

let pass = 0;
let fail = 0;
const ok = (label, cond, extra = '') => {
  if (cond) { pass += 1; console.log(`  PASS ${label}`); }
  else { fail += 1; console.log(`  FAIL ${label}${extra ? ` — ${extra}` : ''}`); }
};

const G = (o) => ({ groups: { 比劫: 0, 食伤: 0, 财: 0, 官杀: 0, 印: 0, ...o } });
const T = (level, gods) => tacticsOf({ strength: { level }, gods: G(gods) });

console.log('\n[官杀压身：硬制还是化]');
{
  const a = T('偏弱', { 官杀: 1.2, 食伤: 2.0, 财: 1.0, 比劫: 2.0, 印: 0 });
  ok('偏弱 + 官杀有分量 + 无印 → 食伤制杀，并点明无印可化',
    a && a.key === 'shi-sha' && /无印/.test(a.name), a && a.name);

  const b = T('偏弱', { 官杀: 1.2, 食伤: 1.0, 财: 1.0, 比劫: 1.0, 印: 1.0 });
  ok('偏弱 + 官杀有分量 + 有印 → 杀印相生', b && b.key === 'sha-yin', b && b.name);

  const c = T('身强', { 官杀: 1.5, 食伤: 1.2, 财: 1.0, 比劫: 3.0, 印: 0.5 });
  ok('身强 + 官杀旺 + 食伤有力 → 食神制杀（正面给）',
    c && c.key === 'shi-sha' && !/无印/.test(c.name), c && c.name);

  const d = T('身强', { 官杀: 1.5, 食伤: 0.2, 财: 1.0, 比劫: 3.0, 印: 0.5 });
  ok('身强 + 官杀旺 + 无食伤 → 财生官杀', d && d.key === 'cai-guan', d && d.name);
}

console.log('\n[其它组合]');
{
  const e = T('偏弱', { 食伤: 2.2, 印: 0.8, 官杀: 0.2, 财: 0.5, 比劫: 1.0 });
  ok('食伤泄身太过而印能收 → 伤官配印', e && e.key === 'shang-yin', e && e.name);

  const f = T('偏弱', { 财: 1.5, 比劫: 1.5, 食伤: 0.5, 官杀: 0.3, 印: 0.2 });
  ok('财在前、身不够担、有比劫 → 比劫帮身任财', f && f.key === 'bi-cai', f && f.name);

  const n = T('中和', { 比劫: 1.5, 食伤: 0.5, 财: 0.3, 官杀: 0.3, 印: 0.2 });
  ok('条件都不到就不给手法，不硬编一条', n === null, n && n.key);
}

console.log('\n[中和盘按十神净帮扶定倾斜，判据要能复算]');
{
  const t = T('中和', { 比劫: 3.6, 食伤: 2.3, 财: 1.5, 官杀: 1, 印: 0 });
  ok('帮扶 3.6 < 耗泄 4.8 → 取向偏耗（weak）', t && t.lean === 'weak', t && t.lean);
  ok('两个合计数写进 basis', !!t && /3\.6/.test(t.basis) && /4\.8/.test(t.basis), t && t.basis);
}

const REAL = { year: 1996, month: 7, day: 14, hour: 6, minute: 0, gender: 'male', trueSolar: false };

console.log('\n[真实盘 丙子 乙未 壬子 癸卯]');
{
  const b = buildBazi(REAL);
  const four = ['year', 'month', 'day', 'hour'].map((k) => b.pillars[k].ganzhi).join(' ');
  ok('四柱为 丙子 乙未 壬子 癸卯', four === '丙子 乙未 壬子 癸卯', four);
  const ys = b.frame.yongshen;
  ok('判食伤制杀且点明无印可化',
    ys.tactics && ys.tactics.key === 'shi-sha' && /无印/.test(ys.tactics.name), ys.tactics && ys.tactics.name);
  ok('手法写进 detail，不只躺在字段里', /取用手法：/.test(ys.detail));
  ok('印记为 0', b.frame.godStats.byGod.正印 === 0 && b.frame.godStats.byGod.偏印 === 0);
  ok('用神喜金、忌火', ys.favor.includes('金') && ys.avoid.includes('火'), `${ys.favor} / ${ys.avoid}`);
}

console.log('\n[调候口径：同一份输出不许自相矛盾]');
{
  const cl = buildBazi(REAL).climate;
  ok('本盘 priority 判为「扶抑为主」', cl.priority === '扶抑为主', cl.priority);
  ok('narration 不再说「这一局要的不是…而是丙火」', !/这一局要的不是/.test(cl.narration), cl.narration.slice(0, 30));
  ok('narration 明说只作环境偏好', /环境偏好/.test(cl.narration), cl.narration.slice(-30));

  const arb = arbitrate(cl, ['金', '水', '木'], ['土', '火']);
  ok('arbitrate 不再断言「本盘按调候优先取」', !/本盘按调候优先取/.test(arb.text), arb.text.slice(0, 30));
  ok('arbitrate 标了 soft，调用方可据此换措辞', arb.clash === true && arb.soft === true, JSON.stringify({ clash: arb.clash, soft: arb.soft }));

  const ct = climateText(cl);
  ok('climateText 不再写「调候取丙火」', !/调候取丙/.test(ct), ct.slice(-24));
  ok('climateText 写「不作主取」', /不作主取/.test(ct), ct.slice(-24));
}

console.log('\n[真该调候优先的盘，原措辞要保住]');
{
  const cold = judgeClimate({ monthBranch: '子', dayStem: '壬', wuxing: { 木: 0, 火: 0, 土: 1, 金: 1, 水: 5 }, branches: ['子', '亥', '丑', '酉'] });
  ok('仲冬水旺 → priority 为调候优先', cold.priority === '调候优先', cold.priority);
  ok('该盘 narration 仍说「要的就是它」', /这一局要的不是/.test(cold.narration), cold.narration.slice(-26));
  const arb2 = arbitrate(cold, ['金', '水'], ['土', '火']);
  ok('该盘 arbitrate 保留「按调候优先取」', /本盘按调候优先取/.test(arb2.text), arb2.text.slice(0, 26));
  ok('该盘不标 soft', arb2.soft !== true);
}

console.log('\n[组合层：每一路该怎么算（制杀 / 化杀）]');
{
  const noYin = G({ 官杀: 1.2, 食伤: 2.0, 财: 1.0, 比劫: 2.0, 印: 0 });
  const c1 = combinationOf({ tactics: T('偏弱', noYin.groups), gods: noYin });
  ok('无印可化：食伤标「短期可用·长期耗身」', !!c1 && c1.rows.some((r) => r.role === '食伤' && /短期可用/.test(r.action)),
    c1 && c1.rows.map((r) => `${r.role}${r.action}`).join('、'));
  ok('无印可化：印标「优先补」而不是「用」', !!c1 && c1.rows.some((r) => r.role === '印' && r.action === '优先补'));
  ok('无印可化：官杀标忌', !!c1 && c1.rows.some((r) => r.role === '官杀' && /忌/.test(r.action)));

  const withYin = G({ 官杀: 1.2, 食伤: 1.0, 财: 1.0, 比劫: 1.0, 印: 1.0 });
  const c2 = combinationOf({ tactics: T('偏弱', withYin.groups), gods: withYin });
  ok('杀印相生：官杀标「可化」，不再整体算忌', !!c2 && c2.rows.some((r) => r.role === '官杀' && r.action === '可化'),
    c2 && c2.rows.map((r) => `${r.role}${r.action}`).join('、'));
  ok('杀印相生：食伤标「慎用」', !!c2 && c2.rows.some((r) => r.role === '食伤' && r.action === '慎用'));
  ok('没有取用手法时组合层返回 null（不硬编）', combinationOf({ tactics: null, gods: G({}) }) === null);

  // 接进 yongshen：壬水未月那张盘正是「不成格 + 无印可化」，组合层必须把话说圆
  const r = buildBazi(REAL);
  const ys = r.frame.yongshen;
  ok('壬水盘 yongshen 带 combination', !!ys.combination);
  ok('壬水盘组合层点出「印 优先补」',
    !!ys.combination && ys.combination.rows.some((x) => x.role === '印' && x.action === '优先补'),
    ys.combination && ys.combination.rows.map((x) => `${x.role}${x.action}`).join('、'));
  ok('组合层不改 favor / avoid（行运评分口径不动）',
    Array.isArray(ys.favor) && Array.isArray(ys.avoid) && ys.favor.length === 3, ys.favor.join(''));
  ok('组合层有「不改数组」的口径说明', !!ys.combination && /不改 favor/.test(ys.combination.note));
}

console.log('\n[chart_id：不同盘不能撞同一个 id，缓存不能串盘]');
{
  const a = buildBazi({ year: 1990, month: 5, day: 12, hour: 14, minute: 30, gender: 'male', trueSolar: false });
  const b = buildBazi(REAL);
  const ia = chartIdOf(a);
  const ib = chartIdOf(b);
  ok('两张不同生日 chart_id 不同', ia !== ib, `${ia} / ${ib}`);
  ok('同一张盘重算 chart_id 稳定', chartIdOf(buildBazi(REAL)) === ib, ib);

  const ea = buildEnvelope(a, { system: 'bazi' });
  const eb = buildEnvelope(b, { system: 'bazi' });
  ok('两张盘的结论卡各是各的（不串盘）',
    ea.verdict.headline !== eb.verdict.headline, `${ea.verdict.headline} || ${eb.verdict.headline}`);
  ok('B 盘结论卡说的是壬水', /壬水/.test(eb.verdict.headline), eb.verdict.headline);
  ok('A 盘结论卡说的是丁火', /丁火/.test(ea.verdict.headline), ea.verdict.headline);
  ok('chart 字段跟着盘走', ea.meta.chart.includes('丁丑') && eb.meta.chart.includes('壬子'),
    `${ea.meta.chart} / ${eb.meta.chart}`);
}

console.log(`\n===== 取用手法 / 调候口径 =====\nPASS ${pass}　FAIL ${fail}`);
if (fail > 0) process.exitCode = 1;
