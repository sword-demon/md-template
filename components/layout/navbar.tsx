'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { ThemeSelector } from './theme-selector'
import type { ThemeId } from '@/types/theme'

export interface NavbarProps {
  /** Current theme ID */
  currentTheme?: ThemeId | undefined

  /** Theme change handler */
  onThemeChange?: ((themeId: ThemeId) => void) | undefined

  /** Additional class name */
  className?: string | undefined
}

export function Navbar({
  currentTheme = 'neobrutalism',
  onThemeChange,
  className,
}: NavbarProps) {
  return (
    <nav
      className={cn(
        'flex items-center justify-between px-6 py-3',
        'bg-[var(--color-primary)] border-b-[3px] border-black',
        className
      )}
    >
      {/* Logo / Title */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-black flex items-center justify-center">
          <span className="text-[var(--color-primary)] font-bold text-lg">M</span>
        </div>
        <h1 className="text-lg font-bold hidden sm:block">
          微信公众号 Markdown 编辑器
        </h1>
        <h1 className="text-lg font-bold sm:hidden">
          MD 编辑器
        </h1>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-4">
        <ThemeSelector
          currentTheme={currentTheme}
          onThemeChange={onThemeChange}
        />
      </div>
    </nav>
  )
}
