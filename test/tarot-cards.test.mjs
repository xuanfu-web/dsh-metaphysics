// 塔罗逐张库（engine/tarot-cards.js）：78 张的英文名、牌面图像、旬位/源质与逐张核心寓意。
// 这一版要防的三件事：
//  ① 小牌核心义不能退回「按牌阶套一句通用句」——56 张必须各是各的；
//  ② 旬位表是三源互核后手工裁定的口径（例：权杖四＝金星在白羊座第三旬，不是第一旬），
//     不能被「顺手按守护星补全」冲回去，所以钉了一批冻结锚点，并用独立的迦勒底旬主星表反查旬位标注；
//  ③ 宫廷牌在两派公开表里国王/王后对调，宁可留空也不许被自动补上一个星座。
import fs from 'node:fs';
import vm from 'node:vm';
import { compute } from '../engine/index.js';
import { SUITS, tarotDeck, tarotReading, TAROT_STATS } from '../engine/tarot.js';
import {
  CARD_ROWS, CARD_LIB, SUIT_SIGNS, DECAN_PLANETS, SEPHIROTH, DECAN_CN,
} from '../engine/tarot-cards.js';
import { buildEventPrompt } from '../engine/event-prompt.js';
import { ok, eq } from './_harness.mjs';

const deck = tarotDeck();
const isCourt = (n) => ['侍从', '骑士', '王后', '国王'].includes(n.slice(-2));
const suitOf = (n) => ['权杖', '圣杯', '宝剑', '星币'].find((s) => n.startsWith(s)) || '';
const rankOf = (n) => (suitOf(n) ? n.slice(suitOf(n).length) : '');
const RANK_NUM = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10 };
const CN = (s) => [...s].length;

// ── 一、规模与形状 ──
eq('逐张库 78 行', CARD_ROWS.length, 78);
ok('每行 8 列', CARD_ROWS.every((r) => Array.isArray(r) && r.length === 8));
ok('牌名唯一', new Set(CARD_ROWS.map((r) => r[0])).size === 78);
ok('牌库 78 张与逐张库同名同数', (() => {
  const a = new Set(CARD_ROWS.map((r) => r[0]));
  const b = new Set(deck.map((c) => c.name));
  return a.size === 78 && b.size === 78 && [...a].every((n) => b.has(n));
})(), deck.filter((c) => !CARD_LIB[c.name]).map((c) => c.name).join(','));
eq('大牌 22 行', CARD_ROWS.filter((r) => !r[2]).length, 22);
eq('小牌 56 行', CARD_ROWS.filter((r) => r[2]).length, 56);
ok('规模字段与行数自洽', [
  TAROT_STATS.total === 78, TAROT_STATS.major === 22, TAROT_STATS.minor === 56,
  TAROT_STATS.pipAstro === 36, TAROT_STATS.aceTree === 4, TAROT_STATS.courtNoAstro === 16,
  TAROT_STATS.majorAstro === 22, TAROT_STATS.withImg === 78, TAROT_STATS.withCore === 56,
].every(Boolean), JSON.stringify(TAROT_STATS));

// ── 二、英文名 / 图像 / 核心寓意 ──
ok('英文名齐全且是 ASCII', CARD_ROWS.every((r) => /^[A-Za-z][A-Za-z0-9 '-]*$/.test(r[1])),
  CARD_ROWS.filter((r) => !/^[A-Za-z][A-Za-z0-9 '-]*$/.test(r[1])).map((r) => r[0]).join(','));
ok('牌面图像 15-60 字', CARD_ROWS.every((r) => CN(r[6]) >= 15 && CN(r[6]) <= 60),
  CARD_ROWS.filter((r) => CN(r[6]) < 15 || CN(r[6]) > 60).map((r) => `${r[0]}:${CN(r[6])}`).join(','));
ok('图像不含断语词（预测/一定/必）', !CARD_ROWS.some((r) => /一定能|必定会|预言情/.test(r[6])));
ok('小牌核心寓意 8-30 字', CARD_ROWS.filter((r) => r[7]).every((r) => CN(r[7]) >= 8 && CN(r[7]) <= 30),
  CARD_ROWS.filter((r) => r[7] && (CN(r[7]) < 8 || CN(r[7]) > 30)).map((r) => `${r[0]}:${CN(r[7])}`).join(','));
ok('大牌核心由 MAJOR_EXT 承担（逐张库留空）', CARD_ROWS.filter((r) => !r[2]).every((r) => r[7] === ''));
const minorCores = CARD_ROWS.filter((r) => r[2]).map((r) => r[7]);
ok('56 张小牌核心互不相同', new Set(minorCores).size === 56,
  minorCores.filter((c, i) => minorCores.indexOf(c) !== i).join(','));
ok('核心义里没有旧的按牌阶通用句', !minorCores.some((c) => /一切刚被点燃|两股力量之间的平衡|接近满盈的临界/.test(c)));
ok('每张牌的花色元素与 SUITS 一致', SUITS.every(([s, el]) => CARD_ROWS.filter((r) => suitOf(r[0]) === s).every((r) => r[2] === el)));

// ── 三、数字牌旬位规则（花色→三分相、数字→旬）──
ok('三分相表每花色三个星座且互不重复', Object.values(SUIT_SIGNS).every((v) => v.length === 3 && new Set(v).size === 3));
ok('旬主星表每花色 9 项', Object.values(DECAN_PLANETS).every((v) => v.length === 9));
ok('十源质齐全且首尾正确', SEPHIROTH.length === 10 && SEPHIROTH[0].startsWith('Kether') && SEPHIROTH[9].startsWith('Malkuth'));
ok('2-10 的旬座 = 花色三分相的第 N 段', CARD_ROWS.filter((r) => r[5] >= 2 && r[5] <= 10).every((r) => {
  const s = suitOf(r[0]);
  return r[4] === SUIT_SIGNS[s][Math.floor((r[5] - 2) / 3)];
}), CARD_ROWS.filter((r) => r[5] >= 2 && r[5] <= 10 && r[4] !== SUIT_SIGNS[suitOf(r[0])][Math.floor((r[5] - 2) / 3)]).map((r) => r[0]).join(','));
ok('2-10 的旬主星 = 该花色旬表第 N 位', CARD_ROWS.filter((r) => r[5] >= 2 && r[5] <= 10).every((r) => {
  const s = suitOf(r[0]);
  return r[3] === DECAN_PLANETS[s][r[5] - 2];
}));
ok('旬位标注：同组三张各占该星座的一／二／三旬', CARD_ROWS.filter((r) => r[5] >= 2 && r[5] <= 10).every((r) =>
  CARD_LIB[r[0]].decan === DECAN_CN[(r[5] - 2) % 3]));
// 独立反查：手抄一份迦勒底连续旬序（白羊一旬起火星，其后按 土→木→火→日→金→水→月 轮下去），
// 用它给每张数字牌定出应有的旬位。上一版把标注按「二三四／五六七／八十」分组算，
// 于是 权杖三（太阳）也写成「白羊座第一旬」——第一旬的旬主是火星，牌面与标注自相矛盾。
const DECAN_LORDS = {
  白羊座: ['火星', '太阳', '金星'], 金牛座: ['水星', '月亮', '土星'], 双子座: ['木星', '火星', '太阳'],
  巨蟹座: ['金星', '水星', '月亮'], 狮子座: ['土星', '木星', '火星'], 处女座: ['太阳', '金星', '水星'],
  天秤座: ['月亮', '土星', '木星'], 天蝎座: ['火星', '太阳', '金星'], 射手座: ['水星', '月亮', '土星'],
  摩羯座: ['木星', '火星', '太阳'], 水瓶座: ['金星', '水星', '月亮'], 双鱼座: ['土星', '木星', '火星'],
};
const pips = CARD_ROWS.filter((r) => r[5] >= 2 && r[5] <= 10);
ok('每张数字牌的行星确是其星座某旬的旬主', pips.every((r) => DECAN_LORDS[r[4]].includes(r[3])),
  pips.filter((r) => !DECAN_LORDS[r[4]].includes(r[3])).map((r) => `${r[0]}:${r[3]}@${r[4]}`).join(','));
ok('旬位标注 = 该行星在其星座里实际所主的旬', pips.every((r) => {
  const d = DECAN_LORDS[r[4]].indexOf(r[3]);
  return CARD_LIB[r[0]].decan === DECAN_CN[d];
}), pips.filter((r) => CARD_LIB[r[0]].decan !== DECAN_CN[DECAN_LORDS[r[4]].indexOf(r[3])])
  .map((r) => `${r[0]}:标注${CARD_LIB[r[0]].decan}/实为${DECAN_CN[DECAN_LORDS[r[4]].indexOf(r[3])]}`).join(','));
ok('每花色三组各覆盖三旬且不重号', ['权杖', '圣杯', '宝剑', '星币'].every((s) => {
  const list = pips.filter((r) => r[0].startsWith(s));
  return [0, 1, 2].every((g) => new Set(list.filter((r) => Math.floor((r[5] - 2) / 3) === g).map((r) => CARD_LIB[r[0]].decan)).size === 3);
}));
ok('源质序 = 牌面数字（首牌 Kether，十牌 Malkuth）', CARD_ROWS.filter((r) => r[5]).every((r) =>
  CARD_LIB[r[0]].sephira === SEPHIROTH[r[5] - 1]));
ok('首牌：给源质但不落单一星座', CARD_ROWS.filter((r) => r[5] === 1).length === 4
  && CARD_ROWS.filter((r) => r[5] === 1).every((r) => !r[3] && !r[4]),
  CARD_ROWS.filter((r) => r[5] === 1).map((r) => r[0]).join(','));

// ── 四、宫廷牌：口径是「不给占星」，留空本身就是被检查的对象 ──
const courts = CARD_ROWS.filter((r) => isCourt(r[0]));
eq('宫廷牌 16 张', courts.length, 16);
ok('宫廷牌行星/星座/源质三列全空', courts.every((r) => r[3] === '' && r[4] === '' && r[5] === ''));
ok('宫廷牌都有牌位角色（不给星座也要能读）', deck.filter((c) => isCourt(c.name)).every((c) => c.role && c.astro === ''),
  deck.filter((c) => isCourt(c.name) && !c.role).map((c) => c.name).join(','));
ok('systemNote 写明宫廷牌不给占星（防止口径被悄悄改回）', /宫廷牌/.test(compute({ system: 'tarot', count: 1 }).systemNote));

// ── 五、大牌：行星与星座按守护星关系互核 ──
const DOMICILE = {
  白羊座: ['火星'], 金牛座: ['金星'], 双子座: ['水星'], 巨蟹座: ['月亮'], 狮子座: ['太阳'],
  处女座: ['水星'], 天秤座: ['金星'], 天蝎座: ['火星', '冥王星'], 射手座: ['木星'],
  摩羯座: ['土星'], 水瓶座: ['土星', '天王星'], 双鱼座: ['木星', '海王星'],
};
ok('22 张大牌行星与星座齐全', CARD_ROWS.filter((r) => !r[2]).every((r) => r[3] && r[4]));
ok('大牌的行星是其所配星座的守护星（传统或现代）',
  CARD_ROWS.filter((r) => !r[2]).every((r) => (DOMICILE[r[4]] || []).includes(r[3])),
  CARD_ROWS.filter((r) => !r[2] && !(DOMICILE[r[4]] || []).includes(r[3])).map((r) => `${r[0]}:${r[3]}@${r[4]}`).join(','));

// ── 六、冻结锚点：三源互核后手工裁定的对应，改错一条就红 ──
const ANCHORS = [
  ['权杖二', '火星在白羊座（第一旬）'], ['权杖四', '金星在白羊座（第三旬）'],
  ['权杖五', '土星在狮子座（第一旬）'], ['权杖七', '火星在狮子座（第三旬）'],
  ['权杖八', '水星在射手座（第一旬）'], ['权杖十', '土星在射手座（第三旬）'],
  ['圣杯二', '金星在巨蟹座（第一旬）'], ['圣杯四', '月亮在巨蟹座（第三旬）'],
  ['圣杯五', '火星在天蝎座（第一旬）'], ['圣杯九', '木星在双鱼座（第二旬）'],
  ['圣杯十', '火星在双鱼座（第三旬）'], ['宝剑二', '月亮在天秤座（第一旬）'],
  ['宝剑三', '土星在天秤座（第二旬）'], ['宝剑七', '月亮在水瓶座（第三旬）'],
  ['宝剑九', '火星在双子座（第二旬）'], ['宝剑十', '太阳在双子座（第三旬）'],
  ['星币二', '木星在摩羯座（第一旬）'], ['星币四', '太阳在摩羯座（第三旬）'],
  ['星币六', '月亮在金牛座（第二旬）'], ['星币八', '太阳在处女座（第一旬）'],
  ['星币十', '水星在处女座（第三旬）'],
  ['愚者', '天王星在水瓶座'], ['皇帝', '火星在白羊座'], ['教皇', '金星在金牛座'],
  ['命运之轮', '木星在射手座'], ['高塔', '火星在白羊座'], ['星星', '土星在水瓶座'],
  ['月亮', '木星在双鱼座'], ['审判', '冥王星在天蝎座'], ['世界', '土星在摩羯座'],
];
for (const [name, want] of ANCHORS) eq(`${name} 占星对应 = ${want}`, CARD_LIB[name].astro, want);
const EN_ANCHORS = { 权杖四: 'Four of Wands', 圣杯侍从: 'Page of Cups', 星币十: 'Ten of Pentacles', 女祭司: 'The High Priestess', 命运之轮: 'Wheel of Fortune' };
for (const [name, want] of Object.entries(EN_ANCHORS)) eq(`${name} 英文名`, CARD_LIB[name].en, want);
eq('权杖四 源质', CARD_LIB['权杖四'].sephira, 'Chesed（仁慈）');
eq('圣杯一 源质', CARD_LIB['圣杯一'].sephira, 'Kether（王冠）');
eq('星币十 源质', CARD_LIB['星币十'].sephira, 'Malkuth（国度）');
ok('锚点里的核心寓意不被改写', [
  CARD_LIB['权杖四'].core.includes('庆'), CARD_LIB['圣杯四'].core.includes('不肯'),
  CARD_LIB['星币八'].core.includes('重复'),
].every(Boolean), [CARD_LIB['权杖四'].core, CARD_LIB['圣杯四'].core, CARD_LIB['星币八'].core].join(' / '));

// ── 七、牌库与结果字段：逐张信息一路带到摘要、复制提问与面板 ──
const byName = new Map(deck.map((c) => [c.name, c]));
ok('每张牌都带 en 与 image', deck.every((c) => c.en && c.image));
ok('数字牌 astro 非空、首牌给源质句', [2, 5, 10].every((v) => byName.get(`权杖${['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'][v]}`).astro)
  && byName.get('圣杯一').astro.includes('Kether'));
const t = compute({ system: 'tarot', count: 5, question: '这件事要不要推进？', seed: 20261102 });
ok('抽牌结果每张带英文名与牌面', t.cards.every((c) => c.en && c.image), t.cards.map((c) => c.en).join(','));
ok('抽牌结果不带 undefined，宫廷牌也不塞空 astro 键', t.cards.every((c) =>
  !Object.values(c).includes(undefined) && !(isCourt(c.name) && 'astro' in c)),
  t.cards.map((c) => c.name).join('/'));
const sum = compute({ system: 'tarot', count: 3, seed: 7 });
const sumLines = sum.summary.split('\n');
ok('摘要每张牌一行正文 + 一行牌面', sum.cards.every((c) => {
  const i = sumLines.findIndex((l) => l.includes(`${c.name} [`));
  return i >= 0 && sumLines[i + 1] && sumLines[i + 1].includes('牌面：');
}), sumLines.slice(2, 5).join(' | '));
ok('摘要每行列出占星对应或牌位角色', sum.cards.every((c) => {
  const line = sumLines.find((l) => l.includes(`${c.name} [`));
  return line && (c.astro ? line.includes(c.astro) : line.includes(c.role));
}), sum.cards.map((c) => c.name).join('/'));
ok('人话总结里也带牌面与对应', (() => {
  const secs = (sum.brief && sum.brief.sections) || [];
  return secs.length > 0 && secs.every((s) => !s.t.includes('undefined'))
    && secs.some((s) => s.t.includes('牌面上') || s.t.includes('占星对应是') || s.t.includes('顶的是'));
})(), JSON.stringify(((sum.brief || {}).sections || [])[0] || null));
const read = tarotReading({ question: '要不要接', cards: [
  { position: '现状', name: '权杖四', upright: true, orientation: '正位', keywords: ['稳定', '庆祝'] },
  { position: '阻碍', name: '圣杯侍从', upright: false, orientation: '逆位', keywords: ['情绪化'] },
  { position: '结果', name: '愚者', upright: true, orientation: '正位', keywords: ['新开始'] },
] });
ok('解读逐张说出牌面图像', read.some((p) => p.includes('牌面上四根权杖搭成')));
ok('解读给出数字牌的占星位置', read.some((p) => p.includes('金星在白羊座')));
ok('宫廷牌没有星座时改说角色', read.some((p) => p.includes('顶的是「学徒与消息」')));
ok('大牌解读带行星星座', read.some((p) => p.includes('天王星在水瓶座')));
const promptCard = compute({ system: 'tarot', count: 3, seed: 11, question: '要不要搬家' });
const promptText = JSON.stringify(buildEventPrompt(promptCard));
ok('复制提问里带牌面与占星/角色', promptText.includes('牌面：')
  && promptCard.cards.every((c) => promptText.includes(c.astro || c.role)), promptText.slice(0, 80));
ok('复制提问里带逐张核心义', promptCard.cards.every((c) => promptText.includes(byName.get(c.name).core)),
  promptCard.cards.map((c) => c.name).join('/'));

// ── 八、面板渲染 ──
const sandbox = { window: { Engine: { compute } }, console };
vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
const PP = sandbox.window.__PP;
ok('渲染器加载', typeof PP.tarotHTML === 'function');
const html = PP.tarotHTML(compute({ system: 'tarot', count: 3, seed: 5, question: '渲染检查' }));
ok('面板渲染英文名', (html.match(/mp-tt-en/g) || []).length === 3, String((html.match(/mp-tt-en/g) || []).length));
ok('面板渲染牌面图像行', (html.match(/mp-tt-img/g) || []).length === 3);
ok('面板每张牌给出占星或角色', / · (土星|木星|火星|金星|水星|月亮|太阳|天王星|海王星|冥王星)在| · (学徒与消息|推进与风格|滋养与吸引|掌控与承担)/.test(html));
ok('面板样式随库一起进产物', html.includes('mp-tt-img') && /mp-tt-img\{/.test(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8')));

console.log(`  逐张库：${TAROT_STATS.withImg} 张有图像 / ${TAROT_STATS.pipAstro} 张有旬位 / ${TAROT_STATS.courtNoAstro} 张宫廷不给占星`);
