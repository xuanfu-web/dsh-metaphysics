// 真太阳时修正回显：勾了开关、填了出生地之后，时柱到底按几点起必须看得见。
// 时柱是四柱里最容易「差一小时换一个盘」的一柱，修正不透明就等于不可核对。
// 另外 1986–1991 有夏令时，那段出生的人经常被排错一小时，命中时要直接点出来。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compute } from '../engine/index.js';
import { ok, eq } from './_harness.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');

globalThis.window = {};
new Function('window', fs.readFileSync(path.join(root, 'src', 'panel-kit.js'), 'utf8'))(globalThis.window);
const PP = globalThis.window.__PP;

const line = (r) => PP.solarLineHTML(r);

// ── ① 三条不该出的时候一条都不出 ────────────────────────────
eq('没有盘就不出', line(null), '');
eq('没有 solarTime 就不出', line({ system: 'bazi' }), '');
eq('修正为 0 分就不出（没有信息就别占位）', line({ solarTime: { offsetMinutes: 0, trueSolarText: '1990-05-12 14:30' } }), '');
eq('时辰未知不排时柱，修正没有落点', line({
  solarTime: { offsetMinutes: -60, trueSolarText: '1990-05-12（时辰未知）', note: '经度差 -63.7 分' },
}), '');

// ── ② 正负两个方向都要对 ────────────────────────────────────
const plus = line({ solarTime: { offsetMinutes: 14.4, trueSolarText: '1990-05-12 14:44' } });
ok('正值带 + 号', plus.includes('+14.4 分'), plus);
ok('时刻写进主行', plus.includes('时柱按') && plus.includes('14:44'), plus);
const minus = line({ solarTime: { offsetMinutes: -60, trueSolarText: '1990-05-12 13:30' } });
ok('负值用减号不是连字符', minus.includes('−60.0 分') && !minus.includes('-60.0'), minus);
ok('负值也把时刻写进主行', minus.includes('13:30'), minus);

// ── ③ 夏令时要点名，不藏在折叠里 ────────────────────────────
const dst = line({
  solarTime: {
    offsetMinutes: -10.7,
    trueSolarText: '1990-05-12 13:19',
    note: '检出自 1990-04-15 至 1990-09-16 的中国夏令时：出生钟面时间已减 1 小时校正；经度差 -14.4 分 + 均时差 3.7 分',
  },
});
ok('夏令时命中时点出已扣一小时', dst.includes('已扣夏令时 1 小时'), dst);
ok('推算过程收进折叠', dst.includes('怎么算的') && dst.includes('经度差 -14.4 分'), dst);
const noDst = line({
  solarTime: { offsetMinutes: 22.1, trueSolarText: '1995-08-02 22:22', note: '经度差 22.1 分 + 均时差 0 分' },
});
ok('没有夏令时就不提夏令时', !noDst.includes('夏令时'), noDst);

// ── ④ 老数据只有顶层 offsetMinutes 也要认 ───────────────────
const legacy = line({ offsetMinutes: 8.6, trueSolarText: '1990-05-12 14:38' });
ok('顶层 offsetMinutes 兼容', legacy.includes('+8.6 分'), legacy);

// ── ⑤ 注释里的文本要转义，不能变成注入面 ────────────────────
const evil = line({
  solarTime: { offsetMinutes: 5, trueSolarText: '1990-05-12 14:35', note: '<img src=x onerror=alert(1)>' },
});
ok('推算过程里的尖括号被转义', !/<img/i.test(evil) && evil.includes('&lt;img'), evil);
// 事件属性留在转义后的文本里没有危害（它已经是纯文本），要断言的是「没有生成标签」
ok('输出不带脚本标签', !/<script/i.test(evil), evil);

// ── ⑥ 真盘对拍：北京 1990 夏天出生，夏令时 + 经度差都在 ─────
const r = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '北京' });
const real = line(r);
ok('真实盘能出这一行', real.length > 0, real);
ok('真实盘点名夏令时', real.includes('已扣夏令时 1 小时'), real);
ok('真实盘给出修正后的时刻', /时柱按 <b>\d{1,2}:\d{2}<\/b>/.test(real), real);

// ── ⑦ 关掉真太阳时、或不给出生地，这一行就不该出现 ──────────
ok('关掉真太阳时不出', line(compute({
  system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '北京', trueSolar: false,
})) === '', 'trueSolar:false 仍然出了这一行');
ok('没出生地按平太阳时，修正为 0 不出', line(compute({
  system: 'bazi', datetime: '1995-05-12T14:30', gender: 'male',
})) === '', '没有经度却出了修正行');
