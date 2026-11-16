#!/bin/sh
# 提交前轻量闸。体量压到最小：真正的检查在 tools/preflight.mjs 里，
# 这里只负责把它叫起来。
#
# 注意：这台机器的 DSH 沙箱里 msys sh 起不来
#   fatal error - couldn't create signal pipe, Win32 error 5
# 所以本仓库默认不装钩子（装了会堵死每一次 commit）。日常请直接跑：
#   node tools/preflight.mjs
# 钩子留给 sh 正常的机器：node tools/hooks-install.mjs
set -e

NODE="__NODE__"
if [ ! -x "$NODE" ]; then
  echo "[hooks] 找不到 node（$NODE），跳过。换运行时后重跑 node tools/hooks-install.mjs"
  exit 0
fi
if [ "$SKIP_HOOKS" = "1" ]; then
  echo "[hooks] SKIP_HOOKS=1，跳过提交前检查"
  exit 0
fi

cd "$(git rev-parse --show-toplevel)"
exec "$NODE" tools/preflight.mjs
