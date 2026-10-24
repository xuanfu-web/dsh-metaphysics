import { compute, renderText, parseDateTime } from '../engine/index.js';

import { ok } from './_harness.mjs';

// 参数解析
ok('解析 1990-05-12T14:30', JSON.stringify(parseDateTime('1990-05-12T14:30')) ===
  JSON.stringify({ year: 1990, month: 5, day: 12, hour: 14, minute: 30 }));
ok('解析 1990-05-12 14:30', parseDateTime('1990-05-12 14:30').hour === 14);
let threw = false;
try { parseDateTime('1990/5/12'); } catch { threw = true; }
ok('非法格式报错', threw);

// 端到端：八字
const b = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'female', longitude: 116.4 });
ok('八字返回四柱', /【四柱】/.test(b.summary), b.pillars.year.ganzhi + ' ' + b.pillars.month.ganzhi + ' ' + b.pillars.day.ganzhi + ' ' + b.pillars.hour.ganzhi);
console.log('--- 八字摘要 ---');
console.log(renderText(b));

// 端到端：六爻（手工给爻）
const l = compute({ system: 'liuyao', lines: [9, 7, 7, 7, 7, 7], question: '此事可行否' });
ok('六爻返回本卦变卦', l.ben.name === '乾为天' && l.bian.name === '天风姤', `${l.ben.name} -> ${l.bian.name}`);
console.log('--- 六爻摘要 ---');
console.log(renderText(l));

// 随机起卦不炸
const r = compute({ system: 'liuyao' });
ok('随机起卦', typeof r.ben.name === 'string' && r.ben.name.length > 0, r.ben.name);

// 端到端：紫微
const z = compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'female' });
ok('紫微返回十二宫', z.palaces.length === 12, `${z.soul.branch} / ${z.bureau.name}`);
console.log('--- 紫微摘要 ---');
console.log(renderText(z));

// 未支持体系
let threw2 = false;
try { compute({ system: 'zzz-unknown', datetime: '1990-05-12T14:30' }); } catch (e) { threw2 = /未知体系/.test(e.message); }
ok('未知体系报错', threw2);

// JSON 可序列化（工具输出要求）
ok('结果可 JSON 序列化', (() => { try { JSON.stringify(b); JSON.stringify(l); JSON.stringify(z); return true; } catch { return false; } })());

