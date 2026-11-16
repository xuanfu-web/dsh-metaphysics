// 调候 × 穷通宝鉴：两套取用标准的对齐
// 回归来源：一份输出里「调候要丙火」与「穷通宝鉴首取辛金」并排，两句都像结论，
// 用户不知道该补哪个。这里锁三件事：
//   1) 两者元素相同 → 明说没有分歧；
//   2) 不同且气候失衡 → 调候当急、穷通宝鉴留作结构参考，并交代「一个管冷暖、一个管月令」；
//   3) 不同且气候未失衡 → 调候只作环境偏好，取用按扶抑与月令走。
// 对齐不是强行统一：分歧保留，但主次必须写出来。
import { compute } from '../engine/index.js';
import { ok } from './_harness.mjs';

const at = (dt) => compute({ system: 'bazi', datetime: dt, gender: 'male', address: '北京' });
const ysOf = (dt) => at(dt).frame.yongshen;

// 同向：调候与穷通宝鉴首取都落在火
const SAME = ysOf('1952-01-05T01:30');
ok('同向盘：alignment.same 为真', SAME.alignment.same === true, JSON.stringify(SAME.alignment));
ok('同向盘明说没有分歧', /没有分歧/.test(SAME.alignment.text), SAME.alignment.text);
ok('同向盘写出两层的具体取物', SAME.alignment.text.includes(SAME.alignment.needEl) && /首取/.test(SAME.alignment.text), SAME.alignment.text);

// 不同向、气候失衡：调候压过穷通宝鉴
const HARD = ysOf('1952-03-11T01:30');
ok('失衡盘 climate.priority 为调候优先', HARD.climate.priority === '调候优先', HARD.climate.priority);
ok('失衡盘 alignment 判不同向', HARD.alignment.same === false && HARD.alignment.comparable === true, JSON.stringify(HARD.alignment));
ok('失衡盘写清两层各管什么', /一个管冷暖/.test(HARD.alignment.text) && /一个管月令/.test(HARD.alignment.text), HARD.alignment.text);
ok('失衡盘给出主次：先调候、穷通宝鉴留作结构参考', /先按调候取/.test(HARD.alignment.text) && /结构性参考/.test(HARD.alignment.text), HARD.alignment.text);

// 不同向、气候未失衡：调候只作环境偏好
const SOFT = ysOf('1952-02-07T13:30');
ok('未失衡盘 climate.priority 非调候优先', SOFT.climate.priority !== '调候优先', SOFT.climate.priority);
ok('未失衡盘 alignment 判不同向', SOFT.alignment.same === false && SOFT.alignment.comparable === true, JSON.stringify(SOFT.alignment));
ok('未失衡盘把调候降为环境偏好', /环境偏好/.test(SOFT.alignment.text) && /不作主取/.test(SOFT.alignment.text), SOFT.alignment.text);
ok('未失衡盘点出喜用首选', !SOFT.alignment.primary || SOFT.alignment.text.includes(SOFT.alignment.primary), `${SOFT.alignment.primary} / ${SOFT.alignment.text}`);

// 只有一层有取用（气候平和、调候不出取物）
const ONE = ysOf('1952-04-02T09:30');
ok('单层盘 comparable 为假', ONE.alignment.comparable === false, JSON.stringify(ONE.alignment));
ok('单层盘不算分歧', /谈不上分歧/.test(ONE.alignment.text), ONE.alignment.text);

// 落地到输出：detail 里必须真的带上这段
ok('detail 写出对齐段', SOFT.detail.includes(SOFT.alignment.text), SOFT.detail.slice(0, 200));
ok('detail 里对齐段排在穷通宝鉴之后', SOFT.detail.indexOf('穷通宝鉴：') < SOFT.detail.indexOf(SOFT.alignment.text), 'order');

// 口径：对齐段不给绝对化措辞
for (const [name, y] of [['同向', SAME], ['失衡', HARD], ['未失衡', SOFT], ['单层', ONE]]) {
  ok(`${name}盘对齐段无绝对化措辞`, !/一定|必然|注定|肯定会/.test(y.alignment.text), y.alignment.text);
}

// 与「有争议」机制不打架：争议元素仍只出现在一方
ok('对齐段不改喜忌数组', SOFT.favor.length >= 1 && !SOFT.favor.some((e) => SOFT.avoid.includes(e)), `${SOFT.favor.join('')}/${SOFT.avoid.join('')}`);
