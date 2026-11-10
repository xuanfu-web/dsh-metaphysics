// 0.65.0 新增：文墨式「显示设置」13 项 —— 纯 CSS 显隐，不重排盘、不进引擎 schema。
// 断言这 13 个开关结构完整、默认盘观感不变、目标元素真的可被 CSS 寻址。
import fs from 'node:fs';
import { compute } from '../engine/index.js';

let pass = 0;
const fails = [];
// 每条断言都打一行「PASS  …」：check-assertions 靠 ^PASS 统计条数，
// 只在末尾打「N PASS / 0 FAIL」会被记成 0 条，基线守护就形同虚设。
const eq = (a, b, msg) => { if (a === b) { pass++; console.log('PASS  ' + msg); } else fails.push(`FAIL  ${msg}：期望 ${JSON.stringify(b)}，实际 ${JSON.stringify(a)}`); };
const ok = (c, msg, extra) => { if (c) { pass++; console.log('PASS  ' + msg); } else fails.push('FAIL  ' + msg + (extra ? `（${extra}）` : '')); };

globalThis.window = globalThis.window || {};
const SRC = fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8');
new Function('window', SRC)(globalThis.window);
const PP = globalThis.window.__PP;

// ── 一、13 个复选框与 12 个 label 一一对应 ──────────────────────
const IDS = ['ppm-d-ss', 'ppm-d-sbg', 'ppm-d-zha', 'ppm-d-ages', 'ppm-d-sizhu',
  'ppm-d-small', 'ppm-d-shen', 'ppm-d-hua', 'ppm-d-sf',
  'ppm-d-zha-bold', 'ppm-d-bad-ink', 'ppm-d-bold', 'ppm-d-hs'];
{
  const inputIds = [...SRC.matchAll(/<input type="checkbox" id="(ppm-d-[a-z-]+)" class="pp-r"( checked)?>/g)].map((m) => m[1]);
  eq(inputIds.length, IDS.length, '复选框恰好 13 个');
  eq(inputIds.join(','), IDS.join(','), '13 个 id 与定案清单一致');
  const labelFors = [...SRC.matchAll(/<label for="(ppm-d-[a-z-]+)"><i class="pp-disp-box"><\/i>/g)].map((m) => m[1]);
  eq(labelFors.length, IDS.length, '面板里恰好 13 个可点 label');
  eq(labelFors.join(','), IDS.join(','), '13 个 label 的 for 与复选框一一对应');
  // CSS 里每个 id 都要出现（勾选态 + 显隐/增强规则），不能有只画了 UI 的假开关
  for (const id of IDS) {
    ok(SRC.includes(`#${id}:`), `${id} 在 CSS 里真的接线`, '缺规则');
  }
}

// ── 二、默认盘观感逐字节不变 ─────────────────────────────────────
{
  const html = PP.ziweiHTML(compute({ system: 'ziwei', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州' }));
  const checked = [...SRC.matchAll(/<input type="checkbox" id="(ppm-d-[a-z-]+)" class="pp-r"( checked)?>/g)].filter((m) => m[2]).map((m) => m[1]);
  eq(checked.length, 9, '组1+组2 共 9 项默认勾选');
  eq(checked.join(','), IDS.slice(0, 9).join(','), '后 3 项（限流盘增强）默认不勾');
  // 默认不触发任何隐藏：组1/2 用 :not(:checked)，组3 用 :checked（默认不勾→不生效）
  eq((SRC.match(/:not\(:checked\)~[^{]*\{display:none\}/g) || []).length >= 9, true,
    '9 条隐藏规则都只在取消勾选时生效');
  ok(/#ppm-d-zha-bold:checked~[^}]*stroke-width:2\.8/.test(SRC), '箭头加粗走 :checked（默认不动）');
  ok(/#ppm-d-bad-ink:checked~[^}]*color:var\(--ink\)/.test(SRC), '六煞黑字走 :checked（默认不动）');
  ok(/#ppm-d-bold:checked~[^}]*font-weight:700/.test(SRC), '主辅加粗走 :checked（默认不动）');
  eq((html.match(/id="ppm-d-[a-z-]+"/g) || []).length, 13, '每张盘都渲染 13 个开关');
}

// ── 三、兄弟选择器纪律：复选框必须在 .pp-body 与 .pp-disp 之前 ──
{
  const html = PP.ziweiHTML(compute({ system: 'ziwei', datetime: '1996-01-19T07:31', gender: 'male' }));
  const firstInput = html.indexOf('id="ppm-d-ss"');
  const lastInput = html.indexOf('id="ppm-d-hs"');
  const disp = html.indexOf('<details class="pp-disp">');
  const firstBody = html.indexOf('class="pp-body ben"');
  const zhlegend = html.indexOf('class="pp-zhlegend"');
  ok(firstInput > -1 && disp > lastInput && firstBody > disp,
    '12 个 checkbox → details → 三个 .pp-body 顺序正确（~ 选择器才成立）',
    `input=${firstInput} disp=${disp} body=${firstBody}`);
  ok(zhlegend > firstBody, '.pp-zhlegend 也是后续兄弟（自化箭头开关能藏它）');
  ok(html.indexOf('id="ppm-ben"') < firstInput, '原有的本命/大限/流年 radio 仍在最前');
}

// ── 四、目标元素真的带可寻址标记，且不破坏既有 DOM 断言 ─────────
{
  const r = compute({ system: 'ziwei', datetime: '1996-01-19T07:31', gender: 'male' });
  const before = JSON.stringify(r);
  const html = PP.ziweiHTML(r);
  eq(JSON.stringify(r), before, 'ziweiHTML 是纯渲染，不改排盘数据');
  // 日系四吉星：四颗 × 三视图
  eq((html.match(/class="pp-st good st-sbg"/g) || []).length, 12, '三台/八座/恩光/天贵 4 星 × 3 视图');
  ok(!/class="pp-st main st-sbg"/.test(html), '十四主星不追加 st-sbg（保住 upgrade 顺序断言）');
  eq((html.match(/<span class="pp-st main">/g) || []).length, 42, '14 主星 × 3 视图的 class 串一字未改');
  // 神煞十二神：每宫 4 处（博士/将前/岁前/长生），保留大限区间、干支、宫名
  eq((html.match(/class="pp-ss-txt"/g) || []).length, 144, '12 宫 × 3 视图 × 4 处神煞文字');
  ok(/class="ft-dx"><span class="pp-ss-txt">/.test(html), '博士十二神单独包住，大限区间不被一起藏掉');
  ok(!/class="pp-ss-txt">[^<]*\d+-\d+/.test(html), '大限区间不在 pp-ss-txt 里');
}

// ── 五、每个开关的目标都能被 CSS 命中（不放假开关） ─────────────
{
  const targets = {
    'ppm-d-ss': '.pp-ss-txt', 'ppm-d-sbg': '.pp-st.st-sbg', 'ppm-d-zha': '.pp-zha',
    'ppm-d-ages': '.pp-ages', 'ppm-d-sizhu': '.ct-t3', 'ppm-d-small': '.pp-st.aux',
    'ppm-d-shen': '.pp-shen::after', 'ppm-d-hua': '.pp-m', 'ppm-d-sf': 'svg.pp-sf',
    'ppm-d-zha-bold': '.z-shaft', 'ppm-d-bad-ink': '.pp-st.bad', 'ppm-d-bold': '.pp-st.main', 'ppm-d-hs': '.pp-hs',
  };
  for (const [id, sel] of Object.entries(targets)) {
    const re = new RegExp('#' + id + ':(?:not\\(:checked\\)|checked)~[^}]*' + sel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[^}]*\\{', 'm');
    ok(re.test(SRC), `${id} 的显隐/增强规则命中 ${sel}`);
  }
  // 三方四正开关要同时关掉底纹、联动底色和虚线，不能只藏一条
  eq((SRC.match(/#ppm-d-sf:not\(:checked\)~/g) || []).length, 3, '三方四正开关同时关三处');
}

// ── 六、不碰引擎与工具 schema：这 12 项是纯 UI ───────────────────
{
  const engine = fs.readFileSync(new URL('../engine/ziwei.js', import.meta.url), 'utf8');
  const schema = fs.readFileSync(new URL('../index.js', import.meta.url), 'utf8');
  ok(!/ppm-d-/.test(engine), '引擎里没有显示开关');
  ok(!/ppm-d-/.test(schema), '工具 schema 里没有显示开关（不撑爆参数预算）');
  ok(SRC.includes('纯 CSS 显隐'), 'CSS 段写明设计口径');
}

console.log(`${pass} PASS / ${fails.length} FAIL`);
if (fails.length) { for (const f of fails) console.log('  FAIL ' + f); process.exit(1); }
