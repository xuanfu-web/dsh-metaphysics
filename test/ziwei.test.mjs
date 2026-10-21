import { buildZiwei, ziweiTianfuIndex, hourBranchIndex } from '../engine/ziwei.js';
import { solarToLunar } from '../engine/lunar.js';

const ok = (label, cond, extra = '') =>
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${label}${extra ? '  -> ' + extra : ''}`);

// 1) 时辰序
ok('00:30 = 子时', hourBranchIndex(0, 30) === 0);
ok('01:30 = 丑时', hourBranchIndex(1, 30) === 1);
ok('14:30 = 未时', hourBranchIndex(14, 30) === 7);
ok('23:30 = 子时', hourBranchIndex(23, 30) === 0);

// 2) 紫微定位：水二局初一在丑、初三在寅、初四在卯（经典星表）
const cases = [
  [1, 2, '丑'], [2, 2, '寅'], [3, 2, '寅'], [4, 2, '卯'],
  [5, 2, '卯'], [6, 2, '辰'], [7, 2, '辰'],
];
const BR = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
for (const [day, bureau, expect] of cases) {
  const { ziwei } = ziweiTianfuIndex(day, bureau);
  ok(`水二局 ${day}日 紫微在${expect}`, BR[ziwei] === expect, BR[ziwei]);
}

// 3) 紫微/天府关于寅申轴对称
let symmetric = true;
for (let d = 1; d <= 30; d++) {
  for (let b = 2; b <= 6; b++) {
    const { ziwei, tianfu } = ziweiTianfuIndex(d, b);
    if ((ziwei + tianfu) % 12 !== 4) { symmetric = false; console.log('  不对称', d, b, ziwei, tianfu); }
  }
}
ok('紫微天府对称（紫+府≡寅）', symmetric);

// 4) 十四主星必落 14 颗，且每宫星数合计正确
const chart = buildZiwei({ year: 1990, month: 5, day: 12, hour: 14, minute: 30, gender: 'female' });
const allStars = chart.palaces.flatMap((p) => p.stars);
const majors = allStars.filter((s) => s.type === '主星');
ok('主星 14 颗', majors.length === 14, String(majors.length));
ok('主星不重复', new Set(majors.map((s) => s.name)).size === 14);
ok('十二宫齐全', new Set(chart.palaces.map((p) => p.palace)).size === 12, chart.palaces.map((p) => p.palace).join(' '));
ok('命宫唯一', chart.palaces.filter((p) => p.isSoul).length === 1);
ok('身宫唯一', chart.palaces.filter((p) => p.isBody).length === 1);

// 5) 身宫与命宫的关系：身 - 命 = 2 × 时支
const soulIdx = BR.indexOf(chart.soul.branch);
const bodyIdx = BR.indexOf(chart.body.branch);
ok('身宫-命宫 = 2×时支', ((bodyIdx - soulIdx + 12) % 12) === (2 * hourBranchIndex(14, 30)) % 12,
  `${chart.soul.branch}->${chart.body.branch}`);

// 6) 农历日期应能对上（1990-05-12 = 农历四月十八）
const l = solarToLunar(1990, 5, 12);
ok('1990-05-12 农历', l.month === 4 && l.day === 18 && !l.isLeap, `${l.month}月${l.day}日`);

// 7) 大限：起始岁 = 局数，十二宫各差 10 年
const starts = chart.palaces.map((p) => p.daxian.start).sort((a, b) => a - b);
ok('大限起始岁 = 局数', starts[0] === chart.bureau.number, `${starts[0]} vs ${chart.bureau.number}`);
ok('大限步长 10', starts.every((s, i) => s === starts[0] + i * 10), starts.join(','));

console.log('\n--- 紫微盘 ---');
console.log(chart.palaces.map((p) => `${p.palace} ${p.branch} ${p.ganzhi} ${p.daxian.start}-${p.daxian.end} ${p.stars.map((s) => s.name + (s.mutagen ? '化' + s.mutagen : '')).join(' ')}`).join('\n'));
console.log(`命宫 ${chart.soul.branch}(${chart.soul.ganzhi}·${chart.soul.nayin}) 五行局 ${chart.bureau.name} 紫微 ${chart.ziwei} 天府 ${chart.tianfu}`);
console.log(`农历 ${chart.lunar.year}年${chart.lunar.month}月${chart.lunar.day}日`);

// ── 辅星与小限流年 ───────────────────────────────────────────
const starBranch = (c, name) => {
  const p = c.palaces.find((x) => x.stars.some((s) => s.name === name));
  return p ? BR.indexOf(p.branch) : -1;
};

// 10 个年干各排一盘（取年中日期，避免农历年跨界）
const yearStems = [
  [1984, '甲'], [1985, '乙'], [1986, '丙'], [1987, '丁'], [1988, '戊'],
  [1989, '己'], [1990, '庚'], [1991, '辛'], [1992, '壬'], [1993, '癸'],
];
const LUCUN_EXPECT = { 甲: '寅', 乙: '卯', 丙: '巳', 丁: '午', 戊: '巳', 己: '午', 庚: '申', 辛: '酉', 壬: '亥', 癸: '子' };
const KUI_YUE_EXPECT = {
  甲: [1, 7], 戊: [1, 7], 庚: [1, 7], 乙: [0, 8], 己: [0, 8],
  丙: [11, 9], 丁: [11, 9], 辛: [6, 2], 壬: [3, 5], 癸: [3, 5],
};

let luOk = true;
let yangTuoOk = true;
let kuiYueOk = true;
for (const [y, stem] of yearStems) {
  const c = buildZiwei({ year: y, month: 6, day: 15, hour: 10, minute: 0, gender: 'male' });
  if (c.yearGanzhi[0] !== stem) { console.log('  年干不符', y, c.yearGanzhi); luOk = false; continue; }
  const lu = starBranch(c, '禄存');
  if (BR[lu] !== LUCUN_EXPECT[stem]) { luOk = false; console.log('  禄存错', stem, BR[lu]); }
  if (starBranch(c, '擎羊') !== (lu + 1) % 12) { yangTuoOk = false; console.log('  擎羊错', stem); }
  if (starBranch(c, '陀罗') !== (lu + 11) % 12) { yangTuoOk = false; console.log('  陀罗错', stem); }
  if (starBranch(c, '天魁') !== KUI_YUE_EXPECT[stem][0] || starBranch(c, '天钺') !== KUI_YUE_EXPECT[stem][1]) {
    kuiYueOk = false; console.log('  魁钺错', stem, BR[starBranch(c, '天魁')], BR[starBranch(c, '天钺')]);
  }
}
ok('禄存十干定位', luOk);
ok('擎羊在禄存前、陀罗在禄存后', yangTuoOk);
ok('天魁天钺十干定位', kuiYueOk);

// 火铃：1990 庚午年（寅午戌），未时 -> 火星申、铃星戌
const fire = buildZiwei({ year: 1990, month: 6, day: 15, hour: 14, minute: 0, gender: 'male' });
ok('火星 寅午戌年未时在申', BR[starBranch(fire, '火星')] === '申', BR[starBranch(fire, '火星')]);
ok('铃星 寅午戌年未时在戌', BR[starBranch(fire, '铃星')] === '戌', BR[starBranch(fire, '铃星')]);

// 火铃：2020 庚子年（申子辰），子时 -> 火星寅、铃星戌
const fire2 = buildZiwei({ year: 2020, month: 6, day: 15, hour: 23, minute: 30, gender: 'male' });
ok('火星 申子辰年子时在寅', BR[starBranch(fire2, '火星')] === '寅', BR[starBranch(fire2, '火星')]);
ok('铃星 申子辰年子时在戌', BR[starBranch(fire2, '铃星')] === '戌', BR[starBranch(fire2, '铃星')]);

// 星曜总数：主星 14 + 辅星 4 + 吉星 14 + 煞星 14 + 杂曜 3 = 49
const total = chart.palaces.reduce((n, p) => n + p.stars.length, 0);
ok('星曜共 49 颗', total === 49, String(total));

// 地空/地劫：亥起子时，劫顺空逆。应期 1990-05-12 未时(7) -> 地劫午、地空辰
ok('地劫 亥起顺行', BR[starBranch(chart, '地劫')] === '午', BR[starBranch(chart, '地劫')]);
ok('地空 亥起逆行', BR[starBranch(chart, '地空')] === '辰', BR[starBranch(chart, '地空')]);
// 天伤恒在交友、天使恒在疾厄
const soulPalace = chart.palaces.find((p) => p.isSoul).palace;
ok('天伤落交友宫', chart.palaces.find((p) => p.stars.some((s) => s.name === '天伤')).palace === '交友');
ok('天使落疾厄宫', chart.palaces.find((p) => p.stars.some((s) => s.name === '天使')).palace === '疾厄');
ok('命主按命宫支', chart.lifeMaster === '禄存', `${soulPalace} -> ${chart.lifeMaster}`);
ok('身主按年支', chart.bodyMaster === '火星', `${chart.yearGanzhi} -> ${chart.bodyMaster}`);

// 小限：庚午年男一岁在辰，女一岁在戌
const m = buildZiwei({ year: 1990, month: 6, day: 15, hour: 10, minute: 0, gender: 'male' });
const f = buildZiwei({ year: 1990, month: 6, day: 15, hour: 10, minute: 0, gender: 'female' });
const ageAt = (c, branch) => c.palaces.find((p) => p.branch === branch).xiaoxian.age;
ok('小限 男 寅午戌 一岁在辰', ageAt(m, '辰') === 1, String(ageAt(m, '辰')));
ok('小限 女 寅午戌 一岁在戌', ageAt(f, '戌') === 1, String(ageAt(f, '戌')));
ok('小限 每宫 1..12 各一次', new Set(chart.palaces.map((p) => p.xiaoxian.age)).size === 12);

// 流年：流年命宫 = 该年地支宫
let lnOk = true;
for (const l of chart.liunian) {
  if (l.lifePalace.branch !== l.ganzhi[1]) { lnOk = false; console.log('  流年命宫错', l.ganzhi, l.lifePalace.branch); }
}
ok('流年命宫取该年地支', lnOk);
ok('流年 12 年', chart.liunian.length === 12);
ok('流年四化非空', chart.liunian.every((l) => l.mutagen.length === 4), JSON.stringify(chart.liunian[0].mutagen));
ok('流年带流禄流羊流陀', chart.liunian.every((l) => l.liulu && l.liuyang && l.liutuo));
ok('流年带三方四正', chart.liunian.every((l) => Array.isArray(l.sanfang) && l.sanfang.length === 4));

// ── 杂曜与十二神 ─────────────────────────────────────────────
const palace = (c, branch) => c.palaces.find((p) => p.branch === branch);
const starAt = (c, name) => {
  const p = c.palaces.find((x) => x.stars.some((s) => s.name === name));
  return p ? p.branch : null;
};

// 天马：1990 庚午年（寅午戌）在申
ok('天马 寅午戌在申', starAt(chart, '天马') === '申', starAt(chart, '天马'));
// 红鸾：子年在卯，对宫天喜在酉
const zi = buildZiwei({ year: 1984, month: 6, day: 15, hour: 10, minute: 0, gender: 'male' });
ok('红鸾 子年在卯', starAt(zi, '红鸾') === '卯', starAt(zi, '红鸾'));
ok('天喜 为红鸾对宫', starAt(zi, '天喜') === '酉', starAt(zi, '天喜'));

// 三台随左辅顺数、八座随右弼逆数：三台在左辅与八座之间不重合
ok('三台八座不同宫', starAt(chart, '三台') !== starAt(chart, '八座'));

// 十二神
ok('岁建落年支宫', palace(chart, chart.yearGanzhi[1]).shensha.suiqi === '岁建',
  palace(chart, chart.yearGanzhi[1]).shensha.suiqi);
ok('博士随禄存同宫', palace(chart, starAt(chart, '禄存')).shensha.boshi === '博士',
  palace(chart, starAt(chart, '禄存')).shensha.boshi);
ok('长生落土五局申宫', palace(chart, '申').shensha.changsheng === '长生',
  palace(chart, '申').shensha.changsheng);
ok('将星落三合中神午宫', palace(chart, '午').shensha.jiangqian === '将星',
  palace(chart, '午').shensha.jiangqian);

// 长生十二神每宫不重复
ok('长生十二神各宫唯一', new Set(chart.palaces.map((p) => p.shensha.changsheng)).size === 12);
ok('将前十二神各宫唯一', new Set(chart.palaces.map((p) => p.shensha.jiangqian)).size === 12);
ok('岁前十二神各宫唯一', new Set(chart.palaces.map((p) => p.shensha.suiqi)).size === 12);

// 星曜总数：主星 14 + 辅星 4 + 吉星 14 + 煞星 14 + 杂曜 3 = 49
const starTotal = chart.palaces.reduce((n, p) => n + p.stars.length, 0);
ok('星曜共 49 颗（含杂曜）', starTotal === 49, String(starTotal));

// 运限归属：流年给出所属大限与小限
const ln = chart.liunian[0];
ok('流年带大限归属', ln.daxian && ln.daxian.palace && ln.daxian.start <= ln.age && ln.age <= ln.daxian.end,
  JSON.stringify(ln.daxian));
ok('流年带小限归属', ln.xiaoxian && ln.xiaoxian.age === ((ln.age - 1) % 12) + 1, JSON.stringify(ln.xiaoxian));
ok('大限带三方四正', chart.palaces.every((p) => Array.isArray(p.sanfang) && p.sanfang.length === 4));

// 格局
ok('格局为数组', Array.isArray(chart.patterns));
ok('格局含 evidence', chart.patterns.every((p) => p.name && p.evidence));
console.log('  格局：', chart.patterns.map((p) => `${p.name}(${p.evidence})`).join('；') || '无');

// ── 昌曲专论 ────────────────────────────────────────────────
// 昌曲与丑未的关系由时支唯一决定，12 时辰逐一核对
const CQ_EXPECT = {
  0: '与丑未无关', 1: '丑三合（巳·酉）', 2: '夹未（午·申）', 3: '同宫于未',
  4: '夹未（午·申）', 5: '丑三合（巳·酉）', 6: '与丑未无关', 7: '未三合（亥·卯）',
  8: '夹丑（子·寅）', 9: '同宫于丑', 10: '夹丑（子·寅）', 11: '未三合（亥·卯）',
};
let cqOk = true;
const seenRel = {};
for (let hb = 0; hb < 24; hb += 2) {
  const c = buildZiwei({ year: 1990, month: 5, day: 12, hour: hb, minute: 30, gender: 'male' });
  const rel = c.changqu.relation;
  seenRel[hb / 2] = rel;
  if (rel !== CQ_EXPECT[hb / 2]) {
    cqOk = false;
    console.log(`  ${BR[hb / 2]}时 期望 ${CQ_EXPECT[hb / 2]} 实得 ${rel}`);
  }
}
ok('昌曲与丑未关系：12 时辰全对', cqOk);
ok('昌曲关系形态全覆盖（无关/三合/夹/同宫）', new Set(Object.values(seenRel)).size === 7,
  String(new Set(Object.values(seenRel)).size));

ok('昌曲字段完整', !!(chart.changqu.wenchang.branch && chart.changqu.wenqu.branch
  && typeof chart.changqu.inSoulSanfang === 'boolean'
  && ['清', '杂'].includes(chart.changqu.absorb.label)), JSON.stringify(chart.changqu.absorb));
ok('昌曲化忌时吸收面标杂', (() => {
  const anyJi = [chart.changqu.wenchang, chart.changqu.wenqu].some((x) => x.mutagen === '忌');
  return anyJi ? chart.changqu.absorb.label === '杂' : true;
})(), chart.changqu.absorb.reason);

// ── 铃昌陀武检测器：与独立重算一致 ────────────────────────────
const fix12 = (n) => ((n % 12) + 12) % 12;
let detectorOk = true;
let fired = 0;
for (let y = 1990; y < 1994; y++) {
  for (let mo = 1; mo <= 12; mo++) {
    for (let hr = 0; hr < 24; hr += 3) {
      const c = buildZiwei({ year: y, month: mo, day: 15, hour: hr, minute: 0, gender: 'male' });
      const pos = ['铃星', '文昌', '陀罗', '武曲'].map((n) => {
        const p = c.palaces.find((x) => x.stars.some((s) => s.name === n));
        return p ? BR.indexOf(p.branch) : -1;
      });
      let should = false;
      if (pos.every((b) => b >= 0)) {
        const si = BR.indexOf(c.soul.branch);
        const sf = [si, fix12(si + 4), fix12(si + 8), fix12(si + 6)];
        should = pos.every((b) => sf.includes(fix12(b)));
      }
      const has = c.patterns.some((p) => p.name === '铃昌陀武');
      if (has !== should) {
        detectorOk = false;
        console.log('  检测不一致', y, mo, hr, 'should=', should, 'has=', has);
      }
      if (has) fired++;
    }
  }
}
ok('铃昌陀武检测与独立重算一致（576 盘）', detectorOk);
console.log(`  其中命中铃昌陀武：${fired} 盘`);

console.log('\n--- 完整盘 ---');
for (const p of chart.palaces) {
  console.log(`${p.palace} ${p.branch} ${p.ganzhi} 大限${p.daxian.start}-${p.daxian.end} 小限${p.xiaoxian.age} | ${p.stars.map((s) => s.name + (s.mutagen ? '化' + s.mutagen : '')).join(' ')} | ${p.shensha.changsheng}/${p.shensha.boshi}/${p.shensha.jiangqian}/${p.shensha.suiqi}`);
}
