// 十六型人格问卷（MBTI 风格）：四维度各 6 题，李克特 1–5 计分，按维度净分定字母。
// 说明：这是「MBTI 风格」的问卷式测算，不是官方 MBTI 量表（未使用其题目、常模与评鉴许可），
// 也不适合用来做招聘、晋升、诊断等对人的判定。纯本地确定性计算，同样的问题给出同样的结果。
import { fail } from './fail.js';

/** 四维度：两位字母、白话说明、平手时偏向哪一侧。 */
export const DIMENSIONS = [
  {
    key: 'EI',
    left: 'E',
    right: 'I',
    name: '能量方向',
    leftSay: '向外：和人打交道时来电，边说边想',
    rightSay: '向内：独处时回血，先想清楚再开口',
    tie: 'I',
    note: '不是「会不会社交」，而是社交之后你更有电还是更耗电。',
  },
  {
    key: 'SN',
    left: 'S',
    right: 'N',
    name: '信息接收',
    leftSay: '具体：先看事实、细节和已有经验',
    rightSay: '联想：先看模式、隐喻和下一步可能',
    tie: 'N',
    note: '不是「聪明与否」，而是你先抓住哪一头。',
  },
  {
    key: 'TF',
    left: 'T',
    right: 'F',
    name: '决策依据',
    leftSay: '逻辑：先看是否站得住、是否一致',
    rightSay: '价值：先看人在其中会不会被伤到',
    tie: 'F',
    note: '不是「冷血或情绪化」，而是权衡时先放哪把尺子。',
  },
  {
    key: 'JP',
    left: 'J',
    right: 'P',
    name: '生活节奏',
    leftSay: '收束：先定计划，喜欢事情有个了结',
    rightSay: '开放：先留着口子，喜欢事情还能变',
    tie: 'P',
    note: '不是「勤快或懒散」，而是面对不确定时更愿意钉死还是留着。',
  },
];

/**
 * 题目：每条只问一件事，答「像我」加分给 side 一侧。
 * 24 题 = 四维度 × 6；顺序交错，避免连着答同一维度而顺着惯性答。
 */
export const QUESTIONS = [
  { id: 'e1', dim: 'EI', side: 'E', text: '在一个都是陌生人的场合，你会主动找几个人聊起来。' },
  { id: 's1', dim: 'SN', side: 'S', text: '别人讲一件事，你更关心具体发生了什么、细节对不对得上。' },
  { id: 't1', dim: 'TF', side: 'T', text: '朋友来问你两难的选择，你会先把利弊摆清楚再谈感受。' },
  { id: 'j1', dim: 'JP', side: 'J', text: '出门前你习惯把行程和要带的东西先定下来。' },
  { id: 'e2', dim: 'EI', side: 'I', text: '忙完一整天，你更想一个人安静待着，而不是再约一轮。' },
  { id: 's2', dim: 'SN', side: 'N', text: '你常从一个现象跳到「再往下可能还会怎样」的联想上。' },
  { id: 't2', dim: 'TF', side: 'F', text: '做决定时，你更在意这件事对身边人的实际影响。' },
  { id: 'j2', dim: 'JP', side: 'P', text: '计划临时被打乱，你多半能顺势改，不太难受。' },
  { id: 'e3', dim: 'EI', side: 'E', text: '想事情的时候，你更习惯说给人听，说着说着就清楚了。' },
  { id: 's3', dim: 'SN', side: 'S', text: '你更信「做过、验证过」的办法，而不是听起来很新的办法。' },
  { id: 't3', dim: 'TF', side: 'T', text: '规则一旦定了，哪怕对自己不方便，你也倾向照着走。' },
  { id: 'j3', dim: 'JP', side: 'J', text: '有一件事没做完，你心里会一直悬着，想先把它收尾。' },
  { id: 'e4', dim: 'EI', side: 'I', text: '电话响了或有人临时找来，你第一反应是先缓一下再应对。' },
  { id: 's4', dim: 'SN', side: 'N', text: '你容易被「这背后是什么道理」这类问题勾住。' },
  { id: 't4', dim: 'TF', side: 'F', text: '别人情绪不好时，你直觉是先接住情绪，而不是先讲道理。' },
  { id: 'j4', dim: 'JP', side: 'P', text: '你常常边走边看，事到临头再定具体怎么做。' },
  { id: 'e5', dim: 'EI', side: 'E', text: '人多的场合待久了，你通常越待越有精神。' },
  { id: 's5', dim: 'SN', side: 'S', text: '你记事情偏向记「原话、原样、当时的情形」。' },
  { id: 't5', dim: 'TF', side: 'T', text: '和人争论时，你更在意谁的推理有漏洞，而不是谁伤了面子。' },
  { id: 'j5', dim: 'JP', side: 'J', text: '你喜欢把待办列出来，一条条划掉。' },
  { id: 'e6', dim: 'EI', side: 'I', text: '有新想法时，你更愿意先自己消化一轮，再拿出去讲。' },
  { id: 's6', dim: 'SN', side: 'N', text: '比起照现状做好，你更享受把现状改成一个更好的样子。' },
  { id: 't6', dim: 'TF', side: 'F', text: '要做取舍时，你会想「这样是不是对人不公平」。' },
  { id: 'j6', dim: 'JP', side: 'P', text: '临出发才收拾行李，你也觉得没什么问题。' },
];

/** 认知功能栈（主导 → 劣势），供类型详情里展开。 */
export const FUNCTION_STACKS = {
  ISTJ: ['Si', 'Te', 'Fi', 'Ne'],
  ISFJ: ['Si', 'Fe', 'Ti', 'Ne'],
  INFJ: ['Ni', 'Fe', 'Ti', 'Se'],
  INTJ: ['Ni', 'Te', 'Fi', 'Se'],
  ISTP: ['Ti', 'Se', 'Ni', 'Fe'],
  ISFP: ['Fi', 'Se', 'Ni', 'Te'],
  INFP: ['Fi', 'Ne', 'Si', 'Te'],
  INTP: ['Ti', 'Ne', 'Si', 'Fe'],
  ESTP: ['Se', 'Ti', 'Fe', 'Ni'],
  ESFP: ['Se', 'Fi', 'Te', 'Ni'],
  ENFP: ['Ne', 'Fi', 'Te', 'Si'],
  ENTP: ['Ne', 'Ti', 'Fe', 'Si'],
  ESTJ: ['Te', 'Si', 'Ne', 'Fi'],
  ESFJ: ['Fe', 'Si', 'Ne', 'Ti'],
  ENFJ: ['Fe', 'Ni', 'Se', 'Ti'],
  ENTJ: ['Te', 'Ni', 'Se', 'Fi'],
};

/** 八个认知功能的白话一句话。 */
export const FUNCTIONS = {
  Si: '内感觉：拿过去的经验当尺子，稳、细、记得住。',
  Se: '外感觉：对眼前的具体变化反应快，先动手再说。',
  Ni: '内直觉：把零碎线索收成一个方向感，先看到终局。',
  Ne: '外直觉：从一个点炸开很多可能，擅长另起一条路。',
  Ti: '内思考：要自己把逻辑盘通，讲得出为什么才认。',
  Te: '外思考：要事情跑起来，讲流程、指标和结果。',
  Fi: '内情感：先问「这符不符合我在意的东西」，价值感很强。',
  Fe: '外情感：先读空气、先顾关系，擅长把人和在一起。',
};

/**
 * 十六型：每型给白话称号 + 三句倾向 + 优势 + 课题 + 工作/关系/学习各一句。
 * 措辞只作参照，不断定个人能力与命运。
 */
export const TYPES = {
  ISTJ: {
    title: '检查者',
    keywords: '稳、准、守得住',
    oneLine: '答应的事会做完，讨厌临时改口和半成品。',
    strengths: ['流程感强，细节不漏', '说到做到，扛得住长期重复', '遇到混乱先立规矩'],
    blindspots: ['对「新办法」先起疑，容易错过转弯的机会', '把责任揽太多，难受也说不出口'],
    work: '适合规则清楚、可累积经验的岗位：审计、运维、法务、工程管理。',
    love: '表达朴素但稳定，重视承诺；需要对方把需求说明白，别指望你自己猜。',
    study: '靠体系与刷题推进，把知识整理成清单会明显提速。',
    growth: '练一件「没有标准答案」的事，容许自己在过程中改主意。',
  },
  ISFJ: {
    title: '守护者',
    keywords: '暖、细、记得住人',
    oneLine: '会默默把别人的需要记在心里，然后提前做好。',
    strengths: ['照顾细节与情绪', '记性好，了解身边人的习惯', '愿意做没人愿意做的收尾'],
    blindspots: ['习惯先委屈自己，之后积成怨', '对方没察觉你的付出时容易失落'],
    work: '适合需要耐心与责任心的岗位：护理、教育、行政、客户成功、人事。',
    love: '用做事表达感情，需要被明确看见与感谢；也要练习直接要。',
    study: '喜欢有例题、有反馈的学习方式，做学习小组的稳定输出者很合适。',
    growth: '练习说「这件事我做不到」，先照顾自己的电量。',
  },
  INFJ: {
    title: '提倡者',
    keywords: '深、理想、看穿人心',
    oneLine: '关心人为什么这么活，愿意为一个「值得」的目标长期投入。',
    strengths: ['能从细节里读出动机', '表达有感染力，适合讲清意义', '对长期方向有耐心'],
    blindspots: ['标准高，容易对现实失望', '想得太深而迟迟不开口，外人看不出你在乎'],
    work: '适合内容、咨询、教育、公益、产品策略这类「讲清一件事」的岗位。',
    love: '要的是深谈与理解，浅社交会耗电；需要对方给得起精神上的回应。',
    study: '适合主题式深挖，写读书笔记与建立自己的框架比刷题更有效。',
    growth: '把理想拆成这周能交付的一小步，别只在脑子里完成它。',
  },
  INTJ: {
    title: '建筑师',
    keywords: '远、冷静、自己搭系统',
    oneLine: '先看清全局再动手，讨厌无效沟通和低效流程。',
    strengths: ['长期规划清晰', '能独立啃下复杂问题', '对标准挑剔，产品因此更硬'],
    blindspots: ['说话直，容易让人觉得被否定', '对「慢」和「情绪」耐心不足'],
    work: '适合战略、研发、系统设计、投资研究这类需要独立判断的岗位。',
    love: '表达感情偏克制，用解决问题的方式示好；需要对方接受你的独处需求。',
    study: '自学效率高，适合先建框架再补细节；警惕只读不产出。',
    growth: '在给方案之前先接一句对方的感受，合作阻力会小很多。',
  },
  ISTP: {
    title: '巧匠',
    keywords: '手快、冷静、先修再说',
    oneLine: '遇到问题先上手拆开看，不爱开长会。',
    strengths: ['动手能力强，现场判断快', '压力下不慌，能抓住关键', '讲实际，不绕弯'],
    blindspots: ['对长期计划不感兴趣，容易拖到最后', '话少，别人不知道你在想什么'],
    work: '适合现场性强的岗位：工程、设备、急救、运维、技术支持、手艺型工作。',
    love: '不擅长说，但会用行动帮忙；需要对方接受你「不解释」的习惯。',
    study: '边做边学最快，先碰真实设备或真实项目，再回头补理论。',
    growth: '给重要的事留一个检查点，别全靠临场反应。',
  },
  ISFP: {
    title: '探险家',
    keywords: '真、敏感、跟着感觉走',
    oneLine: '在意「这件事对不对味」，不喜欢被安排得太死。',
    strengths: ['审美与体感准', '待人温和，不强加于人', '在真实情境里学得快'],
    blindspots: ['不愿冲突，把不满压着', '长期目标容易停在「想」这一步'],
    work: '适合与美、身体、具体对象打交道的岗位：设计、摄影、餐饮、康复、手作。',
    love: '用陪伴和小惊喜表达在意，讨厌被审问；需要空间也需要被确认。',
    study: '先看示例、先动手，理论放在用到的时候补，效率更高。',
    growth: '给在意的事定一个可交付的日期，把感觉变成作品。',
  },
  INFP: {
    title: '调停者',
    keywords: '柔、较真、心里有一杆秤',
    oneLine: '对人真诚，对自己在意的事格外较真，讨厌虚伪。',
    strengths: ['共情与想象力都好', '写与表达有个人味道', '能为价值观长期坚持'],
    blindspots: ['容易把「不够好」归到自己身上', '计划性弱，想法多而落地慢'],
    work: '适合创作、教育、心理、内容、公益这类能表达价值的岗位；强规则环境会耗电。',
    love: '看重真诚与被理解，愿意为对方调整；需要明确的回应，别长期猜。',
    study: '靠兴趣驱动，给自己找「为什么学」比逼自己更有效；用短周期输出防拖延。',
    growth: '把心里的标准写下来，分「必须有」和「有更好」，少一点全或无。',
  },
  INTP: {
    title: '逻辑家',
    keywords: '想透、好问、自己盘逻辑',
    oneLine: '喜欢把问题拆到原理层，讨厌「一直这样所以就这样」。',
    strengths: ['抽象思考强，能发现系统里的漏洞', '学新领域快', '不轻易被权威说服'],
    blindspots: ['想得多做得少，收尾困难', '指出问题时不修饰，容易树敌'],
    work: '适合研究、算法、架构、分析、写作这类需要反复推演的岗位。',
    love: '用分享想法表达亲近，需要对方能聊得深；别让讨论变成辩论。',
    study: '先弄清原理再练，适合自己搭知识树；给自己设「讲给别人听」的交付点。',
    growth: '给探索设时间盒，到点就交出一个能用的版本。',
  },
  ESTP: {
    title: '企业家',
    keywords: '快、敢、临场能打',
    oneLine: '看到机会先动手，比开会讨论更信现场反馈。',
    strengths: ['行动快，敢试错', '会看人、会周旋', '压力下反而清醒'],
    blindspots: ['耐心不足，容易留一堆半成品', '对长期代价估计偏轻'],
    work: '适合销售、商务、创业、现场运营、竞技类岗位；文牍型工作会闷。',
    love: '热烈直接，喜欢一起做事；需要对方接受你「说到就到」的节奏。',
    study: '靠实战与竞赛驱动，做项目比听课有效；需要有人帮你收尾。',
    growth: '动手前多问一句「三个月后这件事还成立吗」。',
  },
  ESFP: {
    title: '表演者',
    keywords: '热、会带气氛、活在当下',
    oneLine: '在人群里自带气氛，喜欢真实可感的体验。',
    strengths: ['感染力强，能把场子撑起来', '对人和现场的细节敏感', '愿意尝试新鲜事'],
    blindspots: ['对长期枯燥的事耐力有限', '不太愿意面对冲突背后的结构问题'],
    work: '适合面向人的岗位：活动、销售、主持、文旅、服务、内容出镜。',
    love: '表达直接，喜欢一起玩；需要对方给你稳定感，也别把自由当借口。',
    study: '边玩边学最有效，把知识做成游戏、演示或小组活动。',
    growth: '留一件「不好玩但重要」的事，按周推进。',
  },
  ENFP: {
    title: '竞选者',
    keywords: '亮、点子多、对人好奇',
    oneLine: '对人和可能性都很好奇，容易同时点亮很多盏灯。',
    strengths: ['联想快，能给人新视角', '真诚热情，容易建立信任', '擅长起头与鼓舞'],
    blindspots: ['兴趣转移快，收尾吃力', '情绪起伏大，容易被细节拖垮'],
    work: '适合创意、品牌、内容、培训、早期项目这类需要不断开新局的地方。',
    love: '需要新鲜感与被看见，愿意为对方想很多；要练习把承诺落到实处。',
    study: '用主题和讨论驱动，找学习搭子比一个人硬啃有效。',
    growth: '同时只开三条线，其余写进「以后再说」清单。',
  },
  ENTP: {
    title: '辩论家',
    keywords: '机敏、爱拆、想法往外冒',
    oneLine: '喜欢把既有说法掰开看，享受把问题换个角度。',
    strengths: ['反应快，能现场找到漏洞', '对新领域上手快', '擅长把复杂事讲得好玩'],
    blindspots: ['为辩而辩，容易伤人', '起头多、收尾少'],
    work: '适合咨询、产品、创业、策略、媒体这类需要不断破局的地方。',
    love: '用斗嘴表达亲近，需要对方接得住；别把关系也当成辩论场。',
    study: '讨论与质疑中理解最快，适合做分享者；给自己定交付时间。',
    growth: '挑一件「不新但重要」的事，把它做完再开下一个。',
  },
  ESTJ: {
    title: '总经理',
    keywords: '务实、能扛、把事推到底',
    oneLine: '目标定了就拆任务、定人、定时间，讨厌含糊。',
    strengths: ['组织与推进力强', '标准清楚，团队知道该做什么', '对结果负责'],
    blindspots: ['节奏太紧，忽视人的感受', '对新方法的容忍度低'],
    work: '适合管理、运营、项目、供应链、政务这类要「把事办成」的岗位。',
    love: '用承担责任表达在意，需要对方直接说需求；记得留不安排的时间。',
    study: '目标拆解 + 打卡推进最有效，适合带小组复习。',
    growth: '在下判断前多问一句「有没有我没想到的难处」。',
  },
  ESFJ: {
    title: '执政官',
    keywords: '周到、热络、把人放在心上',
    oneLine: '习惯先照顾气氛和关系，让事情在人情里办成。',
    strengths: ['组织人际与活动', '记得住每个人的状况', '愿意为集体做脏活累活'],
    blindspots: ['太在意别人评价，容易内耗', '对「不合群」的选项排斥'],
    work: '适合人力、行政、教育、客户、医护、社群运营这类以人为中心的岗位。',
    love: '投入、周到，需要明确的回应与稳定；别把照顾变成控制。',
    study: '在小组里学得最好，讲给别人听会记得更牢。',
    growth: '练习在不解释的情况下做一次自己的选择。',
  },
  ENFJ: {
    title: '主人公',
    keywords: '暖、会带人、看得见潜力',
    oneLine: '天然想把人和事往好的方向推，愿意为别人多走一步。',
    strengths: ['洞察他人需求', '善于组织与鼓舞', '把长期关系经营得住'],
    blindspots: ['过度承担别人的情绪', '为了和谐压下自己的判断'],
    work: '适合教育、管理、培训、公益、品牌这类「带人成长」的岗位。',
    love: '投入且会照顾，需要对方也主动；别把付出当成默认义务。',
    study: '教别人是最好的学法，适合做学习小组的组织者。',
    growth: '把「我该帮」和「不该我扛」分开，先照顾自己的电量。',
  },
  ENTJ: {
    title: '指挥官',
    keywords: '决断、看清、把盘做大',
    oneLine: '看得远也敢拍板，喜欢把资源调到最该去的地方。',
    strengths: ['目标与路径清楚', '能在压力下决断', '擅长组织复杂局面'],
    blindspots: ['节奏压人，忽略情绪成本', '把「效率」当成唯一标准'],
    work: '适合管理、创业、投资、战略、大型项目这类要定方向并扛结果的岗位。',
    love: '用规划和承担表达在意，需要对方能对话；记得把「安排」换成「商量」。',
    study: '先建目标与评估标准，按里程碑推进；警惕只搭框架不落细节。',
    growth: '定期问自己「这件事赢了，人会怎样」，把人的成本算进去。',
  },
};

const SCALE_SAY = {
  1: '完全不像',
  2: '不太像',
  3: '说不准',
  4: '有点像',
  5: '很像我',
};

/** 供面板/工具引导用户答题时展示的问卷（不带答案）。 */
export function mbtiPaper() {
  return {
    system: 'mbti',
    needAnswers: true,
    scale: SCALE_SAY,
    total: QUESTIONS.length,
    dimensions: DIMENSIONS.map((d) => ({ key: d.key, name: d.name, left: d.left, right: d.right, leftSay: d.leftSay, rightSay: d.rightSay, note: d.note })),
    questions: QUESTIONS.map((q, i) => ({ no: i + 1, id: q.id, dim: q.dim, text: q.text })),
    note: '这是一份 MBTI 风格的问卷（不是官方 MBTI 量表）：每题按 1（完全不像我）到 5（很像我）打分，把 24 个分数按顺序交给 answers 即可出类型。题目只作自我参照，不适合用来评价别人的能力或做招聘、晋升等决定。',
  };
}

/** 把 answers 归一成 24 个数（允许少于 24 题，缺的按「不表态」处理；null/0 也算跳过）。 */
function normalizeAnswers(answers) {
  if (!Array.isArray(answers)) {
    throw fail('E_INPUT', 'answers 必须是数组：每题 1–5 分，按 questions 的顺序给；答题前先不带 answers 调一次，拿到题目');
  }
  if (answers.length > QUESTIONS.length) {
    throw fail('E_INPUT', `answers 最多 ${QUESTIONS.length} 个（对应 ${QUESTIONS.length} 题），收到 ${answers.length} 个`);
  }
  const out = [];
  for (let i = 0; i < QUESTIONS.length; i += 1) {
    const raw = answers[i];
    if (raw === undefined || raw === null || raw === '') {
      out.push(null);
      continue;
    }
    const v = Number(raw);
    if (!Number.isInteger(v) || v < 1 || v > 5) {
      throw fail('E_RANGE', `第 ${i + 1} 题的分值必须是 1–5 的整数（1 完全不像，5 很像我），收到「${raw}」`);
    }
    out.push(v);
  }
  return out;
}

/** 净分 → 百分比与强度描述。 */
function strengthOf(pct, answered) {
  if (!answered) return '未作答';
  if (pct <= 0.12) return '临界';
  if (pct <= 0.3) return '轻微';
  if (pct <= 0.6) return '明显';
  return '很强';
}

/**
 * 计分：每题的净分 =（分数 − 3）× 侧向符号（side 为左字母取 +，右字母取 −）。
 * 维度净分 > 0 取左字母，< 0 取右字母，= 0 按维度表的 tie 取（并标「临界」）。
 */
export function buildMbti(input = {}) {
  const answers = normalizeAnswers(input.answers);
  const answeredAll = answers.filter((v) => v !== null).length;
  if (answeredAll < 12) {
    throw fail('E_INPUT', `至少答 ${12} 题才能出口径（现答 ${answeredAll} 题）；可以先不带 answers 调一次，把题目发给用户逐题打分`);
  }
  const dims = DIMENSIONS.map((d) => {
    let sum = 0;
    let answered = 0;
    QUESTIONS.forEach((q, i) => {
      const v = answers[i];
      if (v === null || q.dim !== d.key) return;
      answered += 1;
      sum += (v - 3) * (q.side === d.left ? 1 : -1);
    });
    const maxAbs = answered * 2;
    const pct = maxAbs ? Math.abs(sum) / maxAbs : 0;
    const picked = sum > 0 ? d.left : sum < 0 ? d.right : d.tie;
    return {
      key: d.key,
      name: d.name,
      left: d.left,
      right: d.right,
      leftSay: d.leftSay,
      rightSay: d.rightSay,
      note: d.note,
      sum,
      answered,
      maxAbs,
      pct: Math.round(pct * 1000) / 1000,
      picked,
      strength: strengthOf(pct, answered),
      tie: sum === 0,
    };
  });
  const type = dims.map((d) => d.picked).join('');
  const profile = TYPES[type];
  if (!profile) throw fail('E_SYSTEM', `内部错误：类型 ${type} 没有对应文案`);
  const stack = (FUNCTION_STACKS[type] || []).map((f) => ({ code: f, say: FUNCTIONS[f] || '' }));
  return {
    system: 'mbti',
    type,
    title: profile.title,
    keywords: profile.keywords,
    oneLine: profile.oneLine,
    dims: dims.map(({ sum, maxAbs, answered, ...rest }) => ({ ...rest, sum, maxAbs, answered })),
    profile: {
      title: profile.title,
      keywords: profile.keywords,
      oneLine: profile.oneLine,
      strengths: profile.strengths.slice(),
      blindspots: profile.blindspots.slice(),
      work: profile.work,
      love: profile.love,
      study: profile.study,
      growth: profile.growth,
      stack,
    },
    answered: answeredAll,
    skipped: QUESTIONS.length - answeredAll,
    total: QUESTIONS.length,
    note: '四维各 6 题、李克特 1–5 计分，按维度净分取字母（平手时取 I / N / F / P 一侧并标「临界」）。这是 MBTI 风格的问卷测算，不是官方量表；类型只作自我参照，不是能力评价，也不用它给人下结论。',
  };
}
