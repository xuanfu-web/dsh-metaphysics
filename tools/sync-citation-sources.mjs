// 抓取引文原文，写入 test/fixtures/citation-sources.json，供 CI 做「原文子串」核验。
//
// 只在需要新增/更新引文时手动跑：node tools/sync-citation-sources.mjs
// 抓取的是公共领域古籍正文：典藏网（子平真诠 / 滴天髓 / 三命通会）与维基文库（紫微斗数全书）。
// CI 不联网，只读这份 fixture。
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { CLASSICS } from '../engine/classics.js';
import { CITATIONS } from '../engine/citations.js';

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'test', 'fixtures', 'citation-sources.json');

const decode = (s) => s
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&#(\d+);/g, (_m, n) => String.fromCodePoint(Number(n)));

function stripTags(html) {
  return decode(html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, ''));
}

function diancangText(html) {
  const m = /<div id="content"[^>]*>([\s\S]*?)<\/div>\s*<script/i.exec(html)
    || /<div id="content"[^>]*>([\s\S]*?)<\/div>/i.exec(html);
  if (m) return stripTags(m[1]);
  const d = /<meta name="description" content="([^"]*)"/i.exec(html);
  return d ? decode(d[1]) : '';
}

async function fetchText(url) {
  if (url.includes('zh.wikisource.org')) {
    // Node fetch 在本机对 wikisource 双栈超时；curl 可用但偶发截断，改为重试到正文足够长
    const title = url.split('/wiki/')[1];
    const api = `https://zh.wikisource.org/w/index.php?title=${encodeURIComponent(title)}&action=raw`;
    let last = '';
    for (let i = 0; i < 5; i++) {
      try {
        last = execFileSync('curl', ['-sL', '--compressed', '--max-time', '60', '-A', 'Mozilla/5.0', api], { encoding: 'utf8' });
      } catch (e) {
        last = '';
      }
      if (last.length > 5000) return last;
    }
    return last;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return diancangText(await res.text());
}

const urls = [...new Set([...CLASSICS, ...CITATIONS].map((c) => c.url))];
const chapters = {};
for (const url of urls) {
  process.stdout.write(`fetch ${url} … `);
  try {
    const text = await fetchText(url);
    if (!text || text.length < 80) throw new Error(`正文过短（${text.length}）`);
    chapters[url] = text.trim();
    console.log(`${text.length} 字`);
  } catch (e) {
    console.log(`失败：${e.message}`);
    process.exitCode = 1;
  }
}

if (Object.keys(chapters).length) {
  fs.writeFileSync(out, `${JSON.stringify({
    note: '引文核验用原文，公共领域古籍；由 tools/sync-citation-sources.mjs 抓取。CI 不联网，只读本文件。',
    fetchedAt: new Date().toISOString().slice(0, 10),
    chapters,
  }, null, 2)}\n`, 'utf8');
  console.log(`\n写入 ${path.relative(root, out)}：${Object.keys(chapters).length} 页`);
}
