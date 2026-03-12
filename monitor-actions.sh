#!/bin/bash
# GitHub Actions 构建监控脚本

REPO="nomospace/word-wonder-kids"
WORKDIR="/home/admin/.openclaw/workspace/word-wonder-kids"
MAX_ATTEMPTS=5
ATTEMPT=0
LAST_RUN_ID=""

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

get_latest_run() {
    cd "$WORKDIR"
    gh run list --repo "$REPO" --limit 1 --json databaseId,status,conclusion,headBranch,createdAt --jq '.[0]'
}

get_run_logs() {
    local run_id=$1
    cd "$WORKDIR"
    gh run view "$run_id" --log 2>/dev/null || gh api "/repos/$REPO/actions/runs/$run_id/jobs" --jq '.jobs[] | {name: .name, conclusion: .conclusion, steps: .steps[] | select(.conclusion == "failure")}'
}

analyze_and_fix() {
    local logs="$1"
    log "分析错误日志..."
    echo "$logs" | head -100
    
    # 根据错误类型尝试修复
    if echo "$logs" | grep -qi "signing"; then
        log "检测到签名错误，检查 signing 配置..."
    elif echo "$logs" | grep -qi "keystore"; then
        log "检测到 keystore 错误..."
    elif echo "$logs" | grep -qi "build"; then
        log "检测到构建错误..."
    fi
    
    # 返回是否需要修复
    return 0
}

log "🦞 开始监控 $REPO 的 GitHub Actions 构建..."

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
    ATTEMPT=$((ATTEMPT + 1))
    log "第 $ATTEMPT 次检查 (最大 $MAX_ATTEMPTS 次)"
    
    RUN_INFO=$(get_latest_run)
    RUN_ID=$(echo "$RUN_INFO" | jq -r '.databaseId')
    STATUS=$(echo "$RUN_INFO" | jq -r '.status')
    CONCLUSION=$(echo "$RUN_INFO" | jq -r '.conclusion')
    
    log "Run ID: $RUN_ID, Status: $STATUS, Conclusion: $CONCLUSION"
    
    if [ "$STATUS" = "completed" ]; then
        if [ "$CONCLUSION" = "success" ]; then
            log "✅ 构建成功！任务完成。"
            exit 0
        elif [ "$CONCLUSION" = "failure" ] || [ "$CONCLUSION" = "cancelled" ]; then
            log "❌ 构建失败，开始分析..."
            LOGS=$(get_run_logs "$RUN_ID")
            analyze_and_fix "$LOGS"
            
            # 如果有修复，提交并推送
            cd "$WORKDIR"
            if git diff --quiet; then
                log "没有代码变更，无法触发新构建"
            else
                git add -A
                git commit -m "🔧 自动修复构建错误 (尝试 $ATTEMPT)"
                git push origin main
                log "已推送修复，等待新构建..."
                LAST_RUN_ID="$RUN_ID"
            fi
        else
            log "构建状态: $CONCLUSION"
        fi
    elif [ "$STATUS" = "in_progress" ] || [ "$STATUS" = "queued" ]; then
        log "⏳ 构建进行中，等待 60 秒..."
        sleep 60
        # 不增加 attempt，继续等待
        ATTEMPT=$((ATTEMPT - 1))
    else
        log "未知状态: $STATUS"
    fi
    
    sleep 10
done

log "⚠️ 达到最大尝试次数，停止监控"
