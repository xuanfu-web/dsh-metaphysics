// B6 引文索引：知识卡覆盖、引文可解析、原文子串可核验、索引页与数据同源。
import fs from 'node:fs';
import { CLASSICS } from '../engine/classics.js';
import {
  CITATIONS, CITATION_BOOKS, CARD_CITATIONS, citationSourceOf, patternCitations,
} from '../engine/citations.js';
import {
  FUWEN_CITATIONS, CITATION_TEXT, LIBRARY_CITATIONS, allLibraryCitations, citationOfAny as citationOf, engineTextGaps,
  patternChengCitations, PATTERN_CHENG_CITATIONS, PATTERN_CHENG_UNMATCHED, qiongtongCitations,
} from '../engine/citations-fuwen.js';
import { KNOWLEDGE } from '../engine/interpret-knowledge.js';
import { PATTERN_BREAK_RULES, PATTERN_TONE } from '../engine/ziwei.js';
import { gatePalaceRelation, xunShouLiuYi, QIMEN_CONDITION_TABLES, QIMEN_JU_TABLE, QIMEN_BASE_TABLES } from '../engine/qimen.js';
import { PALACE_DIRECTION } from '../engine/fengshui.js';
import { TRI_NAME } from '../engine/meihua.js';
import { compute } from '../engine/index.js';
import { buildCitationsHTML } from '../tools/citations.mjs';
import { MODULE_ORDER } from '../tools/build-client.mjs';
import { ok, eq } from './_harness.mjs';

const FX = JSON.parse(fs.readFileSync(new URL('./fixtures/citation-sources.json', import.meta.url), 'utf8'));
const norm = (s) => String(s ?? '').replace(/[\s\u3000]+/g, '');
const all = allLibraryCitations();

// ── ① 引文数据与原文核验 ─────────────────────────────────────
ok('引文库非空', all.length === CLASSICS.length + LIBRARY_CITATIONS.length && all.length >= 60, String(all.length));
eq('引文 id 唯一', new Set(all.map((c) => c.id)).size, all.length);
ok('每条引文都有书名/卷章/原文/白话/链接', all.every((c) => c.bookName && c.chapter.length >= 2 && c.quote.length >= 8 && (c.plain || '').length >= 6 && /^https:\/\//.test(c.url)));
ok('紫微书已登记', CITATION_BOOKS.ziwei && CITATION_BOOKS.ziwei.name === '紫微斗数全书');
ok('穷通宝鉴已登记', CITATION_BOOKS.qiongtong && CITATION_BOOKS.qiongtong.name === '穷通宝鉴');

// B6 补录：七张八字卡从「通行说」落到可核验原文
const refilled = ['bazi-wangxiang', 'bazi-shensha', 'bazi-kongwang', 'bazi-dayun-jiaoqi', 'bazi-liuqin', 'bazi-xingchong', 'bazi-tiaohou'];
ok('B6 补录卡片已带 refs', refilled.every((id) => Array.isArray(CARD_CITATIONS[id].refs) && CARD_CITATIONS[id].refs.length));
ok('旺相休囚死取三命通会卷二', citationOf('smt-wangxiang').bookName === '三命通会' && citationOf('smt-wangxiang').chapter === '卷二·论五行旺相休囚死并寄');
ok('起运取三命通会论大运', citationOf('smt-dayun-qiyun').chapter === '卷二·论大运');
ok('六亲取三命通会卷七', citationOf('smt-liuqin').chapter === '卷七·论六亲');
ok('调候取穷通宝鉴五行总论', citationOf('qt-tiaohou').bookName === '穷通宝鉴' && citationOf('qt-tiaohou').chapter === '五行总论');
ok('补录条目不写省略号', refilled.every((id) => !/[….](\.\.\.)?/.test(citationOf(CARD_CITATIONS[id].refs[0]).quote)));

// B6 第三批：奇门五张、梅花一张落到《奇门遁甲统宗》《梅花易数》原文
const refilled2 = ['qimen-yinyang', 'qimen-jixing', 'qimen-rumu', 'qimen-wangshuai', 'qimen-wangshuai-yong', 'meihua-tiyong'];
ok('奇门遁甲统宗与梅花易数已登记', CITATION_BOOKS.qimen.name === '奇门遁甲统宗' && CITATION_BOOKS.meihua.name === '梅花易数');
ok('B6 第三批卡片已带 refs', refilled2.every((id) => Array.isArray(CARD_CITATIONS[id].refs) && CARD_CITATIONS[id].refs.length));
ok('阴阳遁取统宗卷一总赋', citationOf('qm-yinyang').chapter === '卷一·奇门秘诀总赋');
ok('三奇入墓取统宗卷十一', citationOf('qm-rumu').chapter === '卷十一·玄机赋（中）' && /三奇入墓/.test(citationOf('qm-rumu').quote));
ok('门星旺衰取统宗卷三', citationOf('qm-wangshuai').chapter === '卷三' && /旺相休囚/.test(citationOf('qm-wangshuai').quote));
ok('体用取梅花易数卷二', citationOf('mh-tiyong').bookName === '梅花易数' && citationOf('mh-tiyong').chapter === '卷二·体用生克');
ok('第三批条目不写省略号', refilled2.every((id) => !/[….](\.\.\.)?/.test(citationOf(CARD_CITATIONS[id].refs[0]).quote)));

// B6 第四批：六爻十三张落到《增删卜易》（维基文库本，繁体照录）
const refilled3 = ['liuyao-yongshen', 'liuyao-fushen', 'liuyao-wangshuai', 'liuyao-yongshen-shuai', 'liuyao-quanggu-shuai', 'liuyao-dongbian', 'liuyao-liushen', 'liuyao-liuhe', 'liuyao-liuchong', 'liuyao-fanyin', 'liuyao-fuyin', 'liuyao-jintui', 'liuyao-yingqi'];
ok('增删卜易已登记', CITATION_BOOKS.liuyao.name === '增删卜易' && CITATION_BOOKS.liuyao.base.includes('zh.wikisource.org'));
ok('B6 第四批卡片已带 refs', refilled3.every((id) => Array.isArray(CARD_CITATIONS[id].refs) && CARD_CITATIONS[id].refs.length));
ok('用神与伏神分取两章', citationOf('zs-yongshen').chapter === '卷一·用神章第八' && citationOf('zs-fushen').chapter === '卷二·飛伏神章第二十八');
ok('月建日辰分取两章', citationOf('zs-yuejian').chapter === '卷一·月將章第十六' && citationOf('zs-richen').chapter === '卷一·日辰章第十七');
ok('六冲六合取本章', citationOf('zs-liuchong').chapter === '卷一·六沖章第二十' && citationOf('zs-liuhe').chapter === '卷一·六合章第十九');
ok('反吟伏吟同出反伏章', citationOf('zs-fanyin').chapter === '卷一·反伏章第二十五' && citationOf('zs-fuyin').chapter === '卷一·反伏章第二十五');
ok('进神退神取卷二', citationOf('zs-jintui').chapter === '卷二·進神退神章第二十九');
ok('应期取总注章', citationOf('zs-yingqi').chapter === '卷一·各門類應期總注章第又二十六');
ok('第四批条目不写省略号', refilled3.every((id) => !/[….](\.\.\.)?/.test(citationOf(CARD_CITATIONS[id].refs[0]).quote)));

// B6 第五批：大六壬四课/三传承落到《大六壬大全》（维基文库四库全书本）
ok('大六壬大全已登记', CITATION_BOOKS.daliuren && CITATION_BOOKS.daliuren.name === '大六壬大全'
  && CITATION_BOOKS.daliuren.base.includes('zh.wikisource.org'));
ok('大六壬四课三传卡已带 refs（B13 后 2+4+2）', Array.isArray(CARD_CITATIONS['daliuren-sike'].refs) && CARD_CITATIONS['daliuren-sike'].refs.length === 8);
ok('十干寄宫取卷一', citationOf('dl-jigong').chapter === '卷一·起例（十干寄宫）' && /甲课寅兮乙课辰/.test(citationOf('dl-jigong').quote));
ok('贼克法取卷一', citationOf('dl-zeike').chapter === '卷一·起例（贼克法）' && /取课先从下贼呼/.test(citationOf('dl-zeike').quote));
ok('月将取卷二神将释', citationOf('dl-yuejiang').chapter === '卷二·神将释（月将）' && /月将/.test(citationOf('dl-yuejiang').quote));
ok('大六壬条目不写省略号', ['dl-jigong', 'dl-zeike', 'dl-yuejiang'].every((id) => !/[….](\.\.\.)?/.test(citationOf(id).quote)));

// 滴天髓·下篇六亲论：家庭三处（夫妻/子女/父母）与神煞立场的原文依据
ok('滴天髓六亲论已录夫妻子女父母', ['dt-liuqin-fuqi', 'dt-liuqin-zinv', 'dt-liuqin-fumu']
  .every((id) => {
    const c = citationOf(id);
    return c && c.book === 'ditian' && /^六亲论·/.test(c.chapter) && c.url.endsWith('153092.html');
  }));
ok('六亲卡引文覆盖夫妻子女父母', ['dt-liuqin-fuqi', 'dt-liuqin-zinv', 'dt-liuqin-fumu']
  .every((id) => CARD_CITATIONS['bazi-liuqin'].refs.includes(id)));
// 这条盯的是立场，不是文案：插件说「神煞不主吉凶」，得指得出是原书说的，不能只有今人主张。
ok('神煞不主吉凶有滴天髓原文依据', /三奇二德虚好语/.test(citationOf('dt-nvming-shensha').quote)
  && CARD_CITATIONS['bazi-shensha'].refs.includes('dt-nvming-shensha'));

const missingText = [];
const unverified = [];
for (const c of all) {
  const text = FX.chapters[c.url];
  if (!text) { missingText.push(c.id); continue; }
  const q = c.verifiedQuote || c.quote;
  if (!norm(text).includes(norm(q))) unverified.push(c.id);
}
ok('每条引文的来源正文都在 fixture 里', missingText.length === 0, missingText.join(','));
ok('原文子串逐条核验通过', unverified.length === 0, unverified.join(','));
ok('异文条目标出 verifiedQuote 与说明', CLASSICS.filter((c) => c.variantNote).every((c) => c.verifiedQuote && c.variantNote.length > 8));
ok('引文不把白话混进原文', all.every((c) => !c.quote.includes('本站') && !c.quote.includes('本插件')));

// ── ② 知识卡覆盖 ────────────────────────────────────────────
const ids = new Set(KNOWLEDGE.map((k) => k.id));
ok('每张知识卡都有索引', KNOWLEDGE.every((k) => CARD_CITATIONS[k.id]), KNOWLEDGE.filter((k) => !CARD_CITATIONS[k.id]).map((k) => k.id).join(','));
ok('索引里没有不存在的卡', Object.keys(CARD_CITATIONS).every((id) => ids.has(id)), Object.keys(CARD_CITATIONS).filter((id) => !ids.has(id)).join(','));
ok('状态取值合法', Object.values(CARD_CITATIONS).every((e) => (Array.isArray(e.refs) && e.refs.length) || ['general', 'todo'].includes(e.status)));
ok('general/todo 都写了理由', Object.values(CARD_CITATIONS).filter((e) => !Array.isArray(e.refs)).every((e) => e.reason && e.reason.length >= 4 && e.book));

const badRefs = [];
for (const [id, e] of Object.entries(CARD_CITATIONS)) {
  for (const ref of e.refs || []) if (!citationOf(ref)) badRefs.push(`${id}→${ref}`);
}
ok('知识卡引用的 id 都能解析', badRefs.length === 0, badRefs.join(','));

const verifiedCards = KNOWLEDGE.filter((k) => Array.isArray(CARD_CITATIONS[k.id].refs) && CARD_CITATIONS[k.id].refs.length);
const generalCards = KNOWLEDGE.filter((k) => CARD_CITATIONS[k.id].status === 'general');
const todoCards = KNOWLEDGE.filter((k) => CARD_CITATIONS[k.id].status === 'todo');
ok('已定位原文的知识卡 ≥ 17', verifiedCards.length >= 17, String(verifiedCards.length));
ok('通行说与待补单独计数', generalCards.length + todoCards.length > 0, `general ${generalCards.length} / todo ${todoCards.length}`);

// ── ③ 破格规则引用 ──────────────────────────────────────────
const graded = Object.entries(PATTERN_BREAK_RULES).filter(([, r]) => !r.kind);
ok('可判破格的格局都带引文', graded.every(([, r]) => Array.isArray(r.citationIds) && r.citationIds.length > 0), graded.filter(([, r]) => !r.citationIds).map(([n]) => n).join(','));
ok('破格引文全部可解析', patternCitations().every((p) => p.citations.length === p.citationIds.length), patternCitations().filter((p) => p.citations.length !== p.citationIds.length).map((p) => p.name).join(','));
ok('忌格/结构标签不硬配破格引文', Object.entries(PATTERN_BREAK_RULES).filter(([, r]) => r.kind).every(([, r]) => !r.citationIds));

// ── ③′ B7：34 条格局的成格原文（2026-11-06 补入卷一赋文九篇、卷三两篇）
const U1 = 'https://zh.wikisource.org/wiki/紫微斗數全書/卷一';
const U3 = 'https://zh.wikisource.org/wiki/紫微斗數全書/卷三';
const CH1 = ['卷一·太微赋', '卷一·斗数发微论', '卷一·重补斗数彀率', '卷一·增补太微赋', '卷一·斗数骨髓赋',
  '卷一·定富贵贫贱十等论', '卷一·十二宫诸星得地合格诀', '卷一·十二宫诸星失陷破格诀', '卷一·女命骨髓赋'];
ok('B7 卷一九篇都已登记', CH1.every((ch) => LIBRARY_CITATIONS.some((c) => c.chapter === ch)), CH1.filter((ch) => !LIBRARY_CITATIONS.some((c) => c.chapter === ch)).join(','));
ok('B7 卷三补两篇', ['卷三·论男女命同异', '卷三·论人生时要审的确'].every((ch) => LIBRARY_CITATIONS.some((c) => c.chapter === ch)));
ok('紫微引文已过百', LIBRARY_CITATIONS.filter((c) => c.book === 'ziwei').length >= 100, String(LIBRARY_CITATIONS.filter((c) => c.book === 'ziwei').length));

const cheng = patternChengCitations();
ok('成格原文覆盖 31 条、未配对 3 条', cheng.length === 31 && Object.keys(PATTERN_CHENG_UNMATCHED).length === 3, `${cheng.length}+${Object.keys(PATTERN_CHENG_UNMATCHED).length}`);
ok('每条格局都有去处', Object.keys(PATTERN_TONE).every((n) => PATTERN_CHENG_CITATIONS[n] || PATTERN_CHENG_UNMATCHED[n]), Object.keys(PATTERN_TONE).filter((n) => !PATTERN_CHENG_CITATIONS[n] && !PATTERN_CHENG_UNMATCHED[n]).join(','));
ok('成格索引不装不存在的格局', [...Object.keys(PATTERN_CHENG_CITATIONS), ...Object.keys(PATTERN_CHENG_UNMATCHED)].every((n) => PATTERN_TONE[n]));
ok('成格引文全部可解析且都属紫微', cheng.every((p) => p.citations.length === p.citationIds.length && p.citations.every((c) => c && c.book === 'ziwei')), cheng.filter((p) => p.citations.length !== p.citationIds.length).map((p) => p.name).join(','));
ok('成格条目都写了与原文的出入', cheng.every((p) => (p.note || '').length >= 12), cheng.filter((p) => (p.note || '').length < 12).map((p) => p.name).join(','));
// 对不上句子的就是对不上；写清缺什么是这条索引的底线
ok('未配对的三条不硬配', ['英星入庙', '火铃夹命', '羊陀夹忌'].every((n) => !PATTERN_CHENG_CITATIONS[n] && (PATTERN_CHENG_UNMATCHED[n] || '').length >= 20));
ok('夹格同引骨髓赋夹局句', ['日月夹命', '左右夹命', '昌曲夹命', '羊陀夹命'].every((n) => (PATTERN_CHENG_CITATIONS[n].ids || []).includes('zw-gusu-jiaju')));
ok('夹局原文点明羊陀夹为乞丐', /夹羊夹陀为乞丐/.test(citationOf('zw-gusu-jiaju').quote));
ok('左右夹另引太微赋夹帝句', (PATTERN_CHENG_CITATIONS['左右夹命'].ids || []).includes('zw-taiwei-jiaju') && /輔弼夾帝為上品/.test(citationOf('zw-taiwei-jiaju').quote));
// 三处口径分歧必须留在 note 里，不许被「顺手统一」掉
ok('泛水桃花写明亥子与子之异', /亥子/.test(PATTERN_CHENG_CITATIONS['泛水桃花'].note) && /犯水桃花/.test(citationOf('zw-taiwei-fanshui').quote));
ok('天罗地网写明限至与守命之别', /限至/.test(PATTERN_CHENG_CITATIONS['天罗地网'].note));
ok('极向离明保留无杀凑前提', /无杀凑/.test(PATTERN_CHENG_CITATIONS['极向离明'].note));

const b7cards = ['ziwei-ji-duo', 'ziwei-shixian-jue', 'ziwei-nanv-ming'];
ok('B7 新增三卡存在', b7cards.every((id) => KNOWLEDGE.some((k) => k.id === id)));
ok('B7 新增三卡都带 refs', b7cards.every((id) => (CARD_CITATIONS[id].refs || []).length > 0));
ok('B7 新增三卡 source 富化到原文', b7cards.every((id) => citationSourceOf(id).status === 'verified'));
ok('吉凶多寡两条并引', ['zw-taiwei-ji-xiong', 'zw-gaolv-jiongji'].every((id) => CARD_CITATIONS['ziwei-ji-duo'].refs.includes(id)));
ok('破格卡补引骨髓赋与彀率十等论', ['zw-gusu-yili', 'zw-gaolv-jiongji', 'zw-shideng-qianguan'].every((id) => CARD_CITATIONS['ziwei-poge'].refs.includes(id)));
// 诀与表在同一本书里判反，是本轮最值钱的一条发现，钉住不许抹平
ok('得地诀与庙旺表冲突写进卡', /庙子午/.test(KNOWLEDGE.find((k) => k.id === 'ziwei-shixian-jue').note));
ok('卷一引文不只出自一篇赋', new Set(LIBRARY_CITATIONS.filter((c) => c.url === U1).map((c) => c.chapter)).size >= 9);

// ── ③″ B8：六爻源头三本 + 地相五本 + 紫微定局（2026-11-06）
ok('B8 六爻三本已登记', CITATION_BOOKS.huangjince.name === '黄金策'
  && CITATION_BOOKS.jingshi.name === '京氏易传' && CITATION_BOOKS.huozhulin.name === '火珠林');
ok('B8 地相五本已登记', ['zangshu', 'qingnang', 'aoyu', 'hanlong', 'rudidian'].every((k) => (CITATION_BOOKS[k] || {}).name));
const b8ids = ['lj-yuejian-richen', 'lj-shiying-bibi', 'lj-yongshen-youqi', 'lj-taiguo-buji', 'lj-fushen-tiba',
  'lj-yingqi-chongpo', 'lj-jintui-jiaochong', 'lj-shensha-shengke', 'lj-hunyin-liuchong',
  'js-ganfei-fufeifu', 'js-bagong-zongang', 'js-shiying-guihun',
  'hzl-liuqin-genyuan', 'hzl-duifa-luandong', 'hzl-shiying-women', 'zm-zhunsheng-shenming', 'zm-xingyuan-yinmao'];
ok('B8 引擎侧 17 条都在库里', b8ids.every((id) => CITATIONS.some((c) => c.id === id)),
  b8ids.filter((id) => !CITATIONS.some((c) => c.id === id)).join(','));
// 黄金策与京氏易传各管一层：前者是赋文总纲，后者是八宫结构本身
ok('黄金策九条分主两章', LIBRARY_CITATIONS.filter((c) => c.book === 'huangjince').length === 9
  && LIBRARY_CITATIONS.filter((c) => c.book === 'huangjince').every((c) => /^(一·|七·)/.test(c.chapter)));
ok('京氏易传三条都在卷上', LIBRARY_CITATIONS.filter((c) => c.book === 'jingshi').every((c) => c.chapter.startsWith('卷上·')));
// 世应单列一卡，并且真的指到京房逐卦的注文，不是只挂一本清人书
ok('世应卡已接线并引到京氏', (CARD_CITATIONS['liuyao-shiying'].refs || []).includes('js-shiying-guihun')
  && (CARD_CITATIONS['liuyao-shiying'].refs || []).includes('lj-shiying-bibi'));
ok('世应卡不冒充口诀：通行推步写在卡上', /通行/.test(KNOWLEDGE.find((k) => k.id === 'liuyao-shiying').note));
// 地相没有解读层：原文只进 fuwen，一条都不许挂到卡上（挂了就是拿没实现的东西充数）
const fsBooks = ['zangshu', 'qingnang', 'aoyu', 'hanlong', 'rudidian'];
const fsIds = LIBRARY_CITATIONS.filter((c) => fsBooks.includes(c.book)).map((c) => c.id);
const usedFs = fsIds.filter((id) => Object.values(CARD_CITATIONS).some((e) => (e.refs || []).includes(id)));
ok('地相五本只入引文库、不进引擎侧', fsIds.length >= 12 && usedFs.length === 0
  && fsIds.every((id) => !CITATIONS.some((c) => c.id === id)), `${fsIds.length} 条 / 误用 ${usedFs.join(',')}`);
ok('地相无解读层', !KNOWLEDGE.some((k) => k.system === 'fengshui'));
// 两书同句：谁先谁后不判断，只并列
ok('葬书与青囊经同句互指', /青囊经/.test(citationOf('fs-zangshu-chengfeng').plain)
  && /葬书/.test(citationOf('fs-qingnang-huacheng').plain)
  && /不判断|并列/.test(citationOf('fs-qingnang-huacheng').plain));
// 替卦诀的祖本在奥语，不在沈氏——这条是本仓玄空层的真实来路
ok('坤壬乙诀原句入奥语条', /坤壬乙/.test(citationOf('fs-aoyu-kunrenyi').quote)
  && /沈氏玄空学/.test(citationOf('fs-aoyu-kunrenyi').plain));
// 卦身：本站未起，就不许借这条原文装成已实现
ok('卦身条存在但不挂卡', citationOf('hzc-guashen') && !Object.values(CARD_CITATIONS).some((e) => (e.refs || []).includes('hzc-guashen')));
ok('卦身条写明未起卦身', /未起卦身/.test(citationOf('hzc-guashen').plain));
// 紫微卷一 B8 又补六篇；定贵局的定义与原判定条件的差写进 note
ok('B8 卷一又补六篇', ['卷一·形性赋', '卷一·星垣论', '卷一·斗数准绳', '卷一·定贵局', '卷一·定富局', '卷一·定贫贱局']
  .every((ch) => LIBRARY_CITATIONS.some((c) => c.chapter === ch)),
  ['卷一·形性赋', '卷一·星垣论', '卷一·斗数准绳', '卷一·定贵局', '卷一·定富局', '卷一·定贫贱局'].filter((ch) => !LIBRARY_CITATIONS.some((c) => c.chapter === ch)).join(','));
ok('定贵局定义并进成格索引', ['君臣庆会', '日月夹命', '日出扶桑', '月朗天门', '马头带箭', '刑囚夹印', '命里逢空']
  .every((n) => (PATTERN_CHENG_CITATIONS[n].ids || []).some((id) => /^zm-ding(gui|fu|pinjian)/.test(id))),
  ['君臣庆会', '日月夹命', '日出扶桑', '月朗天门', '马头带箭', '刑囚夹印', '命里逢空'].filter((n) => !(PATTERN_CHENG_CITATIONS[n].ids || []).some((id) => /^zm-ding(gui|fu|pinjian)/.test(id))).join(','));
ok('君臣庆会写明同守命与否照之别', /同守命|同宫/.test(PATTERN_CHENG_CITATIONS['君臣庆会'].note));
ok('刑囚夹印不混天刑与擎羊', /天刑/.test(PATTERN_CHENG_CITATIONS['刑囚夹印'].note));
ok('英星入庙仍不硬配金灿光辉', !PATTERN_CHENG_CITATIONS['英星入庙'] && /金灿光辉/.test(PATTERN_CHENG_UNMATCHED['英星入庙']));
// 星垣论与卷三庙旺表是两套口径，并引而不合并
ok('庙旺卡并引星垣论并写口径差', (CARD_CITATIONS['ziwei-miaowang'].refs || []).includes('zm-xingyuan-yinmao')
  && /星垣论/.test(CARD_CITATIONS['ziwei-miaowang'].note || ''));
// 计数是有意的锁：动两侧条目必须显式改这里，与 ④ 段「通行说计数」同一条思路
ok('B14 后两侧计数 182+274=456', CITATIONS.length === 182 && FUWEN_CITATIONS.length === 274
  && LIBRARY_CITATIONS.length === 456, `${CITATIONS.length}+${FUWEN_CITATIONS.length}=${LIBRARY_CITATIONS.length}`);
ok('B8 批次条目不写省略号', b8ids.every((id) => !/[….](\.\.\.)?/.test(citationOf(id).quote)));

// ── ③‴ B9：穷通宝鉴 120 格——已经打包给用户的原文必须可核验（2026-11-07）
// 起因：engine/qiongtong.js 早就把 120 格摘句打进浏览器，解析页「穷通宝鉴」节直接照录给用户，
// 而底本 tools/_qt2.json 没进版本库、引文库只挂着 1 条「五行总论」——等于展示了 120 句无处可核的原文。
// 现底本入库（fixture 176 页），生成器改读 fixture，这里逐格核验；
// 摘句在 96 字处截断的必须留痕，展示时写明「下略」，不能让用户把半句当成完整一句。
const qtRows = qiongtongCitations();
ok('穷通 120 格齐全且 id 唯一', qtRows.length === 120 && new Set(qtRows.map((r) => r.id)).size === 120, String(qtRows.length));
ok('穷通每格都有底本页', qtRows.every((r) => FX.chapters[r.url]), qtRows.filter((r) => !FX.chapters[r.url]).map((r) => r.id).join(','));
const qtBad = qtRows.filter((r) => !norm(FX.chapters[r.url] || '').includes(norm(r.quote)));
ok('穷通 120 句原文都是底本子串', qtBad.length === 0, qtBad.map((r) => r.id).join(','));
ok('穷通原文不写省略号', qtRows.every((r) => !/[…]|\.\.\./.test(r.quote)));
// 章名：非合章的「某月某干某行」必须真等于底本首行；合章（一章管几个月）另标，不冒充单月章名
const qtTitleBad = qtRows.filter((r) => !r.shared && (FX.chapters[r.url] || '').split('\n')[0].trim() !== r.chapter.split('·')[1]);
ok('穷通非合章的章名与底本首行一致', qtTitleBad.length === 0, qtTitleBad.map((r) => `${r.id}:${r.chapter}`).join(','));
ok('合章标出来且不与非合章混', qtRows.filter((r) => r.shared).length === 19
  && qtRows.every((r) => r.shared === /（合章）$/.test(r.chapter)), `${qtRows.filter((r) => r.shared).length} 格合章`);
// 截断留痕：truncated 当且仅当底本首段原文长于 96 字；没标截断的必须等于整段，不许悄悄切半句
const isYuanWen = (s) => !/^徐乐吾/.test(s) && !/^白话/.test(s) && s.length > 8 && !/^[（(]/.test(s);
const firstPara = (url) => {
  const lines = (FX.chapters[url] || '').split('\n').map((s) => s.trim()).filter(Boolean).slice(1);
  return norm(lines.filter(isYuanWen)[0] || lines[0] || '');
};
const cutWrong = qtRows.filter((r) => r.truncated !== (firstPara(r.url).length > 96));
ok('截断标记与底本首段长度一致', cutWrong.length === 0, cutWrong.map((r) => r.id).join(','));
ok('截断格摘句正好 96 字', qtRows.filter((r) => r.truncated).every((r) => r.quote.length === 96),
  qtRows.filter((r) => r.truncated && r.quote.length !== 96).map((r) => r.id).join(','));
const silentCut = qtRows.filter((r) => !r.truncated && norm(r.quote) !== firstPara(r.url));
ok('未标截断的摘句等于整段原文', silentCut.length === 0, silentCut.map((r) => r.id).join(','));
ok('截断格共 11 格', qtRows.filter((r) => r.truncated).length === 11, String(qtRows.filter((r) => r.truncated).length));
// 展示层：截断的实盘必须写明「下略」，没截断的不许多话
const qtSample = { cut: null, whole: null };
for (let m = 1; m <= 12 && (!qtSample.cut || !qtSample.whole); m++) {
  for (const d of [5, 15, 25]) {
    const r = compute({ system: 'bazi', datetime: `1996-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}T10:00`, gender: 'male', withInterpret: true });
    const qt = r.frame && r.frame.yongshen && r.frame.yongshen.qt;
    const sec = qt && (r.interpret.sections || []).find((s) => s.key === 'qiongtong');
    if (!sec) continue;
    if (qt.truncated && !qtSample.cut) qtSample.cut = sec.text;
    if (!qt.truncated && !qtSample.whole) qtSample.whole = sec.text;
  }
}
ok('实盘里找得到截断格与完整格', !!qtSample.cut && !!qtSample.whole, `${!!qtSample.cut}/${!!qtSample.whole}`);
ok('截断格在解析里写明下略', /下略/.test(qtSample.cut || ''), (qtSample.cut || '').slice(-70));
ok('完整格不喊下略', !/下略/.test(qtSample.whole || ''), (qtSample.whole || '').slice(-70));
ok('穷通视图不另存一份原文', qtRows.every((r) => !FUWEN_CITATIONS.some((c) => c.id === r.id)), `${qtRows.length} 格由 QT 现推`);

// ── ③⁗ B9 第二批：八字四本里的三本（2026-11-07，luckclub 本逐字核验）
// 四本里《星平会海》各卷页面只有篇名目录（卷九仅 32 字），正文取不到，照实不录；
// 另外三本录 20 条：14 条接上已有八字卡，6 条是引擎根本没有的判定层，只进索引页不挂卡。
// 张楠在《神峰通考》里亲口驳从革/润下二格、质疑魁罡，这些反对意见必须留在 refs 里，不许抹平。
const b9bEngine = ['sf-quzhi', 'sf-yanshang', 'sf-jiase', 'sf-congge', 'sf-runxia', 'sf-yangren',
  'sf-rensha', 'sf-kuigang', 'sf-zaji', 'll-jianbujian', 'll-sizhugong', 'll-zheri', 'lt-geju', 'lt-xiongsha'];
const b9bDocs = ['sf-bingyao', 'sf-siyao', 'sf-dongjing', 'sf-gaitou', 'lt-quxiang', 'lt-xuanzhen'];
const b9bAll = [...b9bEngine, ...b9bDocs];
const wiredTo = (id) => Object.values(CARD_CITATIONS).some((e) => (e.refs || []).includes(id))
  || Object.values(PATTERN_BREAK_RULES).some((r) => (r.citationIds || []).includes(id))
  || Object.values(PATTERN_CHENG_CITATIONS).some((r) => (r.ids || []).includes(id));
ok('B9 第二批三本已登记且都指 luckclub 底本', ['shenfeng', 'luoluzi', 'lantai'].every((k) =>
  CITATION_BOOKS[k] && CITATION_BOOKS[k].base.includes('luckclub.cn/bazi/')));
ok('星平会海正文取不到，不登记也不拿转述充数', !CITATION_BOOKS.xingping
  && !all.some((c) => c.bookName === '星平会海' || c.url.includes('/bazi/014/')));
ok('B9 第二批 14 条都在引擎侧且原文白话配齐', b9bEngine.every((id) => CITATIONS.some((c) => c.id === id)
  && (citationOf(id).quote || '').length >= 8 && (citationOf(id).plain || '').length >= 6),
  b9bEngine.filter((id) => !CITATIONS.some((c) => c.id === id)).join(','));
ok('B9 第二批 6 条只在附文库、一条不挂卡', b9bDocs.every((id) => FUWEN_CITATIONS.some((c) => c.id === id)
  && !CITATIONS.some((c) => c.id === id) && !wiredTo(id)),
  b9bDocs.filter((id) => wiredTo(id)).join(','));
ok('B9 第二批 14 条引擎侧引文都被知识卡引用', b9bEngine.every((id) => wiredTo(id)),
  b9bEngine.filter((id) => !wiredTo(id)).join(','));
ok('B9 第二批 20 句逐句命中底本且不写省略号', b9bAll.every((id) => {
  const c = citationOf(id);
  return /luckclub\.cn\/bazi\/(008|024|026)\//.test(c.url)
    && norm(FX.chapters[c.url] || '').includes(norm(c.quote))
    && !/[…]|\.\.\./.test(c.quote);
}), b9bAll.filter((id) => !norm(FX.chapters[citationOf(id).url] || '').includes(norm(citationOf(id).quote))).join(','));
// 原文子串校验只证明句子在页面上，不证明卷章标对：神峰通考每页首行是篇名、第三行是「神峰通考 卷X」
const sfEntries = b9bAll.map(citationOf).filter((c) => c.book === 'shenfeng');
ok('神峰通考 13 条卷章与底本页首行/卷次一致', sfEntries.length === 13 && sfEntries.every((c) => {
  const [juan, jie] = c.chapter.split('·');
  const page = FX.chapters[c.url] || '';
  return jie && page.split('\n')[0].trim().startsWith(jie) && page.includes(`神峰通考 ${juan}`);
}), sfEntries.filter((c) => !(FX.chapters[c.url] || '').includes(`神峰通考 ${c.chapter.split('·')[0]}`)).map((c) => c.id).join(','));
ok('兰台妙选上中篇与底本页首行一致', b9bAll.map(citationOf).filter((c) => c.book === 'lantai')
  .every((c) => (FX.chapters[c.url] || '').split('\n')[0].includes(c.chapter)));
ok('珞琭子三条同出赋注页且不编卷次', ['ll-jianbujian', 'll-sizhugong', 'll-zheri']
  .every((id) => citationOf(id).url === 'https://www.luckclub.cn/bazi/024/001/' && !citationOf(id).chapter.startsWith('卷')));
// 接线落点：专旺五格各多一条张楠的条件，格局卡同时看到三本的分法
ok('专旺卡并引神峰五格', ['sf-quzhi', 'sf-yanshang', 'sf-jiase', 'sf-congge', 'sf-runxia']
  .every((id) => CARD_CITATIONS['bazi-zhuanwang-yuanwen'].refs.includes(id)));
ok('格局卡三书并引、杂气卡补神峰诀', ['sf-yangren', 'sf-rensha', 'lt-geju']
  .every((id) => CARD_CITATIONS['bazi-geju'].refs.includes(id))
  && CARD_CITATIONS['bazi-zaji-quyong'].refs.includes('sf-zaji'));
ok('通根/六亲/起运/神煞四卡各补一条早期出处',
  CARD_CITATIONS['bazi-tonggen-tougan'].refs.includes('ll-jianbujian')
  && CARD_CITATIONS['bazi-tonggen-tougan'].refs[0] === 'dt-yiqi-tonggen'
  && CARD_CITATIONS['bazi-liuqin'].refs.includes('ll-sizhugong')
  && CARD_CITATIONS['bazi-dayun-jiaoqi'].refs.includes('ll-zheri')
  && ['sf-kuigang', 'lt-xiongsha'].every((id) => CARD_CITATIONS['bazi-shensha'].refs.includes(id)));
ok('张楠的反对意见留着，没有被「统一口径」抹掉', /未尝有富贵者/.test(citationOf('sf-congge').quote)
  && /大谬/.test(citationOf('sf-kuigang').quote)
  && wiredTo('sf-congge') && wiredTo('sf-kuigang'));
ok('格局卡 source 富化后带上神峰通考与兰台妙选', /神峰通考/.test(citationSourceOf('bazi-geju').source)
  && /兰台妙选/.test(citationSourceOf('bazi-geju').source));

// ── ③⁕ B10 第一批：luckclub 八字书目再进六本（2026-11-07）
// 26 本逐本探过：除《星平会海》各卷只有篇名目录外，其余都能取到成篇正文（见附七）。
// 这批只录 6 本：三本原属「只有书名没有原文」（渊海子平／滴天髓阐微／五行大义）升级，
// 三本原属「未接触」（御定子平／命理约言／月谈赋）。余下 12 本探明有正文但没录，留下一批。
const b10Books = ['yuanhai', 'dtchanwei', 'wuxingdayi', 'yudingziping', 'mingliyueyan', 'yuetanfu'];
const b10Engine = ['yh-cangdun', 'yh-dayun', 'yh-liuqin', 'yh-tianyi', 'dtcw-yueling', 'dtcw-tongguan',
  'ydzp-zhengguan', 'ydzp-chengbai', 'mlyy-geju', 'mlyy-wangshuai', 'mlyy-zaji', 'mlyy-congju'];
const b10Docs = ['yh-tiji', 'yh-yangren', 'yh-kongwang', 'dtcw-jiaocong', 'dtcw-yinxian',
  'wxdy-tiyong', 'wxdy-xiangsheng', 'ydzp-bingyao', 'ydzp-sanming', 'mlyy-yongshen', 'mlyy-xingyun', 'ytf-zonglun'];
const b10All = [...b10Engine, ...b10Docs];
const b10Count = { yuanhai: 7, dtchanwei: 4, wuxingdayi: 2, yudingziping: 4, mingliyueyan: 6, yuetanfu: 1 };
const b10BookOf = (id) => citationOf(id).book;
ok('B10 六本都已登记且都指 luckclub 八字底本', b10Books.every((k) =>
  CITATION_BOOKS[k] && /luckclub\.cn\/bazi\/(001|007|011|018|021|023)\//.test(CITATION_BOOKS[k].base)));
ok('B10 六本共 24 条且每本条数对得上', b10All.length === 24
  && b10Books.every((k) => b10All.filter((id) => b10BookOf(id) === k).length === b10Count[k]),
  b10Books.map((k) => `${k}:${b10All.filter((id) => b10BookOf(id) === k).length}`).join(' '));
ok('B10 12 条引擎侧都配齐原文白话且接到知识卡', b10Engine.every((id) => CITATIONS.some((c) => c.id === id)
  && (citationOf(id).quote || '').length >= 8 && (citationOf(id).plain || '').length >= 6 && wiredTo(id)),
  b10Engine.filter((id) => !wiredTo(id)).join(','));
ok('B10 12 条只在附文库、一条都不挂卡', b10Docs.every((id) => FUWEN_CITATIONS.some((c) => c.id === id)
  && !CITATIONS.some((c) => c.id === id) && !wiredTo(id)), b10Docs.filter((id) => wiredTo(id)).join(','));
ok('B10 24 句逐句命中底本、不写省略号、只出自本批六本', b10All.every((id) => {
  const c = citationOf(id);
  return /luckclub\.cn\/bazi\/(001|007|011|018|021|023)\/\d+\//.test(c.url)
    && norm(FX.chapters[c.url] || '').includes(norm(c.quote))
    && !/[…]|\.\.\./.test(c.quote);
}), b10All.filter((id) => !norm(FX.chapters[citationOf(id).url] || '').includes(norm(citationOf(id).quote))).join(','));
// 原文子串只证明句子在页面上，卷章还得对页首行：渊海等四本取末段、阐微取章名、五行大义取卷次
const b10ChapterHead = (id) => {
  const c = citationOf(id);
  const head = (FX.chapters[c.url] || '').split('\n')[0].trim();
  const p = c.chapter.split('·');
  return (c.book === 'dtchanwei' ? p[1] : c.book === 'wuxingdayi' ? p[0] : p.at(-1)) === head;
};
ok('B10 24 条卷章与底本页首行一致', b10All.every(b10ChapterHead),
  b10All.filter((id) => !b10ChapterHead(id)).map((id) => `${id}:${citationOf(id).chapter}`).join(','));
// 异文与异说要并列，不许替古籍「统一口径」
ok('人元司令 5/5/20 与 7/7/16 两本异文并列', /7／7／16/.test(citationOf('dtcw-yueling').plain)
  && /5／5／20/.test(citationOf('dtcw-yueling').plain)
  && CARD_CITATIONS['bazi-yueling-siquan'].refs.includes('dtcw-yueling'));
ok('杂气取用与本仓次序相反，白话里写明分歧', /次序相反/.test(citationOf('mlyy-zaji').plain)
  && CARD_CITATIONS['bazi-zaji-quyong'].refs.includes('mlyy-zaji'));
ok('三命两说并列，不调和、不把纳音说写成珞琭子注', /不是同一套分层/.test(citationOf('ydzp-sanming').plain)
  && /每一宫有三元/.test(citationOf('ll-sizhugong').quote));
ok('星平会海仍不登记、全库没有 bazi/014 链接', !CITATION_BOOKS.xingping
  && !all.some((c) => c.url.includes('/bazi/014/')));

// ── ③⁕⁕ B10 第二批：luckclub 八字余下 12 本收尾（2026-11-07）
// 附七探完 26 本后留下 12 本「有正文但没录」，这批全部收掉。分三档：
// 能接现有八字卡的 19 条进引擎侧；古法体系外、命例随笔、近人评注、本站没有判定层的 24 条只进索引页；
// 《星平会海》仍只有篇名目录，一条不录。《星命总括》虽挂在八字目录，正文讲宫主度主七政，照实记为体系外。
const b10bBooks = {
  qianliminggao: '003',
  minglitanyuan: '009',
  lixuzhong: '010',
  yuzhao: '012',
  wuxingjingji: '013',
  bazitiyao: '015',
  guiguyiwen: '016',
  guagua: '017',
  zaohuayuanyue: '019',
  zipingguanjian: '020',
  xingmingzongkuo: '022',
  xingmingjuegu: '025',
};
const b10bEngine = [
    'qlmg-bage', 'qlmg-quge', 'qlmg-pingduan', 'qlmg-qiangruo',
    'qlmg-renyuan', 'qlmg-liuqin', 'mlty-shunni', 'mlty-yongshi',
    'mlty-shensha', 'wxjj-yinshou', 'wxjj-tiancai', 'wxjj-tianyi',
    'zhyy-tiaohou', 'zpgj-zhengguan', 'zpgj-pianguan', 'zpgj-zaqi',
    'xmjg-tianyi', 'xmjg-yangsheng', 'xmjg-kongwang'
  ];
const b10bDocs = [
    'qlmg-lichun', 'qlmg-yuejian', 'mlty-xuwen', 'lxz-jiazi',
    'lxz-qingzhuo', 'yz-zonglun', 'yz-zhuanwang', 'yz-zimao',
    'wxjj-kumu', 'wxjj-liushijiazi', 'bzty-tili', 'ggyw-sanyuan',
    'ggyw-sizhu', 'ggj-xiaoyan', 'ggj-tongbazi', 'zhyy-xitong',
    'zhyy-sanxia', 'zpgj-yangren', 'zpgj-kuigang', 'xmzk-tiyao',
    'xmzk-shitiao', 'xmjg-feiren', 'xmjg-huagi', 'xmjg-luma'
  ];
const b10bAll = [...b10bEngine, ...b10bDocs];
const b10bCount = { qianliminggao: 8, minglitanyuan: 4, lixuzhong: 2, yuzhao: 3, wuxingjingji: 5, bazitiyao: 1, guiguyiwen: 2, guagua: 2, zaohuayuanyue: 3, zipingguanjian: 5, xingmingzongkuo: 2, xingmingjuegu: 6 };
const b10bBookOf = (id) => citationOf(id).book;
const b10bHead = (id) => (FX.chapters[citationOf(id).url] || '').split('\n')[0].trim();
ok('B10 第二批 12 本都已登记且各指对应编号', Object.entries(b10bBooks).every(([k, no]) =>
  CITATION_BOOKS[k] && CITATION_BOOKS[k].base === `https://www.luckclub.cn/bazi/${no}/`));
ok('B10 第二批共 43 条且每本条数对得上', b10bAll.length === 43
  && Object.keys(b10bBooks).every((k) => b10bAll.filter((id) => b10bBookOf(id) === k).length === b10bCount[k]),
  Object.keys(b10bBooks).map((k) => `${k}:${b10bAll.filter((id) => b10bBookOf(id) === k).length}`).join(' '));
ok('B10 第二批 19 条引擎侧都配齐原文白话且接到知识卡', b10bEngine.every((id) => CITATIONS.some((c) => c.id === id)
  && (citationOf(id).quote || '').length >= 8 && (citationOf(id).plain || '').length >= 6 && wiredTo(id)),
  b10bEngine.filter((id) => !wiredTo(id)).join(','));
ok('B10 第二批 24 条只在附文库、一条都不挂卡', b10bDocs.every((id) => FUWEN_CITATIONS.some((c) => c.id === id)
  && !CITATIONS.some((c) => c.id === id) && !wiredTo(id)), b10bDocs.filter((id) => wiredTo(id)).join(','));
ok('B10 第二批 43 句逐句命中底本、不写省略号、只出自本批 12 本', b10bAll.every((id) => {
  const c = citationOf(id);
  return /luckclub\.cn\/bazi\/(003|009|010|012|013|015|016|017|019|020|022|025)\/\d+\//.test(c.url)
    && norm(FX.chapters[c.url] || '').includes(norm(c.quote))
    && !/[…]|\.\.\./.test(c.quote);
}), b10bAll.filter((id) => !norm(FX.chapters[citationOf(id).url] || '').includes(norm(citationOf(id).quote))).join(','));
// 本批 chapter 一律直接取底本页首行（书名／卷次已含在页首行里），不再拼卷次前缀
ok('B10 第二批 43 条卷章与底本页首行一致', b10bAll.every((id) => citationOf(id).chapter === b10bHead(id)),
  b10bAll.filter((id) => citationOf(id).chapter !== b10bHead(id)).map((id) => `${id}:${citationOf(id).chapter}`).join(','));
// 010 足本（2.5 万字）与 016 节录（1.2 万字）同源：纳音甲子段只在 010 登记一次，
// 016 只收它独有的「三元」「胎月日时四柱」两条，且这两句确实不在 010 足本里
ok('李虚中命书与鬼谷遗文同源但不重复登记', b10bDocs.filter((id) => id.startsWith('ggyw-')).length === 2
  && b10bDocs.filter((id) => id.startsWith('ggyw-')).every((id) => citationOf(id).url.endsWith('/002/'))
  && /几乎同文/.test(citationOf('lxz-jiazi').plain)
  && /异文/.test(citationOf('ggyw-sanyuan').plain)
  // 010 卷中有同一段的异文；但「四柱者，胎月日时」这一句 010 三卷都没有，是 016 独有的
  && norm(FX.chapters['https://www.luckclub.cn/bazi/010/004/'] || '').includes('元命胜负三元者')
  && !norm(FX.chapters['https://www.luckclub.cn/bazi/010/004/'] || '').includes('四柱者，胎月日时')
  && /不见于/.test(citationOf('ggyw-sizhu').plain));
ok('星命总括照实记体系外：两条都不挂卡、白话写明不是四柱八字',
  ['xmzk-tiyao', 'xmzk-shitiao'].every((id) => !wiredTo(id) && !CITATIONS.some((c) => c.id === id)
    && /体系外|星相体系|四柱/.test(citationOf(id).plain)));
ok('阴干顺逆两说并列挂旺衰卡，不替古籍统一口径',
  CARD_CITATIONS['bazi-wangxiang'].refs.includes('mlty-shunni')
  && CARD_CITATIONS['bazi-wangxiang'].refs.includes('xmjg-yangsheng')
  && /不替古籍统一口径/.test(citationOf('xmjg-yangsheng').plain)
  && /不调和/.test(citationOf('mlty-shunni').plain)
  && /阳干顺行/.test(citationOf('mlty-shunni').quote));
ok('偏官／七煞命名异说与正偏印定义并列挂十神对照卡',
  CARD_CITATIONS['bazi-sanming-duizhao'].refs.includes('zpgj-pianguan')
  && CARD_CITATIONS['bazi-sanming-duizhao'].refs.includes('wxjj-yinshou')
  && /异说/.test(citationOf('zpgj-pianguan').plain));
ok('神煞卡三本并列，仍不给神煞主吉凶背书',
  ['mlty-shensha', 'wxjj-tianyi', 'xmjg-tianyi'].every((id) => CARD_CITATIONS['bazi-shensha'].refs.includes(id))
  && /不采/.test(citationOf('wxjj-tianyi').plain));
ok('星平会海仍不登记、全库没有 bazi/014 链接（第二批复核）', !CITATION_BOOKS.xingping
  && !all.some((c) => c.url.includes('/bazi/014/')));


// ── ③⁕⁕⁕ B11：luckclub 跨栏目复核，大六壬 / 六爻两栏开库（2026-11-07）
// B10 只探过 /bazi/；这批先复核首页一级目录，发现 daliuren / liuyao / dixiang /
// meihua / qimen / ziwei 六个栏目同样是「书目 → 章节」结构，且都取得到成篇正文。
// 附四第四节据此改写：此前「维基文库 raw + 殆知阁藏取不到」只是那两个站点取不到，
// 不等于底本不存在。本批按下一批建议的第 1、2 项，只开大六壬与六爻两栏。
const b11Books = {
  renan: ['daliuren', '002'],
  rentanyuan: ['daliuren', '003'],
  renxinjing: ['daliuren', '004'],
  renzhinan: ['daliuren', '005'],
  rencuiyan: ['daliuren', '006'],
  renxuesuoji: ['daliuren', '008'],
  bifafu: ['daliuren', '009'],
  rengui: ['daliuren', '010'],
  bushizhengzong: ['liuyao', '001'],
  donglin: ['liuyao', '004'],
  duanyi: ['liuyao', '006'],
  bushiquanshu: ['liuyao', '007'],
  yilinbuwei: ['liuyao', '008'],
  yiyin: ['liuyao', '009'],
  yimao: ['liuyao', '010'],
  shixuezhiyao: ['liuyao', '011'],
};
const b11Engine = [
    'rty-sike',
    'rzn-rushi',
    'rzn-richen',
    'rg-tigang',
    'bszz-liuqin',
    'bszz-yongshen',
    'bszz-shiying',
    'bszz-yuanshen',
    'bszz-hechu',
    'bszz-pi-zs',
    'bszz-fushen',
    'bszz-sanchuan',
    'ylby-feifu',
    'ylby-yongshen',
    'sxzy-shiying',
  ];
const b11Docs = [
    'ra-hengji',
    'rty-yuejiang',
    'rty-dipan',
    'rty-xianfeng',
    'rxj-kezei',
    'rxj-zei',
    'rxj-zashen',
    'rzn-yuejiang',
    'rzn-kezhe',
    'rcy-yuejiang',
    'rcy-shengmu',
    'rcy-shehai',
    'rcy-yincong',
    'rxs-sanshi',
    'bff-diyifa',
    'bff-tuoshang',
    'bff-hezhong',
    'rg-yiqi',
    'bszz-yuepo',
    'bszz-pi-yl',
    'donglin-laiyi',
    'donglin-gua',
    'dytj-qiandai',
    'dytj-nayin',
    'bsqs-wugui',
    'bsqs-hechu',
    'bsqs-tianyi',
    'ylby-feifu-yi',
    'ylby-zongduan',
    'yy-shenming',
    'yy-nayin',
    'ym-jiazi',
    'ym-nayin',
    'ym-guidong',
    'sxzy-zhuangshi',
  ];
const b11All = [...b11Engine, ...b11Docs];
const b11Count = {
  renan: 1,
  rentanyuan: 4,
  renxinjing: 3,
  renzhinan: 4,
  rencuiyan: 4,
  renxuesuoji: 1,
  bifafu: 3,
  rengui: 2,
  bushizhengzong: 10,
  donglin: 2,
  duanyi: 2,
  bushiquanshu: 3,
  yilinbuwei: 4,
  yiyin: 2,
  yimao: 3,
  shixuezhiyao: 2,
};
const b11Head = (id) => (FX.chapters[citationOf(id).url] || '').split('\n')[0].trim();

ok('B11 16 本都已登记且各指对应栏目与编号', Object.entries(b11Books).every(([k, [d, no]]) =>
  CITATION_BOOKS[k] && CITATION_BOOKS[k].base === `https://www.luckclub.cn/${d}/${no}/`));
ok('B11 共 50 条且每本条数对得上', b11All.length === 50
  && Object.keys(b11Books).every((k) => b11All.filter((id) => citationOf(id).book === k).length === b11Count[k]),
  Object.keys(b11Books).map((k) => `${k}:${b11All.filter((id) => citationOf(id).book === k).length}`).join(' '));
ok('B11 15 条引擎侧都配齐原文白话且接到知识卡', b11Engine.every((id) => CITATIONS.some((c) => c.id === id)
  && (citationOf(id).quote || '').length >= 8 && (citationOf(id).plain || '').length >= 6 && wiredTo(id)),
  b11Engine.filter((id) => !wiredTo(id)).join(','));
ok('B11 35 条只在附文库、一条都不挂卡', b11Docs.every((id) => FUWEN_CITATIONS.some((c) => c.id === id)
  && !CITATIONS.some((c) => c.id === id) && !wiredTo(id)), b11Docs.filter((id) => wiredTo(id)).join(','));
ok('B11 50 句逐句命中底本、不写省略号、只出自大六壬与六爻两栏', b11All.every((id) => {
  const c = citationOf(id);
  return /luckclub\.cn\/(daliuren|liuyao)\/\d+\/\d+\//.test(c.url)
    && norm(FX.chapters[c.url] || '').includes(norm(c.quote))
    && !/[…]|\.\.\./.test(c.quote);
}), b11All.filter((id) => !norm(FX.chapters[citationOf(id).url] || '').includes(norm(citationOf(id).quote))).join(','));
ok('B11 50 条卷章与底本页首行一致', b11All.every((id) => citationOf(id).chapter === b11Head(id)),
  b11All.filter((id) => citationOf(id).chapter !== b11Head(id)).map((id) => `${id}:${citationOf(id).chapter}`).join(','));
ok('跨栏目复核：旧记「取不到正文」的毕法赋与卜筮正宗在本机确有长篇底本',
  norm(FX.chapters['https://www.luckclub.cn/daliuren/009/001/'] || '').length > 30000
  && norm(FX.chapters['https://www.luckclub.cn/liuyao/001/011/'] || '').length > 20000
  && b11All.some((id) => citationOf(id).url.includes('/daliuren/009/'))
  && b11All.some((id) => citationOf(id).url.includes('/liuyao/001/')));
ok('毕法赋按底本记 100 法，后半今人课例一条不引',
  norm(FX.chapters['https://www.luckclub.cn/daliuren/009/001/'] || '').includes('第一百法')
  && /100 法/.test(citationOf('bff-diyifa').plain)
  && /今人课例/.test(citationOf('bff-diyifa').plain)
  && !b11All.some((id) => /笔者|张先生/.test(citationOf(id).quote)));
ok('六壬学基本认识是现代编著，照不收清单不登记、全库无该链接',
  !CITATION_BOOKS.liurenxuejibenrenshi && !all.some((c) => c.url.includes('/daliuren/001/')));
ok('伏神两说并列挂同一张卡，不替古籍判谁对',
  CARD_CITATIONS['liuyao-fushen'].refs.includes('ylby-feifu')
  && CARD_CITATIONS['liuyao-fushen'].refs.includes('bszz-fushen')
  && /点名批/.test(citationOf('ylby-feifu').plain)
  && /点名批/.test(citationOf('bszz-pi-yl').plain));
ok('用神卡同时挂增删卜易原说与卜筮正宗的反对意见',
  CARD_CITATIONS['liuyao-yongshen'].refs.includes('zs-yongshen')
  && CARD_CITATIONS['liuyao-yongshen'].refs.includes('bszz-pi-zs')
  && /反对意见照留/.test(citationOf('bszz-pi-zs').plain));
ok('大六壬只挂四课一张卡，其余条目一律不凭空接卡',
  Object.keys(CARD_CITATIONS).filter((k) => k.startsWith('daliuren-')).length === 1
  && b11All.filter((id) => citationOf(id).url.includes('/daliuren/') && CITATIONS.some((c) => c.id === id)).length === 4
  && b11All.filter((id) => citationOf(id).url.includes('/daliuren/') && FUWEN_CITATIONS.some((c) => c.id === id)).length === 18
  && b11All.filter((id) => citationOf(id).url.includes('/daliuren/') && CITATIONS.some((c) => c.id === id))
    .every((id) => CARD_CITATIONS['daliuren-sike'].refs.includes(id)));
ok('六爻本批接线落在已有卡上，没有新增六爻知识卡',
  11 === b11Engine.filter((id) => citationOf(id).url.includes('/liuyao/')).length
  && Object.keys(CARD_CITATIONS).filter((k) => k.startsWith('liuyao-')).every((k) => !/bszz|ylby|sxzy|donglin|dytj|bsqs|yy-|ym-/.test(k))
  && b11Engine.filter((id) => citationOf(id).url.includes('/liuyao/')).every((id) => wiredTo(id)));

// ── ③′ B12：地相 12 本 / 紫微卷一 3 篇 / 梅花 / 奇门（2026-11-07） ──────
// 跨栏目复核后最后一批「体系已在、原文为零」的补库。选句全部逐句过底本子串，
// 取不到正文或本站没有判定层的一律 docs-only；今人按语、民国附篇、四库提要都照实分层。
const b12Ids = ["bs-xianshui", "bs-nishui", "cg-tianhuang", "cg-haishan", "dlz-xu", "fw-gangrou", "fw-dongjing", "jsy-kai", "jsy-gaodi", "slj-zhigan", "slj-qishui", "xxf-shengqi", "xxf-shuikou", "yzs-waixing", "yzs-fuyuan", "yzs-menhu", "ycj-zaowei", "ycj-tianji", "zfd-shun", "zfd-ni", "zfd-tiyao", "zjy-yuanshi", "zjy-chaxing", "zjy-xuebing", "zj-tiyao", "zj-ben", "zj-anwei", "zw-xuanwei-jixiong", "zw-xuanwei-miaowang", "zw-xuanwei-zong", "zw-shiyu-benlin", "zw-shiyu-linbang", "zw-guanyin-pan", "zw-guanyin-daxian", "mh-guashu", "mh-bachu", "mh-tiyong-shengke", "mh-biantong", "mh-lilun", "mh-dongjing", "qmf-liyan", "qmf-fugong", "qmf-xiumen", "qmf-yinyang", "ydq-yuanliu", "ydq-dunjia", "ydq-sanyuan", "ydq-shenji", "ydq-liuyi"];
const b12 = all.filter((c) => b12Ids.includes(c.id));
const b12Engine = b12.filter((c) => CITATIONS.some((x) => x.id === c.id));
const b12Docs = b12.filter((c) => FUWEN_CITATIONS.some((x) => x.id === c.id));
const pageFirst = (u) => FX.chapters[u].split('\n')[0].trim().replace(/^[\uFEFF\u200B]+/, '').trim();
const b12Of = (id) => citationOf(id);

ok('B12 共 49 条：7 条接卡、42 条只进索引页',
  b12.length === 49 && b12Engine.length === 7 && b12Docs.length === 42,
  `${b12.length} 条 = ${b12Engine.length} + ${b12Docs.length}`);
ok('B12 49 句逐条是底本页的子串',
  b12.every((c) => FX.chapters[c.url] && norm(FX.chapters[c.url]).includes(norm(c.quote))),
  b12.filter((c) => !norm(FX.chapters[c.url] || '').includes(norm(c.quote))).map((c) => c.id).join(','));
ok('B12 卷章取底本页首行；紫微三篇沿用「卷一·篇名」',
  b12.filter((c) => !c.id.startsWith('zw-')).every((c) => c.chapter === pageFirst(c.url))
  && ['zw-xuanwei-jixiong', 'zw-shiyu-benlin', 'zw-guanyin-pan'].every((id) => /^卷一·/.test(b12Of(id).chapter)),
  b12.filter((c) => !c.id.startsWith('zw-') && c.chapter !== pageFirst(c.url)).map((c) => c.id).join(','));
ok('14 本新书目登记，base 指向对应 luckclub 目录',
  ['boshan', 'cuiguan', 'dilizhengzong', 'faweilun', 'jinsuoyuguan', 'shuilongjing', 'xuexinfu',
    'yangzhaishishu', 'yuchijing', 'zangfadaozhang', 'zangjingyi', 'zhaijing',
    'qimenfaqiao', 'yudingqimen'].every((k) => CITATION_BOOKS[k] && /luckclub\.cn\/(dixiang|qimen)\/\d+\//.test(CITATION_BOOKS[k].base)));
ok('地相 12 本 27 条全在 docs-only，引擎侧零条 /dixiang/ 链接',
  b12.filter((c) => c.url.includes('/dixiang/')).length === 27
  && b12.filter((c) => c.url.includes('/dixiang/')).every((c) => b12Docs.includes(c))
  && CITATIONS.every((c) => !c.url.includes('/dixiang/')));
ok('地相每条白话都写明「无解读层、不挂知识卡」',
  b12.filter((c) => c.url.includes('/dixiang/')).every((c) => c.plain.includes('不挂知识卡')));
ok('今人文字不冒充古籍：发微论作者按与十喻歌注文一条未入库',
  all.every((c) => !c.quote.includes('斗争—统一') && !c.quote.includes('动即斗争') && !c.quote.includes('注：说明'))
  && /作者按/.test(b12Of('fw-dongjing').plain) && /今人白话注/.test(b12Of('zw-shiyu-benlin').plain));
ok('观音经验谈照实记为民国附篇，且只入索引页',
  ['zw-guanyin-pan', 'zw-guanyin-daxian'].every((id) => ['zw-guanyin-pan', 'zw-guanyin-daxian'].includes(id)
    && FUWEN_CITATIONS.some((c) => c.id === id))
  && /民国南北山人撰/.test(b12Of('zw-guanyin-pan').plain)
  && !CITATIONS.some((c) => c.id.startsWith('zw-guanyin-')));
ok('四库提要与原书分层：两条书史材料只在 docs-only',
  ['zfd-tiyao', 'zj-tiyao'].every((id) => FUWEN_CITATIONS.some((c) => c.id === id)
    && !CITATIONS.some((c) => c.id === id) && /四库/.test(b12Of(id).plain)));
ok('地理正宗只录序句，白话明写正文未收录',
  /正文未收录/.test(b12Of('dlz-xu').plain) && b12Of('dlz-xu').url.endsWith('/dixiang/003/001/'));
ok('底本讹字照录不代改：阴遁自九自一 / 赏考寻龙',
  b12Of('qmf-yinyang').quote.includes('阴遁自九自一')
  && b12Of('ycj-tianji').quote.startsWith('赏考寻龙之法'));
ok('紫微三篇的 3 条接线落在已有卡上，卷章与全书一致',
  CARD_CITATIONS['ziwei-ji-duo'].refs.includes('zw-xuanwei-jixiong')
  && CARD_CITATIONS['ziwei-miaowang'].refs.includes('zw-xuanwei-miaowang')
  && CARD_CITATIONS['ziwei-sanfang'].refs.includes('zw-shiyu-benlin'));
ok('梅花体用卡同时挂卷二生克与卷三动静',
  CARD_CITATIONS['meihua-tiyong'].refs.includes('mh-tiyong-shengke')
  && CARD_CITATIONS['meihua-tiyong'].refs.includes('mh-dongjing'));
ok('奇门阴阳遁卡同时挂卷五九宫顺逆与隐公歌三奇六仪',
  CARD_CITATIONS['qimen-yinyang'].refs.includes('qmf-yinyang')
  && CARD_CITATIONS['qimen-yinyang'].refs.includes('ydq-liuyi'));
ok('B12 的 7 条接线没有新建知识卡',
  ['ziwei-ji-duo', 'ziwei-miaowang', 'ziwei-sanfang', 'meihua-tiyong', 'qimen-yinyang']
    .every((id) => KNOWLEDGE.some((k) => k.id === id)));

// ── ③″′ B13：加深已收录书目（2026-11-07） ────────────────────────────
// 补库收官后转向「同一本书多录几章」：不探新书、不新建知识卡，只把已登记书目
// 里原本只录 1~3 条的书加深。选句逐句过底本子串，章名取页首行；
// 地相仍全 docs-only，今人按语、眉批、四库提要、查表断语一律分层注明。
const b13Ids = ["b13-bs-renxue", "b13-bs-bulong", "b13-bs-shaguan", "b13-bs-shuikou", "b13-bs-yangzhai", "b13-cg-sha", "b13-cg-yangzeng", "b13-cg-shui", "b13-fw-jusan", "b13-fw-xiangbei", "b13-fw-gangrou", "b13-fw-qiangruo", "b13-fw-shengsi", "b13-fw-qushi", "b13-jsy-nidi", "b13-jsy-shanwang", "b13-slj-shanlong", "b13-slj-lunshi", "b13-slj-ziran", "b13-slj-jiuxing", "b13-xxf-kai", "b13-xxf-dongjing", "b13-xxf-zhenxue", "b13-xxf-renmai", "b13-yzs-cengshu", "b13-yzs-damen", "b13-yzs-yinyang", "b13-yzs-siyu", "b13-yzs-tiyong", "b13-yzs-wuhudun", "b13-ycj-zhuji", "b13-ycj-malu", "b13-zfd-taiji", "b13-zfd-ershisi", "b13-zjy-xia", "b13-zjy-sishou", "b13-zjy-fuyin", "b13-zjy-zangzhi", "b13-zj-tuqi", "b13-zj-mingtang", "b13-yh-sanhe", "b13-yh-meipi", "b13-yh-nayin", "b13-yh-lupang", "b13-sf-hehun", "b13-sf-xinggong", "b13-sf-diao", "b13-sf-ruoyun", "b13-bszz-gangling", "b13-bszz-feifu", "b13-bszz-zhushu", "b13-bszz-hezhi", "b13-bszz-fannang", "b13-bff-yincong", "b13-bff-wuke", "b13-bff-sanchuan", "b13-rty-sike", "b13-rty-jiuke", "b13-rty-keti", "b13-rty-shehai", "b13-rty-chisu"];
const b13Eng = ["b13-yh-sanhe", "b13-bszz-gangling", "b13-bszz-feifu", "b13-rty-sike", "b13-rty-jiuke"];
const b13Docs = ["b13-bs-renxue", "b13-bs-bulong", "b13-bs-shaguan", "b13-bs-shuikou", "b13-bs-yangzhai", "b13-cg-sha", "b13-cg-yangzeng", "b13-cg-shui", "b13-fw-jusan", "b13-fw-xiangbei", "b13-fw-gangrou", "b13-fw-qiangruo", "b13-fw-shengsi", "b13-fw-qushi", "b13-jsy-nidi", "b13-jsy-shanwang", "b13-slj-shanlong", "b13-slj-lunshi", "b13-slj-ziran", "b13-slj-jiuxing", "b13-xxf-kai", "b13-xxf-dongjing", "b13-xxf-zhenxue", "b13-xxf-renmai", "b13-yzs-cengshu", "b13-yzs-damen", "b13-yzs-yinyang", "b13-yzs-siyu", "b13-yzs-tiyong", "b13-yzs-wuhudun", "b13-ycj-zhuji", "b13-ycj-malu", "b13-zfd-taiji", "b13-zfd-ershisi", "b13-zjy-xia", "b13-zjy-sishou", "b13-zjy-fuyin", "b13-zjy-zangzhi", "b13-zj-tuqi", "b13-zj-mingtang", "b13-yh-meipi", "b13-yh-nayin", "b13-yh-lupang", "b13-sf-hehun", "b13-sf-xinggong", "b13-sf-diao", "b13-sf-ruoyun", "b13-bszz-zhushu", "b13-bszz-hezhi", "b13-bszz-fannang", "b13-bff-yincong", "b13-bff-wuke", "b13-bff-sanchuan", "b13-rty-keti", "b13-rty-shehai", "b13-rty-chisu"];
const b13 = all.filter((c) => b13Ids.includes(c.id));
const b13Of = (id) => citationOf(id);
const b13First = (u) => FX.chapters[u].split('\n')[0].trim().replace(/^[\uFEFF\u200B]+/, '').trim();

ok('B13 共 61 条：5 条接已有卡、56 条只进索引页',
  b13.length === 61 && b13Eng.length === 5 && b13Docs.length === 56
  && b13Eng.every((id) => CITATIONS.some((c) => c.id === id))
  && b13Docs.every((id) => FUWEN_CITATIONS.some((c) => c.id === id)),
  `${b13.length} 条 = ${b13Eng.length} + ${b13Docs.length}`);
ok('B13 61 句逐条是底本页的子串、章名取页首行',
  b13.every((c) => FX.chapters[c.url] && norm(FX.chapters[c.url]).includes(norm(c.quote))
    && c.chapter === b13First(c.url)),
  b13.filter((c) => !norm(FX.chapters[c.url] || '').includes(norm(c.quote)) || c.chapter !== b13First(c.url)).map((c) => c.id).join(','));
ok('B13 不登记新书目：所有 book 都在 B12 已登记表里',
  b13.every((c) => CITATION_BOOKS[c.book] && !['yichuan', 'yuanling', 'miji'].includes(c.book)));
ok('B13 的 5 条接线全落在已有卡上，没有新建知识卡',
  b13Eng.every((id) => Object.values(CARD_CITATIONS).some((e) => (e.refs || []).includes(id)))
  && KNOWLEDGE.length === 59);
ok('三合局补上 bazi-xingchong 的第二出处',
  CARD_CITATIONS['bazi-xingchong'].refs.includes('b13-yh-sanhe')
  && /申子辰水局/.test(b13Of('b13-yh-sanhe').quote));
ok('卜筮正宗凡例同时接用神卡与伏神卡',
  CARD_CITATIONS['liuyao-yongshen'].refs.includes('b13-bszz-gangling')
  && CARD_CITATIONS['liuyao-fushen'].refs.includes('b13-bszz-feifu')
  && /易林补遗/.test(b13Of('b13-bszz-feifu').quote));
ok('探原金科玉律诀给四课三传卡补两句',
  ['b13-rty-sike', 'b13-rty-jiuke'].every((id) => CARD_CITATIONS['daliuren-sike'].refs.includes(id))
  && /九课宗首/.test(b13Of('b13-rty-jiuke').quote));
ok('地相 40 条全在 docs-only，引擎侧仍零条 /dixiang/ 链接',
  b13.filter((c) => c.url.includes('/dixiang/')).length === 40
  && b13.filter((c) => c.url.includes('/dixiang/')).every((c) => b13Docs.includes(c.id))
  && CITATIONS.every((c) => !c.url.includes('/dixiang/')));
ok('B13 地相每条白话都写明「无解读层、不挂知识卡」',
  b13.filter((c) => c.url.includes('/dixiang/')).every((c) => c.plain.includes('不挂知识卡')));
ok('今人按语与眉批分层：发微论作者按一条未录，眉批只入索引页',
  b13.every((c) => !c.quote.includes('作者按') && !c.quote.includes('聚，即统一') && !c.quote.includes('斗争'))
  && /作者按/.test(b13Of('b13-fw-jusan').plain)
  && FUWEN_CITATIONS.some((c) => c.id === 'b13-yh-meipi' && /眉批/.test(c.plain)));
ok('《地理正宗》复核后不加深：本批没有 /dixiang/003/ 条目',
  b13.every((c) => !c.url.includes('/dixiang/003/'))
  && LIBRARY_CITATIONS.filter((c) => c.url.includes('/dixiang/003/')).length === 1);
ok('毕法赋仍只录歌诀：本批 3 条都在同一页且不含今人课例',
  ['b13-bff-yincong', 'b13-bff-wuke', 'b13-bff-sanchuan'].every((id) =>
    b13Of(id).url.endsWith('/daliuren/009/001/') && /第.+法/.test(b13Of(id).quote))
  && b13.every((c) => !c.quote.includes('笔者') && !c.quote.includes('张先生')));
ok('底本讹字与内部异说照录不代改：赏闻 / 赏谓 / 心择 / 第五十三法',
  b13Of('b13-ycj-zhuji').quote.startsWith('赏闻')
  && /赏谓/.test(b13Of('b13-fw-xiangbei').quote)
  && /心择/.test(b13Of('b13-sf-xinggong').quote)
  && /第五十三法/.test(b13Of('b13-bff-wuke').quote));
ok('B13 56 条 docs-only 不被任何卡片、破格规则或成格索引引用',
  b13Docs.every((id) => !Object.values(CARD_CITATIONS).some((e) => (e.refs || []).includes(id))
    && !Object.values(PATTERN_BREAK_RULES).some((r) => (r.citationIds || []).includes(id))
    && !Object.values(PATTERN_CHENG_CITATIONS).some((r) => (r.ids || []).includes(id))));

// ── ③″″ B14：把「只有书名」三项升级成有原文（2026-11-08）──────────────
// 易传（十翼）、奇门遁甲元灵经、奇门遁甲秘笈大全。三处正文早已探到，这批只选句与接线。
// 口径：能对上引擎已有判定层的才接卡，且逐格对拍；对不上的只进索引页，不硬挂、不新造断语。
// 易传十篇全部只入库——后天方位表虽与 fengshui.js 相符，但地相一栏本站没有知识卡。
const b14Yc = ['yc-fangwei', 'yc-xingqing', 'yc-leixiang', 'yc-xiantian', 'yc-liuhua', 'yc-jixiong', 'yc-dayan', 'yc-taiji', 'yc-chonggua', 'yc-yaoxiao'];
const b14YlEng = ['yl-yinyang', 'yl-jushu', 'yl-futou', 'yl-liuyi', 'yl-ganying-jia', 'yl-ganying-bing', 'yl-ganying-yixin', 'yl-bamen'];
const b14YlDocs = ['yl-jiuxing', 'yl-xu'];
const b14MjEng = ['mj-jiuxing', 'mj-menpo', 'mj-pozhi', 'mj-rumu', 'mj-shimu', 'mj-ganying', 'mj-futou', 'mj-yinyang'];
const b14MjDocs = ['mj-qimu', 'mj-qinji', 'mj-bamen', 'mj-jiugong', 'mj-jiudun'];
const b14Eng = [...b14YlEng, ...b14MjEng];
const b14Docs = [...b14Yc, ...b14YlDocs, ...b14MjDocs];
const b14Ids = [...b14Eng, ...b14Docs];
const b14 = all.filter((c) => b14Ids.includes(c.id));
const b14Of = (id) => citationOf(id);

ok('B14 共 33 条：16 条接已有奇门卡、17 条只进索引页',
  b14.length === 33 && b14Eng.length === 16 && b14Docs.length === 17
  && b14Eng.every((id) => CITATIONS.some((c) => c.id === id))
  && b14Docs.every((id) => FUWEN_CITATIONS.some((c) => c.id === id)),
  `${b14.length} 条 = ${b14Eng.length} + ${b14Docs.length}`);
ok('B14 三本新书目已登记，登记表升到 69 本',
  CITATION_BOOKS.yichuan.name === '易传' && CITATION_BOOKS.yuanling.name === '奇门遁甲元灵经'
  && CITATION_BOOKS.miji.name === '奇门遁甲秘笈大全' && Object.keys(CITATION_BOOKS).length === 69,
  Object.keys(CITATION_BOOKS).length + ' 本');
ok('B14 33 句逐条是底本页的子串、不写省略号、只出自这三本',
  b14.every((c) => FX.chapters[c.url] && norm(FX.chapters[c.url]).includes(norm(c.quote))
    && !/[…]|\.\.\./.test(c.quote) && ['yichuan', 'yuanling', 'miji'].includes(c.book)),
  b14.filter((c) => !norm(FX.chapters[c.url] || '').includes(norm(c.quote)) || /[…]|\.\.\./.test(c.quote)).map((c) => c.id).join(','));
ok('B14 只新增 8 页底本，且全在 luckclub 的 yijing/002 与 qimen/003、005 三书下',
  new Set(b14.map((c) => c.url)).size === 8
  && b14.every((c) => /^https:\/\/www\.luckclub\.cn\/(yijing\/002|qimen\/00[35])\/\d{3}\/$/.test(c.url)),
  [...new Set(b14.map((c) => c.url))].join(' '));

// 易传：十条全在附文库，一条也不接卡（地相无知识卡，其余各篇本站无判定层）
ok('易传 10 条全在 docs-only，引擎侧零条 /yijing/ 链接',
  b14Yc.every((id) => FUWEN_CITATIONS.some((c) => c.id === id))
  && CITATIONS.every((c) => !c.url.includes('/yijing/')));
ok('易传 10 条不被任何卡片、破格规则或成格索引引用',
  b14Yc.every((id) => !Object.values(CARD_CITATIONS).some((e) => (e.refs || []).includes(id))
    && !Object.values(PATTERN_BREAK_RULES).some((r) => (r.citationIds || []).includes(id))
    && !Object.values(PATTERN_CHENG_CITATIONS).some((r) => (r.ids || []).includes(id))));
ok('易传每条白话都写明为什么不接卡',
  b14Yc.every((id) => /只入库|不接卡/.test(b14Of(id).plain)),
  b14Yc.filter((id) => !/只入库|不接卡/.test(b14Of(id).plain)).join(','));
ok('大衍蓍法引到缺字前为止，不拿「归奇於□」充数',
  b14Of('yc-dayan').quote.endsWith('揲之以四以象四时') && !b14Of('yc-dayan').quote.includes('归奇')
  && /没有实现蓍草/.test(b14Of('yc-dayan').plain));
ok('说卦传误题「老子」与缺字照实记在白话里，不代改底本',
  /老子/.test(b14Of('yc-xiantian').plain) && /缺字/.test(b14Of('yc-leixiang').plain));
ok('「变化者进退之象」不混引到化进神退神那一层',
  /不是六爻/.test(b14Of('yc-jixiong').plain) && /增删卜易/.test(b14Of('yc-jixiong').plain));
ok('「爻效天下之动」讲的是全体爻，不动动爻卡',
  /不接 liuyao-dongbian/.test(b14Of('yc-yaoxiao').plain)
  && !CARD_CITATIONS['liuyao-dongbian'].refs.includes('yc-yaoxiao'));

// 元灵经卷一：局数表与符头口径必须与引擎逐格相符，不是「看着像」
const CN_NUM = { 一: '1', 二: '2', 三: '3', 四: '4', 五: '5', 六: '6', 七: '7', 八: '8', 九: '9' };
const juFromBook = {};
for (const m of b14Of('yl-jushu').quote.matchAll(/([^\s一二三四五六七八九]{2})([一二三四五六七八九]{3})/g)) {
  juFromBook[m[1] === '惊蜇' ? '惊蛰' : m[1]] = [...m[2]].map((c) => CN_NUM[c]).join('');
}
ok('元灵经卷一局数表解析出 24 格（底本「惊蜇」归一到惊蛰）', Object.keys(juFromBook).length === 24, String(Object.keys(juFromBook).length));
ok('24 节气三元局数与引擎表逐格相符',
  Object.keys(QIMEN_JU_TABLE).length === 24
  && Object.keys(QIMEN_JU_TABLE).every((k) => QIMEN_JU_TABLE[k] === juFromBook[k]),
  Object.keys(QIMEN_JU_TABLE).filter((k) => QIMEN_JU_TABLE[k] !== juFromBook[k]).map((k) => `${k}:${QIMEN_JU_TABLE[k]}≠${juFromBook[k]}`).join(' ') || '24/24');
const qmSample = compute({ system: 'qimen', datetime: '2026-05-01T10:00', direction: 'career' });
const qmRules = (qmSample.rules || []).join(' | ');
ok('三元符头与引擎定局说明同口径（子午卯酉上元／寅申巳亥中元／辰戌丑未下元）',
  /子午卯酉为上元/.test(b14Of('yl-futou').quote) && /寅申巳亥为中元/.test(b14Of('yl-futou').quote)
  && /辰戌丑未为下元/.test(b14Of('yl-futou').quote)
  && /子午卯酉上元、寅申巳亥中元、辰戌丑未下元/.test(qmRules), qmRules.slice(0, 60));
ok('阴阳遁分界与引擎规则同口径',
  b14Of('yl-yinyang').quote === '冬至后用阳遁，夏至后用阴遁。'
  && /冬至至夏至前用阳遁，夏至至冬至前用阴遁/.test(qmRules));
ok('六仪配旬首与引擎 xunShouLiuYi 逐一相符',
  [['甲子', '戊'], ['甲戌', '己'], ['甲申', '庚'], ['甲午', '辛'], ['甲辰', '壬'], ['甲寅', '癸']]
    .every(([gz, yi]) => b14Of('yl-liuyi').quote.includes(gz + yi) && xunShouLiuYi(gz) === yi));

// 秘笈卷十五：击刑、门迫、迫制和义、入墓四层都要与引擎对得上
const jxFromBook = {};
for (const m of b14Of('mj-jiuxing').quote.matchAll(/甲[子戌申午辰寅]([戊己庚辛壬癸])(?:直符|值符)?加([一二三四五六七八九])宫/g)) jxFromBook[m[1]] = CN_NUM[m[2]];
ok('六仪刑击格解析出 6 仪且与引擎击刑表逐格相符',
  Object.keys(jxFromBook).length === 6
  && Object.entries(QIMEN_CONDITION_TABLES.jiXing).every(([k, v]) => v.palace === jxFromBook[k]),
  JSON.stringify(jxFromBook));
const PO_PALACES = { 惊门: ['3', '4'], 开门: ['3', '4'], 休门: ['9'], 伤门: ['2', '8'], 杜门: ['2', '8'], 生门: ['1'], 死门: ['1'], 景门: ['6', '7'] };
ok('门迫歌八门迫宫在引擎里全是「门克宫＝门迫」',
  /惊开三四休临九/.test(b14Of('mj-menpo').quote)
  && Object.entries(PO_PALACES).every(([g, ps]) => ps.every((p) => gatePalaceRelation(g, p).type === '门迫')),
  Object.entries(PO_PALACES).flatMap(([g, ps]) => ps.map((p) => `${g}${p}=${gatePalaceRelation(g, p).type}`)).filter((s) => !s.endsWith('门迫')).join(' '));
ok('迫制和义格四类与引擎门宫关系一一对应（底本「尅」字照录）',
  /门尅宫为迫，宫尅门为制，门生宫为和，宫生门为义/.test(b14Of('mj-pozhi').quote)
  && gatePalaceRelation('休门', '9').type === '门迫' && gatePalaceRelation('休门', '2').type === '宫制门'
  && gatePalaceRelation('休门', '3').type === '门生宫' && gatePalaceRelation('休门', '6').type === '宫生门',
  ['9', '2', '3', '6'].map((p) => gatePalaceRelation('休门', p).type).join('/'));
ok('三奇入墓歌乙丙临乾丁临艮，与引擎三奇入墓表同',
  /乙丙临干请避之/.test(b14Of('mj-rumu').quote) && /丁奇乙未临艮土/.test(b14Of('mj-rumu').quote)
  && QIMEN_CONDITION_TABLES.ruMu['乙'].palace === '6' && QIMEN_CONDITION_TABLES.ruMu['丙'].palace === '6'
  && QIMEN_CONDITION_TABLES.ruMu['丁'].palace === '8');
ok('三奇入墓歌底本「干」即乾、「乙未」未详，白话照实说不代改',
  /「干」即乾/.test(b14Of('mj-rumu').plain) && /未详/.test(b14Of('mj-rumu').plain));
// 反向证伪：时墓格不是全同，辛乙两句必须与引擎不同，否则这条引文就是在冒充一致
const SHIMU = { 丙: '6', 壬: '4', 辛: '8', 乙: '2', 戊: '6' };
const muOf = (k) => (['乙', '丙', '丁'].includes(k) ? QIMEN_CONDITION_TABLES.ruMu[k] : QIMEN_CONDITION_TABLES.liuYiRuMu[k]).palace;
ok('时墓格只戊壬丙三句与引擎相符', ['戊', '壬', '丙'].every((k) => muOf(k) === SHIMU[k]),
  ['戊', '壬', '丙'].map((k) => `${k}${muOf(k)}/${SHIMU[k]}`).join(' '));
ok('时墓格辛乙两句与引擎相异，且白话写明异在哪一宫',
  muOf('辛') !== SHIMU['辛'] && muOf('乙') !== SHIMU['乙']
  && /辛丑墓艮/.test(b14Of('mj-shimu').plain) && /辛墓辰巽/.test(b14Of('mj-shimu').plain)
  && /乙未墓坤/.test(b14Of('mj-shimu').plain) && /乙墓戌乾/.test(b14Of('mj-shimu').plain),
  `辛 引擎${muOf('辛')}/书${SHIMU['辛']}，乙 引擎${muOf('乙')}/书${SHIMU['乙']}`);
ok('奇墓格乙临坤与引擎乙墓戌不同，只入索引页不接卡',
  /乙到临坤/.test(b14Of('mj-qimu').quote) && QIMEN_CONDITION_TABLES.ruMu['乙'].palace === '6'
  && FUWEN_CITATIONS.some((c) => c.id === 'mj-qimu')
  && !Object.values(CARD_CITATIONS).some((e) => (e.refs || []).includes('mj-qimu')));
ok('入墓卡 source 不再泛称「六仪入墓见卷十五」，改为写明只三句相符',
  !/六仪入墓见《奇门遁甲秘笈大全》卷十五/.test(KNOWLEDGE.find((k) => k.id === 'qimen-rumu').source)
  && /时墓格只戊、壬、丙三句与本盘相符/.test(KNOWLEDGE.find((k) => k.id === 'qimen-rumu').source));

// 十干克应：从 general 升 verified，但 refs 只证三组异文与「惟看门如何」的口径，不证 100 组全表
ok('十干克应卡已落到原文，且 note 写明只证三组不证全表',
  citationSourceOf('qimen-ganying').status === 'verified'
  && CARD_CITATIONS['qimen-ganying'].refs.length === 4
  && /不证通行 100 组表全文/.test(CARD_CITATIONS['qimen-ganying'].note || ''),
  citationSourceOf('qimen-ganying').status);
ok('元灵经甲加甲「惟看门如何」正是克应卡不单独断吉凶的依据',
  /惟看门如何/.test(b14Of('yl-ganying-jia').quote) && /门吉则吉，门凶则凶/.test(b14Of('yl-ganying-jia').quote)
  && /不单独回答/.test(KNOWLEDGE.find((k) => k.id === 'qimen-ganying').detail));
ok('青龙返首／反首与青龙逃走三处断语各别，白话并列不合并',
  /青龙返首/.test(b14Of('yl-ganying-bing').quote) && /青龙反首/.test(b14Of('mj-ganying').quote)
  && /主财失逃亡/.test(b14Of('yl-ganying-yixin').quote) && /财物废坠/.test(b14Of('mj-ganying').quote)
  && /奴仆拐带/.test(b14Of('yl-ganying-yixin').plain));
ok('元灵经卷二只存甲乙丙三组：本批不声称录到 100 组',
  /只存天盘甲、乙、丙三组/.test(CARD_CITATIONS['qimen-ganying'].note || '')
  && b14YlEng.filter((id) => id.startsWith('yl-ganying')).length === 3);

// 接线范围与只入库条目的边界
ok('B14 的 16 条接线全落在五张已有奇门卡上，没有新建知识卡',
  b14Eng.every((id) => ['qimen-yinyang', 'qimen-jixing', 'qimen-rumu', 'qimen-wangshuai-yong', 'qimen-ganying']
    .some((card) => (CARD_CITATIONS[card].refs || []).includes(id)))
  && KNOWLEDGE.length === 59);
ok('B14 17 条 docs-only 不被任何卡片、破格规则或成格索引引用',
  b14Docs.every((id) => !Object.values(CARD_CITATIONS).some((e) => (e.refs || []).includes(id))
    && !Object.values(PATTERN_BREAK_RULES).some((r) => (r.citationIds || []).includes(id))
    && !Object.values(PATTERN_CHENG_CITATIONS).some((r) => (r.ids || []).includes(id))));
ok('九遁属兵占查表断语，本站无判定层故只入库',
  /没有九遁判定层/.test(b14Of('mj-jiudun').plain) && FUWEN_CITATIONS.some((c) => c.id === 'mj-jiudun'));
ok('天禽寄西南与引擎「中五宫寄坤二」同口径',
  /寄西南而属中宫/.test(b14Of('mj-qinji').quote) && /中五宫寄坤二宫/.test(qmRules));

// 排盘事实表：九星、八门、九宫方位只入库，但结构必须完整且与引擎方位表相容
const starsFromBook = {};
for (const m of b14Of('yl-jiuxing').quote.matchAll(/([一二三四五六七八九])(天[蓬芮冲辅禽心柱任英])/g)) starsFromBook[CN_NUM[m[1]]] = m[2];
ok('元灵经九星定宫九宫齐备不重，且与引擎 BASIC_STARS 逐宫相符',
  Object.keys(starsFromBook).length === 9 && new Set(Object.values(starsFromBook)).size === 9
  && starsFromBook['5'] === '天禽' && starsFromBook['1'] === '天蓬' && starsFromBook['9'] === '天英'
  && Object.entries(QIMEN_BASE_TABLES.stars).every(([p, s]) => starsFromBook[p] === s),
  Object.entries(QIMEN_BASE_TABLES.stars).filter(([p, s]) => starsFromBook[p] !== s).map(([p, s]) => `${p}宫${s}≠${starsFromBook[p]}`).join(' ') || '9/9');
const GONG_GUA = { 坎: '1', 坤: '2', 震: '3', 巽: '4', 干: '6', 兑: '7', 艮: '8', 离: '9' };
const gatesFromBook = { 6: '开门' };
for (const m of b14Of('mj-bamen').quote.matchAll(/(休|生|伤|杜|景|死|惊)门(坎|艮|震|巽|离|坤|兑)/g)) gatesFromBook[GONG_GUA[m[2]]] = m[1] + '门';
ok('秘笈总序八门定宫八宫齐备不重，且与引擎 BASIC_GATES 逐宫相符',
  Object.keys(gatesFromBook).length === 8 && new Set(Object.values(gatesFromBook)).size === 8
  && gatesFromBook['6'] === '开门' && gatesFromBook['1'] === '休门' && gatesFromBook['9'] === '景门'
  && Object.entries(QIMEN_BASE_TABLES.gates).filter(([p]) => p !== '5').every(([p, g]) => gatesFromBook[p] === g),
  Object.entries(QIMEN_BASE_TABLES.gates).filter(([p, g]) => p !== '5' && gatesFromBook[p] !== g).map(([p, g]) => `${p}宫${g}≠${gatesFromBook[p]}`).join(' ') || '8/8');
ok('秘笈总序九宫数与后天方位齐备，八方与引擎 PALACE_DIRECTION 同',
  /坎居一、坤居二、震居三、巽居四、中央五、干六、兑七、艮八、离九/.test(b14Of('mj-jiugong').quote)
  && /离位于南，坎位于北，震东，兑西，巽东南，坤西南，艮东北，干西北/.test(b14Of('mj-jiugong').quote)
  && PALACE_DIRECTION['坎'] === '正北' && PALACE_DIRECTION['离'] === '正南' && PALACE_DIRECTION['震'] === '正东'
  && PALACE_DIRECTION['兑'] === '正西' && PALACE_DIRECTION['巽'] === '东南' && PALACE_DIRECTION['坤'] === '西南'
  && PALACE_DIRECTION['艮'] === '东北' && PALACE_DIRECTION['乾'] === '西北');
ok('说卦传只明写六方，坤西南兑正西由秘笈总序补证（不拿说卦传冒充八方俱全）',
  !/坤西南|兑正西/.test(b14Of('yc-fangwei').quote) && /兑正秋也/.test(b14Of('yc-fangwei').quote)
  && /本页没有明写/.test(b14Of('yc-fangwei').plain) && /补上说卦传未明写的那两格/.test(b14Of('mj-jiugong').plain));
ok('先天对待四对与梅花先天卦数互补相加皆九',
  /天地定位，山泽通气，雷风相薄，水火不相射/.test(b14Of('yc-xiantian').quote)
  && [['乾', '坤'], ['兑', '艮'], ['离', '坎'], ['震', '巽']].every(([a, b]) => TRI_NAME.indexOf(a) + TRI_NAME.indexOf(b) === 9)
  && /出自邵雍，不在本页/.test(b14Of('yc-xiantian').plain));
ok('元灵经序自述并存异说、略去符咒，与本站口径同',
  /有两说三说者，均亦存之/.test(b14Of('yl-xu').quote) && /书符诵咒/.test(b14Of('yl-xu').quote)
  && /光绪九年/.test(b14Of('yl-xu').chapter) && /隐溪居士/.test(CITATION_BOOKS.yuanling.author));

// ── ④ source 富化 ──────────────────────────────────────────
const vs = citationSourceOf('bazi-geju', '《子平真诠》「论用神」');
ok('已定位卡片的 source 带卷章与链接', vs.status === 'verified' && vs.source.includes('原文索引') && vs.source.includes('https://') && vs.citations.length > 0, vs.source);
const gs = citationSourceOf('ziwei-feixing', '《紫微斗数全书》飞星');
ok('通行说卡片标明原文待补，不伪造链接', gs.status === 'general' && gs.source.includes('通行说') && !gs.source.includes('http'), gs.source);
// 2026-11-01 复核：通根透干改引《滴天髓·干支总论》「天全一气…」（评注本注文里明确引作滴天髓，
// 且本地底本可逐字对上）；通行说那两句是《子平真诠》卷一注文，只作说明不冒充原文
ok('通根透干改引滴天髓干支总论', (CARD_CITATIONS['bazi-tonggen-tougan'].refs || [])[0] === 'dt-yiqi-tonggen'
  && citationSourceOf('bazi-tonggen-tougan').status === 'verified');
ok('通根透干的引文是干支总论原句', /天全一气，不可使地德莫之载/.test(citationOf('dt-yiqi-tonggen').quote)
  && citationOf('dt-yiqi-tonggen').chapter === '干支总论');
ok('通根透干写明通行说误署滴天髓', /子平真诠/.test(CARD_CITATIONS['bazi-tonggen-tougan'].note || ''));
// 2026-11-01 复核：用神化进退的喜忌分档已落到《增删卜易》卷二進神退神章原文
ok('用神化进退已落到進神退神章', Array.isArray(CARD_CITATIONS['liuyao-jintui-yong'].refs)
  && CARD_CITATIONS['liuyao-jintui-yong'].refs[0] === 'zs-jintui');
ok('用神化进退的 source 带原文索引', citationSourceOf('liuyao-jintui-yong').status === 'verified');
// 塔罗牌义对应入表后通行说升到七张；H4 杂曜安星诀再升一张（诀文只作通行说，不署《全书》）。
// B14 把十干克应卡从 general 改 refs（元灵经卷二与秘笈总序已录到原文），通行说降回七张。
// 这条计数是有意的锁，新增卡片必须显式改这里，免得「通行说」在没人注意时悄悄变多。
ok('通行说剩七张（另有 1 张待补）', generalCards.length === 7 && todoCards.length === 1, `general ${generalCards.length} / todo ${todoCards.length}`);
const ts = citationSourceOf('liuyao-yingqi-exact', '待补');
ok('待补卡片标明 todo', ts.status === 'todo' && ts.source.includes('待补原文'), ts.source);
const z = compute({ system: 'ziwei', datetime: '1955-01-02T00:00', gender: 'male', withInterpret: true });
const know = (z.interpret.dimensions || []).flatMap((d) => d.knowledge || []);
ok('解读层知识卡带引文对象', know.some((k) => Array.isArray(k.citations) && k.citations.length > 0), know.map((k) => k.id).join(','));
ok('解读层 source 带原文链接', know.some((k) => k.citations.length && k.source.includes('zh.wikisource.org')), know.map((k) => k.source).join(' | ').slice(0, 200));

// ── ⑤ 索引页同源 ────────────────────────────────────────────
const html = fs.readFileSync(new URL('../docs/citations.html', import.meta.url), 'utf8');
ok('索引页与生成器逐字一致', html === buildCitationsHTML());
ok('索引页带统计与引文库', html.includes('知识卡') && html.includes('引文库') && html.includes(String(all.length)));
ok('索引页列出紫微原文', html.includes('不以入格而论') && html.includes('紫微斗数全书'));
ok('索引页带成格原文表', html.includes('格局 → 成格原文') && html.includes('未配对原文') && html.includes('石中隐玉'));
ok('索引页统计含成格覆盖率', html.includes(`${cheng.length}/${cheng.length + Object.keys(PATTERN_CHENG_UNMATCHED).length}`), `${cheng.length}/34`);
ok('成格表把出入写在同一行', html.includes('本插件按「前后两宫夹命宫」判'));
ok('索引页无外链脚本', !/<script[^>]+src=/.test(html));

// ── ⑥ 原文不进运行时（分块预算的口径）────────────────────────
// 出处行渲染的是《书名·卷章》+链接，这四个字段留在引擎侧就够；
// quote / plain 只有索引页与 CI 用得到，一旦塞回 citations.js，
// client.bazi / hepan / ziwei 三块各背一份。分块上限自 2026-11-07 起只认
// tools/check-bundle.mjs 的 CHUNK_GZIP_CAP（原 232KB 硬线已废），
// 但「原文不进分块」这条架构约束不受预算放宽影响，仍由下面几句兜住。
const runtimeRefs = new Set([
  ...Object.values(CARD_CITATIONS).flatMap((e) => e.refs || []),
  ...Object.values(PATTERN_BREAK_RULES).flatMap((r) => r.citationIds || []),
]);
const leak = CITATIONS.filter((c) => c.quote || c.plain || c.note || c.verifiedQuote).map((c) => c.id);
ok('引擎侧一条原文都不带', leak.length === 0, leak.join(','));
ok('引擎侧每条都在 fuwen 配齐原文', engineTextGaps().length === 0, engineTextGaps().join(','));
ok('引擎侧每条引文都被运行时引用', CITATIONS.every((c) => runtimeRefs.has(c.id)),
  CITATIONS.filter((c) => !runtimeRefs.has(c.id)).map((c) => c.id).join(','));
ok('CITATION_TEXT 不多配也不漏配', new Set(CITATION_TEXT.map((t) => t.id)).size === CITATION_TEXT.length
  && CITATION_TEXT.every((t) => CITATIONS.some((c) => c.id === t.id)), `${CITATION_TEXT.length}/${CITATIONS.length}`);
ok('全库计数等于两侧相加', CITATIONS.length + FUWEN_CITATIONS.length === LIBRARY_CITATIONS.length,
  `${CITATIONS.length}+${FUWEN_CITATIONS.length}`);
ok('fuwen 不进 MODULE_ORDER', !MODULE_ORDER.includes('citations-fuwen'));
const chunkFiles = fs.readdirSync(new URL('..', import.meta.url)).filter((f) => /^client\..+\.js$/.test(f));
const inChunk = [];
for (const f of chunkFiles) {
  const code = fs.readFileSync(new URL(`../${f}`, import.meta.url), 'utf8');
  if (code.includes('citations-fuwen')) inChunk.push(`${f}:模块本体`);
  for (const c of FUWEN_CITATIONS) if (code.includes(c.id)) inChunk.push(`${f}:${c.id}`);
}
ok('未接线的原文不在任何分块里', inChunk.length === 0, inChunk.slice(0, 6).join(' | '));
