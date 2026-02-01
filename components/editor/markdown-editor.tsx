'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface MarkdownEditorProps {
  /** Initial markdown content */
  initialValue?: string

  /** Current value (controlled) */
  value?: string

  /** Change handler */
  onChange?: (value: string) => void

  /** Placeholder text */
  placeholder?: string

  /** Whether editor is disabled */
  disabled?: boolean

  /** Additional class name */
  className?: string

  /** Scroll sync ref */
  scrollRef?: React.RefObject<HTMLTextAreaElement | null>
}

export const MarkdownEditor = React.forwardRef<HTMLTextAreaElement, MarkdownEditorProps>(
  (
    {
      initialValue = '',
      value,
      onChange,
      placeholder = '在这里输入 Markdown 内容...\n\n# 标题\n\n正文内容',
      disabled = false,
      className,
      scrollRef,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(initialValue)
    const isControlled = value !== undefined
    const currentValue = isControlled ? value : internalValue

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value
        if (!isControlled) {
          setInternalValue(newValue)
        }
        onChange?.(newValue)
      },
      [isControlled, onChange]
    )

    // Sync internal ref with forwarded ref
    const internalRef = React.useRef<HTMLTextAreaElement>(null)
    const textareaRef = scrollRef ?? internalRef

    React.useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement)

    // Calculate stats
    const lineCount = currentValue ? currentValue.split('\n').length : 0
    const wordCount = currentValue ? currentValue.trim().split(/\s+/).filter(Boolean).length : 0

    return (
      <div className={cn('h-full flex flex-col', className)}>
        {/* Editor Header */}
        <div className="flex-shrink-0 px-4 py-2 bg-[var(--color-surface)] border-b-[3px] border-black flex items-center justify-between">
          <span className="font-bold text-sm">Markdown 编辑器</span>
          <div className="flex items-center gap-3 text-xs text-[var(--color-text-secondary)]">
            <span>{lineCount} 行</span>
            <span>{wordCount} 词</span>
            <span>{currentValue.length} 字符</span>
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 relative overflow-hidden">
          <textarea
            ref={textareaRef}
            value={currentValue}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            spellCheck={false}
            className={cn(
              'w-full h-full p-4 resize-none outline-none',
              'font-mono text-sm leading-relaxed',
              'bg-white',
              'placeholder:text-[var(--color-text-secondary)] placeholder:opacity-50',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            style={{
              fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace",
            }}
          />
        </div>
      </div>
    )
  }
)

MarkdownEditor.displayName = 'MarkdownEditor'
