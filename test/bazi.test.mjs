import { buildBazi } from '../engine/bazi.js';

const ok = (label, cond, extra = '') =>
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${label}${extra ? '  -> ' + extra : ''}`);

const four = (r) => ['year', 'month', 'day', 'hour'].map((k) => r.pillars[k].ganzhi).join(' ');

// 1) 2000-01-01 00:00 北京：己卯 丙子 戊午 壬子（经典校验例）
const a = buildBazi({ year: 2000, month: 1, day: 1, hour: 0, minute: 0, gender: 'male', trueSolar: false });
ok('2000-01-01 00:00', four(a) === '己卯 丙子 戊午 壬子', four(a));
ok('  日主', a.dayMaster.stem === '戊', a.dayMaster.stem);
ok('  空亡', a.kongwang.join('') === '子丑', a.kongwang.join(''));
ok('  大运逆行(阴年男)', a.dayun.direction === '逆行', a.dayun.direction);

// 2) 2024 立春前后各一小时
const before = buildBazi({ year: 2024, month: 2, day: 4, hour: 15, minute: 0, gender: 'female', trueSolar: false });
const after = buildBazi({ year: 2024, month: 2, day: 4, hour: 18, minute: 0, gender: 'female', trueSolar: false });
ok('2024 立春前 年柱=癸卯', before.pillars.year.ganzhi === '癸卯', before.pillars.year.ganzhi);
ok('2024 立春前 月柱=乙丑', before.pillars.month.ganzhi === '乙丑', before.pillars.month.ganzhi);
ok('2024 立春后 年柱=甲辰', after.pillars.year.ganzhi === '甲辰', after.pillars.year.ganzhi);
ok('2024 立春后 月柱=丙寅', after.pillars.month.ganzhi === '丙寅', after.pillars.month.ganzhi);

// 3) 1984-02-02 未到立春（1984-02-04 23:25），应为癸亥年
const c = buildBazi({ year: 1984, month: 2, day: 2, hour: 12, minute: 0, gender: 'male', trueSolar: false });
ok('1984-02-02 年柱=癸亥', c.pillars.year.ganzhi === '癸亥', c.pillars.year.ganzhi);

// 4) 时辰边界：23:00 晚子时换日
const z1 = buildBazi({ year: 2000, month: 1, day: 1, hour: 22, minute: 30, gender: 'male', trueSolar: false });
const z2 = buildBazi({ year: 2000, month: 1, day: 1, hour: 23, minute: 30, gender: 'male', trueSolar: false });
ok('22:30 日柱=戊午', z1.pillars.day.ganzhi === '戊午', z1.pillars.day.ganzhi);
ok('23:30 晚子时换日=己未', z2.pillars.day.ganzhi === '己未', z2.pillars.day.ganzhi);
ok('23:30 时柱=甲子', z2.pillars.hour.ganzhi === '甲子', z2.pillars.hour.ganzhi);

// 5) 十神自检：戊土日主，见甲为七杀、见癸为正财
const d = buildBazi({ year: 2000, month: 1, day: 1, hour: 0, minute: 0, gender: 'male', trueSolar: false });
console.log('  年干 己 对 戊 ->', d.pillars.year.stemTenGod, '（应劫财）');
console.log('  月干 丙 对 戊 ->', d.pillars.month.stemTenGod, '（应偏印）');
console.log('  时干 壬 对 戊 ->', d.pillars.hour.stemTenGod, '（应偏财）');
console.log('  五行:', JSON.stringify(d.wuxing));
console.log('  大运:', d.dayun.list.slice(0, 3).map((x) => `${x.startAge}岁 ${x.ganzhi}`).join(' / '));

// 6) 真太阳时：乌鲁木齐（东经 87.6）出生，时柱应比北京时间晚约 2 小时
const urumqi = buildBazi({ year: 2000, month: 1, day: 1, hour: 0, minute: 30, gender: 'male', longitude: 87.6 });
console.log('  乌鲁木齐 00:30 真太阳时 ->', urumqi.solarTime.trueSolarText, urumqi.jieqi.nearBoundaryMinutes, '分钟');
console.log('  时柱:', urumqi.pillars.hour.ganzhi);
