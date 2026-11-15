// 结果拼接：一份段序，两个视图，五档体系。
//
// 这一层以前不存在——单页拼十五段、面板拼十二段，顺序还不一样。每加一块卡就要改两处，
// 漏一处就是「面板有、单页没有」。现在两边都只调 composeResult，所以段序、dev 取舍、
// 档位差异全部在这里钉死。
import fs from 'node:fs';
import vm from 'node:vm';
import { ok, eq } from './_harness.mjs';

const SRC = fs.readFileSync(new URL('../src/compose.js', import.meta.url), 'utf8');

function load() {
  const box = { window: {}, console };
  vm.runInNewContext(SRC, box, { filename: 'compose.js' });
  return box.window.__MPCompose;
}

const C = load();

// ── ① 段序 ────────────────────────────────────────────────────
eq('用户段序：结论→盘面→盘号→时刻→解读→追问→附加',
  C.USER_SEGS.join(','), 'head,body,chart,shortId,castAt,interpret,followup,extra');
eq('dev 段序：耗时在前、口径在最后',
  C.DEV_SECTIONS.join(','), 'perf,revision,handle,shadow,trace,caliber');
ok('追问条不进 dev 段（它本来就给用户）', !C.DEV_SECTIONS.includes('followup'));

const parts = {
  head: '[H]', body: '[B]', chart: '[C]', shortId: '[S]', castAt: '[T]',
  interpret: '[I]', followup: '[F]', extra: '[E]', exportBar: '[X]',
  perf: '[P]', revision: '[R]', handle: '[D]', shadow: '[W]', trace: '[Z]', caliber: '[L]',
};

eq('用户视图只出用户段', C.composeResult(parts, { mode: 'user', system: 'ziwei' }),
  '[H][B][C][S][T][I][F][E][X]');
ok('用户视图里一个技术段都没有',
  !/[PRDWLZ]/.test(C.composeResult(parts, { mode: 'user', system: 'ziwei' }).replace(/\[[HBCSTIFEX]\]/g, '')));
eq('dev 视图在附加之后补技术段，导出条仍在最末',
  C.composeResult(parts, { mode: 'dev', system: 'ziwei' }),
  '[H][B][C][S][T][I][F][E][P][R][D][W][Z][L][X]');
eq('空段不占位', C.composeResult({ head: '[H]', followup: '', chart: null }, { mode: 'user' }), '[H]');
eq('没东西可出就是空串', C.composeResult({}, { mode: 'user' }), '');

// ── ② 五档体系 ────────────────────────────────────────────────
const TIERS = ['chart', 'ask', 'judge', 'quiz', 'lookup'];
eq('五档齐全', Object.keys(C.TIER).join(','), TIERS.join(','));
const all = TIERS.reduce((acc, k) => acc.concat(C.TIER[k]), []);
eq('22 个体系一个不漏、一个不重', all.length, 22);
eq('去重后还是 22', new Set(all).size, 22);

for (const s of ['bazi', 'ziwei', 'hepan', 'trend', 'fengshui', 'name']) eq('盘类 ' + s, C.tierOf(s), 'chart');
for (const s of ['liuyao', 'meihua', 'daliuren', 'qimen', 'tarot', 'xiaoliuren']) eq('问事类 ' + s, C.tierOf(s), 'ask');
for (const s of ['wuyunliuqi', 'taiyi', 'zeri']) eq('判定类 ' + s, C.tierOf(s), 'judge');
for (const s of ['mbti', 'constitution']) eq('问卷类 ' + s, C.tierOf(s), 'quiz');
for (const s of ['almanac', 'chenggu', 'star', 'numerology', 'convert']) eq('速查类 ' + s, C.tierOf(s), 'lookup');
eq('没登记过的体系按盘类兜底（不静默丢段）', C.tierOf('something-new'), 'chart');
eq('空 system 也兜底', C.tierOf(''), 'chart');

// ── ③ 档位差异：问卷与速查不出追问条 ──────────────────────────
eq('问卷类不出追问（没有哪一年可问）',
  C.composeResult(parts, { mode: 'user', system: 'mbti' }), '[H][B][C][S][T][I][E][X]');
eq('速查类不出追问（追问只能回找不到）',
  C.composeResult(parts, { mode: 'user', system: 'almanac' }), '[H][B][C][S][T][I][E][X]');
eq('盘类保留追问', C.composeResult(parts, { mode: 'user', system: 'bazi' }), '[H][B][C][S][T][I][F][E][X]');
eq('问事类保留追问', C.composeResult(parts, { mode: 'user', system: 'liuyao' }), '[H][B][C][S][T][I][F][E][X]');
eq('判定类保留追问（可追到具体年）',
  C.composeResult(parts, { mode: 'user', system: 'wuyunliuqi' }), '[H][B][C][S][T][I][F][E][X]');
eq('dev 视图下问卷也不补追问', C.composeResult({ ...parts, followup: '[F]' }, { mode: 'dev', system: 'constitution' }),
  '[H][B][C][S][T][I][E][P][R][D][W][Z][L][X]');

// ── ④ dev 开关：?dev=1 优先于本机记忆 ──────────────────────────
const withUrl = (search, hash) => {
  const box = { window: { location: { search, hash } }, console };
  vm.runInNewContext(SRC, box, { filename: 'compose.js' });
  return box.window.__MPCompose;
};
ok('?dev=1 开', withUrl('?dev=1', '').devOn());
ok('?dev=0 关', !withUrl('?dev=0', '').devOn());
ok('dev=false 关', !withUrl('?dev=false', '').devOn());
ok('哈希里也认', withUrl('', '#dev=1').devOn());
ok('没参数时默认用户视图', !withUrl('', '').devOn());
{
  const store = { v: 'dev' };
  const box = {
    window: { location: { search: '', hash: '' }, localStorage: { getItem: () => store.v, setItem: (k, v) => { store.v = v; } } },
    console,
  };
  vm.runInNewContext(SRC, box, { filename: 'compose.js' });
  const c = box.window.__MPCompose;
  ok('本机记忆 dev 生效', c.devOn());
  ok('setDev 写回', c.setDev(false) === false && store.v === 'user');
  ok('setDev 之后 devOn 关', !c.devOn());
  const locked = {
    window: { location: { search: '?dev=1', hash: '' }, localStorage: { getItem: () => 'user', setItem: () => {} } },
    console,
  };
  vm.runInNewContext(SRC, locked, { filename: 'compose.js' });
  ok('URL 优先于本机记忆', locked.window.__MPCompose.devOn());
}
{
  const box = { window: { location: { search: '', hash: '' }, get localStorage() { throw new Error('隐私模式'); } }, console };
  vm.runInNewContext(SRC, box, { filename: 'compose.js' });
  ok('localStorage 抛异常时不影响渲染', box.window.__MPCompose.devOn() === false
    && box.window.__MPCompose.composeResult({ head: '[H]' }, { mode: 'user' }) === '[H]');
}

// ── ⑤ 短盘号 ──────────────────────────────────────────────────
eq('剥掉 LY- 前缀', C.shortIdHTML('LY-7F3A2C'),
  '<p class="mp-shortid" title="同一组参数、同一版本算出来是同一个编号；回看或反馈时报它就行">盘号 7F3A2C</p>');
eq('空值不出', C.shortIdHTML(''), '');
eq('非字符串不出', C.shortIdHTML(null), '');
eq('没有前缀也照出', C.shortIdHTML('ABCDEF').includes('盘号 ABCDEF'), true);
ok('转义尖括号', C.shortIdHTML('LY-<script>').includes('&lt;script&gt;'), C.shortIdHTML('LY-<script>'));
ok('转义引号', C.shortIdHTML('a"b').includes('&quot;'), C.shortIdHTML('a"b'));

// ── ⑥ 两个 UI 都只调这一处 ────────────────────────────────────
const UI = fs.readFileSync(new URL('../src/web-ui.js', import.meta.url), 'utf8');
const APP = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
ok('独立页走 composeResult', UI.includes('__MPCompose.composeResult('));
ok('独立页把 system 传进去（档位要靠它判断）', /composeResult\(\{[\s\S]{0,2000}?\}, \{ system: last\.r && last\.r\.system \}\)/.test(UI));
ok('面板走 composeOut', APP.includes('composeOut({'));
ok('面板把 system 传进去', /composeOut\(\{[\s\S]{0,2000}?\}, result\.r && result\.r\.system\)/.test(APP));
ok('面板保留兜底拼接（旧 client 缓存时不白屏）', APP.includes("Object.keys(parts).map((k) => parts[k])"));
ok('两边都不再自己拼技术段', !/PP\.perfHTML\(perf\) \+/.test(APP) && !/\+ perfHtml/.test(UI));
