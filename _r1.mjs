import fs from 'node:fs';

// 1) package.json
let pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.version = '0.70.0';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
console.log('pkg', pkg.version);

// 2) CHANGELOG 头
let c = fs.readFileSync('CHANGELOG.md', 'utf8');
const lines = c.split('\n');
if (lines[0].trim() === '## 未发布') {
  lines[0] = '## 0.70.0（2026-11-12，已发布）';
}
c = lines.join('\n');
c = c.replace('> 本段主题：太乙补齐——月日时三计、八种格局、定目三基五福十精、古法吉凶与神将判辞',
  '> 本段主题：太乙补齐五层');
fs.writeFileSync('CHANGELOG.md', c);
console.log('head:', c.split('\n').slice(0, 3).join(' | '));
