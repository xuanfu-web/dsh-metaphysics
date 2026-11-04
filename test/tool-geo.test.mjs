// 工具层的地址解析策略：默认离线、显式才联网、同地址不重复请求。
//
// 0.14.1 及以前：只要地址写了区县，工具就自动发一次 Nominatim 请求（还把 UA 停在 0.2），
// 既违背 README 的隐私承诺，也让每次排盘多出最多 2.5 秒。
import { apply } from '../index.js';
import { resolveAddress } from '../engine/geo.js';
import { ok } from './_harness.mjs';

let def = null;
apply({ tools: { register: (d) => { def = d; return () => {}; } }, effect: (fn) => fn() });
ok('工具定义已注册', !!def && typeof def.execute === 'function');

// ── ① schema 自描述 ─────────────────────────────────────────
const props = def.parameters.properties;
ok('schema 声明 geocode 枚举', JSON.stringify(props.geocode && props.geocode.enum) === '["offline","online"]');
ok('schema 声明 seed', !!props.seed && props.seed.type === 'number');
ok('schema 说明 asOf 覆盖三个体系', /紫微/.test(props.asOf.description) && /八字/.test(props.asOf.description) && /塔罗/.test(props.asOf.description));

// ── ② 默认离线：不允许发网络请求 ────────────────────────────
let fetchCalls = 0;
globalThis.fetch = () => {
  fetchCalls += 1;
  throw new Error('离线模式下不应发起网络请求');
};

const offline = await def.execute({
  system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '新疆喀什地区疏附县',
});
ok('默认离线不发起 fetch', fetchCalls === 0, `fetch 调用 ${fetchCalls} 次`);
ok('离线仍能按内置表取到经度', typeof offline.input.longitude === 'number', String(offline.input.longitude));
ok('离线结果标明坐标来源等级', !!offline.input.geo && !!offline.input.geo.level, offline.input.geo && offline.input.geo.level);

// ── ③ 显式联网：读到结果并缓存 ──────────────────────────────
const calls = [];
globalThis.fetch = async (url) => {
  calls.push(String(url));
  return {
    ok: true,
    json: async () => [{ lon: '75.98932', lat: '39.47041', display_name: '疏附县, 喀什地区, 新疆' }],
  };
};

const online1 = await def.execute({
  system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '新疆喀什地区疏附县', geocode: 'online',
});
ok('显式 online 会联网一次', calls.length === 1, `fetch 调用 ${calls.length} 次`);
ok('联网结果被采用', Math.abs(online1.input.longitude - 75.98932) < 1e-6, String(online1.input.longitude));
ok('联网结果标注为在线解析', !!online1.input.geo && online1.input.geo.level === '在线');

const online2 = await def.execute({
  system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '新疆喀什地区疏附县', geocode: 'online',
});
ok('同地址第二次命中缓存', calls.length === 1, `fetch 调用 ${calls.length} 次`);
ok('缓存结果一致', online2.input.longitude === online1.input.longitude);

// ── ④ 非法 geocode 值 ──────────────────────────────────────
let code = '';
try {
  await def.execute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', geocode: 'auto' });
} catch (e) {
  code = e.message;
}
ok('非法 geocode 报 E_INPUT', code.startsWith('[E_INPUT]'), code);

// ── ⑤ 合盘：双方地址都走同一策略（默认离线，不发请求）──────
const before = calls.length;
const hp = await def.execute({
  system: 'hepan', datetime: '1990-05-12T14:30', gender: 'male', address: '河北石家庄',
  partner: { datetime: '1992-03-03T10:00', gender: 'female', address: '黑龙江漠河' },
});
ok('合盘默认离线不联网', calls.length === before, `fetch 调用 ${calls.length - before} 次`);
ok('合盘双方都带经度', typeof hp.a.longitude === 'number' && typeof hp.b.longitude === 'number', `${hp.a.longitude}, ${hp.b.longitude}`);

// 三方合盘：第三方的地址也要走同一条解析，不能只有主方与对方拿到精确经度
const before3 = calls.length;
const hp3 = await def.execute({
  system: 'hepan', datetime: '1990-05-12T14:30', gender: 'male', address: '四川省甘孜州稻城县', geocode: 'online',
  partner: { datetime: '1992-03-03T10:00', gender: 'female', address: '青海省果洛州玛沁县' },
  partner2: { datetime: '1988-09-09T08:00', gender: 'male', address: '西藏阿里地区改则县' },
});
ok('三方合盘：三个人各解析一次', calls.length - before3 === 3, `fetch 调用 ${calls.length - before3} 次`);
ok('三方合盘产出三对关系', !!hp3.triple && hp3.triple.pairs.length === 3, hp3.triple && hp3.triple.pairs.map((x) => x.key).join(','));

// ── ⑥ 同名区县 / 同名路名：不能套用同名城市 ──────────────────
// 「中山区」在大连，内置表里另有「中山」市；「朝阳区」同名但分属北京与长春。
// 旧逻辑先匹配城市名，于是「大连市中山区」被算成广东中山，「河北区」被算成河北省会。
const geoCase = (addr) => resolveAddress(addr);
ok('大连市中山区 → 大连（不是中山市）', geoCase('大连市中山区人民路').matched === '大连', JSON.stringify(geoCase('大连市中山区人民路')));
ok('北京市朝阳区 → 北京', geoCase('北京市朝阳区建国路').matched === '北京', JSON.stringify(geoCase('北京市朝阳区建国路')));
ok('吉林省长春市朝阳区 → 长春（不被同名区带到北京）', geoCase('吉林省长春市朝阳区').matched === '长春', JSON.stringify(geoCase('吉林省长春市朝阳区')));
ok('辽宁省朝阳市 → 朝阳（显式市名优先）', geoCase('辽宁省朝阳市').matched === '朝阳', JSON.stringify(geoCase('辽宁省朝阳市')));
ok('单独「朝阳区」默认北京', geoCase('朝阳区').matched === '北京' && geoCase('朝阳区').level === '区县', JSON.stringify(geoCase('朝阳区')));
ok('「河北区」不按河北省会算', geoCase('河北区').matched === null, JSON.stringify(geoCase('河北区')));
ok('「中山路」缺城市线索时不猜', (() => {
  const r = geoCase('中山路');
  return r.matched === null && r.lon === null && r.note.includes('路名');
})(), JSON.stringify(geoCase('中山路')));
ok('补上城市后「厦门市中山路」能定位', geoCase('厦门市中山路').matched === '厦门', JSON.stringify(geoCase('厦门市中山路')));

// ── ⑦ 同名县：挡「区」不能把「县」一起拉黑 ────────────────────
// 上一轮为了「大连市中山区」不再被算成广东中山，把 区/县 都塞进黑名单，
// 结果长沙县、乌鲁木齐县这类真实出生地整个解析失败——未匹配会静默取消真太阳时，
// 摘要还会打「未提供出生地或经度」，用户看不出少算了什么。
// 口径：县 按本辖区城区经度估算、档位写「区县」；镇/乡/路 仍挡（重庆开州区真有一个长沙镇）。
const county = (addr) => geoCase(addr);
for (const [addr, lon, city] of [['长沙县', 112.94, '长沙'], ['湖南省长沙县', 112.94, '长沙'],
  ['乌鲁木齐县', 87.62, '乌鲁木齐'], ['承德县', 117.96, '承德']]) {
  const g = county(addr);
  ok(`「${addr}」按 ${city} 城区估算`, g.lon === lon && g.level === '区县' && String(g.matched).endsWith('县'), JSON.stringify(g));
}
ok('县档位的 note 说清是借用', /城区估算/.test(county('长沙县').note), county('长沙县').note);
ok('「长沙镇」仍不按湖南长沙算', county('重庆市开州区长沙镇').matched === '重庆', JSON.stringify(county('重庆市开州区长沙镇')));
ok('「中山路」仍不猜城市', county('中山路').matched === null, JSON.stringify(county('中山路')));
ok('「河北区」仍不按河北省会算', county('河北区').matched === null, JSON.stringify(county('河北区')));
// 补表：河北 11 个地级市原先只收石家庄，「河北承德」会被折到省会（差 3°E ≈ 13 分钟真太阳时）
const NEW_CITIES = ['唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水',
  '云浮', '金昌', '嘉峪关', '七台河', '乌海', '山南', '那曲', '池州', '宣城', '铜陵', '淮北', '宿州', '亳州'];
ok(`新补的 ${NEW_CITIES.length} 个地级市全部收进表`, (() => {
  const missing = NEW_CITIES.filter((n) => county(n).level !== '地级市');
  return missing.length === 0;
})(), NEW_CITIES.filter((n) => county(n).level !== '地级市').join('/'));
ok('「河北承德」按承德、不折石家庄', county('河北承德').lon === 117.96, JSON.stringify(county('河北承德')));
// 工具层走同一把尺：县名进得来，真太阳时才不会被静默取消
const xCase = await def.execute({ system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: '长沙县' });
ok('工具层「长沙县」拿到经度并进摘要', !!xCase.input && xCase.input.geo && xCase.input.geo.lon === 112.94
  && /真太阳时/.test(String(xCase.summary)), JSON.stringify(xCase.input && xCase.input.geo));
ok('工具层「长沙县」不说「没查到」', !/没查到|未提供出生地/.test(String(xCase.summary)), String(xCase.summary).slice(0, 60));

// ── ⑧ 显式经度优先：数字串也算「用户亲手给了经度」 ──────────────
// 0.61.2 的 resolveGeo 只判 typeof === 'number'。模型很爱给带引号的数（"87.6"），
// 于是 geocode:'online' 把这视为没给，拿联网结果去排盘：写的是喀什 87.6，排出来是 121.47。
// 现在入口先按引擎那把尺归一（normalizeLongitudes），非十进制 / 超范围也在此当场报错。
let keepCalls = [];
globalThis.fetch = async (url) => {
  keepCalls.push(String(url));
  return { ok: true, json: async () => [{ lon: '121.47', lat: '31.23', display_name: '上海市（伪造解析）' }] };
};
const KEEP_ADDR = '新疆喀什地区疏附县'; // 带「县」才会走联网
const KEEP_BASE = { system: 'bazi', datetime: '1990-05-12T14:30', gender: 'male', address: KEEP_ADDR, geocode: 'online' };
const sLon = await def.execute({ ...KEEP_BASE, longitude: '87.6' });
ok('数字串经度进盘（不是被丢掉）', sLon.input.longitude === 87.6, `${sLon.input.longitude} / ${typeof sLon.input.longitude}`);
ok('给了显式经度就不发起网络请求', keepCalls.length === 0, `fetch ${keepCalls.length} 次`);
const nLon = await def.execute({ ...KEEP_BASE, longitude: 87.6 });
ok('数字串与数字两条路同盘', JSON.stringify(sLon.pillars) === JSON.stringify(nLon.pillars) && keepCalls.length === 0);
// 换一个没被前面用例缓存过的地址：③ 已经把「疏附县」写进 LRU，用它测不出这次到底联没联网
const KEEP_ADDR2 = '新疆维吾尔自治区喀什地区叶城县';
const noLon = await def.execute({ ...KEEP_BASE, address: KEEP_ADDR2 });
ok('没给经度时联网解析照旧生效', noLon.input.longitude === 121.47 && keepCalls.length === 1, `${noLon.input.longitude} / fetch ${keepCalls.length}`);
const badLonMsg = await def.execute({ ...KEEP_BASE, address: KEEP_ADDR2, longitude: '东经87.6' })
  .then(() => 'ACCEPTED').catch((e) => String((e && e.message) || e));
ok('非十进制经度当场报错，且没发网络请求', /E_RANGE/.test(badLonMsg) && keepCalls.length === 1, badLonMsg.slice(0, 80));
