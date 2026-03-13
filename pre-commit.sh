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

# 4. E2E 测试（可选，设置 SKIP_E2E=1 可跳过）
cd ..
if [ "$SKIP_E2E" != "1" ]; then
  echo ""
  echo "🧪 运行 E2E 测试..."
  
  # 检查 Playwright 是否安装
  if [ ! -d "node_modules/@playwright" ]; then
    echo "⚠️  Playwright 未安装，正在安装..."
    cd app
    npm install -D @playwright/test
    npx playwright install --with-deps
    cd ..
  fi
  
  # 检查是否有正在运行的开发服务器
  if curl -s http://localhost:4200 > /dev/null 2>&1; then
    echo "📡 检测到开发服务器正在运行，使用现有服务器"
    cd app
    npx playwright test --reporter=list
    cd ..
  else
    echo "🚀 启动临时开发服务器..."
    cd app
    npm start &
    SERVER_PID=$!
    
    # 等待服务器启动
    echo "⏳ 等待服务器启动..."
    for i in {1..30}; do
      if curl -s http://localhost:4200 > /dev/null 2>&1; then
        echo "✅ 服务器已启动"
        break
      fi
      sleep 1
    done
    
    # 运行测试
    npx playwright test --reporter=list
    TEST_EXIT_CODE=$?
    
    # 停止服务器
    echo "🛑 停止开发服务器..."
    kill $SERVER_PID 2>/dev/null || true
    
    cd ..
    
    if [ $TEST_EXIT_CODE -ne 0 ]; then
      echo "❌ E2E 测试失败，请修复后重新提交"
      exit 1
    fi
  fi
  
  echo "✅ E2E 测试通过"
else
  echo "⏭️  跳过 E2E 测试（SKIP_E2E=1）"
fi

echo ""
echo "✅ 所有检查通过！可以提交代码了"
echo ""
echo "💡 提示：使用以下命令提交"
echo "   git add -A"
echo "   git commit -m \"feat: 描述你的改动\""
echo ""
echo "💡 提示：如需跳过 E2E 测试，设置环境变量 SKIP_E2E=1"
echo ""
