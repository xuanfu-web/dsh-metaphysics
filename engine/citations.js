// B6 引文索引：把「知识卡 → 书名 / 卷章 / 原文 / 链接」做成一张可核验的表。
//
// 两类来源：
//   ① CLASSICS（engine/classics.js）：八字三书，已有原文、卷章与典藏网链接；
//      这一批的 quote / plain 会被解读正文引用（岁运、调候、六亲那几处），所以整条都在引擎里。
//   ② CITATIONS（本文件）：紫微、三命通会、穷通宝鉴、增删卜易、奇门、梅花、滴天髓等，
//      运行时只用到「出处行」——《书名·卷章》+链接，所以这里只留 id / book / chapter / url 四个定位字段；
//      原文与白话挪到 engine/citations-fuwen.js 的 CITATION_TEXT，索引页与 CI 在那里逐字核验。
//      这三块（client.bazi / hepan / ziwei）的 gzip 上限钉在 232KB，塞原文就是塞预算，见那文件的说明。
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
  // ── B8 新增书目（六爻源头三本 + 地相五本）
  huangjince: {
    name: '黄金策',
    author: '明·刘基（题）',
    base: 'https://zh.wikisource.org/wiki/黄金策', // 维基文库本按《卜筮正宗》所载全文录，分「1、總斷千金賦」以下三十余节，无卷次
  },
  jingshi: {
    name: '京氏易传',
    author: '汉·京房',
    base: 'https://zh.wikisource.org/wiki/京氏易傳', // 卷上逐宫逐卦标世应、飞伏与爻辰
  },
  huozhulin: {
    name: '火珠林',
    author: '宋·麻衣道者（题）',
    base: 'https://zh.wikisource.org/wiki/火珠林', // 京房纳甲卜法之祖本，黄金策即其集大成
  },
  zangshu: {
    name: '葬书',
    author: '晋·郭璞（题）',
    base: 'https://zh.wikisource.org/wiki/葬書/內篇', // 正文取内篇，外篇与卷不录
  },
  qingnang: {
    name: '青囊经',
    author: '佚名',
    base: 'https://zh.wikisource.org/wiki/青囊經', // 上中下三卷（化始／化机／化成），本页未署名
  },
  aoyu: {
    name: '青囊奥语',
    author: '旧题唐·杨筠松',
    base: 'https://zh.wikisource.org/wiki/青囊奧語', // 本页不署名；坤壬乙诀即替星表之祖本
  },
  hanlong: {
    name: '撼龙经',
    author: '唐·杨筠松（旧题）',
    base: 'https://zh.wikisource.org/wiki/撼龍經', // 专言山龙形势，本页不分卷
  },
  rudidian: {
    name: '入地眼全书',
    author: '宋·静道',
    base: 'https://zh.wikisource.org/wiki/入地眼全書', // 以「水说」「水法」等小题分篇，无卷次
  },
  shenfeng: {
    name: '神峰通考',
    author: '明·张楠',
    base: 'https://www.luckclub.cn/bazi/008/', // 卷一诸说（动静／盖头／病药／四病四药）、卷二格局、卷三专旺五格与魁罡
  },
  luoluzi: {
    name: '珞琭子消息赋',
    author: '旧题珞琭子撰，本页注解未署名',
    base: 'https://www.luckclub.cn/bazi/024/', // 赋文与注解同页；四柱宫位、藏干见不见之形、三日折年皆出注解
  },
  lantai: {
    name: '兰台妙选',
    author: '佚名', // 本页未署名；旧题唐·袁天罡撰、明·万民英注，底本无从核对，故不写
    base: 'https://www.luckclub.cn/bazi/026/', // 上中下三篇；本站取原文本，注解同页照录
  },
  yuanhai: {
    name: '渊海子平',
    author: '宋·徐升编',
    base: 'https://www.luckclub.cn/bazi/001/',
  },
  dtchanwei: {
    name: '滴天髓阐微',
    author: '清·任铁樵阐微本（页内「原注」「任氏曰」分列）',
    base: 'https://www.luckclub.cn/bazi/007/',
  },
  wuxingdayi: {
    name: '五行大义',
    author: '隋·萧吉',
    base: 'https://www.luckclub.cn/bazi/011/',
  },
  yudingziping: {
    name: '御定子平',
    author: '清·官修，不著撰人',
    base: 'https://www.luckclub.cn/bazi/021/',
  },
  mingliyueyan: {
    name: '命理约言',
    author: '清·陈素庵',
    base: 'https://www.luckclub.cn/bazi/018/',
  },
  yuetanfu: {
    name: '月谈赋',
    author: '佚名',
    base: 'https://www.luckclub.cn/bazi/023/',
  },
  qianliminggao: {
    name: '千里命稿',
    author: '民国·韦千里',
    base: 'https://www.luckclub.cn/bazi/003/',
  },
  minglitanyuan: {
    name: '命理探原',
    author: '民国·袁树珊',
    base: 'https://www.luckclub.cn/bazi/009/',
  },
  lixuzhong: {
    name: '李虚中命书',
    author: '旧题唐·李虚中注，今多疑为宋人依托',
    base: 'https://www.luckclub.cn/bazi/010/',
  },
  yuzhao: {
    name: '玉照定真经',
    author: '旧题晋·郭璞撰，页内注者未署',
    base: 'https://www.luckclub.cn/bazi/012/',
  },
  wuxingjingji: {
    name: '五行精纪',
    author: '宋·廖中',
    base: 'https://www.luckclub.cn/bazi/013/',
  },
  bazitiyao: {
    name: '八字提要',
    author: '不著撰人（民国排印本）',
    base: 'https://www.luckclub.cn/bazi/015/',
  },
  guiguyiwen: {
    name: '鬼谷遗文',
    author: '旧题鬼谷子撰，与《李虚中命书》同源',
    base: 'https://www.luckclub.cn/bazi/016/',
  },
  guagua: {
    name: '呱呱集',
    author: '民国·韦千里',
    base: 'https://www.luckclub.cn/bazi/017/',
  },
  zaohuayuanyue: {
    name: '造化元钥评注',
    author: '近人评注，页内未署撰人',
    base: 'https://www.luckclub.cn/bazi/019/',
  },
  zipingguanjian: {
    name: '子平管见',
    author: '明·雷鸣夏（八公山人秀泉子）',
    base: 'https://www.luckclub.cn/bazi/020/',
  },
  xingmingzongkuo: {
    name: '星命总括',
    author: '旧题辽·耶律纯，四库提要已疑依托',
    base: 'https://www.luckclub.cn/bazi/022/',
  },
  xingmingjuegu: {
    name: '星命抉古录',
    author: '不著撰人（民国排印本）',
    base: 'https://www.luckclub.cn/bazi/025/',
  },
  renan: {
    name: '大六壬断案',
    author: '宋·邵彦和（本页课例集，含邵氏断语与后验）',
    base: 'https://www.luckclub.cn/daliuren/002/',
  },
  rentanyuan: {
    name: '大六壬探原',
    author: '民国·袁树珊（润德堂丛书之三）',
    base: 'https://www.luckclub.cn/daliuren/003/',
  },
  renxinjing: {
    name: '大六壬心镜',
    author: '唐·徐道符撰，本页有郑氏按语与据《神枢经》补字',
    base: 'https://www.luckclub.cn/daliuren/004/',
  },
  renzhinan: {
    name: '注解大六壬指南',
    author: '旧题明·陈公献，本页注解未署名',
    base: 'https://www.luckclub.cn/daliuren/005/',
  },
  rencuiyan: {
    name: '六壬粹言',
    author: '清·刘赤江（蛟门刘赤江慕甫编）',
    base: 'https://www.luckclub.cn/daliuren/006/',
  },
  renxuesuoji: {
    name: '壬学琐记',
    author: '清·佚名（本页有光绪七年侄夔跋）',
    base: 'https://www.luckclub.cn/daliuren/008/',
  },
  bifafu: {
    name: '毕法赋',
    author: '不著撰人（本页前段为百法歌诀，后段附今人课例）',
    base: 'https://www.luckclub.cn/daliuren/009/',
  },
  rengui: {
    name: '壬归',
    author: '不著撰人',
    base: 'https://www.luckclub.cn/daliuren/010/',
  },
  bushizhengzong: {
    name: '卜筮正宗',
    author: '清·王维德',
    base: 'https://www.luckclub.cn/liuyao/001/',
  },
  donglin: {
    name: '洞林秘诀',
    author: '不著撰人（歌诀体来意／何知章）',
    base: 'https://www.luckclub.cn/liuyao/004/',
  },
  duanyi: {
    name: '断易天机',
    author: '旧题鬼谷子，本页为今人整理本',
    base: 'https://www.luckclub.cn/liuyao/006/',
  },
  bushiquanshu: {
    name: '卜筮全书',
    author: '明·姚际隆辑（谈易斋重订本）',
    base: 'https://www.luckclub.cn/liuyao/007/',
  },
  yilinbuwei: {
    name: '易林补遗',
    author: '明·张星元',
    base: 'https://www.luckclub.cn/liuyao/008/',
  },
  yiyin: {
    name: '易隐',
    author: '明·曹九锡辑，曹璿演',
    base: 'https://www.luckclub.cn/liuyao/009/',
  },
  yimao: {
    name: '易冒',
    author: '清·程元如',
    base: 'https://www.luckclub.cn/liuyao/010/',
  },
  shixuezhiyao: {
    name: '筮学指要',
    author: '不著撰人',
    base: 'https://www.luckclub.cn/liuyao/011/',
  },
};

// 引文定位表：id / 书名 / 卷章 / 链接。原文照录与本站自撰白话在 citations-fuwen.js。
export const CITATIONS = [
  {
    id: 'zw-poge-sanfang',
    book: 'ziwei',
    chapter: '卷三·谈星要论',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-poge-ruge',
    book: 'ziwei',
    chapter: '卷三·论人命入格',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-shiyin',
    book: 'ziwei',
    chapter: '卷一·增补太微赋',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-jiju-poge',
    book: 'ziwei',
    chapter: '卷三·论诸星同垣各司所宜分别富贵贫贱夭寿',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-riyue-jia',
    book: 'ziwei',
    chapter: '卷三·论诸星同垣各司所宜分别富贵贫贱夭寿',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-changqu',
    book: 'ziwei',
    chapter: '卷三·论诸星同垣各司所宜分别富贵贫贱夭寿',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-kuiyue',
    book: 'ziwei',
    chapter: '卷三·论诸星同垣各司所宜分别富贵贫贱夭寿',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-jiyue',
    book: 'ziwei',
    chapter: '卷三·论诸星同垣各司所宜分别富贵贫贱夭寿',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-tanwu',
    book: 'ziwei',
    chapter: '卷三·论诸星同垣各司所宜分别富贵贫贱夭寿',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-huotan',
    book: 'ziwei',
    chapter: '卷一·增补太微赋',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-luma',
    book: 'ziwei',
    chapter: '卷一·诸星问答论·问天马星所主若何',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-sihua-ji',
    book: 'ziwei',
    chapter: '卷一·诸星问答论·问化忌星所主若何',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-sihua-lu',
    book: 'ziwei',
    chapter: '卷一·诸星问答论·问化禄星所主若何',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-sanfang',
    book: 'ziwei',
    chapter: '卷三·谈星要论',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-shenming',
    book: 'ziwei',
    chapter: '卷三·谈星要论',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-daxian',
    book: 'ziwei',
    chapter: '卷三·论大限十年祸福何如',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-miaowang',
    book: 'ziwei',
    chapter: '卷三·论诸星同垣各司所宜分别富贵贫贱夭寿',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-kongjie',
    book: 'ziwei',
    chapter: '卷一·诸星问答论·问天空地劫所主若何',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-taiwei-ji-xiong',
    book: 'ziwei',
    chapter: '卷一·太微赋',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-taiwei-jueshu',
    book: 'ziwei',
    chapter: '卷一·太微赋',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-fawei-sizheng',
    book: 'ziwei',
    chapter: '卷一·斗数发微论',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-fawei-ruxian',
    book: 'ziwei',
    chapter: '卷一·斗数发微论',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-fawei-xinglian',
    book: 'ziwei',
    chapter: '卷一·斗数发微论',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-fawei-kequ',
    book: 'ziwei',
    chapter: '卷一·斗数发微论',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gaolv-jiongji',
    book: 'ziwei',
    chapter: '卷一·重补斗数彀率',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gaolv-dexian',
    book: 'ziwei',
    chapter: '卷一·重补斗数彀率',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gaolv-shenming',
    book: 'ziwei',
    chapter: '卷一·重补斗数彀率',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-zengbu-nannv',
    book: 'ziwei',
    chapter: '卷一·增补太微赋',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-yili',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-mingshen',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-duigong',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-kong-jian',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-jieyao',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-gusu-fanwei',
    book: 'ziwei',
    chapter: '卷一·斗数骨髓赋',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-shideng-qianguan',
    book: 'ziwei',
    chapter: '卷一·定富贵贫贱十等论',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-dedi-wu',
    book: 'ziwei',
    chapter: '卷一·十二宫诸星得地合格诀',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-dedi-hai',
    book: 'ziwei',
    chapter: '卷一·十二宫诸星得地合格诀',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-shixian-zi',
    book: 'ziwei',
    chapter: '卷一·十二宫诸星失陷破格诀',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-shixian-shen',
    book: 'ziwei',
    chapter: '卷一·十二宫诸星失陷破格诀',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-nvming-fuxiang',
    book: 'ziwei',
    chapter: '卷一·女命骨髓赋',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zw-nannv-nan',
    book: 'ziwei',
    chapter: '卷三·论男女命同异',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-nannv-nv',
    book: 'ziwei',
    chapter: '卷三·论男女命同异',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  {
    id: 'zw-shenshi-shen',
    book: 'ziwei',
    chapter: '卷三·论人生时要审的确',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三',
  },
  // ── B6 补录：三命通会 / 穷通宝鉴（原文取自中华典藏网页，逐字核验）
  {
    id: 'smt-wangxiang',
    book: 'sanming',
    chapter: '卷二·论五行旺相休囚死并寄',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7531.html',
  },
  {
    id: 'smt-shensha',
    book: 'sanming',
    chapter: '卷三·总论诸神煞',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7572.html',
  },
  {
    id: 'smt-kongwang',
    book: 'sanming',
    chapter: '卷三·论空亡',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7563.html',
  },
  {
    id: 'smt-dayun-qiyun',
    book: 'sanming',
    chapter: '卷二·论大运',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7536.html',
  },
  {
    id: 'smt-liuqin',
    book: 'sanming',
    chapter: '卷七·论六亲',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7693.html',
  },
  {
    id: 'smt-xingchong',
    book: 'sanming',
    chapter: '卷二·论三刑',
    url: 'https://www.diancang.xyz/xuanxuewushu/sanmingtonghui/7548.html',
  },
  {
    id: 'qt-tiaohou',
    book: 'qiongtong',
    chapter: '五行总论',
    url: 'https://www.diancang.xyz/xuanxuewushu/qiongtongbaojian/41024.html',
  },
  {
    id: 'qm-yinyang',
    book: 'qimen',
    chapter: '卷一·奇门秘诀总赋',
    url: 'https://www.diancang.xyz/xuanxuewushu/qimendunjiatongzong/41068.html',
  },
  {
    id: 'qm-jixing',
    book: 'qimen',
    chapter: '卷十一·玄机赋（中）',
    url: 'https://www.diancang.xyz/xuanxuewushu/qimendunjiatongzong/41073.html',
  },
  {
    id: 'qm-rumu',
    book: 'qimen',
    chapter: '卷十一·玄机赋（中）',
    url: 'https://www.diancang.xyz/xuanxuewushu/qimendunjiatongzong/41073.html',
  },
  {
    id: 'qm-wangshuai',
    book: 'qimen',
    chapter: '卷三',
    url: 'https://www.diancang.xyz/xuanxuewushu/qimendunjiatongzong/41070.html',
  },
  {
    id: 'qm-men-gong',
    book: 'qimen',
    chapter: '卷二',
    url: 'https://www.diancang.xyz/xuanxuewushu/qimendunjiatongzong/41069.html',
  },
  {
    id: 'mh-tiyong',
    book: 'meihua',
    chapter: '卷二·体用生克',
    url: 'https://www.diancang.xyz/xuanxuewushu/meihuayishu/37734.html',
  },
  {
    id: 'zs-yongshen',
    book: 'liuyao',
    chapter: '卷一·用神章第八',
    url: 'https://zh.wikisource.org/wiki/增刪卜易/8',
  },
  {
    id: 'zs-fushen',
    book: 'liuyao',
    chapter: '卷二·飛伏神章第二十八',
    url: 'https://zh.wikisource.org/wiki/增刪卜易',
  },
  {
    id: 'zs-yuejian',
    book: 'liuyao',
    chapter: '卷一·月將章第十六',
    url: 'https://zh.wikisource.org/wiki/增刪卜易/16',
  },
  {
    id: 'zs-yuejian-zhuli',
    book: 'liuyao',
    chapter: '卷一·月將章第十六',
    url: 'https://zh.wikisource.org/wiki/增刪卜易/16',
  },
  {
    id: 'zs-richen',
    book: 'liuyao',
    chapter: '卷一·日辰章第十七',
    url: 'https://zh.wikisource.org/wiki/增刪卜易/17',
  },
  {
    id: 'zs-dongbian',
    book: 'liuyao',
    chapter: '卷一·動變生克沖合章第十五',
    url: 'https://zh.wikisource.org/wiki/增刪卜易/15',
  },
  {
    id: 'zs-liushen',
    book: 'liuyao',
    chapter: '卷一·六神章第十八',
    url: 'https://zh.wikisource.org/wiki/增刪卜易/18',
  },
  {
    id: 'zs-liuhe',
    book: 'liuyao',
    chapter: '卷一·六合章第十九',
    url: 'https://zh.wikisource.org/wiki/增刪卜易/19',
  },
  {
    id: 'zs-liuchong',
    book: 'liuyao',
    chapter: '卷一·六沖章第二十',
    url: 'https://zh.wikisource.org/wiki/增刪卜易/20',
  },
  {
    id: 'zs-fanyin',
    book: 'liuyao',
    chapter: '卷一·反伏章第二十五',
    url: 'https://zh.wikisource.org/wiki/增刪卜易/25',
  },
  {
    id: 'zs-fuyin',
    book: 'liuyao',
    chapter: '卷一·反伏章第二十五',
    url: 'https://zh.wikisource.org/wiki/增刪卜易/25',
  },
  {
    id: 'zs-jintui',
    book: 'liuyao',
    chapter: '卷二·進神退神章第二十九',
    url: 'https://zh.wikisource.org/wiki/增刪卜易',
  },
  {
    id: 'zs-yingqi',
    book: 'liuyao',
    chapter: '卷一·各門類應期總注章第又二十六',
    url: 'https://zh.wikisource.org/wiki/增刪卜易/26又3',
  },
  {
    id: 'dl-jigong',
    book: 'daliuren',
    chapter: '卷一·起例（十干寄宫）',
    url: 'https://zh.wikisource.org/wiki/六壬大全/1',
  },
  {
    id: 'dl-zeike',
    book: 'daliuren',
    chapter: '卷一·起例（贼克法）',
    url: 'https://zh.wikisource.org/wiki/六壬大全/1',
  },
  {
    id: 'dt-yiqi-tonggen',
    book: 'ditian',
    chapter: '干支总论',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153091.html',
  },
  // ── 滴天髓·下篇六亲论（2026-11-01 从底本逐字录入，同一页：153092.html）
  {
    id: 'dt-liuqin-fuqi',
    book: 'ditian',
    chapter: '六亲论·夫妻',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153092.html',
  },
  {
    id: 'dt-liuqin-zinv',
    book: 'ditian',
    chapter: '六亲论·子女',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153092.html',
  },
  {
    id: 'dt-liuqin-fumu',
    book: 'ditian',
    chapter: '六亲论·父母',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153092.html',
  },
  {
    id: 'dt-nvming-shensha',
    book: 'ditian',
    chapter: '六亲论·女命章',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153092.html',
  },
  {
    id: 'dt-hezhi-fugui',
    book: 'ditian',
    chapter: '六亲论·何知章',
    url: 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153092.html',
  },
  // ── B8 补录：六爻源头三本（2026-11-06 逐字核验）
  // 黄金策是火珠林卦法的集大成，京氏易传是八宫世应与飞伏的祖本：
  // 这两本接进来之后，六爻的「取用—世应—飞伏—应期」四层第一次各有出处，
  // 不再全部挂在《增删卜易》一本清人书上。地相五本没有解读层，走 citations-fuwen。
  {
    id: 'lj-yuejian-richen',
    book: 'huangjince',
    chapter: '一·总断千金赋',
    url: 'https://zh.wikisource.org/wiki/黄金策',
  },
  {
    id: 'lj-shiying-bibi',
    book: 'huangjince',
    chapter: '一·总断千金赋',
    url: 'https://zh.wikisource.org/wiki/黄金策',
  },
  {
    id: 'lj-yongshen-youqi',
    book: 'huangjince',
    chapter: '一·总断千金赋',
    url: 'https://zh.wikisource.org/wiki/黄金策',
  },
  {
    id: 'lj-taiguo-buji',
    book: 'huangjince',
    chapter: '一·总断千金赋',
    url: 'https://zh.wikisource.org/wiki/黄金策',
  },
  {
    id: 'lj-fushen-tiba',
    book: 'huangjince',
    chapter: '一·总断千金赋',
    url: 'https://zh.wikisource.org/wiki/黄金策',
  },
  {
    id: 'lj-yingqi-chongpo',
    book: 'huangjince',
    chapter: '一·总断千金赋',
    url: 'https://zh.wikisource.org/wiki/黄金策',
  },
  {
    id: 'lj-jintui-jiaochong',
    book: 'huangjince',
    chapter: '一·总断千金赋',
    url: 'https://zh.wikisource.org/wiki/黄金策',
  },
  {
    id: 'lj-shensha-shengke',
    book: 'huangjince',
    chapter: '一·总断千金赋',
    url: 'https://zh.wikisource.org/wiki/黄金策',
  },
  {
    id: 'lj-hunyin-liuchong',
    book: 'huangjince',
    chapter: '七·婚姻',
    url: 'https://zh.wikisource.org/wiki/黄金策',
  },
  {
    id: 'js-ganfei-fufeifu',
    book: 'jingshi',
    chapter: '卷上·乾上乾下·乾',
    url: 'https://zh.wikisource.org/wiki/京氏易傳',
  },
  {
    id: 'js-bagong-zongang',
    book: 'jingshi',
    chapter: '卷上·坤下離上·晋（注文）',
    url: 'https://zh.wikisource.org/wiki/京氏易傳',
  },
  {
    id: 'hzl-liuqin-genyuan',
    book: 'huozhulin',
    chapter: '六亲根源',
    url: 'https://zh.wikisource.org/wiki/火珠林',
  },
  {
    id: 'hzl-duifa-luandong',
    book: 'huozhulin',
    chapter: '独发乱动',
    url: 'https://zh.wikisource.org/wiki/火珠林',
  },
  {
    id: 'hzl-shiying-women',
    book: 'huozhulin',
    chapter: '世应相克',
    url: 'https://zh.wikisource.org/wiki/火珠林',
  },
  {
    id: 'zm-zhunsheng-shenming',
    book: 'ziwei',
    chapter: '卷一·斗数准绳',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'zm-xingyuan-yinmao',
    book: 'ziwei',
    chapter: '卷一·星垣论',
    url: 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一',
  },
  {
    id: 'js-shiying-guihun',
    book: 'jingshi',
    chapter: '卷上·乾下離上·大有',
    url: 'https://zh.wikisource.org/wiki/京氏易傳',
  },
  // ── B9 第二批：八字四本里的三本（2026-11-07 逐字核验，luckclub 本）
  // 《神峰通考》把专旺五格、阳刃、杂气、魁罡各写一篇，张楠自己的按语常与通行格论相左
  // （「此二格吾见多矣，未尝有富贵者」「此亦子平书之大谬也」）——并引而不替用户选边。
  // 《珞琭子消息赋》该页赋文与注解混排、不分卷，卷章按页内实际小节标，不编卷次。
  // 《兰台妙选》上中下三篇，本批只取上、中两篇成句。
  // 《星平会海》各卷页面只有篇名目录（卷九仅 32 字），正文取不到，照实记「未接触」，一条不录。
  {
    id: 'sf-quzhi',
    book: 'shenfeng',
    chapter: '卷三·曲直仁寿格',
    url: 'https://www.luckclub.cn/bazi/008/031/',
  },
  {
    id: 'sf-yanshang',
    book: 'shenfeng',
    chapter: '卷三·炎上格',
    url: 'https://www.luckclub.cn/bazi/008/033/',
  },
  {
    id: 'sf-jiase',
    book: 'shenfeng',
    chapter: '卷三·稼穑格',
    url: 'https://www.luckclub.cn/bazi/008/032/',
  },
  {
    id: 'sf-congge',
    book: 'shenfeng',
    chapter: '卷三·从革格',
    url: 'https://www.luckclub.cn/bazi/008/035/',
  },
  {
    id: 'sf-runxia',
    book: 'shenfeng',
    chapter: '卷三·润下格',
    url: 'https://www.luckclub.cn/bazi/008/034/',
  },
  {
    id: 'sf-yangren',
    book: 'shenfeng',
    chapter: '卷二·阳刃格',
    url: 'https://www.luckclub.cn/bazi/008/019/',
  },
  {
    id: 'sf-rensha',
    book: 'shenfeng',
    chapter: '卷二·阳刃格',
    url: 'https://www.luckclub.cn/bazi/008/019/',
  },
  {
    id: 'sf-kuigang',
    book: 'shenfeng',
    chapter: '卷三·魁罡格',
    url: 'https://www.luckclub.cn/bazi/008/043/',
  },
  {
    id: 'sf-zaji',
    book: 'shenfeng',
    chapter: '卷二·杂气财官印绶格',
    url: 'https://www.luckclub.cn/bazi/008/020/',
  },
  {
    id: 'll-jianbujian',
    book: 'luoluzi',
    chapter: '注解·或见或闻',
    url: 'https://www.luckclub.cn/bazi/024/001/',
  },
  {
    id: 'll-sizhugong',
    book: 'luoluzi',
    chapter: '注解·四柱三元',
    url: 'https://www.luckclub.cn/bazi/024/001/',
  },
  {
    id: 'll-zheri',
    book: 'luoluzi',
    chapter: '赋文·运行折除',
    url: 'https://www.luckclub.cn/bazi/024/001/',
  },
  {
    id: 'lt-geju',
    book: 'lantai',
    chapter: '上篇',
    url: 'https://www.luckclub.cn/bazi/026/001/',
  },
  {
    id: 'lt-xiongsha',
    book: 'lantai',
    chapter: '上篇',
    url: 'https://www.luckclub.cn/bazi/026/001/',
  },
  // ── B10 第一批：luckclub 八字六本（2026-11-07，逐句过底本子串）
  {
    id: 'yh-cangdun',
    book: 'yuanhai',
    chapter: '卷一·地支藏遁歌',
    url: 'https://www.luckclub.cn/bazi/001/061/',
  },
  {
    id: 'yh-dayun',
    book: 'yuanhai',
    chapter: '卷一·论起大运法',
    url: 'https://www.luckclub.cn/bazi/001/055/',
  },
  {
    id: 'yh-liuqin',
    book: 'yuanhai',
    chapter: '卷一·论五行相生相克',
    url: 'https://www.luckclub.cn/bazi/001/057/',
  },
  {
    id: 'yh-tianyi',
    book: 'yuanhai',
    chapter: '卷一·论起玉堂天乙贵人',
    url: 'https://www.luckclub.cn/bazi/001/024/',
  },
  {
    id: 'dtcw-yueling',
    book: 'dtchanwei',
    chapter: '上篇第15章·月令·原注',
    url: 'https://www.luckclub.cn/bazi/007/017/',
  },
  {
    id: 'dtcw-tongguan',
    book: 'dtchanwei',
    chapter: '上篇第20章·通关·原注',
    url: 'https://www.luckclub.cn/bazi/007/022/',
  },
  {
    id: 'ydzp-zhengguan',
    book: 'yudingziping',
    chapter: '正官论',
    url: 'https://www.luckclub.cn/bazi/021/002/',
  },
  {
    id: 'ydzp-chengbai',
    book: 'yudingziping',
    chapter: '正官论',
    url: 'https://www.luckclub.cn/bazi/021/002/',
  },
  {
    id: 'mlyy-geju',
    book: 'mingliyueyan',
    chapter: '看格局法',
    url: 'https://www.luckclub.cn/bazi/018/007/',
  },
  {
    id: 'mlyy-wangshuai',
    book: 'mingliyueyan',
    chapter: '看月令法一',
    url: 'https://www.luckclub.cn/bazi/018/011/',
  },
  {
    id: 'mlyy-zaji',
    book: 'mingliyueyan',
    chapter: '看月令法一',
    url: 'https://www.luckclub.cn/bazi/018/011/',
  },
  {
    id: 'mlyy-congju',
    book: 'mingliyueyan',
    chapter: '看从局法',
    url: 'https://www.luckclub.cn/bazi/018/033/',
  },
  // ── B10 第二批：luckclub 八字余下 12 本（2026-11-07，逐句过底本子串）
  {
    id: 'qlmg-bage',
    book: 'qianliminggao',
    chapter: '格局篇',
    url: 'https://www.luckclub.cn/bazi/003/011/',
  },
  {
    id: 'qlmg-quge',
    book: 'qianliminggao',
    chapter: '格局篇',
    url: 'https://www.luckclub.cn/bazi/003/011/',
  },
  {
    id: 'qlmg-pingduan',
    book: 'qianliminggao',
    chapter: '评断篇',
    url: 'https://www.luckclub.cn/bazi/003/021/',
  },
  {
    id: 'qlmg-qiangruo',
    book: 'qianliminggao',
    chapter: '强弱篇',
    url: 'https://www.luckclub.cn/bazi/003/008/',
  },
  {
    id: 'qlmg-renyuan',
    book: 'qianliminggao',
    chapter: '人元篇',
    url: 'https://www.luckclub.cn/bazi/003/006/',
  },
  {
    id: 'qlmg-liuqin',
    book: 'qianliminggao',
    chapter: '六亲篇',
    url: 'https://www.luckclub.cn/bazi/003/016/',
  },
  {
    id: 'mlty-shunni',
    book: 'minglitanyuan',
    chapter: '卷三 强弱',
    url: 'https://www.luckclub.cn/bazi/009/004/',
  },
  {
    id: 'mlty-yongshi',
    book: 'minglitanyuan',
    chapter: '卷三 强弱',
    url: 'https://www.luckclub.cn/bazi/009/004/',
  },
  {
    id: 'mlty-shensha',
    book: 'minglitanyuan',
    chapter: '卷八 星家十要',
    url: 'https://www.luckclub.cn/bazi/009/009/',
  },
  {
    id: 'wxjj-yinshou',
    book: 'wuxingjingji',
    chapter: '五行精纪：第十八卷论印绶',
    url: 'https://www.luckclub.cn/bazi/013/026/',
  },
  {
    id: 'wxjj-tiancai',
    book: 'wuxingjingji',
    chapter: '五行精纪：论财',
    url: 'https://www.luckclub.cn/bazi/013/032/',
  },
  {
    id: 'wxjj-tianyi',
    book: 'wuxingjingji',
    chapter: '五行精纪：第十四卷【论天乙贵神】',
    url: 'https://www.luckclub.cn/bazi/013/021/',
  },
  {
    id: 'zhyy-tiaohou',
    book: 'zaohuayuanyue',
    chapter: '立论特色',
    url: 'https://www.luckclub.cn/bazi/019/007/',
  },
  {
    id: 'zpgj-zhengguan',
    book: 'zipingguanjian',
    chapter: '正官格',
    url: 'https://www.luckclub.cn/bazi/020/002/',
  },
  {
    id: 'zpgj-pianguan',
    book: 'zipingguanjian',
    chapter: '偏官格',
    url: 'https://www.luckclub.cn/bazi/020/003/',
  },
  {
    id: 'zpgj-zaqi',
    book: 'zipingguanjian',
    chapter: '杂气有三',
    url: 'https://www.luckclub.cn/bazi/020/029/',
  },
  {
    id: 'xmjg-tianyi',
    book: 'xingmingjuegu',
    chapter: '贵人论',
    url: 'https://www.luckclub.cn/bazi/025/001/',
  },
  {
    id: 'xmjg-yangsheng',
    book: 'xingmingjuegu',
    chapter: '五行生旺论',
    url: 'https://www.luckclub.cn/bazi/025/002/',
  },
  {
    id: 'xmjg-kongwang',
    book: 'xingmingjuegu',
    chapter: '古法论',
    url: 'https://www.luckclub.cn/bazi/025/008/',
  },
  // ── B11：luckclub 大六壬 / 六爻两栏（2026-11-07，逐句过底本子串）
  {
    id: 'rty-sike',
    book: 'rentanyuan',
    chapter: '卷上 推演篇',
    url: 'https://www.luckclub.cn/daliuren/003/002/',
  },
  {
    id: 'rzn-rushi',
    book: 'renzhinan',
    chapter: '卷一 注释大六壬心印赋',
    url: 'https://www.luckclub.cn/daliuren/005/003/',
  },
  {
    id: 'rzn-richen',
    book: 'renzhinan',
    chapter: '卷二 大六壬九天玄女指掌赋',
    url: 'https://www.luckclub.cn/daliuren/005/004/',
  },
  {
    id: 'rg-tigang',
    book: 'rengui',
    chapter: '卷之一 提纲例约',
    url: 'https://www.luckclub.cn/daliuren/010/001/',
  },
  {
    id: 'bszz-liuqin',
    book: 'bushizhengzong',
    chapter: '第一篇 启蒙节要',
    url: 'https://www.luckclub.cn/liuyao/001/005/',
  },
  {
    id: 'bszz-yongshen',
    book: 'bushizhengzong',
    chapter: '第三篇 十八论',
    url: 'https://www.luckclub.cn/liuyao/001/007/',
  },
  {
    id: 'bszz-shiying',
    book: 'bushizhengzong',
    chapter: '第三篇 十八论',
    url: 'https://www.luckclub.cn/liuyao/001/007/',
  },
  {
    id: 'bszz-yuanshen',
    book: 'bushizhengzong',
    chapter: '第三篇 十八论',
    url: 'https://www.luckclub.cn/liuyao/001/007/',
  },
  {
    id: 'bszz-hechu',
    book: 'bushizhengzong',
    chapter: '第三篇 十八论',
    url: 'https://www.luckclub.cn/liuyao/001/007/',
  },
  {
    id: 'bszz-pi-zs',
    book: 'bushizhengzong',
    chapter: '第四篇 辟诸书之谬',
    url: 'https://www.luckclub.cn/liuyao/001/008/',
  },
  {
    id: 'bszz-fushen',
    book: 'bushizhengzong',
    chapter: '第四篇 辟诸书之谬',
    url: 'https://www.luckclub.cn/liuyao/001/008/',
  },
  {
    id: 'bszz-sanchuan',
    book: 'bushizhengzong',
    chapter: '第七篇 十八问答附占验',
    url: 'https://www.luckclub.cn/liuyao/001/011/',
  },
  {
    id: 'ylby-feifu',
    book: 'yilinbuwei',
    chapter: '卷一',
    url: 'https://www.luckclub.cn/liuyao/008/005/',
  },
  {
    id: 'ylby-yongshen',
    book: 'yilinbuwei',
    chapter: '卷一',
    url: 'https://www.luckclub.cn/liuyao/008/005/',
  },
  {
    id: 'sxzy-shiying',
    book: 'shixuezhiyao',
    chapter: '筮学指要',
    url: 'https://www.luckclub.cn/liuyao/011/001/',
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
  'bazi-yueling-siquan': { refs: ['smt-renyuan', 'yh-cangdun', 'dtcw-yueling', 'qlmg-renyuan', 'mlty-yongshi'] },
  // B9 第二批：格局卡并引三书——子平真诠定「专求月令」，张楠给阳刃与刃杀相配的异说，
  // 兰台妙选则把「格」明定为取用于生月、「局」明定为地支三合，三者分法不同，只并引不合并。
  'bazi-geju': { refs: ['zp-yongshen', 'sf-yangren', 'sf-rensha', 'lt-geju', 'mlyy-geju', 'qlmg-bage', 'qlmg-quge', 'qlmg-pingduan'] },
  'bazi-suiyun': { refs: ['smt-suiyun'] },
  'bazi-sanming-duizhao': { refs: ['zp-zhenguan', 'smt-guansha-liu', 'ydzp-zhengguan', 'wxjj-yinshou', 'wxjj-tiancai', 'zpgj-pianguan'] },
  'bazi-geju-chengbai': { refs: ['zp-chengbai', 'dt-hezhi-fugui', 'ydzp-chengbai', 'zpgj-zhengguan'] },
  'bazi-huagi-bianhua': { refs: ['zp-bianhua'] },
  'bazi-zaji-quyong': { refs: ['zp-zaji', 'sf-zaji', 'mlyy-zaji', 'zpgj-zaqi'] },
  // 专旺五格：三命通会立格，神峰通考逐格给条件与破格字，张楠又亲口驳从革、润下二格，一并留着。
  'bazi-zhuanwang-yuanwen': { refs: ['smt-quzhi', 'smt-yanshang', 'smt-congge', 'smt-runxia', 'smt-jiasi',
    'sf-quzhi', 'sf-yanshang', 'sf-jiase', 'sf-congge', 'sf-runxia'] },
  'bazi-congge-yuanwen': { refs: ['smt-congsha', 'smt-congcai', 'mlyy-congju'] },
  'bazi-tongguan': { refs: ['dt-tongguan', 'dtcw-tongguan'] },
  // ── 八字：通行说，暂未定位单一条文
  'bazi-tonggen-tougan': {
    refs: ['dt-yiqi-tonggen', 'll-jianbujian'],
    // 通行说法（「地支所藏之干，本静以待用…干以通根为美，支以透出为贵」）常被署成《滴天髓》，
    // 2026-11-01 核过：滴天髓底本与《子平真诠》沈孝瞻原文（论十干十二支）里都查不到这句，
    // 它出现在《子平真诠》评注本该章的注文（附支藏人元图、人元司令表之后的按语）。
    // 注文自身引的《滴天髓》「天全一气…」才是原本，故本卡只引可核的那句，注文只作说明不冒充原文。
    // 2026-11-07 补：《珞琭子消息赋》注解把「见」解为天元、「闻」解为支内人元，是天元/人元分层的祖本，
    // 但原文没有「通根」二字，只作分层出处，不拿它冒充通根透干的成句。
    note: '通行说两句出自《子平真诠》卷一注文，非《滴天髓》正文；注文所引的滴天髓句见本条。珞琭子注只证天元/人元分层，不证「通根」。',
  },
  'bazi-wangxiang': { refs: ['smt-wangxiang', 'mlyy-wangshuai', 'qlmg-qiangruo', 'mlty-shunni', 'xmjg-yangsheng'] },
  // 神煞：三命通会条列名目，滴天髓女命章直接贬为「虚好语」「半推详」——两书合看才是全貌：
  // 神煞是有的，只是不主吉凶。只引三命通会会让人以为本插件在给神煞背书。
  // B9 第二批再加两处互抵的口径：张楠质疑魁罡凭临比墓掌威权，兰台妙选却说凶煞有制反主荣贵。
  'bazi-shensha': { refs: ['smt-shensha', 'dt-nvming-shensha', 'sf-kuigang', 'lt-xiongsha', 'yh-tianyi', 'mlty-shensha', 'wxjj-tianyi', 'xmjg-tianyi'] },
  'bazi-tiaohou': { refs: ['qt-tiaohou', 'zhyy-tiaohou'] },
  // 六亲：星宫同参，落点分别是夫妻（财与喜神）、子女（杀与喜神）、父母（年月宫位）；
  // 珞琭子赋注的四柱定名与三元分层是宫位说的早期出处。
  'bazi-liuqin': { refs: ['smt-liuqin', 'dt-liuqin-fuqi', 'dt-liuqin-zinv', 'dt-liuqin-fumu', 'll-sizhugong', 'yh-liuqin', 'qlmg-liuqin'] },
  'bazi-kongwang': { refs: ['smt-kongwang', 'xmjg-kongwang'] },
  'bazi-xingchong': { refs: ['smt-xingchong'] },
  // 起运：三命通会论大运 + 珞琭子赋文「三日为年」的折算口径。
  'bazi-dayun-jiaoqi': { refs: ['smt-dayun-qiyun', 'll-zheri', 'yh-dayun'] },
  // ── 紫微：已定位（紫微斗数全书）
  // B7 起把卷一赋文补进来：三方四正、庙旺、破格、大限、命身、空劫每条都能指到具体句子。
  'ziwei-sanfang': { refs: ['zw-sanfang', 'zw-gusu-duigong', 'zw-fawei-sizheng'] },
  'ziwei-sihua': { refs: ['zw-sihua-lu', 'zw-sihua-ji', 'zw-fawei-kequ'] },
  'ziwei-miaowang': { refs: ['zw-miaowang', 'zw-fawei-ruxian', 'zw-gaolv-dexian', 'zw-taiwei-jueshu', 'zm-xingyuan-yinmao', 'zm-zhunsheng-shenming'], note: '卷一「星垣论」按五行之垣定庙乐（寅卯为木垣，故贪狼天机庙乐），与卷三逐星庙旺表不是同一套口径；两处并引，本插件仍按卷三表判。' },
  'ziwei-daxian': { refs: ['zw-daxian', 'zw-fawei-xinglian', 'zw-gusu-fanwei'] },
  'ziwei-shengong': { refs: ['zw-shenming', 'zw-gusu-mingshen', 'zw-gaolv-shenming', 'zw-shenshi-shen', 'zm-zhunsheng-shenming'] },
  'ziwei-kongjie': { refs: ['zw-kongjie', 'zw-gusu-jieyao', 'zw-gusu-kong-jian'] },
  'ziwei-poge': { refs: ['zw-poge-ruge', 'zw-poge-sanfang', 'zw-gusu-yili', 'zw-gaolv-jiongji', 'zw-shideng-qianguan'] },
  'ziwei-ji-duo': { refs: ['zw-taiwei-ji-xiong', 'zw-gaolv-jiongji'] },
  'ziwei-shixian-jue': { refs: ['zw-dedi-wu', 'zw-dedi-hai', 'zw-shixian-zi', 'zw-shixian-shen'] },
  'ziwei-nanv-ming': { refs: ['zw-nannv-nan', 'zw-nannv-nv', 'zw-nvming-fuxiang', 'zw-zengbu-nannv'] },
  // ── 紫微：飞星派读法不在《全书》原文内
  'ziwei-feixing': { status: 'general', book: '紫微斗数全书 / 飞星派', chapter: '四化篇', reason: '宫干飞化属飞星派传法，非《全书》单条原文' },
  'ziwei-sanfang-fei': { status: 'general', book: '紫微斗数全书 / 飞星派', chapter: '四化篇', reason: '三方四正同飞属飞星派读法，未定位到单条原文' },
  'ziwei-jichuanji': { status: 'general', book: '紫微斗数全书 / 飞星派', chapter: '四化篇', reason: '忌转忌串连属飞星派读法，未定位到单条原文' },
  // 2026-11-02 复核：维基文库本《紫微斗数全书》卷一是赋文与格局、卷二是安身命例，均无杂曜安星诀；
  // 十二颗杂曜的诀文来自近代通行安星诀的多处并核，按口径只作通行说，不冒充《全书》原文。
  'ziwei-zaoyao': { status: 'general', book: '通行安星诀（中州派讲义 / 安星口诀本）', chapter: '杂曜安星诀', reason: '诀文见多处近代通行辑本且逐颗互核一致，但未定位到古籍单条原文，故不署《全书》' },
  // ── 六爻：增删卜易（维基文库本，繁体照录），B8 起再加三本更早的源头
  // B8 之前六爻十三张卡全挂在一本清人书上。《京氏易传》（汉）定八宫世应与飞伏配对，
  // 《火珠林》（宋）定六亲根源与独发乱动，《黄金策》（明）把这一套收成赋文——
  // 现在取用、世应、飞伏、应期四层各有一本比《增删卜易》早的书可对。
  'liuyao-yongshen': { refs: ['zs-yongshen', 'lj-yongshen-youqi', 'hzl-liuqin-genyuan', 'bszz-liuqin', 'bszz-yongshen', 'bszz-pi-zs'] },
  'liuyao-fushen': { refs: ['zs-fushen', 'lj-fushen-tiba', 'js-ganfei-fufeifu', 'bszz-fushen', 'ylby-feifu', 'ylby-yongshen'] },
  'liuyao-wangshuai': { refs: ['zs-yuejian', 'lj-yuejian-richen', 'bszz-sanchuan'] },
  // 世应新单列一卡（B8）：位序是京房八宫的硬结构，不再寄在「用神」卡里
  'liuyao-shiying': { refs: ['lj-shiying-bibi', 'hzl-shiying-women', 'js-shiying-guihun', 'js-bagong-zongang', 'hzl-duifa-luandong', 'bszz-shiying', 'sxzy-shiying'] },
  'liuyao-yongshen-shuai': { refs: ['zs-richen', 'lj-taiguo-buji', 'bszz-yuanshen'] },
  'liuyao-quanggu-shuai': { refs: ['zs-yuejian-zhuli'] },
  'liuyao-dongbian': { refs: ['zs-dongbian', 'hzl-duifa-luandong'] },
  'liuyao-liushen': { refs: ['zs-liushen', 'lj-shensha-shengke'] },
  'liuyao-liuhe': { refs: ['zs-liuhe', 'lj-hunyin-liuchong', 'bszz-hechu'] },
  'liuyao-liuchong': { refs: ['zs-liuchong', 'lj-hunyin-liuchong', 'bszz-hechu'] },
  'liuyao-fanyin': { refs: ['zs-fanyin'] },
  'liuyao-fuyin': { refs: ['zs-fuyin'] },
  'liuyao-jintui': { refs: ['zs-jintui', 'lj-jintui-jiaochong'] },
  'liuyao-yingqi': { refs: ['zs-yingqi', 'lj-yingqi-chongpo'] },
  // 2026-11-01 复核：底本卷二·進神退神章第二十九原文「所喜者宜於化進，所忌者宜化退神」
  // 已经把喜忌落在进退上，可作本条依据；把「喜／忌」具体落到用神／忌神两档仍是本插件的引申（见知识卡 note）
  'liuyao-jintui-yong': { refs: ['zs-jintui'] },
  'liuyao-yingqi-exact': { status: 'todo', book: '增删卜易', chapter: '各門類應期總注章', reason: '逐条应期尚未实现，等 20+ 条有应验日期的卦例' },
  // ── 其他体系
  'meihua-tiyong': { refs: ['mh-tiyong'] },
  'daliuren-sike': { refs: ['dl-jigong', 'dl-zeike', 'rty-sike', 'rzn-rushi', 'rzn-richen', 'rg-tigang'] },
  'qimen-yinyang': { refs: ['qm-yinyang'] },
  'qimen-jixing': { refs: ['qm-jixing'] },
  'qimen-rumu': { refs: ['qm-rumu'] },
  'qimen-wangshuai': { refs: ['qm-wangshuai'] },
  'qimen-wangshuai-yong': { refs: ['qm-men-gong'] },
  'qimen-gan-shengke': { status: 'general', book: '奇门遁甲统宗', chapter: '卷十二·玄机赋（下）', reason: '底本有「奇仪与日干」生克条，未见单列「干与落宫」生克条；干宫取象为通行读法，不拿十神条文冒充' },
  'qimen-ganying': { status: 'general', book: '奇门十干应克 / 奇门遁甲元灵经', chapter: '通行 100 组表 / 卷二·天盘加地盘吉凶', reason: '100 组为通行表汇编，元灵经只存甲、乙、丙三组，非单条原文' },
  'tarot-orientation': { status: 'general', book: '韦特塔罗', chapter: '逆位读法', reason: '韦特体系无中文古籍原文，逆位读法属近代流派' },
  'tarot-correspondence': { status: 'general', book: 'Liber 777 一脉的公开对应表', chapter: '小阿卡纳 2-10 的旬位与十源质', reason: '属近代西方神秘学对应表，无中文古籍原文；本插件按三处独立公开资料互核后取数字牌旬位，宫廷牌两派映射冲突故不配星座' },
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
