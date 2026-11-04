// 奇门问事解读提示：把「先问清事 → 再取用神 → 看落宫与组合 → 回到现实核对」固化成一段提示。
//
// 为什么要有这个文件：奇门的盘面符号极多（九宫、八门、九星、八神、天地盘干、十干应克），
// 模型拿到一屏数据后最省力的写法就是「开门临生门，吉」——这不是解读，是把符号念一遍。
// 所以提示里把「取哪个符号、为什么取它、它落在哪、和谁什么关系、回到现实查什么」写成硬步骤，
// 并要求先给人话结论，再给依据。文案与取法分开存，取法可测，文案可改。
import { xunShouLiuYi } from './qimen.js';

export const QIMEN_PROMPT_VERSION = 'qimen-1';

/** 九宫序号 → 方位与领域（读「事情落在哪个领域」时用，不直接当吉凶） */
export const PALACE_FIELD = {
  1: { dir: '正北', field: '坎宫：向内、暗中、流动、基础' },
  2: { dir: '西南', field: '坤宫：承载、家庭、土地、执行方' },
  3: { dir: '正东', field: '震宫：启动、动作、速度、竞争' },
  4: { dir: '东南', field: '巽宫：沟通、文书、渐进、反复' },
  5: { dir: '正中', field: '中宫：枢纽；无门无神，按寄宫（多寄坤二）取用，读时要说清是寄宫' },
  6: { dir: '西北', field: '乾宫：上级、规则、外部权威、主导方' },
  7: { dir: '正西', field: '兑宫：口舌、谈判、交易、愉悦' },
  8: { dir: '东北', field: '艮宫：停滞、门槛、转向、积累' },
  9: { dir: '正南', field: '离宫：显露、名声、扩散、明亮' },
};

/** 八门的现实含义。门名只是「这件事的形态」，不是吉凶判决 */
export const GATE_MEANING = {
  开门: '启动、公开、对外推进、正式场合',
  休门: '休息、等待、缓和、暂缓',
  生门: '生长、收益、资源、可持续',
  伤门: '损耗、冲突、风险、代价',
  杜门: '阻碍、隐藏、不宜张扬、需要绕过',
  景门: '信息、名声、曝光、文书往来',
  死门: '停止、收尾、不可再推、需要换路',
  惊门: '变动、惊吓、口舌、突发',
};

/**
 * 问事类型 → 用神清单。subjects 的顺序就是「先讲清对方最关心哪个对象」的顺序：
 * 第一个是本方（我），第二个通常是对方/事体，后面才是环境与条件。
 * how 是取法（可复算），why 是取这个符号的理由（三追问第一问要能答出来）。
 */
export const ASK_KINDS = {
  career: {
    label: '工作 / 事业',
    gate: '开门',
    subjects: [
      { key: 'self', name: '我', how: 'dayStem', why: '日干代表提问者本人；先定位「我现在在哪一宫」，才谈得上后面谁克谁。' },
      { key: 'job', name: '这份工作本身', how: 'gate:开门', why: '开门的本义是「开启、公开、正式」，对应岗位与正式机会，所以用它代表工作这个对象，而不是代表结果好坏。' },
      { key: 'boss', name: '上司 / 决策人', how: 'zhiFu', why: '值符是全局主导之神，代表有拍板权的一方；谈成不成，最终看这一宫的状态与它和日干宫的关系。' },
      { key: 'peer', name: '同事 / 竞争者', how: 'monthStem', why: '月干为同辈；同岗竞争、内部评价这类事落在这里。' },
    ],
  },
  love: {
    label: '感情 / 关系',
    gate: '休门',
    subjects: [
      { key: 'self', name: '我', how: 'dayStem', why: '日干为我。' },
      { key: 'other', name: '对方', how: 'hourStem', why: '时干代表所问之事与对方；感情里问「他怎么样」，时干就是那个人此刻的状态。' },
      { key: 'bond', name: '你俩的连接', how: 'god:六合', why: '六合主结合、撮合、连结；看连接本身有没有被冲开或合住，比看单方态度更接近真相。' },
    ],
  },
  business: {
    label: '生意 / 合作',
    gate: '生门',
    subjects: [
      { key: 'self', name: '我方', how: 'dayStem', why: '日干为我方。' },
      { key: 'partner', name: '对方 / 合作方', how: 'hourStem', why: '时干代表对方与所谈之事。' },
      { key: 'chance', name: '项目机会', how: 'gate:生门', why: '生门主生长与收益，用它代表「这个机会能不能长出东西」。' },
      { key: 'resource', name: '资源与条件', how: 'gate:开门', why: '开门代表公开的资源、渠道、正式手续；有没有真资源，看这一宫有没有被制。' },
      { key: 'deal', name: '契约 / 撮合', how: 'god:六合', why: '六合主合约与中间人；合作最怕的是「六合落空或受冲」，即说了不算。' },
    ],
  },
  action: {
    label: '某件事能不能推进',
    gate: '开门',
    subjects: [
      { key: 'self', name: '我', how: 'dayStem', why: '日干为我。' },
      { key: 'act', name: '这件事本身', how: 'hourStem', why: '时干为事体：你要问的那件事，当下的状态在时干这一宫。' },
      { key: 'env', name: '外部条件', how: 'zhiShi', why: '值使门是「当下正在值班的门」，代表这件事所处的执行环境与节奏。' },
    ],
  },
  day: {
    label: '挑日子 / 看时机',
    gate: '值使',
    subjects: [
      { key: 'act', name: '要办的事', how: 'hourStem', why: '时干为事体，先看它落在哪一宫、受不受制。' },
      { key: 'env', name: '当天的执行环境', how: 'zhiShi', why: '值使门代表当值之门，是这一天的主导形态，不把它当吉凶。' },
      { key: 'self', name: '办事的人', how: 'dayStem', why: '日干为办事人；人有空亡、受制，日子再好也执行不了。' },
    ],
  },
  other: {
    label: '其他具体事',
    gate: '开门',
    subjects: [
      { key: 'self', name: '我', how: 'dayStem', why: '日干为我。' },
      { key: 'act', name: '所问之事', how: 'hourStem', why: '时干为事体。' },
      { key: 'env', name: '当下环境', how: 'zhiShi', why: '值使门代表当下的执行节奏。' },
    ],
  },
};

/** 回到现实要核对什么：按类型给具体清单，不写「请结合现实」这种空话 */
export const REALITY_CHECK = {
  career: ['有没有书面邀约或正式通知？（口头承诺不算）', '岗位职责、汇报对象、试用期写清楚了吗？', '薪酬范围、发放方式、社保口径有没有落到纸面？', '最坏情况是什么：试用不过、岗位撤销，你损失多少？'],
  love: ['对方有没有具体行动：约见、介绍给朋友、共同计划？', '这种投入持续了多久，还是一阵热？', '有没有第三方牵涉（前任、家人、异地）？', '你自己愿意为这段关系让渡什么，底线在哪？'],
  business: ['资源清单能落到具体人、具体钱、具体渠道吗？', '合同条款：出资、分账、违约、退出，哪条没写？', '谁执行？执行人是全职还是顺手帮忙？', '如果对方撤了，你一个人能不能收场？'],
  action: ['这件事有没有截止日期？谁定的？', '实际成本：钱、时间、人情，各多少？', '做错了能不能退回去？可逆性有多高？', '成功的样子长什么样，能不能用一句话说清？'],
  day: ['当天必须到场的人确认了吗？', '场地、材料、审批这些硬约束排除了吗？', '有备选日期吗？排到第几位？', '这一天之前的准备来得及吗？'],
  other: ['这件事成功的样子，能用一件可观察的事描述吗？', '有没有一个明确的时间点可以验证？', '如果没成，你会先怀疑哪一环？', '现在最该做的一件小事是什么？'],
};

/** 少用术语、面向提问者的表达要求 */
export const STYLE_RULES = [
  '开头先用三到五句话回答他问的那件事，全用日常说法：不出现「用神、落宫、值符、生克」这些词。',
  '每个术语第一次出现时，必须紧跟一句人话解释（例：「开门，就是这件事能不能摆到台面上正式推进」）。',
  '不写「吉/凶」二字作结论，改写成人能执行的话：能推进 / 卡在谁那里 / 还缺什么条件 / 大概什么时候会有信号。',
  '盘面给不出的东西（具体金额、对方心里怎么想、某天几点），直接说给不出，不要补。',
];

const HARD_RULES = [
  '只使用下面「盘面事实」里出现的符号。没给的宫、门、星、神，一律不许自己补。',
  '不许说「这是生门所以好」「这是白虎所以凶」。门名与神名只说明形态，吉凶要看它和日干宫、时干宫的关系，以及有没有空亡、受制、入墓。',
  '不给医疗、法律、投资的具体结论；这些只能建议去找对应专业人士。',
  '不给公历日期。奇门这里只谈「什么条件下会有信号」，不谈「几月几号」。',
  '不确定就写不确定，并说明缺哪条信息才能确定。',
];

/** 天盘某干落在哪一宫（日干/时干/月干定位都走这里） */
function palaceOfStem(q, stem) {
  if (!stem) return null;
  const hit = (q.palaces || []).find((p) => p.tianPan === stem);
  if (hit) return hit;
  // 中五宫不在 palaces 里（它没有门、不参与门宫关系），天盘干可能只在这里。
  // 中宫按「寄坤二宫」取，但要把「这是中宫」说出来，不能让读者以为是坤二本宫。
  const c = q.centerPalace;
  return c && c.tianPan === stem ? c : null;
}

/** 某柱天干定宫：甲不上天盘，按本柱所在旬的旬首六仪代查，并在文案里标明寄仪 */
function palaceOfPillarStem(q, siZhu, key, label) {
  const gz = siZhu && siZhu[key] ? String(siZhu[key]) : '';
  const stem = gz.charAt(0);
  if (!stem) return { symbol: `${label}`, palace: null, missing: `四柱里没有${label}` };
  if (stem !== '甲') {
    const p = palaceOfStem(q, stem);
    return { symbol: `${label} ${stem}`, palace: p, missing: p ? '' : `${label}${stem}未现于天盘` };
  }
  const yi = xunShouLiuYi(gz);
  const p = palaceOfStem(q, yi);
  return {
    symbol: `${label} 甲（寄${yi}）`,
    palace: p,
    missing: p ? '' : `${label}甲寄${yi}，${yi}未现于天盘`,
  };
}

function palaceOfGate(q, gate) {
  if (!gate) return null;
  return (q.palaces || []).find((p) => p.gate === gate) || null;
}

function palaceOfGod(q, god) {
  if (!god) return null;
  return (q.palaces || []).find((p) => p.god === god) || null;
}

/** 把 subjects 里的取法解析成 { palace, symbol }；解析不到就明确返回缺失原因 */
export function resolveSubject(q, sub) {
  const si = q.siZhu || {};
  const how = String(sub.how || '');
  if (how === 'dayStem') return palaceOfPillarStem(q, si, 'day', '日干');
  if (how === 'hourStem') return palaceOfPillarStem(q, si, 'time', '时干');
  if (how === 'monthStem') return palaceOfPillarStem(q, si, 'month', '月干');
  if (how === 'zhiFu') {
    const g = q.zhiFu && q.zhiFu.gong;
    return { symbol: `值符（${(q.zhiFu && q.zhiFu.star) || ''}）`, palace: (q.palaces || []).find((p) => p.palace === String(g)) || null, missing: g ? '' : '没有值符落宫' };
  }
  if (how === 'zhiShi') {
    const g = q.zhiShi && q.zhiShi.gong;
    return { symbol: `值使（${(q.zhiShi && q.zhiShi.gate) || ''}）`, palace: (q.palaces || []).find((p) => p.palace === String(g)) || null, missing: g ? '' : '没有值使落宫' };
  }
  if (how.startsWith('gate:')) {
    const gate = how.slice(5);
    const p = palaceOfGate(q, gate);
    return { symbol: `${gate}`, palace: p, missing: p ? '' : `盘上没有${gate}` };
  }
  if (how.startsWith('god:')) {
    const god = how.slice(4);
    const p = palaceOfGod(q, god);
    return { symbol: `${god}`, palace: p, missing: p ? '' : `盘上没有${god}` };
  }
  return { symbol: how, palace: null, missing: `未知取法 ${how}` };
}

/** 一宫的事实摘要：只写盘面上有的，不做判断 */
function palaceFacts(p) {
  if (!p) return '（这一项在盘上定位不到）';
  const f = PALACE_FIELD[p.palace] || { dir: '', field: '' };
  const bits = [
    `${p.palace} 宫（${f.dir}）`,
    p.center ? '中宫（无门无神，按寄宫取用）' : `门：${p.gate || '—'}${p.gateRelation && p.gateRelation.type ? `（${p.gateRelation.type}：${p.gateRelation.note || ''}）` : ''}`,
    `星：${p.star || '—'}`,
    p.center ? '' : `神：${p.god || '—'}`,
    `天盘 ${p.tianPan || '—'} / 地盘 ${p.diPan || '—'}${p.stemRelation && p.stemRelation.type ? `（${p.stemRelation.type}）` : ''}`,
  ];
  if (p.kong) bits.push('空亡');
  if (p.ma) bits.push('临马星');
  if (p.ganYing && p.ganYing.name) bits.push(`十干应克：${p.ganYing.name}`);
  return bits.join('　');
}

const CHECK_QUESTIONS = [
  '你说「我」是哪个符号？为什么是它，不是别的？',
  '机会在哪一宫、阻碍在哪一宫、对方态度在哪一宫？各自依据哪一条关系（生、克、合、冲、空、墓）？',
  '盘上有没有相反提示？你为什么采信这一边，而不是那一边？',
];

/**
 * 生成一段可直接交给模型的提示。
 * @param {object} q 奇门盘（compute 结果里的 qimen 部分，或整个 r）
 * @param {{question?:string, kind?:string, timeKnown?:boolean, askedAt?:string}} opts
 * @returns {{version:string, kind:string, blocked:boolean, text:string, subjects:Array}}
 */
export function buildQimenPrompt(q, opts = {}) {
  const chart = q && q.palaces ? q : (q && q.qimen);
  const kindKey = ASK_KINDS[opts.kind] ? opts.kind : 'other';
  const kind = ASK_KINDS[kindKey];
  const question = String(opts.question || '').replace(/\s+/g, ' ').trim().slice(0, 200);

  // 第一步永远是时间：奇门以「起局那一刻」定盘，时刻不明就没有盘，不能默认拿现在起。
  if (opts.timeKnown === false || !chart) {
    return {
      version: QIMEN_PROMPT_VERSION,
      kind: kindKey,
      blocked: true,
      subjects: [],
      text: [
        '先别起局——时间还不确定。',
        '',
        '奇门是按「起局那一刻」排盘的，时刻差一个时辰，九宫里的门、星、神全换一遍。所以先确认：',
        '1）这盘是按现在这一刻起，还是按你打算行动的那一刻起？',
        '2）你说的日期时间，是钟表时间还是农历？在哪个城市（真太阳时会差几分钟到十几分钟）？',
        '',
        '确认之后，再用同一句话把要问的事说清楚：主语 + 时间 + 可验证的结果，例如「下周三之前，这份工作的书面 offer 能不能拿到」。',
        '在那之前，我不排盘，也不猜。',
      ].join('\n'),
    };
  }

  const subjects = kind.subjects.map((s) => {
    const got = resolveSubject(chart, s);
    return { ...s, symbol: got.symbol, palace: got.palace, missing: got.missing };
  });

  const si = chart.siZhu || {};
  const head = [
    `# 奇门问事解读（提示版本 ${QIMEN_PROMPT_VERSION}）`,
    '',
    '## 你要做的',
    '先把这张盘翻译成「他能拿去用的话」，再给依据。顺序不能反：先结论（人话）→ 再盘面依据 → 再现实核对 → 最后说哪里不确定。',
    '',
    '## 一、先确认问的是哪一件事',
    question
      ? `他的问题是：「${question}」`
      : '他还没说清要问什么。第一句先问清：要问的是哪一件具体的事（哪份工作、哪次沟通、哪笔合作），以及他希望看到什么结果。不要笼统答「运势如何」。',
    `已按「${kind.label}」取用神。若他实际问的是别的事，先纠正类型再解读，不要硬套。`,
    '',
    '## 二、盘面事实（只能用这些，不许自行补算）',
    `四柱：${si.year || '—'}年 ${si.month || '—'}月 ${si.day || '—'}日 ${si.time || '—'}时；局：${chart.dun || ''}${chart.juNumber || ''}局（${chart.yuan || ''}）；值符 ${(chart.zhiFu && chart.zhiFu.star) || '—'} 落 ${(chart.zhiFu && chart.zhiFu.gong) || '—'} 宫；值使 ${(chart.zhiShi && chart.zhiShi.gate) || '—'} 落 ${(chart.zhiShi && chart.zhiShi.gong) || '—'} 宫。`,
    (chart.kongWang && chart.kongWang.length) ? `空亡：${chart.kongWang.join('、')}。` : '',
    '',
    '## 三、取哪个符号代表什么（每一项都要能说出「为什么是它」）',
    ...subjects.map((s, i) => `${i + 1}. ${s.name} → ${s.symbol}${s.missing ? `（注意：${s.missing}）` : ''}\n   - 取法理由：${s.why}\n   - 盘面：${palaceFacts(s.palace)}`),
    '',
    '## 四、怎么读状态（这是最容易偷懒的地方）',
    '1. 落宫先说「这件事落在哪个领域」：',
    ...subjects.filter((s) => s.palace).map((s) => `   - ${s.name}：${(PALACE_FIELD[s.palace.palace] || {}).field || ''}`),
    '2. 所遇之门说明「这件事现在是什么形态」，不是吉凶：',
    ...Object.entries(GATE_MEANING).map(([g, mean]) => `   - ${g}：${mean}`),
    '3. 关系只认四种，且都要指到具体两宫：',
    '   - 生：得助（谁生谁，说清方向）',
    '   - 克：受制（谁克谁，说清方向）',
    '   - 合：连接、聚合（合住也可能意味着被拴住）',
    '   - 冲：变动、对立、打破（冲开也可能意味着解脱）',
    '4. 空亡、入墓、门迫、击刑这些「减分项」，要么明确说它压低了什么，要么别提——不要念一遍名字就过去。',
    '',
    '## 五、开口之前先自检这三问',
    ...CHECK_QUESTIONS.map((q2, i) => `${i + 1}. ${q2}`),
    '三问答不全，就还没到能下结论的程度，先把答不出的那条写出来。',
    '',
    '## 六、最后必须回到现实核对',
    ...REALITY_CHECK[kindKey].map((x, i) => `${i + 1}. ${x}`),
    '盘面只能给方向；上面这些是「他明天可以去查、去问、去要」的东西。核对完再回来谈结论。',
    '',
    '## 七、表达要求',
    ...STYLE_RULES.map((x) => `- ${x}`),
    '',
    '## 八、禁止',
    ...HARD_RULES.map((x) => `- ${x}`),
    '',
    '## 九、输出格式',
    '1. **先给你要的答案**：三到五句人话，直接回答他问的那件事。',
    '2. **盘上依据**：按「我 / 对方或事体 / 环境」三块列，每块一句符号 + 一句人话解释。',
    '3. **现实里该去核对什么**：抄上面第六节里适用的项，不要全抄。',
    '4. **相反提示与不确定处**：盘上哪些地方指向另一个方向，你为什么这样权衡。',
    '5. **一句提醒**：这是参考，不替代你自己去核实和决定。',
  ].filter((x) => x !== '').join('\n');

  return { version: QIMEN_PROMPT_VERSION, kind: kindKey, blocked: false, subjects, text: head };
}
