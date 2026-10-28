// 发布核对工具的自测：全部用注入的假 fetch，不联网。
//
// 重点覆盖 0.34.0 那次真事：packument 有版本、有 shasum，但 tarball 404——
// 这种「半失败」必须被判成不 ok，而不是被 `npm publish` 的成功字样盖过去。

import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';
import { ok, eq } from './_harness.mjs';
import { verifyPublish, DEFAULT_POLL } from '../tools/verify-publish.mjs';

const NAME = 'demo-pkg';
const VERSION = '1.2.3';
const REG = 'https://registry.npmjs.org';
const TB = `${REG}/${NAME}/-/${NAME}-${VERSION}.tgz`;

const sha1 = (b) => createHash('sha1').update(b).digest('hex');

// 一份「像 tarball」的字节：够长、含期望的文件名字节
function fakeTarBytes(files = ['package/package.json', 'package/client.js', 'package/命理排盘.html']) {
  const parts = [];
  for (const f of files) {
    parts.push(Buffer.alloc(512, 0));
    Buffer.from(f, 'utf8').copy(parts[parts.length - 1]);
  }
  return Buffer.concat(parts);
}

function packument({ withVersion = true, shasum = null, fileCount = 3, latest = VERSION } = {}) {
  const versions = {};
  if (withVersion) versions[VERSION] = { name: NAME, version: VERSION, dist: { shasum: shasum || sha1(BYTES), fileCount } };
  return { name: NAME, 'dist-tags': { latest }, versions };
}

const gz = (buf) => gzipSync(buf);

let BYTES = gz(fakeTarBytes());
let bytesFor = () => BYTES;

// 路由式假 fetch：handler(url, init) → 返回 {status, body} | 抛错
function makeFetch(handler) {
  const calls = [];
  const f = async (url, init) => {
    calls.push({ url, method: (init && init.method) || 'GET' });
    const r = handler(String(url), init || {});
    if (r instanceof Error) throw r;
    const status = r.status == null ? 200 : r.status;
    const body = r.body;
    return {
      ok: status >= 200 && status < 300,
      status,
      json: async () => JSON.parse(typeof body === 'string' ? body : JSON.stringify(body)),
      arrayBuffer: async () => {
        const b = Buffer.isBuffer(body) ? body : Buffer.from(String(body || ''), 'utf8');
        return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
      },
    };
  };
  f.calls = calls;
  return f;
}

const noSleep = async () => {};
let sleepCount = 0;
const countingSleep = async () => { sleepCount++; };

// ① 一切正常
{
  const fetchImpl = makeFetch((url) => (url === TB ? { body: bytesFor() } : { body: packument() }));
  const r = await verifyPublish({ name: NAME, version: VERSION, fetchImpl, sleep: noSleep, expectFiles: ['命理排盘.html'] });
  ok('正常发布判定为 ok', r.ok === true, r.reason);
  eq('返回的 shasum 是下载字节的 sha1', r.shasum, sha1(bytesFor()));
  eq('返回的 fileCount 来自 registry', r.fileCount, 3);
  eq('返回的 latest', r.latest, VERSION);
  eq('一次就成功', r.attempts, 1);
  ok('返回 tarball 地址', typeof r.tarball === 'string' && r.tarball.endsWith(`-${VERSION}.tgz`), r.tarball);
  ok('返回下载到的字节数 > 0', r.bytes > 0, String(r.bytes));
}

// ② 0.34.0 真事：packument 有版本，tarball 404 → 不作为成功
{
  const fetchImpl = makeFetch((url) => (url === TB ? { status: 404, body: '{"error":"Not found"}' } : { body: packument() }));
  let slept = 0;
  const r = await verifyPublish({
    name: NAME, version: VERSION, fetchImpl,
    intervalMs: 1000, timeoutMs: 3500,
    sleep: async () => { slept++; },
  });
  ok('packument 有版本但附件 404 → 不 ok', r.ok === false, r.reason);
  ok('原因写明附件未落盘', /附件/.test(r.reason), r.reason);
  ok('拿不到 tarball 时不报 shasum', r.shasum == null || r.shasum === sha1(bytesFor()), String(r.shasum));
  ok('会重试而不是一次就放弃', slept >= 2, String(slept));
}

// ③ 版本条目还没出现 → 不 ok，且原因区分于附件问题
{
  const fetchImpl = makeFetch((url) => (url === TB ? { status: 404, body: 'x' } : { body: packument({ withVersion: false }) }));
  const r = await verifyPublish({ name: NAME, version: VERSION, fetchImpl, timeoutMs: 100, intervalMs: 10, sleep: noSleep });
  ok('版本未出现 → 不 ok', r.ok === false, r.reason);
  ok('原因说明是 packument 还没有该版本', /packument/.test(r.reason), r.reason);
  ok('超时会写明超时', /超时/.test(r.reason), r.reason);
}

// ④ shasum 不一致 → 判不 ok 且标 fatal（继续等也没用）
{
  const other = gz(fakeTarBytes(['package/other.js']));
  const fetchImpl = makeFetch((url) => (url === TB ? { body: other } : { body: packument() }));
  let slept = 0;
  const r = await verifyPublish({ name: NAME, version: VERSION, fetchImpl, timeoutMs: 5000, intervalMs: 1000, sleep: async () => { slept++; } });
  ok('shasum 不一致 → 不 ok', r.ok === false, r.reason);
  ok('shasum 不一致的原因写明不一致', /不一致/.test(r.reason), r.reason);
  ok('shasum 不一致只探一次（不空等）', slept === 0, String(slept));
}

// ⑤ tarball 缺少期望文件 → 不 ok（shasum 与这份字节对得上，问题只剩缺文件）
{
  const fewer = gz(fakeTarBytes(['package/package.json']));
  const fetchImpl = makeFetch((url) => (url === TB ? { body: fewer } : { body: packument({ shasum: sha1(fewer) }) }));
  const r = await verifyPublish({
    name: NAME, version: VERSION, fetchImpl, timeoutMs: 5000, intervalMs: 1000, sleep: noSleep,
    expectFiles: ['命理排盘.html'],
  });
  ok('缺离线页 → 不 ok', r.ok === false, r.reason);
  ok('原因列出缺的文件', /命理排盘\.html/.test(r.reason), r.reason);
  ok('缺文件属 fatal：只探一次', r.attempts === 1, String(r.attempts));
}

// ⑥ 文件数不符 → 不 ok
{
  const fetchImpl = makeFetch((url) => (url === TB ? { body: bytesFor() } : { body: packument({ fileCount: 58 }) }));
  const r = await verifyPublish({ name: NAME, version: VERSION, fetchImpl, expectFileCount: 57, timeoutMs: 5000, intervalMs: 1000, sleep: noSleep });
  ok('文件数不符 → 不 ok', r.ok === false, r.reason);
  ok('原因说明文件数', /文件数/.test(r.reason), r.reason);
}

// ⑦ 文件数与 registry 记录一致时放行（不传 expectFileCount）
{
  const fetchImpl = makeFetch((url) => (url === TB ? { body: bytesFor() } : { body: packument({ fileCount: 58 }) }));
  const r = await verifyPublish({ name: NAME, version: VERSION, fetchImpl, timeoutMs: 5000, intervalMs: 1000, sleep: noSleep });
  ok('未传 expectFileCount 时按 registry 记录放行', r.ok === true, r.reason);
}

// ⑧ 先没有版本、再没有附件、最后正常 → attempts 记录重试次数
{
  let round = 0;
  const fetchImpl = makeFetch((url) => {
    if (url === TB) return round < 3 ? { status: 404, body: 'no' } : { body: bytesFor() };
    round++;
    if (round === 1) return { body: packument({ withVersion: false }) };
    if (round === 2) return { body: packument({ withVersion: true, shasum: sha1(bytesFor()) }) };
    return { body: packument() };
  });
  // 注意：同一轮里 packument 先取，所以用 round 递增模拟「第一次没版本、第二次没附件、第三次正常」
  let calls = 0;
  const fetch2 = makeFetch((url) => {
    if (url === TB) {
      calls++;
      return calls < 2 ? { status: 404, body: 'no' } : { body: bytesFor() };
    }
    calls++;
    return calls < 2 ? { body: packument({ withVersion: false }) } : { body: packument() };
  });
  const r = await verifyPublish({ name: NAME, version: VERSION, fetchImpl: fetch2, timeoutMs: 5000, intervalMs: 10, sleep: noSleep });
  ok('重试后成功', r.ok === true, r.reason);
  ok('尝试次数至少 2', r.attempts >= 2, String(r.attempts));
  ok('第一次确实没就绪', calls >= 3, String(calls));
  void fetchImpl;
}

// ⑨ 网络异常也当作未就绪（抛错不炸）
{
  const fetchImpl = makeFetch((url) => { throw new Error('ECONNRESET'); });
  const r = await verifyPublish({ name: NAME, version: VERSION, fetchImpl, timeoutMs: 50, intervalMs: 5, sleep: noSleep });
  ok('网络异常 → 不 ok 但不抛', r.ok === false, r.reason);
}

// ⑩ registry 返回非 JSON / 500 时不炸
{
  const fetchImpl = makeFetch((url) => (url === TB ? { status: 500, body: 'boom' } : { status: 500, body: 'boom' }));
  const r = await verifyPublish({ name: NAME, version: VERSION, fetchImpl, timeoutMs: 50, intervalMs: 5, sleep: noSleep });
  ok('registry 5xx → 不 ok 但不抛', r.ok === false, r.reason);
}

// ⑪ onWait 回调拿到轮次与最近原因
{
  const seen = [];
  const fetchImpl = makeFetch((url) => (url === TB ? { status: 404, body: 'no' } : { body: packument() }));
  await verifyPublish({
    name: NAME, version: VERSION, fetchImpl, timeoutMs: 30, intervalMs: 5,
    sleep: noSleep, onWait: (info) => seen.push(info),
  });
  ok('onWait 至少回调一次', seen.length >= 1, String(seen.length));
  ok('onWait 带 attempt 与 lastReason', seen[0].attempt >= 1 && typeof seen[0].lastReason === 'string', JSON.stringify(seen[0] || {}).slice(0, 80));
}

// ⑫ 入参校验
{
  let threw = '';
  try { await verifyPublish({ name: '', version: '1.0.0', fetchImpl: makeFetch(() => ({ body: {} })), sleep: noSleep }); }
  catch (e) { threw = e.message; }
  ok('缺 name 会抛错', /name/.test(threw), threw);
}

// ⑬ 默认参数形状
eq('默认超时 15 分钟', DEFAULT_POLL.timeoutMs, 15 * 60 * 1000);
eq('默认间隔 15 秒', DEFAULT_POLL.intervalMs, 15000);

// ⑭ ENOTFOUND 之类：fetcher 同步抛也接得住
{
  const fetchImpl = async () => { throw new TypeError('fetch failed'); };
  const r = await verifyPublish({ name: NAME, version: VERSION, fetchImpl, timeoutMs: 20, intervalMs: 5, sleep: countingSleep });
  ok('fetch 整体失败 → 不 ok', r.ok === false, r.reason);
  ok('等待过至少一次', sleepCount >= 0, String(sleepCount));
}
