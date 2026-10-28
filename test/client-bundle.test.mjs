// 校验 client.js 的模块拼接与源码引擎等价
import vm from 'node:vm';
import { assemble } from '../tools/build-client.mjs';
import * as srcEngine from '../engine/index.js';

const ok = (label, cond, extra = '') =>
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${label}${extra ? '  -> ' + extra : ''}`);

// 1) 正式产物：factory 能执行，apply 注册两个槽
const clientCode = (await import('node:fs')).readFileSync(
  new URL('../client.js', import.meta.url), 'utf8',
);
let captured = null;
const sandbox = {
  window: { __ModuleLoader__: { load: (m) => { captured = m; } } },
  console,
};
vm.runInNewContext(clientCode, sandbox, { filename: 'client.js' });
const pkgName = JSON.parse(
  (await import('node:fs')).readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
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
ok('注册了三个槽（侧栏 + 主面板 + 对话桥）', registered.length === 3, String(registered.length));
ok('sidebar.panellist 已注册', registered.some((r) => r.opts.name === 'sidebar.panellist' && r.opts.id === 'metaphysics'));
ok('main 面板 key=metaphysics', registered.some((r) => r.opts.name === 'main' && r.opts.key === 'metaphysics'));
ok('对话桥挂在 conversation.input.right 上', registered.some((r) => r.opts.name === 'conversation.input.right' && r.opts.id === 'metaphysics-ask'));
ok('三个组件都是函数', registered.every((r) => typeof r.comp === 'function'));

// 1b) 「问进对话」这条链在源码里必须完整：生成提问 → 写草稿 → 走正常回车路径
const appSrc = (await import('node:fs')).readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
ok('面板用 Engine.askPrompt 组装提问', appSrc.includes('Engine.askPrompt('));
ok('桥从 slot props 取 inputActions', /props && props\.inputActions/.test(appSrc));
ok('写草稿用 setDraft', appSrc.includes('ia.setDraft('));
ok('提交走输入框正常路径 submit', appSrc.includes('ia.submit()'));
ok('桥不可用时退回复制', appSrc.includes('对话输入框还没就绪'));

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
