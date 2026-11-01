#!/usr/bin/env node
// 发布失败的回滚步骤生成器：只出步骤，不执行任何 registry / git 写操作。
//
//   node tools/release-rollback.mjs --version 0.57.1 --previous 0.57.0
//   node tools/release-rollback.mjs --version 0.57.1 --reason publish-failed --tagged
//   node tools/release-rollback.mjs --version 0.57.1 --previous 0.57.0 --apply dist-tag
//
// --apply 只认 dist-tag（把 latest 指回上一版），需要 NPM_TOKEN；unpublish / deprecate /
// 删远程 tag 都属于共享状态变更，一律只打印命令，由人确认后手动执行。
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const REASONS = ['publish-failed', 'verify-failed'];

/**
 * @param {{name:string, version:string, previous?:string, reason?:string, tagged?:boolean}} o
 * @returns {{reason:string, headline:string, steps:Array<{label:string, cmd:string[]|null, note:string, manual:boolean, key?:string}>}}
 */
export function rollbackPlan(o = {}) {
  const name = o.name || 'dsh-metaphysics';
  const version = String(o.version || '');
  const previous = o.previous ? String(o.previous) : '';
  const reason = REASONS.includes(o.reason) ? o.reason : 'verify-failed';
  const target = previous || '<上一版>';
  const steps = [];

  if (reason === 'publish-failed') {
    steps.push({
      label: '先确认版本条目有没有建出来',
      cmd: ['npm', 'view', `${name}@${version}`, 'version'],
      note: '没有输出＝没建条目，修好原因直接重发即可；有输出则按下面回退 latest。',
      manual: false,
      key: 'probe',
    });
  }

  steps.push({
    label: `把 latest 指回上一版 ${target}`,
    cmd: previous ? ['npm', 'dist-tag', 'add', `${name}@${previous}`, 'latest'] : null,
    note: previous
      ? '只改 dist-tag，不删除任何版本；装包的人会继续拿到上一版。'
      : `先跑 npm view ${name} dist-tags.latest 拿到上一版号，再执行本条。`,
    manual: !previous,
    key: 'dist-tag',
  });

  steps.push({
    label: '标记问题版本，避免有人装到',
    cmd: ['npm', 'deprecate', `${name}@${version}`, '发布核对未通过，请勿安装；latest 已回退'],
    note: 'deprecate 不删包、不影响已安装的人；npm 会在安装时打印这句。',
    manual: false,
    key: 'deprecate',
  });

  steps.push({
    label: '删除问题版本（网页 + 2FA）',
    cmd: null,
    note: 'automation/granular token 无权 unpublish（会被 403 拒绝），到网页版本页用 2FA 删除；'
      + '删不掉就保留 deprecate，直接发下一个补丁号。',
    manual: true,
    key: 'unpublish',
  });

  steps.push({
    label: '升补丁号，准备重发',
    cmd: ['npm', 'version', 'patch', '--no-git-tag-version'],
    note: 'registry 不允许同版本重发；版本号、CHANGELOG 顶部标题一起改。',
    manual: false,
    key: 'bump',
  });

  steps.push({
    label: 'CHANGELOG 改回未发布段',
    cmd: null,
    note: `把顶部「## ${version}（…，已发布）」改回「## 未发布」，把这次内容并在下一版里补记。`,
    manual: true,
    key: 'changelog',
  });

  if (o.tagged) {
    steps.push({
      label: '删本地 tag，并把删除推到远端',
      cmd: ['git', 'tag', '-d', `v${version}`],
      note: `删远程 tag 会改写别人看到的历史：确认后手动执行 git push origin :refs/tags/v${version}。`,
      manual: false,
      key: 'tag-local',
    });
    steps.push({
      label: '删除远端 tag（手动确认）',
      cmd: null,
      note: `git push origin :refs/tags/v${version}——只在 tag 指向错误提交、且没有人依赖它时做。`,
      manual: true,
      key: 'tag-remote',
    });
  }

  const headline = reason === 'verify-failed'
    ? `${name}@${version} 已出现在 registry，但附件核对没通过：先回退 latest，再处理问题版本`
    : `${name}@${version} 发布失败：先确认条目是否已建，再决定回退 latest 还是直接重发`;
  return { reason, headline, steps };
}

export function formatPlan(plan) {
  const lines = [plan.headline, ''];
  plan.steps.forEach((s, i) => {
    lines.push(`${i + 1}. ${s.label}${s.manual ? '（手动）' : ''}`);
    if (s.cmd) lines.push(`   $ ${s.cmd.join(' ')}`);
    if (s.note) lines.push(`   ${s.note}`);
  });
  lines.push('', '默认只打印不执行；单独跑本工具时可用 --apply dist-tag 代为执行第 1 步（需要 NPM_TOKEN）。');
  return lines.join('\n');
}

// ── CLI ─────────────────────────────────────────────────────
function main(argv) {
  const opt = { name: 'dsh-metaphysics', version: '', previous: '', reason: 'verify-failed', tagged: false, apply: '' };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--version') opt.version = argv[++i];
    else if (a === '--previous') opt.previous = argv[++i];
    else if (a === '--name') opt.name = argv[++i];
    else if (a === '--reason') opt.reason = argv[++i];
    else if (a === '--tagged') opt.tagged = true;
    else if (a === '--apply') opt.apply = argv[++i];
    else if (a === '--help' || a === '-h') {
      console.log('用法：node tools/release-rollback.mjs --version <当前版本> [--previous <上一版>] [--reason publish-failed|verify-failed] [--tagged] [--apply dist-tag]');
      return 0;
    } else {
      console.error(`未知参数：${a}`);
      return 1;
    }
  }
  if (!/^\d+\.\d+\.\d+/.test(opt.version)) {
    console.error('缺少 --version，或版本号不合法');
    return 1;
  }
  if (!REASONS.includes(opt.reason)) {
    console.error(`--reason 只能是 ${REASONS.join(' / ')}`);
    return 1;
  }
  const plan = rollbackPlan(opt);
  console.log(formatPlan(plan));
  if (!opt.apply) return 0;
  if (opt.apply !== 'dist-tag') {
    console.error(`\n--apply 只支持 dist-tag；${opt.apply} 属于共享状态变更，请手动执行。`);
    return 1;
  }
  if (!opt.previous) {
    console.error('\n--apply dist-tag 需要 --previous，避免把 latest 指到猜出来的版本。');
    return 1;
  }
  const token = process.env.NPM_TOKEN || '';
  if (!token) {
    console.error('\n--apply 需要 NPM_TOKEN（只从环境变量读，不落盘）。');
    return 1;
  }
  const tmpDir = mkdtempSync(path.join(os.tmpdir(), 'dsh-rb-'));
  const npmrc = path.join(tmpDir, '.npmrc');
  try {
    writeFileSync(npmrc, `//registry.npmjs.org/:_authToken=${token}\n`, { mode: 0o600 });
    const r = spawnSync('npm', ['dist-tag', 'add', `${opt.name}@${opt.previous}`, 'latest', '--userconfig', npmrc], { stdio: 'inherit' });
    return r.status === 0 ? 0 : 1;
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.filename)) {
  process.exit(main(process.argv.slice(2)));
}