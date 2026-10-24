// 大六壬：天地盘、四课、九宗门三传。
// 算法移植自本地 MIT 授权插件 @dhicoc/dsh-chinese-traditional-wisdom-skill 的
// daliurenEngine.ts（仅取 classic 流派：贵人顺逆以天盘临方判定）。
import { toJDN, dayGanzhiIndex, ganzhiName, termWindow, formatJd, xunKongOf } from './calendar.js';
import { assertCivil } from './validate.js';
import { SANHE_ELEMENT } from './sanhe.js';

const GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const TIAN_JIANG = ['贵', '蛇', '雀', '合', '勾', '龙', '空', '虎', '常', '玄', '阴', '后'];
const JIANG_FULL = {
  贵: '贵人', 蛇: '螣蛇', 雀: '朱雀', 合: '六合', 勾: '勾陈', 龙: '青龙',
  空: '天空', 虎: '白虎', 常: '太常', 玄: '玄武', 阴: '太阴', 后: '天后',
};
const YUE_JIANG_NAME = {
  亥: '登明', 戌: '河魁', 酉: '从魁', 申: '传送', 未: '小吉', 午: '胜光',
  巳: '太乙', 辰: '天罡', 卯: '太冲', 寅: '功曹', 丑: '大吉', 子: '神后',
};

const GAN_WUXING = { 甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土', 己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水' };
const ZHI_WUXING = { 子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火', 午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水' };

const SHENG = { 金: '水', 水: '木', 木: '火', 火: '土', 土: '金' };
const KE = { 金: '木', 木: '土', 土: '水', 水: '火', 火: '金' };

function wuxingRelation(shang, xia) {
  if (shang === xia) return '比和';
  if (KE[shang] === xia) return '克';
  if (KE[xia] === shang) return '被克';
  if (SHENG[shang] === xia) return '生';
  if (SHENG[xia] === shang) return '被生';
  return '比和';
}

const LIUQIN_MAP = { 被生: '父母', 生: '子孙', 克: '妻财', 比和: '兄弟', 被克: '官鬼' };

const GAN_JI_GONG = { 甲: '寅', 乙: '辰', 丙: '巳', 丁: '未', 戊: '巳', 己: '未', 庚: '申', 辛: '戌', 壬: '亥', 癸: '丑' };

const YANG_POS = ['巳', '午', '未', '申', '酉', '戌'];

const JIEQI_YUE_JIANG = {
  雨水: '亥', 惊蛰: '亥', 春分: '戌', 清明: '戌', 谷雨: '酉', 立夏: '酉',
  小满: '申', 芒种: '申', 夏至: '未', 小暑: '未', 大暑: '午', 立秋: '午',
  处暑: '巳', 白露: '巳', 秋分: '辰', 寒露: '辰', 霜降: '卯', 立冬: '卯',
  小雪: '寅', 大雪: '寅', 冬至: '丑', 小寒: '丑', 大寒: '子', 立春: '子',
};

const GUIREN_START = {
  甲: { day: '丑', night: '未' }, 戊: { day: '丑', night: '未' }, 庚: { day: '丑', night: '未' },
  乙: { day: '子', night: '申' }, 己: { day: '子', night: '申' },
  丙: { day: '亥', night: '酉' }, 丁: { day: '亥', night: '酉' },
  壬: { day: '巳', night: '卯' }, 癸: { day: '巳', night: '卯' },
  辛: { day: '午', night: '寅' },
};

const DAY_NIGHT_MAP = {
  卯: '昼', 辰: '昼', 巳: '昼', 午: '昼', 未: '昼', 申: '昼',
  酉: '夜', 戌: '夜', 亥: '夜', 子: '夜', 丑: '夜', 寅: '夜',
};

// ── 神煞（只收各派无争议、六壬断课常用的几项） ──
const RI_LU = { 甲: '寅', 乙: '卯', 丙: '巳', 丁: '午', 戊: '巳', 己: '午', 庚: '申', 辛: '酉', 壬: '亥', 癸: '子' };
const YANG_REN = { 甲: '卯', 乙: '辰', 丙: '午', 丁: '未', 戊: '午', 己: '未', 庚: '酉', 辛: '戌', 壬: '子', 癸: '丑' };
const SAN_HE_SHEN = {
  水: { 驿马: '寅', 桃花: '酉', 华盖: '辰', 劫煞: '巳', 亡神: '亥' },
  火: { 驿马: '申', 桃花: '卯', 华盖: '戌', 劫煞: '亥', 亡神: '巳' },
  金: { 驿马: '亥', 桃花: '午', 华盖: '丑', 劫煞: '寅', 亡神: '申' },
  木: { 驿马: '巳', 桃花: '子', 华盖: '未', 劫煞: '申', 亡神: '寅' },
};

/** 按日干支算神煞 */
export function calcShensha(dayGz) {
  const gan = dayGz[0];
  const zhi = dayGz[1];
  const out = [];
  const push = (name, branch, note) => {
    if (!out.some((x) => x.name === name)) out.push({ name, branch, note });
  };
  if (RI_LU[gan]) push('日禄', RI_LU[gan], '日干临官之位');
  if (YANG_REN[gan]) push('羊刃', YANG_REN[gan], '日干帝旺之位');
  const trio = SAN_HE_SHEN[SANHE_ELEMENT[zhi]];
  if (trio) {
    push('驿马', trio.驿马, '日支三合冲位，主迁动');
    push('桃花', trio.桃花, '咸池，主情缘');
    push('华盖', trio.华盖, '主孤高、技艺');
    push('劫煞', trio.劫煞, '主意外耗损');
    push('亡神', trio.亡神, '主失脱、心神不定');
  }
  return out;
}

// 旬空不再自建表：统一调用 calendar.xunKongOf（原表与本模块各一份，属三处重复实现之一）

const JIA_ZI_60 = Array.from({ length: 60 }, (_, i) => GAN[i % 10] + ZHI[i % 12]);

const ZHI_CHONG = { 子: '午', 午: '子', 丑: '未', 未: '丑', 寅: '申', 申: '寅', 卯: '酉', 酉: '卯', 辰: '戌', 戌: '辰', 巳: '亥', 亥: '巳' };
const YI_MA = { 寅: '申', 午: '申', 戌: '申', 申: '寅', 子: '寅', 辰: '寅', 巳: '亥', 酉: '亥', 丑: '亥', 亥: '巳', 卯: '巳', 未: '巳' };

const BA_ZHUAN_DAYS = ['壬子', '甲寅', '乙卯', '丁巳', '己未', '庚申', '辛酉', '癸亥'];
const GAN_ZHI_SAME_POSITION = ['甲寅', '丁未', '己未', '庚申', '癸丑'];

const yinYang = (s) => (['甲', '丙', '戊', '庚', '壬'].includes(s) || ['子', '寅', '辰', '午', '申', '戌'].includes(s) ? '阳' : '阴');

function tianDiPan(jieqiName, hourZhi, dayGan) {
  const yueJiang = JIEQI_YUE_JIANG[jieqiName] ?? '子';
  const hourIndex = ZHI.indexOf(hourZhi);
  const yueJiangIndex = ZHI.indexOf(yueJiang);
  const tianPan = new Array(12);
  for (let i = 0; i < 12; i++) {
    tianPan[(hourIndex + i) % 12] = ZHI[(yueJiangIndex + i) % 12];
  }
  const dayNight = DAY_NIGHT_MAP[hourZhi] ?? '昼';
  const cfg = GUIREN_START[dayGan];
  const guirenStart = dayNight === '昼' ? cfg.day : cfg.night;
  const guirenIndex = ZHI.indexOf(guirenStart);
  const guirenTianZhi = tianPan[guirenIndex];
  const isReverse = YANG_POS.includes(guirenTianZhi);
  const tianJiang = new Array(12);
  if (isReverse) {
    const rev = ['贵', '后', '阴', '玄', '常', '虎', '空', '龙', '勾', '合', '雀', '蛇'];
    for (let i = 0; i < 12; i++) tianJiang[(guirenIndex + i) % 12] = rev[i];
  } else {
    for (let i = 0; i < 12; i++) tianJiang[(guirenIndex + i) % 12] = TIAN_JIANG[i];
  }
  const diToTian = {};
  const diToJiang = {};
  for (let i = 0; i < 12; i++) {
    diToTian[ZHI[i]] = tianPan[i];
    diToJiang[ZHI[i]] = tianJiang[i];
  }
  return { tianPan, diToTian, diToJiang, yueJiang, dayNight, guirenStart, isReverse };
}

function keRelation(shang, xia) {
  const sw = ZHI_WUXING[shang] ?? GAN_WUXING[shang] ?? '土';
  const xw = ZHI_WUXING[xia] ?? GAN_WUXING[xia] ?? '土';
  const rel = wuxingRelation(sw, xw);
  return { 克: '上克下', 被克: '下贼上', 生: '上生下', 被生: '下生上', 比和: '比和' }[rel] ?? '比和';
}

function siKe(dayGan, dayZhi, tdp) {
  const { diToTian, diToJiang } = tdp;
  const jiGong = GAN_JI_GONG[dayGan];
  const yi = diToTian[jiGong];
  const er = diToTian[yi];
  const san = diToTian[dayZhi];
  const si = diToTian[san];
  const mk = (pos, shang, xia) => ({
    position: pos,
    shang,
    xia,
    jiang: diToJiang[GAN_JI_GONG[xia] ?? xia] ?? '',
    relation: keRelation(shang, xia),
  });
  return [mk(1, yi, dayGan), mk(2, er, yi), mk(3, san, dayZhi), mk(4, si, san)];
}

function analyze(ke) {
  const s = { shangKeXia: 0, xiaZeiShang: 0 };
  for (const k of ke) {
    if (k.relation === '上克下') s.shangKeXia++;
    else if (k.relation === '下贼上') s.xiaZeiShang++;
  }
  return s;
}

function xunKong(dayGz, zhi) {
  // 该支是否落空：由日干支推旬空两支后比对
  return xunKongOf(dayGz).includes(zhi) ? zhi : null;
}

function chuan(pos, zhi, tdp, dayGan, dayGz) {
  const rel = wuxingRelation(GAN_WUXING[dayGan] ?? '土', ZHI_WUXING[zhi] ?? '土');
  return {
    position: pos,
    zhi,
    jiang: tdp.diToJiang[zhi] ?? '',
    jiangFull: JIANG_FULL[tdp.diToJiang[zhi]] ?? '',
    liuQin: LIUQIN_MAP[rel] ?? '兄弟',
    xunKong: xunKong(dayGz, zhi),
  };
}

function checkFanYin(tdp) {
  let cnt = 0;
  for (let i = 0; i < 12; i++) if (ZHI_CHONG[ZHI[i]] === tdp.diToTian[ZHI[i]]) cnt++;
  return cnt >= 6;
}

function sheHaiDepth(shang, xia) {
  const sw = ZHI_WUXING[shang] ?? '土';
  const start = ZHI.indexOf(xia);
  const end = ZHI.indexOf(shang);
  let cnt = 0;
  let cur = start;
  while (cur !== end) {
    if (wuxingRelation(sw, ZHI_WUXING[ZHI[cur]]) === '克') cnt++;
    cur = (cur - 1 + 12) % 12;
  }
  return cnt;
}

function multipleZeiKe(ke, dayGan, target) {
  const m = ke.filter((k) => k.relation === target);
  if (m.length === 1) return { zhi: m[0].shang, geJu: '贼克', detail: target === '下贼上' ? '重审' : '元首' };
  const yy = yinYang(dayGan);
  const same = m.filter((k) => yinYang(k.shang) === yy);
  if (same.length === 1) return { zhi: same[0].shang, geJu: '比用', detail: '知一' };
  const pool = same.length ? same : m;
  const ranked = pool.map((k) => ({ k, d: sheHaiDepth(k.shang, k.xia) })).sort((a, b) => b.d - a.d);
  const tied = ranked.length >= 2 && ranked[0].d === ranked[1].d;
  return { zhi: ranked[0].k.shang, geJu: '涉害', detail: tied ? '察微' : '见机' };
}

function noZeiKe(ke, tdp, dayGan) {
  const dw = GAN_WUXING[dayGan] ?? '土';
  for (const k of ke) {
    const rel = wuxingRelation(ZHI_WUXING[k.shang] ?? '土', dw);
    if (rel === '克') return { zhi: k.shang, geJu: '遥克', detail: '蒿矢' };
    if (rel === '被克') return { zhi: k.shang, geJu: '遥克', detail: '弹射' };
  }
  return { zhi: tdp.diToTian['酉'], geJu: '昴星', detail: yinYang(dayGan) === '阳' ? '虎视' : '冬蛇掩目' };
}

function fanYin(ke, dayGan, dayZhi, stats, isFB) {
  if (isFB) return { zhi: YI_MA[dayZhi] ?? '寅', detail: '绝嗣' };
  for (const rel of ['下贼上', '上克下']) {
    const m = ke.filter((k) => k.relation === rel);
    if (m.length) {
      const yy = yinYang(dayGan);
      const same = m.filter((k) => yinYang(k.shang) === yy);
      return { zhi: (same[0] ?? m[0]).shang, detail: '无依' };
    }
  }
  return { zhi: YI_MA[dayZhi] ?? '寅', detail: '无亲' };
}

/**
 * 排大六壬课
 * @param {object} input { year, month, day, hour, minute, lateZi? }
 */
export function buildDaliuren(input) {
  assertCivil(input);
  const { year, month, day, hour = 0, minute = 0 } = input;
  const lateZi = input.lateZi !== false;
  const jdnBase = toJDN(year, month, day);
  const jdn = lateZi && hour >= 23 ? jdnBase + 1 : jdnBase;
  const dayIdx = dayGanzhiIndex(jdn);
  const dayGz = ganzhiName(dayIdx).name;
  const dayGan = dayGz[0];
  const dayZhi = dayGz[1];
  const hourZhi = ZHI[Math.floor(((hour + 1) % 24) / 2)];

  // 月将：取出生时刻之前最近的节气（中气换将）
  const jd = jdnBase - 0.5 + (hour * 60 + minute) / 1440;
  const terms = termWindow(year).filter((t) => t.jd <= jd);
  const last = terms.length ? terms[terms.length - 1] : null;
  const jieqiName = last ? last.name : '冬至';

  const tdp = tianDiPan(jieqiName, hourZhi, dayGan);
  const ke = siKe(dayGan, dayZhi, tdp);

  const stats = analyze(ke);
  const isFuYin = tdp.yueJiang === hourZhi;
  const isFanYin = checkFanYin(tdp);
  const isBaZhuan = BA_ZHUAN_DAYS.includes(dayGz);
  const isSamePos = GAN_ZHI_SAME_POSITION.includes(dayGz);
  const isFanYinBaZhuan = isSamePos && stats.xiaZeiShang === 4;

  let chu;
  let geJu;
  let detail;
  if (isFanYin || isFanYinBaZhuan) {
    const r = fanYin(ke, dayGan, dayZhi, stats, isFanYinBaZhuan);
    chu = r.zhi; geJu = '返吟'; detail = r.detail;
  } else if (isFuYin) {
    chu = yinYang(dayGan) === '阳' ? GAN_JI_GONG[dayGan] : dayZhi;
    geJu = '伏吟'; detail = yinYang(dayGan) === '阳' ? '自任' : '杜传';
  } else if (isBaZhuan && stats.shangKeXia === 0 && stats.xiaZeiShang === 0) {
    const i = ZHI.indexOf(dayZhi);
    chu = ZHI[(i + (yinYang(dayGan) === '阳' ? 2 : -2) + 12) % 12];
    geJu = '八专'; detail = '帷簿';
  } else if (stats.xiaZeiShang === 1 && stats.shangKeXia === 0) {
    chu = ke.find((k) => k.relation === '下贼上').shang; geJu = '贼克'; detail = '重审';
  } else if (stats.shangKeXia === 1 && stats.xiaZeiShang === 0) {
    chu = ke.find((k) => k.relation === '上克下').shang; geJu = '贼克'; detail = '元首';
  } else if (stats.xiaZeiShang >= 1) {
    const r = multipleZeiKe(ke, dayGan, '下贼上');
    chu = r.zhi; geJu = r.geJu; detail = r.detail;
  } else if (stats.shangKeXia >= 2) {
    const r = multipleZeiKe(ke, dayGan, '上克下');
    chu = r.zhi; geJu = r.geJu; detail = r.detail;
  } else if (stats.shangKeXia === 0 && stats.xiaZeiShang === 0) {
    const r = noZeiKe(ke, tdp, dayGan);
    chu = r.zhi; geJu = r.geJu; detail = r.detail;
  } else {
    chu = ke[0].shang; geJu = '贼克'; detail = '元首';
  }

  let zhong;
  let mo;
  if (isFanYin) {
    zhong = ZHI_CHONG[chu];
    mo = ZHI_CHONG[zhong];
  } else {
    zhong = tdp.diToTian[chu];
    mo = tdp.diToTian[zhong];
  }

  return {
    system: 'daliuren',
    input: { year, month, day, hour, minute },
    dayGanZhi: dayGz,
    hourZhi,
    dayNight: tdp.dayNight,
    jieqi: { name: jieqiName, time: last ? formatJd(last.jd) : null },
    yueJiang: { zhi: tdp.yueJiang, name: YUE_JIANG_NAME[tdp.yueJiang] },
    guiren: { zhi: tdp.guirenStart, reverse: tdp.isReverse },
    pan: ZHI.map((d, i) => ({
      di: d,
      tian: tdp.tianPan[i],
      jiang: tdp.diToJiang[d],
      jiangFull: JIANG_FULL[tdp.diToJiang[d]],
    })),
    siKe: ke.map((k) => ({ ...k, jiangFull: JIANG_FULL[k.jiang] ?? '' })),
    sanChuan: {
      chu: chuan('初传', chu, tdp, dayGan, dayGz),
      zhong: chuan('中传', zhong, tdp, dayGan, dayGz),
      mo: chuan('末传', mo, tdp, dayGan, dayGz),
    },
    shensha: calcShensha(dayGz),
    geJu: { name: geJu, detail },
  };
}

export { ZHI, GAN, TIAN_JIANG, JIANG_FULL, JIEQI_YUE_JIANG, GAN_JI_GONG };


