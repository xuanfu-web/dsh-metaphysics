// 紫微 · 十类流派开关：默认盘必须一字不变，显式切换才改盘。
// 覆盖：亮度 / 庚干四化 / 天马 / 天空 / 截空旬空 / 魁钺 / 天伤天使 / 长生 / 晚子时；身主两派另见 ziwei-shenzhu.test.mjs。
import { compute } from '../engine/index.js';
import {
  buildZiwei, ziweiSchoolsOf, schoolBrightness,
  ZIWEI_SCHOOL_DEFAULTS, ZIWEI_SCHOOL_OPTIONS, BRIGHTNESS_SCHOOLS,
} from '../engine/ziwei.js';
import { ok, eq } from './_harness.mjs';

const BASE = {
  year: 1990, month: 6, day: 15, hour: 10, minute: 0,
  gender: 'male', trueSolar: false, dst: false, asOf: '2026-10-30T12:00',
};
const starBranch = (r, name) => r.palaces.find((p) => p.stars.some((s) => s.name === name))?.branch ?? null;
const starNames = (r) => r.palaces.flatMap((p) => p.stars.map((s) => s.name));
const starCount = (r) => starNames(r).length;
const mainBrightness = (r) => r.palaces.flatMap((p) => p.stars
  .filter((s) => s.type === '主星').map((s) => `${s.name}@${p.branch}:${s.brightness}`));
const palaceShas = (r) => r.palaces.map((p) => p.shensha);
const mutagens = (r) => r.palaces.flatMap((p) => p.stars)
  .filter((s) => s.mutagen).map((s) => `${s.name}${s.mutagen}`).sort();

// ── 一、开关表与默认值 ─────────────────────────────────────
eq('十类开关', Object.keys(ZIWEI_SCHOOL_OPTIONS).length, 10);
ok('默认值都在可选范围内', Object.entries(ZIWEI_SCHOOL_DEFAULTS)
  .every(([k, v]) => ZIWEI_SCHOOL_OPTIONS[k].includes(v)));
eq('全部走默认', ziweiSchoolsOf({}), { ...ZIWEI_SCHOOL_DEFAULTS });
eq('不认识的取值回默认', ziweiSchoolsOf({ brightnessSchool: 'nope' }).brightnessSchool, 'default');
eq('平铺参数生效', ziweiSchoolsOf({ tianmaSchool: 'month-branch' }).tianmaSchool, 'month-branch');
eq('嵌套 schools 生效', ziweiSchoolsOf({ schools: { kuiyueSchool: 'qs2' } }).kuiyueSchool, 'qs2');
eq('平铺优先于嵌套', ziweiSchoolsOf({ tiankongSchool: 'normal', schools: { tiankongSchool: 'off' } }).tiankongSchool, 'normal');

// ── 二、默认盘不变 ─────────────────────────────────────────
const DEF = buildZiwei(BASE);
eq('默认仍是 49 颗星', starCount(DEF), 49);
eq('默认不排天空截空旬空', ['天空', '截空', '副截', '旬空', '副旬'].filter((n) => starNames(DEF).includes(n)), []);
eq('盘里回显默认开关', DEF.schools, { ...ZIWEI_SCHOOL_DEFAULTS });
eq('input 里也回显', DEF.input.schools, { ...ZIWEI_SCHOOL_DEFAULTS });
const EXPLICIT_DEFAULT = buildZiwei({
  ...BASE,
  ...ZIWEI_SCHOOL_DEFAULTS,
  schools: { ...ZIWEI_SCHOOL_DEFAULTS },
});
eq('显式写默认值 = 不写', JSON.stringify(EXPLICIT_DEFAULT.palaces), JSON.stringify(DEF.palaces));
ok('默认摘要不插流派行', !/【流派】/.test(compute({ system: 'ziwei', datetime: '1990-06-15T10:00', gender: 'male' }).summary));

// ── 三、亮度流派 ───────────────────────────────────────────
eq('亮度表覆盖十四主星', Object.keys(BRIGHTNESS_SCHOOLS.QS.rows).length, 14);
eq('默认亮度取内置表', schoolBrightness('紫微', 2), '庙');
eq('QS 紫微在寅为旺', schoolBrightness('紫微', 2, 'QS'), '旺');
eq('ZZ 太阴在寅为闲', schoolBrightness('太阴', 2, 'ZZ'), '闲');
eq('XD2 太阴在寅为陷', schoolBrightness('太阴', 2, 'XD2'), '陷');
eq('未收录的星不硬标', schoolBrightness('文昌', 0, 'QS'), undefined);
const QS = buildZiwei({ ...BASE, brightnessSchool: 'QS' });
eq('换亮度不改星位', starNames(QS), starNames(DEF));
eq('QS 太阳丑由陷转不', mainBrightness(QS).includes('太阳@丑:不'), true);
eq('QS 天梁巳由陷转得', mainBrightness(QS).includes('天梁@巳:得'), true);
eq('默认太阳丑仍是陷', mainBrightness(DEF).includes('太阳@丑:陷'), true);
eq('辅星不带亮度', QS.palaces.flatMap((p) => p.stars).find((s) => s.name === '文昌').brightness, undefined);
eq('十四主星都带亮度', QS.palaces.flatMap((p) => p.stars).filter((s) => s.type === '主星' && s.brightness).length, 14);

// ── 四、庚干四化 ───────────────────────────────────────────
eq('默认庚干阳武阴同', mutagens(DEF), ['太阳禄', '太阴科', '武曲权', '天同忌'].sort());
eq('GYWTY 同科阴忌', mutagens(buildZiwei({ ...BASE, gengYearSihua: 'GYWTY' })), ['太阳禄', '太阴忌', '武曲权', '天同科'].sort());
eq('GYWFT 天府化科', mutagens(buildZiwei({ ...BASE, gengYearSihua: 'GYWFT' })), ['太阳禄', '天府科', '武曲权', '天同忌'].sort());
eq('GYWFX 天相化忌', mutagens(buildZiwei({ ...BASE, gengYearSihua: 'GYWFX' })), ['太阳禄', '天府科', '天相忌', '武曲权'].sort());
eq('GYWTX 同科相忌', mutagens(buildZiwei({ ...BASE, gengYearSihua: 'GYWTX' })), ['太阳禄', '天相忌', '武曲权', '天同科'].sort());
const XIN = { ...BASE, year: 1991, month: 5, day: 12 };
eq('非庚年四化不受影响', mutagens(buildZiwei({ ...XIN, gengYearSihua: 'GYWFX' })), mutagens(buildZiwei(XIN)));
eq('庚干变体不动宫干自化', buildZiwei({ ...BASE, gengYearSihua: 'GYWFX' }).palaces.map((p) => p.selfHua),
  DEF.palaces.map((p) => p.selfHua));

// ── 五、天马 ───────────────────────────────────────────────
const MAR = { ...BASE, year: 1990, month: 3, day: 15 };
eq('天马默认按年支', starBranch(buildZiwei(MAR), '天马'), '申');
eq('天马可切生月', starBranch(buildZiwei({ ...MAR, tianmaSchool: 'month-branch' }), '天马'), '巳');
eq('换天马不改星数', starCount(buildZiwei({ ...MAR, tianmaSchool: 'month-branch' })), 49);

// ── 六、天空 / 截空旬空 ───────────────────────────────────
eq('天空 normal 在年支后一位', starBranch(buildZiwei({ ...BASE, tiankongSchool: 'normal' }), '天空'), '未');
eq('天空加生时', starBranch(buildZiwei({ ...BASE, tiankongSchool: 'shun-jia-shi' }), '天空'), '亥');
eq('天空多一颗', starCount(buildZiwei({ ...BASE, tiankongSchool: 'normal' })), 50);

const JS = buildZiwei({ ...BASE, jiekongSchool: 'single' });
const JD = buildZiwei({ ...BASE, jiekongSchool: 'double' });
eq('截空单星 庚年在未', starBranch(JS, '截空'), '未');
eq('单星不排副截', starBranch(JS, '副截'), null);
eq('单星仍排旬空副旬', [starBranch(JS, '旬空'), starBranch(JS, '副旬')], ['戌', '亥']);
eq('单星盘星数', starCount(JS), 52);
eq('正副双星', [starBranch(JD, '截空'), starBranch(JD, '副截')], ['午', '未']);
eq('双星盘星数', starCount(JD), 53);
const WU = { ...BASE, year: 1988, month: 6, day: 15 };
eq('戊年单星截空在子', starBranch(buildZiwei({ ...WU, jiekongSchool: 'single' }), '截空'), '子');
eq('戊年占验派截空在戌', starBranch(buildZiwei({ ...WU, jiekongSchool: 'zhanyan' }), '截空'), '戌');
eq('空曜默认不挤占星数', [starCount(DEF), starCount(buildZiwei({ ...BASE, tiankongSchool: 'normal', jiekongSchool: 'double' }))], [49, 54]);

// ── 七、魁钺四派 ───────────────────────────────────────────
const KY = (school) => [starBranch(buildZiwei({ ...BASE, kuiyueSchool: school }), '天魁'),
  starBranch(buildZiwei({ ...BASE, kuiyueSchool: school }), '天钺')];
eq('魁钺默认 qs1', KY('qs1'), ['丑', '未']);
eq('qs2 庚年在午寅', KY('qs2'), ['午', '寅']);
eq('中一鸣在寅午', KY('zhong-yiming'), ['寅', '午']);
eq('网络派与 qs1 同', KY('network'), ['丑', '未']);

// ── 八、天伤天使 ───────────────────────────────────────────
const YIN_M = { ...BASE, year: 1991, month: 5, day: 12, gender: 'male' };
const YIN_F = { ...YIN_M, gender: 'female' };
eq('阴男默认天伤交友天使疾厄',
  [starBranch(buildZiwei(YIN_M), '天伤'), starBranch(buildZiwei(YIN_M), '天使')], ['辰', '午']);
eq('中州派阴男互换',
  [starBranch(buildZiwei({ ...YIN_M, tianshiTianshang: 'zhongzhou' }), '天伤'),
    starBranch(buildZiwei({ ...YIN_M, tianshiTianshang: 'zhongzhou' }), '天使')], ['午', '辰']);
eq('中州派阴女不换',
  [starBranch(buildZiwei({ ...YIN_F, tianshiTianshang: 'zhongzhou' }), '天伤'),
    starBranch(buildZiwei({ ...YIN_F, tianshiTianshang: 'zhongzhou' }), '天使')], ['辰', '午']);
eq('中州派阳男不换',
  [starBranch(buildZiwei({ ...BASE, tianshiTianshang: 'zhongzhou' }), '天伤'),
    starBranch(buildZiwei({ ...BASE, tianshiTianshang: 'zhongzhou' }), '天使')],
  [starBranch(DEF, '天伤'), starBranch(DEF, '天使')]);

// ── 九、长生起点 ───────────────────────────────────────────
const TU = { ...BASE, month: 2, day: 25 };
const TU_DEF = buildZiwei(TU);
eq('取到土五局', TU_DEF.bureau.number, 5);
eq('默认土五局长生在申', TU_DEF.palaces.find((p) => p.branch === '申').shensha.changsheng, '长生');
eq('火土派土五局长生在寅', buildZiwei({ ...TU, changshengSchool: 'huo-tu' })
  .palaces.find((p) => p.branch === '寅').shensha.changsheng, '长生');
eq('水二派与默认同', palaceShas(buildZiwei({ ...TU, changshengSchool: 'shui-tu' })), palaceShas(TU_DEF));
const HUO_OTHER = buildZiwei({ ...BASE, changshengSchool: 'huo-tu' });
eq('非土五局不受火土派影响', palaceShas(HUO_OTHER), palaceShas(DEF));

// ── 十、晚子时 ─────────────────────────────────────────────
const ZI = { ...BASE, hour: 23, minute: 30 };
const zi = (mode) => buildZiwei({ ...ZI, lateZishi: mode });
eq('默认晚子时算当日', zi('current-day').lunar.day, 23);
eq('next-day 顺延起盘日', zi('next-day').lunar.day, 24);
eq('all-current 等同当日', zi('all-current').lunar.day, 23);
eq('day-cur-time-next 不改起盘日', zi('day-cur-time-next').lunar.day, 23);
eq('晚子时不影响白天盘', buildZiwei({ ...BASE, lateZishi: 'next-day' }).lunar.day, DEF.lunar.day);
eq('起盘日后延但时辰不变', zi('next-day').hourBranch, '子');

// ── 十一、接线：compute / 摘要 / 规则 ─────────────────────
const C = compute({ system: 'ziwei', datetime: '1990-06-15T10:00', gender: 'male', brightnessSchool: 'QS', jiekongSchool: 'double' });
eq('compute 回显开关', [C.schools.brightnessSchool, C.schools.jiekongSchool], ['QS', 'double']);
ok('compute 摘要写流派行', /【流派】.*亮度 QS.*截空 double/.test(C.summary),
  C.summary.split('\n').find((l) => /流派/.test(l)));
ok('规则里列全九项', /亮度 QS/.test(C.rules.schools) && /晚子时 current-day/.test(C.rules.schools), C.rules.schools);
const NEST = compute({ system: 'ziwei', datetime: '1990-06-15T10:00', gender: 'male', schools: { tianmaSchool: 'month-branch' } });
eq('compute 接受嵌套 schools', NEST.schools.tianmaSchool, 'month-branch');
const BAD = compute({ system: 'ziwei', datetime: '1990-06-15T10:00', gender: 'male', brightnessSchool: 'nope' });
eq('compute 非法值静默回默认', BAD.schools.brightnessSchool, 'default');
const CROSS = compute({ system: 'bazi', datetime: '1990-06-15T10:00', gender: 'male', cross: true, gengYearSihua: 'GYWFX', tianmaSchool: 'month-branch' });
ok('八字交叉验证也接受流派参数', !!CROSS.cross);
const DET = buildZiwei({ ...BASE, kuiyueSchool: 'qs2' });
eq('同参数可复现', JSON.stringify(buildZiwei({ ...BASE, kuiyueSchool: 'qs2' }).palaces), JSON.stringify(DET.palaces));
