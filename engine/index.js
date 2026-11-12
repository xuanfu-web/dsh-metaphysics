// 统一入口：解析参数、分派到各体系、生成可读摘要
import { buildBazi } from './bazi.js';
import { buildLiuyao, tossLines, bodyLabels, yongshenOf, yongshenStrength, fushenAccess, hexagramStrength, jinTuiPower, yingqiWindow } from './liuyao.js';
import { buildZiwei, BRIGHTNESS, flowOf, asOfParts, ZIWEI_SCHOOL_DEFAULTS } from './ziwei.js';
import { drawTarot, SPREAD_KEYS } from './tarot.js';
import { buildMeihua } from './meihua.js';
import { buildDaliuren } from './daliuren.js';
import { buildHepan, tripleOf } from './hepan.js';
import { buildZiweiHepan } from './ziwei-hepan.js';
import { buildQimen, buildSnapshot } from './qimen.js';
import { geocodeAddress, resolveAddress } from './geo.js';
import { toJDN, ganzhiName, dayGanzhiIndex } from './calendar.js';
import { bool, canonicalFlags, canonicalNumbers } from './bool.js';
import { randomOf, isSeed } from './random.js';
import { encodeHandle, decodeHandle, resolveHandle, pruneForeignKeys, ownedKeys } from './handle.js';
import { askLink, parseAskLink, formOf, restNote, askPackages } from './bridge.js';
import { parseRevision, displayValue } from './revise.js';
import { interpret, DIRECTIONS, DIRECTION_DEFAULT } from './interpret.js';
import { followup, askPrompt } from './followup.js';
import { crossCheck, crossText, crossSection } from './crosscheck.js';
import { pastSignals, verifyFit } from './verify.js';
import { rectifyBirth } from './rectify.js';
import { buildAlmanac } from './almanac.js';
import { buildZeri } from './zeri.js';
import { buildChenggu } from './chenggu.js';
import { buildXiaoliuren } from './xiaoliuren.js';
import { buildStar } from './star.js';
import { buildNumerology } from './numerology.js';
import { buildMbti, mbtiPaper } from './mbti.js';
import { buildConstitution, constitutionPaper } from './constitution.js';
import { buildWuyunliuqi } from './wuyunliuqi.js';
import { buildTaiyi } from './taiyi.js';
import { buildConvert } from './convert.js';
import { classicsFor, classicsText, suiyunClassicOf, classicOf, CLASSIC_BOOKS } from './classics.js';
import { diffObjects, summarize, sortDiffs, labelOf, rootOf, categoryOf, formatValue, CALIBER_SWITCHES, viewRows } from './diff.js';
import { canonicalJson, fingerprintOf } from './fingerprint.js';
import { buildTrend } from './trend.js';
import { buildFengshui } from './fengshui.js';
import { buildName } from './name.js';
import { buildTrace, traceMarkdown, SYSTEM_LABEL } from './trace.js';
import { fail } from './fail.js';
import { assertCivil, MIN_YEAR, MAX_YEAR } from './validate.js';
import { parseDateTime, daysInMonth } from './datetime.js';

export { interpret, DIRECTIONS, DIRECTION_DEFAULT, BRIGHTNESS, flowOf };
export { parseDateTime };

const pad = (n) => String(n).padStart(2, '0');

const GENDERS = ['male', 'female'];

/**
 * 时刻会改变盘面、且允许只给日期的体系：那时按 00:00 排，必须当场说清。
 * 黄历 / 择日 / 公农历转换只以「日」为输入，缺时刻是正常用法；
 * 六爻取日辰与月建定六神、旬空，不看钟点；梅花数字起卦也不看时间——都在名单外。
 * 称骨与小六壬缺时辰直接报错（时辰不可代填），同样不需要这句提示。
 */
const HOUR_MATTERS = new Set(['bazi', 'ziwei', 'hepan', 'trend', 'meihua', 'daliuren', 'qimen', 'name']);
/** 缺时刻时那句提示里要说清的「按什么排」，以及该怎么补（hourUnknown 只对八字/趋势有定义） */
const NO_TIME_NOTE = {
  bazi: { what: '时柱', advice: '知道大概几点就补上，不知道就传 hourUnknown:true（只排三柱）' },
  ziwei: { what: '命宫与生时星曜', advice: '紫微排不出三柱，必须补上出生时刻' },
  hepan: { what: '两侧时柱', advice: '两侧都要出生时刻，合盘才有意义' },
  trend: { what: '时柱与起运', advice: '知道大概几点就补上，不知道就传 hourUnknown:true（按日估算）' },
  meihua: { what: '起卦时刻', advice: '时间起卦要用真实起念时刻，请补 HH:mm' },
  daliuren: { what: '起课时辰（月将与贵人）', advice: '请补起课时刻 HH:mm' },
  qimen: { what: '起局时辰（旬首与局数）', advice: '请补起局时刻 HH:mm' },
  name: { what: '时柱', advice: '请补出生时刻 HH:mm' },
};

/**
 * 性别是必填项：它决定大运/大限的顺逆，缺省按某一方排等于给出一张错盘。
 * 之前用 `=== 'female' ? 'female' : 'male'` 兜底，静默把未填性别的人按男命排。
 */
function requireGender(value, who = '') {
  if (GENDERS.includes(value)) return value;
  const got = value === undefined || value === null || value === '' ? '（未提供）' : `「${value}」`;
  throw fail('E_INPUT', `${who ? who + '的' : ''}gender 必须是 male 或 female${got}；性别决定大运/大限顺逆，不能靠默认值`);
}

const ZIWEI_SCHOOL_KEYS = [
  'brightnessSchool', 'gengYearSihua', 'tianmaSchool', 'tiankongSchool', 'jiekongSchool',
  'kuiyueSchool', 'tianshiTianshang', 'changshengSchool', 'lateZishi', 'shenzhuSchool',
  'mingzhuSchool', 'zuoyaoSchool', 'liunianSihua', 'sihuaVariant',
  'jieluSchool', 'suipoSchool',
];

/** 紫微流派参数原样透传；非法值交给引擎按默认口径回退 */
function ziweiSchoolArgs(args) {
  const out = {};
  for (const key of ZIWEI_SCHOOL_KEYS) {
    if (args[key] !== undefined) out[key] = args[key];
  }
  if (args.schools && typeof args.schools === 'object') out.schools = args.schools;
  return out;
}

function baziText(r) {
  const P = r.pillars;
  const line = (label, p) =>
    `${label}：${p.ganzhi}　${p.stemTenGod ? `十神 ${p.stemTenGod}　` : ''}藏干 ${p.hidden.map((h) => `${h.stem}(${h.tenGod})`).join(' ')}　纳音 ${p.nayin}`
    + `　地势 ${p.dishi}　自坐 ${p.zizuo}　空亡 ${p.kongwang.join('')}`
    + (p.shensha && p.shensha.length ? `　神煞 ${p.shensha.join('、')}` : '');
  const wuxing = Object.entries(r.wuxing).map(([k, v]) => `${k}${v}`).join(' ');
  // 命宫/身宫由「生月 + 生时支」定：时柱未知时它们是 null，不能拼字符串，也不能拿占位值顶上
  const palaces = r.palaces
    ? `【胎元】${r.palaces.taiyuan.ganzhi}　胎息 ${r.palaces.taixi ? r.palaces.taixi.ganzhi : '—'}`
      + (r.palaces.minggong ? `　命宫 ${r.palaces.minggong.ganzhi}` : '　命宫 时柱暂缺，不排')
      + (r.palaces.shengong ? `　身宫 ${r.palaces.shengong.ganzhi}` : '　身宫 时柱暂缺，不排')
    : '';
  const dayun = r.dayun.list.slice(0, 8)
    .map((d) => `${d.startAge}岁 ${d.ganzhi}(${d.stemTenGod})${d.luck ? `·${d.luck.tier}` : ''}${d.relations && d.relations.length ? `[${d.relations.join('')}]` : ''}`).join('　');
  // 交运时刻（日/时辰级）：旧结果没有 dayun.jiao，缺省就只说「起运」，不硬凑
  const jiao = r.dayun.jiao && r.dayun.jiao.at
    ? `；交运 ${r.dayun.jiao.at}（${r.dayun.jiao.frame}，距${r.dayun.jiao.from.name} ${r.dayun.jiao.spanDays} 天，三日折一年）`
    : '';
  // 起运岁精确值（截断到年月日时）：上面 startAge 是四舍五入到月的口语写法，两者同源、并列给出。
  // 第三方对拍里截断到月 23/23 全中、四舍五入只有 15/23——差别就在这串日时上，所以必须看得见。
  const sae = r.dayun.startAgeExact;
  const startAgeExactLine = sae && Number.isInteger(sae.years)
    ? `起运岁（精确）：${sae.years} 年 ${sae.months} 个月 ${sae.days} 天 ${sae.hours} 小时`
      + `（${sae.caliber}；上面「${r.dayun.startAge.years}岁${r.dayun.startAge.months}个月」是四舍五入到月，两者同源）`
    : '';
  // 阈值 20 分钟：与 NAOJ 历要项对拍实测，本引擎节气最多偏早 13.5 分钟（Meeus 低精度上限约 14 分钟）
  const near = r.jieqi.nearBoundaryMinutes < 20
    ? `\n⚠ 出生时刻距「节」仅 ${r.jieqi.nearBoundaryMinutes} 分钟，而节气时刻本身有最多约 14 分钟的偏差，月柱与年柱建议人工复核。`
    : '';
  const SHORT = { year: '年', month: '月', day: '日', hour: '时' };
  const shenshaLine = r.shensha && r.shensha.groups && r.shensha.groups.length
    ? `神煞（${r.shensha.count} 见）：` + r.shensha.groups.map((g) =>
      `${g.cat}｜` + g.items.map((i) => `${i.name}(${i.pillars.map((k) => SHORT[k]).join('')})`).join('、')).join('；')
    : '神煞：—';
  const ry = r.renyuan;
  const rySrc = classicOf('smt-renyuan');
  const renyuanLine = ry
    ? `人元：${ry.month}月第${ry.day}日，${ry.active}${ry.activeElement}司权（${ry.segments.map((s) => `${s.stem}${s.from}–${s.to}`).join(' ')}）${ry.beyond ? '；已过 30 日表，按本气算' : ''}${rySrc ? `｜原文见《${CLASSIC_BOOKS[rySrc.book].name}·${rySrc.chapter}》` : ''}`
    : '';
  const ysd = (r.frame && r.frame.yongshen && r.frame.yongshen.disputed) || [];
  const disText = ysd.length
    ? `　有争议：${ysd.map((d) => `${d.element}（${d.favorRole}；${d.climate}盘调候忌${d.element}）`).join('、')}`
    : '';
  const disEls = new Set(ysd.map((d) => d.element));
  const ysn = (r.frame && r.frame.yongshen && r.frame.yongshen.neutral) || [];
  const neuText = ysn.length
    ? `　中性偏忌：${ysn.map((n) => `${n.element} ${n.weight} 分`).join('、')}（近零，不作实忌）`
    : '';
  const gejuLine = r.frame ? [
    `格局：${r.frame.primary ? `${r.frame.primary.name}（${r.frame.primary.evidence}）` : '—'}`,
    `　　　${r.frame.geju.map((g) => `${g.name}[${g.kind}${g.status ? `·${g.status}` : ''}]`).join('　')}`,
    `用神：喜${r.frame.yongshen.favor.join('')}（${r.frame.yongshen.favorTenGods.join('、')}）　忌${r.frame.yongshen.avoid.join('')}（${r.frame.yongshen.avoidTenGods.join('、')}）${disText}${neuText}　${r.frame.yongshen.method}`,
    `　　　${r.frame.yongshen.detail}`,
    `寒暖：${r.climate ? `${r.climate.label}（${(r.climate.evidence || []).join('、')}）${r.climate.need ? `　调候取${r.climate.need.stem}${r.climate.need.element}　忌${r.climate.avoidElement}${disEls.has(r.climate.avoidElement) ? '（有争议）' : ''}` : ''}` : '—'}` +
    (r.frame.yongshen.qt ? `　穷通：${r.frame.yongshen.qt.month}${r.frame.yongshen.qt.stem}取${r.frame.yongshen.qt.yong.join('、')}（首取${r.frame.yongshen.qt.primary}）` : ''),
    `十神权重：${Object.entries(r.frame.godStats.groups).map(([k, v]) => `${k}${v}`).join(' ')}`,
  ] : [];
  // 八大地支结构（炳祥课静态口径）：算得出但没有输出通道的字段等于没做，这里补一行摘要。
  // 只报「哪几支成党、异类是哪支、静态从格概率」，与上面旺衰分是两套并列口径，不互相覆盖。
  // 三柱模式第四支是正午占位：照实标「占位」，不把它说成实有的时支。
  const bs = r.strength && r.strength.branchStructure;
  const bsCols = bs ? bs.branches.map((b) => `${b.label}${b.branch}${b.camp}${bs.placeholderHour && b.key === 'hour' ? '·占位' : ''}`).join('、') : '';
  // 注意 bs.word 本身已含三柱说明（bazi.js 的 hourUnknown 分支会改写它），这里不重复追加
  const bsTail = bs && !bs.placeholderHour && !bs.complete ? '　时柱暂缺，只列三支' : '';
  const branchStructureLine = bs
    ? `地支结构：${bs.placeholderHour ? '三支＋占位' : '四支'} ${bs.code}（${bsCols}）　`
      + `${bs.word}${bs.congProb != null ? `（静态从格 ${bs.congRange}）` : ''}${bsTail}`
    : '';
  // 暗合：另列不并入合冲刑害。只出现一对时按课里口径「可忽略」，所以照实写出来但不升级为断语。
  const anhe = (r.relations && Array.isArray(r.relations.anhe)) ? r.relations.anhe : [];
  const anheLine = anhe.length
    ? `暗合：${anhe.join('　')}（另列，不并入上面的合冲刑害；${anhe.length === 1 ? '只一对，按口径可忽略' : `共 ${anhe.length} 对`}）`
    : '';
  const hourMissing = r.hourUnknown === true || !P.hour;
  return [
    `【四柱】${P.year.ganzhi} ${P.month.ganzhi} ${P.day.ganzhi}${P.hour ? ` ${P.hour.ganzhi}` : '（时柱暂缺）'}`,
    `日主：${r.dayMaster.stem}${r.dayMaster.element}（${r.dayMaster.yinYang}）　空亡：${r.kongwang.join('')}`,
    line('年柱', P.year), line('月柱', P.month), line('日柱', P.day),
    ...(hourMissing ? [] : [line('时柱', P.hour)]),
    `五行：${wuxing}`,
    ...(palaces ? [palaces] : []),
    `日主强弱：${r.strength.level}（${r.strength.score}）　${r.strength.detail}`,
    ...(branchStructureLine ? [branchStructureLine] : []),
    ...gejuLine,
    `天干关系：${(r.relations && r.relations.stems.length) ? r.relations.stems.join('　') : '—'}`,
    `地支关系：${(r.relations && r.relations.branches.length) ? r.relations.branches.join('　') : '—'}`,
    ...(anheLine ? [anheLine] : []),
    shenshaLine,
    `真太阳时：${r.solarTime.trueSolarText}（${r.input.geo ? r.input.geo.note + '；' : ''}${r.solarTime.note}）　晚子时：${r.input.lateZi ? '23:00 后算次日' : '23:00 后仍算当日'}`,
    `节气：上一节 ${r.jieqi.previous.name} ${r.jieqi.previous.time}　下一节 ${r.jieqi.next.name} ${r.jieqi.next.time}`,
    ...(renyuanLine ? [renyuanLine] : []),
    `大运：${r.dayun.rule}（${r.dayun.direction}），${r.dayun.startAge.years}岁${r.dayun.startAge.months}个月起运${jiao}`,
    ...(startAgeExactLine ? [startAgeExactLine] : []),
    `　${dayun}`,
    `流年：${r.liunian.slice(0, 10).map((l) => `${l.year}${l.ganzhi}(${l.stemTenGod})${l.luck ? `·${l.luck.tier}` : ''}`).join('　')}`,
    (() => {
      const hits = r.liunian.filter((l) => l.suiyun && l.suiyun.signals && l.suiyun.signals.length);
      if (!hits.length) return '岁运提示：近十年无岁运并临、运年反吟或大运/流年伏吟、反吟（只标干支，不判吉凶）';
      const label = (s) => `${s.type}${(s.type.startsWith('流年') || s.type.startsWith('大运')) && s.target ? `(${s.target})` : ''}`;
      const e = suiyunClassicOf(r);
      const src = e ? `｜古籍见《${CLASSIC_BOOKS[e.book].name}·${e.chapter}》` : '';
      return '岁运提示（只标干支变动，不判吉凶）：' + hits
        .map((l) => `${l.year}${l.ganzhi} ${l.suiyun.signals.map(label).join('/')}`).join('；') + src;
    })(),
    '（格局、用神、行运吉凶为扶抑＋简化调候的量化提示，非断语。）',
  ].join('\n') + near;
}

function ziweiText(r) {
  // 闰月：日期按「闰X月」原样写；换算过起盘月时再附一句，免得把 21 日写成「闰5月21日」
  const rawMonth = r.lunar.monthRaw || r.lunar.month;
  const lunarText = `${r.lunar.year}年${r.lunar.isLeap ? `闰${rawMonth}` : r.lunar.month}月${r.lunar.day}日`
    + (r.lunar.isLeap && r.lunar.month !== rawMonth ? `（按${r.lunar.month}月起盘）` : '');
  // 只在显式改动流派时补一行，默认盘不增加噪音
  const schoolLine = (() => {
    if (!r.schools) return '';
    const labels = {
      brightnessSchool: '亮度', gengYearSihua: '庚干四化', tianmaSchool: '天马', tiankongSchool: '天空',
      jiekongSchool: '截空', kuiyueSchool: '魁钺', tianshiTianshang: '天伤天使',
      changshengSchool: '长生', lateZishi: '晚子时', shenzhuSchool: '身主', mingzhuSchool: '命主取法',
      zuoyaoSchool: '杂曜全表', liunianSihua: '流年四化取干', sihuaVariant: '十干四化变体',
      jieluSchool: '截路空亡', suipoSchool: '岁前十二神',
    };
    const diff = Object.entries(labels)
      .filter(([key]) => r.schools[key] && r.schools[key] !== ZIWEI_SCHOOL_DEFAULTS[key])
      .map(([key, label]) => `${label} ${r.schools[key]}`);
    return diff.length ? `【流派】${diff.join('　')}` : '';
  })();
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
  // 命宫四化飞星：宫干化出的星落在哪一宫，一路串下去成环为止
  const flyLine = (() => {
    const fc = r.flyChains;
    if (!fc) return '';
    const one = (t) => {
      const ch = fc[t];
      if (!ch || !ch.steps.length) return '';
      return `${t}：${ch.path.join('→')}${ch.closed ? '（成环）' : ''}`;
    };
    const text = ['禄', '权', '科', '忌'].map(one).filter(Boolean).join('　');
    return text ? `【命宫飞星】${text}` : '';
  })();
  // 三方四正一起飞：四宫的 16 条飞化按落宫归堆，只看会聚
  const flyCompositeLine = (() => {
    const fc = r.flyComposite;
    if (!fc || !Array.isArray(fc.sources) || !fc.sources.length) return '';
    const groups = fc.labels.length ? fc.labels.join(' · ') : '无同宫会聚';
    const detail = ['禄', '权', '科', '忌'].map((t) => {
      const list = ((fc.byType && fc.byType[t]) || []).filter((x) => !x.self);
      const tos = [...new Set(list.map((x) => String(x.to).replace(/宫$/, '')))];
      return tos.length ? `${t}→${tos.join('/')}` : '';
    }).filter(Boolean).join('　');
    return `【三方四正飞化】${fc.sanfang.join('·')}：${groups}${detail ? `　${detail}` : ''}`;
  })();
  return [
    `【农历】${lunarText}（月首 ${r.lunar.monthStart}）　时支：${r.hourBranch}　年干支：${r.yearGanzhi}`,
    `【时刻】${r.solarTime ? `${r.solarTime.civilText} → 真太阳时 ${r.solarTime.trueSolarText}${r.input.geo ? '（' + r.input.geo.note + '）' : ''}` : ''}`,
    `【命宫】${r.soul.branch}（${r.soul.ganzhi}·${r.soul.nayin}）　【身宫】${r.body.branch}（落${r.body.lands}）　【五行局】${r.bureau.name}`,
    `【紫微】${r.ziwei}　【天府】${r.tianfu}　【命主】${r.lifeMaster}　【身主】${r.bodyMaster}${r.bodyMasterNote ? `（${r.bodyMasterSchool === 'common' ? '子午皆火星' : '子铃午火'}）` : ''}${r.lifeMasterNote ? `（${r.lifeMasterNote}）` : ''}`,
    `【大限】${r.daxian.rule}，${r.daxian.startAge}岁起　【小限】${r.xiaoxianRule.direction}`,
    schoolLine,
    `【昌曲】文昌${r.changqu.wenchang.branch}（${r.changqu.wenchang.palace}${r.changqu.wenchang.mutagen ? '·化' + r.changqu.wenchang.mutagen : ''}）　文曲${r.changqu.wenqu.branch}（${r.changqu.wenqu.palace}${r.changqu.wenqu.mutagen ? '·化' + r.changqu.wenqu.mutagen : ''}）`,
    `　　　${r.changqu.relation}　入命三方：${r.changqu.inSoulSanfang ? '是' : '否'}　吸收面：${r.changqu.absorb.label}（${r.changqu.absorb.reason}）`,
    flyLine,
    flyCompositeLine,
    '十二宫：',
    ...rows,
    '大限（按起运年龄排序，前 8 限，宫干四化落宫）：',
    ...daxian,
    '流年（前 6 年，完整 12 年在结构化数据里）：',
    ...liunian,
    `【格局】${patterns}`,
    r.patternSummary ? `【结构统计】吉格 ${r.patternSummary.good.length}、中性 ${r.patternSummary.neutral.length}、忌格 ${r.patternSummary.bad.length}${r.patternSummary.broken.length ? `、破格 ${r.patternSummary.broken.length}（${r.patternSummary.broken.join('、')}）` : ''}；${r.patternSummary.note}` : '',
    r.lunar.note ? `注：${r.lunar.note}` : '',
  ].filter(Boolean).join('\n');
}

const STATE_ORDER = ['旺', '相', '休', '囚', '死'];
/** 门/星的月令五态，按 旺相休囚死 顺序拼成一行 */
function stateLine(r) {
  const st = r.states;
  const mo = r.month;
  if (!st || !mo) return '无月令数据';
  const fmt = (g) => STATE_ORDER.filter((k) => g && Array.isArray(g[k]) && g[k].length)
    .map((k) => `${k} ${g[k].join('/')}`).join('　');
  return `月令 ${mo.branch}（${mo.element}）　门 ${fmt(st.gate) || '—'}　星 ${fmt(st.star) || '—'}　干 ${fmt(st.stem) || '—'}`;
}

function qimenText(r) {
  const P = r.palaces;
  const cell = (x) => `${x.palace}宫 ${x.star || '—'}／${x.gate || '—'}／${x.god || '—'}${x.kong ? ' 空' : ''}${x.ma ? ' 马' : ''}`;
  return [
    `【四柱】${r.siZhu.year} ${r.siZhu.month} ${r.siZhu.day} ${r.siZhu.time}`,
    `【局数】${r.ju}　节气 ${r.jieqi}（${r.jieqiTime}）`,
    `【值符】${r.zhiFu.star}（${r.zhiFu.gong}宫）　【值使】${r.zhiShi.gate}（${r.zhiShi.gong}宫）　旬首 ${r.xunshou}`,
    `【空亡】${r.kongWang.join('') || '—'}　驿马 ${r.ma.zhi || '—'}（${r.ma.gong || '—'}宫）`,
    `【宫位条件】击刑 ${(r.conditions && r.conditions.jiXing || []).map((x) => `${x.palace}宫${x.stem}`).join('、') || '无'}　三奇入墓 ${(r.conditions && r.conditions.ruMu || []).map((x) => `${x.palace}宫${x.stem}`).join('、') || '无'}　六仪入墓 ${(r.conditions && r.conditions.liuYiRuMu || []).map((x) => `${x.palace}宫${x.stem}`).join('、') || '无'}`,
    `【十干克应】${[...P, r.centerPalace].filter((p) => p && p.ganYing).map((p) => `${p.palace}宫 ${p.ganYing.tian}加${p.ganYing.di} ${p.ganYing.name}`).join('　') || '—'}`,
    `【旺衰】${stateLine(r)}`,
    `【九宫】${P.map(cell).join('　')}`,
    `※ 晚子时：${r.lateZiHourMode === 'next-day' ? '23:00 后归次日' : '23:00 后仍归当日'}（可用 lateZiHourMode / lateZi 指定）`,
    `※ ${r.rules[r.rules.length - 1]}`,
  ].join('\n');
}

function tripleText(t) {
  if (!t || !Array.isArray(t.pairs) || !t.pairs.length) return [];
  const lines = [
    '【三方合盘】三对两两并列，不合成「三人总分」',
    ...t.pairs.map((p) => `· ${p.a}–${p.b}：${p.level || '—'}（${p.total == null ? '—' : `${p.total}/100`}）`),
  ];
  if (t.best) {
    // 差 1–2 分时点名「最顺/最需磨合」是假精确：三对分数接近就直说接近，不排名
    if (t.spread >= 3) {
      lines.push(`　最顺：${t.best.a}–${t.best.b}（${t.best.total}/100）`
        + (t.hardest ? `；最需磨合：${t.hardest.a}–${t.hardest.b}（${t.hardest.total}/100）` : ''));
    } else {
      lines.push(`　三对分数接近（最高与最低相差 ${t.spread} 分），不排名`);
    }
  }
  if (t.focus && t.focus.spread >= 3) lines.push(`　差异最大的一维：${t.focus.label}（三对相差 ${t.focus.spread} 分）`);
  if (t.note) lines.push(`※ ${t.note}`);
  return lines;
}

function hepanText(r) {
  if (r.chart === 'ziwei') {
    const d = (x) => `${x.label}：${x.score >= 0 ? '+' : ''}${x.score}　${x.text}`;
    return [
      `【紫微合盘】${r.score.level}（${r.score.total}/100）`,
      `你　命宫 ${r.a.soul.branch}（${r.a.soulStars.join('、') || '无主星'}）　夫妻 ${r.a.spouseStars.join('、') || '无主星'}　${r.a.bureau}`,
      `对方 命宫 ${r.b.soul.branch}（${r.b.soulStars.join('、') || '无主星'}）　夫妻 ${r.b.spouseStars.join('、') || '无主星'}　${r.b.bureau}`,
      ...r.dimensions.map(d),
      ...r.interactions.map((h) => `　· ${h.text}`),
      ...tripleText(r.triple),
      ...r.notes.map((n) => `※ ${n}`),
    ].join('\n');
  }
  const d = (x) => `${x.label}：${x.score >= 0 ? '+' : ''}${x.score}　${x.text}`;
  const solarLine = (side) => {
    if (!side || !side.solarNote) return '—';
    return `${side.longitude == null ? '未含经度修正' : `${side.longitude}°E`}（${side.solarNote}）`;
  };
  return [
    `【合盘】${r.score.level}（${r.score.total}/100）`,
    `你　${r.a.pillars.join(' ')}　日主 ${r.a.dayMaster}　日支 ${r.a.dayBranch}　${r.a.strength || ''}`,
    `对方 ${r.b.pillars.join(' ')}　日主 ${r.b.dayMaster}　日支 ${r.b.dayBranch}　${r.b.strength || ''}`,
    `真太阳时：你 ${solarLine(r.a)}；对方 ${solarLine(r.b)}`,
    ...r.dimensions.map(d),
    ...(r.detail ? [
      `属相：${r.detail.yearRelation.label}——${r.detail.yearRelation.text}`,
      `日干：${r.detail.stems.text}`,
      ...(r.detail.crossBranches && r.detail.crossBranches.length
        ? [`跨盘地支：${r.detail.crossBranches.map((c) => `${c.name}（${c.a}${c.b}）`).join('、')}`]
        : []),
      `年命纳音：${r.detail.nayin.a} / ${r.detail.nayin.b}（${r.detail.nayin.label}）——${r.detail.nayin.text}`,
      `吉凶象：吉 ${r.detail.tally.good} / 凶 ${r.detail.tally.bad}（${r.detail.tally.lean}；分档只数象，总分以上面三维度为准）`,
    ] : []),
    ...tripleText(r.triple),
    ...r.notes.map((n) => `※ ${n}`),
  ].join('\n');
}

function daliurenText(r) {
  const sc = r.sanChuan;
  const one = (c) => `${c.zhi}(${c.jiang}${c.liuQin}${c.xunKong ? '空' : ''})`;
  return [
    `【日时】${r.dayGanZhi}日　${r.hourZhi}时（${r.dayNight}贵）　月将 ${r.yueJiang.name}${r.yueJiang.zhi}　节气 ${r.jieqi.name}　${r.lateZi === false ? '晚子时不换日' : '晚子时换日'}`,
    `【三传】初 ${one(sc.chu)} → 中 ${one(sc.zhong)} → 末 ${one(sc.mo)}`,
    `【四课】${r.siKe.map((k) => `${k.position}课 ${k.shang}上${k.xia}下(${k.relation}·${k.jiang})`).join('　')}`,
    `【天地盘】${r.pan.map((p) => `${p.di}:${p.tian}(${p.jiang})`).join(' ')}`,
    `【格局】${r.geJu.name}·${r.geJu.detail}`,
    ...((r.shensha && r.shensha.length) ? [`【神煞】${r.shensha.map((x) => `${x.name}${x.branch}`).join('　')}`] : []),
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
    // 英文名与占星对应来自逐张库；宫廷牌没有占星，就顶出它的角色
    const ast = c.astro ? `　${c.astro}` : (c.role ? `　${c.role}` : '');
    const en = c.en ? ` [${c.en}]` : '';
    lines.push(`  ${c.position}：${c.name}${en}（${c.orientation}）${ast}　${c.keywords.join('、')}`);
    if (c.image) lines.push(`　　　　牌面：${c.image}`);
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
    r.xunShou ? `旬首：${r.xunShou}　旬空：${(r.xunKong || []).join('') || '—'}` : '',
    r.question ? `所问：${r.question}` : '',
    '本卦：',
    fmt(r.ben),
  ];
  if (r.bian) out.push(`动爻：第 ${r.cast.movingPositions.join('、')} 爻`, '变卦（六亲以变卦自身宫论）：', fmt(r.bian));
  else out.push('六爻安静，无变卦。');
  // 结果里已带 labels；只有旧数据或裸对象调用时才现算一份
  const body = (r.body && Array.isArray(r.body.labels)) ? r.body.labels : bodyLabels(r.body);
  out.push(`卦体：${body.length ? body.join(' · ') : '无六冲、六合、伏吟、反吟'}`);
  // 用神：按询问方向取六亲（感情分男女、出行以世为用），不上卦时给伏神
  const ug = r.useGod || yongshenOf(r, {});
  if (ug && ug.liuqin) {
    const where = ug.found.length
      ? ug.found.map((f) => `${f.position}爻${f.ganzhi}${f.element}${f.kong ? '（空）' : ''}`).join('、')
      : (ug.fushen.length ? ug.fushen.map((f) => `伏 ${f.position}爻${f.ganzhi}${f.element}（${f.relation || '飞伏关系未知'}）`).join('、') : '不上卦');
    out.push(`用神：${ug.byShi ? '世爻' : ug.liuqin}（${ug.ask}）→ ${where}${ug.side ? `（${ug.side}）` : ''}`);
    const head = ug.byShi ? '用神 世爻' : `用神 ${ug.liuqin}`;
    const extra = ug.labels.filter((x) => x !== head && !x.startsWith(head));
    if (extra.length) out.push(`用神联动：${extra.join(' · ')}`);
    const strength = r.useGodStrength;
    if (strength && strength.labels.length) {
      const m = strength.month && strength.month.branch ? `月建 ${strength.month.branch}（${strength.month.element}）　` : '';
      out.push(`用神旺衰：${m}${strength.labels.join(' · ')}`);
    }
    // 伏神出伏条件：只在用神不上卦时出现；只归条件档，不给应期
    const chufu = r.fushenAccess;
    if (chufu && Array.isArray(chufu.labels) && chufu.labels.length) {
      out.push(`伏神出伏：${chufu.labels.join(' · ')}`);
    }
  } else {
    out.push('用神：未取（未指明所问之事；用「询问方向」指定后即按六亲取用）');
  }
  // 全卦逐爻旺衰：不挑用神，六爻都给状态，世应、动爻、旬空另标
  const hexSt = r.hexStrength;
  if (hexSt && Array.isArray(hexSt.labels) && hexSt.labels.length) {
    const m = hexSt.month && hexSt.month.branch
      ? `月建 ${hexSt.month.branch}（${hexSt.month.element}）　`
      : '无月建（未给起卦时间）　';
    out.push(`全卦旺衰：${m}${hexSt.labels.join(' · ')}`);
  }
  // 化进/化退的力重：单列一行，免得跟卦体标签混着读
  const jt = r.jinTuiPower;
  if (jt && Array.isArray(jt.lines) && jt.lines.length) {
    out.push(`进退力重：${jt.lines.map((l) => `${l.position}爻${l.from}→${l.to}${l.type}·${l.verdict}`).join(' · ')}`);
  }
  // 应期线索：只列地支与快慢，不给日期
  const yq = r.yingqi;
  if (yq && Array.isArray(yq.triggers) && yq.triggers.length) {
    out.push(`应期线索：${yq.tempo} · ${yq.triggers.map((t) => `${t.labels.join('/')}${t.branch}`).join(' · ')}（只列地支，不出日期）`);
  }
  return out.filter(Boolean).join('\n');
}

/**
 * 工具输出必须是无损 JSON：去掉 undefined / 函数等不可序列化的值。
 * 语义与 JSON.parse(JSON.stringify(v)) 一致（NaN→null、-0→0、Date→ISO、数组空位→null、
 * 对象里的 undefined/函数丢键、循环引用抛错），但不建中间字符串——结果动辄几百 KB，
 * 每次 compute 都序列化一遍纯属浪费。
 */
function jsonSafe(value) {
  const seen = new WeakSet();
  const walk = (v, key) => {
    if (v instanceof Number || v instanceof String || v instanceof Boolean) v = v.valueOf();
    if (v && typeof v === 'object' && typeof v.toJSON === 'function') v = v.toJSON(key);
    switch (typeof v) {
      case 'string':
      case 'boolean':
        return v;
      case 'number':
        return Number.isFinite(v) ? (Object.is(v, -0) ? 0 : v) : null;
      case 'bigint':
        throw new TypeError('Do not know how to serialize a BigInt');
      case 'object': {
        if (v === null) return null;
        if (seen.has(v)) throw new TypeError('Converting circular structure to JSON');
        seen.add(v);
        let out;
        if (Array.isArray(v)) {
          out = new Array(v.length);
          for (let i = 0; i < v.length; i++) {
            const c = walk(v[i], String(i));
            out[i] = c === undefined ? null : c;
          }
        } else {
          out = {};
          for (const k of Object.keys(v)) {
            const c = walk(v[k], k);
            if (c !== undefined) out[k] = c;
          }
        }
        seen.delete(v);
        return out;
      }
      default:
        return undefined;
    }
  };
  return walk(value, '');
}

// ── 影子盘：同一组归一化参数 + 同一版本 → 同一个短 ID ──────────────
// 只收影响盘面的参数：地址换成有效经度后不再把原文算进去，问事/方向按体系保留。
const SHADOW_IGNORE = new Set([
  'shadow', 'shadowVersion', 'diff', 'trace', 'traceError', 'withInterpret', 'detail', 'cross', 'verifyPast', 'rectify', 'events',
  'geocode', 'ask', 'followup', 'caliber', 'seed', 'asOf', 'handle', 'revise', 'geo', 'longitudeFromGeo',
]);

const num6 = (n) => {
  if (n === undefined || n === null || n === '') return null;
  const v = Number(n);
  return Number.isFinite(v) ? Number(v.toFixed(6)) : null;
};

function shadowDateTime(value) {
  if (value === undefined || value === null || value === '') return null;
  try {
    const d = parseDateTime(value);
    return { y: d.year, m: d.month, d: d.day, h: d.hour, mi: d.minute, precision: d.precision };
  } catch {
    return String(value).trim();
  }
}

function shadowPerson(person = {}) {
  const out = {};
  if (person.datetime) out.datetime = shadowDateTime(person.datetime);
  if (person.gender) out.gender = String(person.gender).toLowerCase();
  if (person.longitude !== undefined) out.longitude = num6(person.longitude);
  else if (person.address) out.address = String(person.address).trim();
  if (person.lateZi !== undefined) out.lateZi = bool(person.lateZi, true);
  if (person.trueSolar !== undefined) out.trueSolar = bool(person.trueSolar, true);
  if (person.dst !== undefined) out.dst = bool(person.dst, true);
  return out;
}

function qimenLateMode(args) {
  if (args.lateZiHourMode === 'next-day' || bool(args.lateZi)) return 'next-day';
  return 'same-day';
}

function shadowParams(args, result) {
  const system = String((result && result.system) || args.system || '');
  const input = result && result.input && typeof result.input === 'object' ? result.input : null;
  if (system === 'bazi' && input) {
    return {
      civil: input.civil,
      gender: input.gender,
      longitude: num6(input.longitude),
      lateZi: bool(input.lateZi, true),
      trueSolar: bool(input.trueSolar, true),
      dst: !!(input.dst && input.dst.applied),
    };
  }
  if (system === 'ziwei' && input) {
    return {
      civil: { year: input.year, month: input.month, day: input.day, hour: input.hour, minute: input.minute },
      gender: input.gender,
      longitude: num6(input.longitude),
      leapMonth: input.leapMonth || 'split',
      leapAsNext: bool(input.leapAsNext),
      schools: input.schools || ZIWEI_SCHOOL_DEFAULTS,
      trueSolar: bool(input.trueSolar, true),
      dst: !!(input.dst && input.dst.applied),
    };
  }
  if (system === 'qimen') {
    return {
      datetime: shadowDateTime(args.datetime),
      juMethod: args.juMethod || 'chaibu',
      lateZiHourMode: qimenLateMode(args),
    };
  }
  if (system === 'hepan') {
    const params = {
      chart: args.chart === 'ziwei' ? 'ziwei' : 'bazi',
      a: shadowPerson({ ...args, datetime: args.datetime }),
      b: shadowPerson(args.partner || {}),
    };
    // 第三方进指纹：同一对加上不同的第三人，是另一组盘
    if (args.partner2) params.c = shadowPerson(args.partner2);
    return params;
  }

  // 其余体系：只剔除解析/附加模块参数，其余原样归一化
  const params = {};
  // 一律 defineProperty，不用 params[key] =：key 恰好是 __proto__ 时赋值走原型 setter，
  // 键会静默消失——两种不同的 __proto__ 值于是撞成同一个指纹（canonicalJson 已避过这个坑）
  const put = (key, value) => Object.defineProperty(params, key, {
    value, enumerable: true, writable: true, configurable: true,
  });
  for (const [key, value] of Object.entries(args)) {
    if (SHADOW_IGNORE.has(key) || value === undefined) continue;
    if (key === 'datetime') put(key, shadowDateTime(value));
    else if (key === 'partner') put(key, shadowPerson(value));
    else if (key === 'gender') put(key, String(value).toLowerCase());
    else if (key === 'address') continue; // 调用侧先把地址换成经度，再由 longitude 参与；这里不收原文
    else if (typeof value === 'number') put(key, Number.isFinite(value) ? (Object.is(value, -0) ? 0 : value) : null);
    else if (typeof value === 'string') put(key, value.trim());
    else put(key, value);
  }
  if (system === 'daliuren' && params.lateZi === undefined) params.lateZi = true;
  if (system === 'tarot' && params.spread === undefined && params.count === undefined) params.count = 3;
  if (system === 'meihua' && params.mode === undefined) params.mode = 'time';
  if (system === 'xiaoliuren' && params.mode === undefined) params.mode = 'time';
  if (system === 'convert' && params.mode === undefined) params.mode = 'solar2lunar';
  if (system === 'fengshui' && params.action === undefined) params.action = 'natal';
  // 随机起卦 / 抽牌：同参数不等于同一副牌，把实际抽到的牌面 / 爻值算进来，
  // 否则两次不同的抽牌会撞成同一个 ID（有 seed 时本来就能复现，这里只是多一层同构校验）。
  if (system === 'tarot' && result && Array.isArray(result.cards) && result.cards.length) {
    params.cards = result.cards.map((c) => `${c.name || ''}|${c.upright ? '正' : '逆'}`);
  }
  if (system === 'liuyao' && result && result.cast && Array.isArray(result.cast.lines)) {
    params.cast = result.cast.lines.join('');
  }
  return params;
}

function shadowMeta(system, args, asOfNorm = normalizeAsOf(args.asOf)) {
  const seed = args.seed;
  const seeded = !(seed === undefined || seed === null || seed === '');
  // 六爻给定了六爻值就是确定性起卦，不需要 seed 也能复算
  if (system === 'liuyao' && Array.isArray(args.lines) && args.lines.length === 6) {
    return { reproducible: true };
  }
  if ((system === 'tarot' || system === 'liuyao') && !seeded) {
    return { reproducible: false, reason: '未给 seed：重算会变成另一副牌 / 另一卦' };
  }
  if (system === 'bazi' || system === 'ziwei' || system === 'trend' || system === 'fengshui') {
    // 以归一化后的值为准：'2030-01-01' 算钉住了，'   ' 不算
    return { reproducible: true, asOfPinned: !!asOfNorm };
  }
  return { reproducible: true };
}

/** asOf 也按同一套日期尺归一：2026-10-22 / 2026-10-22T16:00 / 带空格 三种写法应是同一张盘。
 *  必须走 asOfParts，不能走 parseDateTime：排盘侧「只给日期」按中午 12:00 补时刻，
 *  parseDateTime 补的是 00:00——以前指纹用后者，于是 '2030-01-01' 与 '2030-01-01T12:00'
 *  出的盘逐字段相同，baseId 却是两个，跨版本对拍直接断在这里。
 *  checkAsOf 与影子盘指纹共用这一个口径。 */
function normalizeAsOf(value) {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value === 'object') return value; // 内部传的对象口径不动，由调用方负责
  const s = String(value).trim();
  if (!s) return null; // 只有空格 = 没钉 asOf，别让它算成第三种指纹
  const parts = asOfParts(s);
  if (!parts) return s; // 非法值留给 checkAsOf 报错，指纹不抢答
  const p2 = (n) => String(n).padStart(2, '0');
  // 年份也要补到 4 位：asOfParts 的正则只认四位年份，0000 原样拼成 '0-01-01T12:00'
  // 会在 checkAsOf 里被当成格式错误，报出「无法解析 asOf：「0-01-01T12:00」」这种看不懂的话。
  const y4 = String(parts.year).padStart(4, '0');
  return `${y4}-${p2(parts.month)}-${p2(parts.day)}T${p2(parts.hour)}:${p2(parts.minute)}`;
}

/**
 * 影子盘指纹。版本优先级：显式 opts.version → 构建注入的全局 __MP_VER → dev。
 * @returns {{id:string, baseId:string, version:string, system:string, payload:string,
 *   reproducible:boolean, asOfPinned?:boolean, reason?:string}}
 */
export function chartFingerprint(args = {}, opts = {}) {
  const result = opts.result || null;
  const system = String((result && result.system) || args.system || '');
  const version = String(opts.version || (typeof globalThis !== 'undefined' && globalThis.__MP_VER) || 'dev');
  const asOf = normalizeAsOf(args.asOf);
  const fp = fingerprintOf({
    system,
    params: shadowParams(args, result),
    seed: args.seed,
    asOf,
    version,
  });
  return { ...fp, ...shadowMeta(system, args, asOf), system, version };
}

const SHADOW_DIFF_IGNORE = new Set([
  'shadow', 'trace', 'traceText', 'traceError', 'interpret', 'summary', 'classics', 'suiyunClassic', 'renyuanClassic', 'cross',
  'past', 'rectify', 'followup', 'caliber', 'input', 'reading', 'knowledge', 'outline',
  'sections', 'answer', 'plain', 'tables', 'glossary', 'caveats', 'lead', 'dimensions',
  'moduleType', 'technique', 'disclaimer', 'ask', 'followups', 'knowledgeCount', 'title',
  'systemLabel', 'handle', 'handleError', 'revision',
]);

function shadowChart(result) {
  const out = {};
  for (const [key, value] of Object.entries(result || {})) {
    if (!SHADOW_DIFF_IGNORE.has(key)) out[key] = value;
  }
  return out;
}

/**
 * 存档用的轻量快照：只留影子盘信息与盘面字段（解析/古籍/验前事等不参与 diff）。
 * 页面侧把它写进本地存储，下次同 baseId 重排时直接与它比对。
 */
export function shadowSnapshot(result) {
  if (!result || !result.shadow || !result.shadow.baseId) return null;
  return { snapshot: true, shadow: result.shadow, data: shadowChart(result) };
}

/**
 * 同一 baseId 的两次结果对比；版本不同时自动落到具体字段。
 * previous / current 可以是完整结果，也可以是 shadowSnapshot() 的存档。
 */
export function shadowDiff(previous, current, opts = {}) {
  const a = previous && previous.shadow;
  const b = current && current.shadow;
  if (!a || !b) return { sameId: false, total: 0, reason: '缺少影子盘信息' };
  if (a.baseId && b.baseId && a.baseId !== b.baseId) {
    return { sameId: false, total: 0, fromId: a.id, toId: b.id, fromBaseId: a.baseId, toBaseId: b.baseId, reason: '基础指纹不同，不是同一张盘' };
  }
  const pick = (x) => (x.snapshot === true && x.data && typeof x.data === 'object' ? x.data : shadowChart(x));
  const diffs = diffObjects(pick(previous), pick(current));
  const roots = sortDiffs(diffs.filter((d) => rootOf(d.path))).map((d) => ({
    path: d.path, label: labelOf(d.path), from: formatValue(d.from), to: formatValue(d.to),
  }));
  const counts = new Map();
  for (const d of diffs) {
    const cat = categoryOf(d.path) || '其他';
    counts.set(cat, (counts.get(cat) || 0) + 1);
  }
  const categories = [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((x, y) => y.count - x.count || x.name.localeCompare(y.name, 'zh-Hans-CN'));
  const fromVersion = opts.fromVersion || a.version || '';
  const toVersion = opts.toVersion || b.version || '';
  return {
    sameId: true,
    versionChanged: fromVersion !== toVersion,
    fromVersion,
    toVersion,
    total: diffs.length,
    summary: summarize(diffs),
    roots,
    categories,
    diffs,
  };
}

/**
 * 统一排盘入口
 * @param {object} args
 * @param {'bazi'|'ziwei'|'liuyao'} args.system
 * @param {string} [args.datetime]
 * @param {string} [args.handle] 上次结果里的句柄；给了它就可以只传增量参数（如 asOf、direction、system）
 */
export function compute(input = {}) {
  // 句柄先并回参数：后面的代码只看见一份完整参数，不必到处判 handle
  let args = resolveHandle(input);
  // 一句话改参（C2）：把「换成紫微看 2030 年事业」翻成补丁再排盘；识别不到就原样排，
  // 绝不猜。改了哪些、没认哪些都随结果回传，便于核对。
  let revision;
  if (typeof args.revise === 'string' && args.revise.trim()) {
    const rev = parseRevision(args.revise);
    const before = { ...args };
    args = { ...args, ...rev.patch };
    revision = {
      text: rev.text,
      applied: rev.labels.map((l) => {
        const from = before[l.key] === undefined ? null : before[l.key];
        return { ...l, from, fromDisplay: displayValue(l.key, from) };
      }),
      ignored: rev.ignored,
    };
    // 换体系有两条路：显式 `system`（resolveHandle 里已经剔过）、以及一句话改参
    // （「换成八字看」把 system 翻成补丁，落在句柄合并之后）。后一条若不补这一刀，
    // 称骨句柄里的 hour 会跟到八字盘上，被工具层当成误传报错。
    args = pruneForeignKeys(args, ownedKeys(input, rev.patch));
  }
  // 开关归一：排盘读的、句柄记的、指纹比的是同一份真布尔。
  // 少了这一刀，`trueSolar:"false"` 会排出「开真太阳时」的盘而句柄写 false——
  // 同一张盘两个身份，影子盘对拍与深链回放都会错过。
  args = canonicalFlags(args);
  // 数字归一：`count:"3"` 与 `count:3` 是同一张盘，句柄与指纹也只能有一个身份。
  // 放在开关之后、asOf / 经度 / verifyPast 整形之前：后面几处校验读到的是真数字，
  // 「收到「9」」这种字面看着没错的报错也就不会再出现。
  args = canonicalNumbers(args);
  // asOf 在入口就归一成 canonical 串（去首尾空格、只给日期补 12:00）：
  // 排盘、句柄、影子盘指纹读同一份。以前只有指纹 trim，句柄照抄原文，
  // '2030-01-01' 与 '2030-01-01T12:00' 出的明明是同一张盘，却各得一个 handle、一个 baseId。
  // 没给 asOf 时一个键都不加：null 会整段进句柄，等于给所有旧深链换一次身份。
  if (args.asOf !== undefined && args.asOf !== null && args.asOf !== '') {
    const norm = normalizeAsOf(args.asOf);
    if (norm === null) {
      args = { ...args };
      delete args.asOf; // 只有空格：按「没钉 asOf」处理，与 normalizeAsOf 的口径一致
    } else if (norm !== args.asOf) args = { ...args, asOf: norm };
  }
  // partner2: null 视同未传：先归一化再排盘，否则同一对盘会因为显式 null 多出一个句柄
  if (args.partner2 === null) {
    args = { ...args };
    delete args.partner2;
  }
  // 经度整形 + 守卫（非有限 / 超范围 → E_RANGE；数字串 → 数字）
  args = normalizeLongitudes(args);
  // verifyPast 必须在「用它摊开过去流年」之前整形：这段逻辑在 compute() 里，
  // 校验却留在 computeRaw()，数字串 "6" 会先被当成没传、再也没机会排。
  if (args.verifyPast !== undefined && args.verifyPast !== null && args.verifyPast !== '') {
    const n = Number(args.verifyPast);
    if (!Number.isInteger(n) || n < 1 || n > 10) {
      throw fail('E_INPUT', `verifyPast 要是 1–10 的整数（年数），收到「${args.verifyPast}」`);
    }
    args = { ...args, verifyPast: n };
  }
  const r = jsonSafe(computeRaw(args));
  // 「所问之事」以前只有六爻和塔罗会落到结果里，梅花/六壬/奇门/小六壬都丢掉了：
  // 于是第一屏想说「你问的是……」却拿不到那句话。这里统一补齐，已有的值不动。
  if (r && !r.question && typeof args.question === 'string' && args.question.trim()
    && ['liuyao', 'meihua', 'daliuren', 'qimen', 'tarot', 'xiaoliuren'].includes(r.system)) {
    r.question = args.question.trim();
  }
  // 顶部那段「人话总结」：命盘两类 + 问事五类 + 合盘 + 走势，都由 plainSummary 决定给不给。
  // 数据不够时它返回 null，不动 r.brief；生成失败只记 briefError，绝不因此拖垮排盘。
  if (r) {
    try {
      const brief = plainSummary(r);
      if (brief) r.brief = brief;
    } catch (e) { r.briefError = String((e && e.message) || e); }
  }
  if (revision) r.revision = revision;
  if (r && r.system === 'bazi') {
    r.classics = classicsFor(r);
    const ct = classicsText(r.classics);
    if (ct) r.summary = `${r.summary}\n【古籍】\n${ct}`;
    // 岁运提示的原文不占五条上限：只在盘面真有岁运信号时挂到结果上，摘要、解析层与面板各自取用
    const syc = suiyunClassicOf(r);
    if (syc) r.suiyunClassic = { ...syc, bookName: CLASSIC_BOOKS[syc.book].name };
    // 人元司事的原文同样不进五条取条表：每张八字盘都有人元，随「人元司权」一节给出
    if (r.renyuan) {
      const ryc = classicOf('smt-renyuan');
      if (ryc) r.renyuanClassic = { ...ryc, bookName: CLASSIC_BOOKS[ryc.book].name };
    }
  }
  // 超出 ΔT 覆盖范围时把精度提示顶到摘要最前，别让远期盘悄悄出错
  if (r && r.precision && r.precision.level === 'approx' && r.summary) {
    r.summary = `⚠ ${r.precision.note}\n${r.summary}`;
  }
  // 没有经度就没有真太阳时：时柱可能整柱偏（海外出生尤其常见），必须显式告警而不是藏在括号里
  if (r && (r.system === 'bazi' || r.system === 'ziwei') && r.input && r.input.longitude == null && r.summary) {
    r.summary = `⚠ 未提供出生地或经度：按东八区平太阳时排盘，时柱可能与本命盘相差一个时辰；海外出生请先把当地时间换算成东八区标准时。\n${r.summary}`;
  }
  // 时辰未知：固定提示必须在第一行。放在所有警告之后 prepend，才不会被地警告/精度提示挤到第二行
  if (r && r.system === 'bazi' && r.hourUnknown && r.summary) {
    r.summary = `时柱按正午暂算，涉及时柱的结论仅供参考
${r.summary}`;
  }
  // 趋势是降级而不是阻断：起运按日估算，也要在首行说清
  if (r && r.system === 'trend' && r.hourUnknown && r.summary) {
    r.summary = `时柱暂缺：起运与大运按日估算，仅供参考
${r.summary}`;
  }
  // 只给日期、没给时刻：parseDateTime 会把时分补成 00:00，于是照常排出完整四柱/起好局，
  // 而调用方以为「日期就够了」。这类静默默认正是最该说出来的一种：盘面上看不出任何异常。
  // 梅花数字起卦只读 upper/lower，datetime 不参与取卦，不该被这句提示打扰。
  const ignoresClock = r && r.system === 'meihua' && args.mode === 'number';
  const datetimeDateOnly = typeof args.datetime === 'string' && args.datetime.trim() !== ''
    && !/[T\s]\d{1,2}:\d{1,2}/.test(args.datetime.trim());
  // name 还支持 year/month/day(+hour/minute) 分开给生辰：只给年月日时，
  // buildName 内部同样按 00:00 占位，不能因为没走 datetime 就绕过这句提示。
  const nameDateOnly = r && r.system === 'name' && !(typeof args.datetime === 'string' && args.datetime.trim())
    && Number.isInteger(args.year) && Number.isInteger(args.month) && Number.isInteger(args.day)
    && !Number.isInteger(args.hour);
  if (r && !ignoresClock && !r.hourUnknown && !r.timeMissing && HOUR_MATTERS.has(r.system)
    && (datetimeDateOnly || nameDateOnly) && r.summary) {
    r.timeMissing = true;
    const note = NO_TIME_NOTE[r.system] || { what: '时刻', advice: '请补上时刻 HH:mm' };
    r.summary = `⚠ 只给了日期、没有时刻：${note.what}按 00:00 暂算，与真实结果可能整档不同；${note.advice}\n${r.summary}`;
  }
  // 合盘的另一方同样是「只给日期」的静默 00:00，主方有提示、对方没有就等于只报了一半
  if (r && r.system === 'hepan' && r.summary) {
    const missing = [];
    for (const [who, label] of [['partner', '对方'], ['partner2', '第三方']]) {
      const person = args[who];
      const when = person && typeof person === 'object' ? person.datetime : undefined;
      if (typeof when === 'string' && !/[T\s]\d{1,2}:\d{1,2}/.test(when.trim())) missing.push(label);
    }
    if (missing.length) {
      r.timeMissing = true;
      r.summary = `⚠ 只给了日期、没有时刻：${missing.join('、')}的时柱按 00:00 暂算，与真实结果可能整档不同；请补出生时刻 HH:mm\n${r.summary}`;
    }
  }
  // 显式要求时才附加解析模块，避免默认输出过长；「所问之事」与「询问方向」一并传进去
  const tier = detailOf(args.detail);
  if (args.withInterpret) {
    r.interpret = interpret(r, {
      question: typeof args.question === 'string' ? args.question : '',
      direction: typeof args.direction === 'string' ? args.direction : 'general',
    });
    // 档位只改「回给模型的文本」，不改解析对象：面板拿到的仍是完整的 interpret。
    // 键名不用 detail / tier：合盘结果里 r.detail 是详批对象、流年行里 r.tier 是档位，都会撞。
    // 有些体系没有解析模块（interpret 为 null），此时不该留下一个没有正文的档位键。
    if (r.interpret && tier !== 'full') r.interpretTier = tier;
  }
  // 八字 × 紫微交叉验证：同一份出生信息再排另一套盘，并列两边对同一件事的说法
  // 交叉验证要再排另一套盘：时辰未知时紫微排不出来，这条支路直接跳过，
  // 不能拿正午排一张紫微盘来「交叉」，那是两张都不可信的盘互证。
  if (bool(args.cross) && bool(args.hourUnknown)) r.crossSkipped = 'HOUR_UNKNOWN';
  if (bool(args.cross) && !bool(args.hourUnknown) && (r.system === 'bazi' || r.system === 'ziwei')) {
    const cdt = parseDateTime(args.datetime);
    const common = {
      ...cdt,
      gender: requireGender(args.gender),
      longitude: typeof args.longitude === 'number' ? args.longitude : undefined,
      address: typeof args.address === 'string' ? args.address : undefined,
      geo: args.geo && typeof args.geo === 'object' ? args.geo : undefined,
      trueSolar: bool(args.trueSolar, true),
      dst: bool(args.dst, true),
    };
    const asOf = checkAsOf(args.asOf);
    // 八字显式写了 lateZi 时，交叉的紫微盘必须同口径：23:00 后一边按次日、一边按当日，
    // 等于拿两个生日互证。没写时仍按紫微自己的 current-day 缺省，不改既有交叉结果；
    // 显式 lateZishi（紫微历史参数名）优先。
    const crossLateZishi = args.lateZishi !== undefined
      ? args.lateZishi
      : args.lateZi === undefined || args.lateZi === null || args.lateZi === ''
        ? undefined
        : bool(args.lateZi, true) ? 'next-day' : 'current-day';
    const other = r.system === 'bazi'
      ? buildZiwei({
        ...common,
        leapMonth: args.leapMonth,
        leapAsNext: bool(args.leapAsNext),
        ...ziweiSchoolArgs(args),
        ...(crossLateZishi !== undefined ? { lateZishi: crossLateZishi } : {}),
        asOf,
      })
      : buildBazi({ ...common, lateZi: bool(args.lateZi, true), nowYear: asOf ? asOf.year : undefined });
    r.cross = crossCheck(r.system === 'bazi' ? r : other, r.system === 'ziwei' ? r : other);
    if (r.interpret) {
      r.interpret.sections.push(crossSection(r.cross));
    }
  }
  // 验前事：把过去若干年的流年信号摊开（只读，不改盘）
  if (Number.isInteger(args.verifyPast) && args.verifyPast > 0 && r.system === 'bazi') {
    const years = args.verifyPast;
    const from = Number(r.liunianFrom) - years;
    const pastChart = buildBazi({
      ...parseDateTime(args.datetime),
      // 与主盘同口径：主盘 hourUnknown 时内部按正午占位，过去盘若还用 00:00，
      // 流年信号就来自子夜的盘，与用户看到的不是同一张
      hourUnknown: bool(args.hourUnknown),
      gender: requireGender(args.gender),
      lateZi: bool(args.lateZi, true),
      trueSolar: bool(args.trueSolar, true),
      longitude: typeof args.longitude === 'number' ? args.longitude : undefined,
      address: typeof args.address === 'string' ? args.address : undefined,
      geo: args.geo && typeof args.geo === 'object' ? args.geo : undefined,
      dst: bool(args.dst, true),
      nowYear: from,
    });
    r.past = {
      rows: pastSignals(pastChart, Number(r.liunianFrom) - 1),
      years,
      until: Number(r.liunianFrom) - 1,
    };
  }
  // 生时校正：候选时辰 × 过去事件，按固定规则打分（仅八字）
  if (bool(args.rectify) && r.system === 'bazi') {
    const base = parseDateTime(args.datetime);
    r.rectify = rectifyBirth({
      base: { year: base.year, month: base.month, day: base.day, minute: base.minute },
      gender: requireGender(args.gender),
      events: Array.isArray(args.events) ? args.events : [],
      hours: Array.isArray(args.rectifyHours) ? args.rectifyHours : undefined,
      lateZi: bool(args.lateZi, true),
      trueSolar: bool(args.trueSolar, true),
      dst: bool(args.dst, true),
      longitude: typeof args.longitude === 'number' ? args.longitude : undefined,
      address: typeof args.address === 'string' ? args.address : undefined,
      geo: args.geo && typeof args.geo === 'object' ? args.geo : undefined,
    });
  }
  // 追问：围绕已算好的盘回答「某一年 / 某方面」的具体问题
  if (typeof args.ask === 'string' && args.ask.trim()) r.followup = followup(r, args.ask);
  // 推导链：只读结果、不重算；生成失败不影响盘面，单独留一条错误信息
  if (bool(args.trace)) {
    try {
      const layers = buildTrace(r, { direction: args.direction, gender: args.gender });
      if (layers) {
        r.trace = layers;
        // 同一份层另出一份 Markdown：贴进对话/文档时表格不会散架，内容与 r.trace 同源
        r.traceText = traceMarkdown(layers, { system: r.system });
      }
    } catch (e) {
      r.traceError = String((e && e.message) || e);
    }
  }
  // 影子盘 ID：同一组归一化参数 + 同一版本 → 同一个短 ID；显式要时才挂，避免默认输出变长
  if (bool(args.shadow)) {
    try {
      r.shadow = chartFingerprint(args, { result: r, version: args.shadowVersion });
    } catch (e) {
      r.shadow = { error: String((e && e.message) || e) };
    }
  }
  // 排盘句柄：把这张盘的参数压成短串；下一次追问传 handle + 增量即可，不必重报出生信息
  try {
    const h = encodeHandle(args);
    if (h) r.handle = h;
  } catch (e) {
    r.handleError = String((e && e.message) || e);
  }
  return r;
}

/** 解析与详解的紧凑文本（给模型看，不塞整块 JSON）
 *  detail：'full'（默认全文）/ 'lean'（只给结论、所问方向与三张表，长论述与规则出处折成指针）/
 *  'brief'（在 lean 上再限表行；工具层在 withInterpret 且未指定档位时用这一档）。
 *  省的是回给模型的文本，不改盘面、不改解析对象本身。
 *  **不设体积上限**：brief 只做「少给哪些维度、表最多几行」这类结构性收敛，
 *  超长就让它超长——按字节截断会把结论、依据、边界一起腰斩，省下的体积不值这个代价。 */
export function interpretText(i, detail) {
  if (!i) return '';
  const brief = detail === 'brief';
  const lean = detail === 'lean';
  const compact = brief || lean;
  const BRIEF_TABLE_ROWS = 8;
  const LONG_SECTION = 300;
  const out = [`【${i.title || '解析与详解'}】${i.ask && i.ask.echo ? i.ask.echo : ''}`];
  // 直答放在最前：先回答「你问的事」，再说依据，避免读者读到最后才知道结论；
  // 没填问题时就不该喊「答所问」——改为「先看结论」，否则是一句假话
  if (i.answer) out.push(`▶ ${i.ask && i.ask.question ? '先答所问' : '先看结论'}：${i.answer}`);
  if (i.plain) out.push(`▶ 说人话：${i.plain}`);
  if (i.lead) out.push(i.lead);
  // 一页读懂：报告顶部的五条结论，先给读的人一个「整体形状」
  if (Array.isArray(i.outline) && i.outline.length) {
    out.push('一页读懂：' + i.outline.map((o) => `${o.label}·${o.text}`).join('　'));
  }
  // 解析生成失败时不能只返回一个空壳：盘面数据仍然可用，但要让调用方知道"这段没生成出来"
  if (i.error) out.push(`⚠ 解析生成失败：${i.error}（上方盘面数据本身可用）`);
  const allDims = i.dimensions || [];
  // 问了方向就只给那一条：其余四条在 full 档里，模型要展开随时可以再排一次
  const dims = compact && allDims.some((d) => d && d.focused) ? allDims.filter((d) => d && d.focused) : allDims;
  for (const d of dims) {
    const evidence = Array.isArray(d.evidence) && d.evidence.length ? `\n　依据：${d.evidence.join('；')}${d.confidence ? `　置信度：${d.confidence}` : ''}` : '';
    const plain = d.plain ? `（${d.plain}）` : '';
    // 知识条目：「为什么这样断」＋出处＋可信度标注，是结论与依据之外的第三层
    const know = compact
      ? ((d.knowledge || []).length ? `\n　规则 ${d.knowledge.length} 条未展开（detail:"full" 给出原文与出处）` : '')
      : (d.knowledge || [])
        .map((k) => `\n　规则·${k.gist}〔${k.statusLabel}〕${k.detail}　出处：${k.source}${k.note ? `　注：${k.note}` : ''}`)
        .join('');
    out.push(`${d.label}：${plain}${d.text}${d.advice ? `　建议：${d.advice}` : ''}${evidence}${know}`);
  }
  const secs = i.sections || [];
  const longSecs = compact ? secs.filter((s) => String(s.text || '').length > LONG_SECTION) : [];
  for (const s of secs) {
    if (compact && String(s.text || '').length > LONG_SECTION) continue;
    out.push(`${s.label}：${s.text}`);
  }
  if (longSecs.length) out.push(`（另有 ${longSecs.length} 节长论述未展开：${longSecs.map((s) => s.label).join('、')}。需要原文与出处时传 detail:"full"）`);
  // 三张表：大运 / 流年 / 触发事件（纯文本对齐，工具输出也能直接读）
  for (const t of i.tables || []) {
    if (!Array.isArray(t.rows) || !t.rows.length) continue;
    let rows = t.rows;
    out.push(`【${t.title}】`);
    if (brief && rows.length > BRIEF_TABLE_ROWS) {
      rows = rows.slice(0, BRIEF_TABLE_ROWS);
      out.push(`（共 ${t.rows.length} 行，仅列前 ${BRIEF_TABLE_ROWS} 行；全表传 detail:"lean"）`);
    }
    out.push([t.columns.join(' | '), ...rows.map((r) => r.join(' | '))].join('\n'));
  }
  if (Array.isArray(i.followups) && i.followups.length) {
    out.push('还可以这样追问：' + i.followups.map((q) => `「${q}」`).join('　'));
  }
  if (!brief && Array.isArray(i.glossary) && i.glossary.length) {
    out.push('名词解释：' + i.glossary.map((g) => `${g.term}＝${g.plain}`).join('　'));
  }
  // 能力边界：这段是给调用方（模型）看的上下文，不是给用户直接念的。
  // 写全比只写标题有用——模型知道「为什么不答」，才不会自己补一个答案出来。
  let text = '';
  if (Array.isArray(i.limits) && i.limits.length) {
    text += `【本插件不回答什么】${i.limits.map((l) => `${l.title}——${l.text}`).join('\n')}\n`;
  }
  if (i.disclaimer) text += i.disclaimer;
  // 不按体积截断：这里只把「边界与免责声明」放在末尾，
  // 正文一个字都不砍——brief 已经用「少给维度、表限行数」控过长度了，
  // 再按字节腰斩只会把结论、依据和必要交代一起截掉，反而让模型读到半句话。
  const head = out.join('\n');
  return text ? `${head}\n${text}` : head;
}

/** 对照时不参与计算的参数：它们只影响解析/附加模块，不影响盘面 */
// shadow / trace 是结果的派生展示，不是盘面口径；带进来会让影子盘回显把每组开关都算成「有变化」
const CALIBER_IGNORE_ARGS = ['cross', 'verifyPast', 'withInterpret', 'detail', 'question', 'direction', 'ask', 'geocode', 'rectify', 'events', 'shadow', 'trace'];

/**
 * 口径对照：同一组输入，只把某一个口径开关换成它的另一档，逐字段列出变化。
 * 这一步不新增断法，也不改盘；返回根因字段、分类计数与一句话总结，供面板/独立页/工具共用。
 */
export function caliberCompare(args = {}, opts = {}) {
  const system = opts.system || args.system;
  const switches = opts.switches || CALIBER_SWITCHES[system] || [];
  if (!switches.length) return { system, switches: [], affected: 0, total: 0 };
  const base = { ...args };
  for (const k of CALIBER_IGNORE_ARGS) delete base[k];
  const rows = switches.map((sw) => {
    const current = sw.read(base);
    const alt = sw.alt(current);
    let diffs = [];
    let error = '';
    let cur = null;
    let altRes = null;
    try {
      cur = compute({ ...base, [sw.key]: current });
      altRes = compute({ ...base, [sw.key]: alt });
      diffs = diffObjects(cur, altRes);
    } catch (e) {
      error = (e && e.message) || String(e);
    }
    const roots = sortDiffs(diffs.filter((d) => rootOf(d.path))).map((d) => ({
      path: d.path,
      label: labelOf(d.path),
      from: formatValue(d.from),
      to: formatValue(d.to),
    }));
    const counts = new Map();
    for (const d of diffs) {
      const c = categoryOf(d.path) || '其他';
      counts.set(c, (counts.get(c) || 0) + 1);
    }
    const categories = [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh-Hans-CN'));
    return {
      key: sw.key,
      title: sw.title,
      short: sw.short,
      current,
      alt,
      currentLabel: sw.label(current),
      altLabel: sw.label(alt),
      total: diffs.length,
      summary: error ? '' : summarize(diffs),
      views: error ? [] : viewRows(system, cur, altRes),
      roots,
      categories,
      error,
    };
  });
  return {
    system,
    switches: rows,
    affected: rows.filter((r) => !r.error && r.total > 0).length,
    total: rows.reduce((n, r) => n + r.total, 0),
  };
}

const JU_METHODS = ['chaibu', 'chaoshen', 'zhirun'];
const TAROT_COUNTS = [1, 3, 5];
const LATE_ZI_MODES = ['same-day', 'next-day'];

/**
 * 经度守卫：入口只判 `typeof === 'number'`，于是 JSON 里的 1e999（= Infinity）
 * 会一路走到真太阳时里炸成裸 TypeError，181 这类超范围值则静默排出另一张盘。
 * 两者都比报错坏：一个把堆栈式文案交给模型，一个把错结果当成对结果说出去。
 */
function checkLongitude(value, who = '') {
  if (value === undefined || value === null || value === '') return undefined;
  const tag = who ? `${who}的` : '';
  // 只收 number 与十进制数字串。Number(true)=1、Number([])=0、Number(' ')=0 都是
  // 「看起来能转成数」的静默错值，按 1°/0° 做真太阳时还会被句柄固化。
  let n;
  if (typeof value === 'number') n = value;
  else if (typeof value === 'string') {
    const s = value.trim();
    if (!/^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(s)) {
      throw fail('E_RANGE', `${tag}经度不是十进制数字：收到「${value}」。经度写数字即可，例如北京 116.4`);
    }
    n = Number(s);
  } else {
    throw fail('E_RANGE', `${tag}经度必须是数字或数字字符串，收到 ${Array.isArray(value) ? 'array' : typeof value}`);
  }
  if (!Number.isFinite(n)) throw fail('E_RANGE', `${tag}经度不是有限数值：收到「${value}」。经度写十进制数字即可，例如北京 116.4`);
  if (n < -180 || n > 180) throw fail('E_RANGE', `${tag}经度要在 −180 到 180 之间（东经为正），收到 ${n}`);
  return n;
}

/**
 * 把主方 / 对方 / 第三方的经度统一成数字。
 * 下游按 `typeof === 'number'` 取值，所以 "86.0"（模型常给带引号的数）会被静默丢掉，
 * 少一次真太阳时修正而结果里毫无痕迹——这里先整形，再交给校验过的值。
 * 宿主层也调它：地址解析前不归一，数字串形式的显式经度会被联网结果顶掉。
 */
export function normalizeLongitudes(args) {
  const self = checkLongitude(args.longitude, '');
  const p = args.partner && typeof args.partner === 'object' ? checkLongitude(args.partner.longitude, '对方') : undefined;
  const p2 = args.partner2 && typeof args.partner2 === 'object' ? checkLongitude(args.partner2.longitude, '第三方') : undefined;
  const dirty = (self !== undefined && args.longitude !== self)
    || (p !== undefined && args.partner.longitude !== p)
    || (p2 !== undefined && args.partner2.longitude !== p2);
  if (!dirty) return args;
  const out = { ...args };
  if (self !== undefined) out.longitude = self;
  if (p !== undefined) out.partner = { ...out.partner, longitude: p };
  if (p2 !== undefined) out.partner2 = { ...out.partner2, longitude: p2 };
  return out;
}

/** 输出档位：缺省 'full'（面板与直接调用保持历史全文）；'lean' 去掉长论述与规则出处，
 *  'brief' 在 lean 上再限表行（不设体积上限）。工具层在 withInterpret 且未指定时传 brief。 */
function detailOf(value) {
  if (value === undefined || value === null || value === '') return 'full';
  if (value === 'full' || value === 'lean' || value === 'brief') return value;
  throw fail('E_INPUT', `detail 只能是 'full' / 'lean' / 'brief'：收到「${String(value).slice(0, 24)}」`);
}

/** asOf 只接受能解析成真实日期的字符串；非法值以前会静默回退到「此刻」 */
function checkAsOf(asOf) {
  // 空格串按「没给」处理，与影子盘指纹的 normalizeAsOf 同一条线：
  // 否则一边算成没钉 asOf、另一边报 E_ASOF
  if (asOf === undefined || asOf === null || (typeof asOf === 'string' && !asOf.trim())) return undefined;
  const parts = asOfParts(asOf);
  if (!parts) throw fail('E_ASOF', `无法解析 asOf：「${asOf}」，请用 2026-10-22T16:00 这种格式`);
  const { year, month, day, hour, minute } = parts;
  // 与 parseDateTime / assertCivil 同一把年份尺：asOf 只校验月日时，1500 / 2500 / 9999
  // 会一路排进紫微流月流日，农历表却只覆盖 1600–2400，出来的是一张外推盘。
  if (year < MIN_YEAR || year > MAX_YEAR) {
    throw fail('E_ASOF', `asOf 的年份超出可计算范围（${MIN_YEAR}–${MAX_YEAR}）：${asOf}`);
  }
  if (!(month >= 1 && month <= 12) || !(day >= 1 && day <= daysInMonth(year, month))) {
    throw fail('E_ASOF', `asOf 指向的日期不存在：${asOf}`);
  }
  // 时分以前不校验：asOf: '2026-06-01T25:99' 会被接受并原样回显，
  // 而小时又按 mod 24 折回当日子时——流日/流时静默错位，比报错更坏。
  // 与 parseDateTime 同一把尺：给了就必须在范围内，缺省才由下游补默认值。
  if (hour !== undefined && !(hour >= 0 && hour <= 23)) throw fail('E_ASOF', `asOf 的小时要在 0–23 之间：${asOf}`);
  if (minute !== undefined && !(minute >= 0 && minute <= 59)) throw fail('E_ASOF', `asOf 的分钟要在 0–59 之间：${asOf}`);
  return parts;
}

function computeRaw(args = {}) {
  const system = args.system;
  // mode 是三个体系共用的键，以前传错组的值会被静默忽略（convert 收到 'number' 仍按公历转农历）。
  // 这里按 system 分组校验，跨组直接报错，让模型改参数而不是拿到一张 silently wrong 的盘。
  if (args.mode !== undefined && args.mode !== null && args.mode !== '') {
    const MODE_BY_SYSTEM = {
      convert: ['solar2lunar', 'lunar2solar'],
      meihua: ['time', 'number'],
      xiaoliuren: ['time', 'number'],
    };
    const allowed = MODE_BY_SYSTEM[system];
    if (!allowed) {
      throw fail('E_INPUT', `mode 只用于 ${Object.keys(MODE_BY_SYSTEM).join(' / ')}；${system || '当前体系'} 不收 mode`);
    }
    if (!allowed.includes(args.mode)) {
      throw fail('E_INPUT', `${system} 的 mode 只能是 ${allowed.join(' / ')}，收到「${String(args.mode).slice(0, 24)}」`);
    }
  }
  // gender / direction 的枚举写在 schema 里，引擎直调也得守同一份契约：
  // 六爻曾把「女」静默当 male 出用神，direction 拼错则静默按 general——
  // 换一个用神、换一套断法，盘面却看不出任何异常。
  if (args.gender !== undefined && args.gender !== null && args.gender !== ''
    && args.gender !== 'male' && args.gender !== 'female') {
    throw fail('E_INPUT', `gender 只能是 male / female，收到「${String(args.gender).slice(0, 24)}」`);
  }
  if (args.direction !== undefined && args.direction !== null && args.direction !== ''
    && !['general', 'wealth', 'career', 'love', 'health', 'study', 'travel'].includes(args.direction)) {
    throw fail('E_INPUT', `direction 只能是 general / wealth / career / love / health / study / travel，收到「${String(args.direction).slice(0, 24)}」`);
  }
  // 风水 fortuneYear 以前只认整数：2026.5 被静默当成「没给」，整块年飞星消失。
  if (args.fortuneYear !== undefined && args.fortuneYear !== null && args.fortuneYear !== '') {
    const n = Number(args.fortuneYear);
    if (!Number.isInteger(n)) {
      throw fail('E_INPUT', `fortuneYear 要是整数年份，收到「${args.fortuneYear}」`);
    }
    args = { ...args, fortuneYear: n };
  }
  if (system === 'bazi') {
    const dt = parseDateTime(args.datetime);
    const asOf = checkAsOf(args.asOf);
    const result = buildBazi({
      ...dt,
      gender: requireGender(args.gender),
      longitude: typeof args.longitude === 'number' ? args.longitude : undefined,
      address: typeof args.address === 'string' ? args.address : undefined,
      geo: args.geo && typeof args.geo === 'object' ? args.geo : undefined,
      lateZi: bool(args.lateZi, true),
      trueSolar: bool(args.trueSolar, true),
      dst: bool(args.dst, true),
      // 流年表默认从「今年」起排；要复现历史结论就把基准年钉死
      nowYear: asOf ? asOf.year : undefined,
      // 时辰未知：三柱模式（时柱不排、精度降到日、摘要首行固定提示）
      hourUnknown: bool(args.hourUnknown),
    });
    return { ...result, ...(asOf ? { asOf } : {}), precision: dt.precision, summary: baziText(result) };
  }
  if (system === 'ziwei') {
    // 命宫由「生月 + 生时支」定：时支未知则整盘无处落脚，没有「大概的紫微盘」这种东西
    if (bool(args.hourUnknown)) {
      throw fail('HOUR_UNKNOWN', '紫微必须有出生时刻：命宫由生月与生时支定，时支未知则整盘不成立。请补上出生时刻，或改用八字三柱模式只看年/月/日。');
    }
    // 与奇门同一个别名口径：lateZi 是八字/六壬的参数名，紫微的历史参数名是 lateZishi。
    // 不归一的话 revise「晚子时算次日」会照常回执已应用，盘却按默认 current-day 排。
    if (args.lateZi !== undefined && args.lateZishi === undefined) {
      args = { ...args, lateZishi: bool(args.lateZi, true) ? 'next-day' : 'current-day' };
    }
    const dt = parseDateTime(args.datetime);
    const asOf = checkAsOf(args.asOf);
    const result = buildZiwei({
      ...dt,
      gender: requireGender(args.gender),
      leapMonth: args.leapMonth,
      leapAsNext: bool(args.leapAsNext),
      ...ziweiSchoolArgs(args),
      longitude: typeof args.longitude === 'number' ? args.longitude : undefined,
      address: typeof args.address === 'string' ? args.address : undefined,
      geo: args.geo && typeof args.geo === 'object' ? args.geo : undefined,
      trueSolar: bool(args.trueSolar, true),
      dst: bool(args.dst, true),
      // 流月/流日/流时的基准时刻：默认本机此刻，可用 asOf 指定以便复现
      asOf,
    });
    return { ...result, ...(asOf ? { asOf } : {}), precision: dt.precision, summary: ziweiText(result) };
  }
  if (system === 'tarot') {
    // 给了牌阵名就由牌阵定张数，count 只在没给名字时兜底（1/3/5）
    const hasSpread = args.spread !== undefined && args.spread !== null && String(args.spread).trim() !== '';
    let count;
    if (hasSpread) {
      if (SPREAD_KEYS.indexOf(String(args.spread).trim().toLowerCase()) < 0) {
        throw fail('E_SPREAD', `塔罗牌阵只能是 ${SPREAD_KEYS.join(' / ')}，收到「${args.spread}」`);
      }
      count = undefined;
    } else {
      count = args.count === undefined || args.count === null || args.count === '' ? 3 : Number(args.count);
      if (!TAROT_COUNTS.includes(count)) {
        throw fail('E_COUNT', `塔罗张数只能是 1 / 3 / 5，收到「${args.count}」`);
      }
    }
    if (!isSeed(args.seed)) throw fail('E_INPUT', `seed 必须是数字，收到「${args.seed}」`);
    const asOf = checkAsOf(args.asOf);
    // 抽牌不看时间：castAt 只记录此刻（或 asOf），避免误用出生时间；给了 seed 就能复现同一次抽牌
    const result = drawTarot({ spread: hasSpread ? args.spread : undefined, count, question: args.question, at: args.asOf, random: randomOf(args.seed) });
    if (args.seed !== undefined && args.seed !== null && args.seed !== '') result.seed = Number(args.seed);
    return { ...result, ...(asOf ? { asOf } : {}), summary: tarotText(result) };
  }
  if (system === 'daliuren') {
    const dt = parseDateTime(args.datetime);
    const lateZi = bool(args.lateZi, true);
    const result = buildDaliuren({ ...dt, lateZi });
    result.lateZi = lateZi;
    return { ...result, precision: dt.precision, summary: daliurenText(result) };
  }
  if (system === 'qimen') {
    const dt = parseDateTime(args.datetime);
    if (args.juMethod !== undefined && !JU_METHODS.includes(args.juMethod)) {
      throw fail('E_INPUT', `juMethod 只能是 chaibu / chaoshen / zhirun，收到「${args.juMethod}」`);
    }
    // 全插件只有"晚子时"这一件事，参数名不该按体系分裂：
    // lateZiHourMode 是奇门的历史参数名，lateZi 是八字/六壬的；两者互为别名。
    const mode = args.lateZiHourMode !== undefined
      ? args.lateZiHourMode
      : args.lateZi === undefined || args.lateZi === null ? undefined : bool(args.lateZi) ? 'next-day' : 'same-day';
    if (mode !== undefined && !LATE_ZI_MODES.includes(mode)) {
      throw fail('E_INPUT', `lateZiHourMode 只能是 same-day / next-day，收到「${mode}」`);
    }
    const lateZiHourMode = mode === 'next-day' ? 'next-day' : 'same-day';
    const result = buildQimen({ ...dt, lateZiHourMode, juMethod: args.juMethod });
    result.lateZiHourMode = lateZiHourMode;
    return { ...result, summary: qimenText(result) };
  }
  if (system === 'hepan') {
    // 双方（以及可选的第三方）夫妻宫、大运都依赖时支：任一方时辰未知就不出盘，
    // 免得「差不多」的合盘误导决定。第三方只在给了 partner2 时才参与校验，
    // 但一旦参与，口径必须和主方、对方一致——不能主方缺时柱就拦、第三方缺时柱却照排。
    const unknownSide = bool(args.hourUnknown)
      || (args.partner && bool(args.partner.hourUnknown))
      || (args.partner2 && bool(args.partner2.hourUnknown));
    if (unknownSide) {
      throw fail('HOUR_UNKNOWN', '合盘需要每一方都有出生时刻：夫妻宫与大运都依赖时支。请补齐时刻后再看，或用八字三柱模式各自看年/月/日。');
    }
    const partner = args.partner;
    if (!partner || typeof partner !== 'object') {
      throw fail('E_PARTNER', '合盘需要 partner：{ datetime, gender, address? }，其中 partner.datetime 是对方的公历出生时间');
    }
    if (!partner.datetime) {
      throw fail('E_PARTNER', '缺少 partner.datetime（对方的公历出生时间），例如 partner: {"datetime":"1992-03-03T10:00","gender":"female"}');
    }
    const partner2 = args.partner2;
    if (partner2 !== undefined && partner2 !== null) {
      if (typeof partner2 !== 'object' || Array.isArray(partner2)) {
        throw fail('E_PARTNER', 'partner2 需要 { datetime, gender, address? }；不想看三方就整段省略（null 视同未传）');
      }
      if (!partner2.datetime) {
        throw fail('E_PARTNER', '缺少 partner2.datetime（第三方的公历出生时间），例如 partner2: {"datetime":"1988-09-09T08:00","gender":"male"}');
      }
    }
    const chart = args.chart === 'ziwei' ? 'ziwei' : 'bazi';
    // 性别决定双方大运/大限顺逆，两边都不能用默认值
    const sideOf = (src, who) => {
      const dt = parseDateTime(src.datetime);
      // 紫微读的是历史参数名 lateZishi，合盘这一层若不转写，`chart:'ziwei', lateZi:false`
      // 会排出与 true 完全相同的盘（八字合盘同一开关却生效）。
      const lateZishi = src.lateZishi !== undefined
        ? src.lateZishi
        : src.lateZi === undefined || src.lateZi === null || src.lateZi === ''
          ? undefined
          : bool(src.lateZi, true) ? 'next-day' : 'current-day';
      return {
        ...dt,
        gender: requireGender(src.gender, who),
        trueSolar: src.trueSolar,
        lateZi: src.lateZi,
        ...(lateZishi !== undefined ? { lateZishi } : {}),
        // 紫微的闰月口径同属「读盘时才算」的参数，漏传会让合盘与单盘在闰月出生时差一个月
        ...(src.leapMonth !== undefined ? { leapMonth: src.leapMonth } : {}),
        ...(src.leapAsNext !== undefined ? { leapAsNext: bool(src.leapAsNext) } : {}),
        dst: bool(src.dst, true),
        address: typeof src.address === 'string' ? src.address : undefined,
        longitude: typeof src.longitude === 'number' ? src.longitude : undefined,
        geo: src.geo && typeof src.geo === 'object' ? src.geo : undefined,
      };
    };
    const sideA = sideOf(args, '你（主方）');
    const sideB = sideOf(partner, '对方');
    const build = (x, y) => (chart === 'ziwei' ? buildZiweiHepan({ a: x, b: y }) : buildHepan({ a: x, b: y }));
    const result = build(sideA, sideB);
    if (partner2) {
      const sideC = sideOf(partner2, '第三方');
      result.triple = tripleOf([
        { key: 'a-b', a: '你', b: '对方', result },
        { key: 'a-c', a: '你', b: '第三方', result: build(sideA, sideC) },
        { key: 'b-c', a: '对方', b: '第三方', result: build(sideB, sideC) },
      ]);
    }
    return { ...result, summary: hepanText(result) };
  }
  if (system === 'meihua') {
    let result;
    // 时间起卦必须与其它体系过同一把日期尺：以前把原串直接交给梅花私有解析器，
    // 1990-02-30 / 13 月 / 25:00 都会被接受，再被正规化成另一天起卦。
    if (args.mode !== 'number') parseDateTime(args.datetime);
    try {
      result = buildMeihua({
        mode: args.mode === 'number' ? 'number' : 'time',
        datetime: args.datetime,
        upper: args.upper,
        lower: args.lower,
        changing: args.changing,
        lateZi: args.lateZi,
      });
    } catch (e) {
      // 引擎自己定过码的（E_RANGE 越界 / E_INPUT 缺参）原样透传：一律压成 E_INPUT，
      // 调用方就分不清「换个时间重试」和「补参数」，「参数不完整」也是句假话——参数齐，只是年号出了表。
      const message = (e && e.message) || String(e);
      throw fail((e && e.code) || 'E_INPUT', (e && e.code) ? message : `梅花起卦参数不完整：${message}`);
    }
    return { ...result, summary: meihuaText(result) };
  }
  if (system === 'liuyao') {
    if (!isSeed(args.seed)) throw fail('E_INPUT', `seed 必须是数字，收到「${args.seed}」`);
    let lines;
    if (args.lines === undefined || args.lines === null) {
      // 没给爻值 = 随机摇卦；给了 seed 则同一次摇卦可复现
      lines = tossLines(randomOf(args.seed));
    } else {
      if (!Array.isArray(args.lines)) {
        throw fail('E_LINES', 'lines 必须是数组：自下而上 6 个爻值（6 老阴 / 7 少阳 / 8 少阴 / 9 老阳）');
      }
      if (args.lines.length !== 6) {
        // 以前这里会静默改随机摇卦：用户手抖少填一个，拿到的却是一张"看起来正常"的随机盘
        throw fail('E_LINES', `六爻需要正好 6 个爻值（自下而上），收到 ${args.lines.length} 个；留空则由引擎随机摇卦`);
      }
      lines = args.lines.map(Number);
    }
    let dayGanZhi;
    let asOf = null;
    // 六神按「起卦日」的日干起：给了 datetime 用它，给了 asOf 用 asOf，都没有才回落到本机当天
    const stamp = args.datetime ? parseDateTime(args.datetime) : checkAsOf(args.asOf);
    if (stamp) {
      if (!args.datetime) asOf = stamp;
      const g = ganzhiName(dayGanzhiIndex(toJDN(stamp.year, stamp.month, stamp.day)));
      dayGanZhi = { stem: g.stem, branch: g.branch, name: g.name };
    }
    let result;
    try {
      result = buildLiuyao({ lines, question: args.question, dayGanZhi });
    } catch (e) {
      // 带码的原样透传：E_LINES 之外还有 E_INPUT（参数形状不对），压成 E_LINES 会把「没给爻值」说成「爻值不对」
      throw fail((e && e.code) || 'E_LINES', e && e.message ? e.message : e);
    }
    // 用神挂在结果上：摘要、面板、解析三层读同一份，避免各自取一次走散
    const ug = yongshenOf(result, { direction: args.direction, gender: args.gender });
    if (ug.liuqin) result.useGod = ug;
    // 月建按节气换月、与八字同源：从同一个 snapshot 取月支，取不到就只按日辰算
    let monthBranch = null;
    if (stamp) {
      try {
        const snap = buildSnapshot({ year: stamp.year, month: stamp.month, day: stamp.day, hour: stamp.hour, minute: stamp.minute });
        monthBranch = (snap.monthGanZhi || '')[1] || null;
      } catch {
        monthBranch = null;
      }
    }
    // 全卦逐爻旺衰不依赖用神：没指定所问之事也要能看整张卦的气
    const hexStrength = hexagramStrength(result, { monthBranch, dayBranch: result.dayGanZhi.branch });
    if (hexStrength) result.hexStrength = hexStrength;
    // 化进/化退的力重：与旺衰同一套五态/五关系，只说走不走得动
    const jtPower = jinTuiPower(result, { monthBranch, dayBranch: result.dayGanZhi.branch });
    if (jtPower) result.jinTuiPower = jtPower;
    if (ug.liuqin) {
      const strength = yongshenStrength(result, ug, { monthBranch, dayBranch: result.dayGanZhi.branch });
      if (strength) result.useGodStrength = strength;
      // 伏神出伏条件：飞伏生克叠月建日辰，只判条件、不出应期
      const chufu = fushenAccess(result, ug, { monthBranch, dayBranch: result.dayGanZhi.branch });
      if (chufu) result.fushenAccess = chufu;
      // 应期线索：只列逢值/逢冲/逢合与旬空的出空/冲空，再给快慢方向，不换算日期
      const yq = yingqiWindow(result, ug, { monthBranch });
      if (yq) result.yingqi = yq;
    }
    if (args.seed !== undefined && args.seed !== null && args.seed !== '') result.seed = Number(args.seed);
    return { ...result, ...(asOf ? { asOf } : {}), summary: liuyaoText(result) };
  }
  if (system === 'almanac') {
    const dt = parseDateTime(args.datetime);
    const result = buildAlmanac({ year: dt.year, month: dt.month, day: dt.day });
    return { ...result, summary: almanacText(result) };
  }
  if (system === 'zeri') {
    const candMode = args.candidates !== undefined && args.candidates !== null;
    // startDate 必须显式：择日要「从哪天起看」，缺了不能拿本机今天静默代填；候选日模式改用 candidates
    if (!candMode && (typeof args.startDate !== 'string' || !args.startDate.trim())) {
      throw fail('E_INPUT', '择日需要 startDate（公历 YYYY-MM-DD，起算日）；可另给 days（1–60，默认 30）与 shengXiao（当事人属相）。只想比几天，改给 candidates: ["2026-12-01","2026-12-08"]');
    }
    let result;
    try {
      result = buildZeri({
        task: args.task,
        startDate: args.startDate,
        days: args.days,
        shengXiao: args.shengXiao,
        candidates: args.candidates,
      });
    } catch (e) {
      // 同梅花：带码的（E_RANGE 越界）原样透传，别让择日的年份问题看起来像参数格式问题
      throw fail((e && e.code) || 'E_INPUT', (e && e.message) || String(e));
    }
    return { ...result, summary: zeriText(result) };
  }
  if (system === 'chenggu') {
    const dt = parseDateTime(args.datetime);
    const hasTime = /[T\s]\d{1,2}:\d{1,2}/.test(String(args.datetime));
    const hour = Number.isInteger(args.hour) ? args.hour : hasTime ? dt.hour : null;
    if (hour === null || hour < 0 || hour > 23) {
      throw fail('E_INPUT', '称骨必须给时辰：datetime 带时分（如 1990-08-15T10:00），或额外给 hour（0–23）——缺时辰四柱不齐');
    }
    const result = buildChenggu({ year: dt.year, month: dt.month, day: dt.day, hour, minute: hasTime ? dt.minute : 0, lateZi: args.lateZi });
    return { ...result, summary: chengguText(result) };
  }
  if (system === 'convert') {
    const mode = args.mode === 'lunar2solar' ? 'lunar2solar' : 'solar2lunar';
    let result;
    if (mode === 'lunar2solar') {
      if (args.lunarYear == null || args.lunarMonth == null || args.lunarDay == null) {
        throw fail('E_INPUT', '农历转公历需要 lunarYear / lunarMonth / lunarDay（闰月另加 isLeapMonth: true）');
      }
      result = buildConvert({
        mode,
        lunarYear: Number(args.lunarYear),
        lunarMonth: Number(args.lunarMonth),
        lunarDay: Number(args.lunarDay),
        isLeapMonth: bool(args.isLeapMonth),
      });
    } else {
      const dt = parseDateTime(args.datetime);
      result = buildConvert({ mode, year: dt.year, month: dt.month, day: dt.day });
    }
    return { ...result, summary: convertText(result) };
  }
  if (system === 'xiaoliuren') {
    const dt = args.datetime ? parseDateTime(args.datetime) : null;
    const result = buildXiaoliuren({
      mode: args.mode === 'number' ? 'number' : 'time',
      date: typeof args.date === 'string' && args.date.trim() ? args.date : dt ? `${dt.year}-${dt.month}-${dt.day}` : undefined,
      hour: Number.isInteger(args.hour) ? args.hour : dt && /[T\s]\d{1,2}:\d{1,2}/.test(String(args.datetime)) ? dt.hour : undefined,
      num1: args.num1,
      num2: args.num2,
      num3: args.num3,
      question: args.question,
      lateZi: args.lateZi,
    });
    return { ...result, summary: xiaoliurenText(result) };
  }
  if (system === 'star') {
    const dt = parseDateTime(args.datetime);
    const result = buildStar({ year: dt.year, month: dt.month, day: dt.day });
    return { ...result, summary: starText(result) };
  }
  if (system === 'numerology') {
    const dt = parseDateTime(args.datetime);
    const result = buildNumerology({ year: dt.year, month: dt.month, day: dt.day });
    return { ...result, summary: numerologyText(result) };
  }
  if (system === 'wuyunliuqi') {
    const dt = parseDateTime(args.datetime);
    const result = buildWuyunliuqi({
      year: dt.year,
      month: dt.month,
      day: dt.day,
      hour: dt.hour,
      minute: dt.minute,
    });
    return { ...result, summary: wuyunliuqiText(result) };
  }
  if (system === 'taiyi') {
    const dt = parseDateTime(args.datetime);
    const result = buildTaiyi({ year: dt.year, month: dt.month, day: dt.day, hour: dt.hour });
    return { ...result, summary: taiyiText(result) };
  }
  if (system === 'constitution') {
    // 与 mbti 同一套路：没给答案先发卷，别让模型替人打分（体质题答歪了，判定会整体偏掉）
    if (args.answers === undefined || args.answers === null) {
      const paper = constitutionPaper();
      return { ...paper, summary: constitutionPaperText(paper) };
    }
    const result = buildConstitution({ answers: args.answers });
    return { ...result, summary: constitutionText(result) };
  }
  if (system === 'mbti') {
    // 没给答案就先发问卷：让模型把 24 题交给用户逐题打分，而不是自己编一个类型
    if (args.answers === undefined || args.answers === null) {
      const paper = mbtiPaper();
      return { ...paper, summary: mbtiPaperText(paper) };
    }
    const result = buildMbti({ answers: args.answers });
    return { ...result, summary: mbtiText(result) };
  }
  if (system === 'trend') {
    const dt = parseDateTime(args.datetime);
    // 「现在在第几步」要有个当前年份；引擎不读挂钟，只认 asOf。
    // 不给 asOf 就不标当前位置（summary 会少一句，但结果可复现）。
    const nowParts = args.asOf ? checkAsOf(args.asOf) : undefined;
    const result = buildTrend({
      ...dt,
      nowYear: nowParts ? nowParts.year : undefined,
      gender: requireGender(args.gender),
      toAge: args.toAge,
      lateZi: bool(args.lateZi, true),
      trueSolar: bool(args.trueSolar, true),
      dst: bool(args.dst, true),
      longitude: typeof args.longitude === 'number' ? args.longitude : undefined,
      address: typeof args.address === 'string' ? args.address : undefined,
      geo: args.geo && typeof args.geo === 'object' ? args.geo : undefined,
      hourUnknown: bool(args.hourUnknown),
    });
    // 趋势没有独立的 dayun 字段（大运在 buildTrend 内部用），所以精度标记挂在结果顶层
    return {
      ...result,
      ...(bool(args.hourUnknown) ? { hourUnknown: true, hourPrecision: 'day' } : {}),
      precision: dt.precision,
      summary: trendText(result),
    };
  }
  if (system === 'fengshui') {
    if (args.action != null && !['natal', 'advise', 'xuankong'].includes(args.action)) {
      throw fail('E_INPUT', `风水 action 只能是 natal / advise / xuankong，收到「${String(args.action).slice(0, 24)}」`);
    }
    const action = args.action === 'advise' ? 'advise' : args.action === 'xuankong' ? 'xuankong' : 'natal';
    if (action === 'xuankong') {
      const result = buildFengshui({
        action,
        sitting: args.sitting,
        facing: args.facing,
        ...(args.period !== undefined ? { period: args.period } : {}),
        ...(args.fortuneYear !== undefined ? { fortuneYear: args.fortuneYear } : {}),
        ...(typeof args.sittingOffset === 'number' ? { sittingOffset: args.sittingOffset } : {}),
        ...(typeof args.sittingDegree === 'number' ? { sittingDegree: args.sittingDegree } : {}),
        ...(typeof args.facingOffset === 'number' ? { facingOffset: args.facingOffset } : {}),
        ...(typeof args.facingDegree === 'number' ? { facingDegree: args.facingDegree } : {}),
        ...(typeof args.fortuneDate === 'string' ? { fortuneDate: args.fortuneDate } : {}),
        ...(typeof args.fortuneTime === 'string' ? { fortuneTime: args.fortuneTime } : {}),
        dst: bool(args.dst, true),
      });
      return { ...result, summary: fengshuiText(result) };
    }
    if (action === 'advise') {
      const result = buildFengshui({
        action,
        sitting: args.sitting,
        facing: args.facing,
        ...(args.datetime ? parseDateTime(args.datetime) : {}),
        ...(args.gender === 'male' || args.gender === 'female' ? { gender: args.gender } : {}),
        dst: bool(args.dst, true),
      });
      return { ...result, summary: fengshuiText(result) };
    }
    const dt = parseDateTime(args.datetime);
    const result = buildFengshui({
      action: 'natal',
      year: dt.year, month: dt.month, day: dt.day,
      gender: requireGender(args.gender),
      fortuneYear: args.fortuneYear,
      dst: bool(args.dst, true),
    });
    return { ...result, summary: fengshuiText(result) };
  }
  if (system === 'name') {
    if (args.action != null && !['assess', 'generate'].includes(args.action)) {
      throw fail('E_INPUT', `起名 action 只能是 assess / generate，收到「${String(args.action).slice(0, 24)}」`);
    }
    const action = args.action === 'generate' ? 'generate' : 'assess';
    const birth = args.datetime
      ? parseDateTime(args.datetime)
      : (Number.isInteger(args.year) && Number.isInteger(args.month) && Number.isInteger(args.day)
        ? {
          year: args.year, month: args.month, day: args.day,
          ...(Number.isInteger(args.hour) ? { hour: args.hour } : {}),
          ...(Number.isInteger(args.minute) ? { minute: args.minute } : {}),
        }
        : {});
    const result = buildName({
      action,
      surname: args.surname,
      givenName: args.givenName,
      limit: args.limit,
      charElements: args.charElements && typeof args.charElements === 'object' ? args.charElements : undefined,
      strokeOverrides: args.strokeOverrides && typeof args.strokeOverrides === 'object' ? args.strokeOverrides : undefined,
      surnameStrokes: args.surnameStrokes && typeof args.surnameStrokes === 'object' ? args.surnameStrokes : undefined,
      ...birth,
      ...(args.gender === 'male' || args.gender === 'female' ? { gender: args.gender } : {}),
      ...(args.datetime ? {
      lateZi: bool(args.lateZi, true),
      trueSolar: bool(args.trueSolar, true),
      dst: bool(args.dst, true),
        longitude: typeof args.longitude === 'number' ? args.longitude : undefined,
        address: typeof args.address === 'string' ? args.address : undefined,
        geo: args.geo && typeof args.geo === 'object' ? args.geo : undefined,
      } : {}),
    });
    return { ...result, summary: nameText(result) };
  }
  if (!system) {
    throw fail('E_INPUT', '缺少 system，可选：bazi（四柱八字）、ziwei（紫微斗数）、liuyao（六爻）、meihua（梅花易数）、daliuren（大六壬）、qimen（奇门遁甲）、hepan（合盘）、tarot（塔罗）、almanac（黄历）、zeri（择日）、chenggu（称骨）、xiaoliuren（小六壬）、star（星座）、numerology（生命数字）、mbti（十六型人格问卷）、trend（人生 K 线）、fengshui（风水）、name（起名）、constitution（中医体质）、wuyunliuqi（五运六气）、taiyi（太乙神数）、convert（公农历互转）。');
  }
  throw fail('E_SYSTEM', `未知体系「${system}」，可选：bazi（四柱八字）、ziwei（紫微斗数）、liuyao（六爻）、meihua（梅花易数）、daliuren（大六壬）、qimen（奇门遁甲）、hepan（合盘）、tarot（塔罗）、almanac（黄历）、zeri（择日）、chenggu（称骨）、xiaoliuren（小六壬）、star（星座）、numerology（生命数字）、mbti（十六型人格问卷）、trend（人生 K 线）、fengshui（风水）、name（起名）、constitution（中医体质）、wuyunliuqi（五运六气）、taiyi（太乙神数）、convert（公农历互转）。`);
}

/** 黄历文本 */
function almanacText(r) {
  const g = r.ganzhi;
  const jq = r.jieQi && r.jieQi.next ? `　下一节：${r.jieQi.next.name} ${r.jieQi.next.date}` : '';
  const god = r.dayGod ? `值日：${r.dayGod.name}（${r.dayGod.type}·${r.dayGod.luck}）` : '';
  const xiu = r.xiu ? `二十八宿：${r.xiu.name}宿（${r.xiu.luck}·${r.xiu.zheng}·${r.xiu.animal}）` : '';
  const tai = r.taiShen ? `胎神：${r.taiShen}` : '';
  const pos = r.positions
    ? `吉神方位：喜神${r.positions.xiShen || '—'}　财神${r.positions.caiShen || '—'}　福神${r.positions.fuShen ? r.positions.fuShen.dir : '—'}　阳贵${r.positions.yangGui ? r.positions.yangGui.dir : '—'}　阴贵${r.positions.yinGui ? r.positions.yinGui.dir : '—'}`
    : '';
  const lucky = r.lucky ? `吉配生肖：六合${r.lucky.liuhe || '—'}　三合${(r.lucky.sanhe || []).join('、') || '—'}` : '';
  const nayin = r.nayin && r.nayin.day ? `日柱纳音：${r.nayin.day.name}` : '';
  const hours = (r.hours || []).map((h) => `${h.zhi}${h.ganZhi.slice(0, 1)}·${h.shen}${h.luck === '吉' ? '吉' : '凶'}`).join(' ');
  return [
    `【黄历】${r.meta.date} ${r.meta.weekday}　${r.lunar.text}`,
    `干支：${g.year}年　${g.month}月　${g.day}日　属${g.shengXiao}`,
    ...(r.meta.boundaryNote ? [`　${r.meta.boundaryNote}`] : []),
    `建除：${r.zhiXing}日　冲：${r.chong.text}${r.chong.sha ? `（${r.chong.sha}）` : ''}　${god}`,
    [xiu, nayin, tai].filter(Boolean).join('　'),
    `宜：${r.yi.join('、')}`,
    `忌：${r.ji.join('、')}`,
    pos,
    lucky,
    hours ? `时辰吉凶：${hours}` : '',
    `节气：上一节 ${r.jieQi.prev ? `${r.jieQi.prev.name} ${r.jieQi.prev.date}` : '—'}${jq}`,
    r.dailyHexagram ? `每日一卦：${r.dailyHexagram.name}　${r.dailyHexagram.meaning || ''}` : '',
    `口径：${r.meta.scope}`,
  ].filter(Boolean).join('\n');
}

/** 择日文本 */
function zeriText(r) {
  const cand = r.compare && r.compare.mode === 'candidates';
  const head = cand
    ? `【择日·${r.meta.task}】候选 ${r.meta.days} 天：${r.meta.candidates.join('、')}${r.meta.shengXiao ? `　当事人属${r.meta.shengXiao}` : '（未给属相，未做冲煞排除）'}`
    : `【择日·${r.meta.task}】${r.meta.startDate} 起 ${r.meta.days} 天${r.meta.shengXiao ? `　当事人属${r.meta.shengXiao}` : '（未给属相，未做冲煞排除）'}`;
  const top = r.days.slice().sort((a, b) => b.score - a.score).slice(0, cand ? 12 : 5)
    .map((d) => {
      const g = d.grade ? `，卷十${d.grade.label}·${d.grade.decision}` : '';
      return `· ${d.date} ${d.weekday}　${d.verdict}（${d.score}分${g}）　宜${d.yi.slice(0, 3).join('/')}　${d.reasons.join('；') || '无特别加减分'}`;
    });
  const bestLine = cand
    ? (r.compare.best
      ? `这一组里最优：${r.compare.best.date}（${r.compare.best.score}分，${r.compare.best.verdict}）`
        + (r.compare.best.ties.length > 1 ? `；同分：${r.compare.best.ties.filter((d) => d !== r.compare.best.date).join('、')}` : '')
      : '这一组都因冲属相被排除，没有可用的日子')
    : `推荐日：${r.best.length ? r.best.join('、') : '本期无（都不够推荐分）'}`;
  return [
    head,
    bestLine,
    `推荐日：${r.best.length ? r.best.join('、') : '无'}`,
    `可用日：${r.usable.length ? r.usable.join('、') : '无'}`,
    `回避日：${r.avoid.length ? r.avoid.slice(0, 6).join('、') : '无'}`,
    cand ? '候选日逐日：' : '逐日排序：',
    ...top,
    ...(cand ? [`比较口径：${r.compare.note}`] : []),
    `神煞依据：${r.shenshaRef.text}；起法 ${r.shenshaRef.volumes.join('、')}。未实现起法：${r.shenshaRef.unsupported.join('、')}（不计分，逐日 shensha.unsupported 列出）。`,
    ...(r.shenshaRef.juan10
      ? [`卷十依据：${r.shenshaRef.juan10.text}（${r.shenshaRef.juan10.corpusLines}）；${r.shenshaRef.juan10.thresholdsNote}`]
      : []),
    `口径：${r.meta.scope}`,
  ].join('\n');
}

/** 称骨文本 */
function chengguText(r) {
  const s = r.song || {};
  const lines = [
    `【称骨】${r.input.solar} ${r.lunar.text}`,
    `四项：${r.weights.year.label}　${r.weights.month.label}　${r.weights.day.label}　${r.weights.hour.label}`,
    `合计：${r.total.label}（${r.verdict.band}）`,
    `歌诀（${r.total.label}）：${s.text || '—'}`,
    `释义：${s.plain || '—'}`,
    `分档白话：${r.verdict.text}`,
    '口径：骨重与歌诀为通行本口径（各版本歌诀有异文），释义为白话自撰，属民俗娱乐参考。',
  ];
  return lines.join('\n');
}

/** 小六壬文本 */
function xiaoliurenText(r) {
  // 所问从顶层读（引擎把 question 挂顶层，不进 meta——meta 要能被句柄完整复现）
  const q = r.question || (r.meta && r.meta.question) || null;
  return [
    `【小六壬·${r.meta.mode}】${q ? `所问：${q}` : ''}`,
    r.meta.originText,
    `落宫：${r.steps.join(' → ')}`,
    `断语：${r.result.palace}（${r.result.luck}）　${r.result.text}`,
  ].join('\n');
}

/** 星座文本 */
function starText(r) {
  return [
    `【星座】${r.meta.date}　${r.sign.name}（${r.sign.element}·守护星${r.sign.planet}）`,
    `区间：${r.sign.range}　关键词：${r.sign.keywords}　契合：${r.sign.compatible}`,
    `当日基调：${r.daily.tone}`,
    r.daily.dims.map((d) => `· ${d.name}：${'★'.repeat(d.stars)}${'☆'.repeat(5 - d.stars)}　${d.text}`).join('\n'),
    `幸运色：${r.daily.luckyColor}　幸运数字：${r.daily.luckyNumber}`,
    '口径：当日基调由日期哈希确定性生成（同日同结果），纯娱乐向。',
  ].join('\n');
}

/** 公农历互转文本 */
function convertText(r) {
  const g = r.ganzhi;
  const dir = r.meta.mode === 'lunar2solar' ? '农历 → 公历' : '公历 → 农历';
  return [
    `【公农历转换·${dir}】${r.lunar.text} ⇄ ${r.solar.text} ${r.meta.weekday}`,
    `干支：${g.year}年　${g.month}月　${g.day}日　属${g.shengXiao}${g.springYear && g.springYear !== g.year ? `（春节界为${g.springYear}年）` : ''}`,
    ...(r.meta.note ? [`注：${r.meta.note}`] : []),
    `口径：${r.meta.scope}`,
  ].join('\n');
}

/** 生命数字文本 */
function numerologyText(r) {
  return [
    `【生命数字】${r.meta.date}（西方数字学，与八字/紫微不可互证）`,
    ...r.parts.map((p) => `${p.name}：${p.number}（${p.meaning.title}）　${p.meaning.keywords}\n　倾向：${p.meaning.tendency}\n　课题：${p.meaning.lesson}`),
  ].join('\n');
}

/** 十六型人格文本 */
/** 中医体质文本 */
/** 五运六气的纯文本版（对话里直接读）。 */
function taiyiText(r) {
  const L = [];
  L.push(`太乙积年 ${r.meta.jinian}，残年 ${r.meta.rest360}，${r.meta.dunText}${r.meta.ju}局。`);
  L.push(`${r.year.jiName}${r.year.jiYear}年，${r.year.yuanName}第${r.year.yuanYear}年。`);
  L.push(`太乙在${r.taiyi.palaceName}宫（第${r.taiyi.palace}宫，${r.taiyi.dir}），第${r.taiyi.yearInPalace}年，${r.taiyi.li}。`);
  L.push(`八门：${r.gate.gate}。`);
  L.push(`文昌在${r.wenchang.pos}（${r.wenchang.god}，${r.wenchang.palaceName}宫）。`);
  L.push(`计神在${r.jishen.branch}（${r.jishen.god}），始击在${r.shiji.pos}（${r.shiji.god}，${r.shiji.palaceName}宫）。`);
  L.push(`主算 ${r.suan.zhu}：主大将${r.jiang.zhuDaName}宫、主参将${r.jiang.zhuCanName}宫；客算 ${r.suan.ke}：客大将${r.jiang.keDaName}宫、客参将${r.jiang.keCanName}宫。`);
  L.push(r.geju.list.length ? `格局：${r.geju.list.join('；')}。` : '四将之间不相犯，没有掩、迫、囚、格、关。');
  L.push(`定目在${r.dingmu.pos}（${r.dingmu.god}，${r.dingmu.palaceName}宫）。`);
  L.push(`三基：君基${r.sanji.jun}、臣基${r.sanji.chen}、民基${r.sanji.min}；五福在${r.wufu.palaceName}宫，大游在${r.dayou.palaceName}宫。`);
  L.push(`十精：天乙${r.shijing.tianyi}、地乙${r.shijing.diyi}、直符${r.shijing.zhifu}、四神${r.shijing.sishen}、小游${r.shijing.xiaoyou}。`);
  L.push(`数和－主算：${r.heshu.zhu.text} 客算：${r.heshu.ke.text}`);
  const sj = r.shenjiang || {};
  if (sj.rows) {
    const goods = sj.goods && sj.goods.length ? sj.goods.join('、') : '无';
    const bads = sj.bads && sj.bads.length ? sj.bads.join('、') : '无';
    L.push(`神将：${sj.stem}日（${sj.day ? '昼贵' : '夜贵'}）起${sj.startBranch}、${sj.dir > 0 ? '顺' : '逆'}行；在吉神下的有 ${goods}；在凶神下的有 ${bads}。`);
  }
  if (r.verdict) L.push(`判辞：${r.verdict.label}。`);
  L.push(`月计：太乙在${r.month.taiyi.palaceName}宫（第${r.month.taiyi.unitInPalace}月），天目${r.month.mu.pos}（${r.month.mu.god}），计神在${r.month.jishen.branch}。`);
  L.push(`日计：太乙在${r.day.taiyi.palaceName}宫（第${r.day.taiyi.unitInPalace}日），天目${r.day.mu.pos}（${r.day.mu.god}），计神在${r.day.jishen.branch}。`);
  L.push(`时计：太乙在${r.hour.taiyi.palaceName}宫（第${r.hour.taiyi.unitInPalace}时），计神在${r.hour.jishen.branch}。${r.hour.note}`);
  L.push(`卦象：${r.jixiong.label}——${r.jixiong.text}`);
  L.push(`这一层到太乙、八门、文昌、计神、始击、主客算与四将、八种格局、定目、三基、五福、大游、十精、阴阳数和、月日时三计与古法吉凶；${r.scope.notCovered.join('、')}未收录。`);
  return L.join('\n');
}

function wuyunliuqiText(r) {
  const L = [];
  L.push(`【运气年】${r.year.ganzhi}　${r.year.nian} 年（大寒界：${r.year.startTime} — ${r.year.endTime}）`);
  L.push(`【中运】${r.zhongyun.text}`);
  L.push(`【司天在泉】${r.sitian.qi}司天　${r.zaiquan.qi}在泉`);
  L.push(`【当前】${r.current.text}`);
  L.push('【客运五步】');
  for (const s of r.keYun) L.push(`  ${s.no} ${s.name}（${s.taiShao}）　${s.startTime} — ${s.endTime}`);
  L.push('【客气六步】');
  for (const s of r.keQi) {
    const tag = s.sitian ? '（司天）' : s.zaiquan ? '（在泉）' : '';
    L.push(`  ${s.no} ${s.qi}${tag}　${s.startTime} — ${s.endTime}`);
  }
  const sp = [];
  if (r.special.taiYi) sp.push('太乙天符');
  if (r.special.tianFu && !r.special.taiYi) sp.push('天符');
  if (r.special.suiHui && !r.special.taiYi) sp.push('岁会');
  if (r.special.tongTianFu) sp.push('同天符');
  if (r.special.tongSuiHui) sp.push('同岁会');
  if (sp.length) L.push(`【特殊】${sp.join('、')}`);
  L.push(`【组合】${r.combo.text}`);
  L.push(`【边界】${r.scope.note}`);
  return L.join('\n');
}
function constitutionText(r) {
  return [
    `【中医体质】${r.primary.name}（主）${r.primary.level === '是' ? '' : `·${r.primary.level}`}　转化分 ${r.primary.converted}`,
    r.secondary ? `兼夹：${r.secondary.name}（${r.secondary.converted}）${r.mingled.length ? '；同判为「是」：' + r.mingled.join('、') : ''}` : '',
    '九种体质转化分（偏颇质 ≥40 判是、30–39 有倾向）：',
    r.scales.map((x) => `· ${x.name}：${x.converted}${x.level === '否' ? '' : `（${x.level}）`}`).join('\n'),
    r.primary.oneLine,
    r.primary.tendency,
    '调养方向：',
    r.care.map((c) => '· ' + c).join('\n'),
    r.note,
  ].filter(Boolean).join('\n');
}

function constitutionPaperText(p) {
  return [
    `【中医体质·问卷】${p.scaleCount} 种体质 × ${p.itemsPerScale} 题，共 ${p.total} 题`,
    '打分：' + p.scale.map((x) => `${x.v}=${x.label}`).join('　'),
    p.howto,
    p.note,
  ].join('\n');
}

function mbtiText(r) {
  const dims = r.dims.map((d) => {
    const side = d.picked === d.left ? d.leftSay : d.rightSay;
    const pct = Math.round(d.pct * 100);
    return `${d.left}/${d.right} 取 ${d.picked}（${d.strength} ${pct}%，净分 ${d.sum}）　${side}`;
  });
  const p = r.profile;
  const stack = Array.isArray(p.stack) && p.stack.length
    ? p.stack.map((f, i) => `${i === 0 ? '主导 ' : ''}${f.code}`).join(' → ') + `\n　${p.stack.map((f) => `${f.code}：${f.say}`).join('\n　')}`
    : '';
  const missing = Array.isArray(r.unanswered) && r.unanswered.length
    ? `　未答维度：${r.unanswered.join('、')}（该维按平手占位）`
    : '';
  return [
    `【十六型人格】${r.type}（${p.title}）· ${p.keywords}　已答 ${r.answered}/${r.total} 题${missing}`,
    `一句：${p.oneLine}`,
    '【四维】',
    ...dims,
    `【优势】${p.strengths.join('；')}`,
    `【留意】${p.blindspots.join('；')}`,
    `【课题】${p.growth}`,
    `【认知功能】${stack}`,
    `【工作】${p.work}`,
    `【关系】${p.love}`,
    `【学习】${p.study}`,
    `注：${r.note}`,
  ].join('\n');
}

/** 问卷文本（还没答题时） */
function mbtiPaperText(paper) {
  return [
    `【十六型人格问卷】${paper.total} 题，每题按 1（完全不像我）到 5（很像我）打分`,
    ...paper.questions.map((q) => `${q.no}. ${q.text}`),
    `请把 ${paper.total} 个分数按顺序交给 answers（如 [4,2,5,3,…]）；可以跳过某些题（填 null），至少答 12 题。`,
    `注：${paper.note}`,
  ].join('\n');
}

/** 人生 K 线文本 */
function trendText(r) {
  const s = r.meta.strength;
  const dm = r.meta.dayMaster;
  const dmText = dm && typeof dm === 'object' ? `${dm.stem}（${dm.element}）` : String(dm || '');
  return [
    `【人生 K 线】${r.meta.birth}　${r.meta.gender}　日主 ${dmText}　旺衰 ${s.level}（${s.score}）`,
    r.meta.boundaryNote ? `※ ${r.meta.boundaryNote}` : '',
    `【大运分段】${r.segments.map((g) => `${g.ganZhi} ${g.startAge}-${g.endAge}岁`).join('　')}`,
    `【走势】${Array.isArray(r.sparkline) ? r.sparkline.join('　') : r.sparkline}`,
    ...(r.highlights && r.highlights.best && r.highlights.best.length
      ? [`【关键年】最佳 ${r.highlights.best.join('；')}${r.highlights.worst && r.highlights.worst.length ? `\n最需留意 ${r.highlights.worst.join('；')}` : ''}`]
      : []),
    `※ ${r.disclaimer}`,
  ].filter(Boolean).join('\n');
}

/** 风水文本 */
function fengshuiText(r) {
  if (r.meta.action === 'xuankong') {
    const p = r.meta.period;
    const cell = (palace) => {
      const x = r.palaces.find((y) => y.palace === palace);
      return `${palace}${x.yun}/${x.shan}/${x.xiang}`;
    };
    const row = (names) => names.map(cell).join('　');
    const w = r.wangShanWangXiang;
    const jian = r.meta.jianXiang;
    const tf = r.timeFlying;
    const tfLine = tf
      ? `【年月日时】${[['year', '年'], ['month', '月'], ['day', '日'], ['hour', '时']]
        .filter(([k]) => tf[k]).map(([k, label]) => `${label}${tf[k].centerName}${tf[k].fly ? `·${tf[k].fly}` : ''}`).join('　')}${tf.meta && tf.meta.note ? `（${tf.meta.note}）` : ''}`
      : '';
    return [
      `【玄空】${r.meta.periodLabel}${jian && jian.active ? '·替卦' : '·下卦'}　坐 ${r.meta.sitting}　向 ${r.meta.facing}`,
      ...(jian && jian.active ? [`【替卦】${jian.note}`] : []),
      `【入中】山盘 ${r.meta.shanCenter.star}${r.meta.shanCenter.name}（${r.meta.shanCenter.fly}，${r.meta.shanCenter.basis}${r.meta.shanCenter.mode === '替卦' ? `；原运星 ${r.meta.shanCenter.original}${r.meta.shanCenter.replaced ? '，已替' : '，用替而未替'}` : ''}）；向盘 ${r.meta.xiangCenter.star}${r.meta.xiangCenter.name}（${r.meta.xiangCenter.fly}，${r.meta.xiangCenter.basis}${r.meta.xiangCenter.mode === '替卦' ? `；原运星 ${r.meta.xiangCenter.original}${r.meta.xiangCenter.replaced ? '，已替' : '，用替而未替'}` : ''}）`,
      `【九宫】${row(['巽', '离', '坤'])}｜${row(['震', '中', '兑'])}｜${row(['艮', '坎', '乾'])}`,
      `【当运】山星${p}到${r.dangYun.shan.text}；向星${p}到${r.dangYun.xiang.text}`,
      `【表法】${w.byTable === null ? '替卦不套正向表；' : ''}${w.table.length ? w.table.join('、') : '无'}；${w.note}`,
      `【合十】山星合十 ${r.heshi.shan.join('、') || '无'}；向星合十 ${r.heshi.xiang.join('、') || '无'}`,
      ...(tfLine ? [tfLine] : []),
      ...(r.meta.note ? [`※ ${r.meta.note}`] : []),
      `※ ${r.disclaimer}`,
    ].join('\n');
  }
  if (r.meta.action === 'advise') {
    const match = r.mingMatch
      ? [`【命宅配】${r.mingMatch.text}`]
      : [`※ ${r.meta.birthNote || '未提供生辰，未做命宅配。'}`];
    return [
      `【宅卦】坐 ${r.meta.sitting}　向 ${r.meta.facing}　${r.meta.houseGua}宅（${r.meta.houseGroup}）`,
      `【八星】${r.houseStars.map((x) => `${x.star}·${x.direction}${x.palace ? `（${x.palace}）` : ''}`).join('　')}`,
      `【门】${r.layout.door}`,
      `【灶】${r.layout.stove}`,
      `【床】${r.layout.bed}`,
      `【厕】${r.layout.toilet}`,
      ...match,
      `※ ${r.disclaimer}`,
    ].join('\n');
  }
  const g = r.mingGua;
  return [
    `【命卦】${g.num}${g.gua}（${g.group}）　方位 ${g.direction}`,
    `【四吉】${r.luckyDirections.map((x) => `${x.star}·${x.direction}${x.palace ? `（${x.palace}）` : ''}`).join('　')}`,
    `【四凶】${r.unluckyDirections.map((x) => `${x.star}·${x.direction}`).join('　')}`,
    ...(r.yearlyFlying
      ? [`【${r.meta.fortuneYear} 年九宫飞星】中宫 ${r.yearlyFlying.centerName}；${r.yearlyFlying.palaces.filter((p) => p.palace !== '中').map((p) => `${p.palace}${p.name}`).join('　')}`]
      : [`※ ${r.meta.note || ''}`]),
    `※ ${r.disclaimer}`,
  ].filter(Boolean).join('\n');
}

/** 起名文本 */
function nameText(r) {
  if (r.action === 'generate') {
    return [
      `【候选名】姓 ${r.surname}（${r.gender}，喜用 ${r.bazi.favorable.join('、')}）${r.bazi.basis}`,
      ...r.candidates.map((c) => {
        const wu = c.wuge && c.wuge.available ? `　五格 ${c.wuge.summary}` : '';
        const ph = c.phonetics && c.phonetics.available ? `　音韵 ${c.phonetics.level}（${c.phonetics.tonePattern}）` : '';
        return `${c.rank}. ${c.name}　${c.chars.map((x) => `${x.char}(${x.element})${x.meaning}`).join('　')}${wu}${ph}`;
      }),
      ...r.notes.map((n) => `※ ${n}`),
    ].join('\n');
  }
  const srcLabel = (c) => (c.source === 'lib' ? '字库' : c.source === 'user' ? '用户指定' : '未收录');
  const charLine = (c) => {
    const el = c.element === '未收录' ? '未收录（不猜五行）' : `${c.element}（${srcLabel(c)}）`;
    const fit = c.favorable === true ? '合喜用' : c.favorable === false ? '不合喜用' : '不判';
    const sug = c.suggest && c.suggest.length
      ? `　可换：${c.suggest.map((x) => `${x.char}（${x.element}）`).join('、')}`
      : '';
    return `· ${c.char}：${el}｜${fit}｜${c.meaning}${sug}`;
  };
  const wu = r.wuge;
  const wugeLine = wu && wu.available
    ? `【五格】${wu.strokes.map((x) => `${x.char}${x.strokes}画`).join('＋')}｜${wu.summary}｜三才 ${wu.sancai.text}`
    : `【五格】${wu ? wu.reason : '未算'}`;
  const ph = r.phonetics;
  const phLine = ph && ph.available
    ? `【音韵】${ph.chars.map((x) => `${x.char}${x.py}${x.tone}`).join(' ')}｜声调 ${ph.tonePattern}｜${ph.level}${(ph.alt || []).length ? `｜姓又读 ${ph.alt.map((x) => `${x.char}${x.py}${x.tone}`).join('、')}` : ''}${ph.issues.length ? `：${ph.issues.map((i) => i.text).join('；')}` : ''}`
    : `【音韵】${ph ? ph.reason : '未算'}`;
  return [
    `【名字评估】${r.fullName}`,
    ...r.chars.map(charLine),
    r.bazi ? `【八字】日主 ${r.bazi.dayMaster && r.bazi.dayMaster.stem ? `${r.bazi.dayMaster.stem}（${r.bazi.dayMaster.element}）` : r.bazi.dayMaster}，旺衰 ${r.bazi.strength.level}（${r.bazi.strength.score}），${r.bazi.basis}` : '',
    wugeLine,
    phLine,
    `【结论】${r.verdict}`,
    ...r.notes.map((n) => `※ ${n}`),
  ].filter(Boolean).join('\n');
}

/** 给模型的紧凑文本（去掉大字段，保留摘要；带解析时附上解析） */
export function renderText(result) {
  const base = result.summary ?? JSON.stringify(result, null, 2);
  // 先给一段人话，再给盘面细节：模型照这段复述，就不至于一开口就是术语表
  const NL = String.fromCharCode(10);
  const brief = result.brief
    ? ['【先说结论】' + result.brief.lead]
      .concat((result.brief.sections || []).map((x) => ['　', x.h, '：', x.t].join('')))
      .concat((result.brief.advice || []).length ? ['　可以试着做的：' + result.brief.advice.map((a) => String(a).replace(/。$/, '')).join('；') + '。'] : [])
      .concat(result.brief.caveat ? ['　※ ' + result.brief.caveat] : [])
      .join(NL) + NL
    : '';
  const parts = [brief + base];
  if (result.shadow && result.shadow.id) {
    const s = result.shadow;
    parts.push(`【影子盘】${s.id}（同参数同 ID；版本 ${s.version}）`
      + `\n　基础指纹 ${s.baseId}（不含版本，跨版本可比对）`
      + (s.reproducible === false ? `\n　⚠ 不可复算：${s.reason}` : '')
      + (s.reproducible === true && s.asOfPinned === false && (s.system === 'bazi' || s.system === 'ziwei') ? '\n　提示：未固定 asOf，流年/流月随「此刻」变化；要比对请传 asOf。' : ''));
  }
  // 一句话改参的回显：改了哪些、没认哪些，都摆出来让人核对，而不是悄悄按新参数排
  if (result.revision && ((result.revision.applied || []).length || (result.revision.ignored || []).length)) {
    const rev = result.revision;
    const rows = (rev.applied || []).map((a) => `${a.label}：${a.fromDisplay == null ? '（未设）' : a.fromDisplay} → ${a.display}`);
    parts.push(`【改参】${rev.text}${rows.length ? `\n　${rows.join('；')}` : '\n　没有识别到可改的参数，仍按原参数排盘'}`
      + ((rev.ignored || []).length ? `\n　未处理：${rev.ignored.join('；')}` : ''));
  }
  // 句柄放进文本：模型看到的是这段摘要，不给它就没法在下一轮只传增量
  if (typeof result.handle === 'string' && result.handle) {
    parts.push(`【排盘句柄】${result.handle}\n　追问同一张盘：传 handle + 增量参数（asOf / direction / question，或换 system 看另一套盘），不必重报出生信息。`);
  }
  if (Array.isArray(result.trace) && result.trace.length) {
    parts.push(`【推导链】${SYSTEM_LABEL[result.system] || result.system} · ${result.trace.length} 层\n`
      + result.trace.map((t, i) => `${i + 1}. ${t.field}｜${t.result}\n　规则：${t.rule}　出处：${t.source}`).join('\n'));
  }
  // 解析段按档位渲染。brief 只做结构性收敛（少给维度、表限行数），不压体积：
  // 盘面、句柄、解析全都不裁，这段有多长就多长。
  if (result.interpret) {
    const extra = interpretText(result.interpret, result.interpretTier);
    if (extra) parts.push(extra);
  }
  if (result.cross) parts.push(`【八字 × 紫微 交叉验证】\n${crossText(result.cross)}`);
  if (result.caliber && Array.isArray(result.caliber.switches) && result.caliber.switches.length) {
    const c = result.caliber;
    parts.push('【口径对照】同一组输入，只换一个口径（不判哪套更准，也不改盘面）\n'
      + c.switches.map((s) => {
        if (s.error) return `· ${s.title}：未能对照（${s.error}）`;
        if (!s.total) return `· ${s.title}：${s.currentLabel} → ${s.altLabel}，本盘无变化`;
        const changed = (Array.isArray(s.views) ? s.views : []).filter((v) => v.changed);
        const side = changed.length
          ? `\n　并排：${changed.map((v) => `${v.label} ${v.current} → ${v.alt}`).join('；')}`
          : '';
        return `· ${s.title}：${s.currentLabel} → ${s.altLabel}\n　${s.summary}${side}`;
      }).join('\n'));
  }
  if (result.followup) {
    const f = result.followup;
    parts.push(`【追问】${f.question}\n${f.answer}${f.evidence && f.evidence.length ? `\n　依据：${f.evidence.join('；')}　置信度：${f.confidence}` : ''}`);
  }
  // 验前事：过去几年的信号（只读）；贴合度由用户在面板里勾选后算，这里只列事实
  if (result.past && Array.isArray(result.past.rows) && result.past.rows.length) {
    parts.push(`【验前事】过去 ${result.past.years} 年的流年信号（只读，不改盘）\n` +
      result.past.rows.map((r) => `· ${r.year} ${r.ganzhi} · ${r.theme}（${r.tier}${r.tenGod ? `，${r.tenGod}` : ''}）`).join('\n') +
      '\n用法：在面板里勾「准 / 不准 / 不确定」后算贴合度；贴合度低时先核对出生时间、时区与晚子时口径。');
  }
  // 生时校正：候选时辰的排序与命中数（固定规则，只缩小范围）
  if (result.rectify && Array.isArray(result.rectify.candidates)) {
    const rc = result.rectify;
    parts.push(`【生时校正】候选时辰 ${rc.candidates.length} 个（固定规则打分，只缩小范围）\n` +
      rc.candidates.slice(0, 8).map((c) => `· ${c.label} 时柱 ${c.hourGanzhi} / 日柱 ${c.dayGanzhi} · 命中 ${c.hits}/${c.total}`).join('\n') +
      `\n${rc.note}`);
  }
  return parts.filter(Boolean).join('\n\n');
}

/** 对外暴露：地址解析（异步，含联网） */
export { geocodeAddress, resolveAddress };

export { buildBazi, buildLiuyao, tossLines };
export { followup, askPrompt };
export { pastSignals, verifyFit, rectifyBirth };
export { crossCheck, crossText, crossSection };
export { buildAlmanac, buildZeri, buildChenggu, buildXiaoliuren, buildStar, buildNumerology, buildConvert };
export { buildTrend, buildFengshui, buildName };
export { buildConstitution };
export { buildWuyunliuqi };
export { buildTaiyi };
export { buildTrace, traceMarkdown };
export { encodeHandle, decodeHandle, resolveHandle, pruneForeignKeys, ownedKeys };
// C3 对话桥替代：深链编解码、表单还原、三档复制包（面板与独立页共用一份）
export { askLink, parseAskLink, formOf, restNote, askPackages };
// 问事解读提示：把一张盘打包成「先答他所问、不堆术语、回到现实核对」的提示，供面板一键复制
// （本仓 esbuild 不接受 `export {} from`，先静态 import 再 export）
import { buildEventPrompt, ASK_KINDS } from './event-prompt.js';
import { plainSummary } from './plain-summary.js';
export { buildEventPrompt, ASK_KINDS };









