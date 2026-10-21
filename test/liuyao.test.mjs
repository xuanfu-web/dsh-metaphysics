import { buildLiuyao, hexagramFromBits, HEXAGRAM_COUNT } from '../engine/liuyao.js';

const ok = (label, cond, extra = '') =>
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${label}${extra ? '  -> ' + extra : ''}`);

ok('六十四卦表完整', HEXAGRAM_COUNT === 64, String(HEXAGRAM_COUNT));

// 全阳 = 乾为天
const qian = buildLiuyao({ lines: [7, 7, 7, 7, 7, 7], dayGanZhi: { stem: '甲', branch: '子', name: '甲子' } });
ok('乾为天', qian.ben.name === '乾为天', qian.ben.name);
ok('  乾宫/金', qian.ben.palace === '乾宫' && qian.ben.palaceElement === '金', qian.ben.palace + qian.ben.palaceElement);
ok('  世6应3', qian.ben.shi === 6 && qian.ben.ying === 3, `${qian.ben.shi}/${qian.ben.ying}`);
ok('  纳甲 甲子/甲寅/甲辰/壬午/壬申/壬戌',
  qian.ben.lines.map((l) => l.ganzhi).join(',') === '甲子,甲寅,甲辰,壬午,壬申,壬戌',
  qian.ben.lines.map((l) => l.ganzhi).join(','));
ok('  六亲', qian.ben.lines.map((l) => l.liuqin).join(',') === '子孙,妻财,父母,官鬼,兄弟,父母',
  qian.ben.lines.map((l) => l.liuqin).join(','));
ok('  六神自初爻青龙', qian.ben.lines[0].liushen === '青龙', qian.ben.lines.map((l) => l.liushen).join(','));

// 全阴 = 坤为地
const kun = buildLiuyao({ lines: [8, 8, 8, 8, 8, 8], dayGanZhi: { stem: '壬', branch: '子', name: '壬子' } });
ok('坤为地', kun.ben.name === '坤为地', kun.ben.name);
ok('  纳甲 乙未/乙巳/乙卯/癸丑/癸亥/癸酉',
  kun.ben.lines.map((l) => l.ganzhi).join(',') === '乙未,乙巳,乙卯,癸丑,癸亥,癸酉',
  kun.ben.lines.map((l) => l.ganzhi).join(','));
ok('  六亲(土宫)', kun.ben.lines.map((l) => l.liuqin).join(',') === '兄弟,父母,官鬼,兄弟,妻财,子孙',
  kun.ben.lines.map((l) => l.liuqin).join(','));
ok('  壬日初爻玄武', kun.ben.lines[0].liushen === '玄武', kun.ben.lines.map((l) => l.liushen).join(','));

// 动爻变卦：初爻老阳 -> 天风姤
const gou = buildLiuyao({ lines: [9, 7, 7, 7, 7, 7], dayGanZhi: { stem: '甲', branch: '子', name: '甲子' } });
ok('本卦 乾为天', gou.ben.name === '乾为天', gou.ben.name);
ok('变卦 天风姤', gou.bian && gou.bian.name === '天风姤', gou.bian && gou.bian.name);
ok('动爻位置 [1]', JSON.stringify(gou.cast.movingPositions) === '[1]', JSON.stringify(gou.cast.movingPositions));

// 全部八宫本宫卦自检
const pure = {
  '111111': '乾为天', '110110': '兑为泽', '101101': '离为火', '100100': '震为雷',
  '011011': '巽为风', '010010': '坎为水', '001001': '艮为山', '000000': '坤为地',
};
for (const [bits, name] of Object.entries(pure)) {
  const arr = bits.split('').map((b) => (b === '1' ? 7 : 8));
  const r = buildLiuyao({ lines: arr, dayGanZhi: { stem: '甲', branch: '子', name: '甲子' } });
  ok(`本宫卦 ${name}`, r.ben.name === name, r.ben.name);
}

// 六十四卦唯一性：枚举所有 64 种静卦
const seen = new Set();
for (let mask = 0; mask < 64; mask++) {
  const bits = [];
  for (let i = 0; i < 6; i++) bits.push((mask >> i) & 1);
  seen.add(hexagramFromBits(bits).name);
}
ok('64 种爻组合映射到 64 个卦名', seen.size === 64, String(seen.size));
