#!/usr/bin/env node
// 在 GitHub 上建 Release（或补齐/更新已有 Release）。
//
// 为什么需要它：release.mjs 只管 npm 发布，push-tag.mjs 只管把 tag 推到远端。
// 两者都不碰 Releases API —— 所以 tag 全在、Releases 页面却从 v0.63.0 起断档，
// 而那些早期 Release 是手工点出来的。发布动作靠手工兜底，早晚会漏，这个脚本补上这一段。
//
// 用法：
//   node tools/gh-release.mjs                    # 用 package.json 版本号，取 CHANGELOG 对应小节
//   node tools/gh-release.mjs v0.64.0            # 指定版本（用于补齐历史）
//   node tools/gh-release.mjs --all-missing      # 扫本地所有 tag，把远端缺 Release 的全部补齐
//   node tools/gh-release.mjs --dry-run          # 只打印将要建什么，不写远端
//   node tools/gh-release.mjs v0.64.0 --notes-from CHANGELOG.md
//
// 凭据：<用户目录>/.dsh/metaphysics-autopublish.json 的 githubToken，
//      可用 GH_RELEASE_CONFIG 指向别的文件（CI 用假凭据跑 dry-run 时不必真 token）。
//
// 幂等：已存在同名 Release 时改为 PATCH 更新 body，不会重复创建。

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const PKG = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const allMissing = args.includes('--all-missing');
const notesIdx = args.indexOf('--notes-from');
const notesFile = notesIdx >= 0 ? args[notesIdx + 1] : 'CHANGELOG.md';
const named = args.find((a) => /^v\d+\.\d+\.\d+/.test(a));

const log = (m) => console.log(m);
const fail = (m) => { console.error(`\n✗ ${m}\n`); process.exit(1); };

function findGit() {
  if (process.env.GH_RELEASE_GIT) return process.env.GH_RELEASE_GIT;
  return 'git';
}

function git(gitArgs) {
  return spawnSync(findGit(), gitArgs, { cwd: root, encoding: 'utf8' });
}

function loadConfig() {
  const file = process.env.GH_RELEASE_CONFIG
    || path.join(os.homedir(), '.dsh', 'metaphysics-autopublish.json');
  if (!fs.existsSync(file)) return null;
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { return null; }
}

function repoSlug() {
  const url = String((PKG.repository && (PKG.repository.url || PKG.repository)) || '');
  const m = /github\.com[:/]([^/]+)\/([^/.]+)/.exec(url);
  return m ? { owner: m[1], repo: m[2] } : null;
}

/**
 * 从 CHANGELOG 里取出某个版本的小节。
 * 小节从 `## 0.66.0…` 起，到下一条 `## ` 或文件尾为止。
 * 版本号在标题里写作 0.66.0（不带 v），tag 带 v，这里统一剥掉 v 再比。
 */
function sectionOf(version) {
  const file = path.join(root, notesFile);
  if (!fs.existsSync(file)) return null;
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  const want = version.replace(/^v/, '');
  const head = new RegExp(`^##\\s+${want.replace(/\./g, '\\.')}(\\D|$)`);
  const start = lines.findIndex((l) => head.test(l));
  if (start < 0) return null;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^##\s/.test(lines[i])) { end = i; break; }
  }
  // 去掉标题行本身与紧随其后的空行；标题写成 Release 名的副标题
  const raw = lines.slice(start + 1, end).join('\n').replace(/^\s*\n/, '').trim();
  // 主题句（`> 本段主题：xxx`）最适合当 Release 名；没有就退回版本号
  const topicLine = raw.split('\n').find((l) => /^>\s*本段主题/.test(l)) || '';
  const topic = topicLine
    .replace(/^>\s*本段主题[：:]\s*/, '')
    .replace(/\*\*/g, '')
    .split(/——|—|，|,/)[0]
    .trim();
  return {
    title: lines[start].replace(/^##\s+/, '').trim(),
    topic,
    body: raw,
  };
}

async function ghApi(cfg, method, apiPath, body) {
  const res = await fetch(`https://api.github.com${apiPath}`, {
    method,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `token ${cfg.githubToken}`,
      'User-Agent': 'dsh-metaphysics-gh-release',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch (e) { json = null; }
  return { ok: res.ok, status: res.status, json, text };
}

async function existingRelease(cfg, slug, tag) {
  const r = await ghApi(cfg, 'GET', `/repos/${slug.owner}/${slug.repo}/releases/tags/${tag}`);
  if (r.ok) return r.json;
  if (r.status === 404) return null;
  throw new Error(`查 Release 失败 ${r.status}: ${r.text.slice(0, 200)}`);
}

/** 建或更新一个 Release。tag 必须在远端存在，否则 API 会 422 —— 这里先探一下再建。 */
async function upsert(cfg, slug, tag, notes) {
  const remoteTag = await ghApi(cfg, 'GET', `/repos/${slug.owner}/${slug.repo}/git/ref/tags/${tag}`);
  if (!remoteTag.ok) {
    return { skipped: true, reason: `远端没有 tag ${tag}（先跑 tools/push-tag.mjs）` };
  }
  const cur = await existingRelease(cfg, slug, tag);
  const payload = {
    tag_name: tag,
    name: notes.topic ? `${tag}｜${notes.topic}` : tag,
    body: notes.body,
    draft: false,
    prerelease: false,
  };
  if (cur) {
    const r = await ghApi(cfg, 'PATCH', `/repos/${slug.owner}/${slug.repo}/releases/${cur.id}`, payload);
    if (!r.ok) throw new Error(`更新 Release ${tag} 失败 ${r.status}: ${r.text.slice(0, 300)}`);
    return { updated: true, url: r.json.html_url };
  }
  const r = await ghApi(cfg, 'POST', `/repos/${slug.owner}/${slug.repo}/releases`, payload);
  if (!r.ok) throw new Error(`创建 Release ${tag} 失败 ${r.status}: ${r.text.slice(0, 300)}`);
  return { created: true, url: r.json.html_url };
}

function localTags() {
  const r = git(['tag', '-l', 'v*', '--sort=v:refname']);
  if (r.status !== 0) return [];
  return r.stdout.split('\n').map((s) => s.trim()).filter(Boolean);
}

async function main() {
  const slug = repoSlug();
  if (!slug) fail('package.json 的 repository.url 里读不出 owner/repo');

  const cfg = loadConfig();
  if (!cfg || !cfg.githubToken) {
    if (dryRun) log('（dry-run：没有凭据也照跑，不写远端）');
    else fail('缺少 githubToken：<用户目录>/.dsh/metaphysics-autopublish.json 的 githubToken 字段');
  }

  // 要处理的 tag 列表
  let tags;
  if (allMissing) {
    tags = localTags();
    log(`扫本地 ${tags.length} 个 tag，找远端缺 Release 的`);
  } else {
    tags = [named || `v${PKG.version}`];
  }

  const results = [];
  for (const tag of tags) {
    const notes = sectionOf(tag);
    if (!notes) {
      if (allMissing) continue; // 历史 tag 在 CHANGELOG 里没有对应小节，跳过而不是瞎编
      fail(`CHANGELOG 里找不到 ${tag} 对应的小节（找的是「## ${tag.replace(/^v/, '')}」）`);
    }
    if (allMissing && cfg) {
      const cur = await existingRelease(cfg, slug, tag);
      if (cur) continue; // 已有就跳过，别把手工写过的正文覆盖掉
    }
    if (dryRun) {
      log(`[dry-run] ${tag}  name=「${notes.topic ? tag + '｜' + notes.topic : tag}」  body=${notes.body.length} 字`);
      continue;
    }
    const out = await upsert(cfg, slug, tag, notes);
    if (out.skipped) { log(`— ${tag} 跳过：${out.reason}`); continue; }
    log(`${out.created ? '已创建' : '已更新'} Release ${tag}  ${out.url}`);
    results.push(tag);
  }

  if (!dryRun) log(`\n完成：处理 ${results.length} 个 Release${results.length ? '（' + results.join(', ') + '）' : ''}`);
}

main().catch((e) => fail(e && e.stack ? e.stack : String(e)));
