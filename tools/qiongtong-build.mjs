// 生成 engine/qiongtong.js：把《穷通宝鉴》120 格（10 天干 × 12 月令）整理成数据表。
// 输入：tools/_qt2.json（tools/qiongtong-scrape.mjs 抓取的 113 章原文）
// 输出：engine/qiongtong.js
// 用神顺序来源：https://knowyourbazi.com/zh-hans/qiongtong/ 的整理表（每格首选在前）
// 原文摘句来源：https://www.luckclub.cn/bazi/004/（《穷通宝鉴》原文，public domain）
import fs from 'node:fs';

const MONTHS = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
const BRANCH = ['寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑'];
const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

// 用神表：寅..丑（来源见上，首个为首选）
const TABLE = {
  甲: '丙癸|庚丙丁戊己|庚丁壬|癸丁庚|癸丁庚|丁庚癸|庚丁壬|丁丙庚|庚甲丁壬癸|庚丁丙戊|丁庚丙|丁庚丙',
  乙: '丙癸|丙癸|癸丙戊|癸|癸丙|癸丙|丙癸己|癸丙丁|癸辛|丙戊|丙|丙',
  丙: '壬庚|壬己|壬甲|壬癸庚|壬庚|壬庚|壬戊|壬癸|甲壬|甲戊庚壬|壬戊己|壬甲',
  丁: '甲庚|庚甲|甲庚|甲庚|壬庚癸|甲壬庚|甲庚丙戊|甲庚丙戊|甲庚戊|甲庚|甲庚|甲庚',
  戊: '丙甲癸|丙甲癸|甲丙癸|甲丙癸|壬甲丙|癸丙甲|丙癸甲|丙癸|甲丙癸|甲丙|丙甲|丙甲',
  己: '丙庚甲|甲癸丙|丙癸甲|癸丙|癸丙|癸丙|丙癸|丙癸|甲丙癸|丙甲戊|丙甲戊|丙甲戊',
  庚: '戊甲壬丙丁|丁甲庚丙|甲丁壬癸|壬戊丙丁|壬癸|丁甲|丁甲|丁甲丙|甲壬|丁丙|丁甲丙|丙丁甲',
  辛: '己壬庚|壬甲|壬甲|壬甲癸|壬己癸|壬庚甲|壬甲戊|壬甲|壬甲|壬丙|丙戊壬甲|丙壬戊己',
  壬: '庚丙戊|戊辛庚|甲庚|壬辛庚癸|癸庚辛|辛甲|戊丁|甲庚|甲丙|戊丙庚|戊丙|丙丁甲',
  癸: '辛丙|庚辛|丙辛甲|辛|庚辛壬癸|庚辛壬癸|丁|辛丙|辛甲壬癸|庚辛戊丁|丙辛|丙丁',
};

// 章节号 → 月份索引（合章共用原文；总论章不取）
const CH = {
  甲: { 2: [0], 3: [1], 4: [2], 5: [3], 6: [4, 5], 7: [6], 8: [7], 9: [8], 10: [9], 11: [10], 12: [11] },
  乙: { 13: [0], 14: [1], 15: [2], 16: [3], 17: [4], 18: [5], 19: [6], 20: [7], 21: [8], 22: [9], 23: [10], 24: [11] },
  丙: { 25: [0], 26: [1], 27: [2], 28: [3], 29: [4], 30: [5], 31: [6], 32: [7], 33: [8], 34: [9], 35: [10], 36: [11] },
  丁: { 37: [0], 38: [1], 39: [2], 40: [3], 41: [4], 42: [5], 43: [6], 44: [7, 8], 45: [9], 46: [10, 11] },
  戊: { 48: [0, 1], 49: [2], 50: [3], 51: [4], 52: [5], 53: [6], 54: [7], 55: [8], 56: [9], 57: [10, 11] },
  己: { 58: [0], 59: [1], 60: [2], 61: [3, 4, 5], 62: [6, 7, 8], 63: [9, 10, 11] },
  庚: { 65: [0], 66: [1], 67: [2], 68: [3], 69: [4], 70: [5], 71: [6], 72: [7], 73: [8], 74: [9], 75: [10], 76: [11] },
  辛: { 77: [0], 78: [1], 79: [2], 80: [3], 81: [4], 82: [5], 83: [6], 84: [7], 85: [8], 86: [9], 87: [10], 88: [11] },
  壬: { 90: [0], 91: [1], 92: [2], 93: [3], 94: [4], 95: [5], 96: [6], 97: [7], 98: [8], 99: [9], 100: [10], 101: [11] },
  癸: { 102: [0], 103: [1], 104: [2], 105: [3], 106: [4], 107: [5], 108: [6], 109: [7], 110: [8], 111: [9], 112: [10], 113: [11] },
};

const chapters = JSON.parse(fs.readFileSync('./tools/_qt2.json', 'utf8'));
const byN = Object.fromEntries(chapters.map((c) => [String(c.n).padStart(3, '0'), c]));
const isYuanWen = (s) => !/^徐乐吾/.test(s) && !/^白话/.test(s) && s.length > 8 && !/^[（(]/.test(s);

const data = {};
const notes = [];
for (const stem of STEMS) {
  const cells = TABLE[stem].split('|');
  const arr = [];
  for (const [nStr, idxs] of Object.entries(CH[stem])) {
    const ch = byN[String(nStr).padStart(3, '0')];
    const text = (ch.lines || []).join('\n');
    const yuan = (ch.lines || []).filter(isYuanWen);
    const quote = (yuan[0] || ch.title).replace(/\s+/g, '').slice(0, 96);
    const seen = [];
    for (const c of quote) if (STEMS.includes(c) && c !== stem && !seen.includes(c)) seen.push(c);
    for (const i of idxs) {
      const yong = [...cells[i]];
      const unsupported = yong.filter((y) => !text.includes(y));
      const entry = {
        b: BRANCH[i],
        m: MONTHS[i],
        y: yong.join(''),
        q: quote,
        ch: Number(ch.n),
        qs: seen.join(''),
      };
      if (unsupported.length) {
        entry.note = `原文全章未见「${unsupported.join('、')}」，此格按整理表录入，待以善本核对`;
        notes.push(`${stem}${BRANCH[i]} 缺 ${unsupported.join('')}`);
      }
      arr.push(entry);
    }
  }
  data[stem] = arr;
}

const header = `// 《穷通宝鉴》120 格（十天干 × 十二月令）——用神顺序 + 原文摘句
// 数据来源：
//   · 用神顺序：knowyourbazi.com 整理表（每格首选在前；甲木巳午未酉、辛金亥子丑依原文核对）
//   · 原文摘句：luckclub.cn《穷通宝鉴》（public domain），取每章首段原文，去掉「徐乐吾曰」评注
// 口径说明：各版本原文有异文；用神顺序是整理表口径，原文摘句照录供核对；
//   qs 是「原文首段依次提到的天干」（去掉日主本身），与表首不同处可对照阅读。
// 本文件由 tools/qiongtong-build.mjs 生成，请勿手改。

export const QT_BRANCHES = ${JSON.stringify(BRANCH)};
export const QT_MONTHS = ${JSON.stringify(MONTHS)};
export const QT_BASE_URL = 'https://www.luckclub.cn/bazi/004/';
export const QT_NOTE = '用神顺序据通行整理表，原文摘句照录；各版本有异文，按条目 note 标注待核处。';

export const QT = ${JSON.stringify(data, null, 2)};

export function qtOf(dayStem, monthBranch) {
  const arr = QT[dayStem];
  if (!arr) return null;
  const i = QT_BRANCHES.indexOf(monthBranch);
  if (i < 0) return null;
  const e = arr[i];
  if (!e) return null;
  const yong = [...e.y];
  return {
    stem: dayStem,
    branch: e.b,
    month: e.m,
    yong,
    primary: yong[0] || null,
    quote: e.q,
    quoteStems: [...e.qs],
    chapter: e.ch,
    url: QT_BASE_URL + String(e.ch).padStart(3, '0') + '/',
    note: e.note || '',
    label: dayStem + '日生于' + e.m + '（' + e.m + e.b + '月）',
  };
}

export function qtLine(e) {
  if (!e) return '';
  return e.label + '：用神 ' + e.yong.join('、') + '（首取 ' + e.primary + '）';
}
`;

fs.mkdirSync('./engine', { recursive: true });
fs.writeFileSync('./engine/qiongtong.js', header, 'utf8');
console.log('entries', Object.values(data).reduce((a, b) => a + b.length, 0));
console.log('notes', notes.length, notes.join(' | '));
