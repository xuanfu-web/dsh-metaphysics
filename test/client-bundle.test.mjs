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
ok('client.js gzip 预算 < 100KB（引擎已拆到分块）', gzipSize < 100 * 1024, `${Math.round(gzipSize / 1024)}KB`);

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
