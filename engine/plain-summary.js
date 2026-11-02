// 盘面顶部的那段「人话总结」：把已经算出来的结构，翻译成一段不用术语也能读的话。
//
// 为什么单独成文件、而不是塞进 interpret：
// 1) interpret 是「解析」，回答的是「凭什么这么判」，一屏几十条，普通人第一眼读不动；
// 2) 这里是「先说什么」，只讲四件事——底色、感情、卡点、怎么办，每条都必须指回盘面上的某个事实；
// 3) 它必须是纯函数：同一张盘每次生成的文字完全一样，不能有随机、不能有「大概」「可能很准」这类含糊。
//
// 一条硬规矩：这里只做「结构 → 人话」的翻译，不做吉凶断语。
// 「官杀混」可以说成「你容易遇到两种类型的人」，不能说成「你婚姻不好」。

const ELEMENT_COLOR = {
  木: { color: '青、绿', where: '东边、有树有水的地方', daily: '早上多出门走走' },
  火: { color: '红、橙、紫', where: '南边、向阳的房间', daily: '白天多晒太阳，别总待在阴冷的屋里' },
  土: { color: '黄、棕、米色', where: '中原地带、干爽高燥处', daily: '把作息和吃饭时间固定下来' },
  金: { color: '白、银、浅灰', where: '西边、通风利落的地方', daily: '把该断的事断干净，别拖' },
  水: { color: '黑、深蓝', where: '北边、临水处', daily: '留出独处和放空的时间' },
};

const GOD_PLAIN = {
  正印: '靠吸收和消化来获得安全感，习惯先想明白再动',
  偏印: '想得比说得多，一件事会在心里推演出很多种可能',
  正官: '对规矩和责任敏感，别人一句交代会变成自己的压力',
  七杀: '对压力和竞争敏感，遇强则强，也容易被强势的人吸引',
  正财: '对现实条件敏感，不太会被空话打动',
  偏财: '对机会敏感，愿意为看得见的回报承担风险',
  食神: '表达温和，喜欢把日子过得有滋味',
  伤官: '有自己的标准，看不上粗糙的东西，容易先挑毛病',
  比肩: '自我边界清楚，不太愿意被安排',
  劫财: '同辈之间容易较劲，也容易替朋友出头',
};

const STAGE_PLAIN = {
  长生: '刚起步，有生机',
  沐浴: '不安定，容易被外界牵动',
  冠带: '在成形，开始要面子',
  临官: '正当力，能扛事',
  帝旺: '很足，但也容易过满',
  衰: '开始收力，做事偏保守',
  病: '使不上劲，需要借外力',
  死: '静态，不爱主动',
  墓: '收着、藏着，不爱外露',
  绝: '在这里使不上劲，容易觉得被压着',
  胎: '还在孕育，慢热',
  养: '在积攒，等时机',
};

const STAR_PLAIN = {
  紫微: '要主导、在意体面',
  天机: '脑子转得快，爱盘算',
  太阳: '愿意给出去，也容易被消耗',
  武曲: '务实，认结果',
  天同: '图安稳，怕冲突',
  廉贞: '要强，情绪起伏大',
  天府: '稳，能存住东西',
  太阴: '细腻，心思藏在里面',
  贪狼: '欲望强、多才多艺',
  巨门: '爱辨析，也容易生口舌',
  天相: '会配合，擅长讲和',
  天梁: '老成，愿意护着别人',
  七杀: '独断，敢冲',
  破军: '破旧立新，不安于现状',
};

const BRIGHT_PLAIN = { 庙: '得力', 旺: '得力', 得地: '还算得力', 平: '一般', 陷: '不太稳' };

const uniq = (arr) => [...new Set(arr.filter(Boolean))];

const MONTH_SEASON = {
  寅: '初春', 卯: '仲春', 辰: '暮春', 巳: '初夏', 午: '盛夏', 未: '长夏',
  申: '初秋', 酉: '仲秋', 戌: '深秋', 亥: '初冬', 子: '仲冬', 丑: '隆冬',
};

/** 取日支（配偶宫）与年/月/时支之间的破、冲、合、害 */
function branchLinks(relations, dayBranch) {
  const out = { po: [], chong: [], he: [] };
  for (const t of (relations && relations.branches) || []) {
    if (!dayBranch || !String(t).includes(dayBranch)) continue;
    if (/破/.test(t)) out.po.push(t);
    else if (/冲/.test(t)) out.chong.push(t);
    else if (/合/.test(t)) out.he.push(t);
  }
  return out;
}

function baziSummary(r) {
  const P = r.pillars || {};
  const day = P.day || {};
  const month = P.month || {};
  const dm = r.dayMaster || {};
  const cl = r.climate || {};
  const gender = (r.input && r.input.gender) || 'female';
  const topGods = Object.entries((r.frame && r.frame.godStats && r.frame.godStats.groups) || {})
    .filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]);
  const godNames = (r.frame && r.frame.yongshen && r.frame.yongshen.favorTenGods) || [];
  const favor = (r.frame && r.frame.yongshen && r.frame.yongshen.favor) || [];
  const avoid = (r.frame && r.frame.yongshen && r.frame.yongshen.avoid) || [];

  // ── 总纲：日主 + 生月 + 冷暖 + 缺什么 ──
  const season = MONTH_SEASON[month.branch] || `${month.branch}月`;
  const climateWord = cl.label === '寒湿' ? '天寒水旺，木像冬天的藤，不是不强，是冷得伸展不开'
    : cl.label === '燥热' ? '火土偏燥，像久旱的地，需要水和湿气来松一松'
      : '寒暖相对均衡，没有极端的偏枯';
  const needEl = (cl.need && cl.need.element) || favor[0] || '';
  const lead = `${dm.stem || ''}${dm.element || ''}日主，生在${season}${month.branch || ''}月：${climateWord}。`
    + `${needEl ? `最需要的是${needEl}${cl.need && cl.need.why ? `——${cl.need.why}` : ''}。` : ''}`
    + `整体${r.strength ? r.strength.level : '中和'}，不是极旺也不是极弱，所以${r.strength && r.strength.level === '身弱' ? '很多事要靠外部条件配合，硬扛不如借力' : '撑得住，关键是别把力气用在错的地方'}。`;

  // ── 底色：十神权重前两位 ──
  const top2 = topGods.slice(0, 2).map(([k]) => k);
  // 具体到哪一个十神：优先取盘上真出现的那个（天干 + 藏干本气），
  // 否则「食伤偏重」会把伤官说成食神——两者的人话差得远。
  const present = [];
  for (const p of Object.values(P)) {
    if (!p) continue;
    if (p.stemTenGod) present.push(p.stemTenGod);
    if (p.hidden && p.hidden[0] && p.hidden[0].tenGod) present.push(p.hidden[0].tenGod);
  }
  const godSentences = top2.map((g) => {
    const inner = { 印: ['正印', '偏印'], 官杀: ['正官', '七杀'], 食伤: ['食神', '伤官'], 财: ['正财', '偏财'], 比劫: ['比肩', '劫财'] }[g] || [];
    const hit = inner.find((x) => present.includes(x)) || inner[0];
    return hit && GOD_PLAIN[hit] ? `${g}偏重：${GOD_PLAIN[hit]}。` : '';
  }).filter(Boolean);
  const basics = `${godSentences.join('')}${godNames.length ? '' : ''}` +
    (top2.includes('印') ? '想得多是你的默认状态，好处是稳，代价是慢和累。' : '');

  // ── 感情：女命看官杀、男命看财 ──
  const spouseGods = gender === 'female' ? ['正官', '七杀'] : ['正财', '偏财'];
  const spouseName = gender === 'female' ? '官杀（正官与七杀）' : '财星（正财与偏财）';
  const positions = { year: '年干', month: '月干', day: '日干', hour: '时干' };
  const exposed = Object.entries(P)
    .filter(([, p]) => p && spouseGods.includes(p.stemTenGod))
    .map(([k, p]) => `${positions[k]}${p.stemTenGod}`);
  const dayHiddenGod = (day.hidden && day.hidden[0] && day.hidden[0].tenGod) || '';
  const links = branchLinks(r.relations, day.branch);
  const loveBits = [];
  loveBits.push(`${gender === 'female' ? '女命' : '男命'}看配偶星取${spouseName}${exposed.length ? `，${exposed.join('、')}` : '，盘中未透干'}` +
    `${exposed.length ? '——摆在明处，说明这件事在你生活里是绕不开的主题' : '——不显在明处，往往要靠后天遇到的人把它带出来'}。`);
  if (dayHiddenGod) loveBits.push(`日支（配偶宫）坐${day.branch}${dayHiddenGod}${day.dishi ? `，日主在这里是「${day.dishi}」：${STAGE_PLAIN[day.dishi] || ''}` : ''}。`);
  if (links.po.length) loveBits.push(`日支与另一支相破（${links.po.join('、')}）：破不是吵架，是那种说不清、解释不明白的暗耗，容易冷处理。`);
  if (links.chong.length) loveBits.push(`日支逢冲（${links.chong.join('、')}）：关系里变动感强，聚散、异地、节奏不一致都可能出现。`);
  if (links.he.length) loveBits.push(`日支有合（${links.he.join('、')}）：容易被关系拴住，进去了就不太想出来。`);
  if (r.hourUnknown) loveBits.push('时柱暂缺，所以「子女」这一路的信息读不出，感情结论也就少了三分之一。');

  // ── 卡点：破冲 + 伤官见官 + 印重内耗 ──
  const gejuNames = ((r.frame && r.frame.geju) || []).map((g) => g.name);
  const stucks = [];
  if (links.po.length) stucks.push('破在日支：最伤人的往往不是大事，是没说开的小事。');
  if (gejuNames.includes('伤官见官')) stucks.push('盘里有「伤官见官」的组合：既想要稳定，又忍不了对方的毛病，这是同一件事的两面。');
  if (top2.includes('印') && !top2.includes('财')) stucks.push('印重而财轻：想得多、落得少；越焦虑越容易继续想。');
  if (!stucks.length) stucks.push('这一盘没有特别尖锐的冲克，卡点更多在「节奏」上——什么时候该动，什么时候该停。');

  // ── 建议 ──
  const advice = [];
  if (needEl && ELEMENT_COLOR[needEl]) {
    const c = ELEMENT_COLOR[needEl];
    advice.push(`多接触${needEl}：${c.color}这类颜色、${c.where}，日常可以${c.daily}。`);
  }
  if (avoid.length) advice.push(`少把自己放在${avoid.slice(0, 2).join('、')}过重的环境里——不是不能碰，是别长期待在那种氛围中。`);
  if (top2.includes('印')) advice.push('给「想」设个时限：一件事想超过十分钟还没结论，就先做一个最小动作，用行动换信息。');
  if (gejuNames.includes('伤官见官')) advice.push('把标准用在事情上，不要用在人身上；对人提要求之前，先说清你需要什么。');

  return {
    system: 'bazi',
    title: '先看这一张：这张盘大致在说什么',
    chips: uniq([`${dm.stem || ''}${dm.element || ''}日主`, `${month.branch || ''}月`, cl.label || '', r.strength ? r.strength.level : '', r.hourUnknown ? '时柱暂缺' : '']),
    lead,
    sections: [
      { h: '你的底色', t: basics || '结构比较均衡，没有一边倒的偏重。' },
      { h: '感情这件事', t: loveBits.join('') },
      { h: '最容易卡住的地方', t: stucks.join('') },
    ],
    advice,
    caveat: r.hourUnknown
      ? '时柱暂缺：以上只据年、月、日六个字，等于全盘信息的七成左右。子女缘分、晚年走势、以及「内心最深处那一层」都读不全，结论只作参考。'
      : '',
    footer: '以上都是对结构的描述，不是断语；判断好坏要结合你自己的处境。',
  };
}

function ziweiSummary(r) {
  const pal = (r.palaces || []);
  const ming = pal[0] || {};
  const body = r.body || {};
  const mainStars = (ming.stars || []).filter((s) => s.type === '主星');
  const bodyPalace = pal.find((p) => p.isBody) || {};
  const love = pal.find((p) => p.palace === '夫妻') || {};
  const mainName = mainStars.map((s) => s.name).join('、') || '空宫（借对宫）';
  const bright = mainStars.map((s) => BRIGHT_PLAIN[s.brightness] || '').filter(Boolean)[0] || '';
  const plainOf = (stars) => stars.filter((s) => s.type === '主星').map((s) => `${s.name}${STAR_PLAIN[s.name] ? `（${STAR_PLAIN[s.name]}）` : ''}`).join('；');

  const ps = r.patternSummary || {};
  const formed = uniq([...(ps.good || []), ...(ps.neutral || [])]);
  const loveStars = (love.stars || []);
  const loveMain = loveStars.filter((s) => s.type === '主星');
  const loveSha = loveStars.filter((s) => s.type === '煞星');

  return {
    system: 'ziwei',
    title: '先看这一张：这张盘大致在说什么',
    chips: uniq([`命宫在${ming.branch || ''}`, mainName, r.bureau ? r.bureau.name : '', body.lands ? `身宫落${body.lands}` : '']),
    lead: `命宫在${ming.branch || ''}，坐${mainName}${bright ? `（${bright}）` : ''}；身宫落在${body.lands || body.palace || '—'}。`
      + `${mainStars.length ? `底色是${mainStars.map((s) => STAR_PLAIN[s.name] || s.name).join('、')}。` : '命宫无主星，性格更多由对宫与三方决定，可塑性反而大。'}`
      + `${formed.length ? `结构上成的是${formed.slice(0, 3).join('、')}——格局只说明形状，不是吉凶判词。` : ''}`,
    sections: [
      { h: '你的底色', t: `${plainOf(ming.stars || []) || '命宫无主星，靠三方四正补'}。身宫落${body.lands || '—'}，说明你这辈子真正花力气的地方在${body.lands || '那一块'}。` },
      { h: '感情这件事', t: `夫妻宫在${love.branch || '—'}，坐${loveMain.map((s) => `${s.name}${s.brightness ? `（${BRIGHT_PLAIN[s.brightness] || s.brightness}）` : ''}`).join('、') || '空宫（借对宫）'}。`
        + `${loveSha.length ? `同宫还有${loveSha.map((s) => s.name).join('、')}——关系里容易起摩擦，来得快也去得快。` : '没有明显的煞星同宫，关系相对平顺。'}` },
      { h: '最容易卡住的地方', t: `${(ps.broken || []).length ? `${uniq(ps.broken).join('、')}被判为被冲破：结构还在，但成色打折。` : '主要格局没有明显被冲破。'}`
        + `${(ps.bad || []).length ? `另有${uniq(ps.bad).join('、')}这类忌格，只描述结构，不作吉凶断。` : ''}` },
    ],
    advice: [
      `命宫主星${mainStars.length ? `是${mainStars.map((s) => s.name).join('、')}，顺它的长处在做事，比硬改性格省力` : '不显，先靠环境和习惯替自己定节奏'}。`,
      `身宫落${body.lands || '—'}：这块是你真正在意的地方，也是容易耗人的地方，留出余量。`,
    ],
    caveat: '',
    footer: '以上都是对结构的描述，不是断语；判断好坏要结合你自己的处境。',
  };
}

/**
 * 生成盘面顶部的人话总结。
 * @param {object} r compute() 的结果
 * @returns {null|{system,title,chips,lead,sections,advice,caveat,footer}}
 */
export function plainSummary(r) {
  if (!r || typeof r !== 'object') return null;
  if (r.system === 'bazi') return baziSummary(r);
  if (r.system === 'ziwei') return ziweiSummary(r);
  return null;
}
