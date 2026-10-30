// 二十八宿：通行表逐字对拍 + 28 日轮值 + 七曜/星期对齐。
// 0.49.2 修掉两处动物名错字（壁水貐、胃土雉），这里把整张表在测试里独立录一遍，
// 不复用 engine/almanac.js 的 MANSIONS 常量，改错一个字就会红。
import fs from 'node:fs';
import vm from 'node:vm';
import { buildAlmanac, MANSIONS, xiuOf } from '../engine/almanac.js';
import { compute } from '../engine/index.js';
import { ok } from './_harness.mjs';

const DAY_MS = 86400000;
const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];
const QI_YAO = ['日', '月', '火', '水', '木', '金', '土'];
const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const GONGS = ['东', '北', '西', '南'];

// 独立录入的通行表：[宿, 五行, 动物, 吉凶, 宫]
const CANON = [
  ['角', '木', '蛟', '吉', '东'], ['亢', '金', '龙', '凶', '东'], ['氐', '土', '貉', '凶', '东'],
  ['房', '日', '兔', '吉', '东'], ['心', '月', '狐', '凶', '东'], ['尾', '火', '虎', '吉', '东'],
  ['箕', '水', '豹', '吉', '东'],
  ['斗', '木', '獬', '吉', '北'], ['牛', '金', '牛', '凶', '北'], ['女', '土', '蝠', '凶', '北'],
  ['虚', '日', '鼠', '凶', '北'], ['危', '月', '燕', '凶', '北'], ['室', '火', '猪', '吉', '北'],
  ['壁', '水', '貐', '吉', '北'],
  ['奎', '木', '狼', '凶', '西'], ['娄', '金', '狗', '吉', '西'], ['胃', '土', '雉', '吉', '西'],
  ['昴', '日', '鸡', '凶', '西'], ['毕', '月', '乌', '吉', '西'], ['觜', '火', '猴', '凶', '西'],
  ['参', '水', '猿', '吉', '西'],
  ['井', '木', '犴', '吉', '南'], ['鬼', '金', '羊', '凶', '南'], ['柳', '土', '獐', '凶', '南'],
  ['星', '日', '马', '凶', '南'], ['张', '月', '鹿', '吉', '南'], ['翼', '火', '蛇', '凶', '南'],
  ['轸', '水', '蚓', '吉', '南'],
];

const dateOf = (ms) => {
  const d = new Date(ms);
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() };
};
const almanacOf = (ms) => buildAlmanac(dateOf(ms));

// ── ① 二十八宿逐字对拍 ──────────────────────────────────────
for (const [name, zheng, animal, luck, gong] of CANON) {
  const m = MANSIONS[name];
  ok(`${name}宿＝${zheng}${animal}（${luck}·${gong}宫）`,
    !!m && m.zheng === zheng && m.animal === animal && m.luck === luck && m.gong === gong,
    m ? `${m.zheng}${m.animal}（${m.luck}·${m.gong}宫）` : '缺失');
}

ok('表恰好二十八宿，无多无少', Object.keys(MANSIONS).length === CANON.length, String(Object.keys(MANSIONS).length));
for (const gong of GONGS) {
  const n = Object.values(MANSIONS).filter((m) => m.gong === gong).length;
  ok(`${gong}宫七星`, n === 7, String(n));
}
ok('二十八种动物字互不重复', new Set(Object.values(MANSIONS).map((m) => m.animal)).size === 28,
  String(new Set(Object.values(MANSIONS).map((m) => m.animal)).size));

// ── ② 七曜顺序：任一宿日，周日→周六依次为 日月火水木金土 ──
for (const branch of BRANCHES) {
  const seq = [0, 1, 2, 3, 4, 5, 6].map((w) => xiuOf(branch, w)?.zheng).join('');
  ok(`${branch}支七日＝日月火水木金土`, seq === '日月火水木金土', seq);
}
ok('非法宿日输入返回 null', xiuOf('X', 0) === null && xiuOf('子', 7) === null && xiuOf('子', -1) === null,
  JSON.stringify([xiuOf('X', 0), xiuOf('子', 7), xiuOf('子', -1)]));

// ── ③ 28 日一循环：任意起点，第 n 日与第 n+28 日同宿；28 日内不重不漏 ──
let cycleMismatch = '';
let uniqueMismatch = '';
for (let k = 0; k < 13; k++) {
  const base = Date.UTC(2024, k, 1);
  const seen = new Set();
  for (let i = 0; i < 28; i++) {
    const a = almanacOf(base + i * DAY_MS);
    const b = almanacOf(base + (i + 28) * DAY_MS);
    seen.add(a.xiu.name);
    if (!cycleMismatch && a.xiu.name !== b.xiu.name) cycleMismatch = `${a.meta.date}${a.xiu.name}/${b.meta.date}${b.xiu.name}`;
  }
  if (!uniqueMismatch && seen.size !== 28) uniqueMismatch = `${dateOf(base).year}-${dateOf(base).month} 只有 ${seen.size} 宿`;
}
ok('十三段 56 天：第 n 日与第 n+28 日同宿', !cycleMismatch, cycleMismatch);
ok('十三段 28 天：二十八宿各现一次、不重不漏', !uniqueMismatch, uniqueMismatch);

// ── ④ 错字回归：整年不再出现「獝」「彘」；壁落周三、胃落周六 ──
const badChars = [];
let biDay = null;
let weiDay = null;
for (let i = 0; i < 366; i++) {
  const r = almanacOf(Date.UTC(2026, 0, 1) + i * DAY_MS);
  if (r.xiu.animal === '獝' || r.xiu.animal === '彘') badChars.push(`${r.meta.date}${r.xiu.name}${r.xiu.animal}`);
  if (!biDay && r.xiu.name === '壁') biDay = r;
  if (!weiDay && r.xiu.name === '胃') weiDay = r;
}
ok('2026 全年不再出现旧错字「獝」「彘」', badChars.length === 0, badChars.slice(0, 3).join(' '));
ok('壁水貐：动物＝貐、落在周三', !!biDay && biDay.xiu.animal === '貐' && biDay.meta.weekday === '星期三',
  biDay ? `${biDay.meta.date} ${biDay.xiu.name}${biDay.xiu.zheng}${biDay.xiu.animal} ${biDay.meta.weekday}` : '未命中');
ok('胃土雉：动物＝雉、落在周六', !!weiDay && weiDay.xiu.animal === '雉' && weiDay.meta.weekday === '星期六',
  weiDay ? `${weiDay.meta.date} ${weiDay.xiu.name}${weiDay.xiu.zheng}${weiDay.xiu.animal} ${weiDay.meta.weekday}` : '未命中');

// ── ⑤ 三处可见：结果字段、文本摘要、面板 ────────────────────
const bi = compute({ system: 'almanac', datetime: '2026-01-21T10:00' });
const wei = compute({ system: 'almanac', datetime: '2026-01-24T10:00' });
ok('结果层：2026-01-21 壁水貐', bi.xiu.name === '壁' && bi.xiu.animal === '貐', `${bi.xiu.name}${bi.xiu.zheng}${bi.xiu.animal}`);
ok('结果层：2026-01-24 胃土雉', wei.xiu.name === '胃' && wei.xiu.animal === '雉', `${wei.xiu.name}${wei.xiu.zheng}${wei.xiu.animal}`);
ok('文本摘要写「壁宿（吉·水·貐）」', bi.summary.includes('壁宿（吉·水·貐）') && !bi.summary.includes('獝'),
  bi.summary.split('\n').find((l) => l.includes('宿（')) || '无二十八宿行');
ok('文本摘要写「胃宿（吉·土·雉）」', wei.summary.includes('胃宿（吉·土·雉）') && !wei.summary.includes('彘'),
  wei.summary.split('\n').find((l) => l.includes('宿（')) || '无二十八宿行');

const box = { window: {}, console };
vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), box, { filename: 'panel-kit.js' });
const PP = box.window.__PP;
const biHtml = PP.almanacHTML(bi);
const weiHtml = PP.almanacHTML(wei);
ok('面板写「壁宿（吉·水·貐）」', biHtml.includes('壁宿（吉·水·貐）') && !biHtml.includes('獝'), '壁宿');
ok('面板写「胃宿（吉·土·雉）」', weiHtml.includes('胃宿（吉·土·雉）') && !weiHtml.includes('彘'), '胃宿');

// ── ⑥ 确定性：同日两次排黄历逐字段一致 ──────────────────────
const d = dateOf(Date.UTC(2026, 5, 10));
const once = buildAlmanac(d);
const twice = buildAlmanac(d);
ok('同日两次结果逐字段一致', JSON.stringify(once) === JSON.stringify(twice), once.meta.date);

// ── ⑦ 星期与七曜同源：任取一年，宿的五行必须等于当天星期的七曜 ──
let weekdayMismatch = '';
for (let i = 0; i < 400; i++) {
  const r = almanacOf(Date.UTC(2025, 0, 1) + i * DAY_MS);
  const wd = WEEKDAYS.indexOf(r.meta.weekday.slice(2));
  if (!weekdayMismatch && wd >= 0 && r.xiu.zheng !== QI_YAO[wd]) {
    weekdayMismatch = `${r.meta.date} ${r.meta.weekday} ${r.xiu.name}${r.xiu.zheng}`;
  }
}
ok('400 天逐日：宿五行＝当天星期七曜', !weekdayMismatch, weekdayMismatch);
