# rules：强制规矩

违反即不通过。规矩条只有两种来源：任务书钉死的、事故之后立的。教训写在 `lessons.md`，不写在这里。

条目格式：

```
## R-00N 标题
- type: rules
- status: active | superseded
- since: YYYY-MM-DD
- superseded_by / superseded_at：被取代时补，原条目保留不删
```

---

## R-001 构建顺序不许靠记忆

- type: rules
- status: active
- since: 2026-11-15

改过 `tools/build-html.mjs` 之后，必须先 `node tools/build-html.mjs`，再 `node tools/check-assertions.mjs --update`。

顺序反了就会看到 `standalone.test.mjs` 报「仓库根的离线页与构建结果一致 失败（磁盘 N 字节 / 构建 M 字节）」——那不是回归，是页面还没重建。一次做到位：`node tools/build-all.mjs --gate`。

## R-002 baseline 只打在全绿提交上

- type: rules
- status: active
- since: 2026-11-15

`baseline/*` 标签只能打在全闸通过（201/201）的提交上。195/196 那种先提交再发现的，必须先定性（构建漏步 / 真实回归），定性清楚、修到全绿，才允许打标。

## R-003 产物行尾只能是 LF

- type: rules
- status: active
- since: 2026-11-15

`.gitattributes` 第一行 `* text=auto eol=lf` 不许删、不许挪。新增任何「与生成器逐字节比对」的产物，必须同时登记进 `tools/check-eol.mjs` 的 `TARGETS` 表。

写文件不许用 PowerShell 的 `Set-Content -Encoding UTF8`（PS 5.1 会写 BOM）。用 `write` 工具，或 `[IO.File]::WriteAllText($p, $t, (New-Object System.Text.UTF8Encoding($false)))`。例外：`.ps1` 必须带 BOM（`UTF8Encoding($true)`），否则 PS 5.1 按 GBK 解析，脚本里的中文全乱。

## R-004 React sink 的豁免只认判定行行末

- type: rules
- status: active
- since: 2026-11-15

`check-html-sinks` 只认赋值判定那一行**行末**的 `// html-sink:ok 理由`。写在上一行、写在内层 `__html` 行，都不生效。

## R-005 参数变化不许排盘

- type: rules
- status: active
- since: 2026-11-16

单页里任何输入控件的 `change` / `input` 事件都只能调 `onParamChange()`（内部只 `refreshFlow()`）。禁止 `addEventListener('change', run)`、禁止 `syncQuick(); run()`、禁止 debounce 之后再排。

进 `CALCULATING` 只有 `run()` 里那一处；`run(` 的非注释调用点上限 12（当前 10）。新增「顺手也排一下」的入口就是破规矩。

## R-006 默认盘只读缓存，不重算

- type: rules
- status: active
- since: 2026-11-16

`restoreDefault()` 与 `run()` 的缓存命中分支里，不许出现 `run(` 或 `Engine.compute`。命中就 `last = makeLast(hit.last); paint();`，未命中只 `refreshFlow()`。

`run({ force: true })` 是唯一跳过缓存的口子。

## R-007 新 engine 模块要登记两处

- type: rules
- status: active
- since: 2026-11-15

新增 `engine/*.js` 后，必须同时进 `tools/build-client.mjs` 的 `ORDER`（能被打包）与 `INTERPRET`（如果它参与解读）。只登记一处，症状是「测试绿、页面里 undefined」，或者「本地能跑、单页缺块」。

## R-008 发版攒批，不一个个补

- type: rules
- status: active
- since: 2026-11-14

收尾阶段不再逐个小版本发。攒下的改动一次走完整链路：版本号 → CHANGELOG → 构建 → 全闸 → 提交 → tag → npm → GitHub Release → Pages → 桌面副本。

npm 打完 `+ pkg@ver` 后 registry 404 是队列延迟（实测 8 分钟），别重发、别动 token。判断成功只看三样：`dist-tags` 的 `latest`、`/<pkg>/<ver>` 的 shasum、`tools/release.mjs --verify-only`。查 registry 优先用 `curl.exe`，PS 的 `Invoke-RestMethod` 在这台机器上会假报连接失败。
