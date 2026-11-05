// 工具定义的体积与「参数不许消失」闸门。
//
// 0.63.0 起 schema 分层：顶层只放 31 个通用参数，57 个体系专属参数收进 options，
// 全文由 metaphysics_help 按需返回。工具定义每次调用都整份进上下文，
// 所以这里钉的是「常驻成本」；help 的文本只在模型主动查询时产生，不计入本闸。
//
// 两条底线：
// ① 任何参数都不许消失——OLD_KEYS 是分层前的 88 个键，必须仍能在
//    顶层 ∪ options 里找到；说明也仍要存在（只是从 schema 搬进 help 前先留了短版）。
// ② 预算不许被松成空闸——上限离实测太远就失去意义，所以同时断言上限不超实测的 1.25 倍。
import { apply } from '../index.js';
import { ok, eq } from './_harness.mjs';

const TOTAL_CAP = 14500; // 完整工具定义序列化字符上限（分层后实测约 12.1K）
const HELP_CAP = 1200; // help 工具自身的常驻定义上限（实测约 0.6K）
const PER_PARAM_CAP = 620; // 单条参数说明上限（最长仍是 system 的 600）

// 分层前的完整参数表。顺序即当时的 schema 顺序；只许增，不许删。
const OLD_KEYS = ['handle', 'revise', 'system', 'datetime', 'date', 'hour', 'minute', 'dst', 'gender', 'address', 'geocode', 'longitude', 'lateZi', 'trueSolar', 'lines', 'question', 'task', 'startDate', 'days', 'candidates', 'shengXiao', 'mode', 'lunarYear', 'lunarMonth', 'lunarDay', 'isLeapMonth', 'num1', 'num2', 'num3', 'direction', 'cross', 'hourUnknown', 'diff', 'shadow', 'trace', 'verifyPast', 'rectify', 'events', 'ask', 'withInterpret', 'detail', 'asOf', 'seed', 'juMethod', 'lateZiHourMode', 'partner', 'partner2', 'chart', 'rectifyHours', 'upper', 'lower', 'changing', 'count', 'leapMonth', 'leapAsNext', 'brightnessSchool', 'gengYearSihua', 'tianmaSchool', 'tiankongSchool', 'jiekongSchool', 'kuiyueSchool', 'tianshiTianshang', 'changshengSchool', 'lateZishi', 'shenzhuSchool', 'zuoyaoSchool', 'action', 'toAge', 'sitting', 'facing', 'fortuneYear', 'period', 'sittingOffset', 'sittingDegree', 'facingOffset', 'facingDegree', 'fortuneDate', 'fortuneTime', 'surname', 'givenName', 'limit', 'charElements', 'strokeOverrides', 'surnameStrokes', 'year', 'month', 'day', 'answers'];

const tools = [];
apply({ tools: { register: (d) => { tools.push(d); return () => {}; } }, effect: (fn) => fn() });
const def = tools.find((d) => d.name === 'metaphysics_chart');
const helpDef = tools.find((d) => d.name === 'metaphysics_help');
ok('排盘工具已注册', !!def && !!def.parameters);
ok('help 工具已注册', !!helpDef && typeof helpDef.execute === 'function');

/** 递归收集所有带 description 的键（含 partner / options / events.items 里的子键） */
function walk(node, pathName, out) {
  if (!node || typeof node !== 'object') return;
  if (typeof node.description === 'string' && node.description) out.push({ name: pathName, text: node.description });
  const children = node.properties || (node.items && typeof node.items === 'object' ? { '': node.items } : null);
  if (!children) return;
  for (const [k, v] of Object.entries(children)) walk(v, k ? `${pathName}.${k}` : pathName, out);
}

const props = def.parameters.properties;
const coreKeys = Object.keys(props).filter((k) => k !== 'options');
const optionKeys = props.options ? Object.keys(props.options.properties) : [];
const allKeys = new Set([...coreKeys, ...optionKeys]);

const missingTop = Object.entries({ ...props, ...(props.options ? props.options.properties : {}) })
  .filter(([k, v]) => k !== 'options' && !(v && typeof v.description === 'string' && v.description.length >= 12))
  .map(([k]) => k);
ok('每个顶层/options 参数都有实质说明', missingTop.length === 0, missingTop.join(', '));

const gone = OLD_KEYS.filter((k) => !allKeys.has(k));
ok(`分层前的 ${OLD_KEYS.length} 个参数一个都没丢（顶层 ∪ options）`, gone.length === 0, gone.join(', '));
ok('参数总数没有缩水', allKeys.size >= OLD_KEYS.length, `${allKeys.size} / ${OLD_KEYS.length}`);
ok('通用参数留在顶层', coreKeys.length >= 30 && coreKeys.includes('datetime') && coreKeys.includes('withInterpret'), String(coreKeys.length));
ok('体系专属参数收进 options', optionKeys.length >= 50 && optionKeys.includes('brightnessSchool') && optionKeys.includes('sitting'), String(optionKeys.length));
ok('options 说明指向 help', /metaphysics_help/.test(props.options.description), props.options.description);

const paramDescs = [];
for (const [k, v] of Object.entries(props)) if (k !== 'options') walk(v, k, paramDescs);
for (const [k, v] of Object.entries(props.options.properties)) walk(v, k, paramDescs);

const serialized = JSON.stringify({ name: def.name, description: def.description, parameters: def.parameters });
ok(`工具定义 ${serialized.length} 字符不超预算 ${TOTAL_CAP}`, serialized.length <= TOTAL_CAP);
ok('预算没被松成空闸', TOTAL_CAP <= serialized.length * 1.25, `上限 ${TOTAL_CAP} / 实测 ${serialized.length}`);

const helpSerialized = JSON.stringify({ name: helpDef.name, description: helpDef.description, parameters: helpDef.parameters });
ok(`help 工具定义 ${helpSerialized.length} 字符不超预算 ${HELP_CAP}`, helpSerialized.length <= HELP_CAP);
ok('help 预算也没被松成空闸', HELP_CAP <= helpSerialized.length * 2.5, `上限 ${HELP_CAP} / 实测 ${helpSerialized.length}`);

const longest = paramDescs.map((d) => ({ name: d.name, len: d.text.length })).sort((a, b) => b.len - a.len);
const over = longest.filter((x) => x.len > PER_PARAM_CAP);
ok(`没有单条说明超 ${PER_PARAM_CAP} 字`, over.length === 0, over.map((x) => `${x.name} ${x.len}`).join(', '));
ok('单条上限没被松成空闸', PER_PARAM_CAP <= longest[0].len * 1.3, `上限 ${PER_PARAM_CAP} / 实测最长 ${longest[0].len}（${longest[0].name}）`);

// 逐句比对：参数之间、参数与 DESCRIPTION 之间都不许出现同一句原话。
// 同一句话在 schema 里出现两次，模型读到的仍是两份，省不了上下文。
const norm = (s) => s.replace(/（[^）]*）/g, '').replace(/[\s，。、；：「」“”]/g, '');
const sentences = [];
for (const d of paramDescs) for (const s of d.text.split('。')) sentences.push({ where: d.name, s });
const topSent = def.description.split('。');
for (let i = 0; i < topSent.length; i++) sentences.push({ where: `DESCRIPTION#${i + 1}`, s: topSent[i] });

const buckets = new Map();
for (const item of sentences) {
  const k = norm(item.s);
  if (k.length < 12) continue;
  if (!buckets.has(k)) buckets.set(k, []);
  buckets.get(k).push(item.where);
}
const dups = [...buckets.values()].filter((v) => new Set(v).size > 1);
ok('说明里没有整句重复', dups.length === 0, dups.map((v) => v.join(' <=> ')).join(' | '));

// 选错体系比少说一句说明贵得多：枚举里每个体系都必须在 system 说明里有对应词条
const sysProp = props.system;
const undocumented = sysProp.enum.filter((s) => !sysProp.description.includes(s));
ok('每个体系都在 system 说明里', undocumented.length === 0, undocumented.length ? `漏了 ${undocumented.join('/')}` : '');

// help 必须真的覆盖到所有体系与所有参数，否则「搬进 help」等于删掉说明
const helpIndex = await helpDef.execute({});
const sysMissing = sysProp.enum.filter((s) => !helpIndex.text.includes(s));
ok('help 索引列出全部 19 个体系', sysMissing.length === 0, sysMissing.join('/'));
const keyMissing = [...allKeys].filter((k) => !helpIndex.text.includes(k));
ok('help 索引覆盖全部参数键', keyMissing.length === 0, keyMissing.join(','));
const sysDocs = await Promise.all(sysProp.enum.map((s) => helpDef.execute({ system: s })));
ok('每个体系的 help 都非空且带必填行', sysDocs.every((d) => d.text.includes('必填：') && d.text.length > 60), String(sysDocs.length));
const keyDoc = await helpDef.execute({ key: 'brightnessSchool' });
ok('单参数 help 给出完整说明与取值', keyDoc.text.includes('brightnessSchool') && keyDoc.text.includes('QS'), keyDoc.text);
const badDoc = await helpDef.execute({ system: 'nope' });
ok('未知体系给出可选列表', badDoc.text.includes('未知体系') && badDoc.text.includes('bazi'), badDoc.text);

// 渐进披露写法必须与平铺写法等价：options 摊平后走同一条引擎路径
const flat = await def.execute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', withInterpret: true });
const nested = await def.execute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', options: { withInterpret: true } });
ok('options 与顶层写法排出同一张盘', JSON.stringify(flat.pillars) === JSON.stringify(nested.pillars) && !!nested.interpret);
const unknownMsg = await def.execute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', options: { nope: 1 } })
  .then(() => 'ACCEPTED').catch((e) => String((e && e.message) || e));
ok('options 里的未知键报 E_INPUT', /^\[E_INPUT\]/.test(unknownMsg) && /nope/.test(unknownMsg), unknownMsg);

// 原型链上的键不是参数：用 in 判断会把 constructor / toString / __proto__ 放进盘里
for (const k of ['constructor', 'toString', '__proto__']) {
  const msg = await def.execute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', options: { [k]: 1 } })
    .then(() => 'ACCEPTED').catch((e) => String((e && e.message) || e));
  ok(`options 拒收原型链键 ${k}`, /^\[E_INPUT\]/.test(msg) && msg.includes(k), msg);
}
const protoKeyDoc = await helpDef.execute({ key: 'constructor' });
ok('help 不把原型链键当参数', protoKeyDoc.text.includes('没有参数'), protoKeyDoc.text.slice(0, 40));
const protoSysDoc = await helpDef.execute({ system: 'constructor' });
ok('help 不把原型链键当体系', protoSysDoc.text.includes('未知体系'), protoSysDoc.text.slice(0, 40));

eq('顶层参数数量与参数表一致', coreKeys.length + optionKeys.length, OLD_KEYS.length);
