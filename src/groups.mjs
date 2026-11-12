// 首屏分组的唯一数据源：独立页（tools/build-html.mjs）与宿主面板（src/app.js）共用。
//
// 两处各写一份曾在 0.39.0 之后悄悄分叉：页面加了「还有 N 个」的折叠、面板还是 19 个 tab 平铺。
// 现在分组、标题、白话说明都只写在这里；页面构建时生成 HTML，面板构建时注入进 client.js。
// 卡片是精选入口：分组里只放 20 个常用体系，星座与数字留在平铺视图；两套入口走同一条激活路径，分组不改变排盘行为。
export const GROUPS = [
  {
    title: '问一件事', hint: '心里有一件具体的事，起一卦再决定',
    items: [
      { k: 'liuyao', label: '六爻', tip: '摇六次问事' },
      { k: 'tarot', label: '塔罗', tip: '抽牌看选择' },
      { k: 'meihua', label: '梅花', tip: '见闻起卦' },
      { k: 'qimen', label: '奇门', tip: '看方位时机' },
      { k: 'daliuren', label: '六壬', tip: '占事断来意' },
      { k: 'xiaoliuren', label: '小六壬', tip: '掐指一算' },
    ],
  },
  {
    title: '看一个人', hint: '看自己或身边人的性情与格局',
    items: [
      { k: 'bazi', label: '八字', tip: '四柱看格局' },
      { k: 'ziwei', label: '紫微', tip: '十二宫细看' },
      { k: 'hepan', label: '合盘', tip: '两人合不合' },
      { k: 'mbti', label: '人格', tip: '16 型问卷' },
      { k: 'constitution', label: '体质', tip: '九种体质' },
      { k: 'chenggu', label: '称骨', tip: '生辰称命重' },
      { k: 'trend', label: '人生K', tip: '一生走势', wide: true },
    ],
  },
  {
    title: '查日子', hint: '挑时间、换农历，看一年的气与方位',
    items: [
      { k: 'almanac', label: '黄历', tip: '今日宜忌' },
      { k: 'zeri', label: '择日', tip: '挑好日子' },
      { k: 'convert', label: '农历', tip: '公历农历' },
      { k: 'wuyunliuqi', label: '运气', tip: '一年大势' },
      { k: 'taiyi', label: '太乙', tip: '积年推局' },
      { k: 'fengshui', label: '风水', tip: '房屋朝向' },
      { k: 'name', label: '起名', tip: '八字选字' },
    ],
  },
];
