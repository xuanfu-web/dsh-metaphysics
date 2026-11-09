// 病药层（炳祥高级第 6 课口径）：只读标注，不改喜忌。
// 病＝最强忌神；正格 >35%、从格 >15% 才算病；药优先克忌，其次取泄。
import { compute } from '../engine/index.js';
import { bingyaoOf } from '../engine/geju.js';
import { ok, eq } from './_harness.mjs';

const bazi = (datetime) => compute({ system: 'bazi', datetime, gender: 'male', trueSolar: false });

// ── 一、正格：门槛 35%，最强忌神过线才算病 ──────────────────────
const r2008 = bazi('2008-12-04T01:30');
const b2008 = r2008.frame.bingyao;
eq('正格盘门槛 35%', b2008.threshold, 35);
eq('正格盘不按从格反转', b2008.favorSource, '扶抑喜忌');
eq('2008 盘有病有药', b2008.level, '有病有药');
eq('最强忌神是水（财）', b2008.sick.element, '水');
ok('水占全局 >35%', b2008.sick.pct > 35, String(b2008.sick.pct));
eq('药取土（比劫）克水', b2008.remedy.element, '土');
eq('用药方式为克', b2008.mode, '克');
ok('detail 写明门槛与药力', b2008.detail.includes('35%') && b2008.detail.includes('药力弱于病'), b2008.detail);

// 门槛是严格大于：34.7% 的金仍算无病
const b1984 = bazi('1984-06-15T10:00').frame.bingyao;
eq('1984 盘金 34.7% 未过 35%', b1984.level, '无病');
ok('detail 记为未过门槛', b1984.detail.includes('未过正格 35%'), b1984.detail);

// ── 二、克 > 泄：无克时退取泄 ──────────────────────────────────
const b1975 = bazi('1975-08-20T06:00').frame.bingyao;
eq('1975 盘有病有药', b1975.level, '有病有药');
eq('最强的病是木（官杀）', b1975.sick.element, '木');
eq('喜神无克木者，退取火泄', b1975.remedy.element, '火');
eq('用药方式为泄', b1975.mode, '泄');
ok('detail 点明克 > 泄', b1975.detail.includes('克 > 泄'), b1975.detail);

// ── 三、从格：门槛 15%，且喜忌先反转 ───────────────────────────
const r1966 = bazi('1966-06-12T13:30');
const b1966 = r1966.frame.bingyao;
ok('1966 盘判为从格', b1966.isCong && b1966.congName === '从财格', `${b1966.congName}`);
eq('从格门槛 15%', b1966.threshold, 15);
eq('从格用反转后的喜忌', b1966.favorSource, '从格反转');
ok('反转后病取印比而非财星', ['比劫', '印'].includes(b1966.sick.role), b1966.sick.role);
eq('水（比劫）9.4% 未过 15%', b1966.level, '无病');

const b1969 = bazi('1969-03-25T21:30').frame.bingyao;
ok('1969 从杀格判病', b1969.isCong && b1969.congName === '从杀格', `${b1969.congName}`);
eq('从杀格有病有药', b1969.level, '有病有药');
eq('从杀格病在比劫', b1969.sick.role, '比劫');
eq('从杀格以官杀制比劫', b1969.remedy.role, '官杀');

const b1960 = bazi('1960-12-15T15:30').frame.bingyao;
ok('1960 从儿格', b1960.isCong && b1960.congName === '从儿格', `${b1960.congName}`);
ok('从儿格忌印与官杀，不把比劫当病', ['印', '官杀'].includes(b1960.sick.role), b1960.sick.role);
eq('从儿格有病有药', b1960.level, '有病有药');

// ── 四、印为忌：财力须 ≥ 食伤 50% ──────────────────────────────
const mk = (wuxing, extra = {}) => bingyaoOf({
  dayStem: '甲', // 木日主：印=水、食伤=火、财=土、官杀=金、比劫=木
  strength: { level: '身强' },
  wuxing,
  yongshen: { favor: ['火', '土'], avoid: ['水'] },
  geju: [],
  ...extra,
});
const caiTooWeak = mk({ 水: 40, 火: 30, 土: 10 });
eq('财力不足食伤 50% → 食伤硬抗', caiTooWeak.mode, '食伤硬抗（安慰剂）');
eq('硬抗仍记有病有药', caiTooWeak.level, '有病有药');
ok('写明只能硬抗的原因', caiTooWeak.detail.includes('不足'), caiTooWeak.detail);

const caiEnough = mk({ 水: 40, 火: 30, 土: 20 });
eq('财力够 50% → 财克印', caiEnough.mode, '财克印');
eq('药取财（土）', caiEnough.remedy.element, '土');

const noRemedy = mk({ 水: 40, 火: 0.2, 土: 0 });
eq('财与食伤都不足 → 有病无药', noRemedy.level, '有病无药');
eq('有病无药时 remedy 为空', noRemedy.remedy, null);
ok('detail 写明有病无药', noRemedy.detail.includes('有病无药'), noRemedy.detail);

const noFavor = bingyaoOf({
  dayStem: '甲', strength: { level: '身强' }, wuxing: { 水: 40 }, yongshen: { favor: [], avoid: ['水'] }, geju: [],
});
eq('完全没有喜神 → 有病无药', noFavor.level, '有病无药');

// ── 五、只读：不碰原有喜忌与旺衰 ────────────────────────────────
ok('frame 带 bingyao', !!r2008.frame.bingyao);
ok('原来的 favor/avoid 未被病药层改写', r2008.frame.yongshen.avoid.includes('水') && r2008.frame.yongshen.favor.includes('土'));
ok('旺衰结论未变', ['身弱', '偏弱'].includes(r2008.strength.level), r2008.strength.level);
ok('method 声明只作标注', r2008.frame.bingyao.method.includes('不改喜忌'), r2008.frame.bingyao.method);

// ── 六、解析层可见：病药一节 ────────────────────────────────────
const it = compute({ system: 'bazi', datetime: '2008-12-04T01:30', gender: 'male', trueSolar: false, withInterpret: true, question: '今年工作' }).interpret;
const sec = (it.sections || []).find((s) => s.key === 'bingyao') || { text: '' };
ok('解析层新增「病药」一节', !!sec.text, (it.sections || []).map((s) => s.key).join(','));
ok('病药节写出三态', sec.text.includes(`【${b2008.level}】`), sec.text.slice(0, 80));
ok('病药节写出病与药的五行', sec.text.includes('水') && sec.text.includes('土'), sec.text);
ok('病药节带口径并声明只作标注', sec.text.includes('口径：') && sec.text.includes('不改喜忌'), sec.text.slice(-80));
