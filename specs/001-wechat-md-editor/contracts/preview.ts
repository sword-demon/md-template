/**
 * Preview Component Contracts
 * 
 * 定义预览区相关组件的接口契约
 */

import type { RefObject } from 'react'

/**
 * 富文本预览组件 Props
 */
export interface RichTextPreviewProps {
  /** 渲染后的 HTML 内容（带内联样式） */
  html: string
  
  /** 加载状态 */
  loading?: boolean
  
  /** 错误信息 */
  error?: string | null
  
  /** 滚动位置同步引用 */
  scrollRef?: RefObject<HTMLDivElement>
  
  /** 自定义类名 */
  className?: string
  
  /** 是否显示边框（调试用） */
  showBorder?: boolean
}

/**
 * 复制按钮组件 Props
 */
export interface CopyButtonProps {
  /** 要复制的 HTML 内容 */
  html: string
  
  /** 是否禁用 */
  disabled?: boolean
  
  /** 复制成功回调 */
  onSuccess?: () => void
  
  /** 复制失败回调 */
  onError?: (error: string) => void
  
  /** 按钮变体 */
  variant?: 'default' | 'outline' | 'ghost'
  
  /** 按钮尺寸 */
  size?: 'sm' | 'md' | 'lg'
  
  /** 自定义类名 */
  className?: string
}

/**
 * 剪贴板操作结果
 */
export interface ClipboardResult {
  /** 操作是否成功 */
  success: boolean
  
  /** 使用的复制方法 */
  method: 'clipboard-api' | 'exec-command' | 'fallback'
  
  /** 错误信息（如失败） */
  error?: string
  
  /** 复制的内容长度 */
  contentLength?: number
}

/**
 * 复制 HTML 到剪贴板的函数签名
 */
export type CopyHtmlFunction = (html: string) => Promise<ClipboardResult>

/**
 * 预览区工具栏 Props
 */
export interface PreviewToolbarProps {
  /** 当前 HTML 内容 */
  html: string
  
  /** 是否有内容可复制 */
  hasContent: boolean
  
  /** 字符统计 */
  charCount: number
  
  /** 自定义操作按钮 */
  extraActions?: React.ReactNode
}
