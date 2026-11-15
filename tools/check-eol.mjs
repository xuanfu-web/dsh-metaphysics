#!/usr/bin/env node
// 行尾自检：产物必须与生成器输出的行尾一致（纯 LF、无 BOM、无不可见行分隔符）。
//
// 为什么单独一道闸（2026-11-15）：
//   verification.test 断言「docs/verification.html === 生成器输出」、citations.test 断言
//   「docs/citations.html === 生成器输出」、standalone.test 断言「命理排盘.html === 构建结果」。
//   这三条都是逐字节/逐字符比较，而行尾不在 .gitattributes 的 eol=lf 覆盖里时，
//   core.autocrlf=true 的机器 checkout 出来就是 CRLF，比生成器多出行数个 \r，
//   于是同一 commit 在 A 机器绿、B 机器红。这次就是这样把一次 195/196 误判成「漏重建」：
//   全新 worktree 上 193/196，三个红全部是「报告 281781 vs 生成器 276066」，差 5715 = 行数。
//
// 这道闸查两件事：
//   1. 产物文件本身：CRLF / BOM / U+2028 / U+2029。
//   2. .gitattributes 的覆盖：*.html 与 *.svg 必须有 eol=lf 规则——规则被删掉时上面第 1 条
//      在本机仍然绿（工作区刚被生成器写过是 LF），只有换机器才炸，所以规则本身也要盯。
import fs from 'node:fs';
import path from 'node:path';

// 与生成器逐字节比对的产物；新增此类产物要登记到这张表里
export const TARGETS = [
  '命理排盘.html',
  'docs/index.html',
  'docs/verification.html',
  'docs/citations.html',
  'docs/assets/verification-badge.svg',
  'icon.svg',
  'docs/icon.svg',
  'docs/sw.js',
  'docs/manifest.webmanifest',
];

export const REQUIRED_ATTRS = ['*.html', '*.svg', '*.js', '*.mjs', '*.json', '*.md', '*.yml'];

// 兜底规则 `* text=auto eol=lf` 必须在。没有它就只能靠逐个扩展名补，
// 而 2026-11-15 一天里就漏了三次（html/svg、yml、webmanifest）。
export function hasGlobalRule(attrText) {
  return String(attrText).split('\n').some((line) => {
    const t = line.trim();
    if (!t || t.startsWith('#')) return false;
    const parts = t.split(/\s+/);
    return parts[0] === '*' && parts.includes('eol=lf');
  });
}

// 纯函数：喂文本，返回问题列表。测试靠它，不用造真文件。
export function scanText(rel, text, bytes) {
  const problems = [];
  if (typeof text !== 'string') return problems;
  if (text.includes('\r\n')) {
    const n = (text.match(/\r\n/g) || []).length;
    problems.push(`${rel} 含 ${n} 处 CRLF（生成器输出是 LF）——这条会让「产物与生成器逐字节一致」在别的机器上必红。修法：git add --renormalize . 后重新 checkout，或跑 npm run build:all 重建`);
  } else if (text.includes('\r')) {
    problems.push(`${rel} 含孤立 \\r（旧 Mac 行尾）`);
  }
  if (text.includes('\u2028') || text.includes('\u2029')) problems.push(`${rel} 含 U+2028/U+2029（浏览器视为换行，会截断字符串）`);
  if (bytes && bytes.length >= 3 && bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf) problems.push(`${rel} 带 UTF-8 BOM`);
  return problems;
}

// 纯函数：解析 .gitattributes 文本，返回缺失的规则名列表。
export function missingAttrs(attrText) {
  const missing = [];
  const has = (pat) => String(attrText).split('\n').some((line) => {
    const t = line.trim();
    if (!t || t.startsWith('#')) return false;
    const parts = t.split(/\s+/);
    return parts[0] === pat && parts.slice(1).includes('eol=lf');
  });
  for (const pat of REQUIRED_ATTRS) if (!has(pat)) missing.push(pat);
  return missing;
}

export function checkAll(root) {
  const problems = [];
  for (const rel of TARGETS) {
    const full = path.join(root, rel);
    if (!fs.existsSync(full)) { problems.push(`${rel} 不存在——请先跑 npm run build:all`); continue; }
    const buf = fs.readFileSync(full);
    problems.push(...scanText(rel, buf.toString('utf8'), buf));
  }
  const attrPath = path.join(root, '.gitattributes');
  if (!fs.existsSync(attrPath)) {
    problems.push('.gitattributes 不存在——新 checkout 会按本机 core.autocrlf 决定行尾');
  } else {
    const attrText = fs.readFileSync(attrPath, 'utf8');
    if (!hasGlobalRule(attrText)) {
      problems.push('.gitattributes 缺少兜底规则「* text=auto eol=lf」——没有它就得逐个扩展名补，漏一个就是一次换机器才炸的差异');
    }
    for (const pat of missingAttrs(attrText)) {
      problems.push(`.gitattributes 缺少「${pat} text eol=lf」——这类文件在 autocrlf=true 的机器上会被 checkout 成 CRLF`);
    }
  }
  return problems;
}

const isMain = process.argv[1] && path.basename(process.argv[1]) === 'check-eol.mjs';
if (isMain) {
  const root = path.resolve(import.meta.dirname, '..');
  const problems = checkAll(root);
  if (problems.length) {
    console.error(`✗ 行尾自检未通过（${problems.length} 处）：`);
    for (const p of problems) console.error(`  - ${p}`);
    process.exit(1);
  }
  console.log(`✓ 行尾自检通过：${TARGETS.length} 个产物纯 LF、无 BOM、无不可见分隔符；.gitattributes 已钉住 ${REQUIRED_ATTRS.join('/').replace(/\*\./g, '')}`);
}
