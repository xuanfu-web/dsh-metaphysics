// 姓氏库（engine/surname-data.js）：单姓 998 + 复姓 82 的康熙笔画与读音。
// 这一版要防的三件事：
//  ① 常见姓不能漏——过去 129 个姓，姓生僻一点五格就整块「算不了」；
//  ② 手工裁定过的字不能被自动口径冲回去（温/万/赖/钟/迟 这类繁简与偏旁换算分歧）；
//  ③ 只考证得出笔画、考证不出唯一读法的姓，不许猜一个拼音塞进音韵检查。
import { compute } from '../engine/index.js';
import { wuge, phonetics } from '../engine/name.js';
import { SURNAME_ROWS, COMPOUND_ROWS, SURNAME_ALT, SURNAME_COUNTS } from '../engine/surname-data.js';
import {
  SURNAME_STROKES, SURNAME_READING, SURNAME_ALT_READING, DOUBLE_SURNAMES, SURNAME_STATS,
} from '../engine/name-data.js';
import { ok, eq } from './_harness.mjs';

// ── 一、形状：每行都是 [字, 笔画, 拼音, 声调]，且拼音与声调同生同灭 ──
eq('单姓行数与 SURNAME_COUNTS 一致', SURNAME_ROWS.length, SURNAME_COUNTS.single);
eq('复姓行数与 SURNAME_COUNTS 一致', COMPOUND_ROWS.length, SURNAME_COUNTS.compound);
eq('摊开后的姓笔画表等于行数', Object.keys(SURNAME_STROKES).length, SURNAME_ROWS.length);
ok('规模够大（单姓 ≥ 900）', SURNAME_ROWS.length >= 900, SURNAME_ROWS.length);
ok('规模够大（复姓 ≥ 60）', COMPOUND_ROWS.length >= 60, COMPOUND_ROWS.length);
const badRow = SURNAME_ROWS.filter((r) => r.length !== 4
  || [...r[0]].length !== 1 || !Number.isInteger(r[1]) || r[1] < 1 || r[1] > 40
  || typeof r[2] !== 'string' || (r[2] && !/^[a-z]+$/.test(r[2]))
  || (r[2] ? ![1, 2, 3, 4].includes(r[3]) : r[3] !== 0));
eq('每行形状与取值合法', badRow, []);
const dupCh = SURNAME_ROWS.map((r) => r[0]).filter((c, i, a) => a.indexOf(c) !== i);
eq('单姓无重复字', dupCh, []);
const dupDb = COMPOUND_ROWS.map((r) => r[0]).filter((c, i, a) => a.indexOf(c) !== i);
eq('复姓无重复', dupDb, []);
eq('stats 透传', SURNAME_STATS, SURNAME_COUNTS);

// ── 二、常见姓覆盖率：三份姓氏资料并集（冻结在下面的锚点里）一个不落 ──
// 冻结清单来自 中华姓氏大辞典类表 + 百家姓全文 + 仓库旧表，共 521 字；
// 不拿它去比对「本次抓取结果」，否则就是把数据源当标准答案、扩容失败也测不出来。
const CORE_ANCHORS = [
    '赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢',
    '邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛',
    '雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮卞齐康伍余元卜顾孟平黄和穆萧尹姚邵',
    '湛汪祁毛禹狄米贝明臧计伏成戴谈宋茅庞熊纪舒屈项祝董梁杜阮蓝闵席季麻强',
    '贾路娄危江童颜郭梅盛林刁钟徐邱骆高夏蔡田樊胡凌霍虞万支柯昝管卢莫经房',
    '裘缪干解应宗丁宣贲邓郁单杭洪包诸左石崔吉钮龚程嵇邢滑裴陆荣翁荀羊於惠',
    '甄曲家封芮羿储靳汲邴糜松井段富巫乌焦巴弓牧隗山谷车侯宓蓬全郗班仰秋仲',
    '伊宫宁仇栾暴甘钭厉戎祖武符刘景詹束龙叶幸司韶郜黎蓟薄印宿白怀蒲邰从鄂',
    '索咸籍赖卓蔺屠蒙池乔阴胥能苍双闻莘党翟谭贡劳逄姬申扶堵冉宰郦雍郤璩桑',
    '桂濮牛寿通边扈燕冀郏浦尚农温别庄晏柴瞿阎充慕连茹习宦艾鱼容向古易慎戈',
    '廖庾终暨居衡步都耿满弘匡国文寇广禄阙东欧殳沃利蔚越夔隆师巩厍聂晁勾敖',
    '融冷訾辛阚那简饶空曾母沙乜养鞠须丰巢关蒯相查后荆红游竺权逯盖益桓公晋',
    '楚闫法汝鄢涂钦归微生岳帅缑亢况有琴商牟佘佴伯赏墨哈谯笪年爱阳佟言福鬱',
    '肖区覃朴繁员句要过钻谌折召郄撒甯六啜行锺麹毋俟上官人赫皇甫尉迟澹台冶',
    '政淳太叔轩辕令狐离宇长鲜闾丘徒亓仉督子颛端木西漆雕正壤驷良拓跋夹父穀',
    '百里南门呼延海舌後第五',
].join('');
const coreChars = [...new Set([...CORE_ANCHORS])];
const missCore = coreChars.filter((c) => !(SURNAME_STROKES[c] > 0));
eq('常见姓锚点全部入表', missCore, []);
ok('锚点规模（≥ 500 姓）', coreChars.length >= 500, coreChars.length);
const missRead = coreChars.filter((c) => SURNAME_ROWS.find((r) => r[0] === c && r[2] === '') !== undefined);
ok('常见姓里带读音的占多数', coreChars.length - missRead.length > coreChars.length * 0.9, coreChars.length - missRead.length);

// ── 三、手工裁定锚点：这些数字会被五格直接吃进去 ──
const KX_ANCHORS = {
  王: 4, 李: 7, 张: 11, 刘: 15, 陈: 16, 杨: 13, 黄: 12, 赵: 14, 罗: 20, 郑: 19,
  萧: 18, 苏: 22, 谢: 17, 韩: 17, 钟: 17, 钱: 16, 戴: 18, 魏: 18, 萨: 20, 嬴: 16,
  温: 13, 万: 15, 赖: 16, 涂: 11, 沈: 8, 曹: 11, 姜: 9, 姬: 10, 卜: 2, 母: 5,
  年: 6, 郄: 13, 岳: 8, 迟: 19, 表: 9, 里: 7, 须: 12, 历: 16, 节: 13, 栗: 10,
  暨: 14, 夔: 21, 么: 3, 御: 11, 板: 8, 肖: 9, 闫: 11,
};
const badKx = Object.entries(KX_ANCHORS).filter(([c, n]) => SURNAME_STROKES[c] !== n)
  .map(([c, n]) => `${c}:期望${n},实际${SURNAME_STROKES[c]}`);
eq('康熙笔画锚点（姓）全部对上', badKx, []);
eq('瓮（瓮/甕相差 10 画，取不定）不收录', SURNAME_STROKES['瓮'], undefined);
const badRead = Object.entries({ 任: 'ren2', 覃: 'qin2', 查: 'zha1', 尉: 'yu4', 区: 'ou1', 盖: 'ge3' })
  .filter(([c, v]) => {
    const r = SURNAME_READING[c];
    return !r || r[0] + r[1] !== v;
  }).map(([c, v]) => `${c}:期望${v},实际${SURNAME_READING[c]}`);
eq('姓氏主读音锚点对上', badRead, []);

// ── 四、又读表：只在主读存在时并列显示，且必须与主读不同 ──
const altBad = Object.entries(SURNAME_ALT_READING)
  .filter(([c, v]) => !(SURNAME_STROKES[c] > 0) || !SURNAME_READING[c]
    || SURNAME_READING[c][0] === v[0] || !/^[a-z]+$/.test(v[0]) || ![1, 2, 3, 4].includes(v[1]))
  .map(([c]) => c);
eq('又读字都在笔画表里且与主读不同', altBad, []);
eq('又读条数与 SURNAME_ALT 一致', Object.keys(SURNAME_ALT_READING).length, Object.keys(SURNAME_ALT).length);
const altPh = phonetics('覃沐宸', 1);
eq('又读进音韵结果的 alt 字段', altPh.alt, [{ char: '覃', py: 'tan', tone: 2 }]);
eq('主读仍按 qin2 算', altPh.chars[0], { char: '覃', py: 'qin', tone: 2 });

// ── 五、复姓：逐字笔画齐全，读音连写 ──
ok('复姓两字都有康熙笔画', COMPOUND_ROWS.every((r) => r[1] > 0 && r[2] > 0 && [...r[0]].length === 2));
eq('复姓摊开形状不变', DOUBLE_SURNAMES['欧阳'], { s: [15, 17], py: 'ouyang', tone: 1 });
const dbRead = COMPOUND_ROWS.filter((r) => r[3] && !/^[a-z]+$/.test(r[3])).map((r) => r[0]);
eq('复姓拼音只含小写字母', dbRead, []);
const dbTone = COMPOUND_ROWS.filter((r) => r[3] && ![1, 2, 3, 4].includes(r[4])).map((r) => r[0]);
eq('带拼音的复姓都带首字声调', dbTone, []);
eq('复姓笔画修正：诸葛 16+15', DOUBLE_SURNAMES['诸葛'].s, [16, 15]);
eq('复姓笔画修正：令狐 5+9', DOUBLE_SURNAMES['令狐'].s, [5, 9]);
eq('复姓笔画修正：慕容 15+10', DOUBLE_SURNAMES['慕容'].s, [15, 10]);
eq('万俟读 moqi 不读 wanqi', DOUBLE_SURNAMES['万俟'].py, 'moqi');
eq('单于读 chanyu', DOUBLE_SURNAMES['单于'].py, 'chanyu');

// ── 六、扩容要解决的实际症状：生僻姓的五格不再是「算不了」 ──
const RARE = ['撒', '蹇', '冼', '戏', '蒉', '訾', '昝', '乑', '閗', '厍'];
const stillBad = RARE.filter((c) => !(SURNAME_STROKES[c] > 0));
eq('旧版报不出笔画的姓已入表（除确实没有资料的）', stillBad, ['乑', '閗']);
for (const c of RARE.filter((x) => SURNAME_STROKES[x] > 0)) {
  const w = wuge(c, '沐宸');
  ok(`${c}姓五格可算`, w.available === true && w.rows[0].strokes === SURNAME_STROKES[c] + 1,
    w.available ? w.rows.map((x) => x.strokes) : w.reason);
}
const NL = wuge('那拉', '容');
ok('复姓那拉只给得出笔画也能排五格', NL.available === true, NL.reason);
eq('那拉天格 = 11+9', NL.rows[0].strokes, 20);
const NLp = phonetics('那拉容', 2);
eq('没有读音的姓字让音韵明确落空（不猜）', NLp.available, false);
eq('落空时列出缺的字', NLp.missing, ['拉']);

// ── 七、接线：复姓第二字走姓氏表，不走起名用字库 ──
const ZG = phonetics('诸葛亮', 2);
ok('复姓第二字（葛）从姓氏表取到读音', ZG.available === true && ZG.chars[1].py === 'ge', ZG.reason);
eq('三字全名照样判', ZG.level, '顺口');
const SGL = compute({ system: 'name', surname: '撒', givenName: '沐宸', datetime: '1990-08-15T10:00', gender: 'male' });
ok('compute：生僻姓也能排出五格', SGL.wuge.available === true, SGL.wuge && SGL.wuge.reason);
ok('compute：摘要里有五格行', /【五格】撒\d+画＋沐8画＋宸10画/.test(SGL.summary), SGL.summary.split('\n').find((l) => /五格/.test(l)));
const QT = compute({ system: 'name', surname: '覃', givenName: '沐宸', datetime: '1990-08-15T10:00', gender: 'male' });
ok('compute：摘要音韵行带出又读', /｜姓又读 覃tan2/.test(QT.summary), QT.summary.split('\n').find((l) => /音韵/.test(l)));
const GQ = compute({ system: 'name', action: 'generate', surname: '撒', datetime: '1990-08-15T10:00', gender: 'female', limit: 5 });
eq('生僻姓的候选照样带五格', GQ.candidates.filter((c) => !c.wuge || c.wuge.available === false).length, 0);
ok('生僻姓现在按五格排序（不再走没笔画那条）', /五格/.test(GQ.summary), GQ.summary.split('\n').filter((l) => /五格/.test(l))[0]);
