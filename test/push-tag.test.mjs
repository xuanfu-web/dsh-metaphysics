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
// SSH 兜底的实现收敛到 tools/ssh-fallback.mjs（push-tag 与 autopublish 共用一份，
// 原是两处拷贝、同一个 bug 各错一遍）。所以传输层那几条要从共享模块里查。
const sshSrc = read('tools/ssh-fallback.mjs');
const sshCode = sshSrc
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/^\s*\/\/.*$/gm, '');
{
  ok('tag 名不像版本号就拒绝', /tag 名不像版本号/.test(src));
  ok('--no-create 时本地缺 tag 直接失败', /--no-create/.test(src) && /本地没有 \$\{tag\}/.test(src));
  ok('建的是 annotated tag（带说明）', /'tag', '-a', tag/.test(src));
  ok('推的是 refs/tags/... 而不是 HEAD', /refs\/tags\/\$\{tag\}:refs\/tags\/\$\{tag\}/.test(src));
  ok('HTTPS 失败三次才换通道', /for \(let i = 1; i <= 3; i\+\+\)/.test(src));
  ok('SSH 兜底接线到共享模块（不再各抄一份）',
    /pushOverSshWithKey/.test(src) && /from '\.\/ssh-fallback\.mjs'/.test(src));
  ok('SSH 兜底目标仍是 ssh.github.com', /ssh:\/\/git@ssh\.github\.com\//.test(sshSrc));
  ok('SSH 兜底用临时 ed25519', /'ed25519'/.test(sshSrc) && /mkdtempSync\(path\.join\(os\.tmpdir\(\)/.test(sshSrc));
  ok('无论成败都删 deploy key', /DELETE/.test(sshSrc) && /keys\/\$\{keyId\}/.test(sshSrc));
  ok('临时目录在 finally 里清掉', /finally \{/.test(sshSrc) && /rmSync\(dir, \{ recursive: true, force: true \}\)/.test(sshSrc));
  ok('不读也不写 npm token', !/npmToken/.test(src) && !/npmToken/.test(sshSrc));
  ok('凭据只从配置文件读，可用环境变量换路径', /PUSHTAG_CONFIG/.test(src) && /metaphysics-autopublish\.json/.test(src));
}

// ── ③b SSH 传输层：只剩 GIT_SSH 这一条路，且不许再回到会崩的写法 ──────────
// 这台机器上 msys git 一需要 sh -c 就崩（`couldn't create signal pipe, Win32 error 5`），
// core.sshCommand 与 GIT_SSH_COMMAND 都属「要起 sh」那一类，实测都不可用；
// GIT_SSH 传的是可执行文件路径，git 直接 exec，才稳。所以这里是硬约束，不是风格偏好。
{
  /* 断言只看代码：注释里为了解释「这两种写法为什么不能用」会提到它们，
     那不是用法。所以先把块注释与行注释剥掉再匹配。 */
  ok('用 GIT_SSH 传可执行文件而不传命令串', /GIT_SSH: sshExe/.test(sshCode));
  ok('不再用 core.sshCommand（会经 sh 崩）', !/core\.sshCommand/.test(sshCode));
  ok('不再用 GIT_SSH_COMMAND', !/GIT_SSH_COMMAND/.test(sshCode));
  ok('URL 不自己带端口（端口交给 config 的 Port 443）', !/ssh:\/\/git@ssh\.github\.com:443/.test(sshCode));
  ok('找不到原生 ssh 时明确跳过并说明原因', /SSH 兜底跳过：没找到 Windows 自带 OpenSSH/.test(sshSrc));
  ok('只用 Windows 自带 OpenSSH', /SystemRoot \|\| 'C:\\\\Windows', 'System32', 'OpenSSH', 'ssh\.exe'/.test(sshSrc));
  ok('私钥 ACL 收紧（太宽 Windows ssh 会忽略私钥）', /icacls/.test(sshSrc) && /\/inheritance:r/.test(sshSrc));
  ok('提供 --ssh-only 以便主动验证兜底', /--ssh-only/.test(src) && /跳过 HTTPS，直接走 SSH deploy key/.test(src));
}

// ── ③c ssh config 的进出必须成对，且能自愈上次崩溃残留 ────────────────────
// Windows OpenSSH 9.5p2 实测不认 HOME/USERPROFILE 重定向（写进覆盖后的
// .ssh/config，`ssh -G` 仍回 port 22），所以只能动真实 config——那就必须保证：
// 进去的原样出来；进程被 kill 留下的残块，下次运行先清掉。
{
  ok('有带标记的托管块', /dsh-metaphysics-managed/.test(sshSrc) && /# >>> \$\{SSH_MARKER\} >>>/.test(sshSrc));
  ok('装块前先剔掉旧块（同进程重跑不叠加）', /stripManagedBlock\(original\)/.test(sshSrc));
  ok('还原走 finally，且排在删 key 之前', /if \(restoreConfig\) \{ try \{ restoreConfig\(\); \}/.test(sshSrc));
  ok('原本没有 config 时还原成「删除」，不留空文件', /if \(existed\) fs\.writeFileSync\(file, cleaned/.test(sshSrc)
    && /else fs\.unlinkSync\(file\)/.test(sshSrc));
  ok('启动时清理上次残留', /已清掉上次运行残留在 ssh config 里的临时 Host 块/.test(src)
    && /clearStaleBlock/.test(src));
  ok('只在 deploy key 注册成功后才动 config',
    /keyId = added\.json\.id;[\s\S]{0,240}restoreConfig = installSshBlock\(key\)/.test(sshSrc));
}

// 托管块的增删是可机械验证的纯文本操作，直接跑真函数（从源码里切出来），不靠肉眼
{
  const start = sshSrc.indexOf('export function stripManagedBlock(');
  const end = sshSrc.indexOf('/** 私钥 ACL 太宽');
  ok('能定位到托管块实现', start > 0 && end > start);
  /* 切出来的是模块源码，带着 export 关键字；new Function 不认识它，去掉再跑 */
  const region = sshSrc.slice(start, end).replace(/^export /gm, '');
  const api = new Function('SSH_MARKER', `${region}\nreturn { stripManagedBlock, installSshBlock };`)('dsh-metaphysics-managed');

  const clean = api.stripManagedBlock([
    'Host github.com',
    '  User git',
    '# >>> dsh-metaphysics-managed >>>',
    'Host ssh.github.com',
    '  Port 443',
    '# <<< dsh-metaphysics-managed <<<',
    '',
    'Host work',
    '  HostName work.example',
    '',
  ].join('\n'));
  ok('剔块后用户原有配置一字不少', clean.includes('Host github.com') && clean.includes('Host work'));
  ok('剔块后不残留标记行', !/dsh-metaphysics-managed/.test(clean));
  ok('剔块后不留连空行', !/\n{3,}/.test(clean));

  // 崩溃残留：块没写完整（缺结束标记）也要能清掉，否则私钥早没了、ssh 一直失败
  const half = api.stripManagedBlock('Host a\n  User x\n# >>> dsh-metaphysics-managed >>>\nHost ssh.github.com\n  Port 443\n');
  ok('半截托管块（缺结尾标记）也能清掉', !/dsh-metaphysics-managed/.test(half) && half.includes('Host a'));

  const twice = api.stripManagedBlock(api.stripManagedBlock('Host a\n# >>> dsh-metaphysics-managed >>>\nX\n# <<< dsh-metaphysics-managed <<<\n'));
  eq('重复清洗是幂等的', twice.trim(), 'Host a');
}


// ── ④ 发版链路里提得到这个工具 ──────────────────────────
{
  ok('package.json 有 push:tag 脚本', pkg.scripts && pkg.scripts['push:tag'] === 'node tools/push-tag.mjs', JSON.stringify(pkg.scripts && pkg.scripts['push:tag']));
  ok('release.mjs 的提示指向这条命令', /node tools\/push-tag\.mjs/.test(read('tools/release.mjs')));
}
