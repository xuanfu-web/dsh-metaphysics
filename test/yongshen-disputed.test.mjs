// 用神「有争议」：调候所忌若正好是扶抑所喜，不能同时出现在喜与忌
// 回归来源：GitHub issue #1 ——「身弱喜火土，给分析成忌火土了」
import fs from 'node:fs';
import vm from 'node:vm';
import { compute, renderText } from '../engine/index.js';
import { buildPlain } from '../engine/interpret-plain.js';
import { ok } from './_harness.mjs';

// 偏弱己土、燥盘：火在扶抑为印（喜），调候却忌火
const HOT = compute({ system: 'bazi', datetime: '1962-03-22T12:00', gender: 'male', address: '安徽池州', withInterpret: true });
const hotYs = HOT.frame.yongshen;
ok('燥盘偏弱：火保留在喜用', hotYs.favor.includes('火'), JSON.stringify(hotYs.favor));
ok('燥盘偏弱：火不再列入忌', !hotYs.avoid.includes('火'), JSON.stringify(hotYs.avoid));
ok('燥盘偏弱：单列有争议', hotYs.disputed.some((d) => d.element === '火' && d.favorRole === '印'), JSON.stringify(hotYs.disputed));
ok('争议十神落在喜用十神内', hotYs.disputedTenGods.every((t) => hotYs.favorTenGods.includes(t)), hotYs.disputedTenGods.join(','));
ok('争议十神不落忌神', hotYs.disputedTenGods.every((t) => !hotYs.avoidTenGods.includes(t)), hotYs.disputedTenGods.join(','));
ok('detail 写明保留在喜用', hotYs.detail.includes('有争议：火') && hotYs.detail.includes('本表保留在喜用'), hotYs.detail);
ok('detail 的调候忌火带标注', hotYs.detail.includes('忌火（有争议）'), hotYs.detail);

// 偏强戊土、寒湿盘：水在扶抑为财（喜），调候却忌水
const COLD = compute({ system: 'bazi', datetime: '2000-01-01T00:00', gender: 'male', address: '安徽池州' });
const coldYs = COLD.frame.yongshen;
ok('寒湿盘偏强：水保留在喜用', coldYs.favor.includes('水'), JSON.stringify(coldYs.favor));
ok('寒湿盘偏强：水不再列入忌', !coldYs.avoid.includes('水'), JSON.stringify(coldYs.avoid));
ok('寒湿盘偏强：财星争议入列', coldYs.disputed.some((d) => d.element === '水' && d.favorRole === '财'), JSON.stringify(coldYs.disputed));

// 无冲突的盘不应凭空生出争议
const PLAIN = compute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'female', address: '安徽池州' });
ok('无冲突盘 disputed 为空', Array.isArray(PLAIN.frame.yongshen.disputed) && PLAIN.frame.yongshen.disputed.length === 0, JSON.stringify(PLAIN.frame.yongshen.disputed));
ok('无冲突盘 detail 不写有争议', !PLAIN.frame.yongshen.detail.includes('有争议'), PLAIN.frame.yongshen.detail);

// 广扫：任何一张盘都不允许同一五行既喜又忌
const overlap = [];
let scanned = 0;
for (let y = 1992; y <= 2008; y += 2) {
  for (let m = 1; m <= 12; m += 2) {
    for (const d of [5, 20]) {
      for (const h of ['00:30', '12:30']) {
        const dt = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}T${h}`;
        const r = compute({ system: 'bazi', datetime: dt, gender: 'male', address: '安徽池州' });
        const ys = r.frame && r.frame.yongshen;
        if (!ys) continue;
        scanned += 1;
        const both = ys.favor.filter((e) => ys.avoid.includes(e));
        if (both.length) overlap.push(`${dt} ${both.join('')}`);
      }
    }
  }
}
ok('广扫喜忌无交集', overlap.length === 0, `${scanned} 盘，冲突 ${overlap.length}：${overlap.slice(0, 3).join('；')}`);
ok('广扫样本足够', scanned >= 200, String(scanned));

// 文本摘要、解读、白话、面板四处都能读到争议
const text = renderText(HOT);
ok('文本摘要行带争议', /用神：.*有争议：火/.test(text), text.split('\n').find((l) => l.startsWith('用神：')) || '');
ok('文本寒暖行带标注', /寒暖：.*忌火（有争议）/.test(text), text.split('\n').find((l) => l.startsWith('寒暖：')) || '');
const yongSec = HOT.interpret.sections.find((s) => s.key === 'yongshen');
const cliSec = HOT.interpret.sections.find((s) => s.key === 'climate');
ok('解读用神节带争议', !!yongSec && yongSec.text.includes('有争议：火'), yongSec && yongSec.text);
ok('解读寒暖节带争议', !!cliSec && cliSec.text.includes('（有争议'), cliSec && cliSec.text);
const plain = buildPlain(HOT);
ok('白话讲清两派分歧', plain.includes('两派说法不一') && plain.includes('火'), plain);
ok('解读自带白话一致', HOT.interpret.plain === plain, HOT.interpret.plain);

// 面板渲染：争议行 + 寒暖卡标注
const sandbox = { window: {}, console };
vm.runInNewContext(fs.readFileSync(new URL('../src/panel-kit.js', import.meta.url), 'utf8'), sandbox, { filename: 'panel-kit.js' });
const PP = sandbox.window.__PP;
const html = PP.baziHTML(HOT);
ok('面板用神行带争议', html.includes('有争议：火') && html.includes('保留在喜用'), '');
ok('面板寒暖卡带标注', html.includes('燥盘调候忌火') && html.includes('（有争议）'), '');
const ysRow = (html.match(/<div class="pp-tl">喜 [\s\S]*?<\/div>/) || [''])[0];
ok('面板喜忌行只出现一次火', (ysRow.match(/火<\/span>/g) || []).length === 1, ysRow);
