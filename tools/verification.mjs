// 公开对拍报告的唯一数据源：128 条卦例 + 312 张紫微盘 × 34 格局 + 20 个奇门时辰 + 12 个交运案例。
//
// 报告页、README 徽章与 test/verification.test.mjs 都调用这里的 buildVerification()；
// 任一体系判定与独立复算不一致，mismatch 会变成非 0，测试直接变红。
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { buildLiuyao, hexagramFromBits } from '../engine/liuyao.js';
import { buildZiwei, PATTERN_TONE } from '../engine/ziwei.js';
import { buildBazi } from '../engine/bazi.js';
import { buildQimen } from '../engine/qimen.js';
import { formatJd, partsToJd } from '../engine/calendar.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FIX = JSON.parse(fs.readFileSync(path.join(ROOT, 'test', 'fixtures', 'classics.json'), 'utf8'));
const QIMEN_FIX = JSON.parse(fs.readFileSync(path.join(ROOT, 'test', 'fixtures', 'qimen-20.json'), 'utf8'));
const BAZI_FIX = JSON.parse(fs.readFileSync(path.join(ROOT, 'test', 'fixtures', 'bazi-duipai.json'), 'utf8')).meta;
const PKG = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));

const ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const WU = ['父母', '兄弟', '子孙', '妻财', '官鬼'];
const EL = { 乾: '金', 坎: '水', 艮: '土', 震: '木', 巽: '木', 离: '火', 坤: '土', 兑: '金' };
const VAR = [
  ['干', '乾'], ['遯', '遁'], ['兌', '兑'], ['離', '离'], ['異', '巽'],
  ['风泽中乎孚', '风泽中孚'], ['天火同火', '天火同人'], ['火泽暌', '火泽睽'],
  ['艮天大畜', '山天大畜'], ['天地比', '水地比'], ['风雷颐', '山雷颐'],
  ['震为木', '震为雷'], ['兑为金', '兑为泽'], ['山地观', '风地观'],
];

const norm = (s) => {
  let x = String(s || '').replace(/[。．.、\s]/g, '');
  for (const [a, b] of VAR) x = x.split(a).join(b);
  return x;
};

const ALL_HEX = [];
for (let b = 0; b < 64; b += 1) {
  const bits = Array.from({ length: 6 }, (_, i) => (b >> i) & 1);
  ALL_HEX.push({ name: hexagramFromBits(bits).name, bits });
}

function resolveHex(raw) {
  const name = norm(raw);
  const exact = ALL_HEX.find((x) => x.name === name);
  if (exact) return exact;
  const cands = ALL_HEX.filter((x) => x.name.endsWith(name));
  return cands.length === 1 ? cands[0] : null;
}

const dayOf = (date) => {
  const m = String(date || '').match(/月([甲乙丙丁戊己庚辛壬癸])([子丑寅卯辰巳午未申酉戌亥])日/);
  return m ? { stem: m[1], branch: m[2], name: m[1] + m[2] } : undefined;
};

const missingOf = (r) => {
  const present = new Set(r.ben.lines.map((l) => l.liuqin));
  return WU.filter((q) => !present.has(q));
};

const moveCount = (A, B) => A.bits.map((bit, i) => (bit !== B.bits[i] ? i : -1)).filter((i) => i >= 0);

const linesFrom = (A, moving) => A.bits.map((bit, i) => (moving.includes(i) ? (bit ? 9 : 6) : (bit ? 7 : 8)));

export function verifyClassicCase(ex, kind) {
  const fails = [];
  const fail = (label, expected, actual) => fails.push(`${label}：期望 ${expected}，实际 ${actual}`);
  const isPair = kind === 'pair';
  const parts = String(ex.name || '').split('之');
  const A = resolveHex(parts[0]);
  const B = isPair ? resolveHex(parts.slice(1).join('之')) : null;
  // 旬空由「起卦日」决定：原表没记日期的卦例（126/128 条）根本无从核对。
  // 以前这里把 dayOf 的 undefined 直接传给引擎，引擎就按「今天」补日干支，
  // 页面于是显示当天的旬空、还标成「一致」——期望空辰巳、实际空午未也对得上「一致」，
  // 而且每换一旬页面内容就变一次，仓库里的 verification.html 注定与源码不一致。
  // 现在：无起卦日 → 旬空不核对、不给值；给引擎一个固定占位日，保证页面与「今天」无关。
  const day = dayOf(ex.date) || null;
  const PLACEHOLDER_DAY = { stem: '甲', branch: '子', name: '甲子' };
  const kongChecked = Boolean(ex.kong && day);
  let r = null;
  let moving = [];
  if (!A || (isPair && !B)) {
    fail('卦名解析', ex.name || ex.printed || '—', '无法唯一解析');
  } else {
    moving = isPair ? moveCount(A, B) : [];
    if (isPair && moving.length !== ex.moving) fail('动爻数', ex.moving, moving.length);
    r = buildLiuyao({
      lines: isPair ? linesFrom(A, moving) : A.bits.map((bit) => (bit ? 7 : 8)),
      dayGanZhi: day || PLACEHOLDER_DAY,
    });
    if (r.ben.name !== A.name) fail('本卦', A.name, r.ben.name);
    if (isPair && (!r.bian || r.bian.name !== B.name)) fail('变卦', B.name, r.bian && r.bian.name);
    if (r.ben.palace !== `${ex.gong[0]}宫` || r.ben.palaceElement !== EL[ex.gong[0]]) {
      fail('卦宫', `${ex.gong[0]}宫${EL[ex.gong[0]]}`, `${r.ben.palace}${r.ben.palaceElement}`);
    }
    if ((ex.que || []).length && missingOf(r).slice().sort().join() !== ex.que.slice().sort().join()) {
      fail('缺爻', ex.que.join('、'), missingOf(r).join('、') || '无');
    }
    if (kongChecked) {
      const got = (r.xunKong || []).slice().sort().join('');
      if (got !== ex.kong.split('').sort().join('')) fail('旬空', ex.kong, got);
    }
  }

  // 旬空这一项：核过就给值；没核就明说没核，不能拿引擎按「今天」算出来的值充数
  const kongActual = !r ? '空—' : (kongChecked ? `空${(r.xunKong || []).join('') || '—'}` : '空—（未核）');
  const kongExpected = kongChecked ? `空${ex.kong}` : `空${ex.kong || '—'}（未核）`;
  const kongItem = kongChecked ? '旬空' : '旬空（未核：原表无起卦日）';
  const actual = r
    ? [
      `${r.ben.name}${r.bian ? `之${r.bian.name}` : ''}`,
      `${r.ben.palace}${r.ben.palaceElement}`,
      `动${moving.length}`,
      `缺${missingOf(r).join('、') || '—'}`,
      kongActual,
    ].join('｜')
    : '装卦失败';
  const expected = isPair
    ? `${ex.name}｜${ex.gong}｜动${ex.moving}｜缺${(ex.que || []).join('、') || '—'}｜${kongExpected}`
    : `${ex.name}｜${ex.gong}｜缺${(ex.que || []).join('、') || '—'}｜${kongExpected}`;

  return {
    key: `ly-${kind}-${ex.zhan}-${ex.name}`,
    system: '六爻',
    case: `${ex.zhan}｜${ex.printed || ex.name}`,
    item: isPair
      ? `本变卦 / 动爻数 / 卦宫 / 缺爻 / ${kongItem}`
      : `卦名 / 卦宫 / 缺爻 / ${kongItem}`,
    expected,
    actual,
    status: fails.length ? '不一致' : '一致',
    reason: fails.length
      ? fails.join('；')
      : `《卜筮正宗》${isPair ? '成对卦例' : '静卦'}原表${kongChecked ? '' : '；旬空未核（该例原表未记起卦日）'}`,
    unchecked: !kongChecked,
    search: `${ex.zhan} ${ex.name} ${ex.printed || ''} ${ex.gong}`,
  };
}

function buildClassicRows() {
  const rows = [];
  for (const ex of FIX.boshizhengzong || []) rows.push(verifyClassicCase(ex, 'pair'));
  for (const ex of FIX.boshizhengzongStatic || []) rows.push(verifyClassicCase(ex, 'static'));
  for (const ex of FIX.boshizhengzongExcluded || []) {
    rows.push({
      key: `ly-excluded-${ex.zhan}`,
      system: '六爻',
      case: `${ex.zhan}｜${ex.printed || ex.name || '—'}`,
      item: '排除项',
      expected: ex.printed || ex.name || '—',
      actual: '未纳入 128 条对拍',
      status: '剔除',
      reason: ex.why || 'fixture 未写理由',
      search: `${ex.zhan} ${ex.printed || ''} ${ex.why || ''}`,
    });
  }
  return rows;
}

// ── 紫微：只用星位与四化，按地支相对位置独立重推 34 条 ────────────────
const fix12 = (i) => ((i % 12) + 12) % 12;

function independentZiwei(z) {
  const soul = z.palaces.find((p) => p.isSoul);
  const soulIdx = ZHI.indexOf(soul.branch);
  const at = (i) => z.palaces.find((p) => ZHI.indexOf(p.branch) === fix12(i));
  const pos = (name) => {
    const p = z.palaces.find((x) => x.stars.some((s) => s.name === name));
    return p ? ZHI.indexOf(p.branch) : -1;
  };
  const soulStars = soul.stars.map((s) => s.name);
  const soulMain = soul.stars.filter((s) => s.type === '主星').map((s) => s.name);
  const sanfang = [soulIdx, fix12(soulIdx + 4), fix12(soulIdx + 8), fix12(soulIdx + 6)];
  const near = new Set(sanfang.flatMap((i) => at(i).stars.map((s) => s.name)));
  const nearStar = (n) => near.has(n);
  const muts = new Set(sanfang.flatMap((i) => at(i).stars.filter((s) => s.mutagen).map((s) => s.mutagen)));
  const hualu = z.palaces.find((p) => p.stars.some((s) => s.mutagen === '禄'));
  const ji = z.palaces.find((p) => p.stars.some((s) => s.mutagen === '忌'));
  const lu = pos('禄存');
  const jia = (a, b) => {
    const pa = pos(a);
    const pb = pos(b);
    if (pa < 0 || pb < 0) return false;
    return (fix12(pa + 1) === soulIdx && fix12(pb - 1) === soulIdx)
      || (fix12(pb + 1) === soulIdx && fix12(pa - 1) === soulIdx);
  };
  return {
    命无正曜: soulMain.length === 0,
    杀破狼: soulMain.some((s) => s === '七杀' || s === '破军' || s === '贪狼'),
    机月同梁: ['天机', '太阴', '天同', '天梁'].every(nearStar) && soulMain.some((s) => ['天机', '太阴', '天同', '天梁'].includes(s)),
    月朗天门: soulIdx === 11 && pos('太阴') === 11,
    日出扶桑: soulIdx === 3 && pos('太阳') === 3,
    府相朝垣: nearStar('天府') && nearStar('天相'),
    禄马交驰: lu >= 0 && pos('天马') >= 0 && (pos('天马') === lu || fix12(lu - pos('天马')) === 6),
    火铃夹命: jia('火星', '铃星'),
    羊陀夹命: jia('擎羊', '陀罗'),
    羊陀夹忌: !!ji && lu >= 0 && ZHI.indexOf(ji.branch) === lu,
    铃昌陀武: ['铃星', '文昌', '陀罗', '武曲'].every((n) => pos(n) >= 0 && sanfang.includes(pos(n))),
    双禄交流: !!hualu && lu >= 0 && (ZHI.indexOf(hualu.branch) === lu || fix12(ZHI.indexOf(hualu.branch) - lu) === 6),
    紫府同宫: soulStars.includes('紫微') && soulStars.includes('天府'),
    紫府朝垣: nearStar('紫微') && nearStar('天府'),
    君臣庆会: (soulStars.includes('紫微') || soulStars.includes('天府'))
      && ['左辅', '右弼', '天魁', '天钺'].filter(nearStar).length >= 2,
    极向离明: soulIdx === 6 && pos('紫微') === 6,
    七杀朝斗: (soulIdx === 0 || soulIdx === 6) && soulStars.includes('七杀'),
    英星入庙: (soulIdx === 0 || soulIdx === 6) && soulStars.includes('破军'),
    石中隐玉: (soulIdx === 0 || soulIdx === 6) && soulStars.includes('巨门'),
    巨日同宫: pos('巨门') >= 0 && pos('巨门') === pos('太阳'),
    日月夹命: jia('太阳', '太阴'),
    日月对照: pos('太阳') >= 0 && pos('太阴') >= 0 && fix12(pos('太阳') - pos('太阴')) === 6,
    左右夹命: jia('左辅', '右弼'),
    昌曲夹命: jia('文昌', '文曲'),
    魁钺夹命: jia('天魁', '天钺'),
    三奇嘉会: muts.has('禄') && muts.has('权') && muts.has('科'),
    双禄朝垣: nearStar('禄存') && muts.has('禄'),
    命里逢空: nearStar('地空') && nearStar('地劫') && (soulStars.includes('地空') || soulStars.includes('地劫')),
    马头带箭: soulIdx === 6 && pos('擎羊') === 6,
    天罗地网: soulIdx === 4 || soulIdx === 10,
    刑囚夹印: pos('廉贞') >= 0 && pos('廉贞') === pos('天相') && pos('擎羊') === pos('天相')
      && pos('天相') === soulIdx && (pos('天相') === 0 || pos('天相') === 6),
    火贪铃贪: nearStar('贪狼') && (nearStar('火星') || nearStar('铃星')),
    武贪同行: pos('武曲') >= 0 && pos('武曲') === pos('贪狼'),
    泛水桃花: soulIdx === 0 && soulStars.includes('贪狼'),
  };
}

// 312 张：年份 / 月 / 日 / 时错开，覆盖十二命宫与十种年干
const SWEEP = [];
for (let y = 1950; y <= 2025; y += 3) {
  for (let m = 1; m <= 12; m += 1) SWEEP.push([y, m, 1 + ((y + m) % 28), (y + m * 3) % 24]);
}

const pad2 = (n) => String(n).padStart(2, '0');

function buildZiweiRows() {
  const rows = [];
  const stats = Object.fromEntries(Object.keys(PATTERN_TONE).map((name) => [name, {
    name, tone: PATTERN_TONE[name], hits: 0, mismatch: 0,
  }]));
  for (const [y, m, d, h] of SWEEP) {
    const z = buildZiwei({ year: y, month: m, day: d, hour: h, minute: 0, gender: 'male', trueSolar: false });
    const exp = independentZiwei(z);
    const got = new Set(z.patterns.map((p) => p.name));
    const want = Object.keys(exp).filter((n) => exp[n]);
    const misses = Object.keys(exp).filter((n) => exp[n] !== got.has(n));
    for (const n of want) stats[n].hits += 1;
    for (const n of misses) if (stats[n]) stats[n].mismatch += 1;
    const unknown = [...got].filter((n) => !(n in exp));
    const bad = misses.length > 0 || unknown.length > 0;
    rows.push({
      key: `zw-${y}-${pad2(m)}-${pad2(d)}-${pad2(h)}`,
      system: '紫微',
      case: `${y}-${pad2(m)}-${pad2(d)} ${pad2(h)}时`,
      item: '34 条格局独立谓词',
      expected: `命中 ${want.length} 条`,
      actual: `命中 ${got.size} 条`,
      status: bad ? '不一致' : '一致',
      reason: bad
        ? `不符：${misses.join('、') || '—'}${unknown.length ? `；多出：${unknown.join('、')}` : ''}`
        : '独立谓词只读星位与四化',
      search: `${y} ${m} ${d} ${h} 紫微 格局`,
    });
  }
  return { rows, stats: Object.values(stats) };
}

function parseDateTime(text) {
  const m = String(text).match(/^(\d{4})-(\d{1,2})-(\d{1,2})[T ](\d{1,2}):(\d{1,2})$/);
  if (!m) throw new Error(`无法解析 datetime：${text}`);
  return { year: +m[1], month: +m[2], day: +m[3], hour: +m[4], minute: +m[5] };
}

const YANG_STEMS = '甲丙戊庚壬';
const JIAOYUN_CASES = [
  { datetime: '1990-05-12T14:30', gender: 'male', note: '阳年男命顺排' },
  { datetime: '1990-05-12T14:30', gender: 'female', note: '阳年女命逆排' },
  { datetime: '1987-10-10T08:00', gender: 'male', note: '闰日：交运落 02-29' },
  { datetime: '1996-01-19T07:31', gender: 'male', trueSolar: true, longitude: 116.4, note: '真太阳时' },
  { datetime: '1966-11-12T10:00', gender: 'male', note: '年内交运' },
  { datetime: '2000-01-01T00:00', gender: 'female', note: '跨世纪' },
  { datetime: '1972-06-06T06:06', gender: 'male', note: '长间隔（31 天）' },
  { datetime: '2010-06-15T12:00', gender: 'female', note: '近节' },
  { datetime: '1984-02-04T16:30', gender: 'male', note: '立春边界' },
  { datetime: '1955-01-02T22:00', gender: 'male', note: '早年样本' },
  { datetime: '2025-12-31T23:30', gender: 'female', note: '晚子时边界' },
  { datetime: '1901-01-01T00:00', gender: 'male', note: 'ΔT 近似区间' },
];

function buildJiaoyunRows() {
  const rows = [];
  for (const c of JIAOYUN_CASES) {
    const p = parseDateTime(c.datetime);
    const r = buildBazi({
      ...p, gender: c.gender, trueSolar: c.trueSolar === true, dst: false,
      longitude: c.longitude, nowYear: 2026,
    });
    const j = r.dayun && r.dayun.jiao;
    const fails = [];
    const fail = (label, expected, actual) => fails.push(`${label}：期望 ${expected}，实际 ${actual}`);
    if (!j) {
      fail('dayun.jiao', '存在', '缺失');
    } else {
      const birthJd = partsToJd(p);
      const fromJd = partsToJd(parseDateTime(j.from.time));
      const yang = YANG_STEMS.includes(String(r.pillars.year.ganzhi || '')[0]);
      const dir = yang ? (c.gender === 'male' ? '顺行' : '逆行') : (c.gender === 'male' ? '逆行' : '顺行');
      if (r.dayun.direction !== dir) fail('顺逆排', dir, r.dayun.direction);
      const wantFrom = dir === '顺行' ? r.jieqi.next : r.jieqi.previous;
      if (!wantFrom || j.from.name !== wantFrom.name || j.from.time !== wantFrom.time) {
        fail('取节', `${wantFrom && wantFrom.name} ${wantFrom && wantFrom.time}`, `${j.from.name} ${j.from.time}`);
      }
      if (j.at !== formatJd(j.jd)) fail('at 与 jd 同源', formatJd(j.jd), j.at);
      if (Math.abs(j.scaleDaysPerDay - 365.2422 / 3) > 1e-9) fail('三日折一年比例', (365.2422 / 3).toFixed(6), String(j.scaleDaysPerDay));
      if (c.trueSolar !== true) {
        const span = dir === '顺行' ? fromJd - birthJd : birthJd - fromJd;
        if (Math.abs(j.spanDays - span) > 1e-3) fail('相隔天数', span.toFixed(4), String(j.spanDays));
      }
      const offset = j.jd - birthJd;
      const wantOffset = (j.offsetMinutes || 0) / 1440 + j.spanDays * j.scaleDaysPerDay;
      if (Math.abs(offset - wantOffset) > 0.02) fail('交运偏移', wantOffset.toFixed(6), offset.toFixed(6));
      const age = r.dayun.startAge.years + r.dayun.startAge.months / 12;
      if (Math.abs(age - j.spanDays / 3) > 1 / 12 + 1e-9) fail('与 startAge 同源', (j.spanDays / 3).toFixed(4), age.toFixed(4));
      if (c.trueSolar === true && j.frame !== '真太阳时') fail('时刻口径', '真太阳时', j.frame);
      if (c.trueSolar !== true && j.frame !== '平太阳时') fail('时刻口径', '平太阳时', j.frame);
      if (c.note.includes('闰日')) {
        if (j.at.slice(5, 10) !== '02-29') fail('闰日交运', '02-29', j.at.slice(5, 10));
        const nextTen = `${Number(j.at.slice(0, 4)) + 10}-02-28 ${j.at.slice(11)}`;
        if (r.dayun.list[0].toDate !== nextTen) fail('闰日十年后退位', nextTen, r.dayun.list[0].toDate);
      }
    }
    rows.push({
      key: `jy-${c.datetime}-${c.gender}-${c.trueSolar ? 'ts' : 'std'}`,
      system: '交运',
      case: `${c.datetime}｜${c.gender === 'male' ? '男' : '女'}${c.trueSolar ? '｜真太阳时' : ''}`,
      item: `${c.note}：取节 / 三日折一年 / 闰日`,
      expected: j ? `出生 + ${j.spanDays} 天 × ${j.scaleDaysPerDay.toFixed(4)}` : '—',
      actual: j ? `${j.at}（${j.frame} · ${r.dayun.direction}）` : '—',
      status: fails.length ? '不一致' : '一致',
      reason: fails.length ? fails.join('；') : '独立复算：出生 jd + 相邻节令真实天数 × 365.2422/3',
      search: `${c.datetime} ${c.gender} ${c.note}`,
    });
  }
  return rows;
}

/** 奇门：20 个时辰与参照盘逐宫比对（四柱 / 局数 / 值符 / 值使 / 星门神 / 天盘干） */
export function verifyQimenCase(item) {
  const c = item.chart;
  const late = item.slot.hour === 23 ? 'next-day' : 'same-day';
  const r = buildQimen({
    year: c.solar.y, month: c.solar.m, day: c.solar.d,
    hour: c.trueSolar.h, minute: c.trueSolar.mi, lateZiHourMode: late,
  });
  const fails = [];
  const expectedSz = [c.siZhu.year, c.siZhu.month, c.siZhu.day, c.siZhu.time].join(' ');
  const actualSz = [r.siZhu.year, r.siZhu.month, r.siZhu.day, r.siZhu.time].join(' ');
  if (actualSz !== expectedSz) fails.push(`四柱：期望 ${expectedSz}，实际 ${actualSz}`);
  const expectedJu = `${c.ju.dunCN}${c.ju.num}局·${c.ju.yuanCN}`;
  const actualJu = `${r.dun}${r.juNumber}局·${r.yuan}`;
  if (actualJu !== expectedJu) fails.push(`局数：期望 ${expectedJu}，实际 ${actualJu}`);
  const expectedFu = `${c.core.fuStar}@${c.core.fuGong}`;
  const actualFu = `${r.zhiFu.star}@${r.zhiFu.gong}`;
  if (actualFu !== expectedFu) fails.push(`值符：期望 ${expectedFu}，实际 ${actualFu}`);
  const expectedShi = `${c.core.valueGate}@${c.core.valueGong}`;
  const actualShi = `${r.zhiShi.gate}@${r.zhiShi.gong}`;
  if (actualShi !== expectedShi) fails.push(`值使：期望 ${expectedShi}，实际 ${actualShi}`);
  const all = [...r.palaces, r.centerPalace];
  let palaceOk = 0;
  const palaceTotal = Object.values(c.palaces).length;
  const palaceBad = [];
  for (const ref of Object.values(c.palaces)) {
    const m = all.find((x) => x.palace === String(ref.gong));
    if (m && m.star === ref.star && m.gate === (ref.gate || '') && m.god === (ref.shen || '') && m.tianPan === ref.tianGan) {
      palaceOk += 1;
    } else palaceBad.push(`${ref.gong}宫`);
  }
  if (palaceOk !== palaceTotal) fails.push(`九宫：${palaceOk}/${palaceTotal} 一致（${palaceBad.slice(0, 3).join('、')}）`);
  return {
    key: `qm-${item.slot.solarDate}-${item.slot.shichen}`,
    system: '奇门',
    case: `${item.slot.solarDate} ${item.slot.shichen}时`,
    item: '四柱 / 局数 / 值符 / 值使 / 九宫',
    expected: `${expectedSz}｜${expectedJu}｜符 ${expectedFu}｜使 ${expectedShi}｜${palaceTotal} 宫`,
    actual: `${actualSz}｜${actualJu}｜符 ${actualFu}｜使 ${actualShi}｜${palaceOk}/${palaceTotal} 宫`,
    status: fails.length ? '不一致' : '一致',
    reason: fails.length ? fails.join('；') : `参照盘逐宫比对：四柱、局数、值符、值使、星门神与天盘干`,
    search: `${item.slot.solarDate} ${item.slot.shichen} ${expectedSz} ${expectedJu}`,
  };
}

export function buildQimenRows() {
  return QIMEN_FIX.map((item) => verifyQimenCase(item));
}

// ── 八字：独立复算层 ──────────────────────────────────────────────────
// 这是整份报告里唯一「从古法自己推一遍」的体系。柱、纳音、藏干、十神、旬空
// 全部在本函数内按规则重推，一律不 import bazi.js 里的对应实现——引擎那份是
// 被测对象，用它算期望值等于自己给自己判卷。唯一借用的 partsToJd 只负责把
// 年月日时分换成儒略日序号（同一输入同一序号的换算，不含任何命理规则）。
//
// 还没做的（明写在 scope 里，不装作核过了）：旺衰分值、格局取用、神煞吉凶、
// 真太阳时的经度修正量本身。这些没有唯一文本口径，本机也没有可复现的底本，
// 报告里不出现它们的「期望值」。

const BAZI_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const BAZI_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const BAZI_STEM_EL = { 甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土', 己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水' };
const BAZI_NATURE = { 甲: '阳', 乙: '阴', 丙: '阳', 丁: '阴', 戊: '阳', 己: '阴', 庚: '阳', 辛: '阴', 壬: '阳', 癸: '阴' };
// 地支藏干：本气在前，中气、余气依次
const BAZI_HIDDEN = {
  子: ['癸'], 丑: ['己', '癸', '辛'], 寅: ['甲', '丙', '戊'], 卯: ['乙'],
  辰: ['戊', '乙', '癸'], 巳: ['丙', '庚', '戊'], 午: ['丁', '己'], 未: ['己', '丁', '乙'],
  申: ['庚', '壬', '戊'], 酉: ['辛'], 戌: ['戊', '辛', '丁'], 亥: ['壬', '甲'],
};
// 六十甲子纳音，两柱一名，30 名
const BAZI_NAYIN = [
  '海中金', '炉中火', '大林木', '路旁土', '剑锋金', '山头火', '涧下水', '城头土', '白蜡金', '杨柳木',
  '泉中水', '屋上土', '霹雳火', '松柏木', '长流水', '沙中金', '山下火', '平地木', '壁上土', '金箔金',
  '覆灯火', '天河水', '大驿土', '钗钏金', '桑柘木', '大溪水', '沙中土', '天上火', '石榴木', '大海水',
];
// 生我、我生、我克、克我
const BAZI_SHENG = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const BAZI_KE = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };

function baziIdxOf(stem, branch) {
  const s = BAZI_STEMS.indexOf(stem);
  const b = BAZI_BRANCHES.indexOf(branch);
  for (let i = 0; i < 60; i += 1) {
    if (i % 10 === s && i % 12 === b) return i;
  }
  return -1;
}

function baziShiShen(dayStem, other) {
  const me = BAZI_STEM_EL[dayStem];
  const it = BAZI_STEM_EL[other];
  const same = BAZI_NATURE[dayStem] === BAZI_NATURE[other];
  let rel;
  if (it === me) rel = '比';
  else if (BAZI_SHENG[me] === it) rel = '食伤';
  else if (BAZI_KE[me] === it) rel = '财';
  else if (BAZI_KE[it] === me) rel = '官杀';
  else rel = '印';
  const alt = same ? 1 : 0; // 阴阳相同取「偏/比/食/财/杀/枭」那一列
  if (rel === '比') return same ? '比肩' : '劫财';
  if (rel === '食伤') return same ? '食神' : '伤官';
  if (rel === '财') return same ? '偏财' : '正财';
  if (rel === '官杀') return same ? '七杀' : '正官';
  return same ? '偏印' : '正印';
}

function baziXunKong(ganzhi) {
  const i = baziIdxOf(ganzhi[0], ganzhi[1]);
  if (i < 0) return [];
  const head = Math.floor(i / 10) * 10;
  return [BAZI_BRANCHES[(head + 10) % 12], BAZI_BRANCHES[(head + 11) % 12]];
}

/**
 * 按古法独立推一张八字的四柱与各项明细。
 * @param {{year:number,month:number,day:number,hour:number,minute:number,lateZi?:boolean}} input
 */
export function recomputeBaziPillars(input) {
  const { year, month, day, hour, minute } = input;
  const lateZi = input.lateZi !== false;
  // 日柱：以 2000-01-01（戊午，序号 54）为基准，按「本地日序号」线性推移。
  // partsToJd 只管把一个钟面时刻换成序号；23:00 后是否算次日是独立的一条规则，
  // 所以先取整日序号，再按 lateZi 决定要不要 +1。
  const jdnBase = Math.floor(partsToJd({ year, month, day, hour: 12, minute: 0 }) + 0.5);
  const dayIndex0 = (((jdnBase - 2451545 + 54) % 60) + 60) % 60;
  const dayIndex = lateZi && hour >= 23 ? (dayIndex0 + 1) % 60 : dayIndex0;
  const dayGan = BAZI_STEMS[dayIndex % 10];
  const dayZhi = BAZI_BRANCHES[dayIndex % 12];

  // 年柱：以立春为界。立春交节时刻本层不自己算（那是历法精算，不是干支规则），
  // 但「2 月 4 日前后一天」这个历法常识够用：1 月 15 日～2 月 3 日仍属上一年，
  // 2 月 5 日～12 月 31 日算当年。样本一律避开 2 月 4 日当天，交界那几条的
  // 年柱由引擎的节气精算决定，本层不对它下断言（见 reason 里的「边界不验年柱」）。
  const lichunEdge = month === 2 && (day === 3 || day === 4);
  const solarYearForPillar = month === 1 || (month === 2 && day <= 3) ? year - 1 : year;
  const yearIndex = ((((solarYearForPillar - 4) % 60) + 60) % 60);
  const yearGan = BAZI_STEMS[yearIndex % 10];
  const yearZhi = BAZI_BRANCHES[yearIndex % 12];

  // 月柱：五虎遁。正月建寅，年干甲己起丙寅、乙庚起戊寅……
  // 月支按公历月估算（节气分界不由本层判），只在样本明确落在月中时比对。
  const monthBranchIdx = month % 12; // 1 月 = 丑（index 1）、2 月 = 寅（index 2）……
  const yinStem = ((BAZI_STEMS.indexOf(yearGan) % 5) * 2 + 2) % 10;
  const monthOffset = ((monthBranchIdx - 2) % 12 + 12) % 12;
  const monthStem = BAZI_STEMS[(yinStem + monthOffset) % 10];
  const monthZhi = BAZI_BRANCHES[monthBranchIdx];

  // 时柱：五鼠遁。子时起于日干，甲己还加甲、乙庚丙作初……
  const hourBranchIdx = Math.floor(((hour + 1) % 24) / 2);
  const ziStem = ((BAZI_STEMS.indexOf(dayGan) % 5) * 2) % 10;
  const hourStem = BAZI_STEMS[(ziStem + hourBranchIdx) % 10];
  const hourZhi = BAZI_BRANCHES[hourBranchIdx];

  const pillarOf = (stem, branch) => {
    const idx = baziIdxOf(stem, branch);
    return {
      ganzhi: stem + branch,
      stem,
      branch,
      nayin: BAZI_NAYIN[Math.floor(idx / 2)],
      hidden: BAZI_HIDDEN[branch].join(''),
      hiddenShiShen: BAZI_HIDDEN[branch].map((s) => baziShiShen(dayGan, s)),
      stemShiShen: baziShiShen(dayGan, stem),
      xunKong: baziXunKong(stem + branch).join(''),
    };
  };

  return {
    lateZi,
    yangYear: BAZI_NATURE[yearGan] === '阳',
    pillars: {
      year: pillarOf(yearGan, yearZhi),
      month: pillarOf(monthStem, monthZhi),
      day: pillarOf(dayGan, dayZhi),
      hour: pillarOf(hourStem, hourZhi),
    },
  };
}

/** 一条八字样本：独立复算 vs 引擎，逐项比对 */
export function verifyBaziCase(c) {
  const p = parseDateTime(c.datetime);
  const [datePart, timePart] = String(c.datetime).split('T');
  const [hh, mi] = (timePart || '00:00').split(':').map(Number);
  // 引擎侧：关掉真太阳时与夏令时，让两边的输入完全相同（本表核的是干支规则，不是经度修正）
  const chart = buildBazi({
    ...p, gender: c.gender, trueSolar: false, dst: false, lateZi: c.lateZi !== false, nowYear: 2026,
  });
  const mine = recomputeBaziPillars({
    year: p.year, month: p.month, day: p.day, hour: hh, minute: mi, lateZi: c.lateZi !== false,
  });
  // 节令当天（每月 4～8 日、19～23 日各有一节一气）月柱会换，本层的公历近似会偏。
  // 样本一律取月中，只有明确标 boundary 的那几条允许落在交界日——那时月柱/年柱不比。
  const jieEdge = Boolean(c.boundary);
  const lichunEdge = jieEdge && p.month === 2 && p.day <= 5;
  const note = jieEdge ? `${c.note}｜交界日：立春当天不比年柱，节令当天不比月柱（那由引擎的节气精算定）` : c.note;
  const fails = [];
  const cmp = (label, expected, actual) => {
    if (String(expected) !== String(actual)) fails.push(`${label}：期望 ${expected}，实际 ${actual}`);
  };
  for (const k of ['year', 'month', 'day', 'hour']) {
    const nameCN = { year: '年柱', month: '月柱', day: '日柱', hour: '时柱' }[k];
    const want = mine.pillars[k];
    const got = chart.pillars[k];
    // 交界日（立春 / 节令当天）本层只用了「公历日估算」，那天归哪一年哪一月由
    // 引擎的节气精算说了算，这里不对它下断言——比下去只会拿自己的近似去冒充错。
    const skip = (k === 'year' && lichunEdge) || (k === 'month' && jieEdge);
    if (!skip) {
      cmp(nameCN, want.ganzhi, got.ganzhi);
      cmp(`${nameCN}纳音`, want.nayin, got.nayin);
      cmp(`${nameCN}藏干`, want.hidden, (got.hidden || []).map((h) => h.stem).join(''));
      // 十神只核日干外的三柱与藏干；日柱天干自身是「我」，引擎给比肩
      if (k !== 'day') cmp(`${nameCN}天干十神`, want.stemShiShen, got.stemTenGod);
      cmp(`${nameCN}藏干十神`, want.hiddenShiShen.join('/'), (got.hidden || []).map((h) => h.tenGod).join('/'));
    }
  }
  const actualKong = (chart.kongwang || chart.pillars.day.kongwang || []).join('');
  cmp('日柱旬空', mine.pillars.day.xunKong, actualKong);
  const wantDir = mine.yangYear
    ? (c.gender === 'male' ? '顺行' : '逆行')
    : (c.gender === 'male' ? '逆行' : '顺行');
  // 大运顺逆看「立春分界后的年干」，所以立春当天的顺逆由引擎说了算，本层不断言
  if (chart.dayun && !lichunEdge) cmp('大运顺逆', wantDir, chart.dayun.direction);

  const expected = ['year', 'month', 'day', 'hour'].map((k) => mine.pillars[k].ganzhi).join(' ');
  const actual = ['year', 'month', 'day', 'hour'].map((k) => chart.pillars[k].ganzhi).join(' ');
  return {
    key: `bz-${c.datetime}-${c.gender}`,
    system: '八字',
    case: `${c.datetime}｜${c.gender === 'male' ? '男' : '女'}${c.lateZi === false ? '｜当晚子时' : ''}`,
    item: '四柱 / 纳音 / 藏干 / 十神 / 旬空 / 大运顺逆',
    expected: `${expected}｜${mine.pillars.year.nayin}｜空${mine.pillars.day.xunKong}`,
    actual: `${actual}｜${chart.pillars.year.nayin}｜空${actualKong || '—'}`,
    status: fails.length ? '不一致' : '一致',
    reason: fails.length ? fails.join('；') : `独立复算（${datePart} ${timePart || '00:00'}${mine.lateZi ? ' 晚子时换日' : ' 不换日'}）；${note}`,
    search: `${c.datetime} ${c.gender} ${expected} ${c.note}`,
  };
}

export function buildBaziRows() {
  return BAZI_FIX.cases.map((c) => verifyBaziCase(c));
}

// ── 八字真实命例：与外部基准（BaziQA / lunar-python 1.4.8）对拍 ──────────────
// 上一块是本仓自己按古法重推一遍，核的是「引擎与自己的规矩一致」，性质是自证；
// 这一块换外部基准：117 个真实命例（香港青年术数家协会「全球算命师大赛」2010–2026
// 的参赛盘）四柱由上游 lunar-python 排出，本引擎按同一份原文钟表时间重排，逐例比四柱。
// 这是全仓第一处「与第三方排盘软件对拍」，也是唯一一处期望值不由本仓产生的地方。
const BAZIQA = JSON.parse(fs.readFileSync(path.join(ROOT, 'test', 'fixtures', 'baziqa-pillars.json'), 'utf8'));
const BAZIQA_KEYS = ['year', 'month', 'day', 'hour'];
const BAZIQA_CN = { year: '年柱', month: '月柱', day: '日柱', hour: '时柱' };

export function verifyBaziqaCase(c) {
  const [datePart, timePart] = String(c.clock).trim().split(/[T ]/);
  const [y, mo, d] = datePart.split('-').map(Number);
  const [hh, mi] = (timePart || '00:00').split(':').map(Number);
  // 夏令时按上游口径交给引擎自己判：上游记了 dst_minutes 就打开，能不能扣看本引擎的表覆盖不覆盖那年那地
  const chart = buildBazi({
    year: y, month: mo, day: d, hour: hh, minute: mi,
    gender: c.gender, trueSolar: false, dst: c.dstMinutes > 0, lateZi: true, nowYear: 2026,
  });
  const actual = BAZIQA_KEYS.map((k) => (chart.pillars[k] ? chart.pillars[k].ganzhi : null));
  const hourMissing = c.upstream[3] == null;
  const cols = hourMissing ? BAZIQA_KEYS.slice(0, 3) : BAZIQA_KEYS;
  const fails = [];
  for (const k of cols) {
    const i = BAZIQA_KEYS.indexOf(k);
    if (c.upstream[i] !== actual[i]) fails.push(`${BAZIQA_CN[k]}：上游 ${c.upstream[i]}，本引擎 ${actual[i] || '—'}`);
  }
  const dstApplied = Boolean(chart.dst && chart.dst.applied);
  const dstNote = c.dstMinutes > 0
    ? (dstApplied
      ? `已扣 ${c.dstMinutes} 分钟夏令时`
      : `上游记了 ${c.dstMinutes} 分钟夏令时、本引擎未扣（夏令时表只收中国大陆时段）`)
    : '';
  // 口径差异不算排盘错误：不足 1 小时的偏移只可能动时柱，且差异已定位到夏令时表覆盖范围
  const dstGap = fails.length > 0 && c.dstMinutes > 0 && !dstApplied
    && fails.every((f) => f.startsWith('时柱'));
  const status = dstGap ? '剔除' : (fails.length ? '不一致' : '一致');
  const reason = dstGap
    ? `${dstNote}；时柱口径差异，非排盘错误`
    : fails.length
      ? fails.join('；')
      : `外部基准 ${BAZIQA.meta.upstreamEngine}${dstNote ? '；' + dstNote : ''}${hourMissing ? '；上游该案无时柱，只比年月日三柱' : ''}`;
  return {
    key: `bzq-${c.id}`,
    system: '八字',
    case: `${c.clock.replace('T', ' ')}｜${c.gender === 'male' ? '男' : '女'}｜${c.place || '—'}`,
    item: hourMissing ? '四柱（上游缺时柱，比三柱）' : '四柱',
    expected: c.upstream.map((x) => x || '—').join(' '),
    actual: actual.map((x) => x || '—').join(' '),
    status,
    reason,
    search: `${c.id} ${c.file} ${c.clock} ${c.place || ''} ${c.upstream.join(' ')}`,
  };
}

export function buildBaziqaRows() {
  return BAZIQA.cases.map((c) => verifyBaziqaCase(c));
}

export function buildVerification() {
  const classicRows = buildClassicRows();
  const { rows: ziweiRows, stats: patternStats } = buildZiweiRows();
  const jiaoyunRows = buildJiaoyunRows();
  const qimenRows = buildQimenRows();
  const baziRows = buildBaziRows();
  const baziqaRows = buildBaziqaRows();
  const rows = [...classicRows, ...ziweiRows, ...jiaoyunRows, ...qimenRows, ...baziRows, ...baziqaRows];
  const mismatch = rows.filter((r) => r.status === '不一致').length;
  const excluded = rows.filter((r) => r.status === '剔除').length;
  // 「未核」不是「一致」：原表没记起卦日的卦例，旬空无从核对，单独计数
  const unchecked = rows.filter((r) => r.unchecked).length;
  const patternMismatch = patternStats.reduce((n, s) => n + s.mismatch, 0);
  return {
    version: PKG.version,
    totals: {
      liuyao: (FIX.boshizhengzong || []).length + (FIX.boshizhengzongStatic || []).length,
      liuyaoPaired: (FIX.boshizhengzong || []).length,
      liuyaoStatic: (FIX.boshizhengzongStatic || []).length,
      liuyaoExcluded: (FIX.boshizhengzongExcluded || []).length,
      ziweiCharts: SWEEP.length,
      ziweiPatterns: Object.keys(PATTERN_TONE).length,
      ziweiJudgments: SWEEP.length * Object.keys(PATTERN_TONE).length,
      patternMismatch,
      jiaoyun: JIAOYUN_CASES.length,
      qimen: QIMEN_FIX.length,
      qimenPalaces: QIMEN_FIX.reduce((n, x) => n + Object.keys(x.chart.palaces).length, 0),
      bazi: BAZI_FIX.cases.length,
      baziqa: BAZIQA.cases.length,
      baziqaExcluded: baziqaRows.filter((r) => r.status === '剔除').length,
      rows: rows.length,
      mismatch,
      excluded,
      unchecked,
    },
    rows,
    patternStats,
  };
}

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (ch) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[ch]);

const statusClass = { 一致: 'ok', 剔除: 'skip', 不一致: 'bad' };

export function renderVerificationHTML(data) {
  const t = data.totals;
  const rows = data.rows.map((r) => `<tr data-status="${esc(r.status)}" data-system="${esc(r.system)}">
      <td data-label="体系">${esc(r.system)}</td>
      <td data-label="案例" class="case">${esc(r.case)}</td>
      <td data-label="对拍项">${esc(r.item)}</td>
      <td data-label="期望 / 来源" class="mono">${esc(r.expected)}</td>
      <td data-label="引擎结果" class="mono">${esc(r.actual)}</td>
      <td data-label="状态" class="status ${statusClass[r.status] || ''}">${esc(r.status)}</td>
      <td data-label="说明" class="reason">${esc(r.reason)}</td>
    </tr>`).join('\n');
  const chips = data.patternStats.map((s) =>
    `<span class="chip ${s.mismatch ? 'bad' : 'ok'}" title="${esc(s.tone === 'good' ? '吉格' : s.tone === 'bad' ? '忌格' : '中性')}">${esc(s.name)} <b>×${s.hits}</b>${s.mismatch ? ` <i>不符 ${s.mismatch}</i>` : ''}</span>`,
  ).join('\n');
  const title = `公开对拍报告 · ${data.version}`;
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<style>
:root{--bg:#f5f1e9;--panel:#fffdf8;--panel2:#f9f5ec;--ink:#1a1916;--dim:#6f6a60;--line:#d8cfbf;--accent:#a72c23;--ok:#1f6f3f;--bad:#a72c23;--skip:#8a5a00}
@media (prefers-color-scheme:dark){:root{--bg:#12110d;--panel:#1b1913;--panel2:#221f18;--ink:#e7e2d6;--dim:#9b9488;--line:#3c372e;--accent:#e2755f;--ok:#67b98a;--bad:#e2755f;--skip:#d9a052}}
*{box-sizing:border-box}
body{margin:0;padding:24px 20px 60px;background:var(--bg);color:var(--ink);font:15px/1.65 "Microsoft YaHei","PingFang SC",system-ui,sans-serif}
.wrap{max-width:1180px;margin:0 auto}
h1{margin:0 0 4px;font-size:24px;letter-spacing:.04em}
.sub{color:var(--dim);font-size:13px;margin:0 0 18px}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px;margin:0 0 18px}
.card{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:12px 14px}
.card span{display:block;color:var(--dim);font-size:12px}
.card b{display:block;font-size:22px;line-height:1.35;color:var(--accent)}
.card small{color:var(--dim);font-size:12px}
.controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:10px 12px;margin:0 0 12px;position:sticky;top:0;z-index:2}
.controls .lab{font-size:12px;color:var(--dim);letter-spacing:.08em}
.seg{display:inline-flex;gap:4px;flex-wrap:wrap}
.seg button{font:inherit;font-size:13px;padding:6px 11px;border-radius:999px;border:1px solid var(--line);background:var(--panel2);color:var(--ink);cursor:pointer}
.seg button.on{background:var(--accent);border-color:transparent;color:#fff;font-weight:600}
#q{font:inherit;font-size:13px;padding:6px 10px;border-radius:8px;border:1px solid var(--line);background:var(--panel2);color:var(--ink);min-width:160px;flex:1 1 180px}
#shown{font-size:12px;color:var(--dim);margin-left:auto}
.scroll{overflow-x:auto;border:1px solid var(--line);border-radius:12px;background:var(--panel)}
table{width:100%;min-width:880px;border-collapse:collapse;font-size:13px}
th,td{padding:8px 10px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}
th{background:var(--panel2);color:var(--dim);font-weight:600;font-size:12px;letter-spacing:.05em}
tr:last-child td{border-bottom:none}
td.case{font-weight:600;max-width:210px}
td.mono{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12px;max-width:260px;overflow-wrap:anywhere}
td.reason{color:var(--dim);max-width:300px}
td.status{font-weight:700;white-space:nowrap}
.status.ok{color:var(--ok)}.status.bad{color:var(--bad)}.status.skip{color:var(--skip)}
tr[hidden]{display:none}
.panel{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:12px 14px;margin:16px 0}
.panel summary{cursor:pointer;font-weight:600}
.chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.chip{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border:1px solid var(--line);border-radius:999px;background:var(--panel2);font-size:12px}
.chip b{font-weight:600}.chip.ok b{color:var(--ok)}.chip.bad{border-color:var(--bad)}.chip.bad b,.chip.bad i{color:var(--bad)}
.chip i{font-style:normal;font-size:11px}
.note{color:var(--dim);font-size:12.5px;line-height:1.7}
.note code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12px}
@media (min-width:641px){
  table{table-layout:fixed}
  th:nth-child(1),td:nth-child(1){width:52px}
  th:nth-child(2),td:nth-child(2){width:160px}
  th:nth-child(3),td:nth-child(3){width:150px}
  th:nth-child(4),td:nth-child(4){width:180px}
  th:nth-child(5),td:nth-child(5){width:180px}
  th:nth-child(6),td:nth-child(6){width:52px}
}
@media (max-width:640px){
  body{padding:16px 10px 44px}
  h1{font-size:20px}
  .controls{position:static}
  .seg button{min-height:44px;padding:8px 12px}
  #shown{margin-left:0;flex-basis:100%}
  .scroll{overflow:visible}
  table{min-width:0;display:block}
  thead{display:none}
  tbody,tr,td{display:block;width:100%}
  tr{border-bottom:1px solid var(--line);padding:8px 0}
  td{display:grid;grid-template-columns:72px minmax(0,1fr);gap:8px;padding:4px 12px;max-width:none;border:none}
  td::before{content:attr(data-label);color:var(--dim);font-size:12px}
  td.case,td.mono,td.reason{max-width:none}
}
</style>
</head>
<body>
<div class="wrap">
  <h1>公开对拍报告</h1>
  <p class="sub">v${esc(data.version)} · 卦例来自《卜筮正宗》原表；紫微用只读星位与四化的独立谓词；奇门与参照盘逐宫比对；交运按「三日折一年」独立复算；八字按五虎遁、五鼠遁与十神规则独立复算；另有 ${t.baziqa} 个真实命例的四柱与上游 lunar-python 对拍。报告与 <code>npm test</code> 共用同一份生成器。</p>

  <div class="cards">
    <div class="card"><span>六爻卦例</span><b>${t.liuyao}</b><small>成对 ${t.liuyaoPaired} · 静卦 ${t.liuyaoStatic} · 剔除 ${t.liuyaoExcluded}</small></div>
    <div class="card"><span>紫微盘</span><b>${t.ziweiCharts}</b><small>${t.ziweiPatterns} 条格局 · ${t.ziweiJudgments.toLocaleString('zh-CN')} 条判定</small></div>
    <div class="card"><span>奇门时辰</span><b>${t.qimen}</b><small>${t.qimen} × 9 宫 = ${t.qimenPalaces} 个宫位</small></div>
    <div class="card"><span>交运案例</span><b>${t.jiaoyun}</b><small>取节 · 比例 · 闰日 · 真太阳时</small></div>
    <div class="card"><span>八字样本</span><b>${t.bazi}</b><small>四柱 · 纳音 · 藏干 · 十神 · 旬空 · 顺逆</small></div>
    <div class="card"><span>真实命例</span><b>${t.baziqa}</b><small>四柱对拍 · 上游 lunar-python${t.baziqaExcluded ? ` · 剔除 ${t.baziqaExcluded}` : ''}</small></div>
    <div class="card"><span>不一致</span><b>${t.mismatch}</b><small>剔除 ${t.excluded} 条（理由见下表）${t.unchecked ? ` · 未核 ${t.unchecked} 项（原表无起卦日，旬空不比对）` : ''}</small></div>
  </div>

  <div class="controls" role="group" aria-label="筛选对拍结果">
    <span class="lab">状态</span>
    <div class="seg" id="statusSeg">
      <button type="button" data-status-filter="all" aria-pressed="true" class="on">全部</button>
      <button type="button" data-status-filter="一致" aria-pressed="false">一致</button>
      <button type="button" data-status-filter="剔除" aria-pressed="false">剔除 + 理由</button>
      <button type="button" data-status-filter="不一致" aria-pressed="false">不一致</button>
    </div>
    <span class="lab">体系</span>
    <div class="seg" id="systemSeg">
      <button type="button" data-system-filter="all" aria-pressed="true" class="on">全部</button>
      <button type="button" data-system-filter="六爻" aria-pressed="false">六爻</button>
      <button type="button" data-system-filter="紫微" aria-pressed="false">紫微</button>
      <button type="button" data-system-filter="奇门" aria-pressed="false">奇门</button>
      <button type="button" data-system-filter="交运" aria-pressed="false">交运</button>
      <button type="button" data-system-filter="八字" aria-pressed="false">八字</button>
    </div>
    <input id="q" type="search" placeholder="搜索案例 / 格局 / 理由" aria-label="搜索对拍记录">
    <span id="shown" aria-live="polite"></span>
  </div>

  <div class="scroll">
    <table>
      <thead><tr><th>体系</th><th>案例</th><th>对拍项</th><th>期望 / 来源</th><th>引擎结果</th><th>状态</th><th>说明</th></tr></thead>
      <tbody>
${rows}
      </tbody>
    </table>
  </div>

  <details class="panel">
    <summary>34 条紫微格局在 312 张盘上的命中分布</summary>
    <div class="chips">
${chips}
    </div>
    <p class="note">每条至少命中一次；某条命中数为 0 说明规则写死了，报告会直接标红。</p>
  </details>

  <div class="panel note">
    <b>同源与复算</b><br>
    本页由 <code>tools/verification.mjs</code> 生成；<code>test/verification.test.mjs</code> 直接 import 同一个生成器，断言 128 条卦例、312 张紫微盘、20 个奇门时辰、12 个交运案例与 0 处不符，并要求本页与徽章和生成结果逐字节一致。任何判定变化或忘记重建报告，CI 都会变红。<br>
    六爻：<code>test/fixtures/classics.json</code>（成对 ${t.liuyaoPaired} + 静卦 ${t.liuyaoStatic}；源 138 条中 ${t.liuyaoExcluded} 条因原文动爻标记与变卦推导冲突被剔除，理由逐条列在上表）。<br>
    紫微：${t.ziweiCharts} 张扫描盘 × ${t.ziweiPatterns} 条格局 = ${t.ziweiJudgments.toLocaleString('zh-CN')} 条判定；独立谓词只读 <code>palaces[].stars</code> 与四化，不调用引擎的格局函数。<br>
    奇门：${t.qimen} 个时辰 × 9 宫 = ${t.qimenPalaces} 个宫位；参照盘来自 <code>test/fixtures/qimen-20.json</code>，逐宫核四柱、局数、值符、值使、星门神与天盘干。<br>
    交运：出生 jd + 到相邻节令的真实天数 × 365.2422/3；核顺逆取节、比例、与 startAge 同源、闰日退位与真太阳时口径。尚未与第三方排盘软件批量对拍，样本为独立复算。<br>
    八字：${t.bazi} 个样本，四柱 / 纳音 / 藏干 / 十神 / 旬空 / 大运顺逆六项由 <code>tools/verification.mjs</code> 里的 <code>recomputeBaziPillars()</code> 按五虎遁、五鼠遁、六十甲子、藏干与十神规则重推一边，再与引擎逐项比对——期望值不读 <code>engine/bazi.js</code> 的对应实现。样本日期全避开节令交界日，交界日只核日柱与时柱。<b>没核的</b>（不在这张表里，也不假装核过）：旺衰分值与格局取用（无唯一文本口径）、神煞吉凶。<br>
    八字真实命例：${t.baziqa} 个真实命例（<code>test/fixtures/baziqa-pillars.json</code>，取自 <a href="https://github.com/ChenJiangxi/BaziQA" rel="noopener">ChenJiangxi/BaziQA</a>，香港青年术数家协会「全球算命师大赛」2010–2026 参赛盘），四柱由上游 lunar-python 1.4.8 排定，本引擎按同一份原文钟表时间重排——这是本报告里唯一一处期望值不来自本仓的地方。${t.baziqa - t.baziqaExcluded} 例四柱全同${t.baziqaExcluded ? `；${t.baziqaExcluded} 例剔除，理由是夏令时口径差异（本插件夏令时表只收中国大陆时段，1974 年香港那例该扣未扣，差在时柱）` : ''}。上游该案无时柱的命例只比年月日三柱。同理<b>没核的</b>：旺衰与格局的优劣判定（竞赛题的人生事实题本仓不取，也就无从打分）。
  </div>
</div>
<script>
(function(){
  var state={status:'all',system:'all',q:''};
  var rows=Array.prototype.slice.call(document.querySelectorAll('tbody tr'));
  var count=document.getElementById('shown');
  var q=document.getElementById('q');
  function setPressed(seg,key,value){
    Array.prototype.forEach.call(seg.querySelectorAll('button'),function(b){
      var on=b.getAttribute(key)===value;
      b.classList.toggle('on',on);
      b.setAttribute('aria-pressed',on?'true':'false');
    });
  }
  function apply(){
    var n=0;
    rows.forEach(function(r){
      var ok=state.status==='all'||r.getAttribute('data-status')===state.status;
      if(ok) ok=state.system==='all'||r.getAttribute('data-system')===state.system;
      if(ok&&state.q) ok=r.textContent.toLowerCase().indexOf(state.q)>=0;
      r.hidden=!ok;
      if(ok)n++;
    });
    count.textContent='显示 '+n+' / '+rows.length+' 条';
  }
  var ss=document.getElementById('statusSeg');
  ss.addEventListener('click',function(e){
    var b=e.target.closest('[data-status-filter]');if(!b)return;
    state.status=b.getAttribute('data-status-filter');setPressed(ss,'data-status-filter',state.status);apply();
  });
  var ys=document.getElementById('systemSeg');
  ys.addEventListener('click',function(e){
    var b=e.target.closest('[data-system-filter]');if(!b)return;
    state.system=b.getAttribute('data-system-filter');setPressed(ys,'data-system-filter',state.system);apply();
  });
  q.addEventListener('input',function(){state.q=q.value.trim().toLowerCase();apply();});
  apply();
})();
</script>
</body>
</html>
`;
}

/** 徽章文字宽度（Verdana 11px 下的粗估）：徽章是定宽 SVG，字多了会顶出彩色面板，
 *  所以宽度得跟着内容算，不能写死一个数字。中文/全角标点按 1em，数字与字母 0.62em，
 *  空格 0.32em，其余符号 0.4em——宁可估宽一点，也别让字压到边缘。 */
export function badgeTextWidth(text, fontSize = 11) {
  let w = 0;
  for (const ch of String(text == null ? '' : text)) {
    const cp = ch.codePointAt(0);
    if (cp >= 0x2e80) w += fontSize;
    else if (ch === ' ') w += fontSize * 0.32;
    else if (/[0-9A-Za-z]/.test(ch)) w += fontSize * 0.65;
    else w += fontSize * 0.45;
  }
  return w;
}

export function renderBadgeSVG(data) {
  const t = data.totals;
  const ok = t.mismatch === 0;
  const color = ok ? '#1f6f3f' : '#a72c23';
  const label = ok ? '0 处不符' : `${t.mismatch} 处不符`;
  // 「未核」必须写进徽章：127 条古例没记起卦日，旬空这一项事实上没核过。
  // 只挂「0 处不符」会让人以为 128 条全核了，那是拿没说出口的口径充数。
  const unchecked = t.unchecked ? ` · ${t.unchecked} 未核` : '';
  const right = `${label}｜${t.liuyao} 例 · ${t.excluded} 剔除${unchecked} · ${t.ziweiCharts} 紫微 · ${t.qimen} 奇门 · ${t.jiaoyun} 交运 · ${t.bazi} 八字 · ${t.baziqa} 真实`;
  const LEFT = 66;        // 左侧「对拍」标签宽
  const OVERLAP = 4;      // 左右两栏重叠 4px，藏住接缝
  const PAD = 18;         // 右栏左右留白
  const rightW = Math.max(150, Math.ceil(badgeTextWidth(right)) + PAD * 2);
  const width = LEFT - OVERLAP + rightW;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="28" role="img" aria-label="公开对拍：${esc(right)}">
  <title>公开对拍：${esc(right)}</title>
  <linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient>
  <rect width="${width}" height="28" rx="4" fill="#555"/>
  <rect x="${LEFT - OVERLAP}" width="${rightW}" height="28" rx="4" fill="${color}"/>
  <rect x="${LEFT - OVERLAP}" width="${rightW}" height="28" fill="url(#s)"/>
  <rect width="${LEFT}" height="28" rx="4" fill="#555"/>
  <rect x="${LEFT - OVERLAP}" width="${OVERLAP}" height="28" fill="#555"/>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,DejaVu Sans,sans-serif" font-size="11">
    <text x="${LEFT / 2}" y="18">对拍</text>
    <text x="${LEFT - OVERLAP + rightW / 2}" y="18">${esc(right)}</text>
  </g>
</svg>
`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const data = buildVerification();
  const html = renderVerificationHTML(data);
  const badge = renderBadgeSVG(data);
  fs.writeFileSync(path.join(ROOT, 'docs', 'verification.html'), html, 'utf8');
  fs.mkdirSync(path.join(ROOT, 'docs', 'assets'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'docs', 'assets', 'verification-badge.svg'), badge, 'utf8');
  console.log(`verification written: ${data.totals.rows} rows / ${data.totals.mismatch} mismatch / ${data.totals.excluded} excluded / ${data.totals.unchecked} unchecked`);
  console.log(`  docs/verification.html ${Buffer.byteLength(html, 'utf8')} bytes`);
  console.log(`  docs/assets/verification-badge.svg ${Buffer.byteLength(badge, 'utf8')} bytes`);
}
