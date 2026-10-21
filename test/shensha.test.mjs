// 神煞引擎校验：规则覆盖、双查法、专论、向后兼容
import { buildBazi } from '../engine/bazi.js';
import { computeBaziShensha, RULE_TABLE, CATEGORY_ORDER, PILLAR_KEYS } from '../engine/shensha.js';

const ok = (label, cond, extra = '') =>
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${label}${extra ? '  -> ' + extra : ''}`);

const P = (gz) => ({ stem: gz[0], branch: gz[1], ganzhi: gz });
const mk = (y, m, d, h) => ({ year: P(y), month: P(m), day: P(d), hour: P(h) });
const names = (res, key) => res.detail[key].map((x) => x.name);

// ── 1. 规则覆盖 ──────────────────────────────────────────────
const allNames = Object.keys(RULE_TABLE);
ok('规则数 ≥ 40', allNames.length >= 40, String(allNames.length));
ok('七类齐全', CATEGORY_ORDER.every((c) => allNames.some((n) => RULE_TABLE[n].cat === c)),
  CATEGORY_ORDER.map((c) => `${c}${allNames.filter((n) => RULE_TABLE[n].cat === c).length}`).join(' '));
ok('每条规则都有查法文本', allNames.every((n) => RULE_TABLE[n].rule && RULE_TABLE[n].rule.length > 6));
ok('七类之外无遗漏', allNames.every((n) => CATEGORY_ORDER.includes(RULE_TABLE[n].cat)));

// ── 2. 合成盘：甲子 丙寅 甲午 辛未 ──────────────────────────
const a = computeBaziShensha(mk('甲子', '丙寅', '甲午', '辛未'));
ok('月德贵人（月支定丙，月干丙）', names(a, 'month').includes('月德贵人'));
ok('月德合（丙之五合辛，时干辛）', names(a, 'hour').includes('月德合'));
ok('天乙贵人双查（日干甲→丑未，时支未）', names(a, 'hour').includes('天乙贵人'));
ok('禄神（日干甲禄寅，月支寅）', names(a, 'month').includes('禄神'));
ok('德秀贵人（寅月德丙丁，月干丙）', names(a, 'month').includes('德秀贵人'));
ok('孤辰（亥子丑年见寅，月支寅）', names(a, 'month').includes('孤辰'));
ok('寡宿未误报（亥子丑见戌，无戌）', !names(a, 'year').includes('寡宿'));
ok('将星（年支子→子，年柱子）', names(a, 'year').includes('将星'));
const tianyiHour = a.detail.hour.find((x) => x.name === '天乙贵人');
ok('天乙贵人带查法来源与目标', !!tianyiHour && tianyiHour.via === '年干、日干' && tianyiHour.target.includes('未'),
  tianyiHour && `${tianyiHour.via}｜${tianyiHour.target}`);
ok('detail 每项都带 rule', PILLAR_KEYS.every((k) => a.detail[k].every((x) => !!x.rule)));

// ── 3. 三合星双查（年支、日支）──────────────────────────────
const b = computeBaziShensha(mk('庚申', '戊子', '丙午', '己亥'));
const jx = b.groups.find((g) => g.cat === '事业').items.find((i) => i.name === '将星');
ok('将星年支日支双查（年支申→子落月柱，日支午→午落日柱）', !!jx && ['month', 'day'].every((k) => jx.pillars.includes(k)),
  jx && jx.pillars.join(','));
ok('将星合并两个查法来源', !!jx && jx.via.includes('年支') && jx.via.includes('日支'), jx && jx.via);

// ── 4. 日柱专论 ─────────────────────────────────────────────
const c = computeBaziShensha(mk('甲子', '丙寅', '庚辰', '丙子'));
ok('魁罡（日柱庚辰）', names(c, 'day').includes('魁罡'));
ok('飞刃（日干庚→卯）未误报', !names(c, 'day').includes('飞刃'));
const c2 = computeBaziShensha(mk('甲子', '丙寅', '丙子', '丙子'));
ok('阴差阳错（日柱丙子）', names(c2, 'day').includes('阴差阳错'));
ok('天赦日（春季戊寅日）', names(computeBaziShensha(mk('甲子', '丙寅', '戊寅', '甲子')), 'day').includes('天赦日'));

// ── 5. 童子煞只查日支、时支，不看月支 ──────────────────────
const d = computeBaziShensha(mk('庚午', '丙寅', '戊辰', '甲子'));
ok('童子煞不落在月柱（月支本身不作命宫位）', !names(d, 'month').includes('童子煞'));
ok('童子煞落在时柱（春生见子）', names(d, 'hour').includes('童子煞'));

// ── 6. 天罗地网、三奇贵人（四支/三柱成局）──────────────────
const e = computeBaziShensha(mk('甲戌', '乙亥', '丙子', '丁丑'));
ok('天罗（戌亥俱全）', names(e, 'year').includes('天罗') && names(e, 'month').includes('天罗'));
ok('地网未误报（无辰巳俱全）', !names(e, 'day').includes('地网'));
const f = computeBaziShensha(mk('甲子', '戊辰', '庚午', '辛未'));
const sanqi = f.groups.find((g) => g.cat === '格局').items.find((i) => i.name === '三奇贵人');
ok('三奇贵人（甲戊庚依序相连）', !!sanqi && sanqi.target === '甲戊庚' && sanqi.pillars.length === 3,
  sanqi && `${sanqi.target}｜${sanqi.pillars.join('')}`);

// ── 7. 与 buildBazi 集成、向后兼容 ──────────────────────────
const r1 = buildBazi({ year: 1990, month: 5, day: 12, hour: 14, minute: 30, gender: 'female', trueSolar: false });
ok('四柱不变', ['庚午', '辛巳', '丁丑', '丁未'].join('') === ['year', 'month', 'day', 'hour'].map((k) => r1.pillars[k].ganzhi).join(''));
ok('神煞数量显著增加', r1.shensha.count >= 12, `${r1.shensha.count} 见`);
ok('pillars.shensha 仍是字符串数组', PILLAR_KEYS.every((k) => r1.pillars[k].shensha.every((s) => typeof s === 'string')));
ok('shensha 与 shenshaDetail 对齐', PILLAR_KEYS.every((k) => r1.pillars[k].shensha.length === r1.pillars[k].shenshaDetail.length));
ok('count = 各柱命中之和', r1.shensha.count === PILLAR_KEYS.reduce((n, k) => n + r1.pillars[k].shensha.length, 0),
  String(r1.shensha.count));
ok('分组按类别有序', r1.shensha.groups.every((g, i, arr) => i === 0 || CATEGORY_ORDER.indexOf(arr[i - 1].cat) <= CATEGORY_ORDER.indexOf(g.cat)));

const r2 = buildBazi({ year: 2000, month: 1, day: 1, hour: 0, minute: 0, gender: 'male', trueSolar: false });
ok('空亡仍在月柱（子）', r2.pillars.month.shensha.includes('空亡'));
ok('空亡仍在时柱（子）', r2.pillars.hour.shensha.includes('空亡'));
ok('羊刃（日干戊→午，日支午）', r2.pillars.day.shensha.includes('羊刃'));
ok('红鸾按年支取（卯年→子），月支子命中', r2.pillars.month.shensha.includes('红鸾'), r2.pillars.month.branch);
ok('结果可 JSON 序列化', (() => { JSON.stringify(r1); return true; })());
