'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useDebounce } from './use-debounce'
import { parseMarkdown } from '@/lib/markdown/parser'
import type { ParseResult, ParserOptions } from '@/types/markdown'
import type { ParseStatus } from '@/types/editor'

// Threshold for large document optimization (characters)
const LARGE_DOCUMENT_THRESHOLD = 10000

export interface UseMarkdownOptions extends ParserOptions {
  /** Debounce delay in ms */
  debounceMs?: number
  /** Enable large document optimization */
  optimizeLargeDocuments?: boolean
}

export interface UseMarkdownResult {
  /** Rendered HTML */
  html: string

  /** Parse status */
  status: ParseStatus

  /** Parse error if any */
  error: string | null

  /** Processing time in ms */
  processingTime: number | null

  /** Force re-parse */
  refresh: () => void
}

/**
 * Hook for parsing Markdown with debouncing
 * @param markdown - Raw Markdown string
 * @param options - Parser and debounce options
 */
export function useMarkdown(
  markdown: string,
  options: UseMarkdownOptions = {}
): UseMarkdownResult {
  const { 
    debounceMs = 300, 
    optimizeLargeDocuments = true,
    ...parserOptions 
  } = options

  const [result, setResult] = useState<ParseResult>({
    html: '',
    success: true,
  })
  const [status, setStatus] = useState<ParseStatus>('idle')
  const [parseCounter, setParseCounter] = useState(0)
  
  // Track previous markdown for comparison
  const prevMarkdownRef = useRef<string>('')
  const parseAbortRef = useRef<AbortController | null>(null)

  // Adaptive debounce: longer for large documents
  const adaptiveDebounceMs = useMemo(() => {
    if (!optimizeLargeDocuments) return debounceMs
    const isLarge = markdown.length > LARGE_DOCUMENT_THRESHOLD
    return isLarge ? Math.min(debounceMs * 2, 600) : debounceMs
  }, [markdown.length, debounceMs, optimizeLargeDocuments])

  // Debounce the markdown input
  const debouncedMarkdown = useDebounce(markdown, adaptiveDebounceMs)

  // Memoize parser options to prevent unnecessary re-parses
  const memoizedOptions = useMemo(
    () => parserOptions,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [parserOptions.gfm, parserOptions.sanitize, parserOptions.themeId]
  )

  // Parse effect with optimization
  useEffect(() => {
    // Skip if content unchanged (except for forced refresh)
    if (debouncedMarkdown === prevMarkdownRef.current && parseCounter === 0) {
      return
    }
    prevMarkdownRef.current = debouncedMarkdown

    if (!debouncedMarkdown) {
      setResult({ html: '', success: true })
      setStatus('idle')
      return
    }

    // Cancel previous parse if still running
    if (parseAbortRef.current) {
      parseAbortRef.current.abort()
    }
    parseAbortRef.current = new AbortController()
    const { signal } = parseAbortRef.current

    const parse = async () => {
      setStatus('parsing')

      try {
        const parseResult = await parseMarkdown(debouncedMarkdown, memoizedOptions)

        if (!signal.aborted) {
          setResult(parseResult)
          setStatus(parseResult.success ? 'success' : 'error')
        }
      } catch (error) {
        if (!signal.aborted) {
          setResult({
            html: '',
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          })
          setStatus('error')
        }
      }
    }

    void parse()

    return () => {
      parseAbortRef.current?.abort()
    }
  }, [debouncedMarkdown, memoizedOptions, parseCounter])

  // Refresh function to force re-parse
  const refresh = useCallback(() => {
    prevMarkdownRef.current = '' // Force re-parse
    setParseCounter((prev) => prev + 1)
  }, [])

  // Memoize return value for stable reference
  return useMemo(() => ({
    html: result.html,
    status,
    error: result.error ?? null,
    processingTime: result.processingTime ?? null,
    refresh,
  }), [result.html, status, result.error, result.processingTime, refresh])
}

/**
 * Synchronous version for simpler cases (no debounce)
 */
export function useMarkdownSync(
  markdown: string,
  options: ParserOptions = {}
): Omit<UseMarkdownResult, 'refresh'> {
  const [result, setResult] = useState<ParseResult>({
    html: '',
    success: true,
  })
  const [status, setStatus] = useState<ParseStatus>('idle')

  useEffect(() => {
    if (!markdown) {
      setResult({ html: '', success: true })
      setStatus('idle')
      return
    }

    const parse = async () => {
      setStatus('parsing')
      const parseResult = await parseMarkdown(markdown, options)
      setResult(parseResult)
      setStatus(parseResult.success ? 'success' : 'error')
    }

    void parse()
  }, [markdown, options])

  return {
    html: result.html,
    status,
    error: result.error ?? null,
    processingTime: result.processingTime ?? null,
  }
}
