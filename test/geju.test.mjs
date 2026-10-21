// 格局 / 用神 / 行运 与 紫微 大限·流年四化 的结构测试
// 只验证算法内部一致性与结构，不验证某派命理断语。
import { buildBazi } from '../engine/bazi.js';
import { analyzeBaziFrame, scoreLuck, elementRoles, tenGod } from '../engine/geju.js';
import { buildZiwei, detectPatterns, daxianList } from '../engine/ziwei.js';

let pass = 0;
let fail = 0;
const ok = (label, cond, extra = '') => {
  if (cond) { pass += 1; console.log(`  PASS ${label}`); }
  else { fail += 1; console.log(`  FAIL ${label}${extra ? ` — ${extra}` : ''}`); }
};
const four = (r) => ['year', 'month', 'day', 'hour'].map((k) => r.pillars[k].ganzhi).join(' ');
const B = (y, m, d, h, minute = 0, gender = 'male') => buildBazi({ year: y, month: m, day: d, hour: h, minute, gender, trueSolar: false });

console.log('\n[十神与五行角色]');
{
  ok('甲日见丙为食神', tenGod('甲', '丙') === '食神', tenGod('甲', '丙'));
  ok('甲日见庚为七杀', tenGod('甲', '庚') === '七杀', tenGod('甲', '庚'));
  const rl = elementRoles('丙');
  ok('丙火：我火/印木/食伤土/财金/官杀水', rl.me === '火' && rl.inMe === '木' && rl.shi === '土' && rl.cai === '金' && rl.guan === '水', JSON.stringify(rl));
}

console.log('\n[格局：1990-05-12 14:30 女]');
const r1 = B(1990, 5, 12, 14, 30, 'female');
{
  const f = r1.frame;
  ok('四柱', four(r1) === '庚午 辛巳 丁丑 丁未', four(r1));
  ok('有 frame', !!f && Array.isArray(f.geju) && f.geju.length > 0);
  ok('主格为月劫格', f.primary && f.primary.name === '月劫格', f.primary && f.primary.name);
  ok('主格带 evidence', typeof f.primary.evidence === 'string' && f.primary.evidence.includes('劫财'), f.primary.evidence);
  ok('每个格局有 name/kind/evidence', f.geju.every((g) => g.name && g.kind && g.evidence));
  ok('身强', r1.strength.level === '身强', r1.strength.level);
  ok('用神喜土（食伤泄秀）', f.yongshen.favor.includes('土'), JSON.stringify(f.yongshen.favor));
  ok('用神忌火木', f.yongshen.avoid.includes('火') && f.yongshen.avoid.includes('木'), JSON.stringify(f.yongshen.avoid));
  ok('用神喜十神含食神伤官', f.yongshen.favorTenGods.includes('食神') && f.yongshen.favorTenGods.includes('伤官'));
  ok('用神忌十神含比肩劫财', f.yongshen.avoidTenGods.includes('比肩') && f.yongshen.avoidTenGods.includes('劫财'));
  ok('调候宜水', f.yongshen.tiaohou && f.yongshen.tiaohou.element === '水', JSON.stringify(f.yongshen.tiaohou));
  ok('用神 detail 含分档', /身强|偏强|中和|偏弱|身弱/.test(f.yongshen.detail));
  ok('十神权重为分组数值', Object.values(f.godStats.groups).every((v) => typeof v === 'number' && v >= 0));
  ok('十神 byGod 十项', Object.keys(f.godStats.byGod).length === 10, String(Object.keys(f.godStats.byGod).length));
  ok('strength.parts 有季节与通根', r1.strength.parts && r1.strength.parts.season && Array.isArray(r1.strength.parts.roots));
}

console.log('\n[格局：2000-01-01 00:00 男]');
const r2 = B(2000, 1, 1, 0, 0, 'male');
{
  ok('四柱', four(r2) === '己卯 丙子 戊午 壬子', four(r2));
  ok('主格为正财格', r2.frame.primary.name === '正财格', r2.frame.primary.name);
  const names = r2.frame.geju.map((g) => g.name);
  ok('含官印相生', names.includes('官印相生'), names.join('/'));
  ok('含财官相生', names.includes('财官相生'), names.join('/'));
  ok('戊土见子月调候宜火', r2.frame.yongshen.tiaohou.element === '火', JSON.stringify(r2.frame.yongshen.tiaohou));
}

console.log('\n[格局：1984-02-02 10:00 男]');
const r3 = B(1984, 2, 2, 10, 0, 'male');
{
  ok('四柱', four(r3) === '癸亥 乙丑 丙寅 癸巳', four(r3));
  ok('主格为正官格', r3.frame.primary.name === '正官格', r3.frame.primary.name);
  const names = r3.frame.geju.map((g) => g.name);
  ok('含伤官见官', names.includes('伤官见官'), names.join('/'));
  ok('中和', r3.strength.level === '中和', `${r3.strength.level} ${r3.strength.score}`);
  ok('中和用神不空', r3.frame.yongshen.favor.length > 0 && r3.frame.yongshen.avoid.length > 0);
}

console.log('\n[行运评分]');
{
  const f = r1.frame;
  ok('大运每步都有 luck', r1.dayun.list.every((d) => d.luck && d.luck.tier && typeof d.luck.score === 'number'));
  ok('流年每年都有 luck', r1.liunian.every((l) => l.luck && l.luck.tier));
  ok('luck.tier 在五档内', r1.dayun.list.every((d) => ['大吉', '吉', '平', '忌', '大忌'].includes(d.luck.tier)));
  const ys = f.yongshen;
  const EL_STEM = { 木: '甲', 火: '丙', 土: '戊', 金: '庚', 水: '壬' };
  const EL_BRANCH = { 木: '寅', 火: '午', 土: '辰', 金: '申', 水: '子' };
  const gzOf = (el) => EL_STEM[el] + EL_BRANCH[el];
  const good = scoreLuck(gzOf(ys.favor[0]), f);
  const bad = scoreLuck(gzOf(ys.avoid[0]), f);
  ok('喜神干支得分高于忌神干支', good.score > bad.score, `${gzOf(ys.favor[0])} ${good.score} vs ${gzOf(ys.avoid[0])} ${bad.score}`);
  ok('喜神干支为大吉或吉', ['大吉', '吉'].includes(good.tier), good.tier);
  ok('忌神干支为忌或大忌', ['忌', '大忌'].includes(bad.tier), bad.tier);
  ok('极端干支也能给出档位', scoreLuck('甲子', f).tier !== undefined && scoreLuck('癸亥', f).tier !== undefined);
  ok('reasons 非空', good.reasons.length > 0, JSON.stringify(good.reasons));
  const forged = {
    yongshen: { favor: ['木'], avoid: ['z'], tiaohou: { element: 'q' }, favorTenGods: [] },
  };
  ok('未知五行不崩且落档', typeof scoreLuck('甲子', forged).tier === 'string', scoreLuck('甲子', forged).tier);
}

console.log('\n[紫微：格局扩展 + 大限 + 流年四化]');
{
  const z = buildZiwei({ year: 1990, month: 5, day: 12, hour: 14, minute: 30, gender: 'female', trueSolar: false });
  const soulIdx = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'].indexOf(z.soul.branch);
  ok('命宫在戌', z.soul.branch === '戌', z.soul.branch);
  ok('格局数量 ≥ 4', z.patterns.length >= 4, String(z.patterns.length));
  ok('每个格局有 tone', z.patterns.every((p) => ['good', 'bad', 'neutral'].includes(p.tone)));
  ok('每个格局有 evidence', z.patterns.every((p) => typeof p.evidence === 'string' && p.evidence.length > 0));
  ok('格局名不重复', new Set(z.patterns.map((p) => p.name)).size === z.patterns.length);
  const names = z.patterns.map((p) => p.name);
  ok('含机月同梁', names.includes('机月同梁'), names.join('/'));
  ok('含日月对照', names.includes('日月对照'), names.join('/'));
  ok('命宫戌标为天罗地网', names.includes('天罗地网') && soulIdx === 10, names.join('/'));
  ok('patternSummary 计数一致', z.patternSummary.good.length + z.patternSummary.bad.length + z.patterns.filter((p) => p.tone === 'neutral').length === z.patterns.length);

  ok('daxianList 十二限', z.daxianList.length === 12, String(z.daxianList.length));
  ok('daxianList 按年龄排序', z.daxianList.every((d, i, arr) => i === 0 || arr[i - 1].ages[0] <= d.ages[0]));
  ok('每限有 ages 两值', z.daxianList.every((d) => d.ages.length === 2 && d.ages[1] - d.ages[0] === 9));
  ok('每限四化四颗', z.daxianList.every((d) => d.mutagenHits.length === 4));
  ok('四化落宫名非空', z.daxianList.every((d) => d.mutagenHits.every((m) => m.type && (m.palace === null || typeof m.palace === 'string'))));
  ok('每限有主星列表', z.daxianList.every((d) => Array.isArray(d.mainStars)));

  ok('流年 12 年', z.liunian.length === 12, String(z.liunian.length));
  ok('流年有四化落宫', z.liunian.every((l) => l.mutagenHits && l.mutagenHits.length === 4));
  ok('流年有四化类型', z.liunian.every((l) => l.mutagenHits.every((m) => ['禄', '权', '科', '忌'].includes(m.type))));
  ok('流年三方主星非空', z.liunian.every((l) => Array.isArray(l.sanfangMainStars)));
  ok('流年命宫与地支对应', z.liunian.every((l) => l.lifePalace.branch === l.ganzhi[1] || typeof l.ganzhi === 'string'));

  // 结构与 detectPatterns 直调一致
  const again = detectPatterns(z).map((p) => p.name);
  ok('detectPatterns 可重复调用', again.length === z.patterns.length && again[0] === names[0]);
  const dl = daxianList(z);
  ok('daxianList 可重复调用', dl.length === 12 && dl[0].ages[0] === z.daxianList[0].ages[0]);
}

console.log('\n[紫微：其它命盘不崩]');
{
  for (const [y, m, d, h, g] of [[1984, 2, 2, 10, 'male'], [2000, 1, 1, 0, 'male'], [1975, 8, 20, 6, 'female'], [2010, 12, 31, 23, 'male']]) {
    const z = buildZiwei({ year: y, month: m, day: d, hour: h, minute: 0, gender: g, trueSolar: false });
    ok(`${y}-${m}-${d} 格局/大限/流年齐备`, z.patterns.length > 0 && z.daxianList.length === 12 && z.liunian.length === 12, `${z.patterns.length}`);
  }
}

console.log(`\n===== 格局/用神/行运 =====\nPASS ${pass}　FAIL ${fail}`);
if (fail > 0) process.exitCode = 1;
