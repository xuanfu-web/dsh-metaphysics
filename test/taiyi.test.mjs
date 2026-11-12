// 太乙神数（P4-3）：积年 / 局数 / 落宫 / 八门 / 文昌 + 接入 + 渲染
// 钉的是「照口诀能算出来的那几个数」：积年、残年、局数、太乙宫、八门、文昌。
// 主客算与格局这一层没做，所以测试也不假装有——只用 scope 断言「它自己承认没做」。
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ok, eq } from './_harness.mjs';
import {
  TAIYI_EPOCH, PALACES, SIXTEEN, YANG_WALK, YIN_WALK, EIGHT_GATES,
  THREE_LI, FIVE_YUAN, TAIYI_SCOPE,
  taiyiJinian, taiyiRound, yuanJiOf, taiyiPalace, eightGate, wenChang, buildTaiyi,
} from '../engine/taiyi.js';
import { plainSummary } from '../engine/plain-summary.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const read = (p) => readFileSync(path.join(ROOT, p), 'utf8');
const APP = read('src/app.js');
const UI = read('src/web-ui.js');
const KIT = read('src/panel-kit.js');
const HTML = read('tools/build-html.mjs');
const BC = read('tools/build-client.mjs');
const GROUPS = read('src/groups.mjs');
const ENGINE = read('engine/index.js');
const BRIDGE = read('engine/bridge.js');
const SUMMARY = read('engine/plain-summary.js');
const ROOTJS = read('index.js');

const at = (y, m = 6, d = 1) => buildTaiyi({ year: y, month: m, day: d });

// ── 一、数据表 ────────────────────────────────────────────────
eq('积年常数是 10153917', TAIYI_EPOCH, 10153917);
ok('九宫都在', Object.keys(PALACES).length === 9);
eq('一宫是乾（太乙九宫与奇门不同）', PALACES[1].name, '乾');
eq('二宫是离', PALACES[2].name, '离');
eq('五宫是中', PALACES[5].name, '中');
eq('九宫是巽', PALACES[9].name, '巽');
eq('十六神正好十六个', SIXTEEN.length, 16);
eq('十六神第一神是乾·阴德', SIXTEEN[0].pos + SIXTEEN[0].god, '乾阴德');
eq('十六神最后一位是戌·阴主', SIXTEEN[15].pos + SIXTEEN[15].god, '戌阴主');
eq('乾与戌共用一宫', SIXTEEN[0].num, SIXTEEN[15].num);
eq('亥与子共用八宫', SIXTEEN[1].num, SIXTEEN[2].num);
const nums = SIXTEEN.map((s) => s.num);
eq('八个宫数各出现两次', [1, 2, 3, 4, 6, 7, 8, 9].every((n) => nums.filter((x) => x === n).length === 2), true);
eq('十六神里没有中五宫', nums.includes(5), false);
eq('阳遁八宫', YANG_WALK.join(','), '1,2,3,4,6,7,8,9');
eq('阴遁八宫', YIN_WALK.join(','), '9,8,7,6,4,3,2,1');
eq('顺逆两套都不走中五', YANG_WALK.includes(5) || YIN_WALK.includes(5), false);
eq('八门八个', EIGHT_GATES.length, 8);
eq('八门次序', EIGHT_GATES.join(''), '休门生门伤门杜门景门死门惊门开门');
eq('三理', THREE_LI.join(','), '理天,理地,理人');
eq('五元', FIVE_YUAN.length, 5);
eq('五元从甲子元起', FIVE_YUAN[0], '甲子元');

// ── 二、积年与局数 ────────────────────────────────────────────
eq('2024 积年', taiyiJinian(2024), 10155941);
const r2024 = taiyiRound(taiyiJinian(2024));
eq('2024 残年 341', r2024.rest360, 341);
eq('2024 阳遁 53 局', r2024.ju, 53);
const yj = yuanJiOf(341);
eq('341 落在第六纪', yj.jiNo, 6);
eq('341 在第六纪第 41 年', yj.jiYear, 41);
eq('341 落在壬子元', yj.yuanName, '壬子元');
eq('341 是壬子元第 53 年', yj.yuanYear, 53);
const r1954 = taiyiRound(taiyiJinian(1954));
eq('1954 年残年 271', r1954.rest360, 271);
eq('残年取 72 余不应为 0 以外的边界值', r1954.ju >= 1 && r1954.ju <= 72, true);

// ── 三、太乙落宫：三年一宫 ────────────────────────────────────
const p2024 = taiyiPalace(53, 'yang');
eq('2024 阳遁 53 局在第 2 宫', p2024.palace, 2);
eq('第 2 宫是离', p2024.palaceName, '离');
eq('2024 是该宫第 2 年', p2024.yearInPalace, 2);
eq('第 2 年对应理地', p2024.li, '理地');
const p2025 = taiyiPalace(54, 'yang');
eq('2025 阳遁 54 局仍在第 2 宫', p2025.palace, 2);
eq('2025 是该宫第 3 年', p2025.yearInPalace, 3);
eq('第 3 年对应理人', p2025.li, '理人');
const pYin = taiyiPalace(53, 'yin');
eq('同年阴遁 53 局落到第 8 宫', pYin.palace, 8);
eq('第 8 宫是坎', pYin.palaceName, '坎');
eq('二十四局走满一圈正好八宫', [1, 2, 3, 4, 5, 6, 7, 8].map((g) => taiyiPalace(g * 3 - 2, 'yang').palace).indexOf(5), -1);
const walkSeq = [];
for (let ju = 1; ju <= 24; ju++) walkSeq.push(taiyiPalace(ju, 'yang').palace);
eq('阳遁 24 局走完是 1,2,3,4,6,7,8,9 各三局', walkSeq.join(','), '1,1,1,2,2,2,3,3,3,4,4,4,6,6,6,7,7,7,8,8,8,9,9,9');
eq('第 24 局走完八宫，落在第 9 宫', taiyiPalace(24, 'yang').palace, 9);
eq('第 25 局回到乾一宫', taiyiPalace(25, 'yang').palace, 1);

// ── 四、八门 ──────────────────────────────────────────────────
eq('1954 年休门', eightGate(1954).gate, '休门');
eq('1984 年生门', eightGate(1984).gate, '生门');
eq('2014 年伤门', eightGate(2014).gate, '伤门');
eq('2024 年仍是伤门（三十年一转，不是每年换）', eightGate(2024).gate, '伤门');
eq('2044 年杜门', eightGate(2044).gate, '杜门');
eq('八门 240 年走完一轮', eightGate(1954 + 240).gate, '休门');
eq('1954 年之前也能算（负数取模不炸）', typeof eightGate(1900).gate, 'string');

// ── 五、文昌：十八年一周 ──────────────────────────────────────
const wc2024 = wenChang(taiyiJinian(2024), 'yang');
eq('2024 积年取 18 的余数是 17', wc2024.rest18, 17);
eq('2024 文昌在坤', wc2024.pos, '坤');
eq('2024 文昌对应大武', wc2024.god, '大武');
eq('阳局第一步从申（武德）起', wenChang(1, 'yang').pos, '申');
eq('阴局第一步从寅（吕申）起', wenChang(1, 'yin').pos, '寅');
eq('阳局第 4 步是乾（阴德）', wenChang(4, 'yang').pos, '乾');
eq('阳局第 5 步仍是乾（遇乾数两次）', wenChang(5, 'yang').pos, '乾');
eq('阳局第 17 步是坤', wenChang(17, 'yang').pos, '坤');
eq('阳局第 18 步仍是坤（遇坤数两次）', wenChang(18, 'yang').pos, '坤');
eq('第 18 步是最后一格（坤）', wenChang(18, 'yang').pos, '坤');
eq('第 19 步才回到起点（申）', wenChang(19, 'yang').pos, wenChang(1, 'yang').pos);
ok('文昌落在八宫里，不会落中五', [1, 2, 3, 4, 6, 7, 8, 9].includes(wc2024.num));

// ── 六、buildTaiyi 结构 ──────────────────────────────────────
const r = at(2024, 9, 17);
eq('system 是 taiyi', r.system, 'taiyi');
eq('meta 带积年', r.meta.jinian, 10155941);
eq('meta 带局数', r.meta.ju, 53);
eq('年家默认阳遁', r.meta.dunText, '阳遁');
eq('太乙在离宫', r.taiyi.palaceName, '离');
eq('八门是伤门', r.gate.gate, '伤门');
eq('文昌在坤', r.wenchang.pos, '坤');
eq('scope 列了没做的项', r.scope.notCovered.length >= 3, true);
ok('scope 里明确写了主客算没做', r.scope.notCovered.join('').includes('主算'));
ok('scope 里明确写了格局没做', r.scope.notCovered.join('').includes('格'));
ok('scope 的 note 说了只到三个落点', /三个落点/.test(r.scope.note));
ok('datetime 回显到日期', r.meta.datetime === '2024-09-17');
let threw = null;
try { buildTaiyi({ month: 1, day: 1 }); } catch (e) { threw = e.code || e.message; }
eq('缺 year 报 E_INPUT', threw, 'E_INPUT');

// ── 七、plainSummary ─────────────────────────────────────────
const b = plainSummary(r);
eq('brief 是 taiyi', b.system, 'taiyi');
ok('chips 三枚', b.chips.length === 3, b.chips.join('/'));
ok('chips 里有局数', b.chips.join('').includes('53局'));
ok('lead 提到太乙落宫', b.lead.includes('离'));
ok('四节', b.sections.length === 4, String(b.sections.length));
ok('建议三条', b.advice.length === 3);
ok('caveat 承认没收录', b.caveat.includes('未收录'));
ok('footer 讲了三套年界不同', b.footer.includes('立春') && b.footer.includes('大寒'));
ok('brief 里不出现绝对断言', !/一定会|必然|肯定/.test(JSON.stringify(b)));

// ── 八、引擎接入 ─────────────────────────────────────────────
ok('engine/index.js 引入 buildTaiyi', ENGINE.includes("import { buildTaiyi } from './taiyi.js';"));
ok('engine/index.js 有 taiyi 分支', ENGINE.includes("if (system === 'taiyi') {"));
ok('分支里调 buildTaiyi', ENGINE.includes('buildTaiyi({ year: dt.year'));
ok('有 taiyiText', ENGINE.includes('function taiyiText(r)'));
ok('导出了 buildTaiyi', ENGINE.includes('export { buildTaiyi };'));
ok('错误清单里有太乙', ENGINE.includes('taiyi（太乙神数）'));
eq('bridge 标签', /taiyi: '太乙',/.test(BRIDGE), true);
ok('plain-summary 分派', SUMMARY.includes("if (r.system === 'taiyi') return taiyiSummary(r);"));
ok('schema 枚举有 taiyi', ROOTJS.includes("'wuyunliuqi', 'taiyi', 'trend'"));
ok('schema 参数表有 taiyi', ROOTJS.includes("taiyi: ['datetime', 'shadow'],"));
ok('schema 必填说明有 taiyi', ROOTJS.includes('taiyi:'));

// ── 九、面板 ─────────────────────────────────────────────────
ok('TABS 有太乙', APP.includes("{ k: 'taiyi', label: '太乙'"));
ok('TIME_KIND 是 date', APP.includes("taiyi: 'date',"));
ok('chartHTML 分派', APP.includes("result.kind === 'taiyi' ? PP.taiyiHTML(result.r)"));
ok('CSS 有九宫格', APP.includes('.mp-ty-g{display:grid;grid-template-columns:repeat(3,1fr)'));
ok('CSS 有太乙格高亮', APP.includes('.mp-ty-cell.on{'));
ok('CSS 有中宫弱化', APP.includes('.mp-ty-cell.mid{'));
ok('CSS 有太乙标记', APP.includes('.mp-ty-mark{'));

// ── 十、独立页与骨架 ─────────────────────────────────────────
ok('web-ui TIME_KIND 有 taiyi', UI.includes("taiyi: 'date',"));
ok('web-ui 结果分派', UI.includes("tab === 'taiyi' ? window.__PP.taiyiHTML(r)"));
ok('web-ui 快查含 taiyi', UI.includes("'wuyunliuqi', 'taiyi']"));
ok('分组卡片有太乙', GROUPS.includes("{ k: 'taiyi', label: '太乙'"));
ok('页面平铺 tab 有太乙', HTML.includes('<button class="tab" data-tab="taiyi">太乙</button>'));
ok('分块 ORDER 有 taiyi', BC.includes("'wuyunliuqi', 'taiyi', 'xiaoliuren'"));
ok('分块 CHUNKS 有 taiyi', BC.includes("taiyi: { tabs: ['taiyi'], modules: [...COMMON, 'classics', 'taiyi'"));

// ── 十一、渲染层 ─────────────────────────────────────────────
ok('pp.taiyiHTML 存在', KIT.includes('pp.taiyiHTML = function (r) {'));
ok('渲染器以 HTML 结尾（html-sinks 约定）', /pp\.taiyiHTML = function/.test(KIT));
const tpl = KIT.slice(KIT.indexOf('pp.taiyiHTML'), KIT.indexOf('pp.wuyunliuqiHTML'));
ok('外壳是 mp-ty', tpl.includes('class="mp-ty"'));
ok('九宫格按南上北下排', tpl.includes("[[9, '巽'], [2, '离'], [7, '坤'], [4, '震'], [5, '中'], [6, '兑'], [3, '艮'], [8, '坎'], [1, '乾']]"));
ok('太乙所在格高亮', tpl.includes("on ? ' on' : ''"));
ok('太乙标记', tpl.includes('mp-ty-mark">太乙'));
ok('文昌标记', tpl.includes('mp-ty-mark w">文昌'));
ok('中宫弱化', tpl.includes("nm === '中' ? ' mid' : ''"));
ok('文字都走 esc', (tpl.match(/esc\(/g) || []).length >= 15, String((tpl.match(/esc\(/g) || []).length));
ok('渲染器不碰 window/localStorage', !/localStorage|document\.|window\./.test(tpl));
ok('渲染器里没有重复实现积年（只用 r.meta）', tpl.includes('r.meta.jinian') && !tpl.includes('10153917'));
