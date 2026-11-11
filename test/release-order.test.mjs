// 发版流程的步序：构建必须在测试之前。
// 0.67.0 发版时卡在这里：release.mjs 先跑 test-all，后跑 verification.mjs，
// 而 verification.test 断言「报告文件与生成器逐字节一致」，报告里又写着
// package.json 的版本号——于是每次改版本号，第一步测试必然报
// 「215794 vs 215794」这种两个相同长度的数字，看不出根因。
// 这条测试把依赖方向钉住：谁把构建挪回测试之后，这里就红。
import fs from 'node:fs';
import { ok } from './_harness.mjs';

const read = (p) => fs.readFileSync(new URL('../' + p, import.meta.url), 'utf8');
const REL = read('tools/release.mjs');

// 只看实际执行的那一行（step 标题里也出现同样的字样，不能用第一次出现的位置）
const at = (needle) => {
  const i = REL.indexOf(needle);
  ok(`release.mjs 里能找到「${needle}」`, i > 0, i > 0 ? `第 ${REL.slice(0, i).split('\n').length} 行` : '未找到');
  return i;
};

const buildClient = at("'build-client.mjs'");
const buildHtml = at("'build-html.mjs'");
const verification = at("'verification.mjs'");
const testAll = at("'test-all.mjs'");

// ── 一、构建三步都在测试之前 ──────────────────────────────────
ok('重建 client.js 在跑回归之前', buildClient < testAll, `${buildClient} < ${testAll}`);
ok('重建单文件 HTML 在跑回归之前', buildHtml < testAll, `${buildHtml} < ${testAll}`);
ok('重建对拍报告在跑回归之前', verification < testAll, `${verification} < ${testAll}`);

// ── 二、构建三步内部也有先后：报告要用重建后的引擎 ──────────────
ok('client.js 先于报告重建', buildClient < verification, `${buildClient} < ${verification}`);
ok('HTML 先于报告重建', buildHtml < verification, `${buildHtml} < ${verification}`);

// ── 三、产物一致性校验仍然保留，而且仍在测试之前 ─────────────────
const diffArtifacts = at("'--exit-code', '--', 'client.js', 'client.*.js'");
const diffReport = at("'--exit-code', '--', 'docs/verification.html'");
ok('仍校验 client.js 与分块已提交', diffArtifacts > buildClient, '在重建之后');
ok('仍校验对拍报告已提交', diffReport > verification, '在重建之后');
ok('产物校验也在测之前（产物不新鲜就别浪费一轮回归）',
  diffArtifacts < testAll && diffReport < testAll, `${diffArtifacts}, ${diffReport} < ${testAll}`);

// ── 四、测试之后不该再重建：那会让「测过的」与「发出去的」不是同一份 ──
const afterTest = REL.slice(testAll);
ok('测试之后不再重建 client.js', !afterTest.includes("'build-client.mjs'"));
ok('测试之后不再重建报告', !afterTest.includes("'verification.mjs'"));

// ── 五、跳过测试的开关仍然只影响测试这一步 ─────────────────────
ok('--skip-tests 只跳过回归，不影响构建', REL.includes('跳过测试（--skip-tests）') && REL.includes('skipTests'));
ok('发布前仍要求工作区干净（产物必须已提交）', REL.includes('git 工作区不干净'));
