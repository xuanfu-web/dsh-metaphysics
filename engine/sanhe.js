// 地支三合局：申子辰合水、亥卯未合木、寅午戌合火、巳酉丑合金。
//
// 之前三处各写一遍：bazi 用「键 → 五行」对象判三合/半合，hepan 用三个字的数组判半合，
// daliuren 又用「单支 → 五行」查驿马桃花。三份表只要有一份改动不同步，
// 「半合」与「驿马」就会互相矛盾。这里统一成一份表 + 三种派生视图。

/** 四组三合，顺序沿用传统口诀（申子辰 → 亥卯未 → 寅午戌 → 巳酉丑） */
export const SANHE_GROUPS = [
  { branches: ['申', '子', '辰'], element: '水' },
  { branches: ['亥', '卯', '未'], element: '木' },
  { branches: ['寅', '午', '戌'], element: '火' },
  { branches: ['巳', '酉', '丑'], element: '金' },
];

/** 三字键 → 五行：bazi 的「三合/半合/拱合」判定按这个遍历 */
export const SANHE = Object.fromEntries(SANHE_GROUPS.map((g) => [g.branches.join(''), g.element]));

/** 单支 → 它所处三合局的五行：daliuren 查驿马桃花用 */
export const SANHE_ELEMENT = Object.fromEntries(
  SANHE_GROUPS.flatMap((g) => g.branches.map((b) => [b, g.element])),
);

/** 某支所在的三合局（找不到返回 null） */
export function sanheGroupOf(branch) {
  return SANHE_GROUPS.find((g) => g.branches.includes(branch)) || null;
}
