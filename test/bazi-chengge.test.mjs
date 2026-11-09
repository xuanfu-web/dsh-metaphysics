// 成格评分（炳祥高级第 16 课口径）：只读评分，不改取格与既有三态。
// 基础分按取格档位（专气透 90 / 本气透 70 / 中气透 50 / 余气透 20 / 同五行透 5 / 会支 60 / 月令不透 40）；
// 透干被合 −30、用神太弱 −20；60 分及格。
import { compute } from '../engine/index.js';
import { patternScoreOf } from '../engine/geju.js';
import { ok, eq } from './_harness.mjs';

const bazi = (datetime, extra = {}) => compute({ system: 'bazi', datetime, gender: 'male', trueSolar: false, ...extra });

// 合成四柱：只给评分层需要的 stem / branch
const P = (stems, branches) => ({
  year: { stem: stems[0], branch: branches[0] },
  month: { stem: stems[1], branch: branches[1] },
  day: { stem: stems[2], branch: branches[2] },
  hour: { stem: stems[3], branch: branches[3] },
});
const pat = (over = {}) => ({
  name: '偏印格', kind: '月令格', stem: '甲', god: '偏印', pos: '本气',
  usedBy: '透干', exposedKey: 'month', monthBranch: '寅', ...over,
});
const W = { 木: 3, 火: 2, 土: 2, 金: 1, 水: 2 };

// ── 一、基础分：按取格档位 ─────────────────────────────────────
{
  const s = patternScoreOf(pat(), P(['壬', '甲', '丙', '戊'], ['子', '寅', '午', '戌']), '丙', '寅', W);
  eq('本气透基础分 70', s.base, 70);
  eq('本气透无减项', s.deductions.length, 0);
  eq('本气透成格分 70', s.score, 70);
  ok('本气透过 60 分线', s.pass === true && s.grade === '成格', s.detail);
  ok('detail 写明基础分与及格线', s.detail.includes('基础分 70') && s.detail.includes('60 分线'), s.detail);
}

{
  const s = patternScoreOf(
    pat({ stem: '丙', god: '食神', pos: '本气', monthBranch: '午' }),
    P(['甲', '丙', '戊', '庚'], ['子', '午', '辰', '申']), '戊', '午', W,
  );
  eq('专气透基础分 90', s.base, 90);
  eq('专气透档位标为专气透', s.baseLabel, '专气透');
}

{
  const s = patternScoreOf(
    pat({ stem: '癸', god: '正官', pos: '中气', monthBranch: '丑' }),
    P(['癸', '乙', '丙', '癸'], ['亥', '丑', '寅', '巳']), '丙', '丑', W,
  );
  eq('中气透基础分 50', s.base, 50);
  ok('中气透本身不及 60 分线', s.pass === false && s.grade === '不成格', s.detail);
}

{
  const s = patternScoreOf(
    pat({ stem: '戊', god: '食神', pos: '余气', monthBranch: '申' }),
    P(['乙', '戊', '丁', '辛'], ['卯', '申', '巳', '亥']), '丁', '申', W,
  );
  eq('余气透基础分 20', s.base, 20);
}

{
  // 月令本气未透，但同五行异阴阳透出：按课里「同五行透」<10% 档
  const s = patternScoreOf(
    pat({ stem: '癸', god: '正财', pos: '本气', usedBy: '本气', exposedKey: null, monthBranch: '子' }),
    P(['己', '丙', '戊', '壬'], ['卯', '子', '午', '子']), '戊', '子', W,
  );
  eq('同五行透基础分 5', s.base, 5);
  eq('同五行透单独标档', s.baseLabel, '同五行透');
}

{
  const s = patternScoreOf(
    pat({ stem: '癸', god: '正财', pos: '本气', usedBy: '本气', exposedKey: null, monthBranch: '子' }),
    P(['己', '丙', '戊', '丁'], ['卯', '子', '午', '未']), '戊', '子', W,
  );
  eq('月令不透基础分 40', s.base, 40);
  eq('月令不透单独标档', s.baseLabel, '月令不透');
}

// ── 二、透干被合：−30，合而不化也算 ─────────────────────────────
{
  // 甲透月干，年干己与甲五合
  const s = patternScoreOf(pat(), P(['己', '甲', '丙', '戊'], ['卯', '寅', '午', '戌']), '丙', '寅', W);
  eq('透干被合扣 30', s.score, 40);
  eq('减项记为透干被合', s.deductions[0] && s.deductions[0].reason, '透干被合');
  ok('detail 写明合而不化也按被合论', s.detail.includes('合而不化'), s.detail);
  ok('被合后不及格', s.pass === false && s.grade === '不成格', s.detail);
}

{
  // 未透干（本气取格）不套「透干被合」
  const s = patternScoreOf(
    pat({ usedBy: '本气', exposedKey: null }),
    P(['己', '壬', '丙', '戊'], ['卯', '寅', '午', '戌']), '丙', '寅', W,
  );
  ok('未透干不扣透干被合', !s.deductions.some((d) => d.reason === '透干被合'), s.detail);
}

// ── 三、用神太弱：无本气通根且（被克或 <18%）→ −20 ─────────────
{
  // 戊在申为余气，四支无戊本气；土仅 11%，又被乙木克
  const s = patternScoreOf(
    pat({ name: '食神格', stem: '戊', god: '食神', pos: '余气', usedBy: '会支', exposedKey: null, monthBranch: '申' }),
    P(['乙', '戊', '丁', '辛'], ['卯', '申', '巳', '亥']), '丁', '申', { 木: 3.5, 火: 2, 土: 1, 金: 2, 水: 1.5 },
  );
  ok('用神太弱记入减项', s.deductions.some((d) => d.reason === '用神太弱'), s.detail);
  eq('会支 60 − 太弱 20 = 40', s.score, 40);
}

{
  // 同一颗戊，在戌中有本气通根 → 不判太弱
  const s = patternScoreOf(
    pat({ name: '食神格', stem: '戊', god: '食神', pos: '余气', usedBy: '会支', exposedKey: null, monthBranch: '申' }),
    P(['乙', '戊', '丁', '辛'], ['卯', '申', '戌', '亥']), '丁', '申', { 木: 3.5, 火: 2, 土: 1, 金: 2, 水: 1.5 },
  );
  ok('本气通根可救用神太弱', !s.deductions.some((d) => d.reason === '用神太弱'), s.detail);
}

{
  // 无本气根，但土占 25% 且不被克 → 不判太弱
  const s = patternScoreOf(
    pat({ name: '食神格', stem: '戊', god: '食神', pos: '余气', usedBy: '会支', exposedKey: null, monthBranch: '申' }),
    P(['丙', '戊', '丁', '辛'], ['卯', '申', '巳', '亥']), '丁', '申', { 木: 2, 火: 2, 土: 3, 金: 1.5, 水: 1.5 },
  );
  ok('占比够且不被克时不判太弱', !s.deductions.some((d) => d.reason === '用神太弱'), s.detail);
}

// ── 四、外格不按正八格透干评分 ─────────────────────────────────
{
  for (const name of ['建禄格', '阳刃格', '月刃格', '月劫格']) {
    const s = patternScoreOf(pat({ name }), P(['壬', '甲', '丙', '戊'], ['子', '寅', '午', '戌']), '丙', '寅', W);
    ok(`${name} 标为外格不评分`, s.applicable === false && s.score === null, JSON.stringify(s));
  }
}

// ── 五、接进 analyzeBaziFrame：只加字段，不改原有结论 ───────────
{
  const r = bazi('2018-02-13T10:00');
  const f = r.frame;
  eq('2018 盘主格仍为偏印格', f.primary.name, '偏印格');
  ok('主格带成格分数字', typeof f.primary.score === 'number', String(f.primary.score));
  ok('frame.patternScore 与主格分一致', f.patternScore && f.patternScore.score === f.primary.score, JSON.stringify(f.patternScore));
  eq('2018 盘本气透 70 分', f.patternScore.score, 70);
  eq('2018 盘按课里作成格', f.patternScore.grade, '成格');
  ok('取格依据原文没被评分改写', f.primary.evidence.includes('本气甲') && f.primary.evidence.includes('月干'), f.primary.evidence);

  const r2 = bazi('1990-05-12T14:30');
  eq('1990 盘主格仍为月劫格', r2.frame.primary.name, '月劫格');
  eq('月劫格不评分', r2.frame.patternScore.score, null);
  ok('月劫格主格不硬塞 score', r2.frame.primary.score === undefined, String(r2.frame.primary.score));
}

{
  // 解读侧把评分摊开，且不改「格局依据」里的原判定
  const it = bazi('2018-02-13T10:00', { withInterpret: true }).interpret;
  const sec = (it.sections || []).find((s) => s.key === 'geju');
  ok('解读含成格评分', !!sec && sec.text.includes('成格评分'), sec && sec.text);
  ok('解读写明 70/100', !!sec && sec.text.includes('70/100'), sec && sec.text);
  ok('解读仍保留偏印格依据', !!sec && sec.text.includes('偏印格') && sec.text.includes('本气甲'), sec && sec.text);
}

console.log('\n===== 成格评分 =====');
