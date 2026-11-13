// 卦例库（本机命例集）：存储层与导出的闸门。
//
// 为什么单独测这一层：卦例是从 localStorage 读回来的外部输入——用户手改、旧版本写坏、
// 清站点数据留下半条，都会把畸形对象直接送进列表和 replay()。replay 拿这组参数去排盘，
// 畸形参数会排出一张不存在的盘。所以这里逐条钉：坏输入整条丢 / 排序稳定 /
// 上限淘汰只淘汰最旧 / 一分钟内同参数去重 / 状态只收四值 / 导出可被 JSONL 解析 /
// 迁移幂等 / 配额满要如实报失败。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ok, eq } from './_harness.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const kitSrc = fs.readFileSync(path.join(root, 'src', 'panel-kit.js'), 'utf8');
const KEY = 'dsh-metaphysics/cases-v1';
const T0 = 1750000000000;

/** 每个用例一套隔离的假 window + 假 localStorage；writes 记录 setItem 次数 */
function boot(init, opt) {
  const o = opt || {};
  const map = new Map();
  if (init != null) map.set(KEY, typeof init === 'string' ? init : JSON.stringify(init));
  let writes = 0;
  const win = {
    localStorage: o.noStorage ? undefined : {
      getItem: (k) => (map.has(k) ? map.get(k) : null),
      setItem: (k, v) => {
        writes += 1;
        if (o.throwOnSet) throw new Error('QuotaExceededError');
        map.set(k, String(v));
      },
      removeItem: (k) => map.delete(k),
    },
  };
  new Function('window', kitSrc)(win);
  const PP = win.__PP;
  return {
    PP,
    raw: () => {
      const s = map.get(KEY);
      try { return s ? JSON.parse(s) : []; } catch (e) { return null; }
    },
    writes: () => writes,
  };
}

const entry = (over) => Object.assign({ kind: 'bazi', date: '1990-05-12', time: '14:30', at: T0 }, over || {});

// ── 1. 空库与坏输入 ──────────────────────────────────────────────
{
  const { PP } = boot(null);
  eq('空库读出空数组', PP.casesLoad(), []);
  eq('空库导出空串', PP.casesExport(), '');
}

{
  const bad = [
    null,
    123,
    [],
    { at: T0 },                                              // 没有 entry
    { id: 'a', at: T0, entry: { date: '1990-05-12' } },      // kind 缺失
    { id: 'a', at: T0, entry: { kind: 'nope', date: '1990-05-12' } }, // kind 不在白名单
    { id: 'a', at: T0, entry: { kind: 'bazi' } },            // date/time/question 全空
    { id: '', at: T0, entry: entry() },                      // id 空
    { id: 'a', entry: entry({ at: 0 }) },                    // 完全没有时间
    { id: 'x'.repeat(70), at: T0, entry: entry() },          // id 过长
  ];
  const { PP } = boot(bad);
  eq('坏条目整条丢弃（10 条全坏 → 空）', PP.casesLoad().length, 0);
}

{
  // 一条好的混在坏的中：好的留下
  const { PP } = boot([{ id: 'ok1', at: T0, entry: entry() }, { id: 'bad', entry: entry({ at: 0 }) }]);
  const list = PP.casesLoad();
  eq('好条目照留', list.length, 1);
  eq('坏条目被滤掉', list[0].id, 'ok1');
  eq('缺省状态是待验', list[0].status, 'pending');
}

// ── 2. 非法 status 回落 pending ──────────────────────────────────
{
  const { PP } = boot([{ id: 'a', at: T0, status: 'wat', entry: entry() }]);
  eq('非法状态回落 pending', PP.casesLoad()[0].status, 'pending');
}

// ── 3. 排序：新在前，同一毫秒按 id 兜底且稳定 ─────────────────────
{
  const { PP } = boot([
    { id: 'old', at: T0, entry: entry() },
    { id: 'new', at: T0 + 5000, entry: entry({ question: '问财运' }) },
    { id: 'mid', at: T0 + 1000, entry: entry({ question: '问婚姻' }) },
  ]);
  const ids = PP.casesLoad().map((x) => x.id);
  eq('按时间降序', ids.join(','), 'new,mid,old');
  eq('重复读顺序一致', PP.casesLoad().map((x) => x.id).join(','), 'new,mid,old');
}

// ── 4. 新增 ─────────────────────────────────────────────────────
{
  const { PP, raw, writes } = boot(null);
  const r = PP.casesAdd(entry());
  ok('新增成功', r.ok === true && !r.dup);
  eq('库里有 1 条', r.list.length, 1);
  eq('落盘 1 条', raw().length, 1);
  ok('写了一次 localStorage', writes() === 1);
  ok('新 id 以 c 开头', /^c/.test(r.list[0].id));
  eq('摘要取 entry.question', r.list[0].question, '');
}

{
  const { PP } = boot(null);
  PP.casesAdd(entry({ question: '问事业' }));
  eq('问题摘要被带出', PP.casesLoad()[0].question, '问事业');
}

{
  const { PP } = boot(null);
  const r = PP.casesAdd('不是对象');
  ok('非对象输入如实返回失败', r.ok === false && r.list.length === 0);
}

{
  // entry 不合法（kind 不在白名单）→ 失败且不写
  const { PP, writes } = boot(null);
  const r = PP.casesAdd({ kind: 'nope', date: '1990-05-12', at: T0 });
  ok('非法体系拒收', r.ok === false);
  eq('拒收不落盘', writes(), 0);
}

// ── 5. 一分钟内同参数去重 ────────────────────────────────────────
{
  const { PP } = boot(null);
  PP.casesAdd(entry());
  const r = PP.casesAdd(entry({ at: T0 + 30000 }));
  ok('30 秒内同参数判重复', r.ok === true && r.dup === true);
  eq('重复不新增', r.list.length, 1);
}

{
  const { PP } = boot(null);
  PP.casesAdd(entry());
  const r = PP.casesAdd(entry({ at: T0 + 61000 }));
  ok('61 秒后同参数照收', r.ok === true && !r.dup);
  eq('新增到 2 条', r.list.length, 2);
}

{
  // 所问之事不同 → 不算重复
  const { PP } = boot(null);
  PP.casesAdd(entry({ question: '问事业' }));
  const r = PP.casesAdd(entry({ question: '问婚姻' }));
  ok('问题不同不判重复', !r.dup);
  eq('两条都在', r.list.length, 2);
}

// ── 6. 上限 480：只淘汰最旧的 ────────────────────────────────────
{
  const seed = [];
  for (let i = 0; i < 480; i += 1) {
    seed.push({ id: `s${i}`, at: T0 + i * 1000, entry: entry({ date: `1990-01-${String((i % 28) + 1).padStart(2, '0')}`, time: `${String(i % 24).padStart(2, '0')}:00` }) });
  }
  const { PP } = boot(seed);
  eq('预置满 480', PP.casesLoad().length, 480);
  const r = PP.casesAdd(entry({ date: '2001-01-01', at: T0 + 900000 }));
  ok('满库仍能新增', r.ok === true);
  eq('上限仍是 480', r.list.length, 480);
  ok('最旧那条被淘汰', !r.list.some((x) => x.id === 's0'));
  ok('最新那条在首位', r.list[0].at === T0 + 900000);
}

// ── 7. 改状态 ───────────────────────────────────────────────────
{
  const { PP } = boot([{ id: 'a', at: T0, entry: entry() }]);
  const l1 = PP.casesSetStatus('a', 'hit');
  eq('改成应验', l1[0].status, 'hit');
  eq('已落盘', PP.casesLoad()[0].status, 'hit');
  const l2 = PP.casesSetStatus('a', '乱写');
  eq('非法状态不改', l2[0].status, 'hit');
  const l3 = PP.casesSetStatus('没有这个 id', 'miss');
  eq('不存在的 id 不动别人', l3.length, 1);
}

// ── 8. 删除 ─────────────────────────────────────────────────────
{
  const { PP } = boot([
    { id: 'a', at: T0, entry: entry() },
    { id: 'b', at: T0 + 1000, entry: entry({ question: '问财' }) },
  ]);
  const l = PP.casesRemove('a');
  eq('删掉一条', l.length, 1);
  eq('剩下的是 b', l[0].id, 'b');
  eq('落盘同步', PP.casesLoad().length, 1);
  eq('删不存在的 id 不报错', PP.casesRemove('zzz').length, 1);
}

// ── 9. 导出 JSONL ───────────────────────────────────────────────
{
  const { PP } = boot([
    { id: 'a', at: T0, status: 'hit', note: '三天后应验', entry: entry({ question: '问事业' }) },
    { id: 'b', at: T0 + 1000, entry: entry({ question: '问婚姻' }) },
  ]);
  const txt = PP.casesExport();
  const lines = txt.split('\n');
  eq('两条各一行', lines.length, 2);
  let parsed = [];
  try { parsed = lines.map((s) => JSON.parse(s)); } catch (e) { parsed = null; }
  ok('每行都是合法 JSON', Array.isArray(parsed) && parsed.length === 2);
  if (parsed && parsed.length === 2) {
    const byId = {};
    parsed.forEach((x) => { byId[x.id] = x; });
    ok('导出按新在前排序', parsed[0].id === 'b');
    eq('导出带状态', byId.a.status, 'hit');
    eq('导出带备注', byId.a.note, '三天后应验');
    eq('导出带体系', byId.a.kind, 'bazi');
    ok('导出带 ISO 时间', typeof byId.a.atISO === 'string' && byId.a.atISO.length >= 20);
    ok('导出带原始参数', byId.a.params && byId.a.params.date === '1990-05-12');
    eq('导出问题摘要', byId.a.question, '问事业');
  }
  eq('空列表导出空串', PP.casesExport([]), '');
}

// ── 9b. 脱敏导出：拼不回一个人 ─────────────────────────────────────
{
  const { PP } = boot([
    { id: 'a', at: T0, status: 'hit', note: '备注里有隐私', entry: entry({ question: '问事业', address: '北京市海淀区' }) },
    { id: 'b', at: T0 + 1000, entry: entry({ question: '问婚姻' }) },
  ]);
  const txt = PP.casesExportMasked();
  const lines = txt.split('\n');
  eq('脱敏两条各一行', lines.length, 2);
  let parsed = [];
  try { parsed = lines.map((s) => JSON.parse(s)); } catch (e) { parsed = null; }
  ok('脱敏每行都是合法 JSON', Array.isArray(parsed) && parsed.length === 2);
  if (parsed && parsed.length === 2) {
    const a = parsed[0].id === 'a' ? parsed[0] : parsed[1];
    ok('脱敏不带走出生年份（只留月日）', a.params.date === '05-12');
    ok('脱敏时刻整点化', a.params.time === '14:00');
    ok('脱敏不带走出生地', a.params.address === undefined);
    ok('脱敏不带走备注', a.note === '');
    ok('脱敏保留应验状态', a.status === 'hit');
    ok('脱敏保留体系', a.kind === 'bazi');
    ok('脱敏不带走所问之事', a.params.question === undefined);
  }
  eq('脱敏空列表导出空串', PP.casesExportMasked([]), '');
}

// ── 10. 迁移旧「最近排过」：幂等 ─────────────────────────────────
{
  const { PP } = boot(null);
  const hist = [
    { kind: 'liuyao', question: '问事', at: T0, lines: '777877' },
    { kind: 'bazi', date: '1990-05-12', at: T0 + 500 },
  ];
  const r1 = PP.casesMigrate(hist);
  eq('首次迁移收 2 条', r1.added, 2);
  eq('库里有 2 条', r1.list.length, 2);
  const r2 = PP.casesMigrate(hist);
  eq('再跑一次不再新增', r2.added, 0);
  eq('总数仍是 2', r2.list.length, 2);
  eq('迁移 id 带 h- 前缀', r1.list[0].id.slice(0, 2), 'h-');
  eq('空历史不报错', PP.casesMigrate([]).added, 0);
  eq('非数组不报错', PP.casesMigrate('x').added, 0);
}

// ── 11. 存储不可用 / 配额满 ─────────────────────────────────────
{
  const { PP } = boot(null, { noStorage: true });
  eq('无 localStorage 读出空', PP.casesLoad(), []);
  const r = PP.casesAdd(entry());
  ok('无 localStorage 时不崩（返回失败）', r.ok === false);
  eq('无 localStorage 导出不崩', PP.casesExport([]), '');
  ok('状态操作不崩', Array.isArray(PP.casesSetStatus('a', 'hit')));
  ok('删除不崩', Array.isArray(PP.casesRemove('a')));
}

{
  const { PP } = boot(null, { throwOnSet: true });
  const r = PP.casesAdd(entry());
  ok('配额满如实返回失败', r.ok === false);
  eq('配额满时库仍为空', PP.casesLoad().length, 0);
}

{
  const { PP } = boot('这不是 JSON');
  eq('坏 JSON 读出空', PP.casesLoad(), []);
}
