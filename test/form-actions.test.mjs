// 表单的三个兜底动作：看示例 / 填空答案、清空、改条件重排（P1-25）。
//
// 这三件事都不改变排盘结果，缺了也不影响任何人算出盘——但缺了会让人卡住：
// 第一次进问卷面对 45 道题、填了一半想推倒重来、看完长报告想改一个日期却发现
// 输入框在上面一万三千像素处。这类「用不下去」的问题不会出现在任何断言里，
// 所以只能靠钉住这几个入口本身。
import { ok } from './_harness.mjs';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const UI = fs.readFileSync(path.join(ROOT, 'src', 'web-ui.js'), 'utf8');
const BUILD = fs.readFileSync(path.join(ROOT, 'tools', 'build-html.mjs'), 'utf8');
const MB = await import('../engine/mbti.js');
const CS = await import('../engine/constitution.js');

// ── 引擎侧：示例答卷必须有据可依 ───────────────────────────────
const mbPaper = MB.mbtiPaper();
ok('MBTI 题面带 side', mbPaper.questions.every((q) => typeof q.side === 'string' && q.side.length === 1));
ok('side 落在四种二分的一侧', mbPaper.questions.every((q) => q.side === q.dim[0] || q.side === q.dim[1]));
ok('每个维度两侧都有题（否则统一给分会全偏）', ['EI', 'SN', 'TF', 'JP'].every((dim) => {
  const side = mbPaper.questions.filter((q) => q.dim === dim).map((q) => q.side);
  return side.indexOf(dim[0]) >= 0 && side.indexOf(dim[1]) >= 0;
}));
ok('MBTI 题数与题面一致', mbPaper.questions.length === mbPaper.total);

const csPaper = CS.constitutionPaper();
ok('体质题面带 key', csPaper.questions.every((q) => typeof q.key === 'string' && q.key.length > 0));
ok('九种体质每组都有题', new Set(csPaper.questions.map((q) => q.key)).size === 9);

// ── 源码侧：三个入口都在 ──────────────────────────────────────
ok('表单有清空按钮', /<button id="clear"/.test(BUILD));
ok('清空按钮带解释', /id="clear"[^>]*title="[^"]*清/.test(BUILD));
ok('清空按钮绑定处理', /el\('clear'\)[\s\S]{0,80}addEventListener\('click'/.test(UI));
ok('清空会清结果区', /el\('out'\)\.replaceChildren\(\)/.test(UI));
ok('清空会清问卷答案', /csClear\(\);/.test(UI) && /mbClear\(\);/.test(UI));

// 「看示例」在问卷下不再隐藏——隐藏它等于让人面对 45 道题没有一个样例
ok('看示例在问卷下也显示', /if \(sampleBtn\) \{\s*sampleBtn\.style\.display = '';/.test(UI));
ok('看示例在问卷下改叫填空答案', /quizOn \? '填空答案' : '看示例'/.test(UI));
ok('看示例按体系分三支', /tab === 'constitution'/.test(UI) && /tab === 'mbti'/.test(UI));
ok('MBTI 示例按 side 造卷', /q\.side === SAMPLE_MBTI\[q\.dim\]/.test(UI));
ok('体质示例分主型与兼夹', /SAMPLE_CS_MAIN/.test(UI) && /SAMPLE_CS_NEXT/.test(UI));
ok('示例答案不是全 3 分', !/fill\(3\)/.test(UI));

// 结果页的「改条件重排」
ok('导出条有改条件重排', /data-act="reform"/.test(UI));
ok('改条件重排是导出条第一个按钮', /<div class="exp no-print">\s*<button type="button" data-act="reform"/.test(UI));
ok('改条件重排滚回表单', /dataset\.act === 'reform'/.test(UI) && /bar\.scrollIntoView/.test(UI));
ok(
  '改条件重排只滚不改值',
  /dataset\.act === 'reform'\)\s*\{[\s\S]{0,400}?scrollIntoView[\s\S]{0,200}?return;/.test(UI)
);

// ── 行为侧：示例答案真能造出非平结果 ─────────────────────────
const SAMPLE_MBTI = { EI: 'I', SN: 'N', TF: 'F', JP: 'P' };
const qs = mbPaper.questions;
const answers = qs.map((q, i) => {
  const mine = q.side === SAMPLE_MBTI[q.dim];
  if (mine) return i % 5 === 0 ? 5 : 4;
  return i % 7 === 0 ? 1 : 2;
});
const built = MB.buildMbti({ answers });
ok('示例答卷能出类型', built && typeof built.type === 'string' && built.type.length === 4);
ok('示例答卷落成 INFP', built.type === 'INFP');
ok('示例答卷四维都有倾向（没被正反题抵消）', built.dims.every((d) => d.pct > 0.05));
ok('示例答卷不是全满偏', built.dims.some((d) => d.pct < 0.9));

const csQs = csPaper.questions;
const csAns = csQs.map((q, i) => {
  if (q.key === 'qiyu') return i % 2 ? 4 : 5;
  if (q.key === 'qixu') return 4;
  return i % 3 === 0 ? 3 : 2;
});
const cbuilt = CS.buildConstitution({ answers: csAns });
ok('体质示例答卷能出主型', !!cbuilt && !!cbuilt.primary);
ok('体质示例主型是气郁质', cbuilt.primary && cbuilt.primary.key === 'qiyu');
ok('体质示例有兼夹而不是全能', Array.isArray(cbuilt.secondary) ? cbuilt.secondary.length > 0 : true);
