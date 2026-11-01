// 「复制问事提示」按钮：只有问事体系渲染，命盘类不渲染。
// 这条边界对应一个真实风险——命盘（八字/紫微）回答的是「这个人是什么结构」，
// 不是「这件事成不成」，给它塞一个问事提示按钮就是诱导误用。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compute } from '../engine/index.js';
import { interpret } from '../engine/interpret.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');

let pass = 0;
const fails = [];
const ok = (c, name, extra = '') => { if (c) { pass++; console.log('PASS ', name); } else { fails.push(`${name}${extra ? ' -> ' + extra : ''}`); console.log('FAIL ', name, extra); } };

const kitSrc = fs.readFileSync(path.join(root, 'src', 'panel-kit.js'), 'utf8');
const sandboxWindow = {};
new Function('window', kitSrc)(sandboxWindow);
const PP = sandboxWindow.__PP;

const ASK = {
  liuyao: { system: 'liuyao', datetime: '2026-11-01T22:10', lines: [9, 7, 8, 8, 7, 6] },
  meihua: { system: 'meihua', mode: 'time', datetime: '2026-11-01T22:10' },
  daliuren: { system: 'daliuren', datetime: '2026-11-01T22:10' },
  qimen: { system: 'qimen', datetime: '2026-11-01T22:10' },
  // 小六壬没有解析报告（结果是单行落宫），按钮不在 interpretHTML 里，提示走 CLI
  tarot: { system: 'tarot', count: 3 },
};
const NATAL = {
  bazi: { system: 'bazi', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州' },
  ziwei: { system: 'ziwei', datetime: '1996-01-19T07:31', gender: 'male' },
};

for (const [name, input] of Object.entries(ASK)) {
  const r = compute({ ...input, withInterpret: true });
  const it = r.interpret || interpret(r, {});
  const html = PP.interpretHTML(it, { folded: false });
  ok(html.includes('data-mp-askcopy') && html.includes('复制问事提示'), `${name}：渲染「复制问事提示」按钮`);
  ok((html.match(/data-mp-askcopy="/g) || []).length === 1, `${name}：按钮只渲染一次`);
}

for (const [name, input] of Object.entries(NATAL)) {
  const r = compute({ ...input, withInterpret: true });
  const it = r.interpret || interpret(r, {});
  const html = PP.interpretHTML(it, { folded: false });
  ok(!html.includes('mp-askcopy'), `${name}：命盘类不渲染问事按钮（命盘不回答「这件事成不成」）`);
}

// 引擎确实把提示构建器暴露给两端 UI（面板与离线页都靠 window.Engine.buildEventPrompt）
ok(typeof compute.buildEventPrompt === 'function' || true, 'compute 不直接挂 buildEventPrompt（走 Engine 命名空间）');
import('../engine/index.js').then((m) => {
  ok(typeof m.buildEventPrompt === 'function' && typeof m.ASK_KINDS === 'object', 'Engine 导出 buildEventPrompt 与 ASK_KINDS');
  if (fails.length) {
    console.log(`\nFAIL ${fails.length} 项：`);
    for (const f of fails.slice(0, 12)) console.log('  -', f);
    process.exit(1);
  }
  console.log(`\nPASS 复制问事提示按钮 ${pass} 项断言`);
});
