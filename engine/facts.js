// 事实层：把盘面上「能指着说」的条目抽成一条条事实。
//
// 约定
// - id 形如 `f-bazi-strength`，全局唯一；正文段落用 refs 引它。
// - value 是一句短事实，只写盘面上看到了什么，不写判断。
// - group 只用于分组展示（四柱 / 旺衰 / 格局 / 喜忌 / 大运 / 流年 / 神煞 / 气候 / 盘面）。
// - 只读 r 与 env，不做计算、不抛异常：缺字段就跳过，宁可少一条事实，也不编。

const one = (v) => (v === null || v === undefined ? '' : String(v).trim());
// Number(null) 是 0、Number('') 也是 0：不先挡掉空值，num() 会把「没有」变成「第 0」。
const num = (v) => {
  if (v === null || v === undefined || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

// 拼 value 时常有「这一项没有」的位置，会留下「｜｜」这种空段；清掉，别让事实看起来像坏数据。
function tidy(v) {
  return String(v).split('｜').map((x) => x.trim()).filter(Boolean).join('｜');
}

function add(list, id, label, value, group) {
  let v = tidy(one(value));
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

// 专用事实之后再并一次 evidence：同一个 id 以专用事实为准。
function mergeEvidence(env, list) {
  const evs = Array.isArray(env && env.evidence) ? env.evidence : [];
  for (let i = 0; i < evs.length; i += 1) {
    const e = evs[i] || {};
    const id = one(e.id) || `f-ev-${i + 1}`;
    if (list.some((x) => x.id === id)) continue;
    add(list, id, one(e.label), one(e.detail), '盘面');
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

  // 兜底：把 envelope 的证据也并进来（同 id 的以专用事实为准）
  mergeEvidence(env, list);
}

// 紫微看的是「哪个宫坐了什么星」，所以事实按宫位组织：命宫、身宫、十四主星落宫、煞星落宫。
// 四化单独立一组——它是紫微里最常被引用的判断入口，混在宫位里就不好引。
function ziweiFacts(r, env, list) {
  const palaces = Array.isArray(r.palaces) ? r.palaces : [];
  const soul = r.soul || {};
  const body = r.body || {};
  const soulPalace = palaces.find((p) => p && p.isSoul) || {};
  const soulStars = (Array.isArray(soulPalace.stars) ? soulPalace.stars : []).filter((s) => s && s.type === '主星');
  const soulMain = soulStars.map((s) => `${one(s.name)}${one(s.brightness) ? `（${one(s.brightness)}）` : ''}${one(s.mutagen) ? `化${one(s.mutagen)}` : ''}`).join('、');
  add(list, 'f-ziwei-soul', '命宫', [one(soul.branch), one(soul.ganzhi), soulMain || '无主星'].filter(Boolean).join('｜'), '宫位');
  add(list, 'f-ziwei-body', '身宫', [one(body.branch), one(body.lands)].filter(Boolean).join('｜'), '宫位');

  const bu = r.bureau || {};
  add(list, 'f-ziwei-bureau', '五行局', [one(bu.name), num(bu.number) === null ? '' : `${num(bu.number)} 局`].filter(Boolean).join('｜'), '盘面');
  add(list, 'f-ziwei-masters', '命主身主', [one(r.lifeMaster) ? `命主 ${one(r.lifeMaster)}` : '', one(r.bodyMaster) ? `身主 ${one(r.bodyMaster)}` : ''].filter(Boolean).join('｜'), '盘面');

  const sihua = [];
  for (let i = 0; i < palaces.length; i += 1) {
    const p = palaces[i] || {};
    const stars = Array.isArray(p.stars) ? p.stars : [];
    for (let j = 0; j < stars.length; j += 1) {
      if (stars[j] && stars[j].mutagen) sihua.push(`${one(stars[j].name)}化${one(stars[j].mutagen)}（${one(p.palace)}）`);
    }
  }
  if (sihua.length) add(list, 'f-ziwei-sihua', '生年四化', sihua.join('、'), '四化');

  const dist = [];
  const sha = [];
  for (let i = 0; i < palaces.length; i += 1) {
    const p = palaces[i] || {};
    const stars = Array.isArray(p.stars) ? p.stars : [];
    const mains = stars.filter((s) => s && s.type === '主星').map((s) => one(s.name)).filter(Boolean);
    if (mains.length) dist.push(`${one(p.palace)} ${mains.join('')}`);
    const shas = stars.filter((s) => s && s.type === '煞星').map((s) => one(s.name)).filter(Boolean);
    if (shas.length) sha.push(`${one(p.palace)} ${shas.join('')}`);
  }
  if (dist.length) add(list, 'f-ziwei-mainstars', '十四主星落宫', dist.join('｜'), '宫位');
  if (sha.length) add(list, 'f-ziwei-sha', '煞星落宫', sha.join('｜'), '宫位');

  const pats = Array.isArray(r.patterns) ? r.patterns : [];
  const good = pats.filter((p) => p && p.tone === 'good').map((p) => `${one(p.name)}${p.status === 'broken' ? '（已破）' : ''}`);
  const bad = pats.filter((p) => p && p.tone !== 'good').map((p) => one(p.name)).filter(Boolean);
  if (good.length) add(list, 'f-ziwei-pattern-good', '吉格', good.join('、'), '格局');
  if (bad.length) add(list, 'f-ziwei-pattern-bad', '需留意格局', bad.join('、'), '格局');

  const age = num(r.liunian && r.liunian[0] && r.liunian[0].age);
  const dxList = Array.isArray(r.daxianList) ? r.daxianList : [];
  let dx = null;
  if (age !== null) {
    for (let i = 0; i < dxList.length; i += 1) {
      const ages = dxList[i] && dxList[i].ages;
      if (Array.isArray(ages) && age >= ages[0] && age <= ages[1]) dx = dxList[i];
    }
  }
  if (!dx && dxList.length) dx = dxList[0];
  if (dx) {
    add(list, 'f-ziwei-daxian', '当前大限', [Array.isArray(dx.ages) ? `${dx.ages[0]}–${dx.ages[1]} 岁` : '', one(dx.palace), one(dx.ganzhi), (Array.isArray(dx.mutagen) ? dx.mutagen : []).join('、')].filter(Boolean).join('｜'), '大限');
  }

  const ln = Array.isArray(r.liunian) ? r.liunian[0] : null;
  if (ln) {
    const lp = ln.lifePalace || {};
    add(list, 'f-ziwei-flow', '当前流年', [num(ln.age) === null ? '' : `${num(ln.age)} 岁`, one(ln.year), one(ln.ganzhi), one(lp.palace) ? `流年命宫 ${one(lp.palace)}` : ''].filter(Boolean).join('｜'), '流年');
  }
  const fh = (r.flow && r.flow.year && Array.isArray(r.flow.year.mutagenHits)) ? r.flow.year.mutagenHits : [];
  if (fh.length) {
    add(list, 'f-ziwei-flow-sihua', '流年四化', fh.map((h) => `${one(h.star)}化${one(h.type)}入${one(h.palace)}`).join('、'), '四化');
  }

  mergeEvidence(env, list);
}

// 六爻：一张盘就是六爻的阴阳与所纳干支，所以事实按「卦 → 爻 → 世应 → 日月」组织。
// 用神依所问之事而定，引擎不预先指定，所以这里不编「用神是哪一爻」。
function liuyaoFacts(r, env, list) {
  const ben = r.ben || {};
  const bian = r.bian || {};
  const body = r.body || {};
  const bBody = body.ben || {};
  const lines = Array.isArray(ben.lines) ? ben.lines : [];
  add(list, 'f-liuyao-hex', '本卦', [one(ben.name), one(ben.upper) && `${one(ben.upper)}上${one(ben.lower)}下`, one(ben.palace) && `${one(ben.palace)}（${one(ben.palaceElement)}）`].filter(Boolean).join('｜'), '卦');
  if (one(bian.name)) add(list, 'f-liuyao-bian', '变卦', [one(bian.name), one(bian.palace) && `${one(bian.palace)}（${one(bian.palaceElement)}）`].filter(Boolean).join('｜'), '卦');
  const chongHe = [bBody.chong ? '六冲' : '', bBody.he ? '六合' : ''].filter(Boolean).join('、');
  if (chongHe) add(list, 'f-liuyao-chonghe', '卦体', [chongHe, Array.isArray(bBody.inner) ? `内卦 ${bBody.inner.join('')}` : '', Array.isArray(bBody.outer) ? `外卦 ${bBody.outer.join('')}` : ''].filter(Boolean).join('｜'), '卦');
  const shi = num(ben.shi);
  const ying = num(ben.ying);
  const at = (n) => lines.find((l) => num(l.position) === n);
  const shiL = at(shi);
  const yingL = at(ying);
  if (shiL || yingL) {
    add(list, 'f-liuyao-shiying', '世应', [
      shiL ? `世 ${one(shiL.name)}${one(shiL.liuqin)}（${one(shiL.ganzhi)}）` : '',
      yingL ? `应 ${one(yingL.name)}${one(yingL.liuqin)}（${one(yingL.ganzhi)}）` : '',
    ].filter(Boolean).join('｜'), '世应');
  }
  const moving = lines.filter((l) => l && l.moving);
  if (moving.length) {
    add(list, 'f-liuyao-moving', '动爻', moving.map((l) => `${one(l.name)}${one(l.liuqin)}化${one(l.liushen)}`).join('、'), '动爻');
  }
  const all = lines.map((l) => `${one(l.name)}${one(l.yinYang)}${one(l.liuqin)}${one(l.liushen)}`);
  if (all.length) add(list, 'f-liuyao-liuqin', '六亲六神', all.join('｜'), '爻');
  const gz = r.dayGanZhi || {};
  const kong = Array.isArray(r.xunKong) ? r.xunKong.join('') : '';
  add(list, 'f-liuyao-day', '日辰旬空', [one(gz.name) && `${one(gz.name)}日`, one(r.xunShou) ? `${one(r.xunShou)}旬` : '', kong ? `空亡 ${kong}` : ''].filter(Boolean).join('｜'), '日月');
  const hs = r.hexStrength || {};
  const linesS = Array.isArray(hs.lines) ? hs.lines : [];
  const kongN = linesS.filter((x) => x && x.kong).length;
  const dayE = hs.day || {};
  if (linesS.length || one(dayE.branch)) {
    add(list, 'f-liuyao-strength', '旺衰', [one(dayE.branch) && `日支 ${one(dayE.branch)}（${one(dayE.element)}）`, kongN ? `${kongN} 爻落空` : '', hs.month === null || hs.month === undefined ? '未给月建，只按日辰判' : ''].filter(Boolean).join('｜'), '旺衰');
  }
  mergeEvidence(env, list);
}

// 奇门：事实集中在「局、值符值使、九宫配置、刑墓空马」——这四样决定后面所有判断。
function qimenFacts(r, env, list) {
  const sz = r.siZhu || {};
  add(list, 'f-qimen-sizhu', '四柱', [one(sz.year), one(sz.month), one(sz.day), one(sz.time)].filter(Boolean).join(' '), '盘面');
  add(list, 'f-qimen-ju', '局', [one(r.ju), one(r.yuan), one(r.jieqi) ? `节气 ${one(r.jieqi)}` : '', one(r.juMethod)].filter(Boolean).join('｜'), '盘面');
  const zf = r.zhiFu || {};
  if (one(zf.star)) add(list, 'f-qimen-zhifu', '值符', [one(zf.star), num(zf.gong) === null ? '' : `${num(zf.gong)} 宫`, num(zf.yuanGong) === null ? '' : `原宫 ${num(zf.yuanGong)}`].filter(Boolean).join('｜'), '值符');
  const zs = r.zhiShi || {};
  if (one(zs.gate)) add(list, 'f-qimen-zhishi', '值使', [one(zs.gate), num(zs.gong) === null ? '' : `${num(zs.gong)} 宫`].filter(Boolean).join('｜'), '值使');
  const palaces = Array.isArray(r.palaces) ? r.palaces : [];
  const brief = palaces.filter((p) => p && num(p.palace) !== 5).map((p) => `${num(p.palace)}宫 ${one(p.star)}${one(p.gate)}${one(p.god)}`);
  if (brief.length) add(list, 'f-qimen-palaces', '九宫配置', brief.join('｜'), '九宫');
  const kw = Array.isArray(r.kongWang) ? r.kongWang.join('') : '';
  const ma = r.ma || {};
  add(list, 'f-qimen-kongma', '空亡马星', [kw ? `空亡 ${kw}` : '', one(ma.zhi) ? `马星 ${one(ma.zhi)}（${num(ma.gong)} 宫）` : ''].filter(Boolean).join('｜'), '九宫');
  const cd = r.conditions || {};
  const parts = [];
  if (Array.isArray(cd.jiXing) && cd.jiXing.length) parts.push(`击刑 ${cd.jiXing.map((x) => `${num(x.palace)}宫${one(x.stem)}`).join('、')}`);
  if (Array.isArray(cd.ruMu) && cd.ruMu.length) parts.push(`入墓 ${cd.ruMu.length} 处`);
  if (Array.isArray(cd.liuYiRuMu) && cd.liuYiRuMu.length) parts.push(`六仪入墓 ${cd.liuYiRuMu.length} 处`);
  if (parts.length) add(list, 'f-qimen-conditions', '刑墓', parts.join('｜'), '条件');
  const st = r.states || {};
  const gs = st.gate || {};
  const seg = ['旺', '相', '休', '囚', '死'].filter((k) => Array.isArray(gs[k]) && gs[k].length).map((k) => `${k} ${gs[k].join('')}`);
  if (seg.length) add(list, 'f-qimen-states', '门旺衰', seg.join('｜'), '旺衰');
  mergeEvidence(env, list);
}

// 塔罗：事实是「哪张牌落在哪个位置、正逆如何」——解读全靠这个，牌义本身不算事实。
function tarotFacts(r, env, list) {
  const cards = Array.isArray(r.cards) ? r.cards : [];
  if (one(r.spread)) add(list, 'f-tarot-spread', '牌阵', one(r.spread), '牌阵');
  if (cards.length) {
    add(list, 'f-tarot-cards', '牌位', cards.map((c) => `${one(c.position)} ${one(c.name)}${c.orientation ? `（${one(c.orientation)}）` : ''}`).join('｜'), '牌位');
  }
  const rev = cards.filter((c) => c && c.upright === false);
  if (cards.length) add(list, 'f-tarot-orient', '正逆', [`共 ${cards.length} 张`, `${cards.length - rev.length} 正`, `${rev.length} 逆`].filter(Boolean).join('｜'), '牌位');
  const suits = [];
  for (let i = 0; i < cards.length; i += 1) {
    const c = cards[i] || {};
    if (one(c.suit)) suits.push(`${one(c.suit)}（${one(c.element)}）`);
  }
  if (suits.length) add(list, 'f-tarot-suits', '花色元素', suits.join('、'), '牌位');
  if (one(r.castAt)) add(list, 'f-tarot-cast', '抽牌时刻', one(r.castAt), '盘面');
  mergeEvidence(env, list);
}

// 大六壬：四课三传是这张盘的全部结构，事实就照这四样摆，不掺判断。
function daliurenFacts(r, env, list) {
  add(list, 'f-daliuren-day', '日辰', [one(r.dayGanZhi), one(r.hourZhi) ? `${one(r.hourZhi)}时` : '', one(r.dayNight)].filter(Boolean).join('｜'), '日辰');
  const yj = r.yueJiang || {};
  const gr = r.guiren || {};
  add(list, 'f-daliuren-yuejiang', '月将贵人', [one(yj.name) ? `月将 ${one(yj.name)}（${one(yj.zhi)}）` : '', one(gr.zhi) ? `贵人 ${one(gr.zhi)}${gr.reverse ? '（逆行）' : '（顺行）'}` : ''].filter(Boolean).join('｜'), '盘面');
  const sike = Array.isArray(r.siKe) ? r.siKe : [];
  if (sike.length) {
    add(list, 'f-daliuren-sike', '四课', sike.map((k) => `${num(k.position)} ${one(k.shang)}/${one(k.xia)} ${one(k.jiangFull)} ${one(k.relation)}`).join('｜'), '四课');
  }
  const sc = r.sanChuan || {};
  const tri = ['chu', 'zhong', 'mo'].map((k) => sc[k]).filter(Boolean);
  if (tri.length) {
    add(list, 'f-daliuren-sanchuan', '三传', tri.map((t) => `${one(t.position)} ${one(t.zhi)} ${one(t.liuQin)} ${one(t.jiangFull)}${t.xunKong ? '（空亡）' : ''}`).join('｜'), '三传');
  }
  const gj = r.geJu || {};
  if (one(gj.name)) add(list, 'f-daliuren-geju', '课体', [one(gj.name), one(gj.detail)].filter(Boolean).join('｜'), '课体');
  const ss = Array.isArray(r.shensha) ? r.shensha : [];
  if (ss.length) add(list, 'f-daliuren-shensha', '神煞', ss.map((s) => `${one(s.name)}${one(s.branch)}`).join('、'), '神煞');
  mergeEvidence(env, list);
}

// 梅花：体用是判断轴心，卦象是过程与结果，事实按这四块摆。
function meihuaFacts(r, env, list) {
  const ben = r.ben || {};
  const hu = r.hu || {};
  const bian = r.bian || {};
  add(list, 'f-meihua-ben', '本卦', [one(ben.name), one(ben.upper) && `${one(ben.upper)}上${one(ben.lower)}下`, one(ben.element)].filter(Boolean).join('｜'), '卦象');
  if (one(hu.name)) add(list, 'f-meihua-hu', '互卦', [one(hu.name), one(hu.element)].filter(Boolean).join('｜'), '卦象');
  if (one(bian.name)) add(list, 'f-meihua-bian', '变卦', [one(bian.name), one(bian.element)].filter(Boolean).join('｜'), '卦象');
  const bu = r.bodyUse || {};
  const bd = bu.body || {};
  const us = bu.use || {};
  if (one(bd.trigram) || one(us.trigram)) {
    add(list, 'f-meihua-tiyong', '体用', [`体 ${one(bd.trigram)}（${one(bd.element)}）`, `用 ${one(us.trigram)}（${one(us.element)}）`, one(bu.relation), one(bu.level)].filter(Boolean).join('｜'), '体用');
  }
  if (num(r.moving) !== null) add(list, 'f-meihua-moving', '动爻', [one(r.movingName) || `${num(r.moving)} 爻`, one(r.source)].filter(Boolean).join('｜'), '卦象');
  mergeEvidence(env, list);
}

const BUILDERS = {
  bazi: baziFacts, ziwei: ziweiFacts, liuyao: liuyaoFacts, qimen: qimenFacts,
  tarot: tarotFacts, daliuren: daliurenFacts, meihua: meihuaFacts,
};
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
  // 紫微的段落是按「先看命身、再看格局、再看四化与流年」组织的，
  // 所以 identity 引命身局主，palaces 引星曜落宫，四化与飞星各引四化事实。
  ziwei: {
    identity: ['f-ziwei-soul', 'f-ziwei-body', 'f-ziwei-bureau', 'f-ziwei-masters'],
    palaces: ['f-ziwei-mainstars', 'f-ziwei-sha', 'f-ziwei-soul'],
    'pattern-good': ['f-ziwei-pattern-good', 'f-ziwei-soul'],
    'pattern-bad': ['f-ziwei-pattern-bad', 'f-ziwei-sha'],
    advice: ['f-ziwei-soul', 'f-ziwei-sihua', 'f-ziwei-daxian'],
    reasoning: ['f-ziwei-soul', 'f-ziwei-sihua', 'f-ziwei-daxian', 'f-ziwei-flow'],
    timeline: ['f-ziwei-daxian', 'f-ziwei-flow'],
    sihua: ['f-ziwei-sihua', 'f-ziwei-flow-sihua'],
    fly: ['f-ziwei-sihua'],
    flyComposite: ['f-ziwei-sihua', 'f-ziwei-daxian'],
    flow: ['f-ziwei-flow', 'f-ziwei-flow-sihua', 'f-ziwei-daxian'],
  },
  // 六爻：卦辞爻辞引本卦与动爻，断卦引六亲世应与日辰。
  liuyao: {
    guaCi: ['f-liuyao-hex', 'f-liuyao-chonghe', 'f-liuyao-shiying'],
    yaoCi: ['f-liuyao-moving', 'f-liuyao-hex'],
    bianGua: ['f-liuyao-bian', 'f-liuyao-moving'],
    jingText: ['f-liuyao-hex', 'f-liuyao-bian'],
    scene: ['f-liuyao-hex', 'f-liuyao-day'],
    liuqin: ['f-liuyao-liuqin', 'f-liuyao-shiying', 'f-liuyao-moving'],
    body: ['f-liuyao-chonghe', 'f-liuyao-bian'],
    hexStrength: ['f-liuyao-strength', 'f-liuyao-day'],
  },
  // 奇门：先局与值符值使定盘，再九宫配置与刑墓空马定凶吉落点。
  qimen: {
    facts: ['f-qimen-sizhu', 'f-qimen-ju'],
    zhifu: ['f-qimen-zhifu'],
    zhishi: ['f-qimen-zhishi'],
    yongshen: ['f-qimen-sizhu', 'f-qimen-ju'],
    relation: ['f-qimen-palaces'],
    conditions: ['f-qimen-conditions'],
    ganying: ['f-qimen-palaces', 'f-qimen-kongma'],
    states: ['f-qimen-states'],
    tendency: ['f-qimen-zhifu', 'f-qimen-zhishi', 'f-qimen-kongma'],
  },
  // 塔罗：叙述引牌位，结构引正逆与花色。牌义解释是推演，不进事实层。
  tarot: {
    narrative: ['f-tarot-cards', 'f-tarot-spread'],
    structure: ['f-tarot-orient', 'f-tarot-suits'],
  },
  // 大六壬：断事看三传，取课看课体，四课是来由。
  daliuren: {
    sanChuan: ['f-daliuren-sanchuan', 'f-daliuren-geju'],
    geju: ['f-daliuren-geju', 'f-daliuren-yuejiang', 'f-daliuren-sike'],
  },
  // 梅花：卦辞引本卦，体用引生克，互变引过程与结果。
  meihua: {
    guaCi: ['f-meihua-ben', 'f-meihua-moving'],
    tiYong: ['f-meihua-tiyong', 'f-meihua-ben'],
    yaoCi: ['f-meihua-moving', 'f-meihua-ben'],
    huGua: ['f-meihua-hu'],
    bianGua: ['f-meihua-bian', 'f-meihua-tiyong'],
    jingText: ['f-meihua-ben', 'f-meihua-bian'],
    scene: ['f-meihua-tiyong', 'f-meihua-moving'],
  },
};

export function refsFor(system, key) {
  const table = SECTION_REFS[one(system)];
  if (!table) return null;
  const r = table[one(key)];
  return Array.isArray(r) && r.length ? r.slice() : null;
}
