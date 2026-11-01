// C2 对话→参数回填：把「换成紫微看 2030 年事业」这类一句话改参，翻成具体的参数补丁。
//
// 只做「明确的改参句式」：识别不到就原样返回，绝不猜——猜错会把用户的盘悄悄换成另一张。
// 所以每条规则都要求有切换词（换成 / 改成 / 看 / 用 / 按…），单纯提一句「紫微」不算。
// 出生时间、经度这类需要精确值的字段不在这里改（一句话改不出分秒），只提示改传原始参数。

const SYSTEMS = [
  { key: 'ziwei', label: '紫微', re: /紫微|斗数/ },
  { key: 'bazi', label: '八字', re: /八字|四柱/ },
  { key: 'liuyao', label: '六爻', re: /六爻|摇卦/ },
  { key: 'qimen', label: '奇门', re: /奇门/ },
  { key: 'daliuren', label: '大六壬', re: /大六壬|六壬/ },
  { key: 'tarot', label: '塔罗', re: /塔罗|抽牌/ },
  { key: 'meihua', label: '梅花', re: /梅花/ },
  { key: 'hepan', label: '合盘', re: /合盘|合婚/ },
  { key: 'almanac', label: '黄历', re: /黄历|老黄历/ },
  { key: 'zeri', label: '择日', re: /择日|挑日子/ },
  { key: 'fengshui', label: '风水', re: /风水/ },
  { key: 'name', label: '起名', re: /起名|取名/ },
  { key: 'chenggu', label: '称骨', re: /称骨/ },
  { key: 'xiaoliuren', label: '小六壬', re: /小六壬/ },
  { key: 'star', label: '星座', re: /星座/ },
  { key: 'numerology', label: '生命数字', re: /生命数字|生命灵数/ },
  { key: 'mbti', label: 'MBTI', re: /mbti|人格测试|十六型/i },
  { key: 'trend', label: '人生 K 线', re: /k\s*线|人生曲线/i },
  { key: 'convert', label: '公农历互转', re: /农历转公历|公历转农历|公农历/ },
];

const DIRECTIONS = [
  { key: 'love', label: '感情', re: /感情|婚姻|恋爱|对象|夫妻/ },
  { key: 'wealth', label: '财运', re: /财运|财富|赚钱|收入|破财/ },
  { key: 'career', label: '事业', re: /事业|工作|升职|跳槽/ },
  { key: 'health', label: '健康', re: /健康|身体|疾病|病/ },
  { key: 'study', label: '学业', re: /学业|考试|考研|升学|读书/ },
  { key: 'travel', label: '出行', re: /出行|搬家|迁移|旅行|外地/ },
];

const SWITCH = /换成|改成|改为|换到|改看|再看|再看一下|换一套|排一?张|用|按|看/;

const cleanPlace = (s) => String(s || '')
  .replace(/(出生|出生地|所在地|人)$/, '')
  .replace(/[的了].*$/, '')
  .trim();

/**
 * 一句话改参 → 参数补丁。
 * @returns {{text:string, patch:object, labels:{key:string,label:string,value:any,display:string}[], ignored:string[]}}
 */
export function parseRevision(text) {
  const src = String(text == null ? '' : text).trim();
  const patch = {};
  const labels = [];
  const ignored = [];
  if (!src) return { text: '', patch, labels, ignored };

  // ① 换体系：必须有切换词，避免把「紫微里怎么说」当成要换盘
  if (SWITCH.test(src)) {
    for (const s of SYSTEMS) {
      if (s.re.test(src)) {
        patch.system = s.key;
        labels.push({ key: 'system', label: '体系', value: s.key, display: s.label });
        break;
      }
    }
  }

  // ② 性别
  if (/女命|女性|换成女|改成女|女盘/.test(src)) {
    patch.gender = 'female';
    labels.push({ key: 'gender', label: '性别', value: 'female', display: '女' });
  } else if (/男命|男性|换成男|改成男|男盘/.test(src)) {
    patch.gender = 'male';
    labels.push({ key: 'gender', label: '性别', value: 'male', display: '男' });
  }

  // ③ 晚子时：只认「晚子时」出现在改写句里
  if (/晚子时/.test(src)) {
    if (/不换日|不换天|算当日|归当日|按当日|当天/.test(src)) {
      patch.lateZi = false;
      labels.push({ key: 'lateZi', label: '晚子时', value: false, display: '23:00 后仍算当日' });
    } else if (/换日|算次日|归次日|按次日|第二天|次日/.test(src)) {
      patch.lateZi = true;
      labels.push({ key: 'lateZi', label: '晚子时', value: true, display: '23:00 后算次日' });
    }
  }

  // ④ 真太阳时
  if (/真太阳时/.test(src)) {
    if (/不用|不要|关闭|关掉|取消|不算/.test(src)) {
      patch.trueSolar = false;
      labels.push({ key: 'trueSolar', label: '真太阳时', value: false, display: '用东八区平太阳时' });
    } else {
      patch.trueSolar = true;
      labels.push({ key: 'trueSolar', label: '真太阳时', value: true, display: '按出生地经度校正' });
    }
  }

  // ⑤ 夏令时
  if (/夏令时/.test(src)) {
    if (/不用|不要|关闭|关掉|取消|不校正/.test(src)) {
      patch.dst = false;
      labels.push({ key: 'dst', label: '夏令时', value: false, display: '不自动校正 1986–1991 夏令时' });
    } else {
      patch.dst = true;
      labels.push({ key: 'dst', label: '夏令时', value: true, display: '自动校正 1986–1991 夏令时' });
    }
  }

  // ⑥ 出生地：只认「出生在 X」「出生地改成 X」这两种明确句式
  const place = src.match(/出生在\s*([\u4e00-\u9fa5]{2,12})/)
    || src.match(/出生地(?:改成|改为|换成|换到|是|为)?\s*([\u4e00-\u9fa5]{2,12})/)
    || src.match(/改到\s*([\u4e00-\u9fa5]{2,12})\s*出生/);
  if (place) {
    const name = cleanPlace(place[1]);
    if (name.length >= 2) {
      patch.address = name;
      labels.push({ key: 'address', label: '出生地', value: name, display: name });
    }
  }

  // ⑦ 看哪一年：只认「看 / 查 / 问 + 年份」，避免把「1990 年出生」当成流年
  const year = src.match(/(?:看|查|问|到|到了|临近)\s*((?:19|20)\d{2})\s*年/)
    || src.match(/((?:19|20)\d{2})\s*年(?:的)?(?:运势|怎么样|如何|会怎样|流年)/);
  if (year) {
    const y = Number(year[1]);
    patch.asOf = `${y}-01-01T00:00`;
    labels.push({ key: 'asOf', label: '流年基准', value: patch.asOf, display: `${y} 年` });
  } else if (/(出生|生年)/.test(src) && /(19|20)\d{2}\s*年/.test(src)) {
    ignored.push('出生年份没改：一句话改不出日与时辰，请直接传 datetime（如 1993-04-08T06:20）');
  }

  // ⑧ 询问方向
  for (const d of DIRECTIONS) {
    if (d.re.test(src)) {
      patch.direction = d.key;
      labels.push({ key: 'direction', label: '询问方向', value: d.key, display: d.label });
      break;
    }
  }

  // ⑨ 明确要求带解读：只在这种改写句里才自动开，避免默认输出变长
  if (/解读|详解|详细说|说人话/.test(src) && !/不要解读|不用解读|别解读/.test(src)) {
    patch.withInterpret = true;
    labels.push({ key: 'withInterpret', label: '解读', value: true, display: '附解析与详解' });
  }

  return { text: src, patch, labels, ignored };
}

export const REVISE_SYSTEMS = SYSTEMS;
export const REVISE_DIRECTIONS = DIRECTIONS;

/** 回显旧值：系统/性别/方向翻成中文，布尔翻成开/关，日期只留年份 */
export function displayValue(key, value) {
  if (value === undefined || value === null) return null;
  if (key === 'system') { const s = SYSTEMS.find((x) => x.key === value); return s ? s.label : String(value); }
  if (key === 'gender') return value === 'female' ? '女' : value === 'male' ? '男' : String(value);
  if (key === 'direction') { const d = DIRECTIONS.find((x) => x.key === value); return d ? d.label : String(value); }
  if (typeof value === 'boolean') return value ? '开' : '关';
  if (key === 'asOf') { const m = String(value).match(/^(\d{4})/); return m ? `${m[1]} 年` : String(value); }
  return String(value);
}
