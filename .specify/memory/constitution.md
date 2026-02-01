<!--
  Sync Impact Report
  ===================
  Version change: N/A → 1.0.0 (Initial creation)
  
  Modified principles: None (initial version)
  
  Added sections:
    - Core Principles (5 principles)
    - Technical Stack Requirements
    - Development Workflow
    - Governance
  
  Removed sections: None
  
  Templates requiring updates:
    - .specify/templates/plan-template.md ✅ Compatible (Constitution Check section exists)
    - .specify/templates/spec-template.md ✅ Compatible (standard structure)
    - .specify/templates/tasks-template.md ✅ Compatible (standard structure)
  
  Follow-up TODOs: None
-->

# MD-Template Constitution

## Core Principles

### I. Component-First Architecture

每个功能必须以独立、可复用的 React 组件开始开发。

- 组件必须是自包含的，具有明确的 props 接口和 TypeScript 类型定义
- 组件必须支持独立测试和预览（通过 Storybook 或独立页面）
- 禁止在组件内部硬编码业务逻辑，必须通过 props 或 hooks 注入
- 样式必须使用 TailwindCSS 类名，禁止内联样式对象

**理由**: 组件化确保代码可维护性和可测试性，同时支持设计系统的一致性迭代。

### II. Type Safety First

TypeScript 严格模式是不可妥协的要求。

- 必须启用 `strict: true` 编译选项
- 所有函数参数和返回值必须有显式类型标注
- 禁止使用 `any` 类型，必须使用 `unknown` 配合类型守卫
- 外部数据（API 响应、用户输入）必须使用 Zod 或类似库进行运行时验证

**理由**: 类型安全在编译时捕获错误，减少运行时异常，提升开发者体验。

### III. Neobrutalism Design System

所有 UI 必须严格遵循 Neobrutalism 设计风格。

- 必须使用粗重边框（2-4px 实线黑色边框）
- 必须使用高对比度、饱和度高的配色方案
- 组件必须有明显的阴影偏移（offset shadow）而非模糊阴影
- 禁止使用渐变背景，必须使用纯色块
- 字体必须具有强烈的视觉冲击力（推荐 Inter、Space Grotesk 等）

**理由**: 统一的设计语言确保产品视觉一致性，Neobrutalism 风格传递现代、大胆的品牌形象。

### IV. Copy-Ready Rich Text Output

渲染输出必须确保可直接复制到微信公众号编辑器使用。

- 富文本必须使用内联样式（微信编辑器不支持外部 CSS）
- 必须保留 HTML 语义结构（标题、段落、列表、代码块）
- 图片必须使用 base64 编码或公开可访问的 URL
- 复制功能必须使用 Clipboard API 复制富文本（text/html MIME 类型）
- 必须提供复制成功的视觉反馈

**理由**: 产品核心价值在于一键复制到微信，输出格式必须与微信编辑器完全兼容。

### V. Real-time Preview

Markdown 输入与富文本预览必须实时同步。

- 编辑器变更必须在 300ms 内反映到预览区域
- 预览区域必须准确反映最终复制到微信后的样式
- 大文档（>10000 字符）必须使用防抖或虚拟滚动优化性能
- 解析错误必须优雅降级显示，不得阻塞整体渲染

**理由**: 实时预览是用户体验的核心，用户需要即时看到排版效果以进行调整。

## Technical Stack Requirements

本项目使用以下技术栈，所有实现必须遵循这些约束：

| 技术 | 版本要求 | 用途 |
|------|----------|------|
| Next.js | 16.x | 应用框架，使用 App Router |
| React | 19.x | UI 库 |
| TypeScript | 5.x | 类型系统，strict 模式 |
| TailwindCSS | 4.x | 样式系统 |
| shadcn/ui | latest | 组件库基础 |

**依赖管理规则**:

- 必须使用 pnpm 作为包管理器
- 新增依赖前必须评估包大小和维护状态
- 禁止引入功能重叠的依赖

**目录结构规范**:

```text
app/                    # Next.js App Router 页面
├── page.tsx           # 主页面（编辑器 + 预览）
├── layout.tsx         # 根布局
└── globals.css        # 全局样式

components/            # React 组件
├── ui/               # shadcn/ui 基础组件
├── editor/           # Markdown 编辑器组件
└── preview/          # 富文本预览组件

lib/                   # 工具函数和业务逻辑
├── markdown/         # Markdown 解析和转换
├── styles/           # 微信兼容样式生成
└── clipboard/        # 剪贴板操作

types/                 # TypeScript 类型定义
```

## Development Workflow

### 代码质量门禁

- 所有代码必须通过 ESLint 检查（使用 Next.js 推荐配置）
- 所有代码必须通过 Prettier 格式化
- 提交前必须通过 TypeScript 编译检查

### 提交规范

- 使用 Conventional Commits 格式
- 格式: `<type>(<scope>): <description>`
- 类型: feat, fix, docs, style, refactor, test, chore

### 测试策略

- 核心 Markdown 解析逻辑必须有单元测试
- 复制功能必须有集成测试验证 HTML 输出
- 可选: 使用 Playwright 进行端到端测试

## Governance

本宪法是项目开发的最高指导原则，所有决策必须与宪法保持一致。

**修订流程**:

1. 提出修订必须说明理由和预期影响
2. 重大变更（原则增删、技术栈变更）需要记录决策日志
3. 修订后必须更新版本号并记录变更日期

**版本管理**:

- MAJOR: 核心原则变更或技术栈重大升级
- MINOR: 新增原则或扩展现有指导
- PATCH: 措辞修正、格式优化

**合规检查**:

- 每个 PR 必须验证是否符合宪法原则
- 违反宪法的设计决策必须在 Complexity Tracking 中记录理由
- 使用 `.specify/memory/constitution.md` 作为单一事实来源

**Version**: 1.0.0 | **Ratified**: 2026-02-01 | **Last Amended**: 2026-02-01
