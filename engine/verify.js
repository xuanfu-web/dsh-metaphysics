// 验前事：把过去几年的流年信号摊开，让用户自己标「准 / 不准 / 不确定」，
// 只算一个贴合度提示，**不改盘、不重排、不自动调整结论**。
//
// 口径说明：这里说的「准」是用户对自己经历的主观确认，不是事实核验；
// 贴合度低时优先怀疑输入（出生时间、时区、晚子时口径），而不是推翻整张盘。
const KIND_LABEL = {
  career: '事业变动',
  wealth: '财运起伏',
  love: '感情变化',
  move: '搬迁 / 出行',
  health: '健康问题',
  other: '其他大事',
};

const THEME = (l) => {
  const rel = (l.relations || []).join('');
  if (/冲/.test(rel)) return '有冲：变动 / 摩擦';
  if (/刑/.test(rel)) return '有刑：内耗 / 反复';
  if (/合/.test(rel)) return '有合：合作 / 牵引';
  const tier = l.luck && l.luck.tier;
  if (tier === '大吉' || tier === '吉') return '流年偏顺';
  if (tier === '大忌' || tier === '忌') return '流年偏压';
  return '信号平缓';
};

/** 把某张盘（需已含过去年份的 liunian）摊成可勾选的信号行 */
export function pastSignals(chart, untilYear) {
  const until = Number(untilYear) || Infinity;
  return (chart.liunian || [])
    .filter((l) => Number(l.year) <= until)
    .map((l) => ({
      year: Number(l.year),
      ganzhi: l.ganzhi,
      tier: (l.luck && l.luck.tier) || '平',
      tenGod: l.stemTenGod || '',
      relations: l.relations || [],
      theme: THEME(l),
    }));
}

/**
 * 按用户的勾选算贴合度。
 * @param {Array<{year:number}>} rows pastSignals 的结果
 * @param {Record<string,'yes'|'no'|'unsure'>} marks 年份 → 勾选
 */
export function verifyFit(rows, marks) {
  const list = Array.isArray(rows) ? rows : [];
  const m = marks || {};
  const picked = list.filter((r) => m[r.year] === 'yes' || m[r.year] === 'no');
  const yes = picked.filter((r) => m[r.year] === 'yes').length;
  const no = picked.length - yes;
  const rate = picked.length ? yes / picked.length : null;
  const level = rate == null ? '未评' : rate >= 0.7 ? '高' : rate >= 0.4 ? '中' : '低';
  let advice = '';
  if (rate == null) advice = '先勾几项「准 / 不准 / 不确定」，再看得出的贴合度。';
  else if (level === '高') advice = '前事与流年信号对得较顺，可以按这张盘继续看；有分歧时以事实为准。';
  else if (level === '中') advice = '有一部分对得上：先用「追问」核对具体年份，再决定信到什么程度。';
  else advice = '对得不多：优先核对出生时间、出生地（时区/真太阳时）与晚子时口径，而不是改结论。';
  return { answered: picked.length, yes, no, rate, level, advice, labels: { ...KIND_LABEL } };
}

export { KIND_LABEL };

export default pastSignals;
