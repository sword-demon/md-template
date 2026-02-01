'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Debounce a value - returns the debounced value
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 300ms)
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Debounce a callback function
 * @param callback - The function to debounce
 * @param delay - Delay in milliseconds (default: 300ms)
 */
export function useDebouncedCallback<T extends (...args: Parameters<T>) => ReturnType<T>>(
  callback: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const callbackRef = useRef(callback)

  // Update callback ref on each render
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args)
      }, delay)
    },
    [delay]
  )
}

/**
 * Debounce with immediate first call option
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds
 * @param immediate - Whether to update immediately on first change
 */
export function useDebounceWithImmediate<T>(
  value: T,
  delay: number = 300,
  immediate: boolean = false
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  const isFirstRun = useRef(true)

  useEffect(() => {
    if (immediate && isFirstRun.current) {
      isFirstRun.current = false
      setDebouncedValue(value)
      return
    }

    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay, immediate])

  return debouncedValue
}
