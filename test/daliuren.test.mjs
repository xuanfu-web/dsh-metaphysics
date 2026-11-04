// 大六壬引擎断言（统一 ok()/eq() 风格，便于和其它测试一样统计 PASS/FAIL）
import { buildDaliuren, ZHI } from '../engine/daliuren.js';

let pass = 0;
let fail = 0;
const eq = (a, b, name) => {
  if (a === b) { pass++; console.log(`PASS  ${name}`); return; }
  fail++; console.log(`FAIL  ${name}  -> 期望 ${JSON.stringify(b)}，实际 ${JSON.stringify(a)}`);
};
const ok = (cond, name, extra = '') => {
  if (cond) { pass++; console.log(`PASS  ${name}`); return; }
  fail++; console.log(`FAIL  ${name}${extra ? `  -> ${extra}` : ''}`);
};
const throws = (fn, name) => {
  try { fn(); } catch (e) { pass++; console.log(`PASS  ${name}`); return; }
  fail++; console.log(`FAIL  ${name}  -> 未抛错`);
};

const r = buildDaliuren({ year: 1996, month: 1, day: 19, hour: 7, minute: 31 });

// —— 结构 ——
eq(r.system, 'daliuren', 'system 字段');
eq(r.dayGanZhi, '乙卯', '1996-01-19 日干支=乙卯');
eq(r.hourZhi, '辰', '07:31 辰时');
ok(['昼', '夜'].includes(r.dayNight), '昼贵/夜贵取值合法', r.dayNight);
eq(r.pan.length, 12, '天地盘 12 宫');
ok(r.pan.every((p) => ZHI.includes(p.di)), '地盘都是十二支');
ok(r.pan.every((p) => ZHI.includes(p.tian)), '天盘都是十二支');
ok(r.pan.every((p) => p.jiang && p.jiangFull), '每宫都有天将');
ok(Boolean(r.yueJiang.name && r.yueJiang.zhi), '月将有名称与地支');

// —— 四课 ——
eq(r.siKe.length, 4, '四课齐全');
eq(r.siKe[0].position, 1, '第一课序号=1');
ok(r.siKe.every((k) => ['比和', '克', '被克', '生', '被生', '下贼上', '上克下'].some((x) => k.relation.includes(x) || k.relation === x)),
  '四课关系都在已知集合内', r.siKe.map((k) => k.relation).join('/'));

// —— 三传 ——
ok(['chu', 'zhong', 'mo'].every((k) => ZHI.includes(r.sanChuan[k].zhi)), '三传都是十二支');
ok(['chu', 'zhong', 'mo'].every((k) => r.sanChuan[k].jiang && r.sanChuan[k].liuQin), '三传都有天将与六亲');

// —— 天地盘自洽：天盘 = 地盘 + 月将偏移 ——
const shift = (ZHI.indexOf(r.pan[0].tian) - ZHI.indexOf(r.pan[0].di) + 12) % 12;
ok(r.pan.every((p) => ZHI[(ZHI.indexOf(p.di) + shift) % 12] === p.tian), '天盘按固定偏移落在每个地支上');

// —— 返吟时三传应对冲 ——
if (r.geJu.name === '返吟') {
  const CHONG = { 子: '午', 午: '子', 丑: '未', 未: '丑', 寅: '申', 申: '寅', 卯: '酉', 酉: '卯', 辰: '戌', 戌: '辰', 巳: '亥', 亥: '巳' };
  eq(r.sanChuan.zhong.zhi, CHONG[r.sanChuan.chu.zhi], '返吟：中传与初传对冲');
} else {
  ok(true, '本盘非返吟，跳过对冲自查');
}

// —— 伏吟三传：旧实现让中/末走天地盘递推，天地盘相同 ⇒ 三传恒等 ——
const ZW = { 子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火', 午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水' };
const GAN_W = { 甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土', 己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水' };
const KE = { 水: '火', 火: '金', 金: '木', 木: '土', 土: '水' };
const d2tOf = (x) => { const m = {}; x.pan.forEach((p) => { m[p.di] = p.tian; }); return m; };
const t2dOf = (x) => { const m = {}; x.pan.forEach((p) => { m[p.tian] = p.di; }); return m; };
const GAN_JI = { 甲: '寅', 乙: '辰', 丙: '巳', 丁: '未', 戊: '巳', 己: '未', 庚: '申', 辛: '戌', 壬: '亥', 癸: '丑' };

const fyGan = buildDaliuren({ year: 2026, month: 1, day: 2, hour: 1, minute: 30 });
eq(fyGan.geJu.name, '伏吟', '丙子日丑时成伏吟');
eq(fyGan.geJu.detail, '自任', '阳日无克取自任');
eq(fyGan.sanChuan.chu.zhi, GAN_JI['丙'], '自任初传取干上（干寄宫）');
ok(fyGan.sanChuan.chu.zhi !== fyGan.sanChuan.zhong.zhi || fyGan.sanChuan.zhong.zhi !== fyGan.sanChuan.mo.zhi,
  '伏吟三传不再恒等', [fyGan.sanChuan.chu.zhi, fyGan.sanChuan.zhong.zhi, fyGan.sanChuan.mo.zhi].join(''));

const fyYin = buildDaliuren({ year: 2026, month: 1, day: 3, hour: 1, minute: 30 });
eq(fyYin.geJu.detail, '杜传', '阴日无克取杜传');
eq(fyYin.sanChuan.chu.zhi, '丑', '杜传初传取支上（日支）');
ok(fyYin.sanChuan.zhong.zhi !== fyYin.sanChuan.chu.zhi, '杜传中传按刑链另取');

const fyKe = buildDaliuren({ year: 2026, month: 1, day: 1, hour: 1, minute: 30 });
eq(fyKe.geJu.name, '伏吟', '乙亥日丑时成伏吟');
eq(fyKe.geJu.detail, '有克', '四课有克时不能按无克的自任/杜传走');
ok(fyKe.siKe.some((k) => (k.relation === '下贼上' || k.relation === '上克下') && k.shang === fyKe.sanChuan.chu.zhi),
  '伏吟有克：初传取自那节克课的上神', fyKe.siKe.map((k) => `${k.shang}/${k.relation}`).join(' '));

// 初传自刑（辰午酉亥）时中传要换到「另一个」上神。有克伏吟的初传常常就是第 1 课上神，
// 兜底若固定按日阳/阴取支上或干上，两者就撞成同一个字——0.61.2 的 218 盘自刑伏吟里 74 盘
// 中传==初传，本盘（2026-01-01T01:30）是 辰/辰/戌。
const ZIXING = new Set(['辰', '午', '酉', '亥']);
ok(fyKe.sanChuan.zhong.zhi !== fyKe.sanChuan.chu.zhi, '自刑初传：中传换掉了，不等于初传',
  [fyKe.sanChuan.chu.zhi, fyKe.sanChuan.zhong.zhi, fyKe.sanChuan.mo.zhi].join('/'));
ok('自刑初传：中传仍自刑时末传取冲', ZIXING.has(fyKe.sanChuan.zhong.zhi) ? fyKe.sanChuan.mo.zhi !== fyKe.sanChuan.zhong.zhi : true,
  [fyKe.sanChuan.chu.zhi, fyKe.sanChuan.zhong.zhi, fyKe.sanChuan.mo.zhi].join('/'));
let ziCharts = 0, ziDup = [];
for (let i = 0; i < 400; i++) {
  const d = new Date(Date.UTC(2024, 0, 1) + i * 86400000);
  for (const hour of [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23]) {
    const c = buildDaliuren({ year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate(), hour, minute: 30 });
    if (c.geJu.name !== '伏吟') continue;
    const t = [c.sanChuan.chu.zhi, c.sanChuan.zhong.zhi, c.sanChuan.mo.zhi];
    if (ZIXING.has(t[0])) {
      ziCharts += 1;
      if (t[1] === t[0] || t[2] === t[1]) ziDup.push(t.join('/'));
    }
  }
}
ok('样本够多（400 天 ×12 时确实扫到自刑伏吟）', ziCharts > 50, `${ziCharts} 盘`);
ok('扫 400 天：自刑伏吟不再有 中传==初传 / 末传==中传', ziDup.length === 0, `${ziDup.length} 盘：${ziDup.slice(0, 5).join(' ')}`);

// —— 昴星：阳日虎视 / 阴日冬蛇掩目，中末按干上、支上分取 ——
const mxYang = buildDaliuren({ year: 2024, month: 1, day: 4, hour: 23, minute: 0 });
const mxY = d2tOf(mxYang);
eq(mxYang.geJu.name, '昴星', '戊辰日成昴星');
eq(mxYang.geJu.detail, '虎视', '阳日取虎视');
eq(mxYang.sanChuan.chu.zhi, mxY['酉'], '虎视初传取地盘酉上神');
eq(mxYang.sanChuan.zhong.zhi, mxY[mxYang.dayGanZhi[1]], '虎视中传取支上神');
eq(mxYang.sanChuan.mo.zhi, mxY[GAN_JI[mxYang.dayGanZhi[0]]], '虎视末传取干上神');

const mxYin = buildDaliuren({ year: 2024, month: 1, day: 6, hour: 0, minute: 0 });
const mxT = t2dOf(mxYin);
const mxYinD = d2tOf(mxYin);
eq(mxYin.geJu.detail, '冬蛇掩目', '阴日取冬蛇掩目');
eq(mxYin.sanChuan.chu.zhi, mxT['酉'], '冬蛇掩目初传取天盘酉下神');
eq(mxYin.sanChuan.zhong.zhi, mxYinD[GAN_JI[mxYin.dayGanZhi[0]]], '冬蛇掩目中传取干上神');
eq(mxYin.sanChuan.mo.zhi, mxYinD[mxYin.dayGanZhi[1]], '冬蛇掩目末传取支上神');

// —— 八专：从干上/支上神起顺逆数三神，不是从日支±2 ——
const bz = buildDaliuren({ year: 2024, month: 2, day: 18, hour: 17, minute: 0 });
const bzD = d2tOf(bz);
const bzGan = bzD[GAN_JI[bz.dayGanZhi[0]]];
const bzZhi = bzD[bz.dayGanZhi[1]];
eq(bz.geJu.name, '八专', '壬子日成八专');
eq(bz.sanChuan.chu.zhi, ZHI[(ZHI.indexOf(bzGan) + 2) % 12], '八专阳日初传从干上神顺数三神');
eq(bz.sanChuan.zhong.zhi, bzZhi, '八专中传取支上神');
eq(bz.sanChuan.mo.zhi, bzGan, '八专末传取干上神');

// —— 遥克：先蒿矢后弹射，不被前面那节的弹射挡掉 ——
const yk = buildDaliuren({ year: 2024, month: 1, day: 28, hour: 19, minute: 0 });
const ykW = GAN_W[yk.dayGanZhi[0]];
const hao = yk.siKe.find((k) => KE[ZW[k.shang]] === ykW); // 上神克日干（蒿矢）
const tan = yk.siKe.find((k) => KE[ykW] === ZW[k.shang]); // 日干克上神（弹射）
eq(yk.geJu.name, '遥克', '辛卯日成遥克');
ok(!!hao && yk.sanChuan.chu.zhi === hao.shang, '遥克优先取蒿矢（克我者）', hao ? hao.shang : '无');
ok(!!tan && yk.siKe.indexOf(tan) < yk.siKe.indexOf(hao), '样本里弹射排在蒿矢之前（否则锁不住优先规则）',
  tan ? `弹射第 ${yk.siKe.indexOf(tan) + 1} 课，蒿矢第 ${yk.siKe.indexOf(hao) + 1} 课` : '本盘无弹射');

// —— 晚子时与缺参 ——
eq(buildDaliuren({ year: 2024, month: 5, day: 1, hour: 23, minute: 5 }).hourZhi, '子', '23:05 属子时');
throws(() => buildDaliuren({}), '缺时间参数应抛错');

console.log(`\n———— daliuren ${pass} PASS / ${fail} FAIL ————`);
if (fail) process.exit(1);
