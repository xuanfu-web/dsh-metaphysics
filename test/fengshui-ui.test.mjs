// 风水结果卡：八宅八向 / 门主灶 / 玄空九宫 的方位网格。
//
// 面板（React）与独立页共用 panel-kit 的同一份渲染，所以在这里直接跑渲染层：
//   1. 玄空：九宫顺序、每宫运/山/向三数、当运高亮、表法与合十事实；
//   2. 八宅：八向格、四吉四凶、年紫白；门主灶：宅卦、四项布局、命宅配；
//   3. 转义：布局文案与宅卦名被污染时不能变成标签；
//   4. 接线：侧栏（app.js）与独立页（web-ui.js）都走 fengshuiHTML，主按钮文案为「看结果」。
import fs from 'node:fs';
import vm from 'node:vm';
import { compute } from '../engine/index.js';
import { ok } from './_harness.mjs';

const sandbox = { window: {}, console };
vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
const PP = sandbox.window.__PP;

const cellsOf = (html) => (html.match(/<div class="mp-fs-cell/g) || []).length;
/** 八宅/门主灶的格子里只有八向有星，中宫留空：数星标而不是格子 */
const starsOf = (html) => (html.match(/<span class="mp-fs-star"/g) || []).length;
/** 取某一宫的格子切片：从宫名往前找 cell 起点，到下一个 cell 或九宫格结束为止 */
const cellOf = (html, gua) => {
  const at = html.indexOf(`<span class="mp-fs-gua">${gua}</span>`);
  if (at < 0) return '';
  const from = html.lastIndexOf('<div class="mp-fs-cell', at);
  const next = html.indexOf('<div class="mp-fs-cell', at);
  const stop = next >= 0 ? next : html.indexOf('</div></div>', at);
  return html.slice(from, stop > from ? stop : undefined);
};

// ── ① 玄空 9 运 子午：九宫顺序、三数、高亮、事实 ─────────────────
const xk = compute({ system: 'fengshui', action: 'xuankong', period: 9, sitting: '子', facing: '午' });
const h = PP.fengshuiHTML(xk);
ok('风水卡是 section.mp-quick.mp-fs', /^<section class="mp-quick mp-fs"[^>]*aria-label="风水结果"/.test(h), h.slice(0, 80));
ok('卡片标题与运、坐向', h.includes('<b>玄空下卦</b>') && h.includes('9运 · 坐子山（罗盘 0°） · 向午山（罗盘 180°）'));
ok('九宫格 9 个格', cellsOf(h) === 9, String(cellsOf(h)));
const order = [...h.matchAll(/<span class="mp-fs-gua">(.)<\/span>/g)].map((m) => m[1]).join('');
ok('九宫按后天八卦排布', order === '巽离坤震中兑艮坎乾', order);
ok('每宫三数共 27 个', (h.match(/title="[运山向]星 \d"/g) || []).length === 27, String((h.match(/title="[运山向]星 \d"/g) || []).length));
const kan = cellOf(h, '坎');
ok('坎宫三数 5/9/9', /title="运星 5"[\s\S]*title="山星 9"[\s\S]*title="向星 9"/.test(kan));
ok('坎宫两枚当运高亮', (kan.match(/class="on"/g) || []).length === 2, kan);
ok('全盘高亮三处（中宫运9 + 山9 + 向9）', (h.match(/ class="on"/g) || []).length === 3, String((h.match(/ class="on"/g) || []).length));
ok('入中与顺逆写在卡上', h.includes('山盘 5五黄 · 逆飞') && h.includes('向盘 4四绿 · 顺飞') && h.includes('五黄入中'));
ok('当运落宫写成方位', h.includes('山星9落 坎宫正北；向星9落 坎宫正北'));
ok('合十列出向星艮、山星无', h.includes('山星：无；向星：艮'));
ok('盘面与表法两个 chip 各表各的', h.includes('盘面：未到山到向') && h.includes('表法：未列'));
ok('表法写明本运无局', h.includes('本运表法无局。'));
ok('玄空免责声明在卡内', h.includes('玄空下卦为传统通行口径'));

// ── ② 玄空 8 运 乾巽：到山到向、表法在列、两处高亮 ────────────────
const xk8 = compute({ system: 'fengshui', action: 'xuankong', period: 8, sitting: '乾', facing: '巽' });
const h8 = PP.fengshuiHTML(xk8);
ok('8运乾巽 盘面到山到向', /\>盘面：到山到向</.test(h8) && /mp-fs-chip ok">盘面：到山到向/.test(h8));
ok('8运乾巽 表法在列', h8.includes('表法：在列') && h8.includes('本运所列：乾巽、亥巳、丑未。'));
ok('8运乾巽 山星8落乾、向星8落巽', h8.includes('山星8落 乾宫西北') && h8.includes('向星8落 巽宫东南'));
ok('8运乾巽 全盘高亮三处（中宫运8 + 山8 + 向8）', (h8.match(/ class="on"/g) || []).length === 3, String((h8.match(/ class="on"/g) || []).length));
ok('8运乾巽 表法说明与盘面一致', h8.includes('盘面与表法一致：本局到山到向。'));

// ── ③ 八宅命卦：八向格、四吉四凶、年紫白 ─────────────────────────
const natal = compute({ system: 'fengshui', datetime: '1990-05-12T14:30', gender: 'female' });
const hn = PP.fengshuiHTML(natal);
ok('命卦标题与结论', hn.includes('<b>八宅命卦</b>') && hn.includes('8艮（西四命）· 东北'));
ok('宜忌 chip 不叠字', hn.includes('宜西四宅（坐乾坤艮兑）') && !hn.includes('宜宜'));
ok('八宅八向 8 个星格（中宫留空）', starsOf(hn) === 8 && cellsOf(hn) === 9, `${starsOf(hn)}/${cellsOf(hn)}`);
ok('八向顺序仍是后天八卦', [...hn.matchAll(/<span class="mp-fs-gua">(.)<\/span>/g)].map((m) => m[1]).join('') === '巽离坤震中兑艮坎乾');
ok('坤宫为生气·吉', cellOf(hn, '坤').includes('生气') && cellOf(hn, '坤').includes('>吉<'));
ok('兑宫为延年·吉', cellOf(hn, '兑').includes('延年'));
ok('乾宫为天医·吉', cellOf(hn, '乾').includes('天医'));
ok('四吉四凶各四', (hn.match(/class="ok">吉/g) || []).length === 4 && (hn.match(/class="bad">凶/g) || []).length === 4);
const natalY = compute({ system: 'fengshui', datetime: '1990-05-12T14:30', gender: 'female', fortuneYear: 2026 });
const hny = PP.fengshuiHTML(natalY);
ok('给流年时列出年紫白', hny.includes('<dt>年紫白</dt>') && hny.includes('一白入中'));
ok('未给流年时点明未算飞星', hn.includes('未算年紫白飞星'));

// ── ④ 门主灶：宅卦、四项布局、命宅配 ─────────────────────────────
const adv = compute({ system: 'fengshui', action: 'advise', sitting: '子', facing: '午' });
const ha = PP.fengshuiHTML(adv);
ok('门主灶标题与宅卦', ha.includes('<b>门主灶</b>') && ha.includes('坎宅 · 东四宅'));
ok('门主灶八向 8 格', starsOf(ha) === 8 && cellsOf(ha) === 9, `${starsOf(ha)}/${cellsOf(ha)}`);
ok('门/灶/床/厕四项都在', ['门', '灶', '床', '厕'].every((k) => ha.includes(`<dt>${k}</dt>`)));
ok('门的方向建议来自宅卦', ha.includes('门口') === false && ha.includes('门宜开于吉方'));
ok('未给生辰写明未做命宅配', ha.includes('未提供生辰'));
const advB = compute({
  system: 'fengshui', action: 'advise', sitting: '子', facing: '午',
  datetime: '1990-05-12T14:30', gender: 'female',
});
const hab = PP.fengshuiHTML(advB);
ok('给生辰时做命宅配', hab.includes('<dt>命宅配</dt>') && (hab.includes('命宅相配') || hab.includes('命宅不配')));

// ── ⑤ 转义：布局文案、宅卦名被污染都不能变成标签 ────────────────
const evil = JSON.parse(JSON.stringify(advB));
evil.layout.door = '<img src=x onerror=alert(1)>';
evil.meta.houseGua = '<script>alert(1)</script>';
const he = PP.fengshuiHTML(evil);
ok('布局文案被转义', !/<img/i.test(he) && he.includes('&lt;img'), he.slice(0, 80));
ok('宅卦名被转义', !/<script/i.test(he) && he.includes('&lt;script'));
ok('非风水结果退回 quickHTML', /^<section class="mp-quick"/.test(PP.fengshuiHTML({ system: 'star', summary: 'x' })));

// ── ⑥ 接线：两侧都走 fengshuiHTML；速查类主按钮叫「看结果」───────
const app = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
const web = fs.readFileSync(new URL('../src/web-ui.js', import.meta.url), 'utf8');
ok('侧栏接线 fengshuiHTML', /result\.kind === 'fengshui' \? PP\.fengshuiHTML\(result\.r\)/.test(app));
ok('独立页接线 fengshuiHTML', /tab === 'fengshui' \? window\.__PP\.fengshuiHTML\(r\)/.test(web));
ok('侧栏速查清单含风水', /const QUICK_TABS = \[[^\]]*'fengshui'[^\]]*\]/.test(app));
ok('速查类主按钮为看结果', /QUICK_TABS\.indexOf\(tab\) >= 0 \? '看结果'/.test(app));
ok('奇门主按钮为起局', /tab === 'qimen' \? '起局'/.test(app));
