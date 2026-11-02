// 凭据闸自己的契约：旧版按扩展名白名单挑文件，正好漏掉 token 最常落地的地方——
// `.env`、`.npmrc`、以及没有后缀的凭据文件。而发布链路里有 `git add -A`
// （tools/autopublish.mjs），一次顺手 `echo TOKEN > .env` 就会被提交。
// 现在改成「除已知二进制后缀外全扫」，这里把三类必须命中 + 两类不该误伤钉住。
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { ok, eq } from './_harness.mjs';
import { scanSecrets, listTextFiles, SECRET_PATTERNS } from '../tools/check-secrets.mjs';

const root = path.resolve(import.meta.dirname, '..');

/** 造一个临时目录，返回相对路径 → 内容 都写进去 */
function fixture(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mp-secrets-'));
  for (const [rel, content] of Object.entries(files)) {
    const full = path.join(dir, rel);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, content);
  }
  return dir;
}
const withFixture = (files, fn) => {
  const dir = fixture(files);
  try {
    return fn(dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
};

const NPM = 'npm_' + 'A'.repeat(36);
const GH = 'ghp_' + 'b'.repeat(24);

// ── ① 三类旧版看不见的位置，现在必须命中 ──────────────────────
const cases = [
  ['.env 里的 npm token', { '.env': `NPM_TOKEN=${NPM}\n` }, '.env'],
  ['无扩展名的凭据文件', { credentials: `token ${GH}` }, 'credentials'],
  ['.npmrc（发布脚本最爱写）', { '.npmrc': `//registry.npmjs.org:_authToken=${NPM}` }, '.npmrc'],
  ['键值对形态（无平台前缀）', { 'ops/hooks.yml': 'webhook_secret: abcdef0123456789PQRSTU\n' }, 'ops/hooks.yml'],
  ['私钥头落在 .txt 里', { 'notes/backup.txt': '-----BEGIN RSA PRIVATE KEY-----\n' }, 'notes/backup.txt'],
];
for (const [label, files, want] of cases) {
  withFixture(files, (dir) => {
    const found = scanSecrets(dir);
    ok(`${label} → 命中`, found.some((p) => p.startsWith(want + ':')), found.join(' | ') || '（一条都没扫到）');
    ok(`${label} → 不回显内容`, !found.join(' ').includes(GH) && !found.join(' ').includes(NPM));
  });
}

// ── ② 两类不该误伤：二进制与干净仓库 ─────────────────────────
// 只有图像 / 字体 / 音视频这类「放 token 也不可能是源码」的后缀才免扫；
// .bin / .dat 这类含糊后缀仍然按文本扫，真二进制靠下面的含 NUL 判据退掉。
withFixture({ 'img/logo.png': Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x00, 0x01]), 'fonts/body.woff2': Buffer.from(NPM) }, (dir) => {
  const found = scanSecrets(dir);
  eq('图像与字体后缀不参与文本匹配', found.length, 0);
});
withFixture({ 'README.md': '本仓不含凭据；发布时从环境变量 NPM_TOKEN 读取。\n', 'engine/x.js': 'export const a = 1;\n' }, (dir) => {
  eq('干净目录零命中', scanSecrets(dir).length, 0);
});
withFixture({ 'dump/x.dat': Buffer.from(NPM + '\0\0\0') }, (dir) => {
  eq('含 NUL 的文件按二进制跳过', scanSecrets(dir).length, 0);
});

// ── ③ 仓库自己必须是干净的（这条把「宽扫」变成常态约束）───────
const repo = scanSecrets(root, { skip: ['tools/check-secrets.mjs', 'tools/check-patterns.mjs', 'test/secrets-gate.test.mjs'] });
ok('本仓无凭据明文', repo.length === 0, repo.join(' | '));
ok('扫描范围比旧版更宽（含点文件与无后缀文件）', (() => {
  const list = listTextFiles(root);
  return list.some((f) => f.startsWith('.')) || list.length > 300;
})(), `${listTextFiles(root).length} 个文件在扫`);

// ── ④ 形态表本身：别把规则写成一条谁也看不懂的正则 ─────────────
ok('形态表至少 5 条', SECRET_PATTERNS.length >= 5, `${SECRET_PATTERNS.length} 条`);
ok('每条都是「正则 + 说明」', SECRET_PATTERNS.every(([re, msg]) => re instanceof RegExp && typeof msg === 'string' && msg.length > 0));
