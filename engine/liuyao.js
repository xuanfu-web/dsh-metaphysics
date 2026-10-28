// 六爻（纳甲）引擎：摇卦、装卦、六亲、六神、世应、变卦
import { STEMS, BRANCHES, toJDN, ganzhiName, dayGanzhiIndex, sexagenaryIndex, xunKongOf } from './calendar.js';

// 八卦三位（自下而上，1 = 阳）
const TRIGRAM_BITS = {
  乾: [1, 1, 1], 兑: [1, 1, 0], 离: [1, 0, 1], 震: [1, 0, 0],
  巽: [0, 1, 1], 坎: [0, 1, 0], 艮: [0, 0, 1], 坤: [0, 0, 0],
};
// 位值 = b0 + 2b1 + 4b2
const TRIGRAM_BY_VALUE = ['坤', '震', '坎', '兑', '艮', '离', '巽', '乾'];

const bitsValue = (bits) => bits[0] + 2 * bits[1] + 4 * bits[2];

// 京房八宫：每宫八卦次序 = 本宫、一世…五世、游魂、归魂
const PALACE_NAMES = {
  乾: ['乾为天', '天风姤', '天山遁', '天地否', '风地观', '山地剥', '火地晋', '火天大有'],
  兑: ['兑为泽', '泽水困', '泽地萃', '泽山咸', '水山蹇', '地山谦', '雷山小过', '雷泽归妹'],
  离: ['离为火', '火山旅', '火风鼎', '火水未济', '山水蒙', '风水涣', '天水讼', '天火同人'],
  震: ['震为雷', '雷地豫', '雷水解', '雷风恒', '地风升', '水风井', '泽风大过', '泽雷随'],
  巽: ['巽为风', '风天小畜', '风火家人', '风雷益', '天雷无妄', '火雷噬嗑', '山雷颐', '山风蛊'],
  坎: ['坎为水', '水泽节', '水雷屯', '水火既济', '泽火革', '雷火丰', '地火明夷', '地水师'],
  艮: ['艮为山', '山火贲', '山天大畜', '山泽损', '火泽睽', '天泽履', '风泽中孚', '风山渐'],
  坤: ['坤为地', '地雷复', '地泽临', '地天泰', '雷天大壮', '泽天夬', '水天需', '水地比'],
};

const PALACE_ELEMENT = {
  乾: '金', 兑: '金', 离: '火', 震: '木', 巽: '木', 坎: '水', 艮: '土', 坤: '土',
};

// 八宫卦序：世爻位置（1 = 初爻）
const SHI_POSITION = [6, 1, 2, 3, 4, 5, 4, 3];

// 京房纳甲：内卦 / 外卦 的天干与三爻地支
const NAJIA = {
  乾: { gan: ['甲', '壬'], inner: ['子', '寅', '辰'], outer: ['午', '申', '戌'] },
  坤: { gan: ['乙', '癸'], inner: ['未', '巳', '卯'], outer: ['丑', '亥', '酉'] },
  震: { gan: ['庚', '庚'], inner: ['子', '寅', '辰'], outer: ['午', '申', '戌'] },
  巽: { gan: ['辛', '辛'], inner: ['丑', '亥', '酉'], outer: ['未', '巳', '卯'] },
  坎: { gan: ['戊', '戊'], inner: ['寅', '辰', '午'], outer: ['申', '戌', '子'] },
  离: { gan: ['己', '己'], inner: ['卯', '丑', '亥'], outer: ['酉', '未', '巳'] },
  艮: { gan: ['丙', '丙'], inner: ['辰', '午', '申'], outer: ['戌', '子', '寅'] },
  兑: { gan: ['丁', '丁'], inner: ['巳', '卯', '丑'], outer: ['亥', '酉', '未'] },
};

const BRANCH_ELEMENT = {
  子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火',
  午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水',
};

const GENERATES = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const OVERCOMES = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };

const LIUSHEN = ['青龙', '朱雀', '勾陈', '螣蛇', '白虎', '玄武'];
// 日干 -> 初爻所起六神
const LIUSHEN_START = { 甲: 0, 乙: 0, 丙: 1, 丁: 1, 戊: 2, 己: 3, 庚: 4, 辛: 4, 壬: 5, 癸: 5 };

// ── 卦体关系：六冲卦 / 六合卦 / 伏吟 / 反吟 ───────────────────────────────
// 口径来源：《增删卜易》「六冲六合」「反吟伏吟」诸章，并以
// test/fixtures/classics.json 里 23 条带断语的卦例逐条对拍（test/liuyao-body.test.mjs）。
//
// 判六冲卦/六合卦不能看「相邻两爻」，要看六个地支能不能配成三组：
//   六冲 子午·丑未·寅申·卯酉·辰戌·巳亥 → 八纯卦全中（乾为天 子寅辰午申戌 = 子午/寅申/辰戌）
//   六合 子丑·寅亥·卯戌·辰酉·巳申·午未 → 地雷复 子寅辰丑亥酉 = 子丑/寅亥/辰酉
// 八卦对冲（乾巽·坎离·艮坤·震兑）是「卦反」，纳甲地支并不相冲，只能按卦象判。
const ZHI_CHONG_PAIRS = [['子', '午'], ['丑', '未'], ['寅', '申'], ['卯', '酉'], ['辰', '戌'], ['巳', '亥']];
const ZHI_HE_PAIRS = [['子', '丑'], ['寅', '亥'], ['卯', '戌'], ['辰', '酉'], ['巳', '申'], ['午', '未']];
const CHONG_OF = Object.fromEntries(ZHI_CHONG_PAIRS.flatMap(([a, b]) => [[a, b], [b, a]]));
const TRIGRAM_OPPOSITE = { 乾: '巽', 巽: '乾', 坎: '离', 离: '坎', 艮: '坤', 坤: '艮', 震: '兑', 兑: '震' };

/** 六个地支能否正好配成三对；配不上（含重支）返回 null */
function pairThirds(branches, table) {
  const cnt = new Map();
  for (const b of branches) cnt.set(b, (cnt.get(b) || 0) + 1);
  const hits = [];
  for (const [a, b] of table) {
    const na = cnt.get(a) || 0;
    const nb = cnt.get(b) || 0;
    if (!na && !nb) continue;
    if (na !== 1 || nb !== 1) return null;
    cnt.set(a, 0);
    cnt.set(b, 0);
    hits.push([a, b]);
  }
  return hits.length * 2 === branches.length ? hits : null;
}

/** 卦的纳甲地支（内卦 = 1~3 爻，外卦 = 4~6 爻） */
function hexBranches(hex) {
  const inner = NAJIA[hex.lower].inner.slice();
  const outer = NAJIA[hex.upper].outer.slice();
  return { inner, outer, all: [...inner, ...outer] };
}

/** 单个卦的卦体属性：是否六冲卦 / 六合卦，及配对明细 */
export function hexBody(hex) {
  const { inner, outer, all } = hexBranches(hex);
  const chongPairs = pairThirds(all, ZHI_CHONG_PAIRS);
  const hePairs = pairThirds(all, ZHI_HE_PAIRS);
  return {
    name: hex.name,
    upper: hex.upper,
    lower: hex.lower,
    inner,
    outer,
    chong: Boolean(chongPairs),
    he: Boolean(hePairs),
    chongPairs: chongPairs || [],
    hePairs: hePairs || [],
  };
}

/**
 * 本卦 → 变卦 的卦体关系。
 * @param {{name:string,upper:string,lower:string}} ben 本卦
 * @param {object|null} bian 变卦（无动爻传 null）
 * @param {number[]} [moving] 动爻位置（1~6）
 */
export function bodyRelations(ben, bian = null, moving = []) {
  const b = hexBody(ben);
  const out = {
    ben: { name: b.name, chong: b.chong, he: b.he, chongPairs: b.chongPairs, hePairs: b.hePairs, inner: b.inner, outer: b.outer },
    bian: null,
    fuYin: { inner: false, outer: false },
    fanYin: { inner: null, outer: null }, // null 或 { by: ['chong'|'pair'] }
    yaoFuYin: [],
    yaoFanYin: [],
  };
  if (!bian) return out;

  const v = hexBody(bian);
  out.bian = { name: v.name, chong: v.chong, he: v.he, chongPairs: v.chongPairs, hePairs: v.hePairs, inner: v.inner, outer: v.outer };

  for (const side of ['inner', 'outer']) {
    const x = b[side];
    const y = v[side];
    const tri = side === 'inner' ? [ben.lower, bian.lower] : [ben.upper, bian.upper];
    const changed = tri[0] !== tri[1];
    // 伏吟必须「卦变了而地支没变」。卦没变时地支当然相同，那不是伏吟。
    // 纳甲上乾与震共用一套地支（子寅辰/午申戌），所以卦伏吟只可能出自乾↔震互换。
    if (changed && x.every((z, i) => z === y[i])) {
      out.fuYin[side] = true;
      continue;
    }
    const by = [];
    if (changed && x.every((z, i) => CHONG_OF[z] === y[i])) by.push('chong');
    if (changed && TRIGRAM_OPPOSITE[tri[0]] === tri[1]) by.push('pair');
    if (by.length) out.fanYin[side] = { by };
  }

  for (const p of moving) {
    const i = p - 1;
    if (!(i >= 0 && i < 6)) continue;
    const x = i < 3 ? b.inner[i] : b.outer[i - 3];
    const y = i < 3 ? v.inner[i] : v.outer[i - 3];
    if (x === y) out.yaoFuYin.push(p);
    else if (CHONG_OF[x] === y) out.yaoFanYin.push(p);
  }
  return out;
}

/** 卦体关系的短标签（面板 chip / 文本摘要共用一份措辞） */
export function bodyLabels(body) {
  if (!body || !body.ben) return [];
  const fuYin = body.fuYin || {};
  const fanYin = body.fanYin || {};
  const yaoFuYin = body.yaoFuYin || [];
  const yaoFanYin = body.yaoFanYin || [];
  const out = [];
  if (body.ben.chong) out.push('六冲卦');
  if (body.ben.he) out.push('六合卦');
  if (body.bian) {
    if (body.bian.chong) out.push('变六冲');
    else if (body.bian.he) out.push('变六合');
  }
  const sides = [['inner', '内卦'], ['outer', '外卦']];
  for (const [k, label] of sides) if (fuYin[k]) out.push(`${label}伏吟`);
  for (const [k, label] of sides) if (fanYin[k]) out.push(`${label}反吟`);
  if (yaoFuYin.length) out.push(`爻伏吟 ${yaoFuYin.join('、')}`);
  if (yaoFanYin.length) out.push(`爻反吟 ${yaoFanYin.join('、')}`);
  return out;
}

function liuqin(palaceElement, branchElement) {
  if (palaceElement === branchElement) return '兄弟';
  if (GENERATES[branchElement] === palaceElement) return '父母';
  if (GENERATES[palaceElement] === branchElement) return '子孙';
  if (OVERCOMES[branchElement] === palaceElement) return '官鬼';
  if (OVERCOMES[palaceElement] === branchElement) return '妻财';
  return '?';
}

// 构建 (上卦, 下卦) -> 卦 的索引
const HEXAGRAM_INDEX = new Map();

function flip(bits, positions) {
  const out = bits.slice();
  for (const p of positions) out[p] = out[p] ? 0 : 1;
  return out;
}

for (const [palace, names] of Object.entries(PALACE_NAMES)) {
  const t = TRIGRAM_BITS[palace];
  const variants = [
    { lower: t, upper: t },
    { lower: flip(t, [0]), upper: t },
    { lower: flip(t, [0, 1]), upper: t },
    { lower: flip(t, [0, 1, 2]), upper: t },
    { lower: flip(t, [0, 1, 2]), upper: flip(t, [0]) },
    { lower: flip(t, [0, 1, 2]), upper: flip(t, [0, 1]) },
    { lower: flip(t, [0, 1, 2]), upper: flip(t, [1]) },
    { lower: t, upper: flip(t, [1]) },
  ];
  variants.forEach((v, order) => {
    const upper = TRIGRAM_BY_VALUE[bitsValue(v.upper)];
    const lower = TRIGRAM_BY_VALUE[bitsValue(v.lower)];
    HEXAGRAM_INDEX.set(`${upper}|${lower}`, {
      name: names[order],
      palace,
      palaceElement: PALACE_ELEMENT[palace],
      order,
      upper,
      lower,
      lines: [...v.lower, ...v.upper], // b0 初爻
      shi: SHI_POSITION[order],
      ying: SHI_POSITION[order] > 3 ? SHI_POSITION[order] - 3 : SHI_POSITION[order] + 3,
    });
  });
}

export const HEXAGRAM_COUNT = HEXAGRAM_INDEX.size;

/** 由六爻（自下而上，1 = 阳）求卦 */
export function hexagramFromBits(bits) {
  const upper = TRIGRAM_BY_VALUE[bitsValue(bits.slice(3))];
  const lower = TRIGRAM_BY_VALUE[bitsValue(bits.slice(0, 3))];
  return HEXAGRAM_INDEX.get(`${upper}|${lower}`);
}

/** 随机摇卦：三枚铜钱，背为阳（3），字为阴（2），合计 6/7/8/9 */
export function tossLines(random = Math.random) {
  const lines = [];
  for (let i = 0; i < 6; i++) {
    let sum = 0;
    for (let c = 0; c < 3; c++) sum += random() < 0.5 ? 3 : 2;
    lines.push(sum); // 6 老阴 7 少阳 8 少阴 9 老阳
  }
  return lines;
}

function lineToBit(v) {
  return v === 7 || v === 9 ? 1 : 0;
}

function isMoving(v) {
  return v === 6 || v === 9;
}

/**
 * 装卦
 * @param {object} input { lines?: number[] (自下而上, 6/7/8/9), dayGanZhi?: {stem, branch}, question?: string }
 */
export function buildLiuyao(input = {}) {
  const rawLines = Array.isArray(input.lines) && input.lines.length === 6
    ? input.lines.slice()
    : tossLines(input.random);

  const invalid = rawLines.filter((v) => ![6, 7, 8, 9].includes(v));
  if (invalid.length) throw new Error(`爻值只能是 6/7/8/9，收到 ${JSON.stringify(rawLines)}`);

  const bits = rawLines.map(lineToBit);
  const ben = hexagramFromBits(bits);
  const moving = rawLines.map((v, i) => (isMoving(v) ? i : -1)).filter((i) => i >= 0);
  const bianBits = moving.length ? flip(bits, moving) : null;
  const bian = bianBits ? hexagramFromBits(bianBits) : null;

  const dayGanZhi = input.dayGanZhi ?? (() => {
    const now = new Date();
    const jdn = toJDN(now.getFullYear(), now.getMonth() + 1, now.getDate());
    const g = ganzhiName(dayGanzhiIndex(jdn));
    return { stem: g.stem, branch: g.branch, name: g.name };
  })();

  const liushenStart = LIUSHEN_START[dayGanZhi.stem] ?? 0;

  // 旬空：由日柱所在的旬推两位空亡（甲子旬→戌亥、甲戌旬→申酉、甲申旬→午未、
  // 甲午旬→辰巳、甲辰旬→寅卯、甲寅旬→子丑）。六爻断卦离不开它，之前没有输出。
  // 公式统一放在 calendar.xunKongOf，三体系共用一份，避免各自演化后互相漂移。
  const dayIdx = sexagenaryIndex(STEMS.indexOf(dayGanZhi.stem), BRANCHES.indexOf(dayGanZhi.branch));
  const xun = dayIdx >= 0 ? Math.floor(dayIdx / 10) : -1;
  const xunKong = xunKongOf(`${dayGanZhi.stem}${dayGanZhi.branch}`);
  const xunShou = xun >= 0 ? ganzhiName(xun * 10).name : '';

  function decorate(hex, movingSet) {
    const rows = [];
    for (let i = 0; i < 6; i++) {
      const isInner = i < 3;
      const trigram = isInner ? hex.lower : hex.upper;
      const nj = NAJIA[trigram];
      const branch = isInner ? nj.inner[i] : nj.outer[i - 3];
      const gan = isInner ? nj.gan[0] : nj.gan[1];
      const element = BRANCH_ELEMENT[branch];
      const value = rawLines[i];
      rows.push({
        position: i + 1,
        name: ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'][i],
        yinYang: bits[i] ? '阳' : '阴',
        moving: movingSet ? movingSet.has(i) : isMoving(value),
        symbol: bits[i] ? '━━━━━' : '━━ ━━',
        ganzhi: gan + branch,
        stem: gan,
        branch,
        element,
        liuqin: liuqin(hex.palaceElement, element),
        liushen: LIUSHEN[(liushenStart + i) % 6],
      });
    }
    return rows;
  }

  const benRows = decorate(ben, new Set(moving));
  const movingSet = new Set(moving);
  const bianRows = bian ? decorate(bian, new Set()) : null;
  if (bianRows) {
    bianRows.forEach((r, i) => {
      r.changedFrom = movingSet.has(i) ? benRows[i].symbol : null;
    });
  }

  return {
    system: 'liuyao',
    question: input.question ?? null,
    cast: {
      lines: rawLines,
      notation: rawLines.map((v) => ({ 6: '老阴 ✕', 7: '少阳', 8: '少阴', 9: '老阳 ○' }[v])),
      movingPositions: moving.map((i) => i + 1),
    },
    dayGanZhi: { name: dayGanZhi.name, stem: dayGanZhi.stem, branch: dayGanZhi.branch },
    xunShou,
    xunKong,
    ben: {
      name: ben.name,
      upper: ben.upper,
      lower: ben.lower,
      palace: `${ben.palace}宫`,
      palaceElement: ben.palaceElement,
      shi: ben.shi,
      ying: ben.ying,
      lines: benRows,
    },
    bian: bian
      ? {
        name: bian.name,
        upper: bian.upper,
        lower: bian.lower,
        palace: `${bian.palace}宫`,
        palaceElement: bian.palaceElement,
        shi: bian.shi,
        ying: bian.ying,
        lines: bianRows,
      }
      : null,
    body: (() => {
      const body = bodyRelations(ben, bian, moving.map((i) => i + 1));
      // 标签只算一次挂到结果上：面板、CLI 摘要、解析层都读这一份，避免三处措辞走散
      body.labels = bodyLabels(body);
      return body;
    })(),
  };
}
