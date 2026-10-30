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

// 伏神出伏的四档 → 一句白话；只讲条件，不把它说成应期
const FUSHEN_PLAIN = {
  可出: '眼下的条件算是有助无压，属于「出得来」的一档——这是条件，不等于马上应验。',
  有助有压: '眼下是一边有助、一边有压，出得来，但得费点劲。',
  受压难出: '眼下被上面的力量压着，不太容易露头，先别急着硬推。',
  未得助: '眼下暂时没借到力，还得等条件转过来。',
  飞伏未知: '飞伏关系看不全，这一层先不下判断。',
};

/**
 * 用神 → 一句白话。
 * 只说「用神落在哪、有没有动、要不要往深处找」，不替人断成败。
 */
function usePlainOf(ug, fa) {
  if (!ug || !ug.liuqin) return '';
  if (ug.found.length) {
    const pos = ug.found.map((f) => `第${f.position}爻`).join('、');
    const moving = ug.found.some((f) => f.moving);
    const who = ug.byShi ? '代表你自己' : `就是「${ug.liuqin}」这一类事`;
    return `你问的这件事，在卦里对应${pos}${who}——${moving ? '这一爻还在动，说明事情正在推进' : '这一爻没动，先按现状看'}。`;
  }
  if (ug.fushen.length) {
    const f = ug.fushen[0];
    const hit = fa && Array.isArray(fa.items) ? fa.items.find((x) => x.position === f.position) : null;
    const tail = hit ? ` ${FUSHEN_PLAIN[hit.verdict] || ''}` : '';
    return `你问的这件事，卦面上没有直接露出来，得往深处找：它藏在第${f.position}爻下面（伏神），与上面的关系是「${f.relation || '—'}」，要借力才出得来。${tail}`;
  }
  return '';
}

/**
 * 用神旺衰 → 一句白话。
 */
function useStrengthPlain(st) {
  if (!st || !st.lines || !st.lines.length) return '';
  const dead = st.lines.filter((l) => /死|囚/.test(l.monthState) || l.monthChong);
  const live = st.lines.filter((l) => /旺|相/.test(l.monthState));
  const when = st.month && st.month.branch ? `眼下这阵子（${st.month.branch}月）` : '起卦这段日子';
  if (dead.length && !live.length) return `${when}对这件事不太帮忙，气有点被压着——先别急着硬推，等风向转。`;
  if (live.length && !dead.length) return `${when}对这件事是帮着的，气正在往上走，能推就趁现在。`;
  return `${when}对这件事有帮有压，一半的力要自己挣——结果更看你怎么走。`;
}

// 化进 / 化退的力重 → 一句白话：方向之外，时令托不托着
function jinTuiPlain(r) {
  const jp = r && r.jinTuiPower;
  if (!jp || !Array.isArray(jp.lines) || !jp.lines.length) return '';
  const sayOf = (l) => (l.verdict === '后劲足' ? '时令托着，后劲足'
    : l.verdict === '后劲有限' ? '时令不太托，后劲有限'
      : l.verdict === '进得虚' ? '时令最背，进也是虚进'
        : l.verdict === '退得缓' ? '时令还托着，退得慢'
          : l.verdict === '退得实' ? '时令也不托，退得实'
            : l.verdict === '月破失据' ? '又正好逢月破，进退都站不稳'
              : '缺月建，先只当方向看');
  return `动爻的进退还要看时令：${jp.lines.map((l) => `${l.position}爻${l.from}→${l.to}${l.type}，${sayOf(l)}`).join('；')}。`;
}

// 全卦逐爻旺衰 → 一句白话：整张卦的气偏在哪一头（与用神那一句分开说）
function hexStrengthPlain(hs) {
  if (!hs || !hs.counts) return '';
  const up = (hs.counts.旺 || 0) + (hs.counts.相 || 0);
  const down = (hs.counts.囚 || 0) + (hs.counts.死 || 0);
  const when = hs.month && hs.month.branch ? `按${hs.month.branch}月这段时令看` : '按起卦这天看';
  const shi = hs.shi && hs.shi.monthState !== 'unknown' ? `代表你的世爻在${hs.shi.monthState}` : '';
  if (up >= 4 && down === 0) return `${when}，整张卦六爻的气多数是顺的，${shi}，眼下算是好推的时候。`;
  if (down >= 4 && up === 0) return `${when}，整张卦六爻的气多数被压着，${shi}，这几天更适合等而不是冲。`;
  return `${when}，整张卦六爻有顺有逆（旺相 ${up} 爻、囚死 ${down} 爻）${shi ? `，${shi}` : ''}，成不成要看具体哪一爻在动。`;
}

// 三方四正复合飞化 → 一句白话：四股力有没有挤到同一处
function flyCompositePlain(fc) {
  if (!fc || !Array.isArray(fc.targets)) return '';
  const hub = fc.targets.find((t) => t.count >= 2);
  const self = fc.groups && fc.groups.selfHua && fc.groups.selfHua.length
    ? '其中有的宫自己化出去又落回自己，容易表现为「想得多、落得少」。'
    : '';
  if (!hub) return `把命宫连同对宫、两个三合宫一起看，四股力飞出去没有挤到同一处，这几件事之间牵连不深。${self}`;
  return `把命宫连同对宫与两个三合宫一起看，${hub.incoming.length} 股力最后挤在「${String(hub.palace).replace(/宫$/, '')}」这件事上——这件事会把好几个方面的劲都吸过来。${self}`;
}

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
    if (!q) parts[parts.length - 1] = `没指定问题，就按${where}的顺序往下看。`;
    return parts.filter(Boolean).join('');
  }

  if (r.system === 'ziwei') {
    const soul = r.soul || {};
    const body = r.body || {};
    const bureau = r.bureau || {};
    const md = r.lifeMaster || '';
    const ji = r.flyChains && r.flyChains.忌;
    const plainFly = ji && ji.steps.length
      ? `还有一条线值得留意：${ji.path.map((p) => p.replace(/宫$/, '')).join(' → ')}——这几件事在你身上是连着转的，一件卡住，容易牵动下一件。`
      : '';
    return [
      head + `先说结论：你的命宫落${s(soul.branch, '—')}宫` +
        `${bureau.name ? `、${bureau.name}` : ''}${md ? `，命主${md}` : ''}` +
        `${body.lands ? `，身宫落在「${body.lands}」——这张盘的重心在这件事上` : ''}。`,
      plainFly,
      flyCompositePlain(r.flyComposite),
      q ? `具体到你问的这件事，重点看${where}。` : `没指定问题，就按${where}的顺序往下看。`,
    ].filter(Boolean).join('');
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
        `${plainBody}${usePlainOf(r.useGod, r.fushenAccess)}${useStrengthPlain(r.useGodStrength)}${jinTuiPlain(r)}${hexStrengthPlain(r.hexStrength)}`,
      '断卦的落点在「世爻」（代表你）和「动爻」（事情的推动点），下面「看盘顺序」就按这个次序展开。',
    ].join('');
  }

  // 其余体系没有固定小节名：有问才指路；没问就按顺序读，别假装知道「你的问题」
  if (head) return `${head}下面按五个维度拆开看，重点看${where}。`;
  // 奇门没有五维，内容按排盘事实/用神/宫位条件几节走，不能跟着说「五个维度」
  if (r.system === 'qimen') {
    const dirTip = dir !== 'general' && ask && ask.directionLabel ? `，取「${ask.directionLabel}」方向的用神` : '';
    return `下面按排盘事实、用神、宫位条件几节展开${dirTip}。`;
  }
  if (dir !== 'general' && ask && ask.directionLabel) {
    return `下面按五个维度拆开看，重点看与「${ask.directionLabel}」方向最贴近的那一节。`;
  }
  return '下面按五个维度拆开看，没指定问题，就从头依次读。';
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
    const sy = (r.liunian || []).find((l) => l.suiyun && Array.isArray(l.suiyun.signals) && l.suiyun.signals.length);
    const syPlain = sy
      ? `再往后看，${sy.year} 年${sy.ganzhi}是${sy.suiyun.signals.map((x) => x.type).join('、')}——传统上把它当作「变化感强一点」的提示，既不是好消息也不是坏消息，遇上时多留个心眼就好。`
      : '';
    return `你的命局属于「${s(st.level, '中性')}」：${strength}。` +
      `${favor ? `能补${favor}的环境（行业、方位、作息、相处的人）会让你省力；${avoid ? `而${avoid}偏重的场合容易空耗，能绕就绕。` : ''}` : ''}` +
      tiaohou + syPlain;
  }
  if (r.system === 'ziwei') {
    const body = r.body || {};
    const ji = r.flyChains && r.flyChains.忌;
    // 只挑忌这一条白话：它最能说「你反复在哪几件事上使劲」
    // 上面「先答所问」已经报过忌链与飞化的原句，这里换个说法只讲感受，避免同一句念两遍
    const feltChain = ji && ji.steps.length
      ? '你身上有个绕不开的规律：几件事是连着转的，一件卡住，后面就跟着慢下来。'
      : '';
    const fc = r.flyComposite;
    const hub = fc && Array.isArray(fc.targets) ? fc.targets.find((t) => t.count >= 2) : null;
    const feltComposite = !fc || !Array.isArray(fc.targets)
      ? ''
      : hub
        ? `再往深一层，四股力最后也压在「${String(hub.palace).replace(/宫$/, '')}」上——几个方面的劲都往这儿聚。`
        : '再往深一层，四股的力没有全挤到一处，这几件事之间牵连不深。';
    const focus = body.lands
      ? `真正让你上心的，多半是「${body.lands}」这件事，做别的总会分心。`
      : '';
    return [
      `紫微讲的是「你与环境怎么互动」，不是谁好谁坏——同一件事换个环境、换个人配合，结果就不一样。`,
      focus,
      feltChain,
      feltComposite,
    ].filter(Boolean).join('');
  }
  if (r.system === 'liuyao') {
    const ben = r.ben || {};
    const moving = (r.cast && r.cast.movingPositions) || [];
    const labels = (r.body && Array.isArray(r.body.labels)) ? r.body.labels : [];
    const plainBody = bodyPlainOf(labels);
    return `${s(ben.name, '这一卦')}讲的是一个「${moving.length ? '正在动、还会变' : '暂时不动、先看清'}」的局面——` +
      `${moving.length ? '有动爻，说明事情还有转圜空间，不是死局。' : '六爻安静，说明当下更该观察而不是硬推。'}` +
      `${plainBody}${usePlainOf(r.useGod, r.fushenAccess)}${useStrengthPlain(r.useGodStrength)}${jinTuiPlain(r)}${hexStrengthPlain(r.hexStrength)}`;
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
  ['庙旺', '星曜落在某宫时的力量档位：庙、旺最强，得、利、平居中，不、陷最弱。'],
  ['三方四正', '从命宫出发的三合三方加对宫，共四个宫位，是全盘最核心的势力范围。'],
  ['命主', '紫微里另有一颗命主星，补命宫看不到的那一层底色。'],
  ['身主', '紫微里另有一颗身主星，管后天的行动与身体那一面。'],
  ['五行局', '用纳音给整张盘定一个局（水二局、木三局等），大限的起法以此为准。'],
  ['自化', '宫干让本宫星曜自己生出四化，代表这一宫的事容易自己发酵。'],
  ['飞星', '拿一个宫的宫干去四化别的宫，看事情从哪来、往哪走。'],
  ['正曜', '十四主星。「无正曜」指命宫没有主星，要借对宫来看。'],
  ['借对宫', '命宫无主星时借对宫主星来读，性格更依赖环境与身边的人。'],
  ['双星', '两主星同宫，按组合读，不能只看其中一颗。'],
  ['墓库', '地支里的仓库。五行入墓代表这股力量收着，不是没有。'],
  ['伏吟', '干支重复出现，事情容易原地打转、反复。'],
  ['反吟', '天克地冲，变动与对撞的意味更明显。'],
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
