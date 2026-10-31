// 八字旺衰 · 合会折根与虚透减半。
// 起因：亥月戊寅日、年子时丑这一型，旧算法把丑中己土、寅中戊土当足根，天干己土当实帮，
// 得出「偏强」并忌土；亥子丑会水、寅亥合木后，土根实际被局吸走，应偏弱、喜火土。
import { compute } from '../engine/index.js';
import { ok, eq } from './_harness.mjs';

const bazi = (datetime, extra = {}) => compute({ system: 'bazi', datetime, gender: 'male', trueSolar: false, ...extra });
const gz = (r) => ['year', 'month', 'day', 'hour'].map((k) => r.pillars[k].stem + r.pillars[k].branch).join(' ');
const WEAK = ['偏弱', '身弱'];

// ── 一、亥子丑会水 + 寅亥合木：戊土根被吸走 ────────────────────
const shape = bazi('2008-12-04T01:30', { trace: true });
eq('同型盘四柱', gz(shape), '戊子 癸亥 戊寅 癸丑');
const st = shape.strength;
ok('会水折根后不再判强', WEAK.includes(st.level), `${st.level} ${st.score}`);
ok('记下三会水', st.parts.structure.includes('亥子丑三会水，亥子丑根气按1成计'), JSON.stringify(st.parts.structure));
ok('六合只折局外的寅', st.parts.structure.includes('亥寅合木，寅根气按5成计'), JSON.stringify(st.parts.structure));
eq('无根的戊作虚透', st.parts.virtualHelpers, ['戊']);
ok('detail 带合会折根', st.detail.includes('合会折根：亥子丑三会水'), st.detail);
ok('detail 带虚透减半', st.detail.includes('虚透戊帮扶减半'), st.detail);
ok('措辞是「按N成计」不是「折N成」', !st.detail.includes('根气折'), st.detail);
ok('method 声明简化算法', st.method.includes('三会/三合/六合折根') && st.method.includes('虚透减半') && st.method.includes('非唯一流派'), st.method);
const ys = shape.frame.yongshen;
ok('喜火土', ys.favor.includes('火') && ys.favor.includes('土'), ys.favor.join(''));
ok('忌水木', ys.avoid.includes('水') && ys.avoid.includes('木'), ys.avoid.join(''));
ok('土不再列为忌', !ys.avoid.includes('土'), ys.avoid.join(''));

// ── 二、推导链旺衰层同步列出折根与虚透 ─────────────────────────
const layer = shape.trace[0];
const row = (label) => layer.inputs.find((x) => x.label === label);
ok('推导链有合会折根一行', !!row('合会折根') && row('合会折根').value.includes('亥子丑三会水'), JSON.stringify(layer.inputs));
eq('推导链有虚透一行', row('虚透') && row('虚透').value, '戊');
ok('推导链来源注明折根', layer.source.includes('三会/三合/六合折根'), layer.source);

// ── 三、三合 / 六合 / 局内支不被六合重复折 ─────────────────────
const sanhe = bazi('1951-09-26T01:30');
eq('三合样本四柱', gz(sanhe), '辛卯 丁酉 己巳 乙丑');
ok('巳酉丑合金，己土根按2成计', sanhe.strength.parts.structure.includes('巳酉丑三合金，巳酉丑根气按2成计'),
  JSON.stringify(sanhe.strength.parts.structure));

const liuhe = bazi('1950-11-20T01:30');
eq('六合样本四柱', gz(liuhe), '庚寅 丁亥 己未 乙丑');
eq('无会合局时六合两支各折半', liuhe.strength.parts.structure, ['寅亥合木，寅亥根气按5成计']);

const mixed = bazi('1952-08-22T01:30');
eq('三合加六合样本四柱', gz(mixed), '壬辰 戊申 庚子 丁丑');
eq('子已入水局，子丑合只折丑', mixed.strength.parts.structure,
  ['申子辰三合水，申子辰根气按2成计', '子丑合土，丑根气按8成计']);

const sameEl = bazi('1950-11-13T01:30');
eq('同类会局样本四柱', gz(sameEl), '庚寅 丁亥 壬子 辛丑');
ok('会成日主本气不折', !sameEl.strength.parts.structure.some((s) => s.includes('三会')), JSON.stringify(sameEl.strength.parts.structure));
eq('亥归水方，寅亥合不再折亥', sameEl.strength.parts.structure, ['寅亥合木，寅根气按5成计']);
ok('壬日亥子丑会水仍身强', sameEl.strength.level === '身强', `${sameEl.strength.level} ${sameEl.strength.score}`);

const yin = bazi('1950-03-13T07:30');
eq('印局样本四柱', gz(yin), '庚寅 己卯 丁未 甲辰');
ok('会成印局按6成计', yin.strength.parts.structure.includes('寅卯辰三会木，寅卯辰根气按6成计'), JSON.stringify(yin.strength.parts.structure));

// ── 四、无合会的盘不受影响 ────────────────────────────────────
const plain = bazi('1990-05-12T14:30');
eq('无合会盘不记折根', plain.strength.parts.structure, []);
eq('有根的天干不作虚透', plain.strength.parts.virtualHelpers, []);
ok('detail 不出现合会折根', !plain.strength.detail.includes('合会折根'), plain.strength.detail);

// ── 五、分布不塌缩：任一档都不超过四成 ─────────────────────────
const count = {};
let total = 0;
for (let y = 1960; y <= 2019; y += 3) {
  for (const md of ['01-15', '04-15', '07-15', '10-15']) {
    for (const hh of ['03:00', '11:00', '19:00']) {
      const r = bazi(`${y}-${md}T${hh}`);
      count[r.strength.level] = (count[r.strength.level] || 0) + 1;
      total++;
    }
  }
}
eq('五档都会出现', ['身强', '偏强', '中和', '偏弱', '身弱'].filter((k) => count[k] > 0).length, 5);
ok('没有一档超过四成', Object.values(count).every((n) => n / total <= 0.4), JSON.stringify(count));
