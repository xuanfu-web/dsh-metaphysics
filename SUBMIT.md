# 收录到 dsh-market 插件市场（awesome-dsh-plugin）

插件市场（dsh-market）的条目并不自建目录，它从
[awesome-dsh-plugin/awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) 的
`data/plugins/*.yml` 自动同步。所以「上架」= 一个 PR，只加**一个文件**，不改 README。

前置条件（本包已满足）：

- `package.json` 里有 `dsh.bundle`（`./cordis.patch.yml`）——决定能否 `dsh plugin add` 安装
- `package.json` 有 `dsh.client`（web 平台）
- 仓库公开可读
- `package.json` 的 `files` 里带上了 `命理排盘.html`（离线单文件页随包分发，订阅者装完就有）

## 一、条目文件

路径：`data/plugins/<owner>__<repo>.yml`，例如 owner 与 repo 同名时是 `data/plugins/你的名字__dsh-metaphysics.yml`
（**文件名与 url 必须与仓库完全一致**）。

```yaml
url: https://github.com/xuanfu-web/dsh-metaphysics
name: xuanfu-web/dsh-metaphysics
category: ui
description:
  en: 'Chinese metaphysics (xuanxue) divination panel and agent tool with nineteen systems: eight chart systems (BaZi, Zi Wei Dou Shu, LiuYao, MeiHua, Da Liu Ren, Qi Men Dun Jia, compatibility charts, Tarot) plus eleven quick references (almanac, solar–lunar conversion, date selection, bone-weight fortune, Xiao Liu Ren, horoscope, numerology, life-curve, feng shui, name analysis, an MBTI-style 16-type questionnaire), with ask-driven, report-style interpretation. BaZi adds exact dayun handover dates, annual suiyun hints, "passing-through" (通关), three-book classical cross-reference, four-mausoleum (杂气) month pattern selection and daily "human element" (人元司权); Zi Wei adds 34 patterns, nine switchable school variants, chained flying transformations and three-way-four-corner composite flights; LiuYao adds yongshen strength, whole-hexagram per-line strength, hidden-spirit release conditions and response-time clues (应期); feng shui covers eight-mansion and Xuan Kong flying stars; name analysis ships a 391-character library with five-grid (五格) numerology and phonetics checks. The DSH panel and the offline page share the same grouped first screen (ask / read a person / pick a date) with recent-used entries and narrow-width folding. All computed locally; networking is off by default. The npm package also ships an offline single-file page (命理排盘.html): double-click to open, every tab included, no server and no network needed.'
  zh: '玄学命理排盘：十九套体系——八套排盘（八字、紫微斗数、六爻、梅花易数、大六壬、奇门遁甲、合盘、塔罗）加十一套速查（黄历、农历互转、择日、称骨、小六壬、星座、生命数字、人生K线、风水、起名、十六型人格问卷），并可按所问之事生成可读报告；八字含交运日、岁运并临/伏吟反吟、通关、三书对照与杂气月取格/人元司权，紫微含 34 格局、九类流派开关、飞星串连与三方四正复合飞化，六爻含用神旺衰、全卦逐爻旺衰、伏神出伏与应期线索，风水含八宅与玄空飞星，起名含 391 字库、五格剖象与音韵检查；宿主面板与离线页共用同一套分组首屏（问一件事/看一个人/查日子），带最近用过与窄屏收纳；纯本地计算，默认不联网。npm 包内另附离线单文件页（命理排盘.html）：双击即开，十九个 tab 齐全，不用起服务、不用联网。'
```

> 上面这份是镜像；真身是 `submit/xuanfu-web__dsh-metaphysics.yml`，改描述以那个文件为准，改完记得回来同步这一段。

- `category`：可选 `agi ui usage theme model identity session memory tools wsl browser vision voice docs skill workflow git notify dev security remote market fun`。
  本插件是「对话可调用的工具 + 侧栏可视化面板」，取 `ui`；有人觉得偏 `fun`（文化娱乐）也可，维护者会改，不会因此打回。
- 描述里含 `: `（冒号+空格）时 en 必须加引号；中文全角冒号无此问题。
- 只有 `description.en` 必填，`zh` 可留给维护者补。

## 二、流程

```bash
# 1) 建公开仓库并推送（本目录已 git init 并提交）
git remote add origin https://github.com/xuanfu-web/dsh-metaphysics.git
git push -u origin main

# 2) 先 fork https://github.com/awesome-dsh-plugin/awesome-dsh-plugin
#    （fork 后地址为 https://github.com/xuanfu-web/awesome-dsh-plugin），再加一个 yml 提 PR
git clone https://github.com/xuanfu-web/awesome-dsh-plugin.git
cd awesome-dsh-plugin
# 把本目录 submit/xuanfu-web__dsh-metaphysics.yml 原样放到 data/plugins/xuanfu-web__dsh-metaphysics.yml
git checkout -b add-dsh-metaphysics
git add data/plugins/xuanfu-web__dsh-metaphysics.yml
git commit -m "Add dsh-metaphysics"
git push origin add-dsh-metaphysics
# 然后在 GitHub 上对着 awesome-dsh-plugin:main 开 PR
```

PR 合并后站点与 dsh-market 会自动重建，通常一天内可见。

## 三、可选但建议：发 npm

市场安装行默认用包名，发 npm 后 `dsh plugin install dsh-metaphysics` 直接可用
（名字目前已确认未被占用）：

```bash
npm publish --access public
```

## 四、提交状态（2026-10-30 更新）

- **PR**：https://github.com/awesome-dsh-plugin/awesome-dsh-plugin/pull/10409 已合并；#10557 也已合并（条目同步到 0.46 能力）。0.47–0.50.5（应期、杂气、人元、口径对照、喜忌争议）的市场描述仍需下一次 PR 补。
- **CI**：`Submission gate` 首轮失败，原因只有一条 `repository is 0.0 days old (needs 1)`；仓库创建已满一天，该检查重跑后应转绿
- **已发布**：npm `dsh-metaphysics@0.50.5`（2026-10-31，`dist-tags.latest = 0.50.5`，shasum `6f6a6f0d25379353ebaf896b57d7916c22accbc3`，62 个文件；0.50.2–0.50.4 随它一并发布）。0.50.5 修 issue #1 的「喜忌与调候同一五行重叠」；上一版是 0.50.1。
- **仓库同步**：`main` 已推送到 docs 提交（0.50.5 记录），tag `v0.50.5`，GitHub release：https://github.com/xuanfu-web/dsh-metaphysics/releases/tag/v0.50.5
- **仓库修复（2026-10-30）**：`.git` 的 `HEAD` / `config` / `index` 丢失（只剩 `objects`、`refs`、`ORIG_HEAD`），git 报 "not a git repository"；按 `refs/heads/main`（6e4966f）补回 `HEAD` 与 `config` 后 `git reset` 重建索引，工作区内容未被改动。
- **CDN 小坑**：发布后本机通过 `registry.npmjs.org` 查到的 packument 与 tarball 可能还是旧的（边缘缓存），表现为新版本查不到、tarball 404；加一个随机查询串（`?cb=<随机>`）或带 token 访问即能拿到新内容，等几分钟自然过期。
- **工具链小记**：`node` 不在 PATH 时用 `.workbuddy/binaries/node/versions/22.22.2-6/node.exe`；发布走 `node tools/release.mjs`（须设 `NPM_CLI=<node>/node_modules/npm/bin/npm-cli.js`，否则 Windows 上 `spawnSync npm` 报 ENOENT），token 走临时 `.npmrc`（0600），发布后立即删除；`npm run` 在 PowerShell 下会撞执行策略，用 `cmd /c "npm run ..."` 或直接 `node tools/*.mjs`。
- **历史卡点**：建仓用的临时令牌已删除（API 401）；`github.com:443` 曾间歇失败，重试后可推

## 五、本地同步（已完成）

桌面 profile 以软链方式引用本目录，源码改动即时生效：

- `~/.dsh/profiles/desktop/package.json` → `"dsh-metaphysics": "link:<本目录>"`
- `~/.dsh/profiles/desktop/node_modules/dsh-metaphysics` → 指向本目录的符号链接
- `~/.dsh/profiles/desktop/package.json` 的 `dsh.profile.bundles` 必须含 `"dsh-metaphysics"`

> **踩过的坑（2026-10-24）**：某次重启后 profile 的 `bundles` 列表里这一项掉了，
> 表现是**工具与面板一起消失**（`metaphysics_chart` 报 unknown tool），但依赖与软链都还在。
> 修复：`plugin_manager` 的 `set_bundle`（target `dsh-metaphysics`，enabled true）可即时恢复并把条目写回 `bundles`。
> 以后遇到"插件突然不见了"，先看 `bundles` 里还有没有它。

改了 `client.js`（浏览器端产物）之后，刷新页面即可；改了 Host 侧（`index.js` / `engine/`）需要重启 dsh web。

## 六、自动发布（每 24 小时）

- **计划任务**：Windows「DSHMetaphysicsAutopublish」，每天 **12:00**（中午；当前用户登录时运行；关机/睡眠错过会在恢复后补跑，最多 30 分钟）。
  - 查询：`Get-ScheduledTask -TaskName DSHMetaphysicsAutopublish`
  - 删除：`Unregister-ScheduledTask -TaskName DSHMetaphysicsAutopublish -Confirm:$false`
- **入口**：`tools/autopublish.cmd` → `tools/autopublish.mjs`（也可手动 `node tools/autopublish.mjs`）。
- **配置**：`~/.dsh/metaphysics-autopublish.json`（`npmToken` / `githubUser` / `githubToken`，ACL 只留当前用户；不入库）。
- **判定**：对 `package.json`、`index.js`、`engine/`、`src/`、`locale/`、`cordis.patch.yml`、`icon.svg`、两个构建脚本做 SHA-1 指纹，与上次成功发布时保存的指纹比较。
  - 指纹一致 → **静默退出**：不打印、不提交、不推送、不发布；
  - 指纹有变 → 七道闸 → 重建 `client.js` / `命理排盘.html` → 需要时补丁升版 → `git commit` + push `main` + 打 tag → `npm publish` → 核对 tarball → 写回指纹；
  - 若 npm 上已经是当前版本、工作区干净且提交已推送（外部手动发过）→ 只补记指纹，静默退出。
- **状态与日志**：`.autopublish-state.json`（基线指纹）、`.autopublish.lock`（防并发）、`tools/.autopublish.log`（改动/错误日志）；三者都已 gitignore。
- **手动演练**：`node tools/autopublish.mjs --dry-run`（只报告会做什么）、`--init`（重置基线）、`--force`（忽略指纹强制发一版）。
- **前置**：`git` 用 DSH 自带的 bash-ipc 里的 git.exe（脚本自动找），npm 用当前 node 目录下的 `npm-cli.js`；发布失败时脚本不更新指纹，下一轮会重试。
