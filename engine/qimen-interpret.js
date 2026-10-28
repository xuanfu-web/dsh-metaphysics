// 奇门断语：分层输出「可复算事实 → 传统解释 → 关系 → 条件式倾向」。
// 依据：「宫制其门不为迫，门制其宫门迫凶」——门迫严格限定同一宫内门五行克宫五行，
// 宫克门是「宫制门（制）」，不是门迫。措辞一律条件式，禁止「必成/必败/绝对」。
import { wuxingRelation, gatePalaceRelation } from './qimen.js';

const GATE_MEAN = {
  休门: '休为休息、蓄势，传统上主养精与谈判',
  生门: '生为生发、财源，传统上主求财与谋事',
  伤门: '伤为耗损、冲突，传统上主竞争与损耗',
  杜门: '杜为闭塞、隐藏，传统上主保密与研究',
  景门: '景为文书、声名，传统上主宣传与考试',
  死门: '死为终结、收束，传统上主了断与送旧',
  惊门: '惊为惊动、口舌，传统上主争辩与追讨',
  开门: '开为开张、通达，传统上主上任与开拓',
};
const STAR_MEAN = {
  天蓬: '天蓬主暗昧、胆大', 天任: '天任主厚稳、经营', 天冲: '天冲主快速、行动',
  天辅: '天辅主文教、辅助', 天英: '天英主显扬、热烈', 天芮: '天芮主病患、纠缠',
  天柱: '天柱主口舌、阻隔', 天心: '天心主谋略、医术', 天禽: '天禽主中正、协调', 禽芮: '禽芮主中正兼病气',
};
const GOD_MEAN = {
  值符: '值符为首领，主主导权与贵人', 腾蛇: '腾蛇主虚惊、反复', 太阴: '太阴主暗助、私密',
  六合: '六合主和合、媒介', 白虎: '白虎主刚烈、伤病', 玄武: '玄武主暗昧、失脱',
  九地: '九地主沉稳、守成', 九天: '九天主高远、扬动',
};
const YONG_SHEN = {
  general: { label: '综合', primary: ['开门'], secondary: ['生门'], note: '综合以开、生两门为候选用神' },
  wealth: { label: '财运', primary: ['生门'], secondary: ['开门'], note: '求财以生门为主，开门为辅' },
  career: { label: '事业', primary: ['开门'], secondary: ['值符'], note: '事业以开门为主，值符（主导权）为辅' },
  love: { label: '感情', primary: ['休门'], secondary: ['六合'], note: '感情以休门为主，六合（和合）为辅' },
  study: { label: '学业', primary: ['景门'], secondary: ['天辅'], note: '学业以景门为主，天辅（文教）为辅' },
  health: { label: '健康', primary: ['天芮'], secondary: ['死门'], note: '问病以天芮为主，死门为辅；只作传统取象，不作诊断' },
  travel: { label: '出行', primary: ['九天'], secondary: ['驿马'], note: '出行以九天为主，兼看驿马' },
};

const REL_TEXT = {
  生: '主体力量流向环境或趋势',
  克: '主体对环境或趋势构成压力、有改造意图',
  比和: '两者取向相近、力量相若',
  被生: '环境或趋势为主体提供支持条件',
  被克: '环境或趋势对主体构成约束',
  unknown: '五行缺失，关系未定',
};

const findPalace = (r, key) => r.palaces.find((p) => p.star === key || p.gate === key || p.god === key || p.palace === key) || null;
const cell = (p) => `${p.palace}宫（${p.star}·${p.gate}·${p.god}）`;

export function interpretQimen(r, opts = {}) {
  if (!r || r.system !== 'qimen') return null;
  const dir = YONG_SHEN[opts.direction] ? opts.direction : 'general';
  const ys = YONG_SHEN[dir];
  const sections = [];
  const unresolved = [];

  // ① 事实层（全部可直接复算）
  sections.push({
    key: 'facts',
    label: '排盘事实',
    text: `${r.ju}；节气 ${r.jieqi}（${r.jieqiTime}）；${r.siZhu.year}年 ${r.siZhu.month}月 ${r.siZhu.day}日 ${r.siZhu.time}时；`
      + `值符 ${r.zhiFu.star} 落 ${r.zhiFu.gong} 宫，值使 ${r.zhiShi.gate} 落 ${r.zhiShi.gong} 宫；`
      + `旬首 ${r.xunshou}；空亡 ${r.kongWang.join('') || '—'}；驿马 ${r.ma.zhi || '—'}。`
      + (r.juMethodNote ? `取局口径：${r.juMethodNote}。` : ''),
  });

  // ② 单宫解释
  const zhiFuP = findPalace(r, r.zhiFu.gong);
  const zhiShiP = findPalace(r, r.zhiShi.gong);
  if (zhiFuP) {
    sections.push({
      key: 'zhifu',
      label: '值符落宫（单宫）',
      text: `值符 ${r.zhiFu.star} 在 ${cell(zhiFuP)}。事实：宫属${zhiFuP.palaceElement}，门属${zhiFuP.gateElement || '—'}，星属${zhiFuP.starElement || '—'}。`
        + `传统解释：${STAR_MEAN[zhiFuP.star] || ''}；${GATE_MEAN[zhiFuP.gate] || ''}；${GOD_MEAN[zhiFuP.god] || ''}。`
        + `此宫可读作当下较易发力的位置，但不等于事情即此定向。`,
    });
  }
  if (zhiShiP) {
    sections.push({
      key: 'zhishi',
      label: '值使落宫（单宫）',
      text: `值使 ${r.zhiShi.gate} 在 ${cell(zhiShiP)}。传统解释：${GATE_MEAN[zhiShiP.gate] || ''}。值使所落之宫常被读作事情推进的口子。`,
    });
  }

  // ③ 用神候选
  const yongList = [];
  for (const key of [...ys.primary, ...ys.secondary]) {
    const p = findPalace(r, key);
    if (p) yongList.push({ key, palace: p });
  }
  if (!yongList.length) unresolved.push(`${ys.label}的用神未上盘`);
  if (yongList.length > 1) unresolved.push(`用神有 ${yongList.length} 个候选（${yongList.map((x) => x.key).join('、')}）`);
  sections.push({
    key: 'yongshen',
    label: `用神候选（${ys.label}）`,
    text: `${ys.note}。` + (yongList.length
      ? yongList.map((x) => `${x.key} → ${cell(x.palace)}`).join('；') + '。'
      : '本盘未见对应符号，暂以值符落宫参照，属未决项。'),
  });

  // ④ 两宫关系（用神宫 × 值符宫）
  const primary = yongList[0] || null;
  if (primary && zhiFuP) {
    if (primary.palace.palace === zhiFuP.palace) {
      sections.push({
        key: 'relation',
        label: '用神宫 × 值符宫',
        text: `用神与值符同处 ${zhiFuP.palace} 宫（同宫）——关系并不因此消失，需看该宫门星神与旺衰；`
          + `该宫门宫关系为「${(zhiFuP.gateRelation || gatePalaceRelation(zhiFuP.gate, zhiFuP.palace)).type}」。`,
      });
    } else {
      const rel = wuxingRelation(primary.palace.palaceElement, zhiFuP.palaceElement);
      sections.push({
        key: 'relation',
        label: '用神宫 × 值符宫',
        text: `用神宫（${primary.palace.palace}，${primary.palace.palaceElement}）对值符宫（${zhiFuP.palace}，${zhiFuP.palaceElement}）为「${rel}」：${REL_TEXT[rel] || '关系未定'}。`
          + `这是落宫五行层面的关系；是否占优还要看门、月令与所问之事。`,
      });
    }
  }

  // ⑤ 宫位条件：门迫严格同宫，宫制门单列
  const forced = [];
  const controlled = [];
  for (const p of r.palaces) {
    const rel = p.gateRelation || gatePalaceRelation(p.gate, p.palace);
    if (rel.type === '门迫') forced.push(`${p.palace}宫（${p.gate}${rel.gate}克宫${rel.palace}）`);
    else if (rel.type === '宫制门') controlled.push(`${p.palace}宫（宫${rel.palace}克${p.gate}${rel.gate}）`);
  }
  const kongCells = r.palaces.filter((p) => p.kong).map((p) => `${p.palace}宫`);
  const jiXing = (r.conditions && r.conditions.jiXing) || [];
  const ruMu = (r.conditions && r.conditions.ruMu) || [];
  sections.push({
    key: 'conditions',
    label: '宫位条件',
    text: `门迫（同宫内门克宫）：${forced.length ? forced.join('、') : '本盘无'}；`
      + `宫制门（宫克门，属「制」不为迫）：${controlled.length ? controlled.join('、') : '无'}。`
      + `击刑（天盘六仪落刑宫）：${jiXing.length ? jiXing.map((x) => `${x.palace}宫${x.stem}（${x.basis}）`).join('、') : '本盘无'}；`
      + `入墓（天盘三奇落墓宫）：${ruMu.length ? ruMu.map((x) => `${x.palace}宫${x.stem}（${x.basis}）`).join('、') : '本盘无'}。`
      + (kongCells.length ? `空亡：${kongCells.join('、')}——落空之宫事多不实。` : '无落空之宫。')
      + `这三项都只作宫位条件：门迫、击刑、入墓不自动等同于用神受制，取象时看它们落在哪个符号上。`,
  });

  // ⑥ 条件式倾向
  if (unresolved.length) {
    sections.push({
      key: 'tendency',
      label: '最终倾向',
      text: `暂不给单一倾向。未决项：${unresolved.join('；')}。先把用神定下来，再谈顺逆。`,
    });
  } else {
    const rel = wuxingRelation(primary.palace.palaceElement, zhiFuP.palaceElement);
    const tone = rel === '被生' || rel === '生' ? '偏向顺' : rel === '被克' ? '偏向滞' : '中性';
    sections.push({
      key: 'tendency',
      label: '最终倾向',
      text: `在当前输入、规则集与所问之事下：若以「${primary.key}」为用神，用神宫对值符宫为「${rel}」，整体${tone}；`
        + `若${ys.label}实际取另一个候选，或时间范围不同，解读边界随之变化。未决项：月令旺衰未纳入本规则集。`,
    });
  }

  // ⑦ 复核清单
  sections.push({
    key: 'checklist',
    label: '复核清单',
    text: '建议人工核对：①出生时间与真太阳时是否一致；②取局口径（拆补/置闰/超接）是否与所用流派一致；'
      + '③用神是否取对；④空亡宫是否影响关键符号；⑤若结论与现实直觉冲突，先查输入与规则。',
  });

  return {
    system: 'qimen',
    moduleType: 'divination',
    question: opts.question || '',
    direction: dir,
    sections,
    unresolved,
    ruleset: { juMethod: r.juMethod, schema: 'interpret/2' },
    disclaimer: '奇门属传统术数，用于整理思路与排序选项；不构成对现实的确定性预测，重要决策请以事实与专业意见为准。',
  };
}
