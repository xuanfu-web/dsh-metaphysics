#!/usr/bin/env node
/**
 * 文案闸：用户可见的中文串里不许出现确定性断言和客服腔。
 *
 * 为什么单独立一道闸而不是写成测试：这两类错不是某个函数错了，
 * 是「任何一个新写的文案都可能带进来」。写在测试里只能守已经写过的句子，
 * 挂成闸才能守住以后写的。
 *
 * 只扫字符串字面量里的汉字，且跳过注释行——命理推导里本来就会用到
 * 「必然」「绝对定位」这类词，按全文件 grep 会满屏误报，那样闸就没用了。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');

const FILES = [];
function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(js|mjs)$/.test(name)) out.push(p);
  }
}
['src', 'engine', 'tools'].forEach((d) => walk(path.join(root, d), FILES));

// 每条：命中的词、为什么不行、怎么改
const RULES = [
  {
    words: ['必然', '一定会', '注定', '必定', '铁定', '百分百', '毫无疑问', '肯定会'],
    why: '确定性断言：命理推的是倾向不是结果',
    fix: '换成「多半/通常/在…条件下」'
  },
  {
    words: ['保证', '包准', '绝不失手'],
    why: '承诺性措辞：说不准的事不该给保证',
    fix: '删掉，或改成「这套规则通常这么判」'
  },
  {
    words: ['希望对你有帮助', '如有疑问随时', '随时找我', '作为 AI', '作为AI', '综上所述', '值得注意的是', '总而言之'],
    why: '客服腔：像模板在说话，不像一个人在讲盘',
    fix: '直接删掉这句'
  },
  {
    words: ['点击下方', '点击上方', '如下图所示', '见上图', '见下图'],
    why: '指位置：手机上换行后「下方」未必在下方',
    fix: '直接说按钮名'
  }
];

// 引用原文的文件：这里面的字是古籍/通行本的样子，改一个字就不是那一本了。
// 闸只约束我们自己写的句子，不约束被引的句子。
const QUOTE_FILES = [
  'engine/citations-',   // 各类赋文、卜筮正宗、星海词林
  'engine/qiongtong.js', // 《穷通宝鉴》原文
  'engine/chenggu.js',   // 袁天罡称骨歌（通行本）
  'engine/yingqi.js',    // 应期口诀沿用古法原句（「世衰元靜，必然是…」）
  'tools/data-'          // 古籍题目与卦例数据
];

// 否定语境：「不必然」「未必定」「不作保证」说的正好是反面，不能算断言
const NEG = ['不', '无', '非', '未', '莫', '勿', '别'];

// 行首是注释就整行跳过；块注释里的一行（以 * 开头）也跳过
function isCommentLine(line) {
  const t = line.trim();
  return t.startsWith('//') || t.startsWith('*') || t.startsWith('/*');
}

function isQuoteFile(rel) {
  return QUOTE_FILES.some((p) => rel.startsWith(p) || rel.indexOf(p) >= 0);
}

function negated(payload, at) {
  const before = payload.slice(Math.max(0, at - 6), at);
  return NEG.some((n) => before.indexOf(n) >= 0);
}

export function scanSource(text, rel) {
  if (isQuoteFile(rel)) return [];
  const lines = text.split('\n');
  const hits = [];
  lines.forEach((line, i) => {
    if (isCommentLine(line)) return;
    // 显式豁免：这一行的用词是对的，只是闸读不懂语境。必须写理由，写在行尾。
    if (/copy-ok:/.test(line)) return;
    // 取这一行里所有引号内内容（单、双、反引号；不追求跨行模板串的完整词法，
    // 单行足够覆盖我们写的文案——多行模板串的每一行本身就是一行源码）
    const quoted = line.match(/'[^']*'|"[^"]*"|`[^`]*`/g);
    if (!quoted) return;
    const payload = quoted.join('\n');
    if (!/[\u4e00-\u9fa5]/.test(payload)) return;
    for (const rule of RULES) {
      for (const w of rule.words) {
        let from = 0;
        let at = payload.indexOf(w, from);
        while (at >= 0) {
          if (!negated(payload, at)) {
            hits.push({
              file: rel,
              line: i + 1,
              word: w,
              why: rule.why,
              fix: rule.fix,
              text: line.trim().slice(0, 90)
            });
            break;
          }
          from = at + w.length;
          at = payload.indexOf(w, from);
        }
      }
    }
  });
  return hits;
}

// 直接跑才扫全仓；被 import（自检脚本）时只导出 scanSource。
// 比较整名而不是后缀——verify-lint-copy.mjs 也以 lint-copy.mjs 结尾。
const isMain = process.argv[1] && path.basename(process.argv[1]) === 'lint-copy.mjs';
if (isMain) {
  const all = [];
  let scanned = 0;
  for (const f of FILES) {
    if (/lint-copy\.mjs$/.test(f)) continue;
    scanned += 1;
    all.push(...scanSource(fs.readFileSync(f, 'utf8'), path.relative(root, f).split(path.sep).join('/')));
  }

  if (all.length === 0) {
    console.log('✓ 文案闸通过：' + scanned + ' 个文件，用户可见串里没有确定性断言或客服腔');
    process.exit(0);
  }

  console.log('✗ 文案闸发现 ' + all.length + ' 处：');
  const byRule = new Map();
  for (const h of all) {
    if (!byRule.has(h.why)) byRule.set(h.why, []);
    byRule.get(h.why).push(h);
  }
  for (const [why, list] of byRule) {
    console.log('\n【' + why + '】' + list.length + ' 处');
    for (const h of list) {
      console.log('  ' + h.file + ':' + h.line + '  「' + h.word + '」  ' + h.text);
    }
    console.log('  → ' + list[0].fix);
  }
  process.exit(1);
}
