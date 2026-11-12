import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const GIT = 'C:\\Users\\Administrator\\.dsh\\dsh-ops\\bash-ipc\\2617aff7612f4ce37164439d\\bin\\git.exe';
const env = { ...process.env, PATH: 'C:\\Users\\Administrator\\.dsh\\dsh-ops\\bash-ipc\\2617aff7612f4ce37164439d\\bin;C:\\Users\\Administrator\\.dsh\\dsh-ops\\bash-ipc\\2617aff7612f4ce37164439d\\ucrt64\\bin;' + process.env.PATH };

const run = (...a) => execFileSync(GIT, ['-c', 'core.autocrlf=false', ...a], { cwd: process.cwd(), env, encoding: 'utf8' });

// 1) 单页复制成 docs/index.html（GitHub Pages 入口）
fs.mkdirSync('docs', { recursive: true });
fs.copyFileSync('命理排盘.html', 'docs/index.html');
fs.writeFileSync('docs/.nojekyll', '');
console.log('docs/index.html', fs.statSync('docs/index.html').size);

// 2) 提交
run('add', '-A');
run('commit', '-q', '-m', '0.70.0：太乙补齐五层 + 网页版入口（docs/index.html）');
console.log(run('log', '--oneline', '-1').trim());

// 3) 推送（token 注入，不落盘到 remote）
const cfg = JSON.parse(fs.readFileSync('C:\\Users\\Administrator\\.dsh\\metaphysics-autopublish.json', 'utf8'));
const url = `https://${cfg.githubUser}:${cfg.githubToken}@github.com/xuanfu-web/dsh-metaphysics.git`;
try {
  const out = execFileSync(GIT, ['-c', 'core.autocrlf=false', 'push', url, 'HEAD:main'], { cwd: process.cwd(), env, encoding: 'utf8' });
  console.log('push:', out.trim().split('\n').slice(-1)[0]);
} catch (e) {
  console.log('push err:', String(e.stderr || e.message).slice(0, 300));
}
