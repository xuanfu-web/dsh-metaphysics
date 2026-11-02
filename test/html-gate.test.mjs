// XSS 闸自己的契约：闸必须「该红的红、该绿的绿」。
//
// 为什么要单独立一条：0.59.1 之前 check-html-sinks 一直在 CI 里显示绿色，但它对四类
// 真实写法完全不敏感——`innerHTML = 变量`、`'<b>' + esc(a) + raw`、
// `insertAdjacentHTML('beforeend', html)`、`dangerouslySetInnerHTML`。
// 一个抓不到东西的安全闸比没有闸更危险，因为它买断了「已经有人管了」这件事。
// 这里把四类漏检各写成一个必须报错的样本，再写一批必须放行的写法防它反过来咬人。
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { ok, eq } from './_harness.mjs';

const TOOL = path.resolve(import.meta.dirname, '../tools/check-html-sinks.mjs');

/** 把一段源码写进临时目录，跑闸；返回退出码与合并输出 */
function gateOn(source) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mp-sinks-'));
  try {
    fs.writeFileSync(path.join(dir, 'probe.js'), source, 'utf8');
    const r = spawnSync(process.execPath, [TOOL, dir], { encoding: 'utf8' });
    return { code: r.status, out: `${r.stdout || ''}${r.stderr || ''}` };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

// ── ① 四类漏检：每一类都必须让闸变红 ────────────────────────
const MUST_CATCH = [
  ['漏检1 裸变量赋值', `
    const evil = window.prompt();
    box.innerHTML = evil; // catch-bare-var
  `],
  ['漏检2 一个 esc( 救全条', `
    box.innerHTML = '<b>' + esc(name) + attacker + '</b>'; // catch-mixed
  `],
  ['漏检3 insertAdjacentHTML 的载荷', `
    const rawHtml = e.message;
    box.insertAdjacentHTML('beforeend', rawHtml); // catch-adjacent
  `],
  ['漏检4 React 入口', `
    h('div', { dangerouslySetInnerHTML: { __html: userInput } }); // catch-react
  `],
  ['补刀1 非渲染器的调用（空实参也不算通行证）', `
    box.innerHTML = render(userText); // catch-unknown-call
    box.innerHTML = String(count); // catch-string-coerce
  `],
  ['补刀2 map/join 里的插值没转义', `
    box.innerHTML = list.map((x) => \`<li>\${x}</li>\`).join(''); // catch-map-raw
  `],
];
for (const [label, source] of MUST_CATCH) {
  const tag = /catch-[a-z0-9-]+/.exec(source)[0];
  const r = gateOn(source);
  ok(`${label} → 闸红`, r.code === 1, `退出码 ${r.code}`);
  ok(`${label} → 指名到那一行`, r.out.includes(tag), r.out.split('\n').find((l) => l.includes(tag)) || '（输出里没有这一行）');
}

// ── ② 常见安全写法：闸不许反过来咬人 ────────────────────────
const GREEN = `
  const perfHtml = perfHTML(last.perf);
  const summary = summaryHTML(r);
  box.innerHTML = '';
  box.innerHTML = '<div class="err">固定文本</div>';
  box.innerHTML = baziHTML(data);
  box.innerHTML = window.__PP.ziweiHTML(r) + exportBar() + followupBar();
  box.innerHTML = '<b>' + esc(name) + '</b>';
  box.innerHTML = '<i>' + esc(a) + '</i>' + baziHTML(b);
  box.insertAdjacentHTML('beforeend', perfHtml);
  box.insertAdjacentHTML('beforeend', perfHTML(last.perf));
  box.innerHTML = list.map((x) => \`<li>\${esc(x)}</li>\`).join('');
  box.innerHTML = ok ? detailHTML(x) : '';
  box.innerHTML = (r.kind === 'ziwei' ? ziweiHTML(r) : baziHTML(r)) + caliberHTML(r.caliber);
  box.outerHTML = quickHTML(r);
  h('div', { className: 'mp-card', dangerouslySetInnerHTML: { __html: PP.baziHTML(r) + PP.handleHTML(hd) } });
  h('div', { dangerouslySetInnerHTML: { __html: PP.followupHTML(fx) } });
  box.innerHTML = rawUserText; // html-sink:ok 这一段由上游 esc 过，人工确认
`;
const green = gateOn(GREEN);
eq('安全写法全绿', green.code, 0);
ok('豁免注释生效（rawUserText 不报）', !/rawUserText/.test(green.out) || green.code === 0, green.out.slice(0, 120));

// ── ③ 真实 src/ 必须过闸（这条才是本仓的常态）─────────────────
const real = spawnSync(process.execPath, [TOOL], { encoding: 'utf8', cwd: path.resolve(import.meta.dirname, '..') });
eq('仓库 src/ 通过新闸', real.status, 0);

// ── ④ 单引号也进 esc：属性用单引号包时不再能逃出 ──────────────
// panel-kit.js 里的 esc 是唯一转义入口，直接取它的实现跑一遍
const kit = fs.readFileSync(path.resolve(import.meta.dirname, '../src/panel-kit.js'), 'utf8');
const escLine = kit.split(/\r?\n/).find((l) => l.includes('const esc ='));
ok('esc 定义里带单引号替换', /replace\(\/'\/g, '&#39;'\)/.test(escLine || ''), (escLine || '').trim().slice(0, 90));
ok('esc 仍覆盖 & < > " ', ['&/g', '</g', '>/g', '"/g'].every((p) => (escLine || '').includes(`/${p}`)));
