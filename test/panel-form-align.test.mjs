// 面板输入区对齐：侧栏宽度 ≠ 窗口宽度，降列要按容器；select/input 盒模型要统一；勾选行不能嵌套 .mp-field。
// 实测依据（无头 Chrome，面板 600/940px）：旧样式下 input 实高 50px、select 36px，底对齐后性别下拉低 14px；
// 「晚子时换日」因嵌套 .mp-field.mp-checks 继承 margin-top:13px，比同行勾选低 7px。
import fs from 'node:fs';
import { ok } from './_harness.mjs';

const src = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
const css = (src.match(/const CSS = `([\s\S]*?)`;/) || [])[1] || '';
ok('取到面板 CSS', css.length > 1000, String(css.length));

const rule = (sel) => (css.match(new RegExp(`(?:^|\\n)${sel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\{([^}]*)\\}`)) || [])[1] || '';
ok('输入框统一 border-box', /box-sizing:border-box/.test(rule('.mp-input')), rule('.mp-input').slice(0, 80));
ok('多行框统一 border-box', /box-sizing:border-box/.test(rule('.mp-textarea')), rule('.mp-textarea').slice(0, 80));
ok('外壳声明容器', /container-type:inline-size/.test(rule('.mp-wrap')), rule('.mp-wrap'));
ok('860px 容器降两列', /@container \(max-width:860px\)\{\s*\.mp-row\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)\}/.test(css));
ok('480px 容器降一列', /@container \(max-width:480px\)\{\s*\.mp-row\{grid-template-columns:1fr\}/.test(css));
ok('视口媒体查询不再改输入区列数', !/@media[^{]*\{[^@]*?\.mp-row\{grid-template-columns/.test(css));
ok('交叉验证勾选独占一行', /\.mp-row>\.mp-checks\{grid-column:1\/-1;margin-top:0\}/.test(css));

const lateZiLabel = (src.match(/h\('label', \{[^}]*\},\s*h\('input', \{ type: 'checkbox', checked: lateZi[^\n]*\n?[^\n]*/) || [])[0] || '';
ok('晚子时换日与同行勾选同构', lateZiLabel.includes("'晚子时换日'") && !lateZiLabel.includes('mp-field'), lateZiLabel);
ok('晚子时换日有说明', /title: '23:00–23:59 出生时：勾选=按次日日柱起时柱；不勾=仍用当日日柱'/.test(src));
ok('勾选行里不再嵌套 mp-field', !/h\('div', \{ className: 'mp-checks' \},[\s\S]{0,400}?className: 'mp-field mp-checks'/.test(src));
