// 发布后核对：确认「版本条目」和「tarball 附件」两件事都真的落到了 registry。
//
// 为什么需要这一层：0.34.0 发布时遇到过一种半失败状态——packument 里已经有版本、
// 有 shasum、有签名，dist-tags.latest 也指过去了，但 tarball URL 一直 404。
// 这时 `npm publish` 的「✅ Published」和 `npm view` 都看不出问题，装包的人才会撞墙。
// 所以核对必须以「附件能下载 + 下载到的字节与 registry 记的 shasum 一致」为准。
//
// 本模块不联网时也能测：fetch / sleep / now 都可以注入。

import { createHash } from 'node:crypto';
import { gunzipSync } from 'node:zlib';

export const DEFAULT_POLL = {
  timeoutMs: 15 * 60 * 1000,
  intervalMs: 15000,
};

const sha1 = (bytes) => createHash('sha1').update(bytes).digest('hex');

const defaultSleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * 轮询核对一次发布是否完整可用。
 *
 * @param {object} opts
 * @param {string} opts.name 包名
 * @param {string} opts.version 版本号
 * @param {string[]} [opts.expectFiles] tarball 里必须出现的文件名
 * @param {number} [opts.expectFileCount] 期望文件数（不传则用 registry 的 fileCount）
 * @param {Function} [opts.fetchImpl] 注入的 fetch
 * @param {number} [opts.timeoutMs]
 * @param {number} [opts.intervalMs]
 * @param {Function} [opts.sleep]
 * @param {Function} [opts.onWait] 每轮等待前回调 ({ attempt, waitedMs, lastReason })
 * @returns {Promise<object>} { ok, reason, attempts, waitedMs, tarball, shasum, fileCount, latest, files }
 */
export async function verifyPublish(opts) {
  const {
    name,
    version,
    expectFiles = [],
    expectFileCount,
    fetchImpl = fetch,
    timeoutMs = DEFAULT_POLL.timeoutMs,
    intervalMs = DEFAULT_POLL.intervalMs,
    sleep = defaultSleep,
    onWait,
    registry = 'https://registry.npmjs.org',
  } = opts || {};

  if (!name || !version) throw new Error('verifyPublish 需要 name 与 version');

  const tarballUrl = `${registry}/${name}/-/${name}-${version}.tgz`;
  const started = Date.now();
  let attempt = 0;
  let lastReason = '未开始';

  for (;;) {
    attempt++;
    const result = await probeOnce({ registry, name, version, tarballUrl, fetchImpl, expectFiles, expectFileCount });
    if (result.ok) {
      return { ...result, attempts: attempt, waitedMs: Date.now() - started };
    }
    lastReason = result.reason;
    const waited = Date.now() - started;
    // 已经下载到字节、只是对不上（shasum/文件数/缺文件）：再等也不会变，直接报。
    if (result.fatal) {
      return { ...result, ok: false, attempts: attempt, waitedMs: waited };
    }
    if (waited >= timeoutMs) {
      return { ...result, ok: false, reason: `超时（${Math.round(waited / 1000)}s）：${lastReason}`, attempts: attempt, waitedMs: waited };
    }
    if (onWait) onWait({ attempt, waitedMs: waited, lastReason });
    await sleep(intervalMs);
  }
}

async function probeOnce({ registry, name, version, tarballUrl, fetchImpl, expectFiles, expectFileCount }) {
  let packument = null;
  try {
    const res = await fetchImpl(`${registry}/${name}`, { headers: { accept: 'application/json' } });
    if (res.ok) packument = await res.json();
  } catch { /* 网络抖动：当作还没就绪 */ }

  const versionDoc = packument && packument.versions ? packument.versions[version] : null;
  const latest = packument && packument['dist-tags'] ? packument['dist-tags'].latest : null;
  const recordShasum = versionDoc && versionDoc.dist ? versionDoc.dist.shasum : null;
  const recordCount = versionDoc && versionDoc.dist ? versionDoc.dist.fileCount : null;

  if (!versionDoc) {
    return { ok: false, reason: 'packument 里还没有这个版本', tarball: tarballUrl, latest, shasum: null, fileCount: null, files: [] };
  }

  let bytes = null;
  try {
    const res = await fetchImpl(tarballUrl);
    if (res.ok) {
      const buf = await res.arrayBuffer();
      bytes = Buffer.from(buf);
    }
  } catch { /* 附件还没落盘 */ }

  if (!bytes) {
    return {
      ok: false,
      reason: '版本条目已出现，但 tarball 下载不到（附件未落盘）',
      tarball: tarballUrl,
      latest,
      shasum: recordShasum,
      fileCount: recordCount,
      files: [],
    };
  }

  const got = sha1(bytes);
  if (recordShasum && got !== recordShasum) {
    return {
      ok: false,
      reason: `tarball 字节与 registry 记的 shasum 不一致（期望 ${recordShasum}，实际 ${got}）`,
      tarball: tarballUrl,
      latest,
      shasum: recordShasum,
      fileCount: recordCount,
      files: [],
      fatal: true,
    };
  }

  // 名字是明文写在 tar 头里的，但整个 tarball 是 gzip：要先解开再找文件名。
  let tarBytes = null;
  try {
    tarBytes = gunzipSync(bytes);
  } catch {
    return {
      ok: false,
      reason: 'tarball 不是有效的 gzip 包',
      tarball: tarballUrl,
      latest,
      shasum: recordShasum,
      fileCount: recordCount,
      files: [],
      fatal: true,
    };
  }

  const missing = expectFiles.filter((f) => !tarBytes.includes(Buffer.from(f, 'utf8')));
  if (missing.length) {
    return {
      ok: false,
      reason: `tarball 里缺少文件：${missing.join('、')}`,
      tarball: tarballUrl,
      latest,
      shasum: recordShasum,
      fileCount: recordCount,
      files: [],
      fatal: true,
    };
  }

  const want = expectFileCount == null ? recordCount : expectFileCount;
  if (want != null && recordCount != null && want !== recordCount) {
    return {
      ok: false,
      reason: `registry 记的文件数 ${recordCount} 与期望 ${want} 不符`,
      tarball: tarballUrl,
      latest,
      shasum: recordShasum,
      fileCount: recordCount,
      files: [],
      fatal: true,
    };
  }

  return {
    ok: true,
    reason: '附件可下载，shasum 与文件数一致',
    tarball: tarballUrl,
    latest,
    shasum: got,
    fileCount: recordCount,
    files: expectFiles,
    bytes: bytes.length,
  };
}
