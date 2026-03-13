#!/bin/bash
# pre-commit.sh - 本地预检脚本
# 用法：./pre-commit.sh

set -e

echo "🔍 运行本地检查..."
echo ""

# 进入 app 目录
cd app

# 1. 检查依赖
echo "📦 检查依赖..."
if [ ! -d "node_modules" ]; then
  echo "⚠️  node_modules 不存在，正在安装..."
  npm install
fi

# 2. Lint 检查
echo "🔎 运行 Lint 检查..."
if npm run lint --if-present; then
  echo "✅ Lint 通过"
else
  echo "❌ Lint 失败，请修复后重新提交"
  exit 1
fi

# 3. 构建测试
echo "🔨 运行构建测试..."
if npm run build; then
  echo "✅ 构建成功"
else
  echo "❌ 构建失败，请修复后重新提交"
  exit 1
fi

# 4. 返回根目录
cd ..

echo ""
echo "✅ 所有检查通过！可以提交代码了"
echo ""
echo "💡 提示：使用以下命令提交"
echo "   git add -A"
echo "   git commit -m \"feat: 描述你的改动\""
echo ""
