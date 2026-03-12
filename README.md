# Word Wonder Kids 🦞

> 二年级英语单词学习 APP - 游戏化背单词，好玩不枯燥

## 📱 项目介绍

专为二年级孩子设计的英语单词学习应用，通过游戏化方式帮助孩子记住核心英语单词（颜色、动物、文具、数字等），支持认读、跟读、拼写练习。

## ✨ 核心功能

- 🎴 **单词卡片** - 图文 + 发音 + 例句，点击即学
- 🎮 **游戏化练习** - 连连看、听音选图、填字母闯关
- 🏆 **成就系统** - 贴纸勋章激励，孩子更有动力
- 📊 **进度追踪** - 家长可查看学习报告和薄弱单词
- ⏰ **防沉迷** - 单次 10 分钟提醒，每日上限可调节
- 📴 **离线使用** - 下载单词包后无需网络

## 🏗️ 技术栈

- **语言**: Kotlin
- **最低版本**: Android 7.0 (API 24)
- **架构**: MVVM
- **发音**: Android TTS / 内置音频
- **存储**: Room Database

## 📦 项目结构

```
app/
├── src/main/java/com/nomospace/wordwonderkids/
│   ├── ui/           # 界面层 (Activity, Fragment, Compose)
│   ├── data/         # 数据层 (Repository, DAO, Model)
│   ├── domain/       # 业务逻辑 (UseCase)
│   └── util/         # 工具类 (TTS, Audio, Preferences)
├── src/main/res/     # 资源文件 (布局、图片、音频)
└── build.gradle.kts
```

## 🚀 快速开始

### 环境要求
- Android Studio Hedgehog 或更高版本
- JDK 17+
- Android SDK 24+

### 构建步骤

#### 方式一：Android Studio（推荐）
1. 克隆项目
```bash
git clone https://github.com/nomospace/word-wonder-kids.git
cd word-wonder-kids
```

2. 用 Android Studio 打开项目

3. 同步 Gradle 依赖

4. 连接设备或启动模拟器，运行 APP

#### 方式二：命令行
```bash
# 构建 Debug 版本
./gradlew assembleDebug

# 构建 Release 版本（未签名）
./gradlew assembleRelease

# APK 输出位置
# Debug: app/build/outputs/apk/debug/app-debug.apk
# Release: app/build/outputs/apk/release/app-release-unsigned.apk
```

#### 方式三：GitHub Actions（自动打包）
- 每次 push 自动构建
- 访问：https://github.com/nomospace/word-wonder-kids/actions
- 下载最新构建的 APK

📖 详细签名指南见 [KEYSTORE_GUIDE.md](KEYSTORE_GUIDE.md)

## 📚 单词库

覆盖主流教材（人教 PEP、外研版）二年级核心单词约 150 个：
- 颜色 (colors): red, blue, green, yellow...
- 动物 (animals): cat, dog, elephant, panda...
- 文具 (school): pencil, ruler, book, bag...
- 数字 (numbers): one to twenty
- 日常用品 (daily): cup, bed, door, window...

## 👨‍👩‍👧 家长控制

- 设置每日学习时长上限
- 查看学习进度报告
- 自定义练习单词
- 无广告、无付费弹窗（需家长验证）

## 📄 许可证

MIT License

---

Made with 🦞 by nomospace
