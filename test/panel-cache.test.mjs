// A4：面板（React 版）的结果缓存 + 出盘后参数区只读。
// 和 cache-default.test.mjs 一样是源码静态断言——面板没有可加载的 React 宿主，
// 行为靠实机验（window.__MPStats 就是为此加的），这里守的是结构约束。
import { ok } from './_harness.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');
const app = fs.readFileSync(path.join(root, 'src', 'app.js'), 'utf8');

function bodyOf(sig) {
  const i = app.indexOf(sig);
  if (i < 0) return '';
  const open = app.indexOf('{', i);
  if (open < 0) return '';
  let depth = 0;
  for (let k = open; k < app.length; k += 1) {
    const c = app[k];
    if (c === '{') depth += 1;
    else if (c === '}') {
      depth -= 1;
      if (depth === 0) return app.slice(i, k + 1);
    }
  }
  return '';
}

// ── 一、缓存层 ─────────────────────────────────────────────
ok('面板缓存有自己的键，不与单页共用', /const RESULT_KEY = 'mp\.panel\.result\.v1';/.test(app)
  && !/mp\.chartResult\.v1/.test(app));
ok('有 schema 版本号', /const RESULT_SCHEMA = 1;/.test(app));
ok('有条数与单条体积上限', /const RESULT_MAX = 6;/.test(app) && /const RESULT_ITEM_MAX = \d+;/.test(app));
ok('键是对引擎入参求哈希', /const cacheKey = hash36\(`\$\{RESULT_SCHEMA\}\|\$\{JSON\.stringify\(args\)\}`\);/.test(app));
ok('读缓存要求整份结果在场', /return rec && rec\.result && rec\.result\.r \? rec : null;/.test(bodyOf('function resultCacheRead(')));
ok('写缓存超限淘汰最旧', /sort\(\(a, b\) => \(map\[a\]\.at \|\| 0\) - \(map\[b\]\.at \|\| 0\)\)/.test(bodyOf('function resultCacheWrite(')));
ok('存的是整份 result 而不是输入', /resultCacheWrite\(cacheKey, \{ result: resObj, at: Date\.now\(\) \}\);/.test(app));

// ── 二、命中就直出，不重算 ──────────────────────────────────
const runBody = bodyOf('const run = async (kind, override, modeOverride, over) =>');
ok('run 里先查缓存再计算', /const hit = k === 'guanyin' \? null : resultCacheRead\(cacheKey\);/.test(runBody)
  && /const r = Engine\.compute\(args\);/.test(runBody)
  && runBody.indexOf('resultCacheRead') < runBody.indexOf('Engine.compute(args)'));
ok('命中分支不调 Engine.compute', (() => {
  const i = runBody.indexOf('if (hit && hit.result && hit.result.kind === k)');
  if (i < 0) return false;
  const end = runBody.indexOf('const computeStart = mpNow();', i);
  if (end < 0) return false;
  const branch = runBody.slice(i, end);
  return !/Engine\.compute/.test(branch) && /setResult\(hit\.result\);/.test(branch);
})());
ok('命中后不算首帧耗时（computeMs 记 0）', /computeMs: 0, cached: true/.test(runBody));
ok('命中后重新锁参数区', /setResult\(hit\.result\);\s*setEditMode\(false\);/.test(runBody));
ok('正常出盘也复位为锁定态', /setResult\(resObj\);\s*setEditMode\(false\);/.test(runBody));
ok('趋势盘的 asOf 在求键之前补', runBody.indexOf('args.asOf = Core.todayStamp()') < runBody.indexOf('const cacheKey = hash36'));

// ── 三、参数区只读 ────────────────────────────────────────
// 扫描规则与「哪些控件放过」的名单已收到共用层（panel-kit 的 pp.lockParams），
// 面板与独立页调同一份。这里守住两件事：面板确实交出去、名单里确实含问事层三类。
const lockFx = bodyOf('  useEffect(() => {\n    const panel = document.querySelector(\'.mp-panel\');');
const kit = fs.readFileSync(path.join(root, 'src', 'panel-kit.js'), 'utf8');
ok('锁定只在出盘且未点修改参数时（灵签除外）',
  /const locked = !!result && !editMode && tab !== 'guanyin';/.test(lockFx));
ok('锁定范围限定面板根', /document\.querySelector\('\.mp-panel'\)/.test(lockFx));
ok('面板把锁定交给共用层，不再自己列白名单', /PP\.lockParams\(panel, locked\)/.test(lockFx));
ok('面板不再自己扫 input/select/textarea', !/querySelectorAll\('input, select, textarea'\)/.test(lockFx));
// 问事层（所问之事 / 询问方向）改的是解读，不动盘面；锁住就等于出盘后永远改不了问法
ok('共用层导出锁定名单', /const ASK_FREE = '[^']*\.mp-askfree[^']*'/.test(kit));
ok('名单含追问框 / 所问之事 / 询问方向', /\.mp-askbox/.test(kit) && /\.mp-askblock/.test(kit) && /\.mp-askonly/.test(kit));
ok('询问方向带 mp-askonly 标记类', /className: 'mp-input mp-askonly'/.test(app));
ok('select 与勾选用 disabled', /tag === 'SELECT' \|\| el\.type === 'checkbox' \|\| el\.type === 'radio' \|\| el\.type === 'button'\) el\.disabled = !!locked;/.test(kit));
ok('文本类用 readOnly（不改 value）', /else el\.readOnly = !!locked;/.test(kit));
ok('命中的问事层控件被显式解禁', /el\.closest\(ASK_FREE\)\) \{ el\.disabled = false; el\.readOnly = false; return; \}/.test(kit));
ok('锁定态挂到面板 class 上', /panel\.classList\.toggle\('mp-locked', locked\);/.test(lockFx));
ok('有只读态的样式', /\.mp-panel\.mp-locked \.mp-input,\.mp-panel\.mp-locked \.mp-textarea\{opacity:\.62;cursor:default\}/.test(app));

// ── 四、修改参数入口 ──────────────────────────────────────
ok('出盘后才有「修改参数」按钮', /result && !editMode \? h\('button', \{/.test(app) && /'修改参数'\)/.test(app));
ok('点它就解锁（不重排）', /onClick: \(\) => setEditMode\(true\)/.test(app));
ok('解锁不触发排盘', !/setEditMode\(true\)[\s\S]{0,120}run\(/.test(app));

// ── 五、自检计数 ──────────────────────────────────────────
ok('有 computeHits / cacheHits 计数', /const STATS = \{ computeHits: 0, cacheHits: 0 \};/.test(app));
ok('计数挂到 window 供实机读', /window\.__MPStats = STATS;/.test(app));
ok('命中与真算分别计数', /STATS\.cacheHits\+\+;/.test(app) && /STATS\.computeHits\+\+;\s*\n\s*const r = Engine\.compute\(args\);/.test(app));
