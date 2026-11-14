// 人生几个面：事业 / 财运 / 学业 / 健康 / 子女 / 六亲。
//
// 为什么要合成一个模块：这六类共用同一套原料（十神权重 + 用神喜忌 + 大运流年），
// 拆成六个文件会让 chart 块各自背一份常量表。dsh 的分块协议要求自包含，
// 分块内再共享一层是唯一能压住体积的做法——chart 块 gzip 已经贴着 288KB 上限。
//
// 口径：全部是规则化读法，不是唯一流派，也不对具体人或具体事件下断言。
//   · 事业看「十神哪组最重 + 格局组合」定职业类型，再用官杀/印/食伤的流年定升迁与转行窗口；
//   · 财运看财星权重与用忌、财库开闭，给「量级」不给数字；
//   · 学业看印星（文凭）与食伤（才华）、官星（考试）；
//   · 健康只按五行过旺过弱指向脏腑，写「留意」不写「会得」；
//   · 子女看时柱与（男）官杀／（女）食伤的旺衰，给「偏多／适中／偏少」不给个数；
//   · 六亲按「父偏财、母正印、兄弟比劫」的通行取法逐位看。
import { STEMS, BRANCHES } from './calendar.js';
import { tenGod } from './bazi.js';
import { fail } from './fail.js';

const STEM_ELEMENT = { 甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土', 己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水' };

const GROUPS = ['比劫', '食伤', '财', '官杀', '印'];

// 五行 → 行业取向（象法：取「这一类五行在做的事」，不是职业列表）
const TRADE = {
  木: '教育、出版、医药、文化、林业、纺织这类「生长、培育」的事',
  火: '能源、电力、餐饮、传媒、演艺、互联网这类「发热、传播、点亮」的事',
  土: '房地产、建筑、农业、仓储、保险、中介这类「承载、居中、稳住」的事',
  金: '金融、机械、汽车、五金、公检法、珠宝这类「切割、定价、立规矩」的事',
  水: '贸易、物流、航运、水产、旅游、咨询这类「流动、连接、过手」的事',
};

// 五行 → 脏腑（只作「留意」指向）
const ORGAN = {
  木: '肝胆、筋、眼',
  火: '心、小肠、血脉、睡眠',
  土: '脾胃、肌肉、消化',
  金: '肺、大肠、皮肤、呼吸道',
  水: '肾、膀胱、泌尿、腰',
};

// 格局组合 → 职业气质
const GEGE_CAREER = [
  ['杀印相生', 'safety', '公检法、军警、风控、应急这类「有压力也有背书」的岗位', '七杀给压力与执行力，印给它授权与靠山，两边接上了就适合在规矩里扛事'],
  ['官印相生', 'system', '体制内或大机构的专业技术岗（医院、学校、行政机关、事业单位）', '正官立规矩、正印给资格，适合有编制、有职称、按资历走的路'],
  ['伤官配印', 'craft', '手艺加文凭的活：设计、医技、教师、技术专家、专业顾问', '伤官是手艺与锋芒，印把它收住，不至于恃才傲物'],
  ['食伤生财', 'biz', '自己做生意、技术变现、内容与产品', '食伤是产出，财是收口，产出能直接换钱'],
  ['财官相生', 'corp', '企业里的上升通道：销售管理、项目负责、商务', '财养官，靠业绩换位置'],
  ['伤官见官', 'freelance', '自由职业、专业服务、不坐班的技术活', '伤官与官星相战，进体制容易被规矩磨，出来反而活得好'],
  ['月劫格', 'partner', '合伙、团队分成、渠道与代理', '比劫当令，一个人扛不如几个人分'],
];

const round1 = (v) => Math.round(v * 10) / 10;

/** 某年的流年干支（1984 甲子为基准）。 */
function yearGanzhi(year) {
  const i = ((year - 4) % 60 + 60) % 60;
  return { stem: STEMS[i % 10], branch: BRANCHES[i % 12] };
}

/** 从 chart 里取出生年（buildBazi 把输入归一化在 input.civil 下）。 */
function birthYearOf(chart) {
  const input = chart.input;
  if (!input) return undefined;
  if (input.civil && Number.isInteger(input.civil.year)) return input.civil.year;
  return Number.isInteger(input.year) ? input.year : undefined;
}

/** 大运在某岁数时走哪一步。 */
function dayunAt(chart, age) {
  const list = chart.dayun && Array.isArray(chart.dayun.list) ? chart.dayun.list : [];
  return list.find((d) => age >= d.startAge && age < d.startAge + 10) || null;
}

/** 交运年份：每步大运的起始年份，换步本身就是转折点。 */
function jiaoYears(chart) {
  const birth = birthYearOf(chart);
  if (!Number.isInteger(birth)) return [];
  const list = chart.dayun && Array.isArray(chart.dayun.list) ? chart.dayun.list : [];
  return list.map((d) => birth + d.startAge);
}

/**
 * 通用窗口扫描：给每条规则一个打分函数，扫一遍年龄区间，按分数取前几个。
 * 未来年份优先占名额，过去的只留两条——用户问的是「往后哪年」。
 */
function scanWindows(chart, opts, scoreOf) {
  const birth = birthYearOf(chart);
  if (!Number.isInteger(birth)) return [];
  const fromAge = Number(opts.fromAge) || 20;
  const toAge = Number(opts.toAge) || 55;
  const nowYear = (chart.liunian && chart.liunian[0] && chart.liunian[0].year)
    || Number(opts.nowYear) || 0;
  const out = [];
  for (let age = fromAge; age <= toAge; age += 1) {
    const year = birth + age;
    const gz = yearGanzhi(year);
    const dy = dayunAt(chart, age);
    const hit = scoreOf(year, age, gz, dy);
    if (hit && hit.score >= 2) {
      out.push({ year, age, ganzhi: `${gz.stem}${gz.branch}`, dayun: dy ? dy.ganzhi : '', score: round1(hit.score), past: nowYear > 0 && year < nowYear, reasons: hit.reasons });
    }
  }
  out.sort((a, b) => (b.score - a.score) || (a.year - b.year));
  const picked = [];
  const seen = new Map();
  // 同一条理由最多取两次：正官透干每十年一次，不去重的话四个窗口会全是同一句话。
  const take = (w) => {
    const key = (w.reasons && w.reasons[0]) || '';
    const n = seen.get(key) || 0;
    if (n >= 2) return;
    if (picked.every((p) => Math.abs(p.year - w.year) >= 2)) { picked.push(w); seen.set(key, n + 1); }
  };
  for (const w of out) { if (!w.past && picked.length < 3) take(w); }
  for (const w of out) { if (w.past && picked.filter((p) => p.past).length < 2) take(w); }
  picked.sort((a, b) => a.year - b.year);
  return picked;
}

// ── 事业 ───────────────────────────────────────────────────────
function buildCareer(chart, ctx) {
  const { groups, byGod, favor, avoid, strength } = ctx;
  const geNames = (chart.frame && chart.frame.geju || []).map((g) => String(g.name));
  let gege = null;
  for (const [name, key, label, why] of GEGE_CAREER) {
    if (geNames.some((g) => g.includes(name))) { gege = { key, label, why, name }; break; }
  }
  const top = GROUPS.map((k) => [k, Number(groups[k]) || 0]).sort((a, b) => b[1] - a[1]);
  const topGroup = top[0][0];
  const GROUP_CAREER = {
    官杀: ['有规矩、有考核的岗', '官杀重的人适合被制度推着走，进一个有明确等级的地方反而舒服'],
    印: ['靠资格与知识吃饭的岗', '印重的人靠学历、证书、资历立身，越专业的领域越稳'],
    财: ['与钱直接打交道的岗', '财重的人对数字与交易敏感，做业务、做买卖都不吃亏'],
    食伤: ['靠输出与手艺的岗', '食伤重的人得让东西从自己手里出来，憋在流程里会难受'],
    比劫: ['靠人、靠合伙、靠体力的岗', '比劫重的人一个人干不成事，团队与分成反而顺'],
  };
  const base = gege || { key: 'group-' + topGroup, label: GROUP_CAREER[topGroup][0], why: GROUP_CAREER[topGroup][1] };

  const favorText = favor.length ? favor.map((e) => TRADE[e]).filter(Boolean) : [];
  const avoidText = avoid.length ? avoid.map((e) => e).join('、') : '';

  // 升迁 / 转行窗口：官杀印到位是升，冲日柱与交运是转
  const jiaos = jiaoYears(chart);
  const dayBranch = chart.pillars.day.branch;
  const dayStem = chart.pillars.day.stem;
  const favorGods = (chart.frame && chart.frame.yongshen && chart.frame.yongshen.favorTenGods) || [];
  const windows = scanWindows(chart, {}, (year, age, gz, dy) => {
    const reasons = [];
    let score = 0;
    const god = tenGod(dayStem, gz.stem);
    if ((god === '正官' || god === '七杀') && favorGods.includes(god)) { score += 2; reasons.push(`流年${gz.stem}为${god}且为用，位置与压力同时到`); }
    if ((god === '正印' || god === '偏印') && favorGods.includes(god)) { score += 1.5; reasons.push(`流年${gz.stem}为${god}，有资格或贵人`); }
    if (gz.branch === dayBranch) { score += 1; reasons.push('流年支与日支同，事情回到自己身上'); }
    if (jiaos.includes(year)) { score += 2; reasons.push('交运之年，换环境'); }
    if (dy) { const dg = tenGod(dayStem, dy.stem); if (dg === '正官' || dg === '七杀') { score += 0.6; reasons.push(`大运${dy.ganzhi}带官杀`); } }
    return { score, reasons };
  });

  const lines = [];
  lines.push(`干哪一类：${base.label}。${base.why}。`);
  if (favorText.length) lines.push(`顺的方向：${favorText[0]}${favorText[1] ? `；${favorText[1]}` : ''}——这是用神所喜的五行，不是行业清单，落到具体岗位还要看你会什么。`);
  else lines.push('用神喜忌没有拉开差距，行业方向不必勉强，按能做的挑。');
  const future = windows.filter((w) => !w.past);
  const past = windows.filter((w) => w.past);
  if (future.length) lines.push(`往后看，${future.slice(0, 3).map((w) => `${w.year}（${w.age}岁）`).join('、')} 这几年容易升或者换环境${past.length ? `；此前 ${past.map((w) => w.year).join('、')} 也动过` : ''}。`);
  else if (past.length) lines.push(`此前 ${past.map((w) => `${w.year}（${w.age}岁）`).join('、')} 动过；往后到 55 岁没有更强的信号。`);
  else lines.push('20–55 岁之间没有明显的升迁或转行信号，多半是稳步走。');
  if (avoidText) lines.push(`要留意：${avoidText} 这几种五行是你忌的，别把主力押在上面。`);

  return {
    type: base, topGroup, gege,
    favorText: favorText[0] || '',
    windows, lines,
    basis: '事业按「十神哪组最重 + 格局组合」定类型，升迁/转行窗口用官杀印透干（且为用）、交运年、流年支与日支同来加权。属规则化读法，不是职业测评。',
    strength: strength.level,
  };
}

// ── 财运 ───────────────────────────────────────────────────────
function buildWealth(chart, ctx) {
  const { groups, byGod, favor, avoid, dayStem } = ctx;
  const cai = Number(groups['财']) || 0;
  const bi = Number(groups['比劫']) || 0;
  const shi = Number(groups['食伤']) || 0;
  const caiGods = ['正财', '偏财'].filter((g) => favor.includes(g));
  const caiIsFavor = ['财'].some((k) => (chart.frame && chart.frame.yongshen && (chart.frame.yongshen.favorRoles || []).includes(k)));

  // 量级：财星权重 + 是否得用 + 有没有食伤生财 + 会不会被比劫分
  let tier = '平';
  if (cai >= 2.5 && caiIsFavor && shi >= 1.5) tier = '富';
  else if (cai >= 2.5 && caiIsFavor) tier = '小康以上';
  else if (cai >= 1.5 && caiIsFavor) tier = '小康';
  else if (cai >= 1.5 && !caiIsFavor) tier = '过手财（赚得到也花得快）';
  else if (cai < 1 && bi >= 3) tier = '守成为主（比劫重，财留不住）';
  else if (cai < 1) tier = '偏薄（财星不显，靠技艺或固定收入）';

  const caiKu = chart.frame && chart.frame.caiKu;
  const kuText = caiKu && caiKu.store
    ? (caiKu.opened
      ? `财库${caiKu.store}已经被${caiKu.opener || '对冲'}冲开了，进出都大`
      : `财库${caiKu.store}还没被冲开，攒得住；遇到${caiKu.opener || '对冲'}年来冲才会动`)
    : '';

  const leaks = [];
  const windows = scanWindows(chart, {}, (year, age, gz, dy) => {
    const reasons = [];
    let score = 0;
    const god = tenGod(dayStem, gz.stem);
    // 比劫当值是「分出去」，不混进财运窗口——同一张卡里既说财路又说着破，读者会当矛盾。
    if ((god === '比肩' || god === '劫财') && bi >= 2.5) { leaks.push({ year, age, god }); return null; }
    if ((god === '正财' || god === '偏财') && caiIsFavor) { score += 2; reasons.push(`流年${gz.stem}为${god}，财路现`); }
    if (caiKu && caiKu.opener && gz.branch === caiKu.opener) { score += 2; reasons.push(`流年${gz.branch}冲开财库`); }
    if (dy && (tenGod(dayStem, dy.stem) === '正财' || tenGod(dayStem, dy.stem) === '偏财')) { score += 0.8; reasons.push(`大运${dy.ganzhi}走财运`); }
    return { score, reasons };
  });

  const lines = [];
  lines.push(`量级：${tier}。财星权重 ${round1(cai)}，${caiIsFavor ? '在喜用一侧，赚得到' : '在忌神一侧，赚得到也守不住，适合过手型的事'}。`);
  if (shi >= 1.5) lines.push('有食伤生财：钱是从自己手里的东西出来的，靠本事比靠关系稳。');
  else if (bi >= 3) lines.push('比劫偏重：合伙容易分账，借钱给熟人要慎重——这不是道德建议，是盘面结构。');
  if (kuText) lines.push(`${kuText}。`);
  const future = windows.filter((w) => !w.past);
  if (future.length) lines.push(`${future.slice(0, 3).map((w) => `${w.year}（${w.age}岁）`).join('、')} 前后财路有动静，${future[0].reasons[0] || ''}。`);
  else lines.push('20–55 岁没有特别集中的财路窗口，收入走常轨。');
  const leakYears = leaks.filter((l) => l.year > 2026).slice(0, 3);
  if (leakYears.length) lines.push(`另外 ${leakYears.map((l) => l.year).join('、')} 前后比劫当值，花销与分账会变多——这几年别做大额承诺。`);

  return {
    tier, cai: round1(cai), caiIsFavor, caiGods, kaiKu: Boolean(caiKu && caiKu.opened),
    windows, lines,
    basis: '财力量级按财星权重、是否在喜用、有无食伤生财、比劫是否分财四条定档；不给金额、不给投资建议。属规则化读法。',
  };
}

// ── 学业 ───────────────────────────────────────────────────────
function buildStudy(chart, ctx) {
  const { groups, favor, dayStem } = ctx;
  const yin = Number(groups['印']) || 0;
  const shi = Number(groups['食伤']) || 0;
  const guan = Number(groups['官杀']) || 0;
  const cai = Number(groups['财']) || 0;
  const yinFavor = (chart.frame && chart.frame.yongshen && (chart.frame.yongshen.favorRoles || []).includes('印'));

  let tier; let why;
  if (yin >= 2.5 && yinFavor) { tier = '学历这条路顺'; why = `印星 ${round1(yin)}，且在喜用一侧——读书是加分项，靠文凭与资格能立住`; }
  else if (yin >= 2 && cai >= 2) { tier = '读书与做事打架'; why = '印与财都重，书本与实际抢时间，多半是边做边学'; }
  else if (yin < 1 && shi >= 2) { tier = '靠才华不靠文凭'; why = `印星 ${round1(yin)} 偏弱、食伤 ${round1(shi)} 偏旺——手艺、表达、临场发挥比学历管用`; }
  else if (yin < 1) { tier = '学历一般，自学为主'; why = '印星不显，正规教育这条线不吃力也不加持，真要的东西得自己找'; }
  else { tier = '中等，看具体阶段'; why = `印星 ${round1(yin)} 不弱不强，成绩随环境浮动`; }

  const windows = scanWindows(chart, { fromAge: 12, toAge: 30 }, (year, age, gz, dy) => {
    const reasons = [];
    let score = 0;
    const god = tenGod(dayStem, gz.stem);
    if ((god === '正印' || god === '偏印')) { score += 2; reasons.push(`流年${gz.stem}为${god}，考试与资格运`); }
    if (guan >= 1.5 && (god === '正官' || god === '七杀')) { score += 1.5; reasons.push(`流年${gz.stem}为${god}，有名次或录取`); }
    if (shi >= 2 && (god === '食神' || god === '伤官')) { score += 1; reasons.push(`流年${gz.stem}为${god}，才华外露`); }
    if (dy && (tenGod(dayStem, dy.stem) === '正印' || tenGod(dayStem, dy.stem) === '偏印')) { score += 0.6; reasons.push(`大运${dy.ganzhi}走印`); }
    return { score, reasons };
  });

  const lines = [];
  lines.push(`${tier}。${why}。`);
  if (guan >= 1.5) lines.push('官星不弱：考试、面试这类有明确评判的场合，比自由发挥更占便宜。');
  if (shi >= 2.5) lines.push('食伤偏旺：容易有自己的一套，遇到不对路的老师会抵触。');
  const future = windows.filter((w) => !w.past);
  if (future.length) lines.push(`${future.slice(0, 2).map((w) => `${w.year}（${w.age}岁）`).join('、')} 前后是读书与考证的顺年。`);
  else if (windows.length) lines.push(`此前 ${windows.map((w) => w.year).join('、')} 是顺年，往后这十年这条线淡了。`);
  else lines.push('12–30 岁没有特别集中的学业窗口，成绩主要看用不用功。');

  return {
    tier, yin: round1(yin), shi: round1(shi), guan: round1(guan), yinFavor,
    windows, lines,
    basis: '学业看印星（文凭与资格）、食伤（才华）、官星（名次与录取）三组权重，顺年按印官透干加权。属规则化读法，不预测分数与学校。',
  };
}

// ── 健康 ───────────────────────────────────────────────────────
function buildHealth(chart, ctx) {
  const { dayStem, favor, avoid } = ctx;
  const el = chart.wuxing || {};
  const rows = Object.keys(ORGAN).map((e) => [e, Number(el[e]) || 0]).sort((a, b) => b[1] - a[1]);
  const most = rows[0];
  const least = rows[rows.length - 1];
  // 健康年不走 scanWindows：它的门槛（≥2）是给「有几件事同时发生」的事件窗设计的，
  // 这一路只有「容易累」的弱信号，用同一把尺子会扫出零个年份，反而更像什么都没说。
  const years = [];
  const birth = birthYearOf(chart);
  if (Number.isInteger(birth)) {
    for (let age = 20; age <= 60; age += 1) {
      const year = birth + age;
      const gz = yearGanzhi(year);
      let s = 0;
      if (gz.branch === chart.pillars.day.branch) s += 1.2;
      if (avoid.length && avoid.includes(STEM_ELEMENT[gz.stem])) s += 1;
      if (s >= 1.2) years.push({ year, age, score: round1(s), past: year < 2026 });
    }
  }
  const picked = [...years.filter((y) => !y.past).slice(0, 3), ...years.filter((y) => y.past).slice(-1)];

  const lines = [];
  lines.push(`最旺的是${most[0]}（${round1(most[1])}），偏亢时留意${ORGAN[most[0]]}——旺不是说会病，是说这一路容易用力过头。`);
  lines.push(`最弱的是${least[0]}（${round1(least[1])}），${ORGAN[least[0]]}这一路是短板，${favor.includes(least[0]) ? '它正好在喜用里，补它就是补运' : '平时多照顾，别硬扛'}。`);
  if (picked.length) lines.push(`${picked.filter((y) => !y.past).map((y) => y.year).join('、') || picked.map((y) => y.year).join('、')} 前后身体信号容易显，例行体检安排在这时候。`);
  else lines.push('二十到六十岁之间没有特别集中的年份，作息规律比挑年份有用。');
  lines.push('这一段只作生活提醒：哪一路偏亢、哪一路偏虚、哪几年容易累。不诊断、不建议用药。');

  return {
    most: { element: most[0], value: round1(most[1]), organ: ORGAN[most[0]] },
    least: { element: least[0], value: round1(least[1]), organ: ORGAN[least[0]] },
    years: picked.map((y) => y.year), lines,
    basis: '按五行权重指向脏腑（木肝胆、火心小肠、土脾胃、金肺大肠、水肾膀胱），只作生活提醒。不作医学判断，不替代就医。',
  };
}

// ── 子女 ───────────────────────────────────────────────────────
function buildChildren(chart, ctx) {
  const { groups, byGod, isMale, dayStem } = ctx;
  const gods = isMale ? ['正官', '七杀'] : ['食神', '伤官'];
  let w = 0;
  for (const g of gods) w += Number(byGod[g]) || 0;
  const hour = chart.pillars.hour;
  const hourGod = hour && hour.stemTenGod;
  const hourClash = hour && chart.relations && Array.isArray(chart.relations.branches)
    ? chart.relations.branches.filter((x) => typeof x === 'string' && x.includes(hour.branch) && x.includes('冲'))
    : [];

  let tier;
  if (w >= 2.5) tier = `子女缘偏旺（${gods.join('/')} 权重 ${round1(w)}）`;
  else if (w >= 1) tier = `子女缘适中（${gods.join('/')} 权重 ${round1(w)}）`;
  else if (w > 0) tier = `子女缘偏薄（${gods.join('/')} 权重 ${round1(w)}）`;
  else tier = `原局不见${isMale ? '官杀' : '食伤'}（子女星不显，晚得或多有波折）`;

  const lines = [];
  lines.push(`${tier}。这里只论「缘的厚薄」，论不到具体的个数。`);
  if (hour) lines.push(`时柱${hour.ganzhi}${hourGod ? `坐${hourGod}` : ''}，${hourClash.length ? '时支受冲，子女缘分有起伏' : '时柱安静，这一路没有明显的冲突'}。`);
  else lines.push('时柱未知（时辰未填），子女这一路先不谈。');
  lines.push('子女的数量与性别受太多非命理因素影响，做不了可靠推断，这一层只给「早／晚／顺／费劲」。');

  return { tier, weight: round1(w), gods, hour: hour ? hour.ganzhi : '', lines, basis: '子女取男命官杀、女命食伤为子女星，看权重与时柱状态。只论缘的厚薄，不推个数与性别。' };
}

// ── 六亲 ───────────────────────────────────────────────────────
function buildKin(chart, ctx) {
  const { byGod, groups } = ctx;
  const rows = [
    ['父', Number(byGod['偏财']) || 0, '偏财'],
    ['母', Number(byGod['正印']) || 0, '正印'],
    ['兄弟姐妹', (Number(byGod['比肩']) || 0) + (Number(byGod['劫财']) || 0), '比劫'],
  ];
  const lines = [];
  for (const [who, w, god] of rows) {
    const level = w >= 2 ? '厚' : w >= 1 ? '中' : w > 0 ? '薄' : '不显';
    // 「不显」不等于关系淡：可能只是这个角色没有单独占住一个十神的位置。
    // 直接写成「缘分淡」对读的人太重，也没有依据。
    const tail = w >= 2
      ? '，这一路在盘上很实'
      : w >= 1
        ? '，有来有往'
        : w > 0
          ? '，露面的时候少，或者隔着距离'
          : '，不是关系淡，是这个角色在你盘上没有单独的位置';
    lines.push(`${who}（看${god}）：${level}（${round1(w)}）${tail}。`);
  }
  lines.push('宫位：年主祖上、月主父母兄弟、日主配偶、时主子女；宫里有什么十神，那一段就带什么色彩。');
  return {
    rows: rows.map(([who, w, god]) => ({ who, god, weight: round1(w) })),
    lines,
    basis: '六亲取父偏财、母正印、兄弟比劫、配偶看日支、子女看时柱，只论关系厚薄，不断生死吉凶。',
  };
}

/**
 * 人生六面：事业 / 财运 / 学业 / 健康 / 子女 / 六亲。
 *
 * @param {object} chart buildBazi 的返回值
 * @param {object} [opts] { fromAge, toAge, nowYear }
 * @returns {object}
 */
export function buildFacets(chart, opts = {}) {
  if (!chart || typeof chart !== 'object' || !chart.pillars || !chart.pillars.day) {
    throw fail('E_INPUT', '人生六面需要一张已排好的八字盘：先调 buildBazi 拿到 pillars');
  }
  const gender = chart.input && chart.input.gender;
  const isMale = gender === 'male';
  const frame = chart.frame || {};
  const godStats = frame.godStats || {};
  const ys = frame.yongshen || {};
  const ctx = {
    groups: godStats.groups || {},
    byGod: godStats.byGod || {},
    favor: ys.favor || [],
    avoid: ys.avoid || [],
    dayStem: chart.pillars.day.stem,
    strength: chart.strength || {},
    isMale,
  };
  const career = buildCareer(chart, ctx);
  const wealth = buildWealth(chart, ctx);
  const study = buildStudy(chart, ctx);
  const health = buildHealth(chart, ctx);
  const children = buildChildren(chart, ctx);
  const kin = buildKin(chart, ctx);
  return { career, wealth, study, health, children, kin };
}

/** 同一套干支推法的别名导出；单独写成一个函数，避免 `export { x as y }` 在分块构建里报 Unexpected identifier 'as'。 */
function lifeYearGanzhi(year) {
  return yearGanzhi(year);
}

export { lifeYearGanzhi };
