// 0.31.0：十六型人格问卷（MBTI 风格）。
// 重点防四件事：①题目表与计分口径脱节（问卷改了、计分没跟上）②平手/强弱的判定边界
// ③「类型文案」缺档或与类型对不上 ④把问卷测算说成官方量表、或说出禁用词（一定/必然…）。
import fs from 'node:fs';
import vm from 'node:vm';
import { compute } from '../engine/index.js';
import { ok, eq } from './_harness.mjs';
import { DIMENSIONS, QUESTIONS, TYPES, FUNCTION_STACKS, FUNCTIONS, mbtiPaper, buildMbti } from '../engine/mbti.js';

const BANNED = ['一定', '必然', '注定', '肯定会', '绝对会', '百分百', '铁定', '毫无疑问'];
const noBanned = (s) => !BANNED.some((w) => String(s).includes(w));

// ── 一、问卷结构：24 题、四维各 6 题、题目侧向与所属维度自洽 ──────────
{
  eq('题目总数 24', QUESTIONS.length, 24);
  eq('四维各 6 题', DIMENSIONS.map((d) => QUESTIONS.filter((q) => q.dim === d.key).length).join(','), '6,6,6,6');
  eq('题号 id 唯一', new Set(QUESTIONS.map((q) => q.id)).size, 24);
  const badSide = QUESTIONS.filter((q) => {
    const d = DIMENSIONS.find((x) => x.key === q.dim);
    return !d || (q.side !== d.left && q.side !== d.right);
  });
  eq('每题的 side 都是本维度的某一侧', badSide.length, 0);
  const shortText = QUESTIONS.filter((q) => String(q.text).length < 8);
  eq('题目文案都不短（≥8 字）', shortText.length, 0);
  // 四维左右各半，否则「全选一侧」无法拉开净分，题目分布本身就不平衡
  const skew = DIMENSIONS.filter((d) => {
    const own = QUESTIONS.filter((q) => q.dim === d.key);
    return own.filter((q) => q.side === d.left).length !== own.filter((q) => q.side === d.right).length;
  });
  eq('每维左右两侧题数相同', skew.map((d) => d.key).join(','), '');
  eq('平手默认侧齐全（I/N/F/P）', DIMENSIONS.map((d) => d.tie).join(''), 'INFP');
  ok('四维字母分别是 EI/SN/TF/JP', DIMENSIONS.map((d) => d.left + d.right).join(',') === 'EI,SN,TF,JP');
}

// ── 二、试卷模式：不给 answers 先发题 ────────────────────────────
{
  const paper = compute({ system: 'mbti' });
  eq('不给 answers 时 needAnswers', paper.needAnswers, true);
  eq('试卷带 24 题', paper.questions.length, 24);
  eq('试卷题号从 1 连续', paper.questions.map((q) => q.no).join(',') === Array.from({ length: 24 }, (_, i) => i + 1).join(',') ? 'ok' : 'bad', 'ok');
  ok('摘要含题面与逐题编号', paper.summary.includes('【十六型人格问卷】') && paper.summary.includes('1. ') && paper.summary.includes('24. '), paper.summary.slice(0, 60));
  ok('试卷说明写明不是官方量表', paper.note.includes('不是官方 MBTI 量表'), paper.note.slice(0, 40));
  ok('试卷模式摘要不含禁用词', noBanned(paper.summary), '');
  // 直接调引擎函数，与 compute 的结果同源
  const p2 = mbtiPaper();
  eq('mbtiPaper 与 compute 同题数', p2.total, paper.total);
}

// ── 三、独立计分复算：不照抄实现，用「左分 − 右分」另一种写法核净分 ──────
{
  // 每题净分 (v-3)，左题取正、右题取负；等价于「左侧 (v-3) 之和 − 右侧 (v-3) 之和」
  const netOf = (ans, d) => {
    let left = 0;
    let right = 0;
    QUESTIONS.forEach((q, i) => {
      if (q.dim !== d.key || ans[i] === null || ans[i] === undefined) return;
      if (q.side === d.left) left += ans[i] - 3;
      else right += ans[i] - 3;
    });
    return left - right;
  };
  const cases = [
    // 固定样例：混合分数，四维都不全同
    [5, 4, 3, 2, 2, 5, 4, 3, 5, 4, 3, 2, 4, 5, 3, 2, 1, 2, 4, 3, 5, 4, 4, 2],
    // 全 4 分：左题偏左、右题偏右，维度净分取决于两侧抵消
    Array(24).fill(4),
    // 交替极端：1/5 交替
    Array.from({ length: 24 }, (_, i) => (i % 2 ? 1 : 5)),
    // 中段与跳过混排
    Array.from({ length: 24 }, (_, i) => (i % 5 === 0 ? null : [1, 2, 3, 4, 5][i % 5])),
  ];
  let mismatched = [];
  cases.forEach((ans, ci) => {
    const r = buildMbti({ answers: ans });
    DIMENSIONS.forEach((d, di) => {
      const want = netOf(ans, d);
      if (r.dims[di].sum !== want) mismatched.push(`样例${ci + 1}/${d.key} 净分 ${r.dims[di].sum}≠${want}`);
      const picked = want > 0 ? d.left : want < 0 ? d.right : d.tie;
      if (r.dims[di].picked !== picked) mismatched.push(`样例${ci + 1}/${d.key} 取 ${r.dims[di].picked}≠${picked}`);
    });
    const wantType = r.dims.map((x) => x.picked).join('');
    if (r.type !== wantType) mismatched.push(`样例${ci + 1} 类型 ${r.type}≠${wantType}`);
  });
  eq('四组样例 × 四维：净分/取值/类型全对', mismatched.join('；'), '');
  // 强度：pct = |净分| / (答数×2)，四档边界
  const r = buildMbti({ answers: cases[0] });
  const pctBad = r.dims.filter((d) => Math.abs(d.pct - Math.round((Math.abs(d.sum) / (d.answered * 2)) * 1000) / 1000) > 1e-9);
  eq('强度百分比按 净分/(答数×2) 算', pctBad.length, 0);
  const strengthBad = r.dims.filter((d) => {
    const p = d.pct;
    const want = p <= 0.12 ? '临界' : p <= 0.3 ? '轻微' : p <= 0.6 ? '明显' : '很强';
    return d.strength !== want;
  });
  eq('四档强度标签与 pct 对应', strengthBad.length, 0);
}

// ── 四、极端与平手：全左=ESTJ、全右=INFP、全 3 分按 tie 落 INFP ─────────
{
  // 每题都答向本维度的某一侧：净分拉满，结果应当正好是最左/最右的四字母组合
  const ansBySide = (toLeft) => QUESTIONS.map((q) => {
    const d = DIMENSIONS.find((x) => x.key === q.dim);
    return q.side === (toLeft ? d.left : d.right) ? 5 : 1;
  });
  const ansLeft = ansBySide(true);
  const ansRight = ansBySide(false);
  eq('每题都往左侧答 → ESTJ', buildMbti({ answers: ansLeft }).type, 'ESTJ');
  eq('每题都往右侧答 → INFP', buildMbti({ answers: ansRight }).type, 'INFP');
  const flat = buildMbti({ answers: Array(24).fill(3) });
  eq('全 3 分（净分全 0）→ 平手取 INFP', flat.type, 'INFP');
  eq('全 3 分四维都标平手', flat.dims.map((d) => d.tie).join(','), 'true,true,true,true');
  ok('平手维度强度标「临界」', flat.dims.every((d) => d.strength === '临界'), flat.dims.map((d) => d.strength).join(','));
  eq('拉满一侧时四维强度都是「很强」', buildMbti({ answers: ansLeft }).dims.map((d) => d.strength).join(','), '很强,很强,很强,很强');
}

// ── 五、十六型全覆盖 + 类型文案不缺档 ────────────────────────────
{
  const combos = [];
  for (let i = 0; i < 16; i++) {
    combos.push(DIMENSIONS.map((d, di) => ((i >> di) & 1 ? d.right : d.left)).join(''));
  }
  eq('枚举出 16 种类型', new Set(combos).size, 16);
  const produced = new Set();
  const missingText = [];
  combos.forEach((type) => {
    const ans = QUESTIONS.map((q) => {
      const d = DIMENSIONS.find((x) => x.key === q.dim);
      const want = type[DIMENSIONS.indexOf(d)]; // 该维要的字母
      return q.side === want ? 5 : 1;
    });
    const r = buildMbti({ answers: ans });
    produced.add(r.type);
    if (r.type !== type) missingText.push(`构造 ${type} 得到 ${r.type}`);
    const t = TYPES[type];
    if (!t) { missingText.push(`${type} 缺文案`); return; }
    if (!t.title || !t.keywords || !t.oneLine) missingText.push(`${type} 缺标题/关键词/一句话`);
    if (!Array.isArray(t.strengths) || t.strengths.length !== 3) missingText.push(`${type} 优势不是 3 条`);
    if (!Array.isArray(t.blindspots) || t.blindspots.length !== 2) missingText.push(`${type} 留意不是 2 条`);
    ['work', 'love', 'study', 'growth'].forEach((k) => { if (!t[k] || String(t[k]).length < 12) missingText.push(`${type}.${k} 缺失或过短`); });
  });
  eq('16 型都能被某组答案算出来', [...produced].length, 16);
  eq('每型文案齐全（标题/3 优势/2 留意/四场景）', missingText.join('；'), '');
  // 认知功能：每型 4 个码，且都在功能白话表里
  const stackBad = Object.entries(FUNCTION_STACKS).filter(([type, st]) => !Array.isArray(st) || st.length !== 4 || st.some((f) => !FUNCTIONS[f]) || !TYPES[type]);
  eq('16 型功能栈都是 4 个合法码', stackBad.map(([t]) => t).join(','), '');
  eq('八种认知功能都有白话', Object.keys(FUNCTIONS).length, 8);
}

// ── 六、入参校验：该报 E_INPUT / E_RANGE 的都要报 ──────────────────
{
  const codeOf = (fn) => {
    try { fn(); return 'no-throw'; } catch (e) { return e && e.code ? e.code : `no-code:${e && e.message}`; }
  };
  eq('answers 不是数组 → E_INPUT', codeOf(() => buildMbti({ answers: '54321' })), 'E_INPUT');
  eq('answers 超过 24 个 → E_INPUT', codeOf(() => buildMbti({ answers: Array(25).fill(3) })), 'E_INPUT');
  eq('分值 0 → E_RANGE', codeOf(() => buildMbti({ answers: [0, ...Array(23).fill(3)] })), 'E_RANGE');
  eq('分值 6 → E_RANGE', codeOf(() => buildMbti({ answers: [6, ...Array(23).fill(3)] })), 'E_RANGE');
  eq('分值 3.5（非整数）→ E_RANGE', codeOf(() => buildMbti({ answers: [3.5, ...Array(23).fill(3)] })), 'E_RANGE');
  eq('只答 11 题 → E_INPUT', codeOf(() => buildMbti({ answers: Array(11).fill(4) })), 'E_INPUT');
  eq('空数组 → E_INPUT', codeOf(() => buildMbti({ answers: [] })), 'E_INPUT');
  eq('答满 12 题可出口径', (() => { try { return buildMbti({ answers: Array(12).fill(4) }).type.length === 4 ? 'ok' : 'bad'; } catch (e) { return e.message; } })(), 'ok');
}

// ── 七、跳过与答数统计：null/'' 记为跳过，不参与分母 ────────────────
{
  const ans = Array(24).fill(4);
  ans[0] = null;
  ans[1] = '';
  ans[2] = undefined;
  const r = buildMbti({ answers: ans });
  eq('跳过 3 题 → answered 21', r.answered, 21);
  eq('跳过 3 题 → skipped 3', r.skipped, 3);
  eq('total 恒为 24', r.total, 24);
  const skipByDim = {};
  [0, 1, 2].forEach((i) => { const k = QUESTIONS[i].dim; skipByDim[k] = (skipByDim[k] || 0) + 1; });
  const badAnswered = DIMENSIONS.filter((d, di) => r.dims[di].answered !== 6 - (skipByDim[d.key] || 0));
  eq('跳过的题按维度扣减答数', badAnswered.map((d) => d.key).join(','), '');
  // 某一维全跳过：强度「未作答」、pct 0、按 tie 取
  const allSkipEI = Array(24).fill(4).map((v, i) => (QUESTIONS[i].dim === 'EI' ? null : v));
  const r2 = buildMbti({ answers: allSkipEI });
  const ei = r2.dims[0];
  eq('整维跳过时 answered 0', ei.answered, 0);
  eq('整维跳过时强度「未作答」', ei.strength, '未作答');
  eq('整维跳过时按平手取 I', ei.picked, 'I');
}

// ── 八、摘要文本：三处可见之一（compute 的 summary） ─────────────────
{
  const r = compute({ system: 'mbti', answers: Array(24).fill(4) });
  ok('摘要标题带类型与称号', r.summary.includes(`【十六型人格】${r.type}（${r.title}）`), r.summary.slice(0, 40));
  ok('摘要写明已答题数', r.summary.includes(`已答 ${r.answered}/24 题`), r.answered);
  ok('摘要分节齐全', ['【四维】', '【优势】', '【留意】', '【课题】', '【认知功能】', '【工作】', '【关系】', '【学习】'].every((k) => r.summary.includes(k)), '');
  ok('摘要逐维写「取 X」与强度', r.dims.every((d) => r.summary.includes(`${d.left}/${d.right} 取 ${d.picked}（${d.strength}`)), r.dims.map((d) => d.key).join(','));
  ok('摘要末行声明不是官方量表', r.summary.includes('不是官方量表'), '');
  ok('摘要不含禁用词', noBanned(r.summary), '');
}

// ── 九、面板：问卷态渲染题目清单，结果态渲染四维条与功能 chip ──────────
{
  const sandbox = { window: {}, console };
  vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
  const PP = sandbox.window.__PP;
  ok('panel-kit 暴露 mbtiHTML', typeof PP.mbtiHTML === 'function');
  const paper = compute({ system: 'mbti' });
  const hp = PP.mbtiHTML(paper);
  ok('问卷态列出 24 道题', (hp.match(/<li>/g) || []).length === 24, (hp.match(/<li>/g) || []).length);
  ok('问卷态说明项', hp.includes('十六型人格问卷') && hp.includes('1 完全不像'), '');
  const r = compute({ system: 'mbti', answers: [5, 4, 3, 2, 2, 5, 4, 3, 5, 4, 3, 2, 4, 5, 3, 2, 1, 2, 4, 3, 5, 4, 4, 2] });
  const h = PP.mbtiHTML(r);
  ok('结果态标出类型', h.includes(`<b>${r.type}</b>`) && h.includes(r.title), r.type);
  ok('结果态四维条齐全（4 条进度条）', (h.match(/class="mp-mb-dim"/g) || []).length === 4, (h.match(/class="mp-mb-dim"/g) || []).length);
  ok('结果态每个功能一个 chip', r.profile.stack.every((f) => h.includes(`mp-mb-fn`) && h.includes(f.code)), '');
  ok('结果态带优势与留意', h.includes('优势') && h.includes('留意'), '');
  ok('面板文案不含禁用词', noBanned(h), '');
  // 转义：类型文案里塞脚本不能原样进 HTML
  const evil = JSON.parse(JSON.stringify(r));
  evil.profile.title = '<script>alert(1)</script>';
  evil.profile.work = '"><img src=x onerror=alert(1)>';
  const he = PP.mbtiHTML(evil);
  ok('面板对类型文案转义', !he.includes('<script>alert(1)</script>') && he.includes('&lt;script&gt;'), '');
  // 旧结果/缺字段不炸
  const broken = PP.mbtiHTML({ system: 'mbti', needAnswers: true, questions: [] });
  ok('题目数组为空也不抛', typeof broken === 'string', '');
}

// ── 十、确定性与等价性：同答案同结果；同维同侧换题序不改分 ────────────
{
  const ans = [5, 4, 3, 2, 2, 5, 4, 3, 5, 4, 3, 2, 4, 5, 3, 2, 1, 2, 4, 3, 5, 4, 4, 2];
  const a = buildMbti({ answers: ans });
  const b = buildMbti({ answers: ans.slice() });
  eq('同一份答案两次结果一致', JSON.stringify(a) === JSON.stringify(b), true);
  // 交换两题：同为 SN 维且同侧，分数互换后净分不变
  const sameSide = (i, j) => QUESTIONS[i].dim === QUESTIONS[j].dim && QUESTIONS[i].side === QUESTIONS[j].side && i !== j;
  let pair = null;
  for (let i = 0; i < 24 && !pair; i++) for (let j = i + 1; j < 24; j++) if (sameSide(i, j)) { pair = [i, j]; break; }
  ok('能找到同维同侧的两题', !!pair, String(pair));
  if (pair) {
    const sw = ans.slice();
    [sw[pair[0]], sw[pair[1]]] = [sw[pair[1]], sw[pair[0]]];
    eq('同维同侧两题换分不改类型与净分', buildMbti({ answers: sw }).dims.map((d) => `${d.key}${d.sum}`).join(','), a.dims.map((d) => `${d.key}${d.sum}`).join(','));
  }
}
