(function () {
  const TYPE_CLASS = { 主星: 'main', 吉星: 'good', 煞星: 'bad', 辅星: 'aux', 杂曜: 'aux' };
  const MUT_CLASS = { 禄: 'm-lu', 权: 'm-quan', 科: 'm-ke', 忌: 'm-ji' };
  let tab = 'ziwei';
  let mhMode = 'time';

  const el = (id) => document.getElementById(id);
  const pad = (n) => String(n).padStart(2, '0');

  const TIPS = {
    ziwei: '紫微斗数需要出生日期、时刻与性别；出生地只影响真太阳时修正。',
    bazi: '四柱八字按节气与真太阳时定时柱，出生地越准，时柱越稳。',
    liuyao: '六爻不需要出生时间：只用起卦当下的日辰定六神、月建定旺衰，卦由摇出。',
    meihua: '梅花用起卦时刻的年月日时数成卦，也可直接给两个数字起卦；与出生时间无关。',
    daliuren: '大六壬用起卦时刻的日干支、时支与月将起天地盘；同样与出生时间无关。',
    tarot: '塔罗不看时间，只记录抽牌时刻与你的提问。',
  };

  async function run() {
    const date = el('date').value;
    const time = el('time').value;
    const args = { system: tab };
    if (tab !== 'tarot') args.datetime = `${date}T${time}`;
    if (tab === 'bazi' || tab === 'ziwei') {
      args.gender = el('gender').value;
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
    if (tab === 'meihua') {
      args.mode = mhMode;
      if (mhMode === 'number') {
        args.upper = Number(el('upper').value);
        args.lower = Number(el('lower').value);
        if (el('changing').value !== '') args.changing = Number(el('changing').value);
      }
    }
    if (tab === 'tarot') {
      args.count = 3;
      const q = el('question').value.trim();
      if (q) args.question = q;
    }
    try {
      const r = window.Engine.compute(args);
      const it = window.Engine.interpret ? window.Engine.interpret(r) : (r.interpret || null);
      const html = tab === 'ziwei' ? window.__PP.ziweiHTML(r)
        : tab === 'bazi' ? window.__PP.baziHTML(r)
          : tab === 'meihua' ? window.__PP.meihuaHTML(r)
            : tab === 'daliuren' ? window.__PP.daliurenHTML(r)
              : tab === 'tarot' ? window.__PP.tarotHTML(r)
                : window.__PP.liuyaoHTML(r);
      el('out').innerHTML = window.__PP.resultWithInterpret(html, it);
    } catch (e) {
      el('out').innerHTML = `<div class="err">${(e && e.message) || e}</div>`;
    }
  }

  function runNow() {
    const d = new Date();
    el('date').value = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    el('time').value = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
    run();
  }

  function setTab(next) {
    tab = next;
    document.querySelectorAll('.tab').forEach((b) => b.classList.toggle('on', b.dataset.tab === tab));
    const birth = tab === 'bazi' || tab === 'ziwei';
    el('for-bazi').style.display = birth ? '' : 'none';
    el('for-gender').style.display = birth ? '' : 'none';
    el('for-liuyao').style.display = tab === 'liuyao' ? '' : 'none';
    el('for-meihua').style.display = tab === 'meihua' ? '' : 'none';
    el('for-tarot').style.display = tab === 'tarot' ? '' : 'none';
    el('for-date').style.display = tab === 'tarot' ? 'none' : '';
    el('for-time').style.display = tab === 'tarot' ? 'none' : '';
    el('now').style.display = tab === 'tarot' ? 'none' : '';
    el('lbl-date').textContent = birth ? '出生日期（公历）' : '起卦日期（公历）';
    el('lbl-time').textContent = birth ? '出生时刻' : '起卦时刻';
    el('go').textContent = tab === 'tarot' ? '抽牌' : birth ? '排盘' : '起卦';
    el('tip').textContent = TIPS[tab] || '';
    syncMhMode();
  }

  function syncMhMode() {
    document.querySelectorAll('#for-meihua .seg button').forEach((b) => b.classList.toggle('on', b.dataset.mode === mhMode));
    el('mh-num').style.display = (tab === 'meihua' && mhMode === 'number') ? '' : 'none';
    const mhTime = el('mh-time');
    if (mhTime) mhTime.style.display = (tab === 'meihua' && mhMode === 'time') ? '' : 'none';
  }

  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tab').forEach((b) => b.addEventListener('click', () => {
      setTab(b.dataset.tab);
      run();
    }));
    document.querySelectorAll('#for-meihua .seg button').forEach((b) => b.addEventListener('click', () => {
      mhMode = b.dataset.mode;
      syncMhMode();
    }));
    el('go').addEventListener('click', run);
    el('now').addEventListener('click', runNow);
    el('gender').addEventListener('change', run);
    setTab('ziwei');
    run();
  });
})();
