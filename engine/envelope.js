/**
 * OutputEnvelope：解读的最小契约（PRD 4.x / US-001~US-005）
 *
 * 分工很硬：
 *   Stage A（这里）只产出「判断」——结论、因素、时间窗、建议、风险，全是结构化字段；
 *   Stage B 只负责把某个字段组说成人话，且拿不到完整排盘；
 *   Stage C 用 validateEnvelope 卡断言；Stage D 定向修复，最多两轮。
 *
 * 这一层不排盘、不改任何既有判断口径，只做「把已经有的事实按披露层次摆好」。
 * 所以它可以在任何体系上跑；没有专属 adapter 的体系走 _default。
 */

import { shortHash } from './fingerprint.js';
import { scanTerms, termPlain, synonymKey, termsByTier, hasDict } from './term-dict.js';

export const SCHEMA_VERSION = '1.0.0';
export const DIRECTIONS = ['positive', 'negative', 'mixed', 'undetermined'];
export const CONFIDENCES = ['high', 'medium', 'low'];

/** 方向的中文呈现：界面不出现 positive/negative，只出现这四句 */
export const DIRECTION_LABEL = {
  positive: '偏顺',
  negative: '偏卡',
  mixed: '两头都有',
  undetermined: '暂难定向',
};

export const DISCLAIMER = Object.freeze({ id: 'std-v1', position: 'footer' });

export const LIMITS = Object.freeze({
  headline: [12, 40],
  impact: 30,
  risk: 30,
  advice: 25,
  adviceCount: [1, 3],
  factors: [1, 5],
  timeline: 2,
  l0l1: 400,
  fuzzyTotal: 2,
  factorName: 10,
  weight: [0, 1],
});

/** 出现即不合格：这些词把结论稀释成空气 */
export const FORBIDDEN = [
  '部分流派认为', '另有说法', '古籍记载', '各家有异说',
  '某种程度上', '一定程度上', '因人而异', '视情况而定',
  '尚不能确定', '有待观察', '有待验证', '仅供参考',
];

/** 限额词：L0+L1 合计不超过 2 次 */
export const HEDGE = ['可能', '或许', '大概', '也许', '似乎'];

/** 正文出现即算重复免责（PRD 要求全站唯一一条在页脚） */
export const DISCLAIMER_PHRASES = ['仅供参考', '不构成建议', '娱乐参考', '传统文化与娱乐'];

/** 因素名白名单（PRD 7.2）：name 必须落在这里面 */
export { STAR_NATURE };
export const FACTOR_WHITELIST = {
  bazi: ['日主强弱', '格局', '用神', '当前大运', '下一步大运'],
  ziwei: ['命身格局', '四化落点', '当前大限', '关键宫位'],
  liuyao: ['卦体格局', '世爻状态', '用神状态', '动爻作用'],
  qimen: ['用神落宫', '关键格局', '值符值使', '时效窗口'],
  tarot: ['核心牌', '主导元素', '关键牌位', '牌阵整体'],
  daliuren: ['课体格局', '三传走势', '末传落点'],
  meihua: ['体用关系', '过程互卦', '结果变卦'],
  hepan: ['日主关系', '夫妻宫', '五行互补', '合冲计数'],
  _default: ['核心结论', '关键条件', '时间窗口'],
};

/** 每体系一句话的流派口径，写进 meta.school */
const SCHOOL = {
  bazi: '调候优先、扶抑校验',
  ziwei: '三合派安星、按年干取流年四化',
  liuyao: '纳甲六爻、以月建日辰定旺衰',
  qimen: '时家转盘、拆补法起局',
  tarot: 'RWS 牌义、黄金黎明元素对应',
  daliuren: '四课三传、以日干为我，九宗门取课体',
  meihua: '体用生克为主、卦辞为辅',
  hepan: '日柱为主、属相为表层、五行互补加权',
  _default: '本插件默认口径',
};

// —— 五行：不 import bazi.js，避免跨 chunk 依赖 ——
const STEM_EL = { 甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土', 己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水' };
const BRANCH_EL = { 子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火', 午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水' };
const SHENG = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const KE = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };

function stemEl(ch) { return STEM_EL[ch] || ''; }
function branchEl(ch) { return BRANCH_EL[ch] || ''; }
/** 奇门九宫：数字 → 「宫名+方位」，用户读「坤宫（西南）」比读「2 宫」直观 */
const PALACE_NAME = {
  1: '坎宫（北）', 2: '坤宫（西南）', 3: '震宫（东）', 4: '巽宫（东南）',
  5: '中宫（正中）', 6: '乾宫（西北）', 7: '兑宫（西）', 8: '艮宫（东北）', 9: '离宫（南）',
};
function palaceLabel(p) {
  if (!p) return '—';
  const key = one(p.palace);
  if (p.center || key === '5') return '中宫';
  return PALACE_NAME[key] || (key ? `${key}宫` : '中宫');
}
/** 五行只有真取到才进括号：中宫对象不一定带 palaceElement，硬拼会输出「（）」 */
function withEl(label, el) { return el ? `${label}（${el}）` : label; }
/** 引擎在关系不确定时会给 'unknown'：落到文案里要先洗干净，别把调试值端给用户 */
function cleanState(v, fallback) {
  const s = one(v);
  if (!s || s === 'unknown' || s === 'undefined' || s === 'null' || s === '—') return fallback;
  return s;
}
const POS_LABEL = { 1: '初爻', 2: '二爻', 3: '三爻', 4: '四爻', 5: '五爻', 6: '上爻' };
/** a 对 b 的关系：生 / 克 / 被生 / 被克 / 同 */
function relation(a, b) {
  if (!a || !b) return '';
  if (a === b) return '同';
  if (SHENG[a] === b) return '生';
  if (SHENG[b] === a) return '被生';
  if (KE[a] === b) return '克';
  if (KE[b] === a) return '被克';
  return '';
}

// —— 中文长度：汉字按字算，连续拉丁/数字按 1 个算，标点不算 ——
const CJK_RE = /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/;
const WORD_RE = /[A-Za-z0-9]/;

export function lenCn(text) {
  const s = String(text == null ? '' : text);
  let n = 0;
  let inWord = false;
  for (const ch of s) {
    if (CJK_RE.test(ch)) { n += 1; inWord = false; }
    else if (WORD_RE.test(ch)) { if (!inWord) { n += 1; inWord = true; } }
    else inWord = false;
  }
  return n;
}

function one(x) { return x == null ? '' : String(x).trim(); }
function num(x, d = 0) { const v = Number(x); return Number.isFinite(v) ? v : d; }
function nowIso(input) {
  if (input) {
    const s = typeof input === 'string' ? input : (input.solar || input.datetime || input.at || '');
    if (s) return String(s).replace('T', ' ').slice(0, 16);
  }
  const d = new Date(); // allow-clock: 调用方没给 asOf 时，基准就是此刻；给了 asOf 这条不会走到
  const p = (v) => String(v).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

/** 按句读截到上限内，尽量不截半句 */
function clampCn(text, max) {
  let t = one(text).replace(/\s+/g, '');
  if (lenCn(t) <= max) return t;
  const parts = t.split(/(?<=[，,；;。、：:])/);
  let acc = '';
  for (const p of parts) {
    if (lenCn(acc + p) > max) break;
    acc += p;
  }
  if (acc) return acc.replace(/[，,；;。、：:]$/, '');
  // 单句就超：硬截
  let out = '';
  for (const ch of t) {
    const next = out + ch;
    if (lenCn(next) > max) break;
    out = next;
  }
  return out;
}

/** headline 必须在 12–40 之间；太短就用兜底句，太长就截 */
function fitHeadline(text, fallback) {
  let t = clampCn(text, LIMITS.headline[1]);
  if (lenCn(t) < LIMITS.headline[0]) {
    const f = clampCn(fallback || '', LIMITS.headline[1]);
    t = lenCn(f) >= LIMITS.headline[0] ? f : `${t}，先按这个方向走`;
  }
  return t;
}

// ——————————————————————————————————————————————
// chart_id：同盘同 id，跨会话可复现；不含时间，只含盘面与口径
// ——————————————————————————————————————————————

export function chartIdOf(r, opts = {}) {
  const system = one((r && r.system) || opts.system || 'unknown');
  const input = (r && r.input) || r || {};
  const key = [
    system,
    input.year, input.month, input.day, input.hour, input.minute,
    input.gender, input.datetime, input.leapMonth,
    (r && r.seed) != null ? r.seed : '',
    (r && r.cast && Array.isArray(r.cast.lines)) ? r.cast.lines.join('') : '',
    one(opts.question || (r && r.question) || ''),
    one(opts.mode || 'live'),
  ].join('|');
  return shortHash(key);
}

// ——————————————————————————————————————————————
// 因素去重：同义词归一 → 权重取 max → 证据累加 → 按权重降序取前 5
// ——————————————————————————————————————————————

export function dedupeFactors(system, factors) {
  const src = Array.isArray(factors) ? factors.filter((f) => f && one(f.name)) : [];
  const byKey = new Map();
  const order = [];
  for (const f of src) {
    const key = synonymKey(system, f.name) || one(f.name);
    const weight = Math.min(1, Math.max(0, num(f.weight, 0.5)));
    const refs = Array.isArray(f.evidence_refs) ? f.evidence_refs.filter(Boolean) : [];
    const prev = byKey.get(key);
    if (!prev) {
      byKey.set(key, {
        ...f,
        name: one(f.name),
        weight,
        evidence_refs: [...new Set(refs)],
        duplicate_count: 0,
        _key: key,
      });
      order.push(key);
      continue;
    }
    prev.duplicate_count += 1;
    prev.evidence_refs = [...new Set([...prev.evidence_refs, ...refs])];
    if (weight > prev.weight) {
      // 权重更高的那条接管表述，但保留累加后的证据与计次
      const merged = { ...f, name: prev.name, weight, evidence_refs: prev.evidence_refs, duplicate_count: prev.duplicate_count, _key: key };
      byKey.set(key, merged);
    }
  }
  const out = order.map((k) => byKey.get(k));
  out.sort((a, b) => (b.weight - a.weight) || 0);
  return out.slice(0, LIMITS.factors[1]).map((f) => {
    const { _key, ...rest } = f;
    return rest;
  });
}

/** M3 用：重复率 = 明细条数 / 去重后条数 */
export function duplicateRatio(system, factors) {
  const src = (Array.isArray(factors) ? factors : []).filter((f) => f && one(f.name));
  if (!src.length) return 1;
  const keys = new Set(src.map((f) => synonymKey(system, f.name) || one(f.name)));
  return src.length / keys.size;
}

// ——————————————————————————————————————————————
// L0+L1 纯文本渲染：字数、模糊词、术语越界都在这份文本上判
// ——————————————————————————————————————————————

export function renderL0L1(env) {
  if (!env) return '';
  const L = [];
  const v = env.verdict || {};
  L.push(one(v.headline));
  L.push(`方向：${DIRECTION_LABEL[v.direction] || ''}`);
  if (v.condition) L.push(one(v.condition));
  for (const f of env.factors || []) {
    L.push(`${one(f.name)}｜${one(f.state)}｜${one(f.impact)}`);
  }
  for (const t of env.timeline || []) {
    L.push([one(t.window), one(t.pace), one(t.note)].filter(Boolean).join('｜'));
  }
  for (const a of env.advice || []) L.push(one(a));
  L.push(one(env.risk));
  return L.filter(Boolean).join('\n');
}

export function countPhrase(text, phrase) {
  if (!phrase) return 0;
  let n = 0;
  let from = 0;
  for (;;) {
    const at = text.indexOf(phrase, from);
    if (at < 0) break;
    n += 1;
    from = at + phrase.length;
  }
  return n;
}

// ——————————————————————————————————————————————
// Stage C：校验器
// ——————————————————————————————————————————————

function err(field, rule_id, actual, expected) {
  return { field, rule_id, actual, expected };
}

export function validateEnvelope(env, opts = {}) {
  const t0 = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
  const errors = [];
  const system = one(opts.system || (env && env.meta && env.meta.system) || '_default');

  if (!env || typeof env !== 'object') {
    return { ok: false, errors: [err('envelope', 'ENVELOPE_REQUIRED', 'null', 'object')], ms: 0, fuzzy: 0, l0l1Chars: 0 };
  }
  if (one(env.schema_version) !== SCHEMA_VERSION) {
    errors.push(err('schema_version', 'SCHEMA_VERSION', one(env.schema_version), SCHEMA_VERSION));
  }

  const meta = env.meta || {};
  for (const k of ['system', 'chart_id']) {
    if (!one(meta[k])) errors.push(err(`meta.${k}`, 'META_REQUIRED', '', 'non-empty'));
  }
  if (!one(meta.mode)) errors.push(err('meta.mode', 'META_REQUIRED', '', 'live|eval'));
  if (!one(meta.generated_at)) errors.push(err('meta.generated_at', 'META_REQUIRED', '', 'iso'));

  // —— verdict ——
  const v = env.verdict || {};
  const hl = one(v.headline);
  const hlLen = lenCn(hl);
  if (hlLen < LIMITS.headline[0] || hlLen > LIMITS.headline[1]) {
    errors.push(err('verdict.headline', 'HEADLINE_LEN', hlLen, `${LIMITS.headline[0]}..${LIMITS.headline[1]}`));
  }
  if (!DIRECTIONS.includes(v.direction)) {
    errors.push(err('verdict.direction', 'DIRECTION_ENUM', one(v.direction), DIRECTIONS.join('|')));
  }
  if (!CONFIDENCES.includes(v.confidence)) {
    errors.push(err('verdict.confidence', 'CONFIDENCE_ENUM', one(v.confidence), CONFIDENCES.join('|')));
  }
  const needCondition = v.confidence === 'low' || v.direction === 'mixed';
  if (needCondition && !one(v.condition)) {
    errors.push(err('verdict.condition', 'CONDITION_REQUIRED', '', '若X，则Y'));
  }
  if (one(v.condition) && !/^若.+[，,].*则.+/.test(one(v.condition))) {
    errors.push(err('verdict.condition', 'CONDITION_FORMAT', one(v.condition), '若X，则Y'));
  }

  // —— factors ——
  const factors = Array.isArray(env.factors) ? env.factors : [];
  if (factors.length < LIMITS.factors[0] || factors.length > LIMITS.factors[1]) {
    errors.push(err('factors', 'FACTORS_COUNT', factors.length, `${LIMITS.factors[0]}..${LIMITS.factors[1]}`));
  }
  const whitelist = FACTOR_WHITELIST[system] || FACTOR_WHITELIST._default;
  const seenKeys = new Map();
  factors.forEach((f, i) => {
    const name = one(f && f.name);
    if (!name) {
      errors.push(err(`factors[${i}].name`, 'FACTOR_NAME_REQUIRED', '', 'non-empty'));
      return;
    }
    if (lenCn(name) > LIMITS.factorName) {
      errors.push(err(`factors[${i}].name`, 'FACTOR_NAME_LEN', lenCn(name), `<=${LIMITS.factorName}`));
    }
    if (!whitelist.includes(name) && !whitelist.some((w) => synonymKey(system, name) === synonymKey(system, w))) {
      errors.push(err(`factors[${i}].name`, 'FACTOR_NAME_WHITELIST', name, whitelist.join('|')));
    }
    const key = synonymKey(system, name) || name;
    if (seenKeys.has(key)) {
      errors.push(err(`factors[${i}].name`, 'FACTOR_NAME_DUP', name, `unique vs factors[${seenKeys.get(key)}]`));
    } else {
      seenKeys.set(key, i);
    }
    const impact = one(f && f.impact);
    if (lenCn(impact) > LIMITS.impact) {
      errors.push(err(`factors[${i}].impact`, 'FACTOR_IMPACT_LEN', lenCn(impact), `<=${LIMITS.impact}`));
    }
    if (!impact) errors.push(err(`factors[${i}].impact`, 'FACTOR_IMPACT_REQUIRED', '', 'non-empty'));
    const w = Number(f && f.weight);
    if (!Number.isFinite(w) || w < 0 || w > 1) {
      errors.push(err(`factors[${i}].weight`, 'FACTOR_WEIGHT_RANGE', f && f.weight, '0..1'));
    }
  });

  // —— timeline / advice / risk ——
  const timeline = Array.isArray(env.timeline) ? env.timeline : [];
  if (timeline.length > LIMITS.timeline) {
    errors.push(err('timeline', 'TIMELINE_COUNT', timeline.length, `<=${LIMITS.timeline}`));
  }
  const advice = Array.isArray(env.advice) ? env.advice.filter((a) => one(a)) : [];
  if (advice.length < LIMITS.adviceCount[0] || advice.length > LIMITS.adviceCount[1]) {
    errors.push(err('advice', 'ADVICE_COUNT', advice.length, `${LIMITS.adviceCount[0]}..${LIMITS.adviceCount[1]}`));
  }
  advice.forEach((a, i) => {
    if (lenCn(one(a)) > LIMITS.advice) {
      errors.push(err(`advice[${i}]`, 'ADVICE_LEN', lenCn(one(a)), `<=${LIMITS.advice}`));
    }
  });
  const risk = one(env.risk);
  if (!risk) errors.push(err('risk', 'RISK_REQUIRED', '', 'non-empty'));
  if (lenCn(risk) > LIMITS.risk) {
    errors.push(err('risk', 'RISK_LEN', lenCn(risk), `<=${LIMITS.risk}`));
  }

  // —— L0+L1 总字数 ——
  const text = renderL0L1(env);
  const l0l1Chars = lenCn(text);
  if (l0l1Chars > LIMITS.l0l1) {
    errors.push(err('l0l1', 'L0L1_LEN', l0l1Chars, `<=${LIMITS.l0l1}`));
  }

  // —— 模糊词 ——
  let fuzzyForbidden = 0;
  for (const w of FORBIDDEN) fuzzyForbidden += countPhrase(text, w);
  if (fuzzyForbidden > 0) {
    errors.push(err('l0l1', 'FUZZY_FORBIDDEN', fuzzyForbidden, 0));
  }
  let fuzzyHedge = 0;
  for (const w of HEDGE) fuzzyHedge += countPhrase(text, w);
  if (fuzzyHedge > LIMITS.fuzzyTotal) {
    errors.push(err('l0l1', 'FUZZY_HEDGE', fuzzyHedge, `<=${LIMITS.fuzzyTotal}`));
  }

  // —— 术语越界：T3 一律不许，T2 也不许留在 L0/L1 ——
  if (hasDict(system)) {
    const t3 = [];
    const t2 = [];
    for (const hit of scanTerms(system, text)) {
      if (hit.tier === 'T3') t3.push(hit.term);
      else if (hit.tier === 'T2') t2.push(hit.term);
    }
    if (t3.length) errors.push(err('l0l1', 'TERM_T3', t3.join('、'), 'none'));
    if (t2.length) errors.push(err('l0l1', 'TERM_T2', t2.join('、'), 'none'));
  }

  // —— 免责：正文 0 次，且必须挂页脚 ——
  let disBody = 0;
  for (const p of DISCLAIMER_PHRASES) disBody += countPhrase(text, p);
  if (disBody > 0) errors.push(err('l0l1', 'DISCLAIMER_IN_BODY', disBody, 0));
  const dis = env.disclaimer || {};
  if (one(dis.id) !== DISCLAIMER.id || one(dis.position) !== DISCLAIMER.position) {
    errors.push(err('disclaimer', 'DISCLAIMER_SHAPE', JSON.stringify(dis), '{"id":"std-v1","position":"footer"}'));
  }

  // —— 证据引用必须能落到 evidence 上 ——
  const evIds = new Set((Array.isArray(env.evidence) ? env.evidence : []).map((e) => one(e && e.id)));
  factors.forEach((f, i) => {
    for (const ref of (Array.isArray(f && f.evidence_refs) ? f.evidence_refs : [])) {
      if (!evIds.has(one(ref))) {
        errors.push(err(`factors[${i}].evidence_refs`, 'EVIDENCE_REF_MISSING', one(ref), 'existing evidence id'));
      }
    }
  });

  const t1 = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
  return { ok: errors.length === 0, errors, ms: Math.round((t1 - t0) * 100) / 100, fuzzy: fuzzyHedge + fuzzyForbidden, l0l1Chars };
}

// ——————————————————————————————————————————————
// Stage D：定向修复（只改超限字段，不动结论方向）
// ——————————————————————————————————————————————

export function repairEnvelope(env, errors, opts = {}) {
  const system = one(opts.system || (env && env.meta && env.meta.system) || '_default');
  const next = JSON.parse(JSON.stringify(env || {}));
  const rules = new Set((errors || []).map((e) => e.rule_id));

  if (rules.has('HEADLINE_LEN')) {
    next.verdict.headline = fitHeadline(next.verdict.headline, next.verdict.headline_fallback);
  }
  if (rules.has('CONDITION_REQUIRED') || rules.has('CONDITION_FORMAT')) {
    if (!/^若.+[，,].*则.+/.test(one(next.verdict.condition))) {
      next.verdict.condition = one(next.verdict.condition) && /^若/.test(one(next.verdict.condition))
        ? one(next.verdict.condition).replace(/^若/, '若条件成立，')
        : '若条件不齐，则先把可控的那部分做掉';
      if (!/则/.test(next.verdict.condition)) next.verdict.condition = '若条件不齐，则先把可控的那部分做掉';
    }
  }
  if (rules.has('FACTOR_IMPACT_LEN')) {
    for (const f of next.factors || []) f.impact = clampCn(f.impact, LIMITS.impact);
  }
  if (rules.has('ADVICE_LEN')) {
    next.advice = (next.advice || []).map((a) => clampCn(a, LIMITS.advice));
  }
  if (rules.has('RISK_LEN')) {
    next.risk = clampCn(next.risk, LIMITS.risk);
  }
  if (rules.has('TIMELINE_COUNT')) {
    next.timeline = (next.timeline || []).slice(0, LIMITS.timeline);
  }
  if (rules.has('ADVICE_COUNT')) {
    const a = (next.advice || []).filter((x) => one(x));
    next.advice = a.length ? a.slice(0, LIMITS.adviceCount[1]) : ['先把可控的一件事做掉'];
  }
  if (rules.has('FUZZY_FORBIDDEN') || rules.has('DETERMINISTIC')) {
    const strip = (s) => {
      let t = one(s);
      for (const w of FORBIDDEN) t = t.split(w).join('');
      return t.replace(/^[，,；;、\s]+/, '').trim();
    };
    next.verdict.headline = strip(next.verdict.headline);
    for (const f of next.factors || []) { f.impact = strip(f.impact); f.state = strip(f.state); }
    next.advice = (next.advice || []).map(strip).filter(Boolean);
    next.risk = strip(next.risk);
  }
  if (rules.has('FUZZY_HEDGE')) {
    // 只处理超额的：从头删多余的限额词所在分句
    const cut = (s, budget) => {
      let t = one(s);
      for (const w of HEDGE) {
        while (countPhrase(t, w) > 0 && budget.n > 0) {
          const at = t.lastIndexOf(w);
          const head = t.slice(0, at);
          const tail = t.slice(at + w.length);
          t = `${head}${tail}`;
          budget.n -= 1;
        }
      }
      return t;
    };
    const budget = { n: 1 }; // 允许留 1 个，另一处就地删
    next.verdict.headline = cut(next.verdict.headline, budget);
    next.advice = (next.advice || []).map((a) => cut(a, budget));
    next.risk = cut(next.risk, budget);
  }
  if (rules.has('TERM_T3') || rules.has('TERM_T2')) {
    const plainify = (s) => {
      let t = one(s);
      for (const tier of ['T3', 'T2']) {
        for (const term of termsByTier(system, tier)) {
          if (!term || !t.includes(term)) continue;
          const plain = termPlain(system, term);
          t = t.split(term).join(plain || '这一层细节');
        }
      }
      return t;
    };
    next.verdict.headline = plainify(next.verdict.headline);
    for (const f of next.factors || []) { f.state = plainify(f.state); f.impact = plainify(f.impact); }
    next.advice = (next.advice || []).map(plainify);
    next.timeline = (next.timeline || []).map((t) => ({ ...t, window: plainify(t.window), pace: plainify(t.pace), note: plainify(t.note) }));
    next.risk = plainify(next.risk);
  }
  if (rules.has('FACTOR_NAME_DUP')) {
    next.factors = dedupeFactors(system, next.factors);
  }
  if (rules.has('FACTOR_NAME_WHITELIST')) {
    const wl = FACTOR_WHITELIST[system] || FACTOR_WHITELIST._default;
    next.factors = (next.factors || []).filter((f) => {
      const nm = one(f.name);
      return wl.includes(nm) || wl.some((w) => synonymKey(system, nm) === synonymKey(system, w));
    });
  }
  // 兜底：两次修不好就把因素截到 3 条并存 degraded，不阻断用户看结果
  if (opts.final && Array.isArray(next.factors) && next.factors.length > 3) {
    next.factors = next.factors.slice(0, 3);
    next.degraded = true;
  }
  return next;
}

// ——————————————————————————————————————————————
// Stage A adapters：每个体系把已有事实摆成字段，不重算任何判断
// ——————————————————————————————————————————————

function ev(id, label, detail) { return { id, label: one(label), detail: one(detail) }; }

function dirSum(sum) { return sum > 0 ? 'positive' : sum < 0 ? 'negative' : 'mixed'; }

function confOf(sum, hard) {
  if (hard === 'low') return 'low';
  if (Math.abs(sum) >= 2) return 'high';
  if (Math.abs(sum) === 1) return 'medium';
  return 'low';
}

function currentDayun(r, nowStr) {
  const list = (r.dayun && Array.isArray(r.dayun.list)) ? r.dayun.list : [];
  if (!list.length) return { cur: null, next: null, prev: null };
  let idx = list.findIndex((d) => one(d.fromDate) <= nowStr && one(d.toDate) > nowStr);
  if (idx < 0) idx = 0;
  return { cur: list[idx], next: list[idx + 1] || null, prev: list[idx - 1] || null, index: idx };
}

function baziAdapter(r, opts) {
  const nowStr = nowIso(opts.asOf || r.asOf);
  const st = r.strength || {};
  const level = one(st.level) || '中和';
  const ys = (r.frame && r.frame.yongshen) || {};
  const favor = (ys.favor || []).slice(0, 3);
  const avoid = (ys.avoid || []).slice(0, 3);
  const cl = r.climate || {};
  const day = (r.pillars && r.pillars.day) || {};
  const dmStem = one(day.stem) || one(r.dayMaster && r.dayMaster.stem) || '';
  const dmEl = one(day.stemElement) || stemEl(dmStem);
  const { cur, next } = currentDayun(r, nowStr);

  const favorSet = new Set(favor);
  const avoidSet = new Set(avoid);
  const scoreOf = (el) => (favorSet.has(el) ? 1 : avoidSet.has(el) ? -1 : 0);
  const curStemEl = cur ? stemEl(cur.stem) : '';
  const curBranchEl = cur ? branchEl(cur.branch) : '';
  const sum = (scoreOf(curStemEl) + scoreOf(curBranchEl));
  const direction = cur ? dirSum(sum) : 'undetermined';
  const confidence = cur ? confOf(sum) : 'low';

  const needEl = one(cl.need && cl.need.element) || favor[0] || '';
  const climateKind = one(cl.kind) || '气候平和';
  const curGz = cur ? one(cur.ganzhi) : '当前';
  const tail = sum > 0 ? '助力，可往前推一步' : sum < 0 ? '偏耗，先守住再图进' : '一助一耗，边做边看条件';
  const headline = fitHeadline(
    `${dmStem}${dmEl}${level}、气候${climateKind}，宜取${needEl || '平衡'}；${curGz}运${tail}`,
    `${dmStem}${dmEl}${level}，当下按${favor.join('') || '平衡'}的方向走更省力`,
  );

  const factorLevelImpact = /身强|偏强/.test(level)
    ? '自己这股够用，别再往里加同类'
    : /身弱|偏弱/.test(level)
      ? '自身偏虚，先借外力再发力'
      : '两边持平，靠节奏不靠蛮力';

  const factors = [
    { id: 'f-strength', name: '日主强弱', state: `${level}·${num(st.score)}分`, impact: factorLevelImpact, weight: 0.9, evidence_refs: ['ev-strength'] },
    { id: 'f-yongshen', name: '用神', state: `用${favor.join('') || '—'}、忌${avoid.join('') || '—'}`, impact: `往${favor[0] || '平衡'}的方向走更省力`, weight: 0.85, evidence_refs: ['ev-yongshen'] },
  ];
  if (cur) {
    factors.push({
      id: 'f-dayun', name: '当前大运', state: `${curGz}·${one(cur.fromDate).slice(0, 7)} 起`,
      impact: sum > 0 ? '这十年帮着推，适合往前挪' : sum < 0 ? '这十年跟你较劲，适合守成' : '这十年半推半拽，看具体事',
      weight: 0.8, evidence_refs: ['ev-dayun'],
    });
  }
  const geju = one(r.frame && r.frame.primaryName);
  if (geju) {
    factors.push({
      id: 'f-geju', name: '格局', state: geju,
      impact: '结构定在这里，出手前先看条件齐不齐', weight: 0.6, evidence_refs: ['ev-geju'],
    });
  }

  const evidence = [
    ev('ev-strength', '日主强弱', `${level}｜得分 ${num(st.score)}｜${one(st.basis) || one(st.detail)}`),
    ev('ev-yongshen', '用神取向', `${one(ys.method)}｜喜 ${favor.join('、')}｜忌 ${avoid.join('、')}｜${one(ys.detail)}`),
  ];
  if (cur) {
    evidence.push(ev('ev-dayun', '当前大运', `${curGz}｜${cur.fromDate} 至 ${cur.toDate}｜起运 ${num(r.dayun && r.dayun.startAge && r.dayun.startAge.years)} 岁`));
  }
  if (geju) evidence.push(ev('ev-geju', '格局', `${geju}｜${one(r.frame && r.frame.primary && r.frame.primary.evidence)}`));
  evidence.push(ev('ev-climate', '气候', `${climateKind}｜${one(cl.narration) || one(cl.need && cl.need.why)}`));

  const timeline = [];
  if (cur) timeline.push({ window: `${one(cur.fromDate).slice(0, 10)} 起这十年`, pace: sum >= 0 ? '缓进' : '守', note: `${curGz}运` });
  if (next) timeline.push({ window: `${one(next.fromDate).slice(0, 10)} 起`, pace: '换挡', note: `换${one(next.ganzhi)}运，前后半年先收口` });

  const advice = [
    `盯住${needEl || favor[0] || '平衡'}这个方向，别反着加${one(cl.avoidElement) || avoid[0] || '同类'}`,
    '把手上三件事排个先后，别同时推',
  ];
  if (next) advice.push(`换 ${one(next.ganzhi)} 运前半年先收尾，别接太重的活`);

  return {
    verdict: { headline, direction, confidence, condition: direction === 'mixed' || confidence === 'low' ? `若${needEl || favor[0] || '平衡'}这条线能补上，则推进才稳` : '' },
    factors, timeline, advice,
    risk: `${one(cl.avoidElement) || avoid[0] || '同类'}太重时容易白耗力气`,
    evidence,
    conflicts: [
      { id: 'c-quming', topic: '用神取法', views: [
        { school: '调候优先', stance: `先按${climateKind}补气候，取 ${needEl || '—'}` },
        { school: '扶抑为主', stance: `按强弱补泄，取 ${favor.join('') || '—'}` },
      ], note: '两条路结论相同时最稳；相冲时本插件以调候为先，再拿扶抑校验' },
    ],
  };
}

// 十四主星的「一句话性质」。impact 这一栏要写结果、不写规则，灵不灵先不管，
// 但「定调就在这两三颗上」这种话对用户是零信息——所以按星给一句能落地的话。
const STAR_NATURE = {
  紫微: '惯于拿主意，扛责任也扛压力',
  天机: '脑子快、善谋划，容易想多',
  太阳: '外放热心，付出常多于回报',
  武曲: '认实效讲结果，不喜空话',
  天同: '图安稳，能享受也容易松劲',
  廉贞: '要强好胜，规矩和脾气都硬',
  天府: '善守成，盘子越大越端得稳',
  太阴: '细腻内敛，靠积累不靠冲',
  贪狼: '兴趣广人缘好，容易分心',
  巨门: '口才与是非同源，说话即战场',
  天相: '讲配合，擅长在中间调停',
  天梁: '有原则肯护人，也爱说教',
  七杀: '敢闯，上手就不肯回头',
  破军: '先破后立，推倒重来是常态',
};

function ziweiAdapter(r, opts) {
  const nowStr = nowIso(opts.asOf || r.asOf);
  // 年份只认 asOf（nowIso 已按它给串），拿不到就算 0，绝不在这里读系统时钟——
  // 一旦读钟，同一个盘隔天两份的虚岁就会变，M5 同盘一致率直接失守。
  const yParsed = Number(nowStr.slice(0, 4));
  const yearNow = Number.isFinite(yParsed) && yParsed > 1000 ? yParsed : 0;
  const birthYear = num(r.input && r.input.year, yearNow);
  const age = yearNow && birthYear ? yearNow - birthYear + 1 : 0;

  const palaces = r.palaces || [];
  const soulPalace = palaces.find((p) => p && p.isSoul) || {};
  const bodyPalace = palaces.find((p) => p && p.isBody) || {};
  const mainStars = (soulPalace.stars || []).filter((s) => s && s.type === '主星').map((s) => one(s.name));
  const soulBranch = one(soulPalace.branch) || one(r.soul && r.soul.branch);
  const soulBright = ((soulPalace.stars || []).find((s) => s && s.type === '主星') || {}).brightness || '';

  const dxList = r.daxianList || [];
  const dx = dxList.find((d) => Array.isArray(d.ages) && age >= d.ages[0] && age <= d.ages[1]) || dxList[0] || null;
  const yHits = ((r.flow && r.flow.year && r.flow.year.mutagenHits) || []).slice(0, 4);
  const dxHits = (dx && dx.mutagenHits) || [];

  const KEY_PALACES = ['命宫', '财帛', '官禄', '迁移', '夫妻'];
  const score = (hits) => hits.reduce((acc, h) => {
    if (!KEY_PALACES.includes(one(h.palace))) return acc;
    return acc + (one(h.type) === '忌' ? -1 : 1);
  }, 0);
  const sum = score(yHits) + (dxHits.length ? 0 : 0);
  const direction = yHits.length ? dirSum(sum) : 'undetermined';
  const confidence = yHits.length ? (Math.abs(sum) >= 2 ? 'high' : Math.abs(sum) === 1 ? 'medium' : 'low') : 'low';

  const starText = mainStars.length ? mainStars.slice(0, 2).join('') : '无正曜';
  const bodyName = one(bodyPalace.palace) || '—';
  const dxText = dx ? `${dx.ages[0]}–${dx.ages[1]}大限走${one(dx.palace)}` : '当前大限';
  const yKey = yHits.find((h) => one(h.type) === '忌');
  const yText = yKey ? `今年${one(yKey.star)}化忌入${one(yKey.palace)}` : (yHits[0] ? `今年${one(yHits[0].star)}化${one(yHits[0].type)}入${one(yHits[0].palace)}` : '今年四化未落关键宫');

  const headline = fitHeadline(
    `命宫${soulBranch}·${starText}，身宫${bodyName}；${dxText}，${yText}`,
    `命宫${soulBranch}·${starText}，${yText}，先按这条线看`,
  );

  const factors = [
    {
      id: 'f-soul', name: '命身格局', state: `${soulBranch}·${starText}${soulBright ? `·${soulBright}` : ''}`,
      impact: mainStars.length ? `${STAR_NATURE[mainStars[0]] || '性格偏稳，靠积累取胜'}，路数就照这个来` : '空宫借星，路数看对面那一宫',
      weight: 0.9, evidence_refs: ['ev-soul'],
    },
  ];
  if (dx) {
    factors.push({
      id: 'f-daxian', name: '当前大限', state: `${dx.ages[0]}–${dx.ages[1]}·${one(dx.palace)}`,
      impact: '这十年主战场在这一宫，资源先往这里放', weight: 0.85, evidence_refs: ['ev-daxian'],
    });
  }
  if (yHits.length) {
    factors.push({
      id: 'f-sihua', name: '四化落点',
      state: yKey
        ? `${one(yKey.star)}化忌入${one(yKey.palace)}`
        : `${one(yHits[0].star)}化${one(yHits[0].type)}入${one(yHits[0].palace)}`,
      impact: yKey ? '忌落的那一宫今年先别硬碰' : '今年落在顺的方向上，可以借力',
      weight: 0.8, evidence_refs: ['ev-sihua'],
    });
  }
  const career = palaces.find((p) => p && /官禄/.test(one(p.palace)));
  if (career) {
    const cs = (career.stars || []).filter((s) => s && s.type === '主星').map((s) => one(s.name));
    factors.push({
      id: 'f-career', name: '关键宫位', state: `官禄${one(career.branch)}·${cs.join('') || '无正曜'}`,
      impact: cs.length ? `${STAR_NATURE[cs[0]] || '出路顺其自然'}，出路往这边找` : '这一宫空，出路多靠外部机会', weight: 0.65, evidence_refs: ['ev-career'],
    });
  }

  const evidence = [
    ev('ev-soul', '命身', `命宫 ${soulBranch}｜主星 ${starText}${soulBright ? `｜${soulBright}` : ''}｜身宫 ${bodyName}｜${one(r.bureau && r.bureau.name)}`),
  ];
  if (dx) evidence.push(ev('ev-daxian', '当前大限', `${dx.ages[0]}–${dx.ages[1]} 岁｜宫位 ${one(dx.palace)}｜${dx.ganzhi}｜四化 ${(dx.mutagen || []).join('、')}`));
  if (yHits.length) evidence.push(ev('ev-sihua', '流年四化', `${one(r.flow && r.flow.year && r.flow.year.ganzhi)}｜${yHits.map((h) => `${one(h.star)}化${one(h.type)}入${one(h.palace)}`).join('、')}`));
  if (career) evidence.push(ev('ev-career', '官禄宫', `${one(career.branch)}｜${(career.stars || []).map((s) => one(s.name)).join('、')}`));
  const pat = r.patternSummary || {};
  evidence.push(ev('ev-pattern', '格局', `吉格 ${(pat.good || []).join('、') || '—'}｜中性 ${(pat.neutral || []).join('、') || '—'}｜需留意 ${(pat.bad || []).join('、') || '—'}｜${one(pat.note)}`));

  const timeline = [];
  if (dx) timeline.push({ window: `${dx.ages[0]}–${dx.ages[1]} 岁`, pace: sum >= 0 ? '缓进' : '守', note: `落${one(dx.palace)}` });

  const advice = [
    yKey ? `今年${one(yKey.palace)}的事先理顺再推进` : '今年顺势的先做，逆势的先谈条件',
    '把长期目标拆成三个月一段来推',
  ];

  return {
    verdict: { headline, direction, confidence, condition: direction === 'mixed' || confidence === 'low' ? '若忌落那一宫的事能先理顺，则后面才推得动' : '' },
    factors, timeline, advice,
    risk: yKey ? `${one(yKey.palace)}这块今年容易反复，别一次押满` : '别把流年当定局，只看趋势',
    evidence,
    conflicts: [
      { id: 'c-sihua', topic: '流年四化取干', views: [
        { school: '按流年天干', stance: `${one(r.flow && r.flow.year && r.flow.year.stem)} 干起四化` },
        { school: '按流年命宫宫干', stance: '以流年命宫所在宫的天干起四化' },
      ], note: '两种取法结论常同向，相冲时以流年天干为准' },
    ],
  };
}

function liuyaoAdapter(r, opts) {
  const ug = r.useGod || {};
  const ugs = r.useGodStrength || {};
  const hx = r.hexStrength || {};
  const body = r.body || {};
  const ben = r.ben || {};
  const yq = r.yingqi || {};
  const line = (ugs.lines || [])[0] || {};
  const hasMonthState = /旺|相|休|囚|死/.test(one(line.monthState));
  const monthState = hasMonthState ? one(line.monthState) : '未取到';
  const monthPart = hasMonthState ? `月建${monthState}、` : '';
  const dayRelRaw = cleanState(line.dayRelation, '平').replace(/^日/, '');
  const dayRel = /生|扶|克|泄|耗|比和/.test(dayRelRaw) ? dayRelRaw : '平';
  const kong = line.kong === true || ug.missing === true;
  const chong = !!(body.ben && body.ben.chong);
  const he = !!(body.ben && body.ben.he);

  const strongState = /旺|相/.test(monthState);
  let direction = 'mixed';
  if (kong) direction = 'negative';
  else if (chong && !strongState) direction = 'negative';
  else if (strongState && (dayRel === '生' || dayRel === '扶' || dayRel === '比和')) direction = 'positive';
  else if (he && strongState) direction = 'positive';
  const confidence = kong ? 'medium' : (strongState && (chong || he)) ? 'high' : 'medium';

  const gzName = one(ben.name) || '本卦';
  const bodyLabel = chong ? '六冲' : he ? '六合' : '常卦';
  const posNo = Number(line.position) || Number((ug.found || [])[0] && (ug.found || [])[0].position) || 0;
  const posName = one(line.name) || POS_LABEL[posNo] || '这一爻';
  const tempo = cleanState(yq.tempo, '平');
  const trigger = (yq.triggers || [])[0];
  const triggerText = trigger ? `${one(trigger.branch)}` : '';

  const headline = fitHeadline(
    `${one(ug.liuqin) || '用神'}在${posName}，${monthPart}日辰${dayRel}；${gzName}${bodyLabel === '常卦' ? '' : `属${bodyLabel}`}，应期${tempo}${triggerText ? `，先看${triggerText}` : ''}`,
    `这卦用神是${one(ug.liuqin) || '所问之事'}，${monthPart}日辰${dayRel}，应期${tempo}`,
  );

  const factors = [
    {
      id: 'f-yong', name: '用神状态', state: `月建${monthState}·日辰${dayRel}`,
      impact: strongState ? '这一爻有底气，事情推得动' : hasMonthState ? '这一爻气不足，事情推得慢' : '这一爻没拿到月令，只看日辰这一头',
      weight: 0.9, evidence_refs: ['ev-yong'],
    },
    {
      id: 'f-body', name: '卦体格局', state: `${gzName}${bodyLabel === '常卦' ? '' : `·${bodyLabel}`}`,
      impact: chong ? '整体在散，越推越薄' : he ? '整体在拢，能聚得住' : '整体平稳，看具体哪一爻动',
      weight: 0.8, evidence_refs: ['ev-body'],
    },
  ];
  if (hx.shi) {
    factors.push({
      id: 'f-shi', name: '世爻状态', state: `${POS_LABEL[hx.shi.position] || '世爻'}·${cleanState(hx.shi.monthState, '平')}`,
      impact: /旺|相/.test(cleanState(hx.shi.monthState, '')) ? '你这边扛得住，可以主动' : '你这边先泄气，别硬顶',
      weight: 0.7, evidence_refs: ['ev-shi'],
    });
  }
  const moving = (ben.lines || []).filter((l) => l && l.moving);
  factors.push({
    id: 'f-moving', name: '动爻作用', state: moving.length ? `${moving.map((l) => `${l.position}爻`).join('、')}动` : '六爻皆静',
    impact: moving.length ? '有推动力，事情会自己走一步' : '没有推动力，等外头的引子',
    weight: 0.6, evidence_refs: ['ev-moving'],
  });

  const evidence = [
    ev('ev-yong', '用神', `${one(ug.liuqin)}｜${one(line.name)}｜${one(line.branch)}${one(line.element)}｜月建${monthState}｜日辰${dayRel}${kong ? '｜旬空' : ''}`),
    ev('ev-body', '卦体', `${gzName}｜${one(ben.upper)}上${one(ben.lower)}下｜${one(ben.palace)}${bodyLabel === '常卦' ? '' : `｜${bodyLabel}`}`),
  ];
  if (hx.shi) evidence.push(ev('ev-shi', '世应', `世 ${POS_LABEL[hx.shi.position] || '—'}·${cleanState(hx.shi.monthState, '平')}｜应 ${POS_LABEL[hx.ying && hx.ying.position] || '—'}·${cleanState(hx.ying && hx.ying.monthState, '平')}`));
  evidence.push(ev('ev-moving', '动爻', moving.length ? moving.map((l) => `${l.position}爻 ${one(l.ganzhi)}`).join('、') : '无动爻，按卦辞与月日看'));
  if (yq.labels && yq.labels.length) evidence.push(ev('ev-yingqi', '应期', yq.labels.join('｜')));
  if (one(yq.tempoSay)) evidence.push(ev('ev-tempo', '应期说明', one(yq.tempoSay)));

  const timeline = [];
  if (yq.items && yq.items.length) {
    timeline.push({
      window: triggerText ? `逢${triggerText}${(trigger.labels || [])[0] ? `（${(trigger.labels || [])[0]}）` : ''}` : tempo,
      pace: tempo === '偏缓' ? '缓' : tempo === '偏速' ? '快' : '中',
      note: tempo === '偏速' ? '先动的那条线落地最快' : '等条件解除再推，别硬赶',
    });
  }

  const advice = [
    chong ? '先别追着要结果，把凭据留好' : '把节点定在一个字对应的日子上',
    '找中间人问一句，比自己猜快',
  ];

  return {
    verdict: { headline, direction, confidence, condition: direction === 'mixed' ? `若${triggerText || '用神'}这条线先动，则事情才有转机` : '' },
    factors, timeline, advice,
    risk: chong ? '整体在散，越急越容易两头空' : kong ? '这一爻落空，别先垫钱' : '无明显风险',
    evidence,
    conflicts: [
      { id: 'c-yongshen', topic: '用神取法', views: [
        { school: '按六亲取', stance: `所问之事归${one(ug.liuqin) || '六亲'}` },
        { school: '按时爻取', stance: '以起卦时辰的爻位为用' },
      ], note: '本插件默认按六亲取用；问事明确时两者指向常一致' },
    ],
  };
}

function qimenAdapter(r, opts) {
  const pal = r.palaces || [];
  const sz = r.siZhu || {};
  const dayStem = one(sz.day).slice(0, 1);
  const timeStem = one(sz.time).slice(0, 1);
  // 甲是旬首，奇门盘上不单独落宫：这句话不能写成「甲落—」，那读起来像数据坏了
  const stemPhrase = (st, p) => (st === '甲' ? '甲不单独落宫' : `${st}落${palaceLabel(p)}`);
  const center = r.centerPalace || null;
  const allPal = center ? [...pal, center] : pal;
  const findPalRaw = (stem) => allPal.find((p) => one(p.diPan) === stem) || allPal.find((p) => one(p.tianPan) === stem) || null;
  const findPal = findPalRaw;
  const pA = findPal(dayStem);
  const pB = findPal(timeStem);
  const rel = pA && pB ? relation(one(pA.palaceElement), one(pB.palaceElement)) : '';
  let sum = 0;
  if (rel === '克' || rel === '被生') sum = 1;
  else if (rel === '被克' || rel === '生') sum = -1;
  else sum = 0;
  if (pB && pB.kong) sum -= 1;
  const direction = (pA && pB) ? dirSum(sum) : 'undetermined';
  const confidence = (pA && pB) ? (Math.abs(sum) >= 2 ? 'high' : 'medium') : 'low';

  const relText = { 克: '你这边压得住', 被克: '对方压你一头', 生: '你在往外给', 被生: '外头在给你', 同: '两边同气' }[rel] || '关系未定';
  const gateA = one(pA && pA.gate) || '';
  const gateB = one(pB && pB.gate) || '';
  const ju = one(r.ju) || '';
  const star = one(r.zhiFu && r.zhiFu.star);

  const headline = fitHeadline(
    `${stemPhrase(dayStem, pA)}${gateA ? `·${gateA}` : ''}，${stemPhrase(timeStem, pB)}${gateB ? `·${gateB}` : ''}；${relText}${ju ? `，${ju}` : ''}`,
    `你这边落${palaceLabel(pA)}，事情落${palaceLabel(pB)}，${relText}`,
  );

  const factors = [
    {
      id: 'f-luogong', name: '用神落宫', state: `${dayStem}在${palaceLabel(pA)}·${timeStem}在${timeStem === '甲' ? '不落宫' : palaceLabel(pB)}`,
      impact: relText, weight: 0.9, evidence_refs: ['ev-luogong'],
    },
  ];
  const gy = (pA && pA.ganYing) || null;
  if (gy && one(gy.name)) {
    factors.push({
      id: 'f-geju', name: '关键格局', state: one(gy.name),
      impact: '这一格说的是当下的受力方式', weight: 0.75, evidence_refs: ['ev-geju'],
    });
  }
  factors.push({
    id: 'f-zhifu', name: '值符值使', state: `${star || '—'}值符·${one(r.zhiShi && r.zhiShi.gate) || '—'}值使`,
    impact: '主事的星与当差的门决定这盘的主调', weight: 0.7, evidence_refs: ['ev-zhifu'],
  });
  factors.push({
    id: 'f-shixiao', name: '时效窗口', state: one(r.jieqi) ? `${one(r.jieqi)}后两小时` : '本时辰内',
    impact: '奇门看的是这一段，过了这个时辰要重排', weight: 0.6, evidence_refs: ['ev-shixiao'],
  });

  const evidence = [
    ev('ev-luogong', '落宫', `日干 ${dayStem} → ${withEl(palaceLabel(pA), one(pA && pA.palaceElement))}${gateA ? `·${gateA}` : ''}｜时干 ${timeStem} → ${withEl(palaceLabel(pB), one(pB && pB.palaceElement))}${gateB ? `·${gateB}` : ''}｜关系 ${rel || '未知'}`),
    ev('ev-zhifu', '值符值使', `${star || '—'}｜${one(r.zhiFu && r.zhiFu.gong)}宫｜${one(r.zhiShi && r.zhiShi.gate)}｜${one(r.zhiShi && r.zhiShi.gong)}宫`),
    ev('ev-shixiao', '时效', `${one(r.jieqi)} ${one(r.jieqiTime)}｜${ju}｜旬首 ${one(r.xunshou)}`),
  ];
  if (gy && one(gy.name)) evidence.push(ev('ev-geju', '十干应克', `${one(gy.key)}｜${one(gy.name)}｜${one(gy.text)}`));
  if (r.kongWang && r.kongWang.length) evidence.push(ev('ev-kong', '空亡马星', `空 ${r.kongWang.join('、')}｜马 ${one(r.ma && r.ma.zhi)} 在 ${one(r.ma && r.ma.gong)} 宫`));

  const timeline = [{ window: `${one(r.jieqi) || '本时辰'}内有效`, pace: rel === '克' ? '快' : '缓', note: '过时辰要重排' }];

  const advice = [
    rel === '被克' ? '先绕开正面，从流程和中间人入手' : '把要办的事放在你落的那一宫对应的时段',
    '把条件谈清楚再落字，别赶时间',
  ];

  return {
    verdict: { headline, direction, confidence, condition: direction === 'mixed' || confidence === 'low' ? `若${timeStem}那边的条件先齐，则事情才推得动` : '' },
    factors, timeline, advice,
    risk: rel === '被克' ? '对方占着位，硬推容易白耗' : (pB && pB.kong ? '事情那一格落空，先别下重注' : '无明显风险'),
    evidence,
    conflicts: [
      { id: 'c-ju', topic: '起局流派', views: [
        { school: '拆补法', stance: '按节气拆补定局' },
        { school: '置闰法', stance: '按超神接气置闰定局' },
      ], note: '本插件默认拆补法；同一时辰不同流派可能差一局' },
    ],
  };
}

function tarotAdapter(r, opts) {
  const cards = (r.cards || []).filter((c) => c && one(c.name));
  const ups = cards.filter((c) => c.upright).length;
  const downs = cards.length - ups;
  const elems = {};
  for (const c of cards) {
    const e = one(c.element);
    if (e) elems[e] = (elems[e] || 0) + 1;
  }
  const topEl = Object.entries(elems).sort((a, b) => b[1] - a[1])[0];
  const future = cards.find((c) => /未来|结果|走向/.test(one(c.position))) || cards[cards.length - 1];
  let sum = ups - downs;
  if (future && !future.upright) sum -= 1;
  const direction = cards.length ? dirSum(sum) : 'undetermined';
  const confidence = cards.length >= 3 ? (Math.abs(sum) >= 2 ? 'high' : 'medium') : 'low';

  const core = cards.find((c) => /现在|核心|当下/.test(one(c.position))) || cards[0] || {};
  const coreName = one(core.name);
  const coreOri = core.upright ? '正位' : '逆位';
  const elText = topEl ? `${topEl[0]}×${topEl[1]}` : '元素未分';
  const dirText = sum > 0 ? '整体在往前推' : sum < 0 ? '整体卡着力' : '顺逆参半';

  const headline = fitHeadline(
    `${cards.length}张牌里${ups}正${downs}逆，${coreName}·${coreOri}定调；${elText}，${dirText}`,
    `${cards.length}张牌${dirText}，${coreName}${coreOri}是这一把的定调`,
  );

  const factors = [
    {
      id: 'f-core', name: '核心牌', state: `${coreName}·${coreOri}`,
      impact: clampCn(one(core.core) || '这张牌定了这一把的调子', LIMITS.impact),
      weight: 0.9, evidence_refs: ['ev-core'],
    },
    {
      id: 'f-element', name: '主导元素', state: elText,
      impact: topEl ? `${topEl[0]}重，重心在这一块` : '元素分散，没有单一重心',
      weight: 0.75, evidence_refs: ['ev-element'],
    },
  ];
  if (future) {
    factors.push({
      id: 'f-future', name: '关键牌位', state: `${one(future.position)}·${one(future.name)}${future.upright ? '正位' : '逆位'}`,
      impact: future.upright ? '走向是通的，按现在的路走就行' : '走向还没顺过来，得先修一处',
      weight: 0.8, evidence_refs: ['ev-future'],
    });
  }

  const evidence = cards.slice(0, 5).map((c, i) => ev(`ev-c${i}`, `${one(c.position)}·${one(c.name)}`, `${c.upright ? '正位' : '逆位'}｜${one(c.core)}｜${(c.keywords || []).join('、')}`));
  const idx = {};
  cards.slice(0, 5).forEach((c, i) => { idx[one(c.position)] = `ev-c${i}`; });
  if (future && idx[one(future.position)]) factors[factors.length - 1].evidence_refs = [idx[one(future.position)]];
  if (core && cards.indexOf(core) >= 0 && idx[one(core.position)]) factors[0].evidence_refs = [idx[one(core.position)]];
  evidence.push(ev('ev-element', '元素分布', Object.entries(elems).map(([k, v]) => `${k}×${v}`).join('、') || '—'));

  const timeline = [];
  if (future) timeline.push({ window: `${one(future.position)}`, pace: future.upright ? '缓进' : '守', note: `${one(future.name)}${future.upright ? '正位' : '逆位'}` });

  const advice = [
    future && !future.upright ? '先把卡住的那一处修好再往前' : '按现在的走法推三个月，再看一次',
    '把这张牌当镜子，写一句下一步做什么',
  ];

  return {
    verdict: { headline, direction, confidence, condition: direction === 'mixed' || confidence === 'low' ? `若${coreName}这股力量能顺过来，则走向才通` : '' },
    factors, timeline, advice,
    risk: sum < 0 ? '逆位偏多，别把期待押在一次决定上' : '无明显风险',
    evidence,
    conflicts: [
      { id: 'c-rws', topic: '牌义与逆位', views: [
        { school: 'RWS', stance: '逆位取阻滞与内化' },
        { school: '黄金黎明', stance: '按元素与占星对应取象' },
      ], note: '本插件按 RWS 牌义为主，元素对应作辅' },
    ],
  };
}

/** 其他体系：不硬造判断，用 plainSummary 已有的 lead/advice 摆成最小信封 */
// —— 大六壬：三传的走势与落点 ——
// 只判两件事：末传这一宫对「我」（日干）是什么关系，以及三传一路是递生还是递克。
// 课体名照原样给（贼克、重审这些是占课的门牌），但判断落在人话上。
const LIUQIN_PLAIN = {
  妻财: { good: 1, what: '钱与所得', move: '先把手里的账算清再谈下一步' },
  子孙: { good: 1, what: '解忧与福德', move: '先卸掉一件压着的事' },
  父母: { good: 1, what: '文书与答复', move: '等那份答复，别硬催' },
  官鬼: { good: -1, what: '压力与管束', move: '先弄清谁在卡你、卡的哪条规矩' },
  兄弟: { good: -1, what: '同辈与分利', move: '有人来分利，先把界线说明白' },
};

function daliurenAdapter(r, opts) {
  const sc = r.sanChuan || {};
  const chu = sc.chu || {};
  const zhong = sc.zhong || {};
  const mo = sc.mo || {};
  const geJu = r.geJu || {};
  const zhiOf = (c) => one(c.zhi) || '—';
  const moQin = cleanState(mo.liuQin, '未归六亲');
  const nature = LIUQIN_PLAIN[moQin] || { good: 0, what: '没归到六亲', move: '先回去看起点在哪' };
  const kongTail = !!one(mo.xunKong);
  const kongAny = [chu, zhong, mo].filter((c) => one(c.xunKong)).length;

  // 三传五行：初→中、中→末 各算一次生克，连着两次同向才算「一路」
  const e1 = branchEl(one(chu.zhi));
  const e2 = branchEl(one(zhong.zhi));
  const e3 = branchEl(one(mo.zhi));
  const l1 = relation(e1, e2);
  const l2 = relation(e2, e3);
  const flowUp = (l1 === '生' || l1 === '被生') && (l2 === '生' || l2 === '被生');
  const flowDown = (l1 === '克' || l1 === '被克') && (l2 === '克' || l2 === '被克');

  let sum = nature.good;
  if (flowUp) sum += 1;
  if (flowDown) sum -= 1;
  if (kongTail) sum = -1;
  const direction = kongTail ? 'negative' : dirSum(sum);
  const confidence = kongTail ? 'low' : Math.abs(sum) >= 2 ? 'high' : 'medium';

  const headline = fitHeadline(
    `事情起于${zhiOf(chu)}、经过${zhiOf(zhong)}、落在${zhiOf(mo)}；${kongTail ? '但末传落空，走到那步会改道' : `落点是${nature.what}`}`,
    `${zhiOf(chu)}起、${zhiOf(zhong)}过、${zhiOf(mo)}落`,
  );

  const condition = kongTail || direction === 'mixed'
    ? `若${nature.what}那一头先有回应，则这条路才走得下去`
    : '';

  const factors = [
    {
      id: 'f-geju', name: '课体格局',
      state: `${cleanState(geJu.name, '未取到课体')}${one(geJu.detail) ? `·${one(geJu.detail)}` : ''}`,
      impact: clampCn(kongAny ? `盘里有${kongAny}处落空，事情会空一段` : '课体本身没提示改道，按常规推', LIMITS.impact),
      weight: 0.8, evidence_refs: ['ev-geju'],
    },
    {
      id: 'f-flow', name: '三传走势',
      state: `${zhiOf(chu)}→${zhiOf(zhong)}→${zhiOf(mo)}`,
      impact: flowUp ? '一路递生，越往后越顺' : flowDown ? '一路递克，越往后越顶' : '中间会有反复，不会一次成',
      weight: 0.9, evidence_refs: ['ev-flow'],
    },
    {
      id: 'f-mo', name: '末传落点',
      state: `${zhiOf(mo)}（${moQin}·${one(mo.jiangFull) || '—'}）`,
      impact: kongTail ? '末传落空，走到那一步会改道' : `结果落在${nature.what}上`,
      weight: 0.85, evidence_refs: ['ev-mo'],
    },
  ];

  const evidence = [
    ev('ev-geju', '课体', `${cleanState(geJu.name, '—')}｜${cleanState(geJu.detail, '—')}｜日${one(r.dayGanZhi)}时${one(r.hourZhi)}`),
    ev('ev-flow', '三传', `初 ${zhiOf(chu)}｜中 ${zhiOf(zhong)}｜末 ${zhiOf(mo)}`),
    ev('ev-mo', '末传', `${zhiOf(mo)}｜${moQin}｜${one(mo.jiangFull) || '—'}${kongTail ? '｜空亡' : ''}`),
    ev('ev-yue', '月将', `${one(r.yueJiang && r.yueJiang.name)}（${one(r.yueJiang && r.yueJiang.zhi)}）｜贵人${one(r.guiren && r.guiren.zhi)}`),
  ];

  const timeline = [
    {
      window: `起手：${zhiOf(chu)}（${cleanState(chu.liuQin, '—')}·${one(chu.jiangFull) || '—'}）`,
      pace: '中',
      note: '这一步是事情的来处，先认出它',
    },
    {
      window: `落点：${zhiOf(mo)}（${moQin}·${one(mo.jiangFull) || '—'}）`,
      pace: kongTail ? '缓' : '中',
      note: kongTail ? '落空，先把条件补齐' : `这步更接近结果：${nature.what}`,
    },
  ];

  const advice = [
    nature.move,
    flowDown ? '中间已经连着两处相克，别把计划定死' : '按现在的走向，先推最小的那一步',
  ];

  return {
    verdict: { headline, direction, confidence, condition },
    factors, timeline, advice,
    risk: (kongTail ? '末传落空，走到头会改道' : `${nature.what}这条线上别一次押满`),
    evidence,
    conflicts: [
      { id: 'c-geju', topic: '课体命名', views: [
        { school: '九宗门（贼克/比用/涉害）', stance: `${cleanState(geJu.name, '—')}·${cleanState(geJu.detail, '—')}` },
        { school: '另有以课经总目取象', stance: '同一课在不同课经里叫法不同，取象重点也不同' },
      ], note: '课体只提示事情形态，不直接给结果' },
    ],
  };
}

// —— 梅花：体用生克给方向，互卦看过程，变卦看结果 ——
function meihuaAdapter(r, opts) {
  const bu = r.bodyUse || {};
  const ben = r.ben || {};
  const hu = r.hu || {};
  const bian = r.bian || {};
  const bodyT = one(bu.body && bu.body.trigram) || '—';
  const useT = one(bu.use && bu.use.trigram) || '—';
  const relFull = cleanState(bu.relation, '关系未定');
  // 引擎给的 relation 是整句（「体用比和，事顺而稳」「用克体（土克水），受阻受制」），
  // 这里只取关系本身：判断和措辞都按这五种分，别拿整句去比对。
  const relKey = /体克用/.test(relFull) ? '体克用'
    : /用克体/.test(relFull) ? '用克体'
      : /体生用/.test(relFull) ? '体生用'
        : /用生体/.test(relFull) ? '用生体'
          : /比和/.test(relFull) ? '比和' : '';
  const relShort = relKey || (relFull.split(/[（(，,]/)[0] || '关系未定').trim();
  const levelRaw = cleanState(bu.level, '平');
  const good = /吉/.test(levelRaw) ? 1 : /凶/.test(levelRaw) ? -1 : 0;
  const movingName = cleanState(r.movingName, '') || (r.moving ? `${r.moving}爻动` : '');
  const bianSame = one(bian.upper) === one(ben.upper) || one(bian.upper) === one(ben.lower);

  const direction = good > 0 ? 'positive' : good < 0 ? 'negative' : 'mixed';
  // 变卦与本体同一边（上卦或下卦相同），说明走向没换道，判断更稳
  const confidence = good === 0 ? 'low' : bianSame ? 'high' : 'medium';

  const headline = fitHeadline(
    `体${bodyT}、用${useT}，${relShort}；变卦落${one(bian.name) || '—'}`,
    `${relShort}，方向按这个看`,
  );
  const condition = direction === 'mixed' || confidence === 'low'
    ? `若${relShort === '体克用' ? '你先出手' : '对方那一步先动'}，则这件事才推得动`
    : '';

  const factors = [
    {
      id: 'f-tiyong', name: '体用关系',
      state: `${relShort}（${bodyT}/${useT}）`,
      impact: good > 0 ? '这件事在给你，推得动' : good < 0 ? '这件事在耗你，硬推更费' : '两边都不占，看动作',
      weight: 0.9, evidence_refs: ['ev-tiyong'],
    },
    {
      id: 'f-hu', name: '过程互卦',
      state: one(hu.name) || '—',
      impact: '中间这一段的样子，比结果更早出现在现实里',
      weight: 0.7, evidence_refs: ['ev-hu'],
    },
    {
      id: 'f-bian', name: '结果变卦',
      state: `${one(ben.name) || '本卦'}→${one(bian.name) || '—'}${movingName ? `（${movingName}）` : ''}`,
      impact: bianSame ? '变卦没换道，方向还是原来那个' : '变卦换了象，走到后面会转一手',
      weight: 0.8, evidence_refs: ['ev-bian'],
    },
  ];

  const evidence = [
    ev('ev-tiyong', '体用', `${bodyT}体｜${useT}用｜${relFull}｜判${levelRaw}`),
    ev('ev-hu', '互卦', one(hu.name) || '—'),
    ev('ev-bian', '变卦', `${one(ben.name) || '—'} → ${one(bian.name) || '—'}｜${movingName || '无动爻'}`),
    ev('ev-cuo', '错卦综卦', `错 ${one(r.cuo && r.cuo.name) || '—'}｜综 ${one(r.zong && r.zong.name) || '—'}`),
  ];

  const timeline = [
    {
      window: `过程：${one(hu.name) || '—'}`,
      pace: '中',
      note: '互卦这一段是事情中途的样子',
    },
    {
      window: `走向：${one(bian.name) || '—'}`,
      pace: good < 0 ? '缓' : '中',
      note: bianSame ? '换爻不换道，方向不变' : '换了象，后面会转一手',
    },
  ];

  // 体用四种关系各有各的说法：说反了比不说更糟，所以按关系分而不是只按吉凶分
  const ADVICE_BY_REL = {
    体克用: '主动权在你手上，先出手的那步别拖',
    用克体: '这一路都在耗你，先别加码',
    体生用: '你在往外给，先看清给的是不是必要的',
    用生体: '对方在给你，接住就行，别自己先加码',
    比和: '两边力量相当，靠动作分高下',
  };
  const advice = [
    ADVICE_BY_REL[relKey] || '先换个角度重问一次，看答案稳不稳',
    good > 0 ? '顺的那一头先动，别等条件齐' : '先把耗你的那一环找出来',
  ];

  return {
    verdict: { headline, direction, confidence, condition },
    factors, timeline, advice,
    risk: good < 0 ? '这一路都在耗你，硬顶只会更慢' : '变卦换象之后，原来的路数要跟着改',
    evidence,
    conflicts: [
      { id: 'c-quxiang', topic: '取象口径', views: [
        { school: '体用生克', stance: `体${bodyT}、用${useT}：${relShort}` },
        { school: '卦辞爻辞', stance: '同一卦按卦辞读，细节可以读出另一套' },
      ], note: '本插件只取体用这一层，卦辞留着当旁证' },
    ],
  };
}

// —— 合盘：不判配不配，判「怎么相处、哪一块要谈」 ——
function hepanAdapter(r, opts) {
  const score = r.score || {};
  const detail = r.detail || {};
  const dims = Array.isArray(r.dimensions) ? r.dimensions : [];
  const dimOf = (k) => dims.find((d) => d && d.key === k) || {};
  const stem = dimOf('stem');
  const gong = dimOf('gong');
  const wx = dimOf('wuxing');
  const tally = detail.tally || {};
  const total = num(score.total, 0);
  const goodN = num(tally.good, 0);
  const badN = num(tally.bad, 0);
  const a = r.a || {};
  const b = r.b || {};
  const aDm = cleanState(a.dayMaster, '—');
  const bDm = cleanState(b.dayMaster, '—');

  let sum = 0;
  if (num(stem.score) > 0) sum += 1; else if (num(stem.score) < 0) sum -= 1;
  if (num(gong.score) > 0) sum += 1; else if (num(gong.score) < 0) sum -= 1;
  if (num(wx.score) >= 15) sum += 1; else if (num(wx.score) <= 0) sum -= 1;
  if (goodN - badN >= 2) sum += 1; else if (badN > goodN) sum -= 1;
  const direction = dirSum(sum);
  const confidence = Math.abs(sum) >= 2 ? 'high' : Math.abs(sum) === 1 ? 'medium' : 'low';

  const clashes = (detail.crossBranches || []).filter((c) => c && num(c.score) < 0);
  const clashText = clashes.length ? `${one(clashes[0].a)}${one(clashes[0].b)}相冲` : '';
  const levelRaw = cleanState(score.level, '平');

  const headline = fitHeadline(
    `${aDm}×${bDm}，${levelRaw}；${sum > 0 ? '互补点比冲突点多' : sum < 0 ? '要谈的地方比顺的地方多' : '顺与卡差不多'}`,
    `${aDm}与${bDm}，看相处方式，不判成败`,
  );
  const condition = direction === 'mixed' || confidence === 'low'
    ? `若${clashText || '那几处节奏差'}能先说开，则相处会顺得多`
    : '';

  const factors = [
    {
      id: 'f-stem', name: '日主关系',
      state: `${aDm}×${bDm}（${num(stem.score)}）`,
      impact: num(stem.score) < 0 ? '有一方压力感偏重，得把话说开' : '两边气场不顶，容易接上',
      weight: 0.9, evidence_refs: ['ev-stem'],
    },
    {
      id: 'f-gong', name: '夫妻宫',
      state: `${cleanState(a.dayBranch, '—')}×${cleanState(b.dayBranch, '—')}（${num(gong.score)}）`,
      impact: num(gong.score) > 0 ? '这一块天生有默契，省力' : '这一块没借助力，好坏看经营',
      weight: 0.8, evidence_refs: ['ev-gong'],
    },
    {
      id: 'f-wx', name: '五行互补',
      state: `互补分 ${num(wx.score)}`,
      impact: num(wx.score) >= 15 ? '一方缺的正是另一方多的，能补上' : '互补有限，得靠各自填',
      weight: 0.85, evidence_refs: ['ev-wx'],
    },
    {
      id: 'f-tally', name: '合冲计数',
      state: `吉 ${goodN} · 凶 ${badN}`,
      impact: clashText ? `${clashText}是最明显的一处` : '跨盘没见明显的冲',
      weight: 0.7, evidence_refs: ['ev-tally'],
    },
  ];

  const evidence = [
    ev('ev-stem', '日主', `${aDm}｜${bDm}｜${cleanState(stem.text, '—')}`),
    ev('ev-gong', '夫妻宫', `${cleanState(a.dayBranch, '—')}｜${cleanState(b.dayBranch, '—')}｜${cleanState(gong.text, '—')}`),
    ev('ev-wx', '五行', `${cleanState(wx.text, '—')}｜互补分 ${num(wx.score)}`),
    ev('ev-tally', '合冲', `${cleanState(tally.lean, '—')}｜吉 ${goodN} 凶 ${badN}｜总分 ${total}`),
  ];

  const timeline = [];
  const advice = [
    sum < 0 ? '先把最容易吵的那件事定个规矩' : '互补点用起来，别各做各的',
    '一起看这张盘，别一个人看完拿去判断对方',
  ];

  return {
    verdict: { headline, direction, confidence, condition },
    factors, timeline, advice,
    risk: clashText ? `${clashText}这块节奏相反，别用同一套要求` : '分数只是相对刻度，不是及格线',
    evidence,
    conflicts: [
      { id: 'c-framing', topic: '取法口径', views: [
        { school: '以日柱为主', stance: `${aDm}×${bDm}，夫妻宫看日支` },
        { school: '以属相为主', stance: cleanState(detail.yearRelation && detail.yearRelation.label, '属相只影响表层') },
      ], note: '传统合婚以日柱为主，属相只看表层印象' },
    ],
  };
}

function defaultAdapter(r, opts) {
  const brief = r.brief || {};
  const chips = (brief.chips || []).filter(Boolean).slice(0, 3);
  const lead = one(brief.lead);
  const sections = (brief.sections || []).filter((s) => s && one(s.t));
  const adv = (brief.advice || []).filter((a) => one(a)).slice(0, 2).map((a) => clampCn(a, LIMITS.advice));

  const headline = fitHeadline(chips.length ? `${chips.join('、')}；${lead}` : lead, '这一盘先按盘面本身看，结论在下一条');
  const factors = [
    { id: 'f-core', name: '核心结论', state: chips.join('·') || '盘面已定', impact: clampCn(sections[0] ? one(sections[0].t) : lead, LIMITS.impact), weight: 0.9, evidence_refs: ['ev-core'] },
  ];
  if (sections[1]) {
    factors.push({ id: 'f-cond', name: '关键条件', state: one(sections[1].h), impact: clampCn(one(sections[1].t), LIMITS.impact), weight: 0.7, evidence_refs: ['ev-cond'] });
  }
  const evidence = [
    ev('ev-core', '盘面要点', lead),
    ...sections.slice(0, 4).map((s, i) => ev(`ev-s${i}`, one(s.h), one(s.t))),
  ];
  if (sections[1]) evidence.push(ev('ev-cond', one(sections[1].h), one(sections[1].t)));
  return {
    verdict: { headline, direction: 'mixed', confidence: 'low', condition: '若条件与盘面对得上，则这条结论才站得住' },
    factors,
    timeline: [],
    advice: adv.length ? adv : ['先把盘面上最扎眼的一处对上现实'],
    risk: '无明显风险',
    evidence,
    conflicts: [],
  };
}

export const ADAPTERS = {
  bazi: baziAdapter,
  ziwei: ziweiAdapter,
  liuyao: liuyaoAdapter,
  qimen: qimenAdapter,
  tarot: tarotAdapter,
  daliuren: daliurenAdapter,
  meihua: meihuaAdapter,
  hepan: hepanAdapter,
  _default: defaultAdapter,
};

// ——————————————————————————————————————————————
// 组装：adapter → 去重 → 校验 → 定向修复（≤2 轮）
// ——————————————————————————————————————————————

const _cache = new Map();

function cacheGet(key) {
  const hit = _cache.get(key);
  if (!hit) return null;
  return hit;
}
function cacheSet(key, value) {
  if (_cache.size >= 64) _cache.delete(_cache.keys().next().value);
  _cache.set(key, value);
}

/**
 * @param {object} r compute() 的结果（含 brief / summary）
 * @param {object} [opts] { system, asOf, mode:'live'|'eval', now, question, noCache }
 * @returns {object} OutputEnvelope
 */
export function buildEnvelope(r, opts = {}) {
  if (!r || typeof r !== 'object') return null;
  const system = one(opts.system || r.system) || '_default';
  const mode = one(opts.mode) || 'live';
  const chartId = chartIdOf(r, { ...opts, mode });
  const cacheKey = `${system}|${chartId}|${mode}`;
  if (!opts.noCache) {
    const hit = cacheGet(cacheKey);
    if (hit) return JSON.parse(JSON.stringify(hit));
  }

  const adapter = ADAPTERS[system] || ADAPTERS._default;
  let draft;
  try {
    draft = adapter(r, opts);
  } catch (e) {
    draft = defaultAdapter(r, opts);
    draft.degraded = true;
  }

  const meta = {
    system,
    chart_id: chartId,
    chart: one(draft.chart) || chartLabel(r, system),
    school: one(draft.school) || SCHOOL[system] || SCHOOL._default,
    mode,
    generated_at: nowIso(opts.now),
  };

  let env = {
    schema_version: SCHEMA_VERSION,
    meta,
    verdict: { ...draft.verdict },
    factors: dedupeFactors(system, draft.factors),
    timeline: (draft.timeline || []).filter((t) => t && one(t.window)).slice(0, LIMITS.timeline),
    advice: (draft.advice || []).filter((a) => one(a)),
    risk: one(draft.risk) || '无明显风险',
    evidence: draft.evidence || [],
    conflicts: draft.conflicts || [],
    disclaimer: { ...DISCLAIMER },
  };

  let check = validateEnvelope(env, { system });
  let rounds = 0;
  while (!check.ok && rounds < 2) {
    rounds += 1;
    env = repairEnvelope(env, check.errors, { system, final: rounds === 2 });
    check = validateEnvelope(env, { system });
  }
  if (!check.ok) {
    env.degraded = true;
    env.degraded_reason = check.errors.map((e) => `${e.rule_id}:${e.field}`).slice(0, 4).join('|');
  } else if (rounds > 0) {
    // 修好了就不该留降级标记：降级意味着「用户看到的版本有损失」，修好即无损失
    delete env.degraded;
    delete env.degraded_reason;
  }
  env.diagnostics = { rounds, ok: check.ok, l0l1: check.l0l1Chars, fuzzy: check.fuzzy };
  // 耗时绝不进 diagnostics：它随机器抖动，会让同盘两次输出不等，M5 一致率与分块对拍都会挂
  if (!opts.noCache) cacheSet(cacheKey, env);
  return JSON.parse(JSON.stringify(env));
}

function chartLabel(r, system) {
  if (system === 'bazi') {
    const d = (r.pillars && r.pillars.day) || {};
    return `${one(d.ganzhi) || '日柱'}｜${one(r.input && r.input.year)}`;
  }
  if (system === 'ziwei') return `${one(r.soul && r.soul.branch)}宫起｜${one(r.bureau && r.bureau.name)}`;
  if (system === 'liuyao') return one(r.ben && r.ben.name) || '本卦';
  if (system === 'qimen') return `${one(r.ju)}｜${one(r.zhiFu && r.zhiFu.star)}值符`;
  if (system === 'tarot') return `${(r.cards || []).length} 张·${one(r.spread)}`;
  if (system === 'daliuren') return `${one(r.dayGanZhi)}日 ${one(r.hourZhi)}时｜${one(r.geJu && r.geJu.name)}`;
  if (system === 'meihua') return `${one(r.ben && r.ben.name)}→${one(r.bian && r.bian.name)}`;
  if (system === 'hepan') return `${one(r.a && r.a.dayMaster)}×${one(r.b && r.b.dayMaster)}`;
  return one(r.summary).slice(0, 20) || system;
}

/** 追问复用：同一张盘只换问题，不重排盘（PRD 禁止事项） */
export function rebuildForFollowup(env, question) {
  if (!env) return null;
  const next = JSON.parse(JSON.stringify(env));
  next.meta = { ...next.meta, generated_at: nowIso() };
  next.question = one(question);
  const q = one(question);
  if (q) {
    const first = (next.advice || [])[0] || '';
    next.advice = [clampCn(`${first}`, LIMITS.advice), ...(next.advice || []).slice(1)].filter(Boolean);
  }
  delete next.diagnostics;
  return next;
}

/** 灰度：按 chart_id 分桶，ratio 是 0–100 */
export function pickVariant(chartId, ratio) {
  const r = Math.max(0, Math.min(100, Number(ratio)));
  if (r <= 0) return 'legacy';
  if (r >= 100) return 'envelope';
  // 按 base32 逐位累加取模：早先取「哈希里的数字位」会漏掉没有数字的哈希，
  // 那批 chart_id 全落 0，30% 灰度实测分到一半。用满整串字符才均匀。
  const h = shortHash(String(chartId || ''));
  let n = 0;
  for (let i = 0; i < h.length; i += 1) n = (n * 32 + h.charCodeAt(i)) % 100003;
  return (n % 100) < r ? 'envelope' : 'legacy';
}

export const OUTPUT_SCHEMA = {
  $id: 'dsh-metaphysics/output-envelope',
  version: SCHEMA_VERSION,
  required: ['schema_version', 'meta', 'verdict', 'factors', 'advice', 'risk', 'disclaimer'],
  properties: {
    schema_version: { const: SCHEMA_VERSION },
    meta: { required: ['system', 'chart_id', 'chart', 'school', 'mode', 'generated_at'] },
    verdict: {
      required: ['headline', 'direction', 'confidence'],
      properties: {
        headline: { type: 'string', minCn: LIMITS.headline[0], maxCn: LIMITS.headline[1] },
        direction: { enum: DIRECTIONS },
        confidence: { enum: CONFIDENCES },
        condition: { type: 'string', pattern: '^若.+[，,].*则.+' },
      },
    },
    factors: { type: 'array', minItems: 1, maxItems: 5 },
    timeline: { type: 'array', maxItems: 2 },
    advice: { type: 'array', minItems: 1, maxItems: 3 },
    risk: { type: 'string', maxCn: LIMITS.risk },
    evidence: { type: 'array' },
    conflicts: { type: 'array' },
    disclaimer: { const: DISCLAIMER },
  },
};
