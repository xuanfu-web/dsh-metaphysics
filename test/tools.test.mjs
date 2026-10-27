// 速查类六体系（黄历 / 择日 / 称骨 / 小六壬 / 星座 / 生命数字）+ 夏令时校正的契约断言。
// 这些体系都是纯本地确定性计算：同一输入必须同结果，且口径要写在输出里。
import fs from 'node:fs';
import { compute } from '../engine/index.js';
import { ok } from './_harness.mjs';

const ROOT = new URL('../', import.meta.url);
const read = (p) => fs.readFileSync(new URL(p, ROOT), 'utf8');

// ── ① 黄历：干支 / 建除 / 冲煞 / 农历 ─────────────────────────
{
  const a = compute({ system: 'almanac', datetime: '2026-10-27' });
  ok('黄历：日柱甲戌', a.ganzhi.day === '甲戌', a.ganzhi.day);
  ok('黄历：月柱戊戌', a.ganzhi.month === '戊戌', a.ganzhi.month);
  ok('黄历：年柱丙午（立春界）', a.ganzhi.year === '丙午', a.ganzhi.year);
  ok('黄历：农历九月十八', a.lunar.month === 9 && a.lunar.day === 18, `${a.lunar.month}/${a.lunar.day}`);
  ok('黄历：建除为建日', a.zhiXing === '建', a.zhiXing);
  ok('黄历：冲煞为冲龙', a.chong.shengXiao === '龙' && /冲龙/.test(a.chong.text), a.chong.text);
  ok('黄历：宜忌都是数组且非空', Array.isArray(a.yi) && a.yi.length > 0 && Array.isArray(a.ji) && a.ji.length > 0);
  ok('黄历：把「不是全量黄历」写进口径', /未收录/.test(a.meta.scope), a.meta.scope);
  const again = compute({ system: 'almanac', datetime: '2026-10-27' });
  ok('黄历：同日同卦（确定性）', again.dailyHexagram.name === a.dailyHexagram.name, a.dailyHexagram.name);
  const lichun = compute({ system: 'almanac', datetime: '2024-02-10' }); // 春节，已过立春
  ok('黄历：春节当天年柱甲辰', lichun.ganzhi.year === '甲辰', lichun.ganzhi.year);
  const before = compute({ system: 'almanac', datetime: '2024-02-04' }); // 立春当日
  ok('黄历：立春当日按正午判「尚未交节」（已知日界口径）', before.ganzhi.year === '癸卯', before.ganzhi.year);
  const after = compute({ system: 'almanac', datetime: '2024-02-05' });
  ok('黄历：立春次日换年柱甲辰', after.ganzhi.year === '甲辰', after.ganzhi.year);
}

// ── ② 择日：事项适配 + 冲属相排除 ────────────────────────────
{
  const z = compute({ system: 'zeri', task: '开业', startDate: '2026-10-27', days: 7 });
  ok('择日：推荐日含 10-29（宜开市）', z.best.includes('2026-10-29'), z.best.join(','));
  ok('择日：必回逐日列表', Array.isArray(z.days) && z.days.length === 7, String(z.days.length));
  ok('择日：回避项带理由', z.avoid.length > 0 && /\d{4}-\d{2}-\d{2}（/.test(z.avoid[0]), z.avoid[0]);
  ok('择日：口径写明排序引导而非结论', /排序引导/.test(z.meta.scope), z.meta.scope);

  // 丙子日冲马：给了属相马，该日必须被排除，且不进推荐/可用
  const withChong = compute({ system: 'zeri', task: '开业', startDate: '2026-10-27', days: 7, shengXiao: '马' });
  const chongDay = withChong.days.find((d) => d.chong === '马');
  ok('择日：冲属相日被排除', !!chongDay && chongDay.excluded === true, chongDay ? chongDay.date : '无');
  ok('择日：排除日不进推荐/可用', !withChong.best.includes(chongDay.date) && !withChong.usable.includes(chongDay.date));
  ok('择日：排除计数与列表一致', withChong.excludedCount === withChong.days.filter((d) => d.excluded).length, String(withChong.excludedCount));

  let threw = '';
  try { compute({ system: 'zeri', task: '开业' }); } catch (e) { threw = e.message; }
  ok('择日：缺起算日必须报错而不是静默取今天', /startDate/.test(threw), threw);
  let badTask = '';
  try { compute({ system: 'zeri', task: '考试', startDate: '2026-10-27' }); } catch (e) { badTask = e.message; }
  ok('择日：不支持的事项列出可选清单', /不支持的事项/.test(badTask) && /开业/.test(badTask), badTask);
}

// ── ③ 称骨：表值 + 四项之和 ─────────────────────────────────
{
  const c = compute({ system: 'chenggu', datetime: '1990-08-15', hour: 10 });
  ok('称骨：1990-08-15 巳时 = 五两六钱', c.total.qian === 56 && c.total.label === '五两六钱', c.total.label);
  const sum = c.weights.year.qian + c.weights.month.qian + c.weights.day.qian + c.weights.hour.qian;
  ok('称骨：合计等于四项相加', sum === c.total.qian, `${sum} vs ${c.total.qian}`);
  ok('称骨：庚午年九钱', c.weights.year.label === '庚午年 九钱', c.weights.year.label);
  ok('称骨：批语标明白话自撰', /白话自撰/.test(c.sources.join('')), c.sources.join(''));
  ok('称骨：总重落在 2.1–7.2 两的通行区间', c.total.qian >= 21 && c.total.qian <= 72, String(c.total.qian));

  let threw = '';
  try { compute({ system: 'chenggu', datetime: '1990-08-15' }); } catch (e) { threw = e.message; }
  ok('称骨：缺时辰必须报错', /时辰/.test(threw), threw);

  // 六十甲子年表逐项落在合法区间：用 1924–1983 全量扫一遍
  for (let y = 1924; y <= 1983; y++) {
    const r = compute({ system: 'chenggu', datetime: `${y}-06-15`, hour: 12 });
    if (!(r.weights.year.qian >= 5 && r.weights.year.qian <= 19)) {
      ok(`称骨：${y} 年骨重越界`, false, String(r.weights.year.qian));
      break;
    }
    if (y === 1983) ok('称骨：六十年骨重全部在 5 钱–1 两 9 钱之间', true);
  }
}

// ── ④ 小六壬：三宫递推 + 报数模式 ────────────────────────────
{
  const PAL = ['大安', '留连', '速喜', '赤口', '小吉', '空亡'];
  const pick = (n) => PAL[(((n - 1) % 6) + 6) % 6];
  const x = compute({ system: 'xiaoliuren', date: '2026-10-27', hour: 10 });
  ok('小六壬：时间起课三步落宫', x.steps.length === 3 && x.steps.every((s) => PAL.includes(s)), x.steps.join('→'));
  const [m, d, h] = [9, 18, 6]; // 农历九月十八 巳时
  const e1 = pick(m);
  const e2 = pick(PAL.indexOf(e1) + 1 + d - 1);
  const e3 = pick(PAL.indexOf(e2) + 1 + h - 1);
  ok('小六壬：与独立重算一致', e1 === x.steps[0] && e2 === x.steps[1] && e3 === x.steps[2], `${e1}→${e2}→${e3}`);
  ok('小六壬：落宫为第三宫', x.result.palace === x.steps[2], x.result.palace);
  ok('小六壬：断语带吉凶', /^[吉凶]$/.test(x.result.luck), x.result.luck);

  const n = compute({ system: 'xiaoliuren', mode: 'number', num1: 7, num2: 13, num3: 5 });
  ok('小六壬：报数 7/13/5 落小吉', n.result.palace === '小吉', n.result.palace);
  let threw = '';
  try { compute({ system: 'xiaoliuren', date: '2026-10-27' }); } catch (e) { threw = e.message; }
  ok('小六壬：时间起课缺时辰必须报错', /时辰/.test(threw), threw);
  let bad = '';
  try { compute({ system: 'xiaoliuren', mode: 'number', num1: 0, num2: 3, num3: 5 }); } catch (e) { bad = e.message; }
  ok('小六壬：报数越界必须报错', /1–99/.test(bad), bad);
}

// ── ⑤ 星座：区间边界 ────────────────────────────────────────
{
  const cases = [
    ['2026-03-21', '白羊座'], ['2026-03-20', '双鱼座'],
    ['2026-08-15', '狮子座'], ['2026-08-22', '狮子座'], ['2026-08-23', '处女座'],
    ['2026-10-27', '天蝎座'], ['2026-12-22', '摩羯座'], ['2026-01-01', '摩羯座'],
  ];
  for (const [dt, sign] of cases) {
    const r = compute({ system: 'star', datetime: dt });
    ok(`星座：${dt} = ${sign}`, r.sign.name === sign, r.sign.name);
  }
  const a = compute({ system: 'star', datetime: '2026-10-27' });
  const b = compute({ system: 'star', datetime: '2026-10-27' });
  ok('星座：同日同结果', a.daily.luckyNumber === b.daily.luckyNumber && a.daily.tone === b.daily.tone);
  ok('星座：四项基调各 1–5 星', a.daily.dims.length === 4 && a.daily.dims.every((d) => d.stars >= 1 && d.stars <= 5));
  ok('星座：写明娱乐向', /娱乐/.test(a.disclaimer), a.disclaimer);
}

// ── ⑥ 生命数字：归约与主数保留 ───────────────────────────────
{
  const r = compute({ system: 'numerology', datetime: '1990-08-15' });
  ok('生命数字：1990-08-15 = 33/6/5', r.numbers.lifePath === 33 && r.numbers.birthday === 6 && r.numbers.attitude === 5,
    `${r.numbers.lifePath}/${r.numbers.birthday}/${r.numbers.attitude}`);
  ok('生命数字：三项都有释义', r.parts.length === 3 && r.parts.every((p) => p.meaning && p.meaning.title));
  const s = compute({ system: 'numerology', datetime: '2000-01-01' });
  ok('生命数字：2000-01-01 生命路径 4', s.numbers.lifePath === 4, String(s.numbers.lifePath));
  // 主数 11/22/33 只在这些日子出现：找 11-29 这类
  const master = compute({ system: 'numerology', datetime: '1981-08-15' });
  ok('生命数字：11/22/33 按主数保留（不继续归约到 2/4/6）', [11, 22, 33].includes(master.numbers.lifePath),
    String(master.numbers.lifePath));
  ok('生命数字：写明与东方术数不可互证', /不可互相印证/.test(r.disclaimer), r.disclaimer);
}

// ── ⑦ 夏令时：1986–1991 自动校正 ─────────────────────────────
{
  const on = compute({ system: 'bazi', datetime: '1988-07-01T00:30', gender: 'female', lateZi: false, trueSolar: false });
  const off = compute({ system: 'bazi', datetime: '1988-07-01T00:30', gender: 'female', lateZi: false, trueSolar: false, dst: false });
  ok('夏令时：1988-07-01 00:30 默认校正为 06-30 23:30', /06-30 23:30/.test(on.solarTime.civilText), on.solarTime.civilText);
  ok('夏令时：校正后日柱不同', on.pillars.day.ganzhi !== off.pillars.day.ganzhi, `${on.pillars.day.ganzhi} vs ${off.pillars.day.ganzhi}`);
  ok('夏令时：结果里记下校正说明', /夏令时/.test(on.solarTime.note), on.solarTime.note);
  ok('夏令时：dst:false 不校正', off.input.dst.applied === false);
  const zw = compute({ system: 'ziwei', datetime: '1988-07-01T00:30', gender: 'female', trueSolar: false });
  ok('夏令时：紫微同样校正并留痕', zw.input.dst.applied === true && /夏令时/.test(zw.solarTime.note));
}

// ── ⑧ 工具 schema 暴露新体系 ─────────────────────────────────
{
  const host = read('index.js');
  for (const s of ['almanac', 'zeri', 'chenggu', 'xiaoliuren', 'star', 'numerology']) {
    ok(`宿主 schema 暴露 ${s}`, new RegExp(`'${s}'`).test(host));
  }
  ok('宿主 schema 暴露 dst 开关', /dst: \{/.test(host) || /name: 'dst'/.test(host) || /dst: \{/.test(read('index.js')));
  ok('宿主为日期类体系补今天', /DATE_ONLY/.test(host));
  ok('宿主为择日补起算日', /zeri' && !next\.startDate/.test(host));
}
