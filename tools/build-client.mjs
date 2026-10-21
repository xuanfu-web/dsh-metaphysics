// 把 engine/*.js 打成单个浏览器模块，供 client.js 内联使用。
// 每个模块包在独立 IIFE 里，避免顶层同名冲突（NAYIN_NAMES / PALACE_NAMES / GENERATES 等）。
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const ORDER = ['calendar', 'lunar', 'geo', 'shensha', 'geju', 'bazi', 'liuyao', 'ziwei', 'tarot', 'meihua', 'daliuren', 'index'];

export const MODULE_ORDER = ORDER;

export function buildModule(name) {
  const file = path.join(root, 'engine', `${name}.js`);
  let code = fs.readFileSync(file, 'utf8');
  const exported = new Set();

  code = code.replace(
    /^import\s*\{([\s\S]*?)\}\s*from\s*'\.\/([a-z]+)\.js';?/gm,
    (_m, names, dep) => `const { ${names.split(',').map((s) => s.trim()).filter(Boolean).join(', ')} } = __mods.${dep};`,
  );
  code = code.replace(/^export\s*\{([\s\S]*?)\};?/gm, (_m, names) => {
    for (const n of names.split(',').map((s) => s.trim()).filter(Boolean)) exported.add(n);
    return '';
  });
  code = code.replace(/^export\s+(async\s+)?(function|const|let|class)\s+([A-Za-z0-9_$]+)/gm, (_m, isAsync, kind, id) => {
    exported.add(id);
    return `${isAsync ? 'async ' : ''}${kind} ${id}`;
  });

  return `__mods.${name} = (function () {\n${code}\nreturn { ${[...exported].join(', ')} };\n})();\n`;
}

/** 生成完整 client.js 源码；tail 默认取 src/app.js */
export function assemble(tail) {
  const body = tail ?? fs.readFileSync(path.join(root, 'src', 'app.js'), 'utf8');
  const kit = fs.readFileSync(path.join(root, 'src', 'panel-kit.js'), 'utf8');
  const pkgName = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')).name;
  return `// 由 tools/build-client.mjs 生成，请勿手改。
window.__ModuleLoader__.load({
  id: '${pkgName}',
  factory(require) {
    const React = (function () {
      try { return require('react'); } catch (e) { return globalThis.React; }
    })();
    if (!React) return { inject: [], apply() {} };
    const h = React.createElement;
    const __mods = {};
${ORDER.map(buildModule).join('\n')}
    const Engine = __mods.index;
    window.Engine = Engine;
${kit}
${body}
  },
});
`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const out = assemble();
  fs.writeFileSync(path.join(root, 'client.js'), out, 'utf8');
  console.log(`client.js written: ${out.length} bytes, modules: ${ORDER.join(', ')}`);
}
