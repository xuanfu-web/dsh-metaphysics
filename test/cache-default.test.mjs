// A3：排盘结果的本机缓存 + 默认盘读缓存直出。
// 全部是源码静态断言——单页脚本没有可加载的 DOM 宿主，行为靠 8080 实机验，
// 这里守的是「不许哪天又被改回自动重算」的结构约束。
import { ok } from './_harness.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');
const src = fs.readFileSync(path.join(root, 'src', 'web-ui.js'), 'utf8');
const page = fs.readFileSync(path.join(root, 'tools', 'build-html.mjs'), 'utf8');
const code = src.split('\n').filter((l) => !/^\s*(\/\/|\*|\/\*)/.test(l)).join('\n');

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

// ── 一、缓存层：键、上限、降级 ─────────────────────────────
ok('缓存存储键带版本号', /const CACHE_KEY = 'mp\.chartResult\.v1'/.test(src));
ok('默认盘存储键单独一份', /const DEFAULT_KEY = 'mp\.defaultChart\.v1'/.test(src));
ok('schema 版本进缓存键', /const CACHE_SCHEMA = 1/.test(src) &&
  /hash36\(`\$\{CACHE_SCHEMA\}\|\$\{param/.test(bodyOf('function chartKeyOf(')));
ok('键可传入出盘那刻的参数指纹', /function chartKeyOf\(param\)/.test(src) &&
  /param != null \? param : paramKey\(\)/.test(src));
ok('缓存读要求带完整盘面', /hit && hit\.last && hit\.last\.r/.test(bodyOf('function cacheRead(')));
ok('单条过大跳过不存', /CACHE_ITEM_MAX/.test(bodyOf('function cacheWrite(')) &&
  /JSON\.stringify\(entry\)\.length > CACHE_ITEM_MAX\) return/.test(src));
ok('超过上限按时间淘汰最旧', /CACHE_MAX/.test(bodyOf('function cacheWrite(')) &&
  /sort\(\(x, y\) => \(m\[x\]\.createdAt \|\| 0\) - \(m\[y\]\.createdAt \|\| 0\)\)/.test(src));
ok('写缓存失败不影响排盘', /try \{[\s\S]{0,900}catch \(e\) \{ \/\* 缓存写失败不影响这次排盘 \*\/ \}/.test(src));
ok('存储读写都走静默降级', /function storeGet\(key\)/.test(src) && /function storeSet\(key, val\)/.test(src));

// ── 二、命中即直出，绝不重新计算 ───────────────────────────
const hitBlock = (src.match(/const ck = chartKeyOf\(\);[\s\S]*?\/\/ 进入 CALCULATING/) || [''])[0];
ok('run 开头有缓存命中分支', !!hitBlock && /if \(!\(opts && opts\.force\)\)/.test(hitBlock));
ok('force 是显式重算的唯一口子', /if \(!\(opts && opts\.force\)\)/.test(src) &&
  (src.match(/opts\.force/g) || []).length >= 1);
ok('命中分支读盘面再直出', /last = makeLast\(hit\.last\);\s*paint\(\);/.test(hitBlock));
ok('命中分支不调 compute', !!hitBlock && !/Engine\.compute|\bcompute\(/.test(hitBlock));
ok('命中分支不进 CALC', !!hitBlock && !/flowState = FLOW\.CALC/.test(hitBlock));
ok('命中后回到 LOCKED 并记参数指纹', /flowState = FLOW\.LOCKED;\s*castKey = paramKey\(\);/.test(hitBlock));

// ── 三、写入的 entry 是完整快照 ─────────────────────────────
const writeBlock = (src.match(/cacheWrite\(ck, \{[\s\S]*?\}\);/) || [''])[0];
ok('成功路径写缓存', !!writeBlock);
ok('entry 带 chartId / system / createdAt', /chartId:/.test(writeBlock) && /system: tab/.test(writeBlock) && /createdAt: Date\.now\(\)/.test(writeBlock));
ok('entry 带 profileSnapshot', /profileSnapshot: snap/.test(writeBlock));
ok('entry 带 envelope', /envelope: r/.test(writeBlock));
ok('entry 带整份 last（直出靠它）', /last: makeLast\(last\)/.test(writeBlock));
ok('参数快照取的是可见控件', /const snap = collectArgs\(\);/.test(src));
ok('缓存键复用 run 开头的 ck', /const ck = chartKeyOf\(\);/.test(src) && /cacheWrite\(ck,/.test(src));

// ── 四、默认盘：只回填 + 读缓存 ─────────────────────────────
const restore = bodyOf('function restoreDefault(');
ok('有 restoreDefault', !!restore);
ok('restoreDefault 体内不排盘', !!restore && !/\brun\s*\(/.test(restore));
ok('restoreDefault 体内不调 compute', !!restore && !/Engine\.compute|\bcompute\(/.test(restore));
ok('回填后按 defaultChart 的键读缓存', /const d = defaultGet\(\)/.test(restore) &&
  /d\.profileId === p\.id \? cacheRead\(d\.cacheKey\)/.test(restore));
ok('命中才直出盘面', /last = makeLast\(hit\.last\);\s*paint\(\);/.test(restore));
ok('没命中只停在待排盘', /\} else \{\s*\/\/ 缓存里没这张盘[\s\S]{0,120}refreshFlow\(\);/.test(restore));
ok('回填走 profFill，不自动重排', /if \(!p \|\| !profFill\(p\)\)/.test(restore));
ok('profFill 只回填不排盘', !/\brun\s*\(/.test(bodyOf('function profFill(')));
ok('profApply 末尾仍是显式那一下',
  /onManualEdit\(\);\s*run\(\{ record: false \}\);\s*return true;/.test(bodyOf('function profApply(')));
ok('defaultGet 校验 profileId', /d && d\.profileId \? d : null/.test(bodyOf('function defaultGet(')));

// ── 五、设默认与取消 ───────────────────────────────────────
ok('置顶联动 defaultChart', /ev\.action === 'pin'[\s\S]{0,700}defaultSet\(\{ profileId: p2\.id/.test(src));
ok('设默认记的是上张盘的键', /const key = last && last\.r && castKey \? chartKeyOf\(castKey\) : ''/.test(src));
ok('取消置顶清掉默认盘', /defaultSet\(null\);\s*paintDefaultBar\(null\);/.test(src));
ok('取消默认按钮清掉 defaultChart', /defaultSet\(null\);\s*paintDefaultBar\(null\);\s*renderProfiles\(\);/.test(bodyOf('function paintDefaultBar(')));
ok('defaultChart 结构含 cacheKey', /cacheKey: key/.test(src) && /d\.cacheKey = ck; defaultSet\(d\);/.test(src));
ok('默认盘与表单不一致时不补键', /if \(d && !d\.cacheKey && defaultMatchesForm\(d\)\)/.test(src));
ok('启动以 defaultChart 为准、老置顶回退',
  /const d0 = defaultGet\(\)/.test(src) && /d0 \? list0\.find\(\(x\) => x && x\.id === d0\.profileId\) : list0\.find\(\(x\) => x && x\.pinned\)/.test(src));
ok('启动走 restoreDefault', /else if \(pinned\) restoreDefault\(pinned\);/.test(code));
ok('深链优先于默认盘', /if \(deep\) Promise\.resolve\(run\(\{ record: false \}\)\)[\s\S]{0,120}else if \(pinned\)/.test(src));

// ── 六、顶部「当前盘」条 ────────────────────────────────────
const bar = bodyOf('function paintDefaultBar(');
ok('顶部条进了 HTML', /id="cur-chart"/.test(page));
ok('顶部条有样式', /\.cur-chart\{/.test(page) && /\.cur-chart\[hidden\]\{display:none\}/.test(page));
ok('顶部条默认收起', /id="cur-chart" hidden/.test(page));
ok('点名当前盘的写法', /当前盘：\$\{p\.label \|\| '未命名'\}/.test(bar));
ok('文字走 textContent', /txt\.textContent =/.test(bar));
ok('不用 innerHTML 拼顶部条', !/innerHTML/.test(bar));
ok('有取消默认按钮', /off\.textContent = '取消默认'/.test(bar));
ok('读缓存没命中不显示条', /paintDefaultBar\(hit \? p : null\)/.test(restore));
ok('__MPFlow 导出缓存键与默认盘自检', /cacheKey: chartKeyOf/.test(src) &&
  /restoreDefault,/.test(src) && /defaultGet,/.test(src));

// ── 七、删档案联动 ──────────────────────────────────────────
ok('删掉默认盘那张档案时一并清掉 defaultChart',
  /ev\.action === 'del'[\s\S]{0,900}PP\.profilesRemove\(ev\.id\);[\s\S]{0,400}if \(d0 && d0\.profileId === ev\.id\) \{[\s\S]{0,120}defaultSet\(null\);[\s\S]{0,80}paintDefaultBar\(null\);/.test(src));
ok('删档案不动缓存条目与页面上这张盘', !/action === 'del'[\s\S]{0,900}cacheWrite/.test(src));