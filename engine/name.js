// 起名：字库五行匹配 + 候选组合（纯本地确定性），另附五格剖象与音韵检查。
// 口径：字之五行按通行字义/偏旁归类（自建常用字库，未收录的字如实标注，不猜）；
//       喜用倾向取八字旺衰的简化判定（偏强喜克泄耗、偏弱喜生扶、中和不筛）。
//       五格按康熙字典繁体笔画计（见 name-data.js 的口径说明），81 数理取通行本；
//       音韵只做机械检查（同调、相邻同声母/同韵母、叠字），不做语义谐音判断。
import { buildBazi } from './bazi.js';
import { assertCivil } from './validate.js';
import {
  READING, SURNAME_STROKES, SURNAME_READING, DOUBLE_SURNAMES, SHULI_81,
} from './name-data.js';

const SHENG = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const KE = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };
const SHENG_BY = { 火: '木', 土: '火', 金: '土', 水: '金', 木: '水' }; // 生我者
const KE_BY = { 土: '木', 水: '土', 火: '水', 金: '火', 木: '金' }; // 克我者
const ALL = ['木', '火', '土', '金', '水'];

/**
 * 自建常用字库：[字, 五行, 释义, 性别倾向('m'|'f'|'n')]
 * 五行按字义与偏旁通行归类；同一字各派归类偶有出入，这里取最常见的一种。
 * 未收录的字在评估时一律标「未收录」，不推断五行。
 */
export const CHAR_LIB = [
  // 木
  ['梓', '木', '梓树，喻成长、手艺与念乡', 'n'], ['桐', '木', '梧桐，高洁、引来凤凰', 'n'],
  ['楠', '木', '楠木，坚韧贵重', 'n'], ['楷', '木', '楷模，端正可法', 'm'],
  ['松', '木', '松柏常青，坚韧长寿', 'm'], ['柏', '木', '柏树，刚直耐寒', 'm'],
  ['枫', '木', '枫叶，热烈与秋意', 'n'], ['榕', '木', '榕树，荫庇包容', 'n'],
  ['槿', '木', '木槿，朝开暮落、坚韧', 'f'], ['棠', '木', '海棠，明媚雅致', 'f'],
  ['楚', '木', '清楚、楚楚有致', 'n'], ['柯', '木', '草木枝干，条理分明', 'm'],
  ['桓', '木', '桓桓武貌，栋梁', 'm'], ['榆', '木', '榆树，安稳敦厚', 'n'],
  ['栩', '木', '栩栩生动', 'n'], ['榛', '木', '榛果，丰实', 'n'],
  ['芸', '木', '芸香，清雅好学', 'f'], ['芷', '木', '白芷，芳洁', 'f'],
  ['芮', '木', '草初生，柔而韧', 'f'], ['若', '木', '若木，从容', 'f'],
  ['茜', '木', '茜草，明丽', 'f'], ['茵', '木', '绿茵，葱茏', 'f'],
  ['茗', '木', '茶芽，清雅', 'f'], ['莎', '木', '莎草，柔韧', 'f'],
  ['茉', '木', '茉莉，素净芬芳', 'f'], ['筱', '木', '小竹，清秀有节', 'f'],
  ['蓉', '木', '芙蓉，明艳', 'f'], ['萱', '木', '萱草，忘忧', 'f'],
  ['蕙', '木', '蕙兰，芳心', 'f'], ['蕊', '木', '花蕊，含秀', 'f'],
  ['菲', '木', '芳菲，繁茂', 'f'], ['蔓', '木', '藤蔓，绵延', 'f'],
  ['荣', '木', '繁荣，荣光', 'm'], ['茂', '木', '茂盛，丰隆', 'm'],
  ['栋', '木', '栋梁', 'm'], ['梁', '木', '桥梁、栋梁', 'm'],
  ['朴', '木', '质朴', 'm'], ['本', '木', '根本', 'm'],
  // 火
  ['炎', '火', '火盛，热烈', 'm'], ['灿', '火', '灿烂', 'n'],
  ['炫', '火', '光彩炫目', 'm'], ['炜', '火', '光明', 'm'],
  ['烨', '火', '火光盛明', 'm'], ['煜', '火', '照耀', 'm'],
  ['熙', '火', '光明和乐', 'n'], ['煊', '火', '温暖显赫', 'm'],
  ['焕', '火', '焕然一新', 'm'], ['熠', '火', '熠熠生辉', 'n'],
  ['炅', '火', '日光', 'n'], ['昱', '火', '日光，明亮', 'm'],
  ['晗', '火', '天将明', 'f'], ['旭', '火', '旭日初升', 'm'],
  ['昊', '火', '广大如天', 'm'], ['晟', '火', '光明兴盛', 'm'],
  ['晨', '火', '清晨', 'n'], ['景', '火', '光景、景仰', 'n'],
  ['曜', '火', '日光照耀', 'm'], ['曦', '火', '晨曦', 'n'],
  ['朗', '火', '明朗', 'm'], ['昭', '火', '昭明', 'n'],
  ['昕', '火', '黎明', 'f'], ['昀', '火', '日光', 'f'],
  ['暖', '火', '温暖', 'f'], ['灵', '火', '灵秀', 'f'],
  ['丹', '火', '赤诚', 'f'], ['彤', '火', '朱红', 'f'],
  ['冉', '火', '冉冉上升', 'f'], ['南', '火', '南方，向阳', 'n'],
  // 土
  ['坤', '土', '大地，厚德', 'm'], ['垚', '土', '山高', 'm'],
  ['培', '土', '培育', 'm'], ['城', '土', '城池，坚固', 'm'],
  ['域', '土', '疆域', 'm'], ['坚', '土', '坚定', 'm'],
  ['墨', '土', '笔墨，文气', 'n'], ['均', '土', '均衡', 'm'],
  ['坦', '土', '坦荡', 'm'], ['基', '土', '根基', 'm'],
  ['堂', '土', '堂堂正正', 'm'], ['圣', '土', '圣明', 'm'],
  ['在', '土', '存在、自在', 'n'], ['岳', '土', '山岳', 'm'],
  ['峰', '土', '山峰', 'm'], ['峻', '土', '高峻', 'm'],
  ['岚', '土', '山间雾气', 'f'], ['岩', '土', '岩石，刚毅', 'm'],
  ['崇', '土', '崇高', 'm'], ['岐', '土', '岐山，分岔有路', 'm'],
  ['屿', '土', '小岛', 'n'], ['磊', '土', '磊落', 'm'],
  ['尧', '土', '古圣王，高远', 'm'], ['圆', '土', '圆满', 'f'],
  ['恩', '土', '恩厚', 'n'], ['惟', '土', '思惟', 'm'],
  // 金
  ['锋', '金', '锋芒', 'm'], ['钢', '金', '刚强', 'm'],
  ['钧', '金', '权衡、钧衡', 'm'], ['铭', '金', '铭记', 'm'],
  ['锐', '金', '锐进', 'm'], ['锡', '金', '赐予', 'm'],
  ['锦', '金', '锦绣', 'n'], ['鑫', '金', '兴盛（三金）', 'm'],
  ['键', '金', '关键、强健', 'm'], ['鉴', '金', '明鉴', 'm'],
  ['钦', '金', '钦敬', 'm'], ['镇', '金', '镇守', 'm'],
  ['铮', '金', '铮铮有声', 'm'], ['钰', '金', '珍宝', 'n'],
  ['铠', '金', '铠甲', 'm'], ['珊', '金', '珊瑚', 'f'],
  ['珠', '金', '明珠', 'f'], ['琳', '金', '美玉', 'f'],
  ['琦', '金', '美玉、奇伟', 'n'], ['琪', '金', '美玉', 'f'],
  ['瑜', '金', '美玉、瑜亮', 'n'], ['瑞', '金', '祥瑞', 'n'],
  ['瑄', '金', '璧玉', 'f'], ['璇', '金', '美玉', 'f'],
  ['璟', '金', '玉光', 'n'], ['璐', '金', '美玉', 'f'],
  ['瑾', '金', '美玉，谨守', 'f'], ['珏', '金', '双玉', 'n'],
  ['环', '金', '圆环，周全', 'f'], ['玲', '金', '玲珑', 'f'],
  ['珑', '金', '玲珑', 'f'], ['瑶', '金', '瑶华', 'f'],
  ['莹', '金', '晶莹', 'f'], ['铎', '金', '铃铎，传声', 'm'],
  // 水
  ['江', '水', '江河，开阔', 'm'], ['河', '水', '河流', 'm'],
  ['海', '水', '海纳百川', 'm'], ['洋', '水', '海洋，宽广', 'n'],
  ['波', '水', '波澜', 'm'], ['涛', '水', '波涛', 'm'],
  ['涵', '水', '包涵、涵养', 'f'], ['清', '水', '清澈', 'n'],
  ['澈', '水', '澄澈', 'm'], ['澄', '水', '澄明', 'n'],
  ['润', '水', '温润', 'm'], ['泽', '水', '恩泽', 'm'],
  ['沛', '水', '充沛', 'm'], ['沁', '水', '沁润', 'f'],
  ['泓', '水', '水深而广', 'm'], ['泉', '水', '源泉', 'n'],
  ['汐', '水', '潮汐', 'f'], ['淇', '水', '淇水', 'f'],
  ['鸿', '水', '鸿鹄、宏大', 'm'], ['滋', '水', '滋润', 'n'],
  ['淼', '水', '水势浩渺', 'n'], ['雨', '水', '甘霖', 'n'],
  ['雪', '水', '洁白', 'f'], ['霖', '水', '甘霖', 'm'],
  ['霏', '水', '雨雪纷飞', 'f'], ['露', '水', '露华', 'f'],
  ['霆', '水', '雷霆', 'm'], ['雯', '水', '云纹', 'f'],
  ['霓', '水', '虹霓', 'f'], ['湉', '水', '水流平缓', 'f'],
  // 常用名用字补录
  ['沐', '水', '沐浴，受润泽', 'n'], ['宸', '木', '屋宇、北极星所居，喻尊贵', 'm'],
  ['轩', '土', '高轩，气宇轩昂', 'm'], ['逸', '土', '安逸、超逸', 'm'],
  ['然', '火', '自然、坦然', 'n'], ['承', '金', '承继担当', 'm'],
  ['语', '木', '言语，温言', 'f'], ['诺', '火', '诺言，信守', 'n'],
  ['诗', '金', '诗书，文气', 'f'], ['梦', '木', '梦想', 'f'],
  ['思', '金', '思虑，才思', 'n'], ['悦', '金', '喜悦', 'f'],
  ['欣', '木', '欢欣', 'f'], ['嘉', '木', '嘉美', 'n'],
  ['佳', '木', '佳好', 'f'], ['博', '水', '博学', 'm'],
  ['文', '水', '文采', 'n'], ['睿', '金', '睿智', 'm'],
  ['宇', '土', '器宇、宇宙', 'm'], ['亦', '土', '也，从容', 'n'],
  ['知', '火', '知晓，明理', 'n'], ['星', '火', '星辰', 'n'],
  ['月', '木', '明月', 'f'], ['言', '木', '言语，信', 'n'],
  ['和', '水', '和顺', 'n'], ['安', '土', '安宁', 'n'],
  ['宁', '火', '安宁', 'f'],
  // ── 扩充：木 ──
  ['林', '木', '林木成片，茂盛有荫', 'n'], ['森', '木', '众木成林，森然', 'n'],
  ['枝', '木', '枝条，生发', 'n'], ['果', '木', '果实，有成', 'n'],
  ['禾', '木', '禾苗，五谷初生', 'n'], ['秀', '木', '禾吐穗，秀美出众', 'n'],
  ['穗', '木', '谷穗，丰实', 'n'], ['稼', '木', '庄稼，耕作有成', 'm'],
  ['颖', '木', '禾颖，聪颖', 'n'], ['苗', '木', '苗裔，初生有生机', 'n'],
  ['菁', '木', '菁华，草木茂盛', 'f'], ['菡', '木', '荷花含苞', 'f'],
  ['蕴', '木', '蕴积，含而不露', 'f'], ['蕾', '木', '花蕾，待放', 'f'],
  ['薇', '木', '蔷薇，细而韧', 'f'], ['薏', '木', '薏苡，清润', 'f'],
  ['菀', '木', '草木茂盛', 'f'], ['荷', '木', '荷花，出淤泥', 'f'],
  ['莲', '木', '莲花，清直', 'f'], ['菱', '木', '菱角，水生', 'f'],
  ['苇', '木', '芦苇，柔韧', 'n'], ['荻', '木', '荻草，秋声', 'n'],
  ['筠', '木', '竹皮，竹之青', 'n'], ['笛', '木', '竹笛，清音', 'n'],
  ['杉', '木', '杉木，挺拔', 'n'], ['柠', '木', '柠檬，清新', 'f'],
  ['桢', '木', '桢干，栋梁材', 'm'], ['樾', '木', '树荫，庇下', 'm'],
  ['柘', '木', '柘木，坚韧', 'n'], ['权', '木', '权衡，执中', 'm'],
  ['材', '木', '木材，成材', 'm'], ['杭', '木', '苏杭，舟行', 'n'],
  ['枚', '木', '衔枚，静而进', 'n'], ['梧', '木', '梧桐，栖凤', 'n'],
  ['竹', '木', '竹，有节而虚心', 'n'], ['简', '木', '简朴，简静', 'n'],
  ['策', '木', '策谋，鞭策', 'm'], ['筹', '木', '筹算，谋划', 'm'],
  ['芬', '木', '芬芳', 'f'], ['芳', '木', '芳华', 'f'],
  ['花', '木', '花，明媚', 'f'], ['菊', '木', '菊花，晚节', 'f'],
  ['兰', '木', '兰花，幽香', 'f'], ['芝', '木', '芝兰，瑞草', 'f'],
  ['芹', '木', '芹献，谦诚', 'f'], ['荃', '木', '荃草，香草', 'f'],
  ['萃', '木', '荟萃，聚合', 'n'], ['蓁', '木', '蓁蓁，草木盛', 'n'],
  ['荞', '木', '荞麦，实而不华', 'f'], ['莞', '木', '莞尔，浅笑', 'f'],
  ['萦', '木', '萦绕，绵长', 'f'], ['蔚', '木', '蔚然，文采盛', 'n'],
  ['芃', '木', '芃芃，草木茂', 'n'], ['芩', '木', '黄芩，草本', 'f'],
  ['苡', '木', '薏苡，清润', 'f'], ['莱', '木', '莱草，野而秀', 'n'],
  ['萌', '木', '萌芽，生机', 'n'], ['葆', '木', '永葆，守而不失', 'n'],
  ['萧', '木', '萧然，清疏', 'n'], ['樟', '木', '樟木，香而久', 'n'],
  ['樱', '木', '樱花，明丽', 'f'], ['栎', '木', '栎树，坚实', 'n'],
  ['棹', '木', '舟棹，行水', 'n'], ['楸', '木', '楸树，高直', 'n'],
  ['槐', '木', '槐树，三公之位', 'n'], ['橙', '木', '橙，明暖', 'n'],
  ['檀', '木', '檀香，沉静', 'n'],
  // ── 扩充：火 ──
  ['丰', '火', '丰盛、丰盈（繁体豐从豆，归火）', 'n'], ['日', '火', '太阳，光明', 'm'],
  ['阳', '火', '阳光，向阳而生', 'm'], ['光', '火', '光明', 'n'],
  ['亮', '火', '明亮，爽朗', 'm'], ['明', '火', '光明、明理', 'n'],
  ['晶', '火', '晶莹，三光', 'f'], ['晴', '火', '晴朗，天开', 'f'],
  ['夏', '火', '夏天，盛大', 'n'], ['智', '火', '智慧，明达', 'm'],
  ['卓', '火', '卓越，卓立', 'm'], ['乐', '火', '和乐', 'n'],
  ['恺', '火', '恺悌，和乐', 'm'], ['恬', '火', '恬静', 'f'],
  ['甜', '火', '甜美', 'f'], ['亭', '火', '亭亭，端立', 'f'],
  ['俊', '火', '俊朗，才俊', 'm'], ['丙', '火', '天干丙，阳火', 'm'],
  ['丁', '火', '天干丁，阴火', 'n'], ['鼎', '火', '鼎立，厚重', 'm'],
  ['陶', '火', '陶然，自得', 'n'], ['熹', '火', '熹微，晨光', 'n'],
  ['炀', '火', '火旺，炽盛', 'm'], ['烜', '火', '烜赫，显明', 'm'],
  ['暻', '火', '日光', 'n'], ['晖', '火', '日晖，光彩', 'n'],
  ['晔', '火', '光晔，明盛', 'n'], ['旻', '火', '秋天，天高', 'm'],
  ['晏', '火', '晏然，安和', 'n'], ['晓', '火', '拂晓，天将明', 'f'],
  ['暄', '火', '温暖，日暖', 'f'], ['昆', '火', '昆山，同也', 'm'],
  ['伶', '火', '伶俐，聪敏', 'f'],
  // ── 扩充：土 ──
  ['山', '土', '山，稳重', 'm'], ['岸', '土', '岸然，独立', 'm'],
  ['岑', '土', '小山，高而静', 'n'], ['巍', '土', '巍峨，高大', 'm'],
  ['嵩', '土', '嵩山，高峻', 'm'], ['岭', '土', '山岭，绵延', 'n'],
  ['奥', '土', '深奥，蕴藉', 'm'], ['宜', '土', '宜然，合度', 'n'],
  ['容', '土', '包容，容仪', 'n'], ['意', '土', '心意，诚意', 'f'],
  ['依', '土', '依倚，亲近', 'f'], ['悠', '土', '悠然，从容', 'f'],
  ['维', '土', '维系，纲维', 'n'], ['纬', '土', '经纬，有条', 'n'],
  ['永', '土', '永恒，久长', 'n'], ['远', '土', '高远', 'm'],
  ['辰', '土', '星辰、辰时', 'm'], ['壁', '土', '壁立，端正', 'm'],
  ['田', '土', '田野，耕获', 'm'], ['由', '土', '由来，自得', 'n'],
  ['画', '土', '图画，文采', 'f'], ['延', '土', '延展，绵长', 'm'],
  ['建', '土', '建立，树也', 'm'], ['音', '土', '音声，和鸣', 'f'],
  ['韵', '土', '韵致，余响', 'f'], ['玮', '土', '美玉，珍奇', 'm'],
  ['雍', '土', '雍容，和穆', 'm'], ['懿', '土', '懿德，美善', 'f'],
  // ── 扩充：金 ──
  ['金', '金', '金，坚而贵', 'm'], ['秋', '金', '秋收、成熟（秋属金，肃而收）', 'n'],
  ['书', '金', '书卷，文墨', 'n'], ['舒', '金', '舒展，从容', 'n'],
  ['善', '金', '善良，善成', 'n'], ['信', '金', '诚信，符信', 'm'],
  ['修', '金', '修远，修身', 'm'], ['素', '金', '素雅，本色', 'f'],
  ['静', '金', '安静，沉静', 'f'], ['心', '金', '心志，中藏', 'f'],
  ['新', '金', '新意，日新', 'n'], ['正', '金', '正直，端正', 'm'],
  ['世', '金', '世代，绵延', 'm'], ['少', '金', '少年，少壮', 'm'],
  ['西', '金', '西方，金位', 'n'], ['白', '金', '洁白，素净', 'n'],
  ['辛', '金', '天干辛，阴金', 'n'], ['成', '金', '成器，成事', 'm'],
  ['利', '金', '利落，锋利', 'm'], ['剑', '金', '剑，刚锐', 'm'],
  ['刚', '金', '刚强，不屈', 'm'], ['则', '金', '法则，有度', 'm'],
  ['初', '金', '初心，开端', 'n'], ['硕', '金', '硕大，学殖', 'm'],
  ['尚', '金', '崇尚，尚贤', 'n'], ['臣', '金', '臣，佐事', 'm'],
  ['川', '金', '川流，通达', 'n'], ['舟', '金', '舟行，济渡', 'n'],
  ['州', '金', '州，聚落', 'n'], ['祖', '金', '祖德，源远', 'm'],
  ['祥', '金', '吉祥，祥瑞', 'n'], ['禄', '金', '福禄，俸给', 'm'],
  ['禧', '金', '禧庆，福', 'n'], ['珍', '金', '珍宝，珍重', 'f'],
  ['宣', '金', '宣明，布达', 'n'], ['序', '金', '秩序，庠序', 'n'],
  ['谦', '金', '谦逊，有终', 'm'], ['赞', '金', '赞美，佐成', 'm'],
  ['超', '金', '超越，越过', 'm'], ['锴', '金', '精铁，坚刚', 'm'],
  // ── 扩充：水 ──
  ['水', '水', '水，润下', 'n'], ['冰', '水', '冰清，澄澈', 'f'],
  ['洁', '水', '洁净，洁身', 'f'], ['浩', '水', '浩大，广远', 'm'],
  ['瀚', '水', '浩瀚，无涯', 'm'], ['渊', '水', '渊深，有本', 'm'],
  ['澜', '水', '波澜，壮阔', 'n'], ['潮', '水', '潮涌，有信', 'n'],
  ['溪', '水', '溪流，清浅', 'f'], ['湘', '水', '湘水，清深', 'f'],
  ['渝', '水', '渝水，守而不变', 'n'], ['深', '水', '深厚，深藏', 'm'],
  ['湛', '水', '湛然，清深', 'm'], ['汇', '水', '汇聚，会归', 'n'],
  ['洲', '水', '洲渚，水中地', 'n'], ['湾', '水', '水湾，曲处', 'f'],
  ['云', '水', '云行，舒卷', 'n'], ['风', '水', '风雅，流动', 'n'],
  ['北', '水', '北方，水位', 'n'], ['冬', '水', '冬藏，静敛', 'f'],
  ['玄', '水', '玄远，幽深', 'n'], ['子', '水', '子，初生', 'm'],
  ['平', '水', '平和，坦易', 'n'], ['方', '水', '方正，有隅', 'n'],
  ['帆', '水', '风帆，顺行', 'n'], ['航', '水', '航行，济远', 'm'],
  ['敏', '水', '敏思，捷悟', 'f'], ['慧', '水', '慧心，明彻', 'f'],
  ['惠', '水', '惠泽，施与', 'f'], ['霈', '水', '霈雨，丰沛', 'm'],
  ['灏', '水', '灏气，广大', 'm'], ['湄', '水', '水湄，岸边', 'f'],
  ['滨', '水', '水滨，近水', 'n'], ['洛', '水', '洛水，清流', 'n'],
  ['津', '水', '津渡，要处', 'n'], ['泊', '水', '淡泊，自守', 'm'],
  ['沧', '水', '沧海，苍茫', 'm'], ['浦', '水', '浦，水滨', 'n'],
];

const EL_INDEX = new Map();
const EXTRA_INDEX = new Map();
for (const [c, py, tone, st] of READING) {
  if (!EXTRA_INDEX.has(c)) EXTRA_INDEX.set(c, { py, tone, st });
}
for (const c of CHAR_LIB) {
  if (!EL_INDEX.has(c[0])) {
    const x = EXTRA_INDEX.get(c[0]) || {};
    EL_INDEX.set(c[0], {
      c: c[0], el: c[1], meaning: c[2], g: c[3], order: EL_INDEX.size,
      py: x.py || null, tone: x.tone || null, strokes: x.st || null,
    });
  }
}

const NUM_ELEMENT = { 1: '木', 2: '木', 3: '火', 4: '火', 5: '土', 6: '土', 7: '金', 8: '金', 9: '水', 0: '水' };
const WX_REL = (a, b) => (a === b ? '同' : SHENG[a] === b ? '生' : KE[a] === b ? '克' : SHENG[b] === a ? '被生' : '被克');

/** 数理超过 81 按传统「减 80 循环」取（如 104 → 24）。 */
export function shuliOf(n) {
  let x = n;
  while (x > 81) x -= 80;
  if (!(x >= 1)) return null;
  const row = SHULI_81[x];
  return row ? { num: x, level: row[0], name: row[1] } : null;
}

/** 合并两处笔画覆盖：surnameStrokes（按姓给的）+ strokeOverrides（逐字覆盖），后者优先。 */
function overridesOf(input) {
  const out = {};
  for (const src of [input && input.surnameStrokes, input && input.strokeOverrides]) {
    if (!src || typeof src !== 'object') continue;
    for (const [k, v] of Object.entries(src)) {
      if (Number.isInteger(v) && v > 0) out[k] = v;
    }
  }
  return Object.keys(out).length ? out : undefined;
}

function strokeOf(ch, overrides, kind) {
  if (overrides && Number.isInteger(overrides[ch]) && overrides[ch] > 0) {
    return { strokes: overrides[ch], source: 'user' };
  }
  const info = EL_INDEX.get(ch);
  if (info && info.strokes) return { strokes: info.strokes, source: 'lib' };
  if (kind === 'surname' && SURNAME_STROKES[ch]) return { strokes: SURNAME_STROKES[ch], source: 'surname' };
  return null;
}

function readingOf(ch, kind) {  const info = EL_INDEX.get(ch);
  if (info && info.py) return { py: info.py, tone: info.tone };
  if (kind === 'surname' && SURNAME_READING[ch]) {
    const [py, tone] = SURNAME_READING[ch];
    return { py, tone };
  }
  return null;
}

/**
 * 五格剖象：天格 / 人格 / 地格 / 外格 / 总格 + 81 数理 + 三才。
 * 单姓单名、单姓双名、复姓都按通行算法；任一字缺笔画就整体返回 uncomputable，不半算。
 * @param {string} surname
 * @param {string} given
 * @param {Object<string, number>} [overrides] 字 → 康熙笔画，覆盖数据表（会被标为「用户指定」）
 */
export function wuge(surname, given, overrides) {
  const s = [...String(surname || '')];
  const g = [...String(given || '')];
  if (!s.length || !g.length) return { available: false, reason: '需要姓与名才能排五格' };
  if (s.length > 2) return { available: false, reason: '姓超过两字：五格只算单姓与常见复姓' };

  // 复姓两字的笔画取自复姓表（逐字存，人格要用姓末字）；表里有但用户又覆盖时以用户为准
  const dbl = s.length === 2 ? DOUBLE_SURNAMES[surname] : null;
  const useDbl = dbl && !s.some((ch) => overrides && overrides[ch]);
  const sInfo = useDbl
    ? dbl.s.map((n) => ({ strokes: n, source: 'table' }))
    : s.map((ch) => strokeOf(ch, overrides, 'surname'));
  const gInfo = g.map((ch) => strokeOf(ch, overrides, 'given'));
  const missing = [...s, ...g].filter((ch, i) => !(i < s.length ? sInfo[i] : gInfo[i - s.length]));
  if (missing.length) {
    return {
      available: false,
      reason: `这些字没有康熙笔画数据，五格算不了：${missing.join('、')}——可用 strokeOverrides 传入笔画后再算`,
      missing,
    };
  }

  const sStroke = sInfo.map((x) => x.strokes);
  const gStroke = gInfo.map((x) => x.strokes);
  const sum = (a) => a.reduce((x, y) => x + y, 0);
  const isDouble = s.length === 2;
  const tian = isDouble ? sum(sStroke) : sStroke[0] + 1;
  const ren = sStroke[s.length - 1] + gStroke[0];
  const di = sum(gStroke) + (g.length === 1 ? 1 : 0);
  const zong = sum(sStroke) + sum(gStroke);
  // 单姓单名没有「外侧」，通行本固定记 2；其余情形（单姓双名 / 复姓单名 / 复姓双名）都是 总−人+1
  const wai = s.length === 1 && g.length === 1 ? 2 : zong - ren + 1;

  const rows = [['天格', tian], ['人格', ren], ['地格', di], ['外格', wai], ['总格', zong]].map(([key, n]) => ({
    key, strokes: n, ...shuliOf(n),
  }));
  const sancaiNums = [tian, ren, di].map((n) => n % 10);
  const sancaiEl = sancaiNums.map((n) => NUM_ELEMENT[n]);
  const rels = [
    { pair: '天与人', rel: WX_REL(sancaiEl[0], sancaiEl[1]) },
    { pair: '人与地', rel: WX_REL(sancaiEl[1], sancaiEl[2]) },
  ];
  const ordered = sancaiEl[0] === sancaiEl[1] && sancaiEl[1] === sancaiEl[2]
    ? '三才同气，气脉集中'
    : rels.every((x) => x.rel === '生' || x.rel === '同')
      ? '一路相生，传统看作顺遂'
      : rels.every((x) => x.rel === '克' || x.rel === '被克')
        ? '相连相克，传统看作内外拉扯'
        : `${rels.map((x) => `${x.pair}${x.rel}`).join('、')}，吉凶各派看法不一`;

  const source = [...sInfo, ...gInfo].some((x) => x.source === 'user') ? 'mixed' : 'table';
  return {
    available: true,
    surnameStyle: isDouble ? '复姓' : '单姓',
    strokes: [
      ...s.map((ch, i) => ({ char: ch, strokes: sInfo[i].strokes, source: sInfo[i].source, kind: '姓' })),
      ...g.map((ch, i) => ({ char: ch, strokes: gInfo[i].strokes, source: gInfo[i].source, kind: '名' })),
    ],
    rows,
    sancai: {
      elements: sancaiEl,
      text: `${sancaiEl.join('')}（${ordered}）`,
      relations: rels,
    },
    summary: rows.map((r) => `${r.key}${r.strokes}${r.level}`).join('　'),
    source,
  };
}

const INITIALS = ['zh', 'ch', 'sh', 'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'r', 'z', 'c', 's', 'y', 'w'];

/** 按拼写切声母韵母：先匹配双字母声母（zh/ch/sh），其余取单字母；y/w 按拼写当声母处理。 */
export function splitPinyin(py) {
  const p = String(py || '').toLowerCase();
  for (const ini of INITIALS) {
    if (p.startsWith(ini)) return { ini, fin: p.slice(ini.length) };
  }
  return { ini: '', fin: p };
}

const TONE_LABEL = { 1: '一', 2: '二', 3: '三', 4: '四' };

/**
 * 音韵的机械检查：全名同调 / 相邻同声母 / 相邻同韵母 / 相邻同音（叠字）。
 * 只报可数的事实，不替人判断好不好听，也不查语义谐音（那需要词库，没做就说没做）。
 */
export function phonetics(fullName) {
  const chars = [...String(fullName || '')];
  if (chars.length < 2) return { available: false, reason: '至少两个字才谈得上音韵' };
  const items = chars.map((ch, i) => {
    const r = readingOf(ch, i === 0 ? 'surname' : 'given');
    return r ? { char: ch, py: r.py, tone: r.tone, ...splitPinyin(r.py) } : { char: ch, py: null, tone: null, ini: null, fin: null };
  });
  const missing = items.filter((x) => !x.py).map((x) => x.char);
  if (missing.length) {
    return { available: false, reason: `这些字没有读音数据：${missing.join('、')}`, missing };
  }

  const issues = [];
  const tones = new Set(items.map((x) => x.tone));
  if (tones.size === 1 && items.length >= 2) {
    issues.push({ type: 'tone', text: `全名都是${TONE_LABEL[items[0].tone]}声，声调没有起伏` });
  }
  for (let i = 1; i < items.length; i++) {
    const a = items[i - 1];
    const b = items[i];
    if (a.py === b.py && a.tone === b.tone) {
      issues.push({ type: 'same', text: `「${a.char}${b.char}」同音同调（叠字或撞音）` });
      continue;
    }
    if (a.ini && a.ini === b.ini) issues.push({ type: 'initial', text: `「${a.char}${b.char}」同声母 ${a.ini}` });
    if (a.fin === b.fin) issues.push({ type: 'final', text: `「${a.char}${b.char}」同韵母 ${a.fin}` });
  }
  const inis = new Set(items.map((x) => x.ini).filter(Boolean));
  if (items.length >= 3 && inis.size === 1) {
    issues.push({ type: 'initial', text: `三字同声母 ${[...inis][0]}，连着读容易黏在一起` });
  }
  const level = issues.length === 0 ? '顺口' : issues.length === 1 ? '略拗' : '拗口';
  return {
    available: true,
    chars: items.map((x) => ({ char: x.char, py: x.py, tone: x.tone })),
    tonePattern: items.map((x) => x.tone).join('-'),
    issues,
    level,
  };
}

/** 用户可自带某字的五行（字库未收时用，按你信的那派算；传了就算「用户指定」）。 */
function userElement(input, ch) {
  const map = input && input.charElements;
  if (!map || typeof map !== 'object') return null;
  const v = map[ch];
  return ALL.includes(v) ? v : null;
}

/** 喜用五行里挑几个可替换的常用字（同性别倾向优先），给未收录字一个落点。 */
function suggestFor(element, genderPref, exclude, count = 3) {
  const pool = CHAR_LIB.filter((c) => c[1] === element && !exclude.has(c[0]));
  pool.sort((a, b) => {
    const fit = (x) => (x[3] === genderPref || x[3] === 'n' ? 1 : 0);
    return fit(b) - fit(a);
  });
  return pool.slice(0, count).map((c) => ({ char: c[0], element: c[1], meaning: c[2] }));
}

const KIND_LABEL = { m: '男', f: '女', n: '中' };

/** 喜用五行（简化判定：旺衰 + 生克泄耗）。 */
export function favorableElements(strength) {
  const level = strength && strength.level ? strength.level : null;
  const dayEl = strength && strength.dayElement ? strength.dayElement : null;
  if (!dayEl || !level) return { list: ALL.slice(), basis: '未取得旺衰：不筛五行，只做用字与字义建议' };
  if (level === '身强' || level === '偏强') {
    return {
      list: [KE_BY[dayEl], SHENG[dayEl], KE[dayEl]].filter(Boolean),
      basis: `${level}（${dayEl}）：宜克、泄、耗——用${KE_BY[dayEl]}（克我）、${SHENG[dayEl]}（我生）、${KE[dayEl]}（我克）`,
    };
  }
  if (level === '身弱' || level === '偏弱') {
    return {
      list: [dayEl, SHENG_BY[dayEl]].filter(Boolean),
      basis: `${level}（${dayEl}）：宜生、扶——用${dayEl}（同我）、${SHENG_BY[dayEl]}（生我）`,
    };
  }
  return { list: ALL.slice(), basis: `${level}：中和不偏，五行皆可用，以字义与音形为先` };
}

function charInfo(ch) {
  return EL_INDEX.get(ch) || null;
}

/** 评估一个名字（姓 + 名 1–2 字）。给了生辰才做喜用匹配。 */
export function assessName(input) {
  const surname = String(input.surname || '').trim();
  if (!surname) throw new Error('缺少姓氏：请给 surname（如「李」）');
  const given = String(input.givenName || '').trim();
  if (!given) throw new Error('缺少名字：请给 givenName（1–2 个汉字，如「沐宸」）');
  if ([...given].length > 2) throw new Error('名请给 1–2 个汉字；复姓请把复姓整体写在 surname，名只留 1–2 字');

  let favorable = { list: [], basis: '' };
  let strength = null;
  let baziNote = null;
  const hasBirth = Number.isInteger(input.year) && Number.isInteger(input.month) && Number.isInteger(input.day);
  if (hasBirth) {
    assertCivil(input, 'birth');
    const r = buildBazi({
      year: input.year, month: input.month, day: input.day,
      hour: Number.isInteger(input.hour) ? input.hour : 12,
      minute: Number.isInteger(input.minute) ? input.minute : 0,
      gender: input.gender || 'male',
      lateZi: input.lateZi !== false,
      trueSolar: input.trueSolar !== false,
      dst: input.dst !== false,
      longitude: input.longitude, address: input.address, geo: input.geo,
    });
    strength = { level: r.strength.level, score: r.strength.score, dayElement: r.pillars.day.stemElement };
    favorable = favorableElements(strength);
    baziNote = { dayMaster: r.dayMaster, solarNote: r.solarTime ? r.solarTime.note : '' };
  }

  const genderPref = input.gender === 'female' ? 'f' : 'm';
  const taken = new Set([surname, ...given]);
  const favPool = favorable.list.length ? favorable.list : ALL.slice();
  const chars = [...given].map((ch) => {
    const info = charInfo(ch);
    const given = userElement(input, ch);
    if (info) {
      return {
        char: ch, element: info.el, meaning: info.meaning,
        genderHint: KIND_LABEL[info.g], favorable: hasBirth ? favorable.list.includes(info.el) : null,
        source: 'lib', note: null,
      };
    }
    if (given) {
      return {
        char: ch, element: given, meaning: '字库未收录；五行按你指定的「' + given + '」计',
        genderHint: null, favorable: hasBirth ? favorable.list.includes(given) : null,
        source: 'user', note: '此字五行由调用方指定，不是字库推断',
      };
    }
    return {
      char: ch, element: '未收录', meaning: '字库未收录，未推断五行（不猜）',
      genderHint: null, favorable: null, source: 'none',
      note: hasBirth ? '若想贴合命局，可换用下面的同喜用字' : '字库未收录：给出生辰后可以看同喜用的替换字',
      suggest: hasBirth
        ? favPool.flatMap((el) => suggestFor(el, genderPref, taken, 2))
        : [],
    };
  });
  const known = chars.filter((c) => c.source === 'lib').length;
  const unknown = chars.filter((c) => c.source === 'none').length;
  const favCount = chars.filter((c) => c.favorable === true).length;
  const judged = chars.length - unknown;
  let verdict;
  if (!hasBirth) verdict = '只做了字义与五行归类；给出生年月日才能判断用字是否合喜用。';
  else if (unknown === chars.length) verdict = `两字都不在字库里，没法判断合不合喜用（喜用为 ${favorable.list.join('、')}）。下面给了可替换的常用字，或把你自己认定的五行传进来。`;
  else if (favCount === judged && judged > 0) verdict = `用字都落在喜用（${favorable.list.join('、')}）上，与命局方向一致。`;
  else if (favCount > 0) verdict = `部分用字合喜用（${favCount}/${judged}），其余可再斟酌；喜用为 ${favorable.list.join('、')}。`;
  else verdict = `用字未落在喜用（${favorable.list.join('、')}）上；不必然是坏名，但若想贴合命局可换字再看。`;

  const ov = overridesOf(input);
  const wu = wuge(surname, given, ov);
  const ph = phonetics(surname + given);

  return {
    system: 'name',
    action: 'assess',
    surname,
    givenName: given,
    fullName: surname + given,
    ...(hasBirth ? {
      bazi: {
        ...baziNote,
        strength,
        favorable: favorable.list,
        basis: favorable.basis,
      },
    } : {}),
    chars,
    wuge: wu,
    phonetics: ph,
    stats: { chars: chars.length, known, unknown, favorableCount: favCount, libSize: CHAR_LIB.length, wugeReady: wu.available === true },
    verdict,
    notes: [
      `字之五行按通行字义/偏旁归类，自建字库共 ${CHAR_LIB.length} 字（常用名用字为主）；未收录的字不猜五行，如实标注，「用户指定」是你传入的归类。`,
      '五格按康熙字典繁体笔画计（氵→水4、艹→艸6、华→華14 这类换算），81 数理取通行本、各派对少数数取法有出入；姓氏笔画表没覆盖的姓或你想按别派算，可传 strokeOverrides 覆盖。',
      '音韵只做机械检查（全名同调、相邻同声母/同韵母、叠字），不做语义谐音判断——谐音、方言读法还得自己读三遍。',
      '起名只做用字参考，不替父母做决定。',
    ],
  };
}

/**
 * 生成候选名：姓 + 两字（或单字），优先落在喜用五行上。
 * limit 1–20；同一字不重复；候选按「合喜用数 → 简洁 → 字库序」确定性排序。
 */
export function generateNames(input) {
  const surname = String(input.surname || '').trim();
  if (!surname) throw new Error('缺少姓氏：请给 surname（如「李」）');
  if (!Number.isInteger(input.year) || !Number.isInteger(input.month) || !Number.isInteger(input.day)) {
    throw new Error('生成候选名需要完整出生年月日（公历）：不给生辰无法判断喜用五行');
  }
  assertCivil(input, 'birth');
  const gender = input.gender === 'female' ? 'female' : 'male';
  const limit = Math.max(1, Math.min(20, Number.isInteger(input.limit) ? input.limit : 10));
  const r = buildBazi({
    year: input.year, month: input.month, day: input.day,
    hour: Number.isInteger(input.hour) ? input.hour : 12,
    minute: Number.isInteger(input.minute) ? input.minute : 0,
    gender,
    lateZi: input.lateZi !== false,
    trueSolar: input.trueSolar !== false,
    dst: input.dst !== false,
    longitude: input.longitude, address: input.address, geo: input.geo,
  });
  const strength = { level: r.strength.level, score: r.strength.score, dayElement: r.pillars.day.stemElement };
  const fav = favorableElements(strength);
  const pool = CHAR_LIB.filter((c) => fav.list.includes(c[1]) && c[0] !== surname);
  const gPref = gender === 'male' ? 'm' : 'f';
  // 五格只影响排序：姓的笔画整轮不变，先备好；每个候选只做四次取数与查表
  const sChars = [...surname];
  const ov = overridesOf(input);
  const sStroke = sChars.map((ch) => strokeOf(ch, ov, 'surname'));
  const sReady = sChars.length <= 2 && sStroke.every(Boolean);
  const sSum = sReady ? sStroke.reduce((x, y) => x + y.strokes, 0) : 0;
  const sLast = sReady ? sStroke[sStroke.length - 1].strokes : 0;
  const lv = (n) => { const r = shuliOf(n); return r ? (r.level === '吉' ? 2 : r.level === '半吉' ? 1 : 0) : 0; };
  const poolStroke = new Map(pool.map((c) => [c[0], (strokeOf(c[0], ov, 'given') || {}).strokes || 0]));
  const scored = [];
  for (let i = 0; i < pool.length; i++) {
    for (let j = 0; j < pool.length; j++) {
      if (i === j) continue;
      const a = pool[i];
      const b = pool[j];
      // 性别倾向：优先本性别与中性，避免两个字都强烈偏另一性别
      const fit = (x) => (x[3] === gPref || x[3] === 'n' ? 1 : 0);
      const gScore = fit(a) + fit(b) - (a[3] !== gPref && a[3] !== 'n' && b[3] !== gPref && b[3] !== 'n' ? 2 : 0);
      const aSt = poolStroke.get(a[0]);
      const bSt = poolStroke.get(b[0]);
      let wuScore = 0;
      if (sReady && aSt && bSt) {
        const ren = sLast + aSt;
        const di = aSt + bSt;
        const zong = sSum + aSt + bSt;
        wuScore = lv(ren) + lv(di) + lv(zong) + lv(zong - ren + 1);
      }
      scored.push({
        name: a[0] + b[0],
        chars: [
          { char: a[0], element: a[1], meaning: a[2] },
          { char: b[0], element: b[1], meaning: b[2] },
        ],
        elements: [a[1], b[1]],
        allFavorable: fav.list.includes(a[1]) && fav.list.includes(b[1]),
        genderScore: gScore,
        wugeScore: wuScore,
        order: (i * 7 + j * 13) % 9973, // 打散字库顺序，避免候选清一色都是前几个字
      });
    }
  }
  const mixed = (c) => (c.elements[0] !== c.elements[1] ? 1 : 0); // 两字异行，比同气堆叠更有层次
  scored.sort((x, y) => (y.allFavorable - x.allFavorable) || (mixed(y) - mixed(x))
    || (y.wugeScore - x.wugeScore) || (y.genderScore - x.genderScore) || (x.order - y.order));
  // 去重 + 用字轮换：先收「两个字都没出现过」的候选，再放宽——避免 20 个候选里 13 个都用同一个「梓」
  const out = [];
  const usedNames = new Set();
  const usedChars = new Set([surname]);
  const usedPairs = new Set();
  const take = (cand, strict, freshPair) => {
    const key = [...cand.name].sort().join('');
    if (usedNames.has(key)) return false;
    if (strict && cand.chars.some((x) => usedChars.has(x.char))) return false;
    const pair = cand.elements.join('');
    if (freshPair && usedPairs.has(pair)) return false;
    usedNames.add(key);
    usedPairs.add(pair);
    cand.chars.forEach((x) => usedChars.add(x.char));
    out.push({
      rank: out.length + 1, name: surname + cand.name, given: cand.name, chars: cand.chars,
      wuge: wuge(surname, cand.name, ov),
      phonetics: phonetics(surname + cand.name),
    });
    return true;
  };
  // 三轮：①新字 + 新五行组合 ②新字 ③放开——先保证候选之间不撞字、不撞组合
  for (const cand of scored) {
    if (out.length >= limit) break;
    take(cand, true, true);
  }
  for (const cand of scored) {
    if (out.length >= limit) break;
    take(cand, true, false);
  }
  for (const cand of scored) {
    if (out.length >= limit) break;
    take(cand, false, false);
  }
  return {
    system: 'name',
    action: 'generate',
    surname,
    gender: gender === 'male' ? '男' : '女',
    bazi: { dayMaster: r.dayMaster, strength, favorable: fav.list, basis: fav.basis },
    candidates: out,
    notes: [
      `字库共 ${CHAR_LIB.length} 字，只在喜用五行（${fav.list.join('、')}）里选字；未覆盖的生僻好字可用 charElements 指定五行后评估。`,
      '候选排序依次看：合喜用 → 两字异行 → 五格（人格/地格/总格/外格 吉多者先）→ 性别倾向 → 字库序，是排序不是「吉名」判定。',
      sReady
        ? '五格按康熙字典繁体笔画与通行本 81 数理算；姓的笔画取自内置姓氏表，没覆盖的姓可传 surnameStrokes 或 strokeOverrides。'
        : '姓的笔画不在内置姓氏表里，这一轮没按五格排序（不半算）；可传 surnameStrokes 或 strokeOverrides 后重算。',
      '音韵只做机械检查（同调、相邻同声母/同韵母、叠字），不做语义谐音判断——候选的音韵结果随每条一起给出。',
    ],
  };
}

/** 主函数：action='assess'（默认）或 'generate'。 */
export function buildName(input) {
  if (input.action === 'generate') return generateNames(input);
  return assessName(input);
}
