// 单一真源守卫：纳音 / 三合 / 纳甲这些「规则表」只能有一份实现。
//
// 这些表以前分散在 bazi、ziwei、hepan、daliuren 里，改一处漏另一处时不会报错，
// 只会让两个体系的结论互相矛盾。这里同时验证：
//   1. 共享表本身内容正确（纳音 30 名、三合四局、纳甲八宫起例）；
//   2. 各体系不再自带一份（静态检查，防止有人复制回去）；
//   3. 体系输出与共享表一致（行为检查，防止各写各的逻辑）。
import fs from 'node:fs';
import { NAYIN_NAMES, nayinOf } from '../engine/nayin.js';
import { SANHE, SANHE_GROUPS, SANHE_ELEMENT, sanheGroupOf } from '../engine/sanhe.js';
import { nayin } from '../engine/bazi.js';
import { buildLiuyao, hexagramFromBits } from '../engine/liuyao.js';
import { ok } from './_harness.mjs';

const root = new URL('../', import.meta.url);
const read = (rel) => fs.readFileSync(new URL(rel, root), 'utf8');
const ENGINE = fs.readdirSync(new URL('engine/', root)).filter((f) => f.endsWith('.js'));

// ── ① 纳音：60 甲子 / 30 名 ───────────────────────────────
{
  ok('纳音共 30 名', NAYIN_NAMES.length === 30, String(NAYIN_NAMES.length));
  ok('首名海中金、末名大海水', NAYIN_NAMES[0] === '海中金' && NAYIN_NAMES[29] === '大海水');
  ok('甲子乙丑同为海中金', nayinOf(0).name === '海中金' && nayinOf(1).name === '海中金');
  ok('癸亥为大海水', nayinOf(59).name === '大海水');
  ok('越界序号按模 60 归一', nayinOf(60).name === '海中金' && nayinOf(-1).name === '大海水');
  ok('纳音五行取自末字', nayinOf(0).element === '金' && nayinOf(2).element === '火' && nayinOf(12).element === '水', `${nayinOf(0).element}${nayinOf(2).element}${nayinOf(12).element}`);
  // 八字导出与共享表一致（防止它以后又自己算一套）
  const diff = [];
  for (let i = 0; i < 60; i++) if (nayin(i) !== nayinOf(i).name) diff.push(i);
  ok('八字纳音与共享表逐项一致', diff.length === 0, diff.slice(0, 5).join(','));
  // 静态：只有 engine/nayin.js 拥有这张表
  const owners = ENGINE.filter((f) => read(`engine/${f}`).includes('海中金'));
  ok('纳音表只有一份', owners.join(',') === 'nayin.js', owners.join(','));
}

// ── ② 三合：四局 / 十二支归属 ─────────────────────────────
{
  ok('三合四局', SANHE_GROUPS.length === 4);
  ok('三合口诀顺序', Object.keys(SANHE).join('|') === '申子辰|亥卯未|寅午戌|巳酉丑', Object.keys(SANHE).join('|'));
  ok('三合五行', SANHE['申子辰'] === '水' && SANHE['亥卯未'] === '木' && SANHE['寅午戌'] === '火' && SANHE['巳酉丑'] === '金');
  ok('十二支都有归属', Object.keys(SANHE_ELEMENT).length === 12);
  const mismatch = Object.entries(SANHE_ELEMENT).filter(([b, el]) => sanheGroupOf(b).element !== el);
  ok('单支归属与局一致', mismatch.length === 0, JSON.stringify(mismatch));
  // 同局 ⇔ 五行相同（四局五行互不相同，所以这条等价关系成立）
  const pairs = [];
  const BR = '子丑寅卯辰巳午未申酉戌亥';
  for (let i = 0; i < 12; i++) for (let j = i + 1; j < 12; j++) {
    const same = SANHE_ELEMENT[BR[i]] === SANHE_ELEMENT[BR[j]];
    const g = SANHE_GROUPS.find((x) => x.branches.includes(BR[i]) && x.branches.includes(BR[j]));
    if (same !== !!g) pairs.push(`${BR[i]}${BR[j]}`);
  }
  ok('同局判定与五行一致', pairs.length === 0, pairs.join(','));
  // 静态：其他模块不得再私藏一份三合表
  const owners = ENGINE.filter((f) => f !== 'sanhe.js' && /(const|let)\s+SAN_HE\b/.test(read(`engine/${f}`)));
  ok('三合表只有一份', owners.length === 0, owners.join(','));
}

// ── ③ 纳甲：八宫起例（乾为天六爻）────────────────────────
{
  const qian = hexagramFromBits([1, 1, 1, 1, 1, 1]);
  const r = buildLiuyao({ lines: [7, 7, 7, 7, 7, 7] });
  ok('乾为天卦名', r.ben.name === '乾为天' && qian.name === '乾为天');
  const ganzhi = r.ben.lines.map((l) => l.ganzhi);
  ok('乾为天纳甲（甲子 甲寅 甲辰 壬午 壬申 壬戌）',
    ganzhi.join(',') === '甲子,甲寅,甲辰,壬午,壬申,壬戌', ganzhi.join(','));
  ok('乾宫属金', r.ben.palace === '乾宫' && r.ben.palaceElement === '金');
  // 静态：NAJIA 表只在 liuyao.js
  const owners = ENGINE.filter((f) => /const NAJIA\b/.test(read(`engine/${f}`)));
  ok('纳甲表只有一份', owners.join(',') === 'liuyao.js', owners.join(','));
}
