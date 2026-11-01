// C1 排盘句柄：句柄自包含、校验位挡手误、增量只覆盖指定的参数、输出开关不进句柄。
// 约束：句柄是编码不是加密；同一组参数任何进程都能还原，不依赖内存缓存。
import fs from 'node:fs';
import vm from 'node:vm';
import { compute, renderText, decodeHandle, encodeHandle, resolveHandle, chartFingerprint } from '../engine/index.js';
import { HANDLE_PREFIX, handlePayload, handleChecksum } from '../engine/handle.js';
import { apply as hostApply } from '../index.js';
import { ok } from './_harness.mjs';

const BASE = { system: 'bazi', datetime: '1990-05-06T08:30', gender: 'male', address: '安徽池州' };

// ── ① 生成与形态 ────────────────────────────────────────────────
const a = compute(BASE);
ok('结果带 handle', typeof a.handle === 'string' && a.handle.length > 0, a.handle);
ok('handle 以 mc1. 开头', a.handle.startsWith(HANDLE_PREFIX), a.handle);
ok('handle 形如 mc1.<body>.<8位校验>', /^mc1\.[A-Za-z0-9_-]+\.[0-9a-f]{8}$/.test(a.handle), a.handle);
ok('句柄里只有 base64url 字符（可直接进 URL）', /^[A-Za-z0-9_.-]+$/.test(a.handle));
ok('空参数不产出 handle', encodeHandle({ trace: true, withInterpret: true }) === '');
ok('纯输出开关不产出 handle', compute({ system: 'bazi', datetime: '1990-05-06T08:30', gender: 'male' }).handle.length > 0);

// ── ② 往返：只带 handle 能排出同一张盘 ──────────────────────────
const back = compute({ handle: a.handle });
ok('只带 handle 可排盘', back.system === 'bazi' && !!back.pillars, back.system);
ok('往返四柱一致', JSON.stringify(back.pillars) === JSON.stringify(a.pillars));
ok('往返经度一致', back.input.longitude === a.input.longitude, String(back.input.longitude));
ok('往返仍记真太阳时口径', back.input.trueSolar === a.input.trueSolar);
ok('往返 handle 不变', back.handle === a.handle);
ok('句柄里带着体系，调用方不必再传', decodeHandle(a.handle).system === 'bazi', JSON.stringify(Object.keys(decodeHandle(a.handle))));

// ── ③ 增量：只覆盖传进来的参数 ──────────────────────────────────
const later = compute({ handle: a.handle, asOf: '2030-01-01T00:00' });
ok('增量 asOf 生效', later.asOf && later.asOf.year === 2030, JSON.stringify(later.asOf));
ok('增量不改出生时间', JSON.stringify(later.pillars) === JSON.stringify(a.pillars));
const deltaHandle = decodeHandle(later.handle);
ok('增量后的句柄含 asOf', deltaHandle.asOf === '2030-01-01T00:00', JSON.stringify(deltaHandle.asOf));
ok('增量后的句柄仍含出生时间', deltaHandle.datetime === BASE.datetime, JSON.stringify(deltaHandle.datetime));
const undefinedDelta = compute({ handle: a.handle, asOf: undefined });
ok('显式 undefined 不覆盖句柄字段', JSON.stringify(undefinedDelta.pillars) === JSON.stringify(a.pillars) && JSON.stringify(undefinedDelta.liunian) === JSON.stringify(a.liunian));

// 换体系：同一时刻换一套盘，不必重报出生信息
const zw = compute({ handle: a.handle, system: 'ziwei' });
ok('带上 handle 换体系可排紫微', zw.system === 'ziwei' && !!zw.palaces);
ok('换体系沿用出生时刻', zw.input.year === 1990 && zw.input.month === 5 && zw.input.day === 6 && zw.input.hour === 8, JSON.stringify([zw.input.year, zw.input.month, zw.input.day, zw.input.hour]));
ok('换体系沿用经度', zw.input.longitude === a.input.longitude);

// ── ④ 确定性：键序、输出开关都不影响句柄 ────────────────────────
const reordered = compute({ address: BASE.address, gender: 'male', datetime: BASE.datetime, system: 'bazi' });
ok('键序不影响句柄', reordered.handle === a.handle);
const traced = compute({ ...BASE, trace: true, shadow: true, withInterpret: true });
ok('trace/shadow/withInterpret 不进句柄', traced.handle === a.handle);
ok('输出开关仍各自生效', Array.isArray(traced.trace) && !!traced.shadow && !!traced.interpret);
ok('question 不进句柄（只影响解读）', compute({ ...BASE, question: '何时换工作' }).handle === a.handle);
ok('seed 进句柄（影响抽牌结果）', decodeHandle(compute({ system: 'tarot', seed: 7 }).handle).seed === 7);

// ── ⑤ 校验位：截断、改字、错前缀都报 E_HANDLE ────────────────────
const codeOf = (fn) => {
  try { fn(); return ''; } catch (e) { return String((e && e.code) || ''); }
};
const tampered = a.handle.slice(0, -1) + (a.handle.endsWith('0') ? '1' : '0');
ok('改校验位报 E_HANDLE', codeOf(() => compute({ handle: tampered })) === 'E_HANDLE');
const mid = a.handle.slice(0, 12) + (a.handle[12] === 'A' ? 'B' : 'A') + a.handle.slice(13);
ok('改正文报 E_HANDLE', codeOf(() => compute({ handle: mid })) === 'E_HANDLE');
ok('截断报 E_HANDLE', codeOf(() => compute({ handle: a.handle.slice(0, 20) })) === 'E_HANDLE');
ok('缺校验位报 E_HANDLE', codeOf(() => compute({ handle: a.handle.replace(/\.[0-9a-f]{8}$/, '') })) === 'E_HANDLE');
ok('前缀不对报 E_HANDLE', codeOf(() => compute({ handle: a.handle.replace('mc1.', 'mc2.') })) === 'E_HANDLE');
ok('空句柄报 E_HANDLE', codeOf(() => compute({ handle: '   ' })) === 'E_HANDLE');
ok('非字符串报 E_HANDLE', codeOf(() => compute({ handle: 123 })) === 'E_HANDLE');
ok('非本插件句柄报 E_HANDLE', codeOf(() => compute({ handle: `${HANDLE_PREFIX}Zm9vYmFy.00000000` })) === 'E_HANDLE');
const arrayBody = Buffer.from('[1,2,3]', 'utf8').toString('base64url');
ok('正文合法但非对象报 E_HANDLE', codeOf(() => decodeHandle(`${HANDLE_PREFIX}${arrayBody}.${handleChecksum(arrayBody)}`)) === 'E_HANDLE');
ok('错误信息带修复指引', (() => { try { compute({ handle: 'x' }); } catch (e) { return /重新|句柄/.test(e.message); } return false; })());

// ── ⑥ 中文与特殊字符：地址原文能原样还原 ────────────────────────
const zh = compute({ system: 'bazi', datetime: '1996-01-19T07:31', gender: 'female', address: '新疆喀什地区' });
ok('中文地址往返一致', decodeHandle(zh.handle).address === '新疆喀什地区', decodeHandle(zh.handle).address);
ok('中文地址往返排盘一致', compute({ handle: zh.handle }).input.longitude === zh.input.longitude);
const emoji = encodeHandle({ system: 'bazi', address: '要不要换工作？🙂' });
ok('含表情与问号的参数可编解码', decodeHandle(emoji).address === '要不要换工作？🙂');
ok('encodeHandle 可直接解析回对象', typeof decodeHandle(emoji) === 'object');
ok('handlePayload 剔除输出开关', (() => {
  const p = handlePayload({ system: 'bazi', trace: true, shadow: true, ask: 'x', followup: 'y', caliber: true, system_: undefined, datetime: '1990-05-06T08:30' });
  return !('trace' in p) && !('shadow' in p) && !('ask' in p) && !('followup' in p) && !('caliber' in p) && p.datetime === '1990-05-06T08:30';
})());

// ── ⑦ 与影子盘互不干扰 ──────────────────────────────────────────
const V = '0.56.0';
const fpA = chartFingerprint(BASE, { version: V });
const fpB = chartFingerprint({ ...BASE, handle: a.handle }, { version: V });
ok('handle 不进影子盘指纹', fpA.baseId === fpB.baseId, `${fpA.baseId} / ${fpB.baseId}`);
const shadowed = compute({ ...BASE, shadow: true, shadowVersion: V });
const shadowedWithHandle = compute({ ...BASE, handle: a.handle, shadow: true, shadowVersion: V });
ok('结果里的 handle 不影响影子盘', shadowed.shadow.baseId === shadowedWithHandle.shadow.baseId && shadowed.shadow.id === shadowedWithHandle.shadow.id);
ok('handle 不写进影子盘对象', !('handle' in (shadowed.shadow || {})));
ok('handle 不进盘面字段（顶层是单独键）', typeof a.handle === 'string' && !JSON.stringify(a.pillars).includes('mc1.'));
const followup = compute({ handle: a.handle, question: '今年事业如何' });
ok('带 handle 追问保留盘面', JSON.stringify(followup.pillars) === JSON.stringify(a.pillars));
const text = renderText(a);
ok('文本摘要带句柄', text.includes(`【排盘句柄】${a.handle}`), a.handle);
ok('文本说明怎么用句柄', text.includes('传 handle + 增量参数'));

// ── ⑧ 宿主工具：schema 暴露 handle，执行链接受 handle ────────────
let def = null;
hostApply({ tools: { register: (d) => { def = d; } }, effect: (fn) => fn() });
ok('工具 schema 暴露 handle', !!(def && def.parameters.properties.handle && def.parameters.properties.handle.type === 'string'));
ok('工具说明提到 handle', /handle/.test(def.description));
const hostFirst = await def.execute({ system: 'bazi', datetime: '1990-05-06T08:30', gender: 'male', address: '安徽池州' });
ok('宿主返回 handle', typeof hostFirst.handle === 'string' && hostFirst.handle.startsWith(HANDLE_PREFIX));
const hostAgain = await def.execute({ handle: hostFirst.handle, asOf: '2030-01-01T00:00' });
ok('宿主只带 handle 可复排', JSON.stringify(hostAgain.pillars) === JSON.stringify(hostFirst.pillars));
ok('宿主增量生效', hostAgain.asOf && hostAgain.asOf.year === 2030, JSON.stringify(hostAgain.asOf));
ok('宿主保留地址带来的经度', hostAgain.input.longitude === hostFirst.input.longitude);
const hostBad = await def.execute({ handle: 'mc1.broken.00000000' }).then(() => '', (e) => String((e && e.message) || e));
ok('宿主把坏句柄带上 E_HANDLE 码', hostBad.includes('[E_HANDLE]'), hostBad);

// ── ⑨ 随机抽牌：句柄复现参数，不复现牌面（有 seed 才行）──────────
const t1 = compute({ system: 'tarot', question: 'x' });
const t2 = compute({ handle: t1.handle });
ok('无 seed 时同一句柄两次抽牌不同', JSON.stringify(t1.cards) !== JSON.stringify(t2.cards));
const s1 = compute({ system: 'tarot', question: 'x', seed: 7 });
const s2 = compute({ handle: s1.handle });
ok('有 seed 时同一句柄抽牌相同', JSON.stringify(s1.cards) === JSON.stringify(s2.cards));

// ── ⑩ 面板与独立页：句柄卡 + 复制按钮 + 接线 ─────────────────────
const sandbox = { window: {}, console };
sandbox.window.window = sandbox.window;
vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
const PP = sandbox.window.__PP;
ok('面板导出 handleHTML', typeof PP.handleHTML === 'function');
const handleCard = PP.handleHTML(a.handle);
ok('面板渲染句柄', handleCard.includes(a.handle));
ok('面板带复制按钮', handleCard.includes(`data-handle-copy="${a.handle}"`));
ok('面板提示不要公开贴出', handleCard.includes('编码不是加密') && handleCard.includes('别公开贴出'));
ok('面板提示只传增量', handleCard.includes('增量参数') && handleCard.includes('不必重报出生信息'));
ok('没有句柄时渲染空串', PP.handleHTML('') === '' && PP.handleHTML(undefined) === '');
const evilHandle = PP.handleHTML('"><img src=x onerror=alert(1)>');
ok('句柄转义', !evilHandle.includes('<img src=x') && evilHandle.includes('&quot;&gt;&lt;img'));

const appSrc = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
const webSrc = fs.readFileSync(new URL('../src/web-ui.js', import.meta.url), 'utf8');
ok('面板渲染句柄卡', /PP\.handleHTML\(result\.r\.handle\)/.test(appSrc));
ok('独立页渲染句柄卡', /__PP\.handleHTML\(last\.r\.handle\)/.test(webSrc));
ok('面板接上句柄复制', /\[data-handle-copy\]/.test(appSrc) && /copyHandle/.test(appSrc));
ok('独立页接上句柄复制', /\[data-handle-copy\]/.test(webSrc) && /copyHandle/.test(webSrc));

// ── ⑪ resolveHandle 直连 ───────────────────────────────────────
const merged = resolveHandle({ handle: encodeHandle({ system: 'bazi', datetime: '1990-05-06T08:30', gender: 'female' }), gender: 'male' });
ok('resolveHandle 增量覆盖', merged.gender === 'male' && merged.system === 'bazi');
ok('resolveHandle 去掉 handle 键', !('handle' in merged));
ok('resolveHandle 无 handle 时浅拷贝', (() => {
  const src = { system: 'bazi' };
  const out = resolveHandle(src);
  return out !== src && out.system === 'bazi';
})());
