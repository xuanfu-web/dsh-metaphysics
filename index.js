/**
 * Host 半：把排盘引擎注册成一个模型可调用的工具。
 * 纯计算；唯一的网络行为是按需把地址解析成经度（失败即退回内置坐标表）。
 */
import { compute, renderText, geocodeAddress } from './engine/index.js';
import { createLru } from './engine/lru.js';
import { cacheMetrics } from './engine/calendar.js';

export const inject = ['tools'];

/** DSH_METRICS=1 时把各缓存命中率打到 stderr（不污染工具返回值） */
function printCacheMetrics() {
  if (!process.env || process.env.DSH_METRICS !== '1') return;
  const rows = cacheMetrics().map((s) => `${s.name}: 命中 ${s.hits}/${s.hits + s.misses}（${(s.hitRate * 100).toFixed(1)}%），缓存 ${s.size}/${s.max}，淘汰 ${s.evictions}`);
  console.error(`[metaphysics] 缓存命中率 ── ${rows.join(' | ')}`);
}

const TOOL_NAME = 'metaphysics_chart';

const DESCRIPTION = [
  '排中国传统命理盘与塔罗：四柱八字（bazi）、紫微斗数（ziwei）、六爻纳甲（liuyao）、梅花易数（meihua）、大六壬（daliuren）、奇门遁甲（qimen）、合盘（hepan）或塔罗抽牌（tarot）。',
  '当用户明确要求“排盘 / 算八字 / 看四柱 / 排紫微盘 / 起卦 / 摇一卦 / 抽塔罗 / 看运势 / 合盘”时调用。',
  'bazi 与 ziwei 需要公历出生时间与性别；hepan 需要双方的时间与性别；liuyao 可给定六爻值或随机起卦；meihua 可按时间或数字起卦；tarot 可指定张数与问题。',
  '要给「结合所问之事的解读」时，把 withInterpret 设为 true，并尽量带上 question（所问之事）与 direction（询问方向）。',
  '结果可复现：tarot / liuyao 传 seed，紫微 / 八字 / 塔罗传 asOf；输出摘要会写明晚子时与真太阳时实际采用的口径。',
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
    if (next.system === 'bazi' || next.system === 'ziwei' || next.system === 'hepan') {
      await resolveGeo(next);
    }
    if (next.system === 'hepan' && next.partner && typeof next.partner === 'object') {
      next.partner = { ...next.partner }; // 不改调用方传进来的对象
      await resolveGeo(next.partner);
    }
    return compute(next);
  }

  const definition = {
    name: TOOL_NAME,
    description: DESCRIPTION,
    parameters: {
      type: 'object',
      properties: {
        system: {
          type: 'string',
          enum: ['bazi', 'ziwei', 'liuyao', 'tarot', 'meihua', 'daliuren', 'hepan', 'qimen'],
          description: 'bazi = 四柱八字；ziwei = 紫微斗数；liuyao = 六爻；tarot = 塔罗；meihua = 梅花易数；daliuren = 大六壬；hepan = 合盘（合婚），需同时给 partner；qimen = 奇门遁甲（时家转盘，拆补法）。',
        },
        datetime: {
          type: 'string',
          description:
            '公历本地时间，如 1990-05-12T14:30。bazi / ziwei 必填；liuyao 可选，仅用于取日辰定六神。',
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
        direction: {
          type: 'string',
          enum: ['general', 'wealth', 'career', 'love', 'health', 'study', 'travel'],
          description: '询问方向（仅配合 withInterpret 生效）：general 综合、wealth 财运、career 事业、love 感情、health 健康、study 学业、travel 出行。默认 general。',
        },
        cross: {
          type: 'boolean',
          description: '八字 / 紫微专用：为同一份出生信息再排另一套盘，返回「八字 × 紫微 交叉验证」（同向 / 有张力 / 互补），不合并数值。',
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
        leapAsNext: {
          type: 'boolean',
          description: '紫微斗数：闰月是否按次月起盘（默认按本月起盘）。',
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



