// A1 推导链：每层 { field, rule, inputs, result, source }，只读结果、不改盘。
import fs from 'node:fs';
import vm from 'node:vm';
import { compute, renderText, buildTrace } from '../engine/index.js';
import { apply as hostApply } from '../index.js';
import { ok } from './_harness.mjs';

const LINES = [9, 7, 8, 8, 7, 6];
const l = compute({
  system: 'liuyao', lines: LINES, question: '今年能否换工作', direction: 'career',
  datetime: '2026-10-31T10:00', trace: true,
});

// ── ① 六爻：五层、字段齐全、顺序固定 ────────────────────────────
ok('六爻返回五层', Array.isArray(l.trace) && l.trace.length === 5, l.trace && l.trace.length);
ok('六爻层序固定', l.trace.map((t) => t.key).join(',') === 'najia,liuqin,shiying,fushen,wangsheng', l.trace.map((t) => t.key).join(','));
ok('六爻层名', l.trace.map((t) => t.field).join('→') === '纳甲→六亲→世应→伏神→旺衰', l.trace.map((t) => t.field).join('→'));
ok('每层都有 field/rule/inputs/result/source', l.trace.every((t) => ['field', 'rule', 'inputs', 'result', 'source'].every((k) => k in t)));
ok('每层 rule 非空', l.trace.every((t) => typeof t.rule === 'string' && t.rule.length >= 8));
ok('每层 result 非空', l.trace.every((t) => typeof t.result === 'string' && t.result.length > 0));
ok('每层 source 指向引擎', l.trace.every((t) => typeof t.source === 'string' && /engine\//.test(t.source)), l.trace.map((t) => t.source).join(' | '));
ok('inputs 是 label/value 数组', l.trace.every((t) => Array.isArray(t.inputs) && t.inputs.every((x) => x.label && x.value)));
ok('纳甲层结果含六爻干支', l.trace[0].result.includes(l.ben.lines[0].ganzhi) && l.trace[0].result.includes(l.ben.lines[5].ganzhi), l.trace[0].result);
ok('纳甲层给出本卦上下卦', l.trace[0].inputs.some((x) => x.value.includes(l.ben.upper)) && l.trace[0].inputs.some((x) => x.value.includes(l.ben.lower)));
ok('六亲层结果含六亲名', l.ben.lines.some((x) => l.trace[1].result.includes(x.liuqin)), l.trace[1].result);
ok('世应层与盘面一致', l.trace[2].result.includes(`${l.ben.shi}爻`) && l.trace[2].result.includes(`${l.ben.ying}爻`), l.trace[2].result);
ok('用神在爻上时伏神层写明无需伏神', l.trace[3].result.includes('无需伏神') || l.trace[3].result.includes('出伏'), l.trace[3].result);
ok('旺衰层带月建日辰', l.trace[4].inputs.some((x) => x.label === '月建') && l.trace[4].inputs.some((x) => x.label === '日辰'));
ok('旺衰层带用神与全卦', l.trace[4].result.includes('用神') && l.trace[4].result.includes('全卦'), l.trace[4].result);

// 用神不上卦：伏神层应能定位伏位与出伏条件
const hidden = compute({
  system: 'liuyao', lines: [8, 8, 7, 7, 8, 8], question: '感情', direction: 'love', gender: 'male',
  datetime: '2026-10-31T10:00', trace: true,
});
ok('用神不上卦记入伏神层', hidden.trace[3].result.includes('飞神') && hidden.trace[3].result.includes('出伏'), hidden.trace[3].result);
ok('伏神层输入含伏位', hidden.trace[3].inputs.some((x) => x.label === '伏位'), JSON.stringify(hidden.trace[3].inputs));

// 未指定所问之事：用神与伏神层明确说不适用
const noAsk = compute({ system: 'liuyao', lines: LINES, datetime: '2026-10-31T10:00', trace: true });
ok('未问事时伏神层说明未取用神', noAsk.trace[3].result.includes('未取用神'), noAsk.trace[3].result);
ok('未问事时旺衰层仍给全卦', noAsk.trace[4].result.includes('全卦'), noAsk.trace[4].result);

// 改方向不重摇：refresh 只重建用神相关三层，且不修改原结果
const beforeRefresh = JSON.stringify(noAsk);
const refreshed = buildTrace(noAsk, { direction: 'career', refresh: true });
ok('refresh 后伏神层取官鬼', refreshed[3].inputs.some((x) => x.value.includes('官鬼')) || refreshed[3].result.includes('官鬼'), refreshed[3].result);
ok('refresh 后旺衰层带用神', refreshed[4].result.includes('用神：') && !refreshed[4].result.includes('用神：未取'), refreshed[4].result);
ok('refresh 不修改原结果', JSON.stringify(noAsk) === beforeRefresh);
ok('refresh 回综合时重新标未取', buildTrace(noAsk, { direction: 'general', refresh: true })[4].result.includes('用神：未取'));

// ── ② 八字：旺衰分值与格局取用 ─────────────────────────────────
const b = compute({ system: 'bazi', datetime: '1990-05-06T08:30', gender: 'male', trace: true });
ok('八字返回两层', b.trace.length === 2 && b.trace.map((t) => t.key).join(',') === 'strength,geju', b.trace.map((t) => t.key).join(','));
ok('旺衰层结果与 strength 一致', b.trace[0].result.includes(b.strength.level) && b.trace[0].result.includes(String(b.strength.score)), b.trace[0].result);
ok('旺衰层输入含日主与月令', b.trace[0].inputs.some((x) => x.label === '日主') && b.trace[0].inputs.some((x) => x.label === '月令'));
ok('格局层结果含主格', b.trace[1].result.includes(b.frame.primaryName), b.trace[1].result);
ok('格局层结果含喜忌', b.frame.yongshen.favor.every((e) => b.trace[1].result.includes(e)) && b.frame.yongshen.avoid.every((e) => b.trace[1].result.includes(e)), b.trace[1].result);
ok('格局层输入含取格依据', b.trace[1].inputs.some((x) => x.label === '取格依据' && x.value.length > 6));
ok('有争议时格局层标出', b.trace[1].result.includes('有争议'), b.trace[1].result);

// ── ③ 紫微：格局命中条件 ──────────────────────────────────────
const z = compute({ system: 'ziwei', datetime: '1990-05-06T08:30', gender: 'male', trace: true });
ok('紫微返回一层', z.trace.length === 1 && z.trace[0].key === 'patterns');
ok('紫微命中数与 patterns 一致', z.trace[0].inputs.some((x) => x.label === '命中数' && x.value.startsWith(`${z.patterns.length} /`)), JSON.stringify(z.trace[0].inputs));
ok('紫微结果逐个列命中条件', z.patterns.every((p) => z.trace[0].result.includes(p.name)), z.trace[0].result.slice(0, 160));
ok('紫微层给出命宫与五行局', z.trace[0].inputs.some((x) => x.label === '命宫') && z.trace[0].inputs.some((x) => x.label === '五行局'));

// ── ③b 奇门：盘面事实 → 用神落宫 → 门/星/干旺衰 → 宫位生克 ─────
const q = compute({ system: 'qimen', datetime: '2026-10-31T10:00', direction: 'career', trace: true });
ok('奇门返回四层', Array.isArray(q.trace) && q.trace.length === 4, q.trace && q.trace.length);
ok('奇门层序固定', q.trace.map((t) => t.key).join(',') === 'facts,yongshen,states,relations', q.trace.map((t) => t.key).join(','));
ok('奇门层名', q.trace.map((t) => t.field).join('→') === '盘面事实→用神落宫→门/星/干旺衰→宫位生克', q.trace.map((t) => t.field).join('→'));
ok('奇门每层字段齐全', q.trace.every((t) => ['field', 'rule', 'inputs', 'result', 'source'].every((k) => k in t)));
ok('奇门每层 rule 非空', q.trace.every((t) => typeof t.rule === 'string' && t.rule.length >= 8));
ok('奇门每层 source 指向引擎', q.trace.every((t) => /engine\//.test(t.source)), q.trace.map((t) => t.source).join(' | '));
ok('奇门盘面事实带四柱与局', q.trace[0].result.length > 0 && q.trace[0].inputs.some((x) => x.label === '四柱') && q.trace[0].inputs.some((x) => x.label === '节气 / 局'));
ok('奇门盘面事实与盘面一致', q.trace[0].inputs.some((x) => x.value.includes(q.dun) && x.value.includes(String(q.juNumber))));
ok('奇门用神层按方向取用神', q.trace[1].inputs.some((x) => x.label === '询问方向' && x.value === '事业') && q.trace[1].result.includes('开门'), q.trace[1].result);
ok('奇门用神层给出落宫', /落 \d宫/.test(q.trace[1].result), q.trace[1].result);
const qLove = compute({ system: 'qimen', datetime: '2026-10-31T10:00', direction: 'love', trace: true });
ok('奇门换方向换用神', qLove.trace[1].result.includes('休门') && qLove.trace[1].result !== q.trace[1].result, qLove.trace[1].result);
ok('奇门 refresh 只重建不修改原结果', (() => {
  const before = JSON.stringify(q);
  const layers = buildTrace(q, { direction: 'study' });
  return JSON.stringify(q) === before && layers[1].result.includes('景门');
})(), buildTrace(q, { direction: 'study' })[1].result);
ok('奇门旺衰层带月令', q.trace[2].inputs.some((x) => x.label === '月令') && q.trace[2].result.includes('门：') && q.trace[2].result.includes('星：') && q.trace[2].result.includes('天盘干：'));
ok('奇门宫位生克层给门迫与干宫', q.trace[3].result.includes('门迫') && q.trace[3].result.includes('天盘干与宫'), q.trace[3].result);
ok('奇门宫位生克层带条件', q.trace[3].inputs.some((x) => x.label === '击刑 / 入墓') && q.trace[3].inputs.some((x) => x.label === '空亡'));
const qPlain = compute({ system: 'qimen', datetime: '2026-10-31T10:00', direction: 'career' });
const qWithTrace = JSON.parse(JSON.stringify(q));
delete qWithTrace.trace;
ok('奇门 trace 不改盘面', JSON.stringify(qWithTrace) === JSON.stringify(qPlain));

// ── ③c 大六壬：天地盘 → 四课 → 三传 ────────────────────────────
const d = compute({ system: 'daliuren', datetime: '2026-10-31T10:00', trace: true });
ok('大六壬返回三层', Array.isArray(d.trace) && d.trace.length === 3, d.trace && d.trace.length);
ok('大六壬层序固定', d.trace.map((t) => t.key).join(',') === 'tiandipan,sike,sanchuan', d.trace.map((t) => t.key).join(','));
ok('大六壬层名', d.trace.map((t) => t.field).join('→') === '天地盘→四课→三传', d.trace.map((t) => t.field).join('→'));
ok('大六壬每层字段齐全', d.trace.every((t) => ['field', 'rule', 'inputs', 'result', 'source'].every((k) => k in t) && t.rule.length >= 8 && /engine\//.test(t.source)));
ok('大六壬天地盘带日干支与时支', d.trace[0].inputs.some((x) => x.label === '日干支' && x.value === d.dayGanZhi) && d.trace[0].inputs.some((x) => x.label === '时支' && x.value.startsWith(d.hourZhi)));
ok('大六壬天地盘十二支齐全', (d.trace[0].result.match(/→/g) || []).length === 12, d.trace[0].result);
ok('大六壬天地盘带月将与贵人', d.trace[0].inputs.some((x) => x.label === '月将' && x.value.includes(d.yueJiang.zhi)) && d.trace[0].inputs.some((x) => x.label === '昼夜 / 贵人'));
ok('大六壬四课逐课给生克', ['1课', '2课', '3课', '4课'].every((x) => d.trace[1].result.includes(x)) && d.siKe.every((k) => d.trace[1].result.includes(k.relation)), d.trace[1].result);
ok('大六壬四课带日干寄宫', d.trace[1].inputs.some((x) => x.label === '日干寄宫' && x.value.length === 1));
ok('大六壬三传与盘面一致', d.trace[2].result.includes(d.sanChuan.chu.zhi) && d.trace[2].result.includes(d.sanChuan.zhong.zhi) && d.trace[2].result.includes(d.sanChuan.mo.zhi), d.trace[2].result);
ok('大六壬三传带课体与六亲', d.trace[2].inputs.some((x) => x.label === '课体' && x.value.includes(d.geJu.name)) && d.trace[2].result.includes(d.sanChuan.chu.liuQin));
const dPlain = compute({ system: 'daliuren', datetime: '2026-10-31T10:00' });
const dWithTrace = JSON.parse(JSON.stringify(d));
delete dWithTrace.trace;
ok('大六壬 trace 不改盘面', JSON.stringify(dWithTrace) === JSON.stringify(dPlain));


// ── ④ 只读：trace 开关不改盘面、不改影子盘 ID ───────────────────
const plain = compute({ system: 'liuyao', lines: LINES, question: '今年能否换工作', direction: 'career', datetime: '2026-10-31T10:00' });
const withTrace = JSON.parse(JSON.stringify(l));
delete withTrace.trace;
ok('trace 不改盘面', JSON.stringify(withTrace) === JSON.stringify(plain));
const s1 = compute({ system: 'bazi', datetime: '1990-05-06T08:30', gender: 'male', shadow: true, shadowVersion: 't' });
const s2 = compute({ system: 'bazi', datetime: '1990-05-06T08:30', gender: 'male', shadow: true, shadowVersion: 't', trace: true });
ok('trace 不影响影子盘 ID', s1.shadow.id === s2.shadow.id && s1.shadow.baseId === s2.shadow.baseId);
ok('不传 trace 时结果无 trace', plain.trace === undefined);

// ── ⑤ 文本层 ──────────────────────────────────────────────────
const text = renderText(l);
ok('文本含推导链标题与层数', text.includes('【推导链】六爻 · 5 层'));
ok('文本列出每层规则与出处', text.includes('规则：') && text.includes('出处：engine/liuyao.js'));
ok('文本含分隔后的层名', ['纳甲', '六亲', '世应', '伏神', '旺衰'].every((x) => text.includes(`. ${x}｜`)));
ok('奇门文本层给四层', renderText(q).includes('【推导链】奇门 · 4 层') && renderText(q).includes('. 用神落宫｜'));
ok('大六壬文本层给三层', renderText(d).includes('【推导链】大六壬 · 3 层') && renderText(d).includes('. 三传｜'));

// ── ⑥ 面板：入口卡 + 右侧抽屉 + 逐层 details ──────────────────
const sandbox = { window: {}, document: {}, console };
sandbox.window.window = sandbox.window;
vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
const PP = sandbox.window.__PP;
const html = PP.traceHTML(l.trace, 'liuyao');
ok('面板渲染推导链入口', html.includes('data-trace-open') && html.includes('推导链'));
ok('入口显示层级链', html.includes('纳甲 → 六亲 → 世应 → 伏神 → 旺衰'));
ok('渲染右侧抽屉', html.includes('mp-trace-layer') && html.includes('mp-trace-drawer') && html.includes('aria-modal="true"'));
ok('抽屉含五层 details', (html.match(/class="mp-trace-step"/g) || []).length === 5);
ok('第一层默认展开', /class="mp-trace-step" open/.test(html));
ok('每层渲染规则/输入/结果/出处', html.includes('mp-trace-rule') && html.includes('mp-trace-inputs') && html.includes('mp-trace-result') && html.includes('mp-trace-src'));
ok('入口带 44px 关闭按钮', html.includes('mp-trace-close') && html.includes('data-trace-close'));
ok('无 trace 时渲染空串', PP.traceHTML(null, 'bazi') === '' && PP.traceHTML([], 'ziwei') === '');
const evil = [{ key: 'x', field: '<img src=x>', rule: '<script>', inputs: [{ label: '<b>', value: '<i>' }], result: '<u>', source: '<s>' }];
const evilHTML = PP.traceHTML(evil, 'bazi');
ok('推导链文本全部转义', !evilHTML.includes('<img src=x') && !evilHTML.includes('<script>') && !evilHTML.includes('<u>') && evilHTML.includes('&lt;img'));

// ── ⑦ 面板/独立页接线 ─────────────────────────────────────────
const appSrc = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
const uiSrc = fs.readFileSync(new URL('../src/web-ui.js', import.meta.url), 'utf8');
ok('面板渲染 traceHTML', appSrc.includes('PP.traceHTML(result.r.trace, result.r.system)'));
ok('面板请求 trace', appSrc.includes("args.trace = k === 'liuyao' || k === 'bazi' || k === 'ziwei' || k === 'qimen' || k === 'daliuren'"));
ok('面板处理抽屉开关', appSrc.includes('data-trace-open') && appSrc.includes('data-trace-close'));
ok('独立页渲染 traceHTML', uiSrc.includes('window.__PP.traceHTML(last.r.trace, last.r.system)'));
ok('独立页请求 trace', uiSrc.includes("args.trace = tab === 'liuyao' || tab === 'bazi' || tab === 'ziwei' || tab === 'qimen' || tab === 'daliuren'"));
ok('独立页处理抽屉开关', uiSrc.includes('data-trace-open') && uiSrc.includes('data-trace-close'));
ok('面板改方向时重算推导链', appSrc.includes('Engine.buildTrace') && appSrc.includes('refresh: true'));
ok('独立页改方向时重算推导链', uiSrc.includes('window.Engine.buildTrace') && uiSrc.includes('refresh: true'));
ok('面板把方向传给六爻 compute', appSrc.includes("if (k === 'liuyao') args.direction = direction"));
ok('独立页把方向传给六爻 compute', uiSrc.includes("if (tab === 'liuyao') args.direction = el('direction').value"));
ok('面板把方向传给奇门 compute', appSrc.includes('args.juMethod = qimenRule; args.lateZiHourMode = qLateZi; args.direction = direction'));
ok('独立页把方向传给奇门 compute', uiSrc.includes("if (tab === 'qimen') args.direction = el('qdir').value"));
ok('面板改方向时重算奇门用神层', appSrc.includes("(tab === 'liuyao' || tab === 'qimen')") && appSrc.includes('Engine.buildTrace(r, { direction: ask.direction })'));
ok('独立页改方向时重算奇门用神层', uiSrc.includes('window.Engine.buildTrace(last.r, { direction: qdir.value })'));

// ── ⑧ 宿主工具 ────────────────────────────────────────────────
let def = null;
hostApply({ tools: { register: (d) => { def = d; } }, effect: (fn) => fn() });
ok('工具 schema 暴露 trace', !!(def && def.parameters.properties.trace && def.parameters.properties.trace.type === 'boolean'));
const hostOut = await def.execute({ system: 'liuyao', lines: LINES, question: 'x', datetime: '2026-10-31T10:00', trace: true });
ok('宿主 trace 可执行', Array.isArray(hostOut.trace) && hostOut.trace.length === 5);
