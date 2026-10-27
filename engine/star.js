// 星座档案 + 当日娱乐向基调：纯本地确定性（同一天同一星座结果永远一致）。
// 星座按太阳过宫的通行日期区间（公历）；当日基调由日期哈希生成，不是随机数。
import { daysInMonth } from './validate.js';

/** 12 星座（区间含起止日；摩羯跨年由两端分别匹配）。 */
export const SIGNS = [
  { name: '白羊座', element: '火象', planet: '火星', range: [3, 21, 4, 19], keywords: '热血、开拓、直来直往', compatible: '狮子、射手、天秤' },
  { name: '金牛座', element: '土象', planet: '金星', range: [4, 20, 5, 20], keywords: '沉稳、务实、惜物恋旧', compatible: '处女、摩羯、巨蟹' },
  { name: '双子座', element: '风象', planet: '水星', range: [5, 21, 6, 21], keywords: '灵动、好奇、能言善变', compatible: '天秤、水瓶、白羊' },
  { name: '巨蟹座', element: '水象', planet: '月亮', range: [6, 22, 7, 22], keywords: '顾家、念旧、外柔内韧', compatible: '天蝎、双鱼、金牛' },
  { name: '狮子座', element: '火象', planet: '太阳', range: [7, 23, 8, 22], keywords: '大方、自信、天生舞台感', compatible: '白羊、射手、天秤' },
  { name: '处女座', element: '土象', planet: '水星', range: [8, 23, 9, 22], keywords: '细致、挑剔、完美主义', compatible: '金牛、摩羯、巨蟹' },
  { name: '天秤座', element: '风象', planet: '金星', range: [9, 23, 10, 23], keywords: '优雅、权衡、社交高手', compatible: '双子、水瓶、狮子' },
  { name: '天蝎座', element: '水象', planet: '冥王星', range: [10, 24, 11, 22], keywords: '深挚、洞察、爱憎分明', compatible: '巨蟹、双鱼、处女' },
  { name: '射手座', element: '火象', planet: '木星', range: [11, 23, 12, 21], keywords: '乐观、自由、远方体质', compatible: '白羊、狮子、水瓶' },
  { name: '摩羯座', element: '土象', planet: '土星', range: [12, 22, 1, 19], keywords: '自律、坚忍、大器晚成', compatible: '金牛、处女、天蝎' },
  { name: '水瓶座', element: '风象', planet: '天王星', range: [1, 20, 2, 18], keywords: '独立、前卫、脑洞担当', compatible: '双子、天秤、射手' },
  { name: '双鱼座', element: '水象', planet: '海王星', range: [2, 19, 3, 20], keywords: '温柔、共情、浪漫滤镜', compatible: '巨蟹、天蝎、金牛' },
];

/** 日期 → 星座条目；非法日期返回 null。 */
export function signOfDate(month, day) {
  for (const s of SIGNS) {
    const [m1, d1, m2, d2] = s.range;
    if ((month === m1 && day >= d1) || (month === m2 && day <= d2)) return s;
  }
  return null;
}

/** 日期哈希（同日同结果；Math.imul 保证 32 位乘法不丢精度）。 */
function daySeed(y, m, d, salt) {
  let x = ((y * 73856093) ^ (m * 19349663) ^ (d * 83492791) ^ Math.imul(salt, 2654435761)) >>> 0;
  x = Math.imul(x ^ (x >>> 13), 0x5bd1e995);
  return (x ^ (x >>> 15)) >>> 0;
}

const COLORS = ['晨雾白', '海盐蓝', '苔原绿', '落日橘', '琥珀黄', '黛蓝', '藕荷粉', '石墨灰', '橄榄绿', '雾紫'];
const TONE_TEXT = {
  5: '势头极好，主动出击。',
  4: '顺风缓行，乘势而为。',
  3: '平顺持中，稳字当头。',
  2: '略有阻滞，慢即是快。',
  1: '宜静宜守，养精蓄锐。',
};

/**
 * 星座 + 当日基调。
 * @param {{year:number, month:number, day:number}} input 公历日期
 */
export function buildStar(input) {
  const { year, month, day } = input || {};
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)
    || year < 1900 || year > 2100 || month < 1 || month > 12 || day < 1 || day > daysInMonth(year, month)) {
    throw new Error('星座需要真实存在的公历日期（year 1900–2100、month、day）——请向用户询问');
  }
  const sign = signOfDate(month, day);
  if (!sign) throw new Error(`无法识别星座：${year}-${month}-${day}`);
  const dims = ['事业', '感情', '财运', '健康'].map((k, i) => {
    const stars = (daySeed(year, month, day, i + 1) % 5) + 1;
    return { name: k, stars, text: TONE_TEXT[stars] };
  });
  return {
    system: 'star',
    meta: { date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}` },
    sign: {
      name: sign.name,
      element: sign.element,
      planet: sign.planet,
      keywords: sign.keywords,
      compatible: sign.compatible,
      range: `${sign.range[0]}月${sign.range[1]}日–${sign.range[2]}月${sign.range[3]}日`,
    },
    daily: {
      tone: TONE_TEXT[(daySeed(year, month, day, 9) % 5) + 1],
      dims,
      luckyColor: COLORS[daySeed(year, month, day, 10) % COLORS.length],
      luckyNumber: (daySeed(year, month, day, 11) % 9) + 1,
    },
    sources: ['星座区间：太阳过宫通行日期', '当日基调：日期哈希确定性生成（同日同结果）'],
    disclaimer: '星座档案为通行天文口径；当日基调纯娱乐向，同日同结果，不构成任何现实预测。',
  };
}
