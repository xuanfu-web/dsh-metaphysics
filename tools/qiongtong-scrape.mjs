import fs from 'node:fs';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const out = [];

for (let i = 1; i <= 113; i++) {
  const n = String(i).padStart(3, '0');
  const url = `https://www.luckclub.cn/bazi/004/${n}/`;
  let html;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    html = await res.text();
  } catch (e) {
    out.push({ n, url, error: String((e && e.message) || e) });
    continue;
  }
  const title = (html.match(/<h1[^>]*>\s*([^<]+?)\s*<\/h1>/) || [])[1] || '';
  const m = html.match(/<article[^>]*id="article-content"[^>]*>([\s\S]*?)<\/article>/);
  const lines = m
    ? m[1]
        .replace(/<h1[^>]*>[\s\S]*?<\/h1>/g, '')
        .replace(/<[^>]+>/g, '\n')
        .replace(/&nbsp;/g, ' ')
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
  out.push({ n, url, title, lines });
  await sleep(100);
}

fs.writeFileSync('./tools/_qt2.json', JSON.stringify(out, null, 1), 'utf8');
console.log('done', out.length, 'errors', out.filter((x) => x.error).length);
