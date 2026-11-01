// 六爻应期规则（engine/yingqi.js）
//
// 依据：《增删卜易》各門類應期總注章第又二十六的 19 条条文。
// 这一组用例全部用「构造出来的盘」断言，不拿对拍集反推参数——
// 对拍（tools/backtest-yingqi.mjs）只用来报命中率，不用来调规则，
// 否则命中率就是自己喂出来的。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildLiuyao } from '../engine/liuyao.js';
import { yingqiState, yingqiPredict, yingqiSay, YINGQI_RULE_IDS, RULE_ORDER, NOT_IMPLEMENTED } from '../engine/yingqi.js';
import { ok, eq } from './_harness.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// 乾为天（初爻起：7 7 7 7 7 7），纳甲 子寅辰午申戌
const QIAN = [7, 7, 7, 7, 7, 7];
const build = (lines, day = '甲子', month = null) => {
  const r = buildLiuyao({ lines, dayGanZhi: { stem: day[0], branch: day[1] } });
  return { r, month };
};
const lineAt = (r, pos) => r.ben.lines.find((l) => l.position === pos);
const asUseGod = (line) => ({ position: line.position, branch: line.branch, element: line.element, moving: line.moving });

// ── 状态判定 ────────────────────────────────────────────────
{
  const { r } = build(QIAN, '甲子', '午');
  // 乾为天初爻子水，午月冲子 → 月破
  const st = yingqiState(lineAt(r, 1), null, { monthBranch: '午', dayBranch: '子', kong: [] });
  ok('子水遇午月判月破', st.monthPo === true, JSON.stringify(st.monthPo));
}
{
  const { r } = build(QIAN, '甲子', null);
  // 甲子日属甲子旬，戌亥空
  eq('甲子日旬空为戌亥', r.xunKong.join(''), '戌亥');
  const st = yingqiState(lineAt(r, 6), null, { monthBranch: '寅', dayBranch: '子', kong: r.xunKong });
  ok('上爻戌土判旬空', st.kongHit === true && st.branch === '戌', `${st.branch}/${st.kongHit}`);
}
{
  // 午火动化戌？不成立；用「寅化卯」构造化进：乾为天二爻寅木，动则变
  const lines = QIAN.slice();
  lines[1] = 9; // 二爻老阳 → 变爻为阴，仍同支？下方用 jinTuiOf 直判更直接
  const { r } = build(lines, '甲子');
  const st = yingqiState(lineAt(r, 2), null, { monthBranch: '寅', dayBranch: '子', kong: [] });
  ok('二爻为动爻', st.moving === true);
}
{
  const st = yingqiState({ branch: '申', element: '金', moving: true },
    { branch: '酉', element: '金' }, { monthBranch: '申', dayBranch: '子', kong: [] });
  eq('申动化酉判化进神', st.jinTui, '进');
  const st2 = yingqiState({ branch: '酉', element: '金', moving: true },
    { branch: '申', element: '金' }, { monthBranch: '申', dayBranch: '子', kong: [] });
  eq('酉化申判化退神', st2.jinTui, '退');
}
{
  // 火墓戌：午火临戌日 → 入墓
  const st = yingqiState({ branch: '午', element: '火', moving: false }, null,
    { monthBranch: '寅', dayBranch: '戌', kong: [] });
  ok('午火临戌日判入墓', st.ruMu === true && st.muBranch === '戌', `${st.ruMu}/${st.muBranch}`);
}
{
  // 子与丑合
  const st = yingqiState({ branch: '子', element: '水', moving: false }, null,
    { monthBranch: '寅', dayBranch: '丑', kong: [] });
  eq('子水遇丑日判六合', st.heWith.length, 1);
  eq('六合对象是日辰', st.heWith[0].with, '日辰');
}

// ── 规则取支 ────────────────────────────────────────────────
// 变爻要一起构造：化进/化退规则读的是 result.bian.lines 里同位的那一爻
const predictFor = (branch, element, moving, ctx, bianBranch = null) => {
  const line = { position: 1, branch, element, moving };
  const bian = bianBranch ? { lines: [{ position: 1, branch: bianBranch, element }] } : null;
  return yingqiPredict(
    { ben: { lines: [line] }, bian, xunKong: ctx.kong || [], dayGanZhi: { branch: ctx.dayBranch } },
    { position: 1, branch, element, moving },
    { monthBranch: ctx.monthBranch },
  );
};

{
  // 静而逢值逢冲：子水不动 → 子 / 午
  // 日辰不能取辰（辰为水墓），否则先触「入墓」而不是「静爻逢值逢冲」
  const p = predictFor('子', '水', false, { monthBranch: '卯', dayBranch: '巳', kong: [] });
  ok('静爻给逢值与逢冲', p.primary.id === 'jing-zhi-chong' && p.branches.join('') === '子午', `${p.primary.id}/${p.branches.join('')}`);
}
{
  // 月破喜填：子水遇午月 → 填实子、逢合丑
  // 日辰取子（比和）而不是辰：辰是水墓，会把「入墓」拉进来抢主位，测的就不是月破了
  const p = predictFor('子', '水', false, { monthBranch: '午', dayBranch: '子', kong: [] });
  ok('月破给填实与逢合', p.primary.id === 'yuepo-xi-tian' && p.branches.includes('子') && p.branches.includes('丑'), p.branches.join(''));
}
{
  // 旬空最爱填冲：子水旬空 → 子（填实）/ 午（冲空）
  // 同上，日辰避开辰（水墓），否则先触「入墓喜冲开」
  const p = predictFor('子', '水', false, { monthBranch: '寅', dayBranch: '子', kong: ['子'] });
  ok('旬空给填实与冲空', p.primary.id === 'xunkong-tian-chong' && p.branches.includes('子') && p.branches.includes('午'), p.branches.join(''));
}
{
  // 0.59.0：规则顺序必须等于原文罗列次序。旧代码几乎把原文倒过来排，
  // 还配了一句原文没有的「空 → 破 → 动 → 墓 → 太旺 → 衰绝 → 静」当依据——这句是编的。
  // 这里把原文 19 条的顺序钉死：改排序必须有原文依据，不能按命中率调。
  const ORIGINAL = [
    'jing-zhi-chong', 'dong-he-zhi', 'taiwang-mu-chong', 'shuaijue-sheng-wang',
    'rumu-chong-kai', 'liuhe-xiang-ji', 'yuepo-xi-tian', 'xunkong-tian-chong',
    'jixiang-keshen-shouke', 'xiong-keshen-fengsheng',
    'huajin-zhi-he', 'huatui-ji-zhi-chong', 'bianyao-dongyao',
    'shikong-yuanshen-zhi', 'shishuai-yuanshen-chong',
  ];
  ok('规则顺序照原文罗列', RULE_ORDER.join(',') === ORIGINAL.join(','), RULE_ORDER.join(','));
  ok('RULE_ORDER 与 RULE_IDS 同一批规则',
    [...RULE_ORDER].sort().join(',') === [...YINGQI_RULE_IDS].sort().join(','),
    RULE_ORDER.join(','));
  // 多条规则同时命中时，primary 必须是原文次序里靠前的那条（这里：入墓 5 < 月破 7）
  const p = predictFor('子', '水', false, { monthBranch: '午', dayBranch: '辰', kong: [] });
  ok('同时命中按原文次序取主规则', p.primary.id === 'rumu-chong-kai', p.primary.id);
}
{
  // 化进神逢值逢合：申动化酉 → 申 / 巳（巳合申），与原文例句一致
  const p = predictFor('申', '金', true, { monthBranch: '寅', dayBranch: '辰', kong: [] }, '酉');
  const r = p.rules.find((x) => x.id === 'huajin-zhi-he');
  ok('化进神给原支与合支', !!r && r.branches.join('') === '申巳', r ? r.branches.join('') : '无');
}
{
  // 化退神忌值忌冲：酉化申 → 申 / 寅
  const p = predictFor('酉', '金', true, { monthBranch: '寅', dayBranch: '辰', kong: [] }, '申');
  const r = p.rules.find((x) => x.id === 'huatui-ji-zhi-chong');
  ok('化退神给退支与冲支', !!r && r.branches.join('') === '申寅', r ? r.branches.join('') : '无');
}
{
  // 入墓喜冲开：午火临戌日 → 辰
  const p = predictFor('午', '火', false, { monthBranch: '寅', dayBranch: '戌', kong: [] });
  const r = p.rules.find((x) => x.id === 'rumu-chong-kai');
  ok('入墓给冲墓之支', !!r && r.branches.join('') === '辰', r ? r.branches.join('') : '无');
}
{
  // 太旺者逢墓逢冲：午火遇午月午日 → 戌（墓）/ 子（冲）
  const p = predictFor('午', '火', false, { monthBranch: '午', dayBranch: '午', kong: [] });
  const r = p.rules.find((x) => x.id === 'taiwang-mu-chong');
  ok('太旺给墓与冲', !!r && r.branches.includes('戌') && r.branches.includes('子'), r ? r.branches.join('') : '无');
}
{
  // 衰绝者遇生遇旺：金衰 → 土支（生）+ 金支（旺）
  const p = predictFor('申', '金', false, { monthBranch: '巳', dayBranch: '寅', kong: [] });
  const r = p.rules.find((x) => x.id === 'shuaijue-sheng-wang');
  ok('衰绝给生我之支与本气之支', !!r && r.branches.includes('申') && r.branches.includes('辰'), r ? r.branches.join('') : '无');
}

// ── 契约：不给公历日期、规则编号齐全 ────────────────────────
{
  const p = predictFor('子', '水', false, { monthBranch: '寅', dayBranch: '辰', kong: [] });
  const say = yingqiSay(p);
  ok('应期措辞只讲地支不讲日期', /留意/.test(say) && !/\d{4}[-年]/.test(say), say);
  ok('规则编号表覆盖已实现的规则', p.rules.every((r) => YINGQI_RULE_IDS.includes(r.id)), p.rules.map((r) => r.id).join(','));
  eq('未实现的条目如实列出', NOT_IMPLEMENTED.length, 4);
}

// ── 对拍集本身的自洽性（不校验命中率，只校验样本没坏） ──────
{
  const fix = JSON.parse(fs.readFileSync(path.join(ROOT, 'test', 'fixtures', 'zengshan-cases.json'), 'utf8'));
  ok('卦例数过 20 条门槛', fix.cases.length >= 20, String(fix.cases.length));
  ok('每条都用神落位与应验支', fix.cases.every((c) => c.useGod && c.useGod.position >= 1 && c.actual.length >= 1),
    `缺项 ${fix.cases.filter((c) => !c.useGod || !c.actual.length).length} 条`);
  ok('应验支都在十二支内', fix.cases.every((c) => c.actual.every((b) => '子丑寅卯辰巳午未申酉戌亥'.includes(b))));
  ok('排除项都写了理由', fix.excluded.every((e) => typeof e.reason === 'string' && e.reason.length > 4), `${fix.excluded.length} 条`);
  ok('样本来自《增删卜易》且写明方法', /增[删刪]卜易/.test(fix.meta.source) && /gen-zengshan-cases/.test(fix.meta.generator));
}
