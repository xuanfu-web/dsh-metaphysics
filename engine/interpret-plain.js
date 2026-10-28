// 白话层：把「专业表述」翻译成「问的人能读懂的话」
//
// 设计原则：
//  · 只从盘面已有字段推导，不编造盘上没有的东西；
//  · 一律用倾向性措辞（避讳「一定/必然/注定」这类绝对化表述）；
//  · 每个字段都可能缺失（海外盘、静卦、缺资料），取不到就整句不出，绝不输出 undefined；
//  · 与 interpret.js 无循环依赖：需要的外部常量（档位文案等）由调用方通过 ctx 传入。

const s = (v, fallback = '') => (v === undefined || v === null || v === '' ? fallback : String(v));
const join = (arr) => (Array.isArray(arr) ? arr.filter(Boolean).join('') : '');
const has = (v) => (Array.isArray(v) ? v.length > 0 : v !== undefined && v !== null && v !== '');

// 旺衰 → 生活化比喻（这是「说人话」的核心：把分数讲成体感）
const STRENGTH_PLAIN = {
  身强: '底子偏足、抗压能力好，但容易自己给自己加码，学会收力比使劲更重要',
  偏强: '底子略足，扛得住事，也容易把事都往自己身上揽',
  中和: '力量比较匀，属于「给什么环境就长出什么样子」的类型',
  偏弱: '底子偏薄，靠外部支援比硬扛有效，选对圈子与节奏很关键',
  身弱: '底子偏薄，先修恢复力再谈冲刺，硬撑的性价比最低',
};

// 卦体关系 → 生活化一句话（六冲六合讲聚散，伏吟讲原地，反吟讲反复）
const PLAIN_BODY = {
  六冲卦: '这一卦是「六冲」，事情起落快，急事反而好办，拖久了的人事容易散。',
  六合卦: '这一卦是「六合」，容易谈成，也容易黏住不放。',
  变六冲: '往下走会散，收尾别拖。',
  变六合: '往下走会合，事情倾向于延续下去。',
  内卦伏吟: '事情卡在原地打转，想动但动不了。',
  外卦伏吟: '外面那层没变，看起来在动，其实格局照旧。',
  内卦反吟: '反复在自己这一头，改了又改回来。',
  外卦反吟: '外面反复，对方或环境会来回拉扯。',
  化进神: '有一爻在往上走，顺着这股劲推比往回拉顺。',
  化退神: '有一爻在往后退，别按原来的势头硬推。',
};

/**
 * 六爻卦体 → 一句白话。
 * 标签可能带爻位（「化进神 5」），所以按前缀匹配；
 * 主句取标签顺序里第一个能说的，化进/化退作为补充句跟在后面（它们只说某一爻，不覆盖全局）。
 */
function bodyPlainOf(labels) {
  const keyOf = (l) => Object.keys(PLAIN_BODY).find((k) => l === k || l.startsWith(`${k} `)) || '';
  const primary = labels.find((l) => keyOf(l));
  const main = primary ? PLAIN_BODY[keyOf(primary)] : '';
  const extra = labels
    .filter((l) => l !== primary && /^化[进退]神 /.test(l))
    .map((l) => PLAIN_BODY[keyOf(l)])
    .filter(Boolean);
  return main + extra.join('');
}

// 询问方向 → 该往哪一节看
const DIR_SECTION = {
  wealth: '「工作与职业选择」与「时间窗」',
  career: '「事业发展」与「时间窗」',
  love: '「爱情与感情」',
  health: '「健康状况」',
  study: '「事业发展」与「时间窗」',
  travel: '「整体运势」与「时间窗」',
  general: '「整体运势」与「看盘顺序」',
};

/** 一句话直答：先回答「你问的事」，再指路到具体小节 */
export function buildAnswer(r, ask, ctx = {}) {
  if (!r || !r.system) return '';
  const q = s(ask && ask.question).trim();
  const dir = (ask && ask.direction) || 'general';
  // 只有八字的维度与「时间窗」是固定名称，其余体系用中性说法，避免指向不存在的小节
  const where = r.system === 'bazi'
    ? (DIR_SECTION[dir] || DIR_SECTION.general)
    : '下面与你的问题最贴近的那一节';
  const head = q ? `你问的是「${q}」。` : '';

  if (r.system === 'bazi') {
    const dm = r.dayMaster || {};
    const st = r.strength || {};
    const ys = (r.frame && r.frame.yongshen) || {};
    const favor = join(ys.favor);
    const avoid = join(ys.avoid);
    const ln = (r.liunian || [])[0];
    const parts = [
      head + `先说结论：你是${s(dm.stem)}${s(dm.element)}日主，命局${s(st.level, '待定')}` +
        `${favor ? `，顺${favor}、忌${avoid}——往${favor}的方向安排事情会更省力` : ''}。`,
      ln && ln.ganzhi
        ? `${s(ln.year)} 年是${ln.ganzhi}年（${s(ln.luck && ln.luck.tier, '平')}），这是「大环境」这一层。`
        : '',
      `具体到你问的这件事，重点看${where}。`,
    ];
    return parts.filter(Boolean).join('');
  }

  if (r.system === 'ziwei') {
    const soul = r.soul || {};
    const body = r.body || {};
    const bureau = r.bureau || {};
    const md = r.lifeMaster || '';
    return [
      head + `先说结论：你的命宫落${s(soul.branch, '—')}宫` +
        `${bureau.name ? `、${bureau.name}` : ''}${md ? `，命主${md}` : ''}` +
        `${body.lands ? `，身宫落在「${body.lands}」——这张盘的重心在这件事上` : ''}。`,
      `具体到你问的这件事，重点看${where}。`,
    ].join('');
  }

  if (r.system === 'liuyao') {
    const ben = r.ben || {};
    const moving = (r.cast && r.cast.movingPositions) || [];
    const bian = r.bian || {};
    const labels = (r.body && Array.isArray(r.body.labels)) ? r.body.labels : [];
    // 六冲六合伏吟反吟里挑最贴近当下局面的一句，避免四句叠着说
    const plainBody = bodyPlainOf(labels);
    return [
      head + `先说结论：本卦是${s(ben.name, '—')}` +
        `${ben.palace ? `（${ben.palace}）` : ''}` +
        `${moving.length ? `，第 ${moving.join('、')} 爻动，变为${s(bian.name, '—')}` : '，六爻安静没有动爻'}。` +
        `${plainBody}`,
      '断卦的落点在「世爻」（代表你）和「动爻」（事情的推动点），下面「看盘顺序」就按这个次序展开。',
    ].join('');
  }

  return head ? `${head}下面按五个维度拆开看，重点看${where}。` : `下面按五个维度拆开看，重点看${where}。`;
}

/** 说人话整段：去掉术语，用生活语言讲这张盘的整体气质 */
export function buildPlain(r, ask, ctx = {}) {
  if (!r || !r.system) return '';
  if (r.system === 'bazi') {
    const st = r.strength || {};
    const ys = (r.frame && r.frame.yongshen) || {};
    const favor = join(ys.favor);
    const avoid = join(ys.avoid);
    const strength = STRENGTH_PLAIN[st.level] || '力量偏中性';
    const tiaohou = ys.tiaohou && ys.tiaohou.note ? `另外，${ys.tiaohou.note}，所以「暖一点、亮一点」的环境通常更舒服。` : '';
    return `你的命局属于「${s(st.level, '中性')}」：${strength}。` +
      `${favor ? `能补${favor}的环境（行业、方位、作息、相处的人）会让你省力；${avoid ? `而${avoid}偏重的场合容易空耗，能绕就绕。` : ''}` : ''}` +
      tiaohou;
  }
  if (r.system === 'ziwei') {
    const soul = r.soul || {};
    const body = r.body || {};
    return `紫微看的是「你与环境怎么互动」。命宫落${s(soul.branch, '—')}宫，说明你做事的第一反应是从这个宫位的气质出发` +
      `${body.lands ? `；身宫在「${body.lands}」，意味着真正让你上心的，是${body.lands}这件事` : ''}。`;
  }
  if (r.system === 'liuyao') {
    const ben = r.ben || {};
    const moving = (r.cast && r.cast.movingPositions) || [];
    const labels = (r.body && Array.isArray(r.body.labels)) ? r.body.labels : [];
    const plainBody = bodyPlainOf(labels);
    return `${s(ben.name, '这一卦')}讲的是一个「${moving.length ? '正在动、还会变' : '暂时不动、先看清'}」的局面——` +
      `${moving.length ? '有动爻，说明事情还有转圜空间，不是死局。' : '六爻安静，说明当下更该观察而不是硬推。'}` +
      `${plainBody}`;
  }
  return '';
}

/** 每维一句白话（仅在有盘面数据支撑时给出，避免空话） */
export function dimensionPlain(key, r, ctx = {}) {
  if (!r || r.system !== 'bazi') return '';
  const ys = (r.frame && r.frame.yongshen) || {};
  const favor = join(ys.favor);
  const avoid = join(ys.avoid);
  const st = r.strength || {};
  if (key === 'overall') return `一句话：底子${s(st.level, '中性')}，往${favor || '有利方向'}走省力。`;
  if (key === 'work') return `一句话：挑${favor || '喜用'}属性的活儿，比硬碰${avoid || '忌神'}省力。`;
  if (key === 'career') return `一句话：你的上升方式，偏向把${favor || '长处'}做成看得见的成果。`;
  if (key === 'love') return '一句话：关系里先看清自己要什么，再决定推进速度。';
  if (key === 'health') return '一句话：作息稳定比任何调理都优先。';
  return '';
}

// 术语白话表：只解释本篇真正出现的词
const GLOSSARY = [
  ['日主', '你出生那天对应的天干，代表「你自己」，整张盘都围着它转。'],
  ['用神', '这张盘里最需要补的那一类力量，顺着它做事更省力。'],
  ['忌神', '补得越多越别扭的那一类力量，不是坏东西，只是对你性价比低。'],
  ['调候', '按出生季节调温补缺：冬天的盘怕冷，夏天的盘怕燥。'],
  ['格局', '把整张盘的结构归成一个类型，用来看「你适合怎么打」。'],
  ['十神', '把五行关系翻译成人事：财＝资源、官杀＝规则与压力、印＝支持、食伤＝表达、比劫＝同伴。'],
  ['月令', '出生的月份，是判断强弱最关键的一个位置。'],
  ['日支', '日柱的地支，也叫「配偶宫」，看亲密关系的第一落点。'],
  ['大运', '十年一换的大阶段，决定这十年顺不顺手。'],
  ['流年', '每一年的干支，看当年的具体环境。'],
  ['空亡', '落到空亡的字，力量打折，事情容易「看着有、抓不住」。'],
  ['伏神', '卦里没出现的六亲，藏在同宫首卦的对应爻下，用时才看得见。'],
  ['世应', '世爻代表你，应爻代表对方或外部环境。'],
  ['动爻', '会变的爻，是事情「往哪走」的推动点。'],
  ['纳甲', '给六个爻配上天干地支，六亲与生克才有依据。'],
  ['四化', '禄权科忌四种变化，标记星曜在这一步运里扮演什么角色。'],
  ['大限', '紫微里的十年阶段，作用类似八字的「大运」。'],
];

/** 同一个术语在不同体系里含义不同，必须分体系解释，否则会给出错误定义 */
const GLOSSARY_BY_SYSTEM = {
  liuyao: {
    用神: '你问的这件事对应的那一类六亲，断卦先把它找出来。',
    月令: '起卦时的月份，用来看各爻旺不旺。',
    日支: '起卦当天的地支，与月建一起决定爻的力量。',
    大运: '六爻不看大运，这里只取当前这一件事的象。',
    流年: '六爻一般不看流年，看的是眼下这一卦的时段。',
  },
  ziwei: {
    用神: '紫微斗数以「用神宫」的强弱看事情，不取五行喜忌那套。',
    日主: '紫微斗数不看日主，看的是命宫与星曜组合。',
    十神: '紫微斗数用四化与星情，不用十神。',
  },
};

/** 术语白话：只列正文里真出现过的词；同名词按体系取对应释义 */
export function buildGlossary(texts, system) {
  const body = (Array.isArray(texts) ? texts : [texts]).filter(Boolean).join('');
  if (!body) return [];
  const override = GLOSSARY_BY_SYSTEM[system] || {};
  return GLOSSARY
    .filter(([term]) => body.includes(term))
    .map(([term, plain]) => ({ term, plain: override[term] || plain }))
    .slice(0, 10);
}

const FOLLOWUPS = {
  career: ['这份工作要不要动，明年哪几个月是窗口？', '和上级的关系该硬碰还是绕开？', '现在转方向，代价主要在哪儿？'],
  wealth: ['这笔钱现在投出去合适吗？', '我的财主要来自工资还是副业？', '今年哪段时间最容易破财？'],
  love: ['这段关系能走到哪一步？', '什么时候适合把关系定下来？', '我在关系里最容易忽略什么？'],
  health: ['哪段时间身体最需要留意？', '作息怎么调最划算？', '查体和作息之外，还有什么是能自己控制的？'],
  study: ['今年再考一次，胜算在哪、短板在哪？', '复习节奏该怎么排？', '要不要换目标院校或岗位？'],
  travel: ['这次出门顺不顺，哪天走更好？', '换个城市生活，合不合适？'],
  general: ['今年最该抓的一件事是什么？', '最该避开的坑在哪？', '接下来三个月，什么时间点值得留意？'],
};

/** 追问建议：把「还能问什么」具体化，降低二次提问的门槛 */
export function buildFollowups(r, ask) {
  const dir = (ask && ask.direction) || 'general';
  const list = FOLLOWUPS[dir] || FOLLOWUPS.general;
  return list.slice(0, 3);
}
