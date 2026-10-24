// 0.15.0 三项小功能：八字三宫、六壬神煞、历史记录
import { compute } from '../engine/index.js';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
let pass = 0;
let fail = 0;
const ok = (name, cond, detail = '') => {
  if (cond) { pass++; console.log(`PASS  ${name}${detail ? '  -> ' + detail : ''}`); }
  else { fail++; console.log(`FAIL  ${name}${detail ? '  -> ' + detail : ''}`); }
};

// ── ① 八字胎元 / 命宫 / 身宫 ──
const b = compute({ system: 'bazi', datetime: '1996-01-19T07:40', gender: 'male', trueSolar: false });
ok('八字输出含三宫', !!(b.palaces && b.palaces.taiyuan && b.palaces.minggong && b.palaces.shengong),
  `${b.palaces.taiyuan.ganzhi} ${b.palaces.minggong.ganzhi} ${b.palaces.shengong.ganzhi}`);
// 月柱己丑 → 胎元 = 庚辰（干进一、支进三）
ok('胎元＝月干进一、月支进三', b.palaces.taiyuan.ganzhi === '庚辰', b.palaces.taiyuan.ganzhi);
ok('命宫与身宫相隔六位', (() => {
  const BR = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  const a = BR.indexOf(b.palaces.minggong.branch);
  const c = BR.indexOf(b.palaces.shengong.branch);
  return ((c - a + 12) % 12) === 6;
})(), `${b.palaces.minggong.branch} vs ${b.palaces.shengong.branch}`);
ok('三宫进入文本摘要', b.summary.includes('胎元') && b.summary.includes('命宫') && b.summary.includes('身宫'));

// ── ② 六壬神煞 ──
const d = compute({ system: 'daliuren', datetime: '1996-01-19T07:40' });
ok('六壬输出神煞', Array.isArray(d.shensha) && d.shensha.length >= 5, d.shensha.map((x) => `${x.name}${x.branch}`).join('/'));
// 乙卯日：乙禄在卯、乙刃在辰、卯属木局 → 驿马巳、桃花子、华盖未
const get = (n) => (d.shensha.find((x) => x.name === n) || {}).branch;
ok('日禄按日干取（乙禄在卯）', get('日禄') === '卯', String(get('日禄')));
ok('羊刃按日干取（乙刃在辰）', get('羊刃') === '辰', String(get('羊刃')));
ok('驿马/桃花/华盖按日支三合取', get('驿马') === '巳' && get('桃花') === '子' && get('华盖') === '未',
  `${get('驿马')}/${get('桃花')}/${get('华盖')}`);
ok('神煞进入文本摘要', d.summary.includes('神煞'));

// ── ③ 历史记录（源码级检查：localStorage 读写、上限、重放、去重） ──
const app = fs.readFileSync(path.join(root, 'src', 'app.js'), 'utf8');
ok('历史写入 localStorage', /localStorage\.setItem\(HIST_KEY/.test(app));
ok('历史上限 20 条', /slice\(0, 20\)/.test(app));
ok('历史支持重放', /const replay = \(x\)/.test(app) && /setReplayArgs\(x\)/.test(app));
ok('历史条目去重', /sameEntry\(x, entry\)/.test(app));
ok('塔罗不入历史（随机抽牌不可复现）', /k !== 'tarot'/.test(app));
ok('历史可清空', /const clearHist = /.test(app) && /saveHistory\(\[\]\)/.test(app));

if (fail > 0) { console.log(`FAIL ${fail} 项`); process.exit(1); }
console.log(`\n${pass} 项全部通过`);

// ── ④ 合盘 ──
const hp = compute({
  system: 'hepan', datetime: '1996-01-19T07:40', gender: 'male',
  partner: { datetime: '1998-05-20T10:30', gender: 'female' },
});
ok('合盘输出双方与评分', !!(hp.a && hp.b && hp.score), `${hp.a.dayMaster} × ${hp.b.dayMaster} = ${hp.score.total}`);
ok('合盘三个维度齐全', hp.dimensions.length === 3 && hp.dimensions.map((d) => d.key).join(',') === 'stem,gong,wuxing',
  hp.dimensions.map((d) => `${d.label}${d.score}`).join(' '));
ok('合盘日主关系按五行判定', hp.dimensions[0].text.includes('日主') && /比和|生我|我生|克我|我克/.test(hp.dimensions[0].text));
ok('合盘夫妻宫按日支判定', /六合|半合|相冲|相刑|相害|相破|同支|无直接关系/.test(hp.dimensions[1].text),
  hp.dimensions[1].text.slice(0, 20));
ok('合盘分数在 0-100', hp.score.total >= 0 && hp.score.total <= 100, String(hp.score.total));
ok('合盘进入文本摘要', hp.summary.includes('合盘') && hp.summary.includes('日主关系'));

// ── ⑤ 交叉判断（解读更深一层） ──
const bi = compute({ system: 'bazi', datetime: '1996-01-19T07:40', gender: 'male', trueSolar: false, withInterpret: true });
const cross = (bi.interpret.sections || []).find((s) => s.key === 'cross');
ok('解读含交叉判断段', !!cross, cross ? `${cross.text.split('　').length} 条` : '缺失');
ok('交叉判断引用盘面具体值', !!cross && /大运|命局缺|格局/.test(cross.text));
ok('交叉判断排在用神之前', (() => {
  const keys = bi.interpret.sections.map((s) => s.key);
  return keys.indexOf('cross') < keys.indexOf('yongshen');
})());

if (fail > 0) { console.log(`FAIL ${fail} 项`); process.exit(1); }
console.log(`\n${pass} 项全部通过`);

