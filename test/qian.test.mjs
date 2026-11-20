// 每日福签：36 支签库、按日确定性、近七日、接入与渲染。
// 钉的是「同一天不重摇、签库四档齐、文案不许出现确定性断言」这几条硬口径。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ok, eq } from './_harness.mjs';
import { SLIPS, QIAN_LEVELS, QIAN_RULES, buildQian } from '../engine/qian.js';
import { compute } from '../engine/index.js';
import { plainSummary } from '../engine/plain-summary.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
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
const COMPOSE = read('src/compose.js');
const FP = read('engine/fingerprint.js');

const at = (y, m, d) => buildQian({ year: y, month: m, day: d });
const DAY = at(2026, 11, 20);
const ALL_TEXT = JSON.stringify(SLIPS);

// ── 一、签库本身 ─────────────────────────────────────────────
eq('36 支签', SLIPS.length, 36);
eq('签号 1–36 各一次', SLIPS.map((s) => s.no).sort((a, b) => a - b).join(','),
  Array.from({ length: 36 }, (_, i) => i + 1).join(','));
eq('签题不重复', new Set(SLIPS.map((s) => s.title)).size, 36);
const levels = SLIPS.reduce((m, s) => { m[s.level] = (m[s.level] || 0) + 1; return m; }, {});
eq('四档齐', Object.keys(levels).sort().join(','), [...QIAN_LEVELS].sort().join(','));
eq('上上 4 支', levels['上上'], 4);
eq('上 10 支', levels['上'], 10);
eq('中 14 支', levels['中'], 14);
eq('平 8 支', levels['平'], 8);
ok('不设「下」签', !SLIPS.some((s) => /下/.test(s.level)));
ok('每支两句签文', SLIPS.every((s) => Array.isArray(s.verse) && s.verse.length === 2
  && s.verse.every((v) => typeof v === 'string' && v.length >= 5)));
ok('每支都有寓意与建议', SLIPS.every((s) => s.meaning.length >= 20 && s.advice.length >= 6));
ok('每支两枚标签', SLIPS.every((s) => Array.isArray(s.chips) && s.chips.length === 2));
ok('文案无确定性断言', !/一定|必然|绝对|注定|肯定|必定|保证|百分百/.test(ALL_TEXT));
ok('口径写明不重摇', /同一天/.test(QIAN_RULES) && /不设重摇/.test(QIAN_RULES));

// ── 二、按日期抽签：同日同签、跨日会变 ─────────────────────────
const a = at(2026, 11, 20);
const b = at(2026, 11, 20);
eq('同一天两次完全一致', JSON.stringify(a), JSON.stringify(b));
eq('抽中的就是签库那一支', DAY.slip.no, SLIPS[DAY.slip.no - 1].no);
eq('签题与签库同源', DAY.slip.title, SLIPS[DAY.slip.no - 1].title);
const week = [18, 19, 20, 21, 22, 23, 24].map((d) => at(2026, 11, d).slip.no);
ok('一周里出现不同签', new Set(week).size >= 4);
eq('结果带 36 总数', DAY.slip.total, 36);

// ── 三、日期口径：星期、农历、干支 ─────────────────────────────
eq('2026-11-20 是周五', DAY.meta.weekday, '周五');
eq('农历十月十二', DAY.meta.lunar, '十月十二');
eq('干支为丙午年戊戌日', DAY.meta.ganzhi, '丙午年 · 戊戌日');
eq('春节前仍算乙巳年', at(2026, 1, 1).meta.ganzhi.startsWith('乙巳年'), true);
eq('正月初一进丙午年', at(2026, 2, 17).meta.ganzhi.startsWith('丙午年'), true);
eq('闰月回显闰字', at(2025, 8, 20).meta.lunar.startsWith('闰'), true);
eq('日期串补零', at(2026, 3, 5).meta.date, '2026-03-05');

// ── 四、近七日 ───────────────────────────────────────────────
eq('近七日七条', DAY.history.length, 7);
eq('首条就是今天', DAY.history[0].date, DAY.meta.date);
eq('首条签与今日一致', DAY.history[0].no, DAY.slip.no);
eq('日期逐一回退', DAY.history.map((h) => h.date).join(','),
  '2026-11-20,2026-11-19,2026-11-18,2026-11-17,2026-11-16,2026-11-15,2026-11-14');
eq('历史星期与今天一致', DAY.history[0].weekday, DAY.meta.weekday);
ok('历史每条的签都合法', DAY.history.every((h) => h.no >= 1 && h.no <= 36 && h.title && h.level));

// ── 五、边界与拒绝 ───────────────────────────────────────────
const throws = (fn, code) => {
  try { fn(); return false; } catch (e) { return e && e.code === code; }
};
ok('2 月 30 日被拒', throws(() => at(2026, 2, 30), 'E_INPUT'));
ok('月份 13 被拒', throws(() => at(2026, 13, 1), 'E_INPUT'));
ok('范围外年份被拒', throws(() => at(1500, 1, 1), 'E_INPUT'));
ok('空参数被拒', throws(() => buildQian(), 'E_INPUT'));

// ── 六、接入：compute / 摘要 / 人话总结 ────────────────────────
const r = compute({ system: 'qian', datetime: '2026-11-20' });
eq('compute 认 qian', r.system, 'qian');
ok('摘要含四档与签题', new RegExp(`${r.slip.level}`).test(r.summary) && r.summary.includes(r.slip.title));
ok('摘要含签文、签意、可为', /签文：/.test(r.summary) && /签意：/.test(r.summary) && /今日可为：/.test(r.summary));
ok('摘要含小灵旁白', /小灵旁白：/.test(r.summary));
ok('摘要含每日口径', r.summary.includes(QIAN_RULES));
const brief = plainSummary(r);
ok('brief 认得出福签', brief && brief.title === '今日福签');
eq('brief 三枚 chips', brief.chips.length, 3);
eq('brief 两段', brief.sections.length, 2);
eq('brief 一条建议', brief.advice.length, 1);
ok('brief 页脚带农历', /十月十二/.test(brief.footer));
ok('brief 注意项写明不预示', /不预示结果/.test(brief.caveat));
const male = compute({ system: 'qian', datetime: '2026-11-20', gender: 'male' });
const female = compute({ system: 'qian', datetime: '2026-11-20', gender: 'female' });
eq('性别不影响福签', JSON.stringify(male), JSON.stringify(female));

// ── 七、渲染层 ───────────────────────────────────────────────
globalThis.window = globalThis.window || {};
new Function('window', KIT)(globalThis.window);
const PP = globalThis.window.__PP;
const html = PP.qianHTML(r);
ok('渲染出福签卡', /class="pp mp-qn/.test(html));
ok('带无障碍标签', html.includes('aria-label="今日福签"'));
ok('签题、签文与寓意都在', html.includes(r.slip.title) && html.includes(r.slip.verse[0]) && html.includes(r.slip.meaning));
ok('旁白在卡里', html.includes(r.aside));
eq('近七日渲染七行', (html.match(/class="mp-qn-h-row/g) || []).length, 7);
ok('今天那一行高亮', /class="mp-qn-h-row[^"]* on"/.test(html));
ok('朱印按档位显示', /class="mp-qn-seal"[^>]*>/.test(html) && html.includes(r.slip.level));
ok('输出里没有 undefined', !/undefined|NaN/.test(html));
ok('缺字段时退回通用卡', PP.qianHTML({ system: 'qian' }).includes('mp-quick'));
const body = (KIT.match(/pp\.qianHTML = function \(r\) \{[\s\S]*?\n  \};/) || [''])[0];
ok('渲染器取到源码', body.length > 1200);
ok('渲染器不碰 window / document', !/\bwindow\b|localStorage|document\./.test(body));
ok('动态文本全部走 esc', (body.match(/esc\(/g) || []).length >= 20);
ok('福签不重复插「说人话」', /r\.system === 'qian'/.test(KIT));
ok('迷你签筒有提示文案', PP.qianOracleHTML().includes('mp-qn-o-cup') && PP.qianOracleHTML().includes('轻点一下'));
ok('结果卡与迷你签筒共用同一只 SVG', PP.QIAN_CUP_SVG.includes('qn-stick') && html.includes(PP.QIAN_CUP_SVG));
ok('摇晃动画与减弱动效都写了', /mp-qn-shake/.test(KIT) && /\.shaking/.test(KIT) && /prefers-reduced-motion/.test(KIT));
ok('面板空状态可点签筒', /const drawQian = /.test(APP) && /mp-qn-oracle/.test(APP) && /PP\.qianOracleHTML\(\)/.test(APP));
ok('独立页空状态也可点签筒', /function emptyNoteHTML/.test(UI) && /mp-qn-oracle/.test(UI) && /e\.target\.closest/.test(UI));

// ── 八、接线点（少一处就静默退回通用卡）────────────────────────
ok('engine 引入', /import \{ buildQian \} from '\.\/qian\.js';/.test(ENGINE));
ok('engine 有分派', /if \(system === 'qian'\) \{/.test(ENGINE));
ok('engine 有纯文本', /function qianText\(r\)/.test(ENGINE));
ok('对外导出', /buildQian, buildGuanyin, buildStar/.test(ENGINE));
ok('错误清单提到福签', /qian（每日福签）/.test(ENGINE));
ok('bridge 有短标签', /qian: '福签',/.test(BRIDGE));
ok('plain-summary 有分派', /r\.system === 'qian'\) return qianSummary/.test(SUMMARY));
ok('compose 把 qian 归速查类', /lookup: \[[^\]]*'qian'/.test(COMPOSE));
ok('身份层视为不看性别', /'qian'/.test(FP.split('GENDER_NEUTRAL = new Set([')[1] || ''));
ok('schema 枚举含它', /'tarot', 'qian', 'guanyin', 'meihua'/.test(ROOTJS));
ok('schema 参数', /qian: \['datetime', 'shadow'\],/.test(ROOTJS));
ok('schema 必填说明', /qian: '无（省略补今天）'/.test(ROOTJS));
ok('工具描述列了福签', /qian = 每日福签/.test(ROOTJS));
ok('触发词含今日福签', /今日福签 \/ 抽个签 \/ 求签/.test(ROOTJS));
ok('宿主替日期类补今天', /almanac: 1, qian: 1, star: 1/.test(ROOTJS));
ok('面板有 tab', /k: 'qian', label: '福签'/.test(APP));
ok('面板 TIME_KIND 用日期类', /qian: 'date',/.test(APP));
ok('面板快捷名单含它', /const QUICK_TABS = \[[^\]]*'qian'/.test(APP));
ok('面板结果分派', /result\.kind === 'qian' \? PP\.qianHTML\(result\.r\)/.test(APP));
ok('面板按钮叫摇签', /tab === 'qian' \|\| tab === 'guanyin' \? '摇签'/.test(APP));
ok('独立页同步', /qian: 'date',/.test(UI) && /window\.__PP\.qianHTML\(r\)/.test(UI));
ok('独立页按钮叫摇签', /tab === 'qian' \|\| tab === 'guanyin' \? '摇签'/.test(UI));
ok('离线页有 tab 按钮', /data-tab="qian">福签</.test(HTML));
ok('分组卡片含它', /k: 'qian', label: '福签'/.test(GROUPS));
ok('构建顺序含 qian', BC.indexOf("'qian'") > 0 && BC.indexOf("'qian'") < BC.indexOf("'star'"));
ok('分块表有它', /qian: \{ tabs: \['qian'\]/.test(BC));
