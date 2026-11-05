// 梅花易数：时间/数字起卦、体用、互卦、变卦、错综卦
import { BRANCHES, fromJDN, toJDN } from './calendar.js';
import { solarToLunar } from './lunar.js';
import { fail } from './fail.js';
import { bool } from './bool.js';
import { parseDateTime } from './datetime.js';
import { assertShifted } from './validate.js';
import { hexagramFromBits } from './liuyao.js';
import { jingText } from './yijing-text.js';

// 先天八卦数：乾1 兑2 离3 震4 巽5 坎6 艮7 坤8
const TRI_NAME = ['', '乾', '兑', '离', '震', '巽', '坎', '艮', '坤'];
const TRI_BITS = {
  乾: [1, 1, 1], 兑: [1, 1, 0], 离: [1, 0, 1], 震: [1, 0, 0],
  巽: [0, 1, 1], 坎: [0, 1, 0], 艮: [0, 0, 1], 坤: [0, 0, 0],
};
const TRI_ELEMENT = { 乾: '金', 兑: '金', 离: '火', 震: '木', 巽: '木', 坎: '水', 艮: '土', 坤: '土' };
const GENERATES = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const OVERCOMES = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };

const mod8 = (n) => ((n % 8) + 7) % 8 + 1; // 1..8，余 0 作 8
const mod6 = (n) => ((n % 6) + 5) % 6 + 1; // 1..6，余 0 作 6

function bitsOf(num) {
  return TRI_BITS[TRI_NAME[num]];
}

function hexName(upperNum, lowerNum) {
  const bits = [...bitsOf(lowerNum), ...bitsOf(upperNum)];
  const h = hexagramFromBits(bits);
  return { name: h.name, upper: TRI_NAME[upperNum], lower: TRI_NAME[lowerNum], bits };
}

/** 体用关系 */
function relation(bodyEl, useEl) {
  if (bodyEl === useEl) return { level: '吉', text: '体用比和，事顺而稳' };
  if (GENERATES[useEl] === bodyEl) return { level: '大吉', text: `用生体（${useEl}生${bodyEl}），得外力相助` };
  if (GENERATES[bodyEl] === useEl) return { level: '小凶', text: `体生用（${bodyEl}生${useEl}），耗损付出` };
  if (OVERCOMES[bodyEl] === useEl) return { level: '吉', text: `体克用（${bodyEl}克${useEl}），事可为但费力` };
  return { level: '凶', text: `用克体（${useEl}克${bodyEl}），受阻受制` };
}

/**
 * 起卦
 * @param {object} input
 *   mode: 'time' | 'number'
 *   datetime: 'YYYY-MM-DDTHH:mm'（time 模式）
 *   upper/lower/changing: 数字（number 模式，可给两数由程序取余）
 */
export function buildMeihua(input = {}) {
  if (!input || typeof input !== 'object') throw fail('E_INPUT', '梅花起卦参数不能为空：时间起卦要 datetime，数字起卦要 upper / lower');
  const mode = input.mode === 'number' ? 'number' : 'time';
  let upperNum;
  let lowerNum;
  let moving;
  let source;

  if (mode === 'number') {
    // 只认真正的数字：Number(null) / Number(false) / Number([]) 都是 0，
    // 以前缺参或传错类型会静默起成「坤为地」，盘面看着正常却完全不是用户给的字数。
    const a = input.upper;
    const b = input.lower;
    // 小数以前只过 Number.isFinite，mod8(3.5) 得到 4.5，bitsOf 查不到卦再在深处抛
    // 「bitsOf is not a function」——参数错却报成内部错误。数字起卦只认整数。
    if (typeof a !== 'number' || typeof b !== 'number' || !Number.isInteger(a) || !Number.isInteger(b)) {
      throw fail('E_INPUT', '数字起卦需要两个整数（upper / lower），例如 upper=3、lower=5');
    }
    upperNum = mod8(a);
    lowerNum = mod8(b);
    if (input.changing !== undefined && input.changing !== null && input.changing !== '') {
      // 以前 99 会被 mod 6 折成 3：用户指定动爻却得到另一爻，结果里看不出来。
      // Number(true)=1、Number([3])=3 也会静默通过，故只收数字或十进制数字串。
      const raw = input.changing;
      const ch = typeof raw === 'number'
        ? raw
        : typeof raw === 'string' && /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(raw.trim())
          ? Number(raw.trim())
          : NaN;
      if (!Number.isInteger(ch) || ch < 1 || ch > 6) {
        const shown = typeof raw === 'string' ? raw : JSON.stringify(raw);
        throw fail('E_INPUT', `动爻 changing 必须是 1–6 的整数，收到「${shown}」`);
      }
      moving = ch;
    } else {
      moving = mod6(a + b);
    }
    source = `数字起卦：${a} / ${b}`;
  } else {
    const dt = parseDateTime(input.datetime);
    // 晚子时换日与八字/六壬/奇门同口径：23:00–23:59 归次日，年月日电数才落在同一子时
    const lateZi = bool(input.lateZi, true);
    let sy = dt.year;
    let sm = dt.month;
    let sd = dt.day;
    if (lateZi && dt.hour >= 23) {
      const next = assertShifted(fromJDN(toJDN(sy, sm, sd) + 1), '梅花时间起卦');
      sy = next.year;
      sm = next.month;
      sd = next.day;
    }
    const lunar = solarToLunar(sy, sm, sd);
    const yearBranch = ((lunar.lunarYear - 4) % 12 + 12) % 12;
    const hb = Math.floor(((dt.hour + 1) % 24) / 2);
    const sum1 = yearBranch + 1 + lunar.month + lunar.day;
    const sum2 = sum1 + hb + 1;
    upperNum = mod8(sum1);
    lowerNum = mod8(sum2);
    moving = mod6(sum2);
    source = `时间起卦：${BRANCHES[yearBranch]}年${lunar.month}月${lunar.day}日${BRANCHES[hb]}时${lateZi && dt.hour >= 23 ? '（晚子时按次日）' : ''}`;
  }

  const ben = hexName(upperNum, lowerNum);
  const bits = ben.bits;

  // 动爻：自下而上第 moving 爻
  const changedBits = bits.slice();
  changedBits[moving - 1] = changedBits[moving - 1] ? 0 : 1;
  const bian = hexagramFromBits(changedBits);

  // 互卦：2·3·4 为下互，3·4·5 为上互
  const huLower = [bits[1], bits[2], bits[3]];
  const huUpper = [bits[2], bits[3], bits[4]];
  const hu = hexagramFromBits([...huLower, ...huUpper]);

  // 体用：动爻所在之卦为用，另一卦为体
  const movingInUpper = moving >= 4;
  const bodyTri = movingInUpper ? ben.lower : ben.upper;
  const useTri = movingInUpper ? ben.upper : ben.lower;
  const rel = relation(TRI_ELEMENT[bodyTri], TRI_ELEMENT[useTri]);

  // 错卦＝六爻全变；综卦＝整卦倒转（覆卦），不是上下卦对调：天风姤 → 泽天夬
  const cuoBits = bits.map((b) => (b ? 0 : 1));
  const zongBits = bits.slice().reverse();
  const cuo = hexagramFromBits(cuoBits);
  const zong = hexagramFromBits(zongBits);

  return {
    system: 'meihua',
    mode,
    source,
    moving,
    movingName: ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'][moving - 1],
    ben: { name: ben.name, upper: ben.upper, lower: ben.lower, element: `${TRI_ELEMENT[ben.upper]}/${TRI_ELEMENT[ben.lower]}` },
    hu: { name: hu.name, upper: hu.upper, lower: hu.lower },
    bian: { name: bian.name, upper: bian.upper, lower: bian.lower },
    cuo: { name: cuo.name },
    zong: { name: zong.name },
    // 经文原文在排盘时算好挂上，解释层只摆位置（同 liuyao.js，见 engine/yijing-text.js）
    jing: jingText({ benName: ben.name, huName: hu.name, bianName: bian.name, movingPositions: [moving] }),
    bodyUse: {
      body: { trigram: bodyTri, element: TRI_ELEMENT[bodyTri] },
      use: { trigram: useTri, element: TRI_ELEMENT[useTri] },
      relation: rel.text,
      level: rel.level,
    },
    lines: bits.map((b, i) => ({
      position: i + 1,
      name: ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'][i],
      yinYang: b ? '阳' : '阴',
      moving: i === moving - 1,
    })),
  };
}

export { TRI_NAME, TRI_ELEMENT, TRI_BITS };
