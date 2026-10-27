# 收录到 dsh-market 插件市场（awesome-dsh-plugin）

插件市场（dsh-market）的条目并不自建目录，它从
[awesome-dsh-plugin/awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) 的
`data/plugins/*.yml` 自动同步。所以「上架」= 一个 PR，只加**一个文件**，不改 README。

前置条件（本包已满足）：

- `package.json` 里有 `dsh.bundle`（`./cordis.patch.yml`）——决定能否 `dsh plugin add` 安装
- `package.json` 有 `dsh.client`（web 平台）
- 仓库公开可读

## 一、条目文件

路径：`data/plugins/<owner>__<repo>.yml`，例如 owner 与 repo 同名时是 `data/plugins/你的名字__dsh-metaphysics.yml`
（**文件名与 url 必须与仓库完全一致**）。

```yaml
url: https://github.com/xuanfu-web/dsh-metaphysics
name: xuanfu-web/dsh-metaphysics
category: ui
description:
  en: 'Divination panel and agent tool: BaZi with 42 shensha plus pattern, useful-god and luck scoring; Zi Wei Dou Shu with 34 patterns, da-xian and annual mutagen; LiuYao, MeiHua YiShu, Da Liu Ren and Tarot, all computed locally.'
  zh: '命理排盘：八字 42 神煞并给出格局、用神与大运流年吉凶评分；紫微斗数 34 格局、大限与流年四化；另有六爻、梅花易数、大六壬与塔罗，全部本地计算。'
```

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

## 四、提交状态（2026-10-27 更新）

- **PR**：https://github.com/awesome-dsh-plugin/awesome-dsh-plugin/pull/9854 （open，把条目描述更新为十八套体系并加上「玄学」关键词；原 PR #8517 已于 2026-10-22 合并；0.19.0 发布后条目描述已含公农历互转）
- **CI**：`Submission gate` 首轮失败，原因只有一条 `repository is 0.0 days old (needs 1)`；仓库创建已满一天，该检查重跑后应转绿
- **已发布**：npm `dsh-metaphysics@0.22.0`（`dist-tags.latest = 0.22.0`，registry 已核对；git tag `v0.22.0`、GitHub Release latest `v0.22.0`、桌面 profile 已升到 0.22.0；0.22.0 新增《穷通宝鉴》120 格用神与原文摘句）；发布命令：
  `node <dsh>/dsh-runtimes/dsh-primary-runtime/dependencies/pnpm/bin/pnpm.cjs publish --no-git-checks`
  token 走临时 `.npmrc`（0600），发布后立即删除
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
