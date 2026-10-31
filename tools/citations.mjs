// B6 引文索引页：把「知识卡 → 书名 / 卷章 / 原文 / 链接」摊开，供人工核对。
// 生成自包含 HTML；CI 用 test/citations.test.mjs 重建并与磁盘逐字比对。
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { KNOWLEDGE } from '../engine/interpret-knowledge.js';
import { CARD_CITATIONS, allCitations, citationOf, patternCitations } from '../engine/citations.js';

const root = path.resolve(import.meta.dirname, '..');
const OUT = path.join(root, 'docs', 'citations.html');

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[c]));

const SYSTEM = {
  bazi: '八字', ziwei: '紫微', liuyao: '六爻', meihua: '梅花',
  daliuren: '大六壬', qimen: '奇门', tarot: '塔罗',
};

export function buildCitationsHTML() {
  const citations = allCitations();
  const usage = new Map();
  for (const [cardId, entry] of Object.entries(CARD_CITATIONS)) {
    for (const id of entry.refs || []) {
      if (!usage.has(id)) usage.set(id, []);
      usage.get(id).push(cardId);
    }
  }
  for (const p of patternCitations()) {
    for (const id of p.citationIds) {
      if (!usage.has(id)) usage.set(id, []);
      usage.get(id).push(`格局·${p.name}`);
    }
  }
  const cards = KNOWLEDGE.map((k) => {
    const e = CARD_CITATIONS[k.id];
    const refs = (e && e.refs || []).map(citationOf).filter(Boolean);
    const status = e ? (refs.length ? 'verified' : e.status) : 'missing';
    return { k, e: e || {}, refs, status };
  });
  const verified = cards.filter((c) => c.status === 'verified').length;
  const general = cards.filter((c) => c.status === 'general').length;
  const todo = cards.filter((c) => c.status === 'todo' || c.status === 'missing').length;

  const libRows = citations.map((c) => `<tr>
    <td class="id">${esc(c.id)}</td>
    <td>《${esc(c.bookName)}·${esc(c.chapter)}》</td>
    <td class="quote">${esc(c.quote)}</td>
    <td class="plain">${esc(c.plain || '')}</td>
    <td>${usage.has(c.id) ? usage.get(c.id).map((x) => `<span class="chip">${esc(x)}</span>`).join('') : '<span class="muted">—</span>'}</td>
    <td><a href="${esc(c.url)}" rel="noreferrer noopener" target="_blank">原文</a></td>
  </tr>`).join('');

  const cardRows = cards.map(({ k, e, refs, status }) => `<tr>
    <td class="id">${esc(k.id)}</td>
    <td>${esc(SYSTEM[k.system] || k.system)}</td>
    <td><span class="st ${status}">${status === 'verified' ? '已定位原文' : status === 'general' ? '通行说' : '待补'}</span></td>
    <td>${refs.length
      ? refs.map((c) => `<a href="${esc(c.url)}" target="_blank" rel="noreferrer noopener">《${esc(c.bookName)}·${esc(c.chapter)}》</a>`).join('<br>')
      : `${esc(e.book || '—')}${e.chapter ? `·${esc(e.chapter)}` : ''}${e.reason ? `<div class="muted">${esc(e.reason)}</div>` : ''}`}</td>
  </tr>`).join('');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>引文索引 · dsh-metaphysics</title>
<style>
:root{--bg:#fbfaf7;--fg:#221f1a;--muted:#7a7367;--line:#ded8cc;--ok:#2f6b45;--warn:#8a5a1f;--card:#fff}
@media (prefers-color-scheme:dark){:root{--bg:#12110d;--fg:#e8e2d6;--muted:#9b9384;--line:#3a352d;--ok:#7fbf95;--warn:#d8a45c;--card:#1a1813}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);font:14px/1.65 system-ui,-apple-system,"Segoe UI","Noto Sans SC",sans-serif}
main{max-width:1180px;margin:0 auto;padding:28px 18px 60px}
h1{font-size:22px;margin:0 0 6px}
h2{font-size:16px;margin:30px 0 10px}
p{color:var(--muted);margin:6px 0}
.sum{display:flex;flex-wrap:wrap;gap:10px;margin:16px 0}
.sum div{background:var(--card);border:1px solid var(--line);border-radius:9px;padding:8px 12px}
.sum b{font-size:18px;display:block}
table{width:100%;border-collapse:collapse;background:var(--card);border:1px solid var(--line);font-size:13px}
th,td{border-bottom:1px solid var(--line);padding:8px 10px;vertical-align:top;text-align:left}
th{font-weight:600;color:var(--muted);white-space:nowrap}
tr:last-child td{border-bottom:0}
.id{font-family:ui-monospace,Consolas,monospace;font-size:12px;white-space:nowrap}
.quote{max-width:360px}
.plain{max-width:260px;color:var(--muted)}
.chip{display:inline-block;border:1px solid var(--line);border-radius:99px;padding:0 7px;margin:1px 3px 1px 0;font-size:11.5px;color:var(--muted)}
.st{font-size:12px;border:1px solid var(--line);border-radius:99px;padding:1px 8px;white-space:nowrap}
.st.verified{color:var(--ok);border-color:var(--ok)}
.st.general{color:var(--warn);border-color:var(--warn)}
.st.todo,.st.missing{color:var(--warn);border-color:var(--warn);border-style:dashed}
.muted{color:var(--muted)}
a{color:var(--ok)}
.wrap{overflow:auto;border-radius:9px}
@media(max-width:760px){.quote,.plain{max-width:none}}
</style>
</head>
<body><main>
<h1>引文索引</h1>
<p>每张知识卡都指到一处出处：已定位到原文的，给书名、卷章、原文与链接，并由 CI 核验原文子串；属于通行说或尚未录入的，明确标出，不冒充原文。</p>
<div class="sum">
  <div><b>${cards.length}</b>知识卡</div>
  <div><b>${verified}</b>已定位原文</div>
  <div><b>${general}</b>通行说</div>
  <div><b>${todo}</b>待补</div>
  <div><b>${citations.length}</b>引文条目</div>
</div>
<p>原文核验数据：<code>test/fixtures/citation-sources.json</code>（公共领域古籍，由 <code>tools/sync-citation-sources.mjs</code> 抓取）；测试：<code>test/citations.test.mjs</code>。</p>

<h2>引文库</h2>
<div class="wrap"><table>
<thead><tr><th>ID</th><th>出处</th><th>原文</th><th>白话</th><th>用于</th><th>链接</th></tr></thead>
<tbody>${libRows}</tbody>
</table></div>

<h2>知识卡 → 出处</h2>
<div class="wrap"><table>
<thead><tr><th>知识卡</th><th>体系</th><th>状态</th><th>出处 / 说明</th></tr></thead>
<tbody>${cardRows}</tbody>
</table></div>
<p class="muted">说明：标「通行说」的条目，本插件按通行取法实现，但尚未定位到可逐字核验的单一条文；标「待补」的条目尚未完成实现或录入。两者都不算已核验引文。</p>
</main></body></html>
`;
}

export function writeCitationsPage() {
  const html = buildCitationsHTML();
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, html, 'utf8');
  return { file: OUT, bytes: Buffer.byteLength(html) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const r = writeCitationsPage();
  console.log(`written: ${path.relative(root, r.file)} (${Math.round(r.bytes / 1024)} KB)`);
}
