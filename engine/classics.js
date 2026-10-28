// 古籍原文库：《子平真诠》《滴天髓》里与「格局取用」「十神喜忌」「寒暖燥湿」直接相关的条目。
// 原文照录（公共版权：清·沈孝瞻《子平真诠》、明·京图《滴天髓》通行本），仅供文化研究与参考。
// 出处以中华典藏网在线本为准（逐条给 url），异文处不合并、不改写；plain 是本站自撰白话，不是原文。

export const CLASSIC_BOOKS = {
  ziping: { name: '子平真诠', author: '清·沈孝瞻', base: 'https://www.diancang.xyz/xuanxuewushu/zipingzhenquan/' },
  ditian: { name: '滴天髓', author: '明·京图（通行本）', base: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/' },
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
    tags: ['财'],
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
];

const BY_ID = CLASSICS.reduce((m, e) => { m[e.id] = e; return m; }, {});

// 格局名 → tags 键（本引擎的格局名都带「格」）
const GEJU_KEY = {
  正官格: '正官',
  七杀格: '七杀',
  偏官格: '偏官',
  正财格: '财',
  偏财格: '财',
  正印格: '印',
  偏印格: '印',
  食神格: '食神',
  伤官格: '伤官',
  阳刃格: '阳刃',
  月劫格: '月劫',
  建禄格: '建禄',
};

export function classicOf(id) {
  return BY_ID[id] || null;
}

function tagOf(gejuName) {
  const name = String(gejuName || '');
  if (GEJU_KEY[name]) return GEJU_KEY[name];
  const bare = name.replace(/格$/, '');
  return GEJU_KEY[bare + '格'] || bare;
}

// 根据一张八字结果挑原文：先格局（格局条），再调候（寒暖/燥湿），最后用神通则；去重、限量。
export function classicsFor(r, limit = 4) {
  if (!r) return [];
  const out = [];
  const seen = new Set();
  const push = (entry, why) => {
    if (!entry || seen.has(entry.id) || out.length >= limit) return;
    seen.add(entry.id);
    out.push({ ...entry, why });
  };
  const gejuList = Array.isArray(r.geju) ? r.geju : (r.frame && Array.isArray(r.frame.geju) ? r.frame.geju : []);
  for (const g of gejuList) {
    if (!g || (g.kind && g.kind !== '月令格')) continue;
    const tag = tagOf(g.name);
    const hit = CLASSICS.find((e) => e.scene === '格局' && e.tags.includes(tag));
    if (hit) push(hit, `你的月令格局是「${g.name}」，故取${CLASSIC_BOOKS[hit.book].name}论${hit.chapter.replace(/^.*、/, '')}`);
  }
  const cli = r.climate || (r.frame && r.frame.yongshen && (r.frame.yongshen.climate || r.frame.yongshen.tiaohou));
  if (cli && cli.kind && cli.kind !== '平和') {
    const cold = !!(cli.cold || cli.kind.indexOf('寒') >= 0);
    const hot = !!(cli.hot || cli.kind.indexOf('热') >= 0);
    push(classicOf(cold ? 'dt-hannuan' : 'dt-zaoshi'), `本盘气候判为「${cli.kind}」，故取${CLASSIC_BOOKS.ditian.name}寒暖燥湿一条`);
    push(classicOf('zp-qihou'), '气候与月令用神要互参，故取子平真诠「用神配气候」一条');
    if (hot) push(classicOf('dt-hannuan'), '本盘偏热，寒暖一条正对');
  }
  push(classicOf('zp-yongshen'), '用神从月令取、四吉顺用四凶逆用，是通用总纲');
  return out;
}

export function classicsText(rows) {
  if (!rows || !rows.length) return '';
  return rows.map((e) => `《${CLASSIC_BOOKS[e.book].name}·${e.chapter}》「${e.quote}」`).join('\n');
}
