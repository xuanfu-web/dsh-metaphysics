// C1 排盘句柄：把「排这张盘用的参数」压成一段自包含的短字符串。
//
// 为什么要自包含而不用内存缓存：工具每次调用可能落在不同进程里（宿主一次工具调用
// 一个进程），内存里的句柄拿到下一次就失效。这里把参数本身编码进句柄，
// 任何进程、任何会话都能还原——代价是句柄里带着输入，所以它是编码，不是加密。
//
// 用法：
//   const r = compute({ system: 'bazi', datetime: '1996-01-19T07:31', gender: 'male', address: '安徽池州' });
//   r.handle                       // 'mc1.eyJ... .a1b2c3d4'
//   compute({ handle: r.handle, asOf: 2030 })   // 只传增量，参数自动并回去
//
// 约定：
//   * 只收「影响盘面」的参数；trace / shadow / withInterpret / ask 这类输出开关不进句柄，
//     所以同一张盘无论要不要解析、要不要推导链，句柄都一样；
//   * 带校验位：句柄被截断或改了字符会报 E_HANDLE，而不是静默排成另一张盘；
//   * 键序固定，参数写法不同（例如先 system 后 datetime）也得到同一个句柄。
import { fail } from './fail.js';

const PREFIX = 'mc1.';

/**
 * 不进句柄的参数：它们只改输出形态或只对某一次追问有效，不影响盘面。
 * 反过来，seed / asOf / direction / 各流派开关都必须留下——少了它们就复现不出同一张盘。
 */
const SKIP = new Set([
  'handle', 'trace', 'shadow', 'shadowVersion', 'diff', 'withInterpret', 'detail', 'cross',
  'verifyPast', 'rectify', 'events', 'ask', 'followup', 'question', 'geocode', 'caliber',
  // 联网解析的详细 geo 会随 display_name 变化，同一张盘却换来不同句柄；只留 longitude。
  'geo', 'longitudeFromGeo',
  // 一句话改参是把原话翻成补丁：补丁已经落在其余参数里，原话本身不进句柄，
  // 否则同一张盘换个说法就换一个句柄，回放时还会再套一遍补丁。
  'revise',
]);

const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

/** 稳定序列化：对象键排序，数组按原序；只收 JSON 能表达的值 */
function stable(v) {
  if (Array.isArray(v)) return `[${v.map((x) => stable(x === undefined ? null : x)).join(',')}]`;
  if (isObject(v)) {
    const keys = Object.keys(v).filter((k) => v[k] !== undefined).sort();
    return `{${keys.map((k) => `${JSON.stringify(k)}:${stable(v[k])}`).join(',')}}`;
  }
  const s = JSON.stringify(v === undefined ? null : v);
  return s === undefined ? 'null' : s;
}

/** FNV-1a 32 位：足够挡手误改字与截断，不承担抗篡改 */
function checksum(text) {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}

// base64url 与 UTF-8 都自己实现：引擎要同时在 Node、浏览器与 vm 沙箱里跑，
// 不能依赖 Buffer，也不能假设宿主有 btoa / TextEncoder。
const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

function utf8Bytes(str) {
  const out = [];
  for (const ch of String(str)) {
    let cp = ch.codePointAt(0);
    if (cp < 0x80) out.push(cp);
    else if (cp < 0x800) out.push(0xc0 | (cp >> 6), 0x80 | (cp & 63));
    else if (cp < 0x10000) out.push(0xe0 | (cp >> 12), 0x80 | ((cp >> 6) & 63), 0x80 | (cp & 63));
    else out.push(0xf0 | (cp >> 18), 0x80 | ((cp >> 12) & 63), 0x80 | ((cp >> 6) & 63), 0x80 | (cp & 63));
  }
  return out;
}

function utf8String(bytes) {
  let out = '';
  for (let i = 0; i < bytes.length;) {
    const b = bytes[i];
    let cp;
    let n;
    if (b < 0x80) { cp = b; n = 1; }
    else if (b < 0xe0) { cp = b & 31; n = 2; }
    else if (b < 0xf0) { cp = b & 15; n = 3; }
    else { cp = b & 7; n = 4; }
    for (let k = 1; k < n; k++) cp = (cp << 6) | (bytes[i + k] & 63);
    i += n;
    out += String.fromCodePoint(cp);
  }
  return out;
}

function b64url(str) {
  const bytes = utf8Bytes(str);
  let out = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const a = bytes[i];
    const b = bytes[i + 1];
    const c = bytes[i + 2];
    out += B64[a >> 2];
    out += B64[((a & 3) << 4) | ((b === undefined ? 0 : b) >> 4)];
    if (b === undefined) break;
    out += B64[((b & 15) << 2) | ((c === undefined ? 0 : c) >> 6)];
    if (c === undefined) break;
    out += B64[c & 63];
  }
  return out;
}

function unb64url(s) {
  const bytes = [];
  let buf = 0;
  let bits = 0;
  for (const ch of s) {
    const v = B64.indexOf(ch);
    if (v < 0) throw new Error(`不是 base64url 字符：${ch}`);
    buf = (buf << 6) | v;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      bytes.push((buf >> bits) & 0xff);
    }
  }
  return utf8String(bytes);
}

/** 从参数里挑出要进句柄的那部分 */
export function handlePayload(args = {}) {
  const out = {};
  for (const [k, v] of Object.entries(args || {})) {
    if (SKIP.has(k) || v === undefined) continue;
    out[k] = v;
  }
  return out;
}

/**
 * 参数 → 句柄。参数里没有可编码内容时返回 ''（例如只传了 { trace: true }）。
 * @returns {string}
 */
export function encodeHandle(args = {}) {
  const payload = handlePayload(args);
  if (!Object.keys(payload).length) return '';
  const body = b64url(stable(payload));
  return `${PREFIX}${body}.${checksum(body)}`;
}

/**
 * 句柄 → 参数。任何不合法都抛 E_HANDLE，并在文案里说清是哪一步不对。
 * @returns {object}
 */
export function decodeHandle(handle) {
  if (typeof handle !== 'string' || !handle.trim()) {
    throw fail('E_HANDLE', 'handle 必须是非空字符串；没拿到句柄时照常传 system + datetime 等原始参数即可');
  }
  const s = handle.trim();
  if (!s.startsWith(PREFIX)) {
    throw fail('E_HANDLE', `handle 前缀不对（应以 ${PREFIX} 开头）：句柄来自旧版本或复制不全，重新排一次盘取新的 handle`);
  }
  const rest = s.slice(PREFIX.length);
  const dot = rest.lastIndexOf('.');
  if (dot <= 0) throw fail('E_HANDLE', 'handle 缺少校验位：复制时可能被截断，重新取一次');
  const body = rest.slice(0, dot);
  const sum = rest.slice(dot + 1);
  if (checksum(body) !== sum) {
    throw fail('E_HANDLE', 'handle 校验不通过：内容被改动或截断，重新排一次盘取新的 handle');
  }
  let payload;
  try {
    payload = JSON.parse(unb64url(body));
  } catch (e) {
    throw fail('E_HANDLE', 'handle 内容无法解析（不是本插件生成的句柄），重新排一次盘取新的 handle');
  }
  if (!isObject(payload)) throw fail('E_HANDLE', 'handle 内容不是参数对象，重新排一次盘取新的 handle');
  return payload;
}

/** 不能作为增量键的名字：`out['__proto__'] = v` 走的是 setter，会把原型换掉 */
const KEY_BLOCKED = new Set(['__proto__', 'constructor', 'prototype']);

/**
 * 含义由「哪个体系」决定的键：值本身不说明是哪套盘的输入。
 * 只列真正会坏事的那些——要么被工具层的入参守卫拦住（hour / date / mode），
 * 要么换到的体系恰好也读同一个键名（minute 与 hour 同属 name；action 被 fengshui 与 name 共用）。
 * 其余单体系键（num1–3 / upper / lines / count / 生肖…）只有原体系会读，留着也只是被忽略。
 */
const SYSTEM_KEYS = {
  hour: ['chenggu', 'xiaoliuren', 'name'],
  minute: ['name'],
  date: ['xiaoliuren'],
  mode: ['convert', 'meihua', 'xiaoliuren'],
  action: ['fengshui', 'name'],
};

/**
 * 换体系时，把句柄带进来的、新体系不认的输入键剔掉。
 *
 * 为什么：文档主推 `{ handle, system: "ziwei" }`（同一时间换一套盘看），而称骨 / 小六壬的句柄里
 * 一定带着 `hour`，convert / 梅花 / 小六壬的句柄一定带着 `mode`。这些键并回参数后，工具层的
 * 「hour 仅用于 chenggu / xiaoliuren」守卫会把它们当成用户本轮误传而直接报错——上一张盘的输入
 * 挡住了这一张盘。本次显式重给的键不动：那确实是用户这次的意思，该报错仍然报错。
 *
 * @param {object} merged 已并好句柄与增量的参数（原地修改）
 * @param {Set<string>} owned 本轮由调用方显式给出的键
 */
export function pruneForeignKeys(merged, owned) {
  if (!isObject(merged)) return merged;
  const system = merged.system;
  if (typeof system !== 'string' || !system) return merged;
  for (const [key, owners] of Object.entries(SYSTEM_KEYS)) {
    if (owned.has(key) || merged[key] === undefined) continue;
    if (owners.includes(system)) continue;
    delete merged[key];
  }
  return merged;
}

/** 调用方本轮显式给出的键（undefined 视同没给，与 resolveHandle 的合并口径一致） */
export function ownedKeys(...sources) {
  const out = new Set();
  for (const src of sources) {
    if (!isObject(src)) continue;
    for (const [k, v] of Object.entries(src)) {
      if (v !== undefined && k !== 'handle') out.add(k);
    }
  }
  return out;
}

/**
 * 把 handle 与增量参数并起来。没有 handle 时原样返回（深一层的浅拷贝，避免改调用方对象）。
 * 增量优先：{ handle, asOf: 2030 } 只覆盖 asOf，其余沿用原参数。
 */
export function resolveHandle(args = {}) {
  if (!isObject(args)) return args;
  const { handle, ...rest } = args;
  if (handle === undefined || handle === null || handle === '') return { ...rest };
  const base = decodeHandle(handle);
  // 显式的 undefined 当作「没传」：否则 { handle, datetime: undefined } 会把句柄里的日期抹掉
  const out = { ...base };
  for (const [k, v] of Object.entries(rest)) {
    if (v === undefined || KEY_BLOCKED.has(k)) continue;
    out[k] = v;
  }
  pruneForeignKeys(out, ownedKeys(rest));
  return out;
}

export const HANDLE_PREFIX = PREFIX;
export const handleChecksum = checksum;
