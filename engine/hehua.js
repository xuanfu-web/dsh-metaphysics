// 天干五合的「合化」判定。
//
// bazi.js 的 buildRelations 在干支关系层只写「有合、化某待定」——那一层不该断言化与不化。
// 是否真化要过问真《基础知识·干支中》给的四条件：
//   ① 天干紧挨（隔一位＝隔合、隔两位＝遥合，都不化；争合、妒合一律不化）
//   ② 被化天干（阴干一侧）在天干上无同类（比劫）帮扶
//   ③ 月令有引化物（月支五行或月支本气＝化神五行）
//   ④ 引化物不被克（克化神之五行不现于月干、日干，月支本气也不是它）
//
// 判完只作只读标注：不改旺衰分、不改五行权重、不改喜忌、不改 relations.stems 的文案。
// 反化（甲己化木、乙庚化木、丙辛化火或金、丁壬化火或水、戊癸化土或水）诸家分歧大，本插件不做。

const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const STEM_ELEMENT = {
  甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土', 己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水',
};
const BRANCH_ELEMENT = {
  子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火',
  午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水',
};
const OVERCOMES = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };
const HIDDEN = {
  子: ['癸'], 丑: ['己', '癸', '辛'], 寅: ['甲', '丙', '戊'], 卯: ['乙'],
  辰: ['戊', '乙', '癸'], 巳: ['丙', '庚', '戊'], 午: ['丁', '己'], 未: ['己', '丁', '乙'],
  申: ['庚', '壬', '戊'], 酉: ['辛'], 戌: ['戊', '辛', '丁'], 亥: ['壬', '甲'],
};
const STEM_HE = { 甲己: '土', 乙庚: '金', 丙辛: '水', 丁壬: '木', 戊癸: '火' };
const KEYS = ['year', 'month', 'day', 'hour'];
const LABEL = { year: '年', month: '月', day: '日', hour: '时' };

const METHOD = '问真《基础知识·干支中》：五合是否真化看四条件——天干紧挨、被化天干无同类帮扶、'
  + '月令有引化物、引化物不被克；隔合、遥合、争合、妒合一律不化';
const BOUNDARY = '只作只读标注：不改旺衰分、不改五行权重、不改喜忌。'
  + '争合＝两阳干争一阴干，妒合＝两阴干争一阳干，问真说这两者「实际指的就是合绊」，故判不化。';

const isYangStem = (stem) => STEMS.indexOf(stem) % 2 === 0;
const heOf = (a, b) => STEM_HE[a + b] || STEM_HE[b + a] || null;
const elOf = (stem) => STEM_ELEMENT[stem] || '';
/** 克某五行的那一行 */
const keOf = (element) => Object.keys(OVERCOMES).find((el) => OVERCOMES[el] === element) || '';
/** 月支本气所属五行 */
const mainElOf = (branch) => elOf((HIDDEN[branch] || [])[0] || '');

/**
 * 判四柱天干的五合化与不化。
 * @param {object} pillars 四柱（bazi.js 的 pillar 对象；用到 stem 与 branch）
 * @param {string} monthBranch 月支（省略时取 pillars.month.branch）
 * @param {string} dayStem 日干（省略时取 pillars.day.stem）
 * @param {string[]} keys 参与判定的柱；时辰未知时传 ['year','month','day']
 */
export function judgeHehua(pillars, monthBranch, dayStem, keys = KEYS) {
  const slots = (Array.isArray(keys) ? keys : KEYS)
    .filter((k) => pillars && pillars[k] && pillars[k].stem && pillars[k].branch)
    .map((k) => ({ key: k, label: LABEL[k] || k, stem: pillars[k].stem, branch: pillars[k].branch }));
  const mb = monthBranch || (pillars && pillars.month && pillars.month.branch) || '';
  const ds = dayStem || (pillars && pillars.day && pillars.day.stem) || '';

  const notes = [
    '反化（甲己化木、乙庚化木、丙辛化火或金、丁壬化火或水、戊癸化土或水）是近代易人的演绎，诸家分歧大，本插件不做。',
    '日元参与合化时，即使化成功仍以原五行论：问真说「五行的本质属性不会转变，只不过表现形式可能会发生变化」。',
    '天干五合未必以日元为主——年月干合化成功同样算数（问真所举己酉造就是年月干合）。',
  ];

  if (slots.length < 2) {
    return {
      items: [], transformed: [], text: '天干不足两柱，五合无从判起。', method: METHOD, boundary: BOUNDARY, notes,
    };
  }

  const monthEl = BRANCH_ELEMENT[mb] || '';
  const monthMain = mainElOf(mb);
  const items = [];

  for (let i = 0; i < slots.length; i++) {
    for (let j = i + 1; j < slots.length; j++) {
      const a = slots[i];
      const b = slots[j];
      if (a.stem === b.stem) continue;
      const hua = heOf(a.stem, b.stem);
      if (!hua) continue;

      const gap = j - i - 1;
      const closeness = gap === 0 ? '紧挨' : gap === 1 ? '隔合' : '遥合';
      const yin = isYangStem(a.stem) ? b : a;
      const yang = isYangStem(a.stem) ? a : b;
      const others = slots.filter((s) => s !== a && s !== b);

      // 争合 / 妒合：第三干与这一对里的某一干另成五合
      let conflict = null;
      let conflictStem = '';
      for (const s of others) {
        if (!heOf(s.stem, a.stem) && !heOf(s.stem, b.stem)) continue;
        conflict = isYangStem(s.stem) ? '争合' : '妒合';
        conflictStem = s.stem;
        break;
      }

      // ② 被化天干（阴干一侧）无同类帮扶。
      // 只算「同类（比劫）」，不算印：问真的唯一完整例「己酉 甲戌 壬戌 丁未」里，
      // 被化的己土有丁火为印（火生土）却仍判化成功——把印计进生扶会与它自己的例子冲突。
      const sameKind = others.filter((s) => elOf(s.stem) === elOf(yin.stem));

      // ④ 引化物不被克：问真原文点明「月干/日干透出」与「月支本气」两处。
      const keEl = keOf(hua);
      const keMajor = others.filter((s) => elOf(s.stem) === keEl && (s.key === 'month' || s.key === 'day'));
      const keMinor = others.filter((s) => elOf(s.stem) === keEl && s.key !== 'month' && s.key !== 'day');
      const keMonth = !!keEl && monthMain === keEl;

      const conditions = {
        adjacent: gap === 0,
        noConflict: !conflict,
        unrescued: sameKind.length === 0,
        monthLead: (monthEl && monthEl === hua) || (monthMain && monthMain === hua) || false,
        leadUnchecked: keMajor.length === 0 && !keMonth,
      };
      const ok = conditions.adjacent && conditions.noConflict && conditions.unrescued
        && conditions.monthLead && conditions.leadUnchecked;

      const missing = [];
      if (!conditions.adjacent) missing.push(closeness === '隔合' ? '相隔一位（隔合）' : '相隔两位（遥合）');
      if (!conditions.noConflict) {
        missing.push(`${conflict}（另有${conflictStem}与${conflict === '争合' ? '同一阴干' : '同一阳干'}成合）`);
      }
      if (!conditions.unrescued) missing.push(`被化干${yin.stem}在天干有同类${sameKind.map((s) => s.stem).join('、')}帮扶`);
      if (!conditions.monthLead) missing.push(`月令${mb}（${monthEl || '—'}）不是化神${hua}`);
      if (!conditions.leadUnchecked) {
        const who = [
          ...keMajor.map((s) => `${s.stem}（${s.label}干）`),
          keMonth ? `月支${mb}本气${keEl}` : '',
        ].filter(Boolean);
        missing.push(`引化物${hua}被${keEl}克：${who.join('、')}`);
      }

      const status = ok ? '化成功'
        : !conditions.adjacent ? `${closeness}不化`
          : !conditions.noConflict ? `${conflict}不化`
            : '合绊不化';

      const pair = `${a.stem}${b.stem}`;
      const positionText = `${a.label}干${a.stem}与${b.label}干${b.stem}`;
      const leadText = monthEl === monthMain || !monthMain
        ? `月令${mb}为${monthEl}`
        : `月令${mb}为${monthEl}、本气${monthMain}`;
      const evidence = ok
        ? `${positionText}紧挨，成${pair}合化${hua}；${leadText}，正好引化；`
          + `被化干${yin.stem}${elOf(yin.stem)}在天干无同类帮扶；克${hua}的${keEl}不在月干与日干，月支本气也不是它。`
        : `${positionText}成${pair}合，但${missing.join('；')}，只作合绊，不论化。`;

      items.push({
        pair,
        huaElement: hua,
        positions: `${a.key}-${b.key}`,
        positionText,
        closeness,
        distance: gap,
        yinStem: yin.stem,
        yangStem: yang.stem,
        conflict,
        conflictStem: conflictStem || null,
        conditions,
        status,
        ok,
        dayMasterInvolved: !!ds && (a.stem === ds || b.stem === ds),
        evidence,
      });
    }
  }

  const transformed = items.filter((x) => x.ok).map((x) => `${x.pair}化${x.huaElement}`);
  const lines = items.map((x) => `【${x.status}】${x.evidence}`);
  if (items.some((x) => x.ok && x.dayMasterInvolved)) {
    lines.push('日元参与的那一组即使化成功，五行属性仍按原干论，只表现形式变。');
  }
  // 克化神之五行只在年干/时干出现时不挡化，但要写明——离得远，力道打折
  for (const x of items) {
    if (!x.ok) continue;
    const keEl = keOf(x.huaElement);
    const far = slots.filter((s) => elOf(s.stem) === keEl && x.positions.split('-').indexOf(s.key) < 0
      && s.key !== 'month' && s.key !== 'day');
    if (far.length) lines.push(`${x.pair}化${x.huaElement}：克化神的${keEl}只在${far.map((s) => `${s.label}干`).join('、')}，被化神隔开，不挡化。`);
  }
  const text = items.length ? lines.join('\n') : '四柱天干未见五合。';

  return { items, transformed, text, method: METHOD, boundary: BOUNDARY, notes };
}
