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

收尾阶段不再逐个小版本发。攒下的改动一次走完整链路：版本号 → CHANGELOG → 构建 → 全闸 → 提交 → tag → **推 main** → npm → GitHub Release → Pages → 桌面副本。

「推 main」这一步 0.84.0 差点漏掉：tag 与 Release 都成功了，但远端 `main` 还停在发版前的提交，而 Pages 认的是 `main/docs`，于是站点一直显示旧版本（读回页面里只有 0.83.0 / 0.82.0）。分支落后于本地时，tag 推送不会带着它一起走。现在用 `node tools/push-branch.mjs`（HTTPS 被 reset 会自动走 SSH deploy key），推完再看 Pages 的 `builds/latest` 是不是新提交、页面里的版本串是不是新版本，两样都要对。

npm 打完 `+ pkg@ver` 后 registry 404 是队列延迟（实测 8 分钟），别重发、别动 token。判断成功只看三样：`dist-tags` 的 `latest`、`/<pkg>/<ver>` 的 shasum、`tools/release.mjs --verify-only`。查 registry 优先用 `curl.exe`，PS 的 `Invoke-RestMethod` 在这台机器上会假报连接失败。

token 不必每次 export：`release.mjs` 按「`NPM_TOKEN` 环境变量 → `~/.dsh/metaphysics-autopublish.json` 的 `npmToken`」取（与 push-tag / gh-release 共用这份凭据）。它的临时 npmrc 同时钉住 `registry=https://registry.npmjs.org/`——这台机器的全局 registry 是 npmmirror，漏掉这行会让 npm 拿 npmjs 的 token 去查镜像域，报 `ENEEDAUTH`（0.84.0 发版时踩到过一次）。

## R-009 本机不装 git 钩子，闸门走 preflight

- type: rules
- status: active
- since: 2026-11-16

这台机器的 DSH 沙箱里，git 自带的 msys sh 起不来：

    fatal error - couldn't create signal pipe, Win32 error 5

git 执行钩子一定经过 sh，所以装 `.git/hooks/pre-commit` 的后果不是「检查不生效」，而是**每一次 commit 都被拒**（已实测踩过一次）。`tools/hooks-install.mjs` 因此先探 sh，探不通就拒绝安装并打印手动入口。

本机的正确用法：

    node tools/preflight.mjs          提交前（文案闸 + 行尾 + 注入面 + 暂存 js 语法，几秒）
    node tools/preflight.mjs --full   推送前（build-all --gate）

sh 正常的机器照常 `node tools/hooks-install.mjs`，钩子只是 `exec preflight` 的薄壳，闸门逻辑只有一份。

---

## R-010 改了输入区的可编辑性，e2e 要跟着解锁

- type: rules
- status: active
- since: 2026-11-16

A4 之后面板和单页都是「出盘即只读」，改参数得先点「修改参数」。Playwright 遇到
`element is not editable` 不报错，它重试 59 次再抛 TimeoutError —— 看起来像页面卡死，
实际是产品行为变了、测试没跟上。

所以 `tools/e2e-panel.mjs` 里凡是要填表的地方，前一行都先叫一次 `unlockParams()`
（按钮不存在就是 no-op，成本 120ms）。改任何「控件什么时候能改」的逻辑，跑一遍 e2e：

    node tools/e2e-panel.mjs      # 期望 151 通过 0 失败
---

## R-011 共享块是构建期算出来的，别手改产物也别忘了闭包

- type: rules
- status: active
- since: 2026-11-18

`client.shared.js` / `client.shared-interpret.js` 的成员由 `tools/build-client.mjs` 算出来：

- 出现 ≥2 个分块的模块进共享（`index` 除外，它必须按块各建）；
- 再对共享集合做**依赖闭包**——共享模块 import 的东西一律拉进共享，层级取「用它的人里最早的那层」；
- 分块声明自己要哪几层（`sharedTiersOf`），入口按 `__MP_CHUNK_TIERS__` 逐个 await，共享层先于块。

改完引擎记得：`node tools/build-client.mjs` 重建（手改 `client*.js` 会被 `check-bundle` 判「与源码不一致」），
`node tools/check-bundle.mjs --update-budget` 只在体积正常变化时用（预算只降不无理由升）。

要验证「共享表真的可用」，必须用**一个常驻 vm realm** 先载共享层再载块；
每次 `runInNewContext` 都会丢掉 `globalThis.__MP_SHARED__`（L-029 记了踩坑过程）。
