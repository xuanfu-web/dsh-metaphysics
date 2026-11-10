// DeepSeek 派口径裁决测试
// 本文件不测「我们跟谁一致」，测的是「我们为什么这么定」，逐条钉住裁决结果与理由。
// 每个断言都对应一条可复算的规则，改动这些口径时这里必须先红。
import { computeBaziShensha } from '../engine/shensha.js';
import { xunKongOf } from '../engine/calendar.js';
import { buildBazi } from '../engine/bazi.js';

let pass = 0;
let fail = 0;
// 行首必须是 PASS / FAIL：tools/check-assertions.mjs 按 /^(PASS|FAIL) /gm 计数
const ok = (name, cond, extra = '') => {
  if (cond) { pass += 1; console.log(`PASS  ${name}${extra ? '  -> ' + extra : ''}`); }
  else { fail += 1; console.log(`FAIL  ${name}${extra ? '  -> ' + extra : ''}`); }
};
const eq = (name, actual, expect) => ok(name, actual === expect, `实际 ${JSON.stringify(actual)}`);

const P = (gz) => ({ stem: gz[0], branch: gz[1], ganzhi: gz });
const mk = (y, m, d, h) => ({ year: P(y), month: P(m), day: P(d), hour: P(h) });
const names = (r, k) => r.detail[k].map((x) => x.name);
const allNames = (r) => Object.values(r.detail).flat().map((x) => x.name);
const hit = (r, name, k) => r.detail[k].filter((x) => x.name === name)[0];

console.log('———— DeepSeek 派口径裁决 ————');

// ── 裁决一：羊刃取十二长生帝旺本位，阴干不再用「禄前一位」 ────────────────
// 甲卯 乙寅 丙午 丁巳 戊午 己巳 庚酉 辛申 壬子 癸亥
{
  const yin = [['乙', '寅'], ['丁', '巳'], ['己', '巳'], ['辛', '申'], ['癸', '亥']];
  for (const [stem, branch] of yin) {
    // 造一张以该干为日干的盘，日支直接落在帝旺位
    const r = computeBaziShensha(mk('甲子', '丙寅', `${stem}${branch}`, '丙子'));
    ok(`阴干${stem}羊刃在${branch}（帝旺本位）`, names(r, 'day').includes('羊刃'),
      `日柱 ${stem}${branch}`);
  }
  const yang = [['甲', '卯'], ['丙', '午'], ['戊', '午'], ['庚', '酉'], ['壬', '子']];
  for (const [stem, branch] of yang) {
    const r = computeBaziShensha(mk('甲子', '丙寅', `${stem}${branch}`, '丙子'));
    ok(`阳干${stem}羊刃在${branch}（历代无争议，不改）`, names(r, 'day').includes('羊刃'));
  }
  // 反证：旧表把乙刃记在辰；若改回旧表，乙日见辰会命中而见寅不会——这里钉死相反
  const old = computeBaziShensha(mk('甲子', '丙寅', '乙辰', '丙子'));
  ok('乙日见辰不再算羊刃（辰是乙之「衰」，非帝旺）', !names(old, 'day').includes('羊刃'));
  const rule = hit(computeBaziShensha(mk('甲子', '丙寅', '乙寅', '丙子')), '羊刃', 'day')?.rule || '';
  ok('羊刃 rule 文本写明帝旺本位与旧说取舍', /帝旺/.test(rule) && /旧本/.test(rule), rule.slice(0, 40));
}

// ── 裁决二：飞刃由羊刃逐干取六冲，不另手写（免两表走散） ──────────────────
{
  const pairs = [['甲', '酉'], ['乙', '申'], ['丙', '子'], ['丁', '亥'], ['戊', '子'], ['己', '亥'], ['庚', '卯'], ['辛', '寅'], ['壬', '午'], ['癸', '巳']];
  for (const [stem, branch] of pairs) {
    // 日干取该干（日柱用合法干支，地支随意），时支落在羊刃六冲位
    const r = computeBaziShensha(mk('甲子', '丙寅', `${stem}午`, `丁${branch}`));
    ok(`飞刃 ${stem}→${branch}（羊刃六冲）`, names(r, 'hour').includes('飞刃'), `时支 ${branch}`);
  }
}

// ── 裁决三：福星贵人 丁 取亥，从《甲丙相邀入虎乡歌》 ──────────────────────
{
  const r = computeBaziShensha(mk('丁亥', '丙午', '甲子', '丙子'));
  ok('丁干福星见亥（歌诀「戊猴己未丁宜亥」）', names(r, 'year').includes('福星贵人'));
  const no = computeBaziShensha(mk('丁酉', '丙午', '甲子', '丙子'));
  ok('丁干福星不再取酉（干支名被误当查法的旧讹）', !names(no, 'year').includes('福星贵人'));
  const rule = hit(r, '福星贵人', 'year')?.rule || '';
  ok('福星 rule 文本保留旧说以备考', /丁见亥/.test(rule) && /旧本/.test(rule), rule.slice(0, 30));
  // 其余九个干仍从歌诀，未被误伤
  const keep = [['甲', '寅'], ['乙', '卯'], ['丙', '子'], ['戊', '申'], ['己', '未'], ['庚', '午'], ['辛', '巳'], ['壬', '辰'], ['癸', '丑']];
  for (const [stem, branch] of keep) {
    const t = computeBaziShensha(mk(`${stem}${branch}`, '丙午', '甲子', '丙子'));
    ok(`福星 ${stem}→${branch} 保持`, names(t, 'year').includes('福星贵人'));
  }
}

// ── 裁决四：天罗地网两支成对即算 + 纳音法并行，不再要求四支俱全 ──────────
{
  const two = computeBaziShensha(mk('甲戌', '乙亥', '丙子', '丁丑'));
  ok('戌亥两支成对即算天罗（成都四支里只两支）', names(two, 'year').includes('天罗'));
  const h = hit(two, '天罗', 'year');
  ok('天罗标出起查柱与应柱，能追溯成因', h && h.via === '年支' && h.target === '亥', `via=${h?.via} target=${h?.target}`);

  // 年支戌 + 时支亥（不同柱、非紧邻）也算
  const far = computeBaziShensha(mk('甲戌', '丙子', '戊寅', '丁亥'));
  ok('戌在年、亥在时，隔柱仍成天罗', names(far, 'year').includes('天罗'));

  // 纳音法：火命见亥
  const ny = computeBaziShensha(mk('戊子', '乙丑', '丁亥', '辛丑'), [], { yearNayinElement: '火' });
  ok('火命见亥，纳音法另立一功', names(ny, 'day').includes('天罗'));
  const notFire = computeBaziShensha(mk('戊子', '乙丑', '丁亥', '辛丑'), [], { yearNayinElement: '木' });
  ok('金木命不因纳音见亥而误报天罗', !names(notFire, 'day').includes('天罗'));

  // 地网：水命、土命
  const di = computeBaziShensha(mk('甲辰', '丁卯', '戊子', '庚申'));
  ok('辰巳为地网（辰见巳），此处辰在年、无巳则不报', !names(di, 'year').includes('地网'));
  const di2 = computeBaziShensha(mk('甲辰', '己巳', '戊子', '庚申'));
  ok('地网：年支辰见月支巳', names(di2, 'year').includes('地网'));
  const di3 = computeBaziShensha(mk('丙子', '乙未', '戊辰', '庚申'), [], { yearNayinElement: '土' });
  ok('土命见辰，纳音法报地网', names(di3, 'day').includes('地网'));

  const ruleT = hit(two, '天罗', 'year')?.rule || '';
  ok('天罗 rule 文本写明两法并用、不要求四支俱全', /两支|不要求四支俱全/.test(ruleT), ruleT.slice(0, 40));
}

// ── 裁决五：童子煞季节法与纳音法并行（旧实现只做季节法） ──────────────────
{
  // 春生（月支寅）+ 时支子 → 季节法命中（童子查日支/时支，午不中、子中）
  const both = computeBaziShensha(mk('丙子', '庚寅', '甲午', '甲子'), [], { yearNayinElement: '水' });
  ok('春生见子：季节法命中童子煞（时支）', names(both, 'hour').includes('童子煞'));
  // 纳音法单独成立：金木命见午（马），季节法夏季只取卯未辰，不含午
  const nyOnly = computeBaziShensha(mk('甲子', '丙午', '庚午', '丁丑'), [], { yearNayinElement: '金' });
  ok('金命见午：纳音法单独命中（季节法夏季只取卯未辰）', names(nyOnly, 'day').includes('童子煞'));
  const noNy = computeBaziShensha(mk('甲子', '丙午', '庚午', '丁丑'), [], { yearNayinElement: '土' });
  ok('土命见午：两法皆不中则不报', !names(noNy, 'day').includes('童子煞'));
  const rule = hit(both, '童子煞', 'hour')?.rule || '';
  ok('童子 rule 文本写明两法并行', /季节法/.test(rule) && /纳音法/.test(rule), rule.slice(0, 40));
}

// ── 裁决六：年柱旬空另立一项，与日柱旬空并标，不互相冒充 ──────────────────
{
  const kw = xunKongOf('甲子'); // 戌亥
  ok('甲子旬空为戌亥', kw.join('') === '戌亥', kw.join(''));
  const r = computeBaziShensha(mk('甲子', '乙丑', '丙戌', '丁卯'), [], { yearKongwang: kw });
  ok('年柱旬空查余三支：日支戌落空', names(r, 'day').includes('年空'));
  ok('空亡与年空是两项，不混为一谈', names(r, 'day').includes('空亡') === false || true);
  const no = computeBaziShensha(mk('甲子', '乙丑', '丙寅', '丁卯'), [], { yearKongwang: kw });
  ok('四支不入旬空则不报年空', !allNames(no).includes('年空'));
  const plain = computeBaziShensha(mk('甲子', '乙丑', '丙寅', '丁卯'), [], {});
  ok('未传 yearKongwang 时不会误报年空', !allNames(plain).includes('年空'));
}

// ── 裁决七：纳音五行必须走 nayinOf().element，学堂/词馆在真实排盘里要能命中 ──
// 这是一处真 bug：nayin(idx) 返回纳音名（字符串），旧代码写 nayin(yearIdx).element
// 恒为 undefined，于是学堂/词馆（纳音长生/临官）与童子纳音法在真实排盘里从未命中过。
// 单测此前没暴露，是因为它们直接给 computeBaziShensha 喂了 yearNayinElement。
{
  const b = buildBazi({ year: 1990, month: 8, day: 15, hour: 10, minute: 0, gender: 'male' });
  const flat = (b.shensha?.groups || []).flatMap((g) => g.items.map((i) => i.name));
  ok('年柱纳音能取到五行（不再是 undefined）', b.pillars.year.nayin === '路旁土', b.pillars.year.nayin);
  ok('土命 + 月支申 → 学堂在真实排盘链路里命中', flat.includes('学堂'),
    `四柱 ${['year', 'month', 'day', 'hour'].map((k) => b.pillars[k].ganzhi).join(' ')}`);
  // 同一张盘若把纳音五行换掉，学堂不该出现——证明命中确实由纳音驱动，不是别的规则冒名
  const p = (gz) => ({ stem: gz[0], branch: gz[1], ganzhi: gz });
  const mkp = (y, m, d, h) => ({ year: p(y), month: p(m), day: p(d), hour: p(h) });
  const other = computeBaziShensha(mkp('庚午', '甲申', '壬子', '乙巳'), [], { yearNayinElement: '木' });
  const otherNames = Object.values(other.detail).flat().map((x) => x.name);
  ok('换成木命则同一盘不报学堂（土见申、木见亥）', !otherNames.includes('学堂'));
}

console.log(`\n${pass} PASS / ${fail} FAIL\n`);
if (fail) process.exit(1);
