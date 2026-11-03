// 择日神煞宜忌层：底本《钦定协纪辨方书》（四库全书本）。
//
// 数据分三层：
//   1. 卷十一「用事」逐条宜忌清单——每个事项宜某神、忌某神，原文直接编码；
//   2. 卷四「建除十二神」、卷五/卷六「义例」、卷九「立成」的起法——按节气月与日干支
//      逐日推算当日命中哪些神煞；
//   3. 卷十「宜忌」的吉凶轻重六等与德神制化——六等判词逐字编码，德神能否解忌按卷十
//      各条的「遇德/犹忌」按语编码。
//
// 口径边界：六等判词是原文，吉/凶权重与比值阈值是本仓校准，不是古籍常数；卷十等第表按
// 「月支 × 日建除」逐格列等，本层只编码可逐条引证的判词与制化条件，未把整张表逐格数字化。
// 没有可靠起法的条目（土王用事后、血忌、伏社日、八风等）不参与计分，逐日列出 unsupported，
// 不猜、不补。卷四「建除同位异名」把福德/天巫/天喜/天医/土府等并入建除，本层照此归并，
// 同一建除日只计一次，避免一月破同时按「月破」「大耗」重复扣分。

const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const ZHIXING = ['建', '除', '满', '平', '定', '执', '破', '危', '成', '收', '开', '闭'];
const SEASON_OF = {
  寅: '春', 卯: '春', 辰: '春',
  巳: '夏', 午: '夏', 未: '夏',
  申: '秋', 酉: '秋', 戌: '秋',
  亥: '冬', 子: '冬', 丑: '冬',
};
const MONTH_NO = { 寅: 1, 卯: 2, 辰: 3, 巳: 4, 午: 5, 未: 6, 申: 7, 酉: 8, 戌: 9, 亥: 10, 子: 11, 丑: 12 };
const SANHE = {
  寅: '寅午戌', 午: '寅午戌', 戌: '寅午戌',
  亥: '亥卯未', 卯: '亥卯未', 未: '亥卯未',
  申: '申子辰', 子: '申子辰', 辰: '申子辰',
  巳: '巳酉丑', 酉: '巳酉丑', 丑: '巳酉丑',
};

// ── 卷四 建除十二神「同位异名」 ─────────────────────────────
// 建【兵福 小时 土府】、除【吉期 兵宝】、满【福德 天巫 天狗】、平【死神】、
// 定【时阴 官符 死气】、执【枝德 小耗】、破【大耗】、成【天医 天喜】、
// 收【…】、开【时阳 生气】、闭【血支】。天狗只作「申月戌日」的条件神煞，不并入满日。
export const XING_ALIAS = {
  建: ['建日', '兵福', '小时', '土府', '月建'],
  除: ['除日', '吉期', '兵宝'],
  满: ['满日', '福德', '天巫'],
  平: ['平日', '死神'],
  定: ['定日', '时阴', '官符', '死气'],
  执: ['执日', '枝德', '小耗'],
  破: ['破日', '大耗', '月破'],
  危: ['危日'],
  成: ['成日', '天医', '天喜'],
  收: ['收日'],
  开: ['开日', '时阳', '生气'],
  闭: ['闭日', '血支'],
};
const XING_NAME_MAP = {};
for (const [xing, names] of Object.entries(XING_ALIAS)) for (const n of names) XING_NAME_MAP[n] = xing;

// ── 卷五 义例三：月神起法 ───────────────────────────────────
// 天德：堪舆经「正月丁二月坤三月壬四月辛五月乾六月甲七月癸八月艮九月丙十月乙十一月巽十二月庚」。
// 四仲月（卯午酉子）天德居四维，无日可值，表中记 null。
const TIAN_DE = { 寅: '丁', 卯: null, 辰: '壬', 巳: '辛', 午: null, 未: '甲', 申: '癸', 酉: null, 戌: '丙', 亥: '乙', 子: null, 丑: '庚' };
// 天德合：历例「正月壬三月丁四月丙六月己七月戊九月辛十月庚十二月乙」。
const TIAN_DE_HE = { 寅: '壬', 卯: null, 辰: '丁', 巳: '丙', 午: null, 未: '己', 申: '戊', 酉: null, 戌: '辛', 亥: '庚', 子: null, 丑: '乙' };
// 月德：历例「正五九月在丙，二六十月在甲，三七十一月在壬，四八十二月在庚」。
const YUE_DE = { 寅: '丙', 卯: '甲', 辰: '壬', 巳: '庚', 午: '丙', 未: '甲', 申: '壬', 酉: '庚', 戌: '丙', 亥: '甲', 子: '壬', 丑: '庚' };
// 月德合：历例「正五九月在辛，二六十月在己，三七十一月在丁，四八十二月在乙」。
const YUE_DE_HE = { 寅: '辛', 卯: '己', 辰: '丁', 巳: '乙', 午: '辛', 未: '己', 申: '丁', 酉: '乙', 戌: '辛', 亥: '己', 子: '丁', 丑: '乙' };
// 月空：历例「寅午戌月壬，亥卯未月庚，申子辰月丙，巳酉丑月甲」。
const YUE_KONG = { 寅: '壬', 卯: '庚', 辰: '丙', 巳: '甲', 午: '壬', 未: '庚', 申: '丙', 酉: '甲', 戌: '壬', 亥: '庚', 子: '丙', 丑: '甲' };
// 天恩：历例「甲子至戊辰、己卯至癸未、己酉至癸丑，凡十五日」。
const TIAN_EN = ['甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己卯', '庚辰', '辛巳', '壬午', '癸未', '己酉', '庚戌', '辛亥', '壬子', '癸丑'];
// 天赦：历例「春戊寅，夏甲午，秋戊申，冬甲子」。
const SEASON_SHE = { 春: '戊寅', 夏: '甲午', 秋: '戊申', 冬: '甲子' };
// 天愿：卷五按语据神煞起例改正后的十二辰（原历例传写多误）。
const TIAN_YUAN = {
  寅: '乙亥', 卯: '甲戌', 辰: '乙酉', 巳: '丙申', 午: '丁未', 未: '戊午',
  申: '己巳', 酉: '庚辰', 戌: '辛卯', 亥: '壬寅', 子: '癸丑', 丑: '甲子',
};
// 母仓：历例「春亥子，夏寅卯，秋辰戌丑未，冬申酉」；土王后巳午未实现。
const SEASON_MU_CANG = { 春: ['亥', '子'], 夏: ['寅', '卯'], 秋: ['辰', '戌', '丑', '未'], 冬: ['申', '酉'] };
// 月恩：历例「正月丙、二月丁、三月庚、四月己、五月戊、六月辛、七月壬、八月癸、九月庚、十月乙、十一月甲、十二月辛」。
const YUE_EN = { 寅: '丙', 卯: '丁', 辰: '庚', 巳: '己', 午: '戊', 未: '辛', 申: '壬', 酉: '癸', 戌: '庚', 亥: '乙', 子: '甲', 丑: '辛' };
// 四相：历例「春丙丁，夏戊己，秋壬癸，冬甲乙」。
const SEASON_SI_XIANG = { 春: ['丙', '丁'], 夏: ['戊', '己'], 秋: ['壬', '癸'], 冬: ['甲', '乙'] };
// 时德：历例「春午，夏辰，秋子，冬寅」。
const SEASON_SHI_DE = { 春: '午', 夏: '辰', 秋: '子', 冬: '寅' };
// 王官守相民日：卷五按语从旧说，王日寅巳申亥、官日卯午酉子；守日从邵泰衢改正为辰未戌丑。
const SEASON_WANG = { 春: '寅', 夏: '巳', 秋: '申', 冬: '亥' };
const SEASON_GUAN = { 春: '卯', 夏: '午', 秋: '酉', 冬: '子' };
const SEASON_SHOU = { 春: '辰', 夏: '未', 秋: '戌', 冬: '丑' };
const SEASON_XIANG = { 春: '巳', 夏: '申', 秋: '亥', 冬: '寅' };
const SEASON_MIN = { 春: '午', 夏: '酉', 秋: '子', 冬: '卯' };
// 四击：通书「春戌，夏丑，秋辰，冬未」。
const SEASON_SI_JI = { 春: '戌', 夏: '丑', 秋: '辰', 冬: '未' };
// 九空：历例「正月在辰逆行四季」，曹震圭以三合墓冲释之。
const JIU_KONG = { 寅: '辰', 卯: '丑', 辰: '戌', 巳: '未', 午: '辰', 未: '丑', 申: '戌', 酉: '未', 戌: '辰', 亥: '丑', 子: '戌', 丑: '未' };
// 五墓：历例「正二月乙未，四五月丙戌，七八月辛丑，十月十一月壬辰，四季月戊辰」。
const WU_MU = { 寅: '乙未', 卯: '乙未', 辰: '戊辰', 巳: '丙戌', 午: '丙戌', 未: '戊辰', 申: '辛丑', 酉: '辛丑', 戌: '戊辰', 亥: '壬辰', 子: '壬辰', 丑: '戊辰' };
// 四耗：历例「春壬子，夏乙卯，秋戊午，冬辛酉」。
const SEASON_SI_HAO = { 春: ['壬子'], 夏: ['乙卯'], 秋: ['戊午'], 冬: ['辛酉'] };
// 四废：历例「春庚申辛酉，夏壬子癸亥，秋甲寅乙卯，冬丙午丁巳」。
const SEASON_SI_FEI = { 春: ['庚申', '辛酉'], 夏: ['壬子', '癸亥'], 秋: ['甲寅', '乙卯'], 冬: ['丙午', '丁巳'] };
// 四忌：神煞起例「春甲子，夏丙子，秋庚子，冬壬子」。
const SEASON_SI_JI4 = { 春: ['甲子'], 夏: ['丙子'], 秋: ['庚子'], 冬: ['壬子'] };
// 四穷：历例「春乙亥，夏丁亥，秋辛亥，冬癸亥」。
const SEASON_SI_QIONG = { 春: ['乙亥'], 夏: ['丁亥'], 秋: ['辛亥'], 冬: ['癸亥'] };
// 九坎/九焦：历例「正月在辰逆行四季，五月在卯逆行四仲，九月在寅逆行四孟」。
const JIU_KAN = { 寅: '辰', 卯: '丑', 辰: '戌', 巳: '未', 午: '卯', 未: '子', 申: '酉', 酉: '午', 戌: '寅', 亥: '亥', 子: '申', 丑: '巳' };
// 五虚：历例「春巳酉丑，夏申子辰，秋亥卯未，冬寅午戌」。
const SEASON_WU_XU = { 春: ['巳', '酉', '丑'], 夏: ['申', '子', '辰'], 秋: ['亥', '卯', '未'], 冬: ['寅', '午', '戌'] };
// 触水龙：丙子、癸丑、癸未。
const CHU_SHUI_LONG = ['丙子', '癸丑', '癸未'];
// 八专：曾门经「丁未、己未、庚申、甲寅、癸丑」。
const BA_ZHUAN = ['丁未', '己未', '庚申', '甲寅', '癸丑'];
// 无禄：通书十日「甲辰乙巳庚辰辛巳丙申戊戌丁亥己丑壬申癸亥」。
const WU_LU = ['甲辰', '乙巳', '庚辰', '辛巳', '丙申', '戊戌', '丁亥', '己丑', '壬申', '癸亥'];
// 重日：己亥。
const CHONG_RI = ['己亥'];
// 五合：寅卯日；五离/除神：申酉日（卷五）。
// 解神：历例「正二月申，三四月戌，五六月子，七八月寅，九十月辰，十一月十二月午」。
const JIE_SHEN = { 寅: '申', 卯: '申', 辰: '戌', 巳: '戌', 午: '子', 未: '子', 申: '寅', 酉: '寅', 戌: '辰', 亥: '辰', 子: '午', 丑: '午' };
// 复日：历例「正七月甲庚，二八月乙辛，四十月丙壬，五十一月丁癸，三九六十二月戊己」。
const FU_RI = {
  寅: ['甲', '庚'], 卯: ['乙', '辛'], 辰: ['戊', '己'], 巳: ['丙', '壬'], 午: ['丁', '癸'], 未: ['戊', '己'],
  申: ['甲', '庚'], 酉: ['乙', '辛'], 戌: ['戊', '己'], 亥: ['丙', '壬'], 子: ['丁', '癸'], 丑: ['戊', '己'],
};
// 鸣吠十三日、鸣吠对十一日：卷五按语据神煞起例改正（通书旧本有误）。
const MING_FEI = ['甲午', '丙午', '庚午', '壬午', '甲申', '丙申', '庚申', '壬申', '乙酉', '丁酉', '己酉', '辛酉', '癸酉'];
const MING_FEI_DUI = ['丙子', '庚子', '壬子', '甲寅', '丙寅', '庚寅', '壬寅', '乙卯', '丁卯', '辛卯', '癸卯'];

// ── 卷六 义例四：月神起法 ───────────────────────────────────
// 三合：日支落在月建三合局的另外两支。
// 临日：历例「正月午、二月亥、三月申、四月丑、五月戌、六月卯、七月子、八月巳、九月寅、十月未、十一月辰、十二月酉」。
const LIN_RI = { 寅: '午', 卯: '亥', 辰: '申', 巳: '丑', 午: '戌', 未: '卯', 申: '子', 酉: '巳', 戌: '寅', 亥: '未', 子: '辰', 丑: '酉' };
// 驿马：正月起申逆行四孟；天后同位。
const YI_MA = { 寅: '申', 卯: '巳', 辰: '寅', 巳: '亥', 午: '申', 未: '巳', 申: '寅', 酉: '亥', 戌: '申', 亥: '巳', 子: '寅', 丑: '亥' };
// 劫煞：正月起亥逆行四孟。
const JIE_SHA = { 寅: '亥', 卯: '申', 辰: '巳', 巳: '寅', 午: '亥', 未: '申', 申: '巳', 酉: '寅', 戌: '亥', 亥: '申', 子: '巳', 丑: '寅' };
// 灾煞：正月起子逆行四仲（卷六按语从曹震圭说）。
const ZAI_SHA = { 寅: '子', 卯: '酉', 辰: '午', 巳: '卯', 午: '子', 未: '酉', 申: '午', 酉: '卯', 戌: '子', 亥: '酉', 子: '午', 丑: '卯' };
// 月煞/月虚：正月起丑逆行四季。
const YUE_SHA = { 寅: '丑', 卯: '戌', 辰: '未', 巳: '辰', 午: '丑', 未: '戌', 申: '未', 酉: '辰', 戌: '丑', 亥: '戌', 子: '未', 丑: '辰' };
// 月刑：与岁刑同（三刑）。
const YUE_XING = { 寅: '巳', 卯: '子', 辰: '辰', 巳: '申', 午: '午', 未: '丑', 申: '寅', 酉: '酉', 戌: '未', 亥: '亥', 子: '卯', 丑: '戌' };
// 月害：正月起巳逆行十二辰。
const YUE_HAI = { 寅: '巳', 卯: '辰', 辰: '卯', 巳: '寅', 午: '丑', 未: '子', 申: '亥', 酉: '戌', 戌: '酉', 亥: '申', 子: '未', 丑: '午' };
// 大时/大败/咸池：正月起卯逆行四仲。
const DA_SHI = { 寅: '卯', 卯: '子', 辰: '酉', 巳: '午', 午: '卯', 未: '子', 申: '酉', 酉: '午', 戌: '卯', 亥: '子', 子: '酉', 丑: '午' };
// 游祸：正月起巳逆行四孟。
const YOU_HUO = { 寅: '巳', 卯: '寅', 辰: '亥', 巳: '申', 午: '巳', 未: '寅', 申: '亥', 酉: '申', 戌: '巳', 亥: '寅', 子: '亥', 丑: '申' };
// 天吏：正月起酉逆行四仲。
const TIAN_LI = { 寅: '酉', 卯: '午', 辰: '卯', 巳: '子', 午: '酉', 未: '午', 申: '卯', 酉: '子', 戌: '酉', 亥: '午', 子: '卯', 丑: '子' };
// 六合：正月在亥逆行十二辰。
const LIU_HE = { 寅: '亥', 卯: '戌', 辰: '酉', 巳: '申', 午: '未', 未: '午', 申: '巳', 酉: '辰', 戌: '卯', 亥: '寅', 子: '丑', 丑: '子' };
// 五富：正月起亥顺行四孟。
const WU_FU = { 寅: '亥', 卯: '寅', 辰: '巳', 巳: '申', 午: '亥', 未: '寅', 申: '巳', 酉: '申', 戌: '亥', 亥: '寅', 子: '巳', 丑: '申' };
// 天仓：正月起寅逆行十二辰。
const TIAN_CANG = { 寅: '寅', 卯: '丑', 辰: '子', 巳: '亥', 午: '戌', 未: '酉', 申: '申', 酉: '未', 戌: '午', 亥: '巳', 子: '辰', 丑: '卯' };
// 天贼：正月在丑逆行十二辰。
const TIAN_ZEI = { 寅: '丑', 卯: '子', 辰: '亥', 巳: '戌', 午: '酉', 未: '申', 申: '未', 酉: '午', 戌: '巳', 亥: '辰', 子: '卯', 丑: '寅' };
// 要安、玉宇、金堂、敬安、普护、福生、圣心、益后、续世：九神逐月表。
const YAO_AN = { 寅: '寅', 卯: '申', 辰: '卯', 巳: '酉', 午: '辰', 未: '戌', 申: '巳', 酉: '亥', 戌: '午', 亥: '子', 子: '未', 丑: '丑' };
const YU_YU = { 寅: '卯', 卯: '酉', 辰: '辰', 巳: '戌', 午: '巳', 未: '亥', 申: '午', 酉: '子', 戌: '未', 亥: '丑', 子: '申', 丑: '寅' };
const JIN_TANG = { 寅: '辰', 卯: '戌', 辰: '巳', 巳: '亥', 午: '午', 未: '子', 申: '未', 酉: '丑', 戌: '申', 亥: '寅', 子: '酉', 丑: '卯' };
const JING_AN = { 寅: '未', 卯: '丑', 辰: '申', 巳: '寅', 午: '酉', 未: '卯', 申: '戌', 酉: '辰', 戌: '亥', 亥: '巳', 子: '子', 丑: '午' };
const PU_HU = { 寅: '申', 卯: '寅', 辰: '酉', 巳: '卯', 午: '戌', 未: '辰', 申: '亥', 酉: '巳', 戌: '子', 亥: '午', 子: '丑', 丑: '未' };
const FU_SHENG = { 寅: '酉', 卯: '卯', 辰: '戌', 巳: '辰', 午: '亥', 未: '巳', 申: '子', 酉: '午', 戌: '丑', 亥: '未', 子: '寅', 丑: '申' };
const SHENG_XIN = { 寅: '亥', 卯: '巳', 辰: '子', 巳: '午', 午: '丑', 未: '未', 申: '寅', 酉: '申', 戌: '卯', 亥: '酉', 子: '辰', 丑: '戌' };
const YI_HOU = { 寅: '子', 卯: '午', 辰: '丑', 巳: '未', 午: '寅', 未: '申', 申: '卯', 酉: '酉', 戌: '辰', 亥: '戌', 子: '巳', 丑: '亥' };
const XU_SHI = { 寅: '丑', 卯: '未', 辰: '寅', 巳: '申', 午: '卯', 未: '酉', 申: '辰', 酉: '戌', 戌: '巳', 亥: '亥', 子: '午', 丑: '子' };
// 阳德：正月起戌顺行六阳辰；阴德：正月起酉逆行六阴辰。
const YANG_DE = { 寅: '戌', 卯: '子', 辰: '寅', 巳: '辰', 午: '午', 未: '申', 申: '戌', 酉: '子', 戌: '寅', 亥: '辰', 子: '午', 丑: '申' };
const YIN_DE = { 寅: '酉', 卯: '未', 辰: '巳', 巳: '卯', 午: '丑', 未: '亥', 申: '酉', 酉: '未', 戌: '巳', 亥: '卯', 子: '丑', 丑: '亥' };
// 天马：正月起午顺行六阳辰；兵禁：正月起寅逆行六阳辰。
const TIAN_MA = { 寅: '午', 卯: '申', 辰: '戌', 巳: '子', 午: '寅', 未: '辰', 申: '午', 酉: '申', 戌: '戌', 亥: '子', 子: '寅', 丑: '辰' };
const BING_JIN = { 寅: '寅', 卯: '子', 辰: '戌', 巳: '申', 午: '午', 未: '辰', 申: '寅', 酉: '子', 戌: '戌', 亥: '申', 子: '午', 丑: '辰' };
// 地囊：卷六按语据纳甲改正后的逐月两日。
const DI_NANG = {
  寅: ['庚子', '庚午'], 卯: ['乙未', '癸丑'], 辰: ['甲子', '壬午'], 巳: ['己卯', '己酉'],
  午: ['壬戌', '甲辰'], 未: ['丙辰', '丙戌'], 申: ['丁巳', '丁亥'], 酉: ['丙寅', '丙申'],
  戌: ['辛丑', '辛未'], 亥: ['戊寅', '戊申'], 子: ['辛卯', '辛酉'], 丑: ['癸酉', '乙卯'],
};
// 土符：正月丑、二月巳、三月酉、四月寅、五月午、六月戌、七月卯、八月未、九月亥、十月辰、十一月申、十二月子。
const TU_FU = { 寅: '丑', 卯: '巳', 辰: '酉', 巳: '寅', 午: '午', 未: '戌', 申: '卯', 酉: '未', 戌: '亥', 亥: '辰', 子: '申', 丑: '子' };
// 大煞：正月戌、二月巳、三月午、四月未、五月寅、六月卯、七月辰、八月亥、九月子、十月丑、十一月申、十二月酉。
const DA_SHA = { 寅: '戌', 卯: '巳', 辰: '午', 巳: '未', 午: '寅', 未: '卯', 申: '辰', 酉: '亥', 戌: '子', 亥: '丑', 子: '申', 丑: '酉' };
// 归忌：孟月丑、仲月寅、季月子。
// 往亡：正月寅、二月巳、三月申、四月亥、五月卯、六月午、七月酉、八月子、九月辰、十月未、十一月戌、十二月丑。
const WANG_WANG = { 寅: '寅', 卯: '巳', 辰: '申', 巳: '亥', 午: '卯', 未: '午', 申: '酉', 酉: '子', 戌: '辰', 亥: '未', 子: '戌', 丑: '丑' };
// 月厌/地火：正月在戌逆行十二辰；厌对/六仪/招摇：正月起辰逆行十二辰。
const YUE_YAN = { 寅: '戌', 卯: '酉', 辰: '申', 巳: '未', 午: '午', 未: '巳', 申: '辰', 酉: '卯', 戌: '寅', 亥: '丑', 子: '子', 丑: '亥' };
const YAN_DUI = { 寅: '辰', 卯: '卯', 辰: '寅', 巳: '丑', 午: '子', 未: '亥', 申: '戌', 酉: '酉', 戌: '申', 亥: '未', 子: '午', 丑: '巳' };
// 天火：正月在子顺行四仲。
const TIAN_HUO = { 寅: '子', 卯: '卯', 辰: '午', 巳: '酉', 午: '子', 未: '卯', 申: '午', 酉: '酉', 戌: '子', 亥: '卯', 子: '午', 丑: '酉' };

// ── 卷四 阴阳不将：历例逐月日表 ─────────────────────────────
const BU_JIANG = {
  寅: ['辛亥', '辛丑', '辛卯', '庚子', '庚寅', '己亥', '己丑', '己卯', '丁亥', '丁丑', '丁卯', '丙子', '丙寅'],
  卯: ['庚戌', '庚子', '庚寅', '己亥', '己丑', '丁亥', '丁丑', '丙戌', '丙子', '丙寅', '乙亥', '乙丑'],
  辰: ['己酉', '己亥', '己丑', '丁酉', '丁亥', '丁丑', '丙戌', '丙子', '乙酉', '乙亥', '乙丑', '甲戌', '甲子'],
  巳: ['丁酉', '丁亥', '丙申', '丙戌', '丙子', '乙酉', '乙亥', '甲申', '甲戌', '甲子', '戊申', '戊戌', '戊子'],
  午: ['丙申', '丙戌', '乙未', '乙酉', '乙亥', '甲申', '甲戌', '戊申', '戊戌', '癸未', '癸酉', '癸亥'],
  未: ['乙未', '乙酉', '甲午', '甲申', '甲戌', '戊午', '戊申', '戊戌', '癸未', '癸酉', '壬午', '壬申', '壬戌'],
  申: ['乙巳', '乙未', '乙酉', '甲午', '甲申', '戊午', '戊申', '癸巳', '癸未', '癸酉', '壬午', '壬申'],
  酉: ['甲辰', '甲午', '甲申', '戊辰', '戊午', '戊申', '癸巳', '癸未', '壬辰', '壬午', '壬申', '辛巳', '辛未'],
  戌: ['戊辰', '戊午', '癸卯', '癸巳', '癸未', '壬辰', '壬午', '辛卯', '辛巳', '辛未', '庚辰', '庚午'],
  亥: ['癸卯', '癸巳', '壬寅', '壬辰', '壬午', '辛卯', '辛巳', '庚寅', '庚辰', '庚午', '己卯', '己巳'],
  子: ['壬寅', '壬辰', '辛丑', '辛卯', '辛巳', '庚寅', '庚辰', '己丑', '己卯', '己巳', '丁丑', '丁卯', '丁巳'],
  丑: ['辛丑', '辛卯', '庚子', '庚寅', '庚辰', '己丑', '己卯', '丁丑', '丁卯', '丙子', '丙寅', '丙辰'],
};

// ── 卷十一 用事：逐条宜忌（原文按顺序编码，已把「防」还原为「护」等异体） ──
export const SHENSHA_LISTS = {
  祭祀: {
    use: ['天德', '月德', '天德合', '月德合', '天赦', '天愿', '月恩', '四相', '时德', '天巫', '开日', '普护', '福生', '圣心', '益后', '续世'],
    avoid: ['天狗', '寅日'],
  },
  宴会: {
    use: ['天德', '月德', '天德合', '月德合', '天恩', '天赦', '天愿', '月恩', '四相', '时德', '王日', '民日', '三合', '福德', '天喜', '开日', '六合', '五合'],
    avoid: ['月破', '平日', '收日', '闭日', '劫煞', '灾煞', '月煞', '月刑', '月害', '月厌', '四废', '五离', '酉日'],
  },
  开市: {
    use: ['天愿', '民日', '满日', '成日', '开日', '五富'],
    avoid: ['月破', '大耗', '平日', '收日', '闭日', '劫煞', '灾煞', '月煞', '月刑', '月害', '月厌', '大时', '天吏', '小耗', '四耗', '四废', '四穷', '五墓', '九空'],
  },
  立券交易: {
    use: ['天愿', '民日', '三合', '满日', '六合', '五富', '五合'],
    avoid: ['月破', '大耗', '平日', '收日', '劫煞', '灾煞', '月煞', '月刑', '月害', '月厌', '大时', '天吏', '小耗', '四耗', '四废', '四穷', '五墓', '九空', '五离'],
  },
  纳财: {
    use: ['母仓', '天愿', '月恩', '四相', '时德', '民日', '三合', '满日', '收日', '六合', '五富', '天仓'],
    avoid: ['月破', '大耗', '平日', '劫煞', '灾煞', '月煞', '月刑', '月害', '月厌', '大时', '天吏', '小耗', '四耗', '四废', '四穷', '九空'],
  },
  般移: {
    use: ['天德', '月德', '天德合', '月德合', '天赦', '天愿', '月恩', '四相', '时德', '民日', '驿马', '天马', '成日', '开日'],
    avoid: ['月破', '平日', '收日', '闭日', '劫煞', '灾煞', '月煞', '月刑', '月厌', '大时', '天吏', '四废', '五墓', '归忌', '往亡'],
  },
  兴造动土: {
    use: ['天德', '月德', '天德合', '月德合', '天赦', '天愿', '月恩', '四相', '时德', '三合', '开日'],
    avoid: ['月建', '土府', '月破', '平日', '收日', '闭日', '劫煞', '灾煞', '月煞', '月刑', '月厌', '大时', '天吏', '四废', '五墓', '土符', '地囊', '土王用事后'],
  },
  安葬: {
    use: ['天德', '月德', '天德合', '月德合', '天赦', '天愿', '六合', '鸣吠'],
    avoid: ['月建', '月破', '平日', '收日', '劫煞', '灾煞', '月煞', '月刑', '月害', '月厌', '四废', '四忌', '四穷', '五墓', '复日', '重日'],
  },
  破土: {
    use: ['鸣吠', '鸣吠对'],
    avoid: ['月建', '土府', '月破', '平日', '收日', '劫煞', '灾煞', '月煞', '月刑', '月害', '月厌', '四废', '五墓', '土符', '地囊', '复日', '重日', '土王用事后'],
  },
  行幸遣使: {
    use: ['天德', '月德', '天德合', '月德合', '天赦', '天愿', '月恩', '四相', '时德', '王日', '驿马', '天马', '建日', '吉期', '天喜', '开日'],
    avoid: ['月破', '平日', '收日', '闭日', '劫煞', '灾煞', '月煞', '月刑', '月厌', '大时', '天吏', '天贼', '四废', '五墓', '往亡', '巳日'],
  },
  上官赴任: {
    use: ['天德', '月德', '天德合', '月德合', '天赦', '天愿', '月恩', '四相', '时德', '王日', '官日', '守日', '相日', '临日', '建日', '吉期', '天喜', '开日'],
    avoid: ['月破', '平日', '收日', '满日', '闭日', '劫煞', '灾煞', '月煞', '月刑', '月厌', '大时', '天吏', '四废', '五墓', '往亡'],
  },
  结婚姻: {
    use: ['天德', '月德', '天德合', '月德合', '天赦', '天愿', '月恩', '四相', '时德', '民日', '三合', '天喜', '六合', '五合'],
    avoid: ['月建', '月破', '平日', '收日', '满日', '闭日', '劫煞', '灾煞', '月煞', '月刑', '月害', '月厌', '大时', '天吏', '四废', '四忌', '四穷', '五墓', '五离', '八专'],
  },
  纳采问名: {
    use: ['天德', '月德', '天德合', '月德合', '天赦', '天愿', '月恩', '四相', '时德', '民日', '三合', '天喜'],
    avoid: ['月建', '月破', '平日', '收日', '满日', '闭日', '劫煞', '灾煞', '月煞', '月刑', '月害', '月厌', '大时', '天吏', '四废', '四忌', '四穷', '五墓', '五离', '八专'],
  },
  嫁娶: {
    use: ['天德', '月德', '天德合', '月德合', '天赦', '天愿', '三合', '天喜', '六合', '不将'],
    avoid: ['月破', '平日', '收日', '闭日', '劫煞', '灾煞', '月煞', '月刑', '月害', '月厌', '厌对', '大时', '天吏', '四废', '四忌', '四穷', '五墓', '往亡', '八专', '亥日'],
  },
  求医疗病: {
    use: ['天德', '月德', '天德合', '月德合', '天赦', '月恩', '四相', '时德', '天后', '除日', '破日', '天医', '开日', '解神', '除神'],
    avoid: ['月建', '平日', '死神', '收日', '满日', '闭日', '劫煞', '灾煞', '月煞', '月刑', '月害', '月厌', '大时', '游祸', '天吏', '死气', '四废', '五墓', '往亡', '未日', '每月十五日', '朔望日'],
  },
  入学: {
    use: ['成日', '开日'],
    avoid: [],
  },
};

/** 事项 → 卷十一条目（一个事项可对应多条，如安葬兼看破土）。 */
export const TASK_ENTRIES = {
  嫁娶: ['嫁娶'],
  订婚: ['纳采问名'],
  领证: ['结婚姻'],
  提亲: ['纳采问名'],
  收送聘金: ['纳采问名'],
  满月酒: ['祭祀', '宴会'],
  开业: ['开市'],
  交易: ['立券交易'],
  投资: ['纳财'],
  签订合同: ['立券交易'],
  签约: ['立券交易'],
  纳财: ['纳财'],
  入宅: ['般移'],
  搬家: ['般移'],
  搬家入宅: ['般移'],
  动土: ['兴造动土'],
  装修: ['兴造动土'],
  装修建造: ['兴造动土'],
  试车买车: ['立券交易'],
  安葬: ['安葬', '破土'],
  出行: ['行幸遣使'],
  旅行: ['行幸遣使'],
  赴任: ['上官赴任'],
  访亲友: ['宴会'],
  入学: ['入学'],
  祭祀: ['祭祀'],
  求医: ['求医疗病'],
};

/** 已实现起法的神煞名（含别名）。名单外又出现在卷十一清单里的，记入 unsupported。 */
const KNOWN_SHENSHA = new Set([
  '天德', '月德', '天德合', '月德合', '月空', '天恩', '天赦', '天愿', '母仓', '月恩', '四相', '时德',
  '王日', '官日', '守日', '相日', '民日', '四击', '九空', '五墓', '四耗', '四废', '四忌', '四穷',
  '九坎', '九焦', '五虚', '触水龙', '八专', '无禄', '重日', '五合', '五离', '除神', '解神', '复日',
  '鸣吠', '鸣吠对', '三合', '临日', '驿马', '天后', '劫煞', '灾煞', '月煞', '月虚', '月刑', '月害',
  '大时', '大败', '咸池', '游祸', '天吏', '六合', '五富', '天仓', '天贼', '要安', '玉宇', '金堂',
  '敬安', '普护', '福生', '圣心', '益后', '续世', '阳德', '阴德', '天马', '兵禁', '地囊', '土符',
  '大煞', '归忌', '往亡', '月厌', '地火', '厌对', '六仪', '招摇', '天火', '不将', '天狗',
  '天医', '天喜', '天巫', '福德', '吉期', '兵宝', '兵福', '小时', '土府', '月建', '月破', '大耗',
  '小耗', '死神', '死气', '时阴', '官符', '枝德', '血支', '时阳', '生气',
  '建日', '除日', '满日', '平日', '定日', '执日', '破日', '危日', '成日', '收日', '开日', '闭日',
]);

/** 卷十一出现、但本层没有可靠起法/历法条件的条目：不猜，直接列出来。 */
const UNSUPPORTED_NAMES = new Set(['土王用事后', '血忌', '伏社日', '八风', '气往亡', '专日', '伐日', '四离', '四绝', '上朔']);

export const ZERI_SHENSHA_BASIS = {
  text: '《钦定协纪辨方书》卷十一「用事」逐条宜忌 + 卷十「宜忌」吉凶轻重六等',
  edition: '四库全书本（清乾隆内府刊本；殆知阁整理本对校）',
  volumes: ['卷四 义例二 建除十二神', '卷五 义例三 月神', '卷六 义例四 月神', '卷九 立成', '卷十 宜忌', '卷十一 用事'],
  unsupported: [...UNSUPPORTED_NAMES],
  note: '神煞按节气月与日干支确定性起算；六等判词逐字取卷十，德神制化按卷十各条按语；未实现的条目不计分，逐日 shensha.unsupported 会列出。',
};

const uniquePush = (arr, value) => { if (!arr.includes(value)) arr.push(value); };

/** 中文数字月日解析：用于「每月十五日」「每月一日六日…」这类规则。 */
function lunarDaysOf(name) {
  if (name === '朔望日') return [1, 15];
  if (!name.startsWith('每月') || !name.endsWith('日')) return null;
  const body = name.slice(2, -1).replace(/日/g, '');
  const re = /二十[一二三四五六七八九]?|十[一二三四五六七八九]?|[一二三四五六七八九]/g;
  const table = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
  const out = [];
  for (const m of body.matchAll(re)) {
    const s = m[0];
    let n = 0;
    if (s.startsWith('二十')) n = 20 + (s.length === 3 ? table[s[2]] : 0);
    else if (s.startsWith('十')) n = 10 + (s.length === 2 ? table[s[1]] : 0);
    else n = table[s] || 0;
    if (n >= 1 && n <= 30) out.push(n);
  }
  return out.length ? out : null;
}

/** 日干/日支类禁忌：「寅日」「丁日」「亥子日」。 */
function dayRuleOf(name) {
  if (!name.endsWith('日') || name === '朔望日') return null;
  const body = name.slice(0, -1);
  if (body.length === 1) {
    if (BRANCHES.includes(body)) return { kind: 'branch', values: [body] };
    if (STEMS.includes(body)) return { kind: 'stem', values: [body] };
  }
  if (body.length === 2 && [...body].every((c) => BRANCHES.includes(c))) return { kind: 'branch', values: [...body] };
  return null;
}

/**
 * 逐日神煞。
 * @param {{monthBranch:string, dayGz:string, xing?:string, lunarDay?:number}} input
 *   monthBranch 为节气月支（寅=正月）；xing 不传时按日支与月支现算。
 */
export function computeDayShensha(input) {
  const monthBranch = input && input.monthBranch;
  const dayGz = input && input.dayGz;
  const result = {
    monthBranch, monthNumber: MONTH_NO[monthBranch] || 0, season: SEASON_OF[monthBranch] || '',
    dayGz, dayStem: '', dayBranch: '', xing: '', lunarDay: input && input.lunarDay,
    names: [],
  };
  if (!BRANCHES.includes(monthBranch) || typeof dayGz !== 'string' || dayGz.length !== 2) return result;
  const dayStem = dayGz[0];
  const dayBranch = dayGz[1];
  if (!STEMS.includes(dayStem) || !BRANCHES.includes(dayBranch)) return result;
  const season = SEASON_OF[monthBranch];
  const xing = input.xing && ZHIXING.includes(input.xing)
    ? input.xing
    : ZHIXING[((BRANCHES.indexOf(dayBranch) - BRANCHES.indexOf(monthBranch)) % 12 + 12) % 12];
  const names = new Set();
  const add = (n) => { if (n) names.add(n); };

  // 建除同位异名：同一建除日只以一组名字出现，计分时按建除归并。
  for (const n of XING_ALIAS[xing] || []) add(n);

  if (TIAN_DE[monthBranch] && TIAN_DE[monthBranch] === dayStem) add('天德');
  if (TIAN_DE_HE[monthBranch] && TIAN_DE_HE[monthBranch] === dayStem) add('天德合');
  if (YUE_DE[monthBranch] === dayStem) add('月德');
  if (YUE_DE_HE[monthBranch] === dayStem) add('月德合');
  if (YUE_KONG[monthBranch] === dayStem) add('月空');
  if (TIAN_EN.includes(dayGz)) add('天恩');
  if (SEASON_SHE[season] === dayGz) add('天赦');
  if (TIAN_YUAN[monthBranch] === dayGz) add('天愿');
  if (SEASON_MU_CANG[season].includes(dayBranch)) add('母仓');
  if (YUE_EN[monthBranch] === dayStem) add('月恩');
  if (SEASON_SI_XIANG[season].includes(dayStem)) add('四相');
  if (SEASON_SHI_DE[season] === dayBranch) add('时德');
  if (SEASON_WANG[season] === dayBranch) add('王日');
  if (SEASON_GUAN[season] === dayBranch) add('官日');
  if (SEASON_SHOU[season] === dayBranch) add('守日');
  if (SEASON_XIANG[season] === dayBranch) add('相日');
  if (SEASON_MIN[season] === dayBranch) add('民日');
  if (SEASON_SI_JI[season] === dayBranch) add('四击');
  if (JIU_KONG[monthBranch] === dayBranch) add('九空');
  if (WU_MU[monthBranch] === dayGz) add('五墓');
  if (SEASON_SI_HAO[season].includes(dayGz)) add('四耗');
  if (SEASON_SI_FEI[season].includes(dayGz)) add('四废');
  if (SEASON_SI_JI4[season].includes(dayGz)) add('四忌');
  if (SEASON_SI_QIONG[season].includes(dayGz)) add('四穷');
  if (JIU_KAN[monthBranch] === dayBranch) { add('九坎'); add('九焦'); }
  if (SEASON_WU_XU[season].includes(dayBranch)) add('五虚');
  if (CHU_SHUI_LONG.includes(dayGz)) add('触水龙');
  if (BA_ZHUAN.includes(dayGz)) add('八专');
  if (WU_LU.includes(dayGz)) add('无禄');
  if (CHONG_RI.includes(dayGz)) add('重日');
  if (dayBranch === '寅' || dayBranch === '卯') add('五合');
  if (dayBranch === '申' || dayBranch === '酉') { add('五离'); add('除神'); }
  if (JIE_SHEN[monthBranch] === dayBranch) add('解神');
  if (FU_RI[monthBranch].includes(dayStem)) add('复日');
  if (MING_FEI.includes(dayGz)) add('鸣吠');
  if (MING_FEI_DUI.includes(dayGz)) add('鸣吠对');

  if (LIN_RI[monthBranch] === dayBranch) add('临日');
  if (YI_MA[monthBranch] === dayBranch) { add('驿马'); add('天后'); }
  if (JIE_SHA[monthBranch] === dayBranch) add('劫煞');
  if (ZAI_SHA[monthBranch] === dayBranch) add('灾煞');
  if (YUE_SHA[monthBranch] === dayBranch) { add('月煞'); add('月虚'); }
  if (YUE_XING[monthBranch] === dayBranch) add('月刑');
  if (YUE_HAI[monthBranch] === dayBranch) add('月害');
  if (DA_SHI[monthBranch] === dayBranch) { add('大时'); add('大败'); add('咸池'); }
  if (YOU_HUO[monthBranch] === dayBranch) add('游祸');
  if (TIAN_LI[monthBranch] === dayBranch) add('天吏');
  if (LIU_HE[monthBranch] === dayBranch) add('六合');
  if (WU_FU[monthBranch] === dayBranch) add('五富');
  if (TIAN_CANG[monthBranch] === dayBranch) add('天仓');
  if (TIAN_ZEI[monthBranch] === dayBranch) add('天贼');
  if (YAO_AN[monthBranch] === dayBranch) add('要安');
  if (YU_YU[monthBranch] === dayBranch) add('玉宇');
  if (JIN_TANG[monthBranch] === dayBranch) add('金堂');
  if (JING_AN[monthBranch] === dayBranch) add('敬安');
  if (PU_HU[monthBranch] === dayBranch) add('普护');
  if (FU_SHENG[monthBranch] === dayBranch) add('福生');
  if (SHENG_XIN[monthBranch] === dayBranch) add('圣心');
  if (YI_HOU[monthBranch] === dayBranch) add('益后');
  if (XU_SHI[monthBranch] === dayBranch) add('续世');
  if (YANG_DE[monthBranch] === dayBranch) add('阳德');
  if (YIN_DE[monthBranch] === dayBranch) add('阴德');
  if (TIAN_MA[monthBranch] === dayBranch) add('天马');
  if (BING_JIN[monthBranch] === dayBranch) add('兵禁');
  if (DI_NANG[monthBranch].includes(dayGz)) add('地囊');
  if (TU_FU[monthBranch] === dayBranch) add('土符');
  if (DA_SHA[monthBranch] === dayBranch) add('大煞');
  if (WANG_WANG[monthBranch] === dayBranch) add('往亡');
  if (YUE_YAN[monthBranch] === dayBranch) { add('月厌'); add('地火'); }
  if (YAN_DUI[monthBranch] === dayBranch) { add('厌对'); add('六仪'); add('招摇'); }
  if (TIAN_HUO[monthBranch] === dayBranch) add('天火');

  // 归忌：孟月丑、仲月寅、季月子。
  const meng = ['寅', '巳', '申', '亥'].includes(monthBranch);
  const zhong = ['子', '卯', '午', '酉'].includes(monthBranch);
  if ((meng && dayBranch === '丑') || (zhong && dayBranch === '寅') || (!meng && !zhong && dayBranch === '子')) add('归忌');
  // 三合：月建三合局中除去月支的另外两支。
  if (SANHE[monthBranch] && [...SANHE[monthBranch]].filter((b) => b !== monthBranch).includes(dayBranch)) add('三合');
  // 不将：卷四历例逐月日表。
  if (BU_JIANG[monthBranch].includes(dayGz)) add('不将');
  // 天狗：申月戌日（满日）；卷五按语明确「非谓凡为满日皆天狗」。
  if (monthBranch === '申' && dayBranch === '戌') add('天狗');

  result.dayStem = dayStem;
  result.dayBranch = dayBranch;
  result.xing = xing;
  result.names = [...names];
  return result;
}

function addXingHit(list, xing, rawName) {
  let item = list.find((x) => x.xing === xing);
  if (!item) { item = { xing, names: [] }; list.push(item); }
  uniquePush(item.names, rawName);
}

/**
 * 某事项在当日的神煞命中。
 * 返回 use/avoid 各分四类：xing（建除）、shensha（神煞）、day（日干/日支禁忌）、lunar（农历日禁忌）。
 */
export function taskShenshaHits(task, day) {
  const entries = TASK_ENTRIES[task] || [];
  const out = {
    entries,
    use: { xing: [], shensha: [], day: [], lunar: [] },
    avoid: { xing: [], shensha: [], day: [], lunar: [] },
    unsupported: [],
  };
  if (!day || !day.xing || !Array.isArray(day.names)) return out;
  const addList = (bucket, names) => {
    for (const name of names) {
      if (UNSUPPORTED_NAMES.has(name)) { uniquePush(out.unsupported, name); continue; }
      const lunar = lunarDaysOf(name);
      if (lunar) {
        if (Number.isInteger(day.lunarDay) && lunar.includes(day.lunarDay)) uniquePush(bucket.lunar, name);
        continue;
      }
      const rule = dayRuleOf(name);
      if (rule) {
        const hit = rule.kind === 'branch'
          ? rule.values.includes(day.dayBranch)
          : rule.values.includes(day.dayStem);
        if (hit) uniquePush(bucket.day, name);
        continue;
      }
      const xing = XING_NAME_MAP[name];
      if (xing) {
        if (xing === day.xing) addXingHit(bucket.xing, xing, name);
        continue;
      }
      if (KNOWN_SHENSHA.has(name)) {
        if (day.names.includes(name)) uniquePush(bucket.shensha, name);
        continue;
      }
      uniquePush(out.unsupported, name);
    }
  };
  for (const entry of entries) {
    const list = SHENSHA_LISTS[entry];
    if (!list) continue;
    addList(out.use, list.use);
    addList(out.avoid, list.avoid);
  }
  return out;
}

/** 把建除命中格式化成「满日」「土府（建日）」这样的可读串。 */
export function xingHitText(hit) {
  const raw = hit.names.join('、');
  return hit.names.includes(`${hit.xing}日`) ? raw : `${raw}（${hit.xing}日）`;
}

// ── 卷十 宜忌：吉凶轻重六等与德神制化 ────────────────────────
// 原文（殆知阁整理本第 4853 行）：
// 「今参互较量，除建破等日条例简易及专忌之日无庸分别外，余分为六等：
//   其上吉足胜凶，从宜不从忌；上次吉足抵凶，遇德从宜不从忌，不遇从宜亦从忌；
//   中等吉不抵凶，遇德则吉胜，从宜不从忌，不遇从忌不从宜；
//   中次凶胜于吉，遇德始相抵，从宜亦从忌，不遇从忌不从宜；
//   其下凶又逢凶，遇德从忌不从宜，不遇诸事皆忌；
//   最下凶叠大凶，遇德仍诸事皆忌。」
// 判词逐字照录；权重与比值阈值是本仓校准，见 GRADE_THRESHOLDS。
// 卷十等第表按「月支 × 日建除」逐格列等，本层只编码可逐条引证的判词与德神制化条件。

export const DECISION = {
  YI: '从宜不从忌',
  YI_JI: '从宜亦从忌',
  PING: '不宜不忌',
  JI: '从忌不从宜',
  ALL_JI: '诸事皆忌',
};

export const GRADE_TEXT =
  '今参互较量除建破等日条例简易及专忌之日无庸分别外余分为六等'
  + '其上吉足胜凶从宜不从忌'
  + '上次吉足抵凶遇德从宜不从忌不遇从宜亦从忌'
  + '中等吉不抵凶遇德则吉胜从宜不从忌不遇从忌不从宜'
  + '中次凶胜于吉遇德始相抵从宜亦从忌不遇从忌不从宜'
  + '其下凶又逢凶遇德从忌不从宜不遇诸事皆忌'
  + '最下凶叠大凶遇德仍诸事皆忌'
  + '然后吉凶轻重各有区分而用静用作趋避各当云表例并列于后';

/** 六等判词。withDe / withoutDe 是「遇德」「不遇德」两列的决断。 */
export const GRADE_RULES = [
  {
    key: '上', label: '上吉',
    doctrine: '吉足胜凶，从宜不从忌',
    withDe: DECISION.YI, withoutDe: DECISION.YI,
  },
  {
    key: '上次', label: '上次',
    doctrine: '吉足抵凶，遇德从宜不从忌，不遇从宜亦从忌',
    withDe: DECISION.YI, withoutDe: DECISION.YI_JI,
  },
  {
    key: '中', label: '中',
    doctrine: '吉不抵凶，遇德则吉胜，从宜不从忌，不遇从忌不从宜',
    withDe: DECISION.YI, withoutDe: DECISION.JI,
  },
  {
    key: '中次', label: '中次',
    doctrine: '凶胜于吉，遇德始相抵，从宜亦从忌，不遇从忌不从宜',
    withDe: DECISION.YI_JI, withoutDe: DECISION.JI,
  },
  {
    key: '下', label: '下',
    doctrine: '凶又逢凶，遇德从忌不从宜，不遇诸事皆忌',
    withDe: DECISION.JI, withoutDe: DECISION.ALL_JI,
  },
  {
    key: '下下', label: '下下',
    doctrine: '凶叠大凶，遇德仍诸事皆忌',
    withDe: DECISION.ALL_JI, withoutDe: DECISION.ALL_JI,
  },
];

/** 卷十铺注条例：「吉凶相抵，不注宜亦不注忌」——六等之外的持平态。 */
export const GRADE_PING = {
  key: '平', label: '平',
  doctrine: '吉凶相抵，不注宜亦不注忌',
  withDe: DECISION.PING, withoutDe: DECISION.PING,
};

const GRADE_RULE_BY_KEY = Object.fromEntries(GRADE_RULES.map((r) => [r.key, r]));

/** 六等比值阈值：本仓校准，不是古籍常数。 */
export const GRADE_THRESHOLDS = {
  up: 3 / 2,
  upCi: 1,
  mid: 2 / 3,
  midCi: 1 / 2,
  xiaXiaWeight: 12,
};

/** 吉项权重（本仓校准，按卷十对神煞轻重的相对比较分档）。 */
export const XING_GOOD = { 建: 1, 除: 2, 满: 2, 平: 1, 定: 2, 执: 1, 破: 1, 危: 1, 成: 2, 收: 1, 开: 3, 闭: 1 };
export const SHENSHA_GOOD = {
  天德: 3, 月德: 3, 天德合: 3, 月德合: 3, 天赦: 3, 天愿: 3,
  月恩: 2, 四相: 2, 时德: 2, 王日: 2, 官日: 2, 守日: 2, 相日: 2, 民日: 2, 临日: 2,
  三合: 2, 六合: 2, 五合: 2, 五富: 2, 天仓: 2, 母仓: 2, 驿马: 2, 天马: 2, 不将: 2,
  鸣吠: 2, 鸣吠对: 2, 解神: 2, 除神: 2, 天后: 2, 普护: 2, 福生: 2, 圣心: 2, 益后: 2, 续世: 2,
  阳德: 2, 阴德: 2, 天恩: 1, 月空: 1,
};

/** 凶项权重（同上；月破/三煞/月刑/月厌按卷十「忌同月破」「所忌与三煞同」分档）。 */
export const XING_BAD = { 建: 2, 除: 1, 满: 2, 平: 2, 定: 1, 执: 1, 破: 4, 危: 1, 成: 1, 收: 2, 开: 1, 闭: 1 };
export const SHENSHA_BAD = {
  月破: 4, 大耗: 4, 四忌: 4, 四穷: 4,
  劫煞: 3, 灾煞: 3, 月煞: 3, 月刑: 3, 月厌: 3, 往亡: 3, 天狗: 3,
  月害: 2, 大时: 2, 大败: 2, 天吏: 2, 四废: 2, 五墓: 2, 天贼: 2, 厌对: 2, 九空: 2,
  重日: 2, 复日: 2, 土符: 2, 地囊: 2, 五离: 2, 八专: 2, 游祸: 2, 大煞: 2, 四击: 2, 天火: 2,
  小耗: 1, 四耗: 1, 归忌: 1, 九坎: 1, 九焦: 1, 五虚: 1, 月虚: 1, 地火: 1, 咸池: 1,
  兵禁: 1, 血忌: 1, 六仪: 1, 招摇: 1,
};
const DAY_TABOO_WEIGHT = 2;

// 卷十「遇德」列：德神含德合、天赦、天愿（原文或称「德愿」「德赦」）。
const DE_COLUMN = ['天德', '月德', '天德合', '月德合', '天赦', '天愿'];
// 月支三合局分组，用于卷十「某月值某日」的条件。
const MONTH_GROUP = {
  寅: '寅申巳亥', 申: '寅申巳亥', 巳: '寅申巳亥', 亥: '寅申巳亥',
  辰: '辰戌丑未', 戌: '辰戌丑未', 丑: '辰戌丑未', 未: '辰戌丑未',
  子: '子午卯酉', 午: '子午卯酉', 卯: '子午卯酉', 酉: '子午卯酉',
};

/**
 * 德神制化表。cls:
 *   keJie  德神可解（卷十「与德合并则吉胜」「余皆不忌」）
 *   buJie  德神犹忌（「德神临此失力」「不能化解」「犹忌」）
 *   wuShe  与德义不相属（「与并犹忌」，不因德而解）
 * anyOf 为可起作用的德神名单；whenXing / whenName / whenMonthXing 为卷十的月日条件
 * （whenMonthXing 逐月指定建除，如「巳月值平日」）；
 * residualEntries 是「余皆不忌」之后仍然忌的卷十一次目。
 */
export const DE_RULES = {
  月建: {
    cls: 'keJie', anyOf: ['天德', '月德', '天德合', '月德合', '天赦', '月恩', '四相'],
    residualEntries: ['兴造动土', '破土'],
    quote: '与天德月德天德合月德合天赦月恩四相并，止忌营建宫室修宫室缮城郭筑堤防兴造动土修仓库修置产室开渠穿井安碓硙补垣修饰垣墙平治道涂破屋坏垣伐木栽种破土，余皆不忌',
  },
  月破: {
    cls: 'buJie', anyOf: [],
    quote: '月破为月建之冲又为月建气绝之地，德神临此失力不能为福，故与并犹忌',
  },
  满日: {
    cls: 'keJie', anyOf: ['月德', '天德合', '月德合', '月恩', '四相'],
    whenName: { 寅: '守日', 申: '守日', 子: '相日', 午: '相日', 卯: '相日', 酉: '相日' },
    quote: '寅申月值守日，子午卯酉月值相日，与月德天德合月德合月恩四相并，则不忌',
  },
  闭日: {
    cls: 'keJie', anyOf: ['天德', '月德', '天德合', '月德合', '天赦', '天愿'],
    whenName: { 子: '王日', 午: '王日', 卯: '王日', 酉: '王日', 辰: '官日', 戌: '官日', 丑: '官日', 未: '官日' },
    quote: '子午卯酉月值王日，辰戌丑未月值官日天吏，与天德月德天德合月德合天赦天愿并，凡所忌者则不注宜，所宜者亦不注忌',
  },
  劫煞: {
    cls: 'keJie', anyOf: ['天德', '月德', '天德合', '月德合'],
    whenXing: { 寅申巳亥: '收', 辰戌丑未: '除', 子午卯酉: '执' },
    residualEntries: ['求医疗病'],
    quote: '与天德月德天德合月德合并，止忌安抚边境选将训兵出师求医疗病，余皆不忌',
  },
  灾煞: {
    cls: 'keJie', anyOf: ['天德', '月德', '天德合', '月德合'],
    whenXing: { 寅申巳亥: '开', 辰戌丑未: '满' },
    residualEntries: ['求医疗病'],
    quote: '寅申巳亥月值开日，辰戌丑未月值满日，与天德月德天德合月德合并，止忌安抚边境选将训兵出师求医疗病，余皆不忌',
  },
  月煞: {
    cls: 'keJie', anyOf: ['天德', '月德', '天德合', '月德合', '天愿'],
    whenXing: { 子午卯酉: '危' },
    residualEntries: ['求医疗病'],
    quote: '卯酉月值六合，子午月值月害，与德愿并而后从德愿所宜；寅申巳亥月值闭日、辰戌丑未月值平日，凶又逢凶，不与德神并则诸事皆忌',
  },
  月刑: {
    cls: 'keJie', anyOf: ['天德', '月德', '天德合', '月德合', '天愿'],
    whenMonthXing: { 巳: '平' },
    residualEntries: ['求医疗病'],
    quote: '巳月值平日相日六合，与德愿并则化凶为吉，止忌军事疗病，余皆不忌',
  },
  月害: {
    cls: 'keJie', anyOf: ['天德', '月德', '天德合', '月德合'],
    whenMonthXing: { 卯: '除', 酉: '除', 丑: '执', 未: '执' },
    residualEntries: ['求医疗病'],
    quote: '卯酉月值除日守日，丑未月值执日大时，必与德神并而后止忌军事疗病，余不忌',
  },
  月厌: {
    cls: 'keJie', anyOf: ['天德', '月德', '天德合', '月德合'],
    whenMonthXing: { 寅: '成', 申: '成', 丑: '开', 未: '开' },
    residualEntries: ['行幸遣使', '上官赴任', '结婚姻', '纳采问名', '嫁娶', '求医疗病', '般移'],
    quote: '寅申月值成日，丑未月值开日，再与德神并则吉胜矣，止忌行幸遣使安抚边境选将训兵出师上官赴任临政亲民结婚姻纳采问名嫁娶求医疗病般移远回栽种，余皆不忌',
  },
  大时: {
    cls: 'keJie', anyOf: ['天德', '月德', '天德合', '月德合'],
    whenXing: { 寅申巳亥: '除', 辰戌丑未: '执' },
    residualEntries: [],
    quote: '寅申巳亥月值除日官日，辰戌月值执日六合，丑未月值执日六害，与德神并则吉胜，止忌军事，余皆不忌',
  },
  天吏: {
    cls: 'keJie', anyOf: ['天德', '月德', '天德合', '月德合'],
    whenXing: { 寅申巳亥: '危' },
    residualEntries: ['求医疗病'],
    quote: '寅申巳亥月值危日，与德合并则吉胜，止忌军事疗病，余皆不忌',
  },
  厌对: {
    cls: 'keJie', anyOf: ['天德', '月德', '天德合', '月德合', '天赦'],
    residualEntries: [],
    quote: '与天德月德天德合月德合天赦并则不忌',
  },
  复日: {
    cls: 'keJie', anyOf: ['天德', '月德', '天德合', '月德合', '天赦', '六合'],
    residualEntries: [],
    quote: '今定为鸣吠遇复日则忌，德赦六合遇复日则不忌',
  },
  天狗: {
    cls: 'buJie', anyOf: [],
    quote: '申月又为天狗忌祭祀，与德合并犹忌',
  },
  游祸: {
    cls: 'buJie', anyOf: [],
    quote: '与德合天赦并犹忌，其旺如故故犹忌也',
  },
  四忌: {
    cls: 'buJie', anyOf: [],
    quote: '此八日皆以旺极为凶，故德神不能化解',
  },
  四穷: {
    cls: 'buJie', anyOf: [],
    quote: '此八日皆以旺极为凶，故德神不能化解',
  },
  往亡: {
    cls: 'buJie', anyOf: [],
    quote: '虽值德合赦愿不能无疑，故与并犹忌',
  },
  九坎: {
    cls: 'wuShe', anyOf: [],
    quote: '九坎九焦忌见义例，与德合义不相属，故与并犹忌',
  },
  九焦: {
    cls: 'wuShe', anyOf: [],
    quote: '九坎九焦忌见义例，与德合义不相属，故与并犹忌',
  },
  土符: {
    cls: 'wuShe', anyOf: [],
    quote: '土符地囊归忌血忌仿此',
  },
  地囊: {
    cls: 'wuShe', anyOf: [],
    quote: '土符地囊归忌血忌仿此',
  },
  归忌: {
    cls: 'wuShe', anyOf: [],
    quote: '土符地囊归忌血忌仿此',
  },
  血忌: {
    cls: 'wuShe', anyOf: [],
    quote: '土符地囊归忌血忌仿此',
  },
};

/** 卷十依据：六等判词、制化表与校准说明。 */
export const ZERI_JUAN10_BASIS = {
  text: '《钦定协纪辨方书》卷十「宜忌」吉凶轻重六等与德神制化',
  edition: '四库全书本（清乾隆内府刊本；殆知阁整理本对校）',
  gradeText: GRADE_TEXT,
  corpusLines: '卷十 宜忌（殆知阁整理本 4576–5095 行；六等判词见 4853 行）',
  grades: GRADE_RULES,
  ping: GRADE_PING,
  thresholds: GRADE_THRESHOLDS,
  thresholdsNote: '吉凶权重与比值阈值（3/2、1、2/3、1/2）是本仓校准，不是古籍常数。',
  deRules: Object.entries(DE_RULES).map(([name, r]) => ({
    name,
    cls: r.cls,
    anyOf: r.anyOf,
    residualEntries: r.residualEntries || [],
    quote: r.quote,
  })),
  note: '六等判词逐字取卷十；德神制化按卷十各条按语编码。等第表的逐月逐日单元格未全量数字化，未编码的组合按保守值（不因德而解）处理。',
};

const DE_COLUMN_SET = new Set(DE_COLUMN);
const deRuleOfXing = (hit) => {
  for (const n of hit.names || []) if (DE_RULES[n]) return DE_RULES[n];
  return null;
};
const deRuleOfShensha = (name) => {
  if (DE_RULES[name]) return DE_RULES[name];
  if (name === '大耗') return DE_RULES.月破;
  if (name === '大败') return DE_RULES.大时;
  if (name === '月虚') return DE_RULES.月煞;
  if (name === '地火') return DE_RULES.月厌;
  if (name === '六仪' || name === '招摇') return DE_RULES.厌对;
  return null;
};
const conditionMet = (rule, day) => {
  if (rule.whenXing) {
    const want = rule.whenXing[MONTH_GROUP[day.monthBranch]];
    if (!want || want !== day.xing) return false;
  }
  if (rule.whenName) {
    const want = rule.whenName[day.monthBranch];
    if (!want || !day.names.includes(want)) return false;
  }
  if (rule.whenMonthXing) {
    const want = rule.whenMonthXing[day.monthBranch];
    if (!want || want !== day.xing) return false;
  }
  return true;
};
const anyOfMet = (rule, day) => Array.isArray(rule.anyOf) && rule.anyOf.some((n) => day.names.includes(n));

/**
 * 按卷十「六等」与德神制化给当日定等。
 * @param {ReturnType<typeof taskShenshaHits>} hits
 * @param {ReturnType<typeof computeDayShensha>} day
 * @returns {{key:string,label:string,doctrine:string,decision:string,withDe:boolean,de:string[],
 *   ji:number,xiong:number,score:number,ratio:number|null,good:object[],resolved:object[],
 *   remains:object[],forced:object[],allJiCombo:boolean,thresholds:object,note:string}}
 */
export function gradeDay(hits, day) {
  const entries = hits && Array.isArray(hits.entries) ? hits.entries : [];
  const info = day && Array.isArray(day.names) ? day : { monthBranch: '', xing: '', names: [] };
  const de = DE_COLUMN.filter((n) => DE_COLUMN_SET.has(n) && info.names.includes(n));
  const withDe = de.length > 0;
  const good = [];
  const remains = [];
  const resolved = [];
  const forced = [];
  let ji = 0;
  let xiong = 0;

  for (const hit of (hits && hits.use && hits.use.xing) || []) {
    const w = XING_GOOD[hit.xing] || 1;
    ji += w;
    good.push({ name: xingHitText(hit), w, kind: 'xing' });
  }
  for (const n of (hits && hits.use && hits.use.shensha) || []) {
    const w = SHENSHA_GOOD[n] || 1;
    ji += w;
    good.push({ name: n, w, kind: 'shensha' });
  }

  const settle = (label, w, rule, kind) => {
    if (!rule) {
      xiong += w;
      remains.push({ name: label, w, cls: 'none', kind });
      return;
    }
    if (rule.cls === 'buJie' || rule.cls === 'wuShe') {
      xiong += w;
      remains.push({ name: label, w, cls: rule.cls, kind });
      return;
    }
    if (!conditionMet(rule, info) || !anyOfMet(rule, info)) {
      xiong += w;
      remains.push({ name: label, w, cls: rule.cls, kind, pending: true });
      return;
    }
    if ((rule.residualEntries || []).some((e) => entries.includes(e))) {
      xiong += w;
      const item = { name: label, w, cls: rule.cls, kind, residual: true };
      remains.push(item);
      forced.push(item);
      return;
    }
    resolved.push({ name: label, w, cls: rule.cls, kind });
  };

  for (const hit of (hits && hits.avoid && hits.avoid.xing) || []) {
    settle(xingHitText(hit), XING_BAD[hit.xing] || 2, deRuleOfXing(hit), 'xing');
  }
  for (const n of (hits && hits.avoid && hits.avoid.shensha) || []) {
    settle(n, SHENSHA_BAD[n] || 1, deRuleOfShensha(n), 'shensha');
  }
  for (const n of (hits && hits.avoid && hits.avoid.day) || []) {
    xiong += DAY_TABOO_WEIGHT;
    remains.push({ name: n, w: DAY_TABOO_WEIGHT, cls: 'day', kind: 'day' });
  }
  for (const n of (hits && hits.avoid && hits.avoid.lunar) || []) {
    xiong += DAY_TABOO_WEIGHT;
    remains.push({ name: n, w: DAY_TABOO_WEIGHT, cls: 'lunar', kind: 'lunar' });
  }

  const avoidNames = [
    ...((hits && hits.avoid && hits.avoid.xing) || []).flatMap((h) => h.names || []),
    ...((hits && hits.avoid && hits.avoid.shensha) || []),
  ];
  // 卷十：月厌叠月破/灾煞，虽与德神并仍诸事皆忌。
  const allJiCombo = avoidNames.includes('月厌')
    && (avoidNames.includes('月破') || avoidNames.includes('灾煞'));

  let key;
  if (ji === 0 && xiong === 0) key = '平';
  else if (xiong === 0) key = '上';
  else if (ji === 0) key = xiong >= GRADE_THRESHOLDS.xiaXiaWeight ? '下下' : '下';
  else {
    const ratio = ji / xiong;
    if (ratio >= GRADE_THRESHOLDS.up) key = '上';
    else if (ratio >= GRADE_THRESHOLDS.upCi) key = '上次';
    else if (ratio >= GRADE_THRESHOLDS.mid) key = '中';
    else if (ratio >= GRADE_THRESHOLDS.midCi) key = '中次';
    else key = '下';
  }
  if (allJiCombo) key = '下下';

  const rule = key === '平' ? GRADE_PING : GRADE_RULE_BY_KEY[key];
  let decision = key === '平' ? DECISION.PING : (withDe ? rule.withDe : rule.withoutDe);
  if (forced.length) decision = DECISION.JI;

  const ratio = xiong === 0 ? null : Number((ji / xiong).toFixed(2));
  return {
    key,
    label: rule.label,
    doctrine: rule.doctrine,
    decision,
    withDe,
    de,
    ji,
    xiong,
    score: ji - xiong,
    ratio,
    good,
    resolved,
    remains,
    forced,
    allJiCombo,
    thresholds: GRADE_THRESHOLDS,
    note: '六等判词为卷十原文；吉凶权重与比值阈值为本仓校准，非古籍常数。',
  };
}
