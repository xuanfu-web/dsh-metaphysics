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
  daliuren: {
    name: '大六壬大全',
    author: '明·郭载騋校（四库全书本）',
    base: 'https://zh.wikisource.org/wiki/六壬大全',
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
  ditian: {
    name: '滴天髓',
    author: '明·京图（通行本）',
    base: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/',
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
  {
    id: 'dl-jigong',
    book: 'daliuren',
    chapter: '卷一·起例（十干寄宫）',
    quote: '甲课寅兮乙课辰，丙戊课巳不须论。丁己课未庚申上，辛戌壬亥是其真。癸课原来丑宫坐，分明不用四正神。',
    plain: '十干寄宫是四课起手：甲寄寅、乙寄辰、丙戊寄巳、丁己寄未、庚寄申、辛寄戌、壬寄亥、癸寄丑；丙戊、丁己各同宫，子午卯酉四个正位不寄。',
    url: 'https://zh.wikisource.org/wiki/六壬大全/1',
  },
  {
    id: 'dl-zeike',
    book: 'daliuren',
    chapter: '卷一·起例（贼克法）',
    quote: '取课先从下贼呼，如无下贼上克初。初传之上名中次，中上加临是末居。三传既定天盘将，此是入式法第一。',
    plain: '九宗门取初传先看下贼上，没有下贼再看上克下；初传定后，中传取初传所乘之神，末传再顺取一位，三传齐了才布天盘天将。',
    url: 'https://zh.wikisource.org/wiki/六壬大全/1',
  },
  {
    id: 'dl-yuejiang',
    book: 'daliuren',
    chapter: '卷二·神将释（月将）',
    quote: '逆布者谓之月将，其实即十二神也。',
    plain: '月将就是十二支神，按太阳过宫排：以登明为首逆布十二宫；起课时把月将加在占时上，顺布成天盘。',
    url: 'https://zh.wikisource.org/wiki/六壬大全/2',
  },
  {
    id: 'dt-yiqi-tonggen',
    book: 'ditian',
    chapter: '干支总论',
    quote: '天全一气，不可使地德莫之载。地全三物，不可使天道莫之容。',
    plain: '四柱天干同属一气，还得地支能承载它；地支所藏三干若不透到天干，也显不出用处——通根与透出是一件事的两面。',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153091.html',
    // 2026-11-01 复核：这一句是《子平真诠》论十干十二支注文里明确引作《滴天髓》的话，
    // 在滴天髓底本（干支总论）里能逐字对上，所以才是「通根透干」可核的原文。
    note: '《子平真诠》卷一论十干十二支注文引作《滴天髓》语，底本干支总论原文可核。',
  },
  // ── 滴天髓·下篇六亲论（2026-11-01 从底本逐字录入，同一页：153092.html）
  {
    id: 'dt-liuqin-fuqi',
    book: 'ditian',
    chapter: '六亲论·夫妻',
    quote: '夫妻因缘宿世来，喜神有意傍天财。',
    plain: '看夫妻，落点在「喜神」与「财星」的相对位置：财是妻星，喜神是能护住用神的那一位。配偶这件事，看的是财星有没有被喜神照到，不是看盘里有没有财。',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153092.html',
    // 底本此篇为韵语提纲，各家注解分歧很大；这里只录原文，不把某家注解当原文引用。
    note: '本句是六亲论的提纲韵语，正文各家用注解发挥，取义不一，故只作「有这一说」的原文凭据。',
  },
  {
    id: 'dt-liuqin-zinv',
    book: 'ditian',
    chapter: '六亲论·子女',
    quote: '子女根枝一世传，喜神看与杀相连。',
    plain: '子女星取官杀，但成不成器要看喜神与杀的关系：有杀无喜，是压力；有喜有杀，才谈得上传承。单见官杀不作吉断。',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153092.html',
  },
  {
    id: 'dt-liuqin-fumu',
    book: 'ditian',
    chapter: '六亲论·父母',
    quote: '父母或降与或替，岁月所关果非细。',
    plain: '父母看年月两柱：位置定了，还要看这两柱是「降」（受制）还是「替」（得代），差别不小。这是把六亲落到宫位上，而不是只看印星。',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153092.html',
  },
  {
    id: 'dt-nvming-shensha',
    book: 'ditian',
    chapter: '六亲论·女命章',
    quote: '论夫论子要安详，气静平和妇道章，三奇二德虚好语，咸池驿马半推详。',
    plain: '这句是古籍自己在批神煞：三奇、二德这类吉神被叫作「虚好语」（空口说好话），咸池（桃花）、驿马只能「半推详」（顶多参考一半）。反对滥用神煞不是今人的意见，原文里就有。',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153092.html',
    // 2026-11-01 录入：这句是本插件「神煞显示但不参与判断」最直接的原文依据，
    // 而且是《滴天髓》自己说的，比后人转述有力。注意「三奇二德」指三奇、天德月德一类吉神。
    note: '「三奇二德虚好语，咸池驿马半推详」是滴天髓原文对神煞的贬语，可直接支撑「神煞不主吉凶」。',
  },
  {
    id: 'dt-hezhi-fugui',
    book: 'ditian',
    chapter: '六亲论·何知章',
    quote: '何知其人富，财气通门户。何知其人贵，官星有理会。何知其人贫，财神反不真。何知其人贱，官星还不见。',
    plain: '富看财有没有「通门户」（财能流通到日主），贵看官星有没有「理会」（有制有化、有人承接）。反过来，贫是财星不真（有财而无用），贱是官星不见或不理。判词是四个可查的条件，不是形容词。',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153092.html',
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
  'bazi-geju-chengbai': { refs: ['zp-chengbai', 'dt-hezhi-fugui'] },
  'bazi-huagi-bianhua': { refs: ['zp-bianhua'] },
  'bazi-zaji-quyong': { refs: ['zp-zaji'] },
  'bazi-zhuanwang-yuanwen': { refs: ['smt-quzhi', 'smt-yanshang', 'smt-congge', 'smt-runxia', 'smt-jiasi'] },
  'bazi-congge-yuanwen': { refs: ['smt-congsha', 'smt-congcai'] },
  'bazi-tongguan': { refs: ['dt-tongguan'] },
  // ── 八字：通行说，暂未定位单一条文
  'bazi-tonggen-tougan': {
    refs: ['dt-yiqi-tonggen'],
    // 通行说法（「地支所藏之干，本静以待用…干以通根为美，支以透出为贵」）常被署成《滴天髓》，
    // 2026-11-01 核过：滴天髓底本与《子平真诠》沈孝瞻原文（论十干十二支）里都查不到这句，
    // 它出现在《子平真诠》评注本该章的注文（附支藏人元图、人元司令表之后的按语）。
    // 注文自身引的《滴天髓》「天全一气…」才是原本，故本卡只引可核的那句，注文只作说明不冒充原文。
    note: '通行说两句出自《子平真诠》卷一注文，非《滴天髓》正文；注文所引的滴天髓句见本条。',
  },
  'bazi-wangxiang': { refs: ['smt-wangxiang'] },
  // 神煞：三命通会条列名目，滴天髓女命章直接贬为「虚好语」「半推详」——两书合看才是全貌：
  // 神煞是有的，只是不主吉凶。只引三命通会会让人以为本插件在给神煞背书。
  'bazi-shensha': { refs: ['smt-shensha', 'dt-nvming-shensha'] },
  'bazi-tiaohou': { refs: ['qt-tiaohou'] },
  // 六亲：星宫同参，落点分别是夫妻（财与喜神）、子女（杀与喜神）、父母（年月宫位）
  'bazi-liuqin': { refs: ['smt-liuqin', 'dt-liuqin-fuqi', 'dt-liuqin-zinv', 'dt-liuqin-fumu'] },
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
  // 2026-11-01 复核：底本卷二·進神退神章第二十九原文「所喜者宜於化進，所忌者宜化退神」
  // 已经把喜忌落在进退上，可作本条依据；把「喜／忌」具体落到用神／忌神两档仍是本插件的引申（见知识卡 note）
  'liuyao-jintui-yong': { refs: ['zs-jintui'] },
  'liuyao-yingqi-exact': { status: 'todo', book: '增删卜易', chapter: '各門類應期總注章', reason: '逐条应期尚未实现，等 20+ 条有应验日期的卦例' },
  // ── 其他体系
  'meihua-tiyong': { refs: ['mh-tiyong'] },
  'daliuren-sike': { refs: ['dl-jigong', 'dl-zeike'] },
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
