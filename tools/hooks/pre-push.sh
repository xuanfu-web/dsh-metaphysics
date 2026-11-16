#!/bin/sh
# 推送前全闸：build-client → verification → citations → build-html → 拷 docs
# → check-eol → check-bundle，再跑 200+ 个测试文件。
# 本机约半分钟；慢机用 TEST_CONCURRENCY 调并发。
set -e

NODE="__NODE__"
if [ ! -x "$NODE" ]; then
  echo "[hooks] 找不到 node（$NODE）"
  echo "[hooks] 换机器或升级运行时后要重跑：node tools/hooks-install.mjs"
  echo "[hooks] 这次跳过检查，没拦你。"
  exit 0
fi
if [ "$SKIP_HOOKS" = "1" ]; then
  echo "[hooks] SKIP_HOOKS=1，跳过推送前全闸"
  exit 0
fi

ROOT=$(git rev-parse --show-toplevel)
cd "$ROOT"

echo "[hooks] 推送前全闸，约半分钟"
"$NODE" tools/build-all.mjs --gate
echo "[hooks] 全闸通过。"
