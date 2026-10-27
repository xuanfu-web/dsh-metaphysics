// 称骨：歌诀原文 + 白话释义。
// 重点防三件事：表里缺档、歌诀张冠李戴（错档）、把释义当原文冒充。
import fs from 'node:fs';
import vm from 'node:vm';
import { compute } from '../engine/index.js';
import { ok } from './_harness.mjs';

const sandbox = { window: {}, console };
vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
const PP = sandbox.window.__PP;

const R = compute({ system: 'chenggu', datetime: '1990-08-15T10:00' });

// ── 一、歌诀表：21–72 钱逐档齐全，且是四句韵文 ──────────────
{
  const { CHENGGU_SONG } = await import('../engine/chenggu.js');
  let missing = 0, bad = 0;
  for (let q = 21; q <= 72; q++) {
    const s = CHENGGU_SONG[q];
    if (!s) { missing++; continue; }
    // 四句、两个分句对，句尾标点统一
    const parts = String(s.text).replace(/[。]$/, '').split('；');
    if (parts.length !== 2 || parts.some((x) => x.split('，').length !== 2)) bad++;
    if (!s.plain || String(s.plain).length < 8) bad++;
  }
  ok('歌诀覆盖二两一钱至七两二钱（52 档）', missing === 0, `缺 ${missing} 档`);
  ok('每档都是四句、且有释义', bad === 0, `格式异常 ${bad} 档`);
}

// ── 二、关键档位原文不许串行 ────────────────────────────────
{
  const { CHENGGU_SONG } = await import('../engine/chenggu.js');
  ok('五两六钱 → 「礼义通」', CHENGGU_SONG[56].text.includes('此格推来礼义通'));
  ok('六两 → 「金榜快题名」', CHENGGU_SONG[60].text.includes('一朝金榜快题名'));
  ok('七两二钱 → 标注基本不可达', CHENGGU_SONG[72].plain.includes('不可达'));
  ok('三两 → 「东奔西走何日休」', CHENGGU_SONG[30].text.includes('东奔西走何日休'));
}

// ── 三、主函数的取值与文本 ─────────────────────────────────
ok('1990-08-15 巳时 = 五两六钱', R.total.qian === 56 && R.total.label === '五两六钱', R.total.label);
ok('结果带歌诀字段', !!R.song && R.song.text.includes('礼义通') && R.song.label === '五两六钱');
ok('释义是白话（不是原文照抄）', !!R.song.plain && !R.song.text.includes(R.song.plain));
ok('summary 含歌诀与释义两段', R.summary.includes('歌诀（五两六钱）') && R.summary.includes('释义：'));
ok('口径写明「各版本歌诀有异文」', R.summary.includes('异文') && R.disclaimer.includes('民俗娱乐参考'));

// ── 四、渲染器：原文分行 + 释义 + 口径 ─────────────────────
const H = PP.chengguHTML(R);
ok('渲染器输出称骨区块', H.includes('mp-cg') && H.includes('称骨'));
ok('四项骨重都渲染', (H.match(/cg-cell/g) || []).length === 4);
ok('歌诀分两行显示', (H.match(/mp-cg-verse"><span>/g) || []).length === 1 && (H.match(/<span>/g) || []).length >= 2);
ok('渲染器含释义与口径提示', H.includes('mp-cg-plain') && H.includes('各版本歌诀有异文'));
ok('null 安全', PP.chengguHTML(null) === '');

// ── 五、两处界面都接上了 ───────────────────────────────────
{
  const app = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
  const web = fs.readFileSync(new URL('../src/web-ui.js', import.meta.url), 'utf8');
  ok('面板接到 chengguHTML', /result\.kind === 'chenggu' \? PP\.chengguHTML/.test(app));
  ok('独立页接到 chengguHTML', /tab === 'chenggu' \? window\.__PP\.chengguHTML/.test(web));
}
