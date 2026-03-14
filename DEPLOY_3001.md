# 🦋 Word Wonder Kids - 部署说明

## ✅ 部署完成

**访问地址**: http://localhost:3001

**部署时间**: 2026-03-14 15:11

---

## 📝 Nginx 配置

配置文件位置：`/etc/nginx/conf.d/word-wonder-kids.conf`

```nginx
server {
    listen 3001;
    server_name _;
    root /var/www/word-wonder-kids/browser;
    index index.html;

    # SPA 路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 禁止访问隐藏文件
    location ~ /\. {
        deny all;
    }
}
```

---

## 🚀 部署步骤

### 1. 构建项目

```bash
cd /home/admin/.openclaw/workspace/word-wonder-kids/app
npm run build
```

构建产物位置：
```
/home/admin/.openclaw/workspace/word-wonder-kids/app/dist/word-wonder-h5/browser/
```

### 2. 部署文件

```bash
# 创建部署目录
sudo mkdir -p /var/www/word-wonder-kids

# 同步文件
sudo cp -r ./dist/word-wonder-h5/browser/* /var/www/word-wonder-kids/

# 设置权限
sudo chown -R nginx:nginx /var/www/word-wonder-kids
sudo chmod -R 755 /var/www/word-wonder-kids
```

### 3. 配置 Nginx

```bash
sudo tee /etc/nginx/conf.d/word-wonder-kids.conf > /dev/null << 'EOF'
server {
    listen 3001;
    server_name _;
    root /var/www/word-wonder-kids/browser;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF
```

### 4. 重载 Nginx

```bash
sudo nginx -t && sudo nginx -s reload
```

### 5. 验证部署

```bash
# 检查 HTTP 状态码
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001

# 查看页面内容
curl http://localhost:3001 | head -20
```

---

## 📊 访问地址

| 页面 | 地址 |
|------|------|
| 首页 | http://localhost:3001 |
| 学习 | http://localhost:3001/learn |
| 游戏 | http://localhost:3001/game |
| 进度 | http://localhost:3001/progress |
| 设置 | http://localhost:3001/settings |

---

## 🔧 端口配置

### 当前配置
- **端口**: 3001
- **协议**: HTTP
- **路由**: Angular SPA (try_files)

### 如需修改端口

1. 编辑 Nginx 配置：
```bash
sudo vim /etc/nginx/conf.d/word-wonder-kids.conf
```

2. 修改 `listen` 端口：
```nginx
listen 3001;  # 改为其他端口，如 8081
```

3. 重载 Nginx：
```bash
sudo nginx -t && sudo nginx -s reload
```

---

## 🐛 常见问题

### Q: 403 Forbidden？
**A**: 检查文件权限和目录结构，确保 root 指向正确的 browser 目录

### Q: 页面 404？
**A**: 检查 Nginx 配置中的 `root` 路径是否正确

### Q: 刷新后 404？
**A**: 确保配置了 `try_files $uri $uri/ /index.html`

### Q: 静态资源加载失败？
**A**: 检查文件权限和缓存配置

---

## 📦 构建产物结构

```
dist/word-wonder-h5/
└── browser/
    ├── index.html
    ├── main.js
    ├── polyfills.js
    ├── styles.css
    ├── 3rdpartylicenses.txt
    └── *.js (lazy chunks)
```

---

## 🔗 相关文档

- [项目 README](README.md)
- [部署指南](DEPLOY.md)
- [CI 配置](CI_SETUP.md)
- [测试文档](TESTING.md)

---

_最后更新：2026-03-14 15:11_
