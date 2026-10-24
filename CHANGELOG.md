# 更新记录

版本按「一组可感知的改动」发，README 与市场条目描述随能力同步。

## 0.14.1 —— 先让「通过」可信

这一版不加新体系，只补三件会静默出错的地基：测试的失败信号、渲染层的转义、入参的拒绝。

- **测试不再假绿**：`test/_harness.mjs` 统一断言，任何一条 FAIL 都让进程非零退出。此前 bazi / calendar / liuyao / lunar / shensha / tarot / ziwei / e2e / layout 九个文件只 `console.log`，断言写错也 exit 0，`npm test` 恒报 27/27
  - `tools/check-assertions.mjs`：每个文件的 PASS 条数锁进 `test/assertion-baseline.json`，删断言即失败（`npm run test:baseline` 显式重建）
  - `tools/verify-tests-can-fail.mjs`：故意写错一条断言，必须变红——保护「测试本身」
- **两处 XSS**：塔罗面板的「所问」与解读段落回显（`src/panel-kit.js`）、独立页错误提示（`src/web-ui.js`）此前把用户原文拼进 `innerHTML`；现改为 `esc()` 与 `textContent`，并加 `test/security.test.mjs` 回归
- **入参校验与错误码**：`compute()` 新增 `E_INPUT / E_RANGE / E_LINES / E_COUNT / E_ASOF / E_PARTNER / E_SYSTEM`
  - 日期按月份天数与闰年校验（`1990-02-30`、`2026-04-31` 不再静默滚到下个月）
  - `bazi / ziwei / hepan` 的 gender 改为必填（缺省按男命排会让大运/大限方向整个反掉）
  - 六爻爻数 ≠ 6 时报错（不再悄悄换成随机卦）；塔罗张数非 1/3/5 时报错；`asOf` 非法时报错（不再静默用「此刻」）
  - 工具层 `execute()` 统一包上 `[错误码]` 前缀，内部异常不再以堆栈式文案直出
- 测试新增 `test/args.test.mjs`（40 条）、`test/security.test.mjs`（10 条），全量 29 个文件 823 条 PASS
- CI 增加「断言数不低于基线」与「测试自检」两步

## 0.14.0 —— 奇门、合盘与节气精度（此前只存在于工作树，本版一并落库）

- 新增**奇门遁甲**（时家转盘：拆补 / 超神接气 / 置闰三派取局、值符值使、九宫、空亡驿马）与对应解读
- 新增**合盘**：八字合盘（日主关系 / 夫妻宫 / 五行互补）与紫微合盘（命宫、夫妻宫、五行局）
- 节气计算改用 **VSOP87B 截断级数 + 岁差 + 章动 + 光行差**，与 NAOJ 历要项对拍偏差降到 1 分钟内
- `parseDateTime` 对 ΔT 覆盖范围（1900–2100）之外的年份给出精度提示，摘要顶部标 ⚠
- `geocodeAddress` 支持地址更细时联网（Nominatim）兜底，失败退回内置坐标表
- 六壬补神煞与格局文案；紫微补流月/流日/流时并接入盘面与解读
- `tools/qimen-divergence.mjs`：枚举三派取局的分裂样本，供排盘差异核对

## 0.13.6

- 修 `npm run release` 的发布后核对：npm 的发布是异步的（PUT 返回 202，registry 生效实测要 1–4 分钟），脚本原来 30 秒就判定失败
  - 改为对 tarball 轮询 HEAD，最多等 6 分钟；超时只提示「已提交，稍后自查」而不报错
  - 顺手核对 `dist-tags`，`latest` 不指向新版本时给出 `npm dist-tag add` 的建议

## 0.13.5

- 新增 `npm run release`（`tools/release.mjs`）：一条命令走完「测试 → 构建 → 校验产物 → 发 npm」，token 只从环境变量 `NPM_TOKEN` 读，临时 `.npmrc` 用后即删
  - 发布前会拦下三种情况：git 工作区不干净、`client.js` 与源码不同步、registry 上已有同版本
  - `-- --dry-run` 只跑到校验；本机没装 npm CLI 时用 `NPM_CLI=/path/to/npm-cli.js` 指定

## 0.13.4

- 新增 `npm run build` / `npm run build:html` / `npm test`：`tools/test-all.mjs` 顺序跑完 20 个测试文件并汇总退出码，省掉手敲一长串 `node test/*.mjs`
- `daliuren` / `meihua` 两处旧测试统一成 `PASS/FAIL` 计数风格（此前只打印 `all pass`，CI 里数不出断言数）
- 补 `CHANGELOG.md`；`engines.node` 声明 `>=18`；SUBMIT 文档补提交状态与阻塞说明
- 新增 GitHub Actions（`.github/workflows/test.yml`）：先构建并校验 `client.js` 与源码一致，再跑全部回归

## 0.13.3

- **工具层打通「解析与详解」**：`compute()` 把 `question` / `direction` 透传给 `interpret()`；工具 schema 新增 `withInterpret`、`direction`（综合/财运/事业/感情/健康/学业/出行）与 `asOf`（流月流日流时的基准时刻）；`renderText()` 在带解析时附上解析正文与免责声明
- 修 `layout` 测试沿用旧类名 `.pn`（0.13.2 已改 `.ft-pn`）导致的假失败
- 未知体系报错改为列出六种体系（原文案仍写着「紫微斗数尚未接入」）
- `package.json` 补 `author` / `repository` / `homepage` / `bugs`；中英文案重写
- 市场条目描述同步到当前能力（主星庙旺、流月流日流时、解析）
- README 注明真太阳时只按经度修正、未含历史时区与夏令时

## 0.13.2

- 叶子类名按语义补前缀（`bz-` / `dt-` / `flow-` / `ft-` / `ct-` / `hb-` / `ss-` / `ask-` 等 192 处），消除泛词类名复用隐患

## 0.13.1

- 修三个潜伏的结构性缺陷：孤立「身」角标残骸、解析详解块调色板失效、320px 下六爻盘横向溢出
- 打印时折叠的详解自动展开；宫格补 `aria-expanded` 同步

## 0.13.0

- 八字四柱表按专业排盘版式重排（四列并排、无竖线、干支大字、十神分组着色、藏干逐行）
- 末行新增五行旺相休囚死；修 `td.big` 选择器长期失效

## 0.12.0

- 紫微补流月 / 流日 / 流时（斗君逐级下推），接入盘面与解读

## 0.11.0

- 深色主题（盘面颜色全变量化）、存为 PDF / 打印、修 390px 下塔罗 tab 被裁

## 0.10.0

- 紫微宫位可点击展开详情、三方四正联动；修「身宫整格消失」的类名撞车

## 0.9.0

- 紫微十四主星加庙旺得利平不陷亮度标注；塔罗面板可选 1/3/5 张牌阵

## 0.8.x

- 0.8.0 起卦 tab 新增「所问之事 + 询问方向」，解读按问题展开；解析区可折叠
- 0.8.1 紫微解读补化科、流年四化不再截断
- 0.8.2 手机竖屏紫微盘恢复 4×4 宫盘
- 0.8.3 竖屏布局改用容器查询，修窄侧栏下盘面挤成一团

## 0.7.0

- 新增「解析与详解」模块：五维度解析、卦象卦辞爻辞动爻、塔罗连贯解读，带免责提示

## 0.6.0

- 六爻 / 梅花 / 六壬面板重绘（真爻线、体用标注、天地盘方盘）；输入区区分出生时间与起卦时刻

## 0.5.0

- 八字 42 神煞（七类、双查法）+ 格局 / 用神 / 大运流年评分
- 紫微 34 格局、大限一览、流年四化
- 塔罗模块重写：78 张牌、牌阵位义、6–8 段解读、体系声明
- 首个进入插件市场投稿流程的版本（awesome-dsh-plugin PR）
