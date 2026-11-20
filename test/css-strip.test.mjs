// CSS 注释构建期剥离（入口包体积战的第一枪）：
//   ① 剥得干净：产物里不再有注释，规则一条不少、花括号配平；
//   ② 剥得安全：`content: "/*"` 这种字符串不许被当成注释起点；
//   ③ 有余量：client.js gzip 要在 132KB 预算下留出 ≥10KB，别又回到「改一行就破线」。
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { stripCssComments, stripKitCssSource } from '../tools/css-strip.mjs';
import { assembleEntry } from '../tools/build-client.mjs';
import { ok } from './_harness.mjs';

const root = path.resolve(import.meta.dirname, '..');
const KIT_SRC = fs.readFileSync(path.join(root, 'src', 'panel-kit.js'), 'utf8');

// ── ① 纯净度 ──
{
  const out = stripCssComments('/* 说明 */a{color:red}\n/* 再来一条\n   跨行 */b{color:blue}');
  ok('注释全部剥掉', !out.includes('/*') && !out.includes('*/'), out.slice(0, 40));
  ok('规则一条不少', out.includes('a{color:red}') && out.includes('b{color:blue}'), out.slice(0, 60));
  // 注释原地留空格：`a/**/b` 粘成 `ab` 会把两条规则并成一条不存在的选择器
  ok('紧挨着的注释不会把两个 token 粘起来', stripCssComments('a/**/b{}').includes('a b'), stripCssComments('a/**/b{}'));
  // 字符串里的 /* 不是注释：content: "/*" 必须原样保留
  const quoted = stripCssComments('.x{content:"/*"}');
  ok('字符串里的 /* 原样保留', quoted.includes('content:"/*"'), quoted);
  const quoted2 = stripCssComments(".y{content:'*/ 不是注释结束'}");
  ok('单引号字符串也认得', quoted2.includes("'*/ 不是注释结束'"), quoted2);
}

// ── ② 真文件：panel-kit 的 CSS 段 ──
{
  const stripped = stripKitCssSource(KIT_SRC);
  const body = stripped.slice(stripped.indexOf('const CSS = `'));
  const cssEnd = body.indexOf('`;', 1);
  const css = body.slice('const CSS = `'.length, cssEnd);
  ok('源码里有注释，剥完一条不剩', KIT_SRC.includes('/*') && !css.includes('/*'), css.slice(0, 40));
  // 花括号配平：少一个就把后面整段样式吞掉，页面上表现为「突然没样式了」
  const open = (css.match(/\{/g) || []).length;
  const close = (css.match(/\}/g) || []).length;
  ok(`剥后花括号配平（${open}/${close}）`, open === close);
  // 关键规则仍在
  for (const rule of ['.mp-prof-empty{', '.mp-env-head{', ':root{--env-good:#2f6b4f', '@media screen and (prefers-color-scheme:dark){:root{--env-good:#']) {
    ok(`关键规则还在：${rule}`, css.includes(rule), rule);
  }
  // 去重后的体积：注释占 gzip 的大头，这一条是「为什么值得剥」的证据
  const rawAll = Buffer.byteLength(KIT_SRC.match(/const CSS = `[\s\S]*?`;/)[0]);
  const rawStripped = Buffer.byteLength(stripped.match(/const CSS = `[\s\S]*?`;/)[0]);
  ok(`剥注释省下 ≥10KB 源文本（${rawAll} → ${rawStripped}）`, rawAll - rawStripped >= 10 * 1024, `${rawAll} -> ${rawStripped}`);
}

// ── ③ 产物与预算 ──
{
  const entry = await assembleEntry();
  ok('入口产物里不再带 CSS 注释原文', !entry.includes('竖屏（≤640px）：盘面重排为竖向'), '已知的一条源注释');
  const clientFile = path.join(root, 'client.js');
  const raw = fs.readFileSync(clientFile, 'utf8');
  const gzip = zlib.gzipSync(Buffer.from(raw, 'utf8')).length;
  const cap = 132 * 1024;
  ok(`client.js gzip ${Math.round(gzip / 1024)}KB / 预算 ${cap / 1024}KB`, gzip < cap, `${gzip}`);
  const slack = cap - gzip;
  ok(`余量 ≥10KB（现 ${Math.round(slack / 1024)}KB）——不够就得先减肥再加东西`, slack >= 10 * 1024, `${slack}`);
}
