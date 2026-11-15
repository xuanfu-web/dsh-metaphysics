// 文案闸本身要能被测：扫全仓零命中，且故意写错的句子必须被抓到。
//
// 分两层：下面第一段扫真源码（这就是回归），第二段用假输入验闸没失灵。
// 只做第二段会漏掉「今天有人新写了一句『必然成』」；只做第一段则闸失灵时
// 会静默变绿。
import { ok, eq } from './_harness.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { scanSource } from '../tools/lint-copy.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');

// ── 一、真源码零命中 ─────────────────────────────────────
const files = [];
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === 'tmp') continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else if (/\.(js|mjs)$/.test(name)) files.push(p);
  }
}
['src', 'engine', 'tools'].forEach((d) => walk(path.join(root, d)));

const hits = [];
for (const f of files) {
  const rel = path.relative(root, f).split(path.sep).join('/');
  if (rel === 'tools/lint-copy.mjs' || rel === 'tools/verify-lint-copy.mjs') continue;
  const list = scanSource(fs.readFileSync(f, 'utf8'), rel);
  if (list.length) hits.push(...list);
}
ok('扫过的文件数量合理', files.length > 50, '实际 ' + files.length);
eq('用户可见串里零命中', hits.map((h) => h.file + ':' + h.line + ' ' + h.word).join(' | '), '');

// ── 二、闸没失灵 ─────────────────────────────────────────
const t = (src, rel) => scanSource(src, rel || 'src/x.js');

const a = t("const t = '这事必然成';\n");
ok('抓到确定性断言', a.length === 1 && a[0].word === '必然');
eq('报出的是行号', a[0].line, 1);
ok('带修法提示', typeof a[0].fix === 'string' && a[0].fix.length > 0);

ok('抓到客服腔', t("const t = '希望对你有帮助';\n").length === 1);
ok('抓到指位置的说法', t("const t = '点击下方按钮';\n").length === 1);

// 不该报的四种：注释、否定、显式豁免、引用原文
ok('注释不报', t("// 宫格必然挤，所以绝对定位\nconst t = '盘面';\n").length === 0);
ok('块注释行不报', t(" * 宫内必然有挤掉的东西\nconst t = '盘面';\n").length === 0);
ok('否定语境不报', t("const t = '不必然是坏名';\n").length === 0);
ok('copy-ok 豁免生效', t("const t = '不对效度作保证'; // copy-ok: 整句是否定句\n").length === 0);
ok('称骨歌整份跳过', t("const song = '后来必定享安康';\n", 'engine/chenggu.js').length === 0);
ok('赋文整份跳过', t("quote: '必定死亡'\n", 'engine/citations-fuwen.js').length === 0);
ok('英文串不报', t("const k = 'direction';\n").length === 0);

// 同一行同词报一条就够定位；两行两判
ok('一行同词只报一条', t("const t = '必然成，必然发';\n").length === 1);
ok('两行各报一条', t("const a = '必然成';\nconst b = '注定散';\n").length === 2);
