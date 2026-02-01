# Implementation Plan: 微信公众号 Markdown 编辑器

**Branch**: `001-wechat-md-editor` | **Date**: 2026-02-01 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/001-wechat-md-editor/spec.md`

## Summary

构建一个实时 Markdown 编辑器，左侧输入 Markdown 内容，右侧实时渲染为 Neobrutalism 风格的微信公众号兼容富文本。用户可一键复制富文本内容并直接粘贴到微信公众号后台使用。

**技术方案**:
- 使用 Next.js 16 App Router 构建单页应用
- unified/remark/rehype 生态进行 Markdown 解析和 HTML 转换
- 自定义 rehype 插件注入 Neobrutalism 内联样式
- Clipboard API 实现富文本复制（text/html MIME）

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)  
**Primary Dependencies**: Next.js 16.x, React 19.x, TailwindCSS 4.x, shadcn/ui, unified/remark/rehype  
**Storage**: N/A（纯前端，无持久化需求）  
**Testing**: Vitest (单元测试), Playwright (可选 E2E)  
**Target Platform**: 现代浏览器 (Chrome, Firefox, Safari, Edge 最新版本)  
**Project Type**: Web application (frontend only)  
**Performance Goals**: 预览更新 < 500ms, 10000 字符文档流畅渲染  
**Constraints**: 输出 HTML 必须使用内联样式，禁止外部 CSS 引用  
**Scale/Scope**: 单用户本地使用，无并发/多用户场景

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原则 | 状态 | 说明 |
|------|------|------|
| I. Component-First Architecture | ✅ 通过 | 编辑器、预览区、导航栏均设计为独立组件 |
| II. Type Safety First | ✅ 通过 | TypeScript strict 模式，Zod 验证用户输入 |
| III. Neobrutalism Design System | ✅ 通过 | 网站 UI 和输出内容均采用 Neobrutalism 风格 |
| IV. Copy-Ready Rich Text Output | ✅ 通过 | 使用内联样式，Clipboard API 复制 text/html |
| V. Real-time Preview | ✅ 通过 | 300ms 防抖，大文档虚拟滚动优化 |

**结论**: 所有宪法原则均满足，无需 Complexity Tracking。

## Project Structure

### Documentation (this feature)

```text
specs/001-wechat-md-editor/
├── plan.md              # This file
├── research.md          # Phase 0: 技术研究
├── data-model.md        # Phase 1: 数据模型
├── quickstart.md        # Phase 1: 快速启动指南
├── contracts/           # Phase 1: 组件接口契约
│   ├── editor.ts        # 编辑器组件接口
│   ├── preview.ts       # 预览组件接口
│   └── theme.ts         # 主题配置接口
└── tasks.md             # Phase 2: 任务清单
```

### Source Code (repository root)

```text
app/                          # Next.js App Router
├── page.tsx                  # 主页面（编辑器布局）
├── layout.tsx                # 根布局（Neobrutalism 主题）
└── globals.css               # TailwindCSS 全局样式

components/                   # React 组件
├── ui/                       # shadcn/ui 基础组件
│   ├── button.tsx
│   ├── select.tsx
│   └── toast.tsx
├── layout/                   # 布局组件
│   ├── navbar.tsx            # 导航栏（含风格选择器）
│   └── split-pane.tsx        # 左右分栏容器
├── editor/                   # 编辑器组件
│   └── markdown-editor.tsx   # Markdown 输入区
└── preview/                  # 预览组件
    ├── rich-text-preview.tsx # 富文本预览区
    └── copy-button.tsx       # 复制按钮

lib/                          # 工具函数和业务逻辑
├── markdown/                 # Markdown 处理
│   ├── parser.ts             # unified 解析器配置
│   ├── plugins/              # 自定义 rehype 插件
│   │   └── neobrutalism.ts   # Neobrutalism 样式注入
│   └── sanitize.ts           # 微信兼容性过滤
├── styles/                   # 样式生成
│   ├── inline-styles.ts      # 内联样式映射
│   └── theme-config.ts       # Neobrutalism 主题参数
├── clipboard/                # 剪贴板操作
│   └── copy-html.ts          # 富文本复制实现
└── hooks/                    # 自定义 Hooks
    ├── use-debounce.ts       # 防抖 Hook
    └── use-markdown.ts       # Markdown 解析 Hook

types/                        # TypeScript 类型定义
├── markdown.ts               # Markdown AST 类型
├── theme.ts                  # 主题配置类型
└── editor.ts                 # 编辑器状态类型

__tests__/                    # 测试文件
├── unit/                     # 单元测试
│   ├── parser.test.ts
│   └── inline-styles.test.ts
└── integration/              # 集成测试
    └── copy-output.test.ts
```

**Structure Decision**: 采用 Next.js App Router 单项目结构，无后端需求。组件按功能域划分（layout/editor/preview），业务逻辑集中在 lib/ 目录。

## Complexity Tracking

> 无宪法违反，此表为空。

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| - | - | - |
