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
 * 盘面阅读层次：先事实、再结构、后时间与依据。
 * 顺序参考 ziwei.pub/bazi 的分区（四柱 → 五行 → 命宫/身宫 → 起运 → 大运流年 → 神煞），
 * 只借层次，不复制页面文案；各体系按本引擎实际字段裁剪。
 */
export const READING_ORDERS = Object.freeze({
  bazi: ['基本信息', '四柱（日主/十神/藏干）', '旺衰·格局·用神', '合冲·神煞', '起运·大运·流年', '古籍依据'],
  ziwei: ['基本信息', '命宫/身宫与五行局', '十二宫（主星/辅煞/四化）', '格局与三方四正', '大限/流年', '古籍依据'],
  liuyao: ['所问与用神', '本卦/变卦（世应/动爻/六亲）', '月建日辰（旺衰/空破）', '应期线索', '卦辞与依据'],
  meihua: ['所问与体用', '本卦/互卦/变卦', '五行生克', '应期与依据'],
  daliuren: ['天地盘（月将/贵人）', '四课', '三传', '课体与神将', '依据'],
  qimen: ['四柱与局数', '九宫（星门神/天盘干）', '用神落宫', '门宫·干宫·十干克应', '旺衰·击刑入墓', '依据'],
  tarot: ['问题与牌阵', '逐牌（正逆/元素）', '牌间关系', '综合倾向', '边界'],
  fengshui: ['坐向与元运', '运盘/山盘/向盘', '旺山旺向', '取象与边界'],
});

export const READING_ORDER_FALLBACK = Object.freeze(['基本信息', '盘面事实', '结构与关系', '倾向', '边界']);

/** 取某体系的阅读层次；未知体系给通用层次，不返回空数组。 */
export function readingOrderOf(system) {
  return READING_ORDERS[system] || READING_ORDER_FALLBACK;
}

/**
 * 把「就这一盘继续问」整理成一段可以发到对话窗口的提问。
 *
 * 这里只做文本组装，不调用模型、不改盘：面板里点「问进对话」时，
 * 客户端把这段文字写进对话输入框并提交，由对话里的模型基于盘面回答。
 *
 * @param {object} r compute 的结果（至少要带 system 与 summary）
 * @param {{question?:string, maxChars?:number, interpret?:object}} [opts]
 *        interpret 传面板已算好的解析对象（it）时，把其中的白话结论一并交给模型，
 *        让对话开场与面板里的「先答所问 / 说人话」是同一个口径；不传则不加这一段。
 * @returns {{text:string, question:string, system:string, label:string, chars:number, truncated:boolean}}
 */
export function askPrompt(r, opts = {}) {
  const label = SYSTEM_LABEL[r && r.system] || (r && r.system) || '未知体系';
  const asked = String((opts && opts.question) || '').trim();
  const question = asked || '请先用一句白话讲清这张盘的主线，再指出最值得注意的一两处，并说明每处的具体依据。';
  const limit = Number.isFinite(opts && opts.maxChars) && opts.maxChars >= 400 ? opts.maxChars : 3000;
  const raw = String((r && r.summary) || '').trim();
  const truncated = raw.length > limit;
  const summary = truncated ? `${raw.slice(0, limit)}…（摘要已截断）` : raw;

  // 面板里已经算过一遍解析：直接取「直答 / 说人话」，避免模型开场另起一套说法
  const it = (opts && typeof opts.interpret === 'object' && opts.interpret)
    || (r && typeof r.interpret === 'object' && r.interpret) || null;
  const answer = String((it && it.answer) || '').trim();
  const plain = String((it && it.plain) || '').trim();
  const draft = [];
  if (answer) draft.push(`直答：${answer}`);
  if (plain) draft.push(`说人话：${plain}`);

  const lines = [
    '【命理追问】下面这张盘是命理插件刚排好的，请就着它回答我的问题；不用重新排盘，盘面字段已经够用。',
    `体系：${label}`,
    `所问：${question}`,
    '',
    ...(draft.length ? [
      '——开场结论（插件已按同一套规则算好，开场先沿用这句；措辞可改，口径别换）——',
      ...draft,
      '',
    ] : []),
    '——盘面层次（从上到下读，别跳层）——',
    `${label}：${readingOrderOf(r && r.system).join(' → ')}`,
    '先复述事实，再讲结构与时间；上一层没交代清楚，不要跳到下一层。',
    '',
    '——盘面摘要——',
    summary || '（这张盘没有摘要字段，请先让我重新排一次。）',
    '',
    '——回答要求——',
    '读者不懂命理。按下面的骨架答；任何一句他看不懂，就算没写完：',
    draft.length
      ? '1) 开头一句结论：先沿用上面的「开场结论」，再用一句不用术语的话说清这张盘的主线——只读这一句也该有收获；'
      : '1) 开头一句结论：不用术语，一句话说清这张盘的主线，只读这一句也该有收获；',
    '2) 第二段只复述盘面骨架：按上面的层次用 2–4 行写事实（如四柱、格局、用神、大运），不掺倾向，让读者知道后面的判断从哪来；',
    '3) 判断最多两条，按重要性排序，每条分四行写：',
    '   盘面｜只引盘面已有的字（具体的柱、宫或爻、字段名），不掺解释；',
    '   白话｜把上一行的术语当场翻成日常话——调候 / 化气 / 通关 / 空亡 / 争合 这类词必须落地，一个词只翻一次，不连续堆三个以上；',
    '   倾向｜说「更可能……」，讲清它在现实里大概意味着什么，用概率语气；',
    '   边界｜这条在什么情况下不成立；盘面没给的，直接写「这盘里看不出来」；',
    '4) 收尾一句「如果只记一件事」：给一条能核对、能动手的观察点，并说明它出自上面哪条盘面依据；',
    '5) 别把传统说法当成已证实的事实：不下绝对断言，也不用「肯定」「绝对」这类词，更不写「格局很好」「运程不顺」这种没有信息的空话。',
  ];
  const text = lines.join('\n');
  return { text, question, system: (r && r.system) || '', label, chars: text.length, truncated };
}

export default followup;
