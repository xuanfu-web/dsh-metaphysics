// 「所问之事 + 询问方向」联动 + 解读区折叠的测试
// 覆盖：方向表、聚焦维度提前、回显串、向后兼容、面板折叠结构、产物里的表单控件
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compute } from '../engine/index.js';
import { interpret, DIRECTIONS, DIRECTION_DEFAULT, dirOf } from '../engine/interpret.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');

let pass = 0, fail = 0;
const ok = (cond, name, extra = '') => {
  if (cond) { pass++; console.log('PASS ', name); }
  else { fail++; console.log('FAIL ', name, extra); }
};

// ── 1. 方向表 ──────────────────────────────────────────────
const KEYS = DIRECTIONS.map((d) => d.key);
ok(DIRECTIONS.length === 7, `方向共 7 项（实际 ${DIRECTIONS.length}）`);
ok(['general', 'wealth', 'career', 'love', 'health', 'study', 'travel'].every((k) => KEYS.includes(k)),
  '含综合/财运/事业/感情/健康/学业/出行');
ok(DIRECTION_DEFAULT === 'general', '未选择时默认「综合」');
ok(DIRECTIONS[0].dim === null, '「综合」不指定聚焦维度');
ok(DIRECTIONS.filter((d) => d.dim).every((d) => ['overall', 'work', 'career', 'love', 'health'].includes(d.dim)),
  '每个方向的聚焦维度都落在五个固定维度内');
ok(dirOf('nonsense').key === 'general' && dirOf(undefined).key === 'general', '方向取非法值或不传时退回「综合」');
ok(DIRECTIONS.every((d) => d.label && (d.dim === null || d.focus)), '每个方向都有中文名与聚焦引导句');

// ── 2. 四个问事体系的问题/方向联动 ──────────────────────────
const ASK_CASES = {
  liuyao: { system: 'liuyao', datetime: '2026-10-22T14:10', lines: [9, 7, 8, 8, 7, 6] },
  meihua: { system: 'meihua', mode: 'time', datetime: '2026-10-22T14:10' },
  daliuren: { system: 'daliuren', datetime: '2026-10-22T14:10' },
  tarot: { system: 'tarot', count: 3 },
};
const QUESTION = '今年是否适合换工作';
const ORDER = ['overall', 'work', 'career', 'love', 'health'];

for (const [name, args] of Object.entries(ASK_CASES)) {
  const r = compute(args);
  const base = interpret(r);
  const it = interpret(r, { question: QUESTION, direction: 'career' });
  ok(!!base && !!it, `${name}：解析正常生成`);
  ok(base.dimensions.map((d) => d.key).join(',') === ORDER.join(','), `${name}：不传选项时五维度顺序不变`);
  ok(!base.lead.includes('你问的是'), `${name}：不填问题时不出现「你问的是」`);
  ok(it.ask && it.ask.echo === `问题：${QUESTION} ｜ 询问方向：事业`, `${name}：回显串含问题与方向`);
  ok(it.dimensions[0].key === 'career', `${name}：事业方向把「事业发展」提到最前`);
  ok(it.dimensions[0].focused === true, `${name}：聚焦维度带 focused 标记`);
  ok(it.dimensions[0].text.includes(QUESTION) && it.dimensions[0].text.includes('事业'),
    `${name}：聚焦维度正文点明问题与方向`);
  ok(it.lead.includes(QUESTION), `${name}：引语回显所问之事`);
  ok(it.dimensions.length === 5 && it.dimensions.map((d) => d.key).sort().join() === ORDER.slice().sort().join(),
    `${name}：五维度不增不减，只是换了顺序`);
  ok(!/一定|必然|注定|肯定会|绝对/.test(it.dimensions.map((d) => d.text + d.advice).join('')),
    `${name}：聚焦后仍无绝对化表述`);
}

// 每个方向都能落到对应维度
const r6 = compute(ASK_CASES.liuyao);
const EXPECT = { wealth: 'work', career: 'career', love: 'love', health: 'health', study: 'career', travel: 'overall' };
for (const [dir, dim] of Object.entries(EXPECT)) {
  const it = interpret(r6, { question: QUESTION, direction: dir });
  ok(it.dimensions[0].key === dim, `方向 ${dir} → 聚焦 ${dim}（实际 ${it.dimensions[0].key}）`);
  ok(it.ask.directionLabel === dirOf(dir).label, `方向 ${dir} 的中文名回显正确`);
}
// 综合：不顺位、不聚焦
const gen = interpret(r6, { question: QUESTION, direction: 'general' });
ok(gen.dimensions.map((d) => d.key).join(',') === ORDER.join(','), '选「综合」时维度顺序保持原样');
ok(!gen.dimensions.some((d) => d.focused), '选「综合」时没有聚焦标记');
// 只填方向不填问题
const onlyDir = interpret(r6, { direction: 'love' });
ok(onlyDir.dimensions[0].key === 'love' && onlyDir.ask.question === '', '只选方向也生效，问题为空不误报');
ok(onlyDir.lead.includes('方向是感情'), '只选方向时引语写明方向');
// 命盘类：不问事，不该出现回显
const bz = interpret(compute({ system: 'bazi', datetime: '1996-01-19T07:31', gender: 'male' }));
ok(bz.ask.direction === 'general' && bz.ask.question === '', '命盘类默认无问题、方向为综合');
// 问题超长要截断，避免撑爆面板
const longQ = '问'.repeat(500);
const longIt = interpret(r6, { question: longQ, direction: 'career' });
ok(longIt.ask.question.length === 200, `超长问题截断到 200 字（实际 ${longIt.ask.question.length}）`);

// ── 3. 面板：回显行与折叠结构 ────────────────────────────────
const kitSrc = fs.readFileSync(path.join(root, 'src', 'panel-kit.js'), 'utf8');
globalThis.window = {};
new Function('window', kitSrc)(globalThis.window);
const PP = globalThis.window.__PP;
const it6 = interpret(r6, { question: QUESTION, direction: 'career' });

const openHTML = PP.interpretHTML(it6, { folded: false });
const foldHTML = PP.interpretHTML(it6, { folded: true });
ok(/<button type="button" class="it-head"/.test(openHTML), '标题栏是按钮（整栏可点）');
ok(openHTML.includes('aria-expanded="true"') && foldHTML.includes('aria-expanded="false"'), '折叠状态写进 aria-expanded');
ok(openHTML.includes('class="it"') && foldHTML.includes('class="it folded"'), '收起时根节点带 folded 类');
ok(openHTML.includes('点击收起') && foldHTML.includes('点击展开'), '提示文字随状态切换');
ok(foldHTML.includes('it-arrow') && openHTML.includes('it-arrow'), '标题栏有箭头图标');
ok(openHTML.includes('it-ask') && openHTML.includes('问题：') && openHTML.includes('询问方向：事业'), '回显行含问题与方向');
ok(!PP.interpretHTML(bz, {}).includes('it-ask'), '命盘类不渲染回显行');
ok(PP.interpretHTML(it6, { folded: true }).includes('it-ask'), '收起时回显行仍在结构内（展开即可见）');
ok(openHTML.includes('it-focus') && openHTML.includes('最贴近你的问题'), '聚焦维度带「最贴近你的问题」标记');
ok(PP.resultWithInterpret('<hr>', it6, { folded: true }).startsWith('<hr>'), 'resultWithInterpret 保留盘面在前');
ok(PP.interpretHTML(null) === '' && PP.interpretHTML({ dimensions: [] }) === '', '空解析不渲染模块');
ok(!/undefined|NaN|\[object/.test(openHTML), '面板输出无 undefined / NaN');

// ── 4. 产物：表单控件与校验 ─────────────────────────────────
const html = fs.readFileSync(path.join(root, '..', '命理排盘.html'), 'utf8');
ok(/<textarea id="question" rows="2"/.test(html), '产物含多行文本的问题输入框');
ok(html.includes('placeholder="用一句话描述所问之事，例如：今年是否适合换工作？"'), '问题框带示例 placeholder');
ok(/<select id="direction">/.test(html), '产物含询问方向下拉');
ok((html.match(/<option value="(general|wealth|career|love|health|study|travel)"/g) || []).length === 7, '下拉含 7 个方向选项');
ok(/<option value="general" selected/.test(html), '默认选中「综合」');
ok(html.includes('id="for-ask"'), '问事字段组存在');
ok(html.includes('请先填写「所问之事」'), '含必填校验提示文案');
ok(html.includes('所问之事（必填）'), '问题框标注必填');
const ui = fs.readFileSync(path.join(root, 'src', 'web-ui.js'), 'utf8');
ok(ui.includes("NEED_ASK = { liuyao: true, meihua: true, daliuren: true, tarot: true }"), '四个问事体系都会要求填问题');
ok(/foldPref/.test(ui) && /classList.toggle\('folded'/.test(ui), '折叠交互已接入');
const app = fs.readFileSync(path.join(root, 'src', 'app.js'), 'utf8');
ok(app.includes('所问之事（必填）') && app.includes('mp-dir'), '侧栏面板同样有这两项控件');
ok(/onFoldClick/.test(app) && /folded: defaultFolded\(\)/.test(app), '侧栏面板同样支持折叠');
ok(!app.includes("args.question = '手动起卦'"), '六爻不再写死提问文案');

console.log(`\n———— ${pass} PASS / ${fail} FAIL ————`);
process.exit(fail ? 1 : 0);
