// B6 引文索引：把「知识卡 → 书名 / 卷章 / 原文 / 链接」做成一张可核验的表。
//
// 两类来源：
//   ① CLASSICS（engine/classics.js）：八字三书，已有原文、卷章与典藏网链接；
//   ② CITATIONS（本文件）：紫微斗数全书，原文取自维基文库，链接到卷页。
//
// CARD_CITATIONS 给每张知识卡一个去处：
//   refs    已定位到可核验原文，测试会核验 quote 是否是来源正文的子串；
//   general 属于通行说 / 尚未定位到单一条文，明确标出why，不冒充原文；
//   todo    尚未实现或尚未录入。
// test/citations.test.mjs 会逐条检查，并把索引导出到 docs/citations.html。

import { CLASSICS, CLASSIC_BOOKS } from './classics.js';
import { KNOWLEDGE } from './interpret-knowledge.js';
import { PATTERN_BREAK_RULES } from './ziwei.js';

export const CITATION_BOOKS = {
  ziwei: {
    name: '紫微斗数全书',
    author: '宋·陈抟（传）',
    base: 'https://zh.wikisource.org/wiki/紫微斗數全書',
  },
  qiongtong: {
    name: '穷通宝鉴',
    author: '佚名',
    base: 'https://www.diancang.xyz/xuanxuewushu/qiongtongbaojian/',
  },
  qimen: {
    name: '奇门遁甲统宗',
    author: '旧题诸葛亮（传）',
    base: 'https://www.diancang.xyz/xuanxuewushu/qimendunjiatongzong/',
  },
  meihua: {
    name: '梅花易数',
    author: '宋·邵雍（传）',
    base: 'https://www.diancang.xyz/xuanxuewushu/meihuayishu/',
  },
  liuyao: {
    name: '增删卜易',
    author: '清·野鹤老人',
    base: 'https://zh.wikisource.org/wiki/增刪卜易',
  },
};

// 紫微原文条目：quote 按维基文库通行本照录，plain 是本站自撰白话。
export const CITATIONS = [
  {
    id: 'zw-poge-sanfang',
    book: 'ziwei',
    chapter: '卷三·谈星要论',
    quote: '及命宫星辰庙旺，三方有恶星守照破格。',
    plain: '命宫主星虽庙旺，三方四正见恶星也会破格。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-poge-ruge',
    book: 'ziwei',
    chapter: '卷三·论人命入格',
    quote: '若居陷地又加杀化忌，为下格之命，不以入格而论也。',
    plain: '星落陷地又见煞星、化忌，就不按入格来论。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-poge-huaxiong',
    book: 'ziwei',
    chapter: '卷三·论人命入格',
    quote: '又入格不化吉而化凶，只以本命吉凶多寡而断之。',
    plain: '入了格却化吉少、化凶多，只能按原局吉凶的多寡来断。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-shiyin',
    book: 'ziwei',
    chapter: '卷一·增补太微赋',
    quote: '巨门子午二宫逢，身命逢之必贵荣，更得三方科禄照，石中隐玉是丰隆。',
    plain: '巨门在子午守命，要三方有化科、化禄照会，石中隐玉才成格。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-jiju-poge',
    book: 'ziwei',
    chapter: '卷三·论诸星同垣各司所宜分别富贵贫贱夭寿',
    quote: '因甲禄到寅卯宫有擎羊破格耳。',
    plain: '巨机本可取贵，但擎羊落宫会把格局破掉。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-riyue-jia',
    book: 'ziwei',
    chapter: '卷三·论诸星同垣各司所宜分别富贵贫贱夭寿',
    quote: '加羊陀冲守，宜僧。',
    plain: '日月夹命再加羊陀冲守，吉意大减。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-changqu',
    book: 'ziwei',
    chapter: '卷三·论诸星同垣各司所宜分别富贵贫贱夭寿',
    quote: '昌曲陷宫凶杀破虚誉之隆  凶杀即羊陀空劫。',
    plain: '昌曲落陷再逢凶杀，名声易成虚誉；这里的凶杀指羊陀空劫。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-kuiyue',
    book: 'ziwei',
    chapter: '卷三·论诸星同垣各司所宜分别富贵贫贱夭寿',
    quote: '魁钺重逢杀凑痼疾尤多  杀乃羊铃空劫。',
    plain: '魁钺夹命再凑煞星，贵气减等；煞指羊铃空劫。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-jiyue',
    book: 'ziwei',
    chapter: '卷三·论诸星同垣各司所宜分别富贵贫贱夭寿',
    quote: '机月同梁作吏人  命在寅申方论，加吉不论，无吉无杀亦是平常人，凶杀空劫化忌为下格。',
    plain: '机月同梁要在寅申论；无吉无杀只是平常，逢凶杀空劫化忌则降为下格。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-tanwu',
    book: 'ziwei',
    chapter: '卷三·论诸星同垣各司所宜分别富贵贫贱夭寿',
    quote: '贪武申宫为下格  化忌方论。',
    plain: '武贪在申本可论格，但带化忌才作下格论。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-huotan',
    book: 'ziwei',
    chapter: '卷一·增补太微赋',
    quote: '火遇贪狼照命宫，封侯食禄是英雄，三方倘若无凶杀，到老应知福寿隆。',
    plain: '火贪照命本是贵格，前提是三方没有凶杀；见煞则破。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-luma',
    book: 'ziwei',
    chapter: '卷一·诸星问答论·问天马星所主若何',
    quote: '如与禄存同宫，谓之禄马交驰，又曰折鞭马',
    plain: '禄存与天马同宫才叫禄马交驰。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
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
    id: 'zw-sihua-ji',
    book: 'ziwei',
    chapter: '卷一·诸星问答论·问化忌星所主若何',
    quote: '如会紫府、昌曲、左右、科权禄，与忌同宫又兼四杀共处，即发财亦不佳，功名亦不成就。',
    plain: '吉星与化忌、四杀同处，即使发财也不好，功名难成。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-sihua-lu',
    book: 'ziwei',
    chapter: '卷一·诸星问答论·问化禄星所主若何',
    quote: '禄为福德之神。守身命官禄之位，科权相逢必作大臣之职。',
    plain: '化禄主福，与科权相会可论官职。',
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
  {
    id: 'zw-sanfang',
    book: 'ziwei',
    chapter: '卷三·谈星要论',
    quote: '三看迁移财帛官禄三方星辰刑冲克破。',
    plain: '第三步就看迁移、财帛、官禄这组三方有没有刑冲克破。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-shenming',
    book: 'ziwei',
    chapter: '卷三·谈星要论',
    quote: '看身安命禄马不落空亡天空截空最紧，旬空次之。',
    plain: '看身命先看禄马有没有落空亡、天空、截空。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-daxian',
    book: 'ziwei',
    chapter: '卷三·论大限十年祸福何如',
    quote: '如宫分星缠全吉庙旺得地，无擎羊陀罗火铃空劫者，主十年安静，人财全美。',
    plain: '大限宫吉星庙旺且不见羊陀火铃空劫，十年较安稳。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-miaowang',
    book: 'ziwei',
    chapter: '卷三·论诸星同垣各司所宜分别富贵贫贱夭寿',
    quote: '天机 庙子午 旺辰酉 陷丑未',
    plain: '天机的庙旺陷地：子午庙、辰酉旺、丑未陷。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-kongjie',
    book: 'ziwei',
    chapter: '卷一·诸星问答论·问天空地劫所主若何',
    quote: '二星守身命，遇吉则吉，遇凶则凶。如四杀冲照，轻者下贱，重者六畜之命。',
    plain: '空劫守身命，吉凶随会照而定；再逢四杀冲照则加重。',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  // ── B6 补录：三命通会 / 穷通宝鉴（原文取自中华典藏网页，逐字核验）
  {
    id: 'smt-wangxiang',
    book: 'sanming',
    chapter: '卷二·论五行旺相休囚死并寄',
    quote: '盛德乘时曰旺。如春木旺，旺则生火，火乃木之子，子乘父业，故火相；木用水生，生我者父母，今子嗣得时，登高明显赫之地，而生我者当知退矣，故水休。',
    plain: '当令得时叫旺；旺者所生为相，生旺者退为休。旺相休囚死是按四季轮转的相对状态，不是固定标签。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7531.html',
  },
  {
    id: 'smt-shensha',
    book: 'sanming',
    chapter: '卷三·总论诸神煞',
    quote: '神煞，古有百二十名，其说穿凿支离，造化恐不如是。',
    plain: '神煞名目古有百余种，说法穿凿支离；作者自己也说造化未必如此，神煞只能作旁证。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7572.html',
  },
  {
    id: 'smt-kongwang',
    book: 'sanming',
    chapter: '卷三·论空亡',
    quote: '故以甲旬尽处曰空亡，盖有是位而无禄，曰空；有支而无干，曰亡。',
    plain: '旬中十干配完还剩两支无干可配，有支无干叫亡；这一位没有禄叫空。空亡是按旬推出的虚位，不直接等于凶。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7563.html',
  },
  {
    id: 'smt-dayun-qiyun',
    book: 'sanming',
    chapter: '卷二·论大运',
    quote: '总十年之运气，凡三日有三十六时，乃见三百六十日为一岁之数；在一月之中有三百六十时，折除节气，算计三千六百日为一辰之十岁也。',
    plain: '起运的折算：三日折一年、一月折十年，按出生到节气的时间折出起运岁数；这是通行「三日折一年」的出处之一。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7536.html',
  },
  {
    id: 'smt-liuqin',
    book: 'sanming',
    chapter: '卷七·论六亲',
    quote: '有夫妇然后有父子，有父子然后有兄弟。六亲者，父母兄弟妻子也。',
    plain: '六亲指父母、兄弟、妻子；先有夫妇才有父子兄弟，取六亲以十干生克配出，再落到四柱宫位上看旺衰。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7693.html',
  },
  {
    id: 'smt-xingchong',
    book: 'sanming',
    chapter: '卷二·论三刑',
    quote: '《阴符经》曰：恩生于害，害生于恩；三刑生于二合，亦如六害生于六合之义。',
    plain: '三刑由三合与三会相叠而生，六害由六合而生：合里藏着刑害，所以见合不能只看合。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7548.html',
  },
  {
    id: 'qt-tiaohou',
    book: 'qiongtong',
    chapter: '五行总论',
    quote: '北方阴极而生寒，寒生水。南方阳极而生热，热生火。',
    plain: '五行由方位寒热燥湿而生：北寒生水、南热生火。调候就是先看命局寒暖燥湿，再取能调和的字。',
    url: 'https://www.diancang.xyz/xuanxuewushu/qiongtongbaojian/41024.html',
  },
  {
    id: 'qm-yinyang',
    book: 'qimen',
    chapter: '卷一·奇门秘诀总赋',
    quote: '阴阳二遁分顺逆，一气三元人莫测。五日都来换一元，接气超神为准的。',
    plain: '一年分阴阳两遁：冬至后顺布、夏至后逆布；一气分上中下三元、五日换一元，超神接气用来对齐节气与符头。取局法不同，同一时刻可能排出不同局数。',
    url: 'https://www.diancang.xyz/xuanxuewushu/qimendunjiatongzong/41068.html',
  },
  {
    id: 'qm-jixing',
    book: 'qimen',
    chapter: '卷十一·玄机赋（中）',
    quote: '六仪击刑真是凶，值符天乙遇亦穷。六仪非值终无吉，吉凶轻重义相同。此际切宜遁取吉，勿于此地想成功。子三戌二寅刑四，申八辰四午离中。戌刑在未寅在巽，巽有巳兮申缓从。',
    plain: '六仪落到与自身相刑的宫位叫击刑：甲子戊落三宫、甲戌己落二宫、甲申庚落八宫、甲辰壬落四宫、甲午辛落九宫；甲寅癸的寅刑巳、戌刑未也各有所指。击刑是宫位条件，说明这个符号使不上力，不直接等于事情必败。',
    url: 'https://www.diancang.xyz/xuanxuewushu/qimendunjiatongzong/41073.html',
  },
  {
    id: 'qm-rumu',
    book: 'qimen',
    chapter: '卷十一·玄机赋（中）',
    quote: '三奇入墓，闭塞不通，暗昧不振，诸事皆凶。乙阴木长生在午墓于戌，丙火长生在寅墓于戌，故乙丙到乾为墓。丁阴火长生在酉墓于丑，故丁到艮为墓。',
    plain: '按五行墓库判：乙木、丙火墓在戌（乾六宫），丁火墓在丑（艮八宫）。天盘三奇落到自己的墓宫即入墓，取象是收住、藏起来、事情压着不动；问收藏与了结时未必是坏事。',
    url: 'https://www.diancang.xyz/xuanxuewushu/qimendunjiatongzong/41073.html',
  },
  {
    id: 'qm-wangshuai',
    book: 'qimen',
    chapter: '卷三',
    quote: '旺相休囚：春木相火旺水废金囚土休，夏火相土旺木废水囚金休，秋金相水旺土废火囚木休，冬水相木旺金废土囚火休。',
    plain: '旺相休囚按季节五行轮转：当令者旺、被当令所生者相、生当令者休、克当令者囚、被当令所克者废（死）。门、星、天盘干各按自身五行对月令，得出当下力量强弱。',
    url: 'https://www.diancang.xyz/xuanxuewushu/qimendunjiatongzong/41070.html',
  },
  {
    id: 'qm-men-gong',
    book: 'qimen',
    chapter: '卷二',
    quote: '右八门最怕迫制，吉门有气益吉，无气减吉；凶门有气益凶，无气减凶。',
    plain: '八门怕被宫位迫制；吉门有气更吉、无气则减吉，凶门有气更凶、无气则减凶。旺衰只是加权，门与宫的生克要另算，两层并列、不互相替代。',
    url: 'https://www.diancang.xyz/xuanxuewushu/qimendunjiatongzong/41069.html',
  },
  {
    id: 'mh-tiyong',
    book: 'meihua',
    chapter: '卷二·体用生克',
    quote: '体用即动静之说。体为主，用为事。应用事体及比和，则吉；体生用及克体，则不吉。',
    plain: '体卦代表自己、主静；用卦代表所问之事、主动。用生体或体用比和为顺，体生用（泄气）与用克体为不顺；再看互卦、变卦与旺衰定轻重。',
    url: 'https://www.diancang.xyz/xuanxuewushu/meihuayishu/37734.html',
  },
  {
    id: 'zs-yongshen',
    book: 'liuyao',
    chapter: '卷一·用神章第八',
    quote: '父母爻：占父母卽以卦中之父母爻爲神。',
    plain: '六亲各有用神：问父母就以父母爻为用神，兄弟、妻财、子孙、官鬼也各按所问的人与事取爻。',
    url: 'https://zh.wikisource.org/wiki/增刪卜易/8',
  },
  {
    id: 'zs-fushen',
    book: 'liuyao',
    chapter: '卷二·飛伏神章第二十八',
    quote: '此卦寅木妻財在二爻﹐卽以此寅木伏於姤卦亥水之下﹐姤卦二爻之亥水卽爲飛神﹐寅木妻財卽爲伏神﹐亥水而生寅木﹐謂之飛來生伏得長生﹐此用神不現﹐尋得伏神而遇生扶有用﹐亦爲用神﹐便作吉斷﹐餘仿此。',
    plain: '用神不上卦时，到本宫首卦里找伏神：伏在下面的叫伏神，压在它上面的叫飞神。伏神得日月或飞神生扶，才算有用。',
    url: 'https://zh.wikisource.org/wiki/增刪卜易',
  },
  {
    id: 'zs-yuejian',
    book: 'liuyao',
    chapter: '卷一·月將章第十六',
    quote: '月將卽是月建又爲月令。掌一月之權，司三旬之令。',
    plain: '月建就是月令，掌一月的时令、管三旬的旺衰；它能扶起衰弱的爻，也能制住动爻与变爻。',
    url: 'https://zh.wikisource.org/wiki/增刪卜易/16',
  },
  {
    id: 'zs-yuejian-zhuli',
    book: 'liuyao',
    chapter: '卷一·月將章第十六',
    quote: '爻之衰弱者能生之合之、比之、拱之、扶之，衰而亦旺。',
    plain: '月建对衰弱的爻能生、合、比、拱、扶，衰的也可以转旺；反过来对强旺的爻能冲、克、刑、破，旺的也会转衰。',
    url: 'https://zh.wikisource.org/wiki/增刪卜易/16',
  },
  {
    id: 'zs-richen',
    book: 'liuyao',
    chapter: '卷一·日辰章第十七',
    quote: '日辰爲六爻之主宰，司四時之旺相。',
    plain: '日辰是六爻之主宰，四时都能当令，与月建同功；日冲旺相静爻为暗动，冲衰弱静爻为日破。',
    url: 'https://zh.wikisource.org/wiki/增刪卜易/17',
  },
  {
    id: 'zs-dongbian',
    book: 'liuyao',
    chapter: '卷一·動變生克沖合章第十五',
    quote: '卦有動爻，動而必變，夫變出之爻能生克沖合本位之動爻，不能生克他爻，而他爻與本位之動爻，亦不能生克變爻。',
    plain: '动爻变出的爻，只与本位动爻发生生克冲合，不直接作用于其他爻；其他爻也不直接生克这个变爻。',
    url: 'https://zh.wikisource.org/wiki/增刪卜易/15',
  },
  {
    id: 'zs-liushen',
    book: 'liuyao',
    chapter: '卷一·六神章第十八',
    quote: '諸書無不以靑龍爲吉，白虎爲凶。',
    plain: '旧籍多以青龙为吉、白虎为凶；本章随即用卦例说明六神只是取象的一层，不能只看它断吉凶。',
    url: 'https://zh.wikisource.org/wiki/增刪卜易/18',
  },
  {
    id: 'zs-liuhe',
    book: 'liuyao',
    chapter: '卷一·六合章第十九',
    quote: '子與丑合、寅與亥合、卯與戌合、辰與酉合、巳與申合，午與未合。',
    plain: '六合固定六对：子丑、寅亥、卯戌、辰酉、巳申、午未；静爻逢合叫合起，动爻逢合叫合绊。',
    url: 'https://zh.wikisource.org/wiki/增刪卜易/19',
  },
  {
    id: 'zs-liuchong',
    book: 'liuyao',
    chapter: '卷一·六沖章第二十',
    quote: '相沖之法有六。日月沖爻者一也，卦逢六沖二也，六合卦變六沖三也，沖變六沖四也。動爻變沖五也、爻與爻沖六也。',
    plain: '相冲分六种：日月冲爻、卦逢六冲、六合卦变六冲、冲变六冲、动爻变冲、爻与爻冲。冲主散，吉事不宜，凶事反而宜散。',
    url: 'https://zh.wikisource.org/wiki/增刪卜易/20',
  },
  {
    id: 'zs-fanyin',
    book: 'liuyao',
    chapter: '卷一·反伏章第二十五',
    quote: '內卦反伏，內則不安。外卦反伏，外則不寧。內外反伏者，內外不寧之象也。',
    plain: '内卦反伏主内不安，外卦反伏主外不宁，内外都反伏则内外不宁；取象是事情反复，成而败、败而成。',
    url: 'https://zh.wikisource.org/wiki/增刪卜易/25',
  },
  {
    id: 'zs-fuyin',
    book: 'liuyao',
    chapter: '卷一·反伏章第二十五',
    quote: '內卦動變伏吟，內則呻吟，外卦動變伏吟，外則憂鬱。',
    plain: '内卦动变伏吟主内呻吟，外卦动变伏吟主外忧郁；伏吟取停滞难伸，不像反吟那样带冲克。',
    url: 'https://zh.wikisource.org/wiki/增刪卜易/25',
  },
  {
    id: 'zs-jintui',
    book: 'liuyao',
    chapter: '卷二·進神退神章第二十九',
    quote: '進神退神者﹐爻之動而化也﹐化進化退﹐吉凶禍福有喜忌之分﹐所喜者宜於化進﹐所忌者宜化退神。',
    plain: '进神退神是动爻化出同五行的顺次之支：化进主向前，化退主退气；喜用的宜化进，所忌的宜化退。',
    url: 'https://zh.wikisource.org/wiki/增刪卜易',
  },
  {
    id: 'zs-yingqi',
    book: 'liuyao',
    chapter: '卷一·各門類應期總注章第又二十六',
    quote: '靜而逢值逢沖：如主事爻臨子水不動，後逢子日午日而應之，餘仿此。',
    plain: '应期先分动静：静爻在逢值或逢冲之日应，动爻在逢合或逢值之日应；其余按入墓、旬空、月破等逐条推。',
    url: 'https://zh.wikisource.org/wiki/增刪卜易/26又3',
  },
];

const BOOK_OF = {
  ...Object.fromEntries(Object.entries(CLASSIC_BOOKS).map(([k, v]) => [k, v])),
  ...CITATION_BOOKS,
};

export function citationOf(id) {
  const hit = CITATIONS.find((c) => c.id === id) || CLASSICS.find((c) => c.id === id);
  if (!hit) return null;
  const book = BOOK_OF[hit.book];
  return {
    ...hit,
    bookName: book ? book.name : hit.book,
    bookAuthor: book ? book.author : '',
  };
}

// 每张知识卡的去处。refs 为已定位原文；general / todo 必须写 reason，不冒充引文。
export const CARD_CITATIONS = {
  // ── 八字：已定位（子平真诠 / 滴天髓 / 三命通会）
  'bazi-yueling-siquan': { refs: ['smt-renyuan'] },
  'bazi-geju': { refs: ['zp-yongshen'] },
  'bazi-suiyun': { refs: ['smt-suiyun'] },
  'bazi-sanming-duizhao': { refs: ['zp-zhenguan', 'smt-guansha-liu'] },
  'bazi-geju-chengbai': { refs: ['zp-chengbai'] },
  'bazi-huagi-bianhua': { refs: ['zp-bianhua'] },
  'bazi-zaji-quyong': { refs: ['zp-zaji'] },
  'bazi-zhuanwang-yuanwen': { refs: ['smt-quzhi', 'smt-yanshang', 'smt-congge', 'smt-runxia', 'smt-jiasi'] },
  'bazi-congge-yuanwen': { refs: ['smt-congsha', 'smt-congcai'] },
  'bazi-tongguan': { refs: ['dt-tongguan'] },
  // ── 八字：通行说，暂未定位单一条文
  'bazi-tonggen-tougan': { status: 'general', book: '滴天髓', chapter: '通神论', reason: '原文为「天干得一比肩，不如得支中一墓库」一路的取象，未定位到单一整句' },
  'bazi-wangxiang': { refs: ['smt-wangxiang'] },
  'bazi-shensha': { refs: ['smt-shensha'] },
  'bazi-tiaohou': { refs: ['qt-tiaohou'] },
  'bazi-liuqin': { refs: ['smt-liuqin'] },
  'bazi-kongwang': { refs: ['smt-kongwang'] },
  'bazi-xingchong': { refs: ['smt-xingchong'] },
  'bazi-dayun-jiaoqi': { refs: ['smt-dayun-qiyun'] },
  // ── 紫微：已定位（紫微斗数全书）
  'ziwei-sanfang': { refs: ['zw-sanfang'] },
  'ziwei-sihua': { refs: ['zw-sihua-lu', 'zw-sihua-ji'] },
  'ziwei-miaowang': { refs: ['zw-miaowang'] },
  'ziwei-daxian': { refs: ['zw-daxian'] },
  'ziwei-shengong': { refs: ['zw-shenming'] },
  'ziwei-kongjie': { refs: ['zw-kongjie'] },
  'ziwei-poge': { refs: ['zw-poge-ruge', 'zw-poge-sanfang'] },
  // ── 紫微：飞星派读法不在《全书》原文内
  'ziwei-feixing': { status: 'general', book: '紫微斗数全书 / 飞星派', chapter: '四化篇', reason: '宫干飞化属飞星派传法，非《全书》单条原文' },
  'ziwei-sanfang-fei': { status: 'general', book: '紫微斗数全书 / 飞星派', chapter: '四化篇', reason: '三方四正同飞属飞星派读法，未定位到单条原文' },
  'ziwei-jichuanji': { status: 'general', book: '紫微斗数全书 / 飞星派', chapter: '四化篇', reason: '忌转忌串连属飞星派读法，未定位到单条原文' },
  // ── 六爻：增删卜易（维基文库本，繁体照录）
  'liuyao-yongshen': { refs: ['zs-yongshen'] },
  'liuyao-fushen': { refs: ['zs-fushen'] },
  'liuyao-wangshuai': { refs: ['zs-yuejian'] },
  'liuyao-yongshen-shuai': { refs: ['zs-richen'] },
  'liuyao-quanggu-shuai': { refs: ['zs-yuejian-zhuli'] },
  'liuyao-dongbian': { refs: ['zs-dongbian'] },
  'liuyao-liushen': { refs: ['zs-liushen'] },
  'liuyao-liuhe': { refs: ['zs-liuhe'] },
  'liuyao-liuchong': { refs: ['zs-liuchong'] },
  'liuyao-fanyin': { refs: ['zs-fanyin'] },
  'liuyao-fuyin': { refs: ['zs-fuyin'] },
  'liuyao-jintui': { refs: ['zs-jintui'] },
  'liuyao-yingqi': { refs: ['zs-yingqi'] },
  'liuyao-jintui-yong': { status: 'general', book: '增删卜易', chapter: '進神退神章、用神章', reason: '底本把进退落在「動而化」的吉凶喜忌与应期上，未见单列「用神化進／化退」条；按用神与忌神分档是本插件引申，不冒充原文' },
  'liuyao-yingqi-exact': { status: 'todo', book: '增删卜易', chapter: '各門類應期總注章', reason: '逐条应期尚未实现，等 20+ 条有应验日期的卦例' },
  // ── 其他体系
  'meihua-tiyong': { refs: ['mh-tiyong'] },
  'daliuren-sike': { status: 'general', book: '大六壬大全', chapter: '九宗门取传法', reason: '原文待录入；本环境无稳定可核验的公有领域章页' },
  'qimen-yinyang': { refs: ['qm-yinyang'] },
  'qimen-jixing': { refs: ['qm-jixing'] },
  'qimen-rumu': { refs: ['qm-rumu'] },
  'qimen-wangshuai': { refs: ['qm-wangshuai'] },
  'qimen-wangshuai-yong': { refs: ['qm-men-gong'] },
  'qimen-gan-shengke': { status: 'general', book: '奇门遁甲统宗', chapter: '卷十二·玄机赋（下）', reason: '底本有「奇仪与日干」生克条，未见单列「干与落宫」生克条；干宫取象为通行读法，不拿十神条文冒充' },
  'qimen-ganying': { status: 'general', book: '奇门十干应克 / 奇门遁甲元灵经', chapter: '通行 100 组表 / 卷二·天盘加地盘吉凶', reason: '100 组为通行表汇编，元灵经只存甲、乙、丙三组，非单条原文' },
  'tarot-orientation': { status: 'general', book: '韦特塔罗', chapter: '逆位读法', reason: '韦特体系无中文古籍原文，逆位读法属近代流派' },
};

export function allCitations() {
  return [...CLASSICS.map((c) => citationOf(c.id)), ...CITATIONS.map((c) => citationOf(c.id))];
}

/** 把知识卡的 source 补成「原 source + 可核验引文索引」；general/todo 不伪造原文 */
export function citationSourceOf(cardId, fallback = '') {
  const entry = CARD_CITATIONS[cardId];
  if (!entry) {
    return { source: fallback, citations: [], status: 'general', reason: '未建立引文索引' };
  }
  if (Array.isArray(entry.refs) && entry.refs.length) {
    const citations = entry.refs.map(citationOf).filter(Boolean);
    const index = citations.map((c) => `《${c.bookName}·${c.chapter}》${c.url}`).join('；');
    return { source: `${fallback}（原文索引：${index}）`, citations, status: 'verified' };
  }
  return {
    source: `${fallback}（${entry.status === 'todo' ? '待补原文' : '通行说，原文待补'}：${entry.book || ''}${entry.chapter ? `·${entry.chapter}` : ''}）`,
    citations: [],
    status: entry.status || 'general',
    reason: entry.reason || '',
  };
}

/** 破格规则的引文：给测试与报告页共用 */
export function patternCitations() {
  return Object.entries(PATTERN_BREAK_RULES)
    .filter(([, rule]) => Array.isArray(rule.citationIds) && rule.citationIds.length)
    .map(([name, rule]) => ({ name, citationIds: rule.citationIds, citations: rule.citationIds.map(citationOf).filter(Boolean) }));
}
