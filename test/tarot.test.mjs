import { MAJOR, SUITS, MINOR, ROMAN, SPREADS, tarotDeck, drawTarot, tarotReading } from '../engine/tarot.js';

let fails = 0;
const ok = (label, cond, extra = '') => {
  if (!cond) fails++;
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${label}${extra ? '  -> ' + extra : ''}`);
};
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const KW = (s) => String(s || '').split(/\s+/).filter(Boolean);

const deck = tarotDeck();
const byName = new Map(deck.map((c) => [c.name, c]));

// ── 1) 78 张结构与顺序 ──
ok('牌库 78 张', deck.length === 78, String(deck.length));
ok('名称唯一', new Set(deck.map((c) => c.name)).size === 78, String(new Set(deck.map((c) => c.name)).size));
const majors = deck.filter((c) => c.arcana === '大阿卡纳');
const minors = deck.filter((c) => c.arcana === '小阿卡纳');
ok('大阿卡纳 22 张', majors.length === 22, String(majors.length));
ok('小阿卡纳 56 张（4×14）', minors.length === 56, String(minors.length));
ok('MAJOR 每项为 [名称, 罗马数字, 正位, 逆位]', MAJOR.every((m) => Array.isArray(m) && m.length === 4));
ok('MAJOR 顺序 = ROMAN 0..XXI', MAJOR.every((m, i) => m[1] === ROMAN[i]) && eq(MAJOR.map((m) => m[1]), ROMAN), MAJOR.map((m) => m[1]).join(','));
ok('牌库大牌顺序与 MAJOR 一致', eq(majors.map((c) => c.name), MAJOR.map((m) => m[0])), majors.map((c) => c.name).join('/'));
ok('大牌 number 为 0..XXI', majors.every((c, i) => c.number === ROMAN[i]), majors.map((c) => c.number).join(','));
ok('大牌档位 value 为 0..21', majors.every((c, i) => c.value === i));
ok('SUITS 4 项且各 14 张', SUITS.length === 4 && SUITS.every(([s]) => minors.filter((c) => c.suit === s).length === 14),
  SUITS.map(([s]) => `${s}:${minors.filter((c) => c.suit === s).length}`).join(' '));
ok('小牌全名 = 花色+牌阶且顺序沿用 MINOR', SUITS.every(([s]) => eq(minors.filter((c) => c.suit === s).map((c) => c.name), MINOR[s].map(([r]) => s + r))));

// ── 2) 每张牌字段：up/down、3-4 关键词、number、core、元素 ──
ok('每张牌 up/down 非空', deck.every((c) => KW(c.up).length > 0 && KW(c.down).length > 0));
ok('每张牌正位关键词 3-4 项', deck.every((c) => KW(c.up).length >= 3 && KW(c.up).length <= 4),
  deck.filter((c) => KW(c.up).length < 3 || KW(c.up).length > 4).map((c) => `${c.name}:${KW(c.up).length}`).join(','));
ok('每张牌逆位关键词 3-4 项', deck.every((c) => KW(c.down).length >= 3 && KW(c.down).length <= 4),
  deck.filter((c) => KW(c.down).length < 3 || KW(c.down).length > 4).map((c) => `${c.name}:${KW(c.down).length}`).join(','));
ok('每张牌 number 非空', deck.every((c) => typeof c.number === 'string' && c.number.length > 0));
ok('每张牌 core 非空', deck.every((c) => typeof c.core === 'string' && c.core.length > 0));
ok('元素取值在 火/水/风/土/灵 内', deck.every((c) => ['火', '水', '风', '土', '灵'].includes(c.element)),
  [...new Set(deck.map((c) => c.element))].join(','));
ok('大牌 core 长度 15-30 字', majors.every((c) => c.core.length >= 15 && c.core.length <= 30),
  majors.filter((c) => c.core.length < 15 || c.core.length > 30).map((c) => `${c.name}:${c.core.length}`).join(','));
ok('小牌带 suit/rank/value/rankCn', minors.every((c) => c.suit && c.rank && c.value >= 1 && c.value <= 14 && c.rankCn));
ok('小牌 number 为 A..10 或宫廷名', minors.every((c) => ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', '侍从', '骑士', '王后', '国王'].includes(c.number)));
ok('小牌档位数值 A=1..国王=14', (() => {
  const map = { A: 1, 侍从: 11, 骑士: 12, 王后: 13, 国王: 14 };
  return minors.every((c) => c.value === (map[c.number] || Number(c.number)));
})());
ok('小牌 domain 沿用 SUITS 领域', SUITS.every(([s, , domain]) => minors.filter((c) => c.suit === s).every((c) => c.domain === domain)));

// ── 3) drawTarot：张数、位名、正逆一致、关键词与该牌正/逆位一致 ──
const counts = [[1, 1], [3, 3], [5, 5], [2, 3], [4, 3], [0, 3], [7, 3]];
for (const [input, expect] of counts) {
  const r = drawTarot({ count: input, question: '这份工作要不要接？' });
  ok(`count=${input} → ${expect} 张`, r.cards.length === expect, String(r.cards.length));
  ok(`  count=${input} 位名 = SPREADS[${expect}]`, eq(r.cards.map((c) => c.position), SPREADS[expect].map((p) => p.name)),
    r.cards.map((c) => c.position).join('/'));
  ok(`  count=${input} 位义说明非空`, r.cards.every((c) => typeof c.positionHint === 'string' && c.positionHint.length > 0));
  ok(`  count=${input} spread 含全部位名`, SPREADS[expect].every((p) => r.spread.includes(p.name)), r.spread);
  ok(`  count=${input} upright 与 orientation 一致`, r.cards.every((c) => c.orientation === (c.upright ? '正位' : '逆位')));
  ok(`  count=${input} 每张含 position/name/arcana/element/keywords`, r.cards.every((c) =>
    c.position && c.name && c.arcana && c.element && Array.isArray(c.keywords)));
  ok(`  count=${input} keywords 与该牌正/逆位关键词一致`, r.cards.every((c) => {
    const src = byName.get(c.name);
    return src && eq(c.keywords, KW(c.upright ? src.up : src.down));
  }));
  ok(`  count=${input} system/castAt`, r.system === 'tarot' && typeof r.castAt === 'string' && r.castAt.length >= 10);
  ok(`  count=${input} 未给的 count 不产生 undefined 字段`, r.cards.every((c) => !Object.values(c).includes(undefined)));
  const names = new Set(r.cards.map((c) => c.name));
  ok(`  count=${input} 同一数组内不重复抽到同名牌`, names.size === r.cards.length);
}
ok('空 question → null', drawTarot({ count: 3 }).question === null);
ok('question 透传并 trim', drawTarot({ count: 1, question: '  要不要换城市  ' }).question === '要不要换城市');
ok('默认 count=3', drawTarot().cards.length === 3);
ok('at 传入即作 castAt', drawTarot({ count: 1, at: '2024-02-04T15:30' }).castAt === '2024-02-04 15:30');

// ── 4) reading：非空、提到每张牌名、免责声明、6-8 段、确定性 ──
const fixedCards = [
  { position: '过去', positionHint: '已经发生、仍在起作用的那部分', name: '愚者', arcana: '大阿卡纳', element: '风', number: '0', value: 0, core: byName.get('愚者').core, upright: false, orientation: '逆位', keywords: KW(byName.get('愚者').down) },
  { position: '现在', positionHint: '当下正在发生、你能直接触碰的局面', name: '星币八', arcana: '小阿卡纳', element: '土', domain: '现实与资源', suit: '星币', rank: '8', rankCn: '八', number: '8', value: 8, core: byName.get('星币八').core, upright: true, orientation: '正位', keywords: KW(byName.get('星币八').up) },
  { position: '未来', positionHint: '若维持当前走向，事情可能落到的位置', name: '权杖王后', arcana: '小阿卡纳', element: '火', domain: '行动与热情', suit: '权杖', rank: '王后', rankCn: '王后', number: '王后', value: 13, core: byName.get('权杖王后').core, upright: true, orientation: '正位', keywords: KW(byName.get('权杖王后').up) },
];
const q = '要不要接这份外地的offer？';
const read1 = tarotReading({ question: q, cards: fixedCards });
const read2 = tarotReading({ question: q, cards: fixedCards });
ok('reading 非空数组', Array.isArray(read1) && read1.length > 0, String(read1.length));
ok('reading 段数 6-8', read1.length >= 6 && read1.length <= 8, String(read1.length));
ok('reading 段均为非空字符串', read1.every((p) => typeof p === 'string' && p.trim().length > 0));
ok('reading 提到每张牌名', fixedCards.every((c) => read1.some((p) => p.includes(c.name))), fixedCards.map((c) => c.name).join('/'));
ok('reading 每张带位义说明', fixedCards.every((c) => read1.some((p) => p.includes(c.positionHint))));
ok('reading 含免责声明（镜子/专业人士）', read1.some((p) => p.includes('镜子') && p.includes('专业人士')));
ok('reading 含医疗/法律/财务提示', read1.some((p) => p.includes('医疗') && p.includes('法律') && p.includes('财务')));
ok('reading 含大牌占比（1/3 时走「不到半数」分支）', read1.some((p) => p.includes('大阿卡纳') && p.includes('不到半数')));
const majorHalfCards = [
  { position: '现状', positionHint: '眼下', name: '皇帝', arcana: '大阿卡纳', element: '火', upright: true, orientation: '正位', keywords: KW(byName.get('皇帝').up) },
  { position: '阻碍', positionHint: '卡点', name: '高塔', arcana: '大阿卡纳', element: '火', upright: false, orientation: '逆位', keywords: KW(byName.get('高塔').down) },
  { position: '建议', positionHint: '做法', name: '星币二', arcana: '小阿卡纳', element: '土', upright: true, orientation: '正位', keywords: KW(byName.get('星币二').up) },
];
const readHalf = tarotReading({ question: '要不要扩张？', cards: majorHalfCards });
ok('大牌 ≥ 半数时点出「主题层面的大事」', readHalf.some((p) => p.includes('主题层面的大事')));
ok('大牌 ≥ 半数时关键牌取第一张大牌', readHalf.some((p) => p.includes('关节') && p.includes('皇帝')));
ok('reading 含元素分布与宫廷牌/正逆位', read1.some((p) => p.includes('元素分布') && p.includes('宫廷牌') && p.includes('正逆位')));
ok('reading 指出关键牌（第一张大牌）', read1.some((p) => p.includes('关节') && p.includes('愚者')));
ok('reading 含 2-3 条建议', (() => {
  const adv = read1.filter((p) => p.startsWith('建议：'))[0] || '';
  return adv.includes('其一') && adv.includes('其二');
})());
ok('确定性：同样 cards 两次生成逐字相同', eq(read1, read2));
ok('确定性：与 question 无关的部分稳定（换问题牌面段仍一致）', (() => {
  const other = tarotReading({ question: '另一件事', cards: fixedCards });
  const body = (a) => a.filter((p) => !p.includes('你问的是') && !p.includes('没有具体提问')).join('\n');
  return body(read1) === body(other);
})());
ok('drawTarot 的 reading 等于对同一 cards 调 tarotReading', (() => {
  const r = drawTarot({ count: 3, question: '一致性检查' });
  return eq(r.reading, tarotReading({ question: r.question, cards: r.cards }));
})());

// ── 5) 各 count 的 reading 段数与牌名覆盖（不给固定牌，走真实抽牌）──
for (const [count, want] of [[1, 6], [3, 8], [5, 7]]) {
  const r = drawTarot({ count, question: '测试' });
  ok(`reading(count=${count}) 段数 ${want}`, r.reading.length === want, String(r.reading.length));
  ok(`  reading(count=${count}) 覆盖所有牌名`, r.cards.every((c) => r.reading.some((p) => p.includes(c.name))));
  ok(`  reading(count=${count}) 首段含提问`, r.reading[0].includes('测试'));
}
ok('reading(无牌) 给出兜底一句', tarotReading({ cards: [] }).length === 1);

// ── 6) 全为小牌 / 全为正位 的边界：关键牌回退逻辑不炸 ──
const minorUpright = [
  { position: '现在', positionHint: '当下', name: '圣杯二', arcana: '小阿卡纳', element: '水', upright: true, orientation: '正位', keywords: KW(byName.get('圣杯二').up) },
  { position: '未来', positionHint: '走向', name: '宝剑九', arcana: '小阿卡纳', element: '风', upright: true, orientation: '正位', keywords: KW(byName.get('宝剑九').up) },
];
const rm = tarotReading({ question: '', cards: minorUpright });
ok('全小牌 + 全正位仍出 6 段以上', rm.length >= 6, String(rm.length));
ok('全小牌时提示无大牌并给出参照', rm.some((p) => p.includes('关节') && (p.includes('没有大阿卡纳') || p.includes('参照'))));
ok('全正位时结构段不出现 NaN/undefined', rm.every((p) => !p.includes('NaN') && !p.includes('undefined')));

// 直接喂 4 张（非 drawTarot 产出的 1/3/5）也应稳定落在 6-8 段
const fourCards = [
  { position: '现状', positionHint: '眼下正在发生的事', name: '权杖四', arcana: '小阿卡纳', element: '火', upright: true, orientation: '正位', keywords: KW(byName.get('权杖四').up) },
  { position: '阻碍', positionHint: '卡住你的那一点', name: '圣杯七', arcana: '小阿卡纳', element: '水', upright: true, orientation: '正位', keywords: KW(byName.get('圣杯七').up) },
  { position: '建议', positionHint: '可以怎么做', name: '宝剑二', arcana: '小阿卡纳', element: '风', upright: false, orientation: '逆位', keywords: KW(byName.get('宝剑二').down) },
  { position: '结果', positionHint: '事情可能落到的地方', name: '星币十', arcana: '小阿卡纳', element: '土', upright: true, orientation: '正位', keywords: KW(byName.get('星币十').up) },
];
const r4 = tarotReading({ question: '四张测试', cards: fourCards });
ok('4 张手输牌面段数仍在 6-8', r4.length >= 6 && r4.length <= 8, String(r4.length));
ok('4 张手输牌面覆盖所有牌名', fourCards.every((c) => r4.some((p) => p.includes(c.name))));
ok('4 张手输牌面不出现 NaN/undefined', r4.every((p) => !p.includes('NaN') && !p.includes('undefined')));

// ── 7) 数据一致性兜底：牌阵表与导出 ──
ok('SPREADS 1/3/5 位置数与张数一致', [1, 3, 5].every((n) => SPREADS[n].length === n));
ok('SPREADS 每位都有 name 与 hint', [1, 3, 5].every((n) => SPREADS[n].every((p) => p.name && p.hint)));
ok('ROMAN 22 项且首尾正确', ROMAN.length === 22 && ROMAN[0] === '0' && ROMAN[21] === 'XXI');
ok('SUITS 每项为 4 元组', SUITS.every((s) => Array.isArray(s) && s.length === 4));
ok('MINOR 四个花色各 14 项', SUITS.every(([s]) => Array.isArray(MINOR[s]) && MINOR[s].length === 14));

console.log(fails === 0 ? '\n全部 PASS（FAIL 数 0）' : `\nFAIL 数：${fails}`);
