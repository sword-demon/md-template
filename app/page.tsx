'use client'

import * as React from 'react'
import { SplitPane } from '@/components/layout/split-pane'
import { Navbar } from '@/components/layout/navbar'
import { MarkdownEditor } from '@/components/editor/markdown-editor'
import { RichTextPreview } from '@/components/preview/rich-text-preview'
import { Toast, ToastContainer } from '@/components/ui/toast'
import { useMarkdown } from '@/lib/hooks/use-markdown'
import { useToast } from '@/lib/hooks/use-toast'
import type { ThemeId } from '@/types/theme'

const DEFAULT_MARKDOWN = `---
title: 微信公众号 Markdown 编辑器
description: 将 Markdown 转换为微信公众号兼容的 Neobrutalism 风格富文本，一键复制即可发布
author: AI Assistant
tags:
  - Markdown
  - 微信公众号
  - Neobrutalism
---

## 主要功能

- 实时预览 Markdown 渲染效果
- 一键复制富文本到微信公众号
- 现代、大胆的 Neobrutalism 设计风格
- **支持 frontmatter 元数据**（如本文顶部卡片）

## 代码示例

\`\`\`javascript
function hello() {
  console.log('Hello, WeChat!')
}
\`\`\`

## 任务列表

- [x] 支持 Markdown 基础语法
- [x] 支持代码高亮
- [x] 支持 frontmatter 元数据
- [ ] 更多主题样式（开发中）

## 表格

| 功能 | 状态 | 说明 |
|------|------|------|
| 实时预览 | ✅ | 300ms 防抖 |
| 复制到微信 | ✅ | Clipboard API |
| 代码高亮 | ✅ | Shiki 语法高亮 |
| 任务列表 | ✅ | GFM 扩展 |

## 引用

> 这是一段引用文字，采用 Neobrutalism 风格的左侧边框设计。

---

开始编辑你的内容吧！
`

export default function Home() {
  const [markdown, setMarkdown] = React.useState(DEFAULT_MARKDOWN)
  const [currentTheme, setCurrentTheme] = React.useState<ThemeId>('neobrutalism')
  const editorRef = React.useRef<HTMLTextAreaElement>(null)
  const previewRef = React.useRef<HTMLDivElement>(null)
  const { toasts, showToast, dismissToast } = useToast()

  // Parse markdown with debounce
  const { html, status, error } = useMarkdown(markdown, {
    debounceMs: 300,
    gfm: true,
    themeId: currentTheme,
  })

  // Theme change handler
  const handleThemeChange = React.useCallback((themeId: ThemeId) => {
    setCurrentTheme(themeId)
    showToast(`已切换到 ${themeId === 'neobrutalism' ? 'Neobrutalism' : themeId} 风格`, 'success')
  }, [showToast])

  // Copy handlers
  const handleCopySuccess = React.useCallback(() => {
    showToast('复制成功！可以粘贴到微信公众号了', 'success')
  }, [showToast])

  const handleCopyError = React.useCallback(
    (errorMsg: string) => {
      showToast(`复制失败: ${errorMsg}`, 'error')
    },
    [showToast]
  )

  // Scroll sync: editor -> preview
  const handleEditorScroll = React.useCallback(() => {
    if (!editorRef.current || !previewRef.current) return

    const editor = editorRef.current
    const preview = previewRef.current

    const editorScrollRatio = editor.scrollTop / (editor.scrollHeight - editor.clientHeight || 1)
    const previewMaxScroll = preview.scrollHeight - preview.clientHeight

    preview.scrollTop = editorScrollRatio * previewMaxScroll
  }, [])

  // Attach scroll listener
  React.useEffect(() => {
    const editor = editorRef.current
    if (!editor) return

    editor.addEventListener('scroll', handleEditorScroll)
    return () => {
      editor.removeEventListener('scroll', handleEditorScroll)
    }
  }, [handleEditorScroll])

  return (
    <main className="h-screen flex flex-col">
      {/* Navbar with theme selector */}
      <Navbar
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <SplitPane
          left={
            <MarkdownEditor
              value={markdown}
              onChange={setMarkdown}
              scrollRef={editorRef}
            />
          }
          right={
            <RichTextPreview
              html={html}
              loading={status === 'parsing'}
              error={error}
              scrollRef={previewRef}
              onCopySuccess={handleCopySuccess}
              onCopyError={handleCopyError}
            />
          }
          defaultRatio={0.5}
          resizable={true}
        />
      </div>

      {/* Footer */}
      <footer className="flex-shrink-0 px-6 py-2 bg-[var(--color-surface)] border-t-[3px] border-black text-xs text-[var(--color-text-secondary)]">
        <div className="flex items-center justify-between">
          <span>
            状态: {status === 'idle' ? '就绪' : status === 'parsing' ? '解析中...' : status === 'success' ? '完成' : '错误'}
          </span>
          <span>字符数: {markdown.length}</span>
        </div>
      </footer>

      {/* Toast Notifications */}
      <ToastContainer>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            variant={toast.variant}
            onClose={() => dismissToast(toast.id)}
          >
            {toast.message}
          </Toast>
        ))}
      </ToastContainer>
    </main>
  )
}
