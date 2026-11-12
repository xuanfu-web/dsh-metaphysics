// P3：输入区最上面的「起卦快捷行」——六个占卜体系一键起卦。
//
// 只测「入口接线」，不测排盘：一键起卦必须复用 activate / switchTo / run 这一条通路。
// 一旦有人在 chip 里另写一次 run()，起卦时刻的「自动取当下」口径就会分叉——那种改动
// 引擎测试全绿也发现不了，只有这里拦得住。
import fs from 'node:fs';
import { ok, eq } from './_harness.mjs';

const app = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
const css = (app.match(/const CSS = `([\s\S]*?)`;/) || [])[1] || '';
const castBody = app.slice(app.indexOf('function castRow('), app.indexOf('function App('));

// ── ① 六项、顺序、文案 ──────────────────────────────────────────
const chips = [...app.matchAll(/\{ sys: '([a-z]+)', label: '([^']+)', tip: '([^']+)' \}/g)]
  .map((m) => ({ k: m[1], label: m[2], tip: m[3] }));
eq('起卦快捷行共六项', chips.length, 6);
eq('六项与顺序', chips.map((x) => x.k).join(','), 'liuyao,meihua,daliuren,qimen,tarot,xiaoliuren');
ok('六项都有名称与白话说明', chips.every((x) => x.label && x.tip.length >= 10), chips.map((x) => x.tip.length).join('/'));
// 字段名用 sys 不用 k：chunks / panel-first-screen 都用 /\{ k: 'xx', label: / 数 19 个 tab，
// chip 一旦也叫 k 就会被当成 tab（实际会数成 25 个），那种错会以「tab 数量不对」的面目出现，很难查。
ok('chip 项字段名是 sys（不与 tab 的 k 撞名）', /\{ sys: '[a-z]+', label: '/.test(app)
  && !/\{ k: '[a-z]+', label: '[^']+', tip:/.test(app));
ok('六个体系标签齐全', ['六爻', '梅花', '六壬', '奇门', '塔罗', '小六壬'].every((l) => chips.some((x) => x.label === l)));

// ── ② 只能是占卜类：命盘类混进来就必然「没出生信息 → 报错」 ─────
const tkSrc = (app.match(/const TIME_KIND = \{([\s\S]*?)\n\};/) || [])[1] || '';
const kindOfKey = (k) => (tkSrc.match(new RegExp(`(?:^|[\\s,])${k}: '([a-z]+)'`)) || [])[1];
ok('六项在 TIME_KIND 里都是 cast / none', chips.every((x) => ['cast', 'none'].includes(kindOfKey(x.k))),
  chips.map((x) => `${x.k}=${kindOfKey(x.k)}`).join(' '));
ok('塔罗（不看时间）入口写明', chips.find((x) => x.k === 'tarot').tip.includes('不看时间'));
ok('六爻入口写明所问之事必填', chips.find((x) => x.k === 'liuyao').tip.includes('必填'));
ok('梅花入口写明还能改数字起卦', chips.find((x) => x.k === 'meihua').tip.includes('数字'));

// ── ③ 折叠：默认收起、切过就记住、存储只放一个布尔 ──────────────
ok('默认折叠（只认存过 true）', /const \[chipOpen, setChipOpen\] = useState\(storeGet\(CHIP_KEY\) === true\)/.test(app));
ok('折叠状态持久化', /storeSet\(CHIP_KEY, next\)/.test(app));
ok('存储键与「最近用过」分开且不存输入', /const CHIP_KEY = 'mp\.cast\.open'/.test(app)
  && /const RECENT_KEY = 'mp\.recent\.tabs'/.test(app));
ok('折叠时只渲染表头', /if \(!open\) return h\('div', \{ key: 'cast', className: 'mp-castrow' \}, head\);/.test(app));
ok('表头带 aria-expanded 与 aria-controls', /'aria-expanded': open \? 'true' : 'false'/.test(app)
  && /'aria-controls': 'mp-castlist'/.test(app));
ok('展开列表的 id 与 aria-controls 对应', /id: 'mp-castlist'/.test(app));
ok('折叠态把六个名字并排', /CAST_CHIPS\.map\(\(x\) => x\.label\)\.join\(' · '\)/.test(app));

// ── ④ 一键起卦：复用 activate，不另起排盘路径 ───────────────────
const castChipBody = (app.match(/const castChip = \(k\) => \{([\s\S]*?)\};/) || [])[1] || '';
ok('chip 点击走 activate（记录 + switchTo）', /const castChip = \(k\) => \{\s*activate\(k\);\s*\};/.test(app));
ok('castChip 里不自己调 run', castChipBody.length > 0 && !/run\(/.test(castChipBody), castChipBody.trim());
ok('castChip 不自己取当前时刻', castChipBody.length > 0 && !/nowParts\(/.test(castChipBody));
ok('每个 chip 带 data-cast 便于定位', /'data-cast': x\.sys/.test(app));
ok('当前体系的 chip 高亮', /props\.tab === x\.sys \? ' on' : ''/.test(app));
ok('chip 是 button 且 type=button', /type: 'button',\s*className: 'mp-castchip'/.test(app));

// ── ⑤ 结果问进对话：复用既有 handoff，不另写一份 ────────────────
ok('「把这张盘问进对话」直接接 askInChat', /onAsk: askInChat/.test(app));
ok('castRow 里不出现 sendToComposer / Engine', castBody.length > 500 && !/sendToComposer|Engine\./.test(castBody),
  String(castBody.length));
ok('只在有结果时给问进对话按钮', /props\.hasResult \? h\('div'/.test(app));
ok('底部原有的「问进对话」保留', /\}, '问进对话'\),/.test(app));

// ── ⑥ 位置：面板输入区最上面，排在日期/时刻之前 ─────────────────
const panelAt = app.indexOf("h('div', { key: 'head', className: 'mp-panel' },");
const castAt = app.indexOf('castRow({', panelAt);
const rowAt = app.indexOf("h('div', { className: 'mp-row' },", panelAt);
ok('快捷行渲染在面板输入区里', panelAt >= 0 && castAt > panelAt, `${panelAt} → ${castAt}`);
ok('快捷行排在日期/时刻输入之前', castAt > 0 && rowAt > castAt, `${castAt} < ${rowAt}`);

// ── ⑦ 样式：能换行、有选中态、窄侧栏不撑破 ─────────────────────
ok('取到面板 CSS', css.length > 1000, String(css.length));
ok('快捷行样式齐备', ['.mp-castrow{', '.mp-castrow-h{', '.mp-castlist{', '.mp-castchip{', '.mp-castchip.on{', '.mp-castgo{']
  .every((s) => css.includes(s)));
ok('chip 允许换行（窄侧栏不横向撑破）', /\.mp-castlist\{display:flex;flex-wrap:wrap/.test(css));
ok('折叠态表头文字可省略不撑破', /\.mp-castrow-l\{[^}]*text-overflow:ellipsis/.test(css));

// ── ⑧ 不改引擎、不动 schema：快捷行只是面板入口 ─────────────────
ok('castRow 只读 CAST_CHIPS 常量', /CAST_CHIPS\.map\(\(x\) => h\('button'/.test(app));
ok('引擎里不出现快捷行逻辑（入口留在面板）',
  !/castRow|CAST_CHIPS|mp-castchip/.test(fs.readFileSync(new URL('../engine/index.js', import.meta.url), 'utf8')));
