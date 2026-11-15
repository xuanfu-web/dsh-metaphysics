// last 的形状：字段一次声明，读到没赋过值的字段必须当场失败。
//
// 这张对象以前是「谁想挂什么就挂什么」：算完先赋十来个字段，paint 里回填 it，
// paint 回来再回填 perf。加字段不留痕迹，读到没赋过值的字段只会得到 undefined，
// 而 paint 里的 undefined 不报错、只渲染出空白——错误被吃掉。
// 这里的断言就一件事：源码里出现的每一个 last.xxx，都必须在 LAST_FIELDS 表里。
import { ok, eq } from './_harness.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');
const src = fs.readFileSync(path.join(root, 'src', 'web-ui.js'), 'utf8');

// ── 一、表本身 ───────────────────────────────────────────
const m = src.match(/const LAST_FIELDS = \[([\s\S]*?)\];/);
ok('声明了 LAST_FIELDS 表', !!m);
const fields = m ? Array.from(m[1].matchAll(/'(\w+)'/g)).map((x) => x[1]) : [];
ok('表里有十八个字段', fields.length === 18, '实际 ' + fields.length + '：' + fields.join(','));
eq('表里没有重复', fields.length - new Set(fields).size, 0);

['r', 'it', 'html', 'perf', 'tab', 'date', 'time', 'gender', 'address', 'trueSolar', 'lateZi'].forEach((k) => {
  ok('表里有 ' + k, fields.indexOf(k) >= 0);
});

// ── 二、源码里读到的每个 last.xxx 都在表里 ────────────────
// 排除 last.dataset（那是 dataset 赋值不是这张对象）与 last.child 之类 DOM 字段
const read = new Set();
for (const hit of src.matchAll(/\blast\.([a-zA-Z_]\w*)/g)) read.add(hit[1]);
const stray = Array.from(read).filter((k) => fields.indexOf(k) < 0);
ok('没有表外字段被读写', stray.length === 0, '表外：' + stray.join(','));
ok('读到的字段数接近表大小', read.size >= 14, '实际 ' + read.size);

// ── 三、赋值只有一处，且走 makeLast ─────────────────────
const assigns = Array.from(src.matchAll(/last = (makeLast\(\{|null)/g)).map((x) => x[1]);
ok('last 的赋值都走 makeLast 或 null', assigns.every((a) => a === 'makeLast({' || a === 'null'), assigns.join(','));
ok('不再有裸对象字面量赋值', !/last = \{/.test(src));
ok('makeLast 回了 null 的两处（错误/清空）也在', assigns.filter((a) => a === 'null').length >= 6, '实际 ' + assigns.filter((a) => a === 'null').length);

// ── 四、运行时：默认值对，未知键被丢掉 ───────────────────
const fnSrc = src.slice(src.indexOf('function makeLast(p)'), src.indexOf('let last = null;'));
const makeLast = new Function('LAST_FIELDS', fnSrc + '; return makeLast;')(fields);

const blank = makeLast({});
eq('空对象时字段齐', Object.keys(blank).length, fields.length);
eq('r 默认 null', blank.r, null);
eq('it 默认空串', blank.it, '');
eq('trueSolar 默认 true', blank.trueSolar, true);
eq('lateZi 默认 true', blank.lateZi, true);
eq('timed 默认 false', blank.timed, false);
eq('其它默认空串', blank.date, '');

const given = makeLast({ r: { system: 'bazi' }, date: '1990-05-12', taboo: 'x' });
eq('给了的字段照抄', given.date, '1990-05-12');
eq('表外的键不会挂上去', given.taboo, undefined);
ok('表外的键真的不在对象里', !Object.prototype.hasOwnProperty.call(given, 'taboo'));
eq('没给的字段仍有默认', given.time, '');

// 值是 false / 0 / 空串时不能被默认值覆盖（hasOwnProperty 而不是真值判断）
const falsy = makeLast({ lateZi: false, trueSolar: false, tab: '' });
eq('false 不被默认值吃掉', falsy.lateZi, false);
eq('false 不被默认值吃掉（trueSolar）', falsy.trueSolar, false);
eq('空串仍是空串', falsy.tab, '');
