// 整份重抓引文底本，写入 test/fixtures/citation-sources.json，供 CI 做「原文子串」核验。
//
//   node tools/sync-citation-sources.mjs
//
// 与 tools/merge-citation-sources.mjs 的分工：merge 只补缺、已有页一个字节不动；
// 这个脚本按当天线上页面重抓全部 URL，upstream 改字会让几十条校验一起变红。
// 日常新增书目走 merge；只有确认要整份刷新底本时才跑这个。
// 任何一页抓失败就整轮不写盘——半份 fixture 会把没抓到的页悄悄删掉。
// CI 不联网，只读这份 fixture。
import fs from 'node:fs';
import path from 'node:path';
import { citationURLs, fetchChapterText, minChapterLength } from './citation-fetch.mjs';

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'test', 'fixtures', 'citation-sources.json');

const urls = citationURLs();
const chapters = {};
const failed = [];
for (const [i, url] of urls.entries()) {
  process.stdout.write(`fetch ${url} … `);
  if (i) await new Promise((r) => setTimeout(r, 150));
  try {
    const text = await fetchChapterText(url);
    const min = minChapterLength(url);
    if (!text || text.length < min) throw new Error(`正文过短（${(text || '').length} < ${min}）`);
    chapters[url] = text.trim();
    console.log(`${text.length} 字`);
  } catch (e) {
    console.log(`失败：${e.message}`);
    failed.push(url);
  }
}

if (failed.length) {
  console.error(`\n${failed.length}/${urls.length} 页抓取失败，未写盘（免得把原有正文冲掉）：\n  ${failed.join('\n  ')}`);
  process.exitCode = 1;
} else {
  fs.writeFileSync(out, `${JSON.stringify({
    note: '引文核验用原文，公共领域古籍；由 tools/sync-citation-sources.mjs 抓取。CI 不联网，只读本文件。',
    fetchedAt: new Date().toISOString().slice(0, 10),
    chapters,
  }, null, 2)}\n`, 'utf8');
  console.log(`\n写入 ${path.relative(root, out)}：${Object.keys(chapters).length} 页`);
}