// 事实层：把盘面上「能指着说」的条目抽成一条条事实。
//
// 约定
// - id 形如 `f-bazi-strength`，全局唯一；正文段落用 refs 引它。
// - value 是一句短事实，只写盘面上看到了什么，不写判断。
// - group 只用于分组展示（四柱 / 旺衰 / 格局 / 喜忌 / 大运 / 流年 / 神煞 / 气候 / 盘面）。
// - 只读 r 与 env，不做计算、不抛异常：缺字段就跳过，宁可少一条事实，也不编。

const one = (v) => (v === null || v === undefined ? '' : String(v).trim());
const num = (v) => (Number.isFinite(Number(v)) ? Number(v) : null);

function add(list, id, label, value, group) {
  let v = one(value);
  if (!v) return;
  // 事实是「指着说一句话」，不是段落：超长的裁掉，别让事实层变成第二个正文
  if (v.length > 160) v = `${v.slice(0, 158)}…`;
  list.push({ id, label: one(label), value: v, group: one(group) || '盘面' });
}

// 通用兜底：任何体系都用 envelope 已经算出来的证据，至少保证「有事实可引」。
function genericFacts(r, env, list) {
  const evs = Array.isArray(env && env.evidence) ? env.evidence : [];
  for (let i = 0; i < evs.length; i += 1) {
    const e = evs[i] || {};
    add(list, one(e.id) || `f-generic-${i + 1}`, one(e.label), one(e.detail), '盘面');
  }
}

function baziFacts(r, env, list) {
  const p = r.pillars || {};
  const gz = (x) => one(x && x.ganzhi);
  const four = [gz(p.year), gz(p.month), gz(p.day), gz(p.hour)].filter(Boolean);
  if (four.length) add(list, 'f-bazi-pillars', '四柱', four.join(' '), '四柱');

  const dm = r.dayMaster || {};
  const dmTxt = [one(dm.stem) + one(dm.element), one(dm.yinYang)].filter(Boolean).join('·');
  if (dmTxt) add(list, 'f-bazi-daymaster', '日主', dmTxt, '四柱');

  const st = r.strength || {};
  const score = num(st.score);
  const stTxt = [one(st.level), score === null ? '' : `${score} 分`, one(st.basis)].filter(Boolean).join('｜');
  if (stTxt) add(list, 'f-bazi-strength', '旺衰', stTxt, '旺衰');

  const frame = r.frame || {};
  if (one(frame.primaryName)) add(list, 'f-bazi-geju', '格局', one(frame.primaryName), '格局');

  const ys = frame.yongshen || {};
  const favor = Array.isArray(ys.favor) ? ys.favor : [];
  const avoid = Array.isArray(ys.avoid) ? ys.avoid : [];
  if (favor.length || avoid.length) {
    add(list, 'f-bazi-yongshen', '喜忌', [favor.length ? `喜 ${favor.join('、')}` : '', avoid.length ? `忌 ${avoid.join('、')}` : '', one(ys.method)].filter(Boolean).join('｜'), '喜忌');
  }
  const neutral = Array.isArray(ys.neutral) ? ys.neutral : [];
  if (neutral.length) {
    add(list, 'f-bazi-neutral', '中神', neutral.map((n) => `${one(n.element)}（${one(n.role)} ${num(n.weight) === null ? '' : num(n.weight)} 分）`).join('、'), '喜忌');
  }

  const cli = r.climate || {};
  const cliKind = one(cli.kind);
  const cliLabel = one(cli.label);
  const cliNeed = one(cli.need && cli.need.element);
  if (cliKind || cliLabel) {
    add(list, 'f-bazi-climate', '气候', [cliKind, cliLabel === cliKind ? '' : cliLabel, cliNeed ? `宜${cliNeed}` : ''].filter(Boolean).join('｜'), '气候');
  }

  const wx = r.wuxing || {};
  const wxTxt = Object.keys(wx).filter((k) => num(wx[k]) !== null).map((k) => `${k} ${num(wx[k])}`).join(' ');
  if (wxTxt) add(list, 'f-bazi-wuxing', '五行分值', wxTxt, '旺衰');

  const list1 = Array.isArray(r.dayun && r.dayun.list) ? r.dayun.list : [];
  let d0 = list1.length ? list1[0] : null;
  // 按日期落位，不按年龄推：交运时刻精确到分钟，用年龄比会差出一步（2027 年才开始的大运
  // 被 42 岁这个整数带进来，盘面上就写成「当前」了）。日期解析不了才退回年龄法。
  const stamp = (s) => Date.parse(String(s || '').replace(' ', 'T'));
  const nowMs = Date.now();
  let hit = null;
  for (let i = 0; i < list1.length; i += 1) {
    const from = stamp(list1[i].fromDate);
    const to = stamp(list1[i].toDate);
    if (Number.isFinite(from) && Number.isFinite(to) && nowMs >= from && nowMs < to) { hit = list1[i]; break; }
  }
  if (hit) d0 = hit;
  else {
    const curAge = num(r.liunian && r.liunian[0] && r.liunian[0].age);
    if (curAge !== null) {
      for (let i = 0; i < list1.length; i += 1) {
        if (num(list1[i].startAge) !== null && num(list1[i].startAge) <= curAge) d0 = list1[i];
      }
    }
  }
  if (d0) {
    add(list, 'f-bazi-dayun', '当前大运', [one(d0.ganzhi), num(d0.startAge) === null ? '' : `${num(d0.startAge)} 岁起`, one(d0.fromDate), one(d0.toDate) ? `至 ${one(d0.toDate)}` : ''].filter(Boolean).join('｜'), '大运');
  }

  const ln = Array.isArray(r.liunian) ? r.liunian[0] : null;
  if (ln) {
    add(list, 'f-bazi-liunian', '当前流年', [num(ln.age) === null ? '' : `${num(ln.age)} 岁`, one(ln.ganzhi), one(ln.year)].filter(Boolean).join('｜'), '流年');
  }

  const daySh = Array.isArray(p.day && p.day.shensha) ? p.day.shensha : [];
  if (daySh.length) add(list, 'f-bazi-shensha-day', '日柱神煞', daySh.join('、'), '神煞');
  const yearSh = Array.isArray(p.year && p.year.shensha) ? p.year.shensha : [];
  if (yearSh.length) add(list, 'f-bazi-shensha-year', '年柱神煞', yearSh.join('、'), '神煞');

  const kwTxt = Array.isArray(r.kongwang)
    ? r.kongwang.map(one).filter(Boolean).join('、')
    : '';
  if (kwTxt) add(list, 'f-bazi-kongwang', '空亡', kwTxt, '神煞');

  const ry = r.renyuan || {};
  const rySeg = ry.segment && typeof ry.segment === 'object' ? num(ry.segment.start) : num(ry.segment);
  const ryTxt = [one(ry.activeElement), one(ry.active), rySeg === null ? '' : `第 ${rySeg} 日起`].filter(Boolean).join('｜');
  if (ryTxt) add(list, 'f-bazi-renyuan', '人元司令', ryTxt, '四柱');

  // 兜底：把 envelope 的证据也并进来（同 id 的以专用事实为准，故先占位后去重）
  const evs = Array.isArray(env && env.evidence) ? env.evidence : [];
  for (let i = 0; i < evs.length; i += 1) {
    const e = evs[i] || {};
    const id = one(e.id) || `f-bazi-ev-${i + 1}`;
    if (list.some((x) => x.id === id)) continue;
    add(list, id, one(e.label), one(e.detail), '盘面');
  }
}

const BUILDERS = { bazi: baziFacts };

export function buildFacts(r, env) {
  const list = [];
  if (!r || typeof r !== 'object') return list;
  const sys = one(r.system);
  const e = env && typeof env === 'object' ? env : (r.envelope && typeof r.envelope === 'object' ? r.envelope : {});
  try {
    (BUILDERS[sys] || genericFacts)(r, e, list);
  } catch (err) {
    // 事实层是加法：抽不出就不给，绝不让排盘跟着坏
    return [];
  }
  return list;
}

export function factById(list, id) {
  const key = one(id);
  if (!key || !Array.isArray(list)) return null;
  for (let i = 0; i < list.length; i += 1) {
    if (list[i] && list[i].id === key) return list[i];
  }
  return null;
}

export const FACT_SYSTEMS = Object.keys(BUILDERS);

// ── 段落 → 事实的引用表 ──
//
// 每段的 refs 只写「这一段用到了哪几条盘面事实」。规则：
// - 只能引用 buildFacts 真的会产出的 id，测试会逐条核对；
// - 方法类段落（怎么算的、哪里没算、口径分歧）不挂 refs——它们讲的是规则，不是这张盘；
// - 宁可少挂，不要挂「看起来相关」的：refs 是给用户回溯用的，挂错了比不挂更糟。
export const SECTION_REFS = {
  bazi: {
    cross: ['f-bazi-yongshen', 'f-bazi-dayun', 'f-bazi-wuxing', 'f-bazi-geju'],
    framework: ['f-bazi-pillars', 'f-bazi-daymaster', 'f-bazi-strength', 'f-bazi-wuxing'],
    portrait: ['f-bazi-daymaster', 'f-bazi-strength', 'f-bazi-geju'],
    reasoning: ['f-bazi-strength', 'f-bazi-yongshen', 'f-bazi-geju', 'f-bazi-dayun', 'f-bazi-liunian'],
    renyuan: ['f-bazi-renyuan', 'f-bazi-pillars'],
    timeline: ['f-bazi-dayun', 'f-bazi-liunian'],
    years: ['f-bazi-liunian'],
    advice: ['f-bazi-yongshen', 'f-bazi-climate'],
    suiyun: ['f-bazi-liunian'],
    checks: ['f-bazi-yongshen', 'f-bazi-wuxing', 'f-bazi-climate', 'f-bazi-dayun', 'f-bazi-liunian'],
    yongshen: ['f-bazi-yongshen'],
    climate: ['f-bazi-climate'],
    qiongtong: ['f-bazi-climate', 'f-bazi-yongshen'],
    palaces: ['f-bazi-pillars'],
    geju: ['f-bazi-geju'],
    bingyao: ['f-bazi-geju'],
    xianshen: ['f-bazi-geju'],
    structure: ['f-bazi-geju', 'f-bazi-pillars'],
    anhe: ['f-bazi-pillars'],
    hehua: ['f-bazi-pillars'],
    caiku: ['f-bazi-wuxing', 'f-bazi-yongshen'],
    balance: ['f-bazi-wuxing', 'f-bazi-strength'],
    shensha: ['f-bazi-shensha-day', 'f-bazi-shensha-year', 'f-bazi-kongwang'],
    classics: ['f-bazi-geju'],
    quant: ['f-bazi-strength'],
  },
};

export function refsFor(system, key) {
  const table = SECTION_REFS[one(system)];
  if (!table) return null;
  const r = table[one(key)];
  return Array.isArray(r) && r.length ? r.slice() : null;
}
