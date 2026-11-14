// 人生六面：事业 / 财运 / 学业 / 健康 / 子女 / 六亲
import { buildBazi } from '../engine/index.js';
import { buildFacets, lifeYearGanzhi } from '../engine/facets.js';
import { ok, eq } from './_harness.mjs';

const mk = (o) => buildBazi({ trueSolar: false, dst: false, lateZi: true, nowYear: 2026, ...o });
const A = mk({ year: 1990, month: 5, day: 12, hour: 14, minute: 30, gender: 'female' });
const B = mk({ year: 1985, month: 11, day: 3, hour: 9, minute: 0, gender: 'male' });
const fa = buildFacets(A);
const fb = buildFacets(B);

// ── 六面齐全 ──
for (const k of ['career', 'wealth', 'study', 'health', 'children', 'kin']) {
  ok(`六面齐：${k}`, fa[k] && Array.isArray(fa[k].lines) && fa[k].lines.length >= 2, k);
  ok(`${k} 写清口径`, typeof fa[k].basis === 'string' && fa[k].basis.includes('规则化') === (k !== 'health' && k !== 'children' && k !== 'kin'), fa[k].basis.slice(0, 30));
}

// ── 干支基准 ──
eq('1984 甲子', `${lifeYearGanzhi(1984).stem}${lifeYearGanzhi(1984).branch}`, '甲子');
eq('2026 丙午', `${lifeYearGanzhi(2026).stem}${lifeYearGanzhi(2026).branch}`, '丙午');

// ── 事业：类型随盘变，不能恒定 ──
ok('两张盘事业类型不同', fa.career.type.label !== fb.career.type.label || fa.career.topGroup !== fb.career.topGroup,
  `${fa.career.type.label} / ${fb.career.type.label}`);
ok('事业有顺的方向（喜用五行→行业）', fa.career.favorText.length > 0 && fa.career.favorText.includes('这类'));
ok('事业窗口都在 20–55 岁', fa.career.windows.every((w) => w.age >= 20 && w.age <= 55), JSON.stringify(fa.career.windows.map((w) => w.age)));
ok('事业窗口最多 5 个', fa.career.windows.length <= 5, String(fa.career.windows.length));
ok('事业窗口每条都有理由', fa.career.windows.every((w) => w.reasons.length > 0));
ok('事业窗口不重复同一句理由超过两次',
  (() => {
    const c = {};
    for (const w of fa.career.windows) { const k = w.reasons[0]; c[k] = (c[k] || 0) + 1; }
    return Object.values(c).every((n) => n <= 2);
  })(), JSON.stringify(fa.career.windows.map((w) => w.reasons[0])));

// ── 财运：分账年不许混进财路窗口 ──
ok('财运量级是档位之一', ['富', '小康以上', '小康', '平', '过手财（赚得到也花得快）', '守成为主（比劫重，财留不住）', '偏薄（财星不显，靠技艺或固定收入）'].includes(fa.wealth.tier), fa.wealth.tier);
ok('财路窗口里不含比劫理由', fa.wealth.windows.every((w) => !w.reasons.some((r) => r.includes('比劫') || r.includes('花销'))),
  JSON.stringify(fa.wealth.windows.map((w) => w.reasons)));
const leakLine = fa.wealth.lines.find((l) => l.includes('比劫当值')) || '';
ok('分账年单独成句，且只提已经过去的之后（不翻旧账）', !/20(1\d|2[0-6])\b/.test(leakLine), leakLine);
ok('两张盘量级不同', fa.wealth.tier !== fb.wealth.tier, `${fa.wealth.tier} / ${fb.wealth.tier}`);

// ── 学业 ──
ok('学业给出分档', typeof fa.study.tier === 'string' && fa.study.tier.length > 2, fa.study.tier);
ok('学业窗口落在 12–30 岁', fa.study.windows.every((w) => w.age >= 12 && w.age <= 30), JSON.stringify(fa.study.windows.map((w) => w.age)));

// ── 健康：指向的脏腑必须与最旺五行一致 ──
const ORGAN_OF = { 木: '肝胆', 火: '心', 土: '脾胃', 金: '肺', 水: '肾' };
ok('最旺五行的脏腑对得上', fa.health.most.organ.includes(ORGAN_OF[fa.health.most.element]), `${fa.health.most.element}→${fa.health.most.organ}`);
ok('最弱五行的脏腑对得上', fa.health.least.organ.includes(ORGAN_OF[fa.health.least.element]), `${fa.health.least.element}→${fa.health.least.organ}`);
ok('健康段不做诊断', fa.health.lines.some((l) => l.includes('不诊断')), fa.health.lines.join(' ').slice(-40));
ok('健康不出现「会得」式断言', fa.health.lines.every((l) => !/会得|一定患|必然病/.test(l)));
ok('健康年份不超过 4 个', fa.health.years.length <= 4, JSON.stringify(fa.health.years));

// ── 子女：男女取星不同 ──
eq('女命子女星取食伤', fa.children.gods.join('/'), '食神/伤官');
eq('男命子女星取官杀', fb.children.gods.join('/'), '正官/七杀');
ok('子女只论厚薄不推个数', fa.children.lines.some((l) => l.includes('论不到具体的个数')));
ok('子女不写「几个孩子」', fa.children.lines.every((l) => !/\d+\s*个孩子|一男一女/.test(l)));

// ── 六亲：三行齐全 ──
eq('六亲三行', fa.kin.rows.map((r) => r.who).join('/'), '父/母/兄弟姐妹');
ok('六亲按偏财正印比劫取', fa.kin.rows.map((r) => r.god).join('/') === '偏财/正印/比劫');
ok('六亲不断生死', fa.kin.lines.every((l) => !/去世|亡|寿元/.test(l)));

// ── 缺输入要报错 ──
let code = '';
try { buildFacets({ pillars: {} }); } catch (e) { code = e.code || 'none'; }
eq('缺盘报 E_INPUT', code, 'E_INPUT');
let code2 = '';
try { buildFacets(null); } catch (e) { code2 = e.code || 'none'; }
eq('传 null 报 E_INPUT', code2, 'E_INPUT');

// ── 时辰未知：时柱没有也不许炸 ──
const hu = buildFacets(mk({ year: 1990, month: 5, day: 12, hour: 12, minute: 0, gender: 'female', hourUnknown: true }));
ok('时辰未知时六面仍出', hu.career.lines.length > 0 && hu.children.lines.some((l) => l.includes('时柱未知')),
  JSON.stringify(hu.children.lines));

// ── 换盘结果要变，防恒真 ──
ok('换盘事业窗口不全同', JSON.stringify(fa.career.windows.map((w) => w.year)) !== JSON.stringify(fb.career.windows.map((w) => w.year)));
ok('换盘健康年份不全同', JSON.stringify(fa.health.years) !== JSON.stringify(fb.health.years));
