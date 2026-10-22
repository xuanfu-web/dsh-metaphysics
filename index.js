/**
 * Host 半：把排盘引擎注册成一个模型可调用的工具。
 * 纯计算；唯一的网络行为是按需把地址解析成经度（失败即退回内置坐标表）。
 */
import { compute, renderText, geocodeAddress } from './engine/index.js';

export const inject = ['tools'];

const TOOL_NAME = 'metaphysics_chart';

const DESCRIPTION = [
  '排中国传统命理盘与塔罗：四柱八字（bazi）、紫微斗数（ziwei）、六爻纳甲（liuyao）、梅花易数（meihua）、大六壬（daliuren）或塔罗抽牌（tarot）。',
  '当用户明确要求“排盘 / 算八字 / 看四柱 / 排紫微盘 / 起卦 / 摇一卦 / 抽塔罗 / 看运势”时调用。',
  'bazi 与 ziwei 需要公历出生时间；liuyao 可给定六爻值或随机起卦；meihua 可按时间或数字起卦；tarot 可指定张数与问题。',
  '要给「结合所问之事的解读」时，把 withInterpret 设为 true，并尽量带上 question（所问之事）与 direction（询问方向）。',
  '结果用于传统文化与娱乐参考，不得用于医疗、投资、法律、生死等确定性断言。',
].join('');

export function apply(ctx) {
  const definition = {
    name: TOOL_NAME,
    description: DESCRIPTION,
    parameters: {
      type: 'object',
      properties: {
        system: {
          type: 'string',
          enum: ['bazi', 'ziwei', 'liuyao', 'tarot', 'meihua', 'daliuren'],
          description: 'bazi = 四柱八字；ziwei = 紫微斗数；liuyao = 六爻；tarot = 塔罗；meihua = 梅花易数；daliuren = 大六壬。',
        },
        datetime: {
          type: 'string',
          description:
            '公历本地时间，如 1990-05-12T14:30。bazi / ziwei 必填；liuyao 可选，仅用于取日辰定六神。',
        },
        gender: {
          type: 'string',
          enum: ['male', 'female'],
          description: '性别，决定大运与大限顺逆。bazi / ziwei 必填。',
        },
        address: {
          type: 'string',
          description:
            '出生地地址，如「河北石家庄」「成都」「新疆喀什」。用于推算经度并按真太阳时排盘（bazi 与 ziwei 都适用）；只写到省市即可，内置地级市坐标表。与 longitude 同时给出时以 longitude 为准。',
        },
        longitude: {
          type: 'number',
          description:
            '出生地经度（东经为正），可选。适用于已知精确经度的情况，例如乌鲁木齐 87.6、北京 116.4。',
        },
        lateZi: {
          type: 'boolean',
          description: '23:00 后是否算次日（晚子时换日），默认 true。',
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
        withInterpret: {
          type: 'boolean',
          description: '是否附带「解析与详解」（五个维度 + 用神/格局等分节 + 免责声明）；默认 false，避免默认输出过长。',
        },
        asOf: {
          type: 'string',
          description: '紫微流月/流日/流时的基准时刻，形如 2026-10-22T16:00；省略则按调用时的本机当前时刻。要复现某一时刻的推演结果时请显式给出。',
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
      render: (_args, value) => [{ type: 'text', text: renderText(value) }],
    },
    async execute(args) {
      if (!args || typeof args !== 'object') throw new Error('参数必须是对象');
      const next = { ...args };
      // 地址 -> 经度：先查内置表，地址更细或未命中时联网（Nominatim）
      if ((next.system === 'bazi' || next.system === 'ziwei')
        && typeof next.address === 'string' && next.address.trim()
        && typeof next.longitude !== 'number') {
        try {
          const geo = await geocodeAddress(next.address, { online: true });
          if (geo && typeof geo.lon === 'number') {
            next.longitude = geo.lon;
            next.geo = geo;
          }
        } catch (e) {
          // 联网失败不影响排盘，退回内置表
        }
      }
      return compute(next);
    },
  };

  ctx.effect(() => ctx.tools.register(definition));
}
