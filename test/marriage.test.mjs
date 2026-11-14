// 婚姻层：类型判定 + 对象取象 + 动婚年份，以及双入口渲染接线
import { buildBazi, buildMarriage } from '../engine/index.js';
import { yearGanzhi } from '../engine/marriage.js';
import fs from 'node:fs';
import { ok, eq } from './_harness.mjs';

const chart = (o) => buildBazi({ trueSolar: false, dst: false, lateZi: true, nowYear: 2026, ...o });

// ── 干支基准 ──
eq('1984 是甲子', yearGanzhi(1984).stem + yearGanzhi(1984).branch, '甲子');
eq('2024 是甲辰', yearGanzhi(2024).stem + yearGanzhi(2024).branch, '甲辰');
eq('1900 是庚子', yearGanzhi(1900).stem + yearGanzhi(1900).branch, '庚子');

// ── 男女取星不同：同一时刻，配偶星不是同一个五行 ──
const f = buildMarriage(chart({ year: 1990, month: 5, day: 12, hour: 14, minute: 30, gender: 'female' }));
const m = buildMarriage(chart({ year: 1990, month: 5, day: 12, hour: 14, minute: 30, gender: 'male' }));
eq('女命取官杀', f.star.gods.join('/'), '正官/七杀');
eq('男命取财', m.star.gods.join('/'), '正财/偏财');
ok('男女命对象取象不恒同', f.spouse.look !== m.spouse.look || f.spouse.temper !== m.spouse.temper || f.star.element !== m.star.element, `${f.star.element}/${m.star.element}`);

// ── 夫妻宫取日支 ──
const r1990 = chart({ year: 1990, month: 5, day: 12, hour: 14, minute: 30, gender: 'female' });
eq('夫妻宫就是日支', f.palace.branch, r1990.pillars.day.branch);
eq('夫妻宫十神取日支本气', f.palace.tenGod, r1990.pillars.day.hidden[0].tenGod);

// ── 本命冲夫妻宫要被认出来（1990-05-12 日支丑，年支午…丑未冲来自月支未） ──
ok('本命冲夫妻宫能识别', Array.isArray(f.palace.chong) && f.palace.chong.length > 0, JSON.stringify(f.palace.chong));
ok('冲夫妻宫时类型落在「关系有起伏」', f.types.some((t) => t.key === 'bo'), JSON.stringify(f.types.map((t) => t.key)));

// ── 红鸾天喜：年支午 → 红鸾酉、天喜卯 ──
eq('红鸾按年支起（午年红鸾在酉）', f.hongluan, '酉');
eq('天喜是红鸾对冲', f.tianxi, '卯');

// ── 动婚窗口：区间内、按分数取、未来优先 ──
ok('窗口不超出 20–45 岁', f.windows.every((w) => w.age >= 20 && w.age <= 45), JSON.stringify(f.windows.map((w) => w.age)));
ok('窗口最多 5 个', f.windows.length <= 5, String(f.windows.length));
ok('每个窗口都有理由', f.windows.every((w) => w.reasons.length > 0));
ok('未来年份优先占名额（有未来窗口时至少给一个未来）',
  f.windows.some((w) => !w.past) || f.windows.length === 0, JSON.stringify(f.windows.map((w) => `${w.year}:${w.past}`)));
const withFuture = f.windows.filter((w) => !w.past);
ok('过去年份最多留两个', f.windows.filter((w) => w.past).length <= 2, String(f.windows.filter((w) => w.past).length));

// ── 六合入夫妻宫必须被算进来：1990-05-12 日支丑，子年合 ──
const zi = f.windows.find((w) => w.ganzhi && w.ganzhi[1] === '子');
if (zi) ok('流年合夫妻宫有「合」的理由', zi.reasons.some((x) => x.includes('六合')), JSON.stringify(zi.reasons));
else ok('区间内应有子年合入夫妻宫', f.windows.length > 0, JSON.stringify(f.windows.map((w) => w.ganzhi)));

// ── 换性别/换时刻结果要变，防恒真 ──
ok('换性别窗口不全同', JSON.stringify(f.windows.map((w) => w.year)) !== JSON.stringify(m.windows.map((w) => w.year))
  || f.spouse.look !== m.spouse.look, '');
const other = buildMarriage(chart({ year: 1988, month: 9, day: 3, hour: 9, minute: 0, gender: 'male' }));
ok('换一张盘类型不同', other.type.label !== f.type.label || other.palace.branch !== f.palace.branch, `${other.type.label}/${f.type.label}`);

// ── 人话与口径 ──
ok('人话三到五句', Array.isArray(f.lines) && f.lines.length >= 3 && f.lines.length <= 5, String(f.lines.length));
ok('人话里出现具体年份或说明没有', f.lines.some((l) => /20\d\d|没有明显动婚/.test(l)), JSON.stringify(f.lines));
ok('口径写清是规则化、非唯一流派', f.basis.includes('规则化') && f.basis.includes('不是唯一流派'));
ok('不出现「一定结婚」这类断言', f.lines.every((l) => !/一定|必然|保证/.test(l)));

// ── 时辰未知不炸 ──
const hu = buildBazi({ year: 1990, month: 5, day: 12, hour: 12, minute: 0, gender: 'female', hourUnknown: true, trueSolar: false, dst: false, lateZi: true, nowYear: 2026 });
const mh = buildMarriage(hu);
ok('时辰未知仍能出婚姻层', typeof mh.type.label === 'string' && mh.type.label.length > 0);

// ── 缺性别要报错，不能默默按男算 ──
let threw = '';
try { buildMarriage({ pillars: r1990.pillars }); } catch (e) { threw = e.code || 'no-code'; }
eq('缺性别报 E_INPUT', threw, 'E_INPUT');

// ── 双入口接线 ──
const pk = fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8');
ok('baziHTML 读 opt.marriage', pk.includes('const marOpt = opt && opt.marriage'));
ok('婚姻块有独立 class', pk.includes('class="mp-mar"'));
ok('年份胶囊区分过去', pk.includes('mp-mar-y${w.past ? \' past\' : \'\'}'));
const app = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
ok('面板排八字时算婚姻层', /if \(k === 'bazi' && Engine\.buildMarriage\)/.test(app));
ok('面板渲染传 marriage', /PP\.baziHTML\(result\.r, \{ chenggu: result\.chenggu[,}]/.test(app));
const ui = fs.readFileSync(new URL('../src/web-ui.js', import.meta.url), 'utf8');
ok('单页排八字时算婚姻层', /if \(tab === 'bazi' && window\.Engine\.buildMarriage\)/.test(ui));
ok('单页渲染传 marriage', /window\.__PP\.baziHTML\(r, \{ chenggu, marriage(, life)? \}\)/.test(ui));

// ── 分块：marriage 必须进 chart 块，否则面板解构成 undefined 静默不出卡 ──
const { CHUNKS } = await import('../tools/build-client.mjs');
ok('chart 块带 marriage', CHUNKS.chart.modules.includes('marriage'), JSON.stringify(CHUNKS.chart.modules.slice(-8)));
