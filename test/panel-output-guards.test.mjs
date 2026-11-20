// 前端输出护栏：拼 HTML 的字段先过正则，缓存有总预算，合盘开关跟主盘同源。
//
// 这三条都属「引擎全绿也发现不了」的接缝：castAtHTML 把引擎回传的日期直接插进
// innerHTML；缓存只有单条上限，6 条一起仍可能撑爆 localStorage；合盘读的是表单
// 原始 state，主盘读的是深链覆盖后的 tsV。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ok, eq } from './_harness.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');
const app = fs.readFileSync(path.join(root, 'src', 'app.js'), 'utf8');
const web = fs.readFileSync(path.join(root, 'src', 'web-ui.js'), 'utf8');

function fnBody(src, sig) {
  const i = src.indexOf(sig);
  if (i < 0) return '';
  const open = src.indexOf('{', i);
  if (open < 0) return '';
  let depth = 0;
  for (let k = open; k < src.length; k += 1) {
    if (src[k] === '{') depth += 1;
    else if (src[k] === '}') {
      depth -= 1;
      if (depth === 0) return src.slice(i, k + 1);
    }
  }
  return '';
}

// ── 一、起卦时刻：面板与独立页同一套校验 ────────────────────────
const panelCast = fnBody(app, 'const castAtHTML = (res) =>');
const pageCast = fnBody(web, 'function castAtHTML(');
ok('面板取到 castAtHTML', panelCast.length > 100, String(panelCast.length));
ok('面板校验日期格式', /\/\^\\d\{4\}-\\d\{2\}-\\d\{2\}\$\//.test(panelCast), panelCast);
ok('面板校验时刻格式', /\/\^\\d\{2\}:\\d\{2\}\(:\\d\{2\}\)\?\$\//.test(panelCast), panelCast);
ok('面板校验不过就不渲染', /if \(!d \|\| !t\) return '';/.test(panelCast), panelCast);
ok('面板只把校验后的值拼进 HTML', /\$\{d\} \$\{t\}/.test(panelCast) && !/\$\{res\.at\./.test(panelCast), panelCast);
ok('独立页保持同一套校验', /\/\^\\d\{4\}-\\d\{2\}-\\d\{2\}\$\//.test(pageCast) && /if \(!d \|\| !t\) return '';/.test(pageCast));

// ── 二、合盘的 trueSolar 跟主盘走同一个 tsV ─────────────────────
const hepanBlock = (app.match(/if \(k === 'hepan'\) \{([\s\S]*?)\n      \}/) || [])[1] || '';
ok('取到合盘参数块', hepanBlock.length > 100, String(hepanBlock.length));
eq('对方 trueSolar 用 tsV', (hepanBlock.match(/trueSolar: tsV,/g) || []).length, 2);
ok('合盘块里不再有裸 trueSolar', !/trueSolar,/.test(hepanBlock), hepanBlock.replace(/\n/g, ' '));

// ── 三、缓存总预算：单条上限之外还有一条总量线 ─────────────────
const panelCache = fnBody(app, 'function resultCacheWrite(key, rec)');
const webCache = fnBody(web, 'function cacheWrite(id, entry)');
ok('面板缓存有总预算常量', /const RESULT_TOTAL_MAX = \d+;/.test(app));
ok('面板缓存在总量超限时淘汰最旧', /while \(keys\.length && \(keys\.length > RESULT_MAX \|\| total > RESULT_TOTAL_MAX\)\)/.test(panelCache), panelCache);
ok('面板缓存按实际序列化长度累计', /JSON\.stringify\(v\)\.length/.test(panelCache) && /total -= sizeOf/.test(panelCache));
ok('独立页缓存有总预算常量', /const CACHE_TOTAL_MAX = \d+;/.test(web));
ok('独立页缓存在总量超限时淘汰最旧', /while \(ids\.length && \(ids\.length > CACHE_MAX \|\| total > CACHE_TOTAL_MAX\)\)/.test(webCache), webCache);
