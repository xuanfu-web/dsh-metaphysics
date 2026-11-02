// 工具定义的体积与重复度闸门。
//
// 为什么要这道闸：工具定义每次调用都整份进上下文（当前实测 13.5K 字符 / 约 6K token），
// 而它不受任何现有闸门管——check-bundle 只管 client.js 与引擎分块，check-assertions 只管断言数。
// 也就是说「给某个参数再加两句说明」这种改动，今天不会让任何测试变红，但会让每一次调用都变贵。
//
// 2026-11 检视时按句比对过 DESCRIPTION 与 78 条参数说明：完全重复句 0 处，
// 唯一的重复是「仅 xiaoliuren 报数模式：」这类逐参数作用域前缀——那些是模型逐条读说明时
// 必须各自看到的限定语，合并进总说明就等于把「这个键只在这个体系下生效」的保证删掉，
// 属于会丢信息，不算瘦身。所以这里不裁剪现存文本，只钉住两条不许恶化的线。
import { apply } from '../index.js';
import { ok, eq } from './_harness.mjs';

const TOTAL_CAP = 15000; // 完整工具定义序列化字符上限（实测 13.5K，留一成出头）
const PER_PARAM_CAP = 620; // 单条参数说明上限（最长是 system 的 557）

let def = null;
apply({ tools: { register: (d) => { def = d; return () => {}; } }, effect: (fn) => fn() });
ok('工具定义已注册', !!def && !!def.parameters);

/** 递归收集所有带 description 的键（含 partner / partner2 / events.items 里的子键） */
function walk(node, pathName, out) {
  if (!node || typeof node !== 'object') return;
  if (typeof node.description === 'string' && node.description) out.push({ name: pathName, text: node.description });
  const children = node.properties || (node.items && typeof node.items === 'object' ? { '': node.items } : null);
  if (!children) return;
  for (const [k, v] of Object.entries(children)) walk(v, k ? `${pathName}.${k}` : pathName, out);
}

const props = def.parameters.properties;
const missing = Object.entries(props)
  .filter(([, v]) => !(v && typeof v.description === 'string' && v.description.length >= 12))
  .map(([k]) => k);
ok('每个顶层参数都有实质说明', missing.length === 0, missing.join(', '));

const paramDescs = [];
for (const [k, v] of Object.entries(props)) walk(v, k, paramDescs);

const serialized = JSON.stringify({ name: def.name, description: def.description, parameters: def.parameters });
ok(`工具定义 ${serialized.length} 字符不超预算 ${TOTAL_CAP}`, serialized.length <= TOTAL_CAP);
ok('预算没被松成空闸', TOTAL_CAP <= serialized.length * 1.25, `上限 ${TOTAL_CAP} / 实测 ${serialized.length}`);

const longest = paramDescs.map((d) => ({ name: d.name, len: d.text.length })).sort((a, b) => b.len - a.len);
const over = longest.filter((x) => x.len > PER_PARAM_CAP);
ok(`没有单条说明超 ${PER_PARAM_CAP} 字`, over.length === 0, over.map((x) => `${x.name} ${x.len}`).join(', '));
ok('单条上限没被松成空闸', PER_PARAM_CAP <= longest[0].len * 1.3, `上限 ${PER_PARAM_CAP} / 实测最长 ${longest[0].len}（${longest[0].name}）`);

// 逐句比对：参数之间、参数与 DESCRIPTION 之间都不许出现同一句原话
const norm = (s) => s.replace(/（[^）]*）/g, '').replace(/[\s，。、；：「」“”]/g, '');
const sentences = [];
for (const d of paramDescs) for (const s of d.text.split('。')) sentences.push({ where: d.name, s });
const topSent = def.description.split('。');
for (let i = 0; i < topSent.length; i++) sentences.push({ where: `DESCRIPTION#${i + 1}`, s: topSent[i] });

const buckets = new Map();
for (const item of sentences) {
  const k = norm(item.s);
  if (k.length < 12) continue; // 短指令句（「仅 zeri 使用：要挑的事项」）本就该逐条重复
  if (!buckets.has(k)) buckets.set(k, []);
  buckets.get(k).push(item.where);
}
const dups = [...buckets.values()].filter((v) => new Set(v).size > 1);
ok('说明里没有整句重复', dups.length === 0, dups.map((v) => v.join(' <=> ')).join(' | '));

eq('顶层参数数量不缩水（说明全在，工具面不变）', Object.keys(props).length >= 70, true);

// 选错体系比少说一句说明贵得多：枚举里每个体系都必须在 system 说明里有对应词条
const sysProp = props.system;
const undocumented = sysProp.enum.filter((s) => !sysProp.description.includes(s));
ok('每个体系都在 system 说明里', undocumented.length === 0, undocumented.length ? `漏了 ${undocumented.join('/')}` : '');
