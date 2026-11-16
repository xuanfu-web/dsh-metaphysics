# ledger：任务台账

两栏，各条都要带依据 —— 只写结论不写依据的条目等于没有。

结论性的一行写「做完了什么」，依据写「提交号 / 闸门数字 / 命令输出」。待办写「还剩什么 + 卡在哪」。

最后更新：2026-11-16（D 线闸门落地）

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

## 二、待办

| 项 | 状态 | 卡点 / 下一步 |
| --- | --- | --- |
| A4 面板 `src/app.js` 同步改造 | 未开始 | 面板是 React 版（2942 行、`useState` 一堆），要把六态、只读、缓存、默认盘整套搬过去。工程量约等于把 `web-ui.js` 那套重写一遍。先勘察 `activate` / `switchTo` / `run` 三条通路，确认它现在在哪里自动排盘。 |
| D 线钩子在这台机器上装不了 | 环境限制 | msys sh 报 ``couldn't create signal pipe, Win32 error 5``，装上会把 commit 全堵死（实测过一次）。安装器已改为探不通就拒装，日常改用 ``node tools/preflight.mjs``。sh 正常的机器照常 ``npm run hooks:install``。 |
| 2c 剩余四主力正文改写 | 部分完成 | 八字/紫微/六爻/奇门已接事实层，正文改写还差细节。塔罗/大六壬/梅花按「简化 facts-only」定档，不改写正文。 |
| 删除档案时联动 `defaultChart` | 已知遗留 | `onProfClick` 的 `del` 分支没清 `defaultChart`；档案没了顶部条会自然收起，条目留着不影响使用。修的时候别把 `profApply` 的显式排盘顺手删掉。 |
| 发版 | 等主人发话 | 主人原话「继续做吧 不用每天发新版 哈哈 继续做好 打磨好」。攒批一次走完（R-008）。 |

## 三、发版前必查

1. `node tools/build-all.mjs --gate` → 201/201、11224 断言。
2. `node tools/check-eol.mjs` → 9 个产物纯 LF。
3. 实机：起静态服读 `命理排盘.html`，22 体系各排一次，结果区字数 > 0。
4. 实机：设默认盘 → 刷新 → `computeHits=0` 且顶部条在。
5. `git status` 干净，`docs/index.html` 与 `命理排盘.html` 同源。
