// 八字 × 紫微 交叉验证：两套体系各自看同一件事，把「同向 / 有张力 / 只有一边有信号」摆在一起。
//
// 注意口径：这不是数学意义上的「一致性检验」，两套体系的取象单位不同（十神 vs 星曜宫位）。
// 这里只做三件事：把两边对同一维度的说法并列、标出方向、注明各自的依据。
import { ZIWEI_STARS } from './interpret-data.js';

const groupsOf = (bazi) => (bazi && bazi.frame && bazi.frame.godStats && bazi.frame.godStats.groups) || {};
const topOf = (groups) => Object.entries(groups).sort((a, b) => Number(b[1]) - Number(a[1]))[0] || null;
const zwPalace = (zw, name) => (zw.palaces || []).find((p) => p.palace === name) || null;
const zwMain = (p) => (p && p.stars ? p.stars.filter((s) => s.type === '主星').map((s) => s.name) : []);
const countSha = (p) => (p && p.stars ? p.stars.filter((s) => s.type === '煞星').length : 0);
const tierOf = (bazi) => {
  const age = Number(bazi.liunian && bazi.liunian[0] ? bazi.liunian[0].age : NaN);
  const list = (bazi.dayun && bazi.dayun.list) || [];
  let cur = null;
  for (const d of list) if (Number.isFinite(age) && Number(d.startAge) <= age) cur = d;
  return cur ? (cur.luck && cur.luck.tier) || '平' : '—';
};
const daxianOf = (zw) => {
  const age = Number(zw.liunian && zw.liunian[0] ? zw.liunian[0].age : NaN);
  for (const p of zw.palaces || []) {
    const d = p.daxian || {};
    if (Number.isFinite(age) && Number(d.start) <= age && age <= Number(d.end)) return p;
  }
  return null;
};

/**
 * @param {object} bazi buildBazi 的结果
 * @param {object} zw buildZiwei 的结果
 * @returns {{items: Array<{key:string,label:string,bazi:string,ziwei:string,stance:string,note:string}>}}
 */
export function crossCheck(bazi, zw) {
  const groups = groupsOf(bazi);
  const top = topOf(groups);
  const items = [];
  const push = (key, label, baziText, ziweiText, stance, note) => items.push({ key, label, bazi: baziText, ziwei: ziweiText, stance, note });

  // ① 事业：八字看十神里的官杀/食伤，紫微看官禄宫主星
  {
    const career = zwPalace(zw, '官禄');
    const main = zwMain(career);
    const baziStrong = Number(groups['官杀'] || 0) + Number(groups['食伤'] || 0) >= 2;
    const ziweiHas = main.length > 0;
    const stance = baziStrong && ziweiHas ? '同向' : !baziStrong && !ziweiHas ? '同向' : '有张力';
    push('career', '事业主线',
      `${top ? `十神以${top[0]}最重（${top[1]}）` : '十神未取到'}；官杀+食伤权重 ${(Number(groups['官杀'] || 0) + Number(groups['食伤'] || 0)).toFixed(1)}`,
      main.length ? `官禄宫主星 ${main.join('、')}${ZIWEI_STARS[main[0]] ? `（${ZIWEI_STARS[main[0]].work}）` : ''}` : '官禄无正曜',
      stance,
      stance === '同向' ? '两边都指向（或都不强调）事业主线，方向可互参' : '一边强调事业主线、一边信号弱，建议以信号强的一边为主，另一边作补充');
  }

  // ② 财富：八字看财星权重，紫微看财帛宫主星与煞星
  {
    const wealth = zwPalace(zw, '财帛');
    const main = zwMain(wealth);
    const sha = countSha(wealth);
    const w = Number(groups['财'] || 0);
    const baziStrong = w >= 2;
    const ziweiStrong = main.length > 0;
    const stance = baziStrong && ziweiStrong ? '同向' : !baziStrong && !ziweiStrong ? '同向' : '有张力';
    push('wealth', '财运结构',
      `财星权重 ${w}${baziStrong ? '（偏强）' : '（偏弱）'}`,
      `${main.length ? `财帛主星 ${main.join('、')}` : '财帛无正曜'}${sha ? `；煞星 ${sha} 颗` : ''}`,
      stance,
      '两套体系对「财」的定义不同：八字看十神财星，紫微看财帛宫，只作对照，不作数值合并');
  }

  // ③ 感情：八字看配偶星，紫微看夫妻宫主星
  {
    const spouse = zwPalace(zw, '夫妻');
    const main = zwMain(spouse);
    const isMale = bazi.input && bazi.input.gender === 'male';
    const key = isMale ? '财' : '官杀';
    const v = Number(groups[key] || 0);
    const baziStrong = v >= 2;
    const ziweiStrong = main.length > 0;
    const stance = baziStrong && ziweiStrong ? '同向' : !baziStrong && !ziweiStrong ? '同向' : '有张力';
    push('love', '感情线索',
      `${isMale ? '妻' : '夫'}星（${key}）权重 ${v}${baziStrong ? '（不弱）' : '（偏弱）'}`,
      main.length ? `夫妻宫主星 ${main.join('、')}${ZIWEI_STARS[main[0]] ? `（${ZIWEI_STARS[main[0]].love}）` : ''}` : '夫妻宫无正曜',
      stance,
      stance === '同向' ? '两边对感情的强弱判断接近' : '一边说缘分不弱、一边主星信号弱，宜按「多主动创造场景」处理');
  }

  // ④ 身体：八字看最弱五行，紫微看疾厄宫主星与煞星
  {
    const wx = bazi.wuxing || {};
    const weakest = Object.entries(wx).sort((a, b) => Number(a[1]) - Number(b[1]))[0];
    const health = zwPalace(zw, '疾厄');
    const main = zwMain(health);
    const sha = countSha(health);
    push('health', '身体关注点',
      weakest ? `最弱五行 ${weakest[0]}（${weakest[1]}）` : '五行未取到',
      `${main.length ? `疾厄主星 ${main.join('、')}` : '疾厄无正曜'}${sha ? `；煞星 ${sha} 颗` : ''}`,
      '互补',
      '两边指向的器官/系统不一定相同，合并起来看更稳；任何健康问题以体检与医生为准');
  }

  // ⑤ 节奏：八字当前大运档位 vs 紫微当前大限的煞星密度
  {
    const t = tierOf(bazi);
    const d = daxianOf(zw);
    const sha = d ? countSha(d) : 0;
    const good = ['吉', '大吉'];
    const bad = ['忌', '大忌'];
    const baziGood = good.includes(t);
    const baziBad = bad.includes(t);
    const baziKnown = t !== '—';
    const ziweiHeavy = sha >= 2;
    const ziweiKnown = !!d;
    let stance = '有张力';
    let note = '';
    if (!baziKnown || !ziweiKnown) {
      // 一边没取到就谈不上「同向 / 有张力」——只并列现有的一侧，并写清缺的是哪边
      stance = '互补';
      const missing = !baziKnown && !ziweiKnown
        ? '八字当前大运与紫微当前大限都没取到'
        : !baziKnown
          ? `八字当前大运未取到（${t}），只有紫微一侧可参考`
          : '紫微当前大限未取到，只有八字一侧可参考';
      note = `${missing}：这一项只作提醒，不下两边对照的结论`;
    } else if (baziGood && ziweiHeavy) {
      note = '八字这边顺、紫微大限煞星偏多：大方向可参考八字，具体动作按紫微标出的位置收一收';
    } else if (baziBad && !ziweiHeavy) {
      note = '八字这边偏紧、紫微大限没见到明显煞星：先按八字收着走，紫微一侧的平静不等于没有压力';
    } else if (!baziGood && !baziBad && ziweiHeavy) {
      note = '八字大运为平、紫微大限煞星偏多：只把紫微这一侧当作提醒，不据此判断阶段好坏';
    } else {
      stance = '同向';
      note = '两边对当前阶段的松紧判断接近';
    }
    push('rhythm', '当前节奏',
      `大运档位 ${t}`,
      d ? `大限在${d.palace}${sha ? `；煞星 ${sha} 颗` : '；无煞星'}` : '大限未取到',
      stance, note);
  }

  return { items };
}

export default crossCheck;

/** 把交叉验证结果拼成可读文本（interpret 的分节与工具输出共用） */
export function crossText(cross) {
  if (!cross || !Array.isArray(cross.items)) return '';
  return cross.items
    .map((i) => `· ${i.label}：八字——${i.bazi}；紫微——${i.ziwei}；判断：${i.stance}（${i.note}）`)
    .join('\n');
}

/**
 * 交叉验证分节。文本给 Markdown/工具输出，items 给面板画对照卡——
 * 同一份数据两个去处，免得面板再去拆文本。
 */
export function crossSection(cross) {
  const items = cross && Array.isArray(cross.items) ? cross.items : [];
  return { key: 'crossSystem', label: '八字 × 紫微 交叉验证', text: crossText(cross), items };
}
