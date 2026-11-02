#!/usr/bin/env node
// 全体系冒烟：19 个 tab × 关键选项 × 边界日期，把「排盘 → 渲染 → 文本」三条链跑一遍。
//
// 逻辑都在 test/smoke-all.test.mjs 里（那里跑断言、进 CI、计入断言基线），
// 这里只做一件事：改完代码后一条命令看到结果，不必去翻 test/。
//   npm run smoke
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const r = spawnSync(process.execPath, [path.join(root, 'test', 'smoke-all.test.mjs')], { stdio: 'inherit' });
process.exit(r.status === null ? 1 : r.status);
