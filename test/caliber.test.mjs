// 口径声明：同一件事（晚子时怎么算、有没有真太阳时）在每个体系的输出里都要写明。
//
// 0.14.1 及以前：八字/六壬默认「23:00 后换日」，奇门默认「不换日」，参数名还分成
// lateZi 与 lateZiHourMode 两套；没给经度时只在一行括号里提一句，用户很容易忽略。
import { compute } from '../engine/index.js';
import { ok } from './_harness.mjs';

const day = (r) => (r.pillars ? r.pillars.day.ganzhi : r.siZhu ? r.siZhu.day : r.dayGanZhi);

// ── ① 八字：晚子时开关与声明 ─────────────────────────────────
const late = compute({ system: 'bazi', datetime: '1990-05-12T23:30', gender: 'male', trueSolar: false });
const same = compute({ system: 'bazi', datetime: '1990-05-12T23:30', gender: 'male', trueSolar: false, lateZi: false });
ok('八字：默认换日并写明', /晚子时：23:00 后算次日/.test(late.summary));
ok('八字：关闭后写明不换日', /晚子时：23:00 后仍算当日/.test(same.summary));
ok('八字：换日与否会改变日柱', day(late) !== day(same), `${day(late)} vs ${day(same)}`);

// ── ② 奇门：两套参数名互为别名 ───────────────────────────────
const qA = compute({ system: 'qimen', datetime: '2026-10-24T23:30', lateZiHourMode: 'next-day' });
const qB = compute({ system: 'qimen', datetime: '2026-10-24T23:30', lateZi: true });
const qC = compute({ system: 'qimen', datetime: '2026-10-24T23:30' });
ok('奇门：lateZi 等价于 lateZiHourMode=next-day', day(qA) === day(qB), `${day(qA)} vs ${day(qB)}`);
ok('奇门：默认不换日（保持原口径）', /23:00 后仍归当日/.test(qC.summary));
ok('奇门：换日时摘要写明', /23:00 后归次日/.test(qA.summary));
ok('奇门：默认与换日的日柱确实不同', day(qA) !== day(qC), `${day(qA)} vs ${day(qC)}`);

// ── ③ 大六壬：口径写进摘要 ───────────────────────────────────
const dl = compute({ system: 'daliuren', datetime: '2026-10-24T23:30' });
ok('大六壬：摘要写明晚子时口径', /晚子时换日/.test(dl.summary));
ok('大六壬：关闭后写不换日', /晚子时不换日/.test(compute({
  system: 'daliuren', datetime: '2026-10-24T23:30', lateZi: false,
}).summary));

// ── ④ 无经度：必须显式告警 ───────────────────────────────────
const noGeo = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male' });
ok('八字：无经度时摘要顶部告警', noGeo.summary.startsWith('⚠') && /未提供出生地或经度/.test(noGeo.summary), noGeo.summary.split('\n')[0]);
const withGeo = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', longitude: 116.4 });
ok('八字：给经度后不再告警', !/未提供出生地或经度/.test(withGeo.summary));
const zw = compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male' });
ok('紫微：无经度同样告警', /未提供出生地或经度/.test(zw.summary));
