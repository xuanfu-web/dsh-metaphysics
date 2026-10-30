// 离线页结果区的控件：验前事 / 生时校正 / 追问 / 导出，窄屏触摸目标与提示条对比度。
//
// 2026-10-30 用无头 Chrome 在 390px、浅/深两套配色下逐个 tab 实测：
//   · 验前事的「算贴合度」「计算候选时辰」退回原生灰按钮（31px），年份与类型框只有 21px
//     —— .mp-btn/.mp-input 的基础样式只写在 DSH 宿主的 src/app.js 里，离线页从来没定义过；
//   · 三档判断按钮 22px，追问框 37px、导出按钮 39px，都低于 44px；
//   · 「点任一宫位看详情」用 --faint，浅色下实测 2.25:1。
// 这里锁住修复，颜色一律走变量，深色只换变量就跟着变。
import fs from 'node:fs';
import { ok } from './_harness.mjs';

const KIT = fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8');
const HTML = fs.readFileSync(new URL('../tools/build-html.mjs', import.meta.url), 'utf8');
const UI = fs.readFileSync(new URL('../src/web-ui.js', import.meta.url), 'utf8');

const rule = (selector) => {
  const at = HTML.indexOf(selector + '{');
  return at < 0 ? '' : HTML.slice(at, HTML.indexOf('}', at) + 1);
};
const narrow = HTML.slice(HTML.indexOf('@media (max-width:640px)'), HTML.indexOf('@media print{'));

// ── 一、离线页自带按钮/输入框样式（此前借的是宿主 app.js 的类名）────
const btnRule = rule('.mp-verify .mp-btn,.mp-rect .mp-btn');
const inputRule = rule('.mp-verify .mp-input,.mp-rect .mp-input');
ok('离线页给验前事按钮补了样式', btnRule.includes('border:1px solid var(--line)') && btnRule.includes('background:var(--panel2)'), btnRule);
ok('离线页给生时校正的年份/类型补了样式', inputRule.includes('border:1px solid var(--line)') && inputRule.includes('background:var(--panel2)'), inputRule);
ok('新控件不写死颜色（深色才能只换变量）', !/#(?:[0-9a-f]{3}){1,2}\b/i.test(btnRule + inputRule));
ok('输入框聚焦有统一焦点环', rule('.mp-verify .mp-input:focus,.mp-rect .mp-input:focus').includes('box-shadow:var(--ring)'));
ok('不再用行内样式把按钮压到 31px', !/style="font-size:12px;padding:5px 12px"/.test(UI));

// ── 二、窄屏触摸目标：结果区所有控件 ≥44px ──────────────────────
ok('窄屏三档判断按钮 ≥44px', /\.mp-chip\{min-height:44px;min-width:44px/.test(narrow));
ok('窄屏标签独占一行', /\.mp-verify-txt\{flex:1 1 100%\}/.test(narrow));
ok('窄屏三档按钮等分一行', /\.mp-verify-btns\{display:grid;grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/.test(narrow));
ok('窄屏算贴合度/计算候选时辰 ≥44px', /\.mp-verify \.mp-btn,\.mp-rect \.mp-btn\{min-height:44px/.test(narrow));
ok('窄屏年份/类型输入 ≥44px', /\.mp-verify \.mp-input,\.mp-rect \.mp-input\{min-height:44px/.test(narrow));
ok('窄屏追问框与导出按钮 ≥44px', /\.askbox input,\.askbox button,\.exp button\{min-height:44px\}/.test(narrow));
ok('窄屏追问输入 16px（避免 iOS 聚焦缩放）', /\.askbox input\{font-size:16px\}/.test(narrow));

// ── 三、提示条对比度：独立复算，浅色与深色都要过 AA 4.5:1 ─────────
ok('「点任一宫位看详情」用 --muted 而非最浅的 --faint', /\.pp-soon\{[^}]*color:var\(--muted\)/.test(KIT));
const pal = KIT.slice(KIT.indexOf('.pp,.mp-it,'), KIT.indexOf('container-type:inline-size'));
const darkSeg = KIT.slice(KIT.indexOf('@media screen and (prefers-color-scheme:dark)'));
const darkPal = darkSeg.slice(0, darkSeg.indexOf('.pp *{box-sizing'));
const pick = (text, name) => (text.match(new RegExp('--' + name + ':(#[0-9a-f]{6})')) || [])[1];
const lum = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  return 0.2126 * f((n >> 16) & 255) + 0.7152 * f((n >> 8) & 255) + 0.0722 * f(n & 255);
};
const ratio = (a, b) => (Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05);
const lightRatio = ratio(pick(pal, 'muted'), pick(pal, 'bg'));
const darkRatio = ratio(pick(darkPal, 'muted'), pick(darkPal, 'bg'));
ok('浅色提示条对比度 ≥4.5', lightRatio >= 4.5, `${lightRatio.toFixed(2)}:1`);
ok('深色提示条对比度 ≥4.5', darkRatio >= 4.5, `${darkRatio.toFixed(2)}:1`);
