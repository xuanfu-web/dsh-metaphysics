// 中医体质（九种体质）：按中华中医药学会《中医体质分类与判定》的条目结构做的简化问卷——
// 九个体质各 5 条自评题，1–5 计分，用「转化分」判主次体质。
//
// 口径（沿用通行标准，条目数是压缩过的）：
//   转化分 = [(原始分 − 条目数) / (条目数 × 4)] × 100
//   偏颇体质：≥40 为「是」，30–39 为「有倾向」，<30 为「否」
//   平和质：≥60 且其余八种都 <30 为「是」；≥60 且其余都 <40 为「基本是」
// 题目与阈值取自公开标准的结构，文案为白话重写；判定只作自我观察的参照，不是医学诊断。
import { fail } from './fail.js';

const ITEMS = 5;

/** 九种体质：判定题 + 表现 + 调养方向。 */
export const CONSTITUTIONS = [
  {
    key: 'pinghe',
    name: '平和质',
    oneLine: '阴阳气血相对匀，吃得下、睡得着、恢复快。',
    trait: '精力够用，耐受冷热，情绪起伏不大，睡醒后能缓过来。',
    tendency: '这种底子最省心，重点是别自己把它折腾坏。',
    care: [
      '食：什么都能吃一点，别追一个味道到底；七分饱比补品有用。',
      '起居：睡点固定比睡够时长更关键，熬夜是最快的消耗方式。',
      '动：每周三四次微汗即可，不必练到力竭。',
      '情志：留一点「什么都不干」的时间，别把日程排满。',
    ],
    questions: [
      '你精力充沛，不太容易觉得累',
      '你能耐受冷也能耐受热，换季不太难受',
      '你胃口稳定，吃完不胀不反酸',
      '你睡得踏实，醒来精神能回来',
      '你情绪起伏不大，遇事能较快平复',
    ],
  },
  {
    key: 'qixu',
    name: '气虚质',
    oneLine: '气不够用：容易累、说话没劲、稍动就出汗。',
    trait: '容易疲乏、气短、说话声音低，活动后出汗多，容易感冒。',
    tendency: '不是懒，是电量掉得快；硬撑只会更空。',
    care: [
      '食：主食别减太狠，山药、小米、黄豆这类平补的东西比猛补更合适。',
      '起居：宁可早睡半小时，也别靠咖啡顶着；午间闭眼十分钟有用。',
      '动：散步、八段锦这类「不喘」的运动优先，别一上来就高强度。',
      '情志：少做长时间的强撑式社交，累了就直说。',
    ],
    questions: [
      '你容易疲乏，休息后也不太容易缓过来',
      '你说话声音偏低，说久了觉得没气',
      '你稍一活动就比别人容易出汗',
      '你容易感冒，或者感冒后拖得久',
      '你吃完饭容易腹胀、消化慢',
    ],
  },
  {
    key: 'yangxu',
    name: '阳虚质',
    oneLine: '火力不足：怕冷、手脚凉、喜欢热的。',
    trait: '畏寒怕冷、手脚发凉，吃凉的容易不舒服，大便偏稀，精神偏静。',
    tendency: '不是矫情，是产热不够；冷饮和空调直吹对这个体质最伤。',
    care: [
      '食：热的、熟的优先；姜、羊肉、桂圆可以吃，但别一顿猛补。',
      '起居：腰腹和脚要保暖，睡前泡脚比吃补药直接。',
      '动：白天动起来产热，晒背十分钟比闷在屋里强。',
      '情志：冬天与阴雨天情绪容易低，把户外时间挪到中午。',
    ],
    questions: [
      '你比一般人怕冷，别人不觉得冷时你已经要加衣服',
      '你的手脚常年偏凉',
      '你喝冷饮或吃凉的东西后容易不舒服',
      '你大便偏稀，或者一受凉就腹泻',
      '你精神偏静，不太想动',
    ],
  },
  {
    key: 'yinxu',
    name: '阴虚质',
    oneLine: '水不够：口干、手心热、睡不沉。',
    trait: '口燥咽干、手足心热、容易上火、睡浅多梦、大便偏干。',
    tendency: '不是火气大，是水少；越熬夜越明显。',
    care: [
      '食：银耳、百合、梨、黑芝麻这类润的；辛辣烧烤少碰。',
      '起居：熬夜对这个体质伤害最直接，十一点前躺下比什么方子都强。',
      '动：别在正午暴晒下猛练，选傍晚、选温和的。',
      '情志：容易急、容易烦，发现自己在赶时间就先停三分钟。',
    ],
    questions: [
      '你常觉得口干、咽干，想喝水',
      '你手足心发热，或者下午容易烘热',
      '你容易上火，口腔溃疡或脸上起东西',
      '你睡得不沉，多梦，容易醒',
      '你容易大便干结，排便不太顺畅',
    ],
  },
  {
    key: 'tanshi',
    name: '痰湿质',
    oneLine: '水湿停着走不动：身重、腹胀、容易困。',
    trait: '身体沉重、腹部松软肥满、容易困倦、口中黏腻、痰多。',
    tendency: '不是吃太多，是运化不动；久坐加甜腻会加重。',
    care: [
      '食：少甜少油少夜宵；薏米、赤小豆、冬瓜这类利湿的可以常吃。',
      '起居：别吃完就躺；房间保持干燥通风。',
      '动：出汗是重点，快走、跳绳这类能真出汗的优先。',
      '情志：困倦时容易拖，把要紧事放在上午做。',
    ],
    questions: [
      '你常觉得身体沉重、不清爽',
      '你腹部松软，容易胀',
      '你容易困倦，睡够了也昏沉',
      '你口中黏腻，或者痰偏多',
      '你脸上或头发容易出油',
    ],
  },
  {
    key: 'shire',
    name: '湿热质',
    oneLine: '又湿又热：脸油、口苦、容易长东西。',
    trait: '面垢油光、容易生痤疮、口苦口干、大便黏滞、小便偏黄。',
    tendency: '不是「火大」这么简单，湿裹着热，清得太猛反而伤脾。',
    care: [
      '食：少酒少辣少油炸；绿豆、冬瓜、苦瓜可以吃，但别长期只吃寒凉。',
      '起居：别熬夜加夜宵，这两样凑一起最容易出湿热。',
      '动：规律出汗，运动后及时擦干换衣。',
      '情志：急躁时先降一件事的优先级，别同时开五个头。',
    ],
    questions: [
      '你脸上或头皮容易出油',
      '你容易长痘、长疖子或起湿疹',
      '你常觉得口苦或口干',
      '你大便黏滞，不容易冲干净',
      '你的小便颜色偏黄、量偏少',
    ],
  },
  {
    key: 'xueyu',
    name: '血瘀质',
    oneLine: '血行不畅：肤色暗、易有瘀青、痛处固定。',
    trait: '面色偏暗、口唇偏紫、容易出现瘀斑、身体某处固定刺痛。',
    tendency: '久坐不动和长期受寒是两大来源。',
    care: [
      '食：山楂、黑木耳、玫瑰花这类活血的可以常吃；经期量多时别过量。',
      '起居：别久坐，每小时起来走两分钟。',
      '动：有氧为主，练到微微出汗；拉伸比猛练更对症。',
      '情志：闷着不说话最容易瘀，找个人把话说完。',
    ],
    questions: [
      '你面色或口唇偏暗、偏紫',
      '你身上容易出现瘀青，磕一下就好久不退',
      '你身体某处有固定的刺痛或胀痛',
      '你皮肤偏干，或者容易起红血丝',
      '你记性下降，或者常常觉得「脑子转不动」',
    ],
  },
  {
    key: 'qiyu',
    name: '气郁质',
    oneLine: '气堵着不顺：胸闷、爱叹气、情绪闷。',
    trait: '情绪低沉、容易紧张焦虑、胸闷叹气、咽部有异物感、睡不安稳。',
    tendency: '不是想太多，是气机不通；长期憋着会连带影响睡眠和胃口。',
    care: [
      '食：少食多餐，别用吃东西压情绪；玫瑰花、陈皮、佛手可以泡水。',
      '起居：把「必须做」的事减到三件以内，留出空档。',
      '动：唱歌、快走、拉伸这类能「把气呼出去」的最有用。',
      '情志：写下来比在脑子里绕有效，哪怕只写三行。',
    ],
    questions: [
      '你常觉得闷闷不乐，情绪提不起来',
      '你容易紧张、焦虑，或者心里放不下事',
      '你常叹气，觉得胸口不畅',
      '你咽喉像有东西堵着，吞不下也吐不出',
      '你睡不安稳，容易醒或者多梦',
    ],
  },
  {
    key: 'tebing',
    name: '特禀质',
    oneLine: '对外界刺激反应大：过敏、易起反应。',
    trait: '容易过敏（鼻炎、皮肤、食物）、对季节与气味敏感、易起荨麻疹。',
    tendency: '不是体质弱，是反应阈值低；避开诱因比「增强体质」更直接。',
    care: [
      '食：把自己的过敏原记下来，比记一堆「该吃什么」有用。',
      '起居：换季前把床品洗晒一遍，花粉季回家先洗脸。',
      '动：室内温和运动为主，避开花粉浓度高的时段户外跑。',
      '情志：反复发作容易烦，把「避免诱因」当成日常动作而不是任务。',
    ],
    questions: [
      '你容易打喷嚏、流清涕，或者鼻子痒',
      '你皮肤容易起荨麻疹、湿疹或红疹',
      '你对某些食物或药物有过敏反应',
      '你对季节变化、气味或灰尘特别敏感',
      '你换环境后容易不舒服（比如新房间、新城市）',
    ],
  },
];

/** 题目扁平成一张卷：每题带所属体质，顺序按体质分组。 */
export const QUESTIONS = CONSTITUTIONS.flatMap((c) => c.questions.map((q, i) => ({ i: c.key + '-' + (i + 1), key: c.key, name: c.name, text: q })));

export const SCALE_OPTIONS = [
  { v: 1, label: '没有' },
  { v: 2, label: '很少' },
  { v: 3, label: '有时' },
  { v: 4, label: '经常' },
  { v: 5, label: '总是' },
];

/** 转化分：0–100，保留一位小数。 */
function converted(raw, n) {
  return Math.round(((raw - n) / (n * 4)) * 1000) / 10;
}

function levelOf(conv, isPinghe) {
  if (isPinghe) return conv >= 60 ? '是' : conv >= 50 ? '倾向是' : '否';
  return conv >= 40 ? '是' : conv >= 30 ? '倾向是' : '否';
}

/** 卷子：不带 answers 时先给题，别让模型替人打分。 */
export function constitutionPaper() {
  return {
    system: 'constitution',
    paper: true,
    total: QUESTIONS.length,
    scaleCount: CONSTITUTIONS.length,
    itemsPerScale: ITEMS,
    scale: SCALE_OPTIONS,
    scales: CONSTITUTIONS.map((c) => ({ key: c.key, name: c.name, oneLine: c.oneLine, from: QUESTIONS.findIndex((q) => q.key === c.key) })),
    questions: QUESTIONS.map((q, i) => ({ no: i + 1, key: q.key, name: q.name, text: q.text })),
    howto: '按最近一年的真实感受给每题打 1–5 分（1 没有 / 2 很少 / 3 有时 / 4 经常 / 5 总是），'
      + '拿不准的题传 null 跳过；把分数按题目顺序填成 answers 数组再调一次。',
    note: '九种体质各 5 题，共 45 题。这是按通行标准结构做的简化问卷，不是量表原件；结果只作自我观察的参照。',
  };
}

/**
 * 体质判定。
 * @param {{answers?: Array<number|null>}} input answers 按题目顺序的 1–5 分，null 表示跳过
 */
export function buildConstitution(input) {
  const answers = input && Array.isArray(input.answers) ? input.answers : null;
  if (!answers) throw fail('E_INPUT', '体质判定需要 answers（按题目顺序的 1–5 分）；先不带 answers 调一次拿问卷');
  const total = QUESTIONS.length;
  // 长度不匹配是最常见的错：短一位就会整体错位，静默按「第 N 题」算下去更糟
  if (answers.length !== total) {
    throw fail('E_INPUT', `answers 要 ${total} 个（九种体质各 5 题），收到 ${answers.length} 个；跳过的题传 null，不要缩短数组`);
  }
  const seen = answers.map((v, i) => {
    if (v === null || v === undefined) return null;
    const n = Number(v);
    if (!Number.isInteger(n) || n < 1 || n > 5) {
      throw fail('E_INPUT', `第 ${i + 1} 题的分数要是 1–5 的整数或 null，收到「${String(v).slice(0, 16)}」`);
    }
    return n;
  });
  const answered = seen.filter((x) => x !== null).length;
  if (!answered) throw fail('E_INPUT', 'answers 全为 null：至少答几题才能判体质，否则每种都是同一个分数');

  const scales = CONSTITUTIONS.map((c) => {
    const idx = [];
    QUESTIONS.forEach((q, i) => { if (q.key === c.key) idx.push(i); });
    const vals = idx.map((i) => seen[i]).filter((x) => x !== null);
    // 未答的题按「3（有时）」补齐：直接丢题会抬高转化分，把没答的人判成更偏
    const raw = idx.reduce((sum, i) => sum + (seen[i] === null ? 3 : seen[i]), 0);
    const conv = converted(raw, idx.length);
    return {
      key: c.key,
      name: c.name,
      oneLine: c.oneLine,
      trait: c.trait,
      tendency: c.tendency,
      care: c.care.slice(),
      answered: vals.length,
      skipped: idx.length - vals.length,
      raw,
      max: idx.length * 5,
      converted: conv,
      level: levelOf(conv, c.key === 'pinghe'),
    };
  });

  const pinghe = scales.find((s) => s.key === 'pinghe');
  const biased = scales.filter((s) => s.key !== 'pinghe').slice().sort((a, b) => b.converted - a.converted);
  const others = biased.map((s) => s.converted);
  const othersMax = others.length ? Math.max(...others) : 0;
  // 平和质按标准要「其余八种都很低」才算成立：光自己分高不算
  let pingheLevel = pinghe.level;
  if (pinghe.converted >= 60) {
    if (othersMax < 30) pingheLevel = '是';
    else if (othersMax < 40) pingheLevel = '基本是';
    else pingheLevel = '否';
  }
  const pingheFinal = { ...pinghe, level: pingheLevel };

  const primaryBiased = biased.find((s) => s.level === '是') || biased[0];
  const hasBiased = biased.some((s) => s.level === '是' || s.level === '倾向是');
  const isPinghe = pingheLevel === '是' || pingheLevel === '基本是';
  const primary = isPinghe && !biased.some((s) => s.level === '是') ? pingheFinal : primaryBiased;
  const secondary = biased.find((s) => s.key !== primary.key && s.converted >= 30) || null;
  const mingled = biased.filter((s) => s.level === '是' && s.key !== primary.key && (!secondary || s.key !== secondary.key)).map((s) => s.name);

  // 全选同一项等于没区分：转化分会整齐地落在 50 上下，把人判成「九种都偏」。
  // 这种卷子只提示、不改判定门槛——门槛一改就和公开标准的口径分叉了。
  const vals = seen.filter((x) => x !== null);
  const flat = vals.length >= 10 && new Set(vals).size === 1;
  const main = primary.key === 'pinghe' ? pingheFinal : primary;
  return {
    system: 'constitution',
    meta: { answered, total, scaleCount: CONSTITUTIONS.length, itemsPerScale: ITEMS, scale: SCALE_OPTIONS },
    scales: scales.map((s) => (s.key === 'pinghe' ? { ...s, level: pingheLevel } : s)),
    primary: { key: main.key, name: main.name, converted: main.converted, level: main.level, oneLine: main.oneLine, trait: main.trait, tendency: main.tendency },
    secondary: secondary ? { key: secondary.key, name: secondary.name, converted: secondary.converted, level: secondary.level } : null,
    mingled,
    pinghe: { converted: pinghe.converted, level: pingheLevel },
    balanced: isPinghe && !biased.some((s) => s.level === '是'),
    hasTendency: hasBiased,
    flat,
    care: main.care.slice(),
    top: biased.slice(0, 3).map((s) => ({ name: s.name, converted: s.converted, level: s.level })),
    note: '九种体质各 5 题的简化问卷，转化分按 [(原始分 − 题数) / (题数 × 4)] × 100 换算；'
      + '偏颇质 ≥40 判「是」、30–39 判「有倾向」，平和质要 ≥60 且其余八种都低才成立。'
      + '体质是长期倾向，不是当下病名；有具体不适请就医，这份结果不与八字、星座互证。'
      + (flat ? ' 本次每题都选了同一个选项，问卷对你的区分度不足，主次体质仅供参考。' : ''),
  };
}