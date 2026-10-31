// A4 影子盘：同参数同 ID、版本不同 id 变而 baseId 不变、跨版本字段自动 diff。
// 约束：ID 只由归一化参数 + 版本决定，不含调用时刻 / 随机会话；随机起卦把实际牌面算入。
import fs from 'node:fs';
import vm from 'node:vm';
import { compute, renderText, shadowSnapshot, shadowDiff, chartFingerprint } from '../engine/index.js';
import { apply as hostApply } from '../index.js';
import { ok } from './_harness.mjs';

const V = '0.51.0';
const BASE = { system: 'bazi', datetime: '1990-05-06T08:30', gender: 'male', shadow: true, shadowVersion: V };

// ── ① 确定性：同参数、不同键序、显式默认值 ─────────────────────
const a = compute(BASE);
const b = compute({ shadowVersion: V, shadow: true, gender: 'male', datetime: '1990-05-06T08:30', system: 'bazi' });
const c = compute({ ...BASE, lateZi: true, trueSolar: true, dst: true });
ok('同参数两次排盘 ID 相同', a.shadow.id === b.shadow.id, `${a.shadow.id} / ${b.shadow.id}`);
ok('同参数两次排盘 baseId 相同', a.shadow.baseId === b.shadow.baseId);
ok('键序不影响 ID', a.shadow.id === c.shadow.id);
ok('ID 形如 LY-7 位', /^LY-[0-9A-HJKMNP-TV-Z]{7}$/.test(a.shadow.id), a.shadow.id);
ok('baseId 形如 LY-7 位', /^LY-[0-9A-HJKMNP-TV-Z]{7}$/.test(a.shadow.baseId), a.shadow.baseId);

// ── ② 敏感性：参数、体系、asOf ──────────────────────────────────
const later = compute({ ...BASE, datetime: '1990-05-06T09:30' });
ok('改出生时刻 ID 变', later.shadow.id !== a.shadow.id);
ok('改出生时刻 baseId 变', later.shadow.baseId !== a.shadow.baseId);
const other = compute({ ...BASE, gender: 'female' });
ok('改性别 baseId 变', other.shadow.baseId !== a.shadow.baseId);
const ziwei = compute({ ...BASE, system: 'ziwei' });
ok('换体系 baseId 变', ziwei.shadow.baseId !== a.shadow.baseId);
const pinned = compute({ ...BASE, asOf: '2026-01-01T00:00' });
ok('固定 asOf 后 baseId 变', pinned.shadow.baseId !== a.shadow.baseId);
ok('固定 asOf 标记 asOfPinned', pinned.shadow.asOfPinned === true);
ok('未固定 asOf 标记 asOfPinned=false', a.shadow.asOfPinned === false);

// 地址解析出来的经度与直接传经度等价（地址原文不进指纹）
const addr = compute({ ...BASE, address: '安徽池州' });
const lon = compute({ ...BASE, longitude: addr.input.longitude });
ok('地址与等值经度得到同一 baseId', addr.shadow.baseId === lon.shadow.baseId, `${addr.input.longitude}`);

// ── ③ 版本：换版本 id 变、baseId 不变 ────────────────────────────
const v2 = compute({ ...BASE, shadowVersion: '0.52.0' });
ok('换版本 ID 变', v2.shadow.id !== a.shadow.id);
ok('换版本 baseId 不变', v2.shadow.baseId === a.shadow.baseId, `${a.shadow.baseId} / ${v2.shadow.baseId}`);
ok('版本写进影子盘', a.shadow.version === V && v2.shadow.version === '0.52.0');
ok('默认不挂影子盘', compute({ system: 'bazi', datetime: '1990-05-06T08:30', gender: 'male' }).shadow === undefined);
ok('chartFingerprint 可直接调用', chartFingerprint({ system: 'tarot', count: 3, question: 'x' }, { version: V }).id.startsWith('LY-'));

// ── ④ 随机起卦：同参数不等于同一副牌 ────────────────────────────
const t1 = compute({ system: 'tarot', question: 'x', shadow: true, shadowVersion: V });
const t2 = compute({ system: 'tarot', question: 'x', shadow: true, shadowVersion: V });
ok('未给 seed 的两次抽牌 ID 不同', t1.shadow.id !== t2.shadow.id);
ok('未给 seed 标记不可复算', t1.shadow.reproducible === false && /seed/.test(t1.shadow.reason));
const ts1 = compute({ system: 'tarot', question: 'x', seed: 7, shadow: true, shadowVersion: V });
const ts2 = compute({ system: 'tarot', question: 'x', seed: 7, shadow: true, shadowVersion: V });
ok('同 seed 抽牌 ID 相同', ts1.shadow.id === ts2.shadow.id);
ok('同 seed 标记可复算', ts1.shadow.reproducible === true);
const l1 = compute({ system: 'liuyao', question: 'x', shadow: true, shadowVersion: V });
const l2 = compute({ system: 'liuyao', question: 'x', shadow: true, shadowVersion: V });
ok('随机两卦 ID 不同', l1.shadow.id !== l2.shadow.id);
const le1 = compute({ system: 'liuyao', lines: [9, 7, 8, 8, 7, 6], question: 'x', shadow: true, shadowVersion: V });
const le2 = compute({ system: 'liuyao', lines: [9, 7, 8, 8, 7, 6], question: 'x', shadow: true, shadowVersion: V });
ok('给定六爻值可复算且 ID 相同', le1.shadow.id === le2.shadow.id && le1.shadow.reproducible === true);

// ── ⑤ 版本 diff：同 baseId 才比，字段不同才非零 ──────────────────
const same = shadowDiff(a, v2);
ok('同盘跨版本 sameId', same.sameId === true);
ok('同盘跨版本 versionChanged', same.versionChanged === true);
ok('代码未变时 0 处字段差异', same.total === 0, String(same.total));
ok('版本号进 diff', same.fromVersion === V && same.toVersion === '0.52.0');

const snap = JSON.parse(JSON.stringify(shadowSnapshot(a)));
snap.shadow.version = '0.50.5';
snap.data.pillars.hour.ganzhi = '甲子';
const moved = shadowDiff(snap, a);
ok('快照形式可直接 diff', moved.sameId === true && moved.total > 0, String(moved.total));
ok('diff 找出根因字段', moved.roots.some((r) => r.label === '时柱'), JSON.stringify(moved.roots));
ok('diff 带分类计数', moved.categories.some((x) => x.name === '四柱' && x.count >= 1), JSON.stringify(moved.categories));
ok('diff 标出版本变化', moved.versionChanged === true && moved.fromVersion === '0.50.5');
const wrongBase = shadowDiff(snap, later);
ok('baseId 不同拒绝比对', wrongBase.sameId === false && !!wrongBase.reason);
ok('缺影子盘信息不抛错', shadowDiff({}, a).sameId === false);

// ── ⑥ 文本层：摘要末尾带 ID、版本与不可复算提示 ─────────────────
const text = renderText(a);
ok('文本含影子盘 ID', text.includes(`【影子盘】${a.shadow.id}`), a.shadow.id);
ok('文本含基础指纹', text.includes(a.shadow.baseId));
ok('文本含版本', text.includes(`版本 ${V}`));
const tText = renderText(t1);
ok('文本提示不可复算', tText.includes('不可复算') && tText.includes('seed'));

// ── ⑦ 面板：渲染、转义、复制按钮、localStorage 自动对盘 ──────────
const sandbox = {
  window: {
    localStorage: (() => {
      const m = new Map();
      return {
        getItem: (k) => (m.has(k) ? m.get(k) : null),
        setItem: (k, v) => m.set(k, String(v)),
        removeItem: (k) => m.delete(k),
      };
    })(),
  },
  console,
};
sandbox.window.window = sandbox.window;
sandbox.window.Engine = { shadowSnapshot, shadowDiff };
vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
const PP = sandbox.window.__PP;
const card = PP.shadowHTML(a.shadow, null);
ok('面板渲染影子盘 ID', card.includes(a.shadow.id) && card.includes('影子盘'));
ok('面板带复制按钮', card.includes(`data-shadow-copy="${a.shadow.id}"`));
ok('面板带版本与基础指纹', card.includes(V) && card.includes(a.shadow.baseId));
ok('无 diff 时不渲染比对块', !card.includes('与上次同盘比对'));
ok('未固定 asOf 给出提示', card.includes('未固定 asOf'));
const diffCard = PP.shadowHTML(a.shadow, moved);
ok('有 diff 时展开比对块', diffCard.includes('与上次同盘比对') && diffCard.includes('open'));
ok('比对块列出根因', diffCard.includes('时柱') && diffCard.includes('甲子'));
ok('无影子盘时渲染空串', PP.shadowHTML(null, null) === '');
const evil = { ...a.shadow, id: 'LY-TEST', version: '<img src=x onerror=alert(1)>', baseId: '"><script>x</script>' };
const evilCard = PP.shadowHTML(evil, {
  sameId: true, versionChanged: true, fromVersion: '<b>', toVersion: '<i>', total: 1,
  roots: [{ label: '<u>', from: '<x>', to: '<y>' }], categories: [{ name: '<c>', count: 1 }],
});
ok('版本与指纹转义', !evilCard.includes('<img src=x') && !evilCard.includes('<script>') && evilCard.includes('&lt;img'));
ok('diff 文本转义', !evilCard.includes('<u>') && !evilCard.includes('<x>') && evilCard.includes('&lt;u&gt;'));

ok('首次对盘无 diff', PP.shadowTrack(a) === null);
const rerun = PP.shadowTrack(a);
ok('同版本重排 0 处变化', rerun && rerun.sameId === true && rerun.total === 0 && rerun.versionChanged === false);
// 把存档改成旧版本 + 改一个字段，模拟「升级后重排」
const store = JSON.parse(sandbox.window.localStorage.getItem('mp-shadow-v1'));
const key = a.shadow.baseId;
store[key].shadow.version = '0.50.5';
store[key].data.pillars.hour.ganzhi = '乙丑';
sandbox.window.localStorage.setItem('mp-shadow-v1', JSON.stringify(store));
const afterUpgrade = PP.shadowTrack(a);
ok('升级后自动 diff 出字段', afterUpgrade && afterUpgrade.versionChanged === true && afterUpgrade.total > 0);
ok('升级后 diff 指向时柱', afterUpgrade.roots.some((r) => r.label === '时柱'));

// ── ⑧ 宿主工具：shadow 参数可达、版本注入 ───────────────────────
let def = null;
hostApply({ tools: { register: (d) => { def = d; } }, effect: (fn) => fn() });
ok('工具 schema 暴露 shadow', !!(def && def.parameters.properties.shadow && def.parameters.properties.shadow.type === 'boolean'));
const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const hostOut = await def.execute({ system: 'bazi', datetime: '1990-05-06T08:30', gender: 'male', shadow: true });
ok('宿主注入包版本', !!(hostOut.shadow && hostOut.shadow.version === pkg.version), hostOut.shadow && hostOut.shadow.version);
ok('宿主结果带影子盘文本', renderText(hostOut).includes(`【影子盘】${hostOut.shadow.id}`));
