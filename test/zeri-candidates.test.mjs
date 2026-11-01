// C4-b 择日候选日比较：只比用户给的这几天，逐日并排、标出这一组里的最优
import fs from 'node:fs';
import vm from 'node:vm';
import { compute, renderText } from '../engine/index.js';
import { ok, eq } from './_harness.mjs';

const CAND = ['2026-12-01', '2026-12-08', '2026-12-15', '2026-12-22'];
const base = { system: 'zeri', task: '开业', candidates: CAND, shengXiao: '鼠' };
const r = compute(base);

// ── 结构与一致性 ──
eq('候选模式标记', r.meta.mode, 'candidates');
eq('候选天数等于输入', r.meta.days, 4);
eq('候选日原样回显', r.meta.candidates.join(','), CAND.join(','));
eq('逐日保持输入顺序', r.days.map((d) => d.date).join(','), CAND.join(','));
eq('比较块存在', r.compare && r.compare.mode, 'candidates');
eq('比较天数与表一致', r.compare.count, r.days.length);
ok('最优是这一组最高分', r.compare.best && r.compare.best.score === Math.max(...r.days.filter((d) => !d.excluded).map((d) => d.score)),
  JSON.stringify(r.compare.best));
ok('同分者含最优日本身', r.compare.best.ties.includes(r.compare.best.date));
eq('分差等于最高减最低', r.compare.spread, Math.max(...r.days.map((d) => d.score)) - Math.min(...r.days.map((d) => d.score)));
ok('比较口径写明不换算成好多少', r.compare.note.includes('不代表「好多少」'), r.compare.note);

// 同一批日子，逐日分数必须与区间模式逐字一致（候选模式不改评分公式）
const range = compute({ system: 'zeri', task: '开业', startDate: '2026-12-01', days: 31, shengXiao: '鼠' });
for (const d of r.days) {
  const same = range.days.find((x) => x.date === d.date);
  ok(`${d.date} 与区间模式同分`, !!same && same.score === d.score && same.verdict === d.verdict,
    JSON.stringify({ cand: [d.score, d.verdict], range: same && [same.score, same.verdict] }));
}

// 冲属相排除在候选模式同样生效
const chong = r.days.find((d) => d.excluded);
ok('冲属相日被标排除', !!chong && chong.chong === '鼠', JSON.stringify(chong));
ok('排除日不进最优', !r.compare.best || r.compare.best.date !== (chong && chong.date));

// 去重：重复的候选日只算一次，保留首次出现的位置
const dup = compute({ system: 'zeri', task: '开业', candidates: ['2026-12-01', '2026-12-01', '2026-12-08'] });
eq('重复候选日去重', dup.meta.days, 2);
eq('去重后顺序不变', dup.days.map((d) => d.date).join(','), '2026-12-01,2026-12-08');

// ── 入参守卫：错误一律 E_INPUT，且说清改法 ──
const errOf = (args) => { try { compute(args); return null; } catch (e) { return e; } };
const e1 = errOf({ system: 'zeri', task: '开业', candidates: ['2026-12-01'] });
ok('少于 2 个候选日报错', !!e1 && e1.code === 'E_INPUT' && e1.message.includes('至少给 2 个'), e1 && e1.message);
const e2 = errOf({ system: 'zeri', task: '开业', candidates: Array.from({ length: 13 }, (_, i) => `2026-12-${String(i + 1).padStart(2, '0')}`) });
ok('超过 12 个候选日报错', !!e2 && e2.code === 'E_INPUT' && e2.message.includes('最多 12 个'), e2 && e2.message);
const e3 = errOf({ system: 'zeri', task: '开业', candidates: ['2026-12-01', '2026-02-30'] });
ok('不存在的日期报错', !!e3 && e3.code === 'E_INPUT' && e3.message.includes('2026-02-30'), e3 && e3.message);
const e4 = errOf({ system: 'zeri', task: '开业', candidates: '2026-12-01' });
ok('不是数组报错', !!e4 && e4.code === 'E_INPUT' && e4.message.includes('数组'), e4 && e4.message);
const e5 = errOf({ system: 'zeri', task: '开业', candidates: ['2026-12-01', '2026-12-01'] });
ok('去重后不足 2 天报错', !!e5 && e5.code === 'E_INPUT' && e5.message.includes('不足 2 天'), e5 && e5.message);
const e6 = errOf({ system: 'zeri', task: '开业' });
ok('区间模式仍要求 startDate', !!e6 && e6.code === 'E_INPUT' && e6.message.includes('startDate'), e6 && e6.message);
const e7 = errOf({ system: 'zeri', task: '不存在的事项', candidates: ['2026-12-01', '2026-12-08'] });
ok('未知事项仍是 E_INPUT', !!e7 && e7.code === 'E_INPUT' && e7.message.includes('不支持的事项'), e7 && e7.message);

// 全部被排除时如实说，不硬推一个
const scan = compute({ system: 'zeri', task: '开业', startDate: '2026-12-01', days: 60, shengXiao: '鼠' });
const excludedDates = scan.days.filter((d) => d.excluded).map((d) => d.date);
ok('区间里能找到多个冲属相日', excludedDates.length >= 2, String(excludedDates.length));
const allOut = compute({ system: 'zeri', task: '开业', candidates: excludedDates.slice(0, 2), shengXiao: '鼠' });
ok('全排除时候选块仍存在', !!allOut.compare);
eq('全排除时最优为空', allOut.compare.best, null);
ok('全排除文本说明原因', renderText(allOut).includes('都因冲属相被排除'), renderText(allOut).slice(0, 200));

// ── 文本 ──
const txt = renderText(r);
ok('文本标明候选与天数', txt.includes('候选 4 天'), txt.slice(0, 200));
ok('文本给这一组最优', txt.includes('这一组里最优'));
ok('文本列全部候选日', CAND.every((d) => txt.includes(d)), txt.slice(0, 400));
ok('文本带比较口径', txt.includes('候选日只在这几天里比'));
const rangeTxt = renderText(range);
ok('区间模式仍说「起 N 天」', rangeTxt.includes('起 31 天'), rangeTxt.slice(0, 120));
ok('区间模式没有比较块', !range.compare && !rangeTxt.includes('这一组里最优'));

// ── 句柄：候选日要能复现 ──
const replay = compute({ handle: r.handle });
eq('句柄复现同一组候选', replay.days.map((d) => `${d.date}:${d.score}`).join(','), r.days.map((d) => `${d.date}:${d.score}`).join(','));

// ── 面板：表 + 转义，区间模式退回文字版 ──
const KIT = fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8');
const box = { window: {}, console };
vm.runInNewContext(KIT, box, { filename: 'panel-kit.js' });
const PP = box.window.__PP;
const html = PP.zeriHTML(r);
ok('候选模式出并列表', html.includes('class="mp-zr"') && html.includes('mp-zr-t'), html.slice(0, 200));
eq('表里逐日一行', (html.match(/class="mp-zr-row/g) || []).length, 4);
ok('最优标出', html.includes('mp-zr-best') && html.includes('最优'));
ok('表头含日期与结论', html.includes('>日期<') && html.includes('>结论<') && html.includes('>理由<'));
ok('列出推荐/可用/回避', html.includes('>推荐<') || html.includes('<em>推荐</em>'), html.slice(-600));
ok('区间模式退回文字版', PP.zeriHTML(range).includes('mp-quick') && !PP.zeriHTML(range).includes('mp-zr-t'));
const xss = PP.zeriHTML({
  ...r,
  meta: { ...r.meta, task: '<img src=x>', shengXiao: '<b>' },
  days: [{ date: '<i>2026-12-01</i>', weekday: '<u>', lunar: '<s>', dayGanZhi: '<b>', zhiXing: '<i>', score: 1, verdict: '<script>', reasons: ['<em>'] }],
  compare: { mode: 'candidates', count: 1, best: { date: '<i>2026-12-01</i>', score: 1, verdict: '<script>', ties: [] }, spread: 0, note: '<svg>' },
  best: [], usable: [], avoid: [], disclaimer: '<iframe>',
});
ok('择日表转义全部文本',
  !xss.includes('<img') && !xss.includes('<script') && !xss.includes('<svg') && !xss.includes('<iframe') && !xss.includes('<i>2026'),
  xss.slice(0, 400));

// ── 接线 ──
const APP = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
const UI = fs.readFileSync(new URL('../src/web-ui.js', import.meta.url), 'utf8');
const TPL = fs.readFileSync(new URL('../tools/build-html.mjs', import.meta.url), 'utf8');
const HOST = fs.readFileSync(new URL('../index.js', import.meta.url), 'utf8');
ok('面板传 candidates', APP.includes('args.candidates'));
ok('面板有候选日输入', APP.includes('候选日（可空，只比这几天）') && APP.includes('zCand'));
ok('独立页传 candidates', UI.includes('args.candidates') && UI.includes("el('zcand')"));
ok('独立页模板有候选日输入', TPL.includes('id="zcand"'));
ok('宿主 schema 暴露 candidates', HOST.includes('candidates:') && HOST.includes('仅 zeri 使用：候选日比较'));
