# 发版自动化执行记录

## 2026-11-01 23:00 — dsh-metaphysics@0.59.0

- **结果**：门禁全绿，但**未发到 npm**。本机无 `NPM_TOKEN`、无 `~/.npmrc`（无 `_authToken`），走 dry-run 分支。
- 开工时工作区有 6 个未提交改动（选中块字色对比度修复），已提交为 `3b950ef`。
- 门禁在最终 HEAD 上复核过：`check-assertions --update`（131 文件 / 6122 PASS）→ `build-client`（首屏 gzip 80628）→ `build-html`（1117.3 KB）→ `test:ci` 退出码 0，131/131 文件。产物重建零漂移。
- `npm run release -- --dry-run` 退出码 0，走完全部 5 个校验点后跳过 publish。
- 已写 `docs/发版待办.md`，明确记录「缺少 NPM_TOKEN，npm 未发布」，并附人工命令。
- **待人工**：`NPM_TOKEN=npm_xxx npm run release && npm run push:tag`；发布后把 CHANGELOG 里 0.59.0 的「待发布」改成「已发布」。
- 注意：期间树被外部进程前推了两个提交（`840c71c` 补 CHANGELOG/基线、`74679e5` 补文档），非本次操作所为；下次开工先 `git log` 对一眼，别假设 HEAD 还是自己留的那个。
