// 合盘与单盘的一致性：同一个人，在「单独排盘」和「合盘里的自己」必须得到同一张盘。
//
// 0.14.0 的合盘分支完全没传 address / longitude，两侧都按东八区平太阳时算，
// 于是同一次出生（如 23:40 生于喀什）在单盘是 丁丑 日、在合盘里是 戊寅 日。
import { compute } from '../engine/index.js';
import { ok } from './_harness.mjs';

const A = { datetime: '1990-05-12T23:40', gender: 'male', address: '新疆喀什' };
const B = { datetime: '1992-03-03T10:00', gender: 'female', address: '黑龙江漠河' };

const four = (r) => ['year', 'month', 'day', 'hour'].map((k) => r.pillars[k].ganzhi).join(' ');
const soloA = compute({ system: 'bazi', ...A });
const soloB = compute({ system: 'bazi', ...B });
const hp = compute({ system: 'hepan', ...A, partner: B });

ok('合盘里「你」的四柱与单盘一致', hp.a.pillars.join(' ') === four(soloA), `${hp.a.pillars.join(' ')} vs ${four(soloA)}`);
ok('合盘里「对方」的四柱与单盘一致', hp.b.pillars.join(' ') === four(soloB), `${hp.b.pillars.join(' ')} vs ${four(soloB)}`);
ok('真太阳时确实改变了日柱（喀什 23:40）', four(soloA) !== four(compute({
  system: 'bazi', datetime: '1990-05-12T23:40', gender: 'male',
})), four(soloA));

// 显式给经度时，合盘两侧同样要生效
const hp2 = compute({
  system: 'hepan', datetime: A.datetime, gender: 'male', longitude: 75.99,
  partner: { datetime: B.datetime, gender: 'female', longitude: 122.5 },
});
ok('显式 longitude 也透传到合盘', hp2.a.pillars[2] === soloA.pillars.day.ganzhi, hp2.a.pillars[2]);

// 紫微合盘同理
const zwSolo = compute({ system: 'ziwei', ...A });
const zwHp = compute({ system: 'hepan', chart: 'ziwei', ...A, partner: B });
ok('紫微合盘里的命宫与单盘一致', zwHp.a.soul.branch === zwSolo.soul.branch, `${zwHp.a.soul.branch} vs ${zwSolo.soul.branch}`);
ok('紫微合盘带双方五行局', !!zwHp.a.bureau && !!zwHp.b.bureau);

// 姓名/地址都不给时仍可用（退回东八区平太阳时），只是没有经度修正
const bare = compute({
  system: 'hepan', datetime: '1990-05-12T14:30', gender: 'male',
  partner: { datetime: '1992-03-03T10:00', gender: 'female' },
});
ok('无地址也能合盘', bare.a.pillars.length === 4 && bare.score.total >= 0);
