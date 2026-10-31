// 紫微斗数安星：命身宫 → 五行局 → 紫微/天府 → 十四主星 → 诸辅煞杂曜 → 十二宫 → 四化 → 大限小限流年 → 格局
import { STEMS, BRANCHES, ganzhiName, sexagenaryIndex, jdToParts, partsToJd, formatJd } from './calendar.js';
import { solarToLunar } from './lunar.js';
import { applyTrueSolar } from './bazi.js';
import { applyDst } from './dst.js';
import { assertCivil } from './validate.js';
import { nayinOf } from './nayin.js';
import { resolveAddress } from './geo.js';

const fix = (i) => ((i % 12) + 12) % 12;

// ── 基础表 ────────────────────────────────────────────────────

export const PALACE_NAMES = [
  '命宫', '兄弟', '夫妻', '子女', '财帛', '疾厄',
  '迁移', '交友', '官禄', '田宅', '福德', '父母',
];

const BUREAU = {
  水: { name: '水二局', number: 2 },
  木: { name: '木三局', number: 3 },
  金: { name: '金四局', number: 4 },
  土: { name: '土五局', number: 5 },
  火: { name: '火六局', number: 6 },
};

function nayinElement(ganzhiIdx) {
  return nayinOf(ganzhiIdx);
}

const ZIWEI_GROUP = [
  { offset: 0, name: '紫微' }, { offset: -1, name: '天机' }, { offset: -3, name: '太阳' },
  { offset: -4, name: '武曲' }, { offset: -5, name: '天同' }, { offset: -8, name: '廉贞' },
];
const TIANFU_GROUP = [
  { offset: 0, name: '天府' }, { offset: 1, name: '太阴' }, { offset: 2, name: '贪狼' },
  { offset: 3, name: '巨门' }, { offset: 4, name: '天相' }, { offset: 5, name: '天梁' },
  { offset: 6, name: '七杀' }, { offset: 10, name: '破军' },
];

/**
 * 十四主星庙旺得利平不陷（地支序：子丑寅卯辰巳午未申酉戌亥）
 * 采用通行表（《紫微斗数全书》系）。各家流派在少数宫位有出入（尤其太阳、太阴的庙旺界限），
 * 此处只标注十四主星——辅星亮度各派差异更大，不作硬标。
 * 等级从吉到凶：庙 > 旺 > 得 > 利 > 平 > 不 > 陷
 */
export const BRIGHTNESS = {
  紫微: ['平', '庙', '庙', '旺', '得', '旺', '庙', '庙', '旺', '平', '得', '旺'],
  天机: ['庙', '陷', '得', '旺', '利', '平', '庙', '陷', '得', '旺', '利', '平'],
  太阳: ['陷', '陷', '旺', '庙', '旺', '旺', '庙', '得', '得', '平', '陷', '陷'],
  武曲: ['旺', '庙', '得', '利', '庙', '平', '旺', '庙', '得', '利', '庙', '平'],
  天同: ['旺', '陷', '利', '庙', '平', '庙', '陷', '陷', '旺', '平', '平', '庙'],
  廉贞: ['平', '利', '庙', '平', '利', '陷', '平', '利', '庙', '平', '利', '陷'],
  天府: ['庙', '庙', '庙', '得', '庙', '得', '旺', '庙', '得', '旺', '庙', '得'],
  太阴: ['庙', '庙', '陷', '陷', '陷', '陷', '陷', '陷', '利', '旺', '旺', '庙'],
  贪狼: ['旺', '庙', '平', '利', '庙', '陷', '旺', '庙', '平', '利', '庙', '陷'],
  巨门: ['旺', '旺', '庙', '庙', '陷', '旺', '旺', '旺', '庙', '庙', '陷', '旺'],
  天相: ['庙', '庙', '庙', '陷', '得', '得', '庙', '庙', '庙', '陷', '得', '得'],
  天梁: ['庙', '旺', '庙', '庙', '庙', '陷', '庙', '旺', '庙', '庙', '庙', '陷'],
  七杀: ['旺', '庙', '庙', '陷', '庙', '平', '旺', '庙', '庙', '陷', '庙', '平'],
  破军: ['庙', '旺', '得', '陷', '旺', '平', '庙', '旺', '得', '陷', '旺', '平'],
};

export const MUTAGEN = {
  甲: { 廉贞: '禄', 破军: '权', 武曲: '科', 太阳: '忌' },
  乙: { 天机: '禄', 天梁: '权', 紫微: '科', 太阴: '忌' },
  丙: { 天同: '禄', 天机: '权', 文昌: '科', 廉贞: '忌' },
  丁: { 太阴: '禄', 天同: '权', 天机: '科', 巨门: '忌' },
  戊: { 贪狼: '禄', 太阴: '权', 右弼: '科', 天机: '忌' },
  己: { 武曲: '禄', 贪狼: '权', 天梁: '科', 文曲: '忌' },
  庚: { 太阳: '禄', 武曲: '权', 太阴: '科', 天同: '忌' },
  辛: { 巨门: '禄', 太阳: '权', 文曲: '科', 文昌: '忌' },
  壬: { 天梁: '禄', 紫微: '权', 左辅: '科', 武曲: '忌' },
  癸: { 破军: '禄', 巨门: '权', 太阴: '科', 贪狼: '忌' },
};

// ── 流派开关 ──────────────────────────────────────────────────
// 默认值对齐本插件既有盘面：亮度用内置通行表，庚干用阳武阴同，
// 天马按年支、魁钺用全书理解一、天使天伤不换、长生按现有五行局表、
// 晚子时仍算当日；天空/截空旬空默认不排（旧盘没有这两组星，保持 49 颗）。
// 其余选项只在显式指定时改变盘面，不影响默认输出。
export const ZIWEI_SCHOOL_DEFAULTS = Object.freeze({
  brightnessSchool: 'default',
  gengYearSihua: 'GYWYT',
  tianmaSchool: 'year-branch',
  tiankongSchool: 'off',
  jiekongSchool: 'off',
  kuiyueSchool: 'qs1',
  tianshiTianshang: 'normal',
  changshengSchool: 'yin-yang-shun-ni',
  lateZishi: 'current-day',
});

export const ZIWEI_SCHOOL_OPTIONS = Object.freeze({
  brightnessSchool: ['default', 'QS', 'XD1', 'ZZ', 'XD2'],
  gengYearSihua: ['GYWYT', 'GYWTY', 'GYWFT', 'GYWFX', 'GYWTX'],
  tianmaSchool: ['year-branch', 'month-branch'],
  tiankongSchool: ['off', 'normal', 'shun-jia-shi'],
  jiekongSchool: ['off', 'double', 'single', 'zhanyan'],
  kuiyueSchool: ['qs1', 'qs2', 'zhong-yiming', 'network'],
  tianshiTianshang: ['normal', 'zhongzhou'],
  changshengSchool: ['yin-yang-shun-ni', 'shui-tu', 'huo-tu'],
  lateZishi: ['current-day', 'next-day', 'all-current', 'day-cur-time-next'],
});

export function ziweiSchoolsOf(input = {}) {
  const nested = input.schools && typeof input.schools === 'object' ? input.schools : {};
  const out = {};
  for (const [key, allowed] of Object.entries(ZIWEI_SCHOOL_OPTIONS)) {
    const raw = input[key] !== undefined ? input[key] : nested[key];
    out[key] = allowed.includes(raw) ? raw : ZIWEI_SCHOOL_DEFAULTS[key];
  }
  return out;
}

// 亮度表按流派取值：数值 1–7 按各派档位换成中文。
// QS / XD1 为七档（1庙…7陷），ZZ / XD2 为五档（1庙 2旺 3平 4闲 5陷）。
const BRIGHTNESS_LEVELS_7 = ['', '庙', '旺', '得', '利', '平', '不', '陷'];
const BRIGHTNESS_LEVELS_5 = ['', '庙', '旺', '平', '闲', '陷'];
export const BRIGHTNESS_SCHOOLS = {
  QS: {
    levels: BRIGHTNESS_LEVELS_7,
    rows: {
      紫微: [5, 1, 2, 2, 3, 2, 1, 1, 2, 2, 3, 2],
      天机: [1, 7, 3, 2, 4, 5, 1, 7, 3, 2, 4, 5],
      太阳: [7, 6, 2, 1, 2, 2, 2, 3, 3, 5, 6, 7],
      武曲: [2, 1, 3, 4, 1, 5, 2, 1, 3, 4, 1, 5],
      天同: [2, 6, 4, 5, 5, 1, 7, 6, 2, 5, 5, 1],
      廉贞: [5, 4, 1, 5, 4, 7, 5, 4, 1, 5, 4, 7],
      天府: [1, 1, 1, 3, 1, 3, 2, 1, 3, 2, 1, 3],
      太阴: [1, 1, 2, 7, 7, 7, 6, 6, 4, 2, 2, 1],
      贪狼: [2, 1, 5, 4, 1, 7, 2, 1, 5, 4, 1, 7],
      巨门: [2, 6, 1, 1, 7, 2, 2, 6, 1, 1, 7, 2],
      天相: [1, 1, 1, 7, 3, 3, 1, 3, 1, 7, 3, 3],
      天梁: [1, 2, 1, 1, 1, 3, 1, 2, 7, 3, 1, 7],
      七杀: [2, 1, 1, 2, 1, 5, 2, 1, 1, 2, 1, 5],
      破军: [1, 2, 3, 7, 2, 5, 1, 2, 3, 7, 2, 5],
    },
  },
  XD1: {
    levels: BRIGHTNESS_LEVELS_7,
    rows: {
      紫微: [5, 1, 1, 2, 3, 2, 1, 1, 2, 2, 3, 2],
      天机: [1, 7, 3, 2, 4, 5, 1, 7, 3, 2, 4, 5],
      太阳: [7, 6, 2, 1, 2, 2, 1, 3, 4, 5, 7, 7],
      武曲: [2, 1, 3, 4, 1, 5, 2, 1, 3, 4, 1, 5],
      天同: [2, 6, 4, 1, 5, 1, 7, 6, 2, 5, 5, 1],
      廉贞: [5, 4, 1, 5, 4, 7, 5, 4, 1, 5, 4, 7],
      天府: [1, 1, 1, 3, 2, 3, 2, 1, 3, 2, 2, 3],
      太阴: [1, 1, 6, 7, 7, 7, 7, 5, 4, 2, 2, 1],
      贪狼: [2, 1, 5, 3, 1, 7, 2, 1, 5, 4, 1, 7],
      巨门: [2, 6, 1, 1, 5, 5, 2, 5, 1, 1, 5, 2],
      天相: [1, 1, 1, 7, 5, 3, 3, 3, 1, 7, 3, 3],
      天梁: [1, 2, 1, 2, 1, 7, 1, 2, 7, 3, 1, 7],
      七杀: [2, 1, 1, 2, 3, 5, 2, 1, 1, 2, 1, 5],
      破军: [1, 2, 3, 7, 2, 5, 1, 2, 3, 7, 2, 5],
    },
  },
  ZZ: {
    levels: BRIGHTNESS_LEVELS_5,
    rows: {
      紫微: [3, 1, 1, 2, 5, 2, 1, 1, 2, 3, 4, 2],
      天机: [1, 5, 2, 2, 1, 3, 1, 5, 3, 2, 1, 3],
      太阳: [5, 5, 2, 1, 2, 2, 1, 3, 4, 4, 5, 5],
      武曲: [2, 1, 4, 5, 1, 3, 2, 1, 3, 2, 1, 3],
      天同: [2, 5, 4, 1, 3, 1, 5, 5, 2, 3, 3, 1],
      廉贞: [3, 2, 1, 4, 2, 5, 3, 1, 1, 3, 2, 5],
      天府: [1, 1, 1, 3, 1, 3, 2, 1, 3, 5, 1, 2],
      太阴: [1, 1, 4, 5, 4, 5, 5, 3, 3, 2, 2, 1],
      贪狼: [2, 1, 3, 4, 1, 5, 2, 1, 3, 3, 1, 5],
      巨门: [2, 2, 1, 1, 3, 3, 2, 5, 1, 1, 2, 2],
      天相: [1, 1, 1, 5, 2, 3, 2, 4, 1, 5, 4, 3],
      天梁: [1, 2, 1, 1, 2, 5, 1, 2, 5, 4, 2, 5],
      七杀: [2, 1, 1, 5, 2, 3, 2, 2, 1, 4, 1, 3],
      破军: [1, 2, 5, 2, 2, 4, 1, 1, 5, 5, 2, 3],
    },
  },
  XD2: {
    levels: BRIGHTNESS_LEVELS_5,
    rows: {
      紫微: [4, 1, 1, 2, 4, 2, 1, 1, 2, 3, 5, 2],
      天机: [1, 5, 2, 2, 2, 3, 1, 5, 2, 2, 2, 3],
      太阳: [5, 5, 2, 1, 2, 2, 1, 2, 3, 3, 5, 5],
      武曲: [2, 1, 3, 5, 1, 3, 2, 1, 3, 2, 1, 3],
      天同: [2, 5, 3, 1, 2, 1, 5, 5, 2, 3, 3, 1],
      廉贞: [3, 2, 1, 4, 2, 5, 3, 1, 1, 3, 2, 5],
      天府: [2, 1, 1, 3, 1, 2, 2, 1, 2, 3, 1, 2],
      太阴: [1, 1, 5, 5, 5, 5, 5, 5, 2, 2, 1, 1],
      贪狼: [2, 1, 3, 2, 1, 5, 2, 1, 3, 2, 1, 5],
      巨门: [2, 5, 1, 2, 5, 1, 2, 5, 1, 2, 5, 1],
      天相: [1, 1, 1, 5, 2, 3, 2, 3, 1, 5, 5, 3],
      天梁: [1, 2, 1, 1, 2, 5, 1, 2, 5, 3, 2, 5],
      七杀: [2, 2, 1, 5, 1, 3, 2, 2, 1, 3, 1, 3],
      破军: [1, 1, 5, 2, 2, 3, 1, 1, 5, 5, 2, 3],
    },
  },
};

export function schoolBrightness(name, branchIndex, school = 'default') {
  const table = BRIGHTNESS_SCHOOLS[school];
  if (!table || !table.rows[name]) return BRIGHTNESS[name] ? BRIGHTNESS[name][fix(branchIndex)] : undefined;
  const level = table.rows[name][fix(branchIndex)];
  return level ? table.levels[level] : undefined;
}

// 庚干四化五变体
const GENG_MUTAGEN = {
  GYWYT: { 太阳: '禄', 武曲: '权', 太阴: '科', 天同: '忌' },
  GYWTY: { 太阳: '禄', 武曲: '权', 天同: '科', 太阴: '忌' },
  GYWFT: { 太阳: '禄', 武曲: '权', 天府: '科', 天同: '忌' },
  GYWFX: { 太阳: '禄', 武曲: '权', 天府: '科', 天相: '忌' },
  GYWTX: { 太阳: '禄', 武曲: '权', 天同: '科', 天相: '忌' },
};

function mutagenOf(stem, schools) {
  if (stem === '庚') return GENG_MUTAGEN[schools.gengYearSihua] || MUTAGEN.庚;
  return MUTAGEN[stem] ?? {};
}

// 安魁钺四派：差异集中在庚辛壬癸年
export const KUI_YUE_SCHOOLS = {
  qs2: {
    甲: [1, 7], 戊: [1, 7], 庚: [6, 2], 乙: [0, 8], 己: [0, 8],
    丙: [11, 9], 丁: [11, 9], 辛: [6, 2], 壬: [5, 3], 癸: [5, 3],
  },
  'zhong-yiming': {
    甲: [1, 7], 戊: [1, 7], 庚: [2, 6], 乙: [0, 8], 己: [0, 8],
    丙: [11, 9], 丁: [11, 9], 辛: [2, 6], 壬: [5, 3], 癸: [5, 3],
  },
  network: {
    甲: [1, 7], 戊: [1, 7], 庚: [1, 7], 乙: [0, 8], 己: [0, 8],
    丙: [11, 9], 丁: [11, 9], 辛: [6, 2], 壬: [3, 5], 癸: [3, 5],
  },
};

// 截空（按生年干）：single 单星、double 正副双星、zhanyan 占验派
const JIEKONG = {
  single: { 甲: 8, 乙: 6, 丙: 4, 丁: 2, 戊: 0, 己: 9, 庚: 7, 辛: 5, 壬: 3, 癸: 1 },
  double: {
    甲: [8, 9], 乙: [7, 6], 丙: [4, 5], 丁: [3, 2], 戊: [0, 1],
    己: [9, 8], 庚: [6, 7], 辛: [5, 4], 壬: [2, 3], 癸: [1, 0],
  },
  zhanyan: { 甲: 8, 乙: 6, 丙: 4, 丁: 2, 戊: 10, 己: 9, 庚: 7, 辛: 5, 壬: 3, 癸: 11 },
};

// 年干系
export const LUCUN = { 甲: 2, 乙: 3, 丙: 5, 丁: 6, 戊: 5, 己: 6, 庚: 8, 辛: 9, 壬: 11, 癸: 0 };
export const KUI_YUE = {
  甲: [1, 7], 戊: [1, 7], 庚: [1, 7], 乙: [0, 8], 己: [0, 8],
  丙: [11, 9], 丁: [11, 9], 辛: [6, 2], 壬: [3, 5], 癸: [3, 5],
};
KUI_YUE_SCHOOLS.qs1 = KUI_YUE;

/** 命主：按命宫地支 */
export const MING_ZHU = {
  子: '贪狼', 丑: '巨门', 寅: '禄存', 卯: '文曲', 辰: '廉贞', 巳: '武曲',
  午: '破军', 未: '武曲', 申: '廉贞', 酉: '文曲', 戌: '禄存', 亥: '巨门',
};

/** 身主：按生年地支 */
export const SHEN_ZHU = {
  子: '铃星', 丑: '天相', 寅: '天梁', 卯: '天同', 辰: '文昌', 巳: '天机',
  午: '火星', 未: '天相', 申: '天梁', 酉: '天同', 戌: '文昌', 亥: '天机',
};

// 三合局（寅午戌 / 申子辰 / 巳酉丑 / 亥卯未）
const TRIADS = {
  寅午戌: [2, 6, 10],
  申子辰: [8, 0, 4],
  巳酉丑: [5, 9, 1],
  亥卯未: [11, 3, 7],
};

export function triadOf(branchIndex) {
  const b = fix(branchIndex);
  for (const [name, arr] of Object.entries(TRIADS)) {
    if (arr.includes(b)) return name;
  }
  throw new Error(`三合局未匹配：${branchIndex}`);
}

/** 四正三会（寅卯辰 / 巳午未 / 申酉戌 / 亥子丑），用于孤辰寡宿 */
const DIRECTIONS = {  寅卯辰: [2, 3, 4],
  巳午未: [5, 6, 7],
  申酉戌: [8, 9, 10],
  亥子丑: [11, 0, 1],
};

function directionOf(branchIndex) {
  const b = fix(branchIndex);
  for (const [name, arr] of Object.entries(DIRECTIONS)) {
    if (arr.includes(b)) return name;
  }
  throw new Error(`四正未匹配：${branchIndex}`);
}

export const HUO_START = { 寅午戌: 1, 申子辰: 2, 巳酉丑: 3, 亥卯未: 9 };
export const LING_START = { 寅午戌: 3, 申子辰: 10, 巳酉丑: 10, 亥卯未: 10 };
export const TIANMA = { 寅午戌: 8, 申子辰: 2, 巳酉丑: 11, 亥卯未: 5 };
export const XIANCHI = { 寅午戌: 3, 申子辰: 9, 巳酉丑: 6, 亥卯未: 0 };
export const HUAGAI = { 寅午戌: 10, 申子辰: 4, 巳酉丑: 1, 亥卯未: 7 };
export const JIANGXING = { 寅午戌: 6, 申子辰: 0, 巳酉丑: 9, 亥卯未: 3 };

export const GUCHEN = { 寅卯辰: 5, 巳午未: 8, 申酉戌: 11, 亥子丑: 2 };
export const GUASU = { 寅卯辰: 1, 巳午未: 4, 申酉戌: 7, 亥子丑: 10 };

/** 破碎：子午卯酉在巳，寅申巳亥在酉，辰戌丑未在丑 */
export function posuIndex(yearBranch) {
  const b = fix(yearBranch);
  if ([0, 6, 3, 9].includes(b)) return 5;   // 子午卯酉 -> 巳
  if ([2, 8, 5, 11].includes(b)) return 9;  // 寅申巳亥 -> 酉
  return 1;                                 // 辰戌丑未 -> 丑
}

export const XIAOXIAN_START = {
  male: { 寅午戌: 4, 申子辰: 10, 巳酉丑: 7, 亥卯未: 1 },
  female: { 寅午戌: 10, 申子辰: 4, 巳酉丑: 1, 亥卯未: 7 },
};

// 十二神名序
export const CHANGSHENG_NAMES = ['长生', '沐浴', '冠带', '临官', '帝旺', '衰', '病', '死', '墓', '绝', '胎', '养'];
export const BOSHI_NAMES = ['博士', '力士', '青龙', '小耗', '将军', '奏书', '飞廉', '喜神', '病符', '大耗', '伏兵', '官府'];
export const JIANGQIAN_NAMES = ['将星', '攀鞍', '岁驿', '息神', '华盖', '劫煞', '灾煞', '天煞', '指背', '咸池', '月煞', '亡神'];
export const SUIQI_NAMES = ['岁建', '晦气', '丧门', '贯索', '官符', '小耗', '大耗', '龙德', '白虎', '天德', '吊客', '病符'];

/** 长生起点（五行局 → 地支）：水二申、木三亥、金四巳、土五申、火六寅 */
export const CHANGSHENG_START = { 2: 8, 3: 11, 4: 5, 5: 8, 6: 2 };

// ── 基础算法 ──────────────────────────────────────────────────

/** 时辰序：0=子，23:00 归子时 */
export function hourBranchIndex(hour, minute = 0) {
  const total = hour * 60 + minute;
  if (total >= 23 * 60 || total < 60) return 0;
  return Math.floor((total - 60) / 120) + 1;
}

/** 紫微与天府所在宫（子 = 0）。借数法：局数除日数取商，商自寅起顺行，借数奇逆偶顺 */
export function ziweiTianfuIndex(lunarDay, bureauNumber) {
  let offset = 0;
  let quotient = 0;
  for (;;) {
    const divisor = lunarDay + offset;
    quotient = Math.floor(divisor / bureauNumber);
    if (divisor % bureauNumber === 0) break;
    offset++;
    if (offset > 60) throw new Error('紫微定位失败');
  }
  quotient %= 12;
  let yinBased = quotient - 1;
  yinBased += offset % 2 === 0 ? offset : -offset;
  const ziwei = fix(yinBased + 2);
  return { ziwei, tianfu: fix(4 - ziwei) };
}

/** 某宫的小限虚岁（1..12） */
export function xiaoxianAge(branchIndex, triad, gender) {
  const start = XIAOXIAN_START[gender === 'female' ? 'female' : 'male'][triad];
  const b = fix(branchIndex);
  return gender === 'female' ? fix(start - b) + 1 : fix(b - start) + 1;
}

// ── 主流程 ────────────────────────────────────────────────────

/**
 * 闰月口径：split 按日切分（1–15 归本月、16 起归次月，主流排盘默认）、
 * next 整月归次月、prev 整月归本月。`leapAsNext: true` 是 next 的旧写法。
 */
export const LEAP_POLICIES = ['split', 'next', 'prev'];

export function leapPolicyOf(input) {
  if (input && LEAP_POLICIES.includes(input.leapMonth)) return input.leapMonth;
  return input && input.leapAsNext ? 'next' : 'split';
}

export function effectiveLunarMonth(raw, policy) {
  if (!raw || !raw.isLeap) return raw ? raw.month : 0;
  if (policy === 'next') return (raw.month % 12) + 1;
  if (policy === 'split') return raw.day <= 15 ? raw.month : (raw.month % 12) + 1;
  return raw.month;
}

/**
 * 排紫微斗数命盘
 * @param {object} input { year,month,day,hour,minute, gender, leapMonth? }
 */
export function buildZiwei(input) {
  assertCivil(input);
  const schools = ziweiSchoolsOf(input);
  const { year: cy, month: cm, day: cd, hour: ch = 0, minute: cmin = 0, gender = 'male' } = input;
  const useTrueSolar = input.trueSolar !== false;
  const geo = input.geo || (input.address ? resolveAddress(input.address) : null);
  const longitude = typeof input.longitude === 'number'
    ? input.longitude
    : (geo && typeof geo.lon === 'number' ? geo.lon : undefined);
  const civilJdRaw = partsToJd({ year: cy, month: cm, day: cd, hour: ch, minute: cmin });
  // 1986–1991 中国夏令时：先按钟面时间校正，再叠加真太阳时
  const dst = input.dst === false ? { applied: false, note: null } : applyDst({ year: cy, month: cm, day: cd, hour: ch, minute: cmin });
  const civilJd = dst.applied ? partsToJd({ year: dst.year, month: dst.month, day: dst.day, hour: dst.hour, minute: dst.minute }) : civilJdRaw;
  const solar = useTrueSolar
    ? applyTrueSolar(civilJd, longitude)
    : { offsetMinutes: 0, jd: civilJd, note: '未启用真太阳时' };
  // 紫微按「时辰」起盘：真太阳时若跨时辰/跨日，命盘随之改变
  // 晚子时 next-day：23:00 后起盘日顺延一日，只改起盘日，不改真太阳时显示
  let eff = jdToParts(solar.jd);
  if (schools.lateZishi === 'next-day' && eff.hour >= 23) eff = jdToParts(solar.jd + 1);
  const year = eff.year;
  const month = eff.month;
  const day = eff.day;
  const hour = eff.hour;
  const minute = eff.minute;

  const lunarRaw = solarToLunar(year, month, day);
  const leapPolicy = leapPolicyOf(input);
  const lunarMonth = effectiveLunarMonth(lunarRaw, leapPolicy);
  const lunarDay = lunarRaw.day;

  const hb = hourBranchIndex(hour, minute);
  const hourBranch = BRANCHES[hb];

  const yearGanzhi = ganzhiName((((lunarRaw.lunarYear - 4) % 60) + 60) % 60);
  const yearStem = yearGanzhi.stem;
  const yb = BRANCHES.indexOf(yearGanzhi.branch);
  const triad = triadOf(yb);
  // 大限顺逆：阳男阴女顺行、阴男阳女逆行（天伤天使的中州派互换也要用它）
  const yearYang = STEMS.indexOf(yearStem) % 2 === 0;
  const forward = (yearYang && gender === 'male') || (!yearYang && gender === 'female');
  const kuiyueTable = KUI_YUE_SCHOOLS[schools.kuiyueSchool] || KUI_YUE;

  // 命宫 / 身宫
  const soulIndex = fix(2 + (lunarMonth - 1) - hb);
  const bodyIndex = fix(2 + (lunarMonth - 1) + hb);

  // 命宫天干（五虎遁）
  const yinStem = ((STEMS.indexOf(yearStem) % 5) * 2 + 2) % 10;
  const soulStem = (yinStem + fix(soulIndex - 2)) % 10;
  const soulNayin = nayinElement(sexagenaryIndex(soulStem, soulIndex));
  const bureau = BUREAU[soulNayin.element];

  const { ziwei, tianfu } = ziweiTianfuIndex(lunarDay, bureau.number);

  // 星曜落宫
  const starsByBranch = Array.from({ length: 12 }, () => []);
  // 安星：主星顺带记下所在宫的庙旺得利平不陷（亮度可按流派切换，默认用内置通行表）
  const put = (branch, name, type) => {
    const idx = fix(branch);
    const star = { name, type };
    if (type === '主星' && BRIGHTNESS[name]) {
      const b = schoolBrightness(name, idx, schools.brightnessSchool);
      if (b) star.brightness = b;
    }
    starsByBranch[idx].push(star);
  };

  for (const s of ZIWEI_GROUP) put(ziwei + s.offset, s.name, '主星');
  for (const s of TIANFU_GROUP) put(tianfu + s.offset, s.name, '主星');

  // 时系辅星
  const wenchang = fix(10 - hb);
  const wenqu = fix(4 + hb);
  put(wenchang, '文昌', '辅星');
  put(wenqu, '文曲', '辅星');
  const zuofu = fix(4 + (lunarMonth - 1));
  const youbi = fix(10 - (lunarMonth - 1));
  put(zuofu, '左辅', '辅星');
  put(youbi, '右弼', '辅星');
  put(6 + hb, '台辅', '吉星');     // 午起子时顺行
  put(2 + hb, '封诰', '吉星');     // 寅起子时顺行

  // 年干系
  const lucun = LUCUN[yearStem];
  put(lucun, '禄存', '吉星');
  put(lucun + 1, '擎羊', '煞星');
  put(lucun - 1, '陀罗', '煞星');
  const [kui, yue] = kuiyueTable[yearStem];
  put(kui, '天魁', '吉星');
  put(yue, '天钺', '吉星');

  // 年支系
  const hongluan = fix(3 - yb);
  put(hongluan, '红鸾', '吉星');
  put(hongluan + 6, '天喜', '吉星');
  put(6 - yb, '天哭', '煞星');
  put(6 + yb, '天虚', '煞星');
  put(4 + yb, '龙池', '吉星');
  put(10 - yb, '凤阁', '吉星');
  // 天马：默认按年支三合，可切生月三合（正月起寅）
  const maTriad = schools.tianmaSchool === 'month-branch'
    ? triadOf(fix(2 + (lunarMonth - 1)))
    : triad;
  put(TIANMA[maTriad], '天马', '吉星');
  put(XIANCHI[triad], '咸池', '煞星');
  put(HUAGAI[triad], '华盖', '杂曜');
  const dirGroup = directionOf(yb);
  put(GUCHEN[dirGroup], '孤辰', '煞星');
  put(GUASU[dirGroup], '寡宿', '煞星');
  put(posuIndex(yb), '破碎', '煞星');

  // 空曜（默认不排，旧盘保持 49 颗）
  if (schools.tiankongSchool !== 'off') {
    put(schools.tiankongSchool === 'shun-jia-shi' ? yb + hb : yb + 1, '天空', '杂曜');
  }
  if (schools.jiekongSchool !== 'off') {
    const jk = JIEKONG[schools.jiekongSchool][yearStem];
    if (Array.isArray(jk)) {
      put(jk[0], '截空', '杂曜');
      put(jk[1], '副截', '杂曜');
    } else {
      put(jk, '截空', '杂曜');
    }
    // 旬空：本旬十日所空两支（年干支所在旬的末两位）
    const nianIndex = (((lunarRaw.lunarYear - 4) % 60) + 60) % 60;
    const decadeStart = nianIndex - (nianIndex % 10);
    put(decadeStart + 10, '旬空', '杂曜');
    put(decadeStart + 11, '副旬', '杂曜');
  }

  // 月系
  put(9 + (lunarMonth - 1), '天刑', '煞星');  // 酉起正月顺行
  put(1 + (lunarMonth - 1), '天姚', '煞星');  // 丑起正月顺行

  // 日系（以左辅右弼、文昌文曲为基）
  put(zuofu + (lunarDay - 1), '三台', '吉星');
  put(youbi - (lunarDay - 1), '八座', '吉星');
  put(wenchang + (lunarDay - 2), '恩光', '吉星');
  put(wenqu + (lunarDay - 2), '天贵', '吉星');

  // 时系煞星
  put(HUO_START[triad] + hb, '火星', '煞星');
  put(LING_START[triad] + hb, '铃星', '煞星');
  put(11 + hb, '地劫', '煞星');   // 亥宫起子时，顺行
  put(11 - hb, '地空', '煞星');   // 亥宫起子时，逆行

  // 固定宫位：天伤恒在交友、天使恒在疾厄；中州派阴男阳女互换
  const swapTianshi = schools.tianshiTianshang === 'zhongzhou' && !forward;
  put(soulIndex - (swapTianshi ? 5 : 7), '天伤', '杂曜');
  put(soulIndex - (swapTianshi ? 7 : 5), '天使', '杂曜');

  // 生年四化（庚干按所选变体）
  const mutagenMap = mutagenOf(yearStem, schools);
  for (const list of starsByBranch) {
    for (const star of list) {
      if (mutagenMap[star.name]) star.mutagen = mutagenMap[star.name];
    }
  }

  // 十二宫：命宫起逆布
  const palaceNames = [];
  for (let i = 0; i < 12; i++) palaceNames[fix(soulIndex - i)] = PALACE_NAMES[i];

  // 大限：阳男阴女顺行、阴男阳女逆行（forward 已在安星前算好）
  const startAge = bureau.number;

  // 十二神（长生/博士 随大限顺逆，将前/岁前 恒顺行）
  // 土五局长生起点按流派：默认申，河洛/火土派取寅
  const csStart = schools.changshengSchool === 'huo-tu' && bureau.number === 5
    ? 2
    : CHANGSHENG_START[bureau.number];
  const shenshaAt = (branch) => {
    const d = forward ? 1 : -1;
    return {
      changsheng: CHANGSHENG_NAMES[fix(d * (branch - csStart))],
      boshi: BOSHI_NAMES[fix(d * (branch - lucun))],
      jiangqian: JIANGQIAN_NAMES[fix(branch - JIANGXING[triad])],
      suiqi: SUIQI_NAMES[fix(branch - yb)],
    };
  };

  const palaces = [];
  for (let i = 0; i < 12; i++) {
    const branch = fix(soulIndex - i);
    const stem = (yinStem + fix(branch - 2)) % 10;
    const stepIndex = forward ? fix(branch - soulIndex) : fix(soulIndex - branch);
    const dxStart = startAge + stepIndex * 10;
    const gz = STEMS[stem] + BRANCHES[branch];
    const pal = MUTAGEN[STEMS[stem]] ?? {};
    const selfHua = starsByBranch[branch]
      .filter((s) => pal[s.name])
      .map((s) => ({ star: s.name, type: pal[s.name] }));
    palaces.push({
      palace: palaceNames[branch],
      branch: BRANCHES[branch],
      stem: STEMS[stem],
      ganzhi: gz,
      isSoul: branch === soulIndex,
      isBody: branch === bodyIndex,
      stars: starsByBranch[branch].map((s) => ({ ...s })),
      shensha: shenshaAt(branch),
      selfHua,
      daxian: {
        start: dxStart,
        end: dxStart + 9,
        stem: STEMS[stem],
        mutagen: Object.entries(MUTAGEN[STEMS[stem]] ?? {}).map(([s, k]) => `${s}化${k}`),
      },
      xiaoxian: { age: xiaoxianAge(branch, triad, gender) },
      sanfang: [branch, branch + 4, branch + 8, branch + 6]
        .map((x) => palaceNames[fix(x)]),
    });
  }

  // 昌曲专论：与丑未的关系、是否入命三方、吸收面的清杂
  const changqu = (() => {
    const set = new Set([wenchang, wenqu]);
    let relation;
    if (wenchang === wenqu) relation = `同宫于${BRANCHES[wenchang]}`;
    else if (set.has(0) && set.has(2)) relation = '夹丑（子·寅）';
    else if (set.has(6) && set.has(8)) relation = '夹未（午·申）';
    else if (set.has(5) && set.has(9)) relation = '丑三合（巳·酉）';
    else if (set.has(11) && set.has(3)) relation = '未三合（亥·卯）';
    else relation = '与丑未无关';

    const sanfang = [soulIndex, fix(soulIndex + 4), fix(soulIndex + 8), fix(soulIndex + 6)];
    const pick = (branch, name) => {
      const stars = starsByBranch[branch];
      const self = stars.find((s) => s.name === name) || {};
      return {
        branch: BRANCHES[branch],
        palace: palaceNames[branch],
        mutagen: self.mutagen ?? null,
        sha: stars.filter((s) => s.type === '煞星').map((s) => s.name),
      };
    };
    const wc = pick(wenchang, '文昌');
    const wq = pick(wenqu, '文曲');
    const jiBranches = [wc, wq].filter((x) => x.mutagen === '忌').map((x) => x.branch);
    const shaAll = [...new Set([...wc.sha, ...wq.sha])];
    const tone = jiBranches.length
      ? { label: '杂', reason: `昌曲化忌于${jiBranches.join('、')}` }
      : shaAll.length >= 2
        ? { label: '杂', reason: `昌曲两宫会煞 ${shaAll.join('、')}` }
        : { label: '清', reason: '昌曲无化忌、不明显会煞' };

    return {
      relation,
      inSoulSanfang: sanfang.includes(wenchang) || sanfang.includes(wenqu),
      wenchang: wc,
      wenqu: wq,
      absorb: tone,
    };
  })();

  // 流年（当年起 12 年）
  const thisYear = new Date().getFullYear();
  const liunian = [];
  for (let y = thisYear; y < thisYear + 12; y++) {
    const gz = ganzhiName((((y - 4) % 60) + 60) % 60);
    const b = BRANCHES.indexOf(gz.branch);
    const lu = LUCUN[gz.stem];
    const age = y - lunarRaw.lunarYear + 1;
    const xxAge = ((age - 1) % 12) + 1;
    const xxPalace = palaces.find((p) => p.xiaoxian.age === xxAge);
    const dxPalace = palaces.find((p) => age >= p.daxian.start && age <= p.daxian.end);
    liunian.push({
      year: y,
      ganzhi: gz.name,
      age,
      lifePalace: { branch: gz.branch, palace: palaceNames[b] },
      doujun: BRANCHES[fix(b - (lunarMonth - 1) + hb)],
      sanfang: [fix(b), fix(b + 4), fix(b + 8), fix(b + 6)].map((x) => palaceNames[x]),
      liulu: BRANCHES[lu],
      liuyang: BRANCHES[fix(lu + 1)],
      liutuo: BRANCHES[fix(lu - 1)],
      liukui: BRANCHES[kuiyueTable[gz.stem][0]],
      liuyue: BRANCHES[kuiyueTable[gz.stem][1]],
      mutagen: Object.entries(MUTAGEN[gz.stem] ?? {}).map(([s, k]) => `${s}化${k}`),
      daxian: dxPalace
        ? { palace: dxPalace.palace, start: dxPalace.daxian.start, end: dxPalace.daxian.end }
        : null,
      xiaoxian: xxPalace ? { age: xxAge, palace: xxPalace.palace } : null,
    });
  }

  const chart = {
    system: 'ziwei',
    input: {
      year: cy, month: cm, day: cd, hour: ch, minute: cmin,
      gender,
      leapMonth: leapPolicy,
      leapAsNext: leapPolicy === 'next',
      longitude: longitude ?? null,
      address: input.address || null,
      geo,
      trueSolar: useTrueSolar,
      dst: { applied: !!dst.applied, note: dst.note || null },
      schools: { ...schools },
    },
    schools: { ...schools },
    solarTime: {
      civilText: `${cy}-${String(cm).padStart(2, '0')}-${String(cd).padStart(2, '0')} ${String(ch).padStart(2, '0')}:${String(cmin).padStart(2, '0')}`,
      trueSolarText: formatJd(solar.jd),
      offsetMinutes: solar.offsetMinutes,
      note: dst.applied ? `${dst.note}；${solar.note}` : solar.note,
    },
    lunar: {
      year: lunarRaw.lunarYear,
      month: lunarMonth,
      monthRaw: lunarRaw.month,
      day: lunarDay,
      isLeap: lunarRaw.isLeap,
      leapPolicy,
      monthStart: lunarRaw.monthStart,
      ...(lunarRaw.isLeap ? {
        note: leapPolicy === 'split'
          ? `闰${lunarRaw.month}月按日切分：1–15 按本月、16 起按次月；本盘闰月${lunarDay}日按${lunarMonth}月`
          : leapPolicy === 'next' ? '闰月整月按次月起盘' : '闰月整月按本月起盘',
      } : {}),
    },
    hourBranch,
    yearGanzhi: yearGanzhi.name,
    soul: {
      palace: '命宫',
      branch: BRANCHES[soulIndex],
      stem: STEMS[soulStem],
      ganzhi: STEMS[soulStem] + BRANCHES[soulIndex],
      nayin: soulNayin.name,
    },
    body: { palace: '身宫', branch: BRANCHES[bodyIndex], lands: palaceNames[bodyIndex] },
    lifeMaster: MING_ZHU[BRANCHES[soulIndex]],
    bodyMaster: SHEN_ZHU[BRANCHES[yb]],
    doujun: {
      zinian: BRANCHES[fix(hb - (lunarMonth - 1))],
      rule: '流年支起正月，逆数至生月，再起子时顺数至生时',
    },
    bureau: { name: bureau.name, number: bureau.number, element: soulNayin.element },
    ziwei: BRANCHES[ziwei],
    tianfu: BRANCHES[tianfu],
    changqu,
    palaces,
    liunian,
    daxian: {
      direction: forward ? '顺行' : '逆行',
      rule: `${yearYang ? '阳' : '阴'}年${gender === 'male' ? '男' : '女'}${forward ? '顺行' : '逆行'}`,
      startAge,
    },
    xiaoxianRule: {
      start: XIAOXIAN_START[gender === 'female' ? 'female' : 'male'][triad],
      direction: gender === 'male' ? '顺行' : '逆行',
      note: '小限一岁起宫按年支三合，男顺女逆，每宫一岁，十二年一周',
    },
    rules: {
      ziweiPlacement: '借数法：局数除日数取商，商数自寅宫顺行，借数奇逆偶顺',
      mutagen: '生年四化用中州派常用表；庚干可按流派切换（默认阳武阴同，另有同科阴忌、府科、府科相忌、同科相忌）',
      schools: `流派开关：亮度 ${schools.brightnessSchool}、庚干四化 ${schools.gengYearSihua}、天马 ${schools.tianmaSchool}、天空 ${schools.tiankongSchool}、截空 ${schools.jiekongSchool}、魁钺 ${schools.kuiyueSchool}、天伤天使 ${schools.tianshiTianshang}、长生 ${schools.changshengSchool}、晚子时 ${schools.lateZishi}；庚干四化只作用于生年四化`,
      leapMonth: '闰月默认按日切分（1–15 归本月、16 起归次月，主流排盘口径）；可传 leapMonth: next（整月归次月）或 prev（整月归本月），leapAsNext: true 等同 next',
      auxStars: '火铃按年支三合起点顺数至生时；羊陀夹禄存；魁钺按年干；地空亥起子时逆行、地劫顺行；三台八座随辅弼；恩光天贵随昌曲退一位；台辅封诰按时支',
      shensha: '长生、博士随大限顺逆；将前、岁前恒顺行；天伤恒在交友、天使恒在疾厄',
      masters: '命主按命宫地支，身主按生年地支',
      liunian: '流年命宫取该年地支宫；三方四正为本宫与 +4/+8/+6；并给该年所属大限与小限',
      flyComposite: '三方四正取本宫、对宫与两个三合宫共四宫，四宫宫干各化禄权科忌共 16 条，按落宫归堆标会聚（双忌会、禄忌同宫、三化会、自化）；只描会照，不折吉凶',
      changqu: '昌曲落宫只由时支决定，故与丑未的关系（夹/三合/同宫/无关）是结构性结论；absorb 的「清/杂」是启发式标记，依据昌曲化忌与会煞，不是断语',
    },
  };

  chart.patterns = detectPatterns(chart);
  chart.daxianList = daxianList(chart);
  chart.fly = flyStars(chart);
  chart.flyChains = flyChains(chart, { from: '命宫' });
  chart.flyComposite = flyComposite(chart, { from: '命宫' });
  enrichLiunian(chart);
  // 流月/流日/流时：默认按本机当前时刻，可用 asOf 指定（如 "2026-10-22T16:00"）
  chart.flow = flowOf(chart, input.asOf);
  chart.patternSummary = {
    count: chart.patterns.length,
    good: chart.patterns.filter((p) => p.tone === 'good').map((p) => p.name),
    neutral: chart.patterns.filter((p) => p.tone === 'neutral').map((p) => p.name),
    bad: chart.patterns.filter((p) => p.tone === 'bad').map((p) => p.name),
    broken: chart.patterns.filter((p) => p.status === 'broken').map((p) => p.name),
    formed: chart.patterns.filter((p) => p.status === 'formed').map((p) => p.name),
    notGraded: chart.patterns.filter((p) => p.status === 'n/a').map((p) => p.name),
    note: '格局只描述结构，不作吉凶断语；同一命盘可并存吉格、中性结构与忌格。破格只判吉格是否被三方四正的煞忌空劫冲破，忌格不另判破格',
  };
  return chart;
}

// ── 格局识别（规则写在 evidence 里，便于复核）────────────────────

function starBranchOf(chart, name) {
  const p = chart.palaces.find((x) => x.stars.some((s) => s.name === name));
  return p ? BRANCHES.indexOf(p.branch) : -1;
}

function palaceAt(chart, branchIndex) {
  const b = fix(branchIndex);
  return chart.palaces.find((p) => BRANCHES.indexOf(p.branch) === b);
}

export function detectPatterns(chart) {
  const soul = chart.palaces.find((p) => p.isSoul);
  const soulIdx = BRANCHES.indexOf(soul.branch);
  const sanfang = [soulIdx, fix(soulIdx + 4), fix(soulIdx + 8), fix(soulIdx + 6)];
  const starsIn = (indices) => new Set(indices.flatMap((b) => palaceAt(chart, b)?.stars.map((s) => s.name) ?? []));
  const near = starsIn(sanfang);
  const soulStars = soul.stars.filter((s) => s.type === '主星').map((s) => s.name);
  const out = [];

  const add = (name, evidence) => out.push({ name, evidence });

  if (soulStars.length === 0) add('命无正曜', '命宫无十四主星，需借对宫安星');
  if (soulStars.some((s) => ['七杀', '破军', '贪狼'].includes(s))) {
    add('杀破狼', `命宫坐 ${soulStars.filter((s) => ['七杀', '破军', '贪狼'].includes(s)).join('、')}`);
  }
  const jyTL = ['天机', '太阴', '天同', '天梁'];
  if (jyTL.every((s) => near.has(s)) && soulStars.some((s) => jyTL.includes(s))) {
    add('机月同梁', '命宫三方四正会齐天机、太阴、天同、天梁');
  }
  if (soulIdx === 11 && starBranchOf(chart, '太阴') === 11) add('月朗天门', '太阴在亥守命');
  if (soulIdx === 3 && starBranchOf(chart, '太阳') === 3) add('日出扶桑', '太阳在卯守命');
  if (near.has('天府') && near.has('天相')) add('府相朝垣', '命宫三方四正见天府、天相');

  const lu = starBranchOf(chart, '禄存');
  const ma = starBranchOf(chart, '天马');
  if (lu >= 0 && ma >= 0 && (lu === ma || fix(lu - ma) === 6)) add('禄马交驰', `禄存在${BRANCHES[lu]}，天马在${BRANCHES[ma]}`);

  const huo = starBranchOf(chart, '火星');
  const ling = starBranchOf(chart, '铃星');
  if (fix(soulIdx - 1) === huo && fix(soulIdx + 1) === ling) add('火铃夹命', '火星在命宫前一宫、铃星在后一宫夹命');
  if (fix(soulIdx - 1) === ling && fix(soulIdx + 1) === huo) add('火铃夹命', '铃星与火星夹命');

  // 擎羊在禄存 +1、陀罗在禄存 -1，两星只能夹「禄存」那一宫；
  // 所以「羊陀夹忌」实际就是化忌与禄存同宫，按左右两侧去找永远找不到。
  const ji = chart.palaces.find((p) => p.stars.some((s) => s.mutagen === '忌'));
  if (ji && lu >= 0 && BRANCHES.indexOf(ji.branch) === lu) {
    add('羊陀夹忌', `化忌与禄存在${ji.branch}同宫，擎羊陀罗夹之`);
  }

  // 铃昌陀武：四星会于命宫三方四正
  const lctw = ['铃星', '文昌', '陀罗', '武曲'].map((n) => starBranchOf(chart, n));
  if (lctw.every((b) => b >= 0) && lctw.every((b) => sanfang.includes(fix(b)))) {
    add('铃昌陀武', `铃${BRANCHES[lctw[0]]}·昌${BRANCHES[lctw[1]]}·陀${BRANCHES[lctw[2]]}·武${BRANCHES[lctw[3]]} 会于命宫(${BRANCHES[soulIdx]})三方四正`);
  }

  const hualu = chart.palaces.find((p) => p.stars.some((s) => s.mutagen === '禄'));
  if (hualu && lu >= 0) {
    const hb2 = BRANCHES.indexOf(hualu.branch);
    if (hb2 === lu || fix(hb2 - lu) === 6) add('双禄交流', `禄存在${BRANCHES[lu]}，化禄在${hualu.branch}`);
  }

  // ── 以下为扩展格局（条件都是星位判断，evidence 写明落在哪宫）──
  const inSoul = (name) => soul.stars.some((s) => s.name === name);
  const nearStar = (name) => near.has(name);
  // 「夹」只要求两星分居命宫前后，不分左右——日月、左右、魁钺本来就没有固定左右；
  // 旧写法只认一种顺序，昌曲夹命与羊陀夹命因此从未命中，日月/左右/魁钺也漏掉一半。
  const jia = (a, b) => {
    const ba = starBranchOf(chart, a);
    const bb = starBranchOf(chart, b);
    if (ba < 0 || bb < 0) return false;
    return (fix(ba + 1) === soulIdx && fix(bb - 1) === soulIdx)
      || (fix(bb + 1) === soulIdx && fix(ba - 1) === soulIdx);
  };
  const mutagensIn = (indices) => {
    const set = new Set();
    for (const b of indices) for (const s of (palaceAt(chart, b)?.stars ?? [])) if (s.mutagen) set.add(s.mutagen);
    return set;
  };

  // 紫微系
  if (inSoul('紫微') && inSoul('天府')) add('紫府同宫', '紫微、天府同守命宫');
  if (nearStar('紫微') && nearStar('天府')) add('紫府朝垣', '命宫三方四正会紫微、天府');
  if ((inSoul('紫微') || inSoul('天府')) && ['左辅', '右弼', '天魁', '天钺'].filter(nearStar).length >= 2) {
    const l = ['左辅', '右弼', '天魁', '天钺'].filter(nearStar);
    add('君臣庆会', `紫微/天府坐命，三方会${l.join('、')}`);
  }
  if (soulIdx === 6 && starBranchOf(chart, '紫微') === 6) add('极向离明', '紫微在午守命');
  if ((soulIdx === 0 || soulIdx === 6) && inSoul('七杀')) add('七杀朝斗', `七杀在${BRANCHES[soulIdx]}守命`);
  if ((soulIdx === 0 || soulIdx === 6) && inSoul('破军')) add('英星入庙', `破军在${BRANCHES[soulIdx]}守命`);
  if ((soulIdx === 0 || soulIdx === 6) && inSoul('巨门')) add('石中隐玉', `巨门在${BRANCHES[soulIdx]}守命`);
  if (starBranchOf(chart, '巨门') >= 0 && starBranchOf(chart, '巨门') === starBranchOf(chart, '太阳')) {
    add('巨日同宫', `巨门太阳同宫于${BRANCHES[starBranchOf(chart, '巨门')]}`);
  }

  // 日月
  if (jia('太阳', '太阴')) add('日月夹命', '太阳、太阴夹命宫');
  if (starBranchOf(chart, '太阳') >= 0 && starBranchOf(chart, '太阴') >= 0
    && fix(starBranchOf(chart, '太阳') - starBranchOf(chart, '太阴')) === 6) {
    add('日月对照', `太阳在${BRANCHES[starBranchOf(chart, '太阳')]}，太阴在${BRANCHES[starBranchOf(chart, '太阴')]}，隔宫对照`);
  }

  // 夹局
  if (jia('左辅', '右弼')) add('左右夹命', '左辅、右弼夹命宫');
  if (jia('文昌', '文曲')) add('昌曲夹命', '文昌、文曲夹命宫');
  if (jia('天魁', '天钺')) add('魁钺夹命', '天魁、天钺夹命宫');
  if (jia('擎羊', '陀罗')) add('羊陀夹命', `禄存在${BRANCHES[soulIdx]}守命，擎羊陀罗前后夹之`);

  // 四化
  const muts = mutagensIn(sanfang);
  if (muts.has('禄') && muts.has('权') && muts.has('科')) add('三奇嘉会', '化禄、化权、化科会于命宫三方四正');
  const luStars = ['禄存', '化禄'].filter((n) => n === '禄存' ? nearStar(n) : muts.has('禄'));
  if (luStars.length === 2) add('双禄朝垣', '禄存与化禄同会命宫三方四正');
  if (near.has('地空') && near.has('地劫') && (inSoul('地空') || inSoul('地劫'))) add('命里逢空', '地空、地劫会命');

  // 煞忌结构
  if (soulIdx === 6 && starBranchOf(chart, '擎羊') === 6) add('马头带箭', '擎羊在午守命');
  if (soulIdx === 4 || soulIdx === 10) add('天罗地网', `命宫在${BRANCHES[soulIdx]}，辰戌为天罗地网`);
  const lianzhen = starBranchOf(chart, '廉贞');
  const tianxiang = starBranchOf(chart, '天相');
  const qingyang = starBranchOf(chart, '擎羊');
  // 天相与廉贞永远隔偶数宫，字面上的「廉贞、擎羊夹天相」不可能成立；
  // 通行说法取「廉贞天相同守命宫于子午、擎羊同宫」——判的是守命那一宫，其它宫位同宫不算。
  // 命宫卯酉、廉贞天相对照遇擎羊的变体未纳入。
  if (lianzhen >= 0 && tianxiang >= 0 && qingyang >= 0
    && lianzhen === tianxiang && qingyang === tianxiang && tianxiang === soulIdx
    && (tianxiang === 0 || tianxiang === 6)) {
    add('刑囚夹印', `廉贞天相同守命宫${BRANCHES[tianxiang]}，擎羊同宫`);
  }
  if (near.has('贪狼') && (near.has('火星') || near.has('铃星'))) {
    add('火贪铃贪', `贪狼与${near.has('火星') ? '火星' : '铃星'}会于命宫三方四正`);
  }
  if (starBranchOf(chart, '武曲') >= 0 && starBranchOf(chart, '武曲') === starBranchOf(chart, '贪狼')) {
    add('武贪同行', `武曲贪狼同宫于${BRANCHES[starBranchOf(chart, '武曲')]}`);
  }
  if (soulIdx === 0 && inSoul('贪狼')) add('泛水桃花', '贪狼在子守命');

  // 同名的结构只保留第一条（evidence 已足够说明），并标注倾向与破格状态
  const seen = new Set();
  const nearMeta = new Map();
  for (const b of sanfang) {
    for (const s of (palaceAt(chart, b)?.stars ?? [])) {
      if (!nearMeta.has(s.name)) nearMeta.set(s.name, { branch: BRANCHES[b], mutagen: s.mutagen || null });
    }
  }
  const nearNames = [...nearMeta.keys()];
  const hasAny = (list) => list.filter((n) => nearMeta.has(n));
  const withBranch = (names) => names.map((n) => `${n}（${nearMeta.get(n).branch}）`).join('、');
  const jiNames = nearNames.filter((n) => nearMeta.get(n).mutagen === '忌');
  const breakOf = (name) => {
    const rule = PATTERN_BREAK_RULES[name];
    if (!rule) return { status: 'n/a', breaks: [], breakRule: '未收录破格条件', citationIds: [] };
    if (rule.kind) return { status: 'n/a', breaks: [], breakRule: rule.note, citationIds: [] };
    const hits = [];
    for (const token of rule.breakers || []) {
      if (token === 'sha') {
        const names = hasAny(BREAK_SHA).filter((n) => !(rule.exclude || []).includes(n));
        if (names.length) hits.push(`三方见煞星 ${withBranch(names)}`);
      } else if (token === 'kong') {
        const names = hasAny(BREAK_KONG);
        if (names.length) hits.push(`三方见空劫 ${withBranch(names)}`);
      } else if (token === 'ji') {
        if (jiNames.length) hits.push(`三方见化忌 ${withBranch(jiNames)}`);
      } else if (token === 'yangTuo') {
        const names = hasAny(['擎羊', '陀罗']);
        if (names.length) hits.push(`羊陀冲守 ${withBranch(names)}`);
      } else if (token === 'tuo') {
        if (nearMeta.has('陀罗')) hits.push(`陀罗同会（${nearMeta.get('陀罗').branch}）`);
      } else if (token === 'noKelu') {
        const hasKe = nearNames.some((n) => nearMeta.get(n).mutagen === '科');
        const hasLu = nearNames.some((n) => nearMeta.get(n).mutagen === '禄') || nearMeta.has('禄存');
        if (!hasKe && !hasLu) hits.push('三方无化科、化禄或禄存照');
      } else if (token.startsWith('starJi:')) {
        const star = token.slice(7);
        const meta = nearMeta.get(star);
        if (meta?.mutagen === '忌') hits.push(`${star}化忌（${meta.branch}）`);
      }
    }
    return {
      status: hits.length ? 'broken' : 'formed',
      breaks: hits,
      breakRule: rule.rule || '',
      citationIds: rule.citationIds || [],
    };
  };
  return out
    .filter((p) => (seen.has(p.name) ? false : (seen.add(p.name), true)))
    .map((p) => ({ ...p, tone: PATTERN_TONE[p.name] || 'neutral', ...breakOf(p.name) }));
}

const BREAK_SHA = ['擎羊', '陀罗', '火星', '铃星'];
const BREAK_KONG = ['地空', '地劫'];
const GENERIC_BREAK = '命宫三方四正见煞星（擎羊、陀罗、火星、铃星）、地空地劫或化忌，吉格减色乃至不成格。';
const STRUCTURAL_NOTE = '这是结构标签，不是吉格，不判成格/破格。';
const INAUSPICIOUS_NOTE = '忌格本身就是风险结构，不再判「破格」；轻重与应期另看大限流年。';

// 34 条格局的破格条件。breakers 是可机械复算的星位/四化判据：
//   sha 三方煞星 / kong 三方空劫 / ji 三方化忌 / yangTuo 羊陀 / tuo 陀罗 /
//   noKelu 三方无科禄 / starJi:<星> 指定星化忌。
// 引文见 engine/citations.js，原文子串由 test/citations.test.mjs 核验。
export const PATTERN_BREAK_RULES = {
  紫府同宫: { breakers: ['kong', 'starJi:紫微', 'starJi:天府'], rule: GENERIC_BREAK, citationIds: ['zw-poge-sanfang', 'zw-poge-ruge'] },
  紫府朝垣: { breakers: ['sha', 'kong', 'ji'], rule: GENERIC_BREAK, citationIds: ['zw-poge-sanfang', 'zw-poge-ruge'] },
  君臣庆会: { breakers: ['sha', 'kong', 'ji'], rule: GENERIC_BREAK, citationIds: ['zw-poge-sanfang', 'zw-poge-ruge'] },
  极向离明: { breakers: ['sha', 'kong', 'ji'], rule: GENERIC_BREAK, citationIds: ['zw-poge-sanfang', 'zw-poge-ruge'] },
  七杀朝斗: { breakers: ['kong', 'starJi:七杀'], rule: '七杀在子午守命而见空劫或七杀化忌，杀曜之威不聚。', citationIds: ['zw-poge-ruge'] },
  英星入庙: { breakers: ['kong', 'starJi:破军'], rule: '破军在子午守命而见空劫或破军化忌，英星入庙减色。', citationIds: ['zw-poge-ruge'] },
  石中隐玉: { breakers: ['noKelu', 'kong', 'starJi:巨门'], rule: '三方无化科、化禄或禄存照，或见空劫、巨门化忌，则石中隐玉不成立。', citationIds: ['zw-shiyin', 'zw-poge-ruge'] },
  巨日同宫: { breakers: ['sha', 'kong', 'ji'], rule: '巨日同宫而三方见擎羊等煞星、空劫或化忌，光明被掩。', citationIds: ['zw-poge-sanfang', 'zw-jiju-poge'] },
  日月夹命: { breakers: ['yangTuo', 'starJi:太阳', 'starJi:太阴'], rule: '羊陀冲守，或日月任一带化忌，夹局减色。', citationIds: ['zw-riyue-jia'] },
  日月对照: { breakers: ['sha', 'kong', 'starJi:太阳', 'starJi:太阴'], rule: '日月对照见煞空，或日月任一带化忌，对照不美。', citationIds: ['zw-riyue-jia', 'zw-poge-sanfang'] },
  左右夹命: { breakers: ['kong', 'ji'], rule: '命宫三方见空劫或化忌，辅弼之夹被冲。', citationIds: ['zw-poge-sanfang'] },
  昌曲夹命: { breakers: ['sha', 'kong'], rule: '三方见羊陀火铃空劫，昌曲夹命亦主虚誉。', citationIds: ['zw-changqu'] },
  魁钺夹命: { breakers: ['sha', 'kong'], rule: '魁钺夹命而三方杀凑，贵气减等。', citationIds: ['zw-kuiyue'] },
  三奇嘉会: { breakers: ['sha', 'ji'], rule: '三奇同会而兼四杀或化忌，发财功名亦多阻滞。', citationIds: ['zw-sihua-ji'] },
  双禄朝垣: { breakers: ['kong', 'ji'], rule: '双禄朝垣见空劫或化忌，禄被劫夺。', citationIds: ['zw-poge-sanfang'] },
  府相朝垣: { breakers: ['sha', 'kong', 'ji'], rule: GENERIC_BREAK, citationIds: ['zw-poge-sanfang', 'zw-poge-ruge'] },
  禄马交驰: { breakers: ['kong', 'sha'], rule: '禄马逢空为死马、遇陀罗为折足马，见刑杀亦减力。', citationIds: ['zw-luma'] },
  月朗天门: { breakers: ['kong', 'starJi:太阴'], rule: '太阴在亥守命而见空劫或太阴化忌，月被云遮。', citationIds: ['zw-poge-ruge'] },
  日出扶桑: { breakers: ['kong', 'starJi:太阳'], rule: '太阳在卯守命而见空劫或太阳化忌，日出扶桑减色。', citationIds: ['zw-poge-ruge'] },
  机月同梁: { breakers: ['sha', 'kong', 'ji'], rule: '机月同梁遇凶杀、空劫或化忌，则降为下格。', citationIds: ['zw-jiyue'] },
  武贪同行: { breakers: ['starJi:武曲', 'starJi:贪狼'], rule: '武贪同行须无化忌；任一颗化忌则作下格论。', citationIds: ['zw-tanwu'] },
  双禄交流: { breakers: ['kong', 'ji'], rule: '双禄交流见空劫或化忌，禄来难守。', citationIds: ['zw-poge-sanfang'] },
  火贪铃贪: { breakers: ['sha', 'kong', 'starJi:贪狼'], exclude: ['火星', '铃星'], rule: '三方有凶杀或空劫，火贪铃贪不发；贪狼化忌亦减力。', citationIds: ['zw-huotan'] },
  命无正曜: { kind: 'structural', note: STRUCTURAL_NOTE },
  杀破狼: { kind: 'structural', note: STRUCTURAL_NOTE },
  火铃夹命: { kind: 'inauspicious', note: INAUSPICIOUS_NOTE },
  羊陀夹命: { kind: 'inauspicious', note: INAUSPICIOUS_NOTE },
  羊陀夹忌: { kind: 'inauspicious', note: INAUSPICIOUS_NOTE },
  铃昌陀武: { kind: 'inauspicious', note: INAUSPICIOUS_NOTE },
  命里逢空: { kind: 'inauspicious', note: INAUSPICIOUS_NOTE },
  马头带箭: { kind: 'inauspicious', note: INAUSPICIOUS_NOTE },
  天罗地网: { kind: 'inauspicious', note: INAUSPICIOUS_NOTE },
  刑囚夹印: { kind: 'inauspicious', note: INAUSPICIOUS_NOTE },
  泛水桃花: { kind: 'inauspicious', note: INAUSPICIOUS_NOTE },
};

export const PATTERN_TONE = {
  紫府同宫: 'good', 紫府朝垣: 'good', 君臣庆会: 'good', 极向离明: 'good',
  七杀朝斗: 'good', 英星入庙: 'good', 石中隐玉: 'good', 巨日同宫: 'good',
  日月夹命: 'good', 日月对照: 'good', 左右夹命: 'good', 昌曲夹命: 'good',
  魁钺夹命: 'good', 三奇嘉会: 'good', 双禄朝垣: 'good', 府相朝垣: 'good',
  禄马交驰: 'good', 月朗天门: 'good', 日出扶桑: 'good', 机月同梁: 'good',
  武贪同行: 'neutral', 命无正曜: 'neutral', 杀破狼: 'neutral', 双禄交流: 'neutral',
  火贪铃贪: 'neutral', 火铃夹命: 'bad', 羊陀夹命: 'bad', 羊陀夹忌: 'bad',
  铃昌陀武: 'bad', 命里逢空: 'bad', 马头带箭: 'bad', 天罗地网: 'bad',
  刑囚夹印: 'bad', 泛水桃花: 'bad',
};

// ── 大限一览：宫干四化落宫、三方主星 ──────────────────────────

export function daxianList(chart) {
  const mainOf = (palaceNames) => {
    const set = new Set();
    for (const name of palaceNames) {
      const p = chart.palaces.find((x) => x.palace === name);
      for (const s of (p?.stars ?? [])) if (s.type === '主星') set.add(s.name);
    }
    return [...set];
  };
  return chart.palaces
    .map((p) => ({
      palace: p.palace,
      branch: p.branch,
      stem: p.stem,
      ganzhi: p.ganzhi,
      ages: [p.daxian.start, p.daxian.end],
      mutagen: p.daxian.mutagen,
      selfHua: p.selfHua,
      sanfang: p.sanfang,
      mainStars: mainOf(p.sanfang),
      mutagenHits: Object.entries(MUTAGEN[p.stem] ?? {}).map(([star, type]) => {
        const b = starBranchOf(chart, star);
        return { star, type, branch: b >= 0 ? BRANCHES[b] : null, palace: b >= 0 ? chart.palaces.find((x) => x.branch === BRANCHES[b])?.palace ?? null : null };
      }),
    }))
    .sort((a, b) => a.ages[0] - b.ages[0]);
}

// ── 四化飞星：宫干四化飞向哪一宫，以及「串连」────────────────────
// 生年四化看「这颗星先天带着什么」，飞星四化看「这一宫自己会去找谁」：
// 宫干定出四个化星，星曜落在哪一宫，就是这一宫的禄/权/科/忌飞向哪里。
// 串连（忌转忌、科转科…）是同一支化一路跟下去：命宫化忌入 A 宫，A 宫的宫干再化忌入 B 宫……
// 走到回到已访问过的宫就成环（传统讲的「忌出」「自化」都在这一步显现）。

export const FLY_TYPES = ['禄', '权', '科', '忌'];

// 某天干下某一化的星曜；表里没有就返回 null（不会凭印象补）
export function flyStarOf(stem, type) {
  const map = MUTAGEN[stem];
  if (!map) return null;
  for (const [star, t] of Object.entries(map)) if (t === type) return star;
  return null;
}

// 12 宫各自的四化落点（一次算全，供面板与解读共用）
export function flyStars(chart) {
  const palaces = chart.palaces || [];
  return palaces.map((p) => ({
    palace: p.palace,
    branch: p.branch,
    stem: p.stem,
    flies: FLY_TYPES.map((type) => {
      const star = flyStarOf(p.stem, type);
      const b = star ? starBranchOf(chart, star) : -1;
      const target = b >= 0 ? palaces.find((x) => x.branch === BRANCHES[b]) : null;
      return {
        type,
        star,
        to: target ? target.palace : null,
        toBranch: target ? target.branch : null,
        // 落回本宫即自化：这一宫自己化出去又回到自己
        self: !!(target && target.palace === p.palace),
      };
    }),
  }));
}

// 从某一宫出发，跟着同一支化逐跳；ended 说明为什么停：
// cycle=回到走过的宫（成环）、no-star=该干这一化无星、off-chart=星未上盘、max=走满上限
export function flyChain(chart, { from = '命宫', type = '忌', maxSteps = 12 } = {}) {
  const palaces = chart.palaces || [];
  const start = palaces.find((p) => p.palace === from) || palaces[0];
  if (!start) return null;
  const steps = [];
  const seen = new Set([start.palace]);
  let cur = start;
  let ended = 'max';
  for (let i = 0; i < Math.max(1, maxSteps); i++) {
    const star = flyStarOf(cur.stem, type);
    if (!star) { ended = 'no-star'; break; }
    const b = starBranchOf(chart, star);
    if (b < 0) { ended = 'off-chart'; break; }
    const to = palaces.find((x) => x.branch === BRANCHES[b]);
    steps.push({ from: cur.palace, fromBranch: cur.branch, fromStem: cur.stem, star, type, to: to.palace, toBranch: to.branch });
    if (seen.has(to.palace)) { ended = 'cycle'; break; }
    seen.add(to.palace);
    cur = to;
  }
  return {
    from: start.palace,
    type,
    steps,
    path: [start.palace, ...steps.map((s) => s.to)],
    ended,
    closed: ended === 'cycle',
  };
}

// 某一宫的四支化各串一条（默认命宫）
export function flyChains(chart, { from = '命宫', maxSteps = 12 } = {}) {
  const out = {};
  for (const type of FLY_TYPES) out[type] = flyChain(chart, { from, type, maxSteps });
  return out;
}

// ── 三方四正复合飞化：四宫一起飞、看落到同一宫的会聚 ─────────────────
// 单宫飞化回答「这一宫自己去找谁」；三方四正看的是本宫连同对宫、两个三合宫
// 四股力同时飞出去，最后在哪一宫会到一起。会在一处的化越多，那一宫被牵动的力道越集中。
// 只归堆与标会照，不折吉凶：同样是双忌会一宫，落在生年忌和落在生年禄上意思完全不同。
const PALACE_SUFFIX = (p) => `${p}${String(p).endsWith('宫') ? '' : '宫'}`;

export function flyComposite(chart, { from = '命宫' } = {}) {
  const palaces = chart.palaces || [];
  const src = palaces.find((p) => p.palace === from) || palaces[0];
  if (!src) return null;
  const names = Array.isArray(src.sanfang) && src.sanfang.length
    ? [...new Set(src.sanfang)].slice(0, 4)
    : [src.palace];

  const sources = [];
  for (const name of names) {
    const p = palaces.find((x) => x.palace === name);
    if (!p) continue;
    sources.push({
      palace: p.palace,
      branch: p.branch,
      stem: p.stem,
      flies: FLY_TYPES.map((type) => {
        const star = flyStarOf(p.stem, type);
        const b = star ? starBranchOf(chart, star) : -1;
        const target = b >= 0 ? palaces.find((x) => x.branch === BRANCHES[b]) : null;
        return {
          type,
          star,
          to: target ? target.palace : null,
          toBranch: target ? target.branch : null,
          self: !!(target && target.palace === p.palace),
        };
      }),
    });
  }

  // 16 条飞化按落宫归堆；未上盘的星不计入落点
  const targets = [];
  for (const p of palaces) {
    const incoming = [];
    for (const s of sources) {
      for (const f of s.flies) {
        if (f.to === p.palace) {
          incoming.push({ from: s.palace, fromBranch: s.branch, fromStem: s.stem, type: f.type, star: f.star, self: f.self });
        }
      }
    }
    if (!incoming.length) continue;
    targets.push({
      palace: p.palace,
      branch: p.branch,
      incoming,
      types: [...new Set(incoming.map((x) => x.type))],
      count: incoming.length,
    });
  }
  targets.sort((a, b) => b.count - a.count || BRANCHES.indexOf(a.branch) - BRANCHES.indexOf(b.branch));

  const jiAt = (t) => t.incoming.filter((x) => x.type === '忌').length;
  const groups = {
    doubleJi: targets.filter((t) => jiAt(t) >= 2),
    luJi: targets.filter((t) => t.types.includes('禄') && t.types.includes('忌')),
    tripleHua: targets.filter((t) => t.types.length >= 3),
    selfHua: targets.filter((t) => t.incoming.some((x) => x.self)),
  };

  const labels = [];
  for (const t of groups.doubleJi) labels.push(`${['', '', '双忌', '三忌', '四忌'][jiAt(t)] || `${jiAt(t)}忌`}会${PALACE_SUFFIX(t.palace)}`);
  for (const t of groups.luJi) labels.push(`禄忌同宫${PALACE_SUFFIX(t.palace)}`);
  const HUA_NUM = { 3: '三化会', 4: '四化会' };
  for (const t of groups.tripleHua) labels.push(`${HUA_NUM[t.types.length] || `${t.types.length}化会`}${PALACE_SUFFIX(t.palace)}`);
  for (const t of groups.selfHua) labels.push(`${PALACE_SUFFIX(t.palace)}自化`);

  const byType = {};
  for (const type of FLY_TYPES) {
    byType[type] = sources
      .map((s) => {
        const f = s.flies.find((x) => x.type === type);
        return f && f.to ? { from: s.palace, star: f.star, to: f.to, self: f.self } : null;
      })
      .filter(Boolean);
  }

  return {
    from: src.palace,
    sanfang: sources.map((s) => s.palace),
    sources,
    targets,
    groups,
    byType,
    labels,
    note: '三方四正取本宫、对宫与两个三合宫共四宫，四宫宫干各化禄权科忌共 16 条飞化，按落宫归堆；只在落宫相同（会照）时标会聚，单条飞出不另立标签。只描会照与方向，不折吉凶，也未叠大限流年四化。',
  };
}

// ── 流年四化落宫 ────────────────────────────────────────────

export function enrichLiunian(chart) {
  for (const ln of chart.liunian) {
    const stem = ln.ganzhi[0];
    ln.mutagenHits = Object.entries(MUTAGEN[stem] ?? {}).map(([star, type]) => {
      const b = starBranchOf(chart, star);
      return {
        star,
        type,
        branch: b >= 0 ? BRANCHES[b] : null,
        palace: b >= 0 ? chart.palaces.find((x) => x.branch === BRANCHES[b])?.palace ?? null : null,
      };
    });
    ln.sanfangMainStars = [...new Set(ln.sanfang.flatMap((name) => {
      const p = chart.palaces.find((x) => x.palace === name);
      return (p?.stars ?? []).filter((s) => s.type === '主星').map((s) => s.name);
    }))];
  }
  return chart.liunian;
}

// ── 流月 / 流日 / 流时 ──────────────────────────────────────
// 一级一级往下推：流年斗君起正月 → 顺数至该农历月；流月命宫起初一 → 顺数至该农历日；
// 流日命宫起子时 → 顺数至该时辰。四化一律取落点宫的原局宫干。
// 这条链是紫微看「这个月/这一天/这个时辰」的标准入口，缺了它就只能看到流年。

export function asOfParts(v) {
  if (!v) return null;
  if (typeof v === 'object') return v;
  const m = String(v).match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T ](\d{1,2}):(\d{1,2}))?$/);
  if (!m) return null;
  return {
    year: Number(m[1]), month: Number(m[2]), day: Number(m[3]),
    hour: m[4] === undefined ? 12 : Number(m[4]),
    minute: m[5] === undefined ? 0 : Number(m[5]),
  };
}

export function flowOf(chart, asOf) {
  const now = new Date();
  const a = asOfParts(asOf) || {};
  const Y = a.year || now.getFullYear();
  const M = a.month || now.getMonth() + 1;
  const D = a.day || now.getDate();
  const H = a.hour === undefined ? now.getHours() : a.hour;
  const MI = a.minute === undefined ? now.getMinutes() : a.minute;

  const lr = solarToLunar(Y, M, D);
  const natalMonth = chart.lunar.month; // 已在起盘时按闰月口径换算过，这里不再二次换月
  const natalHB = BRANCHES.indexOf(chart.hourBranch);
  const hbNow = hourBranchIndex(H, MI);

  const gz = ganzhiName((((lr.lunarYear - 4) % 60) + 60) % 60);
  const yB = BRANCHES.indexOf(gz.branch);
  const doujun = fix(yB - (natalMonth - 1) + natalHB);
  const mIdx = fix(doujun + (lr.month - 1));
  const dIdx = fix(mIdx + (lr.day - 1));
  const hIdx = fix(dIdx + hbNow);

  const point = (idx) => {
    const br = BRANCHES[idx];
    const p = chart.palaces.find((x) => x.branch === br);
    const stem = p ? p.stem : null;
    const mutagenHits = stem
      ? Object.entries(MUTAGEN[stem] ?? {}).map(([star, type]) => {
        const b = starBranchOf(chart, star);
        return {
          star,
          type,
          branch: b >= 0 ? BRANCHES[b] : null,
          palace: b >= 0 ? chart.palaces.find((x) => x.branch === BRANCHES[b])?.palace ?? null : null,
        };
      })
      : [];
    const tri = [idx, fix(idx + 4), fix(idx + 8), fix(idx + 6)];
    const sanfang = tri.map((x) => chart.palaces.find((q) => q.branch === BRANCHES[x])?.palace ?? null);
    const sanfangMainStars = [...new Set(tri.flatMap((x) => {
      const q = chart.palaces.find((z) => z.branch === BRANCHES[x]);
      return (q?.stars ?? []).filter((s) => s.type === '主星').map((s) => s.name);
    }))];
    return {
      branch: br,
      palace: p ? p.palace : null,
      stem,
      ganzhi: p ? p.ganzhi : null,
      mutagenHits,
      sanfang,
      sanfangMainStars,
    };
  };

  const two = (n) => String(n).padStart(2, '0');
  return {
    asOf: {
      solar: `${Y}-${two(M)}-${two(D)} ${two(H)}:${two(MI)}`,
      lunar: `${lr.lunarYear}年${lr.isLeap ? '闰' : ''}${lr.month}月${lr.day}日${BRANCHES[hbNow]}时`,
      yearGanzhi: gz.name,
      hourBranch: BRANCHES[hbNow],
    },
    year: { ...point(yB), doujun: BRANCHES[doujun] },
    month: { index: lr.month, ...point(mIdx) },
    day: { index: lr.day, ...point(dIdx) },
    hour: { hourIndex: hbNow, ...point(hIdx) },
    rules: '流月命宫自流年斗君（该年支起正月逆数至生月，再起子时顺数至生时）起正月，顺行至该农历月；流日自流月命宫起初一，顺行至该农历日；流时自流日命宫起子时，顺行至该时辰；四化取落点宫的原局宫干',
  };
}
