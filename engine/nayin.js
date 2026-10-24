// 六十甲子纳音（每两个干支一名）。
//
// 之前 bazi.js 与 ziwei.js 各存了一份完全相同的 30 项表：改一处漏改另一处，
// 就会出现「八字时柱纳音」与「紫微五行局」对不上的静默错误。这里收成单一来源。

export const NAYIN_NAMES = [
  '海中金', '炉中火', '大林木', '路旁土', '剑锋金',
  '山头火', '涧下水', '城头土', '白蜡金', '杨柳木',
  '泉中水', '屋上土', '霹雳火', '松柏木', '长流水',
  '沙中金', '山下火', '平地木', '壁上土', '金箔金',
  '覆灯火', '天河水', '大驿土', '钗钏金', '桑柘木',
  '大溪水', '沙中土', '天上火', '石榴木', '大海水',
];

/**
 * 按六十甲子序号取纳音。序号可越界/为负，内部先归一到 0–59。
 * @param {number} ganzhiIdx 0 = 甲子 … 59 = 癸亥
 * @returns {{name: string, element: '金'|'木'|'水'|'火'|'土'}}
 */
export function nayinOf(ganzhiIdx) {
  const i = ((Number(ganzhiIdx) % 60) + 60) % 60;
  const name = NAYIN_NAMES[Math.floor(i / 2)];
  return { name, element: name[2] };
}
