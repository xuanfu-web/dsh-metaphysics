// M1–M7 度量工具的守卫：阈值与 PRD 1.4 原文对齐，且不许被改成空闸。
//
// 这个工具的价值全在「数字可信」。它自己松了，正文改写的验收就变回拍脑袋。
import fs from 'node:fs';
import path from 'node:path';
import { ok } from './_harness.mjs';
import { CHUNKS } from '../tools/build-client.mjs';

const root = path.resolve(import.meta.dirname, '..');
const src = fs.readFileSync(path.join(root, 'tools', 'metrics.mjs'), 'utf8');
const buildAll = fs.readFileSync(path.join(root, 'tools', 'build-all.mjs'), 'utf8');
const limits = (() => {
  const i = src.indexOf('const LIMITS = {');
  const j = src.indexOf('};', i);
  const body = src.slice(i + 'const LIMITS = {'.length, j);
  const out = {};
  for (const line of body.split('\n')) {
    const m = /^\s*(M\d):\s*([0-9.]+),/.exec(line);
    if (m) out[m[1]] = Number(m[2]);
  }
  return out;
})();

ok('七项都在', Object.keys(limits).sort().join(',') === 'M1,M2,M3,M4,M5,M6,M7', Object.keys(limits).join(','));
ok('M1 首屏结论率目标 100%', limits.M1 === 1);
ok('M2 标准视图字数 ≤400', limits.M2 === 400);
ok('M3 因素重复率 ≤1.05', limits.M3 === 1.05);
ok('M4 模糊词密度 ≤5%', limits.M4 === 0.05);
ok('M5 同盘一致率 ≥95%', limits.M5 === 0.95);
ok('M6 术语越界 =0', limits.M6 === 0);
ok('M7 追问一致率 100%', limits.M7 === 1);

// 样本不许绑当天：曾经 facts-only 就因为写死日柱隔夜变红（L-006）
ok('样本日期全部写死', !/todayStamp|new Date\(\)\.toISOString\(\)\.slice\(0, 10\)/.test(src));
ok('22 个体系都在样本里', (() => {
  const tabs = new Set();
  for (const name of Object.keys(CHUNKS)) for (const t of CHUNKS[name].tabs || []) tabs.add(t);
  const missing = [...tabs].filter((t) => !src.includes(`system: '${t}'`));
  return missing.length === 0;
})(), '缺：' + (() => {
  const tabs = new Set();
  for (const name of Object.keys(CHUNKS)) for (const t of CHUNKS[name].tabs || []) tabs.add(t);
  return [...tabs].filter((t) => !src.includes(`system: '${t}'`)).join(',');
})());

// 只对有解读层的体系算分：14 个速查/问卷体系没有 envelope.verdict，硬算就是把比例拉低成噪声
ok('无解读层的体系不参与分母', src.includes("kind: 'lookup'") && src.includes('withVerdict'));
ok('M6 走 term-dict 的 T3，不另立一套词表', src.includes("termsInText(item.system, text, 'T3')"));
ok('M5 真的跑十次', /for \(let i = 0; i < 9; i \+= 1\)/.test(src));
ok('不达标就 exit 1', src.includes('process.exit(1)'));

// 必须挂在闸上，否则没人跑
ok('build-all --gate 里有 metrics 这一步', /run\('metrics（M1–M7）', \['tools\/metrics\.mjs'\]\)/.test(buildAll));
