#!/bin/bash
# CI 预检脚本 - 在本地模拟 GitHub Actions 环境
# 用法：./scripts/ci-check.sh

set -e

echo "🦞 开始 CI 预检..."

cd "$(dirname "$0")/.."
APP_DIR="app"

# 1. 检查 Node 版本
echo "📌 检查 Node 版本..."
if [ -f ".nvmrc" ]; then
    EXPECTED_NODE=$(cat .nvmrc)
    CURRENT_NODE=$(node -v)
    echo "   期望：$EXPECTED_NODE | 当前：$CURRENT_NODE"
    if [[ ! "$CURRENT_NODE" =~ ^v$(echo $EXPECTED_NODE | cut -d. -f1) ]]; then
        echo "⚠️  警告：Node 版本不匹配！建议运行：nvm install"
    fi
fi

# 2. 严格模式安装依赖 (模拟 CI)
echo "📦 使用 npm ci 安装依赖 (严格模式)..."
cd "$APP_DIR"
rm -rf node_modules package-lock.json
npm install  # 生成新的 lock 文件
npm ci       # 严格验证 lock 文件

# 3. 构建检查
echo "🔨 构建检查..."
npm run build

# 4. 运行测试
echo "🧪 运行 E2E 测试..."
npm run test:e2e

echo "✅ CI 预检通过！可以安全提交"
