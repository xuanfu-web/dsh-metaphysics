(function () {
  const BR_POS = {
    巳: [1, 1], 午: [1, 2], 未: [1, 3], 申: [1, 4],
    辰: [2, 1], 酉: [2, 4],
    卯: [3, 1], 戌: [3, 4],
    寅: [4, 1], 丑: [4, 2], 子: [4, 3], 亥: [4, 4],
  };
  const TYPE_CLASS = { 主星: 'main', 吉星: 'good', 煞星: 'bad', 辅星: 'aux', 杂曜: 'aux' };
  const MUT_CLASS = { 禄: 'm-lu', 权: 'm-quan', 科: 'm-ke', 忌: 'm-ji' };
  let tab = 'ziwei';

  const el = (id) => document.getElementById(id);

  function starsHTML(stars) {
    if (!stars.length) return '<span class="dim">—</span>';
    return stars.map((s) => {
      const cls = TYPE_CLASS[s.type] || 'aux';
      const mut = s.mutagen ? `<i class="${MUT_CLASS[s.mutagen]}">${s.mutagen}</i>` : '';
      return `<span class="st ${cls}">${s.name}${mut}</span>`;
    }).join('');
  }

  function zvCell(p) {
    const pos = BR_POS[p.branch] || [1, 1];
    const marks = p.isBody ? '<b class="tag body">身</b>' : '';
    const ss = p.shensha || {};
    return `<div class="zc${p.isSoul ? ' soul' : ''}" style="grid-row:${pos[0]};grid-column:${pos[1]}">
      <div class="ph"><span class="pname">${p.palace}${marks}</span><span class="pbr">${p.branch}${p.ganzhi}</span></div>
      <div class="stars">${starsHTML(p.stars)}</div>
      <div class="ss">长生${ss.changsheng} 博士${ss.boshi} 将前${ss.jiangqian} 岁前${ss.suiqi}</div>
      <div class="foot">大限 ${p.daxian.start}-${p.daxian.end} · 小限 ${p.xiaoxian.age}</div>
    </div>`;
  }

  function ziweiHTML(r) {
    const cells = r.palaces.map(zvCell).join('');
    const cq = r.changqu;
    const center = `<div class="zc center">
      <div class="cl">${r.lunar.year}年${r.lunar.isLeap ? '闰' : ''}${r.lunar.month}月${r.lunar.day}日 · ${r.hourBranch}时</div>
      <div>${r.yearGanzhi}年　命宫 ${r.soul.branch}　身宫 ${r.body.branch}</div>
      <div>${r.bureau.name}　紫微 ${r.ziwei}　天府 ${r.tianfu}</div>
      <div>命主 ${r.lifeMaster}　身主 ${r.bodyMaster}</div>
      <div class="dim">${r.daxian.rule}，${r.daxian.startAge}岁起</div>
    </div>`;
    const chip = (t, extra = '') => `<span class="chip ${extra}">${t}</span>`;
    const cqBar = `<div class="chips">
      ${chip(`文昌 ${cq.wenchang.branch}（${cq.wenchang.palace}${cq.wenchang.mutagen ? '·化' + cq.wenchang.mutagen : ''}）`)}
      ${chip(`文曲 ${cq.wenqu.branch}（${cq.wenqu.palace}${cq.wenqu.mutagen ? '·化' + cq.wenqu.mutagen : ''}）`)}
      ${chip(cq.relation)}
      ${chip(`入命三方 ${cq.inSoulSanfang ? '是' : '否'}`)}
      ${chip(`吸收·${cq.absorb.label}`, cq.absorb.label === '杂' ? 'warn' : 'ok')}
    </div>`;
    const pats = r.patterns.map((p) => chip(`${p.name}`)).join('');
    return `<div class="zv">${cells}${center}</div>
      ${cqBar}
      <div class="chips">${pats || '<span class="chip dim">无明显格局</span>'}</div>
      <div class="note">${cq.absorb.reason}　｜　${cq.inSoulSanfang ? '昌曲入命三方，吸收面直接作用于命宫' : '昌曲不在命三方，影响偏外围'}</div>`;
  }

  function baziHTML(r) {
    const cols = [['year', '年柱'], ['month', '月柱'], ['day', '日柱'], ['hour', '时柱']];
    const row = (label, fn) => `<div class="lbl">${label}</div>${cols.map(([k]) => `<div class="cell">${fn(r.pillars[k])}</div>`).join('')}`;
    const head = `<div class="lbl"></div>${cols.map(([, n]) => `<div class="cell head">${n}</div>`).join('')}`;
    const body = [
      row('十神', (p) => `<span class="dim">${p.stemTenGod || '—'}</span>`),
      row('天干', (p) => `<span class="big">${p.stem}</span>`),
      row('地支', (p) => `<span class="big">${p.branch}</span>`),
      row('藏干', (p) => `<span class="small">${p.hidden.map((x) => `${x.stem}<span class="dim">·${x.tenGod}</span>`).join(' ')}</span>`),
      row('纳音', (p) => `<span class="small">${p.nayin}</span>`),
    ].join('');
    const wx = Object.entries(r.wuxing).map(([k, v]) => `<span class="chip">${k} ${v}</span>`).join('');
    const dy = r.dayun.list.map((d) => `<span class="chip">${d.startAge} ${d.ganzhi} <span class="dim">${d.stemTenGod}</span></span>`).join('');
    const ln = r.liunian.slice(0, 10).map((l) => `<span class="chip">${l.year}${l.ganzhi}</span>`).join('');
    return `<div class="chips" style="margin-bottom:14px">
        <span class="chip">日主 ${r.dayMaster.stem}${r.dayMaster.element}（${r.dayMaster.yinYang}）</span>
        <span class="chip">空亡 ${r.kongwang.join('')}</span>
      </div>
      <div class="bz">${head}${body}</div>
      <div class="chips">${wx}</div>
      <div class="note">真太阳时 ${r.solarTime.trueSolarText}　${r.solarTime.note}</div>
      <div class="note">上一节 ${r.jieqi.previous.name} ${r.jieqi.previous.time}　下一节 ${r.jieqi.next.name} ${r.jieqi.next.time}</div>
      <h3>${r.dayun.rule}　${r.dayun.startAge.years}岁${r.dayun.startAge.months}个月起运</h3>
      <div class="chips">${dy}</div>
      <h3>流年</h3>
      <div class="chips">${ln}</div>`;
  }

  function liuyaoHTML(r) {
    const line = (hex) => hex.lines.slice().reverse().map((l) => {
      const mark = l.position === hex.shi ? '<b class="tag">世</b>' : l.position === hex.ying ? '<b class="tag">应</b>' : '<span class="mark"></span>';
      const bar = l.yinYang === '阳' ? '━━━━━' : '━━  ━━';
      return `<div class="ly-row">${mark}<span class="ly-name">${l.name}</span><span class="ly-bar ${l.yinYang === '阳' ? 'yang' : 'yin'}${l.moving ? ' moving' : ''}">${bar}</span><span class="ly-gz">${l.ganzhi}</span><span class="ly-lq">${l.liuqin}</span><span class="ly-ls dim">${l.liushen}</span>${l.moving ? '<span class="ly-mv">动</span>' : ''}</div>`;
    }).join('');
    const bian = r.bian
      ? `<h3>变卦 ${r.bian.name}（${r.bian.palace}·${r.bian.palaceElement}）</h3><div class="ly">${line(r.bian)}</div>`
      : '<div class="note">六爻安静，无变卦</div>';
    return `<div class="note">起卦：${r.cast.notation.join('、')}（自下而上）　日辰 ${r.dayGanZhi.name}</div>
      <h3>本卦 ${r.ben.name}（${r.ben.palace}·${r.ben.palaceElement}）</h3>
      <div class="ly">${line(r.ben)}</div>${bian}`;
  }

  async function run() {
    const date = el('date').value;
    const time = el('time').value;
    const args = { system: tab, datetime: `${date}T${time}` };
    if (tab !== 'liuyao' && tab !== 'tarot') args.gender = el('gender').value;
    if (tab === 'bazi' || tab === 'ziwei') {
      args.trueSolar = el('ts').checked;
      const addr = el('addr').value.trim();
      if (addr) {
        args.address = addr;
        el('out').innerHTML = '<div class="note">正在解析地址…</div>';
        try {
          const g = await window.Engine.geocodeAddress(addr, { online: el('online').checked });
          if (g && typeof g.lon === 'number') { args.longitude = g.lon; args.geo = g; }
        } catch (e) { /* 退回内置表 */ }
      }
    }
    if (tab === 'liuyao') {
      const v = el('lines').value.split(/[^0-9]+/).filter(Boolean).map(Number);
      if (v.length === 6) args.lines = v;
    }
    if (tab === 'meihua') args.mode = 'time';
    if (tab === 'tarot') {
      args.count = 3;
      const q = el('question').value.trim();
      if (q) args.question = q;
    }
    try {
      const r = window.Engine.compute(args);
      el('out').innerHTML = tab === 'ziwei' ? window.__PP.ziweiHTML(r)
        : tab === 'bazi' ? window.__PP.baziHTML(r)
          : tab === 'meihua' ? window.__PP.meihuaHTML(r)
            : tab === 'daliuren' ? window.__PP.daliurenHTML(r)
              : tab === 'tarot' ? window.__PP.tarotHTML(r)
                : window.__PP.liuyaoHTML(r);
    } catch (e) {
      el('out').innerHTML = `<div class="err">${(e && e.message) || e}</div>`;
    }
  }

  function setTab(next) {
    tab = next;
    document.querySelectorAll('.tab').forEach((b) => b.classList.toggle('on', b.dataset.tab === tab));
    el('for-bazi').style.display = (tab === 'bazi' || tab === 'ziwei') ? '' : 'none';
    el('for-liuyao').style.display = tab === 'liuyao' ? '' : 'none';
    el('for-tarot').style.display = tab === 'tarot' ? '' : 'none';
    el('for-gender').style.display = (tab === 'liuyao' || tab === 'tarot' || tab === 'meihua') ? 'none' : '';
    const hideDate = tab === 'tarot';
    el('for-date').style.display = hideDate ? 'none' : '';
    el('for-time').style.display = hideDate ? 'none' : '';
    el('go').textContent = (tab === 'liuyao' || tab === 'meihua') ? '起卦' : tab === 'tarot' ? '抽牌' : '排盘';
  }

  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tab').forEach((b) => b.addEventListener('click', () => {
      setTab(b.dataset.tab);
      run();
    }));
    el('go').addEventListener('click', run);
    el('gender').addEventListener('change', run);
    setTab('ziwei');
    run();
  });
})();
