// 客户端异步竞态：面板 / 独立页的 run() 在 await 之后才写界面，期间用户随时可能再点一次或换 tab。
// 过期的一次不许把结果、错误或历史写回去——否则看到的是「点了 A 却出 B 的盘」。
//
// 这里用结构断言（与仓库里其它接线测试同一手法）：把 run 的函数体抠出来，
// 要求每一个 await 之后、下一次真正影响界面的写入之前，都先过一次「是否已过期」的闸门。
import fs from 'node:fs';
import { ok } from './_harness.mjs';

const APP = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
const UI = fs.readFileSync(new URL('../src/web-ui.js', import.meta.url), 'utf8');

/** 从 src 里抠出 marker 之后第一个 { 到与之配对的 } 之间的函数体 */
function bodyOf(src, marker, label) {
  const at = src.indexOf(marker);
  if (at < 0) throw new Error(`找不到 ${label}：${marker}`);
  const open = src.indexOf('{', at);
  let depth = 0;
  for (let i = open; i < src.length; i += 1) {
    if (src[i] === '{') depth += 1;
    else if (src[i] === '}') {
      depth -= 1;
      if (depth === 0) return src.slice(open + 1, i);
    }
  }
  throw new Error(`${label} 括号不配平`);
}

/** 去掉行注释：否则注释里写的「await」会被当成一次真正的异步挂点 */
function stripComments(src) {
  return src.split('\n').map((line) => {
    const i = line.indexOf('//');
    if (i < 0) return line;
    if (i > 0 && line[i - 1] === ':') return line; // 形如 https:// 的串不当注释
    return line.slice(0, i);
  }).join('\n');
}

/** body 里每个 await 之后、下一个 writes 命中之前，是否都过了 gate */
function awaitsGuarded(body, gate, writes) {
  const bad = [];
  const re = /await\s/g;
  let m;
  while ((m = re.exec(body))) {
    const rest = body.slice(m.index);
    let cut = rest.length;
    for (const w of writes) {
      const i = rest.indexOf(w);
      if (i >= 0 && i < cut) cut = i;
    }
    if (!rest.slice(0, cut).includes(gate)) {
      bad.push(body.slice(m.index, Math.min(m.index + 60, body.length)).replace(/\s+/g, ' '));
    }
  }
  return bad;
}

// ── ① 面板 run()：await 之后先验过期，再写结果 / 错误 / 历史 ──
const appRun = stripComments(bodyOf(APP, 'const run = async (kind, override, modeOverride, over) =>', '面板 run'));
// 抠错体会让下面所有「每个 await 都被守住」变成空对空，先确认真的把整个函数抠下来了
const countAwaits = (s) => (s.match(/await\s/g) || []).length;
// 3 处：地址解析、按需补载称骨分块、以及原本就有的那一处
ok('抠到的面板 run 是完整函数体', appRun.includes('catch (e)') && appRun.trimEnd().endsWith('}')
  && countAwaits(appRun) === 3, `长度 ${appRun.length}，await ${countAwaits(appRun)} 处`);
const WRITES = ['setError(', 'setResult(', 'setHist(', 'setAskInvalid('];
const leaks = awaitsGuarded(appRun, 'stale()', WRITES);
ok('面板 run 的每个 await 之后都先判过期', leaks.length === 0, leaks.join(' ／ '));
ok('过期判定用同一次点击的代次', appRun.includes('const stale = () => runToken !== perfSeq;'));
ok('地址解析 await 之后立刻作废', /geocodeAddress[\s\S]{0,460}if \(stale\(\)\) return;/.test(appRun));
ok('历史写入在过期闸门之后', appRun.indexOf('if (stale()) return;') < appRun.indexOf('setHist('));
ok('首帧回调仍用代次丢弃', appRun.includes('if (runToken !== perfSeq) return;'));

// ── ② 换 tab 作废在途盘 ──
const switchBody = stripComments(bodyOf(APP, 'const switchTo = async (next) =>', 'switchTo'));
ok('换 tab 自增代次', switchBody.includes('const switchSeq = ++perfSeq;'));
ok('人格 tab 的 await 之后先验代次再落 tab', /await ensureEngine[\s\S]{0,220}switchSeq !== perfSeq[\s\S]{0,80}setTab\(next\)/.test(switchBody));
ok('换 tab 的报错不被过期的一次盖住', /if \(switchSeq === perfSeq\) setError/.test(switchBody));

// ── ③ 首屏默认盘不覆盖用户刚点的那一张 ──
ok('默认盘记下首屏代次', APP.includes('const bootSeq = perfSeq;'));
ok('用户已经点过就不再补默认盘', /perfSeq !== bootSeq[\s\S]{0,220}run\('ziwei'\)/.test(APP));

// 首屏预热必须按当前 tab：无条件先载 bazi 会让默认的紫微首屏白背一块 200KB+ 引擎
const bootBody = stripComments(bodyOf(APP, 'const bootSeq = perfSeq;', '首屏 effect'));
ok('首屏预热当前 tab', /await ensureEngine\(tab\)/.test(bootBody));
ok('首屏不再写死预热 bazi', !/ensureEngine\(['"]bazi['"]\)/.test(bootBody));
ok('默认盘仍是 ziwei', bootBody.includes("run('ziwei')"));

// ── ④ 独立页 run()：唯一的 await 之后先判代次与 tab ──
const uiRun = stripComments(bodyOf(UI, 'async function run() {', '独立页 run'));
ok('抠到的独立页 run 是完整函数体', uiRun.trimEnd().endsWith('}') && countAwaits(uiRun) === 1,
  `长度 ${uiRun.length}，await ${countAwaits(uiRun)} 处`);
const uiLeaks = awaitsGuarded(uiRun, 'runSeq', ["el('out').innerHTML"]);
ok('独立页 await 之后判代次', uiLeaks.length === 0, uiLeaks.join(' ／ '));
ok('独立页同时判 tab 是否被换走', uiRun.includes('startTab !== tab'));
ok('独立页每次点排盘自增代次', uiRun.includes('const myRun = ++runSeq;'));

// ── ⑤ 会话桥重复坐席 ──
ok('注册成功即记入 seatOk', APP.includes('COMPOSER.seatOk[options.name] = true;'));
ok('重试只补没被收下的槽位', /if \(!COMPOSER\.seatOk\['conversation\.input\.right'\]\)[\s\S]{0,200}if \(!COMPOSER\.seatOk\['conversation\.composer\.dock'\]\)/.test(APP));
ok('两个槽位都收下后停止重试', APP.includes('if (seatBothSeated()) return;'));

// ── ⑥ 时辰未知时，八字与人生 K 线都要灰掉钟点 ──
ok('钟点输入对 trend 也禁用', /disabled: hourUnknown && \(tab === 'bazi' \|\| tab === 'trend'\)/.test(APP));
