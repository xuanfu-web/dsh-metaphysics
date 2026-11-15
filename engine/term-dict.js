/**
 * 术语词典（PRD 5.x / US-006）
 *
 * 三级定义：
 *   T1 核心术语 —— L0/L1 允许出现，首次出现要给 8–15 字白话；
 *   T2 解释性   —— 只在 L2（「为什么」折叠 / 流派说明）出现；
 *   T3 推演细节 —— L0/L1 出现即判校验失败（不是"建议不出现"，是硬拦截）。
 *
 * 词典只做两件事：给 tier、给白话。它不下判断，也不参与排盘。
 * 判定口径：同一段文本里先按最长术语匹配（避免「六冲卦」被「六冲」截断），
 * 命中后从文本里挖掉再继续，因此不会重复计数。
 */

const T1 = 'T1';
const T2 = 'T2';
const T3 = 'T3';

/** 每体系 ≥30 条；键即术语原文 */
export const TERM_DICT = {
  bazi: {
    // —— T1：结论层要说的话离不开这些
    日主: { tier: T1, plain: '代表你自己的那个天干' },
    身强: { tier: T1, plain: '自身这股力量偏旺' },
    身弱: { tier: T1, plain: '自身这股力量偏弱' },
    中和: { tier: T1, plain: '强弱差不多持平' },
    用神: { tier: T1, plain: '对你最省力的那股五行' },
    忌神: { tier: T1, plain: '容易多耗你力气的那股' },
    喜神: { tier: T1, plain: '能帮上忙的那一股' },
    格局: { tier: T1, plain: '整张盘的结构类型' },
    大运: { tier: T1, plain: '十年一步的运势段落' },
    流年: { tier: T1, plain: '某一年的运势' },
    月令: { tier: T1, plain: '出生那个月的气候底子' },
    调候: { tier: T1, plain: '按冷暖燥湿补的那一味' },
    五行: { tier: T1, plain: '木火土金水五类气' },
    天干: { tier: T1, plain: '上面那排十个字' },
    地支: { tier: T1, plain: '下面那排十二个字' },
    十神: { tier: T1, plain: '六亲关系的十种叫法' },
    比劫: { tier: T1, plain: '同辈、竞争、自己人' },
    食伤: { tier: T1, plain: '表达、产出、孩子' },
    财星: { tier: T1, plain: '钱与实务' },
    官杀: { tier: T1, plain: '约束、职责、压力' },
    印星: { tier: T1, plain: '靠山、学历、庇荫' },
    透干: { tier: T1, plain: '露在上面看得见' },
    藏干: { tier: T1, plain: '藏在地支里的成分' },
    起运: { tier: T1, plain: '第一次换大运的年纪' },
    交运: { tier: T1, plain: '换运那一刻' },
    // —— T2：解释层
    扶抑: { tier: T2, plain: '弱了帮、旺了压的取法' },
    病药: { tier: T2, plain: '先找毛病再找药' },
    通关: { tier: T2, plain: '两头对立时找个中间人' },
    得令: { tier: T2, plain: '占住了当令的季节' },
    得地: { tier: T2, plain: '在地支里有根' },
    得势: { tier: T2, plain: '同类多、声势够' },
    通根: { tier: T2, plain: '天干在地支找到支撑' },
    盖头: { tier: T2, plain: '上面压住下面' },
    截脚: { tier: T2, plain: '下面绊住上面' },
    伏吟: { tier: T2, plain: '两处一模一样地重复' },
    旺衰: { tier: T2, plain: '力量大小的评估' },
    从格: { tier: T2, plain: '索性顺着强势一方走' },
    // —— T3：推演细节，L0/L1 不许出现
    神煞: { tier: T3, plain: '按固定规则挂上的星名' },
    纳音: { tier: T3, plain: '六十甲子的另一套叫法' },
    胎元: { tier: T3, plain: '受胎月份推出来的柱' },
    命宫: { tier: T3, plain: '另一套宫位算法' },
    旬空: { tier: T3, plain: '这一旬轮空的两个字' },
    空亡: { tier: T3, plain: '暂时使不上劲的位置' },
    羊刃: { tier: T3, plain: '极旺处的一把刀' },
    禄神: { tier: T3, plain: '本气落脚处' },
    天乙贵人: { tier: T3, plain: '常被当作贵人的星' },
    桃花: { tier: T3, plain: '人缘情缘的星名' },
    驿马: { tier: T3, plain: '走动迁移的星名' },
    魁罡: { tier: T3, plain: '刚烈性格的日柱组合' },
    华盖: { tier: T3, plain: '孤高才艺的星名' },
    孤辰: { tier: T3, plain: '独处的星名' },
    寡宿: { tier: T3, plain: '独处的星名' },
    红鸾: { tier: T3, plain: '婚恋的星名' },
    天喜: { tier: T3, plain: '喜事的星名' },
    将星: { tier: T3, plain: '统领气质的星名' },
    金舆: { tier: T3, plain: '车马安逸的星名' },
  },

  ziwei: {
    // —— T1
    命宫: { tier: T1, plain: '代表你本人的那一宫' },
    身宫: { tier: T1, plain: '后天着力点那一宫' },
    大限: { tier: T1, plain: '十年一段的宫位' },
    流年: { tier: T1, plain: '某一年的宫位' },
    四化: { tier: T1, plain: '禄权科忌四种变化' },
    化禄: { tier: T1, plain: '往顺、往多的方向变' },
    化权: { tier: T1, plain: '往掌控、硬推的方向变' },
    化科: { tier: T1, plain: '往名分、体面的方向变' },
    化忌: { tier: T1, plain: '往卡、往欠的方向变' },
    主星: { tier: T1, plain: '十四颗定调子的星' },
    辅星: { tier: T1, plain: '加分的配角星' },
    宫位: { tier: T1, plain: '十二个格子里的一格' },
    三方四正: { tier: T1, plain: '本宫加对面与两侧' },
    对宫: { tier: T1, plain: '正对面那一宫' },
    本命盘: { tier: T1, plain: '出生时定下的那张盘' },
    空宫: { tier: T1, plain: '这一宫没有主星' },
    借星: { tier: T1, plain: '空宫时借对宫的星' },
    格局: { tier: T1, plain: '星曜凑成的结构' },
    事业宫: { tier: T1, plain: '官禄那一格' },
    财帛宫: { tier: T1, plain: '钱这一格' },
    夫妻宫: { tier: T1, plain: '伴侣这一格' },
    迁移宫: { tier: T1, plain: '外出与外界这一格' },
    疾厄宫: { tier: T1, plain: '身体这一格' },
    福德宫: { tier: T1, plain: '心境与享受这一格' },
    庙旺: { tier: T1, plain: '星落在这格上得力' },
    落陷: { tier: T1, plain: '星落在这格上不得力' },
    // —— T2
    长生十二神: { tier: T2, plain: '按生老病死循环排的标记' },
    博士十二神: { tier: T2, plain: '按禄权科忌排的辅助标记' },
    将前诸星: { tier: T2, plain: '一组按年支排的辅星' },
    岁前诸星: { tier: T2, plain: '一组按年支排的辅星' },
    小限: { tier: T2, plain: '一年一宫的另一种走法' },
    斗君: { tier: T2, plain: '推月份起点的那个宫' },
    自化: { tier: T2, plain: '本宫天干自己带出的四化' },
    双星组合: { tier: T2, plain: '两颗主星同宫的搭配' },
    // —— T3：杂曜一律不进 L0/L1
    天哭: { tier: T3, plain: '杂曜' },
    天虚: { tier: T3, plain: '杂曜' },
    蜚廉: { tier: T3, plain: '杂曜' },
    破碎: { tier: T3, plain: '杂曜' },
    天空: { tier: T3, plain: '杂曜' },
    旬空: { tier: T3, plain: '轮空的两格' },
    截空: { tier: T3, plain: '截路空亡的格' },
    天伤: { tier: T3, plain: '杂曜' },
    天使: { tier: T3, plain: '杂曜' },
    天马: { tier: T3, plain: '走动的辅星' },
    红鸾: { tier: T3, plain: '婚恋的辅星' },
    天喜: { tier: T3, plain: '喜事的辅星' },
    三台: { tier: T3, plain: '成对的辅星' },
    八座: { tier: T3, plain: '成对的辅星' },
    恩光: { tier: T3, plain: '成对的辅星' },
    天贵: { tier: T3, plain: '成对的辅星' },
    孤辰: { tier: T3, plain: '独处的辅星' },
    寡宿: { tier: T3, plain: '独处的辅星' },
    龙池: { tier: T3, plain: '成对的辅星' },
    凤阁: { tier: T3, plain: '成对的辅星' },
  },

  liuyao: {
    // —— T1
    本卦: { tier: T1, plain: '起出来的这一卦' },
    变卦: { tier: T1, plain: '动爻变出来的那一卦' },
    世爻: { tier: T1, plain: '代表你自己的那一爻' },
    应爻: { tier: T1, plain: '代表对方或事的那一爻' },
    用神: { tier: T1, plain: '代表所问之事的那一爻' },
    动爻: { tier: T1, plain: '会变的那一爻' },
    静爻: { tier: T1, plain: '不起变化的那一爻' },
    月建: { tier: T1, plain: '这个月当令的那个字' },
    日辰: { tier: T1, plain: '起卦当天的那个字' },
    六亲: { tier: T1, plain: '父母兄弟子孙财官五类' },
    六神: { tier: T1, plain: '青龙到玄武六个标记' },
    伏神: { tier: T1, plain: '藏在本卦里没露头的那一爻' },
    旬空: { tier: T1, plain: '这一旬轮空的两个字' },
    应期: { tier: T1, plain: '大概什么时候见动静' },
    妻财: { tier: T1, plain: '钱与实物' },
    官鬼: { tier: T1, plain: '压力、职务、麻烦' },
    父母: { tier: T1, plain: '文书、房子、长辈' },
    子孙: { tier: T1, plain: '产出、晚辈、解忧' },
    兄弟: { tier: T1, plain: '同辈、花销、竞争' },
    卦辞: { tier: T1, plain: '这一卦的原话' },
    卦体: { tier: T1, plain: '整卦的整体形态' },
    旺相: { tier: T1, plain: '当令得气，力量足' },
    休囚: { tier: T1, plain: '不当令，力量弱' },
    得令: { tier: T1, plain: '占了当令的季节' },
    失令: { tier: T1, plain: '没占上当令' },
    // 六冲/六合是六爻第一层就要讲清的概念，用户不懂就整段读不动，按 T1 处理
    六冲: { tier: T1, plain: '六个爻两两相冲，散' },
    六合: { tier: T1, plain: '六个爻两两相合，拢' },
    // —— T2
    反吟: { tier: T2, plain: '变卦与本卦对着来' },
    进神: { tier: T2, plain: '往后走一步' },
    退神: { tier: T2, plain: '往回退一步' },
    暗动: { tier: T2, plain: '静爻被日辰冲动' },
    月破: { tier: T2, plain: '被月建冲破了' },
    日破: { tier: T2, plain: '被日辰冲破了' },
    入墓: { tier: T2, plain: '被收进去使不上劲' },
    合绊: { tier: T2, plain: '被合住动不了' },
    冲起: { tier: T2, plain: '被冲反而被激起来' },
    飞神: { tier: T2, plain: '露在外面的那一爻' },
    // —— T3
    游魂: { tier: T3, plain: '八宫游魂卦' },
    归魂: { tier: T3, plain: '八宫归魂卦' },
    卦身: { tier: T3, plain: '按世爻推的一个字' },
    太岁: { tier: T3, plain: '当年的那个字' },
    三刑: { tier: T3, plain: '三支互刑的组合' },
    六害: { tier: T3, plain: '六组相害' },
    间爻: { tier: T3, plain: '世应中间的两爻' },
    五墓: { tier: T3, plain: '按五行定的墓库' },
    纳甲: { tier: T3, plain: '给六爻配干支的规则' },
    月卦身: { tier: T3, plain: '按月推的卦身' },
    伏吟细目: { tier: T3, plain: '逐爻重复的清单' },
  },

  qimen: {
    // —— T1
    局: { tier: T1, plain: '这一时辰排出来的盘' },
    值符: { tier: T1, plain: '当下主事的那一颗' },
    值使: { tier: T1, plain: '当下当差的那一门' },
    用神: { tier: T1, plain: '代表所问之事的那一格' },
    日干: { tier: T1, plain: '代表你自己的天干' },
    时干: { tier: T1, plain: '代表所问之事的天干' },
    九宫: { tier: T1, plain: '三三排开的九格' },
    八门: { tier: T1, plain: '开门到死门八个门' },
    九星: { tier: T1, plain: '天蓬到天英九颗星' },
    八神: { tier: T1, plain: '值符到九天八个神' },
    落宫: { tier: T1, plain: '落在哪一格' },
    空亡: { tier: T1, plain: '暂时使不上劲的格' },
    马星: { tier: T1, plain: '主走动的那个字' },
    开门: { tier: T1, plain: '启动、开门办事' },
    休门: { tier: T1, plain: '等待、歇一歇' },
    生门: { tier: T1, plain: '生长、进账' },
    伤门: { tier: T1, plain: '损耗、硬碰' },
    杜门: { tier: T1, plain: '隐藏、堵住' },
    景门: { tier: T1, plain: '文书、显露' },
    死门: { tier: T1, plain: '停住、收尾' },
    惊门: { tier: T1, plain: '变动、口舌' },
    天干: { tier: T1, plain: '上面那排十个字' },
    地支: { tier: T1, plain: '下面那排十二个字' },
    时辰: { tier: T1, plain: '两个小时一段' },
    时效: { tier: T1, plain: '这件事管多久' },
    // —— T2
    门迫: { tier: T2, plain: '门克宫，别扭' },
    门制: { tier: T2, plain: '宫克门，被压' },
    宫生门: { tier: T2, plain: '环境推着门走' },
    门生宫: { tier: T2, plain: '门在往外给' },
    伏吟: { tier: T2, plain: '伏在原地不动' },
    反吟: { tier: T2, plain: '掉头往回走' },
    击刑: { tier: T2, plain: '自刑之位' },
    入墓: { tier: T2, plain: '收进去用不上' },
    三奇: { tier: T2, plain: '乙丙丁三个吉干' },
    六仪: { tier: T2, plain: '戊己庚辛壬癸' },
    // —— T3
    旬首: { tier: T3, plain: '这一旬的头一个字' },
    三元: { tier: T3, plain: '上中下三段' },
    超神接气: { tier: T3, plain: '节气与局的衔接法' },
    置闰: { tier: T3, plain: '补闰的一种排法' },
    拆补: { tier: T3, plain: '一种起局流派' },
    茅山: { tier: T3, plain: '一种起局流派' },
    寄宫: { tier: T3, plain: '中宫寄到别的宫' },
    五不遇时: { tier: T3, plain: '时干克日干' },
    暗干: { tier: T3, plain: '藏起来的干' },
    三遁: { tier: T3, plain: '天遁地遁人遁' },
  },

  tarot: {
    // —— T1
    大阿卡纳: { tier: T1, plain: '二十二张主牌' },
    小阿卡纳: { tier: T1, plain: '五十六张副牌' },
    正位: { tier: T1, plain: '牌面朝上' },
    逆位: { tier: T1, plain: '牌面倒过来' },
    牌阵: { tier: T1, plain: '抽牌的位置布局' },
    花色: { tier: T1, plain: '权杖圣杯宝剑星币' },
    元素: { tier: T1, plain: '火水土风四类' },
    牌位: { tier: T1, plain: '这一张占的位子' },
    主牌: { tier: T1, plain: '整组里定调的一张' },
    权杖: { tier: T1, plain: '火，行动与冲劲' },
    圣杯: { tier: T1, plain: '水，情感与关系' },
    宝剑: { tier: T1, plain: '风，思考与冲突' },
    星币: { tier: T1, plain: '土，钱与身体' },
    愚人: { tier: T1, plain: '从零开始那张' },
    魔术师: { tier: T1, plain: '手里有工具那张' },
    女祭司: { tier: T1, plain: '静观内省那张' },
    皇后: { tier: T1, plain: '滋养生长那张' },
    皇帝: { tier: T1, plain: '立规矩那张' },
    教皇: { tier: T1, plain: '传统与师承那张' },
    恋人: { tier: T1, plain: '抉择与结合那张' },
    战车: { tier: T1, plain: '硬推前进那张' },
    力量: { tier: T1, plain: '以柔制刚那张' },
    隐士: { tier: T1, plain: '独处琢磨那张' },
    命运之轮: { tier: T1, plain: '转折点那张' },
    正义: { tier: T1, plain: '算账平衡那张' },
    节制: { tier: T1, plain: '调和配比那张' },
    // —— T2
    宫廷牌: { tier: T2, plain: '侍从骑士王后国王' },
    数字牌: { tier: T2, plain: '一到十的进程牌' },
    愚人之旅: { tier: T2, plain: '二十二张连成的故事线' },
    灵数: { tier: T2, plain: '编号本身带的意思' },
    生命之树: { tier: T2, plain: '卡巴拉的层级图' },
    // —— T3
    黄道: { tier: T3, plain: '占星十二宫' },
    旬星: { tier: T3, plain: '十度分区' },
    质点: { tier: T3, plain: '卡巴拉十个节点' },
    路径: { tier: T3, plain: '生命之树的连线' },
    元素尊贵: { tier: T3, plain: '占星的尊贵表' },
    七行星: { tier: T3, plain: '古典七曜' },
  },
};

/**
 * 同义词组（每体系 ≥20 组）：同一件事的不同叫法，去重时并成一个 key。
 * 每组第一项是规范名。
 */
export const SYNONYM_GROUPS = {
  bazi: [
    ['身强', '偏强', '日主偏强', '身旺'],
    ['身弱', '偏弱', '日主偏弱', '身衰'],
    ['中和', '平衡', '强弱持平'],
    ['用神', '喜用', '用神取向', '喜用神'],
    ['忌神', '所忌'],
    ['大运', '运程', '十年大运'],
    ['流年', '当年运', '岁运'],
    ['月令', '月建', '月支当令'],
    ['调候', '调候用神', '寒暖燥湿'],
    ['格局', '格局类型', '命局结构'],
    ['财星', '财星力量'],
    ['官杀', '官星', '杀星'],
    ['印星', '印绶'],
    ['食伤', '食神伤官', '输出'],
    ['比劫', '比肩劫财', '同类'],
    ['通根', '有根', '根气'],
    ['得令', '当令', '占令'],
    ['得地', '有地', '地支支撑'],
    ['得势', '党众', '同类多'],
    ['病药', '有病有药', '病药法'],
    ['起运', '起运岁', '交运年龄'],
    ['交运', '换运', '运交'],
    ['旺衰', '力量对比', '力量大小'],
  ],
  ziwei: [
    ['命宫', '本命宫', '命垣'],
    ['身宫', '身垣', '后天宫'],
    ['大限', '大限宫', '十年大限'],
    ['流年', '流年宫', '岁限'],
    ['四化', '四化落点', '化象'],
    ['化禄', '化禄星'],
    ['化权', '化权星'],
    ['化科', '化科星'],
    ['化忌', '化忌星'],
    ['主星', '正曜', '十四主星'],
    ['辅星', '佐曜', '辅曜'],
    ['三方四正', '三方', '三合加对宫'],
    ['对宫', '迁移位', '对面宫'],
    ['空宫', '无正曜', '命无正曜'],
    ['借星', '借对宫', '借星安宫'],
    ['庙旺', '入庙', '得垣'],
    ['落陷', '失垣', '不得地'],
    ['格局', '命格', '星曜结构'],
    ['自化', '本宫自化', '宫干自化'],
    ['事业宫', '官禄宫', '事业位'],
    ['财帛宫', '财位', '财帛'],
    ['夫妻宫', '配偶宫', '婚姻宫'],
    ['疾厄宫', '身体宫', '疾厄'],
    ['福德宫', '心境宫', '福德'],
  ],
  liuyao: [
    ['六冲', '六冲卦', '卦逢六冲', '六冲之卦'],
    ['六合', '六合卦', '卦逢六合', '六合之卦'],
    ['本卦', '主卦', '本卦卦体'],
    ['变卦', '之卦', '变出之卦'],
    ['用神', '用爻', '所问之主'],
    ['世爻', '世位'],
    ['应爻', '应位'],
    ['动爻', '发动之爻'],
    ['静爻', '安静之爻'],
    ['月建', '月令', '月支'],
    ['日辰', '日建', '起卦之日'],
    ['旬空', '空亡', '落空'],
    ['应期', '成事时间', '见动静的时候'],
    ['伏神', '伏藏', '藏爻'],
    ['飞神', '飞爻', '露出之爻'],
    ['反吟', '反吟卦', '卦逢反吟'],
    ['伏吟', '伏吟卦', '卦逢伏吟'],
    ['进神', '化进'],
    ['退神', '化退'],
    ['月破', '逢月破', '被月冲破'],
    ['暗动', '暗动之爻', '静而被动'],
    ['旺相', '得气', '有气'],
    ['休囚', '失气', '无气'],
  ],
  qimen: [
    ['值符', '直符', '值符星'],
    ['值使', '直使', '值使门', '直使门'],
    ['用神', '用神宫', '所问之宫'],
    ['日干', '日干宫', '你这边'],
    ['时干', '时干宫', '事情那边'],
    ['九宫', '九宫格', '宫位'],
    ['八门', '门名'],
    ['九星', '星名'],
    ['八神', '神名'],
    ['落宫', '入宫', '所在宫'],
    ['空亡', '落空'],
    ['马星', '驿马', '动马'],
    ['门迫', '门被宫迫'],
    ['门制', '门受制'],
    ['宫生门', '宫生', '环境助推'],
    ['门生宫', '门生', '往外给'],
    ['伏吟', '伏吟局', '伏住'],
    ['反吟', '反吟局', '掉头'],
    ['击刑', '自刑'],
    ['入墓', '入墓库', '入库'],
    ['三奇', '三奇得使'],
    ['六仪', '六仪之干'],
    ['寄宫', '寄坤', '中宫寄'],
  ],
  tarot: [
    ['正位', '顺位', '牌面正立'],
    ['逆位', '倒位', '牌面倒立'],
    ['大阿卡纳', '大牌', 'major'],
    ['小阿卡纳', '小牌', 'minor'],
    ['牌阵', '阵型', '抽牌布局'],
    ['花色', 'suit', '四花色'],
    ['元素', '元素属性', '四元素'],
    ['权杖', '火元素'],
    ['圣杯', '水元素'],
    ['宝剑', '风元素'],
    ['星币', '土元素'],
    ['主牌', '核心牌', '定调牌'],
    ['牌位', '位置', '所居之位'],
    ['宫廷牌', '人牌', 'court'],
    ['数字牌', '点牌', 'pip'],
    ['愚人之旅', '大牌故事线', '旅程'],
    ['灵数', '编号义', '数字含义'],
    ['命运之轮', 'Wheel'],
    ['节制', '调和', 'Temperance'],
    ['力量', 'Strength', '刚柔'],
  ],
};

/** 按体系把词典摊平成「术语 → tier」和「tier → 术语列表」 */
const _index = new Map();

function indexOf(system) {
  const key = String(system || '');
  if (_index.has(key)) return _index.get(key);
  const dict = TERM_DICT[key] || {};
  const byTerm = new Map();
  const byTier = { T1: [], T2: [], T3: [] };
  for (const [term, meta] of Object.entries(dict)) {
    byTerm.set(term, meta);
    const bucket = byTier[meta.tier] || (byTier[meta.tier] = []);
    bucket.push(term);
  }
  // 长词先匹配：「六冲卦」不该被「六冲」吃掉
  for (const tier of Object.keys(byTier)) byTier[tier].sort((a, b) => b.length - a.length);
  const all = [...byTerm.keys()].sort((a, b) => b.length - a.length);
  // 扫描用的键：只要 TERM_DICT 里的真术语。同义词里有大量口语（门/星/往外给），
  // 拿它们去扫正文必然假阳性，所以同义词只供去重归一，不参与越界检测。
  const termsOnly = [...all];
  // 合并同义词进查找表：同义词没有独立白话时继承规范名的
  const synMap = new Map();
  const groups = SYNONYM_GROUPS[key] || [];
  for (const group of groups) {
    const canon = group[0];
    for (const word of group) {
      if (!synMap.has(word)) synMap.set(word, canon);
      if (!byTerm.has(word) && byTerm.has(canon)) byTerm.set(word, byTerm.get(canon));
    }
  }
  const out = { byTerm, byTier, termsOnly, all: [...new Set([...all, ...synMap.keys()])].sort((a, b) => b.length - a.length), synMap };
  _index.set(key, out);
  return out;
}

export function hasDict(system) {
  return !!TERM_DICT[String(system || '')];
}

/** 单术语的 tier；同义词回落到规范名的 tier；查不到返回 null */
export function termTier(system, term) {
  const ix = indexOf(system);
  const hit = ix.byTerm.get(term);
  if (hit) return hit.tier;
  const canon = ix.synMap.get(term);
  if (canon && ix.byTerm.has(canon)) return ix.byTerm.get(canon).tier;
  return null;
}

/** 单术语的白话（8–15 字）；查不到返回 '' */
export function termPlain(system, term) {
  const ix = indexOf(system);
  const hit = ix.byTerm.get(term);
  if (hit && hit.plain) return hit.plain;
  const canon = ix.synMap.get(term);
  if (canon && ix.byTerm.get(canon)) return ix.byTerm.get(canon).plain || '';
  return '';
}

export function termsByTier(system, tier) {
  const ix = indexOf(system);
  return (ix.byTier[tier] || []).slice();
}

export function dictSize(system) {
  return Object.keys(TERM_DICT[String(system || '')] || {}).length;
}

export function synonymGroupCount(system) {
  return (SYNONYM_GROUPS[String(system || '')] || []).length;
}

/**
 * 扫一段文本命中的术语，按最长优先、命中即挖掉（不重复计数）。
 * 返回 [{term, tier, at}]，at 是原文里的下标。
 */
export function scanTerms(system, text) {
  const src = String(text || '');
  if (!src) return [];
  const ix = indexOf(system);
  if (!ix.termsOnly.length) return [];
  const taken = new Array(src.length).fill(false);
  const hits = [];
  for (const term of ix.termsOnly) {
    if (!term) continue;
    let from = 0;
    for (;;) {
      const at = src.indexOf(term, from);
      if (at < 0) break;
      let free = true;
      for (let i = at; i < at + term.length; i += 1) if (taken[i]) { free = false; break; }
      if (free) {
        for (let i = at; i < at + term.length; i += 1) taken[i] = true;
        hits.push({ term, tier: termTier(system, term), at });
      }
      from = at + 1;
    }
  }
  return hits.sort((a, b) => a.at - b.at);
}

/** 只取 tier 命中的术语名（去重，按出现顺序） */
export function termsInText(system, text, tier) {
  const seen = new Set();
  const out = [];
  for (const h of scanTerms(system, text)) {
    if (tier && h.tier !== tier) continue;
    if (seen.has(h.term)) continue;
    seen.add(h.term);
    out.push(h.term);
  }
  return out;
}

/**
 * 术语归一：给因素名去同一件事的不同叫法。
 * 先查同义词表，再退到「去标点空格 + 去卦/局/宫等后缀」。
 */
export function synonymKey(system, name) {
  const raw = String(name == null ? '' : name).trim();
  if (!raw) return '';
  const ix = indexOf(system);
  if (ix.synMap.has(raw)) return ix.synMap.get(raw);
  const stripped = raw.replace(/[\s·、,，。.!！?？:：;；""''()（）【】\[\]]/g, '');
  if (ix.synMap.has(stripped)) return ix.synMap.get(stripped);
  // 因素名常带一层类别后缀（「用神状态」「佛神格局」这类），剥掉再查一次同义词表：
  // 否则同一件事会因为「加了两个字」而不被认成重复。
  const trimmed = stripped.replace(/(状态|格局|作用|落点|强弱|宫位|牌位|整体|窗口|力量)$/u, '');
  if (trimmed && trimmed !== stripped && ix.synMap.has(trimmed)) return ix.synMap.get(trimmed);
  return stripped;
}
