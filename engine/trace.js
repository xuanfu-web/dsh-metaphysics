// A1 推导链：把排盘过程中真正用到的中间层摊开，每层给
// { field, rule, inputs, result, source }。
//
// 只读结果、不重算、不读时间与随机：trace 开着或关掉，盘面必须逐字节一致。
// 目前覆盖六爻（纳甲→六亲→世应→伏神→旺衰）、八字（旺衰分值、格局取用）、
// 紫微（格局命中条件）、奇门（盘面事实→用神落宫→门/星/干旺衰→宫位生克）
// 与大六壬（天地盘→四课→三传）；其余体系不产出 trace。
import { PATTERN_TONE } from './ziwei.js';
import { yongshenOf, yongshenStrength, fushenAccess } from './liuyao.js';
import { qimenYongshen } from './qimen-interpret.js';
import { GAN_JI_GONG } from './daliuren.js';

const SYSTEM_LABEL = { liuyao: '六爻', bazi: '八字', ziwei: '紫微', qimen: '奇门', daliuren: '大六壬' };

const text = (v, fallback = '—') => {
  if (v === undefined || v === null || v === '') return fallback;
  return String(v);
};
const list = (v, fallback = '—') => (Array.isArray(v) ? v.filter((x) => x !== undefined && x !== null && x !== '').join('、') : '') || fallback;
const pairs = (rows) => rows.map(([label, value]) => ({ label: String(label), value: text(value) }));
const step = (key, field, rule, inputs, result, source) => ({
  key,
  field,
  rule: text(rule, ''),
  inputs: pairs(inputs),
  result: text(result, ''),
  source: text(source, ''),
});

function lineAt(lines, position) {
  return (Array.isArray(lines) ? lines : []).find((l) => l.position === position) || null;
}

function liuyaoTrace(r, opts = {}) {
  const ben = r.ben && typeof r.ben === 'object' ? r.ben : {};
  const lines = Array.isArray(ben.lines) ? ben.lines : [];
  const bian = r.bian && typeof r.bian === 'object' ? r.bian : null;
  const moving = Array.isArray(r.cast && r.cast.movingPositions) ? r.cast.movingPositions : [];
  const ug = r.useGod && typeof r.useGod === 'object' ? r.useGod : null;
  const direction = (ug && ug.direction) || opts.direction || 'general';
  const us = r.useGodStrength && typeof r.useGodStrength === 'object' ? r.useGodStrength : null;
  const hs = r.hexStrength && typeof r.hexStrength === 'object' ? r.hexStrength : null;
  const fa = r.fushenAccess && typeof r.fushenAccess === 'object' ? r.fushenAccess : null;
  const shi = lineAt(lines, ben.shi);
  const ying = lineAt(lines, ben.ying);
  const month = (us && us.month) || (hs && hs.month) || null;
  const day = (us && us.day) || (hs && hs.day) || null;

  const najia = step(
    'najia',
    '纳甲',
    '京房纳甲：八经卦各配天干与三爻地支，内卦取前三爻、外卦取后三爻；动爻再成变卦。',
    [
      ['本卦', `${text(ben.name)}（上${text(ben.upper)}·下${text(ben.lower)}）`],
      ['动爻', moving.length ? `${moving.join('、')}爻` : '无（静卦）'],
      ['变卦', bian ? `${text(bian.name)}（上${text(bian.upper)}·下${text(bian.lower)}）` : '无'],
    ],
    lines.map((l) => `${l.position}爻 ${text(l.ganzhi)}${text(l.element)}`).join('｜'),
    '京房纳甲诀；engine/liuyao.js · NAJIA',
  );

  const liuqin = step(
    'liuqin',
    '六亲',
    '以卦宫五行为「我」：同我为兄弟、生我为父母、我生为子孙、克我为官鬼、我克为妻财。',
    [
      ['卦宫', `${text(ben.palace)}（${text(ben.palaceElement)}）`],
      ['爻五行', list([...new Set(lines.map((l) => l.element))])],
      ['日干起六神', `${text(r.dayGanZhi && r.dayGanZhi.stem)}日`],
    ],
    lines.map((l) => `${l.position}爻 ${text(l.liuqin)}（${text(l.element)}）`).join('｜'),
    '五行生克；engine/liuyao.js · liuqin()',
  );

  const shiying = step(
    'shiying',
    '世应',
    '八宫首卦世在上爻，一世至五世依次初至五爻，游魂四爻、归魂三爻；应爻与世相隔三位。',
    [
      ['卦名', `${text(ben.name)}（${text(ben.palace)}）`],
      ['世位', `${text(ben.shi)}爻`],
      ['应位', `${text(ben.ying)}爻`],
    ],
    `${text(ben.shi)}爻${shi ? ` ${text(shi.liuqin)}·${text(shi.ganzhi)}${text(shi.element)}` : ''}为世，`
      + `${text(ben.ying)}爻${ying ? ` ${text(ying.liuqin)}·${text(ying.ganzhi)}${text(ying.element)}` : ''}为应`,
    '八宫世应诀；engine/liuyao.js · SHI_POSITION',
  );

  let fushen;
  if (!ug || !ug.liuqin) {
    const why = direction === 'general'
      ? '未选询问方向（当前为综合），未取用神'
      : '未取到用神';
    fushen = step(
      'fushen',
      '伏神',
      '用神不上卦时，回本宫首卦的同位取伏神；飞伏之间只判生克与助压。',
      [['用神', ug && ug.ask ? ug.ask : '未取']],
      `${why}；本层不适用。`,
      'engine/liuyao.js · yongshenOf()',
    );
  } else if (ug.missing) {
    const hidden = (ug.fushen || []).map((f) => {
      const fei = f.fei ? `${text(f.fei.ganzhi)}${text(f.fei.element)}（${text(f.fei.liuqin)}）` : '—';
      return `${f.position}爻 ${text(f.ganzhi)}${text(f.element)}（${text(f.liuqin)}），飞神 ${fei}，${text(f.relation)}`;
    }).join('；');
    const access = fa && Array.isArray(fa.items)
      ? fa.items.map((i) => `${i.position}爻${text(i.verdict)}`).join('、')
      : '';
    fushen = step(
      'fushen',
      '伏神',
      '用神不上卦时，回本宫首卦的同位取伏神；飞伏之间只判生克，再叠月建日辰给出伏条件，不换算应期。',
      [
        ['用神', `${ug.liuqin}（不上卦）`],
        ['伏位', list((ug.fushen || []).map((f) => `${f.position}爻`))],
        ['月建 / 日辰', `${text(month && month.branch)} / ${text(day && day.branch)}`],
      ],
      `${hidden || '本卦无此六亲，首卦同位也未取到伏神'}${access ? `；出伏：${access}` : ''}`,
      '本宫首卦取伏；engine/liuyao.js · fushenAccess()',
    );
  } else {
    fushen = step(
      'fushen',
      '伏神',
      '用神已在卦上时不取伏神；伏神层只在本卦找不到用神时启用。',
      [
        ['用神', ug.liuqin],
        ['在位', list((ug.found || []).map((l) => `${l.position}爻`))],
      ],
      `用神 ${ug.liuqin} 已在 ${list((ug.found || []).map((l) => `${l.position}爻`))}，无需伏神。`,
      'engine/liuyao.js · yongshenOf()',
    );
  }

  const useStrength = us && Array.isArray(us.lines)
    ? us.lines.map((l) => `${l.position}爻${text(l.branch)}${text(l.element)}：月${text(l.monthState)}·${text(l.dayRelation)}`).join('；')
    : '';
  const wangsheng = step(
    'wangsheng',
    '旺衰',
    '月建主这一段的旺衰（旺相休囚死），日辰看当天的生克扶压；只给状态标签，不折分数、不单独断吉凶。',
    [
      ['月建', month ? `${text(month.branch)}（${text(month.element)}）` : '缺'],
      ['日辰', day ? `${text(day.branch)}（${text(day.element)}）` : '缺'],
      ['用神', ug && ug.liuqin ? ug.liuqin : '未取'],
      ['旬空', list(r.xunKong)],
    ],
    [
      useStrength ? `用神：${useStrength}${us.labels && us.labels.length ? `（${us.labels.join('、')}）` : ''}` : '用神：未取，只看全卦',
      hs && hs.labels && hs.labels.length ? `全卦：${hs.labels.join('、')}` : '',
    ].filter(Boolean).join('；'),
    '月建主旺衰、日辰司生克；engine/liuyao.js · yongshenStrength / hexagramStrength',
  );

  return [najia, liuqin, shiying, fushen, wangsheng];
}

function baziTrace(r) {
  const s = r.strength && typeof r.strength === 'object' ? r.strength : {};
  const parts = s.parts && typeof s.parts === 'object' ? s.parts : {};
  const season = parts.season && typeof parts.season === 'object' ? parts.season : {};
  const frame = r.frame && typeof r.frame === 'object' ? r.frame : {};
  const ys = frame.yongshen && typeof frame.yongshen === 'object' ? frame.yongshen : {};
  const primary = frame.primary && typeof frame.primary === 'object' ? frame.primary : null;
  const climate = r.climate && typeof r.climate === 'object' ? r.climate : {};
  const godGroups = frame.godStats && frame.godStats.groups ? frame.godStats.groups : {};

  const strength = step(
    'strength',
    '旺衰分值',
    text(s.method, '月令权重 + 地支藏干通根 + 天干帮扶，量化后分档。'),
    [
      ['日主', r.dayMaster ? `${text(r.dayMaster.stem)}（${text(r.dayMaster.element)}）` : '—'],
      ['月令', `${text(season.branch)}（${text(season.element)}·${text(season.word)}，权重 ${text(season.weight)}）`],
      ['通根', `${list(parts.roots)}（${text(parts.rootScore)}）`],
      ['合会折根', list(parts.structure, '无')],
      ['天干帮扶 / 耗泄', `帮 ${list(parts.helpers)}；泄 ${list(parts.drainers)}（${text(parts.helpScore)}）`],
      ['虚透', list(parts.virtualHelpers, '无')],
    ],
    `${text(s.level)}（${text(s.score)} 分）：${text(s.detail)}`,
    'engine/bazi.js · 旺衰量化（月令权重 + 藏干通根，三会/三合/六合折根 + 天干虚透减半）',
  );

  const primaryName = text(frame.primaryName || (primary && primary.name), '未取格局');
  const extraGeju = list((frame.geju || []).map((g) => g && g.name).filter((name) => name && name !== primaryName), '');
  const favor = list(ys.favor);
  const avoid = list(ys.avoid);
  const disputed = list((ys.disputed || []).map((d) => d && d.element), '');
  const tiaohou = ys.tiaohou && typeof ys.tiaohou === 'object' ? ys.tiaohou : climate;
  const need = tiaohou && tiaohou.need ? tiaohou.need : null;
  const resultParts = [
    primaryName === '未取格局' ? primaryName : `主格 ${primaryName}${extraGeju ? `；兼格 ${extraGeju}` : ''}`,
    `喜 ${favor}，忌 ${avoid}`,
    disputed ? `有争议 ${disputed}` : '',
    tiaohou && tiaohou.kind
      ? `调候 ${text(tiaohou.kind)}${need && need.element ? `，取 ${text(need.element)}` : ''}${tiaohou.avoidElement && tiaohou.avoidElement !== '—' ? `，忌 ${text(tiaohou.avoidElement)}` : ''}`
      : '',
  ].filter(Boolean).join('；');

  const geju = step(
    'geju',
    '格局取用',
    text(ys.method, '先按月令与透干取格，再以扶抑为主、调候校验取用。'),
    [
      ['月令格', primary ? `${text(primary.name)}（${text(primary.kind)}）` : '—'],
      ['取格依据', primary ? text(primary.evidence) : '—'],
      ['十神分量', Object.entries(godGroups).map(([k, v]) => `${k}${v}`).join(' / ') || '—'],
      ['调候', tiaohou && tiaohou.kind ? `${text(tiaohou.kind)}${need && need.element ? ` → ${text(need.element)}` : ''}` : '—'],
    ],
    `${resultParts}`,
    '子平真诠 · 月令取格；engine/geju.js · yongshenOf()',
  );

  const p = r.palaces && typeof r.palaces === 'object' ? r.palaces : {};
  const monthBranch = r.pillars && r.pillars.month ? text(r.pillars.month.branch) : '—';
  const hourBranch = r.pillars && r.pillars.hour ? text(r.pillars.hour.branch) : '—';
  const palaces = p.taiyuan ? step(
    'palaces',
    '胎元与命身宫',
    '胎元＝月干进一、月支进三；胎息＝日干五合、日支六合；命宫＝27 减生月与生时支、取模后加二；身宫＝11 加两支、取模后加二；干支并入六十甲子。',
    [
      ['生月 / 生时', `${monthBranch} / ${hourBranch}`],
      ['胎元', `${text(p.taiyuan.ganzhi)}（月干进一、月支进三）`],
      ['胎息', p.taixi ? `${text(p.taixi.ganzhi)}（日干五合、日支六合）` : '—'],
      ['命宫 / 身宫', `${text(p.minggong && p.minggong.ganzhi)} / ${text(p.shengong && p.shengong.ganzhi)}`],
    ],
    `胎元 ${text(p.taiyuan.ganzhi)}；${p.taixi ? `胎息 ${text(p.taixi.ganzhi)}；` : ''}命宫 ${text(p.minggong && p.minggong.ganzhi)}；身宫 ${text(p.shengong && p.shengong.ganzhi)}。四宫是辅助坐标，不单独折吉凶。`,
    'Tyme 四宫口径；engine/bazi.js · palaces',
  ) : null;

  return [strength, geju, ...(palaces ? [palaces] : [])];
}

function ziweiTrace(r) {
  const patterns = Array.isArray(r.patterns) ? r.patterns : [];
  const total = Object.keys(PATTERN_TONE).length;
  const soul = r.soul && typeof r.soul === 'object' ? r.soul : {};
  const bureau = r.bureau && typeof r.bureau === 'object' ? r.bureau : {};
  const hit = patterns.map((p) => `${text(p.name)}：${text(p.evidence)}`).join('；');
  return [step(
    'patterns',
    '格局命中条件',
    `已收录 ${total} 条格局，逐条校验命宫三方四正的星曜组合；只判结构成立与否，不折吉凶。`,
    [
      ['命宫', text(soul.ganzhi)],
      ['五行局', text(bureau.name)],
      ['命主 / 身主', `${text(r.lifeMaster)} / ${text(r.bodyMaster)}`],
      ['命中数', `${patterns.length} / ${total}`],
    ],
    patterns.length ? `命中 ${patterns.length} 条：${hit}` : '未命中已收录的格局条件（不表示命盘无结构，只是不在已收录清单内）。',
    '紫微斗数全书 · 格局条件；engine/ziwei.js · detectPatterns()',
  )];
}

function qimenTrace(r, opts = {}) {
  const palaces = Array.isArray(r.palaces) ? r.palaces : [];
  const month = r.month && typeof r.month === 'object' ? r.month : {};
  const states = r.states && typeof r.states === 'object' ? r.states : {};
  const cond = r.conditions && typeof r.conditions === 'object' ? r.conditions : {};
  const zf = r.zhiFu && typeof r.zhiFu === 'object' ? r.zhiFu : {};
  const zs = r.zhiShi && typeof r.zhiShi === 'object' ? r.zhiShi : {};
  const ma = r.ma && typeof r.ma === 'object' ? r.ma : {};
  const sz = r.siZhu && typeof r.siZhu === 'object' ? r.siZhu : {};

  const facts = step(
    'facts',
    '盘面事实',
    '时家转盘奇门：节气与三元定阴阳遁与局数，旬首定值符星与值使门；值符随时干落宫，八神按阴阳遁顺布或逆布。',
    [
      ['四柱', `${text(sz.year)} ${text(sz.month)} ${text(sz.day)} ${text(sz.time)}`],
      ['节气 / 局', `${text(r.jieqi)} · ${text(r.dun)}${text(r.juNumber)}局（${text(r.juMethod)}）`],
      ['旬首', text(r.xunshou)],
      ['值符 / 值使', `${text(zf.star)}落${text(zf.gong)}宫 / ${text(zs.gate)}落${text(zs.gong)}宫`],
      ['空亡 / 驿马', `${list(r.kongWang)} / ${text(ma.zhi)}${ma.gong ? `（${ma.gong}宫）` : ''}`],
    ],
    palaces.map((p) => `${p.palace}宫 天${text(p.tianPan)}·${text(p.star)}·${text(p.gate)}·${text(p.god)}`).join('｜') || '无九宫数据',
    'engine/qimen.js · buildQimen()',
  );

  const ys = qimenYongshen(r, opts.direction);
  const found = ys.rows.filter((x) => x.palace);
  const missing = ys.rows.filter((x) => !x.palace).map((x) => x.key);
  const primary = found[0] || null;
  const yongshen = step(
    'yongshen',
    '用神落宫',
    '按所问之事取用神：先取主用神、再取辅用神；以所落之宫的干、门、星、神整体取象，不单凭门名断事。',
    [
      ['询问方向', ys.label],
      ['主用神', primary ? `${primary.key} → ${primary.palace.palace}宫` : '未上盘'],
      ['辅用神', found.slice(1).map((x) => `${x.key} → ${x.palace.palace}宫`).join('；') || '无'],
      ['主用神落宫', primary ? `${text(primary.palace.star)}·${text(primary.palace.gate)}·${text(primary.palace.god)}·天盘${text(primary.palace.tianPan)}` : '—'],
    ],
    found.length
      ? `${ys.note}；${found.map((x) => `${x.key} 落 ${x.palace.palace}宫（${text(x.palace.star)}·${text(x.palace.gate)}·${text(x.palace.god)}）`).join('，')}`
        + (missing.length ? `；${missing.join('、')} 未上盘` : '')
      : `${ys.label}的用神均未上盘，属未决项；先按值符落宫参照。`,
    '奇门用神取象；engine/qimen-interpret.js · qimenYongshen()',
  );

  const order = ['旺', '相', '休', '囚', '死'];
  const stateLine = (g) => order.filter((k) => g && Array.isArray(g[k]) && g[k].length)
    .map((k) => `${k} ${g[k].join('、')}`).join('；') || '—';
  const wangshuai = step(
    'states',
    '门/星/干旺衰',
    '月令定五态：同月令之气为旺，月令所生为相，生月令为休，克月令为囚，月令所克为死；只判力量强弱，不合吉凶。',
    [
      ['月令', `${text(month.branch)}（${text(month.element)}）`],
      ['门', stateLine(states.gate)],
      ['星', stateLine(states.star)],
      ['天盘干', stateLine(states.stem)],
    ],
    `门：${stateLine(states.gate)}；星：${stateLine(states.star)}；天盘干：${stateLine(states.stem)}`,
    '月令五行五态；engine/qimen.js · groupByState()',
  );

  const forced = [];
  const controlled = [];
  const stemGroups = new Map();
  for (const p of palaces) {
    const rel = p.gateRelation || {};
    if (rel.type === '门迫') forced.push(`${p.palace}宫${text(p.gate)}`);
    else if (rel.type === '宫制门') controlled.push(`${p.palace}宫${text(p.gate)}`);
    const sr = p.stemRelation || {};
    if (p.tianPan && sr.type && sr.type !== 'unknown') {
      if (!stemGroups.has(sr.type)) stemGroups.set(sr.type, []);
      stemGroups.get(sr.type).push(`${p.palace}宫${p.tianPan}`);
    }
  }
  const stemOrder = ['干克宫', '宫克干', '干生宫', '宫生干', '比和'];
  const stemLine = stemOrder.filter((k) => stemGroups.has(k))
    .map((k) => `${k} ${stemGroups.get(k).join('、')}`).join('；') || '—';
  const jiXing = (cond.jiXing || []).map((x) => `${x.palace}宫${text(x.stem)}`);
  const ruMu = (cond.ruMu || []).map((x) => `${x.palace}宫${text(x.stem)}`);
  const liuYiRuMu = (cond.liuYiRuMu || []).map((x) => `${x.palace}宫${text(x.stem)}`);
  const ganying = palaces.filter((p) => p.ganYing)
    .map((p) => `${p.palace}宫 ${text(p.ganYing.tian)}加${text(p.ganYing.di)} ${text(p.ganYing.name)}`).join('；');
  const kongCells = palaces.filter((p) => p.kong).map((p) => `${p.palace}宫`);

  const relations = step(
    'relations',
    '宫位生克',
    '门与宫同宫论生克：门克宫为门迫，宫克门为宫制门；天盘干对宫另论生克；击刑、入墓、空亡只作宫位条件，不单独断吉凶。',
    [
      ['门迫', forced.join('、') || '无'],
      ['宫制门', controlled.join('、') || '无'],
      ['天盘干 × 宫', stemLine],
      ['击刑 / 三奇入墓 / 六仪入墓', `${jiXing.join('、') || '无'} / ${ruMu.join('、') || '无'} / ${liuYiRuMu.join('、') || '无'}`],
      ['十干克应', ganying || '—'],
      ['空亡', kongCells.join('、') || '无'],
    ],
    `门迫 ${forced.length} 处、宫制门 ${controlled.length} 处；天盘干与宫：${stemLine}；击刑 ${jiXing.length} 处、三奇入墓 ${ruMu.length} 处、六仪入墓 ${liuYiRuMu.length} 处、落空 ${kongCells.length} 宫。十干克应：${ganying || '—'}。`,
    '门迫/宫制门；engine/qimen.js · gatePalaceRelation() / stemPalaceRelation()；十干克应 engine/qimen-ganying.js',
  );

  return [facts, yongshen, wangshuai, relations];
}

function daliurenTrace(r) {
  const pan = Array.isArray(r.pan) ? r.pan : [];
  const ke = Array.isArray(r.siKe) ? r.siKe : [];
  const sc = r.sanChuan && typeof r.sanChuan === 'object' ? r.sanChuan : {};
  const yj = r.yueJiang && typeof r.yueJiang === 'object' ? r.yueJiang : {};
  const gr = r.guiren && typeof r.guiren === 'object' ? r.guiren : {};
  const geju = r.geJu && typeof r.geJu === 'object' ? r.geJu : {};
  const dayGz = text(r.dayGanZhi, '');

  const tiandipan = step(
    'tiandipan',
    '天地盘',
    '月将加时：中气换将，月将加于占时之上，顺布十二支成天盘；十二天将以日干昼夜贵人为起点，阳顺阴逆布于天盘。',
    [
      ['日干支', dayGz],
      ['时支', `${text(r.hourZhi)}时`],
      ['月将', `${text(yj.zhi)}（${text(yj.name)}）`],
      ['昼夜 / 贵人', `${text(r.dayNight)} / ${text(gr.zhi)}（${gr.reverse ? '逆布' : '顺布'}）`],
    ],
    pan.map((p) => `${p.di}→${p.tian}${p.jiang ? `（${text(p.jiang)}）` : ''}`).join('｜') || '无天地盘数据',
    '大六壬月将加时；engine/daliuren.js · tianDiPan()',
  );

  const sike = step(
    'sike',
    '四课',
    '四课：日干寄宫取第一课，日干上神再取第二课；日支取第三课，日支上神再取第四课；每课以上下五行论生克。',
    [
      ['日干 / 日支', `${text(dayGz[0])} / ${text(dayGz[1])}`],
      ['日干寄宫', text(GAN_JI_GONG[dayGz[0]])],
      ['四课', ke.map((k) => `${k.position}课 ${text(k.shang)}上${text(k.xia)}下`).join('；') || '—'],
    ],
    ke.map((k) => `${k.position}课 ${text(k.shang)}上${text(k.xia)}下${k.jiang ? `·${text(k.jiang)}` : ''}：${text(k.relation)}`).join('；') || '无四课数据',
    'engine/daliuren.js · siKe()',
  );

  const chuanLine = (c) => (c
    ? `${text(c.position)}${text(c.zhi)}（${text(c.liuQin)}${c.xunKong ? '·旬空' : ''}，${text(c.jiang)}${c.jiangFull ? `·${text(c.jiangFull)}` : ''}）`
    : '—');
  const sanchuan = step(
    'sanchuan',
    '三传',
    '三传：先取贼克（下贼上优先），无则比用、涉害、遥克、昴星，再八专、伏吟、返吟；初传既定，中末以天盘依次递取。',
    [
      ['课体', `${text(geju.name)}（${text(geju.detail)}）`],
      ['初传', chuanLine(sc.chu)],
      ['中传', chuanLine(sc.zhong)],
      ['末传', chuanLine(sc.mo)],
    ],
    `${chuanLine(sc.chu)} → ${chuanLine(sc.zhong)} → ${chuanLine(sc.mo)}`,
    'engine/daliuren.js · chuan()',
  );

  return [tiandipan, sike, sanchuan];
}


/**
 * @param {object} result compute 的结果
 * @param {{direction?:string, gender?:string, refresh?:boolean}} [opts]
 *   refresh=true 时按当前询问方向重算六爻的用神 / 旺衰 / 伏神层（只重建 trace，不改盘面）
 * @returns {Array<{key:string, field:string, rule:string, inputs:Array<{label:string,value:string}>, result:string, source:string}>|null}
 */
export function buildTrace(result, opts = {}) {
  if (!result || typeof result !== 'object') return null;
  let layers = null;
  if (result.system === 'liuyao') {
    let view = result;
    // 面板改了「询问方向」但不想重摇一卦：只按新方向重算用神相关三层
    if (opts.refresh === true) {
      try {
        const ug = yongshenOf(result, { direction: opts.direction, gender: opts.gender });
        const monthBranch = (result.hexStrength && result.hexStrength.month && result.hexStrength.month.branch)
          || (result.useGodStrength && result.useGodStrength.month && result.useGodStrength.month.branch)
          || null;
        const dayBranch = result.dayGanZhi ? result.dayGanZhi.branch : null;
        if (ug.liuqin) {
          const us = yongshenStrength(result, ug, { monthBranch, dayBranch });
          const fa = fushenAccess(result, ug, { monthBranch, dayBranch });
          view = { ...result, useGod: ug, useGodStrength: us || undefined, fushenAccess: fa || undefined };
        } else {
          view = { ...result, useGod: undefined, useGodStrength: undefined, fushenAccess: undefined };
        }
      } catch (e) {
        view = result;
      }
    }
    layers = liuyaoTrace(view, opts);
  } else if (result.system === 'bazi') layers = baziTrace(result);
  else if (result.system === 'ziwei') layers = ziweiTrace(result);
  else if (result.system === 'qimen') layers = qimenTrace(result, opts);
  else if (result.system === 'daliuren') layers = daliurenTrace(result);
  return layers && layers.length ? layers : null;
}

export { SYSTEM_LABEL };
