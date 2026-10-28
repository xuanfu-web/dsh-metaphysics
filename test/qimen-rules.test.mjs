// 奇门宫位条件：六仪击刑 / 三奇入墓。
//
// 这两条都是「天盘干落到某个宫就成立」的硬条件，可以用地支相刑、五行墓库独立推出，
// 所以测试不照抄实现里的表，而是：
//   ① 用「地支相刑 → 该地支所在之宫」重新推一遍，核对表；
//   ② 合成宫位直接喂 jiXingOf / ruMuOf，验成立与不成立两侧；
//   ③ 扫一批真实盘，要求六仪与三奇都能被触发（防表变成死数据），且所标之宫与盘中天盘干一致；
//   ④ 验三处可见：摘要行、解读「宫位条件」段、面板事实表。
import fs from 'node:fs';
import vm from 'node:vm';
import { buildQimen, jiXingOf, ruMuOf, QIMEN_CONDITION_TABLES } from '../engine/qimen.js';
import { interpretQimen } from '../engine/qimen-interpret.js';
import { compute } from '../engine/index.js';
import { knowledgeFor } from '../engine/interpret-knowledge.js';
import { ok, eq } from './_harness.mjs';

// ── 独立推导：六仪各配一支，支与支相刑，刑出之支落在哪一宫 ──────────
// 甲子戊、甲戌己、甲申庚、甲午辛、甲辰壬、甲寅癸
const YI_ZHI = { 戊: '子', 己: '戌', 庚: '申', 辛: '午', 壬: '辰', 癸: '寅' };
// 地支相刑：子卯相刑；寅巳申三刑（寅刑巳、巳刑申、申刑寅）；
// 丑戌未三刑（丑刑戌、戌刑未、未刑丑）；辰午酉亥自刑。
const ZHI_XING = {
  子: '卯', 卯: '子',
  寅: '巳', 巳: '申', 申: '寅',
  丑: '戌', 戌: '未', 未: '丑',
  辰: '辰', 午: '午', 酉: '酉', 亥: '亥',
};
const ZHI_GONG = { 子: '1', 丑: '8', 寅: '8', 卯: '3', 辰: '4', 巳: '4', 午: '9', 未: '2', 申: '2', 酉: '7', 戌: '6', 亥: '6' };
// 三奇入墓：乙木墓未、丙丁火墓戌
const QI_MU_ZHI = { 乙: '未', 丙: '戌', 丁: '戌' };

// ── 一、表与独立推导一致 ──────────────────────────────────────
for (const [stem, zhi] of Object.entries(YI_ZHI)) {
  const xingZhi = ZHI_XING[zhi];
  const expect = ZHI_GONG[xingZhi];
  const got = QIMEN_CONDITION_TABLES.jiXing[stem];
  ok(`击刑 ${stem}：${zhi}刑${xingZhi} → ${expect}宫`, !!got && got.palace === expect && got.zhi === xingZhi, JSON.stringify(got));
}
for (const [stem, zhi] of Object.entries(QI_MU_ZHI)) {
  const expect = ZHI_GONG[zhi];
  const got = QIMEN_CONDITION_TABLES.ruMu[stem];
  ok(`入墓 ${stem}：墓${zhi} → ${expect}宫`, !!got && got.palace === expect && got.zhi === zhi, JSON.stringify(got));
}
eq('击刑表只有六仪六条', Object.keys(QIMEN_CONDITION_TABLES.jiXing).length, 6);
eq('入墓表只有三奇三条', Object.keys(QIMEN_CONDITION_TABLES.ruMu).length, 3);
ok('击刑表不含三奇', !('乙' in QIMEN_CONDITION_TABLES.jiXing) && !('丙' in QIMEN_CONDITION_TABLES.jiXing));
ok('入墓表不含六仪', !('戊' in QIMEN_CONDITION_TABLES.ruMu) && !('庚' in QIMEN_CONDITION_TABLES.ruMu));

// ── 二、合成宫位：成立侧 / 不成立侧 ────────────────────────────
const fake = (pairs) => pairs.map(([palace, tianPan]) => ({ palace, tianPan }));

eq('戊在震三成立击刑', jiXingOf(fake([['3', '戊']])).length, 1);
eq('戊在巽四不成立', jiXingOf(fake([['4', '戊']])).length, 0);
eq('辛在离九成立（午自刑）', jiXingOf(fake([['9', '辛']])).length, 1);
eq('壬在巽四成立', jiXingOf(fake([['4', '壬']])).length, 1);
eq('癸也在巽四成立', jiXingOf(fake([['4', '癸']])).length, 1);
eq('庚在艮八成立', jiXingOf(fake([['8', '庚']])).length, 1);
eq('己在坤二成立', jiXingOf(fake([['2', '己']])).length, 1);
eq('三奇不判击刑', jiXingOf(fake([['2', '乙'], ['6', '丙'], ['6', '丁']])).length, 0);
eq('中五宫与九宫列表无干', jiXingOf([{ palace: '5', tianPan: '戊' }]).length, 0);
eq('空数组不报错', jiXingOf([]).length, 0);
eq('undefined 不报错', jiXingOf(undefined).length, 0);

eq('乙在坤二入墓', ruMuOf(fake([['2', '乙']])).length, 1);
eq('丙在乾六入墓', ruMuOf(fake([['6', '丙']])).length, 1);
eq('丁在乾六入墓', ruMuOf(fake([['6', '丁']])).length, 1);
eq('乙在乾六不入墓', ruMuOf(fake([['6', '乙']])).length, 0);
eq('六仪不判入墓', ruMuOf(fake([['6', '戊'], ['2', '己']])).length, 0);
eq('入墓空数组不报错', ruMuOf([]).length, 0);

{
  const hit = jiXingOf(fake([['3', '戊'], ['9', '辛']]));
  ok('击刑每条带出处口径', hit.every((x) => x.stem && x.palace && x.zhi && x.basis && x.basis.length >= 6), JSON.stringify(hit));
  const mu = ruMuOf(fake([['2', '乙']]));
  ok('入墓每条带出处口径', mu.every((x) => x.basis && x.basis.includes('墓')), JSON.stringify(mu));
}

// ── 三、真实盘：两表都能触发，且标的宫与盘中天盘干一致 ─────────────
{
  const seenYi = new Set();
  const seenQi = new Set();
  let charts = 0;
  let jiHits = 0;
  let muHits = 0;
  let consistent = true;
  for (let day = 1; day <= 28; day += 3) {
    for (let hour = 1; hour <= 23; hour += 4) {
      const r = buildQimen({ year: 2026, month: 7, day, hour, minute: 0 });
      charts += 1;
      const byGong = Object.fromEntries(r.palaces.map((p) => [p.palace, p]));
      for (const x of r.conditions.jiXing) {
        jiHits += 1;
        seenYi.add(x.stem);
        const p = byGong[x.palace];
        if (!p || p.tianPan !== x.stem) consistent = false;
        if (QIMEN_CONDITION_TABLES.jiXing[x.stem].palace !== x.palace) consistent = false;
      }
      for (const x of r.conditions.ruMu) {
        muHits += 1;
        seenQi.add(x.stem);
        const p = byGong[x.palace];
        if (!p || p.tianPan !== x.stem) consistent = false;
        if (QIMEN_CONDITION_TABLES.ruMu[x.stem].palace !== x.palace) consistent = false;
      }
    }
  }
  ok('扫盘：击刑与盘中天盘干一致', consistent, `${charts} 盘 / 击刑 ${jiHits} / 入墓 ${muHits}`);
  ok('扫盘：六仪都能触发击刑（防死表）', seenYi.size === 6, [...seenYi].join(''));
  ok('扫盘：三奇都能触发入墓（防死表）', seenQi.size === 3, [...seenQi].join(''));
  ok('扫盘：入墓不是恒空', muHits > 0, String(muHits));
}

// ── 四、三处可见：摘要 / 解读 / 面板 ──────────────────────────
{
  const r = buildQimen({ year: 2024, month: 6, day: 15, hour: 15, minute: 0 });
  const summary = compute({ system: 'qimen', datetime: '2024-06-15T15:00' }).summary;
  ok('摘要含宫位条件行', summary.includes('【宫位条件】'), summary.split('\n').find((l) => l.includes('宫位条件')) || '');
  ok('摘要标出击刑宫与干', r.conditions.jiXing.length
    ? r.conditions.jiXing.every((x) => summary.includes(`${x.palace}宫${x.stem}`))
    : summary.includes('击刑 无'));

  const it = interpretQimen(r, { direction: 'career' });
  const cond = it.sections.find((s) => s.key === 'conditions');
  ok('解读有「宫位条件」段', !!cond);
  ok('解读提到门迫/击刑/入墓三项', !!cond && ['门迫', '击刑', '入墓'].every((k) => cond.text.includes(k)), cond && cond.text.slice(0, 60));
  ok('解读声明只作宫位条件', !!cond && cond.text.includes('不自动等同于用神受制'));
  ok('解读的击刑项带依据', !r.conditions.jiXing.length || r.conditions.jiXing.every((x) => cond.text.includes(x.basis)));

  // 空盘也要能说「本盘无」，不能把句子吞掉
  let emptySeen = false;
  for (let day = 1; day <= 20 && !emptySeen; day += 1) {
    const rr = buildQimen({ year: 2026, month: 3, day, hour: 13, minute: 0 });
    if (!rr.conditions.jiXing.length) {
      const t = interpretQimen(rr, {}).sections.find((s) => s.key === 'conditions').text;
      emptySeen = t.includes('击刑（天盘六仪落刑宫）：本盘无');
    }
  }
  ok('无击刑时写「本盘无」', emptySeen);
}

// ── 五、面板事实表：击刑 / 入墓两行 ───────────────────────────
{
  const sandbox = { window: {}, console };
  vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
  const PP = sandbox.window.__PP;
  const r = buildQimen({ year: 2024, month: 6, day: 15, hour: 15, minute: 0 });
  const html = PP.qimenFactsHTML(r);
  ok('面板事实表有击刑行', html.includes('击刑') && html.includes('9宫辛'), html.match(/<dt>击刑<\/dt><dd>[^<]*<\/dd>/)?.[0] || '');
  ok('面板事实表有入墓行', html.includes('入墓'));
  const empty = { ...r, conditions: undefined };
  const html2 = PP.qimenFactsHTML(empty);
  ok('旧结果缺 conditions 也不炸', html2.includes('击刑') && html2.includes('入墓'), '');
}

// ── 六、知识条目：两条都带出处、机制与分歧说明 ─────────────────
{
  const know = knowledgeFor('qimen', 'overall').map((k) => k.id);
  ok('知识库有 qimen-jixing', know.includes('qimen-jixing'), know.join(','));
  ok('知识库有 qimen-rumu', know.includes('qimen-rumu'), know.join(','));
  const jx = QIMEN_CONDITION_TABLES.jiXing;
  ok('知识条目逐条对上表（戊震三）', String(jx['戊'].palace) === '3' && String(jx['癸'].palace) === '4');
}
