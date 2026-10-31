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
ok('面板 tab 共 19 个', tabs.length === 19, String(tabs.length));
ok('每个 tab 都映射到分块', tabs.every((t) => CHUNK_OF_TAB[t]), tabs.filter((t) => !CHUNK_OF_TAB[t]).join(','));
ok('分块文件名都是 client.<name>.js', Object.values(CHUNK_OF_TAB).every((f) => /^client\.[a-z]+\.js$/.test(f)));

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
  ok(`${file} gzip < 220KB`, gz < 220 * 1024, `${Math.round(gz / 1024)}KB`);
}

// 入口：只带界面，按 tab 取分块；切换 tab 后仍用对应分块的 Engine
const entry = read('client.js');
const entryGz = zlib.gzipSync(Buffer.from(entry, 'utf8')).length;
ok('client.js gzip < 100KB（首屏不背引擎）', entryGz < 100 * 1024, `${Math.round(entryGz / 1024)}KB`);
ok('入口体积接近界面而非整套引擎', entry.length < 320 * 1024, `${Math.round(entry.length / 1024)}KB`);
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
  bazi: { system: 'bazi', datetime: '1990-05-12T14:30', gender: 'female', longitude: 116.4, shadow: true, trace: true, verifyPast: 6, withInterpret: true, question: 'r', direction: 'career' },
  ziwei: { system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'female', shadow: true, trace: true, withInterpret: true },
  trend: { system: 'trend', datetime: '1990-05-12T14:30', gender: 'female' },
  hepan: { system: 'hepan', datetime: '1990-05-12T14:30', gender: 'female', partner: { datetime: '1992-08-15T10:00', gender: 'female', trueSolar: true } },
  name: { system: 'name', action: 'evaluate', surname: '张', givenName: '三', datetime: '1990-05-12T14:30', gender: 'female' },
  fengshui: { system: 'fengshui', action: 'natal', datetime: '1990-05-12T14:30', gender: 'female' },
  liuyao: { system: 'liuyao', lines: [9, 7, 8, 8, 7, 6], question: 'x', shadow: true, trace: true, withInterpret: true, direction: 'career' },
  meihua: { system: 'meihua', datetime: '2026-10-31T12:00', question: 'x', withInterpret: true },
  qimen: { system: 'qimen', datetime: '2026-10-31T12:00', question: 'x', withInterpret: true },
  daliuren: { system: 'daliuren', datetime: '2026-10-31T12:00', question: 'x', withInterpret: true },
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
ok('按需拉取对应分块', requested.includes('./client.chart.js') && requested.includes('./client.mbti.js'), requested.join(','));
ok('无 interpret 的分块不会抹掉 DIRECTIONS', Array.isArray(sandbox.window.Engine.DIRECTIONS) && sandbox.window.Engine.DIRECTIONS.length === 7,
  String(sandbox.window.Engine.DIRECTIONS && sandbox.window.Engine.DIRECTIONS.length));

// 切回 chart：上一次加载的是 mbti 分块，入口必须把 chart 的 Engine 重新合并回来
await sandbox.window.__mpEnsureEngine('ziwei');
const z = sandbox.window.Engine.compute(cases.ziwei);
ok('切换分块后仍能排紫微', z && z.system === 'ziwei' && z.palaces && z.palaces.length === 12);
ok('分块缓存不重复拉取', requested.filter((x) => x === './client.chart.js').length === 1, requested.join(','));
