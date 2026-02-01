/**
 * Editor State Types
 * 
 * Core runtime state types for the Markdown editor
 */

import type { ThemeId } from './theme'

/**
 * Parse status for Markdown processing
 */
export type ParseStatus = 'idle' | 'parsing' | 'success' | 'error'

/**
 * Editor state - core runtime state
 */
export interface EditorState {
  /** Raw Markdown input from user */
  markdown: string

  /** Rendered HTML with inline styles */
  renderedHtml: string

  /** Currently selected theme */
  currentTheme: ThemeId

  /** Current parse status */
  parseStatus: ParseStatus

  /** Parse error message if status is 'error' */
  parseError: string | null
}

/**
 * Editor internal state for component
 */
export interface EditorInternalState {
  /** Current input value */
  value: string

  /** Whether editor is focused */
  isFocused: boolean

  /** Cursor position */
  cursorPosition: number

  /** Selection range if any */
  selectionRange: { start: number; end: number } | null
}

/**
 * Ref methods exposed by MarkdownEditor
 */
export interface MarkdownEditorRef {
  /** Get current value */
  getValue: () => string

  /** Set value */
  setValue: (value: string) => void

  /** Focus the editor */
  focus: () => void

  /** Insert text at cursor position */
  insertText: (text: string) => void

  /** Get selected text */
  getSelectedText: () => string
}

/**
 * Default editor state
 */
export const defaultEditorState: EditorState = {
  markdown: '',
  renderedHtml: '',
  currentTheme: 'neobrutalism',
  parseStatus: 'idle',
  parseError: null,
}
