/**
 * 缺项必须「置灰 + 点名」，而不是让引擎抛错给用户看。
 *
 * 起因：22 体系巡检发现起名缺名字、报数起课缺数字都直接进了引擎，用户看到的是
 * 「请给 givenName（1–2 个汉字）」这种接口口吻；农历转公历更糟——run() 里直接
 * return 没走 bail，状态停在 CALCULATING，按钮的 disabled / aria-busy 再也没人恢复。
 *
 * 这份测试守两件事：
 *   ① validateForm() 认得每个体系的必填项；
 *   ② 参数不对时的出口只有 bail() 一条——它负责把状态和按钮一起复位。
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { ok } from './_harness.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(join(ROOT, 'src', 'web-ui.js'), 'utf8');

/** 按大括号配平取函数体（与 flow-state.test.mjs 同一套取法） */
function bodyOf(sig) {
  const i = src.indexOf(sig);
  if (i < 0) return '';
  const start = src.indexOf('{', i + sig.length - 1);
  if (start < 0) return '';
  let depth = 0;
  for (let j = start; j < src.length; j += 1) {
    const c = src[j];
    if (c === '{') depth += 1;
    else if (c === '}') {
      depth -= 1;
      if (depth === 0) return src.slice(start, j + 1);
    }
  }
  return '';
}

/** 剔掉整行注释，避免旧写法留在注释里把断言带跑偏 */
const code = src.split('\n').filter((l) => !/^\s*(\/\/|\*|\/\*)/.test(l)).join('\n');

const vf = bodyOf('function validateForm(');
const bail = bodyOf('function bail(');

// ── 一、validateForm 认得每个体系的必填 ────────────────────────────
ok('validateForm 里能读到起名的必填', /tab === 'name'/.test(vf));
ok('起名要姓氏', /miss\.push\('姓氏'\)/.test(vf));
ok('起名评名字还要名字', /nnMode === 'assess'[\s\S]{0,80}miss\.push\('名字'\)/.test(vf));
ok('生成候选模式不要求填名字', /nnMode === 'assess'[\s\S]{0,120}givenname/.test(vf) || /givenname[\s\S]{0,60}nnMode/.test(vf));

ok('报数起课要三个数', /tab === 'xiaoliuren' && xlrMode === 'number'/.test(vf));
ok('报数起课逐个点名', /'第一个数', '第二个数', '第三个数'/.test(vf));
ok('报数起课的三个输入框都查', /'num1', 'num2', 'num3'/.test(vf));

ok('梅花数字起卦要有上卦数', /miss\.push\('上卦数'\)/.test(vf));
ok('梅花数字起卦要有下卦数', /miss\.push\('下卦数'\)/.test(vf));
ok('梅花数字起卦只在数字模式查', /tab === 'meihua' && mhMode === 'number'/.test(vf));

ok('农历转公历要农历日期', /miss\.push\('农历日期'\)/.test(vf));
ok('农历转公历只在 lunar2solar 查', /tab === 'convert' && convMode === 'lunar2solar'/.test(vf));

// 原有的三类不能被这次改动弄丢
ok('原来的日期必填还在', /usesTimeInput\(\) && !isoDateOk/.test(vf));
ok('原来的合盘对方日期还在', /miss\.push\('对方出生日期'\)/.test(vf));
ok('原来的所问之事还在', /miss\.push\('所问之事'\)/.test(vf));
ok('validateForm 仍然是纯函数式返回 ok + missing', /return \{ ok: miss\.length === 0, missing: miss \};/.test(vf));

// ── 二、参数不对只能从 bail 出去 ──────────────────────────────────
ok('bail 会把状态退回去', /flowState = FLOW\.UNFILLED;/.test(bail));
ok('bail 会清掉旧结果', /last = null;/.test(bail));
ok('bail 会摘掉 aria-busy', /removeAttribute\('aria-busy'\)/.test(bail));
ok('bail 会走一次 refreshFlow 恢复按钮', /refreshFlow\(\)/.test(bail));

// 全库里不许再有「写 .err 然后直接 return」的老写法——那会把状态卡在 CALCULATING
const errSinks = code.match(/el\('out'\)\.innerHTML = '<div class="err">/g) || [];
ok('没有绕过 bail 直接写 .err 的分支', errSinks.length === 0, `命中 ${errSinks.length} 处`);

// run() 里的提前退出都得是 return bail(...)
const runBody = bodyOf('async function run(opts)');
// 唯一的例外是缓存命中：它已经把 last / 状态 / castKey 都摆好了，是个正常出口。
const bareSpots = [...runBody.matchAll(/^\s{6,}return;\s*$/gm)].map((m) => m.index);
const bareIsCacheHit = bareSpots.length === 1
  && /paintFlowNote\(/.test(runBody.slice(Math.max(0, bareSpots[0] - 400), bareSpots[0]));
ok('run 里唯一的裸 return 是缓存命中出口', bareIsCacheHit, `裸 return; ${bareSpots.length} 处`);

ok('农历日期缺口走 bail', /if \(!m\) return bail\('农历日期要按/.test(code));
ok('数字起卦缺口走 bail', /return bail\('数字起卦要填两个数/.test(code));
ok('飞星日期不对走 bail', /if \(fd && !isoDateOk\(fd\)\) \{\s*\n\s*return bail\('飞星日期要按/.test(code));

// bail 的文案是给用户看的，不许出现接口参数名
const bailMsgs = (code.match(/return bail\('([^']+)'\)|bail\('([^']+)'\)/g) || []).join(' ');
ok('bail 文案里不带接口参数名', !/givenName|surname|num1|upper|lower|lunardate/.test(bailMsgs), bailMsgs.slice(0, 80));

// ── 三、状态机该有的口子还在 ─────────────────────────────────────
ok('CALCULATING 只有一个入口', (code.match(/flowState = FLOW\.CALC;/g) || []).length === 1);
ok('缺项时按钮置灰', /go\.disabled = !v\.ok;/.test(code));
ok('缺项文案会点名差什么', /还差：\$\{v\.missing\.join/.test(code));
