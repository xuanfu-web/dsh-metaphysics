// 共用渲染层：紫微/八字/六爻 -> HTML 字符串。面板与独立页面共用同一份。
(function () {
  const CSS = `
.pp{--ink:#1b1b1b;--muted:#6f6a60;--line:#c8c1b2;--bg:#fffdf8;--red:#b3261e;--lu:#1f6f3f;--quan:#8a5a00;--ke:#1f4e79;--ji:#b3261e;
  border:1px solid var(--line);background:var(--bg);color:var(--ink);font-family:"Songti SC","SimSun","Microsoft YaHei",serif;font-size:11px;line-height:1.5}
.pp *{box-sizing:border-box}
.pp-grid{display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,minmax(142px,auto));gap:0}
.pp-cell{border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:5px 6px;display:flex;flex-direction:column;position:relative;min-height:142px;background:var(--bg)}
.pp-cell:nth-child(4n){border-right:none}
.pp-cell.pp-lastrow{border-bottom:none}
.pp-center{grid-column:2/4;grid-row:2/4;border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:14px 16px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;text-align:center;background:var(--bg)}
.pp-center .t1{font-size:15px;font-weight:700;letter-spacing:.05em;margin-bottom:6px}
.pp-center .t2{font-size:11px;color:var(--ink)}
.pp-center .t3{font-size:12px;letter-spacing:.35em;margin:6px 0;font-weight:600}
.pp-center .t4{font-size:11px;color:var(--muted)}
.pp-stars{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:0 6px;font-size:11.5px;line-height:1.55;min-height:34px}
.pp-st{white-space:nowrap}
.pp-st.main{font-weight:700}
.pp-st.good{color:var(--lu)}
.pp-st.bad{color:var(--ji)}
.pp-st.aux{color:var(--muted)}
.pp-m{display:inline-block;font-style:normal;font-size:9px;line-height:1;padding:1px 2px;border-radius:2px;color:#fff;margin-left:1px;vertical-align:1px}
.pp-m.lu{background:var(--lu)}.pp-m.quan{background:var(--quan)}.pp-m.ke{background:var(--ke)}.pp-m.ji{background:var(--ji)}
.pp-ages{margin-top:2px;font-size:10px;color:var(--muted);letter-spacing:.02em}
.pp-foot{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;gap:4px;font-size:10px;color:var(--muted)}
.pp-foot .l{display:flex;flex-direction:column;gap:0;line-height:1.45}
.pp-foot .l .dx{color:var(--ink)}
.pp-foot .r{display:flex;flex-direction:column;align-items:flex-end;gap:0;line-height:1.45}
.pp-foot .pn{color:var(--red);font-size:12px;font-weight:700}
.pp-soul{box-shadow:inset 0 0 0 2px rgba(179,38,30,.35)}
.pp-body::after{content:"身";position:absolute;top:4px;left:4px;font-size:9px;color:#fff;background:var(--muted);padding:0 3px;border-radius:2px}
.pp-legend{display:flex;gap:10px;align-items:center;justify-content:center;font-size:10px;color:var(--muted);margin-top:6px}
.pp-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;font-family:system-ui,sans-serif}
.pp-chip{font-size:11px;padding:2px 8px;border:1px solid var(--line);color:var(--muted);background:var(--bg)}
.pp-chip.ok{color:var(--lu);border-color:var(--lu)}
.pp-chip.warn{color:var(--quan);border-color:var(--quan)}
.pp-sec{margin-top:10px}
.pp-sec-h{font-size:11px;letter-spacing:.08em;color:#8a8378;font-weight:700;margin-bottom:2px}
.pp-tl{font-size:11px;color:var(--muted);line-height:1.7}
.pp-bz{width:100%;border-collapse:collapse;font-size:12px;font-family:system-ui,sans-serif}
.pp-bz th,.pp-bz td{border:1px solid var(--line);padding:6px 8px;text-align:center}
.pp-bz th{color:var(--red);font-weight:600;font-size:11px}
.pp-bz td.big{font-size:20px;font-weight:700}
.pp-bz td.lbl{color:var(--muted);font-size:11px;width:52px}
.wx-wood{color:#1f6f3f}.wx-fire{color:#b3261e}.wx-earth{color:#8a5a00}.wx-metal{color:#8a6b1f}.wx-water{color:#1f4e79}
.zhuri{color:#b3261e;font-weight:700}
.pp-rel{margin-top:10px;font-size:11.5px;line-height:1.9}
.pp-rel b{color:var(--muted);font-weight:400;margin-right:10px}
.pp-str{margin-top:10px;font-size:11.5px;line-height:1.8}
.pp-str b{color:var(--red);font-size:13px;margin:0 4px}
.pp-drel{font-style:normal;color:var(--red);font-size:10px}
.tt{padding:14px}
.tt-head{font-size:11px;color:var(--muted);margin-bottom:12px;letter-spacing:.04em}
.tt-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(168px,1fr));gap:10px}
.tt-card{border:1px solid var(--line);background:#fffefb;padding:11px 12px;display:flex;flex-direction:column;gap:7px;min-height:158px}
.tt-card.rev{background:#fbf7f4;border-style:dashed}
.tt-pos{font-size:10px;color:var(--muted);letter-spacing:.14em}
.tt-name{font-size:17px;font-weight:700;color:var(--red);letter-spacing:.04em}
.tt-ori{font-size:10px;padding:1px 7px;border:1px solid var(--line);align-self:flex-start;color:var(--muted)}
.tt-kw{display:flex;flex-wrap:wrap;gap:4px 8px;font-size:11.5px;line-height:1.7}
.tt-kw span{border-bottom:1px dotted var(--line)}
.tt-el{margin-top:auto;font-size:10px;color:var(--muted)}
.tt-core{font-size:11px;color:#4a453d;line-height:1.7;border-left:2px solid var(--line);padding-left:7px}
.tt-no{font-size:10px;color:var(--muted);letter-spacing:.1em;margin-left:6px}
.tt-tip{margin-top:12px;font-size:10.5px;color:var(--muted)}
.tt-q{font-size:11.5px;margin-bottom:6px}
.tt-q b{color:var(--muted);font-weight:400;margin-right:8px}
.tt-read{margin-top:14px;border-top:1px solid var(--line);padding-top:10px}
.tt-rt{font-size:10px;letter-spacing:.14em;color:var(--muted);margin-bottom:6px}
.tt-read p{margin:0 0 5px;font-size:11.5px;line-height:1.85}
.tt-note{margin-top:12px}
.tt-ta{width:100%;border:1px solid var(--line);background:#fffefb;color:var(--ink);padding:8px;font-size:11.5px;font-family:inherit;line-height:1.7;resize:vertical;outline:none}
.tt-ta:focus{border-color:var(--red)}
.mh{padding:14px}
.mh-head{font-size:11.5px;color:var(--muted);margin-bottom:12px}
.mh-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px}
.mh-box{border:1px solid var(--line);background:#fffefb;padding:9px 11px}
.mh-t{font-size:10px;letter-spacing:.14em;color:var(--muted)}
.mh-n{font-size:16px;font-weight:700;color:var(--red);margin:2px 0 3px}
.mh-s{font-size:10.5px;color:var(--muted)}
.mh-body{display:flex;gap:24px;margin-top:14px;flex-wrap:wrap}
.mh-lines{display:flex;flex-direction:column;gap:2px;font-family:ui-monospace,Consolas,monospace;font-size:12.5px}
.mh-line{display:flex;align-items:center;gap:8px}
.mh-ln{width:32px;color:var(--muted);font-size:10.5px;font-family:system-ui,sans-serif}
.mh-line .yang{color:var(--ink)}
.mh-line .yin{color:var(--muted)}
.mh-line .mv{color:var(--red)}
.mh-mv{font-style:normal;color:var(--red);font-size:10px}
.mh-use{display:flex;flex-direction:column;gap:5px;font-size:12px;line-height:1.7}
.mh-use b{color:var(--muted);font-weight:400;margin-right:8px}
.mh-rel{margin-top:4px;font-weight:600}
.mh-rel.good{color:var(--lu)}
.mh-rel.bad{color:var(--ji)}
.dl{padding:14px}
.dl-head{font-size:11.5px;color:var(--muted);margin-bottom:12px}
.dl-chuans{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}
.dl-chuan,.dl-geju{border:1px solid var(--line);background:#fffefb;padding:8px 12px;min-width:92px;text-align:center}
.dl-k{font-size:10px;letter-spacing:.12em;color:var(--muted)}
.dl-z{font-size:20px;font-weight:700;color:var(--red);line-height:1.3}
.dl-j{font-size:11px}
.dl-l{font-size:10.5px;color:var(--muted)}
.dl-geju .dl-gn{font-size:15px;font-weight:700;margin-top:2px}
.dl-geju .dl-gd{font-size:10.5px;color:var(--muted)}
.dl-kes{display:flex;flex-direction:column;gap:4px;font-size:12px;margin-bottom:12px}
.dl-ke{display:flex;gap:8px;align-items:baseline}
.dl-ke b{color:var(--red);font-size:13px}
.dl-jp{color:var(--muted);font-size:11px}
.dl-pan{display:grid;grid-template-columns:repeat(6,1fr);gap:4px}
.dl-cell{border:1px solid var(--line);background:#fffefb;text-align:center;padding:4px 0}
.dl-t{font-size:15px;font-weight:700;color:var(--ink)}
.dl-d{font-size:10px;color:var(--muted)}
.dl-g{font-size:9.5px;color:var(--muted)}
.pp-ly{font-family:ui-monospace,Consolas,monospace;font-size:12px;width:100%}
.pp-ly .row{display:flex;gap:8px;align-items:center;padding:1px 0}
.pp-ly .nm{width:30px;color:var(--muted);font-size:10px}
.pp-ly .bar{width:64px;letter-spacing:1px}
.pp-ly .bar.yin{color:var(--muted)}
.pp-ly .bar.mv{color:var(--red)}
.pp-ly .mark{width:14px;color:var(--red);font-size:10px}
.pp-r{display:none}
.pp-modes{display:flex;align-items:center;border-bottom:1px solid var(--line);font-family:system-ui,sans-serif}
.pp-modes label{padding:4px 18px;font-size:11px;color:var(--muted);cursor:pointer;border-right:1px solid var(--line);user-select:none}
.pp-modes label:hover{background:#f2ece0}
.pp-soon{margin-left:auto;padding-right:10px;font-size:10px;color:#a9a296}
.pp-body{display:none}
#ppm-ben:checked~.pp-body.ben,#ppm-da:checked~.pp-body.da,#ppm-ln:checked~.pp-body.ln{display:block}
#ppm-ben:checked~.pp-modes label[for="ppm-ben"],#ppm-da:checked~.pp-modes label[for="ppm-da"],#ppm-ln:checked~.pp-modes label[for="ppm-ln"]{background:var(--red);color:#fff}
.pp-tri{background:#fbf8f1}
.pp-soul{background:#fdf3f1}
.pp-zh{margin-left:4px;white-space:nowrap}
.pp-ss{display:flex;flex-wrap:wrap;gap:0 7px;font-size:11px;line-height:1.6}
.pp-ss .s{white-space:nowrap;cursor:help}
.pp-ss .s.good{color:var(--lu)}
.pp-ss .s.bad{color:var(--ji)}
.pp-ss .s.neutral{color:var(--quan)}
.pp-ssx{margin-top:10px;font-family:system-ui,sans-serif}
.pp-ssx .h{display:flex;align-items:baseline;gap:8px;font-size:11px;color:var(--muted);border-top:1px solid var(--line);padding-top:8px;margin-top:10px}
.pp-ssx .h b{color:var(--red);font-size:12px;font-weight:600}
.pp-ssg{display:flex;gap:8px;align-items:baseline;margin-top:5px;font-size:11px;line-height:1.7}
.pp-ssg .gt{flex:0 0 36px;color:var(--muted);font-size:10.5px;letter-spacing:.08em}
.pp-ssg .gi{display:flex;flex-wrap:wrap;gap:3px 6px}
.pp-ssi{white-space:nowrap;border:1px solid var(--line);padding:0 5px;cursor:help}
.pp-ssi.good{color:var(--lu);border-color:rgba(31,111,63,.35)}
.pp-ssi.bad{color:var(--ji);border-color:rgba(179,38,30,.3)}
.pp-ssi.neutral{color:var(--quan);border-color:rgba(138,90,0,.3)}
.pp-ssi em{font-style:normal;font-size:9.5px;color:var(--muted);margin-left:2px}
`;
  const pp = (window.__PP = window.__PP || {});
  pp.CSS = CSS;

  const TYPE_CLASS = { 主星: 'main', 吉星: 'good', 煞星: 'bad', 辅星: 'aux', 杂曜: 'aux' };
  const MUT = { 禄: 'lu', 权: 'quan', 科: 'ke', 忌: 'ji' };
  const POS = {
    巳: [1, 1], 午: [1, 2], 未: [1, 3], 申: [1, 4],
    辰: [2, 1], 酉: [2, 4], 卯: [3, 1], 戌: [3, 4],
    寅: [4, 1], 丑: [4, 2], 子: [4, 3], 亥: [4, 4],
  };

  function starsHTML(stars) {
    if (!stars || !stars.length) return '';
    return stars.map((s) => {
      const cls = TYPE_CLASS[s.type] || 'aux';
      const m = s.mutagen ? `<i class="pp-m ${MUT[s.mutagen]}">${s.mutagen}</i>` : '';
      return `<span class="pp-st ${cls}">${s.name}${m}</span>`;
    }).join('');
  }

  function agesHTML(age) {
    const list = [];
    for (let i = 0; i < 6; i++) list.push(age + i * 12);
    return list.join(',');
  }

  const NAMES = ['命宫', '兄弟', '夫妻', '子女', '财帛', '疾厄', '迁移', '交友', '官禄', '田宅', '福德', '父母'];
  const BR = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  const fx = (n) => ((n % 12) + 12) % 12;
  const isTrine = (b, m) => b !== m && [fx(m + 4), fx(m + 8), fx(m + 6)].includes(b);

  function cellHTML(p, soulIdx) {
    const pos = POS[p.branch] || [1, 1];
    const b = BR.indexOf(p.branch);
    const cls = ['pp-cell'];
    if (b === soulIdx) cls.push('pp-soul');
    else if (isTrine(b, soulIdx)) cls.push('pp-tri');
    if (p.isBody) cls.push('pp-body');
    if (pos[0] === 4) cls.push('pp-lastrow');
    const ss = p.shensha || {};
    const pname = NAMES[fx(soulIdx - b)];
    const zh = (p.selfHua && p.selfHua.length)
      ? `<span class="pp-zh">${p.selfHua.map((x) => `<i class="pp-m ${MUT[x.type]}">${x.type}</i>`).join('')}</span>` : '';
    return `<div class="${cls.join(' ')}" style="grid-row:${pos[0]};grid-column:${pos[1]}">
      <div class="pp-stars">${starsHTML(p.stars)}${zh}</div>
      <div class="pp-ages">${agesHTML(p.xiaoxian.age)}</div>
      <div class="pp-foot">
        <div class="l">
          <span class="dx">${ss.boshi} ${p.daxian.start}-${p.daxian.end}</span>
          <span>${ss.jiangqian}</span>
          <span>${ss.suiqi}</span>
        </div>
        <div class="r">
          <span>${ss.changsheng}</span>
          <span>${p.ganzhi}</span>
          <span class="pn">${pname}</span>
        </div>
      </div>
    </div>`;
  }

  function sizhuOf(r) {
    try {
      const E = window.Engine || (window.__PP && window.__PP.Engine);
      if (!E || !E.buildBazi || !r.input) return '';
      const b = E.buildBazi({
        year: r.input.year, month: r.input.month, day: r.input.day,
        hour: r.input.hour, minute: r.input.minute,
        gender: r.input.gender, trueSolar: false,
      });
      return ['year', 'month', 'day', 'hour'].map((k) => b.pillars[k].ganzhi).join(' ');
    } catch (e) { return ''; }
  }

  pp.ziweiHTML = function (r) {
    const soulIdx = BR.indexOf(r.soul.branch);
    const ln = (r.liunian && r.liunian[0]) || null;
    const age = ln ? ln.age : 1;
    const dxPalace = r.palaces.find((p) => age >= p.daxian.start && age <= p.daxian.end) || r.palaces[0];
    const dxIdx = BR.indexOf(dxPalace.branch);
    const lnIdx = ln ? BR.indexOf(ln.lifePalace.branch) : soulIdx;

    const grid = (m) => r.palaces.map((p) => cellHTML(p, m)).join('');
    const center = (m, kind) => {
      const mode = kind === 'da'
        ? `<div class="t1">大限 ${dxPalace.ganzhi}　${dxPalace.daxian.start}-${dxPalace.daxian.end}岁</div>`
        : kind === 'ln' && ln
          ? `<div class="t1">流年 ${ln.ganzhi}　${ln.age}岁</div>`
          : `<div class="t1">${r.daxian.rule.slice(0, 2)}　${r.bureau.name}</div>`;
      return `<div class="pp-center">
        ${mode}
        <div class="t2">公历 ${r.input.year}-${String(r.input.month).padStart(2, '0')}-${String(r.input.day).padStart(2, '0')} ${String(r.input.hour).padStart(2, '0')}:${String(r.input.minute).padStart(2, '0')}</div>
        <div class="t2">农历 ${r.lunar.year}年${r.lunar.isLeap ? '闰' : ''}${r.lunar.month}月${r.lunar.day}日${r.hourBranch}时</div>
        ${sizhuOf(r) ? `<div class="t3">${sizhuOf(r)}</div>` : ''}
        <div class="t4">命主 ${r.lifeMaster}　身主 ${r.bodyMaster}</div>
        <div class="t4">命宫 ${r.soul.branch}　身宫 ${r.body.branch}　五行局 ${r.bureau.name}</div>
        <div class="t4">子年斗君 ${r.doujun ? r.doujun.zinian : '—'}　流年斗君 ${ln && ln.doujun ? ln.doujun : '—'}</div>
        <div class="t4">紫微 ${r.ziwei}　天府 ${r.tianfu}　${kind === 'da' ? '大限命宫 ' + BR[dxIdx] : kind === 'ln' ? '流年命宫 ' + BR[lnIdx] : '本命命宫 ' + r.soul.branch}</div>
        <div class="pp-legend"><span class="pp-m lu">禄</span><span class="pp-m quan">权</span><span class="pp-m ke">科</span><span class="pp-m ji">忌</span></div>
      </div>`;
    };

    const body = (id, m, kind) => `<div class="pp-body ${id}"><div class="pp-grid">${grid(m)}${center(m, kind)}</div></div>`;

    const cq = r.changqu;
    const chips = cq ? `<div class="pp-chips">
      <span class="pp-chip">昌 ${cq.wenchang.branch}（${cq.wenchang.palace}）</span>
      <span class="pp-chip">曲 ${cq.wenqu.branch}（${cq.wenqu.palace}）</span>
      <span class="pp-chip">${cq.relation}</span>
      <span class="pp-chip">入命三方 ${cq.inSoulSanfang ? '是' : '否'}</span>
      <span class="pp-chip ${cq.absorb.label === '杂' ? 'warn' : 'ok'}">吸收·${cq.absorb.label}</span>
    </div>` : '';
    const pats = (r.patterns || []).length
      ? `<div class="pp-chips">${r.patterns.map((p) => `<span class="pp-chip ${p.tone === 'good' ? 'ok' : p.tone === 'bad' ? 'warn' : ''}" title="${String(p.evidence || '').replace(/"/g, '&quot;')}">${p.name}</span>`).join('')}</div>` : '';
    const dxs = (r.daxianList || []).length
      ? `<div class="pp-chips">${r.daxianList.slice(0, 8).map((d) => `<span class="pp-chip" title="${String(`${d.ganzhi} 宫干四化：` + d.mutagenHits.map((m) => `${m.star}化${m.type}→${m.palace || '未上盘'}`).join('、'))}">${d.branch} ${d.ages[0]}-${d.ages[1]}</span>`).join('')}</div>` : '';
    const lnHit = ln && ln.mutagenHits && ln.mutagenHits.length
      ? `<div class="pp-chips">${ln.mutagenHits.map((m) => `<span class="pp-chip ${m.type === '忌' ? 'warn' : m.type === '禄' ? 'ok' : ''}">${m.star}化${m.type}→${m.palace || '未上盘'}</span>`).join('')}</div>` : '';

    return `<div class="pp">
      <input type="radio" name="ppm" id="ppm-ben" class="pp-r" checked>
      <input type="radio" name="ppm" id="ppm-da" class="pp-r">
      <input type="radio" name="ppm" id="ppm-ln" class="pp-r">
      <div class="pp-modes">
        <label for="ppm-ben">本命</label><label for="ppm-da">大限</label><label for="ppm-ln">流年</label>
        <span class="pp-soon">流月 · 流日 · 流时（未实现）</span>
      </div>
      ${body('ben', soulIdx, 'ben')}
      ${body('da', dxIdx, 'da')}
      ${body('ln', lnIdx, 'ln')}
    </div>${chips}${pats}${dxs}${lnHit}`;
  };

  pp.meihuaHTML = function (r) {
    const line = (l) => `<div class="mh-line"><span class="mh-ln">${l.name}</span><span class="${l.yinYang === '阳' ? 'yang' : 'yin'}${l.moving ? ' mv' : ''}">${l.yinYang === '阳' ? '━━━━━' : '━━  ━━'}</span>${l.moving ? '<i class="mh-mv">动</i>' : ''}</div>`;
    const box = (title, name, sub) => `<div class="mh-box"><div class="mh-t">${title}</div><div class="mh-n">${name}</div><div class="mh-s">${sub}</div></div>`;
    return `<div class="pp mh">
      <div class="mh-head">${r.source}</div>
      <div class="mh-grid">
        ${box('本卦', r.ben.name, `上${r.ben.upper} 下${r.ben.lower}`)}
        ${box('互卦', r.hu.name, `上${r.hu.upper} 下${r.hu.lower}`)}
        ${box('变卦', r.bian.name, r.movingName)}
        ${box('错卦', r.cuo.name, '六爻全变')}
        ${box('综卦', r.zong.name, '上下颠倒')}
      </div>
      <div class="mh-body">
        <div class="mh-lines">${r.lines.slice().reverse().map(line).join('')}</div>
        <div class="mh-use">
          <div><b>体</b>${r.bodyUse.body.trigram}（${r.bodyUse.body.element}）</div>
          <div><b>用</b>${r.bodyUse.use.trigram}（${r.bodyUse.use.element}）</div>
          <div class="mh-rel ${r.bodyUse.level === '凶' ? 'bad' : r.bodyUse.level.includes('吉') ? 'good' : ''}">${r.bodyUse.level}　${r.bodyUse.relation}</div>
        </div>
      </div>
    </div>`;
  };

  pp.daliurenHTML = function (r) {
    const sc = r.sanChuan;
    const cbox = (c, k) => `<div class="dl-chuan"><div class="dl-k">${k}</div><div class="dl-z">${c.zhi}</div><div class="dl-j">${c.jiangFull || c.jiang}</div><div class="dl-l">${c.liuQin}${c.xunKong ? ' · 空' : ''}</div></div>`;
    const ke = r.siKe.map((x) => `<div class="dl-ke"><span class="dl-k">${x.position}课</span><b>${x.shang}</b>上<b>${x.xia}</b>下<span class="pp-dim">${x.relation}</span><span class="dl-jp">${x.jiangFull || x.jiang}</span></div>`).join('');
    const pan = r.pan.map((p) => `<div class="dl-cell"><div class="dl-t">${p.tian}</div><div class="dl-d">${p.di}</div><div class="dl-g">${p.jiangFull}</div></div>`).join('');
    return `<div class="pp dl">
      <div class="dl-head">${r.dayGanZhi}日　${r.hourZhi}时（${r.dayNight}贵）　月将 ${r.yueJiang.name}${r.yueJiang.zhi}　节气 ${r.jieqi.name}　贵人${r.guiren.reverse ? '逆' : '顺'}行</div>
      <div class="dl-chuans">${cbox(sc.chu, '初传')}${cbox(sc.zhong, '中传')}${cbox(sc.mo, '末传')}<div class="dl-geju"><div class="dl-k">格局</div><div class="dl-gn">${r.geJu.name}</div><div class="dl-gd">${r.geJu.detail}</div></div></div>
      <div class="dl-kes">${ke}</div>
      <div class="dl-pan">${pan}</div>
    </div>`;
  };

  pp.tarotHTML = function (r) {
    const cards = r.cards.map((c) => `
      <div class="tt-card ${c.upright ? 'up' : 'rev'}">
        <div class="tt-pos" title="${String(c.positionHint || '').replace(/"/g, '&quot;')}">${c.position}</div>
        <div class="tt-name">${c.name}${c.number ? `<span class="tt-no">${c.number}</span>` : ''}</div>
        <div class="tt-ori">${c.orientation}</div>
        ${c.core ? `<div class="tt-core">${c.core}</div>` : ''}
        <div class="tt-kw">${c.keywords.map((k) => `<span>${k}</span>`).join('')}</div>
        <div class="tt-el">${c.arcana} · ${c.element}${c.suit ? ' · ' + c.suit + (c.rankCn ? c.rankCn : '') : ''}${c.domain ? ' · ' + c.domain : ''}</div>
      </div>`).join('');
    const reading = (r.reading || []).map((p) => `<p>${p}</p>`).join('');
    return `<div class="pp tt">
      <div class="tt-q"><b>所问</b>${r.question ? r.question : '<span class="pp-dim">（未填写，可在上方输入后重抽）</span>'}</div>
      <div class="tt-head">${r.spread}${r.castAt ? `　·　抽牌于 ${r.castAt}` : ''}</div>
      <div class="tt-grid">${cards}</div>
      <div class="tt-read"><div class="tt-rt">牌面解读</div>${reading}</div>
      <div class="tt-note"><div class="tt-rt">你的记录</div>
        <textarea class="tt-ta" rows="4" placeholder="写下判断或对照后的想法……（仅本页可见，不保存）"></textarea>
      </div>
      ${r.systemNote ? `<div class="tt-tip">${r.systemNote}</div>` : ''}
      <div class="tt-tip">塔罗用于自我觉察与娱乐，不作确定性预言。</div>
    </div>`;
  };

  pp.baziHTML = function (r) {
    const cols = [['year', '年柱'], ['month', '月柱'], ['day', '日柱'], ['hour', '时柱']];
    const SHORT = { year: '年', month: '月', day: '日', hour: '时' };
    const ELC = { 木: 'wood', 火: 'fire', 土: 'earth', 金: 'metal', 水: 'water' };
    const el = (e) => `<span class="wx-${ELC[e] || 'earth'}">${e}</span>`;
    const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    // 神煞：悬停显示「类别·查法来源查目标｜查法口诀」
    const ssTag = (x) => `<span class="s ${x.luck || 'neutral'}" title="${esc(`${x.cat} · ${x.via}查${x.target} ｜ ${x.rule}`)}">${x.name}</span>`;
    const line = (label, fn) => `<tr><td class="lbl">${label}</td>${cols.map(([k]) => `<td>${fn(r.pillars[k], k)}</td>`).join('')}</tr>`;
    const head = `<tr><th></th>${cols.map(([, n]) => `<th>${n}</th>`).join('')}</tr>`;
    const rows = [
      line('十神', (p, k) => `<span class="${k === 'day' ? 'zhuri' : 'pp-dim'}">${k === 'day' ? (r.input.gender === 'male' ? '元男' : '元女') : (p.stemTenGod || '—')}</span>`),
      line('天干', (p) => `<span class="big ${'wx-' + ELC[p.stemElement]}">${p.stem}</span>`),
      line('地支', (p) => `<span class="big ${'wx-' + ELC[p.branchElement]}">${p.branch}</span>`),
      line('藏干', (p) => p.hidden.map((x) => `<span class="wx-${ELC[x.element]}">${x.stem}${x.element}</span>`).join(' ')),
      line('支神', (p) => p.hidden.map((x) => `<span class="pp-dim">${x.tenGod}</span>`).join('<br>')),
      line('纳音', (p) => p.nayin),
      line('空亡', (p) => `<span class="pp-dim">${p.kongwang.join('')}</span>`),
      line('地势', (p) => p.dishi),
      line('自坐', (p) => p.zizuo),
      line('神煞', (p) => (p.shenshaDetail && p.shenshaDetail.length
        ? `<span class="pp-ss">${p.shenshaDetail.map(ssTag).join('')}</span>`
        : '<span class="pp-dim">—</span>')),
    ].join('');
    const wx = Object.entries(r.wuxing).map(([k, v]) => `<span class="pp-chip wx-${ELC[k]}">${k} ${v}</span>`).join('');

    // 格局 / 用神 / 十神
    const fr = r.frame || {};
    const tierCls = (t) => (t === '大吉' || t === '吉' ? 'ok' : t === '大忌' || t === '忌' ? 'warn' : '');
    const sect = (title, body) => (body ? `<div class="pp-sec"><div class="pp-sec-h">${title}</div>${body}</div>` : '');
    const gj = fr.geju && fr.geju.length ? `
      <div class="pp-tl">${fr.primary ? `主格 <b>${esc(fr.primary.name)}</b>　${esc(fr.primary.evidence)}` : ''}</div>
      <div class="pp-chips">${fr.geju.map((g) => `<span class="pp-chip" title="${esc(g.evidence)}">${esc(g.name)}<i class="pp-drel">${esc(g.kind)}</i></span>`).join('')}</div>` : '';
    const ys = fr.yongshen ? `
      <div class="pp-tl">喜 ${fr.yongshen.favor.map(el).join('')}　忌 ${fr.yongshen.avoid.map(el).join('')}　<span class="pp-dim">${esc(fr.yongshen.method)}</span></div>
      <div class="pp-chips">${fr.yongshen.favorTenGods.map((t) => `<span class="pp-chip ok">${esc(t)}</span>`).join('')}${fr.yongshen.avoidTenGods ? fr.yongshen.avoidTenGods.map((t) => `<span class="pp-chip warn">${esc(t)}</span>`).join('') : ''}</div>
      <div class="pp-tl pp-dim">${esc(fr.yongshen.detail)}</div>` : '';
    const gods = fr.godStats ? `<div class="pp-chips">${Object.entries(fr.godStats.groups).map(([k, v]) => `<span class="pp-chip">${k} ${v}</span>`).join('')}</div>` : '';

    // 行运
    const dy = r.dayun.list.map((d) => {
      const lk = d.luck || null;
      return `<span class="pp-chip ${lk ? tierCls(lk.tier) : ''}" title="${esc(lk ? `${lk.tier} ${lk.score}｜${(lk.reasons || []).join('；')}` : '')}">${d.startAge} ${d.ganzhi}${(d.relations && d.relations.length) ? ` <i class="pp-drel">${d.relations.join('')}</i>` : ''}${lk ? ` ${lk.tier}` : ''}</span>`;
    }).join('');
    const ln = (r.liunian && r.liunian.length) ? `<div class="pp-chips">${r.liunian.slice(0, 8).map((l) => {
      const lk = l.luck || null;
      return `<span class="pp-chip ${lk ? tierCls(lk.tier) : ''}" title="${esc(lk ? `${lk.tier} ${lk.score}｜${(lk.reasons || []).join('；')}` : '')}">${l.year} ${l.ganzhi}${lk ? ` ${lk.tier}` : ''}</span>`;
    }).join('')}</div>` : '';
    const str = r.strength ? `<div class="pp-str">日主强弱：<b>${r.strength.level}</b>${r.strength.score}　<span class="pp-dim">${r.strength.detail}</span></div>` : '';
    const ssGroups = (r.shensha && r.shensha.groups) || [];
    const ssx = ssGroups.length ? `
      <div class="pp-ssx">
        <div class="h"><b>神煞全览</b><span>共 ${r.shensha.count} 见 · ${ssGroups.length} 类 · 悬停看查法</span></div>
        ${ssGroups.map((g) => `<div class="pp-ssg"><span class="gt">${g.cat}</span><span class="gi">${g.items.map((i) => `<span class="pp-ssi ${i.luck || 'neutral'}" title="${esc(`${i.via}查${i.target} ｜ ${i.rule}`)}">${i.name}<em>${i.pillars.map((k) => SHORT[k] || '').join('')}</em></span>`).join('')}</span></div>`).join('')}
        <div class="h" style="border-top:none;padding-top:4px;margin-top:4px">神煞只作参考，吉凶仍须看格局、旺衰与行运。</div>
      </div>` : '';
    return `<div class="pp" style="padding:12px">
      <table class="pp-bz">${head}${rows}</table>
      <div class="pp-rel"><div><b>天干</b>${(r.relations && r.relations.stems.length) ? r.relations.stems.join(' · ') : '—'}</div>
      <div><b>地支</b>${(r.relations && r.relations.branches.length) ? r.relations.branches.join(' · ') : '—'}</div></div>
      ${str}
      ${sect('格局', gj)}
      ${sect('用神', ys)}
      ${sect('五行与十神', `<div class="pp-chips">${wx}</div>${gods}`)}
      ${sect('大运', `<div class="pp-chips">${dy}</div>`)}
      ${ln ? sect('流年', ln) : ''}
      ${ssx}
      <div style="margin-top:8px;font-size:11px;color:#6f6a60">上一节 ${r.jieqi.previous.name} ${r.jieqi.previous.time}　下一节 ${r.jieqi.next.name} ${r.jieqi.next.time}　${r.dayun.rule}，${r.dayun.startAge.years}岁起运</div>
    </div>`;
  };

  pp.liuyaoHTML = function (r) {
    const line = (hex) => hex.lines.slice().reverse().map((l) => {
      const mk = l.position === hex.shi ? '世' : l.position === hex.ying ? '应' : '';
      const bar = l.yinYang === '阳' ? '━━━━━' : '━━  ━━';
      const cls = ['bar', l.yinYang === '阳' ? 'yang' : 'yin', l.moving ? 'mv' : ''].join(' ');
      return `<div class="row"><span class="mark">${mk}</span><span class="nm">${l.name}</span><span class="${cls}">${bar}</span><span>${l.ganzhi}</span><span>${l.liuqin}</span><span class="pp-dim">${l.liushen}</span>${l.moving ? '<span class="mark">动</span>' : ''}</div>`;
    }).join('');
    const bian = r.bian ? `<div style="margin-top:10px;font-size:11px;color:#b3261e">变卦 ${r.bian.name}</div><div class="pp-ly">${line(r.bian)}</div>` : '';
    return `<div class="pp" style="padding:12px">
      <div style="font-size:11px;color:#6f6a60;margin-bottom:6px">起卦 ${r.cast.notation.join('、')}　日辰 ${r.dayGanZhi.name}</div>
      <div style="font-size:12px;font-weight:700;color:#b3261e">本卦 ${r.ben.name}（${r.ben.palace}·${r.ben.palaceElement}）</div>
      <div class="pp-ly">${line(r.ben)}</div>${bian}
    </div>`;
  };
})();
