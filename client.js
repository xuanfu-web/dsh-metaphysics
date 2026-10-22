// 由 tools/build-client.mjs 生成，请勿手改。
window.__ModuleLoader__.load({
  id: 'dsh-metaphysics',
  factory(require) {
    const React = (function () {
      try { return require('react'); } catch (e) { return globalThis.React; }
    })();
    if (!React) return { inject: [], apply() {} };
    const h = React.createElement;
    const __mods = {};
__mods.calendar = (function () {
// 历法底座：儒略日、干支、二十四节气、真太阳时
// 全部为纯函数，不依赖 DOM / Node API，Host 与 Client 可共用。

const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const TERM_NAMES = [
  '小寒', '大寒', '立春', '雨水', '惊蛰', '春分', '清明', '谷雨',
  '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋', '处暑',
  '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至',
];

// 二十四节气对应的太阳视黄经（0 号为小寒 285°）
function termLongitude(index) {
  return (285 + 15 * index) % 360;
}

/** 公历 -> 儒略日数（当日正午的整数 JDN） */
function toJDN(year, month, day) {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return (
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

/** 儒略日数 -> 公历 */
function fromJDN(jdn) {
  const a = jdn + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor((146097 * b) / 4);
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  return {
    year: 100 * b + d - 4800 + Math.floor(m / 10),
    month: m + 3 - 12 * Math.floor(m / 10),
    day: e - Math.floor((153 * m + 2) / 5) + 1,
  };
}

/** 由天干/地支序号求六十甲子序号（0 = 甲子），阴阳不配返回 -1 */
function sexagenaryIndex(stemIdx, branchIdx) {
  for (let i = 0; i < 60; i++) {
    if (i % 10 === stemIdx && i % 12 === branchIdx) return i;
  }
  return -1;
}

function ganzhiName(index) {
  const i = ((index % 60) + 60) % 60;
  return {
    index: i,
    stem: STEMS[i % 10],
    branch: BRANCHES[i % 12],
    name: STEMS[i % 10] + BRANCHES[i % 12],
  };
}

/** 日柱干支序号。基准：1900-01-31 甲辰旬外推，(JDN + 49) % 60 = 0 即甲子日 */
function dayGanzhiIndex(jdn) {
  return (((jdn + 49) % 60) + 60) % 60;
}

/** 太阳视黄经（度），Meeus《天文算法》第 25 章低精度公式，误差约 0.01° */
function sunLongitude(jd) {
  const T = (jd - 2451545.0) / 36525;
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  const M = ((357.52911 + 35999.05029 * T - 0.0001537 * T * T) * Math.PI) / 180;
  const C =
    (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * M) +
    0.000289 * Math.sin(3 * M);
  const om = ((125.04 - 1934.136 * T) * Math.PI) / 180;
  const lambda = L0 + C - 0.00569 - 0.00478 * Math.sin(om);
  return ((lambda % 360) + 360) % 360;
}

/** ΔT（TT - UT，秒）。分段线性近似，误差 < 2s，对分钟级排盘足够 */
function deltaTSeconds(year) {
  const knots = [
    [1900, -2.8], [1920, 21.2], [1940, 24.3], [1950, 29.1], [1960, 33.2],
    [1970, 40.2], [1980, 50.5], [1990, 56.9], [2000, 63.8], [2010, 66.1],
    [2020, 69.4], [2030, 72.0], [2050, 80.0], [2100, 110.0],
  ];
  if (year <= knots[0][0]) return knots[0][1];
  for (let i = 1; i < knots.length; i++) {
    if (year <= knots[i][0]) {
      const [y0, v0] = knots[i - 1];
      const [y1, v1] = knots[i];
      return v0 + ((v1 - v0) * (year - y0)) / (y1 - y0);
    }
  }
  return knots[knots.length - 1][1];
}

/**
 * 第 index 个节气（0 = 小寒）在指定年份的时刻，返回北京时间儒略日。
 * index 为偶数的是「节」（定月柱），奇数的是「气」。
 */
function termInstantJd(year, index) {
  const target = termLongitude(index);
  const anchor = toJDN(year, 1, 5) - 0.5 + index * 15.2184;
  let jd = anchor;
  for (let n = 0; n < 12; n++) {
    let diff = target - sunLongitude(jd);
    diff = ((((diff + 180) % 360) + 360) % 360) - 180;
    jd += diff / 0.98564736;
    if (Math.abs(diff) < 1e-7) break;
  }
  // TT -> UT -> 北京时间
  return jd - deltaTSeconds(year) / 86400 + 8 / 24;
}

/** 儒略日（本地时间轴）拆成日期与时刻 */
function jdToParts(jdLocal) {
  const jdn = Math.floor(jdLocal + 0.5);
  const frac = jdLocal + 0.5 - jdn;
  const totalMinutes = Math.round(frac * 1440);
  const { year, month, day } = fromJDN(jdn);
  return {
    year,
    month,
    day,
    hour: Math.floor(totalMinutes / 60) % 24,
    minute: totalMinutes % 60,
  };
}

function partsToJd({ year, month, day, hour = 0, minute = 0 }) {
  return toJDN(year, month, day) - 0.5 + (hour * 60 + minute) / 1440;
}

/** 均时差（分钟）：真太阳时 = 平太阳时 + 经度差 + 均时差 */
function equationOfTime(year, month, day) {
  const n = toJDN(year, month, day) - toJDN(year, 1, 1) + 1;
  const B = (2 * Math.PI * (n - 81)) / 364;
  return 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
}

/** 列出 [year-1, year+1] 三年的节气，按时间升序 */
function termWindow(year) {
  const list = [];
  for (let y = year - 1; y <= year + 1; y++) {
    for (let i = 0; i < 24; i++) {
      list.push({ year: y, index: i, name: TERM_NAMES[i], jd: termInstantJd(y, i) });
    }
  }
  list.sort((a, b) => a.jd - b.jd);
  return list;
}

/** 找到 jd 之前（含）最近的一个「节」（偶数索引） */
function previousJie(terms, jd) {
  let found = null;
  for (const t of terms) {
    if (t.index % 2 !== 0) continue;
    if (t.jd <= jd) found = t;
    else break;
  }
  return found;
}

/** 找到 jd 之后最近的一个「节」 */
function nextJie(terms, jd) {
  for (const t of terms) {
    if (t.index % 2 !== 0) continue;
    if (t.jd > jd) return t;
  }
  return null;
}

function formatJd(jd) {
  const p = jdToParts(jd);
  const pad = (n) => String(n).padStart(2, '0');
  return `${p.year}-${pad(p.month)}-${pad(p.day)} ${pad(p.hour)}:${pad(p.minute)}`;
}

return { STEMS, BRANCHES, TERM_NAMES, termLongitude, toJDN, fromJDN, sexagenaryIndex, ganzhiName, dayGanzhiIndex, sunLongitude, deltaTSeconds, termInstantJd, jdToParts, partsToJd, equationOfTime, termWindow, previousJie, nextJie, formatJd };
})();

__mods.lunar = (function () {
// 农历（定朔）：朔望月计算 + 冬至所在月为十一月 + 无中气置闰
const { toJDN, jdToParts, termInstantJd, deltaTSeconds } = __mods.calendar;

const SYNODIC = 29.530588861;
const NEW_MOON_EPOCH = 2451550.09766;
const D2R = Math.PI / 180;

/**
 * 第 k 个朔的儒略日（北京时间）。
 * Meeus《天文算法》第 49 章主要周期项，实测与公开朔时刻相差约 1 分钟。
 */
function newMoonJd(k) {
  const T = k / 1236.85;
  const jde = NEW_MOON_EPOCH + SYNODIC * k
    + 0.00015437 * T * T
    - 0.000000150 * T * T * T
    + 0.00000000073 * T * T * T * T;

  const E = 1 - 0.002516 * T - 0.0000074 * T * T;
  const M = (2.5534 + 29.10535670 * k - 0.0000014 * T * T - 0.00000011 * T * T * T) * D2R;
  const Mp = (201.5643 + 385.81693528 * k + 0.0107582 * T * T + 0.00001238 * T * T * T
    - 0.000000058 * T * T * T * T) * D2R;
  const F = (160.7108 + 390.67050284 * k - 0.0016118 * T * T - 0.00000227 * T * T * T
    + 0.000000011 * T * T * T * T) * D2R;
  const Om = (124.7746 - 1.56375588 * k + 0.0020672 * T * T + 0.00000215 * T * T * T) * D2R;

  const corr =
    -0.40720 * Math.sin(Mp)
    + 0.17241 * E * Math.sin(M)
    + 0.01608 * Math.sin(2 * Mp)
    + 0.01039 * Math.sin(2 * F)
    + 0.00739 * E * Math.sin(Mp - M)
    - 0.00514 * E * Math.sin(Mp + M)
    + 0.00208 * E * E * Math.sin(2 * M)
    - 0.00111 * Math.sin(Mp - 2 * F)
    - 0.00057 * Math.sin(Mp + 2 * F)
    + 0.00056 * E * Math.sin(2 * Mp + M)
    - 0.00042 * Math.sin(3 * Mp)
    + 0.00042 * E * Math.sin(M + 2 * F)
    + 0.00038 * E * Math.sin(M - 2 * F)
    - 0.00024 * E * Math.sin(2 * Mp - M)
    - 0.00017 * Math.sin(Om)
    - 0.00007 * Math.sin(Mp + 2 * M)
    + 0.00004 * Math.sin(2 * Mp - 2 * F)
    + 0.00004 * Math.sin(3 * M)
    + 0.00003 * Math.sin(Mp + M - 2 * F)
    + 0.00003 * Math.sin(2 * Mp + 2 * F)
    - 0.00003 * Math.sin(Mp + M + 2 * F)
    + 0.00003 * Math.sin(Mp - M + 2 * F)
    - 0.00002 * Math.sin(Mp - M - 2 * F)
    - 0.00002 * Math.sin(3 * Mp + M)
    + 0.00002 * Math.sin(4 * Mp);

  // TT -> UT -> 北京时间
  return jde + corr - deltaTSeconds(2000 + T * 100) / 86400 + 8 / 24;
}

/** 某时刻所在的「日」：返回当日 0 时的 JDN */
function dayNumberOf(jd) {
  return Math.floor(jd + 0.5);
}

function kNear(jdDay) {
  return Math.round((jdDay + 0.5 - NEW_MOON_EPOCH) / SYNODIC);
}

/** 判断 (startDay, endDay) 内是否含中气（气 = 奇数索引） */
function hasZhongQi(year, startDay, endDay) {
  for (let y = year - 1; y <= year + 1; y++) {
    for (let i = 1; i < 24; i += 2) {
      const d = dayNumberOf(termInstantJd(y, i));
      if (d >= startDay && d < endDay) return { index: i, jd: termInstantJd(y, i) };
    }
  }
  return null;
}

/**
 * 公历 -> 农历
 * 规则：冬至所在月为十一月；其后逐月编号，遇无中气之月置闰。
 */
function solarToLunar(year, month, day) {
  const targetDay = toJDN(year, month, day);

  const wsDayThisYear = dayNumberOf(termInstantJd(year, 23));
  const wsYear = targetDay < wsDayThisYear ? year - 1 : year;
  const wsDay = dayNumberOf(termInstantJd(wsYear, 23));

  // 十一月朔：日序不晚于冬至的最后一个朔日
  let k = kNear(wsDay);
  while (dayNumberOf(newMoonJd(k)) > wsDay) k--;
  while (dayNumberOf(newMoonJd(k + 1)) <= wsDay) k++;

  let num = 11;
  let leapUsed = false;
  let cursorStart = dayNumberOf(newMoonJd(k));

  for (let i = 1; i <= 15; i++) {
    const startDay = dayNumberOf(newMoonJd(k + i - 1));
    const endDay = dayNumberOf(newMoonJd(k + i));
    const zq = hasZhongQi(wsYear, startDay, endDay);
    const isLeap = !zq && !leapUsed && i > 1;

    if (targetDay >= startDay && targetDay < endDay) {
      const sp = jdToParts(newMoonJd(k + i - 1));
      // 闰月沿用上一个月的月号
      const displayNum = isLeap ? ((num + 10) % 12) + 1 : num;
      return {
        year: wsYear,
        // 农历年号：十一、十二月属上一农历年，正月至十月属 wsYear + 1
        lunarYear: displayNum >= 11 ? wsYear : wsYear + 1,
        month: displayNum,
        day: targetDay - startDay + 1,
        isLeap,
        monthStart: `${sp.year}-${String(sp.month).padStart(2, '0')}-${String(sp.day).padStart(2, '0')}`,
        hasZhongQi: Boolean(zq),
      };
    }

    if (isLeap) leapUsed = true;
    else num = (num % 12) + 1;
    cursorStart = endDay;
  }

  throw new Error(`农历换算失败：${year}-${month}-${day}`);
}

/** 农历月首的儒略日（供内部校验） */
function monthStartJd(year, month, day) {
  return toJDN(year, month, day);
}



return { SYNODIC, newMoonJd, dayNumberOf, solarToLunar, monthStartJd };
})();

__mods.geo = (function () {
// 地址 -> 经度（真太阳时用）。内置省级 + 主要地级市坐标，供离线使用。
// 坐标为近似值（±0.2°≈0.8 分钟时差），足够真太阳时使用；不联网、不上传。
const RAW = `
北京 116.41 39.90;上海 121.47 31.23;天津 117.20 39.13;重庆 106.55 29.56
广州 113.26 23.13;深圳 114.06 22.55;珠海 113.58 22.27;东莞 113.75 23.02;佛山 113.12 23.02
汕头 116.68 23.35;中山 113.39 22.52;惠州 114.42 23.11;江门 113.08 22.58;湛江 110.36 21.27
韶关 113.60 24.81;梅州 116.12 24.29;清远 113.05 23.70;肇庆 112.47 23.05;茂名 110.93 21.66
揭阳 116.37 23.55;潮州 116.62 23.66;汕尾 115.37 22.78;河源 114.70 23.74;阳江 111.98 21.86
杭州 120.15 30.28;宁波 121.55 29.88;温州 120.70 28.00;嘉兴 120.75 30.75;湖州 120.09 30.89
绍兴 120.58 30.05;金华 119.65 29.09;台州 121.42 28.66;舟山 122.10 30.00;衢州 118.87 28.94;丽水 119.92 28.45
南京 118.80 32.06;苏州 120.62 31.32;无锡 120.31 31.49;常州 119.97 31.81;南通 120.89 31.98
徐州 117.28 34.26;扬州 119.41 32.39;盐城 120.16 33.35;泰州 119.92 32.46;镇江 119.45 32.20
淮安 119.02 33.61;连云港 119.22 34.60;宿迁 118.28 33.96
合肥 117.23 31.82;芜湖 118.43 31.35;蚌埠 117.39 32.92;安庆 117.05 30.54;阜阳 115.81 32.90
六安 116.50 31.75;马鞍山 118.50 31.67;淮南 117.00 32.63;滁州 118.32 32.30;黄山 118.34 29.71
福州 119.30 26.08;厦门 118.09 24.48;泉州 118.68 24.87;漳州 117.65 24.51;莆田 119.01 25.45
宁德 119.55 26.67;三明 117.64 26.26;南平 118.18 26.64;龙岩 117.02 25.08
南昌 115.86 28.68;赣州 114.93 25.83;九江 116.00 29.70;上饶 117.94 28.45;宜春 114.40 27.80
吉安 114.99 27.11;抚州 116.36 27.95;景德镇 117.18 29.27;萍乡 113.85 27.62;新余 114.93 27.82;鹰潭 117.07 28.26
济南 117.00 36.65;青岛 120.38 36.07;烟台 121.45 37.46;潍坊 119.16 36.70;临沂 118.35 35.05
济宁 116.59 35.41;淄博 118.05 36.82;威海 122.12 37.51;泰安 117.09 36.20;德州 116.36 37.44
聊城 115.98 36.45;菏泽 115.48 35.23;枣庄 117.32 34.81;日照 119.53 35.42;东营 118.50 37.43
滨州 117.97 37.38
郑州 113.62 34.75;洛阳 112.45 34.62;南阳 112.53 33.00;开封 114.31 34.80;新乡 113.93 35.30
安阳 114.35 36.10;商丘 115.65 34.44;信阳 114.09 32.15;周口 114.70 33.62;驻马店 114.02 33.00
平顶山 113.19 33.77;许昌 113.85 34.03;焦作 113.24 35.22;濮阳 115.03 35.76;漯河 114.03 33.58;三门峡 111.20 34.78
武汉 114.30 30.59;宜昌 111.29 30.69;襄阳 112.14 32.04;荆州 112.24 30.33;黄石 115.04 30.20
十堰 110.79 32.65;孝感 113.92 30.92;黄冈 114.87 30.45;咸宁 114.32 29.84;恩施 109.49 30.27
荆门 112.20 31.04;随州 113.38 31.72;鄂州 114.89 30.40
长沙 112.94 28.23;株洲 113.13 27.83;湘潭 112.94 27.83;衡阳 112.57 26.89;岳阳 113.13 29.36
常德 111.70 29.03;郴州 113.02 25.77;邵阳 111.47 27.24;益阳 112.36 28.55;永州 111.61 26.42
怀化 109.99 27.55;娄底 112.00 27.70;张家界 110.48 29.12
成都 104.07 30.67;绵阳 104.68 31.47;德阳 104.40 31.13;南充 106.08 30.80;宜宾 104.63 28.77
泸州 105.44 28.87;自贡 104.78 29.34;乐山 103.76 29.58;达州 107.50 31.21;内江 105.06 29.58
遂宁 105.57 30.53;眉山 103.85 30.05;广元 105.84 32.44;广安 106.63 30.46;攀枝花 101.72 26.58
雅安 103.00 29.98;巴中 106.75 31.87;资阳 104.63 30.12
贵阳 106.63 26.65;遵义 106.93 27.73;六盘水 104.83 26.60;安顺 105.93 26.25;毕节 105.29 27.30
铜仁 109.19 27.72;凯里 107.98 26.58;都匀 107.52 26.26
昆明 102.83 24.88;曲靖 103.80 25.49;玉溪 102.54 24.35;大理 100.23 25.60;丽江 100.23 26.86
保山 99.17 25.11;昭通 103.72 27.34;普洱 100.97 22.79;临沧 100.09 23.88;景洪 100.80 22.00
拉萨 91.13 29.65;日喀则 88.88 29.27;林芝 94.36 29.65;昌都 97.17 31.14
西安 108.94 34.34;咸阳 108.70 34.33;宝鸡 107.14 34.37;渭南 109.50 34.50;汉中 107.03 33.07
榆林 109.73 38.29;延安 109.49 36.60;安康 109.03 32.68;商洛 109.94 33.87;铜川 108.95 34.90
兰州 103.83 36.06;天水 105.72 34.58;白银 104.14 36.55;酒泉 98.49 39.73;张掖 100.45 38.93
武威 102.63 37.93;庆阳 107.64 35.71;平凉 106.67 35.54;定西 104.63 35.58;陇南 104.93 33.40
西宁 101.78 36.62;海东 102.10 36.50;格尔木 94.90 36.40
银川 106.23 38.49;石嘴山 106.38 39.02;吴忠 106.20 37.99;固原 106.24 36.02
乌鲁木齐 87.62 43.82;克拉玛依 84.89 45.58;喀什 75.99 39.47;伊宁 81.32 43.92;库尔勒 86.15 41.76
阿克苏 80.26 41.17;哈密 93.51 42.83;吐鲁番 89.19 42.95;石河子 86.04 44.31
呼和浩特 111.75 40.84;包头 109.84 40.66;鄂尔多斯 109.78 39.61;赤峰 118.89 42.26;通辽 122.24 43.65
呼伦贝尔 119.77 49.21;乌兰察布 113.13 40.99;巴彦淖尔 107.42 40.75
沈阳 123.43 41.80;大连 121.62 38.92;鞍山 122.99 41.11;抚顺 123.96 41.88;本溪 123.77 41.30
丹东 124.38 40.13;锦州 121.13 41.10;营口 122.24 40.67;阜新 121.67 42.02;辽阳 123.24 41.27
盘锦 122.07 41.12;铁岭 123.84 42.29;朝阳 120.45 41.57;葫芦岛 120.84 40.71
长春 125.32 43.82;吉林 126.55 43.84;四平 124.35 43.17;通化 125.94 41.73;白山 126.42 41.94
松原 124.82 45.14;白城 122.84 45.62;延吉 129.51 42.91
哈尔滨 126.53 45.80;齐齐哈尔 123.92 47.35;牡丹江 129.63 44.55;佳木斯 130.32 46.80;大庆 125.11 46.59
鸡西 130.97 45.30;双鸭山 131.16 46.65;伊春 128.84 47.73;鹤岗 130.30 47.35;黑河 127.53 50.24;绥化 126.97 46.65
南宁 108.37 22.82;柳州 109.42 24.33;桂林 110.29 25.27;梧州 111.28 23.48;北海 109.12 21.48
玉林 110.16 22.63;百色 106.62 23.90;河池 108.06 24.70;钦州 108.65 21.98;防城港 108.35 21.69
贵港 109.60 23.11;贺州 111.57 24.40;来宾 109.23 23.75;崇左 107.36 22.40
海口 110.20 20.04;三亚 109.51 18.25;儋州 109.58 19.52;琼海 110.47 19.26
香港 114.17 22.32;澳门 113.55 22.20;台北 121.52 25.03;高雄 120.31 22.63;台中 120.68 24.14
`;

const PROVINCES = {
  河北: '石家庄', 山西: '太原', 内蒙古: '呼和浩特', 辽宁: '沈阳', 吉林: '长春', 黑龙江: '哈尔滨',
  江苏: '南京', 浙江: '杭州', 安徽: '合肥', 福建: '福州', 江西: '南昌', 山东: '济南', 河南: '郑州',
  湖北: '武汉', 湖南: '长沙', 广东: '广州', 广西: '南宁', 海南: '海口', 四川: '成都', 贵州: '贵阳',
  云南: '昆明', 西藏: '拉萨', 陕西: '西安', 甘肃: '兰州', 青海: '西宁', 宁夏: '银川', 新疆: '乌鲁木齐',
  台湾: '台北',
};

const EXTRA = {
  石家庄: [114.51, 38.04], 太原: [112.55, 37.87], 沈阳: [123.43, 41.80],
  长春: [125.32, 43.82], 哈尔滨: [126.53, 45.80], 南京: [118.80, 32.06],
  杭州: [120.15, 30.28], 合肥: [117.23, 31.82], 福州: [119.30, 26.08],
  南昌: [115.86, 28.68], 济南: [117.00, 36.65], 郑州: [113.62, 34.75],
  武汉: [114.30, 30.59], 长沙: [112.94, 28.23], 广州: [113.26, 23.13],
  南宁: [108.37, 22.82], 海口: [110.20, 20.04], 成都: [104.07, 30.67],
  贵阳: [106.63, 26.65], 昆明: [102.83, 24.88], 拉萨: [91.13, 29.65],
  西安: [108.94, 34.34], 兰州: [103.83, 36.06], 西宁: [101.78, 36.62],
  银川: [106.23, 38.49], 乌鲁木齐: [87.62, 43.82], 台北: [121.52, 25.03],
};

const CITIES = (() => {
  const map = {};
  for (const line of RAW.trim().split('\n')) {
    for (const item of line.split(';')) {
      const parts = item.trim().split(/\s+/);
      if (parts.length !== 3) continue;
      const [name, lon, lat] = parts;
      map[name] = { lon: Number(lon), lat: Number(lat) };
    }
  }
  for (const [name, [lon, lat]] of Object.entries(EXTRA)) {
    if (!map[name]) map[name] = { lon, lat };
  }
  return map;
})();

const SUFFIX = /(省|市|地区|盟|自治州|自治县|自治区|特别行政区|县|区|镇|乡|街道|村|小区|社区)/g;

/** 地址 -> { lon, lat, matched, level, note } */
function resolveAddress(input) {
  const raw = String(input || '').trim();
  if (!raw) return null;

  // 纯数字按经度处理，兼容直接填经纬度的用户
  const num = Number(raw);
  if (Number.isFinite(num) && /^-?\d+(\.\d+)?$/.test(raw) && num >= 60 && num <= 150) {
    return { lon: num, lat: null, matched: `${num}°E`, level: '经度', note: '按你输入的经度计算' };
  }

  const text = raw.replace(/\s/g, '').replace(SUFFIX, '');
  const names = Object.keys(CITIES).sort((a, b) => b.length - a.length);

  for (const n of names) {
    if (text.includes(n)) {
      const c = CITIES[n];
      return { lon: c.lon, lat: c.lat, matched: n, level: '地级市', note: `按 ${n} 估算（约 ${c.lon}°E）` };
    }
  }
  for (const [prov, capital] of Object.entries(PROVINCES)) {
    if (text.includes(prov)) {
      const c = CITIES[capital] || { lon: EXTRA[capital][0], lat: EXTRA[capital][1] };
      return { lon: c.lon, lat: c.lat, matched: capital, level: '省会', note: `未匹配到具体城市，按 ${prov} 省会 ${capital} 估算（约 ${c.lon}°E）` };
    }
  }
  return { lon: null, lat: null, matched: null, level: '未匹配', note: `没查到「${raw}」，可改填经度（如 116.4）` };
}

/** 地址里出现了比「城市」更细的层级时，优先联网 */
const DETAIL = /(区|县|镇|乡|村|小区|街道|路|号|巷|弄|组|队)/;

/** OpenStreetMap Nominatim：免密钥、支持中文。失败返回 null。 */
async function onlineLookup(text, { timeoutMs = 2500 } = {}) {
  if (typeof fetch !== 'function') return null;
  let timer = null;
  try {
    const controller = typeof AbortController === 'function' ? new AbortController() : null;
    if (controller) timer = setTimeout(() => controller.abort(), timeoutMs);
    const url = 'https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&accept-language=zh-CN&countrycodes=cn&q='
      + encodeURIComponent(text);
    const res = await fetch(url, {
      signal: controller ? controller.signal : undefined,
      headers: { 'User-Agent': 'dsh-metaphysics/0.2 (local plugin)' },
    });
    if (!res || !res.ok) return null;
    const list = await res.json();
    if (!Array.isArray(list) || list.length === 0) return null;
    const hit = list[0];
    const lon = Number(hit.lon);
    const lat = Number(hit.lat);
    if (!Number.isFinite(lon)) return null;
    return { lon, lat, matched: hit.display_name, level: '在线', note: `在线解析：${hit.display_name}` };
  } catch (e) {
    return null;
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/**
 * 地址 -> 经度。离线表优先；地址更细（含区/县/村/小区等）或离线未命中时联网查。
 * @param {string} input 地址
 * @param {{online?: boolean, timeoutMs?: number}} opts
 */
async function geocodeAddress(input, opts = {}) {
  const local = resolveAddress(input);
  const text = String(input || '').trim();
  if (!text) return local;
  const wantOnline = opts.online !== false;
  if (!wantOnline) return local;
  if (local && typeof local.lon === 'number' && !DETAIL.test(text)) return local;
  const remote = await onlineLookup(text, opts);
  if (remote) return { ...remote, local: local && local.lon != null ? local : null };
  return local;
}



return { CITIES, PROVINCES, resolveAddress, geocodeAddress };
})();

__mods.shensha = (function () {
// 八字神煞引擎：表驱动、双查法，按类归组
// 设计要点：
//  · 每条规则声明「查法来源」（年干/日干、年支/日支、月支、日柱、时柱）与命中的干支；
//  · 同一神煞有多派查法时，在 rule 文本里注明，避免「算法黑箱」；
//  · 命中按柱记录，同时给出按类别归并的 chart 级视图，供 UI 分组展示。
// 神煞只作参考，不可直接断吉凶——吉凶仍须看格局、旺衰、行运。
const { BRANCHES } = __mods.calendar;

const PILLAR_KEYS = ['year', 'month', 'day', 'hour'];
const PILLAR_LABEL = { year: '年柱', month: '月柱', day: '日柱', hour: '时柱' };
const CATEGORY_ORDER = ['贵人', '文星', '婚姻', '性情', '事业', '凶煞', '格局'];

const STEMS_LIST = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const STEM_VIA = { year: '年干', month: '月干', day: '日干', hour: '时干' };
const BRANCH_VIA = { year: '年支', month: '月支', day: '日支', hour: '时支' };

// 三合局（将星、驿马、桃花等以年支、日支双查）
const SANHE = { 寅午戌: ['寅', '午', '戌'], 申子辰: ['申', '子', '辰'], 巳酉丑: ['巳', '酉', '丑'], 亥卯未: ['亥', '卯', '未'] };
const trioKey = (b) => Object.keys(SANHE).find((k) => SANHE[k].includes(b));
// 方局（孤辰、寡宿以年支查）
const FANGJU = { 亥子丑: ['寅', '戌'], 寅卯辰: ['巳', '丑'], 巳午未: ['申', '辰'], 申酉戌: ['亥', '未'] };
const fangjuKey = (b) => Object.keys(FANGJU).find((k) => k.includes(b));
// 季节（天赦、四废、童子煞以月支查）
const SEASON = {
  寅: '春', 卯: '春', 辰: '春',
  巳: '夏', 午: '夏', 未: '夏',
  申: '秋', 酉: '秋', 戌: '秋',
  亥: '冬', 子: '冬', 丑: '冬',
};

const T = (ch) => ({ kind: 'branch', ch });
const S = (ch) => ({ kind: 'stem', ch });
const GZ = (ch) => ({ kind: 'gz', ch });

// ── 表 ──────────────────────────────────────────────────────────

// 天乙贵人：甲戊庚丑未，乙己子申，丙丁亥酉，辛午寅，壬癸卯巳
const TIANYI = {
  甲: ['丑', '未'], 戊: ['丑', '未'], 庚: ['丑', '未'],
  乙: ['子', '申'], 己: ['子', '申'],
  丙: ['亥', '酉'], 丁: ['亥', '酉'],
  辛: ['午', '寅'], 壬: ['卯', '巳'], 癸: ['卯', '巳'],
};
// 太极贵人：甲乙子午，丙丁卯酉，戊己辰戌丑未，庚辛寅亥，壬癸巳申
const TAIJI = {
  甲: ['子', '午'], 乙: ['子', '午'],
  丙: ['卯', '酉'], 丁: ['卯', '酉'],
  戊: ['辰', '戌', '丑', '未'], 己: ['辰', '戌', '丑', '未'],
  庚: ['寅', '亥'], 辛: ['寅', '亥'],
  壬: ['巳', '申'], 癸: ['巳', '申'],
};
// 天德贵人：按月支（寅=正月），值可为天干或地支
const TIANDE = { 寅: '丁', 卯: '申', 辰: '壬', 巳: '辛', 午: '亥', 未: '甲', 申: '癸', 酉: '寅', 戌: '丙', 亥: '乙', 子: '巳', 丑: '庚' };
// 月德贵人：按三合月局
const YUEDE = { 寅午戌: '丙', 申子辰: '壬', 亥卯未: '甲', 巳酉丑: '庚' };
// 月德合：月德与五合之干
const YUEDE_HE = { 丙: '辛', 壬: '丁', 甲: '己', 庚: '乙' };
// 福星贵人：甲丙寅子、乙癸卯丑，丁酉、戊申、己未、庚午、辛巳、壬辰
const FUXING = {
  甲: ['寅', '子'], 丙: ['寅', '子'],
  乙: ['卯', '丑'], 癸: ['卯', '丑'],
  丁: ['酉'], 戊: ['申'], 己: ['未'], 庚: ['午'], 辛: ['巳'], 壬: ['辰'],
};
// 天官贵人（通行表，流派有异）
const TIANGUAN = { 甲: ['未'], 乙: ['辰'], 丙: ['巳'], 丁: ['酉'], 戊: ['戌'], 己: ['卯'], 庚: ['亥'], 辛: ['申'], 壬: ['午'], 癸: ['寅'] };
// 国印贵人
const GUOYIN = { 甲: ['戌'], 乙: ['亥'], 丙: ['丑'], 丁: ['寅'], 戊: ['丑'], 己: ['寅'], 庚: ['辰'], 辛: ['巳'], 壬: ['未'], 癸: ['申'] };
// 天厨贵人：食神之禄
const TIANCHU = { 甲: ['巳'], 乙: ['午'], 丙: ['巳'], 丁: ['午'], 戊: ['申'], 己: ['酉'], 庚: ['亥'], 辛: ['子'], 壬: ['寅'], 癸: ['卯'] };
// 天医：月支退一位
const TIANYI_MED = { 寅: '丑', 卯: '寅', 辰: '卯', 巳: '辰', 午: '巳', 未: '午', 申: '未', 酉: '申', 戌: '酉', 亥: '戌', 子: '亥', 丑: '子' };
// 文昌贵人
const WENCHANG = { 甲: ['巳'], 乙: ['午'], 丙: ['申'], 丁: ['酉'], 戊: ['申'], 己: ['酉'], 庚: ['亥'], 辛: ['子'], 壬: ['寅'], 癸: ['卯'] };
// 德秀贵人：按月局，德、秀各自取干
const DEXIU = {
  寅午戌: ['丙', '丁', '戊', '癸'],
  申子辰: ['壬', '癸', '戊', '己', '丙', '辛', '甲', '己'],
  巳酉丑: ['庚', '辛', '乙'],
  亥卯未: ['甲', '乙', '丁', '壬'],
};
// 桃花（咸池）
const TAOHUA = { 寅午戌: ['卯'], 申子辰: ['酉'], 巳酉丑: ['午'], 亥卯未: ['子'] };
// 将星：三合中神
const JIANGXING = { 寅午戌: ['午'], 申子辰: ['子'], 巳酉丑: ['酉'], 亥卯未: ['卯'] };
// 华盖：三合墓库
const HUAGAI = { 寅午戌: ['戌'], 申子辰: ['辰'], 巳酉丑: ['丑'], 亥卯未: ['未'] };
// 驿马
const YIMA = { 寅午戌: ['申'], 申子辰: ['寅'], 巳酉丑: ['亥'], 亥卯未: ['巳'] };
// 劫煞、灾煞、亡神：由三合局推
const JIESHA = { 寅午戌: ['亥'], 申子辰: ['巳'], 巳酉丑: ['寅'], 亥卯未: ['申'] };
const ZAISHA = { 寅午戌: ['子'], 申子辰: ['午'], 巳酉丑: ['卯'], 亥卯未: ['酉'] };
const WANGSHEN = { 寅午戌: ['巳'], 申子辰: ['亥'], 巳酉丑: ['申'], 亥卯未: ['寅'] };
// 金舆：禄前二位
const JINYU = { 甲: ['辰'], 乙: ['巳'], 丙: ['未'], 丁: ['申'], 戊: ['未'], 己: ['申'], 庚: ['戌'], 辛: ['亥'], 壬: ['丑'], 癸: ['寅'] };
// 禄神
const LUSHEN = { 甲: ['寅'], 乙: ['卯'], 丙: ['巳'], 丁: ['午'], 戊: ['巳'], 己: ['午'], 庚: ['申'], 辛: ['酉'], 壬: ['亥'], 癸: ['子'] };
// 羊刃：禄前一位（阳干论刃为主）
const YANGREN = { 甲: ['卯'], 乙: ['辰'], 丙: ['午'], 丁: ['未'], 戊: ['午'], 己: ['未'], 庚: ['酉'], 辛: ['戌'], 壬: ['子'], 癸: ['丑'] };
// 飞刃：羊刃六冲
const FEIREN = { 甲: ['酉'], 乙: ['戌'], 丙: ['子'], 丁: ['丑'], 戊: ['子'], 己: ['丑'], 庚: ['卯'], 辛: ['辰'], 壬: ['午'], 癸: ['未'] };
// 流霞（通行表）
const LIUXIA = { 甲: ['酉'], 乙: ['戌'], 丙: ['未'], 丁: ['申'], 戊: ['巳'], 己: ['午'], 庚: ['辰'], 辛: ['卯'], 壬: ['亥'], 癸: ['寅'] };

// 日柱专论
const KUIGANG = ['庚辰', '庚戌', '壬辰', '戊戌'];
const RIDE = ['甲寅', '丙辰', '戊辰', '庚辰', '壬戌'];
const RIGUI = ['丁酉', '丁亥', '癸巳', '癸卯'];
const LIUXIU = ['丙午', '丁未', '戊子', '戊午', '己丑', '己未'];
const SHIE_DABAI = ['甲辰', '乙巳', '丙申', '丁亥', '戊戌', '己丑', '庚辰', '辛巳', '壬申', '癸亥'];
const YINCHA_YANGCUO = ['丙子', '丁丑', '戊寅', '辛卯', '壬辰', '癸巳', '丙午', '丁未', '戊申', '辛酉', '壬戌', '癸亥'];
// 天赦日：春戊寅、夏甲午、秋戊申、冬甲子
const TIAN_SHE = { 春: '戊寅', 夏: '甲午', 秋: '戊申', 冬: '甲子' };
// 四废日：春庚申辛酉、夏壬子癸亥、秋甲寅乙卯、冬丙午丁巳
const SIFEI = { 春: ['庚申', '辛酉'], 夏: ['壬子', '癸亥'], 秋: ['甲寅', '乙卯'], 冬: ['丙午', '丁巳'] };
// 童子煞：春秋生见寅子，冬夏生见卯未辰
const TONGZI = { 春: ['寅', '子'], 秋: ['寅', '子'], 夏: ['卯', '未', '辰'], 冬: ['卯', '未', '辰'] };
// 三奇贵人（须依序相连）
const SANQI = ['甲戊庚', '乙丙丁', '壬癸辛'];
// 金神：时柱见之
const JINSHEN = ['乙丑', '己巳', '癸酉'];

// ── 规则工厂 ────────────────────────────────────────────────────

/** 天干查支：天乙、太极、文昌、福星、天官、国印、天厨、禄神、羊刃、飞刃、金舆、流霞 */
function byStem(name, cat, luck, rule, table, refs = ['day']) {
  return {
    name, cat, luck, rule, refs, refKind: 'stem',
    targets: (ctx, ref) => (table[ctx.pillars[ref].stem] || []).map(T),
  };
}

/** 三合星查支：将星、华盖、驿马、桃花、劫煞、灾煞、亡神（年支、日支双查） */
function byTrio(name, cat, luck, rule, table, refs = ['year', 'day']) {
  return {
    name, cat, luck, rule, refs, refKind: 'branch',
    targets: (ctx, ref) => {
      const k = trioKey(ctx.pillars[ref].branch);
      return k && table[k] ? table[k].map(T) : [];
    },
  };
}

/** 按年支（或其它单柱地支）查支，用于红鸾、天喜、孤辰、寡宿 */
function byRefBranch(name, cat, luck, rule, fn, ref = 'year') {
  return {
    name, cat, luck, rule, refs: [ref], refKind: 'branch', viaLabel: BRANCH_VIA[ref],
    targets: (ctx) => fn(ctx),
  };
}

/** 月支查：天德、月德、月德合、德秀、天医、天赦、四废、童子煞 */
function byMonth(name, cat, luck, rule, fn, slots) {
  return { name, cat, luck, rule, refs: ['month'], refKind: 'branch', viaLabel: '月支', slots, targets: (ctx) => fn(ctx) };
}

/** 整柱（日柱/时柱）比对 */
function byPillarGz(name, cat, luck, rule, list, slot = 'day') {
  return {
    name, cat, luck, rule, refs: [slot], refKind: 'branch', viaLabel: PILLAR_LABEL[slot], slots: [slot],
    targets: (ctx, ref) => (list.includes(ctx.pillars[ref].ganzhi) ? [GZ(ctx.pillars[ref].ganzhi)] : []),
  };
}

// ── 规则集（顺序即同柱内显示顺序：先贵人文星，后凶煞）────────────────

const RULES = [
  // 贵人
  byStem('天乙贵人', '贵人', 'good',
    '甲戊庚见丑未，乙己见子申，丙丁见亥酉，辛见午寅，壬癸见卯巳（年干、日干查四支）',
    TIANYI, ['year', 'day']),
  byStem('太极贵人', '贵人', 'good',
    '甲乙见子午，丙丁见卯酉，戊己见辰戌丑未，庚辛见寅亥，壬癸见巳申（年干、日干查四支）',
    TAIJI, ['year', 'day']),
  byMonth('天德贵人', '贵人', 'good',
    '正月丁、二月申、三月壬、四月辛、五月亥、六月甲、七月癸、八月寅、九月丙、十月乙、冬月巳、腊月庚（月支查干或支）',
    (ctx) => {
      const ch = TIANDE[ctx.pillars.month.branch];
      if (!ch) return [];
      return STEMS_LIST.includes(ch) ? [S(ch)] : [T(ch)];
    }),
  byMonth('月德贵人', '贵人', 'good',
    '寅午戌月见丙，申子辰月见壬，亥卯未月见甲，巳酉丑月见庚（月支查天干）',
    (ctx) => {
      const k = trioKey(ctx.pillars.month.branch);
      return k && YUEDE[k] ? [S(YUEDE[k])] : [];
    }),
  byMonth('月德合', '贵人', 'good',
    '月德之合干：丙见辛、壬见丁、甲见己、庚见乙（月支定月德后查天干）',
    (ctx) => {
      const k = trioKey(ctx.pillars.month.branch);
      const he = k && YUEDE[k] ? YUEDE_HE[YUEDE[k]] : null;
      return he ? [S(he)] : [];
    }),
  byStem('福星贵人', '贵人', 'good',
    '甲丙见寅子，乙癸见卯丑，丁见酉、戊见申、己见未、庚见午、辛见巳、壬见辰（年干、日干查四支）',
    FUXING, ['year', 'day']),
  byStem('天官贵人', '贵人', 'good',
    '甲未、乙辰、丙巳、丁酉、戊戌、己卯、庚亥、辛申、壬午、癸寅（年干、日干查四支；此表流派有异）',
    TIANGUAN, ['year', 'day']),
  byStem('国印贵人', '贵人', 'good',
    '甲戌、乙亥、丙丑、丁寅、戊丑、己寅、庚辰、辛巳、壬未、癸申（年干、日干查四支）',
    GUOYIN, ['year', 'day']),
  byStem('天厨贵人', '贵人', 'good',
    '食神之禄：甲巳、乙午、丙巳、丁午、戊申、己酉、庚亥、辛子、壬寅、癸卯（日干查四支）',
    TIANCHU, ['day']),
  byMonth('天医', '贵人', 'good',
    '月支退一位：寅月见丑、卯月见寅……丑月见子（月支查四支）',
    (ctx) => {
      const ch = TIANYI_MED[ctx.pillars.month.branch];
      return ch ? [T(ch)] : [];
    }),

  // 文星
  byStem('文昌贵人', '文星', 'good',
    '甲巳、乙午、丙申、丁酉、戊申、己酉、庚亥、辛子、壬寅、癸卯（年干、日干查四支）',
    WENCHANG, ['year', 'day']),
  byMonth('德秀贵人', '文星', 'good',
    '寅午戌月德丙丁、秀戊癸；申子辰月德壬癸戊己、秀丙辛甲己；巳酉丑月德庚辛、秀乙庚；亥卯未月德甲乙、秀丁壬（月支查天干）',
    (ctx) => {
      const k = trioKey(ctx.pillars.month.branch);
      return k && DEXIU[k] ? DEXIU[k].map(S) : [];
    }),

  // 婚姻
  byTrio('桃花', '婚姻', 'neutral',
    '寅午戌见卯、申子辰见酉、巳酉丑见午、亥卯未见子（年支、日支双查）',
    TAOHUA),
  byRefBranch('红鸾', '婚姻', 'good',
    '卯起子逆数：子见卯、丑见寅、寅见丑、卯见子……（年支查四支）',
    (ctx) => {
      const idx = BRANCHES.indexOf(ctx.pillars.year.branch);
      return [T(BRANCHES[((3 - idx) % 12 + 12) % 12])];
    }),
  byRefBranch('天喜', '婚姻', 'good',
    '红鸾对冲之位：子见酉、丑见申、寅见未……（年支查四支）',
    (ctx) => {
      const idx = BRANCHES.indexOf(ctx.pillars.year.branch);
      const luan = ((3 - idx) % 12 + 12) % 12;
      return [T(BRANCHES[(luan + 6) % 12])];
    }),
  byRefBranch('孤辰', '婚姻', 'bad',
    '亥子丑年见寅、寅卯辰年见巳、巳午未年见申、申酉戌年见亥（年支查四支）',
    (ctx) => {
      const k = fangjuKey(ctx.pillars.year.branch);
      return k ? [T(FANGJU[k][0])] : [];
    }),
  byRefBranch('寡宿', '婚姻', 'bad',
    '亥子丑年见戌、寅卯辰年见丑、巳午未年见辰、申酉戌年见未（年支查四支）',
    (ctx) => {
      const k = fangjuKey(ctx.pillars.year.branch);
      return k ? [T(FANGJU[k][1])] : [];
    }),
  byStem('金舆', '婚姻', 'good',
    '禄前二位：甲龙乙蛇丙戊羊、丁己申宫庚犬乡、辛猪壬牛癸虎位（日干查四支）',
    JINYU, ['day']),

  // 性情
  byTrio('华盖', '性情', 'neutral',
    '寅午戌见戌、申子辰见辰、巳酉丑见丑、亥卯未见未（年支、日支双查）',
    HUAGAI),
  byStem('羊刃', '性情', 'bad',
    '禄前一位：甲卯、乙辰、丙戊午、丁己未、庚酉、辛戌、壬子、癸丑（日干查四支；阳干论刃为主）',
    YANGREN, ['day']),
  byStem('飞刃', '性情', 'bad',
    '羊刃六冲：甲酉、乙戌、丙子、丁丑、戊子、己丑、庚卯、辛辰、壬午、癸未（日干查四支）',
    FEIREN, ['day']),
  byPillarGz('魁罡', '性情', 'neutral',
    '日柱庚辰、庚戌、壬辰、戊戌（日柱见之）',
    KUIGANG),
  byMonth('童子煞', '性情', 'neutral',
    '春秋生见寅子，冬夏生见卯未辰（取季节口诀，查日支、时支；另有纳音五行一法，流派多歧，仅作参考）',
    (ctx) => {
      const season = SEASON[ctx.pillars.month.branch];
      const list = season && TONGZI[season];
      return list ? list.map(T) : [];
    }, ['day', 'hour']),
  byPillarGz('六秀日', '性情', 'good',
    '日柱丙午、丁未、戊子、戊午、己丑、己未（日柱见之）',
    LIUXIU),
  byPillarGz('日德', '性情', 'good',
    '日柱甲寅、丙辰、戊辰、庚辰、壬戌（日柱见之）',
    RIDE),
  byPillarGz('日贵', '性情', 'good',
    '日柱丁酉、丁亥、癸巳、癸卯（日柱见之）',
    RIGUI),

  // 事业
  byStem('禄神', '事业', 'good',
    '甲寅、乙卯、丙戊巳、丁己午、庚申、辛酉、壬亥、癸子（日干查四支）',
    LUSHEN, ['day']),
  byTrio('将星', '事业', 'good',
    '寅午戌见午、申子辰见子、巳酉丑见酉、亥卯未见卯（年支、日支双查）',
    JIANGXING),
  byTrio('驿马', '事业', 'neutral',
    '寅午戌见申、申子辰见寅、巳酉丑见亥、亥卯未见巳（年支、日支双查）',
    YIMA),

  // 凶煞
  byTrio('劫煞', '凶煞', 'bad',
    '寅午戌见亥、申子辰见巳、巳酉丑见寅、亥卯未见申（年支、日支双查）',
    JIESHA),
  byTrio('灾煞', '凶煞', 'bad',
    '寅午戌见子、申子辰见午、巳酉丑见卯、亥卯未见酉（年支、日支双查）',
    ZAISHA),
  byTrio('亡神', '凶煞', 'bad',
    '寅午戌见巳、申子辰见亥、巳酉丑见申、亥卯未见寅（年支、日支双查）',
    WANGSHEN),
  {
    name: '空亡', cat: '凶煞', luck: 'bad',
    rule: '以日柱所在旬的空亡反查各柱地支（日柱旬空）',
    refs: ['day'], refKind: 'branch', viaLabel: '日柱旬空',
    targets: (ctx) => (ctx.kongwang || []).map(T),
  },
  byPillarGz('十恶大败', '凶煞', 'bad',
    '日柱甲辰、乙巳、丙申、丁亥、戊戌、己丑、庚辰、辛巳、壬申、癸亥（日柱见之）',
    SHIE_DABAI),
  byPillarGz('阴差阳错', '凶煞', 'bad',
    '日柱丙子、丁丑、戊寅、辛卯、壬辰、癸巳、丙午、丁未、戊申、辛酉、壬戌、癸亥（日柱见之）',
    YINCHA_YANGCUO),
  byMonth('四废日', '凶煞', 'bad',
    '春庚申辛酉、夏壬子癸亥、秋甲寅乙卯、冬丙午丁巳（月支定季节查日柱）',
    (ctx) => {
      const season = SEASON[ctx.pillars.month.branch];
      const gz = ctx.pillars.day.ganzhi;
      return season && SIFEI[season].includes(gz) ? [GZ(gz)] : [];
    }, ['day']),
  byStem('流霞', '凶煞', 'bad',
    '甲酉、乙戌、丙未、丁申、戊巳、己午、庚辰、辛卯、壬亥、癸寅（日干查四支；通行表）',
    LIUXIA, ['day']),

  // 格局
  byMonth('天赦日', '格局', 'good',
    '春戊寅、夏甲午、秋戊申、冬甲子（月支定季节查日柱）',
    (ctx) => {
      const season = SEASON[ctx.pillars.month.branch];
      const gz = ctx.pillars.day.ganzhi;
      return season && TIAN_SHE[season] === gz ? [GZ(gz)] : [];
    }, ['day']),
  byPillarGz('金神', '格局', 'neutral',
    '时柱乙丑、己巳、癸酉（时柱见之；严格成格另需日主身旺，此仅记星）',
    JINSHEN, 'hour'),
  {
    name: '天罗', cat: '凶煞', luck: 'bad',
    rule: '四支见戌、亥俱全（戌亥为天罗）',
    custom: (ctx) => chartPattern(ctx, ['戌', '亥']),
  },
  {
    name: '地网', cat: '凶煞', luck: 'bad',
    rule: '四支见辰、巳俱全（辰巳为地网）',
    custom: (ctx) => chartPattern(ctx, ['辰', '巳']),
  },
  {
    name: '三奇贵人', cat: '格局', luck: 'good',
    rule: '年月日或月日时天干依序为甲戊庚（天上）、乙丙丁（地下）、壬癸辛（人中）',
    custom: (ctx) => {
      const out = [];
      for (const trio of [['year', 'month', 'day'], ['month', 'day', 'hour']]) {
        const gz = trio.map((k) => ctx.pillars[k].stem).join('');
        if (SANQI.includes(gz)) out.push({ pillars: trio.slice(), via: '三柱天干', target: gz });
      }
      return out;
    },
  },
];

/** 四支俱全即命中（天罗地网） */
function chartPattern(ctx, branches) {
  const keys = PILLAR_KEYS.filter((k) => branches.includes(ctx.pillars[k].branch));
  if (keys.length < branches.length) return [];
  return [{ pillars: keys, via: '四支', target: branches.join('') }];
}

// ── 执行 ────────────────────────────────────────────────────────

function matches(pl, t) {
  if (t.kind === 'stem') return pl.stem === t.ch;
  if (t.kind === 'branch') return pl.branch === t.ch;
  return pl.ganzhi === t.ch;
}

function runRule(r, ctx) {
  if (r.custom) return r.custom(ctx);
  const hits = [];
  for (const ref of r.refs) {
    const targets = r.targets(ctx, ref) || [];
    if (!targets.length) continue;
    const via = r.viaLabel || (r.refKind === 'stem' ? STEM_VIA : BRANCH_VIA)[ref];
    for (const key of (r.slots || PILLAR_KEYS)) {
      const pl = ctx.pillars[key];
      for (const t of targets) {
        if (matches(pl, t)) hits.push({ pillars: [key], via, target: t.ch });
      }
    }
  }
  return hits;
}

/**
 * 计算八字神煞
 * @param {object} pillars { year, month, day, hour }，每柱需有 stem/branch/ganzhi
 * @param {string[]} kongwang 日柱旬空的两个地支
 * @returns {{ detail: object, groups: array, names: string[], count: number }}
 *   detail[key] = [{ name, cat, luck, via, target, rule }]
 *   groups = [{ cat, items: [{ name, luck, pillars, via, target, rule }] }]
 */
function computeBaziShensha(pillars, kongwang = []) {
  const ctx = { pillars, kongwang };
  const items = [];
  for (const r of RULES) {
    const hits = runRule(r, ctx);
    if (!hits.length) continue;
    const entry = { name: r.name, cat: r.cat, luck: r.luck, rule: r.rule, pillars: [], via: new Set(), target: new Set() };
    for (const h of hits) {
      for (const k of h.pillars) if (!entry.pillars.includes(k)) entry.pillars.push(k);
      if (h.via) entry.via.add(h.via);
      if (h.target) entry.target.add(h.target);
    }
    entry.pillars.sort((a, b) => PILLAR_KEYS.indexOf(a) - PILLAR_KEYS.indexOf(b));
    items.push(entry);
  }
  // 同柱内按类别归置，类别内保持规则声明顺序
  items.sort((a, b) => CATEGORY_ORDER.indexOf(a.cat) - CATEGORY_ORDER.indexOf(b.cat));

  const detail = { year: [], month: [], day: [], hour: [] };
  for (const it of items) {
    for (const k of it.pillars) {
      detail[k].push({
        name: it.name,
        cat: it.cat,
        luck: it.luck,
        via: [...it.via].join('、'),
        target: [...it.target].join('、'),
        rule: it.rule,
      });
    }
  }

  const groups = [];
  for (const cat of CATEGORY_ORDER) {
    const list = items.filter((i) => i.cat === cat);
    if (!list.length) continue;
    groups.push({
      cat,
      items: list.map((i) => ({
        name: i.name,
        cat: i.cat,
        luck: i.luck,
        pillars: i.pillars.slice(),
        via: [...i.via].join('、'),
        target: [...i.target].join('、'),
        rule: i.rule,
      })),
    });
  }

  return {
    detail,
    groups,
    names: items.map((i) => i.name),
    count: items.reduce((n, i) => n + i.pillars.length, 0),
  };
}

/** 单个神煞的查法速查（供 UI 悬浮提示） */
const RULE_TABLE = RULES.reduce((acc, r) => { acc[r.name] = { cat: r.cat, luck: r.luck, rule: r.rule }; return acc; }, {});

return { PILLAR_KEYS, PILLAR_LABEL, CATEGORY_ORDER, computeBaziShensha, RULE_TABLE };
})();

__mods.geju = (function () {
// 八字格局、用神与行运评分
//
// 定位：在 bazi.js 算出四柱、五行、旺衰之后，给出
//   1) 格局（月令格 + 特殊格 + 常见组合）；
//   2) 用神 / 喜忌（扶抑为主，调候作简化提示）；
//   3) 大运、流年的吉凶倾向评分。
// 取舍：格局派别差异极大，这里只给「规则可复核」的判定，evidence 写明依据；
// 调候未做穷通宝鉴 120 条全表，只按寒暖燥湿给方向，并在 detail 里注明。

const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const STEM_ELEMENT = {
  甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土',
  己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水',
};
const BRANCH_ELEMENT = {
  子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火',
  午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水',
};
const GENERATES = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const OVERCOMES = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };
const HIDDEN = {
  子: ['癸'], 丑: ['己', '癸', '辛'], 寅: ['甲', '丙', '戊'], 卯: ['乙'],
  辰: ['戊', '乙', '癸'], 巳: ['丙', '戊', '庚'], 午: ['丁', '己'], 未: ['己', '丁', '乙'],
  申: ['庚', '壬', '戊'], 酉: ['辛'], 戌: ['戊', '辛', '丁'], 亥: ['壬', '甲'],
};
const HIDDEN_W = [1, 0.5, 0.3];

const LUSHEN_BRANCH = { 甲: '寅', 乙: '卯', 丙: '巳', 丁: '午', 戊: '巳', 己: '午', 庚: '申', 辛: '酉', 壬: '亥', 癸: '子' };
const YANGREN_BRANCH = { 甲: '卯', 乙: '辰', 丙: '午', 丁: '未', 戊: '午', 己: '未', 庚: '酉', 辛: '戌', 壬: '子', 癸: '丑' };
const STEM_HE = { 甲己: '土', 乙庚: '金', 丙辛: '水', 丁壬: '木', 戊癸: '火' };

const isYangStem = (s) => STEMS.indexOf(s) % 2 === 0;
const ELEMENTS = ['木', '火', '土', '金', '水'];

/** 十神：以日干为我（与 bazi.js 同规则） */
function tenGod(dayStem, otherStem) {
  const me = STEM_ELEMENT[dayStem];
  const it = STEM_ELEMENT[otherStem];
  const same = isYangStem(dayStem) === isYangStem(otherStem);
  if (me === it) return same ? '比肩' : '劫财';
  if (GENERATES[me] === it) return same ? '食神' : '伤官';
  if (OVERCOMES[me] === it) return same ? '偏财' : '正财';
  if (OVERCOMES[it] === me) return same ? '七杀' : '正官';
  if (GENERATES[it] === me) return same ? '偏印' : '正印';
  return '?';
}

const godGroups = {
  比劫: ['比肩', '劫财'],
  食伤: ['食神', '伤官'],
  财: ['正财', '偏财'],
  官杀: ['正官', '七杀'],
  印: ['正印', '偏印'],
};

/** 全局十神权重：四柱天干 1.0，地支藏干按本气 1 / 中气 0.5 / 余气 0.3 */
function godStats(pillars, dayStem) {
  const total = { 比劫: 0, 食伤: 0, 财: 0, 官杀: 0, 印: 0 };
  const byGod = { 比肩: 0, 劫财: 0, 食神: 0, 伤官: 0, 正财: 0, 偏财: 0, 正官: 0, 七杀: 0, 正印: 0, 偏印: 0 };
  const add = (stem, w) => {
    const god = tenGod(dayStem, stem);
    const g = Object.keys(godGroups).find((k) => godGroups[k].includes(god));
    if (g) total[g] += w;
    if (byGod[god] !== undefined) byGod[god] += w;
  };
  for (const key of ['year', 'month', 'day', 'hour']) {
    add(pillars[key].stem, key === 'day' ? 0.6 : 1);
    (HIDDEN[pillars[key].branch] || []).forEach((h, i) => add(h, HIDDEN_W[i] ?? 0.1));
  }
  for (const k of Object.keys(total)) total[k] = Math.round(total[k] * 10) / 10;
  for (const k of Object.keys(byGod)) byGod[k] = Math.round(byGod[k] * 10) / 10;
  return { groups: total, byGod };
}

/** 用神所属五行：生我 / 同我 / 我生 / 我克 / 克我 */
function elementRoles(dayStem) {
  const me = STEM_ELEMENT[dayStem];
  const inMe = ELEMENTS.find((e) => GENERATES[e] === me);
  const guan = ELEMENTS.find((e) => OVERCOMES[e] === me);
  return { me, inMe, shi: GENERATES[me], cai: OVERCOMES[me], guan };
}

// ── 月令格 ───────────────────────────────────────────────────

function monthPattern(pillars, dayStem, monthBranch) {
  const hidden = HIDDEN[monthBranch] || [];
  const cands = hidden.map((stem, i) => ({
    stem,
    god: tenGod(dayStem, stem),
    pos: ['本气', '中气', '余气'][i],
    w: HIDDEN_W[i] ?? 0.1,
  }));
  const others = ['year', 'month', 'hour'];
  const exposedKey = others.find((k) => cands.some((c) => c.stem === pillars[k].stem));
  const base = cands[0];
  const use = exposedKey ? cands.find((c) => c.stem === pillars[exposedKey].stem) : base;
  const exposedPos = exposedKey ? { year: '年', month: '月', hour: '时' }[exposedKey] : null;

  if (base.god === '比肩') {
    return {
      name: '建禄格',
      kind: '月令格',
      evidence: `月令${monthBranch}为日干${dayStem}之禄（本气${base.stem}比肩），身坐禄地`,
    };
  }
  if (base.god === '劫财') {
    if (YANGREN_BRANCH[dayStem] === monthBranch) {
      return {
        name: isYangStem(dayStem) ? '阳刃格' : '月刃格',
        kind: '月令格',
        evidence: `月令${monthBranch}为日干${dayStem}之刃（本气${base.stem}劫财）${isYangStem(dayStem) ? '' : '，阴干统称月刃'}`,
      };
    }
    return { name: '月劫格', kind: '月令格', evidence: `月令${monthBranch}本气${base.stem}为劫财` };
  }
  const name = `${use.god}格`;
  const ex = exposedKey
    ? `月令${monthBranch}藏${hidden.join('')}，${use.pos}${use.stem}（${use.god}）透于${exposedPos}干`
    : `月令${monthBranch}藏${hidden.join('')}，本气${base.stem}（${base.god}）未透干，以月令本气取格`;
  return { name, kind: '月令格', evidence: ex };
}

// ── 特殊格 / 组合 ────────────────────────────────────────────

const ZHUANWANG = { 木: '曲直格', 火: '炎上格', 土: '稼穑格', 金: '从革格', 水: '润下格' };
const CONG = { 财: '从财格', 官杀: '从杀格', 食伤: '从儿格', 印: '从强格', 比劫: '从强格' };

function specialPatterns(pillars, dayStem, monthBranch, strength, wuxing, gods) {
  const out = [];
  const roles = elementRoles(dayStem);
  const me = roles.me;
  const mine = wuxing[me] ?? 0;
  const yin = wuxing[roles.inMe] ?? 0;
  const cai = wuxing[roles.cai] ?? 0;
  const guan = wuxing[roles.guan] ?? 0;
  const shi = wuxing[roles.shi] ?? 0;

  // 化气格：日干与年/月/时干五合，且月令助化神
  for (const key of ['year', 'month', 'hour']) {
    const other = pillars[key].stem;
    const target = STEM_HE[dayStem + other] || STEM_HE[other + dayStem];
    if (!target) continue;
    const monthEl = BRANCH_ELEMENT[monthBranch];
    const supports = monthEl === target || GENERATES[monthEl] === target;
    if (!supports) continue;
    out.push({
      name: `${target === '土' ? '化土格' : `化${target}格`}`,
      kind: '化气格',
      evidence: `日干${dayStem}与${['年', '月', '时'][['year', 'month', 'hour'].indexOf(key)]}干${other}合化${target}，月令${monthBranch}${monthEl}${monthEl === target ? '同化神' : '生助化神'}；化气格须全局无争合妒合才算真，此处仅列条件` ,
    });
    break;
  }

  // 专旺：日主之气独旺，官杀、财星皆弱
  if ((strength.level === '身强' || strength.level === '偏强') && mine + yin >= 5 && guan <= 1.2 && cai <= 1.8) {
    out.push({
      name: ZHUANWANG[me],
      kind: '专旺格',
      evidence: `日主${me}得${mine + yin}分（同类+印），官杀${guan}、财${cai}皆弱，成${ZHUANWANG[me]}之势`,
    });
  }

  // 从格：日主无根而被他神主导
  const hasRoot = ['year', 'month', 'day', 'hour'].some((key) =>
    (HIDDEN[pillars[key].branch] || []).some((h) => STEM_ELEMENT[h] === me || GENERATES[STEM_ELEMENT[h]] === me));
  if (!hasRoot && (strength.level === '身弱' || strength.level === '偏弱')) {
    const main = Object.entries({ 财: cai, 官杀: guan, 食伤: shi, 印: yin })
      .sort((a, b) => b[1] - a[1])[0];
    if (main[1] >= 2.5) {
      out.push({
        name: CONG[main[0]],
        kind: '从格',
        evidence: `日主无根（四支藏干无同类与印），${main[0]}占 ${main[1]} 分最旺，从${main[0]}之势`,
      });
    }
  }

  // 常见组合（只报事实并列，不作吉凶断语）
  const byGod = gods.byGod || {};
  const g = gods.groups || gods;
  const hasGod = (name) => (byGod[name] ?? 0) >= 0.5;
  const yinGods = (byGod.正印 ?? 0) + (byGod.偏印 ?? 0);
  const combos = [
    ['官印相生', hasGod('正官') && yinGods >= 0.5, `正官与印并见，官生印而护身`],
    ['杀印相生', hasGod('七杀') && yinGods >= 0.5 && (byGod.七杀 ?? 0) > (byGod.正官 ?? 0), `七杀与印并见，杀印相生`],
    ['食伤生财', (g.食伤 ?? 0) >= 0.6 && (g.财 ?? 0) >= 0.6, `食伤${g.食伤}+财${g.财}，食伤生财`],
    ['财官相生', (g.财 ?? 0) >= 0.6 && (g.官杀 ?? 0) >= 0.6, `财${g.财}+官杀${g.官杀}，财生官`],
    ['伤官配印', hasGod('伤官') && yinGods >= 0.5 && (g.财 ?? 0) <= 1, `伤官与印并见，伤官配印`],
    ['伤官见官', hasGod('伤官') && hasGod('正官'), `伤官与正官并见（伤官见官，为祸百端之说）`],
    ['羊刃驾杀', (g.官杀 ?? 0) >= 1 && YANGREN_BRANCH[dayStem] === monthBranch, `月令为刃，又有七杀${g.官杀}，刃杀相制`],
  ];
  for (const [name, cond, evidence] of combos) if (cond) out.push({ name, kind: '组合', evidence });
  return out;
}

// ── 用神 / 喜忌 ──────────────────────────────────────────────

const TIAOHOU = {
  亥: ['火', '冬月寒水当令，最喜火暖局'],
  子: ['火', '仲冬水旺，最喜火暖局'],
  丑: ['火', '季冬湿寒，喜火解冻'],
  巳: ['水', '初夏火旺，喜水制衡'],
  午: ['水', '仲夏火炎，最喜水调候'],
  未: ['水', '季夏燥土，喜水润局'],
  寅: ['火', '初春尚寒，得火而发'],
  卯: ['火', '仲春木旺，喜火吐秀'],
  辰: ['金', '季春湿土，喜金水疏泄'],
  申: ['火', '初秋金旺，喜火炼金'],
  酉: ['火', '仲秋金锐，喜火制'],
  戌: ['水', '季秋燥土，喜水润泽'],
};

function yongshenOf(dayStem, monthBranch, strength, wuxing) {
  const roles = elementRoles(dayStem);
  const me = roles.me;
  const weak = strength.level === '身弱' || strength.level === '偏弱';
  const strong = strength.level === '身强' || strength.level === '偏强';

  const favor = weak ? [roles.inMe, me] : strong ? [roles.shi, roles.cai, roles.guan] : [roles.inMe, me, roles.shi];
  const avoid = weak ? [roles.shi, roles.cai, roles.guan] : strong ? [me, roles.inMe] : [roles.guan, roles.cai];
  const favorableTenGods = weak ? ['正印', '偏印', '比肩', '劫财'] : strong
    ? ['食神', '伤官', '正财', '偏财', '正官', '七杀']
    : ['正印', '偏印', '食神', '伤官'];

  const th = TIAOHOU[monthBranch];
  const tiaohou = th ? { element: th[0], note: th[1] } : null;

  const roleName = (el) => (el === me ? '比劫' : el === roles.inMe ? '印'
    : el === roles.shi ? '食伤' : el === roles.cai ? '财' : '官杀');
  const detail = [
    `日主${dayStem}${me}，${strength.level}（${strength.score} 分）：`,
    weak
      ? `喜${roles.inMe}（印）生身、${me}（比劫）帮身；忌${roles.shi}（食伤）泄、${roles.cai}（财）耗、${roles.guan}（官杀）克。`
      : strong
        ? `喜${roles.shi}（食伤）泄秀、${roles.cai}（财）耗、${roles.guan}（官杀）制；忌${me}（比劫）与${roles.inMe}（印）再助。`
        : '身中和，先取调候与通关，喜忌随大运流年动态变化。',
    tiaohou ? `调候（简化）：${tiaohou.note}，宜${tiaohou.element}。` : '',
    '扶抑法为主；调候未用穷通宝鉴全表，各派取用不同，仅作方向提示。',
  ].filter(Boolean).join('');

  return {
    method: '扶抑为主 + 调候简化提示',
    level: strength.level,
    favor,
    avoid,
    favorRoles: favor.map(roleName),
    avoidRoles: avoid.map(roleName),
    favorTenGods: favorableTenGods,
    avoidTenGods: weak
      ? ['食神', '伤官', '正财', '偏财', '正官', '七杀']
      : strong
        ? ['比肩', '劫财', '正印', '偏印']
        : ['正官', '七杀', '正财', '偏财'],
    tiaohou,
    detail,
  };
}

// ── 行运评分 ────────────────────────────────────────────────

const TIERS = [
  [1.3, '大吉'],
  [0.6, '吉'],
  [-0.6, '平'],
  [-1.3, '忌'],
  [-Infinity, '大忌'],
];

function scoreLuck(ganzhi, frame) {
  const ys = frame.yongshen;
  const stem = ganzhi[0];
  const branch = ganzhi[1];
  const stemEl = STEM_ELEMENT[stem];
  const branchEl = BRANCH_ELEMENT[branch];
  const scoreEl = (el) => {
    let s = 0;
    if (ys.favor.includes(el)) s += 1;
    if (ys.avoid.includes(el)) s -= 1;
    if (ys.tiaohou && el === ys.tiaohou.element) s += 0.4;
    return s;
  };
  let score = scoreEl(stemEl) * 1.0 + scoreEl(branchEl) * 0.8;
  for (const h of (HIDDEN[branch] || []).slice(1)) {
    score += scoreEl(STEM_ELEMENT[h]) * 0.2;
  }
  score = Math.round(score * 10) / 10;

  const godStem = tenGod(frame.dayStem, stem);
  const bonus = ys.favorTenGods.includes(godStem) ? 0.3 : 0;
  const total = Math.round((score + bonus) * 10) / 10;

  const tier = TIERS.find(([min]) => total >= min)[1];
  const reasons = [];
  if (ys.favor.includes(stemEl)) reasons.push(`天干${stem}${stemEl}为用神`);
  else if (ys.avoid.includes(stemEl)) reasons.push(`天干${stem}${stemEl}为忌神`);
  else reasons.push(`天干${stem}${stemEl}不喜不忌`);
  if (ys.favor.includes(branchEl)) reasons.push(`地支${branch}${branchEl}助用`);
  else if (ys.avoid.includes(branchEl)) reasons.push(`地支${branch}${branchEl}助忌`);
  if (ys.tiaohou && (stemEl === ys.tiaohou.element || branchEl === ys.tiaohou.element)) {
    reasons.push(`合调候（${ys.tiaohou.element}）`);
  }
  return { ganzhi, score: total, tier, stemTenGod: godStem, reasons, note: `${godStem}运，${tier}（${total}）` };
}

// ── 对外入口 ────────────────────────────────────────────────

/**
 * @param {object} p
 * @param {object} p.pillars 四柱
 * @param {string} p.dayStem 日干
 * @param {string} p.monthBranch 月支
 * @param {object} p.strength bazi.js 的旺衰结果
 * @param {object} p.wuxing 五行分值
 */
function analyzeBaziFrame({ pillars, dayStem, monthBranch, strength, wuxing }) {
  const gods = godStats(pillars, dayStem);
  const month = monthPattern(pillars, dayStem, monthBranch);
  const special = specialPatterns(pillars, dayStem, monthBranch, strength, wuxing, gods);
  const geju = [month, ...special];
  const yongshen = yongshenOf(dayStem, monthBranch, strength, wuxing);
  return {
    geju,
    primary: month,
    primaryName: month.name,
    godStats: gods,
    yongshen,
    dayStem,
    monthBranch,
  };
}

return { tenGod, elementRoles, scoreLuck, analyzeBaziFrame };
})();

__mods.bazi = (function () {
// 四柱八字引擎
const { STEMS, BRANCHES, TERM_NAMES, ganzhiName, dayGanzhiIndex, jdToParts, partsToJd, sexagenaryIndex, termWindow, previousJie, nextJie, equationOfTime, formatJd } = __mods.calendar;
const { resolveAddress } = __mods.geo;
const { computeBaziShensha } = __mods.shensha;
const { analyzeBaziFrame, scoreLuck } = __mods.geju;

// 地支藏干（本气 / 中气 / 余气）
const HIDDEN_STEMS = {
  子: ['癸'],
  丑: ['己', '癸', '辛'],
  寅: ['甲', '丙', '戊'],
  卯: ['乙'],
  辰: ['戊', '乙', '癸'],
  巳: ['丙', '戊', '庚'],
  午: ['丁', '己'],
  未: ['己', '丁', '乙'],
  申: ['庚', '壬', '戊'],
  酉: ['辛'],
  戌: ['戊', '辛', '丁'],
  亥: ['壬', '甲'],
};

const STEM_ELEMENT = {
  甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土',
  己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水',
};

const BRANCH_ELEMENT = {
  子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火',
  午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水',
};

const GENERATES = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const OVERCOMES = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };

const isYangStem = (stem) => STEMS.indexOf(stem) % 2 === 0;

const STEM_HE = { 甲己: '土', 乙庚: '金', 丙辛: '水', 丁壬: '木', 戊癸: '火' };
const STEM_CHONG_PAIRS = ['甲庚', '乙辛', '丙壬', '丁癸'];
const BRANCH_HE = { 子丑: '土', 寅亥: '木', 卯戌: '火', 辰酉: '金', 巳申: '水', 午未: '土' };
const SANHE = { 申子辰: '水', 亥卯未: '木', 寅午戌: '火', 巳酉丑: '金' };
const SANHUI = { 寅卯辰: '木', 巳午未: '火', 申酉戌: '金', 亥子丑: '水' };
const BRANCH_CHONG = ['子午', '丑未', '寅申', '卯酉', '辰戌', '巳亥'];
const BRANCH_HAI = ['子未', '丑午', '寅巳', '卯辰', '申亥', '酉戌'];
const BRANCH_PO = ['子酉', '丑辰', '寅亥', '卯午', '巳申', '未戌'];
const XING_GROUPS = [['寅', '巳', '申'], ['丑', '戌', '未'], ['子', '卯']];

const hasPair = (list, a, b) => list.includes(a + b) || list.includes(b + a);

/** 干支关系：五合、相冲、相克；六合、三合半合、三会半会拱会、冲、害、破、刑 */
function buildRelations(pillars) {
  const stems = ['year', 'month', 'day', 'hour'].map((k) => pillars[k].stem);
  const branches = ['year', 'month', 'day', 'hour'].map((k) => pillars[k].branch);

  const stemOut = [];
  for (let i = 0; i < 4; i++) {
    for (let j = i + 1; j < 4; j++) {
      const a = stems[i];
      const b = stems[j];
      if (a === b) continue;
      const he = STEM_HE[a + b] || STEM_HE[b + a];
      if (he) { stemOut.push({ text: `${a}${b}合化${he}`, rank: 0 }); continue; }
      if (hasPair(STEM_CHONG_PAIRS, a, b)) { stemOut.push({ text: `${a}${b}相冲`, rank: 1 }); continue; }
      const ea = STEM_ELEMENT[a];
      const eb = STEM_ELEMENT[b];
      if (OVERCOMES[ea] === eb) stemOut.push({ text: `${a}克${b}`, rank: 3 });
      else if (OVERCOMES[eb] === ea) stemOut.push({ text: `${b}克${a}`, rank: 3 });
    }
  }

  const branchOut = [];
  const set = new Set(branches);
  const fullSans = [];
  for (const [k, v] of Object.entries(SANHE)) {
    if ([...k].every((c) => set.has(c))) {
      branchOut.push({ text: `${k}三合${v}`, rank: 0 });
      fullSans.push(k);
    }
  }
  const fullHuis = [];
  for (const [k, v] of Object.entries(SANHUI)) {
    if ([...k].every((c) => set.has(c))) {
      branchOut.push({ text: `${k}三会${v}`, rank: 0 });
      fullHuis.push(k);
    }
  }
  for (let i = 0; i < 4; i++) {
    for (let j = i + 1; j < 4; j++) {
      const a = branches[i];
      const b = branches[j];
      if (a === b) continue;
      const he = BRANCH_HE[a + b] || BRANCH_HE[b + a];
      const sh = Object.keys(SANHE).find((k) => k.includes(a) && k.includes(b));
      const hui = Object.keys(SANHUI).find((k) => k.includes(a) && k.includes(b));
      if (he) {
        // 六合优先，不再重复标半合/半会
        branchOut.push({ text: `${a}${b}合${he}`, rank: 0 });
      } else {
        if (sh && !fullSans.includes(sh)) {
          const mid = sh[1];
          const kind = a === mid || b === mid ? '半合' : '拱合';
          branchOut.push({ text: `${a}${b}${kind}${SANHE[sh]}`, rank: 0 });
        }
        if (hui && !fullHuis.includes(hui)) {
          const adj = Math.abs(hui.indexOf(a) - hui.indexOf(b)) === 1;
          branchOut.push({ text: `${a}${b}${adj ? '半会' : '拱会'}${SANHUI[hui]}`, rank: 0 });
        }
      }
      if (hasPair(BRANCH_CHONG, a, b)) branchOut.push({ text: `${a}${b}相冲`, rank: 1 });
      if (hasPair(BRANCH_HAI, a, b)) branchOut.push({ text: `${a}${b}相害`, rank: 2 });
      if (hasPair(BRANCH_PO, a, b)) branchOut.push({ text: `${a}${b}相破`, rank: 2 });
      for (const g of XING_GROUPS) {
        if (g.includes(a) && g.includes(b)) branchOut.push({ text: `${a}${b}相刑`, rank: 2 });
      }
    }
  }

  const uniq = (arr) => {
    const seen = new Set();
    const out = [];
    for (const x of [...arr].sort((p, q) => p.rank - q.rank)) {
      if (!seen.has(x.text)) { seen.add(x.text); out.push(x.text); }
    }
    return out;
  };
  return { stems: uniq(stemOut), branches: uniq(branchOut) };
}

/** 十神：以日干为我 */
function tenGod(dayStem, otherStem) {
  const me = STEM_ELEMENT[dayStem];
  const it = STEM_ELEMENT[otherStem];
  const samePolarity = isYangStem(dayStem) === isYangStem(otherStem);
  if (me === it) return samePolarity ? '比肩' : '劫财';
  if (GENERATES[me] === it) return samePolarity ? '食神' : '伤官';
  if (OVERCOMES[me] === it) return samePolarity ? '偏财' : '正财';
  if (OVERCOMES[it] === me) return samePolarity ? '七杀' : '正官';
  if (GENERATES[it] === me) return samePolarity ? '偏印' : '正印';
  return '?';
}

// 六十甲子纳音（每两个干支一名）
const NAYIN_NAMES = [
  '海中金', '炉中火', '大林木', '路旁土', '剑锋金',
  '山头火', '涧下水', '城头土', '白蜡金', '杨柳木',
  '泉中水', '屋上土', '霹雳火', '松柏木', '长流水',
  '沙中金', '山下火', '平地木', '壁上土', '金箔金',
  '覆灯火', '天河水', '大驿土', '钗钏金', '桑柘木',
  '大溪水', '沙中土', '天上火', '石榴木', '大海水',
];

function nayin(ganzhiIdx) {
  return NAYIN_NAMES[Math.floor((((ganzhiIdx % 60) + 60) % 60) / 2)];
}

const JIE_TO_MONTH_BRANCH = { 0: 1, 2: 2, 4: 3, 6: 4, 8: 5, 10: 6, 12: 7, 14: 8, 16: 9, 18: 10, 20: 11, 22: 0 };

function pillar(ganzhiIdx, dayStem) {
  const g = ganzhiName(ganzhiIdx);
  const hidden = HIDDEN_STEMS[g.branch];
  return {
    ganzhi: g.name,
    stem: g.stem,
    branch: g.branch,
    stemElement: STEM_ELEMENT[g.stem],
    branchElement: BRANCH_ELEMENT[g.branch],
    stemTenGod: dayStem ? tenGod(dayStem, g.stem) : null,
    hidden: hidden.map((s, i) => ({
      stem: s,
      element: STEM_ELEMENT[s],
      tenGod: dayStem ? tenGod(dayStem, s) : null,
      role: ['本气', '中气', '余气'][i] ?? '余气',
    })),
    nayin: nayin(ganzhiIdx),
  };
}

/**
 * 真太阳时修正
 * @returns {{offsetMinutes:number, jd:number, note:string}}
 */
function applyTrueSolar(jd, longitude) {
  const p = jdToParts(jd);
  if (longitude == null || Number.isNaN(longitude)) {
    return { offsetMinutes: 0, jd, note: '未提供经度，按东八区平太阳时' };
  }
  const longitudeMinutes = (longitude - 120) * 4;
  const eot = equationOfTime(p.year, p.month, p.day);
  const offset = longitudeMinutes + eot;
  return {
    offsetMinutes: Math.round(offset * 10) / 10,
    jd: jd + offset / 1440,
    note: `经度差 ${longitudeMinutes.toFixed(1)} 分 + 均时差 ${eot.toFixed(1)} 分`,
  };
}

/**
 * 排四柱八字
 * @param {object} input { year,month,day,hour,minute, gender:'male'|'female', longitude?, lateZi?:boolean, trueSolar?:boolean }
 */
function buildBazi(input) {
  const { year, month, day, hour = 0, minute = 0, gender = 'male' } = input;
  const lateZi = input.lateZi !== false;
  const useTrueSolar = input.trueSolar !== false;

  const civilJd = partsToJd({ year, month, day, hour, minute });
  // 地址 -> 经度：手填的 longitude 优先，其次按地址查表
  const geo = input.geo || (input.address ? resolveAddress(input.address) : null);
  const longitude = typeof input.longitude === 'number'
    ? input.longitude
    : (geo && typeof geo.lon === 'number' ? geo.lon : undefined);
  const solar = useTrueSolar ? applyTrueSolar(civilJd, longitude) : { offsetMinutes: 0, jd: civilJd, note: '未启用真太阳时' };
  const jd = solar.jd;

  const terms = termWindow(year);
  const prevJieTerm = previousJie(terms, jd);
  const nextJieTerm = nextJie(terms, jd);

  // 年柱：以立春为界
  const lichun = terms.find((t) => t.index === 2 && t.year === year);
  const solarYear = lichun && jd < lichun.jd ? year - 1 : year;
  const yearIdx = (((solarYear - 4) % 60) + 60) % 60;
  const yearStem = STEMS[yearIdx % 10];

  // 月柱：以「节」为界
  const monthBranchIdx = JIE_TO_MONTH_BRANCH[prevJieTerm.index];
  const yinMonthStem = ((STEMS.indexOf(yearStem) % 5) * 2 + 2) % 10;
  const monthOffset = ((monthBranchIdx - 2) % 12 + 12) % 12; // 0 = 寅月
  const monthStemIdx = (yinMonthStem + monthOffset) % 10;
  const monthIdx = sexagenaryIndex(monthStemIdx, monthBranchIdx);

  // 日柱：23:00 后是否换日
  const jdnBase = Math.floor(jd + 0.5);
  const hourOfDay = jdToParts(jd).hour;
  const jdn = lateZi && hourOfDay >= 23 ? jdnBase + 1 : jdnBase;
  const dayIdx = dayGanzhiIndex(jdn);
  const dayStem = STEMS[dayIdx % 10];

  // 时柱：五鼠遁
  const hourBranchIdx = Math.floor(((hourOfDay + 1) % 24) / 2);
  const ziHourStem = ((STEMS.indexOf(dayStem) % 5) * 2) % 10;
  const hourStemIdx = (ziHourStem + hourBranchIdx) % 10;
  const hourIdx = sexagenaryIndex(hourStemIdx, hourBranchIdx);

  const pillars = {
    year: pillar(yearIdx, dayStem),
    month: pillar(monthIdx, dayStem),
    day: pillar(dayIdx, dayStem),
    hour: pillar(hourIdx, dayStem),
  };

  // 大运
  const isYangYear = STEMS.indexOf(yearStem) % 2 === 0;
  const forward = (isYangYear && gender === 'male') || (!isYangYear && gender === 'female');
  const spanDays = forward ? nextJieTerm.jd - jd : jd - prevJieTerm.jd;
  const totalMonths = spanDays * 4; // 3 天 = 1 年 = 12 个月
  const startAgeYears = Math.floor(totalMonths / 12);
  const startAgeMonths = Math.round(totalMonths % 12);

  const dayun = [];
  for (let i = 1; i <= 8; i++) {
    const idx = (((monthIdx + (forward ? i : -i)) % 60) + 60) % 60;
    const g = ganzhiName(idx);
    dayun.push({
      step: i,
      startAge: startAgeYears + (i - 1) * 10,
      ganzhi: g.name,
      stem: g.stem,
      branch: g.branch,
      stemTenGod: tenGod(dayStem, g.stem),
      nayin: nayin(idx),
    });
  }

  // 流年（当年起 10 年）
  const thisYear = new Date().getFullYear();
  const liunian = [];
  for (let y = thisYear; y < thisYear + 10; y++) {
    const idx = (((y - 4) % 60) + 60) % 60;
    liunian.push({
      year: y,
      age: y - solarYear + 1,
      ganzhi: ganzhiName(idx).name,
      stemTenGod: tenGod(dayStem, ganzhiName(idx).stem),
    });
  }

  // 五行统计（天干 1.0；地支藏干按 本气1.0/中气0.5/余气0.3）
  const weights = [1, 0.5, 0.3];
  const wuxing = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
  for (const p of Object.values(pillars)) {
    wuxing[p.stemElement] += 1;
    p.hidden.forEach((h, i) => {
      wuxing[h.element] += weights[i] ?? 0.1;
    });
  }
  for (const k of Object.keys(wuxing)) wuxing[k] = Math.round(wuxing[k] * 10) / 10;

  // 旬空（以日柱所在旬）
  const xunStart = Math.floor(dayIdx / 10) * 10;
  const kongwang = [
    BRANCHES[(xunStart + 10) % 12],
    BRANCHES[(xunStart + 11) % 12],
  ];

  // ── 十二长生、各柱空亡、神煞 ──────────────────────────────
  const CHANGSHENG = ['长生', '沐浴', '冠带', '临官', '帝旺', '衰', '病', '死', '墓', '绝', '胎', '养'];
  const CS_START = { 甲: 11, 乙: 6, 丙: 2, 丁: 9, 戊: 2, 己: 9, 庚: 5, 辛: 0, 壬: 8, 癸: 3 };
  const isYang = (s) => STEMS.indexOf(s) % 2 === 0;

  function changsheng(stem, branch) {
    const start = CS_START[stem];
    const bi = BRANCHES.indexOf(branch);
    const step = isYang(stem) ? bi - start : start - bi;
    return CHANGSHENG[((step % 12) + 12) % 12];
  }

  function xunKong(ganzhi) {
    const idx = sexagenaryIndex(STEMS.indexOf(ganzhi[0]), BRANCHES.indexOf(ganzhi[1]));
    const start = Math.floor(idx / 10) * 10;
    return [BRANCHES[(start + 10) % 12], BRANCHES[(start + 11) % 12]];
  }

  const monthBranch = pillars.month.branch;

  // 神煞：表驱动、双查法（年干/日干、年支/日支、月支、日柱、时柱），详见 engine/shensha.js
  const shensha = computeBaziShensha(pillars, kongwang);

  for (const key of ['year', 'month', 'day', 'hour']) {
    const pl = pillars[key];
    pl.dishi = changsheng(dayStem, pl.branch);
    pl.zizuo = changsheng(pl.stem, pl.branch);
    pl.kongwang = xunKong(pl.ganzhi);
    // shensha 保持字符串数组以兼容既有 UI / 测试；明细见 shenshaDetail
    pl.shensha = shensha.detail[key].map((x) => x.name);
    pl.shenshaDetail = shensha.detail[key];
  }

  // ── 日主旺衰（月令 + 通根 + 天干帮扶，量化但规则透明）──
  const SEASON_EL = { 寅: '木', 卯: '木', 巳: '火', 午: '火', 申: '金', 酉: '金', 亥: '水', 子: '水', 辰: '土', 戌: '土', 丑: '土', 未: '土' };
  const me = STEM_ELEMENT[dayStem];
  const seasonEl = SEASON_EL[monthBranch];
  let monthW;
  let monthWord;
  if (me === seasonEl) { monthW = 3; monthWord = '旺'; }
  else if (GENERATES[seasonEl] === me) { monthW = 2; monthWord = '相'; }
  else if (GENERATES[me] === seasonEl) { monthW = 1; monthWord = '休'; }
  else if (OVERCOMES[me] === seasonEl) { monthW = 0.5; monthWord = '囚'; }
  else { monthW = 0; monthWord = '死'; }

  const HID_W = [1.2, 0.6, 0.3];
  let rootScore = 0;
  const rootBranches = [];
  for (const key of ['year', 'month', 'day', 'hour']) {
    const pl = pillars[key];
    let hit = false;
    pl.hidden.forEach((h, i) => {
      if (STEM_ELEMENT[h.stem] === me) { rootScore += HID_W[i] ?? 0.1; hit = true; }
      else if (GENERATES[STEM_ELEMENT[h.stem]] === me) { rootScore += (HID_W[i] ?? 0.1) * 0.4; hit = true; }
    });
    if (hit) rootBranches.push(pl.branch);
  }

  let helpScore = 0;
  const helpers = [];
  const drainers = [];
  for (const key of ['year', 'month', 'hour']) {
    const st = pillars[key].stem;
    const el2 = STEM_ELEMENT[st];
    if (el2 === me) { helpScore += 1; helpers.push(st); }
    else if (GENERATES[el2] === me) { helpScore += 0.8; helpers.push(st); }
    else if (OVERCOMES[el2] === me) { helpScore -= 1; drainers.push(st); }
    else if (OVERCOMES[me] === el2) { helpScore -= 0.8; drainers.push(st); }
    else { helpScore -= 0.5; drainers.push(st); }
  }

  const total = Math.round((monthW + rootScore + helpScore) * 10) / 10;
  const level = total >= 4 ? '身强' : total >= 2.5 ? '偏强' : total >= 1.5 ? '中和' : total >= 0.5 ? '偏弱' : '身弱';
  const strength = {
    level,
    score: total,
    detail: `月令${monthBranch}${seasonEl}，日主${me}${monthWord}(${monthW})；通根${rootBranches.join('') || '无'}(${rootScore.toFixed(1)})；天干帮扶${helpers.join('') || '无'}／耗泄${drainers.join('') || '无'}(${helpScore.toFixed(1)})`,
    method: '月令权重 3/2/1/0.5/0 + 地支藏干通根 + 天干帮扶，量化后分档；属简化算法，非唯一流派',
    parts: {
      season: { branch: monthBranch, element: seasonEl, word: monthWord, weight: monthW },
      roots: rootBranches,
      rootScore: Math.round(rootScore * 10) / 10,
      helpers,
      drainers,
      helpScore: Math.round(helpScore * 10) / 10,
    },
  };

  // ── 格局 / 用神 / 行运 ─────────────────────────────────────
  const frame = analyzeBaziFrame({ pillars, dayStem, monthBranch, strength, wuxing });

  // ── 大运/流年与原局的地支关系 ──
  const pairRel = (a, b) => {
    if (!a || !b || a === b) return [];
    const out = [];
    if (BRANCH_HE[a + b] || BRANCH_HE[b + a]) out.push('合');
    if (hasPair(BRANCH_CHONG, a, b)) out.push('冲');
    if (hasPair(BRANCH_HAI, a, b)) out.push('害');
    if (hasPair(BRANCH_PO, a, b)) out.push('破');
    for (const g of XING_GROUPS) if (g.includes(a) && g.includes(b)) out.push('刑');
    return out;
  };
  const natalBranches = ['year', 'month', 'day', 'hour'].map((k) => pillars[k].branch);
  const relOf = (branch) => {
    const seen = new Set();
    const out = [];
    for (const b of natalBranches) {
      for (const r of pairRel(b, branch)) {
        const t = r + b;
        if (!seen.has(t)) { seen.add(t); out.push(t); }
      }
    }
    return out;
  };
  for (const d of dayun) {
    d.relations = relOf(d.branch);
    d.luck = scoreLuck(d.ganzhi, frame);
  }
  for (const l of liunian) {
    l.relations = relOf(l.ganzhi[1]);
    l.luck = scoreLuck(l.ganzhi, frame);
  }

  const p = jdToParts(jd);

  return {
    system: 'bazi',
    relations: buildRelations(pillars),
    input: {
      civil: { year, month, day, hour, minute },
      gender,
      longitude: longitude ?? null,
      address: input.address || null,
      geo,
      lateZi,
      trueSolar: useTrueSolar,
    },
    solarTime: {
      civilText: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      trueSolarText: formatJd(jd),
      offsetMinutes: solar.offsetMinutes,
      note: solar.note,
      lunarYearForPillar: solarYear,
    },
    jieqi: {
      previous: { name: prevJieTerm.name, time: formatJd(prevJieTerm.jd) },
      next: { name: nextJieTerm.name, time: formatJd(nextJieTerm.jd) },
      // 出生时刻距「节」不足 15 分钟时提示复核：节气时刻本身有分钟级误差
      nearBoundaryMinutes: Math.round(Math.min(jd - prevJieTerm.jd, nextJieTerm.jd - jd) * 1440),
    },
    pillars,
    dayMaster: { stem: dayStem, element: STEM_ELEMENT[dayStem], yinYang: isYangStem(dayStem) ? '阳' : '阴' },
    wuxing,
    kongwang,
    shensha,
    dayun: {
      direction: forward ? '顺行' : '逆行',
      rule: `${isYangYear ? '阳' : '阴'}年${gender === 'male' ? '男' : '女'}${forward ? '顺排' : '逆排'}`,
      startAge: { years: startAgeYears, months: startAgeMonths },
      toNextJieDays: Math.round(spanDays * 100) / 100,
      list: dayun,
    },
    strength,
    frame,
    liunian,
  };
}

return { HIDDEN_STEMS, STEM_ELEMENT, BRANCH_ELEMENT, buildRelations, tenGod, nayin, applyTrueSolar, buildBazi };
})();

__mods.liuyao = (function () {
// 六爻（纳甲）引擎：摇卦、装卦、六亲、六神、世应、变卦
const { STEMS, BRANCHES, toJDN, ganzhiName, dayGanzhiIndex } = __mods.calendar;

// 八卦三位（自下而上，1 = 阳）
const TRIGRAM_BITS = {
  乾: [1, 1, 1], 兑: [1, 1, 0], 离: [1, 0, 1], 震: [1, 0, 0],
  巽: [0, 1, 1], 坎: [0, 1, 0], 艮: [0, 0, 1], 坤: [0, 0, 0],
};
// 位值 = b0 + 2b1 + 4b2
const TRIGRAM_BY_VALUE = ['坤', '震', '坎', '兑', '艮', '离', '巽', '乾'];

const bitsValue = (bits) => bits[0] + 2 * bits[1] + 4 * bits[2];

// 京房八宫：每宫八卦次序 = 本宫、一世…五世、游魂、归魂
const PALACE_NAMES = {
  乾: ['乾为天', '天风姤', '天山遁', '天地否', '风地观', '山地剥', '火地晋', '火天大有'],
  兑: ['兑为泽', '泽水困', '泽地萃', '泽山咸', '水山蹇', '地山谦', '雷山小过', '雷泽归妹'],
  离: ['离为火', '火山旅', '火风鼎', '火水未济', '山水蒙', '风水涣', '天水讼', '天火同人'],
  震: ['震为雷', '雷地豫', '雷水解', '雷风恒', '地风升', '水风井', '泽风大过', '泽雷随'],
  巽: ['巽为风', '风天小畜', '风火家人', '风雷益', '天雷无妄', '火雷噬嗑', '山雷颐', '山风蛊'],
  坎: ['坎为水', '水泽节', '水雷屯', '水火既济', '泽火革', '雷火丰', '地火明夷', '地水师'],
  艮: ['艮为山', '山火贲', '山天大畜', '山泽损', '火泽睽', '天泽履', '风泽中孚', '风山渐'],
  坤: ['坤为地', '地雷复', '地泽临', '地天泰', '雷天大壮', '泽天夬', '水天需', '水地比'],
};

const PALACE_ELEMENT = {
  乾: '金', 兑: '金', 离: '火', 震: '木', 巽: '木', 坎: '水', 艮: '土', 坤: '土',
};

// 八宫卦序：世爻位置（1 = 初爻）
const SHI_POSITION = [6, 1, 2, 3, 4, 5, 4, 3];

// 京房纳甲：内卦 / 外卦 的天干与三爻地支
const NAJIA = {
  乾: { gan: ['甲', '壬'], inner: ['子', '寅', '辰'], outer: ['午', '申', '戌'] },
  坤: { gan: ['乙', '癸'], inner: ['未', '巳', '卯'], outer: ['丑', '亥', '酉'] },
  震: { gan: ['庚', '庚'], inner: ['子', '寅', '辰'], outer: ['午', '申', '戌'] },
  巽: { gan: ['辛', '辛'], inner: ['丑', '亥', '酉'], outer: ['未', '巳', '卯'] },
  坎: { gan: ['戊', '戊'], inner: ['寅', '辰', '午'], outer: ['申', '戌', '子'] },
  离: { gan: ['己', '己'], inner: ['卯', '丑', '亥'], outer: ['酉', '未', '巳'] },
  艮: { gan: ['丙', '丙'], inner: ['辰', '午', '申'], outer: ['戌', '子', '寅'] },
  兑: { gan: ['丁', '丁'], inner: ['巳', '卯', '丑'], outer: ['亥', '酉', '未'] },
};

const BRANCH_ELEMENT = {
  子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火',
  午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水',
};

const GENERATES = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const OVERCOMES = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };

const LIUSHEN = ['青龙', '朱雀', '勾陈', '螣蛇', '白虎', '玄武'];
// 日干 -> 初爻所起六神
const LIUSHEN_START = { 甲: 0, 乙: 0, 丙: 1, 丁: 1, 戊: 2, 己: 3, 庚: 4, 辛: 4, 壬: 5, 癸: 5 };

function liuqin(palaceElement, branchElement) {
  if (palaceElement === branchElement) return '兄弟';
  if (GENERATES[branchElement] === palaceElement) return '父母';
  if (GENERATES[palaceElement] === branchElement) return '子孙';
  if (OVERCOMES[branchElement] === palaceElement) return '官鬼';
  if (OVERCOMES[palaceElement] === branchElement) return '妻财';
  return '?';
}

// 构建 (上卦, 下卦) -> 卦 的索引
const HEXAGRAM_INDEX = new Map();

function flip(bits, positions) {
  const out = bits.slice();
  for (const p of positions) out[p] = out[p] ? 0 : 1;
  return out;
}

for (const [palace, names] of Object.entries(PALACE_NAMES)) {
  const t = TRIGRAM_BITS[palace];
  const variants = [
    { lower: t, upper: t },
    { lower: flip(t, [0]), upper: t },
    { lower: flip(t, [0, 1]), upper: t },
    { lower: flip(t, [0, 1, 2]), upper: t },
    { lower: flip(t, [0, 1, 2]), upper: flip(t, [0]) },
    { lower: flip(t, [0, 1, 2]), upper: flip(t, [0, 1]) },
    { lower: flip(t, [0, 1, 2]), upper: flip(t, [1]) },
    { lower: t, upper: flip(t, [1]) },
  ];
  variants.forEach((v, order) => {
    const upper = TRIGRAM_BY_VALUE[bitsValue(v.upper)];
    const lower = TRIGRAM_BY_VALUE[bitsValue(v.lower)];
    HEXAGRAM_INDEX.set(`${upper}|${lower}`, {
      name: names[order],
      palace,
      palaceElement: PALACE_ELEMENT[palace],
      order,
      upper,
      lower,
      lines: [...v.lower, ...v.upper], // b0 初爻
      shi: SHI_POSITION[order],
      ying: SHI_POSITION[order] > 3 ? SHI_POSITION[order] - 3 : SHI_POSITION[order] + 3,
    });
  });
}

const HEXAGRAM_COUNT = HEXAGRAM_INDEX.size;

/** 由六爻（自下而上，1 = 阳）求卦 */
function hexagramFromBits(bits) {
  const upper = TRIGRAM_BY_VALUE[bitsValue(bits.slice(3))];
  const lower = TRIGRAM_BY_VALUE[bitsValue(bits.slice(0, 3))];
  return HEXAGRAM_INDEX.get(`${upper}|${lower}`);
}

/** 随机摇卦：三枚铜钱，背为阳（3），字为阴（2），合计 6/7/8/9 */
function tossLines(random = Math.random) {
  const lines = [];
  for (let i = 0; i < 6; i++) {
    let sum = 0;
    for (let c = 0; c < 3; c++) sum += random() < 0.5 ? 3 : 2;
    lines.push(sum); // 6 老阴 7 少阳 8 少阴 9 老阳
  }
  return lines;
}

function lineToBit(v) {
  return v === 7 || v === 9 ? 1 : 0;
}

function isMoving(v) {
  return v === 6 || v === 9;
}

/**
 * 装卦
 * @param {object} input { lines?: number[] (自下而上, 6/7/8/9), dayGanZhi?: {stem, branch}, question?: string }
 */
function buildLiuyao(input = {}) {
  const rawLines = Array.isArray(input.lines) && input.lines.length === 6
    ? input.lines.slice()
    : tossLines(input.random);

  const invalid = rawLines.filter((v) => ![6, 7, 8, 9].includes(v));
  if (invalid.length) throw new Error(`爻值只能是 6/7/8/9，收到 ${JSON.stringify(rawLines)}`);

  const bits = rawLines.map(lineToBit);
  const ben = hexagramFromBits(bits);
  const moving = rawLines.map((v, i) => (isMoving(v) ? i : -1)).filter((i) => i >= 0);
  const bianBits = moving.length ? flip(bits, moving) : null;
  const bian = bianBits ? hexagramFromBits(bianBits) : null;

  const dayGanZhi = input.dayGanZhi ?? (() => {
    const now = new Date();
    const jdn = toJDN(now.getFullYear(), now.getMonth() + 1, now.getDate());
    const g = ganzhiName(dayGanzhiIndex(jdn));
    return { stem: g.stem, branch: g.branch, name: g.name };
  })();

  const liushenStart = LIUSHEN_START[dayGanZhi.stem] ?? 0;

  function decorate(hex, movingSet) {
    const rows = [];
    for (let i = 0; i < 6; i++) {
      const isInner = i < 3;
      const trigram = isInner ? hex.lower : hex.upper;
      const nj = NAJIA[trigram];
      const branch = isInner ? nj.inner[i] : nj.outer[i - 3];
      const gan = isInner ? nj.gan[0] : nj.gan[1];
      const element = BRANCH_ELEMENT[branch];
      const value = rawLines[i];
      rows.push({
        position: i + 1,
        name: ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'][i],
        yinYang: bits[i] ? '阳' : '阴',
        moving: movingSet ? movingSet.has(i) : isMoving(value),
        symbol: bits[i] ? '━━━━━' : '━━ ━━',
        ganzhi: gan + branch,
        stem: gan,
        branch,
        element,
        liuqin: liuqin(hex.palaceElement, element),
        liushen: LIUSHEN[(liushenStart + i) % 6],
      });
    }
    return rows;
  }

  const benRows = decorate(ben, new Set(moving));
  const movingSet = new Set(moving);
  const bianRows = bian ? decorate(bian, new Set()) : null;
  if (bianRows) {
    bianRows.forEach((r, i) => {
      r.changedFrom = movingSet.has(i) ? benRows[i].symbol : null;
    });
  }

  return {
    system: 'liuyao',
    question: input.question ?? null,
    cast: {
      lines: rawLines,
      notation: rawLines.map((v) => ({ 6: '老阴 ✕', 7: '少阳', 8: '少阴', 9: '老阳 ○' }[v])),
      movingPositions: moving.map((i) => i + 1),
    },
    dayGanZhi: { name: dayGanZhi.name, stem: dayGanZhi.stem, branch: dayGanZhi.branch },
    ben: {
      name: ben.name,
      upper: ben.upper,
      lower: ben.lower,
      palace: `${ben.palace}宫`,
      palaceElement: ben.palaceElement,
      shi: ben.shi,
      ying: ben.ying,
      lines: benRows,
    },
    bian: bian
      ? {
        name: bian.name,
        upper: bian.upper,
        lower: bian.lower,
        palace: `${bian.palace}宫`,
        palaceElement: bian.palaceElement,
        shi: bian.shi,
        ying: bian.ying,
        lines: bianRows,
      }
      : null,
  };
}

return { HEXAGRAM_COUNT, hexagramFromBits, tossLines, buildLiuyao };
})();

__mods.ziwei = (function () {
// 紫微斗数安星：命身宫 → 五行局 → 紫微/天府 → 十四主星 → 诸辅煞杂曜 → 十二宫 → 四化 → 大限小限流年 → 格局
const { STEMS, BRANCHES, ganzhiName, sexagenaryIndex, jdToParts, partsToJd, formatJd } = __mods.calendar;
const { solarToLunar } = __mods.lunar;
const { applyTrueSolar } = __mods.bazi;
const { resolveAddress } = __mods.geo;

const fix = (i) => ((i % 12) + 12) % 12;

// ── 基础表 ────────────────────────────────────────────────────

const PALACE_NAMES = [
  '命宫', '兄弟', '夫妻', '子女', '财帛', '疾厄',
  '迁移', '交友', '官禄', '田宅', '福德', '父母',
];

const BUREAU = {
  水: { name: '水二局', number: 2 },
  木: { name: '木三局', number: 3 },
  金: { name: '金四局', number: 4 },
  土: { name: '土五局', number: 5 },
  火: { name: '火六局', number: 6 },
};

const NAYIN_NAMES = [
  '海中金', '炉中火', '大林木', '路旁土', '剑锋金',
  '山头火', '涧下水', '城头土', '白蜡金', '杨柳木',
  '泉中水', '屋上土', '霹雳火', '松柏木', '长流水',
  '沙中金', '山下火', '平地木', '壁上土', '金箔金',
  '覆灯火', '天河水', '大驿土', '钗钏金', '桑柘木',
  '大溪水', '沙中土', '天上火', '石榴木', '大海水',
];

function nayinElement(ganzhiIdx) {
  const name = NAYIN_NAMES[Math.floor((((ganzhiIdx % 60) + 60) % 60) / 2)];
  return { name, element: name[2] };
}

const ZIWEI_GROUP = [
  { offset: 0, name: '紫微' }, { offset: -1, name: '天机' }, { offset: -3, name: '太阳' },
  { offset: -4, name: '武曲' }, { offset: -5, name: '天同' }, { offset: -8, name: '廉贞' },
];
const TIANFU_GROUP = [
  { offset: 0, name: '天府' }, { offset: 1, name: '太阴' }, { offset: 2, name: '贪狼' },
  { offset: 3, name: '巨门' }, { offset: 4, name: '天相' }, { offset: 5, name: '天梁' },
  { offset: 6, name: '七杀' }, { offset: 10, name: '破军' },
];

/**
 * 十四主星庙旺得利平不陷（地支序：子丑寅卯辰巳午未申酉戌亥）
 * 采用通行表（《紫微斗数全书》系）。各家流派在少数宫位有出入（尤其太阳、太阴的庙旺界限），
 * 此处只标注十四主星——辅星亮度各派差异更大，不作硬标。
 * 等级从吉到凶：庙 > 旺 > 得 > 利 > 平 > 不 > 陷
 */
const BRIGHTNESS = {
  紫微: ['平', '庙', '庙', '旺', '得', '旺', '庙', '庙', '旺', '平', '得', '旺'],
  天机: ['庙', '陷', '得', '旺', '利', '平', '庙', '陷', '得', '旺', '利', '平'],
  太阳: ['陷', '陷', '旺', '庙', '旺', '旺', '庙', '得', '得', '平', '陷', '陷'],
  武曲: ['旺', '庙', '得', '利', '庙', '平', '旺', '庙', '得', '利', '庙', '平'],
  天同: ['旺', '陷', '利', '庙', '平', '庙', '陷', '陷', '旺', '平', '平', '庙'],
  廉贞: ['平', '利', '庙', '平', '利', '陷', '平', '利', '庙', '平', '利', '陷'],
  天府: ['庙', '庙', '庙', '得', '庙', '得', '旺', '庙', '得', '旺', '庙', '得'],
  太阴: ['庙', '庙', '陷', '陷', '陷', '陷', '陷', '陷', '利', '旺', '旺', '庙'],
  贪狼: ['旺', '庙', '平', '利', '庙', '陷', '旺', '庙', '平', '利', '庙', '陷'],
  巨门: ['旺', '旺', '庙', '庙', '陷', '旺', '旺', '旺', '庙', '庙', '陷', '旺'],
  天相: ['庙', '庙', '庙', '陷', '得', '得', '庙', '庙', '庙', '陷', '得', '得'],
  天梁: ['庙', '旺', '庙', '庙', '庙', '陷', '庙', '旺', '庙', '庙', '庙', '陷'],
  七杀: ['旺', '庙', '庙', '陷', '庙', '平', '旺', '庙', '庙', '陷', '庙', '平'],
  破军: ['庙', '旺', '得', '陷', '旺', '平', '庙', '旺', '得', '陷', '旺', '平'],
};

const MUTAGEN = {
  甲: { 廉贞: '禄', 破军: '权', 武曲: '科', 太阳: '忌' },
  乙: { 天机: '禄', 天梁: '权', 紫微: '科', 太阴: '忌' },
  丙: { 天同: '禄', 天机: '权', 文昌: '科', 廉贞: '忌' },
  丁: { 太阴: '禄', 天同: '权', 天机: '科', 巨门: '忌' },
  戊: { 贪狼: '禄', 太阴: '权', 右弼: '科', 天机: '忌' },
  己: { 武曲: '禄', 贪狼: '权', 天梁: '科', 文曲: '忌' },
  庚: { 太阳: '禄', 武曲: '权', 太阴: '科', 天同: '忌' },
  辛: { 巨门: '禄', 太阳: '权', 文曲: '科', 文昌: '忌' },
  壬: { 天梁: '禄', 紫微: '权', 左辅: '科', 武曲: '忌' },
  癸: { 破军: '禄', 巨门: '权', 太阴: '科', 贪狼: '忌' },
};

// 年干系
const LUCUN = { 甲: 2, 乙: 3, 丙: 5, 丁: 6, 戊: 5, 己: 6, 庚: 8, 辛: 9, 壬: 11, 癸: 0 };
const KUI_YUE = {
  甲: [1, 7], 戊: [1, 7], 庚: [1, 7], 乙: [0, 8], 己: [0, 8],
  丙: [11, 9], 丁: [11, 9], 辛: [6, 2], 壬: [3, 5], 癸: [3, 5],
};

/** 命主：按命宫地支 */
const MING_ZHU = {
  子: '贪狼', 丑: '巨门', 寅: '禄存', 卯: '文曲', 辰: '廉贞', 巳: '武曲',
  午: '破军', 未: '武曲', 申: '廉贞', 酉: '文曲', 戌: '禄存', 亥: '巨门',
};

/** 身主：按生年地支 */
const SHEN_ZHU = {
  子: '铃星', 丑: '天相', 寅: '天梁', 卯: '天同', 辰: '文昌', 巳: '天机',
  午: '火星', 未: '天相', 申: '天梁', 酉: '天同', 戌: '文昌', 亥: '天机',
};

// 三合局（寅午戌 / 申子辰 / 巳酉丑 / 亥卯未）
const TRIADS = {
  寅午戌: [2, 6, 10],
  申子辰: [8, 0, 4],
  巳酉丑: [5, 9, 1],
  亥卯未: [11, 3, 7],
};

function triadOf(branchIndex) {
  const b = fix(branchIndex);
  for (const [name, arr] of Object.entries(TRIADS)) {
    if (arr.includes(b)) return name;
  }
  throw new Error(`三合局未匹配：${branchIndex}`);
}

/** 四正三会（寅卯辰 / 巳午未 / 申酉戌 / 亥子丑），用于孤辰寡宿 */
const DIRECTIONS = {  寅卯辰: [2, 3, 4],
  巳午未: [5, 6, 7],
  申酉戌: [8, 9, 10],
  亥子丑: [11, 0, 1],
};

function directionOf(branchIndex) {
  const b = fix(branchIndex);
  for (const [name, arr] of Object.entries(DIRECTIONS)) {
    if (arr.includes(b)) return name;
  }
  throw new Error(`四正未匹配：${branchIndex}`);
}

const HUO_START = { 寅午戌: 1, 申子辰: 2, 巳酉丑: 3, 亥卯未: 9 };
const LING_START = { 寅午戌: 3, 申子辰: 10, 巳酉丑: 10, 亥卯未: 10 };
const TIANMA = { 寅午戌: 8, 申子辰: 2, 巳酉丑: 11, 亥卯未: 5 };
const XIANCHI = { 寅午戌: 3, 申子辰: 9, 巳酉丑: 6, 亥卯未: 0 };
const HUAGAI = { 寅午戌: 10, 申子辰: 4, 巳酉丑: 1, 亥卯未: 7 };
const JIANGXING = { 寅午戌: 6, 申子辰: 0, 巳酉丑: 9, 亥卯未: 3 };

const GUCHEN = { 寅卯辰: 5, 巳午未: 8, 申酉戌: 11, 亥子丑: 2 };
const GUASU = { 寅卯辰: 1, 巳午未: 4, 申酉戌: 7, 亥子丑: 10 };

/** 破碎：子午卯酉在巳，寅申巳亥在酉，辰戌丑未在丑 */
function posuIndex(yearBranch) {
  const b = fix(yearBranch);
  if ([0, 6, 3, 9].includes(b)) return 5;   // 子午卯酉 -> 巳
  if ([2, 8, 5, 11].includes(b)) return 9;  // 寅申巳亥 -> 酉
  return 1;                                 // 辰戌丑未 -> 丑
}

const XIAOXIAN_START = {
  male: { 寅午戌: 4, 申子辰: 10, 巳酉丑: 7, 亥卯未: 1 },
  female: { 寅午戌: 10, 申子辰: 4, 巳酉丑: 1, 亥卯未: 7 },
};

// 十二神名序
const CHANGSHENG_NAMES = ['长生', '沐浴', '冠带', '临官', '帝旺', '衰', '病', '死', '墓', '绝', '胎', '养'];
const BOSHI_NAMES = ['博士', '力士', '青龙', '小耗', '将军', '奏书', '飞廉', '喜神', '病符', '大耗', '伏兵', '官府'];
const JIANGQIAN_NAMES = ['将星', '攀鞍', '岁驿', '息神', '华盖', '劫煞', '灾煞', '天煞', '指背', '咸池', '月煞', '亡神'];
const SUIQI_NAMES = ['岁建', '晦气', '丧门', '贯索', '官符', '小耗', '大耗', '龙德', '白虎', '天德', '吊客', '病符'];

/** 长生起点（五行局 → 地支）：水二申、木三亥、金四巳、土五申、火六寅 */
const CHANGSHENG_START = { 2: 8, 3: 11, 4: 5, 5: 8, 6: 2 };

// ── 基础算法 ──────────────────────────────────────────────────

/** 时辰序：0=子，23:00 归子时 */
function hourBranchIndex(hour, minute = 0) {
  const total = hour * 60 + minute;
  if (total >= 23 * 60 || total < 60) return 0;
  return Math.floor((total - 60) / 120) + 1;
}

/** 紫微与天府所在宫（子 = 0）。借数法：局数除日数取商，商自寅起顺行，借数奇逆偶顺 */
function ziweiTianfuIndex(lunarDay, bureauNumber) {
  let offset = 0;
  let quotient = 0;
  for (;;) {
    const divisor = lunarDay + offset;
    quotient = Math.floor(divisor / bureauNumber);
    if (divisor % bureauNumber === 0) break;
    offset++;
    if (offset > 60) throw new Error('紫微定位失败');
  }
  quotient %= 12;
  let yinBased = quotient - 1;
  yinBased += offset % 2 === 0 ? offset : -offset;
  const ziwei = fix(yinBased + 2);
  return { ziwei, tianfu: fix(4 - ziwei) };
}

/** 某宫的小限虚岁（1..12） */
function xiaoxianAge(branchIndex, triad, gender) {
  const start = XIAOXIAN_START[gender === 'female' ? 'female' : 'male'][triad];
  const b = fix(branchIndex);
  return gender === 'female' ? fix(start - b) + 1 : fix(b - start) + 1;
}

// ── 主流程 ────────────────────────────────────────────────────

/**
 * 排紫微斗数命盘
 * @param {object} input { year,month,day,hour,minute, gender, leapAsNext? }
 */
function buildZiwei(input) {
  const { year: cy, month: cm, day: cd, hour: ch = 0, minute: cmin = 0, gender = 'male' } = input;
  const useTrueSolar = input.trueSolar !== false;
  const geo = input.geo || (input.address ? resolveAddress(input.address) : null);
  const longitude = typeof input.longitude === 'number'
    ? input.longitude
    : (geo && typeof geo.lon === 'number' ? geo.lon : undefined);
  const civilJd = partsToJd({ year: cy, month: cm, day: cd, hour: ch, minute: cmin });
  const solar = useTrueSolar
    ? applyTrueSolar(civilJd, longitude)
    : { offsetMinutes: 0, jd: civilJd, note: '未启用真太阳时' };
  // 紫微按「时辰」起盘：真太阳时若跨时辰/跨日，命盘随之改变
  const eff = jdToParts(solar.jd);
  const year = eff.year;
  const month = eff.month;
  const day = eff.day;
  const hour = eff.hour;
  const minute = eff.minute;

  const lunarRaw = solarToLunar(year, month, day);
  const lunarMonth = lunarRaw.isLeap && input.leapAsNext
    ? (lunarRaw.month % 12) + 1
    : lunarRaw.month;
  const lunarDay = lunarRaw.day;

  const hb = hourBranchIndex(hour, minute);
  const hourBranch = BRANCHES[hb];

  const yearGanzhi = ganzhiName((((lunarRaw.lunarYear - 4) % 60) + 60) % 60);
  const yearStem = yearGanzhi.stem;
  const yb = BRANCHES.indexOf(yearGanzhi.branch);
  const triad = triadOf(yb);

  // 命宫 / 身宫
  const soulIndex = fix(2 + (lunarMonth - 1) - hb);
  const bodyIndex = fix(2 + (lunarMonth - 1) + hb);

  // 命宫天干（五虎遁）
  const yinStem = ((STEMS.indexOf(yearStem) % 5) * 2 + 2) % 10;
  const soulStem = (yinStem + fix(soulIndex - 2)) % 10;
  const soulNayin = nayinElement(sexagenaryIndex(soulStem, soulIndex));
  const bureau = BUREAU[soulNayin.element];

  const { ziwei, tianfu } = ziweiTianfuIndex(lunarDay, bureau.number);

  // 星曜落宫
  const starsByBranch = Array.from({ length: 12 }, () => []);
  // 安星：主星顺带记下所在宫的庙旺得利平不陷（BRIGHTNESS 以地支序索引，与 fix(branch) 一致）
  const put = (branch, name, type) => {
    const idx = fix(branch);
    const star = { name, type };
    if (type === '主星' && BRIGHTNESS[name]) {
      const b = BRIGHTNESS[name][idx];
      if (b) star.brightness = b;
    }
    starsByBranch[idx].push(star);
  };

  for (const s of ZIWEI_GROUP) put(ziwei + s.offset, s.name, '主星');
  for (const s of TIANFU_GROUP) put(tianfu + s.offset, s.name, '主星');

  // 时系辅星
  const wenchang = fix(10 - hb);
  const wenqu = fix(4 + hb);
  put(wenchang, '文昌', '辅星');
  put(wenqu, '文曲', '辅星');
  const zuofu = fix(4 + (lunarMonth - 1));
  const youbi = fix(10 - (lunarMonth - 1));
  put(zuofu, '左辅', '辅星');
  put(youbi, '右弼', '辅星');
  put(6 + hb, '台辅', '吉星');     // 午起子时顺行
  put(2 + hb, '封诰', '吉星');     // 寅起子时顺行

  // 年干系
  const lucun = LUCUN[yearStem];
  put(lucun, '禄存', '吉星');
  put(lucun + 1, '擎羊', '煞星');
  put(lucun - 1, '陀罗', '煞星');
  const [kui, yue] = KUI_YUE[yearStem];
  put(kui, '天魁', '吉星');
  put(yue, '天钺', '吉星');

  // 年支系
  const hongluan = fix(3 - yb);
  put(hongluan, '红鸾', '吉星');
  put(hongluan + 6, '天喜', '吉星');
  put(6 - yb, '天哭', '煞星');
  put(6 + yb, '天虚', '煞星');
  put(4 + yb, '龙池', '吉星');
  put(10 - yb, '凤阁', '吉星');
  put(TIANMA[triad], '天马', '吉星');
  put(XIANCHI[triad], '咸池', '煞星');
  put(HUAGAI[triad], '华盖', '杂曜');
  const dirGroup = directionOf(yb);
  put(GUCHEN[dirGroup], '孤辰', '煞星');
  put(GUASU[dirGroup], '寡宿', '煞星');
  put(posuIndex(yb), '破碎', '煞星');

  // 月系
  put(9 + (lunarMonth - 1), '天刑', '煞星');  // 酉起正月顺行
  put(1 + (lunarMonth - 1), '天姚', '煞星');  // 丑起正月顺行

  // 日系（以左辅右弼、文昌文曲为基）
  put(zuofu + (lunarDay - 1), '三台', '吉星');
  put(youbi - (lunarDay - 1), '八座', '吉星');
  put(wenchang + (lunarDay - 2), '恩光', '吉星');
  put(wenqu + (lunarDay - 2), '天贵', '吉星');

  // 时系煞星
  put(HUO_START[triad] + hb, '火星', '煞星');
  put(LING_START[triad] + hb, '铃星', '煞星');
  put(11 + hb, '地劫', '煞星');   // 亥宫起子时，顺行
  put(11 - hb, '地空', '煞星');   // 亥宫起子时，逆行

  // 固定宫位：天伤恒在交友，天使恒在疾厄
  put(soulIndex - 7, '天伤', '杂曜');
  put(soulIndex - 5, '天使', '杂曜');

  // 生年四化
  const mutagenMap = MUTAGEN[yearStem] ?? {};
  for (const list of starsByBranch) {
    for (const star of list) {
      if (mutagenMap[star.name]) star.mutagen = mutagenMap[star.name];
    }
  }

  // 十二宫：命宫起逆布
  const palaceNames = [];
  for (let i = 0; i < 12; i++) palaceNames[fix(soulIndex - i)] = PALACE_NAMES[i];

  // 大限：阳男阴女顺行、阴男阳女逆行
  const yearYang = STEMS.indexOf(yearStem) % 2 === 0;
  const forward = (yearYang && gender === 'male') || (!yearYang && gender === 'female');
  const startAge = bureau.number;

  // 十二神（长生/博士 随大限顺逆，将前/岁前 恒顺行）
  const csStart = CHANGSHENG_START[bureau.number];
  const shenshaAt = (branch) => {
    const d = forward ? 1 : -1;
    return {
      changsheng: CHANGSHENG_NAMES[fix(d * (branch - csStart))],
      boshi: BOSHI_NAMES[fix(d * (branch - lucun))],
      jiangqian: JIANGQIAN_NAMES[fix(branch - JIANGXING[triad])],
      suiqi: SUIQI_NAMES[fix(branch - yb)],
    };
  };

  const palaces = [];
  for (let i = 0; i < 12; i++) {
    const branch = fix(soulIndex - i);
    const stem = (yinStem + fix(branch - 2)) % 10;
    const stepIndex = forward ? fix(branch - soulIndex) : fix(soulIndex - branch);
    const dxStart = startAge + stepIndex * 10;
    const gz = STEMS[stem] + BRANCHES[branch];
    const pal = MUTAGEN[STEMS[stem]] ?? {};
    const selfHua = starsByBranch[branch]
      .filter((s) => pal[s.name])
      .map((s) => ({ star: s.name, type: pal[s.name] }));
    palaces.push({
      palace: palaceNames[branch],
      branch: BRANCHES[branch],
      stem: STEMS[stem],
      ganzhi: gz,
      isSoul: branch === soulIndex,
      isBody: branch === bodyIndex,
      stars: starsByBranch[branch].map((s) => ({ ...s })),
      shensha: shenshaAt(branch),
      selfHua,
      daxian: {
        start: dxStart,
        end: dxStart + 9,
        stem: STEMS[stem],
        mutagen: Object.entries(MUTAGEN[STEMS[stem]] ?? {}).map(([s, k]) => `${s}化${k}`),
      },
      xiaoxian: { age: xiaoxianAge(branch, triad, gender) },
      sanfang: [branch, branch + 4, branch + 8, branch + 6]
        .map((x) => palaceNames[fix(x)]),
    });
  }

  // 昌曲专论：与丑未的关系、是否入命三方、吸收面的清杂
  const changqu = (() => {
    const set = new Set([wenchang, wenqu]);
    let relation;
    if (wenchang === wenqu) relation = `同宫于${BRANCHES[wenchang]}`;
    else if (set.has(0) && set.has(2)) relation = '夹丑（子·寅）';
    else if (set.has(6) && set.has(8)) relation = '夹未（午·申）';
    else if (set.has(5) && set.has(9)) relation = '丑三合（巳·酉）';
    else if (set.has(11) && set.has(3)) relation = '未三合（亥·卯）';
    else relation = '与丑未无关';

    const sanfang = [soulIndex, fix(soulIndex + 4), fix(soulIndex + 8), fix(soulIndex + 6)];
    const pick = (branch, name) => {
      const stars = starsByBranch[branch];
      const self = stars.find((s) => s.name === name) || {};
      return {
        branch: BRANCHES[branch],
        palace: palaceNames[branch],
        mutagen: self.mutagen ?? null,
        sha: stars.filter((s) => s.type === '煞星').map((s) => s.name),
      };
    };
    const wc = pick(wenchang, '文昌');
    const wq = pick(wenqu, '文曲');
    const jiBranches = [wc, wq].filter((x) => x.mutagen === '忌').map((x) => x.branch);
    const shaAll = [...new Set([...wc.sha, ...wq.sha])];
    const tone = jiBranches.length
      ? { label: '杂', reason: `昌曲化忌于${jiBranches.join('、')}` }
      : shaAll.length >= 2
        ? { label: '杂', reason: `昌曲两宫会煞 ${shaAll.join('、')}` }
        : { label: '清', reason: '昌曲无化忌、不明显会煞' };

    return {
      relation,
      inSoulSanfang: sanfang.includes(wenchang) || sanfang.includes(wenqu),
      wenchang: wc,
      wenqu: wq,
      absorb: tone,
    };
  })();

  // 流年（当年起 12 年）
  const thisYear = new Date().getFullYear();
  const liunian = [];
  for (let y = thisYear; y < thisYear + 12; y++) {
    const gz = ganzhiName((((y - 4) % 60) + 60) % 60);
    const b = BRANCHES.indexOf(gz.branch);
    const lu = LUCUN[gz.stem];
    const age = y - lunarRaw.lunarYear + 1;
    const xxAge = ((age - 1) % 12) + 1;
    const xxPalace = palaces.find((p) => p.xiaoxian.age === xxAge);
    const dxPalace = palaces.find((p) => age >= p.daxian.start && age <= p.daxian.end);
    liunian.push({
      year: y,
      ganzhi: gz.name,
      age,
      lifePalace: { branch: gz.branch, palace: palaceNames[b] },
      doujun: BRANCHES[fix(b - (lunarMonth - 1) + hb)],
      sanfang: [fix(b), fix(b + 4), fix(b + 8), fix(b + 6)].map((x) => palaceNames[x]),
      liulu: BRANCHES[lu],
      liuyang: BRANCHES[fix(lu + 1)],
      liutuo: BRANCHES[fix(lu - 1)],
      liukui: BRANCHES[KUI_YUE[gz.stem][0]],
      liuyue: BRANCHES[KUI_YUE[gz.stem][1]],
      mutagen: Object.entries(MUTAGEN[gz.stem] ?? {}).map(([s, k]) => `${s}化${k}`),
      daxian: dxPalace
        ? { palace: dxPalace.palace, start: dxPalace.daxian.start, end: dxPalace.daxian.end }
        : null,
      xiaoxian: xxPalace ? { age: xxAge, palace: xxPalace.palace } : null,
    });
  }

  const chart = {
    system: 'ziwei',
    input: {
      year: cy, month: cm, day: cd, hour: ch, minute: cmin,
      gender,
      leapAsNext: Boolean(input.leapAsNext),
      longitude: longitude ?? null,
      address: input.address || null,
      geo,
      trueSolar: useTrueSolar,
    },
    solarTime: {
      civilText: `${cy}-${String(cm).padStart(2, '0')}-${String(cd).padStart(2, '0')} ${String(ch).padStart(2, '0')}:${String(cmin).padStart(2, '0')}`,
      trueSolarText: formatJd(solar.jd),
      offsetMinutes: solar.offsetMinutes,
      note: solar.note,
    },
    lunar: {
      year: lunarRaw.lunarYear,
      month: lunarMonth,
      day: lunarDay,
      isLeap: lunarRaw.isLeap,
      monthStart: lunarRaw.monthStart,
      ...(lunarRaw.isLeap ? { note: '闰月按本月起盘（可用 leapAsNext 改为按次月）' } : {}),
    },
    hourBranch,
    yearGanzhi: yearGanzhi.name,
    soul: {
      palace: '命宫',
      branch: BRANCHES[soulIndex],
      stem: STEMS[soulStem],
      ganzhi: STEMS[soulStem] + BRANCHES[soulIndex],
      nayin: soulNayin.name,
    },
    body: { palace: '身宫', branch: BRANCHES[bodyIndex], lands: palaceNames[bodyIndex] },
    lifeMaster: MING_ZHU[BRANCHES[soulIndex]],
    bodyMaster: SHEN_ZHU[BRANCHES[yb]],
    doujun: {
      zinian: BRANCHES[fix(hb - (lunarMonth - 1))],
      rule: '流年支起正月，逆数至生月，再起子时顺数至生时',
    },
    bureau: { name: bureau.name, number: bureau.number, element: soulNayin.element },
    ziwei: BRANCHES[ziwei],
    tianfu: BRANCHES[tianfu],
    changqu,
    palaces,
    liunian,
    daxian: {
      direction: forward ? '顺行' : '逆行',
      rule: `${yearYang ? '阳' : '阴'}年${gender === 'male' ? '男' : '女'}${forward ? '顺行' : '逆行'}`,
      startAge,
    },
    xiaoxianRule: {
      start: XIAOXIAN_START[gender === 'female' ? 'female' : 'male'][triad],
      direction: gender === 'male' ? '顺行' : '逆行',
      note: '小限一岁起宫按年支三合，男顺女逆，每宫一岁，十二年一周',
    },
    rules: {
      ziweiPlacement: '借数法：局数除日数取商，商数自寅宫顺行，借数奇逆偶顺',
      mutagen: '生年四化用中州派常用表；庚干各派有异（有以天同化科、太阴化忌者）',
      leapMonth: '闰月默认按本月，可切换为按次月',
      auxStars: '火铃按年支三合起点顺数至生时；羊陀夹禄存；魁钺按年干；地空亥起子时逆行、地劫顺行；三台八座随辅弼；恩光天贵随昌曲退一位；台辅封诰按时支',
      shensha: '长生、博士随大限顺逆；将前、岁前恒顺行；天伤恒在交友、天使恒在疾厄',
      masters: '命主按命宫地支，身主按生年地支',
      liunian: '流年命宫取该年地支宫；三方四正为本宫与 +4/+8/+6；并给该年所属大限与小限',
      changqu: '昌曲落宫只由时支决定，故与丑未的关系（夹/三合/同宫/无关）是结构性结论；absorb 的「清/杂」是启发式标记，依据昌曲化忌与会煞，不是断语',
    },
  };

  chart.patterns = detectPatterns(chart);
  chart.daxianList = daxianList(chart);
  enrichLiunian(chart);
  chart.patternSummary = {
    count: chart.patterns.length,
    good: chart.patterns.filter((p) => p.tone === 'good').map((p) => p.name),
    bad: chart.patterns.filter((p) => p.tone === 'bad').map((p) => p.name),
    note: '格局只描述结构，不作吉凶断语；同一命盘可并存吉格与忌格',
  };
  return chart;
}

// ── 格局识别（规则写在 evidence 里，便于复核）────────────────────

function starBranchOf(chart, name) {
  const p = chart.palaces.find((x) => x.stars.some((s) => s.name === name));
  return p ? BRANCHES.indexOf(p.branch) : -1;
}

function palaceAt(chart, branchIndex) {
  const b = fix(branchIndex);
  return chart.palaces.find((p) => BRANCHES.indexOf(p.branch) === b);
}

function detectPatterns(chart) {
  const soul = chart.palaces.find((p) => p.isSoul);
  const soulIdx = BRANCHES.indexOf(soul.branch);
  const sanfang = [soulIdx, fix(soulIdx + 4), fix(soulIdx + 8), fix(soulIdx + 6)];
  const starsIn = (indices) => new Set(indices.flatMap((b) => palaceAt(chart, b)?.stars.map((s) => s.name) ?? []));
  const near = starsIn(sanfang);
  const soulStars = soul.stars.filter((s) => s.type === '主星').map((s) => s.name);
  const out = [];

  const add = (name, evidence) => out.push({ name, evidence });

  if (soulStars.length === 0) add('命无正曜', '命宫无十四主星，需借对宫安星');
  if (soulStars.some((s) => ['七杀', '破军', '贪狼'].includes(s))) {
    add('杀破狼', `命宫坐 ${soulStars.filter((s) => ['七杀', '破军', '贪狼'].includes(s)).join('、')}`);
  }
  const jyTL = ['天机', '太阴', '天同', '天梁'];
  if (jyTL.every((s) => near.has(s)) && soulStars.some((s) => jyTL.includes(s))) {
    add('机月同梁', '命宫三方四正会齐天机、太阴、天同、天梁');
  }
  if (soulIdx === 11 && starBranchOf(chart, '太阴') === 11) add('月朗天门', '太阴在亥守命');
  if (soulIdx === 3 && starBranchOf(chart, '太阳') === 3) add('日出扶桑', '太阳在卯守命');
  if (near.has('天府') && near.has('天相')) add('府相朝垣', '命宫三方四正见天府、天相');

  const lu = starBranchOf(chart, '禄存');
  const ma = starBranchOf(chart, '天马');
  if (lu >= 0 && ma >= 0 && (lu === ma || fix(lu - ma) === 6)) add('禄马交驰', `禄存在${chart.ziwei && BRANCHES[lu]}，天马在${BRANCHES[ma]}`);

  const huo = starBranchOf(chart, '火星');
  const ling = starBranchOf(chart, '铃星');
  if (fix(soulIdx - 1) === huo && fix(soulIdx + 1) === ling) add('火铃夹命', '火星在命宫前一宫、铃星在后一宫夹命');
  if (fix(soulIdx - 1) === ling && fix(soulIdx + 1) === huo) add('火铃夹命', '铃星与火星夹命');

  const ji = chart.palaces.find((p) => p.stars.some((s) => s.mutagen === '忌'));
  if (ji) {
    const jb = BRANCHES.indexOf(ji.branch);
    if (fix(jb - 1) === starBranchOf(chart, '擎羊') && fix(jb + 1) === starBranchOf(chart, '陀罗')) {
      add('羊陀夹忌', `化忌在${ji.branch}，擎羊陀罗夹之`);
    }
  }

  // 铃昌陀武：四星会于命宫三方四正
  const lctw = ['铃星', '文昌', '陀罗', '武曲'].map((n) => starBranchOf(chart, n));
  if (lctw.every((b) => b >= 0) && lctw.every((b) => sanfang.includes(fix(b)))) {
    add('铃昌陀武', `铃${BRANCHES[lctw[0]]}·昌${BRANCHES[lctw[1]]}·陀${BRANCHES[lctw[2]]}·武${BRANCHES[lctw[3]]} 会于命宫(${BRANCHES[soulIdx]})三方四正`);
  }

  const hualu = chart.palaces.find((p) => p.stars.some((s) => s.mutagen === '禄'));
  if (hualu && lu >= 0) {
    const hb2 = BRANCHES.indexOf(hualu.branch);
    if (hb2 === lu || fix(hb2 - lu) === 6) add('双禄交流', `禄存在${BRANCHES[lu]}，化禄在${hualu.branch}`);
  }

  // ── 以下为扩展格局（条件都是星位判断，evidence 写明落在哪宫）──
  const inSoul = (name) => soul.stars.some((s) => s.name === name);
  const nearStar = (name) => near.has(name);
  const jia = (a, b) => {
    const ba = starBranchOf(chart, a);
    const bb = starBranchOf(chart, b);
    return ba >= 0 && bb >= 0 && fix(ba + 1) === soulIdx && fix(bb - 1) === soulIdx;
  };
  const mutagensIn = (indices) => {
    const set = new Set();
    for (const b of indices) for (const s of (palaceAt(chart, b)?.stars ?? [])) if (s.mutagen) set.add(s.mutagen);
    return set;
  };

  // 紫微系
  if (inSoul('紫微') && inSoul('天府')) add('紫府同宫', '紫微、天府同守命宫');
  if (nearStar('紫微') && nearStar('天府')) add('紫府朝垣', '命宫三方四正会紫微、天府');
  if ((inSoul('紫微') || inSoul('天府')) && ['左辅', '右弼', '天魁', '天钺'].filter(nearStar).length >= 2) {
    const l = ['左辅', '右弼', '天魁', '天钺'].filter(nearStar);
    add('君臣庆会', `紫微/天府坐命，三方会${l.join('、')}`);
  }
  if (soulIdx === 6 && starBranchOf(chart, '紫微') === 6) add('极向离明', '紫微在午守命');
  if ((soulIdx === 0 || soulIdx === 6) && inSoul('七杀')) add('七杀朝斗', `七杀在${BRANCHES[soulIdx]}守命`);
  if ((soulIdx === 0 || soulIdx === 6) && inSoul('破军')) add('英星入庙', `破军在${BRANCHES[soulIdx]}守命`);
  if ((soulIdx === 0 || soulIdx === 6) && inSoul('巨门')) add('石中隐玉', `巨门在${BRANCHES[soulIdx]}守命`);
  if (starBranchOf(chart, '巨门') >= 0 && starBranchOf(chart, '巨门') === starBranchOf(chart, '太阳')) {
    add('巨日同宫', `巨门太阳同宫于${BRANCHES[starBranchOf(chart, '巨门')]}`);
  }

  // 日月
  if (jia('太阳', '太阴')) add('日月夹命', '太阳、太阴夹命宫');
  if (starBranchOf(chart, '太阳') >= 0 && starBranchOf(chart, '太阴') >= 0
    && fix(starBranchOf(chart, '太阳') - starBranchOf(chart, '太阴')) === 6) {
    add('日月对照', `太阳在${BRANCHES[starBranchOf(chart, '太阳')]}，太阴在${BRANCHES[starBranchOf(chart, '太阴')]}，隔宫对照`);
  }

  // 夹局
  if (jia('左辅', '右弼')) add('左右夹命', '左辅、右弼夹命宫');
  if (jia('文昌', '文曲')) add('昌曲夹命', '文昌、文曲夹命宫');
  if (jia('天魁', '天钺')) add('魁钺夹命', '天魁、天钺夹命宫');
  if (jia('擎羊', '陀罗')) add('羊陀夹命', '擎羊、陀罗夹命宫');

  // 四化
  const muts = mutagensIn(sanfang);
  if (muts.has('禄') && muts.has('权') && muts.has('科')) add('三奇嘉会', '化禄、化权、化科会于命宫三方四正');
  const luStars = ['禄存', '化禄'].filter((n) => n === '禄存' ? nearStar(n) : muts.has('禄'));
  if (luStars.length === 2) add('双禄朝垣', '禄存与化禄同会命宫三方四正');
  if (near.has('地空') && near.has('地劫') && (inSoul('地空') || inSoul('地劫'))) add('命里逢空', '地空、地劫会命');

  // 煞忌结构
  if (soulIdx === 6 && starBranchOf(chart, '擎羊') === 6) add('马头带箭', '擎羊在午守命');
  if (soulIdx === 4 || soulIdx === 10) add('天罗地网', `命宫在${BRANCHES[soulIdx]}，辰戌为天罗地网`);
  const lianzhen = starBranchOf(chart, '廉贞');
  const tianxiang = starBranchOf(chart, '天相');
  const qingyang = starBranchOf(chart, '擎羊');
  if (lianzhen >= 0 && qingyang >= 0 && tianxiang >= 0
    && fix(lianzhen + 1) === tianxiang && fix(qingyang - 1) === tianxiang) {
    add('刑囚夹印', '廉贞与擎羊夹天相（刑囚夹印）');
  }
  if (near.has('贪狼') && (near.has('火星') || near.has('铃星'))) {
    add('火贪铃贪', `贪狼与${near.has('火星') ? '火星' : '铃星'}会于命宫三方四正`);
  }
  if (starBranchOf(chart, '武曲') >= 0 && starBranchOf(chart, '武曲') === starBranchOf(chart, '贪狼')) {
    add('武贪同行', `武曲贪狼同宫于${BRANCHES[starBranchOf(chart, '武曲')]}`);
  }
  if (soulIdx === 0 && inSoul('贪狼')) add('泛水桃花', '贪狼在子守命');

  // 同名的结构只保留第一条（evidence 已足够说明），并标注倾向
  const seen = new Set();
  return out
    .filter((p) => (seen.has(p.name) ? false : (seen.add(p.name), true)))
    .map((p) => ({ ...p, tone: PATTERN_TONE[p.name] || 'neutral' }));
}

const PATTERN_TONE = {
  紫府同宫: 'good', 紫府朝垣: 'good', 君臣庆会: 'good', 极向离明: 'good',
  七杀朝斗: 'good', 英星入庙: 'good', 石中隐玉: 'good', 巨日同宫: 'good',
  日月夹命: 'good', 日月对照: 'good', 左右夹命: 'good', 昌曲夹命: 'good',
  魁钺夹命: 'good', 三奇嘉会: 'good', 双禄朝垣: 'good', 府相朝垣: 'good',
  禄马交驰: 'good', 月朗天门: 'good', 日出扶桑: 'good', 机月同梁: 'good',
  武贪同行: 'neutral', 命无正曜: 'neutral', 杀破狼: 'neutral', 双禄交流: 'neutral',
  火贪铃贪: 'neutral', 火铃夹命: 'bad', 羊陀夹命: 'bad', 羊陀夹忌: 'bad',
  铃昌陀武: 'bad', 命里逢空: 'bad', 马头带箭: 'bad', 天罗地网: 'bad',
  刑囚夹印: 'bad', 泛水桃花: 'bad',
};

// ── 大限一览：宫干四化落宫、三方主星 ──────────────────────────

function daxianList(chart) {
  const mainOf = (palaceNames) => {
    const set = new Set();
    for (const name of palaceNames) {
      const p = chart.palaces.find((x) => x.palace === name);
      for (const s of (p?.stars ?? [])) if (s.type === '主星') set.add(s.name);
    }
    return [...set];
  };
  return chart.palaces
    .map((p) => ({
      palace: p.palace,
      branch: p.branch,
      stem: p.stem,
      ganzhi: p.ganzhi,
      ages: [p.daxian.start, p.daxian.end],
      mutagen: p.daxian.mutagen,
      selfHua: p.selfHua,
      sanfang: p.sanfang,
      mainStars: mainOf(p.sanfang),
      mutagenHits: Object.entries(MUTAGEN[p.stem] ?? {}).map(([star, type]) => {
        const b = starBranchOf(chart, star);
        return { star, type, branch: b >= 0 ? BRANCHES[b] : null, palace: b >= 0 ? chart.palaces.find((x) => x.branch === BRANCHES[b])?.palace ?? null : null };
      }),
    }))
    .sort((a, b) => a.ages[0] - b.ages[0]);
}

// ── 流年四化落宫 ────────────────────────────────────────────

function enrichLiunian(chart) {
  for (const ln of chart.liunian) {
    const stem = ln.ganzhi[0];
    ln.mutagenHits = Object.entries(MUTAGEN[stem] ?? {}).map(([star, type]) => {
      const b = starBranchOf(chart, star);
      return {
        star,
        type,
        branch: b >= 0 ? BRANCHES[b] : null,
        palace: b >= 0 ? chart.palaces.find((x) => x.branch === BRANCHES[b])?.palace ?? null : null,
      };
    });
    ln.sanfangMainStars = [...new Set(ln.sanfang.flatMap((name) => {
      const p = chart.palaces.find((x) => x.palace === name);
      return (p?.stars ?? []).filter((s) => s.type === '主星').map((s) => s.name);
    }))];
  }
  return chart.liunian;
}

return { PALACE_NAMES, BRIGHTNESS, MUTAGEN, LUCUN, KUI_YUE, MING_ZHU, SHEN_ZHU, triadOf, HUO_START, LING_START, TIANMA, XIANCHI, HUAGAI, JIANGXING, GUCHEN, GUASU, posuIndex, XIAOXIAN_START, CHANGSHENG_NAMES, BOSHI_NAMES, JIANGQIAN_NAMES, SUIQI_NAMES, CHANGSHENG_START, hourBranchIndex, ziweiTianfuIndex, xiaoxianAge, buildZiwei, detectPatterns, daxianList, enrichLiunian };
})();

__mods.tarot = (function () {
// 塔罗牌：78 张（22 大阿卡纳 + 56 小阿卡纳），抽牌、牌阵与解读
//
// 【流派说明】塔罗是一套象征系统，而非确定性预言。本文件采用：
//   · 牌名、编号：RWS（韦特）体系 —— 力量 = VIII、正义 = XI；
//     马赛体系里两者的编号相反（VIII 正义 / XI 力量），仅编号差异，牌义不变。
//   · 大牌元素：黄金黎明（Golden Dawn）对应的行星/星座归属（详见 MAJOR_EXT 注释）。
//   · 小牌元素：权杖火、圣杯水、宝剑风、星币土（通行）。
//   · 逆位读法：取「同一股力量未顺过来 / 用力过猛 / 内在化」三义，
//     不采用「逆位即纯凶」的流派；不同流派对逆位的取舍不同，此处取中性偏提醒。
// 以上差异在 reading 与结果字段 systemNote 中均有标注，避免被当作唯一正解。

const MAJOR = [
  ['愚者', '0', '新开始 冒险 纯真 无限可能', '鲁莽 逃避 原地打转 不切实际'],
  ['魔术师', 'I', '行动力 资源整合 化想法为现实 沟通', '夸大 操纵 能力未用 自欺'],
  ['女祭司', 'II', '直觉 潜意识 静观其变 内在智慧', '忽视直觉 秘密 表面化 失焦'],
  ['皇后', 'III', '丰盛 滋养 创造力 孕育', '过度依赖 停滞 消耗 空虚'],
  ['皇帝', 'IV', '秩序 权威 结构 掌控', '专断 僵化 失控 硬撑'],
  ['教皇', 'V', '传统 指导 信念 规范', '教条 反叛 形式主义 盲从'],
  ['恋人', 'VI', '结合 抉择 价值观一致 吸引', '失衡 犹豫 错误选择 貌合神离'],
  ['战车', 'VII', '意志 前进 掌控方向 胜利', '失控 方向不明 蛮干 内耗'],
  ['力量', 'VIII', '温柔的坚定 耐心 驯服 勇气', '自我怀疑 压抑 强撑 失衡'],
  ['隐者', 'IX', '内省 独处 寻求真理 沉淀', '孤立 逃避 封闭 钻牛角尖'],
  ['命运之轮', 'X', '转机 周期 因缘际会 顺势', '停滞 抗拒变化 重复循环 错位'],
  ['正义', 'XI', '公平 因果 权衡 决定', '偏颇 逃避责任 失衡 拖延'],
  ['倒吊人', 'XII', '暂停 换位 牺牲换取洞见 放下', '无谓牺牲 拖延 僵持 白费'],
  ['死神', 'XIII', '结束 转化 断舍离 重生', '抗拒结束 拖泥带水 停滞 恐惧'],
  ['节制', 'XIV', '调和 中道 耐心融合 疗愈', '失衡 极端 急躁 消耗'],
  ['恶魔', 'XV', '欲望 束缚 执念 现实交易', '挣脱 觉察 解除依赖 松绑'],
  ['高塔', 'XVI', '突变 崩塌 真相冲击 解放', '延迟的崩解 避免改变 余震 侥幸'],
  ['星星', 'XVII', '希望 疗愈 指引 长期信心', '失望 信心动摇 修复中 断线'],
  ['月亮', 'XVIII', '迷雾 潜意识 不安 幻象', '迷雾散去 真相浮现 释放 清醒'],
  ['太阳', 'XIX', '成功 光明 活力 坦率', '短暂阴霾 过度乐观 延迟 强颜'],
  ['审判', 'XX', '觉醒 召唤 重生 清算', '自我批判 拒绝面对 迟疑 旧账'],
  ['世界', 'XXI', '完成 圆满 整合 跨越', '未竟 收尾拖延 差一步 循环'],
];

// 与 MAJOR 同序：元素（黄金黎明行星/星座归属）＋ 15-30 字核心寓意
// 火＝白羊/狮子/射手/木星·火星·太阳；水＝巨蟹/天蝎/双鱼·月亮；风＝双子/天秤/水瓶·水星；
// 土＝金牛/处女/摩羯·金星·土星。「灵」为另一派把大牌整体视为灵性层面的说法，此处不用。
const MAJOR_EXT = [
  ['风', '一脚踏出悬崖也不怕，一切还没被定义'], // 愚者 · 天王星/风
  ['风', '手上的工具已经齐全，想法可以立刻变成现实'], // 魔术师 · 水星
  ['水', '答案还在水面之下，安静比追问更能接近它'], // 女祭司 · 月亮
  ['土', '先把自己养好，丰盛才会从你身上长出来'], // 皇后 · 金星
  ['火', '秩序与边界一旦建立，事情才有谈成的余地'], // 皇帝 · 白羊
  ['土', '旧有的规矩既是保护，也可能成为枷锁'], // 教皇 · 金牛
  ['风', '关系与选择都指向同一件事：你真正看重什么'], // 恋人 · 双子
  ['水', '方向定了就往前，意志是这段路的燃料'], // 战车 · 巨蟹
  ['火', '真正的力量不是压制，而是温柔地与之共处'], // 力量 · 狮子
  ['土', '退到无人处，是为了看清自己手里的那盏灯'], // 隐者 · 处女
  ['火', '周期自己会转，人能做的是在对的时点推一把'], // 命运之轮 · 木星
  ['风', '一切都有对价，愿意付的那部分才算公平'], // 正义 · 天秤
  ['水', '暂停不是失败，换个角度才看得见新的路'], // 倒吊人 · 海王星/水
  ['水', '结束必须真的结束，新的东西才有位置进来'], // 死神 · 天蝎
  ['火', '不偏不倚地调和，耐心把两种东西融成一种'], // 节制 · 射手
  ['土', '欲望本身不是问题，被它牵着走才是'], // 恶魔 · 摩羯
  ['火', '崩塌带走的是假的，剩下才是能重建的地基'], // 高塔 · 火星
  ['风', '在最暗的地方给出希望，方向感来自远方'], // 星星 · 水瓶
  ['水', '看不清的时候，先承认自己在迷雾里'], // 月亮 · 双鱼
  ['火', '结果本身会说话，坦率与明亮就是答案'], // 太阳 · 太阳
  ['火', '被点到名字的时候，要敢于回应并重新出发'], // 审判 · 冥王星/火
  ['土', '一个循环走完，才轮得到下一个开始'], // 世界 · 土星
];

const SUITS = [
  ['权杖', '火', '行动与热情', '冲动受阻'],
  ['圣杯', '水', '情感与关系', '情绪淤积'],
  ['宝剑', '风', '思维与冲突', '思虑过度'],
  ['星币', '土', '现实与资源', '务实停滞'],
];

// 小阿卡纳：花色 → 14 张 [名称, 正位关键词, 逆位关键词]
const MINOR = {
  权杖: [
    ['一', '灵感 起点 行动冲动', '方向未明 拖延 点火即灭'],
    ['二', '规划 远望 抉择', '犹豫 视野受限 迟迟不定'],
    ['三', '拓展 等待成果 布局', '进度延迟 变数 收成不佳'],
    ['四', '稳定 庆祝 归属', '不安 根基松动 表面和谐'],
    ['五', '竞争 摩擦 磨合', '内耗 息事宁人 回避冲突'],
    ['六', '胜利 认可 士气', '虚名 失落 名不副实'],
    ['七', '坚守 防御 立场', '疲于应付 退让 寡不敌众'],
    ['八', '迅速 消息 进展', '延误 混乱 节奏被打断'],
    ['九', '警觉 坚持到底 界限', '疲惫 疑心过重 戒备成疾'],
    ['十', '重担 责任 收尾', '卸下 崩溃边缘 超载'],
    ['侍从', '热忱 尝试 新消息', '热情短暂 难持久 三分钟热度'],
    ['骑士', '冒进 行动 冒险', '莽撞 半途而废 冲动'],
    ['王后', '自信 魅力 感染力', '善妒 自我怀疑 争胜'],
    ['国王', '领导 决断 魄力', '专横 急于求成 独断'],
  ],
  圣杯: [
    ['一', '情感萌发 直觉 新关系', '情感封闭 压抑 不敢投入'],
    ['二', '结合 互许 对等', '失衡 猜疑 貌合神离'],
    ['三', '欢庆 友谊 共享', '过度社交 疏离 流于热闹'],
    ['四', '倦怠 错过 停滞', '重新留意 转机 愿意接住'],
    ['五', '失落 遗憾 执念', '释怀 走出 重新接受'],
    ['六', '怀旧 童真 旧人', '沉溺过去 难放下 美化回忆'],
    ['七', '幻想 选项过多 白日梦', '看清现实 决断 收心'],
    ['八', '离开 寻找意义 转身', '难以割舍 徘徊 反复回头'],
    ['九', '满足 心愿达成 享受', '满足流于表面 贪婪 欲求不满'],
    ['十', '圆满 家庭 归属', '和谐流于表面 疏离 各怀心事'],
    ['侍从', '敏感 讯息 灵感', '情绪化 幼稚 玻璃心'],
    ['骑士', '浪漫 邀约 追寻', '承诺落空 空谈 忽冷忽热'],
    ['王后', '共情 包容 温柔', '情绪淹没 讨好 失去边界'],
    ['国王', '情绪掌控 成熟 稳定', '压抑 冷漠 情绪封锁'],
  ],
  宝剑: [
    ['一', '真相 突破 清晰', '混乱 误解 思绪打结'],
    ['二', '僵持 回避 权衡', '打破僵局 抉择 不得不选'],
    ['三', '心痛 分离 刺伤', '疗愈 放下 结痂'],
    ['四', '休息 恢复 沉淀', '勉强支撑 疲惫 恢复不足'],
    ['五', '争执 失利 代价', '和解 止损 认输'],
    ['六', '过渡 离开 前行', '滞留原地 难行 回头'],
    ['七', '策略 隐瞒 独行', '坦白 被识破 自食其果'],
    ['八', '自我束缚 限制 看不清', '松绑 看清出路 允许自己'],
    ['九', '焦虑 失眠 内耗', '恐惧渐退 松动 天亮了'],
    ['十', '终结 谷底 触底', '触底反弹 重启 止血'],
    ['侍从', '好奇 观察 求知', '口舌 轻率 想太多'],
    ['骑士', '直言 急进 冲撞', '鲁莽 伤人 唐突'],
    ['王后', '理性 明辨 独立', '尖刻 冷硬 苛责'],
    ['国王', '权威 判断 原则', '专断 苛刻 口不择言'],
  ],
  星币: [
    ['一', '务实开端 机会 落地', '错失 根基不稳 空谈'],
    ['二', '平衡 调度 灵活', '失衡 顾此失彼 分身乏术'],
    ['三', '协作 技艺 成果', '配合不畅 各自为政 返工'],
    ['四', '守成 保守 掌控', '松手 匮乏感 抓太紧'],
    ['五', '匮乏 困境 排外', '转机 援手 愿意求助'],
    ['六', '施与受 分享 公平', '付出失衡 计较 人情账'],
    ['七', '评估 耐心 等待', '急躁 白费 收成打折'],
    ['八', '精进 专注 学习', '敷衍 半途 走神'],
    ['九', '自足 丰盛 独立', '依附 虚耗 不配得感'],
    ['十', '基业 家族 长期', '家累 短视 根基松动'],
    ['侍从', '务实 学习 起步', '拖延 眼高手低 迟迟不动'],
    ['骑士', '稳步 推进 可靠', '停滞 保守 磨蹭'],
    ['王后', '照料 丰饶 务实', '操劳 控制 过度付出'],
    ['国王', '稳健 掌控 成果', '固执 贪利 油盐不进'],
  ],
};

const ROMAN = ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI'];

// 小牌牌阶：编号（A..10 / 宫廷）与数值 1..14，供排序与结构分析使用
// 核心寓意按「牌阶」给（跨花色通用），花色含义由 suit/element/domain 与关键词承担，
// 因此小牌的 core 是「花色：牌阶寓意」的组合句，不是逐张独立撰写的牌义。
const RANK_META = {
  一: { number: 'A', value: 1, core: '起点，一切刚被点燃' },
  二: { number: '2', value: 2, core: '两股力量之间的平衡' },
  三: { number: '3', value: 3, core: '第一次成形，成果与代价同来' },
  四: { number: '4', value: 4, core: '停下来，把结构暂时稳住' },
  五: { number: '5', value: 5, core: '失衡带来的摩擦' },
  六: { number: '6', value: 6, core: '修复，让事情重新流动' },
  七: { number: '7', value: 7, core: '收成之前的审视与取舍' },
  八: { number: '8', value: 8, core: '把节奏重新握在自己手里' },
  九: { number: '9', value: 9, core: '接近满盈的临界' },
  十: { number: '10', value: 10, core: '一个周期走到收束' },
  侍从: { number: '侍从', value: 11, core: '学徒式的试探' },
  骑士: { number: '骑士', value: 12, core: '带上方向的行动' },
  王后: { number: '王后', value: 13, core: '成熟的照顾与吸引' },
  国王: { number: '国王', value: 14, core: '掌控局面与承担' },
};

// 小牌核心寓意 = 花色 + 牌阶寓意的组合句（花色含义另由 suit/element/domain 承担）

// 牌位：每个位带一句位义说明（positionHint）
const SPREADS = {
  1: [
    { name: '当下指引', hint: '此刻最该被看见、也最该被照做的那一点' },
  ],
  3: [
    { name: '过去', hint: '已经发生、仍在起作用的那部分' },
    { name: '现在', hint: '当下正在发生、你能直接触碰的局面' },
    { name: '未来', hint: '若维持当前走向，事情可能落到的位置' },
  ],
  5: [
    { name: '现状', hint: '眼下真实的地形与手上的资源' },
    { name: '阻碍', hint: '卡住进程、还没被命名的那个结' },
    { name: '建议', hint: '可以主动调整的方向与做法' },
    { name: '结果', hint: '按当前路径走下去的大致落点' },
    { name: '潜在', hint: '尚未浮出水面、却在暗中推动的部分' },
  ],
};

const COURT = ['侍从', '骑士', '王后', '国王'];
const ELEMENT_ORDER = ['火', '水', '风', '土'];
const ELEM_NAME = { 火: '热情与行动', 水: '情感与关系', 风: '思维与沟通', 土: '现实与资源' };
const ELEM_TIP = {
  火: '先做一件让自己动起来的小事，别等状态',
  水: '给情绪留出说话的时间，别急着讲道理',
  风: '把想法写下来再判断，别只在脑子里绕',
  土: '落成一个可执行的步骤，写明时间和预算',
};
const ELEM_WARN = {
  火: '容易过火，别把热情变成压人',
  水: '别被情绪淹没，先分清哪部分是自己的',
  风: '想得太多，记得回到事实和身体',
  土: '别太保守到错过窗口',
};

// 位义结合句：回答「这一位上的这张牌在提醒什么」
const POS_TAIL = {
  当下指引: '此刻能做的，就是照着这一面去调整今天的一个具体动作。',
  过去: '它已经发生，但余波仍在决定你现在怎么出手。',
  现在: '这是你此刻可以直接触碰、也可以调整的部分。',
  未来: '若维持现在的走法会往这里靠，但它还不是定局。',
  现状: '先把这一层看清楚，再谈要不要动。',
  阻碍: '它不一定在外面，很多时候是你不肯命名的那一部分。',
  建议: '这条可以当作接下来几天的小实验，而不是教条。',
  结果: '它是当前路径的延长线，换一条路径就会换落点。',
  潜在: '它还没浮出水面，却已经在左右你的选择。',
};

const SYSTEM_NOTE = '塔罗为象征系统，牌义与元素对应存在流派差异；此处采用 RWS（韦特）牌名/编号与黄金黎明的元素归属，仅供自我觉察与娱乐。';

function tarotDeck() {
  const deck = [];
  MAJOR.forEach(([name, numeral, up, down], i) => {
    const [element, core] = MAJOR_EXT[i];
    deck.push({ name, arcana: '大阿卡纳', element, number: numeral, value: i, core, up, down });
  });
  for (const [suit, element, domain] of SUITS) {
    for (const [rankCn, up, down] of MINOR[suit]) {
      const meta = RANK_META[rankCn];
      deck.push({
        name: `${suit}${rankCn}`,
        arcana: '小阿卡纳',
        element,
        domain,
        suit,
        rank: meta.number,
        rankCn,
        number: meta.number,
        value: meta.value,
        core: `${suit}：${meta.core}`,
        up,
        down,
      });
    }
  }
  return deck;
}

// 名称 → 牌面数据（解读时按名字回查，保证确定性、且不依赖调用方是否带全字段）
const BY_NAME = new Map(tarotDeck().map((c) => [c.name, c]));

const splitKeywords = (s) => String(s || '').split(/\s+/).filter(Boolean);

/** 抽牌时刻（只做记录，不影响牌面） */
function stamp(at) {
  if (typeof at === 'string' && at.trim()) return at.trim().replace('T', ' ').slice(0, 16);
  const d = new Date();
  const p = (x) => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

/**
 * 生成解读（确定性：同样的 question + cards 必得同样的段落）
 * 段落数固定 6-8：开场 / 逐张（1-3 张各一段；5 张按 2+3 分两段）/ 结构 / 关键牌 / 建议 / 收尾
 */
function tarotReading({ question = '', cards = [] } = {}) {
  const q = String(question || '').trim();
  const list = (Array.isArray(cards) ? cards : []).filter((c) => c && c.name);
  const n = list.length;
  if (!n) return ['没有抽到牌面，无法解读。'];

  const names = list.map((c) => c.name).join(' / ');
  const paras = [];

  // ① 开场：所问 + 象征系统声明
  paras.push(q
    ? `你问的是「${q}」，抽到的是 ${n} 张牌阵（${names}）。塔罗是一套象征系统而不是判决：不同流派对牌义、编号与逆位的取舍略有差异，这里按 RWS（韦特）牌名与黄金黎明的元素对应来读，请把下面的话当作镜子，对照自己的处境取用。`
    : `这次没有具体提问，那就先看牌面本身在说什么。牌阵 ${n} 张（${names}）。塔罗是象征系统，牌义随流派略有差异，这里按 RWS（韦特）与黄金黎明的常见对应来读，读到合用的部分就好。`);

  // ② 逐张：位义 + 牌名/正逆 + 关键词 + 一句与位义结合的解读
  //    1-3 张时每张一段；4 张以上按前后两段分组（前段取 ceil(n/2) 张），
  //    保证总段数落在 6-8：1 张=6、2 张=7、3 张=8、≥4 张=7
  const idx = list.map((_, i) => i);
  const groups = n <= 3 ? idx.map((i) => [i]) : [idx.slice(0, Math.ceil(n / 2)), idx.slice(Math.ceil(n / 2))];
  for (const group of groups) {
    const lines = group.map((i) => {
      const c = list[i];
      const meta = BY_NAME.get(c.name) || {};
      const kws = (c.keywords && c.keywords.length ? c.keywords : splitKeywords(c.upright ? meta.up : meta.down)).join('、');
      const ori = c.upright === false ? '逆位' : '正位';
      const oriNote = c.upright === false
        ? '逆位并不等于凶，更像这股力量还没顺过来，或用力过了头'
        : '正位，这股力量目前是通的';
      const hint = c.positionHint || (SPREADS[n] && SPREADS[n][i] ? SPREADS[n][i].hint : '这一位要看的是它在你处境里的位置');
      const core = meta.core ? `它的核心是「${meta.core}」，` : '';
      const tail = POS_TAIL[c.position] || '把它放回你的处境里对照，看看哪一句戳中了你。';
      return `${c.position}（${hint}）是「${c.name}」${ori}：${kws}。${core}${oriNote}。${tail}`;
    });
    paras.push(lines.join(''));
  }

  // ③ 结构分析：大牌占比、元素/花色分布、宫廷牌、正逆位比例
  const majorCount = list.filter((c) => c.arcana === '大阿卡纳').length;
  const revCount = list.filter((c) => c.upright === false).length;
  const upCount = n - revCount;
  const elementCount = {};
  for (const c of list) {
    const e = (BY_NAME.get(c.name) || {}).element || c.element;
    if (e) elementCount[e] = (elementCount[e] || 0) + 1;
  }
  const present = ELEMENT_ORDER.filter((e) => elementCount[e]);
  const missing = ELEMENT_ORDER.filter((e) => !elementCount[e]);
  const dominant = present.slice().sort((a, b) => elementCount[b] - elementCount[a])[0];
  const heavy = dominant && elementCount[dominant] * 2 >= n;
  const majorHalf = majorCount * 2 >= n;
  const courtCount = list.filter((c) => COURT.includes(c.rank) || COURT.includes(c.rankCn)).length;
  const pct = Math.round((majorCount / n) * 100);
  const distribution = present.map((e) => `${e}×${elementCount[e]}`).join('、');
  paras.push([
    `${n} 张里有 ${majorCount} 张大阿卡纳（占 ${pct}%），${majorHalf
      ? '达到或超过半数，说明这是「主题层面的大事」，牵动的多半是方向与阶段，而不是细节执行'
      : '不到半数，重点更偏日常层面的推进，先看具体的人与事'}。`,
    `元素分布：${distribution || '无'}（大牌按黄金黎明的元素归属计入，仅作象征参考）；${missing.length
      ? `缺${missing.map((e) => `${e}（${ELEM_NAME[e]}）`).join('、')}，这一块容易被忽略`
      : '四种元素都在，配比还算均衡'}${heavy ? `。${dominant}偏旺，这股力量用得过头会压住别的部分` : ''}。`,
    `宫廷牌 ${courtCount} 张，${courtCount
      ? '说明局面里有具体的人（也可能是你某个侧面的状态）在推动'
      : '没有明显人格化的角色，事情更靠情势本身在走'}；正逆位 ${upCount} 正 ${revCount} 逆，${upCount > revCount
      ? '整体偏顺，逆位那张是全盘的关节'
      : upCount === revCount ? '顺逆各半，正处在拉扯与转换中' : '阻力偏多，先把卡住的部分读透，再谈推进'}。`,
  ].join(''));

  // ④ 关键牌：第一张大阿卡纳；若无则第一张逆位；两者都无则第一张
  const majorCard = list.find((c) => c.arcana === '大阿卡纳');
  const revCard = list.find((c) => c.upright === false);
  const key = majorCard || revCard || list[0];
  const keyMeta = BY_NAME.get(key.name) || {};
  const keyReason = majorCard
    ? '它出现的地方，往往就是这件事真正被牵动的层级'
    : revCard
      ? '全盘没有大阿卡纳，关节就落在第一张逆位上——那股还没顺过来的力量'
      : '全盘既没有大阿卡纳也没有逆位，走势平顺，就以第一张为参照';
  paras.push(`全盘的关节是「${key.name}」（${key.position}·${key.upright === false ? '逆位' : '正位'}）${keyMeta.core ? `，${keyMeta.core}` : ''}。${keyReason}；其余几张可以看作它在不同位置上的回声。`);

  // ⑤ 建议：据牌面给 2-3 条可执行的行动建议
  const tips = [];
  if (revCard) tips.push(`先把「${revCard.name}」逆位指出的卡点处理掉（${(revCard.keywords || []).join('、')}），暂时不要加码推进`);
  if (majorHalf) tips.push('把问题从「怎么办」换成「要不要」：先定方向，方法再慢慢补');
  else tips.push('把注意力放回能立刻做的小事上，先动一件，再看牌面怎么变');
  if (missing.length) tips.push(`补一点${missing[0]}的力量：${ELEM_TIP[missing[0]]}`);
  else if (heavy) tips.push(`${dominant}已经偏旺，${ELEM_WARN[dominant]}`);
  const adviceCard = list.find((c) => c.position === '建议');
  if (adviceCard) tips.push(`把「${adviceCard.name}」${adviceCard.orientation}的关键词（${(adviceCard.keywords || []).join('、')}）当作接下来一周的小练习`);
  const picked = tips.slice(0, 3);
  paras.push(`建议：其一，${picked[0]}；其二，${picked[1]}${picked[2] ? `；其三，${picked[2]}` : ''}。`);

  // ⑥ 收尾：免责声明
  paras.push('牌是镜子，照出的是你此刻的状态与盲点，不是命运的判决书。涉及医疗、法律、财务等重大决定，请务必咨询对应的专业人士，牌面只用来帮你把问题问清楚。');

  return paras;
}

/** 抽牌：count 张，按牌阵给出位置 */
function drawTarot({ count = 3, question = '', at } = {}) {
  const n = [1, 3, 5].includes(count) ? count : 3;
  const deck = tarotDeck();
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  const positions = SPREADS[n];
  const cards = deck.slice(0, n).map((c, i) => {
    const upright = Math.random() < 0.5;
    const pos = positions[i];
    return {
      position: pos.name,
      positionHint: pos.hint,
      name: c.name,
      arcana: c.arcana,
      element: c.element,
      ...(c.domain ? { domain: c.domain } : {}),
      ...(c.suit ? { suit: c.suit } : {}),
      number: c.number,
      ...(c.rank ? { rank: c.rank } : {}),
      ...(c.rankCn ? { rankCn: c.rankCn } : {}),
      value: c.value,
      core: c.core,
      upright,
      orientation: upright ? '正位' : '逆位',
      keywords: splitKeywords(upright ? c.up : c.down),
    };
  });
  const q = (question || '').trim();
  return {
    system: 'tarot',
    question: q || null,
    castAt: stamp(at),
    spread: `${n} 张牌阵（${positions.map((p) => p.name).join(' / ')}）`,
    cards,
    reading: tarotReading({ question: q, cards }),
    systemNote: SYSTEM_NOTE,
  };
}



return { MAJOR, SUITS, MINOR, ROMAN, SPREADS, tarotDeck, tarotReading, drawTarot };
})();

__mods.meihua = (function () {
// 梅花易数：时间/数字起卦、体用、互卦、变卦、错综卦
const { BRANCHES } = __mods.calendar;
const { solarToLunar } = __mods.lunar;
const { hexagramFromBits } = __mods.liuyao;

// 先天八卦数：乾1 兑2 离3 震4 巽5 坎6 艮7 坤8
const TRI_NAME = ['', '乾', '兑', '离', '震', '巽', '坎', '艮', '坤'];
const TRI_BITS = {
  乾: [1, 1, 1], 兑: [1, 1, 0], 离: [1, 0, 1], 震: [1, 0, 0],
  巽: [0, 1, 1], 坎: [0, 1, 0], 艮: [0, 0, 1], 坤: [0, 0, 0],
};
const TRI_ELEMENT = { 乾: '金', 兑: '金', 离: '火', 震: '木', 巽: '木', 坎: '水', 艮: '土', 坤: '土' };
const GENERATES = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };
const OVERCOMES = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };

const mod8 = (n) => ((n % 8) + 7) % 8 + 1; // 1..8，余 0 作 8
const mod6 = (n) => ((n % 6) + 5) % 6 + 1; // 1..6，余 0 作 6

function bitsOf(num) {
  return TRI_BITS[TRI_NAME[num]];
}

function hexName(upperNum, lowerNum) {
  const bits = [...bitsOf(lowerNum), ...bitsOf(upperNum)];
  const h = hexagramFromBits(bits);
  return { name: h.name, upper: TRI_NAME[upperNum], lower: TRI_NAME[lowerNum], bits };
}

/** 体用关系 */
function relation(bodyEl, useEl) {
  if (bodyEl === useEl) return { level: '吉', text: '体用比和，事顺而稳' };
  if (GENERATES[useEl] === bodyEl) return { level: '大吉', text: `用生体（${useEl}生${bodyEl}），得外力相助` };
  if (GENERATES[bodyEl] === useEl) return { level: '小凶', text: `体生用（${bodyEl}生${useEl}），耗损付出` };
  if (OVERCOMES[bodyEl] === useEl) return { level: '吉', text: `体克用（${bodyEl}克${useEl}），事可为但费力` };
  return { level: '凶', text: `用克体（${useEl}克${bodyEl}），受阻受制` };
}

/**
 * 起卦
 * @param {object} input
 *   mode: 'time' | 'number'
 *   datetime: 'YYYY-MM-DDTHH:mm'（time 模式）
 *   upper/lower/changing: 数字（number 模式，可给两数由程序取余）
 */
function buildMeihua(input = {}) {
  const mode = input.mode === 'number' ? 'number' : 'time';
  let upperNum;
  let lowerNum;
  let moving;
  let source;

  if (mode === 'number') {
    const a = Number(input.upper);
    const b = Number(input.lower);
    if (!Number.isFinite(a) || !Number.isFinite(b)) throw new Error('数字起卦需要两个数字（upper / lower）');
    upperNum = mod8(a);
    lowerNum = mod8(b);
    moving = Number.isFinite(Number(input.changing)) && Number(input.changing) > 0
      ? mod6(Number(input.changing))
      : mod6(a + b);
    source = `数字起卦：${a} / ${b}`;
  } else {
    const dt = parseDateTime(input.datetime);
    const lunar = solarToLunar(dt.year, dt.month, dt.day);
    const yearBranch = ((lunar.lunarYear - 4) % 12 + 12) % 12;
    const hb = Math.floor(((dt.hour + 1) % 24) / 2);
    const sum1 = yearBranch + 1 + lunar.month + lunar.day;
    const sum2 = sum1 + hb + 1;
    upperNum = mod8(sum1);
    lowerNum = mod8(sum2);
    moving = mod6(sum2);
    source = `时间起卦：${BRANCHES[yearBranch]}年${lunar.month}月${lunar.day}日${BRANCHES[hb]}时`;
  }

  const ben = hexName(upperNum, lowerNum);
  const bits = ben.bits;

  // 动爻：自下而上第 moving 爻
  const changedBits = bits.slice();
  changedBits[moving - 1] = changedBits[moving - 1] ? 0 : 1;
  const bian = hexagramFromBits(changedBits);

  // 互卦：2·3·4 为下互，3·4·5 为上互
  const huLower = [bits[1], bits[2], bits[3]];
  const huUpper = [bits[2], bits[3], bits[4]];
  const hu = hexagramFromBits([...huLower, ...huUpper]);

  // 体用：动爻所在之卦为用，另一卦为体
  const movingInUpper = moving >= 4;
  const bodyTri = movingInUpper ? ben.lower : ben.upper;
  const useTri = movingInUpper ? ben.upper : ben.lower;
  const rel = relation(TRI_ELEMENT[bodyTri], TRI_ELEMENT[useTri]);

  // 错卦（六爻全变）、综卦（上下颠倒）
  const cuoBits = bits.map((b) => (b ? 0 : 1));
  const zongBits = [...bits.slice(3), ...bits.slice(0, 3)];
  const cuo = hexagramFromBits(cuoBits);
  const zong = hexagramFromBits(zongBits);

  return {
    system: 'meihua',
    mode,
    source,
    moving,
    movingName: ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'][moving - 1],
    ben: { name: ben.name, upper: ben.upper, lower: ben.lower, element: `${TRI_ELEMENT[ben.upper]}/${TRI_ELEMENT[ben.lower]}` },
    hu: { name: hu.name, upper: hu.upper, lower: hu.lower },
    bian: { name: bian.name, upper: bian.upper, lower: bian.lower },
    cuo: { name: cuo.name },
    zong: { name: zong.name },
    bodyUse: {
      body: { trigram: bodyTri, element: TRI_ELEMENT[bodyTri] },
      use: { trigram: useTri, element: TRI_ELEMENT[useTri] },
      relation: rel.text,
      level: rel.level,
    },
    lines: bits.map((b, i) => ({
      position: i + 1,
      name: ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'][i],
      yinYang: b ? '阳' : '阴',
      moving: i === moving - 1,
    })),
  };
}

function parseDateTime(text) {
  if (typeof text !== 'string' || !text.trim()) throw new Error('时间起卦需要 datetime');
  const m = text.trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T\s](\d{1,2}):(\d{1,2}))?$/);
  if (!m) throw new Error(`无法解析 datetime：「${text}」`);
  return {
    year: Number(m[1]), month: Number(m[2]), day: Number(m[3]),
    hour: Number(m[4] ?? 0), minute: Number(m[5] ?? 0),
  };
}



return { TRI_NAME, TRI_ELEMENT, TRI_BITS, buildMeihua };
})();

__mods.daliuren = (function () {
// 大六壬：天地盘、四课、九宗门三传。
// 算法移植自本地 MIT 授权插件 @dhicoc/dsh-chinese-traditional-wisdom-skill 的
// daliurenEngine.ts（仅取 classic 流派：贵人顺逆以天盘临方判定）。
const { toJDN, dayGanzhiIndex, ganzhiName, termWindow, formatJd } = __mods.calendar;

const GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const TIAN_JIANG = ['贵', '蛇', '雀', '合', '勾', '龙', '空', '虎', '常', '玄', '阴', '后'];
const JIANG_FULL = {
  贵: '贵人', 蛇: '螣蛇', 雀: '朱雀', 合: '六合', 勾: '勾陈', 龙: '青龙',
  空: '天空', 虎: '白虎', 常: '太常', 玄: '玄武', 阴: '太阴', 后: '天后',
};
const YUE_JIANG_NAME = {
  亥: '登明', 戌: '河魁', 酉: '从魁', 申: '传送', 未: '小吉', 午: '胜光',
  巳: '太乙', 辰: '天罡', 卯: '太冲', 寅: '功曹', 丑: '大吉', 子: '神后',
};

const GAN_WUXING = { 甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土', 己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水' };
const ZHI_WUXING = { 子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火', 午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水' };

const SHENG = { 金: '水', 水: '木', 木: '火', 火: '土', 土: '金' };
const KE = { 金: '木', 木: '土', 土: '水', 水: '火', 火: '金' };

function wuxingRelation(shang, xia) {
  if (shang === xia) return '比和';
  if (KE[shang] === xia) return '克';
  if (KE[xia] === shang) return '被克';
  if (SHENG[shang] === xia) return '生';
  if (SHENG[xia] === shang) return '被生';
  return '比和';
}

const LIUQIN_MAP = { 被生: '父母', 生: '子孙', 克: '妻财', 比和: '兄弟', 被克: '官鬼' };

const GAN_JI_GONG = { 甲: '寅', 乙: '辰', 丙: '巳', 丁: '未', 戊: '巳', 己: '未', 庚: '申', 辛: '戌', 壬: '亥', 癸: '丑' };

const YANG_POS = ['巳', '午', '未', '申', '酉', '戌'];

const JIEQI_YUE_JIANG = {
  雨水: '亥', 惊蛰: '亥', 春分: '戌', 清明: '戌', 谷雨: '酉', 立夏: '酉',
  小满: '申', 芒种: '申', 夏至: '未', 小暑: '未', 大暑: '午', 立秋: '午',
  处暑: '巳', 白露: '巳', 秋分: '辰', 寒露: '辰', 霜降: '卯', 立冬: '卯',
  小雪: '寅', 大雪: '寅', 冬至: '丑', 小寒: '丑', 大寒: '子', 立春: '子',
};

const GUIREN_START = {
  甲: { day: '丑', night: '未' }, 戊: { day: '丑', night: '未' }, 庚: { day: '丑', night: '未' },
  乙: { day: '子', night: '申' }, 己: { day: '子', night: '申' },
  丙: { day: '亥', night: '酉' }, 丁: { day: '亥', night: '酉' },
  壬: { day: '巳', night: '卯' }, 癸: { day: '巳', night: '卯' },
  辛: { day: '午', night: '寅' },
};

const DAY_NIGHT_MAP = {
  卯: '昼', 辰: '昼', 巳: '昼', 午: '昼', 未: '昼', 申: '昼',
  酉: '夜', 戌: '夜', 亥: '夜', 子: '夜', 丑: '夜', 寅: '夜',
};

const XUN_KONG = {
  甲子: ['戌', '亥'], 甲戌: ['申', '酉'], 甲申: ['午', '未'],
  甲午: ['辰', '巳'], 甲辰: ['寅', '卯'], 甲寅: ['子', '丑'],
};

const JIA_ZI_60 = Array.from({ length: 60 }, (_, i) => GAN[i % 10] + ZHI[i % 12]);

const ZHI_CHONG = { 子: '午', 午: '子', 丑: '未', 未: '丑', 寅: '申', 申: '寅', 卯: '酉', 酉: '卯', 辰: '戌', 戌: '辰', 巳: '亥', 亥: '巳' };
const YI_MA = { 寅: '申', 午: '申', 戌: '申', 申: '寅', 子: '寅', 辰: '寅', 巳: '亥', 酉: '亥', 丑: '亥', 亥: '巳', 卯: '巳', 未: '巳' };

const BA_ZHUAN_DAYS = ['壬子', '甲寅', '乙卯', '丁巳', '己未', '庚申', '辛酉', '癸亥'];
const GAN_ZHI_SAME_POSITION = ['甲寅', '丁未', '己未', '庚申', '癸丑'];

const yinYang = (s) => (['甲', '丙', '戊', '庚', '壬'].includes(s) || ['子', '寅', '辰', '午', '申', '戌'].includes(s) ? '阳' : '阴');

function tianDiPan(jieqiName, hourZhi, dayGan) {
  const yueJiang = JIEQI_YUE_JIANG[jieqiName] ?? '子';
  const hourIndex = ZHI.indexOf(hourZhi);
  const yueJiangIndex = ZHI.indexOf(yueJiang);
  const tianPan = new Array(12);
  for (let i = 0; i < 12; i++) {
    tianPan[(hourIndex + i) % 12] = ZHI[(yueJiangIndex + i) % 12];
  }
  const dayNight = DAY_NIGHT_MAP[hourZhi] ?? '昼';
  const cfg = GUIREN_START[dayGan];
  const guirenStart = dayNight === '昼' ? cfg.day : cfg.night;
  const guirenIndex = ZHI.indexOf(guirenStart);
  const guirenTianZhi = tianPan[guirenIndex];
  const isReverse = YANG_POS.includes(guirenTianZhi);
  const tianJiang = new Array(12);
  if (isReverse) {
    const rev = ['贵', '后', '阴', '玄', '常', '虎', '空', '龙', '勾', '合', '雀', '蛇'];
    for (let i = 0; i < 12; i++) tianJiang[(guirenIndex + i) % 12] = rev[i];
  } else {
    for (let i = 0; i < 12; i++) tianJiang[(guirenIndex + i) % 12] = TIAN_JIANG[i];
  }
  const diToTian = {};
  const diToJiang = {};
  for (let i = 0; i < 12; i++) {
    diToTian[ZHI[i]] = tianPan[i];
    diToJiang[ZHI[i]] = tianJiang[i];
  }
  return { tianPan, diToTian, diToJiang, yueJiang, dayNight, guirenStart, isReverse };
}

function keRelation(shang, xia) {
  const sw = ZHI_WUXING[shang] ?? GAN_WUXING[shang] ?? '土';
  const xw = ZHI_WUXING[xia] ?? GAN_WUXING[xia] ?? '土';
  const rel = wuxingRelation(sw, xw);
  return { 克: '上克下', 被克: '下贼上', 生: '上生下', 被生: '下生上', 比和: '比和' }[rel] ?? '比和';
}

function siKe(dayGan, dayZhi, tdp) {
  const { diToTian, diToJiang } = tdp;
  const jiGong = GAN_JI_GONG[dayGan];
  const yi = diToTian[jiGong];
  const er = diToTian[yi];
  const san = diToTian[dayZhi];
  const si = diToTian[san];
  const mk = (pos, shang, xia) => ({
    position: pos,
    shang,
    xia,
    jiang: diToJiang[GAN_JI_GONG[xia] ?? xia] ?? '',
    relation: keRelation(shang, xia),
  });
  return [mk(1, yi, dayGan), mk(2, er, yi), mk(3, san, dayZhi), mk(4, si, san)];
}

function analyze(ke) {
  const s = { shangKeXia: 0, xiaZeiShang: 0 };
  for (const k of ke) {
    if (k.relation === '上克下') s.shangKeXia++;
    else if (k.relation === '下贼上') s.xiaZeiShang++;
  }
  return s;
}

function xunKong(dayGz, zhi) {
  const idx = JIA_ZI_60.indexOf(dayGz);
  if (idx < 0) return null;
  const head = JIA_ZI_60[Math.floor(idx / 10) * 10];
  return (XUN_KONG[head] || []).includes(zhi) ? zhi : null;
}

function chuan(pos, zhi, tdp, dayGan, dayGz) {
  const rel = wuxingRelation(GAN_WUXING[dayGan] ?? '土', ZHI_WUXING[zhi] ?? '土');
  return {
    position: pos,
    zhi,
    jiang: tdp.diToJiang[zhi] ?? '',
    jiangFull: JIANG_FULL[tdp.diToJiang[zhi]] ?? '',
    liuQin: LIUQIN_MAP[rel] ?? '兄弟',
    xunKong: xunKong(dayGz, zhi),
  };
}

function checkFanYin(tdp) {
  let cnt = 0;
  for (let i = 0; i < 12; i++) if (ZHI_CHONG[ZHI[i]] === tdp.diToTian[ZHI[i]]) cnt++;
  return cnt >= 6;
}

function sheHaiDepth(shang, xia) {
  const sw = ZHI_WUXING[shang] ?? '土';
  const start = ZHI.indexOf(xia);
  const end = ZHI.indexOf(shang);
  let cnt = 0;
  let cur = start;
  while (cur !== end) {
    if (wuxingRelation(sw, ZHI_WUXING[ZHI[cur]]) === '克') cnt++;
    cur = (cur - 1 + 12) % 12;
  }
  return cnt;
}

function multipleZeiKe(ke, dayGan, target) {
  const m = ke.filter((k) => k.relation === target);
  if (m.length === 1) return { zhi: m[0].shang, geJu: '贼克', detail: target === '下贼上' ? '重审' : '元首' };
  const yy = yinYang(dayGan);
  const same = m.filter((k) => yinYang(k.shang) === yy);
  if (same.length === 1) return { zhi: same[0].shang, geJu: '比用', detail: '知一' };
  const pool = same.length ? same : m;
  const ranked = pool.map((k) => ({ k, d: sheHaiDepth(k.shang, k.xia) })).sort((a, b) => b.d - a.d);
  const tied = ranked.length >= 2 && ranked[0].d === ranked[1].d;
  return { zhi: ranked[0].k.shang, geJu: '涉害', detail: tied ? '察微' : '见机' };
}

function noZeiKe(ke, tdp, dayGan) {
  const dw = GAN_WUXING[dayGan] ?? '土';
  for (const k of ke) {
    const rel = wuxingRelation(ZHI_WUXING[k.shang] ?? '土', dw);
    if (rel === '克') return { zhi: k.shang, geJu: '遥克', detail: '蒿矢' };
    if (rel === '被克') return { zhi: k.shang, geJu: '遥克', detail: '弹射' };
  }
  return { zhi: tdp.diToTian['酉'], geJu: '昴星', detail: yinYang(dayGan) === '阳' ? '虎视' : '冬蛇掩目' };
}

function fanYin(ke, dayGan, dayZhi, stats, isFB) {
  if (isFB) return { zhi: YI_MA[dayZhi] ?? '寅', detail: '绝嗣' };
  for (const rel of ['下贼上', '上克下']) {
    const m = ke.filter((k) => k.relation === rel);
    if (m.length) {
      const yy = yinYang(dayGan);
      const same = m.filter((k) => yinYang(k.shang) === yy);
      return { zhi: (same[0] ?? m[0]).shang, detail: '无依' };
    }
  }
  return { zhi: YI_MA[dayZhi] ?? '寅', detail: '无亲' };
}

/**
 * 排大六壬课
 * @param {object} input { year, month, day, hour, minute, lateZi? }
 */
function buildDaliuren(input) {
  const { year, month, day, hour = 0, minute = 0 } = input;
  const lateZi = input.lateZi !== false;
  const jdnBase = toJDN(year, month, day);
  const jdn = lateZi && hour >= 23 ? jdnBase + 1 : jdnBase;
  const dayIdx = dayGanzhiIndex(jdn);
  const dayGz = ganzhiName(dayIdx).name;
  const dayGan = dayGz[0];
  const dayZhi = dayGz[1];
  const hourZhi = ZHI[Math.floor(((hour + 1) % 24) / 2)];

  // 月将：取出生时刻之前最近的节气（中气换将）
  const jd = jdnBase - 0.5 + (hour * 60 + minute) / 1440;
  const terms = termWindow(year).filter((t) => t.jd <= jd);
  const last = terms.length ? terms[terms.length - 1] : null;
  const jieqiName = last ? last.name : '冬至';

  const tdp = tianDiPan(jieqiName, hourZhi, dayGan);
  const ke = siKe(dayGan, dayZhi, tdp);

  const stats = analyze(ke);
  const isFuYin = tdp.yueJiang === hourZhi;
  const isFanYin = checkFanYin(tdp);
  const isBaZhuan = BA_ZHUAN_DAYS.includes(dayGz);
  const isSamePos = GAN_ZHI_SAME_POSITION.includes(dayGz);
  const isFanYinBaZhuan = isSamePos && stats.xiaZeiShang === 4;

  let chu;
  let geJu;
  let detail;
  if (isFanYin || isFanYinBaZhuan) {
    const r = fanYin(ke, dayGan, dayZhi, stats, isFanYinBaZhuan);
    chu = r.zhi; geJu = '返吟'; detail = r.detail;
  } else if (isFuYin) {
    chu = yinYang(dayGan) === '阳' ? GAN_JI_GONG[dayGan] : dayZhi;
    geJu = '伏吟'; detail = yinYang(dayGan) === '阳' ? '自任' : '杜传';
  } else if (isBaZhuan && stats.shangKeXia === 0 && stats.xiaZeiShang === 0) {
    const i = ZHI.indexOf(dayZhi);
    chu = ZHI[(i + (yinYang(dayGan) === '阳' ? 2 : -2) + 12) % 12];
    geJu = '八专'; detail = '帷簿';
  } else if (stats.xiaZeiShang === 1 && stats.shangKeXia === 0) {
    chu = ke.find((k) => k.relation === '下贼上').shang; geJu = '贼克'; detail = '重审';
  } else if (stats.shangKeXia === 1 && stats.xiaZeiShang === 0) {
    chu = ke.find((k) => k.relation === '上克下').shang; geJu = '贼克'; detail = '元首';
  } else if (stats.xiaZeiShang >= 1) {
    const r = multipleZeiKe(ke, dayGan, '下贼上');
    chu = r.zhi; geJu = r.geJu; detail = r.detail;
  } else if (stats.shangKeXia >= 2) {
    const r = multipleZeiKe(ke, dayGan, '上克下');
    chu = r.zhi; geJu = r.geJu; detail = r.detail;
  } else if (stats.shangKeXia === 0 && stats.xiaZeiShang === 0) {
    const r = noZeiKe(ke, tdp, dayGan);
    chu = r.zhi; geJu = r.geJu; detail = r.detail;
  } else {
    chu = ke[0].shang; geJu = '贼克'; detail = '元首';
  }

  let zhong;
  let mo;
  if (isFanYin) {
    zhong = ZHI_CHONG[chu];
    mo = ZHI_CHONG[zhong];
  } else {
    zhong = tdp.diToTian[chu];
    mo = tdp.diToTian[zhong];
  }

  return {
    system: 'daliuren',
    input: { year, month, day, hour, minute },
    dayGanZhi: dayGz,
    hourZhi,
    dayNight: tdp.dayNight,
    jieqi: { name: jieqiName, time: last ? formatJd(last.jd) : null },
    yueJiang: { zhi: tdp.yueJiang, name: YUE_JIANG_NAME[tdp.yueJiang] },
    guiren: { zhi: tdp.guirenStart, reverse: tdp.isReverse },
    pan: ZHI.map((d, i) => ({
      di: d,
      tian: tdp.tianPan[i],
      jiang: tdp.diToJiang[d],
      jiangFull: JIANG_FULL[tdp.diToJiang[d]],
    })),
    siKe: ke.map((k) => ({ ...k, jiangFull: JIANG_FULL[k.jiang] ?? '' })),
    sanChuan: {
      chu: chuan('初传', chu, tdp, dayGan, dayGz),
      zhong: chuan('中传', zhong, tdp, dayGan, dayGz),
      mo: chuan('末传', mo, tdp, dayGan, dayGz),
    },
    geJu: { name: geJu, detail },
  };
}



return { ZHI, GAN, TIAN_JIANG, JIANG_FULL, JIEQI_YUE_JIANG, buildDaliuren };
})();

__mods['interpret-data'] = (function () {
// 解析模块的静态文案库：卦意、爻位、主星、五行对应与免责提示
// 全部集中在同一处，便于统一维护与复用（改文案只动这个文件）

// ── 八卦取象（卦名取不到时的兜底组合用）──────────────────────────
const TRIGRAM = {
  乾: { nature: '天', trait: '刚健、主导', element: '金' },
  坤: { nature: '地', trait: '承载、柔顺', element: '土' },
  震: { nature: '雷', trait: '启动、震动', element: '木' },
  巽: { nature: '风', trait: '渗透、顺势', element: '木' },
  坎: { nature: '水', trait: '险陷、流动', element: '水' },
  离: { nature: '火', trait: '明丽、附著', element: '火' },
  艮: { nature: '山', trait: '静止、阻挡', element: '土' },
  兑: { nature: '泽', trait: '愉悦、口舌', element: '金' },
};

// ── 六爻位通则（爻辞白话要点的骨架）─────────────────────────────
const YAO_POSITION = [
  { pos: 1, name: '初爻', gist: '事之始，根基与起点', tone: '宜稳不宜急' },
  { pos: 2, name: '二爻', gist: '初步展开，能力初显', tone: '宜务实积累' },
  { pos: 3, name: '三爻', gist: '进退交界的关口，多劳少得', tone: '宜守拙退让' },
  { pos: 4, name: '四爻', gist: '接近决策层，转机初现', tone: '宜谨慎措辞' },
  { pos: 5, name: '五爻', gist: '得位居中，事态最盛', tone: '宜把握主节奏' },
  { pos: 6, name: '上爻', gist: '发展至极，盛极思变', tone: '宜留余地收尾' },
];

// ── 动爻性质───────────────────────────────────────────────
const MOVING_NATURE = {
  yang: '阳极转阴：原本强势、推进得很快的那个环节，接下来需要收一收、留余地',
  yin: '阴极转阳：原本停滞、迟迟没动静的那个环节，接下来会出现变化，可以主动推一把',
};

// ── 六十四卦白话卦意与生活落点────────────────────────────────
// meaning：《周易》卦辞大意的白话转述；scene：落到生活场景的一句话
const HEX64 = {
  乾为天: { meaning: '刚健运行，自强不息', scene: '主动权在你手上，宜自己定节奏' },
  坤为地: { meaning: '厚德载物，顺势而成', scene: '配合与承接比抢先更有利' },
  水雷屯: { meaning: '初生艰难，如草木破土', scene: '事情刚起步会乱，先把基础扎稳' },
  山水蒙: { meaning: '蒙昧待启，问道则通', scene: '信息不全时先请教，不要硬闯' },
  水天需: { meaning: '等待时机，不可冒进', scene: '条件没齐，耐心等一等反而快' },
  天水讼: { meaning: '争讼之象，宜和解', scene: '有分歧先谈，别把关系推上对抗' },
  地水师: { meaning: '用众之道，纪律为先', scene: '靠团队成事，规矩要立在前' },
  水地比: { meaning: '亲附相辅，择善而从', scene: '选对合作对象，比单打独斗重要' },
  风天小畜: { meaning: '小有积蓄，力量未充', scene: '先攒资源，暂不大举投入' },
  天泽履: { meaning: '循礼而行，如履虎尾', scene: '按规则走，谨慎就不会出事' },
  地天泰: { meaning: '上下交泰，通达和顺', scene: '沟通顺畅，是推进的好时候' },
  天地否: { meaning: '阴阳不交，闭塞不通', scene: '卡住时先停下来，别硬顶' },
  天火同人: { meaning: '与人同心，众志可成', scene: '找同频的人一起做，事半倍' },
  火天大有: { meaning: '丰盛富有，如日中天', scene: '收获可观，记得分享与收敛' },
  地山谦: { meaning: '谦逊受益，卑以自牧', scene: '放低姿态，反而更容易被接纳' },
  雷地豫: { meaning: '悦乐振奋，顺势而动', scene: '士气高，适合启动与造势' },
  泽雷随: { meaning: '随时而动，择善而随', scene: '跟随大势走，别拧着来' },
  山风蛊: { meaning: '积弊待治，破而后立', scene: '旧问题该清一清了，别拖' },
  地泽临: { meaning: '居高临下，督导亲近', scene: '亲自盯一盯，效果比放手好' },
  风地观: { meaning: '观仰教化，观察而明', scene: '先看清楚再表态' },
  火雷噬嗑: { meaning: '咬合去梗，明断是非', scene: '障碍要正面处理，绕不过去' },
  山火贲: { meaning: '文饰之美，适度为宜', scene: '包装有用，但别盖过实质' },
  山地剥: { meaning: '剥落衰败，宜守不宜进', scene: '在消耗期，止损优先' },
  地雷复: { meaning: '一阳来复，去而复返', scene: '转机回来了，可以小步重启' },
  天雷无妄: { meaning: '不妄为，守正即吉', scene: '按本分做，别投机' },
  山天大畜: { meaning: '大有蓄养，厚积待发', scene: '积累期，学东西最有价值' },
  山雷颐: { meaning: '养正自守，节饮食慎言语', scene: '养身体、养口碑，别透支' },
  泽风大过: { meaning: '过甚有险，栋梁将折', scene: '担子太重，该减负或加固' },
  坎为水: { meaning: '重险叠至，惟诚可济', scene: '困难接连来，稳住心神最要紧' },
  离为火: { meaning: '附丽光明，柔顺守中', scene: '借助光亮的东西，别孤军奋战' },
  泽山咸: { meaning: '感应相和，男女相悦', scene: '情感互动顺畅，宜真诚表达' },
  雷风恒: { meaning: '恒久不易，持之则成', scene: '长期坚持才有结果' },
  天山遁: { meaning: '退避为智，以退为进', scene: '适时抽身，不是认输' },
  雷天大壮: { meaning: '阳刚壮盛，宜正不宜猛', scene: '气势足，但别用力过猛' },
  火地晋: { meaning: '晋升初进，如日上升', scene: '有上升机会，主动争取' },
  地火明夷: { meaning: '光明受掩，韬光养晦', scene: '暂时低调，保存实力' },
  风火家人: { meaning: '内治为先，各安其位', scene: '先把身边人和日常安顿好' },
  火泽睽: { meaning: '睽违背离，同中有异', scene: '意见不合是常态，求同存异' },
  水山蹇: { meaning: '蹇难阻滞，宜反身修德', scene: '走不通就绕，回头补短板' },
  雷水解: { meaning: '险难消解，宜速不宜缓', scene: '结打开了，趁势把事办了' },
  山泽损: { meaning: '损己益人，损中有得', scene: '先让一点，后面有回报' },
  风雷益: { meaning: '增益利民，顺势施为', scene: '投入会有产出，可以加码' },
  泽天夬: { meaning: '决而去之，果决除弊', scene: '该断的事果断断，别拖泥带水' },
  天风姤: { meaning: '不期而遇，柔遇刚', scene: '有意外的人或机会出现' },
  泽地萃: { meaning: '聚合众力，物以类聚', scene: '聚人聚资源的时候到了' },
  地风升: { meaning: '积小以高大，循序上升', scene: '一步一步往上走，别跳级' },
  泽水困: { meaning: '困穷待援，安贫守正', scene: '资源受限时先守住基本盘' },
  水风井: { meaning: '井养不穷，修井得清', scene: '把现有的渠道维护好' },
  泽火革: { meaning: '革故鼎新，时至则变', scene: '该改就改，时机已经到了' },
  火风鼎: { meaning: '鼎新烹饪，稳重得位', scene: '新格局已立，按新规矩办' },
  震为雷: { meaning: '震惊百里，惧而后安', scene: '突发变动会来，先稳住再应对' },
  艮为山: { meaning: '止其所止，静而定', scene: '该停就停，停下来才看得清' },
  风山渐: { meaning: '渐进有序，如鸿渐于陆', scene: '慢慢来反而到得快' },
  雷泽归妹: { meaning: '归嫁失序，宜守本分', scene: '关系里别越位，按本分处' },
  雷火丰: { meaning: '丰大光明，宜及时施为', scene: '盛时要做事，别浪费势头' },
  火山旅: { meaning: '旅居在外，谨慎自守', scene: '处在变动环境，低调稳当些' },
  巽为风: { meaning: '顺入以柔，申命行事', scene: '用柔的方式渗透，别硬碰' },
  兑为泽: { meaning: '喜悦相悦，朋友讲习', scene: '多交流多请教，气氛是好的' },
  风水涣: { meaning: '涣散离散，宜聚人心', scene: '人心散了，先把共识找回来' },
  水泽节: { meaning: '节制有度，苦节不可', scene: '设边界、控节奏，别过头' },
  风泽中孚: { meaning: '诚信居中，信则人任', scene: '诚意是当下最有效的通行证' },
  雷山小过: { meaning: '小事可过，大事不可', scene: '细节可以灵活，大方向别偏' },
  水火既济: { meaning: '事已成，慎终如始', scene: '做成之后更要防松懈' },
  火水未济: { meaning: '事未成，慎辨慎行', scene: '还差一步，别急着庆祝' },
};

// 卦名（去掉上下卦象后的核心名）→ 全名索引，用于容错匹配
const HEX_BY_CORE = Object.fromEntries(
  Object.keys(HEX64).map((full) => {
    const core = full.length > 2 ? full.slice(2) : full.slice(0, 1);
    return [core, full];
  })
);

// ── 紫微十四主星：性格底色 / 职业倾向 / 感情 / 健康留意─────────────
const ZIWEI_STARS = {
  紫微: {
    trait: '有主见、重体面，习惯站在统筹的位置',
    work: '适合需要拍板与统筹的岗位，管理、政务、项目负责一类',
    love: '在关系里需要被尊重，慢热但认真',
    health: '留意血压与作息紊乱',
  },
  天机: {
    trait: '脑子转得快，兴趣多、想法多',
    work: '适合策划、技术、咨询、研发一类动脑的岗位',
    love: '容易被有趣的人吸引，需要精神共鸣',
    health: '思虑多，留意神经紧张与睡眠',
  },
  太阳: {
    trait: '外放热心，愿意付出、也愿意被看见',
    work: '适合对外型岗位，教学、销售、公关、公益一类',
    love: '主动付出型，注意别一厢情愿',
    health: '留意心血管与用眼过度',
  },
  武曲: {
    trait: '务实、讲效率，认结果不认空话',
    work: '适合金融、财务、工程、执行类岗位',
    love: '感情表达偏实在，用行动多于言语',
    health: '留意呼吸系统与过劳',
  },
  天同: {
    trait: '温和好相处，重感受，凡事求舒服',
    work: '适合服务、文职、教育、文创一类低对抗的岗位',
    love: '需要陪伴感，容易被温柔的人打动',
    health: '留意免疫力与情绪性不适',
  },
  廉贞: {
    trait: '细腻又较真，审美与原则都在意',
    work: '适合需要精细度的岗位，法务、审计、设计、医疗一类',
    love: '感情投入深，也容易较劲',
    health: '留意炎症与情绪郁结',
  },
  天府: {
    trait: '稳重可靠，善于守成与资源调度',
    work: '适合行政、财务、运营、仓储一类守盘型岗位',
    love: '倾向稳定长久的关系',
    health: '留意体重与消化负担',
  },
  太阴: {
    trait: '内敛敏感，心思细，重安全感',
    work: '适合研究、文案、财务、艺术一类安静专注的岗位',
    love: '慢热、重细节，需要被照顾到感受',
    health: '留意睡眠与内分泌节律',
  },
  贪狼: {
    trait: '好奇心强、人缘好，兴趣广泛',
    work: '适合业务、市场、传媒、跨界的开拓型岗位',
    love: '桃花偏旺，需要自己划清边界',
    health: '留意肝火与作息不规律',
  },
  巨门: {
    trait: '善于分析，也容易多疑，嘴上功夫好',
    work: '适合法务、教学、咨询、谈判一类靠口才与逻辑的岗位',
    love: '容易因多想而生误会，宜多说清楚',
    health: '留意口腔、呼吸道与思虑过度',
  },
  天相: {
    trait: '讲规矩、重协调，习惯做辅佐者',
    work: '适合秘书、执行、协调、后勤一类支撑型岗位',
    love: '关系里偏迁就，需要学会表达需求',
    health: '留意皮肤与免疫波动',
  },
  天梁: {
    trait: '有长者气，爱操心、乐意帮人',
    work: '适合教育、医护、公益、顾问一类助人的岗位',
    love: '照顾型伴侣，别把对方当孩子',
    health: '留意慢病管理与过劳',
  },
  七杀: {
    trait: '果断敢冲，抗压但容易硬碰硬',
    work: '适合开拓、销售、创业、外勤一类高挑战岗位',
    love: '感情来得快，需要留给对方缓冲',
    health: '留意意外伤害与旧伤复发',
  },
  破军: {
    trait: '喜新厌旧，敢破敢立，不走老路',
    work: '适合变革、创业、项目从零到一的岗位',
    love: '感情变动偏多，稳定需要共同目标',
    health: '留意泌尿与外伤',
  },
};

// ── 五行 → 行业方向（喜用神落地用）──────────────────────────
const WUXING_INDUSTRY = {
  木: '教育培训、出版撰稿、文职行政、农林园艺、中医药、服装与设计、文创',
  火: '互联网、传媒影视、能源电力、餐饮与品牌、演艺传播、电子科技',
  土: '地产建筑、物业管理、行政人事、农业种植、供应链仓储、财会',
  金: '金融银行、法律法务、机械制造、审计风控、医疗器械、军警安保',
  水: '物流贸易、咨询顾问、传媒公关、旅游出行、科研水产、信息技术',
};

// ── 五行 → 身体对应（健康维度用）────────────────────────────
const WUXING_ORGAN = {
  木: { part: '肝胆、筋骨', note: '情绪疏泄与久坐久视是主要负担' },
  火: { part: '心脏、小肠、血脉', note: '睡眠节律与情绪起伏最需留意' },
  土: { part: '脾胃、肌肉', note: '饮食规律与消化吸收是关键' },
  金: { part: '肺、大肠、呼吸道与皮肤', note: '空气质量与换季是敏感点' },
  水: { part: '肾、膀胱、内分泌与腰膝', note: '过劳与熬夜最先反映在这里' },
};

// ── 十神 → 行事风格（八字职业与事业维度用）────────────────────
const TENGOD_STYLE = {
  正官: '守规矩、重名分，适合在成体系的组织里按规则上升',
  七杀: '抗压敢拼，适合高挑战、需要快速决断的岗位',
  正财: '稳定务实，适合按劳取酬、积累型的路径',
  偏财: '善抓机会、人脉广，适合业务、投资、资源整合类',
  食神: '表达与创造见长，适合技术、创作、教育一类',
  伤官: '想法多、不服旧规，适合改革、创业、专业创意',
  正印: '学习力强、有耐心，适合研究、文教、需要资质的岗位',
  偏印: '偏门钻研，适合冷门专业、技术深耕',
  比肩: '独立能扛，适合并肩作战或独立负责一块',
  劫财: '行动快、竞争心强，适合业务冲刺型工作',
};

// ── 六壬天将 → 象征（六壬分维度用）──────────────────────────
const LIUREN_JIANG = {
  贵人: '贵人、助力、被提携',
  螣蛇: '缠绕、反复、惊扰不定',
  朱雀: '口舌、文书、消息是非',
  六合: '合作、契约、和合之事',
  勾陈: '牵绊、拖延、纠缠难断',
  青龙: '喜庆、财禄、顺利推进',
  天空: '虚空、不实、计划落空',
  白虎: '压力、病丧、突发阻碍',
  太常: '衣食、常规、平稳运行',
  玄武: '暗昧、失物、信息不明',
  太阴: '隐秘、暗中助力、私下的事',
  天后: '女性、恩泽、情感与照料',
};

// ── 统一免责提示───────────────────────────────────────────
const DISCLAIMER =
  '以上解析由本插件依据你提供的出生信息（或起卦时刻）按传统命理规则生成，属文化娱乐与自我觉察的参考，' +
  '不构成医疗、心理、投资、法律或人事决策的依据。涉及健康请咨询医生，涉及重大决定请以现实信息与专业人士意见为准。';

// ── 塔罗元素 → 关注领域（塔罗分维度用）───────────────────────
const TAROT_ELEMENT_FOCUS = {
  火: { area: '行动力与热情', advice: '把能量投到一件具体的事上，别同时开太多头' },
  水: { area: '情感与关系', advice: '先照顾好感受，再谈效率' },
  风: { area: '思考与沟通', advice: '把想法写下来，与相关的人说清楚' },
  土: { area: '现实与资源', advice: '落实成可执行的步骤，写明时间和预算' },
};

return { TRIGRAM, YAO_POSITION, MOVING_NATURE, HEX64, HEX_BY_CORE, ZIWEI_STARS, WUXING_INDUSTRY, WUXING_ORGAN, TENGOD_STYLE, LIUREN_JIANG, DISCLAIMER, TAROT_ELEMENT_FOCUS };
})();

__mods.interpret = (function () {
// 解析与详解模块
// 输入：任一体系的排盘结果（compute 的返回值）
// 输出：结构化解析对象 —— { moduleType, system, title, lead, dimensions[], sections[], disclaimer }
//   moduleType：natal（命盘） / divination（卦象） / card（牌阵）
//   dimensions：五个固定维度，每项 { key, label, text, advice }
//   sections：体系专属的附加解读（卦辞爻辞、塔罗整体叙事等）
// 文案口径：第二人称、温和、只给倾向与建议，不作绝对判断。

const { HEX64, HEX_BY_CORE, TRIGRAM, YAO_POSITION, MOVING_NATURE, ZIWEI_STARS, WUXING_INDUSTRY, WUXING_ORGAN, TENGOD_STYLE, LIUREN_JIANG, TAROT_ELEMENT_FOCUS, DISCLAIMER } = __mods['interpret-data'];
// 生年四化要按年干反查四颗星，四化表只在紫微引擎里定义了一份，这里直接复用，避免两处维护打架
const { MUTAGEN } = __mods.ziwei;

// ── 固定五维度 ────────────────────────────────────────────
const DIMENSIONS = [
  { key: 'overall', label: '整体运势' },
  { key: 'work', label: '工作与职业选择' },
  { key: 'career', label: '事业发展' },
  { key: 'love', label: '爱情与感情' },
  { key: 'health', label: '健康状况' },
];

const MODULE_TYPE = {
  bazi: 'natal', ziwei: 'natal',
  liuyao: 'divination', meihua: 'divination', daliuren: 'divination',
  tarot: 'card',
};

const SYSTEM_LABEL = {
  bazi: '八字', ziwei: '紫微斗数', liuyao: '六爻',
  meihua: '梅花易数', daliuren: '大六壬', tarot: '塔罗',
};

// ── 询问方向 ────────────────────────────────────────────
// 问事（六爻 / 梅花 / 大六壬 / 塔罗）时可选的方向。
// dim 指向五维度里最贴近的一条，会把该维度提到最前并在开头点明问题与方向，避免泛泛而谈。
const DIRECTIONS = [
  { key: 'general', label: '综合', dim: null, focus: '' },
  { key: 'wealth', label: '财运', dim: 'work', focus: '钱财进出的落点主要看「工作与职业选择」与「事业发展」这两条。' },
  { key: 'career', label: '事业', dim: 'career', focus: '事业发展这条与你的问题最直接。' },
  { key: 'love', label: '感情', dim: 'love', focus: '感情这条与你的问题最直接。' },
  { key: 'health', label: '健康', dim: 'health', focus: '健康这条与你的问题最直接；下面只作提醒，不作任何诊断。' },
  { key: 'study', label: '学业', dim: 'career', focus: '学业与考试更贴近「事业发展」这条，讲的是长期积累与阶段进展。' },
  { key: 'travel', label: '出行', dim: 'overall', focus: '出行与迁动更贴近「整体运势」这条，看的是当下这一段的大环境。' },
];

const DIRECTION_DEFAULT = 'general';
const dirOf = (key) => DIRECTIONS.find((d) => d.key === key) || DIRECTIONS[0];

/** 归一化「所问之事 + 询问方向」，给出结构与回显串 */
function askOf(opts) {
  const o = isObj(opts) ? opts : {};
  const question = typeof o.question === 'string' ? o.question.trim().slice(0, 200) : '';
  const d = dirOf(o.direction);
  return {
    question,
    direction: d.key,
    directionLabel: d.label,
    echo: `问题：${question || '（未填写）'} ｜ 询问方向：${d.label}`,
  };
}

/** 把问题与方向写进解析：聚焦维度提前 + 点明方向 + 引语回显 */
function applyAsk(dims, ask, lead) {
  const list = Array.isArray(dims) ? dims.slice() : [];
  const d = dirOf(ask && ask.direction);
  if (d.dim) {
    const i = list.findIndex((x) => x && x.key === d.dim);
    if (i > 0) { const hit = list[i]; list.splice(i, 1); list.unshift(hit); }
    if (list[0] && list[0].key === d.dim) {
      const head = ask.question
        ? `就你所问的「${ask.question}」来看（${d.label}方向）——${d.focus}`
        : `按${d.label}这个方向看——${d.focus}`;
      list[0] = Object.assign({}, list[0], { text: `${head}${list[0].text}`, focused: true });
    }
  }
  let l = lead || '';
  if (ask.question) l = `你问的是「${ask.question}」${d.key === 'general' ? '。' : `，方向是${d.label}。`}${l}`;
  else if (d.key !== 'general') l = `方向是${d.label}。${l}`;
  return { dims: list, lead: l };
}

// 大运/流年档位 → 走势描述（非绝对判断）
const TIER_TEXT = {
  大吉: '外部环境对你比较配合，属于可以主动争取的阶段',
  吉: '整体偏顺，适合稳步推进手上的事',
  平: '起伏不大，更适合打基础、补短板',
  忌: '摩擦与消耗偏多，宜守成、减少冒进',
  大忌: '压力相对集中，宜降低预期、先保住基本盘',
};

const TIER_ADVICE = {
  大吉: '想做的事可以排进日程，别只停在想法上',
  吉: '按已有节奏走，把一件事做完整比开新头更划算',
  平: '把精力投向积累：技能、资质、人脉都算数',
  忌: '少做大的调整，先把手上的事收尾',
  大忌: '给自己留出缓冲，重要决定不妨往后放一放',
};

// ── 小工具 ────────────────────────────────────────────────
const isObj = (v) => v && typeof v === 'object';
const pick = (o, k, d = '') => (isObj(o) && o[k] != null ? o[k] : d);
const join = (arr, sep = '、') => (Array.isArray(arr) ? arr.filter(Boolean).join(sep) : String(arr || ''));

/** 查询卦意：全名 → 核心卦名 → 上下卦取象兜底 */
function hexInfo(name, upper, lower) {
  if (HEX64[name]) return { full: name, ...HEX64[name] };
  const core = typeof name === 'string' && name.length > 2 ? name.slice(2) : name;
  if (HEX_BY_CORE[core]) {
    const full = HEX_BY_CORE[core];
    return { full, ...HEX64[full] };
  }
  const u = TRIGRAM[upper] || {};
  const l = TRIGRAM[lower] || {};
  return {
    full: name || '本卦',
    meaning: `${u.nature || upper || ''}在${l.nature || lower || ''}上，${u.trait || ''}遇${l.trait || ''}`.trim(),
    scene: '按上下卦的取象体会这一卦的大意',
  };
}

/** 从格局名反推对应的十神（用于匹配行事风格） */
function godFromPattern(name) {
  const s = String(name || '');
  if (/七杀/.test(s)) return '七杀';
  if (/正官/.test(s)) return '正官';
  if (/正财/.test(s)) return '正财';
  if (/偏财|财格/.test(s)) return '偏财';
  if (/伤官/.test(s)) return '伤官';
  if (/食神|食伤/.test(s)) return '食神';
  if (/正印/.test(s)) return '正印';
  if (/偏印|枭/.test(s)) return '偏印';
  if (/劫财/.test(s)) return '劫财';
  if (/比肩|比劫/.test(s)) return '比肩';
  if (/官/.test(s)) return '正官';
  if (/财/.test(s)) return '偏财';
  if (/印/.test(s)) return '正印';
  return '';
}

/** 按爻位取爻辞大意 */
function yaoGist(pos, moving) {
  const y = YAO_POSITION.find((x) => x.pos === pos) || YAO_POSITION[0];
  return `${y.name}（${y.gist}）：${y.tone}${moving ? '；此处发动，' + (moving.yinYang === '阳' ? MOVING_NATURE.yang : MOVING_NATURE.yin) : ''}`;
}

// ══════════════════════════════════════════════════════════
// 八字
// ══════════════════════════════════════════════════════════
function baziInterpret(r) {
  const dm = isObj(r.dayMaster) ? r.dayMaster : {};
  const st = isObj(r.strength) ? r.strength : {};
  const frame = isObj(r.frame) ? r.frame : {};
  const ys = isObj(frame.yongshen) ? frame.yongshen : {};
  const wx = isObj(r.wuxing) ? r.wuxing : {};
  const level = pick(st, 'level', '中和');
  const favor = Array.isArray(ys.favor) ? ys.favor : [];
  const avoid = Array.isArray(ys.avoid) ? ys.avoid : [];
  const primary = pick(frame, 'primaryName', '未取定');
  const gender = pick(r.input, 'gender', '');
  const isMale = gender === 'male';

  // 当前大运与流年
  const age = Number(pick(r.liunian?.[0], 'age', NaN));
  const list = Array.isArray(r.dayun?.list) ? r.dayun.list : [];
  let cur = null;
  for (const d of list) {
    if (Number.isFinite(age) && Number(d.startAge) <= age) cur = d;
  }
  if (!cur && list.length) cur = list[0];
  const curLuck = isObj(cur?.luck) ? cur.luck : {};
  const curTier = pick(curLuck, 'tier', '平');
  const ln = isObj(r.liunian?.[0]) ? r.liunian[0] : {};
  const lnLuck = isObj(ln.luck) ? ln.luck : {};
  const lnTier = pick(lnLuck, 'tier', '平');

  // 十神强弱排序
  const groups = isObj(frame.godStats?.groups) ? frame.godStats.groups : {};
  const top = Object.entries(groups).sort((a, b) => b[1] - a[1]);
  const topName = top[0]?.[0] || '';
  const secondName = top[1]?.[0] || '';

  // 五行偏枯
  const wxEntries = Object.entries(wx).sort((a, b) => b[1] - a[1]);
  const strongest = wxEntries[0]?.[0] || '';
  const weakest = wxEntries[wxEntries.length - 1]?.[0] || '';
  const missing = Object.keys(wx).filter((k) => Number(wx[k]) === 0);

  // 未来三步大运
  const idx = cur ? list.indexOf(cur) : -1;
  const ahead = idx >= 0 ? list.slice(idx + 1, idx + 4) : list.slice(0, 3);

  const dimensions = [
    {
      key: 'overall', label: '整体运势',
      text: `你的日主是${dm.stem}（五行属${dm.element}），命局身${level}（${pick(st, 'score', '')} 分）。` +
        `用神取向偏${join(favor)}，忌${join(avoid)}——往${join(favor)}的方向走会更省力${ys.tiaohou && ys.tiaohou.note ? `，调候上还${ys.tiaohou.note}` : ''}。` +
        `目前走在${pick(cur, 'ganzhi', '当前')}大运（${curTier}），${pick(ln, 'year', '今年')}年流年${pick(ln, 'ganzhi', '')}同样是${lnTier}的档位。`,
      advice: `${TIER_TEXT[curTier] || TIER_TEXT.平}。${TIER_ADVICE[lnTier] || TIER_ADVICE.平}；把大方向定在${join(favor)}相关的领域，会比硬扛${join(avoid)}顺畅一些。`,
    },
    {
      key: 'work', label: '工作与职业选择',
      text: `按喜用神看，${join(favor)}这几类方向对你更有利，可参考的行业包括：${favor.slice(0, 2).map((e) => WUXING_INDUSTRY[e] || '').filter(Boolean).join('；') || '暂未取定，可先按兴趣与能力试'}。` +
        `命局主格为${primary}，这类结构的人通常${TENGOD_STYLE[godFromPattern(primary)] || '有自己稳定的节奏'}。` +
        `十神中${topName}最重（${top[0]?.[1] ?? ''}），${secondName}次之，说明你在${topName}所代表的事项上投入的精力最多。`,
      advice: `选岗位时可以偏向「${join(favor)}属性 + ${topName}对应的事务」；如果现在的工作明显偏${join(avoid)}且长期让你疲惫，可以参考上面方向做小幅试探，不必立刻大改。`,
    },
    {
      key: 'career', label: '事业发展',
      text: `${primary}的格局，配合十神里${topName}偏旺的结构，事业上更适合${topName === '财' ? '靠业绩与资源积累说话' : topName === '官杀' ? '在有规则的组织里按层级上升' : topName === '印' ? '凭资质、专业与口碑取胜' : topName === '食伤' ? '靠作品、技术与表达打开局面' : '与人并肩、共同承担的方式'}。` +
        `接下来几步大运依次为：${ahead.map((d) => `${d.ganzhi}（${d.luck?.tier || '平'}）`).join(' → ') || '暂未排出'}，` +
        `整体节奏是${ahead.length && ahead.filter((d) => ['吉', '大吉'].includes(d.luck?.tier)).length >= 2 ? '先抑后扬、后段更顺' : '需要一步步积累，中间偶有起伏'}。`,
      advice: `把${ahead[0]?.ganzhi || '下一步'}这一步当作铺垫期，重点补${topName === '食伤' ? '作品与专业深度' : topName === '官杀' ? '资历与组织内的信任' : '可迁移的能力与资质'}；遇到${join(avoid)}过重的年份，优先保住已有成果。`,
    },
    {
      key: 'love', label: '爱情与感情',
      text: `${isMale ? '男命以财星看妻缘' : '女命以官杀看夫缘'}，你命局中${isMale ? '财' : '官杀'}的力量为${groups[isMale ? '财' : '官杀'] ?? '—'}，` +
        `${Number(groups[isMale ? '财' : '官杀'] || 0) >= 2 ? '缘分出现的机会不算少' : '需要自己主动创造认识人的场景'}。` +
        `日支（配偶宫）为${pick(r.pillars?.day, 'branch', '')}，坐${pick(r.pillars?.day, 'zizuo', '')}，` +
        `这里的信号是：${Number(groups[isMale ? '财' : '官杀'] || 0) >= 2 ? '关系里你容易被主动靠近，但要留意筛选' : '感情推进偏慢，属于需要经营的类型'}。`,
      advice: `不必急着要结果，先看清自己在关系里最在意什么。${Number(groups[isMale ? '财' : '官杀'] || 0) >= 2 ? '选项多时，明确标准反而更省心' : '可以把社交圈稍微扩大一点，但别为了脱单降低底线'}；沟通上多说具体需求，少让对方猜。`,
    },
    {
      key: 'health', label: '健康状况',
      text: `五行分布上，${strongest}最旺、${weakest}最弱${missing.length ? `，其中${join(missing)}在命局中没有明现` : ''}。` +
        `按五行与身体的对应，${strongest}偏旺时${WUXING_ORGAN[strongest]?.part || ''}负担相对重（${WUXING_ORGAN[strongest]?.note || ''}）；` +
        `${weakest}偏弱则${WUXING_ORGAN[weakest]?.part || ''}偏弱一些，是更值得留意的部分。这只是传统命理的取象提示，不是诊断。`,
      advice: `建议把作息规律放在第一位——尤其是睡眠时长尽量稳定；${WUXING_ORGAN[weakest]?.note ? weakest + '对应的' + WUXING_ORGAN[weakest].part + '可以按体检项目关注' : '按常规体检关注'}。任何不适请去看医生，别用命理结论替代检查。`,
    },
  ];

  const sections = [
    {
      key: 'yongshen', label: '用神与忌神',
      text: `喜用：${join(favor)}（对应十神：${join(ys.favorTenGods || ys.favorRoles || [])}）；忌：${join(avoid)}（对应十神：${join(ys.avoidTenGods || ys.avoidRoles || [])}）。` +
        `${pick(ys, 'detail', '')}${ys.tiaohou ? `调候上${ys.tiaohou.note}。` : ''}`,
    },
    {
      key: 'geju', label: '格局依据',
      text: (Array.isArray(frame.geju) ? frame.geju : []).map((g) => `${g.name}（${g.kind}）：${g.evidence}`).join('；') || '未取到格局',
    },
  ];

  return {
    lead: `下面按五个维度拆开说。所有内容来自你这张命盘的结构，讲的是倾向与建议，不是预言——方向供你参考，怎么走在你自己。`,
    dimensions, sections,
  };
}

// ══════════════════════════════════════════════════════════
// 紫微斗数
// ══════════════════════════════════════════════════════════
const ZW_MAIN = Object.keys(ZIWEI_STARS);

function zwPalace(r, name) {
  return (r.palaces || []).find((p) => p.palace === name) || null;
}
function zwMainStar(p) {
  if (!p) return null;
  const s = (p.stars || []).find((x) => ZW_MAIN.includes(x.name));
  return s ? s.name : null;
}
function zwSha(p) {
  return (p?.stars || []).filter((s) => s.type === '煞星').map((s) => s.name);
}

// 四化的固定读法顺序：禄 → 权 → 科 → 忌
const SIHUA_ORDER = ['禄', '权', '科', '忌'];

/**
 * 取本盘的生年四化（年干四化）落宫清单，按 禄权科忌 排序。
 * 落宫以盘面上真正标出的 mutagen 为准；若该星在这张盘里没有落点（辅星偶有此情况），
 * palace 返回 null —— 交给文案如实写成「未上盘」，绝不补一个宫位上去。
 * @param {object} r 紫微排盘结果
 * @returns {Array<{star: string, type: string, palace: string|null}>} 生年四化清单
 */
function zwNatalSihua(r) {
  const palaces = Array.isArray(r?.palaces) ? r.palaces : [];

  // 星名 → {type, palace}：一宫可能同时坐两颗化星（如迁移宫天机化禄 + 太阴化忌），按星名去重
  const placed = new Map();
  for (const p of palaces) {
    for (const s of (p.stars || [])) {
      if (!s || !s.mutagen || placed.has(s.name)) continue;
      placed.set(s.name, { type: s.mutagen, palace: p.palace || null });
    }
  }

  // 年干四化表：用来补齐「盘上没有落点」的那几颗，以及保证输出顺序
  const ganzhi = pick(r, 'yearGanzhi', '');
  const yearStem = typeof ganzhi === 'string' ? ganzhi.slice(0, 1) : '';
  const table = MUTAGEN[yearStem] || {};
  const starOfType = {};
  for (const [star, type] of Object.entries(table)) starOfType[type] = star;

  const out = [];
  for (const type of SIHUA_ORDER) {
    // 年干表查不到时退回到盘面自身标注的那一颗
    let star = starOfType[type] || '';
    if (!star) {
      for (const [name, info] of placed) {
        if (info.type === type) { star = name; break; }
      }
    }
    if (!star) continue;
    const hit = placed.get(star);
    out.push({ star, type, palace: hit ? hit.palace : null });
  }
  return out;
}

/**
 * 把四化清单拼成一句人话。palace 为 null 时写「未上盘」。
 * @param {Array<{star: string, type: string, palace: string|null}>} list 四化清单
 * @returns {string} 如「天机化禄于迁移、天梁化权于夫妻、紫微化科于疾厄、太阴化忌于迁移」
 */
function zwSihuaText(list) {
  if (!Array.isArray(list) || !list.length) return '';
  return list
    .map((m) => (m.palace ? `${m.star}化${m.type}于${m.palace}` : `${m.star}化${m.type}（未上盘）`))
    .join('、');
}

function ziweiInterpret(r) {
  const soul = zwPalace(r, '命宫') || (r.palaces || [])[0];
  const career = zwPalace(r, '官禄');
  const wealth = zwPalace(r, '财帛');
  const spouse = zwPalace(r, '夫妻');
  const health = zwPalace(r, '疾厄');
  const move = zwPalace(r, '迁移');

  // 命宫主星：命宫无主星时借对宫（迁移），再退到命主星；同时记下来源，避免与「命无正曜」格局打架
  const soulOwn = zwMainStar(soul);
  const moveStar = zwMainStar(move);
  const lifeM = ZW_MAIN.includes(pick(r, 'lifeMaster')) ? r.lifeMaster : null;
  let soulStar = soulOwn || moveStar || lifeM || '紫微';
  const soulFrom = soulOwn
    ? `你的命宫主星是${soulStar}`
    : moveStar
      ? `你的命宫无正曜，按紫微的规则借对宫（迁移）来看，主星是${soulStar}`
      : `你的命宫与对宫都没有正曜，这里按命主星${soulStar}来看`;
  const S = ZIWEI_STARS[soulStar] || ZIWEI_STARS.紫微;

  const careerStar = zwMainStar(career);
  const wealthStar = zwMainStar(wealth);
  const spouseStar = zwMainStar(spouse);
  const healthStar = zwMainStar(health);

  const age = Number(pick(r.liunian?.[0], 'age', NaN));
  let daxianPalace = null;
  for (const p of r.palaces || []) {
    const d = p.daxian || {};
    if (Number.isFinite(age) && Number(d.start) <= age && age <= Number(d.end)) daxianPalace = p;
  }
  const patterns = Array.isArray(r.patterns) ? r.patterns : [];
  const patText = patterns.length
    ? patterns.slice(0, 3).map((p) => `${p.name}（${p.tone === 'good' ? '偏吉' : p.tone === 'bad' ? '需留意' : '中性'}：${p.evidence}）`).join('；')
    : '本盘未触发常见格局条目';
  // 流年四化：四项全列，不要截断 —— 少了化科/化忌会让用户以为盘子算漏了
  const lnMutagen = Array.isArray(r.liunian?.[0]?.mutagen) ? r.liunian[0].mutagen.slice(0, 4).join('、') : '';
  // 生年四化：这才是用户最想看到的部分——自己盘上的化科落在哪颗星、哪个宫
  const natalSihua = zwNatalSihua(r);
  const natalSihuaText = zwSihuaText(natalSihua);

  const dimensions = [
    {
      key: 'overall', label: '整体运势',
      text: `${soulFrom}，性格底色上${S.trait}。本盘${patText}。` +
        `当前大限走在${daxianPalace ? `${daxianPalace.palace}（${daxianPalace.daxian.start}–${daxianPalace.daxian.end}岁）` : '当前阶段'}，` +
        `${lnMutagen ? `流年四化为${lnMutagen}，本年的变化感主要落在这几颗星上` : '流年四化信号不明显'}。` +
        (natalSihuaText
          ? `另外你本命的生年四化落在：${natalSihuaText}——这是你这辈子比较稳定的底色，不随某一年改变。`
          : ''),
      advice: `这一阶段的主题更接近「${daxianPalace ? daxianPalace.palace : '命宫'}」代表的事——把它当作今年的主线，其余事围绕它安排；${S.trait}是你的优势，也是需要留意别用过头的地方。`,
    },
    {
      key: 'work', label: '工作与职业选择',
      text: `命宫${soulStar}给出的是底层偏好：${S.work}。官禄宫${careerStar ? `主星为${careerStar}，${ZIWEI_STARS[careerStar]?.work || '有其自身的做事方式'}` : '无正曜，工作方式更多受环境与他人影响，适合配合型岗位'}。` +
        `两者合起来看，你更适合${careerStar && careerStar !== soulStar ? `用${soulStar}的方式去做${careerStar}擅长的事` : '在稳定的框架里发挥自己的特点'}。`,
      advice: `挑工作时可以优先看岗位内容是否匹配上面这条；如果暂时不能换，试着在现有岗位里争取靠近这部分的事务，会比硬熬更容易做出成绩。`,
    },
    {
      key: 'career', label: '事业发展',
      text: `财帛宫${wealthStar ? `见${wealthStar}，${ZIWEI_STARS[wealthStar]?.trait || ''}` : '无正曜'}，官禄宫${careerStar || '无正曜'}，` +
        `${wealthStar && careerStar ? '财与事业两宫都有主星坐守，说明这两块是可以主动经营的部分' : '有一宫无主星，说明该块更容易受外部条件牵动，宜借势而非强求'}。` +
        `大限推进上，${daxianPalace ? `目前落在${daxianPalace.palace}` : '当前阶段'}，下一步会转入相邻的宫位，重心也会跟着挪。`,
      advice: `事业上建议做两件事：一是把可积累的东西（技能、资质、作品）做厚；二是${careerStar ? `发挥${careerStar}的优势——${ZIWEI_STARS[careerStar]?.trait || ''}` : '找一个能带你的前辈或平台'}。遇到四化化忌的年份，先守成再谈扩张。`,
    },
    {
      key: 'love', label: '爱情与感情',
      text: `夫妻宫${spouseStar ? `主星为${spouseStar}，感情上的倾向是${ZIWEI_STARS[spouseStar]?.love || '有自己相处的节奏'}` : '无正曜，关系状态更多由对方与互动方式决定'}。` +
        `${zwSha(spouse).length ? `夫妻宫同时见${join(zwSha(spouse))}，相处中容易出现摩擦或第三者干扰的暗示，但煞星不等于定局，更多是提醒你留意沟通方式` : '夫妻宫未见明显煞星，关系的基调相对平顺'}。`,
      advice: `感情里${spouseStar ? `参考${spouseStar}的特点：${ZIWEI_STARS[spouseStar]?.love || ''}` : '可以更主动地表达自己的需求'}。有分歧时先说清事实与感受，别急着下结论；关系的好坏取决于两个人怎么做，不取决于这张盘。`,
    },
    {
      key: 'health', label: '健康状况',
      text: `疾厄宫${healthStar ? `见${healthStar}，传统取象上${ZIWEI_STARS[healthStar]?.health || '需要留意自身的薄弱环节'}` : '无正曜，身体状态更多受生活作息直接影响'}。` +
        `${zwSha(health).length ? `同时见${join(zwSha(health))}，提示这一块值得比其他部位多一分留意。` : ''}这些都是象征性的提示，不构成任何医学判断。`,
      advice: `把${healthStar ? ZIWEI_STARS[healthStar]?.health?.replace('留意', '').replace('需要留意', '') || '常规' : '常规'}当作体检时重点关注的参考；真正管用的还是规律作息、适度运动与定期检查。身体不舒服请直接就医。`,
    },
  ];

  const sections = [
    { key: 'palaces', label: '关键宫位', text: `命宫${soulStar}　官禄${careerStar || '无正曜'}　财帛${wealthStar || '无正曜'}　夫妻${spouseStar || '无正曜'}　疾厄${healthStar || '无正曜'}` },
    { key: 'patterns', label: '格局', text: patText },
  ];
  if (natalSihua.length) {
    const ke = natalSihua.find((m) => m.type === '科') || null;
    // 宫位名本身可能已带「宫」（如命宫），拼的时候别叠出「命宫宫」
    const palaceWord = (p) => `${p}${String(p).endsWith('宫') ? '' : '宫'}`;
    const kePart = ke
      ? `其中化科是${ke.star}${ke.palace ? `落在${palaceWord(ke.palace)}` : '未上盘'}，`
      : '';
    sections.push({
      key: 'sihua', label: '生年四化',
      text: `你出生年的天干定下四颗化星，落在：${natalSihuaText}。` +
        `读法上，化禄的宫位做起来比较顺手、也容易有人帮忙；化权的宫位偏向由你拿主意、但也更容易用力过猛；化科的宫位自带一层体面与贵人缘，遇到事多半能体面收场；化忌的宫位是你容易在意、也容易反复的地方。` +
        `${kePart}这几处只是长期倾向，落到具体某一年还要配上流年四化一起看，不必把它当成结论。`,
    });
  }

  return {
    lead: `紫微斗数看的是你与环境的互动方式。下面按五个维度拆开，讲的是性格与处境的倾向，具体怎么选仍然在你。`,
    dimensions, sections,
  };
}

// ══════════════════════════════════════════════════════════
// 卦象通用：卦辞 / 爻辞 / 动爻 / 生活落点
// ══════════════════════════════════════════════════════════
function hexSections({ benName, benUpper, benLower, bianName, bianUpper, bianLower, movingLine, moving }) {
  const ben = hexInfo(benName, benUpper, benLower);
  const sections = [
    {
      key: 'guaCi', label: '卦名与卦辞大意',
      text: `本卦为「${ben.full}」，卦辞大意是：${ben.meaning}。这一卦讲的是事情当下的整体走势——你可以先记住这句，后面每个维度都会回到它。`,
    },
    {
      key: 'yaoCi', label: '爻辞与动爻',
      text: moving ? yaoGist(moving.position, moving) : '本卦无动爻，事情处于相对静止的状态，短期内变化的动力不强，宜按现状维持。',
    },
  ];
  if (bianName) {
    const bian = hexInfo(bianName, bianUpper, bianLower);
    sections.push({
      key: 'bianGua', label: '变卦与走向',
      text: `动爻变化之后得到「${bian.full}」，${bian.meaning}。变卦往往指向事情后来的样子：从「${ben.full}」走到「${bian.full}」，可以理解为局面会从${ben.scene}转为${bian.scene}。`,
    });
  }
  sections.push({
    key: 'scene', label: '落到生活里',
    text: `把这一卦放进日常：${ben.scene}。${bianName ? `而后续的方向是${hexInfo(bianName, bianUpper, bianLower).scene}。` : ''}你可以对照着看看，眼下哪件事最像这个描述。`,
  });
  return { sections, ben, bian: bianName ? hexInfo(bianName, bianUpper, bianLower) : null };
}

// ══════════════════════════════════════════════════════════
// 六爻
// ══════════════════════════════════════════════════════════
const LIUQIN_USE = {
  妻财: '钱财、收入、订单，也指男命的妻缘',
  官鬼: '工作、职位、上司、考核，也指压力与疾病',
  父母: '文书、合同、学历、长辈、房子',
  子孙: '下属、客户、创意、消解压力的出口',
  兄弟: '同事、同行、竞争者，多与破财相关',
};

function liuyaoInterpret(r) {
  const ben = isObj(r.ben) ? r.ben : {};
  const bian = isObj(r.bian) ? r.bian : {};
  const lines = Array.isArray(ben.lines) ? ben.lines : [];
  const moving = lines.find((l) => l.moving) || null;
  const { sections, ben: benInfo, bian: bianInfo } = hexSections({
    benName: ben.name, benUpper: ben.upper, benLower: ben.lower,
    bianName: bian.name, bianUpper: bian.upper, bianLower: bian.lower,
    moving,
  });

  const shiLine = lines.find((l) => l.position === ben.shi);
  const yingLine = lines.find((l) => l.position === ben.ying);
  const palaceEl = pick(ben, 'palaceElement', '');
  const movingLiuqin = moving?.liuqin || '';
  const movingLiushen = moving?.liushen || '';
  const dayGZ = pick(r.dayGanZhi, 'name', '');

  sections.push({
    key: 'liuqin', label: '六亲取用',
    text: `这一卦里，${movingLiuqin ? `动爻落在${movingLiuqin}（${LIUQIN_USE[movingLiuqin] || ''}）` : '没有发动的六亲'}。` +
      `如果你心里有具体问题，可以对号入座：${Object.entries(LIUQIN_USE).map(([k, v]) => `${k}主${v.split('，')[0]}`).join('；')}。`,
  });

  const dimensions = [
    {
      key: 'overall', label: '整体运势',
      text: `这一卦是「${benInfo.full}」，${benInfo.meaning}。${movingLiushen ? `动爻带${movingLiushen}，事情带一点${movingLiushen === '青龙' ? '喜庆顺遂' : movingLiushen === '白虎' ? '压力与阻碍' : movingLiushen === '朱雀' ? '口舌与是非' : movingLiushen === '玄武' ? '不明朗、需要核实' : '反复与牵扯'}的色彩。` : ''}` +
        `日辰为${dayGZ}，卦宫属${palaceEl}，整体更像是${benInfo.scene}的阶段。`,
      advice: `${benInfo.scene}——顺着这句做就行。${moving ? '既然有动爻，说明事情还在变化，先观察几天再定也不迟。' : '暂无动爻，说明短期内不会有大的转折，维持现状反而是稳妥选择。'}`,
    },
    {
      key: 'work', label: '工作与职业选择',
      text: `问工作看官鬼与父母：本卦中${(lines.filter((l) => l.liuqin === '官鬼').length ? `官鬼出现${lines.filter((l) => l.liuqin === '官鬼').length}处，${lines.find((l) => l.liuqin === '官鬼').moving ? '且有发动，岗位或考核层面会有动作' : '但未发动，职位层面暂时平稳'}` : '未见官鬼，工作这件事在卦中不是主要矛盾')}；` +
        `${(lines.filter((l) => l.liuqin === '父母').length ? '父母（文书、合同、资质）有出现，涉及手续与材料的事要提前准备' : '父母未现，手续类事务暂无明显阻碍')}。`,
      advice: `如果正在看机会，建议先把合同、岗位职责这些落到纸面上的东西问清楚；${moving?.liuqin === '官鬼' ? '动爻在官鬼，工作层面近期有变动的迹象，可以主动谈，但别先辞再找。' : '工作层面暂无强动象，稳住手上的事更划算。'}`,
    },
    {
      key: 'career', label: '事业发展',
      text: `世爻（代表你）在${ben.shi}爻${shiLine ? `，六亲为${shiLine.liuqin}，${shiLine.moving ? '且发动' : '安静未动'}` : ''}；应爻（代表对方与环境）在${ben.ying}爻${yingLine ? `，六亲为${yingLine.liuqin}` : ''}。` +
        `世应之间${shiLine && yingLine ? (shiLine.liuqin === yingLine.liuqin ? '同气相求，双方立场接近' : '立场有别，需要多沟通') : '信号不明'}，` +
        `${bianInfo ? `变卦「${bianInfo.full}」提示后续走向是${bianInfo.scene}` : '暂无变卦'}。`,
      advice: `事业上的建议是：${shiLine?.moving ? '你自己这边有主动变化的意思，那就把想法说出来、把动作做出来' : '先不动，把手上的事做扎实'}；${bianInfo ? `按${bianInfo.scene}的方向去准备，会比被动等结果好。` : ''}`,
    },
    {
      key: 'love', label: '爱情与感情',
      text: `问感情，男看妻财、女看官鬼。本卦中${(lines.filter((l) => l.liuqin === '妻财').length ? `妻财${lines.filter((l) => l.liuqin === '妻财').length}现${lines.find((l) => l.liuqin === '妻财').moving ? '且发动，感情层面有动静' : '但安静，关系暂时平缓'}` : '妻财未现，感情不是当前卦象的重点')}；` +
        `${(lines.filter((l) => l.liuqin === '官鬼').length ? '官鬼有现，对方或关系中的压力面是被看到的' : '官鬼未现')}。${benInfo.meaning}，放在关系里就是${benInfo.scene}。`,
      advice: `关系里${moving?.liuqin === '妻财' || moving?.liuqin === '官鬼' ? '近期有变化的可能，适合把话说开，别憋着' : '暂时平稳，可以按自己的节奏相处'}。卦象只给倾向，真正决定关系的是你们怎么沟通。`,
    },
    {
      key: 'health', label: '健康状况',
      text: `问健康，看官鬼（病）与子孙（医药、消散）。本卦中${(lines.filter((l) => l.liuqin === '官鬼').length ? `官鬼有现${lines.find((l) => l.liuqin === '官鬼').moving ? '且发动，提示身体上可能有需要留意的地方' : '，但安静，暂无明显变化'}` : '官鬼未现，卦象未指向明显的身体问题')}；` +
        `${(lines.filter((l) => l.liuqin === '子孙').length ? '子孙有现，恢复与调养的出口是有的' : '子孙未现，休息与调养需要自己主动安排')}。${movingLiushen === '白虎' ? '动爻带白虎，尤其别忽视突发的身体信号。' : ''}`,
      advice: `这一卦在健康上的提醒是${(lines.filter((l) => l.liuqin === '官鬼').length ? '别硬扛，累了就休息，有机会就做一次检查' : '维持现有作息即可，别自己吓自己')}。任何不适请就医，卦象不能替代诊断。`,
    },
  ];

  return {
    lead: `这一卦问的是眼下的具体事。下面先讲卦理，再分五个维度落到生活里——卦象给的是倾向，不是定论。`,
    dimensions, sections,
  };
}

// ══════════════════════════════════════════════════════════
// 梅花易数
// ══════════════════════════════════════════════════════════
function meihuaInterpret(r) {
  const ben = isObj(r.ben) ? r.ben : {};
  const hu = isObj(r.hu) ? r.hu : {};
  const bian = isObj(r.bian) ? r.bian : {};
  const cuo = isObj(r.cuo) ? r.cuo : {};
  const zong = isObj(r.zong) ? r.zong : {};
  const bu = isObj(r.bodyUse) ? r.bodyUse : {};
  const lines = Array.isArray(r.lines) ? r.lines : [];
  const movingLine = lines.find((l) => l.moving) || (Number(r.moving) ? lines[Number(r.moving) - 1] : null);
  const { sections, ben: benInfo, bian: bianInfo } = hexSections({
    benName: ben.name, benUpper: ben.upper, benLower: ben.lower,
    bianName: bian.name, bianUpper: bian.upper, bianLower: bian.lower,
    moving: movingLine,
  });

  const bodyEl = pick(bu.body, 'element', '');
  const useEl = pick(bu.use, 'element', '');
  const relation = pick(bu, 'relation', '');
  const mhLevel = pick(bu, 'level', '');
  const isJi = /吉/.test(mhLevel);
  const isXiong = /凶/.test(mhLevel);

  sections.splice(1, 0, {
    key: 'tiYong', label: '体用关系',
    text: `体卦为${pick(bu.body, 'trigram', '')}（${bodyEl}），代表你自己；用卦为${pick(bu.use, 'trigram', '')}（${useEl}），代表对方与环境。${relation}（${mhLevel}）。` +
      `梅花易数看体用生克：${isJi ? '用卦对体卦有利，事情推进会相对顺' : isXiong ? '用卦克体或消耗体卦，推进中会感到阻力，宜缓不宜急' : '体用关系平和，事情按常态发展'}。`,
  });
  sections.splice(3, 0, {
    key: 'huGua', label: '互卦与过程',
    text: `互卦为「${pick(hu, 'name', '')}」，${hexInfo(hu.name, hu.upper, hu.lower).meaning}——互卦看事情中间的过程，这一段大致是这个味道。` +
      `错卦「${pick(cuo, 'name', '')}」是换个立场看同一件事，综卦「${pick(zong, 'name', '')}」是站在对方位置看，可以参考着换个角度想。`,
  });

  const dimensions = [
    {
      key: 'overall', label: '整体运势',
      text: `本卦「${benInfo.full}」，${benInfo.meaning}。体${bodyEl}用${useEl}，${relation}，判定为${mhLevel}。` +
        `${isJi ? '整体的倾向是顺的：外部环境对你不算苛刻，可以正常推进' : isXiong ? '整体有阻力：不是不能做，而是要多留余量与耐心' : '整体平稳，不会有大的起落'}。`,
      advice: `${benInfo.scene}。${isXiong ? '建议把节奏放慢，先解决卡点再谈推进' : isJi ? '可以趁势把想做的事往前推一步' : '按原计划走，不必刻意改变'}。`,
    },
    {
      key: 'work', label: '工作与职业选择',
      text: `梅花里工作看用卦与体卦的生克：现在用卦${useEl}${isJi ? '对体卦有利，说明当下的工作环境或岗位与你的匹配度还不错' : isXiong ? '与体卦相耗，说明眼下这份工作消耗感偏重' : '与体卦关系平和，属于不好不坏'}` +
        `。本卦${benInfo.meaning}，对应到工作里就是${benInfo.scene}。`,
      advice: `${isXiong ? '如果长期觉得被消耗，可以先在内部争取调整职责，再考虑外部机会' : isJi ? '适合主动争取更多责任或更好的岗位' : '把手上的事做好，等一个明确的信号再动'}。选工作时优先考虑让你舒服的环境，长期看比短期收益重要。`,
    },
    {
      key: 'career', label: '事业发展',
      text: `变卦「${bianInfo ? bianInfo.full : ''}」代表事情的结局方向，${bianInfo ? bianInfo.meaning : ''}。互卦「${pick(hu, 'name', '')}」代表过程，${hexInfo(hu.name, hu.upper, hu.lower).meaning}。` +
        `合起来看：过程${hexInfo(hu.name, hu.upper, hu.lower).scene}，结果${bianInfo ? bianInfo.scene : '暂不明朗'}。`,
      advice: `按这个结构，建议${isJi ? '现在就把关键的一步迈出去' : isXiong ? '先补短板、攒条件，等下一轮再动' : '小步推进，边做边看'}。动爻在${pick(r, 'movingName', '某爻')}，变化点就在那里，值得重点关注。`,
    },
    {
      key: 'love', label: '爱情与感情',
      text: `感情上看体用是否相合：体${bodyEl}与用${useEl}之间是${relation}，${isJi ? '这种组合在关系里意味着双方相处比较顺，彼此能给到支撑' : isXiong ? '这种组合提示相处中有一方付出更多，需要留意平衡' : '关系处在常态，没有特别的张力'}` +
        `。本卦${benInfo.meaning}，放到两人之间就是${benInfo.scene}。`,
      advice: `${isXiong ? '别把不满攒着，找个合适的时机说清楚；也别指望对方猜' : isJi ? '可以主动推进关系，做一些共同的事' : '维持现在的相处节奏就好'}。卦象看的是当下的气氛，关系的走向取决于你们怎么经营。`,
    },
    {
      key: 'health', label: '健康状况',
      text: `梅花里健康看体卦的强弱：体卦${pick(bu.body, 'trigram', '')}属${bodyEl}，${isXiong ? '被用卦所耗，传统取象上提示近期精力消耗偏大' : isJi ? '得到生扶，精力状态相对好' : '平顺，无明显偏枯'}。` +
        `${WUXING_ORGAN[bodyEl] ? `${bodyEl}对应${WUXING_ORGAN[bodyEl].part}，${WUXING_ORGAN[bodyEl].note}。` : ''}这是取象提示，不是诊断。`,
      advice: `${isXiong ? '近期别硬撑，睡眠与饮食先稳住，有条件做一次常规体检' : '保持现在的作息即可，顺势多动一动更好'}。身体有明确的症状请直接看医生。`,
    },
  ];

  return {
    lead: `梅花易数重「体用」——你与这件事之间的关系。下面先讲卦理与体用，再分五个维度落到生活场景。`,
    dimensions, sections,
  };
}

// ══════════════════════════════════════════════════════════
// 大六壬
// ══════════════════════════════════════════════════════════
function daliurenInterpret(r) {
  const sc = isObj(r.sanChuan) ? r.sanChuan : {};
  const chu = isObj(sc.chu) ? sc.chu : {};
  const zhong = isObj(sc.zhong) ? sc.zhong : {};
  const mo = isObj(sc.mo) ? sc.mo : {};
  const gj = isObj(r.geJu) ? r.geJu : {};
  const ke = Array.isArray(r.siKe) ? r.siKe : [];
  const jiangOf = (x) => LIUREN_JIANG[x?.jiangFull] || LIUREN_JIANG[x?.jiang] || '';

  const sections = [
    {
      key: 'sanChuan', label: '三传与事体走向',
      text: `初传${pick(chu, 'zhi', '')}（${pick(chu, 'jiangFull', '')}·${pick(chu, 'liuQin', '')}${chu.xunKong ? '·旬空' : ''}）：${jiangOf(chu) || '发端的信号'}；` +
        `中传${pick(zhong, 'zhi', '')}（${pick(zhong, 'jiangFull', '')}·${pick(zhong, 'liuQin', '')}${zhong.xunKong ? '·旬空' : ''}）：${jiangOf(zhong) || '过程的信号'}；` +
        `末传${pick(mo, 'zhi', '')}（${pick(mo, 'jiangFull', '')}·${pick(mo, 'liuQin', '')}${mo.xunKong ? '·旬空' : ''}）：${jiangOf(mo) || '结局的信号'}。` +
        `三传讲的是一件事从发端、经过到落定的过程，可以按这个顺序对照你的处境。`,
    },
    {
      key: 'geju', label: '课体与四课',
      text: `本课为${pick(gj, 'name', '未定')}${gj.detail ? `（${gj.detail}）` : ''}。${ke.length ? `四课：${ke.map((k, i) => `${i + 1}课 ${k.top || ''}上${k.bottom || ''}下`).join('　')}` : ''}`,
    },
  ];

  const chuQin = pick(chu, 'liuQin', '');
  const moQin = pick(mo, 'liuQin', '');
  const hasKong = !!(chu.xunKong || zhong.xunKong || mo.xunKong);

  const dimensions = [
    {
      key: 'overall', label: '整体运势',
      text: `这一课${pick(gj, 'name', '')}${gj.detail ? `·${gj.detail}` : ''}，发端在${pick(chu, 'zhi', '')}（${jiangOf(chu) || ''}），落定在${pick(mo, 'zhi', '')}（${jiangOf(mo) || ''}）。` +
        `${hasKong ? '课中有旬空，提示事情里有「看着有、实则虚」的部分，涉及承诺与数字的要核实。' : '课中无旬空，事情相对实在。'}` +
        `整体倾向是：${/吉|生|合/.test(jiangOf(chu) + jiangOf(mo)) ? '开局与结局的象都不差，可以正常推进' : /虎|蛇|勾|空/.test(jiangOf(chu) + jiangOf(mo)) ? '过程中有牵绊与不明朗处，宜慢不宜快' : '平顺中带一点摩擦' }。`,
      advice: `${hasKong ? '先把信息核实清楚，别在含糊的基础上做决定' : '按你原本的计划推进即可'}。${/虎/.test(jiangOf(chu)) ? '开局带白虎，头几天别硬碰，先观察。' : ''}事情的局面是动态的，这一课看的是当下这一刻的气象。`,
    },
    {
      key: 'work', label: '工作与职业选择',
      text: `工作看官鬼与青龙、太常：本课${chuQin === '官鬼' ? '初传即见官鬼，事情一上来就与职位、考核或上级有关' : `初传为${chuQin || '未取'}，${jiangOf(chu) || ''}`}。` +
        `${/青龙/.test(JSON.stringify(sc)) ? '课中见青龙，工作层面有喜庆与进益的象' : '课中未见青龙，工作层面属常态推进'}；` +
        `${/朱雀/.test(JSON.stringify(sc)) ? '见朱雀，文书、沟通与口舌要留意，材料务必留底' : ''}`,
      advice: `涉及岗位与待遇的事，建议把口头承诺落成文字；${/朱雀/.test(JSON.stringify(sc)) ? '沟通时少说满话，多留余地。' : '正常沟通即可。'}选工作时优先考虑课象中显示出支撑力的方向。`,
    },
    {
      key: 'career', label: '事业发展',
      text: `末传${pick(mo, 'zhi', '')}（${moQin || ''}·${jiangOf(mo) || ''}）主结局，${moQin === '官鬼' ? '结局落在官鬼，事业这条线会有明确的结果或位置变化' : moQin === '妻财' ? '结局落在妻财，更多体现为收入与资源的落袋' : moQin === '子孙' ? '结局落在子孙，压力会消散，适合收尾与转向' : '结局的信号相对中性'}。` +
        `${mo.xunKong ? '末传旬空，结局有落空的可能，别把预期定得太满。' : '末传不空，结果相对实在。'}`,
      advice: `按三传的顺序安排节奏：初传阶段先摸清情况，中传阶段处理摩擦，末传阶段收果。${mo.xunKong ? '对结果保留一点弹性，Plan B 提前想好。' : '可以朝着末传给出的方向去准备。'}`,
    },
    {
      key: 'love', label: '爱情与感情',
      text: `感情看妻财与天后、六合：本课${/六合/.test(JSON.stringify(sc)) ? '见六合，有和合、契约之象，关系层面是往一起走的' : '未见六合，关系层面没有明显的和合信号'}；` +
        `${/天后/.test(JSON.stringify(sc)) ? '见天后，有被照顾、被回应的象' : ''}${/玄武/.test(JSON.stringify(sc)) ? '见玄武，提示信息不明或有隐瞒，重要的事要当面问清' : ''}` +
        `${/妻财/.test(JSON.stringify(sc)) ? '课中见妻财，感情这条线是被看到的' : ''}。`,
      advice: `${/玄武/.test(JSON.stringify(sc)) ? '关系里有看不清的地方，别猜，直接问。' : '按你感受到的相处状态来判断就好。'}卦象只反映当下的气氛，关系如何取决于两个人怎么做。`,
    },
    {
      key: 'health', label: '健康状况',
      text: `健康看白虎与子孙：本课${/白虎/.test(JSON.stringify(sc)) ? '见白虎，传统取象上提示身体有需要留意的地方，尤其突发的不适别忽视' : '未见白虎，卦象未指向明显的身体问题'}；` +
        `${/子孙/.test(JSON.stringify(sc)) ? '见子孙，医药与调养的出口是有的，恢复的象在' : '未见子孙，休息与调养需要自己主动安排'}。这些都是象征提示，不构成医学判断。`,
      advice: `${/白虎/.test(JSON.stringify(sc)) ? '近期别熬夜、别硬扛，有条件做一次检查' : '保持现有作息，适度运动即可'}。任何不适请就医，这一课不能替代诊断。`,
    },
  ];

  return {
    lead: `大六壬看的是一件事的来龙去脉。三传给出「发端—过程—结局」的顺序，下面按这个结构分五个维度说。`,
    dimensions, sections,
  };
}

// ══════════════════════════════════════════════════════════
// 塔罗
// ══════════════════════════════════════════════════════════
function tarotInterpret(r) {
  const cards = Array.isArray(r.cards) ? r.cards : [];
  const n = cards.length;
  const major = cards.filter((c) => c.arcana === '大阿卡纳');
  const upright = cards.filter((c) => c.upright);
  const reversed = cards.filter((c) => !c.upright);
  const court = cards.filter((c) => /国王|王后|骑士|侍从/.test(String(c.name)));

  // 元素分布
  const elCount = {};
  for (const c of cards) if (c.element) elCount[c.element] = (elCount[c.element] || 0) + 1;
  const elText = Object.entries(elCount).map(([k, v]) => `${k}×${v}`).join('、') || '分布不明';
  const lack = ['火', '水', '风', '土'].filter((e) => !elCount[e]);

  // 主轴：优先未来位/最后一张，其次第一张
  const axis = cards.find((c) => /未来|结果|建议/.test(String(c.position))) || cards[cards.length - 1] || null;

  // 整体叙事：把各张串成一条线，避免各说各话
  const narrative = cards.map((c, i) => {
    const turn = c.upright ? '顺' : '滞';
    return `${c.position}（${c.positionHint || ''}）${c.name}${c.orientation}：${c.core || (c.keywords || []).join('、')}，这一环是${turn}的`;
  }).join('；');

  const sections = [
    {
      key: 'narrative', label: '整盘连贯解读',
      text: `先把几张牌串成一条线来看：${narrative}。` +
        `${axis ? `整盘的主轴是「${axis.name}」（${axis.position}·${axis.orientation}）——${axis.core || ''}。其余几张可以理解为这条主线在不同阶段的样貌：${cards.filter((c) => c !== axis).map((c) => `${c.position}的${c.name}说明${c.core || (c.keywords || []).join('、')}`).join('，')}。` : ''}` +
        `所以这张牌阵讲的不是几件不相干的事，而是同一件事在不同时间位置上的样子。`,
    },
    {
      key: 'structure', label: '牌面结构',
      text: `${n} 张牌中有 ${major.length} 张大阿卡纳（占 ${Math.round((major.length / n) * 100)}%），${major.length >= Math.ceil(n / 2) ? '大牌过半，事情牵动的层面较深，与环境、阶段性的课题有关' : '大牌不到半数，重点更偏日常层面的具体人事'}。` +
        `元素分布：${elText}${lack.length ? `；缺${join(lack)}，这一块容易被忽略` : ''}。` +
        `正逆位 ${upright.length} 正 ${reversed.length} 逆，${reversed.length > upright.length ? '逆位偏多，说明阻滞主要来自内部状态而非外部条件' : '整体偏顺，逆位那张是全盘的关节'}。`,
    },
  ];

  const dimBase = (key) => {
    const hit = cards.find((c) => {
      const kw = (c.keywords || []).join('') + String(c.core || '');
      if (key === 'love') return /爱|情感|关系|圣杯|恋人|伴侣/.test(kw) || (c.domain === '情感与关系');
      if (key === 'work') return /工作|事业|职场|权杖|星币|金币/.test(kw) || (c.domain === '工作与事业');
      if (key === 'career') return /成就|成功|目标|进展|资源/.test(kw);
      if (key === 'health') return /健康|休息|疲惫|压力|疗愈/.test(kw);
      return true;
    });
    return hit;
  };

  const dimensions = [
    {
      key: 'overall', label: '整体运势',
      text: `整盘的主轴落在「${axis ? axis.name : '—'}」（${axis ? axis.orientation : ''}），${axis ? axis.core || (axis.keywords || []).join('、') : ''}。` +
        `${reversed.length ? `其中${join(reversed.map((c) => `${c.name}（${c.position}）`))}是逆位，逆位不等于凶，更像那股力量还没顺过来或用力过猛，它是这张牌阵里最值得你先看的部分。` : '全部为正位，说明牌面呈现的状态与你当下的处境是通的。'}` +
        `${lack.length ? `元素上缺${join(lack)}，${lack.map((e) => TAROT_ELEMENT_FOCUS[e]?.area).filter(Boolean).join('、')}这一块容易被忽略。` : ''}`,
      advice: `${reversed.length ? `先把${reversed[0].name}指出的卡点处理掉（${(reversed[0].keywords || []).join('、')}），暂时不要加码推进` : '按牌面呈现的节奏走'}；${lack.length ? `补一点${lack[0]}的力量：${TAROT_ELEMENT_FOCUS[lack[0]]?.advice || ''}` : '把注意力放在能立刻做的小事上，先动一件'}。牌是镜子，照的是你此刻的状态。`,
    },
    {
      key: 'work', label: '工作与职业选择',
      text: `${dimBase('work') ? `牌面上与工作最相关的是「${dimBase('work').name}」（${dimBase('work').position}·${dimBase('work').orientation}）：${dimBase('work').core || (dimBase('work').keywords || []).join('、')}。` : '牌面上没有明确指向工作的牌。'}` +
        `${court.length ? `牌中有宫廷牌${join(court.map((c) => c.name))}，说明局面里有具体的人（也可能就是你自己的某个侧面）在起作用。` : ''}` +
        `${elCount.土 ? '有土元素，现实条件与资源是被这张牌阵看到的。' : '缺土元素，现实条件与资源这块容易估计不足。'}`,
      advice: `工作上建议：${elCount.土 ? '把计划落到预算与时间表上，别停在口头' : '先把现实条件摸清楚——薪资、工时、稳定性，再谈喜好'}；${dimBase('work') && !dimBase('work').upright ? '这张相关牌是逆位，说明当下的不适主要来自状态而非岗位本身，可以调状态再看。' : ''}`,
    },
    {
      key: 'career', label: '事业发展',
      text: `从牌阵的时间线看：${cards.map((c) => `${c.position}是${c.name}${c.orientation}`).join('，')}。` +
        `${major.length >= Math.ceil(n / 2) ? '大牌过半，事业这条线牵动的不只是岗位，还有你对自己要往哪走的判断' : '变化更多发生在具体事务层面，先把眼前的项目做成'}` +
        `${axis ? `；结局位置的「${axis.name}」给出的方向是${axis.core || ''}` : ''}。`,
      advice: `建议把${cards[0]?.position || '最初'}这一环的课题先收尾，再往${axis?.position || '结果'}的方向推进；${elCount.火 ? '火的能量在，适合主动出击一步' : '缺火时别等热情来，先用流程推着自己动'}。事业发展是长线，牌面只反映当前这一段。`,
    },
    {
      key: 'love', label: '爱情与感情',
      text: `${dimBase('love') ? `与感情最相关的是「${dimBase('love').name}」（${dimBase('love').position}·${dimBase('love').orientation}）：${dimBase('love').core || (dimBase('love').keywords || []).join('、')}。` : '牌面上没有明确指向感情的牌，当下这段关系不是主要议题。'}` +
        `${elCount.水 ? '有水元素，情感与感受在这件事里占的分量不轻。' : '缺水元素，容易用理性压过感受，留意别忽略自己的情绪。'}`,
      advice: `${elCount.水 ? '先照顾好感受再谈效率：把想说的话说出口，比猜对方心思有效' : '给自己留一点感受情绪的时间，别把所有事都当任务处理'}；${dimBase('love') && !dimBase('love').upright ? '相关牌为逆位，提示关系里有没说开的地方，找个合适时机讲清楚。' : ''}关系取决于你们怎么做，牌只帮你把问题问清楚。`,
    },
    {
      key: 'health', label: '健康状况',
      text: `牌阵里${dimBase('health') ? `与健康状态最贴近的是「${dimBase('health').name}」：${dimBase('health').core || (dimBase('health').keywords || []).join('、')}` : '没有直接指向身体的牌'}。` +
        `${reversed.length >= 2 ? `${reversed.length} 张逆位，提示内在消耗偏大，身体往往是第一个反映出来的` : '整体状态与牌面呈现的相对一致'}` +
        `${elCount.土 || elCount.水 ? '' : '；缺土与水，作息与身体的基本盘容易被牺牲'}。这些是象征性的提示，不是诊断。`,
      advice: `${reversed.length >= 2 ? '建议先把睡眠与饮食稳住，别在这个阶段额外加压' : '维持现有作息，适度运动即可'}；${lack.length ? `补${lack[0]}所代表的${TAROT_ELEMENT_FOCUS[lack[0]]?.area || ''}：${TAROT_ELEMENT_FOCUS[lack[0]]?.advice || ''}` : ''}身体有明确不适请就医，牌面不能替代专业意见。`,
    },
  ];

  return {
    lead: `塔罗是一套象征系统而不是判决。下面先给整盘的连贯解读（把几张牌串成一条线），再分五个维度落到生活里。`,
    dimensions, sections,
  };
}

// ══════════════════════════════════════════════════════════
// 统一入口
// ══════════════════════════════════════════════════════════
const BUILDERS = {
  bazi: baziInterpret,
  ziwei: ziweiInterpret,
  liuyao: liuyaoInterpret,
  meihua: meihuaInterpret,
  daliuren: daliurenInterpret,
  tarot: tarotInterpret,
};

/**
 * 生成解析与详解
 * @param {object} r compute() 的返回值
 * @param {object} [opts] 可选：{ question 所问之事, direction 询问方向 key }
 *                 传了就把最贴近的维度提前、在该维度点明问题与方向，并给出回显串
 * @returns {object|null} 结构化解析对象
 */
function interpret(r, opts) {
  if (!isObj(r) || !r.system) return null;
  const fn = BUILDERS[r.system];
  if (!fn) return null;
  let body;
  try {
    body = fn(r);
  } catch (e) {
    return {
      moduleType: MODULE_TYPE[r.system] || 'natal',
      system: r.system,
      systemLabel: SYSTEM_LABEL[r.system] || r.system,
      title: '解析与详解',
      lead: '这一盘的解析暂未生成，请稍后重试。',
      dimensions: [],
      sections: [],
      disclaimer: DISCLAIMER,
      error: String(e && e.message),
      ask: askOf(opts),
    };
  }
  const tuned = applyAsk(body.dimensions || [], askOf(opts), body.lead || '');
  return {
    moduleType: MODULE_TYPE[r.system] || 'natal',
    system: r.system,
    systemLabel: SYSTEM_LABEL[r.system] || r.system,
    title: '解析与详解',
    lead: tuned.lead,
    dimensions: tuned.dims,
    sections: body.sections || [],
    disclaimer: DISCLAIMER,
    ask: askOf(opts),
  };
}


return { DIMENSIONS, MODULE_TYPE, SYSTEM_LABEL, DIRECTIONS, DIRECTION_DEFAULT, dirOf, hexInfo, interpret };
})();

__mods.index = (function () {
// 统一入口：解析参数、分派到各体系、生成可读摘要
const { buildBazi } = __mods.bazi;
const { buildLiuyao, tossLines } = __mods.liuyao;
const { buildZiwei, BRIGHTNESS } = __mods.ziwei;
const { drawTarot } = __mods.tarot;
const { buildMeihua } = __mods.meihua;
const { buildDaliuren } = __mods.daliuren;
const { geocodeAddress, resolveAddress } = __mods.geo;
const { toJDN, ganzhiName, dayGanzhiIndex } = __mods.calendar;
const { interpret, DIRECTIONS, DIRECTION_DEFAULT } = __mods.interpret;



const pad = (n) => String(n).padStart(2, '0');

/** 解析 'YYYY-MM-DDTHH:mm' / 'YYYY-MM-DD HH:mm' / 'YYYY-MM-DD' */
function parseDateTime(text) {
  if (typeof text !== 'string' || !text.trim()) throw new Error('缺少 datetime（公历日期时间）');
  const m = text.trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T\s](\d{1,2}):(\d{1,2}))?$/);
  if (!m) throw new Error(`无法解析 datetime：「${text}」，请用 1990-05-12T14:30 这种格式`);
  const out = {
    year: Number(m[1]), month: Number(m[2]), day: Number(m[3]),
    hour: Number(m[4] ?? 0), minute: Number(m[5] ?? 0),
  };
  if (out.month < 1 || out.month > 12) throw new Error('月份超出范围');
  if (out.day < 1 || out.day > 31) throw new Error('日期超出范围');
  if (out.hour > 23 || out.minute > 59) throw new Error('时间超出范围');
  return out;
}

function baziText(r) {
  const P = r.pillars;
  const line = (label, p) =>
    `${label}：${p.ganzhi}　${p.stemTenGod ? `十神 ${p.stemTenGod}　` : ''}藏干 ${p.hidden.map((h) => `${h.stem}(${h.tenGod})`).join(' ')}　纳音 ${p.nayin}`
    + `　地势 ${p.dishi}　自坐 ${p.zizuo}　空亡 ${p.kongwang.join('')}`
    + (p.shensha && p.shensha.length ? `　神煞 ${p.shensha.join('、')}` : '');
  const wuxing = Object.entries(r.wuxing).map(([k, v]) => `${k}${v}`).join(' ');
  const dayun = r.dayun.list.slice(0, 8)
    .map((d) => `${d.startAge}岁 ${d.ganzhi}(${d.stemTenGod})${d.luck ? `·${d.luck.tier}` : ''}${d.relations && d.relations.length ? `[${d.relations.join('')}]` : ''}`).join('　');
  const near = r.jieqi.nearBoundaryMinutes < 15
    ? `\n⚠ 出生时刻距「节」仅 ${r.jieqi.nearBoundaryMinutes} 分钟，节气时刻本身有分钟级误差，月柱建议人工复核。`
    : '';
  const SHORT = { year: '年', month: '月', day: '日', hour: '时' };
  const shenshaLine = r.shensha && r.shensha.groups && r.shensha.groups.length
    ? `神煞（${r.shensha.count} 见）：` + r.shensha.groups.map((g) =>
      `${g.cat}｜` + g.items.map((i) => `${i.name}(${i.pillars.map((k) => SHORT[k]).join('')})`).join('、')).join('；')
    : '神煞：—';
  const gejuLine = r.frame ? [
    `格局：${r.frame.primary ? `${r.frame.primary.name}（${r.frame.primary.evidence}）` : '—'}`,
    `　　　${r.frame.geju.map((g) => `${g.name}[${g.kind}]`).join('　')}`,
    `用神：喜${r.frame.yongshen.favor.join('')}（${r.frame.yongshen.favorTenGods.join('、')}）　忌${r.frame.yongshen.avoid.join('')}（${r.frame.yongshen.avoidTenGods.join('、')}）　${r.frame.yongshen.method}`,
    `　　　${r.frame.yongshen.detail}`,
    `十神权重：${Object.entries(r.frame.godStats.groups).map(([k, v]) => `${k}${v}`).join(' ')}`,
  ] : [];
  return [
    `【四柱】${P.year.ganzhi} ${P.month.ganzhi} ${P.day.ganzhi} ${P.hour.ganzhi}`,
    `日主：${r.dayMaster.stem}${r.dayMaster.element}（${r.dayMaster.yinYang}）　空亡：${r.kongwang.join('')}`,
    line('年柱', P.year), line('月柱', P.month), line('日柱', P.day), line('时柱', P.hour),
    `五行：${wuxing}`,
    `日主强弱：${r.strength.level}（${r.strength.score}）　${r.strength.detail}`,
    ...gejuLine,
    `天干关系：${(r.relations && r.relations.stems.length) ? r.relations.stems.join('　') : '—'}`,
    `地支关系：${(r.relations && r.relations.branches.length) ? r.relations.branches.join('　') : '—'}`,
    shenshaLine,
    `真太阳时：${r.solarTime.trueSolarText}（${r.input.geo ? r.input.geo.note + '；' : ''}${r.solarTime.note}）`,
    `节气：上一节 ${r.jieqi.previous.name} ${r.jieqi.previous.time}　下一节 ${r.jieqi.next.name} ${r.jieqi.next.time}`,
    `大运：${r.dayun.rule}（${r.dayun.direction}），${r.dayun.startAge.years}岁${r.dayun.startAge.months}个月起运`,
    `　${dayun}`,
    `流年：${r.liunian.slice(0, 10).map((l) => `${l.year}${l.ganzhi}(${l.stemTenGod})${l.luck ? `·${l.luck.tier}` : ''}`).join('　')}`,
    '（格局、用神、行运吉凶为扶抑＋简化调候的量化提示，非断语。）',
  ].join('\n') + near;
}

function ziweiText(r) {
  const lunarText = `${r.lunar.year}年${r.lunar.isLeap ? '闰' : ''}${r.lunar.month}月${r.lunar.day}日`;
  const starText = (stars) => (stars.length
    ? stars.map((s) => `${s.name}${s.mutagen ? `化${s.mutagen}` : ''}`).join(' ')
    : '—');
  const shenshaText = (s) =>
    `神煞：长生(${s.changsheng}) 博士(${s.boshi}) 将前(${s.jiangqian}) 岁前(${s.suiqi})`;
  const rows = [];
  for (const p of r.palaces) {
    const mark = p.isSoul ? '【命】' : p.isBody ? '【身】' : '　　';
    rows.push(`  ${p.palace} ${p.branch} ${p.ganzhi} ${mark} 大限${String(p.daxian.start).padStart(2)}-${p.daxian.end} 小限${String(p.xiaoxian.age).padStart(2)}  ${starText(p.stars)}`);
    rows.push(`     ${shenshaText(p.shensha)}`);
  }
  const liunian = (r.liunian ?? []).slice(0, 6).map((l) =>
    `  ${l.year} ${l.ganzhi} ${String(l.age).padStart(2)}岁 命宫${l.lifePalace.branch}(${l.lifePalace.palace}) 流禄${l.liulu} 流羊${l.liuyang} 流陀${l.liutuo} ｜ ${l.mutagen.map((m) => m.replace('化', '')).join(' ')}`
    + (l.mutagenHits ? `　四化落宫 ${l.mutagenHits.map((m) => `${m.star}${m.type}→${m.palace || '未上盘'}`).join('、')}` : '')
    + (l.sanfangMainStars ? `　三方主星 ${l.sanfangMainStars.join('')}` : ''));
  const patterns = (r.patterns ?? []).length
    ? r.patterns.map((p) => `${p.name}（${p.tone === 'good' ? '吉格' : p.tone === 'bad' ? '忌格' : '中'}：${p.evidence}）`).join('；')
    : '无明显格局（按内置规则）';
  const daxian = (r.daxianList ?? []).slice(0, 8).map((d) =>
    `  ${d.branch}宫（${d.palace}）${d.ages[0]}-${d.ages[1]}岁 ${d.ganzhi} 会${d.mainStars.join('') || '—'} 化 ${d.mutagenHits.map((m) => `${m.star}${m.type}→${m.palace || '未上盘'}`).join('、')}`);
  return [
    `【农历】${lunarText}（月首 ${r.lunar.monthStart}）　时支：${r.hourBranch}　年干支：${r.yearGanzhi}`,
    `【时刻】${r.solarTime ? `${r.solarTime.civilText} → 真太阳时 ${r.solarTime.trueSolarText}${r.input.geo ? '（' + r.input.geo.note + '）' : ''}` : ''}`,
    `【命宫】${r.soul.branch}（${r.soul.ganzhi}·${r.soul.nayin}）　【身宫】${r.body.branch}（落${r.body.lands}）　【五行局】${r.bureau.name}`,
    `【紫微】${r.ziwei}　【天府】${r.tianfu}　【命主】${r.lifeMaster}　【身主】${r.bodyMaster}`,
    `【大限】${r.daxian.rule}，${r.daxian.startAge}岁起　【小限】${r.xiaoxianRule.direction}`,
    `【昌曲】文昌${r.changqu.wenchang.branch}（${r.changqu.wenchang.palace}${r.changqu.wenchang.mutagen ? '·化' + r.changqu.wenchang.mutagen : ''}）　文曲${r.changqu.wenqu.branch}（${r.changqu.wenqu.palace}${r.changqu.wenqu.mutagen ? '·化' + r.changqu.wenqu.mutagen : ''}）`,
    `　　　${r.changqu.relation}　入命三方：${r.changqu.inSoulSanfang ? '是' : '否'}　吸收面：${r.changqu.absorb.label}（${r.changqu.absorb.reason}）`,
    '十二宫：',
    ...rows,
    '大限（按起运年龄排序，前 8 限，宫干四化落宫）：',
    ...daxian,
    '流年（前 6 年，完整 12 年在结构化数据里）：',
    ...liunian,
    `【格局】${patterns}`,
    r.patternSummary ? `【结构统计】吉格 ${r.patternSummary.good.length}、忌格 ${r.patternSummary.bad.length}；${r.patternSummary.note}` : '',
    r.lunar.note ? `注：${r.lunar.note}` : '',
  ].filter(Boolean).join('\n');
}

function daliurenText(r) {
  const sc = r.sanChuan;
  const one = (c) => `${c.zhi}(${c.jiang}${c.liuQin}${c.xunKong ? '空' : ''})`;
  return [
    `【日时】${r.dayGanZhi}日　${r.hourZhi}时（${r.dayNight}贵）　月将 ${r.yueJiang.name}${r.yueJiang.zhi}　节气 ${r.jieqi.name}`,
    `【三传】初 ${one(sc.chu)} → 中 ${one(sc.zhong)} → 末 ${one(sc.mo)}`,
    `【四课】${r.siKe.map((k) => `${k.position}课 ${k.shang}上${k.xia}下(${k.relation}·${k.jiang})`).join('　')}`,
    `【天地盘】${r.pan.map((p) => `${p.di}:${p.tian}(${p.jiang})`).join(' ')}`,
    `【格局】${r.geJu.name}·${r.geJu.detail}`,
  ].join('\n');
}

function meihuaText(r) {
  const lines = [
    `【起卦】${r.source}`,
    `【本卦】${r.ben.name}（上${r.ben.upper} 下${r.ben.lower}）　动爻：${r.movingName}`,
    `【互卦】${r.hu.name}　【变卦】${r.bian.name}　【错卦】${r.cuo.name}　【综卦】${r.zong.name}`,
    `【体用】体 ${r.bodyUse.body.trigram}${r.bodyUse.body.element}　用 ${r.bodyUse.use.trigram}${r.bodyUse.use.element}　${r.bodyUse.level}`,
    `　　　　${r.bodyUse.relation}`,
  ];
  const bars = r.lines.slice().reverse().map((l) =>
    `  ${l.name} ${l.yinYang === '阳' ? '━━━━━' : '━━  ━━'}${l.moving ? ' ←动' : ''}`);
  return [...lines, '【爻】', ...bars].join('\n');
}

function tarotText(r) {
  const lines = [
    r.question ? `【所问】${r.question}` : '（未填写提问）',
    `【牌阵】${r.spread}${r.castAt ? `　抽牌于 ${r.castAt}` : ''}`,
  ];
  for (const c of r.cards) {
    lines.push(`  ${c.position}：${c.name}（${c.orientation}）　${c.keywords.join('、')}`);
  }
  if (r.reading && r.reading.length) {
    lines.push('【解读】');
    for (const p of r.reading) lines.push(`  ${p}`);
  }
  return lines.join('\n');
}

function liuyaoText(r) {
  const fmt = (hex) => {
    const rows = hex.lines.slice().reverse().map((l) => {
      const mark = l.position === hex.shi ? '世' : l.position === hex.ying ? '应' : '　';
      return `  ${l.name} ${mark} ${l.symbol} ${l.ganzhi}${l.element} ${l.liuqin}/${l.liushen}`;
    });
    return [`${hex.name}（${hex.palace}·${hex.palaceElement}）`, ...rows].join('\n');
  };
  const out = [
    `起卦：${r.cast.notation.join('、')}（自下而上）`,
    `日辰：${r.dayGanZhi.name}`,
    r.question ? `所问：${r.question}` : '',
    '本卦：',
    fmt(r.ben),
  ];
  if (r.bian) out.push(`动爻：第 ${r.cast.movingPositions.join('、')} 爻`, '变卦（六亲以变卦自身宫论）：', fmt(r.bian));
  else out.push('六爻安静，无变卦。');
  return out.filter(Boolean).join('\n');
}

/** 工具输出必须是无损 JSON：去掉 undefined / 函数等不可序列化的值 */
function jsonSafe(value) {
  return JSON.parse(JSON.stringify(value));
}

/**
 * 统一排盘入口
 * @param {object} args
 * @param {'bazi'|'ziwei'|'liuyao'} args.system
 * @param {string} [args.datetime]
 */
function compute(args = {}) {
  const r = jsonSafe(computeRaw(args));
  // 显式要求时才附加解析模块，避免默认输出过长
  if (args.withInterpret) r.interpret = interpret(r);
  return r;
}

function computeRaw(args) {
  const system = args.system;
  if (system === 'bazi') {
    const dt = parseDateTime(args.datetime);
    const result = buildBazi({
      ...dt,
      gender: args.gender === 'female' ? 'female' : 'male',
      longitude: typeof args.longitude === 'number' ? args.longitude : undefined,
      address: typeof args.address === 'string' ? args.address : undefined,
      geo: args.geo && typeof args.geo === 'object' ? args.geo : undefined,
      lateZi: args.lateZi !== false,
      trueSolar: args.trueSolar !== false,
    });
    return { ...result, summary: baziText(result) };
  }
  if (system === 'ziwei') {
    const dt = parseDateTime(args.datetime);
    const result = buildZiwei({
      ...dt,
      gender: args.gender === 'female' ? 'female' : 'male',
      leapAsNext: args.leapAsNext === true,
      longitude: typeof args.longitude === 'number' ? args.longitude : undefined,
      address: typeof args.address === 'string' ? args.address : undefined,
      geo: args.geo && typeof args.geo === 'object' ? args.geo : undefined,
      trueSolar: args.trueSolar,
    });
    return { ...result, summary: ziweiText(result) };
  }
  if (system === 'tarot') {
    // 抽牌不看时间：castAt 只记录此刻，避免误用出生时间
    const result = drawTarot({ count: Number(args.count) || 3, question: args.question });
    return { ...result, summary: tarotText(result) };
  }
  if (system === 'daliuren') {
    const dt = parseDateTime(args.datetime);
    const result = buildDaliuren({ ...dt, lateZi: args.lateZi !== false });
    return { ...result, summary: daliurenText(result) };
  }
  if (system === 'meihua') {
    const result = buildMeihua({
      mode: args.mode === 'number' ? 'number' : 'time',
      datetime: args.datetime,
      upper: args.upper,
      lower: args.lower,
      changing: args.changing,
    });
    return { ...result, summary: meihuaText(result) };
  }
  if (system === 'liuyao') {
    const lines = Array.isArray(args.lines) && args.lines.length
      ? args.lines.map(Number)
      : tossLines();
    let dayGanZhi;
    if (args.datetime) {
      const dt = parseDateTime(args.datetime);
      const g = ganzhiName(dayGanzhiIndex(toJDN(dt.year, dt.month, dt.day)));
      dayGanZhi = { stem: g.stem, branch: g.branch, name: g.name };
    }
    const result = buildLiuyao({ lines, question: args.question, dayGanZhi });
    return { ...result, summary: liuyaoText(result) };
  }
  throw new Error(`未知体系「${system}」，可选：bazi（四柱八字）、liuyao（六爻）。紫微斗数尚未接入。`);
}

/** 给模型的紧凑文本（去掉大字段，保留摘要） */
function renderText(result) {
  return result.summary ?? JSON.stringify(result, null, 2);
}

/** 对外暴露：地址解析（异步，含联网） */




return { interpret, DIRECTIONS, DIRECTION_DEFAULT, BRIGHTNESS, geocodeAddress, resolveAddress, buildBazi, buildLiuyao, tossLines, parseDateTime, compute, renderText };
})();

    const Engine = __mods.index;
    window.Engine = Engine;
// 共用渲染层：紫微/八字/六爻/梅花/六壬/塔罗 -> HTML 字符串。面板与独立页面共用同一份。
(function () {
  const CSS = `
.pp{--ink:#1b1b1b;--muted:#6f6a60;--line:#c8c1b2;--bg:#fffdf8;--card:#fffefb;--red:#b3261e;--lu:#1f6f3f;--quan:#8a5a00;--ke:#1f4e79;--ji:#b3261e;
  border:1px solid var(--line);background:var(--bg);color:var(--ink);font-family:"Songti SC","SimSun","Microsoft YaHei",serif;font-size:12.5px;line-height:1.55;
  container-type:inline-size}
.pp *{box-sizing:border-box}
.pp-grid{display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,minmax(150px,auto));gap:0}
.pp-cell{border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:7px 8px;display:flex;flex-direction:column;position:relative;min-height:150px;background:var(--bg)}
.pp-cell:nth-child(4n){border-right:none}
.pp-cell.pp-lastrow{border-bottom:none}
.pp-center{grid-column:2/4;grid-row:2/4;border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:16px 18px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;text-align:center;background:var(--bg)}
.pp-center .t1{font-size:17px;font-weight:700;letter-spacing:.05em;margin-bottom:6px}
.pp-center .t2{font-size:12.5px;color:var(--ink)}
.pp-center .t3{font-size:14px;letter-spacing:.35em;margin:6px 0;font-weight:600}
.pp-center .t4{font-size:12.5px;color:var(--muted)}
.pp-stars{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:0 6px;font-size:13px;line-height:1.6;min-height:36px}
.pp-st{white-space:nowrap}
.pp-st.main{font-weight:700}
.pp-st.good{color:var(--lu)}
.pp-st.bad{color:var(--ji)}
.pp-st.aux{color:var(--muted)}
.pp-m{display:inline-block;font-style:normal;font-size:12px;line-height:1;padding:0 2px;border-radius:2px;color:#fff;margin-left:1px;vertical-align:1px}
.pp-m.lu{background:var(--lu)}.pp-m.quan{background:var(--quan)}.pp-m.ke{background:var(--ke)}.pp-m.ji{background:var(--ji)}
/* 庙旺得利平不陷：星名后的等级小字。刻意压低视觉权重（灰为主、陷才微红），
   避免与四化的实心彩色方块抢层次 */
.pp-b{font-style:normal;font-size:11.5px;margin-left:4px;color:var(--muted);letter-spacing:0;opacity:.9}
.pp-b.good{color:#4c7a5c}
.pp-b.mid{color:var(--muted)}
.pp-b.bad{color:#9c5b56}
.pp-ages{margin-top:2px;font-size:12px;color:var(--muted);letter-spacing:.02em}
.pp-foot{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;gap:4px;font-size:12px;color:var(--muted)}
.pp-foot .l{display:flex;flex-direction:column;gap:0;line-height:1.5}
.pp-foot .l .dx{color:var(--ink)}
.pp-foot .r{display:flex;flex-direction:column;align-items:flex-end;gap:0;line-height:1.5}
.pp-foot .pn{color:var(--red);font-size:14px;font-weight:700}
.pp-soul{box-shadow:inset 0 0 0 2px rgba(179,38,30,.35)}
.pp-body::after{content:"身";position:absolute;top:4px;left:4px;font-size:12px;color:#fff;background:var(--muted);padding:0 3px;border-radius:2px}
.pp-legend{display:flex;gap:10px;align-items:center;justify-content:center;font-size:12px;color:var(--muted);margin-top:6px}
.pp-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;font-family:system-ui,sans-serif}
.pp-chip{font-size:12.5px;padding:3px 9px;border:1px solid var(--line);color:var(--muted);background:var(--bg)}
.pp-chip.ok{color:var(--lu);border-color:var(--lu)}
.pp-chip.warn{color:var(--quan);border-color:var(--quan)}
.pp-sec{margin-top:10px}
.pp-sec-h{font-size:12.5px;letter-spacing:.08em;color:#8a8378;font-weight:700;margin-bottom:2px}
.pp-tl{font-size:12.5px;color:var(--muted);line-height:1.75}
.pp-bz{width:100%;border-collapse:collapse;font-size:13.5px;font-family:system-ui,sans-serif}
.pp-bz th,.pp-bz td{border:1px solid var(--line);padding:8px 10px;text-align:center}
.pp-bz th{color:var(--red);font-weight:600;font-size:12.5px}
.pp-bz td.big{font-size:24px;font-weight:700}
.pp-bz td.lbl{color:var(--muted);font-size:12.5px;width:60px}
.wx-wood{color:#1f6f3f}.wx-fire{color:#b3261e}.wx-earth{color:#8a5a00}.wx-metal{color:#8a6b1f}.wx-water{color:#1f4e79}
.zhuri{color:#b3261e;font-weight:700}
.pp-rel{margin-top:10px;font-size:13px;line-height:1.9}
.pp-rel b{color:var(--muted);font-weight:400;margin-right:10px}
.pp-str{margin-top:10px;font-size:13px;line-height:1.8}
.pp-str b{color:var(--red);font-size:15px;margin:0 4px}
.pp-drel{font-style:normal;color:var(--red);font-size:12px}
.pp-dim{color:var(--muted)}
.pp-r{display:none}
.pp-modes{display:flex;align-items:center;border-bottom:1px solid var(--line);font-family:system-ui,sans-serif}
.pp-modes label{padding:6px 20px;font-size:12.5px;color:var(--muted);cursor:pointer;border-right:1px solid var(--line);user-select:none}
.pp-modes label:hover{background:#f2ece0}
.pp-soon{margin-left:auto;padding-right:10px;font-size:12px;color:#a9a296}
.pp-body{display:none}
#ppm-ben:checked~.pp-body.ben,#ppm-da:checked~.pp-body.da,#ppm-ln:checked~.pp-body.ln{display:block}
#ppm-ben:checked~.pp-modes label[for="ppm-ben"],#ppm-da:checked~.pp-modes label[for="ppm-da"],#ppm-ln:checked~.pp-modes label[for="ppm-ln"]{background:var(--red);color:#fff}
.pp-tri{background:#fbf8f1}
.pp-soul{background:#fdf3f1}
.pp-zh{margin-left:4px;white-space:nowrap}
.pp-ss{display:flex;flex-wrap:wrap;gap:0 7px;font-size:12.5px;line-height:1.6}
.pp-ss .s{white-space:nowrap;cursor:help}
.pp-ss .s.good{color:var(--lu)}
.pp-ss .s.bad{color:var(--ji)}
.pp-ss .s.neutral{color:var(--quan)}
.pp-ssx{margin-top:10px;font-family:system-ui,sans-serif}
.pp-ssx .h{display:flex;align-items:baseline;gap:8px;font-size:12.5px;color:var(--muted);border-top:1px solid var(--line);padding-top:8px;margin-top:10px}
.pp-ssx .h b{color:var(--red);font-size:14px;font-weight:600}
.pp-ssg{display:flex;gap:8px;align-items:baseline;margin-top:5px;font-size:12.5px;line-height:1.7}
.pp-ssg .gt{flex:0 0 40px;color:var(--muted);font-size:12px;letter-spacing:.08em}
.pp-ssg .gi{display:flex;flex-wrap:wrap;gap:3px 6px}
.pp-ssi{white-space:nowrap;border:1px solid var(--line);padding:0 5px;cursor:help}
.pp-ssi.good{color:var(--lu);border-color:rgba(31,111,63,.35)}
.pp-ssi.bad{color:var(--ji);border-color:rgba(179,38,30,.3)}
.pp-ssi.neutral{color:var(--quan);border-color:rgba(138,90,0,.3)}
.pp-ssi em{font-style:normal;font-size:12px;color:var(--muted);margin-left:2px}

/* —— 爻线：真线，阳为整条、阴为断开、动爻描红 —— */
.hex{display:flex;gap:16%;height:11px;width:104px;flex:0 0 auto;color:var(--ink);align-items:stretch}
.hex i{flex:1;background:currentColor;border-radius:1.5px}
.hex.yin{gap:18%}
.hex.on{color:var(--red)}
.hex.dim{color:#b9b2a4}
.hex.sm{width:74px;height:9px}
.hex.md{width:88px;height:10px}

/* —— 六爻 —— */
.hy-wrap{display:flex;gap:22px;flex-wrap:wrap;align-items:flex-start}
.hy-box{border:1px solid var(--line);background:var(--card);padding:12px 16px 14px;min-width:250px}
.hy-h{display:flex;align-items:baseline;gap:8px;margin-bottom:10px;font-family:system-ui,sans-serif}
.hy-h b{color:var(--red);font-size:14px}
.hy-h span{color:var(--muted);font-size:12px}
.hy{display:flex;flex-direction:column;gap:6px}
.hy-row{display:grid;grid-template-columns:18px 30px 112px 60px 54px 40px;gap:8px;align-items:center;font-size:13px;font-family:system-ui,sans-serif;padding:1px 0}
.hy-sy{color:var(--red);font-size:12px;font-weight:700}
.hy-nm{color:var(--muted);font-size:12px}
.hy-gz{letter-spacing:.04em}
.hy-ls{color:var(--muted);font-size:12px}
.hy-dn{color:var(--red);font-size:12px;font-family:system-ui,sans-serif}
.hy-void{color:#a9a296}
.hy-row.plain{grid-template-columns:34px 112px;gap:9px;padding:0}
.mh-mini{display:flex;flex-direction:column;gap:4px}

/* —— 梅花 —— */
.mh{padding:16px}
.mh-head{font-size:13px;color:var(--muted);margin-bottom:12px}
.mh-main{display:flex;gap:18px;flex-wrap:wrap;align-items:flex-start}
.hexbox{border:1px solid var(--line);background:var(--card);padding:12px 15px 13px}
.hexbox.mini{min-width:118px}
.hexbox .h{display:flex;justify-content:space-between;gap:10px;font-size:12px;letter-spacing:.14em;color:var(--muted);font-family:system-ui,sans-serif;margin-bottom:5px}
.hexbox .n{font-size:17px;font-weight:700;color:var(--red);margin-bottom:8px;letter-spacing:.04em}
.hexbox.mini .n{font-size:15px;margin-bottom:6px}
.hexbox .s{font-size:12px;color:var(--muted);margin-top:8px;font-family:system-ui,sans-serif}
.trib{display:flex;flex-direction:column;gap:4px}
.trib+.trib{margin-top:8px;padding-top:8px;border-top:1px dotted var(--line)}
.trib-h{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--muted);font-family:system-ui,sans-serif;margin-bottom:3px}
.tri-tag{font-size:12px;padding:0 4px;border:1px solid var(--line);color:var(--muted);font-family:system-ui,sans-serif}
.tri-tag.ti{color:var(--red);border-color:rgba(179,38,30,.45);font-weight:700}
.tri-tag.yong{color:var(--ke);border-color:rgba(31,78,121,.45)}
.mh-rel{margin-top:12px;font-size:13.5px;font-family:system-ui,sans-serif;line-height:1.8}
.mh-rel b{color:var(--muted);font-weight:400;margin-right:8px}
.mh-rel .lv{font-weight:700}
.mh-rel .lv.good{color:var(--lu)}
.mh-rel .lv.bad{color:var(--ji)}
.mh-rel .lv.flat{color:var(--quan)}

/* —— 大六壬 —— */
.dl{padding:16px}
.dl-head{font-size:13px;color:var(--muted);margin-bottom:12px;line-height:1.7}
.dl-sc{display:flex;align-items:stretch;margin:0 0 12px;flex-wrap:wrap}
.dl-sc-c{border:1px solid var(--line);background:var(--card);padding:10px 18px;min-width:110px;text-align:center}
.dl-sc-c+.dl-sc-c{border-left:none}
.dl-sc-c.ge{border-left:1px solid var(--line);background:#fbf6ec}
.dl-sc-k{font-size:12px;letter-spacing:.16em;color:var(--muted);font-family:system-ui,sans-serif}
.dl-sc-z{font-size:24px;font-weight:700;color:var(--red);line-height:1.2}
.dl-sc-j{font-size:12px}
.dl-sc-l{font-size:12px;color:var(--muted);font-family:system-ui,sans-serif}
.dl-sc-gn{font-size:16px;font-weight:700;margin-top:1px}
.dl-sk{display:flex;justify-content:center;margin-bottom:12px;flex-wrap:wrap}
.dl-sk-c{border:1px solid var(--line);background:var(--card);padding:8px 14px 9px;text-align:center;min-width:82px}
.dl-sk-c+.dl-sk-c{border-left:none}
.dl-sk-k{font-size:12px;color:var(--muted);letter-spacing:.1em;font-family:system-ui,sans-serif}
.dl-sk-s{font-size:17px;font-weight:700;color:var(--red);line-height:1.3}
.dl-sk-x{font-size:14.5px;color:var(--muted);line-height:1.3}
.dl-sk-r{font-size:12px;color:var(--muted);font-family:system-ui,sans-serif}
.dl-pan2{display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,minmax(84px,auto));border:1px solid var(--line);background:var(--bg)}
.dl-pc{border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:7px 9px;display:flex;flex-direction:column;gap:0}
.dl-pc .tz{font-size:21px;font-weight:700;color:var(--red);line-height:1.2}
.dl-pc .dz{font-size:12px;color:var(--muted);font-family:system-ui,sans-serif}
.dl-pc .jz{font-size:12px;color:var(--quan);margin-top:auto;font-family:system-ui,sans-serif}
.dl-c{grid-column:2/4;grid-row:2/4;border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:14px;display:flex;flex-direction:column;gap:4px;align-items:center;justify-content:center;text-align:center;background:#fffdf8}
.dl-c .t1{font-size:16px;font-weight:700;letter-spacing:.06em}
.dl-c .t2{font-size:12px;color:var(--muted);font-family:system-ui,sans-serif}
.dl-c .t3{font-size:12.5px;letter-spacing:.2em;margin-top:3px}
.dl-legend{display:flex;gap:12px;justify-content:center;font-size:12px;color:var(--muted);font-family:system-ui,sans-serif;margin-top:6px}

/* —— 塔罗 —— */
.tt{padding:16px}
.tt-head{font-size:12.5px;color:var(--muted);margin-bottom:12px;letter-spacing:.04em}
.tt-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(172px,1fr));gap:10px}
.tt-card{border:1px solid var(--line);background:#fffefb;padding:13px 14px;display:flex;flex-direction:column;gap:7px;min-height:168px}
.tt-card.rev{background:#fbf7f4;border-style:dashed}
.tt-pos{font-size:12px;color:var(--muted);letter-spacing:.14em}
.tt-name{font-size:19px;font-weight:700;color:var(--red);letter-spacing:.04em}
.tt-ori{font-size:12px;padding:1px 7px;border:1px solid var(--line);align-self:flex-start;color:var(--muted)}
.tt-kw{display:flex;flex-wrap:wrap;gap:4px 8px;font-size:13px;line-height:1.7}
.tt-kw span{border-bottom:1px dotted var(--line)}
.tt-el{margin-top:auto;font-size:12px;color:var(--muted)}
.tt-core{font-size:12.5px;color:#4a453d;line-height:1.7;border-left:2px solid var(--line);padding-left:8px}
.tt-no{font-size:12px;color:var(--muted);letter-spacing:.1em;margin-left:6px}
.tt-tip{margin-top:12px;font-size:12px;color:var(--muted)}
.tt-q{font-size:13px;margin-bottom:6px}
.tt-q b{color:var(--muted);font-weight:400;margin-right:8px}
.tt-read{margin-top:14px;border-top:1px solid var(--line);padding-top:10px}
.tt-rt{font-size:12px;letter-spacing:.14em;color:var(--muted);margin-bottom:6px}
.tt-read p{margin:0 0 5px;font-size:13px;line-height:1.85}
.tt-note{margin-top:12px}
.tt-ta{width:100%;border:1px solid var(--line);background:#fffefb;color:var(--ink);padding:8px;font-size:13px;font-family:inherit;line-height:1.7;resize:vertical;outline:none}
.tt-ta:focus{border-color:var(--red)}

/* —— 解析与详解 —— */
.it{--ink:#1b1b1b;--muted:#6f6a60;--line:#c8c1b2;--bg:#fffdf8;--card:#fffefb;--red:#b3261e;
  margin-top:14px;border:1px solid var(--line);background:var(--bg);color:var(--ink);
  font-family:"Songti SC","SimSun","Microsoft YaHei",serif;font-size:13px;line-height:1.75}
.it *{box-sizing:border-box}
/* 标题栏即折叠开关：整栏可点，箭头旋转表示状态 */
.it-head{display:flex;align-items:center;gap:9px;flex-wrap:wrap;width:100%;padding:12px 16px;border:none;border-bottom:1px solid var(--line);background:var(--card);color:inherit;font:inherit;font-family:inherit;text-align:left;cursor:pointer;-webkit-appearance:none;appearance:none}
.it-head:hover{background:#fbf7ef}
.it-arrow{flex:none;font-size:12px;line-height:1;color:var(--red);transition:transform .16s ease}
.it.folded .it-arrow{transform:rotate(-90deg)}
.it.folded .it-wrap{display:none}
.it-hint{margin-left:auto;font-size:12px;color:var(--muted);font-family:system-ui,sans-serif}
.it-title{font-size:15px;font-weight:700;letter-spacing:.08em;color:var(--red)}
.it-tag{font-size:12px;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:1px 9px;font-family:system-ui,sans-serif}
/* 所问之事 + 询问方向的回显，放在引语上方，先让用户确认问的是什么 */
.it-ask{padding:10px 16px;background:#f7f3ea;border-bottom:1px dashed var(--line);font-size:13px;line-height:1.8;color:#3f3a33;font-family:system-ui,sans-serif}
.it-ask .q{font-weight:600;color:#1b1b1b}
.it-ask .sep{color:#b9b2a4;margin:0 7px}
.it-ask .d{color:#1f6f3f}
.it-ask .none{color:var(--muted);font-weight:400}
/* 按询问方向提到最前的那一条 */
.it-focus{margin-left:6px;font-size:12px;color:#1f6f3f;border:1px solid rgba(31,111,63,.35);border-radius:999px;padding:1px 9px;font-family:system-ui,sans-serif}
.it-dim.focus{background:linear-gradient(90deg,rgba(31,111,63,.06),transparent 60%);border-left:2px solid #1f6f3f;padding-left:10px}
.it-lead{padding:11px 16px;font-size:13px;color:#4a453d;border-bottom:1px dashed var(--line)}
.it-body{padding:2px 16px 12px}
.it-dim{padding:12px 0;border-bottom:1px dashed var(--line)}
.it-dim:last-of-type{border-bottom:none}
.it-dh{display:flex;align-items:center;gap:8px;margin-bottom:6px}
.it-dno{flex:none;width:20px;height:20px;border-radius:50%;background:var(--red);color:#fff;font-size:12px;display:flex;align-items:center;justify-content:center;font-family:system-ui,sans-serif}
.it-dlabel{font-size:14.5px;font-weight:700;letter-spacing:.04em}
.it-dtext{font-size:13px;line-height:1.9;text-align:justify}
.it-adv{margin-top:8px;padding:9px 12px;background:#f7f3ea;border-left:2px solid var(--red);font-size:13px;line-height:1.85}
.it-adv b{color:var(--red);font-weight:600;margin-right:7px;font-family:system-ui,sans-serif;font-size:12px;letter-spacing:.1em}
.it-secs{border-top:1px solid var(--line);padding:12px 16px 2px;background:var(--card)}
.it-sec{margin-bottom:11px}
.it-sh{font-size:13px;font-weight:700;color:#1f6f3f;letter-spacing:.06em;margin-bottom:4px}
.it-stext{font-size:13px;line-height:1.9;color:#3f3a33;text-align:justify}
.it-dis{padding:11px 16px;border-top:1px solid var(--line);background:#f7f3ea;font-size:12px;line-height:1.75;color:var(--muted);font-family:system-ui,sans-serif}

/* —— 竖屏（≤640px）：盘面重排为竖向卡片，页面不横向滚动 —— */
@media (max-width:640px){
  .pp-modes{flex-wrap:wrap}
  .pp-modes label{padding:6px 16px}
  .pp-soon{margin-left:0;padding:6px 10px;width:100%;border-top:1px solid var(--line)}
  /* 紫微：竖屏保持 4×4 宫盘（宫位相对位置是三合/对宫的核心，不可丢），宫内改竖向紧凑排版 */
  .pp-grid{grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,minmax(0,auto));gap:0;padding:0}
  .pp-cell{min-height:0;padding:3px 2px 4px;border-radius:0}
  .pp-center{grid-column:2/4;grid-row:2/4;order:0;border-radius:0;padding:5px 3px;gap:2px}
  .pp-center .t1{font-size:12px;margin-bottom:2px;letter-spacing:.02em}
  .pp-center .t2{font-size:9px;line-height:1.4}
  .pp-center .t3{font-size:10.5px;letter-spacing:.16em;margin:2px 0}
  .pp-center .t4{font-size:9px;line-height:1.45}
  .pp-center .pp-legend{font-size:8.5px;gap:4px;margin-top:3px;flex-wrap:wrap;line-height:1.4}
  /* 星曜竖排堆叠：主星在上粗体，辅星小字，四化彩色标 */
  .pp-stars{flex-direction:column;flex-wrap:nowrap;align-items:flex-start;justify-content:flex-start;gap:1px;font-size:11px;line-height:1.4;min-height:0}
  .pp-st.main{font-size:11px}
  .pp-st.good,.pp-st.bad,.pp-st.aux{font-size:9.5px}
  .pp-m{font-size:8.5px;padding:0 1px;vertical-align:0}
  .pp-b{font-size:10px;margin-left:3px;opacity:.9}
  .pp-ages{font-size:8.5px;line-height:1.45;margin-top:2px;word-break:break-all}
  .pp-foot{font-size:8.5px;line-height:1.4;gap:2px}
  .pp-foot .pn{font-size:11px}
  /* 八字：隐藏表头，行标签整行 + 四柱 2×2，每格角标柱名 */
  .pp-bz{border-collapse:separate;border-spacing:0}
  .pp-bz thead{display:none}
  .pp-bz,.pp-bz tbody{display:block}
  .pp-bz tr{display:grid;grid-template-columns:repeat(2,1fr);margin-top:-1px}
  .pp-bz td{margin:0 0 0 -1px}
  .pp-bz td.lbl{grid-column:1/-1;width:auto;margin:0;background:var(--card);color:var(--ink);font-weight:600}
  .pp-bz td[data-c]::before{content:attr(data-c);display:block;font-size:12px;color:var(--muted);letter-spacing:.12em;margin-bottom:2px}
  .pp-bz td.big{font-size:26px}
  /* 六爻：列宽收紧，爻线自适应拉长 */
  .hy-wrap{gap:14px}
  .hy-box{min-width:0;width:100%}
  .hy-row{grid-template-columns:14px 32px minmax(64px,1fr) 46px 42px 32px;gap:6px;font-size:12.5px}
  .hy-row.plain{grid-template-columns:32px minmax(72px,1fr)}
  .hex{width:auto;min-width:64px;height:12px}
  .hex.sm{min-width:56px;height:10px}
  .hex.md{min-width:60px;height:11px}
  /* 梅花 */
  .mh{padding:10px}
  .mh-main{gap:12px}
  .hexbox.mini{min-width:100px}
  /* 大六壬：天地盘改 3 列卡片流，总览置顶 */
  .dl{padding:10px}
  .dl-sc-c{min-width:88px;padding:8px 12px}
  .dl-sk-c{min-width:70px;padding:6px 8px 7px}
  .dl-pan2{grid-template-columns:repeat(3,1fr);grid-template-rows:none}
  .dl-pc{grid-row:auto!important;grid-column:auto!important;min-height:76px}
  .dl-c{grid-row:auto!important;grid-column:1/-1!important;order:-1}
  /* 塔罗 */
  .tt{padding:10px}
  .tt-grid{grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}
  /* 解析与详解：收窄内边距、行距放宽便于竖屏阅读 */
  .it-head,.it-lead,.it-body,.it-secs,.it-dis,.it-ask{padding-left:11px;padding-right:11px}
  .it-head{min-height:46px}
  .it-hint{margin-left:0;flex-basis:100%}
  .it-dlabel{font-size:15px}
  .it-dtext,.it-stext,.it-adv{font-size:13.5px;line-height:1.95}
  .it-adv{padding:9px 10px}
}
/* —— 以下 @container 版本与上方 @media 同规则 ——
   媒体查询按「视口宽度」判断，dsh 桌面侧栏是「容器窄但视口宽」（如侧栏 420px、窗口 1400px），
   @media 不会触发，盘面会用桌面排版挤成一团。.pp 已声明 container-type:inline-size，
   这里改按容器宽度判断，侧栏、独立页、手机三处排版一致。 */
@container (max-width:640px){
  .pp-modes{flex-wrap:wrap}
  .pp-modes label{padding:6px 16px}
  .pp-soon{margin-left:0;padding:6px 10px;width:100%;border-top:1px solid var(--line)}
  /* 紫微：保持 4×4 宫盘（宫位相对位置是三合/对宫的核心，不可丢），宫内竖向紧凑排版 */
  .pp-grid{grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,minmax(0,auto));gap:0;padding:0}
  .pp-cell{min-height:0;padding:3px 2px 4px;border-radius:0}
  .pp-center{grid-column:2/4;grid-row:2/4;order:0;border-radius:0;padding:5px 3px;gap:2px}
  .pp-center .t1{font-size:12px;margin-bottom:2px;letter-spacing:.02em}
  .pp-center .t2{font-size:9px;line-height:1.4}
  .pp-center .t3{font-size:10.5px;letter-spacing:.16em;margin:2px 0}
  .pp-center .t4{font-size:9px;line-height:1.45}
  .pp-center .pp-legend{font-size:8.5px;gap:4px;margin-top:3px;flex-wrap:wrap;line-height:1.4}
  .pp-stars{flex-direction:column;flex-wrap:nowrap;align-items:flex-start;justify-content:flex-start;gap:1px;font-size:11px;line-height:1.4;min-height:0}
  .pp-st.main{font-size:11px}
  .pp-st.good,.pp-st.bad,.pp-st.aux{font-size:9.5px}
  .pp-m{font-size:8.5px;padding:0 1px;vertical-align:0}
  .pp-b{font-size:10px;margin-left:3px;opacity:.9}
  .pp-ages{font-size:8.5px;line-height:1.45;margin-top:2px;word-break:break-all}
  .pp-foot{font-size:8.5px;line-height:1.4;gap:2px}
  .pp-foot .pn{font-size:11px}
  .pp-bz{border-collapse:separate;border-spacing:0}
  .pp-bz thead{display:none}
  .pp-bz,.pp-bz tbody{display:block}
  .pp-bz tr{display:grid;grid-template-columns:repeat(2,1fr);margin-top:-1px}
  .pp-bz td{margin:0 0 0 -1px}
  .pp-bz td.lbl{grid-column:1/-1;width:auto;margin:0;background:var(--card);color:var(--ink);font-weight:600}
  .pp-bz td[data-c]::before{content:attr(data-c);display:block;font-size:12px;color:var(--muted);letter-spacing:.12em;margin-bottom:2px}
  .pp-bz td.big{font-size:26px}
  .hy-wrap{gap:14px}
  .hy-box{min-width:0;width:100%}
  .hy-row{grid-template-columns:14px 32px minmax(64px,1fr) 46px 42px 32px;gap:6px;font-size:12.5px}
  .hy-row.plain{grid-template-columns:32px minmax(72px,1fr)}
  .hex{width:auto;min-width:64px;height:12px}
  .hex.sm{min-width:56px;height:10px}
  .hex.md{min-width:60px;height:11px}
  .mh{padding:10px}
  .mh-main{gap:12px}
  .hexbox.mini{min-width:100px}
  .dl{padding:10px}
  .dl-sc-c{min-width:88px;padding:8px 12px}
  .dl-sk-c{min-width:70px;padding:6px 8px 7px}
  .dl-pan2{grid-template-columns:repeat(3,1fr);grid-template-rows:none}
  .dl-pc{grid-row:auto!important;grid-column:auto!important;min-height:76px}
  .dl-c{grid-row:auto!important;grid-column:1/-1!important;order:-1}
  .tt{padding:10px}
  .tt-grid{grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}
  .it-head,.it-lead,.it-body,.it-secs,.it-dis,.it-ask{padding-left:11px;padding-right:11px}
  .it-head{min-height:46px}
  .it-hint{margin-left:0;flex-basis:100%}
  .it-dlabel{font-size:15px}
  .it-dtext,.it-stext,.it-adv{font-size:13.5px;line-height:1.95}
  .it-adv{padding:9px 10px}
}
@media (max-width:430px){
  /* 窄屏手机：紫微仍保持 4×4 宫盘（相对位置不可丢），进一步收紧宫内字号与间距 */
  .pp-cell{padding:2px 1px 3px}
  .pp-st.main{font-size:10px}
  .pp-st.good,.pp-st.bad,.pp-st.aux{font-size:9px}
  .pp-foot .pn{font-size:10px}
  .pp-center .t1{font-size:11px}
  .pp-center .t2,.pp-center .t4{font-size:8.5px}
  .dl-sc-c{min-width:80px}
}
/* 容器查询版：极窄侧栏 / 小屏手机（与上方 @media 同规则） */
@container (max-width:430px){
  .pp-cell{padding:2px 1px 3px}
  .pp-st.main{font-size:10px}
  .pp-st.good,.pp-st.bad,.pp-st.aux{font-size:9px}
  .pp-foot .pn{font-size:10px}
  .pp-center .t1{font-size:11px}
  .pp-center .t2,.pp-center .t4{font-size:8.5px}
  .dl-sc-c{min-width:80px}
}
`;
  const pp = (window.__PP = window.__PP || {});
  pp.CSS = CSS;

  const TYPE_CLASS = { 主星: 'main', 吉星: 'good', 煞星: 'bad', 辅星: 'aux', 杂曜: 'aux' };
  const MUT = { 禄: 'lu', 权: 'quan', 科: 'ke', 忌: 'ji' };
  // 庙旺得利平不陷 → 三档视觉权重：吉（庙旺）/ 中（得利平）/ 忌（不陷）
  const BR_CLASS = { 庙: 'good', 旺: 'good', 得: 'mid', 利: 'mid', 平: 'mid', 不: 'bad', 陷: 'bad' };
  const POS = {
    巳: [1, 1], 午: [1, 2], 未: [1, 3], 申: [1, 4],
    辰: [2, 1], 酉: [2, 4], 卯: [3, 1], 戌: [3, 4],
    寅: [4, 1], 丑: [4, 2], 子: [4, 3], 亥: [4, 4],
  };

  // 先天八卦：爻自下而上，1 阳 0 阴
  const TRI_BITS = {
    乾: [1, 1, 1], 兑: [1, 1, 0], 离: [1, 0, 1], 震: [1, 0, 0],
    巽: [0, 1, 1], 坎: [0, 1, 0], 艮: [0, 0, 1], 坤: [0, 0, 0],
  };
  const POS_NAME = ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'];

  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  /** 单爻线：阳一整条，阴两段；动爻描红 */
  const hexBar = (yang, moving, size) => `<span class="hex${yang ? '' : ' yin'}${moving ? ' on' : ''}${size ? ' ' + size : ''}">${yang ? '<i></i>' : '<i></i><i></i>'}</span>`;

  function starsHTML(stars) {
    if (!stars || !stars.length) return '';
    return stars.map((s) => {
      const cls = TYPE_CLASS[s.type] || 'aux';
      const m = s.mutagen ? `<i class="pp-m ${MUT[s.mutagen]}">${s.mutagen}</i>` : '';
      const b = s.brightness ? `<em class="pp-b ${BR_CLASS[s.brightness] || 'mid'}">${s.brightness}</em>` : '';
      // 顺序：星名 → 亮度灰字 → 四化色块。灰字紧贴星名变成一体，彩色实心框独立在末尾，
      // 避免两者字号差导致视觉叠压（试过 星名→四化→亮度，10px 字形会压住 8.5px 的框）
      return `<span class="pp-st ${cls}">${s.name}${b}${m}</span>`;
    }).join('');
  }

  function agesHTML(age) {
    const list = [];
    for (let i = 0; i < 6; i++) list.push(age + i * 12);
    return list.join(',');
  }

  const NAMES = ['命宫', '兄弟', '夫妻', '子女', '财帛', '疾厄', '迁移', '交友', '官禄', '田宅', '福德', '父母'];
  const BR = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  const fx = (n) => ((n % 12) + 12) % 12;
  const isTrine = (b, m) => b !== m && [fx(m + 4), fx(m + 8), fx(m + 6)].includes(b);

  function cellHTML(p, soulIdx) {
    const pos = POS[p.branch] || [1, 1];
    const b = BR.indexOf(p.branch);
    const cls = ['pp-cell'];
    if (b === soulIdx) cls.push('pp-soul');
    else if (isTrine(b, soulIdx)) cls.push('pp-tri');
    if (p.isBody) cls.push('pp-body');
    if (pos[0] === 4) cls.push('pp-lastrow');
    const ss = p.shensha || {};
    const pname = NAMES[fx(soulIdx - b)];
    const zh = (p.selfHua && p.selfHua.length)
      ? `<span class="pp-zh">${p.selfHua.map((x) => `<i class="pp-m ${MUT[x.type]}">${x.type}</i>`).join('')}</span>` : '';
    return `<div class="${cls.join(' ')}" style="grid-row:${pos[0]};grid-column:${pos[1]}">
      <div class="pp-stars">${starsHTML(p.stars)}${zh}</div>
      <div class="pp-ages">${agesHTML(p.xiaoxian.age)}</div>
      <div class="pp-foot">
        <div class="l">
          <span class="dx">${ss.boshi} ${p.daxian.start}-${p.daxian.end}</span>
          <span>${ss.jiangqian}</span>
          <span>${ss.suiqi}</span>
        </div>
        <div class="r">
          <span>${ss.changsheng}</span>
          <span>${p.ganzhi}</span>
          <span class="pn">${pname}</span>
        </div>
      </div>
    </div>`;
  }

  function sizhuOf(r) {
    try {
      const E = window.Engine || (window.__PP && window.__PP.Engine);
      if (!E || !E.buildBazi || !r.input) return '';
      const b = E.buildBazi({
        year: r.input.year, month: r.input.month, day: r.input.day,
        hour: r.input.hour, minute: r.input.minute,
        gender: r.input.gender, trueSolar: false,
      });
      return ['year', 'month', 'day', 'hour'].map((k) => b.pillars[k].ganzhi).join(' ');
    } catch (e) { return ''; }
  }

  pp.ziweiHTML = function (r) {
    const soulIdx = BR.indexOf(r.soul.branch);
    const ln = (r.liunian && r.liunian[0]) || null;
    const age = ln ? ln.age : 1;
    const dxPalace = r.palaces.find((p) => age >= p.daxian.start && age <= p.daxian.end) || r.palaces[0];
    const dxIdx = BR.indexOf(dxPalace.branch);
    const lnIdx = ln ? BR.indexOf(ln.lifePalace.branch) : soulIdx;

    const grid = (m) => r.palaces.map((p) => cellHTML(p, m)).join('');
    const center = (m, kind) => {
      const mode = kind === 'da'
        ? `<div class="t1">大限 ${dxPalace.ganzhi}　${dxPalace.daxian.start}-${dxPalace.daxian.end}岁</div>`
        : kind === 'ln' && ln
          ? `<div class="t1">流年 ${ln.ganzhi}　${ln.age}岁</div>`
          : `<div class="t1">${r.daxian.rule.slice(0, 2)}　${r.bureau.name}</div>`;
      return `<div class="pp-center">
        ${mode}
        <div class="t2">公历 ${r.input.year}-${String(r.input.month).padStart(2, '0')}-${String(r.input.day).padStart(2, '0')} ${String(r.input.hour).padStart(2, '0')}:${String(r.input.minute).padStart(2, '0')}</div>
        <div class="t2">农历 ${r.lunar.year}年${r.lunar.isLeap ? '闰' : ''}${r.lunar.month}月${r.lunar.day}日${r.hourBranch}时</div>
        ${sizhuOf(r) ? `<div class="t3">${sizhuOf(r)}</div>` : ''}
        <div class="t4">命主 ${r.lifeMaster}　身主 ${r.bodyMaster}</div>
        <div class="t4">命宫 ${r.soul.branch}　身宫 ${r.body.branch}　五行局 ${r.bureau.name}</div>
        <div class="t4">子年斗君 ${r.doujun ? r.doujun.zinian : '—'}　流年斗君 ${ln && ln.doujun ? ln.doujun : '—'}</div>
        <div class="t4">紫微 ${r.ziwei}　天府 ${r.tianfu}　${kind === 'da' ? '大限命宫 ' + BR[dxIdx] : kind === 'ln' ? '流年命宫 ' + BR[lnIdx] : '本命命宫 ' + r.soul.branch}</div>
        <div class="pp-legend"><span class="pp-m lu">禄</span><span class="pp-m quan">权</span><span class="pp-m ke">科</span><span class="pp-m ji">忌</span><span>红框=命宫　浅底=三方四正</span></div>
      </div>`;
    };

    const body = (id, m, kind) => `<div class="pp-body ${id}"><div class="pp-grid">${grid(m)}${center(m, kind)}</div></div>`;

    const cq = r.changqu;
    const chips = cq ? `<div class="pp-chips">
      <span class="pp-chip">昌 ${cq.wenchang.branch}（${cq.wenchang.palace}）</span>
      <span class="pp-chip">曲 ${cq.wenqu.branch}（${cq.wenqu.palace}）</span>
      <span class="pp-chip">${cq.relation}</span>
      <span class="pp-chip">入命三方 ${cq.inSoulSanfang ? '是' : '否'}</span>
      <span class="pp-chip ${cq.absorb.label === '杂' ? 'warn' : 'ok'}">吸收·${cq.absorb.label}</span>
    </div>` : '';
    const pats = (r.patterns || []).length
      ? `<div class="pp-chips">${r.patterns.map((p) => `<span class="pp-chip ${p.tone === 'good' ? 'ok' : p.tone === 'bad' ? 'warn' : ''}" title="${esc(p.evidence || '')}">${p.name}</span>`).join('')}</div>` : '';
    const dxs = (r.daxianList || []).length
      ? `<div class="pp-chips">${r.daxianList.slice(0, 8).map((d) => `<span class="pp-chip" title="${esc(`${d.ganzhi} 宫干四化：` + d.mutagenHits.map((m) => `${m.star}化${m.type}→${m.palace || '未上盘'}`).join('、'))}">${d.branch} ${d.ages[0]}-${d.ages[1]}</span>`).join('')}</div>` : '';
    const lnHit = ln && ln.mutagenHits && ln.mutagenHits.length
      ? `<div class="pp-chips">${ln.mutagenHits.map((m) => `<span class="pp-chip ${m.type === '忌' ? 'warn' : m.type === '禄' ? 'ok' : ''}">${m.star}化${m.type}→${m.palace || '未上盘'}</span>`).join('')}</div>` : '';

    return `<div class="pp">
      <input type="radio" name="ppm" id="ppm-ben" class="pp-r" checked>
      <input type="radio" name="ppm" id="ppm-da" class="pp-r">
      <input type="radio" name="ppm" id="ppm-ln" class="pp-r">
      <div class="pp-modes">
        <label for="ppm-ben">本命</label><label for="ppm-da">大限</label><label for="ppm-ln">流年</label>
        <span class="pp-soon">流月 · 流日 · 流时（未实现）</span>
      </div>
      ${body('ben', soulIdx, 'ben')}
      ${body('da', dxIdx, 'da')}
      ${body('ln', lnIdx, 'ln')}
    </div>${chips}${pats}${dxs}${lnHit}`;
  };

  /** 六爻 / 梅花的卦体：上爻在最上 */
  function hexRows(lines, opt) {
    const o = opt || {};
    const sorted = lines.slice().sort((a, b) => b.position - a.position);
    if (o.plain) {
      return sorted.map((l) => `<div class="hy-row plain">
        <span class="hy-nm">${l.name || POS_NAME[l.position - 1]}</span>
        ${hexBar(l.yinYang === '阳', l.moving)}
      </div>`).join('');
    }
    return sorted.map((l) => {
      const yang = l.yinYang === '阳';
      const sh = o.shiYing
        ? (l.position === o.shi ? '<span class="hy-sy">世</span>' : l.position === o.ying ? '<span class="hy-sy">应</span>' : '<span></span>')
        : '<span></span>';
      return `<div class="hy-row">
        ${sh}
        <span class="hy-nm">${l.name || POS_NAME[l.position - 1]}</span>
        ${hexBar(yang, l.moving)}
        <span class="hy-gz">${esc(l.ganzhi || '')}</span>
        <span class="hy-lq">${esc(l.liuqin || '')}</span>
        <span class="hy-ls">${esc(l.liushen || '')}</span>
      </div>`;
    }).join('');
  }

  pp.liuyaoHTML = function (r) {
    const box = (title, sub, hex, lines) => `<div class="hy-box">
      <div class="hy-h"><b>${title}</b><span>${sub}</span></div>
      <div class="hy">${hexRows(lines, { shiYing: true, shi: hex.shi, ying: hex.ying })}</div>
    </div>`;
    const ben = box(`本卦 ${r.ben.name}`, `${r.ben.palace} · ${r.ben.palaceElement}`, r.ben, r.ben.lines);
    const bian = r.bian
      ? box(`变卦 ${r.bian.name}`, `${r.bian.palace} · ${r.bian.palaceElement}`, r.bian, r.bian.lines)
      : `<div class="hy-box"><div class="hy-h"><b>六爻安静</b><span>无动爻，不取变卦</span></div>
          <div class="pp-dim" style="font-size:12px;line-height:1.9">断卦以本卦卦辞与世应生克为主。</div></div>`;
    return `<div class="pp" style="padding:14px">
      <div class="mh-head">起卦 ${r.cast.notation.join('、')}（自下而上）　日辰 ${r.dayGanZhi.name}</div>
      <div class="hy-wrap">${ben}${bian}</div>
    </div>`;
  };

  pp.meihuaHTML = function (r) {
    // 三爻成卦：由上下卦名反推爻线
    const mini = (title, name, upper, lower, note) => {
      const bits = [...(TRI_BITS[lower] || [0, 0, 0]), ...(TRI_BITS[upper] || [0, 0, 0])];
      const rows = bits.slice().reverse().map((b) => hexBar(!!b, false, 'sm')).join('');
      return `<div class="hexbox mini">
        <div class="h">${title}</div>
        <div class="n">${name}</div>
        <div class="mh-mini">${rows}</div>
        <div class="s">${note || `上${upper} 下${lower}`}</div>
      </div>`;
    };
    // 本卦：分上下卦，标体用
    const benBits = r.lines.slice().sort((a, b) => b.position - a.position);
    const upperLines = benBits.slice(0, 3);
    const lowerLines = benBits.slice(3);
    const movingInUpper = r.moving >= 4;
    const trib = (label, tri, lines, isBody) => `<div class="trib">
      <div class="trib-h">${label} ${tri}${TRI_EL(tri)}<span class="tri-tag ${isBody ? 'ti' : 'yong'}">${isBody ? '体' : '用'}</span></div>
      <div class="hy" style="gap:5px">${hexRows(lines, { plain: true })}</div>
    </div>`;
    const mainBox = `<div class="hexbox">
      <div class="h"><span>本卦</span><span>动 ${r.movingName}</span></div>
      <div class="n">${r.ben.name}</div>
      ${trib('上卦', r.ben.upper, upperLines, !movingInUpper)}
      ${trib('下卦', r.ben.lower, lowerLines, movingInUpper)}
      <div class="s">${r.source}</div>
    </div>`;

    const lv = r.bodyUse.level;
    const lvCls = lv.includes('凶') ? 'bad' : lv.includes('吉') ? 'good' : 'flat';
    const useLine = `<div class="mh-rel">
      <div><b>体</b>${r.bodyUse.body.trigram}（${r.bodyUse.body.element}）　<b>用</b>${r.bodyUse.use.trigram}（${r.bodyUse.use.element}）</div>
      <div><span class="lv ${lvCls}">${lv}</span>　${r.bodyUse.relation}</div>
    </div>`;

    const cuoTri = TRI_OF(r.cuo.name) || ['', ''];
    const zongTri = TRI_OF(r.zong.name) || ['', ''];
    return `<div class="pp mh">
      <div class="mh-main">
        ${mainBox}
        ${mini('互卦', r.hu.name, r.hu.upper, r.hu.lower, '中藏之象')}
        ${mini('变卦', r.bian.name, r.bian.upper, r.bian.lower, `动 ${r.movingName} 后`)}
        ${mini('错卦', r.cuo.name, cuoTri[1], cuoTri[0], '六爻全变')}
        ${mini('综卦', r.zong.name, zongTri[1], zongTri[0], '上下颠倒')}
      </div>
      ${useLine}
    </div>`;
  };

  // 由卦名查上下卦（六十四卦全表，用于错卦/综卦）
  const HEX_TABLE = {
    乾为天: ['乾', '乾'], 天风姤: ['乾', '巽'], 天山遁: ['乾', '艮'], 天地否: ['乾', '坤'],
    风地观: ['巽', '坤'], 山地剥: ['艮', '坤'], 火地晋: ['离', '坤'], 火天大有: ['离', '乾'],
    坎为水: ['坎', '坎'], 水泽节: ['坎', '兑'], 水雷屯: ['坎', '震'], 水火既济: ['坎', '离'],
    泽火革: ['兑', '离'], 雷火丰: ['震', '离'], 地火明夷: ['坤', '离'], 地水师: ['坤', '坎'],
    艮为山: ['艮', '艮'], 山火贲: ['艮', '离'], 山天大畜: ['艮', '乾'], 山泽损: ['艮', '兑'],
    火泽睽: ['离', '兑'], 天泽履: ['乾', '兑'], 风泽中孚: ['巽', '兑'], 风山渐: ['巽', '艮'],
    震为雷: ['震', '震'], 雷地豫: ['震', '坤'], 雷水解: ['震', '坎'], 雷风恒: ['震', '巽'],
    地风升: ['坤', '巽'], 水风井: ['坎', '巽'], 泽风大过: ['兑', '巽'], 泽雷随: ['兑', '震'],
    巽为风: ['巽', '巽'], 风天小畜: ['巽', '乾'], 风火家人: ['巽', '离'], 风雷益: ['巽', '震'],
    天雷无妄: ['乾', '震'], 火雷噬嗑: ['离', '震'], 山雷颐: ['艮', '震'], 山风蛊: ['艮', '巽'],
    离为火: ['离', '离'], 火山旅: ['离', '艮'], 火风鼎: ['离', '巽'], 火水未济: ['离', '坎'],
    山水蒙: ['艮', '坎'], 风水涣: ['巽', '坎'], 天水讼: ['乾', '坎'], 天火同人: ['乾', '离'],
    坤为地: ['坤', '坤'], 地雷复: ['坤', '震'], 地泽临: ['坤', '兑'], 地天泰: ['坤', '乾'],
    雷天大壮: ['震', '乾'], 泽天夬: ['兑', '乾'], 水天需: ['坎', '乾'], 水地比: ['坎', '坤'],
    兑为泽: ['兑', '兑'], 泽水困: ['兑', '坎'], 泽地萃: ['兑', '坤'], 泽山咸: ['兑', '艮'],
    水山蹇: ['坎', '艮'], 地山谦: ['坤', '艮'], 雷山小过: ['震', '艮'], 雷泽归妹: ['震', '兑'],
  };
  const TRI_ELEM = { 乾: '金', 兑: '金', 离: '火', 震: '木', 巽: '木', 坎: '水', 艮: '土', 坤: '土' };
  const TRI_EL = (t) => (TRI_ELEM[t] ? ` ${TRI_ELEM[t]}` : '');
  const TRI_OF = (name) => HEX_TABLE[name] || null; // [下卦, 上卦]

  pp.daliurenHTML = function (r) {
    const sc = r.sanChuan;
    const cbox = (c, k) => `<div class="dl-sc-c">
      <div class="dl-sc-k">${k}</div>
      <div class="dl-sc-z">${c.zhi}</div>
      <div class="dl-sc-j">${c.jiangFull || c.jiang}</div>
      <div class="dl-sc-l">${c.liuQin}${c.xunKong ? ' · 空' : ''}</div>
    </div>`;
    const ge = `<div class="dl-sc-c ge">
      <div class="dl-sc-k">格局</div>
      <div class="dl-sc-gn">${r.geJu.name}</div>
      <div class="dl-sc-l">${r.geJu.detail}</div>
    </div>`;
    const keCells = r.siKe.slice().map((x) => `<div class="dl-sk-c">
      <div class="dl-sk-k">${['一课', '二课', '三课', '四课'][x.position - 1] || x.position + '课'}</div>
      <div class="dl-sk-s">${x.shang}</div>
      <div class="dl-sk-x">${x.xia}</div>
      <div class="dl-sk-r">${x.relation} · ${x.jiangFull || x.jiang}</div>
    </div>`).join('');
    const cells = r.pan.map((p) => {
      const pos = POS[p.di] || [1, 1];
      return `<div class="dl-pc" style="grid-row:${pos[0]};grid-column:${pos[1]}">
        <div class="tz">${p.tian}</div>
        <div class="dz">地盘 ${p.di}</div>
        <div class="jz">${p.jiangFull}</div>
      </div>`;
    }).join('');
    const center = `<div class="dl-c">
      <div class="t1">${r.dayGanZhi}日　${r.hourZhi}时</div>
      <div class="t2">${r.dayNight}贵 · 月将 ${r.yueJiang.name}${r.yueJiang.zhi} · 贵人${r.guiren.reverse ? '逆' : '顺'}行</div>
      <div class="t3">${sc.chu.zhi} → ${sc.zhong.zhi} → ${sc.mo.zhi}</div>
      <div class="t2">节气 ${r.jieqi.name}${r.jieqi.time ? ' ' + r.jieqi.time : ''}</div>
    </div>`;
    return `<div class="pp dl">
      <div class="dl-head">日 ${r.dayGanZhi}　时 ${r.hourZhi}（${r.dayNight}贵）　月将 ${r.yueJiang.name}${r.yueJiang.zhi}　节气 ${r.jieqi.name}　贵人${r.guiren.reverse ? '逆' : '顺'}行</div>
      <div class="dl-sc">${cbox(sc.chu, '初传')}${cbox(sc.zhong, '中传')}${cbox(sc.mo, '末传')}${ge}</div>
      <div class="dl-sk">${keCells}</div>
      <div class="dl-pan2">${cells}${center}</div>
      <div class="dl-legend"><span>大字＝天盘支</span><span>小字＝地盘（固定十二支）</span><span>右下＝天将</span></div>
    </div>`;
  };

  pp.tarotHTML = function (r) {
    const cards = r.cards.map((c) => `
      <div class="tt-card ${c.upright ? 'up' : 'rev'}">
        <div class="tt-pos" title="${esc(c.positionHint || '')}">${c.position}</div>
        <div class="tt-name">${c.name}${c.number ? `<span class="tt-no">${c.number}</span>` : ''}</div>
        <div class="tt-ori">${c.orientation}</div>
        ${c.core ? `<div class="tt-core">${c.core}</div>` : ''}
        <div class="tt-kw">${c.keywords.map((k) => `<span>${k}</span>`).join('')}</div>
        <div class="tt-el">${c.arcana} · ${c.element}${c.suit ? ' · ' + c.suit + (c.rankCn ? c.rankCn : '') : ''}${c.domain ? ' · ' + c.domain : ''}</div>
      </div>`).join('');
    const reading = (r.reading || []).map((p) => `<p>${p}</p>`).join('');
    return `<div class="pp tt">
      <div class="tt-q"><b>所问</b>${r.question ? r.question : '<span class="pp-dim">（未填写，可在上方输入后重抽）</span>'}</div>
      <div class="tt-head">${r.spread}${r.castAt ? `　·　抽牌于 ${r.castAt}` : ''}</div>
      <div class="tt-grid">${cards}</div>
      <div class="tt-read"><div class="tt-rt">牌面解读</div>${reading}</div>
      <div class="tt-note"><div class="tt-rt">你的记录</div>
        <textarea class="tt-ta" rows="4" placeholder="写下判断或对照后的想法……（仅本页可见，不保存）"></textarea>
      </div>
      ${r.systemNote ? `<div class="tt-tip">${r.systemNote}</div>` : ''}
      <div class="tt-tip">塔罗用于自我觉察与娱乐，不作确定性预言。</div>
    </div>`;
  };

  pp.baziHTML = function (r) {
    const cols = [['year', '年柱'], ['month', '月柱'], ['day', '日柱'], ['hour', '时柱']];
    const SHORT = { year: '年', month: '月', day: '日', hour: '时' };
    const ELC = { 木: 'wood', 火: 'fire', 土: 'earth', 金: 'metal', 水: 'water' };
    const el = (e) => `<span class="wx-${ELC[e] || 'earth'}">${e}</span>`;
    // 神煞：悬停显示「类别·查法来源查目标｜查法口诀」
    const ssTag = (x) => `<span class="s ${x.luck || 'neutral'}" title="${esc(`${x.cat} · ${x.via}查${x.target} ｜ ${x.rule}`)}">${x.name}</span>`;
    // data-c：竖屏 2×2 重排时每格左上角标注柱名（桌面端不显示）
    const line = (label, fn) => `<tr><td class="lbl">${label}</td>${cols.map(([k]) => `<td data-c="${SHORT[k]}">${fn(r.pillars[k], k)}</td>`).join('')}</tr>`;
    const head = `<thead><tr><th></th>${cols.map(([, n]) => `<th>${n}</th>`).join('')}</tr></thead>`;
    const rows = [
      line('十神', (p, k) => `<span class="${k === 'day' ? 'zhuri' : 'pp-dim'}">${k === 'day' ? (r.input.gender === 'male' ? '元男' : '元女') : (p.stemTenGod || '—')}</span>`),
      line('天干', (p) => `<span class="big ${'wx-' + ELC[p.stemElement]}">${p.stem}</span>`),
      line('地支', (p) => `<span class="big ${'wx-' + ELC[p.branchElement]}">${p.branch}</span>`),
      line('藏干', (p) => p.hidden.map((x) => `<span class="wx-${ELC[x.element]}">${x.stem}${x.element}</span>`).join(' ')),
      line('支神', (p) => p.hidden.map((x) => `<span class="pp-dim">${x.tenGod}</span>`).join('<br>')),
      line('纳音', (p) => p.nayin),
      line('空亡', (p) => `<span class="pp-dim">${p.kongwang.join('')}</span>`),
      line('地势', (p) => p.dishi),
      line('自坐', (p) => p.zizuo),
      line('神煞', (p) => (p.shenshaDetail && p.shenshaDetail.length
        ? `<span class="pp-ss">${p.shenshaDetail.map(ssTag).join('')}</span>`
        : '<span class="pp-dim">—</span>')),
    ].join('');
    const wx = Object.entries(r.wuxing).map(([k, v]) => `<span class="pp-chip wx-${ELC[k]}">${k} ${v}</span>`).join('');

    // 格局 / 用神 / 十神
    const fr = r.frame || {};
    const tierCls = (t) => (t === '大吉' || t === '吉' ? 'ok' : t === '大忌' || t === '忌' ? 'warn' : '');
    const sect = (title, body) => (body ? `<div class="pp-sec"><div class="pp-sec-h">${title}</div>${body}</div>` : '');
    const gj = fr.geju && fr.geju.length ? `
      <div class="pp-tl">${fr.primary ? `主格 <b>${esc(fr.primary.name)}</b>　${esc(fr.primary.evidence)}` : ''}</div>
      <div class="pp-chips">${fr.geju.map((g) => `<span class="pp-chip" title="${esc(g.evidence)}">${esc(g.name)}<i class="pp-drel">${esc(g.kind)}</i></span>`).join('')}</div>` : '';
    const ys = fr.yongshen ? `
      <div class="pp-tl">喜 ${fr.yongshen.favor.map(el).join('')}　忌 ${fr.yongshen.avoid.map(el).join('')}　<span class="pp-dim">${esc(fr.yongshen.method)}</span></div>
      <div class="pp-chips">${fr.yongshen.favorTenGods.map((t) => `<span class="pp-chip ok">${esc(t)}</span>`).join('')}${fr.yongshen.avoidTenGods ? fr.yongshen.avoidTenGods.map((t) => `<span class="pp-chip warn">${esc(t)}</span>`).join('') : ''}</div>
      <div class="pp-tl pp-dim">${esc(fr.yongshen.detail)}</div>` : '';
    const gods = fr.godStats ? `<div class="pp-chips">${Object.entries(fr.godStats.groups).map(([k, v]) => `<span class="pp-chip">${k} ${v}</span>`).join('')}</div>` : '';

    // 行运
    const dy = r.dayun.list.map((d) => {
      const lk = d.luck || null;
      return `<span class="pp-chip ${lk ? tierCls(lk.tier) : ''}" title="${esc(lk ? `${lk.tier} ${lk.score}｜${(lk.reasons || []).join('；')}` : '')}">${d.startAge} ${d.ganzhi}${(d.relations && d.relations.length) ? ` <i class="pp-drel">${d.relations.join('')}</i>` : ''}${lk ? ` ${lk.tier}` : ''}</span>`;
    }).join('');
    const ln = (r.liunian && r.liunian.length) ? `<div class="pp-chips">${r.liunian.slice(0, 8).map((l) => {
      const lk = l.luck || null;
      return `<span class="pp-chip ${lk ? tierCls(lk.tier) : ''}" title="${esc(lk ? `${lk.tier} ${lk.score}｜${(lk.reasons || []).join('；')}` : '')}">${l.year} ${l.ganzhi}${lk ? ` ${lk.tier}` : ''}</span>`;
    }).join('')}</div>` : '';
    const str = r.strength ? `<div class="pp-str">日主强弱：<b>${r.strength.level}</b>${r.strength.score}　<span class="pp-dim">${r.strength.detail}</span></div>` : '';
    const ssGroups = (r.shensha && r.shensha.groups) || [];
    const ssx = ssGroups.length ? `
      <div class="pp-ssx">
        <div class="h"><b>神煞全览</b><span>共 ${r.shensha.count} 见 · ${ssGroups.length} 类 · 悬停看查法</span></div>
        ${ssGroups.map((g) => `<div class="pp-ssg"><span class="gt">${g.cat}</span><span class="gi">${g.items.map((i) => `<span class="pp-ssi ${i.luck || 'neutral'}" title="${esc(`${i.via}查${i.target} ｜ ${i.rule}`)}">${i.name}<em>${i.pillars.map((k) => SHORT[k] || '').join('')}</em></span>`).join('')}</span></div>`).join('')}
        <div class="h" style="border-top:none;padding-top:4px;margin-top:4px">神煞只作参考，吉凶仍须看格局、旺衰与行运。</div>
      </div>` : '';
    return `<div class="pp" style="padding:12px">
      <table class="pp-bz">${head}<tbody>${rows}</tbody></table>
      <div class="pp-rel"><div><b>天干</b>${(r.relations && r.relations.stems.length) ? r.relations.stems.join(' · ') : '—'}</div>
      <div><b>地支</b>${(r.relations && r.relations.branches.length) ? r.relations.branches.join(' · ') : '—'}</div></div>
      ${str}
      ${sect('格局', gj)}
      ${sect('用神', ys)}
      ${sect('五行与十神', `<div class="pp-chips">${wx}</div>${gods}`)}
      ${sect('大运', `<div class="pp-chips">${dy}</div>`)}
      ${ln ? sect('流年', ln) : ''}
      ${ssx}
      <div style="margin-top:8px;font-size:12px;color:#6f6a60">上一节 ${r.jieqi.previous.name} ${r.jieqi.previous.time}　下一节 ${r.jieqi.next.name} ${r.jieqi.next.time}　${r.dayun.rule}，${r.dayun.startAge.years}岁起运</div>
    </div>`;
  };

  // ── 解析与详解：把 interpret() 的结构化结果渲染成卡片 ──
  const MT_LABEL = { natal: '命盘解析', divination: '卦象解析', card: '牌阵解析' };

  /**
   * @param {object} it interpret() 的结果
   * @param {object} [opt] { folded 是否收起 } —— 桌面默认展开、竖屏默认收起由调用方按视口决定
   */
  pp.interpretHTML = function (it, opt) {
    if (!it || !it.dimensions || !it.dimensions.length) return '';
    const folded = !!(opt && opt.folded);
    const dims = it.dimensions.map((d, i) => `<div class="it-dim${d.focused ? ' focus' : ''}">
      <div class="it-dh"><span class="it-dno">${i + 1}</span><span class="it-dlabel">${esc(d.label)}</span>${d.focused ? '<span class="it-focus">最贴近你的问题</span>' : ''}</div>
      <div class="it-dtext">${esc(d.text)}</div>
      ${d.advice ? `<div class="it-adv"><b>建议</b>${esc(d.advice)}</div>` : ''}
    </div>`).join('');
    const secs = (it.sections && it.sections.length)
      ? `<div class="it-secs">${it.sections.map((s) => `<div class="it-sec">
        <div class="it-sh">${esc(s.label)}</div>
        <div class="it-stext">${esc(s.text)}</div>
      </div>`).join('')}</div>`
      : '';
    const tags = [it.systemLabel, MT_LABEL[it.moduleType] || it.moduleType].filter(Boolean);
    // 回显所问之事与询问方向：先让用户确认解读是围绕什么展开的
    const ask = it.ask;
    // 只有真的填了问题、或选了非「综合」方向时才回显；命盘类不问事，不显示这一行
    const askLine = (ask && (ask.question || (ask.direction && ask.direction !== 'general')))
      ? `<div class="it-ask"><span class="q">问题：${ask.question ? esc(ask.question) : '<span class="none">（未填写）</span>'}</span><span class="sep">｜</span><span class="d">询问方向：${esc(ask.directionLabel || '综合')}</span></div>`
      : '';
    return `<div class="it${folded ? ' folded' : ''}">
      <button type="button" class="it-head" aria-expanded="${folded ? 'false' : 'true'}">
        <span class="it-arrow" aria-hidden="true">▾</span>
        <span class="it-title">解析与详解</span>${tags.map((t) => `<span class="it-tag">${esc(t)}</span>`).join('')}
        <span class="it-hint">${folded ? '点击展开' : '点击收起'}</span>
      </button>
      <div class="it-wrap">
        ${askLine}
        ${it.lead ? `<div class="it-lead">${esc(it.lead)}</div>` : ''}
        <div class="it-body">${dims}</div>
        ${secs}
        <div class="it-dis">${esc(it.disclaimer)}</div>
      </div>
    </div>`;
  };

  /** 结果 + 解析一并渲染；opt 透传给 interpretHTML（折叠初始状态） */
  pp.resultWithInterpret = function (html, it, opt) {
    return (html || '') + pp.interpretHTML(it, opt);
  };
})();

// Client 半：命理排盘面板。由 build-client.mjs 注入 React / h / Engine / __PP。
const PP = window.__PP;
const CSS = `
.mp-wrap{height:100%;overflow:auto;padding:20px 24px 40px;color:var(--dsw-alias-label-primary);font-size:14px}
.mp-head{display:flex;gap:14px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px}
.mp-tabs{display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap}
.mp-tab{padding:7px 17px;border-radius:999px;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;font-size:14px;transition:background .12s,color .12s}
.mp-tab:hover{background:var(--dsw-alias-bg-layer-2)}
.mp-tab.on{background:var(--dsw-alias-brand-primary);border-color:transparent;color:#fff}
.mp-field{display:flex;flex-direction:column;gap:5px;font-size:13px;color:var(--dsw-alias-label-secondary)}
.mp-input{background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-primary);border-radius:8px;padding:7px 11px;font-size:14px;outline:none;min-width:132px}
.mp-input:focus{border-color:var(--dsw-alias-brand-primary)}
/* 所问之事：多行文本，视觉与其他输入框一致 */
.mp-textarea{background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-primary);border-radius:8px;padding:7px 11px;font-size:14px;outline:none;width:100%;min-width:180px;resize:vertical;line-height:1.5;font-family:inherit}
.mp-textarea:focus{border-color:var(--dsw-alias-brand-primary)}
.mp-textarea.invalid{border-color:var(--dsw-alias-state-error-primary)}
.mp-ask{flex:1 1 240px;min-width:0}
.mp-dir{min-width:104px}
.mp-btn{padding:8px 20px;border-radius:8px;border:none;background:var(--dsw-alias-brand-primary);color:#fff;cursor:pointer;font-size:14px}
.mp-btn.ghost{background:transparent;border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-secondary)}
.mp-seg{display:inline-flex;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;overflow:hidden}
.mp-seg button{padding:6px 13px;background:transparent;border:none;color:var(--dsw-alias-label-secondary);font-size:13px;cursor:pointer}
.mp-seg button.on{background:var(--dsw-alias-brand-primary);color:#fff}
.mp-hint{font-size:12.5px;color:var(--dsw-alias-label-secondary);line-height:1.7;margin:0 0 14px;padding-left:2px}
.mp-card{margin-top:18px;padding:16px 18px;border-radius:14px;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1)}
.mp-flat{margin-top:16px;padding:0;border:none;background:transparent;border-radius:0}
.mp-dim{color:var(--dsw-alias-label-secondary)}
.mp-err{margin-top:16px;padding:10px 14px;border-radius:10px;background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 14%,transparent);color:var(--dsw-alias-state-error-primary)}
.mp-bar{display:flex;gap:8px;align-items:center;margin-top:14px}
/* 起卦类 tab 的「已自动取当前时刻」提示（.mp-hint 的补充行，不额外占横向空间） */
.mp-auto{margin:-8px 0 14px;padding-left:2px;font-size:12.5px;line-height:1.7;color:var(--dsw-alias-label-secondary)}
/* 结果头部的「起卦时刻」一行 */
.mp-cast{margin:0 0 14px;padding-left:2px;font-size:12.5px;line-height:1.7;color:var(--dsw-alias-label-secondary)}
.mp-cast b{color:var(--dsw-alias-label-primary);font-weight:600}
`;

const { useState, useEffect } = React;

function PanelIcon(props) {
  const size = props && props.size ? props.size : 20;
  const active = props && props.active;
  return h('svg', {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round',
    'aria-hidden': true, style: { opacity: active ? 1 : 0.72 },
  },
  h('circle', { cx: 12, cy: 12, r: 8.2 }),
  h('path', { d: 'M12 3.8a4.1 4.1 0 0 1 0 8.2 4.1 4.1 0 0 0 0 8.2' }),
  h('circle', { cx: 12, cy: 8, r: 1.1, fill: 'currentColor', stroke: 'none' }),
  h('circle', { cx: 12, cy: 16, r: 1.1, fill: 'currentColor', stroke: 'none' }));
}

// 每个体系对「时间」的语义不同：八字/紫微要出生时间，其余三类只要起卦时刻
const TABS = [
  { k: 'ziwei', label: '紫微', timeLabel: '出生时刻', hint: '紫微斗数需要出生日期、时刻与性别；出生地只影响真太阳时修正。' },
  { k: 'bazi', label: '八字', timeLabel: '出生时刻', hint: '四柱八字按节气与真太阳时定时柱，出生地越准，时柱越稳。' },
  { k: 'liuyao', label: '六爻', timeLabel: '起卦时刻', hint: '六爻不需要出生时间：只用起卦当下的日辰定六神、月建定旺衰，卦由摇出。' },
  { k: 'meihua', label: '梅花', timeLabel: '起卦时刻', hint: '梅花用起卦时刻的年月日时数成卦，也可直接给两个数字起卦；与出生时间无关。' },
  { k: 'daliuren', label: '六壬', timeLabel: '起卦时刻', hint: '大六壬用起卦时刻的日干支、时支与月将起天地盘；同样与出生时间无关。' },
  { k: 'tarot', label: '塔罗', timeLabel: '', hint: '塔罗不看时间，只记录抽牌时刻与你的提问。' },
];

function pad(n) { return String(n).padStart(2, '0'); }

function nowParts() {
  const d = new Date();
  return { date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`, time: `${pad(d.getHours())}:${pad(d.getMinutes())}` };
}

// ── 时间语义分类 ────────────────────────────────────────────────
// birth：八字 / 紫微 —— 要的是「出生时间」，必然是过去，用示例默认，不取当前时刻
// cast ：六爻 / 梅花 / 大六壬 —— 要的是「起卦时刻」，占的就是当下，自动取本机当前时刻
// none ：塔罗 —— 不看时间，日期时间字段整个隐藏
const TIME_KIND = {
  ziwei: 'birth', bazi: 'birth',
  liuyao: 'cast', meihua: 'cast', daliuren: 'cast',
  tarot: 'none',
};
const SAMPLE = { date: '1990-05-12', time: '14:30' };
const kindOf = (t) => TIME_KIND[t] || 'none';

// 问事的体系（六爻 / 梅花 / 六壬 / 塔罗）必须填「所问之事」；命盘类不问事
const NEED_ASK = { liuyao: true, meihua: true, daliuren: true, tarot: true };
const needAsk = (t) => !!NEED_ASK[t];

function App() {
  const [tab, setTab] = useState('ziwei');
  const [date, setDate] = useState('1990-05-12');
  const [time, setTime] = useState('14:30');
  const [gender, setGender] = useState('female');
  const [address, setAddress] = useState('');
  const [trueSolar, setTrueSolar] = useState(true);
  const [onlineGeo, setOnlineGeo] = useState(false);
  const [lines, setLines] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [count, setCount] = useState('3');
  const [question, setQuestion] = useState('');
  const [direction, setDirection] = useState('general');
  // 解析模块较长：窄屏默认收起、宽屏默认展开；用户手动切过就以他的选择为准
  const [foldPref, setFoldPref] = useState(null);
  // 「所问之事」未填就起卦时，输入框转红提示
  const [askInvalid, setAskInvalid] = useState(false);
  const [mhMode, setMhMode] = useState('time');
  const [upper, setUpper] = useState('');
  const [lower, setLower] = useState('');
  const [changing, setChanging] = useState('');
  const [copied, setCopied] = useState('');
  // 用户手动改过的日期/时刻，按语义分类分别记忆；null = 没改过，跟随自动值。
  // 分两类记的原因：出生时间与起卦时刻语义不同，跨类别时上一次的输入已无意义，
  // 所以从「八字」切到「六爻」会自动换成当前时刻，而切回「八字」仍是你填的出生时间。
  const [manual, setManual] = useState({ birth: null, cast: null });

  const meta = TABS.find((t) => t.k === tab) || TABS[0];
  const isBirth = tab === 'bazi' || tab === 'ziwei';
  const timeKind = kindOf(tab);
  const usesTimeInput = !(tab === 'meihua' && mhMode === 'number');
  const showDT = tab !== 'tarot' && usesTimeInput;

  const run = async (kind, override, modeOverride) => {
    const k = kind || tab;
    const mh = modeOverride || mhMode;
    const dt = override ? override : { date, time };
    try {
      const datetime = `${dt.date}T${dt.time}`;
      const args = { system: k };
      if (k !== 'tarot') args.datetime = datetime;
      if (k === 'bazi' || k === 'ziwei') {
        args.gender = gender;
        args.trueSolar = trueSolar;
        if (address.trim()) {
          args.address = address.trim();
          try {
            const g = await Engine.geocodeAddress(args.address, { online: onlineGeo });
            if (g && typeof g.lon === 'number') { args.longitude = g.lon; args.geo = g; }
          } catch (e) {
            console.error('[metaphysics] 地址解析失败，退回内置表', e);
          }
        }
      }
      if (k === 'liuyao') {
        const parsed = lines.split(/[^0-9]+/).filter(Boolean).map(Number);
        if (parsed.length === 6) args.lines = parsed;
      }
      if (k === 'tarot') args.count = Number(count);
      // 所问之事必填：问事的体系不给一份没有落点的解读
      if (needAsk(k)) {
        if (!question.trim()) {
          setError('请先填写「所问之事」——一句话即可，例如：今年是否适合换工作？');
          setAskInvalid(true);
          setResult(null);
          return;
        }
        setAskInvalid(false);
        args.question = question.trim();
      }
      if (k === 'meihua') {
        args.mode = mh;
        if (mh === 'number') {
          args.upper = Number(upper);
          args.lower = Number(lower);
          if (changing !== '') args.changing = Number(changing);
        }
      }
      const r = Engine.compute(args);
      // 问题与方向一并与卦象交给解读：解读按它展开，并在开头回显供确认
      const it = Engine.interpret
        ? Engine.interpret(r, needAsk(k) ? { question: question.trim(), direction } : undefined)
        : null;
      // timed：这次结果是否真的用到了「起卦时刻」（梅花数字起卦不用）
      const timed = kindOf(k) === 'cast' && (k !== 'meihua' || mh === 'time');
      setResult({ kind: k, r, it, at: dt, timed });
      setError('');
      setCopied('');
    } catch (e) {
      setError(e && e.message ? e.message : String(e));
      setResult(null);
    }
  };

  /** 切 tab：起卦类自动取当前时刻、命盘类回到示例默认；用户在这类下改过则保留他的值 */
  const switchTo = (next) => {
    const k = kindOf(next);
    setTab(next);
    setError('');
    if (k === 'none') { run(next); return; } // 塔罗不看时间，直接抽牌（与 web-ui 一致）
    const v = manual[k] || (k === 'cast' ? nowParts() : { date: SAMPLE.date, time: SAMPLE.time });
    setDate(v.date);
    setTime(v.time);
    run(next, v);
  };

  /** 手动改日期/时刻：记进当前语义分类，之后切同类 tab 会保留 */
  const editDate = (value) => {
    setDate(value);
    if (timeKind !== 'none') setManual((m) => Object.assign({}, m, { [timeKind]: { date: value, time } }));
  };
  const editTime = (value) => {
    setTime(value);
    if (timeKind !== 'none') setManual((m) => Object.assign({}, m, { [timeKind]: { date, time: value } }));
  };

  const runNow = () => {
    const t = nowParts();
    setDate(t.date);
    setTime(t.time);
    // 「此刻」是明确的「回到自动」：清掉该类下的手动值，以后切 tab 仍会跟随当前时刻
    if (timeKind !== 'none') setManual((m) => Object.assign({}, m, { [timeKind]: null }));
    run(tab, t);
  };

  /** 切起卦方式（时间/数字）：立刻重起一卦，避免结果头部留着上一模式的「起卦时刻」 */
  const switchMode = (m) => {
    setMhMode(m);
    run(tab, { date, time }, m);
  };

  const isNarrow = () => !!(window.matchMedia && window.matchMedia('(max-width: 640px)').matches);
  const defaultFolded = () => (foldPref === null ? isNarrow() : foldPref);

  /** 解析模块折叠：标题栏整栏可点（内容由 innerHTML 渲染，用委托处理） */
  const onFoldClick = (e) => {
    const head = e.target && e.target.closest ? e.target.closest('.it-head') : null;
    if (!head) return;
    const box = head.closest('.it');
    if (!box) return;
    const folded = !box.classList.contains('folded');
    box.classList.toggle('folded', folded);
    head.setAttribute('aria-expanded', folded ? 'false' : 'true');
    const hint = head.querySelector('.it-hint');
    if (hint) hint.textContent = folded ? '点击展开' : '点击收起';
    setFoldPref(folded);
  };

  /** 改问题或方向：拿缓存的卦象重出解读，不重摇一卦 */
  const refreshInterpret = (dir, q) => {
    if (!result || !needAsk(tab)) return;
    const ask = { question: (q === undefined ? question : q).trim(), direction: dir === undefined ? direction : dir };
    const it = Engine.interpret ? Engine.interpret(result.r, ask) : null;
    setResult(Object.assign({}, result, { it }));
  };

  /** 结果头部的一行「起卦时刻」，只在真正用到时间的起卦 tab 显示 */
  const castAtHTML = (res) => {
    if (!res || !res.timed || !res.at) return '';
    return `<div class="mp-cast">起卦时刻：<b>${res.at.date} ${res.at.time}</b>　（来自你的本机时间，点「此刻」可重新取当下）</div>`;
  };

  const copyResult = () => {
    try {
      const text = result && result.r && result.r.summary ? result.r.summary : '';
      if (!text) return;
      navigator.clipboard.writeText(text).then(() => setCopied('已复制'), () => setCopied('复制失败'));
    } catch (e) { setCopied('复制失败'); }
  };

  const field = (label, node) => h('label', { className: 'mp-field' }, label, node);

  useEffect(() => { run('ziwei'); }, []);

  const children = [
    h('div', { key: 'tabs', className: 'mp-tabs' }, TABS.map((t) =>
      h('button', {
        key: t.k,
        className: 'mp-tab' + (tab === t.k ? ' on' : ''),
        onClick: () => switchTo(t.k),
      }, t.label))),

    h('div', { key: 'head', className: 'mp-head' },
      showDT ? field(isBirth ? '出生日期（公历）' : '起卦日期（公历）',
        h('input', { className: 'mp-input', type: 'date', value: date, onChange: (e) => editDate(e.target.value) })) : null,
      showDT ? field(isBirth ? '出生时刻' : '起卦时刻',
        h('input', { className: 'mp-input', type: 'time', value: time, onChange: (e) => editTime(e.target.value) })) : null,
      isBirth ? field('性别', h('select', {
        className: 'mp-input', value: gender, onChange: (e) => setGender(e.target.value),
      }, h('option', { value: 'female' }, '女'), h('option', { value: 'male' }, '男'))) : null,
      isBirth ? field('出生地（省/市即可）', h('input', {
        className: 'mp-input', style: { minWidth: 200 }, placeholder: '如 河北石家庄 / 成都', value: address,
        onChange: (e) => setAddress(e.target.value),
      })) : null,
      isBirth ? h('label', { key: 'ts', className: 'mp-field', style: { flexDirection: 'row', alignItems: 'center', gap: 6 } },
        h('input', { type: 'checkbox', checked: trueSolar, onChange: (e) => setTrueSolar(e.target.checked) }), '真太阳时') : null,
      isBirth ? h('label', { key: 'og', className: 'mp-field', style: { flexDirection: 'row', alignItems: 'center', gap: 6 }, title: '开启后会请求 OpenStreetMap，把区县/村落到更精确的坐标' },
        h('input', { type: 'checkbox', checked: onlineGeo, onChange: (e) => setOnlineGeo(e.target.checked) }), '联网精确到区县') : null,
      tab === 'liuyao' ? field('六爻（可空，空则随机）', h('input', {
        className: 'mp-input', placeholder: '9 7 8 8 7 6', value: lines,
        onChange: (e) => setLines(e.target.value),
      })) : null,
      tab === 'meihua' ? field('起卦方式', h('div', { className: 'mp-seg' },
        h('button', { className: mhMode === 'time' ? 'on' : '', onClick: () => switchMode('time') }, '时间起卦'),
        h('button', { className: mhMode === 'number' ? 'on' : '', onClick: () => switchMode('number') }, '数字起卦'))) : null,
      (tab === 'meihua' && mhMode === 'number') ? field('第一个数', h('input', {
        className: 'mp-input', style: { minWidth: 88 }, value: upper, placeholder: '如 17',
        onChange: (e) => setUpper(e.target.value),
      })) : null,
      (tab === 'meihua' && mhMode === 'number') ? field('第二个数', h('input', {
        className: 'mp-input', style: { minWidth: 88 }, value: lower, placeholder: '如 29',
        onChange: (e) => setLower(e.target.value),
      })) : null,
      (tab === 'meihua' && mhMode === 'number') ? field('动爻（可空）', h('input', {
        className: 'mp-input', style: { minWidth: 88 }, value: changing, placeholder: '1-6',
        onChange: (e) => setChanging(e.target.value),
      })) : null,
      // 所问之事 + 询问方向：问事的体系共用，问题必填，两者都会交给下方解读
      needAsk(tab) ? field('所问之事（必填）', h('textarea', {
        className: 'mp-textarea' + (askInvalid ? ' invalid' : ''),
        rows: 2, value: question,
        placeholder: '用一句话描述所问之事，例如：今年是否适合换工作？',
        onChange: (e) => { setQuestion(e.target.value); setAskInvalid(false); },
        onBlur: (e) => refreshInterpret(undefined, e.target.value),
      })) : null,
      needAsk(tab) ? field('询问方向', h('select', {
        className: 'mp-input mp-dir', value: direction,
        onChange: (e) => { setDirection(e.target.value); refreshInterpret(e.target.value); },
      }, (Engine.DIRECTIONS || []).map((d) => h('option', { key: d.key, value: d.key }, d.label)))) : null,
      tab === 'tarot' ? field('张数', h('select', {
        className: 'mp-input', value: count, onChange: (e) => setCount(e.target.value),
      }, h('option', { value: '1' }, '1 张 · 指引'), h('option', { value: '3' }, '3 张 · 过去现在未来'), h('option', { value: '5' }, '5 张 · 十字牌阵'))) : null,
      tab !== 'tarot' ? h('button', {
        key: 'now', className: 'mp-btn ghost', style: { padding: '7px 14px' }, title: '把时间换成此刻并立即起卦',
        onClick: runNow,
      }, '此刻') : null,
      h('button', { key: 'go', className: 'mp-btn', onClick: () => run(tab) },
        tab === 'tarot' ? '抽牌' : tab === 'bazi' || tab === 'ziwei' ? '排盘' : '起卦')),

    h('div', { key: 'hint', className: 'mp-hint' }, meta.hint),

    (timeKind === 'cast' && usesTimeInput) ? h('div', { key: 'auto', className: 'mp-auto' },
      // 文案分清「自动取的」和「你手动填的」，免得明明改过还说自动取
      manual.cast
        ? `起卦时刻现在用的是你手动填的（${time}）；点「此刻」可回到自动取当下。`
        : `起卦时刻已自动取你的本机时间（${time}）；想用别的时刻可以直接改，或点「此刻」重新取当下。`) : null,

    error ? h('div', { key: 'err', className: 'mp-err' }, error) : null,

    result ? h('div', {
      key: 'card',
      className: 'mp-card mp-flat',
      onClick: onFoldClick,
      dangerouslySetInnerHTML: {
        __html: castAtHTML(result) + PP.resultWithInterpret(
          result.kind === 'ziwei' ? PP.ziweiHTML(result.r)
            : result.kind === 'bazi' ? PP.baziHTML(result.r)
              : result.kind === 'meihua' ? PP.meihuaHTML(result.r)
                : result.kind === 'daliuren' ? PP.daliurenHTML(result.r)
                  : result.kind === 'tarot' ? PP.tarotHTML(result.r)
                    : PP.liuyaoHTML(result.r),
          result.it,
          { folded: defaultFolded() },
        ),
      },
    }) : null,

    result ? h('div', { key: 'bar', className: 'mp-bar' },
      h('button', { className: 'mp-btn ghost', style: { fontSize: 12, padding: '5px 12px' }, onClick: copyResult },
        copied || '复制文字结果')) : null,

    (!result && !error) ? h('div', { key: 'ph', className: 'mp-dim', style: { marginTop: 24, fontSize: 12 } },
      '选择体系后点「排盘」。所有计算在本机完成，不上传任何数据。') : null,
  ];

  return h('div', { className: 'mp-wrap' }, children);
}

// 样式注入：优先用宿主 styles 服务，取不到就直接写 <style>（两条路都必须成功一条）
function injectStyle(css) {
  try {
    if (typeof styles !== 'undefined' && styles && typeof styles.insert === 'function') {
      return styles.insert(css);
    }
  } catch (e) {
    console.error('[metaphysics] styles.insert 不可用，改用 DOM 注入', e);
  }
  try {
    const el = document.createElement('style');
    el.setAttribute('data-plugin', '@local/metaphysics');
    el.textContent = css;
    document.head.appendChild(el);
    return () => el.remove();
  } catch (e) {
    console.error('[metaphysics] DOM 注入样式也失败', e);
    return () => {};
  }
}

// 客户端插件绝不能因为自身异常拖垮应用启动：注册失败只记日志。
function safeApply(ctx) {
  try {
    const dispose = injectStyle(CSS + (PP && PP.CSS ? PP.CSS : ''));
    if (typeof ctx.effect === 'function' && typeof dispose === 'function') ctx.effect(() => dispose);
  } catch (e) {
    console.error('[metaphysics] 样式注入失败', e);
  }

  let slots = null;
  try {
    slots = (ctx && ctx.slots) || (ctx && typeof ctx.get === 'function' ? ctx.get('slots') : null);
  } catch (e) {
    console.error('[metaphysics] 取 slots 服务失败', e);
  }
  if (!slots || typeof slots.register !== 'function') {
    console.error('[metaphysics] slots 服务不可用，面板未注册');
    return;
  }

  // 关键：槽位由外壳（ui-layout）声明，可能晚于本插件激活。
  // 用 slots.inject 等声明提交后再注册，直接 register 会抛 "slot is not declared"。
  const waitFor = (key, install) => {
    try {
      if (typeof slots.inject === 'function') {
        slots.inject(key, install);
      } else {
        install();
      }
    } catch (e) {
      console.error('[metaphysics] 等待槽位失败：' + key, e);
      try { install(); } catch (e2) { console.error('[metaphysics] 直接注册也失败：' + key, e2); }
    }
  };

  waitFor('sidebar.panellist', () => slots.register(
    { name: 'sidebar.panellist', id: 'metaphysics', order: 20, label: () => '命理' },
    PanelIcon,
  ));

  waitFor('main', () => slots.register({ name: 'main', key: 'metaphysics' }, App));
}

return {
  inject: ['slots'],
  apply(ctx) {
    try {
      safeApply(ctx);
    } catch (e) {
      console.error('[metaphysics] apply 异常', e);
    }
  },
};

  },
});
