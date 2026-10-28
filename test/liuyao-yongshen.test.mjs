// 六爻用神：取用神 / 用神不上卦取伏神 / 用神与卦体联动
//
// 以前解释层只用一句话提「问工作看官鬼」，并没有真的把用神取出来，
// 所以「用神持世」「用神化退」「用神在六冲卦」这些话都无从对上。
// 这一组测试盯三件事：
//   ① 取用规则本身（六亲、感情分男女、出行用世）；
//   ② 伏神取法要与「本宫首卦同位」完全一致——用 128 条已录卦例当触发集，不是自证；
//   ③ 用神与卦体标签必须能从卦面复算出来，且摘要/解析/面板/白话四处都看得见。
import fs from 'node:fs';
import { hexagramFromBits, buildLiuyao, yongshenOf, YONGSHEN_RULES } from '../engine/liuyao.js';
import { compute } from '../engine/index.js';
import { interpret } from '../engine/interpret.js';
import { buildAnswer, buildPlain } from '../engine/interpret-plain.js';
import { ok, eq } from './_harness.mjs';

const DAY = { stem: '甲', branch: '子', name: '甲子' };
const bitsOf = (mask) => Array.from({ length: 6 }, (_, i) => (mask >> i) & 1);
const lineValue = (a, b) => (a === b ? (a ? 7 : 8) : (a ? 9 : 6));
const LIUQIN5 = ['父母', '兄弟', '子孙', '妻财', '官鬼'];

const BY_NAME = new Map();
const ALL_HEX = [];
for (let mask = 0; mask < 64; mask++) {
  const h = hexagramFromBits(bitsOf(mask));
  BY_NAME.set(h.name, bitsOf(mask));
  ALL_HEX.push(h);
}
ok('六十四卦名索引齐全', BY_NAME.size === 64, String(BY_NAME.size));

/** 「本卦之变卦」→ 装卦结果；调用方可指定日辰 */
function castPair(combo, day = DAY) {
  const [a, b] = combo.split('之').map((s) => s.trim());
  const A = BY_NAME.get(a);
  const B = BY_NAME.get(b);
  if (!A || !B) return null;
  return buildLiuyao({ lines: A.map((bit, i) => lineValue(bit, B[i])), dayGanZhi: day });
}

/** 静卦（六爻不动）→ 装卦结果 */
function castStatic(name, day = DAY) {
  const bits = BY_NAME.get(name);
  if (!bits) return null;
  return buildLiuyao({ lines: bits.map((b) => (b ? 7 : 8)), dayGanZhi: day });
}

// ── ① 取用规则 ────────────────────────────────────────────────
eq('取用规则共七档', Object.keys(YONGSHEN_RULES).length, 7);
eq('求财取妻财', YONGSHEN_RULES.wealth.liuqin, '妻财');
eq('工作取官鬼', YONGSHEN_RULES.career.liuqin, '官鬼');
eq('健康取官鬼', YONGSHEN_RULES.health.liuqin, '官鬼');
eq('学业取父母', YONGSHEN_RULES.study.liuqin, '父母');
eq('感情不固定六亲（分男女）', YONGSHEN_RULES.love.liuqin, null);
eq('出行不固定六亲（以世为用）', YONGSHEN_RULES.travel.liuqin, null);
eq('未指明方向不取用神', YONGSHEN_RULES.general.liuqin, null);
ok('每档都写了所问之事', Object.values(YONGSHEN_RULES).every((r) => typeof r.ask === 'string' && r.ask.length >= 4), JSON.stringify(Object.values(YONGSHEN_RULES).map((r) => r.ask)));

const tai = castPair('地天泰之天地否');
ok('地天泰（动爻 1,2,3,5,6）装卦成功', tai && tai.ben.name === '地天泰', tai ? tai.ben.name : 'null');

// 未指明方向：不取用神，也不该编一个出来
const gen = yongshenOf(tai, {});
eq('未指明方向时 liuqin 为空', gen.liuqin, null);
ok('未指明方向时给出提示而非硬凑', gen.labels.join('|').includes('未指明所问之事'), gen.labels.join('|'));

// 感情分男女：同一支卦，男取妻财、女取官鬼
const loveM = yongshenOf(tai, { direction: 'love', gender: 'male' });
const loveF = yongshenOf(tai, { direction: 'love', gender: 'female' });
eq('感情男命取妻财', loveM.liuqin, '妻财');
eq('感情女命取官鬼', loveF.liuqin, '官鬼');

// 出行以世爻为用
const trav = yongshenOf(tai, { direction: 'travel' });
ok('出行标记为以世为用', trav.byShi === true, String(trav.byShi));
eq('出行取世爻本身', trav.found.length ? trav.found[0].position : -1, tai.ben.shi);
eq('出行用神标签写「世爻」', trav.labels[0], '用神 世爻');
ok('出行时用神必然持世', trav.labels.includes('用神持世'), trav.labels.join('|'));

// ── ② 用神在卦上：位置与爻位、内外归属要能对上卦面 ────────────
{
  const bad = [];
  for (const hex of ALL_HEX) {
    const r = castStatic(hex.name);
    for (const dir of ['wealth', 'career', 'health', 'study', 'travel']) {
      const ug = yongshenOf(r, { direction: dir });
      const want = dir === 'travel'
        ? [{ position: r.ben.shi, liuqin: r.ben.lines[r.ben.shi - 1].liuqin }]
        : r.ben.lines.filter((l) => l.liuqin === ug.liuqin).map((l) => ({ position: l.position, liuqin: l.liuqin }));
      if (want.length === 0) {
        if (!ug.missing) bad.push(`${hex.name}/${dir} 应判「不上卦」却没判`);
        continue;
      }
      if (ug.missing) bad.push(`${hex.name}/${dir} 卦上有${ug.liuqin}却判了不上卦`);
      if (ug.found.map((f) => f.position).join(',') !== want.map((w) => w.position).join(',')) {
        bad.push(`${hex.name}/${dir} 位置不符：得 ${ug.found.map((f) => f.position).join(',')} 期望 ${want.map((w) => w.position).join(',')}`);
      }
    }
  }
  ok('64 卦 × 5 档取用位置全对', bad.length === 0, bad.slice(0, 3).join('｜'));
}

// 内外卦归属：1~3 爻为内卦，4~6 爻为外卦
{
  const bad = [];
  for (const hex of ALL_HEX) {
    const r = castStatic(hex.name);
    const ug = yongshenOf(r, { direction: 'career' });
    if (!ug.found.length) continue;
    const sidesSeen = new Set(ug.found.map((f) => (f.position <= 3 ? '内卦' : '外卦')));
    const want = sidesSeen.size === 1 ? [...sidesSeen][0] : null;
    if (ug.side !== want) bad.push(`${hex.name} 得 ${ug.side} 期望 ${want}`);
  }
  ok('用神内外归属与爻位一致', bad.length === 0, bad.slice(0, 3).join('｜'));
}

// 用神两现：世应与动爻都在同一六亲上时，两处都要列出来，且不代选
{
  let hit = null;
  for (const hex of ALL_HEX) {
    const r = castStatic(hex.name);
    const cai = r.ben.lines.filter((l) => l.liuqin === '妻财');
    if (cai.length === 2) { hit = { hex, r }; break; }
  }
  ok('找到妻财两现的静卦做样本', Boolean(hit), hit ? hit.hex.name : '无');
  if (hit) {
    const ug = yongshenOf(hit.r, { direction: 'wealth' });
    eq('两现时两处都列出', ug.found.length, 2);
    ok('两现标签带爻位', ug.labels.includes(`用神两现 ${ug.found.map((f) => f.position).join('、')}`), ug.labels.join('|'));
    ok('两现不替人挑主用', !ug.labels.some((l) => /主用|取第/.test(l)), ug.labels.join('|'));
  }
}

// ── ③ 用神不上卦 → 伏神必须与「本宫首卦同位」完全一致 ──────────
// 触发集用 classics.json 里 128 条已录卦例（源 138 条），不是自己造的例子。
const FIX = JSON.parse(fs.readFileSync(new URL('./fixtures/classics.json', import.meta.url), 'utf8'));
const CASES = [...(FIX.boshizhengzong || []), ...(FIX.boshizhengzongStatic || []), ...(FIX.liuyaoExamples || [])];

/** 卦名归一：典籍里 乾/干、遁/遯 之类混用，先精确匹配，再退到唯一后缀匹配 */
const VAR = { 遯: '遁', 干: '乾', 兌: '兑', 離: '离', 蠱: '蛊', 頤: '颐', 隨: '随', 觀: '观', 復: '复', 節: '节', 濟: '济', 渙: '涣', 豐: '丰' };
const TRIGRAMS = ['乾', '兑', '离', '震', '巽', '坎', '艮', '坤'];
// 八纯卦：典籍里常只写一个卦名（「艮」即「艮为山」）
const PURE_FULL = { 乾: '乾为天', 兑: '兑为泽', 离: '离为火', 震: '震为雷', 巽: '巽为风', 坎: '坎为水', 艮: '艮为山', 坤: '坤为地' };
function resolveHex(name) {
  let raw = String(name || '').trim();
  if (TRIGRAMS.includes(raw)) raw = PURE_FULL[raw];
  raw = [...raw].map((ch) => VAR[ch] || ch).join('');
  if (BY_NAME.has(raw)) return raw;
  const hits = [...BY_NAME.keys()].filter((k) => k.endsWith(raw) || raw.endsWith(k));
  return hits.length === 1 ? hits[0] : null;
}

function castCase(c) {
  // 两种录入体例：boshizhengzong* 用 name（「本卦之变卦」），liuyaoExamples 用 ben/bian
  const raw = c.name || c.printed || (c.bian ? `${c.ben}之${c.bian}` : c.ben) || '';
  const parts = String(raw).split('之');
  const benName = resolveHex(parts[0]);
  if (!benName) return null;
  const bianName = parts.length > 1 ? resolveHex(parts.slice(1).join('之')) : null;
  const A = BY_NAME.get(benName);
  if (!bianName) return buildLiuyao({ lines: A.map((b) => (b ? 7 : 8)), dayGanZhi: DAY });
  const B = BY_NAME.get(bianName);
  if (!B) return null;
  return buildLiuyao({ lines: A.map((bit, i) => lineValue(bit, B[i])), dayGanZhi: DAY });
}

ok('已录卦例条数', CASES.length >= 120, String(CASES.length));

{
  const bad = [];
  let triggered = 0;
  let matched = 0;
  let withQue = 0;
  for (const c of CASES) {
    const r = castCase(c);
    if (!r) { bad.push(`装卦失败：${c.name || c.ben}`); continue; }
    const palace = String(r.ben.palace).replace(/宫$/, '');
    const pure = ALL_HEX.find((h) => h.palace === palace && h.order === 0);
    const pureCast = pure ? castStatic(pure.name) : null;
    // 典籍原录的「缺爻」：这一条卦例本来就标了哪几个六亲不上卦（伏神）
    const que = Array.isArray(c.que) ? c.que : null;
    if (que) withQue += 1;
    for (const lq of LIUQIN5) {
      const onChart = r.ben.lines.filter((l) => l.liuqin === lq);
      if (onChart.length) {
        // 卦上有这个六亲，却出现在缺爻表里 —— 典籍与卦面矛盾，要报出来
        if (que && que.includes(lq)) bad.push(`${c.name || c.ben} 卦上有${lq}，原录却记为缺爻`);
        continue;
      }
      triggered += 1;
      if (que && !que.includes(lq)) bad.push(`${c.name || c.ben} 卦上无${lq}，原录未记为缺爻`);
      if (!pureCast) { bad.push(`${c.name} 找不到本宫首卦（${palace}）`); continue; }
      const ug = yongshenOf(r, { liuqin: lq });
      if (!ug.missing) { bad.push(`${c.name || c.ben}/${lq} 应判不上卦`); continue; }
      const want = pureCast.ben.lines.filter((l) => l.liuqin === lq).map((l) => l.position);
      const got = ug.fushen.map((f) => f.position);
      if (got.join(',') !== want.join(',')) {
        bad.push(`${c.name || c.ben}/${lq} 伏神位不符：得 ${got.join(',')} 期望 ${want.join(',')}`);
        continue;
      }
      matched += 1;
      // 伏神的六亲必须等于所取的六亲，飞神必须是本卦同爻位那一爻
      for (const f of ug.fushen) {
        if (f.liuqin !== lq) bad.push(`${c.name || c.ben}/${lq} 伏神六亲写成 ${f.liuqin}`);
        const fei = r.ben.lines[f.position - 1];
        if (!f.fei || f.fei.position !== fei.position || f.fei.liuqin !== fei.liuqin) {
          bad.push(`${c.name || c.ben}/${lq} 飞神与卦面不符（${f.position}爻）`);
        }
      }
    }
  }
  ok('卦例里确有「用神不上卦」的样本（防死测）', triggered >= 40, `触发 ${triggered} 次`);
  ok('伏神位置与「本宫首卦同位」全对', bad.length === 0, bad.slice(0, 3).join('｜'));
  ok('伏神对拍条数达量', matched >= 40, `对拍 ${matched} 处`);
  ok('带缺爻标注的卦例足够多（对拍依据）', withQue >= 50, `${withQue} 条`);
}

// 伏神要带飞伏生克，且生克方向与五行对得上
{
  const bad = [];
  for (const hex of ALL_HEX) {
    const r = castStatic(hex.name);
    const ug = yongshenOf(r, { direction: 'wealth' });
    if (!ug.fushen.length) continue;
    for (const f of ug.fushen) {
      const fei = r.ben.lines[f.position - 1];
      const 生 = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
      const 克 = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };
      const want = 生[f.element] === fei.element ? '伏生飞'
        : 生[fei.element] === f.element ? '飞生伏'
          : 克[f.element] === fei.element ? '伏克飞'
            : 克[fei.element] === f.element ? '飞克伏' : '比和';
      if (f.relation !== want) bad.push(`${hex.name} ${f.position}爻 ${f.element}/${fei.element} 得 ${f.relation} 期望 ${want}`);
    }
  }
  ok('飞伏生克方向与五行相生相克一致', bad.length === 0, bad.slice(0, 3).join('｜'));
}

// ── ④ 用神与卦体联动 ─────────────────────────────────────────
// 卦体标签只描述动势：落到用神身上才谈得上指向。这里核「标签该不该出」。
{
  const bad = [];
  for (const combo of ['离为火之坤为地', '水地比之水风井', '山地剥之坤为地', '雷地豫之天地否', '天地否之乾为天']) {
    const r = castPair(combo);
    if (!r) { bad.push(`${combo} 装卦失败`); continue; }
    const ug = yongshenOf(r, { direction: 'career' });
    const has = (x) => ug.labels.includes(x);
    if (r.body.ben.chong !== has('用神在六冲卦')) bad.push(`${combo} 六冲卦标签不符`);
    if (r.body.ben.he !== has('用神在六合卦')) bad.push(`${combo} 六合卦标签不符`);
    if (Boolean(r.body.bian && r.body.bian.chong) !== has('用神逢变六冲')) bad.push(`${combo} 变六冲标签不符`);
    if (Boolean(r.body.bian && r.body.bian.he) !== has('用神逢变六合')) bad.push(`${combo} 变六合标签不符`);
    // 反吟/伏吟只在用神确实落在那一宫时才算
    const sides = new Set(ug.found.map((f) => (f.position <= 3 ? 'inner' : 'outer')));
    for (const side of ['inner', 'outer']) {
      const nm = side === 'inner' ? '内' : '外';
      const wantFan = Boolean(r.body.fanYin && r.body.fanYin[side]) && sides.has(side);
      if (wantFan !== has(`用神在${nm}卦反吟`)) bad.push(`${combo} ${nm}卦反吟标签不符`);
      const wantFu = Boolean(r.body.fuYin && r.body.fuYin[side]) && sides.has(side);
      if (wantFu !== has(`用神在${nm}卦伏吟`)) bad.push(`${combo} ${nm}卦伏吟标签不符`);
    }
    // 反吟来源必须写明
    if ([...ug.labels].some((l) => l.endsWith('卦反吟')) && !ug.labels.some((l) => l.startsWith('反吟来源：'))) {
      bad.push(`${combo} 反吟未标来源`);
    }
  }
  ok('用神与卦体联动标签与卦面对得上', bad.length === 0, bad.slice(0, 3).join('｜'));
}

// 用神化进/化退：标签必须挂在用神那一爻上，而不是全卦有化进就冒出来
{
  const r = castPair('水雷屯之水泽节');
  const ug = yongshenOf(r, { direction: 'wealth' });
  const jin = (r.body.jinTui || []).filter((x) => x.type === '进').map((x) => x.position);
  const onGod = ug.found.some((f) => jin.includes(f.position));
  eq('化进标签只随用神出现', ug.labels.includes('用神化进神'), onGod);
  ok('不在用神上的化进不算用神化进', onGod || !ug.labels.includes('用神化进神'), ug.labels.join('|'));
}

// 用神旬空：日辰旬空内的地支要标出来（两侧都要出现，防「只在一边算对」）
{
  let hitKong = 0;
  let hitNo = 0;
  const bad = [];
  for (const hex of ALL_HEX) {
    const r = castStatic(hex.name);
    const ug = yongshenOf(r, { direction: 'career' });
    const kong = new Set(String(r.xunKong || '').split(''));
    const want = ug.found.some((f) => kong.has(f.branch));
    const got = ug.labels.includes('用神空亡');
    if (want !== got) bad.push(`${hex.name} 得 ${got} 期望 ${want}`);
    if (want) hitKong += 1; else hitNo += 1;
  }
  ok('旬空标签与日辰一致', bad.length === 0, bad.slice(0, 3).join('｜'));
  ok('旬空判定两侧都有样本', hitKong >= 5 && hitNo >= 20, `空 ${hitKong} / 不空 ${hitNo}`);
}

// ── ⑤ 三处可见：摘要 / 解析 / 面板 / 白话 ─────────────────────
{
  const r = compute({ system: 'liuyao', lines: [9, 9, 9, 6, 6, 6], direction: 'career' });
  ok('compute 把用神挂在结果上', Boolean(r.useGod && r.useGod.liuqin), JSON.stringify(r.useGod || null).slice(0, 80));
  ok('摘要里有「用神：」行', /用神：官鬼/.test(r.summary), r.summary.split('\n').filter((l) => l.startsWith('用神')).join('｜'));
  ok('摘要里有用神联动行', /用神联动：/.test(r.summary), r.summary.split('\n').filter((l) => l.startsWith('用神联动')).join('｜'));

  const it = interpret(r, { direction: 'career' });
  const sec = (it.sections || []).find((s) => s.key === 'yongshen');
  ok('解析里有「用神落位与卦体」节', Boolean(sec), (it.sections || []).map((s) => s.key).join(','));
  if (sec) {
    ok('该节写明取用方向', /所问方向取官鬼为用神/.test(sec.text), sec.text.slice(0, 80));
    ok('该节写明用神在哪一爻', /用神在卦上：2爻/.test(sec.text), sec.text.slice(0, 120));
    ok('该节声明不断成败', /不断成败/.test(sec.text), sec.text.slice(-60));
  }
  ok('未纳入一栏已去掉「用神多重」的旧说法', !/用神多重/.test((it.sections || []).find((s) => s.key === 'limits').text), ((it.sections || []).find((s) => s.key === 'limits') || {}).text);

  // 无方向时：不硬凑用神，摘要明确说「未取」
  const r2 = compute({ system: 'liuyao', lines: [9, 9, 9, 6, 6, 6] });
  ok('无方向时摘要写「用神：未取」', /用神：未取/.test(r2.summary), r2.summary.split('\n').filter((l) => l.startsWith('用神')).join('｜'));
  const it2 = interpret(r2, {});
  ok('无方向时不生成用神节', !(it2.sections || []).some((s) => s.key === 'yongshen'), (it2.sections || []).map((s) => s.key).join(','));

  // 白话：一句生活话，不堆术语
  const plain = buildAnswer(r, { direction: 'career' });
  ok('白话里点明用神落在哪一爻', /第2爻/.test(plain), plain.slice(0, 200));
  const plainAll = buildPlain(r, { direction: 'career' });
  ok('整段白话也能提到用神', /第2爻/.test(plainAll), plainAll.slice(0, 200));

  // 面板：与本仓其它 UI 测试一致，用 vm 沙箱喂 window.Engine
  const vm = await import('node:vm');
  const sandbox = { window: { Engine: { compute } }, console };
  vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
  const PP = sandbox.window.__PP;
  const html = PP.liuyaoHTML(r);
  ok('面板渲染用神 chip', html.includes('用神 官鬼'), '');
  ok('面板用神发动 chip 不着色也不丢', html.includes('>用神发动</span>'), '');
  ok('面板六合联动 chip 用 ok 色', /<span class="pp-chip ok">用神逢变六合<\/span>/.test(html), '');
  ok('面板渲染用神所在爻位 chip', html.includes('用神 官鬼在 2爻'), '');
  const htmlNo = PP.liuyaoHTML(r2);
  ok('无方向时面板写「用神未取」', htmlNo.includes('用神未取'), '');
  // 旧结果（没有 useGod 字段）不抛错，也不硬凑
  const rOld = compute({ system: 'liuyao', lines: [9, 9, 9, 6, 6, 6], direction: 'career' });
  delete rOld.useGod;
  ok('旧结果无 useGod 时面板仍能渲染', PP.liuyaoHTML(rOld).includes('用神未取'), '');
}
