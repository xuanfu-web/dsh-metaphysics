// 校验 client.js 的模块拼接与源码引擎等价
import fs from 'node:fs';
import vm from 'node:vm';
import zlib from 'node:zlib';
import { assemble } from '../tools/build-client.mjs';
import * as srcEngine from '../engine/index.js';
import { ok } from './_harness.mjs';

// 1) 正式产物：factory 能执行，apply 注册两个槽
const clientCode = fs.readFileSync(
  new URL('../client.js', import.meta.url), 'utf8',
);
let captured = null;
const sandbox = {
  window: { __ModuleLoader__: { load: (m) => { captured = m; } } },
  console,
};
vm.runInNewContext(clientCode, sandbox, { filename: 'client.js' });
const pkgName = JSON.parse(
  fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
).name;
ok('client.js 的模块 id 与包名一致', captured && captured.id === pkgName, `${captured && captured.id} vs ${pkgName}`);

const reactStub = { createElement: () => null, useState: () => [null, () => {}] };
const mod = captured.factory((name) => {
  if (name === 'react') return reactStub;
  throw new Error(`unexpected require: ${name}`);
});
ok('factory 返回 apply', typeof mod.apply === 'function');
ok('只硬依赖 slots（核心服务）', Array.isArray(mod.inject) && mod.inject.length === 1 && mod.inject[0] === 'slots', JSON.stringify(mod.inject));

const registered = [];
const ctx = {
  slots: { register: (opts, comp) => { registered.push({ opts, comp }); return () => {}; } },
};
mod.apply(ctx);
ok('注册了四个槽（侧栏 + 主面板 + 输入框桥 + 输入区探针）', registered.length === 4, String(registered.length));
ok('sidebar.panellist 已注册', registered.some((r) => r.opts.name === 'sidebar.panellist' && r.opts.id === 'metaphysics'));
ok('main 面板 key=metaphysics', registered.some((r) => r.opts.name === 'main' && r.opts.key === 'metaphysics'));
ok('对话桥挂在 conversation.input.right 上', registered.some((r) => r.opts.name === 'conversation.input.right' && r.opts.id === 'metaphysics-ask'));
ok('输入区 dock 另有安静探针座（桥缺席时的退路）', registered.some((r) => r.opts.name === 'conversation.composer.dock' && r.opts.id === 'metaphysics-dock'));
ok('三个组件都是函数', registered.every((r) => typeof r.comp === 'function'));

// 1c) 体积：压缩产物 + gzip 预算（防止退回只剥注释，或悄悄膨胀）
const unminified = assemble();
const gzipSize = zlib.gzipSync(Buffer.from(clientCode, 'utf8')).length;
ok('client.js 已压缩（低于源码 80%）', clientCode.length < unminified.length * 0.8,
  `${Math.round(clientCode.length / 1024)}KB / 源 ${Math.round(unminified.length / 1024)}KB`);
// 上限只在 tools/check-bundle.mjs 写一份（2026-11-12 起）：之前这里写死 108KB、
// CI 判 105KB，超线时会出现「测试绿、CI 红」的两套事实。
const bundleSrc = fs.readFileSync(new URL('../tools/check-bundle.mjs', import.meta.url), 'utf8');
const entCapMatch = /const ENTRY_GZIP_CAP = ([0-9*\s.]+);/.exec(bundleSrc);
if (!entCapMatch) throw new Error('tools/check-bundle.mjs 里找不到 ENTRY_GZIP_CAP');
const ENTRY_GZIP_CAP = Function(`return (${entCapMatch[1]});`)();
ok(`client.js gzip 预算 < ${Math.round(ENTRY_GZIP_CAP / 1024)}KB（引擎已拆到分块）`, gzipSize < ENTRY_GZIP_CAP, `${Math.round(gzipSize / 1024)}KB`);

// 1b) 「问进对话」这条链在源码里必须完整：生成提问 → 写草稿 → 走正常回车路径
const appSrc = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
ok('面板用 Engine.askPrompt 组装提问', appSrc.includes('Engine.askPrompt('));
// 白话底稿必须由面板带进去：只传 r 的话模型拿不到「直答 / 说人话」
ok('面板把解析对象传给 askPrompt', appSrc.includes('interpret: result.it') && appSrc.includes('interpret: LAST.it'));
ok('输入框桥的上一张盘也保留解析对象', appSrc.includes('LAST.it = result.it'));
ok('桥从 slot props 取 inputActions（兼容 actions.input）', appSrc.includes('props.inputActions') && appSrc.includes('props.actions && props.actions.input'));
ok('会话槽位注册套 ctx.effect', appSrc.includes('ctx.effect(run') && appSrc.includes("sessionSeat('conversation.input.right'"));
ok('拿不到 inputActions 时显式说明（不静默）', appSrc.includes('命理·未就绪'));
ok('写草稿用 setDraft', appSrc.includes('ia.setDraft('));
ok('提交走输入框正常路径 submit', appSrc.includes('ia.submit()'));
ok('桥不可用时退回复制', appSrc.includes('对话输入框还没就绪'));

// 1d) slots.inject 契约：callback 必须返回 disposer，否则贡献被宿主判为无效。
// 这是「输入框右侧看不到 chip」的真正根因——旧实现把 inject 包在 ctx.effect(run) 里，
// 而 run 什么都不返回；座位占了、注册不抛错，但组件永远不渲染。
// 这里按宿主真实语义跑一遍：未声明 → 挂起 → 声明后重放，检查 callback 的返回值类型。
{
  const captured2 = [];
  const declared = new Set();
  const pending = [];
  const verdicts = [];
  // 关键：这里的 slots.inject 必须**完整实现契约**——把 callback 的返回值收下来判定。
  // 只写 `inject(k, cb){ cb() }` 会让断言测空气：无论 callback 返回什么都不影响结果。
  const slotsFacade = {
    spec: () => ({ kind: 'list', scope: 'session' }),
    register: (opts) => { captured2.push(opts.name); return () => {}; },
    inject(key, callback) {
      const fire = () => {
        let ret;
        try { ret = callback(); } catch (e) { verdicts.push([key, 'threw:' + e.message]); return; }
        verdicts.push([key, typeof ret]);
      };
      if (declared.has(key)) fire();
      else pending.push({ key, fire });
      // inject 自身返回「取消等待」的 disposer，与 callback 的返回值是两回事——
      // 旧断言把两者混为一谈，所以回退成 undefined 也照样绿。
      return () => {};
    },
  };
  const slotsCtx = {
    slots: slotsFacade,
    get: (n) => (n === 'slots' ? slotsFacade : null),
    effect: (fn) => { fn(); return () => {}; },
    tools: { register: () => () => {} },
    logger: { warn() {}, info() {}, error() {} },
  };
  // 用一个能接受 useEffect 的 React stub（旧 stub 的 useEffect 是 undefined 会抛）
  const fullReact = {
    createElement: () => null,
    useState: (v) => [typeof v === 'function' ? v() : v, () => {}],
    useEffect: () => {},
    useRef: (v) => ({ current: v }),
    useMemo: (f) => f(),
    useCallback: (f) => f,
    Fragment: 'F',
  };
  const mod2 = captured.factory((name) => {
    if (name === 'react') return fullReact;
    throw new Error(`unexpected require: ${name}`);
  });
  // 屏蔽样式注入：Node 里没有 document，但那不是本段要测的东西
  const savedDoc = globalThis.document;
  globalThis.document = {
    createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }),
    head: { appendChild() {} },
    documentElement: { setAttribute() {} },
    addEventListener() {},
  };
  try {
    mod2.apply(slotsCtx);
    // 模拟「用户打开会话」：宿主在此时声明会话槽位并重放
    for (const k of ['sidebar.panellist', 'main', 'conversation.input.right', 'conversation.composer.dock']) {
      declared.add(k);
    }
    for (const p of pending.slice()) p.fire();
  } finally {
    if (savedDoc === undefined) delete globalThis.document;
    else globalThis.document = savedDoc;
  }
  ok('四个座位的 inject 回调都被宿主执行过', verdicts.length === 4, JSON.stringify(verdicts.map((v) => v[0])));
  const invalid = verdicts.filter(([, t]) => t !== 'function');
  ok('每个 inject 回调都返回 disposer（否则宿主判贡献无效、组件永不渲染）',
    invalid.length === 0, invalid.map(([k, t]) => `${k}=${t}`).join(' | '));
  ok('对话桥两个座位都在被执行的清单里',
    verdicts.some(([k]) => k === 'conversation.input.right') && verdicts.some(([k]) => k === 'conversation.composer.dock'));
}

// 1e) 同一个槽位不许被同一个 id 注册两次。
// 这是「座位占了、chip 却看不到」的直接原因：sessionSeat 走 inject 挂起路径时
// tryReg 还没执行、seatOk 还是空的，几秒后的补注册就用同一个 id 再注册一次；
// 宿主对同 id 要么抛错要么覆盖，都会把先落地的那份挤掉。
// `conversation.input.right` 是 list 槽，换新 id 补注册还会在输入条上长出多个同款 chip。
{
  const registerCalls = [];
  const declared = new Set();
  const pending = [];
  const slotsFacade = {
    spec: () => ({ kind: 'list', scope: 'session' }),
    register(options) {
      if (!declared.has(options.name)) throw new Error(`slot "${options.name}" is not declared`);
      registerCalls.push({ name: options.name, id: options.id });
      return () => {};
    },
    inject(key, callback) {
      if (declared.has(key)) callback();
      else pending.push({ key, fire: callback });
      return () => {};
    },
  };
  const slotsCtx = {
    slots: slotsFacade,
    get: (n) => (n === 'slots' ? slotsFacade : null),
    effect: (fn) => { fn(); return () => {}; },
    tools: { register: () => () => {} },
    logger: { warn() {}, info() {}, error() {} },
  };
  const fullReact = {
    createElement: () => null,
    useState: (v) => [typeof v === 'function' ? v() : v, () => {}],
    useEffect: () => {}, useRef: (v) => ({ current: v }),
    useMemo: (f) => f(), useCallback: (f) => f, Fragment: 'F',
  };
  const mod3 = captured.factory((name) => {
    if (name === 'react') return fullReact;
    throw new Error(`unexpected require: ${name}`);
  });
  const savedDoc = globalThis.document;
  globalThis.document = {
    createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }),
    head: { appendChild() {} },
    documentElement: { setAttribute() {} },
    addEventListener() {},
  };
  try {
    mod3.apply(slotsCtx);
    // 槽位已声明 → inject 同步执行 callback → 各注册一次
    for (const k of ['sidebar.panellist', 'main', 'conversation.input.right', 'conversation.composer.dock']) declared.add(k);
    for (const p of pending.slice()) p.fire();
    // 模拟 700ms 后的补注册轮（旧实现会在这里用同 id 再注册一遍）
    await new Promise((r) => setTimeout(r, 900));
  } finally {
    if (savedDoc === undefined) delete globalThis.document;
    else globalThis.document = savedDoc;
  }
  const askCalls = registerCalls.filter((c) => c.name === 'conversation.input.right');
  ok('input.right 只注册一次（补注册不撞车）', askCalls.length === 1,
    `实际 ${askCalls.length} 次：${askCalls.map((c) => c.id).join(',')}`);
  const dockCalls = registerCalls.filter((c) => c.name === 'conversation.composer.dock');
  ok('composer.dock 只注册一次', dockCalls.length === 1,
    `实际 ${dockCalls.length} 次：${dockCalls.map((c) => c.id).join(',')}`);
  const ids = registerCalls.map((c) => `${c.name}#${c.id}`);
  ok('没有任何槽位用同一个 id 注册两次', new Set(ids).size === ids.length, ids.join(' | '));
}

// 1f) 宿主 register 实测返回**对象**而不是函数。
// slots.inject 的 callback 契约要求返回可调用 disposer，直接把对象交回去
// 会让宿主判这次贡献无效——「座位占住了、chip 却永远不显示」就是这么来的。
// 这条断言把 register 的返回值钉成对象形态，测 asDisposer 的归一化。
{
  const verdicts = [];
  const declared = new Set();
  const pending = [];
  const slotsFacade = {
    spec: () => ({ kind: 'list', scope: 'session' }),
    // 真实宿主返回的是对象（不是函数）。归一化必然经手这里。
    register: () => ({ dispose() {}, id: 'handle' }),
    inject(key, callback) {
      const fire = () => {
        let ret;
        try { ret = callback(); } catch (e) { verdicts.push([key, 'threw:' + e.message]); return; }
        verdicts.push([key, typeof ret]);
      };
      if (declared.has(key)) fire();
      else pending.push({ key, fire });
      return () => {};
    },
  };
  const slotsCtx = {
    slots: slotsFacade,
    get: (n) => (n === 'slots' ? slotsFacade : null),
    effect: (fn) => { fn(); return () => {}; },
    tools: { register: () => () => {} },
    logger: { warn() {}, info() {}, error() {} },
  };
  const fullReact = {
    createElement: () => null,
    useState: (v) => [typeof v === 'function' ? v() : v, () => {}],
    useEffect: () => {}, useRef: (v) => ({ current: v }),
    useMemo: (f) => f(), useCallback: (f) => f, Fragment: 'F',
  };
  const mod4 = captured.factory((name) => {
    if (name === 'react') return fullReact;
    throw new Error(`unexpected require: ${name}`);
  });
  const savedDoc = globalThis.document;
  globalThis.document = {
    createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }),
    head: { appendChild() {} },
    documentElement: { setAttribute() {} },
    addEventListener() {},
  };
  try {
    mod4.apply(slotsCtx);
    for (const k of ['sidebar.panellist', 'main', 'conversation.input.right', 'conversation.composer.dock']) declared.add(k);
    for (const p of pending.slice()) p.fire();
  } finally {
    if (savedDoc === undefined) delete globalThis.document;
    else globalThis.document = savedDoc;
  }
  const bad = verdicts.filter(([, t]) => t !== 'function');
  ok('register 返回对象时，四个座位仍返回可调用 disposer', bad.length === 0,
    bad.map(([k, t]) => `${k}→${t}`).join(' | ') || '全部可调用');
  ok('对话桥两个座位在对象形态下也可调用',
    verdicts.filter(([k]) => k === 'conversation.input.right' || k === 'conversation.composer.dock')
      .every(([, t]) => t === 'function'),
    JSON.stringify(verdicts.filter(([k]) => k.startsWith('conversation.'))));
}

// 2) 等价性：用同一套拼接逻辑生成带 engine 出口的测试产物
const probe = assemble('return { inject: [], apply() {}, engine: Engine };');
let probeCaptured = null;
vm.runInNewContext(probe, {
  window: { __ModuleLoader__: { load: (m) => { probeCaptured = m; } } },
  console,
}, { filename: 'probe.js' });
const builtEngine = probeCaptured.factory(() => reactStub).engine;
ok('测试产物带出 engine', builtEngine && typeof builtEngine.compute === 'function');

const cases = [
  { system: 'bazi', datetime: '1990-05-12T14:30', gender: 'female', longitude: 116.4 },
  { system: 'bazi', datetime: '2024-02-04T16:30', gender: 'male' },
  { system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'female' },
  { system: 'ziwei', datetime: '2020-06-01T09:20', gender: 'male' },
  { system: 'liuyao', lines: [9, 7, 8, 8, 7, 6], question: 'x' },
];

let same = true;
for (const args of cases) {
  const a = JSON.stringify(srcEngine.compute(args));
  const b = JSON.stringify(builtEngine.compute(args));
  if (a !== b) {
    same = false;
    console.log('  不一致:', args.system, args.datetime || '');
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      if (a[i] !== b[i]) { console.log('  首个差异 @', i, '\n   src:', a.slice(i - 60, i + 80), '\n   bld:', b.slice(i - 60, i + 80)); break; }
    }
  }
}
ok(`拼接产物与源码引擎逐字节一致（${cases.length} 例）`, same);
