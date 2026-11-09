// 采集 BaziQA 公开命例库的交运对拍底本 → test/fixtures/baziqa-jiaoyun.json
//
// 为什么要把源快照入库：对拍样本原先只存在于 %TEMP%/baziqa，临时目录一清就再也复算不了。
// 这里把「上游哪个 commit、每个文件多少字节、sha256 是什么、选了哪 20 例、为什么选」一次钉死，
// 之后 tools/gen-jiaoyun-data.mjs 离线就能重排出 tools/data-jiaoyun.mjs。
//
// 用法：node tools/capture-baziqa-jiaoyun.mjs [--commit <sha>] [--cache <dir>]
// 需要网络（api.github.com）。raw.githubusercontent.com 在本机解析不了，所以走 contents API 取 base64。
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'test', 'fixtures', 'baziqa-jiaoyun.json');
const REPO = 'ChenJiangxi/BaziQA';
const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
const CACHE = arg('--cache', path.join(process.env.TEMP || '/tmp', 'baziqa'));
const sha256 = (b) => crypto.createHash('sha256').update(b).digest('hex');

const api = async (p) => {
  const r = await fetch(`https://api.github.com/repos/${REPO}/${p}`, {
    headers: { 'User-Agent': 'metaphysics-jiaoyun-capture', Accept: 'application/vnd.github+json' },
  });
  if (!r.ok) throw new Error(`HTTP ${r.status} ${p}`);
  return r.json();
};

const commit = arg('--commit', null) || (await api('commits/main')).sha;
const listing = await api(`contents/charts/bazi?ref=${commit}`);
if (!Array.isArray(listing)) throw new Error('charts/bazi 不是目录');
console.log(`上游 ${REPO}@${commit.slice(0, 10)}：charts/bazi 共 ${listing.length} 个文件`);

const files = [];
const docs = {};
for (const f of listing.filter((x) => x.name.endsWith('.json')).sort((a, b) => a.name.localeCompare(b.name))) {
  const j = await api(`contents/charts/bazi/${f.name}?ref=${commit}`);
  const buf = Buffer.from(j.content, 'base64');
  // 真校验：git blob sha1 = sha1("blob "+len+"\0"+content)，必须等于 API 给的 sha。
  // 只比「解码后再解码」是恒真的假断言，挡不住截断或转码。
  const blobSha1 = crypto.createHash('sha1').update(Buffer.concat([Buffer.from(`blob ${buf.length}\0`), buf])).digest('hex');
  if (blobSha1 !== j.sha) throw new Error(`${f.name} blob sha1 不符：${blobSha1} != ${j.sha}`);
  if (buf.length !== f.size) throw new Error(`${f.name} 字节数与目录不符`);
  const cachePath = path.join(CACHE, f.name);
  let cached = null;
  if (fs.existsSync(cachePath)) {
    const local = fs.readFileSync(cachePath);
    cached = sha256(local) === sha256(buf) ? 'identical' : 'DIFFERENT';
    if (cached === 'DIFFERENT') console.log(`  ！本地缓存与上游不同：${f.name}（以上游为准，重写缓存）`);
  }
  fs.mkdirSync(CACHE, { recursive: true });
  fs.writeFileSync(cachePath, buf);
  docs[f.name] = JSON.parse(buf.toString('utf8'));
  files.push({ name: f.name, bytes: buf.length, sha256: sha256(buf), blobSha: j.sha, cacheBefore: cached });
  console.log(`  ${f.name} ${buf.length}B sha256=${sha256(buf).slice(0, 16)} 缓存=${cached || '无'}`);
}

// 全库统计：交运「日」档到底量化到多少天一次
let total = 0;
const afterDays = {};
const tzCount = {};
const dstCount = {};
for (const [name, j] of Object.entries(docs)) {
  for (const c of Object.values(j.charts)) {
    if (!c.chart || !c.chart.qiyun) continue;
    total += 1;
    const d = c.chart.qiyun.after_days;
    afterDays[d] = (afterDays[d] || 0) + 1;
    tzCount[c.time.timezone] = (tzCount[c.time.timezone] || 0) + 1;
    dstCount[c.time.dst_minutes || 0] = (dstCount[c.time.dst_minutes || 0] || 0) + 1;
  }
}
console.log(`\n全库 ${total} 例；after_days 分布 ${JSON.stringify(afterDays)}`);
const bucket = Object.keys(afterDays).every((d) => Number(d) % 10 === 0);
console.log(`after_days 全为 10 的倍数：${bucket}`);

// 选例：显式列出 (文件, 命例键)，不靠 id 字符串反推（上游键里 C7a/C7b 同生日，反推会撞）
const PICKS = [
  ['contest8_2021.json', 'male_19700723_P029'],
  ['contest8_2022.json', 'female_19810526_P018'],
  ['contest8_2022.json', 'female_19900523_P019'],
  ['contest8_2023.json', 'female_19661018_P009'],
  ['contest8_2023.json', 'female_20020601_P015'],
  ['contest8_2024.json', 'guangdong_female_19800824_P001'],
  ['contest8_2025.json', 'taiwan_female_19880215_P007'],
  ['contest8_2026.json', '2026_C1_male_19820612'],
  ['contest8_2026.json', '2026_C2_female_19810120'],
  ['contest8_2026.json', '2026_C7_female_19990814'],
  ['hkjfma_2013.json', '2013_C2_female_19721106'],
  ['hkjfma_2013.json', '2013_C3_male_19720115'],
  ['hkjfma_2015.json', '2015_C6_female_19960310'],
  ['hkjfma_2017.json', '2017_C2_male_19800625'],
  ['hkjfma_2017.json', '2017_C5_female_19800202'],
  ['hkjfma_2017.json', '2017_C7a_female_19510124'],
  ['hkjfma_2017.json', '2017_C7b_female_19510124'],
  ['hkjfma_2018.json', '2018_C6_female_19930817'],
  ['hkjfma_2019.json', '2019_C4_female_19710528'],
  ['hkjfma_2020.json', '2020_C2_female_19790301'],
];

// 选例口径的实际筛出量：口径写成数字，不写成「精心挑选」
const UTC8 = /^Asia\/(Shanghai|Hong_Kong|Taipei|Macau)$/;
let precise = 0, preciseUtc8 = 0, preciseUtc8NoDst = 0, statedIsChart = 0;
for (const j of Object.values(docs)) {
  for (const c of Object.values(j.charts)) {
    if (!c.chart || !c.chart.qiyun) continue;
    const p = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(c.time.stated?.datetime || '');
    if (!p) continue;
    precise += 1;
    if (!UTC8.test(c.time.timezone)) continue;
    preciseUtc8 += 1;
    if (c.chart.datetime === c.time.stated.datetime) statedIsChart += 1;
    if ((c.time.dst_minutes || 0) === 0) preciseUtc8NoDst += 1;
  }
}
console.log(`\n筛选口径实数：有分钟级 stated ${precise}；其中 UTC+8 ${preciseUtc8}；其中无夏令时 ${preciseUtc8NoDst}；chart.datetime==stated ${statedIsChart}`);

const cases = [];
for (const [file, key] of PICKS) {
  const j = docs[file];
  const c = j.charts[key];
  if (!c) throw new Error(`上游没有 ${file}/${key}`);
  if (!c.chart.qiyun || !c.chart.qiyun.start_date) throw new Error(`${file}/${key} 没有 qiyun.start_date`);
  // 只留对拍要用的字段，但每个字段都照上游原值抄，不做归一、不补算
  cases.push({
    file,
    chartKey: key,
    caseNo: c.case_no ?? null,
    gender: c.gender,
    timeConvention: j.default_time_convention,
    engine: j.engine,
    time: c.time,
    chartDatetime: c.chart.datetime,
    pillars: ['year', 'month', 'day', 'hour'].map((k) => c.chart.pillars[k].ganzhi),
    qiyun: c.chart.qiyun,
    alternatives: c.alternatives ?? null,
    hourPillarVaries: c.hour_pillar_varies ?? null,
    dayPillarVaries: c.day_pillar_varies ?? null,
  });
}

const fixture = {
  meta: {
    source: `https://github.com/${REPO}`,
    upstreamPath: 'charts/bazi/',
    commit,
    commitUrl: `https://github.com/${REPO}/commit/${commit}`,
    engine: 'lunar-python 1.4.8（八字）／iztro 2.5.8（紫微，本对拍不用）',
    timeConvention: 'stated（上游 default_time_convention；chart.datetime 取 time.stated.datetime）',
    capturedAt: new Date().toISOString(),
    capture: 'tools/capture-baziqa-jiaoyun.mjs（api.github.com contents?ref=commit，base64 解码后逐文件 sha256）',
    generator: 'tools/gen-jiaoyun-data.mjs',
    files,
    stats: {
      upstreamFiles: listing.length,
      charts: total,
      afterDaysDistribution: afterDays,
      afterDaysAllMultiplesOf10: bucket,
      timezoneDistribution: tzCount,
      dstMinutesDistribution: dstCount,
      filter: { preciseStated: precise, preciseUtc8, preciseUtc8NoDst, chartDatetimeEqualsStated: statedIsChart },
      selected: cases.length,
    },
    policy: '只取 charts/bazi 下带 qiyun.start_date 的命例；选例键显式列出（上游 C7a/C7b 同生日，按 id 尾段反推会撞）。'
      + '每例照抄上游 time / chart.datetime / pillars.ganzhi / qiyun 原值，不归母、不补算、不改字。',
    caution: '厂家 after_days 全库只出现 0/10/20 三档（117/117 为 10 的倍数），是「一时辰折十日」的量化值，不是逐日精算；'
      + '因此交运日与本插件逐日精算天然有日级差，对拍只锁四柱、顺逆与偏差量级，不把厂家日当唯一真理。'
      + '夏令时例的 time.stated 已扣夏令时、time.clock 才是原文钟表时间，喂引擎时必须用 clock 并让引擎自己扣，否则扣两次。',
  },
  cases,
};
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(fixture, null, 2) + '\n');
console.log(`\n写入 ${path.relative(ROOT, OUT)}：${cases.length} 例，${fs.statSync(OUT).size} bytes`);