// 六爻卦体关系：六冲卦 / 六合卦 / 伏吟 / 反吟
//
// 这一组断法以前是空白（面板只画卦、解释层把「反吟伏吟」列在「未纳入」里）。
// 现在按纳甲地支推导，并用 test/fixtures/classics.json 里 23 条带断语的卦例逐条对拍：
// 断语说「外卦反吟」，引擎就得标出外卦反吟；说「六冲卦变六冲」，引擎就得两个都标。
import fs from 'node:fs';
import { hexagramFromBits, hexBody, bodyRelations, bodyLabels, buildLiuyao } from '../engine/liuyao.js';
import { ok, eq } from './_harness.mjs';

const DAY = { stem: '甲', branch: '子', name: '甲子' };
const bitsOf = (mask) => Array.from({ length: 6 }, (_, i) => (mask >> i) & 1);
const lineValue = (a, b) => (a === b ? (a ? 7 : 8) : (a ? 9 : 6));

// 卦名 → 六爻（自下而上，1 = 阳），只从六十四卦表里取，不另外硬编码
const BY_NAME = new Map();
for (let mask = 0; mask < 64; mask++) {
  const bits = bitsOf(mask);
  BY_NAME.set(hexagramFromBits(bits).name, bits);
}
ok('六十四卦名索引齐全', BY_NAME.size === 64, String(BY_NAME.size));

/** 「本卦之变卦」→ 装卦结果 */
function castPair(combo) {
  const [a, b] = combo.split('之').map((s) => s.trim());
  const A = BY_NAME.get(a);
  const B = BY_NAME.get(b);
  if (!A || !B) return null;
  const lines = A.map((bit, i) => lineValue(bit, B[i]));
  return buildLiuyao({ lines, dayGanZhi: DAY });
}

// ── ① 六合卦：与《增删卜易》所列八卦完全一致 ──────────────────────
const HE_CLASSIC = ['天地否', '地天泰', '地雷复', '雷地豫', '山火贲', '水泽节', '泽水困', '火山旅'];
const heAll = [];
for (let mask = 0; mask < 64; mask++) {
  const h = hexagramFromBits(bitsOf(mask));
  if (hexBody(h).he) heAll.push(h.name);
}
eq('六合卦共八支', heAll.length, 8);
eq('六合卦名单与传世口径一致', heAll.slice().sort().join(','), HE_CLASSIC.slice().sort().join(','));

// ── ② 六冲卦：地支三组全冲，共十支（八纯 + 无妄 + 大壮）──────────
// 常见说法只认八纯卦；但按纳甲地支实配，天雷无妄（乾上震下 午申戌/子寅辰）
// 与雷天大壮（震上乾下）同样三组全冲，《增删卜易》卦例也把雷天大壮叫「六冲卦」。
const CHONG_PURE = ['乾为天', '兑为泽', '离为火', '震为雷', '巽为风', '坎为水', '艮为山', '坤为地'];
const chongAll = [];
for (let mask = 0; mask < 64; mask++) {
  const h = hexagramFromBits(bitsOf(mask));
  if (hexBody(h).chong) chongAll.push(h.name);
}
eq('六冲卦共十支', chongAll.length, 10);
eq('八纯卦全在六冲之列', CHONG_PURE.filter((n) => !chongAll.includes(n)).length, 0);
eq('天雷无妄、雷天大壮亦入六冲', ['天雷无妄', '雷天大壮'].filter((n) => !chongAll.includes(n)).length, 0);
ok('没有一支卦同时算六冲又算六合', chongAll.filter((n) => heAll.includes(n)).length === 0, chongAll.join(','));

const qian = hexBody(hexagramFromBits(bitsOf(63)));
eq('乾为天 三组六冲 子午/寅申/辰戌', JSON.stringify(qian.chongPairs), JSON.stringify([['子', '午'], ['寅', '申'], ['辰', '戌']]));
const fu = hexBody(hexagramFromBits(BY_NAME.get('地雷复')));
eq('地雷复 三组六合 子丑/寅亥/辰酉', JSON.stringify(fu.hePairs), JSON.stringify([['子', '丑'], ['寅', '亥'], ['辰', '酉']]));

// 重支的卦不能靠「相邻两爻」硬配
const xie = hexagramFromBits(BY_NAME.get('雷水解'));
eq('雷水解 有重支（午现两次）不判六冲', hexBody(xie).chong, false);
eq('雷水解 亦不判六合', hexBody(xie).he, false);

// ── ③ 伏吟：卦变了而地支没变；卦没变不算伏吟 ──────────────────────
const wuwang = castPair('天雷无妄之雷天大壮');
eq('无妄之雷天大壮 内卦伏吟', wuwang.body.fuYin.inner, true);
eq('无妄之雷天大壮 外卦伏吟', wuwang.body.fuYin.outer, true);
eq('无妄之雷天大壮 六爻皆伏吟', wuwang.body.yaoFuYin.join(','), '2,3,5,6');

const gou = castPair('天风姤之雷风恒');
eq('姤之恒 外卦伏吟', gou.body.fuYin.outer, true);
eq('姤之恒 内卦未变、不算伏吟', gou.body.fuYin.inner, false);

// 回归：卦没变（上卦还是离）时地支当然相同，这不是伏吟
const lv = castPair('离为火之火山旅');
eq('离之旅 卦未变者不算伏吟（内）', lv.body.fuYin.inner, false);
eq('离之旅 卦未变者不算伏吟（外）', lv.body.fuYin.outer, false);
eq('离之旅 断语「六冲处成六合」', bodyLabels(lv.body).join('|'), '六冲卦|变六合');

// ── ④ 反吟：两条路径要分得开 ────────────────────────────────────
// ①地支三爻全冲（坤丑亥酉 ↔ 巽未巳卯）
const lin = castPair('地泽临之风泽中孚');
eq('临之中孚 外卦反吟', Boolean(lin.body.fanYin.outer), true);
eq('临之中孚 反吟依据是地支全冲', JSON.stringify(lin.body.fanYin.outer.by), JSON.stringify(['chong']));

// ②后天八卦对冲（艮坤 / 巽乾 / 兑震）——地支并不相冲，只能按卦象判
const bo = castPair('山地剥之坤为地');
eq('剥之坤 外卦反吟（艮变坤）', Boolean(bo.body.fanYin.outer), true);
eq('剥之坤 反吟依据是卦象对冲', JSON.stringify(bo.body.fanYin.outer.by), JSON.stringify(['pair']));

const dui = castPair('兑为泽之震为雷');
eq('兑之震 内卦反吟', JSON.stringify(dui.body.fanYin.inner?.by), JSON.stringify(['pair']));
eq('兑之震 外卦反吟', JSON.stringify(dui.body.fanYin.outer?.by), JSON.stringify(['pair']));
eq('小畜之乾 外卦反吟（巽变乾，地支反成六合）', JSON.stringify(castPair('风天小畜之乾为天').body.fanYin.outer?.by), JSON.stringify(['pair']));

// 爻反吟：动爻变出的支回头冲本支
const bi = castPair('水地比之水风井');
eq('比之井 爻反吟在二、三爻', bi.body.yaoFanYin.join(','), '2,3');
eq('比之井 内卦反吟', Boolean(bi.body.fanYin.inner), true);

const kunbian = castPair('巽为风之坤为地');
eq('巽之坤 内外皆反吟', `${Boolean(kunbian.body.fanYin.inner)}/${Boolean(kunbian.body.fanYin.outer)}`, 'true/true');
eq('巽之坤 四爻全反吟', kunbian.body.yaoFanYin.join(','), '2,3,5,6');

// ── ⑤ 二十三支卦例对拍：断语怎么说，标签就得怎么标 ───────────────
const FIX = JSON.parse(fs.readFileSync(new URL('./fixtures/classics.json', import.meta.url), 'utf8'));
const EXPECT = {
  '离为火之坤为地': '六冲卦|变六冲',
  '水地比之水风井': '内卦反吟|爻反吟 2、3',
  '山地剥之坤为地': '变六冲|外卦反吟',
  '地泽临之风泽中孚': '外卦反吟|爻反吟 5、6',
  '风天小畜之乾为天': '变六冲|外卦反吟',
  '巽为风之地风升': '六冲卦|外卦反吟|爻反吟 5、6',
  '天雷无妄之雷天大壮': '六冲卦|变六冲|内卦伏吟|外卦伏吟|爻伏吟 2、3、5、6',
  '天雷无妄之乾为天': '六冲卦|变六冲|内卦伏吟|爻伏吟 2、3',
  '天风姤之雷风恒': '外卦伏吟|爻伏吟 5、6',
  '雷地豫之天地否': '六合卦|变六合|外卦伏吟|爻伏吟 5、6',
  '地雷复之火雷噬嗑': '六合卦',
  '雷风恒之雷地豫': '变六合|内卦反吟|爻反吟 2、3',
  '巽为风之天水讼': '六冲卦|外卦反吟',
  '离为火之火山旅': '六冲卦|变六合',
  '震为雷之雷火丰': '六冲卦',
  '雷天大壮之巽为风': '六冲卦|变六冲|内卦反吟',
  '雷天大壮之地天泰': '六冲卦|变六合',
  '巽为风之坤为地': '六冲卦|变六冲|内卦反吟|外卦反吟|爻反吟 2、3、5、6',
  '兑为泽之震为雷': '六冲卦|变六冲|内卦反吟|外卦反吟',
  '地雷复之雷地豫': '六合卦|变六合',
  '天地否之乾为天': '六合卦|变六冲',
  '天山遁之雷泽归妹': '外卦伏吟|爻伏吟 5、6',
  '地水师之风水涣': '外卦反吟|爻反吟 5、6',
};

let matched = 0;
let cases = 0;
for (const ex of FIX.boshizhengzong || []) {
  const quote = ex.quote || '';
  if (!/反吟|伏吟|六冲|六合/.test(quote)) continue;
  cases += 1;
  const expect = EXPECT[ex.name];
  if (!expect) {
    ok(`卦例「${ex.name}」在对拍表里`, false, '缺期望值');
    continue;
  }
  const r = castPair(ex.name);
  if (!r) {
    ok(`卦例「${ex.name}」可装卦`, false, '卦名解析失败');
    continue;
  }
  const got = bodyLabels(r.body).join('|');
  // 断语关键词必须全部出现在标签里，标签也必须与期望值逐字一致
  const kwOk = ['六冲', '六合', '反吟', '伏吟'].every((kw) => (quote.includes(kw) ? got.includes(kw) : true));
  const same = got === expect;
  if (same && kwOk) matched += 1;
  ok(`卦例 ${ex.name}`, same && kwOk, same ? (kwOk ? '' : `断语关键词未覆盖：${got}`) : `期望 ${expect}，实际 ${got}`);
}
eq('带卦体断语的卦例共 23 支', cases, 23);
eq('23 支卦例的卦体标签全部对上断语', matched, 23);

// ── ⑥ 静卦与无关系卦：不硬凑 ────────────────────────────────────
const quiet = buildLiuyao({ lines: [7, 8, 7, 8, 7, 8], dayGanZhi: DAY });
eq('静卦无变卦时 body.bian 为 null', quiet.body.bian, null);
eq('静卦没有反吟伏吟标签', bodyLabels(quiet.body).filter((l) => /反吟|伏吟/.test(l)).length, 0);
ok('伏吟/反吟的空数组是空数组而不是 undefined',
  Array.isArray(quiet.body.yaoFuYin) && Array.isArray(quiet.body.yaoFanYin) && quiet.body.yaoFuYin.length === 0,
  JSON.stringify(quiet.body.yaoFuYin));

// 全卦改朝换代：乾为天 变 震为雷（内外卦同时换成震，6 爻里动 4 爻），内外皆伏吟
const qianToZhen = castPair('乾为天之震为雷');
eq('乾之震 内外伏吟', `${qianToZhen.body.fuYin.inner}/${qianToZhen.body.fuYin.outer}`, 'true/true');
eq('乾之震 动爻全伏吟', qianToZhen.body.yaoFuYin.join(','), '2,3,5,6');
eq('乾之震 反吟不混进来', bodyLabels(qianToZhen.body).filter((l) => /反吟/.test(l)).length, 0);

// 无动爻时 bodyRelations 直接吃卦对象也能用
const bare = bodyRelations({ name: '乾为天', upper: '乾', lower: '乾' });
eq('不传变卦时也能算本卦六冲', bare.ben.chong, true);
eq('不传变卦时 bian 为 null', bare.bian, null);
