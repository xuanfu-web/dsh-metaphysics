// 起名 · 五格剖象与音韵：康熙笔画表、81 数理、三才、机械音韵检查。
// 重点防三件事：笔画表与字库脱节、数理/外格算错、音韵「说查了其实没查」。
import fs from 'node:fs';
import vm from 'node:vm';
import { compute } from '../engine/index.js';
import { CHAR_LIB, wuge, phonetics, shuliOf, splitPinyin } from '../engine/name.js';
import { READING, SURNAME_STROKES, SURNAME_READING, DOUBLE_SURNAMES, SHULI_81 } from '../engine/name-data.js';
import { ok, eq } from './_harness.mjs';

// ── 一、数据表：读音/笔画与字库对齐 ─────────────────────────
const libChars = new Set(CHAR_LIB.map((c) => c[0]));
const rdChars = new Set(READING.map((x) => x[0]));
eq('READING 无重复字', rdChars.size, READING.length);
eq('字库每个字都有读音与笔画', [...libChars].filter((c) => !rdChars.has(c)).length, 0);
eq('READING 没有字库外的字', [...rdChars].filter((c) => !libChars.has(c)).length, 0);
ok('声调取值合法（1–4）', READING.every((x) => [1, 2, 3, 4].includes(x[2])));
ok('笔画取值合法（1–40）', READING.every((x) => Number.isInteger(x[3]) && x[3] >= 1 && x[3] <= 40));
ok('拼音只含小写字母', READING.every((x) => /^[a-z]+$/.test(x[1])));
// 复姓逐字的读音与单姓同表，笔画则记在 DOUBLE_SURNAMES 里——所以两种来源都算数
const dblChar = new Set(Object.keys(DOUBLE_SURNAMES).flatMap((k) => [...k]));
const orphan = Object.keys(SURNAME_READING).filter((k) => !(SURNAME_STROKES[k] > 0) && !dblChar.has(k));
eq('姓氏读音表都有笔画来源', orphan, []);
ok('复姓逐字笔画齐全', Object.entries(DOUBLE_SURNAMES).every(([k, v]) => v.s.length === 2 && [...k].length === 2 && v.s.every((n) => n > 0)));
eq('81 数理 1–81 共 81 条', SHULI_81.length, 82);
ok('数理水平都在三档内', SHULI_81.slice(1).every((x) => ['吉', '半吉', '凶'].includes(x[0])));
ok('数理名称非空', SHULI_81.slice(1).every((x) => typeof x[1] === 'string' && x[1].length >= 2));

// 康熙口径锚点：按繁体字形与偏旁本字计，不是简体笔画数
const STROKE_ANCHORS = { 静: 16, 涛: 18, 灵: 24, 兰: 23, 丰: 18, 书: 10, 画: 12, 云: 12, 风: 9, 阳: 17, 荣: 14, 宁: 14, 梓: 11, 涵: 12, 沐: 8, 宸: 10 };
const rdIdx = new Map(READING.map((x) => [x[0], x[3]]));
const badAnchor = Object.entries(STROKE_ANCHORS).filter(([c, n]) => rdIdx.get(c) !== n);
eq('康熙笔画锚点全部对上', badAnchor, []);
eq('王 4 画', SURNAME_STROKES['王'], 4);
eq('李 7 画', SURNAME_STROKES['李'], 7);
eq('张 11 画', SURNAME_STROKES['张'], 11);
eq('刘 15 画', SURNAME_STROKES['刘'], 15);
eq('陈 16 画', SURNAME_STROKES['陈'], 16);
eq('罗 20 画', SURNAME_STROKES['罗'], 20);
eq('郑 19 画', SURNAME_STROKES['郑'], 19);

// ── 二、81 数理：查表与超 81 回绕 ──────────────────────────
eq('81 取 81', shuliOf(81).num, 81);
eq('104 回绕到 24', shuliOf(104).num, 24);
eq('82 回绕到 2', shuliOf(82).num, 2);
eq('8 吉', shuliOf(8).level, '吉');
eq('30 半吉', shuliOf(30).level, '半吉');
eq('12 凶', shuliOf(12).level, '凶');
eq('回绕后按回绕数取断语', shuliOf(104).level, shuliOf(24).level);

// ── 三、五格：单姓双名 / 单姓单名 / 复姓 ───────────────────
const nums = (w) => w.rows.map((x) => x.strokes);
const LV = (w) => w.rows.map((x) => x.level);

const LZH = wuge('李', '梓涵');
ok('李梓涵 可算', LZH.available === true, LZH.reason);
eq('李梓涵 五格数', nums(LZH), [8, 18, 23, 13, 30]);
eq('李梓涵 五格吉凶', LV(LZH), ['吉', '吉', '吉', '吉', '半吉']);
eq('李梓涵 三才五行', LZH.sancai.elements, ['金', '金', '火']);
ok('李梓涵 三才说明写清关系', /天与人同、人与地被克/.test(LZH.sancai.text), LZH.sancai.text);
eq('单姓双名 天格 = 姓+1', LZH.rows[0].strokes, 8);
eq('单姓双名 外格 = 总−人+1', LZH.rows[3].strokes, 30 - 18 + 1);

const DZ = wuge('李', '梓');
eq('单姓单名 五格数', nums(DZ), [8, 18, 12, 2, 18]);
eq('单姓单名 外格固定 2', DZ.rows[3].strokes, 2);

const OY = wuge('欧阳', '沐宸');
ok('复姓 可算', OY.available === true, OY.reason);
eq('复姓标记', OY.surnameStyle, '复姓');
eq('欧阳沐宸 五格数', nums(OY), [32, 25, 18, 26, 50]);
eq('复姓 天格 = 两字和', OY.rows[0].strokes, 32);
eq('复姓 人格 = 姓末字+名首字', OY.rows[1].strokes, 17 + 8);

const OY1 = wuge('欧阳', '悦');
eq('复姓单名 外格 = 姓首字+1', OY1.rows[3].strokes, 16);
eq('复姓单名 地格 = 名+1', OY1.rows[2].strokes, 12);
eq('复姓单名 总格', OY1.rows[4].strokes, 43);

eq('三才按个位取五行', wuge('王', '沐宸').sancai.elements, ['土', '木', '金']);

// ── 四、缺笔画：不半算，指出缺哪个字 ───────────────────────
const MISS = wuge('司马', '相如');
eq('缺笔画 → available:false', MISS.available, false);
eq('缺笔画列出缺的字', MISS.missing, ['相', '如']);
ok('缺笔画说明怎么补', /strokeOverrides/.test(MISS.reason), MISS.reason);
eq('姓超两字 → 不算', wuge('爱新觉罗', '溥仪').available, false);
eq('姓不在表 → 不算', wuge('龘', '梓').available, false);
eq('没名 → 不算', wuge('李', '').available, false);

// 用户覆盖笔画：按他给的算，并标「用户指定」
const OV = wuge('禤', '沐宸', { 禤: 16 });
ok('strokeOverrides 让生僻姓可算', OV.available === true, OV.reason);
eq('覆盖后 天格 = 16+1', OV.rows[0].strokes, 17);
eq('覆盖字标为用户指定', OV.strokes[0].source, 'user');
eq('整体来源标为 mixed', OV.source, 'mixed');
eq('未覆盖的字仍标表内', OV.strokes[1].source, 'lib');

// ── 五、音韵：只报可数的事实 ───────────────────────────────
eq('zh 先按双字母声母切', splitPinyin('zhang'), { ini: 'zh', fin: 'ang' });
eq('y 按拼写当声母', splitPinyin('yan'), { ini: 'y', fin: 'an' });
eq('w 按拼写当声母', splitPinyin('wen'), { ini: 'w', fin: 'en' });
eq('零声母整段算韵母', splitPinyin('ou'), { ini: '', fin: 'ou' });

const P1 = phonetics('张竹桢');
ok('三字同声母被抓到', P1.issues.some((x) => x.type === 'initial' && /三字同声母 zh/.test(x.text)), P1.issues);
eq('三字同声母判拗口', P1.level, '拗口');
eq('声调序列按字给出', P1.tonePattern, '1-2-1');

const P2 = phonetics('李梓芷');
ok('全名同调被抓到', P2.issues.some((x) => x.type === 'tone' && /三声/.test(x.text)), P2.issues);
ok('相邻同韵母被抓到', P2.issues.filter((x) => x.type === 'final').length === 2, P2.issues);

const P3 = phonetics('王珊珊');
ok('叠字撞音被抓到', P3.issues.some((x) => x.type === 'same'), P3.issues);
ok('叠字只报一处', P3.issues.length === 1, P3.issues);

const P4 = phonetics('王沐宸');
eq('无冲突判顺口', P4.level, '顺口');
eq('顺口时没有 issues', P4.issues, []);
eq('音韵带逐字拼音与调', P4.chars.map((x) => `${x.py}${x.tone}`), ['wang2', 'mu4', 'chen2']);
eq('四字复姓也算', phonetics('欧阳沐宸').available, true);

const P5 = phonetics('李龘');
eq('缺读音 → available:false', P5.available, false);
eq('缺读音列出缺的字', P5.missing, ['龘']);

// ── 六、接线：compute 带上五格与本音韵 ─────────────────────
const A = compute({ system: 'name', surname: '李', givenName: '梓涵', datetime: '1990-08-15T10:00', gender: 'female' });
ok('结果里有 wuge', A.wuge && A.wuge.available === true);
ok('结果里有 phonetics', A.phonetics && A.phonetics.available === true);
ok('摘要印出五格与数理', /【五格】李7画＋梓11画＋涵12画｜天格8吉/.test(A.summary), A.summary.split('\n').find((l) => /五格/.test(l)));
ok('摘要印出三才', /三才 金金火/.test(A.summary));
ok('摘要印出音韵与声调', /【音韵】李li3 梓zi3 涵han2｜声调 3-3-2｜略拗/.test(A.summary), A.summary.split('\n').find((l) => /音韵/.test(l)));
ok('注释说明康熙口径', /康熙字典繁体笔画/.test(A.summary));
ok('注释说明音韵不做谐音', /不做语义谐音/.test(A.summary));

const A2 = compute({ system: 'name', surname: '李', givenName: '龘', datetime: '1990-08-15T10:00', gender: 'male' });
ok('缺笔画时摘要说清算不了', /【五格】.*没有康熙笔画数据/.test(A2.summary), A2.summary.split('\n').find((l) => /五格/.test(l)));

const A3 = compute({ system: 'name', surname: '禤', givenName: '沐宸', datetime: '1990-08-15T10:00', gender: 'male', strokeOverrides: { 禤: 16 } });
ok('compute 透传 strokeOverrides', A3.wuge.available === true && A3.wuge.rows[0].strokes === 17);

const G = compute({ system: 'name', action: 'generate', surname: '李', datetime: '1990-08-15T10:00', gender: 'male', limit: 6 });
eq('候选 6 个', G.candidates.length, 6);
ok('每个候选都带五格', G.candidates.every((c) => c.wuge && c.wuge.available === true), G.candidates.filter((c) => !c.wuge || !c.wuge.available));
ok('每个候选都带音韵', G.candidates.every((c) => c.phonetics && c.phonetics.available === true));
ok('候选排序把五格当参考', G.candidates.every((c) => c.wuge.rows.length === 5));
ok('生成注释交代排序口径', /五格/.test(G.summary), G.summary.split('\n').filter((l) => /五格/.test(l))[0]);

// 姓不在表时这一轮不按五格排序，也不编造
const G2 = compute({ system: 'name', action: 'generate', surname: '龘', datetime: '1990-08-15T10:00', gender: 'male', limit: 3 });
eq('姓没笔画时仍能给候选', G2.candidates.length, 3);
ok('姓没笔画时候选不带五格', G2.candidates.every((c) => !c.wuge || c.wuge.available === false));

// ── 七、专属卡片：五格格阵与音韵行都渲染出来 ───────────────
const sandbox = { window: {}, console };
vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
const PP = sandbox.window.__PP;

const html = PP.nameHTML(A);
ok('卡片有五格区块', /class="mp-nm-wu"/.test(html));
eq('五格五格数', (html.match(/mp-nm-wu-c /g) || []).length, 5);
ok('五格带吉凶类名', /mp-nm-wu-c is-ok/.test(html) && /mp-nm-wu-c is-half/.test(html));
ok('五格写明口径', /康熙笔画 · 通行本 81 数理/.test(html));
ok('三才行在卡里', /三才：金金火（/.test(html));
ok('音韵行与水平徽标', /class="mp-nm-ph"/.test(html) && /mp-nm-ph-lv warn/.test(html), html.slice(html.indexOf('mp-nm-ph')).slice(0, 200));
ok('音韵问题逐条列出', /mp-nm-ph-i/.test(html) && /同韵母 i/.test(html));
ok('拼音与声调都显示', /li3 zi3 han2/.test(html) && /声调 3-3-2/.test(html));

const h2 = PP.nameHTML(A2);
ok('算不了时说明原因', /这一版算不了/.test(h2) && /没有康熙笔画数据/.test(h2));
ok('算不了时音韵仍可显示（龘缺读音则说明）', /mp-nm-ph/.test(h2));

const h3 = PP.nameHTML(A3);
ok('用户指定笔画在卡里标注', /禤16（指定）/.test(h3), h3.slice(h3.indexOf('笔画：')).slice(0, 80));

// 评估也吃生辰：页面上填了出生信息就该按喜用判，而不是无声丢掉
const near = (src, marker, pat) => {
  const i = src.indexOf(marker);
  return i >= 0 && pat.test(src.slice(i, i + 300));
};
const web = fs.readFileSync(new URL('../src/web-ui.js', import.meta.url), 'utf8');
const app = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
ok('独立页把生辰留给起名评估', near(web, "el('givenname').value.trim()", /if \(!date \|\| !time\) delete args\.datetime/), web.slice(web.indexOf('givenname')).slice(0, 200));
ok('面板把生辰留给起名评估', near(app, 'givenName.trim()', /if \(!dt\.date \|\| !dt\.time\) delete args\.datetime/), app.slice(app.indexOf('givenName.trim()')).slice(0, 200));

const hg = PP.nameHTML(G);
ok('候选卡带五格计数', /五格 \d\/5 吉/.test(hg));
ok('候选卡带音韵水平', /(顺口|略拗|拗口)</.test(hg), hg.slice(0, 200));
