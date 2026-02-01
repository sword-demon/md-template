'use client'

import * as React from 'react'
import { Copy, Check, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { copyHtml } from '@/lib/clipboard/copy-html'
import { cn } from '@/lib/utils'

export interface CopyButtonProps {
  /** HTML content to copy */
  html: string

  /** Whether button is disabled */
  disabled?: boolean

  /** Success callback */
  onSuccess?: (() => void) | undefined

  /** Error callback */
  onError?: ((error: string) => void) | undefined

  /** Button variant */
  variant?: 'default' | 'secondary' | 'accent' | 'outline' | 'ghost'

  /** Button size */
  size?: 'default' | 'sm' | 'lg' | 'icon'

  /** Additional class name */
  className?: string
}

type CopyState = 'idle' | 'copying' | 'success' | 'error'

export function CopyButton({
  html,
  disabled = false,
  onSuccess,
  onError,
  variant = 'default',
  size = 'default',
  className,
}: CopyButtonProps) {
  const [state, setState] = React.useState<CopyState>('idle')
  const [errorMessage, setErrorMessage] = React.useState<string>('')
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  // Clear timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleCopy = React.useCallback(async () => {
    if (disabled || !html) return

    setState('copying')
    setErrorMessage('')

    try {
      const result = await copyHtml(html)

      if (result.success) {
        setState('success')
        onSuccess?.()

        // Reset after 2 seconds
        timeoutRef.current = setTimeout(() => {
          setState('idle')
        }, 2000)
      } else {
        setState('error')
        setErrorMessage(result.error ?? '复制失败')
        onError?.(result.error ?? '复制失败')

        // Reset after 3 seconds
        timeoutRef.current = setTimeout(() => {
          setState('idle')
          setErrorMessage('')
        }, 3000)
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : '复制失败'
      setState('error')
      setErrorMessage(message)
      onError?.(message)

      timeoutRef.current = setTimeout(() => {
        setState('idle')
        setErrorMessage('')
      }, 3000)
    }
  }, [html, disabled, onSuccess, onError])

  const isDisabled = disabled || !html || state === 'copying'

  const getIcon = () => {
    switch (state) {
      case 'copying':
        return <Copy className="h-4 w-4 animate-pulse" />
      case 'success':
        return <Check className="h-4 w-4" />
      case 'error':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Copy className="h-4 w-4" />
    }
  }

  const getLabel = () => {
    switch (state) {
      case 'copying':
        return '复制中...'
      case 'success':
        return '已复制!'
      case 'error':
        return '复制失败'
      default:
        return '复制到微信'
    }
  }

  const getVariant = (): typeof variant => {
    if (state === 'success') return 'accent'
    if (state === 'error') return 'secondary'
    return variant
  }

  return (
    <div className="relative inline-block">
      <Button
        variant={getVariant()}
        size={size}
        onClick={handleCopy}
        disabled={isDisabled}
        className={cn(
          'gap-2 transition-all',
          state === 'success' && 'bg-[var(--color-success)]',
          state === 'error' && 'bg-[var(--color-error)]',
          className
        )}
        title={errorMessage || undefined}
      >
        {getIcon()}
        <span>{getLabel()}</span>
      </Button>
    </div>
  )
}
