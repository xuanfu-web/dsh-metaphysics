// 八字 × 紫微交叉验证：五项固定口径、阈值边界、性别分支、节奏真值表、缺数据、
// 用原始盘面独立复算、确定性、两个入口一致、不折算分数、crossText 输出。
import { compute } from '../engine/index.js';
import { crossCheck, crossText } from '../engine/crosscheck.js';
import { ok, eq } from './_harness.mjs';

const PALACES = ['命宫', '兄弟', '夫妻', '子女', '财帛', '疾厄', '迁移', '交友', '官禄', '田宅', '福德', '父母'];
const KEYS = ['career', 'wealth', 'love', 'health', 'rhythm'];
const FIELDS = ['key', 'label', 'bazi', 'ziwei', 'stance', 'note'];
const STANCES = ['同向', '有张力', '互补'];

const star = (type, name) => ({ type, name });
const mains = (n) => Array.from({ length: n }, (_, i) => star('主星', `主${i + 1}`));
const shas = (n) => Array.from({ length: n }, (_, i) => star('煞星', `煞${i + 1}`));

// 最小盘面桩：只放交叉验证真正读取的字段
function bz({ groups = {}, gender = 'male', wuxing = { 木: 1, 火: 2, 土: 3, 金: 4, 水: 5 }, age = 37, tier = '吉', startAge = 1 } = {}) {
  const hasAge = Number.isFinite(age);
  return {
    frame: { godStats: { groups } },
    input: { gender },
    wuxing,
    liunian: hasAge ? [{ age }] : [],
    dayun: { list: hasAge && tier ? [{ startAge, luck: { tier } }] : [] },
  };
}
function zw({ 官禄 = [], 财帛 = [], 夫妻 = [], 疾厄 = [], 命宫 = [], age = 37, daxian = { 命宫: [5, 14] } } = {}) {
  const hasAge = Number.isFinite(age);
  return {
    liunian: hasAge ? [{ age }] : [],
    palaces: PALACES.map((p) => ({
      palace: p,
      stars: { 官禄, 财帛, 夫妻, 疾厄, 命宫 }[p] || [],
      daxian: daxian[p] ? { start: daxian[p][0], end: daxian[p][1] } : undefined,
    })),
  };
}
const item = (cross, key) => cross.items.find((i) => i.key === key);

// ── ① 事业：官杀 + 食伤 ≥ 2 才算「强调」
{
  const near = crossCheck(bz({ groups: { 官杀: 1, 食伤: 0.9 } }), zw({ 官禄: mains(1) }));
  ok('事业：官杀+食伤 1.9 不算强调（有张力）', item(near, 'career').stance === '有张力', item(near, 'career').stance);
  ok('事业：权重按一位小数报出', item(near, 'career').bazi.includes('权重 1.9'), item(near, 'career').bazi);
  const at = crossCheck(bz({ groups: { 官杀: 1, 食伤: 1 } }), zw({ 官禄: mains(1) }));
  ok('事业：恰 2.0 算强调（同向）', item(at, 'career').stance === '同向', item(at, 'career').stance);
  ok('事业：权重 2.0', item(at, 'career').bazi.includes('权重 2.0'), item(at, 'career').bazi);
  const none = crossCheck(bz({ groups: { 官杀: 0.5, 食伤: 0.5 } }), zw({ 官禄: [] }));
  ok('事业：两边都弱也算同向', item(none, 'career').stance === '同向');
  ok('事业：无正曜写明', item(none, 'career').ziwei === '官禄无正曜', item(none, 'career').ziwei);
}

// ── ② 财富：财 ≥ 2 才算「偏强」
{
  const near = crossCheck(bz({ groups: { 财: 1.9 } }), zw({ 财帛: mains(1) }));
  ok('财富：财 1.9 判偏弱（有张力）', item(near, 'wealth').stance === '有张力' && item(near, 'wealth').bazi.includes('（偏弱）'), item(near, 'wealth').bazi);
  const at = crossCheck(bz({ groups: { 财: 2 } }), zw({ 财帛: mains(1) }));
  ok('财富：财 2.0 判偏强（同向）', item(at, 'wealth').stance === '同向' && item(at, 'wealth').bazi.includes('（偏强）'), item(at, 'wealth').bazi);
  const sha = crossCheck(bz({ groups: { 财: 2 } }), zw({ 财帛: [...mains(1), ...shas(2)] }));
  ok('财富：煞星颗数进文案', sha.items.find((i) => i.key === 'wealth').ziwei.includes('煞星 2 颗'), item(sha, 'wealth').ziwei);
}

// ── ③ 感情：男取财、女取官杀
{
  const male = crossCheck(bz({ groups: { 财: 2 }, gender: 'male' }), zw({ 夫妻: mains(1) }));
  ok('感情：男命取妻星（财）', item(male, 'love').bazi.startsWith('妻星（财）'), item(male, 'love').bazi);
  ok('感情：男命财 2.0 为不弱且同向', item(male, 'love').stance === '同向' && item(male, 'love').bazi.includes('（不弱）'));
  const female = crossCheck(bz({ groups: { 官杀: 2 }, gender: 'female' }), zw({ 夫妻: mains(1) }));
  ok('感情：女命取夫星（官杀）', item(female, 'love').bazi.startsWith('夫星（官杀）'), item(female, 'love').bazi);
  const femaleWrongStar = crossCheck(bz({ groups: { 财: 3, 官杀: 0 }, gender: 'female' }), zw({ 夫妻: mains(1) }));
  ok('感情：女命不拿财星充夫星', item(femaleWrongStar, 'love').bazi.includes('权重 0') && item(femaleWrongStar, 'love').stance === '有张力', item(femaleWrongStar, 'love').bazi);
  const maleNoSpouse = crossCheck(bz({ groups: { 财: 0 }, gender: 'male' }), zw({ 夫妻: [] }));
  ok('感情：夫妻无正曜写明', item(maleNoSpouse, 'love').ziwei === '夫妻宫无正曜', item(maleNoSpouse, 'love').ziwei);
}

// ── ④ 身体：固定「互补」，最弱五行取最小值
{
  const c = crossCheck(bz({ wuxing: { 木: 0.3, 火: 4.5, 土: 3, 金: 2.6, 水: 0.5 } }), zw({ 疾厄: [...mains(1), ...shas(1)] }));
  ok('身体：固定标互补', item(c, 'health').stance === '互补');
  ok('身体：最弱五行取最小值', item(c, 'health').bazi === '最弱五行 木（0.3）', item(c, 'health').bazi);
  ok('身体：疾厄主星与煞星并列', item(c, 'health').ziwei.startsWith('疾厄主星 主1') && item(c, 'health').ziwei.includes('煞星 1 颗'), item(c, 'health').ziwei);
  ok('身体：提醒以体检为准', item(c, 'health').note.includes('体检') && item(c, 'health').note.includes('医生'));
}

// ── ⑤ 节奏真值表：八字档位（吉/大吉、忌/大忌、平）× 紫微煞星（0/1 轻、2 重）
{
  const expect = (tier, sha) => {
    const good = ['吉', '大吉'].includes(tier);
    const bad = ['忌', '大忌'].includes(tier);
    const heavy = sha >= 2;
    if (good && heavy) return { stance: '有张力', note: '八字这边顺' };
    if (bad && !heavy) return { stance: '有张力', note: '八字这边偏紧' };
    if (!good && !bad && heavy) return { stance: '有张力', note: '大运为平' };
    return { stance: '同向', note: '松紧判断接近' };
  };
  for (const tier of ['吉', '大吉', '忌', '大忌', '平']) {
    for (const sha of [1, 2]) {
      const c = crossCheck(bz({ tier }), zw({ daxian: { 命宫: [1, 99] }, 命宫: shas(sha) }));
      const got = item(c, 'rhythm');
      const want = expect(tier, sha);
      ok(`节奏：档位${tier}＋煞星${sha} → ${want.stance}`, got.stance === want.stance, got.stance);
      ok(`节奏：档位${tier}＋煞星${sha} 的说明对得上情形`, got.note.includes(want.note), got.note);
      ok(`节奏：档位${tier}＋煞星${sha} 的八字侧按实报`, got.bazi === `大运档位 ${tier}`, got.bazi);
    }
  }
  const neutralHeavy = item(crossCheck(bz({ tier: '平' }), zw({ daxian: { 命宫: [1, 99] }, 命宫: shas(2) })), 'rhythm');
  ok('节奏：平 + 煞星多不再说「一边顺、一边压」', !neutralHeavy.note.includes('一边顺'), neutralHeavy.note);
}

// ── ⑥ 缺数据：不拿「没取到」冒充「没有问题」
{
  const infant = crossCheck(bz({ age: 3, startAge: 8, tier: '吉' }), zw({ daxian: { 命宫: [1, 99] }, 命宫: shas(2) }));
  const r1 = item(infant, 'rhythm');
  ok('节奏：未起运时八字档位为「—」', r1.bazi === '大运档位 —', r1.bazi);
  ok('节奏：只有一边有信号时标互补', r1.stance === '互补', r1.stance);
  ok('节奏：说明点明八字未取到', r1.note.includes('八字当前大运未取到') && r1.note.includes('不下两边对照的结论'), r1.note);

  const noDaxian = crossCheck(bz({ tier: '大忌' }), zw({ daxian: {} }));
  const r2 = item(noDaxian, 'rhythm');
  ok('节奏：大限未取到就写未取到', r2.ziwei === '大限未取到', r2.ziwei);
  ok('节奏：大限未取到时不附带「无煞星」', !r2.ziwei.includes('无煞星'));
  ok('节奏：缺紫微一侧时标互补并点名', r2.stance === '互补' && r2.note.includes('紫微当前大限未取到'), r2.note);

  const none = crossCheck(bz({ age: null }), zw({ age: null }));
  const r3 = item(none, 'rhythm');
  ok('节奏：两边都缺时也标互补', r3.stance === '互补' && r3.note.includes('都没取到'), r3.note);
}

// ── ⑦ 真实盘面独立复算（10 张 × 男女 = 20 组）
{
  const cases = [
    ['1980-03-05T08:00', '河北石家庄'],
    ['1985-07-14T12:00', '河北石家庄'],
    ['1990-05-12T14:30', '河北石家庄'],
    ['1996-01-19T07:31', '安徽池州'],
    ['2000-11-02T03:20', '广东广州'],
    ['1975-09-09T23:10', '四川成都'],
    ['1992-04-05T16:45', '浙江杭州'],
    ['2005-01-13T10:05', '江苏南京'],
    ['1988-12-31T21:00', '陕西西安'],
    ['1968-06-06T06:06', '山东济南'],
  ];
  const groupsOf = (b) => (b.frame && b.frame.godStats && b.frame.godStats.groups) || {};
  const palaceOf = (z, name) => (z.palaces || []).find((p) => p.palace === name) || null;
  const mainsOf = (p) => (p && p.stars ? p.stars.filter((s) => s.type === '主星').map((s) => s.name) : []);
  const shaOf = (p) => (p && p.stars ? p.stars.filter((s) => s.type === '煞星').length : 0);
  const tierOf = (b) => {
    const age = Number(b.liunian && b.liunian[0] ? b.liunian[0].age : NaN);
    let cur = null;
    for (const d of (b.dayun && b.dayun.list) || []) if (Number.isFinite(age) && Number(d.startAge) <= age) cur = d;
    return cur ? (cur.luck && cur.luck.tier) || '平' : '—';
  };
  const daxianOf = (z) => {
    const age = Number(z.liunian && z.liunian[0] ? z.liunian[0].age : NaN);
    for (const p of z.palaces || []) {
      const d = p.daxian || {};
      if (Number.isFinite(age) && Number(d.start) <= age && age <= Number(d.end)) return p;
    }
    return null;
  };
  const stanceOf = (baziStrong, ziweiStrong) => (baziStrong === ziweiStrong ? '同向' : '有张力');

  const textFails = [];
  const stanceFails = [];
  let checked = 0;
  for (const [datetime, address] of cases) {
    for (const gender of ['male', 'female']) {
      const b = compute({ system: 'bazi', datetime, gender, address });
      const z = compute({ system: 'ziwei', datetime, gender, address });
      const c = crossCheck(b, z);
      const g = groupsOf(b);
      const check = (cond, msg) => { if (!cond) textFails.push(`${datetime}/${gender} ${msg}`); };

      const careerMain = mainsOf(palaceOf(z, '官禄'));
      const careerSum = Number(g['官杀'] || 0) + Number(g['食伤'] || 0);
      check(/权重 \d+\.\d$/.test(item(c, 'career').bazi) && item(c, 'career').bazi.endsWith(careerSum.toFixed(1)), '事业权重');
      check(item(c, 'career').ziwei.startsWith(careerMain.length ? `官禄宫主星 ${careerMain.join('、')}` : '官禄无正曜'), '事业紫微侧');

      const wealthMain = mainsOf(palaceOf(z, '财帛'));
      const wealth = Number(g['财'] || 0);
      check(item(c, 'wealth').bazi === `财星权重 ${wealth}${wealth >= 2 ? '（偏强）' : '（偏弱）'}`, '财富八字侧');
      check(item(c, 'wealth').ziwei.startsWith(wealthMain.length ? `财帛主星 ${wealthMain.join('、')}` : '财帛无正曜'), '财富紫微侧');

      const loveKey = gender === 'male' ? '财' : '官杀';
      const love = Number(g[loveKey] || 0);
      check(item(c, 'love').bazi.startsWith(`${gender === 'male' ? '妻' : '夫'}星（${loveKey}）权重 ${love}`), '感情性别分支');

      const weakest = Object.entries(b.wuxing || {}).sort((x, y) => Number(x[1]) - Number(y[1]))[0];
      check(item(c, 'health').bazi === `最弱五行 ${weakest[0]}（${weakest[1]}）`, '最弱五行');
      check(item(c, 'health').ziwei.startsWith(mainsOf(palaceOf(z, '疾厄')).length ? `疾厄主星 ${mainsOf(palaceOf(z, '疾厄')).join('、')}` : '疾厄无正曜'), '疾厄侧');

      const tier = tierOf(b);
      check(item(c, 'rhythm').bazi === `大运档位 ${tier}`, '节奏档位');

      const dax = daxianOf(z);
      const sha = dax ? shaOf(dax) : 0;
      const want = {
        career: stanceOf(careerSum >= 2, careerMain.length > 0),
        wealth: stanceOf(wealth >= 2, wealthMain.length > 0),
        love: stanceOf(love >= 2, mainsOf(palaceOf(z, '夫妻')).length > 0),
        health: '互补',
        rhythm: !dax || tier === '—' ? '互补' : (() => {
          const good = ['吉', '大吉'].includes(tier);
          const bad = ['忌', '大忌'].includes(tier);
          const heavy = sha >= 2;
          if (good && heavy) return '有张力';
          if (bad && !heavy) return '有张力';
          if (!good && !bad && heavy) return '有张力';
          return '同向';
        })(),
      };
      for (const k of KEYS) if (item(c, k).stance !== want[k]) stanceFails.push(`${datetime}/${gender} ${k}: ${item(c, k).stance} ≠ ${want[k]}`);
      checked += 1;
    }
  }
  ok(`真实盘：${checked} 组盘面文案与独立复算一致`, textFails.length === 0, textFails.slice(0, 3).join(' | '));
  ok(`真实盘：${checked} 组盘面判断与独立复算一致`, stanceFails.length === 0, stanceFails.slice(0, 3).join(' | '));
}

// ── ⑧ 结构、确定性、输入不被改写、不折算分数
{
  const b = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '河北石家庄' });
  const z = compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male', address: '河北石家庄' });
  const beforeB = JSON.stringify(b);
  const beforeZ = JSON.stringify(z);
  const c1 = crossCheck(b, z);
  const c2 = crossCheck(b, z);

  ok('条目恰好五项', c1.items.length === 5, String(c1.items.length));
  eq('条目次序固定', c1.items.map((i) => i.key), KEYS);
  ok('每条只带六个字段', c1.items.every((i) => JSON.stringify(Object.keys(i).sort()) === JSON.stringify([...FIELDS].sort())));
  ok('没有折算成同一个分数', !c1.items.some((i) => Object.keys(i).some((k) => /score|total|weighted/i.test(k))));
  ok('判断只用三档', c1.items.every((i) => STANCES.includes(i.stance)));
  ok('两边说明都不为空', c1.items.every((i) => i.bazi && i.ziwei && i.note));
  ok('同输入两次结果相同', JSON.stringify(c1) === JSON.stringify(c2));
  ok('不改写传入的盘面', JSON.stringify(b) === beforeB && JSON.stringify(z) === beforeZ);

  // 两个入口（八字发起 / 紫微发起）必须得到同一份对照
  const viaB = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '河北石家庄', cross: true }).cross;
  const viaZ = compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male', address: '河北石家庄', cross: true }).cross;
  ok('八字入口与紫微入口的对照一致', JSON.stringify(viaB) === JSON.stringify(viaZ));
  ok('直接调 crossCheck 与 compute 的结果一致', JSON.stringify(c1) === JSON.stringify(viaB));
}

// ── ⑨ crossText 与空值
{
  const c = crossCheck(bz({ groups: { 官杀: 2 } }), zw({ 官禄: mains(1), 财帛: mains(1), 夫妻: mains(1), 疾厄: mains(1) }));
  const lines = crossText(c).split('\n');
  ok('文本五行一条', lines.length === 5, String(lines.length));
  ok('每行带两边与判断', lines.every((l) => l.startsWith('· ') && l.includes('八字——') && l.includes('紫微——') && l.includes('判断：')));
  ok('空结果给空串', crossText(null) === '' && crossText({}) === '');
}
