// 紫微 · 十三类流派开关：默认盘必须一字不变，显式切换才改盘。
// 覆盖：亮度 / 庚干四化 / 天马 / 天空 / 截空旬空 / 魁钺 / 天伤天使 / 长生 / 晚子时 / 杂曜全表 / 流年四化取干 / 十干四化变体；身主两派另见 ziwei-shenzhu.test.mjs。
import fs from 'node:fs';
import { compute } from '../engine/index.js';
import {
  buildZiwei, ziweiSchoolsOf, schoolBrightness, sihuaTableOf, natalSihuaTableOf, SIHUA_VARIANTS,
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
// 键名一起钉住：加一类要写理由，删一类会动到旧盘与存档，谁都不能顺手改
eq('十三类开关', Object.keys(ZIWEI_SCHOOL_OPTIONS).sort().join(','),
  ['brightnessSchool', 'changshengSchool', 'gengYearSihua', 'jiekongSchool', 'kuiyueSchool',
    'lateZishi', 'liunianSihua', 'shenzhuSchool', 'sihuaVariant', 'tiankongSchool', 'tianmaSchool',
    'tianshiTianshang', 'zuoyaoSchool'].sort().join(','));
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
ok('网络派不再单列（与 qs1 完全同表）', !ZIWEI_SCHOOL_OPTIONS.kuiyueSchool.includes('network'));

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

// ── 十一、流年四化取干 ─────────────────────────────────────
// 两条口径都要能落到 mutagen / mutagenHits / sihuaStem 三处，且默认盘一字不动。
// 这两干各依不同的表（年干随年份、命宫宫干由五虎遁从生年干起），所以实测十二年
// 会换十二次；断言只钉「换过」，不钉具体换几次——那是数据，不是约束。
const LN_BASE = { ...BASE, asOf: '2026-01-01' };
const LN_YEAR = buildZiwei(LN_BASE);
const LN_LIFE = buildZiwei({ ...LN_BASE, liunianSihua: 'life-palace-stem' });
eq('流年四化默认按流年天干', LN_YEAR.schools.liunianSihua, 'year-stem');
eq('默认口径的取干就是年干', LN_YEAR.liunian[0].sihuaStem, LN_YEAR.liunian[0].ganzhi[0]);
eq('默认口径回显来源', LN_YEAR.liunian[0].sihuaStemFrom, '流年天干');
eq('按命宫宫干时取的是该宫 stem', LN_LIFE.liunian[0].sihuaStem,
  LN_LIFE.palaces.find((p) => p.branch === LN_LIFE.liunian[0].lifePalace.branch).stem);
eq('按命宫宫干时回显来源', LN_LIFE.liunian[0].sihuaStemFrom, '流年命宫天干');
ok('换口径不改本命宫盘', JSON.stringify(LN_LIFE.palaces) === JSON.stringify(LN_YEAR.palaces));
ok('换口径确实换掉了四化', JSON.stringify(LN_LIFE.liunian[0].mutagen) !== JSON.stringify(LN_YEAR.liunian[0].mutagen),
  `${LN_YEAR.liunian[0].mutagen.join(',')} vs ${LN_LIFE.liunian[0].mutagen.join(',')}`);
const lnChanged = LN_LIFE.liunian.filter((l, i) => l.sihuaStem !== LN_YEAR.liunian[i].sihuaStem).length;
ok('十二年至少有一年取干不同（否则这一档等于空开关）', lnChanged > 0, `${lnChanged} / 12`);
ok('mutagenHits 跟着换干走',
  JSON.stringify(LN_LIFE.liunian[0].mutagenHits) !== JSON.stringify(LN_YEAR.liunian[0].mutagenHits));
ok('两条口径下四化都是四条',
  [LN_YEAR, LN_LIFE].every((r) => r.liunian.every((l) => l.mutagen.length === 4 && l.mutagenHits.length === 4)));
const LN_SUM = compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male', liunianSihua: 'life-palace-stem' });
ok('非默认口径进摘要流派行', /【流派】.*流年四化取干.*life-palace-stem/.test(LN_SUM.summary),
  LN_SUM.summary.split('\n').find((l) => /流派/.test(l)) || '(无流派行)');
ok('默认口径不插流派行', !/【流派】/.test(compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male' }).summary));

// ── 十二、十干四化变体（文墨「十干四化」全表）───────────────
// 变体名按「禄 权 科 忌」顺序念，名字本身就是那张表。这里只钉三件事：
// ① 默认档等于原有通行表（旧盘零漂移）；② 变体在对应天干上真能改到盘；
// ③ 天干不符时不串表（癸的变体不许套到甲干上）。
const JIA = { ...BASE, year: 1984 }; // 甲子年
const JIA_DEF = buildZiwei(JIA);
const JIA_VAR = buildZiwei({ ...JIA, sihuaVariant: '廉破曲阳' });
eq('十干四化默认档', JIA_DEF.schools.sihuaVariant, 'default');
eq('变体随盘回显', JIA_VAR.schools.sihuaVariant, '廉破曲阳');
ok('默认档的甲干就是通行表（廉破武阳）',
  JSON.stringify(sihuaTableOf('甲', {})) === JSON.stringify(sihuaTableOf('甲', { sihuaVariant: 'default' })));
eq('甲干变体把科从武曲换到文曲', sihuaTableOf('甲', { sihuaVariant: '廉破曲阳' }).文曲, '科');
ok('甲干变体的禄权忌不动',
  [sihuaTableOf('甲', { sihuaVariant: '廉破曲阳' }).廉贞, sihuaTableOf('甲', { sihuaVariant: '廉破曲阳' }).破军,
    sihuaTableOf('甲', { sihuaVariant: '廉破曲阳' }).太阳].join(',') === '禄,权,忌');
const jiaPalace = (r) => r.palaces.find((p) => p.stem === '甲');
ok('甲干宫的宫干四化跟着换',
  JSON.stringify(jiaPalace(JIA_DEF).daxian.mutagen) !== JSON.stringify(jiaPalace(JIA_VAR).daxian.mutagen),
  `${jiaPalace(JIA_DEF).daxian.mutagen.join(',')} vs ${jiaPalace(JIA_VAR).daxian.mutagen.join(',')}`);
ok('飞星也跟着换干表',
  JSON.stringify((JIA_DEF.fly || []).find((f) => f.stem === '甲')?.flies.map((x) => x.star))
  !== JSON.stringify((JIA_VAR.fly || []).find((f) => f.stem === '甲')?.flies.map((x) => x.star)));
ok('换变体不动星曜落宫',
  JSON.stringify(JIA_DEF.palaces.map((p) => p.stars.map((s) => s.name)))
  === JSON.stringify(JIA_VAR.palaces.map((p) => p.stars.map((s) => s.name))));
eq('天干不符时不串表（癸变体套甲干无效）',
  JSON.stringify(sihuaTableOf('甲', { sihuaVariant: '破巨阳贪' })), JSON.stringify(sihuaTableOf('甲', {})));
eq('乙丙丁己无变体可换', sihuaTableOf('乙', { sihuaVariant: '廉破曲阳' }), sihuaTableOf('乙', {}));
ok('庚干两项重叠时以 sihuaVariant 为准',
  natalSihuaTableOf('庚', { gengYearSihua: 'GYWYT', sihuaVariant: '阳武府同' }).天府 === '科');
ok('gengYearSihua 在 sihuaVariant 为默认时照旧生效（只作用于生年四化）',
  natalSihuaTableOf('庚', { gengYearSihua: 'GYWFX', sihuaVariant: 'default' }).天相 === '忌');
ok('gengYearSihua 不改宫干自化（那是另一套断法）',
  sihuaTableOf('庚', { gengYearSihua: 'GYWFX' }).天相 === undefined);
const VARS = SIHUA_VARIANTS;
ok('十六个变体表都是完整四条（禄权科忌各一）', Object.values(VARS).every((v) => {
  const vals = Object.values(v.table);
  return Object.keys(v.table).length === 4 && ['禄', '权', '科', '忌'].every((t) => vals.includes(t));
}));
ok('每干默认变体与本插件通行表一致（不重复定义两份）',
  Object.values(VARS).filter((v) => JSON.stringify(v.table) === JSON.stringify(sihuaTableOf(v.stem, {}))).length >= 5);
const VAR_SUM = compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male', sihuaVariant: '廉破曲阳' });
ok('非默认变体进摘要流派行', /【流派】.*十干四化变体.*廉破曲阳/.test(VAR_SUM.summary),
  VAR_SUM.summary.split('\n').find((l) => /流派/.test(l)) || '(无流派行)');

// ── 十一、接线：compute / 摘要 / 规则 ─────────────────────
const C = compute({ system: 'ziwei', datetime: '1990-06-15T10:00', gender: 'male', brightnessSchool: 'QS', jiekongSchool: 'double' });
eq('compute 回显开关', [C.schools.brightnessSchool, C.schools.jiekongSchool], ['QS', 'double']);
ok('compute 摘要写流派行', /【流派】.*亮度 QS.*截空 double/.test(C.summary),
  C.summary.split('\n').find((l) => /流派/.test(l)));
ok('规则里把十三类口径逐条列全（漏一类就是旧盘对不上账）',
  ['亮度', '庚干四化', '天马', '天空', '截空', '魁钺', '天伤天使', '长生', '晚子时', '身主', '杂曜', '流年四化取干', '十干四化']
    .every((label) => C.rules.schools.includes(label)),
  ['亮度', '庚干四化', '天马', '天空', '截空', '魁钺', '天伤天使', '长生', '晚子时', '身主', '杂曜', '流年四化取干', '十干四化']
    .filter((label) => !C.rules.schools.includes(label)).join(','));
const NEST = compute({ system: 'ziwei', datetime: '1990-06-15T10:00', gender: 'male', schools: { tianmaSchool: 'month-branch' } });
eq('compute 接受嵌套 schools', NEST.schools.tianmaSchool, 'month-branch');
const BAD = compute({ system: 'ziwei', datetime: '1990-06-15T10:00', gender: 'male', brightnessSchool: 'nope' });
eq('compute 非法值静默回默认', BAD.schools.brightnessSchool, 'default');
const CROSS = compute({ system: 'bazi', datetime: '1990-06-15T10:00', gender: 'male', cross: true, gengYearSihua: 'GYWFX', tianmaSchool: 'month-branch' });
ok('八字交叉验证也接受流派参数', !!CROSS.cross);
const DET = buildZiwei({ ...BASE, kuiyueSchool: 'qs2' });
eq('同参数可复现', JSON.stringify(buildZiwei({ ...BASE, kuiyueSchool: 'qs2' }).palaces), JSON.stringify(DET.palaces));

// ── 十二、接线漏检锁：新增开关必须同时出现在四处，少一处就是静默失效 ──
// 引擎里有开关、工具 schema 里没有 → AI 传了不认；口径对照里没有 → 并排看不到这一档。
const SERVER = fs.readFileSync(new URL('../index.js', import.meta.url), 'utf8');
const FLAT = fs.readFileSync(new URL('../engine/index.js', import.meta.url), 'utf8');
const CALIBER = fs.readFileSync(new URL('../engine/diff.js', import.meta.url), 'utf8');
for (const key of Object.keys(ZIWEI_SCHOOL_OPTIONS)) {
  const inSchema = new RegExp('^[ \\t]*' + key + ':[ \\t]*\\{', 'm').test(SERVER);
  ok(`${key}：工具 schema 收这个参数`, inSchema);
  ok(`${key}：compute 平铺透传认这个参数`, FLAT.includes(`'${key}'`) || FLAT.includes(`${key}:`));
  ok(`${key}：口径并排给了这一档开关`, CALIBER.includes(`'${key}'`) || CALIBER.includes(`"${key}"`));
  ok(`${key}：默认值与可选值都对得上`, ZIWEI_SCHOOL_OPTIONS[key].includes(ZIWEI_SCHOOL_DEFAULTS[key]));
}
