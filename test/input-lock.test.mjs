// A 线第 2 条：出盘后输入区转只读，要改只能点「修改参数」。
// 依据任务书 1.3 —— RESULT_LOCKED 是只读展示态、提供「修改参数」入口；
// EDITING 恢复可编辑且保留原值不清结果；迁移只由这两个按钮驱动。
// 全部是源码静态断言，行为在 8080 实机验。
import { ok } from './_harness.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');
const src = fs.readFileSync(path.join(root, 'src', 'web-ui.js'), 'utf8');
const page = fs.readFileSync(path.join(root, 'tools', 'build-html.mjs'), 'utf8');

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

// ── 一、按钮与样式进页面 ───────────────────────────────
ok('页面有「修改参数」按钮', /<button id="edit" class="go ghost" hidden [^>]*>修改参数<\/button>/.test(page));
ok('修改参数按钮默认收起', /id="edit" class="go ghost" hidden/.test(page));
ok('按钮文案不超四字', (() => {
  const m = page.match(/id="edit"[^>]*>([^<]*)<\/button>/);
  return !!m && m[1].trim().length > 0 && m[1].trim().length <= 4;
})(), (page.match(/id="edit"[^>]*>([^<]*)<\/button>/) || [])[1]);
ok('隐藏按钮不会占位', /\.go\[hidden\]\{display:none\}/.test(page));
ok('只读态有视觉区分', /\.bar\.is-locked \.field input/.test(page) &&
  /\.bar\.is-locked \.field select/.test(page) &&
  /\.bar\.is-locked \.field textarea/.test(page));

// ── 二、锁定范围只到参数区 ────────────────────────────
const lock = bodyOf('function syncInputLock(');
ok('有 syncInputLock', lock.length > 0);
ok('锁的是 .bar 参数区', /document\.querySelector\('\.bar'\)/.test(lock));
ok('只挑输入类控件', /querySelectorAll\('input, select, textarea'\)/.test(lock));
ok('取值类给 readOnly', /else n\.readOnly = locked;/.test(lock));
ok('无 readOnly 的给 disabled', /n\.disabled = locked;/.test(lock));
ok('select 走 disabled', /tag === 'SELECT'/.test(lock));
ok('checkbox / radio 走 disabled', /n\.type === 'checkbox'/.test(lock) && /n\.type === 'radio'/.test(lock));
ok('只读态给容器打标记', /bar\.classList\.toggle\('is-locked', locked\)/.test(lock));
ok('只有 RESULT_LOCKED 才锁', /const locked = flowState === FLOW\.LOCKED;/.test(lock));
ok('按钮跟着状态显隐', /eb\.hidden = !locked/.test(lock));
ok('不碰结果区里的追问框', !/askq/.test(lock) && !/#out|el\('out'\)/.test(lock));
ok('不拼 HTML', !/innerHTML/.test(lock));

// ── 三、所有状态迁移都汇到一处 ────────────────────────
ok('paintFlowNote 末尾统一刷锁定态', /function paintFlowNote\(v\) \{[\s\S]{0,260}syncInputLock\(\);/.test(src));
ok('没有第二个地方自己刷锁定', (src.match(/syncInputLock\(\);/g) || []).length === 1,
  (src.match(/syncInputLock\(\);/g) || []).length);
ok('锁定态由 refreshFlow 带动', /paintFlowNote\(v\);/.test(bodyOf('function refreshFlow(')));

// ── 四、修改参数只解锁，不排盘 ────────────────────────
const editBind = (() => {
  const i = src.indexOf('const editBtn = el(');
  return i < 0 ? '' : src.slice(i, i + 620);
})();
ok('修改参数按钮有绑定', editBind.length > 0);
ok('点了转 EDITING', /flowState = FLOW\.EDITING;/.test(editBind));
ok('点了不排盘', !/(^|[^.\w])run\s*\(/.test(editBind));
ok('点了不清值', !/value = ''/.test(editBind) && !/last = null/.test(editBind));
ok('非锁定态点它没反应', /if \(flowState !== FLOW\.LOCKED\) return;/.test(editBind));
ok('解锁后把焦点放到日期', /d\.focus\(\{ preventScroll: true \}\)/.test(editBind));

// ── 五、EDITING 的话分两种 ────────────────────────────
ok('刚解锁和真改了参数分开说', /castKey && paramKey\(\) === castKey/.test(bodyOf('function paintFlowNote(')));
ok('刚解锁时说的是改完再排', /改完点「\$\{goLabel\(\)\}」更新结果，旧盘先留着。/.test(src));
ok('真改了才说结果待更新', /参数已变更，结果待更新——点「\$\{goLabel\(\)\}」重排。/.test(src));
ok('提示区不塞结果区', !/el\('out'\)/.test(bodyOf('function paintFlowNote(')));

// ── 六、别把既有的状态机改坏 ──────────────────────────
ok('EDITING 迁移那条还在', /flowState === FLOW\.LOCKED && castKey && paramKey\(\) !== castKey\) flowState = FLOW\.EDITING/.test(src));
ok('仍只有一个地方进 CALCULATING', (src.replace(/\/\/.*$/gm, '').match(/flowState = FLOW\.CALC/g) || []).length === 1);
ok('切换体系会把状态收回 READY', /flowState = FLOW\.READY;/.test(bodyOf('function setTab(')));
ok('清空会把状态收回 READY', /flowState = FLOW\.READY;/.test(src.slice(src.indexOf("el('clear')"), src.indexOf("el('clear')") + 900)));
ok('自检口导出了 syncInputLock', /syncInputLock,/.test(src.slice(src.indexOf('window.__MPFlow'))));
