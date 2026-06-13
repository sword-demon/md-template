/**
 * Markdown AST Types
 *
 * Type definitions for Markdown parsing
 */

// Note: mdast types are available via @types/mdast
// We define our own simplified types for this project

import type { ThemeId } from './theme'

/**
 * Result of parsing Markdown
 */
export interface ParseResult {
  /** Rendered HTML string with inline styles */
  html: string

  /** Whether parsing was successful */
  success: boolean

  /** Error message if parsing failed */
  error?: string

  /** Processing time in milliseconds */
  processingTime?: number
}

/**
 * Parser options
 */
export interface ParserOptions {
  /** Enable GFM (GitHub Flavored Markdown) */
  gfm?: boolean

  /** Enable sanitization for WeChat compatibility */
  sanitize?: boolean

  /** Theme ID for styling */
  themeId?: ThemeId
}

/**
 * Clipboard operation result
 */
export interface ClipboardResult {
  /** Whether the operation succeeded */
  success: boolean

  /** Method used for copying */
  method: 'clipboard-api' | 'exec-command' | 'fallback'

  /** Error message if failed */
  error?: string

  /** Length of copied content */
  contentLength?: number
}
