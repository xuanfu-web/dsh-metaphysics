// 中医体质（P4-1）：引擎口径 + 两个入口的接入 + 渲染层
// 这套断言盯的是「九种体质 × 5 题 = 45 题、转化分公式、主次判定」与「面板/独立页不会把
// answers 剪短、不会把问卷时间当出生时间、不会进历史记录」这些真正会错的地方。
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ok, eq } from './_harness.mjs';
import { CONSTITUTIONS, QUESTIONS, SCALE_OPTIONS, constitutionPaper, buildConstitution } from '../engine/constitution.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const read = (p) => readFileSync(path.join(ROOT, p), 'utf8');
const APP = read('src/app.js');
const UI = read('src/web-ui.js');
const KIT = read('src/panel-kit.js');
const HTML = read('tools/build-html.mjs');
const SUMMARY = read('engine/plain-summary.js');
const BRIDGE = read('engine/bridge.js');
const ENGINE = read('engine/index.js');
const ROOTJS = read('index.js');

// ── 一、题库结构 ─────────────────────────────────────────────
eq('九种体质', CONSTITUTIONS.length, 9);
eq('共 45 题', QUESTIONS.length, 45);
ok('每种体质 5 题', CONSTITUTIONS.every((c) => QUESTIONS.filter((q) => q.key === c.key).length === 5));
eq('体质顺序（平和打头）', CONSTITUTIONS.map((c) => c.key).join(','), 'pinghe,qixu,yangxu,yinxu,tanshi,shire,xueyu,qiyu,tebing');
ok('量表 1–5 五档', SCALE_OPTIONS.length === 5 && SCALE_OPTIONS.map((s) => s.v).join('') === '12345');
ok('题面都有正文', QUESTIONS.every((q) => typeof q.text === 'string' && q.text.length >= 8));
ok('每题带体质归属', QUESTIONS.every((q) => q.name && q.key));

const paper = constitutionPaper();
ok('卷子标记 paper', paper.paper === true && paper.system === 'constitution');
eq('卷子题数', paper.total, 45);
eq('卷子体质数', paper.scaleCount, 9);
eq('卷子每题数', paper.itemsPerScale, 5);
ok('卷子带 answers 用法说明', /answers/.test(paper.howto || ''));
ok('卷子题号从 1 起', paper.questions[0].no === 1 && paper.questions[44].no === 45);

// ── 二、计分与判定 ───────────────────────────────────────────
const vec = (groups) => {
  const a = new Array(45).fill(1);
  groups.forEach(([gi, v]) => { for (let i = gi * 5; i < gi * 5 + 5; i += 1) a[i] = v; });
  return a;
};
const allOn = (gi, v) => { const a = new Array(45).fill(1); for (let i = gi * 5; i < gi * 5 + 5; i += 1) a[i] = v; return a; };

const qixu = buildConstitution({ answers: allOn(1, 5) });
eq('气虚题全 5 → 主气虚质', qixu.primary.key, 'qixu');
eq('转化分 100', qixu.primary.converted, 100);
eq('level 是', qixu.primary.level, '是');
ok('未掺「有倾向」的兼夹', qixu.secondary === null || qixu.secondary.converted < 30);

const pinghe = buildConstitution({ answers: allOn(0, 5) });
eq('平和题全 5 → 主平和质', pinghe.primary.key, 'pinghe');
ok('其余八种都低时算平和', pinghe.balanced === true && pinghe.primary.level === '是');

const mid = buildConstitution({ answers: new Array(45).fill(3) });
eq('全选 3 的转化分是 50', mid.scales[1].converted, 50);
ok('全选同一个值 → 标区分度不足', mid.flat === true && /区分度不足/.test(mid.note));

const low = buildConstitution({ answers: new Array(45).fill(1) });
eq('全选 1 转化分 0', low.scales[1].converted, 0);
ok('全 0 时没有任何偏颇质判「是」', low.scales.every((s) => s.level !== '是'));

const half = buildConstitution({ answers: vec([[1, 3]]) });
eq('全 3 落在 50 分', half.scales[1].converted, 50);
ok('平和质在其余不低时不能判「是」', half.primary.key !== 'pinghe' || half.primary.level !== '是');

ok('scales 与体质表同序', qixu.scales.map((s) => s.key).join(',') === CONSTITUTIONS.map((c) => c.key).join(','));
eq('调养方向 4 条', qixu.care.length, 4);
ok('note 说明不是病名', /不是当下病名|就医/.test(qixu.note));
ok('meta 记问卷规模', qixu.meta.answered === 45 && qixu.meta.total === 45 && qixu.meta.itemsPerScale === 5);

// 跳过题按「有时」（3）补齐，但 answered 只数真答的
const skipped = new Array(45).fill(null);
for (let i = 0; i < 45; i += 1) if (i % 2 === 0) skipped[i] = 4;
const sk = buildConstitution({ answers: skipped });
ok('跳过的题按中性值补齐', sk.scales.every((s) => s.converted >= 0 && s.converted <= 100));
ok('answered 只数真答的', sk.meta.answered === 23);

const bad = (fn) => { try { fn(); return ''; } catch (e) { return (e && e.code) || 'ERR'; } };
eq('缺 answers 报 E_INPUT', bad(() => buildConstitution({})), 'E_INPUT');
eq('长度不对报 E_INPUT', bad(() => buildConstitution({ answers: [1, 2, 3] })), 'E_INPUT');
eq('越界分数报 E_INPUT', bad(() => { const a = new Array(45).fill(3); a[7] = 9; buildConstitution({ answers: a }); }), 'E_INPUT');
eq('小数分数报 E_INPUT', bad(() => { const a = new Array(45).fill(3); a[7] = 2.5; buildConstitution({ answers: a }); }), 'E_INPUT');
eq('全跳过报 E_INPUT', bad(() => buildConstitution({ answers: new Array(45).fill(null) })), 'E_INPUT');

// ── 三、引擎接入 ────────────────────────────────────────────
ok('index.js 引入体质引擎', /import \{ buildConstitution, constitutionPaper \} from '\.\/constitution\.js';/.test(ENGINE));
ok('index.js 有 constitution 分支', /if \(system === 'constitution'\)/.test(ENGINE));
ok('卷子文案函数', /function constitutionPaperText\(/.test(ENGINE) && /function constitutionText\(/.test(ENGINE));
ok('对外导出 buildConstitution', /export \{ buildConstitution \};/.test(ENGINE));
ok('bridge 有体质标签', /constitution: '体质',/.test(BRIDGE));
ok('plain-summary 分派体质', /r\.system === 'constitution'\) return constitutionSummary\(r\)/.test(SUMMARY));
ok('schema 枚举含体质', /SYSTEM_ENUM[\s\S]{0,900}'constitution'/.test(ROOTJS));
ok('schema 参数含 answers', /constitution: \['answers', 'shadow'\]/.test(ROOTJS));
ok('schema 说明提到 45 题', /体质 45 题/.test(ROOTJS));

// ── 四、面板（app.js）────────────────────────────────────────
ok('面板 tab 有体质', /\{ k: 'constitution', label: '体质'/.test(APP));
ok('面板 TIME_KIND 认体质不看时间', /constitution: 'none',/.test(APP));
ok('问卷一页 5 题', /const CS_PER_PAGE = 5;/.test(APP));
ok('至少 27 题', /const CS_MIN = 27;/.test(APP));
ok('共 45 题常量', /const CS_TOTAL = 45;/.test(APP));
ok('问卷组件 CsQuiz', /function CsQuiz\(props\)/.test(APP));
ok('题面取自引擎卷子', /paper\.questions\.slice\(start, start \+ CS_PER_PAGE\)/.test(APP));
ok('量表文案不另抄一份', /const say = \(n\) => \{/.test(APP) && /paper\.scale \|\| \[\]/.test(APP));
ok('答案按题位存 45 个', /new Array\(CS_TOTAL\)\.fill\(null\)/.test(APP));
ok('体质答案整份传引擎（不剪尾）', /args\.answers = csAns\.slice\(\);/.test(APP));
ok('体质答案注入在 mbti 之后', APP.indexOf('args.answers = csAns.slice();') > APP.indexOf('if (nums.length) args.answers = nums;'));
ok('体质不进历史记录', /k !== 'tarot' && k !== 'mbti' && k !== 'constitution'/.test(APP));
ok('体质不挂影子盘', /args\.shadow = k !== 'mbti' && k !== 'constitution';/.test(APP));
ok('体质不显示日期/时刻', /tab !== 'constitution' && usesTimeInput/.test(APP));
ok('切 tab 先加载引擎再取卷子', /if \(next === 'constitution'\)/.test(APP) && /Engine\.compute\(\{ system: 'constitution' \}\)/.test(APP));
ok('主按钮校验答够 27 题', /if \(tab === 'constitution'\) \{\n      const n = csAns\.filter/.test(APP));
ok('底部主按钮对问卷隐藏', /tab === 'mbti' \|\| tab === 'constitution' \? null :/.test(APP));
ok('空状态文案提 27 题', /答满 27 题就能看结果/.test(APP));
ok('结果卡分派体质渲染器', /result\.kind === 'constitution' \? PP\.constitutionHTML\(result\.r\)/.test(APP));
ok('面板有 mp-cs 样式', /\.mp-cs-h\{/.test(APP) && /\.mp-cs-track i\.on\{/.test(APP));

// ── 五、独立页（web-ui + 页面骨架）──────────────────────────
ok('独立页 TIME_KIND 认体质', /constitution: 'none',/.test(UI));
ok('独立页有体质提示', /constitution: '中医体质是九种体质各 5 题的自评问卷/.test(UI));
ok('独立页不显示日期', /tab !== 'constitution' && !\(tab === 'meihua'/.test(UI));
ok('独立页不挂影子盘', /args\.shadow = tab !== 'mbti' && tab !== 'constitution';/.test(UI));
ok('独立页整份传 45 个答案', /args\.answers = csAns\.slice\(\);/.test(UI));
ok('独立页结果分派体质', /tab === 'constitution' \? window\.__PP\.constitutionHTML\(r\)/.test(UI));
ok('独立页主按钮走 csSubmit', /if \(tab === 'constitution'\) \{ csSubmit\(\); return; \}/.test(UI));
ok('独立页把体质算进快查', /'name', 'mbti', 'constitution', 'wuyunliuqi', 'taiyi'\]/.test(UI));
ok('独立页显示体质表单容器', /const csForm = el\('for-constitution'\)/.test(UI));
ok('问卷类共用一套按钮隐藏', /const quizOn = tab === 'mbti' \|\| tab === 'constitution';/.test(UI));
ok('独立页整套 cs 函数在', ['ensureCsPaper', 'csAnswered', 'refreshCsMeta', 'renderCs', 'onCsPick', 'csTurn', 'csNudge', 'csClear', 'csSubmit', 'csEnter']
  .every((fn) => new RegExp('function ' + fn + '\\(').test(UI)));
ok('独立页绑定问卷事件', /csHost\.addEventListener\('change', onCsPick\)/.test(UI));
ok('页面骨架有体质 tab 按钮', /<button class="tab" data-tab="constitution">体质<\/button>/.test(HTML));
ok('页面骨头没有重复前缀', !/<button class="tab" <button/.test(HTML));
ok('页面骨架有问卷容器', /<div id="for-constitution" style="display:none">/.test(HTML));
ok('容器里翻页骨架齐', ['cs-fill', 'cs-count', 'cs-qs', 'cs-prev', 'cs-next', 'cs-submit', 'cs-clear', 'cs-hint']
  .every((id) => HTML.includes('id="' + id + '"')));

// ── 六、渲染层 ──────────────────────────────────────────────
ok('panel-kit 有体质渲染器', /pp\.constitutionHTML = function \(r\) \{/.test(KIT));
ok('结果态用 mp-cs 外壳', /<section class="mp-cs" aria-label="中医体质结果">/.test(KIT));
ok('问卷态用 mp-cs-paper 外壳', /<section class="mp-cs-paper" aria-label="中医体质问卷">/.test(KIT));
ok('横条带 40 分判定线', /class="mp-cs-tick" style="left:40%"/.test(KIT));
ok('主质行加粗标记', /mp-cs-row\$\{main \? ' main' : ''\}/.test(KIT));
ok('文字都过 esc', /esc\(p\.trait \|\| ''\)/.test(KIT) && /esc\(c\)/.test(KIT));
ok('兼夹与区分度不足会写明', /兼夹 \$\{esc\(r\.secondary\.name\)\}/.test(KIT) && /区分度不足/.test(KIT));
ok('调养方向渲染成列表', /mp-cs-care"><b>调养方向<\/b><ul>/.test(KIT));

console.log('constitution: done');