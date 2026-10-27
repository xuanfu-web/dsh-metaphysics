// 生命数字（西方数字学）：生命路径数 / 生日数 / 态度数，11、22、33 主数保留。
// 纯本地确定性；与八字/紫微是两套不可互证的体系，输出里明确提示。
import { daysInMonth } from './validate.js';

/** 1–9 与主数 11/22/33 的数义（白话提炼）。 */
export const NUMBER_MEANING = {
  1: { title: '开创者', keywords: '独立、主见、起步快', tendency: '习惯自己拍板，适合从零开始的事。', lesson: '课题是学会合作与示弱，别把「我能行」当唯一答案。' },
  2: { title: '协调者', keywords: '细腻、共情、善配合', tendency: '擅长读空气、做黏合剂，团队里离不开的角色。', lesson: '课题是别过度讨好、别把委屈攒成怨气。' },
  3: { title: '表达者', keywords: '活跃、创意、感染力', tendency: '靠表达与点子吃饭，越有舞台越发光。', lesson: '课题是持续力与收尾，别让兴趣过载成半成品。' },
  4: { title: '建构者', keywords: '务实、秩序、靠得住', tendency: '擅长把混乱理成流程，慢工出细活。', lesson: '课题是别过度求稳、别用规则捆住自己和别人。' },
  5: { title: '探索者', keywords: '自由、变化、新鲜感', tendency: '适应力强，喜欢移动与尝鲜，厌烦一成不变。', lesson: '课题是承诺与专注，别把「换一个」当解药。' },
  6: { title: '照顾者', keywords: '责任、顾家、审美', tendency: '天然把身边人放进自己的责任清单。', lesson: '课题是别替别人扛过头，爱不等于包办。' },
  7: { title: '探究者', keywords: '内省、钻研、独处', tendency: '需要个人空间，喜欢把问题想透再动。', lesson: '课题是信任与敞开，别用距离保护自己。' },
  8: { title: '经营者', keywords: '资源、格局、执行力', tendency: '对钱与权有直觉，擅长把资源盘活。', lesson: '课题是平衡控制欲，别用成果定义自我价值。' },
  9: { title: '理想者', keywords: '情怀、包容、完成感', tendency: '看得远，愿意为更大的意义投入。', lesson: '课题是落地与界限，别在付出里丢了自己。' },
  11: { title: '直觉者（主数）', keywords: '敏感、灵感、感召力', tendency: '直觉极准，容易成为别人的灯，但情绪消耗也大。', lesson: '课题是把天赋落地成具体作品，而不是只停在感受。' },
  22: { title: '实践家（主数）', keywords: '愿景、系统、扛大梁', tendency: '能把大想法拆成可行工程，压力与能力同步放大。', lesson: '课题是别被宏大目标压住，先完成小闭环。' },
  33: { title: '疗愈者（主数）', keywords: '大爱、教导、承担', tendency: '为他人承担是本能，适合教导与疗愈型角色。', lesson: '课题是先照顾好自己，别把牺牲当价值。' },
};

/** 逐位求和；11/22/33 保留为主数（不再归约）。 */
export function reduceNumber(n, keepMasters = true) {
  let v = Math.abs(Math.trunc(n));
  while (v > 9) {
    if (keepMasters && (v === 11 || v === 22 || v === 33)) return v;
    v = String(v).split('').reduce((s, c) => s + Number(c), 0);
  }
  return v;
}

const digitSum = (n) => String(Math.abs(Math.trunc(n))).split('').reduce((s, c) => s + Number(c), 0);

/**
 * 生命数字主函数（公历出生日期）。
 * @param {{year:number, month:number, day:number}} input
 */
export function buildNumerology(input) {
  const { year, month, day } = input || {};
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)
    || year < 1900 || year > 2100 || month < 1 || month > 12 || day < 1 || day > daysInMonth(year, month)) {
    throw new Error('生命数字需要真实存在的公历出生日期（year 1900–2100、month、day）——请向用户询问，勿猜');
  }
  const lifePath = reduceNumber(digitSum(year) + digitSum(month) + digitSum(day));
  const birthday = reduceNumber(day);
  const attitude = reduceNumber(month + day);
  const parts = [
    { key: 'lifePath', name: '生命路径数', number: lifePath, meaning: NUMBER_MEANING[lifePath] },
    { key: 'birthday', name: '生日数', number: birthday, meaning: NUMBER_MEANING[birthday] },
    { key: 'attitude', name: '态度数', number: attitude, meaning: NUMBER_MEANING[attitude] },
  ];
  return {
    system: 'numerology',
    meta: { date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`, system: '西方数字学' },
    numbers: { lifePath, birthday, attitude },
    parts,
    primary: parts[0],
    sources: ['生命路径=出生年月日逐位求和归约；生日数=日归约；态度数=月+日归约（11/22/33 保留）'],
    disclaimer: '生命数字属西方数字学体系，与八字/紫微等东方术数口径不同、不可互相印证；仅供自我认识参考。',
  };
}
