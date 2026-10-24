// 奇门对拍：20 个时辰（2026-10-24 子时起连续 20 个时辰）与参照实现逐宫比对。
// 数据源：外部基准站点导出的 qimen 样本，已固化到 test/fixtures/qimen-20.json
import fs from 'node:fs';
import path from 'node:path';
import { buildQimen } from '../engine/qimen.js';

const root = path.resolve(import.meta.dirname, '..');
const list = JSON.parse(fs.readFileSync(path.join(root, 'test/fixtures/qimen-20.json'), 'utf8'));
let pass = 0, fail = 0;
const ok = (n, c, d = '') => { if (c) { pass++; console.log(`PASS  ${n}${d ? '  -> ' + d : ''}`); } else { fail++; console.log(`FAIL  ${n}${d ? '  -> ' + d : ''}`); } };

const stats = { sz: 0, ju: 0, fu: 0, shi: 0, gong: 0, gongTot: 0 };
const bad = [];
for (const item of list) {
  const c = item.chart;
  // 参照的 lateZiCurrentDay=false 表示晚子时归次日
  const late = item.slot.hour === 23 ? 'next-day' : 'same-day';
  const r = buildQimen({
    year: c.solar.y, month: c.solar.m, day: c.solar.d,
    hour: c.trueSolar.h, minute: c.trueSolar.mi, lateZiHourMode: late,
  });
  const szOk = r.siZhu.year === c.siZhu.year && r.siZhu.month === c.siZhu.month
    && r.siZhu.day === c.siZhu.day && r.siZhu.time === c.siZhu.time;
  const juOk = r.juNumber === c.ju.num && (r.dun === '阴遁') === (c.ju.dun === 'yin') && r.yuan === c.ju.yuanCN;
  const fuOk = r.zhiFu.star === c.core.fuStar && Number(r.zhiFu.gong) === Number(c.core.fuGong);
  const shiOk = r.zhiShi.gate === c.core.valueGate && Number(r.zhiShi.gong) === Number(c.core.valueGong);
  if (szOk) stats.sz++;
  if (juOk) stats.ju++;
  if (fuOk) stats.fu++;
  if (shiOk) stats.shi++;

  const all = [...r.palaces, r.centerPalace];
  for (const ref of Object.values(c.palaces)) {
    const m = all.find((x) => x.palace === String(ref.gong));
    stats.gongTot++;
    if (m && m.star === ref.star && m.gate === (ref.gate || '') && m.god === (ref.shen || '') && m.tianPan === ref.tianGan) stats.gong++;
    else bad.push(`${item.slot.solarDate} ${ref.gong}宫`);
  }
  if (!(szOk && juOk && fuOk && shiOk)) bad.push(`${item.slot.solarDate} ${item.slot.shichen} 四柱${szOk}局${juOk}符${fuOk}使${shiOk}`);
}

const n = list.length;
ok('20 个时辰的四柱全部一致', stats.sz === n, `${stats.sz}/${n}`);
ok('局数（阴阳遁 + 局号 + 元）全部一致', stats.ju === n, `${stats.ju}/${n}`);
ok('值符（星 + 落宫）全部一致', stats.fu === n, `${stats.fu}/${n}`);
ok('值使（门 + 落宫）全部一致', stats.shi === n, `${stats.shi}/${n}`);
ok('九宫星门神与天盘干逐宫一致', stats.gong === stats.gongTot, `${stats.gong}/${stats.gongTot}`);
if (bad.length) console.log('  差异：' + bad.slice(0, 6).join('；'));

if (fail > 0) { console.log(`FAIL ${fail} 项`); process.exit(1); }
console.log(`\n奇门对拍 ${n} 时辰 × 9 宫 = ${stats.gongTot} 个宫位全部一致`);
