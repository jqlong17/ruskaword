# 随机单词生成器

一个基于智谱 AI 的英语单词生成和句子构建工具。

## 功能特点

- 🎯 主题单词生成：根据用户输入的主题生成相关英语单词
- 🔄 关联单词链：生成的单词之间保持语义关联性
- 📝 智能造句：使用生成的单词自动创建完整的英语句子
- 🈯 中文翻译：自动提供句子的中文翻译
- 💾 历史记录：避免重复生成相同的单词
- 🔑 API 密钥管理：支持配置和保存智谱 API 密钥

## 项目结构

```
src/
├── components/          # UI 组件
│   ├── Button.tsx      # 通用按钮组件
│   ├── Contact.tsx     # 联系方式弹窗
│   ├── Modal.tsx       # 通用模态框组件
│   ├── Settings.tsx    # 设置面板组件
│   ├── WordDisplay.tsx # 单词展示组件
│   ├── WordGenerator.tsx # 单词生成主组件
│   ├── WordSection.tsx   # 单词生成区域组件
│   └── SentenceSection.tsx # 句子生成区域组件
├── services/           # 业务逻辑服务
│   ├── wordHistory.ts  # 单词历史记录管理
│   └── zhipu.ts       # 智谱 API 调用服务
└── types.ts           # TypeScript 类型定义
```

## 核心模块说明

### 组件模块

#### WordGenerator
主要功能组件，负责协调单词生成和句子生成的整体流程。

主要函数：
- `handleGenerateWord`: 生成新单词
- `handleGenerateSentence`: 生成句子
- `handleDeleteWord`: 删除单词
- `handleReset`: 重置所有内容

#### Settings
设置组件，管理 API 密钥配置。

主要功能：
- API 密钥的保存和加载
- 提供获取免费 API 密钥的链接

### 服务模块

#### zhipu.ts
智谱 API 调用服务。

主要函数：
- `generateWord`: 生成单个单词
- `generateSentence`: 生成完整句子
- `makeZhipuRequest`: 处理 API 请求

特点：
- 支持请求超时处理
- 错误处理和重试机制
- 响应数据验证

#### wordHistory.ts
单词历史记录管理服务。

主要函数：
- `add`: 添加新单词到历史记录
- `has`: 检查单词是否存在
- `getAll`: 获取所有历史记录
- `clear`: 清空历史记录

## 技术栈

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (图标库)

## 部署

项目已部署在 Netlify 上，可以通过以下链接访问：
https://flourishing-pothos-8dc0c6.netlify.app

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 注意事项

1. 使用前需要配置智谱 API 密钥
2. 可以通过设置面板获取免费的 API 密钥
3. API 密钥会保存在本地存储中
4. 建议输入具体的主题以获得更相关的单词