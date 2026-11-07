// B7 引文库的「另一半」：不进浏览器分块的原文与白话。
//
// 为什么单独一个文件：test/chunks.test.mjs 把 client.bazi / hepan / ziwei 三块的 gzip 上限钉在 232KB，
// 上一轮写的结论是「再加库就该拆块，别抬线」。而这三块要的只是知识卡出处那一行——
// 《书名·卷章》加链接，由 citations.js 的定位字段就够用；原文（quote）与白话（plain）
// 只有引文索引页与 CI 核验用得到，运行时展示不到。于是分两处放：
//   ① 引擎侧（citations.js）：id / 书名 / 卷章 / 链接，每条都被知识卡或破格规则引用得到；
//   ② 本文件：这些条目的原文与白话（CITATION_TEXT），加上一批还没接进运行时的紫微赋文全条（FUWEN_CITATIONS），
//      以及格局的成格原文索引（PATTERN_CHENG_*）。
// 口径由 citations.test.mjs 锁住：引擎侧一条原文都不许留、每条原文都要在这里配齐、
// 本文件不许出现在任何 client.*.js 里。
//
// 本文件不在 tools/build-client.mjs 的 MODULE_ORDER 里，因此不会打进任何 client.*.js。
// 消费方只有两个：tools/citations.mjs（生成 docs/citations.html）与 test/*.test.mjs。
// 原文用字随底本（繁简混排是维基文库这一版网页本身的状态，不做统一改写），
// 逐条由 test/fixtures/citation-sources.json 核验为来源正文的子串。

import { CITATIONS, CITATION_BOOKS, citationOf } from './citations.js';
import { CLASSICS, CLASSIC_BOOKS } from './classics.js';
import { QT, QT_BRANCHES, qtOf } from './qiongtong.js';

// 书名表两侧合看（引擎侧 citationOf 用同一张表补 CLASSICS 的书名）
const BOOK_OF = { ...CLASSIC_BOOKS, ...CITATION_BOOKS };
const enrich = (c) => {
  if (!c) return null;
  const book = BOOK_OF[c.book];
  return { ...c, bookName: book ? book.name : c.book, bookAuthor: book ? book.author : '' };
};

/** 只作索引与核验之用的原文条目（运行时不打包） */
export const FUWEN_CITATIONS = [
  {
    id: 'zw-poge-huaxiong',
    book: 'ziwei',
    chapter: '卷三·论人命入格',
    quote: '又入格不化吉而化凶，只以本命吉凶多寡而断之。',
    plain: '入了格却化吉少、化凶多，只能按原局吉凶的多寡来断。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-luma-kong',
    book: 'ziwei',
    chapter: '卷一·诸星问答论·问天马星所主若何',
    quote: '逢空亡谓之死马、亡马',
    plain: '禄马逢空亡，称死马、亡马，奔走之力被劫。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-luma-tuo',
    book: 'ziwei',
    chapter: '卷一·诸星问答论·问天马星所主若何',
    quote: '遇陀罗谓之折足马',
    plain: '禄马遇陀罗，称折足马，动而受阻。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-sihua-quan',
    book: 'ziwei',
    chapter: '卷一·诸星问答论·问化权星所主若何',
    quote: '权星掌判生杀之神。守身命科禄相逢出将入相。',
    plain: '化权主掌判，与科禄相会主权位。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-sihua-ke',
    book: 'ziwei',
    chapter: '卷一·诸星问答论·问化科星所主若何',
    quote: '科星上界应试，主掌文墨之星。守身命权禄相逢宰臣之贵。',
    plain: '化科主文墨名声，与权禄相会主贵。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  // ── B7 补录：《紫微斗数全书》卷一赋文与卷三两篇（2026-11-06 逐字核验）
  // 卷一在维基文库本里分七篇：太微赋 / 斗数发微论 / 重补斗数彀率 / 增补太微赋 /
  // 诸星问答论 / 斗数骨髓赋 / 女命骨髓赋 / 定富贵贫贱十等论 / 十二宫得地合格诀、失陷破格诀。
  // 原文用字随底本（繁简混排是这一版网页本身的状态，不做统一改写），逐条由
  // test/citations.test.mjs 与 test/fixtures/citation-sources.json 核验为正文子串。
  {
    id: 'zw-taiwei-mingzuo',
    book: 'ziwei',
    chapter: '卷一·太微赋',
    quote: '命坐強宮，細察制化之理。',
    plain: '命宫落在生旺之宫，还要细看这一宫受不受制、得不得化；同是强宫，被制与得化的结果相反。本插件的格局只判星位组合，未补这一层制化。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-taiwei-fanbei',
    book: 'ziwei',
    chapter: '卷一·太微赋',
    quote: '日月最嫌反背，祿馬最喜交馳。',
    plain: '太阳太阴最忌反背（夜生人见太阳、日生人见太阴为失辉），禄存天马最喜同宫交驰。插件的「日月对照」「禄马交驰」两条即承此句。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-taiwei-zifu-sha',
    book: 'ziwei',
    chapter: '卷一·太微赋',
    quote: '紫微天府全依輔弼之功，七殺破軍專依羊鈴之虐。',
    plain: '紫府要靠左辅右弼才见功，杀破狼则借擎羊铃星之威。吉格看辅弼、躁格看四杀，插件的「君臣庆会」「七杀朝斗」「杀破狼」分别落在这两句上。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-taiwei-jiaju',
    book: 'ziwei',
    chapter: '卷一·太微赋',
    quote: '輔弼夾帝為上品，桃花犯主為至淫。',
    plain: '左辅右弼分居命宫前后夹帝座叫「夹帝」，属上品；贪狼（桃花）入命身而无制则叫犯主。插件的「左右夹命」即此夹局取法——夹指前后两宫，不分左右。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-taiwei-junchen',
    book: 'ziwei',
    chapter: '卷一·太微赋',
    quote: '君臣慶會，材善經邦。魁鉞同行，位居臺輔。',
    plain: '紫微为君、辅弼昌曲魁钺为臣，君臣同会主才堪治理；天魁天钺并临主贵居台辅。插件的「君臣庆会」取紫微或天府坐命、三方四正会辅弼魁钺两颗以上。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-taiwei-luweng',
    book: 'ziwei',
    chapter: '卷一·太微赋',
    quote: '祿文拱命，貴而且賢。日月夾財，不權則富。',
    plain: '禄存与昌曲拱照命宫主贵而贤；日月夹的是财帛宫，不掌权也主发财。夹哪一宫决定这一句讲什么——插件目前只实现夹命宫，夹财未单列。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-taiwei-matou',
    book: 'ziwei',
    chapter: '卷一·太微赋',
    quote: '馬頭帶劍，鎮衛邊疆。刑囚夾印，刑杖惟司。',
    plain: '擎羊在午守命叫马头带剑，古谓可当方面之任；廉贞（囚）与擎羊（刑）夹天相叫刑囚夹印，主刀笔刑杖之职。插件两条都按命宫那一宫判，不作贵贱判决。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-taiwei-guicai',
    book: 'ziwei',
    chapter: '卷一·太微赋',
    quote: '善蔭朝綱，仁慈之長。貴入貴鄉，逢之富貴。財居財位，遇者富奢。',
    plain: '天梁（善荫）朝元主仁慈长厚；贵星落贵地、财星入财帛宫各从其类。这是「星与宫相配」的通则，插件的庙旺表与三方四正判定都建立在这一层。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-taiwei-riwu',
    book: 'ziwei',
    chapter: '卷一·太微赋',
    quote: '太陽居午，謂之日麗中天，有專權之貴，敵國之富。',
    plain: '太阳在午宫叫日丽中天，主权贵与巨富。插件未把「太阳在午守命」单列为格局，只在庙旺表与三方四正里显出这一位置。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-taiwei-yinzi',
    book: 'ziwei',
    chapter: '卷一·太微赋',
    quote: '太陰居子，號曰水澄桂萼，得清要之職，忠諫之材。',
    plain: '太阴在子宫叫水澄桂萼，主清要之职与谏诤之才。它与「月朗天门」（太阴在亥）是两句不同的取象，插件只实现了月朗天门一格。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-taiwei-fanshui',
    book: 'ziwei',
    chapter: '卷一·太微赋',
    quote: '貪居亥子，名為犯水桃花。刑遇貪狼，號曰風流彩杖。',
    plain: '贪狼落亥、子宫都叫犯水桃花，原文作「犯」不作「泛」，且亥子两宫并举。插件的「泛水桃花」只取贪狼在子守命，与彀率「贪狼居子」一致、比这句窄一宫。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-taiwei-fubi-dan',
    book: 'ziwei',
    chapter: '卷一·太微赋',
    quote: '輔弼單守命宮，離宗庶出。七殺臨於身命加惡殺，必定死亡。',
    plain: '辅弼只有一颗守命叫「单守」，古人断离宗庶出；七杀在身命又加恶杀是极重的话。插件只标辅弼实际会到的颗数与落宫，后一句属旧说刑克，不折算吉凶。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-fawei-junchen',
    book: 'ziwei',
    chapter: '卷一·斗数发微论',
    quote: '左右會於紫府極品之尊，科權陷於凶鄉功名蹭蹬。',
    plain: '左辅右弼与紫府相会主极品之尊；化科化权若落在凶乡，功名反多不顺。同是吉化，落宫不同结论相反。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-fawei-nan-nv',
    book: 'ziwei',
    chapter: '卷一·斗数发微论',
    quote: '南斗主限必生男，北斗加臨先得女。',
    plain: '南斗星主限多生男，北斗星加临先得女，属古法取象。本插件不排子一次性别，只保留这一句作为「南北斗分主」的文本凭据。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gaolv-fanshui',
    book: 'ziwei',
    chapter: '卷一·重补斗数彀率',
    quote: '貪狼居子乃為泛水桃花，天刑遭貪必主風流刑杖。',
    plain: '贪狼在子宫叫泛水桃花，再加天刑同会主风流惹讼。插件的「泛水桃花」只取贪狼在子守命，天刑这颗杂曜未纳入该格条件。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gaolv-ziwei-fubi',
    book: 'ziwei',
    chapter: '卷一·重补斗数彀率',
    quote: '紫微在命輔弼同垣，其貴必矣，財印夾命日月夾財，其富何疑。',
    plain: '紫微坐命而辅弼同垣主贵，财星印星夹命、日月夹财帛主富。插件的「君臣庆会」取这一句的会合条件；夹财未单列。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gaolv-yinfu',
    book: 'ziwei',
    chapter: '卷一·重补斗数彀率',
    quote: '蔭福臨不怕凶沖，日月會不如合照。',
    plain: '荫星福星（天梁、天同）会聚不怕凶星来冲；日月同宫之会，不如隔宫合照之美。插件的「日月对照」与此句同一口径。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gaolv-qisha-xian',
    book: 'ziwei',
    chapter: '卷一·重补斗数彀率',
    quote: '七殺臨於陷地流年必見死亡，耗殺忌逢破軍火鈴嫌逢太歲。',
    plain: '七杀落陷地再被流年引动是重话，耗杀忌逢破军、火铃嫌逢太岁。属旧说刑克，插件只标落宫与流年星曜的位置，不作寿夭断。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gaolv-fuxing',
    book: 'ziwei',
    chapter: '卷一·重补斗数彀率',
    quote: '太陰合文曲於妻宮翰林清異，太陽會文昌於官祿金殿傳臚。',
    plain: '太阴与文曲同在夫妻宫主文墨清贵，太阳与文昌同在官禄宫主科第显达。要「星—吉曜—宫位」三者同处才成象，单看一颗星不算。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-zengbu-qianyang',
    book: 'ziwei',
    chapter: '卷一·增补太微赋',
    quote: '擎羊火星威权出众，贪武同行威镇边夷。',
    plain: '擎羊火星同会主权威出众，武曲贪狼同行主镇守边夷。插件的「武贪同行」按武曲贪狼同宫取，任一颗化忌则降为下格（见卷三另条）。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-zengbu-juliang',
    book: 'ziwei',
    chapter: '卷一·增补太微赋',
    quote: '寅申最喜同梁会，辰戌应嫌陷巨门。',
    plain: '寅申二宫最喜天同天梁相会，辰戌则嫌巨门落陷。与骨髓赋「机月同梁作吏人」并看才见完整条件——插件的机月同梁限在寅申两宫。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-zengbu-tianluo',
    book: 'ziwei',
    chapter: '卷一·增补太微赋',
    quote: '限至天罗地网屈原溺水而身亡，运遇地劫天空阮籍有贫穷之苦。',
    plain: '大限走到辰戌（天罗地网）为滞象，行运遇地劫天空主贫苦。原文论「限至」不论「守命」，插件的「天罗地网」判的是命宫在辰戌，两者层级不同。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-zengbu-kequ',
    book: 'ziwei',
    chapter: '卷一·增补太微赋',
    quote: '文昌文曲会廉贞丧命天年，命空限空无吉凑功名蹭蹬。',
    plain: '昌曲与廉贞相会，古人断为夭年；命宫与大限皆空而无吉星凑合，则功名不顺。属旧说重话，插件只列同宫与三方事实，不据此判寿夭。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-zengbu-zuoqi',
    book: 'ziwei',
    chapter: '卷一·增补太微赋',
    quote: '左府同宫尊居万乘，廉贞七杀流荡天涯。',
    plain: '左辅与天府同宫叫「左府同宫」，古谓尊居万乘；廉贞七杀同行则主流荡天涯。插件目前未把左府同宫单列为格局，廉贞七杀同行则落在杀破狼的结构里。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-geju',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    quote: '太极星缠，乃群宿众星之主，天门运限，即扶身助命之源，在天则运用无常，在人则命有格局。',
    plain: '天象运转无常，落到人命则成「格局」——这个词在斗数文本里的出处。插件的 34 条格局即在此前提下列成立条件，不判贵贱。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-mingwuzhengyao',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    quote: '命无正曜，夭折孤贫。吉有凶星，美玉瑕玷。',
    plain: '命宫没有十四正曜坐守叫「命无正曜」，古人断为夭折孤贫；吉星里夹着凶星，美玉也有瑕玷。插件只标命宫有无正曜，并列出对宫与三方主星。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-jiaju',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    quote: '夹贵夹禄少人知，夹权夹科世所宜。夹日夹月谁能遇，夹昌夹曲主贵兮。夹空夹劫主贫贱，夹羊夹陀为乞丐。',
    plain: '夹局分六类：夹贵、夹禄、夹权、夹科、夹日、夹月、夹昌夹曲皆吉，夹空劫、夹羊陀则主贫贱。这一句同时给出「什么算夹」——前后两宫，不分左右。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-chaodou',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    quote: '七杀朝斗爵禄荣昌，紫府同宫终身福厚。',
    plain: '七杀在子午朝斗主爵禄荣昌，紫微天府同宫主终身福厚。插件的「七杀朝斗」「紫府同宫」两格即这一句拆开。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-ziweiwu',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    quote: '紫微居午无杀凑位至三公，天府临戌有星扶腰金衣紫。',
    plain: '紫微在午而无煞星凑聚主位至三公，天府在戌而有吉星扶佐主腰金衣紫。「极向离明」即紫微午宫守命，原文还多一个「无杀凑」的前提。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-sanqi',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    quote: '科权禄拱名誉昭彰，武曲庙垣威名赫奕。',
    plain: '化科、化权、化禄同拱命宫主名誉昭彰，武曲入庙垣主威名。插件的「三奇嘉会」取三方四正会禄权科三化，见煞忌则打折。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-juji',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    quote: '巨机同宫公卿之位，贪铃并守将相之名。',
    plain: '巨门与天机同宫取公卿之位，贪狼与铃星并守取将相之名。后一句即铃贪格；插件的火贪铃贪把火星、铃星同列，并要求贪狼也在三方四正。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-kuiyue-luma',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    quote: '天魁天钺盖世文章，天禄天马惊人甲第。',
    plain: '天魁天钺会命主文章盖世，禄存天马同行主科第惊人。「双禄朝垣」「禄马交驰」「魁钺夹命」的贵气都从这一类句子来。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-juri',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    quote: '巨日同宫官封三代，紫府朝垣食禄万钟。',
    plain: '巨门太阳同宫主官封三代，紫微天府朝垣主食禄万钟。插件的「巨日同宫」「紫府朝垣」两条各取这一句的前后两半。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-fuxiang',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    quote: '府相同来会命宫全家食禄，三合明珠生旺地稳步蟾宫。',
    plain: '天府天相三合来会命宫主全家食禄，三合会照生旺之地主稳步蟾宫。「府相朝垣」即此句，条件是会命宫而非同宫。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-jieyueliang',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    quote: '七杀破军宜出外，机月同梁作吏人。',
    plain: '七杀破军一类宜外出发展，天机太阴天同天梁一类宜在体制内任职。「杀破狼」「机月同梁」两格取此二句；卷三另有「命在寅申方论」的加严条件。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-riyue-men',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    quote: '日照雷门富贵荣华，月朗天门进爵封侯。',
    plain: '太阳在卯（雷门）主富贵荣华，太阴在亥（天门）主进爵封侯。插件的「日出扶桑」「月朗天门」各按守命宫取这两句。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-shizhong',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    quote: '子午巨门石中隐玉，明禄暗禄锦上添花。',
    plain: '巨门在子午叫石中隐玉，再加明禄暗禄才是锦上添花。这一句限定子午两宫，插件另要求三方有化科、化禄照会（见「巨门子午二宫逢」诗）。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-ziwei-po',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    quote: '紫微辰戌遇破军，富而不贵有虚名。',
    plain: '紫微在辰戌与破军同宫，主富而不贵、徒有虚名。这是紫微会破军的减等条件，插件目前未把它列为格局破格项，只作同宫事实列出。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-tiantong',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    quote: '天同戌宫为反背，丁人化吉主大贵。',
    plain: '天同在戌宫叫反背，但丁年生人天同化权（化吉）反主大贵。同一颗星的「反背」可以被四化翻回来，所以插件把落宫与四化分成两层显示。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-jumen',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    quote: '巨门辰戌为陷地，辛人化吉禄峥嵘。',
    plain: '巨门在辰戌为陷地，辛年生人巨门化禄反主禄峥嵘。落陷是前提之一，不是结论的终点。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-jiliang',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    quote: '机梁酉上化吉者，纵遇财官也不荣。',
    plain: '天机天梁在酉宫即便化吉，纵有财官也不显荣。与「寅申最喜同梁会」并看：同梁取寅申，酉宫则不取——插件的机月同梁限在寅申，正合这一类条件。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-fanbei',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    quote: '日月最嫌反背乃为失辉，命身定要精求恐差分数。',
    plain: '日月最怕反背失辉，命身二宫务必精求真确，生怕差之分数。后一句正是「生时要审的确」的文本根据，插件的晚子时开关与时辰未知提示都由此而来。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-shan-e',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    quote: '论命必推星善恶，巨破擎羊性必刚。府相同梁性必好，火劫空贪性不常。',
    plain: '论命先推星性善恶：巨门、破军、擎羊性刚，天府天相天同天梁性缓，火铃空劫贪狼性不常。这是星性表，不是吉凶判决。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-lingchang',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    quote: '铃昌罗武限至投河，巨火擎羊终身缢死。',
    plain: '铃星、文昌、陀罗、武曲四颗凑聚，古谓「限至投河」；巨门火星擎羊同会主终身缢死。属旧说重话，插件只标这类结构的成立与落宫，不作寿夭断。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-xinhao',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    quote: '心好命微亦主寿，心毒命固亦夭亡。',
    plain: '心好而命星微弱也主寿长，心毒而命星坚固亦主夭亡——原文自己把一部分权重让给人为。本插件不作道德判断，此句只存证。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-wuqian',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    quote: '武曲闲宫多手艺，贪狼陷地作屠人。',
    plain: '武曲落闲宫多主手艺，贪狼落陷地主屠沽之人。星不得地则转而论技艺，属旧时的职业取象，不作贵贱分等。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-tianlu',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    quote: '天禄朝垣身荣贵显，魁星临命位列三台。',
    plain: '禄存朝垣主身荣贵显，天魁临命主位列三台。与「天禄天马惊人甲第」同看：禄、魁各自成格，不要求同宫。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-helu',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    quote: '丹墀桂墀早遂青云之志，合禄拱禄定为巨擘之臣。',
    plain: '丹墀（卯）、桂墀（酉）早遂青云之志，合禄拱禄主为巨擘之臣。「合禄拱禄」即禄存与化禄同会命宫，对应插件的「双禄朝垣」「双禄交流」。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-shideng-fugui',
    book: 'ziwei',
    chapter: '卷一·定富贵贫贱十等论',
    quote: '富贵论 如紫微天府天相禄权科太阴太阳文昌文曲左辅右弼天魁天钺守照拱冲主大富贵',
    plain: '这一层是「贵星清单」：紫微、天府、天相、禄权科、日月、昌曲、辅弼、魁钺守照拱冲主大富贵。取法是四类并看——守、照、拱、冲，不是只看同宫。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-nvming-sanfang',
    book: 'ziwei',
    chapter: '卷一·女命骨髓赋',
    quote: '三方四正嫌逢杀，更在夫宫祸患深。',
    plain: '三方四正嫌见七杀，若落在夫妻宫（夫宫）更深。看的是宫位条件叠加，不是单看一颗星；插件在三方四正表里如实列出会到的煞星与该宫宫名。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-nvming-hualu',
    book: 'ziwei',
    chapter: '卷一·女命骨髓赋',
    quote: '十干化禄最荣昌，女命逢之大吉昌。更得禄存相凑合，旺夫益子受恩光。',
    plain: '十干化禄主荣昌，再得禄存凑合即双禄并会。这一句与男命同取双禄，说明「双禄朝垣」不区分性别；篇中别处才按性别改取法。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-nvming-jun',
    book: 'ziwei',
    chapter: '卷一·女命骨髓赋',
    quote: '巨门天机为破荡。天梁月曜女命贫。擎羊火星为下贱。文昌文曲福不全。',
    plain: '巨门、天机、天梁、太阴、擎羊、火星、昌曲在女命各有减等之说。这些是对旧时女性的评判，本插件只存原文、不据此下断，也不在任何盘面输出这类措辞。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'dl-yuejiang',
    book: 'daliuren',
    chapter: '卷二·神将释（月将）',
    quote: '逆布者谓之月将，其实即十二神也。',
    plain: '月将就是十二支神，按太阳过宫排：以登明为首逆布十二宫；起课时把月将加在占时上，顺布成天盘。',
    url: 'https://zh.wikisource.org/wiki/六壬大全/2',
  },
  // ── B8 补录：地相五本 + 卦身 + 紫微定局（2026-11-06 逐字核验）
  // 这一批全是不进引擎的：地相（葬书／青囊经／青囊奥语／撼龙经／入地眼全书）在本仓只有理气排盘、
  // 没有解读层，卦身本站未起，紫微定贵局的定义又与插件的判定条件不同——三条都只录原文、
  // 写明差异，不冒充「已实现」，也不挂到知识卡上。
  {
    id: 'hzc-guashen',
    book: 'huozhulin',
    chapter: '六亲根源·卦身问',
    quote: '阳世则从子月起，阴世还当午月生，此即卦身也',
    plain: '火珠林把卦身当第六亲来用（阳世从子月起、阴世从午月生）。本站只算世应与伏神，未起卦身，故本条不入卡片。',
    url: 'https://zh.wikisource.org/wiki/火珠林',
  },
  {
    id: 'fs-zangshu-chengshengqi',
    book: 'zangshu',
    chapter: '内篇一',
    quote: '生氣者即一元運行之氣也，在天則周流六虛，在地則發生萬物。',
    plain: '葬书内篇一开篇四字「葬者乘生氣也」，注文接着给出生气的位置：一元运行之气，在天周流六虚、在地发生万物。本站风水层只做理气方位，不涉及葬法，此条只入引文库。',
    url: 'https://zh.wikisource.org/wiki/葬書/內篇',
  },
  {
    id: 'fs-zangshu-chengfeng',
    book: 'zangshu',
    chapter: '内篇二',
    quote: '氣乘風則散，界水則止。',
    plain: '生气乘风就散、被水拦住才停——藏风界水四字是后世形势派的根。注意《青囊经》下卷有几乎同句，见对照条。',
    url: 'https://zh.wikisource.org/wiki/葬書/內篇',
  },
  {
    id: 'fs-zangshu-yuanqi',
    book: 'zangshu',
    chapter: '内篇三',
    quote: '葬者原其起，乘其止。',
    plain: '看穴要先追龙从哪里起、再看在哪里止。本站理气层不给这个结论，只录原文供对照。',
    url: 'https://zh.wikisource.org/wiki/葬書/內篇',
  },
  {
    id: 'fs-qingnang-huashi',
    book: 'qingnang',
    chapter: '上卷·化始',
    quote: '天尊地卑，陽奇陰偶。一六共宗，二七同道，三八為朋，四九為友，五十同途。',
    plain: '青囊经开篇用河图生成数定阴阳奇偶，是玄空一系「五组配对」的祖本——本站合十之理（一九、二八、三七、四十、五十）从这里出。',
    url: 'https://zh.wikisource.org/wiki/青囊經',
  },
  {
    id: 'fs-qingnang-huacheng',
    book: 'qingnang',
    chapter: '下卷·化成',
    quote: '外氣行形，內氣止生，乘風則散，界水則止。',
    plain: '青囊经下卷有与葬书几乎相同的一句。两书都收，谁先谁后不判断，只在对照里并列。',
    url: 'https://zh.wikisource.org/wiki/青囊經',
  },
  {
    id: 'fs-qingnang-huji',
    book: 'qingnang',
    chapter: '中卷·化机',
    quote: '形止氣蓄，萬物化生，氣感而應，鬼福及人。',
    plain: '形停住则气蓄积，气感通则有祸福——这是「地气感应」这一层说法的祖本，本站不作结论。',
    url: 'https://zh.wikisource.org/wiki/青囊經',
  },
  {
    id: 'fs-aoyu-kunrenyi',
    book: 'aoyu',
    chapter: '青囊奥语',
    quote: '坤壬乙, 巨門從頭出 ,艮丙辛, 位位是破星,',
    plain: '替卦诀的祖本原文。《沈氏玄空学》的二十四山替星表就是把这四句展开成表；本站替卦用的正是这条诀。',
    url: 'https://zh.wikisource.org/wiki/青囊奧語',
  },
  {
    id: 'fs-aoyu-tanlang',
    book: 'aoyu',
    chapter: '青囊奥语',
    quote: '巽辰亥, 儘是武曲位, 甲癸申, 貪狼一路行,',
    plain: '接上两句：巽辰亥归武曲、甲癸申归贪狼。本站替星表按同一分组给 1/2/6/7/9。',
    url: 'https://zh.wikisource.org/wiki/青囊奧語',
  },
  {
    id: 'fs-aoyu-xuankong',
    book: 'aoyu',
    chapter: '青囊奥语',
    quote: '雌與雄, 交會合玄空, 雄與雌, 玄空卦內推,',
    plain: '「玄空」二字的出处之一：阴阳雌雄交会要在卦里推——本站玄空下卦与替卦都按龙向阴阳取顺逆。',
    url: 'https://zh.wikisource.org/wiki/青囊奧語',
  },
  {
    id: 'fs-hanlong-xingfeng',
    book: 'hanlong',
    chapter: '撼龙经',
    quote: '大率龍行自有真，星峰磊落是龍身。高山須認星峰起，平地龍行別有名。',
    plain: '撼龙经专讲山龙形势与九星峰形，与玄空理气是两条路。本站只做理气，不做形峦，此条用于划清边界。',
    url: 'https://zh.wikisource.org/wiki/撼龍經',
  },
  {
    id: 'fs-hanlong-xumi',
    book: 'hanlong',
    chapter: '撼龙经',
    quote: '須彌山是天地骨，中鎮天地為巨物。',
    plain: '撼龙经以须弥山起龙、分四派的祖龙说，属宗派立论，本站不取。',
    url: 'https://zh.wikisource.org/wiki/撼龍經',
  },
  {
    id: 'fs-rudianyan-shuifa',
    book: 'rudidian',
    chapter: '水说',
    quote: '水曲則砂抱，水直則砂硬，水斜則砂飛。',
    plain: '水形与砂形互证：曲水必有抱砂，直水必然硬砂。本站只算水法方位，不看实景水形，此条不入结论。',
    url: 'https://zh.wikisource.org/wiki/入地眼全書',
  },
  {
    id: 'fs-rudianyan-longzhu',
    book: 'rudidian',
    chapter: '水说',
    quote: '故葬以龍為主，而水亦其要也。水法之書，紛紛不一。',
    plain: '以龙为主、水为要——这是形势派自己的排序，玄空一系（本站）反过来以向与运为主，两套排序不可混。',
    url: 'https://zh.wikisource.org/wiki/入地眼全書',
  },
  {
    id: 'zm-dinggui-riyuejiaming',
    book: 'ziwei',
    chapter: '卷一·定贵局',
    quote: '日月夹命 不坐空亡遇逢本宫有吉星是也。',
    plain: '定贵局给成格下的定义：日月夹命要命不坐空亡、本宫还得有吉星。本站只查夹不夹，不加后两条。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zm-dinggui-junchenqinghui',
    book: 'ziwei',
    chapter: '卷一·定贵局',
    quote: '君臣庆会 紫微左右同守命是也，更会相武阴妙上。',
    plain: '君臣庆会 = 紫微与左辅右弼同守命宫。本站按三方四正会照判，不要求同宫，此处口径差异写明。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zm-dinggui-rifutang',
    book: 'ziwei',
    chapter: '卷一·定贵局',
    quote: '日出扶桑 日在卯守命是也，守官禄宫亦然。',
    plain: '日出扶桑的定义：太阳坐命在卯，守官禄宫也算。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zm-dinggui-yuelangtianmen',
    book: 'ziwei',
    chapter: '卷一·定贵局',
    quote: '月落亥宫 月在亥守命是也，又名月朗天门。',
    plain: '月朗天门在本书作「月落亥宫」，两名同格，本站按后一名。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zm-dinggui-matoudaijian',
    book: 'ziwei',
    chapter: '卷一·定贵局',
    quote: '马头带剑 谓马有刃是也不是居午格。',
    plain: '本书作「马头带剑」，通行格局名作「马头带箭」，本站用后者。原文这行字面连读歧义大（是也不是），断句存疑。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zm-dinggui-xingqiujieyin',
    book: 'ziwei',
    chapter: '卷一·定贵局',
    quote: '刑囚夹印 天刑廉贞同临身命主武勇之人。',
    plain: '刑囚夹印的定义：天刑与廉贞同临身命。本站以廉贞化忌守命三方会照陀罗为破格，与这条不是同一条件。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zm-dingfu-jincanguanghui',
    book: 'ziwei',
    chapter: '卷一·定富局',
    quote: '金灿光辉 太阳单守，命在午宫是也。',
    plain: '定富局的金灿光辉 = 太阳独坐午宫。通行的「英星入庙」在本卷查无此四字，最接近的就是这条，故仍列未配对。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zm-dingpinjian-ju',
    book: 'ziwei',
    chapter: '卷一·定贫贱局',
    quote: '生不逢时 命坐空亡逢廉贞是也。',
    plain: '定贫贱局八条之一。本书把破格按「贫贱」立目，与插件 34 条破格名不重合；只「命坐空亡」一层与「命里逢空」语义相邻。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zm-xingxingfu',
    book: 'ziwei',
    chapter: '卷一·形性赋',
    quote: '原夫紫微帝座，生為厚重之容。天府尊星，也作純和之體。',
    plain: '形性赋讲诸星对应的身材相貌。本站不输出形貌断语，此条只入引文库。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zm-doushu-zhunsheng-zong',
    book: 'ziwei',
    chapter: '卷一·斗数准绳',
    quote: '辨生剋制化以定窮通，看好惡正偏以言禍福。',
    plain: '斗数准绳的收尾总纲：先辨生克制化，再看星之好恶正偏。本站判格局成败走的正是这个次序。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  // ── B9 第二批·只入索引页：引擎里没有对应判定层，挂卡就是凭空造一层断语
  // 神峰通考卷一这四篇讲病药、四药、动静、盖头，本站都不单列这四种判定；
  // 兰台妙选两条是纳音生肖取象格与悬针煞，本站四柱有纳音但不立取象格、42 神煞里也没有悬针。
  {
    id: 'sf-bingyao',
    book: 'shenfeng',
    chapter: '卷一·病药说类',
    quote: '有病方为贵，无伤不是奇；格中如去病，财禄两相随。',
    plain: '张楠病药说的纲领：命里有偏枯之「病」才有取用之处，能去病的那一个字即是用神。本站取用按月令与格局走，没有独立的病药判定层，只录原文、不挂卡。',
    url: 'https://www.luckclub.cn/bazi/008/008/',
  },
  {
    id: 'sf-siyao',
    book: 'shenfeng',
    chapter: '卷一·损益生长四药说类',
    quote: '若木有余之病，用金以制之；金气有余之病，用火以克之',
    plain: '四药说按五行有余之病配对应的制克之药：木太过用金、金太过用火。本站不实现这套配药法，只录原文、不挂卡。',
    url: 'https://www.luckclub.cn/bazi/008/010/',
  },
  {
    id: 'sf-dongjing',
    book: 'shenfeng',
    chapter: '卷一·动静说',
    quote: '天干之动，只能攻得天干之动，不能攻地支之静也',
    plain: '动静说把天干当动、地支当静，认为动只能攻动、攻不到静。本站干支生克不按动静分层，只录原文、不挂卡。',
    url: 'https://www.luckclub.cn/bazi/008/005/',
  },
  {
    id: 'sf-gaitou',
    book: 'shenfeng',
    chapter: '卷一·盖头说',
    quote: '凡有所害之物，露出头面，便是动物，就能作害',
    plain: '盖头说说的是天干盖地支：有害之物只要透出天干就成「动物」、能起作用。本站不判盖头，只录原文、不挂卡。',
    url: 'https://www.luckclub.cn/bazi/008/006/',
  },
  {
    id: 'lt-quxiang',
    book: 'lantai',
    chapter: '上篇',
    quote: '马化龙驹奔凤阙，器业峥嵘，蛇化青龙入天池，功名赫奕。',
    plain: '兰台妙选以生肖与纳音取象成格：午马见辰龙化龙驹、巳蛇见辰化青龙。本站四柱带纳音字段，但没有立这一套取象格，只录原文、不挂卡。',
    url: 'https://www.luckclub.cn/bazi/026/001/',
  },
  {
    id: 'lt-xuanzhen',
    book: 'lantai',
    chapter: '中篇',
    quote: '甲辛二字为悬针，更逢巳酉二字乃配字',
    plain: '注解给「刺面悬针」格的字脚条件：甲辛为悬针，再配巳酉。本站神煞表没有悬针煞，只录原文、不挂卡。',
    url: 'https://www.luckclub.cn/bazi/026/002/',
  },
  // ── B10 第一批：引擎没有判定层，只进索引页（2026-11-07）
  {
    id: 'yh-tiji',
    book: 'yuanhai',
    chapter: '卷一·题记与引',
    quote: '子平渊海之理，始自唐大夫李公虚中，以人生年月日时，生克旺相，休囚制化，决人生之祸福，其验神矣。',
    plain: '《渊海子平》引自述源流：李虚中用人年月日时论命，至宋徐升才改以日主分六事。本站取日干为主的口径即出于这一系，此处只作书史、不挂卡。',
    url: 'https://www.luckclub.cn/bazi/001/001/',
  },
  {
    id: 'yh-yangren',
    book: 'yuanhai',
    chapter: '卷一·论羊刃',
    quote: '羊，主刚也。刃者，主刑也。禄过则刃生，功成当退不退，乃狠而进也。',
    plain: '羊刃释义：禄过则刃生，居禄前一辰，对宫为飞刃。本站神煞表有羊刃但没有飞刃，也没按「禄前一辰」推，只录原文。',
    url: 'https://www.luckclub.cn/bazi/001/054/',
  },
  {
    id: 'yh-kongwang',
    book: 'yuanhai',
    chapter: '卷一·论六甲空亡',
    quote: '空亡，一名天中杀。甲子属金，至酉而十干足矣，以独无戌亥，是为空亡。阳空为空，阴空为亡。',
    plain: '空亡一名天中杀，阳空为空、阴空为亡，对宫为孤虚。本站空亡按旬空取，未区分阴空阳空、也未做孤虚，只录原文。',
    url: 'https://www.luckclub.cn/bazi/001/047/',
  },
  {
    id: 'dtcw-jiaocong',
    book: 'dtchanwei',
    chapter: '下篇第14章·假从·原注',
    quote: '日主弱矣，财官强矣，不能不从；中有比劫暗生，从之不真。',
    plain: '假从：日主弱、财官强而柱中尚有比劫暗生，从之不真，须靠岁运「假行真运」才取富贵。本站从格只判真从，没有假从这一层，不拿它冒充已实现。',
    url: 'https://www.luckclub.cn/bazi/007/050/',
  },
  {
    id: 'dtcw-yinxian',
    book: 'dtchanwei',
    chapter: '上篇第31章·隐显',
    quote: '吉神太露，起争夺之风；凶物深藏，成养虎之患。',
    plain: '吉神太露易被岁运劫夺、凶物深藏难制化，讲的是透干与藏支的取象。本站通根透干卡只证「地支藏干／天干透出」的结构，没有露藏吉凶的判定层。',
    url: 'https://www.luckclub.cn/bazi/007/033/',
  },
  {
    id: 'wxdy-tiyong',
    book: 'wuxingdayi',
    chapter: '卷第一·第一 释名',
    quote: '五行为万物之先。形用资于造化。岂不先立其名。然后明其体用。',
    plain: '隋萧吉《五行大义》开卷释名：五行先立名、再明体用。这是本站五行生克表更早的义理源头，但本站只用生克关系，不取释名与谶纬配属，只录原文。',
    url: 'https://www.luckclub.cn/bazi/011/003/',
  },
  {
    id: 'wxdy-xiangsheng',
    book: 'wuxingdayi',
    chapter: '卷第二·第四 论相生',
    quote: '凡五行相生。谓异类相化。如男女异姓。能至繁殖。若以水济水。不生嘉味。',
    plain: '相生须异类相化，「若以水济水，不生嘉味」即同类不相生。这是《五行大义》对相生的义理解释；本站生克表按固定五行环实现，不含这层义理，只录原文。',
    url: 'https://www.luckclub.cn/bazi/011/004/',
  },
  {
    id: 'ydzp-bingyao',
    book: 'yudingziping',
    chapter: '总论',
    quote: '命中所取用财官之类，谓之用神。又取其害此用神者，谓之病神。又取其去此病神者，谓之药神。',
    plain: '病药三层：用神、害用神的病神、去病神的药神。与 B9 第二批录的《神峰通考》「有病方为贵，无伤不是奇」同一路数；本站取用按月令格局，没有病药判定层，两条都只进索引页。',
    url: 'https://www.luckclub.cn/bazi/021/001/',
  },
  {
    id: 'ydzp-sanming',
    book: 'yudingziping',
    chapter: '总论',
    quote: '三命之说，今以干为天元，支中所藏之神为地元，纳音为人元，谓之三命。',
    plain: '「三命」的又一种解释：干为天元、支藏为地元、纳音为人元。与 B9 第二批《珞琭子消息赋》注「每一宫有三元：天元、人元、支元」不是同一套分层，两说并列；本站只用四柱干支、不用纳音，不替它们调和。',
    url: 'https://www.luckclub.cn/bazi/021/001/',
  },
  {
    id: 'mlyy-yongshen',
    book: 'mingliyueyan',
    chapter: '看用神法',
    quote: '命以用神为紧要。看用神之法，不过扶抑而已。',
    plain: '「看用神之法，不过扶抑而已」：用神即扶抑日主与六神的那一个字。本站喜忌只分喜、忌两档、无中性档，也没有独立用神卡，只录原文。',
    url: 'https://www.luckclub.cn/bazi/018/009/',
  },
  {
    id: 'mlyy-xingyun',
    book: 'mingliyueyan',
    chapter: '看运法一',
    quote: '凡月建干支，共管一月之事，无干管上半月，支管下半月之理，乃因以行运，反分裂干支，各管几年，有是理乎？故上干下支共管十年为是。',
    plain: '陈素庵驳「上下各五年」：行运干支共管十年，不可按干支分管年数。本站大运按十年一运整体取，未做干支分管，这一条可作口径旁证，但引擎无对应判定层，不挂卡。',
    url: 'https://www.luckclub.cn/bazi/018/017/',
  },
  {
    id: 'ytf-zonglun',
    book: 'yuetanfu',
    chapter: '月谈赋',
    quote: '财官弱而日主旺，须行财运之乡，方行合道。日主弱而财官旺，又临财官之地，为祸不轻。',
    plain: '《月谈赋》起首几句给扶抑的轮廓：财官弱而日主旺宜行财运，日主弱而财官旺再临财官为祸。本站喜忌判定按分数走，未实现赋文这些断语，只录原文。',
    url: 'https://www.luckclub.cn/bazi/023/001/',
  },
  // ── B10 第二批：只进索引页（古法体系外、命例随笔、近人评注、本站无判定层）
  {
    id: 'qlmg-lichun',
    book: 'qianliminggao',
    chapter: '起例问答',
    quote: '答：未可固定。盖推年以立春为标准，其区别有三也。',
    plain: '民国起例问答：年柱换干支以立春为界，不以正月初一。本站排盘按节气换年与此一致；本篇另教的「按岁数逆推干支」是手算时代的推年法，本仓不用。',
    url: 'https://www.luckclub.cn/bazi/003/003/',
  },
  {
    id: 'qlmg-yuejian',
    book: 'qianliminggao',
    chapter: '月建篇',
    quote: '月建干支，利于用神为善。',
    plain: '流月吉凶以用神为准、并与流年叠加的一套看法。本站只实现大运与流年，没有流月判定层，故只入索引不挂卡。',
    url: 'https://www.luckclub.cn/bazi/003/015/',
  },
  {
    id: 'mlty-xuwen',
    book: 'minglitanyuan',
    chapter: '卷八 星家十要',
    quote: '舍干支五行生克之理，而惟务此虚文，宜其毫无效验，贻讥大雅',
    plain: '作者要革除流年神煞／小限俗习的理由：抛开干支生克只按神煞断，自然不验。本站不实现流年神煞、小限、命宫，这一条只记立场，不挂卡。',
    url: 'https://www.luckclub.cn/bazi/009/009/',
  },
  {
    id: 'lxz-jiazi',
    book: 'lixuzhong',
    chapter: '李虚中命书卷上',
    quote: '甲子天官藏，是子旺母衰之金，溺于水下而韬光须假火革，有旺盛之气，方可以扬名显用。',
    plain: '六十甲子纳音古法：以年柱纳音为「身」，逐甲子断其气质与所需。本仓不用纳音、也不以年为本，只作书史留存。此段与《鬼谷遗文》上卷几乎同文，本批只在这里登记一次，不重复计数。',
    url: 'https://www.luckclub.cn/bazi/010/003/',
  },
  {
    id: 'lxz-qingzhuo',
    book: 'lixuzhong',
    chapter: '李虚中命书卷中',
    quote: '清气阳为天，杳杳而上冲乎阳；浊气阴为地，冥冥而下从其物。',
    plain: '卷中「通理物化」的宇宙论开篇，讲清浊分天地，属于术数义理而非可执行的判定规则；本仓没有对应层，只入索引。',
    url: 'https://www.luckclub.cn/bazi/010/004/',
  },
  {
    id: 'yz-zonglun',
    book: 'yuzhao',
    chapter: '综论',
    quote: '卦逢生气天德合，世世长年；身命逢刑反克时，必然夭贱。',
    plain: '旧题郭璞一系全篇是四言短诀，用卦、生气、天德合、纳音音凶，与子平四柱干支不是同一套层。本站不实现卦气与「音凶」，只入索引。',
    url: 'https://www.luckclub.cn/bazi/012/002/',
  },
  {
    id: 'yz-zhuanwang',
    book: 'yuzhao',
    chapter: '论专旺',
    quote: '巽离旺相，丙丁俱全，足见高门；壬癸庚申，土木同法，亦当贵显。',
    plain: '古法专旺取方位卦气（巽离、壬癸庚申），与子平专旺五格（曲直／炎上／稼穑／从革／润下）名同实异，不与 B8 那五条专旺引文混作同源。',
    url: 'https://www.luckclub.cn/bazi/012/015/',
  },
  {
    id: 'yz-zimao',
    book: 'yuzhao',
    chapter: '地支论',
    quote: '子卯相刑，门无礼德；',
    plain: '古法地支相刑的断语。本站刑冲卡只处理刑冲合害对格局与根气的影响，不产出「门无礼德」这类品性判词，故不挂卡。',
    url: 'https://www.luckclub.cn/bazi/012/018/',
  },
  {
    id: 'wxjj-kumu',
    book: 'wuxingjingji',
    chapter: '五行精纪：论库墓',
    quote: '五行墓处为仓库，若命中带仓库，又遇太岁所克之五行加之，则谓之仓库中有财也。',
    plain: '宋人以墓库为仓库、太岁加之断「库中有财」，属纳音与神煞一路。本仓墓库只作藏干与冲开，不判仓库财，故只入索引。',
    url: 'https://www.luckclub.cn/bazi/013/031/',
  },
  {
    id: 'wxjj-liushijiazi',
    book: 'wuxingjingji',
    chapter: '五行精纪：第一卷　论六十甲子上',
    quote: '夫六十甲子者，起于轩辕，作于大挠。',
    plain: '卷首六十甲子纳音表的书史溯源，可与《命理探原》卷一引《五行大义》「大挠之所制」对读。不是规则，只入索引。',
    url: 'https://www.luckclub.cn/bazi/013/002/',
  },
  {
    id: 'bzty-tili',
    book: 'bazitiyao',
    chapter: '甲日',
    quote: '甲木得禄于寅月，又有时上甲比子印之生扶，强旺可知，惟初春馀寒犹盛，木甫萌孽，得火以暖之则繁荣，木旺见金自可贵，柱中有土斯有财。',
    plain: '全书 121 章按「月令×日干×时柱」逐格给断语，是查表体例而非可推的规则。本站调候走《穷通宝鉴》120 格（日主＋月令），不走这套逐时断语，故不挂卡。',
    url: 'https://www.luckclub.cn/bazi/015/001/',
  },
  {
    id: 'ggyw-sanyuan',
    book: 'guiguyiwen',
    chapter: '鬼谷遗文中卷',
    quote: '元命胜负三元者，干禄支命纳音身，各分衰旺之地。',
    plain: '三元分层的第三种说法：干为禄、支为命、纳音为身。与 B9《珞琭子消息赋》注「天元／人元／支元」、B10《御定子平》「天元／地元／人元」都不同；三说并列，本仓只用四柱干支、不用纳音。《李虚中命书》卷中有同一段的异文（「元命胜负三元者干禄支命，纳音身各分衰旺之地」），两本同源，这里只登记 016 的读法、不重复计数。',
    url: 'https://www.luckclub.cn/bazi/016/002/',
  },
  {
    id: 'ggyw-sizhu',
    book: 'guiguyiwen',
    chapter: '鬼谷遗文中卷',
    quote: '四柱者，胎月日时。胎主父母祖宗者十分，主事者二分。',
    plain: '古法「四柱」指胎、月、日、时，还按十分制分配权重，与今法「年月日时」不是同一件事。本仓按今法排盘；录此以免把古书里的「四柱」直接读成今义。此句亦不见于《李虚中命书》足本。',
    url: 'https://www.luckclub.cn/bazi/016/002/',
  },
  {
    id: 'ggj-xiaoyan',
    book: 'guagua',
    chapter: '小言',
    quote: '唐李淳风有言：长平坑卒，岂皆命犯三刑，南阳贵人，宁必生当六合。',
    plain: '韦千里自序引李淳风质疑「同命同理」：长平降卒不可能个个三刑，南阳显贵也不可能个个六合。属命学随笔的边界自省，不构成判定层。',
    url: 'https://www.luckclub.cn/bazi/017/001/',
  },
  {
    id: 'ggj-tongbazi',
    book: 'guagua',
    chapter: '上集：名人命造',
    quote: '吾国政坛之中，同年同月同日诞生者，有陈诚、兪大维、兪鸿钓，三公焉。',
    plain: '上集开篇举同年同月同日、只差时辰的三个命例，说明时柱之别。命例随笔不产生规则，本仓也不据命例反推断语。',
    url: 'https://www.luckclub.cn/bazi/017/002/',
  },
  {
    id: 'zhyy-xitong',
    book: 'zaohuayuanyue',
    chapter: '论命理论',
    quote: '乃指丙日干和辛日干都要用壬水来作为论命的最主要依据。',
    plain: '评注者归纳的「五个技术系统」之一（丙辛用壬）。本仓 120 格是逐月摘句，没有「甲庚丁循环」「丙辛用壬」这类系统层，故只入索引。',
    url: 'https://www.luckclub.cn/bazi/019/008/',
  },
  {
    id: 'zhyy-sanxia',
    book: 'zaohuayuanyue',
    chapter: '十天干总论甲木',
    quote: '三夏甲木，用神先丁次庚，无丁不得通明，无庚劈甲，丁火不燃。',
    plain: '评注本的三夏甲木取用可与《穷通宝鉴》120 格里甲木巳／午／未月摘句对照，但两者不是同一层文本：一个是原书摘句，一个是后人总论。',
    url: 'https://www.luckclub.cn/bazi/019/010/',
  },
  {
    id: 'zpgj-yangren',
    book: 'zipingguanjian',
    chapter: '羊刃格',
    quote: '柱中羊刃不可便见凶言，如有伤官泻之，七煞制之，反为贵命。',
    plain: '与 B9《神峰通考》「六阴日干不谓之刃」并列：羊刃是否成立、成立又如何，两书口径本就不同。本仓不设羊刃格判定层，只入索引。',
    url: 'https://www.luckclub.cn/bazi/020/013/',
  },
  {
    id: 'zpgj-kuigang',
    book: 'zipingguanjian',
    chapter: '魁罡格',
    quote: '壬辰戊戌号魁罡，庚戌庚辰四位当。',
    plain: '魁罡四日的名单。B9 已录张楠的反对意见「何以临比墓之上就能掌握威权？此亦子平书之大谬也」，两说并列留着，本仓不判魁罡。',
    url: 'https://www.luckclub.cn/bazi/020/035/',
  },
  {
    id: 'xmzk-tiyao',
    book: 'xingmingzongkuo',
    chapter: '星命总括 卷上',
    quote: '惟所称宫有偏正，则立说甚新，而验之殊多乖忤',
    plain: '四库馆臣对《星命总括》「宫有偏正」的批评。此书讲宫主、度主、星躔七政，虽挂在八字目录，实属星相体系；本仓不接任何八字卡、不实现星度，照实记为体系外。',
    url: 'https://www.luckclub.cn/bazi/022/001/',
  },
  {
    id: 'xmzk-shitiao',
    book: 'xingmingzongkuo',
    chapter: '星命总括 卷上',
    quote: '肤学得于生克制化之外，亦有十条，前有六条看根本， 后四条看流年',
    plain: '原序十条提纲（太岁尊神、无中有曜、得经失次……）讲的都是星曜宫度与流年变曜，不是四柱生克。目录分类错位，录一条以存其真，不接卡。',
    url: 'https://www.luckclub.cn/bazi/022/001/',
  },
  {
    id: 'xmjg-feiren',
    book: 'xingmingjuegu',
    chapter: '地支论',
    quote: '败既沐浴，胎即飞刃。',
    plain: '把十二长生的「胎」直接等同飞刃；B10 第一批《渊海子平》另有飞刃条（yh-yangren，docs-only）。两处都只作名目，本仓不判飞刃。',
    url: 'https://www.luckclub.cn/bazi/025/003/',
  },
  {
    id: 'xmjg-huagi',
    book: 'xingmingjuegu',
    chapter: '六亲论',
    quote: '古法重化气，正官皆化气所最贵。',
    plain: '以化气定官杀的古法，与子平按正五行定十神相反。本仓十神按正五行，化气只在《子平真诠》「论变化」那条里作格局变化讨论，不据化气重排十神。',
    url: 'https://www.luckclub.cn/bazi/025/007/',
  },
  {
    id: 'xmjg-luma',
    book: 'xingmingjuegu',
    chapter: '论命选用',
    quote: '古法重禄马，子平以财官为禄马，不但失於矫诬，直失於荒陋也。',
    plain: '作者明确批评子平把禄马讲成财官。本仓是子平体系，照录反对意见不抹掉，但不据以改实现；也可与 B9 张楠三处反对意见同看。',
    url: 'https://www.luckclub.cn/bazi/025/009/',
  },
  // ── B11：只进索引页（三传/格例/断案/纳音/神煞/今人整理语，本站无判定层）
  {
    id: 'ra-hengji',
    book: 'renan',
    chapter: '亨集',
    quote: '邵先生曰：此课虽魁杜天门，不作阻隔论，乃六仪扶护，三奇拱秀，小则郎官，大则侍从，未易量也。',
    plain: '《大六壬断案》是南宋邵彦和的占验课例集，通篇「某年月日时占某事—课式—邵先生曰—后验如何」，不是规则条文。本站壬课只起四课，不判六仪、三奇、拱秀，故只入索引页，不挂知识卡。',
    url: 'https://www.luckclub.cn/daliuren/002/003/',
  },
  {
    id: 'rty-yuejiang',
    book: 'rentanyuan',
    chapter: '卷上 推演篇',
    quote: '占时既得，地盘已明，再用月将加时，自可错综参伍。',
    plain: '月将加时是天地盘成型的第二步。本站只按四课展示，不排天盘月将，故只入库。',
    url: 'https://www.luckclub.cn/daliuren/003/002/',
  },
  {
    id: 'rty-dipan',
    book: 'rentanyuan',
    chapter: '卷上 推演篇',
    quote: '盖地盘千载不移，天盘随时流转也。',
    plain: '地盘固定、天盘随时，是六壬天地盘最简洁的一句界定。属排盘前提而非本课判定，只入库。',
    url: 'https://www.luckclub.cn/daliuren/003/002/',
  },
  {
    id: 'rty-xianfeng',
    book: 'rentanyuan',
    chapter: '卷下 论断篇',
    quote: '卒然相遇之谓机，自然符合之谓神。六壬之用占时，非神与机之谓乎。',
    plain: '把「占时」解释成机与神，属于术数義理而非可复核的判定层；本站不取占时断来意，只入库。',
    url: 'https://www.luckclub.cn/daliuren/003/003/',
  },
  {
    id: 'rxj-kezei',
    book: 'renxinjing',
    chapter: '卷01',
    quote: '四课之中一克下，便是初传立用',
    plain: '《大六壬心镜》释课元微门第一「克贼」：四课里有一处上克下，就取它作初传。本站只起四课、不发三传，故只入库，不接四课卡。',
    url: 'https://www.luckclub.cn/daliuren/004/003/',
  },
  {
    id: 'rxj-zei',
    book: 'renxinjing',
    chapter: '卷01',
    quote: '上克下名曰克下，克上名曰贼。',
    plain: '「克」「贼」两个方向的定义，是取初传的前置术语。页面另有郑氏按语与据《神枢经》补字，白话不替它判定哪句是原撰、哪句是后补。',
    url: 'https://www.luckclub.cn/daliuren/004/003/',
  },
  {
    id: 'rxj-zashen',
    book: 'renxinjing',
    chapter: '卷04',
    quote: '登明天术禀楼台，贼盗伤人幼子哀。',
    plain: '卷四「杂神门」逐神列类象（登明亥主楼台、贼盗、幼子等）。本站壬课不排十二天将类象，只入库。',
    url: 'https://www.luckclub.cn/daliuren/004/006/',
  },
  {
    id: 'rzn-yuejiang',
    book: 'renzhinan',
    chapter: '卷一 注释大六壬心印赋',
    quote: '月将，即日宿太阳也。正月雨水后日躔娵訾之次入亥宫，乃登明将也；',
    plain: '月将按中气过宫的完整口径，与《六壬粹言》「辨非十则·月将第一」同说。本站不排月将，只入库。',
    url: 'https://www.luckclub.cn/daliuren/005/003/',
  },
  {
    id: 'rzn-kezhe',
    book: 'renzhinan',
    chapter: '卷二 大六壬九天玄女指掌赋',
    quote: '克者事之端，克者事之变。',
    plain: '指掌赋把「相克」当作事情发动处，与心镜「取克贼为初传」同一路。属三传取用法，本站未实现，只入库。',
    url: 'https://www.luckclub.cn/daliuren/005/004/',
  },
  {
    id: 'rcy-yuejiang',
    book: 'rencuiyan',
    chapter: '卷一 辨非十则',
    quote: '用月将之法，诸书皆以每月中气为过宫。',
    plain: '《六壬粹言》卷一「辨非十则」逐条驳异说。此条立中气过宫为正，并点名姚广孝用河图生成数为「荒唐」，异说照留不调和。',
    url: 'https://www.luckclub.cn/daliuren/006/002/',
  },
  {
    id: 'rcy-shengmu',
    book: 'rencuiyan',
    chapter: '卷一 辨非十则',
    quote: '五行则不论阴阳，一例顺行。十干则分阴阳顺逆，阳之死地，即阴之生地。',
    plain: '明确「五行生墓」与「十干生墓」是两套：前者不分阴阳顺行，后者阳死即阴生，并说十干生墓是子平家法、六壬向无此类。与八字栏《命理探原》「阳顺阴逆」正好互为边界，两说并列。',
    url: 'https://www.luckclub.cn/daliuren/006/002/',
  },
  {
    id: 'rcy-shehai',
    book: 'rencuiyan',
    chapter: '卷一 辨非十则',
    quote: '涉害一课，取克贼之神。从地盘历数归于本家，以受克深者为用。',
    plain: '涉害取用古法，作者同时说「近来诸家均未用之」，并把择比法判为趋避不可从。本站不发三传，只入库。',
    url: 'https://www.luckclub.cn/daliuren/006/002/',
  },
  {
    id: 'rcy-yincong',
    book: 'rencuiyan',
    chapter: '卷七 毕法补谈之六 格例',
    quote: '谓课有初居干支之前为引，末居干支之后为从者，名引从课。',
    plain: '《六壬粹言》卷七给毕法第一法「前后引从升迁吉」补出课格定义与具体日课（癸酉、庚辰、壬子等）。属格例层，本站无判定，只入库。',
    url: 'https://www.luckclub.cn/daliuren/006/008/',
  },
  {
    id: 'rxs-sanshi',
    book: 'renxuesuoji',
    chapter: '壬学琐记',
    quote: '唐时功令，以奇门、雷公、六壬为三式，雷公即太乙，所谓太乙雷公式是也。',
    plain: '《壬学琐记》是清代随笔考证，作者自道「凡有见闻及屡试屡验者，随笔记之，不能分其门类」。此条讲三式源流，不是断法，只入库。',
    url: 'https://www.luckclub.cn/daliuren/008/001/',
  },
  {
    id: 'bff-diyifa',
    book: 'bifafu',
    chapter: '毕法赋',
    quote: '第一法：前后引从升迁吉，第二法：首尾相见始终宜。',
    plain: '《毕法赋》页面开头是 100 法歌诀（旧记 66 法不准），每两句一法。第一法正是《六壬粹言》卷七补谈的引从格。本站不判毕法格，只入库；页面后半为今人课例解析（有「笔者」「张先生」），一条不引。',
    url: 'https://www.luckclub.cn/daliuren/009/001/',
  },
  {
    id: 'bff-tuoshang',
    book: 'bifafu',
    chapter: '毕法赋',
    quote: '第十五法：脱上逢脱防虚诈，第十六法：空上乘空事莫追。',
    plain: '脱上逢脱、空上乘空两条，在《壬归》卷一「观四课之加临」里有逐句展开（「脱上逢脱多虚诈」）。两处互见，只在此登记歌诀，不重复挂卡。',
    url: 'https://www.luckclub.cn/daliuren/009/001/',
  },
  {
    id: 'bff-hezhong',
    book: 'bifafu',
    chapter: '毕法赋',
    quote: '第八十三法：万事喜忻三六合，第八十四法：合中犯杀蜜中砒。',
    plain: '合中带杀的提醒，属课传吉凶层。页面歌诀编号本身有错（第五十二法误刻作第五十三法、该号重复），照底本原样录，不代为改号。',
    url: 'https://www.luckclub.cn/daliuren/009/001/',
  },
  {
    id: 'rg-yiqi',
    book: 'rengui',
    chapter: '卷之一 提纲例约',
    quote: '凡日上神生日，谓之益气。益气者，有益于我之气也；得之者，遇灾不凶，凡事皆吉',
    plain: '四课加临的第一类判读（益气／脱气／损气／制气）。本站四课只给结构不判生克吉凶，故只入库，不接卡。',
    url: 'https://www.luckclub.cn/daliuren/010/001/',
  },
  {
    id: 'bszz-yuepo',
    book: 'bushizhengzong',
    chapter: '第三篇 十八论',
    quote: '凡卦中月破之爻，乃关因之所现也。',
    plain: '月破论的起句。本站旺衰只看月建给气与日辰扶克，不判月破，故只入库。',
    url: 'https://www.luckclub.cn/liuyao/001/007/',
  },
  {
    id: 'bszz-pi-yl',
    book: 'bushizhengzong',
    chapter: '第四篇 辟诸书之谬',
    quote: '若据张星元以天风姤卦为复卦之伏，取姤卦第四爻午火伏复卦第四爻丑土下',
    plain: '同篇点名批《易林补遗》「飞伏在二仪交换」的取法，并给出自己认为正确的巳火伏寅木下。两种伏神法在下一条一并入库，此处只留批评原文。',
    url: 'https://www.luckclub.cn/liuyao/001/008/',
  },
  {
    id: 'donglin-laiyi',
    book: 'donglin',
    chapter: '洞林秘诀',
    quote: '时下来意占生成，前人虽然未曾明，',
    plain: '《洞林秘诀》是歌诀体「来意／何知章」，按动爻六亲反推来人所问何事。本站不反推来意，只入库。',
    url: 'https://www.luckclub.cn/liuyao/004/001/',
  },
  {
    id: 'donglin-gua',
    book: 'donglin',
    chapter: '洞林秘诀',
    quote: '卦中多者取来情，或向空亡无处寻。',
    plain: '来情取「卦中多者」，与《卜筮正宗》按问事类别定用神是两种思路，并列不调和。',
    url: 'https://www.luckclub.cn/liuyao/004/001/',
  },
  {
    id: 'dytj-qiandai',
    book: 'duanyi',
    chapter: '断易天机卷一',
    quote: '将铜钱三枚放手心，双手紧扣几分钟，心中除去杂念，只想要问之事，晃动铜钱，掷于桌上，共六次。',
    plain: '以钱代蓍的摇卦步骤。白话要说明：这段用「几分钟」「桌上」等今人语，属整理本的操作说明，不是古籍原文；本站直接按卦起盘，不摇卦，只入库。',
    url: 'https://www.luckclub.cn/liuyao/006/001/',
  },
  {
    id: 'dytj-nayin',
    book: 'duanyi',
    chapter: '断易天机卷一',
    quote: '甲子乙丑海中金，丙寅丁卯炉中火，戊辰己巳大林木，',
    plain: '六十甲子纳音表起句，与《卜筮正宗》启蒙节要「方法二」逐字可对（个别用字如「路傍土／路旁土」「白蜡金／白腊金」有异文）。本站六爻不判纳音，只入库。',
    url: 'https://www.luckclub.cn/liuyao/006/001/',
  },
  {
    id: 'bsqs-wugui',
    book: 'bushiquanshu',
    chapter: '卷之三 通玄妙论',
    quote: '一、无鬼无气：鬼者，无形而有用；卦中不可无，宜静不宜动。',
    plain: '《卜筮全书》通玄妙论第一条「无鬼无气」，主张卦中不可无官鬼。本站不判「卦中无鬼」，只入库。',
    url: 'https://www.luckclub.cn/liuyao/007/009/',
  },
  {
    id: 'bsqs-hechu',
    book: 'bushiquanshu',
    chapter: '卷之三 通玄妙论',
    quote: '合则事必成，逢冲灾必散。',
    plain: '同书「合处逢冲」条的收尾，与《卜筮正宗》十八论「谋虽成而终散／事已散而复成」是同一机括的不同表述，两处并列。',
    url: 'https://www.luckclub.cn/liuyao/007/009/',
  },
  {
    id: 'bsqs-tianyi',
    book: 'bushiquanshu',
    chapter: '卷之十四 神煞歌例',
    quote: '甲戊兼牛羊，乙己鼠猴乡，丙丁猪鸡位，壬癸兔蛇藏，庚辛逢马虎，此是贵人方。',
    plain: '天乙贵人歌。本站六神卡讲青龙白虎等六神的味道，不按天乙贵人起断，故只入库；与八字栏「甲戊庚牛羊」的另一版本也并列不改。',
    url: 'https://www.luckclub.cn/liuyao/007/020/',
  },
  {
    id: 'ylby-feifu-yi',
    book: 'yilinbuwei',
    chapter: '卷一',
    quote: '飞为已住，伏为将来。',
    plain: '同卷给飞伏的时间义（已往／将来），与「飞伏是卦爻藏哪一支」的结构义不同，不混用。',
    url: 'https://www.luckclub.cn/liuyao/008/005/',
  },
  {
    id: 'ylby-zongduan',
    book: 'yilinbuwei',
    chapter: '卷一',
    quote: '吉凶由八卦变通，须察吉变凶而凶变吉。',
    plain: '易林总断章第一的纲领：吉凶看动变，不是看静卦。本站动变卡按动爻取变，只入库作源头。',
    url: 'https://www.luckclub.cn/liuyao/008/005/',
  },
  {
    id: 'yy-shenming',
    book: 'yiyin',
    chapter: '易隐卷一',
    quote: '凡占身命，有三重焉，世爻，身爻，(月卦)，与本命爻，是也。',
    plain: '《易隐》身命章立「世、身、本命」三重，又引入大限小限、纳音命。本站不排身命运限，只入库；括号内「月卦」是底本原注，照录。',
    url: 'https://www.luckclub.cn/liuyao/009/003/',
  },
  {
    id: 'yy-nayin',
    book: 'yiyin',
    chapter: '易隐卷一',
    quote: '按管公身命口诀，命以纳音为主，如甲子乙丑生人纳音属金，则为金命',
    plain: '明说管公口诀以纳音定命，与「以生年支神为命爻」的诸书异，作者自注「附添」。异说照留，本站不取。',
    url: 'https://www.luckclub.cn/liuyao/009/003/',
  },
  {
    id: 'ym-jiazi',
    book: 'yimao',
    chapter: '易冒卷之一',
    quote: '用甲乘子，取乙驾丑，干支终始而循环，天地之数六十而尽矣。',
    plain: '《易冒》甲子章讲干支相配成六十，并注周正建子与夏正建寅之别。属历法前提，只入库。',
    url: 'https://www.luckclub.cn/liuyao/010/002/',
  },
  {
    id: 'ym-nayin',
    book: 'yimao',
    chapter: '易冒卷之一',
    quote: '古纳音但有甲子乙丑属金，丙寅丁卯属火之法，及娄景先生推五行之理作歌，始有海中金炉中火之说。',
    plain: '把纳音「五行所属」与「海中金炉中火」的意象名分成两层、且指后者后出。与八字栏纳音诸条可互校，本站六爻不判纳音，只入库。',
    url: 'https://www.luckclub.cn/liuyao/010/002/',
  },
  {
    id: 'ym-guidong',
    book: 'yimao',
    chapter: '易冒卷之六',
    quote: '夫克我为鬼为难，动则难作，所以象像而为祸也。',
    plain: '《易冒》家宅章以官鬼动为祸，并按五行、六神、八宫、十二支逐层取象。本站六神卡只讲「味道不是主角」，不取这一整套取象，只入库。',
    url: 'https://www.luckclub.cn/liuyao/010/007/',
  },
  {
    id: 'sxzy-zhuangshi',
    book: 'shixuezhiyao',
    chapter: '筮学指要',
    quote: '八宫之卦世当六，以下初爻轮上装。',
    plain: '装世应口诀（八宫本宫卦世在六爻，逐变往上轮；游魂四、归魂三）。与已挂卡的京氏易传八宫世应序可对，本站按八宫装世，但此条属装卦口诀，只入库。',
    url: 'https://www.luckclub.cn/liuyao/011/001/',
  },
];

// ── 引擎侧条目的原文与白话 ─────────────────────────────────
// citations.js 里只留「出处行渲染要用的定位字段」（id / 书名 / 卷章 / 链接）；
// quote 与 plain 在这里，供索引页与 CI 逐字核验，不打进任何 client.*.js。
// 谁把原文塞回引擎侧，test/citations.test.mjs 的「引擎侧不带原文」会先红。
export const CITATION_TEXT = [
  {
    id: 'zw-poge-sanfang',
    quote: '及命宫星辰庙旺，三方有恶星守照破格。',
    plain: '命宫主星虽庙旺，三方四正见恶星也会破格。',
  },
  {
    id: 'zw-poge-ruge',
    quote: '若居陷地又加杀化忌，为下格之命，不以入格而论也。',
    plain: '星落陷地又见煞星、化忌，就不按入格来论。',
  },
  {
    id: 'zw-shiyin',
    quote: '巨门子午二宫逢，身命逢之必贵荣，更得三方科禄照，石中隐玉是丰隆。',
    plain: '巨门在子午守命，要三方有化科、化禄照会，石中隐玉才成格。',
  },
  {
    id: 'zw-jiju-poge',
    quote: '因甲禄到寅卯宫有擎羊破格耳。',
    plain: '巨机本可取贵，但擎羊落宫会把格局破掉。',
  },
  {
    id: 'zw-riyue-jia',
    quote: '加羊陀冲守，宜僧。',
    plain: '日月夹命再加羊陀冲守，吉意大减。',
  },
  {
    id: 'zw-changqu',
    quote: '昌曲陷宫凶杀破虚誉之隆  凶杀即羊陀空劫。',
    plain: '昌曲落陷再逢凶杀，名声易成虚誉；这里的凶杀指羊陀空劫。',
  },
  {
    id: 'zw-kuiyue',
    quote: '魁钺重逢杀凑痼疾尤多  杀乃羊铃空劫。',
    plain: '魁钺夹命再凑煞星，贵气减等；煞指羊铃空劫。',
  },
  {
    id: 'zw-jiyue',
    quote: '机月同梁作吏人  命在寅申方论，加吉不论，无吉无杀亦是平常人，凶杀空劫化忌为下格。',
    plain: '机月同梁要在寅申论；无吉无杀只是平常，逢凶杀空劫化忌则降为下格。',
  },
  {
    id: 'zw-tanwu',
    quote: '贪武申宫为下格  化忌方论。',
    plain: '武贪在申本可论格，但带化忌才作下格论。',
  },
  {
    id: 'zw-huotan',
    quote: '火遇贪狼照命宫，封侯食禄是英雄，三方倘若无凶杀，到老应知福寿隆。',
    plain: '火贪照命本是贵格，前提是三方没有凶杀；见煞则破。',
  },
  {
    id: 'zw-luma',
    quote: '如与禄存同宫，谓之禄马交驰，又曰折鞭马',
    plain: '禄存与天马同宫才叫禄马交驰。',
  },
  {
    id: 'zw-sihua-ji',
    quote: '如会紫府、昌曲、左右、科权禄，与忌同宫又兼四杀共处，即发财亦不佳，功名亦不成就。',
    plain: '吉星与化忌、四杀同处，即使发财也不好，功名难成。',
  },
  {
    id: 'zw-sihua-lu',
    quote: '禄为福德之神。守身命官禄之位，科权相逢必作大臣之职。',
    plain: '化禄主福，与科权相会可论官职。',
  },
  {
    id: 'zw-sanfang',
    quote: '三看迁移财帛官禄三方星辰刑冲克破。',
    plain: '第三步就看迁移、财帛、官禄这组三方有没有刑冲克破。',
  },
  {
    id: 'zw-shenming',
    quote: '看身安命禄马不落空亡天空截空最紧，旬空次之。',
    plain: '看身命先看禄马有没有落空亡、天空、截空。',
  },
  {
    id: 'zw-daxian',
    quote: '如宫分星缠全吉庙旺得地，无擎羊陀罗火铃空劫者，主十年安静，人财全美。',
    plain: '大限宫吉星庙旺且不见羊陀火铃空劫，十年较安稳。',
  },
  {
    id: 'zw-miaowang',
    quote: '天机 庙子午 旺辰酉 陷丑未',
    plain: '天机的庙旺陷地：子午庙、辰酉旺、丑未陷。',
  },
  {
    id: 'zw-kongjie',
    quote: '二星守身命，遇吉则吉，遇凶则凶。如四杀冲照，轻者下贱，重者六畜之命。',
    plain: '空劫守身命，吉凶随会照而定；再逢四杀冲照则加重。',
  },
  {
    id: 'zw-taiwei-ji-xiong',
    quote: '諸星吉，逢凶也吉。諸星凶，逢凶也凶。',
    plain: '盘中吉星居多时，遇到凶星也减为轻；凶星居多时，遇到吉星也压不住。这是「吉凶看多寡」的原始表述，插件在格局破格里按三方四正会合的星数判定，不折分数。',
  },
  {
    id: 'zw-taiwei-jueshu',
    quote: '殺居絕地，天年夭似顏回。貪坐生鄉，壽考永如彭祖。',
    plain: '同一类星曜，落到死绝之宫主折损，坐生旺之乡主寿考。落宫能把断语翻过来，这就是插件把「庙旺利陷」单列一层的原因。',
  },
  {
    id: 'zw-fawei-sizheng',
    quote: '四正吉星定為貴，三方殺拱少為奇。對照兮詳凶詳吉，合照兮觀賤觀榮。',
    plain: '四正（本宫与对宫、三合）见吉星定为贵，三方被煞星拱照而仍贵的属少数例外；对照与合照要分开细看。插件的三方四正正是这一层的实现。',
  },
  {
    id: 'zw-fawei-ruxian',
    quote: '吉星入垣則為吉，凶星失地則為凶。',
    plain: '吉星要入本垣才算吉，凶星失地才真凶——判断落在「这颗星在哪个宫」。插件按诸星庙旺表与得地名单实现这一层。',
  },
  {
    id: 'zw-fawei-xinglian',
    quote: '行限逢乎弱地未必為災，立命會在強宮必能降福。',
    plain: '行限走到弱地未必是灾，命宫立在强宫却可能降福——限与命是两层。插件的大限、流年只标宫星事实，不据此扣分。',
  },
  {
    id: 'zw-fawei-kequ',
    quote: '科星居於陷地，燈火辛勤。昌曲在於凶鄉，林泉冷淡。',
    plain: '化科落陷地只是灯火辛勤（用功而少成），昌曲在凶乡不过林泉冷淡。吉星失地即减其吉，与「入垣为吉」两句相表里。',
  },
  {
    id: 'zw-gaolv-jiongji',
    quote: '諸星吉多逢凶也吉，諸星惡多逢吉也凶。',
    plain: '诸星吉居多，逢凶也作吉；诸星恶居多，逢吉也作凶。与太微赋「诸星吉逢凶也吉」同义而措辞小异，两处并看才是「以多寡定」的原话。',
  },
  {
    id: 'zw-gaolv-dexian',
    quote: '星更纏度，數分定局。重在看星得垣受制，方可論人禍福窮通。',
    plain: '星有缠度、数有定局，但重点仍是看星得垣还是受制，才谈得上论祸福穷通。这是「先看落宫、再看吉凶」这一口径的出处。',
  },
  {
    id: 'zw-gaolv-shenming',
    quote: '大概以身命為禍福之柄，以根源為窮通之機。',
    plain: '以身宫、命宫作祸福的把手，以根源（生时、立命）作穷通的关键。插件把命宫与身宫分列两栏，正承这一句。',
  },
  {
    id: 'zw-zengbu-nannv',
    quote: '天梁遇马女命贱而且淫，昌曲夹墀男命贵而且显。',
    plain: '同一组合因性别而断法相反：天梁遇天马，女命古人作贬语；昌曲夹墀（命前命后），男命反主贵显。夹的取法是前后两宫，不作左右。',
  },
  {
    id: 'zw-gusu-yili',
    quote: '或在恶限，积百万之金银。或在旺乡，遭连年之困苦。祸福不可一途而惟，吉凶不可一例而断。',
    plain: '恶限里也可能积聚百万，旺乡里也可能连年困苦，所以祸福不可一途而论、吉凶不可一例而断。插件「格局成立不等于落定」一条的根据正在这两句。',
  },
  {
    id: 'zw-gusu-mingshen',
    quote: '要知一世之荣枯，定看五行之宫位。立命可知贵贱，安身便晓根基。',
    plain: '一世荣枯看五行落哪一宫；立命可知贵贱、安身便晓根基。命宫与身宫各管一层，插件分两栏列出，不合并成一个分数。',
  },
  {
    id: 'zw-gusu-duigong',
    quote: '第一先看福德，再三细考迁移，分对宫之体用，定三合之源流。',
    plain: '先看福德、再考迁移，分对宫的体用，定三合的源流。这是「三方四正」最直白的一句：对宫与三合必须一起看，只看本宫会漏掉一半。',
  },
  {
    id: 'zw-gusu-kong-jian',
    quote: '命里逢空不飘流即主疾苦，马头带剑非夭折则主刑伤。',
    plain: '命宫逢空劫，不是飘流就是疾苦；擎羊在午（马头带剑），不是夭折就是刑伤。原文两句都不作吉断，插件把两格标为倾向不利，并说明古人措辞重。',
  },
  {
    id: 'zw-gusu-jieyao',
    quote: '生逢天空犹如半天折翅，命中遇劫恰如浪里行船',
    plain: '生逢天空如半天折翅，命中遇劫似浪里行船——空劫取「计划外的折损」之象。插件的「命里逢空」即这一条件，只标变动性质，不判吉凶。',
  },
  {
    id: 'zw-gusu-fanwei',
    quote: '先贫后富武贪同身命之宫，先富后贫只为运限逢劫杀。',
    plain: '先贫后富，因武曲贪狼同在身命之宫；先富后贫，只为运限逢劫杀。贫富有「先后」，差别在大限走到哪一宫——插件把大限、流年与原局分层标出。',
  },
  {
    id: 'zw-shideng-qianguan',
    quote: '贫贱论 如擎羊陀罗廉贞七杀武曲破军天空地劫忌星三方四正守照拱冲诸凶并犯陷地主贫贱',
    plain: '与上一条对偶：羊陀、廉贞七杀、武曲破军、空劫、忌星在三方四正守照拱冲，且诸凶并犯陷地，才主贫贱。条件是「一堆凶 + 落陷」，单个字不成判。',
  },
  {
    id: 'zw-dedi-wu',
    quote: '午安命 午宫紫府太阳同，机梁破杀喜相逢，甲丁己癸生人福，一世风光廪禄丰。',
    plain: '午宫安命，紫微天府太阳同宫、机梁杀破喜相逢，甲丁己癸年生人福厚。这一诀按「安命何宫」取吉，还与生年干绑定，与通行庙旺表互补。',
  },
  {
    id: 'zw-dedi-hai',
    quote: '亥安命 亥宫最喜太阴逢，若人值此福禄隆，男女逢之皆称意，富贵荣华直到终。',
    plain: '亥宫安命最喜太阴，值此者福禄隆、男女皆称意。与「月朗天门」是同一坐标、两处出处；诀里还明说男女同看，与女命专篇不同口径。',
  },
  {
    id: 'zw-shixian-zi',
    quote: '子丑安命 子午天机丑巨铃，此星落陷果为真，纵然化吉更为美，任他富贵不清宁。',
    plain: '子丑安命，天机在子、巨门铃星在丑为落陷，即便化吉也只主富贵而不清宁。落陷之宫纵吉亦减——这句正是「化吉能不能翻回来」的分歧所在。',
  },
  {
    id: 'zw-shixian-shen',
    quote: '申酉安命 申宫机巨为破格，男人浪荡女人贫，二宫若然桃花见，男女逢之总不荣。',
    plain: '申酉安命，天机巨门在此为破格；再遇桃花则男女皆不荣。同一「机巨」在辰戌为陷、在申酉为破格，两诀并看才见宫位差异，插件只列结构不落贵贱。',
  },
  {
    id: 'zw-nvming-fuxiang',
    quote: '府相之星女命躔，必当子贵与夫贤。',
    plain: '女命以天府、天相为吉曜，主子贵夫贤。这与男命先看财帛、官禄、迁移不同一层，插件不排「女命格局」，只把这一篇作为性别取法不同的原文凭据。',
  },
  {
    id: 'zw-nannv-nan',
    quote: '男女命不同，星辰各别。男命先看身命，次看财帛宫禄迁移，俱要庙旺为吉，落陷聚凶为凶。',
    plain: '男女命取法不同：男命先看身命二宫，次看财帛、官禄、迁移，皆以庙旺为吉、落陷聚凶为凶。「先看哪几宫」就是这一篇给的次序。',
  },
  {
    id: 'zw-nannv-nv',
    quote: '女命先看身命吉凶，如贪狼七杀擎羊则不美。次看福德宫吉凶，若七杀单居福德必为娼婢。',
    plain: '女命先看身命吉凶，贪狼、七杀、擎羊守之则不美；次看福德宫。判词的措辞属旧时代对女性的贬抑，插件保留取法次序、不保留这类断语。',
  },
  {
    id: 'zw-shenshi-shen',
    quote: '如人生子亥二时最难定，准要仔细推祥，如子时有十刻，上午刻属昨夜亥时，下午刻属今日子时',
    plain: '子、亥二时的生时最难定，须细推：子时十刻中，上午刻属前夜亥时、下午刻属当日子时。插件的晚子时开关（lateZi）处理的正是这一界。',
  },
  {
    id: 'smt-wangxiang',
    quote: '盛德乘时曰旺。如春木旺，旺则生火，火乃木之子，子乘父业，故火相；木用水生，生我者父母，今子嗣得时，登高明显赫之地，而生我者当知退矣，故水休。',
    plain: '当令得时叫旺；旺者所生为相，生旺者退为休。旺相休囚死是按四季轮转的相对状态，不是固定标签。',
  },
  {
    id: 'smt-shensha',
    quote: '神煞，古有百二十名，其说穿凿支离，造化恐不如是。',
    plain: '神煞名目古有百余种，说法穿凿支离；作者自己也说造化未必如此，神煞只能作旁证。',
  },
  {
    id: 'smt-kongwang',
    quote: '故以甲旬尽处曰空亡，盖有是位而无禄，曰空；有支而无干，曰亡。',
    plain: '旬中十干配完还剩两支无干可配，有支无干叫亡；这一位没有禄叫空。空亡是按旬推出的虚位，不直接等于凶。',
  },
  {
    id: 'smt-dayun-qiyun',
    quote: '总十年之运气，凡三日有三十六时，乃见三百六十日为一岁之数；在一月之中有三百六十时，折除节气，算计三千六百日为一辰之十岁也。',
    plain: '起运的折算：三日折一年、一月折十年，按出生到节气的时间折出起运岁数；这是通行「三日折一年」的出处之一。',
  },
  {
    id: 'smt-liuqin',
    quote: '有夫妇然后有父子，有父子然后有兄弟。六亲者，父母兄弟妻子也。',
    plain: '六亲指父母、兄弟、妻子；先有夫妇才有父子兄弟，取六亲以十干生克配出，再落到四柱宫位上看旺衰。',
  },
  {
    id: 'smt-xingchong',
    quote: '《阴符经》曰：恩生于害，害生于恩；三刑生于二合，亦如六害生于六合之义。',
    plain: '三刑由三合与三会相叠而生，六害由六合而生：合里藏着刑害，所以见合不能只看合。',
  },
  {
    id: 'qt-tiaohou',
    quote: '北方阴极而生寒，寒生水。南方阳极而生热，热生火。',
    plain: '五行由方位寒热燥湿而生：北寒生水、南热生火。调候就是先看命局寒暖燥湿，再取能调和的字。',
  },
  {
    id: 'qm-yinyang',
    quote: '阴阳二遁分顺逆，一气三元人莫测。五日都来换一元，接气超神为准的。',
    plain: '一年分阴阳两遁：冬至后顺布、夏至后逆布；一气分上中下三元、五日换一元，超神接气用来对齐节气与符头。取局法不同，同一时刻可能排出不同局数。',
  },
  {
    id: 'qm-jixing',
    quote: '六仪击刑真是凶，值符天乙遇亦穷。六仪非值终无吉，吉凶轻重义相同。此际切宜遁取吉，勿于此地想成功。子三戌二寅刑四，申八辰四午离中。戌刑在未寅在巽，巽有巳兮申缓从。',
    plain: '六仪落到与自身相刑的宫位叫击刑：甲子戊落三宫、甲戌己落二宫、甲申庚落八宫、甲辰壬落四宫、甲午辛落九宫；甲寅癸的寅刑巳、戌刑未也各有所指。击刑是宫位条件，说明这个符号使不上力，不直接等于事情必败。',
  },
  {
    id: 'qm-rumu',
    quote: '三奇入墓，闭塞不通，暗昧不振，诸事皆凶。乙阴木长生在午墓于戌，丙火长生在寅墓于戌，故乙丙到乾为墓。丁阴火长生在酉墓于丑，故丁到艮为墓。',
    plain: '按五行墓库判：乙木、丙火墓在戌（乾六宫），丁火墓在丑（艮八宫）。天盘三奇落到自己的墓宫即入墓，取象是收住、藏起来、事情压着不动；问收藏与了结时未必是坏事。',
  },
  {
    id: 'qm-wangshuai',
    quote: '旺相休囚：春木相火旺水废金囚土休，夏火相土旺木废水囚金休，秋金相水旺土废火囚木休，冬水相木旺金废土囚火休。',
    plain: '旺相休囚按季节五行轮转：当令者旺、被当令所生者相、生当令者休、克当令者囚、被当令所克者废（死）。门、星、天盘干各按自身五行对月令，得出当下力量强弱。',
  },
  {
    id: 'qm-men-gong',
    quote: '右八门最怕迫制，吉门有气益吉，无气减吉；凶门有气益凶，无气减凶。',
    plain: '八门怕被宫位迫制；吉门有气更吉、无气则减吉，凶门有气更凶、无气则减凶。旺衰只是加权，门与宫的生克要另算，两层并列、不互相替代。',
  },
  {
    id: 'mh-tiyong',
    quote: '体用即动静之说。体为主，用为事。应用事体及比和，则吉；体生用及克体，则不吉。',
    plain: '体卦代表自己、主静；用卦代表所问之事、主动。用生体或体用比和为顺，体生用（泄气）与用克体为不顺；再看互卦、变卦与旺衰定轻重。',
  },
  {
    id: 'zs-yongshen',
    quote: '父母爻：占父母卽以卦中之父母爻爲神。',
    plain: '六亲各有用神：问父母就以父母爻为用神，兄弟、妻财、子孙、官鬼也各按所问的人与事取爻。',
  },
  {
    id: 'zs-fushen',
    quote: '此卦寅木妻財在二爻﹐卽以此寅木伏於姤卦亥水之下﹐姤卦二爻之亥水卽爲飛神﹐寅木妻財卽爲伏神﹐亥水而生寅木﹐謂之飛來生伏得長生﹐此用神不現﹐尋得伏神而遇生扶有用﹐亦爲用神﹐便作吉斷﹐餘仿此。',
    plain: '用神不上卦时，到本宫首卦里找伏神：伏在下面的叫伏神，压在它上面的叫飞神。伏神得日月或飞神生扶，才算有用。',
  },
  {
    id: 'zs-yuejian',
    quote: '月將卽是月建又爲月令。掌一月之權，司三旬之令。',
    plain: '月建就是月令，掌一月的时令、管三旬的旺衰；它能扶起衰弱的爻，也能制住动爻与变爻。',
  },
  {
    id: 'zs-yuejian-zhuli',
    quote: '爻之衰弱者能生之合之、比之、拱之、扶之，衰而亦旺。',
    plain: '月建对衰弱的爻能生、合、比、拱、扶，衰的也可以转旺；反过来对强旺的爻能冲、克、刑、破，旺的也会转衰。',
  },
  {
    id: 'zs-richen',
    quote: '日辰爲六爻之主宰，司四時之旺相。',
    plain: '日辰是六爻之主宰，四时都能当令，与月建同功；日冲旺相静爻为暗动，冲衰弱静爻为日破。',
  },
  {
    id: 'zs-dongbian',
    quote: '卦有動爻，動而必變，夫變出之爻能生克沖合本位之動爻，不能生克他爻，而他爻與本位之動爻，亦不能生克變爻。',
    plain: '动爻变出的爻，只与本位动爻发生生克冲合，不直接作用于其他爻；其他爻也不直接生克这个变爻。',
  },
  {
    id: 'zs-liushen',
    quote: '諸書無不以靑龍爲吉，白虎爲凶。',
    plain: '旧籍多以青龙为吉、白虎为凶；本章随即用卦例说明六神只是取象的一层，不能只看它断吉凶。',
  },
  {
    id: 'zs-liuhe',
    quote: '子與丑合、寅與亥合、卯與戌合、辰與酉合、巳與申合，午與未合。',
    plain: '六合固定六对：子丑、寅亥、卯戌、辰酉、巳申、午未；静爻逢合叫合起，动爻逢合叫合绊。',
  },
  {
    id: 'zs-liuchong',
    quote: '相沖之法有六。日月沖爻者一也，卦逢六沖二也，六合卦變六沖三也，沖變六沖四也。動爻變沖五也、爻與爻沖六也。',
    plain: '相冲分六种：日月冲爻、卦逢六冲、六合卦变六冲、冲变六冲、动爻变冲、爻与爻冲。冲主散，吉事不宜，凶事反而宜散。',
  },
  {
    id: 'zs-fanyin',
    quote: '內卦反伏，內則不安。外卦反伏，外則不寧。內外反伏者，內外不寧之象也。',
    plain: '内卦反伏主内不安，外卦反伏主外不宁，内外都反伏则内外不宁；取象是事情反复，成而败、败而成。',
  },
  {
    id: 'zs-fuyin',
    quote: '內卦動變伏吟，內則呻吟，外卦動變伏吟，外則憂鬱。',
    plain: '内卦动变伏吟主内呻吟，外卦动变伏吟主外忧郁；伏吟取停滞难伸，不像反吟那样带冲克。',
  },
  {
    id: 'zs-jintui',
    quote: '進神退神者﹐爻之動而化也﹐化進化退﹐吉凶禍福有喜忌之分﹐所喜者宜於化進﹐所忌者宜化退神。',
    plain: '进神退神是动爻化出同五行的顺次之支：化进主向前，化退主退气；喜用的宜化进，所忌的宜化退。',
  },
  {
    id: 'zs-yingqi',
    quote: '靜而逢值逢沖：如主事爻臨子水不動，後逢子日午日而應之，餘仿此。',
    plain: '应期先分动静：静爻在逢值或逢冲之日应，动爻在逢合或逢值之日应；其余按入墓、旬空、月破等逐条推。',
  },
  {
    id: 'dl-jigong',
    quote: '甲课寅兮乙课辰，丙戊课巳不须论。丁己课未庚申上，辛戌壬亥是其真。癸课原来丑宫坐，分明不用四正神。',
    plain: '十干寄宫是四课起手：甲寄寅、乙寄辰、丙戊寄巳、丁己寄未、庚寄申、辛寄戌、壬寄亥、癸寄丑；丙戊、丁己各同宫，子午卯酉四个正位不寄。',
  },
  {
    id: 'dl-zeike',
    quote: '取课先从下贼呼，如无下贼上克初。初传之上名中次，中上加临是末居。三传既定天盘将，此是入式法第一。',
    plain: '九宗门取初传先看下贼上，没有下贼再看上克下；初传定后，中传取初传所乘之神，末传再顺取一位，三传齐了才布天盘天将。',
  },
  {
    id: 'dt-yiqi-tonggen',
    quote: '天全一气，不可使地德莫之载。地全三物，不可使天道莫之容。',
    plain: '四柱天干同属一气，还得地支能承载它；地支所藏三干若不透到天干，也显不出用处——通根与透出是一件事的两面。',
    // 2026-11-01 复核：这一句是《子平真诠》论十干十二支注文里明确引作《滴天髓》的话，
    // 在滴天髓底本（干支总论）里能逐字对上，所以才是「通根透干」可核的原文。
    note: '《子平真诠》卷一论十干十二支注文引作《滴天髓》语，底本干支总论原文可核。',
  },
  {
    id: 'dt-liuqin-fuqi',
    quote: '夫妻因缘宿世来，喜神有意傍天财。',
    plain: '看夫妻，落点在「喜神」与「财星」的相对位置：财是妻星，喜神是能护住用神的那一位。配偶这件事，看的是财星有没有被喜神照到，不是看盘里有没有财。',
    // 底本此篇为韵语提纲，各家注解分歧很大；这里只录原文，不把某家注解当原文引用。
    note: '本句是六亲论的提纲韵语，正文各家用注解发挥，取义不一，故只作「有这一说」的原文凭据。',
  },
  {
    id: 'dt-liuqin-zinv',
    quote: '子女根枝一世传，喜神看与杀相连。',
    plain: '子女星取官杀，但成不成器要看喜神与杀的关系：有杀无喜，是压力；有喜有杀，才谈得上传承。单见官杀不作吉断。',
  },
  {
    id: 'dt-liuqin-fumu',
    quote: '父母或降与或替，岁月所关果非细。',
    plain: '父母看年月两柱：位置定了，还要看这两柱是「降」（受制）还是「替」（得代），差别不小。这是把六亲落到宫位上，而不是只看印星。',
  },
  {
    id: 'dt-nvming-shensha',
    quote: '论夫论子要安详，气静平和妇道章，三奇二德虚好语，咸池驿马半推详。',
    plain: '这句是古籍自己在批神煞：三奇、二德这类吉神被叫作「虚好语」（空口说好话），咸池（桃花）、驿马只能「半推详」（顶多参考一半）。反对滥用神煞不是今人的意见，原文里就有。',
    // 2026-11-01 录入：这句是本插件「神煞显示但不参与判断」最直接的原文依据，
    // 而且是《滴天髓》自己说的，比后人转述有力。注意「三奇二德」指三奇、天德月德一类吉神。
    note: '「三奇二德虚好语，咸池驿马半推详」是滴天髓原文对神煞的贬语，可直接支撑「神煞不主吉凶」。',
  },
  {
    id: 'dt-hezhi-fugui',
    quote: '何知其人富，财气通门户。何知其人贵，官星有理会。何知其人贫，财神反不真。何知其人贱，官星还不见。',
    plain: '富看财有没有「通门户」（财能流通到日主），贵看官星有没有「理会」（有制有化、有人承接）。反过来，贫是财星不真（有财而无用），贱是官星不见或不理。判词是四个可查的条件，不是形容词。',
  },
  // ── B8：六爻源头三本与紫微卷一两篇（对应引擎侧 17 条定位字段）
  {
    id: 'lj-yuejian-richen',
    quote: '日辰為六爻之主宰，喜其滅項以安劉。月建乃萬卦之提綱，豈可助桀而為虐。',
    plain: '日辰管六个爻当天的生死，月建管整卦的提纲——旺衰第一步只看这两样，不先看神煞。',
  },
  {
    id: 'lj-shiying-bibi',
    quote: '世為己，應為人，大宜契合。動為始，變為終，最怕交爭。',
    plain: '世爻代表自己这一头，应爻代表对方那一头，两者相生相合才好办；动爻变爻互相攻战就是事情反复。',
  },
  {
    id: 'lj-yongshen-youqi',
    quote: '用神有氣無他故，所作皆成。主象徒存更被傷，凡謀不遂。',
    plain: '用神得月日之气、又没被别的东西牵住，所问就能成；用神只是名义上存在还被克伤，怎么谋都不顺。',
  },
  {
    id: 'lj-taiguo-buji',
    quote: '夫人有賢不肖之殊，卦有過不及之異。太過者損之斯成，不及者益之則利。',
    plain: '卦有病在过头或不够两头：过头的要损它（逢墓逢冲），不够的要帮它（遇生遇旺），才谈得上吉凶。',
  },
  {
    id: 'lj-fushen-tiba',
    quote: '伏無提拔終徒爾，飛不推開亦枉然。空下伏神易於引拔，制中弱主難以維持。',
    plain: '伏神要有人提拔（日月动爻来生它），飞神要能被推开，伏出来的爻才起作用；旬空之下的伏神最容易引出来。',
  },
  {
    id: 'lj-yingqi-chongpo',
    quote: '如逢合住，須沖破以成功；若遇休囚，必生旺而成事。',
    plain: '被合住的爻要等冲开的那天才见分晓；休囚的用神要等生旺的月日才成事——这是本站应期两条主路的出处。',
  },
  {
    id: 'lj-jintui-jiaochong',
    quote: '卦爻發動，須看交重；動變比和，當明進退。',
    plain: '看动爻先分清是老阴老阳（交重）才变，变爻与本爻同五行的还要分辨是化进还是化退。',
  },
  {
    id: 'lj-shensha-shengke',
    quote: '是故吉凶神煞之多端，何如生剋制化之一理。',
    plain: '神煞名目再多，也比不过生克制化这一条理——本站把六神只当取象，不当主角，出处在此。',
  },
  {
    id: 'lj-hunyin-liuchong',
    quote: '六合則易而且吉，六沖則難而又凶。',
    plain: '六合卦好谈成、六冲卦难成——本站的六冲主散、六合主成就这一句的直接出处。',
  },
  {
    id: 'js-ganfei-fufeifu',
    quote: '純陽用事。象配天，屬金。與坤為飛伏，居世。',
    plain: '京房给每宫首卦都配一对飞伏（乾与坤互为飞伏），世爻就定在这卦上——本站伏神取本宫首卦同位，根源在这套配法。',
  },
  {
    id: 'js-bagong-zongang',
    quote: '凡八卦分為八宮，每宮八卦，八八六十四卦。定吉凶，配人事。',
    plain: '六十四卦不是平铺，是先分八宫、每宫管八卦，再定世应与吉凶——本站八宫卦序表与世应序就建立在这个结构上。',
  },
  {
    id: 'hzl-liuqin-genyuan',
    quote: '卦定根源，六亲为主；又究旁通，五行而取。',
    plain: '先看这一卦归哪一宫（根源），六亲从宫主上起；再看飞伏旁通，五行生克来取舍——本站定用神先定六亲、六亲从本宫出，即此。',
  },
  {
    id: 'hzl-duifa-luandong',
    quote: '独发易取，乱动难寻；先看世应，后审浅深。',
    plain: '只有一个动爻时直接取它；满盘乱动时先回到世应，再论深浅旺衰——本站多爻动的取用次序按这一句排。',
  },
  {
    id: 'hzl-shiying-women',
    quote: '世爻乃我家情由，应爻为彼之事理。',
    plain: '世爻这一头是自家的情况，应爻那一头是对方的情况——问别人、问合作就看应爻动不动、克不克世。',
  },
  {
    id: 'zm-zhunsheng-shenming',
    quote: '命居生旺定富貴，各有所宜。身坐空亡論榮枯，專求其要。',
    plain: '命宫要坐在生旺之地，身宫最怕坐空亡——本站把身宫单列一栏、并给身宫加空亡折扣，出处在此。',
  },
  {
    id: 'zm-xingyuan-yinmao',
    quote: '寅乃木之垣，乃三陽交泰之時，草木萌芽之所，至於卯位，其木至旺矣。貪狼天機是廟樂',
    plain: '星垣论按五行之垣讲庙乐：寅卯是木的垣，所以贪狼天机（木）到寅卯为庙乐——与卷三逐星庙旺表是两套口径。',
  },
  {
    id: 'js-shiying-guihun',
    quote: '三公臨世，應上九為宗廟。',
    plain: '乾宫归魂卦大有：世爻落在三爻（"三公"），应爻钉在上九。京房逐卦这样标世位，本站八宫世应序即据此；"世应相隔三位"是这一系列实例的通行推步。',
  },
  // ── B9 第二批：神峰通考 9 / 珞琭子消息赋 3 / 兰台妙选 2（2026-11-07 逐字核验 luckclub 本）
  {
    id: 'sf-quzhi',
    quote: '只要寅卯辰三字全，方作此格。若有申酉一字破之不吉。',
    plain: '张楠给曲直仁寿格下的硬条件：寅卯辰三字齐全才成格，见申酉一字即破。本站判专旺格同样要求方局全且不见克破，但原文只举东方木这一例。',
  },
  {
    id: 'sf-yanshang',
    quote: '丙丁生寅卯月，得寅午戌全，则为火虚有焰，畏水破格',
    plain: '炎上格取丙丁日生寅卯月、地支寅午戌全，最怕水来破格。本站炎上格按火势专旺判，见水即列作破格条件之一。',
  },
  {
    id: 'sf-jiase',
    quote: '戊己日干，见辰戌丑未，及巳午未字多，若四柱无官杀，则用此格',
    plain: '稼穑格要戊己日、辰戌丑未与巳午未字多，且四柱不见官杀才用。本站专旺判定同样先看有无官杀破局。',
  },
  {
    id: 'sf-congge',
    quote: '此多禄杂，原非纯粹可观，与壬癸润下格理同。此二格吾见多矣，未尝有富贵者。',
    plain: '张楠对从革、润下两格直言不认同，说自己见过很多例却没见富贵的。这是原书内部的反对意见，本站照录并引，不替用户抹平，也不据此改判定。',
  },
  {
    id: 'sf-runxia',
    quote: '且如壬癸日，要申子辰全，或亥子丑全是也。忌辰戌丑未宫乡。',
    plain: '润下格要壬癸日、申子辰或亥子丑全，忌见辰戌丑未。须与从革条并读：张楠在同一卷里又说这两格未见富贵。',
  },
  {
    id: 'sf-yangren',
    quote: '六阳日干谓之阳刃理也，六阴日干不谓之刃',
    plain: '张楠的阳刃只认六个阳日干，阴日干不算刃。本站羊刃表按十干各配一位，与这一说不同，故并引不合并。',
  },
  {
    id: 'sf-rensha',
    quote: '煞无刃不显，刃无杀不威',
    plain: '七杀与阳刃要相配才见其用，是「羊刃驾杀」一类组合的早期说法。同页这句前有讹字（「又日」当作「又曰」），摘句只取干净的一句。',
  },
  {
    id: 'sf-kuigang',
    quote: '何以临比墓之上就能掌握威权？此亦子平书之大谬也。',
    plain: '张楠直接质疑魁罡格：凭临比墓就能掌威权，是子平书的大错。本站把魁罡当神煞结构标注、不作贵权断语，正与这条质疑同向。',
  },
  {
    id: 'sf-zaji',
    quote: '杂气财官印月官，天干透露始为丰。财多官旺宜冲破，切忌干支压伏重。',
    plain: '杂气格的诀：月令所藏的财官印要透到天干才有用；财官旺时宜冲开库，最忌干支压伏。本站杂气取用按透干、会支两条走。',
  },
  {
    id: 'll-jianbujian',
    quote: '或见者，年月日时上天元也。或闻者，支内人元也。',
    plain: '注解把「见」解作四柱天干（天元）、「闻」解作地支所藏（人元），是天元／人元分层最早的清楚表述。本站通根透干说的是透出之干与支中藏干，祖本在此；原文并没有「通根」二字，不拿它冒充成句。',
  },
  {
    id: 'll-sizhugong',
    quote: '以四柱论之：本命、生月、生日、生时、四柱也。每一宫有三元，有天元、人元、支元。',
    plain: '注解给四柱定名，并说每宫各有天元、人元、支元三层。本站六亲按年月日时四宫分位，出处即此；原文的三元与本站的藏干表不是同一张表。',
  },
  {
    id: 'll-zheri',
    quote: '运行则一辰十岁，折除乃三日为年',
    plain: '大运一辰管十年、三日折一年的起运折算，赋文里已成句。本站起运用出生到下一节气的实际日数按三日一岁折算，同一套口径。',
  },
  {
    id: 'lt-geju',
    quote: '格者，取用于生月。何神为用以定其格局者，支辰见申子辰、亥卯未、巳酉丑者，谓之局者是也。',
    plain: '兰台妙选把「格」定为取用于生月，把「局」定为地支三合（申子辰、亥卯未、巳酉丑）。本站取格先专求月令、三合另作局论，分法与此一致。',
  },
  {
    id: 'lt-xiongsha',
    quote: '凶煞者，七煞、羊刃、伤官也。有制得地，反主荣贵。',
    plain: '凶煞指七杀、羊刃、伤官，有制且得地反而主荣贵——与滴天髓女命章把神煞贬为「虚好语」是两种立场。本站两处并引，只标结构、不主吉凶。',
  },
  // ── B10 第一批：引擎侧新增 12 条的原文与白话
  {
    id: 'yh-cangdun',
    quote: '子宫癸水在其中，丑癸辛金己土同，寅宫甲木兼丙戊，卯宫乙木独相逢',
    plain: '渊海子平的地支藏干歌：子藏癸、丑藏癸辛己、寅藏甲丙戊、卯藏乙。本站人元司令表与通根折算用的正是这套藏干，这里只取前四支作代表。',
  },
  {
    id: 'yh-dayun',
    quote: '凡起大运，俱从所生之日，阳男阴女顺行，数至未来节。阳女阴男逆行，数已过去节，但折除三日为一岁。',
    plain: '起运总则：阳男阴女从生日顺数到下一个节，阳女阴男逆数到上一个节，三日折一岁。本站 0.49.0 起运算到日/时用的就是「三日为一岁」这一折算，顺逆方向也照此。',
  },
  {
    id: 'yh-liuqin',
    quote: '生我者为父母，我生者为子孙，克我者为官鬼，我克者为妻财，比和者为兄弟。',
    plain: '十神配六亲在子平书里最早沿用六爻式叫法（父母／子孙／官鬼／妻财／兄弟），眉批才改注成印、伤官食神、官鬼七煞、妻财、比肩。本站六亲卡按财为妻、官杀为子等通行口径，这一条是它的早期源头。',
  },
  {
    id: 'yh-tianyi',
    quote: '甲戊兼牛羊，乙己鼠猴乡，丙丁猪鸡位，壬癸兔蛇藏，庚辛逢马虎，此是贵人方，命中如遇此，定作紫薇郎。',
    plain: '天乙贵人起例：甲戊见丑未、乙己见子申、丙丁见亥酉、壬癸见卯巳、庚辛见午寅；下文另说辰戌二宫贵人不临。本站神煞表按此诀标天乙，只作标注、不折吉凶。',
  },
  {
    id: 'dtcw-yueling',
    quote: '如寅月生人，立春后七日前，皆值戊土用事；八日后十四日前者，丙火用事；十五日后，甲木用事。',
    plain: '阐微本【原注】给寅月人元司令分日是 7／7／16（立春后七日戊土、八至十四日丙火、十五日后甲木）；三命通会本给的是 5／5／20，两本异文并列，不互相补字。本站 0.49.0 人元司权分日按 5／5／20 一系取，未采用这一本。',
  },
  {
    id: 'dtcw-tongguan',
    quote: '木土而要火，火金而要土，土水而要金，金木而要水，皆是牛郎织女之有情也。',
    plain: '通关【原注】逐组列出「木土要火、火金要土、土水要金、金木要水」——相战两行之间取能连通的那一行。本站通关判定按这个结构取唯一通关行并按分量分档；原注另说的「刑冲所间、岁运相逢」没有实现。',
  },
  {
    id: 'ydzp-zhengguan',
    quote: '正官者，阳遇阴克，如甲见辛、乙见庚之类。万物必相制而后成，官者，管也，治也。',
    plain: '正官定义：阳干见阴克、阴干见阳克（甲见辛、乙见庚），与偏官（阳见阳、阴见阴）相对。本站十神对照表按阴阳异类取正官，口径一致。',
  },
  {
    id: 'ydzp-chengbai',
    quote: '盖正官之所喜者有二：曰印，曰财；所忌者有二：曰杀，曰伤。',
    plain: '正官格喜印与财、忌杀与伤，一句给齐成败两边。本站格局成败卡按相战／救应给结构判定，这一条是「所喜所忌」的原始表述；同篇的「官多作杀」等变格未实现。',
  },
  {
    id: 'mlyy-geju',
    quote: '格局有正有变，正者五行之常理也。曰正官，曰偏官，曰印，曰财，曰食神，曰伤官。',
    plain: '陈素庵把格局分正变：正格六类（正官、偏官、印、财、食神、伤官），变格是从、化、一行得气、两神成象、暗冲、暗合。本站只实现正格与专旺／从／化气的一部分，暗冲暗合未做。',
  },
  {
    id: 'mlyy-wangshuai',
    quote: '如木在春月为旺，在惊蛰以后，谷雨以前，为尤旺，在秋月为弱，在白露后，霜降以前为尤弱。或党多援众，则秋木亦旺，势孤克众，则春木亦弱。',
    plain: '旺衰先看月令、再看党众：春木本旺但「势孤克众」也可弱，秋木本弱但「党多援众」也可旺。本站旺衰按分数加合会折根与虚透，正是「令＋党众」两条；折算比例与门槛是本仓取值，不是古籍定数。',
  },
  {
    id: 'mlyy-zaji',
    quote: '若令支所藏，或二神或三神，其取用之法，如甲生寅月，先论甲木，次论丙火戊土，或寅字损坏无气，则取丙戊',
    plain: '月令藏二神三神时的取用次序：先本气（甲生寅月先论甲木），本气受伤或所藏透干成像才取丙戊。本站杂气月取用走「透干 → 三合会支 → 本气」，优先透干，与此本「先本气」的次序相反——两说并列，不混作同源。',
  },
  {
    id: 'mlyy-congju',
    quote: '凡看日主无根，满柱皆官则当从官，满柱皆煞则当从煞，满柱皆财则当从财，满柱皆食则当从食，满柱皆伤则当从伤。若满柱皆印绶，则无从理',
    plain: '从局法：日主无根、满柱皆某神则从之；满柱皆印绶「无从理」，因印生助日主。本站从格卡只做从煞、从财两类（三命通会专章），从官／从食／从伤未做。',
  },
  // ── B10 第二批：引擎侧新增 19 条的原文与白话
  {
    id: 'qlmg-bage',
    quote: '八格者。正财格、偏财格、正官格、七杀格、正印格、偏印格、食神格、伤官格是也。',
    plain: '韦千里把格局先分成八格与外格两类，八格就是财官印食伤各分正偏。本站取格表用的正是这八个名目；歌诀式的外格（拱禄、飞天禄马等）不进实现。',
  },
  {
    id: 'qlmg-quge',
    quote: '（一）月支本气透於天干（如寅月透甲，卯月透乙，辰月透戊，巳月透丙，午月透丁，未月透己，申月透庚，酉月透辛，戌月秀戊，亥月透壬）。应先取以为格。',
    plain: '取格第一优先是月令本气透干，其次才是月令所藏余气透干。本仓 geju.js 的取格次序与此同；括号里「戌月秀戊」是底本错字（当作「透戊」），照录不改。',
  },
  {
    id: 'qlmg-pingduan',
    quote: '（一）看强弱。（二）定格局。（三）取用神。（四）论喜忌。（五）查岁运。（六）推六亲。（七）评性情。（八）断事业。',
    plain: '民国教材给的八步评断程序。本站解释顺序大体照这个骨架（强弱→格局→用神→喜忌→岁运→六亲），但「评性情」「断事业」没有独立判定层，不照着生成断语。',
  },
  {
    id: 'qlmg-qiangruo',
    quote: '论命以日干为主，称之曰身，身之强弱，关系最为紧要，故首论之。',
    plain: '日干为身、首判强弱，是子平系旺衰判定的起点。本站旺衰卡与用神取扶抑都建立在这一步上；本篇另列「得令／多帮扶／支得气」三项，本仓折算权重不完全照搬。',
  },
  {
    id: 'qlmg-renyuan',
    quote: '（一）最重：月支内之人元属月之本气者（例如申月之庚，庚与申皆属金，庚即为申中之本气），力量最重。',
    plain: '藏干力量分三级：月令本气最重、月令余气次重、年日时支所藏稍轻。本站通根折算按藏干与位置给权重，但只到「是否通根／根强弱」这一层，没有照搬这三级数值。',
  },
  {
    id: 'qlmg-liuqin',
    quote: '（一）父：男女命皆以生我之印为父。',
    plain: '韦千里「更定六亲」把父母都归印、女命以食伤为子，与三命通会／滴天髓一系「财为妻、官杀为子」的口径不同。本站六亲卡按通行口径，这里只并列异说，不替它们调和。',
  },
  {
    id: 'mlty-shunni',
    quote: '阳干顺行，阴干逆行。',
    plain: '十二长生表按阳干顺行、阴干逆行排。本站旺衰卡用这一系；《星命抉古录·五行生旺论》明斥此说「试之百不一验」（见 xmjg-yangsheng），两说并列，不调和。',
  },
  {
    id: 'mlty-yongshi',
    quote: '甲乙寅卯木，旺于春；丙丁巳午火，旺于夏；庚辛申酉金，旺于秋；壬癸亥子水，旺于冬；戊己辰戌丑未土，旺于四季。',
    plain: '五行用事的月令归属，本站月令司权与旺相休囚死表按这一套；同卷另引《神枢经》「土于四立之前各旺一十八日」，本仓人元司令分日按 5／5／20 一系，与此不同。',
  },
  {
    id: 'mlty-shensha',
    quote: '然凶煞有十之九，吉神仅十之一，其不适用可知。',
    plain: '袁树珊在补遗里算了一笔账：流年神煞古歌十二句，凶煞占九成，吉神一成，比例本身就不可用。与《滴天髓》女命章「虚好语」「半推详」并列，本站神煞卡据此不给神煞主吉凶背书。',
  },
  {
    id: 'wxjj-yinshou',
    quote: '以阳干生阴干、阴干生阳干，为正印，阳干生阳干，阴干生阴干，为偏印',
    plain: '《五行精纪》引《三命提要》：正偏印按「异性相生／同性相生」分。本站十神表正是这一口径，可与《御定子平》正官定义同挂十神对照卡。',
  },
  {
    id: 'wxjj-tiancai',
    quote: '甲乙人见戊己为财 丙丁人见庚辛为财',
    plain: '「我克者为财」的逐干对照，本站十神表用这一套正五行。同页另有纳音真财、生成财、子母财等多套古法，本仓一概不取。',
  },
  {
    id: 'wxjj-tianyi',
    quote: '天乙贵人者，十干之秀气在紫微宫门外，乃天皇大帝，其神为最贵，所至六害、一切凶杀，隐然而避',
    plain: '宋本把天乙贵人神格化并称能避诸凶，与《渊海子平》天乙贵人诀、《星命抉古录》「可信用者惟天乙耳」同挂神煞卡。本站只列名目、不采「凶杀隐然而避」的断验。',
  },
  {
    id: 'zhyy-tiaohou',
    quote: '《穷通宝鉴》一书被当代命界视为”调候”一书是有一定道理的，它论命的主要依据是落实立足于每月的实际气候与日主之间的关系。',
    plain: '注意这是近人评注的概括，不是《穷通宝鉴》原文。本仓 120 格按「日主＋月令」查表取用（附五），「实际气候优先于月令正五行」是评注者的解释框架，本站没有独立的气候层。',
  },
  {
    id: 'zpgj-zhengguan',
    quote: '正官只宜一位，则权专。喜见印绶，禀性忠良、英豪伟俊。',
    plain: '明·雷鸣夏论正官：一位为清、喜印、忌杀混与刑冲合多。本站格局成败按透干／清杂判，这一条是明代歌诀口径，与之并行而非取代。',
  },
  {
    id: 'zpgj-pianguan',
    quote: '身强有制服者为偏官，身弱无制伏者为七煞。',
    plain: '异说：这里按「有无制伏」区分偏官与七煞；本站按阴阳同性定七杀、异性定正官（与《五行精纪》十神表一系），是两套命名口径，并列不调和。',
  },
  {
    id: 'zpgj-zaqi',
    quote: '四库为杂气，值之者多主刑克六亲，难为妻子，再兼羊刃华盖同入，非僧即道之命',
    plain: '明人杂气格说，与《子平真诠》《命理约言》的杂气取用又不同（后者还与本仓「透干优先」次序相反）。本站只取四库藏干透出取用，不采刑克六亲、僧道这类断语。',
  },
  {
    id: 'xmjg-tianyi',
    quote: '贵人之名甚多，其可信用者惟天乙耳。',
    plain: '本书把众贵人收敛到天乙一个，与《渊海子平》天乙贵人诀、《五行精纪》天乙贵神同挂神煞卡。本站神煞卡只列名目、不判吉凶，正好不与其「可信用」的判断冲突。',
  },
  {
    id: 'xmjg-yangsheng',
    quote: '若阳生阴死，阴生阳死之说，后人解之词，不合于用，试之百不一验。',
    plain: '异说：本书明确反对阴干逆行，主张水土同宫、同长生（引《淮南子》壮／老为证）；本仓十二长生表按《命理探原》「阳干顺行，阴干逆行」（见 mlty-shunni）。两说并列，不替古籍统一口径。',
  },
  {
    id: 'xmjg-kongwang',
    quote: '凡凶神宜坐空亡，吉神忌坐空亡。',
    plain: '古法空亡喜忌，还分金火水命喜空、木土命忌空。本站空亡卡只按旬空标出空亡之支，不给吉凶断言，更不按纳音命分喜忌。',
  },
  // ── B11：引擎侧新增 15 条的原文与白话
  {
    id: 'rty-sike',
    quote: '干枝既布，即用十干寄宫法而取四课。',
    plain: '四课的起法：先布天地盘与日干支，再用十干寄宫取四课。与已录《六壬大全》卷一「十干寄宫」是同一层，本条给出「为何要先布干枝」的次第，接四课卡。',
  },
  {
    id: 'rzn-rushi',
    quote: '入式之法：甲课在寅乙课在辰，丙戊课在巳，丁己课在未，庚课在申，辛课在戌，壬课在亥，癸课在丑。',
    plain: '十干寄宫的完整口诀，并解释阳干居禄神、阴干居禄神前一位，且不居卯午酉子四正。与《六壬大全》卷一互证，接四课卡。',
  },
  {
    id: 'rzn-richen',
    quote: '六壬通万变之机，大为国而小为家。日辰定动静之位，日为人而辰为事。',
    plain: '日为人、辰为事，正是四课里「日上两课／辰上两课」的分工。接四课卡；注文另把干支扩到国与家、我与人，属后出引申，不混进定义。',
  },
  {
    id: 'rg-tigang',
    quote: '壬之有纲，犹裘之有领；振裘者必挈其领，言壬者当提其纲。维纲云何？曰四课也，用神也，三传也，天官也，八煞也，如斯而已。',
    plain: '《壬归》把四课列为壬学五纲之首，并强调「知四课而不知加临之变，不知四课者也」。本站只做四课，这条正好说明覆盖到哪一层、没覆盖哪几层，接四课卡。',
  },
  {
    id: 'bszz-liuqin',
    quote: '生我者为父母，我生者为子孙，克我者为官鬼，我克者为妻财，比合者为兄弟。',
    plain: '《卜筮正宗》启蒙节要给的六亲定义，与已挂卡的《火珠林》「六亲根源」是同一层。本站排六亲正是按卦宫五行与爻的生克关系，接用神卡。',
  },
  {
    id: 'bszz-yongshen',
    quote: '凡占功名、官府、雷电、鬼神、丈夫、夫之兄弟同辈及夫之相与朋友，乱臣、盗贼、邪祟、忧疑、病症、尸首、逆风，俱以官鬼爻为用神。',
    plain: '十八论第一条「用神分类定例」，把问事逐项映射到六亲。本站用神按问什么取什么（求财妻财、工作官鬼等），口径一致，接用神卡。',
  },
  {
    id: 'bszz-shiying',
    quote: '凡卦中世应二爻，世为自己，应作他人。',
    plain: '世应最简定义，与已挂卡的《火珠林》「世应相克」、京氏易传逐卦世位互补，接世应卡。',
  },
  {
    id: 'bszz-yuanshen',
    quote: '如用神旬空、月破、衰弱，或伏藏不现，得原神动来生之，或日辰月建作原神生之，必待用神出旬出破得令值日，所求必遂矣。',
    plain: '原神救衰弱用神、且要等出旬出破值日，这正是本站「用神衰」卡里「衰不等于没救」的层次，接该卡。',
  },
  {
    id: 'bszz-hechu',
    quote: '合处逢冲，谋虽成而终散；冲中逢合，事已散而复成。',
    plain: '十八论第十五条给出合冲互变的三类情形（六合变六冲、日月冲爻、动爻变冲）。本站六合／六冲卡讲卦体成散，此条讲合冲相转，两层并列不合并，同时挂两张卡。',
  },
  {
    id: 'bszz-pi-zs',
    quote: '何不以笤柄告圣阴阳为吉凶断？更捷径于此法也。',
    plain: '王维德专辟《增删卜易》「不必念卦书、只要用神持世即断吉凶」的十二篇秘法，讥其不如丢笤。本仓用神卡的另一处 refs 正是《增删卜易》用神章——反对意见照留，不替两书统一口径。',
  },
  {
    id: 'bszz-fushen',
    quote: '凡卦中用神不出现，查变爻有，不必寻伏神矣。',
    plain: '《卜筮正宗》的伏神次第：先看变爻，变爻没有才回本宫首卦找伏神。与已挂卡的《增删卜易》飞伏章同层，接伏神卡。',
  },
  {
    id: 'bszz-sanchuan',
    quote: '寡固不可敌众也，即如一爻生一爻克，又有自克，皆不宜也，何况三传助克乎？',
    plain: '十八问答第一问讲年月日「三传」同克用神时，一爻来生救不了。本站旺衰卡叠月建与日辰，此条给出多重力量的比较口径，接旺衰卡。',
  },
  {
    id: 'ylby-feifu',
    quote: '飞伏在二仪交换定然，阳伏阴而阴伏阳。',
    plain: '《易林补遗》总断的飞伏法：按八卦阴阳互换取伏卦（得乾取坤为伏等）。《卜筮正宗》第四篇正是点名批这几句、主张回本宫首卦取伏。两说并列，接伏神卡。',
  },
  {
    id: 'ylby-yongshen',
    quote: '若卦内有用神不居空陷，不必更取伏神，如六爻不见主象者却取伏神推之。',
    plain: '《易林补遗》自己也说用神现且不空就不必取伏神，与《卜筮正宗》「查变爻有，不必寻伏神」并不全冲突。接伏神卡，避免只把两书读成对立。',
  },
  {
    id: 'sxzy-shiying',
    quote: '世为己应为人，生合则吉，冲克则凶，比和可谋。',
    plain: '《筮学指要》世应段，与《卜筮正宗》「世为自己，应作他人」同层，并加出生合冲克的判法，接世应卡。',
  },
];

const TEXT_BY_ID = new Map(CITATION_TEXT.map((t) => [t.id, t]));

/** 引擎侧条目的完整视图：定位字段 + 原文/白话 */
/** 引擎侧条目的完整视图：定位字段 + 原文/白话（书名仍由引擎侧的 BOOK_OF 补） */
export function allEngineCitations() {
  return CITATIONS.map((c) => ({ ...(citationOf(c.id) || c), ...(TEXT_BY_ID.get(c.id) || {}) }));
}

/** 引擎侧 + 本文件 = 全库引文条目 */
/** 引擎侧条目漏配原文/白话的 id：正常必须是空表 */
export function engineTextGaps() {
  return CITATIONS.filter((c) => !TEXT_BY_ID.has(c.id)).map((c) => c.id);
}

/** 全库条目（引擎侧已用水合视图补回原文与白话） */
export const LIBRARY_CITATIONS = [...allEngineCitations(), ...FUWEN_CITATIONS.map(enrich)];

/** 按 id 解析引文：经典库、引擎侧（补回原文）、本文件，三处都查 */
export function citationOfAny(id) {
  return enrich(CLASSICS.find((c) => c.id === id) || LIBRARY_CITATIONS.find((c) => c.id === id));
}

/** 全库条目（含八字三书的 CLASSICS）：索引页与测试的计数口径 */
export function allLibraryCitations() {
  return [...CLASSICS.map(enrich), ...LIBRARY_CITATIONS];
}

// ── B7 格局成格原文索引 ─────────────────────────────────────
// 34 条格局里，31 条能在《紫微斗数全书》卷一赋文、卷三诸论里对上句子；
// 对不上的 3 条列在 PATTERN_CHENG_UNMATCHED 里写明为什么对不上，不拿相近的句子硬配。
// B8 起把卷一「定贵局／定富局／定贫贱局」的定义句并进来：它们是同书另一套口径（多要求同宫、
// 多加空亡与吉星条件），列为对读而不替换原有出处，差异一律写在 note 里。
// 每条的 note 只写一件事：原文的条件与本插件的判定条件差在哪（例如原文限「无杀凑」、
// 泛水桃花原文作「亥子」两宫、天罗地网原文论「限至」不论守命）。
export const PATTERN_CHENG_CITATIONS = {
  紫府同宫: { ids: ['zw-gusu-chaodou', 'zw-taiwei-zifu-sha'], note: '原文作「终身福厚」，另句谓紫府全依辅弼之功——本插件只判同宫，不看辅弼是否同会。' },
  紫府朝垣: { ids: ['zw-gusu-juri'], note: '原文「紫府朝垣食禄万钟」与本插件「三方四正会紫微、天府」同口径。' },
  君臣庆会: { ids: ['zw-taiwei-junchen', 'zw-fawei-junchen', 'zw-gaolv-ziwei-fubi', 'zm-dinggui-junchenqinghui'], note: '原文只说君臣同会、左右会于紫府，未定几颗算会；本插件取「三方四正见辅弼魁钺两颗以上」。定贵局另给一条严的：「紫微左右同守命」要三颗同坐命宫，本插件不要求同宫，两处口径并列不合并。' },
  极向离明: { ids: ['zw-gusu-ziweiwu'], note: '原文多一个前提「无杀凑」；本插件把煞星归到破格层判，不在成格条件里。' },
  七杀朝斗: { ids: ['zw-gusu-chaodou', 'zw-taiwei-zifu-sha'], note: '原文「爵禄荣昌」；本插件另句「专依羊铃之虐」正好是这一格要看煞曜的理由。' },
  石中隐玉: { ids: ['zw-gusu-shizhong', 'zw-shiyin'], note: '骨髓赋限子午两宫；诗曰另要求三方科禄照，本插件两条都作破格判据。' },
  巨日同宫: { ids: ['zw-gusu-juri', 'zw-gaolv-fuxing'], note: '「官封三代」是旧时措辞；本插件只判巨门太阳同宫与落宫。' },
  日月夹命: { ids: ['zw-gusu-jiaju', 'zm-dinggui-riyuejiaming'], note: '骨髓赋原文作「夹日夹月谁能遇」，未展开条件；本插件按前后两宫分居判。定贵局补了两条——不坐空亡、本宫还得有吉星——本插件这两条都没做，只在破格层看空亡与煞。' },
  日月对照: { ids: ['zw-taiwei-fanbei', 'zw-gusu-fanbei', 'zw-gaolv-yinfu'], note: '彀率「日月会不如合照」正是对照与同宫之分的出处；本插件按隔六宫对照判。' },
  左右夹命: { ids: ['zw-taiwei-jiaju', 'zw-gusu-jiaju'], note: '太微赋作「辅弼夹帝」，指夹紫微；骨髓赋夹局句列出贵禄权科日月昌曲空劫羊陀六类，未单列夹左右。本插件按「前后两宫夹命宫」判，与夹帝不同宫时两者并不同真。' },
  昌曲夹命: { ids: ['zw-gusu-jiaju', 'zw-zengbu-nannv'], note: '骨髓赋「夹昌夹曲主贵兮」与增补太微赋「昌曲夹墀」并列，墀即命前命后。' },
  魁钺夹命: { ids: ['zw-taiwei-junchen', 'zw-gusu-kuiyue-luma'], note: '原文作「魁钺同行，位居台辅」，说的是同行而非夹；本插件按夹局判，是取法的一步收窄。' },
  三奇嘉会: { ids: ['zw-gusu-sanqi'], note: '原文「科权禄拱」；本插件要求三方四正会齐禄权科三化，忌不在此列。' },
  双禄朝垣: { ids: ['zw-gusu-helu', 'zw-gusu-tianlu'], note: '「合禄拱禄」即禄存与化禄同会；本插件按三方四正并会见双禄。' },
  双禄交流: { ids: ['zw-gusu-helu'], note: '交流指禄存在本宫、化禄在对宫（或反），原文只统称合禄拱禄。' },
  府相朝垣: { ids: ['zw-gusu-fuxiang'], note: '原文「府相同来会命宫」，条件是会命宫而非同宫；本插件同此。' },
  禄马交驰: { ids: ['zw-taiwei-fanbei', 'zw-gusu-kuiyue-luma', 'zw-luma'], note: '太微赋「禄马最喜交驰」，诸星问答论定为禄存与天马同宫；本插件取后者。' },
  月朗天门: { ids: ['zw-gusu-riyue-men', 'zw-dedi-hai', 'zm-dinggui-yuelangtianmen'], note: '得地诀「亥宫最喜太阴逢」与骨髓赋「月朗天门进爵封侯」同一坐标、两处出处。定贵局这条本作「月落亥宫」，并注明「又名月朗天门」——两名同格，本插件按后一名。' },
  日出扶桑: { ids: ['zw-gusu-riyue-men', 'zm-dinggui-rifutang'], note: '原文作「日照雷门」（卯）；「扶桑」是后世通行格名，本插件取同一宫位条件。定贵局「日在卯守命是也，守官禄宫亦然」多放一个官禄宫，本插件只认守命。' },
  机月同梁: { ids: ['zw-gusu-jieyueliang', 'zw-zengbu-juliang', 'zw-gusu-jiliang', 'zw-jiyue'], note: '三处原文合看：寅申为喜、酉上化吉亦不荣，卷三另加「命在寅申方论」。' },
  武贪同行: { ids: ['zw-gusu-fanwei', 'zw-zengbu-qianyang'], note: '骨髓赋「先贫后富武贪同身命之宫」论先后，增补太微赋「威镇边夷」论权威；卷三另条定化忌则下格。' },
  命无正曜: { ids: ['zw-gusu-mingwuzhengyao'], note: '原文「夭折孤贫」措辞重；本插件只标命宫无正曜并列出对宫与三方主星。' },
  杀破狼: { ids: ['zw-gusu-jieyueliang', 'zw-taiwei-zifu-sha'], note: '原文「七杀破军宜出外」「专依羊铃之虐」；本插件按杀破狼三颗会于三方四正判结构，不作宜忌断。' },
  火贪铃贪: { ids: ['zw-gusu-juji', 'zw-huotan'], note: '骨髓赋只提铃贪，增补太微赋与太微赋另论火贪；本插件两颗并列，并要求贪狼同在三方四正。' },
  羊陀夹命: { ids: ['zw-gusu-jiaju', 'zw-taiwei-fanbei'], note: '骨髓赋「夹羊夹陀为乞丐」是本插件标「倾向不利」的原文依据。' },
  铃昌陀武: { ids: ['zw-gusu-lingchang'], note: '原文「限至投河」断得极重；本插件只标四星凑聚的结构，不作寿夭之断。' },
  命里逢空: { ids: ['zw-gusu-kong-jian', 'zw-gusu-jieyao', 'zm-dingpinjian-ju'], note: '两处皆不作吉断；本插件按命宫三方四正会地空地劫判。定贫贱局最接近的一条是「生不逢时：命坐空亡逢廉贞」，多一个廉贞条件，格名也不同，只作语义相邻的对读，不并格。' },
  马头带箭: { ids: ['zw-taiwei-matou', 'zw-gusu-kong-jian', 'zm-dinggui-matoudaijian'], note: '原文「镇卫边疆」与「非夭折则主刑伤」两种口径并存，本插件标倾向不利、不作贵贱断。定贵局此条作「马头带剑」，通行格名作「带箭」；那一行字面「是也不是居午格」连读歧义大，断句存疑，不据以改判定条件。' },
  天罗地网: { ids: ['zw-zengbu-tianluo'], note: '原文论「限至天罗地网」（大限），本插件判的是命宫在辰戌，层级不同。' },
  刑囚夹印: { ids: ['zw-taiwei-matou', 'zm-dinggui-xingqiujieyin'], note: '太微赋原文只四字格名，未展开条件；本插件按通行说法取「廉贞天相同守命宫于子午、擎羊同宫」。定贵局这条却是「天刑廉贞同临身命」——用的星不同（天刑非擎羊），两条不是同一格，此处不合并。' },
  泛水桃花: { ids: ['zw-taiwei-fanshui', 'zw-gaolv-fanshui'], note: '太微赋作「贪居亥子」、原文「犯水桃花」，彀率作「贪狼居子」「泛水桃花」；本插件取窄的一说，只判贪狼在子守命。' },
};

// 对不上单条原文的格局：不硬配，写清缺什么。
export const PATTERN_CHENG_UNMATCHED = {
  英星入庙: '卷一赋文与卷三诸论、定贵定富各局均未见「破军在子午」的成格句子，「英星」之名亦不见于本篇；此格名出自后世通行格局表。定富局「金灿光辉：太阳单守，命在午宫」同指午宫独座，但主星是太阳不是破军，不能拿来配这一格。',
  火铃夹命: '骨髓赋夹局一句只列贵、禄、权、科、日、月、昌、曲、空劫、羊陀，未列火铃；此格取的是后世「四煞夹命」的推广。',
  羊陀夹忌: '原文只作「夹羊夹陀为乞丐」；本插件的羊陀夹忌判的是化忌与禄存同宫（羊陀前后夹禄存），推论层在本仓，不在赋文。',
};

/** 格局 → 成格原文；配了的一定可解析，没配的带原因 */
export function patternChengCitations() {
  return Object.entries(PATTERN_CHENG_CITATIONS)
    .map(([name, rule]) => ({ name, citationIds: rule.ids, note: rule.note, citations: rule.ids.map(citationOfAny).filter(Boolean) }));
}

// ── B9 穷通宝鉴 120 格：已打包原文的可核验视图 ─────────────────
// engine/qiongtong.js 早就把 120 格的原文摘句打进浏览器（解析页「穷通宝鉴」节直接照录给用户），
// 但底本 tools/_qt2.json 没进版本库、引文库只挂着 1 条「五行总论」——等于运行时展示了
// 120 句无处可核的原文。这里不复制那些句子，只从 QT 现推一份索引视图：每格给章节号、链接、
// 用神顺序与摘句，由 test/citations.test.mjs 逐格对 fixture 校验，改表不改底本立刻红。
const QT_STEM_ELEMENT = { 甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土', 己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水' };

/** 穷通宝鉴 120 格 → 索引行（原文取自 engine/qiongtong.js，不另存一份） */
export function qiongtongCitations() {
  const cells = [];
  for (const stem of Object.keys(QT)) for (const branch of QT_BRANCHES) cells.push(qtOf(stem, branch));
  // 合章：一章覆盖多个月令（如「五、六月甲木」），此时章名不等于「某月某干」，标出来免得误读
  const perChapter = new Map();
  for (const c of cells) perChapter.set(c.chapter, (perChapter.get(c.chapter) || 0) + 1);
  return cells.map((c) => {
    const shared = perChapter.get(c.chapter) > 1;
    return {
      id: `qt-${c.stem}${c.branch}`,
      book: 'qiongtong',
      bookName: BOOK_OF.qiongtong.name,
      chapter: `第${String(c.chapter).padStart(3, '0')}章·${c.month}${c.stem}${QT_STEM_ELEMENT[c.stem]}${shared ? '（合章）' : ''}`,
      url: c.url,
      quote: c.quote,
      plain: `${c.label}：用神 ${c.yong.join('、')}（首取 ${c.primary}）。摘句依次提到 ${c.quoteStems.join('、') || '—'}。`,
      yong: c.yong,
      primary: c.primary,
      quoteStems: c.quoteStems,
      truncated: c.truncated,
      shared,
      note: c.note,
    };
  });
}
