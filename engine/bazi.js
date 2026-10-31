// 四柱八字引擎
import {
  STEMS, BRANCHES, TERM_NAMES,
  ganzhiName, dayGanzhiIndex, jdToParts, partsToJd, sexagenaryIndex,
  termWindow, previousJie, nextJie, equationOfTime, formatJd, xunKongOf,
} from './calendar.js';
import { resolveAddress } from './geo.js';
import { computeBaziShensha } from './shensha.js';
import { assertCivil, daysInMonth } from './validate.js';
import { applyDst } from './dst.js';
import { nayinOf } from './nayin.js';
import { SANHE } from './sanhe.js';
import { analyzeBaziFrame, scoreLuck } from './geju.js';

// 地支藏干（本气 / 中气 / 余气）
export const HIDDEN_STEMS = {
  子: ['癸'],
  丑: ['己', '癸', '辛'],
  寅: ['甲', '丙', '戊'],
  卯: ['乙'],
  辰: ['戊', '乙', '癸'],
  巳: ['丙', '戊', '庚'],
  午: ['丁', '己'],
  未: ['己', '丁', '乙'],
  申: ['庚', '壬', '戊'],
  酉: ['辛'],
  戌: ['戊', '辛', '丁'],
  亥: ['壬', '甲'],
};

// 人元司权的 30 日表：余气 → 中气 → 本气，按「节」当日起算。
// 各家对日数分法不一（另有 7/7/16、9/3/18 等），这里固定通行 30 日表；
// 只作解释层的一层细节，不参与取格。亥月的余气戊不在本柱藏干表中，两表各照原样。
export const RENYUAN_TABLE = {
  寅: [['戊', 7], ['丙', 7], ['甲', 16]],
  卯: [['甲', 10], ['乙', 20]],
  辰: [['乙', 9], ['癸', 3], ['戊', 18]],
  巳: [['戊', 5], ['庚', 9], ['丙', 16]],
  午: [['丙', 10], ['己', 9], ['丁', 11]],
  未: [['丁', 9], ['乙', 3], ['己', 18]],
  申: [['戊', 7], ['壬', 3], ['庚', 20]],
  酉: [['庚', 10], ['辛', 20]],
  戌: [['辛', 9], ['丁', 3], ['戊', 18]],
  亥: [['戊', 7], ['甲', 5], ['壬', 18]],
  子: [['壬', 10], ['癸', 20]],
  丑: [['癸', 9], ['辛', 3], ['己', 18]],
};

export const STEM_ELEMENT = {
  甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土',
  己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水',
};

export const BRANCH_ELEMENT = {
  子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火',
  午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水',
};

const GENERATES = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const OVERCOMES = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };

const isYangStem = (stem) => STEMS.indexOf(stem) % 2 === 0;

// 两套藏干权重是不同用途，不是"同一件事写了两次"：
//   · 五行占比——看这一行在盘里有多少，本气 1 / 中气 0.5 / 余气 0.3；
//   · 日主通根——看这一支能不能让日主站住，本气权重更高（1.2 / 0.6 / 0.3）。
const WUXING_HIDDEN_WEIGHT = [1, 0.5, 0.3];
const ROOT_HIDDEN_WEIGHT = [1.2, 0.6, 0.3];

const STEM_HE = { 甲己: '土', 乙庚: '金', 丙辛: '水', 丁壬: '木', 戊癸: '火' };
const STEM_CHONG_PAIRS = ['甲庚', '乙辛', '丙壬', '丁癸'];
const BRANCH_HE = { 子丑: '土', 寅亥: '木', 卯戌: '火', 辰酉: '金', 巳申: '水', 午未: '土' };
const SANHUI = { 寅卯辰: '木', 巳午未: '火', 申酉戌: '金', 亥子丑: '水' };
const BRANCH_CHONG = ['子午', '丑未', '寅申', '卯酉', '辰戌', '巳亥'];
const BRANCH_HAI = ['子未', '丑午', '寅巳', '卯辰', '申亥', '酉戌'];
const BRANCH_PO = ['子酉', '丑辰', '寅亥', '卯午', '巳申', '未戌'];
// 三刑：寅巳申（无恩之刑）、丑戌未（恃势之刑）、子卯（无礼之刑）。
// 另有「自刑」：辰午酉亥四支见同支即自刑（辰辰、午午、酉酉、亥亥），此前漏判。
const XING_GROUPS = [['寅', '巳', '申'], ['丑', '戌', '未'], ['子', '卯']];
const XING_SELF = ['辰', '午', '酉', '亥'];

const hasPair = (list, a, b) => list.includes(a + b) || list.includes(b + a);

/** 干支关系：五合、相冲、相克；六合、三合半合、三会半会拱会、冲、害、破、刑 */
export function buildRelations(pillars) {
  const stems = ['year', 'month', 'day', 'hour'].map((k) => pillars[k].stem);
  const branches = ['year', 'month', 'day', 'hour'].map((k) => pillars[k].branch);

  const stemOut = [];
  for (let i = 0; i < 4; i++) {
    for (let j = i + 1; j < 4; j++) {
      const a = stems[i];
      const b = stems[j];
      if (a === b) continue;
      const he = STEM_HE[a + b] || STEM_HE[b + a];
      // 五合只是「有合」；是否真化要看月令、化神与争合妒合，不在这一层断言
      if (he) { stemOut.push({ text: `${a}${b}合（化${he}待定）`, rank: 0 }); continue; }
      if (hasPair(STEM_CHONG_PAIRS, a, b)) { stemOut.push({ text: `${a}${b}相冲`, rank: 1 }); continue; }
      const ea = STEM_ELEMENT[a];
      const eb = STEM_ELEMENT[b];
      if (OVERCOMES[ea] === eb) stemOut.push({ text: `${a}克${b}`, rank: 3 });
      else if (OVERCOMES[eb] === ea) stemOut.push({ text: `${b}克${a}`, rank: 3 });
    }
  }

  const branchOut = [];
  const set = new Set(branches);
  const fullSans = [];
  for (const [k, v] of Object.entries(SANHE)) {
    if ([...k].every((c) => set.has(c))) {
      branchOut.push({ text: `${k}三合${v}`, rank: 0 });
      fullSans.push(k);
    }
  }
  const fullHuis = [];
  for (const [k, v] of Object.entries(SANHUI)) {
    if ([...k].every((c) => set.has(c))) {
      branchOut.push({ text: `${k}三会${v}`, rank: 0 });
      fullHuis.push(k);
    }
  }
  for (let i = 0; i < 4; i++) {
    for (let j = i + 1; j < 4; j++) {
      const a = branches[i];
      const b = branches[j];
      if (a === b) {
        // 同支不是"没关系"：辰午酉亥两柱同见为自刑
        if (XING_SELF.includes(a)) branchOut.push({ text: `${a}${b}自刑`, rank: 2 });
        continue;
      }
      const he = BRANCH_HE[a + b] || BRANCH_HE[b + a];
      const sh = Object.keys(SANHE).find((k) => k.includes(a) && k.includes(b));
      const hui = Object.keys(SANHUI).find((k) => k.includes(a) && k.includes(b));
      if (he) {
        // 六合优先，不再重复标半合/半会
        branchOut.push({ text: `${a}${b}合${he}`, rank: 0 });
      } else {
        if (sh && !fullSans.includes(sh)) {
          const mid = sh[1];
          const kind = a === mid || b === mid ? '半合' : '拱合';
          branchOut.push({ text: `${a}${b}${kind}${SANHE[sh]}`, rank: 0 });
        }
        if (hui && !fullHuis.includes(hui)) {
          const adj = Math.abs(hui.indexOf(a) - hui.indexOf(b)) === 1;
          branchOut.push({ text: `${a}${b}${adj ? '半会' : '拱会'}${SANHUI[hui]}`, rank: 0 });
        }
      }
      if (hasPair(BRANCH_CHONG, a, b)) branchOut.push({ text: `${a}${b}相冲`, rank: 1 });
      if (hasPair(BRANCH_HAI, a, b)) branchOut.push({ text: `${a}${b}相害`, rank: 2 });
      if (hasPair(BRANCH_PO, a, b)) branchOut.push({ text: `${a}${b}相破`, rank: 2 });
      for (const g of XING_GROUPS) {
        if (g.includes(a) && g.includes(b)) branchOut.push({ text: `${a}${b}相刑`, rank: 2 });
      }
    }
  }

  const uniq = (arr) => {
    const seen = new Set();
    const out = [];
    for (const x of [...arr].sort((p, q) => p.rank - q.rank)) {
      if (!seen.has(x.text)) { seen.add(x.text); out.push(x.text); }
    }
    return out;
  };
  return { stems: uniq(stemOut), branches: uniq(branchOut) };
}

/** 十神：以日干为我 */
export function tenGod(dayStem, otherStem) {
  const me = STEM_ELEMENT[dayStem];
  const it = STEM_ELEMENT[otherStem];
  const samePolarity = isYangStem(dayStem) === isYangStem(otherStem);
  if (me === it) return samePolarity ? '比肩' : '劫财';
  if (GENERATES[me] === it) return samePolarity ? '食神' : '伤官';
  if (OVERCOMES[me] === it) return samePolarity ? '偏财' : '正财';
  if (OVERCOMES[it] === me) return samePolarity ? '七杀' : '正官';
  if (GENERATES[it] === me) return samePolarity ? '偏印' : '正印';
  return '?';
}

export function nayin(ganzhiIdx) {
  return nayinOf(ganzhiIdx).name;
}

const JIE_TO_MONTH_BRANCH = { 0: 1, 2: 2, 4: 3, 6: 4, 8: 5, 10: 6, 12: 7, 14: 8, 16: 9, 18: 10, 20: 11, 22: 0 };

function pillar(ganzhiIdx, dayStem) {
  const g = ganzhiName(ganzhiIdx);
  const hidden = HIDDEN_STEMS[g.branch];
  return {
    ganzhi: g.name,
    stem: g.stem,
    branch: g.branch,
    stemElement: STEM_ELEMENT[g.stem],
    branchElement: BRANCH_ELEMENT[g.branch],
    stemTenGod: dayStem ? tenGod(dayStem, g.stem) : null,
    hidden: hidden.map((s, i) => ({
      stem: s,
      element: STEM_ELEMENT[s],
      tenGod: dayStem ? tenGod(dayStem, s) : null,
      role: ['本气', '中气', '余气'][i] ?? '余气',
    })),
    nayin: nayin(ganzhiIdx),
  };
}

/**
 * 真太阳时修正
 * @returns {{offsetMinutes:number, jd:number, note:string}}
 */
export function applyTrueSolar(jd, longitude) {
  const p = jdToParts(jd);
  if (longitude == null || Number.isNaN(longitude)) {
    return { offsetMinutes: 0, jd, note: '未提供经度，按东八区平太阳时' };
  }
  const longitudeMinutes = (longitude - 120) * 4;
  const eot = equationOfTime(p.year, p.month, p.day);
  const offset = longitudeMinutes + eot;
  return {
    offsetMinutes: Math.round(offset * 10) / 10,
    jd: jd + offset / 1440,
    note: `经度差 ${longitudeMinutes.toFixed(1)} 分 + 均时差 ${eot.toFixed(1)} 分`,
  };
}

/**
 * 人元司权：生在本月第几日、哪一藏干当权。
 * 日数按「节令日」与出生日的日差计，节当日为第 1 日；固定 30 日表，
 * 第 31 日以后不再硬分摊，按本气算并标 beyond。
 * @param {string} monthBranch 月支（寅…丑）
 * @param {number} birthJdn 出生日的儒略日数（含真太阳时修正后的日）
 * @param {number} termJd 本月「节」的儒略日
 */
export function renyuanOf(monthBranch, birthJdn, termJd) {
  const table = RENYUAN_TABLE[monthBranch];
  if (!table) return null;
  const segments = [];
  let from = 1;
  for (const [stem, days] of table) {
    segments.push({ stem, element: STEM_ELEMENT[stem], from, to: from + days - 1 });
    from += days;
  }
  const tableDays = from - 1;
  const day = Math.max(1, Math.floor(birthJdn) - Math.floor(termJd + 0.5) + 1);
  const beyond = day > tableDays;
  const idx = beyond ? segments.length - 1 : segments.findIndex((s) => day >= s.from && day <= s.to);
  const seg = segments[idx] || segments[segments.length - 1];
  const next = segments[idx + 1] || null;
  return {
    month: monthBranch,
    day,
    tableDays,
    segments,
    active: seg.stem,
    activeElement: seg.element,
    segment: { from: seg.from, to: seg.to },
    next: next ? { stem: next.stem, element: next.element, from: next.from, inDays: next.from - day } : null,
    // 司权表与本柱藏干表口径不同：亥月的余气戊只出现在司权表里
    inHidden: (HIDDEN_STEMS[monthBranch] || []).includes(seg.stem),
    beyond,
    note: '人元司权按「节」当日起算，节当日为第 1 日，日差用本盘所用时刻（含真太阳时）所在日计；本插件固定 30 日表（余气 → 中气 → 本气），第 31 日以后按本气算。只作解释层的一层细节，不改取格。',
  };
}

/**
 * 排四柱八字
 * @param {object} input { year,month,day,hour,minute, gender:'male'|'female', longitude?, lateZi?:boolean, trueSolar?:boolean }
 */
export function buildBazi(input) {
  assertCivil(input);
  let { year, month, day, hour = 0, minute = 0, gender = 'male' } = input;
  const lateZi = input.lateZi !== false;
  const useTrueSolar = input.trueSolar !== false;
  // 1986–1991 中国夏令时：出生证钟面时间普遍是「拨快 1 小时」的钟面时间，
  // 不校正会让时柱（乃至跨 23:00 的日柱）整档偏；显式传 dst:false 可关闭。
  const dst = input.dst === false ? { applied: false, note: null } : applyDst({ year, month, day, hour, minute });
  if (dst.applied) {
    year = dst.year; month = dst.month; day = dst.day; hour = dst.hour; minute = dst.minute;
  }

  const civilJd = partsToJd({ year, month, day, hour, minute });
  // 地址 -> 经度：手填的 longitude 优先，其次按地址查表
  const geo = input.geo || (input.address ? resolveAddress(input.address) : null);
  const longitude = typeof input.longitude === 'number'
    ? input.longitude
    : (geo && typeof geo.lon === 'number' ? geo.lon : undefined);
  const solar = useTrueSolar ? applyTrueSolar(civilJd, longitude) : { offsetMinutes: 0, jd: civilJd, note: '未启用真太阳时' };
  const jd = solar.jd;

  // 八字只用「节」定月柱与起运（气不参与），传 jieOnly 省掉一半节气求值
  const terms = termWindow(year, { jieOnly: true });
  const prevJieTerm = previousJie(terms, jd);
  const nextJieTerm = nextJie(terms, jd);

  // 年柱：以立春为界
  const lichun = terms.find((t) => t.index === 2 && t.year === year);
  const solarYear = lichun && jd < lichun.jd ? year - 1 : year;
  const yearIdx = (((solarYear - 4) % 60) + 60) % 60;
  const yearStem = STEMS[yearIdx % 10];

  // 月柱：以「节」为界
  const monthBranchIdx = JIE_TO_MONTH_BRANCH[prevJieTerm.index];
  const yinMonthStem = ((STEMS.indexOf(yearStem) % 5) * 2 + 2) % 10;
  const monthOffset = ((monthBranchIdx - 2) % 12 + 12) % 12; // 0 = 寅月
  const monthStemIdx = (yinMonthStem + monthOffset) % 10;
  const monthIdx = sexagenaryIndex(monthStemIdx, monthBranchIdx);

  // 日柱：23:00 后是否换日
  const jdnBase = Math.floor(jd + 0.5);
  const hourOfDay = jdToParts(jd).hour;
  const jdn = lateZi && hourOfDay >= 23 ? jdnBase + 1 : jdnBase;
  const dayIdx = dayGanzhiIndex(jdn);
  const dayStem = STEMS[dayIdx % 10];

  // 时柱：五鼠遁
  const hourBranchIdx = Math.floor(((hourOfDay + 1) % 24) / 2);
  const ziHourStem = ((STEMS.indexOf(dayStem) % 5) * 2) % 10;
  const hourStemIdx = (ziHourStem + hourBranchIdx) % 10;
  const hourIdx = sexagenaryIndex(hourStemIdx, hourBranchIdx);

  const pillars = {
    year: pillar(yearIdx, dayStem),
    month: pillar(monthIdx, dayStem),
    day: pillar(dayIdx, dayStem),
    hour: pillar(hourIdx, dayStem),
  };

  // 大运
  const isYangYear = STEMS.indexOf(yearStem) % 2 === 0;
  const forward = (isYangYear && gender === 'male') || (!isYangYear && gender === 'female');
  const spanDays = forward ? nextJieTerm.jd - jd : jd - prevJieTerm.jd;
  const totalMonths = spanDays * 4; // 3 天 = 1 年 = 12 个月
  let startAgeYears = Math.floor(totalMonths / 12);
  let startAgeMonths = Math.round(totalMonths % 12);
  // 四舍五入到 12 个月时必须进位，否则显示「X 岁 12 个月起运」
  if (startAgeMonths >= 12) { startAgeMonths -= 12; startAgeYears += 1; }

  // 交运：三日折一年。
  // 古法三条换算是同一比例的三种说法——3 日折 1 年、1 日折 4 个月、1 时辰折 10 日：
  // 把「出生 → 起运那一侧的节令」的真实间隔按 365.2422/3（≈121.7474）倍放大，
  // 就是起运那一刻；放大后的 1/12 恰好 121.7474/12 ≈ 10.15 天，即「一时辰十日」。
  // 一年取回归年 365.2422 日（交运日细算各家不一，这里固定这一个口径并写明）。
  const JIAO_YEAR_DAYS = 365.2422;
  const JIAO_SCALE = JIAO_YEAR_DAYS / 3;
  const jiaoFromTerm = forward ? nextJieTerm : prevJieTerm;
  const jiaoJd = jd + spanDays * JIAO_SCALE;
  const jiaoParts = jdToParts(jiaoJd);
  // 每步大运在「同月同日同时刻」换；公历闰日（2 月 29 日生）退到 2 月 28 日
  const addYearsClamped = (p, n) => {
    const y = p.year + n;
    return { year: y, month: p.month, day: Math.min(p.day, daysInMonth(y, p.month)), hour: p.hour, minute: p.minute };
  };

  const dayun = [];
  const dayunWindows = [];
  for (let i = 1; i <= 8; i++) {
    const idx = (((monthIdx + (forward ? i : -i)) % 60) + 60) % 60;
    const g = ganzhiName(idx);
    const fromJd = partsToJd(addYearsClamped(jiaoParts, (i - 1) * 10));
    const toJd = partsToJd(addYearsClamped(jiaoParts, i * 10));
    dayun.push({
      step: i,
      startAge: startAgeYears + (i - 1) * 10,
      ganzhi: g.name,
      stem: g.stem,
      branch: g.branch,
      stemTenGod: tenGod(dayStem, g.stem),
      nayin: nayin(idx),
      // 这一步大运的起止交运时刻（与摘要/面板同源，可直接拿来对年表）
      fromDate: formatJd(fromJd),
      toDate: formatJd(toJd),
    });
    dayunWindows.push({ step: i, ganzhi: g.name, fromJd, toJd });
  }

  // 流年（默认从「今年」起排 10 年；传 input.nowYear 可钉死基准年，用于复现历史结论）
  const thisYear = Number(input.nowYear) || new Date().getFullYear();
  const liunian = [];
  for (let y = thisYear; y < thisYear + 10; y++) {
    const idx = (((y - 4) % 60) + 60) % 60;
    liunian.push({
      year: y,
      age: y - solarYear + 1,
      ganzhi: ganzhiName(idx).name,
      stemTenGod: tenGod(dayStem, ganzhiName(idx).stem),
    });
  }

  // 五行统计（天干 1.0；地支藏干按 WUXING_HIDDEN_WEIGHT）
  const wuxing = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
  for (const p of Object.values(pillars)) {
    wuxing[p.stemElement] += 1;
    p.hidden.forEach((h, i) => {
      wuxing[h.element] += WUXING_HIDDEN_WEIGHT[i] ?? 0.1;
    });
  }
  for (const k of Object.keys(wuxing)) wuxing[k] = Math.round(wuxing[k] * 10) / 10;

  // 旬空（以日柱所在旬）
  const xunStart = Math.floor(dayIdx / 10) * 10;
  const kongwang = [
    BRANCHES[(xunStart + 10) % 12],
    BRANCHES[(xunStart + 11) % 12],
  ];

  // ── 十二长生、各柱空亡、神煞 ──────────────────────────────
  const CHANGSHENG = ['长生', '沐浴', '冠带', '临官', '帝旺', '衰', '病', '死', '墓', '绝', '胎', '养'];
  const CS_START = { 甲: 11, 乙: 6, 丙: 2, 丁: 9, 戊: 2, 己: 9, 庚: 5, 辛: 0, 壬: 8, 癸: 3 };
  const isYang = (s) => STEMS.indexOf(s) % 2 === 0;

  function changsheng(stem, branch) {
    const start = CS_START[stem];
    const bi = BRANCHES.indexOf(branch);
    const step = isYang(stem) ? bi - start : start - bi;
    return CHANGSHENG[((step % 12) + 12) % 12];
  }

  // 旬空统一走 calendar.xunKongOf：此前 bazi / liuyao / daliuren 各写一份公式，
  // 三份形式不同（一处用 (start+10)%12、一处用 (10-2k)%12、一处查表），改一处极易漏改另两处。
  const monthBranch = pillars.month.branch;

  // 神煞：表驱动、双查法（年干/日干、年支/日支、月支、日柱、时柱），详见 engine/shensha.js
  const shensha = computeBaziShensha(pillars, kongwang);

  for (const key of ['year', 'month', 'day', 'hour']) {
    const pl = pillars[key];
    pl.dishi = changsheng(dayStem, pl.branch);
    pl.zizuo = changsheng(pl.stem, pl.branch);
    pl.kongwang = xunKongOf(pl.ganzhi);
    // shensha 保持字符串数组以兼容既有 UI / 测试；明细见 shenshaDetail
    pl.shensha = shensha.detail[key].map((x) => x.name);
    pl.shenshaDetail = shensha.detail[key];
  }

  // ── 日主旺衰（月令 + 通根 + 天干帮扶，量化但规则透明）──
  const SEASON_EL = { 寅: '木', 卯: '木', 巳: '火', 午: '火', 申: '金', 酉: '金', 亥: '水', 子: '水', 辰: '土', 戌: '土', 丑: '土', 未: '土' };
  const me = STEM_ELEMENT[dayStem];
  const seasonEl = SEASON_EL[monthBranch];
  let monthW;
  let monthWord;
  if (me === seasonEl) { monthW = 3; monthWord = '旺'; }
  else if (GENERATES[seasonEl] === me) { monthW = 2; monthWord = '相'; }
  else if (GENERATES[me] === seasonEl) { monthW = 1; monthWord = '休'; }
  else if (OVERCOMES[me] === seasonEl) { monthW = 0.5; monthWord = '囚'; }
  else { monthW = 0; monthWord = '死'; }

  let rootScore = 0;
  const rootBranches = [];
  for (const key of ['year', 'month', 'day', 'hour']) {
    const pl = pillars[key];
    let hit = false;
    pl.hidden.forEach((h, i) => {
      if (STEM_ELEMENT[h.stem] === me) { rootScore += ROOT_HIDDEN_WEIGHT[i] ?? 0.1; hit = true; }
      else if (GENERATES[STEM_ELEMENT[h.stem]] === me) { rootScore += (ROOT_HIDDEN_WEIGHT[i] ?? 0.1) * 0.4; hit = true; }
    });
    if (hit) rootBranches.push(pl.branch);
  }

  let helpScore = 0;
  const helpers = [];
  const drainers = [];
  for (const key of ['year', 'month', 'hour']) {
    const st = pillars[key].stem;
    const el2 = STEM_ELEMENT[st];
    if (el2 === me) { helpScore += 1; helpers.push(st); }
    else if (GENERATES[el2] === me) { helpScore += 0.8; helpers.push(st); }
    else if (OVERCOMES[el2] === me) { helpScore -= 1; drainers.push(st); }
    else if (OVERCOMES[me] === el2) { helpScore -= 0.8; drainers.push(st); }
    else { helpScore -= 0.5; drainers.push(st); }
  }

  const total = Math.round((monthW + rootScore + helpScore) * 10) / 10;
  const level = total >= 4 ? '身强' : total >= 2.5 ? '偏强' : total >= 1.5 ? '中和' : total >= 0.5 ? '偏弱' : '身弱';
  const strength = {
    level,
    score: total,
    detail: `月令${monthBranch}${seasonEl}，日主${me}${monthWord}(${monthW})；通根${rootBranches.join('') || '无'}(${rootScore.toFixed(1)})；天干帮扶${helpers.join('') || '无'}／耗泄${drainers.join('') || '无'}(${helpScore.toFixed(1)})`,
    method: '月令权重 3/2/1/0.5/0 + 地支藏干通根 + 天干帮扶，量化后分档；属简化算法，非唯一流派',
    parts: {
      season: { branch: monthBranch, element: seasonEl, word: monthWord, weight: monthW },
      roots: rootBranches,
      rootScore: Math.round(rootScore * 10) / 10,
      helpers,
      drainers,
      helpScore: Math.round(helpScore * 10) / 10,
    },
  };

  // ── 格局 / 用神 / 行运 ─────────────────────────────────────
  const frame = analyzeBaziFrame({ pillars, dayStem, monthBranch, strength, wuxing });

  // ── 大运/流年与原局的地支关系 ──
  const pairRel = (a, b) => {
    if (!a || !b) return [];
    // 大运/流年支与原局同支：辰午酉亥为自刑，其余同支不算关系
    if (a === b) return XING_SELF.includes(a) ? ['自刑'] : [];
    const out = [];
    if (BRANCH_HE[a + b] || BRANCH_HE[b + a]) out.push('合');
    if (hasPair(BRANCH_CHONG, a, b)) out.push('冲');
    if (hasPair(BRANCH_HAI, a, b)) out.push('害');
    if (hasPair(BRANCH_PO, a, b)) out.push('破');
    for (const g of XING_GROUPS) if (g.includes(a) && g.includes(b)) out.push('刑');
    return out;
  };
  const natalBranches = ['year', 'month', 'day', 'hour'].map((k) => pillars[k].branch);
  const relOf = (branch) => {
    const seen = new Set();
    const out = [];
    for (const b of natalBranches) {
      for (const r of pairRel(b, branch)) {
        const t = r + b;
        if (!seen.has(t)) { seen.add(t); out.push(t); }
      }
    }
    return out;
  };
  for (const d of dayun) {
    d.relations = relOf(d.branch);
    d.luck = scoreLuck(d.ganzhi, frame);
  }
  for (const l of liunian) {
    l.relations = relOf(l.ganzhi[1]);
    l.luck = scoreLuck(l.ganzhi, frame);
  }

  // ── 岁运并临 / 伏吟反吟：只标干支层面的「变动信号」，不判吉凶 ──
  // 流年按立春起算（该年立春到次年立春），当值大运取与这一区间相交的步；
  // 交运落在这一年里时，前后两步都在本年当过值，两条都列出。
  const NATAL_LABEL = { year: '年柱', month: '月柱', day: '日柱', hour: '时柱' };
  const stemOvercomes = (a, b) => OVERCOMES[STEM_ELEMENT[a]] === STEM_ELEMENT[b];
  const tianKeDiChong = (a, b) => {
    if (typeof a !== 'string' || typeof b !== 'string' || a.length < 2 || b.length < 2) return false;
    if (!(a[0] in STEM_ELEMENT) || !(b[0] in STEM_ELEMENT)) return false;
    return (stemOvercomes(a[0], b[0]) || stemOvercomes(b[0], a[0])) && hasPair(BRANCH_CHONG, a[1], b[1]);
  };
  const lichunJd = (y) => {
    const t = termWindow(y, { jieOnly: true }).find((x) => x.index === 2 && jdToParts(x.jd).year === y);
    return t ? t.jd : partsToJd({ year: y, month: 2, day: 4 });
  };
  for (const l of liunian) {
    const yStart = lichunJd(l.year);
    const yEnd = lichunJd(l.year + 1);
    const active = dayunWindows.filter((w) => w.fromJd < yEnd && w.toJd > yStart);
    const signals = [];
    for (const w of active) {
      if (w.ganzhi === l.ganzhi) {
        signals.push({ type: '岁运并临', target: `第${w.step}步大运`, detail: `大运与流年同为${l.ganzhi}` });
      } else if (tianKeDiChong(w.ganzhi, l.ganzhi)) {
        signals.push({ type: '运年反吟', target: `第${w.step}步大运`, detail: `大运${w.ganzhi}与流年${l.ganzhi}天克地冲` });
      }
      // 大运与本命四柱的伏吟/反吟：整步大运都在，逐年列出，不按流年另算一次
      for (const key of ['year', 'month', 'day', 'hour']) {
        const g = pillars[key].ganzhi;
        if (!g) continue;
        if (w.ganzhi === g) {
          signals.push({ type: '大运伏吟', target: `第${w.step}步大运·${NATAL_LABEL[key]}`, detail: `大运${w.ganzhi}与${NATAL_LABEL[key]}同干支` });
        } else if (tianKeDiChong(w.ganzhi, g)) {
          signals.push({ type: '大运反吟', target: `第${w.step}步大运·${NATAL_LABEL[key]}`, detail: `大运${w.ganzhi}与${NATAL_LABEL[key]}${g}天克地冲` });
        }
      }
    }
    for (const key of ['year', 'month', 'day', 'hour']) {
      const g = pillars[key].ganzhi;
      if (!g) continue;
      if (l.ganzhi === g) {
        signals.push({ type: '流年伏吟', target: NATAL_LABEL[key], detail: `流年${l.ganzhi}与${NATAL_LABEL[key]}同干支` });
      } else if (tianKeDiChong(l.ganzhi, g)) {
        signals.push({ type: '流年反吟', target: NATAL_LABEL[key], detail: `流年${l.ganzhi}与${NATAL_LABEL[key]}${g}天克地冲` });
      }
    }
    l.suiyun = {
      dayun: active.map((w) => ({ step: w.step, ganzhi: w.ganzhi })),
      signals,
      note: '只标干支重复与天克地冲这类变动信号，不判吉凶；大运按该年立春到次年立春的区间取，交运落在年内时前后两步并列；大运与本命四柱的伏吟/反吟整步大运都在，逐年重复列出',
    };
  }

  const p = jdToParts(jd);

  // ── 胎元 / 胎息 / 命宫 / 身宫 ──
  // 胎元：月柱天干进一位、地支进三位（受胎之月的干支）
  const mStemIdx = STEMS.indexOf(pillars.month.stem);
  const mBranchIdx = BRANCHES.indexOf(pillars.month.branch);
  const taiyuan = ganzhiName(sexagenaryIndex((mStemIdx + 1) % 10, (mBranchIdx + 3) % 12));
  // 胎息：日柱天干五合、地支六合（六合两支序数之和恒为 1 mod 12）
  const dayStemIdx = STEMS.indexOf(pillars.day.stem);
  const dayBranchIdx = BRANCHES.indexOf(pillars.day.branch);
  const taixi = ganzhiName(sexagenaryIndex((dayStemIdx + 5) % 10, (1 - dayBranchIdx + 12) % 12));
  // 命宫 / 身宫：以生月、生时两支的合数定宫（Tyme 口径）。
  // 命宫：27 − 月支 − 时支，取模后 +2；身宫：11 + 月支 + 时支，取模后 +2。
  // 两支合数落 0–11 后并入六十甲子，天干随年干自然对齐，无需另推五虎遁。
  const hourBrIdxForGong = BRANCHES.indexOf(pillars.hour.branch);
  const yearStemIdxForGong = STEMS.indexOf(pillars.year.stem);
  const mingIdx = (((yearStemIdxForGong * 12 + ((27 - mBranchIdx - hourBrIdxForGong) % 12) + 2) % 60) + 60) % 60;
  const bodyIdx = (((yearStemIdxForGong * 12 + ((11 + mBranchIdx + hourBrIdxForGong) % 12) + 2) % 60) + 60) % 60;
  const minggong = ganzhiName(mingIdx);
  const shengong = ganzhiName(bodyIdx);

  // 人元司权：按节令到出生日的日差定当权藏干（节当日为第 1 日）
  const renyuan = renyuanOf(BRANCHES[monthBranchIdx], jdnBase, prevJieTerm.jd);
  if (renyuan) renyuan.term = { name: prevJieTerm.name, time: formatJd(prevJieTerm.jd) };

  return {
    system: 'bazi',
    relations: buildRelations(pillars),
    palaces: {
      taiyuan: { ganzhi: taiyuan.name, note: '月干进一、月支进三' },
      taixi: { ganzhi: taixi.name, note: '日干五合、日支六合' },
      minggong: { ganzhi: minggong.name, branch: minggong.branch, note: '生月与生时支合数定宫（27 减，取模后 +2）；干随六十甲子' },
      shengong: { ganzhi: shengong.name, branch: shengong.branch, note: '生月与生时支合数定宫（11 加，取模后 +2）；干随六十甲子' },
    },
    input: {
      civil: { year, month, day, hour, minute },
      gender,
      longitude: longitude ?? null,
      address: input.address || null,
      geo,
      lateZi,
      trueSolar: useTrueSolar,
      dst: { applied: !!dst.applied, note: dst.note || null },
    },
    solarTime: {
      civilText: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      trueSolarText: formatJd(jd),
      offsetMinutes: solar.offsetMinutes,
      note: dst.applied ? `${dst.note}；${solar.note}` : solar.note,
      lunarYearForPillar: solarYear,
    },
    jieqi: {
      previous: { name: prevJieTerm.name, time: formatJd(prevJieTerm.jd) },
      next: { name: nextJieTerm.name, time: formatJd(nextJieTerm.jd) },
      // 距「节」的分钟数（取两侧较小值）。是否提示复核由摘要层决定，阈值 20 分钟：
      // 与 NAOJ 历要项对拍实测节气最多偏 13.5 分钟，20 分钟留出余量。
      nearBoundaryMinutes: Math.round(Math.min(jd - prevJieTerm.jd, nextJieTerm.jd - jd) * 1440),
    },
    renyuan,
    pillars,
    dayMaster: { stem: dayStem, element: STEM_ELEMENT[dayStem], yinYang: isYangStem(dayStem) ? '阳' : '阴' },
    wuxing,
    kongwang,
    shensha,
    dayun: {
      direction: forward ? '顺行' : '逆行',
      rule: `${isYangYear ? '阳' : '阴'}年${gender === 'male' ? '男' : '女'}${forward ? '顺排' : '逆排'}`,
      startAge: { years: startAgeYears, months: startAgeMonths },
      toNextJieDays: Math.round(spanDays * 100) / 100,
      // 交运时刻（日/时辰级）：上方 startAge 是四舍五入到月的旧字段，两者同源、不互相覆盖
      jiao: {
        at: formatJd(jiaoJd),
        jd: Math.round(jiaoJd * 1e6) / 1e6,
        scaleDaysPerDay: JIAO_SCALE,
        yearDays: JIAO_YEAR_DAYS,
        spanDays: Math.round(spanDays * 1e4) / 1e4,
        from: { name: jiaoFromTerm.name, time: formatJd(jiaoFromTerm.jd) },
        frame: solar.offsetMinutes ? '真太阳时' : '平太阳时',
        offsetMinutes: solar.offsetMinutes,
        note: '三日折一年：出生到节令的真实间隔按 365.2422/3 放大后加到出生时刻；同一比例即「一日折四月、一时辰折十日」，每步大运在同月同日同时刻换',
      },
      list: dayun,
    },
    strength,
    frame,
    climate: frame.yongshen.climate || frame.yongshen.tiaohou || null,
    liunian,
    liunianFrom: thisYear,
  };
}
