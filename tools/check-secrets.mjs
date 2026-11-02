// 凭据扫描：全仓（含 .env、.npmrc 这类无扩展名 / 点文件）找 token 与私钥明文。
//
// 从 check-patterns.mjs 里拆出来单独成闸，理由有两条：
//   1. 旧实现按扩展名白名单挑文件（.js/.md/.json/…），`.env`、`.npmrc`、没有后缀的
//      凭据文件正好都不在里面——而它们恰是 token 最常被顺手写进去的地方；
//      白名单会随新文件类型自动漏，改成「除已知二进制外全扫」才不会。
//   2. 发布链路里有 `git add -A`（tools/autopublish.mjs），一次顺手 `echo TOKEN > .env`
//      就会被提交；扫描必须比 add 更宽，而不是更聪明。
// 命中只报「文件:行 + 形态」，绝不回显匹配到的内容——这条检查自己不能成为泄露通道。
import fs from 'node:fs';
import path from 'node:path';

export const SECRET_PATTERNS = [
  [/npm_[A-Za-z0-9]{30,}/, '疑似 npm token 明文'],
  [/gh[pousr]_[A-Za-z0-9]{20,}/, '疑似 GitHub token 明文'],
  [/github_pat_[A-Za-z0-9_]{20,}/, '疑似 GitHub fine-grained token 明文'],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, '疑似私钥明文'],
  // 键名后直接跟一个够长的值：覆盖「MY_HOOK_TOKEN=xxxx」这类非平台前缀的写法
  [/(?:token|secret|passwd|password|api[-_]?key)["']?\s*[:=]\s*["']?[A-Za-z0-9_\-+/=]{20,}/i, '疑似键值对形式的凭据'],
];

// 已知二进制/资源后缀：这些不做文本匹配（匹配了也是噪声）
const BINARY_EXT = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.bmp', '.tiff',
  '.woff', '.woff2', '.ttf', '.otf', '.eot',
  '.pdf', '.zip', '.gz', '.tgz', '.bz2', '.xz', '.7z', '.rar',
  '.mp3', '.mp4', '.wav', '.ogg', '.webm', '.mov',
  '.node', '.wasm', '.jar', '.db', '.sqlite', '.pack', '.idx',
]);
const SKIP_DIR = new Set(['node_modules', '.git', '.workbuddy', 'dist', 'coverage']);
const MAX_BYTES = 8 * 1024 * 1024; // 命理排盘.html 有几 MB；再大就不是源码了，跳过

/** 递归列出要扫的文件（相对 root，posix 风格） */
export function listTextFiles(root) {
  const out = [];
  const walk = (dir) => {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      let st;
      try { st = fs.statSync(full); } catch (e) { continue; }
      if (st.isDirectory()) {
        if (!SKIP_DIR.has(name)) walk(full);
        continue;
      }
      if (st.size > MAX_BYTES) continue;
      if (BINARY_EXT.has(path.extname(name).toLowerCase())) continue;
      out.push(path.relative(root, full).split(path.sep).join('/'));
    }
  };
  walk(root);
  return out.sort();
}

/**
 * 扫一个目录树，返回 `相对路径:行 形态` 的问题列表。
 * @param {string} root
 * @param {{skip?: string[]}} opts 本次扫描要跳过的相对路径（调用方自己写着匹配规则的文件）
 */
export function scanSecrets(root, opts = {}) {
  const skip = new Set(opts.skip || []);
  const problems = [];
  for (const rel of listTextFiles(root)) {
    if (skip.has(rel)) continue;
    let text = '';
    try { text = fs.readFileSync(path.join(root, rel), 'utf8'); } catch (e) { continue; }
    if (text.includes('\0')) continue; // 没在后缀表里但确实是二进制：含 NUL 就跳过
    text.split(/\r?\n/).forEach((line, i) => {
      for (const [re, msg] of SECRET_PATTERNS) {
        if (re.test(line)) { problems.push(`${rel}:${i + 1}  ${msg}`); break; }
      }
    });
  }
  return problems;
}

// 直接运行时（npm run check:secrets / CI）才打印并退出
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.filename)) {
  const root = path.resolve(import.meta.dirname, '..');
  const problems = scanSecrets(root, { skip: ['tools/check-secrets.mjs', 'test/secrets-gate.test.mjs'] });
  if (problems.length) {
    console.error(`✗ 凭据扫描未通过（${problems.length} 处，只报位置不回显内容）：`);
    for (const p of problems) console.error(`  - ${p}`);
    process.exit(1);
  }
  console.log(`✓ 凭据扫描通过：${listTextFiles(root).length} 个文件无 token / 私钥明文（含 .env 与无扩展名文件）`);
}
