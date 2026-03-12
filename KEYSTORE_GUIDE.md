# 🔐 APK 签名指南

## 为什么需要签名？

Android 要求所有 APK 必须签名才能安装。未签名的 APK 只能用于测试，不能直接安装到手机。

## 方案一：使用 GitHub Actions 自动签名（推荐）

### 1. 生成本地 Keystore

在你的电脑上运行：

```bash
keytool -genkey -v -keystore word-wonder-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias word-wonder
```

按提示输入：
- 密码（记住这个密码！）
- 姓名、组织等信息

### 2. 上传到 GitHub Secrets

访问：https://github.com/nomospace/word-wonder-kids/settings/secrets/actions

添加以下 Secrets：

| Secret 名称 | 值 |
|------------|-----|
| `KEYSTORE_FILE` | 将 keystore 文件 base64 编码：`base64 word-wonder-keystore.jks` |
| `KEYSTORE_PASSWORD` | 你的 keystore 密码 |
| `KEY_ALIAS` | word-wonder |
| `KEY_PASSWORD` | 你的 key 密码（通常和 keystore 密码相同） |

### 3. 触发构建

- 每次 push 到 main 分支会自动构建
- 或者手动触发：Actions → Android CI/CD → Run workflow

### 4. 下载签名后的 APK

构建完成后，在 Actions 页面下载 `app-release-signed` artifact

## 方案二：本地签名

```bash
cd /home/admin/.openclaw/workspace/word-wonder-kids

# 生成签名密钥
keytool -genkey -v -keystore word-wonder-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias word-wonder

# 构建未签名 APK
./gradlew assembleRelease

# 签名 APK
apksigner sign --ks word-wonder-keystore.jks \
  --out app-release.apk \
  app/build/outputs/apk/release/app-release-unsigned.apk
```

## 方案三：临时测试（未签名）

直接从 GitHub Actions 下载 `app-release-unsigned` APK

**Vivo 手机安装未签名 APK：**
1. 设置 → 安全 → 允许未知来源
2. 文件管理 → 找到 APK → 安装
3. 如果提示风险，确认继续安装

## 安装到 Vivo 手机

1. 下载 APK 到手机
2. 打开「文件管理」
3. 找到 APK 文件
4. 点击安装
5. 如果提示「外部来源应用」，允许

---

**⚠️ 重要：** 保管好你的 keystore 文件！丢失后无法更新 APP！
