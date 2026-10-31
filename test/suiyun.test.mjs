// 0.37.2 / 0.50.3：岁运并临 / 伏吟反吟的逐年提示。
// 口径：流年按立春起算（该年立春到次年立春），当值大运取与这一区间相交的步；
// 交运落在年内时前后两步并列。六类信号——岁运并临、运年反吟、大运伏吟、大运反吟、
// 流年伏吟、流年反吟——只标干支重复与天克地冲，不折分数、不判吉凶。
// 大运与本命四柱的伏吟/反吟整步大运都在，随每年重复列出。
//
// 重点防五件事：①当值大运取错（用虚岁近似、漏掉年内交运）②天克地冲只判冲不判干克
// ③伏吟/反吟对错了柱 ④大运与本命柱的伏吟/反吟漏标或漏掉整步重复
// ⑤只算引擎、不落到摘要/解析/白话/面板。
import fs from 'node:fs';
import vm from 'node:vm';
import { buildBazi } from '../engine/bazi.js';
import { compute, interpret, interpretText } from '../engine/index.js';
import { buildPlain } from '../engine/interpret-plain.js';
import { KNOWLEDGE } from '../engine/interpret-knowledge.js';
import {
  STEMS, BRANCHES, ganzhiName, sexagenaryIndex, termWindow, jdToParts, partsToJd,
} from '../engine/calendar.js';
import { ok, eq } from './_harness.mjs';

// ── 独立参照实现：不复用引擎里的任何判定函数 ──────────────────────────
const GZ = Array.from({ length: 60 }, (_, i) => ganzhiName(i).name);
const yearGz = (y) => GZ[((y - 4) % 60 + 60) % 60];

const ELEM = {
  甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土',
  己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水',
};
// 天干克谁：甲克戊己（土）……
const KE = { 甲: '土', 乙: '土', 丙: '金', 丁: '金', 戊: '水', 己: '水', 庚: '木', 辛: '木', 壬: '火', 癸: '火' };
const CHONG = new Set(['子午', '午子', '丑未', '未丑', '寅申', '申寅', '卯酉', '酉卯', '辰戌', '戌辰', '巳亥', '亥巳']);
const ke = (a, b) => KE[a] === ELEM[b];
const tianKeDiChong = (a, b) => (ke(a[0], b[0]) || ke(b[0], a[0])) && CHONG.has(a[1] + b[1]);
const stampJd = (s) => {
  const m = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/.exec(s);
  return m ? partsToJd({ year: +m[1], month: +m[2], day: +m[3], hour: +m[4], minute: +m[5] }) : NaN;
};
const lichunJd = (y) => {
  const t = termWindow(y).find((x) => x.index === 2 && jdToParts(x.jd).year === y);
  return t ? t.jd : NaN;
};
const NATAL = ['year', 'month', 'day', 'hour'];
const NATAL_CN = { year: '年柱', month: '月柱', day: '日柱', hour: '时柱' };

const CASES = [
  { label: '1952-03-12 男', year: 1952, month: 3, day: 12, hour: 10, gender: 'male' },
  { label: '1966-03-08 女', year: 1966, month: 3, day: 8, hour: 10, gender: 'female' },
  { label: '1990-05-12 男', year: 1990, month: 5, day: 12, hour: 14, gender: 'male' },
  { label: '1984-02-02 男', year: 1984, month: 2, day: 2, hour: 2, gender: 'male' },
  { label: '2000-01-01 女', year: 2000, month: 1, day: 1, hour: 8, gender: 'female' },
  { label: '1975-12-31 男', year: 1975, month: 12, day: 31, hour: 22, gender: 'male' },
  { label: '2001-02-03 女', year: 2001, month: 2, day: 3, hour: 6, gender: 'female' },
  { label: '2001-02-04 男', year: 2001, month: 2, day: 4, hour: 18, gender: 'male' },
  { label: '1999-12-31 女', year: 1999, month: 12, day: 31, hour: 23, gender: 'female' },
  { label: '1960-06-15 男', year: 1960, month: 6, day: 15, hour: 12, gender: 'male' },
  { label: '1950-07-15 男', year: 1950, month: 7, day: 15, hour: 9, gender: 'male' },
];

const build = (c, nowYear = 2026) => buildBazi({
  year: c.year, month: c.month, day: c.day, hour: c.hour, minute: 0,
  gender: c.gender, trueSolar: false, dst: false, nowYear,
});

const charts = CASES.map((c) => ({ c, r: build(c) }));

// ── 一、结构：每条流年都带 suiyun，字段与口径说明齐全 ─────────────────
for (const { c, r } of charts) {
  const okShape = r.liunian.every((l) => l.suiyun
    && Array.isArray(l.suiyun.dayun)
    && Array.isArray(l.suiyun.signals)
    && typeof l.suiyun.note === 'string');
  ok(`${c.label} 每条流年都有 suiyun 结构`, okShape);
  ok(`${c.label} 口径写明「不判吉凶」`, r.liunian.every((l) => /不判吉凶/.test(l.suiyun.note)));
  ok(`${c.label} 流年仍是 10 条`, r.liunian.length === 10, String(r.liunian.length));
  ok(`${c.label} 交运年内并列写进 note`, /交运落在年内/.test(r.liunian[0].suiyun.note));
  ok(`${c.label} 同一年内没有重复的 type+target`, r.liunian.every((l) => new Set(l.suiyun.signals.map((s) => `${s.type}|${s.target}`)).size === l.suiyun.signals.length));
}

// ── 二、独立复算：大运干支、当值窗口、六类信号逐条比对 ───────────────
for (const { c, r } of charts) {
  const mi = sexagenaryIndex(
    STEMS.indexOf(r.pillars.month.stem),
    BRANCHES.indexOf(r.pillars.month.branch),
  );
  const forward = r.dayun.direction === '顺行';
  const refList = Array.from({ length: 8 }, (_, k) => {
    const i = k + 1;
    return GZ[((mi + (forward ? i : -i)) % 60 + 60) % 60];
  });
  eq(`${c.label} 八步大运干支独立复算`, r.dayun.list.map((d) => d.ganzhi).join(''), refList.join(''));

  const windows = r.dayun.list.map((d) => ({
    step: d.step, ganzhi: d.ganzhi, from: stampJd(d.fromDate), to: stampJd(d.toDate),
  }));
  let activeOk = true;
  let signalOk = true;
  for (const l of r.liunian) {
    const y0 = lichunJd(l.year);
    const y1 = lichunJd(l.year + 1);
    const refActive = windows.filter((w) => w.from < y1 && w.to > y0);
    if (l.suiyun.dayun.map((d) => d.step).join(',') !== refActive.map((w) => w.step).join(',')) {
      activeOk = false;
      console.log(`  窗口不符 ${c.label} ${l.year}: 引擎 ${l.suiyun.dayun.map((d) => d.step).join(',')} / 参照 ${refActive.map((w) => w.step).join(',')}`);
    }
    const refSig = [];
    for (const w of refActive) {
      if (w.ganzhi === l.ganzhi) refSig.push(`岁运并临|第${w.step}步大运`);
      else if (tianKeDiChong(w.ganzhi, l.ganzhi)) refSig.push(`运年反吟|第${w.step}步大运`);
      for (const k of NATAL) {
        const g = r.pillars[k].ganzhi;
        if (w.ganzhi === g) refSig.push(`大运伏吟|第${w.step}步大运·${NATAL_CN[k]}`);
        else if (tianKeDiChong(w.ganzhi, g)) refSig.push(`大运反吟|第${w.step}步大运·${NATAL_CN[k]}`);
      }
    }
    for (const k of NATAL) {
      const g = r.pillars[k].ganzhi;
      if (l.ganzhi === g) refSig.push(`流年伏吟|${NATAL_CN[k]}`);
      else if (tianKeDiChong(l.ganzhi, g)) refSig.push(`流年反吟|${NATAL_CN[k]}`);
    }
    const got = l.suiyun.signals.map((s) => `${s.type}|${s.target}`).sort().join(',');
    if (got !== refSig.sort().join(',')) {
      signalOk = false;
      console.log(`  信号不符 ${c.label} ${l.year}: 引擎 [${got}] / 参照 [${refSig.join(',')}]`);
    }
    // 流年干支本身也要与年份对得上
    if (l.ganzhi !== yearGz(l.year)) {
      signalOk = false;
      console.log(`  干支不符 ${c.label} ${l.year}: ${l.ganzhi} / ${yearGz(l.year)}`);
    }
  }
  ok(`${c.label} 当值大运按立春区间独立复算`, activeOk);
  ok(`${c.label} 六类信号逐条独立复算`, signalOk);
}

// ── 三、规则：类型与事实必须对得上（扫描全部样本） ───────────────────
{
  let binglin = 0;
  let yunFan = 0;
  let yunFu = 0;
  let yunFanNatal = 0;
  let liuFu = 0;
  let liuFan = 0;
  let binglinBad = 0;
  let yunFanBad = 0;
  let yunFuBad = 0;
  let yunFanNatalBad = 0;
  let liuFuBad = 0;
  let liuFanBad = 0;
  for (const { r } of charts) {
    for (const l of r.liunian) {
      for (const s of l.suiyun.signals) {
        if (s.type === '岁运并临') {
          binglin += 1;
          if (!l.suiyun.dayun.some((d) => d.ganzhi === l.ganzhi)) binglinBad += 1;
        } else if (s.type === '运年反吟') {
          yunFan += 1;
          const step = Number((s.target.match(/第(\d+)步/) || [])[1]);
          const d = l.suiyun.dayun.find((x) => x.step === step);
          if (!d || !tianKeDiChong(d.ganzhi, l.ganzhi)) yunFanBad += 1;
        } else if (s.type === '大运伏吟' || s.type === '大运反吟') {
          if (s.type === '大运伏吟') yunFu += 1; else yunFanNatal += 1;
          const m = /^第(\d+)步大运·(.+)$/.exec(s.target);
          const k = m ? NATAL.find((x) => NATAL_CN[x] === m[2]) : null;
          const d = m ? l.suiyun.dayun.find((x) => x.step === Number(m[1])) : null;
          const bad = !k || !d || (s.type === '大运伏吟'
            ? d.ganzhi !== r.pillars[k].ganzhi
            : !tianKeDiChong(d.ganzhi, r.pillars[k].ganzhi));
          if (bad) { if (s.type === '大运伏吟') yunFuBad += 1; else yunFanNatalBad += 1; }
        } else if (s.type === '流年伏吟') {
          liuFu += 1;
          const k = NATAL.find((x) => NATAL_CN[x] === s.target);
          if (!k || r.pillars[k].ganzhi !== l.ganzhi) liuFuBad += 1;
        } else if (s.type === '流年反吟') {
          liuFan += 1;
          const k = NATAL.find((x) => NATAL_CN[x] === s.target);
          if (!k || !tianKeDiChong(l.ganzhi, r.pillars[k].ganzhi)) liuFanBad += 1;
        }
      }
    }
  }
  ok('样本里六类信号都被触发（防死规则）',
    binglin > 0 && yunFan > 0 && yunFu > 0 && yunFanNatal > 0 && liuFu > 0 && liuFan > 0,
    `并临 ${binglin} / 运年反吟 ${yunFan} / 大运伏吟 ${yunFu} / 大运反吟 ${yunFanNatal} / 流年伏吟 ${liuFu} / 流年反吟 ${liuFan}`);
  eq('岁运并临：当值大运与流年干支相同', binglinBad, 0);
  eq('运年反吟：所指大运与流年天克地冲', yunFanBad, 0);
  eq('大运伏吟：所指大运与对应柱干支相同', yunFuBad, 0);
  eq('大运反吟：所指大运与对应柱天克地冲', yunFanNatalBad, 0);
  eq('流年伏吟：对应柱干支相同', liuFuBad, 0);
  eq('流年反吟：对应柱天克地冲', liuFanBad, 0);
}

// ── 四、边界：同干只冲不算反吟；起运前没有大运；年内交运两步并列 ─────
{
  // 1966 年柱丙午；1996 丙子同干、子午冲，天干不克 → 只能是普通流年，不算反吟
  const c1966 = CASES.find((c) => c.year === 1966);
  const r96 = build(c1966, 1996);
  const l96 = r96.liunian.find((l) => l.year === 1996);
  ok('构造：1996 是丙子年、年柱丙午同干相冲', l96 && l96.ganzhi === '丙子' && r96.pillars.year.ganzhi === '丙午');
  ok('同干相冲不判反吟（须天干也克）', !l96.suiyun.signals.some((s) => s.type === '流年反吟' && s.target === '年柱'), JSON.stringify(l96.suiyun.signals));
  ok('正常流年仍照常出干支', l96.year === 1996 && l96.ganzhi === '丙子');

  // 1990 年生，8 岁 3 个月起运；nowYear 1990 时前几年还没交运
  const c1990 = CASES.find((c) => c.year === 1990);
  const r90 = build(c1990, 1990);
  const pre = r90.liunian.filter((l) => l.year < 1998);
  ok('起运前的流年没有当值大运', pre.length > 0 && pre.every((l) => l.suiyun.dayun.length === 0), JSON.stringify(pre.map((l) => [l.year, l.suiyun.dayun.length])));
  ok('起运前不会出岁运并临', pre.every((l) => !l.suiyun.signals.some((s) => s.type === '岁运并临')));
  ok('起运前的流年伏吟/反吟仍可单独成立', pre.every((l) => l.suiyun.signals.every((s) => s.type.startsWith('流年'))));

  // 1950 年柱庚寅；第 7 步大运庚寅在 2026–2028 当值 → 整步大运逐年重复
  const c1950 = CASES.find((c) => c.year === 1950);
  const r50 = build(c1950, 2026);
  const fu = r50.liunian.filter((l) => l.suiyun.signals.some((s) => s.type === '大运伏吟' && s.target === '第7步大运·年柱'));
  eq('大运伏吟整步大运逐年列出（2026–2028）', fu.map((l) => l.year).join(','), '2026,2027,2028');
  ok('大运伏吟不误记成流年伏吟', !r50.liunian.some((l) => l.suiyun.signals.some((s) => s.type === '流年伏吟' && s.target === '年柱')));

  // 1966-11-12 交运第 7 步；2026 立春到 2027 立春横跨交运日 → 第 6、7 步都在本年当过值
  const r26 = build(c1966, 2026);
  const l26 = r26.liunian.find((l) => l.year === 2026);
  eq('年内交运：前后两步大运并列', l26.suiyun.dayun.map((d) => d.step).join(','), '6,7');
  ok('年内交运的两步干支与年表一致',
    l26.suiyun.dayun.map((d) => d.ganzhi).join(',') === r26.dayun.list.filter((d) => [6, 7].includes(d.step)).map((d) => d.ganzhi).join(','));
}

// ── 五、确定性：同一输入两次构建完全一致 ─────────────────────────────
{
  const a = build(CASES[0]).liunian.map((l) => l.suiyun);
  const b = build(CASES[0]).liunian.map((l) => l.suiyun);
  eq('同一输入两次构建，suiyun 完全一致', JSON.stringify(a), JSON.stringify(b));
}

// ── 六、四处可见：摘要 / 解析 / 白话 / 面板 ──────────────────────────
{
  const args = {
    system: 'bazi', datetime: '1952-03-12T10:00', gender: 'male',
    trueSolar: false, dst: false, nowYear: 2026, withInterpret: true,
  };
  const r = compute(args);
  ok('摘要含岁运提示且标明不判吉凶', /岁运提示（只标干支变动，不判吉凶）/.test(r.summary), '');
  ok('摘要列出 2030 岁运并临', /2030庚戌 岁运并临/.test(r.summary), r.summary.split('\n').filter((x) => /岁运/.test(x)).join(''));
  ok('摘要列出 2031 的流年反吟', /2031辛亥 岁运并临\/大运反吟\(第8步大运·日柱\)\/大运反吟\(第8步大运·时柱\)\/流年反吟\(日柱\)\/流年反吟\(时柱\)/.test(r.summary), '');
  ok('摘要列出大运反吟及其柱位', /大运反吟\(第8步大运·日柱\)/.test(r.summary), '');
  const r50 = compute({
    system: 'bazi', datetime: '1950-07-15T09:30', gender: 'male',
    trueSolar: false, dst: false, nowYear: 2026,
  });
  ok('摘要列出大运伏吟及其柱位', /2026丙午 大运伏吟\(第7步大运·年柱\)/.test(r50.summary), r50.summary.split('\n').filter((x) => /岁运/.test(x)).join(''));
  const sec = (r.interpret.sections || []).find((s) => s.key === 'suiyun');
  ok('解析有「岁运提示」一节', !!sec && sec.label === '岁运提示');
  ok('解析写清大运与流年同为庚戌', !!sec && /大运与流年同为庚戌/.test(sec.text));
  ok('解析写清大运与日柱反吟', !!sec && /大运\S+与日柱\S+天克地冲/.test(sec.text));
  ok('解析写明整步大运重复、不逐年加重', !!sec && /整步大运都在/.test(sec.text) && /不当成逐年加重/.test(sec.text));
  ok('解析写明只标变动、仍看用神', !!sec && /不据此判吉凶/.test(sec.text) && /用神/.test(sec.text));
  ok('文本输出含岁运提示', interpretText(r.interpret).includes('岁运提示：'));
  ok('白话加一句变化感提示（取最近一个命中）', /变化感强一点/.test(buildPlain(r)) && /2029/.test(buildPlain(r)), buildPlain(r));
  eq('八字仍是三张表（不因新提示多塞表）', r.interpret.tables.map((t) => t.key).join(','), 'dayun,liunian,triggers');

  const sandbox = { window: {}, console };
  vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
  const PP = sandbox.window.__PP;
  const html = PP.baziHTML(r);
  ok('面板出「岁运提示」行', /岁运提示（只标干支变动，不判吉凶）/.test(html));
  ok('面板 chip 带年份与类型', /2030 岁运并临/.test(html), '');
  ok('面板 chip 悬停给依据', /大运与流年同为庚戌/.test(html));
  ok('面板 chip 带大运反吟的柱位', /大运反吟·第8步大运·日柱/.test(html));
  const html50 = PP.baziHTML(r50);
  ok('面板 chip 带大运伏吟的柱位', /大运伏吟·第7步大运·年柱/.test(html50));

  // 旧结果（没有 suiyun 字段）不能炸，也不能凭空多出一行
  const old = JSON.parse(JSON.stringify(r));
  for (const l of old.liunian) delete l.suiyun;
  let oldOk = true;
  let oldSection = '';
  try {
    const oi = interpret(old, {});
    oldSection = (oi.sections || []).find((s) => s.key === 'suiyun')?.text || '';
    const ohtml = PP.baziHTML(old);
    oldOk = !/岁运提示（只标干支变动/.test(ohtml);
  } catch (e) {
    console.log('  旧结果报错', e.message);
    oldOk = false;
  }
  ok('旧结果（无 suiyun）解析与面板不报错', oldOk);
  ok('旧结果解析给「近十年没有」的保守说法', /近十年没有/.test(oldSection), oldSection);
}

// ── 七、知识卡与口径一致 ──────────────────────────────────────────────
{
  const card = KNOWLEDGE.find((k) => k.id === 'bazi-suiyun');
  ok('知识卡 bazi-suiyun 存在', !!card);
  ok('知识卡写明六类信号', !!card && /岁运并临/.test(card.detail) && /运年反吟/.test(card.detail) && /大运伏吟/.test(card.detail) && /大运反吟/.test(card.detail) && /流年伏吟/.test(card.detail) && /流年反吟/.test(card.detail));
  ok('知识卡 note 仍标「不判吉凶」', !!card && /不断吉凶|不判吉凶/.test(card.note));
  ok('知识卡 note 交代大运伏吟/反吟整步重复、不逐年加重', !!card && /连续多年出现/.test(card.note) && /不逐年加重/.test(card.note));
}
