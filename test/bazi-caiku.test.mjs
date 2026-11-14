// 财库（问真《专业知识·八字断财富技法》）：只读标注，不改旺衰与喜忌。
// 财库＝财星（日主所克那一行）之墓落在四支上；开库＝库支被对冲。
// 「开库才发」两个前提：财为喜用、且财不弱；财为忌时开库反主破财。
import { compute } from '../engine/index.js';
import { caiKuOf } from '../engine/geju.js';
import { ok, eq } from './_harness.mjs';

const bazi = (datetime, extra = {}) => compute({ system: 'bazi', datetime, gender: 'male', trueSolar: false, ...extra });

// ── 一、五行之墓：五格映射 ──────────────────────────────────
const map = (dayStem) => caiKuOf({ dayStem, pillars: {}, wuxing: {}, yongshen: {} });
const mJia = map('甲'); // 木日主：财土，墓戌，冲辰
eq('甲木财为土', mJia.caiElement, '土');
eq('甲木财库在戌', mJia.store, '戌');
eq('土的库由辰来冲', mJia.opener, '辰');
eq('甲木日主属木', mJia.dayElement, '木');
const mBing = map('丙'); // 火日主：财金，墓丑，冲未
eq('丙火财为金', mBing.caiElement, '金');
eq('丙火财库在丑', mBing.store, '丑');
const mWu = map('戊'); // 土日主：财水，墓辰，冲戌
eq('戊土财为水', mWu.caiElement, '水');
eq('戊土财库在辰', mWu.store, '辰');
const mGeng = map('庚'); // 金日主：财木，墓未，冲丑
eq('庚金财为木', mGeng.caiElement, '木');
eq('庚金财库在未', mGeng.store, '未');
const mRen = map('壬'); // 水日主：财火，墓戌，冲辰
eq('壬水财为火', mRen.caiElement, '火');
eq('壬水财库在戌', mRen.store, '戌');
ok('method 写明是本插件口径', mJia.method.includes('本插件口径') && mJia.method.includes('非古法原数'), mJia.method);
ok('rule 写明两个前提', mJia.rule.includes('财为喜用') && mJia.rule.includes('财为忌时开库反主破财'), mJia.rule);
ok('boundary 声明只读', mJia.boundary.includes('不改旺衰分') && mJia.boundary.includes('不改喜忌'), mJia.boundary);

// ── 二、无库：不立财库，但见到冲要说明「冲不成库」 ──────────────
const noStore = caiKuOf({ dayStem: '甲', pillars: { year: { branch: '辰' } }, wuxing: { 土: 20, 木: 10 }, yongshen: { favor: ['土'] } });
eq('四支无戌则不立财库', noStore.present, false);
eq('判为无财库', noStore.verdict, '无财库');
eq('仍记下见到辰', noStore.openerPositions.join(','), 'year');
ok('detail 说明冲不成库', noStore.detail.includes('但没有戌可冲，冲不成库'), noStore.detail);
eq('无库时不算财星入库', noStore.caiInStore, false);
eq('无库时不把本气入库算成真', noStore.mainInStore, false);

// ── 三、财星入库的深浅：本气 vs 余气 ─────────────────────────
const deep = caiKuOf({
  dayStem: '甲', pillars: { year: { branch: '戌' }, month: { branch: '辰' } }, wuxing: { 土: 20, 木: 20 }, yongshen: { favor: ['土'] },
});
eq('甲+戌：库里有财', deep.caiInStore, true);
eq('戌本气戊土，正是财星入库', deep.mainInStore, true);
ok('detail 用「正合财星入库」', deep.detail.includes('正合「财星入库」'), deep.detail);
const shallow = caiKuOf({
  dayStem: '丙', pillars: { year: { branch: '丑' }, month: { branch: '未' } }, wuxing: { 金: 20, 火: 20 }, yongshen: { favor: ['金'] },
});
eq('丙+丑：库里有财（辛）', shallow.caiInStore, true);
eq('丑本气己土，财只是余气', shallow.mainInStore, false);
ok('detail 说明入得浅', shallow.detail.includes('只是余气') && shallow.detail.includes('入得浅'), shallow.detail);

// ── 四、财「不弱」的门槛是 8%（本插件折算）────────────────────
const weakAt = (pct) => caiKuOf({
  dayStem: '甲', pillars: { year: { branch: '戌' }, month: { branch: '辰' } }, wuxing: { 土: pct, 木: 100 - pct }, yongshen: { favor: ['土'] },
});
eq('7% 算弱', weakAt(7).caiWeak, true);
eq('7.9% 算弱', weakAt(7.9).caiWeak, true);
eq('8% 不算弱（门槛是严格小于）', weakAt(8).caiWeak, false);
ok('method 写明 8% 门槛', mJia.method.includes('8%'), mJia.method);

// ── 五、四个真实盘的判定 ────────────────────────────────────
// 库开 + 财为喜 + 不弱 → 主发
const r90 = bazi('1990-05-12T14:30');
const c90 = r90.frame.caiKu;
eq('1990 盘财库在丑', c90.store, '丑');
eq('1990 盘库在日支', c90.positions.join(','), 'day');
eq('1990 盘库被时支未冲开', c90.opened, true);
eq('1990 盘财为喜用', c90.favorState, '喜');
eq('1990 盘财不弱', c90.caiWeak, false);
eq('1990 盘判开库主发', c90.verdict, '开库主发');
ok('1990 盘 detail 写出财占比', c90.detail.includes('25.7%'), c90.detail);

// 库开 + 财为忌 → 反主破财
const c60 = bazi('1960-06-15T08:00').frame.caiKu;
eq('1960-06 盘财库在戌', c60.store, '戌');
eq('1960-06 盘财为忌', c60.favorState, '忌');
eq('1960-06 盘库已开', c60.opened, true);
eq('1960-06 盘判开库反主破财', c60.verdict, '开库反主破财');

// 库开 + 财为喜但偏弱 → 发而不厚
const c61a = bazi('1961-08-15T14:00').frame.caiKu;
eq('1961-08 盘财弱', c61a.caiWeak, true);
eq('1961-08 盘库已开', c61a.opened, true);
eq('1961-08 盘判开库发而不厚', c61a.verdict, '开库发而不厚');

// 库闭 + 财为喜 → 待冲开（原用 1955-08-15，旺衰改三要素后该盘转中和、财入忌，
// 换成同期同为「库闭、财为喜、财不弱」的盘，断言不变）
const c55 = bazi('1950-05-15T14:00').frame.caiKu;
eq('1950-05 盘库闭', c55.opened, false);
eq('1950-05 盘判库闭待冲开', c55.verdict, '库闭待冲开');

// 库闭 + 财为喜但偏弱 → 库闭财弱
const c61b = bazi('1961-06-15T08:00').frame.caiKu;
eq('1961-06 盘财偏弱', c61b.caiWeak, true);
eq('1961-06 盘判库闭财弱', c61b.verdict, '库闭财弱');

// 库闭 + 财为忌 → 库闭未开（破财之势未启）
const r69 = bazi('1969-10-14T14:00');
const c69 = r69.frame.caiKu;
eq('1969 盘财为忌', c69.favorState, '忌');
eq('1969 盘库闭', c69.opened, false);
eq('1969 盘判库闭未开', c69.verdict, '库闭未开');
ok('1969 盘 detail 说明破财之势未启', c69.detail.includes('破财之势未启'), c69.detail);

// 无库
const c60b = bazi('1960-08-15T08:00').frame.caiKu;
eq('1960-08 盘无财库', c60b.verdict, '无财库');
eq('1960-08 盘记下时支见辰', c60b.openerPositions.join(','), 'hour');
ok('1960-08 盘 detail 说明冲不成库', c60b.detail.includes('冲不成库'), c60b.detail);

// ── 六、中性财（喜忌两边都没有）：真实盘几乎不会出现，直接构造 ────
const midOpen = caiKuOf({
  dayStem: '甲', pillars: { year: { branch: '戌' }, month: { branch: '辰' } }, wuxing: { 土: 20 }, yongshen: { favor: [], avoid: [] },
});
eq('中性 + 库开 → 吉凶待引动', midOpen.verdict, '开库，吉凶待引动');
eq('中性财标记为「中」', midOpen.favorState, '中');
const midClosed = caiKuOf({
  dayStem: '甲', pillars: { year: { branch: '戌' } }, wuxing: { 土: 20 }, yongshen: { favor: [], avoid: [] },
});
eq('中性 + 库闭 → 也不下定语', midClosed.verdict, '库闭，吉凶待引动');

// ── 七、只读：不碰旺衰、不碰喜忌、不改取格 ──────────────────────
ok('frame 带 caiKu', !!r90.frame.caiKu);
ok('旺衰未被财库改动', r90.strength.level === '身强' && r90.strength.score === 5.5, `${r90.strength.level} ${r90.strength.score}`);
ok('喜忌未被财库改动', r90.frame.yongshen.favor.join(',') === '土,金,水', r90.frame.yongshen.favor.join(','));
ok('取格结果未被财库改动', r90.frame.primaryName === r90.frame.geju[0].name, `${r90.frame.primaryName} / ${r90.frame.geju[0].name}`);

// ── 八、时辰未知：结论依赖未知时支时必须存疑，不依赖时才能说稳 ────
const u69 = bazi('1969-10-14T14:00', { hourUnknown: true }).frame.caiKu;
eq('时辰未知打上占位标记', u69.placeholderHour, true);
ok('库闭的盘要存疑', u69.note.includes('可能落在未知的时支上') && u69.note.includes('可能整条改变'), u69.note);
ok('detail 也标注时支为占位', u69.detail.includes('（时支为占位值）'), u69.detail);

const r52 = bazi('1952-07-15T08:00');
const c52 = r52.frame.caiKu;
eq('1952 盘库在日支', c52.positions.join(','), 'day');
eq('1952 盘冲在年时两支', c52.openerPositions.join(','), 'year,hour');
const u52 = bazi('1952-07-15T08:00', { hourUnknown: true }).frame.caiKu;
eq('时辰未知后库冲都在年月日', u52.positions.join(''), 'day');
eq('时辰未知后仍判开库', u52.opened, true);
ok('库冲都在年月日时才说结论不受影响', u52.note.includes('结论不受时支影响'), u52.note);

// ── 九、解析层与摘要层可见 ──────────────────────────────────
const it90 = bazi('1990-05-12T14:30', { withInterpret: true, question: '今年工作' });
const sec = (it90.interpret.sections || []).find((s) => s.key === 'caiku') || { text: '' };
ok('解析层新增「财库」一节', !!sec.text, (it90.interpret.sections || []).map((s) => s.key).join(','));
ok('财库节以结论开头', sec.text.startsWith('【开库主发】'), sec.text.slice(0, 40));
ok('财库节带口径与边界', sec.text.includes('口径：') && sec.text.includes('边界：'), sec.text.slice(-120));

const lead90 = String(it90.brief && it90.brief.lead ? it90.brief.lead : '');
ok('摘要 lead 接上财库一句', lead90.includes('财有库（丑）') && lead90.includes('库门被未冲开'), lead90.slice(-60));
const lead69 = String(bazi('1969-10-14T14:00', { withInterpret: true, question: '工作' }).brief.lead);
ok('库闭盘的 lead 说「门还关着」', lead69.includes('门还关着'), lead69.slice(-40));
const leadNone = String(bazi('1960-08-15T08:00', { withInterpret: true, question: '工作' }).brief.lead);
ok('无库盘的 lead 说明不靠开库', leadNone.includes('没有立库') && leadNone.includes('不靠「开库」'), leadNone.slice(-40));

// ── 十、文案不越界 ────────────────────────────────────────
const BAN = /(一定会|必然|注定|肯定会|百分之百|保证会|绝对会|铁定|毫无疑问)/;
const joined = [c90.detail, c69.detail, c60.detail, c61a.detail, c61b.detail, c55.detail, c60b.detail, deep.detail, shallow.detail, midOpen.detail, midClosed.detail, sec.text, lead90, lead69, leadNone].join('\n');
ok('财库文案不带绝对化断语', !BAN.test(joined), (joined.match(BAN) || [])[0] || '');
ok('财库文案不漏 undefined / NaN', !/(undefined|NaN|\[object)/.test(joined), (joined.match(/(undefined|NaN|\[object)/) || [])[0] || '');
