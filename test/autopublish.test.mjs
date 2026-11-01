// 自动发布 CLI：未知参数必须立刻拒绝，避免拼错一次就触发提交推送
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { ok, eq } from './_harness.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const run = (args) => spawnSync(process.execPath, ['tools/autopublish.mjs', ...args], { cwd: root, encoding: 'utf8' });

const statePath = path.join(root, '.autopublish-state.json');
const before = fs.existsSync(statePath) ? read('.autopublish-state.json') : null;

// ── ① 拼错的开关：退出码 1，且不碰状态文件 ─────────────────────
const bad = run(['--dry']);
eq('未知参数退出码为 1', bad.status, 1);
ok('错误信息点名未知参数', /未知参数：--dry/.test(bad.stderr));
ok('错误信息给出可用参数', bad.stderr.includes('--dry-run') && bad.stderr.includes('--init') && bad.stderr.includes('--force'));
const after = fs.existsSync(statePath) ? read('.autopublish-state.json') : null;
ok('未知参数不改状态文件', before === after);

// ── ② 多个未知参数一起拒绝 ────────────────────────────────────
const bad2 = run(['--force', '--publish']);
eq('混合未知参数也退出 1', bad2.status, 1);
ok('列出全部未知参数', bad2.stderr.includes('--publish') && !/未知参数：.*--force/.test(bad2.stderr));

// ── ③ 白名单固定，与用法注释一致 ──────────────────────────────
const src = read('tools/autopublish.mjs');
ok('白名单恰好三个开关', /new Set\(\['--dry-run', '--init', '--force'\]\)/.test(src));
ok('用法注释写明只认 --dry-run', /--dry-run  # 只报告会做什么/.test(src));
