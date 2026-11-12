// 太乙神数（P4-3）：积年 / 局数 / 落宫 / 八门 / 文昌 + 计神 / 始击 / 主客算 / 四将 / 格局
// 钉的是「照口诀能算出来的那几个数」：积年、残年、局数、太乙宫、八门、文昌，
// 以及第二层的计神、始击、主客算、大小将与参将、掩迫囚格关。
// 古例用隋仁寿四年（604，甲子）首局，与《太乙金镜式经》卷三「阳局立成」逐项对拍。
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ok, eq } from './_harness.mjs';
import {
  TAIYI_EPOCH, PALACES, SIXTEEN, YANG_WALK, YIN_WALK, EIGHT_GATES,
  THREE_LI, FIVE_YUAN, TAIYI_SCOPE, PALACE_RING, GUA_NAMES, OPPOSITE_PALACE, BRANCH_TO_SIXTEEN,
  taiyiJinian, taiyiRound, yuanJiOf, taiyiPalace, eightGate, wenChang, buildTaiyi,
  jiShenOf, shiJiOf, suanOf, generalOf, canJiangOf, gejuOf, nextPalace, prevPalace,
  LIU_HE, WUFU_ORDER, jiXiongOf, monthJiOf, dayJiOf, hourJiOf, palaceFromR24, DAYOU_ORDER, dingMuOf, sanJiOf, wuFuOf, daYouOf, shiJingOf, heShuOf,
  TWELVE_GODS, GOD_GOOD, GOD_BAD, TRIGRAM_TO_BRANCH, POS_TO_BRANCH, dayStemOf, twelveGodsOf, shenJiangOf, verdictOf,
} from '../engine/taiyi.js';
import { plainSummary } from '../engine/plain-summary.js';
import { compute } from '../engine/index.js';

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
eq('9 月在夏至后，判阴遁', r.meta.dunText, '阴遁');
eq('夏至到冬至之间按阴遁', r.meta.dunBy, 'jd');
const rSpring = at(2024, 3, 17);
eq('3 月在冬至后夏至前，判阳遁', rSpring.meta.dunText, '阳遁');
eq('阳遁 53 局落离宫', rSpring.taiyi.palaceName, '离');
eq('阴遁 53 局落坎宫（逆行）', r.taiyi.palaceName, '坎');
eq('八门是伤门', r.gate.gate, '伤门');
eq('阴局文昌自寅起，第 17 步在丑', r.wenchang.pos, '丑');
eq('scope 列了没做的项', r.scope.notCovered.length >= 2, true);
ok('scope 把主客算算进 covered', r.scope.covered.join('').includes('主算'));
ok('scope 把格局算进 covered', r.scope.covered.join('').includes('掩'));
ok('scope 现在把定目、三基、五福、十精列进 covered', ['定目', '三基', '五福', '十精'].every((k) => r.scope.covered.join('').includes(k)), r.scope.covered.join('|'));
ok('scope 把交节判遁算进 covered', r.scope.covered.join('').includes('冬至后阳'));
ok('scope 不再把月日时三计列为没做', !r.scope.notCovered.join('').includes('月计'));
ok('scope 把三计与吉凶列进 covered', ['月计', '日计', '时计', '吉凶'].every((k) => r.scope.covered.join('').includes(k)), r.scope.covered.join('|'));
ok('scope 的 note 点出做到哪一层', /计神/.test(r.scope.note) && /始击/.test(r.scope.note));
ok('datetime 回显到日期', r.meta.datetime === '2024-09-17');
let threw = null;
try { buildTaiyi({ month: 1, day: 1 }); } catch (e) { threw = e.code || e.message; }
eq('缺 year 报 E_INPUT', threw, 'E_INPUT');

// ── 七、plainSummary ─────────────────────────────────────────
const b = plainSummary(r);
eq('brief 是 taiyi', b.system, 'taiyi');
ok('chips 三枚', b.chips.length === 3, b.chips.join('/'));
ok('chips 里有局数', b.chips.join('').includes('53局'));
ok('lead 提到太乙落宫', b.lead.includes('坎'));
ok('九节（多出古法吉凶与神将判辞）', b.sections.length === 9, String(b.sections.length));
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

// ── 十一·二、第二层：计神 / 始击 / 主客算 / 四将 / 格局 ──────
const J604 = taiyiJinian(604);
const JS604 = jiShenOf(J604);
eq('604 积年 mod 60 得 1（甲子年）', JS604.r, 1);
eq('604 首局计神在寅', JS604.branch, '寅');
eq('604 计神是吕申', JS604.god, '吕申');
eq('606（丙寅年）计神在子', jiShenOf(taiyiJinian(606)).branch, '子');
const WC604 = wenChang(J604, 'yang');
const WCIDX604 = SIXTEEN.findIndex((x) => x.pos === WC604.pos && x.god === WC604.god);
eq('604 文昌在申', WC604.pos, '申');
eq('604 文昌是武德、兑六宫', WC604.god + WC604.num, '武德6');
const SJ604 = shiJiOf(WCIDX604, JS604.idx16);
eq('604 始击移到大武（坤七宫）', SJ604.pos + SJ604.palace, '坤7');
eq('604 主算 7', suanOf(WCIDX604, 1), 7);
eq('604 客算 13', suanOf(SJ604.idx16, 1), 13);
const D604 = generalOf(suanOf(WCIDX604, 1));
const K604 = generalOf(suanOf(SJ604.idx16, 1));
eq('604 主大将 7', D604, 7);
eq('604 客大将 13 取个位 3', K604, 3);
eq('604 主参将 7×3=21 取个位 1', canJiangOf(D604), 1);
eq('604 客参将 3×3=9', canJiangOf(K604), 9);
const G604 = gejuOf({ taiyiPalace: 1, shiJiPalace: SJ604.palace, wenChangPalace: WC604.num, zhuDa: D604, keDa: K604, zhuCan: canJiangOf(D604), keCan: canJiangOf(K604) });
eq('604 囚：主参将与太乙同宫', G604.qiu.join('、'), '主参将');
eq('604 不格：始击坤七不在太乙乾一的对宫（格按《淘金歌》『太乙望始击』取义）', G604.ge, false);
eq('604 对：文昌兑六不冲太乙乾一', G604.dui, false);
eq('604 无关', G604.guan.length, 0);
eq('604 不掩：始击坤七与太乙乾一不同宫', G604.yan, false);
eq('604 有迫：文昌兑六正在太乙乾一的前一宫（九宫环乾一←兑六）', G604.po.join(','), '文昌');
eq('604 无击：始击坤七不在太乙左右（左右是坎八、兑六）', G604.ji, false);
const HAI = SIXTEEN.findIndex((x) => x.pos === '亥');
eq('亥是大义（间神）', SIXTEEN[HAI].god, '大义');
eq('古例：太乙在九宫、大义为天目，算得十六', suanOf(HAI, 9), 16);
eq('正宫起算按本宫数（坤七宫到离二宫）', suanOf(SIXTEEN.findIndex((x) => x.pos === '坤'), 2), 38);
eq('九宫环下一宫：乾一之后是坎八', nextPalace(1), 8);
eq('九宫环下一宫：离二之后是坤七', nextPalace(2), 7);
eq('算数整十归一宫', generalOf(10), 1);
eq('算数零归一宫', generalOf(0), 1);
eq('参将 5×3=15 取个位 5', canJiangOf(5), 5);
eq('对宫：一乾对九巽', OPPOSITE_PALACE[1], 9);
eq('对宫：中五无对（自指）', OPPOSITE_PALACE[5], 5);
ok('八卦正宫名单八个', GUA_NAMES.length === 8);
ok('九宫环不含中五', !PALACE_RING.includes(5));
ok('地支到十六神：子→地主', BRANCH_TO_SIXTEEN[0] === 2);
ok('地支到十六神：寅→吕申', BRANCH_TO_SIXTEEN[2] === 5);
const R2024 = buildTaiyi({ year: 2024, month: 6, day: 1 });
eq('2024 计神在戌', R2024.jishen.branch, '戌');
eq('2024 始击大义（坎八宫）', R2024.shiji.god + R2024.shiji.palace, '大义8');
eq('2024 主算 38', R2024.suan.zhu, 38);
eq('2024 客算 25', R2024.suan.ke, 25);
eq('2024 主大将 8', R2024.jiang.zhuDa, 8);
ok('2024 格局按新口径给出格与迫', R2024.geju.list.length === 2 && R2024.geju.ge && R2024.geju.po.length === 1, JSON.stringify(R2024.geju.list));
ok('2024 无掩（始击不在太乙宫）', R2024.geju.yan === false, String(R2024.geju.yan));
ok('始击带宫名', typeof R2024.shiji.palaceName === 'string' && R2024.shiji.palaceName.length > 0);

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
ok('图上标始击', tpl.includes('mp-ty-mark s">始击'));
ok('渲染器写计神行', tpl.includes('<em>计神</em>'));
ok('渲染器写主算行', tpl.includes('<em>主算</em>'));
ok('渲染器写客算行', tpl.includes('<em>客算</em>'));
ok('渲染器写格局行', tpl.includes('<em>格局</em>'));
ok('CSS 里始击标记错开一行', APP.includes('.mp-ty-mark.s{top:19px'));
const SUM = compute({ system: 'taiyi', datetime: '2026-11-12T10:00' }).summary;
ok('引擎文案写了计神', /计神在/.test(SUM));
ok('引擎文案写了主算与客算', /主算 \d+/.test(SUM) && /客算 \d+/.test(SUM));
ok('引擎文案有格局行', /格局：|不相犯/.test(SUM));

// ── 十一·三、第三层：定目 / 三基 / 五福 / 大游 / 十精 / 阴阳数和 ──────
const R2024B = buildTaiyi({ year: 2024, month: 6, day: 1 });
const R2026B = buildTaiyi({ year: 2026, month: 6, day: 1 });
eq('2024 定目在寅（吕申）', R2024B.dingmu.pos + R2024B.dingmu.god, '寅吕申');
eq('2024 定目落四宫', R2024B.dingmu.palace, 4);
eq('2026 定目在坤（大武七宫）', R2026B.dingmu.pos + R2026B.dingmu.palace, '坤7');
eq('六合：子合丑', LIU_HE[0], 1);
eq('六合：寅合亥', LIU_HE[2], 11);
eq('六合：午合未', LIU_HE[6], 7);
eq('2024 三基：君基巳、臣基亥、民基寅', [R2024B.sanji.jun, R2024B.sanji.chen, R2024B.sanji.min].join(''), '巳亥寅');
eq('2026 三基：君基巳、臣基子、民基辰', [R2026B.sanji.jun, R2026B.sanji.chen, R2026B.sanji.min].join(''), '巳子辰');
eq('五福次序是乾→艮→巽→坤→中', WUFU_ORDER.join(','), '1,3,9,7,5');
eq('2024 五福在巽宫', R2024B.wufu.palaceName, '巽');
eq('大游次序是七六四三二一九、八收尾', DAYOU_ORDER.join(','), '7,6,4,3,2,1,9,8');
eq('2024 大游在乾宫', R2024B.dayou.palaceName, '乾');
eq('2024 十精：天乙戌', R2024B.shijing.tianyi, '戌');
eq('2024 十精：地乙丑', R2024B.shijing.diyi, '丑');
eq('2024 十精：直符酉', R2024B.shijing.zhifu, '酉');
eq('2024 十精：四神在六宫', R2024B.shijing.sishen, '六宫');
eq('2024 十精：小游在离宫', R2024B.shijing.xiaoyou, '离');
ok('十精一共十位（五福、三基、大游、小游、四神、天乙、地乙、直符）', [R2024B.wufu, R2024B.sanji.jun, R2024B.sanji.chen, R2024B.sanji.min, R2024B.dayou, R2024B.shijing].every(Boolean));
eq('阴阳数：太乙在阳宫得奇数=重阳', heShuOf(3, 17).chongYang, true);
eq('阴阳数：太乙在阴宫得偶数=重阴', heShuOf(2, 16).chongYin, true);
eq('阴阳数：阳宫得偶数=和', heShuOf(3, 18).he, true);
eq('阴阳数：阴宫得奇数=和', heShuOf(2, 17).he, true);
eq('数表：十八为上和', heShuOf(3, 18).grade, '上和');
eq('数表：二十三为次和', heShuOf(2, 23).grade, '次和');
eq('数表：十六为下和', heShuOf(2, 16).grade, '下和');
eq('数表：七不在三张表里', heShuOf(3, 7).grade, '');
const GBASE = { taiyiPalace: 3, wenChangPalace: 4, zhuDa: 8, keDa: 1, zhuCan: 2, keCan: 9 };
eq('格局·掩：始击与太乙同宫', gejuOf({ ...GBASE, shiJiPalace: 3 }).yan, true);
eq('格局·击：始击在太乙左右', gejuOf({ ...GBASE, shiJiPalace: nextPalace(3) }).ji, true);
eq('格局·格：始击在太乙对宫', gejuOf({ ...GBASE, shiJiPalace: OPPOSITE_PALACE[3] }).ge, true);
eq('格局·对：文昌冲太乙宫', gejuOf({ ...GBASE, shiJiPalace: 5, wenChangPalace: OPPOSITE_PALACE[3] }).dui, true);
eq('格局·提：客大将与文昌同宫', gejuOf({ ...GBASE, shiJiPalace: 5, keDa: 4 }).ti, true);
ok('格局·迫：文昌在太乙前一宫', gejuOf({ ...GBASE, shiJiPalace: 5, wenChangPalace: prevPalace(3) }).po.includes('文昌'));
eq('格局·囚：主大将与太乙同宫', gejuOf({ ...GBASE, shiJiPalace: 5, zhuDa: 3 }).qiu.join(','), '主大将');
eq('格局·关：主客大将同一位', gejuOf({ ...GBASE, shiJiPalace: 5, zhuDa: 6, keDa: 6 }).guan.length, 1);
ok('八种格局都对得上口诀名称', ['掩', '击', '格', '对', '提', '迫', '囚', '关'].every((k) => TAIYI_SCOPE.covered.join('').includes(k)));
ok('渲染器写定目行', tpl.includes('<em>定目</em>'));
ok('渲染器写三基行', tpl.includes('<em>三基</em>'));
ok('渲染器写五福与大游行', tpl.includes('<em>五福</em>') && tpl.includes('<em>大游</em>'));
ok('渲染器写十精行', tpl.includes('<em>十精</em>'));
ok('渲染器写数和行', tpl.includes('<em>数和</em>'));
ok('渲染层仍只用 esc，不拼未转义文本', !/innerHTML\s*=/.test(tpl) && tpl.includes('esc('));
const SUM2 = compute({ system: 'taiyi', datetime: '2026-11-12T10:00' }).summary;
ok('引擎文案写了定目', /定目在/.test(SUM2));
ok('引擎文案写了三基与五福', /三基：君基/.test(SUM2) && /五福在/.test(SUM2));
ok('引擎文案写了十精', /十精：天乙/.test(SUM2));
ok('引擎文案写了数和', /数和－主算/.test(SUM2));
ok('文案不再说「五种格局」', !SUM2.includes('五种格局'));
// ── 十一·三、月计 / 日计 / 时计 / 古法吉凶 ──────────────────
{
  const m = buildTaiyi({ year: 2024, month: 6, day: 1, hour: 10 });
  eq('月计积月跟公式', m.month.jiyue, 134886972);
  eq('月计太乙落震', m.month.taiyi.palaceName, '震');
  eq('月计入宫第 3 月', m.month.taiyi.unitInPalace, 3);
  eq('月计天目在辰', m.month.mu.pos, '辰');
  eq('月计计神在卯', m.month.jishen.branch, '卯');
  eq('日计积日跟公式', m.day.jiri, 6736090213);
  eq('日计太乙落兑', m.day.taiyi.palaceName, '兑');
  eq('日计天目在申', m.day.mu.pos, '申');
  eq('日计计神在寅', m.day.jishen.branch, '寅');
  ok('时计有时实', typeof m.hour.shiShi === 'number' && m.hour.shiShi > 0);
  ok('时计带误差说明', m.hour.note.includes('现代节气'));
  ok('六月在夏至前算阳遁', m.hour.dun === 'yang');
  ok('十二月算阴遁', buildTaiyi({ year: 2024, month: 12, day: 1, hour: 10 }).hour.dun === 'yin');
  ok('月计太乙永不落中五', m.month.taiyi.palace !== 5 && m.day.taiyi.palace !== 5 && m.hour.taiyi.palace !== 5);
  ok('宫序函数 24 局回到第 8 宫', palaceFromR24(24).palace === YANG_WALK[7] && palaceFromR24(24).inPalace === 3);

  eq('2024 有相犯', m.jixiong.xiangFan, true);
  eq('2024 的判定', m.jixiong.grade, 'xiong');
  eq('2024 标签用古法原词', m.jixiong.label, '凶');
  ok('吉凶文案带相犯字样', m.jixiong.text.includes('相犯'));
  ok('吉凶不写成败断语', !/一定会|必然|肯定|必败/.test(m.jixiong.text));
  ok('吉凶项与格局清单等长', m.jixiong.items.length === m.geju.list.length);

  const gateOff = { gate: { gate: '伤' }, geju: { list: [] }, heshu: { zhu: { he: true }, ke: { he: true } } };
  eq('无犯数和但门不在吉道算吉', jiXiongOf(gateOff).grade, 'ji');
  eq('吉的标签', jiXiongOf(gateOff).label, '吉');
  const gateOn = { gate: { gate: '开' }, geju: { list: [] }, heshu: { zhu: { he: true }, ke: { he: true } } };
  eq('无犯数和且门值吉道算大吉', jiXiongOf(gateOn).grade, 'daji');
  eq('大吉的标签', jiXiongOf(gateOn).label, '大吉');
  ok('大吉文案点了吉道', jiXiongOf(gateOn).text.includes('吉道'));
  const half = { gate: { gate: '开' }, geju: { list: [] }, heshu: { zhu: { he: true }, ke: { he: false } } };
  eq('无犯但一算不和判不和', jiXiongOf(half).grade, 'buhe');
  eq('不和的标签沿用原文用词', jiXiongOf(half).label, '不和');
  const bad = { gate: { gate: '开' }, geju: { list: ['掩：x'] }, heshu: { zhu: { he: true }, ke: { he: true } } };
  eq('有相犯哪怕门吉数全和也判凶', jiXiongOf(bad).grade, 'xiong');
  eq('凶的标签', jiXiongOf(bad).label, '凶');
  ok('四档标签都是原书用词', ['大吉', '吉', '不和', '凶'].includes(jiXiongOf(bad).label));
  ok('结果附了未做的判辞说明', jiXiongOf(gateOn).note.includes('先吉后凶'));
  ok('任何档的文案都不写成败断语', [gateOn, gateOff, half, bad].every((x) => !/一定会|必然|肯定|必败|成功|考上|落榜/.test(jiXiongOf(x).text)));

  ok('渲染器写月计行', tpl.includes('<em>月计</em>'));
  ok('渲染器写日计行', tpl.includes('<em>日计</em>'));
  ok('渲染器写时计行', tpl.includes('<em>时计</em>'));
  ok('渲染器写吉凶行', tpl.includes('<em>吉凶</em>') && tpl.includes('mp-ty-jx'));

  const TXT = compute({ system: 'taiyi', datetime: '2024-06-01T10:00' }).summary;
  ok('引擎文案写月计', /月计：太乙在/.test(TXT));
  ok('引擎文案写日计', /日计：太乙在/.test(TXT));
  ok('引擎文案写时计', /时计：太乙在/.test(TXT));
  ok('引擎文案只报卦象符号', /卦象：凶|卦象：不和|卦象：吉|卦象：大吉/.test(TXT));
  ok('引擎文案不写成败断语', !/一定会|必然|肯定/.test(TXT));
  ok('引擎文案不再把三计算作未收录', !TXT.includes('月计、日计、时计'));

  // ── 说人话层：盘面下要有白话总解，细目折起来 ──
  ok('渲染器有白话总解块', tpl.includes('class="mp-ty-plain"'));
  ok('白话总解给一句主句', tpl.includes('mp-ty-lead'));
  ok('白话总解讲太乙是主的位置', tpl.includes('那是「主」这一年的位置'));
  ok('白话总解讲门是三十年的口径', tpl.includes('一值三十年'));
  ok('白话总解收尾不断成败', tpl.includes('不回答事情成不成'));
  ok('细目收进 details', tpl.includes('<details class="mp-ty-det">') && tpl.includes('<summary>细目'));
  ok('细目仍在 details 里（术语行没丢）', tpl.indexOf('<details class="mp-ty-det">') < tpl.indexOf('<em>太乙</em>第'));
  ok('八种格局都翻了人话', ['挤在同一格', '挨在太乙左右', '隔一格正面对上', '从对面顶过来', '主客两边的人撞在一处', '贴得太近', '关在太乙那一格'].every((x) => tpl.includes(x)));
  ok('白话里不出现未翻译的档位名', !tpl.includes('相犯与否'));

  // ── 三套新体系的样式要进 panel-kit 的 CSS，独立页才不是竖排 ──
  ok('panel-kit 有太乙网格样式', KIT.includes('.mp-ty-g{display:grid'));
  ok('panel-kit 有太乙白话样式', KIT.includes('.mp-ty-plain{'));
  ok('panel-kit 有运气步进样式', KIT.includes('.mp-wl-step{'));
  ok('panel-kit 有体质横条样式', KIT.includes('.mp-cs-row{'));
  ok('面板样式里也有白话块', APP.includes('.mp-ty-plain{'));

  // ── 第五层：神将与判辞 ──
  eq('十二神用六壬序、首位贵人', TWELVE_GODS[0], '贵人');
  eq('十二神共十二位', TWELVE_GODS.length, 12);
  ok('吉神五位', GOD_GOOD.length === 5 && GOD_GOOD.includes('太常'));
  ok('凶神六位', GOD_BAD.length === 6 && GOD_BAD.includes('白虎'));
  eq('2026-11-12 的日干', dayStemOf(2026, 11, 12), '庚');
  const g1 = twelveGodsOf('甲', 10);
  eq('甲日昼贵在丑', g1.startBranch, '丑');
  eq('丑在亥子丑寅卯辰之内，顺行', g1.dir, 1);
  eq('昼盘十二支都排到了神', Object.keys(g1.table).length, 12);
  const g2 = twelveGodsOf('甲', 20);
  eq('甲日夜贵在未', g2.startBranch, '未');
  eq('未在巳午未申酉戌之内，逆行', g2.dir, -1);
  const g3 = twelveGodsOf('辛', 10);
  eq('辛日昼贵在午', g3.startBranch, '午');
  eq('午后逆行', g3.dir, -1);
  eq('卦位取生支：乾→亥', TRIGRAM_TO_BRANCH['乾'], '亥');
  eq('支位原样：申→申', POS_TO_BRANCH['申'], '申');

  const SJ = shenJiangOf({
    dayStem: '庚', hour: 18,
    jiang: { zhuDaName: '兑', keDaName: '乾', zhuCanName: '坎', keCanName: '艮' },
    wenchang: { pos: '申' }, shiji: { pos: '艮' },
  });
  eq('六位都取了神', SJ.rows.length, 6);
  ok('主大将兑→酉，落白虎为凶神', SJ.rows[0].branch === '酉' && SJ.rows[0].god === '白虎' && SJ.rows[0].kind === 'bad');
  ok('文昌支位照样取神', SJ.rows[4].branch === '申' && SJ.rows[4].god !== '');
  ok('吉神与凶神分得开', SJ.goods.every((x) => !SJ.bads.includes(x)));

  const posXiong = { grade: 'xiong', label: '凶', xiangFan: true, text: 'x' };
  eq('位置层已凶，神将再好不抬档', verdictOf({ jixiong: posXiong, shenjiang: SJ, gate: { gate: '开' } }).label, '凶');
  const posJi = { grade: 'ji', label: '吉', xiangFan: false, text: 'y' };
  const allG = { rows: [{ kind: 'good' }], goods: ['a'], bads: [], mids: [] };
  eq('位置吉＋全吉＋门在吉道→大吉', verdictOf({ jixiong: posJi, shenjiang: allG, gate: { gate: '开' } }).label, '大吉');
  eq('位置吉＋全吉＋门不在吉道→大利', verdictOf({ jixiong: posJi, shenjiang: allG, gate: { gate: '伤' } }).label, '大利');
  const someBad = { rows: [{ kind: 'bad' }], goods: [], bads: ['b'], mids: [] };
  eq('位置吉＋有凶＋门在吉道→先吉后凶', verdictOf({ jixiong: posJi, shenjiang: someBad, gate: { gate: '开' } }).label, '先吉后凶');
  eq('位置吉＋有凶＋门不在吉道→凶', verdictOf({ jixiong: posJi, shenjiang: someBad, gate: { gate: '伤' } }).label, '凶');
  ok('判辞用的都是原书词', ['凶', '不和', '吉', '大吉', '大利', '先吉后凶'].includes(verdictOf({ jixiong: posJi, shenjiang: someBad, gate: { gate: '开' } }).label));

  ok('渲染器有神将行', tpl.includes('<em>神将</em>'));
  ok('渲染器吉凶改用判辞变量', tpl.includes('vdLabel'));
  ok('渲染器神将行写了吉神与凶神', tpl.includes('吉神下：') && tpl.includes('凶神下：'));
  const TXT2 = compute({ system: 'taiyi', datetime: '2026-11-12T18:00' }).summary;
  ok('引擎文案写神将', TXT2.includes('神将：') && TXT2.includes('夜贵'));
  ok('引擎文案写判辞', /判辞：(凶|不和|吉|大吉|大利|先吉后凶)/.test(TXT2));
  ok('神将文案不写成败断语', !/一定会|必然|肯定|必败/.test(TXT2));
}

