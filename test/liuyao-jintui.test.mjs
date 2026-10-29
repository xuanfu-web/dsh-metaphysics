// 六爻化进神 / 化退神
//
// 这一组以前只在解释层「未纳入」里占一行。现在按「同五行地支顺次」推导：
//   木 寅→卯　火 巳→午　金 申→酉　水 亥→子　土 丑→辰→未→戌→丑
// 并用 test/fixtures/classics.json 里 12 条带「化进/化退」断语的卦例逐条对拍：
// 断语说「未土化进神」，引擎就得在第 6 爻标「化进神」；说「戌土化退」，就得标「化退神」。
import fs from 'node:fs';
import { hexagramFromBits, jinTuiOf, bodyLabels, buildLiuyao } from '../engine/liuyao.js';
import { ok, eq } from './_harness.mjs';

const DAY = { stem: '甲', branch: '子', name: '甲子' };
const bitsOf = (mask) => Array.from({ length: 6 }, (_, i) => (mask >> i) & 1);
const lineValue = (a, b) => (a === b ? (a ? 7 : 8) : (a ? 9 : 6));

const BY_NAME = new Map();
for (let mask = 0; mask < 64; mask++) {
  const bits = bitsOf(mask);
  BY_NAME.set(hexagramFromBits(bits).name, bits);
}
ok('六十四卦名索引齐全', BY_NAME.size === 64, String(BY_NAME.size));

/** 「本卦之变卦」→ 装卦结果 */
function castPair(combo) {
  const [a, b] = combo.split('之').map((s) => s.trim());
  const A = BY_NAME.get(a);
  const B = BY_NAME.get(b);
  if (!A || !B) return null;
  const lines = A.map((bit, i) => lineValue(bit, B[i]));
  return buildLiuyao({ lines, dayGanZhi: DAY });
}

// ── ① 独立推导：同五行地支排成一圈，顺着走是进、逆着走是退 ──────────
const WUXING_ZHI = { 木: ['寅', '卯'], 火: ['巳', '午'], 金: ['申', '酉'], 水: ['亥', '子'], 土: ['丑', '辰', '未', '戌'] };
const ALL_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 从五行分组独立生成「进」的有序对，不抄引擎里的表
// 木火金水各两支，只有一支顺次；土四支成环，末尾回到环首（戌→丑）
const derivedJin = [];
for (const ring of Object.values(WUXING_ZHI)) {
  if (ring.length === 2) derivedJin.push([ring[0], ring[1]]);
  else for (let i = 0; i < ring.length; i++) derivedJin.push([ring[i], ring[(i + 1) % ring.length]]);
}
eq('木火金水土各成环，进神共八对', derivedJin.length, 8);
eq('进神八对顺序（木火金水土）', derivedJin.map((p) => p.join('')).join(','), '寅卯,巳午,申酉,亥子,丑辰,辰未,未戌,戌丑');

const jinMap = new Map(derivedJin);
const tuiMap = new Map(derivedJin.map(([a, b]) => [b, a]));

let mismatched = 0;
let jinCount = 0;
let tuiCount = 0;
let sameCount = 0;
for (const a of ALL_ZHI) {
  for (const b of ALL_ZHI) {
    const got = jinTuiOf(a, b);
    const want = a === b ? null : jinMap.get(a) === b ? '进' : tuiMap.get(a) === b ? '退' : null;
    if (got !== want) mismatched += 1;
    if (got === '进') jinCount += 1;
    if (got === '退') tuiCount += 1;
    if (got === null) sameCount += 1;
  }
}
eq('12×12 地支两两全枚举，与独立推导表无一不符', mismatched, 0);
eq('进神 8 对（含土四对）', jinCount, 8);
eq('退神 8 对（进的反向）', tuiCount, 8);
eq('其余全是 null（同支 12、异五行 112）', sameCount, 144 - 16);

// 相邻但不顺次：同五行也化不了
eq('寅→辰 同是木？否，寅木辰土 → null', jinTuiOf('寅', '辰'), null);
eq('巳→亥 火水不同气 → null', jinTuiOf('巳', '亥'), null);
eq('子→亥 水逆排一位 → 退', jinTuiOf('子', '亥'), '退');
eq('亥→子 水顺排一位 → 进', jinTuiOf('亥', '子'), '进');
eq('土 戌→丑 回到环首 → 进', jinTuiOf('戌', '丑'), '进');
eq('土 丑→戌 逆一位 → 退', jinTuiOf('丑', '戌'), '退');
eq('同支不变 → null', jinTuiOf('午', '午'), null);
eq('缺参不抛错（空串）', jinTuiOf('', '卯'), null);
eq('缺参不抛错（undefined）', jinTuiOf(undefined, undefined), null);

// ── ② 语料对拍：十二条带「化进/化退」断语的卦例 ────────────────────
const FIX = JSON.parse(fs.readFileSync(new URL('./fixtures/classics.json', import.meta.url), 'utf8'));
const EXPECT = {
  '泽水困之雷风恒': { jin: [], tui: [5] }, // 「化退神于申」
  '兑为泽之天水讼': { jin: [6], tui: [] }, // 「化进神未土」
  '乾为天之泽天夬': { jin: [], tui: [6] }, // 「化退」
  '雷风恒之泽风大过': { jin: [5], tui: [] }, // 「官化进神」
  '火雷噬嗑之水地比': { jin: [5], tui: [4] }, // 「财爻持世化进神」，4 爻酉→申同时化退
  '水雷屯之水泽节': { jin: [2], tui: [] }, // 「寅木子孙持世化进神」
  '地水师之地火明夷': { jin: [1], tui: [2] }, // 「官星化退，子孙化进」
  '天火同人之泽火革': { jin: [], tui: [6] }, // 「戌土化退」/「戌土忌神化退神」
  '火水未济之水山蹇': { jin: [5], tui: [4] }, // 「未土子孙化进神」
  '火风鼎之水天需': { jin: [5], tui: [4] }, // 「未土化进神」
  '泽地萃之天山遁': { jin: [6], tui: [] }, // 「未土父母为文章化进神」
};

/** 从 body.jinTui 里按进/退拆出爻位，升序 */
function splitJinTui(body) {
  const jin = [];
  const tui = [];
  for (const x of body.jinTui || []) (x.type === '进' ? jin : tui).push(x.position);
  return { jin: jin.sort((x, y) => x - y), tui: tui.sort((x, y) => x - y) };
}

let cases = 0;
let matched = 0;
for (const ex of FIX.boshizhengzong || []) {
  const quote = ex.quote || '';
  if (!/化进|化退|进神/.test(quote)) continue;
  cases += 1;
  const expect = EXPECT[ex.name];
  if (!expect) {
    ok(`卦例「${ex.name}」在对拍表里`, false, '缺期望值');
    continue;
  }
  const r = castPair(ex.name);
  if (!r) {
    ok(`卦例「${ex.name}」可装卦`, false, '卦名解析失败');
    continue;
  }
  const got = splitJinTui(r.body);
  const same = got.jin.join(',') === expect.jin.join(',') && got.tui.join(',') === expect.tui.join(',');
  if (same) matched += 1;
  ok(`卦例 ${ex.name}`, same,
    same ? '' : `期望 进[${expect.jin}] 退[${expect.tui}]，实际 进[${got.jin}] 退[${got.tui}]`);
}
eq('带化进/化退断语的卦例共 12 支', cases, 12);
eq('12 支卦例的化进/化退全部对上断语', matched, 12);

// 断语里的方向词与标签方向不能反着来：说「化进」的卦例，进神爻位不能一个都没有
const jinOnly = castPair('水雷屯之水泽节');
ok('屯之节 断语说子孙化进，标签里确有化进神',
  bodyLabels(jinOnly.body).some((l) => l.startsWith('化进神')), bodyLabels(jinOnly.body).join('|'));
const tuiOnly = castPair('乾为天之泽天夬');
ok('乾之夬 断语说化退，标签里确有化退神',
  bodyLabels(tuiOnly.body).some((l) => l.startsWith('化退神')), bodyLabels(tuiOnly.body).join('|'));

// ── ③ 标签措辞与顺序 ───────────────────────────────────────────
const both = castPair('地水师之地火明夷');
eq('师之明夷 进在前、退在后', bodyLabels(both.body).filter((l) => /化[进退]神/.test(l)).join('|'), '化进神 1|化退神 2');
eq('同爻不会既算进又算退', both.body.jinTui.length, 2);
ok('化进/化退的爻位必在动爻之中',
  both.body.jinTui.every((x) => both.cast.movingPositions.includes(x.position)),
  JSON.stringify(both.body.jinTui));
ok('每条 jinTui 都带本支与变支',
  both.body.jinTui.every((x) => typeof x.from === 'string' && typeof x.to === 'string' && x.from !== x.to),
  JSON.stringify(both.body.jinTui));

// ── ④ 不硬凑：静卦、同支变动、跨五行变动 ─────────────────────────
const quiet = buildLiuyao({ lines: [7, 8, 7, 8, 7, 8], dayGanZhi: DAY });
eq('静卦无 jinTui 条目', quiet.body.jinTui.length, 0);
eq('静卦无化进/化退标签', bodyLabels(quiet.body).filter((l) => /化[进退]神/.test(l)).length, 0);

// 乾为天 → 坤为地：六爻全动，但每一爻都是 子→未、寅→丑… 不同五行，一支都不该标
const qianKun = castPair('乾为天之坤为地');
eq('乾之坤 六爻全动却无一爻化进/化退', qianKun.body.jinTui.length, 0);
eq('乾之坤 动爻确有六个', qianKun.cast.movingPositions.join(','), '1,2,3,4,5,6');

// 旧结果兼容：body 里没有 jinTui 字段时不抛错
eq('body 缺 jinTui 字段时 bodyLabels 不炸', bodyLabels({ ben: { chong: false, he: false } }).length, 0);
eq('body 为 undefined 时返回空数组', bodyLabels(undefined).length, 0);

// ── ⑤ 三处可见：摘要 / 面板 chip ───────────────────────────────
const { compute } = await import('../engine/index.js');
ok('摘要里有化退神（乾之夬：第 6 爻戌→未）',
  /化退神 6/.test(String(compute({ system: 'liuyao', lines: [7, 7, 7, 7, 7, 9] }).summary || '')), '');
ok('摘要里有化进神（兑之讼：第 6 爻未→戌）',
  /化进神 6/.test(String(compute({ system: 'liuyao', lines: [9, 7, 8, 7, 7, 6] }).summary || '')), '');

// 面板：与本仓其它 UI 测试一致，用 vm 沙箱喂 window.Engine
const vm = await import('node:vm');
const sandbox = { window: { Engine: { compute } }, console };
vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
const PP = sandbox.window.__PP;
ok('面板生成器已暴露 liuyaoHTML', typeof PP.liuyaoHTML === 'function', typeof PP.liuyaoHTML);
const htmlTui = PP.liuyaoHTML(castPair('乾为天之泽天夬'));
ok('面板 chip 渲染化退神', htmlTui.includes('化退神 6'), '');
ok('化退神 chip 用 warn 色', /<span class="pp-chip warn">化退神 6<\/span>/.test(htmlTui), '');
const htmlJin = PP.liuyaoHTML(castPair('水雷屯之水泽节'));
ok('面板 chip 渲染化进神', /<span class="pp-chip ok">化进神 2<\/span>/.test(htmlJin), '');
// 旧结果（没有 body 字段）仍走兜底文案，不抛错
const rOld = castPair('乾为天之泽天夬');
delete rOld.body;
ok('旧结果无 body 时面板写兜底文案', PP.liuyaoHTML(rOld).includes('卦体无六冲、六合、伏吟、反吟'), '');

// ── ⑥ 力重：进退只管方向，走不走得动看月建日辰 ───────────────────
const { jinTuiPower } = await import('../engine/liuyao.js');
const { interpret } = await import('../engine/interpret.js');
const { buildAnswer } = await import('../engine/interpret-plain.js');

const qianKuai = castPair('乾为天之泽天夬'); // 6 爻 戌→未（退）
const tuiMonth = jinTuiPower(qianKuai, { monthBranch: '午', dayBranch: '子' });
eq('乾之夬 进退只有一条', tuiMonth.lines.length, 1);
eq('6 爻戌土化退，午火月土为相 → 退得缓', tuiMonth.lines[0].verdict, '退得缓');
eq('日辰子水对戌土为耗', tuiMonth.lines[0].dayRelation, '耗');
ok('甲子日戌在旬空，力重只标出、不改结论', tuiMonth.lines[0].kong === true && tuiMonth.lines[0].verdict === '退得缓', JSON.stringify(tuiMonth.lines[0]));
eq('力重标签带爻位与结论', tuiMonth.labels.join('|'), '6爻化退·退得缓');
ok('力重说明句写清干支与结论', /戌→未（退）：月建午（火）对土为相/.test(tuiMonth.lines[0].say), tuiMonth.lines[0].say);

const tunJie2 = castPair('水雷屯之水泽节'); // 2 爻 寅→卯（进）
eq('寅木化进，酉金月木为死 → 进得虚', jinTuiPower(tunJie2, { monthBranch: '酉' }).lines[0].verdict, '进得虚');
eq('寅木化进，申月寅申相冲 → 月破失据', jinTuiPower(tunJie2, { monthBranch: '申' }).lines[0].verdict, '月破失据');
eq('寅木化进，寅月同气 → 后劲足', jinTuiPower(tunJie2, { monthBranch: '寅' }).lines[0].verdict, '后劲足');
eq('寅木化进，午火月木生火为休 → 后劲有限', jinTuiPower(tunJie2, { monthBranch: '午' }).lines[0].verdict, '后劲有限');
eq('寅木化进，酉金月被克为死', jinTuiPower(tunJie2, { monthBranch: '酉' }).lines[0].monthState, '死');
eq('戌土化退，辰月相冲 → 月破失据', jinTuiPower(qianKuai, { monthBranch: '辰' }).lines[0].verdict, '月破失据');
eq('只给日辰没月建 → 只报趋势', jinTuiPower(qianKuai, { dayBranch: '子' }).lines[0].verdict, '只报趋势');
eq('静卦没有进退 → null', jinTuiPower(quiet, { monthBranch: '午' }), null);
eq('缺 body → null', jinTuiPower({}, { monthBranch: '午' }), null);
eq('力重条数与 jinTui 条数一致', jinTuiPower(both, { monthBranch: '午' }).lines.length, 2);

// 档位表要能独立复算：得令两态一个结论、失令两态一个结论、死单独一档
const jinVerdicts = ['旺', '相', '休', '囚', '死'].map((m) => jinTuiPower(tunJie2, { monthBranch: { 旺: '寅', 相: '子', 休: '午', 囚: '辰', 死: '酉' }[m] }).lines[0].verdict);
eq('进神五态档位（旺相/休囚/死）', jinVerdicts.join('|'), '后劲足|后劲足|后劲有限|后劲有限|进得虚');
const tuiVerdicts = ['旺', '相', '休', '囚', '死'].map((m) => jinTuiPower(qianKuai, { monthBranch: { 旺: '未', 相: '午', 休: '申', 囚: '子', 死: '卯' }[m] }).lines[0].verdict);
eq('退神五态档位（旺相/休囚死）', tuiVerdicts.join('|'), '退得缓|退得缓|退得实|退得实|退得实');

// 全链路：compute 挂上、摘要单列、解析与白话都写出来、面板出 chip
const castPower = compute({ system: 'liuyao', lines: [9, 7, 8, 7, 7, 6], datetime: '2024-06-15T10:00' });
ok('compute 结果挂上 jinTuiPower', !!(castPower.jinTuiPower && castPower.jinTuiPower.lines.length === 1), JSON.stringify(castPower.jinTuiPower && castPower.jinTuiPower.labels));
eq('2024-06-15 属午月', castPower.jinTuiPower.month && castPower.jinTuiPower.month.branch, '午');
eq('未土化进得午火相 → 后劲足', castPower.jinTuiPower.lines[0].verdict, '后劲足');
ok('摘要单列进退力重', /进退力重：6爻未→戌进·后劲足/.test(String(castPower.summary)), (String(castPower.summary).match(/进退力重.*/) || [''])[0]);
const bodySec = (interpret(castPower, {}).sections || []).find((s) => s.key === 'body');
ok('解析「卦体关系」写出力重', !!(bodySec && /进退的力重/.test(bodySec.text)), bodySec ? bodySec.text.slice(0, 60) : '缺 body 节');
ok('解析力重写明月建与档位', !!(bodySec && /月建午（火）.*后劲足/.test(bodySec.text)), '');
ok('白话提到进退还要看时令', /进退还要看时令/.test(buildAnswer(castPower, {}, {})), '');
const htmlPower = PP.liuyaoHTML(castPower);
ok('面板渲染力重 chip', /<span class="pp-chip ok">6爻化进·后劲足<\/span>/.test(htmlPower), '');
ok('面板没有力重数据时不出该排', !/化进·|化退·/.test(PP.liuyaoHTML(rOld)), '');
