# Data Model: 微信公众号 Markdown 编辑器

**Date**: 2026-02-01  
**Source**: Feature specification entities + research decisions

## Overview

本项目为纯前端应用，无持久化存储需求。数据模型主要定义运行时状态和配置结构。

## Core Types

### EditorState

编辑器的核心运行时状态。

```typescript
interface EditorState {
  /** 用户输入的 Markdown 原文 */
  markdown: string
  
  /** 解析后的 HTML 富文本（带内联样式） */
  renderedHtml: string
  
  /** 当前选中的主题 ID */
  currentTheme: ThemeId
  
  /** 解析状态 */
  parseStatus: 'idle' | 'parsing' | 'success' | 'error'
  
  /** 解析错误信息（如有） */
  parseError: string | null
}

type ThemeId = 'neobrutalism' // 未来可扩展: | 'minimal' | 'elegant'
```

**状态转换**:

```
idle → parsing (用户输入变化)
parsing → success (解析完成)
parsing → error (解析失败)
error → parsing (用户继续输入)
```

### Theme

主题配置定义，支持未来扩展。

```typescript
interface Theme {
  /** 主题唯一标识 */
  id: ThemeId
  
  /** 显示名称 */
  name: string
  
  /** 主题描述 */
  description: string
  
  /** 设计令牌 */
  tokens: ThemeTokens
  
  /** 元素样式映射 */
  elementStyles: ElementStyleMap
}

interface ThemeTokens {
  border: {
    width: string
    style: 'solid' | 'dashed' | 'dotted'
    color: string
  }
  shadow: {
    offsetX: string
    offsetY: string
    blur: string
    color: string
  }
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
  }
  typography: {
    heading: string
    body: string
    code: string
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  borderRadius: string
}

type ElementStyleMap = {
  [K in MarkdownElement]: string // CSS 内联样式字符串
}

type MarkdownElement = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'p' | 'blockquote' | 'pre' | 'code' | 'inlineCode'
  | 'ul' | 'ol' | 'li' | 'a' | 'img'
  | 'table' | 'thead' | 'tbody' | 'tr' | 'th' | 'td'
  | 'strong' | 'em' | 'del' | 'hr'
```

### MarkdownAST

Markdown 解析产生的抽象语法树节点类型（基于 unified/mdast）。

```typescript
import type { Root, Content } from 'mdast'

// 重新导出 mdast 类型
export type { Root, Content }

// 自定义扩展节点（如需）
interface CustomNode {
  type: 'custom'
  data: {
    hName: string
    hProperties: Record<string, string>
  }
}
```

### ClipboardResult

剪贴板操作结果。

```typescript
interface ClipboardResult {
  /** 操作是否成功 */
  success: boolean
  
  /** 使用的复制方法 */
  method: 'clipboard-api' | 'exec-command' | 'fallback'
  
  /** 错误信息（如失败） */
  error?: string
}
```

## Component Props Interfaces

### MarkdownEditorProps

```typescript
interface MarkdownEditorProps {
  /** 初始 Markdown 内容 */
  initialValue?: string
  
  /** 内容变化回调（防抖后触发） */
  onChange: (markdown: string) => void
  
  /** 占位符文本 */
  placeholder?: string
  
  /** 是否禁用 */
  disabled?: boolean
  
  /** 自定义类名 */
  className?: string
}
```

### RichTextPreviewProps

```typescript
interface RichTextPreviewProps {
  /** 渲染后的 HTML 内容 */
  html: string
  
  /** 加载状态 */
  loading?: boolean
  
  /** 错误状态 */
  error?: string | null
  
  /** 滚动位置同步引用 */
  scrollRef?: React.RefObject<HTMLDivElement>
  
  /** 自定义类名 */
  className?: string
}
```

### CopyButtonProps

```typescript
interface CopyButtonProps {
  /** 要复制的 HTML 内容 */
  html: string
  
  /** 是否禁用（如内容为空） */
  disabled?: boolean
  
  /** 复制成功回调 */
  onSuccess?: () => void
  
  /** 复制失败回调 */
  onError?: (error: string) => void
}
```

### NavbarProps

```typescript
interface NavbarProps {
  /** 当前选中的主题 */
  currentTheme: ThemeId
  
  /** 主题切换回调 */
  onThemeChange: (theme: ThemeId) => void
  
  /** 可用主题列表 */
  availableThemes: Array<{ id: ThemeId; name: string }>
}
```

## Validation Schemas (Zod)

```typescript
import { z } from 'zod'

// 主题 ID 验证
export const themeIdSchema = z.enum(['neobrutalism'])

// 编辑器状态验证
export const editorStateSchema = z.object({
  markdown: z.string(),
  renderedHtml: z.string(),
  currentTheme: themeIdSchema,
  parseStatus: z.enum(['idle', 'parsing', 'success', 'error']),
  parseError: z.string().nullable(),
})

// 主题令牌验证
export const themeTokensSchema = z.object({
  border: z.object({
    width: z.string(),
    style: z.enum(['solid', 'dashed', 'dotted']),
    color: z.string(),
  }),
  shadow: z.object({
    offsetX: z.string(),
    offsetY: z.string(),
    blur: z.string(),
    color: z.string(),
  }),
  colors: z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.string(),
    background: z.string(),
    surface: z.string(),
    text: z.string(),
  }),
  typography: z.object({
    heading: z.string(),
    body: z.string(),
    code: z.string(),
  }),
  spacing: z.object({
    xs: z.string(),
    sm: z.string(),
    md: z.string(),
    lg: z.string(),
    xl: z.string(),
  }),
  borderRadius: z.string(),
})
```

## Entity Relationships

```
┌─────────────────┐
│   EditorState   │
├─────────────────┤
│ markdown        │──────┐
│ renderedHtml    │      │
│ currentTheme    │──┐   │
│ parseStatus     │  │   │
│ parseError      │  │   │
└─────────────────┘  │   │
                     │   │
                     ▼   │
              ┌──────────┴──┐
              │    Theme    │
              ├─────────────┤
              │ id          │
              │ name        │
              │ tokens      │───────┐
              │ elementStyles│      │
              └─────────────┘      │
                                   ▼
                          ┌────────────────┐
                          │  ThemeTokens   │
                          ├────────────────┤
                          │ border         │
                          │ shadow         │
                          │ colors         │
                          │ typography     │
                          │ spacing        │
                          │ borderRadius   │
                          └────────────────┘
```

## Notes

1. **无持久化**: 本版本不实现 localStorage 保存，每次刷新清空
2. **单一主题**: 初始版本 `ThemeId` 仅包含 `'neobrutalism'`
3. **类型导出**: 所有类型从 `types/` 目录统一导出
4. **Zod 校验**: 仅用于开发调试，生产环境可按需启用
