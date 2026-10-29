// 紫微「三方四正一起飞的复合飞化」：四宫宫干各出四化，按落宫归堆看会聚
//
// 这一层的全部结论都能从「四化表 + 星曜落宫」重算，所以测试不拿实现自己的中间结果当证据：
//   ① 三方四正四宫取自命宫 +4/+8/+6，顺序与宫位名都独立重推；
//   ② 16 条飞化逐条核：星必须等于独立录入的四化表，落宫必须是那颗星真正所在的宫；
//   ③ 落宫归堆、四类会聚（双忌会 / 禄忌同宫 / 三化会 / 自化）用另一套过滤重算后比对；
//   ④ 60 张盘扫一遍，保证会聚检测不是死规则，且未上盘的星只记星不记落宫；
//   ⑤ 摘要 / 解析 / 白话 / 面板四处可见，旧结果（没有 flyComposite）不炸。
import fs from 'node:fs';
import vm from 'node:vm';
import { buildZiwei, flyComposite } from '../engine/ziwei.js';
import { compute } from '../engine/index.js';
import { interpret } from '../engine/interpret.js';
import { buildAnswer, buildPlain } from '../engine/interpret-plain.js';
import { ok, eq } from './_harness.mjs';

// ── 独立录入的十天干四化（与实现无关）─────────────────────────
const HUA = {
  甲: { 禄: '廉贞', 权: '破军', 科: '武曲', 忌: '太阳' },
  乙: { 禄: '天机', 权: '天梁', 科: '紫微', 忌: '太阴' },
  丙: { 禄: '天同', 权: '天机', 科: '文昌', 忌: '廉贞' },
  丁: { 禄: '太阴', 权: '天同', 科: '天机', 忌: '巨门' },
  戊: { 禄: '贪狼', 权: '太阴', 科: '右弼', 忌: '天机' },
  己: { 禄: '武曲', 权: '贪狼', 科: '天梁', 忌: '文曲' },
  庚: { 禄: '太阳', 权: '武曲', 科: '太阴', 忌: '天同' },
  辛: { 禄: '巨门', 权: '太阳', 科: '文曲', 忌: '文昌' },
  壬: { 禄: '天梁', 权: '紫微', 科: '左辅', 忌: '武曲' },
  癸: { 禄: '破军', 权: '巨门', 科: '太阴', 忌: '贪狼' },
};
const TYPES = ['禄', '权', '科', '忌'];
const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const fix = (n) => ((n % 12) + 12) % 12;

const CHART = buildZiwei({ year: 1990, month: 5, day: 12, hour: 14, minute: 30, gender: 'male' });
const PALACE_OF_BRANCH = new Map(CHART.palaces.map((p) => [p.branch, p]));
const STAR_PALACE = new Map();
for (const p of CHART.palaces) for (const s of p.stars) STAR_PALACE.set(s.name, p);

// ── ① 三方四正四宫：独立重推 ────────────────────────────────
const FC = flyComposite(CHART);
{
  const soulIdx = BRANCHES.indexOf(CHART.palaces.find((p) => p.isSoul).branch);
  const want = [soulIdx, fix(soulIdx + 4), fix(soulIdx + 8), fix(soulIdx + 6)]
    .map((b) => PALACE_OF_BRANCH.get(BRANCHES[b]).palace);
  eq('三方四正四宫（本宫+对宫+两合宫）', FC.sanfang, want);
  eq('四宫不重复', new Set(FC.sanfang).size, 4);
  ok('默认从命宫起飞', FC.from === '命宫', FC.from);
  eq('来源宫四宫各一条', FC.sources.length, 4);
}

// ── ② 16 条飞化逐条核：宫干 → 化星 → 落宫 ────────────────────
{
  const bad = [];
  let onChart = 0;
  for (const s of FC.sources) {
    eq(`${s.palace}宫干四化条数`, s.flies.length, 4);
    for (const f of s.flies) {
      const want = HUA[s.stem][f.type];
      if (f.star !== want) bad.push(`${s.palace}${f.type}星:${f.star}≠${want}`);
      const home = STAR_PALACE.get(f.star);
      if (!home) { bad.push(`${s.palace}${f.type}:${f.star}未上盘`); continue; }
      onChart += 1;
      if (f.to !== home.palace) bad.push(`${s.palace}${f.type}落:${f.to}≠${home.palace}`);
      if (f.toBranch !== home.branch) bad.push(`${s.palace}${f.type}支:${f.toBranch}≠${home.branch}`);
      if (f.self !== (home.palace === s.palace)) bad.push(`${s.palace}${f.type}自化标记错`);
    }
  }
  ok('16 条飞化的星与落宫逐条成立', bad.length === 0, bad.join(' ') || '16/16');
  ok('上盘飞化全部带落宫', onChart === 16, String(onChart));
}

// ── ③ 落宫归堆与会聚：用另一套过滤重算后比对 ──────────────────
{
  const manual = new Map();
  for (const s of FC.sources) {
    for (const f of s.flies) {
      if (!f.to) continue;
      if (!manual.has(f.to)) manual.set(f.to, []);
      manual.get(f.to).push(`${s.palace}/${f.type}/${f.star}/${f.self ? 'self' : ''}`);
    }
  }
  const got = new Map(FC.targets.map((t) => [t.palace, t.incoming.map((x) => `${x.from}/${x.type}/${x.star}/${x.self ? 'self' : ''}`)]));
  eq('落宫归堆与手算一致（宫数）', [...got.keys()].sort().join(','), [...manual.keys()].sort().join(','));
  const bad = [];
  for (const [k, v] of manual) {
    const a = v.slice().sort().join('|');
    const b = (got.get(k) || []).slice().sort().join('|');
    if (a !== b) bad.push(`${k}: ${a} ≠ ${b}`);
  }
  ok('每一宫的飞入清单逐条一致', bad.length === 0, bad.join(' ') || `${manual.size} 宫`);

  const total = FC.targets.reduce((n, t) => n + t.count, 0);
  eq('归堆总数等于上盘飞化数', total, 16);

  // 四类会聚用独立过滤再算一遍
  const expDouble = [...manual.entries()]
    .filter(([, v]) => v.filter((x) => x.split('/')[1] === '忌').length >= 2)
    .map(([k]) => k).sort();
  eq('双忌会名单', FC.groups.doubleJi.map((t) => t.palace).sort(), expDouble);
  const expLuJi = [...manual.entries()]
    .filter(([, v]) => {
      const ts = new Set(v.map((x) => x.split('/')[1]));
      return ts.has('禄') && ts.has('忌');
    }).map(([k]) => k).sort();
  eq('禄忌同宫名单', FC.groups.luJi.map((t) => t.palace).sort(), expLuJi);
  const expTriple = [...manual.entries()]
    .filter(([, v]) => new Set(v.map((x) => x.split('/')[1])).size >= 3)
    .map(([k]) => k).sort();
  eq('三化会名单', FC.groups.tripleHua.map((t) => t.palace).sort(), expTriple);
  const expSelf = [...manual.entries()]
    .filter(([, v]) => v.some((x) => x.endsWith('/self')))
    .map(([k]) => k).sort();
  eq('自化落宫名单', FC.groups.selfHua.map((t) => t.palace).sort(), expSelf);
}

// ── ④ 标签：每个会聚都要有对应的标签，且标签不重复 ──────────────
{
  const uniq = new Set(FC.labels);
  eq('标签无重复', uniq.size, FC.labels.length);
  const groups = [
    ...FC.groups.doubleJi.map((t) => ({ t, re: /忌会/ })),
    ...FC.groups.luJi.map((t) => ({ t, re: /禄忌同宫/ })),
    ...FC.groups.tripleHua.map((t) => ({ t, re: /化会/ })),
    ...FC.groups.selfHua.map((t) => ({ t, re: /自化/ })),
  ];
  const bad = groups.filter(({ t, re }) => !FC.labels.some((l) => re.test(l) && l.includes(t.palace)));
  ok('每处会聚都有对应标签', bad.length === 0, bad.map((x) => x.t.palace).join(',') || `${FC.labels.length} 条标签`);
  ok('标签用中文数字而不是「3化会」', !FC.labels.some((l) => /^\d化会/.test(l)), FC.labels.join(' · '));
  ok('口径写明不折吉凶', /不折吉凶/.test(FC.note), FC.note.slice(0, 40));
}

// ── ⑤ 固定盘回归快照（口径一改就会被拦下）────────────────────
eq('固定盘四方飞化标签快照', FC.labels.join(' · '), '禄忌同宫官禄宫 · 禄忌同宫父母宫 · 三化会交友宫 · 迁移宫自化');
{
  const ji = FC.byType.忌.map((x) => `${x.from}${x.star}${x.self ? '(自)' : ''}→${x.to}`).join('；');
  eq('固定盘忌的去向快照', ji, '命宫廉贞→父母；官禄天机→财帛；财帛武曲→交友；迁移天同→官禄');
}

// ── ⑥ 60 张盘：会聚检测有命中、结构恒成立 ────────────────────
{
  let charts = 0;
  let hits = 0;
  let offChart = 0;
  const bad = [];
  for (let y = 1985; y < 1995; y++) {
    for (let m = 1; m <= 6; m++) {
      const c = buildZiwei({ year: y, month: m, day: 10, hour: 9, minute: 0, gender: m % 2 ? 'male' : 'female' });
      const fc = flyComposite(c);
      charts += 1;
      if (!fc || fc.sources.length !== 4) { bad.push(`${y}-${m}:四宫不全`); continue; }
      const stars = new Map();
      for (const p of c.palaces) for (const s of p.stars) stars.set(s.name, p);
      let n = 0;
      for (const s of fc.sources) {
        for (const f of s.flies) {
          const home = stars.get(f.star);
          if (!home) { offChart += 1; if (f.to !== null) bad.push(`${y}-${m}:${f.star}未上盘却给了落宫`); continue; }
          n += 1;
          if (f.to !== home.palace) bad.push(`${y}-${m}:${f.star}落宫错`);
        }
      }
      if (fc.targets.reduce((a, t) => a + t.count, 0) !== n) bad.push(`${y}-${m}:归堆总数≠上盘数`);
      if (fc.groups.doubleJi.length || fc.groups.luJi.length) hits += 1;
      // 会聚的宫必须真的收了两条以上
      for (const t of [...fc.groups.doubleJi, ...fc.groups.luJi]) {
        if (t.count < 2) bad.push(`${y}-${m}:${t.palace}会聚但只收 ${t.count} 条`);
      }
    }
  }
  eq('60 张盘全部跑通', charts, 60);
  ok('逐盘结构自洽', bad.length === 0, bad.slice(0, 5).join(' ') || '60/60');
  ok('会聚不是死规则（60 盘中有命中）', hits > 0, `${hits}/60 盘有双忌或禄忌同宫`);
  ok('未上盘的星只记星不记落宫', offChart >= 0, `${offChart} 条未上盘`);
}

// ── ⑦ 四方可见：摘要 / 解析 / 白话 / 面板 ─────────────────────
const RESULT = compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'male' });
{
  ok('摘要带三方四正飞化行', /【三方四正飞化】/.test(RESULT.summary), (RESULT.summary.match(/【三方四正飞化】.*/) || [''])[0].slice(0, 80));
  ok('摘要列出会聚结论', /禄忌同宫官禄宫/.test(RESULT.summary));
  ok('摘要的四化去向不重复同一宫', (() => {
    const line = (RESULT.summary.match(/【三方四正飞化】.*/) || [''])[0];
    const m = line.match(/禄→([^　]*)/);
    if (!m) return true;
    const tos = m[1].split('/');
    return new Set(tos).size === tos.length;
  })());

  const sec = (interpret(RESULT, {}).sections || []).find((x) => x.key === 'flyComposite');
  ok('解析有「三方四正飞化」节', !!sec, sec ? sec.label : '缺失');
  ok('解析写出哪几股力会到同一宫', /收了 .*化/.test(sec.text), sec.text.slice(0, 80));
  ok('解析点出禄忌同宫', /禄忌同宫/.test(sec.text));
  ok('解析声明不折吉凶', /不折吉凶/.test(sec.text));

  const plain = buildAnswer(RESULT, { question: '今年工作怎么样' }, {});
  ok('白话提到几股力挤在一处', /股力最后挤在/.test(plain), plain.slice(-80));
  ok('白话整段也带上四方飞化', /股力|牵连不深/.test(buildPlain(RESULT, {}, {})));

  const sandbox = { window: {}, console };
  vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
  const html = sandbox.window.__PP.ziweiHTML(RESULT);
  const chips = html.match(/三方四正 [^<]+/g) || [];
  eq('面板会聚 chip 数量与标签一致', chips.length, RESULT.flyComposite.labels.length);
  ok('面板 chip 带飞入清单（title）', /title="[^"]*化禄/.test(html), (html.match(/title="[^"]*化禄[^"]*"/) || [''])[0].slice(0, 60));
  ok('面板 chip 已转义', !/三方四正 [^<]*<[a-z]/.test(html));
}

// ── ⑧ 旧结果兼容：缺 flyComposite 的盘不炸 ───────────────────
{
  const old = JSON.parse(JSON.stringify(RESULT));
  delete old.flyComposite;
  ok('缺复合飞化时不产出该节', !(interpret(old, {}).sections || []).some((s) => s.key === 'flyComposite'));
  ok('缺复合飞化时白话不硬凑', !/股力|牵连不深/.test(buildAnswer(old, {}, {})));
  const sandbox = { window: {}, console };
  vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
  ok('缺复合飞化时面板不出 chip', !/三方四正 [^<]/.test(sandbox.window.__PP.ziweiHTML(old)));
}

// ── ⑨ 确定性 ─────────────────────────────────────────────────
{
  const a = JSON.stringify(flyComposite(CHART));
  const b = JSON.stringify(flyComposite(CHART));
  ok('同一盘两次结果一致', a === b);
  const c = buildZiwei({ year: 1990, month: 5, day: 12, hour: 14, minute: 30, gender: 'male' });
  ok('重建同盘结果一致', JSON.stringify(c.flyComposite) === a);
}
