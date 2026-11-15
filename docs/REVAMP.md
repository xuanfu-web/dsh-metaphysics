# 烛微命盘改版清单

基准：0.81.0（main a6b696e）。
范围：结果页、盘图、输入流程、工程实现、文案。
不含：断语准确性评判。

优先级定义
- P0 影响第一印象与基础可用性，先排。
- P1 专业感、可读性、交互一致性。
- P2 长期打磨与闭环。

每条给三样：问题、目标状态、落点（文件行号）。
落点是给动手的人看的，不写验收话术；验收见第 10 节。

---

## 0. 三条总原则

**0.1 一份拼接，两个视图。**
同一套结果拼接现在写了两遍（`src/app.js:2655-2661` 与 `src/web-ui.js:620-640`），顺序还不一致：单页多 followupBar、verify、rectify、exportBar 四段，面板拆成独立组件。过去几轮踩过的「面板有、单页没有」「称骨卡在 CHART_STACK 里丢了」根子都在这。不收敛，双视图要改两遍，以后每加一块还改两遍。

**0.2 隐藏不是不生成。**
dev 段收进 `<details>` 仍留在 DOM 里，会被打印样式、存长图（`web-ui.js:840 downloadCard`）、导出 .md 带出去。用户存一张长图，图上带句柄和 25 处 diff。必须做到「不进渲染函数」，按白名单在 compose 层过滤。

**0.3 依据不全展开。**
0.81 刚把首屏从 4830 字压到 186 字。依据默认展开会退回去。正解是结论句尾挂 `[n]` 角标，点开看事实条目——要的是可核对，不是先看依据。

---

## 1. 代码地图

动手前先看这张表，别翻错文件。

**渲染层**
- `src/web-ui.js:620-640` 单页 `paint()`，一次拼十五段。
- `src/app.js:2655-2661` React 面板 `dangerouslySetInnerHTML`，拼十二段。
- `src/panel-kit.js` 渲染器仓库：`envelopeHeadHTML:3551`、`envelopeHTML:3568`、`interpretHTML:3612`、`caliberHTML:3763`、`handleHTML:3812`、`revisionHTML:3823`、`shadowHTML:3843`、`traceHTML:4398`、`perfHTML:4834`、`ziweiHTML:1909`、`baziHTML:3249`、`quickHTML:4899`。
- `src/app.js:870` `chartHTML` 分派 22 体系；`893-897` 把 `<section class="mp-br">` 开口剥到盘面之后。

**契约层**
- `engine/envelope.js`：`SCHEMA_VERSION:10`、`LIMITS:24`（headline[12,40]、l0l1:400、factors[1,5]）、`ev():544`、`dedupeFactors:199`、`buildEnvelope:1098`。
- adapter：`baziAdapter:563`、`ziweiAdapter:672`、`liuyaoAdapter:776`、`qimenAdapter:877`、`tarotAdapter:961`、`defaultAdapter:1038`、`ADAPTERS:1068`。
- `engine/plain-summary.js:743` `plainSummary`，只覆盖 12 体系。
- `engine/index.js:853` `const brief = plainSummary(r); if (brief) r.brief = brief;`
- `engine/interpret.js:1985` `interpret()`；`1988` 奇门走 `interpretQimen`。

**输入层**
- 表单写死 DOM：`tools/build-html.mjs:472-551`（date/time/hourunknown/gender/latezi/truesolar/address/question/direction）。
- `tools/build-html.mjs:684` 「看示例」按钮，绑在 `web-ui.js:1691`，问卷模式下 `display:none`（`web-ui.js:1246`）。
- `src/app.js:737` `TIME_KIND`（birth/cast/date/none）、`750` `SAMPLE`、`web-ui.js:333` 另一份 `SAMPLE`。

**构建**
- 顺序固定：改源码 → `check-assertions --update` → `build-html` → `build-client` → `test-all`。
- CI 七闸：check-patterns / check-assertions / check-bundle（入口 128KB、单块 320KB）/ check-html-sinks / check-perf / e2e-dom / e2e-panel。
- 产物必须 LF。`.gitattributes` 有 `eol=lf`，`build-html.mjs` 的 `page()` 里 `return html.replace(/\r\n/g,'\n')`。
- 改完生成器要重建 `命理排盘.html`，再拷到 `docs/index.html`（docs 副本没有生成脚本）。

---

## 2. 视图分层

### P0-01 结果页收敛成七块

问题：`paint()` 一次拼十五段。用户在结论卡下面先撞盘面，再撞解析、修订回显、句柄、影子盘、推导链、口径对照、追问、验前事、生时校正、导出条、耗时。

目标：用户视图只出 `结论卡 → 盘面 → 一页读懂 → 分维度 → 建议 → 追问 → 反馈`。

落点：新建 `src/compose.js`，导出 `composeResult(mode, parts)`。`paint()`（`web-ui.js:620`）与 `app.js:2655` 都只调它。

### P0-02 dev 通道三个入口、一条状态

问题：现在没有 dev 概念，只有全渲染。

目标：`?dev=1`（URL）、右键页脚印章五次（localStorage `mp.view='dev'`）、高级抽屉底部开关，三者写同一个状态。dev 时追加 `trace / caliber / shadow / handle / perf / revision / cross`。

落点：`compose.js` 里 `DEV_SECTIONS = ['trace','caliber','shadow','handle','perf','revision','cross']`，按 `mode==='dev'` 过滤。

### P0-03 用户视图只留短盘 ID

问题：`handleHTML:3812` 整条句柄带出生时间与出生地；`shadowHTML:3843` 带 baseId、基础指纹、「同参数同 ID」「未固定 asOf」。

目标：用户侧只出 `#7F3A2C` 六位短 ID + 一行「这张盘只在本机算」。句柄、指纹、asOf 全进 dev。

落点：短 ID 由 `shadow.id` 无条件生成，不再依赖 `shadow:true`。`web-ui.js:1063` 那段「先比对再存档」拆成「生成 ID」与「比对」两件事。

### P0-04 耗时与自检异常进日志

问题：`perfHTML:4834` 拼在结果末尾；解析失败时 `it.error` 直接渲染「⚠ 解析生成失败」（`3711`）；面板还有「inputActions 未拿到；渲染 76 次；注册 4 次」（`app.js:770` `bridgeDiagText`）。

目标：耗时只在 dev 出。解析失败用户侧只说「这段解读没生出来，盘面可用」，细节 `console.warn`。桥接自检只在真异常时露一个降级入口。

落点：`compose.js` 加 `safeItError(it)`；`app.js:2705` 的 bridgediag 改成 `COMPOSER.ref` 为空时才渲染。

### P0-05 模块分五档

问题：22 体系混着开关。MBTI、中医体质是问卷不是盘，挂「结论 · 把握 中」和影子盘本身就怪（`web-ui.js:900` 已手工绕过一次）。

目标：
- 盘类：八字、紫微、合盘、趋势、风水、起名 → 全套。
- 问事类：六爻、梅花、大六壬、奇门、塔罗、小六壬 → 多一条「复制问事提示」。
- 判定类：五运六气、太乙、择日。
- 问卷类：MBTI、体质。
- 速查类：黄历、称骨、星座、数字、公农历。

落点：`MT_LABEL`（`panel-kit.js:3658`）已有 moduleType，扩成 `MODULE_TIER` 表，compose 按 tier 取段。

---

## 3. 事实层与去重

### P0-06 事实层分三条线

问题：adapter 只有 5 个，其余 17 体系落 `defaultAdapter`（`envelope.js:1038`）。它干的事很敷衍：`direction` 硬写 `mixed`、`confidence` 硬写 `low`、`condition` 是固定那句「若条件与盘面对得上」，factors 最多两条、名字固定「核心结论 / 关键条件」。所以大六壬排出来，结论卡永远写「混合 · 把握 低」。

三条线：
- 线 A 现成 5 个：八字、紫微、六爻、奇门、塔罗。只加固，不重写。
- 线 B 补 3 个：大六壬、梅花、合盘。有 brief、有素材，只差把判断抽出来。
- 线 C 换头卡 10 个：黄历、择日、称骨、小六壬、星座、数字、MBTI、风水、起名、公农历。`plainSummary:743` 不给它们返回值，所以连结论卡都没有，结果页从盘面直接开始。

### P0-06b 三个 adapter 怎么算

照 `liuyaoAdapter:776` 的写法，每个 60–90 行。

| 体系 | direction 依据 | confidence 依据 | factors 取材 |
|---|---|---|---|
| 大六壬 | 三传生克（传生干/干生传/克战）+ 课体体囚 | 三传是否连茹、有无空亡 | 四课三传、贵神临位、将神 |
| 梅花 | 体用生克：体克用顺、用克体逆、比和平 | 动爻数与互卦变卦是否同向 | 体卦用卦、互变、动爻 |
| 合盘 | 合冲计数与日支关系（已有 `hepanSummary`） | 样本条数，分数对越多越稳 | 双方四柱、合冲清单、五行互补 |

落点：`envelope.js` 加 `daliurenAdapter / meihuaAdapter / hepanAdapter`，注册进 `ADAPTERS:1068`。

### P0-06c 十个换事实型头卡

结构固定三段：一句话头条 + 2~3 条盘面事实 + 一条注意。不出 `direction / confidence / condition`。

| 体系 | 头条 | 事实条 |
|---|---|---|
| 黄历 | 丙午年 十月 廿六 · 建除·开 | 值日神、冲煞、吉神方位 |
| 择日 | 近 30 天里最好的是 X 月 X 日 | 前二候选、忌项 |
| 称骨 | 骨重 X 两 Y 钱 | 称骨歌一句、白话一句 |
| 小六壬 | 落 X 宫 | 三宫链、一句断 |
| 星座 | 今日基调 | 宜/忌各一 |
| 数字 | 主数 X | 表达数、内在数 |
| MBTI | XXXX | 四维倾向强弱各一 |
| 风水 | 坐向 · 宅型 | 首忌、门主灶关系 |
| 起名 | 首推 X 组 | 五行补位、笔画 |
| 公农历 | 公历 ↔ 农历 | 干支、节气相邻 |

落点：新增 `engine/headline.js`，导出 `factHeadline(r)` 返回 `{kicker, headline, chips, facts[], note}`；compose 按 tier 分派 `envelopeHeadHTML` 或新的 `factHeadlineHTML`。

### P0-07 章节只许引用事实

问题：`interpret.js` 里 sections 是自由拼串，同一句「空宫借对宫」能在五处出现。

目标：section 结构改 `{ key, label, refs:[factId], template }`，渲染时用 facts 填槽。引擎拿不到 fact 就报错，不兜底成自由文本。

落点：`engine/interpret.js`；新增 `test/facts-only.test.mjs`。

### P0-08 去重下沉到句子级 → 实测改路线（已落地）

原计划：全局句子哈希表，先出现者留原文，后出现者换成锚点「见上文 · 命身底色」。

**实测推翻了这个前提。** 拿八个主力体系跑「信封 vs dims vs sections」的 8 字片段重合：0–17 处，几乎为零。也就是说重复不是同一句话复现，而是同一件事换着说法讲——句子哈希抓不到，硬做会留下大量该删的段落却删不掉。

真正吃字数的不是重复，是**段落性质混杂**：方法类段落（看盘顺序、口径分歧、未纳入、量化口径、出处）混在正文里。

落地：`engine/interpret.js` 的 `markSections()` 按 key 白名单给段落打 `kind`——`method`（方法与出处）/ `text`（经文原文）/ 其余为正文。两套 UI 据此把 method 段合进一个折叠区。

实测收益（正文汉字，改前 → 改后）：

| 体系 | 改前 | 改后 | 砍掉 |
|---|---|---|---|
| 八字 | 4696 | 3708 | 21% |
| 紫微 | 3819 | 3106 | 19% |
| 六爻 | 1633 | 785 | 52% |
| 奇门 | 1993 | 911 | 54% |
| 大六壬 | 106 | 106 | 方法层本就占 72% |

### P0-09 出处与分歧各留一个入口（已落地）

实测出处卡的体量比预想大得多：八字 3798 字、紫微 2912 字、六爻 2525 字，而五维真正的话只有 300–600 字。逐条铺在正文里，等于用出处把结论埋了。

落地：五维里只剩一行「依据与出处 N 条 →」，指向文末折叠区的 `#mp-sec-know`；知识卡本体（状态标签、gist、detail、书名、原注、效度声明）整块搬进「方法与出处」。口径分歧（`caveats`）与「尚未实现」同样归入该区。

效果：八字首屏可见汉字从约 8400 降到 968，五维区只剩结论与建议。

原计划里的「上标角标 + 抽屉」不做了——手机上没有抽屉可开，折叠区就是那个入口。

---

## 4. 章节流

### P0-10 顺序重排

现状（`panel-kit.js:3698-3723`）：结论 → askCopy → askLine → answer → plain → lead → guide → outline → toc → dims → secs → tables → fu → gloss → limits → disclaimer。

目标：结论卡 → 速览表 → 分维度 → 建议 → 深究（逐宫 / 四化飞星 / 三方四正 / 出处 / 分歧，默认折叠）。

关键：「一页读懂」现在排在 `guide`（三层导读，默认收起）之后，用户要滑过两个折叠块才看到表。挪到结论卡正下方。

### P0-11 速览表补倾向列

问题：`outline` 每行只有 `label + text`（`panel-kit.js:3631`）。

目标：三列 `维度 / 一眼结论 / 倾向`，倾向从 `verdict.direction` 派生（顺 / 需借力 / 先难后易），不新写文案。行可点，跳到对应 section 锚点。

### P0-12 置信度给口径或删掉

问题：`把握 中`（`panel-kit.js:3560`）、`置信度 强`（`3622`）两处，都没说是什么的把握。

目标：hover 出「建立在 N 条盘面事实 + M 条古籍；分歧 k 处」。或者用户侧不显示，只按 confidence 调措辞强弱（low 时句首加「多半」）。倾向前者只在 dev 用，用户侧走措辞。

### P1-13 大限、流年表与盘联动

问题：`tables` 排在 `secs` 之后（`3646`），与时间窗段落无交互。

目标：表行点击 → 盘面高亮对应宫，时间窗段同步高亮。需要 `ziweiHTML` 暴露 `data-palace` 选择器。

### P1-14 边界说明前置

问题：`limits`（不回答什么）与 `gloss`（名词解释）压在最末（`3720`）。

目标：首次进入弹一次能力边界（三个要点，可关）；结果页脚常驻「这套不回答什么」一行链接。

---

## 5. 盘图

### P1-15 宫格四级分层落到 CSS 变量（已落地 · d769f63）

现状：`panel-kit.js:1405` 注释写「主星在上粗体，辅星小字」，实际只两级，字号散写；杂曜和辅星走同一个 `aux` class，四级里只有两级是真分层。

落地：`.pp-grid` 上挂五个变量 `--zw-l1:13px / --zw-l2:11.5px / --zw-l3:10.5px / --zw-l4:9.5px / --zw-l5:12px`，竖屏段 `@media (max-width:640px)` 覆盖成 `11 / 9.5 / 8.5 / 8.5`。`TYPE_CLASS` 补 `杂曜:'minor'`（原来错落到 aux），`.pp-st.good/.bad` 补 `font-weight:500`——原先它们继承 13px，和主星一样大，四级里最该拉开的一档反而是平的。

联动坑：`#ppm-d-small:not(:checked)~.pp-body .pp-st.aux` 那条「显示小星」规则必须同时盖住 `.pp-st.minor`，否则关了小星盘上还留一层杂曜。`test/display-toggles.test.mjs` 钉了一条断言。

实机读数（computed style）：main 13/700、good 11.5/500、bad 11.5/500、aux 11.5/400、minor 10.5/400、ages 9.5/400。

### P1-16 三视图切换加当前口径角标（已落地 · b692c9d）

现状：飞星 / 三合 / 四化三视图已做完（CSS `174-202`，真分派），切了但盘角不写现在是哪一派。

落地：口径条放在盘**上方**一行（不放右上角——手机竖屏时右上角会挤出格子）：`四化派 · 本命 · 1990 庚午`。学派名不写文本，用 `.cal-sc::after` 配 `#ppm-sc-feixing:checked~.pp-body` 三条规则换 `content`，纯 CSS，不多一份 JS 状态；层名与干支在渲染时写死（`本命` / `大限 癸未` / `流年 丙午`）。切学派时 `.pp-grid` 走 `ppSchoolIn .3s`，眼睛能跟上换了一派。

### P1-17 宫位详情统一走右抽屉（未做，方向待定）

现状：点击是内联展开（`panel-kit.js:231`）。

原目标：右抽屉（桌面 380px，手机全宽上滑），底部「跳到解析 · 事业宫」锚点。

先不做，理由：手机上没有「右侧抽屉」这回事，落到竖屏只能是底部 sheet；而底部 sheet 会盖住盘——用户点宫位时正想拿盘做对照，盖住就断了。现有内联展开在手机上反而更顺（盘不挡、手指不用离开原位）。真要往前一步，方向应该是「内联展开 + 底部一个『看这一宫的解释』锚点」，不是搬抽屉。

### P1-18 时间维度改 chips（已落地 · 6e6e787）

现状：流月 / 流日 / 流时三块在盘后**永远铺着**，不看这些的人也躲不掉。

落地：三个 chips `＋流月 / ＋流日 / ＋流时` 跟在本命·大限·流年那行下面，默认一个都不出，勾哪个出哪个；三行各带 `data-t`，`#ppm-t-*:checked~.pp-flow .flow-row[data-t="…"]` 控制，纯 CSS。只在有流层数据（`r.flow`）时才渲染开关与 chips，不留点了没反应的按钮。

与原文的差异：原写「六个 chip，默认勾前两个」。没这么做——本命/大限/流年是**互斥视图**（radio，一次只看一层盘），流月流日是**叠加图层**（checkbox），两种语义塞进同一排 chips 会误导。分层改由 `TIME_KIND` 管。

结构坑：`flowHTML` 原来直接在 `.pp` div 外面（`</div>${flowHTML}`），`~` 兄弟选择器选不着，必须移进 `.pp` 内 `.pp-flywrap` 之后——视觉位置不变。开关必须排在 `.pp-time` 与 `.pp-flow` 之前，兄弟选择器只向后找。

### P1-19 显示设置三档预设（已落地 · 1319d79）

现状：17 项开关分两组（`1652` 飞星派 / `1665` 四化派），平铺。

落地：`.pp-disp` 顶部加 `预设 简洁 / 标准 / 专家` 三个按钮，背后是 `DISP_ALL`（17 项）与 `DISP_PRESETS`（简洁 2 项 = 只留四化与神煞；标准 10 项 = 历来默认；专家 17 项）。预设是开关集合的宏，不新增渲染逻辑。

细节：手动拨任一开关就撤掉按钮上的 `.on`——不能让人以为还在「标准」下面。简洁档可见星曜 38/49、专家 49/49。

### P2-20 历史盘标签、删除、对比

现状：`RECENT_KEY` 只记最近 3 个 tab 名（`app.js:708-710`），没有内容。

目标：每条含日期时刻、体系、短 ID、备注；支持单条删、两盘并排对比（复用 diff 逻辑）。

---

## 6. 输入流程

### P0-21 表单按体系能力拆块（部分已落地）

原计划写的「表单从 `SYSTEM_PARAMS` 生成」有个前提错误：这个仓库里**没有** `SYSTEM_PARAMS`（`engine/` `src/` `tools/` 全仓 grep 无此标识符）。参数校验散在各体系 `compute` 里，靠报错反推（`fengshui` 报「gender 必须是 male 或 female」、`name` 报「缺少名字：请给 givenName」）。所以生成式表单没有可读取的元数据源，先走拆块。

单页表单本来就是按体系分块显隐的（`for-liuyao / for-hepan / for-qimen / for-meihua / for-ask`，`web-ui.js:1214-1225`），粒度错在**一个块塞了多个体系的字段**：`for-bazi` 同时装了出生地、真太阳时、联网、晚子时换日、八字×紫微交叉验证，而它被 `birth` 一次全部打开——选风水、起名、人生 K 线的人也会看到「八字 × 紫微 交叉验证」。

已落地（0.82.0 第三批）：拆成 `for-solar`（出生地 / 真太阳时 / 联网，所有 birth 类都要）与 `for-bazi`（晚子时换日 / 交叉验证，只有八字要，`display` 跟 `tab === 'bazi'`）。实测五档：风水 → 有 solar、无 bazi 块；八字 → 全有；黄历 → 只有日期；塔罗 → 全无；合盘 → solar+gender，无 hourunknown。

剩余：面板侧（`src/app.js`）本来就是按体系分支渲染（`671` 起体系元数据表、`1149` K 线、`1151` 合盘、`1166` 交叉验证只给八字/紫微），不需要跟着改。

### P0-22 起卦类与命盘类真分流（已落地）

现状：`TIME_KIND`（`app.js:752`，单页在 `web-ui.js:333` 另有一份）已分 cast / birth / date / none，表单也按块显隐了，但**切换体系时不自查旧值**：从八字切到黄历，性别留在 DOM 里被带进参数；从奇门切到塔罗，日期同理。

**实机排盘时挖出更严重的一处**（比旧值残留更坏）：`goCast` 里 `if (k !== 'none' && usesTimeInput() && !manual[k]) fillDateTime(nowParts())` —— 命盘类也走这条，于是页面上明明白白写着 `1990-05-12 14:30`，只要没手动改过，点一下「排盘」就静默按今天算。用户看到的输入和实际排的盘不是同一个东西，而且没有任何提示。面板侧 `app.js:1573` 同一个写法。

改法：只有 `k === 'cast'`（六爻/奇门/梅花/小六壬/塔罗）才补当下——起卦问的是此刻的场。命盘类与日期类都按表单里显示的值算。
```js
if (k === 'cast' && usesTimeInput() && !manual[k]) fillDateTime(nowParts());
```
实机验：八字切进去不动表单直接排 → 日期仍是 `1990-05-12`、出「已扣夏令时 1 小时」；六爻填问题后直接排 → `起卦时刻：2026-11-15 13:14`（本机此刻）。

剩下未做：切体系时清掉不适用字段（现在只 `display:none`，旧值仍在 DOM 里）。这一项单独留着——清空会牵动「出生信息照抄上一次」的档案机制，要一并测。

目标：切体系时清掉不适用字段（不是只 `display:none`），并在 `applyDateTime` 里按 `TIME_KIND` 决定「用示例 / 用此刻 / 不用」。已做「出生信息照抄上一次」的档案机制，要保证清空不影响档案。

### P0-23 校验与修正回显（已落地）

问题：`isoDateOk:21`、`maskDateText:38` 只管格式。真太阳时的经度差、修正前后时辰、出生地被截断都没回显。

落地方式：`pp.solarLineHTML(r)` 在盘号之后出一行「真太阳时修正 −10.7 分，时柱按 13:19 起」，推算过程（经度差 + 均时差）折进 details；命中 1986–1991 夏令时窗口时主行点名「已扣夏令时 1 小时」，不吃折叠——这批人最容易被少排一小时。无修正、时辰未知、没填出生地都不出这一行。

原计划里的「出生地被截断」并入 P0-21 的地址字段，不单独做。

### P1-24 高级选项折叠、tooltip、默认值

目标：「晚子时换日」「联网精确到区县」「八字 × 紫微交叉验证」收进高级抽屉，各带一行说明与默认值。默认：晚子时换日 开、联网 关、交叉验证 关。

### P1-25 示例、重置、重排

现状：`sample` 按钮已有（`build-html.mjs:684`，绑在 `web-ui.js:1691`），但问卷模式下 `display:none`（`1246`）；没有重置。

目标：「看示例」在问卷模式下也能点（填一组样例答案）。加「清空」。结果页加「改条件重排」，回到表单并保留参数。

---

## 7. 工程与闭环

### P1-26 收敛渲染路径

与 P0-01 同一刀，单列是因为它是所有不一致 bug 的根。先做这一步，后面所有条目只改一处。

### P1-27 状态归并

现状：`last` 上散挂 `r / html / tab / timed / date / time / perf / shadowDiff / caliber / it`。

目标：一个 `view = { chart, env, sections, dev, meta }`，渲染只读它。`paint()` 里「先记住 askq 再重绘」（`610-611`）这类补丁可以删掉。

### P1-28 局部重绘

现状：切方向、刷新推导链都 `el('out').innerHTML = ...` 全量重建。

目标：四个稳定容器 `#out-head / #out-chart / #out-body / #out-dev`，切方向只换 `#out-body`。React 侧 `chartHTML`（`870`）包 memo，key 用 `kind + shortId`。

### P1-29 反馈带上下文与分类

现状：`feedbackMail:730` 已带版本、体系、输入，缺短盘 ID 与分类。

目标：正文加短盘 ID、模式（用户 / 开发）、问题分类（排盘错 / 解读看不懂 / 界面 / 建议）。出生地截成「省·市」，不带详细地址。

### P1-30 卦例库回填应验

现状：`data-act="hit"/"miss"`（`web-ui.js:770`）能记，但回看时看不出状态。

目标：条目加 `state: pending/hit/miss`，列表按状态筛，一条可改判。仍只在本地、不追问第二遍。

### P2-31 导出补干净长图

现状：`downloadCard:840` 出的 PNG 含深链与邮箱。

目标：分享版去掉深链、邮箱、句柄；PDF 走 `@media print`，dev 段本就不在 DOM（P0-02 的收益）。

---

## 8. 文案

### P0-32 加 tools/lint-copy.mjs

已有：`engine/term-dict.js`（24KB 词表 + `scanTerms / termPlain / termsByTier`）。

目标：扫 `src/*.js` 的中文串，命中未登记术语、口语标题、自造吉凶档就 exit 1，挂进 CI 第八闸。规范措辞只有一处可改。

先抓三类：内部词（句柄 / 影子盘 / 口径对照 / 一句话改参 / 验前事 / 生时校正）、自造档（大吉 / 中吉 / 不吉）、口语标题（这套规则有多稳）。

### P1-33 按钮统一「动词 + 对象」，四字以内

现状混着：存为 PDF / 导出 .md / 存为摘要长图 / 复制深链 / 存入卦例库 / 记准 / 记不准 / 复制问事提示 / 复制提问。

目标：存 PDF / 存长图 / 存 .md / 复制链接 / 存卦例 / 记准 / 记不准 / 复制提问。「追问」和「复制提问」合并成一个主按钮 + 下拉（在这问 / 拿到别处问）。

### P1-34 内部词用户侧改写

- 排盘句柄 → 这张盘的编号
- 影子盘 → 不出现
- 口径对照 → 换个流派会怎样
- 一句话改参 → 按我说的改一下
- 验前事 → 先核对过去
- 生时校正 → 出生时辰不确定？
- 与上次同盘比对 → 和上次比哪里变了（dev 保留原名）

### P2-35 同一概念单一措辞

`空宫 / 命无正曜 / 借对宫` 三套并存；`身宫辰 / 身宫落财帛` 两种写法。`term-dict.js` 加 `CANON` 映射表，输出层强制替换。

### P1-36 两套头卡共用一套视觉

`factHeadlineHTML` 复用 `mp-env-head` 的 CSS 与 DOM 结构，只换字段名。不做第二套样式。

---

## 9. 体系覆盖总账

改版前：

| 状态 | 体系 | 数量 |
|---|---|---|
| 真 adapter（direction / confidence 由盘面算，factors 带真 evidence） | 八字、紫微、六爻、奇门、塔罗 | 5 |
| 有 brief 但落 defaultAdapter | 大六壬、梅花、合盘、趋势、体质、五运六气、太乙 | 7 |
| 连 brief 都没有，不出结论卡 | 黄历、择日、称骨、小六壬、星座、数字、MBTI、风水、起名、公农历 | 10 |

改版后（第二批 2a/2b 落地后实测）：

| 状态 | 体系 | 数量 |
|---|---|---|
| 真 adapter | 八字、紫微、六爻、奇门、塔罗、**大六壬、梅花、合盘** | 8 |
| 事实型头卡（无 direction / confidence，只摊盘面事实） | 黄历、择日、称骨、小六壬、星座、数字、MBTI、风水、起名、公农历 | 10 |
| 维持 defaultAdapter（有 brief，不另造判断） | 趋势、体质、五运六气、太乙 | 4 |

维持 default 的四个是刻意不动：趋势是八字的下游产物、体质与 MBTI 同为自评问卷、五运六气与太乙的「主客算」本仓未收录——给它们编方向比留白更错。

---

## 10. 实施顺序与闸

### 第一批 拆路

范围：P0-01 / 02 / 03 / 04 / 26 / 27。
只做一份拼接、dev 通道、dev 不进 DOM。不动文案、不动盘图。

闸：
- `test-all` 全绿。
- 新增 `test/dev-view.test.mjs`：用户模式下 `#out` 的 innerHTML 不含 `mc.`、`首个 asOf`、`引擎`、`处变化`、`排盘句柄`。
- 打开真页面看一眼。

### 第二批 事实层

**2a 补三个 adapter**（已落地）
闸：大六壬、梅花、合盘三份真盘全部通过 `validateEnvelope`、不 degraded、`direction` 随盘变。落成 `test/adapters-extra.test.mjs`（77 条），比原计划更狠：把「空亡必 low + 必给条件句」「递生递克」「五种体用关系各自的建议」「三正三负」「不出现必配必离」都钉死了。

**2b 十个换头卡**（已落地）
闸：`test/headline.test.mjs`（125 条）——10 个体系各一张卡、facts 1–3 条、键 ≤6 字、不含 `把握/置信/偏顺/偏卡/direction`、同一函数换日期头条会变、有 brief 的体系不再叠卡、缺数据返回 null 不给空壳。

**2c 主力去重与章节改造**（已落地第一刀，见 P0-08/P0-09 的实测改写）
实际做法不是句子去重，是段落分层 + 出处后置。还剩的部分：`dimensions` 五维每条的 `text` 本身仍偏长（八字 399 字 / 紫微 607 字 / 六爻 313 字，这已不算多），真正没动的是 sections 正文 3000 字级的推演段——那是改写内容，按周算，单独立项。

### 第三批 改序

范围：P0-10 / 11 / 12 + P1-17 抽屉。
顺序一动，`plain-summary.test` 和 e2e 会红一批，属预期，改断言期望值，不回滚。

### 第四批 盘图与表单

范围：P1-15 / 16 / 18 / 19 + P0-21 / 22 / 23。
表单那条风险最高（`SYSTEM_PARAMS` 一动，`args.test.mjs` 34KB 会大面积报警），单独一批，做完立刻发版。

---

## 11. 未决项

1. 收敛渲染路径的 diff 不小，要不要单独打一版只含这个的 0.82.0，其它往后放。
2. 术语就地 tooltip（原清单 M3-6）建议砍：22 体系 × 30 条词，tooltip 会把手机屏占满，`term-dict` 已在正文里做「术语当场翻人话」，重复做一层反而打架。
3. 第二批 2c 的范围：全 22 体系改完按周算。8 个判定类先做，其余维持 default。

---

## 12. 进度

### 第一批（0.82.0-wip）已落地

分支 `feat/revamp-p0-split-path`，起点 `main` = a6b696e（v0.81.0）。
提交：`7edcf41` 结果拼接收成一条路径 + 视图分层 / `fd3a59a` 源码与 mjs/md 钉 LF / `d98be6a` 开发者视图三通道 + 解读失败降级。

| 条目 | 状态 | 落点 |
|---|---|---|
| P0-01 结果页收敛成七块 | ✅ | `src/compose.js` 的 `USER_SEGS` |
| P0-02 dev 通道三入口一条状态 | ✅ | `?dev=1` / 本机 `mp.view` / 单页页头印章连点五下 · 面板 `Ctrl+Shift+D` |
| P0-03 用户视图只留短盘 ID | ✅ | `engine/index.js` 无条件生成 `r.shortId`，`compose.js` 的 `shortIdHTML` |
| P0-04 耗时与自检异常进日志 | ✅ | `perfHTML` 只进 dev；失败提示带 6 位 `errorId`；`console.warn` 去重 |
| P0-05 模块分五档 | ✅ | `compose.js` 的 `TIER` / `TIER_SKIP` / `tierOf` |
| P1-26 收敛渲染路径 | ✅ | 面板与单页都只调 `composeResult`，段序不再各写一遍 |
| P1-27 状态归并 | 未做 | 归第四批 |
| P1-28 局部重绘 | 未做 | 归第四批 |

两个实现决定记在这里，免得以后有人改回去：

- `TIER_SKIP` 只跳 `followup`，不跳 `castAt`。起盘时刻归 `TIME_KIND`（`src/app.js:744`）管，同一件事不写两处。
- 盘号（`shortId`）进 `engine/diff.js:12` 的 `IGNORE_KEYS`。换口径、换版本必然换号，那是另一次排盘，不该算成「盘面动了一处」。

闸：`check-patterns` 90 文件、`check-assertions` 184 文件 10434 PASS、`check-bundle` client.js 377KB / gzip 115KB（上限 128KB）、`check-html-sinks` 6 文件、`check-perf` 29 项、`test-all` 185/185（50.5s）。

### 第二批（0.82.0-wip）2a + 2b + 2c 第一刀已落地

| 条目 | 状态 | 落点 |
|---|---|---|
| P0-06a 三个 adapter | ✅ | `engine/envelope.js` 的 `daliurenAdapter` / `meihuaAdapter` / `hepanAdapter`，注册进 `ADAPTERS` |
| P0-06b 白名单与口径 | ✅ | `FACTOR_WHITELIST` 加三组因子名；`SCHOOL` 加三条取用口径 |
| P0-06c 十个事实型头卡 | ✅ | `engine/headline.js` 的 `factHeadline(r)` + `src/panel-kit.js` 的 `factHeadHTML` |
| P1-36 两套头卡共用视觉 | ✅ | `factHeadHTML` 直接复用 `summaryHTML` 的 `mp-br` 版式，零新 CSS |
| P0-08 段落分层（取代句子去重） | ✅ | `engine/interpret.js` 的 `markSections` + `panel-kit.js` 的 `mp-it-method` |
| P0-09 出处与分歧一个入口 | ✅ | 五维只留 `mp-it-knowref` 入口，卡片本体进 `#mp-sec-know` |
| 2c 剩余：sections 正文改写 | 未做 | 内容活，单独立项 |

三个实现决定，同样别改回去：

- 头卡只在**没有 brief** 时生成（`engine/index.js` 的 `if (r && !r.brief)`）。有信封的体系再用头卡就是同一份结论说两遍。
- 头卡**绝不产出** `direction` / `confidence`。黄历没有顺不顺，称骨没有把握，硬造就是假的。
- 头条的内容必须**随盘变**，这是测试钉死的一条（`test/headline.test.mjs` 第 ③ 组）。写死活字串的头卡等于装饰。

闸：`check-patterns` 397 文件、`check-assertions` 188 文件 10739 PASS、`check-bundle` 各块 220–228KB / gzip 92–95KB、`check-html-sinks` 6 文件、`test-all` 188/188 三遍（54.3 / 53.6 / 53.3s）、页面 1756.6KB 且 `docs/index.html` 已同步。

2c 的两个决定，同样别改回去：

- **不做句子级去重**。实测跨层 8 字片段重合只有 0–17 处，重复是「换说法」不是「复现同句」，句子哈希抓不到，硬做只会删不动。分层才是那一刀。
- **出处不删只挪**。知识卡整块进折叠区，五维留一行入口。删掉就没法核了，挪走用户还能点开。

