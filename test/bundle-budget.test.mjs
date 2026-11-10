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
ok('闸按单块预算判超', tool.includes('gz > CHUNK_GZIP_CAP') && tool.includes('超出单块预算'));
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
