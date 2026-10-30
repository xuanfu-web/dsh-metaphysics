// 古籍原文库：《子平真诠》《滴天髓》《三命通会》里与「格局取用」「十神喜忌」「寒暖燥湿」直接相关的条目。
// 三命通会另收专旺五格与弃命从财/从煞七篇——这是三书里仅有的「专旺 / 从格」可整段照录的专章。
// 十神篇里正财、偏财分开立章，故两格各取本格一条；七杀没有单列专章，取卷五「官煞去留杂论」。
// 原文照录（公共版权：清·沈孝瞻《子平真诠》、明·京图《滴天髓》、明·万民英《三命通会》通行本），仅供文化研究与参考。
// 出处以中华典藏网在线本为准（逐条给 url），异文处不合并、不改写；plain 是本站自撰白话，不是原文。

export const CLASSIC_BOOKS = {
  ziping: { name: '子平真诠', author: '清·沈孝瞻', base: 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/' },
  ditian: { name: '滴天髓', author: '明·京图（通行本）', base: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/' },
  sanming: { name: '三命通会', author: '明·万民英', base: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/' },
};

export const CLASSICS = [
  {
    id: 'zp-yongshen',
    book: 'ziping',
    chapter: '八、论用神',
    scene: '用神',
    tags: [],
    quote: '八字用神，专求月令，以日干配月令地支，而生克不同，格局分焉。财官印食，此用神之善而顺用之者也；煞伤劫刃，用神之不善而逆用之者也。',
    plain: '用神从月令里找：财、官、印、食四吉神顺用（生之护之），煞、伤、劫、刃四凶神逆用（制之化之）。',
    url: 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/53628.html',
  },
  {
    id: 'zp-zhenguan',
    book: 'ziping',
    chapter: '三十一、论正官',
    scene: '格局',
    tags: ['正官'],
    quote: '以刑冲破害为忌，则以生之护之为喜矣。存其喜而去其忌则贵，而贵之中又有高低者，何也？',
    plain: '正官格最忌刑冲破害，喜财生官、印护官；去忌存喜才谈得上贵，贵的层次还要看财印是否并透、有无伤官七煞混杂。',
    url: 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/53651.html',
  },
  {
    id: 'zp-cai',
    book: 'ziping',
    chapter: '三十三、论财',
    scene: '格局',
    tags: ['财', '正财', '偏财'],
    quote: '财为我克，使用之物也，以能生官，所以为美。为财帛，为妻妾，为才能，为驿马，皆财类也。',
    plain: '财是我所克、能为我用之物，因能生官而美；它同时代表钱财、配偶、才能、走动，不只「钱」一项。',
    url: 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/53653.html',
  },
  {
    id: 'zp-yin',
    book: 'ziping',
    chapter: '三十五、论印绶',
    scene: '格局',
    tags: ['印'],
    quote: '印绶喜其生身，正偏同为美格，故财与印不分偏正，同为一格而论之。',
    plain: '印能生身，正印偏印都算美格，不分偏正而论；印格的关键在身印强弱与官杀、食伤、财的配合。',
    url: 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/53655.html',
  },
  {
    id: 'zp-shishen',
    book: 'ziping',
    chapter: '三十七、论食神',
    scene: '格局',
    tags: ['食神'],
    quote: '食神本属泄气，以其能生正财，所以喜之。故食神生财，美格也。财要有根，不必偏正叠出，如身强食旺而财透，大贵之格。',
    plain: '食神本是泄气，可贵在能生财；食神生财要财有根，身强、食旺、财透三者齐，格局才大。',
    url: 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/53657.html',
  },
  {
    id: 'zp-pianguan',
    book: 'ziping',
    chapter: '三十九、论偏官',
    scene: '格局',
    tags: ['七杀', '偏官'],
    quote: '煞以攻身，似非美物，百大贵之格，多存七煞。盖控制得宜，煞为我用，如大英雄大豪杰，似难驾驭，而处之有方，则惊天动地之功，忽焉而就。',
    plain: '七煞攻身，看着不美，但大贵之格多有七煞——能控制住就为我所用，像驾驭豪杰，处之有方就能成大事。',
    url: 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/53659.html',
  },
  {
    id: 'zp-shangguan',
    book: 'ziping',
    chapter: '四十一、论伤官',
    scene: '格局',
    tags: ['伤官'],
    quote: '伤官虽非吉神，实为秀气，故文人学士，多于伤官格内得之。而夏木见水，冬金见火，则又为秀之尤秀者也。',
    plain: '伤官不是吉神，却是秀气所在，文人多出伤官格；夏木得水、冬金得火，是秀气里更秀的两种。',
    url: 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/53661.html',
  },
  {
    id: 'zp-yangren',
    book: 'ziping',
    chapter: '四十三、论阳刃',
    scene: '格局',
    tags: ['劫财', '阳刃'],
    quote: '阳刃者，劫我正财之神，乃正财之七煞也。禄前一位，惟五阳有之，故为阳刃。不曰劫而曰刃，劫之甚也。刃宜伏制，官煞皆宜，财印相随，尤为贵显。',
    plain: '阳刃是劫财之极（只有五阳干有），宜用官煞制伏；财印相随而不相碍，格局更显。',
    url: 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/53663.html',
  },
  {
    id: 'zp-lujie',
    book: 'ziping',
    chapter: '四十五、论建禄月劫',
    scene: '格局',
    tags: ['比肩', '建禄', '月劫'],
    quote: '故建禄与月劫，可同一格，不必加分，皆以透干支，别取财官煞食为用。',
    plain: '建禄、月劫同看一格，月令本身不算用神，要另看透出的财官煞食取用。',
    url: 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/53665.html',
  },
  {
    id: 'zp-qihou',
    book: 'ziping',
    chapter: '十四、论用神配气候得失',
    scene: '调候',
    tags: [],
    quote: '论命惟以月令用神为主，然亦须配气候而互参之。譬如英雄豪杰，生得其时，自然事半功倍；遭时不顺，虽有奇才，成功不易。',
    plain: '月令用神为主，但必须配气候参看；同样的格局，生在得时的气候里事半功倍，逆着气候就费劲。',
    url: 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/53634.html',
  },
  {
    id: 'zp-chengbai',
    book: 'ziping',
    chapter: '九、论用神成败救应',
    scene: '格局',
    tags: [],
    quote: '成中有败，必是带忌；败中有成，全凭救应。',
    plain: '成格不等于一路顺：成中带忌（官逢财又逢伤、官被合之类）就打了折；败格也未必无救——印来解伤、合来清煞，败中还能转成。',
    url: 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/53629.html',
  },
  {
    id: 'zp-zaji',
    book: 'ziping',
    chapter: '十六、论杂气如何取用',
    scene: '用神',
    tags: [],
    quote: '何谓透干？如甲生辰月，透戊则用偏财，透癸则用正印，透乙则用月劫是也。何谓会支？如甲生辰月，逢申与子会局，则用水印是也。一透则一用，兼透则兼用，透而又会，则透与会并用。',
    plain: '四墓（辰戌丑未）所藏不止一气，所以叫杂气：取用先看哪一藏干透到天干，透一个用一个；没有透干，再看地支有没有与月支会成三合局，会成什么局就取局中那一气。透干与会支同时成立时两样并用。原文对「兼透」只给原则，没有给取舍次序。',
    url: 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/53636.html',
  },
  {
    id: 'zp-bianhua',
    book: 'ziping',
    chapter: '十、论用神变化',
    scene: '格局',
    tags: [],
    quote: '故若丁生亥月，本为正官，支全卯未，则化为印。己生申月，本属伤官。藏庚透壬，则化为财。凡此之类皆用神之变化也。',
    plain: '用神本从月令取，但月令藏干不一：丁生亥月本为正官，支会卯未就化为印；己生申月本属伤官，庚藏壬透就化为财。起点相同，合化一变，取用也跟着变（原文只说变化之由，不断定某盘必化）。',
    url: 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/53630.html',
  },
  {
    id: 'dt-hannuan',
    book: 'ditian',
    chapter: '通神论·寒暖',
    scene: '调候',
    tags: [],
    quote: '天道有寒暖，生育万物，人道行之，不可过也。',
    plain: '天有寒暖才能生养万物，人命里寒暖也不能过——过寒过热都要调。',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153091.html',
  },
  {
    id: 'dt-zaoshi',
    book: 'ditian',
    chapter: '通神论·燥湿',
    scene: '调候',
    tags: [],
    quote: '地道有燥湿，生成品汇，人道得之，不可偏也。',
    plain: '地有燥湿才有品类生成，人命得燥湿之气也不能偏。',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153091.html',
  },
  {
    id: 'dt-shuaiwang',
    book: 'ditian',
    chapter: '通神论·衰旺',
    scene: '调候',
    tags: [],
    quote: '能知旺衰之真机，其于三命之奥，思过半矣。',
    plain: '真正看懂旺衰的机关，命理之奥就过了一半——旺衰不是数个数，要看真机。',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153091.html',
  },
  {
    id: 'dt-zhonghe',
    book: 'ditian',
    chapter: '通神论·中和',
    scene: '调候',
    tags: [],
    quote: '既识中和之正理，而于五行之妙，有全能焉。',
    plain: '懂得中和的道理，五行的妙处就都在其中了。',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153091.html',
  },
  {
    id: 'dt-guansha',
    book: 'ditian',
    chapter: '通神论·官杀',
    scene: '十神',
    tags: ['正官', '七杀'],
    quote: '官杀混杂来问我，有可有不可。',
    plain: '官杀混杂不是一律不好，要看能不能去留取清。',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153091.html',
  },
  {
    id: 'dt-shangguan',
    book: 'ditian',
    chapter: '通神论·伤官',
    scene: '十神',
    tags: ['伤官'],
    quote: '伤官见官最难辨，可见不可见。',
    plain: '伤官见官是最难分辨的一条：有的能见，有的不能见，不能一句「伤官见官为祸百端」了事。',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153091.html',
  },
  {
    id: 'dt-yueling',
    book: 'ditian',
    chapter: '通神论·月令',
    scene: '用神',
    tags: [],
    quote: '月令乃提纲之府，譬之宅也，人元为用事之神，宅之定向也，不可以不卜。',
    plain: '月令像宅子，藏干是用事之神，像宅子的朝向，必须细看。',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153091.html',
  },
  {
    id: 'dt-tiyong',
    book: 'ditian',
    chapter: '通神论·体用',
    scene: '用神',
    tags: [],
    quote: '道有体用，不可以一端论也，要在扶之抑之得其宜。',
    plain: '体用不能只看一头，关键是扶抑得宜。',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153091.html',
  },
  {
    id: 'dt-jingshen',
    book: 'ditian',
    chapter: '通神论·精神',
    scene: '用神',
    tags: [],
    quote: '人有精神，不可以一偏求也，要在损之益之得其中。',
    plain: '看精神不能偏执一端，要在损益之间求其中。',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153091.html',
  },
  {
    id: 'dt-tongguan',
    book: 'ditian',
    chapter: '通神论·通关',
    scene: '用神',
    tags: [],
    quote: '关内有织女，关外有牛郎，此关若通也，相邀入洞房。',
    plain: '两股力隔着一道关相望：一边织女、一边牛郎，中间若有一行能把两边接上（一方生它、它再生另一方），对峙就化成相生。原文只给取象，哪一行为关要按五行生克定。',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153091.html',
  },
  // —— 三命通会（明·万民英）：同一组十神，子平真诠说「怎么用」，三命通会说「怎么取、怕什么」。
  // 两书并列取用，按同一 tag 各取一条对照读，不合并、不裁定谁对。
  {
    id: 'smt-zhenguan',
    book: 'sanming',
    chapter: '卷五·论正官',
    scene: '格局',
    tags: ['正官'],
    quote: '正官者，乃甲见辛、乙见庚之例。阴阳配合，相制有用，成其道也。故正官为六格之首，止许一位，多则不宜。',
    plain: '正官取「克我而阴阳相配」，有制而能成用；六格以正官居首，只宜一位，多见就杂。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7582.html',
  },
  {
    id: 'smt-zhengcai',
    book: 'sanming',
    chapter: '卷六·论正财',
    scene: '格局',
    tags: ['财', '正财'],
    quote: '正财者，乃甲见己、乙见戊之例。受我克制，为我之妻，譬人娶妻，妻赍财嫁我，我必精神康强，而后可享用，若衰微不振，虽妻财丰厚，但能目视，终不得用。',
    plain: '正财是我克制之物，古人以「娶妻带财」作比：自身精神康强才受用得起，身弱不振，财再厚也只是看着。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7645.html',
  },
  {
    id: 'smt-piancai',
    book: 'sanming',
    chapter: '卷六·论偏财',
    scene: '格局',
    tags: ['财', '偏财'],
    quote: '何谓偏财？乃甲见戊、乙见己之例。非妻所带，乃众人之财也。切忌有姊妹兄弟分夺，柱无官星，祸患百出。',
    plain: '偏财取「我克而阴阳不同」：不是妻家带来的私财，而是众人之财，宜流通不宜独占。原文最忌比肩劫财来分夺，又说柱中无官星则多事（旧说的重话照录，本插件只记原文、不作断语）。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7650.html',
  },
  {
    id: 'smt-yinshou',
    book: 'sanming',
    chapter: '卷六·论印绶',
    scene: '格局',
    tags: ['印'],
    quote: '印绶者，乃五行生我之名。如甲乙在亥子月，丙丁在寅卯月之类，乃我气之源，为生气，为父母，能护我官星，使无伤克',
    plain: '印是生我之气，像源头与父母：它能护住官星，使官不受伤克；反过来说，印重就怕财来破。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7655.html',
  },
  {
    id: 'smt-shishen',
    book: 'sanming',
    chapter: '卷六·论食神',
    scene: '格局',
    tags: ['食神'],
    quote: '凡命遇财煞之地，食神旺相，煞被食制，不敢为祸，财被食生，充裕不竭，故食神一名寿星，一名爵星，良有以也。',
    plain: '食神旺，一头制煞、一头生财：煞被制住不敢为祸，财被生起不至枯竭；所以食神又叫寿星、爵星。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7663.html',
  },
  {
    id: 'smt-shangguan',
    book: 'sanming',
    chapter: '卷六·论伤官',
    scene: '格局',
    tags: ['伤官'],
    quote: '伤官虽凶，乃我所生，自家之物，伤尽则能生财，财旺则能生官，造化展转有情。',
    plain: '伤官虽称凶，却是我自己生出来的：伤尽（柱中不见官星）反能生财，财旺再生官，辗转还是有情。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7662.html',
  },
  {
    id: 'smt-yangren',
    book: 'sanming',
    chapter: '卷六·论阳刃',
    scene: '格局',
    tags: ['阳刃', '劫财'],
    quote: '阳者，阴阳之阳，刃者，刀刃之刃，即禄前一位，言旺越其分，故险。',
    plain: '阳刃指禄前一位，旺过了本分，所以险；甲丙戊庚壬五阳干才有刃，阴干见伤官同论。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7671.html',
  },
  {
    id: 'smt-jianlu',
    book: 'sanming',
    chapter: '卷六·论建禄',
    scene: '格局',
    tags: ['建禄', '比肩', '月劫'],
    quote: '凡命月令建禄，难招祖业，必主平生见财不聚，却病少寿长，行运再见比肩，克妻妨父损子',
    plain: '月令建禄是日主临官之地，身旺而财官难取：古说难承祖业、见财不聚，但病少寿长；再走比肩运，古书说克妻妨父损子（属于旧说的重话，本插件只记原文、不作断语）。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7672.html',
  },
  // 此本三命通会没有单列的「论偏官」章，七煞与正官混见的情形收在卷五「官煞去留杂论」；
  // 七杀格的三命对照取这一篇，章名照录，不改写成「论偏官」。
  {
    id: 'smt-guansha-liu',
    book: 'sanming',
    chapter: '卷五·官煞去留杂论',
    scene: '格局',
    tags: ['七杀', '偏官'],
    quote: '凡看去留，要详柱中官煞孰重孰轻，天干透者易去，月支所藏者难去，须伤官食神去官煞之物众而有力，方才去得。',
    plain: '官煞混见时先比谁重谁轻：天干透出的容易去，月支藏着的难去；用来去官煞的伤官食神要成众、有根有力，才真去得掉。七杀格遇正官混杂，就按这一篇看取舍。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7599.html',
  },
  // —— 三命通会 · 专旺五格与弃命从格：单章原文，专供「专旺格 / 从格」直接在结果里读。
  // 原文的条件比「身强」二字细：要局全、要带印或带火炼金、要防冲刑死绝。照录不分拆。
  {
    id: 'smt-quzhi',
    book: 'sanming',
    chapter: '卷六·曲直',
    scene: '格局',
    tags: ['曲直格', '专旺'],
    quote: '甲乙日得亥卯未局，柱中须有亥字带印为入格，若无亥有卯，止是木之本气，却要见金土为贵，既无亥字，又无金土，则木不秀不实，难以言贵。',
    plain: '曲直格要木局成方（亥卯未）且带亥字为印，才算入格；只有卯、没有亥，只是木的本气，得另见金土才谈得上贵；两样都没有，木虽旺而无成，难称贵格。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7630.html',
  },
  {
    id: 'smt-yanshang',
    book: 'sanming',
    chapter: '卷六·炎上',
    scene: '格局',
    tags: ['炎上格', '专旺'],
    quote: '丙丁日遇寅午戌局，柱中须有寅字带印为入格，无寅止是九流近贵之命，若火自旺，无亥水相济，不贵。喜东北方运，忌见辰丑戊己，晦火光明，多主眼疾，或患风气，柱有木制成贵，忌水金乡，怕冲。',
    plain: '炎上格要火局成方（寅午戌）且带寅字为印才入格；无寅只是偏贵的命。火自旺还要一点水相济，过燥不贵；行运喜东北、忌湿土晦火，也怕冲。原文另带「多主眼疾」一句，属于旧说，本插件只记原文、不作健康判断。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7631.html',
  },
  {
    id: 'smt-congge',
    book: 'sanming',
    chapter: '卷六·从革',
    scene: '格局',
    tags: ['从革格', '专旺'],
    quote: '庚辛日见巳酉丑局，须带丙丁巳午一二位方成其器，但不可火多。如辛巳、辛酉、辛丑三日不喜五月生，被火所伤，宜八月或水土养育食神印绶为吉。',
    plain: '从革格是金局成方（巳酉丑），但金要火炼才成器：须带丙丁或巳午一二位，火又不能多。辛巳、辛酉、辛丑三日出身在五月（火旺）被伤，原文说宜八月或水土养育。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7632.html',
  },
  {
    id: 'smt-runxia',
    book: 'sanming',
    chapter: '卷六·润下',
    scene: '格局',
    tags: ['润下格', '专旺'],
    quote: '壬癸日见申子辰全，忌引卯巳死绝之地，三刑四冲之乡，死绝则不流，冲刑则横流，岁运同。或曰水太泛须柱有土神一两位制之，得成堤岸，既有土怕会木为凶，如有木伤土要金印救解，终是一生成败。',
    plain: '润下格是水局三合全（申子辰），最忌卯巳死绝与三刑四冲：死绝水不流，冲刑水横流，行运也一样看。水太泛要一两位土作堤，有土又怕木来破堤，木伤土再用金印解救——原文把成败条件摊开讲。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7633.html',
  },
  {
    id: 'smt-jiasi',
    book: 'sanming',
    chapter: '卷六·稼穑',
    scene: '格局',
    tags: ['稼穑格', '专旺'],
    quote: '赋云：戊己忻逢四季，乃为稼穑之名。是戊己生逢季月，喜见木为官，止得一木为妙，木多则土虚，主虚诈为破家不仁之人。',
    plain: '稼穑格取戊己生于四季月（辰戌丑未）。原文说喜见一木为官，木多则土虚；后半对木多之人的评语是旧说的重话，本插件只照录条件、不拿来评价人。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7634.html',
  },
  {
    id: 'smt-congsha',
    book: 'sanming',
    chapter: '卷五·弃命从煞',
    scene: '格局',
    tags: ['从杀格'],
    quote: '《独步》云：弃命从煞，须要会煞从财，忌煞从煞。盖言从煞格，以煞神太重，身无所归，不得已从之，要行煞旺及财乡，四柱无一点比肩印绶方论，如遇运扶身旺，与煞为敌，从煞不专，故为祸患。',
    plain: '从煞格是煞太重、日主无所归才「弃命」相从：条件是四柱没有一点比肩印绶扶身，行运喜煞旺与财乡；一旦走扶身之运，与煞为敌，就从得不专。本插件只作结构说明，不据此断寿夭。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7598.html',
  },
  {
    id: 'smt-congcai',
    book: 'sanming',
    chapter: '卷六·弃命从财',
    scene: '格局',
    tags: ['从财格'],
    quote: '《独步》云：弃命从财，须要会财，若逢根气，命损无猜。假如丁生酉月，柱多庚辛，日干无气，只得弃命相从，运入北方财官旺地，乃为入格，南行灾。',
    plain: '从财格要财会成局、日干无气；一见根气就破格，原文用「命损无猜」这种重话写明。以丁生酉月、柱多庚辛为例：只能弃命相从，行北方财官旺地为入格，南行则灾。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7652.html',
  },
  // —— 三命通会 · 总论岁运：岁运提示一节的原文出处。
  // 原文的「返吟 / 伏吟」按「岁运与日柱相对 / 岁运压日」说，与本插件「干支相同为伏吟、天克地冲为反吟」
  // 不是同一套定义；口径照本插件，原文照录不改写，两者在 plain 里并列说明。
  // 这一条不进五条上限的取条表：它只在盘面有岁运信号时随「岁运提示」一起出现。
  {
    id: 'smt-suiyun',
    book: 'sanming',
    chapter: '卷二·总论岁运',
    scene: '岁运',
    tags: [],
    quote: '行运以生月为运元，最怕行运与太岁冲克，若岁运冲月必祸；若岁运与日相对，谓之返吟，岁运压日，谓之伏吟，二者不利六亲，非横破财，不为吉兆。',
    plain: '大运以生月为起点，最怕与流年（太岁）冲克：原文说岁运冲月为祸，又把「岁运与日柱相对」叫返吟、「岁运压日」叫伏吟。这两句是按「对日柱」说的，与本插件「干支相同为伏吟、天克地冲为反吟」不是同一套定义（本插件取后者）；末句「不利六亲、破财」是旧说的重话，只作变动提示，不作断语。',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7539.html',
  },
];

const BY_ID = CLASSICS.reduce((m, e) => { m[e.id] = e; return m; }, {});

// 格局名 → tags 键（本引擎的格局名都带「格」）
const GEJU_KEY = {
  正官格: '正官',
  七杀格: '七杀',
  偏官格: '偏官',
  正财格: '正财',
  偏财格: '偏财',
  正印格: '印',
  偏印格: '印',
  食神格: '食神',
  伤官格: '伤官',
  阳刃格: '阳刃',
  月劫格: '月劫',
  建禄格: '建禄',
};

// 特殊结构 → 三命通会单章：专旺五格与弃命从财/从煞。
// 从儿（食伤）、从强（印/比劫）三书里没有可整段照录的专章，故不登记、不硬凑。
const SPECIAL_CLASSIC = {
  曲直格: 'smt-quzhi',
  炎上格: 'smt-yanshang',
  从革格: 'smt-congge',
  润下格: 'smt-runxia',
  稼穑格: 'smt-jiasi',
  从财格: 'smt-congcai',
  从杀格: 'smt-congsha',
};

export function classicOf(id) {
  return BY_ID[id] || null;
}

// 岁运提示的原文：盘面出现岁运并临 / 运年反吟 / 流年伏吟反吟时随该节给出，不占五条上限。
// 没有信号就不给——这段原文讲的正是冲克，没冲没克时挂出来只会误导。
export function suiyunClassicOf(r) {
  const liunian = r && Array.isArray(r.liunian) ? r.liunian : [];
  const hit = liunian.some((l) => l && l.suiyun && Array.isArray(l.suiyun.signals) && l.suiyun.signals.length);
  return hit ? classicOf('smt-suiyun') : null;
}

function tagOf(gejuName) {
  const name = String(gejuName || '');
  if (GEJU_KEY[name]) return GEJU_KEY[name];
  const bare = name.replace(/格$/, '');
  return GEJU_KEY[bare + '格'] || bare;
}

// 同一 tag 各书取一条：子平真诠在前（讲怎么用），三命通会紧随作对照（讲怎么取、怕什么）
function pick(tag, book) {
  return CLASSICS.find((e) => e.scene === '格局' && e.tags.includes(tag) && (!book || e.book === book)) || null;
}

// 章节名去掉卷次/序号与开头的「论」，避免 why 里拼成「论论财」
function chapterTitle(e) {
  return e.chapter.replace(/^.*[、·]/, '').replace(/^论/, '');
}

// 根据一张八字结果挑原文：特殊结构（专旺/从格）先取单章，再月令格（子平真诠 + 三命通会对照），
// 再调候（寒暖/燥湿），最后「用神总纲」一位按盘四选一：有化气格取论用神变化、辰戌丑未月取论杂气如何取用、
// 见组合取论用神成败救应、其余取通用总纲；去重、限量。
export function classicsFor(r, limit = 5) {
  if (!r) return [];
  const out = [];
  const seen = new Set();
  const push = (entry, why) => {
    if (!entry || seen.has(entry.id) || out.length >= limit) return;
    seen.add(entry.id);
    out.push({ ...entry, why });
  };
  const gejuList = Array.isArray(r.geju) ? r.geju : (r.frame && Array.isArray(r.frame.geju) ? r.frame.geju : []);
  // 专旺或从格是这张盘的定义性结构，先占位；命中的单章原文在 5 条上限里不被气候/总纲挤掉。
  for (const g of gejuList) {
    const entry = g && SPECIAL_CLASSIC[g.name] ? classicOf(SPECIAL_CLASSIC[g.name]) : null;
    if (entry) push(entry, `本盘列有「${g.name}」，故取${CLASSIC_BOOKS[entry.book].name}「${chapterTitle(entry)}」一条`);
  }
  for (const g of gejuList) {
    if (!g || (g.kind && g.kind !== '月令格')) continue;
    const tag = tagOf(g.name);
    const primary = pick(tag, 'ziping') || pick(tag);
    if (primary) push(primary, `你的月令格局是「${g.name}」，故取${CLASSIC_BOOKS[primary.book].name}「${chapterTitle(primary)}」一条`);
    const alt = CLASSICS.find((e) => e.scene === '格局' && e.tags.includes(tag) && (!primary || e.book !== primary.book));
    if (alt) push(alt, `同是「${g.name}」，${CLASSIC_BOOKS[alt.book].name}「${chapterTitle(alt)}」另有取法，可对照读`);
  }
  const cli = r.climate || (r.frame && r.frame.yongshen && (r.frame.yongshen.climate || r.frame.yongshen.tiaohou));
  const tg = r.frame && r.frame.yongshen && r.frame.yongshen.tongguan;
  const tgEntry = tg && tg.usable ? classicOf('dt-tongguan') : null;
  if (cli && cli.kind && cli.kind !== '平和') {
    const cold = !!(cli.cold || cli.kind.indexOf('寒') >= 0);
    const hot = !!(cli.hot || cli.kind.indexOf('热') >= 0);
    push(classicOf(cold ? 'dt-hannuan' : 'dt-zaoshi'), `本盘气候判为「${cli.kind}」，故取${CLASSIC_BOOKS.ditian.name}寒暖燥湿一条`);
    // 「用神配气候」是泛论；有可通的通关结构时把这一位让给具体的通关，气候本身仍由寒暖/燥湿条承担
    if (!tgEntry) push(classicOf('zp-qihou'), '气候与月令用神要互参，故取子平真诠「用神配气候」一条');
    if (hot) push(classicOf('dt-hannuan'), '本盘偏热，寒暖一条正对');
  }
  if (tgEntry) {
    push(tgEntry, `本盘忌${tg.foe}克用${tg.use}，局中${tg.bridge}${tg.weight}分可作通关，故取${CLASSIC_BOOKS.ditian.name}「通关」一条`);
  }
  // 用神总纲位只放一条，按盘四选一：化气看「变化」、四墓杂气看「杂气取用」、有组合看「成败救应」，
  // 都没有才回到四吉四凶总纲。不另加位次，是因为格局两条 + 气候两条正好占满 5 条上限。
  const huagi = gejuList.find((g) => g && g.kind === '化气格');
  const combo = gejuList.find((g) => g && g.kind === '组合');
  const monthBranch = r.monthBranch || (r.frame && r.frame.monthBranch) || (r.pillars && r.pillars.month && r.pillars.month.branch);
  const zaMonth = ['辰', '未', '戌', '丑'].includes(monthBranch);
  if (huagi) {
    push(classicOf('zp-bianhua'), `本盘列有「${huagi.name}」：用神由月令合化而变，总纲一位改取${CLASSIC_BOOKS.ziping.name}论用神变化`);
  } else if (zaMonth) {
    push(classicOf('zp-zaji'), `月令${monthBranch}属四墓杂气，取用先看透干、再看会支，总纲一位取${CLASSIC_BOOKS.ziping.name}论杂气如何取用`);
  } else if (combo) {
    push(classicOf('zp-chengbai'), `本盘另有「${combo.name}」组合：成格还要看带忌与救应，总纲一位改取${CLASSIC_BOOKS.ziping.name}论用神成败救应`);
  } else {
    push(classicOf('zp-yongshen'), '用神从月令取、四吉顺用四凶逆用，是通用总纲');
  }
  return out;
}

export function classicsText(rows) {
  if (!rows || !rows.length) return '';
  return rows.map((e) => `《${CLASSIC_BOOKS[e.book].name}·${e.chapter}》「${e.quote}」`).join('\n');
}
