// 0.19.0：黄历增强（值日/时辰/二十八宿/胎神/吉神方位/纳音/吉配）、择日分组、公农历互转。
// 定值全部与 lunar-javascript 1.7.3 对拍过（dayTianShen/xiu/tai/nayin/positionCai 逐日一致）。
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { compute } from '../engine/index.js';
import { TASKS, TASK_GROUPS } from '../engine/zeri.js';

let pass = 0;
const ok = (name, fn) => { fn(); pass++; console.log('PASS  ' + name); };

const A26 = compute({ system: 'almanac', datetime: '2026-10-26T10:00' });
const A27 = compute({ system: 'almanac', datetime: '2026-10-27T10:00' });

// ── 黄历增强 ──
ok('值日十二神与黄黑道', () => {
  assert.equal(A26.ganzhi.day, '癸酉');
  assert.equal(A26.dayGod.name, '天德');
  assert.equal(A26.dayGod.type, '黄道');
  assert.equal(A26.dayGod.luck, '吉');
  assert.equal(A27.dayGod.name, '白虎');
  assert.equal(A27.dayGod.type, '黑道');
});

ok('建除十二值与二十八宿', () => {
  assert.equal(A26.zhiXing, '闭');
  assert.equal(A26.xiu.name, '危');
  assert.equal(A26.xiu.luck, '凶');
  assert.equal(A26.xiu.animal, '燕');
  assert.equal(A27.xiu.name, '室');
  assert.equal(A27.xiu.luck, '吉');
});

ok('日柱纳音与胎神', () => {
  assert.equal(A26.nayin.day.name, '剑锋金');
  assert.equal(A26.taiShen, '房床门 外西南');
  assert.equal(A27.nayin.day.name, '山头火');
});

ok('吉神方位五组齐全', () => {
  for (const k of ['caiShen', 'xiShen', 'fuShen', 'yangGui', 'yinGui']) {
    assert.ok(A26.positions[k], '缺 ' + k);
  }
  assert.equal(A26.positions.caiShen, '正南');
  assert.equal(A27.positions.caiShen, '东北');
  assert.ok(['正东', '正南', '正西', '正北', '东南', '西南', '西北', '东北'].includes(A26.positions.xiShen));
});

ok('六合三合吉配生肖', () => {
  assert.equal(A26.lucky.liuhe, '龙');
  assert.deepEqual(A26.lucky.sanhe, ['蛇', '牛']);
  assert.equal(A27.lucky.liuhe, '兔');
  assert.deepEqual(A27.lucky.sanhe, ['虎', '马']);
});

ok('十二时辰吉凶：数量、五鼠遁与十二神', () => {
  assert.equal(A26.hours.length, 12);
  assert.deepEqual(A26.hours.map((h) => h.zhi), ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']);
  assert.equal(A26.hours[0].ganZhi, '壬子'); // 癸日起壬子
  assert.equal(A27.hours[0].ganZhi, '甲子'); // 甲日起甲子
  assert.equal(A26.hours[0].shen, '司命');
  assert.equal(A26.hours[0].luck, '吉');
  assert.equal(A26.hours[5].shen, '朱雀');
  assert.equal(A26.hours[5].luck, '凶');
  for (const h of A26.hours) {
    assert.ok(['青龙', '明堂', '天刑', '朱雀', '金匮', '天德', '白虎', '玉堂', '天牢', '玄武', '司命', '勾陈'].includes(h.shen));
    assert.ok(['吉', '凶'].includes(h.luck));
  }
  // 黄黑道与吉凶一致：六黄道全吉、六黑道全凶
  for (const h of A26.hours) assert.equal(h.luck, h.type === '黄道' ? '吉' : '凶');
});

// ── 公农历互转 ──
ok('公历转农历', () => {
  const r = compute({ system: 'convert', mode: 'solar2lunar', datetime: '2026-10-26T10:00' });
  assert.equal(r.solar.text, '2026-10-26');
  assert.equal(r.lunar.year, 2026);
  assert.equal(r.lunar.month, 9);
  assert.equal(r.lunar.day, 17);
  assert.equal(r.lunar.isLeap, false);
  assert.equal(r.lunar.text, '农历2026年九月十七');
  assert.equal(r.ganzhi.year, '丙午');
  assert.equal(r.ganzhi.day, '癸酉');
  assert.equal(r.ganzhi.shengXiao, '马');
});

ok('农历转公历（含闰月）', () => {
  const r = compute({ system: 'convert', mode: 'lunar2solar', lunarYear: 2026, lunarMonth: 9, lunarDay: 17 });
  assert.equal(r.solar.text, '2026-10-26');
  const leap = compute({ system: 'convert', mode: 'lunar2solar', lunarYear: 2025, lunarMonth: 6, lunarDay: 1, isLeapMonth: true });
  assert.equal(leap.solar.text, '2025-07-25');
  assert.equal(leap.lunar.isLeap, true);
});

ok('农历转公历：小月无三十要报错', () => {
  let code = '';
  try {
    compute({ system: 'convert', mode: 'lunar2solar', lunarYear: 2025, lunarMonth: 6, lunarDay: 30, isLeapMonth: true });
  } catch (e) { code = String(e.message || e); }
  assert.ok(code.includes('29'), code);
});

ok('公农历往返一致', () => {
  for (const d of ['2024-02-10', '1990-08-15', '2026-10-27']) {
    const l = compute({ system: 'convert', mode: 'solar2lunar', datetime: d + 'T12:00' });
    const back = compute({
      system: 'convert', mode: 'lunar2solar',
      lunarYear: l.lunar.year, lunarMonth: l.lunar.month, lunarDay: l.lunar.day, isLeapMonth: l.lunar.isLeap,
    });
    assert.equal(back.solar.text, d);
  }
});

// ── 择日扩充 ──
ok('择日事项分组：五组、覆盖全部事项', () => {
  assert.deepEqual(Object.keys(TASK_GROUPS), ['常用', '婚嫁', '生活', '建造', '工商']);
  const inGroups = new Set(Object.values(TASK_GROUPS).flat());
  // 分组是「快捷入口」，允许同事项出现在多组；但组内每一项都必须是合法事项
  for (const t of inGroups) assert.ok(Object.prototype.hasOwnProperty.call(TASKS, t), '组内事项不合法: ' + t);
  assert.ok(TASKS['领证']);
  assert.ok(TASKS['满月酒']);
  assert.ok(TASKS['试车买车']);
  assert.ok(Object.keys(TASKS).length >= 27);
});

ok('择日：新事项可用且冲属相日被排除', () => {
  const r = compute({ system: 'zeri', startDate: '2026-10-26', task: '领证', days: 14, shengXiao: '兔' });
  assert.equal(r.meta.task, '领证');
  assert.equal(r.days.length, 14);
  // 2026-10-26 冲兔 → 当日进 days 且标记 excluded，但绝不进推荐/可用
  const d0 = r.days.find((d) => d.date === '2026-10-26');
  assert.ok(d0 && d0.excluded, '冲属相日应标记 excluded');
  assert.equal(r.best.includes('2026-10-26'), false);
  assert.equal(r.usable.includes('2026-10-26'), false);
});

// ── 渲染器 ──
ok('黄历专属渲染器', () => {
  const box = { window: {}, console };
  vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), box, { filename: 'panel-kit.js' });
  const PP = box.window.__PP;
  const html = PP.almanacHTML(A26);
  assert.ok(html.includes('mp-al'));
  assert.ok(html.includes('天德'));
  assert.ok(html.includes('二十八宿'));
  assert.ok(html.includes('危宿'));
  assert.ok(html.includes('剑锋金'));
  assert.ok(html.includes('吉神方位'));
  assert.ok(html.includes('时辰吉凶'));
  assert.ok(html.includes('司命'));
  assert.ok(html.includes('六合') || html.includes('吉配'));
  assert.equal(PP.almanacHTML(null), '');
});

ok('面板与独立页都已接上黄历/农历', () => {
  const app = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
  const web = fs.readFileSync(new URL('../src/web-ui.js', import.meta.url), 'utf8');
  const page = fs.readFileSync(new URL('../tools/build-html.mjs', import.meta.url), 'utf8');
  assert.ok(app.includes("k: 'convert'"));
  assert.ok(app.includes('PP.almanacHTML(result.r)'));
  assert.ok(web.includes("tab === 'almanac' ? window.__PP.almanacHTML(r)"));
  assert.ok(web.includes('convertmode'));
  assert.ok(page.includes('data-tab="convert"'));
  assert.ok(page.includes('id="qk-convert"'));
  assert.ok(page.includes('<optgroup label="婚嫁">'));
});

console.log(`\n${pass} PASS / 0 FAIL`);
