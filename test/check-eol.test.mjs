// 行尾闸：产物必须纯 LF，且 .gitattributes 钉住了 html/svg。
// 这一条锁的是 2026-11-15 那次误判的成本——闸要把「环境噪声」在进 test-all 之前就挡掉，
// 否则人会去查「是不是漏了构建步骤」，真因（CRLF）被埋掉。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { ok, eq } from './_harness.mjs';
import { TARGETS, REQUIRED_ATTRS, scanText, missingAttrs, checkAll } from '../tools/check-eol.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');

// ---- 一、纯函数：CRLF / 孤立 \r / 不可见分隔符 / BOM ----
eq('LF 文本零问题', scanText('a.html', '第一行\n第二行\n').length, 0);
eq('空文本零问题', scanText('a.html', '').length, 0);
eq('非字符串不抛', scanText('a.html', null).length, 0);

const crlf = scanText('a.html', '第一行\r\n第二行\r\n第三行\r\n');
eq('CRLF 被抓到一条', crlf.length, 1);
ok('CRLF 报告点名数量（3 行）', /3 处 CRLF/.test(crlf[0]), crlf[0]);
ok('CRLF 报告给修法', /renormalize|build:all/.test(crlf[0]), crlf[0]);

const lone = scanText('a.html', '第一行\r第二行\r');
eq('孤立 \\r 被抓到一条', lone.length, 1);
ok('孤立 \\r 不与 CRLF 混报', !/CRLF/.test(lone[0]), lone[0]);

eq('U+2028 被抓到', scanText('a.js', 'a\u2028b').length, 1);
eq('U+2029 被抓到', scanText('a.js', 'a\u2029b').length, 1);

const bom = Buffer.from([0xef, 0xbb, 0xbf, 0x41]);
eq('BOM 被抓到', scanText('a.html', bom.toString('utf8'), bom).length, 1);
ok('BOM 报告说 BOM', /BOM/.test(scanText('a.html', bom.toString('utf8'), bom)[0]));
eq('不带 BOM 的同样内容不报', scanText('a.html', 'A', Buffer.from('A')).length, 0);

// CRLF + BOM 两个问题都要报，不能只报一个
const both = scanText('a.html', bom.toString('utf8') + 'x\r\n', bom);
eq('CRLF 与 BOM 同时报两条', both.length, 2);

// ---- 二、.gitattributes 规则 ----
const goodAttr = REQUIRED_ATTRS.map((p) => `${p} text eol=lf`).join('\n');
eq('规则齐全时无缺失', missingAttrs(goodAttr).length, 0);
eq('缺 *.html 会被点名', missingAttrs(goodAttr.replace('*.html text eol=lf\n', '')).join(','), '*.html');
eq('缺 *.svg 会被点名', missingAttrs(goodAttr.replace('*.svg text eol=lf\n', '')).join(','), '*.svg');
eq('写了规则但没 eol=lf 也算缺', missingAttrs(goodAttr.replace('*.html text eol=lf', '*.html text')).join(','), '*.html');
eq('注释行里的规则不算数', missingAttrs('# *.html text eol=lf\n').length, REQUIRED_ATTRS.length);
eq('换行符为 CRLF 的 .gitattributes 也能解析', missingAttrs(goodAttr.replace(/\n/g, '\r\n')).length, 0);

// ---- 三、真仓库：产物清单与规则 ----
ok('登记表含 verification.html', TARGETS.includes('docs/verification.html'));
ok('登记表含 citations.html', TARGETS.includes('docs/citations.html'));
ok('登记表含命理排盘.html', TARGETS.includes('命理排盘.html'));
ok('登记表含 docs/index.html 副本', TARGETS.includes('docs/index.html'));
eq('登记表无重复', new Set(TARGETS).size, TARGETS.length);

const problemsNow = checkAll(root);
eq('当前仓库行尾闸绿', problemsNow.length, 0, problemsNow.join(' | '));

// ---- 四、闸真能变红：临时把一份产物改成 CRLF ----
// 只动 docs/sw.js（manifest 类的静态文件，不被 test-all 的其他断言逐字节比对），测完原样写回。
const victim = path.join(root, 'docs', 'sw.js');
const original = fs.readFileSync(victim);
try {
  fs.writeFileSync(victim, original.toString('utf8').replace(/\n/g, '\r\n'));
  const bad = checkAll(root);
  ok('产物被改成 CRLF 后闸变红', bad.length >= 1, `问题数 ${bad.length}`);
  ok('变红时点名 docs/sw.js', bad.some((p) => /docs\/sw\.js/.test(p)), bad.join(' | '));
} finally {
  fs.writeFileSync(victim, original);
}
eq('写回后行尾闸恢复绿', checkAll(root).length, 0);
ok('写回内容与原文件逐字节一致', Buffer.compare(fs.readFileSync(victim), original) === 0);

// ---- 五、命令行退出码 ----
const cli = spawnSync(process.execPath, ['tools/check-eol.mjs'], { cwd: root, encoding: 'utf8' });
eq('命令行退出码 0', cli.status, 0, cli.stderr);
ok('命令行输出成功行', /行尾自检通过/.test(cli.stdout), cli.stdout);

// check-eol.mjs 必须整名判定主流程：以前 lint-copy 因为「后缀匹配」导致被 import 时跑主流程
const src = fs.readFileSync(path.join(root, 'tools', 'check-eol.mjs'), 'utf8');
ok('主流程按整名判定（不被 import 触发）', /basename\(process\.argv\[1\]\) === 'check-eol\.mjs'/.test(src));
ok('测试里显式导入纯函数而非复制实现', /from '\.\.\/tools\/check-eol\.mjs'/.test(fs.readFileSync(path.join(root, 'test', 'check-eol.test.mjs'), 'utf8')));
