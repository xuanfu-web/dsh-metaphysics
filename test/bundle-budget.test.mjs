// 引擎分块体积预算：每块自带整套引擎导出，往引擎里塞一张大表会同时抬高所有块。
// check-bundle 里有闸，这里把「闸本身不许松」也钉住：只测真实产物，不许改数就放行。
import fs from 'node:fs';
import zlib from 'node:zlib';
import path from 'node:path';
import { ok } from './_harness.mjs';
import { CHUNKS } from '../tools/build-client.mjs';

const root = path.resolve(import.meta.dirname, '..');
const tool = fs.readFileSync(path.join(root, 'tools', 'check-bundle.mjs'), 'utf8');
const num = (name) => {
  const m = new RegExp(`const ${name} = ([0-9*\\s.]+);`).exec(tool);
  if (!m) throw new Error(`check-bundle.mjs 里找不到预算 ${name}`);
  return Function(`return (${m[1]});`)();
};
const CAP = num('CHUNK_GZIP_CAP');
const TOTAL_CAP = num('CHUNKS_TOTAL_GZIP_CAP');
ok('闸按单块硬顶判超', tool.includes('gzKb > CHUNK_GZIP_CAP') && tool.includes('超出单块预算'));
ok('闸按合计预算判超', tool.includes('chunksGzip > CHUNKS_TOTAL_GZIP_CAP'));
ok('成功行回报分块体积（漂移看得见）', tool.includes('chunksGzip / 1024 / 1024'));

const files = fs.readdirSync(root).filter((f) => /^client\..+\.js$/.test(f) && f !== 'client.debug.js').sort();
// 分块数只认 CHUNKS 一处事实源：曾经写死「>= 18」，合并命盘四块成一块后就变成假失败。
// 这里改成本意——磁盘上的分块必须与声明的一一对应，多一个少一个都算漂移。
const declared = Object.keys(CHUNKS).map((n) => `client.${n}.js`).sort();
ok('分块文件与 CHUNKS 声明一一对应', files.join(',') === declared.join(','),
  `磁盘 ${files.length} 个 / 声明 ${declared.length} 个：${files.filter((f) => !declared.includes(f)).join(',') || '无多余'}`);
ok('分块非空', files.length > 0, String(files.length));
let max = 0;
let maxFile = '';
let total = 0;
for (const f of files) {
  const gz = zlib.gzipSync(fs.readFileSync(path.join(root, f))).length;
  total += gz;
  if (gz > max) { max = gz; maxFile = f; }
  ok(`${f} 在单块预算内`, gz <= CAP, `gzip ${(gz / 1024).toFixed(0)}KB / 上限 ${(CAP / 1024).toFixed(0)}KB`);
}
ok('合计在预算内', total <= TOTAL_CAP, `gzip ${(total / 1024 / 1024).toFixed(2)}MB / 上限 ${(TOTAL_CAP / 1024 / 1024).toFixed(2)}MB`);
// 预算不许为了「让它过」而被抬到没意义的高度：留三成余量足够吸收正常波动
ok('单块预算没有被抬成空闸', max * 1.3 >= CAP, `最大块 ${maxFile} ${(max / 1024).toFixed(0)}KB，上限 ${(CAP / 1024).toFixed(0)}KB`);

// ── 每块独立预算（tools/chunk-budget.json）───────────────
// 一道统一墙不够：分块各自有加载与体积约束，chart 这种四 tab 合并块天生最大，
// 用同一个数去卡它，其余块就形同没卡。
const budgetPath = path.join(root, 'tools', 'chunk-budget.json');
ok('每块预算表在仓库里', fs.existsSync(budgetPath));
const budget = JSON.parse(fs.readFileSync(budgetPath, 'utf8'));
const caps = budget.caps || {};
ok('预算表覆盖全部分块且不多不少',
  Object.keys(caps).sort().join(',') === Object.keys(CHUNKS).sort().join(','),
  `表里 ${Object.keys(caps).length} 块 / CHUNKS 声明 ${Object.keys(CHUNKS).length} 块`);
ok('闸逐块比对，不是只比硬顶',
  tool.includes('gzKb > capKb') && tool.includes('超出本块预算'));
ok('缺预算算失败（不能靠漏写绕过）', tool.includes('没有独立预算'));
ok('预算只能由 --update-budget 写', tool.includes('--update-budget') && tool.includes('已重建每块预算'));
ok('预算带上生成日期', /^\d{4}-\d{2}-\d{2}$/.test(String(budget.updatedAt || '')), String(budget.updatedAt));

for (const f of files) {
  const name = f.replace(/^client\./, '').replace(/\.js$/, '');
  const gzKb = zlib.gzipSync(fs.readFileSync(path.join(root, f))).length / 1024;
  const capKb = caps[name];
  ok(`${name} 在本块预算内`, typeof capKb === 'number' && gzKb <= capKb,
    `${gzKb.toFixed(1)}KB / 预算 ${capKb}KB`);
  ok(`${name} 预算没超过硬顶`, typeof capKb === 'number' && capKb * 1024 <= CAP,
    `${capKb}KB / 硬顶 ${(CAP / 1024).toFixed(0)}KB`);
}
const capValues = Object.values(caps).filter((n) => typeof n === 'number');
ok('各块预算不是拿同一个数糊上去',
  new Set(capValues).size >= Math.floor(capValues.length * 0.7),
  `${capValues.length} 块里只有 ${new Set(capValues).size} 个不同值`);
