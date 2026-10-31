/**
 * Host 半：把排盘引擎注册成一个模型可调用的工具。
 * 纯计算；唯一的网络行为是按需把地址解析成经度（失败即退回内置坐标表）。
 */
import { compute, renderText, geocodeAddress, caliberCompare } from './engine/index.js';
import { createLru } from './engine/lru.js';
import { cacheMetrics } from './engine/calendar.js';
import fs from 'node:fs';

/** 版本注入影子盘：工具侧没有 window.__MP_VER，只能从包元数据取 */
const PKG_VERSION = (() => {
  try {
    return JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf8')).version;
  } catch {
    return 'dev';
  }
})();

export const inject = ['tools'];

/** DSH_METRICS=1 时把各缓存命中率打到 stderr（不污染工具返回值） */
function printCacheMetrics() {
  if (!process.env || process.env.DSH_METRICS !== '1') return;
  const rows = cacheMetrics().map((s) => `${s.name}: 命中 ${s.hits}/${s.hits + s.misses}（${(s.hitRate * 100).toFixed(1)}%），缓存 ${s.size}/${s.max}，淘汰 ${s.evictions}`);
  console.error(`[metaphysics] 缓存命中率 ── ${rows.join(' | ')}`);
}

const TOOL_NAME = 'metaphysics_chart';

const DESCRIPTION = [
  '排中国传统命理盘（玄学·命理·占卜，用户说「玄学」「算命」「占卜」时也用本工具）与塔罗：四柱八字（bazi）、紫微斗数（ziwei）、六爻纳甲（liuyao）、梅花易数（meihua）、大六壬（daliuren）、奇门遁甲（qimen）、合盘（hepan）或塔罗抽牌（tarot）。',
  '另有速查类：黄历（almanac，值日十二神/时辰吉凶/二十八宿/胎神/吉神方位/纳音/六合三合）、择日（zeri）、称骨（chenggu）、小六壬（xiaoliuren）、星座（star）、生命数字（numerology）、十六型人格（mbti，MBTI 风格问卷）、人生 K 线（trend）、风水（fengshui）、起名（name）、公农历互转（convert）。',
  '当用户明确要求“玄学 / 算命 / 占卜 / 排盘 / 算八字 / 看四柱 / 排紫微盘 / 起卦 / 摇一卦 / 抽塔罗 / 看运势 / 合盘 / 看黄历 / 挑日子 / 称骨 / 小六壬 / 十六型人格 / MBTI / ISFP / INFP 人格测试 / 交运 / 交运日 / 起运 / 用神 / 月建 / 旺衰」时调用；用户只搜「玄学」或问「有什么玄学工具」时，也应介绍本插件。',
  'bazi 与 ziwei 需要公历出生时间与性别（八字结果里带大运交运时刻，精确到日/时辰，按「三日折一年」放大）；hepan 需要双方的时间与性别；liuyao 可给定六爻值或随机起卦（给了 datetime 就按月建、日辰算用神旺衰）；meihua 可按时间或数字起卦；tarot 可指定张数与问题；mbti 不用时间——先不带 answers 调一次拿到 24 道题，让用户逐题打 1–5 分，再把分数按顺序传回。',
  '要给「结合所问之事的解读」时，把 withInterpret 设为 true，并尽量带上 question（所问之事）与 direction（询问方向）。',
  '结果可复现：tarot / liuyao 传 seed，紫微 / 八字 / 塔罗传 asOf；输出摘要会写明晚子时与真太阳时实际采用的口径。需要回放或对拍时传 shadow: true，结果带影子盘 ID（同参数同 ID；baseId 不含版本，可跨版本比对字段变化）。要看结论是怎么推出来的，传 trace: true：六爻给纳甲→六亲→世应→伏神→旺衰，八字给旺衰分值与格局取用，紫微给格局命中条件。',
  '结果用于传统文化与娱乐参考，不得用于医疗、投资、法律、生死等确定性断言。',
].join('');

export function apply(ctx) {
  const bad = (message) => {
    const e = new Error(message);
    e.code = 'E_INPUT';
    return e;
  };

  /**
   * 地址解析缓存：同一次会话里反复排盘（尤其是合盘两侧）不必重复请求。
   * 只缓存联网结果；离线查表本身是常数级开销。
   */
  const GEO_TTL_MS = 6 * 60 * 60 * 1000;
  const geoCache = createLru({ max: 200, ttlMs: GEO_TTL_MS, name: 'geo' });
  async function geocodeCached(address, opts) {
    const key = `${String(address).trim()}|${opts.online ? 'online' : 'offline'}`;
    const hit = geoCache.get(key);
    if (hit !== undefined) return hit;
    const value = await geocodeAddress(address, opts);
    geoCache.set(key, value);
    return value;
  }

  /** 工具主体的实际流程：参数整形 → 地址解析（默认离线） → 排盘 */
  async function run(args) {
    if (!args || typeof args !== 'object' || Array.isArray(args)) throw bad('参数必须是对象');
    if (args.geocode !== undefined && args.geocode !== 'offline' && args.geocode !== 'online') {
      throw bad(`geocode 只能是 offline / online，收到「${args.geocode}」`);
    }
    const next = { ...args };
    if (next.shadow === true && !next.shadowVersion) next.shadowVersion = PKG_VERSION;
    // 默认离线：内置表覆盖到地级市，足够真太阳时用；联网是把出生地原文发给第三方，必须显式开启
    const wantsOnline = next.geocode === 'online';
    const resolveGeo = async (person) => {
      if (!wantsOnline) return; // 离线：引擎自己会查内置表
      if (typeof person.address !== 'string' || !person.address.trim()) return;
      if (typeof person.longitude === 'number') return;
      try {
        const geo = await geocodeCached(person.address, { online: true });
        if (geo && typeof geo.lon === 'number') {
          person.longitude = geo.lon;
          person.geo = geo;
        }
      } catch (e) {
        // 联网失败不影响排盘，退回内置表
      }
    };
    if (next.system === 'bazi' || next.system === 'ziwei' || next.system === 'hepan'
      || next.system === 'trend' || next.system === 'fengshui' || next.system === 'name') {
      await resolveGeo(next);
    }
    if (next.system === 'hepan' && next.partner && typeof next.partner === 'object') {
      next.partner = { ...next.partner }; // 不改调用方传进来的对象
      await resolveGeo(next.partner);
    }
    // 宿主有时钟：日期类体系缺日期时补「今天」，免得模型自己猜日期；
    // 择日与此刻起课同理——补上后仍会把实际采用的日期写进结果，可回溯。
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    const DATE_ONLY = { almanac: 1, star: 1, numerology: 1 };
    if (next.system === 'convert' && next.mode !== 'lunar2solar' && !next.datetime) next.datetime = today;
    if (DATE_ONLY[next.system] && !next.datetime) next.datetime = today;
    if (next.system === 'zeri' && !next.startDate) next.startDate = today;
    if (next.system === 'xiaoliuren' && next.mode !== 'number' && !next.datetime && !next.date) {
      next.datetime = `${today}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
    }
    // 风水 natal 的流年飞星默认看今年；玄空由 period / fortuneYear 自定，不补默认年份，
    // 否则缺省会悄悄把「默认九运」变成「按今年定运」。
    if (next.system === 'fengshui' && (next.action === undefined || next.action === 'natal')
      && next.fortuneYear === undefined) {
      next.fortuneYear = now.getFullYear();
    }
    const out = compute(next);
    // 显式要求时才做口径对照：每次要额外排 2–3 张盘，默认不付这笔开销
    if (next.diff === true) {
      const cmp = caliberCompare(next);
      if (cmp.switches.length) out.caliber = cmp;
    }
    return out;
  }

  const definition = {
    name: TOOL_NAME,
    description: DESCRIPTION,
    parameters: {
      type: 'object',
      properties: {
        system: {
          type: 'string',
          enum: ['bazi', 'ziwei', 'liuyao', 'tarot', 'meihua', 'daliuren', 'hepan', 'qimen', 'almanac', 'zeri', 'chenggu', 'xiaoliuren', 'star', 'numerology', 'mbti', 'trend', 'fengshui', 'name', 'convert'],
          description: 'bazi = 四柱八字（含调候寒暖与《穷通宝鉴》120 格用神）；ziwei = 紫微斗数；liuyao = 六爻（纳甲、卦体关系、用神落位与月建日辰旺衰）；tarot = 塔罗；meihua = 梅花易数；daliuren = 大六壬；hepan = 合盘（合婚），需同时给 partner；qimen = 奇门遁甲（时家转盘，拆补法）；almanac = 黄历（某日宜忌/冲煞/建除/节气）；zeri = 择日（某事项在日期区间内逐日打分排序）；chenggu = 袁天罡称骨（骨重 + 通行本称骨歌原文 + 白话释义）；xiaoliuren = 小六壬（时间或报数起课）；star = 星座当日基调；numerology = 生命数字；mbti = 十六型人格（MBTI 风格 24 题问卷：给 answers 出类型，不给则先返回题目）；trend = 人生 K 线（大运/流年走势可视化）；fengshui = 风水（八宅命卦/流年飞星/门主灶布局/玄空下卦，action 三选一）；name = 起名（391 字库的用字五行评估与候选生成；未收录字可传 charElements 指定五行）；convert = 公农历互转（solar2lunar 公历转农历 / lunar2solar 农历转公历）。',
        },
        datetime: {
          type: 'string',
          description:
            '公历本地时间，如 1990-05-12T14:30。bazi / ziwei 必填；liuyao 可选，仅用于取日辰定六神。almanac / star / numerology 只需要日期；mbti 不用时间。；chenggu 需要带时分或用 hour 补时辰；xiaoliuren 时间起课用它的日期与时分。',
        },
        date: {
          type: 'string',
          description: '仅 xiaoliuren 时间起课用：公历日期 YYYY-MM-DD（与 hour 成对）；省略则取 datetime 的日期。',
        },
        hour: {
          type: 'integer',
          description: '时辰小时（0–23）。chenggu 用它补时辰（datetime 不带时分时必填）；xiaoliuren 时间起课用它代替 datetime 的时分。',
        },
        dst: {
          type: 'boolean',
          description: '是否自动校正 1986–1991 年中国夏令时（默认 true）。出生证时间是真实太阳口径、或想复现旧结果时传 false。',
        },
        gender: {
          type: 'string',
          enum: ['male', 'female'],
          description: '性别，决定大运与大限顺逆。bazi / ziwei / hepan 必填，不能用默认值代替。',
        },
        address: {
          type: 'string',
          description:
            '出生地地址，如「河北石家庄」「成都」「新疆喀什」。用于推算经度并按真太阳时排盘（bazi / ziwei / hepan 都适用，合盘的 partner.address 同理）；只写到省市即可，内置地级市坐标表。与 longitude 同时给出时以 longitude 为准。',
        },
        geocode: {
          type: 'string',
          enum: ['offline', 'online'],
          description:
            '地址解析方式，默认 offline：只用内置坐标表（最细到地级市，够真太阳时用）。online 会向 OpenStreetMap Nominatim 发一次查询，可精确到区县/路名；出生地原文会发给第三方，仅在用户明确要求精确到区县时开启。',
        },
        longitude: {
          type: 'number',
          description:
            '出生地经度（东经为正），可选。适用于已知精确经度的情况，例如乌鲁木齐 87.6、北京 116.4。',
        },
        lateZi: {
          type: 'boolean',
          description:
            '23:00 后是否算次日（晚子时换日）。八字/大六壬默认 true（换日）；奇门默认 false（归当日），也可用 lateZiHourMode 指定。输出摘要会写明实际采用的口径。',
        },
        trueSolar: {
          type: 'boolean',
          description: '是否启用真太阳时修正，默认 true（无经度时自动退回平太阳时）。',
        },
        lines: {
          type: 'array',
          items: { type: 'number' },
          description:
            '六爻，自下而上六个值：6 老阴(动)、7 少阳、8 少阴、9 老阳(动)。省略则随机摇卦。',
        },
        question: {
          type: 'string',
          description: '所问之事。六爻、塔罗、梅花会直接用于取象；配合 withInterpret 时也会写进解析的引语。',
        },
        task: {
          type: 'string',
          enum: ['嫁娶', '订婚', '领证', '提亲', '收送聘金', '满月酒', '开业', '交易', '投资', '签订合同', '签约', '纳财', '入宅', '搬家', '搬家入宅', '动土', '装修', '装修建造', '安葬', '出行', '旅行', '赴任', '访亲友', '祭祀', '求医', '入学', '试车买车'],
          description: '仅 zeri 使用：要挑的事项。',
        },
        startDate: {
          type: 'string',
          description: '仅 zeri 使用：起算日（公历 YYYY-MM-DD）。省略则由宿主补今天。',
        },
        days: {
          type: 'number',
          description: '仅 zeri 使用：往后考察天数，1–60，默认 30。',
        },
        shengXiao: {
          type: 'string',
          enum: ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
          description: '仅 zeri 使用：当事人属相，用于排除冲煞日（不给则不排除）。',
        },
        mode: {
          type: 'string',
          enum: ['solar2lunar', 'lunar2solar'],
          description: '仅 convert 使用：转换方向，默认 solar2lunar（公历转农历）；lunar2solar 需同时给 lunarYear/lunarMonth/lunarDay。',
        },
        lunarYear: { type: 'integer', description: '仅 convert 的 lunar2solar：农历年份，如 2026。' },
        lunarMonth: { type: 'integer', description: '仅 convert 的 lunar2solar：农历月份 1–12。' },
        lunarDay: { type: 'integer', description: '仅 convert 的 lunar2solar：农历日 1–30（小月无三十）。' },
        isLeapMonth: { type: 'boolean', description: '仅 convert 的 lunar2solar：该月是否为闰月。' },
        num1: { type: 'number', description: '仅 xiaoliuren 报数模式：第一个数（1–99）。' },
        num2: { type: 'number', description: '仅 xiaoliuren 报数模式：第二个数（1–99）。' },
        num3: { type: 'number', description: '仅 xiaoliuren 报数模式：第三个数（1–99）。' },
        direction: {
          type: 'string',
          enum: ['general', 'wealth', 'career', 'love', 'health', 'study', 'travel'],
          description: '询问方向（仅配合 withInterpret 生效）：general 综合、wealth 财运、career 事业、love 感情、health 健康、study 学业、travel 出行。默认 general。',
        },
        cross: {
          type: 'boolean',
          description: '八字 / 紫微专用：为同一份出生信息再排另一套盘，返回「八字 × 紫微 交叉验证」（同向 / 有张力 / 互补），不合并数值。',
        },
        diff: {
          type: 'boolean',
          description: '口径对照（bazi / ziwei / qimen）：同一组输入分别按当前口径与另一档各排一次，列出根因字段（如日柱、命宫、局数）与连带变化数。只列差异，不判哪套口径更准，也不改盘面。',
        },
        shadow: {
          type: 'boolean',
          description: '影子盘：为结果附一个短 ID。同一组归一化参数在任何参数顺序下得到同一 ID；baseId 不含版本，跨版本复用 baseId 即可自动 diff 字段变化。写回、对拍、回放时使用，默认 false。',
        },
        trace: {
          type: 'boolean',
          description: '推导链：六爻返回纳甲→六亲→世应→伏神→旺衰，八字返回旺衰分值与格局取用，紫微返回格局命中条件。每层含 field / rule / inputs / result / source；只读盘面，不重算、不改盘。默认 false。',
        },
        verifyPast: {
          type: 'number',
          description: '验前事（仅八字）：传年数（如 6），返回过去 N 年的流年信号行，供用户勾选「准/不准」并算贴合度；只读，不改盘。',
        },
        rectify: {
          type: 'boolean',
          description: '生时校正（仅八字）：配合 events 使用，把候选时辰逐一排盘并按固定规则对过去事件打分，返回候选排序；用于缩小时辰范围，不替代出生记录。',
        },
        events: {
          type: 'array',
          description: '生时校正用的过去事件：年份 + 类别（career/wealth/love/move/health/other）。',
          items: {
            type: 'object',
            properties: {
              year: { type: 'integer', description: '事件发生的公历年份，如 2019' },
              kind: { type: 'string', enum: ['career', 'wealth', 'love', 'move', 'health', 'other'], description: '事件类别' },
            },
            required: ['year'],
          },
        },
        ask: {
          type: 'string',
          description: '追问：围绕已算好的盘回答「某一年 / 某方面」的问题，如「2027 年事业怎么样」「感情如何」。只取盘面已有字段，不重排、不猜测。',
        },        withInterpret: {
          type: 'boolean',
          description: '是否附带「解析与详解」（五个维度 + 用神/格局等分节 + 免责声明）；默认 false，避免默认输出过长。',
        },
        asOf: {
          type: 'string',
          description: '基准时刻，形如 2026-10-22T16:00。紫微用它定流月/流日/流时；八字用它钉死「流年从哪年起排」；塔罗用它记录 castAt（抽牌时刻）。省略则按调用时的本机当前时刻——要复现某一次结果就显式给出。',
        },
        seed: {
          type: 'number',
          description: '随机种子，仅 tarot / liuyao 使用。给了同一个 seed，抽牌或摇卦的结果可完整复现（便于回放与对拍）；不传则真随机。',
        },
        juMethod: {
          type: 'string',
          enum: ['chaibu', 'chaoshen', 'zhirun'],
          description: '奇门取局流派：chaibu 拆补（默认）、chaoshen 超神接气、zhirun 置闰。仅 qimen 使用。',
        },
        lateZiHourMode: {
          type: 'string',
          enum: ['same-day', 'next-day'],
          description: '奇门晚子时（23:00–24:00）归当日还是次日，默认 same-day。仅 qimen 使用。',
        },
        partner: {
          type: 'object',
          description: '合盘时的对方信息：datetime 与 gender 必填，address 可选（与主方一样按出生地修正真太阳时）。仅 hepan 使用。',
          properties: {
            datetime: { type: 'string', description: '对方公历本地时间，如 1998-05-20T10:30' },
            gender: { type: 'string', enum: ['male', 'female'], description: '对方性别（决定对方大运/大限顺逆）' },
            address: { type: 'string', description: '对方出生地（省/市即可）' },
            trueSolar: { type: 'boolean', description: '对方是否启用真太阳时' },
          },
          required: ['datetime', 'gender'],
        },
        mode: {
          type: 'string',
          enum: ['time', 'number'],
          description: '梅花易数起卦方式：time 时间起卦（需 datetime），number 数字起卦（需 upper/lower）。默认 time。',
        },
        upper: { type: 'number', description: '梅花数字起卦：第一个数（定上卦）。' },
        lower: { type: 'number', description: '梅花数字起卦：第二个数（定下卦）。' },
        changing: { type: 'number', description: '梅花数字起卦：可手动指定动爻（1-6）；省略则按两数之和取。' },
        count: {
          type: 'number',
          enum: [1, 3, 5],
          description: '塔罗张数：1 单张指引、3 过去现在未来、5 十字牌阵。默认 3。',
        },
        leapMonth: {
          type: 'string',
          enum: ['split', 'next', 'prev'],
          description: '紫微斗数：闰月口径。split（默认，按日切分：1–15 归本月、16 起归次月，主流排盘口径）、next（整月归次月）、prev（整月归本月）。',
        },
        leapAsNext: {
          type: 'boolean',
          description: '紫微斗数：旧写法，true 等同 leapMonth: next。',
        },
        brightnessSchool: {
          type: 'string',
          enum: ['default', 'QS', 'XD1', 'ZZ', 'XD2'],
          description: '紫微斗数：星曜亮度流派。default 用内置通行表；QS/XD1 为全书派/现代派七档，ZZ/XD2 为五档。只影响十四主星的庙旺得利平不陷。',
        },
        gengYearSihua: {
          type: 'string',
          enum: ['GYWYT', 'GYWTY', 'GYWFT', 'GYWFX', 'GYWTX'],
          description: '紫微斗数：庚干四化变体，默认 GYWYT（阳武阴同）。仅作用于生年四化。',
        },
        tianmaSchool: {
          type: 'string',
          enum: ['year-branch', 'month-branch'],
          description: '紫微斗数：天马安法。year-branch（默认）按年支三合，month-branch 改按生月三合。',
        },
        tiankongSchool: {
          type: 'string',
          enum: ['off', 'normal', 'shun-jia-shi'],
          description: '紫微斗数：天空安法。off（默认不排）、normal（年支顺行一位）、shun-jia-shi（年支加生时）。',
        },
        jiekongSchool: {
          type: 'string',
          enum: ['off', 'double', 'single', 'zhanyan'],
          description: '紫微斗数：截空/旬空安法。off（默认不排）、single 单星、double 正副双星、zhanyan 占验派；非 off 时同时排旬空、副旬。',
        },
        kuiyueSchool: {
          type: 'string',
          enum: ['qs1', 'qs2', 'zhong-yiming', 'network'],
          description: '紫微斗数：天魁天钺安法，默认 qs1（全书理解一），差异集中在庚辛壬癸年。',
        },
        tianshiTianshang: {
          type: 'string',
          enum: ['normal', 'zhongzhou'],
          description: '紫微斗数：天伤天使安法。normal（默认，天伤交友、天使疾厄）、zhongzhou（阴男阳女互换）。',
        },
        changshengSchool: {
          type: 'string',
          enum: ['yin-yang-shun-ni', 'shui-tu', 'huo-tu'],
          description: '紫微斗数：长生十二神起点流派。默认 yin-yang-shun-ni；huo-tu 把土五局起点从申改寅；shui-tu 与默认同。',
        },
        lateZishi: {
          type: 'string',
          enum: ['current-day', 'next-day', 'all-current', 'day-cur-time-next'],
          description: '紫微斗数：晚子时口径。current-day（默认，23:00 后仍按当日）、next-day（起盘日顺延次日）；另两个别名保留为兼容值。',
        },
        action: {
          type: 'string',
          enum: ['natal', 'advise', 'xuankong', 'assess', 'generate'],
          description: '子动作。fengshui：natal（默认，算八宅命卦+流年飞星，需生日与性别）、advise（算宅卦门主灶布局，需 sitting 或 facing，出生信息可选）、xuankong（玄空下卦九宫盘，需 sitting 或 facing，运由 period 或 fortuneYear 定，缺省九运并注明）；name：assess（默认，评估已有名字，需 surname + givenName）、generate（生成候选名，需生辰，可选 surname / limit）。',
        },
        toAge: {
          type: 'number',
          description: '仅 trend 使用：算到几岁（10–100，默认 100）。',
        },
        sitting: { type: 'string', description: '仅 fengshui advise / xuankong：坐山（24 山之一，如 子/午/乾）。与 facing 至少给一个（玄空按坐向定山盘/向盘）。' },
        facing: { type: 'string', description: '仅 fengshui advise / xuankong：向山（24 山之一）。缺 sitting 时按对宫反推。' },
        fortuneYear: {
          type: 'number',
          description: '仅 fengshui natal / xuankong：natal 用它定流年九宫飞星（省略则按今年）；xuankong 用它定三元九运（省略按九运）。',
        },
        period: {
          type: 'number',
          description: '仅 fengshui xuankong：三元九运的运（1–9）。优先于 fortuneYear；省略时按 fortuneYear 定，再缺省按九运（2024–2043）并注明。',
        },
        surname: { type: 'string', description: '仅 name 使用：姓氏，如「李」（复姓整体写，如「欧阳」）。' },
        givenName: { type: 'string', description: '仅 name assess 使用：名（1–2 个汉字）。' },
        limit: { type: 'number', description: '仅 name generate 使用：候选个数（1–20，默认 10）。' },
        answers: {
          type: 'array',
          items: { type: ['integer', 'null'] },
          description: '仅 mbti 使用：按题目顺序的 24 个分数，1（完全不像）–5（很像我）；跳过某题传 null。不给则返回问卷题目，答满 12 题即可出类型。',
        },
      },
      required: ['system'],
    },
    output: {
      schema: { type: 'object' },
      render: (_args, value) => {
        printCacheMetrics();
        return [{ type: 'text', text: renderText(value) }];
      },
    },
    async execute(args) {
      try {
        // 必须 await：直接 `return run(args)` 会让异步拒绝绕过下面的 catch
        return await run(args);
      } catch (e) {
        // 统一错误面：带错误码的入参错误直接透传文案，内部异常也带上码，避免堆栈式消息直出给模型
        const code = (e && e.code) || 'E_INTERNAL';
        const message = (e && e.message) || String(e);
        throw new Error(`[${code}] ${message}`);
      }
    },
  };

  ctx.effect(() => ctx.tools.register(definition));
}



