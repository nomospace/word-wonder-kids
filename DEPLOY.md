# 🚀 静态部署指南

## 一键构建

```bash
cd app
npm run build
```

构建产物：`app/dist/word-wonder-h5/`

## 部署方式

### 方案 1：GitHub Pages（推荐，免费）

```bash
# 安装 gh-pages
npm install -g gh-pages

# 部署
cd app
npm run build
gh-pages -d dist/word-wonder-h5
```

访问：`https://nomospace.github.io/word-wonder-kids/`

### 方案 2：Vercel / Netlify

1. 连接 GitHub 仓库
2. 设置构建目录：`app/dist/word-wonder-h5`
3. 自动部署

### 方案 3：本地测试

```bash
# 方式 A：npx serve（推荐）
npx serve app/dist/word-wonder-h5

# 方式 B：Python
cd app/dist/word-wonder-h5
python3 -m http.server 8080

# 方式 C：Node.js lite-server
npx lite-server --baseDir="dist/word-wonder-h5"
```

### 方案 4：Nginx（生产环境）

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/word-wonder-h5;
    index index.html;

    # SPA 路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|svg|ico)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 📦 持久化说明

**数据存在哪？** → 用户浏览器的 localStorage

**存什么？**
- `wwk_currentGradeId` - 当前选择的年级
- `wwk_learningProgress` - 学习进度（掌握程度、正确率等）

**优点：**
- ✅ 无需后端服务器
- ✅ 离线可用
- ✅ 零成本
- ✅ 隐私安全（数据不上传）

**局限：**
- 换设备/清缓存会丢失数据
- 如需跨设备同步，后续可加后端 API

## 自动化部署脚本

```bash
# 使用 deploy.sh
./deploy.sh
```
