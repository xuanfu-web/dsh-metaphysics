// 结构校验：真正调用渲染器，检查运限切换、自化、斗君是否生成
import fs from 'node:fs';
import vm from 'node:vm';
import { assemble } from '../tools/build-client.mjs';

const ok = (label, cond, extra = '') =>
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${label}${extra ? '  -> ' + extra : ''}`);

const reactStub = { createElement: () => null, useState: () => [null, () => {}] };

// 取引擎
let cap = null;
vm.runInNewContext(assemble('return { inject: [], apply() {}, engine: Engine };'), {
  window: { __ModuleLoader__: { load: (m) => { cap = m; } } },
  console,
}, { filename: 'probe.js' });
const E = cap.factory(() => reactStub).engine;

const r = E.compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'female' });
ok('palace 带 selfHua', Array.isArray(r.palaces[0].selfHua), String(r.palaces.filter((p) => p.selfHua.length).length));
ok('斗君字段', !!r.doujun && !!r.doujun.zinian, r.doujun && r.doujun.zinian);
ok('流年带斗君', !!r.liunian[0].doujun, r.liunian[0].doujun);

// 取渲染器
const sandbox = { window: { Engine: E }, console };
vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
const PP = sandbox.window.__PP;
ok('渲染器加载', !!PP && typeof PP.ziweiHTML === 'function');

const out = PP.ziweiHTML(r);
ok('三档 radio 齐全', ['ppm-ben', 'ppm-da', 'ppm-ln'].every((id) => out.includes(`id="${id}"`)));
ok('三个 pp-body 齐全', ['ben', 'da', 'ln'].every((k) => out.includes(`pp-body ${k}`)));
ok('含斗君文案', out.includes('子年斗君') && out.includes('流年斗君'));
ok('含自化标记', out.includes('pp-zh'), (out.match(/pp-zh/g) || []).length + ' 处');
ok('含三方底纹', out.includes('pp-tri'));
ok('含 12 宫格 x3', (out.match(/pp-cell/g) || []).length === 36, String((out.match(/pp-cell/g) || []).length));

// 三档的宫名排布应不同（大限/流年命宫不同）
const bodies = {};
for (const k of ['ben', 'da', 'ln']) {
  const i = out.indexOf(`pp-body ${k}`);
  const seg = out.slice(i, out.indexOf('pp-body', i + 10) > 0 ? out.indexOf('pp-body', i + 10) : out.length);
  bodies[k] = (seg.match(/class="pn">([^<]+)</g) || []).join(',');
}
ok('本命与流年宫名排布不同', bodies.ben !== bodies.ln || bodies.ben !== bodies.da);

// ── 塔罗 ──
const t = E.compute({ system: 'tarot', count: 3 });
ok('塔罗抽 3 张', t.cards.length === 3, t.cards.map((c) => c.name).join('/'));
ok('塔罗正逆位与关键词', t.cards.every((c) => ['正位', '逆位'].includes(c.orientation) && c.keywords.length >= 2));
ok('塔罗带解读段', Array.isArray(t.reading) && t.reading.length >= 3, String((t.reading || []).length));
ok('塔罗 78 张牌齐全', (() => { const s = new Set(); for (let i = 0; i < 60; i++) E.compute({ system: 'tarot', count: 5 }).cards.forEach((c) => s.add(c.name)); return s.size > 60; })(), String(new Set(E.compute({ system: 'tarot', count: 5 }).cards.map((c) => c.name)).size));
const tHTML = sandbox.window.__PP.tarotHTML(t);
ok('塔罗渲染出卡片', (tHTML.match(/tt-card/g) || []).length === 3);

// ── 八字强弱与运限关系 ──
const b = E.compute({ system: 'bazi', datetime: '1996-01-19T07:40', gender: 'male' });
ok('日主强弱有档位', ['身强', '偏强', '中和', '偏弱', '身弱'].includes(b.strength.level), `${b.strength.level} ${b.strength.score}`);
ok('大运带关系字段', Array.isArray(b.dayun.list[0].relations), JSON.stringify(b.dayun.list[0].relations));
ok('流年带关系字段', Array.isArray(b.liunian[0].relations));
ok('八字渲染含强弱行', sandbox.window.__PP.baziHTML(b).includes('日主强弱'));

// ── 地址 -> 经度 ──
const AG = E.compute({ system: 'bazi', datetime: '1996-01-19T07:40', gender: 'male', address: '河北石家庄' });
ok('地级市地址解析', AG.input.geo && AG.input.geo.matched === '石家庄', AG.input.geo && AG.input.geo.note);
ok('地址生效改变真太阳时', AG.solarTime.trueSolarText !== '1996-01-19 07:40', AG.solarTime.trueSolarText);
const AP = E.compute({ system: 'bazi', datetime: '1996-01-19T07:40', gender: 'male', address: '内蒙古' });
ok('省名退回省会', AP.input.geo && AP.input.geo.level === '省会', AP.input.geo && AP.input.geo.note);
const AN = E.compute({ system: 'bazi', datetime: '1996-01-19T07:40', gender: 'male', address: '火星基地' });
ok('未知地址给提示', AN.input.geo && AN.input.geo.level === '未匹配', AN.input.geo && AN.input.geo.note);
const AL = E.compute({ system: 'bazi', datetime: '1996-01-19T07:40', gender: 'male', address: '116.4' });
ok('纯数字按经度', AL.input.geo && AL.input.geo.level === '经度');
const AC = E.compute({ system: 'bazi', datetime: '1996-01-19T07:40', gender: 'male', address: '四川成都' });
const AK = E.compute({ system: 'bazi', datetime: '1996-01-19T07:40', gender: 'male', address: '新疆喀什' });
ok('东西部时差合理', AC.input.longitude > AK.input.longitude && AC.input.longitude < 105 && AK.input.longitude < 80,
  `${AC.input.longitude} vs ${AK.input.longitude}`);

// ── 紫微同样接真太阳时（换时辰 → 换命宫）──
const ZB = E.compute({ system: 'ziwei', datetime: '1996-01-19T07:40', gender: 'male', address: '北京' });
const ZK = E.compute({ system: 'ziwei', datetime: '1996-01-19T07:40', gender: 'male', address: '新疆喀什' });
ok('紫微按真太阳时换时辰', ZB.hourBranch === '辰' && ZK.hourBranch === '寅', `${ZB.hourBranch}/${ZK.hourBranch}`);
ok('紫微命宫随之改变', ZB.soul.branch !== ZK.soul.branch, `${ZB.soul.branch}/${ZK.soul.branch}`);
ok('紫微输出带真太阳时', !!(ZK.solarTime && ZK.solarTime.trueSolarText), ZK.solarTime && ZK.solarTime.trueSolarText);

// ── 梅花易数 ──
const MH = E.compute({ system: 'meihua', mode: 'time', datetime: '1996-01-19T07:40' });
ok('梅花时间起卦', MH.ben.name === '雷天大壮' && MH.moving === 3, `${MH.ben.name} 动${MH.moving}`);
ok('梅花互卦/变卦/错综', MH.hu.name === '泽天夬' && MH.bian.name === '雷泽归妹' && MH.cuo.name === '风地观' && MH.zong.name === '天雷无妄',
  `${MH.hu.name}/${MH.bian.name}/${MH.cuo.name}/${MH.zong.name}`);
ok('梅花体用', MH.bodyUse.body.trigram === '震' && MH.bodyUse.use.trigram === '乾' && MH.bodyUse.level === '凶',
  `${MH.bodyUse.body.trigram}/${MH.bodyUse.use.trigram}/${MH.bodyUse.level}`);
const MN = E.compute({ system: 'meihua', mode: 'number', upper: 17, lower: 23 });
ok('梅花数字起卦确定性', MN.ben.name === '天山遁' && MN.moving === 4, `${MN.ben.name} 动${MN.moving}`);
ok('梅花渲染', sandbox.window.__PP.meihuaHTML(MH).includes('本卦'));

// ── 大六壬 ──
const DL = E.compute({ system: 'daliuren', datetime: '1996-01-19T07:40' });
ok('六壬日干支与时辰', DL.dayGanZhi === '乙卯' && DL.hourZhi === '辰', `${DL.dayGanZhi} ${DL.hourZhi}`);
ok('六壬月将按小寒取丑', DL.yueJiang.zhi === '丑' && DL.jieqi.name === '小寒', `${DL.yueJiang.name}${DL.yueJiang.zhi}/${DL.jieqi.name}`);
ok('天盘为十二支排列', new Set(DL.pan.map((p) => p.tian)).size === 12);
ok('月将加时：地盘辰得天盘丑', DL.pan.find((p) => p.di === '辰').tian === '丑');
ok('四课四层', DL.siKe.length === 4 && DL.siKe[0].shang === '丑' && DL.siKe[3].shang === '酉',
  DL.siKe.map((k) => `${k.shang}上${k.xia}下`).join(' '));
ok('三传为贼克重审', DL.geJu.name === '贼克' && DL.geJu.detail === '重审' && DL.sanChuan.chu.zhi === '丑',
  `${DL.geJu.name}·${DL.geJu.detail} 初${DL.sanChuan.chu.zhi}`);
ok('三传顺推 丑→戌→未', DL.sanChuan.zhong.zhi === '戌' && DL.sanChuan.mo.zhi === '未',
  `${DL.sanChuan.chu.zhi}/${DL.sanChuan.zhong.zhi}/${DL.sanChuan.mo.zhi}`);
ok('旬空标在初传', DL.sanChuan.chu.xunKong === '丑', String(DL.sanChuan.chu.xunKong));
ok('六壬渲染', sandbox.window.__PP.daliurenHTML(DL).includes('初传'));

// ── 八字神煞渲染 ──
const BZ = E.compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'female', trueSolar: false });
const bzHTML = sandbox.window.__PP.baziHTML(BZ);
const chips = (bzHTML.match(/pp-ssi/g) || []).length;
ok('八字渲染含神煞全览', bzHTML.includes('神煞全览') && bzHTML.includes('pp-ssg'), String(chips));
ok('神煞按吉凶分色', /pp-ssi (good|bad|neutral)/.test(bzHTML));
ok('神煞带查法提示', bzHTML.includes('title="') && bzHTML.includes('查'));
ok('全览条目数 = 分组条目数', chips === BZ.shensha.groups.reduce((n, g) => n + g.items.length, 0), `${chips}`);
ok('神煞行与全览同名', BZ.shensha.names.every((n) => bzHTML.includes(n)), BZ.shensha.names.join('、'));

// ── 格局 / 用神 / 行运渲染 ──
ok('八字渲染含格局节', bzHTML.includes('格局') && BZ.frame.geju.every((g) => bzHTML.includes(g.name)), BZ.frame.geju.map((g) => g.name).join('、'));
ok('八字渲染含用神节', bzHTML.includes('用神') && bzHTML.includes(BZ.frame.yongshen.detail.slice(0, 8)));
ok('用神喜忌五行上色', BZ.frame.yongshen.favor.every((e) => bzHTML.includes(`wx-${{ 木: 'wood', 火: 'fire', 土: 'earth', 金: 'metal', 水: 'water' }[e]}`)));
ok('八字渲染含十神权重', bzHTML.includes('十神') && bzHTML.includes('五行与十神'));
ok('大运 chip 带吉凶档位', bzHTML.includes('大吉') || bzHTML.includes('大忌'));
ok('八字渲染含流年节', bzHTML.includes('流年') && bzHTML.includes(String(BZ.liunian[0].year)));
ok('忌运 chip 用 warn 样式', BZ.dayun.list.some((d) => ['忌', '大忌'].includes(d.luck.tier)) ? bzHTML.includes('pp-chip warn') : true);

// ── 紫微格局 / 大限 / 流年四化渲染 ──
const ZW = E.compute({ system: 'ziwei', datetime: '1990-05-12T14:30', gender: 'female', trueSolar: false });
const zwHTML = sandbox.window.__PP.ziweiHTML(ZW);
ok('紫微格局名全部渲染', ZW.patterns.every((p) => zwHTML.includes(p.name)), ZW.patterns.map((p) => p.name).join('、'));
ok('紫微格局带证据提示', ZW.patterns.every((p) => zwHTML.includes(String(p.evidence || '').replace(/"/g, '&quot;').slice(0, 8))));
ok('紫微大限 chip 渲染', ZW.daxianList.slice(0, 6).every((d) => zwHTML.includes(`${d.branch} ${d.ages[0]}-${d.ages[1]}`)));
ok('流年四化落宫渲染', ZW.liunian[0].mutagenHits.every((m) => zwHTML.includes(`${m.star}化${m.type}`)));

// ── 塔罗新字段渲染 ──
const TT = E.compute({ system: 'tarot', count: 3, question: '渲染测试', at: '2026-10-21T20:00' });
const ttHTML = sandbox.window.__PP.tarotHTML(TT);
ok('塔罗渲染含牌名', TT.cards.every((c) => ttHTML.includes(c.name)));
ok('塔罗渲染含核心义', TT.cards.every((c) => ttHTML.includes(c.core.slice(0, 6))));
ok('塔罗渲染含位义提示', TT.cards.every((c) => ttHTML.includes(String(c.positionHint || '').replace(/"/g, '&quot;').slice(0, 6))));
ok('塔罗渲染含象征声明', ttHTML.includes(TT.systemNote.slice(0, 8)));
console.log('  本命首宫:', bodies.ben.slice(0, 40));
console.log('  大限首宫:', bodies.da.slice(0, 40));
console.log('  流年首宫:', bodies.ln.slice(0, 40));
