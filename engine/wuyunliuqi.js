// 五运六气（运气学说）· 本地确定性 · 通行口径
//
// 提供：运气年（大寒界）、年干支、岁运（中运）太过/不及、司天与在泉、主运/客运五步、
// 主气/客气六步、当前所处的运与气、天符/岁会/同天符/同岁会/太乙天符，以及气候与病位倾向。
//
// 诚实边界：本文件只做「按规则推盘」这一层。运气学说里的方药、运气合参、
// 《素问·六元正纪大论》六十年逐年全文与「刚柔失守」「升降不前」等推演未收录（见 scope）。
// 病位与气候倾向照传统说法转述，是象征与经验归纳，不是医学判断。
import { fail } from './fail.js';
import {
  STEMS, BRANCHES, termInstantJd, ganzhiName, formatJd,
} from './calendar.js';
import { assertCivil, daysInMonth } from './validate.js';

/** 主气六步的固定次序（《素问·六微旨大论》）：厥阴 → 少阴 → 少阳 → 太阴 → 阳明 → 太阳。 */
export const ZHU_QI_ORDER = ['厥阴风木', '少阴君火', '少阳相火', '太阴湿土', '阳明燥金', '太阳寒水'];

/** 客气（三阴三阳）的轮转次序：厥阴 → 少阴 → 太阴 → 少阳 → 阳明 → 太阳。 */
export const QI_ORDER = ['厥阴风木', '少阴君火', '太阴湿土', '少阳相火', '阳明燥金', '太阳寒水'];

/** 主运五步的固定次序：木（角）→ 火（徵）→ 土（宫）→ 金（商）→ 水（羽）。 */
export const ZHU_YUN_ORDER = ['木', '火', '土', '金', '水'];

/** 天干化五运（《素问·天元纪大论》）：甲己化土、乙庚化金、丙辛化水、丁壬化木、戊癸化火。 */
export const YUN_OF_STEM = {
  甲: '土', 己: '土',
  乙: '金', 庚: '金',
  丙: '水', 辛: '水',
  丁: '木', 壬: '木',
  戊: '火', 癸: '火',
};

/** 地支化六气之「司天」（子午少阴、丑未太阴、寅申少阳、卯酉阳明、辰戌太阳、巳亥厥阴）。 */
export const SITIAN_INDEX_OF_BRANCH = [1, 2, 3, 4, 5, 0];

/** 五运的乐音与所主脏腑、气候（传统对应，只作命名与取象）。 */
export const YUN_INFO = {
  木: { tone: '角', organ: '肝', nature: '风', text: '木运' },
  火: { tone: '徵', organ: '心', nature: '热', text: '火运' },
  土: { tone: '宫', organ: '脾', nature: '湿', text: '土运' },
  金: { tone: '商', organ: '肺', nature: '燥', text: '金运' },
  水: { tone: '羽', organ: '肾', nature: '寒', text: '水运' },
};

/** 六气所主脏腑与气候。 */
export const QI_INFO = {
  厥阴风木: { wuxing: '木', organ: '肝', nature: '风', short: '风木' },
  少阴君火: { wuxing: '火', organ: '心', nature: '热', short: '君火' },
  太阴湿土: { wuxing: '土', organ: '脾', nature: '湿', short: '湿土' },
  少阳相火: { wuxing: '火', organ: '三焦', nature: '火', short: '相火' },
  阳明燥金: { wuxing: '金', organ: '肺', nature: '燥', short: '燥金' },
  太阳寒水: { wuxing: '水', organ: '肾', nature: '寒', short: '寒水' },
};

/**
 * 岁运太过/不及的取象：太过则本气偏胜、克其所胜；不及则本气不足、所不胜乘之。
 * 每条都只写「传统上常这样描述」，不写「必然出现」。
 */
export const YUN_EFFECT = {
  木: {
    tai: { climate: '风气偏胜，草木早荣', organ: '肝气偏旺，脾土受克', sign: '易怒、胁胀、食少、肢体震颤' },
    bu: { climate: '风气不足，燥气乘之', organ: '肝木不及，肺金偏胜', sign: '筋脉拘急、目干、情绪低落' },
  },
  火: {
    tai: { climate: '火气偏胜，暑热早至', organ: '心火偏旺，肺金受克', sign: '心烦、失眠、咳喘、口疮' },
    bu: { climate: '火气不足，寒气乘之', organ: '心火不及，肾水偏胜', sign: '心悸、畏寒、胸闷、精神不振' },
  },
  土: {
    tai: { climate: '雨湿偏多，土气壅滞', organ: '脾湿偏胜，肾水受克', sign: '腹胀、身重、大便黏、四肢困倦' },
    bu: { climate: '土气不足，风气乘之', organ: '脾土不及，肝木偏胜', sign: '飧泄、乏力、腹鸣、食后胀' },
  },
  金: {
    tai: { climate: '燥气偏胜，天气清凉', organ: '肺燥偏胜，肝木受克', sign: '干咳、鼻干、皮肤干、筋急' },
    bu: { climate: '金气不足，火气乘之', organ: '肺金不及，心火偏胜', sign: '咳逆、鼻塞、咽干、易感外邪' },
  },
  水: {
    tai: { climate: '寒气偏胜，冰霜早降', organ: '肾寒偏胜，心火受克', sign: '畏寒、水肿、腰冷、心悸' },
    bu: { climate: '水气不足，湿土乘之', organ: '肾水不及，脾土偏胜', sign: '腰膝无力、小便不利、下肢沉' },
  },
};

/** 六气司天时传统上说的气候与病位（《素问·五常政大论》《至真要大论》通行转述）。 */
export const QI_CLIMATE = {
  厥阴风木: { climate: '风气流行，草木动摇', sign: '眩晕、抽搐、胁痛、过敏类症状偏多' },
  少阴君火: { climate: '热气偏胜，暑热早来', sign: '心烦、口疮、失眠、咽痛偏多' },
  太阴湿土: { climate: '湿气偏胜，阴雨多', sign: '腹胀、身重、泄泻、关节酸沉偏多' },
  少阳相火: { climate: '火气偏胜，炎热', sign: '头痛、目赤、耳鸣、疮疡偏多' },
  阳明燥金: { climate: '燥气偏胜，干燥少雨', sign: '干咳、鼻干、皮肤裂、便秘偏多' },
  太阳寒水: { climate: '寒气偏胜，霜雪多', sign: '畏寒、关节痛、腹痛、水肿偏多' },
};

/** 本文件覆盖到哪一层。 */
export const WUYUNLIUQI_SCOPE = {
  covered: [
    '运气年（大寒为界）与年干支',
    '岁运（中运）五行与太过/不及、五音太少',
    '司天、在泉',
    '主运五步与客运五步（含每步起止时刻）',
    '主气六步与客气六步（含每步起止时刻）',
    '当前时刻所处的运与气',
    '天符 / 岁会 / 同天符 / 同岁会 / 太乙天符',
  ],
  notCovered: [
    '《素问·六元正纪大论》六十年逐年全文与「先立其年，以明其气」的逐气病证条辨',
    '刚柔失守、升降不前、不迁正、不退位等岁气交司推演',
    '运气合参的方药与针灸取穴',
    '地域与体质差异对运气的修正',
  ],
  note: '病位、气候与症状倾向都是传统说法的转述，用来对照季节与身体感受，不是诊断结论。',
};

const YUN_DAYS = 365.25 / 5; // 73.05 日一运
const QI_DAYS = 365.25 / 6; // 60.875 日一气

function stemIndex(stem) {
  const i = STEMS.indexOf(stem);
  if (i < 0) throw fail('E_INPUT', `天干「${stem}」不在十干之内`);
  return i;
}

function branchIndex(branch) {
  const i = BRANCHES.indexOf(branch);
  if (i < 0) throw fail('E_INPUT', `地支「${branch}」不在十二支之内`);
  return i;
}

/** 公历年 → 该年干支（甲子起 1984，年界按立春，与八字侧同源）。 */
export function yearGanzhiOf(year) {
  const idx = (((year - 4) % 60) + 60) % 60;
  return ganzhiName(idx);
}

/** 中运（岁运）：由年干化运，阳干太过、阴干不及。 */
export function zhongyunOf(stem) {
  const si = stemIndex(stem);
  const wuxing = YUN_OF_STEM[stem];
  const tai = si % 2 === 0; // 甲丙戊庚壬为阳干（索引 0/2/4/6/8）
  const info = YUN_INFO[wuxing];
  return {
    gan: stem,
    wuxing,
    tone: info.tone,
    tai,
    name: `${wuxing}运${tai ? '太过' : '不及'}`,
    taiShao: `${tai ? '太' : '少'}${info.tone}`,
    organ: info.organ,
    nature: info.nature,
  };
}

/** 司天与在泉：由年支定，在泉为司天的对宫（相隔三步）。 */
export function sitianOf(branch) {
  const bi = branchIndex(branch);
  const sitIdx = SITIAN_INDEX_OF_BRANCH[bi % 6];
  const zaiIdx = (sitIdx + 3) % 6;
  return {
    sitIdx,
    zaiIdx,
    sitian: QI_ORDER[sitIdx],
    zaiquan: QI_ORDER[zaiIdx],
  };
}

/** 主运五步：初运木，按相生序，每步 73.05 日，从大寒起算。 */
function zhuYunSteps(startJd) {
  return ZHU_YUN_ORDER.map((wuxing, i) => {
    const info = YUN_INFO[wuxing];
    const start = startJd + i * YUN_DAYS;
    const end = start + YUN_DAYS;
    return {
      no: i + 1,
      wuxing,
      name: `${wuxing}运`,
      tone: info.tone,
      taiShao: `太${info.tone}`,
      startJd: start,
      endJd: end,
      startTime: formatJd(start),
      endTime: formatJd(end),
      days: Math.round(YUN_DAYS * 100) / 100,
    };
  });
}

/** 客运五步：以岁运为初运，按五行相生轮转，太少相生（太过生不及、不及生太过）。 */
function keYunSteps(zhongyun, startJd) {
  const startIdx = ZHU_YUN_ORDER.indexOf(zhongyun.wuxing);
  return Array.from({ length: 5 }, (_, i) => {
    const wuxing = ZHU_YUN_ORDER[(startIdx + i) % 5];
    const info = YUN_INFO[wuxing];
    const tai = i % 2 === 0 ? zhongyun.tai : !zhongyun.tai;
    const start = startJd + i * YUN_DAYS;
    const end = start + YUN_DAYS;
    return {
      no: i + 1,
      wuxing,
      tai,
      name: `${wuxing}运${tai ? '太过' : '不及'}`,
      tone: info.tone,
      taiShao: `${tai ? '太' : '少'}${info.tone}`,
      startTime: formatJd(start),
      endTime: formatJd(end),
    };
  });
}

/** 主气六步：初之气厥阴风木，按固定次序，每步 60.875 日。 */
function zhuQiSteps(startJd) {
  return ZHU_QI_ORDER.map((qi, i) => {
    const info = QI_INFO[qi];
    const start = startJd + i * QI_DAYS;
    const end = start + QI_DAYS;
    return {
      no: i + 1,
      qi,
      wuxing: info.wuxing,
      organ: info.organ,
      nature: info.nature,
      name: `${qi}`,
      startTime: formatJd(start),
      endTime: formatJd(end),
      days: Math.round(QI_DAYS * 100) / 100,
    };
  });
}

/** 客气六步：三之气为司天、终之气为在泉，初之气由司天倒退两步。 */
function keQiSteps(sitIdx, startJd) {
  const first = ((sitIdx - 2) % 6 + 6) % 6;
  return Array.from({ length: 6 }, (_, i) => {
    const qi = QI_ORDER[(first + i) % 6];
    const info = QI_INFO[qi];
    const start = startJd + i * QI_DAYS;
    const end = start + QI_DAYS;
    return {
      no: i + 1,
      qi,
      wuxing: info.wuxing,
      organ: info.organ,
      nature: info.nature,
      name: qi,
      sitian: i === 2,
      zaiquan: i === 5,
      startTime: formatJd(start),
      endTime: formatJd(end),
    };
  });
}

/** 年支的「本位五行」：子水午火卯木酉金、辰戌丑未土；寅申巳亥为长生位，不参与岁会。 */
const BRANCH_BENWEI = {
  子: '水', 午: '火', 卯: '木', 酉: '金',
  辰: '土', 戌: '土', 丑: '土', 未: '土',
  寅: null, 申: null, 巳: null, 亥: null,
};

/**
 * 五运六气的「运气年」：以大寒为界（不是立春、不是正月初一）。
 * 交大寒之前仍算上一运气年。
 */
export function yunYearOf(year, jd) {
  const daHan = termInstantJd(year, 1);
  if (jd >= daHan) {
    return { nian: year, startJd: daHan, endJd: termInstantJd(year + 1, 1) };
  }
  return { nian: year - 1, startJd: termInstantJd(year - 1, 1), endJd: daHan };
}

/** 特殊格局：天符 / 岁会 / 同天符 / 同岁会 / 太乙天符。 */
export function specialOf(zhongyun, sitian, zaiquan, branch) {
  const yunWx = zhongyun.wuxing;
  const sitWx = QI_INFO[sitian].wuxing;
  const zaiWx = QI_INFO[zaiquan].wuxing;
  const benwei = BRANCH_BENWEI[branch] || null;
  const tianFu = yunWx === sitWx;
  const suiHui = !!benwei && yunWx === benwei;
  const tongTianFu = zhongyun.tai && yunWx === zaiWx;
  const tongSuiHui = !zhongyun.tai && yunWx === zaiWx;
  const taiYi = tianFu && suiHui;
  const notes = [];
  if (taiYi) {
    notes.push('太乙天符：中运与司天同气、又与年支本位同气，传统上视为六十年里最「重」的一类年份之一，气候与病气的变化都容易被放大。');
  } else if (tianFu) {
    notes.push('天符：中运与司天同气。传统上说这一年本气专一而偏胜，气候变化来得整齐。');
  }
  if (suiHui) {
    notes.push('岁会：中运与年支本位同气。传统上说这一年气令与地域相应，来得比较「正」。');
  }
  if (tongTianFu) {
    notes.push('同天符：阳年太过之运与在泉同气，下半年（在泉主事）容易延续上半年的偏胜。');
  }
  if (tongSuiHui) {
    notes.push('同岁会：阴年不及之运与在泉同气，本气本已不足，下半年又被同一气拖住，恢复更慢。');
  }
  return { tianFu, suiHui, tongTianFu, tongSuiHui, taiYi, notes };
}

/**
 * 排一年的五运六气。
 * @param {{year:number, month:number, day:number, hour?:number, minute?:number}} input
 */
export function buildWuyunliuqi(input) {
  assertCivil(input, '五运六气');
  const { year, month, day } = input;
  if (day > daysInMonth(year, month)) {
    throw fail('E_INPUT', `非法日期：${year} 年 ${month} 月没有 ${day} 日`);
  }
  const hour = Number.isInteger(input.hour) ? input.hour : 12;
  const minute = Number.isInteger(input.minute) ? input.minute : 0;
  if (hour < 0 || hour > 23) throw fail('E_INPUT', 'hour 要在 0–23 之间');
  if (minute < 0 || minute > 59) throw fail('E_INPUT', 'minute 要在 0–59 之间');

  // 当日正午的 jd 作参考点；有具体时刻时用它，判断「当前在第几气」更准
  const jd = termInstantJd(year, 1) * 0
    + (function () {
      // 用公历日期构造本地时间轴 jd：以当日 00:00 为整数、按 24 小时折算
      const jdn = (function (y, m, d) {
        const a = Math.floor((14 - m) / 12);
        const yy = y + 4800 - a;
        const mm = m + 12 * a - 3;
        return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4)
          - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
      })(year, month, day);
      return jdn - 0.5 + (hour * 60 + minute) / 1440;
    })();

  const yun = yunYearOf(year, jd);
  const gz = yearGanzhiOf(yun.nian);
  const zhongyun = zhongyunOf(gz.stem);
  const sit = sitianOf(gz.branch);

  const zhuYun = zhuYunSteps(yun.startJd);
  const keYun = keYunSteps(zhongyun, yun.startJd);
  const zhuQi = zhuQiSteps(yun.startJd);
  const keQi = keQiSteps(sit.sitIdx, yun.startJd);

  const dayInYear = jd - yun.startJd;
  const yunNo = Math.min(5, Math.max(1, Math.floor(dayInYear / YUN_DAYS) + 1));
  const qiNo = Math.min(6, Math.max(1, Math.floor(dayInYear / QI_DAYS) + 1));
  const curZhuYun = zhuYun[yunNo - 1];
  const curKeYun = keYun[yunNo - 1];
  const curZhuQi = zhuQi[qiNo - 1];
  const curKeQi = keQi[qiNo - 1];

  const eff = YUN_EFFECT[zhongyun.wuxing][zhongyun.tai ? 'tai' : 'bu'];
  const sitClimate = QI_CLIMATE[sit.sitian];
  const zaiClimate = QI_CLIMATE[sit.zaiquan];
  const special = specialOf(zhongyun, sit.sitian, sit.zaiquan, gz.branch);

  // 客气加临主气：只看「同气 / 相生 / 相克」，给一层很轻的提示，不做病证条辨
  const curKeQx = QI_INFO[curKeQi.qi].wuxing;
  const curZhuQx = QI_INFO[curZhuQi.qi].wuxing;
  const sheng = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
  const ke = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };
  let lin = '相安';
  if (curKeQx === curZhuQx) lin = '同气';
  else if (sheng[curKeQx] === curZhuQx) lin = '客生主（顺）';
  else if (sheng[curZhuQx] === curKeQx) lin = '主生客（泄）';
  else if (ke[curKeQx] === curZhuQx) lin = '客克主（逆）';
  else if (ke[curZhuQx] === curKeQx) lin = '主克客（从）';

  const comboName = `${sit.sitian}司天 · ${zhongyun.name}`;
  const comboText = `这一运气年是「${gz.name}」年：中运${zhongyun.name}（${zhongyun.taiShao}），${sit.sitian}司天、${sit.zaiquan}在泉。`
    + `传统上把这样的组合读成「${eff.climate}」，司天一侧偏「${sitClimate.climate}」，在泉一侧偏「${zaiClimate.climate}」。`;

  return {
    system: 'wuyunliuqi',
    meta: {
      datetime: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      nian: yun.nian,
      ganzhi: gz.name,
      stem: gz.stem,
      branch: gz.branch,
      isYang: zhongyun.tai,
      startTime: formatJd(yun.startJd),
      endTime: formatJd(yun.endJd),
      dayInYear: Math.round(dayInYear * 100) / 100,
    },
    year: {
      ganzhi: gz.name,
      stem: gz.stem,
      branch: gz.branch,
      nian: yun.nian,
      startTime: formatJd(yun.startJd),
      endTime: formatJd(yun.endJd),
      note: '运气年以大寒为界：交大寒之前仍算上一运气年，与八字按立春定年柱不同。',
    },
    zhongyun: {
      ...zhongyun,
      effect: eff,
      text: `中运${zhongyun.name}（${zhongyun.taiShao}），主${zhongyun.organ}，气候偏${zhongyun.nature}。`,
    },
    sitian: {
      qi: sit.sitian,
      ...QI_INFO[sit.sitian],
      climate: sitClimate,
      text: `${sit.sitian}司天：上半年（三之气起）主事，气候偏${QI_INFO[sit.sitian].nature}。`,
    },
    zaiquan: {
      qi: sit.zaiquan,
      ...QI_INFO[sit.zaiquan],
      climate: zaiClimate,
      text: `${sit.zaiquan}在泉：下半年（终之气）主事，气候偏${QI_INFO[sit.zaiquan].nature}。`,
    },
    zhuYun,
    keYun,
    zhuQi,
    keQi,
    current: {
      dayInYear: Math.round(dayInYear * 100) / 100,
      yunNo,
      qiNo,
      zhuYun: curZhuYun,
      keYun: curKeYun,
      zhuQi: curZhuQi,
      keQi: curKeQi,
      lin,
      text: `此刻在第 ${yunNo} 运（主运${curZhuYun.name} / 客运${curKeYun.name}）、第 ${qiNo} 气（主气${curZhuQi.qi} / 客气${curKeQi.qi}，客气加临主气：${lin}）。`,
    },
    special,
    combo: { name: comboName, text: comboText },
    scope: WUYUNLIUQI_SCOPE,
  };
}

export { YUN_DAYS, QI_DAYS };