// 中国夏令时（1986–1991）校正：这六年春夏的出生证钟面时间比标准时拨快一小时，
// 不校正则时辰整档偏移、跨 00:00 还会带错日柱。这里守的是区间边界与「校正之外的话」。
//
// 换表当天有两个绕不开的钟面区间：起算日 02:00–02:59 那一年并不存在（钟从 02:00 跳到 03:00），
// 终止日 01:00–01:59 会走两遍。换算口径必须固定（可复现优先），但输入本身的歧义要讲清楚。
import { DST_SPANS, inDstSpan, dstAmbiguity, applyDst } from '../engine/dst.js';
import { buildBazi } from '../engine/bazi.js';
import { ok, eq } from './_harness.mjs';

const P = (y, m, d, h, mi) => ({ year: y, month: m, day: d, hour: h, minute: mi });

// ── ① 区间表 ────────────────────────────────────────────────
eq('夏令时只有 1986–1991 六年', Object.keys(DST_SPANS).length, 6);
ok('每年都是春末起、初秋止', Object.entries(DST_SPANS).every(([y, [s, e]]) => {
  const sm = Number(s.slice(5, 7));
  const em = Number(e.slice(5, 7));
  return s.slice(0, 4) === y && e.slice(0, 4) === y && sm >= 4 && sm <= 5 && em >= 9 && em <= 10;
}), JSON.stringify(DST_SPANS));
ok('区间外不校正', !inDstSpan(P(1985, 6, 1, 12, 0)) && !inDstSpan(P(1992, 6, 1, 12, 0))
  && !inDstSpan(P(1986, 1, 1, 12, 0)) && !inDstSpan(P(1986, 12, 31, 12, 0)));

// ── ② 边界：含头不含尾，两端都以 02:00 为界 ──────────────────
ok('起算日 01:59 还没换表', !inDstSpan(P(1986, 5, 4, 1, 59)));
ok('起算日 03:00 在夏令时内', inDstSpan(P(1986, 5, 4, 3, 0)));
ok('终止日 01:30 仍在夏令时内', inDstSpan(P(1986, 9, 14, 1, 30)));
ok('终止日 02:00 已回拨', !inDstSpan(P(1986, 9, 14, 2, 0)));
ok('区间中段全天在内', inDstSpan(P(1986, 8, 1, 0, 0)) && inDstSpan(P(1986, 8, 1, 23, 59)));

// ── ③ 换算：减一小时，跨日回退到前一天 ──────────────────────
const mid = applyDst(P(1986, 8, 1, 0, 30));
ok('00:30 回退到前一天 23:30', mid.applied && mid.day === 31 && mid.month === 7 && mid.hour === 23 && mid.minute === 30,
  JSON.stringify(mid));
const shift = applyDst(P(1986, 8, 1, 1, 30));
ok('01:30 回退到 00:30（跨过子丑分界）', shift.applied && shift.hour === 0 && shift.minute === 30 && shift.day === 1,
  JSON.stringify(shift));
const none = applyDst(P(1986, 5, 4, 1, 59));
ok('未校正时 applied=false 且不带说明', !none.applied && none.note === null && none.hour === 1, JSON.stringify(none));

// ── ④ 换表当天的歧义：口径不变，但要把话说清楚 ───────────────
eq('起算日 02:30 标成不存在的钟面时间', dstAmbiguity(P(1986, 5, 4, 2, 30)), 'gap');
eq('终止日 01:30 标成走了两遍', dstAmbiguity(P(1986, 9, 14, 1, 30)), 'twice');
eq('起算日 03:30 无歧义', dstAmbiguity(P(1986, 5, 4, 3, 30)), null);
eq('终止日 00:30 无歧义', dstAmbiguity(P(1986, 9, 14, 0, 30)), null);
const gapNote = applyDst(P(1986, 5, 4, 2, 30)).note;
ok('gap 的说明点出「这个时间当年不存在」并给出 dst:false 的退路',
  /并不存在/.test(gapNote) && /dst:false/.test(gapNote), gapNote);
const twiceNote = applyDst(P(1986, 9, 14, 1, 30)).note;
ok('twice 的说明点出「两个真实时刻」', /走了两遍|两个真实时刻/.test(twiceNote), twiceNote);
const plainNote = applyDst(P(1986, 8, 1, 12, 0)).note;
ok('普通日子只讲校正、不提歧义', /已减 1 小时/.test(plainNote) && !/并不存在|两遍/.test(plainNote), plainNote);

// ── ⑤ 排盘接线：默认校正，dst:false 可关 ────────────────────
// 取 01:30：回退一小时会跨过子/丑的分界（00:30 是子时、01:30 是丑时）。
// 00:30 那种点不能用来验这条——它回退到前一天 23:30，仍是子时，时柱看不出来。
const on = buildBazi({ year: 1986, month: 8, day: 1, hour: 1, minute: 30, gender: 'male', dst: true });
const off = buildBazi({ year: 1986, month: 8, day: 1, hour: 1, minute: 30, gender: 'male', dst: false });
ok('默认按夏令时校正：时柱随之变档', on.pillars.hour.ganzhi !== off.pillars.hour.ganzhi,
  `校正 ${on.pillars.hour.ganzhi} / 不校正 ${off.pillars.hour.ganzhi}`);
ok('校正结果里带出说明', on.input.dst.applied === true && /夏令时/.test(on.input.dst.note || ''), JSON.stringify(on.input.dst));
ok('关掉校正后不再宣称减过一小时', off.input.dst.applied === false && off.input.dst.note === null, JSON.stringify(off.input.dst));
// 回显必须写「改过之后」的钟面时间：写着原始输入、暗地里却按另一套排，
// 用户对着盘面复核时永远发现不了这次校正。
ok('回显的是校正后的钟面时间', on.input.civil.hour === 0 && on.input.civil.minute === 30 && on.input.civil.day === 1,
  JSON.stringify(on.input.civil));
ok('不校正时回显原始钟面时间', off.input.civil.hour === 1 && off.input.civil.minute === 30, JSON.stringify(off.input.civil));
