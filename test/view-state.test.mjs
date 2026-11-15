// 重绘不丢现场：折叠区、手拨的显示开关、滚动位置。
//
// paint() 换掉整个 #out。DOM 里那些「用户拨出来的状态」会跟着没：展开的折叠区
// 合上、手拨的开关回到 HTML 默认（改个询问方向，刚调好的简洁预设复位成标准）、
// 滚动跳回结果区顶上。这些是重绘的副作用，不是数据变化。
import { ok, eq } from './_harness.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');
const src = fs.readFileSync(path.join(root, 'src', 'web-ui.js'), 'utf8');

// ── 一、源码：两张函数在，且摆在 innerHTML 赋值前后 ──────────
ok('有现场快照', /function snapViewState\(\)/.test(src));
ok('有现场恢复', /function restoreViewState\(s\)/.test(src));

const iSnap = src.indexOf('const viewState = snapViewState();');
const iWrite = src.indexOf("el('out').innerHTML = window.__MPCompose.composeResult(");
const iRestore = src.indexOf('restoreViewState(viewState);');
ok('快照在写入前', iSnap > 0 && iSnap < iWrite);
ok('恢复在写入后', iRestore > iWrite);
ok('每次 paint 都做', (src.match(/const viewState = snapViewState\(\);/g) || []).length === 1);

// ── 二、拉出两个函数真跑一遍（假 DOM，够用就行）────────────
const fnStart = src.indexOf('function snapViewState()');
const fnEnd = src.indexOf('function paint()');
const code = src.slice(fnStart, fnEnd);
ok('截到了两个函数', /function snapViewState/.test(code) && /function restoreViewState/.test(code));

function fakeOut(details, boxes, presetBtns) {
  return {
    querySelectorAll(sel) {
      if (sel === 'details') return details;
      if (sel === 'input[type=checkbox]') return boxes;
      if (sel === '[data-pp-preset]') return presetBtns;
      return [];
    },
    querySelector(sel) {
      if (sel === '#' + 'x') return null;
      const id = sel.replace(/^#/, '');
      return boxes.find((b) => b.id === id) || null;
    }
  };
}
function makeBox(id, checked) {
  return { id, checked };
}
function makeDet(id, open) {
  return { id, open };
}
function makeBtn(name) {
  const cls = new Set();
  return {
    dataset: { ppPreset: name },
    getAttribute: (k) => (k === 'data-pp-preset' ? name : null),
    classList: { toggle: (c, on) => { if (on) cls.add(c); else cls.delete(c); } },
    has: () => cls.has('on')
  };
}

function build(out, PP) {
  const el = () => out;
  const win = { scrollY: 0, scrollTo: (x, y) => { win.scrollY = y; }, __PP: PP || null };
  const fn = new Function('el', 'window', code + '; return { snapViewState, restoreViewState };');
  return { api: fn(el, win), win };
}

// ── 三、快照记什么 ─────────────────────────────────────────
{
  const details = [makeDet('a', true), makeDet('', false), makeDet('b', true)];
  const boxes = [makeBox('k1', true), makeBox('k2', false), makeBox('', true)];
  const { api, win } = build(fakeOut(details, boxes, []), null);
  win.scrollY = 640;
  const s = api.snapViewState();
  eq('只记打开的折叠区', s.det.join(','), 'a,b');
  eq('没 id 的折叠区用序号兜底', s.det.indexOf('#1') < 0, true);
  eq('只记勾上的开关', s.chk.join(','), 'k1');
  eq('没 id 的 checkbox 不记', s.chk.length, 1);
  eq('记了滚动位置', s.y, 640);
}

// ── 四、恢复：折叠区与开关按快照回填，不在表里的不勾 ────────
{
  const details = [makeDet('a', false), makeDet('b', false), makeDet('c', false)];
  const boxes = [makeBox('k1', false), makeBox('k2', true), makeBox('k3', false)];
  const btns = [makeBtn('simple'), makeBtn('std'), makeBtn('expert')];
  const { api } = build(fakeOut(details, boxes, btns), {
    DISP_ALL: ['k1', 'k2', 'k3'], DISP_PRESETS: { simple: ['k1'], std: ['k1', 'k2'] }
  });
  api.restoreViewState({ det: ['a', 'c'], chk: ['k1', 'k3'], y: 0 });
  eq('折叠区按快照打开', details.map((d) => d.open).join(','), 'true,false,true');
  eq('开关按快照回填', boxes.map((b) => b.checked).join(','), 'true,false,true');
  ok('三档都对不上时不高亮任何一个', btns.every((b) => !b.has('on')), '亮着的是 ' + btns.filter((b) => b.has('on')).map((b) => b.dataset.ppPreset).join(','));
}

// ── 五、完全匹配某一档时才高亮 ─────────────────────────────
{
  const boxes = [makeBox('k1', true), makeBox('k2', true)];
  const btns = [makeBtn('simple'), makeBtn('std')];
  const { api } = build(fakeOut([], boxes, btns), {
    DISP_ALL: ['k1', 'k2'], DISP_PRESETS: { simple: ['k1'], std: ['k1', 'k2'] }
  });
  api.restoreViewState({ det: [], chk: ['k1', 'k2'], y: 0 });
  ok('对上「标准」就亮标准', btns[1].has('on'));
  ok('不对「简洁」就不亮', !btns[0].has('on'));
}

// ── 六、滚动只在有值时才动 ────────────────────────────────
{
  const { api, win } = build(fakeOut([], [], []), { DISP_ALL: [], DISP_PRESETS: {} });
  win.scrollY = 0;
  let called = false;
  const orig = win.scrollTo;
  win.scrollTo = (x, y) => { called = true; orig(x, y); };
  api.restoreViewState({ det: [], chk: [], y: 0 });
  ok('快照里 y=0 时不去滚', !called);
  api.restoreViewState({ det: [], chk: [], y: 320 });
  ok('快照里有位置就滚回去', called && win.scrollY === 320);
}

// ── 七、没有 out 时不炸（初始化阶段 paint 早于 DOM）──────────
{
  const fn = new Function('el', 'window', code + '; return { snapViewState, restoreViewState };');
  const api = fn(() => null, { scrollY: 0, scrollTo: () => {} });
  eq('没有容器时快照返回 null', api.snapViewState(), null);
  ok('没有容器时恢复不抛', (() => { try { api.restoreViewState({ det: ['a'], chk: [], y: 0 }); return true; } catch (e) { return false; } })());
}
