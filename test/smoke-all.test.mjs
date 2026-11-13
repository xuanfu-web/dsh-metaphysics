// 全体系冒烟：19 个 tab × 关键选项 × 边界输入，把「排盘 → 渲染 → 文本」三条链各跑一遍。
//
// 为什么单独一个文件：单测各自盯一块，但整页能出结果的路径有几十条，一条崩了就是白屏。
// 上次「时辰未知」崩在 p.stemTenGod，就是引擎 6253 条断言全绿、页面全崩。
// 这里不判对错，只判五件事：
//   1. 不抛异常；2. 成品里不留 undefined / NaN / null / [object Object]；
//   3. 重复渲染字节一致（防状态泄漏、防偷偷用 Date.now）；4. 关键结构都在；
//   5. 参数错误必须是带错误码的中文人话，不能漏出 TypeError。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compute, renderText, interpret, encodeHandle, decodeHandle } from '../engine/index.js';
import { ok } from './_harness.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sandboxWindow = {};
new Function('window', fs.readFileSync(path.join(root, 'src', 'panel-kit.js'), 'utf8'))(sandboxWindow);
const PP = sandboxWindow.__PP;

const Q = '下周三之前这件事能不能成';
const CASES = [
  // ── 命盘类 ──
  { name: '八字·完整', system: 'bazi', args: { datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州' }, render: 'baziHTML', must: ['四柱', '日主'] },
  { name: '八字·时辰未知', system: 'bazi', args: { datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州', hourUnknown: true }, render: 'baziHTML', must: ['时柱暂缺'] },
  { name: '八字·女命', system: 'bazi', args: { datetime: '1996-12-14T08:00', gender: 'female', address: '河北石家庄' }, render: 'baziHTML' },
  { name: '八字·晚子时', system: 'bazi', args: { datetime: '1996-01-19T23:40', gender: 'male', lateZi: true }, render: 'baziHTML' },
  { name: '八字·关真太阳时', system: 'bazi', args: { datetime: '1996-01-19T07:31', gender: 'male', trueSolar: false }, render: 'baziHTML' },
  { name: '八字·无出生地', system: 'bazi', args: { datetime: '1996-01-19T07:31', gender: 'male' }, render: 'baziHTML', sum: ['未提供出生地'] },
  { name: '八字·海外负经度', system: 'bazi', args: { datetime: '1996-01-19T07:31', gender: 'male', longitude: -74 }, render: 'baziHTML' },
  { name: '紫微·完整', system: 'ziwei', args: { datetime: '1996-01-19T07:31', gender: 'female' }, render: 'ziweiHTML', must: ['命宫'] },
  { name: '紫微·闰月', system: 'ziwei', args: { datetime: '2020-05-23T10:00', gender: 'male', leapMonth: true }, render: 'ziweiHTML' },
  { name: '趋势', system: 'trend', args: { datetime: '1996-01-19T07:31', gender: 'male', toAge: 80 }, render: 'trendHTML' },
  { name: '趋势·时辰未知', system: 'trend', args: { datetime: '1996-01-19T07:31', gender: 'male', hourUnknown: true }, render: 'trendHTML' },
  { name: '合盘·八字', system: 'hepan', args: { datetime: '1996-01-19T07:31', gender: 'male', partner: { datetime: '1994-03-05T10:00', gender: 'female' } }, render: 'hepanHTML' },
  { name: '合盘·紫微', system: 'hepan', args: { chart: 'ziwei', datetime: '1996-01-19T07:31', gender: 'male', partner: { datetime: '1994-03-05T10:00', gender: 'female' } }, render: 'ziweiHepanHTML' },
  { name: '合盘·三方', system: 'hepan', args: { datetime: '1996-01-19T07:31', gender: 'male', partner: { datetime: '1994-03-05T10:00', gender: 'female' }, partner2: { datetime: '1990-08-08T08:00', gender: 'female' } }, render: 'hepanHTML' },
  // ── 问事类 ──
  { name: '六爻·指定爻', system: 'liuyao', args: { datetime: '2026-11-01T22:10', lines: [9, 7, 8, 8, 7, 6], question: Q, direction: 'career' }, render: 'liuyaoHTML', must: ['世'] },
  { name: '六爻·随机', system: 'liuyao', args: { datetime: '2026-11-01T22:10', question: Q }, render: 'liuyaoHTML' },
  { name: '梅花·时间', system: 'meihua', args: { mode: 'time', datetime: '2026-11-01T22:10', question: Q }, render: 'meihuaHTML' },
  { name: '梅花·数字', system: 'meihua', args: { mode: 'number', upper: 17, lower: 29, changing: 6, question: Q }, render: 'meihuaHTML' },
  { name: '六壬', system: 'daliuren', args: { datetime: '2026-11-01T22:10' }, render: 'daliurenHTML' },
  { name: '奇门·拆补', system: 'qimen', args: { datetime: '2026-11-01T22:10', juMethod: 'chaibu', direction: 'career' }, render: 'qimenHTML', must: ['值符'] },
  { name: '奇门·置闰', system: 'qimen', args: { datetime: '2026-11-01T22:10', juMethod: 'zhirun' }, render: 'qimenHTML' },
  { name: '塔罗·3张', system: 'tarot', args: { count: 3, question: Q }, render: 'tarotHTML' },
  { name: '塔罗·1张', system: 'tarot', args: { count: 1 }, render: 'tarotHTML' },
  { name: '小六壬·时间', system: 'xiaoliuren', args: { datetime: '2026-11-01T22:10' }, render: 'quickHTML' },
  { name: '小六壬·报数', system: 'xiaoliuren', args: { mode: 'number', num1: 3, num2: 5, num3: 7 }, render: 'quickHTML' },
  // ── 速查类 ──
  { name: '黄历', system: 'almanac', args: { datetime: '2026-11-02T10:00' }, render: 'almanacHTML', must: ['宜'] },
  { name: '择日·区间', system: 'zeri', args: { startDate: '2026-11-03', task: '开业', days: 10 }, render: 'zeriHTML' },
  { name: '择日·候选', system: 'zeri', args: { candidates: ['2026-12-01', '2026-12-08'], task: '嫁娶' }, render: 'zeriHTML' },
  { name: '称骨（引擎级渲染，入口已并入八字卡）', system: 'chenggu', args: { datetime: '1996-01-19T07:31' }, render: 'chengguHTML' },
  { name: '农历互转', system: 'convert', args: { mode: 'solar2lunar', datetime: '1996-01-19T07:31' }, render: 'quickHTML' },
  { name: '星座', system: 'star', args: { datetime: '1996-01-19T07:31' }, render: 'quickHTML' },
  { name: '生命数字', system: 'numerology', args: { datetime: '1996-01-19T07:31' }, render: 'quickHTML' },
  { name: '人格·问卷', system: 'mbti', args: {}, render: 'mbtiHTML' },
  { name: '人格·结果', system: 'mbti', args: { answers: Array.from({ length: 24 }, (_, i) => (i % 5) + 1) }, render: 'mbtiHTML' },
  { name: '风水·命卦', system: 'fengshui', args: { action: 'natal', datetime: '1996-01-19T07:31', gender: 'male' }, render: 'fengshuiHTML' },
  { name: '风水·门主灶', system: 'fengshui', args: { action: 'advise', sitting: '子', facing: '午' }, render: 'fengshuiHTML' },
  { name: '起名·评估', system: 'name', args: { action: 'assess', surname: '李', givenName: '明轩', datetime: '2024-05-20T09:00' }, render: 'nameHTML' },
  { name: '起名·生成', system: 'name', args: { action: 'generate', surname: '李', datetime: '2024-05-20T09:00', limit: 5 }, render: 'nameHTML' },
];

// 成品里不该出现的脏串；「填 null」是人格问卷的说明文字（JSON 里跳过某题的合法写法）
const DIRTY = [/\bundefined\b/, /\bNaN\b/, /\bnull\b/, /\[object Object\]/];
const ALLOW = [/data-[\w-]+="undefined"/, /填 null/];
const dirty = (text) => {
  if (ALLOW.some((a) => a.test(text))) {
    // 逐个剔除白名单片段后再判定，避免整段被放过
    return DIRTY.find((re) => re.test(String(text).replace(/填 null/g, '').replace(/data-[\w-]+="undefined"/g, '')));
  }
  return DIRTY.find((re) => re.test(text));
};

for (const c of CASES) {
  let r = null;
  let err = null;
  try {
    r = compute({ system: c.system, ...c.args, withInterpret: true });
  } catch (e) { err = e; }
  ok(`${c.name} · 排盘`, !err && r && r.summary, err ? err.message : '');
  if (err || !r) continue;

  // 文本
  let text = '';
  try { text = renderText(r); } catch (e) { text = 'ERR:' + e.message; }
  ok(`${c.name} · 文本`, !text.startsWith('ERR:') && text.length > 20 && !dirty(text), text.slice(0, 80));

  // 渲染（跑两遍，必须字节一致）
  let html = '';
  let html2 = '';
  try { html = PP[c.render](r); html2 = PP[c.render](r); } catch (e) { html = 'ERR:' + e.message; }
  ok(`${c.name} · 渲染`, !html.startsWith('ERR:') && html.length > 50, html.slice(0, 80));
  ok(`${c.name} · 渲染稳定`, html === html2, '两次渲染不一致（有状态泄漏或用了当前时间）');
  ok(`${c.name} · 无脏串`, !dirty(html), String(dirty(html) || ''));
  ok(`${c.name} · 无脚本`, !/<script|onerror\s*=/i.test(html), '');
  for (const kw of c.must || []) ok(`${c.name} · 含「${kw}」`, html.includes(kw), '');

  // 解析层
  const it = r.interpret;
  if (it) {
    ok(`${c.name} · 解析无错`, !it.error, it.error || '');
    let ih = '';
    try { ih = PP.interpretHTML(it, { folded: false }); } catch (e) { ih = 'ERR:' + e.message; }
    ok(`${c.name} · 解析可渲染`, !ih.startsWith('ERR:') && !/解析生成失败/.test(ih), ih.slice(0, 60));
  }
}

// ── 边界日期：跨时区切换、闰日、世纪末 ───────────────────
for (const dt of ['1900-01-01T00:30', '1929-01-01T00:30', '2024-02-29T23:30', '2100-12-31T12:00']) {
  let err = null;
  let r = null;
  try { r = compute({ system: 'bazi', datetime: dt, gender: 'male' }); } catch (e) { err = e; }
  ok(`边界日期 ${dt}`, !err && r && r.summary, err ? err.message : '');
  if (r) {
    ok(`边界日期 ${dt} · 渲染`, (() => { try { return PP.baziHTML(r).length > 100; } catch (e) { return false; } })(), '');
  }
}

// ── 立春前后：年柱必须换（这是最常错的一处）──────────────
{
  const before = compute({ system: 'bazi', datetime: '1996-02-04T08:00', gender: 'male' });
  const after = compute({ system: 'bazi', datetime: '1996-02-05T08:00', gender: 'male' });
  ok('立春前后年柱不同', before.pillars.year.ganzhi !== after.pillars.year.ganzhi,
    `${before.pillars.year.ganzhi} / ${after.pillars.year.ganzhi}`);
}

// ── 23:00 晚子时边界：开关必须真的改变日柱 ───────────────
{
  const a = compute({ system: 'bazi', datetime: '1996-01-19T23:30', gender: 'male', lateZi: true });
  const b = compute({ system: 'bazi', datetime: '1996-01-19T23:30', gender: 'male', lateZi: false });
  ok('晚子时开关改变日柱', a.pillars.day.ganzhi !== b.pillars.day.ganzhi,
    `${a.pillars.day.ganzhi} / ${b.pillars.day.ganzhi}`);
}

// ── 时辰未知：三柱必须与完整盘一致 ───────────────────────
{
  const full = compute({ system: 'bazi', datetime: '1996-01-19T07:31', gender: 'male' });
  const three = compute({ system: 'bazi', datetime: '1996-01-19T07:31', gender: 'male', hourUnknown: true });
  ok('三柱与完整盘一致',
    ['year', 'month', 'day'].every((k) => full.pillars[k].ganzhi === three.pillars[k].ganzhi),
    '');
  ok('三柱盘无时柱', three.pillars.hour === null, '');
}

// ── 参数错误：必须带错误码、说人话 ───────────────────────
const BAD = [
  { name: '缺性别', args: { system: 'bazi', datetime: '1996-01-19T07:31' } },
  { name: '性别非法', args: { system: 'bazi', datetime: '1996-01-19T07:31', gender: 'x' } },
  { name: '日期非法', args: { system: 'bazi', datetime: '不是日期', gender: 'male' } },
  { name: '塔罗张数越界', args: { system: 'tarot', count: 7 } },
  { name: '六爻爻值非法', args: { system: 'liuyao', datetime: '2026-11-01T22:10', lines: [1, 2, 3, 4, 5, 6] } },
  { name: '择日缺起算日', args: { system: 'zeri', task: '开业' } },
  { name: '称骨缺时辰', args: { system: 'chenggu', datetime: '1996-01-19' } },
  { name: '合盘缺对方', args: { system: 'hepan', datetime: '1996-01-19T07:31', gender: 'male' } },
  { name: '紫微时辰未知', args: { system: 'ziwei', datetime: '1996-01-19T07:31', gender: 'male', hourUnknown: true } },
  { name: '未知体系', args: { system: '不存在' } },
];
for (const b of BAD) {
  let e = null;
  try { compute(b.args); } catch (x) { e = x; }
  ok(`错误路径 · ${b.name}`, !!e && !!e.code && /[\u4e00-\u9fa5]/.test(String(e.message))
    && String(e.message).length >= 8 && !/undefined|NaN|\[object/.test(String(e.message)),
  e ? `${e.code} ${e.message}` : '没有报错');
}

// ── 随机日期扫一遍：边界月份、闰日、时辰两端 ─────────────
// 不判对错，只判「任何一天都不能把页面搞崩」。用固定种子，失败可复现。
{
  let seed = 20261102;
  const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
  const systems = ['bazi', 'ziwei', 'almanac', 'daliuren', 'qimen', 'trend', 'star', 'numerology'];
  let bad = 0;
  let firstBad = '';
  for (let i = 0; i < 40; i++) {
    const y = 1930 + Math.floor(rnd() * 120);
    const m = 1 + Math.floor(rnd() * 12);
    const d = 1 + Math.floor(rnd() * 28);
    const hh = rnd() < 0.5 ? 0 : 23;
    const mm = rnd() < 0.5 ? 0 : 59;
    const dt = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}T${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
    const sys = systems[i % systems.length];
    try {
      const r = compute({ system: sys, datetime: dt, gender: i % 2 ? 'male' : 'female', toAge: 60 });
      if (!r || !r.summary) throw new Error('没有结果');
    } catch (e) {
      bad += 1;
      if (!firstBad) firstBad = `${sys} ${dt}：${e.message}`;
    }
  }
  ok('随机 40 个日期采样全不崩', bad === 0, firstBad);
}

// ── 交付物自身能解析：把单页里的每段内联脚本过一遍编译器 ──
// 构建产物语法坏了，所有单测都还是绿的（它们跑的是源码），但用户打开就是白屏。
{
  const pagePath = path.join(root, '命理排盘.html');
  let scripts = [];
  try {
    const html = fs.readFileSync(pagePath, 'utf8');
    scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).filter((s) => s.trim());
  } catch (e) { /* 没有这份文件就跳过 */ }
  ok('单页里有内联脚本', scripts.length >= 3, `找到 ${scripts.length} 段`);
  let badIdx = -1;
  let badMsg = '';
  scripts.forEach((src, i) => {
    try { new Function('window', 'document', 'navigator', 'localStorage', src); } catch (e) {
      if (badIdx < 0) { badIdx = i; badMsg = e.message; }
    }
  });
  ok('单页内联脚本全部可解析', badIdx < 0, badIdx < 0 ? '' : `第 ${badIdx} 段：${badMsg}`);
}

// ── 句柄往返：排出的句柄必须能解回同一组参数 ─────────────
{
  const src = { system: 'liuyao', datetime: '2026-11-01T22:10', lines: [9, 7, 8, 8, 7, 6], question: Q };
  const r = compute(src);
  const h = r.handle || encodeHandle({ ...src });
  const back = decodeHandle(h);
  ok('句柄可解回', !!back && back.system === 'liuyao', JSON.stringify(back).slice(0, 80));
  const again = compute({ ...back, withInterpret: false });
  ok('句柄解回后排盘一致', again.ben && again.ben.lines && r.ben && r.ben.lines
    ? JSON.stringify(again.ben.lines) === JSON.stringify(r.ben.lines) : true, '');
}

// ── 交叉验证：八字 × 紫微必须能出对照节 ──────────────────
{
  const r = compute({ system: 'bazi', datetime: '1996-01-19T07:31', gender: 'male', cross: true });
  ok('八字×紫微 交叉有结果', !!r.cross, '');
  const it = r.interpret || interpret(r, {});
  const html = PP.interpretHTML(it, {});
  ok('交叉结果可渲染', !!html && !/解析生成失败/.test(html), '');
}
