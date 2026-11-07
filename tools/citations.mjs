// B6 引文索引页：把「知识卡 → 书名 / 卷章 / 原文 / 链接」摊开，供人工核对。
// 生成自包含 HTML；CI 用 test/citations.test.mjs 重建并与磁盘逐字比对。
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { KNOWLEDGE } from '../engine/interpret-knowledge.js';
import { CARD_CITATIONS, patternCitations } from '../engine/citations.js';
// 原文与白话只在 citations-fuwen.js（不进分块），索引页要的正是这一份全库视图
import { allLibraryCitations as allCitations, citationOfAny as citationOf, patternChengCitations, qiongtongCitations, PATTERN_CHENG_CITATIONS, PATTERN_CHENG_UNMATCHED } from '../engine/citations-fuwen.js';

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
      usage.get(id).push(`格局·破·${p.name}`);
    }
  }
  for (const p of patternChengCitations()) {
    for (const id of p.citationIds) {
      if (!usage.has(id)) usage.set(id, []);
      usage.get(id).push(`格局·成·${p.name}`);
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

  const cheng = patternChengCitations();
  const chengRows = [
    ...cheng.map((p) => `<tr>
    <td class="id">${esc(p.name)}</td>
    <td>${p.citations.map((c) => `<div><a href="${esc(c.url)}" target="_blank" rel="noreferrer noopener">《${esc(c.bookName)}·${esc(c.chapter)}》</a><span class="quote"> ${esc(c.quote)}</span></div>`).join('')}</td>
    <td class="plain">${esc(p.note || '')}</td>
  </tr>`),
    ...Object.entries(PATTERN_CHENG_UNMATCHED).map(([name, reason]) => `<tr>
    <td class="id">${esc(name)}</td>
    <td><span class="st general">未配对原文</span></td>
    <td class="plain">${esc(reason)}</td>
  </tr>`),
  ].join('');

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
      : `${esc(e.book || '—')}${e.chapter ? `·${esc(e.chapter)}` : ''}${e.reason ? `<div class="muted">${esc(e.reason)}</div>` : ''}`}${e.note ? `<div class="muted">${esc(e.note)}</div>` : ''}</td>
  </tr>`).join('');

  // 穷通宝鉴 120 格：原文已经在浏览器里展示给用户，索引页必须能逐格核到同一份底本。
  // 行数据由 engine/qiongtong.js 现推，不另存一份原文，免得两处漂移。
  const qt = qiongtongCitations();
  const qtRows = qt.map((r) => `<tr>
    <td class="id">${esc(r.id)}</td>
    <td>${esc(r.chapter)}</td>
    <td>${r.yong.map((y, i) => `<span class="chip">${i === 0 ? '首取 ' : ''}${esc(y)}</span>`).join('')}</td>
    <td class="quote">${esc(r.quote)}${r.truncated ? '<span class="muted">（首段更长，摘句下略）</span>' : ''}</td>
    <td class="plain">${esc(r.plain)}${r.note ? `<div class="muted">${esc(r.note)}</div>` : ''}</td>
    <td><a href="${esc(r.url)}" rel="noreferrer noopener" target="_blank">原文</a></td>
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
  <div><b>${qt.length}</b>穷通格摘句</div>
  <div><b>${cheng.length}/${cheng.length + Object.keys(PATTERN_CHENG_UNMATCHED).length}</b>格局有成格原文</div>
</div>
<p>原文核验数据：<code>test/fixtures/citation-sources.json</code>（公共领域古籍；补页走只增不改的 <code>tools/merge-citation-sources.mjs</code>，<code>tools/sync-citation-sources.mjs</code> 会整份重写，慎用）；测试：<code>test/citations.test.mjs</code>。</p>

<h2>引文库</h2>
<div class="wrap"><table>
<thead><tr><th>ID</th><th>出处</th><th>原文</th><th>白话</th><th>用于</th><th>链接</th></tr></thead>
<tbody>${libRows}</tbody>
</table></div>

<h2>穷通宝鉴 120 格 → 原文摘句</h2>
<p>这 120 句摘句已经随 <code>engine/qiongtong.js</code> 打进浏览器，解析页「穷通宝鉴」节直接照录给用户，所以底本必须入库、逐格可核：每格对 <code>test/fixtures/citation-sources.json</code> 里的同一章页面校验为子串，章名与底本首行比对，一章管几个月令的标「合章」。用神顺序据通行整理表，与摘句依次提到的天干（末列）不同处可对照阅读；摘句在 96 字处截断的标明「下略」，不当成完整一句。</p>
<p class="muted">底本有两份，不要混着读：上面「引文库」里 <code>qiongtong</code> 那 1 条取自殆知阁藏本（<code>diancang.xyz</code>），本节 120 格取自 luckclub《穷通宝鉴》（<code>www.luckclub.cn/bazi/004/</code>，全书 114 章，入库的是 120 格用到的 109 章；徐乐吾评注本，摘句已剔掉「徐乐吾曰」段）。两本有异文，各按各的页面核验，不互相补字。</p>
<div class="wrap"><table>
<thead><tr><th>格</th><th>章节</th><th>用神顺序</th><th>原文摘句</th><th>说明</th><th>链接</th></tr></thead>
<tbody>${qtRows}</tbody>
</table></div>

<h2>格局 → 成格原文</h2>
<p>紫微 34 条格局逐条对《紫微斗数全书》：能对上句子的给书名、卷章与原句，并在末列写明原文条件与本插件判定条件的出入；对不上的单列「未配对原文」并说清缺什么，不拿相近的句子硬配。</p>
<div class="wrap"><table>
<thead><tr><th>格局</th><th>成格原文</th><th>与本插件判定的出入</th></tr></thead>
<tbody>${chengRows}</tbody>
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
