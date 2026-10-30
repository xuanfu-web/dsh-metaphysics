// 通关：结构判定（独立重算）、阈值与分档、经典选条、摘要/解释层/面板可见性、知识卡。
import fs from 'node:fs';
import vm from 'node:vm';
import { compute } from '../engine/index.js';
import { tongguanOf } from '../engine/geju.js';
import { CLASSICS, CLASSIC_BOOKS, classicOf, classicsFor } from '../engine/classics.js';
import { KNOWLEDGE } from '../engine/interpret-knowledge.js';

let pass = 0; let fail = 0;
const ok = (name, cond, detail) => {
  if (cond) { pass++; console.log('PASS  ' + name); } else { fail++; console.log('FAIL  ' + name + (detail ? '  -> ' + detail : '')); }
};

const GEN = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const OVR = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };
const ELS = ['木', '火', '土', '金', '水'];
const wx = (o) => ({ 木: 0, 火: 0, 土: 0, 金: 0, 水: 0, ...o });

// —— 纯函数：五组相克各给唯一一行通关
for (const foe of ELS) {
  const use = OVR[foe];
  const bridge = GEN[foe];
  const tg = tongguanOf([use], [foe], wx({ [use]: 2, [foe]: 2, [bridge]: 2 }));
  ok(`${foe}克${use} 通关为${bridge}`, !!tg && tg.use === use && tg.foe === foe && tg.bridge === bridge);
  ok(`${foe}克${use} 的通关行唯一（克方所生且生用神）`, GEN[foe] === bridge && GEN[bridge] === use && ELS.filter((el) => GEN[el] === use && GEN[foe] === el).length === 1);
  ok(`${foe}克${use} 可通且 usable`, !!tg && tg.level === '可通' && tg.usable === true && tg.bridgeIsAvoid === false);
}

// —— 阈值：两行都要 ≥1.5，关的分数按 0.1 取整
ok('用神不足 1.5 不成立相战', tongguanOf(['木'], ['金'], wx({ 木: 1.4, 金: 2, 水: 2 })) === null);
ok('忌神不足 1.5 不成立相战', tongguanOf(['木'], ['金'], wx({ 木: 2, 金: 1.4, 水: 2 })) === null);
ok('用神恰 1.5 成立相战', tongguanOf(['木'], ['金'], wx({ 木: 1.5, 金: 1.5, 水: 1.5 })) !== null);
ok('通关行 1.5 判可通', tongguanOf(['木'], ['金'], wx({ 木: 2, 金: 2, 水: 1.5 })).level === '可通');
ok('通关行 1.4 判关弱', tongguanOf(['木'], ['金'], wx({ 木: 2, 金: 2, 水: 1.4 })).level === '关弱');
ok('通关行为 0 判未通', tongguanOf(['木'], ['金'], wx({ 木: 2, 金: 2, 水: 0 })).level === '未通');
ok('通关行 0.03 取整后仍算未见', tongguanOf(['木'], ['金'], wx({ 木: 2, 金: 2, 水: 0.03 })).weight === 0);
ok('通关行为忌神时降档', tongguanOf(['木'], ['金', '水'], wx({ 木: 2, 金: 2, 水: 2 })).level === '为忌');
ok('通关行同时在喜在忌时不算为忌', tongguanOf(['木', '水'], ['金', '水'], wx({ 木: 2, 金: 2, 水: 2 })).bridgeIsAvoid === false);

// —— 选取顺序与空结果
ok('按喜用顺序取第一个相战组合', (() => {
  const tg = tongguanOf(['木', '火'], ['金', '水'], wx({ 木: 2, 火: 2, 金: 2, 水: 2, 土: 2 }));
  return tg && tg.use === '木' && tg.foe === '金';
})());
ok('相生不判相战', tongguanOf(['木'], ['火'], wx({ 木: 2, 火: 2, 土: 2 })) === null);
ok('空喜忌返回 null', tongguanOf([], [], wx({ 木: 2 })) === null);
ok('通关字段完整', (() => {
  const tg = tongguanOf(['木'], ['金'], wx({ 木: 2, 金: 2, 水: 1 }));
  return ['use', 'foe', 'bridge', 'weight', 'present', 'bridgeIsAvoid', 'level', 'usable', 'note']
    .every((k) => Object.prototype.hasOwnProperty.call(tg, k));
})());

// —— 真实盘：独立重算字段
const dates = [];
for (let y = 1980; y <= 2005; y++) for (let m = 1; m <= 12; m++) {
  dates.push(`${y}-${String(m).padStart(2, '0')}-15T09:20`);
}
const charts = dates.map((d) => compute({ system: 'bazi', datetime: d, gender: 'female' }));
const withTg = charts.filter((r) => r.frame.yongshen.tongguan);
ok('真实盘扫射有命中通关', withTg.length >= 20, String(withTg.length));
ok('真实盘扫射有可通关', withTg.filter((r) => r.frame.yongshen.tongguan.usable).length >= 1);

let bad = [];
for (const r of withTg) {
  const tg = r.frame.yongshen.tongguan;
  const ys = r.frame.yongshen;
  const w = (el) => Math.round((Number(r.wuxing[el]) || 0) * 10) / 10;
  const expectLevel = tg.bridgeIsAvoid ? '为忌' : tg.weight >= 1.5 ? '可通' : tg.weight > 0 ? '关弱' : '未通';
  const good = ys.favor.includes(tg.use) && ys.avoid.includes(tg.foe)
    && OVR[tg.foe] === tg.use && GEN[tg.foe] === tg.bridge && GEN[tg.bridge] === tg.use
    && tg.weight === w(tg.bridge) && w(tg.use) >= 1.5 && w(tg.foe) >= 1.5
    && tg.level === expectLevel && tg.usable === (tg.level === '可通') && tg.present === (tg.weight > 0)
    && tg.bridgeIsAvoid === (ys.avoid.includes(tg.bridge) && !ys.favor.includes(tg.bridge));
  if (!good) { bad.push({ tg, favor: ys.favor, avoid: ys.avoid }); break; }
}
ok('真实盘通关字段与独立重算一致', bad.length === 0, JSON.stringify(bad[0]));
ok('真实盘通关同输入同输出', (() => {
  const a = compute({ system: 'bazi', datetime: '1980-09-15T09:20', gender: 'female' });
  const b = compute({ system: 'bazi', datetime: '1980-09-15T09:20', gender: 'female' });
  return JSON.stringify(a.frame.yongshen.tongguan) === JSON.stringify(b.frame.yongshen.tongguan);
})());

// —— 经典条目与选条
const entry = classicOf('dt-tongguan');
ok('通关原文已入库', !!entry && entry.book === 'ditian' && entry.chapter === '通神论·通关');
ok('通关原文逐字照录', !!entry && entry.quote === '关内有织女，关外有牛郎，此关若通也，相邀入洞房。');
ok('通关条目出处为典藏网通关页', !!entry && entry.url === 'https://www.diancang.xyz/xuanxuewushu/ditiansui/153091.html');
ok('通关原文无省略号且有自撰白话', !!entry && !entry.quote.includes('…') && !entry.quote.includes('...') && entry.plain.length >= 10);
ok('通关条目 scene 为用神', !!entry && entry.scene === '用神');
ok('书目登记未新增第四本', Object.keys(CLASSIC_BOOKS).length === 3 && CLASSIC_BOOKS.ditian.name === '滴天髓');
ok('通关条目 id 唯一', CLASSICS.filter((e) => e.id === 'dt-tongguan').length === 1);

const RU = compute({ system: 'bazi', datetime: '1980-09-15T09:20', gender: 'female' });
ok('可通关的盘选入滴天髓通关条', RU.frame.yongshen.tongguan.usable && RU.classics.some((e) => e.id === 'dt-tongguan'));
ok('可通关时让出泛论气候位', !RU.classics.some((e) => e.id === 'zp-qihou'));
ok('可通关仍守 5 条上限', RU.classics.length <= 5 && new Set(RU.classics.map((e) => e.id)).size === RU.classics.length);
ok('通关条 why 写明盘面依据', (() => {
  const e = RU.classics.find((x) => x.id === 'dt-tongguan');
  const tg = RU.frame.yongshen.tongguan;
  return !!e && e.why.includes(tg.foe) && e.why.includes(tg.use) && e.why.includes(tg.bridge);
})());

const R1996 = compute({ system: 'bazi', datetime: '1996-01-19T07:30', gender: 'male' });
ok('未通的盘不选通关条', R1996.frame.yongshen.tongguan.level === '未通' && !R1996.classics.some((e) => e.id === 'dt-tongguan'));
ok('未通的盘仍保留泛论气候位', R1996.classics.some((e) => e.id === 'zp-qihou'));
ok('未通的盘经典选条保持五条', R1996.classics.map((e) => e.id).join(',') === 'zp-cai,smt-piancai,dt-hannuan,zp-qihou,zp-bianhua');

// —— 摘要 / 解释层 / 面板
const RI = compute({ system: 'bazi', datetime: '1980-09-15T09:20', gender: 'female', withInterpret: true });
const tg = RI.frame.yongshen.tongguan;
ok('通关写进用神 detail', RI.frame.yongshen.detail.includes('通关：') && RI.frame.yongshen.detail.includes(tg.bridge));
ok('摘要含通关', RI.summary.includes('通关：') && RI.summary.includes(tg.bridge));
const ysec = (RI.interpret.sections || []).find((s) => s.key === 'yongshen');
ok('解释层用神节含通关', !!ysec && ysec.text.includes('通关：') && ysec.text.includes(tg.bridge));
const csec = (RI.interpret.sections || []).find((s) => s.key === 'classics');
ok('解释层古籍节含通关原文', !!csec && csec.text.includes('织女') && csec.text.includes('牛郎'));

const box = { window: {}, console };
vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), box, { filename: 'panel-kit.js' });
const html = box.window.__PP.baziHTML(RI);
ok('面板用神区含通关', html.includes('通关：') && html.includes(tg.bridge));
ok('面板古籍区列通关原文', html.includes('通神论·通关') && html.includes('织女'));
ok('面板条目数与匹配数一致', (html.match(/mp-cl-e/g) || []).length === RI.classics.length);

// —— 知识卡
const card = KNOWLEDGE.find((k) => k.id === 'bazi-tongguan');
ok('通关知识卡存在且归八字', !!card && card.system === 'bazi' && card.status === 'variant');
ok('通关知识卡写明取哪两神', !!card && card.detail.includes('用神') && card.detail.includes('忌神') && card.detail.includes('≥1.5'));
ok('通关知识卡标有异说', !!card && !!card.note && card.note.includes('各家') && card.note.includes('不据此断吉凶'));
ok('通关知识卡出处对得上', !!card && card.source.includes('滴天髓') && card.source.includes('通关'));
ok('通关知识卡无绝对化断语', !!card && !/一定|必然|注定|肯定会|绝对会|百分百|铁定|毫无疑问/.test(card.detail + card.note + card.gist));

console.log(`\n${pass} PASS / ${fail} FAIL`);
if (fail) process.exit(1);
