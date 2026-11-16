// 把 tools/hooks/ 里的模板装进本仓库的 .git/hooks。
//
// 为什么要有这一步，而不是让 git 直接读仓库里的脚本：
// 1) git 只会执行 .git/hooks 下的可执行文件，仓库目录不在它的查找范围里；
// 2) 钩子在 git 自带的 sh 里跑，那里的 PATH 不含 node（本机实测 `command -v node`
//    无输出），所以模板里写 `node xxx` 会直接 command not found。安装时把真实
//    node 路径填进 __NODE__，钩子才跑得起来。
// 3) 换成 worktree 时 .git 是个文件，hooks 目录得靠 git 自己报路径，不能硬拼。
//
// 用法：node tools/hooks-install.mjs
// 卸载：node tools/hooks-install.mjs --remove
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '..');
const TEMPLATES = ['pre-commit', 'pre-push'];
const remove = process.argv.includes('--remove');

function git(args) {
  return execFileSync('git', args, { cwd: REPO, encoding: 'utf8' }).trim();
}

// msys 路径：git 的 sh 认 /c/Users/...，不认 C:\Users\...
function msysPath(p) {
  return p.replace(/\\/g, '/').replace(/^([A-Za-z]):/, (m, drive) => '/' + drive.toLowerCase());
}

const hooksDir = path.resolve(REPO, git(['rev-parse', '--git-path', 'hooks']));
const custom = (() => {
  try {
    return git(['config', '--get', 'core.hooksPath']);
  } catch (e) {
    return '';
  }
})();

if (custom) {
  console.log(`注意：本仓库设置了 core.hooksPath=${custom}`);
  console.log(`        git 会去那里找钩子，不读 ${hooksDir}`);
  console.log('        （装完仍不生效的话，取消它：git config --unset core.hooksPath）');
  console.log('');
}

fs.mkdirSync(hooksDir, { recursive: true });

for (const name of TEMPLATES) {
  const target = path.join(hooksDir, name);
  if (remove) {
    if (fs.existsSync(target)) {
      fs.unlinkSync(target);
      console.log(`已移除 ${target}`);
    } else {
      console.log(`没装过 ${target}`);
    }
    continue;
  }
  const src = path.join(HERE, 'hooks', `${name}.sh`);
  if (!fs.existsSync(src)) {
    console.log(`缺少模板 ${src}`);
    process.exitCode = 1;
    continue;
  }
  const body = fs
    .readFileSync(src, 'utf8')
    .replace(/\r\n/g, '\n')
    .replace('__NODE__', msysPath(process.execPath));
  fs.writeFileSync(target, body, { encoding: 'utf8', mode: 0o755 });
  try {
    fs.chmodSync(target, 0o755);
  } catch (e) {
    /* Windows 上改不了权限位，git 照样会执行有 shebang 的文件 */
  }
  console.log(`已安装 ${target}`);
}

if (!remove) {
  console.log('');
  console.log(`node: ${msysPath(process.execPath)}`);
  console.log('提交前跑文案闸 / 行尾 / 注入面 / 暂存 js 语法；推送前跑全闸。');
  console.log('急事绕闸：SKIP_HOOKS=1 git commit ...');
}
