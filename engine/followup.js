// 追问：围绕已经算好的一盘，回答「某一年 / 某个方面」的具体问题。
//
// 约束：这里不重新排盘、不调用模型、不引入新算法——只从盘面已有字段里取数，
// 并明确写出「依据的是哪一条」。找不到就直说找不到，并给出可问的范围。
import { ZIWEI_STARS } from './interpret-data.js';

const TOPICS = [
  { key: 'career', label: '事业', words: ['事业', '工作', '跳槽', '升职', '创业', '职业', '岗位', '离职', '加薪', '面试', 'offer'] },
  { key: 'wealth', label: '财富', words: ['财', '钱', '收入', '投资', '买房', '存款', '亏', '赚', '分红'] },
  { key: 'love', label: '感情', words: ['感情', '婚', '恋', '对象', '分手', '复合', '姻缘', '结婚', '桃花'] },
  { key: 'health', label: '健康', words: ['健康', '病', '身体', '手术', '失眠', '体检', '医院'] },
  { key: 'study', label: '学业', words: ['学业', '考试', '学习', '考研', '考公', '证书', '升学'] },
  { key: 'travel', label: '出行', words: ['出行', '搬家', '旅行', '出国', '迁', '远行'] },
];

const ZW_PALACE_BY_TOPIC = { career: '官禄', wealth: '财帛', love: '夫妻', health: '疾厄', study: '官禄', travel: '迁移', overall: '命宫' };

const parseYear = (q, r) => {
  const m = String(q).match(/(20\d{2})\s*年?/);
  if (m) return Number(m[1]);
  const base = Array.isArray(r.liunian) && r.liunian[0] ? Number(r.liunian[0].year) : null;
  if (!base) return null;
  if (/明年/.test(q)) return base + 1;
  if (/后年/.test(q)) return base + 2;
  if (/去年/.test(q)) return base - 1;
  if (/今年|本年/.test(q)) return base;
  return null;
};

const topicOf = (q) => TOPICS.find((t) => t.words.some((w) => String(q).includes(w))) || null;

function baziAnswer(r, q) {
  const year = parseYear(q, r);
  const topic = topicOf(q);
  const liunian = Array.isArray(r.liunian) ? r.liunian : [];
  const dayun = Array.isArray(r.dayun?.list) ? r.dayun.list : [];
  const years = liunian.map((l) => l.year);
  if (year && !liunian.some((l) => Number(l.year) === year)) {
    return {
      ok: false, year, topic,
      answer: `这一盘已排的流年范围是 ${years[0]}–${years[years.length - 1]}，没有 ${year} 年。可以把问题改到范围内，或用 asOf 指定你想看的年份重新排盘。`,
      evidence: [`已排流年：${years.join('、')}`], confidence: '弱',
    };
  }
  if (year) {
    const l = liunian.find((x) => Number(x.year) === year);
    const d = dayun.find((x) => Number(x.startAge) <= Number(l.age) && Number(l.age) <= Number(x.startAge) + 9) || null;
    const tier = l.luck?.tier || '平';
    const reasons = (l.luck?.reasons || []).slice(0, 3);
    const rel = (l.relations || []).join('、');
    const topicLine = topic ? topicSentence(r, topic.key) : '';
    return {
      ok: true, year, topic,
      answer: `${year} 年（${l.ganzhi}）流年，十神为${l.stemTenGod || '—'}，档位「${tier}」；所行大运 ${d ? `${d.ganzhi}（${d.luck?.tier || '平'}）` : '未取到'}。` +
        `${reasons.length ? `理由：${reasons.join('，')}。` : ''}${rel ? `与该年地支相关的原局关系：${rel}。` : ''}${topicLine}`,
      evidence: [
        `流年 ${l.year} ${l.ganzhi}·${l.stemTenGod || ''}·${tier}`,
        d ? `大运 ${d.ganzhi}·${d.luck?.tier || '平'}` : '',
        rel ? `原局关系 ${rel}` : '',
        topic ? `问题方向：${topic.label}` : '',
      ].filter(Boolean),
      confidence: d && reasons.length ? '强' : '中',
    };
  }
  if (topic) {
    // 维度只有「整体/工作/事业/感情/健康」，财富与学业、出行没有独立维度：
    // 就近取一条最相关的维度，再补一句该方面的盘面值，避免答非所问。
    const near = { wealth: 'overall', study: 'work', travel: 'overall' }[topic.key] || topic.key;
    const dim = (r.interpret?.dimensions || []).find((x) => x.key === topic.key || x.key === near);
    if (dim) {
      const groups = (r.frame && r.frame.godStats && r.frame.godStats.groups) || {};
      const quant = topic.key === 'wealth'
        ? ` 财星权重 ${Number(groups['财'] || 0)}（只作结构参考，不含金额）。`
        : '';
      return {
        ok: true, year: null, topic,
        answer: `按${topic.label}这条线看：${dim.text}${quant}${dim.advice ? ` 建议：${dim.advice}` : ''}`,
        evidence: (dim.evidence || []).slice(0, 4), confidence: dim.confidence || '中',
      };
    }
  }
  return {
    ok: false, year: null, topic,
    answer: `这个问题里没有识别到具体的年份或方面。可以这样问：「2027 年事业怎么样」「财运如何」「感情在 2028 年」；已排流年是 ${years[0]}–${years[years.length - 1]}。`,
    evidence: [`可问年份：${years.join('、')}`], confidence: '弱',
  };
}

function ziweiAnswer(r, q) {
  const year = parseYear(q, r);
  const topic = topicOf(q);
  const liunian = Array.isArray(r.liunian) ? r.liunian : [];
  if (year && !liunian.some((l) => Number(l.year) === year)) {
    return {
      ok: false, year, topic,
      answer: `这一盘的流年表覆盖 ${liunian[0]?.year}–${liunian[liunian.length - 1]?.year}，没有 ${year} 年；可以换一个年份，或用 asOf 指定起点重新排盘。`,
      evidence: [`流年表：${liunian.map((l) => l.year).join('、')}`], confidence: '弱',
    };
  }
  if (year) {
    const l = liunian.find((x) => Number(x.year) === year);
    const dx = l.daxian || {};
    return {
      ok: true, year, topic,
      answer: `${year} 年（${l.ganzhi}，${l.age} 岁）流年命宫落在「${l.lifePalace ? l.lifePalace.palace : '—'}」，四化为 ${(l.mutagen || []).join('、') || '不明显'}；所行大限${dx.palace ? `在${dx.palace}（${dx.start}–${dx.end} 岁）` : '未取到'}。${topic ? `与「${topic.label}」对应的宫位信号见下条依据。` : ''}`,
      evidence: [
        `流年命宫 ${l.lifePalace ? l.lifePalace.palace : '—'}（${l.lifePalace ? l.lifePalace.branch : '—'}）`,
        `四化 ${(l.mutagen || []).join('、') || '不明显'}`,
        dx.palace ? `大限 ${dx.palace}·${dx.start}–${dx.end}岁` : '',
      ].filter(Boolean),
      confidence: (l.mutagen || []).length >= 3 ? '强' : '中',
    };
  }
  if (topic) {
    const name = ZW_PALACE_BY_TOPIC[topic.key] || '命宫';
    const p = (r.palaces || []).find((x) => x.palace === name);
    if (p) {
      const stars = (p.stars || []).filter((s) => s.type === '主星').map((s) => s.name);
      const trait = stars.map((s) => ZIWEI_STARS[s]?.trait).filter(Boolean).slice(0, 2).join('；');
      return {
        ok: true, year: null, topic,
        answer: `「${topic.label}」看${name}：主星${stars.length ? stars.join('、') : '无正曜（借对宫）'}${trait ? `——${trait}` : ''}。宫支${p.branch}，${p.stems ? '' : ''}生年四化与煞星的影响需结合报告里的对应分节一起看。`,
        evidence: [`${name} ${p.branch}·${stars.join('、') || '无正曜'}`, ...(p.shensha || []).slice(0, 3)],
        confidence: stars.length ? '强' : '弱',
      };
    }
  }
  return {
    ok: false, year: null, topic,
    answer: '没有识别到具体年份或方面。可以问「2028 年事业」「感情怎么样」「财运在 2030 年」；也可以直接问某个宫位，如「夫妻宫」。',
    evidence: [], confidence: '弱',
  };
}

function topicSentence(r, key) {
  const map = { career: '事业', wealth: '财富', love: '感情', health: '健康', study: '学业', travel: '出行' };
  return `这段时间可以重点对照报告里「${map[key] || '整体'}」一节看。`;
}

function genericAnswer(r, q) {
  const topic = topicOf(q);
  const sections = Array.isArray(r.interpret?.sections) ? r.interpret.sections : [];
  const hit = topic
    ? sections.find((s) => s.label.includes(topic.label) || s.text.includes(topic.label))
    : null;
  if (hit) {
    return { ok: true, year: null, topic, answer: hit.text, evidence: [`引用分节：${hit.label}`], confidence: '中' };
  }
  const first = sections[0];
  return {
    ok: false, year: null, topic,
    answer: first
      ? `这一盘的追问需要落到具体方面（事业 / 财富 / 感情 / 健康 / 学业 / 出行）。先看「${first.label}」这一节，或把问题说得更具体一点。`
      : '这一盘暂时没有可追问的分节；先看完整解析，再问具体方面。',
    evidence: [], confidence: '弱',
  };
}

/**
 * 回答一个追问。
 * @param {object} r 已算好的盘（compute 的结果，带不带 interpret 都行）
 * @param {string} question 用户问题
 * @returns {{question:string, ok:boolean, year:number|null, topic:object|null, answer:string, evidence:string[], confidence:string}}
 */
export function followup(r, question) {
  const q = String(question || '').trim();
  const result = r && r.system === 'bazi' ? baziAnswer(r, q)
    : r && r.system === 'ziwei' ? ziweiAnswer(r, q)
      : genericAnswer(r, q);
  return { question: q, ...result };
}

export default followup;
