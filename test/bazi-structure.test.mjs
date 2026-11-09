// 八大地支结构：只读标注的静态口径。
// 依据炳祥课程笔记（内部资料）第 2.4 / 2.5 节：
// 年支定 A 档，四支分两营；异类支的宫位权重（年 11 / 月 36 / 日 27 / 时 16）决定静态从格概率。
import { compute } from '../engine/index.js';
import { branchStructureOf, supportOf, HIDDEN_PCT, PILLAR_WEIGHT } from '../engine/structure.js';
import { ok, eq } from './_harness.mjs';

const bazi = (datetime, extra = {}) => compute({ system: 'bazi', datetime, gender: 'male', trueSolar: false, ...extra });
const gz = (r) => ['year', 'month', 'day', 'hour'].map((k) => (r.pillars[k] ? r.pillars[k].stem + r.pillars[k].branch : '--')).join(' ');

// ── 一、宫位权重与藏干百分比表 ─────────────────────────────────
eq('干支宫位权重（干合计 10）', PILLAR_WEIGHT.stem.year + PILLAR_WEIGHT.stem.month + PILLAR_WEIGHT.stem.day + PILLAR_WEIGHT.stem.hour, 10);
eq('干支宫位权重（支合计 90）', PILLAR_WEIGHT.branch.year + PILLAR_WEIGHT.branch.month + PILLAR_WEIGHT.branch.day + PILLAR_WEIGHT.branch.hour, 90);
eq('月令一支 36 分', PILLAR_WEIGHT.branch.month, 36);
for (const [branch, table] of Object.entries(HIDDEN_PCT)) {
  const sum = Object.values(table).reduce((a, b) => a + b, 0);
  eq(`${branch}藏干百分比合计 100`, sum, 100);
}
eq('午藏丁 90 / 己 10（炳祥口径，不是丁己各半）', HIDDEN_PCT.午.丁, 90);
eq('亥藏壬 70 / 甲 30', HIDDEN_PCT.亥.甲, 30);

// ── 二、得地表：半得地不计入身强阵营 ───────────────────────────
eq('甲木见亥为得地', supportOf('甲', '亥').level, '得地');
eq('甲木见辰只算半得地', supportOf('甲', '辰').level, '半得地');
eq('戊土见寅只算半得地（20%）', supportOf('戊', '寅').weight, 0.2);
eq('庚金见巳只算半得地（10%，巳酉丑合才当金）', supportOf('庚', '巳').weight, 0.1);
eq('癸水见辰为半得地（50%）', supportOf('癸', '辰').weight, 0.5);
eq('丁火见戌不按得地（须午戌合/寅午戌）', supportOf('丁', '戌').level, '半得地');

// ── 三、八种结构：直接给四支，核 code 与静态概率 ────────────────
const mk = (branches, dayStem = '甲') => branchStructureOf({
  year: { stem: '甲', branch: branches[0] },
  month: { stem: '甲', branch: branches[1] },
  day: { stem: dayStem, branch: branches[2] },
  hour: { stem: '甲', branch: branches[3] },
}, dayStem);

const cases = [
  [['亥', '亥', '亥', '亥'], 'AAAA', 99],
  [['亥', '申', '申', '申'], 'ABBB', 80],
  [['亥', '亥', '亥', '申'], 'AAAB', 55],
  [['亥', '亥', '申', '亥'], 'AABA', 20],
  [['亥', '申', '亥', '亥'], 'ABAA', 1],
  [['亥', '亥', '申', '申'], 'AABB', 0],
  [['亥', '申', '亥', '申'], 'ABAB', 0],
  [['亥', '申', '申', '亥'], 'ABBA', null],
];
for (const [branches, code, prob] of cases) {
  const s = mk(branches);
  eq(`${code} 结构码`, s.code, code);
  eq(`${code} 静态从格概率`, s.congProb, prob);
}
eq('ABAA 的异类是月支（36 分）', mk(['亥', '申', '亥', '亥']).odd[0].weight, 36);
eq('ABBB 的异类是年支（11 分）', mk(['亥', '申', '申', '申']).odd[0].weight, 11);
eq('二对二没有异类', mk(['亥', '申', '亥', '申']).odd.length, 0);
ok('ABBA 原文未给概率，只给措辞', mk(['亥', '申', '申', '亥']).word.includes('有可能'));

// ── 四、平衡度：A 档可能是身弱阵营 ──────────────────────────────
const weakAll = mk(['亥', '亥', '亥', '亥']);
eq('四支同党时 balance 全在一档', weakAll.balance.branch.A + weakAll.balance.branch.B, 90);
eq('年支定 A 档：四支全得地时 A 档即身强阵营', weakAll.aCamp, '身强阵营');

// ── 五、接进排盘结果，且不动旺衰 ────────────────────────────────
const r = bazi('2008-12-04T01:30');
eq('样本四柱', gz(r), '戊子 癸亥 戊寅 癸丑');
const st = r.strength.branchStructure;
eq('戊土四支全不得地 → AAAA', st.code, 'AAAA');
eq('AAAA 静态从格概率 99', st.congProb, 99);
ok('四支同党且均属身弱阵营', st.detail.includes('均属身弱阵营'), st.detail);
ok('旺衰结论未被结构标注改动', ['身弱', '偏弱', '中和'].includes(r.strength.level), `${r.strength.level} ${r.strength.score}`);
ok('格局 frame 也带同一份结构', r.frame.structure && r.frame.structure.code === st.code);
ok('结构标注声明静态边界', st.note.includes('静态') && st.note.includes('合化'));

// ── 六、时柱缺失：第四支是占位值，不套概率 ─────────────────────
const three = bazi('2008-12-04T01:30', { hourUnknown: true });
const s3 = three.strength.branchStructure;
eq('三柱标记占位时支', s3.placeholderHour, true);
eq('三柱不套从格概率', s3.congProb, null);
ok('三柱写明不判结构概率', s3.congRange.includes('三柱'), s3.congRange);
ok('三柱 detail 点明占位值', s3.detail.includes('占位值'), s3.detail);
ok('frame 里的同一份结构也被标占位', three.frame.structure && three.frame.structure.placeholderHour === true);

// ── 七、输出通道：算出来的字段必须看得见（摘要 → 解析 → 面板 → 独立页） ──
// 这一批补的是「引擎算了、但没有任何地方显示」的死字段：字段存在只是必要条件，
// 用户与模型能读到才算做完。四条通道逐一钉住，撤掉任一处即红。
import fs from 'node:fs';
import vm from 'node:vm';
const { interpret } = await import('../engine/interpret.js');

{
  const sum = r.summary;
  ok('摘要出「地支结构」行', sum.includes('地支结构：四支 ' + st.code), sum.split('\n').find((l) => l.startsWith('地支结构')) || '无');
  ok('摘要写明异类或同党', /异类|同党/.test(sum), sum.split('\n').find((l) => l.startsWith('地支结构')) || '');
  ok('摘要给出静态从格概率', sum.includes('静态从格 99') || sum.includes(st.congRange), '');
  ok('摘要的暗合行另列不并', sum.includes('暗合：') ? sum.includes('不并入上面的合冲刑害') : true, sum.split('\n').find((l) => l.startsWith('暗合')) || '');

  const iv = interpret(r, { question: '事业' });
  const stSec = (iv.sections || []).find((s) => s.key === 'structure');
  ok('解析新增「地支结构」节', !!stSec && stSec.label === '地支结构', stSec ? stSec.label : '缺节');
  ok('结构节写清与旺衰分的关系', !!stSec && /不改上面的旺衰评分|不改.*旺衰/.test(stSec.text), stSec ? stSec.text.slice(-80) : '');
  ok('结构节写清能不能据此断从格', !!stSec && /不直接断从格|只作提示/.test(stSec.text), '');
  ok('结构节逐支列出阵营与分值', !!stSec && stSec.text.includes('逐支：'), '');

  const sandbox = { window: {}, console };
  vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
  const html = sandbox.window.__PP.baziHTML(r);
  ok('面板渲染结构行', html.includes('class="pp-struct"'), '');
  ok('面板结构行带 code 与异类', html.includes(st.code) && html.includes('异类'), '');
  ok('面板声明结构不改旺衰', html.includes('静态结构，只作标注，不改上面的旺衰评分'), '');
  ok('面板不出 undefined/NaN', !/undefined|NaN/.test(html), '');
}

// ── 八、三柱模式：占位支必须标出来，不冒充实有时支 ─────────────────
{
  const t3 = bazi('2008-12-04T01:30', { hourUnknown: true });
  ok('三柱摘要标「三支＋占位」', /地支结构：三支＋占位/.test(t3.summary), t3.summary.split('\n').find((l) => l.startsWith('地支结构')) || '');
  ok('三柱摘要逐支标占位', /时\S+·占位/.test(t3.summary), '');
  ok('三柱摘要不套从格概率（且不重复说两遍）', (t3.summary.match(/第四支为正午占位，不套从格概率/g) || []).length === 1, t3.summary.split('\n').find((l) => l.startsWith('地支结构')) || '');
  const h3 = (() => {
    const sb = { window: {}, console };
    vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sb, { filename: 'panel-kit.js' });
    return sb.window.__PP.baziHTML(t3);
  })();
  ok('三柱面板标占位', h3.includes('占位'), '');
  ok('三柱面板不显示从格概率', !/从格 ≈|从格 \d/.test(h3) || h3.includes('不套从格概率'), '');
}

// ── 九、暗合节：只有真的有时才出现，且明确不并入合冲 ───────────────
{
  const withAnhe = bazi('1976-12-25T11:45');
  ok('样本盘有暗合', withAnhe.relations.anhe.length >= 2, JSON.stringify(withAnhe.relations.anhe));
  ok('摘要写「共 N 对」', withAnhe.summary.includes(`共 ${withAnhe.relations.anhe.length} 对`), withAnhe.summary.split('\n').find((l) => l.startsWith('暗合')) || '');
  const iv = interpret(withAnhe, {});
  const anheSec = (iv.sections || []).find((s) => s.key === 'anhe');
  ok('解析有「暗合」节', !!anheSec && anheSec.label === '暗合', anheSec ? anheSec.label : '缺节');
  ok('暗合节写两条线不合并计分', !!anheSec && /两条线/.test(anheSec.text), '');
  ok('暗合节明写不折旺衰', !!anheSec && /不折旺衰|不参与旺衰/.test(anheSec.text), '');
  const plain = bazi('1985-03-08T06:20');
  if (plain.relations.anhe.length === 0) {
    ok('无暗合盘不出暗合行', !plain.summary.includes('暗合：'), plain.summary.split('\n').filter((l) => l.startsWith('暗合')).join('|'));
    const iv2 = interpret(plain, {});
    ok('无暗合盘不出暗合节', !(iv2.sections || []).some((s) => s.key === 'anhe'), '');
  }
}
