// 0.9.0 新增：十四主星庙旺陷亮度、塔罗牌阵张数可选
import { compute, BRIGHTNESS } from '../engine/index.js';

let pass = 0;
const fails = [];
const eq = (a, b, msg) => {
  if (a === b) pass++;
  else fails.push(`${msg}：期望 ${JSON.stringify(b)}，实际 ${JSON.stringify(a)}`);
};
const ok = (cond, msg) => {
  if (cond) pass++;
  else fails.push(msg);
};

// ── 一、亮度表结构 ──────────────────────────────────────────────
const STARS14 = ['紫微', '天机', '太阳', '武曲', '天同', '廉贞', '天府', '太阴', '贪狼', '巨门', '天相', '天梁', '七杀', '破军'];
const LEVELS = ['庙', '旺', '得', '利', '平', '不', '陷'];

eq(Object.keys(BRIGHTNESS).length, 14, '亮度表覆盖十四主星');
for (const s of STARS14) {
  ok(Array.isArray(BRIGHTNESS[s]), `${s} 有亮度行`);
  eq((BRIGHTNESS[s] || []).length, 12, `${s} 亮度覆盖十二地支`);
  for (const v of BRIGHTNESS[s] || []) ok(LEVELS.includes(v), `${s} 亮度值合法（${v}）`);
}

// ── 二、安星后每颗主星都带合法 brightness ────────────────────────
const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const cases = [
  { system: 'ziwei', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州' },
  { system: 'ziwei', datetime: '2000-06-15T10:00', gender: 'female' },
  { system: 'ziwei', datetime: '1984-11-03T22:20', gender: 'male' },
];
for (const args of cases) {
  const r = compute(args);
  let mains = 0;
  for (const p of r.palaces) {
    for (const s of p.stars) {
      if (s.type !== '主星') continue;
      mains++;
      ok(typeof s.brightness === 'string', `${p.palace}${s.name} 有亮度字段`);
      ok(LEVELS.includes(s.brightness), `${p.palace}${s.name} 亮度值合法（${s.brightness}）`);
      // 与表严格一致：亮度由所在地支决定
      eq(s.brightness, BRIGHTNESS[s.name][BRANCHES.indexOf(p.branch)], `${p.palace}宫${s.name}@${p.branch} 亮度与表一致`);
    }
  }
  eq(mains, 14, `${args.datetime} 十四主星全部上盘`);
}

// ── 三、辅星不标亮度（避免各派差异造假） ────────────────────────
{
  const r = compute(cases[0]);
  let auxWithBr = 0;
  for (const p of r.palaces) for (const s of p.stars) if (s.type !== '主星' && s.brightness) auxWithBr++;
  eq(auxWithBr, 0, '辅星/吉星/煞星不带亮度字段');
}

// ── 四、塔罗牌阵张数 ───────────────────────────────────────────
for (const [n, label] of [[1, '当下指引'], [3, '过去'], [5, '现状']]) {
  const r = compute({ system: 'tarot', count: n, question: '这份工作要不要接' });
  eq(r.cards.length, n, `${n} 张牌阵抽出 ${n} 张`);
  ok(String(r.spread).includes(String(n)), `${n} 张牌阵名含张数（${r.spread}）`);
  ok(String(r.spread).includes(label), `${n} 张牌阵名含牌位（${r.spread}）`);
  // 每张牌都有牌位、正逆位、牌义
  for (const c of r.cards) {
    ok(!!c.positionHint || !!c.name, `${n} 张牌阵每张有牌位信息`);
    ok(c.orientation === '正位' || c.orientation === '逆位', `${n} 张牌阵每张有正逆位`);
  }
}
{
  // 0.14.1 起不再静默回落：不支持的张数明确报错
  let err = null;
  try { compute({ system: 'tarot', count: 7 }); } catch (e) { err = e; }
  ok(!!err && err.code === 'E_COUNT', '不支持的张数（7）明确报错，不再静默回落');
}

// ── 五、渲染层：亮度标记出现在盘面 ──────────────────────────────
{
  const fs = await import('node:fs');
  globalThis.window = globalThis.window || {};
  const kit = fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8');
  new Function('window', kit)(globalThis.window);
  const PP = globalThis.window.__PP;
  const r = compute(cases[0]);
  const html = PP.ziweiHTML(r);
  // 三视图（本命/大限/流年）× 14 主星 = 42 处亮度标记
  // 只统计亮度 <em class="pp-b xxx">，避免误匹配 .pp-body 容器
  eq((html.match(/<em class="pp-b (?:good|mid|bad)">[^<]*<\/em>/g) || []).length, 42, '盘面亮度标记数 = 14 主星 × 3 视图');
  // 顺序断言：亮度在星名后、四化色块前（避免视觉叠压）
  const sample = html.match(/<span class="pp-st main">[^<]*<em class="pp-b[^>]*>[^<]*<\/em><i class="pp-m/g);
  ok(!!sample, '亮度灰字紧贴星名、位于四化色块之前');
}

// ── 六、口径：亮度文案不含绝对化表述 ────────────────────────────
{
  const r = compute(cases[0]);
  const html = String(r.palaces.flatMap((p) => p.stars.map((s) => s.brightness || '')).join(''));
  ok(!/一定|必然|注定|绝对/.test(html), '亮度文案无绝对化词');
}

if (fails.length) {
  console.log(`FAIL ${fails.length} 项：`);
  for (const f of fails.slice(0, 12)) console.log('  -', f);
  process.exit(1);
}
console.log(`PASS 亮度与塔罗张数 ${pass} 项断言`);
