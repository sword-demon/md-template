/**
 * Editor Component Contracts
 * 
 * 定义编辑器相关组件的接口契约
 */

import type { RefObject } from 'react'

/**
 * Markdown 编辑器组件 Props
 */
export interface MarkdownEditorProps {
  /** 初始 Markdown 内容 */
  initialValue?: string
  
  /** 内容变化回调（防抖后触发） */
  onChange: (markdown: string) => void
  
  /** 占位符文本 */
  placeholder?: string
  
  /** 是否禁用编辑 */
  disabled?: boolean
  
  /** 自定义类名（TailwindCSS） */
  className?: string
  
  /** 滚动位置同步引用 */
  scrollRef?: RefObject<HTMLTextAreaElement>
}

/**
 * 编辑器内部状态
 */
export interface EditorInternalState {
  /** 当前输入值 */
  value: string
  
  /** 是否聚焦 */
  isFocused: boolean
  
  /** 光标位置 */
  cursorPosition: number
  
  /** 选中范围 */
  selectionRange: { start: number; end: number } | null
}

/**
 * 编辑器 Ref 暴露的方法
 */
export interface MarkdownEditorRef {
  /** 获取当前值 */
  getValue: () => string
  
  /** 设置值 */
  setValue: (value: string) => void
  
  /** 聚焦编辑器 */
  focus: () => void
  
  /** 插入文本到光标位置 */
  insertText: (text: string) => void
  
  /** 获取选中的文本 */
  getSelectedText: () => string
}

/**
 * 分栏布局组件 Props
 */
export interface SplitPaneProps {
  /** 左侧内容 */
  left: React.ReactNode
  
  /** 右侧内容 */
  right: React.ReactNode
  
  /** 默认分割比例（左侧占比，0-1） */
  defaultRatio?: number
  
  /** 是否允许拖拽调整 */
  resizable?: boolean
  
  /** 最小左侧宽度（px） */
  minLeftWidth?: number
  
  /** 最小右侧宽度（px） */
  minRightWidth?: number
  
  /** 自定义类名 */
  className?: string
}
