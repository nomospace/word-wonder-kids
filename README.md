# Word Wonder Kids H5

> 儿童英语单词学习应用 - 基于 Angular 17 的 H5 版本

[![Build Status](https://github.com/nomospace/word-wonder-kids/actions/workflows/build.yml/badge.svg)](https://github.com/nomospace/word-wonder-kids/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 项目介绍

专为儿童设计的英语单词学习 Web 应用，支持 Web 和移动端设备。通过游戏化方式帮助孩子记住核心英语单词，支持认读、跟读、拼写练习。

### 核心功能

- 🎓 **年级选择** - 支持学前班到六年级
- 📖 **单词卡片** - 图文 + 发音 + 例句
- 🎮 **游戏化练习** - 连连看、听音选词、拼写挑战、单词测验
- 📈 **进度追踪** - 学习报告和掌握程度统计
- 🔊 **TTS 发音** - 浏览器原生语音合成
- 💾 **离线使用** - PWA 支持

### 技术栈

- **框架**: Angular 17+
- **语言**: TypeScript
- **状态管理**: RxJS
- **样式**: SCSS
- **发音**: Web Speech API (TTS)
- **部署**: GitHub Pages

### 单词库来源

- **Oxford 3000** - 牛津核心 3000 词
- **Dolch Sight Words** - 220 个常见英语单词
- **Fry Words** - 弗里 1000 词

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
cd app
npm install
```

### 开发模式

```bash
npm start
```

访问 http://localhost:4200

### 构建生产版本

```bash
npm run build
```

输出目录：`dist/word-wonder-h5/browser/`

## 应用预览

![App Preview](./screenshots/app-preview.png)

应用采用响应式设计，支持 Web 和移动端设备。

### 功能模块

#### 首页
- 年级选择器
- 学习统计（总单词、已掌握、掌握率）
- 今日单词卡片
- 四大功能入口（学习、游戏、进度、设置）

#### 学习模块
- 按分类浏览单词（颜色、动物、文具等 10 个分类）
- 单词列表（英文、中文、发音按钮）
- 掌握程度标记（1-5 星）
- 三种学习模式：卡片模式、测验模式、拼写模式

#### 游戏模块
- 连连看：匹配单词和中文意思
- 听音选词：听发音选择正确的单词
- 拼写挑战：补全字母拼写单词
- 单词测验：选择题测试
- 实时得分统计

#### 进度模块
- 总体学习统计
- 进度条可视化
- 分类掌握情况（每个分类的进度条）
- 需要复习的单词列表
- 已掌握的单词列表
- 学习数据重置功能

#### 设置模块
- 发音设置（语速、音调调节，支持测试发音）
- 学习设置（每日目标、学习提醒）
- 界面设置（字体大小、深色模式）
- 关于信息

## 项目结构

```
app/
├── src/
│   ├── app/
│   │   ├── components/        # 可复用组件
│   │   │   ├── grade-selector/  # 年级选择器
│   │   │   ├── word-card/       # 单词卡片
│   │   │   └── icon/            # SVG 图标组件
│   │   ├── data/              # 数据文件
│   │   │   └── word-data.ts   # 单词库
│   │   ├── models/            # 数据模型
│   │   │   └── word.model.ts
│   │   ├── pages/             # 页面组件
│   │   │   ├── home/          # 首页
│   │   │   ├── learn/         # 学习页
│   │   │   ├── game/          # 游戏页
│   │   │   ├── progress/      # 进度页
│   │   │   └── settings/      # 设置页
│   │   ├── services/          # 服务
│   │   │   ├── word.service.ts
│   │   │   └── tts.service.ts
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── angular.json
├── package.json
└── tsconfig.json
```

## 许可证

MIT License

---

Made with ❤️ by [nomospace](https://github.com/nomospace)
