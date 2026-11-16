# ledger：任务台账

两栏，各条都要带依据 —— 只写结论不写依据的条目等于没有。

结论性的一行写「做完了什么」，依据写「提交号 / 闸门数字 / 命令输出」。待办写「还剩什么 + 卡在哪」。

最后更新：2026-11-16（说人话层补齐五个体系 + M1–M7 度量闸 + 体积预算逐块化）

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

## 二、待办

| 项 | 状态 | 卡点 / 下一步 |
| --- | --- | --- |
| 2c 正文再细化（塔罗 / 大六壬 / 梅花 / 合盘的「所以呢」判断层） | 有空间，不急 | 四主力已落到盘面位置（见「已完成」栏末行），这四个还停在「描述盘面」；M2 最大 271 字 / 上限 400。改 `engine/` 侧，不动 UI 包（`client.js` gzip 121KB，离 128KB 只剩 7KB）。动手前先跑 `node tools/metrics.mjs`。 |
| 发版 | 等主人发话 | 主人原话「继续做吧 不用每天发新版 哈哈 继续做好 打磨好」。攒批一次走完（R-008）。 |

## 三、发版前必查

1. `node tools/build-all.mjs --gate` → 204/204、11361 断言（含 metrics M1–M7）。
2. `node tools/check-eol.mjs` → 9 个产物纯 LF。
3. 实机：起静态服读 `命理排盘.html`，22 体系各排一次，结果区字数 > 0。
4. 实机：设默认盘 → 刷新 → `computeHits=0` 且顶部条在。
5. 实机：出盘后参数区只读、点「修改参数」解锁、再点排盘重新锁定。
6. `node tools/e2e-panel.mjs` → 151 通过 0 失败。
7. `git status` 干净，`docs/index.html` 与 `命理排盘.html` 同源。
