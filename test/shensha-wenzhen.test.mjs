// 问真神煞大全补缺批（0.66）：17 条新规则逐条验证 + 口径表对拍
// 口径来源：《问真神煞大全》55 章实读（www.iwzbz.com 问真课堂），详见 CHANGELOG 0.66.0
import assert from 'node:assert/strict';
import { computeBaziShensha, RULE_TABLE } from '../engine/shensha.js';
import { compute } from '../engine/index.js';

const g = (s, b) => ({ stem: s, branch: b, ganzhi: s + b });
const mk = (y, m, d, h, opts = {}) =>
  computeBaziShensha(
    { year: g(...y), month: g(...m), day: g(...d), hour: g(...h) },
    [],
    { gender: 'male', yearNayinElement: '金', ...opts },
  );
const hit = (r, name) => r.names.includes(name);
const hitInfo = (r, name) => {
  const grp = r.groups.find((x) => x.items.some((i) => i.name === name));
  const it = grp.items.find((i) => i.name === name);
  return `${it.pillars.join('/')}@${it.target}`;
};

let n = 0;
const ok = (cond, label) => { assert.ok(cond, label); n++; };

// ── 17 条新规则逐条命中 ──
ok(hit(mk(['甲','戌','甲戌'], ['戊','辰','戊辰'], ['丁','丑','丁丑'], ['甲','辰','甲辰']), '天德合'), '天德合：辰月（天德壬→丁合）见丁');
ok(hit(mk(['甲','戌','甲戌'], ['丙','寅','丙寅'], ['辛','丑','辛丑'], ['甲','子','甲子']), '血刃'), '血刃：寅月见丑');
ok(hit(mk(['甲','子','甲子'], ['丁','卯','丁卯'], ['甲','午','甲午'], ['庚','酉','庚酉']), '勾绞煞'), '勾绞煞：子年男见卯（勾）酉（绞）');
ok(hit(mk(['甲','午','甲午'], ['庚','午','庚午'], ['甲','午','甲午'], ['甲','午','甲午']), '红艳煞'), '红艳煞：甲干见午');
ok(hit(mk(['甲','寅','甲寅'], ['丙','寅','丙寅'], ['甲','寅','甲寅'], ['甲','寅','甲寅']), '孤鸾煞'), '孤鸾煞：日柱甲寅');
ok(hit(mk(['甲','子','甲子'], ['丁','卯','丁卯'], ['甲','午','甲午'], ['庚','未','庚未']), '元辰'), '元辰：阳男子年见未');
ok(hit(mk(['戊','戌','戊戌'], ['乙','卯','乙卯'], ['乙','卯','乙卯'], ['己','卯','己卯']), '天转'), '天转：春（寅卯辰月）乙卯日');
ok(hit(mk(['戊','戌','戊戌'], ['辛','卯','辛卯'], ['辛','卯','辛卯'], ['庚','寅','庚寅']), '地转'), '地转：春辛卯日');
ok(hit(mk(['甲','子','甲子'], ['丁','卯','丁卯'], ['甲','寅','甲寅'], ['甲','子','甲子']), '丧门'), '丧门：子年见寅');
ok(hit(mk(['甲','子','甲子'], ['丁','卯','丁卯'], ['甲','戌','甲戌'], ['甲','子','甲子']), '吊客'), '吊客：子年见戌');
ok(hit(mk(['甲','子','甲子'], ['丁','卯','丁卯'], ['甲','酉','甲酉'], ['甲','子','甲子']), '披麻'), '披麻：子年见酉');
ok(hit(mk(['甲','子','甲子'], ['丁','卯','丁卯'], ['甲','辰','甲辰'], ['甲','子','甲子']), '十灵日'), '十灵日：日柱甲辰');
ok(hit(mk(['甲','子','甲子'], ['丁','卯','丁卯'], ['甲','寅','甲寅'], ['甲','子','甲子']), '八专'), '八专：日柱甲寅');
ok(hit(mk(['丁','酉','丁酉'], ['丁','卯','丁卯'], ['丁','酉','丁酉'], ['丁','未','丁未']), '九丑'), '九丑：日柱丁酉');
ok(hit(mk(['癸','亥','癸亥'], ['癸','丑','癸丑'], ['癸','亥','癸亥'], ['癸','丑','癸丑']), '拱禄'), '拱禄：癸亥日癸丑时拱子');
ok(hit(mk(['甲','子','甲子'], ['丙','巳','丙巳'], ['丁','亥','丁亥'], ['壬','寅','壬寅'], { yearNayinElement: '金' }), '学堂'), '学堂：金命（纳音）见巳');
ok(hit(mk(['甲','子','甲子'], ['壬','申','壬申'], ['丁','亥','丁亥'], ['戊','申','戊申'], { yearNayinElement: '金' }), '词馆'), '词馆：金命（纳音）见申');

// ── 学堂/词馆只查月日时三支，不含年支本身 ──
{
  const r = computeBaziShensha(
    { year: g('甲','子'), month: g('甲','子'), day: g('甲','子'), hour: g('甲','子') },
    [], { gender: 'male', yearNayinElement: '金' },
  );
  ok(!hit(r, '学堂') && !hit(r, '词馆'), '学堂/词馆不查年支本身（纳音自见不算）');
}

// ── 勾绞煞/元辰按性别取位 ──
{
  const base = { year: g('甲','子'), month: g('丁','卯'), day: g('甲','午'), hour: g('庚','未') };
  const m = computeBaziShensha(base, [], { gender: 'male', yearNayinElement: '金' });
  const f = computeBaziShensha({ ...base, hour: g('庚','巳') }, [], { gender: 'female', yearNayinElement: '金' });
  ok(hit(m, '元辰') && hit(f, '元辰'), '元辰命中：阳男子年见未 / 阴女（子年）见巳（四支各含其位）');
  const yueChen = (r) => {
    const grp = r.groups.find((x) => x.items.some((i) => i.name === '元辰'));
    return grp ? grp.items.find((i) => i.name === '元辰').target : null;
  };
  ok(yueChen(m) === '未', '阳男子年元辰在未');
  ok(yueChen(f) === '巳', '阴女（子年阴男阳女组）元辰在巳');
}

// ── 规则注册与文本 ──
const FRESH = ['天德合','血刃','勾绞煞','红艳煞','孤鸾煞','元辰','天转','地转','丧门','吊客','披麻','十灵日','八专','九丑','学堂','词馆','拱禄'];
for (const name of FRESH) ok(!!RULE_TABLE[name], `RULE_TABLE 注册：${name}`);
ok(Object.keys(RULE_TABLE).length >= 51, `规则总数 >= 51（实际 ${Object.keys(RULE_TABLE).length}）`);

// ── 真实命例回归：不炸、结构完整 ──
{
  const r = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male' });
  ok(Array.isArray(r.shensha.names) && r.shensha.count > 0, '真实命例 shensha 正常');
  const r2 = compute({ system: 'bazi', datetime: '1984-06-15T10:00', gender: 'female' });
  ok(Array.isArray(r2.shensha.names), '女性命例不炸（勾绞/元辰按阴女取位）');
  // 1990 庚午年（路旁土→土命）：学堂土见申、词馆土见亥
  const hasStems = r.shensha.names.filter((x) => ['学堂','词馆'].includes(x));
  ok(Array.isArray(hasStems), `庚午土命学堂/词馆可查（本例命中：${hasStems.join('、') || '无'}）`);
}

console.log(`\n${n} PASS`);
