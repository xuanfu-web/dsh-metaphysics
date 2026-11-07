// 只补缺、不改写：给 test/fixtures/citation-sources.json 里还没有的 URL 增取正文，
// 已经存在的每一页都原样留着，一个字节都不动。
//
// 为什么不用 tools/sync-citation-sources.mjs：那个脚本整本重写，只写它这一轮抓到的页，
// 手工并进来的正文（以及抓取偶发失败留下的旧正文）会被它一并冲掉。
// 新增书目一律走这个；要重抓某一页，先删掉那个 key 再跑。
//
//   node tools/merge-citation-sources.mjs
import fs from 'node:fs';
import path from 'node:path';
import { citationURLs, fetchChapterText, minChapterLength } from './citation-fetch.mjs';

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'test', 'fixtures', 'citation-sources.json');

const fx = JSON.parse(fs.readFileSync(out, 'utf8'));
const wanted = citationURLs();
const missing = wanted.filter((u) => !fx.chapters[u]);
console.log(`fixture 现有 ${Object.keys(fx.chapters).length} 页，全库要 ${wanted.length} 页，缺 ${missing.length} 页`);

let added = 0;
for (const url of missing) {
  process.stdout.write(`fetch ${url} … `);
  // 一次补上百页时对站点留点间隔，别把公共古籍站打疼
  if (added) await new Promise((r) => setTimeout(r, 150));
  try {
    const text = await fetchChapterText(url);
    const min = minChapterLength(url);
    if (!text || text.length < min) throw new Error(`正文过短（${(text || '').length} < ${min}）`);
    fx.chapters[url] = text.trim();
    added++;
    console.log(`${text.length} 字`);
  } catch (e) {
    console.log(`失败：${e.message}`);
    process.exitCode = 1;
  }
}

// 已有的一页都不动；fetchedAt 记的是整本同步的时间，所以补录另起一行标注
if (added) {
  const mergedAt = `${new Date().toISOString().slice(0, 10)} 追加 ${added} 页（tools/merge-citation-sources.mjs，只补缺不改写）`;
  const next = { note: fx.note, fetchedAt: fx.fetchedAt, mergedAt, chapters: fx.chapters };
  fs.writeFileSync(out, `${JSON.stringify(next, null, 2)}\n`, 'utf8');
  console.log(`\n写入 ${path.relative(root, out)}：新增 ${added} 页，其余 ${Object.keys(fx.chapters).length - added} 页原样保留`);
} else {
  console.log('没有缺口，未改动文件');
}
