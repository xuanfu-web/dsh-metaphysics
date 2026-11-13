/**
 * Host 半：把排盘引擎注册成一个模型可调用的工具。
 * 纯计算；唯一的网络行为是按需把地址解析成经度（失败即退回内置坐标表）。
 */
import { compute, renderText, geocodeAddress, caliberCompare, resolveHandle, pruneForeignKeys, ownedKeys, normalizeLongitudes } from './engine/index.js';
import { createLru } from './engine/lru.js';
import { cacheMetrics } from './engine/calendar.js';
import { parseRevision, displayValue } from './engine/revise.js';
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
  '另有速查类：黄历（almanac，值日十二神/时辰吉凶/二十八宿/胎神/吉神方位/纳音/六合三合）、择日（zeri）、称骨（chenggu）、小六壬（xiaoliuren）、星座（star）、生命数字（numerology）、十六型人格（mbti，MBTI 风格问卷）、中医体质（constitution，九种体质自评问卷）、五运六气（wuyunliuqi，中运与司天在泉）、太乙神数（taiyi，积年推局与八门文昌）、人生 K 线（trend）、风水（fengshui）、起名（name）、公农历互转（convert）。',
  '当用户明确要求“玄学 / 算命 / 占卜 / 排盘 / 算八字 / 看四柱 / 排紫微盘 / 起卦 / 摇一卦 / 抽塔罗 / 看运势 / 合盘 / 看黄历 / 挑日子 / 称骨 / 小六壬 / 十六型人格 / MBTI / ISFP / INFP 人格测试 / 中医体质 / 九种体质 / 测体质 / 五运六气 / 运气盘 / 司天在泉 / 太乙神数 / 太乙盘 / 交运 / 交运日 / 起运 / 用神 / 月建 / 旺衰」时调用；用户只搜「玄学」或问「有什么玄学工具」时，也应介绍本插件。',
  'bazi 与 ziwei 需要公历出生时间与性别（八字结果里带大运交运时刻，精确到日/时辰，按「三日折一年」放大）；hepan 需要双方的时间与性别；liuyao 可给定六爻值或随机起卦（给了 datetime 就按月建、日辰算用神旺衰）；meihua 可按时间或数字起卦；tarot 可指定张数与问题；mbti 不用时间——先不带 answers 调一次拿到 24 道题，让用户逐题打 1–5 分，再把分数按顺序传回；constitution 同样不用时间，先调一次拿到 45 道题，逐题打 1–5 分（跳过的传 null，别缩短数组），再把 45 个分数按顺序传回；wuyunliuqi 只要一个日期（省略补今天），运气年按大寒分界；taiyi 同样只要一个日期，年家按积年推局（太乙落宫、八门、文昌），主客算与格局未收录。',
  '要给「结合所问之事的解读」时，把 withInterpret 设为 true（仅八字/紫微/六爻/梅花/大六壬/奇门/塔罗 7 个体系产出解析；合盘、人生 K 线、起名与速查类不产这一段），并尽量带上 question（所问之事）与 direction（询问方向）；缺省 detail: "brief" 只给结论、所问方向与三张表（解析段不设体积上限，超长就长），要其余维度用 lean，用户追问「为什么/依据」时改回 full。',
  '用户用一句话改参数（「换成紫微看 2030 年事业」「女命」「晚子时算次日」「出生在成都」「不用真太阳时」「详细解读一下」）时，把原话放进 revise（可配合 handle），引擎翻译成参数补丁并在结果 revision 里回报改了哪些、没认哪些；不要自己把原话拆成猜测的参数。',
  '追问同一张盘：结果里有 handle，下次传 handle + 增量即可（例如 { handle, asOf: 2030 }、{ handle, withInterpret: true, question: "何时换工作" }、{ handle, system: "ziwei" } 看同一时间另一套盘），不必让用户重报出生信息；句柄带校验位，截断或改字会报 E_HANDLE。',
  '出生时刻未知时不要编一个钟点：传 hourUnknown: true——八字只排年/月/日三柱（时柱暂缺，摘要首行提示），趋势按日降级，紫微与合盘会直接以 HOUR_UNKNOWN 阻断并给出补时刻的引导。',
  '结果可复现：tarot / liuyao 传 seed，紫微 / 八字 / 塔罗传 asOf；输出摘要会写明晚子时与真太阳时实际采用的口径。需要回放或对拍时传 shadow: true，结果带影子盘 ID（同参数同 ID；baseId 不含版本，可跨版本比对字段变化）。要看结论是怎么推出来的，传 trace: true：六爻给纳甲→六亲→世应→伏神→旺衰，八字给旺衰分值与格局取用，紫微给格局命中条件，奇门与大六壬给盘面层与取用层；同时回传 traceText（同一份层的 Markdown，可直接贴进对话或文档）。',
  '结果用于传统文化与娱乐参考，不得用于医疗、投资、法律、生死等确定性断言。',
].join('');

/** 22 个体系的固定顺序：system 枚举与 help 索引共用 */
const SYSTEM_ENUM = ['bazi', 'ziwei', 'liuyao', 'tarot', 'meihua', 'daliuren', 'hepan', 'qimen', 'almanac', 'zeri', 'chenggu', 'xiaoliuren', 'star', 'numerology', 'mbti', 'constitution', 'wuyunliuqi', 'taiyi', 'trend', 'fengshui', 'name', 'convert'];

/**
 * 顶层只留通用参数：出生信息、解读开关、句柄与多数体系共用的分析项。
 * 体系专属参数收进 options，短说明留在 schema 里负责「知道有这个键」，
 * 全文由 metaphysics_help 按需返回。工具定义每次调用都整份进上下文，
 * 分层省下的是每一次调用的固定开销，不是文档本身。
 */
const CORE_KEYS = [
  'handle', 'revise', 'system', 'datetime', 'date', 'hour', 'minute', 'dst',
  'gender', 'address', 'geocode', 'longitude', 'lateZi', 'trueSolar',
  'question', 'mode', 'direction', 'cross', 'hourUnknown', 'diff', 'shadow',
  'trace', 'verifyPast', 'rectify', 'events', 'ask', 'withInterpret', 'detail',
  'asOf', 'seed', 'partner',
];

const OPTION_KEYS = [
  'lines', 'task', 'startDate', 'days', 'candidates', 'shengXiao',
  'lunarYear', 'lunarMonth', 'lunarDay', 'isLeapMonth', 'num1', 'num2', 'num3',
  'juMethod', 'lateZiHourMode', 'partner2', 'chart', 'rectifyHours',
  'upper', 'lower', 'changing', 'count', 'spread',
  'leapMonth', 'leapAsNext', 'brightnessSchool', 'gengYearSihua', 'tianmaSchool',
  'tiankongSchool', 'jiekongSchool', 'kuiyueSchool', 'tianshiTianshang',
  'changshengSchool', 'lateZishi', 'shenzhuSchool', 'mingzhuSchool', 'zuoyaoSchool', 'liunianSihua',
  'sihuaVariant', 'jieluSchool', 'suipoSchool',
  'action', 'toAge', 'sitting', 'facing', 'fortuneYear', 'period',
  'sittingOffset', 'sittingDegree', 'facingOffset', 'facingDegree',
  'fortuneDate', 'fortuneTime', 'surname', 'givenName', 'limit',
  'charElements', 'strokeOverrides', 'surnameStrokes', 'year', 'month', 'day',
  'answers',
];

/** options 每个键的短说明：点名体系 + 取值范围；完整口径（为什么/边界）在 help 里 */
const OPTION_HINTS = {
  lines: '仅 liuyao：自下而上 6 个爻值（6/7/8/9），省略则随机摇卦',
  task: '仅 zeri：要挑的事项（嫁娶/开业/入宅/出行等）',
  startDate: '仅 zeri：起算日 YYYY-MM-DD，省略由宿主补今天',
  days: '仅 zeri：往后考察天数 1–60，默认 30',
  candidates: '仅 zeri：2–12 个候选日并排比较（YYYY-MM-DD 数组）',
  shengXiao: '仅 zeri：当事人属相，用于排除冲煞日',
  lunarYear: '仅 convert 的 lunar2solar：农历年份',
  lunarMonth: '仅 convert 的 lunar2solar：农历月份 1–12',
  lunarDay: '仅 convert 的 lunar2solar：农历日 1–30',
  isLeapMonth: '仅 convert 的 lunar2solar：该农历月是否闰月',
  num1: '仅 xiaoliuren 报数起课：第一个数 1–99',
  num2: '仅 xiaoliuren 报数起课：第二个数 1–99',
  num3: '仅 xiaoliuren 报数起课：第三个数 1–99',
  juMethod: '仅 qimen：取局流派 chaibu / chaoshen / zhirun',
  lateZiHourMode: '仅 qimen：晚子时归 same-day 或 next-day',
  partner2: '仅 hepan：第三方出生信息，给出即多回 triple 三对分数',
  chart: '仅 hepan：底层用 bazi 还是 ziwei 盘，默认 bazi',
  rectifyHours: '仅 bazi rectify：候选时辰列表 0–23，省略用十二时辰',
  upper: '仅 meihua 数字起卦：定上卦的数，与 lower 成对',
  lower: '仅 meihua 数字起卦：定下卦的数',
  changing: '仅 meihua 数字起卦：手动指定动爻 1–6',
  count: '仅 tarot：牌数 1 / 3 / 5，默认 3；给了 spread 时以 spread 为准',
  spread: '仅 tarot：牌阵 one 单张 / three 过去现在未来 / five 五张局势 / celtic 凯尔特十字(10) / either 二选一(5) / relation 关系阵(7) / timeflow 时间流(3)',
  leapMonth: '仅 ziwei：闰月口径 split / next / prev',
  leapAsNext: '仅 ziwei：旧写法，true 等同 leapMonth=next',
  brightnessSchool: '仅 ziwei：十四主星亮度流派 default/QS/XD1/ZZ/XD2',
  gengYearSihua: '仅 ziwei：庚干四化变体，默认 GYWYT',
  tianmaSchool: '仅 ziwei：天马安法 year-branch / month-branch',
  tiankongSchool: '仅 ziwei：天空安法 off / normal / shun-jia-shi',
  jiekongSchool: '仅 ziwei：截空旬空安法 off / double / single / zhanyan',
  kuiyueSchool: '仅 ziwei：天魁天钺安法 qs1 / qs2 / zhong-yiming',
  tianshiTianshang: '仅 ziwei：天伤天使安法 normal / zhongzhou',
  changshengSchool: '仅 ziwei：长生十二神起点流派',
  lateZishi: '仅 ziwei：晚子时口径 current-day / next-day',
  shenzhuSchool: '仅 ziwei：身主安法 common / verse',
  mingzhuSchool: '仅 ziwei：命主取法 soul-branch 按命宫地支（默认）/ year-branch 按生年年支（中州派）',
  zuoyaoSchool: '仅 ziwei：杂曜取盘 minimal / full',
  liunianSihua: '仅 ziwei：流年四化取干 year-stem 按流年天干（默认）/ life-palace-stem 按流年命宫宫干',
  sihuaVariant: '仅 ziwei：十干四化变体 default 或 廉破曲阳/贪阴阳机/阳武同阴…（整表替换）',
  jieluSchool: '仅 ziwei：截路空亡 off 照常排（默认）/ zhongzhou 整组不排（截空、副截、旬空、副旬都不出）',
  suipoSchool: '仅 ziwei：岁前十二神 off 照常（默认）/ zhongzhou 大耗改岁破（宫位不变只换名字）',
  action: 'fengshui：natal（默认）/ advise / xuankong 玄空；name：assess / generate',
  toAge: '仅 trend：算到几岁 10–100，默认 100',
  sitting: '仅 fengshui advise/xuankong 玄空：坐山（24 山之一）',
  facing: '仅 fengshui advise/xuankong 玄空：向山（24 山之一）',
  fortuneYear: '仅 fengshui：natal 定流年飞星年份；xuankong 定三元九运',
  period: '仅 fengshui xuankong：三元九运 1–9，优先于 fortuneYear',
  sittingOffset: '仅 fengshui xuankong：坐山偏离本山中心度数 −7.5–7.5',
  sittingDegree: '仅 fengshui xuankong：坐山罗盘度数 0–360',
  facingOffset: '仅 fengshui xuankong：向山偏离本山中心度数 −7.5–7.5',
  facingDegree: '仅 fengshui xuankong：向山罗盘度数 0–360',
  fortuneDate: '仅 fengshui xuankong：飞星日期 YYYY-MM-DD，才排月日时紫白',
  fortuneTime: '仅 fengshui xuankong：飞星时刻 HH:MM，默认 12:00',
  surname: '仅 name：姓氏，复姓整体写（如 欧阳）',
  givenName: '仅 name assess：名 1–2 个汉字',
  limit: '仅 name generate：候选个数 1–20，默认 10',
  charElements: '仅 name：未收录字的五行，如 {"琰":"火"}',
  strokeOverrides: '仅 name：逐字覆盖康熙笔画，如 {"沐":8}',
  surnameStrokes: '仅 name：按姓氏逐字覆盖康熙笔画',
  year: '仅 name：公历出生年，配合 month/day/hour',
  month: '仅 name：公历出生月 1–12',
  day: '仅 name：公历出生日 1–31',
  answers: '仅 mbti / constitution：按题目顺序的 1–5 分（mbti 24 题、体质 45 题），跳过传 null',
};

const BIRTH_KEYS = ['datetime', 'gender', 'address', 'geocode', 'longitude', 'trueSolar', 'lateZi', 'dst', 'asOf', 'shadow'];
const READ_KEYS = ['withInterpret', 'detail', 'ask', 'question', 'direction', 'shadow', 'asOf'];

/** 每个体系实际会读的参数：help 按这张表展开，避免「有这个键但该体系不看」 */
const SYSTEM_PARAMS = {
  bazi: [...BIRTH_KEYS, 'hourUnknown', 'verifyPast', 'rectify', 'events', 'rectifyHours', 'cross', 'diff', 'trace', ...READ_KEYS],
  ziwei: [...BIRTH_KEYS, 'leapMonth', 'leapAsNext', 'brightnessSchool', 'gengYearSihua', 'tianmaSchool', 'tiankongSchool', 'jiekongSchool', 'kuiyueSchool', 'tianshiTianshang', 'changshengSchool', 'lateZishi', 'shenzhuSchool', 'mingzhuSchool', 'zuoyaoSchool', 'liunianSihua', 'sihuaVariant', 'jieluSchool', 'suipoSchool', 'cross', 'diff', 'trace', ...READ_KEYS],
  liuyao: ['datetime', 'lines', 'seed', 'trace', ...READ_KEYS],
  tarot: ['spread', 'count', 'seed', ...READ_KEYS],
  meihua: ['datetime', 'mode', 'upper', 'lower', 'changing', ...READ_KEYS],
  daliuren: ['datetime', 'trace', ...READ_KEYS],
  hepan: [...BIRTH_KEYS, 'partner', 'partner2', 'chart', 'leapMonth', 'ask'],
  qimen: ['datetime', 'juMethod', 'lateZiHourMode', 'trace', ...READ_KEYS],
  almanac: ['datetime', 'shadow'],
  zeri: ['task', 'startDate', 'days', 'candidates', 'shengXiao', 'datetime', 'shadow'],
  chenggu: ['datetime', 'hour', 'lateZi', 'gender', 'shadow'],
  xiaoliuren: ['datetime', 'date', 'hour', 'mode', 'num1', 'num2', 'num3', 'lateZi', 'question', 'shadow'],
  star: ['datetime', 'shadow'],
  numerology: ['datetime', 'shadow'],
  mbti: ['answers', 'shadow'],
  constitution: ['answers', 'shadow'],
  wuyunliuqi: ['datetime', 'shadow'],
  taiyi: ['datetime', 'shadow'],
  trend: ['datetime', 'gender', 'address', 'geocode', 'longitude', 'trueSolar', 'hourUnknown', 'toAge', 'asOf', 'shadow', 'ask'],
  fengshui: ['action', 'datetime', 'gender', 'sitting', 'facing', 'fortuneYear', 'period', 'sittingOffset', 'sittingDegree', 'facingOffset', 'facingDegree', 'fortuneDate', 'fortuneTime', 'dst', 'shadow'],
  name: ['action', 'datetime', 'surname', 'givenName', 'limit', 'charElements', 'strokeOverrides', 'surnameStrokes', 'year', 'month', 'day', 'hour', 'minute', 'gender', 'address', 'geocode', 'longitude', 'trueSolar', 'dst', 'shadow'],
  convert: ['mode', 'datetime', 'lunarYear', 'lunarMonth', 'lunarDay', 'isLeapMonth', 'shadow'],
};

const SYSTEM_REQUIRED = {
  bazi: 'datetime、gender',
  ziwei: 'datetime、gender',
  liuyao: '无（不传 lines 则随机摇卦）',
  tarot: '无（问题可选）',
  meihua: 'time 模式 datetime；number 模式 upper + lower',
  daliuren: 'datetime',
  hepan: 'datetime、gender，以及 partner{datetime, gender}',
  qimen: 'datetime',
  almanac: 'datetime（省略补今天）',
  zeri: 'task',
  chenggu: 'datetime（可只给日期 + hour）',
  xiaoliuren: 'time 模式 datetime/date+hour；number 模式 num1–num3',
  star: '无（省略补今天）',
  numerology: '无（省略补今天）',
  mbti: '无（先不带 answers 拿题）',
  constitution: '无（先不带 answers 拿 45 道题）',
  wuyunliuqi: '无（省略则用今天；要算别的年份就传那年的日期）',
  taiyi: '无（省略则用今天；年家按积年推局，给哪一年的日期就算哪一年）',
  trend: 'datetime、gender',
  fengshui: 'natal 要 datetime + gender；advise/xuankong 要 sitting 或 facing',
  name: 'assess 要 surname + givenName；generate 要生辰（datetime 或 year/month/day）',
  convert: 'solar2lunar 要 datetime；lunar2solar 要 lunarYear/Month/Day',
};

const PARAM_KEY_SET = new Set([...CORE_KEYS, ...OPTION_KEYS]);

function pickParams(all, keys) {
  const out = {};
  for (const k of keys) if (all[k]) out[k] = all[k];
  return out;
}

function buildProperties(all) {
  const core = pickParams(all, CORE_KEYS);
  const options = {};
  for (const k of OPTION_KEYS) {
    const spec = all[k];
    if (!spec) continue;
    options[k] = { ...spec, description: OPTION_HINTS[k] || spec.description };
  }
  core.options = {
    type: 'object',
    description: '体系专属参数：只放当前 system 用得到的键（如 ziwei 的 brightnessSchool、fengshui 的 sitting、name 的 surname）。键名与取值用 metaphysics_help 查；与顶层同名时以顶层为准。',
    properties: options,
  };
  return core;
}

/** options 摊平到顶层：引擎与句柄只认扁平参数，旧调用（直接平铺）继续有效 */
function flattenOptions(raw, all, bad) {
  const { options, ...rest } = raw;
  // MCP 客户端常把「没有 options」写成 null；null 与 undefined 同义，都是没给。
  if (options === undefined || options === null) return rest;
  if (!options || typeof options !== 'object' || Array.isArray(options)) {
    throw bad('options 必须是对象，例如 options: { brightnessSchool: "QS" }');
  }
  // hasOwn 而不是 in：'constructor' / 'toString' / '__proto__' 都在原型链上，
  // 用 in 判断会让这些键混过「未知参数」检查，静默落进参数里。
  const unknown = Object.keys(options).filter((k) => !hasOwn(all, k));
  if (unknown.length) {
    throw bad(`options 里有未知参数：${unknown.join('、')}；可用键见 metaphysics_help`);
  }
  return { ...options, ...rest };
}

const hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

/**
 * 参数整形：模型常把 true 写成 "true"、把 9 写成 "9"。
 * 按 schema 声明的类型统一归一，非法值当场报 E_INPUT：
 * 以前字符串布尔被 bool() 当 false（以为开了其实没开），字符串数字在引擎里
 * 报「运必须是 1–9 的整数，收到 9」——数字明明合法，错得让人无从下手。
 */
function normalizeArgs(raw, all, bad) {
  const normalize = (spec, value, key) => {
    if (value === undefined || value === null) return value;
    const types = Array.isArray(spec.type) ? spec.type : [spec.type];
    if (types.includes('boolean')) {
      if (typeof value === 'boolean') return value;
      if (value === 1 || value === 0) return value === 1;
      if (typeof value === 'string') {
        const s = value.trim().toLowerCase();
        if (!s) return undefined;
        if (s === 'true' || s === '1') return true;
        if (s === 'false' || s === '0') return false;
      }
      throw bad(`${key} 要是布尔值 true / false，收到「${String(value).slice(0, 24)}」`);
    }
    // schema 里的 enum 以前只写给模型看、不做校验：direction:"love"（少了 s）会被引擎
    // 静默当成 general，gender:"女" 在六爻里静默按 male 出用神。枚举是契约的一部分，
    // 写错就该在入口报出来，而不是换一张「看着正常」的盘。
    if (types.includes('string') && Array.isArray(spec.enum) && typeof value === 'string') {
      const s = value.trim();
      if (!s) return undefined;
      if (!spec.enum.includes(s)) {
        throw bad(`${key} 只能是 ${spec.enum.join(' / ')}，收到「${s.slice(0, 24)}」`);
      }
      return s;
    }
    if (types.includes('integer') || types.includes('number')) {
      const integer = types.includes('integer');
      if (typeof value === 'string') {
        const s = value.trim();
        if (!s) return undefined;
        if (!/^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(s)) {
          throw bad(`${key} 要是${integer ? '整数' : '数字'}，收到「${s.slice(0, 24)}」`);
        }
        value = Number(s);
      }
      if (typeof value !== 'number' || !Number.isFinite(value)) {
        throw bad(`${key} 要是${integer ? '整数' : '有限数字'}，收到「${String(value).slice(0, 24)}」`);
      }
      if (integer && !Number.isInteger(value)) throw bad(`${key} 要是整数，收到「${value}」`);
      return value;
    }
    if (types.includes('array') && Array.isArray(value) && spec.items) {
      return value.map((item) => normalize(spec.items, item, `${key}[]`));
    }
    if (types.includes('object') && value && typeof value === 'object' && !Array.isArray(value) && spec.properties) {
      const out = { ...value };
      for (const [k, child] of Object.entries(spec.properties)) {
        if (out[k] !== undefined) out[k] = normalize(child, out[k], `${key}.${k}`);
      }
      return out;
    }
    return value;
  };
  const out = { ...raw };
  for (const [key, spec] of Object.entries(all)) {
    // 经度有专门的尺（normalizeLongitudes）：十进制串它自己会转，非十进制报 E_RANGE。
    // 这里先按「数字」拦下会把那条更准确的报错盖成泛泛的「要是数字」。
    if (key === 'longitude') continue;
    if (out[key] !== undefined) out[key] = normalize(spec, out[key], key);
  }
  return out;
}

function paramDoc(key, spec) {
  const type = Array.isArray(spec.type) ? spec.type.join('|') : spec.type;
  const values = spec.enum ? `，取值 ${spec.enum.join(' / ')}` : '';
  return `- ${key}（${type}${values}）：${spec.description}`;
}

function helpText(all, args) {
  const key = typeof args.key === 'string' ? args.key.trim() : '';
  if (key) {
    const spec = hasOwn(all, key) ? all[key] : null;
    if (!spec) return `没有参数「${key}」。可用参数：${Object.keys(all).join('、')}`;
    return paramDoc(key, spec);
  }
  const system = typeof args.system === 'string' ? args.system.trim() : '';
  if (system) {
    if (!SYSTEM_ENUM.includes(system)) return `未知体系「${system}」。可选：${SYSTEM_ENUM.join('、')}`;
    const keys = [...new Set(SYSTEM_PARAMS[system])];
    return [
      `# ${system} 参数`,
      `必填：${SYSTEM_REQUIRED[system]}`,
      `可用键：${keys.join('、')}`,
      '',
      ...keys.map((k) => paramDoc(k, all[k])),
    ].join('\n');
  }
  return [
    '# metaphysics_chart 参数索引',
    `顶层通用参数：${CORE_KEYS.join('、')}`,
    '体系专属参数放进 options；各体系可用键：',
    ...SYSTEM_ENUM.map((s) => `- ${s}：${[...new Set(SYSTEM_PARAMS[s])].join('、')}`),
    '',
    '查单个参数全文：metaphysics_help({ key: "参数名" })；查某体系：metaphysics_help({ system: "ziwei" })',
  ].join('\n');
}

function helpDefinition(all) {
  return {
    name: 'metaphysics_help',
    description: '查 metaphysics_chart 的参数说明：省略参数给体系索引；system 给该体系的必填项与参数全解；key 给单个参数全文。只在不确定键名或取值时调用，排盘本身不需要它。',
    parameters: {
      type: 'object',
      properties: {
        system: { type: 'string', enum: SYSTEM_ENUM, description: '要查的体系，如 ziwei / fengshui / name；省略则返回全部体系的键索引。' },
        key: { type: 'string', description: '要查的参数名，如 brightnessSchool、sitting、action；给出时优先于 system。' },
      },
    },
    output: {
      schema: { type: 'object' },
      render: (_args, value) => [{ type: 'text', text: String((value && value.text) || '') }],
    },
    async execute(args) {
      return { text: helpText(all, args || {}) };
    },
  };
}

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
    // 联网失败不写缓存：否则会连着 6 小时把「解析失败」当成答案，网络恢复也翻不了身
    if (value && !value.onlineFailed) geoCache.set(key, value);
    return value;
  }

  /** 工具主体的实际流程：参数整形 → 地址解析（默认离线） → 排盘 */
  async function run(rawArgs) {
    if (!rawArgs || typeof rawArgs !== 'object' || Array.isArray(rawArgs)) throw bad('参数必须是对象');
    // 渐进披露写法先摊平：后面的句柄合并、地址解析与体系校验都只认扁平参数
    const args = flattenOptions(rawArgs, ALL_PARAMS, bad);
    if (args.geocode !== undefined && args.geocode !== 'offline' && args.geocode !== 'online') {
      throw bad(`geocode 只能是 offline / online，收到「${args.geocode}」`);
    }
    // 句柄先并回完整参数：后面的地址解析、日期补全与口径对照都按同一份参数走，
    // 否则追问时只带 handle 会漏掉出生地（真太阳时）与 system 判断
    let next;
    try {
      next = { ...resolveHandle(args) };
    } catch (e) {
      throw e && e.code ? e : bad(`handle 无法使用：${String((e && e.message) || e)}`);
    }
    if (typeof next.system !== 'string' || !next.system.trim()) {
      throw bad('需要 system（或带 system 的 handle）：例如 { system: "bazi", datetime: "1990-05-12T14:30", gender: "male" }');
    }
    // 一句话改参：先落到参数上，后面的地址解析、日期补全才按改后的体系走；
    // 改了什么同时留给对外回显（compute 里也会再算一遍，结果相同，这里以宿主这份为准）
    let revision = null;
    let revisionChangedAddress = false;
    if (typeof next.revise === 'string' && next.revise.trim()) {
      const rev = parseRevision(next.revise);
      const before = { ...next };
      revisionChangedAddress = typeof rev.patch.address === 'string';
      next = pruneForeignKeys({ ...next, ...rev.patch }, ownedKeys(args, rev.patch));
      revision = {
        text: rev.text,
        applied: rev.labels.map((l) => {
          const from = before[l.key] === undefined ? null : before[l.key];
          return { ...l, from, fromDisplay: displayValue(l.key, from) };
        }),
        ignored: rev.ignored,
      };
    }
    // 句柄与一句话改参都可能带来 "true"/"9" 这类字符串写法：归一后再做体系校验与排盘
    next = normalizeArgs(next, ALL_PARAMS, bad);
    if (next.shadow === true && !next.shadowVersion) next.shadowVersion = PKG_VERSION;
    // hour / date / minute 只有会读它们的体系放行：其它体系收了也不看，用户以为改的是时刻，
    // 实际仍按 datetime（或 00:00）排。宁可直接报错，也不静默排成另一张盘。
    // name 例外——它除 datetime 外还支持「年/月/日(+时/分)」分开给生辰（engine/index.js 的 name 分支真读）。
    const HOUR_SYSTEMS = new Set(['chenggu', 'xiaoliuren', 'name']);
    if (next.hour !== undefined && next.hour !== null && !HOUR_SYSTEMS.has(next.system)) {
      throw bad(`hour 仅用于 chenggu / xiaoliuren / name；${next.system} 请把时刻写进 datetime，例如 1990-05-12T14:30`);
    }
    if (next.minute !== undefined && next.minute !== null && next.system !== 'name') {
      throw bad(`minute 仅用于 name（配合 year / month / day）；${next.system} 请把时刻写进 datetime，例如 1990-05-12T14:30`);
    }
    if (next.date !== undefined && next.date !== null && next.system !== 'xiaoliuren') {
      throw bad(`date 仅用于 xiaoliuren 时间起课；${next.system} 请用 datetime`);
    }
    // 自由文本长度上限：这些串会整段进句柄（handle 是参数的 base64url），
    // 不设限就等于允许一次调用把结果撑到几百 KB——摘要、句柄、影子盘四处都要重抄一遍。
    const MAX_LEN = { address: 80, question: 300, revise: 200, ask: 200, surname: 16, givenName: 16 };
    for (const [k, lim] of Object.entries(MAX_LEN)) {
      if (typeof next[k] === 'string' && next[k].length > lim) {
        throw bad(`${k} 最长 ${lim} 个字符（收到 ${next[k].length} 个）；写要点即可，例如「成都」「今年是否适合换工作」`);
      }
    }
    for (const who of ['partner', 'partner2']) {
      const p = next[who];
      if (p && typeof p === 'object' && typeof p.address === 'string' && p.address.length > MAX_LEN.address) {
        throw bad(`${who}.address 最长 ${MAX_LEN.address} 个字符（收到 ${p.address.length} 个）`);
      }
    }
    // 经度先按引擎那把尺归一（"87.6" → 87.6；非十进制 / 超范围当场报错）：
    // 下面的 resolveGeo 只认 typeof === 'number'，不归一时数字串形式的显式经度会被联网结果顶掉，
    // 用户明明写了喀什 87.6，盘却按解析出的 121.5 排。
    try {
      next = normalizeLongitudes(next);
    } catch (e) {
      throw e && e.code ? e : bad(`经度无法使用：${String((e && e.message) || e)}`);
    }
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
          // 标出来源：下一轮换了地址/一句话改参时，派生经度要丢掉重解析，
          // 否则新地址被旧经度顶掉，盘不变、不联网、也不提示。
          person.longitudeFromGeo = true;
          person.geo = geo;
        }
      } catch (e) {
        // 联网失败不影响排盘，退回内置表
      }
    };
    // 句柄里带着上一轮的经度（可能是联网派生的）。本次显式给了新地址，或一句话改了出生地，
    // 就先把派生经度清掉，让 resolveGeo 按新地址重新解析；用户亲手给的 longitude 不动。
    const dropGeo = (person) => {
      if (!person) return person;
      const out = { ...person };
      delete out.longitude;
      delete out.geo;
      delete out.longitudeFromGeo;
      return out;
    };
    const hadHandle = typeof args.handle === 'string' && args.handle.trim() !== '';
    if (hadHandle) {
      // 换了地址却没另给经度：句柄里的旧经度（可能是联网派生的）必须让位，否则盘不变。
      if ((typeof args.address === 'string' || revisionChangedAddress) && args.longitude === undefined) next = dropGeo(next);
      if (args.partner && typeof args.partner === 'object' && args.partner.longitude === undefined
        && typeof args.partner.address === 'string') next.partner = dropGeo(next.partner);
      if (args.partner2 && typeof args.partner2 === 'object' && args.partner2.longitude === undefined
        && typeof args.partner2.address === 'string') next.partner2 = dropGeo(next.partner2);
    }
    // fengshui 不在名单里：玄空/八宅只看 year/month/day/gender 与坐向，
    // 经度对盘面毫无影响，把出生地发给第三方就是纯外泄。
    if (next.system === 'bazi' || next.system === 'ziwei' || next.system === 'hepan'
      || next.system === 'trend' || next.system === 'name') {
      await resolveGeo(next);
    }
    if (next.system === 'hepan' && next.partner && typeof next.partner === 'object') {
      next.partner = { ...next.partner }; // 不改调用方传进来的对象
      await resolveGeo(next.partner);
    }
    // 第三方也按出生地修正：只给主方与对方解析，三方盘里的第三人就永远用离线表，
    // 与另外两人的口径不一致。
    if (next.system === 'hepan' && next.partner2 && typeof next.partner2 === 'object') {
      next.partner2 = { ...next.partner2 };
      await resolveGeo(next.partner2);
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
    // 工具面默认给 brief：模型九成只要结论，全文里一半以上是长论述与「规则·出处」。
    // 引擎/面板的缺省仍是 full（UI 要完整解析）；模型追问依据时显式传 detail:"full"。
    if (next.withInterpret === true && (next.detail === undefined || next.detail === null || next.detail === '')) {
      next.detail = 'brief';
    }
    const out = compute(next);
    if (revision) out.revision = revision;
    // 显式要求时才做口径对照：每次要额外排 2–3 张盘，默认不付这笔开销
    if (next.diff === true) {
      const cmp = caliberCompare(next);
      if (cmp.switches.length) out.caliber = cmp;
    }
    return out;
  }

  // 88 个参数的单一来源：顶层/options 只是它的两种视图，help 也读这一份。
  // 新增参数只改这里与 CORE_KEYS/OPTION_KEYS/OPTION_HINTS，别在两个地方各写一份。
  const ALL_PARAMS = {
        handle: {
          type: 'string',
          description:
            '排盘句柄（mc1.xxx.yyy）：带到下一次调用即可只给增量参数，不必重报出生信息；截断或改字报 E_HANDLE。',
        },
        revise: {
          type: 'string',
          description:
            '一句话改参：把用户原话放这里（如「女命」「换成紫微看 2030 年事业」），引擎翻译成参数补丁并在 revision 回报；识别不到不猜。',
        },
        system: {
          type: 'string',
          enum: SYSTEM_ENUM,
          description: 'bazi = 四柱八字（含调候与《穷通宝鉴》用神）；ziwei = 紫微斗数；liuyao = 六爻（纳甲、用神与旺衰）；tarot = 塔罗；meihua = 梅花易数；daliuren = 大六壬；hepan = 合盘（合婚），需给 partner；qimen = 奇门遁甲（时家转盘，拆补法）；almanac = 黄历（某日宜忌/冲煞/建除/节气）；zeri = 择日（区间或候选日逐日打分；宜忌依《协纪辨方书》用事与六等轻重）；chenggu = 袁天罡称骨（骨重 + 称骨歌 + 白话）；xiaoliuren = 小六壬（时间或报数）；star = 星座当日基调；numerology = 生命数字；mbti = 十六型人格（24 题：给 answers 出类型，不给先返回题目）；constitution = 中医体质（九种各 5 题：给 answers 出主次，不给先返回题目）；wuyunliuqi = 五运六气（大寒界；中运太过不及、司天在泉、客运客气六步）；taiyi = 太乙神数（积年推局；太乙落宫、八门、文昌）；trend = 人生 K 线（大运/流年走势）；fengshui = 风水（八宅/飞星/门主灶/玄空，action 三选一）；name = 起名（391 字库五行评估与候选；未收录字传 charElements）；convert = 公农历互转（solar2lunar / lunar2solar）。',
        },
        datetime: {
          type: 'string',
          description:
            '公历本地时间，如 1990-05-12T14:30。bazi / ziwei 必填；almanac / star / numerology 只需日期；日期类体系省略时补今天。',
        },
        date: {
          type: 'string',
          description: '仅 xiaoliuren 时间起课：日期 YYYY-MM-DD（与 hour 成对）。',
        },
        hour: {
          type: 'integer',
          description: '时辰小时 0–23：chenggu 补时辰、xiaoliuren 时间起课、name 生辰。',
        },
        minute: {
          type: 'integer',
          description: '分钟 0–59，仅 name 配合 year/month/day 用。',
        },
        dst: {
          type: 'boolean',
          description: '是否校正 1986–1991 夏令时，默认 true。',
        },
        gender: {
          type: 'string',
          enum: ['male', 'female'],
          description: '性别 male / female，bazi / ziwei / hepan 必填。',
        },
        address: {
          type: 'string',
          description:
            '出生地（省/市即可），用于真太阳时；与 longitude 同时给出时以后者为准。',
        },
        geocode: {
          type: 'string',
          enum: ['offline', 'online'],
          description:
            '地址解析：offline（默认，内置表）/ online（发第三方 Nominatim，仅明确要求区县时）。',
        },
        longitude: {
          type: 'number',
          description:
            '出生地经度（东经为正），如乌鲁木齐 87.6、北京 116.4。',
        },
        lateZi: {
          type: 'boolean',
          description:
            '23:00 后是否算次日；多数体系默认 true，qimen 默认 false。',
        },
        trueSolar: {
          type: 'boolean',
          description: '是否启用真太阳时，默认 true；无经度时退回平太阳时。',
        },
        lines: {
          type: 'array',
          items: { type: 'number' },
          description:
            '六爻，自下而上六个值：6 老阴(动)、7 少阳、8 少阴、9 老阳(动)。省略则随机摇卦。',
        },
        question: {
          type: 'string',
          description: '所问之事：liuyao / tarot / meihua 用于取象，withInterpret 时写进解析。',
        },
        task: {
          type: 'string',
          enum: ['嫁娶', '订婚', '领证', '提亲', '收送聘金', '满月酒', '开业', '交易', '投资', '签订合同', '签约', '纳财', '入宅', '搬家', '搬家入宅', '动土', '装修', '装修建造', '安葬', '出行', '旅行', '赴任', '访亲友', '祭祀', '求医', '入学', '试车买车'],
          description: '仅 zeri 使用：要挑的事项。',
        },
        startDate: {
          type: 'string',
          description: '仅 zeri 使用：起算日（公历 YYYY-MM-DD）。省略则由宿主补今天；给了 candidates 时不需要。',
        },
        days: {
          type: 'number',
          description: '仅 zeri 使用：往后考察天数，1–60，默认 30；给了 candidates 时忽略。',
        },
        candidates: {
          type: 'array',
          items: { type: 'string' },
          description: '仅 zeri 使用：候选日比较（2–12 个真实公历日期，如 ["2026-12-01","2026-12-08"]）。给了就只比这几天，结果多一个 compare（这一组最优、同分者、分差）与逐日并排；不替代 startDate 扫区间。',
        },
        shengXiao: {
          type: 'string',
          enum: ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
          description: '仅 zeri 使用：当事人属相，用于排除冲煞日（不给则不排除）。',
        },
        mode: {
          type: 'string',
          enum: ['solar2lunar', 'lunar2solar', 'time', 'number'],
          description:
            '取值按体系分三组。convert：solar2lunar / lunar2solar；meihua：time / number；xiaoliuren：time / number。',
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
          description: '询问方向（配合 withInterpret）：general / wealth / career / love / health / study / travel。',
        },
        cross: {
          type: 'boolean',
          description: 'bazi / ziwei：为同一出生信息再排另一套盘，返回交叉验证，不合并数值。',
        },
        hourUnknown: {
          type: 'boolean',
          description: '出生时刻未知（bazi / trend）：只排三柱并标注；ziwei / hepan 直接阻断。',
        },
        diff: {
          type: 'boolean',
          description: '口径对照（bazi / ziwei / qimen）：按另一档口径再排一次，只列差异不改盘。',
        },
        shadow: {
          type: 'boolean',
          description: '影子盘：结果附短 ID，同参数同 ID，用于回放/对拍。',
        },
        trace: {
          type: 'boolean',
          description: '推导链（liuyao / bazi / ziwei / qimen / daliuren）：返回每层规则与中间值，另给 traceText。',
        },
        verifyPast: {
          type: 'number',
          description: '验前事（bazi）：传年数，返回过去 N 年流年信号行。',
        },
        rectify: {
          type: 'boolean',
          description: '生时校正（bazi）：配合 events 给候选时辰排序。',
        },
        events: {
          type: 'array',
          description: '生时校正用的过去事件：年份 + 类别。',
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
          description: '追问：围绕已算好的盘回答某年/某方面，只取盘面字段。',
        },
        withInterpret: {
          type: 'boolean',
          description: '是否附带解析与详解，默认 false；追问依据时再开。仅八字/紫微/六爻/梅花/大六壬/奇门/塔罗产出解析；合盘、人生 K 线、起名与速查类不产这一段。',
        },
        detail: {
          type: 'string',
          enum: ['brief', 'lean', 'full'],
          description: '解析档位（仅 withInterpret）：缺省 brief（结论+所问方向+三张表，表最多 8 行，不按体积截断）/ lean 再给其余维度 / full 全论述与规则出处。',
        },
        asOf: {
          type: 'string',
          description: '基准时刻（如 2026-10-22T16:00）：紫微定流月日时，八字定流年起点，塔罗记抽牌时刻。',
        },
        seed: {
          type: 'number',
          description: '随机种子（tarot / liuyao）：同 seed 可复现。',
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
          description: '合盘对方：datetime + gender 必填，address 可选。仅 hepan 使用。',
          properties: {
            datetime: { type: 'string', description: '对方公历本地时间，如 1998-05-20T10:30' },
            gender: { type: 'string', enum: ['male', 'female'], description: '对方性别（决定对方大运/大限顺逆）' },
            address: { type: 'string', description: '对方出生地（省/市即可）' },
            trueSolar: { type: 'boolean', description: '对方是否启用真太阳时' },
          },
          required: ['datetime', 'gender'],
        },
        partner2: {
          type: 'object',
          description: '三方合盘（可选）：第三个人的出生信息，字段与 partner 相同。给了就多回 triple——你×对方、你×第三方、对方×第三方三对分数并列，不合成「三人总分」。仅 hepan 使用；null 与省略等价，不要传 null。',
          properties: {
            datetime: { type: 'string', description: '第三方公历本地时间，如 1988-09-09T08:00' },
            gender: { type: 'string', enum: ['male', 'female'], description: '第三方性别' },
            address: { type: 'string', description: '第三方出生地（省/市即可）' },
            trueSolar: { type: 'boolean', description: '第三方是否启用真太阳时' },
          },
          required: ['datetime', 'gender'],
        },
        chart: {
          type: 'string',
          enum: ['bazi', 'ziwei'],
          description: '仅 hepan 使用：合盘底层用哪套盘（bazi 四柱合参 / ziwei 紫微合盘），默认 bazi。',
        },
        rectifyHours: {
          type: 'array',
          items: { type: 'integer', minimum: 0, maximum: 23 },
          description: '仅八字 rectify 使用：只在这些时辰（0–23）里候选；省略则用全部十二时辰。用于已知大致时段时缩小范围。',
        },
        upper: { type: 'number', description: '梅花数字起卦：第一个数（定上卦），与 lower 成对。' },
        lower: { type: 'number', description: '梅花数字起卦：第二个数（定下卦）。' },
        changing: { type: 'number', description: '梅花数字起卦：可手动指定动爻（1-6）；省略则按两数之和取。' },
        count: {
          type: 'number',
          enum: [1, 3, 5],
          description: '塔罗张数：1 单张指引、3 过去现在未来、5 五张局势。默认 3。给了 spread 时以 spread 为准。',
        },
        spread: {
          type: 'string',
          enum: ['one', 'three', 'five', 'celtic', 'either', 'relation', 'timeflow'],
          description: '塔罗牌阵（按问法选，张数由牌阵决定）：one 单张指引｜three 过去现在未来｜five 五张局势｜celtic 凯尔特十字 10 张｜either 二选一 5 张（A 的发展/结果、B 的发展/结果）｜relation 关系阵 7 张（你/对方/现状/双方期待/阻碍/走向）｜timeflow 时间流 3 张（眼下/这阵子/往后）。不给则按 count。',
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
          enum: ['qs1', 'qs2', 'zhong-yiming'],
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
        shenzhuSchool: {
          type: 'string',
          enum: ['common', 'verse'],
          description: '紫微斗数：身主安法（只影响子/午年生人）。common（默认，通行表）子午皆火星；verse 按安身主诀「子午安身铃火宿」逐字取子铃星、午火星。',
        },
        mingzhuSchool: {
          type: 'string',
          enum: ['soul-branch', 'year-branch'],
          description: '紫微斗数：命主取法。两派共用同一张十二支→命主星的表（子贪狼、丑亥巨门、寅戌禄存、卯酉文曲、辰申廉贞、巳未武曲、午破军），分歧只在拿哪个地支去查：soul-branch（默认，通行本 /《紫微斗数全书》卷二「安命主」）用命宫地支，year-branch（中州派口径）用生年年支。命主的定义是「依地支指定的一颗星」，命宫里不一定有它，换取法不改任何宫位与星曜落宫。实测命宫地支与生年年支重合的只占约 8%，两派约九成的人结果不同。',
        },
        zuoyaoSchool: {
          type: 'string',
          enum: ['minimal', 'full'],
          description: '紫微斗数：杂曜取盘。minimal（默认，通行简盘 49 颗，与旧盘和存档一致）；full 另按安星诀补入十二颗杂曜（解神、天巫、天月、阴煞、天官、天福、天厨、蜚廉、天德、年解、天才、天寿），共 61 颗。诀文属近代通行辑本并核，非《紫微斗数全书》原文。',
        },
        liunianSihua: {
          type: 'string',
          enum: ['year-stem', 'life-palace-stem'],
          description: '紫微斗数：流年四化的取干口径。year-stem（默认）用该年干支的天干，life-palace-stem 改用该年流年命宫那一宫的宫干（另一档：按流年命宫宫干取）。年干随年份走，命宫宫干由五虎遁从生年干起，两者是两张表，实测十二年会换十二次，四颗化星全变。每年回显 sihuaStem / sihuaStemFrom 说明实际用了哪一干。',
        },
        sihuaVariant: {
          type: 'string',
          enum: ['default', '廉破曲阳', '贪阴阳机', '阳武同阴', '阳武府同', '阳武府相',
            '阳武同相', '巨阳武昌', '梁紫府武', '梁紫相武', '破巨阳贪'],
          description: '紫微斗数：十干四化变体，整表替换生年、宫干自化、大限宫干、飞星与流年所查的那张表。default（默认）各干取通行表；其余取值按通行变体口诀四字命名，依禄权科忌顺序念，如 廉破曲阳 = 廉贞禄破军权文曲科太阳忌。可选：廉破曲阳（甲）、贪阴阳机（戊）、阳武同阴/阳武府同/阳武府相/阳武同相（庚）、巨阳武昌（辛）、梁紫府武/梁紫相武（壬）、破巨阳贪（癸）；乙丙丁己四干无变体。变体天干与所查该干不符时不生效，不会串表。与庚干那一项重叠时以本参数为准。',
        },
        jieluSchool: {
          type: 'string',
          enum: ['off', 'zhongzhou'],
          description: '紫微斗数：截路空亡（截空、副截、旬空、副旬这一组杂曜）取舍。off（默认，通行本）照常排；zhongzhou（中州派）整组不排——《中州派紫微斗数》体系不收截路空亡。只影响杂曜清单，不动宫盘与主星。需 jiekongSchool 非 off 才能看到差别。',
        },
        suipoSchool: {
          type: 'string',
          enum: ['off', 'zhongzhou'],
          description: '紫微斗数：岁前十二神的记名口径。off（默认，通行本）照常；zhongzhou（中州派）把「大耗」改记作「岁破」，宫位不变、只换名字。依据《中州派紫微斗数》岁前十二神以岁破代大耗。',
        },
        action: {
          type: 'string',
          enum: ['natal', 'advise', 'xuankong', 'assess', 'generate'],
          description: '子动作。fengshui：natal（默认，算八宅命卦+流年飞星，需生日与性别）、advise（算宅卦门主灶布局，需 sitting 或 facing，出生信息可选）、xuankong（玄空下卦/替卦九宫盘，需 sitting 或 facing，运由 period 或 fortuneYear 定，缺省九运并注明；兼向报 sittingOffset/degree，飞星报 fortuneDate/fortuneTime）；name：assess（默认，评估已有名字，需 surname + givenName）、generate（生成候选名，需生辰，可选 surname / limit）。',
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
          description: '仅 fengshui xuankong：三元九运的运（1–9）。优先于 fortuneYear 与飞星日期；省略时按 fortuneYear 定，再缺省按九运（2024–2043）并注明。',
        },
        sittingOffset: {
          type: 'number',
          description: '仅 fengshui xuankong：坐山偏离本山中心的度数（−7.5–7.5，正数向下一山）。超过 4.5° 自动按沈氏替卦排盘。与 sittingDegree 二选一；坐向都给须一致。',
        },
        sittingDegree: {
          type: 'number',
          description: '仅 fengshui xuankong：坐山罗盘度数（0–360）。引擎换算为相对本山中心的偏移，超过 4.5° 用替卦。',
        },
        facingOffset: {
          type: 'number',
          description: '仅 fengshui xuankong：向山偏离本山中心的度数（−7.5–7.5）。给了 sittingOffset/degree 时可省略；两者都给须一致。',
        },
        facingDegree: {
          type: 'number',
          description: '仅 fengshui xuankong：向山罗盘度数（0–360）。用于反推兼向，与坐山读数须一致。',
        },
        fortuneDate: {
          type: 'string',
          description: '仅 fengshui xuankong：飞星日期 YYYY-MM-DD（公历）。给了才排月/日/时紫白；只给 fortuneYear 时只排年星。',
        },
        fortuneTime: {
          type: 'string',
          description: '仅 fengshui xuankong：飞星时刻 HH:MM（默认 12:00）；日星 23:00 后归次日。',
        },
        surname: { type: 'string', description: '仅 name 使用：姓氏，如「李」（复姓整体写，如「欧阳」）。' },
        givenName: { type: 'string', description: '仅 name assess 使用：名（1–2 个汉字）。' },
        limit: { type: 'number', description: '仅 name generate 使用：候选个数（1–20，默认 10）。' },
        charElements: {
          type: 'object',
          description: '仅 name 使用：给未收录字指定五行，如 {"琰":"火"}。字库里有该字时以字库为准。',
          additionalProperties: { type: 'string', enum: ['木', '火', '土', '金', '水'] },
        },
        strokeOverrides: {
          type: 'object',
          description: '仅 name 使用：逐字覆盖康熙笔画，如 {"沐":8}。用于字库未收的字或按别派笔画计算。',
          additionalProperties: { type: 'integer', minimum: 1 },
        },
        surnameStrokes: {
          type: 'object',
          description: '仅 name 使用：按姓氏逐字覆盖康熙笔画，如 {"欧":15,"阳":17}；strokeOverrides 优先。',
          additionalProperties: { type: 'integer', minimum: 1 },
        },
        year: { type: 'integer', description: '公历出生年（仅 name 的 assess/generate，配合 month/day/hour；也可直接用 datetime）。' },
        month: { type: 'integer', description: '公历出生月 1–12（仅 name）。' },
        day: { type: 'integer', description: '公历出生日 1–31（仅 name）。' },
        answers: {
          type: 'array',
          items: { type: ['integer', 'null'] },
          description: '仅 mbti 使用：按题目顺序的 24 个分数，1（完全不像）–5（很像我）；跳过某题传 null。不给则返回问卷题目，答满 12 题即可出类型。',
        },
  };

  const definition = {
    name: TOOL_NAME,
    description: DESCRIPTION,
    parameters: {
      type: 'object',
      // 不写 required：只带 handle 的追问是文档主推用法，schema 层拦住会让宿主先拒绝。
      // 真正的必填校验放到 run()：system 或 handle 至少给一个。
      properties: buildProperties(ALL_PARAMS),
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

  // help 先注册、chart 后注册：工具列表里两者都在，而测试与宿主按最后一次注册取主工具。
  ctx.effect(() => ctx.tools.register(helpDefinition(ALL_PARAMS)));
  ctx.effect(() => ctx.tools.register(definition));
}



