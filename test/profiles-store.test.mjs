// 「我的命盘」本机档案：存储层与渲染层的闸门。
//
// 为什么单独测这一层：档案是从 localStorage 读回来的外部输入——用户手改、别的版本写坏、
// 清站点数据留下半条，都会把畸形对象直接送进卡片渲染和 run()。上一版的教训是
// 「渲染层只兜自己拼出来的数据」，一遇到外部存储就排出张不存在的日期的盘。
// 所以这里逐条钉：坏输入整条丢 / 排序稳定 / 上限淘汰不淘汰刚存的 / 写不进要说失败 /
// 卡片转义 / 面板可存的 tab 必须在白名单内。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ok, eq } from './_harness.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const kitSrc = fs.readFileSync(path.join(root, 'src', 'panel-kit.js'), 'utf8');

/** 每个用例一套隔离的假 window + 假 localStorage；writes 记录 setItem 次数 */
function boot(init, opt) {
  const o = opt || {};
  const map = new Map();
  if (init != null) map.set('dsh-metaphysics/profiles-v1', typeof init === 'string' ? init : JSON.stringify(init));
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
      const s = map.get('dsh-metaphysics/profiles-v1');
      try { return s ? JSON.parse(s) : []; } catch (e) { return null; }
    },
    writes: () => writes,
  };
}

const GOOD = { id: 'a1', kind: 'bazi', label: '我', date: '1988-03-05', time: '08:30', gender: 'male', address: '河北石家庄' };

// ── 一、读回来先验一遍：坏条目整条丢，不把 undefined 渲染进卡片 ──
{
  const { PP } = boot([]);
  eq('空存储读出空列表', PP.profilesLoad().length, 0);
}
{
  const { PP } = boot('{"not":[],"an":"array"}');
  eq('存的是对象而不是数组时读出空列表', PP.profilesLoad().length, 0);
}
{
  const { PP } = boot('this is not json');
  eq('存储坏了不抛错', PP.profilesLoad().length, 0);
}
{
  const { PP } = boot([null, 3, 'x', [], { ...GOOD, id: 'b1' }]);
  const list = PP.profilesLoad();
  eq('畸形条目全部丢弃', list.length, 1);
  eq('合法条目留下', list[0].id, 'b1');
}
{
  const { PP } = boot([{ ...GOOD, id: 'k', kind: 'evil' }]);
  eq('体系不在白名单的条目丢掉', PP.profilesLoad().length, 0);
}
{
  const { PP } = boot([{ ...GOOD, id: 'd1', date: '1988-3-5' }, { ...GOOD, id: 'd2', date: '' }, { ...GOOD, id: 'd3', date: '1988/03/05' }, { ...GOOD, id: 'd4', date: 19880305 }]);
  eq('日期形状不对的条目整条丢', PP.profilesLoad().length, 0);
}
{
  const { PP } = boot([{ ...GOOD, id: 'x1', date: '2020-13-45' }, { ...GOOD, id: 'x2', date: '2020-02-30' }, { ...GOOD, id: 'x3', date: '2020-02-29' }]);
  const ids = PP.profilesLoad().map((x) => x.id);
  eq('不存在的月日（13 月 / 2 月 30 日）整条丢', ids.length, 1);
  ok('闰年 2 月 29 日是合法日期', ids[0] === 'x3', String(ids));
}
{
  const { PP } = boot([{ ...GOOD, id: 'i1' }, { ...GOOD, id: 'x'.repeat(41), id2: 1 }]);
  eq('id 过长的条目丢掉', PP.profilesLoad().length, 1);
}
{
  const { PP } = boot([{ ...GOOD, id: 't1', time: '25:00' }, { ...GOOD, id: 't2', time: 830 }, { ...GOOD, id: 't3', time: '08:30' }]);
  const l = PP.profilesLoad();
  eq('坏时刻不毁掉整条，只把时刻清空', l.find((x) => x.id === 't1').time, '');
  eq('非字符串时刻清空', l.find((x) => x.id === 't2').time, '');
  eq('合法时刻保留', l.find((x) => x.id === 't3').time, '08:30');
}
{
  const { PP } = boot([{ ...GOOD, id: 'h1', time: '08:30', hourUnknown: true }]);
  eq('勾了时辰未知就不留钟点（卡片不会出现 08:30 或 12:00）', PP.profilesLoad()[0].time, '');
}
{
  const { PP } = boot([{ ...GOOD, id: 'g1', gender: 'other' }, { ...GOOD, id: 'g2', gender: 'female' }]);
  const l = PP.profilesLoad();
  eq('性别只认 male/female，其它归空', l.find((x) => x.id === 'g1').gender, '');
  eq('合法性别保留', l.find((x) => x.id === 'g2').gender, 'female');
}
{
  const { PP } = boot([{ ...GOOD, id: 'c1', label: '长'.repeat(40), address: '市'.repeat(80), note: 'n'.repeat(200) }]);
  const p = PP.profilesLoad()[0];
  eq('称呼截到 16', p.label.length, 16);
  eq('出生地截到 40', p.address.length, 40);
  eq('备注截到 60', p.note.length, 60);
}
{
  const { PP } = boot([{ ...GOOD, id: 'n1', uses: 'many', createdAt: '昨天', lastUsedAt: null, pinned: 'yes' }]);
  const p = PP.profilesLoad()[0];
  eq('非数字次数归 0', p.uses, 0);
  eq('非数字时间戳归 0', p.createdAt, 0);
  eq('pinned 只认真值', p.pinned, false);
}
{
  const { PP } = boot([{ ...GOOD, id: 'dup', label: '第一条' }, { ...GOOD, id: 'dup', label: '第二条' }]);
  const l = PP.profilesLoad();
  eq('重复 id 只留第一条', l.length, 1);
  eq('留的是先出现的那条', l[0].label, '第一条');
}

// ── 二、排序：置顶在前，其余按最近排过 ─────────────────────────
{
  const { PP } = boot([
    { ...GOOD, id: 'old', lastUsedAt: 1000, createdAt: 1000 },
    { ...GOOD, id: 'pin', lastUsedAt: 500, createdAt: 500, pinned: true },
    { ...GOOD, id: 'new', lastUsedAt: 9000, createdAt: 9000 },
  ]);
  eq('置顶在最前', PP.profilesLoad().map((x) => x.id).join(','), 'pin,new,old');
}
{
  const { PP } = boot([
    { ...GOOD, id: 'a', lastUsedAt: 0, createdAt: 100 },
    { ...GOOD, id: 'b', lastUsedAt: 0, createdAt: 200 },
    { ...GOOD, id: 'c', lastUsedAt: 0, createdAt: 300 },
  ]);
  const first = PP.profilesLoad().map((x) => x.id).join(',');
  eq('从没排过的按创建时间倒序（顺序稳定不随刷新变）', first, 'c,b,a');
  eq('再读一次顺序一致', PP.profilesLoad().map((x) => x.id).join(','), first);
}
{
  const { PP } = boot([
    { ...GOOD, id: 'p1', pinned: true, lastUsedAt: 10 },
    { ...GOOD, id: 'p2', pinned: true, lastUsedAt: 90 },
    { ...GOOD, id: 'q', pinned: false, lastUsedAt: 999 },
  ]);
  eq('两张置顶之间仍按最近排', PP.profilesLoad().map((x) => x.id).join(','), 'p2,p1,q');
}

// ── 三、写入：上限、覆盖、失败回执 ─────────────────────────────
{
  const b = boot([]);
  const noId = { ...GOOD };
  delete noId.id;
  const res = b.PP.profilesPut(noId);
  ok('新增返回 ok', res.ok === true);
  ok('自动补了 id', !!res.item.id, res.item.id);
  ok('自动补了时间戳', res.item.createdAt > 0 && res.item.lastUsedAt > 0);
  eq('落盘一条', b.raw().length, 1);
  eq('从存储读回称呼一致', b.PP.profilesLoad()[0].label, '我');
}
{
  const b = boot([{ ...GOOD, id: 'keep', label: '旧名', createdAt: 123, lastUsedAt: 555, uses: 7, pinned: true }]);
  const res = b.PP.profilesPut({ ...GOOD, id: 'keep', label: '新名', date: '1970-06-01' });
  const p = b.PP.profilesLoad().find((x) => x.id === 'keep');
  ok('改名/改生日走同一条覆盖路径', res.ok === true);
  eq('更新换了称呼', p.label, '新名');
  eq('更新换了出生日期', p.date, '1970-06-01');
  eq('更新保留创建时间', p.createdAt, 123);
  eq('更新保留排过几次', p.uses, 7);
  eq('更新保留上次排盘时间', p.lastUsedAt, 555);
  eq('更新保留置顶（改个名字不该把卡沉到底部）', p.pinned, true);
}
{
  const b = boot([{ ...GOOD, id: 'z', label: '旧名', createdAt: 123 }]);
  const first = b.writes();
  const res = b.PP.profilesPut({ id: 'z', kind: 'bazi', label: '新名', date: '1990-01-01', time: '', createdAt: 999999 });
  ok('覆盖返回 ok', res.ok === true);
  eq('同 id 是覆盖不是新增', b.raw().length, 1);
  eq('称呼更新了', b.raw()[0].label, '新名');
  eq('创建时间保留原值（新条目里的 createdAt 不能顶掉档案生日）', b.raw()[0].createdAt, 123);
  ok('覆盖写了盘', b.writes() > first);
}
{
  const b = boot([]);
  const res = b.PP.profilesPut({ id: 'q', kind: 'bazi', label: '缺日期', time: '08:00' });
  ok('缺出生日期存不进去', res.ok === false);
  eq('失败时不落盘', b.raw().length, 0);
  eq('失败时返回的列表也没多', res.list.length, 0);
}
{
  const b = boot([], { throwOnSet: true });
  const res = b.PP.profilesPut({ ...GOOD });
  ok('localStorage 写不进时 profilesPut 报失败（回执不能说「已存入」）', res.ok === false);
  const b2 = boot([{ ...GOOD, id: 'k1' }], { throwOnSet: true });
  ok('写不进时 profilesSave 返回 false', b2.PP.profilesSave(b2.PP.profilesLoad()) === false);
  // 删除 / 置顶 / 记一次同样得看回执：写不进去就当没发生，别让卡片从界面消失、下次进来又复活
  const rm = boot([{ ...GOOD, id: 'k2' }], { throwOnSet: true }).PP.profilesRemove('k2');
  ok('写不进时删除不生效（列表仍含该卡）', rm.some((x) => x.id === 'k2'), rm.map((x) => x.id).join(','));
  const pin = boot([{ ...GOOD, id: 'k3' }], { throwOnSet: true }).PP.profilesPin('k3');
  ok('写不进时置顶不生效（卡片状态没翻）', pin.find((x) => x.id === 'k3').pinned === false);
  const touch = boot([{ ...GOOD, id: 'k4' }], { throwOnSet: true }).PP.profilesTouch('k4');
  ok('写不进时不虚记次数', touch.find((x) => x.id === 'k4').uses === 0);
  const none = boot([], { noStorage: true });
  ok('没有 localStorage 也算没存进去', none.PP.profilesSave([{ ...GOOD, id: 'n1' }]) === false);
}
{
  const b = boot([]);
  for (let i = 0; i < 26; i++) {
    const r = b.PP.profilesPut({ id: `u${i}`, kind: 'bazi', label: `第${i}人`, date: '1990-01-01', time: '', lastUsedAt: 1000 + i, createdAt: 1000 + i });
    ok(`连存第 ${i + 1} 张还成功`, r.ok === true);
  }
  const list = b.PP.profilesLoad();
  ok(`超出上限自动淘汰，落盘不超过 ${b.PP.PROF_MAX} 条`, list.length <= b.PP.PROF_MAX, `${list.length} 条`);
  ok('刚存的那张不会被淘汰', list.some((x) => x.id === 'u25'), list.map((x) => x.id).join(','));
  ok('淘汰的是最久没排的那张', !list.some((x) => x.id === 'u0'), list.map((x) => x.id).join(','));
}
{
  // 手改存储塞进 40 条：下一次写入必须收敛回上限内，不能越用越大
  const fat = [];
  for (let i = 0; i < 40; i++) fat.push({ ...GOOD, id: `f${i}`, lastUsedAt: i, createdAt: i });
  const b = boot(fat);
  eq('读的时候不裁（40 条都在列表里）', b.PP.profilesLoad().length, 40);
  b.PP.profilesPut({ ...GOOD, id: 'fresh', lastUsedAt: 99, createdAt: 99 });
  ok('一次写入后落盘收敛到上限内', b.raw().length <= b.PP.PROF_MAX, `${b.raw().length} 条`);
}

// ── 四、id：同毫秒也不撞，且不用 Math.random ───────────────────
{
  const b = boot([]);
  const seen = new Set();
  for (let i = 0; i < 300; i++) seen.add(b.PP.profilesNewId());
  eq('连开 300 个 id 互不相同', seen.size, 300);
  const region = kitSrc.slice(kitSrc.indexOf('pp.profilesNewId'), kitSrc.indexOf('pp.profilesPut'));
  ok('档案 id 不用 Math.random（同毫秒会撞，也不利于两处渲染一致）', !/Math\.random/.test(region));
}
{
  const b = boot([{ ...GOOD, id: 'taken' }]);
  ok('新 id 避开已存在的', b.PP.profilesNewId() !== 'taken');
}

// ── 五、用一次记一笔 / 置顶 / 删除 ─────────────────────────────
{
  const b = boot([{ ...GOOD, id: 'm', lastUsedAt: 10, uses: 2 }, { ...GOOD, id: 'n', lastUsedAt: 1e12, uses: 1 }]);
  const before = b.writes();
  const after = b.PP.profilesTouch('m');
  const m = after.find((x) => x.id === 'm');
  eq('排一次 adds 一次', m.uses, 3);
  ok('记下这次排盘时间', m.lastUsedAt > 10, String(m.lastUsedAt));
  eq('touch 后该卡排到最前', after[0].id, 'm');
  ok('touch 写了盘', b.writes() > before);
  const w2 = b.writes();
  const miss = b.PP.profilesTouch('没有这张');
  eq('未知 id 不改列表', miss.length, 2);
  eq('未知 id 不写盘', b.writes(), w2);
}
{
  const b = boot([{ ...GOOD, id: 'p' }]);
  const on = b.PP.profilesPin('p');
  eq('置顶打开', on.find((x) => x.id === 'p').pinned, true);
  const off = b.PP.profilesPin('p');
  eq('再点取消置顶', off.find((x) => x.id === 'p').pinned, false);
  ok('未知 id 的置顶不炸列表', b.PP.profilesPin('不存在').length === 1);
}
{
  const b = boot([{ ...GOOD, id: 'r1' }, { ...GOOD, id: 'r2' }]);
  const rest = b.PP.profilesRemove('r1');
  eq('删除后剩一条', rest.length, 1);
  eq('存储里也删掉了', b.raw().map((x) => x.id).join(','), 'r2');
  eq('删不存在的 id 不报错', b.PP.profilesRemove('nope').length, 1);
}

// ── 六、卡片渲染：转义、空态、时辰未知 ─────────────────────────
{
  const { PP } = boot([]);
  const html = PP.profilesHTML(PP.profilesLoad(), {});
  ok('没有档案时给引导文案', html.includes('mp-prof-empty') && html.includes('还没有存过命盘'));
  ok('档案区有可读的地名（无障碍）', html.includes('aria-label="我的命盘"'));
  ok('空列表不显示计数', !html.includes('/24'));
}
{
  const { PP } = boot([
    { ...GOOD, id: 'c1', label: '<img src=x onerror=alert(1)>', address: '"><b>注入' },
    { ...GOOD, id: 'c2', kind: 'ziwei', gender: 'female', hourUnknown: true, time: '08:30', pinned: true, uses: 3 },
  ]);
  const list = PP.profilesLoad();
  const html = PP.profilesHTML(list, {});
  ok('称呼里的标签被转义（不能把存储内容当 HTML 注进去）', !html.includes('<img'));
  ok('转义后原样可见', html.includes('&lt;img'), html.slice(html.indexOf('&lt;img'), html.indexOf('&lt;img') + 20));
  ok('出生地里的引号转义成实体（属性不破）', html.includes('&quot;'));
  ok('卡片带 use 委托点', html.includes('data-mp-prof="use"'));
  ok('卡面显示体系短名', html.includes('八字') && html.includes('紫微'));
  ok('卡面显示性别符号', html.includes('♀') && html.includes('♂'));
  ok('时辰未知的卡写明「时辰未知」', html.includes('时辰未知'));
  ok('时辰未知的卡不出现占位钟点', !/12:00/.test(html));
  ok('有档案时显示条数/上限', html.includes('2/24'));
  ok('置顶卡片带类名', html.includes('mp-prof-card pinned'));
  ok('置顶在卡面上看得出来（不用悬停）', /mp-prof-at">[^<]*置顶/.test(html));
  ok('卡面显示排过几次', html.includes('3 次'));
  const oneBad = PP.profilesHTML([{ ...GOOD, id: 'ok1' }, { id: 'bad', kind: 'nope', date: 'nope' }], {});
  ok('坏条目不渲染半个卡片', oneBad.includes('ok1') && !oneBad.includes('bad'));
}
{
  const { PP } = boot([{ ...GOOD, id: 'arm' }]);
  const list = PP.profilesLoad();
  const armed = PP.profilesHTML(list, { armedDel: 'arm' });
  ok('第一次点删除只把按钮变成「确认删除」', armed.includes('确认删除') && armed.includes('class="on"'));
  ok('未确认时按钮写「删除」', PP.profilesHTML(list, {}).includes('>删除<'));
  const editing = PP.profilesHTML(list, { editingId: 'arm' });
  ok('正在改名的卡片带 editing 标记', editing.includes('mp-prof-card') && editing.includes('editing'));
}

// ── 七、档案条（称呼输入 + 存 / 取消）──────────────────────────
{
  const { PP } = boot([]);
  const bar = PP.profilesBarHTML({});
  ok('默认按钮写「存为我的命盘」', bar.includes('存为我的命盘'));
  ok('有称呼输入框', bar.includes('mp-prof-name'));
  ok('输入框有长度上限', /maxlength="\d+"/.test(bar));
  ok('提示说明存的是输入不是结果', bar.includes('存的是出生时间'));
  const edit = PP.profilesBarHTML({ editingId: 'x' });
  ok('改名态给「更新」和退路', edit.includes('更新这张档案') && edit.includes('取消改名'));
  const full = PP.profilesBarHTML({ canAdd: false });
  ok('到上限时存入按钮禁用', full.includes('disabled'));
  ok('回填的称呼做属性转义', PP.profilesBarHTML({ name: '"><script>' }).includes('&quot;'));
  const nested = PP.profilesHTML([], { bar: PP.profilesBarHTML({}) });
  ok('档案条渲染在 .mp-prof 内部（配色变量挂在这个选择器上，拼在外面深色下按钮糊成一片）',
    nested.indexOf('mp-prof-bar') >= 0 && nested.indexOf('mp-prof-bar') < nested.indexOf('</section>'));
  ok('不给 bar 就不渲染档案条', PP.profilesHTML([], {}).indexOf('mp-prof-bar') < 0);
}

// ── 八、事件委托：一层 closest 判定，两边共用 ──────────────────
{
  const { PP } = boot([]);
  const node = (attrs, opt) => {
    const o = opt || {};
    return {
      tagName: o.tagName || 'BUTTON',
      disabled: !!o.disabled,
      getAttribute: (k) => (k in attrs ? attrs[k] : null),
      closest: (sel) => (sel === '[data-mp-prof]' ? (attrs['data-mp-prof'] ? { tagName: o.tagName || 'BUTTON', disabled: !!o.disabled, getAttribute: (k) => (k in attrs ? attrs[k] : null) } : null) : null),
    };
  };
  const hit = PP.profEvent(node({ 'data-mp-prof': 'use', 'data-id': 'q1' }));
  eq('命中 use', hit && hit.action, 'use');
  eq('命中带上 id', hit && hit.id, 'q1');
  ok('点空白处不响应', PP.profEvent(node({})) === null);
  ok('目标没有 closest（文本节点）不报错', PP.profEvent({ closest: null }) === null);
  ok('空目标不报错', PP.profEvent(null) === null);
  ok('禁用的按钮不响应', PP.profEvent(node({ 'data-mp-prof': 'put' }, { disabled: true })) === null);
}

// ── 九、从表单拼一条档案 ───────────────────────────────────────
{
  const { PP } = boot([]);
  const e1 = PP.profFromForm({ kind: 'bazi', date: '1996-01-19', time: '07:31', gender: 'female', address: '安徽池州' }, '');
  ok('正常表单能拼出档案', !!e1);
  eq('没写称呼就用体系短名兜底', e1.label, '八字');
  eq('带的 id 是新开的', typeof e1.id, 'string');
  const e2 = PP.profFromForm({ kind: 'bazi', date: '1996-01-19', time: '07:31', hourUnknown: true }, '妈妈');
  eq('勾了时辰未知就不存钟点', e2.time, '');
  ok('时辰未知的标记留住了', e2.hourUnknown === true);
  ok('没有日期拼不出档案', PP.profFromForm({ kind: 'bazi', date: '' }, 'x') === null);
  const huZi = PP.profFromForm({ kind: 'ziwei', date: '1996-01-19', time: '07:31', hourUnknown: true }, 'x');
  ok('紫微不认「时辰未知」：切体系残留的勾选不会存出矛盾档案', huZi && huZi.hourUnknown === false && huZi.time === '07:31');
  const huBz = PP.profFromForm({ kind: 'bazi', date: '1996-01-19', time: '07:31', hourUnknown: true }, 'x');
  ok('八字与人生K线才留这个标记', huBz && huBz.hourUnknown === true && huBz.time === '');
  ok('未知体系拼不出档案', PP.profFromForm({ kind: 'shengchen', date: '1996-01-19' }, 'x') === null);
  // 没有时刻就排不出这张盘：不能存成一张点开时静默沿用「上一次时刻」的卡
  ok('没填时刻拼不出档案', PP.profFromForm({ kind: 'bazi', date: '1996-01-19', time: '' }, 'x') === null);
  ok('时刻格式坏了也拼不出档案', PP.profFromForm({ kind: 'bazi', date: '1996-01-19', time: '25:00' }, 'x') === null);
  ok('勾了「时辰未知」不必填时刻', PP.profFromForm({ kind: 'bazi', date: '1996-01-19', time: '', hourUnknown: true }, 'x') !== null);
  const blank = PP.profFromForm({ kind: 'bazi', date: '1996-01-19', time: '07:31' }, '   ');
  eq('称呼只有空格时退回体系短名', blank.label, '八字');

  // 外部存储里已经存在的坏卡：可以读出来，但不能直接拿去排
  ok('没时刻的八字卡不能直接排', PP.profUsable({ kind: 'bazi', time: '' }) === false);
  ok('时辰未知的卡可以直接排', PP.profUsable({ kind: 'bazi', time: '', hourUnknown: true }) === true);
  ok('只需日期的体系可以直接排', PP.profUsable({ kind: 'almanac', time: '' }) === true);
  ok('空对象不能直接排', PP.profUsable(null) === false);
}

// ── 十、面板能存的 tab 必须在白名单里 ──────────────────────────
// 这条最容易漂：给面板加一个新体系、PROF_TABS 里写了它，但 PROF_KINDS 没加——
// 用户点「存为我的命盘」当场看起来成功了，下次打开那张卡直接被 profClean 丢掉。
{
  const appSrc = fs.readFileSync(path.join(root, 'src', 'app.js'), 'utf8').replace(/\r\n/g, '\n');
  const m = /const PROF_TABS = \[([^\]]*)\]/.exec(appSrc);
  ok('面板里有 PROF_TABS（可存档的体系清单）', !!m);
  const tabs = (m ? m[1] : '').split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
  const { PP } = boot([]);
  for (const t of tabs) ok(`面板可存的「${t}」在档案白名单里`, PP.PROF_KINDS.indexOf(t) >= 0, PP.PROF_KINDS.join(','));
  ok('至少留了一个可存体系', tabs.length >= 1, tabs.join(','));
  // 档案描述的是「一个人」，占事/合盘类不该进这个清单
  for (const k of ['hepan', 'liuyao', 'meihua', 'tarot', 'qimen', 'daliuren', 'zeri', 'fengshui'])
    ok(`占事与合盘类「${k}」不进档案清单`, tabs.indexOf(k) < 0);
}
