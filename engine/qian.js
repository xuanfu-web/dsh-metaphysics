// 每日福签：按公历日期确定性抽取，一天一签，不设重摇。
// 签文与释义为本插件原创（不照录任何宫观签谱），四档：上上 / 上 / 中 / 平。
import { MIN_YEAR, MAX_YEAR, daysInMonth } from './validate.js';
import { fail } from './fail.js';
import { solarToLunar } from './lunar.js';
import { fromJDN, ganzhiName, dayGanzhiIndex, toJDN } from './calendar.js';

/**
 * 36 支签。level 只做四档，不设「下」：福签是给一天一个好开头，
 * 不是给判决书。每支签：签题、两句七言签文、签意、可执行的建议、两枚标签。
 *
 * 签文走七言对句：上句取景，下句见意；签意仍旧说人话，不堆典故，
 * 也不替人下断言——只把今天适合看的方向轻轻摆出来。
 */
export const SLIPS = [
  // ── 上上（4）──
  {
    no: 1, level: '上上', title: '云开月明',
    verse: ['云散长空月自明', '好风送过小窗棂'],
    meaning: '压在心头的事有了松动，像云散之后月色自己漫进来。今天适合把迟迟未说的话说出口，也适合等一封在路上的回音。',
    advice: '开窗，给好消息留个进来的口。',
    chips: ['宜开口', '宜候音'],
  },
  {
    no: 2, level: '上上', title: '顺水行舟',
    verse: ['一篙点破碧琉璃', '两岸青山次第低'],
    meaning: '手上的事正顺着势头走，不必与它较劲。把力气用在掌舵，比一味划桨更省力，也更早见岸。',
    advice: '为正在推进的事写下下一步。',
    chips: ['顺势', '轻桨'],
  },
  {
    no: 3, level: '上上', title: '春信入怀',
    verse: ['梅梢才透一分暖', '远信已随春水来'],
    meaning: '你等的回应正在路上，未必照你设想的样子来，方向却是朝你。今天适合留意消息，也适合先回别人的话。',
    advice: '回一条搁置已久的消息。',
    chips: ['有信', '宜往来'],
  },
  {
    no: 4, level: '上上', title: '灯火可亲',
    verse: ['灯火初上人初归', '一室清欢话到迟'],
    meaning: '人和事都顺的一天。比起独行，今天更容易在熟人间得到照应；留一点时间给身边的人，所得的会比预想的多。',
    advice: '约久未相见的人吃一顿便饭。',
    chips: ['人和', '宜小聚'],
  },

  // ── 上（10）──
  {
    no: 5, level: '上', title: '登高望远',
    verse: ['欲穷千里先移步', '千阶原自足下来'],
    meaning: '目标看着远，缺的往往只是第一步。今天先把最小的那一步做了，视野会跟着变；不必一次看清全程。',
    advice: '把大目标拆成今天能做完的一件小事。',
    chips: ['起步', '一览'],
  },
  {
    no: 6, level: '上', title: '一叶知秋',
    verse: ['一叶初黄知岁晚', '微风过处见端倪'],
    meaning: '小事里已经有了信号。今天适合留意细节：一句改口、一次迟疑，都可能藏着事情的走向。看得早，调整便从容。',
    advice: '把注意到的细节记下，过几日回看。',
    chips: ['观微', '早备'],
  },
  {
    no: 7, level: '上', title: '旧友重逢',
    verse: ['故人忽自门前过', '笑问别来可无恙'],
    meaning: '旧关系有回暖的迹象。一次偶遇、一条消息，可能把断了的线重新接上。不必刻意经营，自然相处就好。',
    advice: '翻出旧联系人，问一句近况。',
    chips: ['故人', '叙旧'],
  },
  {
    no: 8, level: '上', title: '小满未满',
    verse: ['麦穗初齐方小满', '留些余地待风来'],
    meaning: '进展不错，却还没到收的时候。今天适合收着点劲，把余地留给变化：话说八分，事做九分，反而更稳。',
    advice: '给计划留一个可以调整的口子。',
    chips: ['留余', '未满'],
  },
  {
    no: 9, level: '上', title: '磨刀不误',
    verse: ['磨刀不误山中事', '慢里藏锋一寸功'],
    meaning: '看似耽误的准备，其实在省后面的力气。今天适合补工具、补功课、补流程；底子顺了，再动手就快。',
    advice: '花半小时整理手边的工具或资料。',
    chips: ['先备', '藏锋'],
  },
  {
    no: 10, level: '上', title: '借风使船',
    verse: ['好风借我一帆力', '不费撑篙也向前'],
    meaning: '身边有可借的力：一个人、一条路子、一个现成的办法。今天不必事事自己扛，开口求助反而是聪明的做法。',
    advice: '把卡住的一步说给懂行的人听。',
    chips: ['借力', '问路'],
  },
  {
    no: 11, level: '上', title: '一步一景',
    verse: ['一步行来一步景', '山回水转又逢村'],
    meaning: '不必等万事俱备才出发。边走边看，路上自会有新的消息；今天适合边做边调，别把计划钉得太死。',
    advice: '先做十分钟，再决定要不要继续。',
    chips: ['行看', '试步'],
  },
  {
    no: 12, level: '上', title: '心手相应',
    verse: ['心到之处手亦到', '落笔浑如顺水舟'],
    meaning: '想与做对上了的一天，动手便顺。今天适合处理需要熟练度的事，也适合把想法落成第一个版本。',
    advice: '把脑子里的方案写成一页纸。',
    chips: ['应手', '落笔'],
  },
  {
    no: 13, level: '上', title: '守得云开',
    verse: ['云低未必无晴日', '守到云开月自明'],
    meaning: '眼下没有明显进展，却也还没到该放手的时候。今天适合稳住节奏，把该做的做完；转机往往在耐心之后。',
    advice: '按原计划做完今天这一格，不加戏。',
    chips: ['宜守', '待明'],
  },
  {
    no: 14, level: '上', title: '花开两朵',
    verse: ['一树花开分两朵', '各含春色各倾城'],
    meaning: '摆在面前的两个选择各有各的好。今天不必急着二选一，先看清自己更在意什么，答案会慢慢浮出来。',
    advice: '把两个选项的好处各写三条。',
    chips: ['两可', '细看'],
  },

  // ── 中（14）──
  {
    no: 15, level: '中', title: '平流缓进',
    verse: ['水不争先流自稳', '缓舟也能到远滩'],
    meaning: '节奏偏慢，却没有后退。今天适合按部就班，把手上的事做扎实；急着提速，反而容易在浅处搁住。',
    advice: '把今天的待办减到三件。',
    chips: ['稳行', '循序'],
  },
  {
    no: 16, level: '中', title: '半山听雨',
    verse: ['行到半山逢细雨', '且向檐下听片时'],
    meaning: '走到半途遇上天气变化，停下不是认输。今天适合把节奏放慢，等雨小些再走，反倒省鞋省力。',
    advice: '给自己留一段什么都不做的空白。',
    chips: ['暂歇', '听雨'],
  },
  {
    no: 17, level: '中', title: '细水长流',
    verse: ['细水长流不争先', '日日一滴也成泉'],
    meaning: '这件事靠的是持续，不是一时的爆发。今天做一点就好，要紧的是别断；积到某日，自会显出分量。',
    advice: '把目标改成每天十分钟。',
    chips: ['日进', '不断'],
  },
  {
    no: 18, level: '中', title: '各安其位',
    verse: ['各人自有各人位', '先安己心再顾人'],
    meaning: '今天容易被他人的情绪或期待带走。先把边界放好：能帮的帮，帮不了的说清楚。顾好自己，才有余力顾别人。',
    advice: '试着说一次「这次我帮不上」。',
    chips: ['守界', '顾己'],
  },
  {
    no: 19, level: '中', title: '留白三分',
    verse: ['话到嘴边留三分', '纸上留白方成画'],
    meaning: '说得太满容易收不回来。今天适合少说多听，把要紧的话留到合适的场合；留白不是退让，是给彼此转身的余地。',
    advice: '重要的话先想三秒再发。',
    chips: ['慎言', '留白'],
  },
  {
    no: 20, level: '中', title: '轻装上路',
    verse: ['行囊减半路自宽', '放下三分便轻快'],
    meaning: '身上挂着太多不必带的东西：旧任务、旧情绪、旧承诺。今天适合清一清，卸下一点，路会好走许多。',
    advice: '删掉一个早已不想做的待办。',
    chips: ['减负', '清爽'],
  },
  {
    no: 21, level: '中', title: '观棋不语',
    verse: ['局外观棋心自明', '少言一句是非轻'],
    meaning: '今天的信息还不齐，急着表态容易站错。适合多看、多问、少下判断；等局面清楚，再决定站哪边。',
    advice: '遇到争论，先问一句「还有别的说法吗」。',
    chips: ['旁观', '缓判'],
  },
  {
    no: 22, level: '中', title: '绕道而行',
    verse: ['直路难通须转折', '山不转处水回环'],
    meaning: '正面推不动的事，换个走法或另有去处。今天适合改路径，而不是加力气：换个说法、换个时间、换个入口。',
    advice: '为卡住的事想一个替代方案。',
    chips: ['换径', '勿硬'],
  },
  {
    no: 23, level: '中', title: '灯下读书',
    verse: ['灯下翻书声细细', '旧题重看又一层'],
    meaning: '缺的往往不是机会，是准备。今天适合补一补功课：把不懂的弄懂，把模糊的弄清楚。准备够了，机会来了才接得住。',
    advice: '挑一个一直没弄懂的问题查清楚。',
    chips: ['补课', '温故'],
  },
  {
    no: 24, level: '中', title: '以退为进',
    verse: ['退一步时天地阔', '让三分处路还长'],
    meaning: '争一时高低，未必划算。今天适合在非原则的事上让一步，把力气留给真正要紧的地方。退不是输，是换个战场。',
    advice: '列出今天可以不争的一件事。',
    chips: ['知退', '换局'],
  },
  {
    no: 25, level: '中', title: '慢火煨汤',
    verse: ['慢火煨汤味方厚', '急火烧水只见烟'],
    meaning: '火候未到，掀锅只会跑了气。今天适合等该等的：等回复、等结果、等情绪过去，把等待用在手边的小事上。',
    advice: '设一个提醒，到点再看结果。',
    chips: ['候火', '莫催'],
  },
  {
    no: 26, level: '中', title: '井井有条',
    verse: ['先理丝线后穿针', '案头清了心也清'],
    meaning: '许多乱，来自没有收好。今天适合先整理再出发：桌面、文件夹、待办清单，理一遍，思路也就顺了。',
    advice: '花十五分钟收拾一个角落。',
    chips: ['先理', '有序'],
  },
  {
    no: 27, level: '中', title: '隔岸观火',
    verse: ['隔岸看火心不慌', '且看风色辨西东'],
    meaning: '别人的热闹先别急着卷进去。今天适合隔开一点距离，看清利害与立场，再决定要不要参与。',
    advice: '对群里的争论先只读不回。',
    chips: ['观火', '缓入'],
  },
  {
    no: 28, level: '中', title: '守口如瓶',
    verse: ['瓶口收紧香不散', '话少之处是非稀'],
    meaning: '今天的话容易传得快。适合把私事、计划与不满收一收，只在该说的地方说。沉默有时比解释更有力。',
    advice: '把想发的长消息先存成草稿。',
    chips: ['守密', '少言'],
  },

  // ── 平（8）──
  {
    no: 29, level: '平', title: '风停雨住',
    verse: ['风停雨住云未散', '且收船桨待天青'],
    meaning: '外部条件暂时不帮忙，硬推只会费劲。今天适合守成：把手上的事收好尾，不新开摊子，等天气转好再动。',
    advice: '今天只做已经答应过的事。',
    chips: ['守成', '待晴'],
  },
  {
    no: 30, level: '平', title: '雾里看花',
    verse: ['雾里看花花未真', '且待雾散再端详'],
    meaning: '眼下看到的多半是轮廓，不是全貌。今天容易把猜测当事实，适合先不下结论，多留一日观察。',
    advice: '把判断写成「目前观察到……」，而不是定论。',
    chips: ['慢看', '勿断'],
  },
  {
    no: 31, level: '平', title: '逆水行舟',
    verse: ['逆水行舟篙要稳', '篙稳何愁到岸迟'],
    meaning: '阻力是真实的，却不是走不动。今天适合放低对速度的期待，一寸一寸往前挪，别指望一步跨过。',
    advice: '把进度目标砍半，完成就算赢。',
    chips: ['稳篙', '寸进'],
  },
  {
    no: 32, level: '平', title: '独木小桥',
    verse: ['独木桥横秋水阔', '且收心绪缓缓行'],
    meaning: '路窄，容不得并行。今天适合一次只理一件事，把注意力收拢，反而不容易掉下去。',
    advice: '关掉一个会打断你的通知。',
    chips: ['专一', '缓行'],
  },
  {
    no: 33, level: '平', title: '空杯以待',
    verse: ['杯中有旧难盛新', '倒空之后水自来'],
    meaning: '旧的东西占着位置，新的便进不来。今天适合放下一点成见或旧安排，给自己留出接纳的余地。',
    advice: '删掉一个「以后再说」的囤积。',
    chips: ['清杯', '纳新'],
  },
  {
    no: 34, level: '平', title: '夜路提灯',
    verse: ['夜路虽长灯在手', '照得脚前一段明'],
    meaning: '看不清远处，但脚边这一圈是亮的。今天不必规划全程，照好眼前三步，路会一段段显出来。',
    advice: '只决定接下来一小时做什么。',
    chips: ['照步', '徐行'],
  },
  {
    no: 35, level: '平', title: '静水深流',
    verse: ['静水无波流自深', '不必声张也向前'],
    meaning: '今天的进展多半在看不见的地方。适合低调做事，少解释、少炫耀；积累无声，却一直在。',
    advice: '把成果先存好，不必急着展示。',
    chips: ['低调', '沉淀'],
  },
  {
    no: 36, level: '平', title: '归巢歇脚',
    verse: ['倦鸟归巢天已暮', '养得羽丰再出林'],
    meaning: '状态比进度更要紧。今天适合把休息当成正事：睡足、吃好、少耗神。恢复过来，明日才有力气。',
    advice: '今晚提前半小时放下手机。',
    chips: ['歇羽', '养神'],
  },
];

export const QIAN_LEVELS = ['上上', '上', '中', '平'];
export const QIAN_RULES = '每日一签：以公历日期为种，同一天只此一签；次日自换，不设重摇。';
export const QIAN_SCOPE = '福签取民俗自省之意，不预示结果；要紧事仍以现实信息为准。';

/** 各档旁白分开写：签筒怎么响、签怎么出来，语气随签走，而不是每天同一句。 */
const ASIDES = {
  上上: '（签筒摇得哗啦作响，一支签跃出筒口）叮——是上上签，接住啦。',
  上: '（拨开签堆，拈出一支，签身还带着木香）这支好，收着。',
  中: '（把签筒转了两圈，才慢慢抽出一支）中签，不急不躁，正稳当。',
  平: '（轻轻摇出一支，吹去签上的浮灰）平签，今日宜缓，先歇口气。',
};

const WEEKDAY = ['日', '一', '二', '三', '四', '五', '六'];
const MONTH_CN = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
const DAY_CN = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

function dayCn(n) {
  if (n <= 10) return n === 10 ? '初十' : `初${DAY_CN[n]}`;
  if (n < 20) return `十${DAY_CN[n - 10]}`;
  if (n === 20) return '二十';
  if (n < 30) return `廿${DAY_CN[n - 20]}`;
  return '三十';
}

const pad2 = (n) => String(n).padStart(2, '0');

/** 日期哈希：同一天同结果；Math.imul 保证 32 位乘法不丢精度。 */
function daySeed(y, m, d) {
  let x = ((y * 73856093) ^ (m * 19349663) ^ (d * 83492791) ^ Math.imul(0x51ed, 2654435761)) >>> 0;
  x = Math.imul(x ^ (x >>> 13), 0x5bd1e995);
  return (x ^ (x >>> 15)) >>> 0;
}

function slipOf(y, m, d) {
  return SLIPS[daySeed(y, m, d) % SLIPS.length];
}

function metaOf(y, m, d) {
  const jdn = toJDN(y, m, d);
  const lunar = solarToLunar(y, m, d);
  const yearGz = ganzhiName(lunar.lunarYear - 4).name;
  const dayGz = ganzhiName(dayGanzhiIndex(jdn)).name;
  return {
    date: `${y}-${pad2(m)}-${pad2(d)}`,
    weekday: `周${WEEKDAY[(jdn + 1) % 7]}`,
    lunar: `${lunar.isLeap ? '闰' : ''}${MONTH_CN[lunar.month - 1]}月${dayCn(lunar.day)}`,
    ganzhi: `${yearGz}年 · ${dayGz}日`,
  };
}

function historyOf(y, m, d) {
  const today = toJDN(y, m, d);
  const out = [];
  for (let i = 0; i < 7; i += 1) {
    const jdn = today - i;
    const p = fromJDN(jdn);
    const s = slipOf(p.year, p.month, p.day);
    out.push({
      date: `${p.year}-${pad2(p.month)}-${pad2(p.day)}`,
      weekday: `周${WEEKDAY[(jdn + 1) % 7]}`,
      no: s.no,
      level: s.level,
      title: s.title,
    });
  }
  return out;
}

/**
 * 每日福签。传公历年月日；同一天永远同一支，次日自动换签。
 * @param {{year:number, month:number, day:number}} input
 */
export function buildQian(input) {
  const { year, month, day } = input || {};
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)
    || year < MIN_YEAR || year > MAX_YEAR || month < 1 || month > 12
    || day < 1 || day > daysInMonth(year, month)) {
    throw fail('E_INPUT', `福签需要真实存在的公历日期（year ${MIN_YEAR}–${MAX_YEAR}、month、day）——请向用户询问或使用今天`);
  }
  const slip = slipOf(year, month, day);
  const meta = metaOf(year, month, day);
  return {
    system: 'qian',
    meta,
    slip: { ...slip, total: SLIPS.length },
    aside: ASIDES[slip.level],
    history: historyOf(year, month, day),
    rules: QIAN_RULES,
    sources: [
      '签文与释义为本插件原创，不照录任何宫观签谱',
      '抽取：公历日期哈希确定性生成（同日同签，次日自动更换）',
    ],
    disclaimer: QIAN_SCOPE,
  };
}
