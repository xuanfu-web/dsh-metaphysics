#!/usr/bin/env node
// 把「问事解读提示」打印出来：选体系、给时刻、说明问什么事，直接拿到一段可粘给模型的提示。
//
//   node tools/event-prompt.mjs --system liuyao --kind career --question "下周三前能不能拿到书面 offer"
//   node tools/event-prompt.mjs --system liuyao --kind career --lines 9,7,8,8,7,6 --gender male
//   node tools/event-prompt.mjs --system qimen --kind business --question "这笔合作值不值得谈"
//   node tools/event-prompt.mjs --system liuyao --no-time        # 不会起课，只输出「先问时间」
//
// 时刻默认取当前（和面板一致）；--datetime 可指定历史某刻复现。
import { compute } from '../engine/index.js';
import { buildEventPrompt, ASK_KINDS } from '../engine/event-prompt.js';

const argv = process.argv.slice(2);
const arg = (name, def = '') => {
  const i = argv.indexOf('--' + name);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : def;
};
const has = (name) => argv.includes('--' + name);

const pad = (n) => String(n).padStart(2, '0');
const nowLocal = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const system = arg('system', 'liuyao');
const kind = arg('kind', 'other');
const question = arg('question', '');
const datetime = arg('datetime', nowLocal());
const gender = arg('gender', 'male');

if (has('help') || has('h')) {
  console.log('用法：node tools/event-prompt.mjs --system liuyao|meihua|daliuren|qimen|tarot|xiaoliuren \\');
  console.log('        --kind career|love|business|action|day|other --question "要问的事" [--datetime 2026-11-01T23:10]');
  console.log('        [--lines 9,7,8,8,7,6] [--gender male|female] [--no-time]');
  console.log('类型：', Object.entries(ASK_KINDS).map(([k, v]) => `${k}=${v.label}`).join('　'));
  process.exit(0);
}

if (!ASK_KINDS[kind]) {
  console.error(`未知类型 ${kind}；可用：${Object.keys(ASK_KINDS).join(', ')}`);
  process.exit(2);
}

// 时间不明时不要排盘——这与提示本身的原则一致，CLI 也不该偷偷拿现在顶上
if (has('no-time')) {
  const p = buildEventPrompt({ system }, { question, kind, gender, timeKnown: false });
  console.log(p.text);
  process.exit(0);
}

const input = { system, datetime, question, gender, withInterpret: true };
if (has('lines')) {
  const lines = arg('lines').split(/[^0-9]+/).filter(Boolean).map(Number);
  if (lines.length !== 6 || lines.some((n) => ![6, 7, 8, 9].includes(n))) {
    console.error('--lines 需要正好 6 个 6/7/8/9');
    process.exit(2);
  }
  input.lines = lines;
}
if (system === 'meihua') input.mode = has('lines') ? 'number' : 'time';
if (system === 'tarot') input.count = Number(arg('count', '3'));

let r;
try {
  r = compute(input);
} catch (e) {
  console.error('排盘失败：' + e.message);
  process.exit(1);
}

const p = buildEventPrompt(r, { question, kind, gender, timeKnown: true });
console.log(p.text);
