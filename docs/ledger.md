# ledger：任务台账

两栏，各条都要带依据 —— 只写结论不写依据的条目等于没有。

结论性的一行写「做完了什么」，依据写「提交号 / 闸门数字 / 命令输出」。待办写「还剩什么 + 卡在哪」。

最后更新：2026-11-20（落款提成独立段已提交并推 main：`1642f7e`，Pages 已按该提交构建；npm / tag / Release 未动；闸 217/12173）

---

## 一、已完成

| 项 | 依据 |
| --- | --- |
| 落款提成独立段（修复八字 / 紫微等折叠后看不到落款） | 已提交并推 main：`1642f7e`；远端 main 读回同 SHA，Pages `builds/latest = 1642f7e / built`，线上 `docs/index.html` 2641115 B、含「另含 1 项未发版改动」小牌与落款段；npm 仍 0.86.1（未含本修复）、tag / Release 未推送。根因：`pp.interpretHTML` 把落款塞进 `.mp-it-wrap`，而 `.mp-it.folded .mp-it-wrap{display:none}` 默认收起，只有解读为空的短体系（称骨、小六壬）经 `resultWithInterpret` 兜底才露出来。修法：`src/compose.js` `USER_SEGS` 加 `sign`（排在 `extra` 之后、`exportBar` 之前），`src/app.js` / `src/web-ui.js` 各传 `sign: PP.signatureHTML()`，`interpretHTML` 与 `resultWithInterpret` 不再生成落款；`test/compose.test.mjs` 83 条、`test/signature.test.mjs` 104 条（折叠为真时落款仍在 `.mp-it-wrap` 之外）；真 Chrome 实测 1280 与 420 两种宽度下八字 / 紫微各恰好一处落款、默认可见、微信群码点开为 240×240、无 JS 报错；全闸 217/12173、`e2e-dom` 166、`e2e-panel` 187/0、`smoke-all` 306；css-strip gzip 124593（余量 10575 B） |
| 微信群二维码进落款（7 天有效） | `src/panel-kit.js`：`MP_SIG_WX_QR`（240×240 / 1559 B，zxing-cpp 解出 `https://weixin.qq.com/g/AwYA…`）、`MP_SIG_WX_UNTIL='2026-11-27'`、`pp.wxQrLive(now)`、第二按钮 + `data-qr-for="wx"` 配对行；过期只留说明不渲染图；频道码同步 3032 → 1626 B（144×144）；`test/signature.test.mjs` 72 → 86 条；真 Chrome 实测两按钮各开各行、独立收起、打印两张不出、无 JS 报错；gzip 123960 → 124600（余量 10.3KB） |
| 0.86.0 发版（观音灵签 + 每日福签） | 提交 `f04a6cd`；npm latest **0.86.0**（shasum `855e1a88`、122 文件，tarball 可下载）；tag `v0.86.0` → `f04a6cd`（annotated `e9c696a`，API 复核；本机 ls-remote 走 HTTPS 被重置，以 API 为准）；Release <https://github.com/xuanfu-web/dsh-metaphysics/releases/tag/v0.86.0>；远端 main = `f04a6cd`；Pages `builds/latest = f04a6cd / built`，线上 `0.86.0` 命中 2 处；桌面副本本次未刷新（`--no-desktop`，需要时 `npm run build:desktop`）；npm CLI 用 `~/tools/node-v22.20.0-win-x64/node_modules/npm/bin/npm-cli.js`（PATH 无 npm） |
| 观音灵签（第 23 个 tab，一事一签可重摇） | `engine/guanyin-data.js`（百支：上 23 / 中 59 / 下 18，签题无重复、四句七言全量校验 0 问题）+ `engine/guanyin.js`（指定签号 / seed 复现 / except 防连抽，100×6 组穷举撞签 0；question ≤80 字）；`src/panel-kit.js` `pp.guanyinHTML`/`guanyinOracleHTML`（签筒卡 + 再摇一签）；`src/app.js` / `src/web-ui.js` 摇签入口、深链 draw、导出条六项、禁止入历史 / 卦例 / 应验；`test/guanyin.test.mjs` 130 条；`e2e-panel` 灵签段实测 26→15 换签、无新增 JS 报错 |
| 每日福签（一天一签，不重摇） | `engine/qian.js`（36 支原创签、四档、按日期确定性抽取）+ `test/qian.test.mjs` 92 条；首屏迷你签筒 1.05s 摇签动画、近七日回看；`src/groups.mjs` 问一件事新增福签 / 灵签；README 体系与分组说明同步 |
| 0.86.0 顺带修复：八字交节轴 / 奇门农历年 / 称骨夏令时 / 紫微同表 | `engine/bazi.js` 年柱月柱与起运改用标准时轴比较（`test/bazi-term-axis.test.mjs` 16 条）；`engine/qimen.js` `lunarDate` 用 `lunarYear`；`engine/chenggu.js` 接 `applyDst`（1986–1991）；`engine/ziwei.js` `kuiyueTableOf` 统一本命 / 大限 / 流年魁钺，`nianjieOf` 单式共用，`engine/ziwei-hepan.js` 去掉重复 `summary`；`test/panel-output-guards.test.mjs` 14 条；全闸 217/12123、`e2e-dom` 166、`e2e-panel` 187/0、`smoke-all` 306、分块 22 |
| 对外联系入口加腾讯频道（面板底部 + 单页导出条 + 反馈报告「联系渠道」+ README） | `src/app.js` 两处（底部 `mp-fb-b` 与 `feedbackReport()`）、`src/web-ui.js` 一处（`exportBar` 的 hint）、`README.md`；频道 <https://pd.qq.com/s/Nb18ikqqfl>；产物核对 `client.js` 2 处 / `命理排盘.html` 1 处；全闸 211/11719 |
| 0.84.0 发版（共享块 + 攒批收口） | 提交 `2ae3028`；npm latest 0.84.0（shasum `0f52bdfe`、117 文件）；tag `v0.84.0`；Pages `builds/latest = 1ab4463 / built`、线上版本串 0.84.0；桌面副本已刷新 |
| 发版链路固化成一条命令 `npm run ship` | `tools/ship.mjs`：build:desktop → release → push-branch → 读回 npm/tag/Release/Pages 四处；git 与 npm-cli 自动兜底；`--dry-run` 可单验 |
| 公共模块抽两层共享块（`client.shared.js` / `client.shared-interpret.js`，共享表 `globalThis.__MP_SHARED__`，`index` 仍按块各建） | 提交随 0.84.0；`tools/build-client.mjs` 的 `SHARED_MODULES`/`SHARED_TIERS`/`assembleShared`；产物 20 文件 gzip 2,703,211 → 1,000,474 B（−63%）；`test/chunks.test.mjs` 164 条、`tools/check-bundle.mjs`「与源码一致」 |
| 共享集合做依赖闭包 + 层序不倒挂（`interpret` 静态依赖 `ziwei`/`liuyao`/`daliuren`/`qimen-interpret`） | `tools/build-client.mjs` 闭包循环与 `tierOf`；断言「核心层不依赖解释层」；分块引擎与源码逐字节 19/19 |
| 分块自检/测试改常驻 realm（先共享层再块） | `tools/check-bundle.mjs` `bundleRealm`/`registrationInRealm`；`test/chunks.test.mjs` 的 `realm`/`loadBundle`；教训 L-028 |
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
| 频道二维码落款 + 「检查更新」（0.85） | 落款只进「方法与验证」折叠区末尾（每份报告一处、短体系兜底成 `.mp-it-secs` 一处），二维码 240×240 灰度二值化后内嵌 base64（4044 字符）；按钮点了才 `fetch` registry（8s 超时、no-store、失败静默恢复），版本号印自 `window.__MP_VER`；`test/signature.test.mjs` 72 条（含「正文区不得出现二维码 / 落款只一处 / 失败后按钮恢复」）；基准线同步到 212/11791 | `src/panel-kit.js`（CSS / `MP_SIG_QR` / `signatureHTML` / `checkUpdate` / `__MP_SIG_BOUND`）、`test/signature.test.mjs`、client.js gzip 119508 |
| 「网页版点八字/紫微变白」真因（0.85.1） | `.tool:hover{background:var(--panel)}` 排在 `.tool.on` 之后、且 `.on` 只重设边框阴影→同特异性下 hover 白底赢；桌面鼠标一移开就散、Chromium 复现不出，**触屏 hover 常驻** → 选中格变米白、文字仍是 `--on-accent` 纯白 = 一块空白卡。A/B（390×844 触屏真 tap）：旧写法 `background-image:none / rgb(255,253,248)`、标题 `rgb(255,255,255)`；新写法 `linear-gradient(145deg,#a72c23,#7d1f18)`。修法 `.tool:hover`/`.tab:hover` 收成 `:not(.on)`，`.tool.on`/`.tab.on` 显式重画背景；面板 `.mp-tool.on`/`.mp-tab.on` 本来就在 hover 之后且自带背景，已核对未改 | `tools/build-html.mjs` 两处选择器 + 两处 `.on` 背景；`test/render-guard.test.mjs` 新增「选中态不许被 hover 白底盖掉」通用断言（32 条）；页面 2540454 B、闸 213/11823 |

## 二、待办

| 项 | 状态 | 卡点 / 下一步 |
| --- | --- | --- |
| 北派紫微讲义 02 落地（2026-11-17，主人放权自定优先级） | **已完成，随 0.84.0 发版** | ①P0-1 论命次第：engine/plain-summary.js ziweiSummary() 前置「这张盘的因从哪来」，先来因宫再按禄权科忌摊生年四化，段数 4→5，	est/plain-summary.test.mjs 改五段断言；②P0-2 逢禄看忌/逢权看科：engine/ziwei-words.js 新增 HUA_PAIR 与 huaInLine(..., { matePalace })，engine/interpret.js 加 huaLands/mateLandOf 接线，不传 opts 时输出与旧版逐字一致；③P1-1 宫职衍义：PALACE_DERIVED_CANON 四条 + palaceDerivedOf/derivedViewsOf，只进 engine/followup.js 追问，顺带修掉 p.shensha.slice 必抛 TypeError 的真 bug（以前任何无年份追问都崩）；④P1-2 收缩护栏：lyCompositePlain 只取会聚最多的那一宫，补三条防回归断言；⑤P2 知识库 docs/知识库-北派紫微.md（四化词义 / 两套三才 / 象的三重定语 / 双象六组骨架 / 阴阳浮动口径 / 收与不收清单）。闸 210/210、11641 PASS（基线 11616）、e2e-panel 181/0、e2e-dom 166、9 产物纯 LF；实机紫微盘首段与追问三面均正常。随 0.84.0 发版。排盘层 `engine/ziwei.js` 未动。 |
| 0.82.0 之后攒的 30 项改动（2c 两刀 + 巡检修 bug + 所以呢判断层 + 界面工艺 + 入库包瘦身） | **已发版 0.83.0** | 提交链 `677f042`→`1933642`→`0.82.0` 之后 `e9cf81e`→`81f9257`→`ea01308`，本版一次发完（R-008）。闸：210/210、11616 断言、client.js gzip 113672；e2e-panel 181/0、e2e-dom 166。读回：main `947aad3`（ls-remote 一致）、tag `v0.83.0`→`ff6a755`、npm latest 0.83.0（shasum `f12ec290`、115 文件）、Release draft=false（body 7357 字）、Pages 线上 `__MP_VER=0.83.0`。 |
| 两套渲染链合清单 | **全部完成**（17 项两条链都有正面断言） | `docs/渲染链检查清单.md` 三轮复查：面板 9/10/12/15/16 补齐、锁定逻辑合并成 `pp.lockParams` + `mp-askfree`、第 4 项牌阵锁定与第 13 项全体系文本体检补正面断言。 |
| 0.83.0 后第二轮（性别身份 / 触控热区 / 称骨女命歌诀调查） | **已发版 0.84.0** | ① **性别不再参与「与性别无关」体系的身份**：22 体系逐一分男女比对内容，只有 `bazi`/`ziwei`/`hepan`/`trend`/`fengshui` 真变；其余 15 个内容一字不差、`shortId`/`handle` 却全异。`engine/fingerprint.js` 新增 `GENDER_NEUTRAL` 白名单（未登记体系保守保留），`shadowParams` 跳过、`chartIdOf` 缓存键置空、`handlePayload` 不带 —— 复测 15 个体系男女 `shortId` 与 `handle` 全同，5 个真读的仍分叉；断言 `shadow` +2、`handle` +3。② **触控热区**：`#method-open` 23 → 45 高（透明 `::after`，外观不动，浏览器实测点上方 10px 命中且真展开）；手机端 `.view-switch .seg button` 由 36 → 44（原来更具体的选择器把 `.seg button{min-height:44px}` 顶掉，390px 实测 45×36）。`分组 / 平铺` 不能用同一手法（`.seg` 的 `overflow:hidden` 会裁掉伪元素，实测点上方 8px 命中父元素），撤销无效 CSS 并写成注释 + 断言；`a11y-semantic` +6。③ **称骨女命歌诀**：三套通行本比对 + 卦诗对照，发现讹字改写（「矮巴勾枣」应为「矬巴勾枣」等）且通篇贬抑女性断语，达不到「两源逐字一致才收」标准，本轮不落表（理由写进 CHANGELOG）。闸 **211/211、11672 断言**、client.js gzip **113342**（余量 17.7KB）、页面 2467.4 KB、9 产物纯 LF、`e2e-dom` 166、`e2e-panel` 181/0、`check-perf` 29 项在限内。 |

## 三、发版前必查

一条命令跑完前 8 项：`npm run ship`（`tools/ship.mjs`：桌面副本 → release（构建/全闸/npm/tag/Release）→ 推 main → 读回四处证据）。dry-run 用 `npm run ship -- --dry-run`。

1. `node tools/build-all.mjs --gate` → 217/217、**12137** 断言（含 metrics M1–M7）；client.js **419597 B / gzip 124600**（132KB 上限，余量 10.3KB）；页面 2640371 B。
2. `node tools/check-bundle.mjs` → 引擎分块 **22 个**（gzip 合计 1.05MB、单块硬顶 200KB、共享块 `client.shared*.js` 各只取一次）。
3. `node tools/check-eol.mjs` → 9 个产物纯 LF。
4. 实机：起静态服读 `命理排盘.html`，23 体系各排一次，结果区字数 > 0。
5. 实机：设默认盘 → 刷新 → `computeHits=0` 且顶部条在。
6. 实机：出盘后参数区只读、点「修改参数」解锁、再点排盘重新锁定。
7. `node tools/e2e-panel.mjs` → 187 通过 0 失败；`node tools/e2e-dom.mjs` → 166 项通过；`node tools/check-perf.mjs` → 29 项在限内。
8. `git status` 干净，`docs/index.html` 与 `命理排盘.html` 同源。
9. 读回四样：npm `latest`、远端 `refs/tags/v<ver>`、GitHub Release、**Pages 的 `builds/latest` 提交 == HEAD**。最后一项是 0.84.0 差点漏掉的：tag 推上去不等于 `main` 推上去（`tools/push-branch.mjs`）。

## 四、已决（不再作为待办）

| 项 | 决定 | 依据 |
| --- | --- | --- |
| `src/panel-kit.js`（376KB / 5555 行）拆文件 | **不拆** | R-012：140+ 份测试把它当自包含脚本跑，拆掉等于替换测试形态；要重启需先做装载器 + 拼接一致性闸 + 按四分区切 |
| 「同盘同句柄」性别键 | **已做**（0.84.0） | `engine/fingerprint.js` 的 `GENDER_NEUTRAL` + `chartIdOf` 置空 + `handlePayload` 不带；实测 star / numerology / daliuren / chenggu 男女 `shortId` 与 `handle` 完全相同（`test/handle.test.mjs` ⑨ 段） |
| 称骨女命歌诀落表 | **不落表** | 三套通行本有讹字改写、通篇贬抑女性断语，达不到「两源逐字一致才收」；理由见 CHANGELOG 0.84.0 |
| 自动更新弹窗 / 首屏引流卡片 / 「还没有历史盘」扫码卡 | **不做** | 主人否决：更新提示只在「方法与验证」折叠区底部手动点，「检查更新」失败或没点都不联网、不打扰；首屏不出任何引导卡 |
