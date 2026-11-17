// 共用小工具：日期掩码 / 存储读写 / 缓存哈希 / 中文日期标签 / 当前时刻。
//
// 这八件事原来在 src/app.js（宿主面板）与 src/web-ui.js（独立页）各写一遍，
// 连函数名都一样：写法只差 pad 与 pad2、imul 是否逐步 >>>0，同输入同输出，
// 所以一直没暴露。但「同一件事写两处」迟早分叉——改一边忘另一边，面板认的
// 写法独立页不认；哈希口径悄悄不同，缓存键就对不上，而且不报错。
//
// 现在实现只存 panel-kit 一份，两条链各留一行委托。这里守三件事：
//   ① 共用层确实暴露了这八个；
//   ② 两条链里不许再出现各自的实现（只许 window.__PP 委托）；
//   ③ 共用层自己的行为对：掩码、哈希向量、存储降级、日期标签、当前时刻格式。
import fs from 'node:fs';
import vm from 'node:vm';
import { ok, eq } from './_harness.mjs';

const read = (p) => fs.readFileSync(new URL('../' + p, import.meta.url), 'utf8');
const APP = read('src/app.js');
const UI = read('src/web-ui.js');
const KIT = read('src/panel-kit.js');

const NAMES = ['isoDateOk', 'normalizeDateText', 'maskDateText', 'storeGet', 'storeSet', 'hash36', 'dayLabel', 'nowParts'];

/** 在 vm 里跑一遍 panel-kit，拿到它挂出来的 window.__PP */
function loadKit(extra = {}) {
  const win = Object.assign({ __PP: {} }, extra);
  vm.runInNewContext(KIT, {
    window: win,
    document: { createElement: () => ({ getContext: () => null, style: {} }), addEventListener() {}, querySelectorAll: () => [] },
    navigator: {},
    performance: { now: () => 0 },
    console,
  }, { timeout: 5000 });
  return win.__PP;
}

const PP = loadKit();

// ── ① 共用层暴露齐全 ──────────────────────────────────────────
ok('共用层挂出八个工具', NAMES.every((k) => typeof PP[k] === 'function'),
  NAMES.filter((k) => typeof PP[k] !== 'function').join(',') || '全有');

// ── ② 两条链只许委托，不许再实现 ──────────────────────────────
for (const [name, src] of [['面板', APP], ['独立页', UI]]) {
  for (const fn of NAMES) {
    ok(`${name}：${fn} 委托到共用层`,
      new RegExp(`function ${fn}\\([^)]*\\) \\{[^}]*window\\.__PP\\.${fn}\\(`).test(src));
  }
  // 反查：这些函数的实现特征不许回到链上
  ok(`${name}：没有重写哈希循环`, !/let h = 0x811c9dc5/.test(src));
  ok(`${name}：没有重写存储 try/catch`, !/JSON\.parse\(window\.localStorage\.getItem/.test(src));
  ok(`${name}：没有重写日期掩码规则`, !/digits\.length <= 6/.test(src));
}

// ── ③ 哈希：同串同值、异串异值、向量可复现 ────────────────────
eq('哈希是 FNV-1a 的既有向量（abc）', PP.hash36('abc'), '7aigaz');
eq('同串两次哈希一致', PP.hash36('mp.chartResult.v1|{"system":"bazi"}'), PP.hash36('mp.chartResult.v1|{"system":"bazi"}'));
ok('异串哈希不同', PP.hash36('bazi') !== PP.hash36('ziwei'));
ok('哈希结果落在 base36 小写字母数字里', /^[0-9a-z]+$/.test(PP.hash36('任意中文也要能算')));

// ── ④ 存储：不可用时静默降级，可用时可往返 ────────────────────
eq('没有 localStorage 时读回 null，不抛错', PP.storeGet('anything'), null);
ok('没有 localStorage 时写不炸', (() => { try { PP.storeSet('k', { a: 1 }); return true; } catch (e) { return false; } })());
{
  const box = new Map();
  const withStore = loadKit({
    localStorage: {
      getItem: (k) => (box.has(k) ? box.get(k) : null),
      setItem: (k, v) => { box.set(k, String(v)); },
    },
  });
  withStore.storeSet('mp.test', { n: 1, s: '中文' });
  eq('有 localStorage 时写进去能读回', withStore.storeGet('mp.test'), { n: 1, s: '中文' });
  box.set('mp.broken', '{不是 JSON');
  eq('存了坏数据就退回 null，不让面板白屏', withStore.storeGet('mp.broken'), null);
}

// ── ⑤ 日期标签：今天 / 昨天 / 月-日 / 无效 ────────────────────
{
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0).getTime();
  eq('今天算「今天」', PP.dayLabel(today), '今天');
  eq('昨天算「昨天」', PP.dayLabel(today - 86400000), '昨天');
  ok('更早写成 月-日（两位补零）', /^\d{2}-\d{2}$/.test(PP.dayLabel(today - 3 * 86400000)), PP.dayLabel(today - 3 * 86400000));
  eq('无法解析的时间返回空串', PP.dayLabel('不是时间'), '');
}

// ── ⑥ 当前时刻：本地时区的两段格式 ────────────────────────────
{
  const p = PP.nowParts();
  const d = new Date();
  ok('日期段是 YYYY-MM-DD', /^\d{4}-\d{2}-\d{2}$/.test(p.date), p.date);
  ok('时刻段是 HH:MM', /^\d{2}:\d{2}$/.test(p.time), p.time);
  eq('日期段就是本机今天', p.date, `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
}
