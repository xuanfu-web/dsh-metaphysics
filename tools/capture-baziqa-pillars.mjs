// 抓 BaziQA 全部真实命例的四柱 → test/fixtures/baziqa-pillars.json
//
// 来源：https://github.com/ChenJiangxi/BaziQA（ChenJiangxi/BaziQA），charts/bazi/*.json
// 走 api.github.com（raw.githubusercontent.com 在本机解析不了），contents API 取 base64。
//
// 只抓「出生资料 + 上游四柱 + 起运」这几项：题目正文与答案不抓，避免把竞赛题搬进本仓。
// 用途：给 docs/verification.html 提供一条「真实命例四柱对拍」——上游用 lunar-python 1.4.8 排盘，
// 本插件按同一份原文钟表时间重排，逐例比对年/月/日/时四柱。
//
// 用法：node tools/capture-baziqa-pillars.mjs [--commit <sha>] [--cache <dir>]

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'test', 'fixtures', 'baziqa-pillars.json');
const REPO = 'ChenJiangxi/BaziQA';
const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
const CACHE = arg('--cache', path.join(process.env.TEMP || '/tmp', 'baziqa-pillars'));
const sha256 = (b) => crypto.createHash('sha256').update(b).digest('hex');

const api = async (p) => {
  const r = await fetch(`https://api.github.com/repos/${REPO}/${p}`, {
    headers: { 'User-Agent': 'metaphysics-pillars-capture', Accept: 'application/vnd.github+json' },
  });
  if (!r.ok) throw new Error(`HTTP ${r.status} ${p}`);
  return r.json();
};

const commit = arg('--commit', null) || (await api('commits/main')).sha;
const listing = await api(`contents/charts/bazi?ref=${commit}`);
if (!Array.isArray(listing)) throw new Error('charts/bazi 不是目录');
console.log(`上游 ${REPO}@${commit.slice(0, 10)}，charts/bazi 下 ${listing.length} 个文件`);

const files = [];
const cases = [];
for (const f of listing.filter((x) => x.name.endsWith('.json')).sort((a, b) => a.name.localeCompare(b.name))) {
  const j = await api(`contents/charts/bazi/${f.name}?ref=${commit}`);
  const buf = Buffer.from(j.content, 'base64');
  const blobSha1 = crypto.createHash('sha1').update(Buffer.concat([Buffer.from(`blob ${buf.length}\0`), buf])).digest('hex');
  if (blobSha1 !== j.sha) throw new Error(`${f.name} blob sha1 不符：${blobSha1} != ${j.sha}`);
  if (buf.length !== f.size) throw new Error(`${f.name} 字节数与目录清单不符`);
  fs.mkdirSync(CACHE, { recursive: true });
  fs.writeFileSync(path.join(CACHE, f.name), buf);
  const doc = JSON.parse(buf.toString('utf8'));
  files.push({ name: f.name, bytes: buf.length, sha256: sha256(buf), blobSha: j.sha });

  for (const [pid, c] of Object.entries(doc.charts || {})) {
    const t = c.time || {};
    const clock = (t.clock && t.clock.datetime) || (c.chart && c.chart.datetime) || null;
    const stated = (t.stated && t.stated.datetime) || null;
    const p = c.chart && c.chart.pillars;
    if (!clock || !p) continue;
    cases.push({
      id: pid,
      file: f.name,
      caseNo: c.case_no || null,
      gender: c.gender,
      clock,
      stated,
      trueSolar: (t.true_solar && t.true_solar.datetime) || null,
      trueSolarMinutes: t.true_solar ? t.true_solar.correction_minutes : null,
      place: t.place || null,
      lon: typeof t.lon === 'number' ? t.lon : null,
      timezone: t.timezone || null,
      dstMinutes: t.dst_minutes || 0,
      // 上游 lunar-python 1.4.8 按 stated（原文钟表时间）排出的四柱；hour 为 null 表示上游也没有时辰
      upstream: [p.year.ganzhi, p.month.ganzhi, p.day.ganzhi, p.hour ? p.hour.ganzhi : null],
      dayMaster: (c.chart && c.chart.day_master) || null,
      qiyun: (c.chart && c.chart.qiyun) || null,
    });
  }
}

cases.sort((a, b) => (a.file + a.id).localeCompare(b.file + b.id));

const out = {
  meta: {
    source: `https://github.com/${REPO}`,
    upstreamPath: 'charts/bazi/',
    commit,
    commitUrl: `https://github.com/${REPO}/commit/${commit}`,
    upstreamEngine: 'lunar-python 1.4.8',
    timeConvention: 'stated（chart.datetime 取 time.clock.datetime，即原文钟表时间；本轮对拍让引擎自己扣夏令时）',
    scope: '只取 charts/bazi 下带 chart.datetime 与四柱的命例；竞赛题正文与答案不取',
    capturedAt: new Date().toISOString(),
    capture: 'tools/capture-baziqa-pillars.mjs（api.github.com contents，base64 解码后校验 git blob sha1 与字节数）',
    files,
    stats: {
      charts: cases.length,
      withDst: cases.filter((c) => c.dstMinutes > 0).length,
      timezones: cases.reduce((m, c) => { m[c.timezone || 'null'] = (m[c.timezone || 'null'] || 0) + 1; return m; }, {}),
    },
    caution:
      '上游 dst_minutes 来自其 Asia 时区库；本插件 engine/dst.js 的夏令时表只覆盖中国大陆时段，' +
      '香港/台北/新加坡等地夏令时未必落在表内。对拍时凡 dstMinutes>0 且非中国大陆年份的命例，' +
      '若时柱不同先查夏令时口径，不要直接判为排盘错误。',
  },
  cases,
};

fs.writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n', 'utf8');
console.log(`写入 ${path.relative(ROOT, OUT)}：${cases.length} 例 / ${fs.statSync(OUT).size} bytes`);
