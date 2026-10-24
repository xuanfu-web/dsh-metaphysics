// 口径差异引擎：结构化比对 + 根因归纳 + 文本渲染
import { diffObjects, summarize, renderDiff, labelOf, rootOf, categoryOf } from '../engine/diff.js';
import { compute } from '../engine/index.js';
import { ok } from './_harness.mjs';

// ── 纯函数：diffObjects ──
ok('相同对象无差异', diffObjects({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }).length === 0, '应为空');
const d1 = diffObjects({ pillars: { day: { ganzhi: '丙辰' } } }, { pillars: { day: { ganzhi: '乙卯' } } });
ok('嵌套路径正确', d1.length === 1 && d1[0].path === 'pillars.day.ganzhi', JSON.stringify(d1));
ok('新旧值正确', d1[0].from === '丙辰' && d1[0].to === '乙卯', JSON.stringify(d1[0]));
ok('忽略口径回显 input',
  diffObjects({ input: { lateZi: true } }, { input: { lateZi: false } }).length === 0, 'input 不应计入');
ok('忽略内部儒略日 jd',
  diffObjects({ jieqi: { jd: 19547 } }, { jieqi: { jd: 19569 } }).length === 0, 'jd 不应计入');
ok('数组按整体比较',
  diffObjects({ a: [1, 2] }, { a: [1, 3] }).length === 1, '数组变了应记 1 处');

// ── 标签与归类 ──
ok('日柱标签', labelOf('pillars.day.ganzhi') === '日柱', labelOf('pillars.day.ganzhi'));
ok('大运归类', categoryOf('dayun.list.3.luck.score') === '大运', categoryOf('dayun.list.3.luck.score'));
ok('根因识别：柱干支', rootOf('pillars.month.ganzhi') === '柱', String(rootOf('pillars.month.ganzhi')));
ok('非根因：十神', rootOf('pillars.day.stemTenGod') === '', String(rootOf('pillars.day.stemTenGod')));

// ── 归纳语 ──
ok('零差异的文案', summarize([]).includes('不受此口径影响'), summarize([]));
const ds = [
  { path: 'pillars.day.ganzhi', from: '丙辰', to: '乙卯' },
  { path: 'shensha.count', from: 17, to: 15 },
];
const s = summarize(ds);
ok('归纳含根因', s.includes('根因') && s.includes('日柱'), s);
ok('归纳含连带', s.includes('神煞') && s.includes('2 处'), s);
ok('渲染含标题', renderDiff(ds, { title: 'T' }).startsWith('【T】'), '标题应首行');

// ── 集成：真实排盘 ──
// 23:40 出生 → 晚子时换日会改日柱，必须能检出
const A = compute({ system: 'bazi', datetime: '1996-01-19T23:40', gender: 'male', address: '安徽池州', lateZi: true });
const B = compute({ system: 'bazi', datetime: '1996-01-19T23:40', gender: 'male', address: '安徽池州', lateZi: false });
const diffs = diffObjects(A, B);
const dayChanged = diffs.some((d) => d.path === 'pillars.day.ganzhi');
ok('晚子时换日能检出日柱变化', dayChanged && diffs.length > 0, `共 ${diffs.length} 处`);
ok('口径差异不改变输入回显', !diffs.some((d) => d.path.startsWith('input.')), '不应出现 input.*');
ok('归纳可读', !summarize(diffs).includes('undefined'), summarize(diffs));

// 正午出生 → 晚子时开关不应有任何影响
const C = compute({ system: 'bazi', datetime: '1996-01-19T12:00', gender: 'male', address: '安徽池州', lateZi: true });
const D = compute({ system: 'bazi', datetime: '1996-01-19T12:00', gender: 'male', address: '安徽池州', lateZi: false });
ok('正午出生不受晚子时口径影响', diffObjects(C, D).length === 0, `${diffObjects(C, D).length} 处`);

// 真太阳时开关：有经度时应有可检出的变化（时柱或大运起运相关）
const E = compute({ system: 'bazi', datetime: '1996-01-19T06:05', gender: 'male', address: '新疆喀什', trueSolar: true });
const F = compute({ system: 'bazi', datetime: '1996-01-19T06:05', gender: 'male', address: '新疆喀什', trueSolar: false });
ok('真太阳时开关有可检出差异', diffObjects(E, F).length > 0, `${diffObjects(E, F).length} 处`);
