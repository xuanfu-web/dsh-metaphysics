// 塔罗牌：78 张（22 大阿卡纳 + 56 小阿卡纳），抽牌、牌阵与解读
//
// 逐张库（英文名、牌面图像、旬主星/旬座、生命树源质）在 engine/tarot-cards.js，
// 本文件只负责组牌、抽牌与解读；两侧共用同一份牌名，牌名对不上会直接测出来。
//
// 【流派说明】塔罗是一套象征系统，而非确定性预言。本文件采用：
//   · 牌名、编号、牌面：RWS（韦特）体系 —— 力量 = VIII、正义 = XI；
//     马赛体系里两者的编号相反（VIII 正义 / XI 力量），仅编号差异，牌义不变。
//   · 大牌元素：黄金黎明（Golden Dawn）对应；行星/星座按守护星关系互核（详见 tarot-cards.js 口径注释）。
//   · 小牌元素：权杖火、圣杯水、宝剑风、星币土（通行）；2-10 号牌另给三分相旬位，首牌给源质。
//   · 宫廷牌：只给花色元素，不给星座与主星——公开表里两套映射互相冲突，合并不成一句真话。
//   · 逆位读法：取「同一股力量未顺过来 / 用力过猛 / 内在化」三义，
//     不采用「逆位即纯凶」的流派；不同流派对逆位的取舍不同，此处取中性偏提醒。
// 以上差异在 reading 与结果字段 systemNote 中均有标注，避免被当作唯一正解。
import { CARD_LIB, CARD_COUNTS } from './tarot-cards.js';
import { fail } from './fail.js';
import { assertObject } from './validate.js';

const MAJOR = [
  ['愚者', '0', '新开始 冒险 纯真 无限可能', '鲁莽 逃避 原地打转 不切实际'],
  ['魔术师', 'I', '行动力 资源整合 化想法为现实 沟通', '夸大 操纵 能力未用 自欺'],
  ['女祭司', 'II', '直觉 潜意识 静观其变 内在智慧', '忽视直觉 秘密 表面化 失焦'],
  ['皇后', 'III', '丰盛 滋养 创造力 孕育', '过度依赖 停滞 消耗 空虚'],
  ['皇帝', 'IV', '秩序 权威 结构 掌控', '专断 僵化 失控 硬撑'],
  ['教皇', 'V', '传统 指导 信念 规范', '教条 反叛 形式主义 盲从'],
  ['恋人', 'VI', '结合 抉择 价值观一致 吸引', '失衡 犹豫 错误选择 貌合神离'],
  ['战车', 'VII', '意志 前进 掌控方向 胜利', '失控 方向不明 蛮干 内耗'],
  ['力量', 'VIII', '温柔的坚定 耐心 驯服 勇气', '自我怀疑 压抑 强撑 失衡'],
  ['隐者', 'IX', '内省 独处 寻求真理 沉淀', '孤立 逃避 封闭 钻牛角尖'],
  ['命运之轮', 'X', '转机 周期 因缘际会 顺势', '停滞 抗拒变化 重复循环 错位'],
  ['正义', 'XI', '公平 因果 权衡 决定', '偏颇 逃避责任 失衡 拖延'],
  ['倒吊人', 'XII', '暂停 换位 牺牲换取洞见 放下', '无谓牺牲 拖延 僵持 白费'],
  ['死神', 'XIII', '结束 转化 断舍离 重生', '抗拒结束 拖泥带水 停滞 恐惧'],
  ['节制', 'XIV', '调和 中道 耐心融合 疗愈', '失衡 极端 急躁 消耗'],
  ['恶魔', 'XV', '欲望 束缚 执念 现实交易', '挣脱 觉察 解除依赖 松绑'],
  ['高塔', 'XVI', '突变 崩塌 真相冲击 解放', '延迟的崩解 避免改变 余震 侥幸'],
  ['星星', 'XVII', '希望 疗愈 指引 长期信心', '失望 信心动摇 修复中 断线'],
  ['月亮', 'XVIII', '迷雾 潜意识 不安 幻象', '迷雾散去 真相浮现 释放 清醒'],
  ['太阳', 'XIX', '成功 光明 活力 坦率', '短暂阴霾 过度乐观 延迟 强颜'],
  ['审判', 'XX', '觉醒 召唤 重生 清算', '自我批判 拒绝面对 迟疑 旧账'],
  ['世界', 'XXI', '完成 圆满 整合 跨越', '未竟 收尾拖延 差一步 循环'],
];

// 与 MAJOR 同序：元素（黄金黎明行星/星座归属）＋ 15-30 字核心寓意
// 火＝白羊/狮子/射手/木星·火星·太阳；水＝巨蟹/天蝎/双鱼·月亮；风＝双子/天秤/水瓶·水星；
// 土＝金牛/处女/摩羯·金星·土星。「灵」为另一派把大牌整体视为灵性层面的说法，此处不用。
const MAJOR_EXT = [
  ['风', '一脚踏出悬崖也不怕，一切还没被定义'], // 愚者 · 天王星/风
  ['风', '手上的工具已经齐全，想法可以立刻变成现实'], // 魔术师 · 水星
  ['水', '答案还在水面之下，安静比追问更能接近它'], // 女祭司 · 月亮
  ['土', '先把自己养好，丰盛才会从你身上长出来'], // 皇后 · 金星
  ['火', '秩序与边界一旦建立，事情才有谈成的余地'], // 皇帝 · 白羊
  ['土', '旧有的规矩既是保护，也可能成为枷锁'], // 教皇 · 金牛
  ['风', '关系与选择都指向同一件事：你真正看重什么'], // 恋人 · 双子
  ['水', '方向定了就往前，意志是这段路的燃料'], // 战车 · 巨蟹
  ['火', '真正的力量不是压制，而是温柔地与之共处'], // 力量 · 狮子
  ['土', '退到无人处，是为了看清自己手里的那盏灯'], // 隐者 · 处女
  ['火', '周期自己会转，人能做的是在对的时点推一把'], // 命运之轮 · 木星
  ['风', '一切都有对价，愿意付的那部分才算公平'], // 正义 · 天秤
  ['水', '暂停不是失败，换个角度才看得见新的路'], // 倒吊人 · 海王星/水
  ['水', '结束必须真的结束，新的东西才有位置进来'], // 死神 · 天蝎
  ['火', '不偏不倚地调和，耐心把两种东西融成一种'], // 节制 · 射手
  ['土', '欲望本身不是问题，被它牵着走才是'], // 恶魔 · 摩羯
  ['火', '崩塌带走的是假的，剩下才是能重建的地基'], // 高塔 · 火星
  ['风', '在最暗的地方给出希望，方向感来自远方'], // 星星 · 水瓶
  ['水', '看不清的时候，先承认自己在迷雾里'], // 月亮 · 双鱼
  ['火', '结果本身会说话，坦率与明亮就是答案'], // 太阳 · 太阳
  ['火', '被点到名字的时候，要敢于回应并重新出发'], // 审判 · 冥王星/火
  ['土', '一个循环走完，才轮得到下一个开始'], // 世界 · 土星
];

const SUITS = [
  ['权杖', '火', '行动与热情', '冲动受阻'],
  ['圣杯', '水', '情感与关系', '情绪淤积'],
  ['宝剑', '风', '思维与冲突', '思虑过度'],
  ['星币', '土', '现实与资源', '务实停滞'],
];

// 小阿卡纳：花色 → 14 张 [名称, 正位关键词, 逆位关键词]
const MINOR = {
  权杖: [
    ['一', '灵感 起点 行动冲动', '方向未明 拖延 点火即灭'],
    ['二', '规划 远望 抉择', '犹豫 视野受限 迟迟不定'],
    ['三', '拓展 等待成果 布局', '进度延迟 变数 收成不佳'],
    ['四', '稳定 庆祝 归属', '不安 根基松动 表面和谐'],
    ['五', '竞争 摩擦 磨合', '内耗 息事宁人 回避冲突'],
    ['六', '胜利 认可 士气', '虚名 失落 名不副实'],
    ['七', '坚守 防御 立场', '疲于应付 退让 寡不敌众'],
    ['八', '迅速 消息 进展', '延误 混乱 节奏被打断'],
    ['九', '警觉 坚持到底 界限', '疲惫 疑心过重 戒备成疾'],
    ['十', '重担 责任 收尾', '卸下 崩溃边缘 超载'],
    ['侍从', '热忱 尝试 新消息', '热情短暂 难持久 三分钟热度'],
    ['骑士', '冒进 行动 冒险', '莽撞 半途而废 冲动'],
    ['王后', '自信 魅力 感染力', '善妒 自我怀疑 争胜'],
    ['国王', '领导 决断 魄力', '专横 急于求成 独断'],
  ],
  圣杯: [
    ['一', '情感萌发 直觉 新关系', '情感封闭 压抑 不敢投入'],
    ['二', '结合 互许 对等', '失衡 猜疑 貌合神离'],
    ['三', '欢庆 友谊 共享', '过度社交 疏离 流于热闹'],
    ['四', '倦怠 错过 停滞', '重新留意 转机 愿意接住'],
    ['五', '失落 遗憾 执念', '释怀 走出 重新接受'],
    ['六', '怀旧 童真 旧人', '沉溺过去 难放下 美化回忆'],
    ['七', '幻想 选项过多 白日梦', '看清现实 决断 收心'],
    ['八', '离开 寻找意义 转身', '难以割舍 徘徊 反复回头'],
    ['九', '满足 心愿达成 享受', '满足流于表面 贪婪 欲求不满'],
    ['十', '圆满 家庭 归属', '和谐流于表面 疏离 各怀心事'],
    ['侍从', '敏感 讯息 灵感', '情绪化 幼稚 玻璃心'],
    ['骑士', '浪漫 邀约 追寻', '承诺落空 空谈 忽冷忽热'],
    ['王后', '共情 包容 温柔', '情绪淹没 讨好 失去边界'],
    ['国王', '情绪掌控 成熟 稳定', '压抑 冷漠 情绪封锁'],
  ],
  宝剑: [
    ['一', '真相 突破 清晰', '混乱 误解 思绪打结'],
    ['二', '僵持 回避 权衡', '打破僵局 抉择 不得不选'],
    ['三', '心痛 分离 刺伤', '疗愈 放下 结痂'],
    ['四', '休息 恢复 沉淀', '勉强支撑 疲惫 恢复不足'],
    ['五', '争执 失利 代价', '和解 止损 认输'],
    ['六', '过渡 离开 前行', '滞留原地 难行 回头'],
    ['七', '策略 隐瞒 独行', '坦白 被识破 自食其果'],
    ['八', '自我束缚 限制 看不清', '松绑 看清出路 允许自己'],
    ['九', '焦虑 失眠 内耗', '恐惧渐退 松动 天亮了'],
    ['十', '终结 谷底 触底', '触底反弹 重启 止血'],
    ['侍从', '好奇 观察 求知', '口舌 轻率 想太多'],
    ['骑士', '直言 急进 冲撞', '鲁莽 伤人 唐突'],
    ['王后', '理性 明辨 独立', '尖刻 冷硬 苛责'],
    ['国王', '权威 判断 原则', '专断 苛刻 口不择言'],
  ],
  星币: [
    ['一', '务实开端 机会 落地', '错失 根基不稳 空谈'],
    ['二', '平衡 调度 灵活', '失衡 顾此失彼 分身乏术'],
    ['三', '协作 技艺 成果', '配合不畅 各自为政 返工'],
    ['四', '守成 保守 掌控', '松手 匮乏感 抓太紧'],
    ['五', '匮乏 困境 排外', '转机 援手 愿意求助'],
    ['六', '施与受 分享 公平', '付出失衡 计较 人情账'],
    ['七', '评估 耐心 等待', '急躁 白费 收成打折'],
    ['八', '精进 专注 学习', '敷衍 半途 走神'],
    ['九', '自足 丰盛 独立', '依附 虚耗 不配得感'],
    ['十', '基业 家族 长期', '家累 短视 根基松动'],
    ['侍从', '务实 学习 起步', '拖延 眼高手低 迟迟不动'],
    ['骑士', '稳步 推进 可靠', '停滞 保守 磨蹭'],
    ['王后', '照料 丰饶 务实', '操劳 控制 过度付出'],
    ['国王', '稳健 掌控 成果', '固执 贪利 油盐不进'],
  ],
};

const ROMAN = ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI'];

// 小牌牌阶：编号（A..10 / 宫廷）与数值 1..14，供排序与结构分析使用。
// 每张牌的核心寓意自 H3 起逐张撰写（engine/tarot-cards.js），不再按「牌阶」套通用句。
const RANK_META = {
  一: { number: 'A', value: 1 },
  二: { number: '2', value: 2 },
  三: { number: '3', value: 3 },
  四: { number: '4', value: 4 },
  五: { number: '5', value: 5 },
  六: { number: '6', value: 6 },
  七: { number: '7', value: 7 },
  八: { number: '8', value: 8 },
  九: { number: '9', value: 9 },
  十: { number: '10', value: 10 },
  侍从: { number: '侍从', value: 11 },
  骑士: { number: '骑士', value: 12 },
  王后: { number: '王后', value: 13 },
  国王: { number: '国王', value: 14 },
};

// 牌位：每个位带一句位义说明（positionHint）
const SPREADS = {
  1: [
    { name: '当下指引', hint: '此刻最该被看见、也最该被照做的那一点' },
  ],
  3: [
    { name: '过去', hint: '已经发生、仍在起作用的那部分' },
    { name: '现在', hint: '当下正在发生、你能直接触碰的局面' },
    { name: '未来', hint: '若维持当前走向，事情可能落到的位置' },
  ],
  5: [
    { name: '现状', hint: '眼下真实的地形与手上的资源' },
    { name: '阻碍', hint: '卡住进程、还没被命名的那个结' },
    { name: '建议', hint: '可以主动调整的方向与做法' },
    { name: '结果', hint: '按当前路径走下去的大致落点' },
    { name: '潜在', hint: '尚未浮出水面、却在暗中推动的部分' },
  ],
};

const COURT = ['侍从', '骑士', '王后', '国王'];
// 宫廷牌的「牌位」＝这个角色在牌阵里通常顶替的位置（人物 or 自身的一个侧面），
// 与占星无关，所以宫廷牌没有星座也照样能读。
const COURT_ROLE = { 侍从: '学徒与消息', 骑士: '推进与风格', 王后: '滋养与吸引', 国王: '掌控与承担' };
const ELEMENT_ORDER = ['火', '水', '风', '土'];
const ELEM_NAME = { 火: '热情与行动', 水: '情感与关系', 风: '思维与沟通', 土: '现实与资源' };
const ELEM_TIP = {
  火: '先做一件让自己动起来的小事，别等状态',
  水: '给情绪留出说话的时间，别急着讲道理',
  风: '把想法写下来再判断，别只在脑子里绕',
  土: '落成一个可执行的步骤，写明时间和预算',
};
const ELEM_WARN = {
  火: '容易过火，别把热情变成压人',
  水: '别被情绪淹没，先分清哪部分是自己的',
  风: '想得太多，记得回到事实和身体',
  土: '别太保守到错过窗口',
};

// 位义结合句：回答「这一位上的这张牌在提醒什么」
const POS_TAIL = {
  当下指引: '此刻能做的，就是照着这一面去调整今天的一个具体动作。',
  过去: '它已经发生，但余波仍在决定你现在怎么出手。',
  现在: '这是你此刻可以直接触碰、也可以调整的部分。',
  未来: '若维持现在的走法会往这里靠，但它还不是定局。',
  现状: '先把这一层看清楚，再谈要不要动。',
  阻碍: '它不一定在外面，很多时候是你不肯命名的那一部分。',
  建议: '这条可以当作接下来几天的小实验，而不是教条。',
  结果: '它是当前路径的延长线，换一条路径就会换落点。',
  潜在: '它还没浮出水面，却已经在左右你的选择。',
};

const SYSTEM_NOTE = '塔罗为象征系统，牌义与元素对应存在流派差异；此处采用 RWS（韦特）牌名/编号/牌面与黄金黎明的元素归属，仅供自我觉察与娱乐。'
  + '小牌 2-10 按三分相旬位补行星与星座，首牌只标生命树源质；宫廷牌在公开资料里有两套互相冲突的星座映射，故不给宫廷牌占星对应，只给角色定位。';

// 牌面元素对应：数字牌给「某星在某座某旬」，首牌给源质（它是该元素的根源，不落单一星座），
// 宫廷牌留空——两套公开映射互相冲突，口径见 SYSTEM_NOTE。
function astroOf(name) {
  const c = CARD_LIB[name];
  if (!c) return '';
  if (c.astro) return c.astro;
  return c.sephira ? `${c.sephira}·${c.el}之根源` : '';
}

// 逐张库规模（面板与测试用它核对「78 张都有图像、36 张有旬位」这类说法）
export const TAROT_STATS = CARD_COUNTS;

/** 牌面数据（大 22 + 小 56）：英文名、牌面图像、元素对应、核心寓意均来自逐张库 */
export function tarotDeck() {
  const deck = [];
  MAJOR.forEach(([name, numeral, up, down], i) => {
    const [element, core] = MAJOR_EXT[i];
    const lib = CARD_LIB[name];
    deck.push({
      name, arcana: '大阿卡纳', element, number: numeral, value: i, core, up, down,
      en: lib.en, sign: lib.sign, planet: lib.planet, astro: astroOf(name), image: lib.img,
    });
  });
  for (const [suit, element, domain] of SUITS) {
    for (const [rankCn, up, down] of MINOR[suit]) {
      const meta = RANK_META[rankCn];
      const lib = CARD_LIB[`${suit}${rankCn}`];
      const court = meta.value >= 11;
      deck.push({
        name: `${suit}${rankCn}`,
        arcana: '小阿卡纳',
        element,
        domain,
        suit,
        rank: meta.number,
        rankCn,
        number: meta.number,
        value: meta.value,
        core: lib.core,
        up,
        down,
        en: lib.en,
        image: lib.img,
        role: COURT_ROLE[rankCn] || '',
        sephira: lib.sephira,
        decan: lib.decan,
        sign: lib.sign,
        planet: court ? '' : lib.planet,
        astro: astroOf(`${suit}${rankCn}`),
      });
    }
  }
  return deck;
}

// 名称 → 牌面数据（解读时按名字回查，保证确定性、且不依赖调用方是否带全字段）
const BY_NAME = new Map(tarotDeck().map((c) => [c.name, c]));

// 外部手输/旧数据常见的另一种译名。只做显式别名，不做模糊匹配：
// 拼错的牌名不能被猜成另一张，否则解读会披着别的牌义，错得看不出来。
const CARD_ALIASES = { 愚人: '愚者' };
const cardMeta = (name) => BY_NAME.get(CARD_ALIASES[name] || name) || null;

const splitKeywords = (s) => String(s || '').split(/\s+/).filter(Boolean);

/** 抽牌时刻（只做记录，不影响牌面） */
function stamp(at) {
  if (typeof at === 'string' && at.trim()) return at.trim().replace('T', ' ').slice(0, 16);
  const d = new Date(); // allow-clock: 未传 asOf 时记录抽牌时刻；牌面由 seed 固定
  const p = (x) => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

/**
 * 生成解读（确定性：同样的 question + cards 必得同样的段落）
 * 段落数固定 6-8：开场 / 逐张（1-3 张各一段；5 张按 2+3 分两段）/ 结构 / 关键牌 / 建议 / 收尾
 */
export function tarotReading(input = {}) {
  assertObject(input, 'tarotReading 的参数', '{ question?, cards }：cards 用 drawTarot 抽出的牌面对象数组');
  const question = input.question;
  // cards 不是数组（字符串、对象）以前会被 filter 成空，回一句「没有抽到牌面」——
  // 那是参数形状错了，不是真的没牌。
  if (input.cards !== undefined && input.cards !== null && !Array.isArray(input.cards)) {
    throw fail('E_INPUT', `tarotReading 的 cards 必须是牌面对象数组（drawTarot 的 cards），收到 ${typeof input.cards}`);
  }
  const cards = input.cards;
  const q = String(question || '').trim();
  const list = (Array.isArray(cards) ? cards : []).filter((c) => c && c.name);
  const n = list.length;
  if (!n) return ['没有抽到牌面，无法解读。'];

  const names = list.map((c) => c.name).join(' / ');
  // 牌库外的牌名不能悄悄读成「空牌义」：开场点名是哪几张，逐张处退回正/逆位泛义。
  const unknown = list.map((c) => c.name).filter((name) => !cardMeta(name));
  const unknownNote = unknown.length
    ? `其中「${unknown.join('」「')}」不在韦特 78 张牌库里，这几张只按你给的位置与正逆位泛读，不补牌面、元素与占星对应。`
    : '';
  const paras = [];

  // ① 开场：所问 + 象征系统声明
  paras.push(q
    ? `你问的是「${q}」，抽到的是 ${n} 张牌阵（${names}）。塔罗是一套象征系统而不是判决：不同流派对牌义、编号与逆位的取舍略有差异，这里按 RWS（韦特）牌名与黄金黎明的元素对应来读，请把下面的话当作镜子，对照自己的处境取用。${unknownNote}`
    : `这次没有具体提问，那就先看牌面本身在说什么。牌阵 ${n} 张（${names}）。塔罗是象征系统，牌义随流派略有差异，这里按 RWS（韦特）与黄金黎明的常见对应来读，读到合用的部分就好。${unknownNote}`);

  // ② 逐张：位义 + 牌名/正逆 + 关键词 + 一句与位义结合的解读
  //    1-3 张时每张一段；4 张以上按前后两段分组（前段取 ceil(n/2) 张），
  //    保证总段数落在 6-8：1 张=6、2 张=7、3 张=8、≥4 张=7
  const idx = list.map((_, i) => i);
  const groups = n <= 3 ? idx.map((i) => [i]) : [idx.slice(0, Math.ceil(n / 2)), idx.slice(Math.ceil(n / 2))];
  for (const group of groups) {
    const lines = group.map((i) => {
      const c = list[i];
      const meta = cardMeta(c.name) || {};
      // 牌库外又没有关键词时，退回正/逆位的泛义，别留下「正位：。」的空句
      const kws = (c.keywords && c.keywords.length ? c.keywords : splitKeywords(c.upright ? meta.up : meta.down)).join('、')
        || (c.upright === false ? '逆位泛义（阻滞、内转或用力过头）' : '正位泛义（推进、显化、顺势）');
      const ori = c.upright === false ? '逆位' : '正位';
      const oriNote = c.upright === false
        ? '逆位并不等于凶，更像这股力量还没顺过来，或用力过了头'
        : '正位，这股力量目前是通的';
      const hint = c.positionHint || (SPREADS[n] && SPREADS[n][i] ? SPREADS[n][i].hint : '这一位要看的是它在你处境里的位置');
      // 牌面图像与元素对应来自逐张库：数字牌给「某星在某座某旬」，首牌给源质，
      // 宫廷牌没有占星可给，就把它顶的角色（学徒/推进/滋养/掌控）说出来。
      const img = meta.image ? `牌面上${meta.image}，` : '';
      const ast = meta.astro ? `它对应的占星位置是${meta.astro}，` : '';
      const role = !ast && meta.role ? `它在这里顶的是「${meta.role}」那个角色，` : '';
      const core = meta.core ? `它的核心是「${meta.core}」。` : '';
      const posName = c.position || `第 ${i + 1} 张`;
      const tail = POS_TAIL[c.position] || '把它放回你的处境里对照，看看哪一句戳中了你。';
      return `${posName}（${hint}）是「${c.name}」${ori}：${kws}。${img}${ast}${role}${core}${oriNote}。${tail}`;
    });
    paras.push(lines.join(''));
  }

  // ③ 结构分析：大牌占比、元素/花色分布、宫廷牌、正逆位比例
  const majorCount = list.filter((c) => c.arcana === '大阿卡纳').length;
  const revCount = list.filter((c) => c.upright === false).length;
  const upCount = n - revCount;
  const elementCount = {};
  for (const c of list) {
    const e = (cardMeta(c.name) || {}).element || c.element;
    if (e) elementCount[e] = (elementCount[e] || 0) + 1;
  }
  const present = ELEMENT_ORDER.filter((e) => elementCount[e]);
  const missing = ELEMENT_ORDER.filter((e) => !elementCount[e]);
  const dominant = present.slice().sort((a, b) => elementCount[b] - elementCount[a])[0];
  const heavy = dominant && elementCount[dominant] * 2 >= n;
  const majorHalf = majorCount * 2 >= n;
  const courtCount = list.filter((c) => COURT.includes(c.rank) || COURT.includes(c.rankCn)).length;
  const pct = Math.round((majorCount / n) * 100);
  const distribution = present.map((e) => `${e}×${elementCount[e]}`).join('、');
  paras.push([
    `${n} 张里有 ${majorCount} 张大阿卡纳（占 ${pct}%），${majorHalf
      ? '达到或超过半数，说明这是「主题层面的大事」，牵动的多半是方向与阶段，而不是细节执行'
      : '不到半数，重点更偏日常层面的推进，先看具体的人与事'}。`,
    `元素分布：${distribution || '无'}（大牌按黄金黎明的元素归属计入，仅作象征参考）；${missing.length
      ? `缺${missing.map((e) => `${e}（${ELEM_NAME[e]}）`).join('、')}，这一块容易被忽略`
      : '四种元素都在，配比还算均衡'}${heavy ? `。${dominant}偏旺，这股力量用得过头会压住别的部分` : ''}。`,
    `宫廷牌 ${courtCount} 张，${courtCount
      ? '说明局面里有具体的人（也可能是你某个侧面的状态）在推动'
      : '没有明显人格化的角色，事情更靠情势本身在走'}；正逆位 ${upCount} 正 ${revCount} 逆，${upCount > revCount
      ? '整体偏顺，逆位那张是全盘的关节'
      : upCount === revCount ? '顺逆各半，正处在拉扯与转换中' : '阻力偏多，先把卡住的部分读透，再谈推进'}。`,
  ].join(''));

  // ④ 关键牌：第一张大阿卡纳；若无则第一张逆位；两者都无则第一张
  const majorCard = list.find((c) => c.arcana === '大阿卡纳');
  const revCard = list.find((c) => c.upright === false);
  const key = majorCard || revCard || list[0];
  const keyMeta = cardMeta(key.name) || {};
  const keyReason = majorCard
    ? '它出现的地方，往往就是这件事真正被牵动的层级'
    : revCard
      ? '全盘没有大阿卡纳，关节就落在第一张逆位上——那股还没顺过来的力量'
      : '全盘既没有大阿卡纳也没有逆位，走势平顺，就以第一张为参照';
  const keyPos = key.position || `第 ${list.indexOf(key) + 1} 张`;
  paras.push(`全盘的关节是「${key.name}」（${keyPos}·${key.upright === false ? '逆位' : '正位'}）${keyMeta.core ? `，${keyMeta.core}` : ''}。${keyReason}；其余几张可以看作它在不同位置上的回声。`);

  // ⑤ 建议：据牌面给 2-3 条可执行的行动建议
  const tips = [];
  if (revCard) tips.push(`先把「${revCard.name}」逆位指出的卡点处理掉（${(revCard.keywords || []).join('、')}），暂时不要加码推进`);
  if (majorHalf) tips.push('把问题从「怎么办」换成「要不要」：先定方向，方法再慢慢补');
  else tips.push('把注意力放回能立刻做的小事上，先动一件，再看牌面怎么变');
  if (missing.length) tips.push(`补一点${missing[0]}的力量：${ELEM_TIP[missing[0]]}`);
  else if (heavy) tips.push(`${dominant}已经偏旺，${ELEM_WARN[dominant]}`);
  const adviceCard = list.find((c) => c.position === '建议');
  if (adviceCard) tips.push(`把「${adviceCard.name}」${adviceCard.upright === false ? '逆位' : '正位'}的关键词（${(adviceCard.keywords || []).join('、')}）当作接下来一周的小练习`);
  const picked = tips.slice(0, 3);
  paras.push(`建议：其一，${picked[0]}；其二，${picked[1]}${picked[2] ? `；其三，${picked[2]}` : ''}。`);

  // ⑥ 收尾：免责声明
  paras.push('牌是镜子，照出的是你此刻的状态与盲点，不是命运的判决书。涉及医疗、法律、财务等重大决定，请务必咨询对应的专业人士，牌面只用来帮你把问题问清楚。');

  return paras;
}

/** 抽牌：count 张，按牌阵给出位置。random 可注入（配合 seed 复现同一次抽牌） */
export function drawTarot(input = {}) {
  const { count: rawCount, question = '', at, random = Math.random } = input || {};
  let count = rawCount;
  if (count === undefined || count === null || count === '') count = 3;
  const n = Number(count);
  if (![1, 3, 5].includes(n)) {
    throw fail('E_INPUT', `塔罗张数只能是 1 / 3 / 5，收到「${count}」`);
  }
  const rand = typeof random === 'function' ? random : Math.random;
  const deck = tarotDeck();
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  const positions = SPREADS[n];
  const cards = deck.slice(0, n).map((c, i) => {
    const upright = rand() < 0.5;
    const pos = positions[i];
    return {
      position: pos.name,
      positionHint: pos.hint,
      name: c.name,
      arcana: c.arcana,
      element: c.element,
      ...(c.domain ? { domain: c.domain } : {}),
      ...(c.suit ? { suit: c.suit } : {}),
      number: c.number,
      ...(c.rank ? { rank: c.rank } : {}),
      ...(c.rankCn ? { rankCn: c.rankCn } : {}),
      value: c.value,
      core: c.core,
      en: c.en,
      image: c.image,
      // 空值不进结果：宫廷牌没有星座/主星，首牌没有旬位，别让字段带着空串冒充「已给出」
      ...(c.astro ? { astro: c.astro } : {}),
      ...(c.sephira ? { sephira: c.sephira } : {}),
      ...(c.decan ? { decan: c.decan } : {}),
      ...(c.role ? { role: c.role } : {}),
      ...(c.sign ? { sign: c.sign } : {}),
      ...(c.planet ? { planet: c.planet } : {}),
      upright,
      orientation: upright ? '正位' : '逆位',
      keywords: splitKeywords(upright ? c.up : c.down),
    };
  });
  // 直接调引擎时 question 可能是数字（工具层 schema 的 string 不做强转），
  // 以前 (123 || '').trim() 会抛裸 TypeError，整张牌只剩一句内部错误。
  const q = String(question == null ? '' : question).trim();
  return {
    system: 'tarot',
    question: q || null,
    castAt: stamp(at),
    spread: `${n} 张牌阵（${positions.map((p) => p.name).join(' / ')}）`,
    cards,
    reading: tarotReading({ question: q, cards }),
    systemNote: SYSTEM_NOTE,
  };
}

export { MAJOR, SUITS, MINOR, ROMAN, SPREADS };
