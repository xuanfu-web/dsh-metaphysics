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
const LIUQIN_NAMES = ['父母', '兄弟', '子孙', '妻财', '官鬼'];
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
const HE_OF = Object.fromEntries(ZHI_HE_PAIRS.flatMap(([a, b]) => [[a, b], [b, a]]));
const TRIGRAM_OPPOSITE = { 乾: '巽', 巽: '乾', 坎: '离', 离: '坎', 艮: '坤', 坤: '艮', 震: '兑', 兑: '震' };

// ── 化进神 / 化退神 ────────────────────────────────────────────────
// 动爻变出的地支与本支同五行、且在同五行的「顺次」上相邻，即化进神；反向为化退神。
//   木 寅→卯　火 巳→午　金 申→酉　水 亥→子　土 丑→辰→未→戌→丑
// 口径见《增删卜易》进神退神章；用 test/fixtures/classics.json 里 12 条带「化进/化退」
// 断语的卦例对拍（test/liuyao-jintui.test.mjs）。同五行但不相邻（如 寅→辰）不算。
const JIN_TUI_PAIRS = [['寅', '卯'], ['巳', '午'], ['申', '酉'], ['亥', '子'], ['丑', '辰'], ['辰', '未'], ['未', '戌'], ['戌', '丑']];
const JIN_OF = new Map(JIN_TUI_PAIRS);
const TUI_OF = new Map(JIN_TUI_PAIRS.map(([a, b]) => [b, a]));

/** 本支 → 变支：'进' / '退' / null */
export function jinTuiOf(from, to) {
  if (!from || !to || from === to) return null;
  if (JIN_OF.get(from) === to) return '进';
  if (TUI_OF.get(from) === to) return '退';
  return null;
}

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
    jinTui: [], // [{ position, from, to, type: '进'|'退' }]
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
    const jt = jinTuiOf(x, y);
    if (jt) out.jinTui.push({ position: p, from: x, to: y, type: jt });
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
  const jin = (body.jinTui || []).filter((x) => x.type === '进').map((x) => x.position);
  const tui = (body.jinTui || []).filter((x) => x.type === '退').map((x) => x.position);
  if (jin.length) out.push(`化进神 ${jin.join('、')}`);
  if (tui.length) out.push(`化退神 ${tui.join('、')}`);
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

// 八宫首卦（每宫的纯卦）：伏神要「于本宫首卦内寻之」，所以先备一张 宫 → 纯卦 的表
const PURE_BY_PALACE = new Map();
for (const h of HEXAGRAM_INDEX.values()) if (h.order === 0) PURE_BY_PALACE.set(h.palace, h);

/**
 * 取用神：问什么，就以哪一类六亲为用。
 * 感情分男女（男看妻财、女看官鬼），出行以世爻为用——这两条不接受单一六亲，
 * 所以表里 liuqin 留 null，由 yongshenOf 按 gender / 世爻决定。
 */
export const YONGSHEN_RULES = Object.freeze({
  wealth: { liuqin: '妻财', ask: '求财、收入、订单' },
  career: { liuqin: '官鬼', ask: '工作、职位、考核' },
  health: { liuqin: '官鬼', ask: '病与压力（子孙为医药）' },
  study: { liuqin: '父母', ask: '考试、证书、文书合同' },
  love: { liuqin: null, ask: '感情：男看妻财、女看官鬼' },
  travel: { liuqin: null, ask: '出行以世爻为用，父母为舟车' },
  general: { liuqin: null, ask: '未指明所问之事' },
});

const WUXING_SAY = {
  飞生伏: '飞神生伏神，伏神借得上力',
  伏生飞: '伏神生飞神，力气往外泄',
  飞克伏: '飞神克伏神，伏神受压难出',
  伏克飞: '伏神克飞神，伏神能自出',
  比和: '飞伏比和，同气相求',
};

/** 飞伏生克在标签里的短说法（比 WUXING_SAY 更短，给 chip 行用） */
const RELATION_LABEL = {
  飞生伏: '伏神得飞神生',
  伏生飞: '伏神泄气于飞神',
  飞克伏: '伏神受飞神克',
  伏克飞: '伏神克飞神可出',
  比和: '飞伏比和',
};

function wuxingBetween(min, max) {
  // min 是下面那个（伏神），max 是上面那个（飞神）；返回「谁生谁 / 谁克谁」
  if (GENERATES[max] === min) return '飞生伏';
  if (GENERATES[min] === max) return '伏生飞';
  if (OVERCOMES[max] === min) return '飞克伏';
  if (OVERCOMES[min] === max) return '伏克飞';
  return '比和';
}

/** 用神所在爻位的内外归属（1~3 内卦，4~6 外卦） */
const sideOf = (position) => (position <= 3 ? 'inner' : 'outer');

/**
 * 取用神并把用神与卦体、伏神、旬空、动变串起来。
 *
 * 三步：① 按所问之事定六亲（感情分男女、出行以世为用）；
 * ② 在本卦里找这个六亲——找得到就用神在爻上，出现两次记「两现」；
 * ③ 找不到（用神不上卦）就回到本宫首卦同六亲的爻位取伏神，并标飞伏生克。
 *
 * @param {object} result buildLiuyao 的返回
 * @param {{direction?:string, gender?:string}} [opts]
 */
export function yongshenOf(result, opts = {}) {
  const r = result && typeof result === 'object' ? result : {};
  const ben = r.ben && typeof r.ben === 'object' ? r.ben : {};
  const lines = Array.isArray(ben.lines) ? ben.lines : [];
  const direction = YONGSHEN_RULES[opts.direction] ? opts.direction : 'general';
  const rule = YONGSHEN_RULES[direction];
  const gender = opts.gender === 'female' ? 'female' : 'male';
  const body = r.body && typeof r.body === 'object' ? r.body : {};
  // xunKong 在结果里是数组（如 ['戌','亥']），兼容旧数据里拼成字符串的写法
  const kongArr = Array.isArray(r.xunKong)
    ? r.xunKong
    : (typeof r.xunKong === 'string' ? r.xunKong.split('') : []);

  // ① 定六亲 / 定「以世为用」
  // 方向只是一层便利：调用方也可以直接给六亲（opts.liuqin），用于别的问法或对拍
  const direct = LIUQIN_NAMES.includes(opts.liuqin) ? opts.liuqin : null;
  const byShi = !direct && direction === 'travel';
  const liuqinName = direct || (byShi ? '世' : (direction === 'love' ? (gender === 'female' ? '官鬼' : '妻财') : rule.liuqin));
  const base = {
    direction,
    gender,
    ask: rule.ask,
    byShi,
    liuqin: liuqinName,
    found: [],
    missing: false,
    fushen: [],
    labels: [],
  };
  if (!liuqinName) { base.labels = ['用神未取（未指明所问之事）']; return base; }

  // ② 用神在爻上
  const found = byShi
    ? lines.filter((l) => l.position === ben.shi)
    : lines.filter((l) => l.liuqin === liuqinName);
  base.found = found.map((l) => ({
    position: l.position,
    name: l.name,
    liuqin: l.liuqin,
    branch: l.branch,
    element: l.element,
    ganzhi: l.ganzhi,
    moving: Boolean(l.moving),
    liushen: l.liushen,
    shi: l.position === ben.shi,
    ying: l.position === ben.ying,
    kong: kongArr.includes(l.branch),
  }));

  const labels = [];
  const label = byShi ? '用神 世爻' : `用神 ${liuqinName}`;
  labels.push(label);
  const jin = (body.jinTui || []).filter((x) => x.type === '进').map((x) => x.position);
  const tui = (body.jinTui || []).filter((x) => x.type === '退').map((x) => x.position);
  const yaoFu = body.yaoFuYin || [];
  const yaoFan = body.yaoFanYin || [];

  if (found.length) {
    labels.push(`${label}在 ${found.map((l) => `${l.position}爻`).join('、')}`);
    if (found.length > 1) labels.push(`用神两现 ${found.map((l) => l.position).join('、')}`);
    if (found.some((l) => l.position === ben.shi)) labels.push('用神持世');
    if (found.some((l) => l.position === ben.ying)) labels.push('用神临应');
    if (found.some((l) => l.moving)) labels.push('用神发动');
    if (found.some((l) => kongArr.includes(l.branch))) labels.push('用神空亡');
    if (found.some((l) => jin.includes(l.position))) labels.push('用神化进神');
    if (found.some((l) => tui.includes(l.position))) labels.push('用神化退神');
    if (found.some((l) => yaoFu.includes(l.position))) labels.push('用神爻伏吟');
    if (found.some((l) => yaoFan.includes(l.position))) labels.push('用神爻反吟');
  } else {
    // ③ 用神不上卦 → 本宫首卦同位取伏神
    base.missing = true;
    const palace = String(ben.palace || '').replace(/宫$/, '');
    const pure = PURE_BY_PALACE.get(palace) || null;
    if (pure) {
      for (let i = 0; i < 6; i++) {
        const isInner = i < 3;
        const nj = NAJIA[isInner ? pure.lower : pure.upper];
        const branch = isInner ? nj.inner[i] : nj.outer[i - 3];
        const gan = isInner ? nj.gan[0] : nj.gan[1];
        const element = BRANCH_ELEMENT[branch];
        if (liuqin(pure.palaceElement, element) !== liuqinName) continue;
        const fei = lines[i] || null;
        const relation = fei ? wuxingBetween(element, fei.element) : null;
        base.fushen.push({
          position: i + 1,
          liuqin: liuqinName,
          branch,
          element,
          ganzhi: gan + branch,
          relation,
          fei: fei ? { position: fei.position, liuqin: fei.liuqin, branch: fei.branch, element: fei.element, ganzhi: fei.ganzhi } : null,
        });
      }
    }
    if (base.fushen.length) {
      labels.push(`用神不上卦·伏于 ${base.fushen.map((f) => `${f.position}爻`).join('、')}`);
      if (base.fushen.length > 1) labels.push(`伏神两现 ${base.fushen.map((f) => f.position).join('、')}`);
      const rels = [...new Set(base.fushen.map((f) => f.relation).filter(Boolean))];
      for (const rel of rels) labels.push(RELATION_LABEL[rel] || `伏神${rel}`);
    } else {
      labels.push('用神不上卦');
    }
  }

  // ④ 与卦体联动：卦体只说动势，落到用神身上才有指向
  const sides = found.length ? [...new Set(found.map((l) => sideOf(l.position)))] : [];
  if (body.ben) {
    if (body.ben.chong) labels.push('用神在六冲卦');
    if (body.ben.he) labels.push('用神在六合卦');
    if (body.bian && body.bian.chong) labels.push('用神逢变六冲');
    if (body.bian && body.bian.he) labels.push('用神逢变六合');
  }
  for (const side of sides) {
    if (body.fuYin && body.fuYin[side]) labels.push(`用神在${side === 'inner' ? '内' : '外'}卦伏吟`);
    if (body.fanYin && body.fanYin[side]) {
      const by = (body.fanYin[side].by || []).includes('chong') ? '地支全冲' : '八卦正对';
      labels.push(`用神在${side === 'inner' ? '内' : '外'}卦反吟`);
      labels.push(`反吟来源：${by}`);
    }
  }

  base.labels = labels;
  base.relationSay = base.fushen.map((f) => WUXING_SAY[f.relation]).filter(Boolean);
  base.side = sides.length === 1 ? (sides[0] === 'inner' ? '内卦' : '外卦') : null;
  return base;
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

// ── 用神旺衰：月建主旺衰、日辰司生克 ────────────────────────────────
// 这一层只吃「五行生克 + 地支六冲」，不引入任何需要背的断语，
// 所以每一格都能被独立复算出来——这是它敢写进结果的前提。
const ZHI_ELEMENT = {
  子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火',
  午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水',
};
const ELEMENT_SHENG = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const ELEMENT_KE = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };
const MONTH_STATE_ORDER = ['旺', '相', '休', '囚', '死'];
const MONTH_STATE_SAY = {
  旺: '与月令同气，当令得时',
  相: '受月令之生，气有余',
  休: '生月令而气泄，力减',
  囚: '克月令而力困',
  死: '被月令所克，气受制',
};
const DAY_RELATION_ORDER = ['日生', '日克', '比和', '泄', '耗'];
const DAY_RELATION_SAY = {
  日生: '日辰生扶，当天有人托着',
  日克: '日辰克制，当天被压一头',
  比和: '与日辰同气，当天得到同类之助',
  泄: '生扶日辰，气往外走',
  耗: '克制日辰，力有所耗',
};

export function zhiElementOf(branch) {
  return ZHI_ELEMENT[branch] || null;
}

// 月令五态：同气旺、月令所生相、生月令休、克月令囚、被月令克死
export function monthStateOf(element, monthElement) {
  if (!element || !monthElement) return 'unknown';
  if (element === monthElement) return '旺';
  if (ELEMENT_SHENG[monthElement] === element) return '相';
  if (ELEMENT_SHENG[element] === monthElement) return '休';
  if (ELEMENT_KE[element] === monthElement) return '囚';
  if (ELEMENT_KE[monthElement] === element) return '死';
  return 'unknown';
}

// 日辰对爻：站在「爻」这一边说，日辰是生我、克我，还是我泄它、耗它
export function dayRelationOf(element, dayElement) {
  if (!element || !dayElement) return 'unknown';
  if (element === dayElement) return '比和';
  if (ELEMENT_SHENG[dayElement] === element) return '日生';
  if (ELEMENT_KE[dayElement] === element) return '日克';
  if (ELEMENT_SHENG[element] === dayElement) return '泄';
  if (ELEMENT_KE[element] === dayElement) return '耗';
  return 'unknown';
}

/**
 * 用神旺衰：把月建、日辰两股外部力量落到用神那几爻上。
 * 月建按月支、日辰按日支，各出自己的五行，再与本爻五行论生克；
 * 地支相冲另标——月建冲爻叫月破，日辰冲静爻叫暗动、冲旬空叫冲空。
 * @param {object} result buildLiuyao 的结果
 * @param {object} useGod yongshenOf 的结果
 * @param {{monthBranch?: string, dayBranch?: string}} opts
 */
export function yongshenStrength(result, useGod, opts = {}) {
  if (!useGod || !Array.isArray(useGod.found) || !useGod.found.length) return null;
  const monthBranch = opts.monthBranch || null;
  const dayBranch = opts.dayBranch || (result && result.dayGanZhi ? result.dayGanZhi.branch : null);
  if (!monthBranch && !dayBranch) return null;
  const monthElement = monthBranch ? zhiElementOf(monthBranch) : null;
  const dayElement = dayBranch ? zhiElementOf(dayBranch) : null;
  const kong = Array.isArray(result && result.xunKong)
    ? result.xunKong
    : (result && typeof result.xunKong === 'string' ? result.xunKong.split('') : []);

  const lines = useGod.found.map((l) => {
    const element = l.element || zhiElementOf(l.branch);
    const monthChong = !!(monthBranch && CHONG_OF[l.branch] === monthBranch);
    const dayChong = !!(dayBranch && CHONG_OF[l.branch] === dayBranch);
    const monthState = monthStateOf(element, monthElement);
    const dayRelation = dayRelationOf(element, dayElement);
    const isEmpty = kong.includes(l.branch);
    return {
      position: l.position,
      branch: l.branch,
      element,
      monthState,
      monthSay: MONTH_STATE_SAY[monthState] || '',
      monthChong,
      dayRelation,
      daySay: DAY_RELATION_SAY[dayRelation] || '',
      dayChong,
      kong: isEmpty,
      moving: !!l.moving,
      // 冲的三种情形混在一起说不清，这里分开定名
      chongTag: monthChong ? '月破'
        : dayChong ? (isEmpty ? '冲空' : (l.moving ? '逢日辰冲' : '暗动')) : '',
    };
  });

  const labels = [];
  const states = [...new Set(lines.map((l) => l.monthState))].filter((x) => x !== 'unknown');
  states.sort((a, b) => MONTH_STATE_ORDER.indexOf(a) - MONTH_STATE_ORDER.indexOf(b));
  for (const st of states) labels.push(`用神月建${st}`);
  if (lines.some((l) => l.monthChong)) labels.push('用神月破');
  const rels = [...new Set(lines.map((l) => l.dayRelation))].filter((x) => x !== 'unknown');
  rels.sort((a, b) => DAY_RELATION_ORDER.indexOf(a) - DAY_RELATION_ORDER.indexOf(b));
  for (const rel of rels) {
    labels.push(rel === '日生' ? '用神得日辰生'
      : rel === '日克' ? '用神受日辰克'
        : rel === '比和' ? '用神与日辰比和'
          : rel === '泄' ? '用神泄于日辰' : '用神耗日辰');
  }
  for (const tag of [...new Set(lines.map((l) => l.chongTag))].filter(Boolean)) {
    labels.push(tag === '月破' ? '' : `用神${tag}`);
  }
  const clean = labels.filter(Boolean).filter((x, i, arr) => arr.indexOf(x) === i);

  return {
    month: monthBranch ? { branch: monthBranch, element: monthElement } : null,
    day: dayBranch ? { branch: dayBranch, element: dayElement } : null,
    lines,
    labels: clean,
    note: '月建主这一段的旺衰，日辰看当天是扶是克；两处都只给状态标签，不折成分数，也不单独断吉凶。',
  };
}

// ── 伏神出伏：飞伏生克 + 月建日辰，只判条件、不出应期 ─────────────────
// 知识卡只承诺四件事：飞神生伏、伏神克飞、日月生扶算得力，飞神克伏算受压。
// 这里把「助」与「压」分开列，再按四档归并；不排各家优先级，也不推日期。
export const FUSHEN_VERDICTS = ['可出', '有助有压', '受压难出', '未得助'];

/**
 * 伏神出不出得来：先看飞伏生克，再叠月建与日辰。
 * 助：飞生伏、伏克飞、日辰生/比和、月建旺/相；
 * 压：飞克伏、日辰克、月破。旬空只标出，不并入档位。
 * @param {object} result buildLiuyao 的结果
 * @param {object} useGod yongshenOf 的结果
 * @param {{monthBranch?: string, dayBranch?: string}} opts
 */
export function fushenAccess(result, useGod, opts = {}) {
  if (!useGod || !Array.isArray(useGod.fushen) || !useGod.fushen.length) return null;
  const monthBranch = opts.monthBranch || null;
  const dayBranch = opts.dayBranch || (result && result.dayGanZhi ? result.dayGanZhi.branch : null);
  const monthElement = monthBranch ? zhiElementOf(monthBranch) : null;
  const dayElement = dayBranch ? zhiElementOf(dayBranch) : null;
  const kong = Array.isArray(result && result.xunKong)
    ? result.xunKong
    : (result && typeof result.xunKong === 'string' ? result.xunKong.split('') : []);

  const items = useGod.fushen.map((f) => {
    const element = f.element || zhiElementOf(f.branch);
    const relation = f.relation || null;
    const monthState = monthStateOf(element, monthElement);
    const monthChong = !!(monthBranch && CHONG_OF[f.branch] === monthBranch);
    const dayRelation = dayRelationOf(element, dayElement);
    const kongz = kong.includes(f.branch);

    const supports = [];
    if (relation === '飞生伏') supports.push('飞神生伏');
    if (relation === '伏克飞') supports.push('伏神克飞');
    if (dayRelation === '日生') supports.push('日辰生伏');
    if (dayRelation === '比和') supports.push('日辰比和');
    if (monthState === '旺') supports.push('月建同气');
    if (monthState === '相') supports.push('月建相生');

    const pressures = [];
    if (relation === '飞克伏') pressures.push('飞神克伏');
    if (dayRelation === '日克') pressures.push('日辰克伏');
    if (monthChong) pressures.push('月破');

    const verdict = !relation ? '飞伏未知'
      : supports.length && pressures.length ? '有助有压'
        : supports.length ? '可出'
          : pressures.length ? '受压难出' : '未得助';
    const basis = monthBranch && dayBranch ? '月建日辰' : monthBranch ? '月建' : dayBranch ? '日辰' : '飞伏';

    const facts = [];
    if (relation) facts.push(`飞伏${relation}`);
    if (monthBranch) facts.push(`月建${monthBranch}（${monthElement}）${monthState}${monthChong ? '、月破' : ''}`);
    if (dayBranch) facts.push(`日辰${dayBranch}（${dayElement}）${dayRelation}`);
    if (kongz) facts.push('伏神旬空');
    const say = `第${f.position}爻${f.branch}${element}：${facts.join('，')} → ${verdict}` +
      `（助：${supports.join('、') || '无'}；压：${pressures.join('、') || '无'}）`;

    return {
      position: f.position,
      branch: f.branch,
      element,
      relation,
      fei: f.fei || null,
      monthState,
      monthChong,
      dayRelation,
      kong: kongz,
      basis,
      supports,
      pressures,
      verdict,
      say,
    };
  });

  return {
    month: monthBranch ? { branch: monthBranch, element: monthElement } : null,
    day: dayBranch ? { branch: dayBranch, element: dayElement } : null,
    items,
    labels: items.map((it) => `第${it.position}爻${it.verdict}`),
    note: '出伏只看「有没有助、有没有压」两件事：飞生伏、伏克飞、日辰生/比和、月建旺/相算助；飞克伏、日辰克、月破算压。四档只把条件并列，不排各家优先级；旬空只标出，不并入档位，也不出应期。',
  };
}

// ── 全卦逐爻旺衰：月建日辰落到六爻全部 ──────────────────────────────
// 与用神旺衰同一套判定（月令五态、日辰五关系、三种冲法），区别只在不挑用神：
// 六爻每一爻都给一次，世应、动爻、旬空另标，看得出整张卦的气压在哪一头。
export function hexagramStrength(result, opts = {}) {
  const rows = (result && result.ben && Array.isArray(result.ben.lines))
    ? result.ben.lines
    : (result && Array.isArray(result.lines) ? result.lines : []);
  if (!rows.length) return null;
  const monthBranch = opts.monthBranch || null;
  const dayBranch = opts.dayBranch || (result.dayGanZhi ? result.dayGanZhi.branch : null);
  if (!monthBranch && !dayBranch) return null;
  const monthElement = monthBranch ? zhiElementOf(monthBranch) : null;
  const dayElement = dayBranch ? zhiElementOf(dayBranch) : null;
  const kong = Array.isArray(result.xunKong)
    ? result.xunKong
    : (typeof result.xunKong === 'string' ? result.xunKong.split('') : []);
  const shiPos = result.ben ? result.ben.shi : null;
  const yingPos = result.ben ? result.ben.ying : null;

  const lines = rows.map((l) => {
    const element = l.element || zhiElementOf(l.branch);
    const monthChong = !!(monthBranch && CHONG_OF[l.branch] === monthBranch);
    const dayChong = !!(dayBranch && CHONG_OF[l.branch] === dayBranch);
    const monthState = monthStateOf(element, monthElement);
    const dayRelation = dayRelationOf(element, dayElement);
    const isEmpty = kong.includes(l.branch);
    return {
      position: l.position,
      name: l.name,
      branch: l.branch,
      element,
      liuqin: l.liuqin ?? null,
      shi: l.position === shiPos,
      ying: l.position === yingPos,
      moving: !!l.moving,
      kong: isEmpty,
      monthState,
      monthSay: MONTH_STATE_SAY[monthState] || '',
      monthChong,
      dayRelation,
      daySay: DAY_RELATION_SAY[dayRelation] || '',
      dayChong,
      chongTag: monthChong ? '月破'
        : dayChong ? (isEmpty ? '冲空' : (l.moving ? '逢日辰冲' : '暗动')) : '',
    };
  });

  const counts = {};
  for (const st of MONTH_STATE_ORDER) counts[st] = lines.filter((l) => l.monthState === st).length;

  const labels = [];
  for (const st of MONTH_STATE_ORDER) if (counts[st]) labels.push(`全卦${st}${counts[st]}爻`);
  const shiLine = lines.find((l) => l.shi) || null;
  const yingLine = lines.find((l) => l.ying) || null;
  if (shiLine && shiLine.monthState !== 'unknown') labels.push(`世爻月建${shiLine.monthState}`);
  if (yingLine && yingLine.monthState !== 'unknown') labels.push(`应爻月建${yingLine.monthState}`);
  const tagCount = (tag) => lines.filter((l) => l.chongTag === tag).length;
  for (const tag of ['月破', '暗动', '冲空', '逢日辰冲']) {
    const n = tagCount(tag);
    if (n) labels.push(`${tag}${n}爻`);
  }

  return {
    month: monthBranch ? { branch: monthBranch, element: monthElement } : null,
    day: dayBranch ? { branch: dayBranch, element: dayElement } : null,
    lines,
    counts,
    strongest: lines.filter((l) => l.monthState === '旺').map((l) => l.position),
    weakest: lines.filter((l) => l.monthState === '死' || l.monthChong).map((l) => l.position),
    shi: shiLine ? { position: shiLine.position, branch: shiLine.branch, monthState: shiLine.monthState, dayRelation: shiLine.dayRelation } : null,
    ying: yingLine ? { position: yingLine.position, branch: yingLine.branch, monthState: yingLine.monthState, dayRelation: yingLine.dayRelation } : null,
    labels,
    note: '月建主这一段的旺衰、日辰管当天的扶克，六爻逐一给状态；判定与用神旺衰同一套，只多了世应与动爻标记。只报状态、不折分数，也不单独断吉凶。',
  };
}

// ── 化进 / 化退的力重：进退只管方向，走不走得动看时令 ─────────────────
// 化进只说明这一爻顺着往前走一步，能不能走实要放回月建日辰：
//   得令（旺/相）化进 → 后劲足；休/囚化进 → 后劲有限；逢死 → 进得虚
//   得令化退 → 退得缓（时令还托着，退得慢）；失令化退 → 退得实
// 月破压过一切：爻遭月建冲，进退都站不稳，先看出空填实。
// 旬空只标出来、不并进结论——动爻旬空要等出空才算数。
// 《增删卜易》进神退神章讲「化进神须得日月生扶」，这里只做这一步，不叠动变连环。
const JIN_VERDICT = { 旺: '后劲足', 相: '后劲足', 休: '后劲有限', 囚: '后劲有限', 死: '进得虚' };
const TUI_VERDICT = { 旺: '退得缓', 相: '退得缓', 休: '退得实', 囚: '退得实', 死: '退得实' };

/**
 * 化进 / 化退的力重：把 body.jinTui 每一条放回月建日辰结算。
 * @param {object} result buildLiuyao 的结果（需带 body.jinTui）
 * @param {{monthBranch?: string, dayBranch?: string}} opts
 */
export function jinTuiPower(result, opts = {}) {
  const items = result && result.body && Array.isArray(result.body.jinTui) ? result.body.jinTui : [];
  if (!items.length) return null;
  const rows = result && result.ben && Array.isArray(result.ben.lines) ? result.ben.lines : [];
  const monthBranch = opts.monthBranch || null;
  const dayBranch = opts.dayBranch || (result && result.dayGanZhi ? result.dayGanZhi.branch : null);
  const monthElement = monthBranch ? zhiElementOf(monthBranch) : null;
  const dayElement = dayBranch ? zhiElementOf(dayBranch) : null;
  const kong = Array.isArray(result && result.xunKong)
    ? result.xunKong
    : (result && typeof result.xunKong === 'string' ? result.xunKong.split('') : []);

  const lines = items.map((x) => {
    const line = rows[x.position - 1] || null;
    const element = (line && line.element) || zhiElementOf(x.from);
    const monthState = monthStateOf(element, monthElement);
    const monthChong = !!(monthBranch && CHONG_OF[x.from] === monthBranch);
    const dayChong = !!(dayBranch && CHONG_OF[x.from] === dayBranch);
    const dayRelation = dayRelationOf(element, dayElement);
    const isEmpty = kong.includes(x.from);
    // 判定顺序：无月建只报趋势 → 月破压过一切 → 按五态给进退定档
    const verdict = !monthBranch ? '只报趋势'
      : monthChong ? '月破失据'
        : ((x.type === '进' ? JIN_VERDICT : TUI_VERDICT)[monthState] || '未定');
    const monthSay = monthBranch
      ? `月建${monthBranch}（${monthElement}）对${element}为${monthState}`
      : '缺月建，只看日辰';
    const daySay = dayRelation === 'unknown' ? '' : `日辰${dayBranch}（${dayElement}）${dayRelation}`;
    const extra = [monthChong ? '又遭月破' : '', isEmpty ? '旬空待填' : '', dayChong ? '逢日辰冲' : ''].filter(Boolean);
    return {
      position: x.position,
      from: x.from,
      to: x.to,
      type: x.type,
      element,
      monthState,
      monthChong,
      dayRelation,
      dayChong,
      kong: isEmpty,
      verdict,
      say: `${x.from}→${x.to}（${x.type}）：${monthSay}${daySay ? `，${daySay}` : ''}${extra.length ? `，${extra.join('、')}` : ''} → ${verdict}`,
    };
  });

  return {
    month: monthBranch ? { branch: monthBranch, element: monthElement } : null,
    day: dayBranch ? { branch: dayBranch, element: dayElement } : null,
    lines,
    labels: lines.map((l) => `${l.position}爻化${l.type}·${l.verdict}`),
    note: '进退只说这一爻往哪边走；力重是把它放回月建日辰，看有没有托着——得令则进得动、退得慢，失令则进得虚、退得实，月破压过一切。仍不直接定吉凶：用神化进为喜，忌神化进反而是忌。',
  };
}

// ── 应期线索：只列「该留意哪一支」，不给日期 ─────────────────────────
// 知识卡 liuyao-yingqi 的承诺是「只作时间窗口的提示」：传统取用神逢值、
// 逢冲、逢合之期，旬空另等出空、冲空。这里只把这些地支列出来，再按月建给
// 一个快慢方向；不换算成日期、不排先后、不判忌神受制，也不叠动变连环。
export const YINGQI_TEMPO = ['偏速', '偏缓', '待解', '未定'];
const TEMPO_SAY = {
  偏速: '用神得月令之气，应期偏近',
  偏缓: '用神失月令之气，应期偏远',
  待解: '有月破或旬空的用神，先等条件解除',
  未定: '快慢不定（缺月建，或用神两现而旺衰不一）',
};
const TRIGGER_ORDER = ['逢值', '逢冲', '逢合', '出空填实', '冲空'];

/**
 * 应期线索：用神逢值、逢冲、逢合，旬空另标出空与冲空。
 * @param {object} result buildLiuyao 的结果
 * @param {object} useGod yongshenOf 的结果
 * @param {{monthBranch?: string}} opts
 */
export function yingqiWindow(result, useGod, opts = {}) {
  if (!useGod || !useGod.liuqin) return null;
  const found = Array.isArray(useGod.found) ? useGod.found : [];
  const fushen = Array.isArray(useGod.fushen) ? useGod.fushen : [];
  const viaFushen = !found.length && fushen.length > 0;
  const source = found.length ? found : fushen;
  if (!source.length) return null;
  const monthBranch = opts.monthBranch || null;
  const monthElement = monthBranch ? zhiElementOf(monthBranch) : null;
  const kong = Array.isArray(result && result.xunKong)
    ? result.xunKong
    : (result && typeof result.xunKong === 'string' ? result.xunKong.split('') : []);

  const items = source.map((l) => {
    const branch = l.branch;
    const element = l.element || zhiElementOf(branch);
    const monthState = monthStateOf(element, monthElement);
    const isEmpty = kong.includes(branch);
    const monthChong = !!(monthBranch && CHONG_OF[branch] === monthBranch);
    const tempo = monthChong ? '待解'
      : isEmpty ? '待解'
        : monthState === 'unknown' ? '未定'
          : (monthState === '旺' || monthState === '相') ? '偏速' : '偏缓';
    const tempoSay = monthChong ? `遭${monthBranch}冲（月破），先待出月或填实`
      : isEmpty ? '用神旬空，先待出空填实'
        : monthState === 'unknown' ? '缺月建，快慢不定'
          : `月建${monthState}，${tempo === '偏速' ? '应期偏近' : '应期偏远'}`;
    const triggers = [
      { branch, labels: ['逢值'] },
      { branch: CHONG_OF[branch] || null, labels: ['逢冲'] },
      { branch: HE_OF[branch] || null, labels: ['逢合'] },
    ];
    if (isEmpty) {
      triggers[0].labels.push('出空填实');
      triggers[1].labels.push('冲空');
    }
    return {
      position: l.position,
      branch,
      element,
      monthState,
      monthChong,
      kong: isEmpty,
      tempo,
      tempoSay,
      triggers,
    };
  });

  // 用神两现时各爻的支可能不同：按支归并标签，不替谁选主用
  const merged = new Map();
  for (const it of items) {
    for (const t of it.triggers) {
      if (!t.branch) continue;
      const cur = merged.get(t.branch) || { branch: t.branch, labels: [] };
      for (const lb of t.labels) if (!cur.labels.includes(lb)) cur.labels.push(lb);
      merged.set(t.branch, cur);
    }
  }
  const triggers = [...merged.values()].map((t) => ({
    branch: t.branch,
    labels: [...t.labels].sort((a, b) => TRIGGER_ORDER.indexOf(a) - TRIGGER_ORDER.indexOf(b)),
  }));
  const tempos = items.map((x) => x.tempo);
  const tempo = tempos.includes('待解') ? '待解'
    : tempos.every((t) => t === '偏速') ? '偏速'
      : tempos.every((t) => t === '偏缓') ? '偏缓' : '未定';

  return {
    month: monthBranch ? { branch: monthBranch, element: monthElement } : null,
    viaFushen,
    tempo,
    tempoSay: TEMPO_SAY[tempo],
    items,
    triggers,
    labels: [`应期${tempo}`, ...triggers.map((t) => `${t.labels.join('/')}${t.branch}`)],
    note: '应期只给「该留意哪一支」与快慢方向：用神逢值、逢冲、逢合，旬空另标出空与冲空。不换算成日期、不排先后、不判忌神受制；近事以日计、远事以月计，用哪把尺由事情远近决定，本插件不代选。',
  };
}
