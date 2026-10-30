// 首屏分组的唯一数据源：独立页（tools/build-html.mjs）与宿主面板（src/app.js）共用。
//
// 两处各写一份曾在 0.39.0 之后悄悄分叉：页面加了「还有 N 个」的折叠、面板还是 19 个 tab 平铺。
// 现在分组、标题、白话说明都只写在这里；页面构建时生成 HTML，面板构建时注入进 client.js。
// 卡片只是另一套入口——19 个 tab 原样保留，两套入口走同一条激活路径，分组不改变排盘行为。
export const GROUPS = [
  {
    title: '问一件事', hint: '心里有一件具体的事，起一卦再决定',
    items: [
      { k: 'liuyao', label: '六爻', tip: '摇六次，问一件事' },
      { k: 'meihua', label: '梅花', tip: '见闻起卦，看当下' },
      { k: 'tarot', label: '塔罗', tip: '抽牌，看关系与选择' },
      { k: 'qimen', label: '奇门', tip: '看方位、时机与取舍' },
      { k: 'daliuren', label: '六壬', tip: '占事，断来意与结果' },
      { k: 'xiaoliuren', label: '小六壬', tip: '掐指一算，快速断' },
    ],
  },
  {
    title: '看一个人', hint: '看自己或身边人的性情、格局与运程',
    items: [
      { k: 'bazi', label: '八字', tip: '四柱看一生格局' },
      { k: 'ziwei', label: '紫微', tip: '十二宫细看' },
      { k: 'hepan', label: '合盘', tip: '两个人合不合' },
      { k: 'mbti', label: '人格', tip: '16 型性格问卷' },
      { k: 'chenggu', label: '称骨', tip: '按生辰称命重' },
      { k: 'numerology', label: '数字', tip: '生日数字看性格' },
      { k: 'trend', label: '人生K', tip: '一生高低走势', wide: true },
    ],
  },
  {
    title: '查日子', hint: '挑时间、换农历，顺带看看家里和名字',
    items: [
      { k: 'almanac', label: '黄历', tip: '今天宜忌、时辰吉凶' },
      { k: 'zeri', label: '择日', tip: '挑个办事的好日子' },
      { k: 'convert', label: '农历', tip: '公历农历互转' },
      { k: 'star', label: '星座', tip: '星座性格与今日运' },
      { k: 'fengshui', label: '风水', tip: '房屋朝向与布置' },
      { k: 'name', label: '起名', tip: '按八字选字' },
    ],
  },
];
