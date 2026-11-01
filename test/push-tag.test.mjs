// tools/push-tag.mjs：发版最后一步「打 tag 并推」。
//
// 它存在的理由本身是个教训：release.mjs 提示 `git push origin v…`，而这台机器上
// GitHub 443 经常整段不通，tag 永远是「本地有、远端没有」。所以这里除了行为，
// 还要守住两条底线：--dry-run 绝不建 tag、绝不碰远端；SSH 兜底用完必须删临时 key。
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { ok, eq } from './_harness.mjs';

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const src = read('tools/push-tag.mjs');
const pkg = JSON.parse(read('package.json'));

const run = (args) => spawnSync(process.execPath, ['tools/push-tag.mjs', ...args], {
  cwd: root, encoding: 'utf8',
});

// ── ① 默认 tag 跟版本号走 ────────────────────────────────
{
  const r = run(['--dry-run']);
  eq('dry-run 退出码 0', r.status, 0);
  ok('默认 tag 取 package.json 版本', r.stdout.includes(`v${pkg.version}`), r.stdout.trim());
  ok('dry-run 明说会做哪两步', /会做：/.test(r.stdout) && /推送 refs\/tags\//.test(r.stdout), r.stdout.trim());
  ok('dry-run 不打印「已建 annotated tag」', !/已建 annotated tag/.test(r.stdout));
  ok('dry-run 不走 SSH 兜底', !/SSH 兜底/.test(r.stdout));
}

// ── ② dry-run 不产生副作用 ───────────────────────────────
{
  const tag = `v0.0.0-qa-dryrun`;
  const has = spawnSync('git', ['rev-parse', '--verify', '--quiet', `refs/tags/${tag}`], { cwd: root, encoding: 'utf8' });
  eq('样本 tag 事先不存在', has.status === 0, false);
  const r = run([tag, '--dry-run']);
  eq('指定 tag 的 dry-run 也退出 0', r.status, 0);
  ok('指定 tag 出现在报告里', r.stdout.includes(tag), r.stdout.trim());
  const after = spawnSync('git', ['rev-parse', '--verify', '--quiet', `refs/tags/${tag}`], { cwd: root, encoding: 'utf8' });
  eq('dry-run 之后仍然没有这个 tag', after.status === 0, false);
}

// ── ③ 参数与兜底接线 ────────────────────────────────────
{
  ok('tag 名不像版本号就拒绝', /tag 名不像版本号/.test(src));
  ok('--no-create 时本地缺 tag 直接失败', /--no-create/.test(src) && /本地没有 \$\{tag\}/.test(src));
  ok('建的是 annotated tag（带说明）', /'tag', '-a', tag/.test(src));
  ok('推的是 refs/tags/... 而不是 HEAD', /refs\/tags\/\$\{tag\}:refs\/tags\/\$\{tag\}/.test(src));
  ok('HTTPS 失败三次才换通道', /for \(let i = 1; i <= 3; i\+\+\)/.test(src));
  ok('SSH 兜底走 ssh.github.com:443', /ssh:\/\/git@ssh\.github\.com:443/.test(src));
  ok('SSH 兜底用临时 ed25519', /'ed25519'/.test(src) && /mkdtempSync\(path\.join\(os\.tmpdir\(\)/.test(src));
  ok('无论成败都删 deploy key', /DELETE/.test(src) && /keys\/\$\{keyId\}/.test(src));
  ok('临时目录在 finally 里清掉', /finally \{/.test(src) && /rmSync\(dir, \{ recursive: true, force: true \}\)/.test(src));
  ok('不读也不写 npm token', !/npmToken/.test(src));
  ok('凭据只从配置文件读，可用环境变量换路径', /PUSHTAG_CONFIG/.test(src) && /metaphysics-autopublish\.json/.test(src));
}

// ── ④ 发版链路里提得到这个工具 ──────────────────────────
{
  ok('package.json 有 push:tag 脚本', pkg.scripts && pkg.scripts['push:tag'] === 'node tools/push-tag.mjs', JSON.stringify(pkg.scripts && pkg.scripts['push:tag']));
  ok('release.mjs 的提示指向这条命令', /node tools\/push-tag\.mjs/.test(read('tools/release.mjs')));
}
