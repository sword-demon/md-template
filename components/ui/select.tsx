'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, value, onChange, placeholder, disabled, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
      onChange?.(e.target.value)
    }

    return (
      <div className="relative inline-block">
        <select
          ref={ref}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={cn(
            'appearance-none bg-white border-[3px] border-black px-4 py-2 pr-10 font-bold shadow-neo cursor-pointer',
            'hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm',
            'focus:outline-none focus:ring-0',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-neo',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
          aria-hidden="true"
        />
      </div>
    )
  }
)
Select.displayName = 'Select'

export { Select }
