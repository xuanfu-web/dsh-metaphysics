// D4 发布回滚：只生成步骤，不执行 registry / git 写操作
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { rollbackPlan, formatPlan } from '../tools/release-rollback.mjs';
import { ok, eq } from './_harness.mjs';

const opts = { name: 'dsh-metaphysics', version: '0.57.1', previous: '0.57.0' };
const vf = rollbackPlan({ ...opts, reason: 'verify-failed' });
const keys = vf.steps.map((s) => s.key);

// ── 核对失败：条目已建，附件不可用 ──
ok('核对失败标题点明条目已建', vf.headline.includes('已出现在 registry') && vf.headline.includes('附件'), vf.headline);
ok('五个回滚步骤齐全', keys.join(',') === 'dist-tag,deprecate,unpublish,bump,changelog', keys.join(','));
const tag = vf.steps.find((s) => s.key === 'dist-tag');
eq('latest 指回上一版', tag.cmd.join(' '), 'npm dist-tag add dsh-metaphysics@0.57.0 latest');
ok('dist-tag 可执行且有命令', tag.manual === false && !!tag.cmd);
const dep = vf.steps.find((s) => s.key === 'deprecate');
ok('deprecate 点名问题版本', dep.cmd.includes('dsh-metaphysics@0.57.1') && dep.cmd.join(' ').startsWith('npm deprecate'));
const unpub = vf.steps.find((s) => s.key === 'unpublish');
ok('unpublish 只给人工步骤', unpub.manual === true && unpub.cmd === null && unpub.note.includes('403'), unpub.note);
ok('不同版本不能重发', vf.steps.find((s) => s.key === 'bump').cmd.join(' ') === 'npm version patch --no-git-tag-version');
ok('CHANGELOG 要改回未发布', vf.steps.find((s) => s.key === 'changelog').note.includes('## 未发布'));
ok('默认不碰 tag', !keys.includes('tag-local') && !keys.includes('tag-remote'), keys.join(','));

// ── 发布失败：先确认条目是否建出来 ──
const pf = rollbackPlan({ ...opts, reason: 'publish-failed' });
eq('发布失败多一步探针', pf.steps[0].key, 'probe');
eq('探针查版本条目', pf.steps[0].cmd.join(' '), 'npm view dsh-metaphysics@0.57.1 version');
ok('发布失败标题说明先确认', pf.headline.includes('先确认条目'), pf.headline);

// ── 不知道上一版：不猜版本号，只给取法 ──
const noPrev = rollbackPlan({ name: 'dsh-metaphysics', version: '0.57.1', reason: 'verify-failed' });
const np = noPrev.steps.find((s) => s.key === 'dist-tag');
ok('没有上一版就不拼命令', np.cmd === null && np.manual === true, JSON.stringify(np));
ok('没有上一版给出取法', np.note.includes('dist-tags.latest'), np.note);

// ── 已打过 tag：多出本地与远端两步 ──
const tagged = rollbackPlan({ ...opts, reason: 'verify-failed', tagged: true });
ok('tagged 多两步', tagged.steps.some((s) => s.key === 'tag-local') && tagged.steps.some((s) => s.key === 'tag-remote'));
ok('本地 tag 命令带版本', tagged.steps.find((s) => s.key === 'tag-local').cmd.join(' ') === 'git tag -d v0.57.1');
ok('远端 tag 只给人工命令', tagged.steps.find((s) => s.key === 'tag-remote').manual === true);

// ── 未知 reason 回落到核对失败 ──
eq('未知 reason 回落', rollbackPlan({ ...opts, reason: 'oops' }).reason, 'verify-failed');

// ── 排版：命令逐条可复制，明确不自动执行，不出现 token ──
const text = formatPlan(vf);
ok('步骤编号', text.includes('1. 把 latest 指回上一版 0.57.0'), text.split('\n')[2]);
ok('命令以 $ 前缀', text.includes('$ npm dist-tag add dsh-metaphysics@0.57.0 latest'));
ok('明确只打印不执行', text.includes('默认只打印不执行') && text.includes('--apply dist-tag'));
ok('不打印 token', !/npm_[A-Za-z0-9]{6,}/.test(text));

// ── CLI 与接线 ──
const CLI = fs.readFileSync(new URL('../tools/release-rollback.mjs', import.meta.url), 'utf8');
ok('CLI 不联网', !/\bfetch\s*\(/.test(CLI), 'release-rollback.mjs 只出步骤');
const NODE = process.execPath;
const CLI_PATH = fileURLToPath(new URL('../tools/release-rollback.mjs', import.meta.url));
const cli = (argv, env = {}) => {
  try {
    return { code: 0, out: execFileSync(NODE, [CLI_PATH, ...argv], { encoding: 'utf8', env: { ...process.env, NPM_TOKEN: '', ...env } }) };
  } catch (e) {
    return { code: e.status, out: `${e.stdout || ''}${e.stderr || ''}` };
  }
};
const help = cli(['--help']);
eq('--help 正常退出', help.code, 0);
ok('--help 有用法', help.out.includes('用法：node tools/release-rollback.mjs'));
const badVer = cli(['--version', 'x']);
eq('坏版本号退出 1', badVer.code, 1);
ok('坏版本号有提示', badVer.out.includes('版本号不合法'));
const noVer = cli(['--previous', '0.57.0']);
eq('缺版本号退出 1', noVer.code, 1);
const planOut = cli(['--version', '0.57.1', '--previous', '0.57.0', '--reason', 'publish-failed']);
eq('CLI 打印计划退出 0', planOut.code, 0);
ok('CLI 打印可执行步骤', planOut.out.includes('$ npm dist-tag add dsh-metaphysics@0.57.0 latest'), planOut.out.slice(0, 200));
const applyNoToken = cli(['--version', '0.57.1', '--previous', '0.57.0', '--apply', 'dist-tag']);
eq('apply 缺 token 退出 1', applyNoToken.code, 1);
ok('apply 缺 token 有提示', applyNoToken.out.includes('NPM_TOKEN'));
const applyOther = cli(['--version', '0.57.1', '--previous', '0.57.0', '--apply', 'unpublish']);
eq('apply 不支持 unpublish', applyOther.code, 1);
ok('apply 拒绝说明原因', applyOther.out.includes('共享状态变更'), applyOther.out);

const REL = fs.readFileSync(new URL('../tools/release.mjs', import.meta.url), 'utf8');
ok('release 引入回滚计划', REL.includes("from './release-rollback.mjs'"));
ok('release 记住发布前的 latest', REL.includes("meta['dist-tags']") && REL.includes('previousLatest'));
ok('verify-only 补取 latest 且不把问题版本当上一版', REL.includes('latest !== pkg.version'));
ok('核对失败打印回滚', REL.includes("printRollback('verify-failed')"));
ok('发布失败打印回滚', REL.includes("printRollback('publish-failed')") && REL.includes('onFail'));
const PKG = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
eq('npm 脚本可单独跑回滚计划', PKG.scripts['rollback:plan'], 'node tools/release-rollback.mjs');