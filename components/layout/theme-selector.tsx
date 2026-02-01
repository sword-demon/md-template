'use client'

import * as React from 'react'
import { ChevronDown, Palette } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ThemeId, ThemeMeta } from '@/types/theme'

export interface ThemeSelectorProps {
  /** Current theme ID */
  currentTheme?: ThemeId | undefined

  /** Theme change handler */
  onThemeChange?: ((themeId: ThemeId) => void) | undefined

  /** Additional class name */
  className?: string | undefined
}

// Available themes (extensible for future)
const AVAILABLE_THEMES: ThemeMeta[] = [
  {
    id: 'neobrutalism',
    name: 'Neobrutalism',
    description: '现代、大胆的设计风格',
    isDefault: true,
  },
  // Future themes can be added here
  // {
  //   id: 'minimal',
  //   name: 'Minimal',
  //   description: '简约、干净的设计风格',
  // },
]

export function ThemeSelector({
  currentTheme = 'neobrutalism',
  onThemeChange,
  className,
}: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const currentThemeMeta = AVAILABLE_THEMES.find((t) => t.id === currentTheme) ?? AVAILABLE_THEMES[0]

  const handleSelect = (themeId: ThemeId) => {
    onThemeChange?.(themeId)
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2',
          'bg-white border-[3px] border-black font-bold text-sm',
          'hover:translate-x-[2px] hover:translate-y-[2px]',
          'transition-transform',
          isOpen && 'translate-x-[2px] translate-y-[2px]'
        )}
        style={{
          boxShadow: isOpen ? '2px 2px 0 #000' : '4px 4px 0 #000',
        }}
      >
        <Palette className="w-4 h-4" />
        <span className="hidden sm:inline">{currentThemeMeta?.name}</span>
        <span className="sm:hidden">风格</span>
        <ChevronDown
          className={cn(
            'w-4 h-4 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className={cn(
            'absolute right-0 top-full mt-2 z-50',
            'min-w-[200px] bg-white border-[3px] border-black',
            'shadow-neo'
          )}
          style={{
            boxShadow: '4px 4px 0 #000',
          }}
        >
          <div className="py-1">
            {AVAILABLE_THEMES.map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => handleSelect(theme.id)}
                className={cn(
                  'w-full px-4 py-3 text-left',
                  'hover:bg-[var(--color-surface)]',
                  'border-b-2 border-black last:border-b-0',
                  theme.id === currentTheme && 'bg-[var(--color-primary)]'
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm">{theme.name}</div>
                    <div className="text-xs text-[var(--color-text-secondary)]">
                      {theme.description}
                    </div>
                  </div>
                  {theme.id === currentTheme && (
                    <span className="text-[var(--color-accent)] font-bold">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Footer hint */}
          <div className="px-4 py-2 bg-[var(--color-surface)] border-t-2 border-black">
            <p className="text-xs text-[var(--color-text-secondary)]">
              更多风格即将推出...
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
