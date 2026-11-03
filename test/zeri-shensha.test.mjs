// H5 择日神煞层：以《协纪辨方书》卷十一原文为锚，锁住数据表、事项映射与逐日命中。
// 每个「宜/忌」数组都必须能逐字还原成原文那一行（只做异体字归一），改一个字就会红。
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { compute } from '../engine/index.js';
import {
  SHENSHA_LISTS, TASK_ENTRIES, computeDayShensha, taskShenshaHits, ZERI_SHENSHA_BASIS,
  XING_ALIAS, GRADE_RULES, GRADE_PING, GRADE_TEXT, GRADE_THRESHOLDS, DE_RULES,
  SHENSHA_GOOD, SHENSHA_BAD, gradeDay, ZERI_JUAN10_BASIS,
} from '../engine/zeri-shensha.js';
import { TASKS } from '../engine/zeri.js';

const SRC = JSON.parse(fs.readFileSync(new URL('./fixtures/zeri-sources.json', import.meta.url), 'utf8'));
const J10 = JSON.parse(fs.readFileSync(new URL('./fixtures/zeri-juan10.json', import.meta.url), 'utf8'));

let pass = 0;
const ok = (name, fn) => { fn(); pass++; console.log('PASS  ' + name); };
const eq = (a, b) => assert.deepStrictEqual(a, b);

const norm = (s) => {
  let out = s;
  for (const [from, to] of Object.entries(SRC.normalize)) out = out.split(from).join(to);
  return out;
};
const norm10 = (s) => {
  let out = String(s);
  for (const [from, to] of Object.entries({ ...SRC.normalize, ...J10.normalize })) out = out.split(from).join(to);
  return out;
};
// 比对古籍判词时去掉标点与校注方括号；只核字面，不核句读。
const flat = (s) => norm10(s).replace(/[，。；：、,.;:！？!?（）()【】\[\]「」\s]/g, '');

// 分词表就是已编码的全部名字；最长优先，避免「天德合」被拆成「天德」+「合」。
const DICT = [...new Set(Object.values(SHENSHA_LISTS).flatMap((e) => [...e.use, ...e.avoid]))]
  .sort((a, b) => b.length - a.length);
function tokenize(raw) {
  const out = [];
  let i = 0;
  while (i < raw.length) {
    const hit = DICT.find((n) => raw.startsWith(n, i));
    if (!hit) throw new Error(`原文分词失败：「${raw.slice(i, i + 8)}」`);
    out.push(hit);
    i += hit.length;
  }
  return out;
}

// ── 数据表：逐字对上原文 ─────────────────────────────────────
ok('卷十一原文逐条还原：宜/忌数组与原文完全一致', () => {
  eq(SRC.entries.length, Object.keys(SHENSHA_LISTS).length);
  for (const e of SRC.entries) {
    const encoded = SHENSHA_LISTS[e.name];
    assert.ok(encoded, '缺少条：' + e.name);
    eq(tokenize(norm(e.use)), encoded.use, `${e.name} 宜`);
    eq(tokenize(norm(e.avoid)), encoded.avoid, `${e.name} 忌`);
  }
});

ok('每条都有卷次与版本出处', () => {
  assert.ok(ZERI_SHENSHA_BASIS.text.includes('卷十一'));
  assert.ok(ZERI_SHENSHA_BASIS.text.includes('卷十'));
  assert.ok(ZERI_SHENSHA_BASIS.edition.includes('四库全书'));
  assert.ok(ZERI_SHENSHA_BASIS.volumes.includes('卷十一 用事'));
  assert.ok(ZERI_SHENSHA_BASIS.volumes.includes('卷十 宜忌'));
  assert.ok(ZERI_JUAN10_BASIS.edition.includes('四库全书'));
  assert.ok(ZERI_JUAN10_BASIS.corpusLines.includes('4853'));
  assert.ok(ZERI_SHENSHA_BASIS.unsupported.includes('土王用事后'));
});

// ── 卷十：六等判词逐字还原 ──────────────────────────────────
ok('卷十「六等」判词逐字还原：上/上次/中/中次/下/下下', () => {
  eq(GRADE_RULES.length, 6);
  eq(J10.grades.length, 6);
  eq(GRADE_TEXT, norm10(J10.gradeText));
  for (const expected of J10.grades) {
    const rule = GRADE_RULES.find((r) => r.key === expected.key);
    assert.ok(rule, '缺等第：' + expected.key);
    eq([rule.label, rule.withDe, rule.withoutDe], [expected.label, expected.withDe, expected.withoutDe]);
    eq(flat(rule.doctrine), flat(expected.doctrine));
    assert.ok(flat(J10.gradeText).includes(flat(expected.doctrine)), expected.key);
  }
  eq(GRADE_PING.doctrine, J10.ping.doctrine);
  eq([GRADE_PING.withDe, GRADE_PING.withoutDe], [J10.ping.withDe, J10.ping.withoutDe]);
});

ok('六等阈值明写为本仓校准，不冒充古籍常数', () => {
  eq(GRADE_THRESHOLDS.up, J10.calibration.up);
  eq(GRADE_THRESHOLDS.upCi, J10.calibration.upCi);
  eq(GRADE_THRESHOLDS.mid, J10.calibration.mid);
  eq(GRADE_THRESHOLDS.midCi, J10.calibration.midCi);
  eq(GRADE_THRESHOLDS.xiaXiaWeight, J10.calibration.xiaXiaWeight);
  assert.ok(ZERI_JUAN10_BASIS.thresholdsNote.includes('校准'));
  assert.ok(ZERI_JUAN10_BASIS.note.includes('未全量数字化'));
});

// ── 卷十：德神制化逐条对上按语 ─────────────────────────────
ok('德神制化条：类目与关键词逐条对上卷十按语', () => {
  eq(ZERI_JUAN10_BASIS.deRules.length, Object.keys(DE_RULES).length);
  eq(Object.keys(DE_RULES).length, J10.deRules.length);
  for (const expected of J10.deRules) {
    const rule = DE_RULES[expected.name];
    assert.ok(rule, '缺制化条：' + expected.name);
    eq(rule.cls, expected.cls);
    for (const fragment of expected.fragments) {
      assert.ok(flat(rule.quote).includes(flat(fragment)), `${expected.name} 缺「${fragment}」`);
    }
  }
});

ok('卷十一清单里的每个计分名都有吉/凶分档', () => {
  const xingNames = new Set(Object.values(XING_ALIAS).flat());
  const allNames = new Set(Object.values(SHENSHA_LISTS).flatMap((e) => [...e.use, ...e.avoid]));
  for (const name of allNames) {
    if (name === '朔望日' || name.startsWith('每月')) continue;
    if (ZERI_SHENSHA_BASIS.unsupported.includes(name)) continue;
    if (xingNames.has(name)) continue;
    if (name.endsWith('日')) continue;
    assert.ok(name in SHENSHA_GOOD || name in SHENSHA_BAD, `未分档：${name}`);
  }
});

// ── 事项映射：27 个事项一个不漏 ─────────────────────────────
ok('27 个择日事项全部映射到卷十一次目', () => {
  eq(Object.keys(TASK_ENTRIES).length, Object.keys(TASKS).length);
  for (const task of Object.keys(TASKS)) {
    const entries = TASK_ENTRIES[task];
    assert.ok(Array.isArray(entries) && entries.length, '未映射：' + task);
    for (const entry of entries) assert.ok(SHENSHA_LISTS[entry], `${task} → 未知条目 ${entry}`);
  }
});

// ── 逐日起算：用黄历的节气月与日干支 ───────────────────────
const dayOf = (date) => {
  const a = compute({ system: 'almanac', datetime: date });
  return computeDayShensha({
    monthBranch: a.ganzhi.month.slice(-1),
    dayGz: a.ganzhi.day,
    xing: a.zhiXing,
    lunarDay: a.lunar.day,
  });
};

ok('2026-10-29：戌月丙子 → 满日 + 民日 + 灾煞', () => {
  const d = dayOf('2026-10-29');
  eq(d.monthBranch, '戌');
  eq(d.dayGz, '丙子');
  eq(d.season, '秋');
  assert.ok(d.names.includes('满日'), d.names.join(','));
  assert.ok(d.names.includes('民日'), d.names.join(','));
  assert.ok(d.names.includes('灾煞'), d.names.join(','));
  const h = taskShenshaHits('开业', d);
  eq(h.use.xing.map((x) => x.xing), ['满']);
  eq(h.use.shensha, ['民日']);
  eq(h.avoid.shensha, ['灾煞']);
});

ok('2026-12-01：亥月己酉 → 开日 + 灾煞', () => {
  const d = dayOf('2026-12-01');
  eq(d.monthBranch, '亥');
  eq(d.dayGz, '己酉');
  const h = taskShenshaHits('开业', d);
  eq(h.use.xing.map((x) => x.xing), ['开']);
  eq(h.avoid.shensha, ['灾煞']);
});

ok('2026-12-15：子月癸亥 → 闭日 + 四穷（冬癸亥）', () => {
  const d = dayOf('2026-12-15');
  eq(d.monthBranch, '子');
  eq(d.dayGz, '癸亥');
  const h = taskShenshaHits('开业', d);
  eq(h.avoid.xing.map((x) => x.xing), ['闭']);
  eq(h.avoid.shensha, ['四穷']);
});

ok('2026-12-22：子月庚午 → 破日（大耗/月破）且冲鼠', () => {
  const d = dayOf('2026-12-22');
  eq(d.monthBranch, '子');
  eq(d.dayGz, '庚午');
  const h = taskShenshaHits('开业', d);
  eq(h.avoid.xing.length, 1);
  eq(h.avoid.xing[0].xing, '破');
  eq(h.avoid.xing[0].names, ['月破', '大耗']);
  const a = compute({ system: 'almanac', datetime: '2026-12-22' });
  eq(a.chong.shengXiao, '鼠');
});

// ── 条件神煞：天狗不是「凡满日」 ───────────────────────────
ok('天狗只在申月戌日：不是所有满日', () => {
  const hit = computeDayShensha({ monthBranch: '申', dayGz: '庚戌', xing: '满', lunarDay: 1 });
  assert.ok(hit.names.includes('天狗'));
  const miss = computeDayShensha({ monthBranch: '寅', dayGz: '庚戌', xing: '满', lunarDay: 1 });
  assert.equal(miss.names.includes('天狗'), false);
});

// ── 未实现起法：只列出，不计分 ─────────────────────────────
ok('土王用事后不在任何计分桶里，只进 unsupported', () => {
  const d = dayOf('2026-10-29');
  const h = taskShenshaHits('动土', d);
  assert.ok(h.unsupported.includes('土王用事后'), h.unsupported.join(','));
  const scored = [
    ...h.use.xing.map((x) => x.xing), ...h.use.shensha, ...h.use.day, ...h.use.lunar,
    ...h.avoid.xing.map((x) => x.xing), ...h.avoid.shensha, ...h.avoid.day, ...h.avoid.lunar,
  ];
  assert.equal(scored.includes('土王用事后'), false);
  eq([...new Set(h.unsupported)], h.unsupported);
});

// ── 输出契约：shenshaRef + 逐日 shensha + 评分锁 ────────────
ok('择日结果带 shenshaRef 与逐日 shensha', () => {
  const r = compute({ system: 'zeri', task: '开业', startDate: '2026-10-27', days: 3 });
  assert.ok(r.shenshaRef && r.shenshaRef.text.includes('卷十一'));
  assert.ok(r.shenshaRef.volumes.some((v) => v.includes('卷九')));
  assert.ok(r.shenshaRef.unsupported.includes('土王用事后'));
  for (const d of r.days) {
    assert.ok(d.shensha && d.shensha.xing, d.date);
    assert.ok(Array.isArray(d.shensha.names), d.date);
    assert.ok(d.shensha.use && d.shensha.avoid, d.date);
  }
  assert.ok(r.meta.scope.includes('卷十一'));
  assert.ok(r.meta.scope.includes('排序引导'));
  assert.ok(r.disclaimer.includes('卷十'));
});

ok('卷十评分锁：10-29 推荐(+4)、12-01 推荐(+3)、12-08 平平(0)、12-15 回避(-5)、12-22 排除', () => {
  const z = compute({ system: 'zeri', task: '开业', startDate: '2026-10-27', days: 3 });
  const d29 = z.days.find((d) => d.date === '2026-10-29');
  eq([d29.score, d29.verdict, d29.grade.key, d29.grade.ji, d29.grade.xiong], [4, '推荐', '上', 4, 0]);
  eq(d29.grade.decision, '从宜不从忌');
  eq(d29.favor, true); // 建除适配只作同分参考，不计入吉凶

  const c = compute({
    system: 'zeri', task: '开业',
    candidates: ['2026-12-01', '2026-12-08', '2026-12-15', '2026-12-22'], shengXiao: '鼠',
  });
  const by = Object.fromEntries(c.days.map((d) => [d.date, d]));
  eq([by['2026-12-01'].score, by['2026-12-01'].verdict, by['2026-12-01'].grade.key], [3, '推荐', '上']);
  eq([by['2026-12-08'].score, by['2026-12-08'].verdict, by['2026-12-08'].grade.key], [0, '平平', '平']);
  eq([by['2026-12-15'].score, by['2026-12-15'].verdict, by['2026-12-15'].grade.key], [-5, '回避', '下']);
  eq(by['2026-12-15'].grade.decision, '诸事皆忌');
  eq(by['2026-12-22'].excluded, true);
  eq(c.compare.best.date, '2026-12-01');
});

// ── 卷十：德神制化的上下车锁 ───────────────────────────────
ok('灾煞遇德可解；但求医正落在「止忌医疗」余忌里，仍忌', () => {
  const d = dayOf('2026-12-01');
  const h = taskShenshaHits('开业', d);
  const g = gradeDay(h, d);
  eq(g.withDe, true);
  eq(g.resolved.map((x) => x.name), ['灾煞']);
  eq(g.remains, []);
  eq(g.decision, '从宜不从忌');

  const h2 = taskShenshaHits('求医', d);
  const g2 = gradeDay(h2, d);
  eq(g2.forced.map((x) => x.name), ['灾煞']);
  eq(g2.decision, '从忌不从宜');
  eq(g2.remains.map((x) => x.name), ['灾煞']);

  // 只读结果的用户只会看到 verdictText：余忌必须点名，不能是 [object Object]。
  const r = compute({ system: 'zeri', task: '求医', candidates: ['2026-12-01', '2026-12-08'] });
  const day = r.days.find((x) => x.date === '2026-12-01');
  ok('余忌文本点名具体神煞', () => {
    assert.ok(day.verdict === '回避' && day.verdictText.includes('灾煞'), day.verdictText);
  });
  ok('余忌文本不漏对象', () => {
    assert.ok(!day.verdictText.includes('[object Object]'), day.verdictText);
  });
});

ok('月破：德神临此失力，不因遇德而解', () => {
  const base = { monthBranch: '子', xing: '破', names: ['破日', '月破', '大耗'] };
  const h = taskShenshaHits('开业', base);
  const without = gradeDay(h, base);
  eq(without.withDe, false);
  eq(without.decision, '诸事皆忌');
  assert.ok(without.remains.some((x) => x.name.includes('月破')), JSON.stringify(without.remains));

  const withDe = { ...base, names: [...base.names, '天德'] };
  const h2 = taskShenshaHits('开业', withDe);
  const g2 = gradeDay(h2, withDe);
  eq(g2.withDe, true);
  eq(g2.decision, '从忌不从宜');
  eq(g2.resolved, []);
  assert.ok(g2.remains.some((x) => x.name.includes('月破')), JSON.stringify(g2.remains));
});

ok('四穷：德神不能化解，无德时诸事皆忌', () => {
  const d = dayOf('2026-12-15');
  const h = taskShenshaHits('开业', d);
  const g = gradeDay(h, d);
  eq(g.withDe, false);
  assert.ok(g.remains.some((x) => x.name === '四穷'), JSON.stringify(g.remains));
  eq(g.decision, '诸事皆忌');
});

ok('月厌叠灾煞：虽遇德仍诸事皆忌', () => {
  const day = { monthBranch: '卯', xing: '定', names: ['月厌', '灾煞', '天德'] };
  const h = taskShenshaHits('开业', day);
  const g = gradeDay(h, day);
  eq(g.withDe, true);
  eq(g.allJiCombo, true);
  eq(g.key, '下下');
  eq(g.decision, '诸事皆忌');
});

ok('卷十结果随择日输出：grade 契约与口径', () => {
  const r = compute({ system: 'zeri', task: '开业', startDate: '2026-12-01', days: 1 });
  const d = r.days[0];
  for (const key of ['key', 'label', 'doctrine', 'decision', 'withDe', 'ji', 'xiong', 'resolved', 'remains', 'forced']) {
    assert.ok(key in d.grade, 'grade 缺 ' + key);
  }
  assert.ok(r.shenshaRef.juan10 && r.shenshaRef.juan10.text.includes('卷十'));
  eq(r.shenshaRef.juan10.grades.length, 6);
  assert.ok(r.shenshaRef.juan10.thresholdsNote.includes('校准'));
  assert.ok(r.meta.scope.includes('卷十'));
  assert.ok(r.disclaimer.includes('卷十'));
  assert.ok(r.disclaimer.includes('未逐格数字化'));
});

console.log(`\n${pass} PASS / 0 FAIL`);
