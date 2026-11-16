#!/bin/sh
# 提交前轻量闸：几秒能说完的那几道。全闸留给 pre-push。
# 由 tools/hooks-install.mjs 安装，__NODE__ 会被替换成本机 node 的绝对路径
# ——git 的 sh 里 PATH 不含 node，写死 `node` 会直接 command not found。
set -e

NODE="__NODE__"
if [ ! -x "$NODE" ]; then
  echo "[hooks] 找不到 node（$NODE）"
  echo "[hooks] 换机器或升级运行时后要重跑：node tools/hooks-install.mjs"
  echo "[hooks] 这次跳过检查，没拦你。"
  exit 0
fi
if [ "$SKIP_HOOKS" = "1" ]; then
  echo "[hooks] SKIP_HOOKS=1，跳过提交前检查"
  exit 0
fi

ROOT=$(git rev-parse --show-toplevel)
cd "$ROOT"

echo "[hooks] 文案闸"
"$NODE" tools/lint-copy.mjs
"$NODE" tools/verify-lint-copy.mjs

echo "[hooks] 行尾必须是 LF"
"$NODE" tools/check-eol.mjs

echo "[hooks] HTML 注入面"
"$NODE" tools/check-html-sinks.mjs

# 暂存的 js 先过一遍语法：拼错的括号不该等到全闸才发现
STAGED=$(git diff --cached --name-only --diff-filter=ACMR | grep -E '\.(m?js)$' || true)
if [ -n "$STAGED" ]; then
  echo "[hooks] 暂存 js 语法"
  for f in $STAGED; do
    [ -f "$f" ] || continue
    if ! "$NODE" --check "$f"; then
      echo "[hooks] 语法错误：$f"
      exit 1
    fi
  done
fi

echo "[hooks] 提交前检查通过，全闸留给 push 前那一道。"
