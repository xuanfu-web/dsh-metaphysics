// 解析与详解模块的测试：结构完整性 + 文案口径 + 多组输入不崩
import { compute, renderText } from '../engine/index.js';
import { interpret, DIMENSIONS, MODULE_TYPE } from '../engine/interpret.js';
import { HEX64, ZIWEI_STARS, WUXING_INDUSTRY, WUXING_ORGAN, TENGOD_STYLE } from '../engine/interpret-data.js';

let pass = 0, fail = 0;
const ok = (cond, name, extra = '') => {
  if (cond) { pass++; console.log('PASS ', name); }
  else { fail++; console.log('FAIL ', name, extra); }
};

// ── 1. 文案库完整性 ────────────────────────────────────────
ok(Object.keys(HEX64).length === 64, `六十四卦意齐全（${Object.keys(HEX64).length}/64）`);
ok(Object.keys(ZIWEI_STARS).length === 14, `紫微十四主星齐全（${Object.keys(ZIWEI_STARS).length}/14）`);
ok(Object.keys(WUXING_INDUSTRY).length === 5 && Object.keys(WUXING_ORGAN).length === 5, '五行行业与脏腑表齐全');
ok(Object.keys(TENGOD_STYLE).length === 10, `十神风格表齐全（${Object.keys(TENGOD_STYLE).length}/10）`);
ok(
  Object.values(ZIWEI_STARS).every((s) => s.trait && s.work && s.love && s.health),
  '每颗主星都写了性格/职业/感情/健康四项',
);
ok(
  Object.values(HEX64).every((h) => h.meaning && h.scene),
  '每卦都有卦意与生活落点',
);

// ── 2. 六体系结构与文案口径 ─────────────────────────────────
const CASES = {
  bazi: { system: 'bazi', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州' },
  baziFemale: { system: 'bazi', datetime: '1990-05-12T14:30', gender: 'female', address: '河北石家庄' },
  ziwei: { system: 'ziwei', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州' },
  liuyao: { system: 'liuyao', datetime: '2026-10-22T13:00', lines: [9, 7, 8, 8, 7, 6], question: '这个项目能不能成' },
  liuyaoRandom: { system: 'liuyao', datetime: '2026-01-05T09:00' },
  meihua: { system: 'meihua', mode: 'time', datetime: '2026-10-22T13:00' },
  meihuaNumber: { system: 'meihua', mode: 'number', upper: 38, lower: 61, changing: 3 },
  daliuren: { system: 'daliuren', datetime: '2026-10-22T13:00' },
  tarot3: { system: 'tarot', count: 3, question: '这份工作要不要接' },
  tarot1: { system: 'tarot', count: 1 },
  tarot5: { system: 'tarot', count: 5 },
};

const BAN = /(一定|必然|注定|肯定会|绝对会|百分百|铁定|毫无疑问)/;
const BAD_TOKEN = /(undefined|NaN|\[object|null)/;

for (const [name, args] of Object.entries(CASES)) {
  const r = compute(args);
  const it = interpret(r);
  const tag = `［${name}］`;

  if (!it) { ok(false, `${tag} interpret 返回了结果`); continue; }

  // 模块类型
  ok(it.moduleType === MODULE_TYPE[r.system], `${tag} moduleType=${it.moduleType}`);

  // 五维度齐全且顺序固定
  ok(it.dimensions.length === 5, `${tag} 五个维度齐全`);
  ok(
    it.dimensions.map((d) => d.key).join(',') === DIMENSIONS.map((d) => d.key).join(','),
    `${tag} 维度 key 与定义一致`,
    it.dimensions.map((d) => d.key).join(','),
  );
  ok(
    it.dimensions.map((d) => d.label).join('、') === '整体运势、工作与职业选择、事业发展、爱情与感情、健康状况',
    `${tag} 维度名称正确`,
  );

  // 每个维度都有解读与建议
  const allText = it.dimensions.map((d) => `${d.text} ${d.advice}`).join(' ');
  const secText = (it.sections || []).map((s) => s.text).join(' ');
  const body = `${allText} ${secText} ${it.lead}`;

  ok(it.dimensions.every((d) => d.text && d.text.length > 20), `${tag} 每个维度都有解读文本`);
  ok(it.dimensions.every((d) => d.advice && d.advice.length > 10), `${tag} 每个维度都有行动建议`);
  ok(!BAD_TOKEN.test(body), `${tag} 文本里没有 undefined/NaN`);
  ok(!BAN.test(body), `${tag} 没有绝对化或宿命论表述`, (BAN.exec(body) || [''])[0]);
  ok(!!it.disclaimer && it.disclaimer.length > 30, `${tag} 带免责提示`);
  ok(/你/.test(body), `${tag} 使用第二人称`);
  ok(/建议|可参考|倾向|不妨|可以/.test(body), `${tag} 使用倾向性措辞`);
}

// ── 3. 卦象专项：卦辞 / 爻辞 / 动爻 / 生活场景 ────────────────
{
  const it = interpret(compute(CASES.liuyao));
  const keys = (it.sections || []).map((s) => s.key);
  ok(keys.includes('guaCi'), '六爻有「卦名与卦辞大意」');
  ok(keys.includes('yaoCi'), '六爻有「爻辞与动爻」');
  ok(keys.includes('bianGua'), '六爻有「变卦与走向」');
  ok(keys.includes('scene'), '六爻有「落到生活里」');
  const yao = it.sections.find((s) => s.key === 'yaoCi');
  ok(/初爻|二爻|三爻|四爻|五爻|上爻/.test(yao.text), '爻辞段落点明了爻位');
  ok(/阳极转阴|阴极转阳/.test(yao.text), '动爻说明了阴阳转化');
}
{
  const it = interpret(compute(CASES.meihua));
  const keys = (it.sections || []).map((s) => s.key);
  ok(keys.includes('tiYong'), '梅花有「体用关系」');
  ok(keys.includes('huGua'), '梅花有「互卦与过程」');
  const ty = it.sections.find((s) => s.key === 'tiYong');
  ok(/体卦为/.test(ty.text) && /用卦为/.test(ty.text), '体用段落点明了体卦与用卦');
}

// ── 4. 塔罗：整盘连贯 + 无矛盾 ──────────────────────────────
{
  const it = interpret(compute(CASES.tarot3));
  const keys = (it.sections || []).map((s) => s.key);
  ok(keys.includes('narrative'), '塔罗有「整盘连贯解读」');
  const nar = it.sections.find((s) => s.key === 'narrative');
  ok(/主轴/.test(nar.text), '塔罗指出了整盘主轴');
  ok(/不是几件不相干的事/.test(nar.text), '塔罗说明了各牌是同一条线');
  ok(keys.includes('structure'), '塔罗有「牌面结构」');
}

// ── 5. compute(withInterpret) 与异常输入 ────────────────────
{
  const r = compute({ ...CASES.bazi, withInterpret: true });
  ok(!!r.interpret && r.interpret.dimensions.length === 5, 'compute({withInterpret:true}) 会附加解析');
  const r2 = compute({ ...CASES.bazi });
  ok(!r2.interpret, '默认不附加解析（避免输出过长）');
}

// ── 5b. 工具层打通：所问之事 / 方向 / 文本输出 ─────────────
{
  const ask = { question: '今年适合换工作吗', direction: 'career' };
  const r = compute({ ...CASES.bazi, withInterpret: true, ...ask });
  ok(r.interpret.ask.question === ask.question, '解析回显所问之事');
  ok(r.interpret.ask.directionLabel === '事业', '解析回显询问方向', r.interpret.ask.directionLabel);
  ok(r.interpret.dimensions[0].key === 'career', '聚焦维度被提到第一位', r.interpret.dimensions[0].key);
  const text = renderText(r);
  ok(text.includes('解析与详解'), 'renderText 带上解析标题');
  ok(text.includes(ask.question), 'renderText 带上所问之事');
  ok(text.includes('以上解析'), 'renderText 带上免责声明');
  ok(!renderText(compute({ ...CASES.bazi })).includes('解析与详解'), '未要求解析时文本不膨胀');
  let msg = '';
  try { compute({ system: 'qimen', datetime: '1990-05-12T14:30' }); } catch (e) { msg = String(e.message); }
  ok(/meihua/.test(msg) && /daliuren/.test(msg) && /ziwei/.test(msg), '未知体系报错列出全部六种体系', msg);
}
ok(interpret(null) === null, 'interpret(null) 返回 null');
ok(interpret({}) === null, 'interpret({}) 返回 null');
ok(interpret({ system: 'unknown' }) === null, '未支持的体系返回 null');

// ── 6. 极端输入不崩 ────────────────────────────────────────
const EDGE = [
  ['bazi 无地址', { system: 'bazi', datetime: '2000-01-01T00:00', gender: 'male' }],
  ['bazi 深夜子时', { system: 'bazi', datetime: '1985-12-31T23:30', gender: 'female', address: '乌鲁木齐' }],
  ['ziwei 无地址', { system: 'ziwei', datetime: '2010-06-15T12:00', gender: 'female' }],
  ['梅花 极大数', { system: 'meihua', mode: 'number', upper: 99999, lower: 88888 }],
  ['梅花 零', { system: 'meihua', mode: 'number', upper: 0, lower: 0 }],
  ['梅花 负数', { system: 'meihua', mode: 'number', upper: -3, lower: -5 }],
  ['六爻 非法值', { system: 'liuyao', datetime: '2026-03-03T08:00', lines: 'abc' }],
  ['六壬 子时', { system: 'daliuren', datetime: '2026-01-01T00:30' }],
];
for (const [name, args] of EDGE) {
  let bad = '';
  try {
    const it = interpret(compute(args));
    if (!it || it.dimensions.length !== 5) bad = '维度不全';
    if (it && BAD_TOKEN.test(it.dimensions.map((d) => d.text + d.advice).join(' '))) bad = '文本含无效值';
  } catch (e) { bad = String(e && e.message); }
  ok(!bad, `极端输入：${name}`, bad);
}

console.log(`\n———— ${pass} PASS / ${fail} FAIL ————`);
process.exit(fail ? 1 : 0);
