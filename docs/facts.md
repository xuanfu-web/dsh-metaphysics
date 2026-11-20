# facts：可核对的结构事实

只写「读代码或跑命令确认过」的东西。未验证的推测不入库，写进待核对事项。

条目格式：

```
## F-00N 标题
- type: fact
- status: active | superseded
- verified: YYYY-MM-DD
- 依据：命令或文件行号
```

---

## F-001 规模

- type: fact
- status: active
- verified: 2026-11-16
- 依据：`Get-ChildItem engine/*.js`、`node tools/build-all.mjs --gate`、`test/*.test.mjs`

- `engine/` 83 个 js 文件，合计约 2.13 MB。
- `tools/build-client.mjs` 的 `ORDER` 打 81 个模块进单页包（比文件数少，是因为有只给测试用的分块）。
- `test/` 201 个 `*.test.mjs`，合计 11224 条断言，全闸 27s（含构建，8 路并发）。
- 单页产物 `命理排盘.html` 约 1.82 MB，`docs/index.html` 与它逐字节同源。

## F-002 体系分层

- type: fact
- status: active
- verified: 2026-11-16
- 依据：`src/compose.js` 的 `TIER` 五档

24 个体系按「出结果的方式」分五档，`composeResult()` 是唯一的拼接点，`TIER_SKIP` 决定哪档不出 `followup`（`quiz`、`lookup` 两块）。新的体系必须落进某档，落不进去说明它其实属于已有一档。

## F-003 交互状态机

- type: fact
- status: active
- verified: 2026-11-16
- 依据：`src/web-ui.js` 的 `FLOW`

六态：`IDLE_UNFILLED / IDLE_READY / CALCULATING / RESULT_LOCKED / EDITING / ERROR`。

- 进 `CALCULATING` 全文 1 处（`run()` 内）。
- 所有迁移的最后一步都汇到 `paintFlowNote()`：`refreshFlow` / `bail` / `setTab` / 清空 / `run` 命中 / `run` 成功 / `restoreDefault`。
- `syncInputLock()` 挂在 `paintFlowNote()` 开头，全文只有这 1 处调用。

## F-004 结果缓存的形状

- type: fact
- status: active
- verified: 2026-11-16
- 依据：`src/web-ui.js` 的 `CACHE_*` / `chartKeyOf` / `cacheWrite`

- 存储键 `mp.chartResult.v1`（整张 map），schema 版本 `CACHE_SCHEMA = 1`，上限 6 条，单条超 400000 字节跳过。
- 条目键 = `hash36('1|' + JSON.stringify([tab, collectArgs()]))`，即「参数 + 体系 + schema 版本」（FNV-1a → base36）。
- 条目字段：`chartId`、`system`、`profileSnapshot`、`envelope`、`createdAt`、`last`。**`last` 是必需的**，`paint()` 吃 `last.r / last.html / last.perf`。
- 默认盘 `mp.defaultChart.v1` = `{ profileId, system, setAt, cacheKey }`，`cacheKey` 记的是置顶那一刻那张盘的键。

## F-005 输入锁定的范围

- type: fact
- status: active
- verified: 2026-11-16
- 依据：`src/web-ui.js` 的 `syncInputLock()`、`tools/build-html.mjs` 的 `.bar` 规则

- 锁 `.bar` 内 `input / select / textarea`。`input` 用 `readOnly`，`select` 与 `checkbox / radio` 用 `disabled`（前者没有 `readOnly`）。
- `disabled` 不影响 `.value`，`collectArgs()` 照常读到，`paramKey()` 不会漂。
- 追问框 `#askq` 在 `#out` 内，问卷控件是 `button.mb-btn`，都不在锁定范围。
- 三个次要按钮装在 `.gobtns` 里占第 2–4 列；`.bar` 高度 391 → 279。

## F-006 引擎内存缓存与页面持久缓存是两层

- type: fact
- status: active
- verified: 2026-11-16
- 依据：`engine/envelope.js` 的 `cacheGet` / `cacheSet`（约 1404–1478 行）

`buildEnvelope()` 内部有一层内存缓存（键 `system|chartId|mode`），刷新页面即空。任务书要的「同参数重复点击直接读缓存」靠的是页面那层 `mp.chartResult.v1`，不是它。两层不要混谈。

## F-007 本机跑测试必须并发

- type: fact
- status: active
- verified: 2026-11-16
- 依据：`tools/run-tests.mjs`、`tools/test-all.mjs`、`tools/check-assertions.mjs`

本机 `node -e 1` 冷启动 2–8 秒（安全软件扫新进程）。串行跑 201 个文件要 20 分钟以上，pwsh 300s 超时会丢进程。并发池默认 6 路，`TEST_CONCURRENCY` 封顶 32，实际全闸 27s。
