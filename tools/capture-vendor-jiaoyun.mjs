// 采集公开排盘页面的固定示例 → test/fixtures/vendor-jiaoyun-pages.json
//
// 为什么要单独一份：BaziQA 是机器排盘结果，页面示例是「人写出来的口径声明」，两者证据强度不同。
// 页面只写了几岁几个月，就不能替它补出「几天」；页面没印四柱，就不能把本插件自己算的四柱记成厂家值。
// 这里对每个声称的值都做「在页面原文里出现 / 不出现」的正反校验，校验不过直接抛错。
//
// 用法：node tools/capture-vendor-jiaoyun.mjs [--cache <dir>]
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'test', 'fixtures', 'vendor-jiaoyun-pages.json');
const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
const CACHE = arg('--cache', path.join(process.env.TEMP || '/tmp', 'my-jiaoyun'));
const sha256 = (b) => crypto.createHash('sha256').update(b).digest('hex');
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ');

const PAGES = [
  { key: 'yuanzi', url: 'https://yuanzizhiyi.com/methods/validation-cases', file: 'yuanzizhiyi.html' },
  { key: 'multifate', url: 'https://multifate.com/zh/tools/bazi/luck-pillars', file: 'multifate_com_zh_tools_bazi_luck-pillars.html' },
  { key: 'lingtai', url: 'https://lingtai.cc/zh-TW/guides/bazi-luck-pillar-start-age', file: 'lingtai_cc_zh-TW_guides_bazi-luck-pillar-start-age.html' },
  { key: 'pipa', url: 'https://www.pipa8.com/bazi/1047', file: 'www_pipa8_com_bazi_1047.html' },
];

const texts = {};
const meta = [];
for (const p of PAGES) {
  let html;
  const cachePath = path.join(CACHE, p.file);
  const r = await fetch(p.url, { headers: { 'User-Agent': 'Mozilla/5.0 (metaphysics-jiaoyun-capture)' } });
  if (r.ok) {
    html = Buffer.from(await r.arrayBuffer());
    fs.mkdirSync(CACHE, { recursive: true });
    fs.writeFileSync(cachePath, html);
  } else if (fs.existsSync(cachePath)) {
    html = fs.readFileSync(cachePath);
    console.log(`！${p.key} 取页失败 HTTP ${r.status}，改用本地缓存 ${p.file}（如实记录）`);
  } else throw new Error(`${p.key} HTTP ${r.status} 且无缓存`);
  const t = strip(html.toString('utf8'));
  texts[p.key] = t;
  // 有的页面每次响应带不同 nonce/时间戳：HTML 字节哈希会漂，正文哈希才稳定。两个都记，复核以正文为准。
  meta.push({ key: p.key, url: p.url, httpStatus: r.status, bytes: html.length, sha256: sha256(html), textChars: t.length, textSha256: sha256(Buffer.from(t, 'utf8')), fromCache: !r.ok });
  console.log(`${p.key} HTTP ${r.status} ${html.length}B 正文 ${t.length} 字 html=${sha256(html).slice(0, 12)} text=${sha256(Buffer.from(t, 'utf8')).slice(0, 12)}`);
}

// 正反校验：present 里的串必须在原文出现，absent 里的必须不出现。
const check = (key, present, absent = []) => {
  const t = texts[key];
  for (const s of present) if (!t.includes(s)) throw new Error(`${key} 原文找不到声称值：「${s}」`);
  for (const s of absent) if (t.includes(s)) throw new Error(`${key} 原文竟出现了声称未公布的值：「${s}」`);
};
const span = (key, anchor, before, after) => {
  const t = texts[key];
  const i = t.indexOf(anchor);
  if (i < 0) throw new Error(`${key} 定位不到锚点「${anchor}」`);
  return t.slice(Math.max(0, i - before), i + after);
};

check('yuanzi', ['1988-08-09 02:53', '戊辰、庚申、丙申、己丑', '9 年 10 个月 21 天 12 小时', '1998-06-30 13:53',
  '首个完整大运为辛酉', '夏令时，UTC+09:00', '出生后的下一“节”：白露', '1983-12-08 23:30', '癸亥年、甲子月、辛未日、戊子时',
  '癸亥年、甲子月、庚午日、丙子时', '130.97', '真太阳时 1983-12-08 23:21', '2024 年立春时刻为北京时间 02-04 16:27']);
check('multifate', ['1990年5月15日14时30分', '7岁2个月', '1997年8月4日起', '壬午'], ['庚午', '辛巳', '庚辰', '14:30']);
check('lingtai', ['2026年1月1日08:00', '8年4月15日', '2034年5月16日', '東經121.5°', '+6分鐘', '不含均時差',
  '大雪為12月7日05:05', '25天3小時', '乙巳、戊子、乙亥、庚辰四柱', '男性']);
check('pipa', ['【乾造】乙未甲申己未己巳', '戊午年七月廿二', '1978-08-25', '真太阳时 9时 至 11时 之间',
  '立秋 时刻 ： 1978-08-08 05:17:40', '白露 时刻 ： 1978-09-08 08:02:24', '5年 8个月', '1984-04-24左右', '癸未 壬午 辛巳 庚辰']);

const fixture = {
  meta: {
    capturedAt: new Date().toISOString(),
    capture: 'tools/capture-vendor-jiaoyun.mjs（取原页 HTML → 去标签正文 → 对每个声称值做出现/不出现校验）',
    generator: 'tools/gen-jiaoyun-data.mjs',
    pages: meta,
    policy: '只录页面自己印出来的值。页面没印的字段一律 null，并在 published 里标 false；'
      + '本插件自己算出来的值绝不记成厂家值。页面自相矛盾的整例判 unusable，不进命中率。',
    caution: '页面示例多为「虚构人物／假设资料」，不是真人命例；它们证明的是口径与算术一致，不是预测准确。'
      + '页面随时可改版，正文引文与 textSha256 是本次采集的凭据；部分页面每次响应带不同 nonce，html sha256 会漂而正文不漂，'
      + '所以复核以正文引文／textSha256 为准。重采后若正文不一致须重新裁决，不静默覆盖。',
  },
  quotes: {
    yuanziCase3: span('yuanzi', '案例 3：固定四柱与起运基准', 0, 1200),
    yuanziCase1: span('yuanzi', '案例 1：23:00 子初与午夜换日', 0, 460),
    yuanziCase2: span('yuanzi', '案例 2：鸡西真太阳时跨过 23:00', 0, 700),
    yuanziCase5: span('yuanzi', '案例 5：北京与纽约在同一立春瞬间换年、换月', 0, 420),
    multifateExample: span('multifate', '八字大运排盘示例：1990年出生的男命', 0, 700),
    lingtaiFields: span('lingtai', '先看三個字段，不要只比幾歲的整數', 100, 700),
    lingtaiCalc: span('lingtai', '本站當前八字輸入按UTC+8處理', 0, 620),
    pipaHeader: span('pipa', '【乾造】乙未甲申己未己巳', 0, 260),
    pipaAuto: span('pipa', '以下信息由 枇杷八字', 0, 520),
  },
  // 页面未公布四柱的反证：这三个干支串在 multifate 正文里一次都没出现
  multifateAbsentPillars: ['庚午', '辛巳', '庚辰'].map((s) => ({ ganzhi: s, occurrences: texts.multifate.split(s).length - 1 })),
};
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(fixture, null, 2) + '\n');
console.log(`\n写入 ${path.relative(ROOT, OUT)}：${fs.statSync(OUT).size} bytes，${meta.length} 页，${Object.keys(fixture.quotes).length} 段原文引文`);
console.log('multifate 未公布四柱反证', JSON.stringify(fixture.multifateAbsentPillars));