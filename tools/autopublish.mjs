#!/usr/bin/env node
// 每 24 小时自动检查并推送 dsh-metaphysics（每天 23:00 与 23:30 各跑一次，后者作兜底）。
//
// 行为（2026-10-31 起：只提交 + 推送，不自动发 npm）：
//   1. 对「会进 npm 包的源码/配置」做指纹（package.json、engine、src、index.js、locale、构建脚本等）；
//   2. 指纹与上次成功推送时保存的一致 → 不提交、不推送，但仍写一行日志（便于确认任务在跑）；
//   3. 指纹有变 → 跑七道闸 → 重建产物 → 提交并推送到 origin/main → 写回指纹。
//      版本号不动、不打 tag、不发 npm：按主题攒够后，发版时手动走 tools/release.mjs。
//   4. 失败一律写 tools/.autopublish-error（成功则删掉），下次成功推送时自动清空；
//   5. push 连续失败且像是 GitHub 443 被阻断时，自动生成临时 ed25519 → 注册 deploy key →
//      走 ssh.github.com:443 推送 → 用完立刻删 key。全程不落盘持久凭据。
//
// 用法：
//   node tools/autopublish.mjs            # 自动检查/推送（定时任务用这个）
//   node tools/autopublish.mjs --dry-run  # 只报告会做什么，不改任何东西
//   node tools/autopublish.mjs --init     # 只把当前指纹记为基线，不推送
//   node tools/autopublish.mjs --force    # 忽略指纹，强制走提交推送流程
//
// 依赖：<用户目录>/.dsh/metaphysics-autopublish.json（npmToken / githubUser / githubToken），
//       指纹、锁、日志与错误文件都在 .gitignore 里。
//
// 凭据纪律（别省这几步）：
//   - 这三个值只许躺在那一个文件里，不许进仓库、不许贴进对话/截图/日志；本脚本只读不打印。
//   - 怀疑外泄就去 npm / GitHub 后台吊销重建（npm 用 Granular Token，勾 Read and write），
//     然后只改文件里的 npmToken 字段，其它不动——下次发版自动用新值。
//   - 仓库侧有闸：tools/check-patterns.mjs 会拦 token 形态的明文，命中只报文件行号。
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';

const root = path.resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const FLAGS = new Set(['--dry-run', '--init', '--force']);
const unknown = args.filter((a) => !FLAGS.has(a));
if (unknown.length) {
  // 只认上面三个开关：拼错（如 --dry）时立即停下，不能因为「多了一个不认识的词」就去提交推送
  console.error(`未知参数：${unknown.join(' ')}`);
  console.error('可用参数：--dry-run（只报告）、--init（记基线）、--force（忽略指纹）');
  process.exit(1);
}
const DRY = args.includes('--dry-run');
const INIT = args.includes('--init');
const FORCE = args.includes('--force');

const STATE = path.join(root, '.autopublish-state.json');
// 锁文件可用环境变量换掉：测试要在「自动发布自己正在跑」的时候再启一个实例，
// 共用一把锁会让第二个实例直接跳过，测出来的「成功」其实是没干活。
const LOCK = process.env.AUTOPUBLISH_LOCK || path.join(root, '.autopublish.lock');
const LOG = path.join(root, 'tools', '.autopublish.log');
/** 失败留痕：成功一次就删掉，看到这个文件就说明上一轮没成 */
const ERR = path.join(root, 'tools', '.autopublish-error');
const LOG_MAX_BYTES = 512 * 1024;
const LOG_KEEP_LINES = 800;
const CONFIG = process.env.AUTOPUBLISH_CONFIG
  || path.join(os.homedir(), '.dsh', 'metaphysics-autopublish.json');

const PKG = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const NAME = PKG.name;

// 这些文件/目录决定「有没有值得发布的改动」。构建产物（client.js / 命理排盘.html）不参与，
// 因为它们是上面这些源码的生成物；测试与文档单独改不触发发布。
const SOURCE_FILES = ['package.json', 'index.js', 'cordis.patch.yml', 'icon.svg'];
const SOURCE_DIRS = ['engine', 'src', 'locale'];
// 报告生成器与对拍样本会改 docs/assets 里的徽章，必须一起进发布指纹
const BUILD_FILES = [
  'tools/build-client.mjs', 'tools/build-html.mjs', 'tools/verification.mjs',
  'test/fixtures/classics.json', 'test/fixtures/qimen-20.json',
];

/** 日志只留最近一段：定时任务一天两跑，几个月就能把文件撑到几 MB */
function trimLog() {
  try {
    if (fs.statSync(LOG).size <= LOG_MAX_BYTES) return;
    const lines = fs.readFileSync(LOG, 'utf8').split('\n');
    fs.writeFileSync(LOG, lines.slice(-LOG_KEEP_LINES).join('\n'));
  } catch (e) { /* 没有日志文件或读不了：下次再修 */ }
}

const log = (msg) => {
  try {
    fs.appendFileSync(LOG, `[${new Date().toISOString()}] ${msg}\n`);
    trimLog();
  } catch (e) { /* 日志写不了不影响主流程 */ }
};

/** 失败留痕：写文件 + 写日志 + stderr，三处都留，事后看哪一处都能查到 */
function fail(msg) {
  try { fs.writeFileSync(ERR, `[${new Date().toISOString()}] ${msg}\n`); } catch (e) { /* 只剩日志 */ }
  log('ERROR ' + msg);
  console.error(msg);
  process.exit(1);
}

/** 成功收尾：清掉上一轮的失败留痕（这个文件存在本身就是信号，不清会一直误报） */
function clearError() {
  try { fs.unlinkSync(ERR); } catch (e) { /* 本来就没有 */ }
}

function sh(cmd, cmdArgs, opts = {}) {
  const r = spawnSync(cmd, cmdArgs, {
    cwd: root,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    ...opts,
  });
  return { status: r.status, stdout: r.stdout || '', stderr: r.stderr || '', error: r.error };
}

function git(args2, opts = {}) {
  return sh(process.env.AUTOPUBLISH_GIT || findGit(), args2, opts);
}

// git 不在 PATH：找 DSH 自带的 bash-ipc 里的 git；找不到才退回 PATH 上的 git。
function findGit() {
  if (process.env.AUTOPUBLISH_GIT) return process.env.AUTOPUBLISH_GIT;
  const base = path.join(os.homedir(), '.dsh', 'dsh-ops', 'bash-ipc');
  try {
    for (const d of fs.readdirSync(base)) {
      const p = path.join(base, d, 'ucrt64', 'bin', 'git.exe');
      if (fs.existsSync(p)) return p;
    }
  } catch (e) { /* 没有就算了 */ }
  return 'git';
}

function walkFiles(dir, out = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return out; }
  for (const ent of entries) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkFiles(p, out);
    else if (ent.isFile()) out.push(p);
  }
  return out;
}

function fingerprint() {
  const files = [];
  for (const f of SOURCE_FILES) files.push(path.join(root, f));
  for (const f of BUILD_FILES) files.push(path.join(root, f));
  for (const d of SOURCE_DIRS) walkFiles(path.join(root, d), files);
  const h = createHash('sha1');
  for (const f of files.sort()) {
    if (!fs.existsSync(f)) continue;
    h.update(path.relative(root, f).replace(/\\/g, '/'));
    h.update('\0');
    h.update(fs.readFileSync(f));
    h.update('\0');
  }
  return h.digest('hex');
}

function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { return fallback; }
}

function writeJson(file, obj) {
  fs.writeFileSync(file, JSON.stringify(obj, null, 2) + '\n');
}

async function npmLatest() {
  try {
    const res = await fetch(`https://registry.npmjs.org/${NAME}?cb=${Date.now()}`);
    if (!res.ok) return null;
    const m = await res.json();
    return (m['dist-tags'] && m['dist-tags'].latest) || null;
  } catch (e) {
    return null;
  }
}

// ── git 元数据自愈：这个仓库两次丢过 HEAD/config/index，缺了就按 refs/heads/main 补回 ──
function repairGit() {
  const head = path.join(root, '.git', 'HEAD');
  const cfg = path.join(root, '.git', 'config');
  if (!fs.existsSync(path.join(root, '.git'))) return false;
  if (!fs.existsSync(head)) {
    fs.writeFileSync(head, 'ref: refs/heads/main\n');
    log('修复 .git/HEAD');
  }
  if (!fs.existsSync(cfg)) {
    fs.writeFileSync(cfg, [
      '[core]', '\trepositoryformatversion = 0', '\tfilemode = false', '\tbare = false',
      '\tlogallrefupdates = true', '\tignorecase = true',
      '[remote "origin"]', '\turl = https://github.com/xuanfu-web/dsh-metaphysics.git',
      '\tfetch = +refs/heads/*:refs/remotes/origin/*',
      '[branch "main"]', '\tremote = origin', '\tmerge = refs/heads/main',
      '[user]', '\tname = xuanfu-web', '\temail = a18905669048@gmail.com',
      '',
    ].join('\n'));
    log('修复 .git/config');
  }
  const r = git(['rev-parse', '--git-dir']);
  if (r.status !== 0) {
    git(['reset']);
    log('重建 git 索引');
  }
  return true;
}

function loadConfig() {
  const c = readJson(CONFIG, null);
  if (!c || !c.npmToken || !c.githubToken) {
    fail(`缺少自动发布配置：${CONFIG}（需要 npmToken / githubUser / githubToken）`);
  }
  return c;
}

function authArgs(cfg) {
  const b64 = Buffer.from(`${cfg.githubUser || 'xuanfu-web'}:${cfg.githubToken}`).toString('base64');
  return ['-c', 'credential.helper=', '-c', `http.https://github.com/.extraheader=Authorization: Basic ${b64}`];
}

function runStep(label, cmd, cmdArgs, opts) {
  const r = sh(cmd, cmdArgs, opts);
  if (r.status !== 0) {
    log(`步骤失败：${label}\n${r.stdout}\n${r.stderr}`);
    fail(`步骤失败：${label}`);
  }
  return r;
}

const sleep = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);

/** 这些字样说明是「连不上 GitHub」，不是「推被拒」——只有前者才值得换 SSH 再试 */
const HTTPS_BLOCKED = /443|timed out|timeout|Could not resolve|Couldn't connect|Failed to connect|Connection was reset|early EOF|Empty reply|RPC failed|SSL|TLS/i;

/** 仓库 slug：从 package.json 的 repository 读，读不出就不猜 */
function repoSlug() {
  const url = String((PKG.repository && (PKG.repository.url || PKG.repository)) || '');
  const m = /github\.com[:/]([^/]+)\/([^/.]+)/.exec(url);
  return m ? { owner: m[1], repo: m[2] } : null;
}

function findSshKeygen() {
  const cands = [];
  try {
    const dir = path.dirname(process.env.AUTOPUBLISH_GIT || findGit());
    cands.push(path.join(dir, process.platform === 'win32' ? 'ssh-keygen.exe' : 'ssh-keygen'));
  } catch (e) { /* 没有就算了 */ }
  if (process.platform === 'win32') {
    cands.push(path.join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'OpenSSH', 'ssh-keygen.exe'));
  }
  for (const p of cands) {
    try { if (p && fs.existsSync(p)) return p; } catch (e) { /* 下一个 */ }
  }
  return 'ssh-keygen';
}

async function ghApi(cfg, method, apiPath, body) {
  const res = await fetch(`https://api.github.com${apiPath}`, {
    method,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `token ${cfg.githubToken}`,
      'User-Agent': 'dsh-metaphysics-autopublish',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch (e) { json = null; }
  return { ok: res.ok, status: res.status, json, text };
}

/**
 * GitHub 443 被阻断时的兜底：临时 ed25519 → 注册 deploy key（write）→
 * 走 ssh.github.com:443 推送 → 无论成败都删 key、删本地私钥。
 * 不落盘持久凭据：私钥只活在这一次运行的临时目录里。
 */
async function pushOverSsh(cfg, label) {
  const slug = repoSlug();
  if (!slug) { log('SSH 兜底跳过：package.json 里读不出 repository'); return false; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'dsh-mp-ssh-'));
  const key = path.join(dir, 'id_ed25519');
  let keyId = null;
  try {
    const gen = sh(findSshKeygen(), ['-t', 'ed25519', '-N', '', '-C', 'dsh-metaphysics-autopublish', '-f', key]);
    if (gen.status !== 0) { log('SSH 兜底失败：ssh-keygen 起不来\n' + gen.stderr); return false; }
    const pub = fs.readFileSync(`${key}.pub`, 'utf8').trim();
    const added = await ghApi(cfg, 'POST', `/repos/${slug.owner}/${slug.repo}/keys`, {
      title: `autopublish ${new Date().toISOString()}`,
      key: pub,
      read_only: false,
    });
    if (!added.ok || !added.json || !added.json.id) {
      log(`SSH 兜底失败：注册 deploy key 被拒（HTTP ${added.status}）\n${added.text.slice(0, 400)}`);
      return false;
    }
    keyId = added.json.id;
    const sshCmd = `ssh -i "${key.replace(/\\/g, '/')}" -o IdentitiesOnly=yes -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null`;
    const r = sh(process.env.AUTOPUBLISH_GIT || findGit(), [
      '-c', `core.sshCommand=${sshCmd}`,
      'push', `ssh://git@ssh.github.com:443/${slug.owner}/${slug.repo}.git`, 'HEAD:main',
    ]);
    if (r.status !== 0) { log(`${label} 走 SSH 兜底仍然失败：\n${r.stdout}${r.stderr}`); return false; }
    log(`${label} 已改走 SSH 兜底并成功（ssh.github.com:443 + 临时 deploy key ${keyId}）`);
    return true;
  } catch (e) {
    log('SSH 兜底异常：' + (e && e.message ? e.message : String(e)));
    return false;
  } finally {
    if (keyId) {
      let removed = false;
      try {
        const del = await ghApi(cfg, 'DELETE', `/repos/${slug.owner}/${slug.repo}/keys/${keyId}`);
        removed = !!(del && del.ok);
      } catch (e) { removed = false; }
      log(removed ? `已删除临时 deploy key ${keyId}` : `临时 deploy key ${keyId} 删除失败，请手动到仓库 Settings → Deploy keys 删掉`);
    }
    try { fs.rmSync(dir, { recursive: true, force: true }); } catch (e) { /* 临时目录清不掉不影响结果 */ }
  }
}

/** 推送带重试：GitHub 连接间歇性失败（甚至整段 443 被阻断），失败三次后换 SSH 再试一次 */
async function pushWithRetry(args, label, cfg) {
  let last = null;
  for (let i = 1; i <= 3; i++) {
    const r = git(args);
    if (r.status === 0) return r;
    last = r;
    log(`${label} 第 ${i} 次失败：\n${r.stdout}${r.stderr}`);
    if (i < 3) sleep(i * 15000);
  }
  const blob = `${(last && last.stdout) || ''}${(last && last.stderr) || ''}`;
  if (cfg && HTTPS_BLOCKED.test(blob)) {
    log(`${label} 连不上 GitHub HTTPS，自动改走 SSH deploy key 兜底`);
    if (await pushOverSsh(cfg, label)) return { status: 0 };
  }
  fail(`${label} 连续 3 次失败（检查 GitHub 443 是否可达；SSH 兜底也没成）`);
}

/**
 * 自动提交只收「本来就该在仓库里的路径」。
 *
 * 原先这里是 `git add -A`：工作区里多出什么，机器人都原样推到公开仓库。
 * 真实踩过一次——某条写文档的命令把整句中文当成了重定向目标，在仓库根留下
 * 7 个 0 字节、文件名是一句话的文件，当天就被 autopublish 提交进 main。
 * .gitignore 只挡得住约定好的形态（.env / *.secret），挡不住「没见过的名字」。
 *
 * 规则：目录按白名单走；根文件必须有已知扩展名，或在显式清单里（LICENSE、.gitignore）。
 * 落在规则外的改动不提交、也不删——只在日志里点名，让人来看一眼是什么。
 */
const STAGE_DIRS = ['engine/', 'src/', 'test/', 'tools/', 'docs/', 'locale/', 'submit/', '.github/'];
const STAGE_ROOT_EXT = /\.(js|json|md|html|yml|yaml|svg|css|txt|csv)$/i;
const STAGE_ROOT_EXPLICIT = ['LICENSE', '.gitignore'];
// 点开头的名字一律不收：自动发布自己的状态/锁/日志都在 tools/ 下，按目录白名单会被放行，
// 于是每一轮提交都多一条「运行痕迹」。
const STAGE_DOT_OK = ['.github', '.gitignore'];

function stageable(p) {
  if (p.split('/').some((s) => s.startsWith('.') && !STAGE_DOT_OK.includes(s))) return false;
  if (p.includes('/')) return STAGE_DIRS.some((d) => p.startsWith(d));
  return STAGE_ROOT_EXT.test(p) || STAGE_ROOT_EXPLICIT.includes(p);
}

/** porcelain -z：路径不带引号转义，中文名也能原样拿到；重命名会多一条「旧路径」记录 */
function changedPaths() {
  const r = git(['status', '--porcelain=v1', '--untracked-files=all', '-z']);
  if (r.status !== 0) return null;
  const recs = r.stdout.split('\0');
  const out = [];
  for (let i = 0; i < recs.length; i++) {
    const rec = recs[i];
    // 不能在这里 filter 掉短记录：重命名记录的下一条就是「旧路径」，
    // 少一条会让 i++ 跳过真正的改动，把该提交的文件静默漏掉。
    if (rec.length < 4) continue;
    const xy = rec.slice(0, 2);
    out.push(rec.slice(3));
    // R/C 的记录后面紧跟来源路径，它本身不是独立改动
    if (xy[0] === 'R' || xy[0] === 'C') i++;
  }
  return out;
}

async function commitAndPush(cfg) {
  const paths = changedPaths();
  if (!paths) fail('git status 失败，无法确定要提交哪些文件（宁可不提交，也不做全量 add -A）');
  const keep = paths.filter(stageable);
  const skipped = paths.filter((p) => !stageable(p));
  if (skipped.length) {
    log(`⚠ 未纳入自动提交（不在允许清单，请人工确认）：${skipped.slice(0, 12).join(' / ')}${skipped.length > 12 ? ` …共 ${skipped.length} 项` : ''}`);
  }
  if (!keep.length) {
    // 工作区干净不等于没有可推的东西：发版提交、手工 commit 都可能已经落在本地，
    // 只是还没推到 origin。原先这里直接 return，主流程却照样打印「已推送」，
    // 于是本地领先远端一整版，日志仍显示成功。
    const ahead = git(['rev-list', '--count', 'origin/main..HEAD']);
    const n = ahead.status === 0 ? Number(ahead.stdout.trim()) : 0;
    if (!n) {
      log('允许清单内没有改动，本地也不领先远端，本轮不推送');
      return false;
    }
    log(`允许清单内没有改动，但本地领先远端 ${n} 个提交，继续推送`);
  } else {
    // 分批传路径：一次塞几百个会撞命令行长度上限
    for (let i = 0; i < keep.length; i += 50) {
      const r = git(['add', '-A', '--', ...keep.slice(i, i + 50)]);
      if (r.status !== 0) fail(`git add 失败：\n${r.stdout}${r.stderr}`);
    }
    const msg = 'chore(autopublish): 自动构建并推送\n\n由 tools/autopublish.mjs 定时任务生成：跑七道闸、重建 client.js 与命理排盘.html 后提交推送。不发 npm、不改版本号、不打 tag——发版按主题攒够后手动走 tools/release.mjs。';
    const c = git(['-c', 'core.autocrlf=false', 'commit', '-m', msg]);
    if (c.status !== 0 && !/nothing to commit/i.test(c.stdout + c.stderr)) {
      log('git commit 失败：\n' + c.stdout + c.stderr);
      fail('git commit 失败');
    }
  }
  // 远端在两次运行之间前进过：先 rebase 再接上（冲突就放弃本轮，下一轮重试）
  git(['fetch', 'origin', '--quiet']);
  const behind = git(['rev-list', '--count', 'HEAD..origin/main']);
  if (behind.status === 0 && Number(behind.stdout.trim()) > 0) {
    const rb = git(['pull', '--rebase', 'origin', 'main']);
    if (rb.status !== 0) {
      git(['rebase', '--abort']);
      log('rebase 失败，放弃本轮：\n' + rb.stdout + rb.stderr);
      fail('git pull --rebase 失败（下一轮重试）');
    }
  }
  await pushWithRetry(authArgs(cfg).concat(['push', 'origin', 'main']), 'git push', cfg);
  log(`已推送 main（版本仍为 ${PKG.version}，未发布 npm）`);
  return true;
}

async function main() {
  const mode = DRY ? 'dry-run' : INIT ? 'init' : FORCE ? 'force' : 'auto';
  log(`运行开始（${mode}，pid ${process.pid}）`);
  if (!fs.existsSync(path.join(root, '.git'))) fail('不是 git 仓库：' + root);
  repairGit();

  // 锁：两个入口（系统计划任务 / 手动）撞在一起时，后来的直接退出
  try {
    const st = fs.statSync(LOCK);
    if (Date.now() - st.mtimeMs < 2 * 3600 * 1000) {
      log('已有发布在跑，跳过本次');
      process.exit(0);
    }
  } catch (e) { /* 没锁 */ }
  fs.writeFileSync(LOCK, `${process.pid} ${new Date().toISOString()}\n`);

  const cleanup = () => { try { fs.unlinkSync(LOCK); } catch (e) { /* 已经删了 */ } };
  process.on('exit', cleanup);

  const state = readJson(STATE, null);
  const hash = fingerprint();
  if (INIT) {
    const latest = await npmLatest();
    writeJson(STATE, { hash, version: PKG.version, npmLatest: latest, at: new Date().toISOString() });
    clearError();
    log(`已记录基线：${PKG.version}（npm latest: ${latest || '未知'}）指纹 ${hash.slice(0, 12)}`);
    console.log(`已记录基线：${PKG.version}（npm latest: ${latest || '未知'}）指纹 ${hash.slice(0, 12)}`);
    return;
  }
  if (!FORCE && state && state.hash === hash) {
    // 无改动：不打印、不提交，但日志留一行——否则「任务到底跑没跑」事后查不出来
    log(`无改动，跳过（指纹 ${hash.slice(0, 12)}，版本 ${PKG.version}）`);
    return;
  }

  const latest = await npmLatest();
  const cfg = loadConfig();

  if (DRY) {
    console.log(JSON.stringify({
      action: 'commit-push', reason: FORCE ? 'force' : '源码/配置有改动',
      version: PKG.version, npmLatest: latest, hash: hash.slice(0, 12),
    }, null, 2));
    return;
  }

  log(`检测到改动：${state ? '指纹变化 ' + (state.hash || '').slice(0, 12) + ' → ' : '首次 '}${hash.slice(0, 12)}；提交并推送（不发 npm）`);

  const gates = [
    ['build-client', ['tools/build-client.mjs']],
    ['build-html', ['tools/build-html.mjs']],
    ['build-verification', ['tools/verification.mjs']],
    ['check-verification', ['tools/check-verification.mjs']],
    ['check-bundle', ['tools/check-bundle.mjs']],
    ['test-all', ['tools/test-all.mjs']],
    ['check-assertions', ['tools/check-assertions.mjs']],
    ['verify-tests-can-fail', ['tools/verify-tests-can-fail.mjs']],
    ['check-html-sinks', ['tools/check-html-sinks.mjs']],
    ['check-patterns', ['tools/check-patterns.mjs']],
    ['check-perf', ['tools/check-perf.mjs']],
  ];
  for (const [label, script] of gates) {
    runStep(label, process.execPath, script);
  }

  const finalHash = fingerprint();
  const pushed = await commitAndPush(cfg);
  writeJson(STATE, { hash: finalHash, version: PKG.version, npmLatest: latest, at: new Date().toISOString() });
  clearError();
  if (pushed) {
    log(`完成：已推送 main（版本 ${PKG.version} 未发 npm；npm latest ${latest || '未知'}）`);
    console.log(`已推送 main（版本 ${PKG.version}，未发 npm；npm latest ${latest || '未知'}）`);
  } else {
    log(`完成：无改动可推送（版本 ${PKG.version}；npm latest ${latest || '未知'}）`);
    console.log(`无改动可推送（版本 ${PKG.version}；npm latest ${latest || '未知'}）`);
  }
}

main().catch((e) => {
  const msg = '未捕获异常：' + (e && e.stack ? e.stack : String(e));
  try { fs.writeFileSync(ERR, `[${new Date().toISOString()}] ${msg}\n`); } catch (e2) { /* 只剩日志 */ }
  log(msg);
  console.error(e && e.message ? e.message : String(e));
  process.exit(1);
});
