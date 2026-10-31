// 影子盘指纹：同一组归一化参数 + 同一引擎版本 → 同一个短 ID。
//
// 两层 ID：
//   baseId —— 只含参数（system / 归一化参数 / seed / asOf），跨版本不变；
//   id     —— 再叠引擎版本，版本一变 ID 就变。
// 版本升级后重排同一张盘，baseId 相同、id 不同，据此自动对盘。
//
// 这里只做纯函数：不读时间、不读随机、不读 locale，保证换机器/换时区结果一致。

const ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'; // Crockford base32（去掉 I/L/O/U）

/** 稳定序列化：键排序、NFC、去 undefined、-0 → 0；不依赖 locale。 */
export function canonicalJson(value) {
  return JSON.stringify(sortValue(value));
}

function sortValue(value) {
  if (value === null) return null;
  const t = typeof value;
  if (t === 'string') return typeof value.normalize === 'function' ? value.normalize('NFC') : value;
  if (t === 'number') return Number.isFinite(value) ? (Object.is(value, -0) ? 0 : value) : null;
  if (t === 'boolean') return value;
  if (Array.isArray(value)) return value.map(sortValue);
  if (t === 'object') {
    const out = {};
    for (const key of Object.keys(value).sort()) {
      const item = value[key];
      if (item === undefined || typeof item === 'function' || typeof item === 'symbol') continue;
      out[key] = sortValue(item);
    }
    return out;
  }
  return null;
}

/** 35 位短哈希，编码成 7 个 base32 字符；纯字符运算，跨 Node / 浏览器一致。 */
export function shortHash(text) {
  const s = String(text);
  let h1 = 0x811c9dc5;
  let h2 = 0x9e3779b9;
  for (let i = 0; i < s.length; i += 1) {
    const code = s.charCodeAt(i);
    for (const byte of [code & 0xff, code >>> 8]) {
      h1 = Math.imul(h1 ^ byte, 0x01000193);
      h2 = Math.imul(h2 ^ byte, 0x85ebca6b);
    }
  }
  let n = (h1 >>> 0) * 8 + (h2 >>> 29); // < 2^35，Number 精确
  let out = '';
  for (let i = 0; i < 7; i += 1) {
    out = ALPHABET[n % 32] + out;
    n = Math.floor(n / 32);
  }
  return out;
}

/**
 * @param {{system:string, params:object, seed?:number|null, asOf?:string|null, version?:string}} input
 * @returns {{id:string, baseId:string, version:string, system:string, payload:string}}
 */
export function fingerprintOf(input = {}) {
  const system = String(input.system || '');
  const version = String(input.version || 'dev');
  const seed = input.seed === undefined || input.seed === null || input.seed === '' ? null : Number(input.seed);
  const asOf = input.asOf ? String(input.asOf) : null;
  const params = input.params && typeof input.params === 'object' ? input.params : {};
  const basePayload = canonicalJson({ system, params, seed, asOf });
  const fullPayload = canonicalJson({ base: basePayload, version });
  return {
    id: `LY-${shortHash(fullPayload)}`,
    baseId: `LY-${shortHash(basePayload)}`,
    version,
    system,
    payload: basePayload,
  };
}
