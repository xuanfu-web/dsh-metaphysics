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

## 四、提交状态（2026-10-22）

- **PR**：https://github.com/awesome-dsh-plugin/awesome-dsh-plugin/pull/8517 （`open`，单文件 `data/plugins/xuanfu-web__dsh-metaphysics.yml`）
- **CI**：`Submission gate` 首轮失败，原因只有一条 `repository is 0.0 days old (needs 1)`；仓库创建已满一天，该检查重跑后应转绿
- **卡点（本机）**：
  1. 用于建仓/推送的临时令牌已按约删除（API 401）
  2. 本机到 `github.com:443` 的 git 连接间歇失败（`Could not connect to server`），`api.github.com` 正常
- **待办**：本地 `main` 比 `origin/main` 多 16 个提交（0.5.0 → 0.13.4），推送后市场侧安装到的才是新版；条目描述已在 PR 分支更新

## 五、本地同步（已完成）

桌面 profile 以软链方式引用本目录，源码改动即时生效：

- `~/.dsh/profiles/desktop/package.json` → `"dsh-metaphysics": "link:<本目录>"`
- `~/.dsh/profiles/desktop/node_modules/dsh-metaphysics` → 指向本目录的符号链接
- `~/.dsh/profiles/desktop/cordis.patch.yml` 已启用 `dsh-metaphysics`

改了 `client.js`（浏览器端产物）之后，刷新页面即可；无需重装。
