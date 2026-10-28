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

/** 体系显示名：追问提示里用，避免把 bazi 这类内部键直接给用户看。 */
const SYSTEM_LABEL = {
  bazi: '八字（四柱）',
  ziwei: '紫微斗数',
  liuyao: '六爻',
  meihua: '梅花易数',
  daliuren: '大六壬',
  qimen: '奇门遁甲',
  tarot: '塔罗',
  hepan: '合盘',
  chenggu: '称骨',
  almanac: '黄历',
  zeri: '择日',
  star: '星座',
  numerology: '生命数字',
  mbti: '十六型人格',
  trend: '人生 K 线',
  fengshui: '风水',
  name: '起名',
  convert: '公农历互转',
};

/**
 * 把「就这一盘继续问」整理成一段可以发到对话窗口的提问。
 *
 * 这里只做文本组装，不调用模型、不改盘：面板里点「问进对话」时，
 * 客户端把这段文字写进对话输入框并提交，由对话里的模型基于盘面回答。
 *
 * @param {object} r compute 的结果（至少要带 system 与 summary）
 * @param {{question?:string, maxChars?:number}} [opts]
 * @returns {{text:string, question:string, system:string, label:string, chars:number, truncated:boolean}}
 */
export function askPrompt(r, opts = {}) {
  const label = SYSTEM_LABEL[r && r.system] || (r && r.system) || '未知体系';
  const asked = String((opts && opts.question) || '').trim();
  const question = asked || '请先总览这张盘，指出最值得注意的一两处，并说明各自的依据。';
  const limit = Number.isFinite(opts && opts.maxChars) && opts.maxChars >= 400 ? opts.maxChars : 3000;
  const raw = String((r && r.summary) || '').trim();
  const truncated = raw.length > limit;
  const summary = truncated ? `${raw.slice(0, limit)}…（摘要已截断）` : raw;

  const lines = [
    '【命理追问】下面这张盘是命理插件刚排好的，请就着它回答我的问题；不用重新排盘，盘面字段已经够用。',
    `体系：${label}`,
    `所问：${question}`,
    '',
    '——盘面摘要——',
    summary || '（这张盘没有摘要字段，请先让我重新排一次。）',
    '',
    '——回答要求——',
    '1) 尽量引用到具体的柱、宫或爻，再说判断，别只给结论；',
    '2) 盘面里没有依据的地方直接说「这盘里看不出来」，不要补外部假设；',
    '3) 用概率和倾向的说法，别给绝对化的断言，也别把传统说法当成事实。',
  ];
  const text = lines.join('\n');
  return { text, question, system: (r && r.system) || '', label, chars: text.length, truncated };
}

export default followup;
