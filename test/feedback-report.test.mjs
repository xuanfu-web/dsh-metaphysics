// 反馈入口：报告必须带齐「开发者要复现的那几项」，且不能夹带隐私。
//
// 为什么要专门测它：反馈里最缺的从来不是意见，是复现信息。少了版本、开关状态或输入，
// 开发者就得来回问几轮，多数人第三轮就不回了。这里把报告的结构钉住，
// 顺带钉住「不许带本机命盘档案 / 设备信息」这条边界。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ok } from './_harness.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const appSrc = fs.readFileSync(path.join(root, 'src', 'app.js'), 'utf8');

// ── 一、报告生成器把该带的信息都带上了（静态结构断言）────────────────
const start = appSrc.indexOf('const feedbackReport = ()');
const end = appSrc.indexOf('const copyFeedbackReport =');
ok('反馈报告生成器存在', start > 0 && end > start, `${start}/${end}`);
const body = appSrc.slice(start, end);

ok('报告包含版本号', body.includes('__MP_VER'));
ok('报告包含未发版改动计数（版本号相同时也能判断产物新旧）', body.includes('__MP_UNRELEASED'));
ok('报告包含体系', body.includes("'- 体系：'"));
ok('报告包含所问之事与询问方向', body.includes('所问之事') && body.includes('询问方向'));
ok('报告包含出生日期/时刻/性别', body.includes('日期：') && body.includes('时刻：') && body.includes('性别：'));
ok('报告包含真太阳时与晚子时开关', body.includes('真太阳时：') && body.includes('晚子时换日：'));
ok('报告包含结果摘要', body.includes('结果摘要'));
ok('报告包含排盘句柄（可精确复现同一张盘）', body.includes('handle'));
ok('报告包含报错原文一节', body.includes('报错原文'));
ok('报告包含三条联系渠道', body.includes('issues') && body.includes('1129440028@qq.com') && body.includes('dsh-metaphysics'));

// 体系与方向要翻成中文：用户看不懂 bazi / career 这种内部值
ok('体系名走 TABS 的中文标签', body.includes('TABS.find') && body.includes('label'));
ok('询问方向走 Engine.DIRECTIONS 的中文标签', body.includes('Engine.DIRECTIONS'));

// ── 二、隐私边界：不读本机档案、不带设备信息 ─────────────────────────
ok('不读 localStorage 里的命盘档案', !/localStorage|storeGet\(|profilesLoad/.test(body));
ok('不采集设备/浏览器信息', !/userAgent|navigator\.platform|screen\.|devicePixelRatio/.test(body));
ok('不带安装路径', !/__dirname|process\.cwd|absolutePath/.test(body));

// ── 三、入口在面板里是常驻的，不是只在报错时出现 ─────────────────────
ok('反馈入口渲染在面板主区域（不是错误分支内）', appSrc.includes("className: 'mp-fb'"));
ok('反馈区有「复制反馈报告」按钮', appSrc.includes('复制反馈报告'));
ok('反馈区有「开 issue」按钮', appSrc.includes('开 issue'));
ok('反馈区不设显眼的邮件按钮（邮箱只在底部小字，别催人反馈）',
  !appSrc.includes("'发邮件'") && !/openFeedbackMail/.test(appSrc));
ok('底部邮箱是 mailto 链接且有「有疑问？」邀请语（可发现但不打扰）',
  appSrc.includes('有疑问？') && /href: 'mailto:1129440028@qq\.com/.test(appSrc));
ok('开 issue 前先复制报告（用户直接粘）',
  /const openFeedbackIssue = \(\) => \{[\s\S]{0,200}copyFeedbackReport\(\)/.test(appSrc));
ok('issue 标题带体系名与「报错/使用问题」区分',
  /issues\/new\?title=/.test(appSrc) && appSrc.includes('：报错') && appSrc.includes('：使用问题'));

// ── 四、复制失败有退路（旧宿主没有 clipboard API）────────────────────
ok('优先用 navigator.clipboard', body !== '' && appSrc.includes('navigator.clipboard'));
ok('没有 clipboard 时退回 execCommand', appSrc.includes('execCommand') && appSrc.includes("'copy'"));
ok('复制失败会提示改走导出 .md', appSrc.includes('可改用「导出 .md」'));

// ── 五、报告是纯文本 Markdown（能直接粘进 issue / 邮件）────────────
ok('报告以 Markdown 标题开头', body.includes("'# 命理插件反馈'"));
ok('报告给用户留了填写位置', body.includes('我遇到的情况'));
ok('报告不生成 HTML（避免粘进 issue 后变乱）', !/<div|<span|innerHTML/.test(body));

// ── 六、文案不越界：不承诺预测效度 ─────────────────────────────────
ok('联系渠道措辞不提「预测准确」', !/准确率|预测准确|一定准/.test(body));
