// 自动发布 CLI：未知参数必须立刻拒绝，避免拼错一次就触发提交推送
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { ok, eq } from './_harness.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
// 测试自己也可能被「自动发布」调度起来跑（它会把整套测试跑一遍）：
// 用独立的锁文件，避免外层实例占着锁、内层实例直接跳过而误判成通过。
const TEST_LOCK = path.join(root, '.qa-autopublish-test.lock');
const run = (args) => spawnSync(process.execPath, ['tools/autopublish.mjs', ...args], {
  cwd: root, encoding: 'utf8', env: { ...process.env, AUTOPUBLISH_LOCK: TEST_LOCK },
});

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

// ── ④ 加固项：每次运行留痕 / 失败留痕 / SSH 兜底 ──────────────────
const ERR = path.join(root, 'tools', '.autopublish-error');
const LOG = path.join(root, 'tools', '.autopublish.log');
const logText = () => (fs.existsSync(LOG) ? fs.readFileSync(LOG, 'utf8') : '');
const errText = () => (fs.existsSync(ERR) ? fs.readFileSync(ERR, 'utf8') : '');

ok('声明失败留痕文件路径', /tools', '\.autopublish-error'/.test(src) || /\.autopublish-error/.test(src));
ok('失败时写错误文件', /function fail\(msg\)[\s\S]{0,220}writeFileSync\(ERR/.test(src));
ok('成功时清掉错误文件', /function clearError\(\)/.test(src) && /clearError\(\);/.test(src));
ok('无改动也写一行日志（不再完全静默）', /无改动，跳过/.test(src));
ok('每次运行开头留痕', /运行开始（\$\{mode\}/.test(src));
ok('日志有轮转（避免一天两跑撑爆）', /function trimLog\(\)/.test(src) && /LOG_MAX_BYTES/.test(src));
ok('push 失败按「连不上」判定才换 SSH', /const HTTPS_BLOCKED = /.test(src));
ok('SSH 兜底走 ssh.github.com:443', /ssh:\/\/git@ssh\.github\.com:443\//.test(src));
ok('SSH 兜底临时生成 ed25519', /'-t', 'ed25519'/.test(src));
ok('SSH 兜底会注册并删除 deploy key', /\/keys`/.test(src) && /DELETE/.test(src));
ok('SSH 兜底不落盘持久凭据（用完删临时目录）', /fs\.rmSync\(dir, \{ recursive: true, force: true \}\)/.test(src));
ok('未捕获异常也留痕', /main\(\)\.catch[\s\S]{0,200}writeFileSync\(ERR/.test(src));
// 自动发布自己跑测试时，测试里再起一个实例：共用一把锁会让内层直接跳过，测出假通过
ok('锁路径可用环境变量换掉', /AUTOPUBLISH_LOCK/.test(src) && /process\.env\.AUTOPUBLISH_LOCK \|\|/.test(src));
ok('测试用独立锁文件', /const TEST_LOCK = /.test(read('test/autopublish.test.mjs')));

// 试跑一次：必须写「运行开始」，且不产生错误文件
const hadErrBefore = fs.existsSync(ERR);
const dry = spawnSync(process.execPath, ['tools/autopublish.mjs', '--dry-run'], {
  cwd: root, encoding: 'utf8', env: { ...process.env, AUTOPUBLISH_LOCK: TEST_LOCK },
});
eq('dry-run 退出码 0', dry.status, 0);
ok('dry-run 往日志写了运行开始', /运行开始（dry-run/.test(logText()), logText().slice(-120));
ok('dry-run 不写错误文件', hadErrBefore ? true : !fs.existsSync(ERR));

// 失败路径：配置指到不存在的文件 → 退出码 1 + 错误文件留痕（不会走到推送）
const badCfg = spawnSync(process.execPath, ['tools/autopublish.mjs', '--force'], {
  cwd: root,
  encoding: 'utf8',
  env: { ...process.env, AUTOPUBLISH_CONFIG: path.join(root, '.qa-no-such-config.json'), AUTOPUBLISH_LOCK: TEST_LOCK },
});
eq('配置缺失时退出码 1', badCfg.status, 1);
ok('配置缺失时写错误文件', fs.existsSync(ERR), ERR);
ok('错误文件写明原因', /缺少自动发布配置/.test(errText()), errText().slice(0, 80));
eq('失败后不留锁', fs.existsSync(TEST_LOCK), false);
const stateAfterFail = fs.existsSync(statePath) ? read('.autopublish-state.json') : null;
ok('失败不改状态文件', stateAfterFail === after);
// 收拾现场：错误文件是运行产物，别留在工作区里
try { fs.unlinkSync(ERR); } catch (e) { /* 本来就没有 */ }
