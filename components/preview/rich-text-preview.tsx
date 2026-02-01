'use client'

import * as React from 'react'
import { Loader2, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CopyButton } from './copy-button'

export interface RichTextPreviewProps {
  /** Rendered HTML content with inline styles */
  html: string

  /** Loading state */
  loading?: boolean

  /** Error message */
  error?: string | null

  /** Scroll sync ref */
  scrollRef?: React.RefObject<HTMLDivElement | null>

  /** Additional class name */
  className?: string

  /** Show border for debugging */
  showBorder?: boolean

  /** Copy success callback */
  onCopySuccess?: () => void

  /** Copy error callback */
  onCopyError?: (error: string) => void
}

/**
 * Error Boundary for Preview Content
 */
interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class PreviewErrorBoundary extends React.Component<
  { children: React.ReactNode; onReset?: () => void },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; onReset?: () => void }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Preview render error:', error, errorInfo)
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null })
    this.props.onReset?.()
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center">
          <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-[var(--color-error)]" />
          <h3 className="font-bold text-lg mb-2">渲染出错</h3>
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
            {this.state.error?.message ?? '预览内容渲染时发生错误'}
          </p>
          <button
            onClick={this.handleReset}
            className="px-4 py-2 bg-[var(--color-primary)] border-[3px] border-black font-bold text-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-transform"
            style={{ boxShadow: '4px 4px 0 #000' }}
          >
            重试
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Loading Indicator Component
 */
function LoadingIndicator() {
  return (
    <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-accent)]" />
        <span className="text-sm font-medium">解析中...</span>
      </div>
    </div>
  )
}

/**
 * Empty State Component
 */
function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8">
      <div className="w-16 h-16 mb-4 bg-[var(--color-surface)] border-[3px] border-black flex items-center justify-center">
        <span className="text-2xl">📝</span>
      </div>
      <h3 className="font-bold text-lg mb-2">预览区域</h3>
      <p className="text-sm text-[var(--color-text-secondary)] max-w-xs">
        在左侧编辑器输入 Markdown 内容，这里将实时显示渲染后的富文本效果
      </p>
    </div>
  )
}

export const RichTextPreview = React.forwardRef<HTMLDivElement, RichTextPreviewProps>(
  ({ html, loading = false, error = null, scrollRef, className, showBorder = false, onCopySuccess, onCopyError }, ref) => {
    const internalRef = React.useRef<HTMLDivElement>(null)
    const previewRef = scrollRef ?? internalRef
    const [boundaryKey, setBoundaryKey] = React.useState(0)

    React.useImperativeHandle(ref, () => previewRef.current as HTMLDivElement)

    const handleBoundaryReset = React.useCallback(() => {
      setBoundaryKey((prev) => prev + 1)
    }, [])

    return (
      <div className={cn('h-full flex flex-col', className)}>
        {/* Preview Header */}
        <div className="flex-shrink-0 px-4 py-2 bg-[var(--color-primary)] border-b-[3px] border-black flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">预览</span>
            {loading && (
              <span className="flex items-center gap-1 text-xs">
                <Loader2 className="w-3 h-3 animate-spin" />
                解析中
              </span>
            )}
            {error && (
              <span className="flex items-center gap-1 text-xs text-[var(--color-error)]">
                <AlertTriangle className="w-3 h-3" />
                错误
              </span>
            )}
          </div>
          <CopyButton
            html={html}
            disabled={loading || !!error || !html}
            onSuccess={onCopySuccess}
            onError={onCopyError}
            size="sm"
          />
        </div>

        {/* Preview Content */}
        <div className="flex-1 relative overflow-hidden bg-white">
          {/* Loading Overlay */}
          {loading && html && <LoadingIndicator />}

          {error ? (
            <div className="p-6">
              <div className="flex items-start gap-3 p-4 bg-red-50 border-[3px] border-[var(--color-error)]">
                <AlertTriangle className="w-5 h-5 text-[var(--color-error)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[var(--color-error)]">解析错误</p>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              </div>
            </div>
          ) : (
            <PreviewErrorBoundary key={boundaryKey} onReset={handleBoundaryReset}>
              <div
                ref={previewRef}
                className={cn(
                  'w-full h-full overflow-auto p-4',
                  showBorder && 'border-2 border-dashed border-gray-300'
                )}
              >
                {html ? (
                  <div
                    className="preview-content"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                ) : (
                  <EmptyState />
                )}
              </div>
            </PreviewErrorBoundary>
          )}
        </div>
      </div>
    )
  }
)

RichTextPreview.displayName = 'RichTextPreview'
