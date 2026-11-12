// C3 对话桥替代方案：深链 / 复制 / 结构化参数。
//
// 背景：面板原本靠会话槽位 conversation.input.right 拿 inputActions，再把提问写进输入框。
// 那个槽位不稳定（宿主改过名、也可能根本没声明），桥一断用户就没有路把盘送进对话。
// 这里给三条不依赖宿主的通道，桥能用时仍然优先用桥：
//
//   1. 深链：把「排这张盘用的参数」编码进 URL 片段（#mp=<handle>&q=<问题>）。
//      打开链接的人（换台机器、发给朋友、自己收藏）能还原同一张盘，不必重报出生信息。
//   2. 复制：两档现成文本——完整提问（含盘面摘要与回答骨架）与一句话精简版。
//   3. 结构化参数：一段 JSON，助手可以直接拿 args 去调 compute，不必解析自然语言。
//
// 约定：
//   * 深链里用的是 C1 句柄（mc1.<body>.<校验位>），所以截断/改字会明确报错，不会静默排成另一张盘；
//   * 链接只带「排盘参数 + 一句问题」，不带摘要、不带解析——摘要可能有好几 KB，URL 装不下；
//   * 这里只做编解码与文案拼装，不排盘、不调用模型，node 与浏览器都能跑（不依赖 Buffer / btoa）。
import { encodeHandle, decodeHandle, HANDLE_PREFIX } from './handle.js';
import { askPrompt } from './followup.js';

/** 问题进链接前截断的长度：再长就交给「复制完整提问」那一档 */
export const LINK_MAX_QUESTION = 200;
/** 精简版里问题的截断长度 */
const BRIEF_MAX_QUESTION = 60;

const SYSTEM_LABEL = {
  bazi: '八字', ziwei: '紫微', liuyao: '六爻', meihua: '梅花', daliuren: '大六壬',
  qimen: '奇门', hepan: '合盘', tarot: '塔罗', almanac: '黄历', zeri: '择日',
  chenggu: '称骨', xiaoliuren: '小六壬', star: '星座', numerology: '生命数字',
  mbti: '人格', trend: '人生K线', fengshui: '风水', name: '起名', convert: '农历',
  constitution: '体质',
  wuyunliuqi: '运气',
  taiyi: '太乙',
};

const labelOf = (system) => SYSTEM_LABEL[system] || system || '未知体系';

/** 只保留 URL 片段能用的一段：去掉已有 hash，其余原样 */
function baseOf(base) {
  const s = String(base || '');
  const i = s.indexOf('#');
  return i < 0 ? s : s.slice(0, i);
}

function encodeQuestion(q) {
  try { return encodeURIComponent(q); } catch (e) { return ''; }
}

function decodeQuestion(s) {
  try { return decodeURIComponent(s); } catch (e) { return String(s || ''); }
}

/**
 * 参数 → 深链。没有可编码的参数（或参数里只有输出开关）时返回 ''。
 *
 * askLink({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'female' }, { question: '2027 年事业', base: url })
 *   → '<url>#mp=mc1.xxx.yyy&q=2027%20%E5%B9%B4%E4%BA%8B%E4%B8%9A'
 *
 * 也接受现成句柄：askLink({ handle: r.handle }, { question, base })。
 */
export function askLink(args = {}, opts = {}) {
  const o = opts || {};
  const raw = String(o.handle || (args && args.handle) || '').trim();
  const handle = raw || encodeHandle(args || {});
  if (!handle || !handle.startsWith(HANDLE_PREFIX)) return '';
  const q = String(o.question || '').trim().slice(0, LINK_MAX_QUESTION);
  const parts = [`mp=${handle}`];
  if (q) parts.push(`q=${encodeQuestion(q)}`);
  return `${baseOf(o.base)}#${parts.join('&')}`;
}

/**
 * 深链 → 参数。任何不合法都不抛异常，返回 { ok:false, code, message }，由调用方决定是
 * 静默忽略还是提示一句——分享出去的老链接、被聊天软件截断的链接都会走到这里。
 *
 * 认这几种写法：完整 URL、只有片段（#mp=…）、只有查询串（?mp=…）、裸的 mp=…
 */
export function parseAskLink(text) {
  const raw = String(text || '').trim();
  if (!raw) return { ok: false, code: 'E_LINK', message: '没有链接内容：请粘贴带 #mp= 的完整链接' };

  // 片段的优先级高于查询串：链接里同时有时，以片段为准（那是本插件自己写的）
  let body = '';
  const hashAt = raw.indexOf('#');
  if (hashAt >= 0 && raw.slice(hashAt + 1).trim()) body = raw.slice(hashAt + 1).trim();
  else {
    const qAt = raw.indexOf('?');
    if (qAt >= 0 && raw.slice(qAt + 1).trim()) body = raw.slice(qAt + 1).trim();
    else if (/^mp=/.test(raw)) body = raw;
  }
  if (!body) return { ok: false, code: 'E_LINK', message: '链接里没有 #mp= 片段：这不是本插件生成的深链' };

  const fields = {};
  for (const seg of body.split('&')) {
    if (!seg) continue;
    const eq = seg.indexOf('=');
    if (eq <= 0) continue;
    const k = seg.slice(0, eq);
    const v = seg.slice(eq + 1);
    if (k === 'mp') fields.mp = v;
    else if (k === 'q') fields.q = v;
  }
  if (!fields.mp) return { ok: false, code: 'E_LINK', message: '链接里没有 mp 参数（只有问题没有盘）：无法还原盘面' };

  let args;
  try {
    args = decodeHandle(fields.mp);
  } catch (e) {
    return { ok: false, code: (e && e.code) || 'E_HANDLE', message: (e && e.message) || '句柄无法解析' };
  }
  const question = fields.q ? decodeQuestion(fields.q).slice(0, LINK_MAX_QUESTION) : '';
  return {
    ok: true,
    handle: fields.mp,
    args,
    question,
    system: args.system || '',
    label: labelOf(args.system),
  };
}

const splitDateTime = (dt) => {
  const m = /^(\d{4}-\d{1,2}-\d{1,2})[T ](\d{1,2}:\d{2})/.exec(String(dt || '').trim());
  if (!m) return { date: '', time: '' };
  const [y, mo, d] = m[1].split('-');
  return { date: `${y}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`, time: m[2].padStart(5, '0') };
};

/**
 * 这些参数能原样填回表单；其余（partner / candidates / answers / mode / upper …）
 * 由调用方提示「未还原」——只报真的填回去的，不假装全还原了。
 */
const FORM_KEYS = ['gender', 'address', 'trueSolar', 'lateZi', 'lines'];

/**
 * 深链 → 表单初值。面板与独立页共用一份，避免两边各自猜字段名。
 * 返回 { tab, date, time, ... , question, restored[], rest{} }；rest 是没还原的参数，用于如实提示。
 */
export function formOf(parsed) {
  const p = parsed && parsed.ok ? parsed : null;
  const args = (p && p.args) || {};
  const dt = splitDateTime(args.datetime);
  const out = {
    tab: args.system || '',
    date: dt.date,
    time: dt.time,
    question: (p && p.question) || '',
    restored: [],
    rest: {},
  };
  if (out.tab) out.restored.push('system');
  if (dt.date) out.restored.push('datetime');
  for (const k of FORM_KEYS) {
    if (args[k] === undefined || args[k] === null) continue;
    out[k] = args[k];
    out.restored.push(k);
  }
  // 问题不是盘面参数，但它跟着链接走，单独记一笔
  if (out.question) out.restored.push('question');
  for (const [k, v] of Object.entries(args)) {
    if (k === 'system' || k === 'datetime' || FORM_KEYS.includes(k)) continue;
    out.rest[k] = v;
  }
  return out;
}

/** 未还原参数的提示文案：空对象返回 ''（不打扰） */
export function restNote(form) {
  const keys = Object.keys((form && form.rest) || {});
  if (!keys.length) return '';
  return `链接里还有 ${keys.length} 项没填回表单（${keys.join('、')}）：这些只在引擎调用里生效，页面上按默认值显示。`;
}

/**
 * 一张盘 → 三档复制文本 + 深链。
 *
 *   full       完整提问（与桥发出去的是同一份，含盘面摘要、层次与回答骨架）
 *   brief      一句话版：体系 + 句柄 + 问题，够助手认出是哪张盘
 *   structured 结构化参数（JSON），助手可直接照 args 调 compute
 *   link       深链（没有句柄时为空）
 */
export function askPackages(result, opts = {}) {
  const o = opts || {};
  const r = result || {};
  const system = r.system || '';
  const label = labelOf(system);
  const question = String(o.question || '').trim();
  const handle = String(r.handle || '').trim();

  let full = '';
  try {
    const p = askPrompt(r, { question, interpret: o.interpret });
    full = (p && p.text) || String(r.summary || '');
  } catch (e) {
    full = String(r.summary || '');
  }

  const briefQ = question
    ? (question.length > BRIEF_MAX_QUESTION ? `${question.slice(0, BRIEF_MAX_QUESTION)}…` : question)
    : '（未填问题：按摘要讲主线）';
  const brief = handle
    ? `【命理追问】${label}｜${handle}｜问：${briefQ}`
    : `【命理追问】${label}｜问：${briefQ}`;

  const args = {};
  if (handle) args.handle = handle;
  if (system) args.system = system;
  if (question) args.question = question;
  const structured = JSON.stringify({ tool: 'metaphysics', v: 1, args }, null, 2);

  const link = handle ? askLink({ handle }, { question, base: o.base }) : '';

  return { system, label, handle, question, full, brief, structured, link };
}

export default askPackages;
