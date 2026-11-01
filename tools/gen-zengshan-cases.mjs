// 从《增删卜易》全文里解析卦例，产出 test/fixtures/zengshan-cases.json
//
// 为什么从古籍里取、而不是让用户提供：
//   应期对拍需要「起卦月建日辰 + 完整六爻 + 断语 + 应期口径 + 实际应验」五样齐，
//   这类样本在《增删卜易》里本来就是成批存在的（野鹤老人自己就是拿实占卦例成书）。
//   用户手里没有卦例不影响这件事，凭空编样本才是真问题。
//
// 收录标准（四条全过才收，任何一条不过都写进 excluded 并附理由）：
//   1. 起式能定位「X月Y日占某事」，月建、日辰齐全；
//   2. 卦体六爻能按行解析出六亲+地支+阴阳+动静；
//   3. 解析出的六爻与引擎纳甲（六亲/地支）逐爻完全一致——这一条同时充当解析正确性校验，
//      因为纳甲+六亲由卦宫五行唯一决定，六爻全对基本等于卦没错；
//   4. 断语里点明用神（「XX为用神」），且后文有可解析的实际应验时间。
//
// 用法：node tools/gen-zengshan-cases.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildLiuyao, hexagramFromBits } from '../engine/liuyao.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// 64 卦全名，供「原文缩写 → 候选卦」还原时用（与引擎同一份，不另建表）
const HEX_NAMES = (() => {
  const set = new Set();
  for (let b = 0; b < 64; b++) {
    set.add(hexagramFromBits(Array.from({ length: 6 }, (_, i) => (b >> i) & 1)).name);
  }
  return [...set];
})();
const SRC = path.join(ROOT, 'test', 'fixtures', 'citation-sources.json');
const OUT = path.join(ROOT, 'test', 'fixtures', 'zengshan-cases.json');
const BOOK_URL = 'https://zh.wikisource.org/wiki/增刪卜易';

const ZHI = '子丑寅卯辰巳午未申酉戌亥';
const GAN = '甲乙丙丁戊己庚辛壬癸';
const LIUQIN = '父母|兄弟|子孫|妻財|官鬼';
// 底本是繁体（妻財/子孫），引擎内部一律简体：不归一的话纳甲校验会把每条都判成不符
const LIUQIN_SIMPLE = { 父母: '父母', 兄弟: '兄弟', 子孫: '子孙', 妻財: '妻财', 官鬼: '官鬼' };
const simpLiuqin = (s) => LIUQIN_SIMPLE[s] || s;
// 六爻符号：⚊ 少阳、⚋ 少阴、○ 老阳（动）、ㄨ 老阴（动）
const SYM = { '⚊': 7, '⚋': 8, '○': 9, 'ㄨ': 6 };
const MONTH_NUM = { 正: '寅', 一: '寅', 二: '卯', 三: '辰', 四: '巳', 五: '午', 六: '未', 七: '申', 八: '酉', 九: '戌', 十: '亥', 十一: '子', 十二: '丑' };

const startRe = new RegExp(`([${ZHI}])月\\s*([${GAN}]?[${ZHI}])日\\s*[，,]?\\s*(?:占|卜|問|问)([^。﹖\\n]{0,30})`);
const lineRe = new RegExp(`(${LIUQIN})\\s*([${ZHI}])([金木水火土])\\s*([⚊⚋○ㄨ])\\s*(世|應|应)?`);
const pairRe = new RegExp(`得\\s*([\\u4e00-\\u9fa5]{1,4}?)\\s*(?:之|化|變|变)\\s*([\\u4e00-\\u9fa5]{1,4}?)\\s*卦?`);
const soloRe = new RegExp(`得\\s*([\\u4e00-\\u9fa5]{2,4}?)\\s*卦`);

/** 把卦体区域按行切开，每行只取本卦栏（原文一行两栏：左是本卦、右是变卦） */
function parseRows(seg) {
  const head = seg.slice(0, 600);
  let cut = head.length;
  for (const w of ['斷曰', '断曰', '此卦', '予曰', '余曰', '野鶴曰']) {
    const i = head.indexOf(w);
    if (i >= 0 && i < cut) cut = i;
  }
  const rows = [];
  for (const raw of head.slice(0, cut).split(/<br\s*\/?>|\n/)) {
    const row = raw.replace(/\u3000/g, ' ');
    const m = lineRe.exec(row) || lineRe.exec(row.replace(/^\s+/, ''));
    if (m) rows.push({ liuqin: simpLiuqin(m[1]), branch: m[2], element: m[3], value: SYM[m[4]], shiYing: m[5] || null });
  }
  return rows;
}

/** 断语里点名的用神。三种写法：
 *  ① 「寅木官星持世」「未土父母動化進神」——支+五行+六亲，最明确
 *  ② 「官鬼持世」——只给六亲，落世爻
 *  ③ 「亥水兄弟為用神」——老式写法
 *  取不到就返回 null，不猜。
 */
const LIUQIN_ALIAS = {
  官星: '官鬼', 官鬼: '官鬼', 官: '官鬼', 父母: '父母', 父: '父母',
  兄弟: '兄弟', 兄: '兄弟', 妻財: '妻财', 財: '妻财', 财: '妻财', 子孫: '子孙', 子: '子孙',
};
// 简写（父/兄/子/財/官）只有在紧跟「爻/動/化/臨/持世」时才算六亲，
// 否则「子日」「申金動」这类会被误判成子孙爻——宁可少收，不可错收。
const ALIAS_RE = '官星|官鬼|父母|兄弟|妻財|子孫|財|父|兄|子|官';
const ALIAS_TAIL = '(?=爻|動|动|化|臨|临|持世|旺|衰|空|破|伏|墓)';

function useGodOf(seg) {
  // 底本用繁体「爲/為」，判定用神前先归一，否则「亥水兄弟爲用神」一律漏掉
  const t = seg.replace(/<br\s*\/?>/g, '').replace(/[爲為]/g, '为');
  const at = t.search(/斷曰|断曰/);
  const d = at >= 0 ? t.slice(at) : t;

  // ⓪ 断语明说「X为用神」的最可信，先认它：别的句式可能只是顺带提到某个六亲
  let m = new RegExp(`([${ZHI}])[金木水火土](?:${ALIAS_RE})?为用神`).exec(d);
  if (m) return { branch: m[1], liuqin: null, raw: m[0] };

  m = new RegExp(`(${ALIAS_RE})为用神`).exec(d);
  if (m) return { branch: null, liuqin: LIUQIN_ALIAS[m[1]] || m[1], raw: m[0] };

  // ① 支 + 五行 + 六亲：「寅木官星持世」「未土父母動化進神」「巳火子動」
  m = new RegExp(`([${ZHI}])([金木水火土])(${ALIAS_RE})${ALIAS_TAIL}`).exec(d);
  if (m) return { branch: m[1], liuqin: LIUQIN_ALIAS[m[3]] || m[3], raw: m[0].trim() };

  // ② 六亲 + 持世：「官鬼持世」「財爻持世」
  m = new RegExp(`(${ALIAS_RE})爻?持世`).exec(d);
  if (m) return { branch: null, liuqin: LIUQIN_ALIAS[m[1]] || m[1], byShi: true, raw: m[0] };

  // ③ 世爻 + 支：「世爻寅木而值旬空」——明确以世为用
  m = new RegExp(`世爻([${ZHI}])`).exec(d);
  if (m) return { branch: m[1], liuqin: null, byShi: true, raw: m[0] };

  return null;
}

/** 应验句：从「果/后至/应在/及至」起，到本段末（只取第一处） */
function yanOf(seg) {
  const t = seg.replace(/<br\s*\/?>/g, '').replace(/\u3000/g, ' ');
  const m = /(果於|果于|果至|後至|后至|應在|应在|及至|後果|后果|果應|果应)/.exec(t);
  if (!m) return null;
  const rest = t.slice(m.index, m.index + 160);
  // 只取第一个句读：否则「果于X日…又至Y月」会被并成两支，等于自己放宽命中口径
  const cut = rest.search(/[。﹖]/);
  return cut > 0 ? rest.slice(0, cut + 1) : rest;
}

/** 从应验句里取实际应验的地支；数序月（七月）按正月建寅换算 */
function actualBranches(yan) {
  const out = [];
  if (!yan) return out;
  const re = new RegExp(`([${ZHI}])\\s*[年月日]`, 'g');
  let m;
  while ((m = re.exec(yan))) if (!out.includes(m[1])) out.push(m[1]);
  const num = /(十一|十二|十|正|[一二三四五六七八九])月/g;
  while ((m = num.exec(yan))) {
    const b = MONTH_NUM[m[1]];
    if (b && !out.includes(b)) out.push(b);
  }
  return out;
}

/** 应期口径原话：断语里「应于/定于/应在」那半句，留作人工复核 */
function yingqiWords(yan) {
  if (!yan) return '';
  const m = /[^。﹖]{0,20}(應在|应在|定於|定于|應於|应于|至)[^。﹖]{0,40}/.exec(yan);
  return m ? m[0].trim() : '';
}

const src = JSON.parse(fs.readFileSync(SRC, 'utf8'));
const text = src.chapters[BOOK_URL];
if (!text) throw new Error('底本里没有《增删卜易》全文，先跑 tools/fetch-citations 一类脚本');

const stars = [...text.matchAll(new RegExp(startRe.source, 'g'))];
const cases = [];
const excluded = [];
const stats = { 起式: stars.length, 卦体不全: 0, 纳甲不符: 0, 无用神: 0, 用神落位: 0, 无应验: 0, 变卦不符: 0 };

for (let i = 0; i < stars.length; i++) {
  const m = stars[i];
  const seg = text.slice(m.index, i + 1 < stars.length ? stars[i + 1].index : text.length);
  const month = m[1];
  const dayName = m[2];
  const zhan = m[3].trim();
  const head = m[0] + seg.slice(m[0].length);

  const rows = parseRows(seg).slice(0, 6);
  if (rows.length !== 6) { stats.卦体不全++; excluded.push({ month, day: dayName, zhan, reason: `卦体只解析出 ${rows.length} 爻` }); continue; }

  // 原文自上而下是上爻→初爻，装卦要自下而上
  const lines = rows.slice().reverse().map((r) => r.value);
  let built;
  try { built = buildLiuyao({ lines, dayGanZhi: { stem: dayName[0], branch: dayName[1] } }); }
  catch (e) { stats.纳甲不符++; excluded.push({ month, day: dayName, zhan, reason: `装卦失败：${e.message}` }); continue; }

  const mismatch = rows.slice().reverse().map((r, idx) => {
    const eng = built.ben.lines[idx];
    if (eng.liuqin === r.liuqin && eng.branch === r.branch && eng.element === r.element) return null;
    return `${idx + 1}爻 原文${r.liuqin}${r.branch}${r.element} vs 引擎${eng.liuqin}${eng.branch}${eng.element}`;
  }).filter(Boolean);
  if (mismatch.length) { stats.纳甲不符++; excluded.push({ month, day: dayName, zhan, reason: `纳甲不符（${mismatch.join('；')}）` }); continue; }

  // 变卦：原文给了名字就核对，对不上说明动爻标记或卦名解析有问题
  const pair = pairRe.exec(head.slice(0, 260));
  const solo = pair ? null : soloRe.exec(head.slice(0, 200));
  const sayBian = pair ? pair[2] : null;
  if (sayBian && built.bian) {
    const want = sayBian.replace(/[卦。]/g, '');
    const got = built.bian.name;
    const simplify = (s) => s.replace(/兌/g, '兑').replace(/訟/g, '讼').replace(/臨/g, '临')
      .replace(/隨/g, '随').replace(/節/g, '节').replace(/觀/g, '观').replace(/賁/g, '贲')
      .replace(/剝/g, '剥').replace(/復/g, '复').replace(/離/g, '离').replace(/謙/g, '谦')
      .replace(/蠱/g, '蛊').replace(/漸/g, '渐').replace(/歸/g, '归').replace(/豐/g, '丰')
      .replace(/渙/g, '涣').replace(/損/g, '损').replace(/恆/g, '恒').replace(/壯/g, '壮')
      .replace(/晉/g, '晋').replace(/過/g, '过').replace(/濟/g, '济').replace(/無/g, '无')
      .replace(/於/g, '于').replace(/為/g, '为').replace(/風/g, '风').replace(/澤/g, '泽')
      .replace(/雷/g, '雷').replace(/天/g, '天').replace(/地/g, '地').replace(/火/g, '火')
      .replace(/水/g, '水').replace(/山/g, '山');
    // 原文常缩写：写末字（「乾之夬」的夬即泽天夬）或写纯卦（「之兌」即兑为泽）。
    // 先把缩写还原成候选；候选不唯一（如「大」可指大过/大壮）就当「未能核验」，不硬判。
    const w = simplify(want);
    const PURE = { 乾: '乾为天', 兑: '兑为泽', 离: '离为火', 震: '震为雷', 巽: '巽为风', 坎: '坎为水', 艮: '艮为山', 坤: '坤为地' };
    const cands = new Set();
    for (const name of HEX_NAMES) if (name.endsWith(w) || name === w) cands.add(name);
    if (PURE[w]) cands.add(PURE[w]);
    const ambiguous = cands.size !== 1;
    if (!ambiguous && !cands.has(got)) {
      stats.变卦不符++;
      excluded.push({ month, day: dayName, zhan, reason: `变卦不符：原文「${want}」，引擎由动爻推得「${got}」` });
      continue;
    }
  }

  const useGod = useGodOf(seg);
  if (!useGod) { stats.无用神++; excluded.push({ month, day: dayName, zhan, reason: '断语未点名用神' }); continue; }

  // 把断语点名的用神落到具体爻位；落不下去（两现、卦中无此爻、六亲对不上）就排除，不替原文选
  const bl = built.ben.lines;
  let ug = null;
  if (useGod.byShi) {
    ug = bl.find((l) => l.position === built.ben.shi) || null;
    if (ug && useGod.branch && ug.branch !== useGod.branch) {
      stats.用神落位++; excluded.push({ month, day: dayName, zhan, reason: `断语说世爻${useGod.branch}，但卦上世爻是${ug.branch}` }); continue;
    }
    if (ug && useGod.liuqin && ug.liuqin !== useGod.liuqin) {
      stats.用神落位++; excluded.push({ month, day: dayName, zhan, reason: `断语说「${useGod.liuqin}持世」，但世爻是${ug.liuqin}` }); continue;
    }
  } else if (useGod.branch) {
    ug = bl.find((l) => l.branch === useGod.branch && (!useGod.liuqin || l.liuqin === useGod.liuqin)) || null;
    if (!ug) { stats.用神落位++; excluded.push({ month, day: dayName, zhan, reason: `断语所指「${useGod.raw}」在卦中找不到对应爻` }); continue; }
  } else if (useGod.liuqin) {
    const cand = bl.filter((l) => l.liuqin === useGod.liuqin);
    if (cand.length !== 1) { stats.用神落位++; excluded.push({ month, day: dayName, zhan, reason: `断语只说「${useGod.liuqin}」，卦中${cand.length}处，不替原文选` }); continue; }
    ug = cand[0];
  }
  if (!ug) { stats.用神落位++; excluded.push({ month, day: dayName, zhan, reason: '用神无法落位' }); continue; }

  const yan = yanOf(seg);
  const actual = actualBranches(yan);
  if (!actual.length) { stats.无应验++; excluded.push({ month, day: dayName, zhan, reason: '无「果/后至/应在」式应验，或应验句里没有年月日' }); continue; }

  cases.push({
    source: BOOK_URL,
    month,
    day: dayName,
    zhan,
    ben: built.ben.name,
    bian: built.bian ? built.bian.name : null,
    lines,
    movingPositions: built.cast.movingPositions,
    xunKong: built.xunKong,
    useGod: { position: ug.position, liuqin: ug.liuqin, branch: ug.branch, moving: Boolean(ug.moving), raw: useGod.raw },
    actual,
    yan: yan ? yan.replace(/\s+/g, ' ').trim() : '',
    yingqiWords: yingqiWords(yan),
  });
}

const out = {
  meta: {
    source: '《增删卜易》（维基文库全文本，本地缓存于 test/fixtures/citation-sources.json）',
    generator: 'tools/gen-zengshan-cases.mjs',
    policy: '五要素齐才收：月建日辰 / 六爻完整 / 纳甲逐爻相符 / 断语点名用神 / 有可解析的实际应验。任何一条不过都进 excluded 并写理由，不静默丢弃。',
    caution: '原文自语自证：应验是野鹤老人自己记的，不是第三方核实。对拍衡量的是「引擎的触发支集合是否覆盖原文所记应验支」，不等于预测能力。',
    stats,
    accepted: cases.length,
    excluded: excluded.length,
  },
  cases,
  excluded,
};

fs.writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n', 'utf8');
console.log(`起式 ${stats.起式}｜收录 ${cases.length}｜排除 ${excluded.length}`);
console.log(JSON.stringify(stats, null, 0));
