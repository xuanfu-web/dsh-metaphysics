// 观音灵签：100 支签库、可指定/可复现/可重摇，独立于每日福签。
// 钉的是：签库完整（7 言四句、签题不重、上中下分布）、重摇避开上一支、
// 不按日期锁死（与福签分开）、文案不出确定性断言、渲染与接线各一处。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ok, eq } from './_harness.mjs';
import { GUANYIN_LOTS } from '../engine/guanyin-data.js';
import {
  GUANYIN_TOTAL, GUANYIN_RULES, GUANYIN_SCOPE, GUANYIN_ASIDES, buildGuanyin,
} from '../engine/guanyin.js';
import { compute } from '../engine/index.js';
import { plainSummary } from '../engine/plain-summary.js';
import { encodeHandle, decodeHandle } from '../engine/handle.js';
import { askLink, parseAskLink, formOf } from '../engine/bridge.js';

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
const REVISE = read('engine/revise.js');
const SUMMARY = read('engine/plain-summary.js');
const ROOTJS = read('index.js');
const COMPOSE = read('src/compose.js');
const FP = read('engine/fingerprint.js');
const LINT = read('tools/lint-copy.mjs');

const COPY_TEXT = JSON.stringify(GUANYIN_LOTS);

// ── 一、签库本身 ─────────────────────────────────────────────
eq('一百支', GUANYIN_LOTS.length, GUANYIN_TOTAL);
eq('签号 1–100 各一次', GUANYIN_LOTS.map((s) => s.no).sort((a, b) => a - b).join(','),
  Array.from({ length: GUANYIN_TOTAL }, (_, i) => i + 1).join(','));
eq('签题不重复', new Set(GUANYIN_LOTS.map((s) => s.title)).size, GUANYIN_TOTAL);
const levels = GUANYIN_LOTS.reduce((m, s) => { m[s.level] = (m[s.level] || 0) + 1; return m; }, {});
eq('只有上中下三档', Object.keys(levels).sort().join(','), '上,下,中');
eq('上签 23 支', levels['上'], 23);
eq('中签 59 支', levels['中'], 59);
eq('下签 18 支', levels['下'], 18);
ok('每支四句七言', GUANYIN_LOTS.every((s) => s.poem.length === 4
  && s.poem.every((line) => [...line].length === 7)));
ok('每支都有签题与宫位', GUANYIN_LOTS.every((s) => s.title.length >= 2 && /宫$/.test(s.palace)));
eq('缺卦象的只有 26 / 47 / 48（通行本这三支无「此卦…」句）',
  GUANYIN_LOTS.filter((s) => !s.omen).map((s) => s.no).join(','), '26,47,48');
ok('签诗里不出确定性断言（引用原文除外，闸在 lint-copy）', !/百分百|包准|绝不失手/.test(COPY_TEXT));
// 转录讹字：这几处原来语义不通（或整句串了别的签），改回通行本后钉住
eq('第 17 签是「画饼」不是「书饼」', GUANYIN_LOTS[16].poem[3], '画饼如何止得饥');
eq('第 17 签卦象也用「画饼」', GUANYIN_LOTS[16].omen, '画饼充饥之象，凡事多虚少实也。');
eq('第 37 签第三句不再与第 10 签混句', GUANYIN_LOTS[36].poem[2], '不如收拾深堂坐');
eq('第 30 签「忧愁」不缺笔', GUANYIN_LOTS[29].poem[3], '恐遭毒口也忧愁');
eq('第 2 签「更望高」不是「更望闻」', GUANYIN_LOTS[1].poem[1], '不可升腾更望高');
eq('第 22 签「枯槁」不是「枯稿」', GUANYIN_LOTS[21].poem[0], '旱时田里皆枯槁');
ok('没有常见的同音讹字', !/书饼|忧悉|枯稿|鸿浩|更望闻|风恬浪静|光瑶|任设置|止饥饿/.test(COPY_TEXT));

// ── 二、抽签：指定 / 复现 / 随机 ──────────────────────────────
const r1 = buildGuanyin({ no: 1 });
eq('指定签号取到那一支', r1.slip.no, 1);
eq('指定时不看 seed', buildGuanyin({ no: 1, seed: 999 }).slip.no, 1);
eq('指定签号记为「指定签号」', r1.meta.method, '指定签号');
eq('末签 100 可用', buildGuanyin({ no: 100 }).slip.no, 100);
eq('同 seed 同签', buildGuanyin({ seed: 20261115 }).slip.no, buildGuanyin({ seed: 20261115 }).slip.no);
eq('数字串 seed 与数字等价', buildGuanyin({ seed: '20261115' }).slip.no, buildGuanyin({ seed: 20261115 }).slip.no);
eq('随机抽也记为「摇签」', buildGuanyin({}).meta.method, '摇签');
{
  let allValid = true;
  for (let s = 1; s <= 200; s += 1) {
    const n = buildGuanyin({ seed: s }).slip.no;
    if (!Number.isInteger(n) || n < 1 || n > GUANYIN_TOTAL) allValid = false;
  }
  ok('不同 seed 都落在 1–100', allValid);
}
// 重摇：except 等于刚摇到的那支时，必须换一支
{
  let seed = 0;
  let prev = null;
  for (let s = 1; s <= 500; s += 1) {
    const n = buildGuanyin({ seed: s }).slip.no;
    if (n !== 100) { seed = s; prev = n; break; }
  }
  const again = buildGuanyin({ seed, except: prev });
  ok('重摇不摇回同一支', again.slip.no !== prev, `${prev} → ${again.slip.no}`);
  eq('避开后顺延一支', again.slip.no, prev + 1);
  eq('except 与结果不同时不影响抽取', buildGuanyin({ seed, except: prev === 1 ? 2 : 1 }).slip.no, prev);
}
{
  // 撞上第 100 支时的环绕：except=100 应回到第 1 支
  let seed = 0;
  for (let s = 1; s <= 5000; s += 1) {
    if (buildGuanyin({ seed: s }).slip.no === 100) { seed = s; break; }
  }
  ok('找得到摇出第 100 支的 seed', seed > 0);
  if (seed) eq('第 100 支避开后回到第 1 支', buildGuanyin({ seed, except: 100 }).slip.no, 1);
}

// ── 三、边界与拒绝 ───────────────────────────────────────────
const throws = (fn, code) => {
  try { fn(); return false; } catch (e) { return e && e.code === code; }
};
ok('no=0 被拒', throws(() => buildGuanyin({ no: 0 }), 'E_INPUT'));
ok('no=101 被拒', throws(() => buildGuanyin({ no: 101 }), 'E_INPUT'));
ok('no=1.5 被拒', throws(() => buildGuanyin({ no: 1.5 }), 'E_INPUT'));
ok('非数字 seed 被拒', throws(() => buildGuanyin({ seed: 'abc' }), 'E_INPUT'));

// ── 四、接入：compute / 摘要 / 人话总结 / 句柄 ─────────────────
const r = compute({ system: 'guanyin', seed: 20261115 });
eq('compute 认 guanyin', r.system, 'guanyin');
eq('问题可留空', r.meta.question, null);
eq('摘要带签号与签题', r.summary.includes(`第 ${r.slip.no} / 100 签`) && r.summary.includes(r.slip.title), true);
ok('摘要含签诗、签意、可为、用法、口径',
  /签诗：/.test(r.summary) && /签意：/.test(r.summary) && /可为：/.test(r.summary)
  && r.summary.includes(GUANYIN_RULES) && r.summary.includes(GUANYIN_SCOPE));
eq('所问写进结果', compute({ system: 'guanyin', no: 7, question: '  这份工作要不要接  ' }).meta.question, '这份工作要不要接');
ok('摘要回显所问', compute({ system: 'guanyin', no: 7, question: '这份工作要不要接' }).summary.includes('所问：这份工作要不要接'));
const brief = plainSummary(r);
ok('brief 认得出灵签', brief && brief.title.startsWith('观音灵签'));
eq('brief 四枚 chips', brief.chips.length, 4);
eq('有卦象的三段（签意/卦象/用法）', brief.sections.length, 3);
eq('无卦象的两段', plainSummary(buildGuanyin({ no: 26 })).sections.length, 2);
eq('brief 一条建议', brief.advice.length, 1);
ok('brief 注意项写明不作确定性预言', /不作确定性预言/.test(brief.caveat));
ok('上中下各有一句旁白', Object.keys(GUANYIN_ASIDES).sort().join(',') === '上,下,中' && r.aside.length > 0);
ok('句柄能编码 no 与 seed', encodeHandle({ system: 'guanyin', no: 7, seed: 20261115 }).startsWith('mc1.'));
eq('性别不参与灵签', JSON.stringify(compute({ system: 'guanyin', seed: 3, gender: 'male' })),
  JSON.stringify(compute({ system: 'guanyin', seed: 3, gender: 'female' })));

// ── 五、渲染层 ───────────────────────────────────────────────
globalThis.window = globalThis.window || {};
new Function('window', KIT)(globalThis.window);
const PP = globalThis.window.__PP;
const html = PP.guanyinHTML(r);
ok('渲染出灵签卡', /class="pp mp-qn mp-lq mp-lq-lv-/.test(html));
ok('带无障碍标签', html.includes('aria-label="观音灵签"'));
ok('签题、签诗、签意都在', html.includes(r.slip.title) && html.includes(r.slip.poem[0]) && html.includes(r.slip.meaning));
ok('宫位与签号在卡里', html.includes(r.slip.palace) && html.includes(`第 ${String(r.slip.no).padStart(2, '0')} 签`));
ok('旁白在卡里', html.includes(r.aside));
ok('缺少卦象时不渲染卦象行', !PP.guanyinHTML(buildGuanyin({ no: 26 })).includes('mp-lq-omen'));
ok('有卦象时渲染', PP.guanyinHTML(buildGuanyin({ no: 1 })).includes('mp-lq-omen'));
ok('所问写在卡里', PP.guanyinHTML(compute({ system: 'guanyin', no: 7, question: '要不要换城市' })).includes('要不要换城市'));
ok('带再摇按钮', html.includes('data-lq-again') && html.includes('再摇一签'));
ok('用法与口径在卡底', html.includes(GUANYIN_RULES) && html.includes(GUANYIN_SCOPE));
ok('朱印按三档换色类', /mp-lq-lv-s/.test(PP.guanyinHTML(buildGuanyin({ no: 1 }))) || /mp-lq-lv-[szx]/.test(html));
ok('输出里没有 undefined', !/undefined|NaN/.test(html));
ok('缺字段时退回通用卡', PP.guanyinHTML({ system: 'guanyin' }).includes('mp-quick'));
ok('迷你签筒复用福签的 SVG 与提示', PP.guanyinOracleHTML().includes('mp-qn-o-cup')
  && PP.guanyinOracleHTML().includes('轻点一下') && PP.guanyinOracleHTML().includes(PP.QIAN_CUP_SVG));
const body = (KIT.match(/pp\.guanyinHTML = function \(r\) \{[\s\S]*?\n  \};/) || [''])[0];
ok('渲染器取到源码', body.length > 1200);
ok('渲染器不碰 window / document', !/\bwindow\b|localStorage|document\./.test(body));
ok('动态文本全部走 esc', (body.match(/esc\(/g) || []).length >= 15);
ok('灵签不重复插「说人话」', /r\.system === 'qian' \|\| r\.system === 'guanyin'/.test(KIT));
ok('灵签样式只加不盖福签', /\.mp-lq /.test(KIT) && /\.mp-qn-again/.test(KIT) && /mp-lq-lv-x/.test(KIT));

// ── 六、接线点（少一处就静默退回通用卡）────────────────────────
ok('engine 引入', /import \{ buildGuanyin \} from '\.\/guanyin\.js';/.test(ENGINE));
ok('engine 有分派', /if \(system === 'guanyin'\) \{/.test(ENGINE));
ok('分派不取日期', /buildGuanyin\(\{\s*\n\s*no: args\.no,\s*\n\s*seed: args\.seed,\s*\n\s*except: args\.except,/.test(ENGINE));
ok('engine 有纯文本', /function guanyinText\(r\)/.test(ENGINE));
ok('对外导出', /buildQian, buildGuanyin, buildStar/.test(ENGINE));
ok('错误清单提到灵签', /qian（每日福签）、guanyin（观音灵签）/.test(ENGINE));
ok('bridge 有短标签', /guanyin: '灵签',/.test(BRIDGE));
ok('revise 认灵签', /key: 'guanyin', label: '灵签'/.test(REVISE));
ok('plain-summary 有分派', /r\.system === 'guanyin'\) return guanyinSummary/.test(SUMMARY));
ok('compose 把 guanyin 归速查类', /lookup: \[[^\]]*'guanyin'/.test(COMPOSE));
ok('身份层视为不看性别', /'guanyin'/.test(FP.split('GENDER_NEUTRAL = new Set([')[1] || ''));
ok('lint 把签文数据当引用原文', /engine\/guanyin-data\.js/.test(LINT.split('const QUOTE_FILES')[1] || ''));
ok('schema 枚举含它', /'tarot', 'qian', 'guanyin', 'meihua'/.test(ROOTJS));
ok('schema 参数', /guanyin: \['no', 'seed', 'except', 'question', 'shadow'\],/.test(ROOTJS));
ok('schema 必填说明', /guanyin: '无（随机摇签/.test(ROOTJS));
ok('schema 有 no / except 说明', /no: '仅 guanyin/.test(ROOTJS) && /except: '仅 guanyin/.test(ROOTJS));
ok('工具描述列了灵签', /guanyin = 观音灵签/.test(ROOTJS));
ok('触发词含观音灵签', /观音灵签 \/ 观音签/.test(ROOTJS));
ok('不补日期（灵签不是日期类）', !/guanyin: 1/.test(ROOTJS) && /almanac: 1, qian: 1, star: 1/.test(ROOTJS));
ok('seed 说明涵盖灵签', /tarot \/ liuyao \/ guanyin/.test(ROOTJS));
ok('面板有 tab', /k: 'guanyin', label: '灵签'/.test(APP));
ok('面板 TIME_KIND 不取时间', /guanyin: 'none',/.test(APP));
ok('切换进来不自动摇签', /if \(next === 'guanyin'\) \{ setResult\(null\); return; \}/.test(APP));
ok('面板结果分派', /result\.kind === 'guanyin' \? PP\.guanyinHTML\(result\.r\)/.test(APP));
ok('面板按钮叫摇签', /tab === 'qian' \|\| tab === 'guanyin' \? '摇签'/.test(APP));
ok('面板重摇换 seed 并带上上一支', /args\.seed = Date\.now\(\) \+ Math\.random\(\)/.test(APP)
  && /args\.except = result\.r\.slip\.no/.test(APP));
ok('面板摇签结果不锁输入', /const locked = !!result && !editMode && tab !== 'guanyin';/.test(APP));
ok('面板不进历史', /k !== 'tarot' && k !== 'guanyin' && k !== 'mbti'/.test(APP));
ok('面板不取影子盘', /args\.shadow = k !== 'mbti' && k !== 'constitution' && k !== 'guanyin';/.test(APP));
ok('面板空状态可点签筒', /PP\.guanyinOracleHTML\(\)/.test(APP) && /mp-lq-oracle/.test(APP));
ok('面板「再摇一签」走委托', /closest\('\[data-lq-again\]'\)/.test(APP));
ok('面板所问可留空', /tab === 'guanyin' \? '所问之事（可留空）'/.test(APP));
ok('独立页同步', /guanyin: 'none',/.test(UI) && /window\.__PP\.guanyinHTML\(r\)/.test(UI));
ok('独立页按钮叫摇签', /tab === 'qian' \|\| tab === 'guanyin' \? '摇签'/.test(UI));
ok('独立页每次摇都换 seed', /args\.seed = Date\.now\(\) \+ Math\.random\(\)/.test(UI)
  && /args\.except = last\.r\.slip\.no/.test(UI));
ok('独立页不读结果缓存', /tab === 'guanyin' \? null : cacheRead\(ck\)/.test(UI));
ok('独立页不写结果缓存', /if \(tab !== 'guanyin'\) try \{/.test(UI));
ok('独立页所问可留空（askArgs 不空转到方向）', /if \(tab === 'guanyin'\) return \{ question: el\('question'\)\.value\.trim\(\), direction: 'general' \};/.test(UI));
ok('独立页空状态可点签筒', /__PP\.guanyinOracleHTML/.test(UI) && /mp-lq-oracle/.test(UI));
ok('离线页有 tab 按钮', /data-tab="guanyin">灵签</.test(HTML));
ok('分组卡片含它', /k: 'guanyin', label: '灵签'/.test(GROUPS));
ok('构建顺序含 guanyin', BC.indexOf("'guanyin-data'") > 0 && BC.indexOf("'guanyin-data'") < BC.indexOf("'star'"));
ok('分块表有它', /guanyin: \{ tabs: \['guanyin'\]/.test(BC));

// ── 七、深链回放：打开链接还是同一支 ───────────────────────────
{
  const a = compute({ system: 'guanyin', seed: 20261115, except: 5, question: '换工作' });
  const again = compute({ system: 'guanyin', ...decodeHandle(a.handle) });
  eq('句柄回放同一支', again.slip.no, a.slip.no);
  const link = askLink({ handle: a.handle }, { question: '换工作', base: 'https://example.test/mp.html' });
  ok('灵签深链带 mp', /#mp=mc1\./.test(link));
  const p = parseAskLink(link);
  const f = formOf(p);
  eq('深链把 seed 留在 rest', f.rest.seed, 20261115);
  eq('深链把 except 留在 rest', f.rest.except, 5);
  eq('深链按 rest 复现同一支', compute({ system: 'guanyin', ...f.rest }).slip.no, a.slip.no);
}
ok('独立页深链把摇签参数带进这次 run', /run\(\{ record: false, draw: deep\.draw \}\)/.test(UI));
ok('独立页深链提示写明第几签', /第 \$\{slip\.no\} 签「\$\{slip\.title\}」/.test(UI));
ok('独立页有 draw 时不再换 seed', /const draw = opts && opts\.draw;/.test(UI)
  && /if \(draw\.seed !== undefined\) args\.seed = draw\.seed;/.test(UI));
ok('面板深链把摇签参数直传', /const draw = over && over\.draw;/.test(APP)
  && /question: form\.question,\s*\n\s*draw,/.test(APP));
ok('面板 applyDeep 从 rest 摘出摇签参数', /for \(const key of \['no', 'seed', 'except'\]\)/.test(APP));

// ── 八、灵签不该出现的面板动作 ─────────────────────────────────
ok('面板灵签不读结果缓存', /const hit = k === 'guanyin' \? null : resultCacheRead\(cacheKey\)/.test(APP));
ok('面板灵签不写结果缓存', /if \(k !== 'guanyin'\) resultCacheWrite\(cacheKey/.test(APP));
ok('面板灵签不出存入卦例库', /result\.kind !== 'guanyin' \? h\('button'/.test(APP));
ok('面板灵签不出应验提示', /result\.kind !== 'guanyin' && !nudgeOff/.test(APP));
ok('独立页灵签不出存卦例/记准/记不准', /const gy = !!\(last && last\.tab === 'guanyin'\);/.test(UI)
  && /const cases = gy \? '' :/.test(UI) && /last\.tab === 'guanyin'\) return '';/.test(UI));
ok('摘要卡为灵签补一份 outline', /r\.system === 'guanyin' && r\.brief/.test(KIT)
  && /systemLabel: '观音灵签'/.test(KIT));
ok('反馈邮件按签号与所问写输入', /第 \$\{slip\.no\} 签（\$\{gyMeta\.method \|\| '摇签'\}）/.test(UI));
ok('灵签导出文件名用签号', /function fileStamp\(\)/.test(UI) && /第\$\{last\.r\.slip\.no\}签/.test(UI));
