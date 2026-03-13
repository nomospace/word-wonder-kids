#!/bin/bash
# deploy.sh - 静态化部署脚本
# 用法：
#   ./deploy.sh              # 构建并部署到 GitHub Pages
#   ./deploy.sh --local      # 本地预览
#   ./deploy.sh --skip-build # 只推送代码

set -e

MODE=${1:-"--deploy"}
MESSAGE=${2:-"🦞 deploy $(date +%Y-%m-%d_%H:%M)"}

cd "$(dirname "$0")"

echo "🚀 Word Wonder Kids 部署工具"
echo "=============================="
echo ""

case "$MODE" in
  --local)
    echo "📱 本地预览模式"
    echo ""
    cd app
    if [ ! -d "dist/word-wonder-h5" ]; then
      echo "🔨 首次构建..."
      npm run build
    fi
    echo "🌐 启动本地服务器..."
    echo "   访问：http://localhost:3000"
    echo "   Ctrl+C 停止"
    echo ""
    npx serve dist/word-wonder-h5 -l 3000
    ;;

  --skip-build)
    echo "📤 仅推送代码..."
    git add -A
    git commit -m "$MESSAGE" || echo "⚠️  没有需要提交的更改"
    
    for i in $(seq 1 5); do 
      echo "=== 尝试 $i/5 ==="
      if git push origin main 2>&1; then
        echo "✅ 推送成功!"
        break
      else
        echo "❌ 失败，等待 2 秒后重试..."
        sleep 2
      fi
    done
    echo ""
    echo "✅ 代码已推送！"
    echo "📱 GitHub Pages: https://nomospace.github.io/word-wonder-kids/"
    ;;

  --deploy|*)
    echo "🔨 步骤 1/4: 构建静态文件..."
    cd app
    npm run build
    cd ..
    
    echo ""
    echo "📋 步骤 2/4: 运行预检..."
    if [ -f "pre-commit.sh" ]; then
      ./pre-commit.sh
    fi
    
    echo ""
    echo "📝 步骤 3/4: 提交构建产物..."
    git add -A
    git commit -m "$MESSAGE" || echo "⚠️  没有需要提交的更改"
    
    echo ""
    echo "📤 步骤 4/4: 推送到 GitHub..."
    for i in $(seq 1 5); do 
      echo "=== 尝试 $i/5 ==="
      if git push origin main 2>&1; then
        echo "✅ 推送成功!"
        break
      else
        echo "❌ 失败，等待 2 秒后重试..."
        sleep 2
      fi
    done
    
    echo ""
    echo "=============================="
    echo "✅ 部署完成！"
    echo ""
    echo "📱 访问地址："
    echo "   https://nomospace.github.io/word-wonder-kids/"
    echo ""
    echo "📊 查看构建状态："
    echo "   https://github.com/nomospace/word-wonder-kids/actions"
    echo ""
    echo "💡 提示："
    echo "   ./deploy.sh --local    # 本地预览"
    echo "   ./deploy.sh --skip-build  # 只推送代码"
    ;;
esac
