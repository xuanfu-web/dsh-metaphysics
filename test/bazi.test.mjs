import { buildBazi, HIDDEN_STEMS } from '../engine/bazi.js';

import { ok } from './_harness.mjs';

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

// 7) 真太阳时跨午夜：东经 128.6° 一带，23:40 的北京钟面折成真太阳刚好落在 00:00 前后。
// 旧 jdToParts 把 23:59:45 四舍五入成 00:00 又不进日，这一带会排出甲辰日甲子时——
// 时刻写着子时、日柱留在前一天，盘面自相矛盾。跨过去之后四处必须仍是同一套四柱。
const edgeBad = [];
for (const lon of [120, 128.5, 128.63, 128.64, 128.7]) {
  const r = buildBazi({ year: 2024, month: 2, day: 10, hour: 23, minute: 40, gender: 'male', longitude: lon });
  const got = four(r);
  const hh = Number(r.solarTime.trueSolarText.slice(11, 13));
  if (got !== '甲辰 丙寅 乙巳 丙子' || (hh !== 23 && hh !== 0)) edgeBad.push(`${lon}：${r.solarTime.trueSolarText} ${got}`);
}
ok('真太阳跨午夜四柱不跳（120/128.5/128.63/128.64/128.7）', edgeBad.length === 0, edgeBad.join('；'));

// 8) 巳藏干次序：丙（本气）庚（中气）戊（余气）
// 依据：巳月人元司权为「戊 5 日 → 庚 9 日 → 丙 16 日」（RENYUAN_TABLE），与藏干互为倒序；
// 庚长生于巳，按「长生=中气」应与寅（甲丙戊）、申（庚壬戊）、亥（壬甲）同构。
// 旧表写成「丙戊庚」，把中气误给了戊土、余气误给了庚金，见巳的盘土 +0.2、金 −0.2。
ok('巳藏干为丙庚戊', HIDDEN_STEMS.巳.join('') === '丙庚戊', HIDDEN_STEMS.巳.join(''));
const si = buildBazi({ year: 1990, month: 5, day: 12, hour: 14, minute: 30, gender: 'male', trueSolar: false });
const siMonth = si.pillars.month;
ok('巳藏干角色序：丙本气/庚中气/戊余气',
  siMonth.hidden.map((h) => h.stem + h.role).join(',') === '丙本气,庚中气,戊余气',
  siMonth.hidden.map((h) => h.stem + h.role).join(','));
ok('巳中庚按中气计 0.5 分（庚午 辛巳 丁丑 丁未：金 2.8 / 土 2.8）',
  si.wuxing['金'] === 2.8 && si.wuxing['土'] === 2.8, JSON.stringify(si.wuxing));
