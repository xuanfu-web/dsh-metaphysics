// 交互状态机：填参数不算，点「排盘」才算。
//
// 改这个之前的行为是「表单 change 即排盘」：改个日期，结果就自己跳出来；
// 切一次体系，日期被冲回示例默认值。两个问题同源——排盘由输入事件驱动，
// 而不是由用户明确点的那一下驱动。这里把那条路堵死：
// 任何 change / 显式排盘入口之外的地方都不许直接调 run()。
import { ok } from './_harness.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');
const src = fs.readFileSync(path.join(root, 'src', 'web-ui.js'), 'utf8');
const page = fs.readFileSync(path.join(root, 'tools', 'build-html.mjs'), 'utf8');
// 查「某写法是否还在」必须排除注释：旧写法通常正好被写进注释里当反面教材，
// 不剔注释那条断言永远不会绿。
const code = src.split('\n').filter((l) => !/^\s*(\/\/|\*|\/\*)/.test(l)).join('\n');

// 取一个具名函数/方法体（从签名行到下一个顶格收尾），用于「这个函数里不许出现什么」
function bodyOf(sig) {
  const i = src.indexOf(sig);
  if (i < 0) return '';
  const open = src.indexOf('{', i);
  if (open < 0) return '';
  let depth = 0;
  for (let k = open; k < src.length; k += 1) {
    const c = src[k];
    if (c === '{') depth += 1;
    else if (c === '}') {
      depth -= 1;
      if (depth === 0) return src.slice(open, k + 1);
    }
  }
  return '';
}

// ── 一、禁止项：输入事件不许直接排盘 ─────────────────────
ok('没有 addEventListener(\'change\', run)',
  !/addEventListener\(\s*'change'\s*,\s*run\b/.test(src));
ok('没有 addEventListener("change", run) 双引号写法',
  !/addEventListener\(\s*"change"\s*,\s*run\b/.test(src));
ok('change 监听统一走 onParamChange',
  (src.match(/addEventListener\('change',\s*onParamChange\)/g) || []).length >= 4,
  '实际 ' + (src.match(/addEventListener\('change',\s*onParamChange\)/g) || []).length + ' 处');
ok('没有 syncQuick(); run() 这种复合自动排',
  !/syncQuick\(\);\s*run\(\)/.test(src));
ok('切体系（activate）里不再排盘',
  !/\brun\s*\(/.test(bodyOf('function activate(')),
  'activate 体内出现 run(');
ok('切 tab（setTab）里不再排盘',
  !/\brun\s*\(/.test(bodyOf('function setTab(')));

// run() 仍然可以出现在「用户明确要结果」的地方：点排盘、历史盘点回来、档案回填、
// 深链、问卷提交、看示例。数量超了就该回头看是不是又混进自动触发。
const runLines = src.split('\n')
  .map((l, i) => [i + 1, l])
  .filter(([, l]) => /(^|[^.\w])run\s*\(/.test(l) && !/^\s*(\/\/|\*|\/\*)/.test(l));
ok('run( 调用点不超过 12 处', runLines.length <= 12, '实际 ' + runLines.length + ' 处: ' + runLines.map(([n]) => n).join(','));

// ── 二、六态状态机 ───────────────────────────────────────
const flowBlock = (src.match(/const FLOW = \{[\s\S]*?\};/) || [''])[0];
['IDLE_UNFILLED', 'IDLE_READY', 'CALCULATING', 'RESULT_LOCKED', 'EDITING', 'ERROR'].forEach((k) => {
  ok('FLOW 定义了 ' + k, flowBlock.includes(k));
});
ok('状态变量 flowState 存在', /let flowState = FLOW\.\w+;/.test(src));
ok('排盘参数键 castKey 存在', /let castKey = '';/.test(src));
ok('进 CALCULATING 只在 run 里', (src.match(/flowState = FLOW\.CALC/g) || []).length === 1);
ok('run 成功路径置 RESULT_LOCKED', /paint\(\)[\s\S]{0,600}flowState = FLOW\.LOCKED;/.test(src));
ok('run 失败路径置 ERROR', /catch \(e\)[\s\S]{0,400}flowState = FLOW\.ERROR;/.test(src));
ok('参数变更只让状态转 EDITING，不直接重算',
  /flowState === FLOW\.LOCKED && castKey && paramKey\(\) !== castKey\) flowState = FLOW\.EDITING/.test(src));

// ── 三、缺项优先 + 早退 · 清场 ───────────────────────────
ok('缺项判定在 EDITING 之前', (() => {
  const i = src.indexOf('if (!v.ok) {');
  const j = src.indexOf('flowState = FLOW.EDITING');
  return i > 0 && j > 0 && i < j;
})());
ok('缺项时收起上一张盘', /if \(flowState !== FLOW\.UNFILLED\) \{[\s\S]{0,400}last = null;/.test(src));
ok('bail 至少四处（run 的每个早退都要经过它）',
  (src.match(/return bail\(/g) || []).length >= 4,
  '实际 ' + (src.match(/return bail\(/g) || []).length + ' 处');
ok('bail 置 UNFILLED 并移出 aria-busy', /function bail\(/.test(src) && /flowState = FLOW\.UNFILLED/.test(bodyOf('function bail(')));
ok('run 入口置 CALC + 禁用按钮 + aria-busy',
  /flowState = FLOW\.CALC;[\s\S]{0,300}aria-busy/.test(src));

// ── 四、输入不回弹 ───────────────────────────────────────
ok('表单值从本机存储恢复', /const INPUT_KEY = 'mp\.input\.v1'/.test(src) && /storeGet\(INPUT_KEY\)/.test(src));
ok('有 saveManual 落盘', /function saveManual\(\)/.test(src) && (src.match(/saveManual\(\);?/g) || []).length >= 3);
ok('applyDateTime 用「用户改过才算」判据', /const typed = same &&/.test(src) && /if \(typed\) manual\[k\] = cur;/.test(src));
ok('applyDateTime 不再无条件套默认值',
  !/fillDateTime\(manual\[k\] \|\| defaultFor\(k\)\)/.test(code));
ok('清空会连记忆一起清', /manual\.birth = null;[\s\S]{0,200}manual\.cast = null;[\s\S]{0,200}saveManual\(\)/.test(src));

// ── 五、入口白名单 ───────────────────────────────────────
ok('首屏只有两条出口：深链或默认盘',
  /if \(deep\) Promise\.resolve\(run\(\{ record: false \}\)\)/.test(src) &&
  /else if \(pinned\) restoreDefault\(pinned\);/.test(src));
ok('没有默认盘时不排盘，只刷状态',
  /else if \(pinned\) restoreDefault\(pinned\);\s*\n\s*else refreshFlow\(\);/.test(src));
ok('切 tab 清结果并回到 READY',
  /last = null;[\s\S]{0,200}flowState = FLOW\.READY;[\s\S]{0,200}castKey = '';/.test(bodyOf('function setTab(')));
ok('__MPFlow 只读导出给自检用', /window\.__MPFlow = \{/.test(src));

// ── 六、样式与共用提示 ───────────────────────────────────
ok('按钮置灰有样式', /\.go:disabled\{/.test(page));
ok('流程提示有样式', /\.flow-note\{/.test(page));
ok('共用提示有样式', /\.share-note\{/.test(page));
ok('共用提示进了表单', /id="for-share"/.test(page));
ok('共用提示按体系显隐', /el\('for-share'\)/.test(src));
ok('共用提示写明会同步', /改一处全部跟着变/.test(page));
