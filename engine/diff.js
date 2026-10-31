// 口径差异：同一组参数在不同流派口径下排出的盘，逐字段比对
//
// 用途：口径（晚子时换日、真太阳时、拆补/超神接气/置闰、闰月归月）是命理圈争执最多的地方。
// 多数工具切换后只给新结果，用户不知道「哪里变了」。这里把变化摊开：
//   变化字段路径 + 旧值 → 新值 + 一句话总结。
//
// 只做结构化比对，不改动任何引擎的输出。

/** 比对时忽略的字段：文案、时间戳、口径回显、内部儒略日数字 */
const IGNORE_KEYS = new Set([
  'summary', 'interpret', 'castAt', 'asOf', 'precision', 'disclaimer', 'note',
  'trueSolarText', 'civilText', 'offsetMinutes',
  'input', // 只是把调用参数回显出来，不是盘面变化
  'jd',    // 内部儒略日，人类不可读；对外展示用 time 等格式化字段
  // 奇门把「这次用了哪个取局流派 / 晚子时归哪一天」写在结果里；换了开关它必然变，
  // 但它只是口径回显，不是盘面。不剔掉的话，两张完全相同的盘会被报成「2 处差异」。
  'juMethod', 'juMethodNote', 'lateZiHourMode',
  // 紫微把「闰月按哪种政策起盘」回显在 lunar 里；非闰月盘换政策时它也会变，
  // 但农历月份与宫位一字未动，不该报成差异。
  'leapPolicy',
]);

const isObject = (v) => v !== null && typeof v === 'object';

/**
 * 结构化差异
 * @returns {{path:string, from:any, to:any}[]}
 */
export function diffObjects(a, b, path = '', out = []) {
  if (a === b) return out;
  if (!isObject(a) || !isObject(b)) {
    out.push({ path: path || '(root)', from: a, to: b });
    return out;
  }
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const k of keys) {
    if (IGNORE_KEYS.has(k)) continue;
    const p = path ? `${path}.${k}` : k;
    const va = a[k];
    const vb = b[k];
    if (isObject(va) && isObject(vb)) {
      diffObjects(va, vb, p, out);
    } else if (JSON.stringify(va) !== JSON.stringify(vb)) {
      out.push({ path: p, from: va, to: vb });
    }
  }
  return out;
}

/** 路径 → 盘面栏位名；未命中细分规则时退回所属大类 */
const LABELS = [
  [/^pillars\.year\.ganzhi$/, '年柱'],
  [/^pillars\.month\.ganzhi$/, '月柱'],
  [/^pillars\.day\.ganzhi$/, '日柱'],
  [/^pillars\.hour\.ganzhi$/, '时柱'],
  [/^pillars\.\w+\.hidden/, '藏干'],
  [/^pillars\.\w+\.stemTenGod$/, '十神'],
  [/^pillars\.\w+\.kongwang/, '空亡'],
  [/^pillars\.\w+\.dishi$|^pillars\.\w+\.zizuo$/, '十二长生'],
  [/^pillars\.\w+\.nayin$/, '纳音'],
  [/^dayMaster\./, '日主'],
  [/^palaces\.(taiyuan|minggong|shengong)\./, '命身宫'],
  [/^palaces\.\d+\.(palace|branch|stem|ganzhi)$/, '宫位'],
  [/^palaces\.\d+\.stars\.\d+\.(name|brightness|type)$/, '星曜'],
  [/^palaces\.\d+\.shensha\./, '神煞'],
  [/^palaces\.\d+\.(daxian|xiaoxian)\./, '大限'],
  [/^palaces\.\d+\.sanfang\./, '三方四正'],
  [/^palaces\.\d+\./, '宫位'],
  [/^palaces\./, '命身宫'],
  [/^soul\./, '命宫'],
  [/^body\./, '身宫'],
  [/^doujun\./, '流年斗君'],
  [/^siZhu\.year$/, '年柱'],
  [/^siZhu\.month$/, '月柱'],
  [/^siZhu\.day$/, '日柱'],
  [/^siZhu\.time$/, '时柱'],
  [/^ju$|^juNumber$/, '局数'],
  [/^yuan$/, '三元'],
  [/^dun$/, '阴阳遁'],
  [/^daxian(List)?\./, '大限'],
  [/^fly(Chains|Composite)?\./, '飞星'],
  [/^pattern/, '格局'],
  [/^schools\./, '流派回显'],
  [/^dayun\.jiao\./, '起运'],
  [/^dayun\.toNextJieDays$/, '起运时间'],
  [/^dayun\.list\.(\d+)\.ganzhi$/, '大运干支'],
  [/^dayun\.startAge\./, '起运时间'],
  [/^dayun\./, '大运评分'],
  [/^liunian\./, '流年'],
  [/^jieqi\./, '节气边界'],
  [/^solarTime\./, '真太阳时'],
  [/^dayGanZhi$/, '日辰'],
  [/^hourZhi$/, '时支'],
  [/^yueJiang\./, '月将'],
  [/^xunKong$/, '旬空'],
  [/^lines\.(\d+)\./, '爻'],
  [/^shensha\./, '神煞'],
  [/^frame\./, '格局用神'],
  [/^strength\./, '旺衰'],
  [/^wuxing\./, '五行计数'],
  [/^relations\./, '干支关系'],
  [/^input\./, '输入回显'],
];

/** 大类：用于把几百处连带变化归成几句话 */
const CATEGORY = [
  [/^pillars\./, '四柱'],
  [/^shensha\./, '神煞'],
  [/^dayun\./, '大运'],
  [/^liunian\./, '流年'],
  [/^frame\./, '格局用神'],
  [/^strength\./, '旺衰'],
  [/^wuxing\./, '五行计数'],
  [/^dayMaster\./, '日主'],
  [/^relations\./, '干支关系'],
  [/^palaces\.(taiyuan|minggong|shengong)\./, '命身宫'],
  [/^palaces\.\d+\./, '宫位'],
  [/^palaces\./, '命身宫'],
  [/^soul\.|^body\.|^doujun\./, '命身宫'],
  [/^siZhu\./, '四柱'],
  [/^ju$|^juNumber$|^yuan$|^dun$/, '局数'],
  [/^daxian/, '大限'],
  [/^fly/, '飞星'],
  [/^pattern/, '格局'],
  [/^jieqi\./, '节气'],
  [/^solarTime\./, '真太阳时'],
  [/^input\./, '输入回显'],
  [/^lines\./, '爻'],
];

/**
 * 根因字段：真正被口径直接改动的干支/局数/爻。
 * 其余几百处都是从这里派生出去的——把这层关系讲清楚，才是「口径对照」的价值。
 */
const ROOT = [
  [/^pillars\.(year|month|day|hour)\.ganzhi$/, '柱'],
  [/^palaces\.(minggong|shengong)\.ganzhi$/, '命身宫'],
  [/^soul\.ganzhi$/, '命宫'],
  [/^body\.branch$/, '身宫'],
  [/^siZhu\.(year|month|day|time)$/, '柱'],
  [/^dayun\.jiao\.at$/, '起运'],
  [/^dayGanZhi$/, '日辰'],
  [/^hourZhi$/, '时支'],
  [/^ju$|^juNumber$|^juName$/, '局数'],
  [/^dun$/, '阴阳遁'],
  [/^lines\.\d+\.(ganzhi|yinYang|name)$/, '爻'],
  [/^yueJiang\.(name|zhi)$/, '月将'],
];

export function labelOf(path) {
  for (const [re, label] of LABELS) {
    if (re.test(path)) return label;
  }
  return categoryOf(path) || path;
}

export function categoryOf(path) {
  for (const [re, cat] of CATEGORY) {
    if (re.test(path)) return cat;
  }
  return '';
}

export function rootOf(path) {
  for (const [re, label] of ROOT) {
    if (re.test(path)) return label;
  }
  return '';
}

/** 自然排序：行运类按序号，其余按字符串 */
export function sortDiffs(diffs) {
  return [...diffs].sort((x, y) => x.path.localeCompare(y.path, 'zh-Hans-CN', { numeric: true }));
}

/**
 * 把一组变化归纳成因果式一句话：
 * 「根因：日柱 丙子 → 乙亥；连带影响 四柱、神煞、大运、流年 等 6 类（共 407 处）」
 */
export function summarize(diffs) {
  if (!diffs.length) return '本盘不受此口径影响：所有字段一致。';
  const roots = diffs.filter((d) => rootOf(d.path));
  const cats = [...new Set(diffs.map((d) => categoryOf(d.path)).filter(Boolean))];
  const head = roots.length
    ? `根因 ${roots.length} 处：` + roots.slice(0, 4)
      .map((d) => `${labelOf(d.path)} ${formatValue(d.from)}→${formatValue(d.to)}`).join('、')
      + (roots.length > 4 ? ' 等' : '')
    : '无单一根因';
  const tail = cats.length
    ? `；连带影响 ${cats.slice(0, 6).join('、')}${cats.length > 6 ? ' 等' : ''} ${cats.length} 类，共 ${diffs.length} 处`
    : `；共 ${diffs.length} 处`;
  return head + tail + '。';
}

export const formatValue = (v) => {
  if (v === undefined) return '—';
  if (v === null) return 'null';
  if (typeof v === 'string') return v;
  if (Array.isArray(v)) return v.join('') || '[]';
  if (typeof v === 'object') return JSON.stringify(v);
  return String(v);
};

/**
 * 文本版对照：先列根因，再列连带变化（默认最多 12 处，其余按类归并）
 */
export function renderDiff(diffs, { title = '', limit = 12 } = {}) {
  const lines = [];
  if (title) lines.push(`【${title}】`);
  lines.push(summarize(diffs));
  if (!diffs.length) return lines.join('\n');

  const roots = sortDiffs(diffs.filter((d) => rootOf(d.path)));
  const rest = sortDiffs(diffs.filter((d) => !rootOf(d.path)));

  if (roots.length) {
    lines.push('');
    lines.push('  根因（口径直接改动）：');
    for (const d of roots) {
      lines.push(`    ${labelOf(d.path).padEnd(6)} ${formatValue(d.from)} → ${formatValue(d.to)}`);
    }
  }
  if (rest.length) {
    lines.push('');
    lines.push(`  连带变化（${rest.length} 处，展示前 ${Math.min(limit, rest.length)} 处）：`);
    for (const d of rest.slice(0, limit)) {
      lines.push(`    ${labelOf(d.path).padEnd(6)} ${formatValue(d.from)} → ${formatValue(d.to)}`);
    }
    if (rest.length > limit) {
      const byCat = {};
      for (const d of rest.slice(limit)) {
        const c = categoryOf(d.path) || '其他';
        byCat[c] = (byCat[c] || 0) + 1;
      }
      lines.push('    其余：' + Object.entries(byCat).map(([c, n]) => `${c} ${n} 处`).join('、'));
    }
  }
  return lines.join('\n');
}

/**
 * 口径开关表：每个体系 2–3 组「只差一个维度」的对照。
 * read 取当前口径（没传时按引擎默认），alt 给另一口径，label 是给人看的短名。
 * UI、CLI 与工具参数 diff 共用这一份，默认值不在别处再抄一遍。
 */
export const CALIBER_SWITCHES = {
  bazi: [
    {
      key: 'lateZi',
      title: '晚子时：23:00 后是否换日',
      short: '晚子时',
      read: (a) => a.lateZi !== false,
      alt: (v) => !v,
      label: (v) => (v ? '换日' : '不换日'),
    },
    {
      key: 'trueSolar',
      title: '真太阳时：是否按出生地经度修正',
      short: '真太阳时',
      read: (a) => a.trueSolar !== false,
      alt: (v) => !v,
      label: (v) => (v ? '修正' : '不修正'),
    },
  ],
  ziwei: [
    {
      key: 'leapMonth',
      title: '闰月归月：按日切分 / 整月归次月',
      short: '闰月归月',
      read: (a) => (a.leapMonth === 'next' || a.leapMonth === 'prev' ? a.leapMonth : 'split'),
      alt: (v) => (v === 'split' ? 'next' : 'split'),
      label: (v) => ({ split: '按日切分', next: '整月归次月', prev: '整月归本月' }[v] || v),
    },
    {
      key: 'trueSolar',
      title: '真太阳时：是否按出生地经度修正',
      short: '真太阳时',
      read: (a) => a.trueSolar !== false,
      alt: (v) => !v,
      label: (v) => (v ? '修正' : '不修正'),
    },
  ],
  qimen: [
    {
      key: 'juMethod',
      title: '取局流派：拆补 / 超神接气 / 置闰',
      short: '取局流派',
      read: (a) => (['chaibu', 'chaoshen', 'zhirun'].includes(a.juMethod) ? a.juMethod : 'chaibu'),
      alt: (v) => (v === 'chaibu' ? 'zhirun' : 'chaibu'),
      label: (v) => ({ chaibu: '拆补法', chaoshen: '超神接气', zhirun: '置闰法' }[v] || v),
    },
    {
      key: 'lateZiHourMode',
      title: '晚子时：23:00 后归当日 / 次日',
      short: '晚子时归日',
      read: (a) => (a.lateZiHourMode === 'next-day' ? 'next-day' : 'same-day'),
      alt: (v) => (v === 'next-day' ? 'same-day' : 'next-day'),
      label: (v) => (v === 'next-day' ? '归次日' : '归当日'),
    },
  ],
};
