<div align="center">

# ✨ VIAINTI RESUME ✨

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
![TanStack Start](https://img.shields.io/badge/TanStack_Start-latest-black)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.0-purple)

简体中文 | [English](./README.md)

</div>

VIAINTI RESUME 是一个现代化、功能强大的在线简历编辑器，帮助专业人士轻松创建精美的简历。基于前沿的 Web 技术构建，提供实时预览、自定义主题、AI辅助写作和无缝导出功能。

## 特性

### 核心功能

| 功能 | 描述 |
|------|------|
| **实时预览** | 输入时即时查看更改 - 无需在编辑和预览模式之间切换 |
| **多个模板** | 从 6 个专业设计的模板中选择 |
| **自定义主题** | 自定义颜色、字体和间距以匹配您的个人品牌 |
| **深色模式** | 切换浅色和深色主题，舒适编辑 |
| **PDF 导出** | 一键将简历导出为高质量 PDF |
| **自动保存** | 工作自动保存到本地存储 |
| **响应式设计** | 在桌面、平板和移动设备上无缝运行 |
| **多语言** | 支持英语和西班牙语 |

### AI 辅助写作

- **语法检查**: AI 驱动的语法和拼写建议
- **内容润色**: 改善简历各部分的措辞和影响力
- **多个提供商**: 支持 OpenRouter、OpenAI、Gemini、DeepSeek 和 Doubao
- **生产模式**: 在生产部署中，AI 设置通过环境变量配置

## 技术栈

### 前端

- **TanStack Start**: 用于构建现代 Web 应用的全栈 React 框架
- **TypeScript**: 类型安全的 JavaScript，提供更好的开发体验
- **React 18**: 带有并发功能的最新 React
- **Framer Motion**: 精美流畅的动画和过渡效果
- **Tailwind CSS**: 实用优先的 CSS 框架，用于快速样式设计
- **Shadcn/ui**: 基于 Radix UI 构建的高质量、可访问的 UI 组件

### 状态与数据

- **Zustand**: 小巧、快速、可扩展的状态管理解决方案
- **本地存储**: 所有数据存储在浏览器本地 - 您的隐私很重要

### 富文本编辑

- **Tiptap**: 为 React 构建的无头、可扩展的富文本编辑器

### 图标与图形

- **Lucide React**: 精美的开源图标库

## 快速开始

### 前置要求

- **Node.js** 18 或更高版本
- **pnpm** (推荐) 或 npm

### 步骤

1. **克隆仓库**

```bash
git clone https://github.com/viainti/vresume.git
cd vresume
```

2. **安装依赖**

```bash
pnpm install
```

3. **配置环境变量**

在项目根目录创建 `.env` 文件：

```bash
# 应用设置
FONTCONFIG_PATH=/var/task/fonts

# 生产模式 - 生产部署时设置为 true
# 设置为 true 时，AI 菜单隐藏，设置从环境变量读取
NEXT_PUBLIC_PRODUCTION_MODE=false

# AI 提供商 API 密钥（生产环境配置）
OPENROUTER_API_KEY=your-openrouter-api-key
OPENROUTER_MODEL_ID=anthropic/claude-3.5-sonnet

OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL_ID=gpt-4o
OPENAI_API_ENDPOINT=https://api.openai.com/v1

GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL_ID=gemini-2.0-flash

DEEPSEEK_API_KEY=your-deepseek-api-key
DOUBAO_API_KEY=your-doubao-api-key
DOUBAO_MODEL_ID=your-doubao-model-id
```

4. **启动开发服务器**

```bash
pnpm dev
```

5. **打开浏览器**

访问 `http://localhost:3000`

## 生产构建

### 构建应用

```bash
pnpm build
```

### 启动生产服务器

```bash
pnpm start
```

应用将在 `http://localhost:3000` 可用

## Docker 部署

### 使用 Docker Compose

1. **安装 Docker 和 Docker Compose**

确保已安装 Docker Engine 和 Docker Compose。

2. **配置环境变量**

使用您的生产设置创建 `.env` 文件：

```bash
NEXT_PUBLIC_PRODUCTION_MODE=true
OPENROUTER_API_KEY=your-production-api-key
OPENROUTER_MODEL_ID=anthropic/claude-3.5-sonnet
```

3. **构建并启动容器**

```bash
docker compose up -d
```

4. **访问应用**

应用将在 `http://localhost:3000` 可用

## 环境变量

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `FONTCONFIG_PATH` | 字体配置路径 | `/var/task/fonts` |
| `NEXT_PUBLIC_PRODUCTION_MODE` | 启用生产模式 | `false` |
| `OPENROUTER_API_KEY` | OpenRouter API 密钥 | - |
| `OPENROUTER_MODEL_ID` | OpenRouter 模型 ID | `anthropic/claude-3.5-sonnet` |
| `OPENAI_API_KEY` | OpenAI API 密钥 | - |
| `OPENAI_MODEL_ID` | OpenAI 模型 ID | `gpt-4o` |
| `OPENAI_API_ENDPOINT` | OpenAI API 端点 | `https://api.openai.com/v1` |
| `GEMINI_API_KEY` | Google Gemini API 密钥 | - |
| `GEMINI_MODEL_ID` | Gemini 模型 ID | `gemini-2.0-flash` |

### 生产模式

当 `NEXT_PUBLIC_PRODUCTION_MODE=true` 时：
- AI 配置页面从仪表板菜单中隐藏
- AI 设置仅从环境变量读取
- 仅 OpenRouter 提供商可用
- 推荐用于生产部署

## API 端点

| 端点 | 方法 | 描述 |
|------|------|------|
| `/api/test` | POST | 测试 AI 提供商连接 |
| `/api/polish` | POST | 使用 AI 润色简历内容 |
| `/api/resume-import` | POST | 使用 AI 从文本/图片导入简历 |
| `/api/proxy/image` | GET | 外部图片代理 |

## 模板

VIAINTI RESUME 包含 6 个专业设计的模板：

1. **左侧布局** - 带有简洁排版的经典左侧边栏
2. **右侧布局** - 右侧边栏变体
3. **现代风格** - 带强调色的当代设计
4. **简约风格** - 简洁、最小化的设计
5. **经典风格** - 传统简历格式
6. **创意风格** - 大胆、创意十足的布局

每个模板支持：
- 自定义主色
- 可调节的章节间距
- 字体选择
- 左右布局切换

## 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 贡献

欢迎贡献！请随时提交问题和建议。

## 许可证

本项目采用 Apache 2.0 许可证。

## 联系方式

- **公司**: viainti
- **网站**: https://viainti.com
- **GitHub**: https://github.com/viainti/vresume
