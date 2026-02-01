'use client'

import { useState, useCallback } from 'react'

export interface ToastMessage {
  id: string
  message: string
  variant: 'default' | 'success' | 'error'
  duration?: number
}

export interface UseToastReturn {
  toasts: ToastMessage[]
  showToast: (message: string, variant?: ToastMessage['variant'], duration?: number) => void
  dismissToast: (id: string) => void
  clearToasts: () => void
}

/**
 * Simple toast notification hook
 */
export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const showToast = useCallback(
    (message: string, variant: ToastMessage['variant'] = 'default', duration = 3000) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
      
      const newToast: ToastMessage = {
        id,
        message,
        variant,
        duration,
      }

      setToasts((prev) => [...prev, newToast])

      // Auto dismiss
      if (duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id))
        }, duration)
      }
    },
    []
  )

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const clearToasts = useCallback(() => {
    setToasts([])
  }, [])

  return {
    toasts,
    showToast,
    dismissToast,
    clearToasts,
  }
}
