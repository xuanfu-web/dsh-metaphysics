// 问事解读提示：把「先问清事 → 取用神 → 看状态与关系 → 回到现实核对」推广到全部问事体系。
//
// 起点是奇门那套要求（engine/qimen-prompt.js），但问题不在奇门——六爻、梅花、六壬、塔罗、小六壬
// 一样会被读成「符号念一遍」：世应旺相所以好、用生体所以吉、这张牌是死神所以完蛋。
// 差别只在「哪一位符号代表我、代表事」，所以骨架共用，取用神各体系自己给。
//
// 三件事写死在这个文件里：
//   1. 时间不明先问，不默认拿现在起局（问事体系全靠起课那一刻定盘）；
//   2. 每个符号都要说出「为什么取它」，答不出就不许下结论；
//   3. 最后必须拉回现实核对——盘面只给方向，给不了证据。
import { buildQimenPrompt } from './qimen-prompt.js';

export const EVENT_PROMPT_VERSION = 'event-1';

/** 问事类型：解读时要先落到这五类里的一类，笼统问「运势」不在此列 */
export const ASK_KINDS = {
  career: {
    label: '工作 / 事业',
    reality: ['有没有书面邀约或正式通知？（口头承诺不算）', '岗位职责、汇报对象、试用期写清楚了吗？', '薪酬范围、发放方式有没有落到纸面？', '最坏情况：试用不过或岗位撤销，你损失多少？'],
  },
  love: {
    label: '感情 / 关系',
    reality: ['对方有没有具体行动：约见、介绍给朋友、共同计划？', '这种投入持续了多久，还是一阵热？', '有没有第三方牵涉（前任、家人、异地）？', '你愿意让渡什么，底线在哪？'],
  },
  business: {
    label: '生意 / 合作',
    reality: ['资源能落到具体人、具体钱、具体渠道吗？', '合同条款：出资、分账、违约、退出，哪条没写？', '谁执行？执行人是全职还是顺手帮忙？', '如果对方撤了，你一个人能不能收场？'],
  },
  action: {
    label: '某件事能不能推进',
    reality: ['这件事有没有截止日期？谁定的？', '实际成本：钱、时间、人情，各多少？', '做错了能不能退回去？', '成功的样子能不能用一句话说清？'],
  },
  day: {
    label: '挑日子 / 看时机',
    reality: ['当天必须到场的人确认了吗？', '场地、材料、审批这些硬约束排除了吗？', '有备选日期吗？排在第几位？', '这一天之前的准备来得及吗？'],
  },
  other: {
    label: '其他具体事',
    reality: ['成功的样子，能用一件可观察的事描述吗？', '有没有一个明确的时间点可以验证？', '如果没成，你会先怀疑哪一环？', '现在最该做的一件小事是什么？'],
  },
};

const kindOf = (k) => (ASK_KINDS[k] ? k : 'other');

// ── 各体系：谁是「我」、谁是「事」、用神怎么取 ──────────────────
// 每一项都要能回答「为什么是它」——这是三追问里的第一问，含糊就等于没取。

const LIUYAO_USE = {
  career: { liuqin: '官鬼', why: '六爻问工作职位、上级压力，以官鬼为用神：官鬼既是管你的人，也是名位所在。' },
  love: { liuqinByGender: { male: '妻财', female: '官鬼' }, why: '感情看配偶星：男命以妻财为妻，女命以官鬼为夫；再看世应两家是否相生相合。' },
  business: { liuqin: '妻财', why: '合作看财：妻财代表可分的钱与利；同时看兄弟爻，兄弟动主分我之财。' },
  action: { liuqin: '父母', why: '问一件事能不能推进，看父母：父母主文书、消息、答复，事之成否常落在一纸回话上。' },
  day: { liuqin: '父母', why: '择日问的是「那一天办这件事顺不顺」，仍以所办之事的类象为主，先看日月建与世爻。' },
  other: { liuqin: '官鬼', why: '事类不明时先以官鬼统摄「所问之事」，但必须请他确认事属哪一类，不要硬断。' },
};

const liuyaoShi = (r) => {
  const shi = r.ben && r.ben.shi;
  const ying = r.ben && r.ben.ying;
  const line = (n) => (r.ben && r.ben.lines ? r.ben.lines.find((l) => l.position === n) : null);
  return { shi: line(shi), ying: line(ying) };
};

const lineFact = (l) => (l
  ? `${l.position}爻 ${l.ganzhi}（${l.liuqin || ''}${l.moving ? '·动' : ''}${l.liushen ? '·' + l.liushen : ''}）`
  : '（本盘定位不到）');

function liuyaoUse(r, kind, gender) {
  const cfg = LIUYAO_USE[kind] || LIUYAO_USE.other;
  const liuqin = cfg.liuqin || (cfg.liuqinByGender && (cfg.liuqinByGender[gender] || cfg.liuqinByGender.male)) || '官鬼';
  const hits = (r.ben && r.ben.lines ? r.ben.lines : []).filter((l) => l.liuqin === liuqin);
  const { shi, ying } = liuyaoShi(r);
  const out = [
    { name: '我', symbol: `世爻 ${lineFact(shi)}`, why: '世爻代表求测者本人：你的态度、你的处境，都从这一爻看。', fact: lineFact(shi) },
    { name: '对方 / 事体', symbol: `应爻 ${lineFact(ying)}`, why: '应爻代表对方或所问之事：世应相生相合是能接上头，相冲相克是对不上。', fact: lineFact(ying) },
    {
      name: `用神（${liuqin}）`,
      symbol: hits.length ? hits.map((l) => lineFact(l)).join('；') : `本盘无${liuqin}（可能伏藏）`,
      why: cfg.why,
      fact: hits.length ? hits.map((l) => lineFact(l)).join('；') : `没有${liuqin}明现，须看伏神或另取，不要假装有`,
      warn: hits.length > 1 ? `用神两现（${hits.length}处）：不能随手挑一个。先看持世、临日月、发动者，挑不出来就明说「两现未定」。` : '',
    },
  ];
  return out;
}

function meihuaUse(r) {
  const bu = r.bodyUse || {};
  const b = bu.body || {};
  const u = bu.use || {};
  return [
    { name: '我（体卦）', symbol: `${b.trigram || '—'}（${b.element || ''}）`, why: '梅花以体卦为我：不动的那一卦是求测者自身。', fact: `${b.trigram || '—'} ${b.element || ''}` },
    { name: '事（用卦）', symbol: `${u.trigram || '—'}（${u.element || ''}）`, why: '动爻所在为用卦，代表所问之事；体用之间的关系就是人与事的处境。', fact: `${u.trigram || '—'} ${u.element || ''}` },
    { name: '体用关系', symbol: bu.relation || '—', why: '只看生克方向，不直接把「大吉」当结论——吉是条件好，不是结果已经发生。', fact: bu.level ? `本盘标为「${bu.level}」` : '' },
  ];
}

function daliurenUse(r) {
  const sc = r.sanChuan || {};
  const gan = r.dayGanZhi ? String(r.dayGanZhi).charAt(0) : '';
  const zhi = r.dayGanZhi ? String(r.dayGanZhi).slice(-1) : '';
  return [
    { name: '我（日干）', symbol: `日干 ${gan}`, why: '大六壬以日干为求测者本人，日支为对方或所问之事。', fact: `日干 ${gan}` },
    { name: '对方 / 事（日支）', symbol: `日支 ${zhi}`, why: '日支是事情的落点，干上神与支上神的关系就是人与事的接口。', fact: `日支 ${zhi}` },
    { name: '事之始（初传）', symbol: sc.chu ? `${sc.chu.zhi}（${sc.chu.liuQin || ''}·${sc.chu.jiangFull || ''}）` : '—', why: '三传看过程：初传是起因，中传是中途，末传是收尾，末传比初传更接近结果。', fact: sc.chu ? `${sc.chu.zhi} ${sc.chu.liuQin || ''}` : '' },
    { name: '事之终（末传）', symbol: sc.mo ? `${sc.mo.zhi}（${sc.mo.liuQin || ''}·${sc.mo.jiangFull || ''}）` : '—', why: '末传落处是这件事最后停在哪儿，看它落在哪一类六亲上。', fact: sc.mo ? `${sc.mo.zhi} ${sc.mo.liuQin || ''}` : '' },
  ];
}

function tarotUse(r) {
  const cards = (r.cards || []).map((c) => ({
    name: c.position || '牌位',
    symbol: `${c.name}（${c.orientation || (c.upright ? '正位' : '逆位')}）`,
    why: `${c.positionHint || '这一位代表它所标的那个阶段'}；牌位决定它代表什么，牌面只说明它是什么样子。`,
    fact: `${c.core || ''}${(c.keywords && c.keywords.length) ? `　关键词：${c.keywords.join('、')}` : ''}`,
  }));
  return cards.length ? cards : [{ name: '牌面', symbol: '—', why: '没有抽到牌', fact: '' }];
}

function xiaoliurenUse(r) {
  const res = r.result || {};
  return [
    { name: '所问之事', symbol: res.palace || '—', why: '小六壬只有一宫落位，它同时代表事与势：落宫决定这件事处在哪一类状态。', fact: res.text || '' },
    { name: '我', symbol: '（本体系不单列）', why: '小六壬没有「我」的独立符号，所以它只能给势，给不了「我 vs 对方」的对比——这是它的口径，别硬补。', fact: '' },
  ];
}

const PICK = { liuyao: liuyaoUse, meihua: meihuaUse, daliuren: daliurenUse, tarot: tarotUse, xiaoliuren: xiaoliurenUse };

const STYLE = [
  '开头先用三到五句话回答他问的那件事，全用日常说法：不出现「用神、世应、体用、落宫」这些词。',
  '每个术语第一次出现时，紧跟一句人话解释（例：「用神，就是这件事在盘上对应哪一个符号」）。',
  '不写「吉/凶」二字当结论，改成能执行的话：能推进 / 卡在谁那里 / 还缺什么 / 大概什么条件下会有信号。',
  '盘面给不出的东西（具体金额、对方心里怎么想、某天几点），直接说给不出。',
];

const HARD = [
  '只使用下面「盘面事实」里出现的符号；没给的，一律不许自己补。',
  '不许「旺相所以好」「死神所以完蛋」这种一句话结论：符号只说明形态，好坏要看它与「我」这一位的关系。',
  '不给医疗、法律、投资的具体结论；这些只能建议去找对应专业人士。',
  '不给公历日期。应期只谈「什么条件下会出现信号」。',
  '不确定就写不确定，并说明缺哪条信息才能确定。',
];

const THREE = [
  '你说「我」是哪个符号？为什么是它？',
  '机会、阻碍、对方态度各落在盘上哪一处？各自依据哪条关系（生、克、合、冲、空、墓）？',
  '有没有相反提示？你为什么采信这一边？',
];

/**
 * 生成一段可直接交给模型的问事解读提示。
 * @param {object} r compute() 的结果（含各体系盘面）
 * @param {{question?:string, kind?:string, gender?:'male'|'female', timeKnown?:boolean}} opts
 */
export function buildEventPrompt(r, opts = {}) {
  const system = (r && r.system) || 'other';
  // 奇门有自己的取用神表（门/宫/干），复用它的实现，避免两套说法打架
  if (system === 'qimen') return buildQimenPrompt(r, opts);

  const k = kindOf(opts.kind);
  const kind = ASK_KINDS[k];
  const question = String(opts.question || (r && r.question) || '').replace(/\s+/g, ' ').trim().slice(0, 200);

  if (opts.timeKnown === false) {
    return {
      version: EVENT_PROMPT_VERSION,
      system,
      kind: k,
      blocked: true,
      subjects: [],
      text: [
        '先别起课——时间还不确定。',
        '',
        '问事体系全靠「起课那一刻」定盘：差一个时辰，日辰、旬空、月建全换，盘就不是这张盘了。先确认：',
        '1）是按现在这一刻起，还是按你打算行动的那一刻起？',
        '2）你给的是钟表时间还是农历？在哪个城市（真太阳时会差几分钟到十几分钟）？',
        '',
        '确认之后，把要问的事说成「主语 + 时间 + 可验证的结果」，例如「下周三之前这份工作能不能拿到书面 offer」。',
        '在那之前，我不排盘，也不猜。',
      ].join('\n'),
    };
  }

  const pick = PICK[system];
  if (!pick) {
    return {
      version: EVENT_PROMPT_VERSION,
      system,
      kind: k,
      blocked: true,
      subjects: [],
      text: `「${system}」不是问事体系（或暂未接入取用神规则），用它对具体事下结论就是硬套。请改用六爻、梅花、大六壬、奇门或塔罗。`,
    };
  }

  const subjects = pick(r, k, opts.gender);
  const lines = [
    `# 问事解读（提示版本 ${EVENT_PROMPT_VERSION}｜体系：${system}）`,
    '',
    '## 你要做的',
    '先把这张盘翻译成「他明天能拿去用的话」，再给依据。顺序不能反：人话结论 → 盘面依据 → 现实核对 → 不确定处。',
    '',
    '## 一、先确认问的是哪一件事',
    question ? `他的问题是：「${question}」` : '他还没说清要问什么。第一句先问清：要问的是哪一件具体的事，以及他希望看到什么结果。不要笼统答「运势如何」。',
    `已按「${kind.label}」取用神。若实际问的是别的事，先纠正类型再解读，不要硬套。`,
    '',
    '## 二、取哪个符号代表什么（每一项都要能说出「为什么是它」）',
    ...subjects.map((s, i) => `${i + 1}. ${s.name} → ${s.symbol}\n   - 取法理由：${s.why}${s.fact ? `\n   - 盘面：${s.fact}` : ''}${s.warn ? `\n   - 注意：${s.warn}` : ''}`),
    '',
    '## 三、怎么读状态（最容易偷懒的地方）',
    '- 先说明这一位落在什么处境（旺/衰、空/实、动/静、被制/得助），再说这对他意味着什么。',
    '- 关系只认四种，且都要指到具体两位符号：生（谁生谁）、克（谁克谁）、合（连在一起，合住也可能是拴住）、冲（变动、对立、打破）。',
    '- 空亡、入墓、伏藏、用神两现这些「减分项」，要么说清压低了什么，要么别提——不要念一遍名字就过去。',
    '',
    '## 四、开口之前先自检这三问',
    ...THREE.map((x, i) => `${i + 1}. ${x}`),
    '三问答不全，就还没到能下结论的程度，先把答不出的那条写出来。',
    '',
    '## 五、最后必须回到现实核对',
    ...kind.reality.map((x, i) => `${i + 1}. ${x}`),
    '盘面只给方向；上面这些是他明天可以去查、去问、去要的东西。核对完再回来谈结论。',
    '',
    '## 六、表达要求',
    ...STYLE.map((x) => `- ${x}`),
    '',
    '## 七、禁止',
    ...HARD.map((x) => `- ${x}`),
    '',
    '## 八、输出格式',
    '1. **先给你要的答案**：三到五句人话，直接回答他问的那件事。',
    '2. **盘上依据**：按「我 / 对方或事体 / 环境」三块列，每块一句符号 + 一句人话。',
    '3. **现实里该去核对什么**：抄第五节里适用的，不要全抄。',
    '4. **相反提示与不确定处**：盘上哪里指向另一头，你为什么这样权衡。',
    '5. **一句提醒**：这是参考，不替代你自己去核实和决定。',
  ];
  return { version: EVENT_PROMPT_VERSION, system, kind: k, blocked: false, subjects, text: lines.join('\n') };
}
