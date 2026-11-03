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

// ── ⑤ 受控暂存：机器人不许把没见过的文件推到公开仓库 ─────────────
// 真实事故：某条写文档的命令把整句中文当成重定向目标，在仓库根留下 7 个 0 字节文件，
// 因为 commitAndPush 里是 `git add -A`，当天就被自动提交进 main。
// 仓库里全是 CRLF，跨行的定位与抽取一律先在换行归一后的副本上做。
const srcLF = src.replace(/\r\n/g, '\n');
const stageStart = srcLF.indexOf('const STAGE_DIRS = [');
const stageEnd = srcLF.indexOf('  return out;\n}', stageStart);
ok('受控暂存代码存在', stageStart >= 0 && stageEnd > stageStart);
const stageRegion = srcLF.slice(stageStart, stageEnd + '  return out;\n}'.length);
let recs = [];
const api = new Function('git', `${stageRegion}\nreturn { stageable, changedPaths };`)(
  () => ({ status: 0, stdout: recs.join('\0'), stderr: '' }),
);

// 路径判定：目录白名单 + 根文件扩展名/显式清单
const YES = ['src/app.js', 'test/autopublish.test.mjs', 'engine/index.js', 'tools/check-bundle.mjs',
  'docs/参考资料与对拍来源.md', 'client.ziwei.js', '命理排盘.html', 'index.js', 'package.json',
  'README.md', 'LICENSE', '.gitignore', 'locale/zh.json', '.github/workflows/ci.yml'];
const NO = ['node_modules/dsh-metaphysics/index.js', '.env', '.npmrc', 'tools/.autopublish.log',
  '不记录反馈者的出生资料、邮箱与账号；需要样例时只写盘型，测试一律用合成日期。', '这份清单对应',
  '典籍原文的登记、核验与待补状态见', 'nope.txt.bak2', 'token.txt.tmp', ''];
const wrongYes = YES.filter((p) => !api.stageable(p));
const wrongNo = NO.filter((p) => api.stageable(p));
ok('该提交的都在清单内', wrongYes.length === 0, wrongYes.join(' / '));
ok('没见过的根文件与产物一律不提交', wrongNo.length === 0, wrongNo.join(' / '));

// 清单必须真的能拦住这次事故的那 7 个名字，而不是碰巧
const incidents = ['每份反馈逐条记：诉求', '立这道门槛的原因很简单：命理领域最容易犯的错不是「算错」，而是「说得很确定，却没人知道依据在哪」。',
  '每条规则在解析卡片里直接显示，右上角标注可信度：**诸家一致', '外部页面、库与典籍只作口径参考与对拍。每条记清：地址、访问日期、采用了什么、怎么验证、哪些没采用。'];
ok('事故里的 7 个文件名全部被拒', incidents.every((p) => !api.stageable(p)));

// porcelain -z 解析：重命名记录会多带一条「旧路径」，不能当成独立改动，
// 也不能因为旧路径名很短就 filter 掉整条记录——那会让下一条真改动被跳过。
recs = ['R  src/new.js', 'src/old.js', 'M  engine/index.js', ''];
eq('重命名只取新路径', api.changedPaths().join(','), 'src/new.js,engine/index.js');
recs = ['R  tools/a.js', 'b', 'M  src/app.js', ''];
eq('极短的重命名来源不吞掉下一条', api.changedPaths().join(','), 'tools/a.js,src/app.js');
recs = ['?? 每份反馈逐条记：诉求', 'M  package.json', ''];
eq('中文名按原样取回（不走引号转义）', api.changedPaths().join(','), '每份反馈逐条记：诉求,package.json');

// git status 失败时宁可整轮不提交，也不退回全量 add -A
api.__recs = null;
const gitStatus = new Function('git', `${stageRegion}\nreturn changedPaths;`)
  (() => ({ status: 128, stdout: '', stderr: 'not a git repository' }));
eq('status 失败返回 null（调用方据此放弃提交）', gitStatus(), null);

// 源码层：不许再出现裸 add -A；清单外的只记日志，不许顺手删
ok('不再有无差别的 git add -A', !/git\(\['add', '-A'\]\)/.test(srcLF));
ok('暂存走显式路径清单', /git\(\['add', '-A', '--', \.\.\.keep/.test(srcLF));
ok('清单外的改动只报不删', /未纳入自动提交（不在允许清单/.test(srcLF)
  && !/commitAndPush[\s\S]{0,1400}(rmSync|unlinkSync)/.test(srcLF));
ok('拿不到改动清单时整轮放弃', /git status 失败/.test(srcLF));

// ── ⑥ 假成功：工作区干净但本地领先远端，也必须真的推上去 ─────────────
// 真实事故：0.61.0 发版提交只落在本地，autopublish 看到「允许清单内没有改动」
// 就直接返回，主流程却照样打印「完成：已推送 main」——远端整整落后一个版本，
// 日志还是绿的。干净工作区 ≠ 没有可推的东西。
ok('无改动时先查本地是否领先远端', /if \(!keep\.length\)[\s\S]{0,400}const n = aheadCount\(\);/.test(srcLF));
ok('领先数只有一份实现（取自 origin/main..HEAD）', /function aheadCount\(\)[\s\S]{0,200}'origin\/main\.\.HEAD'/.test(srcLF)
  && (srcLF.match(/origin\/main\.\.HEAD/g) || []).length === 1);
ok('本地领先时继续走推送', /允许清单内没有改动，但本地领先远端[\s\S]{0,2200}pushWithRetry/.test(srcLF));
ok('不再领先时明确返回 false', /if \(!keep\.length\)[\s\S]{0,400}if \(!n\)[\s\S]{0,200}return false;/.test(srcLF));
ok('推送成功后返回 true', /await pushWithRetry\(authArgs\(cfg\)[^;]*\);\n\s*log\([\s\S]{0,160}return true;/.test(srcLF));
ok('主流程按实际推送结果分别报告', /const pushed = await commitAndPush\(cfg\)/.test(srcLF)
  && /if \(pushed\)[\s\S]{0,400}无改动可推送/.test(srcLF));
ok('不再无条件打印已推送', !/clearError\(\);\n\s*log\(`完成：已推送 main/.test(srcLF));

// ── ⑦ 同一类漏口在更早的一处：源码指纹未变，也不代表没有要推的提交 ───────
// 文档回写、CHANGELOG、发版标记这些都不进指纹，改完 commit 后指纹一模一样，
// 原先这里直接 return——本地积压的提交永远不会被推上去。
ok('指纹未变时也查本地是否领先远端', /if \(!FORCE && state && state\.hash === hash\)[\s\S]{0,300}const n = aheadCount\(\);/.test(srcLF));
ok('指纹未变且不领先才真的跳过', /if \(!FORCE && state && state\.hash === hash\)[\s\S]{0,400}if \(!n\) \{[\s\S]{0,200}无改动，跳过[\s\S]{0,80}return;/.test(srcLF));
ok('指纹未变但领先时继续推送', /指纹未变（\$\{hash\.slice\(0, 12\)\}），但本地领先远端[\s\S]{0,80}继续推送/.test(srcLF));
ok('日志区分「指纹未变只推送」与「检测到改动」', /指纹未变，仅推送已提交的本地领先/.test(srcLF)
  && /检测到改动：/.test(srcLF));
