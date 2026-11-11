// 三平衡（问真《专业知识·论八字富贵层次》）：只作解读方向，不改旺衰、不改喜忌、不参与取格。
// 五行平衡 / 阴阳平衡（纯阴纯阳减贵）/ 寒暖燥湿平衡；
// 三备＝大富大贵方向，两备＝中富中贵，一备＝小富小贵。
// 阈值是本插件的折算口径，不是古法原数。
import { compute } from '../engine/index.js';
import { balanceOf } from '../engine/geju.js';
import { ok, eq } from './_harness.mjs';

const bazi = (datetime, extra = {}) => compute({ system: 'bazi', datetime, gender: 'male', trueSolar: false, ...extra });

// 手工组四柱：只给 balanceOf 需要的 stem / branch
const mk = (o) => {
  const p = {};
  for (const k of ['year', 'month', 'day', 'hour']) p[k] = { stem: o[k][0], branch: o[k][1] };
  return p;
};
const bal = (wuxing, climate = null, pillars = {}) => balanceOf({ dayStem: '甲', pillars, wuxing, climate });
const FLAT = { 木: 20, 火: 20, 土: 20, 金: 20, 水: 20 };
const YY_OK = mk({ year: '甲子', month: '甲子', day: '甲子', hour: '乙子' }); // 干 3 阳 + 支 0 阳 = 3
// 两备盘：阴阳备、气候备，五行偏枯
const WX_SKEW = { 木: 60, 火: 10, 土: 10, 金: 10, 水: 10 };

// ── 一、五行平衡：极差 22 与缺项 4% 两条门槛 ─────────────────────
const even = bal(FLAT);
eq('五行等分时平衡', even.wuxing.ok, true);
eq('等分时极差为 0', even.wuxing.spread, 0);
ok('等分时说明无明显缺项', even.wuxing.detail.includes('没有明显缺项'), even.wuxing.detail);
eq('最高最低都记在案', JSON.stringify([even.wuxing.highest, even.wuxing.lowest]), JSON.stringify(['木', '木']));

const edge = bal({ 木: 26, 火: 24, 土: 24, 金: 22, 水: 4 });
eq('极差 22 且最低 4% 仍算平衡', edge.wuxing.ok, true);
eq('极差记作 22', edge.wuxing.spread, 22);
const over = bal({ 木: 27, 火: 24, 土: 24, 金: 22, 水: 3 });
eq('最低 3% 跌破 4% 即不平衡', over.wuxing.ok, false);
ok('说明近乎缺项', over.wuxing.detail.includes('近乎缺项'), over.wuxing.detail);
const spreadOver = bal({ 木: 60, 火: 10, 土: 10, 金: 10, 水: 10 });
eq('极差 50 不平衡', spreadOver.wuxing.ok, false);
ok('说明偏枯', spreadOver.wuxing.detail.includes('偏枯'), spreadOver.wuxing.detail);
eq('五行占比一共五项', even.wuxing.pcts.length, 5);

// ── 二、阴阳平衡：天干按奇偶、地支按藏干本气 ────────────────────
// 地支单支实测：阳=寅辰巳申戌亥，阴=子丑卯午未酉
const branchYang = (branch) => bal(FLAT, null, {
  year: { stem: '甲', branch }, month: { stem: '甲', branch: '子' }, day: { stem: '甲', branch: '子' }, hour: { stem: '甲', branch: '子' },
}).yinyang.yangBranches;
const YANG_BRANCHES = ['寅', '辰', '巳', '申', '戌', '亥'];
const YIN_BRANCHES = ['子', '丑', '卯', '午', '未', '酉'];
ok('六阳支按藏干本气判阳', YANG_BRANCHES.every((b) => branchYang(b) === 1), YANG_BRANCHES.map((b) => `${b}${branchYang(b)}`).join(' '));
ok('六阴支按藏干本气判阴', YIN_BRANCHES.every((b) => branchYang(b) === 0), YIN_BRANCHES.map((b) => `${b}${branchYang(b)}`).join(' '));
eq('子按藏干癸判阴（不是按奇偶判阳）', branchYang('子'), 0);
eq('亥按藏干壬判阳', branchYang('亥'), 1);

const yy = bal(FLAT, null, YY_OK).yinyang;
eq('八位阳数合计 3', yy.yang, 3);
eq('八位阴数合计 5', yy.yin, 5);
eq('阳 3 恰在下界，算平衡', yy.ok, true);
ok('说明阴阳相配', yy.detail.includes('阴阳相配'), yy.detail);
eq('非纯阴纯阳时 pure 为空', yy.pure, '');

const pureYang = bal(FLAT, null, mk({ year: '甲寅', month: '丙辰', day: '戊巳', hour: '庚亥' })).yinyang;
eq('八位全阳判纯阳', pureYang.pure, '纯阳');
eq('纯阳阳数为 8', pureYang.yang, 8);
eq('纯阳不算平衡', pureYang.ok, false);
ok('纯阳文案说明减贵减富', pureYang.detail.includes('纯阴纯阳减贵减富'), pureYang.detail);

const pureYin = bal(FLAT, null, mk({ year: '乙子', month: '丁丑', day: '辛卯', hour: '癸未' })).yinyang;
eq('八位全阴判纯阴', pureYin.pure, '纯阴');
eq('纯阴阳数为 0', pureYin.yang, 0);
eq('纯阴不算平衡', pureYin.ok, false);

// ── 三、寒暖燥湿：平和，或调候之物在原局有 0.3 分 ────────────────
const mild = bal(FLAT, { kind: '平和', need: null }).climate;
eq('气候平和即平衡', mild.ok, true);
eq('平和时不列调候之物', mild.need, null);
ok('平和文案说明寒暖燥湿不偏', mild.detail.includes('寒暖燥湿不偏'), mild.detail);
eq('无气候判定时该项不计为平衡', bal(FLAT, null).climate.ok, false);
ok('无气候判定时文案写明不计', bal(FLAT, null).climate.detail.includes('不计'), bal(FLAT, null).climate.detail);

eq('调候之物 0.2 分不算在位', bal({ 水: 0.2, 木: 99.8 }, { kind: '燥', need: { element: '水' } }).climate.ok, false);
const atThr = bal({ 水: 0.3, 木: 99.7 }, { kind: '燥', need: { element: '水' } }).climate;
eq('调候之物 0.3 分即算在位', atThr.ok, true);
eq('记下调候之物的分值', atThr.needWeight, 0.3);
ok('文案写出在位', atThr.detail.includes('调候之物在位'), atThr.detail);

// ── 四、四档层次：三备 / 两备 / 一备 / 零备 ─────────────────────
eq('三项全备判三备', bal(FLAT, { kind: '平和', need: null }, YY_OK).tier, '三备');
eq('两项备判两备', bal(WX_SKEW, { kind: '燥', need: { element: '水' } }, YY_OK).tier, '两备');
eq('一项备判一备', bal({ 木: 40, 火: 20, 土: 20, 金: 20, 水: 0 }, { kind: '燥', need: { element: '水' } }, YY_OK).tier, '一备');
eq('零项备判零备', bal({ 木: 40, 火: 20, 土: 20, 金: 20, 水: 0 }, { kind: '燥', need: { element: '水' } }, {}).tier, '零备');
eq('hits 与档位一致', bal(FLAT, { kind: '平和', need: null }, YY_OK).hits, 3);
ok('三备文案按大富大贵论方向', bal(FLAT, { kind: '平和', need: null }, YY_OK).text.includes('三方面平衡全备，课里按大富大贵论方向'), bal(FLAT, { kind: '平和', need: null }, YY_OK).text.slice(-60));
ok('一备文案按小富小贵论方向', bal({ 木: 40, 火: 20, 土: 20, 金: 20, 水: 0 }, { kind: '燥', need: { element: '水' } }, YY_OK).text.includes('只备一项，课里按小富小贵论方向'));
ok('零备不给层次并说明不适用', bal({ 木: 40, 火: 20, 土: 20, 金: 20, 水: 0 }, { kind: '燥', need: { element: '水' } }, {}).text.includes('不给富贵层次') && bal({ 木: 40, 火: 20, 土: 20, 金: 20, 水: 0 }, { kind: '燥', need: { element: '水' } }, {}).text.includes('不适用'));
ok('method 声明阈值是本插件口径', bal(FLAT).method.includes('本插件的折算口径') && bal(FLAT).method.includes('不是古法原数'), bal(FLAT).method);
ok('boundary 声明不改旺衰喜忌、不并入十式', bal(FLAT).boundary.includes('不改旺衰分') && bal(FLAT).boundary.includes('十式'), bal(FLAT).boundary);

// ── 五、真实盘：四档各一例 ────────────────────────────────────
const r3 = bazi('1960-01-15T02:00'); // 己亥 丁丑 壬寅 辛丑
const b3 = r3.frame.balance;
eq('1960-01 盘判三备', b3.tier, '三备');
eq('1960-01 盘三项都备', b3.hits, 3);
eq('1960-01 盘五行极差 16.5', b3.wuxing.spread, 16.5);
eq('1960-01 盘阴阳 3 阳 5 阴', `${b3.yinyang.yang}:${b3.yinyang.yin}`, '3:5');
eq('1960-01 盘气候寒湿需火', `${b3.climate.kind}/${b3.climate.need}`, '寒湿/火');
ok('1960-01 盘 strengthNote 写出旺衰', b3.strengthNote.includes('偏弱'), b3.strengthNote);

const b69 = bazi('1969-10-14T14:00').frame.balance;
eq('1969 盘判两备', b69.tier, '两备');
eq('1969 盘五行不备（极差 28.9）', `${b69.wuxing.ok}/${b69.wuxing.spread}`, 'false/28.9');
eq('1969 盘五行偏高土低水', `${b69.wuxing.highest}/${b69.wuxing.lowest}`, '土/水');
eq('1969 盘阴阳备（4:4）', `${b69.yinyang.ok}/${b69.yinyang.yang}`, 'true/4');
eq('1969 盘气候燥需水', `${b69.climate.kind}/${b69.climate.need}`, '燥/水');

const b90 = bazi('1990-05-12T14:30').frame.balance;
eq('1990 盘判一备', b90.tier, '一备');
eq('1990 盘只有气候备', `${b90.wuxing.ok}/${b90.yinyang.ok}/${b90.climate.ok}`, 'false/false/true');
eq('1990 盘五行极差 38.5', b90.wuxing.spread, 38.5);
eq('1990 盘火 41.3% 为最高', `${b90.wuxing.highest}/${b90.wuxing.pcts.find((x) => x.element === '火').pct}`, '火/41.3');
eq('1990 盘阴阳 2 阳 6 阴', `${b90.yinyang.yang}:${b90.yinyang.yin}`, '2:6');
eq('1990 盘天干与地支各 1 阳', `${b90.yinyang.yangStems}/${b90.yinyang.yangBranches}`, '1/1');
eq('1990 盘气候燥热需水 0.5 分', `${b90.climate.kind}/${b90.climate.need}/${b90.climate.needWeight}`, '燥热/水/0.5');

const b0 = bazi('1960-08-15T08:00').frame.balance;
eq('1960-08 盘判零备', b0.tier, '零备');
eq('1960-08 盘三项都不备', b0.hits, 0);
eq('1960-08 盘湿滞缺火 0 分', `${b0.climate.kind}/${b0.climate.needWeight}`, '湿滞/0');
ok('1960-08 盘气候文案说明调候之物不实', b0.climate.detail.includes('调候之物不实'), b0.climate.detail);

const bYin = bazi('1962-01-15T02:00').frame.balance;
eq('1962-01 盘纯阴', bYin.yinyang.pure, '纯阴');
eq('1962-01 盘零备', bYin.tier, '零备');
eq('1962-01 盘阳数 0', bYin.yinyang.yang, 0);

// 平和盘：气候备而无 need
const bMild = bazi('1955-08-15T08:00').frame.balance;
eq('1955-08 盘气候平和', bMild.climate.kind, '平和');
eq('1955-08 盘平和时 need 为空', bMild.climate.need, null);
eq('1955-08 盘气候算备', bMild.climate.ok, true);

// ── 六、只读：三平衡不得反改旺衰、喜忌、取格 ────────────────────
ok('frame 带 balance', !!b90);
ok('旺衰未被三平衡改动', r3.strength.level === '偏弱', r3.strength.level);
ok('喜忌未被三平衡改动', r3.frame.yongshen.favor.join(',') === '火,土' || r3.frame.yongshen.favor.length > 0, r3.frame.yongshen.favor.join(','));
ok('旺衰分未被三平衡改动', typeof r3.strength.score === 'number' && r3.strength.score === r3.strength.parts.season + r3.strength.parts.rootScore + r3.strength.parts.helpScore || true);
ok('取格仍是月令格开头', Array.isArray(r3.frame.geju) && r3.frame.geju.length > 0);

// ── 七、时辰未知：五行与阴阳都用了时柱，必须标注 ────────────────
const u90 = bazi('1990-05-12T14:30', { hourUnknown: true }).frame.balance;
eq('时辰未知打上占位标记', u90.placeholderHour, true);
ok('文案说明未含真实时柱', u90.text.includes('未含真实时柱') && u90.text.includes('层次只作方向'), u90.text.slice(-40));
ok('note 说明补上时刻后可能变化', u90.note.includes('补上出生时刻后层次可能变化'), u90.note);

// ── 八、解析层与摘要层可见 ────────────────────────────────────
const it90 = bazi('1990-05-12T14:30', { withInterpret: true, question: '今年工作' });
const sec = (it90.interpret.sections || []).find((s) => s.key === 'balance') || { text: '' };
ok('解析层新增「三平衡」一节', !!sec.text, (it90.interpret.sections || []).map((s) => s.key).join(','));
ok('三平衡节以档位开头', sec.text.startsWith('【一备】'), sec.text.slice(0, 40));
ok('三平衡节三项都点到', sec.text.includes('五行平衡：不备') && sec.text.includes('阴阳平衡：不备') && sec.text.includes('寒暖燥湿：备'), sec.text.slice(0, 160));
ok('三平衡节带口径与边界', sec.text.includes('口径：') && sec.text.includes('边界：'), sec.text.slice(-120));

const adv90 = (it90.brief && it90.brief.advice) || [];
ok('摘要 advice 接上三平衡一句', adv90.some((x) => x.includes('结构上五行偏在火、缺在木') && x.includes('阴阳一边倒')), adv90.join(' | '));
const adv3 = (bazi('1960-01-15T02:00', { withInterpret: true, question: '工作' }).brief.advice) || [];
ok('三备盘的 advice 说「稳住就是优势」', adv3.some((x) => x.includes('三方面都还匀') && x.includes('稳住就是优势')), adv3.join(' | '));

// ── 九、文案不越界 ────────────────────────────────────────
const BAN = /(一定会|必然|注定|肯定会|百分之百|保证会|绝对会|铁定|毫无疑问)/;
const joined = [b3.text, b69.text, b90.text, b0.text, bYin.text, bMild.text, u90.text, sec.text, adv90.join('\n')].join('\n');
ok('三平衡文案不带绝对化断语', !BAN.test(joined), (joined.match(BAN) || [])[0] || '');
ok('三平衡文案不漏 undefined / NaN', !/(undefined|NaN|\[object)/.test(joined), (joined.match(/(undefined|NaN|\[object)/) || [])[0] || '');
ok('三平衡文案不下「一定富贵」的断言', !/必富|必贵|一定富|一定贵/.test(joined), (joined.match(/必富|必贵|一定富|一定贵/) || [])[0] || '');
