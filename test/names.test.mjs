// 起名：字库覆盖、逐字判定、未收录的落点、专属卡片。
// 重点防三件事：常用字大面积「未收录」、未收录字被偷偷猜五行、面板只有一段纯文本。
import fs from 'node:fs';
import vm from 'node:vm';
import { compute } from '../engine/index.js';
import { CHAR_LIB, buildName, assessName } from '../engine/name.js';
import { ok, eq } from './_harness.mjs';

const sandbox = { window: {}, console };
vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
const PP = sandbox.window.__PP;

// ── 一、字库：规模与去重 ───────────────────────────────────
eq('字库无重复字', new Set(CHAR_LIB.map((c) => c[0])).size, CHAR_LIB.length);
ok('字库已扩到 380 字以上', CHAR_LIB.length >= 380, CHAR_LIB.length);
ok('五行取值合法', CHAR_LIB.every((c) => ['木', '火', '土', '金', '水'].includes(c[1])));
ok('每条都有释义', CHAR_LIB.every((c) => typeof c[2] === 'string' && c[2].length >= 2));

// ── 二、用户报的那个名字：丰秋林 ────────────────────────────
const BY = new Map(CHAR_LIB.map((c) => [c[0], c[1]]));
eq('丰 已收录（火）', BY.get('丰'), '火');
eq('秋 已收录（金）', BY.get('秋'), '金');
eq('林 已收录（木）', BY.get('林'), '木');

const FQ = compute({ system: 'name', surname: '丰', givenName: '秋林', datetime: '1990-08-15T10:00', gender: 'male' });
ok('丰秋林 两字都查出五行', FQ.chars.every((c) => c.source === 'lib'), FQ.chars.map((c) => c.char + c.element));
ok('丰秋林 给出逐字合/不合喜用', FQ.chars.every((c) => typeof c.favorable === 'boolean'), FQ.chars);
ok('丰秋林 结论引用了喜用', /喜用/.test(FQ.verdict), FQ.verdict);
ok('丰秋林 文本逐字带来源与判定', /· 秋：金（字库）｜(合|不合)喜用｜/.test(FQ.summary), FQ.summary.split('\n')[1]);
ok('丰秋林 摘要不再出现「未推断五行」', !/未推断五行/.test(FQ.summary));

// ── 三、未收录：不猜，但给落点 ──────────────────────────────
const UN = compute({ system: 'name', surname: '李', givenName: '龘龘', datetime: '1990-08-15T10:00', gender: 'male' });
ok('未收录字标 none、element=未收录', UN.chars.every((c) => c.source === 'none' && c.element === '未收录'), UN.chars);
ok('未收录字不猜五行（不出现五行判定）', /未收录（不猜五行）｜不判/.test(UN.summary), UN.summary.split('\n')[1]);
ok('给了可替换的同喜用字', UN.chars.every((c) => c.suggest.length >= 2), UN.chars[0].suggest);
ok('建议字的五行都在喜用内', UN.chars[0].suggest.every((x) => UN.bazi.favorable.includes(x.element)), UN.chars[0].suggest.map((x) => x.element));
ok('未收录时结论说明没法判断', /没法判断合不合喜用/.test(UN.verdict), UN.verdict);
eq('未收录计数', UN.stats.unknown, 2);

// 用户自带五行：按他信的那派算，并标「用户指定」
const UE = compute({ system: 'name', surname: '李', givenName: '龘秋', datetime: '1990-08-15T10:00', gender: 'male', charElements: { 龘: '火' } });
eq('charElements 生效（龘=火）', UE.chars[0].element, '火');
eq('标为用户指定', UE.chars[0].source, 'user');
ok('用户指定后参与喜用判定', UE.chars[0].favorable === true, UE.chars[0]);
// 非法五行忽略，回到未收录
const UB = buildName({ surname: '李', givenName: '龘', charElements: { 龘: '金木水火土' } });
eq('非法 charElements 不采信', UB.chars[0].source, 'none');

// ── 四、无生辰：只做字义归类 ────────────────────────────────
const NB = assessName({ surname: '丰', givenName: '秋林' });
ok('无生辰时不下喜用判断', NB.chars.every((c) => c.favorable === null), NB.chars);
ok('无生辰时结论提示给生辰', /给出生年月日/.test(NB.verdict), NB.verdict);
ok('无生辰时不出现 suggest 落点', NB.chars.every((c) => !c.suggest || c.suggest.length === 0));

// ── 五、生成候选：字库扩大后仍全部落在喜用 ──────────────────
const GEN = compute({ system: 'name', action: 'generate', surname: '李', datetime: '1990-08-15T10:00', gender: 'male', limit: 6 });
eq('生成 6 个候选', GEN.candidates.length, 6);
ok('候选全部落在喜用五行', GEN.candidates.every((c) => c.chars.every((x) => GEN.bazi.favorable.includes(x.element))), GEN.candidates[0]);
ok('候选名不重复', new Set(GEN.candidates.map((c) => c.given)).size === GEN.candidates.length);

// ── 六、专属卡片：不再是 <pre> 纯文本 ──────────────────────
const html = PP.nameHTML(FQ);
ok('卡片容器 mp-nm', /class="mp-nm"/.test(html));
ok('逐字行 mp-nm-row', (html.match(/mp-nm-row/g) || []).length === 2, (html.match(/mp-nm-row/g) || []).length);
ok('五行 chip 带颜色类', /mp-nm-el wx-metal/.test(html) && /mp-nm-el wx-wood/.test(html));
ok('合喜用徽标', /mp-nm-fit (ok|no)/.test(html));
ok('结论与口径都在卡里', /喜用/.test(html) && /mp-nm-note/.test(html));
ok('大字号显示字', /mp-nm-ch">秋</.test(html));
const uhtml = PP.nameHTML(UN);
ok('未收录卡片给可换字', /mp-nm-sug/.test(uhtml) && /可换/.test(uhtml));
ok('卡片 null 安全', PP.nameHTML(null) === '');
const ghtml = PP.nameHTML(GEN);
ok('候选名也走卡片', /mp-nm-cand/.test(ghtml) && /mp-nm-c/.test(ghtml));

// ── 七、接线：app 与独立页都用 nameHTML ────────────────────
const app = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
const web = fs.readFileSync(new URL('../src/web-ui.js', import.meta.url), 'utf8');
ok('app 渲染 nameHTML', /result\.kind === 'name' \? PP\.nameHTML\(result\.r\)/.test(app));
ok('独立页渲染 nameHTML', /tab === 'name' \? window\.__PP\.nameHTML\(r\)/.test(web));
