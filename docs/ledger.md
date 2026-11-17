# ledger：任务台账

两栏，各条都要带依据 —— 只写结论不写依据的条目等于没有。

结论性的一行写「做完了什么」，依据写「提交号 / 闸门数字 / 命令输出」。待办写「还剩什么 + 卡在哪」。

最后更新：2026-11-17（北派紫微讲义 02 落地：论命次第 / 四化配对 / 宫职衍义 / 收缩护栏 + 知识库；两套渲染链合清单 17 项全绿）

---

## 一、已完成

| 项 | 依据 |
| --- | --- |
| 视图分层（策略层 `src/compose.js`，五档 `TIER`，`composeResult()` 唯一拼接点，dev 三通道） | 提交 `7edcf41` / `fd3a59a` / `d98be6a` / `f33220a`；`test/compose*.test.mjs` |
| 2a 三个 adapter（大六壬 / 梅花 / 合盘） | `engine/envelope.js` 的 `validateEnvelope` 硬约束；`test/envelope-*.test.mjs` |
| 2b 十体系 `factHead` 头卡 | `engine/headline.js`；`test/headline.test.mjs` |
| 2c 方法与出处折叠 | `#mp-sec-method` / `#mp-sec-know`；八字正文 4696 → 3708 字 |
| 第四批（四级字号、口径条、显示预设、流月 chips、历史盘、高级折叠、示例清空、文案统一） | 提交 `d40c9d1` 等；`test/` 对应文件 |
| 工程三件（`lint-copy`、`LAST_FIELDS`、视图快照） | `tools/lint-copy.mjs`；`test/copy-*.test.mjs` |
| 七体系事实层 + `SECTION_REFS` 覆盖率 100% | `engine/facts.js`；`test/facts-only.test.mjs` 88 条 |
| 0 号门禁（`.gitattributes` 兜底、`check-eol`、`build-all --gate`、标签 `baseline/pre-2c` 与 `baseline/pre-interact`） | 提交 `1d439f4`…`8e21ede`；`198/198` |
| A 线第一刀：单页交互状态机（不自动排盘 / 缺项置灰 / 输入不回弹 / 缓存 / 默认盘 / 跨体系共用） | 提交 `840e9d7`；`test/flow-state.test.mjs` 39 条 |
| A 线第二刀：结果持久缓存 + 默认盘读缓存直出 | 提交 `cc9ee52`；`test/cache-default.test.mjs` 50 条；实机 `computeHits=0` |
| A 线第三条：出盘后输入区只读 + 「修改参数」入口 | 提交 `f8e5047`；`test/input-lock.test.mjs` 35 条；全闸 201/201、11224 断言 |
| 测试并发池（本机 node 冷启动 2–8s 的应对） | `tools/run-tests.mjs`；全闸 20 分钟 → 27s |
| REVAMP 第 15 节（A 线的六态、缓存、默认盘、只读、A2 的取舍、别改回去、实机证据表） | `docs/REVAMP.md` 末尾 |
| 治理四类文件骨架（rules / facts / lessons / ledger） | 本次提交；`docs/rules.md`、`docs/facts.md`、`docs/lessons.md`、`docs/ledger.md` |
| D 线闸门（`tools/preflight.mjs` 一份逻辑；钩子模板 + 安装器，安装前先探 sh） | 提交 `9d81d55` 起的 D 线两次提交；`node tools/preflight.mjs` 实测通过（文案闸自检 10 PASS、行尾 9 产物、注入面 6 文件） |
| 删除档案时联动 `defaultChart` | 提交 `846952b`；`test/cache-default.test.mjs` 加到 52 条 |
| A4 面板改造：结果缓存（按引擎入参求哈希）+ 出盘后参数区只读 + 「修改参数」入口 | 提交 `f85fc67`；`test/panel-cache.test.mjs` 26 条；全闸 202/202、11252 断言 |
| e2e-panel 适配只读（填表单前先点「修改参数」解锁） | 提交 `a7b9c61`；`node tools/e2e-panel.mjs` → 151 通过 0 失败 |
| 体积预算逐块化（`tools/chunk-budget.json`，每块按现状 +8%，单块硬顶 320 → 360KB） | 提交 `0c6caa2`；`check-bundle` 输出「单块硬顶 360KB / 每块预算 18 份」；`test/bundle-budget.test.mjs` 68 条 |
| M1–M7 度量闸（22 体系固定样本，接进 `build-all --gate`） | 提交 `81dd845`；`tools/metrics.mjs` 实测 `M1 1 / M2 最大 246 字 / M3 8/8 / M4 8/8 / M5 1 / M6 8/8 / M7 1`；`test/metrics.test.mjs` |
| 说人话层补齐奇门 / 塔罗 / 大六壬 / 梅花 / 合盘（原来只有八字 / 紫微 / 六爻有，其余静默少一块） | 提交 `25ca516`；`test/plain-five.test.mjs` 51 条；8099 实机五体系 `.mp-it-plain` 全部出现；`e2e-panel` 151 通过 0 失败 |
| 面板打开即出盘、不做「打开不自动排」（决策，理由见 `docs/REVAMP.md` 15.9 末段） | `e2e-panel.mjs:249` 断言「面板打开即排默认盘（紫微）」`bootResult > 4000`；缓存命中不算重算，`window.__MPStats.cacheHits` 可验 |
| 22 体系实机巡检（21 个 tab 逐个出盘）+ 修三个真 bug：起名缺名 / 报数起课缺数不置灰、错误文案是接口口吻、农历转公历把状态卡在 CALCULATING | 提交 `677f042`；`test/required-fields.test.mjs` 29 条；全闸 205/205、11391 断言 |
| 2c 正文细化第一刀：四主力说人话层落到盘面位置（八字月令本气 / 通根地支 / 耗泄天干，紫微命宫主星亮度 / 三方四正 / 煞星落宫，六爻世应爻位 / 动爻化进退 / 空亡 / 反吟伏吟，奇门日干时干落宫 / 值符值使 / 十干应克） | `engine/interpret-plain.js`；M2 最大 271 字（上限 400）、M1–M7 全达标；全闸 207/207、11462 断言 |
| 2c 补漏：奇门甲日（遁于六仪）按旬首仪定位，原来甲午日静默少「你落哪宫」一句 | 提交 `81f9257`；`test/plain-five.test.mjs` 加 2 条防回归断言（甲日样本）；`docs/lessons.md` L-016；全闸 207/207、11464 断言 |
| 2c 正文细化第二刀：塔罗 / 大六壬 / 梅花 / 合盘补「所以呢」判断层（落到牌位 / 三传 / 动爻 / 偏紧维，给下一步，不编应期）；顺带修塔罗白话写死三张牌阵措辞 | `engine/interpret-plain.js` 四分支；`test/plain-five.test.mjs` 加 21 条（51→72）；`docs/lessons.md` L-017；全闸 207/207、11483 断言，e2e-panel 163/163 |
| 北派紫微讲义 02 全本学习留档（218 页扫描 OCR；核伪 + 代码坐标 + 吸收优先级） | `docs/参考资料-北派紫微讲义02.md` + `docs/参考资料-北派紫微讲义02-OCR.txt`（261705 字节，纯 LF 无 BOM）；OCR 全文 108956 字符 / 218 页 / 775s；未改 engine 代码，等主人挑优先级 |
| 两套渲染链合清单复查：面板侧 9 / 10 / 15 按单页同等强度补齐，修深色 `.ask-sep` 低对比 | `docs/渲染链检查清单.md` 合清单复查节；`tools/e2e-panel.mjs` 六·五 + 八、163→168 通过 0 失败；`src/panel-kit.js:658` `var(--dimline)`→`var(--muted)`（2.16:1，共用层两条链一起生效）；`node tools/e2e-dom.mjs` 161 项通过；`node tools/build-all.mjs --gate` 207/207、11483 断言、gzip 121KB |
| 渲染链第二轮：面板侧第 16（八字卡四块，含称骨经 ensureEngine('chenggu') 按需拉分块那条路）与第 12（复制提问包内容量 > 2000）补齐；锁定扫描逻辑合并成 panel-kit 的 pp.lockParams + mp-askfree 标记类，两条链不再各写一份白名单 | docs/渲染链检查清单.md 第二轮复查节；tools/e2e-panel.mjs 六·六 + 十二 + 十四、168→176 通过 0 失败；tools/e2e-dom.mjs 161→165 项通过；src/panel-kit.js pp.ASK_FREE / pp.lockParams，src/web-ui.js:728、src/app.js:1100 改调它；tools/build-html.mjs 给 #question / #direction 挂 mp-askfree；test/ask.test.mjs 90→93、test/panel-cache.test.mjs 24→31（改成守契约不守字面串）；全闸 207/207、11486 断言、gzip 124417 |
| 渲染链第三轮：清单第 4 项（牌阵锁定，它决定抽几张牌，不该跟问事层一起放过）与第 13 项（面板 `undefined`/`NaN` 全体系文本体检）补正面断言 | `docs/渲染链检查清单.md` 第三轮复查节；`tools/e2e-dom.mjs` 塔罗出盘后断言 `#tcount.disabled === true`、161→166 项通过；`tools/e2e-panel.mjs` 十二·六断言「牌阵」select 锁住 + 新增十四·五逐 tab 排盘扫 `.mp-card`（实测扫 16 套，跳过 小六壬/MBTI/起名），168 起 176→181 通过 0 失败；`build-all --gate` 连跑两遍 207/207、11486 断言；9 产物纯 LF |
| 外部巡检四修：塔罗信封缓存串盘 / 小六壬报数被静默换成时间起课 / 梅花数字起卦报「缺 datetime」/ 五运六气与太乙省略日期不补今天 | `engine/envelope.js` `chartIdOf` 键表加牌阵标签与逐张正逆（同 seed 换牌阵不再撞 id）；`engine/xiaoliuren.js`、`engine/meihua.js` 按入参认模式、两组都给报 E_INPUT；`index.js` `DATE_ONLY` 加 wuyunliuqi / taiyi，小六壬「补此刻」前先看 num1–3；`test/adapters-extra.test.mjs` ⑧ 11 条、`test/args.test.mjs` 模式推断 10 条、`test/guard-inputs.test.mjs` ㉒㉓ 16 条；`docs/lessons.md` L-020；全闸 207/207、11521 断言、client gzip 122KB |
| 两链工具收敛：8 个同名工具收进 panel-kit（`isoDateOk` / `normalizeDateText` / `maskDateText` / `storeGet` / `storeSet` / `hash36` / `dayLabel` / `nowParts`），两条链只留一行委托 | `src/panel-kit.js` 新增「共用小工具」段并挂到 `window.__PP`；`src/app.js` / `src/web-ui.js` 删掉各自实现（含 app 里的 `pad2`）、改 `window.__PP.x()` 委托；`test/shared-helpers.test.mjs` 新建 38 条（暴露齐全 / 两链不许再实现 / 哈希向量 / 存储降级与往返 / 日期标签 / 当前时刻格式）；`test/date-input.test.mjs` 改成在 vm 里跑共用层 + 反查委托；`cache-default` / `first-screen` / `panel-first-screen` 三处源码正则改为守「共用层有实现 + 链上只委托」；全闸 208/208、11545 断言、`e2e-dom` 166、`e2e-panel` 181/0 |
| 构建入口守卫静默失效（`tools/build-html.mjs`）：按文档用相对路径 `node tools/build-html.mjs` 跑，`argv[1]` 是相对路径、插件又是符号链接（Node 按真实路径给 `import.meta.url`），守卫永远不成立——不写文件、退出码 0，页面停在旧版本 | 入口比较改成两边取 `realpath`；`test/standalone.test.mjs` 加 3 条：写法钉 realpath、照文档相对路径 spawn 一次必须真写出、写出的内容与 `page()` 逐字一致 |
| 闸门偶发红（`test/facts-only.test.mjs`）：塔罗用例没给 `seed`，每次抽牌不同，牌阵一变 `f-tarot-suits` 就不在这份 facts 里，「refs 不指向空气」隔几次红一次 | 该用例补 `seed: 7`；连跑 6 次 88 PASS / 0 FAIL 稳定 |
| 解释层三修：报告里同一句话念两遍（八字摘要↔解析重复 13 句）、分歧清单每条都拖「（文本·各家有异说）」、小字灰度 3.35 / 2.26 低于 AA | `engine/interpret.js` 新增 `statusTag` / `sharedTag` / `fmtCaveat`，限定语提到小标题；`engine/index.js` 新增 `stripEcho`（≥18 字整句、留首次），summary 先去自身重复再跨段去重；`src/panel-kit.js` 令牌 `--label:#696356` / `--faint:#726b5c` / `--ink3:#726b5c`，深色 `--ink3:#a9a193`；`test/explain-quality.test.mjs` 新建 41 条、`test/narrow-report.test.mjs` 反值班断言翻正（52 条）；实测七体系重复长句 0、条目行数不变（八字 14 / 紫微 11 / 六爻 9 / 塔罗 2） |
| 界面工艺重整（0.83，只动外观）：磁贴副标题单行省略号腰斩、四张分组卡等拉伸留空洞、装饰性虚线遍地、四柱表无表头底色、结论判断词与正文同档 | `tools/build-html.mjs` 第二个 `<style>` 块「0.83 外壳」（根令牌 + 磁贴两行 + 卡片等高 + 末项铺满 + 42/44px 交互件 + ≤640 覆盖）；`src/panel-kit.js` CSS 末尾「0.83 报告」（结论卡 19px、关键几点实线分隔、表头落 `--band`、`.pp` 加内边距、装饰虚线换实线、`.mp-env` 成卡、`.mp-prof-empty` 去虚线）；页面 `命理排盘.html` 1870.9 KB |
| 判断标签三色从未生效：`--env-*` 自引用（`var(--自己)`）整条声明作废，且令牌作用域在 `.pp/.mp-it`、结论卡 `.mp-env-head` 不在其中 | `src/panel-kit.js` 在 `:root` 给实值 `#2f6b4f` / `#7d5410` / `#3a5570`（`--card` 上 5.8–7.6:1），深色 `@media prefers-color-scheme:dark` 再覆盖一套；实测标签由 `rgb(26,25,22)` 回到 `rgb(58,85,112)`；`test/explain-quality.test.mjs` 钉 4 条（不自引用 / `:root` 有定义 / 深色有覆盖 / 三色通道差 ≥24） |

| 报告区标题全是 `div` / `b`：读屏听不出层次，「跳标题」跳不进报告任何一段 | `src/panel-kit.js` 渲染侧换标签（结论 / 关键几点 / 人生 K 线 / 一眼看 → `h2`；怎么做 / 留意 / 一页读懂 / 解析分节 → `h3`），类名不动；override 收 UA margin 与粗体，`h3.mp-env-adv-h` / `h3.mp-it-sh` / `h3.mp-outline-h` 显式 `display:block` 拦页面外壳的全局 `h3{display:flex}`；浏览器实测 margin 全 0、字号字重与改前一致；`test/explain-quality.test.mjs` 补 10 条（51 条） | 标题语义化 |
| `detail` 档位说明与实现漂移四处：`index.js` 顶层说明 / schema、`engine/index.js` `interpretText` / `detailOf` 头注，都把 lean 写成「只给结论、所问方向与三张表」 | 四处按行为重写（lean 保留说人话 / 一页读懂 / 维度 / 短节 / 追问 / 边界与免责，表行给全、名词解释照给；brief 再限 8 行且不给名词解释）；`test/detail-tier.test.mjs` ⑥ 段补 5 条文档-行为一致性断言（115 条） | 文档对齐 |

| 入口包余量只剩 3.5KB：CSS 注释占 20.8KB 源文本 / 10.7KB gzip | 新增 `tools/css-strip.mjs`（`stripCssComments` + `stripKitCssSource`），`build-client.mjs` 两处与 `build-html.mjs` 内联共用；源码注释不动，只剥产物；client.js gzip 127525 → 113672（余量 3.5 → 17.4KB），页面 1872.1 → 1863.5 KB；`test/css-strip.test.mjs` 15 条（含余量 ≥10KB 断言） | 体积战 |
| `src/panel-kit.js` 366KB 单文件是否该拆 | **不拆**：一百多份测试把它当自包含脚本 `vm.runInNewContext(源码)` 直接跑，拆开要把「源码即脚本」换成「拼接器正确」；改为文件头写清四段分区（CSS / 小工具 / 盘面渲染 / 报告编排） | 结论 |

## 二、待办

| 项 | 状态 | 卡点 / 下一步 |
| --- | --- | --- |
| 北派紫微讲义 02 落地（2026-11-17，主人放权自定优先级） | **完成四刀 + 一份知识库** | ①P0-1 论命次第：engine/plain-summary.js ziweiSummary() 前置「这张盘的因从哪来」，先来因宫再按禄权科忌摊生年四化，段数 4→5，	est/plain-summary.test.mjs 改五段断言；②P0-2 逢禄看忌/逢权看科：engine/ziwei-words.js 新增 HUA_PAIR 与 huaInLine(..., { matePalace })，engine/interpret.js 加 huaLands/mateLandOf 接线，不传 opts 时输出与旧版逐字一致；③P1-1 宫职衍义：PALACE_DERIVED_CANON 四条 + palaceDerivedOf/derivedViewsOf，只进 engine/followup.js 追问，顺带修掉 p.shensha.slice 必抛 TypeError 的真 bug（以前任何无年份追问都崩）；④P1-2 收缩护栏：lyCompositePlain 只取会聚最多的那一宫，补三条防回归断言；⑤P2 知识库 docs/知识库-北派紫微.md（四化词义 / 两套三才 / 象的三重定语 / 双象六组骨架 / 阴阳浮动口径 / 收与不收清单）。闸 210/210、11641 PASS（基线 11616）、e2e-panel 181/0、e2e-dom 166、9 产物纯 LF；实机紫微盘首段与追问三面均正常。未发版（攒批）。排盘层 `engine/ziwei.js` 未动。 |
| 0.82.0 之后攒的 30 项改动（2c 两刀 + 巡检修 bug + 所以呢判断层 + 界面工艺 + 入库包瘦身） | **已发版 0.83.0** | 提交链 `677f042`→`1933642`→`0.82.0` 之后 `e9cf81e`→`81f9257`→`ea01308`，本版一次发完（R-008）。闸：210/210、11616 断言、client.js gzip 113672；e2e-panel 181/0、e2e-dom 166。读回：main `947aad3`（ls-remote 一致）、tag `v0.83.0`→`ff6a755`、npm latest 0.83.0（shasum `f12ec290`、115 文件）、Release draft=false（body 7357 字）、Pages 线上 `__MP_VER=0.83.0`。 |
| 两套渲染链合清单 | **全部完成**（17 项两条链都有正面断言） | `docs/渲染链检查清单.md` 三轮复查：面板 9/10/12/15/16 补齐、锁定逻辑合并成 `pp.lockParams` + `mp-askfree`、第 4 项牌阵锁定与第 13 项全体系文本体检补正面断言。 |

## 三、发版前必查

1. `node tools/build-all.mjs --gate` → 210/210、11616 断言（含 metrics M1–M7）；client.js gzip 113672（128KB 上限，余量约 17KB，再加界面东西前先看 `test/css-strip.test.mjs` 的余量断言）。
2. `node tools/check-eol.mjs` → 9 个产物纯 LF。
3. 实机：起静态服读 `命理排盘.html`，22 体系各排一次，结果区字数 > 0。
4. 实机：设默认盘 → 刷新 → `computeHits=0` 且顶部条在。
5. 实机：出盘后参数区只读、点「修改参数」解锁、再点排盘重新锁定。
6. `node tools/e2e-panel.mjs` → 181 通过 0 失败；`node tools/e2e-dom.mjs` → 166 项通过。
7. `git status` 干净，`docs/index.html` 与 `命理排盘.html` 同源。
