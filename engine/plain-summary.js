// 盘面顶部的那段「人话总结」：把已经算出来的结构，翻译成一段不用术语也能读的话。
//
// 为什么单独成文件、而不是塞进 interpret：
// 1) interpret 是「解析」，回答的是「凭什么这么判」，一屏几十条，普通人第一眼读不动；
// 2) 这里是「先说什么」，只讲四件事——底色、感情、卡点、怎么办，每条都必须指回盘面上的某个事实；
// 3) 它必须是纯函数：同一张盘每次生成的文字完全一样，不能有随机、不能有「大概」「可能很准」这类含糊。
//
// 一条硬规矩：这里只做「结构 → 人话」的翻译，不做吉凶断语。
// 「官杀混」可以说成「你容易遇到两种类型的人」，不能说成「你婚姻不好」。

import { ASK_KINDS } from './event-prompt.js';
import { PALACE_FIELD, GATE_MEANING } from './qimen-prompt.js';

const ASK = ASK_KINDS || {};
const PALACE = PALACE_FIELD || {};
const GATES = GATE_MEANING || {};

// 命盘的「询问方向」与问事提示的「六类问法」不是一套键：
// 财运要落到「生意/合作」、学业落到「工作/事业」、健康与出行各自归位。
// 不转这一道，选「财运」问六爻时会取不到现实核对清单——建议那一段就是空的。
const DIR2KIND = { wealth: 'business', career: 'career', love: 'love', health: 'other', study: 'career', travel: 'action', general: 'other' };
const askKind = (dir) => DIR2KIND[dir] || (ASK[dir] ? dir : 'other');

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
  // 财库：库在不在、开没开、财是喜是忌——把三件事压成一句人话，接在总纲末尾
  const ck = (r.frame && r.frame.caiKu) || null;
  const caiKuLine = (() => {
    if (!ck) return '';
    if (!ck.present) return '财这一路没有立库，赚多少看明面上的财星与行运，不靠「开库」这一说。';
    if (ck.opened && ck.verdict === '开库主发') return `财有库（${ck.store}），而且库门被${ck.opener}冲开了：钱是能进来的，关键在于你肯不肯把它存住。`;
    if (ck.opened && ck.verdict === '开库反主破财') return `财有库（${ck.store}）也被冲开了，但这一行在你这盘上是忌：动得越多漏得越快，稳比冲重要。`;
    if (ck.opened) return `财有库（${ck.store}），库门也开了，但财本身不算厚：有得有失，别指望一次翻身。`;
    return `财有库（${ck.store}），门还关着：不是没有，是要等对的时间或对的选择把它引出来。`;
  })();
  const lead = `${dm.stem || ''}${dm.element || ''}日主，生在${season}${month.branch || ''}月：${climateWord}。`
    + `${needEl ? `最需要的是${needEl}${cl.need && cl.need.why ? `——${cl.need.why}` : ''}。` : ''}`
    + `整体${r.strength ? r.strength.level : '中和'}，不是极旺也不是极弱，所以${r.strength && r.strength.level === '身弱' ? '很多事要靠外部条件配合，硬扛不如借力' : '撑得住，关键是别把力气用在错的地方'}。`
    + caiKuLine;

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
  // 三平衡：只作「往哪个方向补」的一句话，不给富贵层次的下断语（层次见解析层的三平衡节）
  const bal = (r.frame && r.frame.balance) || null;
  if (bal) {
    const gaps = [];
    if (!bal.wuxing.ok) gaps.push(`五行偏在${bal.wuxing.highest}、缺在${bal.wuxing.lowest}`);
    if (!bal.yinyang.ok) gaps.push(bal.yinyang.pure ? `${bal.yinyang.pure}之局` : `阴阳一边倒（阳 ${bal.yinyang.yang}／阴 ${bal.yinyang.yin}）`);
    if (!bal.climate.ok) gaps.push(`寒暖燥湿没调匀（${bal.climate.kind}）`);
    advice.push(gaps.length
      ? `结构上${gaps.join('、')}：不必去「补命」，把这几处当作长期要照看的方向就行。`
      : '五行、阴阳、寒暖燥湿三方面都还匀：这种盘最忌讳的是为了「更好」而硬改节奏，稳住就是优势。');
  }

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
  const broken = uniq(ps.broken || []);
  const bad = uniq(ps.bad || []);
  // 被判冲破的格局不再算「成」——否则同一段里既说成、又说破，读的人只会觉得自相矛盾
  const formed = uniq([...(ps.good || []), ...(ps.neutral || [])]).filter((x) => !broken.includes(x));
  const loveStars = (love.stars || []);
  const loveMain = loveStars.filter((s) => s.type === '主星');
  const loveSha = loveStars.filter((s) => s.type === '煞星');

  return {
    system: 'ziwei',
    title: '先看这一张：这张盘大致在说什么',
    chips: uniq([`命宫在${ming.branch || ''}`, mainName, r.bureau ? r.bureau.name : '', body.lands ? `身宫落${body.lands}` : '']),
    lead: `命宫在${ming.branch || ''}，坐${mainName}${bright ? `（${bright}）` : ''}；身宫落在${body.lands || body.palace || '—'}。`
      + `${mainStars.length ? `底色是${mainStars.map((s) => STAR_PLAIN[s.name] || s.name).join('、')}。` : '命宫无主星，性格更多由对宫与三方决定，可塑性反而大。'}`
      + `${formed.length ? `结构上成的是${formed.slice(0, 3).join('、')}——格局只说明形状，不是吉凶判词。` : '没有完整成套的格局，这一盘更多看单颗星的性质，少看组合。'}`,
    sections: [
      { h: '你的底色', t: `${plainOf(ming.stars || []) || '命宫无主星，靠三方四正补'}。身宫落${body.lands || '—'}，说明你这辈子真正花力气的地方在${body.lands || '那一块'}。` },
      { h: '感情这件事', t: `夫妻宫在${love.branch || '—'}，坐${loveMain.map((s) => `${s.name}${s.brightness ? `（${BRIGHT_PLAIN[s.brightness] || s.brightness}）` : ''}`).join('、') || '空宫（借对宫）'}。`
        + `${loveSha.length ? `同宫还有${loveSha.map((s) => s.name).join('、')}——关系里容易起摩擦，来得快也去得快。` : '没有明显的煞星同宫，关系相对平顺。'}` },
      { h: '最容易卡住的地方', t: `${broken.length ? `被冲破的格局有${broken.join('、')}——结构还在，但成色打折；冲不等于毁，说的是它不如完好时那么顶用。` : '主要格局没有明显被冲破。'}`
        + `${bad.length ? `另有${bad.join('、')}这类忌格，只描述结构，不作吉凶断。` : ''}` },
    ],
    advice: [
      `命宫主星${mainStars.length ? `是${mainStars.map((s) => s.name).join('、')}，顺它的长处在做事，比硬改性格省力` : '不显，先靠环境和习惯替自己定节奏'}。`,
      `身宫落${body.lands || '—'}：这块是你真正在意的地方，也是容易耗人的地方，留出余量。`,
    ],
    caveat: '',
    footer: '以上都是对结构的描述，不是断语；判断好坏要结合你自己的处境。',
  };
}

// ── 问事类与走势：同样只翻译结构 ─────────────────────────────
// 命盘讲「你是什么结构」，问事讲「这件事现在卡在哪、下一步看什么」。
// 共同底线一致：每条话都要能指回盘面上的某个符号，不写「一定会」「必然」。

const MONTH_STATE_PLAIN = { 旺: '当令，气最足', 相: '有生机，正在起', 休: '气在泄，歇着', 囚: '被压着，使不上劲', 死: '最弱，得靠外援' };
const LIUQIN_PLAIN = {
  官鬼: '职位、压力、管你的人和事',
  妻财: '钱、资源、实际回报',
  父母: '文书、答复、流程与长辈',
  子孙: '结果本身、松弛、把事情落地',
  兄弟: '同辈、分利、竞争',
};
const DAY_REL_PLAIN = {
  日生: '日辰生它，当天有人托着',
  日克: '日辰克它，当天被压一头',
  比和: '与日辰同气，力量相当',
  日合: '与日辰相合，黏住了',
  日冲: '与日辰相冲，当天就动',
};

/** 用神/世爻的「当下状态」：月令一句 + 日辰一句 + 空/动/冲的标志 */
function stateLine(l) {
  if (!l) return '';
  const bits = [];
  const ms = MONTH_STATE_PLAIN[l.monthState] || l.monthSay || '';
  if (ms) bits.push(`月令${l.monthState || ''}（${ms}）`);
  const ds = DAY_REL_PLAIN[l.dayRelation] || l.daySay || '';
  if (ds) bits.push(ds);
  if (l.kong) bits.push('旬空——抓不实，等冲或填');
  if (l.moving) bits.push('发动，是这件事的动因');
  if (l.monthChong) bits.push('月破，先破后立');
  return bits.join('；');
}

/**
 * 六爻在「没指定所问之事」时的版本。
 *
 * 取用神要先知道问什么；方向留在「综合」时，引擎给不出用神，也就给不出成败。
 * 但一张卦并非只能读懂用神——世应、卦体（六冲/六合）、动爻这几样与问题无关，照样能读。
 * 所以这里不硬凑一个用神，只讲这几样，并在结尾把「为什么没有结论」说清楚：
 * 让用户知道该补一步（选方向），而不是以为插件什么都说不出来。
 */
function liuyaoGeneralSummary(r) {
  const hex = (r.hexStrength && r.hexStrength.lines) || [];
  if (!hex.length) return null;
  const shi = hex.find((l) => l.shi) || null;
  const ying = hex.find((l) => l.ying) || null;
  const body = r.body || {};
  const ben = body.ben || {};
  const bian = body.bian || {};
  const moving = (r.cast && r.cast.movingPositions) || [];
  const movingLines = hex.filter((l) => l.moving);
  const q = String(r.question || '').trim();
  const labels = uniq([...(body.labels || []), ...((r.hexStrength && r.hexStrength.labels) || [])]);
  const month = r.hexStrength && r.hexStrength.month ? r.hexStrength.month.branch : '';

  const form = [
    ben.chong ? '六冲卦：事情容易散、节奏快' : '',
    ben.he ? '六合卦：事情黏住、快不起来' : '',
    body.fuYin && (body.fuYin.inner || body.fuYin.outer) ? '有伏吟：原地打转' : '',
    body.fanYin && (body.fanYin.inner || body.fanYin.outer) ? '有反吟：来回反复' : '',
  ].filter(Boolean);

  return {
    system: 'liuyao',
    title: '先看这一卦：这卦大致在说什么',
    chips: uniq([ben.name, bian.name ? `变${bian.name}` : '', moving.length ? `${moving.length} 爻动` : '静卦', month ? `${month}月` : '']),
    lead: `${q ? `你问的是「${q}」。` : ''}本卦「${ben.name || '—'}」${bian.name ? `，${moving.length ? `第 ${moving.join('、')} 爻动` : '六爻安静'}，变「${bian.name}」` : ''}。`
      + `方向还留在「综合」，所以这一卦没有取用神——先只讲与问题无关的那几样：你（世爻）、事情（应爻）、卦体。`,
    sections: [
      { h: '代表你的是', t: shi ? `世爻在${shi.name}（${shi.branch}${shi.element}·${shi.liuqin}）：${stateLine(shi) || '状态平稳'}。` : '这一卦取不到世爻。' },
      { h: '代表事情的是', t: ying ? `应爻在${ying.name}（${ying.branch}${ying.element}·${ying.liuqin}）：${stateLine(ying) || '状态平稳'}。应爻说的是「事情那一头」的状态，不是你努力的程度。` : '这一卦取不到应爻。' },
      { h: '卦体与动爻', t: `${form.length ? `${form.join('；')}。` : '没有六冲、六合、伏吟、反吟这类整体结构。'}`
        + `${movingLines.length ? `动爻在${movingLines.map((l) => `${l.name}（${l.liuqin}）`).join('、')}——动的地方，就是这件事会发生变化的那一环。` : '六爻安静：眼下没有明显在动的地方，说明事情的节奏还没起来。'}` },
    ],
    advice: [
      '先在上面选一个「询问方向」（工作、感情、生意、推进、择日）：选完才会取用神，旺衰、应期、成败条件才有落点。',
      ...((ASK.other && ASK.other.reality) || []).slice(0, 2),
    ].filter(Boolean),
    caveat: '未指定所问之事：这一版只读世应、卦体与动爻，不判成败，也不给应期——不是算不出来，是取用神要先知道问什么。',
    footer: '以上是把盘面符号翻译成话，不是断语；真正的判断要看现实里那几步。',
  };
}

function liuyaoSummary(r) {
  const ug = r.useGod || {};
  // 没有用神（方向停在「综合」）时走世应版，不让第一屏空着
  if (!ug.liuqin) return liuyaoGeneralSummary(r);
  const found = ug.found || [];
  if (!found.length && !ug.missing) return null;
  const q = String(r.question || '').trim();
  const strengthLines = (r.useGodStrength && r.useGodStrength.lines) || [];
  const byPos = (pos) => strengthLines.find((l) => l.position === pos) || null;
  const hexLines = (r.hexStrength && r.hexStrength.lines) || [];
  const shi = hexLines.find((l) => l.shi) || null;
  const month = r.useGodStrength && r.useGodStrength.month ? r.useGodStrength.month.branch : '';
  const day = (r.dayGanZhi && r.dayGanZhi.name) || '';

  const positions = found.map((f) => f.name).join('、');
  const lead = `${q ? `你问的是「${q}」。` : '你没填具体问题，这里按「综合」取用神，结论会更粗。'}`
    + `这卦里代表它的是「${ug.liuqin}」（${ug.ask || ''}），`
    + (found.length
      ? `落在${positions}${found.length > 1 ? '——两处都出现了，两个条件要一起看' : ''}。`
      : '盘中看不见它（伏藏），要等冲开或引出才有动静。')
    + `日辰是${day || '—'}，月建是${month || '—'}。`;

  const favors = [];
  const burdens = [];
  for (const f of found) {
    const st = byPos(f.position);
    if (!st) continue;
    if (/旺|相/.test(st.monthState || '') && !st.kong && !st.monthChong) favors.push(f.name);
    if (/日克|日冲/.test(st.dayRelation || '') || st.kong || st.monthChong) burdens.push(f.name);
  }
  const balance = found.length
    ? (favors.length > burdens.length ? '条件偏有利'
      : burdens.length > favors.length ? '条件偏紧，得有外力或时间'
        : '一半一半，取决于你怎么推')
    : '没有可判的落点';

  const flags = uniq([
    ...(ug.labels || []).filter((x) => /两现|伏藏|六合|六冲/.test(x)),
    r.body && r.body.ben && r.body.ben.chong ? '六冲卦：事情容易散，节奏偏快' : '',
    r.body && r.body.ben && r.body.ben.he ? '六合卦：事情黏住，快不起来' : '',
  ]);

  const yingqiBranches = uniq(((r.yingqi && r.yingqi.items) || []).map((x) => x.branch)).slice(0, 4);

  return {
    system: 'liuyao',
    title: '先看这一卦：这卦大致在说什么',
    chips: uniq([r.ben && r.ben.name, `用神 ${ug.liuqin || ''}`, month ? `${month}月` : '', r.yingqi ? r.yingqi.tempo : '']),
    lead,
    sections: [
      { h: '代表你的是', t: shi ? `世爻在${shi.name}（${shi.branch}${shi.element}·${shi.liuqin}）：${stateLine(shi) || '状态平稳'}。` : '这一卦的世爻取不到，先看用神那一条。' },
      { h: '代表这件事的是', t: found.length
        ? found.map((f) => `${f.name} ${f.ganzhi}（${f.liuqin}）：${stateLine(byPos(f.position)) || '没有明显的月日冲克'}。`).join('')
        : '用神伏藏：盘中看不见它，说明这件事现在还不在明面上，要等一个引子。' },
      { h: '成不成看哪里', t: `把用神的月令与日辰放在一起，盘面给的是「${balance}」。${flags.length ? `另有：${flags.join('；')}。` : ''}` },
    ],
    advice: [
      ...((ASK[askKind(ug.direction)] && ASK[askKind(ug.direction)].reality) || []).slice(0, 2),
      yingqiBranches.length ? `应期只看地支：${yingqiBranches.join('、')}——地支只是「往哪个方向等」，不是公历日期。` : '',
    ].filter(Boolean),
    caveat: uniq([
      found.length > 1 ? `用神两现（${positions}）：本插件不替你二选一，两处条件一起看。` : '',
      ug.missing ? '用神伏藏：先看伏神与飞神的关系，再看有没有东西把它冲出来。' : '',
      '世应只说明「你」和「事」的相对位置，不直接等于吉凶。',
    ]).join(''),
    footer: '以上是把盘面符号翻译成话，不是断语；真正的判断要看现实里那几步。',
  };
}

function meihuaSummary(r) {
  const bu = r.bodyUse;
  if (!bu || !bu.body || !bu.use) return null;
  const q = String(r.question || '').trim();
  return {
    system: 'meihua',
    title: '先看这一卦：方向大致在哪',
    // 标签写体用关系（谁给谁力），不把「大吉」顶在最前面：
    // 引擎的 level 是条件层面的刻度，放到标题旁边就会被读成结果。
    chips: uniq([r.ben && r.ben.name, r.bian && `变${r.bian.name}`, bu.relation ? `体用 ${bu.relation.split('（')[0]}` : '']),
    lead: `${q ? `你问的是「${q}」。` : ''}本卦「${r.ben && r.ben.name}」，动在第 ${r.moving} 爻，变卦「${r.bian && r.bian.name}」。`
      + `体卦 ${bu.body.trigram}（${bu.body.element}）代表你，用卦 ${bu.use.trigram}（${bu.use.element}）代表这件事：${bu.relation}。`,
    sections: [
      { h: '过程与结果', t: `过程看互卦「${(r.hu && r.hu.name) || '—'}」，结果看变卦「${(r.bian && r.bian.name) || '—'}」。梅花给的是方向，不是细节——它不会告诉你几号、多少钱。` },
      { h: '盘面给的分量', t: `这一卦的体用关系被标成「${bu.level}」。注意：这是条件层面的判断，不是结果已经发生；条件好但不动，一样没有结果。` },
    ],
    advice: [
      '把它当「换个角度看这件事」：体用只分「谁在给、谁在耗」，剩下要你自己补具体动作。',
      '如果要推进，先定一个最小动作（打个电话、发条消息），别等条件齐了再动。',
    ],
    caveat: '梅花取象的自由度大：同一卦，不同人读出的细节可以不同。本插件只取体用生克这一层。',
    footer: '以上是把盘面符号翻译成话，不是断语；真正的判断要看现实里那几步。',
  };
}

function daliurenSummary(r) {
  const sc = r.sanChuan || {};
  if (!sc.chu || !sc.zhong || !sc.mo) return null;
  const q = String(r.question || '').trim();
  const say = (c) => `${c.zhi}（${c.liuQin || ''}·${c.jiangFull || ''}）`;
  const plain = (c) => (LIUQIN_PLAIN[c.liuQin] ? `——${LIUQIN_PLAIN[c.liuQin]}` : '');
  return {
    system: 'daliuren',
    title: '先看这一课：事情怎么走到这一步',
    chips: uniq([r.geJu && r.geJu.name, `${sc.chu.zhi}→${sc.mo.zhi}`, r.yueJiang && `月将${r.yueJiang.zhi}`]),
    lead: `${q ? `你问的是「${q}」。` : ''}三传是 ${sc.chu.zhi} → ${sc.zhong.zhi} → ${sc.mo.zhi}；`
      + `末传落 ${sc.mo.zhi}（${sc.mo.liuQin || ''}·${sc.mo.jiangFull || ''}），课体是「${(r.geJu && r.geJu.name) || '—'}」。`,
    sections: [
      { h: '起手（初传）', t: `${say(sc.chu)}${plain(sc.chu)}。这是事情开头的样子。` },
      { h: '转折（中传）', t: `${say(sc.zhong)}${plain(sc.zhong)}。中间会经过这一段，也是容易改道的地方。` },
      { h: '落点（末传）', t: `${say(sc.mo)}${plain(sc.mo)}。末传比初传更接近结果——但也只是「照现在这样走下去会到哪」。` },
    ],
    advice: [
      '先看初传：事情是从哪儿起的？把那个起点找出来，比猜结果有用。',
      '中传若与初传相冲相克，说明中途会变；这时别把计划定死。',
    ],
    caveat: '三传讲的是传变形态，不给具体日期；同一课不同流派对课体的命名也有差异。',
    footer: '以上是把盘面符号翻译成话，不是断语；真正的判断要看现实里那几步。',
  };
}

function qimenSummary(r) {
  const dayGan = r.siZhu && r.siZhu.day ? String(r.siZhu.day)[0] : '';
  const hourGan = r.siZhu && r.siZhu.time ? String(r.siZhu.time)[0] : '';
  const palaces = r.palaces || [];
  if (!palaces.length) return null;
  const findStem = (g) => palaces.find((p) => p.tianPan === g)
    || (r.centerPalace && r.centerPalace.tianPan === g ? r.centerPalace : null);
  const mine = findStem(dayGan);
  const thing = findStem(hourGan);
  const q = String(r.question || '').trim();
  // 「6宫」是给人看的界面里最别扭的一种写法：读奇门的人认的是乾宫、巽宫。
  // 宫名从 PALACE_FIELD 的释义里取（「乾宫：…」），取不到再退回数字。
  const pName = (p) => {
    const f = p && PALACE[p.palace] && PALACE[p.palace].field;
    return f ? f.split('：')[0] : (p ? `${p.palace}宫` : '盘中取不到');
  };
  const pDir = (p) => (p && PALACE[p.palace] && PALACE[p.palace].dir ? `（${PALACE[p.palace].dir}）` : '');
  const cell = (p) => (p ? `${pName(p)}${pDir(p)}｜${p.gate || '—'}·${p.star || '—'}·${p.god || '—'}` : '盘中取不到');
  const rel = (p) => {
    if (!p || !p.gateRelation || !p.gateRelation.type) return '门与宫的关系没算到';
    return `${p.gateRelation.type}（${p.gateRelation.note || ''}）`;
  };
  return {
    system: 'qimen',
    title: '先看这一局：条件和位置在哪',
    // r.ju 已经含「阴遁/阳遁」，再单列一个「阴遁」标签是重复信息，占位置不增信息
    chips: uniq([r.ju, r.zhiFu && `值符${r.zhiFu.star}`]),
    lead: `${q ? `你问的是「${q}」。` : ''}日干 ${dayGan} 落在${cell(mine)}，时干 ${hourGan} 落在${cell(thing)}——前者代表你，后者代表这件事。`
      + `你这边门与宫是${rel(mine)}；事情那边是${rel(thing)}。`,
    sections: [
      { h: '你这边的条件', t: mine
        ? `你在${PALACE[mine.palace] ? PALACE[mine.palace].field : mine.palace + '宫'}；门是${mine.gate || '—'}——${GATES[mine.gate] || '门名只说明形态'}。`
        : '日干落在中宫或取不到：中宫无门无神，按寄宫（多寄坤二）取用，读的时候要说清这是寄宫。' },
      { h: '事情那边的条件', t: thing
        ? `事情落在${PALACE[thing.palace] ? PALACE[thing.palace].field : thing.palace + '宫'}；门是${thing.gate || '—'}——${GATES[thing.gate] || '门名只说明形态'}。`
        : '时干落在中宫或取不到，同样按寄宫看，别当成坤二本宫。' },
      { h: '门名不是吉凶', t: '开门主启动、生门主生长、休门主等待、伤门主损耗、杜门主隐藏——这些说的是「这件事现在是什么形态」，不是好坏判决。要看它与日干宫、时干宫的生克。' },
    ],
    advice: [
      '把「我这边」和「事情那边」的宫位对一下：两边相距越远，越需要中间人、流程或时间。',
      '如果门名是伤门、死门，不是叫你别做，而是提醒这件事的代价和收尾要先想清楚。',
    ],
    caveat: uniq([r.juMethodNote || '', '奇门重方位与时机；本插件不给具体方位建议，只把宫位与门星神摊开。']).join(''),
    footer: '以上是把盘面符号翻译成话，不是断语；真正的判断要看现实里那几步。',
  };
}

function tarotSummary(r) {
  const cards = r.cards || [];
  if (!cards.length) return null;
  const q = String(r.question || '').trim();
  // 「关节」取当下那一张（牌阵里通常叫现在/现况/建议），没有就取中间一张。
  // 以前取的是「第一张逆位」，那是随机的——同一副牌换个抽牌顺序，结论就换了个位置。
  const pivot = cards.find((c) => /现在|现况|当下|建议|核心/.test(c.position || ''))
    || cards[Math.floor(cards.length / 2)];
  return {
    system: 'tarot',
    title: '先看这几张牌：它们各在说什么',
    // spread 里已经写了「3 张牌阵（过去/现在/未来）」，再挂一个「3 张」是重复
    chips: uniq([r.spread]),
    lead: `${q ? `你问的是「${q}」。` : ''}${r.spread || ''}：`
      + cards.map((c) => `${c.position}「${c.name}」${c.orientation}`).join('，') + '。',
    sections: cards.slice(0, 4).map((c) => ({
      h: c.position,
      t: `「${c.name}」${c.orientation}：${(c.keywords || []).slice(0, 3).join('、') || c.core || ''}。`
        // 逐张库带的三层信息：牌面画了什么、占星落在哪、宫廷牌顶谁；缺就不硬凑
        + `${c.image ? `牌面上${c.image}。` : ''}`
        + `${c.astro ? `占星对应是${c.astro}。` : (c.role ? `它在盘上顶的是「${c.role}」那个角色。` : '')}`
        + `${c.positionHint || ''}`,
    })),
    advice: [
      `最值得先看的是「${pivot.name}」（${pivot.position}·${pivot.orientation}）——${(pivot.keywords || []).slice(0, 3).join('、') || '它所在的位置，就是这件事现在的着力点'}。`,
      '把牌当镜子：它给的是看事情的角度，不是判决。看完写一句「那我下一步做什么」。',
    ],
    caveat: r.systemNote || '塔罗为象征系统，牌义与元素对应存在流派差异。',
    footer: '以上是把盘面符号翻译成话，不是断语；真正的判断要看现实里那几步。',
  };
}

function hepanSummary(r) {
  const sc = r.score;
  if (!sc) return null;
  const dims = (r.dimensions || []).filter((d) => d && d.text);
  // 合盘里 dayMaster 是「丁火」这样的一整串，不是 {stem,element}；两种写法都接住，
  // 否则标签会渲染成 undefinedundefined，比不给还难看。
  const name = (x) => {
    const dm = x && x.dayMaster;
    if (!dm) return '';
    if (typeof dm === 'string') return dm.replace(/日主$/, '');
    return `${dm.stem || ''}${dm.element || ''}`;
  };
  const a = name(r.a);
  const b = name(r.b);
  return {
    system: 'hepan',
    title: '先看这一张：你们大致怎么相处',
    chips: uniq([a && b ? `${a} × ${b}` : '', sc.level, `${sc.total}/100`]),
    lead: `${a && b ? `你们是 ${a} 与 ${b}。` : ''}合盘描述的是「相处方式与互补点」，不判合不合，也不决定关系成败。`
      + `整体上盘面给的是「${sc.level}」（${sc.total}/100——分数只是相对刻度，不是及格线）。`,
    sections: dims.slice(0, 3).map((d) => ({ h: d.label, t: d.text })),
    advice: [
      '一起看，别一个人看完拿去判断对方：前者是对话，后者是审判。',
      '把上面的分歧当话题清单：哪一条你们真的在意，就聊哪一条。',
    ],
    caveat: (r.notes && r.notes[0]) || '合盘看的是相处方式与互补点，不决定关系成败。',
    footer: '以上是把盘面符号翻译成话，不是断语；真正的判断要看现实里那几步。',
  };
}

function trendSummary(r) {
  const pts = r.points || [];
  const segs = r.segments || [];
  if (!pts.length || !segs.length) return null;
  // 「现在」由调用方传进来的 asOf 决定（meta.nowYear），不读挂钟：
  // 同一条线在任何时候重新生成，文字必须一模一样。
  const nowYear = Number.isInteger(r.meta && r.meta.nowYear) ? r.meta.nowYear : null;
  const cur = nowYear ? (pts.find((p) => p.year === nowYear) || null) : null;
  const seg = cur
    ? (segs.find((s) => cur.age >= s.startAge && cur.age <= s.endAge) || segs[0])
    : segs[0];
  const next = segs[segs.indexOf(seg) + 1];
  const inSeg = pts.filter((p) => p.age >= seg.startAge && p.age <= seg.endAge);
  const avg = inSeg.length ? inSeg.reduce((n, p) => n + p.score, 0) / inSeg.length : 0;
  const allAvg = pts.reduce((n, p) => n + p.score, 0) / pts.length;
  const tone = avg >= allAvg + 5 ? '比一生平均更亮' : avg <= allAvg - 5 ? '比一生平均更闷' : '与一生平均差不多';
  const best = (r.highlights && r.highlights.best) || [];
  const worst = (r.highlights && r.highlights.worst) || [];
  const nowLine = cur
    ? `你现在 ${cur.age} 岁（${nowYear} 年），在「${seg.ganZhi}」这一步的第 ${cur.age - seg.startAge + 1} 年（${seg.startAge}–${seg.endAge} 岁）`
      + `${next ? `，再过 ${seg.endAge - cur.age + 1} 年到 ${next.startAge} 岁换「${next.ganZhi}」` : '，已是最后一步'}。`
    : `没给当前日期（asOf），所以不标「现在在第几步」；先看第一步「${seg.ganZhi}」（${seg.startAge}–${seg.endAge} 岁）起手的样子。`;
  return {
    system: 'trend',
    title: '先看这一条线：这些年大致什么走势',
    chips: uniq([seg.ganZhi, `${seg.startAge}–${seg.endAge} 岁`, cur ? `${cur.age} 岁` : '']),
    lead: `这条线按 ${(r.meta && r.meta.toAge) || pts.length} 岁排到 ${pts[pts.length - 1].year} 年，共 ${segs.length} 步大运。`
      + nowLine,
    sections: [
      { h: '这一步的基调', t: `这一步里各年的平均分是 ${avg.toFixed(0)}，${tone}（全盘平均 ${allAvg.toFixed(0)}）。分数是相对刻度，不是绝对值。` },
      { h: '这些年里最亮和最闷的', t: `${best.length ? `高点：${best.slice(0, 2).join('、')}` : '没有特别高的点'}；${worst.length ? `低点：${worst.slice(0, 2).join('、')}` : '没有特别低的点'}。高点适合推进，低点适合收口。` },
      { h: '怎么用这条线', t: '它不是命运表，是把「顺/不顺」画成可视的起伏。真正决定走向的，是你在这几步里做了什么。' },
    ],
    advice: [
      '把下一步换运的年龄记下来：换运前后半年，通常是最容易做决定、也最容易冲动的时候。',
      '低点年别做大额投入，高点年别只观望——这两条比记分数管用。',
    ],
    caveat: '线按年岁等距绘制，实际每步大运十年；起点与交运按节气推算，出生时刻未知时按日估算。',
    footer: '以上是把盘面符号翻译成话，不是断语；真正的判断要看现实里那几步。',
  };
}

/**
 * 生成盘面顶部的人话总结。
 * @param {object} r compute() 的结果
 * @returns {null|{system,title,chips,lead,sections,advice,caveat,footer}}
 */
/**
 * 中医体质：主质一条、次高一条、调养三条。
 * 判定线是公开标准的口径，这里不改；问卷区分度不足时照实说（flat），别硬给一个主质。
 */
/**
 * 五运六气：一句总纲、四段（气候底色 / 当前运与气 / 被强调的脏腑 / 常见不适）。
 * 特殊格局（天符岁会那一类）只放在 caveat 里点一句，不喧宾夺主。
 */
function taiyiSummary(r) {
  const t = r.taiyi;
  const sec = [
    {
      h: '太乙落在哪一宫',
      t: `${t.palaceName}宫（${t.dir}），这是三年里的第 ${t.yearInPalace} 年，对应「${t.li}」。太乙三年换一宫，走的是八宫、不入中五，所以在盘面上永远看不到它落在中间。`,
    },
    {
      h: '八门这三十年',
      t: `${r.gate.gate}。八门三十年一转，1954 年从休门起，顺序是休、生、伤、杜、景、死、惊、开，所以一个门要值三十年，不是每年都换。`,
    },
    {
      h: '文昌在哪',
      t: `文昌在${r.wenchang.pos}（${r.wenchang.god}，${r.wenchang.palaceName}宫）。文昌十八年一周，阳局从申起、阴局从寅起，路上遇乾、坤各数两次，所以要数满十八步才回到原点。`,
    },
    {
      h: '计神、始击与主客算',
      t: `计神在${r.jishen.branch}，始击在${r.shiji.pos}（${r.shiji.god}）。主算 ${r.suan.zhu}、客算 ${r.suan.ke}：大将按算数的个位落宫（整十归一），参将是大将乘三的个位。四个将分别落在${r.jiang.zhuDaName}、${r.jiang.keDaName}、${r.jiang.zhuCanName}、${r.jiang.keCanName}宫。`,
    },
    {
      h: '定目、三基与五福',
      t: `定目在${r.dingmu.pos}（${r.dingmu.god}）：淘金歌讲「以合神加太岁」，把合神搬到太岁处，天目跟着转过去，落点就是定目。三基——君基${r.sanji.jun}（三十年一移）、臣基${r.sanji.chen}（三年一移）、民基${r.sanji.min}（一年一移）；五福在${r.wufu.palaceName}宫（四十五年一移），大游在${r.dayou.palaceName}宫（三十六年一移、逆数）。十精另五位：天乙${r.shijing.tianyi}、地乙${r.shijing.diyi}、直符${r.shijing.zhifu}、四神${r.shijing.sishen}、小游${r.shijing.xiaoyou}。`,
    },
    {
      h: '阴阳数和',
      t: `主算：${r.heshu.zhu.text}客算：${r.heshu.ke.text}这一段只说「和不和」，上和、次和、下和是算数落在特定数上的分级，不据此断胜负。`,
    },
    {
      h: '卦象吉凶',
      t: `${r.jixiong.label}。${r.jixiong.text}${r.jixiong.note}判据出自卷一《推太公考时法》，只标吉凶，不推成与不成。`,
    },
    {
      h: '神将与判辞',
      t: (() => {
        const sj = r.shenjiang;
        if (!sj || !sj.rows) return '这一盘没有排神将。';
        const goods = sj.goods && sj.goods.length ? '在吉神下的：' + sj.goods.join('、') : '没有将落在吉神下';
        const bads = sj.bads && sj.bads.length ? '在凶神下的：' + sj.bads.join('、') : '没有将落在凶神下';
        const v = r.verdict ? '合起来判「' + r.verdict.label + '」。' : '';
        return '按日干起十二神（' + sj.stem + '日、' + (sj.day ? '昼贵' : '夜贵') + '、贵人临' + sj.startBranch + (sj.dir > 0 ? '顺' : '逆') + '行），' + goods + '；' + bads + '。' + v + '这一层是古人拿十二神看四将落位的办法，只说明古法怎么判，不是对事情的预测。';
      })(),
    },
    {
      h: '这一盘算到哪一层',
      t: `积年 ${r.meta.jinian}，残年 ${r.meta.rest360}，${r.meta.dunText}${r.meta.ju}局。太乙、八门、文昌、计神、始击、主客算与四将、掩迫囚格关、定目、三基、五福、大游、十精、阴阳数和、月日时三计、古法吉凶都在；${r.scope.notCovered.join('、')}这几项没有收录，盘面上也不显示。`,
    },
  ];
  return {
    system: 'taiyi',
    title: '先看这一张',
    chips: [`${r.meta.year}年`, `${r.meta.dunText}${r.meta.ju}局`, `${t.palaceName}宫`].filter(Boolean),
    lead: `${r.meta.year} 年太乙：${r.meta.dunText}${r.meta.ju}局，太乙临 ${t.palaceName} 宫（${t.dir}），八门值 ${r.gate.gate}。`,
    sections: sec,
    advice: [
      `先看太乙落在哪：${t.palaceName}宫${t.dir}，这三年的大方向就在这一格，别拿它当每年的细节来读。`,
      `八门十年一变的说法常被混用，这里按三十年一转的口径——${r.gate.gate}值这三十年，不是今年才轮到。`,
      '太乙是象数盘，给的是位置的对应关系，不是「今年会发生什么」的判决。',
    ],
    caveat: `这一层到太乙、八门、文昌、计神、始击、主客算与四将、八种格局、定目、三基、五福、大游、十精与阴阳数和；${r.scope.notCovered.join('；')}都未收录，别按它们解读。`,
    footer: '太乙年家用积年推局，与八字按立春换年、运气按大寒分年都不同口径，三套不要互相印证。',
  };
}
function wuyunliuqiSummary(r) {
  const sp = [];
  if (r.special.taiYi) sp.push('太乙天符');
  if (r.special.tianFu && !r.special.taiYi) sp.push('天符');
  if (r.special.suiHui && !r.special.taiYi) sp.push('岁会');
  if (r.special.tongTianFu) sp.push('同天符');
  if (r.special.tongSuiHui) sp.push('同岁会');
  const sec = [
    { h: '这一年的气候底色', t: r.combo.text },
    { h: '此刻在哪个运、哪口气', t: r.current.text },
    { h: '被强调的脏腑', t: `中运主${r.zhongyun.organ}：传统上这样描述——${r.zhongyun.effect.organ}。${r.zhongyun.effect.sign}` },
    { h: '今年常被说到的身体反应', t: `上半年（${r.sitian.qi}司天）：${r.sitian.climate.sign}；下半年（${r.zaiquan.qi}在泉）：${r.zaiquan.climate.sign}` },
  ];
  return {
    system: 'wuyunliuqi',
    title: '先看这一张',
    chips: [`${r.year.ganzhi}年`, r.zhongyun.name, `${r.sitian.qi}司天`].filter(Boolean),
    lead: `${r.year.ganzhi} 运气年：中运${r.zhongyun.name}，${r.sitian.qi}司天、${r.zaiquan.qi}在泉。`,
    sections: sec,
    advice: [
      `顺着「${r.zhongyun.nature}」来调：${r.zhongyun.tai ? '本气偏胜，别再加码，先把被克的那一头护住' : '本气不足，别硬扛，先补本气再谈其他'}。`,
      `这一年偏「${r.sitian.climate.climate}」，起居上按这个方向做减法，比按季节硬套更贴。`,
      '运气盘给的是「今年偏什么」，不是「你会得什么病」；有具体不适看医生。',
    ],
    caveat: sp.length
      ? `特殊格局：${sp.join('、')}。${r.special.notes.join('')}`
      : '这一年在格局上没有天符、岁会那一类标记，按中运与司天在泉的常例读就好。',
    footer: '运气年以大寒为界，与八字按立春定年柱不同；两套口径不要互相印证。',
  };
}
function constitutionSummary(r) {
  const p = r.primary;
  const sec = [];
  if (p) {
    sec.push({ h: p.name + '是什么', t: (p.oneLine || '') + (p.trait ? ' ' + p.trait : '') });
    if (p.tendency) sec.push({ h: '容易被影响的地方', t: p.tendency });
  }
  const second = (r.top || []).find((x) => p && x.name !== p.name);
  if (second) sec.push({ h: '次高的一项', t: `${second.name} ${second.converted} 分（${second.level}）——它常和主质一起出现，调的时候顺手带上。` });
  return {
    system: 'constitution',
    title: '先看这一张',
    chips: [p ? p.name : '未判定', r.pinghe ? `平和 ${r.pinghe.converted}` : '', r.meta ? `${r.meta.answered}/${r.meta.total} 题` : ''].filter(Boolean),
    lead: p
      ? `主体质是「${p.name}」${p.level === '是' ? '' : `（${p.level}，未完全达判定线）`}，转化分 ${p.converted}；平和质 ${r.pinghe ? r.pinghe.converted : '—'} 分。`
      : '这份问卷还没答够，先别急着对号入座。',
    sections: sec,
    advice: (r.care || []).slice(0, 3),
    caveat: r.flat
      ? '每题都选了同一个选项，问卷对你的区分度不足——主质仅供参考，建议按最近一年的真实感受重答一遍。'
      : '体质是长期倾向，不是病名，也不与八字、星座互证；有具体不适请就医。',
    footer: '打分为自评，同一个人隔一个月再答可能差一档，看趋势比看单次结果有用。',
  };
}

export function plainSummary(r) {
  if (!r || typeof r !== 'object') return null;
  if (r.system === 'bazi') return baziSummary(r);
  if (r.system === 'ziwei') return ziweiSummary(r);
  if (r.system === 'liuyao') return liuyaoSummary(r);
  if (r.system === 'meihua') return meihuaSummary(r);
  if (r.system === 'daliuren') return daliurenSummary(r);
  if (r.system === 'qimen') return qimenSummary(r);
  if (r.system === 'tarot') return tarotSummary(r);
  if (r.system === 'hepan') return hepanSummary(r);
  if (r.system === 'trend') return trendSummary(r);
  if (r.system === 'constitution') return constitutionSummary(r);
  if (r.system === 'wuyunliuqi') return wuyunliuqiSummary(r);
  if (r.system === 'taiyi') return taiyiSummary(r);
  return null;
}
