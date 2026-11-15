#!/usr/bin/env node
/**
 * 闸的自检：故意写错的文案必须被 lint-copy 抓到。
 *
 * 没有这一步，闸可能是「永远是绿的」——正则写歪了、目录改名字了、
 * 文件被排除掉了，都不会有人发现。项目里 verify-tests-can-fail 管测试，
 * 这里管文案闸。
 */
import { scanSource } from './lint-copy.mjs';

let pass = 0;
let fail = 0;
function ok(label, cond, extra) {
  if (cond) {
    pass += 1;
    console.log('PASS  ' + label);
  } else {
    fail += 1;
    console.log('FAIL  ' + label + (extra ? '  ' + extra : ''));
  }
}

// 1. 确定性断言必须被抓
const a = scanSource('const t = \'这事必然成\';\n', 'src/x.js');
ok('抓到「必然」', a.length === 1 && a[0].word === '必然', JSON.stringify(a));

// 2. 客服腔必须被抓
const b = scanSource('const t = \'希望对你有帮助\';\n', 'src/x.js');
ok('抓到客服腔', b.length === 1 && b[0].word === '希望对你有帮助');

// 3. 注释里的同类词不算（推导注释本来就会用「必然」「绝对定位」）
const c = scanSource('// 宫格必然挤，所以绝对定位\nconst t = \'盘面\';\n', 'src/x.js');
ok('注释不报', c.length === 0, JSON.stringify(c));

// 4. 否定语境不报
const d = scanSource('const t = \'不必然是坏名\';\n', 'src/x.js');
ok('否定语境不报', d.length === 0, JSON.stringify(d));

// 5. 显式豁免不报
const e = scanSource('const t = \'不对效度作保证\'; // copy-ok: 整句是否定句\n', 'src/x.js');
ok('copy-ok 豁免生效', e.length === 0);

// 6. 引用原文的文件整份跳过
const f = scanSource('const song = \'后来必定享安康\';\n', 'engine/chenggu.js');
ok('引用文件跳过', f.length === 0);

// 7. 不含汉字的行不报（英文标识符、纯数字）
const g = scanSource("const key = 'direction';\n", 'src/x.js');
ok('英文串不报', g.length === 0);

// 8. 同一个词出现两次只报一处（一行一个词一条，够定位）
const h = scanSource('const t = \'必然成，必然发\';\n', 'src/x.js');
ok('一行同词只报一条', h.length === 1, JSON.stringify(h));

// 9. 多行里两行各违规 → 两条
const i = scanSource("const a = '必然成';\nconst b = '注定散';\n", 'src/x.js');
ok('两行两违规各报一条', i.length === 2 && i[0].line === 1 && i[1].line === 2, JSON.stringify(i));

// 10. 位置指对：报的行号是 1-based，能直接跳过去
ok('行号从 1 开始', i[0].line === 1 && i[1].line === 2);

console.log('\n———— ' + pass + ' PASS / ' + fail + ' FAIL ————');
process.exit(fail === 0 ? 0 : 1);
