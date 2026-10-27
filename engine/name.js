// 起名：字库五行匹配 + 候选组合（纯本地确定性）。
// 口径：字之五行按通行字义/偏旁归类（自建常用字库，未收录的字如实标注，不猜）；
//       喜用倾向取八字旺衰的简化判定（偏强喜克泄耗、偏弱喜生扶、中和不筛）。
//       不做五格剖象（需康熙字典笔画），也不做音韵格律判断——这两项请在 results.notes 里看提示。
import { buildBazi } from './bazi.js';
import { assertCivil } from './validate.js';

const SHENG = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const KE = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };
const SHENG_BY = { 火: '木', 土: '火', 金: '土', 水: '金', 木: '水' }; // 生我者
const KE_BY = { 土: '木', 水: '土', 火: '水', 金: '火', 木: '金' }; // 克我者
const ALL = ['木', '火', '土', '金', '水'];

/**
 * 自建常用字库：[字, 五行, 释义, 性别倾向('m'|'f'|'n')]
 * 五行按字义与偏旁通行归类；同一字各派归类偶有出入，这里取最常见的一种。
 * 未收录的字在评估时一律标「未收录」，不推断五行。
 */
export const CHAR_LIB = [
  // 木
  ['梓', '木', '梓树，喻成长、手艺与念乡', 'n'], ['桐', '木', '梧桐，高洁、引来凤凰', 'n'],
  ['楠', '木', '楠木，坚韧贵重', 'n'], ['楷', '木', '楷模，端正可法', 'm'],
  ['松', '木', '松柏常青，坚韧长寿', 'm'], ['柏', '木', '柏树，刚直耐寒', 'm'],
  ['枫', '木', '枫叶，热烈与秋意', 'n'], ['榕', '木', '榕树，荫庇包容', 'n'],
  ['槿', '木', '木槿，朝开暮落、坚韧', 'f'], ['棠', '木', '海棠，明媚雅致', 'f'],
  ['楚', '木', '清楚、楚楚有致', 'n'], ['柯', '木', '草木枝干，条理分明', 'm'],
  ['桓', '木', '桓桓武貌，栋梁', 'm'], ['榆', '木', '榆树，安稳敦厚', 'n'],
  ['栩', '木', '栩栩生动', 'n'], ['榛', '木', '榛果，丰实', 'n'],
  ['芸', '木', '芸香，清雅好学', 'f'], ['芷', '木', '白芷，芳洁', 'f'],
  ['芮', '木', '草初生，柔而韧', 'f'], ['若', '木', '若木，从容', 'f'],
  ['茜', '木', '茜草，明丽', 'f'], ['茵', '木', '绿茵，葱茏', 'f'],
  ['茗', '木', '茶芽，清雅', 'f'], ['莎', '木', '莎草，柔韧', 'f'],
  ['茉', '木', '茉莉，素净芬芳', 'f'], ['筱', '木', '小竹，清秀有节', 'f'],
  ['蓉', '木', '芙蓉，明艳', 'f'], ['萱', '木', '萱草，忘忧', 'f'],
  ['蕙', '木', '蕙兰，芳心', 'f'], ['蕊', '木', '花蕊，含秀', 'f'],
  ['菲', '木', '芳菲，繁茂', 'f'], ['蔓', '木', '藤蔓，绵延', 'f'],
  ['荣', '木', '繁荣，荣光', 'm'], ['茂', '木', '茂盛，丰隆', 'm'],
  ['栋', '木', '栋梁', 'm'], ['梁', '木', '桥梁、栋梁', 'm'],
  ['朴', '木', '质朴', 'm'], ['本', '木', '根本', 'm'],
  // 火
  ['炎', '火', '火盛，热烈', 'm'], ['灿', '火', '灿烂', 'n'],
  ['炫', '火', '光彩炫目', 'm'], ['炜', '火', '光明', 'm'],
  ['烨', '火', '火光盛明', 'm'], ['煜', '火', '照耀', 'm'],
  ['熙', '火', '光明和乐', 'n'], ['煊', '火', '温暖显赫', 'm'],
  ['焕', '火', '焕然一新', 'm'], ['熠', '火', '熠熠生辉', 'n'],
  ['炅', '火', '日光', 'n'], ['昱', '火', '日光，明亮', 'm'],
  ['晗', '火', '天将明', 'f'], ['旭', '火', '旭日初升', 'm'],
  ['昊', '火', '广大如天', 'm'], ['晟', '火', '光明兴盛', 'm'],
  ['晨', '火', '清晨', 'n'], ['景', '火', '光景、景仰', 'n'],
  ['曜', '火', '日光照耀', 'm'], ['曦', '火', '晨曦', 'n'],
  ['朗', '火', '明朗', 'm'], ['昭', '火', '昭明', 'n'],
  ['昕', '火', '黎明', 'f'], ['昀', '火', '日光', 'f'],
  ['暖', '火', '温暖', 'f'], ['灵', '火', '灵秀', 'f'],
  ['丹', '火', '赤诚', 'f'], ['彤', '火', '朱红', 'f'],
  ['冉', '火', '冉冉上升', 'f'], ['南', '火', '南方，向阳', 'n'],
  // 土
  ['坤', '土', '大地，厚德', 'm'], ['垚', '土', '山高', 'm'],
  ['培', '土', '培育', 'm'], ['城', '土', '城池，坚固', 'm'],
  ['域', '土', '疆域', 'm'], ['坚', '土', '坚定', 'm'],
  ['墨', '土', '笔墨，文气', 'n'], ['均', '土', '均衡', 'm'],
  ['坦', '土', '坦荡', 'm'], ['基', '土', '根基', 'm'],
  ['堂', '土', '堂堂正正', 'm'], ['圣', '土', '圣明', 'm'],
  ['在', '土', '存在、自在', 'n'], ['岳', '土', '山岳', 'm'],
  ['峰', '土', '山峰', 'm'], ['峻', '土', '高峻', 'm'],
  ['岚', '土', '山间雾气', 'f'], ['岩', '土', '岩石，刚毅', 'm'],
  ['崇', '土', '崇高', 'm'], ['岐', '土', '岐山，分岔有路', 'm'],
  ['屿', '土', '小岛', 'n'], ['磊', '土', '磊落', 'm'],
  ['尧', '土', '古圣王，高远', 'm'], ['圆', '土', '圆满', 'f'],
  ['恩', '土', '恩厚', 'n'], ['惟', '土', '思惟', 'm'],
  // 金
  ['锋', '金', '锋芒', 'm'], ['钢', '金', '刚强', 'm'],
  ['钧', '金', '权衡、钧衡', 'm'], ['铭', '金', '铭记', 'm'],
  ['锐', '金', '锐进', 'm'], ['锡', '金', '赐予', 'm'],
  ['锦', '金', '锦绣', 'n'], ['鑫', '金', '兴盛（三金）', 'm'],
  ['键', '金', '关键、强健', 'm'], ['鉴', '金', '明鉴', 'm'],
  ['钦', '金', '钦敬', 'm'], ['镇', '金', '镇守', 'm'],
  ['铮', '金', '铮铮有声', 'm'], ['钰', '金', '珍宝', 'n'],
  ['铠', '金', '铠甲', 'm'], ['珊', '金', '珊瑚', 'f'],
  ['珠', '金', '明珠', 'f'], ['琳', '金', '美玉', 'f'],
  ['琦', '金', '美玉、奇伟', 'n'], ['琪', '金', '美玉', 'f'],
  ['瑜', '金', '美玉、瑜亮', 'n'], ['瑞', '金', '祥瑞', 'n'],
  ['瑄', '金', '璧玉', 'f'], ['璇', '金', '美玉', 'f'],
  ['璟', '金', '玉光', 'n'], ['璐', '金', '美玉', 'f'],
  ['瑾', '金', '美玉，谨守', 'f'], ['珏', '金', '双玉', 'n'],
  ['环', '金', '圆环，周全', 'f'], ['玲', '金', '玲珑', 'f'],
  ['珑', '金', '玲珑', 'f'], ['瑶', '金', '瑶华', 'f'],
  ['莹', '金', '晶莹', 'f'], ['铎', '金', '铃铎，传声', 'm'],
  // 水
  ['江', '水', '江河，开阔', 'm'], ['河', '水', '河流', 'm'],
  ['海', '水', '海纳百川', 'm'], ['洋', '水', '海洋，宽广', 'n'],
  ['波', '水', '波澜', 'm'], ['涛', '水', '波涛', 'm'],
  ['涵', '水', '包涵、涵养', 'f'], ['清', '水', '清澈', 'n'],
  ['澈', '水', '澄澈', 'm'], ['澄', '水', '澄明', 'n'],
  ['润', '水', '温润', 'm'], ['泽', '水', '恩泽', 'm'],
  ['沛', '水', '充沛', 'm'], ['沁', '水', '沁润', 'f'],
  ['泓', '水', '水深而广', 'm'], ['泉', '水', '源泉', 'n'],
  ['汐', '水', '潮汐', 'f'], ['淇', '水', '淇水', 'f'],
  ['鸿', '水', '鸿鹄、宏大', 'm'], ['滋', '水', '滋润', 'n'],
  ['淼', '水', '水势浩渺', 'n'], ['雨', '水', '甘霖', 'n'],
  ['雪', '水', '洁白', 'f'], ['霖', '水', '甘霖', 'm'],
  ['霏', '水', '雨雪纷飞', 'f'], ['露', '水', '露华', 'f'],
  ['霆', '水', '雷霆', 'm'], ['雯', '水', '云纹', 'f'],
  ['霓', '水', '虹霓', 'f'], ['湉', '水', '水流平缓', 'f'],
  // 常用名用字补录
  ['沐', '水', '沐浴，受润泽', 'n'], ['宸', '木', '屋宇、北极星所居，喻尊贵', 'm'],
  ['轩', '土', '高轩，气宇轩昂', 'm'], ['逸', '土', '安逸、超逸', 'm'],
  ['然', '火', '自然、坦然', 'n'], ['承', '金', '承继担当', 'm'],
  ['语', '木', '言语，温言', 'f'], ['诺', '火', '诺言，信守', 'n'],
  ['诗', '金', '诗书，文气', 'f'], ['梦', '木', '梦想', 'f'],
  ['思', '金', '思虑，才思', 'n'], ['悦', '金', '喜悦', 'f'],
  ['欣', '木', '欢欣', 'f'], ['嘉', '木', '嘉美', 'n'],
  ['佳', '木', '佳好', 'f'], ['博', '水', '博学', 'm'],
  ['文', '水', '文采', 'n'], ['睿', '金', '睿智', 'm'],
  ['宇', '土', '器宇、宇宙', 'm'], ['亦', '土', '也，从容', 'n'],
  ['知', '火', '知晓，明理', 'n'], ['星', '火', '星辰', 'n'],
  ['月', '木', '明月', 'f'], ['言', '木', '言语，信', 'n'],
  ['和', '水', '和顺', 'n'], ['安', '土', '安宁', 'n'],
  ['宁', '火', '安宁', 'f'],
];

const EL_INDEX = new Map();
for (const c of CHAR_LIB) {
  if (!EL_INDEX.has(c[0])) EL_INDEX.set(c[0], { c: c[0], el: c[1], meaning: c[2], g: c[3], order: EL_INDEX.size });
}

const KIND_LABEL = { m: '男', f: '女', n: '中' };

/** 喜用五行（简化判定：旺衰 + 生克泄耗）。 */
export function favorableElements(strength) {
  const level = strength && strength.level ? strength.level : null;
  const dayEl = strength && strength.dayElement ? strength.dayElement : null;
  if (!dayEl || !level) return { list: ALL.slice(), basis: '未取得旺衰：不筛五行，只做用字与字义建议' };
  if (level === '身强' || level === '偏强') {
    return {
      list: [KE_BY[dayEl], SHENG[dayEl], KE[dayEl]].filter(Boolean),
      basis: `${level}（${dayEl}）：宜克、泄、耗——用${KE_BY[dayEl]}（克我）、${SHENG[dayEl]}（我生）、${KE[dayEl]}（我克）`,
    };
  }
  if (level === '身弱' || level === '偏弱') {
    return {
      list: [dayEl, SHENG_BY[dayEl]].filter(Boolean),
      basis: `${level}（${dayEl}）：宜生、扶——用${dayEl}（同我）、${SHENG_BY[dayEl]}（生我）`,
    };
  }
  return { list: ALL.slice(), basis: `${level}：中和不偏，五行皆可用，以字义与音形为先` };
}

function charInfo(ch) {
  return EL_INDEX.get(ch) || null;
}

/** 评估一个名字（姓 + 名 1–2 字）。给了生辰才做喜用匹配。 */
export function assessName(input) {
  const surname = String(input.surname || '').trim();
  if (!surname) throw new Error('缺少姓氏：请给 surname（如「李」）');
  const given = String(input.givenName || '').trim();
  if (!given) throw new Error('缺少名字：请给 givenName（1–2 个汉字，如「沐宸」）');
  if ([...given].length > 2) throw new Error('名请给 1–2 个汉字；复姓请把复姓整体写在 surname，名只留 1–2 字');

  let favorable = { list: [], basis: '' };
  let strength = null;
  let baziNote = null;
  const hasBirth = Number.isInteger(input.year) && Number.isInteger(input.month) && Number.isInteger(input.day);
  if (hasBirth) {
    assertCivil(input, 'birth');
    const r = buildBazi({
      year: input.year, month: input.month, day: input.day,
      hour: Number.isInteger(input.hour) ? input.hour : 12,
      minute: Number.isInteger(input.minute) ? input.minute : 0,
      gender: input.gender || 'male',
      lateZi: input.lateZi !== false,
      trueSolar: input.trueSolar !== false,
      dst: input.dst !== false,
      longitude: input.longitude, address: input.address, geo: input.geo,
    });
    strength = { level: r.strength.level, score: r.strength.score, dayElement: r.pillars.day.stemElement };
    favorable = favorableElements(strength);
    baziNote = { dayMaster: r.dayMaster, solarNote: r.solarTime ? r.solarTime.note : '' };
  }

  const chars = [...given].map((ch) => {
    const info = charInfo(ch);
    const inFav = info ? favorable.list.includes(info.el) : null;
    return {
      char: ch,
      element: info ? info.el : '未收录',
      meaning: info ? info.meaning : '字库未收录，未推断五行',
      genderHint: info ? KIND_LABEL[info.g] : null,
      favorable: inFav,
    };
  });
  const known = chars.filter((c) => c.element !== '未收录').length;
  const favCount = chars.filter((c) => c.favorable === true).length;
  let verdict;
  if (!hasBirth) verdict = '只做了字义与五行归类；给出生年月日才能判断用字是否合喜用。';
  else if (favCount === chars.length && chars.length > 0) verdict = `用字都落在喜用（${favorable.list.join('、')}）上，与命局方向一致。`;
  else if (favCount > 0) verdict = `部分用字合喜用（${favCount}/${chars.length}），其余可再斟酌；喜用为 ${favorable.list.join('、')}。`;
  else verdict = `用字未落在喜用（${favorable.list.join('、')}）上；不必然是坏名，但若想贴合命局可换字再看。`;

  return {
    system: 'name',
    action: 'assess',
    surname,
    givenName: given,
    fullName: surname + given,
    ...(hasBirth ? {
      bazi: {
        ...baziNote,
        strength,
        favorable: favorable.list,
        basis: favorable.basis,
      },
    } : {}),
    chars,
    stats: { chars: chars.length, known, favorableCount: favCount },
    verdict,
    notes: [
      '字之五行按通行字义/偏旁归类，自建字库有限：未收录的字不猜五行，如实标注。',
      '不做五格剖象（需康熙字典笔画），也不做音韵格律判断——谐音、拗口请自己读三遍或用方言读一遍。',
      '起名只做用字参考，不替父母做决定。',
    ],
  };
}

/**
 * 生成候选名：姓 + 两字（或单字），优先落在喜用五行上。
 * limit 1–20；同一字不重复；候选按「合喜用数 → 简洁 → 字库序」确定性排序。
 */
export function generateNames(input) {
  const surname = String(input.surname || '').trim();
  if (!surname) throw new Error('缺少姓氏：请给 surname（如「李」）');
  if (!Number.isInteger(input.year) || !Number.isInteger(input.month) || !Number.isInteger(input.day)) {
    throw new Error('生成候选名需要完整出生年月日（公历）：不给生辰无法判断喜用五行');
  }
  assertCivil(input, 'birth');
  const gender = input.gender === 'female' ? 'female' : 'male';
  const limit = Math.max(1, Math.min(20, Number.isInteger(input.limit) ? input.limit : 10));
  const r = buildBazi({
    year: input.year, month: input.month, day: input.day,
    hour: Number.isInteger(input.hour) ? input.hour : 12,
    minute: Number.isInteger(input.minute) ? input.minute : 0,
    gender,
    lateZi: input.lateZi !== false,
    trueSolar: input.trueSolar !== false,
    dst: input.dst !== false,
    longitude: input.longitude, address: input.address, geo: input.geo,
  });
  const strength = { level: r.strength.level, score: r.strength.score, dayElement: r.pillars.day.stemElement };
  const fav = favorableElements(strength);
  const pool = CHAR_LIB.filter((c) => fav.list.includes(c[1]) && c[0] !== surname);
  const gPref = gender === 'male' ? 'm' : 'f';
  const scored = [];
  for (let i = 0; i < pool.length; i++) {
    for (let j = 0; j < pool.length; j++) {
      if (i === j) continue;
      const a = pool[i];
      const b = pool[j];
      // 性别倾向：优先本性别与中性，避免两个字都强烈偏另一性别
      const fit = (x) => (x[3] === gPref || x[3] === 'n' ? 1 : 0);
      const gScore = fit(a) + fit(b) - (a[3] !== gPref && a[3] !== 'n' && b[3] !== gPref && b[3] !== 'n' ? 2 : 0);
      scored.push({
        name: a[0] + b[0],
        chars: [
          { char: a[0], element: a[1], meaning: a[2] },
          { char: b[0], element: b[1], meaning: b[2] },
        ],
        elements: [a[1], b[1]],
        allFavorable: fav.list.includes(a[1]) && fav.list.includes(b[1]),
        genderScore: gScore,
        order: i * 1000 + j,
      });
    }
  }
  scored.sort((x, y) => (y.allFavorable - x.allFavorable) || (y.genderScore - x.genderScore) || (x.order - y.order));
  const out = [];
  const used = new Set();
  for (const cand of scored) {
    if (out.length >= limit) break;
    const key = [...cand.name].sort().join('');
    if (used.has(key)) continue;
    used.add(key);
    out.push({ rank: out.length + 1, name: surname + cand.name, given: cand.name, chars: cand.chars });
  }
  return {
    system: 'name',
    action: 'generate',
    surname,
    gender: gender === 'male' ? '男' : '女',
    bazi: { dayMaster: r.dayMaster, strength, favorable: fav.list, basis: fav.basis },
    candidates: out,
    notes: [
      `字库共 ${CHAR_LIB.length} 字，只在喜用五行（${fav.list.join('、')}）里选字；未覆盖的生僻好字可手工评估。`,
      '候选按合喜用与性别倾向确定性排序，不是「吉名」判定；音韵与方言谐音请自行读念检查。',
      '不做五格剖象（需康熙字典笔画）。',
    ],
  };
}

/** 主函数：action='assess'（默认）或 'generate'。 */
export function buildName(input) {
  if (input.action === 'generate') return generateNames(input);
  return assessName(input);
}
