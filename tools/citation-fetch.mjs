// 引文底本抓取：URL 全集 + 按站点提取正文 + 正文长度下限。
// sync（整份重写）与 merge（只补缺）共用这一份，免得两边对「全库要哪些页」「怎么算正文」口径不一致。
import { execFileSync } from 'node:child_process';
import { CLASSICS } from '../engine/classics.js';
import { LIBRARY_CITATIONS, qiongtongCitations } from '../engine/citations-fuwen.js';

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

// luckclub 的正文在 <article id="article-content">；保留首行 h1 章名，
// 这样 fixture 里既有章名又有正文，qiongtong-build 才能只靠这份已入库底本重建 120 格。
function luckclubText(html) {
  const m = /<article[^>]*id="article-content"[^>]*>([\s\S]*?)<\/article>/i.exec(html);
  if (!m) return '';
  return stripTags(m[1].replace(/<\/(h1|h2|h3|p|div|li|tr)>/gi, '\n').replace(/<br\s*\/?>/gi, '\n'));
}

/** 全库要核验的 URL：八字三书 + 引擎侧与附文库 + 穷通宝鉴 120 格（摘句已随包发布，底本同样要入库） */
export function citationURLs() {
  return [...new Set([...CLASSICS, ...LIBRARY_CITATIONS, ...qiongtongCitations()].map((c) => c.url))];
}

/** 正文短到这个字数以下就当抓取失败：luckclub 靠 article 定位，抓不到返回空串，短章合法；diancang 会退回 meta description，要兜底 */
export function minChapterLength(url) {
  return url.includes('luckclub.cn') ? 40 : 200;
}

export async function fetchChapterText(url) {
  if (url.includes('zh.wikisource.org')) {
    // 本机 node fetch 对 wikisource 双栈超时；curl 偶发截断，重试到正文足够长
    const title = url.split('/wiki/')[1];
    const api = `https://zh.wikisource.org/w/index.php?title=${encodeURIComponent(title)}&action=raw`;
    let last = '';
    for (let i = 0; i < 5; i++) {
      try {
        last = execFileSync('curl', ['-sL', '--compressed', '--max-time', '60', '-A', 'Mozilla/5.0', api], { encoding: 'utf8' });
      } catch {
        last = '';
      }
      if (last.length > 5000) break;
    }
    return last;
  }
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const html = await res.text();
  return url.includes('luckclub.cn') ? luckclubText(html) : diancangText(html);
}