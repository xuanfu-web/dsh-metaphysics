// 报告顶部的「数 / 象 / 辞」三层导读。
//
// 这一段的价值不在文采，在于它把「哪层可复核、哪层是命名、哪层是判断」讲在用户
// 划走之前。所以测试盯三件事：三层与三问必须齐（少一层就退化成鸡汤）、不许出现
// 任何效度承诺（它本身就是在说效度未验证）、两套 UI 共用的渲染入口必须真的画出它。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compute } from '../engine/index.js';
import { interpret } from '../engine/interpret.js';
import { GUIDE } from '../engine/guide.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');

let pass = 0;
const fails = [];
const ok = (cond, name, extra = '') => {
  if (cond) { pass++; console.log('PASS ', name); } else { fails.push(`${name}${extra ? ' -> ' + extra : ''}`); console.log('FAIL ', name, extra); }
};
const eq = (a, b, name) => ok(a === b, name, `期望 ${b}，实际 ${a}`);

// ── 一、内容结构 ──────────────────────────────────────────
{
  const keys = (GUIDE.layers || []).map((l) => l.key);
  eq(keys.join(','), 'shu,xiang,ci', '三层按「数 → 象 → 辞」排列');
  ok((GUIDE.layers || []).every((l) => l.name && l.sub && l.text && l.hint), '每层都有名、副名、正文、落点提示');
  ok((GUIDE.layers || []).every((l) => l.text.length >= 25), '每层正文不是一句口号（≥25 字）');
  // 三问是这段的可操作性所在，缺一条就只剩「要独立思考」这种空话
  eq((GUIDE.check.items || []).length, 3, '三问齐全');
  ok(GUIDE.check.items.every((q) => /？$/.test(q)), '三问都以问号结尾（是提问，不是结论）');
  ok(/坐标/.test(GUIDE.check.items[0]) && /关系/.test(GUIDE.check.items[1]) && /唯一/.test(GUIDE.check.items[2]),
    '三问分别问坐标 / 关系 / 是否唯一读法');
  eq((GUIDE.parts.rows || []).length, 3, '纳甲 / 十神 / 宫位各一行');
  ok(GUIDE.parts.rows.every((r) => r.length === 2 && r[0] && r[1]), '每行都写了「它到底在干什么」');
  ok(!!GUIDE.closing && GUIDE.closing.length >= 10, '有收尾句');

  // 这段本身是「效度未验证」的说明，出现任何承诺词都是自相矛盾
  const all = JSON.stringify(GUIDE);
  const claimed = (all.match(/一定|必然|绝对|精准|百分百|保证|预测准确/g) || []);
  eq(claimed.length, 0, '不得出现效度承诺词');
  ok(!/不用怀疑|不必怀疑/.test(all), '不鼓励放弃怀疑');
}

// ── 二、成果里带得上（含奇门这条不经正文组装的支路）────────────
{
  const cases = {
    bazi: { system: 'bazi', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州' },
    liuyao: { system: 'liuyao', datetime: '2026-10-22T14:10', lines: [9, 7, 8, 8, 7, 6] },
    qimen: { system: 'qimen', datetime: '2026-10-22T14:10' },
    tarot: { system: 'tarot', count: 3, question: '要不要换工作' },
  };
  for (const [name, input] of Object.entries(cases)) {
    const r = compute({ ...input, withInterpret: true });
    const it = r && r.interpret;
    ok(!!(it && it.guide), `${name}：解析结果带 guide`);
    ok(it && it.guide && it.guide.layers.length === 3, `${name}：guide 是完整三层`);
  }
}

// ── 三、渲染：两套 UI 共用的入口真的画出来了 ─────────────────
const kitSrc = fs.readFileSync(path.join(root, 'src', 'panel-kit.js'), 'utf8');
const sandboxWindow = {};
new Function('window', kitSrc)(sandboxWindow);
const PP = sandboxWindow.__PP;

{
  const r = compute({ system: 'bazi', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州', withInterpret: true });
  const it = r.interpret;
  const html = PP.interpretHTML(it, { folded: false });
  eq((html.match(/class="mp-guide"/g) || []).length, 1, '导读只渲染一次');
  ok(/<details class="mp-guide">/.test(html), '默认收起（details 不带 open）');
  ok(html.includes('数 / 象 / 辞'), '标题旁点明三层');
  // 位置：必须在「一页读懂」之前 —— 结论先入眼就没人再看导读
  const gi = html.indexOf('mp-guide');
  const oi = html.indexOf('mp-outline');
  ok(gi >= 0 && (oi < 0 || gi < oi), '导读排在结论之前');
  // 内容全转义，不引入注入面
  ok(!/<script/i.test(html) && !/onerror=/i.test(html), '渲染结果不含脚本或事件属性');
  // 收起时内容仍在 DOM 里（用户点开即可读，不需要再请求）
  ok(html.includes('数当镜子'), '收起状态也把正文写在结构里');
}

if (fails.length) {
  console.log(`\nFAIL ${fails.length} 项：`);
  for (const f of fails.slice(0, 12)) console.log('  -', f);
  process.exit(1);
}
console.log(`\nPASS 象数导读 ${pass} 项断言`);
