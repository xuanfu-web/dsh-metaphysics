#!/bin/sh
# 推送前全闸。体量压到最小：真正的工作在 tools/preflight.mjs --full。
# 本机不装钩子（msys sh 起不来，会堵死 push），手动跑：
#   node tools/preflight.mjs --full
set -e

NODE="__NODE__"
if [ ! -x "$NODE" ]; then
  echo "[hooks] 找不到 node（$NODE），跳过。换运行时后重跑 node tools/hooks-install.mjs"
  exit 0
fi
if [ "$SKIP_HOOKS" = "1" ]; then
  echo "[hooks] SKIP_HOOKS=1，跳过推送前全闸"
  exit 0
fi

cd "$(git rev-parse --show-toplevel)"
exec "$NODE" tools/preflight.mjs --full
