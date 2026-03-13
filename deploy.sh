#!/bin/bash
# deploy.sh - 快速部署脚本
# 用法：./deploy.sh "提交信息"

set -e

MESSAGE=${1:-"chore: auto deploy $(date +%Y-%m-%d)"}

echo "🚀 开始部署流程..."
echo ""

# 1. 运行预检
echo "📋 运行预检..."
if [ -f "pre-commit.sh" ]; then
  ./pre-commit.sh
else
  echo "⚠️  pre-commit.sh 不存在，跳过预检"
fi

# 2. 提交更改
echo "📝 提交更改..."
git add -A
git commit -m "$MESSAGE" || echo "⚠️  没有需要提交的更改"

# 3. 推送（带重试）
echo "📤 推送到 GitHub..."
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
echo "✅ 部署完成！"
echo ""
echo "📱 访问地址："
echo "   https://nomospace.github.io/word-wonder-kids/"
echo ""
echo "📊 查看构建状态："
echo "   https://github.com/nomospace/word-wonder-kids/actions"
echo ""
