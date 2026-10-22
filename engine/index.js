// 统一入口：解析参数、分派到各体系、生成可读摘要
import { buildBazi } from './bazi.js';
import { buildLiuyao, tossLines } from './liuyao.js';
import { buildZiwei } from './ziwei.js';
import { drawTarot } from './tarot.js';
import { buildMeihua } from './meihua.js';
import { buildDaliuren } from './daliuren.js';
import { geocodeAddress, resolveAddress } from './geo.js';
import { toJDN, ganzhiName, dayGanzhiIndex } from './calendar.js';
import { interpret } from './interpret.js';

export { interpret };

const pad = (n) => String(n).padStart(2, '0');

/** 解析 'YYYY-MM-DDTHH:mm' / 'YYYY-MM-DD HH:mm' / 'YYYY-MM-DD' */
export function parseDateTime(text) {
  if (typeof text !== 'string' || !text.trim()) throw new Error('缺少 datetime（公历日期时间）');
  const m = text.trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T\s](\d{1,2}):(\d{1,2}))?$/);
  if (!m) throw new Error(`无法解析 datetime：「${text}」，请用 1990-05-12T14:30 这种格式`);
  const out = {
    year: Number(m[1]), month: Number(m[2]), day: Number(m[3]),
    hour: Number(m[4] ?? 0), minute: Number(m[5] ?? 0),
  };
  if (out.month < 1 || out.month > 12) throw new Error('月份超出范围');
  if (out.day < 1 || out.day > 31) throw new Error('日期超出范围');
  if (out.hour > 23 || out.minute > 59) throw new Error('时间超出范围');
  return out;
}

function baziText(r) {
  const P = r.pillars;
  const line = (label, p) =>
    `${label}：${p.ganzhi}　${p.stemTenGod ? `十神 ${p.stemTenGod}　` : ''}藏干 ${p.hidden.map((h) => `${h.stem}(${h.tenGod})`).join(' ')}　纳音 ${p.nayin}`
    + `　地势 ${p.dishi}　自坐 ${p.zizuo}　空亡 ${p.kongwang.join('')}`
    + (p.shensha && p.shensha.length ? `　神煞 ${p.shensha.join('、')}` : '');
  const wuxing = Object.entries(r.wuxing).map(([k, v]) => `${k}${v}`).join(' ');
  const dayun = r.dayun.list.slice(0, 8)
    .map((d) => `${d.startAge}岁 ${d.ganzhi}(${d.stemTenGod})${d.luck ? `·${d.luck.tier}` : ''}${d.relations && d.relations.length ? `[${d.relations.join('')}]` : ''}`).join('　');
  const near = r.jieqi.nearBoundaryMinutes < 15
    ? `\n⚠ 出生时刻距「节」仅 ${r.jieqi.nearBoundaryMinutes} 分钟，节气时刻本身有分钟级误差，月柱建议人工复核。`
    : '';
  const SHORT = { year: '年', month: '月', day: '日', hour: '时' };
  const shenshaLine = r.shensha && r.shensha.groups && r.shensha.groups.length
    ? `神煞（${r.shensha.count} 见）：` + r.shensha.groups.map((g) =>
      `${g.cat}｜` + g.items.map((i) => `${i.name}(${i.pillars.map((k) => SHORT[k]).join('')})`).join('、')).join('；')
    : '神煞：—';
  const gejuLine = r.frame ? [
    `格局：${r.frame.primary ? `${r.frame.primary.name}（${r.frame.primary.evidence}）` : '—'}`,
    `　　　${r.frame.geju.map((g) => `${g.name}[${g.kind}]`).join('　')}`,
    `用神：喜${r.frame.yongshen.favor.join('')}（${r.frame.yongshen.favorTenGods.join('、')}）　忌${r.frame.yongshen.avoid.join('')}（${r.frame.yongshen.avoidTenGods.join('、')}）　${r.frame.yongshen.method}`,
    `　　　${r.frame.yongshen.detail}`,
    `十神权重：${Object.entries(r.frame.godStats.groups).map(([k, v]) => `${k}${v}`).join(' ')}`,
  ] : [];
  return [
    `【四柱】${P.year.ganzhi} ${P.month.ganzhi} ${P.day.ganzhi} ${P.hour.ganzhi}`,
    `日主：${r.dayMaster.stem}${r.dayMaster.element}（${r.dayMaster.yinYang}）　空亡：${r.kongwang.join('')}`,
    line('年柱', P.year), line('月柱', P.month), line('日柱', P.day), line('时柱', P.hour),
    `五行：${wuxing}`,
    `日主强弱：${r.strength.level}（${r.strength.score}）　${r.strength.detail}`,
    ...gejuLine,
    `天干关系：${(r.relations && r.relations.stems.length) ? r.relations.stems.join('　') : '—'}`,
    `地支关系：${(r.relations && r.relations.branches.length) ? r.relations.branches.join('　') : '—'}`,
    shenshaLine,
    `真太阳时：${r.solarTime.trueSolarText}（${r.input.geo ? r.input.geo.note + '；' : ''}${r.solarTime.note}）`,
    `节气：上一节 ${r.jieqi.previous.name} ${r.jieqi.previous.time}　下一节 ${r.jieqi.next.name} ${r.jieqi.next.time}`,
    `大运：${r.dayun.rule}（${r.dayun.direction}），${r.dayun.startAge.years}岁${r.dayun.startAge.months}个月起运`,
    `　${dayun}`,
    `流年：${r.liunian.slice(0, 10).map((l) => `${l.year}${l.ganzhi}(${l.stemTenGod})${l.luck ? `·${l.luck.tier}` : ''}`).join('　')}`,
    '（格局、用神、行运吉凶为扶抑＋简化调候的量化提示，非断语。）',
  ].join('\n') + near;
}

function ziweiText(r) {
  const lunarText = `${r.lunar.year}年${r.lunar.isLeap ? '闰' : ''}${r.lunar.month}月${r.lunar.day}日`;
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
  return [
    `【农历】${lunarText}（月首 ${r.lunar.monthStart}）　时支：${r.hourBranch}　年干支：${r.yearGanzhi}`,
    `【时刻】${r.solarTime ? `${r.solarTime.civilText} → 真太阳时 ${r.solarTime.trueSolarText}${r.input.geo ? '（' + r.input.geo.note + '）' : ''}` : ''}`,
    `【命宫】${r.soul.branch}（${r.soul.ganzhi}·${r.soul.nayin}）　【身宫】${r.body.branch}（落${r.body.lands}）　【五行局】${r.bureau.name}`,
    `【紫微】${r.ziwei}　【天府】${r.tianfu}　【命主】${r.lifeMaster}　【身主】${r.bodyMaster}`,
    `【大限】${r.daxian.rule}，${r.daxian.startAge}岁起　【小限】${r.xiaoxianRule.direction}`,
    `【昌曲】文昌${r.changqu.wenchang.branch}（${r.changqu.wenchang.palace}${r.changqu.wenchang.mutagen ? '·化' + r.changqu.wenchang.mutagen : ''}）　文曲${r.changqu.wenqu.branch}（${r.changqu.wenqu.palace}${r.changqu.wenqu.mutagen ? '·化' + r.changqu.wenqu.mutagen : ''}）`,
    `　　　${r.changqu.relation}　入命三方：${r.changqu.inSoulSanfang ? '是' : '否'}　吸收面：${r.changqu.absorb.label}（${r.changqu.absorb.reason}）`,
    '十二宫：',
    ...rows,
    '大限（按起运年龄排序，前 8 限，宫干四化落宫）：',
    ...daxian,
    '流年（前 6 年，完整 12 年在结构化数据里）：',
    ...liunian,
    `【格局】${patterns}`,
    r.patternSummary ? `【结构统计】吉格 ${r.patternSummary.good.length}、忌格 ${r.patternSummary.bad.length}；${r.patternSummary.note}` : '',
    r.lunar.note ? `注：${r.lunar.note}` : '',
  ].filter(Boolean).join('\n');
}

function daliurenText(r) {
  const sc = r.sanChuan;
  const one = (c) => `${c.zhi}(${c.jiang}${c.liuQin}${c.xunKong ? '空' : ''})`;
  return [
    `【日时】${r.dayGanZhi}日　${r.hourZhi}时（${r.dayNight}贵）　月将 ${r.yueJiang.name}${r.yueJiang.zhi}　节气 ${r.jieqi.name}`,
    `【三传】初 ${one(sc.chu)} → 中 ${one(sc.zhong)} → 末 ${one(sc.mo)}`,
    `【四课】${r.siKe.map((k) => `${k.position}课 ${k.shang}上${k.xia}下(${k.relation}·${k.jiang})`).join('　')}`,
    `【天地盘】${r.pan.map((p) => `${p.di}:${p.tian}(${p.jiang})`).join(' ')}`,
    `【格局】${r.geJu.name}·${r.geJu.detail}`,
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
    lines.push(`  ${c.position}：${c.name}（${c.orientation}）　${c.keywords.join('、')}`);
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
    r.question ? `所问：${r.question}` : '',
    '本卦：',
    fmt(r.ben),
  ];
  if (r.bian) out.push(`动爻：第 ${r.cast.movingPositions.join('、')} 爻`, '变卦（六亲以变卦自身宫论）：', fmt(r.bian));
  else out.push('六爻安静，无变卦。');
  return out.filter(Boolean).join('\n');
}

/** 工具输出必须是无损 JSON：去掉 undefined / 函数等不可序列化的值 */
function jsonSafe(value) {
  return JSON.parse(JSON.stringify(value));
}

/**
 * 统一排盘入口
 * @param {object} args
 * @param {'bazi'|'ziwei'|'liuyao'} args.system
 * @param {string} [args.datetime]
 */
export function compute(args = {}) {
  const r = jsonSafe(computeRaw(args));
  // 显式要求时才附加解析模块，避免默认输出过长
  if (args.withInterpret) r.interpret = interpret(r);
  return r;
}

function computeRaw(args) {
  const system = args.system;
  if (system === 'bazi') {
    const dt = parseDateTime(args.datetime);
    const result = buildBazi({
      ...dt,
      gender: args.gender === 'female' ? 'female' : 'male',
      longitude: typeof args.longitude === 'number' ? args.longitude : undefined,
      address: typeof args.address === 'string' ? args.address : undefined,
      geo: args.geo && typeof args.geo === 'object' ? args.geo : undefined,
      lateZi: args.lateZi !== false,
      trueSolar: args.trueSolar !== false,
    });
    return { ...result, summary: baziText(result) };
  }
  if (system === 'ziwei') {
    const dt = parseDateTime(args.datetime);
    const result = buildZiwei({
      ...dt,
      gender: args.gender === 'female' ? 'female' : 'male',
      leapAsNext: args.leapAsNext === true,
      longitude: typeof args.longitude === 'number' ? args.longitude : undefined,
      address: typeof args.address === 'string' ? args.address : undefined,
      geo: args.geo && typeof args.geo === 'object' ? args.geo : undefined,
      trueSolar: args.trueSolar,
    });
    return { ...result, summary: ziweiText(result) };
  }
  if (system === 'tarot') {
    // 抽牌不看时间：castAt 只记录此刻，避免误用出生时间
    const result = drawTarot({ count: Number(args.count) || 3, question: args.question });
    return { ...result, summary: tarotText(result) };
  }
  if (system === 'daliuren') {
    const dt = parseDateTime(args.datetime);
    const result = buildDaliuren({ ...dt, lateZi: args.lateZi !== false });
    return { ...result, summary: daliurenText(result) };
  }
  if (system === 'meihua') {
    const result = buildMeihua({
      mode: args.mode === 'number' ? 'number' : 'time',
      datetime: args.datetime,
      upper: args.upper,
      lower: args.lower,
      changing: args.changing,
    });
    return { ...result, summary: meihuaText(result) };
  }
  if (system === 'liuyao') {
    const lines = Array.isArray(args.lines) && args.lines.length
      ? args.lines.map(Number)
      : tossLines();
    let dayGanZhi;
    if (args.datetime) {
      const dt = parseDateTime(args.datetime);
      const g = ganzhiName(dayGanzhiIndex(toJDN(dt.year, dt.month, dt.day)));
      dayGanZhi = { stem: g.stem, branch: g.branch, name: g.name };
    }
    const result = buildLiuyao({ lines, question: args.question, dayGanZhi });
    return { ...result, summary: liuyaoText(result) };
  }
  throw new Error(`未知体系「${system}」，可选：bazi（四柱八字）、liuyao（六爻）。紫微斗数尚未接入。`);
}

/** 给模型的紧凑文本（去掉大字段，保留摘要） */
export function renderText(result) {
  return result.summary ?? JSON.stringify(result, null, 2);
}

/** 对外暴露：地址解析（异步，含联网） */
export { geocodeAddress, resolveAddress };

export { buildBazi, buildLiuyao, tossLines };
