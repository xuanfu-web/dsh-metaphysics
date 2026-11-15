// 事实型头卡：给「没有判断可下」的体系一句话。
//
// 黄历、择日、称骨、小六壬、星座、数字、MBTI、风水、起名、公农历这 10 个体系
// 原本从盘面直接开始——先是一屏表格，读者读完也不知道「这份结果说了什么」。
// 但它们也不该有方向与把握：黄历没有「顺不顺」，称骨没有「把握几分」，
// 硬塞一个 mixed/low 只是把 defaultAdapter 的假判断换个地方摆。
//
// 所以这里只做一件事：把盘面里已经算好的事实摊成一句话 + 两三条要点 + 一条注意。
// 不下结论、不猜方向、不写「若……则……」。取不到数据就返回 null，宁可不给卡，
// 也不给一张空壳——空卡比没有卡更糟。
//
// 渲染在 src/panel-kit.js 的 pp.factHeadHTML / pp.briefHTML（用户视图顶部）。

/** 汉字数（校验用，不含标点与字母）。带 g 的正则不复用，免得 lastIndex 记状态 */
export function hanCount(s) {
  return (String(s || '').match(/[\u4e00-\u9fa5]/g) || []).length;
}

function clean(v) {
  if (v === null || v === undefined) return '';
  return String(v).replace(/\s+/g, ' ').trim();
}

/** 截到 n 个字符，超出加省略号；不按汉字算，这里只是防爆宽 */
function clip(v, n) {
  const s = clean(v);
  if (s.length <= n) return s;
  return s.slice(0, n - 1) + '…';
}

/** '2026-11-17' → '11 月 17 日' */
function md(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(clean(iso));
  if (!m) return clean(iso);
  return `${Number(m[2])} 月 ${Number(m[3])} 日`;
}

function facts(list) {
  return list
    .filter((row) => row && clean(row[0]) && clean(row[1]))
    .slice(0, 3)
    .map((row) => ({ k: clip(row[0], 6), v: clip(row[1], 34) }));
}

// ——— 各体系：只读已算好的字段 ———

function almanacHead(r) {
  const lunar = r.lunar || {};
  const g = r.ganzhi || {};
  const god = r.dayGod || {};
  const xiu = r.xiu || {};
  const pos = r.positions || {};
  const chong = r.chong || {};
  const headline = [clean(lunar.text), clean(g.day) && `${clean(g.day)}日`, god.name && `值神${clean(god.name)}`]
    .filter(Boolean)
    .join('，');
  if (!headline) return null;
  const yi = Array.isArray(r.yi) ? r.yi.slice(0, 3).join('、') : '';
  const ji = Array.isArray(r.ji) ? r.ji.slice(0, 3).join('、') : '';
  return {
    kicker: '当日一览',
    headline,
    facts: facts([
      ['建除', [clean(r.zhiXing) && `${clean(r.zhiXing)}日`, clean(xiu.name) && `${clean(xiu.name)}宿${clean(xiu.luck)}`].filter(Boolean).join(' · ')],
      ['宜', yi],
      ['忌', ji],
      ['冲煞', [clean(chong.text), clean(chong.sha)].filter(Boolean).join(' ')],
      ['方位', [pos.xiShen && `喜神${clean(pos.xiShen)}`, pos.caiShen && `财神${clean(pos.caiShen)}`].filter(Boolean).join(' · ')],
    ]),
    note: god.type === '黑道' ? `${clean(god.name)}是黑道日，婚嫁、动土、签约这类事按黄历口径都偏忌。` : '',
  };
}

function zeriHead(r) {
  const meta = r.meta || {};
  const days = Array.isArray(r.days) ? r.days : [];
  const best = Array.isArray(r.best) ? r.best : [];
  const byDate = (iso) => days.find((d) => d && d.date === iso) || null;
  if (!best.length) {
    const span = clean(meta.days) ? `这 ${clean(meta.days)} 天里` : '这段时间';
    return {
      kicker: '择日一览',
      headline: `${span}没有够得上「宜${clean(meta.task) || '这件事'}」的日子`,
      facts: facts([['事项', clean(meta.task)], ['说明', '整段时间都被忌项压住，换月份或放宽要求再挑']]),
      note: '宜忌按《协纪辨方书》逐条神煞算，不含未收录的神煞。',
    };
  }
  const d0 = byDate(best[0]);
  const d1 = byDate(best[1]);
  const avoid = Array.isArray(r.avoid) && r.avoid.length ? clean(r.avoid[0]).split('（')[0] : '';
  return {
    kicker: '择日一览',
    headline: `${clean(meta.days) ? `近 ${clean(meta.days)} 天` : '这段时间'}，宜${clean(meta.task)}最好的是 ${md(best[0])}`,
    facts: facts([
      ['首选', [d0 && d0.weekday, d0 && d0.dayGanZhi && `${clean(d0.dayGanZhi)}日`, d0 && d0.verdict && `卷十作${clean(d0.verdict)}`].filter(Boolean).join(' · ')],
      ['次选', d1 ? [md(d1.date), d1.verdict && clean(d1.verdict)].filter(Boolean).join(' · ') : ''],
      ['最忌', avoid ? md(avoid) : ''],
    ]),
    note: meta.shengXiao ? '' : '没给属相，未按冲煞排除；已知属相可以再挑一遍。',
  };
}

function chengguHead(r) {
  const total = r.total || {};
  const verdict = r.verdict || {};
  const song = r.song || {};
  if (!clean(total.label)) return null;
  return {
    kicker: '称骨一览',
    headline: `骨重${clean(total.label)}${clean(verdict.band) ? `，${clean(verdict.band)}` : ''}`,
    facts: facts([
      ['判词', clean(verdict.text)],
      ['歌诀', clean(song.plain)],
    ]),
    note: clean(song.source) ? `骨重与歌诀都是${clean(song.source)}口径，不是独一份说法。` : '',
  };
}

function xiaoliurenHead(r) {
  const res = r.result || {};
  const steps = Array.isArray(r.steps) ? r.steps : [];
  if (!clean(res.palace)) return null;
  return {
    kicker: '小六壬一览',
    headline: `落${clean(res.palace)}${clean(res.luck) ? `（${clean(res.luck)}）` : ''}`,
    facts: facts([
      ['三宫', steps.map(clean).join(' → ')],
      ['一句', clean(res.text)],
      ['起课', r.meta && clean(r.meta.originText)],
    ]),
    note: '轻量快占，一件事问一次；同一件事反复掐只会越掐越乱。',
  };
}

function starHead(r) {
  const sign = r.sign || {};
  const daily = r.daily || {};
  if (!clean(sign.name)) return null;
  const dims = Array.isArray(daily.dims) ? daily.dims.filter((d) => d && clean(d.text)) : [];
  const top = dims.slice().sort((a, b) => (Number(b.stars) || 0) - (Number(a.stars) || 0))[0];
  // 最强项那条的说明常常和 tone 是同一句，重复摆一遍等于没加信息
  const topText = top && clean(top.text) && clean(top.text) !== clean(daily.tone) ? ` ${clean(top.text)}` : '';
  return {
    kicker: '本日一览',
    headline: `${clean(sign.name)}${clean(sign.element) ? `（${clean(sign.element)}）` : ''}${clean(daily.tone) ? `：${clean(daily.tone)}` : ''}`,
    facts: facts([
      ['最强项', top ? `${clean(top.name)} ${'★'.repeat(Math.max(0, Math.min(5, Number(top.stars) || 0)))}${topText}` : ''],
      ['顺势', [daily.luckyColor && `幸运色${clean(daily.luckyColor)}`, daily.luckyNumber && `数字 ${clean(daily.luckyNumber)}`].filter(Boolean).join(' · ')],
      ['合得来', clean(sign.compatible)],
    ]),
    note: '当日基调同日同结果，不随人变；当个提醒看就好。',
  };
}

function numerologyHead(r) {
  const nums = r.numbers || {};
  const primary = r.primary || {};
  if (nums.lifePath === undefined || nums.lifePath === null) return null;
  const meaning = primary.meaning || {};
  return {
    kicker: '数字一览',
    headline: `生命路径数 ${clean(nums.lifePath)}${clean(meaning.title) ? ` · ${clean(meaning.title)}` : ''}`,
    facts: facts([
      ['生日数', `${clean(nums.birthday)}`],
      ['态度数', `${clean(nums.attitude)}`],
      ['倾向', clean(meaning.tendency)],
    ]),
    note: '西方数字学与八字、紫微不是一套口径，别拿两边互相印证。',
  };
}

function mbtiHead(r) {
  const dims = Array.isArray(r.dims) ? r.dims : [];
  if (!clean(r.type)) return null;
  const line = dims
    .filter((d) => d && clean(d.picked))
    // pct 是 0–1 的强度比例；平手时写「平」，写 0% 会让人以为这维没测出来
    .map((d) => `${clean(d.picked)} ${d.tie ? '平' : Number.isFinite(Number(d.pct)) ? `${Math.round(Number(d.pct) * 100)}%` : ''}`.trim())
    .join(' / ');
  const profile = r.profile || {};
  return {
    kicker: '类型一览',
    headline: `${clean(r.type)}${clean(r.title) ? `（${clean(r.title)}）` : ''}${clean(profile.keywords) ? ` · ${clean(profile.keywords)}` : ''}`,
    facts: facts([
      ['四维', line],
      ['一句', clean(r.oneLine) || clean(profile.oneLine)],
      ['成长', clean(profile.growth)],
    ]),
    note: `已答 ${Number(r.answered) || 0}/${Number(r.total) || dims.length * 6} 题；这是自评量表，不是诊断。`,
  };
}

function fengshuiHead(r) {
  const gua = r.mingGua || {};
  if (!gua.num && !clean(gua.gua)) return null;
  const lucky = Array.isArray(r.luckyDirections) ? r.luckyDirections.filter((d) => d && clean(d.star)) : [];
  const unlucky = Array.isArray(r.unluckyDirections) ? r.unluckyDirections.filter((d) => d && clean(d.star)) : [];
  const fmtDir = (d) => `${clean(d.star)}·${clean(d.direction)}${clean(d.palace) ? `（${clean(d.palace)}）` : ''}`;
  return {
    kicker: '命卦一览',
    headline: `命卦 ${clean(gua.num)}${clean(gua.gua)}（${clean(gua.group) || '命卦'}），本命方位${clean(gua.direction) || '—'}`,
    facts: facts([
      ['四吉', lucky.slice(0, 3).map(fmtDir).join('　')],
      ['四凶', unlucky.slice(0, 2).map(fmtDir).join('　')],
      ['宜住', clean(gua.compatible)],
    ]),
    note: '八宅只看命卦与朝向，不含形峦与现场勘舆；实际户型以现场为准。',
  };
}

function nameHead(r) {
  const stats = r.stats || {};
  const chars = Array.isArray(r.chars) ? r.chars.filter((c) => c && clean(c.char)) : [];
  const wuge = r.wuge || {};
  if (!clean(r.fullName) && !chars.length) return null;
  const known = Number(stats.known) || chars.length;
  const fav = Number(stats.favorableCount) || 0;
  return {
    kicker: '名字一览',
    headline: `${clean(r.fullName) || chars.map((c) => clean(c.char)).join('')}：${known ? `${fav}/${known} 个字合喜用` : clean(r.verdict)}`,
    facts: facts([
      ['用字', chars.map((c) => `${clean(c.char)} ${clean(c.element)}${c.favorable ? '·合' : '·不合'}`).join('、')],
      ['五格', clean(wuge.summary)],
      ['喜用', (r.bazi && Array.isArray(r.bazi.favorable)) ? r.bazi.favorable.map(clean).join('、') : ''],
    ]),
    note: Number(stats.unknown) ? `有 ${stats.unknown} 个字不在字库，五行没猜。` : '字之五行按通行字义归类，不是唯一答案。',
  };
}

function convertHead(r) {
  const solar = r.solar || {};
  const lunar = r.lunar || {};
  const g = r.ganzhi || {};
  if (!clean(solar.text) && !clean(lunar.text)) return null;
  const jq = r.jieQi || {};
  return {
    kicker: '历法一览',
    headline: `${clean(solar.text)} ⇄ ${clean(lunar.text)}`,
    facts: facts([
      ['干支', [clean(g.year) && `${clean(g.year)}年`, clean(g.month) && `${clean(g.month)}月`, clean(g.day) && `${clean(g.day)}日`].filter(Boolean).join(' ')],
      ['生肖', clean(g.shengXiao)],
      ['节气', jq.prev || jq.next ? [jq.prev && clean(jq.prev.name), jq.next && clean(jq.next.name)].filter(Boolean).join(' → ') : ''],
    ]),
    note: '交节当日、闰月边界在少数历法版本里有日界差。',
  };
}

const HEADS = {
  almanac: almanacHead,
  zeri: zeriHead,
  chenggu: chengguHead,
  xiaoliuren: xiaoliurenHead,
  star: starHead,
  numerology: numerologyHead,
  mbti: mbtiHead,
  fengshui: fengshuiHead,
  name: nameHead,
  convert: convertHead,
};

/**
 * 取这份结果的事实型头卡。没有覆盖或数据不足时返回 null。
 * 返回值只含纯文本，渲染层负责转义与排版。
 * @param {object} r compute() 的结果
 * @returns {{kicker:string, headline:string, facts:{k:string,v:string}[], note:string}|null}
 */
export function factHeadline(r) {
  if (!r || !r.system) return null;
  const fn = HEADS[r.system];
  if (!fn) return null;
  let head = null;
  try {
    head = fn(r);
  } catch (e) {
    // 头卡是加法，取不到就不给，不能让一张卡拖垮整个排盘
    return null;
  }
  if (!head || !clean(head.headline)) return null;
  return {
    kicker: clip(head.kicker || '一览', 8),
    headline: clip(head.headline, 60),
    // 各体系已经用 facts() 折成 {k,v} 并截过长度，这里只做去空与限量
    facts: (Array.isArray(head.facts) ? head.facts : []).filter((f) => f && f.k && f.v).slice(0, 3),
    note: clip(head.note, 60),
  };
}

/** 这些体系应当有事实型头卡（测试用来对账：有数据的盘必须给出卡，且不许出现方向词） */
export const HEADLINE_SYSTEMS = Object.keys(HEADS);
