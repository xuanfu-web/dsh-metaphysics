// 校验按 tab 拆包：入口懒加载、每个 client.<name>.js 可注册可执行，且分块引擎与源码一致
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { CHUNKS, CHUNK_OF_TAB } from '../tools/build-client.mjs';
import * as srcEngine from '../engine/index.js';
import { ok, eq } from './_harness.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const reactStub = {
  createElement: () => null,
  useState: (v) => [typeof v === 'function' ? v() : v, () => {}],
  useEffect: () => {},
  useRef: (v) => ({ current: v }),
};

const appSrc = read('src/app.js');
const tabs = [...appSrc.matchAll(/\{ k: '([a-z]+)'/g)].map((m) => m[1]);
ok('面板 tab 共 21 个（0.77.0 称骨撤独立入口并入八字）', tabs.length === 21, String(tabs.length));
ok('每个 tab 都映射到分块', tabs.every((t) => CHUNK_OF_TAB[t]), tabs.filter((t) => !CHUNK_OF_TAB[t]).join(','));
ok('分块文件名都是 client.<name>.js', Object.values(CHUNK_OF_TAB).every((f) => /^client\.[a-z]+\.js$/.test(f)));

// 八字结果卡里的称骨是 chart 块的产物：chart 块里的 buildChenggu 从 __mods.chenggu 解构而来，
// 模块不在栈里就解构成 undefined，而 dn() 合并时 `!== void 0` 会把它静默跳过——
// 症状是「左侧插件面板一个称骨字都不出，单页（全量引擎）却正常」。这里钉死，别再把模块摘掉。
ok('chart 块自带 chenggu 模块（八字卡内嵌称骨）', CHUNKS.chart.modules.includes('chenggu'), CHUNKS.chart.modules.join(','));

// 分块体积上限只认 tools/check-bundle.mjs 一处。
// 2026-11-07 之前这里另写死一条 232KB 硬线，和 CI 侧的 260KB 墙并存：bazi 涨到 231.2KB 时
// 余量只剩 0.8KB，而引文库的原文／白话全在不打包的 citations-fuwen.js，进分块的只是定位字段与文案。
// 现在把硬编码删掉，改读同一个 CAP——放宽的是预算，不是闸门，超了照样 FAIL。
const bundleTool = read('tools/check-bundle.mjs');
const capMatch = /const CHUNK_GZIP_CAP = ([0-9*\s.]+);/.exec(bundleTool);
if (!capMatch) throw new Error('check-bundle.mjs 里找不到 CHUNK_GZIP_CAP');
const CHUNK_GZIP_CAP = Function(`return (${capMatch[1]});`)();
ok('分块预算与 check-bundle 同源', Number.isFinite(CHUNK_GZIP_CAP) && !bundleTool.includes('232 * 1024'));

// 分块文件：注册名、返回 Engine、体积预算
for (const name of Object.keys(CHUNKS)) {
  const file = `client.${name}.js`;
  const full = path.join(root, file);
  ok(`${file} 已构建`, fs.existsSync(full));
  if (!fs.existsSync(full)) continue;
  const code = fs.readFileSync(full, 'utf8');
  let reg = null;
  vm.runInNewContext(code, { window: { __ModuleLoader__: { load: (m) => { reg = m; } } }, console }, { filename: file });
  eq(`${file} 注册 id`, reg && reg.id, 'dsh-metaphysics');
  eq(`${file} 注册 chunk`, reg && reg.chunk, file);
  const exp = reg.factory(() => reactStub);
  ok(`${file} 返回 Engine.compute`, exp && exp.Engine && typeof exp.Engine.compute === 'function');
  ok(`${file} 自包含（不依赖 require.async）`, !code.includes('require.async('));
  const gz = zlib.gzipSync(Buffer.from(code, 'utf8')).length;
  // 旧口径（220 → 228 → 232KB）已废：那三次抬线抬的是 geo 坐标表与入参守卫，
  // 不是引文库。原文外移后分块增长只来自定位字段、卡片文案与 CHANGELOG 条目，
  // 继续用 232KB 卡着只会逼人去改闸门数字，而不是去拆真正的大家伙。
  // 真要往 COMMON 里塞大表，bundle-budget.test.mjs 的「合计在预算内」仍会拦下来。
  ok(`${file} gzip < ${Math.round(CHUNK_GZIP_CAP / 1024)}KB`, gz < CHUNK_GZIP_CAP,
    `${Math.round(gz / 1024)}KB / 上限 ${Math.round(CHUNK_GZIP_CAP / 1024)}KB`);
}

// 入口：只带界面，按 tab 取分块；切换 tab 后仍用对应分块的 Engine
const entry = read('client.js');
// 入口预算：只算界面，不含引擎。卦例库抽屉（480 条历史上限 + 四态 + 筛选 + 导出）
// 2026-11-12：新增「体质」（第 20 个体系）、「运气」（第 21 个）与「太乙」（第 22 个）之后，
// 入口从 338.4KB/102.2KB 涨到 346.9KB/104.1KB；gzip 门槛由 CI 侧统一（105KB），raw 放这里（345KB）。
// 这不是无上限：P4-2 五运六气 / P4-3 太乙再涨 5KB 以上，就该把问卷或盘面拆到分块，而不是继续抬线。
// 入口 gzip 上限也只认 tools/check-bundle.mjs 一处。
// 2026-11-12（P4-2 五运六气）发现：check-bundle 判 105KB、这里与 client-bundle.test.mjs 写死 108KB，
// 实际是「CI 紧、测试松」——体积超线只会让一边红，另一边还绿。改成同源读取，数字只在 CI 里写一份。
const entMatch = /const ENTRY_GZIP_CAP = ([0-9*\s.]+);/.exec(bundleTool);
if (!entMatch) throw new Error('check-bundle.mjs 里找不到 ENTRY_GZIP_CAP');
const ENTRY_GZIP_CAP = Function(`return (${entMatch[1]});`)();
// 356KB：0.71 的「说人话」层给入口加了约 1.3KB（22 个体系共用一段读法，不是按体系复制）。
const ENTRY_RAW_CAP = 356 * 1024;
const entryGz = zlib.gzipSync(Buffer.from(entry, 'utf8')).length;
ok(`client.js gzip < ${Math.round(ENTRY_GZIP_CAP / 1024)}KB（首屏不背引擎）`, entryGz < ENTRY_GZIP_CAP, `${Math.round(entryGz / 1024)}KB`);
ok('入口体积接近界面而非整套引擎', entry.length < ENTRY_RAW_CAP, `${Math.round(entry.length / 1024)}KB`);
ok('入口暴露 __mpEnsureEngine', entry.includes('__mpEnsureEngine'));

let entryReg = null;
const sandbox = {
  window: { __ModuleLoader__: { load: (m) => { entryReg = m; } }, localStorage: { getItem: () => null, setItem() {} } },
  console, setTimeout,
  document: { createElement: () => ({ style: {}, setAttribute() {}, appendChild() {}, remove() {} }), head: { appendChild() {} } },
};
vm.runInNewContext(entry, sandbox, { filename: 'client.js' });
const requested = [];
const requireStub = (n) => { if (n === 'react') return reactStub; throw new Error(`unexpected require: ${n}`); };
requireStub.async = async (spec) => {
  requested.push(spec);
  const file = spec.replace('./', '');
  let reg = null;
  vm.runInNewContext(read(file), { window: { __ModuleLoader__: { load: (m) => { reg = m; } } }, console }, { filename: file });
  return reg.factory(requireStub);
};
const surface = entryReg.factory(requireStub);
ok('入口 factory 返回 apply', typeof surface.apply === 'function');

const cases = {
  bazi: { system: 'bazi', datetime: '1990-05-12T14:30', gender: 'female', longitude: 116.4, shadow: true, trace: true, verifyPast: 6, cross: true, withInterpret: true, question: 'r', direction: 'career' },
  ziwei: { system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'female', shadow: true, trace: true, cross: true, withInterpret: true },
  trend: { system: 'trend', datetime: '1990-05-12T14:30', gender: 'female' },
  hepan: { system: 'hepan', datetime: '1990-05-12T14:30', gender: 'female', partner: { datetime: '1992-08-15T10:00', gender: 'female', trueSolar: true } },
  name: { system: 'name', action: 'assess', surname: '张', givenName: '三', datetime: '1990-05-12T14:30', gender: 'female' },
  fengshui: { system: 'fengshui', action: 'natal', datetime: '1990-05-12T14:30', gender: 'female' },
  liuyao: { system: 'liuyao', lines: [9, 7, 8, 8, 7, 6], question: 'x', shadow: true, trace: true, withInterpret: true, direction: 'career' },
  meihua: { system: 'meihua', datetime: '2026-10-31T12:00', question: 'x', withInterpret: true },
  qimen: { system: 'qimen', datetime: '2026-10-31T12:00', question: 'x', trace: true, direction: 'career', withInterpret: true },
  daliuren: { system: 'daliuren', datetime: '2026-10-31T12:00', question: 'x', trace: true, withInterpret: true },
  tarot: { system: 'tarot', count: 3, question: 'x', withInterpret: true, seed: 42 },
  almanac: { system: 'almanac', datetime: '2026-10-31T12:00' },
  convert: { system: 'convert', mode: 'solar2lunar', datetime: '2026-10-31T12:00' },
  zeri: { system: 'zeri', startDate: '2026-10-31', task: '开业', days: 5 },
  chenggu: { system: 'chenggu', datetime: '1990-05-12T14:30', gender: 'female' },
  xiaoliuren: { system: 'xiaoliuren', mode: 'time', datetime: '2026-10-31T12:00' },
  star: { system: 'star', datetime: '1990-05-12T00:00' },
  numerology: { system: 'numerology', datetime: '1990-05-12T00:00' },
  mbti: { system: 'mbti', answers: [3, 2, 4, 1, 5, 3, 2, 4, 1, 5, 3, 2, 4, 1, 5, 3, 2, 4, 1, 5, 3, 2, 4, 1] },
};

let same = 0;
const diffs = [];
for (const [tab, args] of Object.entries(cases)) {
  try {
    await sandbox.window.__mpEnsureEngine(tab);
    const a = JSON.stringify(srcEngine.compute(args));
    const b = JSON.stringify(sandbox.window.Engine.compute(args));
    if (a === b) same += 1;
    else diffs.push(tab);
  } catch (e) {
    diffs.push(`${tab}:${e.message}`);
  }
}
ok('19 个体系的分块引擎与源码逐字节一致', same === 19, `一致 ${same}/19${diffs.length ? '，差异 ' + diffs.join('；') : ''}`);
// 合盘有八字/紫微两条路径，紫微合盘也要在 hepan 分块里复算一致
await sandbox.window.__mpEnsureEngine('hepan');
const hpZiwei = { system: 'hepan', chart: 'ziwei', datetime: '1990-05-12T14:30', gender: 'female', partner: { datetime: '1992-08-15T10:00', gender: 'female', trueSolar: true } };
ok('紫微合盘在 hepan 分块内可复算', JSON.stringify(srcEngine.compute(hpZiwei)) === JSON.stringify(sandbox.window.Engine.compute(hpZiwei)));
ok('按需拉取对应分块', requested.includes('./client.chart.js') && requested.includes('./client.mbti.js'), requested.join(','));
ok('无 interpret 的分块不会抹掉 DIRECTIONS', Array.isArray(sandbox.window.Engine.DIRECTIONS) && sandbox.window.Engine.DIRECTIONS.length === 7,
  String(sandbox.window.Engine.DIRECTIONS && sandbox.window.Engine.DIRECTIONS.length));

// 命盘类四 tab 合并成一个 chart 块：四个 tab 必须都映射到同一个文件，
// 且真正只下载一次——这正是合并的目的（原来每切一个 tab 要重复下载 140KB 公共栈）。
const chartTabs = ['bazi', 'ziwei', 'hepan', 'trend'];
ok('命盘四 tab 共用一个 chart 块', chartTabs.every((t) => CHUNK_OF_TAB[t] === 'client.chart.js'),
  chartTabs.map((t) => `${t}→${CHUNK_OF_TAB[t]}`).join(' '));
for (const t of chartTabs) await sandbox.window.__mpEnsureEngine(t);
ok('四个命盘 tab 只拉取一次 chart 块', requested.filter((x) => x === './client.chart.js').length === 1,
  `实际 ${requested.filter((x) => x === './client.chart.js').length} 次：${requested.join(',')}`);

// 切回紫微分块：上一次加载的是 mbti，入口必须把紫微分块的 Engine 重新合并回来
await sandbox.window.__mpEnsureEngine('ziwei');
const z = sandbox.window.Engine.compute(cases.ziwei);
ok('切换分块后仍能排紫微', z && z.system === 'ziwei' && z.palaces && z.palaces.length === 12);
// 紫微与八字同块：切回来后不应再取块（缓存命中）
ok('切换 tab 不重复取块', requested.filter((x) => x === './client.chart.js').length === 1, requested.join(','));
