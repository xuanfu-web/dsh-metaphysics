// C4-a 三方合盘：三对两两并列，不合成「三人总分」
import fs from 'node:fs';
import vm from 'node:vm';
import { compute, renderText } from '../engine/index.js';
import { tripleOf } from '../engine/hepan.js';
import { ok, eq } from './_harness.mjs';

const A = { datetime: '1990-05-12T14:30', gender: 'male', address: '河北石家庄' };
const B = { datetime: '1992-08-15T10:00', gender: 'female', address: '四川成都' };
const C = { datetime: '1988-09-09T08:00', gender: 'male', address: '广东广州' };

const base = { system: 'hepan', ...A, partner: B };
const trio = compute({ ...base, partner2: C });
const pair = (x, y) => compute({
  system: 'hepan', datetime: x.datetime, gender: x.gender, address: x.address,
  partner: { datetime: y.datetime, gender: y.gender, address: y.address },
});

// ── 结构 ──
ok('给了 partner2 会回 triple', !!trio.triple, JSON.stringify(trio.triple && Object.keys(trio.triple)));
eq('三对顺序固定', trio.triple.pairs.map((p) => p.key).join(','), 'a-b,a-c,b-c');
eq('三对角色名', trio.triple.pairs.map((p) => `${p.a}×${p.b}`).join(','), '你×对方,你×第三方,对方×第三方');
eq('三对都有分数', trio.triple.pairs.filter((p) => typeof p.total === 'number').length, 3);
ok('每对带三维度', trio.triple.pairs.every((p) => p.dimensions.length === 3),
  JSON.stringify(trio.triple.pairs.map((p) => p.dimensions.map((d) => d.key))));
eq('a-b 总分等于顶层', trio.triple.pairs[0].total, trio.score.total);
eq('a-b 等级等于顶层', trio.triple.pairs[0].level, trio.score.level);
ok('没有「三人总分」字段', !('total' in trio.triple) && !('score' in trio.triple),
  JSON.stringify(Object.keys(trio.triple)));

// ── 与独立两两合盘一致（同一个人的四柱不能因为换了搭档而变）──
eq('a-b 与单独合盘一致', trio.triple.pairs[0].total, pair(A, B).score.total);
eq('a-c 与单独合盘一致', trio.triple.pairs[1].total, pair(A, C).score.total);
eq('b-c 与单独合盘一致', trio.triple.pairs[2].total, pair(B, C).score.total);
eq('a-c 三维度一致',
  JSON.stringify(trio.triple.pairs[1].dimensions.map((d) => d.score)),
  JSON.stringify(pair(A, C).dimensions.map((d) => d.score)));
eq('两两分数与前后顺序无关（A-B）', pair(A, B).score.total, pair(B, A).score.total);
eq('两两分数与前后顺序无关（B-C）', pair(B, C).score.total, pair(C, B).score.total);

// ── 最顺 / 最需磨合 / 分歧最大的一维 ──
const totals = trio.triple.pairs.map((p) => p.total);
eq('最顺分数即最高分', trio.triple.best.total, Math.max(...totals));
eq('最需磨合分数即最低分', trio.triple.hardest ? trio.triple.hardest.total : null, Math.min(...totals));
eq('分差等于最高减最低', trio.triple.spread, Math.max(...totals) - Math.min(...totals));
ok('最顺与最需磨合不是同一对', trio.triple.best.key !== trio.triple.hardest.key, JSON.stringify([trio.triple.best, trio.triple.hardest]));
const spreads = trio.triple.pairs[0].dimensions.map((d, i) => {
  const vals = trio.triple.pairs.map((p) => p.dimensions[i].score);
  return { key: d.key, spread: Math.max(...vals) - Math.min(...vals) };
});
eq('分歧最大的一维取分差最大者', trio.triple.focus.spread, Math.max(...spreads.map((x) => x.spread)));
ok('三方口径写在 note 里，不合成总分', trio.triple.note.includes('不合成'), trio.triple.note);

// ── 边界：null 等于没传；坏输入报 E_PARTNER 且点名 partner2 ──
const withNull = compute({ ...base, partner2: null });
ok('partner2: null 视同未传', !withNull.triple, JSON.stringify(withNull.triple));
const plain = compute(base);
ok('不给 partner2 不回 triple', !plain.triple);
let err = null;
try { compute({ ...base, partner2: 'x' }); } catch (e) { err = e; }
ok('partner2 不是对象时报错', !!err && err.code === 'E_PARTNER', JSON.stringify(err && err.code));
let err2 = null;
try { compute({ ...base, partner2: { gender: 'male' } }); } catch (e) { err2 = e; }
ok('缺 partner2.datetime 报错并点名', !!err2 && err2.message.includes('partner2.datetime'), err2 && err2.message);

// ── 文本 ──
const txt = renderText(trio);
ok('文本给三方块', txt.includes('【三方合盘】'));
ok('文本列三对', ['你–对方', '你–第三方', '对方–第三方'].every((s) => txt.includes(s)), txt.slice(-500));
ok('文本不出现三人总分', !txt.includes('三人总分（'), txt.slice(-500));
ok('文本带口径说明', txt.includes('不合成「三人总分」'));
ok('单对合盘不出三方块', !renderText(plain).includes('【三方合盘】'));
// 三对接近时不硬排名
const near = tripleOf([
  { key: 'a-b', a: '甲', b: '乙', result: { score: { total: 60 }, dimensions: [] } },
  { key: 'a-c', a: '甲', b: '丙', result: { score: { total: 61 }, dimensions: [] } },
  { key: 'b-c', a: '乙', b: '丙', result: { score: { total: 60 }, dimensions: [] } },
]);
eq('接近时仍算出最顺', near.best.total, 61);
ok('接近时分差为 1', near.spread === 1, String(near.spread));

// ── 紫微三方 ──
const zw = compute({ ...base, chart: 'ziwei', partner2: C });
eq('紫微也能三方', zw.triple.pairs.length, 3);
eq('紫微 a-b 与顶层一致', zw.triple.pairs[0].total, zw.score.total);
eq('紫微维度数与单盘一致', zw.triple.pairs[0].dimensions.length, zw.dimensions.length);
ok('紫微文本带三方块', renderText(zw).includes('【三方合盘】'));

// ── 句柄：第三方也要能复现 ──
const replay = compute({ handle: trio.handle });
eq('句柄复现同分', replay.triple.pairs[0].total, trio.triple.pairs[0].total);
eq('句柄复现三对', replay.triple.pairs.map((p) => p.total).join(','), trio.triple.pairs.map((p) => p.total).join(','));
ok('句柄里带 partner2', JSON.parse(Buffer.from(trio.handle.split('.')[1], 'base64url').toString('utf8')).partner2 != null);
// null 视同未传：显式 null 不该多出一张「另一组盘」
const nullP2 = compute({ ...base, partner2: null });
ok('partner2:null 视同未传', !nullP2.triple, JSON.stringify(nullP2.triple && Object.keys(nullP2.triple)));
eq('partner2:null 与省略同句柄', nullP2.handle, compute({ ...base }).handle);

// ── 影子盘：换了第三人就是另一组盘 ──
const shC = compute({ ...base, partner2: C, shadow: true });
const shNone = compute({ ...base, shadow: true });
const shOther = compute({ ...base, partner2: { datetime: '1985-01-01T00:00', gender: 'female' }, shadow: true });
ok('第三方进影子盘指纹', shC.shadow.baseId !== shOther.shadow.baseId && shC.shadow.baseId !== shNone.shadow.baseId,
  `${shC.shadow.baseId} / ${shOther.shadow.baseId} / ${shNone.shadow.baseId}`);
eq('同三方同 ID', compute({ ...base, partner2: C, shadow: true }).shadow.baseId, shC.shadow.baseId);

// ── 面板：同一张表，两条渲染路径 ──
const KIT = fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8');
const box = { window: {}, console };
vm.runInNewContext(KIT, box, { filename: 'panel-kit.js' });
const PP = box.window.__PP;
const html = PP.hepanHTML(trio);
ok('八字合盘渲染三方表', html.includes('mp-hp-triple'), html.slice(0, 200));
eq('表里三行', (html.match(/<tr><th scope="row">/g) || []).length, 3);
ok('表头列出一对与契合度', html.includes('>一对<') && html.includes('>契合度<'));
ok('表里有第三方', html.includes('第三方'));
ok('表里注明不合成总分', html.includes('不合成「三人总分」'));
ok('没有三方就不画表', !PP.hepanHTML(plain).includes('mp-hp-triple'));
const zwH = PP.ziweiHepanHTML(zw);
ok('紫微合盘也有三方表', zwH.includes('mp-hp-triple') && zwH.includes('第三方'));
const tieHtml = PP.hepanHTML({ ...trio, triple: near });
ok('接近时写「不排名」', tieHtml.includes('不排名'), tieHtml.slice(-400));
const xss = PP.hepanHTML({
  ...trio,
  triple: {
    pairs: [
      { key: 'a-b', a: '<img src=x>', b: '对方', total: 60, level: '<b>', dimensions: [{ key: 'k', label: '<i>', score: 1 }] },
      { key: 'a-c', a: '你', b: '第三方', total: 62, level: '中等', dimensions: [{ key: 'k', label: '日主', score: 2 }] },
      { key: 'b-c', a: '对方', b: '第三方', total: 61, level: '中等', dimensions: [{ key: 'k', label: '日主', score: 3 }] },
    ],
    best: { key: 'a-c', a: '你', b: '第三方', total: 62 }, hardest: { key: 'a-b', a: '<img src=x>', b: '对方', total: 60 },
    spread: 2, focus: { key: 'k', label: '<script>', spread: 2 }, note: '<em>注</em>',
  },
});
ok('三方表转义姓名与说明',
  !xss.includes('<img') && !xss.includes('<script') && !xss.includes('<em>') && xss.includes('&lt;img src=x&gt;'), xss.slice(0, 500));

// ── 接线：面板 / 独立页 / 模板 ──
const APP = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
const UI = fs.readFileSync(new URL('../src/web-ui.js', import.meta.url), 'utf8');
const TPL = fs.readFileSync(new URL('../tools/build-html.mjs', import.meta.url), 'utf8');
const HOST = fs.readFileSync(new URL('../index.js', import.meta.url), 'utf8');
ok('面板传 partner2', APP.includes('args.partner2'));
ok('面板有第三方开关', APP.includes('三方合盘（加入第三人）') && APP.includes('thirdOn'));
ok('独立页传 partner2', UI.includes('args.partner2') && UI.includes("el('h3on')"));
ok('独立页模板有第三人字段', TPL.includes('id="p2date"') && TPL.includes('id="h3on"'));
ok('宿主 schema 暴露 partner2', HOST.includes('partner2:') && HOST.includes("仅 hepan 使用"));
