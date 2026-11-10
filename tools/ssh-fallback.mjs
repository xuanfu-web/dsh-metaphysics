// GitHub 443 被阻断时的 SSH 兜底：临时 ed25519 → 注册 deploy key → 推一次 → 删 key 与私钥。
//
// 原先 push-tag.mjs 与 autopublish.mjs 各抄了一份，问题也就各错一遍；这里收成一份。
//
// ── 为什么偏偏要 GIT_SSH + 真实 ssh config（都是在这台机器上实测出来的） ──────
//
// ① msys 的 ssh.exe 一旦被 git 通过 sh -c 拉起来就崩：
//    `0 [main] ssh (18948) .../usr/bin/ssh.exe: *** fatal error - couldn't create
//     signal pipe, Win32 error 5`。
//    git 只要拿到的是「命令串」就必然过 sh —— core.sshCommand 与 GIT_SSH_COMMAND
//    都属此类（实测 GIT_SSH_COMMAND 先报 `ssh variant 'simple' does not support
//    setting port`，把 variant 设对之后仍然要起 sh，照样崩）。
//    GIT_SSH 传的是「可执行文件路径」，git 直接 exec、不经 sh，只有它稳。
//
// ② Windows OpenSSH 9.5p2 不认环境变量里改的 HOME / USERPROFILE：
//    把 `Host probe-test / Port 2222` 写进覆盖后的 .ssh/config，
//    `ssh -G probe-test` 仍然回 `port 22`、`identitiesonly no`（两档都试过）。
//    所以私钥只能靠**真实** %USERPROFILE%\.ssh\config 的 Host 块交代。
//
// 于是既不能改用户的 home，也不能假装 config 可以重定向，只能：往真实 config 里
// 加一段带标记的 Host 块，用完原样还原；并在开头清掉上次崩溃残留的同名块。
// 用户原有内容一个字节都不动：有就追加、没有就新建、还原时依原样删或写回。

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export const SSH_MARKER = 'dsh-metaphysics-managed';

/** 只用 Windows 自带 OpenSSH：msys 那份走 sh 会崩，宁可不兜底也别引到必败的路上 */
export function findSshExecutable(envVar = 'METAPHYSICS_SSH') {
  if (process.env[envVar]) return process.env[envVar];
  if (process.platform !== 'win32') return 'ssh';
  const native = path.join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'OpenSSH', 'ssh.exe');
  try { if (fs.existsSync(native)) return native; } catch (e) { /* 返回 null */ }
  return null;
}

export function sshConfigPath() {
  return path.join(os.homedir(), '.ssh', 'config');
}

/** 去掉本工具留下的块（含崩溃残留）；可重复调用，结果稳定 */
export function stripManagedBlock(text) {
  const begin = `# >>> ${SSH_MARKER} >>>`;
  const end = `# <<< ${SSH_MARKER} <<<`;
  let out = String(text);
  for (;;) {
    const i = out.indexOf(begin);
    if (i < 0) break;
    const j = out.indexOf(end, i);
    const cut = j < 0 ? out.length : j + end.length;
    out = out.slice(0, i) + out.slice(cut);
  }
  return out.replace(/\n{3,}/g, '\n\n');
}

/** 清掉上次运行崩溃残留的块；返回是否真的清过 */
export function clearStaleBlock(file = sshConfigPath()) {
  try {
    if (!fs.existsSync(file)) return false;
    const raw = fs.readFileSync(file, 'utf8');
    const cleaned = stripManagedBlock(raw);
    if (cleaned === raw) return false;
    fs.writeFileSync(file, cleaned, 'utf8');
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * 临时把一段 Host 块装进真实 ssh config；返回还原函数。
 * 原本没有 config 文件时，还原就删掉它，不留空文件。
 */
export function installSshBlock(keyPath, file = sshConfigPath()) {
  const dir = path.dirname(file);
  fs.mkdirSync(dir, { recursive: true });
  const existed = fs.existsSync(file);
  const original = existed ? fs.readFileSync(file, 'utf8') : '';
  const cleaned = stripManagedBlock(original);
  const block = [
    `# >>> ${SSH_MARKER} >>>`,
    'Host ssh.github.com',
    '  HostName ssh.github.com',
    '  Port 443',
    '  User git',
    `  IdentityFile ${String(keyPath).replace(/\\/g, '/')}`,
    '  IdentitiesOnly yes',
    '  BatchMode yes',
    '  StrictHostKeyChecking no',
    '  UserKnownHostsFile /dev/null',
    `# <<< ${SSH_MARKER} <<<`,
    '',
  ].join('\n');
  fs.writeFileSync(file, `${cleaned.replace(/\n*$/, '\n')}${block}`, 'utf8');
  return () => {
    try {
      if (existed) fs.writeFileSync(file, cleaned, 'utf8');
      else fs.unlinkSync(file);
    } catch (e) { /* 还原失败不该盖住推送结果 */ }
  };
}

/** 私钥 ACL 太宽 Windows ssh 会直接忽略它，收紧到只给当前用户 */
export function lockKeyAcl(keyPath) {
  if (process.platform !== 'win32') return;
  const user = process.env.USERNAME;
  if (!user) return;
  spawnSync('icacls', [keyPath, '/inheritance:r', '/grant:r', `${user}:F`], { encoding: 'utf8' });
}

/**
 * 用临时 deploy key 把一组 refs 推到 GitHub。
 *
 * @param {object} o
 * @param {object} o.cfg           需含 githubToken
 * @param {{owner:string,repo:string}} o.slug
 * @param {(method:string, apiPath:string, body?:object)=>Promise<{ok:boolean,status:number,json:any,text:string}>} o.ghApi
 * @param {(args:string[], opts:object)=>any} o.git  以 root 为 cwd 执行 git
 * @param {(msg:string)=>void} o.log
 * @param {string[]} o.refspecs    例如 ['refs/tags/v0.63.0:refs/tags/v0.63.0'] 或 ['HEAD:main']
 * @param {string} o.label         日志里怎么称呼这次推送
 * @param {string} o.keygenName    ssh-keygen 可执行文件
 * @param {string} [o.dirPrefix]   临时目录前缀
 * @returns {Promise<boolean>}
 */
export async function pushOverSshWithKey(o) {
  const { cfg, slug, ghApi, git, log, refspecs, label } = o;
  const sshExe = findSshExecutable(o.sshEnvVar);
  if (!sshExe) {
    log('SSH 兜底跳过：没找到 Windows 自带 OpenSSH（msys 那份经 sh 会崩，不能用）');
    return false;
  }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), o.dirPrefix || 'dsh-mp-ssh-'));
  const key = path.join(dir, 'id_ed25519');
  let keyId = null;
  let restoreConfig = null;
  try {
    const gen = spawnSync(o.keygenName, ['-t', 'ed25519', '-N', '', '-C', o.keyComment || 'metaphysics-ssh-fallback', '-f', key], { encoding: 'utf8' });
    if (gen.status !== 0) { log('SSH 兜底失败：ssh-keygen 起不来\n' + (gen.stderr || '')); return false; }
    const pub = fs.readFileSync(`${key}.pub`, 'utf8').trim();
    const added = await ghApi('POST', `/repos/${slug.owner}/${slug.repo}/keys`, {
      title: `${o.keyTitle || 'ssh fallback'} ${new Date().toISOString()}`,
      key: pub,
      read_only: false,
    });
    if (!added.ok || !added.json || !added.json.id) {
      log(`SSH 兜底失败：注册 deploy key 被拒（HTTP ${added.status}）\n${String(added.text).slice(0, 400)}`);
      return false;
    }
    keyId = added.json.id;
    /* 走到这里才动用户的 ssh config：注册失败就不该留下任何痕迹 */
    lockKeyAcl(key);
    restoreConfig = installSshBlock(key);
    /* 关键：传 GIT_SSH（可执行文件），git 直接 exec 原生 ssh.exe，不经 sh。
       目标 URL 不自己带端口——端口由 config 的 Port 443 给，避免 git 拼出 -p
       （GIT_SSH 的 simple variant 不允许它改端口）。 */
    const r = git(['push', `ssh://git@ssh.github.com/${slug.owner}/${slug.repo}.git`, ...refspecs],
      { env: { ...process.env, GIT_SSH: sshExe, GIT_TERMINAL_PROMPT: '0' } });
    if (r.status !== 0) {
      log(`${label} 走 SSH 兜底仍然失败：\n${r.stdout || ''}${r.stderr || ''}`);
      return false;
    }
    log(`${label} 已改走 SSH 兜底并成功（ssh.github.com:443 + 临时 deploy key ${keyId}）`);
    return true;
  } catch (e) {
    log('SSH 兜底异常：' + (e && e.message ? e.message : String(e)));
    return false;
  } finally {
    /* config 先还原：哪怕后面删 key 的 API 卡住，用户 ssh 配置也不该长时间被改 */
    if (restoreConfig) { try { restoreConfig(); } catch (e) { /* 不影响结论 */ } }
    if (keyId) {
      let removed = false;
      try {
        const del = await ghApi('DELETE', `/repos/${slug.owner}/${slug.repo}/keys/${keyId}`);
        removed = !!(del && del.ok);
      } catch (e) { removed = false; }
      log(removed ? `已删除临时 deploy key ${keyId}` : `临时 deploy key ${keyId} 删除失败，请手动到仓库 Settings → Deploy keys 删掉`);
    }
    try { fs.rmSync(dir, { recursive: true, force: true }); } catch (e) { /* 清不掉不影响结果 */ }
  }
}
