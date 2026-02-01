'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SplitPaneProps {
  /** Left side content */
  left: React.ReactNode

  /** Right side content */
  right: React.ReactNode

  /** Default split ratio (left side, 0-1) */
  defaultRatio?: number

  /** Whether the divider is resizable */
  resizable?: boolean

  /** Minimum left width in pixels */
  minLeftWidth?: number

  /** Minimum right width in pixels */
  minRightWidth?: number

  /** Additional class name */
  className?: string
}

export function SplitPane({
  left,
  right,
  defaultRatio = 0.5,
  resizable = true,
  minLeftWidth = 300,
  minRightWidth = 300,
  className,
}: SplitPaneProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [ratio, setRatio] = React.useState(defaultRatio)
  const [isDragging, setIsDragging] = React.useState(false)

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      if (!resizable) return
      e.preventDefault()
      setIsDragging(true)
    },
    [resizable]
  )

  React.useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const containerWidth = containerRect.width
      const newLeftWidth = e.clientX - containerRect.left

      // Apply constraints
      const minRatio = minLeftWidth / containerWidth
      const maxRatio = (containerWidth - minRightWidth) / containerWidth
      const newRatio = Math.max(minRatio, Math.min(maxRatio, newLeftWidth / containerWidth))

      setRatio(newRatio)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, minLeftWidth, minRightWidth])

  return (
    <div
      ref={containerRef}
      className={cn('flex h-full w-full overflow-hidden', className)}
      style={{ cursor: isDragging ? 'col-resize' : undefined }}
    >
      {/* Left Pane */}
      <div
        className="h-full overflow-hidden"
        style={{ width: `${ratio * 100}%` }}
      >
        {left}
      </div>

      {/* Divider */}
      <div
        className={cn(
          'relative flex-shrink-0 w-[3px] bg-black',
          resizable && 'cursor-col-resize hover:bg-[var(--color-primary)]',
          isDragging && 'bg-[var(--color-primary)]'
        )}
        onMouseDown={handleMouseDown}
      >
        {/* Drag handle visual indicator */}
        {resizable && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-8 rounded-full bg-black opacity-0 hover:opacity-100 transition-opacity" />
        )}
      </div>

      {/* Right Pane */}
      <div
        className="h-full overflow-hidden flex-1"
        style={{ width: `${(1 - ratio) * 100}%` }}
      >
        {right}
      </div>
    </div>
  )
}
