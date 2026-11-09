// 闲神层（炳祥高级第 9 课口径）：狭义闲神＝食伤与官杀中较弱者。
// 4% 最佳 / <10% 合格 / >=10% 显忌；显性 ×3 只作文案排序，不改分值。
import { compute } from '../engine/index.js';
import { xianshenOf } from '../engine/geju.js';
import { ok, eq } from './_harness.mjs';

const bazi = (datetime) => compute({ system: 'bazi', datetime, gender: 'male', trueSolar: false });

// ── 一、取样盘：三档与「取较弱者」 ──────────────────────────────
const x2008 = bazi('2008-12-04T01:30').frame.xianshen;
eq('2008 盘取金（食伤）为闲神', x2008.idle.element, '金');
eq('2008 盘金约 3%，落最佳档', x2008.band, '最佳');
eq('最佳档文案', x2008.level, '闲神得位');
ok('detail 写明取较弱者', x2008.detail.includes('较弱'), x2008.detail);

const x1990 = bazi('1990-05-12T14:30').frame.xianshen;
eq('1990 盘取水（官杀）为闲神', x1990.idle.role, '官杀');
eq('4.6% 属合格档（4% 最佳、<10% 合格）', x1990.band, '合格');
eq('合格档文案', x1990.level, '闲神合格');

const x1984 = bazi('1984-06-15T10:00').frame.xianshen;
ok('1984 盘闲神超过 10%', x1984.idle.pct > 10, String(x1984.idle.pct));
eq('超过 10% 记为显忌', x1984.band, '显忌');
eq('显忌档文案', x1984.level, '闲神显忌');
ok('detail 点明「不是大凶」', x1984.detail.includes('不是大凶'), x1984.detail);

// ── 二、显性 ×3：透干只抬展示权重，不改原分值 ──────────────────
const base = {
  dayStem: '甲', // 木日主：食伤=火、官杀=金
  wuxing: { 火: 4, 金: 2, 水: 1, 木: 1, 土: 2 },
  yongshen: { favorRoles: ['官杀'], avoidRoles: [] },
};
const hidden = xianshenOf({ ...base, pillars: { year: { stem: '壬' }, month: { stem: '甲' }, day: { stem: '甲' } } });
const shown = xianshenOf({ ...base, pillars: { year: { stem: '庚' }, month: { stem: '甲' }, day: { stem: '甲' } } });
eq('未透干时 visible=false', hidden.visible, false);
eq('透干时 visible=true', shown.visible, true);
eq('原分值不被显性改动', shown.idle.pct, hidden.idle.pct);
eq('显性展示权重 = 原分值 ×3', shown.displayWeight, Math.round(hidden.idle.pct * 3 * 10) / 10);
ok('显性文案提示 ×3', shown.detail.includes('×3') || shown.detail.includes('显性'), shown.detail);

// ── 三、喜忌立场只复读，不新增判定 ──────────────────────────────
// 该合成盘食伤火 4、官杀金 2，闲神取较弱的金（官杀）。
eq('官杀在喜用里时 stance=喜', shown.stance, '喜');
const avoidSide = xianshenOf({ ...base, yongshen: { favorRoles: [], avoidRoles: ['官杀'] }, pillars: {} });
eq('官杀在忌神里时 stance=忌', avoidSide.stance, '忌');
const neutral = xianshenOf({ ...base, yongshen: { favorRoles: [], avoidRoles: [] }, pillars: {} });
eq('都不在时 stance=中性', neutral.stance, '中性');

// ── 四、接进 frame，且不动旺衰与喜忌 ────────────────────────────
const r = bazi('2008-12-04T01:30');
ok('frame 带 xianshen', !!r.frame.xianshen);
ok('旺衰结论未变', ['身弱', '偏弱'].includes(r.strength.level), r.strength.level);
ok('喜忌数组未被改写', Array.isArray(r.frame.yongshen.favor) && Array.isArray(r.frame.yongshen.avoid));
ok('method 声明只作标注', r.frame.xianshen.method.includes('不改分值'), r.frame.xianshen.method);

// ── 五、解析层可见：闲神一节 ────────────────────────────────────
const it = compute({ system: 'bazi', datetime: '2008-12-04T01:30', gender: 'male', trueSolar: false, withInterpret: true, question: '今年工作' }).interpret;
const sec = (it.sections || []).find((s) => s.key === 'xianshen') || { text: '' };
ok('解析层新增「闲神」一节', !!sec.text, (it.sections || []).map((s) => s.key).join(','));
ok('闲神节写出档位', sec.text.includes(`【${x2008.level}】`), sec.text.slice(0, 80));
ok('闲神节写出闲神五行与占比', sec.text.includes('金') && sec.text.includes(`${x2008.idle.pct}%`), sec.text);
ok('闲神节带口径并声明不改分值', sec.text.includes('口径：') && sec.text.includes('不改分值'), sec.text.slice(-80));
